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
const DEFAULT_REGISTRY_PATH = path.join(REPO_ROOT, "data", "provider-identities.json");
const SEATGEEK_EVENTS_ENDPOINT = "https://api.seatgeek.com/2/events";
const APPROVED_SOURCE = "seatgeek_partner_api";
const PROVIDER = "seatgeek";
const DEFAULT_FRESHNESS_HOURS = 6;
const REQUEST_TIMEOUT_MS = 30000;
const DEFAULT_DELAY_MS = 500;
const DEFAULT_CURRENCY = "USD";
const DEFAULT_D1_DATABASE = "tourticketcompare-demand";
const MAX_FETCH_ATTEMPTS = 3;
const RATE_LIMIT_MAX_WAIT_MS = 65000;
// SeatGeek event stats fields tracked for the pricing-availability diagnostics.
const PRICE_STATS_FIELDS = [
  "lowest_price",
  "lowest_price_good_deals",
  "lowest_sg_base_price",
  "average_price",
  "median_price",
  "highest_price",
  "listing_count",
  "visible_listing_count"
];
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
  return `Usage: node scripts/snapshot-seatgeek-prices.mjs [options]\n\nFetch SeatGeek event stats from the approved SeatGeek partner API and upsert latest provider_pricing_cache snapshots. Default mode is dry-run and never writes to D1.\n\nOnly future events whose stored SeatGeek URL carries verified provenance (provider_links.seatgeek.verified === true) are fetched — those are the only rows the runtime display gate can ever show, and past events are delisted by SeatGeek (HTTP 404).\n\nOptions:\n  --apply              Write proposed snapshot rows to D1 with wrangler d1 execute\n  --self-test          Run local unit/self tests only; no network and no D1 writes\n  --limit <number>     Process at most this many eligible SeatGeek events\n  --event-id <id>      Process only one local TourTicketCompare event ID\n  --freshness-hours <n>  Expires snapshots after n hours (default: ${DEFAULT_FRESHNESS_HOURS})\n  --delay-ms <number>  Delay before each SeatGeek API call (default: ${DEFAULT_DELAY_MS})\n  --database <name>    D1 database name for apply mode (default: ${DEFAULT_D1_DATABASE})\n  --local              Use local D1 in apply mode instead of remote D1\n  --rematch-proposals <path>  For eligible events whose SeatGeek event id returns HTTP 404, look up the current SeatGeek event by verified registry performer id + exact local date and write a proposal-only re-match report to <path>. Never mutates events.json and never writes pricing rows from re-matched events.\n  --json               Emit machine-readable summary JSON\n  -h, --help           Show this help\n\nEnvironment:\n  SEATGEEK_CLIENT_ID       Required for API fetches\n  SEATGEEK_CLIENT_SECRET   Optional; sent only to the SeatGeek partner API when present\n  CLOUDFLARE_API_TOKEN     Required by wrangler for remote --apply writes\n  CLOUDFLARE_ACCOUNT_ID    Required by wrangler for remote --apply writes\n  TTC_TODAY                Optional YYYY-MM-DD override of "today" for deterministic testing\n`;
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
    rematchPath: "",
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
    } else if (arg === "--rematch-proposals") {
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) throw new Error("--rematch-proposals requires an output path");
      options.rematchPath = path.resolve(REPO_ROOT, value);
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

function todayString() {
  const override = clean(process.env.TTC_TODAY, 20);
  if (/^\d{4}-\d{2}-\d{2}$/.test(override)) return override;
  return new Date().toISOString().slice(0, 10);
}

function localDateFromIso(iso, timeZone) {
  const date = new Date(clean(iso, 100));
  if (Number.isNaN(date.getTime())) return "";
  try {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: timeZone || "UTC",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(date);
    const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    return `${lookup.year}-${lookup.month}-${lookup.day}`;
  } catch {
    return date.toISOString().slice(0, 10);
  }
}

async function readEvents(eventsPath = EVENTS_PATH) {
  const raw = await fs.readFile(eventsPath, "utf8");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error("events.json must contain an array of events");
  return parsed;
}

