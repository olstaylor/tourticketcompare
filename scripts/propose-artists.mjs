#!/usr/bin/env node
// Proposal-only Ticketmaster Discovery importer.
//
// Reads a list of artist names, matches them to Ticketmaster attractions with
// confidence scoring, pulls upcoming Ticketmaster events, and writes candidate
// review files to a timestamped directory under candidates/.
//
// This script is DRY-RUN ONLY. It never edits public/data/*, functions/*, or
// any production file. It does not create artists, change affiliate behaviour,
// or invent tour names, demand claims, prices, or availability. Applying an
// approved batch is a separate, not-yet-implemented step.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const CANDIDATES_ROOT = path.join(REPO_ROOT, "candidates");

const DEFAULT_DISCOVERY_BASE = "https://app.ticketmaster.com/discovery/v2";
const DEFAULT_MIN_CONFIDENCE = 0.85;
const DEFAULT_MAX_EVENTS = 100;
const DEFAULT_DELAY_MS = 250; // Ticketmaster catalog rate limit: 5 req/s.
const DEFAULT_TIMEOUT_MS = 20_000;

const CSV_COLUMNS = [
  "id",
  "artist_slug",
  "artist_name",
  "country",
  "city",
  "venue",
  "datetime_iso",
  "timezone",
  "tour_name",
  "status",
  "ticketmaster_event_id",
  "ticketmaster_url",
  "seatgeek_event_id",
  "seatgeek_url",
  "vividseats_event_id",
  "vividseats_url"
];

const ALLOWED_STATUSES = new Set(["draft", "announced", "on-sale", "past"]);
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PLACEHOLDER_MARKERS = ["example.com", "placeholder", "your-link", "replace-me", "localhost", "127.0.0.1"];

// Ticketmaster Discovery returns inconsistent display names for the same
// country (e.g. "Great Britain" vs "United Kingdom"). This map only renames
// known synonyms to a single canonical label - it never invents a country.
const COUNTRY_NORMALIZATION = new Map([["great britain", "United Kingdom"]]);

// Share of a multi-artist batch a single artist may hold before review is
// likely skewed. Used only to surface a warning, never to drop rows.
const ARTIST_DOMINANCE_THRESHOLD = 0.8;

function usage() {
  return `Usage: node scripts/propose-artists.mjs [options]

Proposal-only Ticketmaster Discovery importer. Writes candidate review files
only; it never edits production data, affiliate logic, or any protected file.

Options:
  --artists "A,B,C"      Comma-separated artist names (repeatable)
  --input <path>         File with one artist name per line (# starts a comment)
  --country <CC>         Optional ISO country filter for events (e.g. US, GB)
  --min-confidence <n>   Match threshold 0..1 (default: ${DEFAULT_MIN_CONFIDENCE})
  --max-events <n>       Max events fetched per artist (default: ${DEFAULT_MAX_EVENTS})
  --delay-ms <n>         Delay between API requests (default: ${DEFAULT_DELAY_MS})
  --out <dir>            Output directory (default: candidates/artists-<timestamp>)
  --verbose              Log redacted request URLs and scoring detail
  --diagnose-ticketmaster
                        Run safe connectivity/auth diagnostics only
  --self-test            Run built-in checks without calling Ticketmaster
  -h, --help             Show this help

Environment:
  TICKETMASTER_API_KEY            Required. Read from env or .dev.vars/.env.
  TICKETMASTER_DISCOVERY_BASE_URL Optional override (default: ${DEFAULT_DISCOVERY_BASE})

This script does NOT automate: marketing copy, indexing decisions, affiliate
vanity links, provider enablement, or applying candidates to production.
`;
}

function clean(value, max = 2048) {
  return String(value ?? "").trim().slice(0, max);
}

function parseArgs(argv) {
  const options = {
    artists: [],
    inputPath: "",
    country: "",
    minConfidence: DEFAULT_MIN_CONFIDENCE,
    maxEvents: DEFAULT_MAX_EVENTS,
    delayMs: DEFAULT_DELAY_MS,
    outDir: "",
    verbose: false,
    diagnoseTicketmaster: false,
    selfTest: false,
    help: false
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => argv[(i += 1)];
    switch (arg) {
      case "--artists":
        for (const part of clean(next()).split(",")) {
          const name = part.trim();
          if (name) options.artists.push(name);
        }
        break;
      case "--input":
        options.inputPath = clean(next());
        break;
      case "--country":
        options.country = clean(next(), 2).toUpperCase();
        break;
      case "--min-confidence":
        options.minConfidence = Number(next());
        break;
      case "--max-events":
        options.maxEvents = Number(next());
        break;
      case "--delay-ms":
        options.delayMs = Number(next());
        break;
      case "--out":
        options.outDir = clean(next());
        break;
      case "--verbose":
        options.verbose = true;
        break;
      case "--diagnose-ticketmaster":
        options.diagnoseTicketmaster = true;
        break;
      case "--self-test":
        options.selfTest = true;
        break;
      case "-h":
      case "--help":
        options.help = true;
        break;
      default:
        throw new Error(`Unknown option: ${arg}`);
    }
  }
  if (!Number.isFinite(options.minConfidence) || options.minConfidence <= 0 || options.minConfidence > 1) {
    options.minConfidence = DEFAULT_MIN_CONFIDENCE;
  }
  if (!Number.isInteger(options.maxEvents) || options.maxEvents < 1) options.maxEvents = DEFAULT_MAX_EVENTS;
  if (!Number.isFinite(options.delayMs) || options.delayMs < 0) options.delayMs = DEFAULT_DELAY_MS;
  return options;
}

// Minimal dotenv-style reader so local runs can pick up TICKETMASTER_API_KEY
// from .dev.vars / .env without exporting it. Real env vars take precedence.
async function readEnvFile(name) {
  try {
    const text = await fs.readFile(path.join(REPO_ROOT, name), "utf8");
    const out = {};
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 0) continue;
      out[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
    }
    return out;
  } catch {
    return {};
  }
}

async function resolveApiKey() {
  if (clean(process.env.TICKETMASTER_API_KEY)) return clean(process.env.TICKETMASTER_API_KEY);
  for (const file of [".dev.vars", ".env"]) {
    const parsed = await readEnvFile(file);
    const value = clean(parsed.TICKETMASTER_API_KEY);
    if (value && !/your_key_here/i.test(value)) return value;
  }
  return "";
}

