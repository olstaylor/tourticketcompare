#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import {
  CATALOG_PROXY_REJECTION_HINT,
  PROVIDERS,
  catalogItems,
  catalogItemsUrl,
  catalogProxyHeaders,
  clean,
  impactCredentials,
  isCatalogProxyRejection,
  productCandidates,
  providerConfig
} from "./lib/impact-marketplace-providers.mjs";

const execFileAsync = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EVENTS_PATH = path.join(ROOT, "public", "data", "events.json");
const ARTISTS_PATH = path.join(ROOT, "public", "data", "artists.json");
const PAGE_SIZE = 100;
const MAX_PAGES = 5;
// Snapshot expiry window. Must stay strictly larger than the *actual* interval
// between scheduled runs or prices blink out between them: the display gate
// hides any row past expires_at. It is also the cap on how stale a displayed
// price can get, so it should not be widened beyond the resilience it buys.
//
// Sized for graceful degradation, not just for the cron (owner-directed
// 2026-09-08). The earlier windows were set just wide enough to bridge the gap
// between runs, which meant any scheduling failure long enough to outlive them
// blanked every price on the site — as happened this day, when this lane last
// ran at 04:38Z, its rows expired at 10:38Z, and every TicketNetwork and
// StubHub International price vanished while the workflow still showed green.
// 24h inverts that: a whole day of missed runs leaves the last known price on
// the card instead of an empty board, so a scheduling problem degrades into
// slightly older prices rather than into no prices at all.
//
// This is only honest because the age is always shown. Every displayed price
// already prints its capture time beside it, and past PRICE_STALE_AFTER_HOURS
// the card adds an explicit "last checked N hours ago" (see the price notes in
// functions/[[path]].js and public/app.js). A snapshot is never presented as a
// live quote, so an older one is labelled rather than disguised. Widening this
// further would start to matter: listed prices drift ~2.3%/hour, so 24h is
// already the point where the label is doing real work.
const DEFAULT_FRESHNESS_HOURS = 24;
// This writer stays append-only against provider_pricing_history (asserted in
// selfTest). Bounded retention is a separate, dry-run-by-default step:
// scripts/prune-provider-pricing-history.mjs.
// A stalled Impact request used to hang the whole job until the workflow
// timeout (up to an hour of billed Actions minutes). Bound every request and
// retry transient failures a couple of times so a slow catalog fails in
// seconds, not minutes.
const REQUEST_TIMEOUT_MS = 15000;
const MAX_ATTEMPTS = 3;
const RETRY_BACKOFF_MS = 500;

// A 429 or a 5xx is the origin declining to answer right now. That is the same
// class of non-answer as a dropped connection or a timeout, so it belongs on
// the same retry path — but until 2026-09-16 only a *thrown* error reached it.
// A refusal arrives as a resolved response, so it returned on the first
// attempt and MAX_ATTEMPTS never applied to it.
//
// These requests go through the production Pages Function named by
// IMPACT_CATALOG_PROXY_URL, and production has an open intermittent CPU-limit
// incident (docs/OPERATIONS.md -> Known incidents) that answers 503. One such
// 503, on one event out of the roster, was counted as a failed fetch, and
// `failed > 0` fails the whole lane: the 2026-09-16 00:22Z run wrote 30 good
// stubhub-international rows, priced every other event it asked about, and
// still went red on a single refusal. The sibling probe in
// scripts/check-price-snapshot-freshness.mjs was hardened against the same
// incident on 2026-09-13; this is that contract, applied per event.
//
// Retrying a refusal does not weaken the gate. A deterministic status is still
// a verdict on the first attempt — including the token-gated 404 that
// isCatalogProxyRejection reports — and a refusal that survives every attempt
// is returned as it stands, so it still counts as a failure and still reds the
// run. What changes is only that a blip no longer speaks for the lane.
function isRetriableCatalogStatus(status) {
  return status === 429 || (status >= 500 && status <= 599);
}

async function fetchWithTimeout(url, init = {}, fetchImpl = globalThis.fetch, sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))) {
  let lastError;
  let lastResponse;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetchImpl(url, { ...init, signal: controller.signal });
      if (response.ok || !isRetriableCatalogStatus(response.status)) return response;
      lastResponse = response;
      lastError = null;
    } catch (error) {
      lastResponse = null;
      lastError = error?.name === "AbortError" ? new Error(`request timed out after ${REQUEST_TIMEOUT_MS}ms`) : error;
    } finally {
      clearTimeout(timer);
    }
    if (attempt < MAX_ATTEMPTS) await sleep(RETRY_BACKOFF_MS * attempt);
  }
  // A refusal that never cleared is reported as the refusal it was, so the
  // caller still names the real status rather than a synthetic transport error.
  if (lastResponse) return lastResponse;
  throw lastError;
}

