#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  CATALOG_PROXY_REJECTION_HINT,
  PROVIDERS,
  catalogArtistKeyword,
  catalogItems,
  catalogItemsUrl,
  catalogProxyHeaders,
  clean,
  impactCredentials,
  isCatalogProxyRejection,
  normalizeProviderUrl,
  productCandidates,
  providerConfig
} from "./lib/impact-marketplace-providers.mjs";
// Shared venue-local date/instant resolution — the same rules the SeatGeek and
// Vivid Seats matchers use, so a given event resolves to one night everywhere.
import {
  eventInstantMs as eventInstant,
  eventLocalDateParts as eventLocalDate,
  eventTimeZone
} from "./lib/event-local-date.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EVENTS_PATH = path.join(ROOT, "public", "data", "events.json");
const ARTISTS_PATH = path.join(ROOT, "public", "data", "artists.json");
const REGISTRY_PATH = path.join(ROOT, "data", "provider-identities.json");
const PAGE_SIZE = 100;
// 20 pages × 100 items: the largest artist catalogs exceed 500 items, and a
// truncated catalog can neither add nor clear a link (it reports "not checked").
const MAX_PAGES = 20;
const DEFAULT_DELAY_MS = 1000;
// Large catalog queries routinely took longer than 30 s through the proxy; a
// page that still times out is retried once before the catalog is incomplete.
const REQUEST_TIMEOUT_MS = 60000;
const RETRY_DELAY_MS = 5000;
const PAST_GRACE_MS = 24 * 60 * 60 * 1000;

function usage() {
  return `Usage: node scripts/sync-impact-marketplace-events.mjs --provider <${Object.keys(PROVIDERS).join("|")}> [options]

Dry-run is the default. This script never invents a provider URL: it writes only
one unambiguous Impact Catalogs match whose artist, venue, city and
venue-local date all agree with an existing event.

Options:
  --provider <slug>       Required provider
  --artist <slug>         Limit to one registry-verified artist
  --limit <n>             Limit selected events
  --max-api-calls <n>     Stop safely after n catalog requests
  --delay-ms <n>          Delay between Impact calls (default: ${DEFAULT_DELAY_MS})
  --max-runtime-minutes <n>
                          Stop safely once the run has lasted n minutes; the
                          remaining catalogs are logged as not checked
  --rotation-key <n>      Which artist the run starts from (default: UTC day
                          number), so a capped run reaches every artist in turn
  --priority-artists <slugs>
                          Comma-separated artists checked before the rotation
                          (the show-priority list's coverage gaps for this
                          provider; scripts/report-show-priority.mjs)
  --apply                 Write public/data/events.json
                          (every completed run, dry or applied, rewrites
                          reports/provider-sync/<provider>-event-sync.md)
  --json                  Emit JSON summary
  --self-test             Run offline tests
`;
}

function parseArgs(argv) {
  const options = { provider: "", artist: "", limit: null, maxApiCalls: null, delayMs: DEFAULT_DELAY_MS, retryDelayMs: RETRY_DELAY_MS, deadline: null, rotationKey: null, priorityArtists: [], apply: false, json: false, selfTest: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--apply") options.apply = true;
    else if (arg === "--json") options.json = true;
    else if (arg === "--self-test") options.selfTest = true;
    else if (arg === "-h" || arg === "--help") options.help = true;
    else if (arg === "--priority-artists") {
      // May be empty (no list today); that means the plain rotation.
      const value = argv[++i] ?? "";
      options.priorityArtists = value.split(/[\s,]+/).map((slug) => clean(slug, 120).toLowerCase()).filter(Boolean);
    } else if (["--provider", "--artist", "--limit", "--max-api-calls", "--delay-ms", "--max-runtime-minutes", "--rotation-key"].includes(arg)) {
      const value = argv[++i];
      if (value == null || value.startsWith("--")) throw new Error(`${arg} requires a value`);
      if (arg === "--provider") options.provider = clean(value, 80).toLowerCase();
      else if (arg === "--artist") options.artist = clean(value, 120).toLowerCase();
      else {
        const number = Number.parseInt(value, 10);
        if (!Number.isInteger(number) || number < (["--delay-ms", "--rotation-key"].includes(arg) ? 0 : 1)) throw new Error(`${arg} has an invalid value`);
        if (arg === "--limit") options.limit = number;
        if (arg === "--max-api-calls") options.maxApiCalls = number;
        if (arg === "--delay-ms") options.delayMs = number;
        if (arg === "--max-runtime-minutes") options.deadline = Date.now() + number * 60 * 1000;
        if (arg === "--rotation-key") options.rotationKey = number;
      }
    } else throw new Error(`Unknown option: ${arg}`);
  }
  return options;
}

function normalizeText(value) {
  return clean(value, 2000).toLowerCase().normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "").replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}

function containsNormalized(haystack, needle) {
  const h = ` ${normalizeText(haystack)} `;
  const n = normalizeText(needle);
  return Boolean(n) && h.includes(` ${n} `);
}

function diceSimilarity(a, b) {
  const left = new Set(normalizeText(a).split(" ").filter((part) => part.length > 1));
  const right = new Set(normalizeText(b).split(" ").filter((part) => part.length > 1));
  if (!left.size || !right.size) return 0;
  let overlap = 0;
  for (const value of left) if (right.has(value)) overlap += 1;
  return (2 * overlap) / (left.size + right.size);
}

const METROS = new Map([
  ["inglewood", ["los angeles"]], ["los angeles", ["inglewood"]],
  ["east rutherford", ["new york"]], ["new york", ["east rutherford"]],
  ["arlington", ["dallas"]], ["dallas", ["arlington"]],
  ["glendale", ["phoenix"]], ["phoenix", ["glendale"]],
  ["santa clara", ["san francisco"]], ["san francisco", ["santa clara"]],
  ["miami gardens", ["miami"]], ["miami", ["miami gardens"]],
  ["foxborough", ["boston"]], ["boston", ["foxborough"]],
  ["landover", ["washington"]], ["washington", ["landover"]]
]);

function cityMatches(text, city) {
  if (containsNormalized(text, city)) return true;
  return (METROS.get(normalizeText(city)) || []).some((alias) => containsNormalized(text, alias));
}

function venueMatches(text, venue) {
  return containsNormalized(text, venue) || diceSimilarity(text, venue) >= 0.35;
}

function dateMatches(text, date) {
  if (!date) return false;
  const normalized = ` ${normalizeText(String(text || "").replace(/(\d)T(?=\d)/gi, "$1 "))} `;
  const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
  const short = monthNames[date.month - 1].slice(0, 3);
  const full = monthNames[date.month - 1];
  const signatures = [
    `${date.month} ${date.day} ${date.year}`, `${String(date.month).padStart(2, "0")} ${String(date.day).padStart(2, "0")} ${date.year}`,
    `${date.day} ${date.month} ${date.year}`, `${String(date.day).padStart(2, "0")} ${String(date.month).padStart(2, "0")} ${date.year}`,
    `${date.year} ${date.month} ${date.day}`, `${date.year} ${String(date.month).padStart(2, "0")} ${String(date.day).padStart(2, "0")}`,
    `${full} ${date.day} ${date.year}`, `${short} ${date.day} ${date.year}`, `${date.day} ${full} ${date.year}`, `${date.day} ${short} ${date.year}`
  ];
  return signatures.some((signature) => normalized.includes(` ${normalizeText(signature)} `));
}

// The performance dates a provider URL states unambiguously in its own path:
// a month-name date ("Fri-Mar-5-2027", "5-March-2027") or an ISO date
// ("2027-03-05"). Numeric day/month forms are usable when one part exceeds
// 12 ("10-26-2026" or "26-10-2026"). Ambiguous forms ("7-10-2026") are
// skipped: their order differs between storefronts.
const URL_MONTHS = ["jan(?:uary)?", "feb(?:ruary)?", "mar(?:ch)?", "apr(?:il)?", "may", "june?", "july?", "aug(?:ust)?", "sep(?:t(?:ember)?)?", "oct(?:ober)?", "nov(?:ember)?", "dec(?:ember)?"];
const URL_MONTH_RE = new RegExp(`(?:^|[^a-z])(${URL_MONTHS.join("|")})[-_ ](\\d{1,2})[-_ ](\\d{4})(?!\\d)`, "gi");
const URL_DAY_MONTH_RE = new RegExp(`(?:^|[^0-9])(\\d{1,2})[-_ ](${URL_MONTHS.join("|")})[-_ ](\\d{4})(?!\\d)`, "gi");
const URL_ISO_RE = /(?:^|[^0-9])(\d{4})-(\d{2})-(\d{2})(?!\d)/g;
const URL_NUMERIC_RE = /(?:^|[^0-9])(\d{1,2})-(\d{1,2})-(20\d{2})(?!\d)/g;

function monthIndex(name) {
  return URL_MONTHS.findIndex((pattern) => new RegExp(`^(?:${pattern})$`, "i").test(name)) + 1;
}

function urlStatedDates(url) {
  let pathname = "";
  let officialEvent = false;
  try {
    const parsed = new URL(url);
    pathname = decodeURIComponent(parsed.pathname);
    // Ticketmaster's canonical /event/<id> destination follows the event ID
    // through a reschedule, while its original numeric date slug can remain.
    officialEvent = ["ticketmaster.com", "www.ticketmaster.com"].includes(parsed.hostname) && /\/event\/[a-z0-9]+\/?$/i.test(pathname);
  } catch { return []; }
  const dates = [];
  for (const match of pathname.matchAll(URL_MONTH_RE)) dates.push({ year: Number(match[3]), month: monthIndex(match[1]), day: Number(match[2]) });
  for (const match of pathname.matchAll(URL_DAY_MONTH_RE)) dates.push({ year: Number(match[3]), month: monthIndex(match[2]), day: Number(match[1]) });
  for (const match of pathname.matchAll(URL_ISO_RE)) dates.push({ year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) });
  for (const match of officialEvent ? [] : pathname.matchAll(URL_NUMERIC_RE)) {
    const first = Number(match[1]);
    const second = Number(match[2]);
    const year = Number(match[3]);
    const month = first > 12 ? second : second > 12 ? first : 0;
    const day = first > 12 ? first : second;
    const parsed = new Date(Date.UTC(year, month - 1, day));
    if (month >= 1 && month <= 12 && parsed.getUTCMonth() === month - 1 && parsed.getUTCDate() === day) dates.push({ year, month, day });
  }
  return dates.filter((date) => date.month >= 1 && date.month <= 12 && date.day >= 1 && date.day <= 31);
}

