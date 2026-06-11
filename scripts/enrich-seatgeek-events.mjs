#!/usr/bin/env node
import fs from "node:fs/promises";
import { execFile } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const EVENTS_PATH = path.join(REPO_ROOT, "public", "data", "events.json");
const EVENTS_PARTITIONS_DIR = path.join(REPO_ROOT, "public", "data", "events");
const LOG_PATH = path.join(REPO_ROOT, "docs", "SEATGEEK_CTA_AUTO_ADD_LOG.md");
const SEATGEEK_EVENTS_ENDPOINT = "https://api.seatgeek.com/2/events";
const DEFAULT_PER_PAGE = 20;
const HIGH_CONFIDENCE_MIN_SCORE = 78;
const CONFLICT_SCORE_WINDOW = 10;
const REQUEST_TIMEOUT_MS = 30000;
const DEFAULT_REQUEST_DELAY_MS = 1000;
const RATE_LIMIT_RETRY_MS = 65000;
const RATE_LIMIT_MAX_RETRIES = 2;
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

function parseArgs(argv) {
  const options = {
    applyHighConfidence: false,
    artist: "",
    limit: null,
    delayMs: DEFAULT_REQUEST_DELAY_MS,
    maxApiCalls: null,
    resumeFromLog: false,
    resumeFromId: "",
    refresh: false,
    json: false,
    verbose: false,
    logPath: LOG_PATH
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--apply-high-confidence") {
      options.applyHighConfidence = true;
    } else if (arg === "--refresh") {
      options.refresh = true;
    } else if (arg === "--json") {
      options.json = true;
    } else if (arg === "--verbose") {
      options.verbose = true;
    } else if (arg === "--artist") {
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) throw new Error("--artist requires a slug or artist name");
      options.artist = value.trim();
      i += 1;
    } else if (arg === "--limit" || arg === "--max-events") {
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) throw new Error(`${arg} requires a positive number`);
      const parsed = Number.parseInt(value, 10);
      if (!Number.isFinite(parsed) || parsed < 1) throw new Error(`${arg} must be a positive number`);
      options.limit = parsed;
      i += 1;
    } else if (arg === "--delay-ms") {
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) throw new Error("--delay-ms requires a non-negative number");
      const parsed = Number.parseInt(value, 10);
      if (!Number.isFinite(parsed) || parsed < 0) throw new Error("--delay-ms must be a non-negative number");
      options.delayMs = parsed;
      i += 1;
    } else if (arg === "--max-api-calls") {
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) throw new Error("--max-api-calls requires a positive number");
      const parsed = Number.parseInt(value, 10);
      if (!Number.isFinite(parsed) || parsed < 1) throw new Error("--max-api-calls must be a positive number");
      options.maxApiCalls = parsed;
      i += 1;
    } else if (arg === "--resume-from-log") {
      options.resumeFromLog = true;
    } else if (arg === "--resume-from") {
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) throw new Error("--resume-from requires a showId");
      options.resumeFromId = value.trim();
      i += 1;
    } else if (arg === "--log-path") {
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) throw new Error("--log-path requires a path");
      options.logPath = path.resolve(REPO_ROOT, value);
      i += 1;
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return options;
}

