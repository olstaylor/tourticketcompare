#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import {
  PROVIDERS,
  catalogItems,
  catalogItemsUrl,
  clean,
  impactCredentials,
  productCandidates,
  providerConfig
} from "./lib/impact-marketplace-providers.mjs";

const execFileAsync = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EVENTS_PATH = path.join(ROOT, "public", "data", "events.json");
const ARTISTS_PATH = path.join(ROOT, "public", "data", "artists.json");
const PAGE_SIZE = 100;
const MAX_PAGES = 5;
const DEFAULT_FRESHNESS_HOURS = 6;

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

async function fetchArtistCatalog(config, artistName, env = process.env, fetchImpl = globalThis.fetch) {
  const { accountSid, authToken, programId } = impactCredentials(config, env);
  const authorization = accountSid && authToken
    ? `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`
    : "";
  const candidates = [];
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const response = await fetchImpl(catalogItemsUrl(config, artistName, page, env, PAGE_SIZE), {
      headers: { Accept: "application/json", ...(authorization ? { Authorization: authorization } : {}) }
    });
    if (!response.ok) return { ok: false, reason: `Impact Catalogs returned HTTP ${response.status}` };
    const payload = await response.json();
    const items = catalogItems(payload);
    if (!items) return { ok: false, reason: "Impact response had no Items array" };
    for (const item of items) candidates.push(...productCandidates(config, item, programId));
    const total = Number(payload?.["@total"] ?? payload?.Total ?? payload?.total);
    if (items.length < PAGE_SIZE || (Number.isFinite(total) && page * PAGE_SIZE >= total)) return { ok: true, candidates };
  }
  return { ok: false, reason: "Impact catalog exceeded pagination cap" };
}

function exactPrice(candidates, externalId) {
  const matches = candidates.filter((candidate) => candidate.externalId === externalId && candidate.price != null && candidate.currency);
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

function buildSql(rows) {
  return ["-- Generated by snapshot-impact-marketplace-prices.mjs", "-- Cache upserts + append-only history inserts; no destructive deletes.", ...rows.map((row) => `INSERT INTO provider_pricing_cache (id, artist_slug, event_id, provider, low_price, avg_price, high_price, currency, inventory_count, verified_at, expires_at, source, updated_at)
VALUES (${[row.id, row.artist_slug, row.event_id, row.provider, row.low_price, row.avg_price, row.high_price, row.currency, row.inventory_count, row.verified_at, row.expires_at, row.source].map(sqlLiteral).join(", ")}, CURRENT_TIMESTAMP)
ON CONFLICT(event_id, provider) DO UPDATE SET artist_slug=excluded.artist_slug, low_price=excluded.low_price, avg_price=excluded.avg_price, high_price=excluded.high_price, currency=excluded.currency, inventory_count=excluded.inventory_count, verified_at=excluded.verified_at, expires_at=excluded.expires_at, source=excluded.source, updated_at=CURRENT_TIMESTAMP;`),
  // OR IGNORE keys the id on the observation instant, so re-running the same
  // generated file can never duplicate or rewrite a history row.
  ...rows.map((row) => `INSERT OR IGNORE INTO provider_pricing_history (id, event_id, artist_slug, provider, low_price, currency, inventory_count, source, observed_at)
VALUES (${[`${row.provider}:${row.event_id}:${row.verified_at}`, row.event_id, row.artist_slug, row.provider, row.low_price, row.currency, row.inventory_count, row.source, row.verified_at].map(sqlLiteral).join(", ")});`), ""].join("\n");
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
      : await fetchArtistCatalog(config, item.externalId, deps.env, deps.fetchImpl);
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
  const summary = await run({ provider: "ticket-liquidator", apply: false, eventId: "", limit: null, freshnessHours: 6, database: "x", remote: true }, {
    data: [events, []], now: new Date("2026-07-13T00:00:00Z"),
    async fetchArtistCatalog() { return { ok: true, candidates: [candidate] }; }
  });
  assert.equal(summary.usable, 1);
  assert.equal(summary.proposed_rows[0].source, config.priceSource);
  const sql = buildSql([{ id: "x", artist_slug: "raye", event_id: "e1", provider: config.slug, low_price: 60, avg_price: null, high_price: null, currency: "GBP", inventory_count: 4, verified_at: "2026-07-13T00:00:00.000Z", expires_at: "2026-07-13T06:00:00.000Z", source: config.priceSource }]);
  assert.match(sql, /ON CONFLICT\(event_id, provider\)/);
  assert.match(sql, /INSERT OR IGNORE INTO provider_pricing_history/);
  assert.match(sql, new RegExp(`'${config.slug}:e1:2026-07-13T00:00:00\\.000Z'`));
  assert.doesNotMatch(sql, /(DELETE|UPDATE)[^;]*provider_pricing_history/i);
  return 9;
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

export { buildRow, buildSql, exactPrice, parseArgs, run, selectEligible };
