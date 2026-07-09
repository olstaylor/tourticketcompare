#!/usr/bin/env node
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const EVENTS_PATH = path.join(REPO_ROOT, "public", "data", "events.json");
const APPROVED_SOURCE = "vividseats_approved_feed";
const PROVIDER = "vivid-seats";
const DEFAULT_FRESHNESS_HOURS = 6;
const REQUEST_TIMEOUT_MS = 30000;
const DEFAULT_DELAY_MS = 500;
const DEFAULT_CURRENCY = "USD";
const DEFAULT_D1_DATABASE = "tourticketcompare-demand";

function usage() {
  return `Usage: node scripts/snapshot-vividseats-prices.mjs [options]\n\nFetch Vivid Seats prices from an owner-approved feed/API with explicit public display rights and upsert latest provider_pricing_cache snapshots. Default mode is dry-run and never writes to D1. This script intentionally does not scrape Vivid Seats pages.\n\nOptions:\n  --apply              Write proposed snapshot rows to D1 with wrangler d1 execute\n  --self-test          Run local unit/self tests only; no network and no D1 writes\n  --limit <number>     Process at most this many eligible Vivid Seats events\n  --event-id <id>      Process only one local TourTicketCompare event ID\n  --freshness-hours <n>  Expires snapshots after n hours (default: ${DEFAULT_FRESHNESS_HOURS})\n  --delay-ms <number>  Delay before each approved-feed call (default: ${DEFAULT_DELAY_MS})\n  --database <name>    D1 database name for apply mode (default: ${DEFAULT_D1_DATABASE})\n  --local              Use local D1 in apply mode instead of remote D1\n  --json               Emit machine-readable summary JSON\n  -h, --help           Show this help\n\nEnvironment:\n  VIVIDSEATS_PRICE_FEED_APPROVED=true  Required acknowledgment that display rights are confirmed\n  VIVIDSEATS_PRICE_FEED_URL            Required approved feed/API endpoint template; may include {eventId}\n  VIVIDSEATS_PRICE_FEED_TOKEN          Optional bearer token for the approved feed/API\n  CLOUDFLARE_API_TOKEN                 Required by wrangler for remote --apply writes\n  CLOUDFLARE_ACCOUNT_ID                Required by wrangler for remote --apply writes\n`;
}

function clean(value, max = 500) { return String(value ?? "").trim().slice(0, max); }
function finiteNumberOrNull(value) { if (value == null || value === "") return null; const n = Number(value); return Number.isFinite(n) ? n : null; }
function integerOrNull(value) { const n = finiteNumberOrNull(value); return n == null || n < 0 ? null : Math.trunc(n); }
function redact(value) { let text = String(value ?? ""); for (const secret of [process.env.VIVIDSEATS_PRICE_FEED_TOKEN, process.env.CLOUDFLARE_API_TOKEN]) if (secret) text = text.split(secret).join("[REDACTED]"); return text; }

function parseArgs(argv) {
  const options = { apply: false, selfTest: false, limit: null, eventId: "", freshnessHours: DEFAULT_FRESHNESS_HOURS, delayMs: DEFAULT_DELAY_MS, database: DEFAULT_D1_DATABASE, remote: true, json: false, help: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--apply") options.apply = true;
    else if (arg === "--self-test") options.selfTest = true;
    else if (arg === "--json") options.json = true;
    else if (arg === "--local") options.remote = false;
    else if (["--limit", "--event-id", "--freshness-hours", "--delay-ms", "--database"].includes(arg)) {
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error(`${arg} requires a value`);
      if (arg === "--limit") { const n = Number.parseInt(value, 10); if (!Number.isFinite(n) || n < 1) throw new Error("--limit must be positive"); options.limit = n; }
      if (arg === "--event-id") options.eventId = clean(value, 255);
      if (arg === "--freshness-hours") { const n = Number.parseFloat(value); if (!Number.isFinite(n) || n <= 0 || n > 24) throw new Error("--freshness-hours must be > 0 and <= 24"); options.freshnessHours = n; }
      if (arg === "--delay-ms") { const n = Number.parseInt(value, 10); if (!Number.isFinite(n) || n < 0) throw new Error("--delay-ms must be non-negative"); options.delayMs = n; }
      if (arg === "--database") options.database = clean(value, 255);
    } else if (arg === "--help" || arg === "-h") options.help = true;
    else throw new Error(`Unknown option: ${arg}`);
  }
  return options;
}

