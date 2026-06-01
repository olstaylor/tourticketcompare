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
const SEATGEEK_EVENTS_ENDPOINT = "https://api.seatgeek.com/2/events";
const APPROVED_SOURCE = "seatgeek_partner_api";
const PROVIDER = "seatgeek";
const DEFAULT_FRESHNESS_HOURS = 6;
const REQUEST_TIMEOUT_MS = 30000;
const DEFAULT_DELAY_MS = 500;
const DEFAULT_CURRENCY = "USD";
const DEFAULT_D1_DATABASE = "tourticketcompare-demand";
const GENERIC_SEATGEEK_FIRST_SEGMENTS = new Set([
  "search",
  "venues",
  "venue",
  "performers",
  "performer",
  "artists",
  "artist",
  "concert-tickets",
  "tickets"
]);

function usage() {
  return `Usage: node scripts/snapshot-seatgeek-prices.mjs [options]\n\nFetch SeatGeek event stats from the approved SeatGeek partner API and upsert latest provider_pricing_cache snapshots. Default mode is dry-run and never writes to D1.\n\nOptions:\n  --apply              Write proposed snapshot rows to D1 with wrangler d1 execute\n  --self-test          Run local unit/self tests only; no network and no D1 writes\n  --limit <number>     Process at most this many eligible SeatGeek events\n  --event-id <id>      Process only one local TourTicketCompare event ID\n  --freshness-hours <n>  Expires snapshots after n hours (default: ${DEFAULT_FRESHNESS_HOURS})\n  --delay-ms <number>  Delay before each SeatGeek API call (default: ${DEFAULT_DELAY_MS})\n  --database <name>    D1 database name for apply mode (default: ${DEFAULT_D1_DATABASE})\n  --local              Use local D1 in apply mode instead of remote D1\n  --json               Emit machine-readable summary JSON\n  -h, --help           Show this help\n\nEnvironment:\n  SEATGEEK_CLIENT_ID       Required for API fetches\n  SEATGEEK_CLIENT_SECRET   Optional; sent only to the SeatGeek partner API when present\n  CLOUDFLARE_API_TOKEN     Required by wrangler for remote --apply writes\n  CLOUDFLARE_ACCOUNT_ID    Required by wrangler for remote --apply writes\n`;
}

function parseArgs(argv) {
  const options = {
    apply: false,
    selfTest: false,
    limit: null,
    eventId: "",
    freshnessHours: DEFAULT_FRESHNESS_HOURS,
    delayMs: DEFAULT_DELAY_MS,
    database: DEFAULT_D1_DATABASE,
    remote: true,
    json: false,
    help: false
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--apply") {
      options.apply = true;
    } else if (arg === "--self-test") {
      options.selfTest = true;
    } else if (arg === "--json") {
      options.json = true;
    } else if (arg === "--local") {
      options.remote = false;
    } else if (arg === "--limit") {
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) throw new Error("--limit requires a positive number");
      const parsed = Number.parseInt(value, 10);
      if (!Number.isFinite(parsed) || parsed < 1) throw new Error("--limit must be a positive number");
      options.limit = parsed;
      i += 1;
    } else if (arg === "--event-id") {
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) throw new Error("--event-id requires a local event ID");
      options.eventId = clean(value, 255);
      i += 1;
    } else if (arg === "--freshness-hours") {
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) throw new Error("--freshness-hours requires a positive number");
      const parsed = Number.parseFloat(value);
      if (!Number.isFinite(parsed) || parsed <= 0 || parsed > 24) {
        throw new Error("--freshness-hours must be greater than 0 and no more than 24");
      }
      options.freshnessHours = parsed;
      i += 1;
    } else if (arg === "--delay-ms") {
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) throw new Error("--delay-ms requires a non-negative number");
      const parsed = Number.parseInt(value, 10);
      if (!Number.isFinite(parsed) || parsed < 0) throw new Error("--delay-ms must be a non-negative number");
      options.delayMs = parsed;
      i += 1;
    } else if (arg === "--database") {
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) throw new Error("--database requires a D1 database name");
      options.database = clean(value, 255);
      i += 1;
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return options;
}

