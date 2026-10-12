#!/usr/bin/env node
// Weekly updates digest: the email the optional signup box offers.
//
// The watchlist form has an unticked box: "Also send me a weekly email of
// presales and on-sales coming up. Optional; unsubscribe any time."
// /api/signup records a ticked box in email_update_consents. This script sends
// those people one email a week listing the presale windows and Ticketmaster
// public on-sales that open in the next seven days, from the same events.json
// and the same derivations the /on-sale and presale pages use, so it never
// says more than the site does.
//
// Modes:
//   preview (default)  Prints what this week's email would list and how many
//                      people would get it. Writes nothing, sends nothing,
//                      prints no addresses.
//   test               Sends this week's email to --test-to only. Records nothing.
//   send               Sends this week's email to everyone due and records each
//                      send in D1, so no one gets the same week twice.
//
// Rules this keeps:
//   - Only addresses that ticked the box. A date-alert or price-interest signup
//     alone is never enough.
//   - An unsubscribe after the box was ticked withdraws it; ticking it again
//     later is fresh consent.
//   - One email per address per ISO week (email_alert_sends primary key), with
//     the same claim-then-send order as the date alerts, so a crash means a
//     missed email, never a duplicate.
//   - Nothing is sent in a week with nothing opening.
//   - Unsubscribe link and one-click headers, postal address, and why the
//     person got it, in every email.
//   - No prices, no "cheapest", no availability claims: artist, window or
//     on-sale time and how many dates, as the site lists them.

import { randomBytes } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

import {
  EMAIL_ALERT_SCHEMA_STATEMENTS,
  DIGEST_ARTIST_SLUG,
  DIGEST_KIND_PREFIX,
  isUnsubscribeToken
} from "../functions/_email-alerts.js";
import { deriveUpcomingPresales, presalePath } from "../functions/_presales.js";
import { deriveOnsaleCalendar } from "../functions/_onsale-calendar.js";
import { readSendConfig, runD1, sendEmail, sqlString, unsubscribeUrl } from "./send-date-alerts.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const DEFAULT_D1_DATABASE = "tourticketcompare-demand";
const SITE_URL = "https://tourticketcompare.com";
const DEFAULT_LIMIT = 500;
const DAY_MS = 86400000;
const WINDOW_DAYS = 7;
const ARTISTS_SHOWN = 15;

function usage() {
  return `Usage: node scripts/send-weekly-digest.mjs [options]

Sends the weekly presale and on-sale email to signups who ticked the optional
updates box.

Options:
  --mode <preview|test|send>  preview (default) writes and sends nothing
  --test-to <address>         Recipient for --mode test (required there)
  --limit <n>                 Most emails sent in one run (default: ${DEFAULT_LIMIT})
  --database <name>           D1 database name (default: ${DEFAULT_D1_DATABASE})
  --local                     Use local D1 instead of remote
  --self-test                 Run unit tests only; no network, no D1
  -h, --help                  Show this help

Environment: as for scripts/send-date-alerts.mjs.
`;
}

export function parseArgs(argv) {
  const options = { mode: "preview", testTo: "", limit: DEFAULT_LIMIT, database: DEFAULT_D1_DATABASE, remote: true, selfTest: false, help: false };
  const value = (i, flag) => {
    const next = argv[i];
    if (!next || next.startsWith("--")) throw new Error(`${flag} requires a value`);
    return next;
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--mode") options.mode = value(++i, arg);
    else if (arg === "--test-to") options.testTo = value(++i, arg).trim().toLowerCase();
    else if (arg === "--limit") {
      const parsed = Number(value(++i, arg));
      if (!Number.isInteger(parsed) || parsed < 1) throw new Error("--limit requires an integer >= 1");
      options.limit = parsed;
    } else if (arg === "--database") options.database = value(++i, arg);
    else if (arg === "--local") options.remote = false;
    else if (arg === "--self-test") options.selfTest = true;
    else if (arg === "-h" || arg === "--help") options.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!["preview", "test", "send"].includes(options.mode)) throw new Error(`Unknown --mode: ${options.mode}`);
  if (options.mode === "test" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(options.testTo)) {
    throw new Error("--mode test requires --test-to <address>");
  }
  return options;
}