// A listing's own URL naming a different night outranks any date found
// elsewhere in the catalog item: the item text also carries catalog stamps
// (LaunchDate, ExpirationDate, ...) that can spell the previous day, which is
// how a Fri 5 Mar listing once matched a Thu 4 Mar performance.
function urlDateConflicts(url, date) {
  if (!date) return false;
  return urlStatedDates(url).some((stated) => stated.year !== date.year || stated.month !== date.month || stated.day !== date.day);
}

function eventLocalStart(event) {
  if (!eventLocalDate(event)) return "";
  const instant = eventInstant(event);
  if (instant == null) return "";
  const timeZone = eventTimeZone(event);
  if (!timeZone) return String(event.datetime_iso || event.dateTimeISO || "").slice(0, 16);
  try {
    const parts = Object.fromEntries(new Intl.DateTimeFormat("en-CA", {
      timeZone, hourCycle: "h23", year: "numeric", month: "2-digit",
      day: "2-digit", hour: "2-digit", minute: "2-digit"
    }).formatToParts(new Date(instant)).map(({ type, value }) => [type, value]));
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  } catch { return ""; }
}

function evaluateCandidate(event, artistName, candidate, { matchStartTime = true } = {}) {
  const reasons = [];
  const text = candidate?.searchableText || "";
  if (!candidate?.normalizedUrl) reasons.push("invalid provider event URL");
  if (!containsNormalized(text, artistName)) reasons.push("artist name mismatch");
  if (!dateMatches(text, eventLocalDate(event))) reasons.push("venue-local date mismatch");
  else if (urlDateConflicts(candidate?.normalizedUrl, eventLocalDate(event))) reasons.push("provider URL names a different date");
  if (matchStartTime && candidate?.localStartTimes?.length &&
      (candidate.localStartTimes.length !== 1 || candidate.localStartTimes[0] !== eventLocalStart(event))) {
    reasons.push("venue-local start time mismatch");
  }
  if (!cityMatches(text, event?.city)) reasons.push("city mismatch");
  if (!venueMatches(text, event?.venue)) reasons.push("venue mismatch");
  return { ok: reasons.length === 0, reasons, url: candidate?.normalizedUrl || "", externalId: candidate?.externalId || "" };
}

function decideOutcome({ storedUrl, storedVerified, storedCandidate, passing, catalogComplete, preserveAbsentStored = false }) {
  if (storedCandidate?.ok) return { action: storedVerified ? "none" : "verify", candidate: storedCandidate };
  if (passing.length > 1) return { action: "conflict", candidate: null };
  // One passing listing in a partial catalog is not proof it is the only one:
  // an unfetched page could hold a second (a conflict), so nothing is added.
  if (!catalogComplete) return { action: "none", candidate: null };
  if (passing.length === 1) return { action: storedUrl ? "correct" : "add", candidate: passing[0] };
  if (preserveAbsentStored) return { action: "none", candidate: null };
  if (storedUrl) return { action: storedVerified ? "unverify" : "clear", candidate: null };
  return { action: "none", candidate: null };
}

// The per-event note written to the audit log. Its wording is the contract
// with `outcomeToCause` in scripts/report-link-coverage.mjs, which reads it
// back as a coverage cause: "not checked" = unprocessed, "no qualifying" =
// not listed, "ambiguous:" = ambiguous. A "-" note is not a cause.
function outcomeNote(action, { ambiguousListing = false, storedListed = false, catalogComplete = false, stopReason = "" } = {}) {
  if (ambiguousListing) return "ambiguous: one listing passes for performances at different start times";
  if (action === "conflict") return "ambiguous: several qualifying listings for this event";
  if (["verify", "add", "correct"].includes(action)) return "-";
  if (["clear", "unverify"].includes(action)) return "no qualifying listing (the complete catalog no longer lists the stored link)";
  if (storedListed) return "-";
  if (!catalogComplete) return `not checked: catalog incomplete (${stopReason || "unknown"})`;
  return "no qualifying listing (complete catalog checked)";
}

function markdownCell(value) {
  return String(value ?? "").replace(/\s+/g, " ").replace(/\|/g, "\\|").trim() || "-";
}

// Merge a filtered run (--artist / --limit) into the previous log. A filtered
// run checks a subset, so it must not erase the rest of the provider's
// evidence. Its rows replace their previous rows in place (so an unchanged
// outcome leaves the table byte-identical), new rows are appended, and for an
// --artist run every previous row of that artist's events this run did not
// produce is dropped: those events were not checked, so they fall back to "no
// recorded check" instead of keeping a stale outcome. The artist's events are
// identified by id (events.json artist_slug), so a display-name change cannot
// keep a stale row alive.
function mergeOutcomeRows(previousLog, newRows, scopeShowIds = new Set()) {
  const pending = new Map(newRows.map((row) => [row.id, row.line]));
  const section = String(previousLog || "").split(/^## Outcomes$/m)[1] || "";
  const rows = [];
  let carried = 0;
  for (const line of section.split("\n")) {
    if (!line.startsWith("| ") || line.startsWith("| showId ") || line.startsWith("| ---")) continue;
    const showId = line.slice(2).split(" | ")[0].trim();
    if (!showId) continue;
    if (pending.has(showId)) { rows.push(pending.get(showId)); pending.delete(showId); }
    else if (scopeShowIds.has(showId)) continue;
    else { rows.push(line); carried += 1; }
  }
  rows.push(...pending.values());
  return { rows, carried };
}

function renderLog(summary, generatedAt = new Date().toISOString(), { previousLog = null, filter = "", scopeShowIds = new Set() } = {}) {
  const config = providerConfig(summary.provider);
  const newRows = summary.results.map((row) => ({
    id: String(row.event_id),
    line: `| ${markdownCell(row.event_id)} | ${markdownCell(row.artist)} | ${markdownCell(row.action + (row.applied ? " (applied)" : ""))} | ${markdownCell(row.external_id)} | ${markdownCell(row.url)} | ${markdownCell(row.candidates ? `${row.note}; candidates: ${row.candidates.join(", ")}` : row.note)} |`
  }));
  const merged = previousLog == null ? { rows: newRows.map((row) => row.line), carried: 0 } : mergeOutcomeRows(previousLog, newRows, scopeShowIds);
  const lines = [
    `# ${config.name} event sync log`,
    "",
    `Generated: ${generatedAt}`,
    "",
    "Written by `scripts/sync-impact-marketplace-events.mjs`. One Impact catalog",
    "fetch per registry-verified artist; a link is written only for one",
    "unambiguous listing whose artist, venue, city and venue-local date all agree.",
    "`scripts/report-link-coverage.mjs` reads the notes column as coverage evidence.",
    "",
    "## Run summary",
    "",
    `- Mode: ${summary.mode}`,
    ...(filter ? [`- Filtered run (${filter}): its rows replace their previous rows; ${merged.carried} row(s) carried over from the previous log`] : []),
    `- Events selected: ${summary.selected}`,
    `- API calls made: ${summary.api_calls}`,
    `- Verified provenance written: ${summary.verified}`,
    `- URLs added: ${summary.added}`,
    `- URLs corrected: ${summary.corrected}`,
    `- URLs cleared: ${summary.cleared}`,
    `- Provenance un-verified: ${summary.unverified}`,
    `- Conflicts (ambiguous, untouched): ${summary.conflicts}`,
    `- No qualifying listing (complete catalog): ${summary.results.filter((row) => row.note.startsWith("no qualifying")).length}`,
    `- Not checked (catalog incomplete): ${summary.results.filter((row) => row.note.startsWith("not checked")).length}`,
    "",
    "## Outcomes",
    "",
    `| showId | artist | action | ${config.name} id | url | notes |`,
    "| --- | --- | --- | --- | --- | --- |",
    ...merged.rows,
    ""
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}

function logPathFor(provider) {
  return path.join(ROOT, "reports", "provider-sync", `${provider}-event-sync.md`);
}

function applyOutcome(event, config, outcome, today) {
  if (!["verify", "add", "correct", "clear", "unverify"].includes(outcome.action)) return false;
  if (!event.provider_links || typeof event.provider_links !== "object") event.provider_links = {};
  if (["clear", "unverify"].includes(outcome.action)) {
    event[config.urlField] = "";
    event.provider_links[config.linkKey] = { event_id: null, url: null, verified: false, last_verified_at: null, availability_status: "not_listed" };
    return true;
  }
  event[config.urlField] = outcome.candidate.url;
  event.provider_links[config.linkKey] = {
    event_id: outcome.candidate.externalId,
    url: outcome.candidate.url,
    verified: true,
    last_verified_at: today,
    availability_status: "listed"
  };
  return true;
}

async function fetchCatalog(config, artistName, options, state, env = process.env, fetchImpl = globalThis.fetch) {
  const { accountSid, authToken, programId } = impactCredentials(config, env);
  const authorization = accountSid && authToken
    ? `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`
    : "";
  const candidates = [];
  const keyword = catalogArtistKeyword(artistName);
  const now = () => (options.now ? options.now() : Date.now());
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    let response;
    let payload;
    // One retry for a timed-out/failed request (including a stalled or cut-off
    // body) or a transient 429/5xx; a refusal (401/403/proxy 404) is never retried.
    for (let attempt = 1; attempt <= 2; attempt += 1) {
      if (options.maxApiCalls != null && state.apiCalls >= options.maxApiCalls) return { candidates, complete: false, stopReason: "api_call_limit" };
      if (options.deadline != null && now() >= options.deadline) return { candidates, complete: false, stopReason: "runtime_limit" };
      const wait = attempt === 1 ? options.delayMs : (options.retryDelayMs ?? RETRY_DELAY_MS);
      if (wait) await new Promise((resolve) => setTimeout(resolve, wait));
      state.apiCalls += 1;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), options.requestTimeoutMs ?? REQUEST_TIMEOUT_MS);
      let failure = "";
      response = undefined;
      try {
        response = await fetchImpl(catalogItemsUrl(config, keyword, page, env, PAGE_SIZE), {
          headers: {
            Accept: "application/json",
            ...(authorization ? { Authorization: authorization } : {}),
            ...catalogProxyHeaders(env)
          },
          signal: controller.signal
        });
        // The body is read under the same timeout.
        if (response.ok) payload = await response.json();
      } catch (error) {
        failure = response?.ok && !controller.signal.aborted ? "invalid_json" : `request_failed:${clean(error?.message, 120)}`;
      } finally { clearTimeout(timeout); }
      const transient = failure || response.status === 429 || response.status >= 500;
      if (!transient) break;
      if (attempt === 2) return { candidates, complete: false, stopReason: failure || `http_${response.status}` };
    }
    // An incomplete catalog is a normal, silent, exit-0 outcome that preserves
    // existing links, so anything meaning "we were refused" has to be an
    // authFailure instead — otherwise a refused run looks identical to a run
    // with nothing to do. A proxied 404 is the gate rejecting our token.
    if (response.status === 401 || response.status === 403 || isCatalogProxyRejection(response.status, env)) {
      return { candidates, complete: false, authFailure: true, stopReason: `http_${response.status}` };
    }
    if (!response.ok) return { candidates, complete: false, stopReason: `http_${response.status}` };
    const items = catalogItems(payload);
    if (!items) return { candidates, complete: false, stopReason: "missing_items" };
    for (const item of items) candidates.push(...productCandidates(config, item, programId));
    const total = Number(payload?.["@total"] ?? payload?.Total ?? payload?.total);
    if (items.length < PAGE_SIZE || (Number.isFinite(total) && total >= 0 && page * PAGE_SIZE >= total)) {
      return { candidates, complete: true, stopReason: "", narrowed: keyword !== clean(artistName, 200) };
    }
  }
  return { candidates, complete: false, stopReason: "pagination_cap" };
}

