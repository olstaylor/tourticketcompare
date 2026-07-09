#!/usr/bin/env node
//
// sync-vividseats-events.mjs
//
// Nightly Vivid Seats event-link sync (owner-approved 2026-07-09 — the
// fourth sanctioned automation path in SAFE_PUBLISHING_RULES.md, the Vivid
// Seats twin of scripts/verify-seatgeek-events.mjs). Unlike the SeatGeek
// loop, Vivid Seats has no per-event API — the single per-artist Impact
// Marketplace Products catalog fetch IS both the discovery set (events
// missing a URL) and the verification oracle (stored production id
// present-and-matching = verified; absent from a fully-paginated 2xx
// catalog = positive confirmed-gone evidence).
//
// What it does, per selected future event of a registry-verified artist
// (data/provider-identities.json review_status "verified"):
//
//   1. Fetch the artist's full Vivid Seats Marketplace Products catalog
//      (GET .../Marketplace/Products?Program=12730&Query=Name='<artist>'),
//      paginated up to 5 pages of 100. Program 12730 is the "Ticket Feed"
//      catalog (~159.7k items, refreshed daily by Impact).
//   2. If the event stores a vividseats_url, look up its production id
//      (Offers[0].Sku) in the catalog. Present + local-date/city/venue
//      match = verified. Present + mismatch, or absent from a
//      fully-paginated catalog = confirmed-gone evidence.
//   3. Otherwise (or on failure), treat every catalog item whose parsed
//      slug local date, city, and venue match the event as a discovery
//      candidate. Exactly one qualifying candidate may be applied; zero or
//      ambiguous candidates are reported, never guessed.
//   4. Self-heal in the safe direction, on POSITIVE evidence only. A
//      catalog fetch that hits the pagination cap is treated as incomplete
//      — no clears or un-verifies are issued for that artist's events on
//      an incomplete catalog (only adds/corrects/verifies, which need only
//      a positive match, not exhaustive absence).
//
// Safety properties (identical contract to verify-seatgeek-events.mjs):
//   - Without IMPACT_VIVIDSEATS_ACCOUNT_SID / IMPACT_VIVIDSEATS_AUTH_TOKEN
//     the script exits safely with no writes.
//   - 401/403 aborts the whole run, discards in-memory changes, exit 1.
//   - 5xx/network/parse failures leave events untouched (retried next run).
//   - Dry-run by default; --apply writes events.json + partition files and
//     refreshes the committed audit log. Never touches verification_status,
//     ticketmaster_*, seatgeek_*, or any other provider.
//   - Artist names containing an apostrophe are skipped (no SQL-escape
//     guessing against the Impact Query= parameter).
//   - Events whose datetime_iso/timezone cannot resolve to an unambiguous
//     local date are skipped — never guessed.
//
// Usage:
//   node scripts/sync-vividseats-events.mjs                  (dry-run report)
//   node scripts/sync-vividseats-events.mjs --apply          (write mode)
//   node scripts/sync-vividseats-events.mjs --artist <slug>  (filter)
//   node scripts/sync-vividseats-events.mjs --self-test      (offline tests)
// Options: --limit N, --max-api-calls N, --delay-ms N, --recheck-days N,
//          --json, --log-path <path>

import fs from "node:fs/promises";
import { execFile } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const EVENTS_PATH = path.join(REPO_ROOT, "public", "data", "events.json");
const EVENTS_PARTITIONS_DIR = path.join(REPO_ROOT, "public", "data", "events");
const ARTISTS_PATH = path.join(REPO_ROOT, "public", "data", "artists.json");
const REGISTRY_PATH = path.join(REPO_ROOT, "data", "provider-identities.json");
const LOG_PATH = path.join(REPO_ROOT, "docs", "VIVIDSEATS_CTA_SYNC_LOG.md");
const MARKETPLACE_PRODUCTS_PROGRAM = "12730";
const MARKETPLACE_PAGE_SIZE = 100;
const MARKETPLACE_MAX_PAGES = 5;
// Only future events are maintained: past shows render nowhere on the site.
const PAST_EVENT_GRACE_MS = 24 * 60 * 60 * 1000;
const DEFAULT_RECHECK_DAYS = 3;
const DEFAULT_REQUEST_DELAY_MS = 1000;
const REQUEST_TIMEOUT_MS = 30000;
const RATE_LIMIT_RETRY_MS = 65000;
const RATE_LIMIT_MAX_RETRIES = 2;

// ─── Pure helpers (covered by --self-test) ──────────────────────────────────

function clean(value, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

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

// Mirrors validateVividSeatsEventUrl in functions/api/out.js (fail-safe copy
// — out.js stays the runtime source of truth).
function isValidVividSeatsEventUrl(value) {
  const raw = clean(value, 2048);
  if (!raw) return false;
  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    return false;
  }
  if (parsed.protocol !== "https:") return false;
  const host = parsed.hostname.toLowerCase();
  if (host !== "vividseats.com" && host !== "www.vividseats.com") return false;
  const p = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
  if (!p || p === "/") return false;
  if (/^\/(search|venues?|performers?|artists?|category|concerts?|sports?|theater|theatre)(?:\/|$)/i.test(p)) return false;
  return /\/production\/\d+$/i.test(p);
}

// Id is in the path, not the query string; tracking is applied at click time
// by /api/out, so storing origin+pathname avoids exact-equality churn as
// Impact rotates utm_term and other query params on the feed.
function normalizeVividSeatsUrl(value) {
  const raw = clean(value, 2048);
  if (!raw) return "";
  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    return "";
  }
  return `${parsed.origin}${parsed.pathname}`.replace(/\/+$/, "");
}

function productionIdFromUrl(value) {
  const raw = clean(value, 2048);
  const match = raw.match(/\/production\/(\d+)\/?$/i);
  return match ? Number.parseInt(match[1], 10) : null;
}