function normalizeName(value) {
  return clean(value, 200)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function slugify(value) {
  return clean(value, 120)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    const curr = [i];
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    prev = curr;
  }
  return prev[b.length];
}

// Returns 0..1 similarity between an input name and a candidate name.
function nameSimilarity(input, candidate) {
  const a = normalizeName(input);
  const b = normalizeName(candidate);
  if (!a || !b) return 0;
  if (a === b) return 1;
  const distance = levenshtein(a, b);
  const longest = Math.max(a.length, b.length);
  return longest === 0 ? 0 : 1 - distance / longest;
}

function isPlaceholderUrl(value) {
  const lower = clean(value).toLowerCase();
  return PLACEHOLDER_MARKERS.some((marker) => lower.includes(marker));
}

// Ticketmaster Discovery can return event `url` values that are already
// Impact affiliate links (host ticketmaster.evyy.net) wrapping the real
// destination in a `u=` query param. events.json must store the plain
// destination URL only - affiliate wrapping happens at runtime in
// /api/out. resolveTicketmasterUrl unwraps such links and reports the
// final destination host so non-Ticketmaster targets can be dropped.
function resolveTicketmasterUrl(value) {
  let current = clean(value, 2048);
  if (!current) return { url: "", host: "", wasWrapped: false };
  let wasWrapped = false;
  for (let depth = 0; depth < 4; depth += 1) {
    let parsed;
    try {
      parsed = new URL(current);
    } catch {
      return { url: current, host: "", wasWrapped };
    }
    if (/(^|\.)evyy\.net$/i.test(parsed.hostname)) {
      const target = clean(parsed.searchParams.get("u"), 2048);
      if (!target) return { url: current, host: parsed.hostname.toLowerCase(), wasWrapped };
      current = target;
      wasWrapped = true;
      continue;
    }
    return { url: current, host: parsed.hostname.toLowerCase(), wasWrapped };
  }
  return { url: current, host: "", wasWrapped };
}

// True only for genuine Ticketmaster storefront domains (ticketmaster.com,
// .co.uk, .ca, .de, .es, .nl, ...). Resellers such as axs.com or
// seatgeek.com return false so those events are not published as
// Ticketmaster events.
function isTicketmasterHost(host) {
  return /(^|\.)ticketmaster\.[a-z.]+$/i.test(clean(host));
}

// Classifies the `url` field of a Discovery attraction as artist-page
// evidence for the candidate outputs. The URL is preserved only when
// Ticketmaster itself supplied a public storefront artist page; nothing is
// constructed or guessed. A "sourced" status is still evidence, not
// verification: a human must open the URL in a browser before it is used
// anywhere (docs/SAFE_NEXT_ARTIST_WORKFLOW.md gates 1 and 3).
const ARTIST_PAGE_URL_SOURCE = "discovery_attraction_url";

