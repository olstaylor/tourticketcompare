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
const ARTISTS_PATH = path.join(REPO_ROOT, "public", "data", "artists.json");
const PROVIDER = "vivid-seats";
const APPROVED_SOURCE = "vividseats_impact_marketplace_api";
const IMPACT_PROGRAM = "12730";
const IMPACT_API_BASE = "https://api.impact.com";
const DEFAULT_FRESHNESS_HOURS = 6;
const DEFAULT_D1_DATABASE = "tourticketcompare-demand";
const DEFAULT_LIMIT = 50;
const REQUEST_TIMEOUT_MS = 30000;
const PAGE_SIZE = 100;
const MAX_PAGES = 5;

function clean(value, max = 2000) { return String(value ?? "").trim().slice(0, max); }
function numberOrNull(value) { const n = Number(value); return Number.isFinite(n) && n >= 0 ? n : null; }
function integerOrNull(value) { const n = numberOrNull(value); return n == null ? null : Math.trunc(n); }
function redact(value) {
  let text = String(value ?? "");
  for (const secret of [process.env.IMPACT_VIVIDSEATS_AUTH_TOKEN, process.env.IMPACT_AUTH_TOKEN, process.env.CLOUDFLARE_API_TOKEN]) {
    if (secret) text = text.split(secret).join("[REDACTED]");
  }
  return text;
}
function usage() {
  return `Usage: node scripts/snapshot-vividseats-prices.mjs [options]

Reads the owner-approved Vivid Seats catalog exposed through the existing
Impact Marketplace Products API and upserts timestamped Vivid Seats price
snapshots. Default mode is dry-run; it never scrapes Vivid Seats.

Options:
  --apply                 Write snapshots to remote D1
  --self-test             Run offline tests only
  --limit <number>        Max eligible events (default: ${DEFAULT_LIMIT})
  --event-id <id>         Process one local TourTicketCompare event ID
  --freshness-hours <n>   Snapshot expiry, 0 < n <= 24 (default: ${DEFAULT_FRESHNESS_HOURS})
  --database <name>       D1 database in apply mode
  --local                 Use local D1 in apply mode
  --json                  Emit JSON
Environment:
  IMPACT_VIVIDSEATS_ACCOUNT_SID / IMPACT_VIVIDSEATS_AUTH_TOKEN
    (or legacy IMPACT_ACCOUNT_SID / IMPACT_AUTH_TOKEN)
  IMPACT_VIVIDSEATS_PROGRAM_ID (optional; defaults to ${IMPACT_PROGRAM})
  IMPACT_API_BASE_URL (optional; defaults to ${IMPACT_API_BASE})
  CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID (remote --apply only)
`;
}
function parseArgs(argv) {
  const options = { apply: false, selfTest: false, limit: DEFAULT_LIMIT, eventId: "", freshnessHours: DEFAULT_FRESHNESS_HOURS, database: DEFAULT_D1_DATABASE, remote: true, json: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--apply") options.apply = true;
    else if (arg === "--self-test") options.selfTest = true;
    else if (arg === "--local") options.remote = false;
    else if (arg === "--json") options.json = true;
    else if (["--limit", "--event-id", "--freshness-hours", "--database"].includes(arg)) {
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error(`${arg} requires a value`);
      if (arg === "--limit") { const n = Number.parseInt(value, 10); if (!Number.isInteger(n) || n < 1) throw new Error("--limit must be a positive integer"); options.limit = n; }
      if (arg === "--event-id") options.eventId = clean(value, 255);
      if (arg === "--freshness-hours") { const n = Number(value); if (!Number.isFinite(n) || n <= 0 || n > 24) throw new Error("--freshness-hours must be > 0 and <= 24"); options.freshnessHours = n; }
      if (arg === "--database") options.database = clean(value, 255);
    } else if (arg === "-h" || arg === "--help") return { ...options, help: true };
    else throw new Error(`Unknown option: ${arg}`);
  }
  return options;
}
function vividProductionId(value) {
  const match = clean(value, 2048).match(/^https:\/\/(?:www\.)?vividseats\.com\/[^?#]+\/production\/(\d+)\/?(?:[?#].*)?$/i);
  return match ? match[1] : "";
}
async function readJson(file) { return JSON.parse(await fs.readFile(file, "utf8")); }
async function readCatalog() {
  const [events, artists] = await Promise.all([readJson(EVENTS_PATH), readJson(ARTISTS_PATH)]);
  if (!Array.isArray(events) || !Array.isArray(artists)) throw new Error("events.json and artists.json must both be arrays");
  const artistsBySlug = new Map(artists.map((artist) => [clean(artist?.slug, 255), clean(artist?.name || artist?.artist_name, 255)]));
  return { events, artistsBySlug };
}
function selectEligibleEvents(events, artistsBySlug, options) {
  const selected = [], skipped = [];
  for (const event of events) {
    const localId = clean(event?.id, 255);
    if (options.eventId && localId !== options.eventId) continue;
    const productionId = vividProductionId(event?.vividseats_url);
    const artistName = clean(event?.artist_name || artistsBySlug.get(clean(event?.artist_slug, 255)), 255);
    if (!localId) { skipped.push({ event_id: null, reason: "missing_local_event_id" }); continue; }
    if (!productionId) { skipped.push({ event_id: localId, reason: "invalid_or_missing_vividseats_url" }); continue; }
    if (!artistName || artistName.includes("'")) { skipped.push({ event_id: localId, reason: "unusable_exact_artist_name" }); continue; }
    selected.push({ event, localId, artistName, productionId });
    if (selected.length >= options.limit) break;
  }
  return { selected, skipped };
}
function impactCredentials(env = process.env) {
  const accountSid = clean(env.IMPACT_VIVIDSEATS_ACCOUNT_SID || env.IMPACT_ACCOUNT_SID, 255);
  const authToken = clean(env.IMPACT_VIVIDSEATS_AUTH_TOKEN || env.IMPACT_AUTH_TOKEN, 2000);
  if (!accountSid || !authToken) throw new Error("Impact Vivid Seats credentials are required (IMPACT_VIVIDSEATS_* or IMPACT_*)");
  return { accountSid, authToken };
}
function marketplaceProductsUrl({ accountSid, artistName, page, env = process.env }) {
  const base = clean(env.IMPACT_API_BASE_URL || IMPACT_API_BASE, 2048).replace(/\/+$/, "");
  const program = clean(env.IMPACT_VIVIDSEATS_PROGRAM_ID, 50) || IMPACT_PROGRAM;
  const params = new URLSearchParams({ Program: program, Query: `Name='${artistName}'`, PageSize: String(PAGE_SIZE), Page: String(page) });
  return `${base}/Mediapartners/${encodeURIComponent(accountSid)}/Marketplace/Products?${params.toString()}`;
}
function basicAuthHeader({ accountSid, authToken }) {
  return { Accept: "application/json", Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}` };
}
async function requestJson(url, headers, fetchImpl = globalThis.fetch) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetchImpl(url, { headers, signal: controller.signal });
    if (!response.ok) return { ok: false, status: response.status, reason: `Impact Marketplace Products returned HTTP ${response.status}` };
    const data = await response.json();
    return { ok: true, status: response.status, data };
  } catch (error) {
    return { ok: false, status: 0, reason: `Impact Marketplace Products request failed: ${error?.message || error}` };
  } finally { clearTimeout(timeout); }
}
function offerRows(item) {
  const offers = Array.isArray(item?.Offers) ? item.Offers : [];
  return offers.length ? offers : [item];
}
function candidateFromOffer(item, offer) {
  const sku = clean(offer?.Sku ?? item?.Sku, 255);
  const lowPrice = numberOrNull(offer?.CurrentPrice ?? item?.CurrentPrice ?? offer?.Price ?? item?.Price);
  const currency = clean(offer?.Currency ?? item?.Currency, 12).toUpperCase();
  if (!sku || lowPrice == null || !/^[A-Z]{3}$/.test(currency)) return null;
  return { sku, lowPrice, currency, inventoryCount: integerOrNull(offer?.InventoryCount ?? item?.InventoryCount) };
}
function pricesForProduction(items, productionId) {
  const matches = [];
  for (const item of Array.isArray(items) ? items : []) {
    for (const offer of offerRows(item)) {
      const candidate = candidateFromOffer(item, offer);
      if (candidate?.sku === productionId) matches.push(candidate);
    }
  }
  if (!matches.length) return { ok: false, reason: "no_current_price_for_exact_vivid_production" };
  const distinct = new Map(matches.map((match) => [`${match.currency}:${match.lowPrice}`, match]));
  if (distinct.size !== 1) return { ok: false, reason: "ambiguous_current_price_for_exact_vivid_production" };
  return { ok: true, price: [...distinct.values()][0] };
}
async function fetchArtistCatalog(artistName, env, fetchImpl) {
  const credentials = impactCredentials(env);
  const headers = basicAuthHeader(credentials);
  const rows = [];
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const response = await requestJson(marketplaceProductsUrl({ accountSid: credentials.accountSid, artistName, page, env }), headers, fetchImpl);
    if (!response.ok) return response;
    const results = Array.isArray(response.data?.Results) ? response.data.Results : null;
    if (!results) return { ok: false, status: response.status, reason: "Impact Marketplace Products response had no Results array" };
    rows.push(...results);
    const total = Number(response.data?.["@total"]);
    if (results.length < PAGE_SIZE || (Number.isFinite(total) && page * PAGE_SIZE >= total)) return { ok: true, data: rows };
  }
  return { ok: false, status: 0, reason: "Impact Marketplace Products catalog exceeded the safe pagination cap" };
}
function buildSnapshotRow(item, price, now, freshnessHours) {
  const eventId = clean(item?.localId, 255);
  const artistSlug = clean(item?.event?.artist_slug, 255);
  if (!eventId || !artistSlug) return { ok: false, reason: "missing_local_event_identity" };
  const verifiedAt = now.toISOString();
  return { ok: true, row: {
    id: `${PROVIDER}:${eventId}`, artist_slug: artistSlug, event_id: eventId, provider: PROVIDER,
    low_price: price.lowPrice, avg_price: null, high_price: null, currency: price.currency,
    inventory_count: price.inventoryCount, verified_at: verifiedAt,
    expires_at: new Date(now.getTime() + freshnessHours * 3600000).toISOString(), source: APPROVED_SOURCE
  }};
}
function sqlLiteral(value) { if (value == null) return "NULL"; if (typeof value === "number") return Number.isFinite(value) ? String(value) : "NULL"; return `'${String(value).replaceAll("'", "''")}'`; }
function buildUpsertSql(rows) {
  return ["-- Generated by scripts/snapshot-vividseats-prices.mjs", "-- Upserts only; no destructive deletes.", "BEGIN TRANSACTION;",
    ...rows.map((row) => `INSERT INTO provider_pricing_cache (id, artist_slug, event_id, provider, low_price, avg_price, high_price, currency, inventory_count, verified_at, expires_at, source, updated_at)
VALUES (${[row.id,row.artist_slug,row.event_id,row.provider,row.low_price,row.avg_price,row.high_price,row.currency,row.inventory_count,row.verified_at,row.expires_at,row.source].map(sqlLiteral).join(", ")}, CURRENT_TIMESTAMP)
ON CONFLICT(event_id, provider) DO UPDATE SET artist_slug=excluded.artist_slug, low_price=excluded.low_price, avg_price=excluded.avg_price, high_price=excluded.high_price, currency=excluded.currency, inventory_count=excluded.inventory_count, verified_at=excluded.verified_at, expires_at=excluded.expires_at, source=excluded.source, updated_at=CURRENT_TIMESTAMP;`),
    "COMMIT;", ""].join("\n");
}
async function writeRowsToD1(rows, options) {
  if (!rows.length) return { written: 0 };
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "vividseats-impact-snapshot-"));
  const sqlPath = path.join(dir, "upsert-provider-pricing-cache.sql");
  try {
    await fs.writeFile(sqlPath, buildUpsertSql(rows));
    const args = ["wrangler", "d1", "execute", options.database, options.remote ? "--remote" : "--local", "--file", sqlPath];
    const output = await execFileAsync("npx", args, { cwd: REPO_ROOT, maxBuffer: 10 * 1024 * 1024 });
    return { written: rows.length, command: `npx ${args.join(" ")}`, stdout: redact(output.stdout), stderr: redact(output.stderr) };
  } finally { await fs.rm(dir, { recursive: true, force: true }); }
}
function publicRow(row) { const { id, ...publicData } = row; return publicData; }
async function runIngestion(options, deps = {}) {
  const env = deps.env || process.env;
  const catalog = deps.catalog || await readCatalog();
  const selection = selectEligibleEvents(catalog.events, catalog.artistsBySlug, options);
  const summary = { mode: options.apply ? "apply" : "dry-run", scanned: catalog.events.length, eligible: selection.selected.length, fetched: 0, written: 0, skipped: selection.skipped.length, errors: 0, proposed_rows: [], skip_reasons: {}, error_details: [] };
  for (const skipped of selection.skipped) summary.skip_reasons[skipped.reason] = (summary.skip_reasons[skipped.reason] || 0) + 1;
  const byArtist = new Map();
  for (const item of selection.selected) { const entries = byArtist.get(item.artistName) || []; entries.push(item); byArtist.set(item.artistName, entries); }
  const rows = [];
  for (const [artistName, items] of byArtist) {
    const fetched = deps.fetchArtistCatalog ? await deps.fetchArtistCatalog(artistName, env) : await fetchArtistCatalog(artistName, env, deps.fetchImpl);
    if (!fetched.ok) {
      for (const item of items) { summary.skipped++; summary.skip_reasons.api_unavailable_or_error = (summary.skip_reasons.api_unavailable_or_error || 0) + 1; summary.error_details.push({ event_id: item.localId, reason: redact(fetched.reason) }); }
      continue;
    }
    summary.fetched += items.length;
    for (const item of items) {
      const priced = pricesForProduction(fetched.data, item.productionId);
      if (!priced.ok) { summary.skipped++; summary.skip_reasons[priced.reason] = (summary.skip_reasons[priced.reason] || 0) + 1; continue; }
      const built = buildSnapshotRow(item, priced.price, deps.now || new Date(), options.freshnessHours);
      if (!built.ok) { summary.skipped++; summary.skip_reasons[built.reason] = (summary.skip_reasons[built.reason] || 0) + 1; continue; }
      rows.push(built.row); summary.proposed_rows.push(publicRow(built.row));
    }
  }
  if (options.apply) summary.written = (await (deps.writer ? deps.writer(rows, options) : writeRowsToD1(rows, options))).written || 0;
  return summary;
}
async function selfTest() {
  assert.equal(vividProductionId("https://www.vividseats.com/a-tickets/production/123"), "123");
  assert.equal(vividProductionId("https://www.vividseats.com/search?q=x"), "");
  const url = marketplaceProductsUrl({ accountSid: "sid", artistName: "RAYE", page: 1, env: {} });
  assert.match(url, /Program=12730/); assert.match(url, /Name%3D%27RAYE%27/);
  const priced = pricesForProduction([{ CurrentPrice: "52.50", Currency: "usd", Offers: [{ Sku: "123" }] }], "123");
  assert.equal(priced.ok, true); assert.equal(priced.price.lowPrice, 52.5); assert.equal(priced.price.currency, "USD");
  assert.equal(pricesForProduction([{ CurrentPrice: 1, Currency: "USD", Offers: [{ Sku: "123" }] }, { CurrentPrice: 2, Currency: "USD", Offers: [{ Sku: "123" }] }], "123").ok, false);
  const now = new Date("2026-07-10T00:00:00Z");
  const item = { localId: "event-1", productionId: "123", artistName: "RAYE", event: { artist_slug: "raye" } };
  const built = buildSnapshotRow(item, priced.price, now, 6);
  assert.equal(built.ok, true); assert.equal(built.row.source, APPROVED_SOURCE);
  assert.doesNotMatch(buildUpsertSql([built.row]), /BEGIN TRANSACTION|COMMIT/);
  const dry = await runIngestion({ apply: false, limit: 1, eventId: "", freshnessHours: 6, database: DEFAULT_D1_DATABASE, remote: true }, {
    catalog: { events: [{ id: "event-1", artist_slug: "raye", vividseats_url: "https://www.vividseats.com/a-tickets/production/123" }], artistsBySlug: new Map([["raye", "RAYE"]]) },
    now, async fetchArtistCatalog() { return { ok: true, data: [{ CurrentPrice: 52, Currency: "USD", Offers: [{ Sku: "123" }] }] }; }
  });
  assert.equal(dry.proposed_rows.length, 1); assert.equal(dry.written, 0);
  return { ok: true, tests: 13 };
}
function printSummary(summary) {
  console.log(`Vivid Seats Impact price snapshot ${summary.mode} summary:`);
  for (const key of ["scanned", "eligible", "fetched", "written", "skipped", "errors"]) console.log(`- ${key}: ${summary[key]}`);
  if (Object.keys(summary.skip_reasons).length) console.log(`- skip reasons: ${JSON.stringify(summary.skip_reasons)}`);
  for (const row of summary.proposed_rows) console.log(JSON.stringify(row));
  for (const error of summary.error_details.slice(0, 20)) console.log(JSON.stringify(error));
}
async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) return console.log(usage());
  if (options.selfTest) { const result = await selfTest(); return console.log(`Vivid Seats Impact price snapshot self-test passed (${result.tests} checks).`); }
  const summary = await runIngestion(options);
  if (options.json) console.log(JSON.stringify(summary, null, 2)); else printSummary(summary);
}
if (import.meta.url === `file://${process.argv[1]}`) main().catch((error) => { console.error(redact(error.stack || error.message || error)); process.exitCode = 1; });
export { APPROVED_SOURCE, buildSnapshotRow, buildUpsertSql, impactCredentials, marketplaceProductsUrl, pricesForProduction, runIngestion, selectEligibleEvents, vividProductionId };