function parseArgs(argv) {
  const options = { provider: "", apply: false, selfTest: false, limit: null, eventId: "", freshnessHours: DEFAULT_FRESHNESS_HOURS, database: "tourticketcompare-demand", remote: true, json: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--apply") options.apply = true;
    else if (arg === "--self-test") options.selfTest = true;
    else if (arg === "--local") options.remote = false;
    else if (arg === "--json") options.json = true;
    else if (arg === "-h" || arg === "--help") options.help = true;
    else if (["--provider", "--limit", "--event-id", "--freshness-hours", "--database"].includes(arg)) {
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error(`${arg} requires a value`);
      if (arg === "--provider") options.provider = clean(value, 80).toLowerCase();
      if (arg === "--event-id") options.eventId = clean(value, 255);
      if (arg === "--database") options.database = clean(value, 255);
      if (arg === "--limit") { const n = Number(value); if (!Number.isInteger(n) || n < 1) throw new Error("--limit must be positive"); options.limit = n; }
      if (arg === "--freshness-hours") { const n = Number(value); if (!Number.isFinite(n) || n <= 0 || n > 24) throw new Error("--freshness-hours must be > 0 and <= 24"); options.freshnessHours = n; }
    } else throw new Error(`Unknown option: ${arg}`);
  }
  return options;
}

function selectEligible(events, artists, config, options, now = new Date()) {
  const names = new Map(artists.map((artist) => [clean(artist.slug, 120), clean(artist.name, 200)]));
  const rows = [];
  for (const event of events) {
    const id = clean(event?.id, 255);
    if (options.eventId && id !== options.eventId) continue;
    const link = event?.provider_links?.[config.linkKey];
    const externalId = clean(link?.event_id, 255);
    const artistName = clean(event?.artist_name || names.get(clean(event?.artist_slug, 120)), 200);
    const date = Date.parse(clean(event?.datetime_iso || event?.dateTimeISO, 100));
    if (!id || !externalId || link?.verified !== true || !artistName || artistName.includes("'") || !Number.isFinite(date) || date < now.getTime() - 86400000) continue;
    rows.push({ event, id, externalId, artistName });
    if (options.limit != null && rows.length >= options.limit) break;
  }
  return rows;
}

async function fetchArtistCatalog(config, artistName, env = process.env, fetchImpl = globalThis.fetch, sleep) {
  const { accountSid, authToken, programId } = impactCredentials(config, env);
  const authorization = accountSid && authToken
    ? `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`
    : "";
  const candidates = [];
  try {
    for (let page = 1; page <= MAX_PAGES; page += 1) {
      const response = await fetchWithTimeout(catalogItemsUrl(config, artistName, page, env, PAGE_SIZE), {
        headers: {
          Accept: "application/json",
          ...(authorization ? { Authorization: authorization } : {}),
          ...catalogProxyHeaders(env)
        }
      }, fetchImpl, sleep);
      // Every failed fetch here already sets a non-zero exit via summary.failed,
      // so this only has to name the cause rather than change the outcome.
      if (!response.ok) {
        return isCatalogProxyRejection(response.status, env)
          ? { ok: false, reason: `Impact Catalogs returned HTTP 404 — ${CATALOG_PROXY_REJECTION_HINT}` }
          : { ok: false, reason: `Impact Catalogs returned HTTP ${response.status}` };
      }
      const payload = await response.json();
      const items = catalogItems(payload);
      if (!items) return { ok: false, reason: "Impact response had no Items array" };
      for (const item of items) candidates.push(...productCandidates(config, item, programId));
      const total = Number(payload?.["@total"] ?? payload?.Total ?? payload?.total);
      if (items.length < PAGE_SIZE || (Number.isFinite(total) && page * PAGE_SIZE >= total)) return { ok: true, candidates };
    }
    return { ok: false, reason: "Impact catalog exceeded pagination cap" };
  } catch (error) {
    // Turn a network/timeout failure into a counted per-event error so the run
    // finishes fast and the health gate still fails on failed > 0.
    return { ok: false, reason: `Impact catalog request failed: ${error?.message || error}` };
  }
}