// ISO 8601 week of the run, in UTC: "2026-W41".
export function isoWeekKey(now = Date.now()) {
  const date = new Date(now);
  const day = date.getUTCDay() || 7;
  const thursday = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 4 - day);
  const year = new Date(thursday).getUTCFullYear();
  const week = Math.ceil(((thursday - Date.UTC(year, 0, 1)) / DAY_MS + 1) / 7);
  return `${year}-W${String(week).padStart(2, "0")}`;
}

export function digestKind(now = Date.now()) {
  return `${DIGEST_KIND_PREFIX}${isoWeekKey(now)}`;
}

// ── What this week's email lists ───────────────────────────────────────────
// Per artist: the earliest presale window opening in the next seven days, and
// the earliest public on-sale in the same span, each with how many dates it
// covers. Artists under review are left out, as on the date alerts.

export function digestItems({ events = [], artists = [], now = Date.now() }) {
  const listable = new Map(
    artists.filter((artist) => artist?.slug && artist.indexing_status !== "review_required").map((artist) => [artist.slug, artist])
  );
  const until = now + WINDOW_DAYS * DAY_MS;
  const items = new Map();
  const itemFor = (slug) => {
    if (!items.has(slug)) items.set(slug, { slug, name: listable.get(slug).name || slug, presale: null, onsale: null });
    return items.get(slug);
  };

  for (const artist of deriveUpcomingPresales(events, now).artists) {
    if (!listable.has(artist.artistSlug)) continue;
    const opening = artist.windows.filter((window) => !window.open && window.startMs <= until);
    if (!opening.length) continue;
    const showIds = new Set(opening.flatMap((window) => window.shows.map((show) => show.id)));
    const first = opening[0];
    itemFor(artist.artistSlug).presale = {
      startMs: first.startMs,
      start: first.start,
      timezone: first.shows[0]?.timezone || "UTC",
      showCount: showIds.size
    };
  }

  const onsales = new Map();
  for (const day of deriveOnsaleCalendar(events, now).upcoming) {
    for (const artist of day.artists) {
      if (!listable.has(artist.artistSlug)) continue;
      for (const show of artist.shows) {
        if (show.onsaleMs > until) continue;
        if (!onsales.has(artist.artistSlug)) onsales.set(artist.artistSlug, []);
        onsales.get(artist.artistSlug).push(show);
      }
    }
  }
  for (const [slug, shows] of onsales) {
    shows.sort((a, b) => a.onsaleMs - b.onsaleMs);
    itemFor(slug).onsale = { startMs: shows[0].onsaleMs, start: shows[0].onsaleAt, timezone: shows[0].timezone, showCount: shows.length };
  }

  const firstMs = (item) => Math.min(item.presale?.startMs ?? Infinity, item.onsale?.startMs ?? Infinity);
  return [...items.values()].sort((a, b) => firstMs(a) - firstMs(b) || a.name.localeCompare(b.name));
}

// ── Who is due ─────────────────────────────────────────────────────────────

export function planDigest({ consents = [], unsubscribes = [], sends = [], kind }) {
  const unsubscribedAt = new Map(unsubscribes.map((row) => [row.email, row.unsubscribed_at]));
  const alreadySent = new Set(
    sends.filter((row) => row.alert_kind === kind && row.status !== "failed").map((row) => row.email)
  );
  const due = [];
  const skipped = { unsubscribed: 0, already_sent: 0 };
  for (const consent of consents) {
    const optOut = unsubscribedAt.get(consent.email);
    if (optOut && !(String(consent.consented_at || "") > String(optOut))) { skipped.unsubscribed += 1; continue; }
    if (alreadySent.has(consent.email)) { skipped.already_sent += 1; continue; }
    due.push(consent.email);
  }
  return { due: due.sort(), skipped };
}

