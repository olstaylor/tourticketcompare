#!/usr/bin/env node
// Artist date alerts: the email the watchlist form promises.
//
// The form on an artist page with no dates says "Leave your email to hear when
// confirmed <artist> dates are listed. Nothing else." /api/signup stores that
// as an artist_interests row. This script finds the rows whose artist now has
// listed upcoming dates in public/data/events.json and sends each person one
// email for that artist, once. It reads the same events.json the site renders,
// so it never says more than the artist page does.
//
// Modes:
//   preview (default)  Reads D1 and prints how many alerts are due, per artist.
//                      Writes nothing, sends nothing, prints no addresses.
//   test               Sends one sample alert to --test-to only. Records nothing.
//   send               Sends every due alert and records each one in D1, so no
//                      one is emailed twice for the same artist.
//
// Rules this keeps:
//   - Only artist date-alert signups. A price-drop "register interest" address
//     is never in artist_interests (see functions/api/signup.js), so it is
//     never reached.
//   - Anyone in email_unsubscribes is skipped, unless they signed up for that
//     artist again after unsubscribing.
//   - One email per address and artist, ever (email_alert_sends primary key).
//     A row is claimed before the send and marked sent or failed after; a crash
//     in between leaves it claimed, which is never retried, so the failure mode
//     is a missed email rather than a duplicate.
//   - Every email carries an unsubscribe link and one-click List-Unsubscribe
//     headers, the sender's postal address, and why the person got it.
//   - No prices, no "cheapest", no availability claims: dates, cities, venues
//     and on-sale times only, exactly as the site lists them.

import { execFile } from "node:child_process";
import { randomBytes } from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { EMAIL_ALERT_SCHEMA_STATEMENTS, DATE_ALERT_KIND, isUnsubscribeToken } from "../functions/_email-alerts.js";
import { eventLifecycleHeld, eventPublishable, publicOnsalePending } from "../functions/_route-indexability.js";

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const DEFAULT_D1_DATABASE = "tourticketcompare-demand";
const SITE_URL = "https://tourticketcompare.com";
const DEFAULT_LIMIT = 50;
const DATES_SHOWN = 6;
const RESEND_ENDPOINT = "https://api.resend.com/emails";

function usage() {
  return `Usage: node scripts/send-date-alerts.mjs [options]

Sends the one-off "dates are now listed" email to watchlist signups whose
artist now has upcoming dates on the site.

Options:
  --mode <preview|test|send>  preview (default) writes and sends nothing
  --test-to <address>         Recipient for --mode test (required there)
  --artist <slug>             Artist for the --mode test sample
  --limit <n>                 Most alerts sent in one run (default: ${DEFAULT_LIMIT})
  --database <name>           D1 database name (default: ${DEFAULT_D1_DATABASE})
  --local                     Use local D1 instead of remote
  --self-test                 Run unit tests only; no network, no D1
  -h, --help                  Show this help

Environment (test and send modes):
  RESEND_API_KEY        Resend API key
  ALERT_EMAIL_FROM      From header, e.g. "TourTicketCompare <alerts@tourticketcompare.com>"
  ALERT_POSTAL_ADDRESS  Sender postal address printed in every email
  ALERT_REPLY_TO        Optional Reply-To address

Environment (all modes except --self-test):
  CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID  for wrangler's remote D1 access
`;
}

