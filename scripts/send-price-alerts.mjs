#!/usr/bin/env node
// Price-drop email alerts: emails confirmed subscribers when the lowest listed
// price for THEIR show drops. Design: plans/price-alerts-plan.md.
//
// What counts as a drop is not decided here. It is the same detector the X
// price-drop drafts use (scripts/lib/price-drop-posts.mjs detectPriceDrops):
// one show, one ticket site, one currency, at least 20% and 20 units below the
// reading 6-8 days earlier, held for two daily readings, from the never-pruned
// provider_pricing_daily table, fresh within 30 hours, show still upcoming and
// its artist page indexable. Nothing is estimated or invented.
//
// Modes:
//   preview (default)  Prints how many alerts are due. Writes and sends nothing.
//   test               Sends one clearly marked sample to --test-to. Records nothing.
//   send               Sends due alerts and records each in email_alert_sends.
//
// Nothing sends unless PRICE_ALERTS_PROVIDER=resend with RESEND_API_KEY,
// ALERT_EMAIL_FROM and ALERT_POSTAL_ADDRESS set. Otherwise test and send are a
// dry run that says what they would have done and records nothing.

import { randomBytes } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

import { EMAIL_ALERT_SCHEMA_STATEMENTS, isUnsubscribeToken } from "../functions/_email-alerts.js";
import {
  PRICE_ALERT_SCHEMA_STATEMENTS,
  PRICE_ALERT_KIND_PREFIX,
  PRICE_ALERT_CAPS,
  buildPriceDropEmail
} from "../functions/_price-alerts.js";
import { createEmailProvider } from "../functions/_email-provider.js";
import { detectPriceDrops } from "./lib/price-drop-posts.mjs";
import { PRICE_MOVE_SITES } from "./lib/data-stories.mjs";
import { runD1, sqlString, parseD1Results } from "./send-date-alerts.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_D1_DATABASE = "tourticketcompare-demand";
const DEFAULT_LIMIT = 100;
const DAY_MS = 86400000;
const OPEN = new Set(["sent", "claimed", "not_sent"]);

function usage() {
  return `Usage: node scripts/send-price-alerts.mjs [options]

Options:
  --mode <preview|test|send>  preview (default) writes and sends nothing
  --test-to <address>         Recipient for --mode test (required there)
  --limit <n>                 Most alerts sent in one run (default: ${DEFAULT_LIMIT})
  --database <name>           D1 database name (default: ${DEFAULT_D1_DATABASE})
  --local                     Use local D1 instead of remote
  --self-test                 Run unit tests only; no network, no D1
  -h, --help                  Show this help

Environment to actually send: PRICE_ALERTS_PROVIDER=resend, RESEND_API_KEY,
ALERT_EMAIL_FROM, ALERT_POSTAL_ADDRESS. Without all four, nothing is sent.
Always: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID (remote D1).
`;
}

export function parseArgs(argv) {
  const options = { mode: "preview", testTo: "", limit: DEFAULT_LIMIT, database: DEFAULT_D1_DATABASE, remote: true, selfTest: false, help: false };
  const value = (i, name) => {
    if (i >= argv.length) throw new Error(`${name} requires a value`);
    return argv[i];
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--mode") options.mode = value(++i, arg);
    else if (arg === "--test-to") options.testTo = value(++i, arg).trim().toLowerCase();
    else if (arg === "--limit") {
      const n = Number(value(++i, arg));
      if (!Number.isInteger(n) || n < 1) throw new Error("--limit requires an integer >= 1");
      options.limit = n;
    } else if (arg === "--database") options.database = value(++i, arg);
    else if (arg === "--local") options.remote = false;
    else if (arg === "--self-test") options.selfTest = true;
    else if (arg === "-h" || arg === "--help") options.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!["preview", "test", "send"].includes(options.mode)) throw new Error(`Unknown --mode: ${options.mode}`);
  if (options.mode === "test" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(options.testTo)) throw new Error("--mode test requires --test-to <address>");
  return options;
}

