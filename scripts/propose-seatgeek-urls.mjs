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
const SEATGEEK_EVENTS_ENDPOINT = "https://api.seatgeek.com/2/events";
const DEFAULT_PER_PAGE = 10;
const DEFAULT_TIMEOUT_MS = 20_000;
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

function usage() {
  return `Usage: node scripts/propose-seatgeek-urls.mjs [options]\n\nProposal-only SeatGeek URL enrichment. Reads events, optionally queries SeatGeek when server-side credentials are present, and writes a review JSON file only. It never mutates public/data/events.json.\n\nOptions:\n  --output <path>       Review JSON output path (default: reports/seatgeek-url-candidates.json)\n  --events <path>       Events JSON path (default: public/data/events.json)\n  --artist <value>      Filter by artist slug or name\n  --limit <number>      Process at most this many missing future events\n  --dry-run             Explicit dry run; retained for clarity because all modes are proposal-only\n  --verbose             Log redacted SeatGeek request URLs and scoring details\n  --self-test           Run built-in smoke tests without calling SeatGeek\n  -h, --help            Show this help\n\nEnvironment:\n  SEATGEEK_CLIENT_ID     Enables SeatGeek API lookups when present\n  SEATGEEK_CLIENT_SECRET Optional; sent server-side if present and always redacted from logs/output\n  TTC_TODAY              Optional YYYY-MM-DD date override for deterministic local testing\n`;
}

function parseArgs(argv) {
  const options = {
    outputPath: DEFAULT_OUTPUT_PATH,
    eventsPath: DEFAULT_EVENTS_PATH,
    artist: "",
    limit: null,
    dryRun: true,
    verbose: false,
    selfTest: false,
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
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--verbose") {
      options.verbose = true;
    } else if (arg === "--self-test") {
      options.selfTest = true;
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

function buildAttempts(event) {
  const artist = clean(event.artist_name || event.artist_slug, 120);
  const venue = clean(event.venue, 160);
  const city = clean(event.city, 100);
  const date = localDateFromIso(event.datetime_iso, event.timezone);
  return [
    { name: "artist + venue + city + exact date", q: [artist, venue, city].filter(Boolean).join(" "), city, start: date, end: date },
    { name: "artist + city + exact date", q: [artist, city].filter(Boolean).join(" "), city, start: date, end: date },
    { name: "artist + venue + exact date", q: [artist, venue].filter(Boolean).join(" "), city: "", start: date, end: date },
    { name: "artist + city + narrow date window", q: [artist, city].filter(Boolean).join(" "), city, start: addDays(date, -1), end: addDays(date, 1) },
    { name: "artist only + exact date", q: artist, city: "", start: date, end: date }
  ].filter((attempt) => attempt.q && attempt.start && attempt.end);
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
    q: attempt.q,
    "datetime_local.gte": `${attempt.start}T00:00:00`,
    "datetime_local.lte": `${attempt.end}T23:59:59`,
    "taxonomies.name": "concert"
  });
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
    return { ok: response.ok, status: response.status, payload };
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchCandidates(event, options, credentials) {
  const attempts = buildAttempts(event);
  const candidateMap = new Map();
  const attemptResults = [];
  for (const attempt of attempts) {
    const url = buildSeatGeekApiUrl(attempt, credentials);
    const redactedUrl = redactApiUrl(url);
    if (options.verbose) console.error(`SeatGeek query for ${event.id}: ${attempt.name}: ${redactedUrl}`);
    try {
      const response = await fetchJson(url);
      const sgEvents = Array.isArray(response.payload?.events) ? response.payload.events : [];
      attemptResults.push({ name: attempt.name, ok: response.ok, status: response.status, query: redactedUrl, candidateCount: sgEvents.length });
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

function scoreCandidate(event, candidate) {
  const reasons = [];
  const riskFlags = [];
  let score = 0;

  const artist = clean(event.artist_name || event.artist_slug, 120);
  const performers = candidatePerformers(candidate);
  const performerSimilarities = performers.map((name) => Math.max(diceSimilarity(artist, name), containsNormalized(name, artist) || containsNormalized(artist, name) ? 1 : 0));
  const bestPerformerSimilarity = performerSimilarities.length ? Math.max(...performerSimilarities) : 0;
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

function summarize({ future, alreadyCovered, missing, missingAll, candidates, credentials, noCandidateEventIds, asOfDate }) {
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
  const { future, alreadyCovered, missing, missingAll } = selectMissingFutureEvents(events, options, asOfDate);
  const candidates = [];
  const noCandidateEventIds = [];

  if (!credentials.configured) {
    for (const event of missing) {
      noCandidateEventIds.push(clean(event.id, 160));
    }
    console.log("SeatGeek credentials unavailable: SEATGEEK_CLIENT_ID is not set. Wrote a review file with summary only; no API calls were made.");
  } else {
    for (const event of missing) {
      const apiResult = await fetchCandidates(event, options, credentials);
      const scored = classifyScoredCandidates(apiResult.candidates.map((candidate) => scoreCandidate(event, candidate)));
      if (!scored.length) {
        noCandidateEventIds.push(clean(event.id, 160));
        candidates.push(emptyCandidate(event, "no_candidate_found"));
      } else {
        candidates.push(...scored);
      }
      if (options.verbose) console.error(`Scored ${scored.length} candidate(s) for ${event.id}; attempts=${apiResult.attempts.length}`);
    }
  }

  const summary = summarize({ future, alreadyCovered, missing, missingAll, candidates, credentials, noCandidateEventIds, asOfDate });
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
    "events_with_no_candidate_found"
  ]) assert.ok(field in written.summary, `summary should include ${field}`);
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
  await runProposal(options);
}

main().catch((error) => {
  console.error(`ERROR: ${error.message}`);
  process.exit(1);
});
