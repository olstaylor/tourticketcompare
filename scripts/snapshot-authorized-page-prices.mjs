#!/usr/bin/env node
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { seatgeekProvider, ticketmasterProvider } from "../functions/api/_providers/index.js";

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const EVENTS_PATH = path.join(REPO_ROOT, "public", "data", "events.json");
const PROVIDERS = Object.freeze([ticketmasterProvider, seatgeekProvider]);
const PROVIDER_BY_SLUG = new Map(PROVIDERS.map((provider) => [provider.slug, provider]));
const DEFAULT_DATABASE = "tourticketcompare-demand";
const DEFAULT_DELAY_MS = 4000;
const MINIMUM_DELAY_MS = 3000;
const REQUEST_TIMEOUT_MS = 30000;
const MAX_ATTEMPTS = 3;
const MAX_ROBOTS_BYTES = 512 * 1024;
const USER_AGENT = "TourTicketCompare/1.0 (+https://tourticketcompare.com; authorized lowest-price snapshot)";
const ROBOTS_AGENT = "tourticketcompare";
const INITIALIZED_SQLITE_PATHS = new Set();

class ProviderStopError extends Error {
  constructor(provider, reason, eventId) {
    super(`${provider} retrieval stopped: ${reason}`);
    this.name = "ProviderStopError";
    this.provider = provider;
    this.reason = reason;
    this.eventId = eventId;
  }
}

function clean(value, max = 2048) {
  return String(value ?? "").trim().slice(0, max);
}

function usage() {
  return `Usage: node scripts/snapshot-authorized-page-prices.mjs [options]\n\n` +
    `Retrieve only the lowest public price from verified Ticketmaster and SeatGeek event pages and write the existing D1 provider-pricing schema. Default mode is preview-only: it performs no provider requests and no D1 writes.\n\n` +
    `Options:\n` +
    `  --apply                 Perform authorized page retrievals and write D1 rows\n` +
    `  --self-test             Run offline tests only; no network or D1 access\n` +
    `  --provider <slug>       ticketmaster or seatgeek (repeatable; default both)\n` +
    `  --event-id <id>         Target one local catalog event\n` +
    `  --limit <n>             Target at most n catalog events\n` +
    `  --paired-only           For a sample run, target only events with verified pages on both providers\n` +
    `  --delay-ms <n>          Per-domain delay; minimum ${MINIMUM_DELAY_MS}, default ${DEFAULT_DELAY_MS}\n` +
    `  --database <name>       D1 database (default ${DEFAULT_DATABASE})\n` +
    `  --local                 Use local D1 instead of remote D1\n` +
    `  --sqlite <path>         Append to a project-local SQLite log without Wrangler\n` +
    `  --json                  Print machine-readable summary JSON\n` +
    `  -h, --help              Show help\n\n` +
    `Live retrievals require --apply because every attempt must be recorded durably to enforce the written once-per-event-per-24-hours limit. No credentials, cookies, login, checkout, seating-map, or page-content storage is used.`;
}

function parseArgs(argv) {
  const options = {
    apply: false,
    selfTest: false,
    providerSlugs: [],
    eventId: "",
    limit: null,
    pairedOnly: false,
    delayMs: DEFAULT_DELAY_MS,
    database: DEFAULT_DATABASE,
    remote: true,
    sqlitePath: "",
    json: false,
    help: false
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--apply") options.apply = true;
    else if (arg === "--self-test") options.selfTest = true;
    else if (arg === "--paired-only") options.pairedOnly = true;
    else if (arg === "--local") options.remote = false;
    else if (arg === "--json") options.json = true;
    else if (arg === "--help" || arg === "-h") options.help = true;
    else if (arg === "--provider") {
      const value = clean(argv[++i], 80).toLowerCase();
      if (!PROVIDER_BY_SLUG.has(value)) throw new Error(`Unsupported --provider: ${value || "(missing)"}`);
      options.providerSlugs.push(value);
    } else if (arg === "--event-id") {
      options.eventId = clean(argv[++i], 255);
      if (!options.eventId) throw new Error("--event-id requires a local event ID");
    } else if (arg === "--limit") {
      const value = Number.parseInt(argv[++i], 10);
      if (!Number.isFinite(value) || value < 1) throw new Error("--limit must be a positive integer");
      options.limit = value;
    } else if (arg === "--delay-ms") {
      const value = Number.parseInt(argv[++i], 10);
      if (!Number.isFinite(value) || value < MINIMUM_DELAY_MS) {
        throw new Error(`--delay-ms must be at least ${MINIMUM_DELAY_MS}`);
      }
      options.delayMs = value;
    } else if (arg === "--database") {
      options.database = clean(argv[++i], 255);
      if (!options.database) throw new Error("--database requires a name");
    } else if (arg === "--sqlite") {
      const value = clean(argv[++i], 1024);
      if (!value) throw new Error("--sqlite requires a project-relative path");
      const resolved = path.resolve(REPO_ROOT, value);
      if (resolved !== REPO_ROOT && !resolved.startsWith(`${REPO_ROOT}${path.sep}`)) {
        throw new Error("--sqlite must stay inside the project working directory");
      }
      if (resolved === REPO_ROOT) throw new Error("--sqlite must name a file");
      options.sqlitePath = resolved;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }
  options.providerSlugs = [...new Set(options.providerSlugs)];
  return options;
}

function selectedProviders(options) {
  return options.providerSlugs.length
    ? options.providerSlugs.map((slug) => PROVIDER_BY_SLUG.get(slug))
    : PROVIDERS;
}

function localDate(iso, timeZone) {
  const date = new Date(clean(iso, 100));
  if (!Number.isFinite(date.getTime())) return "";
  try {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: timeZone || "UTC", year: "numeric", month: "2-digit", day: "2-digit"
    }).formatToParts(date);
    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    return `${values.year}-${values.month}-${values.day}`;
  } catch {
    return date.toISOString().slice(0, 10);
  }
}

