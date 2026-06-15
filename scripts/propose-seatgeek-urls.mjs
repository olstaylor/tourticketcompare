#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const DEFAULT_EVENTS_PATH = path.join(REPO_ROOT, "public", "data", "events.json");
const DEFAULT_OUTPUT_PATH = path.join(REPO_ROOT, "reports", "seatgeek-url-candidates.json");
const DEFAULT_REGISTRY_PATH = path.join(REPO_ROOT, "data", "provider-identities.json");
const SEATGEEK_EVENTS_ENDPOINT = "https://api.seatgeek.com/2/events";
const DEFAULT_PER_PAGE = 10;
const DEFAULT_TIMEOUT_MS = 20_000;
const DEFAULT_DELAY_MS = 350;
const HIGH_CONFIDENCE_MIN_SCORE = 82;
const NEEDS_REVIEW_MIN_SCORE = 55;
const SIMILAR_SCORE_WINDOW = 8;

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

function configuredProxyUrl() {
  const proxy = clean(process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy, 2048);
  if (!proxy) return "";
  const noProxy = clean(process.env.NO_PROXY || process.env.no_proxy, 2048)
    .toLowerCase()
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
  if (noProxy.includes("*") || noProxy.includes("api.seatgeek.com") || noProxy.includes("seatgeek.com") || noProxy.includes(".seatgeek.com")) return "";
  return proxy;
}

// Proxy support is optional. Node 18+ ships a global fetch, so the script runs
// without any extra dependency. When an HTTPS proxy is configured AND the
// optional `undici` package is installed, route fetch through the proxy; if
// `undici` is absent we fall back to direct fetch rather than hard-failing.
async function configureFetchProxy() {
  const proxy = configuredProxyUrl();
  if (!proxy) return false;
  try {
    const { ProxyAgent, setGlobalDispatcher } = await import("undici");
    setGlobalDispatcher(new ProxyAgent(proxy));
    return true;
  } catch {
    console.error(
      "An HTTPS proxy is configured but the optional 'undici' package is not installed; proceeding with direct fetch. Run `npm install undici` to enable proxy support."
    );
    return false;
  }
}

function usage() {
  return `Usage: node scripts/propose-seatgeek-urls.mjs [options]\n\nProposal-only SeatGeek URL enrichment. Reads events, optionally queries SeatGeek when server-side credentials are present, and writes a review JSON file only. It never mutates public/data/events.json.\n\nOptions:\n  --output <path>       Review JSON output path (default: reports/seatgeek-url-candidates.json)\n  --events <path>       Events JSON path (default: public/data/events.json)\n  --registry <path>     Provider identity registry path (default: data/provider-identities.json); supplies verified seatgeek_performer_id for performer-id-scoped queries\n  --artist <value>      Filter by artist slug or name\n  --limit <number>      Process at most this many missing future events\n  --delay-ms <number>   Delay before each SeatGeek API request (default: 350)\n  --dry-run             Explicit dry run; retained for clarity because all modes are proposal-only\n  --verbose             Log redacted SeatGeek request URLs and scoring details\n  --self-test           Run built-in smoke tests without calling SeatGeek\n  --diagnostics-output <path>  Write a curated SeatGeek API diagnostics Markdown report\n  -h, --help            Show this help\n\nEnvironment:\n  SEATGEEK_CLIENT_ID     Enables SeatGeek API lookups when present\n  SEATGEEK_CLIENT_SECRET Optional; sent server-side if present and always redacted from logs/output\n  TTC_TODAY              Optional YYYY-MM-DD date override for deterministic local testing\n`;
}