function classifyArtistPageUrl(rawUrl) {
  const raw = clean(rawUrl, 2048);
  if (!raw) {
    return { url: "", status: "missing", source: null, notes: ["Discovery attraction response contained no url field."] };
  }
  const notes = [];
  const resolved = resolveTicketmasterUrl(raw);
  if (resolved.wasWrapped) {
    notes.push("Unwrapped from an Impact affiliate link returned by Discovery; only the plain storefront URL is preserved.");
  }
  const invalid = (reason) => ({ url: "", status: "invalid", source: ARTIST_PAGE_URL_SOURCE, notes: [...notes, reason] });
  let parsed;
  try {
    parsed = new URL(resolved.url);
  } catch {
    return invalid(`not a parseable absolute URL: '${clean(raw, 120)}'`);
  }
  if (parsed.protocol !== "https:") return invalid(`protocol '${parsed.protocol}' is not https`);
  if (isPlaceholderUrl(resolved.url)) return invalid("URL contains a placeholder/localhost marker");
  const host = parsed.hostname.toLowerCase();
  if (!isTicketmasterHost(host)) return invalid(`host '${host}' is not a Ticketmaster storefront domain`);
  let pathName = parsed.pathname || "/";
  try {
    pathName = decodeURIComponent(pathName);
  } catch {
    // Keep the raw path if it is not valid percent-encoding.
  }
  pathName = pathName.replace(/\/+$/, "");
  if (host.startsWith("app.") || /^\/discovery(\/|$)/i.test(pathName)) {
    return invalid("Ticketmaster API endpoint, not a public storefront page");
  }
  if (!pathName) return invalid("Ticketmaster homepage, not an artist page");
  if (/(^|\/)event\//i.test(pathName)) return invalid("event URL, not an artist page");
  if (/^\/search(\/|$)/i.test(pathName)) return invalid("search page, not an artist page");
  if (/\/artist\/\d+$/i.test(pathName)) {
    return {
      url: resolved.url,
      status: "sourced",
      source: ARTIST_PAGE_URL_SOURCE,
      notes: [
        ...notes,
        "Public storefront artist page supplied by Ticketmaster Discovery. A human must still open this exact URL in a browser before promotion; automation cannot substitute for that step."
      ]
    };
  }
  return {
    url: resolved.url,
    status: "needs_review",
    source: ARTIST_PAGE_URL_SOURCE,
    notes: [...notes, "Ticketmaster storefront URL whose path does not match the expected /artist/<id> shape; review by hand."]
  };
}

// The Ticketmaster Discovery `event.id` (e.g. "vv1A...") is NOT the id used in
// the storefront event URL path. /api/out validates that ticketmaster_event_id
// appears in the stored ticketmaster_url, so the id written to events data must
// be the one in the URL, i.e. its last path segment.
function ticketmasterEventIdFromUrl(value) {
  let parsed;
  try {
    parsed = new URL(clean(value, 2048));
  } catch {
    return "";
  }
  const segments = parsed.pathname.split("/").filter(Boolean);
  if (!segments.length) return "";
  let last = segments[segments.length - 1];
  try {
    last = decodeURIComponent(last);
  } catch {
    // Keep the raw segment if it is not valid percent-encoding.
  }
  return clean(last, 255);
}

// Maps a raw Ticketmaster country display name to a canonical label.
// Returns the original name unchanged when no synonym is known.
function normalizeCountry(value) {
  const raw = clean(value, 120);
  if (!raw) return { country: "", normalized: false };
  const mapped = COUNTRY_NORMALIZATION.get(raw.toLowerCase());
  if (mapped && mapped !== raw) return { country: mapped, normalized: true };
  return { country: raw, normalized: false };
}

function csvCell(value) {
  const text = clean(value, 1024);
  if (/[",\r\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

function toCsv(rows) {
  const lines = [CSV_COLUMNS.join(",")];
  for (const row of rows) {
    lines.push(CSV_COLUMNS.map((col) => csvCell(row[col])).join(","));
  }
  return `${lines.join("\n")}\n`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function discoveryFetch(url, { verbose }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
  try {
    if (verbose) console.error(`  GET ${url.replace(/apikey=[^&]+/i, "apikey=REDACTED")}`);
    const response = await fetch(url, { signal: controller.signal, headers: { Accept: "application/json" } });
    if (!response.ok) {
      return { ok: false, status: response.status, error: `HTTP ${response.status}` };
    }
    return { ok: true, data: await response.json() };
  } catch (error) {
    return { ok: false, status: 0, error: error.name === "AbortError" ? "request timed out" : String(error.message || error) };
  } finally {
    clearTimeout(timer);
  }
}

function classifyDiscoveryFailure(response, context) {
  const status = Number(response?.status || 0);
  if (!status) {
    const err = clean(response?.error).toLowerCase();
    if (!clean(process.env.TICKETMASTER_API_KEY)) {
      return `${context} failed: missing API key`;
    }
    if (err.includes("timed out")) return `${context} failed: network/DNS/TLS/fetch failure (request timed out)`;
    return `${context} failed: network/DNS/TLS/fetch failure (${clean(response?.error) || "fetch error"})`;
  }
  if (status === 401 || status === 403) return `${context} failed: HTTP ${status} auth issue`;
  if (status === 429) return `${context} failed: HTTP 429 rate limit`;
  return `${context} failed: HTTP ${status} error`;
}

function discoveryStatusToStatus(code) {
  // Ticketmaster Discovery status codes -> events.json status enum.
  // Only factual mapping; never invents a more optimistic state.
  return clean(code).toLowerCase() === "onsale" ? "on-sale" : "announced";
}

function mapEvent(artistSlug, artistName, tmEvent) {
  const venue = tmEvent?._embedded?.venues?.[0] || {};
  const start = tmEvent?.dates?.start || {};
  const datetimeIso = clean(start.dateTime) || clean(start.localDate);
  const year = datetimeIso.slice(0, 4) || "tba";
  const city = clean(venue?.city?.name);
  const countryRaw = clean(venue?.country?.name);
  const countryCode = clean(venue?.country?.countryCode, 8);
  const { country, normalized: countryNormalized } = normalizeCountry(countryRaw);
  const tmEventId = clean(tmEvent?.id, 255);
  const citySlug = slugify(city) || "tba";
  const warnings = [];
  if (!clean(start.dateTime)) warnings.push("event has a date but no exact time (datetime_iso is date-only)");
  if (!city) warnings.push("event missing city");
  if (!venue?.name) warnings.push("event missing venue name");
  if (!country) warnings.push("event missing country");
  const rawUrl = clean(tmEvent?.url, 2048);
  const resolved = resolveTicketmasterUrl(rawUrl);
  const url = resolved.url;
  if (url && isPlaceholderUrl(url)) warnings.push("event url looks like a placeholder");
  const onTicketmasterHost = isTicketmasterHost(resolved.host);
  // An event whose link resolves to a non-Ticketmaster storefront
  // (e.g. AXS, SeatGeek) cannot be published as a Ticketmaster event.
  let urlRejection = null;
  if (rawUrl && url && !onTicketmasterHost) {
    urlRejection = `event url resolves to non-Ticketmaster host '${resolved.host || "unknown"}'`;
  }
  const ticketmasterUrl = url && !isPlaceholderUrl(url) && onTicketmasterHost ? url : "";

  return {
    row: {
      id: `tm-${artistSlug}-${year}-${citySlug}-${tmEventId.toLowerCase()}`,
      artist_slug: artistSlug,
      artist_name: artistName,
      country,
      city,
      venue: clean(venue?.name),
      datetime_iso: datetimeIso,
      timezone: clean(start.timeZone || tmEvent?.dates?.timezone),
      tour_name: "", // Never inferred: Ticketmaster does not return a tour name.
      status: discoveryStatusToStatus(tmEvent?.dates?.status?.code),
      // Taken from the URL path, not tmEvent.id: /api/out requires this id to
      // appear in ticketmaster_url before it will redirect the event.
      ticketmaster_event_id: ticketmasterEventIdFromUrl(ticketmasterUrl),
      ticketmaster_url: ticketmasterUrl,
      seatgeek_event_id: "",
      seatgeek_url: "",
      vividseats_event_id: "",
      vividseats_url: ""
    },
    warnings,
    // Set when the event link resolves off Ticketmaster; the partition
    // step uses it to route the row into events.rejected.json.
    urlRejection,
    // Source country metadata kept for report.json auditing only; never
    // written into events.csv (its schema is fixed by csv-to-events.py).
    countrySource: {
      raw: countryRaw,
      code: countryCode,
      normalized: countryNormalized
    }
  };
}

// Returns plain-text reasons a candidate row is not apply-ready. An empty
// array means the row can go into events.csv; any reason routes it to
// events.rejected.json instead.
function rowIssues(row) {
  const issues = [];
  for (const field of ["id", "artist_slug", "artist_name", "city", "country", "venue", "datetime_iso"]) {
    if (!clean(row[field])) issues.push(`missing required field '${field}'`);
  }
  if (row.artist_slug && !SLUG_RE.test(row.artist_slug)) {
    issues.push(`artist_slug '${row.artist_slug}' is not lowercase-hyphenated`);
  }
  if (row.datetime_iso && Number.isNaN(Date.parse(row.datetime_iso))) {
    issues.push(`datetime_iso '${row.datetime_iso}' is not parseable`);
  }
  if (row.status && !ALLOWED_STATUSES.has(row.status)) {
    issues.push(`status '${row.status}' not in allowed set`);
  }
  if (row.timezone && !row.timezone.includes("/")) {
    issues.push(`timezone '${row.timezone}' is not IANA-like`);
  }
  if (row.ticketmaster_url && isPlaceholderUrl(row.ticketmaster_url)) {
    issues.push("ticketmaster_url is a placeholder");
  }
  return issues;
}

function pickAttraction(inputName, attractions, minConfidence) {
  const scored = attractions
    .map((attraction) => ({
      attraction,
      confidence: Number(nameSimilarity(inputName, attraction?.name).toFixed(4))
    }))
    .sort((a, b) => b.confidence - a.confidence);
  const best = scored[0];
  if (!best) return { accepted: false, reason: "no attractions returned", scored };
  if (best.confidence < minConfidence) {
    return { accepted: false, reason: "best match below confidence threshold", best, scored };
  }
  return { accepted: true, best, scored };
}

function genresFromAttraction(attraction) {
  const out = new Set();
  for (const classification of attraction?.classifications || []) {
    const genre = clean(classification?.genre?.name);
    if (genre && !/undefined/i.test(genre)) out.add(genre);
  }
  return [...out];
}

async function processArtist(name, { apiKey, base, options }) {
  const attractionsUrl =
    `${base}/attractions.json?apikey=${encodeURIComponent(apiKey)}` +
    `&keyword=${encodeURIComponent(name)}&classificationName=music&size=20`;
  const attractionsResponse = await discoveryFetch(attractionsUrl, options);
  if (!attractionsResponse.ok) {
    return { input: name, accepted: false, reason: classifyDiscoveryFailure(attractionsResponse, "attraction lookup") };
  }
  const attractions = attractionsResponse.data?._embedded?.attractions || [];
  const match = pickAttraction(name, attractions, options.minConfidence);
  if (!match.accepted) {
    return {
      input: name,
      accepted: false,
      reason: match.reason,
      best_candidate: match.best ? clean(match.best.attraction?.name) : "",
      best_confidence: match.best ? match.best.confidence : 0
    };
  }

  const attraction = match.best.attraction;
  const canonicalName = clean(attraction?.name);
  const slug = slugify(canonicalName);
  const artistPage = classifyArtistPageUrl(attraction?.url);
  await sleep(options.delayMs);

  const startDateTime = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  let eventsUrl =
    `${base}/events.json?apikey=${encodeURIComponent(apiKey)}` +
    `&attractionId=${encodeURIComponent(attraction.id)}` +
    `&size=${Math.min(options.maxEvents, 100)}&sort=date,asc&startDateTime=${encodeURIComponent(startDateTime)}`;
  if (options.country) eventsUrl += `&countryCode=${encodeURIComponent(options.country)}`;

  const eventsResponse = await discoveryFetch(eventsUrl, options);
  const warnings = [];
  if (artistPage.status !== "sourced") {
    warnings.push(
      `artist-page URL evidence is '${artistPage.status}': ${artistPage.notes[artistPage.notes.length - 1] || "no detail"}`
    );
  }
  let events = [];
  if (!eventsResponse.ok) {
    warnings.push(classifyDiscoveryFailure(eventsResponse, "event lookup"));
  } else {
    events = eventsResponse.data?._embedded?.events || [];
    const totalElements = Number(eventsResponse.data?.page?.totalElements || events.length);
    if (totalElements > events.length) {
      warnings.push(
        `Ticketmaster reports ${totalElements} upcoming events but only ${events.length} were fetched ` +
          `(single-page fetch). Re-run with a higher --max-events or add pagination if more are needed.`
      );
    }
  }

  const mapped = events.slice(0, options.maxEvents).map((event) => mapEvent(slug, canonicalName, event));

  return {
    input: name,
    accepted: true,
    slug,
    canonicalName,
    attractionId: clean(attraction.id),
    confidence: match.best.confidence,
    genres: genresFromAttraction(attraction),
    artistPage,
    mapped,
    eventWarnings: mapped.flatMap((m, idx) => m.warnings.map((w) => `${m.row.id || `event[${idx}]`}: ${w}`)),
    warnings
  };
}

function buildArtistRecord(result) {
  // artists.json shape. indexing_status is an editorial decision, so it is
  // emitted as a review marker, not a real production value. The
  // ticketmaster_artist_url / artist_page_url_* fields are Discovery-sourced
  // review evidence only - they are NOT part of the production artists.json
  // schema and must not be copied into it.
  return {
    slug: result.slug,
    name: result.canonicalName,
    indexing_status: "REVIEW_REQUIRED",
    verified_provider_count: 0,
    verified_providers: [],
    last_verified_at: null,
    ticketmaster_artist_url: result.artistPage?.url || "",
    artist_page_url_status: result.artistPage?.status || "missing",
    artist_page_url_source: result.artistPage?.source || null,
    artist_page_url_notes: result.artistPage?.notes || []
  };
}

function buildCatalogTicketLink(result) {
  // catalog.json ticket_links[] shape. All trust flags start false: a human
  // must verify the affiliate destination before any of these flip true.
  // The ticketmaster_artist_url / artist_page_url_* fields are Discovery-
  // sourced review evidence for that verification - they are NOT part of the
  // production catalog.json ticket_links schema and must not be copied in.
  return {
    link_id: `tm-artist-${result.slug}`,
    artist_slug: result.slug,
    tour_slug: null,
    provider: "ticketmaster",
    destination_type: "artist_page",
    affiliate_enabled: false,
    verified: false,
    public_enabled: false,
    market: "global",
    last_checked_at: null,
    disclosure_required: true,
    ticketmaster_artist_url: result.artistPage?.url || "",
    artist_page_url_status: result.artistPage?.status || "missing",
    artist_page_url_source: result.artistPage?.source || null,
    artist_page_url_notes: result.artistPage?.notes || []
  };
}

function buildAffiliateActions(artistGroups) {
  const lines = [
    "# Affiliate / deep-link actions",
    "",
    "Generated by `scripts/propose-artists.mjs` (proposal only). This file does",
    "not change any affiliate behaviour. It explains what already works and what",
    "still needs a human action.",
    "",
    "## Event-level CTAs (per-show buttons)",
    "",
    "For every event with a verified `ticketmaster_url`, the existing showId path",
    "in `functions/api/out.js` already generates an Impact tracking link at click",
    "time via the Impact Publisher API (`createImpactTrackingUrl` -> the",
    "`/Programs/{ProgramId}/TrackingLinks` endpoint, wrapping the ticketmaster.com",
    "event URL). If Impact is unavailable the redirect falls back to the raw",
    "verified Ticketmaster URL.",
    "",
    "=> No manual Impact dashboard work is required for event-level CTAs, as long",
    "   as `IMPACT_*` credentials and a Ticketmaster program id are configured.",
    "   The candidate `events.csv` in this batch supplies the verified",
    "   `ticketmaster_url` values needed for this path.",
    "",
    "## Artist-page-level CTA (single button on the artist page)",
    "",
    "The artist-page CTA (a `/api/out` call with no showId) is served from the",
    "hand-curated `VERIFIED_TICKET_LINKS` map in `functions/api/out.js`. Each",
    "entry needs a real Impact vanity link (e.g. `ticketmaster.evyy.net/<code>`)",
    "created in the Impact dashboard. This script does NOT edit that protected",
    "file and does NOT invent vanity links.",
    "",
    "### Per-artist status",
    ""
  ];
  if (artistGroups.length === 0) {
    lines.push("_No accepted artists in this batch._", "");
  }
  for (const { result, valid } of artistGroups) {
    const page = result.artistPage || { url: "", status: "missing", notes: [] };
    lines.push(`- **${result.canonicalName}** (\`${result.slug}\`)`);
    lines.push(
      `  - Event-level CTAs: ${valid.length} candidate event(s) with Ticketmaster URLs ` +
        "-> work automatically via the existing Impact API path once events are applied."
    );
    if (page.status === "sourced" && page.url) {
      lines.push(`  - Artist-page CTA: NOT LIVE. Discovery supplied a candidate artist-page URL: ${page.url}`);
      lines.push(
        "    (artist_page_url_status: sourced). A human must open this exact URL in a browser and " +
          "confirm it resolves to the correct artist, then hand-add the " +
          `\`VERIFIED_TICKET_LINKS["${result.slug}:ticketmaster"]\` entry in \`functions/api/out.js\` ` +
          "(protected file). A plain ticketmaster.com URL is acceptable there; no pre-minted " +
          "Impact vanity link is required (see docs/SAFE_NEXT_ARTIST_WORKFLOW.md Phase 3)."
      );
    } else {
      lines.push(
        `  - Artist-page CTA: MISSING (artist_page_url_status: ${page.status}). Needs a \`VERIFIED_TICKET_LINKS["` +
          `${result.slug}:ticketmaster"]\` entry in \`functions/api/out.js\`, added by hand after a human ` +
          "locates and browser-verifies the Ticketmaster artist page. This script never edits that protected file."
      );
    }
    lines.push("");
  }
  return `${lines.join("\n")}\n`;
}

// Counts of output (post-normalisation) country names across rows.
function summarizeCountries(rows) {
  const out = {};
  for (const row of rows) {
    const key = clean(row.country) || "(unknown)";
    out[key] = (out[key] || 0) + 1;
  }
  return out;
}

// Audit trail of every distinct source country seen, with ISO code and the
// output name, so source-data inconsistencies can be reviewed after the fact.
function buildCountryAudit(mappedRows) {
  const audit = new Map();
  for (const m of mappedRows) {
    const cs = m.countrySource || { raw: "", code: "", normalized: false };
    const key = JSON.stringify([cs.raw, cs.code, m.row.country, Boolean(cs.normalized)]);
    audit.set(key, (audit.get(key) || 0) + 1);
  }
  return [...audit.entries()]
    .map(([key, rows]) => {
      const [raw, code, output, normalized] = JSON.parse(key);
      return {
        source_country_name: raw || null,
        source_country_code: code || null,
        output_country_name: output || null,
        normalized,
        rows
      };
    })
    .sort((a, b) => b.rows - a.rows);
}

// Surfaces batch-shape problems for the reviewer: a dominant artist or
// multiple accepted artists with no events. Warnings only - drops nothing.
function buildBatchWarnings(artistGroups, totalValid) {
  const warnings = [];
  const zeroEventArtists = artistGroups
    .filter((g) => g.valid.length === 0)
    .map((g) => g.result.canonicalName);
  if (zeroEventArtists.length >= 2) {
    warnings.push(
      `${zeroEventArtists.length} accepted artists produced zero candidate events ` +
        `(${zeroEventArtists.join(", ")}). They matched a Ticketmaster attraction but ` +
        "have no upcoming events, or none under the current country filter."
    );
  }
  if (totalValid > 0 && artistGroups.length > 1) {
    const top = artistGroups
      .map((g) => ({ name: g.result.canonicalName, count: g.valid.length }))
      .sort((a, b) => b.count - a.count)[0];
    const share = top.count / totalValid;
    if (share >= ARTIST_DOMINANCE_THRESHOLD) {
      warnings.push(
        `One artist (${top.name}) accounts for ${top.count}/${totalValid} ` +
          `(${Math.round(share * 100)}%) of candidate events. Consider proposing ` +
          "artists in separate batches so one artist does not dominate review."
      );
    }
  }
  return warnings;
}

// Suggested follow-up runs so reviewers can compare market coverage.
function recommendedNextRuns(inputs, minConfidence) {
  const argList = `--artists ${JSON.stringify(inputs.join(","))} --min-confidence ${minConfidence}`;
  return [
    `Global (no country filter): npm run artists:propose -- ${argList}`,
    `US events only: npm run artists:propose -- ${argList} --country US`,
    `GB events only: npm run artists:propose -- ${argList} --country GB`
  ];
}

async function writeOutputs(outDir, payload) {
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, "events.csv"), payload.csv, "utf8");
  await fs.writeFile(
    path.join(outDir, "events.rejected.json"),
    `${JSON.stringify(payload.rejectedEvents, null, 2)}\n`,
    "utf8"
  );
  await fs.writeFile(
    path.join(outDir, "artists.proposed.json"),
    `${JSON.stringify(payload.artists, null, 2)}\n`,
    "utf8"
  );
  await fs.writeFile(
    path.join(outDir, "catalog-ticket-links.proposed.json"),
    `${JSON.stringify(payload.catalogTicketLinks, null, 2)}\n`,
    "utf8"
  );
  await fs.writeFile(path.join(outDir, "affiliate-actions.md"), payload.affiliateActions, "utf8");
  await fs.writeFile(path.join(outDir, "report.json"), `${JSON.stringify(payload.report, null, 2)}\n`, "utf8");
}

function runSelfTest() {
  const checks = [];
  const assert = (label, condition) => checks.push({ label, pass: Boolean(condition) });

  assert("exact name match scores 1", nameSimilarity("Taylor Swift", "Taylor Swift") === 1);
  assert("accented match is high", nameSimilarity("Beyonce", "Beyoncé") > 0.9);
  assert("unrelated names score low", nameSimilarity("Adele", "Metallica") < 0.5);
  assert("slugify is url-safe", slugify("Beyoncé & Friends!") === "beyonce-friends");
  assert("slug regex accepts slugify output", SLUG_RE.test(slugify("Olivia Rodrigo")));
  assert("placeholder url detected", isPlaceholderUrl("https://example.com/x"));
  assert("real url not flagged", !isPlaceholderUrl("https://www.ticketmaster.com/event/123"));
  assert(
    "evyy affiliate url unwraps to ticketmaster destination",
    resolveTicketmasterUrl(
      "https://ticketmaster.evyy.net/c/1/2/3?u=https%3A%2F%2Fwww.ticketmaster.com%2Fevent%2FZ1&utm_medium=affiliate"
    ).url === "https://www.ticketmaster.com/event/Z1"
  );
  assert(
    "plain ticketmaster url passes through unchanged",
    resolveTicketmasterUrl("https://www.ticketmaster.com/event/Z1").url === "https://www.ticketmaster.com/event/Z1"
  );
  assert(
    "affiliate-wrapped reseller url reports the reseller host",
    resolveTicketmasterUrl("https://ticketmaster.evyy.net/c/1/2/3?u=https%3A%2F%2Fwww.axs.com%2Fevents%2F1").host ===
      "www.axs.com"
  );
  assert("ticketmaster.co.uk is a ticketmaster host", isTicketmasterHost("www.ticketmaster.co.uk"));
  assert("axs is not a ticketmaster host", !isTicketmasterHost("www.axs.com"));
  assert("lookalike ticketmaster host is rejected", !isTicketmasterHost("notticketmaster.com"));
  assert(
    "ticketmaster event id is taken from the storefront url path",
    ticketmasterEventIdFromUrl("https://www.ticketmaster.com/bruno-mars-columbus-ohio/event/05006394EB3DD035") ===
      "05006394EB3DD035"
  );
  assert(
    "ticketmaster event id is taken from a localized url path",
    ticketmasterEventIdFromUrl("https://www.ticketmaster.nl/event/bruno-mars-tickets/1307970954?language=en-us") ===
      "1307970954"
  );
  assert("ticketmaster event id is empty for an unparseable url", ticketmasterEventIdFromUrl("not-a-url") === "");
  assert(
    "discovery artist-page url is sourced",
    classifyArtistPageUrl("https://www.ticketmaster.com/shakira-tickets/artist/779049").status === "sourced"
  );
  assert(
    "sourced artist-page url is preserved verbatim",
    classifyArtistPageUrl("https://www.ticketmaster.com/shakira-tickets/artist/779049").url ===
      "https://www.ticketmaster.com/shakira-tickets/artist/779049"
  );
  assert(
    "bare /artist/<id> path is sourced",
    classifyArtistPageUrl("https://www.ticketmaster.com/artist/2836194").status === "sourced"
  );
  assert(
    "localized storefront artist page is sourced",
    classifyArtistPageUrl("https://www.ticketmaster.co.uk/raye-tickets/artist/2065089").status === "sourced"
  );
  assert(
    "affiliate-wrapped artist url unwraps to sourced",
    classifyArtistPageUrl(
      "https://ticketmaster.evyy.net/c/1/2/3?u=https%3A%2F%2Fwww.ticketmaster.com%2Fshakira-tickets%2Fartist%2F779049"
    ).status === "sourced"
  );
  assert(
    "api self link host is rejected as not storefront",
    classifyArtistPageUrl("https://app.ticketmaster.com/discovery/v2/attractions/K8vZ9171xeV").status === "invalid"
  );
  assert(
    "relative api self link is rejected",
    classifyArtistPageUrl("/discovery/v2/attractions/K8vZ9171xeV?locale=en-us").status === "invalid"
  );
  assert(
    "event url is rejected as artist page",
    classifyArtistPageUrl("https://www.ticketmaster.com/shakira-miami/event/0C006394AF52121").status === "invalid"
  );
  assert(
    "search url is rejected as artist page",
    classifyArtistPageUrl("https://www.ticketmaster.com/search?q=shakira").status === "invalid"
  );
  assert(
    "ticketmaster homepage is rejected as artist page",
    classifyArtistPageUrl("https://www.ticketmaster.com/").status === "invalid"
  );
  assert(
    "non-ticketmaster url is rejected as artist page",
    classifyArtistPageUrl("https://www.axs.com/artists/123/some-artist").status === "invalid"
  );
  assert(
    "non-https artist url is rejected",
    classifyArtistPageUrl("http://www.ticketmaster.com/artist/1").status === "invalid"
  );
  assert("missing artist url yields missing status", classifyArtistPageUrl("").status === "missing");
  assert("missing artist url has no source", classifyArtistPageUrl("").source === null);
  assert(
    "odd storefront path needs review, not sourced",
    classifyArtistPageUrl("https://www.ticketmaster.com/shakira").status === "needs_review"
  );
  assert("csv escapes commas", csvCell("a,b") === '"a,b"');
  assert("onsale maps to on-sale", discoveryStatusToStatus("onsale") === "on-sale");
  assert("offsale maps to announced", discoveryStatusToStatus("offsale") === "announced");
  assert(
    "row self-check flags bad slug",
    rowIssues({ id: "x", artist_slug: "Bad Slug", artist_name: "a", city: "a", country: "a", venue: "a", datetime_iso: "2026-01-01T00:00:00Z" }).length > 0
  );
  assert(
    "clean row passes self-check",
    rowIssues(
      { id: "x", artist_slug: "good-slug", artist_name: "a", city: "a", country: "a", venue: "a", datetime_iso: "2026-01-01T00:00:00Z", status: "announced" }
    ).length === 0
  );
  assert(
    "missing venue row is flagged for rejection",
    rowIssues({ id: "x", artist_slug: "good-slug", artist_name: "a", city: "a", country: "a", venue: "", datetime_iso: "2026-01-01T00:00:00Z" })
      .some((reason) => reason.includes("venue"))
  );
  assert("great britain normalizes to united kingdom", normalizeCountry("Great Britain").country === "United Kingdom");
  assert("country normalization is flagged", normalizeCountry("Great Britain").normalized === true);
  assert("known country name is preserved", normalizeCountry("United States Of America").country === "United States Of America");
  assert("unchanged country is not flagged normalized", normalizeCountry("Sweden").normalized === false);
  assert("empty country yields empty result", normalizeCountry("").country === "");
  const originalApiKey = process.env.TICKETMASTER_API_KEY;
  delete process.env.TICKETMASTER_API_KEY;
  assert(
    "classification reports missing key",
    classifyDiscoveryFailure({ ok: false, status: 0, error: "fetch failed" }, "attraction lookup") ===
      "attraction lookup failed: missing API key"
  );
  process.env.TICKETMASTER_API_KEY = "test-key";
  assert(
    "classification reports generic network failure",
    classifyDiscoveryFailure({ ok: false, status: 0, error: "getaddrinfo ENOTFOUND app.ticketmaster.com" }, "event lookup")
      .startsWith("event lookup failed: network/DNS/TLS/fetch failure")
  );
  assert(
    "classification reports auth issue",
    classifyDiscoveryFailure({ ok: false, status: 401, error: "HTTP 401" }, "attraction lookup") ===
      "attraction lookup failed: HTTP 401 auth issue"
  );
  assert(
    "classification reports rate limit issue",
    classifyDiscoveryFailure({ ok: false, status: 429, error: "HTTP 429" }, "event lookup") ===
      "event lookup failed: HTTP 429 rate limit"
  );
  assert(
    "classification reports other http issue",
    classifyDiscoveryFailure({ ok: false, status: 500, error: "HTTP 500" }, "event lookup") ===
      "event lookup failed: HTTP 500 error"
  );
  if (originalApiKey === undefined) delete process.env.TICKETMASTER_API_KEY;
  else process.env.TICKETMASTER_API_KEY = originalApiKey;

  let failed = 0;
  for (const check of checks) {
    if (!check.pass) failed += 1;
    console.log(`${check.pass ? "PASS" : "FAIL"}  ${check.label}`);
  }
  console.log(`\n${checks.length - failed}/${checks.length} checks passed.`);
  return failed === 0 ? 0 : 1;
}

async function runTicketmasterDiagnostics(options) {
  const base = clean(process.env.TICKETMASTER_DISCOVERY_BASE_URL || DEFAULT_DISCOVERY_BASE).replace(/\/+$/, "");
  const apiKey = await resolveApiKey();
  const keyPresent = Boolean(apiKey);
  console.log(`API key present: ${keyPresent ? "yes" : "no"}`);

  const reachability = await discoveryFetch(`${base}/`, options);
  if (reachability.ok) {
    console.log("Discovery base reachability: OK (HTTP 200)");
  } else if (reachability.status) {
    console.log(`Discovery base reachability: HTTP ${reachability.status}`);
  } else {
    console.log(`Discovery base reachability: network/DNS/TLS/fetch failure (${clean(reachability.error) || "fetch error"})`);
  }

  if (!apiKey) {
    console.log("Attractions endpoint check: skipped (missing API key)");
    return 2;
  }
  const attractionsUrl =
    `${base}/attractions.json?apikey=${encodeURIComponent(apiKey)}&classificationName=music&size=1`;
  const attractionsCheck = await discoveryFetch(attractionsUrl, options);
  if (attractionsCheck.ok) {
    console.log("Attractions endpoint status: OK (HTTP 200)");
    return 0;
  }
  if (attractionsCheck.status) {
    console.log(`Attractions endpoint status: HTTP ${attractionsCheck.status}`);
  } else {
    console.log(
      `Attractions endpoint status: network/DNS/TLS/fetch failure (${clean(attractionsCheck.error) || "fetch error"})`
    );
  }
  return 1;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return 0;
  }
  if (options.selfTest) {
    return runSelfTest();
  }
  if (options.diagnoseTicketmaster) {
    return runTicketmasterDiagnostics(options);
  }

  const names = [...options.artists];
  if (options.inputPath) {
    const text = await fs.readFile(path.resolve(REPO_ROOT, options.inputPath), "utf8");
    for (const line of text.split(/\r?\n/)) {
      const name = line.replace(/#.*$/, "").trim();
      if (name) names.push(name);
    }
  }
  const uniqueNames = [...new Set(names.map((n) => n.trim()).filter(Boolean))];
  if (uniqueNames.length === 0) {
    console.error("ERROR: no artist names provided. Use --artists or --input. See --help.");
    return 2;
  }

  const apiKey = await resolveApiKey();
  if (!apiKey) {
    console.error("ERROR: TICKETMASTER_API_KEY is not set (checked env, .dev.vars, .env).");
    return 2;
  }

  const base = clean(process.env.TICKETMASTER_DISCOVERY_BASE_URL || DEFAULT_DISCOVERY_BASE).replace(/\/+$/, "");
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").replace(/-\d{3}Z$/, "Z");
  const outDir = options.outDir
    ? path.resolve(REPO_ROOT, options.outDir)
    : path.join(CANDIDATES_ROOT, `artists-${stamp}`);

  console.error(`Proposing ${uniqueNames.length} artist(s) via Ticketmaster Discovery (dry-run only).`);

  const accepted = [];
  const rejected = [];
  for (const name of uniqueNames) {
    console.error(`- ${name}`);
    await sleep(options.delayMs);
    const result = await processArtist(name, { apiKey, base, options });
    if (result.accepted) {
      accepted.push(result);
      console.error(`  matched "${result.canonicalName}" (confidence ${result.confidence}, ${result.mapped.length} events)`);
    } else {
      rejected.push(result);
      console.error(`  rejected: ${result.reason}`);
    }
  }

  // Partition each accepted artist's rows: apply-ready rows go to events.csv,
  // rows with a structural problem go to events.rejected.json with reasons.
  const artistGroups = accepted.map((result) => {
    const valid = [];
    const validMapped = [];
    const rejectedRows = [];
    for (const m of result.mapped) {
      const issues = [...rowIssues(m.row), ...(m.urlRejection ? [m.urlRejection] : [])];
      if (issues.length > 0) {
        rejectedRows.push({ ...m.row, rejection_reasons: issues });
      } else {
        valid.push(m.row);
        validMapped.push(m);
      }
    }
    return { result, valid, validMapped, rejectedRows };
  });

  const allRows = artistGroups.flatMap((g) => g.valid);
  const allValidMapped = artistGroups.flatMap((g) => g.validMapped);
  const rejectedEvents = artistGroups.flatMap((g) => g.rejectedRows);

  // Duplicate id detection across the apply-ready rows.
  const structuralIssues = [];
  const seenIds = new Map();
  for (const row of allRows) {
    seenIds.set(row.id, (seenIds.get(row.id) || 0) + 1);
  }
  for (const [id, count] of seenIds) {
    if (count > 1) structuralIssues.push(`duplicate candidate id '${id}' appears ${count} times`);
  }

  const batchWarnings = buildBatchWarnings(artistGroups, allRows.length);

  const validationNotes = [
    structuralIssues.length === 0
      ? "Structural self-check passed for all rows written to events.csv (required fields, slug, ISO date, status, timezone, placeholder URLs, unique ids)."
      : `Structural self-check found ${structuralIssues.length} issue(s) in events.csv - see structural_issues below.`,
    rejectedEvents.length === 0
      ? "No rows were rejected; every fetched event was apply-ready."
      : `${rejectedEvents.length} event row(s) were withheld from events.csv and written to events.rejected.json with reasons.`,
    "This script does not run the Python validator directly because that requires merging into events.json (an apply step).",
    "After an approved apply step, run: python3 scripts/validate-events.py --for-production",
    "Other repo checks to run after apply: node --check public/app.js | node --check 'functions/[[path]].js' | node --check functions/api/out.js | node --check functions/api/shows.js | node scripts/smoke-prelaunch.mjs | git diff --check"
  ];

  const reviewInstructions = [
    "1. Review events.csv: confirm every row is a real, upcoming, correctly-attributed event. Delete any row you do not want.",
    "2. Review events.rejected.json: rows withheld for missing required fields (e.g. venue). Fix the source data and re-run, or discard.",
    "3. Review artists.proposed.json: set indexing_status to a real value only when the artist page will have substantial content. Marketing copy for catalog.json (factual_summary, FAQ, etc.) must be written by a human - this script intentionally does not generate it.",
    "4. Review catalog-ticket-links.proposed.json: all trust flags are false by design. Do not flip verified/public_enabled until the affiliate destination is confirmed.",
    "5. Read affiliate-actions.md: event-level CTAs work automatically via the existing Impact API path; artist-page entries in functions/api/out.js must be added by hand after browser verification.",
    "6. ticketmaster_artist_url / artist_page_url_* fields are Discovery-sourced evidence for review only. Do not copy them into production files. Browser verification of the exact URL remains mandatory before any VERIFIED_TICKET_LINKS entry.",
    "7. Nothing here is applied to production. Applying an approved batch is a separate step (events only; see scripts/apply-artists.mjs)."
  ];

  const report = {
    generated_at: new Date().toISOString(),
    mode: "dry-run",
    discovery_base: base,
    country_filter: options.country || null,
    min_confidence: options.minConfidence,
    max_events_per_artist: options.maxEvents,
    inputs: uniqueNames,
    totals: {
      inputs: uniqueNames.length,
      accepted: accepted.length,
      rejected: rejected.length,
      candidate_events: allRows.length,
      rejected_events: rejectedEvents.length
    },
    accepted: accepted.map((result, idx) => ({
      input: result.input,
      matched_attraction: result.canonicalName,
      attraction_id: result.attractionId,
      proposed_slug: result.slug,
      confidence: result.confidence,
      genres: result.genres,
      ticketmaster_artist_url: result.artistPage?.url || "",
      artist_page_url_status: result.artistPage?.status || "missing",
      artist_page_url_source: result.artistPage?.source || null,
      artist_page_url_notes: result.artistPage?.notes || [],
      event_count: artistGroups[idx].valid.length,
      rejected_event_count: artistGroups[idx].rejectedRows.length,
      warnings: [...result.warnings, ...result.eventWarnings]
    })),
    rejected: rejected.map((result) => ({
      input: result.input,
      reason: result.reason,
      best_candidate: result.best_candidate || null,
      best_confidence: result.best_confidence ?? null
    })),
    artist_event_summary: artistGroups.map((g) => ({
      slug: g.result.slug,
      name: g.result.canonicalName,
      accepted_events: g.valid.length,
      rejected_events: g.rejectedRows.length
    })),
    country_summary: summarizeCountries(allRows),
    country_source_audit: buildCountryAudit(allValidMapped),
    batch_warnings: batchWarnings,
    recommended_next_runs: recommendedNextRuns(uniqueNames, options.minConfidence),
    structural_issues: structuralIssues,
    validation_notes: validationNotes,
    review_instructions: reviewInstructions,
    notes: [
      "Ticketmaster Discovery is the only event source used. No provider scraping occurs.",
      "tour_name is left empty for every event because Discovery does not return a reliable tour name.",
      "country names are normalised to a canonical label (see country_source_audit); ISO codes are preserved there for auditing.",
      "ticketmaster_artist_url is preserved only when the Discovery attraction response itself supplies a public storefront artist page (attraction.url). Nothing is constructed or guessed; a human must open the URL in a browser before it is used anywhere.",
      "SeatGeek enrichment is intentionally out of scope here; scripts/propose-seatgeek-urls.mjs covers that separately.",
      "Credentials are read server-side only and are never written to any output file."
    ]
  };

  await writeOutputs(outDir, {
    csv: toCsv(allRows),
    rejectedEvents,
    artists: accepted.map(buildArtistRecord),
    catalogTicketLinks: accepted.map(buildCatalogTicketLink),
    affiliateActions: buildAffiliateActions(artistGroups),
    report
  });

  console.error("");
  console.error(`Wrote candidate files to: ${path.relative(REPO_ROOT, outDir)}/`);
  console.error(`  events.csv                        (${allRows.length} candidate events)`);
  console.error(`  events.rejected.json              (${rejectedEvents.length} withheld rows)`);
  console.error(`  artists.proposed.json             (${accepted.length} proposed artist records)`);
  console.error(`  catalog-ticket-links.proposed.json(${accepted.length} proposed ticket_link drafts)`);
  console.error("  affiliate-actions.md");
  console.error("  report.json");
  if (rejected.length > 0) console.error(`Rejected ${rejected.length} input(s) below confidence ${options.minConfidence}.`);
  if (rejectedEvents.length > 0) console.error(`Withheld ${rejectedEvents.length} event row(s) - see events.rejected.json.`);
  if (structuralIssues.length > 0) console.error(`WARNING: ${structuralIssues.length} structural issue(s) - see report.json.`);
  for (const warning of batchWarnings) console.error(`WARNING: ${warning}`);
  console.error("Dry-run only: no production files were changed.");
  return 0;
}

main()
  .then((code) => process.exit(code))
  .catch((error) => {
    console.error(`ERROR: ${error.message || error}`);
    process.exit(1);
  });