async function readEvents(eventsPath = EVENTS_PATH) {
  const parsed = JSON.parse(await fs.readFile(eventsPath, "utf8"));
  if (!Array.isArray(parsed)) throw new Error("events.json must contain an array");
  return parsed;
}

function selectCatalogTargets(events, options = {}, asOfDate = new Date().toISOString().slice(0, 10)) {
  const providers = selectedProviders(options);
  const targets = [];
  const coverageFailures = [];
  let selectedEventCount = 0;

  for (const event of Array.isArray(events) ? events : []) {
    const eventId = clean(event?.id, 255);
    if (!eventId || (options.eventId && eventId !== options.eventId)) continue;
    const eventDate = localDate(event?.datetime_iso, event?.timezone);
    if (!eventDate || eventDate < asOfDate) continue;

    const providerStates = providers.map((provider) => ({
      provider,
      sourceUrl: provider.eventUrl(event),
      verified: provider.eventVerified(event)
    }));
    const hasAllProviders = providerStates.every((state) => state.sourceUrl && state.verified);
    if (options.pairedOnly && !hasAllProviders) continue;
    if (options.limit && selectedEventCount >= options.limit) break;
    selectedEventCount += 1;

    for (const state of providerStates) {
      if (!state.sourceUrl || !state.verified) {
        coverageFailures.push({
          event_id: eventId,
          artist_slug: clean(event?.artist_slug, 255),
          provider: state.provider.slug,
          reason: state.sourceUrl ? "unverified_provider_page" : "missing_provider_page"
        });
        continue;
      }
      targets.push({ event, eventId, eventDate, provider: state.provider, sourceUrl: state.sourceUrl });
    }
  }
  if (options.eventId && selectedEventCount === 0) {
    coverageFailures.push({ event_id: options.eventId, artist_slug: null, provider: null, reason: "catalog_event_not_found_or_not_current" });
  }
  return { scanned: Array.isArray(events) ? events.length : 0, selectedEventCount, targets, coverageFailures };
}

function sqlLiteral(value) {
  if (value === null || value === undefined || value === "") return "NULL";
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "NULL";
  return `'${String(value).replaceAll("'", "''")}'`;
}

function robotsPatternMatches(pattern, pathAndQuery) {
  const anchored = pattern.endsWith("$");
  const body = anchored ? pattern.slice(0, -1) : pattern;
  const escaped = body.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replaceAll("*", ".*");
  try {
    return new RegExp(`^${escaped}${anchored ? "$" : ""}`).test(pathAndQuery);
  } catch {
    return false;
  }
}

function parseRobotsTxt(value, agent = ROBOTS_AGENT) {
  const groups = [];
  let current = null;
  for (const rawLine of String(value || "").split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) continue;
    const separator = line.indexOf(":");
    if (separator < 0) continue;
    const key = line.slice(0, separator).trim().toLowerCase();
    const setting = line.slice(separator + 1).trim();
    if (key === "user-agent") {
      if (!current || current.rules.length) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(setting.toLowerCase());
    } else if ((key === "allow" || key === "disallow") && current) {
      if (setting || key === "allow") current.rules.push({ type: key, pattern: setting });
    }
  }

  const normalizedAgent = clean(agent, 120).toLowerCase();
  const exact = groups.filter((group) => group.agents.some((candidate) => candidate !== "*" && normalizedAgent.startsWith(candidate)));
  const selected = exact.length ? exact : groups.filter((group) => group.agents.includes("*"));
  const rules = selected.flatMap((group) => group.rules);
  return {
    allows(url) {
      const parsed = new URL(url);
      const pathAndQuery = `${parsed.pathname || "/"}${parsed.search || ""}`;
      const matches = rules
        .filter((rule) => rule.pattern && robotsPatternMatches(rule.pattern, pathAndQuery))
        .sort((a, b) => {
          const lengthDifference = b.pattern.replaceAll("*", "").length - a.pattern.replaceAll("*", "").length;
          if (lengthDifference) return lengthDifference;
          if (a.type === b.type) return 0;
          return a.type === "allow" ? -1 : 1;
        });
      return !matches.length || matches[0].type === "allow";
    }
  };
}

function observationId(row) {
  return `${row.provider}:${row.event_id}:${row.retrieved_at}`;
}