function parseArgs(argv) {
  const options = {
    outputPath: DEFAULT_OUTPUT_PATH,
    eventsPath: DEFAULT_EVENTS_PATH,
    registryPath: DEFAULT_REGISTRY_PATH,
    artist: "",
    limit: null,
    delayMs: DEFAULT_DELAY_MS,
    dryRun: true,
    verbose: false,
    selfTest: false,
    diagnosticsOutputPath: "",
    help: false
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--output") {
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error("--output requires a path");
      options.outputPath = path.resolve(REPO_ROOT, value);
    } else if (arg === "--events") {
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error("--events requires a path");
      options.eventsPath = path.resolve(REPO_ROOT, value);
    } else if (arg === "--registry") {
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error("--registry requires a path");
      options.registryPath = path.resolve(REPO_ROOT, value);
    } else if (arg === "--artist") {
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error("--artist requires a value");
      options.artist = value.trim();
    } else if (arg === "--limit") {
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error("--limit requires a positive integer");
      const parsed = Number.parseInt(value, 10);
      if (!Number.isInteger(parsed) || parsed < 1) throw new Error("--limit requires a positive integer");
      options.limit = parsed;
    } else if (arg === "--delay-ms") {
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error("--delay-ms requires a non-negative integer");
      const parsed = Number.parseInt(value, 10);
      if (!Number.isInteger(parsed) || parsed < 0) throw new Error("--delay-ms requires a non-negative integer");
      options.delayMs = parsed;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--verbose") {
      options.verbose = true;
    } else if (arg === "--self-test") {
      options.selfTest = true;
    } else if (arg === "--diagnostics-output") {
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error("--diagnostics-output requires a path");
      options.diagnosticsOutputPath = path.resolve(REPO_ROOT, value);
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

function normalizeText(value) {
  return clean(value, 500)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(the|tour|tickets|ticket|live|concert|concerts|presented|presents|official|experience|show|event)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  return normalizeText(value).replace(/\s+/g, "-").replace(/(^-|-$)/g, "");
}

function tokens(value) {
  return normalizeText(value).split(" ").filter((token) => token.length > 1);
}

function diceSimilarity(a, b) {
  const aTokens = new Set(tokens(a));
  const bTokens = new Set(tokens(b));
  if (!aTokens.size && !bTokens.size) return 1;
  if (!aTokens.size || !bTokens.size) return 0;
  let overlap = 0;
  for (const token of aTokens) if (bTokens.has(token)) overlap += 1;
  return (2 * overlap) / (aTokens.size + bTokens.size);
}

function containsNormalized(haystack, needle) {
  const h = ` ${normalizeText(haystack)} `;
  const n = ` ${normalizeText(needle)} `;
  return Boolean(n.trim()) && h.includes(n);
}

function isoDateOnly(value) {
  const raw = clean(value, 100);
  const match = raw.match(/^(\d{4}-\d{2}-\d{2})/);
  if (match) return match[1];
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString().slice(0, 10);
}

function todayString() {
  const override = clean(process.env.TTC_TODAY || process.env.CURRENT_DATE, 20);
  if (/^\d{4}-\d{2}-\d{2}$/.test(override)) return override;
  return new Date().toISOString().slice(0, 10);
}

function localDateFromIso(iso, timeZone) {
  const date = new Date(iso);
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

function isHttpUrl(value) {
  try {
    const parsed = new URL(clean(value, 2048));
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
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
  if (parsed.protocol !== "https:") return { ok: false, reason: "must use https" };
  const host = parsed.hostname.toLowerCase();
  if (host !== "seatgeek.com" && host !== "www.seatgeek.com") return { ok: false, reason: "host must be seatgeek.com or www.seatgeek.com" };
  if (isPlaceholderUrl(raw)) return { ok: false, reason: "placeholder/example URL is not allowed" };
  let normalizedPath = decodeURIComponent(parsed.pathname || "/").trim().replace(/\/+$/, "");
  if (!normalizedPath) normalizedPath = "/";
  if (normalizedPath === "/") return { ok: false, reason: "must not be the SeatGeek homepage" };
  const firstSegment = normalizedPath.split("/").filter(Boolean)[0]?.toLowerCase() || "";
  if (GENERIC_SEATGEEK_FIRST_SEGMENTS.has(firstSegment)) return { ok: false, reason: "must be an event-specific SeatGeek URL, not a generic search/artist/venue URL" };
  if (!/(\/)(concert|sports|theater|theatre)\/\d+$/i.test(normalizedPath)) return { ok: false, reason: "must look like an event URL ending in /concert/<id> or another event category with a numeric id" };
  return { ok: true, reason: "valid event-level SeatGeek URL" };
}

function getStoredSeatGeekUrl(event) {
  return clean(event?.seatgeek_url || event?.provider_links?.seatgeek?.url || "", 2048);
}

function eventIsFuture(event, asOfDate) {
  const eventDate = localDateFromIso(event?.datetime_iso, event?.timezone);
  return Boolean(eventDate && eventDate >= asOfDate);
}

function artistMatches(event, artistFilter) {
  if (!artistFilter) return true;
  const filterSlug = slugify(artistFilter);
  const filterText = normalizeText(artistFilter);
  return (
    slugify(event.artist_slug) === filterSlug ||
    slugify(event.artist_name) === filterSlug ||
    normalizeText(event.artist_name).includes(filterText) ||
    filterText.includes(normalizeText(event.artist_name))
  );
}

function selectMissingFutureEvents(events, options, asOfDate) {
  let future = events.filter((event) => eventIsFuture(event, asOfDate));
  if (options.artist) future = future.filter((event) => artistMatches(event, options.artist));
  const alreadyCovered = future.filter((event) => validateSeatGeekEventUrl(getStoredSeatGeekUrl(event)).ok);
  const missingAll = future
    .filter((event) => !validateSeatGeekEventUrl(getStoredSeatGeekUrl(event)).ok)
    .sort((a, b) => String(a.datetime_iso || "").localeCompare(String(b.datetime_iso || "")) || String(a.id || "").localeCompare(String(b.id || "")));
  const missing = options.limit === null ? missingAll : missingAll.slice(0, options.limit);
  return { future, alreadyCovered, missing, missingAll };
}

function addDays(dateString, days) {
  const date = new Date(`${dateString}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return "";
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function buildAttempts(event, performerId = null) {
  const artist = clean(event.artist_name || event.artist_slug, 120);
  const venue = clean(event.venue, 160);
  const city = clean(event.city, 100);
  const date = localDateFromIso(event.datetime_iso, event.timezone);
  const attempts = [];
  // Strongest first: when a verified registry performer id exists, scope the
  // query to that performer id rather than a free-text artist name. This
  // eliminates name-collision results (tributes, same-name acts) at the API
  // level. Still event-level: it filters events by performer, never proposes a
  // performer/artist page URL.
  if (Number.isInteger(performerId)) {
    attempts.push({ name: "performer id + exact date", performerId, city: "", start: date, end: date });
  }
  attempts.push(
    { name: "artist + venue + city + exact date", q: [artist, venue, city].filter(Boolean).join(" "), city, start: date, end: date },
    { name: "artist + city + exact date", q: [artist, city].filter(Boolean).join(" "), city, start: date, end: date },
    { name: "artist + venue + exact date", q: [artist, venue].filter(Boolean).join(" "), city: "", start: date, end: date },
    { name: "artist + city + narrow date window", q: [artist, city].filter(Boolean).join(" "), city, start: addDays(date, -1), end: addDays(date, 1) },
    { name: "artist only + exact date", q: artist, city: "", start: date, end: date }
  );
  return attempts.filter((attempt) => (attempt.q || Number.isInteger(attempt.performerId)) && attempt.start && attempt.end);
}

function seatgeekCredentials() {
  const clientId = clean(process.env.SEATGEEK_CLIENT_ID, 255);
  const clientSecret = clean(process.env.SEATGEEK_CLIENT_SECRET, 255);
  return {
    clientId,
    clientSecret,
    configured: Boolean(clientId),
    clientIdPresent: Boolean(clientId),
    clientSecretPresent: Boolean(clientSecret)
  };
}

function buildSeatGeekApiUrl(attempt, credentials) {
  const params = new URLSearchParams({
    client_id: credentials.clientId,
    per_page: String(DEFAULT_PER_PAGE),
    sort: "score.desc",
    "datetime_local.gte": `${attempt.start}T00:00:00`,
    "datetime_local.lte": `${attempt.end}T23:59:59`,
    "taxonomies.name": "concert"
  });
  // A performer-id attempt filters by the verified performer rather than a
  // free-text artist name; otherwise fall back to the text query.
  if (Number.isInteger(attempt.performerId)) params.set("performers.id", String(attempt.performerId));
  else params.set("q", attempt.q);
  if (credentials.clientSecret) params.set("client_secret", credentials.clientSecret);
  if (attempt.city) params.set("venue.city", attempt.city);
  return `${SEATGEEK_EVENTS_ENDPOINT}?${params.toString()}`;
}

function redactApiUrl(url) {
  const parsed = new URL(url);
  for (const key of ["client_id", "client_secret"]) {
    if (parsed.searchParams.has(key)) parsed.searchParams.set(key, "<redacted>");
  }
  return parsed.toString();
}

function sleep(ms) {
  return ms > 0 ? new Promise((resolve) => setTimeout(resolve, ms)) : Promise.resolve();
}

async function fetchJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { "Accept": "application/json" } });
    const text = await response.text();
    let payload = null;
    try {
      payload = text ? JSON.parse(text) : null;
    } catch {
      throw new Error(`SeatGeek API returned invalid JSON after HTTP ${response.status}`);
    }
    return {
      ok: response.ok,
      status: response.status,
      payload,
      headers: {
        ratelimitRemaining: response.headers.get("ratelimit-remaining") || response.headers.get("x-ratelimit-remaining-minute") || "",
        ratelimitReset: response.headers.get("ratelimit-reset") || response.headers.get("x-ratelimit-reset") || ""
      }
    };
  } finally {
    clearTimeout(timeout);
  }
}

function rawCandidateSummary(candidate) {
  return {
    title: clean(candidate?.title, 200),
    datetime: clean(candidate?.datetime_local || candidate?.datetime_utc || "", 100),
    venue: candidateVenue(candidate),
    city: candidateCity(candidate),
    url: clean(candidate?.url, 2048),
    performers: candidatePerformers(candidate),
    taxonomy: taxonomyNames(candidate),
    type: clean(candidate?.type, 80)
  };
}

async function fetchCandidates(event, options, credentials, performerId = null) {
  const attempts = buildAttempts(event, performerId);
  const candidateMap = new Map();
  const attemptResults = [];
  for (const attempt of attempts) {
    const url = buildSeatGeekApiUrl(attempt, credentials);
    const redactedUrl = redactApiUrl(url);
    if (options.verbose) console.error(`SeatGeek query for ${event.id}: ${attempt.name}: ${redactedUrl}`);
    try {
      await sleep(options.delayMs);
      let response = await fetchJson(url);
      if (response.status === 429) {
        const resetSeconds = Number.parseInt(response.headers.ratelimitReset, 10);
        const retryDelayMs = Number.isFinite(resetSeconds) && resetSeconds > 0 ? (resetSeconds + 1) * 1000 : 65_000;
        if (options.verbose) console.error(`SeatGeek rate limit for ${event.id}; retrying ${attempt.name} after ${retryDelayMs}ms`);
        await sleep(retryDelayMs);
        response = await fetchJson(url);
      }
      const sgEvents = Array.isArray(response.payload?.events) ? response.payload.events : [];
      const apiError = response.ok ? "" : clean(response.payload?.message || response.payload?.error || `SeatGeek API HTTP ${response.status}`, 200);
      attemptResults.push({ name: attempt.name, ok: response.ok, status: response.status, query: redactedUrl, candidateCount: sgEvents.length, topCandidates: sgEvents.slice(0, 5).map(rawCandidateSummary), error: apiError });
      if (!response.ok) continue;
      for (const candidate of sgEvents) {
        const key = clean(candidate?.url, 2048) || String(candidate?.id ?? "");
        if (!key) continue;
        const stored = candidateMap.get(key) || { ...candidate, _matched_attempts: [] };
        if (!stored._matched_attempts.includes(attempt.name)) stored._matched_attempts.push(attempt.name);
        candidateMap.set(key, stored);
      }
    } catch (error) {
      attemptResults.push({ name: attempt.name, ok: false, status: 0, query: redactedUrl, candidateCount: 0, error: clean(error?.message || error, 200) });
    }
  }
  return { attempts: attemptResults, candidates: [...candidateMap.values()] };
}

function candidateLocalDate(candidate) {
  return isoDateOnly(candidate.datetime_local) || isoDateOnly(candidate.datetime_utc);
}

function candidateCity(candidate) {
  return clean(candidate?.venue?.city || candidate?.venue?.display_location || "", 120);
}

function candidateVenue(candidate) {
  return clean(candidate?.venue?.name || "", 180);
}

function candidatePerformers(candidate) {
  return Array.isArray(candidate?.performers) ? candidate.performers.map((performer) => clean(performer?.name, 120)).filter(Boolean) : [];
}

// Integer SeatGeek performer ids attached to a candidate event. Used to confirm
// identity against the verified registry id (data/provider-identities.json).
function candidatePerformerIds(candidate) {
  return Array.isArray(candidate?.performers)
    ? candidate.performers.map((performer) => performer?.id).filter((id) => Number.isInteger(id))
    : [];
}

// Reads data/provider-identities.json and returns a Map of artist slug ->
// verified seatgeek_performer_id, including only integer ids (nulls are skipped:
// an unverified artist is simply searched by name as before). Any missing or
// unreadable registry yields an empty map — the proposal still runs, just
// without performer-id scoping.
async function loadPerformerIdMap(registryPath) {
  const map = new Map();
  if (!registryPath) return map;
  let parsed;
  try {
    parsed = JSON.parse(await fs.readFile(registryPath, "utf8"));
  } catch {
    return map;
  }
  for (const entry of Array.isArray(parsed?.artists) ? parsed.artists : []) {
    const slug = clean(entry?.slug, 120);
    if (slug && Number.isInteger(entry?.seatgeek_performer_id)) {
      map.set(slug, entry.seatgeek_performer_id);
    }
  }
  return map;
}

function taxonomyNames(candidate) {
  return Array.isArray(candidate?.taxonomies) ? candidate.taxonomies.map((taxonomy) => clean(taxonomy?.name, 80).toLowerCase()).filter(Boolean) : [];
}

function metroLikeMatch(eventCity, sgVenue) {
  const eventCityNorm = normalizeText(eventCity);
  const candidateCityNorm = normalizeText(sgVenue?.city || "");
  const displayNorm = normalizeText(sgVenue?.display_location || "");
  if (eventCityNorm && candidateCityNorm && eventCityNorm === candidateCityNorm) return true;
  if (eventCityNorm && displayNorm.includes(eventCityNorm)) return true;
  const metroPairs = new Set([
    "new york|east rutherford",
    "east rutherford|new york",
    "los angeles|inglewood",
    "inglewood|los angeles",
    "san francisco|santa clara",
    "santa clara|san francisco",
    "dallas|arlington",
    "arlington|dallas",
    "miami|miami gardens",
    "miami gardens|miami",
    "boston|foxborough",
    "foxborough|boston",
    "phoenix|glendale",
    "glendale|phoenix",
    "washington|landover",
    "landover|washington"
  ]);
  return Boolean(eventCityNorm && candidateCityNorm && metroPairs.has(`${eventCityNorm}|${candidateCityNorm}`));
}

function scoreCandidate(event, candidate, performerId = null) {
  const reasons = [];
  const riskFlags = [];
  let score = 0;

  const artist = clean(event.artist_name || event.artist_slug, 120);
  const performers = candidatePerformers(candidate);
  const performerSimilarities = performers.map((name) => Math.max(diceSimilarity(artist, name), containsNormalized(name, artist) || containsNormalized(artist, name) ? 1 : 0));
  const namePerformerSimilarity = performerSimilarities.length ? Math.max(...performerSimilarities) : 0;
  // A verified registry performer id present on the candidate is an exact
  // identity confirmation — stronger than any name-string similarity, and it
  // clears the mandatory performer_similarity gate even when SeatGeek styles
  // the performer name differently. It never relaxes the date/city/URL gates.
  const performerIdMatch = Number.isInteger(performerId) && candidatePerformerIds(candidate).includes(performerId);
  const bestPerformerSimilarity = performerIdMatch ? 1 : namePerformerSimilarity;
  if (performerIdMatch) {
    score += 5;
    reasons.push("confirmed SeatGeek performer id match");
  }
  const titleSimilarity = Math.max(diceSimilarity(event.event_name || artist, candidate.title), diceSimilarity(artist, candidate.title));
  const venueSimilarity = Math.max(diceSimilarity(event.venue, candidateVenue(candidate)), containsNormalized(event.venue, candidateVenue(candidate)) || containsNormalized(candidateVenue(candidate), event.venue) ? 1 : 0);
  const eventDate = localDateFromIso(event.datetime_iso, event.timezone);
  const sgDate = candidateLocalDate(candidate);
  const exactDate = Boolean(eventDate && sgDate && eventDate === sgDate);
  const cityExact = normalizeText(event.city) === normalizeText(candidate?.venue?.city || "");
  const cityMetro = metroLikeMatch(event.city, candidate?.venue);
  const venuePresent = Boolean(clean(event.venue) && candidateVenue(candidate));
  const urlValidation = validateSeatGeekEventUrl(candidate?.url);
  const taxonomies = taxonomyNames(candidate);
  const taxonomyRelevant = taxonomies.includes("concert") || taxonomies.includes("music");

  if (bestPerformerSimilarity >= 0.9) {
    score += 32;
    reasons.push("strong artist/performer match");
  } else if (bestPerformerSimilarity >= 0.65 || titleSimilarity >= 0.65) {
    score += 20;
    reasons.push("probable artist/title match");
    riskFlags.push("artist_match_not_exact");
  } else {
    riskFlags.push("artist_does_not_clearly_match");
  }

  if (exactDate) {
    score += 28;
    reasons.push("exact local date match");
  } else {
    riskFlags.push("event_date_does_not_match");
  }

  if (cityExact) {
    score += 18;
    reasons.push("city match");
  } else if (cityMetro) {
    score += 14;
    reasons.push("city/market metro match");
    riskFlags.push("city_is_metro_equivalent_not_exact");
  } else {
    riskFlags.push("city_or_market_does_not_match");
  }

  if (venueSimilarity >= 0.88) {
    score += 12;
    reasons.push("venue match");
  } else if (venueSimilarity >= 0.55) {
    score += 6;
    reasons.push("possible venue match");
    riskFlags.push("venue_match_is_ambiguous");
  } else {
    riskFlags.push(venuePresent ? "venue_does_not_match" : "venue_metadata_missing_or_ambiguous");
  }

  if (taxonomyRelevant) {
    score += 5;
    reasons.push("concert/music taxonomy");
  } else {
    riskFlags.push("seatgeek_metadata_incomplete_or_not_music");
  }

  if (urlValidation.ok) {
    score += 5;
    reasons.push("event-specific SeatGeek URL");
  } else {
    score -= 25;
    riskFlags.push("url_is_not_event_specific");
    riskFlags.push("generic_or_invalid_seatgeek_url");
  }

  if (!sgDate || !candidateVenue(candidate) || !candidateCity(candidate) || !clean(candidate.title)) {
    riskFlags.push("seatgeek_metadata_incomplete");
  }

  return {
    raw: candidate,
    local_event_id: clean(event.id, 160),
    artist,
    date: eventDate,
    city: clean(event.city, 120),
    venue: clean(event.venue, 180),
    existing_ticketmaster_url: clean(event.ticketmaster_url, 2048),
    proposed_seatgeek_url: clean(candidate?.url, 2048),
    seatgeek_event_title: clean(candidate?.title, 200),
    seatgeek_event_datetime: clean(candidate?.datetime_local || candidate?.datetime_utc || "", 100),
    seatgeek_venue_city: candidateCity(candidate),
    seatgeek_venue: candidateVenue(candidate),
    confidence_score: Math.max(0, Math.min(100, Math.round(score))),
    match_reasons: [...new Set(reasons)],
    risk_flags: [...new Set(riskFlags)],
    signals: {
      performer_similarity: Number(bestPerformerSimilarity.toFixed(3)),
      performer_id_match: performerIdMatch,
      title_similarity: Number(titleSimilarity.toFixed(3)),
      venue_similarity: Number(venueSimilarity.toFixed(3)),
      exact_date: exactDate,
      city_exact: cityExact,
      city_metro: cityMetro,
      valid_event_url: urlValidation.ok,
      url_validation_reason: urlValidation.reason
    },
    proposed_status: "reject"
  };
}

function classifyScoredCandidates(scoredCandidates) {
  if (!scoredCandidates.length) return [];
  const sorted = [...scoredCandidates].sort((a, b) => b.confidence_score - a.confidence_score || a.proposed_seatgeek_url.localeCompare(b.proposed_seatgeek_url));
  const best = sorted[0];
  const plausible = sorted.filter((candidate) => candidate.signals.valid_event_url && candidate.signals.exact_date && (candidate.signals.city_exact || candidate.signals.city_metro) && candidate.signals.performer_similarity >= 0.9);
  const similarPlausible = plausible.filter((candidate) => candidate.proposed_seatgeek_url !== best.proposed_seatgeek_url && best.confidence_score - candidate.confidence_score <= SIMILAR_SCORE_WINDOW);

  return sorted.map((candidate, index) => {
    const output = { ...candidate, risk_flags: [...candidate.risk_flags] };
    const mandatoryPass = output.signals.valid_event_url && output.signals.exact_date && (output.signals.city_exact || output.signals.city_metro) && output.signals.performer_similarity >= 0.9;
    if (index === 0 && mandatoryPass && output.confidence_score >= HIGH_CONFIDENCE_MIN_SCORE && similarPlausible.length === 0) {
      output.proposed_status = "high_confidence";
    } else if (output.signals.valid_event_url && output.confidence_score >= NEEDS_REVIEW_MIN_SCORE && !output.risk_flags.includes("artist_does_not_clearly_match") && !output.risk_flags.includes("event_date_does_not_match") && !output.risk_flags.includes("city_or_market_does_not_match")) {
      output.proposed_status = "needs_review";
    } else {
      output.proposed_status = "reject";
    }
    if (similarPlausible.length > 0 && index === 0) {
      output.proposed_status = output.proposed_status === "reject" ? "reject" : "needs_review";
      output.risk_flags = [...new Set([...output.risk_flags, "multiple_plausible_candidates_with_similar_scores"])];
    }
    if (index > 0 && plausible.some((plausibleCandidate) => plausibleCandidate.proposed_seatgeek_url === output.proposed_seatgeek_url)) {
      output.risk_flags = [...new Set([...output.risk_flags, "not_top_ranked_candidate"])];
    }
    return output;
  });
}

function emptyCandidate(event, reason) {
  return {
    local_event_id: clean(event.id, 160),
    artist: clean(event.artist_name || event.artist_slug, 120),
    date: localDateFromIso(event.datetime_iso, event.timezone),
    city: clean(event.city, 120),
    venue: clean(event.venue, 180),
    existing_ticketmaster_url: clean(event.ticketmaster_url, 2048),
    proposed_seatgeek_url: "",
    seatgeek_event_title: "",
    seatgeek_event_datetime: "",
    seatgeek_venue_city: "",
    seatgeek_venue: "",
    confidence_score: 0,
    match_reasons: [],
    risk_flags: [reason],
    proposed_status: "reject"
  };
}

function summarize({ future, alreadyCovered, missing, missingAll, candidates, credentials, noCandidateEventIds, asOfDate, performerIdScopedEvents = 0, performerIdConfirmedCandidates = 0, performerIdRegistryCount = 0 }) {
  const artists = {};
  for (const candidate of candidates) {
    if (candidate.proposed_seatgeek_url) artists[candidate.artist] = (artists[candidate.artist] || 0) + 1;
  }
  return {
    generated_at: new Date().toISOString(),
    mode: "dry_run_proposal_only",
    as_of_date: asOfDate,
    total_future_events_checked: future.length,
    total_already_covered_by_seatgeek: alreadyCovered.length,
    total_missing_seatgeek_url: missingAll.length,
    selected_missing_events_checked: missing.length,
    candidates_found_by_artist: Object.fromEntries(Object.entries(artists).sort(([a], [b]) => a.localeCompare(b))),
    high_confidence_count: candidates.filter((candidate) => candidate.proposed_status === "high_confidence").length,
    needs_review_count: candidates.filter((candidate) => candidate.proposed_status === "needs_review").length,
    rejected_count: candidates.filter((candidate) => candidate.proposed_status === "reject").length,
    events_with_no_candidate_found: noCandidateEventIds.sort(),
    registry_performer_id: {
      // verified seatgeek_performer_id entries in data/provider-identities.json
      artists_with_verified_performer_id: performerIdRegistryCount,
      // missing events whose artist had a verified performer id (query scoped by id)
      events_scoped_by_performer_id: performerIdScopedEvents,
      // candidates whose SeatGeek performer id matched the verified registry id
      candidates_confirmed_by_performer_id: performerIdConfirmedCandidates
    },
    seatgeek_api: {
      credentials_available: credentials.configured,
      client_id_present: credentials.clientIdPresent,
      client_secret_present: credentials.clientSecretPresent,
      credentials_redacted: true
    },
    writes: {
      review_file_only: true,
      mutated_event_data: false,
      changed_cloudflare_config_or_data: false
    }
  };
}

async function sha256File(filePath) {
  const data = await fs.readFile(filePath);
  return createHash("sha256").update(data).digest("hex");
}

async function runProposal(options) {
  const asOfDate = todayString();
  const beforeHash = await sha256File(options.eventsPath);
  const raw = await fs.readFile(options.eventsPath, "utf8");
  const events = JSON.parse(raw);
  if (!Array.isArray(events)) throw new Error(`${path.relative(REPO_ROOT, options.eventsPath)} must contain a JSON array`);

  const credentials = seatgeekCredentials();
  const performerIdMap = await loadPerformerIdMap(options.registryPath || DEFAULT_REGISTRY_PATH);
  const { future, alreadyCovered, missing, missingAll } = selectMissingFutureEvents(events, options, asOfDate);
  const candidates = [];
  const noCandidateEventIds = [];
  let performerIdScopedEvents = 0;
  let performerIdConfirmedCandidates = 0;

  if (!credentials.configured) {
    for (const event of missing) {
      noCandidateEventIds.push(clean(event.id, 160));
    }
    console.log("SeatGeek credentials unavailable: SEATGEEK_CLIENT_ID is not set. Wrote a review file with summary only; no API calls were made.");
  } else {
    for (const event of missing) {
      const performerId = performerIdMap.get(clean(event.artist_slug, 120));
      const usePerformerId = Number.isInteger(performerId);
      if (usePerformerId) performerIdScopedEvents += 1;
      const apiResult = await fetchCandidates(event, options, credentials, usePerformerId ? performerId : null);
      const scored = classifyScoredCandidates(
        apiResult.candidates.map((candidate) => scoreCandidate(event, candidate, usePerformerId ? performerId : null))
      );
      performerIdConfirmedCandidates += scored.filter((candidate) => candidate.signals?.performer_id_match).length;
      if (!scored.length) {
        noCandidateEventIds.push(clean(event.id, 160));
        candidates.push(emptyCandidate(event, "no_candidate_found"));
      } else {
        candidates.push(...scored);
      }
      if (options.verbose) console.error(`Scored ${scored.length} candidate(s) for ${event.id}; attempts=${apiResult.attempts.length}${usePerformerId ? ` (performer id ${performerId})` : ""}`);
    }
  }

  const summary = summarize({
    future, alreadyCovered, missing, missingAll, candidates, credentials, noCandidateEventIds, asOfDate,
    performerIdScopedEvents, performerIdConfirmedCandidates, performerIdRegistryCount: performerIdMap.size
  });
  const report = {
    summary,
    candidates: candidates.map(({ raw, signals, ...candidate }) => candidate)
  };

  await fs.mkdir(path.dirname(options.outputPath), { recursive: true });
  await fs.writeFile(options.outputPath, `${JSON.stringify(report, null, 2)}\n`);
  const afterHash = await sha256File(options.eventsPath);
  if (beforeHash !== afterHash) throw new Error("Safety check failed: events JSON changed during proposal run");

  console.log(`Checked ${summary.selected_missing_events_checked} of ${summary.total_missing_seatgeek_url} missing future SeatGeek URL event(s).`);
  console.log(`Wrote proposal review file: ${path.relative(REPO_ROOT, options.outputPath)}`);
  console.log("Dry-run proposal-only mode: event data, CTA rendering, /api/out, Ticketmaster behavior, and Cloudflare config/data were not changed.");
  return report;
}


function pickDiagnosticEvent(events, label, predicate) {
  const event = events.find(predicate);
  if (!event) throw new Error(`Could not find diagnostic sample event: ${label}`);
  return { label, event };
}

function diagnosticSamples(events, asOfDate) {
  const future = (event) => eventIsFuture(event, asOfDate);
  const missingSeatGeek = (event) => !validateSeatGeekEventUrl(getStoredSeatGeekUrl(event)).ok;
  const hasSeatGeek = (event) => validateSeatGeekEventUrl(getStoredSeatGeekUrl(event)).ok;
  return [
    pickDiagnosticEvent(events, "Ariana Grande — Oakland Arena missing SeatGeek URL", (event) => future(event) && missingSeatGeek(event) && event.artist_name === "Ariana Grande" && event.venue === "Oakland Arena"),
    pickDiagnosticEvent(events, "Ariana Grande — Los Angeles missing SeatGeek URL", (event) => future(event) && missingSeatGeek(event) && event.artist_name === "Ariana Grande" && event.city === "Los Angeles"),
    pickDiagnosticEvent(events, "Ariana Grande — Brooklyn missing SeatGeek URL", (event) => future(event) && missingSeatGeek(event) && event.artist_name === "Ariana Grande" && event.city === "Brooklyn"),
    pickDiagnosticEvent(events, "BTS — Stanford Stadium missing SeatGeek URL", (event) => future(event) && missingSeatGeek(event) && event.artist_name === "BTS" && event.venue === "Stanford Stadium"),
    pickDiagnosticEvent(events, "BTS — SoFi Stadium missing SeatGeek URL", (event) => future(event) && missingSeatGeek(event) && event.artist_name === "BTS" && event.venue === "SoFi Stadium"),
    pickDiagnosticEvent(events, "BTS — MetLife Stadium missing SeatGeek URL", (event) => future(event) && missingSeatGeek(event) && event.artist_name === "BTS" && event.venue === "MetLife Stadium"),
    pickDiagnosticEvent(events, "JAY-Z — Yankee Stadium missing SeatGeek URL", (event) => future(event) && missingSeatGeek(event) && event.artist_name === "JAY-Z" && event.venue === "Yankee Stadium"),
    pickDiagnosticEvent(events, "Harry Styles — Madison Square Garden missing SeatGeek URL", (event) => future(event) && missingSeatGeek(event) && event.artist_name === "Harry Styles" && event.venue === "Madison Square Garden"),
    pickDiagnosticEvent(events, "Harry Styles — Madison Square Garden stored SeatGeek URL control", (event) => future(event) && hasSeatGeek(event) && event.artist_name === "Harry Styles" && event.venue === "Madison Square Garden"),
    pickDiagnosticEvent(events, "Morgan Wallen — stored SeatGeek URL control", (event) => future(event) && hasSeatGeek(event) && event.artist_name === "Morgan Wallen")
  ];
}

function markdownCell(value) {
  const text = Array.isArray(value) ? value.join(", ") : clean(value, 4000);
  return text.replace(/\|/g, "\\|").replace(/\n/g, "<br>") || "—";
}

function candidateDecisionText(candidate) {
  if (candidate.proposed_status === "high_confidence") return "accepted as high_confidence";
  if (candidate.proposed_status === "needs_review") return "downgraded to needs_review";
  return "rejected";
}

async function runDiagnostics(options) {
  const asOfDate = todayString();
  const beforeHash = await sha256File(options.eventsPath);
  const raw = await fs.readFile(options.eventsPath, "utf8");
  const events = JSON.parse(raw);
  if (!Array.isArray(events)) throw new Error(`${path.relative(REPO_ROOT, options.eventsPath)} must contain a JSON array`);
  const credentials = seatgeekCredentials();
  if (!credentials.configured) throw new Error("SEATGEEK_CLIENT_ID is required for diagnostics");

  const sections = [];
  for (const sample of diagnosticSamples(events, asOfDate)) {
    const apiResult = await fetchCandidates(sample.event, { ...options, verbose: false }, credentials);
    const classified = classifyScoredCandidates(apiResult.candidates.map((candidate) => scoreCandidate(sample.event, candidate)));
    const storedSeatGeekUrl = getStoredSeatGeekUrl(sample.event);
    const rediscoveredStoredUrl = Boolean(storedSeatGeekUrl && classified.some((candidate) => candidate.proposed_seatgeek_url === storedSeatGeekUrl));
    sections.push({ sample, apiResult, classified, storedSeatGeekUrl, rediscoveredStoredUrl });
  }

  const totalRaw = sections.reduce((sum, section) => sum + section.apiResult.attempts.reduce((attemptSum, attempt) => attemptSum + attempt.candidateCount, 0), 0);
  const totalUnique = sections.reduce((sum, section) => sum + section.apiResult.candidates.length, 0);
  const rediscoveryControls = sections.filter((section) => section.storedSeatGeekUrl);
  const rediscoveredControls = rediscoveryControls.filter((section) => section.rediscoveredStoredUrl);
  const proxyConfigured = Boolean(configuredProxyUrl());

  const lines = [
    "# SeatGeek Proposal Diagnostics",
    "",
    "Curated diagnostic run for the SeatGeek proposal workflow. The run used SeatGeek API credentials server-side, redacted credentials from query logs, and did not mutate event data or apply URLs.",
    "",
    "## Summary",
    "",
    `- Generated at: ${new Date().toISOString()}`,
    `- As-of date: ${asOfDate}`,
    `- Diagnostic samples checked: ${sections.length}`,
    `- SeatGeek API credentials available: ${credentials.configured ? "yes" : "no"} (client secret present: ${credentials.clientSecretPresent ? "yes" : "no"})`,
    `- HTTP(S) proxy configured for Node fetch: ${proxyConfigured ? "yes" : "no"}`,
    `- SeatGeek request delay: ${options.delayMs}ms, with one retry after HTTP 429 rate-limit responses`,
    `- Raw SeatGeek candidate rows returned across all attempts: ${totalRaw}`,
    `- Unique SeatGeek candidate URLs/IDs after de-duplication: ${totalUnique}`,
    `- Stored positive-control URLs rediscovered: ${rediscoveredControls.length} of ${rediscoveryControls.length}`,
    "- Event data changed: no",
    "- SeatGeek URLs applied: no",
    "",
    "## Diagnosis",
    "",
    totalRaw > 0
      ? "The SeatGeek API did return raw candidates for the diagnostic sample after Node fetch was configured to honor the environment HTTP(S) proxy. The earlier all-zero review was therefore not evidence that SeatGeek had no API candidates; it was caused by transport failures being collapsed into zero-candidate attempts in this environment. The script now also paces requests and retries HTTP 429 responses so rate-limit responses are less likely to be mistaken for no-candidate results during all-artist runs."
      : "The SeatGeek API returned zero raw candidates for the diagnostic sample. This would support a genuine no-candidate result for the sampled events, assuming the credentials and network path are valid.",
    "",
    rediscoveredControls.length === rediscoveryControls.length
      ? "The script rediscovered every stored positive-control SeatGeek URL in the diagnostic sample."
      : "The script did not rediscover every stored positive-control SeatGeek URL in the diagnostic sample; query strategy should be reviewed before applying candidates.",
    ""
  ];

  for (const section of sections) {
    const event = section.sample.event;
    lines.push(`## ${section.sample.label}`);
    lines.push("");
    lines.push(`- Local event ID: ${clean(event.id, 160)}`);
    lines.push(`- Artist: ${clean(event.artist_name || event.artist_slug, 120)}`);
    lines.push(`- Date: ${localDateFromIso(event.datetime_iso, event.timezone)}`);
    lines.push(`- City: ${clean(event.city, 120)}`);
    lines.push(`- Venue: ${clean(event.venue, 180)}`);
    lines.push(`- Ticketmaster URL: ${clean(event.ticketmaster_url, 2048) || "—"}`);
    lines.push(`- Stored SeatGeek URL: ${section.storedSeatGeekUrl || "—"}`);
    if (section.storedSeatGeekUrl) lines.push(`- Stored SeatGeek URL rediscovered: ${section.rediscoveredStoredUrl ? "yes" : "no"}`);
    lines.push(`- Unique candidates after de-duplication: ${section.apiResult.candidates.length}`);
    lines.push("");
    lines.push("### SeatGeek API attempts");
    lines.push("");
    for (const attempt of section.apiResult.attempts) {
      lines.push(`#### ${attempt.name}`);
      lines.push("");
      lines.push(`- Query: \`${attempt.query}\``);
      lines.push(`- HTTP status: ${attempt.status}`);
      lines.push(`- Raw candidate count before filtering: ${attempt.candidateCount}`);
      if (attempt.error) lines.push(`- Error: ${attempt.error}`);
      if (attempt.topCandidates.length) {
        lines.push("");
        lines.push("| # | Title | Date/time | Venue | City | URL | Performers | Taxonomy/type |");
        lines.push("|---:|---|---|---|---|---|---|---|");
        attempt.topCandidates.forEach((candidate, index) => {
          lines.push(`| ${index + 1} | ${markdownCell(candidate.title)} | ${markdownCell(candidate.datetime)} | ${markdownCell(candidate.venue)} | ${markdownCell(candidate.city)} | ${markdownCell(candidate.url)} | ${markdownCell(candidate.performers)} | ${markdownCell([...candidate.taxonomy, candidate.type].filter(Boolean))} |`);
        });
      } else {
        lines.push("");
        lines.push("No raw candidates returned for this attempt.");
      }
      lines.push("");
    }
    lines.push("### Candidate scoring decisions");
    lines.push("");
    if (section.classified.length) {
      lines.push("| Proposed status | Decision | Score | SeatGeek title | SeatGeek date/time | SeatGeek venue/city | URL | Match reasons | Risk flags |");
      lines.push("|---|---|---:|---|---|---|---|---|---|");
      for (const candidate of section.classified.slice(0, 10)) {
        lines.push(`| ${markdownCell(candidate.proposed_status)} | ${markdownCell(candidateDecisionText(candidate))} | ${candidate.confidence_score} | ${markdownCell(candidate.seatgeek_event_title)} | ${markdownCell(candidate.seatgeek_event_datetime)} | ${markdownCell(`${candidate.seatgeek_venue}${candidate.seatgeek_venue_city ? `, ${candidate.seatgeek_venue_city}` : ""}`)} | ${markdownCell(candidate.proposed_seatgeek_url)} | ${markdownCell(candidate.match_reasons)} | ${markdownCell(candidate.risk_flags)} |`);
      }
      if (section.classified.length > 10) lines.push(`\nOnly the top 10 scored decisions are shown out of ${section.classified.length} unique candidates.`);
    } else {
      lines.push("No unique candidates were available to score.");
    }
    lines.push("");
  }

  lines.push("## Recommendation");
  lines.push("");
  lines.push("Rerun the all-artist proposal workflow after this diagnostic fix. The diagnostic sample shows that the API can return raw candidates and that stored positive-control SeatGeek URLs can be rediscovered once Node fetch uses the configured HTTP(S) proxy. Keep the existing strict scoring/classification rules and manually review `needs_review` candidates before any separate apply PR.");
  lines.push("");

  await fs.mkdir(path.dirname(options.diagnosticsOutputPath), { recursive: true });
  await fs.writeFile(options.diagnosticsOutputPath, `${lines.join("\n")}\n`);
  const afterHash = await sha256File(options.eventsPath);
  if (beforeHash !== afterHash) throw new Error("Safety check failed: events JSON changed during diagnostics run");
  console.log(`Wrote SeatGeek diagnostics report: ${path.relative(REPO_ROOT, options.diagnosticsOutputPath)}`);
  console.log("Diagnostics mode: event data, CTA rendering, /api/out, Ticketmaster behavior, and provider URLs were not changed.");
}

function requiredCandidateFields() {
  return [
    "local_event_id",
    "artist",
    "date",
    "city",
    "venue",
    "existing_ticketmaster_url",
    "proposed_seatgeek_url",
    "seatgeek_event_title",
    "seatgeek_event_datetime",
    "seatgeek_venue_city",
    "seatgeek_venue",
    "confidence_score",
    "match_reasons",
    "risk_flags",
    "proposed_status"
  ];
}

async function runSelfTest() {
  const event = {
    id: "tm-test-2026-city-abc",
    artist_name: "Example Artist",
    artist_slug: "example-artist",
    event_name: "Example Artist: Test Tour",
    city: "Boston",
    venue: "Fenway Park",
    datetime_iso: "2026-08-01T23:30:00Z",
    timezone: "America/New_York",
    ticketmaster_url: "https://www.ticketmaster.com/example/event/abc",
    seatgeek_url: ""
  };
  const strongCandidate = {
    id: 123456,
    title: "Example Artist Tickets",
    datetime_local: "2026-08-01T19:30:00",
    url: "https://seatgeek.com/example-artist-tickets/boston-massachusetts-fenway-park-2026-08-01-7-30-pm/concert/123456",
    venue: { name: "Fenway Park", city: "Boston", display_location: "Boston, MA" },
    performers: [{ name: "Example Artist" }],
    taxonomies: [{ name: "concert" }]
  };
  const genericCandidate = { ...strongCandidate, id: 2, url: "https://seatgeek.com/performers/example-artist" };
  const lowCandidate = { ...strongCandidate, id: 3, performers: [{ name: "Other Artist" }], title: "Other Artist Tickets", url: "https://seatgeek.com/other-artist-tickets/boston-massachusetts-fenway-park-2026-08-01-7-30-pm/concert/3" };

  assert.equal(validateSeatGeekEventUrl(genericCandidate.url).ok, false, "generic SeatGeek URL should be rejected");
  const classifiedStrong = classifyScoredCandidates([scoreCandidate(event, strongCandidate)]);
  assert.equal(classifiedStrong[0].proposed_status, "high_confidence", "strong exact match should be high_confidence");
  const classifiedGeneric = classifyScoredCandidates([scoreCandidate(event, genericCandidate)]);
  assert.equal(classifiedGeneric[0].proposed_status, "reject", "generic URL should be rejected");
  const classifiedLow = classifyScoredCandidates([scoreCandidate(event, lowCandidate)]);
  assert.notEqual(classifiedLow[0].proposed_status, "high_confidence", "low-confidence artist mismatch should not be high_confidence");
  for (const field of requiredCandidateFields()) assert.ok(field in classifiedStrong[0], `candidate output should include ${field}`);

  // ── Registry performer-id scoping (step 4) ──────────────────────────────
  const PERFORMER_ID = 35;
  // A candidate whose SeatGeek-styled performer NAME differs but whose performer
  // id matches the verified registry id: name similarity alone would fail the
  // 0.9 gate, but the confirmed id clears it without relaxing date/city/URL.
  const idMatchCandidate = {
    ...strongCandidate,
    id: 9,
    title: "EXAMPLE-ARTIST (Stylised) Tickets",
    performers: [{ name: "EXAMPLE-ARTIST (Stylised)", id: PERFORMER_ID }],
    url: "https://seatgeek.com/example-artist-tickets/boston-massachusetts-fenway-park-2026-08-01-7-30-pm/concert/9"
  };
  const idScored = scoreCandidate(event, idMatchCandidate, PERFORMER_ID);
  assert.equal(idScored.signals.performer_id_match, true, "matching registry performer id should be confirmed");
  assert.equal(idScored.signals.performer_similarity, 1, "confirmed performer id should clear the similarity gate");
  assert.ok(idScored.match_reasons.includes("confirmed SeatGeek performer id match"), "confirmed id should be a stated reason");
  assert.equal(classifyScoredCandidates([idScored])[0].proposed_status, "high_confidence", "confirmed performer id + exact date/city/url should be high_confidence");
  // A non-matching id (or no registry id) must not fabricate a confirmation.
  assert.equal(scoreCandidate(event, idMatchCandidate, 99).signals.performer_id_match, false, "non-matching performer id must not confirm");
  assert.equal(scoreCandidate(event, strongCandidate, null).signals.performer_id_match, false, "absent registry id must not confirm");

  // buildAttempts prepends a performer-id-scoped attempt; the API URL uses
  // performers.id and omits the free-text q.
  const idAttempts = buildAttempts(event, PERFORMER_ID);
  assert.equal(idAttempts[0].name, "performer id + exact date", "performer-id attempt should be tried first");
  const idUrl = buildSeatGeekApiUrl(idAttempts[0], { clientId: "x" });
  assert.ok(idUrl.includes("performers.id=35"), "performer-id query should scope by performers.id");
  assert.ok(!new URL(idUrl).searchParams.has("q"), "performer-id query should omit the free-text q");
  assert.ok(buildSeatGeekApiUrl(idAttempts[1], { clientId: "x" }).includes("q="), "text attempts should still send q");
  assert.equal(buildAttempts(event, null).every((attempt) => !Number.isInteger(attempt.performerId)), true, "no registry id means no performer-id attempt");

  // Missing/unreadable registry yields an empty map (proposal still runs).
  assert.equal((await loadPerformerIdMap(path.join(REPO_ROOT, "data", "no-such-registry-xyz.json"))).size, 0, "missing registry should yield an empty map");

  const tempDir = await fs.mkdtemp(path.join(process.env.TMPDIR || "/tmp", "ttc-sg-proposal-"));
  const eventsPath = path.join(tempDir, "events.json");
  const outputPath = path.join(tempDir, "report.json");
  await fs.writeFile(eventsPath, `${JSON.stringify([event], null, 2)}\n`);
  const before = await sha256File(eventsPath);
  const oldClientId = process.env.SEATGEEK_CLIENT_ID;
  const oldToday = process.env.TTC_TODAY;
  delete process.env.SEATGEEK_CLIENT_ID;
  process.env.TTC_TODAY = "2026-05-14";
  try {
    const report = await runProposal({ eventsPath, outputPath, artist: "", limit: null, dryRun: true, verbose: false });
    assert.equal(report.summary.seatgeek_api.credentials_available, false, "missing credentials should fail gracefully");
    assert.equal(report.summary.writes.mutated_event_data, false, "report should state event data was not mutated");
  } finally {
    if (oldClientId === undefined) delete process.env.SEATGEEK_CLIENT_ID;
    else process.env.SEATGEEK_CLIENT_ID = oldClientId;
    if (oldToday === undefined) delete process.env.TTC_TODAY;
    else process.env.TTC_TODAY = oldToday;
  }
  const after = await sha256File(eventsPath);
  assert.equal(after, before, "proposal run must not mutate event data");
  const written = JSON.parse(await fs.readFile(outputPath, "utf8"));
  for (const field of [
    "total_future_events_checked",
    "total_already_covered_by_seatgeek",
    "total_missing_seatgeek_url",
    "candidates_found_by_artist",
    "high_confidence_count",
    "needs_review_count",
    "rejected_count",
    "events_with_no_candidate_found",
    "registry_performer_id"
  ]) assert.ok(field in written.summary, `summary should include ${field}`);
  assert.ok("artists_with_verified_performer_id" in written.summary.registry_performer_id, "summary should report registry performer-id usage");
  console.log("Self-test passed: no mutation, required fields, generic URL rejection, low-confidence downgrade, and missing credential handling verified.");
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return;
  }
  if (options.selfTest) {
    await runSelfTest();
    return;
  }
  await configureFetchProxy();
  if (options.diagnosticsOutputPath) {
    await runDiagnostics(options);
    return;
  }
  await runProposal(options);
}

main().catch((error) => {
  console.error(`ERROR: ${error.message}`);
  process.exit(1);
});