function usage() {
  return `Usage: node scripts/enrich-seatgeek-events.mjs [options]\n\nSearch SeatGeek with SEATGEEK_CLIENT_ID only and add event-level SeatGeek URLs only in explicit apply mode. Default mode is a dry-run: events.json is not modified, but the audit log is refreshed.\n\nOptions:\n  --apply-high-confidence  Write high-confidence top-level seatgeek_url matches to events.json\n  --artist <slug-or-name>  Filter by artist slug or name\n  --limit <number>         Process at most this many selected events\n  --max-events <number>    Alias for --limit\n  --delay-ms <number>      Delay before each SeatGeek API call (default: 1000)\n  --max-api-calls <number> Stop before exceeding this many enrichment API calls\n  --resume-from-log        Resume from the next showId written in the audit log\n  --resume-from <showId>   Resume from a specific selected showId\n  --refresh                Include events that already have seatgeek_url\n  --json                   Emit machine-readable JSON\n  --verbose                Include API query and candidate diagnostics\n  --log-path <path>        Override audit log path\n  -h, --help               Show this help\n\nEnvironment:\n  SEATGEEK_CLIENT_ID       Required\n`;
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
    .replace(/\b(the|tour|tickets|ticket|live|concert|presented|presents|official|experience|show)\b/g, " ")
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

function isoDateOnly(value) {
  const raw = clean(value, 100);
  const match = raw.match(/^(\d{4}-\d{2}-\d{2})/);
  if (match) return match[1];
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

function addDays(dateString, days) {
  const date = new Date(`${dateString}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return "";
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function isPlaceholderUrl(value) {
  const v = clean(value, 2048).toLowerCase();
  return /example\.com|your-affiliate-link|your-link-here|replace-me|placeholder/.test(v) || /(?:^|[/?#=&._-])tbd(?:$|[/?#=&._-])/.test(v);
}

function isValidSeatGeekEventUrl(value) {
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
  if (!/(\/)(concert|sports|theater|theatre)\/\d+$/i.test(normalizedPath)) {
    return { ok: false, reason: "must look like an event URL ending in /concert/<id> or another event category with a numeric id" };
  }

  return { ok: true, reason: "valid event-level SeatGeek URL" };
}

function eventHasTicketmasterSource(event) {
  const source = clean(event.source_type).toLowerCase();
  const tmId = clean(event.ticketmaster_event_id || event.ticketmaster_discovery_event_id);
  return (
    source === "ticketmaster" &&
    Boolean(tmId) &&
    Boolean(clean(event.artist_name || event.artist_slug, 120)) &&
    Boolean(clean(event.datetime_iso, 120)) &&
    Boolean(clean(event.city, 120)) &&
    Boolean(clean(event.venue, 180))
  );
}

function eventIsTicketmasterVerified(event) {
  const tmUrl = clean(event.ticketmaster_url, 2048);
  const provider = event.provider_links?.ticketmaster;
  return eventHasTicketmasterSource(event) && /^https:\/\//i.test(tmUrl) && provider?.verified === true;
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

async function resumeShowIdFromLog(logPath) {
  try {
    const log = await fs.readFile(logPath, "utf8");
    const match = log.match(/^- Next resume showId: `?([^`\n]+)`?/m);
    return clean(match?.[1] || "", 120);
  } catch {
    return "";
  }
}

function applyResumeCursor(selected, resumeFromId) {
  if (!resumeFromId) return selected;
  const index = selected.findIndex((event) => event.id === resumeFromId);
  if (index < 0) return selected;
  return selected.slice(index);
}

function selectEvents(events, options) {
  let selected = events.filter(eventHasTicketmasterSource);
  if (!options.refresh) {
    selected = selected.filter((event) => !isValidSeatGeekEventUrl(event.seatgeek_url).ok);
  }
  if (options.artist) {
    selected = selected.filter((event) => artistMatches(event, options.artist));
  }
  selected = applyResumeCursor(selected, options.resumeFromId);
  if (options.limit !== null) {
    selected = selected.slice(0, options.limit);
  }
  return selected;
}

function buildAttempts(event) {
  const artist = clean(event.artist_name || event.artist_slug, 120);
  const venue = clean(event.venue, 160);
  const city = clean(event.city, 100);
  const exactDate = localDateFromIso(event.datetime_iso, event.timezone);
  const attempts = [
    {
      name: "artist + venue + city + exact date",
      q: [artist, venue, city].filter(Boolean).join(" "),
      city,
      dateStart: exactDate,
      dateEnd: exactDate
    },
    {
      name: "artist + city + exact date",
      q: [artist, city].filter(Boolean).join(" "),
      city,
      dateStart: exactDate,
      dateEnd: exactDate
    },
    {
      name: "artist + venue + exact date",
      q: [artist, venue].filter(Boolean).join(" "),
      city: "",
      dateStart: exactDate,
      dateEnd: exactDate
    },
    {
      name: "artist + city + narrow date window",
      q: [artist, city].filter(Boolean).join(" "),
      city,
      dateStart: addDays(exactDate, -1),
      dateEnd: addDays(exactDate, 1)
    },
    {
      name: "artist only + exact date",
      q: artist,
      city: "",
      dateStart: exactDate,
      dateEnd: exactDate
    },
    {
      name: "artist only + narrow date window",
      q: artist,
      city: "",
      dateStart: addDays(exactDate, -1),
      dateEnd: addDays(exactDate, 1)
    }
  ];
  return attempts.filter((attempt) => attempt.q && attempt.dateStart && attempt.dateEnd);
}

function buildSeatGeekUrl(attempt) {
  const params = new URLSearchParams({
    client_id: clean(process.env.SEATGEEK_CLIENT_ID, 255),
    per_page: String(DEFAULT_PER_PAGE),
    sort: "score.desc",
    q: attempt.q,
    "datetime_local.gte": `${attempt.dateStart}T00:00:00`,
    "datetime_local.lte": `${attempt.dateEnd}T23:59:59`,
    "taxonomies.name": "concert"
  });
  if (attempt.city) params.set("venue.city", attempt.city);
  return `${SEATGEEK_EVENTS_ENDPOINT}?${params.toString()}`;
}

function safeApiUrl(url) {
  const parsed = new URL(url);
  if (parsed.searchParams.has("client_id")) parsed.searchParams.set("client_id", "<redacted>");
  return parsed.toString();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function apiCallLimitReached(options, runState) {
  return options.maxApiCalls !== null && runState.apiCalls >= options.maxApiCalls;
}

async function pacedSeatGeekJson(url, options, runState) {
  if (apiCallLimitReached(options, runState)) {
    return { status: 0, ok: false, payload: null, stopped: true, stopReason: "api_call_limit_reached" };
  }
  if (options.delayMs > 0) await sleep(options.delayMs);
  runState.apiCalls += 1;
  return httpsJson(url);
}

function httpsJson(url) {
  return new Promise((resolve, reject) => {
    execFile(
      "curl",
      ["--silent", "--show-error", "--location", "--max-time", String(Math.ceil(REQUEST_TIMEOUT_MS / 1000)), "--write-out", "\n%{http_code}", url],
      { maxBuffer: 20 * 1024 * 1024 },
      (error, stdout, stderr) => {
        if (error) {
          reject(new Error(clean(stderr || error.message, 300)));
          return;
        }

        const markerIndex = stdout.lastIndexOf("\n");
        const body = markerIndex >= 0 ? stdout.slice(0, markerIndex) : stdout;
        const statusText = markerIndex >= 0 ? stdout.slice(markerIndex + 1).trim() : "0";
        const status = Number.parseInt(statusText, 10) || 0;
        let payload = null;
        try {
          payload = body ? JSON.parse(body) : null;
        } catch {
          reject(new Error(`SeatGeek API JSON parse failed after HTTP ${status}`));
          return;
        }
        resolve({ status, ok: status >= 200 && status < 300, payload });
      }
    );
  });
}

async function fetchSeatGeekCandidates(event, options, runState) {
  const attempts = buildAttempts(event);
  const candidateMap = new Map();
  const attemptResults = [];
  const errors = [];

  for (const attempt of attempts) {
    const url = buildSeatGeekUrl(attempt);
    const safeUrl = safeApiUrl(url);
    if (options.verbose && !options.json) console.error(`Query ${event.id}: ${attempt.name}: ${safeUrl}`);

    if (apiCallLimitReached(options, runState)) {
      attemptResults.push({ name: attempt.name, ok: false, status: 0, query: safeUrl, candidateCount: 0, stopped: true, stopReason: "api_call_limit_reached" });
      return {
        ok: attemptResults.some((attemptResult) => attemptResult.ok),
        status: attemptResults.find((attemptResult) => attemptResult.ok)?.status || 0,
        reason: "Stopped before exceeding --max-api-calls.",
        attempts: attemptResults,
        candidates: [...candidateMap.values()],
        localDate: localDateFromIso(event.datetime_iso, event.timezone),
        stopped: true,
        stopReason: "api_call_limit_reached"
      };
    }

    try {
      let response = await pacedSeatGeekJson(url, options, runState);
      let rateLimitRetries = 0;
      while (response.status === 429 && rateLimitRetries < RATE_LIMIT_MAX_RETRIES) {
        rateLimitRetries += 1;
        runState.rateLimitResponses += 1;
        if (options.verbose && !options.json) {
          console.error(`SeatGeek rate limit for ${event.id}; retry ${rateLimitRetries}/${RATE_LIMIT_MAX_RETRIES} after ${RATE_LIMIT_RETRY_MS}ms.`);
        }
        await sleep(RATE_LIMIT_RETRY_MS * rateLimitRetries);
        response = await pacedSeatGeekJson(url, options, runState);
      }

      const events = Array.isArray(response.payload?.events) ? response.payload.events : [];
      attemptResults.push({
        name: attempt.name,
        ok: response.ok,
        status: response.status,
        query: safeUrl,
        candidateCount: events.length,
        rateLimited: response.status === 429,
        retryCount: rateLimitRetries
      });

      if (response.status === 429) {
        runState.rateLimitResponses += 1;
        return {
          ok: attemptResults.some((attemptResult) => attemptResult.ok),
          status: 429,
          reason: `SeatGeek API returned HTTP 429 after ${rateLimitRetries} retry attempt(s); stopped early to avoid hammering the API.`,
          attempts: attemptResults,
          candidates: [...candidateMap.values()],
          localDate: localDateFromIso(event.datetime_iso, event.timezone),
          stopped: true,
          stopReason: "rate_limited"
        };
      }

      if (!response.ok) {
        errors.push(`${attempt.name}: HTTP ${response.status}`);
        continue;
      }
      for (const candidate of events) {
        const key = clean(candidate?.url, 2048) || String(candidate?.id ?? "");
        if (!key || candidateMap.has(key)) continue;
        candidateMap.set(key, { ...candidate, _matched_attempts: [attempt.name] });
      }
      for (const candidate of events) {
        const key = clean(candidate?.url, 2048) || String(candidate?.id ?? "");
        const stored = candidateMap.get(key);
        if (stored && !stored._matched_attempts.includes(attempt.name)) stored._matched_attempts.push(attempt.name);
      }
    } catch (error) {
      attemptResults.push({ name: attempt.name, ok: false, status: 0, query: safeUrl, candidateCount: 0 });
      errors.push(`${attempt.name}: ${clean(error?.message || error, 200)}`);
    }
  }

  return {
    ok: attemptResults.some((attempt) => attempt.ok),
    status: attemptResults.find((attempt) => attempt.ok)?.status || attemptResults[0]?.status || 0,
    reason: errors.length ? errors.join("; ") : "ok",
    attempts: attemptResults,
    candidates: [...candidateMap.values()],
    localDate: localDateFromIso(event.datetime_iso, event.timezone),
    stopped: false,
    stopReason: ""
  };
}
function candidateLocalDate(candidate) {
  return isoDateOnly(candidate.datetime_local) || isoDateOnly(candidate.datetime_utc);
}

function candidateCity(candidate) {
  return clean(candidate.venue?.city || candidate.venue?.display_location || "", 120);
}

function candidateVenue(candidate) {
  return clean(candidate.venue?.name, 180);
}

function candidatePerformers(candidate) {
  return Array.isArray(candidate.performers) ? candidate.performers.map((performer) => clean(performer?.name, 120)).filter(Boolean) : [];
}

function taxonomyNames(candidate) {
  return Array.isArray(candidate.taxonomies) ? candidate.taxonomies.map((taxonomy) => clean(taxonomy?.name, 80).toLowerCase()).filter(Boolean) : [];
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

function scoreCandidate(event, candidate, tmLocalDate) {
  const notes = [];
  const reasons = [];
  let score = 0;

  const performers = candidatePerformers(candidate);
  const artist = clean(event.artist_name || event.artist_slug, 120);
  const performerSimilarities = performers.map((name) => Math.max(diceSimilarity(artist, name), containsNormalized(name, artist) || containsNormalized(artist, name) ? 1 : 0));
  const bestPerformerSimilarity = performerSimilarities.length ? Math.max(...performerSimilarities) : 0;
  const titleSimilarity = Math.max(diceSimilarity(event.event_name, candidate.title), diceSimilarity(artist, candidate.title));
  const venueSimilarity = Math.max(diceSimilarity(event.venue, candidateVenue(candidate)), containsNormalized(event.venue, candidateVenue(candidate)) || containsNormalized(candidateVenue(candidate), event.venue) ? 1 : 0);
  const sgLocalDate = candidateLocalDate(candidate);
  const timezoneMissing = !clean(event.timezone, 120);
  const previousUtcDate = tmLocalDate ? addDays(tmLocalDate, -1) : "";
  const exactDate = Boolean(tmLocalDate && sgLocalDate && tmLocalDate === sgLocalDate);
  const adjacentPreviousDateWithMissingTimezone = Boolean(timezoneMissing && previousUtcDate && sgLocalDate === previousUtcDate);
  const dateCompatible = exactDate || adjacentPreviousDateWithMissingTimezone;
  const cityExact = normalizeText(event.city) === normalizeText(candidate.venue?.city || "");
  const cityMetro = metroLikeMatch(event.city, candidate.venue);
  const urlValidation = isValidSeatGeekEventUrl(candidate.url);
  const taxonomies = taxonomyNames(candidate);
  const taxonomyRelevant = taxonomies.includes("concert") || taxonomies.includes("music");

  if (bestPerformerSimilarity >= 0.9) {
    score += 32;
    reasons.push("strong performer match");
  } else if (bestPerformerSimilarity >= 0.65 || titleSimilarity >= 0.65) {
    score += 20;
    reasons.push("probable artist/title match");
    notes.push("artist/performer match is not exact");
  } else {
    notes.push("artist/performer match is weak or absent");
  }

  if (exactDate) {
    score += 28;
    reasons.push("exact local date match");
  } else if (adjacentPreviousDateWithMissingTimezone) {
    score += 24;
    reasons.push("date match after missing-timezone adjustment");
    notes.push("event timezone is missing; accepted SeatGeek local date one day before stored UTC date");
  } else {
    notes.push("local date does not match");
  }

  if (cityExact) {
    score += 18;
    reasons.push("city match");
  } else if (cityMetro) {
    score += 15;
    reasons.push("city/metro match");
    notes.push("city is metro-equivalent rather than exact");
  } else {
    notes.push("city does not match");
  }

  if (venueSimilarity >= 0.88) {
    score += 14;
    reasons.push("venue match");
  } else if (venueSimilarity >= 0.55) {
    score += 7;
    reasons.push("possible venue match");
    notes.push("venue naming is similar but not exact");
  } else {
    notes.push("venue mismatch accepted only if artist/date/city match");
  }

  if (taxonomyRelevant) {
    score += 5;
    reasons.push("concert taxonomy");
  } else {
    notes.push("concert/music taxonomy not present");
  }

  if (urlValidation.ok) {
    score += 5;
    reasons.push("valid event-level SeatGeek URL");
  } else {
    score -= 25;
    notes.push(`SeatGeek URL invalid: ${urlValidation.reason}`);
  }

  const mandatoryPass = bestPerformerSimilarity >= 0.9 && dateCompatible && (cityExact || cityMetro) && urlValidation.ok;

  return {
    raw: candidate,
    seatgeek: {
      id: candidate.id ?? null,
      title: clean(candidate.title, 200),
      date: sgLocalDate,
      city: candidateCity(candidate),
      venue: candidateVenue(candidate),
      url: clean(candidate.url, 2048),
      performers,
      taxonomies,
      attempts: candidate._matched_attempts || []
    },
    score: Math.max(0, Math.min(100, Math.round(score))),
    signals: {
      performerSimilarity: Number(bestPerformerSimilarity.toFixed(3)),
      titleSimilarity: Number(titleSimilarity.toFixed(3)),
      venueSimilarity: Number(venueSimilarity.toFixed(3)),
      exactDate,
      adjacentPreviousDateWithMissingTimezone,
      dateCompatible,
      cityExact,
      cityMetro,
      taxonomyRelevant,
      validUrl: urlValidation.ok,
      mandatoryPass
    },
    reasons,
    notes
  };
}

function classifyCandidate(event, scoredCandidates) {
  if (!scoredCandidates.length) {
    return {
      candidate: null,
      decision: "skipped",
      skippedReason: "no_candidates_returned",
      confidenceScore: 0,
      matchReason: "No SeatGeek candidates returned for the event search.",
      uncertaintyNotes: ["No candidate passed basic API search retrieval."],
      conflicts: []
    };
  }

  const sorted = [...scoredCandidates].sort((a, b) => b.score - a.score);
  const best = sorted[0];
  const viable = sorted.filter((candidate) => candidate.signals.mandatoryPass && candidate.score >= HIGH_CONFIDENCE_MIN_SCORE);
  const conflicts = viable.filter((candidate) => candidate.seatgeek.url !== best.seatgeek.url && best.score - candidate.score <= CONFLICT_SCORE_WINDOW);

  if (!best.signals.validUrl) {
    return skipped(best, "invalid_seatgeek_url", "Best candidate did not pass the SeatGeek event URL validator.", conflicts);
  }
  if (best.signals.performerSimilarity < 0.9) {
    return skipped(best, "artist_match_failed", "Best candidate did not pass the required artist/performer match.", conflicts);
  }
  if (!best.signals.dateCompatible) {
    return skipped(best, "date_match_failed", "Best candidate did not match the event date.", conflicts);
  }
  if (!best.signals.cityExact && !best.signals.cityMetro) {
    return skipped(best, "city_or_metro_match_failed", "Best candidate did not match the event city or accepted metro area.", conflicts);
  }
  if (conflicts.length > 0) {
    return skipped(best, "conflicting_same_date_city_candidates", "Multiple plausible same-date/city SeatGeek candidates were found.", conflicts);
  }
  if (best.score < HIGH_CONFIDENCE_MIN_SCORE) {
    return skipped(best, "below_high_confidence_threshold", "Best candidate met mandatory checks but not the high-confidence score threshold.", conflicts);
  }
  if (isValidSeatGeekEventUrl(event.seatgeek_url).ok) {
    return skipped(best, "existing_valid_seatgeek_url", "Event already has a valid top-level seatgeek_url.", conflicts);
  }

  return {
    candidate: best,
    decision: "high_confidence",
    skippedReason: "",
    confidenceScore: best.score,
    matchReason: best.reasons.join("; ") || "Strong candidate match.",
    uncertaintyNotes: [...new Set(best.notes)],
    conflicts
  };
}

function skipped(candidate, skippedReason, matchReason, conflicts) {
  return {
    candidate,
    decision: "skipped",
    skippedReason,
    confidenceScore: candidate.score,
    matchReason,
    uncertaintyNotes: [...new Set(candidate.notes.length ? candidate.notes : [matchReason])],
    conflicts
  };
}

function notCheckedClassification(reason, matchReason) {
  return {
    candidate: null,
    decision: "skipped",
    skippedReason: reason,
    confidenceScore: 0,
    matchReason,
    uncertaintyNotes: [matchReason],
    conflicts: []
  };
}

function emptyApiResult(event, reason, stopped = false) {
  return {
    ok: false,
    status: stopped && reason === "rate_limited" ? 429 : 0,
    reason,
    attempts: [],
    candidates: [],
    localDate: localDateFromIso(event.datetime_iso, event.timezone),
    stopped,
    stopReason: reason
  };
}

function formatEventResult(event, tmLocalDate, apiResult, scoredCandidates, classification, options, applied) {
  const candidate = classification.candidate?.seatgeek || null;
  return {
    showId: event.id,
    artist: event.artist_name || event.artist_slug || "",
    ticketmaster: {
      date: tmLocalDate,
      city: event.city || "",
      venue: event.venue || "",
      eventName: event.event_name || "",
      ticketmasterEventId: event.ticketmaster_event_id || ""
    },
    existing_seatgeek_url: clean(event.seatgeek_url, 2048) || null,
    candidate: candidate ? {
      title: candidate.title,
      date: candidate.date,
      city: candidate.city,
      venue: candidate.venue,
      id: candidate.id,
      url: candidate.url,
      attempts: candidate.attempts
    } : null,
    confidence_score: classification.confidenceScore,
    decision: classification.decision,
    skipped_reason: classification.skippedReason,
    applied,
    match_reason: classification.matchReason,
    uncertainty_notes: classification.uncertaintyNotes,
    conflicts: classification.conflicts.map((conflict) => ({
      title: conflict.seatgeek.title,
      date: conflict.seatgeek.date,
      city: conflict.seatgeek.city,
      venue: conflict.seatgeek.venue,
      id: conflict.seatgeek.id,
      url: conflict.seatgeek.url,
      confidence_score: conflict.score
    })),
    venue_mismatch_accepted: Boolean(classification.decision === "high_confidence" && classification.candidate?.signals.venueSimilarity < 0.55),
    date_adjustment_accepted: Boolean(classification.decision === "high_confidence" && classification.candidate?.signals.adjacentPreviousDateWithMissingTimezone),
    ...(options.verbose ? {
      api: {
        ok: apiResult.ok,
        status: apiResult.status,
        reason: apiResult.reason,
        attempts: apiResult.attempts,
        candidate_count: apiResult.candidates.length
      },
      scored_candidates: scoredCandidates.map((scored) => ({
        id: scored.seatgeek.id,
        title: scored.seatgeek.title,
        date: scored.seatgeek.date,
        city: scored.seatgeek.city,
        venue: scored.seatgeek.venue,
        url: scored.seatgeek.url,
        confidence_score: scored.score,
        signals: scored.signals,
        reasons: scored.reasons,
        notes: scored.notes
      }))
    } : {})
  };
}

function shellQuote(value) {
  const raw = String(value ?? "");
  return `'${raw.replace(/'/g, `'"'"'`)}'`;
}

function buildResumeCommand(options, nextResumeShowId) {
  if (!nextResumeShowId) return "";
  const args = ["node", "scripts/enrich-seatgeek-events.mjs"];
  if (options.applyHighConfidence) args.push("--apply-high-confidence");
  if (options.artist) args.push("--artist", shellQuote(options.artist));
  if (options.limit !== null) args.push("--limit", String(options.limit));
  if (options.delayMs !== DEFAULT_REQUEST_DELAY_MS) args.push("--delay-ms", String(options.delayMs));
  if (options.maxApiCalls !== null) args.push("--max-api-calls", String(options.maxApiCalls));
  if (options.refresh) args.push("--refresh");
  if (options.verbose) args.push("--verbose");
  args.push("--resume-from", shellQuote(nextResumeShowId));
  return args.join(" ");
}

function summarize(results, options, apiEnvironment, runState, beforeEvents, afterEvents) {
  const countCoverage = (events) => {
    const ticketmasterSourcedEvents = events.filter(eventHasTicketmasterSource);
    const ticketmasterVerifiedEvents = events.filter(eventIsTicketmasterVerified);
    const eventsWithValidSeatGeekUrl = events.filter((event) => isValidSeatGeekEventUrl(event.seatgeek_url).ok);
    const ticketmasterSourcedWithSeatGeekUrl = ticketmasterSourcedEvents.filter((event) => isValidSeatGeekEventUrl(event.seatgeek_url).ok);
    const ticketmasterVerifiedWithSeatGeekUrl = ticketmasterVerifiedEvents.filter((event) => isValidSeatGeekEventUrl(event.seatgeek_url).ok);
    return {
      total_events: events.length,
      ticketmaster_sourced_events: ticketmasterSourcedEvents.length,
      ticketmaster_verified_events: ticketmasterVerifiedEvents.length,
      events_with_valid_seatgeek_url: eventsWithValidSeatGeekUrl.length,
      ticketmaster_sourced_with_valid_seatgeek_url: ticketmasterSourcedWithSeatGeekUrl.length,
      ticketmaster_sourced_missing_valid_seatgeek_url: ticketmasterSourcedEvents.length - ticketmasterSourcedWithSeatGeekUrl.length,
      ticketmaster_verified_with_valid_seatgeek_url: ticketmasterVerifiedWithSeatGeekUrl.length,
      ticketmaster_verified_missing_valid_seatgeek_url: ticketmasterVerifiedEvents.length - ticketmasterVerifiedWithSeatGeekUrl.length
    };
  };

  const beforeCoverage = countCoverage(beforeEvents);
  const afterCoverage = countCoverage(afterEvents);
  const skipped = results.filter((result) => result.decision === "skipped");
  const notCheckedReasons = new Set(["rate_limited_not_checked", "api_call_limit_not_checked"]);
  const checkedResults = results.filter((result) => !notCheckedReasons.has(result.skipped_reason));
  const skippedReasons = {};
  for (const result of skipped) {
    skippedReasons[result.skipped_reason || "unknown"] = (skippedReasons[result.skipped_reason || "unknown"] || 0) + 1;
  }
  return {
    mode: options.applyHighConfidence ? "apply-high-confidence" : "dry-run",
    ...beforeCoverage,
    after_events_with_valid_seatgeek_url: afterCoverage.events_with_valid_seatgeek_url,
    after_ticketmaster_sourced_with_valid_seatgeek_url: afterCoverage.ticketmaster_sourced_with_valid_seatgeek_url,
    after_ticketmaster_sourced_missing_valid_seatgeek_url: afterCoverage.ticketmaster_sourced_missing_valid_seatgeek_url,
    after_ticketmaster_verified_with_valid_seatgeek_url: afterCoverage.ticketmaster_verified_with_valid_seatgeek_url,
    after_ticketmaster_verified_missing_valid_seatgeek_url: afterCoverage.ticketmaster_verified_missing_valid_seatgeek_url,
    selected: results.length,
    checked: checkedResults.length,
    high_confidence: results.filter((result) => result.decision === "high_confidence").length,
    added: results.filter((result) => result.applied).length,
    skipped: skipped.length,
    skipped_reasons: skippedReasons,
    no_candidates_returned: skippedReasons.no_candidates_returned || 0,
    rate_limited_not_checked: skippedReasons.rate_limited_not_checked || 0,
    api_calls_made: runState.apiCalls,
    rate_limit_responses: runState.rateLimitResponses,
    stopped_early: Boolean(runState.stopReason),
    stop_reason: runState.stopReason,
    next_resume_show_id: runState.nextResumeShowId || "",
    next_resume_command: buildResumeCommand(options, runState.nextResumeShowId),
    accepted_venue_mismatches: results.filter((result) => result.venue_mismatch_accepted).length,
    accepted_date_adjustments: results.filter((result) => result.date_adjustment_accepted).length,
    conflicts_found: results.reduce((total, result) => total + result.conflicts.length, 0),
    api_environment: apiEnvironment,
    wrote_events_json: Boolean(options.applyHighConfidence),
    wrote_log: true,
    refresh: options.refresh,
    artist_filter: options.artist || null,
    limit: options.limit,
    delay_ms: options.delayMs,
    max_api_calls: options.maxApiCalls
  };
}

function textCell(value) {
  const raw = Array.isArray(value) ? value.join("; ") : String(value ?? "");
  return raw.replace(/\s+/g, " ").trim() || "-";
}

function printTextResults(results, summary) {
  console.log(`SeatGeek ${summary.mode} enrichment checked ${summary.checked} event(s): ${summary.added} URL(s) added, ${summary.high_confidence} high-confidence candidate(s), ${summary.skipped} skipped.`);
  console.log(`API calls made: ${summary.api_calls_made}`);
  if (summary.stopped_early) console.log(`Stopped early: ${summary.stop_reason}`);
  if (summary.next_resume_command) console.log(`Next resume command: ${summary.next_resume_command}`);
  console.log(`Skipped reasons: ${JSON.stringify(summary.skipped_reasons)}`);
  console.log(`Audit log refreshed: docs/SEATGEEK_CTA_AUTO_ADD_LOG.md`);
  if (summary.mode === "dry-run") console.log("Dry-run mode: public/data/events.json was not modified.\n");

  for (const result of results) {
    console.log(`showId: ${result.showId}`);
    console.log(`artist: ${textCell(result.artist)}`);
    console.log(`Ticketmaster: ${textCell(result.ticketmaster.date)} | ${textCell(result.ticketmaster.city)} | ${textCell(result.ticketmaster.venue)}`);
    if (result.existing_seatgeek_url) console.log(`existing seatgeek_url: ${result.existing_seatgeek_url}`);
    if (result.candidate) {
      console.log(`candidate: ${textCell(result.candidate.title)} | ${textCell(result.candidate.date)} | ${textCell(result.candidate.city)} | ${textCell(result.candidate.venue)}`);
      console.log(`candidate id/url: ${textCell(result.candidate.id)} | ${textCell(result.candidate.url)}`);
    } else {
      console.log("candidate: -");
    }
    console.log(`confidence score: ${result.confidence_score}`);
    console.log(`decision: ${result.decision}${result.applied ? " (applied)" : ""}`);
    if (result.skipped_reason) console.log(`skipped reason: ${result.skipped_reason}`);
    console.log(`match reason: ${textCell(result.match_reason)}`);
    console.log(`uncertainty notes: ${textCell(result.uncertainty_notes)}`);
    if (result.conflicts.length) console.log(`conflicts: ${result.conflicts.map((conflict) => `${conflict.id}:${conflict.url}`).join("; ")}`);
    console.log("---");
  }
}

function markdownTable(rows, columns) {
  const header = `| ${columns.map((column) => column.label).join(" | ")} |`;
  const divider = `| ${columns.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${columns.map((column) => markdownCell(column.value(row))).join(" | ")} |`);
  return [header, divider, ...body].join("\n");
}

function markdownCell(value) {
  return textCell(value).replace(/\|/g, "\\|");
}

async function syncPartitionedEventFiles(events, additions) {
  const changedFiles = new Set();
  for (const event of events) {
    if (!additions.has(event.id)) continue;
    const artistSlug = slugify(event.artist_slug || event.artist_name);
    if (!artistSlug) continue;
    const partitionPath = path.join(EVENTS_PARTITIONS_DIR, `${artistSlug}.json`);
    let partitionRaw;
    try {
      partitionRaw = await fs.readFile(partitionPath, "utf8");
    } catch {
      continue;
    }
    const partitionEvents = JSON.parse(partitionRaw);
    if (!Array.isArray(partitionEvents)) continue;
    let changed = false;
    for (const partitionEvent of partitionEvents) {
      if (partitionEvent.id === event.id && !isValidSeatGeekEventUrl(partitionEvent.seatgeek_url).ok) {
        partitionEvent.seatgeek_url = additions.get(event.id);
        changed = true;
      }
    }
    if (changed) {
      await fs.writeFile(partitionPath, `${JSON.stringify(partitionEvents, null, 2)}\n`);
      changedFiles.add(path.relative(REPO_ROOT, partitionPath));
    }
  }
  return [...changedFiles];
}

function renderLog(results, summary) {
  const added = results.filter((result) => result.applied);
  const skipped = results.filter((result) => result.decision === "skipped");
  const venueMismatches = results.filter((result) => result.venue_mismatch_accepted);
  const dateAdjustments = results.filter((result) => result.date_adjustment_accepted);
  const conflicts = results.filter((result) => result.conflicts.length > 0);
  const apiFailures = results.filter((result) => result.skipped_reason === "api_failure");
  const rateLimitedNotChecked = results.filter((result) => result.skipped_reason === "rate_limited_not_checked");
  const generatedAt = new Date().toISOString();

  const lines = [
    "# SeatGeek CTA auto-add log",
    "",
    `Generated: ${generatedAt}`,
    "",
    "## Run summary",
    "",
    `- Mode: ${summary.mode}`,
    `- SeatGeek client ID present: ${summary.api_environment.seatgeek_client_id_present}`,
    `- SeatGeek client secret present: ${summary.api_environment.seatgeek_client_secret_present}`,
    `- API access with client ID only: ${summary.api_environment.client_id_only_http_status === 200 ? "HTTP 200" : `not confirmed (${summary.api_environment.client_id_only_http_status || "no status"})`}`,
    `- Total events in data: ${summary.total_events}`,
    `- Ticketmaster-sourced events eligible for SeatGeek enrichment: ${summary.ticketmaster_sourced_events}`,
    `- Ticketmaster-verified events: ${summary.ticketmaster_verified_events}`,
    `- Events carrying a valid SeatGeek URL before this run: ${summary.events_with_valid_seatgeek_url}`,
    `- Events carrying a valid SeatGeek URL after this run: ${summary.after_events_with_valid_seatgeek_url}`,
    `- Ticketmaster-sourced events carrying a valid SeatGeek URL before this run: ${summary.ticketmaster_sourced_with_valid_seatgeek_url}`,
    `- Ticketmaster-sourced events carrying a valid SeatGeek URL after this run: ${summary.after_ticketmaster_sourced_with_valid_seatgeek_url}`,
    `- Ticketmaster-sourced events missing a valid SeatGeek URL before this run: ${summary.ticketmaster_sourced_missing_valid_seatgeek_url}`,
    `- Ticketmaster-sourced events missing a valid SeatGeek URL after this run: ${summary.after_ticketmaster_sourced_missing_valid_seatgeek_url}`,
    `- Ticketmaster-verified events carrying a valid SeatGeek URL before this run: ${summary.ticketmaster_verified_with_valid_seatgeek_url}`,
    `- Ticketmaster-verified events carrying a valid SeatGeek URL after this run: ${summary.after_ticketmaster_verified_with_valid_seatgeek_url}`,
    `- Ticketmaster-verified events missing a valid SeatGeek URL before this run: ${summary.ticketmaster_verified_missing_valid_seatgeek_url}`,
    `- Ticketmaster-verified events missing a valid SeatGeek URL after this run: ${summary.after_ticketmaster_verified_missing_valid_seatgeek_url}`,
    `- Events selected/logged by this run: ${summary.selected}`,
    `- Events checked by this run: ${summary.checked}`,
    `- API calls made: ${summary.api_calls_made}`,
    `- Rate-limit responses: ${summary.rate_limit_responses}`,
    `- URLs added: ${summary.added}`,
    `- Events skipped: ${summary.skipped}`,
    `- no_candidates_returned: ${summary.no_candidates_returned}`,
    `- rate_limited_not_checked: ${summary.rate_limited_not_checked}`,
    `- Stopped early: ${summary.stopped_early ? summary.stop_reason : "no"}`,
    `- Next resume showId: ${summary.next_resume_show_id || ""}`,
    `- Next recommended resume command: ${summary.next_resume_command || ""}`,
    `- Accepted venue mismatches: ${summary.accepted_venue_mismatches}`,
    `- Accepted missing-timezone date adjustments: ${summary.accepted_date_adjustments}`,
    `- Conflicts found: ${summary.conflicts_found}`,
    "",
    "## Skipped reasons",
    "",
    ...Object.entries(summary.skipped_reasons).map(([reason, count]) => `- ${reason}: ${count}`),
    "",
    "## Interpretation",
    "",
    `- \`URLs added: ${summary.added}\` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.`,
    `- ${summary.events_with_valid_seatgeek_url} event(s) carried valid SeatGeek URLs before this run; ${summary.after_events_with_valid_seatgeek_url} carry valid SeatGeek URLs after this run.`,
    `- This run queried the ${summary.ticketmaster_sourced_missing_valid_seatgeek_url} Ticketmaster-sourced event(s) that were still missing a valid \`seatgeek_url\` at the start of the run.`,
    `- SeatGeek returned high-confidence API matches for ${summary.added} of those events; the remaining ${summary.after_ticketmaster_sourced_missing_valid_seatgeek_url} Ticketmaster-sourced event(s) still lack a safe event-level SeatGeek URL.`,
    ""
  ];

  lines.push("## URLs added", "");
  lines.push("This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.");
  lines.push("");
  lines.push(added.length ? markdownTable(added, [
    { label: "showId", value: (row) => row.showId },
    { label: "artist", value: (row) => row.artist },
    { label: "date", value: (row) => row.ticketmaster.date },
    { label: "city", value: (row) => row.ticketmaster.city },
    { label: "SeatGeek URL", value: (row) => row.candidate?.url }
  ]) : "- None");
  lines.push("");

  lines.push("## Events skipped", "");
  lines.push("Skipped rows are only the Ticketmaster-sourced events that were still missing a valid `seatgeek_url` when this run started.");
  lines.push("");
  lines.push(skipped.length ? markdownTable(skipped, [
    { label: "showId", value: (row) => row.showId },
    { label: "artist", value: (row) => row.artist },
    { label: "date", value: (row) => row.ticketmaster.date },
    { label: "city", value: (row) => row.ticketmaster.city },
    { label: "reason", value: (row) => row.skipped_reason },
    { label: "best candidate", value: (row) => row.candidate?.url || "" }
  ]) : "- None");
  lines.push("");

  lines.push("## Accepted venue mismatches", "");
  lines.push(venueMismatches.length ? markdownTable(venueMismatches, [
    { label: "showId", value: (row) => row.showId },
    { label: "TTC venue", value: (row) => row.ticketmaster.venue },
    { label: "SeatGeek venue", value: (row) => row.candidate?.venue },
    { label: "URL", value: (row) => row.candidate?.url }
  ]) : "- None");
  lines.push("");

  lines.push("## Accepted missing-timezone date adjustments", "");
  lines.push(dateAdjustments.length ? markdownTable(dateAdjustments, [
    { label: "showId", value: (row) => row.showId },
    { label: "stored date", value: (row) => row.ticketmaster.date },
    { label: "SeatGeek date", value: (row) => row.candidate?.date },
    { label: "URL", value: (row) => row.candidate?.url }
  ]) : "- None");
  lines.push("");

  lines.push("## Conflicts found", "");
  lines.push(conflicts.length ? conflicts.map((result) => [
    `- ${result.showId} (${result.artist}, ${result.ticketmaster.date}, ${result.ticketmaster.city})`,
    ...result.conflicts.map((conflict) => `  - ${conflict.confidence_score}: ${conflict.url}`)
  ].join("\n")).join("\n") : "- None");
  lines.push("");

  lines.push("## Rate-limited / not checked", "");
  lines.push(rateLimitedNotChecked.length ? markdownTable(rateLimitedNotChecked, [
    { label: "showId", value: (row) => row.showId },
    { label: "artist", value: (row) => row.artist },
    { label: "date", value: (row) => row.ticketmaster.date },
    { label: "city", value: (row) => row.ticketmaster.city },
    { label: "reason", value: (row) => row.match_reason }
  ]) : "- None");
  lines.push("");

  lines.push("## API/environment failures", "");
  lines.push(apiFailures.length ? markdownTable(apiFailures, [
    { label: "showId", value: (row) => row.showId },
    { label: "artist", value: (row) => row.artist },
    { label: "reason", value: (row) => row.match_reason }
  ]) : "- None");
  lines.push("");

  return `${lines.join("\n").trimEnd()}\n`;
}

async function confirmSeatGeekApiAccess() {
  const clientId = clean(process.env.SEATGEEK_CLIENT_ID, 255);
  if (!clientId) return { ok: false, status: 0, error: "SEATGEEK_CLIENT_ID missing" };
  const params = new URLSearchParams({ client_id: clientId, per_page: "1", q: "Morgan Wallen" });
  try {
    const response = await httpsJson(`${SEATGEEK_EVENTS_ENDPOINT}?${params.toString()}`);
    return { ok: response.ok, status: response.status, error: response.ok ? "" : `HTTP ${response.status}` };
  } catch (error) {
    return { ok: false, status: 0, error: clean(error?.message || error, 200) };
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return 0;
  }

  const clientId = clean(process.env.SEATGEEK_CLIENT_ID, 255);
  if (!clientId) throw new Error("SEATGEEK_CLIENT_ID is required for SeatGeek API enrichment");

  if (options.resumeFromLog && !options.resumeFromId) {
    options.resumeFromId = await resumeShowIdFromLog(options.logPath);
    if (options.verbose && !options.json) console.error(`Resume from log resolved to: ${options.resumeFromId || "<none>"}`);
  }

  const apiAccess = await confirmSeatGeekApiAccess();
  const apiEnvironment = {
    seatgeek_client_id_present: Boolean(clientId),
    seatgeek_client_secret_present: Boolean(clean(process.env.SEATGEEK_CLIENT_SECRET, 255)),
    client_id_only_http_status: apiAccess.status,
    client_id_only_ok: apiAccess.ok,
    client_id_only_error: apiAccess.error
  };

  const eventsRaw = await fs.readFile(EVENTS_PATH, "utf8");
  const events = JSON.parse(eventsRaw);
  const beforeEvents = JSON.parse(eventsRaw);
  if (!Array.isArray(events)) throw new Error("public/data/events.json must contain an array");

  const eligibleOptions = { ...options, limit: null };
  const eligible = selectEvents(events, eligibleOptions);
  const selected = options.limit === null ? eligible : eligible.slice(0, options.limit);
  const selectedIds = new Set(selected.map((event) => event.id));
  const results = [];
  const additions = new Map();
  const runState = {
    apiCalls: 0,
    rateLimitResponses: 0,
    stopReason: "",
    nextResumeShowId: ""
  };

  for (let index = 0; index < selected.length; index += 1) {
    const event = selected[index];
    const apiResult = await fetchSeatGeekCandidates(event, options, runState);
    const tmLocalDate = apiResult.localDate || localDateFromIso(event.datetime_iso, event.timezone);

    if (apiResult.stopped && apiResult.stopReason === "rate_limited") {
      runState.stopReason = "rate_limited";
      runState.nextResumeShowId = event.id;
      const classification = notCheckedClassification(
        "rate_limited_not_checked",
        apiResult.reason || "SeatGeek API returned HTTP 429; event was not checked and no URL was applied."
      );
      results.push(formatEventResult(event, tmLocalDate, apiResult, [], classification, options, false));
      for (const remaining of selected.slice(index + 1)) {
        const remainingApiResult = emptyApiResult(remaining, "rate_limited", true);
        const remainingClassification = notCheckedClassification(
          "rate_limited_not_checked",
          "Skipped without an API search because the run stopped after SeatGeek rate limiting."
        );
        results.push(formatEventResult(remaining, remainingApiResult.localDate, remainingApiResult, [], remainingClassification, options, false));
      }
      break;
    }

    if (apiResult.stopped && apiResult.stopReason === "api_call_limit_reached") {
      runState.stopReason = "api_call_limit_reached";
      runState.nextResumeShowId = event.id;
      const classification = notCheckedClassification(
        "api_call_limit_not_checked",
        apiResult.reason || "Stopped before exceeding --max-api-calls; event was not checked and no URL was applied."
      );
      results.push(formatEventResult(event, tmLocalDate, apiResult, [], classification, options, false));
      break;
    }

    const scoredCandidates = apiResult.ok ? apiResult.candidates.map((candidate) => scoreCandidate(event, candidate, tmLocalDate)) : [];
    const classification = apiResult.ok
      ? classifyCandidate(event, scoredCandidates)
      : {
          candidate: null,
          decision: "skipped",
          skippedReason: "api_failure",
          confidenceScore: 0,
          matchReason: apiResult.reason,
          uncertaintyNotes: ["SeatGeek API search did not return usable candidates."],
          conflicts: []
        };
    const shouldApply = options.applyHighConfidence && classification.decision === "high_confidence";
    if (shouldApply) additions.set(event.id, classification.candidate.seatgeek.url);
    results.push(formatEventResult(event, tmLocalDate, apiResult, scoredCandidates, classification, options, shouldApply));
  }

  if (!runState.nextResumeShowId) {
    const lastResult = results.at(-1);
    const lastIndex = lastResult ? eligible.findIndex((event) => event.id === lastResult.showId) : -1;
    const nextEligible = lastIndex >= 0 ? eligible[lastIndex + 1] : null;
    runState.nextResumeShowId = nextEligible?.id || "";
  }

  if (options.applyHighConfidence && additions.size > 0) {
    for (const event of events) {
      if (selectedIds.has(event.id) && additions.has(event.id) && !isValidSeatGeekEventUrl(event.seatgeek_url).ok) {
        event.seatgeek_url = additions.get(event.id);
      }
    }
    await fs.writeFile(EVENTS_PATH, `${JSON.stringify(events, null, 2)}\n`);
    await syncPartitionedEventFiles(events, additions);
  }

  const summary = summarize(results, options, apiEnvironment, runState, beforeEvents, events);
  await fs.writeFile(options.logPath, renderLog(results, summary));

  if (options.json) {
    console.log(JSON.stringify({ summary, results }, null, 2));
  } else {
    printTextResults(results, summary);
  }

  return 0;
}
main().then((code) => {
  process.exitCode = code;
}).catch((error) => {
  const message = clean(error?.message || error, 500);
  if (process.argv.includes("--json")) {
    console.error(JSON.stringify({ error: message }, null, 2));
  } else {
    console.error(`Error: ${message}`);
  }
  process.exitCode = 1;
});