function buildObservation(target, parsed, now = new Date()) {
  const retrievedAt = now.toISOString();
  const usable = parsed?.ok === true && Number.isFinite(Number(parsed.price)) && Number(parsed.price) > 0 && /^[A-Z]{3}$/.test(parsed.currency);
  return {
    id: `${target.provider.providerDbKey}:${target.eventId}`,
    event_id: target.eventId,
    artist_slug: clean(target.event?.artist_slug, 255),
    event: clean(target.event?.event_name || target.event?.tour_name || target.event?.artist_name, 300),
    venue: clean(target.event?.venue, 300),
    date: target.eventDate,
    provider: target.provider.providerDbKey,
    source: target.provider.pagePriceSource,
    source_url: target.sourceUrl,
    low_price: usable ? Number(parsed.price) : null,
    currency: usable ? parsed.currency : null,
    retrieved_at: retrievedAt,
    verified_at: retrievedAt,
    expires_at: usable
      ? new Date(now.getTime() + target.provider.freshnessHours * 60 * 60 * 1000).toISOString()
      : retrievedAt,
    unavailable_reason: usable ? null : clean(parsed?.reason || "pricing_unavailable", 120),
    evidence: usable ? parsed.evidence || [] : []
  };
}

function buildObservationSql(row) {
  const retrieval = `UPDATE provider_page_retrievals SET\n  low_price = ${sqlLiteral(row.low_price)},\n  currency = ${sqlLiteral(row.currency)},\n  source = ${sqlLiteral(row.source)},\n  source_url = ${sqlLiteral(row.source_url)}\nWHERE id = ${sqlLiteral(observationId(row))};`;

  const history = row.low_price === null ? "" : `INSERT OR IGNORE INTO provider_pricing_history (id, event_id, artist_slug, provider, low_price, currency, inventory_count, source, source_url, observed_at, created_at)\nVALUES (${[
    observationId(row), row.event_id, row.artist_slug, row.provider, row.low_price, row.currency,
    null, row.source, row.source_url, row.retrieved_at
  ].map(sqlLiteral).join(", ")}, CURRENT_TIMESTAMP);`;

  const cache = `INSERT INTO provider_pricing_cache (id, artist_slug, event_id, provider, low_price, avg_price, high_price, currency, inventory_count, verified_at, expires_at, source, source_url, updated_at)\nVALUES (${[
    row.id, row.artist_slug, row.event_id, row.provider, row.low_price, null, null, row.currency,
    null, row.verified_at, row.expires_at, row.source, row.source_url
  ].map(sqlLiteral).join(", ")}, CURRENT_TIMESTAMP)\nON CONFLICT(event_id, provider) DO UPDATE SET\n  artist_slug = excluded.artist_slug,\n  low_price = excluded.low_price,\n  avg_price = NULL,\n  high_price = NULL,\n  currency = excluded.currency,\n  inventory_count = NULL,\n  verified_at = excluded.verified_at,\n  expires_at = excluded.expires_at,\n  source = excluded.source,\n  source_url = excluded.source_url,\n  updated_at = CURRENT_TIMESTAMP;`;
  return [retrieval, history, cache].filter(Boolean).join("\n");
}

function buildReservationSql(row) {
  const rowId = observationId(row);
  const values = [
    rowId, row.event_id, row.artist_slug, row.provider, null, null,
    row.source, row.source_url, row.retrieved_at
  ].map(sqlLiteral).join(", ");
  const recentWhere = [
    `event_id = ${sqlLiteral(row.event_id)}`,
    `provider = ${sqlLiteral(row.provider)}`,
    `julianday(retrieved_at) > julianday(${sqlLiteral(row.retrieved_at)}, '-24 hours')`
  ].join(" AND ");
  const cacheValues = [
    row.id, row.artist_slug, row.event_id, row.provider, null, null, null, null,
    null, row.retrieved_at, row.retrieved_at, row.source, row.source_url
  ].map(sqlLiteral).join(", ");
  return `INSERT INTO provider_page_retrievals (id, event_id, artist_slug, provider, low_price, currency, source, source_url, retrieved_at, created_at)\n` +
    `SELECT ${values}, CURRENT_TIMESTAMP\n` +
    `WHERE NOT EXISTS (SELECT 1 FROM provider_page_retrievals WHERE ${recentWhere});\n` +
    `INSERT INTO provider_pricing_cache (id, artist_slug, event_id, provider, low_price, avg_price, high_price, currency, inventory_count, verified_at, expires_at, source, source_url, updated_at)\n` +
    `SELECT ${cacheValues}, CURRENT_TIMESTAMP WHERE EXISTS (SELECT 1 FROM provider_page_retrievals WHERE id = ${sqlLiteral(rowId)})\n` +
    `ON CONFLICT(event_id, provider) DO UPDATE SET\n` +
    `  artist_slug = excluded.artist_slug, low_price = NULL, avg_price = NULL, high_price = NULL,\n` +
    `  currency = NULL, inventory_count = NULL, verified_at = excluded.verified_at,\n` +
    `  expires_at = excluded.expires_at, source = excluded.source, source_url = excluded.source_url,\n` +
    `  updated_at = CURRENT_TIMESTAMP;\n` +
    `SELECT EXISTS(SELECT 1 FROM provider_page_retrievals WHERE id = ${sqlLiteral(rowId)}) AS reserved;`;
}