/** Rollup rows for the given shows: same columns the drop detector reads. */
export function alertRowsSql(eventIds, asOf) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(asOf))) throw new Error(`alertRowsSql: bad as-of date "${asOf}"`);
  const ids = [...new Set(eventIds)].filter((id) => /^[A-Za-z0-9_.-]{1,160}$/.test(id)).map(sqlString).join(",");
  const sites = [...PRICE_MOVE_SITES.keys()].map(sqlString).join(",");
  return `SELECT event_id, artist_slug, provider, source, currency, observed_date, low_price_min, low_price_last, observations, last_observed_at FROM provider_pricing_daily WHERE event_id IN (${ids}) AND observed_date >= date('${asOf}','-45 day') AND provider IN (${sites}) ORDER BY event_id, provider, source, currency, observed_date`;
}

export const alertKind = (drop) => `${PRICE_ALERT_KIND_PREFIX}${drop.key}`;

/**
 * Who gets which alert. Pure.
 * subscriptions: confirmed price_alert_subscriptions rows
 * drops:         detectPriceDrops() output (unlimited per artist)
 * sends:         email_alert_sends rows (any kind)
 * unsubscribes:  email_unsubscribes rows
 */
export function planPriceAlerts({ subscriptions = [], drops = [], sends = [], unsubscribes = [], now = Date.now() }) {
  const optOut = new Map(unsubscribes.map((r) => [r.email, r.unsubscribed_at]));
  const dropsByEvent = new Map();
  for (const d of drops) {
    if (!dropsByEvent.has(d.eventId)) dropsByEvent.set(d.eventId, []);
    dropsByEvent.get(d.eventId).push(d);
  }
  const priceSends = sends.filter((s) => String(s.alert_kind || "").startsWith(PRICE_ALERT_KIND_PREFIX) && OPEN.has(s.status));
  const sentKinds = new Set(priceSends.map((s) => `${s.email}|${s.alert_kind}`));
  const weekAgo = now - 7 * DAY_MS;
  const cooldownAgo = now - PRICE_ALERT_CAPS.perShowCooldownDays * DAY_MS;
  const weekCount = new Map();
  const lastForShow = new Map();
  for (const s of priceSends) {
    const at = Date.parse(s.claimed_at || s.sent_at || "");
    if (!Number.isFinite(at)) continue;
    if (at >= weekAgo) weekCount.set(s.email, (weekCount.get(s.email) || 0) + 1);
    const show = String(s.alert_kind).slice(PRICE_ALERT_KIND_PREFIX.length).split("|")[0];
    const k = `${s.email}|${show}`;
    lastForShow.set(k, Math.max(lastForShow.get(k) || 0, at));
  }

  const skipped = { no_drop: 0, unsubscribed: 0, already_sent: 0, show_cooldown: 0, weekly_cap: 0 };
  const candidates = [];
  for (const sub of subscriptions) {
    const shown = dropsByEvent.get(sub.event_id);
    if (!shown?.length) { skipped.no_drop += 1; continue; }
    const out = optOut.get(sub.email);
    // Unsubscribing withdraws consent; confirming again afterwards is fresh consent.
    if (out && !(String(sub.confirmed_at || "") > String(out))) { skipped.unsubscribed += 1; continue; }
    // One alert per show per run: the biggest fall across ticket sites.
    const drop = [...shown].sort((a, b) => b.dropShare - a.dropShare)[0];
    if (sentKinds.has(`${sub.email}|${alertKind(drop)}`)) { skipped.already_sent += 1; continue; }
    if ((lastForShow.get(`${sub.email}|${sub.event_id}`) || 0) > cooldownAgo) { skipped.show_cooldown += 1; continue; }
    candidates.push({ email: sub.email, drop });
  }
  candidates.sort((a, b) => b.drop.dropShare - a.drop.dropShare || a.email.localeCompare(b.email) || a.drop.eventId.localeCompare(b.drop.eventId));
  const due = [];
  for (const c of candidates) {
    const used = weekCount.get(c.email) || 0;
    if (used >= PRICE_ALERT_CAPS.perAddressPerWeek) { skipped.weekly_cap += 1; continue; }
    weekCount.set(c.email, used + 1);
    due.push(c);
  }
  return { due, skipped };
}

// ── Running ────────────────────────────────────────────────────────────────