// Listing ids that pass for different performance times are ambiguous, even
// on the same day. A date-only listing cannot identify a matinee or evening.
function listingsMatchingSeveralDates(evaluations) {
  const startsByListing = new Map();
  for (const { event, passing, storedCandidate } of evaluations) {
    const date = eventLocalDate(event);
    if (!date) continue;
    const key = eventInstant(event);
    const listings = passing.map((candidate) => candidate.externalId);
    if (storedCandidate?.ok) listings.push(storedCandidate.externalId);
    for (const listing of new Set(listings.filter(Boolean))) {
      if (!startsByListing.has(listing)) startsByListing.set(listing, new Set());
      startsByListing.get(listing).add(key);
    }
  }
  return new Set([...startsByListing].filter(([, starts]) => starts.size > 1).map(([listing]) => listing));
}

function enrichTicketLiquidatorCandidates(candidates, ticketNetworkCandidates) {
  const referenceById = new Map(ticketNetworkCandidates.map((candidate) => [candidate.externalId, candidate]));
  return candidates.map((candidate) => {
    const reference = referenceById.get(candidate.externalId);
    return reference
      ? { ...candidate, searchableText: `${candidate.searchableText} ${reference.searchableText}`.trim() }
      : candidate;
  });
}

function selectEvents(events, registry, artists, options, now = new Date()) {
  const verified = new Set(registry.filter((row) => row?.review_status === "verified").map((row) => clean(row.slug, 120)));
  const names = new Map(artists.map((row) => [clean(row.slug, 120), clean(row.name, 200)]));
  const selected = [];
  for (const event of events) {
    const slug = clean(event?.artist_slug, 120);
    if (!verified.has(slug) || (options.artist && options.artist !== slug)) continue;
    if (!names.get(slug) || names.get(slug).includes("'")) continue;
    const instant = eventInstant(event);
    if (instant == null || instant < now.getTime() - PAST_GRACE_MS || !clean(event.city) || !clean(event.venue)) continue;
    selected.push({ event, artistName: names.get(slug) });
    if (options.limit != null && selected.length >= options.limit) break;
  }
  return selected;
}