function buildWriteSql(rows) {
  return [
    "-- Authorized Ticketmaster/SeatGeek lowest-price event-page observations.",
    "-- No page content, customer data, seating-map data, higher price tiers, fees, or inventory are stored.",
    ...rows.map(buildObservationSql),
    ""
  ].join("\n");
}

function wranglerArgs(options, extra) {
  return ["wrangler", "d1", "execute", options.database, options.remote ? "--remote" : "--local", ...extra];
}

function parseWranglerRows(stdout) {
  const parsed = JSON.parse(stdout);
  const roots = Array.isArray(parsed) ? parsed : [parsed];
  return roots.flatMap((root) => Array.isArray(root?.results) ? root.results : []);
}

async function runSqlite(sqlitePath, sql, { json = false } = {}) {
  const args = ["-bail"];
  if (json) args.push("-json");
  args.push(sqlitePath, sql);
  const result = await execFileAsync("sqlite3", args, {
    cwd: REPO_ROOT,
    maxBuffer: 10 * 1024 * 1024
  });
  if (!json || !String(result.stdout || "").trim()) return [];
  const parsed = JSON.parse(result.stdout);
  return Array.isArray(parsed) ? parsed : [];
}

async function ensureSqliteStorage(options) {
  const sqlitePath = options.sqlitePath;
  if (!sqlitePath || INITIALIZED_SQLITE_PATHS.has(sqlitePath)) return;
  await fs.mkdir(path.dirname(sqlitePath), { recursive: true });
  let exists = true;
  try {
    await fs.access(sqlitePath);
  } catch {
    exists = false;
  }
  if (!exists) {
    const [bootstrap, authorized] = await Promise.all([
      fs.readFile(path.join(REPO_ROOT, "migrations", "0007_bootstrap_provider_pricing_schema.sql"), "utf8"),
      fs.readFile(path.join(REPO_ROOT, "migrations", "0008_authorized_event_page_pricing.sql"), "utf8")
    ]);
    await runSqlite(sqlitePath, `BEGIN IMMEDIATE;\n${bootstrap}\n${authorized}\nCOMMIT;`);
  }
  try {
    await runSqlite(
      sqlitePath,
      "SELECT source_url FROM provider_pricing_cache LIMIT 0; " +
        "SELECT source_url FROM provider_pricing_history LIMIT 0; " +
        "SELECT retrieved_at FROM provider_page_retrievals LIMIT 0;"
    );
  } catch (error) {
    throw new Error(`Local SQLite log is missing migration 0008 schema: ${error.message}`);
  }
  INITIALIZED_SQLITE_PATHS.add(sqlitePath);
}

async function queryRows(options, query) {
  if (options.sqlitePath) {
    await ensureSqliteStorage(options);
    return runSqlite(options.sqlitePath, query, { json: true });
  }
  const result = await execFileAsync("npx", wranglerArgs(options, ["--json", "--command", query]), {
    cwd: REPO_ROOT,
    maxBuffer: 10 * 1024 * 1024
  });
  return parseWranglerRows(result.stdout);
}

async function loadDurableRetrievalState(options) {
  const query = `SELECT event_id, provider, MAX(retrieved_at) AS retrieved_at FROM provider_page_retrievals GROUP BY event_id, provider;`;
  const state = new Map();
  for (const row of await queryRows(options, query)) {
    state.set(`${clean(row?.event_id, 255)}:${clean(row?.provider, 80)}`, clean(row?.retrieved_at, 80));
  }
  return state;
}

async function loadFreshSeatGeekApiRows(options, now = new Date()) {
  const query = `SELECT event_id, low_price, currency, verified_at, expires_at FROM provider_pricing_cache WHERE provider = 'seatgeek' AND source = 'seatgeek_partner_api';`;
  const fresh = new Set();
  for (const row of await queryRows(options, query)) {
    if (Number.isFinite(Number(row?.low_price)) && Number(row.low_price) > 0 &&
        /^[A-Z]{3}$/.test(clean(row?.currency, 8).toUpperCase()) &&
        Date.parse(row?.expires_at) > now.getTime()) {
      fresh.add(clean(row?.event_id, 255));
    }
  }
  return fresh;
}