// Write-side twin of MIN_PLAUSIBLE_LISTED_PRICE in functions/api/shows.js. The
// display gate is the load-bearing one — it fails closed on rows already in
// D1 — but without this the writer keeps refreshing implausible rows every
// eight hours and the cache accumulates data no page can ever show. Keep the
// two values in step; the reasoning is documented at the shows.js definition.
const MIN_PLAUSIBLE_LISTED_PRICE = 10;

function exactPrice(candidates, externalId) {
  const matches = candidates.filter(
    (candidate) =>
      candidate.externalId === externalId &&
      candidate.price != null &&
      candidate.price >= MIN_PLAUSIBLE_LISTED_PRICE &&
      candidate.currency
  );
  const distinct = new Map(matches.map((candidate) => [`${candidate.currency}:${candidate.price}`, candidate]));
  if (distinct.size !== 1) return null;
  return [...distinct.values()][0];
}

function buildRow(config, item, price, now, freshnessHours) {
  return {
    id: `${config.slug}:${item.id}`,
    artist_slug: clean(item.event?.artist_slug, 120),
    event_id: item.id,
    provider: config.slug,
    low_price: price.price,
    avg_price: null,
    high_price: null,
    currency: price.currency,
    inventory_count: price.inventoryCount,
    verified_at: now.toISOString(),
    expires_at: new Date(now.getTime() + freshnessHours * 3600000).toISOString(),
    source: config.priceSource
  };
}

function sqlLiteral(value) {
  if (value == null) return "NULL";
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "NULL";
  return `'${String(value).replaceAll("'", "''")}'`;
}

function buildHistoryInsertSql(row) {
  const values = [
    `${row.provider}:${row.event_id}:${row.verified_at}`,
    row.event_id,
    row.artist_slug,
    row.provider,
    row.low_price,
    row.currency,
    row.inventory_count,
    row.source,
    row.verified_at
  ].map(sqlLiteral);
  const [id, eventId, artistSlug, provider, lowPrice, currency, inventoryCount, source, observedAt] = values;
  // Preserve every observed price change, but do not turn unchanged polling
  // into a new history row. The cache upsert above still refreshes on every
  // verified run, so visitor-facing price freshness is unchanged.
  return `INSERT INTO provider_pricing_history (id, event_id, artist_slug, provider, low_price, currency, inventory_count, source, observed_at)
SELECT ${[id, eventId, artistSlug, provider, lowPrice, currency, inventoryCount, source, observedAt].join(", ")}
WHERE COALESCE((
  SELECT low_price IS ${lowPrice} AND currency IS ${currency} AND inventory_count IS ${inventoryCount}
  FROM provider_pricing_history
  WHERE event_id = ${eventId} AND provider = ${provider} AND source = ${source}
  ORDER BY observed_at DESC
  LIMIT 1
), 0) = 0;`;
}

function buildSql(rows) {
  return ["-- Generated by snapshot-impact-marketplace-prices.mjs", "-- Cache upserts + append-only history inserts; no destructive deletes.", ...rows.map((row) => `INSERT INTO provider_pricing_cache (id, artist_slug, event_id, provider, low_price, avg_price, high_price, currency, inventory_count, verified_at, expires_at, source, updated_at)
VALUES (${[row.id, row.artist_slug, row.event_id, row.provider, row.low_price, row.avg_price, row.high_price, row.currency, row.inventory_count, row.verified_at, row.expires_at, row.source].map(sqlLiteral).join(", ")}, CURRENT_TIMESTAMP)
ON CONFLICT(event_id, provider) DO UPDATE SET artist_slug=excluded.artist_slug, low_price=excluded.low_price, avg_price=excluded.avg_price, high_price=excluded.high_price, currency=excluded.currency, inventory_count=excluded.inventory_count, verified_at=excluded.verified_at, expires_at=excluded.expires_at, source=excluded.source, updated_at=CURRENT_TIMESTAMP;`),
  ...rows.map(buildHistoryInsertSql), ""].join("\n");
}