// Splits the first path segment of a Vivid Seats production URL on the first
// "-tickets-" marker: "<artist>-tickets-<locationBlob>". The location blob is
// "<city>-<venue>-<M-D-YYYY>--<category>". Unparseable shapes fail the
// candidate rather than being guessed at.
function parseProductionSlug(url) {
  let parsed;
  try {
    parsed = new URL(clean(url, 2048));
  } catch {
    return null;
  }
  const path = decodeURIComponent(parsed.pathname || "/").replace(/^\/+/, "");
  const firstSegment = (path.split("/")[0] || "").toLowerCase();
  const marker = "-tickets-";
  const idx = firstSegment.indexOf(marker);
  if (idx === -1) return null;
  const locationBlob = firstSegment.slice(idx + marker.length);
  if (!locationBlob) return null;
  const dateMatch = locationBlob.match(/-(\d{1,2})-(\d{1,2})-(\d{4})(?:--|$)/);
  if (!dateMatch) return null;
  const month = Number.parseInt(dateMatch[1], 10);
  const day = Number.parseInt(dateMatch[2], 10);
  const year = Number.parseInt(dateMatch[3], 10);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return { locationBlob, localDate: { year, month, day } };
}

function localDatesEqual(a, b) {
  if (!a || !b) return false;
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

// UTC-offset of an IANA zone at a given instant, in ms (copied from
// verify-seatgeek-events.mjs).
function tzOffsetMs(timeZone, date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit"
  }).formatToParts(date);
  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const asUtc = Date.UTC(lookup.year, lookup.month - 1, lookup.day, lookup.hour, lookup.minute, lookup.second);
  return asUtc - date.getTime();
}

// Resolve an event's datetime_iso to a UTC instant (ms) or null when
// ambiguous (copied from verify-seatgeek-events.mjs).
function eventInstantMs(event) {
  const raw = clean(event?.datetime_iso, 100);
  if (!raw) return null;
  if (!/T\d{2}:\d{2}/.test(raw)) return null;
  const hasZone = /(?:Z|[+-]\d{2}:\d{2})$/i.test(raw);
  if (hasZone) {
    const parsed = new Date(raw);
    return Number.isNaN(parsed.getTime()) ? null : parsed.getTime();
  }
  const timeZone = clean(event?.timezone, 80);
  if (!timeZone || !timeZone.includes("/")) return null;
  const naiveUtc = new Date(`${raw}Z`);
  if (Number.isNaN(naiveUtc.getTime())) return null;
  try {
    let instant = naiveUtc.getTime() - tzOffsetMs(timeZone, naiveUtc);
    instant = naiveUtc.getTime() - tzOffsetMs(timeZone, new Date(instant));
    return instant;
  } catch {
    return null;
  }
}

// The Vivid Seats slug carries a local calendar date, not an instant — this
// resolves the event's own local date via its IANA timezone. No timezone (or
// no resolvable instant) is always ambiguous and is skipped, never guessed.
function eventLocalDate(event) {
  const instant = eventInstantMs(event);
  if (instant === null) return null;
  const timeZone = clean(event?.timezone, 80);
  if (!timeZone || !timeZone.includes("/")) return null;
  try {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric", month: "2-digit", day: "2-digit"
    }).formatToParts(new Date(instant));
    const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    return { year: Number.parseInt(lookup.year, 10), month: Number.parseInt(lookup.month, 10), day: Number.parseInt(lookup.day, 10) };
  } catch {
    return null;
  }
}

const METRO_PAIRS = new Set([
  "new york|east rutherford", "east rutherford|new york",
  "los angeles|inglewood", "inglewood|los angeles",
  "san francisco|santa clara", "santa clara|san francisco",
  "dallas|arlington", "arlington|dallas",
  "miami|miami gardens", "miami gardens|miami",
  "boston|foxborough", "foxborough|boston",
  "phoenix|glendale", "glendale|phoenix",
  "washington|landover", "landover|washington",
  "belmont park|elmont", "elmont|belmont park"
]);

function textTokens(value) {
  return normalizeText(value).split(" ").filter((token) => token.length > 1);
}

function diceSimilarity(a, b) {
  const aTokens = new Set(textTokens(a));
  const bTokens = new Set(textTokens(b));
  if (!aTokens.size || !bTokens.size) return 0;
  let overlap = 0;
  for (const token of aTokens) {
    if (bTokens.has(token)) overlap += 1;
  }
  return (2 * overlap) / (aTokens.size + bTokens.size);
}

function containsNormalized(haystack, needle) {
  const h = ` ${normalizeText(haystack)} `;
  const n = ` ${normalizeText(needle)} `;
  return Boolean(n.trim()) && h.includes(n);
}

function cityMatchesSlug(eventCity, locationBlob) {
  const cityNorm = normalizeText(eventCity);
  if (!cityNorm) return false;
  if (containsNormalized(locationBlob, eventCity)) return true;
  const blobNorm = normalizeText(locationBlob);
  for (const pair of METRO_PAIRS) {
    const [a, b] = pair.split("|");
    if (a === cityNorm && containsNormalized(blobNorm, b)) return true;
  }
  return false;
}

// The slug is "<city>-<venue>-<date>--<category>"; strip a leading city
// match so the venue comparison is not diluted by the city tokens.
function stripCityFromBlob(locationBlob, eventCity) {
  const blobNorm = normalizeText(locationBlob);
  const cityNorm = normalizeText(eventCity);
  if (cityNorm && blobNorm.startsWith(cityNorm)) {
    return blobNorm.slice(cityNorm.length).trim();
  }
  return blobNorm;
}

// Same containment/dice-similarity ≥ 0.5 threshold as
// verify-seatgeek-events.mjs's venueMatches, applied to the location blob
// with the city prefix removed (the remainder still carries date/category
// noise, which containment tolerates and dice's denominator absorbs).
function venueMatchesSlug(eventVenue, locationBlob, eventCity) {
  const local = clean(eventVenue, 180);
  if (!local) return false;
  const remainder = stripCityFromBlob(locationBlob, eventCity);
  if (!remainder) return false;
  if (containsNormalized(remainder, local)) return true;
  return diceSimilarity(remainder, local) >= 0.5;
}