export function parseArgs(argv) {
  const options = {
    mode: "preview",
    testTo: "",
    artist: "",
    limit: DEFAULT_LIMIT,
    database: DEFAULT_D1_DATABASE,
    remote: true,
    selfTest: false,
    help: false
  };
  const value = (i, flag) => {
    const next = argv[i];
    if (!next || next.startsWith("--")) throw new Error(`${flag} requires a value`);
    return next;
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--mode") options.mode = value(++i, arg);
    else if (arg === "--test-to") options.testTo = value(++i, arg).trim().toLowerCase();
    else if (arg === "--artist") options.artist = value(++i, arg).trim().toLowerCase();
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

// ── What counts as "dates are listed" ──────────────────────────────────────
// An upcoming date the artist page shows: not cancelled or postponed, and
// either with a publishable ticket link now or with a Ticketmaster public
// on-sale still to come (the page lists those with their on-sale time).

export function listedDatesFor(events, artistSlug, now = Date.now()) {
  return events
    .filter((event) => event?.artist_slug === artistSlug)
    .filter((event) => {
      const at = Date.parse(String(event?.datetime_iso || ""));
      return Number.isFinite(at) && at >= now;
    })
    .filter((event) => !eventLifecycleHeld(event))
    .filter((event) => eventPublishable(event, now) || publicOnsalePending(event, now))
    .sort((a, b) => Date.parse(a.datetime_iso) - Date.parse(b.datetime_iso));
}

// ── Who is due ─────────────────────────────────────────────────────────────

export function planAlerts({ interests = [], unsubscribes = [], sends = [], artists = [], events = [], now = Date.now() }) {
  const artistBySlug = new Map(artists.map((artist) => [artist.slug, artist]));
  const unsubscribedAt = new Map(unsubscribes.map((row) => [row.email, row.unsubscribed_at]));
  const alreadySent = new Set(sends.filter((row) => row.alert_kind === DATE_ALERT_KIND).map((row) => `${row.email}|${row.artist_slug}`));
  const datesCache = new Map();
  const due = [];
  const skipped = { unknown_artist: 0, artist_under_review: 0, no_listed_dates: 0, unsubscribed: 0, already_sent: 0 };

  for (const interest of interests) {
    const { email, artist_slug: slug } = interest;
    const artist = artistBySlug.get(slug);
    if (!artist) { skipped.unknown_artist += 1; continue; }
    if (artist.indexing_status === "review_required") { skipped.artist_under_review += 1; continue; }
    if (alreadySent.has(`${email}|${slug}`)) { skipped.already_sent += 1; continue; }
    const optOut = unsubscribedAt.get(email);
    // Signing up for the artist again after unsubscribing is fresh consent.
    if (optOut && !(String(interest.updated_at || "") > String(optOut))) { skipped.unsubscribed += 1; continue; }
    if (!datesCache.has(slug)) datesCache.set(slug, listedDatesFor(events, slug, now));
    const dates = datesCache.get(slug);
    if (!dates.length) { skipped.no_listed_dates += 1; continue; }
    due.push({ email, artist, dates });
  }
  due.sort((a, b) => a.artist.slug.localeCompare(b.artist.slug));
  return { due, skipped };
}

export function summarizeByArtist(due) {
  const counts = new Map();
  for (const alert of due) counts.set(alert.artist.slug, (counts.get(alert.artist.slug) || 0) + 1);
  return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
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

function formatInZone(iso, timeZone, options) {
  const date = new Date(iso);
  try {
    return date.toLocaleString("en-US", { ...options, timeZone: timeZone || "UTC" });
  } catch (error) {
    return date.toLocaleString("en-US", { ...options, timeZone: "UTC" });
  }
}

export function dateLine(event, now = Date.now()) {
  const day = formatInZone(event.datetime_iso, event.timezone, { weekday: "short", month: "short", day: "numeric", year: "numeric" });
  const place = [event.city, event.venue].filter(Boolean).join(", ");
  const onsale = publicOnsalePending(event, now)
    ? ` (public on-sale ${formatInZone(event.public_onsale_at, event.timezone, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" })} per Ticketmaster)`
    : "";
  return `${day}: ${place}${onsale}`;
}

export function artistUrl(slug) {
  const url = new URL(`/artists/${slug}`, SITE_URL);
  url.searchParams.set("utm_source", "ttc_alerts");
  url.searchParams.set("utm_medium", "email");
  url.searchParams.set("utm_campaign", "date_alert");
  return url.toString();
}

export function unsubscribeUrl(token) {
  return `${SITE_URL}/api/unsubscribe?t=${token}`;
}

export function buildEmail({ artist, dates, token, postalAddress, now = Date.now() }) {
  const name = artist.name;
  const count = dates.length;
  const shown = dates.slice(0, DATES_SHOWN).map((event) => dateLine(event, now));
  const more = count - shown.length;
  const link = artistUrl(artist.slug);
  const unsubscribe = unsubscribeUrl(token);
  const subject = `${name} dates are now listed`;
  const intro = `You asked TourTicketCompare to email you when confirmed ${name} dates were listed. ${count} upcoming ${count === 1 ? "date is" : "dates are"} on the site now.`;
  const sellerNote = "Each ticket link goes to the seller's own page, which shows current prices, fees and availability.";
  const why = `This is a one-off alert: you won't get another email about ${name}. You got it because this address was entered in the date-alert form on tourticketcompare.com.`;
  const independence = "TourTicketCompare is an independent fan site, not affiliated with any artist, venue or ticket seller.";

  const text = [
    intro,
    "",
    ...shown.map((line) => `- ${line}`),
    ...(more > 0 ? [`- and ${more} more`] : []),
    "",
    `See the dates and ticket links: ${link}`,
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
    .map((line) => `<li>${escapeHtml(line)}</li>`)
    .join("")}${more > 0 ? `<li>and ${more} more</li>` : ""}</ul><p style="margin:0 0 16px"><a href="${escapeHtml(link)}" style="display:inline-block;background:#1d1d1b;color:#ffffff;padding:10px 16px;border-radius:6px;text-decoration:none">See ${escapeHtml(name)} dates and ticket links</a></p><p style="margin:0 0 16px;font-size:14px">${escapeHtml(sellerNote)}</p><hr style="border:none;border-top:1px solid #ddd;margin:24px 0 16px" /><p style="margin:0 0 8px;font-size:12px;color:#555">${escapeHtml(why)} <a href="${escapeHtml(unsubscribe)}" style="color:#555">Unsubscribe from all TourTicketCompare emails</a>.</p><p style="margin:0 0 8px;font-size:12px;color:#555">${escapeHtml(independence)}</p><p style="margin:0;font-size:12px;color:#555">${escapeHtml(postalAddress)}</p></div></body></html>`;

  return {
    subject,
    text,
    html,
    headers: {
      "List-Unsubscribe": `<${unsubscribe}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click"
    }
  };
}

// ── Sending ────────────────────────────────────────────────────────────────

export function readSendConfig(env = process.env) {
  const config = {
    apiKey: String(env.RESEND_API_KEY || "").trim(),
    from: String(env.ALERT_EMAIL_FROM || "").trim(),
    postalAddress: String(env.ALERT_POSTAL_ADDRESS || "").trim(),
    replyTo: String(env.ALERT_REPLY_TO || "").trim()
  };
  const missing = [
    ["RESEND_API_KEY", config.apiKey],
    ["ALERT_EMAIL_FROM", config.from],
    ["ALERT_POSTAL_ADDRESS", config.postalAddress]
  ].filter(([, v]) => !v).map(([k]) => k);
  if (missing.length) throw new Error(`Sending needs ${missing.join(", ")}. Nothing was sent.`);
  return config;
}

async function sendEmail(config, to, message, idempotencyKey) {
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey
    },
    body: JSON.stringify({
      from: config.from,
      to: [to],
      subject: message.subject,
      html: message.html,
      text: message.text,
      headers: message.headers,
      ...(config.replyTo ? { reply_to: config.replyTo } : {})
    })
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`Resend returned ${response.status}: ${String(body?.message || body?.name || "").slice(0, 200)}`);
  return String(body?.id || "");
}