async function writeRows(rows, options) {
  if (!rows.length) return 0;
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "ttc-impact-marketplace-"));
  const file = path.join(dir, "upsert.sql");
  try {
    await fs.writeFile(file, buildSql(rows));
    await execFileAsync("npx", ["wrangler", "d1", "execute", options.database, options.remote ? "--remote" : "--local", "--file", file], { cwd: ROOT, maxBuffer: 10 * 1024 * 1024 });
    return rows.length;
  } finally { await fs.rm(dir, { recursive: true, force: true }); }
}

async function run(options, deps = {}) {
  const config = providerConfig(options.provider);
  if (!config) throw new Error(`--provider must be one of: ${Object.keys(PROVIDERS).join(", ")}`);
  const [events, artists] = deps.data || await Promise.all([EVENTS_PATH, ARTISTS_PATH].map(async (file) => JSON.parse(await fs.readFile(file, "utf8"))));
  const now = deps.now || new Date();
  const selected = selectEligible(events, artists, config, options, now);
  const rows = [];
  const errors = [];
  let fetched = 0;
  for (const item of selected) {
    // Query by the already-verified provider event ID, not by artist name.
    // This keeps every cache row tied to one exact catalog record and avoids
    // broad artist-keyword pagination (for example, "Harry Styles").
    const catalog = deps.fetchArtistCatalog
      ? await deps.fetchArtistCatalog(config, item.externalId)
      : await fetchArtistCatalog(config, item.externalId, deps.env, deps.fetchImpl, deps.sleep);
    if (!catalog.ok) {
      errors.push({ event_id: item.id, reason: catalog.reason });
      continue;
    }
    fetched += 1;
    const price = exactPrice(catalog.candidates, item.externalId);
    if (price) rows.push(buildRow(config, item, price, now, options.freshnessHours));
  }
  const written = options.apply ? await (deps.writer ? deps.writer(rows, options) : writeRows(rows, options)) : 0;
  return {
    provider: config.slug, mode: options.apply ? "apply" : "dry-run", eligible: selected.length,
    fetched, usable: rows.length, written, skipped: selected.length - rows.length, failed: errors.length,
    zero_row_reason: selected.length === 0 ? "no_eligible_verified_events" : rows.length === 0 ? (errors.length ? "provider_fetch_failed" : "no_exact_current_prices") : undefined,
    proposed_rows: rows.map(({ id, ...row }) => row), errors
  };
}

