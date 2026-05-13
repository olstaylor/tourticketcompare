#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const EVENTS_PATH = path.join(REPO_ROOT, "public", "data", "events.json");
const SEATGEEK_EVENTS_ENDPOINT = "https://api.seatgeek.com/2/events";
const DEFAULT_PER_PAGE = 10;
const MAX_PER_PAGE = 20;
const HIGH_CONFIDENCE_MIN_SCORE = 82;
const REVIEW_MIN_SCORE = 45;
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
    artist: "",
    limit: null,
    refresh: false,
    json: false,
    verbose: false
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--refresh") {
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
    } else if (arg === "--limit") {
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) throw new Error("--limit requires a positive number");
      const parsed = Number.parseInt(value, 10);
      if (!Number.isFinite(parsed) || parsed < 1) throw new Error("--limit must be a positive number");
      options.limit = parsed;
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
  return `Usage: node scripts/enrich-seatgeek-events.mjs [options]\n\nDry-run SeatGeek API enrichment for Ticketmaster-verified events. Writes no files.\n\nOptions:\n  --artist <slug-or-name>  Filter by artist slug or name\n  --limit <number>         Process at most this many selected events\n  --refresh                Include events that already have seatgeek_url\n  --json                   Emit machine-readable JSON\n  --verbose                Include API query and candidate diagnostics\n  -h, --help               Show this help\n\nEnvironment:\n  SEATGEEK_CLIENT_ID       Required\n  SEATGEEK_CLIENT_SECRET   Optional; sent only when present\n`;
}