// Eligibility mirrors the runtime display gate (functions/api/shows.js): only a
// future event whose stored SeatGeek URL carries verified provenance
// (provider_links.seatgeek.verified === true) can ever show a price snapshot,
// so those are the only events worth spending partner-API quota on. Past
// events are delisted by SeatGeek and return HTTP 404.
function selectEligibleEvents(events, options = {}, asOfDate = todayString()) {
  const scanned = Array.isArray(events) ? events.length : 0;
  const selected = [];
  const skipped = [];

  for (const event of Array.isArray(events) ? events : []) {
    const eventId = clean(event?.id, 255);
    if (options.eventId && eventId !== options.eventId) continue;

    const storedUrl = clean(event?.seatgeek_url, 2048);
    if (!storedUrl) {
      skipped.push({ event_id: eventId || null, reason: "missing_seatgeek_url" });
      continue;
    }

    const validation = validateSeatGeekEventUrl(storedUrl);
    if (!validation.ok) {
      skipped.push({ event_id: eventId || null, reason: "invalid_seatgeek_url", detail: validation.reason });
      continue;
    }

    if (event?.provider_links?.seatgeek?.verified !== true) {
      skipped.push({ event_id: eventId || null, reason: "unverified_seatgeek_provenance" });
      continue;
    }

    const localDate = localDateFromIso(event?.datetime_iso, event?.timezone);
    if (!localDate) {
      skipped.push({ event_id: eventId || null, reason: "missing_event_datetime" });
      continue;
    }
    if (localDate < asOfDate) {
      skipped.push({ event_id: eventId || null, reason: "event_in_past" });
      continue;
    }

    selected.push({ event, seatgeekEventId: validation.eventId, seatgeekUrl: validation.url, localDate });
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

// Tallies which SeatGeek stats fields actually carried values so a run can
// tell "the API never sends pricing stats to this key" (an entitlement or
// missing-client_secret problem) apart from "these specific events had no
// listings".
function recordStatsDiagnostics(diagnostics, apiEvent) {
  diagnostics.fetched_responses += 1;
  const stats = apiEvent?.stats && typeof apiEvent.stats === "object" ? apiEvent.stats : null;
  if (!stats) return;
  diagnostics.responses_with_stats_object += 1;
  for (const field of PRICE_STATS_FIELDS) {
    if (finiteNumberOrNull(stats[field]) !== null) {
      diagnostics.non_null_stats_fields[field] = (diagnostics.non_null_stats_fields[field] || 0) + 1;
    }
  }
}

function pricingStatsWarning(diagnostics) {
  if (diagnostics.fetched_responses < 5) return "";
  const anyPricingField = ["lowest_price", "lowest_price_good_deals", "lowest_sg_base_price", "average_price", "median_price", "highest_price"]
    .some((field) => (diagnostics.non_null_stats_fields[field] || 0) > 0);
  if (anyPricingField) return "";
  return [
    `SeatGeek returned HTTP 200 for ${diagnostics.fetched_responses} future on-sale events but every pricing stats field was null.`,
    "This pattern points at the API credential, not the events:",
    diagnostics.client_secret_present
      ? "client_secret WAS sent, so the account likely lacks the pricing-stats entitlement — contact SeatGeek partner support to enable event stats (lowest/average/highest price) for this client id."
      : "SEATGEEK_CLIENT_SECRET was NOT set for this run — configure it (GitHub Actions repository secret) and re-run before assuming a partner entitlement gap; unauthenticated keys may receive events without stats."
  ].join(" ");
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
      return {
        ok: false,
        status: response.status,
        reason: `SeatGeek API returned HTTP ${response.status}`,
        headers: {
          retryAfter: response.headers?.get?.("retry-after") || "",
          ratelimitReset: response.headers?.get?.("ratelimit-reset") || response.headers?.get?.("x-ratelimit-reset") || ""
        }
      };
    }
    return { ok: true, status: response.status, data: await response.json() };
  } catch (error) {
    return { ok: false, status: 0, reason: `SeatGeek API request failed: ${error?.message || error}` };
  } finally {
    clearTimeout(timeout);
  }
}

