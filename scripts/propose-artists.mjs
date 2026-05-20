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
  const country = clean(venue?.country?.name);
  const tmEventId = clean(tmEvent?.id, 255);
  const citySlug = slugify(city) || "tba";
  const warnings = [];
  if (!clean(start.dateTime)) warnings.push("event has a date but no exact time (datetime_iso is date-only)");
  if (!city) warnings.push("event missing city");
  if (!venue?.name) warnings.push("event missing venue name");
  if (!country) warnings.push("event missing country");
  const url = clean(tmEvent?.url, 2048);
  if (url && isPlaceholderUrl(url)) warnings.push("event url looks like a placeholder");

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
      ticketmaster_event_id: tmEventId,
      ticketmaster_url: url && !isPlaceholderUrl(url) ? url : "",
      seatgeek_event_id: "",
      seatgeek_url: "",
      vividseats_event_id: "",
      vividseats_url: ""
    },
    warnings
  };
}

function selfCheckRow(row, index) {
  const issues = [];
  const prefix = `row[${index}] (${row.id || "no-id"})`;
  for (const field of ["id", "artist_slug", "artist_name", "city", "country", "venue", "datetime_iso"]) {
    if (!clean(row[field])) issues.push(`${prefix}: missing required field '${field}'`);
  }
  if (row.artist_slug && !SLUG_RE.test(row.artist_slug)) {
    issues.push(`${prefix}: artist_slug '${row.artist_slug}' is not lowercase-hyphenated`);
  }
  if (row.datetime_iso && Number.isNaN(Date.parse(row.datetime_iso))) {
    issues.push(`${prefix}: datetime_iso '${row.datetime_iso}' is not parseable`);
  }
  if (row.status && !ALLOWED_STATUSES.has(row.status)) {
    issues.push(`${prefix}: status '${row.status}' not in allowed set`);
  }
  if (row.timezone && !row.timezone.includes("/")) {
    issues.push(`${prefix}: timezone '${row.timezone}' is not IANA-like`);
  }
  if (row.ticketmaster_url && isPlaceholderUrl(row.ticketmaster_url)) {
    issues.push(`${prefix}: ticketmaster_url is a placeholder`);
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
    return { input: name, accepted: false, reason: `attraction lookup failed: ${attractionsResponse.error}` };
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
  await sleep(options.delayMs);

  const startDateTime = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  let eventsUrl =
    `${base}/events.json?apikey=${encodeURIComponent(apiKey)}` +
    `&attractionId=${encodeURIComponent(attraction.id)}` +
    `&size=${Math.min(options.maxEvents, 100)}&sort=date,asc&startDateTime=${encodeURIComponent(startDateTime)}`;
  if (options.country) eventsUrl += `&countryCode=${encodeURIComponent(options.country)}`;

  const eventsResponse = await discoveryFetch(eventsUrl, options);
  const warnings = [];
  let events = [];
  if (!eventsResponse.ok) {
    warnings.push(`event lookup failed: ${eventsResponse.error}`);
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
    rows: mapped.map((m) => m.row),
    eventWarnings: mapped.flatMap((m, idx) => m.warnings.map((w) => `${m.row.id || `event[${idx}]`}: ${w}`)),
    warnings
  };
}

function buildArtistRecord(result) {
  // artists.json shape. indexing_status is an editorial decision, so it is
  // emitted as a review marker, not a real production value.
  return {
    slug: result.slug,
    name: result.canonicalName,
    indexing_status: "REVIEW_REQUIRED",
    verified_provider_count: 0,
    verified_providers: [],
    last_verified_at: null
  };
}

function buildCatalogTicketLink(result) {
  // catalog.json ticket_links[] shape. All trust flags start false: a human
  // must verify the affiliate destination before any of these flip true.
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
    disclosure_required: true
  };
}

function buildAffiliateActions(accepted) {
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
  if (accepted.length === 0) {
    lines.push("_No accepted artists in this batch._", "");
  }
  for (const result of accepted) {
    lines.push(`- **${result.canonicalName}** (\`${result.slug}\`)`);
    lines.push(
      `  - Event-level CTAs: ${result.rows.length} candidate event(s) with Ticketmaster URLs ` +
        "-> work automatically via the existing Impact API path once events are applied."
    );
    lines.push(
      "  - Artist-page CTA: MISSING. Needs a `VERIFIED_TICKET_LINKS[\"" +
        `${result.slug}:ticketmaster"]\` entry in \`functions/api/out.js\` ` +
        "pointing to an Impact vanity link. Create the link in the Impact dashboard, " +
        "then add the entry by hand (a future `--apply-affiliate` step may print this diff)."
    );
    lines.push("");
  }
  return `${lines.join("\n")}\n`;
}