// Evaluate one Marketplace Products catalog item (already parsed into a
// candidate shape) against one local event. Returns { ok, reasons }.
function evaluateCandidate(event, candidate, eventLocalDateVal) {
  const reasons = [];
  if (!isValidVividSeatsEventUrl(candidate?.normalizedUrl)) {
    reasons.push("candidate URL fails the event-URL shape validator");
  }
  if (!candidate?.parsedSlug) {
    reasons.push("candidate production slug did not parse (unrecognised shape)");
  } else if (!eventLocalDateVal) {
    reasons.push("event local date is ambiguous");
  } else if (!localDatesEqual(candidate.parsedSlug.localDate, eventLocalDateVal)) {
    reasons.push("local date mismatch — likely a different night");
  }
  const locationBlob = candidate?.parsedSlug?.locationBlob || "";
  if (!cityMatchesSlug(event.city, locationBlob)) {
    reasons.push(`city mismatch: '${clean(event.city)}' not found in the production slug`);
  }
  if (!venueMatchesSlug(event.venue, locationBlob, event.city)) {
    reasons.push(`venue mismatch: '${clean(event.venue)}' not found in the production slug`);
  }
  return { ok: reasons.length === 0, reasons, url: candidate?.normalizedUrl || "", sku: candidate?.sku ?? null };
}

// Decide what to do for one event given the verification/discovery outcome.
// Identical contract to verify-seatgeek-events.mjs's decideOutcome — pure so
// the branch matrix is testable offline, and reused unmodified because the
// action semantics (verify/add/correct/clear/unverify/none/conflict) are
// provider-agnostic.
//   idCheck   — evaluateCandidate result for the stored production id (or
//               null); null covers "not run", "no stored id", AND "id absent
//               from an incomplete (paginated-cap-hit) catalog" — the caller
//               only passes a confirmed-gone idCheck when the catalog was
//               fully paginated.
//   discovery — { candidates: [...] } from a fully-evaluated catalog, or
//               null when the catalog fetch failed/was incomplete and
//               produced zero candidates (so clear/unverify never fires on
//               inconclusive absence).
function decideOutcome({ storedUrl, storedVerified, idCheck, discovery }) {
  if (idCheck?.ok) {
    return { action: "verify", url: idCheck.url || storedUrl, sku: idCheck.sku, notes: [] };
  }
  const notes = idCheck ? idCheck.reasons.map((reason) => `stored URL failed: ${reason}`) : [];
  if (!discovery) {
    return { action: "none", url: "", sku: null, notes: [...notes, "discovery not run or catalog incomplete"] };
  }
  const passing = discovery.candidates;
  if (passing.length === 1) {
    const winner = passing[0];
    if (!storedUrl) return { action: "add", url: winner.url, sku: winner.sku, notes };
    return { action: "correct", url: winner.url, sku: winner.sku, notes };
  }
  if (passing.length > 1) {
    const conflictNotes = [...notes, `ambiguous: ${passing.length} qualifying Vivid Seats listings match this event`];
    if (storedUrl) return { action: "clear", url: "", sku: null, notes: conflictNotes };
    return { action: "conflict", url: "", sku: null, notes: conflictNotes };
  }
  // Zero qualifying candidates — only reachable with a fully-paginated 2xx catalog.
  if (storedVerified) return { action: "unverify", url: "", sku: null, notes: [...notes, "previously verified record no longer matches"] };
  if (storedUrl) return { action: "clear", url: "", sku: null, notes: [...notes, "no qualifying replacement found"] };
  return { action: "none", url: "", sku: null, notes: [...notes, "no qualifying Vivid Seats listing (may not be listed)"] };
}

// Mutate one event in place per the decided outcome (apply mode). Only
// vividseats_url and provider_links["vivid-seats"] are ever touched.
function applyOutcomeToEvent(event, outcome, today) {
  if (!event.provider_links || typeof event.provider_links !== "object") event.provider_links = {};
  const existing = (typeof event.provider_links["vivid-seats"] === "object" && event.provider_links["vivid-seats"]) || {};
  if (outcome.action === "verify" || outcome.action === "add" || outcome.action === "correct") {
    event.vividseats_url = outcome.url;
    event.provider_links["vivid-seats"] = {
      ...existing,
      event_id: outcome.sku,
      url: outcome.url,
      verified: true,
      last_verified_at: today,
      availability_status: "listed"
    };
    return true;
  }
  if (outcome.action === "clear" || outcome.action === "unverify") {
    event.vividseats_url = "";
    event.provider_links["vivid-seats"] = {
      ...existing,
      event_id: null,
      url: null,
      verified: false,
      last_verified_at: null,
      availability_status: "needs_recheck"
    };
    return true;
  }
  return false;
}