function clean(value, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

function redact(value) {
  let text = String(value ?? "");
  for (const secret of [process.env.SEATGEEK_CLIENT_ID, process.env.SEATGEEK_CLIENT_SECRET, process.env.CLOUDFLARE_API_TOKEN]) {
    if (secret) text = text.split(secret).join("[REDACTED]");
  }
  return text.replace(/(client_(?:id|secret)=)[^&\s]+/gi, "$1[REDACTED]");
}

function isPlaceholderUrl(value) {
  const v = clean(value, 2048).toLowerCase();
  return /example\.com|your-affiliate-link|your-link-here|replace-me|placeholder/.test(v) || /(?:^|[/?#=&._-])tbd(?:$|[/?#=&._-])/.test(v);
}

function validateSeatGeekEventUrl(value) {
  const raw = clean(value, 2048);
  if (!raw) return { ok: false, reason: "missing SeatGeek URL" };

  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    return { ok: false, reason: "must be a valid absolute URL" };
  }

  if (parsed.protocol.toLowerCase() !== "https:") return { ok: false, reason: "must use https" };
  const host = parsed.hostname.toLowerCase();
  if (host !== "seatgeek.com" && host !== "www.seatgeek.com") {
    return { ok: false, reason: "host must be seatgeek.com or www.seatgeek.com" };
  }
  if (isPlaceholderUrl(raw)) return { ok: false, reason: "placeholder/example URL is not allowed" };

  let normalizedPath = decodeURIComponent(parsed.pathname || "/").trim().replace(/\/+$/, "");
  if (!normalizedPath) normalizedPath = "/";
  if (normalizedPath === "/") return { ok: false, reason: "must not be the SeatGeek homepage" };

  const firstSegment = normalizedPath.split("/").filter(Boolean)[0]?.toLowerCase() || "";
  if (GENERIC_SEATGEEK_FIRST_SEGMENTS.has(firstSegment)) {
    return { ok: false, reason: "must be an event-specific SeatGeek URL, not a generic search/artist/venue URL" };
  }

  const match = normalizedPath.match(/\/(concert|sports|theater|theatre)\/(\d+)$/i);
  if (!match) {
    return { ok: false, reason: "must look like an event URL ending in /concert/<id> or another event category with a numeric id" };
  }

  return { ok: true, reason: "valid event-level SeatGeek URL", eventId: match[2], url: parsed.toString() };
}

async function readEvents(eventsPath = EVENTS_PATH) {
  const raw = await fs.readFile(eventsPath, "utf8");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error("events.json must contain an array of events");
  return parsed;
}

function selectEligibleEvents(events, options = {}) {
  const scanned = Array.isArray(events) ? events.length : 0;
  const selected = [];
  const skipped = [];

  for (const event of Array.isArray(events) ? events : []) {
    const eventId = clean(event?.id, 255);
    if (options.eventId && eventId !== options.eventId) continue;

    const validation = validateSeatGeekEventUrl(event?.seatgeek_url);
    if (!validation.ok) {
      skipped.push({ event_id: eventId || null, reason: "invalid_seatgeek_url", detail: validation.reason });
      continue;
    }

    selected.push({ event, seatgeekEventId: validation.eventId, seatgeekUrl: validation.url });
    if (options.limit && selected.length >= options.limit) break;
  }

  return { scanned, selected, skipped };
}

function finiteNumberOrNull(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function integerOrNull(value) {
  const parsed = finiteNumberOrNull(value);
  if (parsed === null || parsed < 0) return null;
  return Math.trunc(parsed);
}

function currencyFromResponse(response) {
  const candidates = [
    response?.stats?.currency,
    response?.stats?.currency_code,
    response?.currency,
    response?.currency_code,
    response?.venue?.country === "Canada" ? "CAD" : ""
  ];
  for (const candidate of candidates) {
    const value = clean(candidate, 12).toUpperCase();
    if (/^[A-Z]{3}$/.test(value)) return value;
  }
  return DEFAULT_CURRENCY;
}

function buildSnapshotRow(event, apiEvent, now = new Date(), freshnessHours = DEFAULT_FRESHNESS_HOURS) {
  const localEventId = clean(event?.id, 255);
  const artistSlug = clean(event?.artist_slug, 255);
  if (!localEventId) return { ok: false, reason: "missing_local_event_id" };
  if (!artistSlug) return { ok: false, reason: "missing_artist_slug" };

  const stats = apiEvent?.stats && typeof apiEvent.stats === "object" ? apiEvent.stats : {};
  const lowPrice = finiteNumberOrNull(stats.lowest_price);
  if (lowPrice === null || lowPrice < 0) return { ok: false, reason: "missing_usable_lowest_price" };

  const avgPrice = finiteNumberOrNull(stats.average_price);
  const highPrice = finiteNumberOrNull(stats.highest_price);
  const inventoryCount = integerOrNull(apiEvent?.listing_count ?? apiEvent?.visible_listing_count ?? stats.listing_count ?? stats.visible_listing_count);
  const verifiedAt = now.toISOString();
  const expiresAt = new Date(now.getTime() + freshnessHours * 60 * 60 * 1000).toISOString();

  return {
    ok: true,
    row: {
      id: `${PROVIDER}:${localEventId}`,
      artist_slug: artistSlug,
      event_id: localEventId,
      provider: PROVIDER,
      low_price: lowPrice,
      avg_price: avgPrice,
      high_price: highPrice,
      currency: currencyFromResponse(apiEvent),
      inventory_count: inventoryCount,
      verified_at: verifiedAt,
      expires_at: expiresAt,
      source: APPROVED_SOURCE
    }
  };
}

function buildSeatGeekApiUrl(seatGeekEventId, env = process.env) {
  const clientId = clean(env.SEATGEEK_CLIENT_ID, 500);
  if (!clientId) throw new Error("SEATGEEK_CLIENT_ID is required for SeatGeek price snapshot ingestion");

  const url = new URL(`${SEATGEEK_EVENTS_ENDPOINT}/${encodeURIComponent(seatGeekEventId)}`);
  url.searchParams.set("client_id", clientId);
  const clientSecret = clean(env.SEATGEEK_CLIENT_SECRET, 500);
  if (clientSecret) url.searchParams.set("client_secret", clientSecret);
  return url;
}

async function fetchJson(url, fetchImpl = globalThis.fetch) {
  if (typeof fetchImpl !== "function") throw new Error("global fetch is not available in this Node runtime");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetchImpl(url, {
      headers: { accept: "application/json", "user-agent": "TourTicketCompare SeatGeek price snapshot ingestion" },
      signal: controller.signal
    });
    if (!response.ok) {
      return { ok: false, status: response.status, reason: `SeatGeek API returned HTTP ${response.status}` };
    }
    return { ok: true, status: response.status, data: await response.json() };
  } catch (error) {
    return { ok: false, status: 0, reason: `SeatGeek API request failed: ${error?.message || error}` };
  } finally {
    clearTimeout(timeout);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sqlLiteral(value) {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number") {
    if (!Number.isFinite(value)) return "NULL";
    return String(value);
  }
  return `'${String(value).replaceAll("'", "''")}'`;
}

function buildUpsertSql(rows) {
  const statements = rows.map((row) => `INSERT INTO provider_pricing_cache (id, artist_slug, event_id, provider, low_price, avg_price, high_price, currency, inventory_count, verified_at, expires_at, source, updated_at)\nVALUES (${[
    row.id,
    row.artist_slug,
    row.event_id,
    row.provider,
    row.low_price,
    row.avg_price,
    row.high_price,
    row.currency,
    row.inventory_count,
    row.verified_at,
    row.expires_at,
    row.source
  ].map(sqlLiteral).join(", ")}, CURRENT_TIMESTAMP)\nON CONFLICT(event_id, provider) DO UPDATE SET\n  artist_slug = excluded.artist_slug,\n  low_price = excluded.low_price,\n  avg_price = excluded.avg_price,\n  high_price = excluded.high_price,\n  currency = excluded.currency,\n  inventory_count = excluded.inventory_count,\n  verified_at = excluded.verified_at,\n  expires_at = excluded.expires_at,\n  source = excluded.source,\n  updated_at = CURRENT_TIMESTAMP;`);
  return ["-- Generated by scripts/snapshot-seatgeek-prices.mjs", "-- No destructive deletes; latest snapshots are upserted by (event_id, provider).", "BEGIN TRANSACTION;", ...statements, "COMMIT;", ""].join("\n");
}

async function writeRowsToD1(rows, options) {
  if (!rows.length) return { written: 0, command: null };
  const sql = buildUpsertSql(rows);
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "seatgeek-price-snapshot-"));
  const sqlPath = path.join(tempDir, "upsert-provider-pricing-cache.sql");
  await fs.writeFile(sqlPath, sql, "utf8");

  const args = ["wrangler", "d1", "execute", options.database, options.remote ? "--remote" : "--local", "--file", sqlPath];
  try {
    const result = await execFileAsync("npx", args, { cwd: REPO_ROOT, maxBuffer: 1024 * 1024 * 10 });
    return { written: rows.length, command: `npx ${args.join(" ")}`, stdout: redact(result.stdout), stderr: redact(result.stderr) };
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

function publicRow(row) {
  return {
    event_id: row.event_id,
    artist_slug: row.artist_slug,
    provider: row.provider,
    low_price: row.low_price,
    avg_price: row.avg_price,
    high_price: row.high_price,
    currency: row.currency,
    inventory_count: row.inventory_count,
    verified_at: row.verified_at,
    expires_at: row.expires_at,
    source: row.source
  };
}

async function runIngestion(options, deps = {}) {
  const events = deps.events || await readEvents(deps.eventsPath || EVENTS_PATH);
  const selection = selectEligibleEvents(events, options);
  const summary = {
    mode: options.apply ? "apply" : "dry-run",
    scanned: selection.scanned,
    eligible: selection.selected.length,
    fetched: 0,
    written: 0,
    skipped: selection.skipped.length,
    errors: 0,
    proposed_rows: [],
    skip_reasons: {},
    error_details: []
  };

  function addSkip(reason) {
    summary.skipped += 1;
    summary.skip_reasons[reason] = (summary.skip_reasons[reason] || 0) + 1;
  }

  for (const skipped of selection.skipped) {
    const reason = skipped.reason || "skipped";
    summary.skip_reasons[reason] = (summary.skip_reasons[reason] || 0) + 1;
  }

  const rows = [];
  for (const item of selection.selected) {
    if (options.delayMs > 0 && summary.fetched > 0) await sleep(options.delayMs);
    let apiUrl;
    try {
      apiUrl = buildSeatGeekApiUrl(item.seatgeekEventId, deps.env || process.env);
    } catch (error) {
      summary.errors += 1;
      summary.error_details.push({ event_id: item.event.id, reason: redact(error.message) });
      continue;
    }

    const fetched = await (deps.fetchSeatGeekEvent
      ? deps.fetchSeatGeekEvent(item.seatgeekEventId, item.event, apiUrl)
      : fetchJson(apiUrl, deps.fetchImpl));
    if (!fetched.ok) {
      addSkip("api_unavailable_or_error");
      summary.error_details.push({ event_id: item.event.id, reason: redact(fetched.reason || `HTTP ${fetched.status || "unknown"}`) });
      continue;
    }
    summary.fetched += 1;

    const built = buildSnapshotRow(item.event, fetched.data, deps.now || new Date(), options.freshnessHours);
    if (!built.ok) {
      addSkip(built.reason);
      continue;
    }
    rows.push(built.row);
    summary.proposed_rows.push(publicRow(built.row));
  }

  if (options.apply) {
    const writeResult = await (deps.writer ? deps.writer(rows, options) : writeRowsToD1(rows, options));
    summary.written = writeResult.written || 0;
    if (writeResult.command) summary.write_command = redact(writeResult.command);
  }

  return summary;
}

async function selfTest() {
  const valid = validateSeatGeekEventUrl("https://seatgeek.com/example-tickets/new-york-new-york-msg-2026-06-01-7-pm/concert/12345678");
  assert.equal(valid.ok, true);
  assert.equal(valid.eventId, "12345678");
  assert.equal(validateSeatGeekEventUrl("https://seatgeek.com/search?q=test").ok, false);
  assert.equal(validateSeatGeekEventUrl("https://seatgeek.com/performers/example").ok, false);
  assert.equal(validateSeatGeekEventUrl("not a url").ok, false);

  const now = new Date("2026-06-01T00:00:00.000Z");
  const event = {
    id: "local-event-1",
    artist_slug: "artist-one",
    seatgeek_url: "https://seatgeek.com/example-tickets/new-york-new-york-msg-2026-06-01-7-pm/concert/12345678"
  };
  const built = buildSnapshotRow(event, {
    stats: { lowest_price: 42, average_price: "75.5", highest_price: 120 },
    visible_listing_count: 9,
    currency: "usd"
  }, now, 6);
  assert.equal(built.ok, true);
  assert.equal(built.row.source, APPROVED_SOURCE);
  assert.equal(built.row.currency, "USD");
  assert.ok(Date.parse(built.row.expires_at) > now.getTime());
  assert.equal(buildSnapshotRow(event, { stats: { lowest_price: null } }, now, 6).ok, false);
  assert.equal(buildSnapshotRow(event, { stats: { lowest_price: "not-number" } }, now, 6).ok, false);

  let writes = 0;
  const dryRun = await runIngestion({ apply: false, limit: null, eventId: "", freshnessHours: 6, delayMs: 0, database: DEFAULT_D1_DATABASE, remote: true }, {
    events: [event],
    now,
    env: { SEATGEEK_CLIENT_ID: "test-client" },
    async fetchSeatGeekEvent() {
      return { ok: true, data: { stats: { lowest_price: 55 }, listing_count: 3 } };
    },
    async writer() {
      writes += 1;
      return { written: 1 };
    }
  });
  assert.equal(dryRun.fetched, 1);
  assert.equal(dryRun.written, 0);
  assert.equal(writes, 0);
  assert.equal(dryRun.proposed_rows[0].source, APPROVED_SOURCE);

  return { ok: true, tests: 10 };
}

function printSummary(summary) {
  console.log(`SeatGeek price snapshot ${summary.mode} summary:`);
  console.log(`- scanned: ${summary.scanned}`);
  console.log(`- eligible: ${summary.eligible}`);
  console.log(`- fetched: ${summary.fetched}`);
  console.log(`- written: ${summary.written}`);
  console.log(`- skipped: ${summary.skipped}`);
  console.log(`- errors: ${summary.errors}`);
  if (Object.keys(summary.skip_reasons).length) console.log(`- skip reasons: ${JSON.stringify(summary.skip_reasons)}`);
  if (summary.proposed_rows.length) {
    console.log("Proposed rows (dry-run safe; credentials redacted):");
    for (const row of summary.proposed_rows) console.log(JSON.stringify(row));
  }
  if (summary.error_details.length) {
    console.log("Errors/skips:");
    for (const detail of summary.error_details.slice(0, 20)) console.log(JSON.stringify(detail));
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return;
  }
  if (options.selfTest) {
    const result = await selfTest();
    console.log(`SeatGeek price snapshot self-test passed (${result.tests} checks).`);
    return;
  }
  const summary = await runIngestion(options);
  if (options.json) console.log(JSON.stringify(summary, null, 2));
  else printSummary(summary);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(redact(error.stack || error.message || error));
    process.exitCode = 1;
  });
}

export {
  APPROVED_SOURCE,
  buildSnapshotRow,
  buildUpsertSql,
  runIngestion,
  selectEligibleEvents,
  validateSeatGeekEventUrl
};