async function writeObservations(rows, options) {
  if (!rows.length) return { written: 0 };
  if (options.sqlitePath) {
    await ensureSqliteStorage(options);
    await runSqlite(options.sqlitePath, buildWriteSql(rows));
    return { written: rows.length };
  }
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "authorized-page-prices-"));
  const sqlPath = path.join(tempDir, "authorized-page-prices.sql");
  try {
    await fs.writeFile(sqlPath, buildWriteSql(rows), "utf8");
    await execFileAsync("npx", wranglerArgs(options, ["--file", sqlPath]), {
      cwd: REPO_ROOT,
      maxBuffer: 10 * 1024 * 1024
    });
    return { written: rows.length };
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

async function reserveRetrieval(row, options) {
  if (options.sqlitePath) {
    await ensureSqliteStorage(options);
    const rows = await runSqlite(options.sqlitePath, buildReservationSql(row), { json: true });
    return rows.some((item) => Number(item?.reserved) === 1);
  }
  const result = await execFileAsync("npx", wranglerArgs(options, ["--json", "--command", buildReservationSql(row)]), {
    cwd: REPO_ROOT,
    maxBuffer: 10 * 1024 * 1024
  });
  const rows = parseWranglerRows(result.stdout);
  return rows.some((item) => Number(item?.reserved) === 1);
}

function retrievedWithinWindow(target, retrievalState, now = new Date()) {
  const value = retrievalState.get(`${target.eventId}:${target.provider.providerDbKey}`);
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return false;
  return now.getTime() - timestamp < target.provider.minimumRetrievalIntervalHours * 60 * 60 * 1000;
}

function createPacer(delayMs, sleeper = (ms) => new Promise((resolve) => setTimeout(resolve, ms)), clock = () => Date.now()) {
  const lastByDomain = new Map();
  return async (url) => {
    const domain = new URL(url).hostname.toLowerCase();
    const last = lastByDomain.get(domain) || 0;
    const wait = Math.max(0, delayMs - (clock() - last));
    if (wait > 0) await sleeper(wait);
    lastByDomain.set(domain, clock());
  };
}

async function loadRobotsPolicy(target, options, deps, pacer) {
  const origin = new URL(target.sourceUrl).origin;
  const robotsUrl = new URL("/robots.txt", origin).toString();
  const fetchImpl = deps.fetchImpl || globalThis.fetch;
  let lastReason = "robots_unavailable";
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    await pacer(robotsUrl);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetchImpl(robotsUrl, {
        method: "GET",
        redirect: "follow",
        credentials: "omit",
        signal: controller.signal,
        headers: { Accept: "text/plain,*/*;q=0.1", "User-Agent": USER_AGENT }
      });
      const finalUrl = clean(response.url || robotsUrl, 2048);
      const contentLength = Number(response.headers?.get?.("content-length") || 0);
      if (contentLength > MAX_ROBOTS_BYTES) throw new ProviderStopError(target.provider.slug, "robots_too_large", target.eventId);
      const body = String(await response.text()).slice(0, MAX_ROBOTS_BYTES);
      const barrier = target.provider.detectAccessBarrier({ status: response.status, html: body, finalUrl });
      if (barrier) throw new ProviderStopError(target.provider.slug, barrier, target.eventId);
      const finalHost = new URL(finalUrl).hostname.toLowerCase();
      const sourceHost = new URL(target.sourceUrl).hostname.toLowerCase();
      if (finalHost !== sourceHost && finalHost !== `www.${sourceHost}` && `www.${finalHost}` !== sourceHost) {
        throw new ProviderStopError(target.provider.slug, "robots_cross_domain_redirect", target.eventId);
      }
      if (response.status === 404 || response.status === 410) return parseRobotsTxt("");
      if (response.ok) return parseRobotsTxt(body);
      lastReason = `robots_http_${response.status}`;
      if (!(response.status === 408 || response.status === 425 || response.status >= 500) || attempt === MAX_ATTEMPTS) {
        throw new ProviderStopError(target.provider.slug, lastReason, target.eventId);
      }
    } catch (error) {
      if (error instanceof ProviderStopError) throw error;
      lastReason = error?.name === "AbortError" ? "robots_timeout" : "robots_network_error";
      if (attempt === MAX_ATTEMPTS) throw new ProviderStopError(target.provider.slug, lastReason, target.eventId);
    } finally {
      clearTimeout(timeout);
    }
    await (deps.sleeper || ((ms) => new Promise((resolve) => setTimeout(resolve, ms))))(Math.min(1000 * 2 ** (attempt - 1), 8000));
  }
  throw new ProviderStopError(target.provider.slug, lastReason, target.eventId);
}

async function robotsAllowsTarget(target, options, deps, pacer, policies) {
  const origin = new URL(target.sourceUrl).origin;
  if (!policies.has(origin)) {
    const loader = deps.robotsLoader || loadRobotsPolicy;
    policies.set(origin, await loader(target, options, deps, pacer));
  }
  return policies.get(origin).allows(target.sourceUrl);
}