function isoDate(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

function daysSince(dateString, now = new Date()) {
  const then = new Date(`${clean(dateString, 10)}T00:00:00Z`);
  if (Number.isNaN(then.getTime())) return Infinity;
  return (now.getTime() - then.getTime()) / 86400000;
}

// Selection policy: FUTURE events only (see PAST_EVENT_GRACE_MS) of
// registry-verified artists whose Vivid Seats provenance is unverified
// (whether or not a URL is stored — covers both discovery and backfill) or
// verified-but-stale.
function selectEvents(events, registryBySlug, artistNameBySlug, options, now = new Date()) {
  const selected = [];
  const skipped = [];
  for (const event of events) {
    const slug = clean(event?.artist_slug, 120);
    if (options.artist && slug !== options.artist) continue;
    const storedUrl = clean(event?.vividseats_url, 2048);
    const vsLink = event?.provider_links?.["vivid-seats"];
    const verified = vsLink?.verified === true;
    const stale = verified && daysSince(vsLink?.last_verified_at, now) >= options.recheckDays;
    const wanted = !verified || stale;
    if (!wanted) continue;
    const registry = registryBySlug.get(slug);
    if (!registry || clean(registry.review_status) !== "verified") {
      skipped.push({ event, reason: "artist has no verified provider-identity registry entry" });
      continue;
    }
    const artistName = artistNameBySlug.get(slug);
    if (!artistName) {
      skipped.push({ event, reason: "artist has no name on record in public/data/artists.json" });
      continue;
    }
    if (artistName.includes("'")) {
      skipped.push({ event, reason: "artist name contains an apostrophe — no SQL-escape guessing against the Impact Query parameter" });
      continue;
    }
    const localDate = eventLocalDate(event);
    if (localDate === null) {
      skipped.push({ event, reason: "datetime_iso/timezone cannot resolve to an unambiguous local date — never guessed" });
      continue;
    }
    const instant = eventInstantMs(event);
    if (instant !== null && instant < now.getTime() - PAST_EVENT_GRACE_MS) {
      skipped.push({ event, reason: "event is in the past — nothing to maintain" });
      continue;
    }
    selected.push(event);
  }
  return { selected: options.limit === null ? selected : selected.slice(0, options.limit), skipped };
}

// ─── API access (curl, same pattern as verify-seatgeek-events.mjs) ─────────

function httpsJson(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const headerArgs = Object.entries(headers).flatMap(([key, value]) => ["-H", `${key}: ${value}`]);
    execFile(
      "curl",
      ["--silent", "--show-error", "--location", "--max-time", String(Math.ceil(REQUEST_TIMEOUT_MS / 1000)), ...headerArgs, "--write-out", "\n%{http_code}", url],
      { maxBuffer: 20 * 1024 * 1024 },
      (error, stdout, stderr) => {
        if (error) {
          reject(new Error(clean(stderr || error.message, 300)));
          return;
        }
        const markerIndex = stdout.lastIndexOf("\n");
        const body = markerIndex >= 0 ? stdout.slice(0, markerIndex) : stdout;
        const status = Number.parseInt(markerIndex >= 0 ? stdout.slice(markerIndex + 1).trim() : "0", 10) || 0;
        let payload = null;
        try {
          payload = body ? JSON.parse(body) : null;
        } catch {
          if (status >= 200 && status < 300) {
            reject(new Error(`Impact Marketplace API JSON parse failed after HTTP ${status}`));
            return;
          }
        }
        resolve({ status, ok: status >= 200 && status < 300, payload });
      }
    );
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function pacedRequest(url, headers, options, runState) {
  if (options.maxApiCalls !== null && runState.apiCalls >= options.maxApiCalls) {
    return { stopped: true, stopReason: "api_call_limit_reached" };
  }
  if (options.delayMs > 0) await sleep(options.delayMs);
  runState.apiCalls += 1;
  let response = await httpsJson(url, headers);
  let retries = 0;
  while (response.status === 429 && retries < RATE_LIMIT_MAX_RETRIES) {
    retries += 1;
    runState.rateLimitResponses += 1;
    await sleep(RATE_LIMIT_RETRY_MS * retries);
    response = await httpsJson(url, headers);
  }
  if (response.status === 429) {
    runState.rateLimitResponses += 1;
    return { stopped: true, stopReason: "rate_limited" };
  }
  return response;
}

function marketplaceProductsUrl(accountSid, artistName, page) {
  const params = new URLSearchParams({
    Program: MARKETPLACE_PRODUCTS_PROGRAM,
    Query: `Name='${artistName}'`,
    PageSize: String(MARKETPLACE_PAGE_SIZE),
    Page: String(page)
  });
  return `https://api.impact.com/Mediapartners/${encodeURIComponent(accountSid)}/Marketplace/Products?${params.toString()}`;
}

// Impact's Mediapartners API defaults to XML; without an explicit Accept
// header it returns HTTP 200 with an XML body, which fails JSON parsing
// downstream. functions/api/impact/products.js (the existing internal
// diagnostic for this same endpoint) sends the same header for the same
// reason.
function impactRequestHeaders(accountSid, authToken) {
  return {
    Accept: "application/json",
    Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`
  };
}

// Turn one Marketplace Products result row into a candidate. Rows without a
// usable Offers[0] (Sku + OriginalUrl) are dropped — never guessed.
function toCandidate(item) {
  const offer = Array.isArray(item?.Offers) ? item.Offers[0] : null;
  const sku = Number.parseInt(offer?.Sku, 10);
  const originalUrl = clean(offer?.OriginalUrl, 2048);
  if (!Number.isInteger(sku) || !originalUrl) return null;
  const normalizedUrl = normalizeVividSeatsUrl(originalUrl);
  if (!normalizedUrl) return null;
  return { sku, normalizedUrl, parsedSlug: parseProductionSlug(normalizedUrl) };
}

// Fetch one artist's full Marketplace Products catalog. Returns
// { candidates, complete, stopReason, authFailure }. `complete` is false when
// the pagination cap was hit before the API reported all results fetched —
// callers must never treat an incomplete catalog's zero-match as
// confirmed-gone evidence.
async function fetchArtistCatalog(artistName, accountSid, authToken, options, runState) {
  const headers = impactRequestHeaders(accountSid, authToken);
  const candidates = [];
  let total = null;
  for (let page = 1; page <= MARKETPLACE_MAX_PAGES; page += 1) {
    const response = await pacedRequest(marketplaceProductsUrl(accountSid, artistName, page), headers, options, runState);
    if (response.stopped) return { candidates, complete: false, stopReason: response.stopReason, authFailure: false };
    if (response.status === 401 || response.status === 403) {
      return { candidates, complete: false, stopReason: "auth_or_config_error", authFailure: true };
    }
    if (!response.ok || !response.payload || !Array.isArray(response.payload.Results)) {
      return { candidates, complete: false, stopReason: "api_error", authFailure: false, apiErrorStatus: response.status };
    }
    for (const item of response.payload.Results) {
      const candidate = toCandidate(item);
      if (candidate) candidates.push(candidate);
    }
    total = Number.isInteger(response.payload["@total"]) ? response.payload["@total"] : total;
    const fetchedSoFar = page * MARKETPLACE_PAGE_SIZE;
    if (response.payload.Results.length < MARKETPLACE_PAGE_SIZE || (total !== null && fetchedSoFar >= total)) {
      return { candidates, complete: true, stopReason: "", authFailure: false };
    }
  }
  // Exhausted MARKETPLACE_MAX_PAGES without confirming the catalog was fully
  // fetched — treat as incomplete so clears/un-verifies never fire on it.
  return { candidates, complete: false, stopReason: "", authFailure: false };
}

// ─── Partition sync (identical to verify-seatgeek-events.mjs) ──────────────

async function syncPartitions(events, changedIds) {
  const changedFiles = new Set();
  const bySlug = new Map();
  for (const event of events) {
    if (!changedIds.has(event.id)) continue;
    const slug = clean(event.artist_slug, 120);
    if (!slug) continue;
    if (!bySlug.has(slug)) bySlug.set(slug, new Map());
    bySlug.get(slug).set(event.id, event);
  }
  for (const [slug, updates] of bySlug) {
    const partitionPath = path.join(EVENTS_PARTITIONS_DIR, `${slug}.json`);
    let raw;
    try {
      raw = await fs.readFile(partitionPath, "utf8");
    } catch {
      continue;
    }
    const rows = JSON.parse(raw);
    if (!Array.isArray(rows)) continue;
    let changed = false;
    for (let i = 0; i < rows.length; i += 1) {
      const update = updates.get(rows[i]?.id);
      if (update) {
        rows[i] = update;
        changed = true;
      }
    }
    if (changed) {
      await fs.writeFile(partitionPath, `${JSON.stringify(rows, null, 2)}\n`);
      changedFiles.add(path.relative(REPO_ROOT, partitionPath));
    }
  }
  return [...changedFiles];
}

// ─── Reporting ──────────────────────────────────────────────────────────────

function markdownCell(value) {
  return String(Array.isArray(value) ? value.join("; ") : value ?? "").replace(/\s+/g, " ").replace(/\|/g, "\\|").trim() || "-";
}

function renderLog(results, skipped, summary) {
  const lines = [
    "# Vivid Seats CTA sync log",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "Written by `scripts/sync-vividseats-events.mjs`. Identity anchor: an",
    "exact-name Impact Marketplace Products query for a registry-verified",
    "artist; date anchor: the event's own local calendar date (via IANA",
    "timezone) against the Vivid Seats production slug date.",
    "",
    "## Run summary",
    "",
    `- Mode: ${summary.mode}`,
    `- Events selected: ${summary.selected}`,
    `- Events skipped before API checks: ${summary.preskipped}`,
    `- API calls made: ${summary.api_calls}`,
    `- Verified provenance written: ${summary.verified}`,
    `- URLs added: ${summary.added}`,
    `- URLs corrected: ${summary.corrected}`,
    `- URLs cleared: ${summary.cleared}`,
    `- Provenance un-verified: ${summary.unverified}`,
    `- Conflicts (ambiguous, untouched): ${summary.conflicts}`,
    `- No qualifying listing: ${summary.no_candidates}`,
    `- Transient API errors (untouched, retried next run): ${summary.api_errors}`,
    `- Stopped early: ${summary.stop_reason || "no"}`,
    "",
    "## Outcomes",
    "",
    "| showId | artist | action | Vivid Seats id | url | notes |",
    "| --- | --- | --- | --- | --- | --- |",
    ...results.map((row) => `| ${markdownCell(row.showId)} | ${markdownCell(row.artist)} | ${markdownCell(row.action + (row.applied ? " (applied)" : ""))} | ${markdownCell(row.sku)} | ${markdownCell(row.url)} | ${markdownCell(row.notes)} |`),
    "",
    "## Skipped before API checks",
    "",
    ...(skipped.length
      ? ["| showId | artist | reason |", "| --- | --- | --- |", ...skipped.map((row) => `| ${markdownCell(row.event.id)} | ${markdownCell(row.event.artist_slug)} | ${markdownCell(row.reason)} |`)]
      : ["- None"]),
    ""
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}

// ─── Self-test ──────────────────────────────────────────────────────────────

function selfTest() {
  const checks = [];
  const assert = (label, pass) => checks.push({ label, pass: !!pass });

  // URL shape + id extraction + normalization
  assert("valid production URL accepted", isValidVividSeatsEventUrl("https://vividseats.com/x-tickets-city-venue-7-9-2026--floor/production/12345"));
  assert("performer URL rejected", !isValidVividSeatsEventUrl("https://vividseats.com/performers/123"));
  assert("http rejected", !isValidVividSeatsEventUrl("http://vividseats.com/x/production/1"));
  assert(
    "normalize strips query/hash and trailing slash",
    normalizeVividSeatsUrl("https://www.vividseats.com/x-tickets-y/production/999/?utm_term=abc#frag") === "https://www.vividseats.com/x-tickets-y/production/999"
  );
  assert("production id extracted", productionIdFromUrl("https://vividseats.com/x/production/12345") === 12345);
  assert("production id missing returns null", productionIdFromUrl("https://vividseats.com/x/production/") === null);

  // Slug parsing
  const parsed = parseProductionSlug("https://vividseats.com/morgan-wallen-tickets-nashville-bridgestone-arena-7-9-2026--floor/production/1");
  assert("slug parses location blob", parsed?.locationBlob === "nashville-bridgestone-arena-7-9-2026--floor");
  assert("slug parses local date", parsed && parsed.localDate.year === 2026 && parsed.localDate.month === 7 && parsed.localDate.day === 9);
  assert("slug without -tickets- marker fails to parse", parseProductionSlug("https://vividseats.com/some-random-path/production/1") === null);
  assert("slug without a date fails to parse", parseProductionSlug("https://vividseats.com/x-tickets-nodatehere/production/1") === null);
  assert("localDatesEqual true for identical dates", localDatesEqual({ year: 2026, month: 7, day: 9 }, { year: 2026, month: 7, day: 9 }));
  assert("localDatesEqual false for different days", !localDatesEqual({ year: 2026, month: 7, day: 9 }, { year: 2026, month: 7, day: 10 }));

  // Local date resolution
  assert("naive datetime without timezone is ambiguous", eventLocalDate({ datetime_iso: "2026-07-06T20:00:00" }) === null);
  assert("date-only datetime is ambiguous even with a timezone", eventLocalDate({ datetime_iso: "2026-07-06", timezone: "America/New_York" }) === null);
  const localDate = eventLocalDate({ datetime_iso: "2026-07-06T20:00:00", timezone: "America/New_York" });
  assert("naive datetime with IANA timezone resolves local date", localDate && localDate.year === 2026 && localDate.month === 7 && localDate.day === 6);
  const lateNight = eventLocalDate({ datetime_iso: "2026-07-07T02:30:00Z", timezone: "America/Los_Angeles" });
  assert("zoned datetime resolves the venue-local calendar date, not the UTC date", lateNight && lateNight.month === 7 && lateNight.day === 6);

  // City / venue slug matching
  assert("exact city contained in blob matches", cityMatchesSlug("Nashville", "nashville-bridgestone-arena-7-9-2026--floor"));
  assert("missing city fails safe", !cityMatchesSlug("", "nashville-bridgestone-arena-7-9-2026--floor"));
  assert("wrong city rejected", !cityMatchesSlug("Reno", "nashville-bridgestone-arena-7-9-2026--floor"));
  assert(
    "metro city accepted",
    cityMatchesSlug("Inglewood", "los-angeles-kia-forum-7-9-2026--floor")
  );
  assert("venue containment in remainder matches", venueMatchesSlug("Bridgestone Arena", "nashville-bridgestone-arena-7-9-2026--floor", "Nashville"));
  assert("wrong venue rejected", !venueMatchesSlug("Allegiant Stadium", "nashville-bridgestone-arena-7-9-2026--floor", "Nashville"));
  assert("missing local venue fails safe", !venueMatchesSlug("", "nashville-bridgestone-arena-7-9-2026--floor", "Nashville"));

  // Candidate evaluation
  const dec20 = {
    normalizedUrl: "https://vividseats.com/olivia-rodrigo-tickets-las-vegas-t-mobile-arena-12-20-2026--floor/production/18211723",
    parsedSlug: { locationBlob: "las-vegas-t-mobile-arena-12-20-2026--floor", localDate: { year: 2026, month: 12, day: 20 } },
    sku: 18211723
  };
  const row = { city: "Las Vegas", venue: "T-Mobile Arena" };
  const rightDate = { year: 2026, month: 12, day: 20 };
  const wrongDate = { year: 2026, month: 12, day: 19 };
  assert("right-date listing verifies", evaluateCandidate(row, dec20, rightDate).ok);
  const wrongNight = evaluateCandidate(row, dec20, wrongDate);
  assert("wrong-night stored URL rejected", !wrongNight.ok && wrongNight.reasons.some((reason) => reason.includes("different night")));
  assert("ambiguous event local date rejected", !evaluateCandidate(row, dec20, null).ok);
  assert("city mismatch rejected", !evaluateCandidate({ ...row, city: "Reno" }, dec20, rightDate).ok);
  assert("venue mismatch rejected", !evaluateCandidate({ ...row, venue: "Allegiant Stadium" }, dec20, rightDate).ok);
  assert("unparsed slug rejected", !evaluateCandidate(row, { ...dec20, parsedSlug: null }, rightDate).ok);
  assert("invalid candidate URL rejected", !evaluateCandidate(row, { ...dec20, normalizedUrl: "https://vividseats.com/performers/1" }, rightDate).ok);

  // Decision matrix (structurally identical to verify-seatgeek-events.mjs)
  const good = { ok: true, reasons: [], url: dec20.normalizedUrl, sku: 18211723 };
  const bad = { ok: false, reasons: ["local date mismatch — likely a different night"], url: dec20.normalizedUrl, sku: 18211723 };
  assert("stored URL verifies", decideOutcome({ storedUrl: good.url, storedVerified: false, idCheck: good, discovery: null }).action === "verify");
  assert("failed stored URL + one candidate corrects", decideOutcome({ storedUrl: good.url, storedVerified: false, idCheck: bad, discovery: { candidates: [{ ...good, sku: 999, url: "https://vividseats.com/x/production/999" }] } }).action === "correct");
  assert("failed stored URL + no candidates (complete catalog) clears", decideOutcome({ storedUrl: good.url, storedVerified: false, idCheck: bad, discovery: { candidates: [] } }).action === "clear");
  assert("no stored URL + one candidate adds", decideOutcome({ storedUrl: "", storedVerified: false, idCheck: null, discovery: { candidates: [good] } }).action === "add");
  assert("no stored URL + no candidates is none", decideOutcome({ storedUrl: "", storedVerified: false, idCheck: null, discovery: { candidates: [] } }).action === "none");
  assert("ambiguous candidates conflict", decideOutcome({ storedUrl: "", storedVerified: false, idCheck: null, discovery: { candidates: [good, { ...good, sku: 2 }] } }).action === "conflict");
  assert("previously verified + gone unverifies", decideOutcome({ storedUrl: good.url, storedVerified: true, idCheck: bad, discovery: { candidates: [] } }).action === "unverify");
  assert("incomplete catalog (discovery null) never clears", decideOutcome({ storedUrl: good.url, storedVerified: false, idCheck: bad, discovery: null }).action === "none");

  // Write shape (must satisfy scripts/validate-events.py provider-links rules)
  const today = "2026-07-09";
  const eventToVerify = { id: "e1", vividseats_url: good.url, provider_links: { "vivid-seats": { event_id: null, url: null, verified: false, last_verified_at: null, availability_status: "not_checked" } } };
  applyOutcomeToEvent(eventToVerify, { action: "verify", url: good.url, sku: 18211723, notes: [] }, today);
  const written = eventToVerify.provider_links["vivid-seats"];
  assert("verify writes provenance", written.verified === true && written.url === eventToVerify.vividseats_url && written.event_id === 18211723 && written.last_verified_at === today && written.availability_status === "listed");
  const eventToClear = { id: "e2", vividseats_url: good.url, provider_links: { "vivid-seats": { verified: true, url: good.url, event_id: 18211723, last_verified_at: "2026-07-01", availability_status: "listed" } } };
  applyOutcomeToEvent(eventToClear, { action: "unverify", url: "", sku: null, notes: [] }, today);
  assert("unverify clears url and provenance", eventToClear.vividseats_url === "" && eventToClear.provider_links["vivid-seats"].verified === false && eventToClear.provider_links["vivid-seats"].last_verified_at === null);
  assert("none action writes nothing", applyOutcomeToEvent({ id: "e3" }, { action: "none", url: "", sku: null, notes: [] }, today) === false);

  // toCandidate
  assert("toCandidate builds a normalized candidate from a Marketplace row", (() => {
    const candidate = toCandidate({ Name: "Morgan Wallen", Offers: [{ Sku: "18211723", OriginalUrl: "https://vividseats.com/morgan-wallen-tickets-nashville-bridgestone-arena-7-9-2026--floor/production/18211723?utm_term=x" }] });
    return candidate?.sku === 18211723 && candidate.normalizedUrl === "https://vividseats.com/morgan-wallen-tickets-nashville-bridgestone-arena-7-9-2026--floor/production/18211723" && candidate.parsedSlug?.localDate.month === 7;
  })());
  assert("toCandidate rejects a row with no offers", toCandidate({ Name: "X", Offers: [] }) === null);
  assert("toCandidate rejects a non-numeric Sku", toCandidate({ Offers: [{ Sku: "abc", OriginalUrl: "https://vividseats.com/x/production/1" }] }) === null);

  // Selection policy
  const registryBySlug = new Map([
    ["ok-artist", { slug: "ok-artist", review_status: "verified" }],
    ["apostrophe-artist", { slug: "apostrophe-artist", review_status: "verified" }]
  ]);
  const artistNameBySlug = new Map([["ok-artist", "OK Artist"], ["apostrophe-artist", "O'Artist"]]);
  const selOptions = { artist: "", limit: null, recheckDays: DEFAULT_RECHECK_DAYS };
  const now = new Date("2026-07-09T12:00:00Z");
  const base = { artist_slug: "ok-artist", datetime_iso: "2026-09-01T00:00:00Z", timezone: "America/New_York", city: "X", venue: "Y" };
  const selection = selectEvents([
    { ...base, id: "s0", datetime_iso: "2026-05-15T22:30:00Z" },
    { ...base, id: "s1" },
    { ...base, id: "s2", vividseats_url: "https://vividseats.com/x/production/1" },
    { ...base, id: "s3", vividseats_url: "https://vividseats.com/x/production/2", provider_links: { "vivid-seats": { verified: true, url: "https://vividseats.com/x/production/2", last_verified_at: "2026-07-08" } } },
    { ...base, id: "s4", vividseats_url: "https://vividseats.com/x/production/3", provider_links: { "vivid-seats": { verified: true, url: "https://vividseats.com/x/production/3", last_verified_at: "2026-06-01" } } },
    { ...base, id: "s5", datetime_iso: "2026-09-01T20:00:00", timezone: "" },
    { id: "s6", artist_slug: "unknown-artist", datetime_iso: "2026-09-01T00:00:00Z" },
    { artist_slug: "apostrophe-artist", id: "s7", datetime_iso: "2026-09-01T00:00:00Z" }
  ], registryBySlug, artistNameBySlug, selOptions, now);
  const selectedIds = selection.selected.map((event) => event.id);
  assert("event with no url selected for discovery", selectedIds.includes("s1"));
  assert("unverified stored URL selected for backfill", selectedIds.includes("s2"));
  assert("fresh provenance not re-checked", !selectedIds.includes("s3"));
  assert("stale provenance re-checked", selectedIds.includes("s4"));
  assert("ambiguous datetime skipped with reason", selection.skipped.some((row) => row.event.id === "s5" && row.reason.includes("ambiguous")));
  assert("unregistered artist skipped with reason", selection.skipped.some((row) => row.event.id === "s6"));
  assert("apostrophe artist name skipped with reason", selection.skipped.some((row) => row.event.id === "s7" && row.reason.includes("apostrophe")));
  assert("past event skipped, never touched", !selectedIds.includes("s0") && selection.skipped.some((row) => row.event.id === "s0" && row.reason.includes("past")));

  let failed = 0;
  for (const check of checks) {
    if (!check.pass) failed += 1;
    console.log(`${check.pass ? "PASS" : "FAIL"}  ${check.label}`);
  }
  console.log(`\n${checks.length - failed}/${checks.length} checks passed.`);
  return failed === 0 ? 0 : 1;
}

// ─── Main ───────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const options = {
    apply: false,
    artist: "",
    limit: null,
    delayMs: DEFAULT_REQUEST_DELAY_MS,
    maxApiCalls: null,
    recheckDays: DEFAULT_RECHECK_DAYS,
    json: false,
    logPath: LOG_PATH,
    selfTest: false,
    help: false
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => {
      const value = argv[i + 1];
      if (value === undefined || value.startsWith("--")) throw new Error(`${arg} requires a value`);
      i += 1;
      return value;
    };
    if (arg === "--apply") options.apply = true;
    else if (arg === "--artist") options.artist = clean(next(), 120);
    else if (arg === "--limit") options.limit = Math.max(1, Number.parseInt(next(), 10) || 1);
    else if (arg === "--delay-ms") options.delayMs = Math.max(0, Number.parseInt(next(), 10) || 0);
    else if (arg === "--max-api-calls") options.maxApiCalls = Math.max(1, Number.parseInt(next(), 10) || 1);
    else if (arg === "--recheck-days") options.recheckDays = Math.max(0, Number.parseInt(next(), 10) || 0);
    else if (arg === "--json") options.json = true;
    else if (arg === "--log-path") options.logPath = path.resolve(REPO_ROOT, next());
    else if (arg === "--self-test") options.selfTest = true;
    else if (arg === "--help" || arg === "-h") options.help = true;
    else throw new Error(`Unknown option: ${arg}`);
  }
  return options;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log("See the header comment in scripts/sync-vividseats-events.mjs for usage.");
    return 0;
  }
  if (options.selfTest) return selfTest();

  const accountSid = clean(process.env.IMPACT_VIVIDSEATS_ACCOUNT_SID, 255);
  const authToken = clean(process.env.IMPACT_VIVIDSEATS_AUTH_TOKEN, 255);
  if (!accountSid || !authToken) {
    console.error("IMPACT_VIVIDSEATS_ACCOUNT_SID/IMPACT_VIVIDSEATS_AUTH_TOKEN are not set — nothing checked, nothing written (safe no-op).");
    return 0;
  }

  const events = JSON.parse(await fs.readFile(EVENTS_PATH, "utf8"));
  if (!Array.isArray(events)) throw new Error("public/data/events.json must contain an array");
  const registry = JSON.parse(await fs.readFile(REGISTRY_PATH, "utf8"));
  const registryBySlug = new Map((Array.isArray(registry?.artists) ? registry.artists : []).map((artist) => [clean(artist.slug), artist]));
  const artists = JSON.parse(await fs.readFile(ARTISTS_PATH, "utf8"));
  const artistNameBySlug = new Map((Array.isArray(artists) ? artists : []).map((artist) => [clean(artist.slug), clean(artist.name, 200)]));

  const now = new Date();
  const today = isoDate(now);
  const { selected, skipped } = selectEvents(events, registryBySlug, artistNameBySlug, options, now);
  const runState = { apiCalls: 0, rateLimitResponses: 0, stopReason: "" };
  const results = [];
  const changedIds = new Set();

  const eventsByArtist = new Map();
  for (const event of selected) {
    const slug = clean(event.artist_slug, 120);
    if (!eventsByArtist.has(slug)) eventsByArtist.set(slug, []);
    eventsByArtist.get(slug).push(event);
  }

  artistLoop:
  for (const [slug, artistEvents] of eventsByArtist) {
    if (runState.stopReason) break;
    const artistName = artistNameBySlug.get(slug);
    const catalog = await fetchArtistCatalog(artistName, accountSid, authToken, options, runState);
    if (catalog.authFailure) {
      runState.stopReason = "auth_or_config_error";
      break;
    }
    if (catalog.stopReason === "api_call_limit_reached" || catalog.stopReason === "rate_limited") {
      runState.stopReason = catalog.stopReason;
      break;
    }
    if (catalog.stopReason === "api_error") {
      for (const event of artistEvents) {
        results.push({
          showId: event.id,
          artist: slug,
          action: "api_error",
          sku: null,
          url: "",
          notes: [`Vivid Seats Marketplace Products query for '${artistName}' failed with HTTP ${catalog.apiErrorStatus || 0} — transient; nothing written, retried next run`],
          applied: false
        });
      }
      continue artistLoop;
    }

    const bySku = new Map(catalog.candidates.map((candidate) => [candidate.sku, candidate]));

    for (const event of artistEvents) {
      const localDate = eventLocalDate(event);
      const storedUrl = clean(event.vividseats_url, 2048);
      const storedId = isValidVividSeatsEventUrl(storedUrl) ? productionIdFromUrl(storedUrl) : null;
      const storedVerified = event?.provider_links?.["vivid-seats"]?.verified === true;

      let idCheck = null;
      if (storedId !== null) {
        const found = bySku.get(storedId);
        if (found) {
          idCheck = evaluateCandidate(event, found, localDate);
        } else if (catalog.complete) {
          idCheck = { ok: false, reasons: [`stored production id ${storedId} not found in the fully-paginated Vivid Seats catalog for '${artistName}' (confirmed gone)`], url: storedUrl, sku: storedId };
        }
        // else: catalog incomplete — inconclusive, idCheck stays null, falls through to discovery.
      }

      let discovery = null;
      if (!idCheck?.ok) {
        const seen = new Set();
        const passing = [];
        for (const candidate of catalog.candidates) {
          const evaluated = evaluateCandidate(event, candidate, localDate);
          if (evaluated.ok && !seen.has(evaluated.sku)) {
            seen.add(evaluated.sku);
            passing.push(evaluated);
          }
        }
        if (passing.length > 0 || catalog.complete) {
          discovery = { candidates: passing };
        }
        // else: catalog incomplete and zero matches — leave discovery null so
        // decideOutcome never clears/un-verifies on inconclusive absence.
      }

      const outcome = decideOutcome({ storedUrl, storedVerified, idCheck, discovery });
      const applied = options.apply ? applyOutcomeToEvent(event, outcome, today) : false;
      if (applied) changedIds.add(event.id);
      if (outcome.action === "correct" && storedUrl) outcome.notes.push(`replaced ${storedUrl}`);
      results.push({
        showId: event.id,
        artist: slug,
        action: outcome.action,
        sku: outcome.sku,
        url: outcome.url,
        notes: outcome.notes,
        applied
      });
    }
  }

  const authFailure = runState.stopReason === "auth_or_config_error";
  if (options.apply && changedIds.size > 0 && !authFailure) {
    await fs.writeFile(EVENTS_PATH, `${JSON.stringify(events, null, 2)}\n`);
    const partitionFiles = await syncPartitions(events, changedIds);
    console.error(`Wrote ${changedIds.size} event update(s) to events.json and ${partitionFiles.length} partition file(s). Run \`npm run events:update\` to refresh the inline fallback.`);
  } else if (authFailure && changedIds.size > 0) {
    console.error(`Auth/config failure mid-run — discarding ${changedIds.size} in-memory update(s); nothing written.`);
  }

  const count = (action) => results.filter((row) => row.action === action).length;
  const summary = {
    mode: options.apply ? "apply" : "dry-run",
    selected: selected.length,
    preskipped: skipped.length,
    api_calls: runState.apiCalls,
    rate_limit_responses: runState.rateLimitResponses,
    verified: count("verify"),
    added: count("add"),
    corrected: count("correct"),
    cleared: count("clear"),
    unverified: count("unverify"),
    conflicts: count("conflict"),
    no_candidates: results.filter((row) => row.action === "none").length,
    api_errors: count("api_error"),
    stop_reason: runState.stopReason,
    wrote_events_json: options.apply && changedIds.size > 0 && !authFailure
  };

  await fs.writeFile(options.logPath, renderLog(results, skipped, summary));

  if (options.json) {
    console.log(JSON.stringify({ summary, results, skipped: skipped.map((row) => ({ showId: row.event.id, reason: row.reason })) }, null, 2));
  } else {
    console.log(`Vivid Seats ${summary.mode} sync: ${summary.selected} selected, ${summary.verified} verified, ${summary.added} added, ${summary.corrected} corrected, ${summary.cleared} cleared, ${summary.unverified} un-verified, ${summary.conflicts} conflict(s), ${summary.no_candidates} without a qualifying listing, ${summary.preskipped} skipped pre-API.`);
    console.log(`API calls: ${summary.api_calls}${summary.stop_reason ? ` (stopped early: ${summary.stop_reason})` : ""}`);
    console.log(`Audit log: ${path.relative(REPO_ROOT, options.logPath)}`);
    for (const row of results) {
      if (row.action !== "none" || row.notes.length) {
        console.log(`  ${row.showId} [${row.artist}] → ${row.action}${row.applied ? " (applied)" : ""}${row.url ? ` ${row.url}` : ""}${row.notes.length ? ` — ${row.notes.join("; ")}` : ""}`);
      }
    }
  }
  if (authFailure) {
    console.error("Impact API rejected the credentials (HTTP 401/403) — run aborted with no writes. Check IMPACT_VIVIDSEATS_ACCOUNT_SID/IMPACT_VIVIDSEATS_AUTH_TOKEN.");
    return 1;
  }
  return 0;
}

main().then((code) => {
  process.exitCode = code;
}).catch((error) => {
  console.error(`Error: ${clean(error?.message || error, 500)}`);
  process.exitCode = 1;
});