// Retries rate-limit (429), server (5xx), and transport failures with backoff.
// 404 is a definitive answer (the SeatGeek event id no longer exists) and is
// returned immediately so the caller can route it to re-matching.
async function fetchJsonWithRetry(url, fetchImpl = globalThis.fetch, sleeper = sleep) {
  let last = null;
  for (let attempt = 1; attempt <= MAX_FETCH_ATTEMPTS; attempt += 1) {
    last = await fetchJson(url, fetchImpl);
    if (last.ok) return last;
    const retryable = last.status === 429 || last.status >= 500 || last.status === 0;
    if (!retryable || attempt === MAX_FETCH_ATTEMPTS) return last;
    let waitMs = attempt * 2000;
    if (last.status === 429) {
      const retryAfter = Number.parseFloat(last.headers?.retryAfter);
      const reset = Number.parseFloat(last.headers?.ratelimitReset);
      if (Number.isFinite(retryAfter) && retryAfter > 0) {
        waitMs = Math.min((retryAfter + 1) * 1000, RATE_LIMIT_MAX_WAIT_MS);
      } else if (Number.isFinite(reset) && reset > 0) {
        // Some providers send epoch seconds in the reset header rather than
        // seconds-remaining; treat large values as an absolute timestamp.
        const waitSec = reset > 1_000_000_000 ? reset - Date.now() / 1000 : reset;
        waitMs = Math.min(Math.max(1, waitSec + 1) * 1000, RATE_LIMIT_MAX_WAIT_MS);
      } else {
        waitMs = RATE_LIMIT_MAX_WAIT_MS;
      }
    }
    await sleeper(waitMs);
  }
  return last;
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

function historyRowId(row) {
  return `${row.provider}:${row.event_id}:${row.verified_at}`;
}

function buildProviderPricingHistoryInsertSql(row) {
  return `INSERT OR IGNORE INTO provider_pricing_history (id, event_id, artist_slug, provider, low_price, currency, inventory_count, source, observed_at, created_at)\nVALUES (${[
    historyRowId(row),
    row.event_id,
    row.artist_slug,
    row.provider,
    row.low_price,
    row.currency,
    row.inventory_count,
    row.source,
    row.verified_at
  ].map(sqlLiteral).join(", ")}, CURRENT_TIMESTAMP);`;
}

function buildProviderPricingCacheUpsertSql(row) {
  return `INSERT INTO provider_pricing_cache (id, artist_slug, event_id, provider, low_price, avg_price, high_price, currency, inventory_count, verified_at, expires_at, source, updated_at)\nVALUES (${[
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
  ].map(sqlLiteral).join(", ")}, CURRENT_TIMESTAMP)\nON CONFLICT(event_id, provider) DO UPDATE SET\n  artist_slug = excluded.artist_slug,\n  low_price = excluded.low_price,\n  avg_price = excluded.avg_price,\n  high_price = excluded.high_price,\n  currency = excluded.currency,\n  inventory_count = excluded.inventory_count,\n  verified_at = excluded.verified_at,\n  expires_at = excluded.expires_at,\n  source = excluded.source,\n  updated_at = CURRENT_TIMESTAMP;`;
}

function buildUpsertSql(rows) {
  const statements = rows.flatMap((row) => [
    buildProviderPricingHistoryInsertSql(row),
    buildProviderPricingCacheUpsertSql(row)
  ]);
  return [
    "-- Generated by scripts/snapshot-seatgeek-prices.mjs",
    "-- No destructive deletes; latest snapshots are upserted by (event_id, provider).",
    "-- Immutable history rows are inserted first with INSERT OR IGNORE so provider snapshot scripts (including Vivid Seats) share the same observation pattern.",
    "-- No explicit transaction statements: Cloudflare's remote D1 import path rejects them (see the Vivid Seats snapshot fix, PR #388).",
    ...statements,
    ""
  ].join("\n");
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

// ── Re-match proposals for stale SeatGeek event ids ─────────────────────────
// When an eligible event's stored SeatGeek event id 404s, the show usually
// still exists under a new id (SeatGeek re-keys events). Look it up scoped by
// the VERIFIED registry performer id and the exact local date, and emit a
// proposal-only report for the existing human/CTA-sync verification lane.
// Nothing here mutates events.json or writes pricing rows.

function normalizeText(value) {
  return clean(value, 500)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function diceSimilarity(a, b) {
  const aTokens = new Set(normalizeText(a).split(" ").filter((token) => token.length > 1));
  const bTokens = new Set(normalizeText(b).split(" ").filter((token) => token.length > 1));
  if (!aTokens.size && !bTokens.size) return 1;
  if (!aTokens.size || !bTokens.size) return 0;
  let overlap = 0;
  for (const token of aTokens) if (bTokens.has(token)) overlap += 1;
  return (2 * overlap) / (aTokens.size + bTokens.size);
}

// Same verified-only gate as the discovery proposal script: an id on an
// unverified/withheld registry entry must not scope queries.
async function loadPerformerIdMap(registryPath = DEFAULT_REGISTRY_PATH) {
  const map = new Map();
  let parsed;
  try {
    parsed = JSON.parse(await fs.readFile(registryPath, "utf8"));
  } catch {
    return map;
  }
  for (const entry of Array.isArray(parsed?.artists) ? parsed.artists : []) {
    const slug = clean(entry?.slug, 120);
    if (slug && clean(entry?.review_status) === "verified" && Number.isInteger(entry?.seatgeek_performer_id)) {
      map.set(slug, entry.seatgeek_performer_id);
    }
  }
  return map;
}

function buildRematchApiUrl(performerId, localDate, env = process.env) {
  const clientId = clean(env.SEATGEEK_CLIENT_ID, 500);
  if (!clientId) throw new Error("SEATGEEK_CLIENT_ID is required for SeatGeek re-match lookups");
  const url = new URL(SEATGEEK_EVENTS_ENDPOINT);
  url.searchParams.set("client_id", clientId);
  const clientSecret = clean(env.SEATGEEK_CLIENT_SECRET, 500);
  if (clientSecret) url.searchParams.set("client_secret", clientSecret);
  url.searchParams.set("performers.id", String(performerId));
  url.searchParams.set("datetime_local.gte", `${localDate}T00:00:00`);
  url.searchParams.set("datetime_local.lte", `${localDate}T23:59:59`);
  url.searchParams.set("per_page", "10");
  return url;
}

function candidateLocalDate(candidate) {
  const local = clean(candidate?.datetime_local, 100).slice(0, 10);
  if (/^\d{4}-\d{2}-\d{2}$/.test(local)) return local;
  const utc = clean(candidate?.datetime_utc, 100).slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(utc) ? utc : "";
}

// A candidate must carry a valid event-level URL, land on the same local
// date (the query is already scoped to the verified performer id), and agree
// on the location (exact city or strong venue-name similarity).
function evaluateRematchCandidates(item, candidates) {
  const event = item.event;
  const accepted = [];
  for (const candidate of Array.isArray(candidates) ? candidates : []) {
    const urlValidation = validateSeatGeekEventUrl(candidate?.url);
    if (!urlValidation.ok) continue;
    if (candidateLocalDate(candidate) !== item.localDate) continue;
    const eventCity = normalizeText(event?.city);
    const candidateCity = normalizeText(candidate?.venue?.city);
    const cityExact = eventCity !== "" && eventCity === candidateCity;
    const venueSimilarity = diceSimilarity(event?.venue, candidate?.venue?.name);
    // When both cities are present but disagree (e.g. metro-area venues), a
    // generic venue-name overlap is not enough — demand a near-exact venue.
    const minVenueSimilarity = eventCity && candidateCity && !cityExact ? 0.8 : 0.55;
    if (!cityExact && venueSimilarity < minVenueSimilarity) continue;
    accepted.push({
      seatgeek_event_id: urlValidation.eventId,
      proposed_seatgeek_url: urlValidation.url,
      seatgeek_title: clean(candidate?.title, 200),
      seatgeek_datetime_local: clean(candidate?.datetime_local, 100),
      seatgeek_venue: clean(candidate?.venue?.name, 180),
      seatgeek_city: clean(candidate?.venue?.city, 120),
      city_exact: Boolean(cityExact),
      venue_similarity: Number(venueSimilarity.toFixed(3))
    });
  }
  const base = {
    local_event_id: clean(event?.id, 255),
    artist_slug: clean(event?.artist_slug, 255),
    local_date: item.localDate,
    venue: clean(event?.venue, 180),
    city: clean(event?.city, 120),
    stale_seatgeek_url: item.seatgeekUrl,
    stale_seatgeek_event_id: item.seatgeekEventId
  };
  if (accepted.length === 1) return { ...base, status: "proposed", candidate: accepted[0] };
  if (accepted.length > 1) return { ...base, status: "ambiguous", candidates: accepted };
  return { ...base, status: "no_candidate" };
}

async function runRematch(notFoundItems, options, deps, summary) {
  if (!notFoundItems.length) return;
  const performerIdMap = deps.performerIdMap || await loadPerformerIdMap(deps.registryPath || DEFAULT_REGISTRY_PATH);
  const proposals = [];
  for (const item of notFoundItems) {
    const performerId = performerIdMap.get(clean(item.event?.artist_slug, 120));
    if (!Number.isInteger(performerId)) {
      proposals.push({
        local_event_id: clean(item.event?.id, 255),
        artist_slug: clean(item.event?.artist_slug, 255),
        status: "no_verified_performer_id"
      });
      continue;
    }
    if (options.delayMs > 0) await (deps.sleeper || sleep)(options.delayMs);
    let apiUrl;
    try {
      apiUrl = buildRematchApiUrl(performerId, item.localDate, deps.env || process.env);
    } catch (error) {
      summary.error_details.push({ event_id: item.event?.id, reason: redact(error.message) });
      proposals.push({
        local_event_id: clean(item.event?.id, 255),
        artist_slug: clean(item.event?.artist_slug, 255),
        status: "url_build_failed",
        detail: redact(error.message)
      });
      continue;
    }
    const fetched = await (deps.fetchRematchCandidates
      ? deps.fetchRematchCandidates(item, apiUrl)
      : fetchJsonWithRetry(apiUrl, deps.fetchImpl, deps.sleeper));
    if (!fetched.ok) {
      proposals.push({
        local_event_id: clean(item.event?.id, 255),
        artist_slug: clean(item.event?.artist_slug, 255),
        status: "lookup_failed",
        detail: redact(fetched.reason || `HTTP ${fetched.status || "unknown"}`)
      });
      continue;
    }
    proposals.push(evaluateRematchCandidates(item, fetched.data?.events));
  }

  summary.rematch = {
    checked: notFoundItems.length,
    proposed: proposals.filter((proposal) => proposal.status === "proposed").length,
    ambiguous: proposals.filter((proposal) => proposal.status === "ambiguous").length,
    no_candidate: proposals.filter((proposal) => proposal.status === "no_candidate").length,
    proposals
  };

  if (options.rematchPath) {
    const report = {
      generated_at: (deps.now || new Date()).toISOString(),
      mode: "proposal_only",
      note: "Stale SeatGeek event ids re-matched by verified registry performer id + exact local date. Review and apply through the SeatGeek CTA verification lane; this report never mutates events.json and no pricing rows were written from re-matched events.",
      ...summary.rematch
    };
    await fs.mkdir(path.dirname(options.rematchPath), { recursive: true });
    await fs.writeFile(options.rematchPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
    summary.rematch.report_path = path.relative(REPO_ROOT, options.rematchPath);
  }
}

async function runIngestion(options, deps = {}) {
  const events = deps.events || await readEvents(deps.eventsPath || EVENTS_PATH);
  const asOfDate = deps.asOfDate || todayString();
  const selection = selectEligibleEvents(events, options, asOfDate);
  const env = deps.env || process.env;
  const summary = {
    mode: options.apply ? "apply" : "dry-run",
    as_of_date: asOfDate,
    scanned: selection.scanned,
    eligible: selection.selected.length,
    fetched: 0,
    usable: 0,
    written: 0,
    skipped: selection.skipped.length,
    stale: 0,
    failed: 0,
    errors: 0,
    proposed_rows: [],
    skip_reasons: {},
    error_details: []
  };
  const statsDiagnostics = {
    fetched_responses: 0,
    responses_with_stats_object: 0,
    non_null_stats_fields: {},
    client_secret_present: Boolean(clean(env.SEATGEEK_CLIENT_SECRET, 500))
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
  const notFoundItems = [];
  for (const item of selection.selected) {
    if (options.delayMs > 0 && summary.fetched > 0) await (deps.sleeper || sleep)(options.delayMs);
    let apiUrl;
    try {
      apiUrl = buildSeatGeekApiUrl(item.seatgeekEventId, env);
    } catch (error) {
      addSkip("url_build_failed");
      summary.failed += 1;
      summary.errors += 1;
      summary.error_details.push({ event_id: item.event.id, reason: redact(error.message) });
      continue;
    }

    const fetched = await (deps.fetchSeatGeekEvent
      ? deps.fetchSeatGeekEvent(item.seatgeekEventId, item.event, apiUrl)
      : fetchJsonWithRetry(apiUrl, deps.fetchImpl, deps.sleeper));
    if (!fetched.ok) {
      if (fetched.status === 404) {
        addSkip("seatgeek_event_not_found");
        notFoundItems.push(item);
      } else if (fetched.status === 429) {
        addSkip("seatgeek_rate_limited");
        summary.failed += 1;
        summary.errors += 1;
      } else {
        addSkip("api_unavailable_or_error");
        summary.failed += 1;
        summary.errors += 1;
      }
      summary.error_details.push({ event_id: item.event.id, reason: redact(fetched.reason || `HTTP ${fetched.status || "unknown"}`) });
      continue;
    }
    summary.fetched += 1;
    recordStatsDiagnostics(statsDiagnostics, fetched.data);

    const built = buildSnapshotRow(item.event, fetched.data, deps.now || new Date(), options.freshnessHours);
    if (!built.ok) {
      addSkip(built.reason);
      continue;
    }
    rows.push(built.row);
    summary.proposed_rows.push(publicRow(built.row));
  }

  summary.usable = rows.length;

  summary.stats_diagnostics = statsDiagnostics;
  const warning = pricingStatsWarning(statsDiagnostics);
  if (warning) summary.pricing_stats_warning = warning;

  if (options.rematchPath || deps.fetchRematchCandidates) {
    await runRematch(notFoundItems, options, deps, summary);
  }

  if (options.apply) {
    const writeResult = await (deps.writer ? deps.writer(rows, options) : writeRowsToD1(rows, options));
    summary.written = writeResult.written || 0;
    if (writeResult.command) summary.write_command = redact(writeResult.command);
  }

  if (summary.eligible === 0) summary.zero_row_reason = "no_eligible_verified_events";
  else if (warning && summary.usable === 0) summary.zero_row_reason = "pricing_stats_unavailable";
  else if (summary.usable === 0 && summary.fetched === 0 && summary.failed > 0) summary.zero_row_reason = "provider_fetch_failed";
  else if (summary.usable === 0) summary.zero_row_reason = "no_usable_current_prices";
  else if (options.apply && summary.written === 0) summary.zero_row_reason = "d1_write_returned_zero";

  return summary;
}

async function selfTest() {
  let checks = 0;
  function check(fn, ...args) {
    fn(...args);
    checks += 1;
  }

  check(assert.equal, validateSeatGeekEventUrl("https://seatgeek.com/example-tickets/new-york-new-york-msg-2026-06-01-7-pm/concert/12345678").ok, true);
  check(assert.equal, validateSeatGeekEventUrl("https://seatgeek.com/example-tickets/new-york-new-york-msg-2026-06-01-7-pm/concert/12345678").eventId, "12345678");
  check(assert.equal, validateSeatGeekEventUrl("https://seatgeek.com/search?q=test").ok, false);
  check(assert.equal, validateSeatGeekEventUrl("https://seatgeek.com/performers/example").ok, false);
  check(assert.equal, validateSeatGeekEventUrl("not a url").ok, false);

  const now = new Date("2026-06-01T00:00:00.000Z");
  const asOfDate = "2026-05-14";
  const verifiedLinks = { seatgeek: { verified: true } };
  const event = {
    id: "local-event-1",
    artist_slug: "artist-one",
    city: "New York",
    venue: "Madison Square Garden",
    datetime_iso: "2026-06-01T23:00:00Z",
    timezone: "America/New_York",
    provider_links: verifiedLinks,
    seatgeek_url: "https://seatgeek.com/example-tickets/new-york-new-york-msg-2026-06-01-7-pm/concert/12345678"
  };
  const built = buildSnapshotRow(event, {
    stats: { lowest_price: 42, average_price: "75.5", highest_price: 120 },
    visible_listing_count: 9,
    currency: "usd"
  }, now, 6);
  check(assert.equal, built.ok, true);
  check(assert.equal, built.row.source, APPROVED_SOURCE);
  check(assert.equal, built.row.currency, "USD");
  check(assert.ok, Date.parse(built.row.expires_at) > now.getTime());
  check(assert.equal, buildSnapshotRow(event, { stats: { lowest_price: null } }, now, 6).ok, false);
  check(assert.equal, buildSnapshotRow(event, { stats: { lowest_price: "not-number" } }, now, 6).ok, false);
  const sql = buildUpsertSql([built.row]);
  check(assert.match, sql, /INSERT OR IGNORE INTO provider_pricing_history/);
  check(assert.match, sql, /INSERT INTO provider_pricing_cache/);
  check(assert.doesNotMatch, sql, /BEGIN TRANSACTION|COMMIT/);

  // Eligibility mirrors the runtime display gate: unverified provenance and
  // past events are excluded before any API call is spent.
  const unverifiedEvent = { ...event, id: "local-event-2", provider_links: { seatgeek: { verified: false } } };
  const pastEvent = { ...event, id: "local-event-3", datetime_iso: "2026-05-01T23:00:00Z" };
  const noDateEvent = { ...event, id: "local-event-4", datetime_iso: "" };
  const selection = selectEligibleEvents([event, unverifiedEvent, pastEvent, noDateEvent], {}, asOfDate);
  check(assert.equal, selection.selected.length, 1);
  check(assert.equal, selection.selected[0].event.id, "local-event-1");
  check(assert.deepEqual, selection.skipped.map((entry) => entry.reason).sort(), ["event_in_past", "missing_event_datetime", "unverified_seatgeek_provenance"]);
  check(assert.equal, selection.selected[0].localDate, "2026-06-01");

  // 429 responses are retried (honoring retry-after) and succeed without
  // surfacing an error; 404 is terminal and never retried.
  const waits = [];
  const responses = [
    { ok: false, status: 429, headers: new Map([["retry-after", "2"]]) },
    { ok: true, status: 200, json: async () => ({ stats: { lowest_price: 10 } }) }
  ];
  const retried = await fetchJsonWithRetry("https://api.seatgeek.com/2/events/1?client_id=x", async () => {
    const next = responses.shift();
    return { ok: next.ok, status: next.status, headers: { get: (name) => next.headers?.get(name) || "" }, json: next.json };
  }, async (ms) => waits.push(ms));
  check(assert.equal, retried.ok, true);
  check(assert.deepEqual, waits, [3000]);
  let fetches404 = 0;
  const notFound = await fetchJsonWithRetry("https://api.seatgeek.com/2/events/1?client_id=x", async () => {
    fetches404 += 1;
    return { ok: false, status: 404, headers: { get: () => "" } };
  }, async () => {});
  check(assert.equal, notFound.status, 404);
  check(assert.equal, fetches404, 1);

  // An epoch-seconds reset header is converted to a relative wait instead of
  // being multiplied straight into the 65s cap.
  const epochWaits = [];
  const epochResponses = [
    { ok: false, status: 429, reset: String(Date.now() / 1000 + 2) },
    { ok: true, status: 200, json: async () => ({}) }
  ];
  await fetchJsonWithRetry("https://api.seatgeek.com/2/events/1?client_id=x", async () => {
    const next = epochResponses.shift();
    return { ok: next.ok, status: next.status, headers: { get: (name) => (name === "ratelimit-reset" ? next.reset || "" : "") }, json: next.json };
  }, async (ms) => epochWaits.push(ms));
  check(assert.equal, epochWaits.length, 1);
  check(assert.ok, epochWaits[0] >= 1000 && epochWaits[0] <= 10000, `epoch reset wait should be relative, got ${epochWaits[0]}`);

  // Dry-run ingestion: writer untouched, proposed rows carry the approved source.
  let writes = 0;
  const baseOptions = { apply: false, limit: null, eventId: "", freshnessHours: 6, delayMs: 0, database: DEFAULT_D1_DATABASE, remote: true, rematchPath: "" };
  const dryRun = await runIngestion(baseOptions, {
    events: [event],
    now,
    asOfDate,
    env: { SEATGEEK_CLIENT_ID: "test-client" },
    async fetchSeatGeekEvent() {
      return { ok: true, data: { stats: { lowest_price: 55 }, listing_count: 3 } };
    },
    async writer() {
      writes += 1;
      return { written: 1 };
    }
  });
  check(assert.equal, dryRun.fetched, 1);
  check(assert.equal, dryRun.usable, 1);
  check(assert.equal, dryRun.written, 0);
  check(assert.equal, dryRun.stale, 0);
  check(assert.equal, dryRun.failed, 0);
  check(assert.equal, writes, 0);
  check(assert.equal, dryRun.proposed_rows[0].source, APPROVED_SOURCE);
  check(assert.equal, dryRun.pricing_stats_warning, undefined);
  check(assert.equal, dryRun.stats_diagnostics.non_null_stats_fields.lowest_price, 1);

  // All-null pricing stats across >=5 fetched events raises the entitlement
  // warning, and its wording tracks client_secret presence.
  const nullStatsEvents = Array.from({ length: 5 }, (_, index) => ({
    ...event,
    id: `null-stats-${index}`,
    seatgeek_url: `https://seatgeek.com/example-tickets/x/concert/9000${index}`
  }));
  const nullRun = await runIngestion(baseOptions, {
    events: nullStatsEvents,
    now,
    asOfDate,
    env: { SEATGEEK_CLIENT_ID: "test-client" },
    async fetchSeatGeekEvent() {
      return { ok: true, data: { stats: { lowest_price: null, average_price: null, highest_price: null, listing_count: 12 } } };
    }
  });
  check(assert.equal, nullRun.skip_reasons.missing_usable_lowest_price, 5);
  check(assert.equal, nullRun.usable, 0);
  check(assert.equal, nullRun.zero_row_reason, "pricing_stats_unavailable");
  check(assert.match, nullRun.pricing_stats_warning, /SEATGEEK_CLIENT_SECRET was NOT set/);
  const nullRunWithSecret = await runIngestion(baseOptions, {
    events: nullStatsEvents,
    now,
    asOfDate,
    env: { SEATGEEK_CLIENT_ID: "test-client", SEATGEEK_CLIENT_SECRET: "test-secret" },
    async fetchSeatGeekEvent() {
      return { ok: true, data: { stats: { lowest_price: null } } };
    }
  });
  check(assert.match, nullRunWithSecret.pricing_stats_warning, /pricing-stats entitlement/);

  const failedRun = await runIngestion(baseOptions, {
    events: [event],
    now,
    asOfDate,
    env: { SEATGEEK_CLIENT_ID: "test-client" },
    async fetchSeatGeekEvent() {
      return { ok: false, status: 503, reason: "SeatGeek API returned HTTP 503" };
    }
  });
  check(assert.equal, failedRun.failed, 1);
  check(assert.equal, failedRun.errors, 1);
  check(assert.equal, failedRun.zero_row_reason, "provider_fetch_failed");

  // Exit-code policy: genuine failures and unexplained empty apply runs fail the
  // job; the diagnosed entitlement gap is surfaced but treated as non-fatal so
  // scheduled runs do not go red every four hours for an external blocker.
  check(assert.equal, isHardFailure(dryRun, baseOptions), false);
  check(assert.equal, isHardFailure(failedRun, baseOptions), true);
  check(assert.equal, isHardFailure(nullRunWithSecret, { apply: true }), false);
  check(assert.equal, isHardFailure(nullRun, { apply: true }), false);
  check(
    assert.equal,
    isHardFailure({ failed: 0, eligible: 5, usable: 0, zero_row_reason: "no_usable_current_prices" }, { apply: true }),
    true
  );

  // A 404 on an eligible event is classified as seatgeek_event_not_found and
  // produces a proposal-only re-match keyed by verified performer id + date.
  const rematchRun = await runIngestion(baseOptions, {
    events: [event],
    now,
    asOfDate,
    env: { SEATGEEK_CLIENT_ID: "test-client" },
    performerIdMap: new Map([["artist-one", 42]]),
    async fetchSeatGeekEvent() {
      return { ok: false, status: 404, reason: "SeatGeek API returned HTTP 404" };
    },
    async fetchRematchCandidates(item, apiUrl) {
      assert.ok(String(apiUrl).includes("performers.id=42"));
      assert.ok(String(apiUrl).includes("datetime_local.gte=2026-06-01T00%3A00%3A00"));
      return {
        ok: true,
        data: {
          events: [
            {
              title: "Artist One",
              url: "https://seatgeek.com/artist-one-tickets/new-york-new-york-msg-2026-06-01-7-pm/concert/87654321",
              datetime_local: "2026-06-01T19:00:00",
              venue: { name: "Madison Square Garden", city: "New York" }
            },
            {
              title: "Artist One (wrong night)",
              url: "https://seatgeek.com/artist-one-tickets/new-york-2026-06-02-7-pm/concert/87654399",
              datetime_local: "2026-06-02T19:00:00",
              venue: { name: "Madison Square Garden", city: "New York" }
            }
          ]
        }
      };
    }
  });
  check(assert.equal, rematchRun.skip_reasons.seatgeek_event_not_found, 1);
  check(assert.equal, rematchRun.rematch.proposed, 1);
  check(assert.equal, rematchRun.rematch.proposals[0].status, "proposed");
  check(assert.equal, rematchRun.rematch.proposals[0].candidate.seatgeek_event_id, "87654321");

  // Wrong-date and generic-URL candidates are never proposed.
  const eventNoCity = { ...event, city: "", venue: "" };
  const rejected = evaluateRematchCandidates(
    { event: eventNoCity, localDate: "2026-06-01", seatgeekUrl: event.seatgeek_url, seatgeekEventId: "12345678" },
    [{ title: "x", url: "https://seatgeek.com/performers/artist-one", datetime_local: "2026-06-01T19:00:00", venue: { name: "MSG", city: "New York" } }]
  );
  check(assert.equal, rejected.status, "no_candidate");

  // Disagreeing cities with only a generic venue-name overlap must not match.
  const crossCity = evaluateRematchCandidates(
    { event: { ...event, city: "Boston", venue: "The Theater" }, localDate: "2026-06-01", seatgeekUrl: event.seatgeek_url, seatgeekEventId: "12345678" },
    [{ title: "x", url: "https://seatgeek.com/x-tickets/chicago-2026-06-01/concert/555", datetime_local: "2026-06-01T19:00:00", venue: { name: "Theater", city: "Chicago" } }]
  );
  check(assert.equal, crossCity.status, "no_candidate");

  return { ok: true, tests: checks };
}

function printSummary(summary) {
  console.log(`SeatGeek price snapshot ${summary.mode} summary:`);
  console.log(`- as-of date: ${summary.as_of_date}`);
  console.log(`- scanned: ${summary.scanned}`);
  console.log(`- eligible: ${summary.eligible}`);
  console.log(`- fetched: ${summary.fetched}`);
  console.log(`- usable: ${summary.usable}`);
  console.log(`- written: ${summary.written}`);
  console.log(`- skipped: ${summary.skipped}`);
  console.log(`- stale: ${summary.stale}`);
  console.log(`- failed: ${summary.failed}`);
  console.log(`- errors: ${summary.errors}`);
  if (summary.zero_row_reason) console.log(`- zero-row reason: ${summary.zero_row_reason}`);
  if (Object.keys(summary.skip_reasons).length) console.log(`- skip reasons: ${JSON.stringify(summary.skip_reasons)}`);
  if (summary.stats_diagnostics) {
    console.log(`- stats diagnostics: ${JSON.stringify(summary.stats_diagnostics)}`);
  }
  if (summary.pricing_stats_warning) {
    console.log(`WARNING: ${summary.pricing_stats_warning}`);
  }
  if (summary.rematch) {
    console.log(`- re-match (proposal only): checked=${summary.rematch.checked} proposed=${summary.rematch.proposed} ambiguous=${summary.rematch.ambiguous} no_candidate=${summary.rematch.no_candidate}${summary.rematch.report_path ? ` report=${summary.rematch.report_path}` : ""}`);
  }
  if (summary.proposed_rows.length) {
    console.log("Proposed rows (dry-run safe; credentials redacted):");
    for (const row of summary.proposed_rows) console.log(JSON.stringify(row));
  }
  if (summary.error_details.length) {
    console.log("Errors/skips:");
    for (const detail of summary.error_details.slice(0, 20)) console.log(JSON.stringify(detail));
  }
}

// Decide whether a completed run should exit non-zero. Genuine operational
// failures (provider fetch/build/write errors surfaced via summary.failed, or an
// apply run that produced no usable rows for an unexplained reason) fail the job
// so they are noticed and actioned.
//
// The one deliberate exception is the SeatGeek pricing-stats entitlement gap:
// the account's API client returns HTTP 200 for every eligible event with all
// price-stat fields null, so zero usable rows can be built no matter how often
// the workflow runs. That is a permanent external limitation (see
// PROJECT_STATUS.md "What is not supported"), already surfaced loudly via the run
// summary, the pricing-stats warning, and a workflow annotation. Hard-failing on
// it only turns every scheduled run red — alert fatigue that masks genuinely new
// failures — so an entitlement-blocked run is treated as non-fatal.
function isHardFailure(summary, options = {}) {
  if (summary.failed > 0) return true;
  if (summary.zero_row_reason === "pricing_stats_unavailable") return false;
  if (options.apply && summary.eligible > 0 && summary.usable === 0) return true;
  return false;
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
  if (isHardFailure(summary, options)) process.exitCode = 1;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(redact(error.stack || error.message || error));
    process.exitCode = 1;
  });
}

export {
  APPROVED_SOURCE,
  buildProviderPricingHistoryInsertSql,
  buildRematchApiUrl,
  buildSnapshotRow,
  buildUpsertSql,
  evaluateRematchCandidates,
  fetchJsonWithRetry,
  isHardFailure,
  loadPerformerIdMap,
  runIngestion,
  selectEligibleEvents,
  validateSeatGeekEventUrl
};