function validateVividSeatsEventUrl(value) {
  const raw = clean(value, 2048);
  if (!raw) return { ok: false, reason: "missing Vivid Seats URL" };
  try {
    const parsed = new URL(raw);
    const host = parsed.hostname.toLowerCase();
    const pathPart = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
    if (parsed.protocol !== "https:" || (host !== "vividseats.com" && host !== "www.vividseats.com")) return { ok: false, reason: "must be an https vividseats.com URL" };
    if (!/\/production\/\d+$/i.test(pathPart)) return { ok: false, reason: "must be an event URL ending in /production/<id>" };
    return { ok: true, eventId: pathPart.match(/\/production\/(\d+)$/i)[1], url: parsed.toString() };
  } catch { return { ok: false, reason: "must be a valid absolute URL" }; }
}

async function readEvents(eventsPath = EVENTS_PATH) { const parsed = JSON.parse(await fs.readFile(eventsPath, "utf8")); if (!Array.isArray(parsed)) throw new Error("events.json must contain an array"); return parsed; }
function selectEligibleEvents(events, options = {}) {
  const selected = [], skipped = [];
  for (const event of Array.isArray(events) ? events : []) {
    const eventId = clean(event?.id, 255); if (options.eventId && eventId !== options.eventId) continue;
    const validation = validateVividSeatsEventUrl(event?.vividseats_url);
    if (!validation.ok) { skipped.push({ event_id: eventId || null, reason: "invalid_vividseats_url", detail: validation.reason }); continue; }
    selected.push({ event, vividSeatsEventId: validation.eventId, vividSeatsUrl: validation.url });
    if (options.limit && selected.length >= options.limit) break;
  }
  return { scanned: Array.isArray(events) ? events.length : 0, selected, skipped };
}

function buildApprovedFeedUrl(vividSeatsEventId, env = process.env) {
  if (String(env.VIVIDSEATS_PRICE_FEED_APPROVED || "").toLowerCase() !== "true") throw new Error("VIVIDSEATS_PRICE_FEED_APPROVED=true is required after explicit public display rights are confirmed");
  const template = clean(env.VIVIDSEATS_PRICE_FEED_URL, 2048);
  if (!template) throw new Error("VIVIDSEATS_PRICE_FEED_URL is required for the approved Vivid Seats feed/API");
  const raw = template.includes("{eventId}") ? template.replaceAll("{eventId}", encodeURIComponent(vividSeatsEventId)) : `${template}${template.includes("?") ? "&" : "?"}eventId=${encodeURIComponent(vividSeatsEventId)}`;
  return new URL(raw);
}

function currencyFromResponse(payload) { for (const c of [payload?.currency, payload?.currency_code, payload?.price?.currency]) { const v = clean(c, 12).toUpperCase(); if (/^[A-Z]{3}$/.test(v)) return v; } return DEFAULT_CURRENCY; }
function buildSnapshotRow(event, payload, now = new Date(), freshnessHours = DEFAULT_FRESHNESS_HOURS) {
  const localEventId = clean(event?.id, 255), artistSlug = clean(event?.artist_slug, 255); if (!localEventId) return { ok: false, reason: "missing_local_event_id" }; if (!artistSlug) return { ok: false, reason: "missing_artist_slug" };
  const lowPrice = finiteNumberOrNull(payload?.low_price ?? payload?.lowest_price ?? payload?.min_price ?? payload?.price?.low);
  if (lowPrice == null || lowPrice < 0) return { ok: false, reason: "missing_usable_low_price" };
  const verifiedAt = now.toISOString();
  return { ok: true, row: { id: `${PROVIDER}:${localEventId}`, artist_slug: artistSlug, event_id: localEventId, provider: PROVIDER, low_price: lowPrice, avg_price: finiteNumberOrNull(payload?.avg_price ?? payload?.average_price), high_price: finiteNumberOrNull(payload?.high_price ?? payload?.highest_price), currency: currencyFromResponse(payload), inventory_count: integerOrNull(payload?.inventory_count ?? payload?.listing_count), verified_at: verifiedAt, expires_at: new Date(now.getTime() + freshnessHours * 3600000).toISOString(), source: APPROVED_SOURCE } };
}