export function readProvider(env = process.env) {
  const provider = createEmailProvider(env);
  const postalAddress = String(env.ALERT_POSTAL_ADDRESS || "").trim();
  return { provider, postalAddress, canSend: provider.live && Boolean(postalAddress) };
}

async function readState(options, now) {
  const [tables] = await runD1(
    ["SELECT name FROM sqlite_master WHERE type = 'table' AND name IN ('price_alert_subscriptions', 'email_alert_sends', 'email_unsubscribes')"],
    options
  );
  const present = new Set(tables.map((r) => r.name));
  if (!present.has("price_alert_subscriptions")) return { subscriptions: [], drops: [], sends: [], unsubscribes: [] };
  const statements = ["SELECT email, event_id, artist_slug, confirmed_at FROM price_alert_subscriptions WHERE status = 'confirmed'"];
  if (present.has("email_unsubscribes")) statements.push("SELECT email, unsubscribed_at FROM email_unsubscribes");
  if (present.has("email_alert_sends")) statements.push(`SELECT email, artist_slug, alert_kind, status, claimed_at, sent_at FROM email_alert_sends WHERE alert_kind LIKE '${PRICE_ALERT_KIND_PREFIX}%'`);
  const results = await runD1(statements, options);
  const subscriptions = results[0];
  const unsubscribes = present.has("email_unsubscribes") ? results[1] : [];
  const sends = present.has("email_alert_sends") ? results[results.length - 1] : [];
  let drops = [];
  if (subscriptions.length) {
    const asOf = new Date(now).toISOString().slice(0, 10);
    const [rows] = await runD1([alertRowsSql(subscriptions.map((s) => s.event_id), asOf)], options);
    const read = async (f) => JSON.parse(await fs.readFile(path.join(REPO_ROOT, f), "utf8"));
    const [events, artists] = await Promise.all([read("public/data/events.json"), read("public/data/artists.json")]);
    drops = detectPriceDrops(rows, events, artists, { now, rules: { perArtist: Infinity, maxDrafts: Infinity } });
  }
  return { subscriptions, drops, sends, unsubscribes };
}

function printPlan({ due, skipped }, limit) {
  console.log(`Price alerts due: ${due.length}${due.length > limit ? ` (this run sends at most ${limit})` : ""}`);
  const byShow = new Map();
  for (const { drop } of due) byShow.set(drop.eventId, (byShow.get(drop.eventId) || 0) + 1);
  for (const [id, n] of byShow) console.log(`  ${id}: ${n}`);
  console.log(`Not due: ${Object.entries(skipped).map(([k, n]) => `${k}=${n}`).join(", ")}`);
}

const SAMPLE_DROP = Object.freeze({
  artist: "Sample Artist", city: "Toronto", venue: "Sample Arena", localDate: "2027-03-01", site: "Vivid Seats", currency: "USD",
  from: 100, fromDate: "2026-11-20", to: 70, toDate: "2026-11-27", capturedAt: "2026-11-27T12:00:00.000Z", dropShare: 0.3, eventPath: "/artists/sample-artist"
});