async function fetchPageWithRetry(target, options, deps = {}) {
  const fetchImpl = deps.fetchImpl || globalThis.fetch;
  const pacer = deps.pacer || createPacer(options.delayMs, deps.sleeper, deps.clock);
  let last = { ok: false, reason: "request_failed", status: 0 };
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    await pacer(target.sourceUrl);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetchImpl(target.sourceUrl, {
        method: "GET",
        redirect: "follow",
        credentials: "omit",
        signal: controller.signal,
        headers: {
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "en-GB,en;q=0.8",
          "Cache-Control": "no-cache",
          "User-Agent": USER_AGENT
        }
      });
      const finalUrl = clean(response.url || target.sourceUrl, 2048);
      const contentLength = Number(response.headers?.get?.("content-length") || 0);
      if (contentLength > 5 * 1024 * 1024) return { ok: false, reason: "page_too_large", status: response.status };
      const html = String(await response.text()).slice(0, 5 * 1024 * 1024);
      const barrier = target.provider.detectAccessBarrier({ status: response.status, html, finalUrl });
      if (barrier) throw new ProviderStopError(target.provider.slug, barrier, target.eventId);
      if (!target.provider.validateEventLink(target.event, finalUrl)) {
        return { ok: false, reason: "redirected_to_unrelated_page", status: response.status };
      }
      if (response.ok) {
        return target.provider.parseLowestPagePrice(html, { sourceUrl: target.sourceUrl });
      }
      last = { ok: false, reason: `http_${response.status}`, status: response.status };
      if (!(response.status === 408 || response.status === 425 || response.status >= 500) || attempt === MAX_ATTEMPTS) {
        return last;
      }
    } catch (error) {
      if (error instanceof ProviderStopError) throw error;
      last = { ok: false, reason: error?.name === "AbortError" ? "timeout" : "network_error", status: 0 };
      if (attempt === MAX_ATTEMPTS) return last;
    } finally {
      clearTimeout(timeout);
    }
    await (deps.sleeper || ((ms) => new Promise((resolve) => setTimeout(resolve, ms))))(Math.min(1000 * 2 ** (attempt - 1), 8000));
  }
  return last;
}

function publicObservation(row) {
  return {
    event_id: row.event_id,
    event: row.event || null,
    venue: row.venue || null,
    date: row.date || null,
    source: row.provider,
    lowest_price: row.low_price,
    currency: row.currency,
    last_updated: row.retrieved_at,
    source_url: row.source_url,
    status: row.low_price === null ? "pricing unavailable" : "ok",
    unavailable_reason: row.unavailable_reason
  };
}

async function run(options, deps = {}) {
  const now = deps.now || new Date();
  const events = deps.events || await readEvents(deps.eventsPath || EVENTS_PATH);
  const selection = selectCatalogTargets(events, options, deps.asOfDate || now.toISOString().slice(0, 10));
  const summary = {
    mode: options.apply ? "apply" : "preview",
    scanned: selection.scanned,
    selected_events: selection.selectedEventCount,
    eligible_rows: selection.targets.length,
    coverage_failures: selection.coverageFailures,
    fetched: 0,
    usable: 0,
    unavailable: 0,
    skipped_24h: 0,
    api_satisfied: 0,
    written: 0,
    failed: 0,
    stopped: false,
    stop_reason: null,
    rows: [],
    failures: []
  };
  if (options.sqlitePath) summary.log_file = path.relative(REPO_ROOT, options.sqlitePath);

  if (!options.apply) return summary;
  if (selection.coverageFailures.length && !options.pairedOnly) {
    summary.stopped = true;
    summary.stop_reason = "catalog_provider_page_missing";
    return summary;
  }

  const retrievalState = deps.retrievalState || await loadDurableRetrievalState(options);
  const freshSeatGeekApiRows = deps.freshSeatGeekApiRows || await loadFreshSeatGeekApiRows(options, now);
  const pacer = deps.pacer || createPacer(options.delayMs, deps.sleeper, deps.clock);
  const robotsPolicies = deps.robotsPolicies || new Map();

  for (const target of selection.targets) {
    if (retrievedWithinWindow(target, retrievalState, now)) {
      summary.skipped_24h += 1;
      continue;
    }
    if (target.provider.slug === "seatgeek" && freshSeatGeekApiRows.has(target.eventId)) {
      summary.api_satisfied += 1;
      continue;
    }
    try {
      if (!await robotsAllowsTarget(target, options, deps, pacer, robotsPolicies)) {
        throw new ProviderStopError(target.provider.slug, "robots_disallow", target.eventId);
      }
    } catch (error) {
      if (!(error instanceof ProviderStopError)) throw error;
      summary.stopped = true;
      summary.stop_reason = error.reason;
      summary.failures.push({ event_id: target.eventId, provider: target.provider.slug, reason: error.reason });
      break;
    }
    const attemptTime = deps.now || new Date();
    const pending = buildObservation(target, { ok: false, reason: "retrieval_pending" }, attemptTime);
    const reserved = await (deps.reserver || reserveRetrieval)(pending, options);
    if (!reserved) {
      summary.skipped_24h += 1;
      continue;
    }
    try {
      const parsed = await fetchPageWithRetry(target, options, { ...deps, pacer });
      summary.fetched += 1;
      const row = buildObservation(target, parsed, attemptTime);
      const result = await (deps.writer || writeObservations)([row], options);
      summary.written += result?.written || 0;
      summary.rows.push(publicObservation(row));
      if (row.low_price === null) summary.unavailable += 1;
      else summary.usable += 1;
    } catch (error) {
      if (!(error instanceof ProviderStopError)) throw error;
      summary.fetched += 1;
      const row = buildObservation(target, { ok: false, reason: error.reason }, attemptTime);
      const result = await (deps.writer || writeObservations)([row], options);
      summary.written += result?.written || 0;
      summary.rows.push(publicObservation(row));
      summary.unavailable += 1;
      summary.stopped = true;
      summary.stop_reason = error.reason;
      summary.failures.push({ event_id: target.eventId, provider: target.provider.slug, reason: error.reason });
      break;
    }
  }
  summary.failed += summary.failures.length;
  return summary;
}