async function fetchJson(url, env = process.env, fetchImpl = globalThis.fetch) {
  const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try { const token = clean(env.VIVIDSEATS_PRICE_FEED_TOKEN, 2000); const res = await fetchImpl(url, { headers: { accept: "application/json", ...(token ? { authorization: `Bearer ${token}` } : {}), "user-agent": "TourTicketCompare Vivid Seats approved price feed ingestion" }, signal: controller.signal }); if (!res.ok) return { ok: false, status: res.status, reason: `approved Vivid Seats feed returned HTTP ${res.status}` }; return { ok: true, status: res.status, data: await res.json() }; }
  catch (error) { return { ok: false, status: 0, reason: `approved Vivid Seats feed request failed: ${error?.message || error}` }; }
  finally { clearTimeout(timeout); }
}
function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }
function sqlLiteral(value) { if (value == null) return "NULL"; if (typeof value === "number") return Number.isFinite(value) ? String(value) : "NULL"; return `'${String(value).replaceAll("'", "''")}'`; }
function buildUpsertSql(rows) { return ["-- Generated by scripts/snapshot-vividseats-prices.mjs", "-- No destructive deletes; latest snapshots are upserted by (event_id, provider).", "BEGIN TRANSACTION;", ...rows.map((row) => `INSERT INTO provider_pricing_cache (id, artist_slug, event_id, provider, low_price, avg_price, high_price, currency, inventory_count, verified_at, expires_at, source, updated_at)\nVALUES (${[row.id,row.artist_slug,row.event_id,row.provider,row.low_price,row.avg_price,row.high_price,row.currency,row.inventory_count,row.verified_at,row.expires_at,row.source].map(sqlLiteral).join(", ")}, CURRENT_TIMESTAMP)\nON CONFLICT(event_id, provider) DO UPDATE SET\n  artist_slug = excluded.artist_slug,\n  low_price = excluded.low_price,\n  avg_price = excluded.avg_price,\n  high_price = excluded.high_price,\n  currency = excluded.currency,\n  inventory_count = excluded.inventory_count,\n  verified_at = excluded.verified_at,\n  expires_at = excluded.expires_at,\n  source = excluded.source,\n  updated_at = CURRENT_TIMESTAMP;`), "COMMIT;", ""].join("\n"); }
async function writeRowsToD1(rows, options) { if (!rows.length) return { written: 0 }; const dir = await fs.mkdtemp(path.join(os.tmpdir(), "vividseats-price-snapshot-")); const sqlPath = path.join(dir, "upsert-provider-pricing-cache.sql"); try { await fs.writeFile(sqlPath, buildUpsertSql(rows)); const args = ["wrangler", "d1", "execute", options.database, options.remote ? "--remote" : "--local", "--file", sqlPath]; const r = await execFileAsync("npx", args, { cwd: REPO_ROOT, maxBuffer: 1024 * 1024 * 10 }); return { written: rows.length, command: `npx ${args.join(" ")}`, stdout: redact(r.stdout), stderr: redact(r.stderr) }; } finally { await fs.rm(dir, { recursive: true, force: true }); } }
function publicRow(row) { return { event_id: row.event_id, artist_slug: row.artist_slug, provider: row.provider, low_price: row.low_price, avg_price: row.avg_price, high_price: row.high_price, currency: row.currency, inventory_count: row.inventory_count, verified_at: row.verified_at, expires_at: row.expires_at, source: row.source }; }