async function run(options, deps = {}) {
  const config = providerConfig(options.provider);
  if (!config) throw new Error(`--provider must be one of: ${Object.keys(PROVIDERS).join(", ")}`);
  const [events, artists, registryPayload] = deps.data || await Promise.all([EVENTS_PATH, ARTISTS_PATH, REGISTRY_PATH].map(async (file) => JSON.parse(await fs.readFile(file, "utf8"))));
  const registry = Array.isArray(registryPayload) ? registryPayload : registryPayload?.artists;
  if (!Array.isArray(registry)) throw new Error("Provider identity registry has no artists array");
  const selected = selectEvents(events, registry, artists, options, deps.now || new Date());
  const state = { apiCalls: 0 };
  const results = [];
  const exactCatalogs = new Map();
  const lookupExactId = async (lookupConfig, id) => {
    const key = `${lookupConfig.slug}:${id}`;
    if (!exactCatalogs.has(key)) {
      exactCatalogs.set(key, deps.fetchCatalog
        ? await deps.fetchCatalog(lookupConfig, id, options, state)
        : await fetchCatalog(lookupConfig, id, options, state, deps.env, deps.fetchImpl));
    }
    return exactCatalogs.get(key);
  };
  const byArtist = new Map();
  for (const item of selected) {
    const rows = byArtist.get(item.artistName) || [];
    rows.push(item.event);
    byArtist.set(item.artistName, rows);
  }
  let authFailure = false;
  let authFailureReason = "";
  // Start from a different artist each day: when a run stops early (call
  // budget or runtime limit) the same artists are not the ones left unchecked.
  const artistQueue = [...byArtist];
  const rotationKey = options.rotationKey ?? Math.floor((deps.now || new Date()).getTime() / 86400000);
  const start = artistQueue.length ? rotationKey % artistQueue.length : 0;
  const rotation = [...artistQueue.slice(start), ...artistQueue.slice(0, start)];
  // Artists whose top-earning shows lack this lane go first, so a capped run
  // still checks them; everyone else keeps the daily rotation.
  const priorityRank = new Map((options.priorityArtists || []).map((slug, index) => [slug, index]));
  const rankOf = ([, artistEvents]) => priorityRank.get(clean(artistEvents[0]?.artist_slug, 120).toLowerCase()) ?? Infinity;
  const rotated = [...rotation.filter((entry) => rankOf(entry) !== Infinity).sort((a, b) => rankOf(a) - rankOf(b)), ...rotation.filter((entry) => rankOf(entry) === Infinity)];
  for (const [artistName, artistEvents] of rotated) {
    let catalog = deps.fetchCatalog ? await deps.fetchCatalog(config, artistName, options, state) : await fetchCatalog(config, artistName, options, state, deps.env, deps.fetchImpl);
    if (catalog.authFailure) { authFailure = true; authFailureReason = catalog.stopReason || ""; break; }
    if (config.slug === "ticket-liquidator" && catalog.complete) {
      const referenceConfig = providerConfig("ticketnetwork");
      const reference = deps.fetchCatalog
        ? await deps.fetchCatalog(referenceConfig, artistName, options, state)
        : await fetchCatalog(referenceConfig, artistName, options, state, deps.env, deps.fetchImpl);
      if (reference.authFailure) { authFailure = true; authFailureReason = reference.stopReason || ""; break; }
      if (!reference.complete) {
        catalog = { ...catalog, complete: false, stopReason: `reference_${reference.stopReason || "incomplete"}` };
      } else {
        catalog = {
          ...catalog,
          candidates: enrichTicketLiquidatorCandidates(catalog.candidates, reference.candidates)
        };
      }
    }
    const evaluations = artistEvents.map((event) => {
      const link = event?.provider_links?.[config.linkKey] || {};
      const storedUrl = normalizeProviderUrl(config, event?.[config.urlField]);
      const storedId = clean(link?.event_id, 255);
      const passing = catalog.candidates.map((candidate) => ({ candidate, evaluated: evaluateCandidate(event, artistName, candidate, { matchStartTime: false }) })).filter((row) => row.evaluated.ok).map((row) => ({ ...row.evaluated, ...row.candidate }));
      const exactStored = catalog.candidates.find((candidate) => (storedId && candidate.externalId === storedId) || (storedUrl && candidate.normalizedUrl === storedUrl));
      const storedCandidate = exactStored ? { ...evaluateCandidate(event, artistName, exactStored, { matchStartTime: false }), ...exactStored } : null;
      return { event, link, storedUrl, storedId, passing, storedCandidate };
    });
    // A narrow discovery miss is not proof of removal. Recheck the stored ID
    // in its own catalog, under the same call/time budgets and auth guards.
    for (const evaluation of evaluations) {
      if (!catalog.narrowed || !catalog.complete || !evaluation.storedUrl || !evaluation.storedId ||
          evaluation.storedCandidate?.ok || evaluation.passing.length) continue;
      let exact = await lookupExactId(config, evaluation.storedId);
      if (exact.authFailure) { authFailure = true; authFailureReason = exact.stopReason || ""; break; }
      if (config.slug === "ticket-liquidator" && exact.complete) {
        const reference = await lookupExactId(providerConfig("ticketnetwork"), evaluation.storedId);
        if (reference.authFailure) { authFailure = true; authFailureReason = reference.stopReason || ""; break; }
        exact = reference.complete
          ? { ...exact, candidates: enrichTicketLiquidatorCandidates(exact.candidates, reference.candidates) }
          : { ...exact, complete: false, stopReason: `reference_${reference.stopReason || "incomplete"}` };
      }
      evaluation.exactIdComplete = exact.complete === true;
      evaluation.exactIdStopReason = exact.stopReason || "";
      if (!exact.complete) continue;
      const found = exact.candidates.find((candidate) => candidate.externalId === evaluation.storedId);
      evaluation.storedCandidate = found
        ? { ...evaluateCandidate(evaluation.event, artistName, found, { matchStartTime: false }), ...found }
        : null;
    }
    if (authFailure) break;
    // Use performance times to resolve date-level ambiguity. A single show
    // already identified by artist/date/city/venue keeps the existing gate:
    // providers can report doors and performance times differently.
    const sharedListings = listingsMatchingSeveralDates(evaluations);
    for (const evaluation of evaluations) {
      const needsTime = evaluation.passing.length > 1 ||
        evaluation.passing.some((candidate) => sharedListings.has(candidate.externalId)) ||
        (evaluation.storedCandidate?.ok && sharedListings.has(evaluation.storedCandidate.externalId));
      if (!needsTime) continue;
      const timedMatch = (candidate) => candidate.localStartTimes?.length === 1 &&
        evaluateCandidate(evaluation.event, artistName, candidate).ok;
      let timed = evaluation.passing.filter(timedMatch);
      // Ticket Liquidator lists TicketNetwork's own listings under the same
      // ids, without start times. When the TicketNetwork link on this event is
      // verified (TicketNetwork's feed does carry times) and exactly one tied
      // listing has that id, it is the same performance: take it. Metallica's
      // Sphere Thursdays tie a single night with a two-night package listed on
      // the same date (2026-10-31 sync logs).
      if (!timed.length && config.slug === "ticket-liquidator") {
        const tnLink = evaluation.event?.provider_links?.ticketnetwork;
        const tnId = tnLink?.verified === true ? clean(tnLink.event_id, 255) : "";
        const sameListing = tnId ? evaluation.passing.filter((candidate) => candidate.externalId === tnId) : [];
        if (sameListing.length === 1) timed = sameListing;
      }
      // Missing or malformed start evidence must not become the sole match
      // after a conflicting timed listing is rejected. Withhold the unresolved
      // ambiguity; it is not evidence that an existing verified link vanished.
      evaluation.unresolvedStart = timed.length === 0 && evaluation.passing.some((candidate) => candidate.localStartTimes?.length !== 1);
      evaluation.untimedPassing = evaluation.passing;
      evaluation.passing = timed;
      if (evaluation.storedCandidate) {
        evaluation.storedStartUnresolved = evaluation.storedCandidate.ok && evaluation.storedCandidate.localStartTimes?.length !== 1;
        evaluation.storedCandidate = { ...evaluation.storedCandidate,
          ...evaluateCandidate(evaluation.event, artistName, evaluation.storedCandidate),
          ok: timedMatch(evaluation.storedCandidate) };
      }
    }
    const ambiguous = listingsMatchingSeveralDates(evaluations);
    for (const { event, link, storedUrl, storedId, passing, untimedPassing, storedCandidate, exactIdComplete, exactIdStopReason, unresolvedStart, storedStartUnresolved } of evaluations) {
      let outcome = decideOutcome({ storedUrl, storedVerified: link?.verified === true, storedCandidate, passing, catalogComplete: catalog.complete, preserveAbsentStored: catalog.narrowed === true && !exactIdComplete });
      const unresolvedComplete = catalog.complete && unresolvedStart;
      const preserveUnresolved = unresolvedComplete && storedStartUnresolved && Boolean(storedUrl) && link?.verified === true;
      if (unresolvedComplete && (!storedUrl || storedStartUnresolved)) {
        outcome = { action: preserveUnresolved ? "none" : "conflict", candidate: null };
      }
      // One listing is one performance. If it passes for performances on
      // different start times, nothing says which one it is: it is not written to
      // any of them. A link already stored and verified is left as it is.
      const ambiguousListing = Boolean(outcome.candidate && ambiguous.has(outcome.candidate.externalId) && ["verify", "add", "correct"].includes(outcome.action));
      if (ambiguousListing) outcome = { action: "conflict", candidate: null };
      const applied = options.apply && applyOutcome(event, config, outcome, (deps.now || new Date()).toISOString().slice(0, 10));
      const preservedAbsentStored = !storedStartUnresolved && catalog.narrowed && storedUrl && !storedCandidate?.ok && passing.length === 0 && !exactIdComplete;
      const note = preservedAbsentStored
        ? `not checked: exact-ID verification incomplete (${exactIdStopReason || "missing_stored_id"}); stored link preserved`
        : unresolvedComplete && (outcome.action === "conflict" || preserveUnresolved)
        ? "ambiguous: missing or conflicting performance start evidence"
        : outcomeNote(outcome.action, { ambiguousListing, storedListed: Boolean(storedCandidate?.ok || preserveUnresolved), catalogComplete: catalog.complete, stopReason: catalog.stopReason });
      // Name the listings an ambiguity is between, with the start times each
      // one states, so the log shows what a tie-break would have to tell apart.
      const tied = outcome.action === "conflict" ? (untimedPassing || passing) : [];
      const candidates = tied.length ? tied.map((candidate) => `${candidate.externalId} @ ${candidate.localStartTimes?.length ? candidate.localStartTimes.join("/") : "no start time"}`) : null;
      results.push({ event_id: event.id, artist: artistName, action: outcome.action, applied, url: outcome.candidate?.url || storedUrl || "", external_id: outcome.candidate?.externalId || storedId || "", catalog_complete: catalog.complete, stop_reason: catalog.stopReason || "", note, ...(ambiguousListing ? { ambiguous_listing: true } : {}), ...(candidates ? { candidates } : {}) });
    }
  }
  if (authFailure) {
    const hint = isCatalogProxyRejection(authFailureReason.replace("http_", ""), deps.env || process.env)
      ? ` — ${CATALOG_PROXY_REJECTION_HINT}`
      : "";
    throw new Error(`${config.name} Impact catalog fetch was refused (${authFailureReason || "auth_failure"}); no writes were made${hint}`);
  }
  if (options.apply && results.some((row) => row.applied)) await fs.writeFile(EVENTS_PATH, `${JSON.stringify(events, null, 2)}\n`);
  // Report in selection order, not the day's rotation order, so the audit log
  // changes only when an outcome does.
  const position = new Map(selected.map((item, index) => [item.event.id, index]));
  results.sort((a, b) => position.get(a.event_id) - position.get(b.event_id));
  return {
    provider: config.slug, mode: options.apply ? "apply" : "dry-run", selected: selected.length, api_calls: state.apiCalls,
    changed: results.filter((row) => row.applied).length,
    verified: results.filter((row) => row.action === "verify").length,
    added: results.filter((row) => row.action === "add").length,
    corrected: results.filter((row) => row.action === "correct").length,
    cleared: results.filter((row) => row.action === "clear").length,
    unverified: results.filter((row) => row.action === "unverify").length,
    conflicts: results.filter((row) => row.action === "conflict").length,
    results
  };
}