async function run(options) {
  const now = Date.now();
  const { provider, postalAddress, canSend } = readProvider();

  if (options.mode === "test") {
    const message = buildPriceDropEmail({ drop: SAMPLE_DROP, unsubscribeToken: "0".repeat(48), postalAddress: postalAddress || "(postal address not set)" });
    if (!canSend) { console.log(`Provider is ${provider.name}: no test email sent. Subject would be "[Test] ${message.subject}".`); return; }
    await provider.send(options.testTo, { ...message, subject: `[Test] ${message.subject}` }, `ttc-price-test-${randomBytes(8).toString("hex")}`);
    console.log("Sent one test alert with sample figures. Nothing was recorded.");
    return;
  }

  const plan = planPriceAlerts({ ...(await readState(options, now)), now });
  printPlan(plan, options.limit);
  if (options.mode === "preview") { console.log("Preview only: nothing was sent or written."); return; }
  if (!canSend) { console.log(`Provider is ${provider.name} or settings are incomplete: dry run, nothing sent or recorded.`); return; }

  const batch = plan.due.slice(0, options.limit);
  if (!batch.length) return;
  await runD1([...EMAIL_ALERT_SCHEMA_STATEMENTS, ...PRICE_ALERT_SCHEMA_STATEMENTS], options);
  const runId = `${new Date(now).toISOString()}-${randomBytes(4).toString("hex")}`;
  const claimedAt = new Date().toISOString();
  await runD1(
    batch.map(({ email, drop }) => `INSERT INTO email_alert_sends (email, artist_slug, alert_kind, status, run_id, unsubscribe_token, claimed_at)
VALUES (${sqlString(email)}, ${sqlString(drop.artistSlug)}, ${sqlString(alertKind(drop))}, 'claimed', ${sqlString(runId)}, ${sqlString(randomBytes(24).toString("hex"))}, ${sqlString(claimedAt)})
ON CONFLICT(email, artist_slug, alert_kind) DO UPDATE SET status = 'claimed', run_id = excluded.run_id, claimed_at = excluded.claimed_at, error = NULL
WHERE email_alert_sends.status = 'failed'`),
    options
  );
  const [claimed] = await runD1([`SELECT email, artist_slug, alert_kind, unsubscribe_token FROM email_alert_sends WHERE run_id = ${sqlString(runId)} AND status = 'claimed'`], options);
  const tokens = new Map(claimed.map((r) => [`${r.email}|${r.alert_kind}`, r.unsubscribe_token]));
  let sent = 0;
  let failed = 0;
  for (const { email, drop } of batch) {
    const token = tokens.get(`${email}|${alertKind(drop)}`);
    if (!isUnsubscribeToken(token)) continue;
    const where = `WHERE email = ${sqlString(email)} AND artist_slug = ${sqlString(drop.artistSlug)} AND alert_kind = ${sqlString(alertKind(drop))} AND run_id = ${sqlString(runId)}`;
    try {
      const result = await provider.send(email, buildPriceDropEmail({ drop, unsubscribeToken: token, postalAddress }), `ttc-price-alert-${token}`);
      await runD1([`UPDATE email_alert_sends SET status = 'sent', sent_at = ${sqlString(new Date().toISOString())}, provider_message_id = ${sqlString(result.id)} ${where}`], options);
      sent += 1;
    } catch (error) {
      failed += 1;
      console.error(`Alert for ${drop.eventId} failed: ${error.message}`);
      await runD1([`UPDATE email_alert_sends SET status = 'failed', error = ${sqlString(String(error.message).slice(0, 300))} ${where}`], options).catch(() => {});
    }
  }
  console.log(`Sent ${sent}, failed ${failed}.`);
  if (failed) process.exitCode = 1;
}

// ── Self-test ──────────────────────────────────────────────────────────────