// ── D1 through wrangler ────────────────────────────────────────────────────

export function sqlString(value) {
  return `'${String(value ?? "").replace(/'/g, "''")}'`;
}

async function runD1(statements, options) {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "ttc-date-alerts-"));
  const sqlPath = path.join(tempDir, "date-alerts.sql");
  await fs.writeFile(sqlPath, `${statements.map((sql) => `${sql};`).join("\n")}\n`, "utf8");
  const args = ["wrangler", "d1", "execute", options.database, options.remote ? "--remote" : "--local", "--file", sqlPath, "--json"];
  try {
    const result = await execFileAsync("npx", args, { cwd: REPO_ROOT, maxBuffer: 1024 * 1024 * 10 });
    const parsed = JSON.parse(result.stdout);
    if (!Array.isArray(parsed) || parsed.some((entry) => entry?.success !== true)) {
      throw new Error("a D1 statement did not succeed");
    }
    return parsed.map((entry) => entry.results || []);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

async function readSubscriberState(options) {
  const [tables] = await runD1(
    ["SELECT name FROM sqlite_master WHERE type = 'table' AND name IN ('email_alert_sends', 'email_unsubscribes')"],
    options
  );
  const present = new Set(tables.map((row) => row.name));
  const statements = ["SELECT email, artist_slug, created_at, updated_at FROM artist_interests"];
  if (present.has("email_unsubscribes")) statements.push("SELECT email, unsubscribed_at FROM email_unsubscribes");
  if (present.has("email_alert_sends")) statements.push("SELECT email, artist_slug, alert_kind, status FROM email_alert_sends");
  const results = await runD1(statements, options);
  return {
    interests: results[0],
    unsubscribes: present.has("email_unsubscribes") ? results[1] : [],
    sends: present.has("email_alert_sends") ? results[results.length - 1] : []
  };
}

async function readRepoData() {
  const read = async (file) => JSON.parse(await fs.readFile(path.join(REPO_ROOT, file), "utf8"));
  return { artists: await read("public/data/artists.json"), events: await read("public/data/events.json") };
}

function printPlan({ due, skipped }, limit) {
  console.log(`Date alerts due: ${due.length}${due.length > limit ? ` (this run sends at most ${limit})` : ""}`);
  for (const [slug, count] of summarizeByArtist(due)) console.log(`  ${slug}: ${count}`);
  console.log(`Not due: ${Object.entries(skipped).map(([reason, n]) => `${reason}=${n}`).join(", ")}`);
}

async function run(options) {
  const repo = await readRepoData();

  if (options.mode === "test") {
    const config = readSendConfig();
    const state = await readSubscriberState(options);
    const plan = planAlerts({ ...state, ...repo });
    const slug = options.artist || plan.due[0]?.artist.slug;
    const artist = repo.artists.find((candidate) => candidate.slug === slug);
    const dates = artist ? listedDatesFor(repo.events, artist.slug) : [];
    if (!artist || !dates.length) throw new Error("No artist with listed dates to sample; pass --artist <slug>.");
    // A token no send row holds: the sample's unsubscribe link opens the
    // "link didn't work" page instead of unsubscribing anyone.
    const message = buildEmail({ artist, dates, token: "0".repeat(48), postalAddress: config.postalAddress });
    await sendEmail(config, options.testTo, { ...message, subject: `[Test] ${message.subject}` }, `ttc-test-${randomBytes(8).toString("hex")}`);
    console.log(`Sent one test alert for ${artist.slug}. Nothing was recorded.`);
    return;
  }

  if (options.mode === "preview") {
    printPlan(planAlerts({ ...(await readSubscriberState(options)), ...repo }), options.limit);
    console.log("Preview only: nothing was sent or written.");
    return;
  }

  const config = readSendConfig();
  await runD1([...EMAIL_ALERT_SCHEMA_STATEMENTS], options);
  const plan = planAlerts({ ...(await readSubscriberState(options)), ...repo });
  printPlan(plan, options.limit);
  const batch = plan.due.slice(0, options.limit);
  if (!batch.length) return;

  const runId = `${new Date().toISOString()}-${randomBytes(4).toString("hex")}`;
  const claimedAt = new Date().toISOString();
  // Claim every alert in this batch. A previously failed row is re-claimed; a
  // sent or still-claimed row is left alone and so is not in the result.
  await runD1(
    batch.map(
      (alert) => `INSERT INTO email_alert_sends (email, artist_slug, alert_kind, status, run_id, unsubscribe_token, claimed_at)
VALUES (${sqlString(alert.email)}, ${sqlString(alert.artist.slug)}, ${sqlString(DATE_ALERT_KIND)}, 'claimed', ${sqlString(runId)}, ${sqlString(randomBytes(24).toString("hex"))}, ${sqlString(claimedAt)})
ON CONFLICT(email, artist_slug, alert_kind) DO UPDATE SET status = 'claimed', run_id = excluded.run_id, claimed_at = excluded.claimed_at, error = NULL
WHERE email_alert_sends.status = 'failed'`
    ),
    options
  );
  const [claimed] = await runD1(
    [`SELECT email, artist_slug, unsubscribe_token FROM email_alert_sends WHERE run_id = ${sqlString(runId)} AND status = 'claimed'`],
    options
  );
  const claimedKeys = new Map(claimed.map((row) => [`${row.email}|${row.artist_slug}`, row.unsubscribe_token]));

  let sent = 0;
  let failed = 0;
  for (const alert of batch) {
    const token = claimedKeys.get(`${alert.email}|${alert.artist.slug}`);
    if (!isUnsubscribeToken(token)) continue;
    const where = `WHERE email = ${sqlString(alert.email)} AND artist_slug = ${sqlString(alert.artist.slug)} AND alert_kind = ${sqlString(DATE_ALERT_KIND)} AND run_id = ${sqlString(runId)}`;
    try {
      const message = buildEmail({ artist: alert.artist, dates: alert.dates, token, postalAddress: config.postalAddress });
      const messageId = await sendEmail(config, alert.email, message, `ttc-date-alert-${token}`);
      await runD1([`UPDATE email_alert_sends SET status = 'sent', sent_at = ${sqlString(new Date().toISOString())}, provider_message_id = ${sqlString(messageId)} ${where}`], options);
      sent += 1;
    } catch (error) {
      failed += 1;
      console.error(`Alert for ${alert.artist.slug} failed: ${error.message}`);
      await runD1([`UPDATE email_alert_sends SET status = 'failed', error = ${sqlString(String(error.message).slice(0, 300))} ${where}`], options).catch(() => {});
    }
  }
  console.log(`Sent ${sent}, failed ${failed}.`);
  if (failed) process.exitCode = 1;
}

// ── Self-test ──────────────────────────────────────────────────────────────

function selfTest() {
  const now = Date.parse("2026-10-02T12:00:00Z");
  const event = (overrides) => ({
    id: "e",
    artist_slug: "olivia-rodrigo",
    city: "Toronto",
    venue: "Scotiabank Arena",
    datetime_iso: "2026-11-01T23:00:00Z",
    timezone: "America/Toronto",
    ticketmaster_url: "https://www.ticketmaster.ca/event/1",
    provider_links: { ticketmaster: { verified: true, url: "https://www.ticketmaster.ca/event/1" } },
    ...overrides
  });
  const events = [
    event({ id: "future" }),
    event({ id: "past", datetime_iso: "2026-09-01T23:00:00Z" }),
    event({ id: "cancelled", ticketmaster_status_code: "cancelled" }),
    event({ id: "onsale-pending", datetime_iso: "2026-12-01T23:00:00Z", public_onsale_at: "2026-10-09T14:00:00Z" }),
    event({ id: "tame", artist_slug: "tame-impala" })
  ];

  const listed = listedDatesFor(events, "olivia-rodrigo", now).map((e) => e.id);
  assert.deepEqual(listed, ["future", "onsale-pending"], "past and cancelled dates are not listed; on-sale-pending dates are");

  const artists = [
    { slug: "olivia-rodrigo", name: "Olivia Rodrigo", indexing_status: "indexable_with_substantial_content" },
    { slug: "tame-impala", name: "Tame Impala", indexing_status: "review_required" },
    { slug: "rosalia", name: "Rosalía", indexing_status: "indexable_with_substantial_content" }
  ];
  const interests = [
    { email: "a@x.test", artist_slug: "olivia-rodrigo", updated_at: "2026-07-24T00:00:00Z" },
    { email: "b@x.test", artist_slug: "olivia-rodrigo", updated_at: "2026-07-24T00:00:00Z" },
    { email: "c@x.test", artist_slug: "olivia-rodrigo", updated_at: "2026-07-24T00:00:00Z" },
    { email: "d@x.test", artist_slug: "olivia-rodrigo", updated_at: "2026-09-30T00:00:00Z" },
    { email: "e@x.test", artist_slug: "tame-impala", updated_at: "2026-07-24T00:00:00Z" },
    { email: "f@x.test", artist_slug: "rosalia", updated_at: "2026-07-24T00:00:00Z" },
    { email: "g@x.test", artist_slug: "gone", updated_at: "2026-07-24T00:00:00Z" }
  ];
  const unsubscribes = [
    { email: "b@x.test", unsubscribed_at: "2026-08-01T00:00:00Z" },
    { email: "d@x.test", unsubscribed_at: "2026-08-01T00:00:00Z" }
  ];
  const sends = [{ email: "c@x.test", artist_slug: "olivia-rodrigo", alert_kind: DATE_ALERT_KIND, status: "sent" }];
  const plan = planAlerts({ interests, unsubscribes, sends, artists, events, now });
  assert.deepEqual(plan.due.map((alert) => alert.email).sort(), ["a@x.test", "d@x.test"], "due: fresh signup, and a re-signup after unsubscribing");
  assert.deepEqual(plan.skipped, { unknown_artist: 1, artist_under_review: 1, no_listed_dates: 1, unsubscribed: 1, already_sent: 1 });
  assert.deepEqual(summarizeByArtist(plan.due), [["olivia-rodrigo", 2]]);

  const token = "a".repeat(48);
  assert.ok(isUnsubscribeToken(token) && !isUnsubscribeToken("abc"), "token shape");
  const email = buildEmail({
    artist: { slug: "olivia-rodrigo", name: "Olivia <Rodrigo>" },
    dates: listedDatesFor(events, "olivia-rodrigo", now),
    token,
    postalAddress: "1 Test Street",
    now
  });
  assert.equal(email.subject, "Olivia <Rodrigo> dates are now listed");
  assert.ok(email.html.includes("Olivia &lt;Rodrigo&gt;") && !email.html.includes("Olivia <Rodrigo>"), "names are escaped in HTML");
  assert.ok(email.text.includes("Sun, Nov 1, 2026: Toronto, Scotiabank Arena"), "dates render in the venue's zone");
  assert.ok(/public on-sale Oct 9, 10:00 AM EDT per Ticketmaster/.test(email.text), "pending on-sale time is shown");
  assert.ok(email.text.includes(`${SITE_URL}/api/unsubscribe?t=${token}`) && email.html.includes(`/api/unsubscribe?t=${token}`), "unsubscribe link in both parts");
  assert.equal(email.headers["List-Unsubscribe"], `<${SITE_URL}/api/unsubscribe?t=${token}>`);
  assert.equal(email.headers["List-Unsubscribe-Post"], "List-Unsubscribe=One-Click");
  assert.ok(email.text.includes("1 Test Street"), "postal address present");
  assert.ok(email.text.includes("utm_campaign=date_alert"), "artist link is tagged");
  assert.ok(!/cheapest|lowest price|\$\d|£\d|€\d|sold out|selling fast/i.test(email.text), "no price or availability claims");

  assert.equal(sqlString("o'brien@x.test"), "'o''brien@x.test'");
  assert.throws(() => readSendConfig({}), /RESEND_API_KEY, ALERT_EMAIL_FROM, ALERT_POSTAL_ADDRESS/);
  assert.equal(parseArgs([]).mode, "preview");
  assert.throws(() => parseArgs(["--mode", "test"]), /--test-to/);
  assert.throws(() => parseArgs(["--mode", "blast"]), /Unknown --mode/);
  console.log("send-date-alerts self-test passed");
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