// ── The email ──────────────────────────────────────────────────────────────

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatInZone(iso, timeZone) {
  const options = { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" };
  try {
    return new Date(iso).toLocaleString("en-US", { ...options, timeZone: timeZone || "UTC" });
  } catch (error) {
    return new Date(iso).toLocaleString("en-US", { ...options, timeZone: "UTC" });
  }
}

function tagged(pathname) {
  const url = new URL(pathname, SITE_URL);
  url.searchParams.set("utm_source", "ttc_alerts");
  url.searchParams.set("utm_medium", "email");
  url.searchParams.set("utm_campaign", "weekly_digest");
  return url.toString();
}

const dates = (n) => `${n} ${n === 1 ? "date" : "dates"}`;

export function itemLines(item) {
  const parts = [];
  if (item.presale) parts.push(`presales from ${formatInZone(item.presale.start, item.presale.timezone)} (${dates(item.presale.showCount)})`);
  if (item.onsale) parts.push(`public on-sale ${formatInZone(item.onsale.start, item.onsale.timezone)} (${dates(item.onsale.showCount)})`);
  return {
    text: `${item.name}: ${parts.join("; ")}`,
    href: tagged(item.presale ? presalePath(item.slug) : `/artists/${item.slug}`)
  };
}

export function buildDigest({ items, token, postalAddress, weekKey }) {
  const shown = items.slice(0, ARTISTS_SHOWN).map((item) => ({ item, ...itemLines(item) }));
  const more = items.length - shown.length;
  const names = shown.slice(0, 2).map(({ item }) => item.name);
  const subject = `Presales and on-sales this week: ${names.join(", ")}${items.length > names.length ? ` and ${items.length - names.length} more` : ""}`;
  const intro = `Presale windows and Ticketmaster public on-sales opening in the next seven days, for artists TourTicketCompare tracks. Times are as Ticketmaster lists them.`;
  const calendar = tagged("/on-sale");
  const unsubscribe = unsubscribeUrl(token);
  const sellerNote = "Each ticket link on the site goes to the seller's own page, which shows current prices, fees and availability.";
  const why = `You got this because you ticked "weekly email of presales and on-sales" when signing up on tourticketcompare.com (week ${weekKey}).`;
  const independence = "TourTicketCompare is an independent fan site, not affiliated with any artist, venue or ticket seller.";

  const text = [
    intro,
    "",
    ...shown.map(({ text: line, href }) => `- ${line}\n  ${href}`),
    ...(more > 0 ? [`- and ${more} more: ${calendar}`] : []),
    "",
    `Full on-sale calendar: ${calendar}`,
    "",
    sellerNote,
    "",
    "--",
    why,
    `Unsubscribe from all TourTicketCompare emails: ${unsubscribe}`,
    independence,
    postalAddress
  ].join("\n");

  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${escapeHtml(subject)}</title></head><body style="margin:0;padding:24px;background:#f6f6f4;font-family:Arial,Helvetica,sans-serif;color:#1d1d1b;line-height:1.5"><div style="max-width:560px;margin:0 auto;background:#ffffff;padding:24px;border-radius:8px"><p style="margin:0 0 16px">${escapeHtml(intro)}</p><ul style="margin:0 0 16px;padding-left:20px">${shown
    .map(({ text: line, href }) => `<li style="margin:0 0 8px"><a href="${escapeHtml(href)}" style="color:#1d1d1b">${escapeHtml(line)}</a></li>`)
    .join("")}${more > 0 ? `<li>and ${more} more</li>` : ""}</ul><p style="margin:0 0 16px"><a href="${escapeHtml(calendar)}" style="display:inline-block;background:#1d1d1b;color:#ffffff;padding:10px 16px;border-radius:6px;text-decoration:none">See the full on-sale calendar</a></p><p style="margin:0 0 16px;font-size:14px">${escapeHtml(sellerNote)}</p><hr style="border:none;border-top:1px solid #ddd;margin:24px 0 16px" /><p style="margin:0 0 8px;font-size:12px;color:#555">${escapeHtml(why)} <a href="${escapeHtml(unsubscribe)}" style="color:#555">Unsubscribe from all TourTicketCompare emails</a>.</p><p style="margin:0 0 8px;font-size:12px;color:#555">${escapeHtml(independence)}</p><p style="margin:0;font-size:12px;color:#555">${escapeHtml(postalAddress)}</p></div></body></html>`;

  return {
    subject,
    text,
    html,
    headers: { "List-Unsubscribe": `<${unsubscribe}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" }
  };
}