async function runIngestion(options, deps = {}) {
  const selection = selectEligibleEvents(deps.events || await readEvents(deps.eventsPath || EVENTS_PATH), options);
  const summary = { mode: options.apply ? "apply" : "dry-run", scanned: selection.scanned, eligible: selection.selected.length, fetched: 0, written: 0, skipped: selection.skipped.length, errors: 0, proposed_rows: [], skip_reasons: {}, error_details: [] };
  for (const s of selection.skipped) summary.skip_reasons[s.reason] = (summary.skip_reasons[s.reason] || 0) + 1;
  const rows = [];
  for (const item of selection.selected) {
    if (options.delayMs > 0 && summary.fetched > 0) await sleep(options.delayMs);
    let url; try { url = buildApprovedFeedUrl(item.vividSeatsEventId, deps.env || process.env); } catch (error) { summary.errors++; summary.error_details.push({ event_id: item.event.id, reason: redact(error.message) }); continue; }
    const fetched = await (deps.fetchVividSeatsPrice ? deps.fetchVividSeatsPrice(item.vividSeatsEventId, item.event, url) : fetchJson(url, deps.env || process.env, deps.fetchImpl));
    if (!fetched.ok) { summary.skipped++; summary.skip_reasons.api_unavailable_or_error = (summary.skip_reasons.api_unavailable_or_error || 0) + 1; summary.error_details.push({ event_id: item.event.id, reason: redact(fetched.reason || `HTTP ${fetched.status || "unknown"}`) }); continue; }
    summary.fetched++;
    const built = buildSnapshotRow(item.event, fetched.data, deps.now || new Date(), options.freshnessHours);
    if (!built.ok) { summary.skipped++; summary.skip_reasons[built.reason] = (summary.skip_reasons[built.reason] || 0) + 1; continue; }
    rows.push(built.row); summary.proposed_rows.push(publicRow(built.row));
  }
  if (options.apply) summary.written = (await (deps.writer ? deps.writer(rows, options) : writeRowsToD1(rows, options))).written || 0;
  return summary;
}

async function selfTest() {
  assert.equal(validateVividSeatsEventUrl("https://www.vividseats.com/example-tickets/production/123456").ok, true);
  assert.equal(validateVividSeatsEventUrl("https://www.vividseats.com/search?q=test").ok, false);
  const now = new Date("2026-06-01T00:00:00Z");
  const event = { id: "local-event-1", artist_slug: "artist-one", vividseats_url: "https://www.vividseats.com/example-tickets/production/123456" };
  const built = buildSnapshotRow(event, { low_price: "44.50", average_price: 70, highest_price: 140, currency: "usd", inventory_count: 5 }, now, 6);
  assert.equal(built.ok, true); assert.equal(built.row.provider, PROVIDER); assert.equal(built.row.source, APPROVED_SOURCE); assert.equal(built.row.currency, "USD");
  assert.throws(() => buildApprovedFeedUrl("123", { VIVIDSEATS_PRICE_FEED_URL: "https://feed.example/{eventId}" }));
  const dryRun = await runIngestion({ apply: false, limit: null, eventId: "", freshnessHours: 6, delayMs: 0, database: DEFAULT_D1_DATABASE, remote: true }, { events: [event], now, env: { VIVIDSEATS_PRICE_FEED_APPROVED: "true", VIVIDSEATS_PRICE_FEED_URL: "https://feed.example/events/{eventId}" }, async fetchVividSeatsPrice() { return { ok: true, data: { low_price: 55, listing_count: 3 } }; }, async writer() { throw new Error("dry run must not write"); } });
  assert.equal(dryRun.fetched, 1); assert.equal(dryRun.written, 0); assert.equal(dryRun.proposed_rows[0].provider, PROVIDER);
  return { ok: true, tests: 9 };
}
function printSummary(s) { console.log(`Vivid Seats price snapshot ${s.mode} summary:`); for (const key of ["scanned", "eligible", "fetched", "written", "skipped", "errors"]) console.log(`- ${key}: ${s[key]}`); if (Object.keys(s.skip_reasons).length) console.log(`- skip reasons: ${JSON.stringify(s.skip_reasons)}`); for (const row of s.proposed_rows) console.log(JSON.stringify(row)); for (const detail of s.error_details.slice(0, 20)) console.log(JSON.stringify(detail)); }
async function main() { const options = parseArgs(process.argv.slice(2)); if (options.help) return console.log(usage()); if (options.selfTest) { const r = await selfTest(); return console.log(`Vivid Seats price snapshot self-test passed (${r.tests} checks).`); } const summary = await runIngestion(options); if (options.json) console.log(JSON.stringify(summary, null, 2)); else printSummary(summary); }
if (import.meta.url === `file://${process.argv[1]}`) main().catch((error) => { console.error(redact(error.stack || error.message || error)); process.exitCode = 1; });
export { APPROVED_SOURCE, buildApprovedFeedUrl, buildSnapshotRow, buildUpsertSql, runIngestion, selectEligibleEvents, validateVividSeatsEventUrl };