async function selfTest() {
  const config = providerConfig("ticketnetwork");
  assert.equal(catalogArtistKeyword("Dancing With The Stars"), "Dancing");
  assert.equal(catalogArtistKeyword("The Red Clay Strays"), "Strays");
  assert.equal(catalogArtistKeyword("Trans-Siberian Orchestra"), "Siberian");
  assert.equal(catalogArtistKeyword("Blue October"), "October");
  assert.equal(catalogArtistKeyword("The The"), "The The");
  assert.equal(catalogArtistKeyword("8310159"), "8310159");
  const catalogItem = { CampaignId: "123", CatalogItemId: "tn-1", Name: "RAYE", Description: "RAYE at O2 Arena, London on 9 July 2027", Url: "https://www.ticketnetwork.com/tickets/raye-london-o2-arena-7-9-2027/tn-1", CurrentPrice: "55", Currency: "GBP" };
  const candidate = productCandidates(config, catalogItem, "123")[0];
  assert.equal(candidate.externalId, "tn-1");
  assert.equal(productCandidates(config, catalogItem, "wrong-program").length, 0);
  const searchUrl = catalogItemsUrl(config, "RAYE", 1, { IMPACT_SEATGEEK_ACCOUNT_SID: "sid", IMPACT_SEATGEEK_AUTH_TOKEN: "token", IMPACT_TICKETNETWORK_CAMPAIGN_ID: "123" });
  assert.match(searchUrl, /\/Catalogs\/896\/Items\?/);
  assert.equal(new URL(searchUrl).searchParams.get("IrVersion"), "16");
  assert.match(catalogItemsUrl(config, "RAYE", 1, { IMPACT_SEATGEEK_ACCOUNT_SID: "sid", IMPACT_SEATGEEK_AUTH_TOKEN: "token", IMPACT_TICKETNETWORK_CAMPAIGN_ID: "123", IMPACT_TICKETNETWORK_CATALOG_ID: "456" }), /\/Catalogs\/456\/Items\?/);
  assert.equal(catalogItems({ Items: [catalogItem] })[0].CatalogItemId, "tn-1");
  assert.equal(normalizeProviderUrl(config, "https://ticketnetwork.com/"), "");
  assert.equal(normalizeProviderUrl(config, "https://evil.example/tickets/1"), "");
  const liveTrackingItem = {
    ...catalogItem,
    CampaignId: "2322",
    Url: "https://ticketnetwork.lusg.net/c/3977745/132208/2322?prodsku=tn-1&u=https%3A%2F%2Fwww.ticketnetwork.com%2Fen%2Fp%2Ftn-1"
  };
  assert.equal(productCandidates(config, liveTrackingItem, "2322")[0].normalizedUrl, "https://www.ticketnetwork.com/en/p/tn-1");
  assert.equal(productCandidates(config, { ...liveTrackingItem, Url: "https://tracking.example/click?u=https%3A%2F%2Fevil.example%2Ftickets%2F1" }, "2322").length, 0);
  const sameHostTracking = { ...liveTrackingItem, Url: "https://goto.ticketnetwork.com/c/publisher/132208/2322?u=https%3A%2F%2Fwww.ticketnetwork.com%2Fen%2Fp%2Ftn-1" };
  assert.equal(productCandidates(config, sameHostTracking, "2322")[0].normalizedUrl, "https://www.ticketnetwork.com/en/p/tn-1");
  assert.equal(productCandidates(config, { ...sameHostTracking, Url: "https://goto.ticketnetwork.com/c/publisher/132208/2322?u=https%3A%2F%2Fevil.example%2Ftickets%2F1" }, "2322").length, 0);
  const proxyEnv = {
    IMPACT_CATALOG_PROXY_URL: "https://tourticketcompare.com/api/impact/products",
    IMPACT_CATALOG_PROXY_TOKEN: "proxy-token"
  };
  const proxySearchUrl = catalogItemsUrl(config, "RAYE", 2, proxyEnv);
  assert.equal(new URL(proxySearchUrl).searchParams.get("credentialSet"), "seatgeek");
  assert.equal(new URL(proxySearchUrl).searchParams.get("catalogId"), "896");
  assert.equal(new URL(proxySearchUrl).searchParams.get("campaignId"), "2322");
  assert.equal(new URL(proxySearchUrl).searchParams.get("page"), "2");
  // The proxy endpoint is token-gated. The token travels as a header so it
  // never lands in a logged URL, and a proxied run without one fails fast
  // rather than reading the gate's 404 as an empty catalog.
  assert.equal(new URL(proxySearchUrl).searchParams.has("token"), false);
  assert.equal(catalogProxyHeaders(proxyEnv)["X-Debug-Token"], "proxy-token");
  assert.equal(catalogProxyHeaders({ ...proxyEnv, IMPACT_CATALOG_PROXY_TOKEN: "", DEBUG_API_TOKEN: "fallback" })["X-Debug-Token"], "fallback");
  // Direct-credential runs never send the header.
  assert.deepEqual(catalogProxyHeaders({ IMPACT_SEATGEEK_ACCOUNT_SID: "sid", IMPACT_SEATGEEK_AUTH_TOKEN: "token" }), {});
  assert.throws(
    () => catalogItemsUrl(config, "RAYE", 1, { IMPACT_CATALOG_PROXY_URL: proxyEnv.IMPACT_CATALOG_PROXY_URL }),
    /token-gated/
  );

  // A token that CI has but Cloudflare Pages rejects: the request goes out and
  // comes back 404 from the gate. That must surface as an auth failure, not as
  // an incomplete catalog — an incomplete catalog exits 0 with no changes, so
  // the mismatch would otherwise leave the nightly sync a permanently green
  // no-op. A 404 on a direct (non-proxied) run keeps its old meaning.
  assert.equal(isCatalogProxyRejection(404, proxyEnv), true);
  assert.equal(isCatalogProxyRejection(404, { IMPACT_SEATGEEK_ACCOUNT_SID: "sid" }), false);
  assert.equal(isCatalogProxyRejection(500, proxyEnv), false);
  const gateRejected = await fetchCatalog(
    config, "RAYE", { delayMs: 0 }, { apiCalls: 0 },
    { ...proxyEnv, IMPACT_TICKETNETWORK_CAMPAIGN_ID: "2322", IMPACT_TICKETNETWORK_CATALOG_ID: "896" },
    async () => new Response(JSON.stringify({ ok: false, error: "Not found" }), { status: 404 })
  );
  assert.equal(gateRejected.authFailure, true);
  assert.equal(gateRejected.stopReason, "http_404");
  assert.equal(gateRejected.complete, false);
  // A timed-out page is retried once, then the catalog continues.
  const tnEnv = { ...proxyEnv, IMPACT_TICKETNETWORK_CAMPAIGN_ID: "2322", IMPACT_TICKETNETWORK_CATALOG_ID: "896" };
  const pageOf = (n, total) => new Response(JSON.stringify({ Items: Array.from({ length: n }, (_, i) => ({ ...catalogItem, CampaignId: "2322", CatalogItemId: `x${i}` })), "@total": total }), { status: 200 });
  let calls = 0;
  const retried = await fetchCatalog(config, "RAYE", { delayMs: 0, retryDelayMs: 0 }, { apiCalls: 0 }, tnEnv, async () => {
    calls += 1;
    if (calls === 1) throw new Error("This operation was aborted");
    return pageOf(3, 3);
  });
  assert.equal(retried.complete, true);
  assert.equal(calls, 2);
  // Two failures in a row leave the catalog incomplete, with the reason kept.
  const twice = await fetchCatalog(config, "RAYE", { delayMs: 0, retryDelayMs: 0 }, { apiCalls: 0 }, tnEnv, async () => { throw new Error("This operation was aborted"); });
  assert.deepEqual([twice.complete, twice.stopReason], [false, "request_failed:This operation was aborted"]);
  // A transient 503 is retried; a refusal is not.
  let calls503 = 0;
  const after503 = await fetchCatalog(config, "RAYE", { delayMs: 0, retryDelayMs: 0 }, { apiCalls: 0 }, tnEnv, async () => (++calls503 === 1 ? new Response("", { status: 503 }) : pageOf(1, 1)));
  assert.equal(after503.complete, true);
  let calls401 = 0;
  await fetchCatalog(config, "RAYE", { delayMs: 0, retryDelayMs: 0 }, { apiCalls: 0 }, tnEnv, async () => { calls401 += 1; return new Response("", { status: 401 }); });
  assert.equal(calls401, 1);
  // Narrow discovery completes without weakening the full-name match. A
  // different act sharing the keyword is rejected by the existing matcher.
  const dancingItem = {
    ...catalogItem, CampaignId: "2322", CatalogItemId: "dwts-1",
    Name: "Dancing With The Stars",
    Description: "Dancing With The Stars at O2 Arena, London on 9 July 2027"
  };
  const narrow = await fetchCatalog(config, "Dancing With The Stars", { delayMs: 0 }, { apiCalls: 0 }, tnEnv,
    async (url) => {
      assert.equal(new URL(url).searchParams.get("q"), "Dancing");
      return new Response(JSON.stringify({ Items: [dancingItem], "@total": 1 }), { status: 200 });
    });
  assert.equal(narrow.complete, true);
  assert.equal(narrow.narrowed, true);
  assert.equal(decideOutcome({ storedUrl: "https://www.ticketnetwork.com/en/p/existing", storedVerified: true,
    passing: [], catalogComplete: true, preserveAbsentStored: true }).action, "none");
  const dancingEvent = { city: "London", venue: "O2 Arena", datetime_iso: "2027-07-09T19:00:00Z", timezone: "Europe/London" };
  assert.equal(evaluateCandidate(dancingEvent, "Dancing With The Stars", narrow.candidates[0]).ok, true);
  assert.equal(evaluateCandidate(dancingEvent, "Dancing With The Stars", {
    ...narrow.candidates[0], searchableText: "Dancing Queen at O2 Arena, London on 9 July 2027"
  }).ok, false);
  // A body that stalls past the timeout, or arrives cut off, is retried too.
  let stallCalls = 0;
  const stalled = await fetchCatalog(config, "RAYE", { delayMs: 0, retryDelayMs: 0, requestTimeoutMs: 20 }, { apiCalls: 0 }, tnEnv, async (_url, init) => {
    stallCalls += 1;
    if (stallCalls > 1) return pageOf(1, 1);
    // Without the request timeout the body fails late, after 500 ms, instead.
    return { ok: true, status: 200, json: () => new Promise((_resolve, reject) => {
      init.signal.addEventListener("abort", () => reject(new Error("This operation was aborted")));
      setTimeout(() => reject(new SyntaxError("stalled body")), 500);
    }) };
  });
  assert.deepEqual([stalled.complete, stallCalls], [true, 2]);
  let cutCalls = 0;
  const cut = await fetchCatalog(config, "RAYE", { delayMs: 0, retryDelayMs: 0 }, { apiCalls: 0 }, tnEnv, async () => (++cutCalls === 1 ? new Response('{"Items": [', { status: 200 }) : pageOf(1, 1)));
  assert.deepEqual([cut.complete, cutCalls], [true, 2]);
  const cutTwice = await fetchCatalog(config, "RAYE", { delayMs: 0, retryDelayMs: 0 }, { apiCalls: 0 }, tnEnv, async () => new Response('{"Items": [', { status: 200 }));
  assert.deepEqual([cutTwice.complete, cutTwice.stopReason], [false, "invalid_json"]);
  // Catalogs past the old 5-page cap now complete (7 pages of 100).
  let page = 0;
  const big = await fetchCatalog(config, "RAYE", { delayMs: 0, retryDelayMs: 0 }, { apiCalls: 0 }, tnEnv, async () => { page += 1; return pageOf(page < 7 ? 100 : 40, 640); });
  assert.deepEqual([big.complete, page], [true, 7]);
  // The runtime limit stops cleanly and says why.
  const late = await fetchCatalog(config, "RAYE", { delayMs: 0, deadline: 1000, now: () => 2000 }, { apiCalls: 0 }, tnEnv, async () => pageOf(1, 1));
  assert.deepEqual([late.complete, late.stopReason], [false, "runtime_limit"]);
  assert.equal(outcomeNote("none", { catalogComplete: false, stopReason: "runtime_limit" }), "not checked: catalog incomplete (runtime_limit)");
  // The same 404 without the proxy stays an ordinary incomplete catalog.
  const directNotFound = await fetchCatalog(
    config, "RAYE", { delayMs: 0 }, { apiCalls: 0 },
    { IMPACT_SEATGEEK_ACCOUNT_SID: "sid", IMPACT_SEATGEEK_AUTH_TOKEN: "token", IMPACT_TICKETNETWORK_CAMPAIGN_ID: "2322", IMPACT_TICKETNETWORK_CATALOG_ID: "896" },
    async () => new Response("", { status: 404 })
  );
  assert.equal(directNotFound.authFailure, undefined);
  assert.equal(directNotFound.complete, false);
  // 401/403 keep failing regardless of transport.
  for (const status of [401, 403]) {
    const refused = await fetchCatalog(
      config, "RAYE", { delayMs: 0 }, { apiCalls: 0 },
      { IMPACT_SEATGEEK_ACCOUNT_SID: "sid", IMPACT_SEATGEEK_AUTH_TOKEN: "token", IMPACT_TICKETNETWORK_CAMPAIGN_ID: "2322", IMPACT_TICKETNETWORK_CATALOG_ID: "896" },
      async () => new Response("", { status })
    );
    assert.equal(refused.authFailure, true);
  }
  // run() must convert that into a throw that names the misconfiguration,
  // rather than returning a clean zero-change summary.
  await assert.rejects(
    run({ provider: "ticketnetwork", apply: false, delayMs: 0, limit: null, maxApiCalls: null, artist: "" }, {
      env: proxyEnv,
      fetchCatalog: async () => ({ candidates: [], complete: false, authFailure: true, stopReason: "http_404" }),
      now: new Date("2027-01-01T00:00:00Z"),
      data: [
        [{ id: "e1", artist_slug: "raye", datetime_iso: "2027-07-09T19:00:00", timezone: "Europe/London", city: "London", venue: "O2 Arena", provider_links: {} }],
        [{ slug: "raye", name: "RAYE" }],
        [{ slug: "raye", review_status: "verified" }]
      ]
    }),
    /refused \(http_404\)[\s\S]*IMPACT_CATALOG_PROXY_TOKEN/
  );
  const event = { id: "e1", artist_slug: "raye", datetime_iso: "2027-07-09T19:00:00", timezone: "Europe/London", city: "London", venue: "O2 Arena", provider_links: {} };
  assert.equal(dateMatches("2027-07-09T20:00:00+01:00", { year: 2027, month: 7, day: 9 }), true);
  assert.equal(evaluateCandidate(event, "RAYE", candidate).ok, true);
  assert.equal(evaluateCandidate({ ...event, city: "Manchester" }, "RAYE", candidate).ok, false);
  // A narrowed discovery miss must be resolved by ID, not kept indefinitely.
  const existing = { ...event, ticketnetwork_url: candidate.normalizedUrl,
    provider_links: { ticketnetwork: { verified: true, event_id: candidate.externalId } } };
  const exactRun = async (reply) => {
    const queries = [];
    const summary = await run({ provider: "ticketnetwork", apply: false, delayMs: 0 }, {
      now: new Date("2027-01-01T00:00:00Z"),
      data: [[structuredClone(existing)], [{ slug: "raye", name: "RAYE" }], [{ slug: "raye", review_status: "verified" }]],
      async fetchCatalog(_config, query) {
        queries.push(query);
        return query === "RAYE" ? { candidates: [], complete: true, narrowed: true } : reply;
      }
    });
    assert.deepEqual(queries, ["RAYE", candidate.externalId]);
    return summary.results[0];
  };
  assert.equal((await exactRun({ candidates: [candidate], complete: true })).action, "none");
  assert.equal((await exactRun({ candidates: [], complete: true })).action, "unverify");
  const exactHeld = await exactRun({ candidates: [], complete: false, stopReason: "api_call_limit" });
  assert.equal(exactHeld.action, "none");
  assert.match(exactHeld.note, /exact-ID verification incomplete.*api_call_limit/);
  await assert.rejects(exactRun({ candidates: [], complete: false, authFailure: true, stopReason: "http_403" }), /refused \(http_403\).*no writes/);
  // Shared local-date resolver: a row carrying an explicit numeric offset but
  // no IANA timezone states its own local date, so the date gate can pass. A
  // UTC instant with no timezone stays unresolved and the gate stays closed.
  assert.deepEqual(eventLocalDate({ datetime_iso: "2027-07-09T19:00:00+01:00" }), { year: 2027, month: 7, day: 9 });
  assert.equal(evaluateCandidate({ ...event, datetime_iso: "2027-07-09T19:00:00+01:00", timezone: "" }, "RAYE", candidate).ok, true);
  assert.equal(eventLocalDate({ datetime_iso: "2027-07-09T19:00:00Z" }), null);
  assert.equal(
    evaluateCandidate({ ...event, datetime_iso: "2027-07-09T19:00:00Z", timezone: "" }, "RAYE", candidate).reasons.includes("venue-local date mismatch"),
    true
  );
  const enrichedTl = enrichTicketLiquidatorCandidates(
    [{ externalId: "same-1", normalizedUrl: "https://ticketliquidator.com/tickets/same-1/raye-o2", searchableText: "RAYE O2 Arena 2027-07-09" }],
    [{ externalId: "same-1", normalizedUrl: "https://ticketnetwork.com/tickets/same-1", searchableText: "RAYE O2 Arena London 2027-07-09" }]
  );
  assert.equal(evaluateCandidate(event, "RAYE", enrichedTl[0]).ok, true);
  assert.equal(decideOutcome({ storedUrl: "", storedVerified: false, storedCandidate: null, passing: [candidate], catalogComplete: true }).action, "add");
  assert.equal(decideOutcome({ storedUrl: "https://ticketnetwork.com/tickets/x/1", storedVerified: true, storedCandidate: null, passing: [], catalogComplete: false }).action, "none");
  const changed = applyOutcome(event, config, { action: "add", candidate: { ...candidate, url: candidate.normalizedUrl } }, "2026-07-13");
  assert.equal(changed, true);
  assert.equal(event.provider_links.ticketnetwork.verified, true);
  assert.equal(event.ticketnetwork_url, candidate.normalizedUrl);
  const dry = await run({ provider: "ticketnetwork", artist: "", limit: null, maxApiCalls: null, delayMs: 0, apply: false, json: false }, {
    now: new Date("2026-07-13T00:00:00Z"),
    data: [[{ id: "e2", artist_slug: "raye", datetime_iso: "2027-07-09T19:00:00", timezone: "Europe/London", city: "London", venue: "O2 Arena", provider_links: {} }], [{ slug: "raye", name: "RAYE" }], [{ slug: "raye", review_status: "verified" }]],
    async fetchCatalog() { return { candidates: [candidate], complete: true, stopReason: "" }; }
  });
  assert.equal(dry.added, 1);
  assert.equal(dry.changed, 0);

  // Wrong-night guard. Two consecutive stadium nights; the catalog item for
  // the second night also carries a stamp one day earlier (as a catalog
  // Launch/Expiration date can), so its text "matches" both nights.
  const night = (id, day, links = {}) => ({
    id, artist_slug: "stadium-act", datetime_iso: `2027-03-0${day}T06:00:00Z`, timezone: "Australia/Sydney",
    city: "Sydney Olympic Park", venue: "Accor Stadium", provider_links: links
  });
  const itemText = "Stadium Act Accor Stadium Sydney Olympic Park 2027-03-05T17:00:00 2027-03-04T22:00:00";
  const tn = { externalId: "9000001", normalizedUrl: "https://www.ticketnetwork.com/en/p/9000001", searchableText: itemText };
  const tl = { externalId: "9000001", normalizedUrl: "https://www.ticketliquidator.com/tickets/9000001/Stadium-Act-tickets-Fri-Mar-5-2027-Accor-Stadium", searchableText: itemText };
  // 1. A listing whose own URL names another night is rejected.
  assert.deepEqual(evaluateCandidate(night("n4", 4), "Stadium Act", tl).reasons, ["provider URL names a different date"]);
  // 2. The same listing on its own night passes.
  assert.equal(evaluateCandidate(night("n5", 5), "Stadium Act", tl).ok, true);
  assert.deepEqual(urlStatedDates("https://x.example/tickets/1/Act-5-March-2027-Hall"), [{ year: 2027, month: 3, day: 5 }]);
  assert.deepEqual(urlStatedDates("https://x.example/raye-2027-07-09-7-pm/concert/1"), [{ year: 2027, month: 7, day: 9 }]);
  assert.deepEqual(urlStatedDates("https://x.example/bruno-mars-tickets-7-10-2026/event/1"), []);
  assert.deepEqual(urlStatedDates("https://www.stubhub.ie/tom-jones-los-angeles-tickets-10-26-2026/event/107448275"), [{ year: 2026, month: 10, day: 26 }]);
  assert.deepEqual(urlStatedDates("https://www.stubhub.ie/act-tickets-26-10-2026/event/1"), [{ year: 2026, month: 10, day: 26 }]);
  assert.deepEqual(urlStatedDates("https://www.stubhub.ie/act-tickets-2-30-2026/event/1"), []);
  assert.equal(urlDateConflicts("https://www.stubhub.ie/act-tickets-10-26-2026/event/1", { year: 2026, month: 11, day: 4 }), true);
  assert.equal(urlDateConflicts("https://www.ticketmaster.com/ariana-grande-boston-07-22-2026/event/0100631AAEF23EE8", { year: 2026, month: 7, day: 23 }), false);
  assert.equal(urlDateConflicts("https://www.ticketmaster.com.example/act-07-22-2026/event/1", { year: 2026, month: 7, day: 23 }), true);
  assert.equal(urlDateConflicts("https://www.vividseats.com/ariana-grande-7-22-2026/production/5973685", { year: 2026, month: 7, day: 23 }), true);
  assert.deepEqual(urlStatedDates("https://x.example/tickets/1/Bruno-Mars-tickets-Accor"), []);
  const nightData = (events) => [events, [{ slug: "stadium-act", name: "Stadium Act" }], [{ slug: "stadium-act", review_status: "verified" }]];
  const runWith = (provider, events, candidates) => run({ provider, artist: "", limit: null, maxApiCalls: null, delayMs: 0, apply: false, json: false }, {
    now: new Date("2026-09-27T00:00:00Z"), data: nightData(events),
    async fetchCatalog() { return { candidates, complete: true, stopReason: "" }; }
  });
  const actions = (summary) => Object.fromEntries(summary.results.map((row) => [row.event_id, row.action]));
  // TicketNetwork supplies both a matinee and an evening performance at the
  // same venue. Match its explicit local start, never the catalog LaunchDate.
  const matinee = { ...night("matinee", 5), datetime_iso: "2027-03-05T03:00:00Z" };
  const evening = { ...night("evening", 5), datetime_iso: "2027-03-05T08:30:00Z" };
  const timedItem = { ...catalogItem, Name: "Stadium Act", Description: "Stadium Act Accor Stadium Sydney Olympic Park",
    Url: tn.normalizedUrl, Bullets: ["2027-03-05T14:00"], LaunchDate: "2027-03-04T19:00:00-08:00" };
  const timed = productCandidates(config, timedItem, "123")[0];
  assert.deepEqual(timed.localStartTimes, ["2027-03-05T14:00"]);
  assert.equal(evaluateCandidate(matinee, "Stadium Act", timed).ok, true);
  assert.deepEqual(evaluateCandidate(evening, "Stadium Act", timed).reasons, ["venue-local start time mismatch"]);
  const second = { ...timed, externalId: "9000002", normalizedUrl: "https://www.ticketnetwork.com/en/p/9000002", localStartTimes: ["2027-03-05T19:30"], searchableText: timed.searchableText.replace("14:00", "19:30") };
  const timedRun = await runWith("ticketnetwork", [matinee, evening], [timed, second]);
  assert.deepEqual(actions(timedRun), { matinee: "add", evening: "add" });
  assert.deepEqual(timedRun.results.map((row) => row.external_id), [timed.externalId, second.externalId]);
  const noTime = { ...timed, localStartTimes: [] };
  assert.deepEqual(actions(await runWith("ticketnetwork", [matinee, evening], [noTime])), { matinee: "conflict", evening: "conflict" });
  const untimedSecond = { ...second, localStartTimes: [] };
  // Regression: rejecting the known evening start must never promote an
  // untimed listing as the matinee by elimination (or verify a stored one).
  assert.deepEqual(actions(await runWith("ticketnetwork", [matinee], [second, noTime])), { matinee: "conflict" });
  assert.deepEqual(actions(await runWith("ticketnetwork", [evening], [timed, untimedSecond])), { evening: "conflict" });
  const malformedTime = productCandidates(config, { ...timedItem, Bullets: ["time TBA", "2027-03-05T99:99Z"] }, "123")[0];
  assert.deepEqual(actions(await runWith("ticketnetwork", [matinee], [second, malformedTime])), { matinee: "conflict" });
  const unverifiedUntimed = { ...matinee, ticketnetwork_url: noTime.normalizedUrl,
    provider_links: { ticketnetwork: { verified: false, event_id: noTime.externalId } } };
  assert.deepEqual(actions(await runWith("ticketnetwork", [unverifiedUntimed], [second, noTime])), { matinee: "conflict" });
  assert.deepEqual(actions(await runWith("ticketnetwork", [{ ...unverifiedUntimed,
    provider_links: { ticketnetwork: { verified: true, event_id: noTime.externalId } } }], [second, noTime])), { matinee: "none" }, "unresolved evidence does not clear a verified link");
  assert.deepEqual(actions(await runWith("ticketnetwork", [matinee], [timed, untimedSecond])), { matinee: "add" }, "an explicit matching start still qualifies");
  const wrongStoredMatinee = { ...matinee, ticketnetwork_url: second.normalizedUrl,
    provider_links: { ticketnetwork: { verified: true, event_id: second.externalId } } };
  assert.deepEqual(actions(await runWith("ticketnetwork", [wrongStoredMatinee], [second, noTime])), { matinee: "unverify" }, "explicitly disproven stored starts are not preserved");
  const vanishedStored = { ...wrongStoredMatinee, ticketnetwork_url: "https://www.ticketnetwork.com/en/p/9000003",
    provider_links: { ticketnetwork: { verified: true, event_id: "9000003" } } };
  assert.deepEqual(actions(await runWith("ticketnetwork", [vanishedStored], [second, noTime])), { matinee: "unverify" }, "a complete catalog's definitive absence is not preserved");
  const missingStartReport = await runWith("ticketnetwork", [matinee], [second, noTime]);
  assert.equal(missingStartReport.results[0].note, "ambiguous: missing or conflicting performance start evidence");
  assert.equal(missingStartReport.results[0].ambiguous_listing, undefined, "start evidence is distinct from cross-performance reuse");
  assert.deepEqual(missingStartReport.results[0].candidates, [`${second.externalId} @ 2027-03-05T19:30`, `${noTime.externalId} @ no start time`], "a conflict names the listings it is between");
  assert.match(renderLog(missingStartReport), /performance start evidence; candidates: 9000002 @ 2027-03-05T19:30, tn-1 @ no start time \|/);
  // Ticket Liquidator shares TicketNetwork's listing ids but has no start times.
  // A verified TicketNetwork id on the event picks the one tied listing it names.
  const tlSingle = { ...noTime, externalId: "7775510", normalizedUrl: "https://www.ticketliquidator.com/tickets/7775510" };
  const tlPackage = { ...noTime, externalId: "7775752", normalizedUrl: "https://www.ticketliquidator.com/tickets/7775752" };
  const tnVerified = (id, verified = true) => ({ ...matinee, provider_links: { ticketnetwork: { verified, event_id: id } } });
  const tlPick = await runWith("ticket-liquidator", [tnVerified("7775510")], [tlSingle, tlPackage]);
  assert.deepEqual(actions(tlPick), { matinee: "add" }, "a verified TicketNetwork id breaks a Ticket Liquidator tie");
  assert.equal(tlPick.results[0].external_id, "7775510");
  assert.deepEqual(actions(await runWith("ticket-liquidator", [tnVerified("7775510", false)], [tlSingle, tlPackage])), { matinee: "conflict" }, "an unverified TicketNetwork id is not evidence");
  assert.deepEqual(actions(await runWith("ticket-liquidator", [tnVerified("9999999")], [tlSingle, tlPackage])), { matinee: "conflict" }, "a TicketNetwork id matching neither listing leaves the tie");
  assert.deepEqual(actions(await runWith("ticketnetwork", [tnVerified("7775510")], [tlSingle, tlPackage])), { matinee: "conflict" }, "only Ticket Liquidator borrows TicketNetwork's id");
  const incompleteTimes = await run({ provider: "ticketnetwork", apply: false, delayMs: 0 }, {
    now: new Date("2026-09-27T00:00:00Z"), data: nightData([matinee]),
    async fetchCatalog() { return { candidates: [second, noTime], complete: false, stopReason: "pagination_cap" }; }
  });
  assert.equal(incompleteTimes.results[0].action, "none");
  assert.equal(incompleteTimes.results[0].note, "not checked: catalog incomplete (pagination_cap)");
  const conflictingTimes = productCandidates(config, { ...timedItem, Bullets: ["2027-03-05T14:00", "2027-03-05T19:30"] }, "123")[0];
  assert.equal(evaluateCandidate(matinee, "Stadium Act", conflictingTimes).ok, false);
  assert.equal(evaluateCandidate(evening, "Stadium Act", conflictingTimes).ok, false);
  assert.equal(evaluateCandidate({ ...matinee, datetime_iso: "2027-03-05T14:00:00+11:00", timezone: "" }, "Stadium Act", timed).ok, true);
  assert.equal(evaluateCandidate({ ...matinee, datetime_iso: "2027-03-05T14:00:00+11:00", timezone: "UTC" }, "Stadium Act", timed).ok, true);
  assert.equal(evaluateCandidate({ ...matinee, timezone: "" }, "Stadium Act", timed).ok, false);
  const winter = { ...matinee, datetime_iso: "2027-07-09T09:30:00Z" };
  assert.equal(eventLocalStart(winter), "2027-07-09T19:30");
  const wrongTimeStored = { ...evening, ticketnetwork_url: timed.normalizedUrl, provider_links: { ticketnetwork: { verified: true, event_id: timed.externalId } } };
  assert.deepEqual(actions(await runWith("ticketnetwork", [matinee, wrongTimeStored], [timed])), { matinee: "add", evening: "unverify" });
  assert.deepEqual(actions(await runWith("ticketnetwork", [wrongTimeStored], [timed])), { evening: "none" }, "unambiguous single-performance matches retain their existing gate");
  assert.deepEqual(productCandidates(providerConfig("stubhub-international"), { ...timedItem, Url: "https://www.stubhub.ie/event/123" }, "123")[0].localStartTimes, []);
  // 3. A URL without a date (TicketNetwork) cannot verify one listing against
  // two nights: neither night gets it.
  const fresh = await runWith("ticketnetwork", [night("n4", 4), night("n5", 5)], [tn]);
  assert.deepEqual(actions(fresh), { n4: "conflict", n5: "conflict" });
  assert.equal(fresh.results.every((row) => row.ambiguous_listing === undefined), true);
  // 9. After the wrong-night link is removed, the sync cannot restore it: the
  // right night keeps its verified link and the wrong night is not re-added.
  const held = { event_id: "9000001", url: tn.normalizedUrl, verified: true, last_verified_at: "2026-09-15", availability_status: "listed" };
  const corrected = await runWith("ticketnetwork", [night("n4", 4), { ...night("n5", 5, { ticketnetwork: held }), ticketnetwork_url: tn.normalizedUrl }], [tn]);
  assert.deepEqual(actions(corrected), { n4: "conflict", n5: "none" });
  // ...and a Ticket Liquidator link already stored on the wrong night is
  // unverified by the next complete catalog run, while the right night keeps its own.
  const tlHeld = { ...held, url: tl.normalizedUrl };
  const wrongStored = await runWith("ticket-liquidator", [
    { ...night("n4", 4, { "ticket-liquidator": tlHeld }), ticketliquidator_url: tl.normalizedUrl },
    { ...night("n5", 5, { "ticket-liquidator": tlHeld }), ticketliquidator_url: tl.normalizedUrl }
  ], [tl]);
  assert.deepEqual(actions(wrongStored), { n4: "unverify", n5: "none" });
  // 10. Every result carries the audit-log note the coverage report reads back.
  const notes = (summary) => Object.fromEntries(summary.results.map((row) => [row.event_id, row.note]));
  assert.equal(fresh.results.every((row) => row.note.startsWith("ambiguous:")), true);
  assert.deepEqual(notes(corrected), { n4: "ambiguous: missing or conflicting performance start evidence", n5: "ambiguous: missing or conflicting performance start evidence" });
  assert.equal(notes(wrongStored).n4, "no qualifying listing (the complete catalog no longer lists the stored link)");
  const unlisted = await runWith("ticketnetwork", [night("n5", 5)], []);
  assert.deepEqual(notes(unlisted), { n5: "no qualifying listing (complete catalog checked)" });
  const capped = await run({ provider: "ticketnetwork", artist: "", limit: null, maxApiCalls: null, delayMs: 0, apply: false, json: false }, {
    now: new Date("2026-09-27T00:00:00Z"), data: nightData([night("n5", 5)]),
    async fetchCatalog() { return { candidates: [], complete: false, stopReason: "api_call_limit" }; }
  });
  assert.deepEqual(notes(capped), { n5: "not checked: catalog incomplete (api_call_limit)" });
  // One passing listing in a partial catalog is not added: a later page could
  // hold a second one.
  assert.equal(decideOutcome({ storedUrl: "", storedVerified: false, storedCandidate: null, passing: [candidate], catalogComplete: false }).action, "none");
  const partial = await run({ provider: "ticketnetwork", artist: "", limit: null, maxApiCalls: null, delayMs: 0, apply: false, json: false }, {
    now: new Date("2026-09-27T00:00:00Z"), data: nightData([night("n5", 5)]),
    async fetchCatalog() { return { candidates: [{ ...tn, searchableText: "Stadium Act Accor Stadium Sydney Olympic Park 2027-03-05T17:00:00" }], complete: false, stopReason: "runtime_limit" }; }
  });
  assert.deepEqual([actions(partial), notes(partial)], [{ n5: "none" }, { n5: "not checked: catalog incomplete (runtime_limit)" }]);
  // 11. The log renders one outcome-table row per result, cells escaped.
  const log = renderLog({ ...unlisted, results: [{ ...unlisted.results[0], artist: "A | B" }] }, "2026-09-27T00:00:00.000Z");
  assert.match(log, /^# TicketNetwork event sync log$/m);
  assert.match(log, /^\| showId \| artist \| action \| TicketNetwork id \| url \| notes \|$/m);
  assert.match(log, /^\| n5 \| A \\\| B \| none \| - \| - \| no qualifying listing \(complete catalog checked\) \|$/m);
  assert.match(log, /^- Not checked \(catalog incomplete\): 0$/m);
  // 12. A filtered run keeps the other events' evidence: its own rows replace
  // theirs in place, others carry over, and an --artist run drops its artist's
  // rows it did not produce.
  const row = (id, artist, note) => ({ ...unlisted.results[0], event_id: id, artist, note });
  const previous = renderLog({ ...unlisted, results: [row("o1", "Other Act", "-"), row("n5", "Stadium Act", "no qualifying listing (complete catalog checked)"), row("gone", "Stadium Act", "ambiguous: several qualifying listings for this event"), row("o2", "Other Act", "-")] });
  const same = renderLog({ ...unlisted, results: [row("n5", "Stadium Act", "no qualifying listing (complete catalog checked)")] }, undefined, { previousLog: previous, filter: "artist stadium-act", scopeShowIds: new Set(["n5", "gone"]) });
  const table = (text) => text.split("\n").filter((line) => line.startsWith("| ")).join("\n");
  assert.equal(table(same), table(previous).split("\n").filter((line) => !line.startsWith("| gone ")).join("\n"));
  assert.match(same, /^- Filtered run \(artist stadium-act\): .*2 row\(s\) carried over/m);
  const limited = renderLog({ ...unlisted, results: [row("n5", "Stadium Act", "not checked: catalog incomplete (api_call_limit)"), row("new", "Stadium Act", "-")] }, undefined, { previousLog: previous, filter: "limit 2" });
  assert.deepEqual(table(limited).split("\n").slice(2).map((line) => line.slice(2).split(" | ")[0]), ["o1", "n5", "gone", "o2", "new"]);
  assert.match(limited, /^\| n5 \| .*api_call_limit\) \|$/m);
  assert.equal(mergeOutcomeRows("", [{ id: "a", line: "| a |" }]).rows.length, 1);
  // The artist order rotates with the key, so a capped run reaches everyone.
  const twoArtists = [[night("a1", 4), { ...night("b1", 5), artist_slug: "other-act" }], [{ slug: "stadium-act", name: "Stadium Act" }, { slug: "other-act", name: "Other Act" }], [{ slug: "stadium-act", review_status: "verified" }, { slug: "other-act", review_status: "verified" }]];
  const order = async (key) => {
    const seen = [];
    await run({ provider: "ticketnetwork", artist: "", limit: null, maxApiCalls: null, delayMs: 0, rotationKey: key, apply: false, json: false }, {
      now: new Date("2026-09-27T00:00:00Z"), data: twoArtists,
      async fetchCatalog(_c, name) { seen.push(name); return { candidates: [], complete: true, stopReason: "" }; }
    });
    return seen;
  };
  assert.deepEqual(await order(0), ["Stadium Act", "Other Act"]);
  assert.deepEqual(await order(1), ["Other Act", "Stadium Act"]);
  // Show-priority artists go before the rotation.
  const prioritised = [];
  await run({ provider: "ticketnetwork", artist: "", limit: null, maxApiCalls: null, delayMs: 0, rotationKey: 0, priorityArtists: ["other-act"], apply: false, json: false }, {
    now: new Date("2026-09-27T00:00:00Z"), data: twoArtists,
    async fetchCatalog(_c, name) { prioritised.push(name); return { candidates: [], complete: true, stopReason: "" }; }
  });
  assert.deepEqual(prioritised, ["Other Act", "Stadium Act"]);
  assert.deepEqual(parseArgs(["--priority-artists", "a, b"]).priorityArtists, ["a", "b"]);
  assert.deepEqual(parseArgs(["--priority-artists", ""]).priorityArtists, []);
  // Results (and so the log) keep selection order whatever the rotation, so
  // a rotated night with unchanged outcomes renders the same table.
  const resultOrder = async (key) => (await run({ provider: "ticketnetwork", artist: "", limit: null, maxApiCalls: null, delayMs: 0, rotationKey: key, apply: false, json: false }, {
    now: new Date("2026-09-27T00:00:00Z"), data: twoArtists,
    async fetchCatalog() { return { candidates: [], complete: true, stopReason: "" }; }
  })).results.map((row) => row.event_id);
  assert.deepEqual(await resultOrder(1), ["a1", "b1"]);
  assert.deepEqual(await resultOrder(1), await resultOrder(0));
  // A row logged under an old display name is still the artist's, by id.
  const renamed = renderLog({ ...unlisted, results: [row("old", "Old Stage Name", "no qualifying listing (complete catalog checked)"), row("o1", "Other Act", "-")] });
  assert.deepEqual(mergeOutcomeRows(renamed, [], new Set(["old"])).rows.map((line) => line.slice(2).split(" | ")[0]), ["o1"]);
  return 123;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) return console.log(usage());
  if (options.selfTest) return console.log(`Impact catalog provider sync self-test passed (${await selfTest()} checks).`);
  if (!options.provider) throw new Error("--provider is required");
  const summary = await run(options);
  const logPath = logPathFor(summary.provider);
  const filter = [options.artist ? `artist ${options.artist}` : "", options.limit != null ? `limit ${options.limit}` : ""].filter(Boolean).join(", ");
  const previousLog = filter ? await fs.readFile(logPath, "utf8").catch(() => "") : null;
  // An --artist run owns every row of that artist's events, keyed by id.
  const scopeShowIds = new Set();
  if (options.artist) {
    const events = JSON.parse(await fs.readFile(EVENTS_PATH, "utf8"));
    for (const event of events) if (clean(event?.artist_slug, 120) === options.artist) scopeShowIds.add(String(event.id));
  }
  await fs.writeFile(logPath, renderLog(summary, undefined, { previousLog, filter, scopeShowIds }));
  if (!options.json) console.log(`Audit log: ${path.relative(ROOT, logPath)}`);
  console.log(options.json ? JSON.stringify(summary, null, 2) : `${summary.provider} ${summary.mode}: ${summary.selected} selected, ${summary.changed} changed, ${summary.added} added, ${summary.verified} verified, ${summary.corrected} corrected, ${summary.cleared} cleared, ${summary.unverified} unverified, ${summary.conflicts} conflicts.`);
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((error) => { console.error(error?.stack || error); process.exitCode = 1; });

export { applyOutcome, mergeOutcomeRows, dateMatches, decideOutcome, outcomeNote, renderLog, enrichTicketLiquidatorCandidates, evaluateCandidate, eventLocalDate, listingsMatchingSeveralDates, parseArgs, run, selectEvents, urlDateConflicts, urlStatedDates };