async function selfTest() {
  let checks = 0;
  const check = (fn, ...args) => { fn(...args); checks += 1; };
  const event = {
    id: "show-1",
    artist_slug: "artist-one",
    artist_name: "Artist One",
    event_name: "Artist One Live",
    venue: "Arena",
    datetime_iso: "2026-08-01T19:00:00Z",
    timezone: "Europe/London",
    verification_status: "human_verified",
    ticketmaster_url: "https://www.ticketmaster.com/artist-one-live/event/1234ABCD",
    seatgeek_url: "https://seatgeek.com/artist-one-tickets/london/concert/12345678",
    provider_links: { ticketmaster: { verified: true }, seatgeek: { verified: true } }
  };
  const options = { ...parseArgs([]), apply: true, pairedOnly: true, delayMs: MINIMUM_DELAY_MS };
  const sqliteOptions = parseArgs(["--sqlite", ".local/authorized-page-prices.sqlite"]);
  check(assert.equal, sqliteOptions.sqlitePath, path.join(REPO_ROOT, ".local", "authorized-page-prices.sqlite"));
  check(assert.throws, () => parseArgs(["--sqlite", "../outside.sqlite"]), /inside the project/);
  const selected = selectCatalogTargets([event, { ...event, id: "past", datetime_iso: "2026-01-01T00:00:00Z" }], options, "2026-07-13");
  check(assert.equal, selected.selectedEventCount, 1);
  check(assert.equal, selected.targets.length, 2);
  check(assert.equal, selected.coverageFailures.length, 0);

  const tmHtml = `<script type="application/ld+json">${JSON.stringify({ "@type": "MusicEvent", url: event.ticketmaster_url, offers: { lowPrice: 42.5, priceCurrency: "GBP" } })}</script>`;
  const tmParsed = ticketmasterProvider.parseLowestPagePrice(tmHtml, { sourceUrl: event.ticketmaster_url });
  check(assert.equal, tmParsed.ok, true);
  check(assert.equal, tmParsed.price, 42.5);
  check(assert.equal, tmParsed.currency, "GBP");
  const tmWithRecommendation = `<script type="application/ld+json">${JSON.stringify([
    { "@type": "MusicEvent", url: event.ticketmaster_url, offers: { lowPrice: 60, priceCurrency: "GBP" } },
    { "@type": "MusicEvent", url: "https://www.ticketmaster.com/other/event/OTHER", offers: { lowPrice: 1, priceCurrency: "GBP" } }
  ])}</script>`;
  check(assert.equal, ticketmasterProvider.parseLowestPagePrice(tmWithRecommendation, { sourceUrl: event.ticketmaster_url }).price, 60);
  check(assert.equal, ticketmasterProvider.validateEventLink(event, "https://www.ticketmaster.com/canonical-new-slug/event/1234ABCD?brand=tm"), true);

  const sgHtml = `<script id="__NEXT_DATA__" type="application/json">${JSON.stringify({ event: { id: 12345678, lowest_price: 55, currency: "USD" }, recommendations: [{ id: 99, lowest_price: 1, currency: "USD" }] })}</script>`;
  const sgParsed = seatgeekProvider.parseLowestPagePrice(sgHtml, { sourceUrl: event.seatgeek_url });
  check(assert.equal, sgParsed.ok, true);
  check(assert.equal, sgParsed.price, 55);
  check(assert.equal, sgParsed.currency, "USD");
  check(assert.equal, seatgeekProvider.parseLowestPagePrice("<main>Tickets from $50 or Tickets from $70</main>", { sourceUrl: event.seatgeek_url }).ok, false);
  check(assert.equal, seatgeekProvider.parseLowestPagePrice("<main>Tickets from $1,299.50</main>", { sourceUrl: event.seatgeek_url }).price, 1299.5);
  const anonymousRecommendation = `<script id="__NEXT_DATA__" type="application/json">${JSON.stringify({ event: { id: 12345678, lowest_price: 55, currency: "USD", recommendations: [{ lowest_price: 1, currency: "USD" }] } })}</script>`;
  check(assert.equal, seatgeekProvider.parseLowestPagePrice(anonymousRecommendation, { sourceUrl: event.seatgeek_url }).price, 55);
  check(assert.equal, ticketmasterProvider.detectAccessBarrier({ html: "<h1>Verify you are human</h1>" }), "captcha");
  check(assert.equal, seatgeekProvider.detectAccessBarrier({ status: 429 }), "http_429_rate_limit");
  const robots = parseRobotsTxt("User-agent: *\nDisallow: /search\nDisallow: /event/private\nAllow: /event/private/public$");
  check(assert.equal, robots.allows("https://www.ticketmaster.com/event/1234ABCD"), true);
  check(assert.equal, robots.allows("https://www.ticketmaster.com/event/private/123"), false);
  check(assert.equal, robots.allows("https://www.ticketmaster.com/event/private/public"), true);

  const now = new Date("2026-07-13T12:00:00Z");
  const target = selected.targets[0];
  const goodRow = buildObservation(target, tmParsed, now);
  check(assert.equal, goodRow.low_price, 42.5);
  check(assert.equal, goodRow.source_url, event.ticketmaster_url);
  const unavailableRow = buildObservation(target, { ok: false, reason: "pricing_unavailable" }, now);
  check(assert.equal, unavailableRow.low_price, null);
  check(assert.equal, unavailableRow.expires_at, unavailableRow.retrieved_at);
  const sql = buildWriteSql([goodRow, unavailableRow]);
  check(assert.match, sql, /provider_page_retrievals/);
  check(assert.match, sql, /source_url/);
  check(assert.doesNotMatch, sql, /avg_price[^\n]*42\.5|high_price[^\n]*42\.5|inventory_count[^\n]*42\.5/);
  const reservationSql = buildReservationSql(goodRow);
  check(assert.match, reservationSql, /julianday\(retrieved_at\).*'-24 hours'/);
  check(assert.match, reservationSql, /SELECT EXISTS/);
  check(assert.match, reservationSql, /low_price = NULL/);

  const state = new Map([["show-1:ticketmaster", "2026-07-12T13:00:00Z"]]);
  check(assert.equal, retrievedWithinWindow(target, state, now), true);
  state.set("show-1:ticketmaster", "2026-07-12T11:59:59Z");
  check(assert.equal, retrievedWithinWindow(target, state, now), false);

  let requests = 0;
  const responses = [
    { status: 503, ok: false, url: event.ticketmaster_url, text: async () => "temporarily unavailable", headers: { get: () => "" } },
    { status: 200, ok: true, url: event.ticketmaster_url, text: async () => tmHtml, headers: { get: () => "" } }
  ];
  const fetched = await fetchPageWithRetry(target, options, {
    fetchImpl: async () => { requests += 1; return responses.shift(); },
    pacer: async () => {},
    sleeper: async () => {}
  });
  check(assert.equal, fetched.ok, true);
  check(assert.equal, requests, 2);

  let blockedRequests = 0;
  await assert.rejects(fetchPageWithRetry(target, options, {
    fetchImpl: async () => {
      blockedRequests += 1;
      return { status: 403, ok: false, url: event.ticketmaster_url, text: async () => "Access denied", headers: { get: () => "" } };
    },
    pacer: async () => {},
    sleeper: async () => {}
  }), ProviderStopError);
  checks += 1;
  check(assert.equal, blockedRequests, 1);

  let writes = 0;
  const runSummary = await run(options, {
    events: [event],
    asOfDate: "2026-07-13",
    now,
    retrievalState: new Map(),
    freshSeatGeekApiRows: new Set(),
    robotsLoader: async () => parseRobotsTxt("User-agent: *\nAllow: /"),
    reserver: async () => true,
    pacer: async () => {},
    sleeper: async () => {},
    fetchImpl: async (url) => ({
      status: 200, ok: true, url,
      text: async () => url.includes("ticketmaster") ? tmHtml : sgHtml,
      headers: { get: () => "" }
    }),
    async writer(rows) { writes += 1; return { written: rows.length }; }
  });
  check(assert.equal, runSummary.fetched, 2);
  check(assert.equal, runSummary.usable, 2);
  check(assert.equal, runSummary.written, 2);
  check(assert.equal, writes, 2);
  check(assert.equal, runSummary.rows.every((row) => row.event_id === "show-1"), true);
  const missingSelection = selectCatalogTargets([event], { ...options, eventId: "outside-catalog" }, "2026-07-13");
  check(assert.equal, missingSelection.targets.length, 0);
  check(assert.equal, missingSelection.coverageFailures[0].reason, "catalog_event_not_found_or_not_current");
  return { ok: true, checks };
}