function selfTest() {
  const now = Date.parse("2026-11-27T12:00:00Z");
  const drop = (over = {}) => ({ key: "e1|vivid-seats|USD|70", eventId: "e1", artistSlug: "a", dropShare: 0.3, ...over });
  const sub = (over = {}) => ({ email: "a@x.test", event_id: "e1", artist_slug: "a", confirmed_at: "2026-11-20T00:00:00Z", ...over });

  assert.equal(planPriceAlerts({ subscriptions: [sub()], drops: [drop()], now }).due.length, 1, "confirmed subscriber with a real drop is due");
  assert.equal(planPriceAlerts({ subscriptions: [sub()], drops: [], now }).due.length, 0, "no drop, no email");
  assert.equal(planPriceAlerts({ subscriptions: [sub({ event_id: "e2" })], drops: [drop()], now }).due.length, 0, "a drop on another show is not sent");
  assert.equal(planPriceAlerts({ subscriptions: [sub()], drops: [drop()], unsubscribes: [{ email: "a@x.test", unsubscribed_at: "2026-11-25T00:00:00Z" }], now }).due.length, 0, "unsubscribed after confirming");
  assert.equal(planPriceAlerts({ subscriptions: [sub({ confirmed_at: "2026-11-26T00:00:00Z" })], drops: [drop()], unsubscribes: [{ email: "a@x.test", unsubscribed_at: "2026-11-25T00:00:00Z" }], now }).due.length, 1, "confirming again after unsubscribing is fresh consent");
  const sentRow = { email: "a@x.test", alert_kind: alertKind(drop()), status: "sent", claimed_at: "2026-11-01T00:00:00Z" };
  assert.equal(planPriceAlerts({ subscriptions: [sub()], drops: [drop()], sends: [sentRow], now }).due.length, 0, "the same drop is never sent twice");
  assert.equal(planPriceAlerts({ subscriptions: [sub()], drops: [drop()], sends: [{ ...sentRow, status: "failed" }], now }).due.length, 1, "a failed send is retried");
  assert.equal(planPriceAlerts({ subscriptions: [sub()], drops: [drop({ key: "e1|vivid-seats|USD|60" })], sends: [{ ...sentRow, claimed_at: "2026-11-24T00:00:00Z" }], now }).skipped.show_cooldown, 1, "a further drop on the same show waits out the cooldown");
  assert.equal(planPriceAlerts({ subscriptions: [sub()], drops: [drop({ key: "e1|vivid-seats|USD|60" })], sends: [{ ...sentRow, claimed_at: "2026-11-10T00:00:00Z" }], now }).due.length, 1, "after the cooldown a new drop is sent");
  const three = planPriceAlerts({ subscriptions: ["e1", "e2", "e3"].map((id) => sub({ event_id: id })), drops: ["e1", "e2", "e3"].map((id, i) => drop({ key: `${id}|vivid-seats|USD|70`, eventId: id, dropShare: 0.4 - i * 0.05 })), now });
  assert.equal(three.due.length, PRICE_ALERT_CAPS.perAddressPerWeek, "weekly cap per address");
  assert.deepEqual(three.due.map((d) => d.drop.eventId), ["e1", "e2"], "biggest falls win the capped slots");
  const best = planPriceAlerts({ subscriptions: [sub()], drops: [drop(), drop({ key: "e1|ticketnetwork|USD|60", dropShare: 0.4 })], now });
  assert.equal(best.due.length, 1, "one alert per show per run");
  assert.equal(best.due[0].drop.dropShare, 0.4);

  const email = buildPriceDropEmail({ drop: { ...SAMPLE_DROP }, unsubscribeToken: "a".repeat(48), postalAddress: "1 Test Street" });
  assert.ok(email.text.includes("Vivid Seats's lowest listed price") && email.text.includes("$100") && email.text.includes("$70") && email.text.includes("30% lower"), "names the site, both figures and the share");
  assert.ok(email.text.includes("Captured 2026-11-27 12:00 UTC"), "carries the capture time");
  assert.ok(!/cheapest|best price|guarantee|selling fast|sold out|hurry|price match/i.test(email.text), "no cheapest, scarcity or guarantee wording");
  assert.ok(!/api\/out|evyy|impact/i.test(email.text + email.html), "never links through the redirect or an affiliate URL");
  assert.ok(email.text.includes("utm_campaign=price_alert") && email.headers["List-Unsubscribe-Post"] === "List-Unsubscribe=One-Click" && email.text.includes("1 Test Street"), "tracked link, one-click unsubscribe, postal address");
  assert.ok(alertRowsSql(["e1", "bad id'; DROP"], "2026-11-27").includes("IN ('e1')"), "show ids are validated before they reach SQL");
  assert.equal(readProvider({}).canSend, false, "default provider is the stub");
  assert.equal(readProvider({ PRICE_ALERTS_PROVIDER: "resend", RESEND_API_KEY: "k", ALERT_EMAIL_FROM: "a <a@b.test>" }).canSend, false, "no postal address, no sending");
  assert.equal(readProvider({ PRICE_ALERTS_PROVIDER: "resend", RESEND_API_KEY: "k", ALERT_EMAIL_FROM: "a <a@b.test>", ALERT_POSTAL_ADDRESS: "PO Box 1" }).canSend, true);
  assert.equal(parseArgs([]).mode, "preview");
  assert.throws(() => parseArgs(["--mode", "test"]), /--test-to/);
  assert.throws(() => parseArgs(["--mode", "blast"]), /Unknown --mode/);
  assert.deepEqual(parseD1Results('[{"results":[{"n":1}],"success":true}]', 1), [[{ n: 1 }]]);
  console.log("send-price-alerts self-test passed");
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  try {
    const options = parseArgs(process.argv.slice(2));
    if (options.help) console.log(usage());
    else if (options.selfTest) selfTest();
    else await run(options);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