function clean(value, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

function slugify(value) {
  return clean(value, 200)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeText(value) {
  return clean(value, 500)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(the|tour|tickets|ticket|live|concert|presented|presents)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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

function safeUrlForDiagnostics(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return "";
  }
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

function eventIsTicketmasterVerified(event) {
  const source = clean(event.source_type).toLowerCase();
  const tmId = clean(event.ticketmaster_event_id);
  const tmUrl = clean(event.ticketmaster_url, 2048);
  const provider = event.provider_links?.ticketmaster;
  return source === "ticketmaster" && Boolean(tmId) && /^https:\/\//i.test(tmUrl) && provider?.verified === true;
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

function selectEvents(events, options) {
  let selected = events.filter(eventIsTicketmasterVerified);
  if (!options.refresh) {
    selected = selected.filter((event) => !clean(event.seatgeek_url, 2048));
  }
  if (options.artist) {
    selected = selected.filter((event) => artistMatches(event, options.artist));
  }
  if (options.limit !== null) {
    selected = selected.slice(0, options.limit);
  }
  return selected;
}

function buildSearchQuery(event) {
  const artist = clean(event.artist_name || event.artist_slug, 120);
  const eventTitle = clean(event.event_name || event.tour_name, 180);
  const venue = clean(event.venue, 160);
  const city = clean(event.city, 100);
  const localDate = localDateFromIso(event.datetime_iso, event.timezone);
  const dateStart = addDays(localDate, -1);
  const dateEnd = addDays(localDate, 2);

  const params = new URLSearchParams({
    client_id: clean(process.env.SEATGEEK_CLIENT_ID, 255),
    per_page: String(DEFAULT_PER_PAGE),
    sort: "score.desc",
    q: [artist, venue, city].filter(Boolean).join(" ")
  });

  const clientSecret = clean(process.env.SEATGEEK_CLIENT_SECRET, 255);
  if (clientSecret) params.set("client_secret", clientSecret);
  if (city) params.set("venue.city", city);
  if (dateStart) params.set("datetime_utc.gte", `${dateStart}T00:00:00`);
  if (dateEnd) params.set("datetime_utc.lte", `${dateEnd}T23:59:59`);
  params.set("taxonomies.name", "concert");

  return {
    url: `${SEATGEEK_EVENTS_ENDPOINT}?${params.toString()}`,
    safeUrl: `${SEATGEEK_EVENTS_ENDPOINT}?${redactSearchParams(params).toString()}`,
    localDate,
    terms: { artist, eventTitle, venue, city, dateStart, dateEnd }
  };
}

function redactSearchParams(params) {
  const redacted = new URLSearchParams(params);
  if (redacted.has("client_id")) redacted.set("client_id", "<redacted>");
  if (redacted.has("client_secret")) redacted.set("client_secret", "<redacted>");
  return redacted;
}

async function fetchSeatGeekCandidates(event, options) {
  const query = buildSearchQuery(event);
  if (options.verbose && !options.json) {
    console.error(`Query ${event.id}: ${query.safeUrl}`);
  }

  const response = await fetch(query.url, { headers: { Accept: "application/json" } });
  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      reason: `SeatGeek API returned HTTP ${response.status}`,
      query: query.safeUrl,
      localDate: query.localDate,
      candidates: []
    };
  }

  const payload = await response.json();
  const candidates = Array.isArray(payload.events) ? payload.events.slice(0, MAX_PER_PAGE) : [];
  return {
    ok: true,
    status: response.status,
    reason: "ok",
    query: query.safeUrl,
    localDate: query.localDate,
    candidates
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

function metroLikeMatch(eventCity, sgVenue) {
  const eventState = clean(sgVenue?.state, 20).toLowerCase();
  const display = clean(sgVenue?.display_location, 160);
  const eventCityNorm = normalizeText(eventCity);
  const candidateCityNorm = normalizeText(sgVenue?.city || "");
  if (eventCityNorm && candidateCityNorm && eventCityNorm === candidateCityNorm) return true;
  if (eventCityNorm && normalizeText(display).includes(eventCityNorm)) return true;
  // Small conservative allowance for common stadium/metro data differences where SeatGeek may use the suburb.
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
    "foxborough|boston"
  ]);
  return Boolean(eventCityNorm && candidateCityNorm && eventState && metroPairs.has(`${eventCityNorm}|${candidateCityNorm}`));
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
  const venueSimilarity = diceSimilarity(event.venue, candidateVenue(candidate));
  const sgLocalDate = candidateLocalDate(candidate);
  const exactDate = Boolean(tmLocalDate && sgLocalDate && tmLocalDate === sgLocalDate);
  const adjacentUtcDate = Boolean(tmLocalDate && candidate.datetime_utc && Math.abs(new Date(`${tmLocalDate}T12:00:00Z`) - new Date(candidate.datetime_utc)) <= 36 * 60 * 60 * 1000);
  const cityExact = normalizeText(event.city) === normalizeText(candidate.venue?.city || "");
  const cityMetro = metroLikeMatch(event.city, candidate.venue);
  const urlValidation = isValidSeatGeekEventUrl(candidate.url);

  if (bestPerformerSimilarity >= 0.9) {
    score += 30;
    reasons.push("strong performer match");
  } else if (bestPerformerSimilarity >= 0.55 || titleSimilarity >= 0.55) {
    score += 18;
    reasons.push("probable artist/title match");
    notes.push("performer or title match is not exact");
  } else {
    notes.push("artist/performer match is weak or absent");
  }

  if (exactDate) {
    score += 25;
    reasons.push("same local date");
  } else if (adjacentUtcDate) {
    score += 14;
    reasons.push("nearby UTC date");
    notes.push("date may require timezone review");
  } else {
    notes.push("local date does not match");
  }

  if (cityExact) {
    score += 18;
    reasons.push("city match");
  } else if (cityMetro) {
    score += 13;
    reasons.push("city/metro match");
    notes.push("city is metro-equivalent rather than exact");
  } else {
    notes.push("city does not match");
  }

  if (venueSimilarity >= 0.88 || containsNormalized(event.venue, candidateVenue(candidate)) || containsNormalized(candidateVenue(candidate), event.venue)) {
    score += 22;
    reasons.push("venue match");
  } else if (venueSimilarity >= 0.55) {
    score += 10;
    reasons.push("possible venue match");
    notes.push("venue naming is similar but not exact");
  } else {
    notes.push("venue match is weak or absent");
  }

  if (urlValidation.ok) {
    score += 5;
    reasons.push("valid event-level SeatGeek URL");
  } else {
    score -= 20;
    notes.push(`SeatGeek URL invalid: ${urlValidation.reason}`);
  }

  return {
    raw: candidate,
    seatgeek: {
      id: candidate.id ?? null,
      title: clean(candidate.title, 200),
      date: sgLocalDate,
      city: candidateCity(candidate),
      venue: candidateVenue(candidate),
      url: clean(candidate.url, 2048),
      safeUrl: safeUrlForDiagnostics(candidate.url),
      performers,
      score: typeof candidate.score === "number" ? candidate.score : null
    },
    score: Math.max(0, Math.min(100, Math.round(score))),
    signals: {
      performerSimilarity: Number(bestPerformerSimilarity.toFixed(3)),
      titleSimilarity: Number(titleSimilarity.toFixed(3)),
      venueSimilarity: Number(venueSimilarity.toFixed(3)),
      exactDate,
      adjacentUtcDate,
      cityExact,
      cityMetro,
      validUrl: urlValidation.ok
    },
    reasons,
    notes
  };
}

function classifyCandidate(scoredCandidates) {
  if (!scoredCandidates.length) {
    return {
      candidate: null,
      decision: "no_match",
      confidenceScore: 0,
      matchReason: "No SeatGeek candidates returned for the event search.",
      uncertaintyNotes: ["No candidate passed basic API search retrieval."]
    };
  }

  const sorted = [...scoredCandidates].sort((a, b) => b.score - a.score);
  const best = sorted[0];
  const runnerUp = sorted[1] || null;
  const similarCompetition = Boolean(runnerUp && best.score - runnerUp.score < 8 && runnerUp.score >= REVIEW_MIN_SCORE);
  const hardRequirements = best.signals.validUrl && best.signals.exactDate && (best.signals.cityExact || best.signals.cityMetro) && best.signals.performerSimilarity >= 0.9 && best.signals.venueSimilarity >= 0.78;
  const reviewSignals = best.signals.validUrl && best.score >= REVIEW_MIN_SCORE && (best.signals.exactDate || best.signals.adjacentUtcDate) && (best.signals.performerSimilarity >= 0.55 || best.signals.titleSimilarity >= 0.55);

  if (hardRequirements && best.score >= HIGH_CONFIDENCE_MIN_SCORE && !similarCompetition) {
    return {
      candidate: best,
      decision: "high_confidence",
      confidenceScore: best.score,
      matchReason: best.reasons.join("; ") || "Strong candidate match.",
      uncertaintyNotes: best.notes
    };
  }

  if (reviewSignals) {
    const notes = [...best.notes];
    if (similarCompetition) notes.push("multiple plausible candidates have similar confidence");
    if (!best.signals.cityExact && best.signals.cityMetro) notes.push("city requires metro review");
    if (best.signals.venueSimilarity < 0.78) notes.push("venue requires human review");
    return {
      candidate: best,
      decision: "needs_review",
      confidenceScore: best.score,
      matchReason: best.reasons.join("; ") || "Candidate has partial date/artist/city evidence.",
      uncertaintyNotes: [...new Set(notes)]
    };
  }

  return {
    candidate: best,
    decision: "no_match",
    confidenceScore: best.score,
    matchReason: "No candidate passed the required artist/date/city/event-URL checks.",
    uncertaintyNotes: [...new Set(best.notes.length ? best.notes : ["Best candidate did not meet minimum match rules."])]
  };
}

function formatEventResult(event, tmLocalDate, apiResult, scoredCandidates, classification, options) {
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
      url: candidate.url
    } : null,
    confidence_score: classification.confidenceScore,
    decision: classification.decision,
    match_reason: classification.matchReason,
    uncertainty_notes: classification.uncertaintyNotes,
    ...(options.verbose ? {
      api: {
        ok: apiResult.ok,
        status: apiResult.status,
        reason: apiResult.reason,
        query: apiResult.query,
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

function textCell(value) {
  const raw = Array.isArray(value) ? value.join("; ") : String(value ?? "");
  return raw.replace(/\s+/g, " ").trim() || "-";
}

function printTextResults(results, summary) {
  console.log(`SeatGeek dry-run enrichment checked ${summary.checked} event(s): ${summary.high_confidence} high_confidence, ${summary.needs_review} needs_review, ${summary.no_match} no_match.`);
  console.log("No files were written. Review high-confidence matches before any future apply step.\n");

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
    console.log(`decision: ${result.decision}`);
    console.log(`match reason: ${textCell(result.match_reason)}`);
    console.log(`uncertainty notes: ${textCell(result.uncertainty_notes)}`);
    if (result.api) {
      console.log(`api: ${result.api.status || "-"} | ${result.api.reason} | candidates=${result.api.candidate_count}`);
      console.log(`api query: ${result.api.query}`);
    }
    console.log("---");
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return 0;
  }

  const clientId = clean(process.env.SEATGEEK_CLIENT_ID, 255);
  if (!clientId) {
    throw new Error("SEATGEEK_CLIENT_ID is required for SeatGeek API enrichment dry runs");
  }

  const eventsRaw = await fs.readFile(EVENTS_PATH, "utf8");
  const events = JSON.parse(eventsRaw);
  if (!Array.isArray(events)) throw new Error("public/data/events.json must contain an array");

  const selected = selectEvents(events, options);
  const results = [];

  for (const event of selected) {
    const apiResult = await fetchSeatGeekCandidates(event, options);
    const tmLocalDate = apiResult.localDate || localDateFromIso(event.datetime_iso, event.timezone);
    const scoredCandidates = apiResult.ok ? apiResult.candidates.map((candidate) => scoreCandidate(event, candidate, tmLocalDate)) : [];
    const classification = apiResult.ok
      ? classifyCandidate(scoredCandidates)
      : {
          candidate: null,
          decision: "no_match",
          confidenceScore: 0,
          matchReason: apiResult.reason,
          uncertaintyNotes: ["SeatGeek API search did not return usable candidates."]
        };
    results.push(formatEventResult(event, tmLocalDate, apiResult, scoredCandidates, classification, options));
  }

  const summary = {
    selected: selected.length,
    checked: results.length,
    high_confidence: results.filter((result) => result.decision === "high_confidence").length,
    needs_review: results.filter((result) => result.decision === "needs_review").length,
    no_match: results.filter((result) => result.decision === "no_match").length,
    wrote_files: false,
    refresh: options.refresh,
    artist_filter: options.artist || null,
    limit: options.limit
  };

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