async function writeOutputs(outDir, payload) {
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, "events.csv"), payload.csv, "utf8");
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
  assert("csv escapes commas", csvCell("a,b") === '"a,b"');
  assert("onsale maps to on-sale", discoveryStatusToStatus("onsale") === "on-sale");
  assert("offsale maps to announced", discoveryStatusToStatus("offsale") === "announced");
  assert(
    "row self-check flags bad slug",
    selfCheckRow({ id: "x", artist_slug: "Bad Slug", artist_name: "a", city: "a", country: "a", venue: "a", datetime_iso: "2026-01-01T00:00:00Z" }, 0).length > 0
  );
  assert(
    "clean row passes self-check",
    selfCheckRow(
      { id: "x", artist_slug: "good-slug", artist_name: "a", city: "a", country: "a", venue: "a", datetime_iso: "2026-01-01T00:00:00Z", status: "announced" },
      0
    ).length === 0
  );

  let failed = 0;
  for (const check of checks) {
    if (!check.pass) failed += 1;
    console.log(`${check.pass ? "PASS" : "FAIL"}  ${check.label}`);
  }
  console.log(`\n${checks.length - failed}/${checks.length} checks passed.`);
  return failed === 0 ? 0 : 1;
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
      console.error(`  matched "${result.canonicalName}" (confidence ${result.confidence}, ${result.rows.length} events)`);
    } else {
      rejected.push(result);
      console.error(`  rejected: ${result.reason}`);
    }
  }

  const allRows = accepted.flatMap((result) => result.rows);
  const selfCheckIssues = allRows.flatMap((row, idx) => selfCheckRow(row, idx));

  // Duplicate id detection across the candidate batch.
  const seenIds = new Map();
  for (const row of allRows) {
    seenIds.set(row.id, (seenIds.get(row.id) || 0) + 1);
  }
  for (const [id, count] of seenIds) {
    if (count > 1) selfCheckIssues.push(`duplicate candidate id '${id}' appears ${count} times`);
  }

  const validationNotes = [
    selfCheckIssues.length === 0
      ? "Structural self-check passed for all candidate event rows (required fields, slug, ISO date, status, timezone, placeholder URLs, unique ids)."
      : `Structural self-check found ${selfCheckIssues.length} issue(s) - see structural_issues below.`,
    "This script does not run the Python validator directly because that requires merging into events.json (an apply step).",
    "After an approved apply step, run: python3 scripts/validate-events.py --for-production",
    "Other repo checks to run after apply: node --check public/app.js | node --check 'functions/[[path]].js' | node --check functions/api/out.js | node --check functions/api/shows.js | node scripts/smoke-prelaunch.mjs | git diff --check"
  ];

  const reviewInstructions = [
    "1. Review events.csv: confirm every row is a real, upcoming, correctly-attributed event. Delete any row you do not want.",
    "2. Review artists.proposed.json: set indexing_status to a real value only when the artist page will have substantial content. Marketing copy for catalog.json (factual_summary, FAQ, etc.) must be written by a human - this script intentionally does not generate it.",
    "3. Review catalog-ticket-links.proposed.json: all trust flags are false by design. Do not flip verified/public_enabled until the affiliate destination is confirmed.",
    "4. Read affiliate-actions.md: event-level CTAs work automatically via the existing Impact API path; artist-page vanity links must be created in the Impact dashboard and added to functions/api/out.js by hand.",
    "5. Nothing here is applied to production. Applying an approved batch is a separate, not-yet-implemented step."
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
      candidate_events: allRows.length
    },
    accepted: accepted.map((result) => ({
      input: result.input,
      matched_attraction: result.canonicalName,
      attraction_id: result.attractionId,
      proposed_slug: result.slug,
      confidence: result.confidence,
      genres: result.genres,
      event_count: result.rows.length,
      warnings: [...result.warnings, ...result.eventWarnings]
    })),
    rejected: rejected.map((result) => ({
      input: result.input,
      reason: result.reason,
      best_candidate: result.best_candidate || null,
      best_confidence: result.best_confidence ?? null
    })),
    structural_issues: selfCheckIssues,
    validation_notes: validationNotes,
    review_instructions: reviewInstructions,
    notes: [
      "Ticketmaster Discovery is the only event source used. No provider scraping occurs.",
      "tour_name is left empty for every event because Discovery does not return a reliable tour name.",
      "SeatGeek enrichment is intentionally out of scope here; scripts/propose-seatgeek-urls.mjs covers that separately.",
      "Credentials are read server-side only and are never written to any output file."
    ]
  };

  await writeOutputs(outDir, {
    csv: toCsv(allRows),
    artists: accepted.map(buildArtistRecord),
    catalogTicketLinks: accepted.map(buildCatalogTicketLink),
    affiliateActions: buildAffiliateActions(accepted),
    report
  });

  console.error("");
  console.error(`Wrote candidate files to: ${path.relative(REPO_ROOT, outDir)}/`);
  console.error(`  events.csv                        (${allRows.length} candidate events)`);
  console.error(`  artists.proposed.json             (${accepted.length} proposed artist records)`);
  console.error(`  catalog-ticket-links.proposed.json(${accepted.length} proposed ticket_link drafts)`);
  console.error("  affiliate-actions.md");
  console.error("  report.json");
  if (rejected.length > 0) console.error(`Rejected ${rejected.length} input(s) below confidence ${options.minConfidence}.`);
  if (selfCheckIssues.length > 0) console.error(`WARNING: ${selfCheckIssues.length} structural issue(s) - see report.json.`);
  console.error("Dry-run only: no production files were changed.");
  return 0;
}

main()
  .then((code) => process.exit(code))
  .catch((error) => {
    console.error(`ERROR: ${error.message || error}`);
    process.exit(1);
  });
