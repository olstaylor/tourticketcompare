#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
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
  normalizeProviderUrl,
  productCandidates,
  providerConfig
} from "./lib/impact-marketplace-providers.mjs";
// Shared venue-local date/instant resolution — the same rules the SeatGeek and
// Vivid Seats matchers use, so a given event resolves to one night everywhere.
import {
  eventInstantMs as eventInstant,
  eventLocalDateParts as eventLocalDate
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
  --apply                 Write public/data/events.json
                          (every completed run, dry or applied, rewrites
                          reports/provider-sync/<provider>-event-sync.md)
  --json                  Emit JSON summary
  --self-test             Run offline tests
`;
}

function parseArgs(argv) {
  const options = { provider: "", artist: "", limit: null, maxApiCalls: null, delayMs: DEFAULT_DELAY_MS, retryDelayMs: RETRY_DELAY_MS, deadline: null, rotationKey: null, apply: false, json: false, selfTest: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--apply") options.apply = true;
    else if (arg === "--json") options.json = true;
    else if (arg === "--self-test") options.selfTest = true;
    else if (arg === "-h" || arg === "--help") options.help = true;
    else if (["--provider", "--artist", "--limit", "--max-api-calls", "--delay-ms", "--max-runtime-minutes", "--rotation-key"].includes(arg)) {
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
// ("2027-03-05"). Numeric day/month forms ("7-10-2026") are skipped — their
// order differs between storefronts, so they prove nothing either way.
const URL_MONTHS = ["jan(?:uary)?", "feb(?:ruary)?", "mar(?:ch)?", "apr(?:il)?", "may", "june?", "july?", "aug(?:ust)?", "sep(?:t(?:ember)?)?", "oct(?:ober)?", "nov(?:ember)?", "dec(?:ember)?"];
const URL_MONTH_RE = new RegExp(`(?:^|[^a-z])(${URL_MONTHS.join("|")})[-_ ](\\d{1,2})[-_ ](\\d{4})(?!\\d)`, "gi");
const URL_DAY_MONTH_RE = new RegExp(`(?:^|[^0-9])(\\d{1,2})[-_ ](${URL_MONTHS.join("|")})[-_ ](\\d{4})(?!\\d)`, "gi");
const URL_ISO_RE = /(?:^|[^0-9])(\d{4})-(\d{2})-(\d{2})(?!\d)/g;

function monthIndex(name) {
  return URL_MONTHS.findIndex((pattern) => new RegExp(`^(?:${pattern})$`, "i").test(name)) + 1;
}

function urlStatedDates(url) {
  let pathname = "";
  try { pathname = decodeURIComponent(new URL(url).pathname); } catch { return []; }
  const dates = [];
  for (const match of pathname.matchAll(URL_MONTH_RE)) dates.push({ year: Number(match[3]), month: monthIndex(match[1]), day: Number(match[2]) });
  for (const match of pathname.matchAll(URL_DAY_MONTH_RE)) dates.push({ year: Number(match[3]), month: monthIndex(match[2]), day: Number(match[1]) });
  for (const match of pathname.matchAll(URL_ISO_RE)) dates.push({ year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) });
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

function evaluateCandidate(event, artistName, candidate) {
  const reasons = [];
  const text = candidate?.searchableText || "";
  if (!candidate?.normalizedUrl) reasons.push("invalid provider event URL");
  if (!containsNormalized(text, artistName)) reasons.push("artist name mismatch");
  if (!dateMatches(text, eventLocalDate(event))) reasons.push("venue-local date mismatch");
  else if (urlDateConflicts(candidate?.normalizedUrl, eventLocalDate(event))) reasons.push("provider URL names a different date");
  if (!cityMatches(text, event?.city)) reasons.push("city mismatch");
  if (!venueMatches(text, event?.venue)) reasons.push("venue mismatch");
  return { ok: reasons.length === 0, reasons, url: candidate?.normalizedUrl || "", externalId: candidate?.externalId || "" };
}

function decideOutcome({ storedUrl, storedVerified, storedCandidate, passing, catalogComplete }) {
  if (storedCandidate?.ok) return { action: storedVerified ? "none" : "verify", candidate: storedCandidate };
  if (passing.length > 1) return { action: "conflict", candidate: null };
  // One passing listing in a partial catalog is not proof it is the only one:
  // an unfetched page could hold a second (a conflict), so nothing is added.
  if (!catalogComplete) return { action: "none", candidate: null };
  if (passing.length === 1) return { action: storedUrl ? "correct" : "add", candidate: passing[0] };
  if (storedUrl) return { action: storedVerified ? "unverify" : "clear", candidate: null };
  return { action: "none", candidate: null };
}

// The per-event note written to the audit log. Its wording is the contract
// with `outcomeToCause` in scripts/report-link-coverage.mjs, which reads it
// back as a coverage cause: "not checked" = unprocessed, "no qualifying" =
// not listed, "ambiguous:" = ambiguous. A "-" note is not a cause.
function outcomeNote(action, { ambiguousListing = false, storedListed = false, catalogComplete = false, stopReason = "" } = {}) {
  if (ambiguousListing) return "ambiguous: one listing passes for performances on different nights";
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
    line: `| ${markdownCell(row.event_id)} | ${markdownCell(row.artist)} | ${markdownCell(row.action + (row.applied ? " (applied)" : ""))} | ${markdownCell(row.external_id)} | ${markdownCell(row.url)} | ${markdownCell(row.note)} |`
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
        response = await fetchImpl(catalogItemsUrl(config, artistName, page, env, PAGE_SIZE), {
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
    if (items.length < PAGE_SIZE || (Number.isFinite(total) && page * PAGE_SIZE >= total)) return { candidates, complete: true, stopReason: "" };
  }
  return { candidates, complete: false, stopReason: "pagination_cap" };
}

// Listing ids that pass the exact-event checks for performances on more than
// one venue-local date (a stored link that still passes counts for its row).
function listingsMatchingSeveralDates(evaluations) {
  const datesByListing = new Map();
  for (const { event, passing, storedCandidate } of evaluations) {
    const date = eventLocalDate(event);
    if (!date) continue;
    const key = `${date.year}-${date.month}-${date.day}`;
    const listings = passing.map((candidate) => candidate.externalId);
    if (storedCandidate?.ok) listings.push(storedCandidate.externalId);
    for (const listing of new Set(listings.filter(Boolean))) {
      if (!datesByListing.has(listing)) datesByListing.set(listing, new Set());
      datesByListing.get(listing).add(key);
    }
  }
  return new Set([...datesByListing].filter(([, dates]) => dates.size > 1).map(([listing]) => listing));
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
  const rotated = [...artistQueue.slice(start), ...artistQueue.slice(0, start)];
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
      const passing = catalog.candidates.map((candidate) => ({ candidate, evaluated: evaluateCandidate(event, artistName, candidate) })).filter((row) => row.evaluated.ok).map((row) => ({ ...row.evaluated, ...row.candidate }));
      const exactStored = catalog.candidates.find((candidate) => (storedId && candidate.externalId === storedId) || (storedUrl && candidate.normalizedUrl === storedUrl));
      const storedCandidate = exactStored ? { ...evaluateCandidate(event, artistName, exactStored), ...exactStored } : null;
      return { event, link, storedUrl, storedId, passing, storedCandidate };
    });
    const ambiguous = listingsMatchingSeveralDates(evaluations);
    for (const { event, link, storedUrl, storedId, passing, storedCandidate } of evaluations) {
      let outcome = decideOutcome({ storedUrl, storedVerified: link?.verified === true, storedCandidate, passing, catalogComplete: catalog.complete });
      // One listing is one performance. If it passes for performances on
      // different nights, nothing says which night it is: it is not written to
      // any of them. A link already stored and verified is left as it is.
      const ambiguousListing = Boolean(outcome.candidate && ambiguous.has(outcome.candidate.externalId) && ["verify", "add", "correct"].includes(outcome.action));
      if (ambiguousListing) outcome = { action: "conflict", candidate: null };
      const applied = options.apply && applyOutcome(event, config, outcome, (deps.now || new Date()).toISOString().slice(0, 10));
      const note = outcomeNote(outcome.action, { ambiguousListing, storedListed: Boolean(storedCandidate?.ok), catalogComplete: catalog.complete, stopReason: catalog.stopReason });
      results.push({ event_id: event.id, artist: artistName, action: outcome.action, applied, url: outcome.candidate?.url || storedUrl || "", external_id: outcome.candidate?.externalId || storedId || "", catalog_complete: catalog.complete, stop_reason: catalog.stopReason || "", note, ...(ambiguousListing ? { ambiguous_listing: true } : {}) });
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
  assert.deepEqual(urlStatedDates("https://x.example/tickets/1/Bruno-Mars-tickets-Accor"), []);
  const nightData = (events) => [events, [{ slug: "stadium-act", name: "Stadium Act" }], [{ slug: "stadium-act", review_status: "verified" }]];
  const runWith = (provider, events, candidates) => run({ provider, artist: "", limit: null, maxApiCalls: null, delayMs: 0, apply: false, json: false }, {
    now: new Date("2026-09-27T00:00:00Z"), data: nightData(events),
    async fetchCatalog() { return { candidates, complete: true, stopReason: "" }; }
  });
  const actions = (summary) => Object.fromEntries(summary.results.map((row) => [row.event_id, row.action]));
  // 3. A URL without a date (TicketNetwork) cannot verify one listing against
  // two nights: neither night gets it.
  const fresh = await runWith("ticketnetwork", [night("n4", 4), night("n5", 5)], [tn]);
  assert.deepEqual(actions(fresh), { n4: "conflict", n5: "conflict" });
  assert.equal(fresh.results.every((row) => row.ambiguous_listing === true), true);
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
  assert.deepEqual(notes(corrected), { n4: "ambiguous: one listing passes for performances on different nights", n5: "-" });
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
  return 86;
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