// ── D1 and the run ─────────────────────────────────────────────────────────

async function readState(options, kind) {
  const [tables] = await runD1(
    ["SELECT name FROM sqlite_master WHERE type = 'table' AND name IN ('email_update_consents', 'email_unsubscribes', 'email_alert_sends')"],
    options
  );
  const present = new Set(tables.map((row) => row.name));
  if (!present.has("email_update_consents")) return { consents: [], unsubscribes: [], sends: [] };
  const statements = ["SELECT email, consented_at FROM email_update_consents"];
  if (present.has("email_unsubscribes")) statements.push("SELECT email, unsubscribed_at FROM email_unsubscribes");
  if (present.has("email_alert_sends")) statements.push(`SELECT email, alert_kind, status FROM email_alert_sends WHERE alert_kind = ${sqlString(kind)}`);
  const results = await runD1(statements, options);
  return {
    consents: results[0],
    unsubscribes: present.has("email_unsubscribes") ? results[1] : [],
    sends: present.has("email_alert_sends") ? results[results.length - 1] : []
  };
}

async function readRepoData() {
  const read = async (file) => JSON.parse(await fs.readFile(path.join(REPO_ROOT, file), "utf8"));
  return { artists: await read("public/data/artists.json"), events: await read("public/data/events.json") };
}

function printItems(items) {
  console.log(`Artists with a presale or public on-sale opening in the next ${WINDOW_DAYS} days: ${items.length}`);
  for (const item of items.slice(0, ARTISTS_SHOWN)) console.log(`  ${itemLines(item).text}`);
  if (items.length > ARTISTS_SHOWN) console.log(`  and ${items.length - ARTISTS_SHOWN} more (the email links to /on-sale for them)`);
}

async function run(options) {
  const now = Date.now();
  const kind = digestKind(now);
  const weekKey = isoWeekKey(now);
  const items = digestItems({ ...(await readRepoData()), now });

  if (options.mode === "test") {
    const config = readSendConfig();
    if (!items.length) throw new Error("Nothing opens in the next seven days, so there is no email to sample.");
    // A token no send row holds: the sample's unsubscribe link opens the
    // "link didn't work" page instead of unsubscribing anyone.
    const message = buildDigest({ items, token: "0".repeat(48), postalAddress: config.postalAddress, weekKey });
    await sendEmail(config, options.testTo, { ...message, subject: `[Test] ${message.subject}` }, `ttc-digest-test-${randomBytes(8).toString("hex")}`);
    console.log(`Sent one test digest for ${weekKey}. Nothing was recorded.`);
    return;
  }

  printItems(items);
  const plan = planDigest({ ...(await readState(options, kind)), kind });
  console.log(`Digest ${weekKey} due for: ${plan.due.length}${plan.due.length > options.limit ? ` (this run sends at most ${options.limit}; run send again for the rest)` : ""}`);
  console.log(`Not due: ${Object.entries(plan.skipped).map(([reason, n]) => `${reason}=${n}`).join(", ")}`);

  if (options.mode === "preview") {
    console.log("Preview only: nothing was sent or written.");
    return;
  }
  if (!items.length) {
    console.log("Nothing opens this week, so nothing was sent.");
    return;
  }

  const config = readSendConfig();
  await runD1([...EMAIL_ALERT_SCHEMA_STATEMENTS], options);
  const batch = plan.due.slice(0, options.limit);
  if (!batch.length) return;

  const runId = `${new Date().toISOString()}-${randomBytes(4).toString("hex")}`;
  const claimedAt = new Date().toISOString();
  await runD1(
    batch.map(
      (email) => `INSERT INTO email_alert_sends (email, artist_slug, alert_kind, status, run_id, unsubscribe_token, claimed_at)
VALUES (${sqlString(email)}, ${sqlString(DIGEST_ARTIST_SLUG)}, ${sqlString(kind)}, 'claimed', ${sqlString(runId)}, ${sqlString(randomBytes(24).toString("hex"))}, ${sqlString(claimedAt)})
ON CONFLICT(email, artist_slug, alert_kind) DO UPDATE SET status = 'claimed', run_id = excluded.run_id, claimed_at = excluded.claimed_at, error = NULL
WHERE email_alert_sends.status = 'failed'`
    ),
    options
  );
  const [claimed] = await runD1(
    [`SELECT email, unsubscribe_token FROM email_alert_sends WHERE run_id = ${sqlString(runId)} AND status = 'claimed'`],
    options
  );

  let sent = 0;
  let failed = 0;
  for (const row of claimed) {
    if (!isUnsubscribeToken(row.unsubscribe_token)) continue;
    const where = `WHERE email = ${sqlString(row.email)} AND artist_slug = ${sqlString(DIGEST_ARTIST_SLUG)} AND alert_kind = ${sqlString(kind)} AND run_id = ${sqlString(runId)}`;
    try {
      const message = buildDigest({ items, token: row.unsubscribe_token, postalAddress: config.postalAddress, weekKey });
      const messageId = await sendEmail(config, row.email, message, `ttc-digest-${row.unsubscribe_token}`);
      await runD1([`UPDATE email_alert_sends SET status = 'sent', sent_at = ${sqlString(new Date().toISOString())}, provider_message_id = ${sqlString(messageId)} ${where}`], options);
      sent += 1;
    } catch (error) {
      failed += 1;
      console.error(`Digest send failed: ${error.message}`);
      await runD1([`UPDATE email_alert_sends SET status = 'failed', error = ${sqlString(String(error.message).slice(0, 300))} ${where}`], options).catch(() => {});
    }
  }
  console.log(`Sent ${sent}, failed ${failed}.`);
  if (failed) process.exitCode = 1;
}