function printSummary(summary) {
  console.log(`Authorized event-page price snapshot ${summary.mode} summary:`);
  for (const key of ["scanned", "selected_events", "eligible_rows", "fetched", "usable", "unavailable", "skipped_24h", "api_satisfied", "written", "failed"]) {
    console.log(`- ${key.replaceAll("_", " ")}: ${summary[key]}`);
  }
  console.log(`- coverage failures: ${summary.coverage_failures.length}`);
  if (summary.stopped) console.log(`- STOPPED: ${summary.stop_reason}`);
  for (const failure of summary.coverage_failures.slice(0, 20)) console.log(`COVERAGE ${JSON.stringify(failure)}`);
  for (const row of summary.rows) console.log(`ROW ${JSON.stringify(row)}`);
  for (const failure of summary.failures) console.log(`FAILED ${JSON.stringify(failure)}`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) return console.log(usage());
  if (options.selfTest) {
    const result = await selfTest();
    console.log(`Authorized page-price self-test passed (${result.checks} checks).`);
    return;
  }
  const summary = await run(options);
  if (options.json) console.log(JSON.stringify(summary, null, 2));
  else printSummary(summary);
  if (summary.stopped || summary.failed > 0 || (options.apply && summary.eligible_rows > 0 && summary.written === 0)) {
    process.exitCode = 1;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error?.stack || error?.message || error);
    process.exitCode = 1;
  });
}

export {
  ProviderStopError,
  buildObservation,
  buildReservationSql,
  buildWriteSql,
  createPacer,
  fetchPageWithRetry,
  parseRobotsTxt,
  retrievedWithinWindow,
  run,
  selectCatalogTargets
};