async function selfTest() {
  const config = providerConfig("ticket-liquidator");
  const events = [{ id: "e1", artist_slug: "raye", artist_name: "RAYE", datetime_iso: "2027-07-09T19:00:00Z", ticketliquidator_url: "https://ticketliquidator.com/tickets/raye/e1", provider_links: { "ticket-liquidator": { verified: true, event_id: "tl-1" } } }];
  const candidate = { externalId: "tl-1", price: 60, currency: "GBP", inventoryCount: 4 };
  assert.equal(selectEligible(events, [], config, { eventId: "", limit: null }, new Date("2026-07-13T00:00:00Z")).length, 1);
  assert.equal(exactPrice([candidate], "tl-1")?.price, 60);
  assert.equal(exactPrice([{ ...candidate, price: 60 }, { ...candidate, price: 61 }], "tl-1"), null);
  // Sanity floor: a catalog row below MIN_PLAUSIBLE_LISTED_PRICE is a fee /
  // parking / placeholder artefact, not a ticket price. 3.80 is the real
  // StubHub International value that reached production on the JAY-Z
  // Tottenham Hotspur Stadium event.
  assert.equal(exactPrice([{ ...candidate, price: 3.8 }], "tl-1"), null);
  assert.equal(exactPrice([{ ...candidate, price: 0 }], "tl-1"), null);
  assert.equal(exactPrice([{ ...candidate, price: MIN_PLAUSIBLE_LISTED_PRICE }], "tl-1")?.price, MIN_PLAUSIBLE_LISTED_PRICE);
  // A rejected low row must not silently promote a different-priced sibling
  // into the "exactly one distinct price" slot.
  assert.equal(exactPrice([{ ...candidate, price: 3.8 }, { ...candidate, price: 60 }], "tl-1")?.price, 60);
  const summary = await run({ provider: "ticket-liquidator", apply: false, eventId: "", limit: null, freshnessHours: 6, database: "x", remote: true }, {
    data: [events, []], now: new Date("2026-07-13T00:00:00Z"),
    async fetchArtistCatalog() { return { ok: true, candidates: [candidate] }; }
  });
  assert.equal(summary.usable, 1);

  // The retry contract for an origin refusal. A 503 that clears must not be
  // allowed to speak for the lane; a deterministic status must still be a
  // verdict on the first attempt, so the token-gated 404 keeps its own
  // reporting path; and a refusal that never clears must still fail.
  assert.equal(isRetriableCatalogStatus(503), true);
  assert.equal(isRetriableCatalogStatus(429), true);
  assert.equal(isRetriableCatalogStatus(404), false);
  assert.equal(isRetriableCatalogStatus(200), false);

  const noSleep = async () => {};
  let refusals = 0;
  const cleared = await fetchWithTimeout("https://example.test", {}, async () => {
    refusals += 1;
    return refusals < 3 ? { ok: false, status: 503 } : { ok: true, status: 200 };
  }, noSleep);
  assert.equal(cleared.status, 200, "a 503 that clears must be retried, not reported as a failure");
  assert.equal(refusals, 3, "the request must retry until the origin answers");

  let deterministic = 0;
  const notFound = await fetchWithTimeout("https://example.test", {}, async () => {
    deterministic += 1;
    return { ok: false, status: 404 };
  }, noSleep);
  assert.equal(notFound.status, 404);
  assert.equal(deterministic, 1, "a deterministic 4xx is a verdict, not a refusal");

  let exhausted = 0;
  const stillDown = await fetchWithTimeout("https://example.test", {}, async () => {
    exhausted += 1;
    return { ok: false, status: 503 };
  }, noSleep);
  assert.equal(stillDown.status, 503, "an unrelenting refusal keeps its real status");
  assert.equal(exhausted, MAX_ATTEMPTS, "a refusal is retried to the cap");

  // End to end: the same blip must leave no mark on the summary the health
  // gate reads, because a retried refusal is not a failed event.
  let flaky = 0;
  const recoveredSummary = await run({ provider: "ticket-liquidator", apply: false, eventId: "", limit: null, freshnessHours: 6, database: "x", remote: true }, {
    data: [events, []], now: new Date("2026-07-13T00:00:00Z"), sleep: noSleep,
    env: { IMPACT_CATALOG_PROXY_URL: "https://example.test/api/impact/products", IMPACT_CATALOG_PROXY_TOKEN: "t" },
    async fetchImpl() {
      flaky += 1;
      return flaky === 1
        ? { ok: false, status: 503 }
        : { ok: true, status: 200, async json() { return { Items: [], "@total": 0 }; } };
    }
  });
  assert.equal(recoveredSummary.failed, 0, "a retried 503 must not count as a failed event");
  assert.equal(recoveredSummary.errors.length, 0);
  assert.equal(summary.proposed_rows[0].source, config.priceSource);
  const sql = buildSql([{ id: "x", artist_slug: "raye", event_id: "e1", provider: config.slug, low_price: 60, avg_price: null, high_price: null, currency: "GBP", inventory_count: 4, verified_at: "2026-07-13T00:00:00.000Z", expires_at: "2026-07-13T06:00:00.000Z", source: config.priceSource }]);
  assert.match(sql, /ON CONFLICT\(event_id, provider\)/);
  assert.match(sql, /INSERT INTO provider_pricing_history/);
  assert.match(sql, /WHERE COALESCE\(/);
  assert.match(sql, /ORDER BY observed_at DESC/);
  assert.match(sql, new RegExp(`'${config.slug}:e1:2026-07-13T00:00:00\\.000Z'`));
  assert.doesNotMatch(sql, /(DELETE|UPDATE)[^;]*provider_pricing_history/i);
  return 30;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) return console.log(`Usage: node scripts/snapshot-impact-marketplace-prices.mjs --provider <${Object.keys(PROVIDERS).join("|")}> [--apply] [--json]`);
  if (options.selfTest) return console.log(`Impact catalog price snapshot self-test passed (${await selfTest()} checks).`);
  if (!options.provider) throw new Error("--provider is required");
  const summary = await run(options);
  console.log(options.json ? JSON.stringify(summary, null, 2) : `${summary.provider} ${summary.mode}: ${summary.eligible} eligible, ${summary.usable} usable, ${summary.written} written, ${summary.failed} failed.`);
  if (summary.failed) process.exitCode = 1;
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((error) => { console.error(error?.stack || error); process.exitCode = 1; });

export { buildHistoryInsertSql, buildRow, buildSql, exactPrice, fetchWithTimeout, isRetriableCatalogStatus, parseArgs, run, selectEligible };