// ── Self-test ──────────────────────────────────────────────────────────────

function selfTest() {
  const now = Date.parse("2026-10-09T12:00:00Z");
  assert.equal(isoWeekKey(now), "2026-W41");
  assert.equal(isoWeekKey(Date.parse("2027-01-01T00:00:00Z")), "2026-W53", "ISO week-year at the turn of the year");
  assert.equal(digestKind(now), "weekly_digest:2026-W41");

  const event = (overrides) => ({
    id: "e",
    artist_slug: "olivia-rodrigo",
    artist_name: "Olivia Rodrigo",
    city: "Toronto",
    venue: "Scotiabank Arena",
    datetime_iso: "2027-03-01T00:00:00Z",
    timezone: "America/Toronto",
    ...overrides
  });
  const events = [
    event({ id: "or-1", presales: [{ name: "Artist Presale", start: "2026-10-13T14:00:00Z", end: "2026-10-14T03:00:00Z" }], public_onsale_at: "2026-10-15T14:00:00Z" }),
    event({ id: "or-2", presales: [{ name: "Artist Presale", start: "2026-10-13T14:00:00Z", end: "2026-10-14T03:00:00Z" }] }),
    event({ id: "late", artist_slug: "tame-impala", artist_name: "Tame Impala", public_onsale_at: "2026-10-30T14:00:00Z" }),
    event({ id: "open", artist_slug: "shakira", artist_name: "Shakira", presales: [{ name: "Fan Presale", start: "2026-10-08T14:00:00Z", end: "2026-10-12T03:00:00Z" }] }),
    event({ id: "review", artist_slug: "under-review", artist_name: "Under Review", public_onsale_at: "2026-10-10T14:00:00Z" }),
    event({ id: "cancelled", artist_slug: "rosalia", artist_name: "Rosalía", public_onsale_at: "2026-10-10T14:00:00Z", ticketmaster_status_code: "cancelled" }),
    event({ id: "gaga", artist_slug: "lady-gaga", artist_name: "Lady Gaga", public_onsale_at: "2026-10-10T15:00:00Z", timezone: "Europe/London" })
  ];
  const artists = [
    { slug: "olivia-rodrigo", name: "Olivia Rodrigo", indexing_status: "indexable_with_substantial_content" },
    { slug: "tame-impala", name: "Tame Impala", indexing_status: "indexable_with_substantial_content" },
    { slug: "shakira", name: "Shakira", indexing_status: "indexable_with_substantial_content" },
    { slug: "under-review", name: "Under Review", indexing_status: "review_required" },
    { slug: "rosalia", name: "Rosalía", indexing_status: "indexable_with_substantial_content" },
    { slug: "lady-gaga", name: "Lady <Gaga>", indexing_status: "indexable_with_substantial_content" }
  ];
  const items = digestItems({ events, artists, now });
  assert.deepEqual(items.map((item) => item.slug), ["lady-gaga", "olivia-rodrigo"], "beyond seven days, already open, under review and cancelled are left out; earliest first");
  const olivia = items[1];
  assert.equal(olivia.presale.showCount, 2, "a window shared by two dates counts both");
  assert.equal(olivia.onsale.showCount, 1);
  const line = itemLines(olivia);
  assert.equal(line.text, "Olivia Rodrigo: presales from Tue, Oct 13, 10:00 AM EDT (2 dates); public on-sale Thu, Oct 15, 10:00 AM EDT (1 date)");
  assert.ok(line.href.startsWith(`${SITE_URL}/artists/olivia-rodrigo/presale?`) && line.href.includes("utm_campaign=weekly_digest"), "presale items link to the presale page");
  assert.ok(itemLines(items[0]).href.startsWith(`${SITE_URL}/artists/lady-gaga?`), "on-sale-only items link to the artist page");

  const consents = [
    { email: "a@x.test", consented_at: "2026-10-01T00:00:00Z" },
    { email: "b@x.test", consented_at: "2026-10-01T00:00:00Z" },
    { email: "c@x.test", consented_at: "2026-10-05T00:00:00Z" },
    { email: "d@x.test", consented_at: "2026-10-01T00:00:00Z" },
    { email: "e@x.test", consented_at: "2026-10-01T00:00:00Z" }
  ];
  const unsubscribes = [
    { email: "b@x.test", unsubscribed_at: "2026-10-03T00:00:00Z" },
    { email: "c@x.test", unsubscribed_at: "2026-10-03T00:00:00Z" }
  ];
  const kind = digestKind(now);
  const sends = [
    { email: "d@x.test", alert_kind: kind, status: "sent" },
    { email: "e@x.test", alert_kind: kind, status: "failed" },
    { email: "a@x.test", alert_kind: "weekly_digest:2026-W40", status: "sent" }
  ];
  const plan = planDigest({ consents, unsubscribes, sends, kind });
  assert.deepEqual(plan.due, ["a@x.test", "c@x.test", "e@x.test"], "last week's send, a re-tick after unsubscribing and a failed send are due");
  assert.deepEqual(plan.skipped, { unsubscribed: 1, already_sent: 1 });
  assert.equal(planDigest({ consents: [consents[3]], sends: [{ ...sends[0], status: "claimed" }], kind }).due.length, 0, "a claimed row is never resent");

  const token = "b".repeat(48);
  const email = buildDigest({ items, token, postalAddress: "1 Test Street", weekKey: "2026-W41" });
  assert.equal(email.subject, "Presales and on-sales this week: Lady <Gaga>, Olivia Rodrigo");
  assert.ok(email.html.includes("Lady &lt;Gaga&gt;") && !email.html.includes("Lady <Gaga>"), "names are escaped in HTML");
  assert.ok(email.text.includes(`${SITE_URL}/api/unsubscribe?t=${token}`) && email.html.includes(`/api/unsubscribe?t=${token}`), "unsubscribe link in both parts");
  assert.equal(email.headers["List-Unsubscribe-Post"], "List-Unsubscribe=One-Click");
  assert.ok(email.text.includes("1 Test Street") && email.text.includes("You got this because you ticked"), "postal address and reason present");
  assert.ok(!/cheapest|lowest price|\$\d|£\d|€\d|sold out|selling fast/i.test(email.text), "no price or availability claims");

  const many = Array.from({ length: 18 }, (_, i) => ({ ...olivia, slug: `a${i}`, name: `Artist ${i}` }));
  const long = buildDigest({ items: many, token, postalAddress: "x", weekKey: "2026-W41" });
  assert.ok(long.subject.endsWith("Artist 0, Artist 1 and 16 more") && long.text.includes("- and 3 more:"), "long weeks are capped and point at /on-sale");

  assert.equal(parseArgs([]).mode, "preview");
  assert.throws(() => parseArgs(["--mode", "test"]), /--test-to/);
  console.log("send-weekly-digest self-test passed");
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
