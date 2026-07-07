#!/usr/bin/env node
// Apply planner for reviewed Ticketmaster candidate batches.
//
// Reads one candidate folder (produced by scripts/propose-artists.mjs) and the
// current public/data/events.json. By default it is PREVIEW-ONLY and writes
// nothing. With --write it performs the smallest safe apply: events only.
//
// It merges new candidate events into public/data/events.json (the
// authoritative source of truth), never via data/events.csv. It never adds
// artists or catalog links, never touches affiliate files, and never invents
// event names, tour names, prices, availability, or marketing copy.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const EVENTS_JSON_PATH = path.join(REPO_ROOT, "public", "data", "events.json");
const EVENTS_INDEX_PATH = path.join(REPO_ROOT, "public", "data", "events-index.json");
const EVENTS_PARTITION_DIR = path.join(REPO_ROOT, "public", "data", "events");
const INDEX_HTML_PATH = path.join(REPO_ROOT, "public", "index.html");
const EVENTS_CSV_PATH = path.join(REPO_ROOT, "data", "events.csv");

const REQUIRED_FIELDS = ["id", "artist_slug", "artist_name", "city", "country", "venue", "datetime_iso"];
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ALLOWED_STATUSES = new Set(["draft", "announced", "on-sale", "past"]);

// Columns the existing events.json schema carries that the flat events.csv
// schema cannot represent. Used to describe source-of-truth drift.
const RICH_ONLY_FIELDS = ["event_name", "source_type", "source_url", "last_verified_at", "provider_links"];

function usage() {
  return `Usage: node scripts/apply-artists.mjs --candidate <dir> [options]

Apply planner for a reviewed candidate batch. Preview-only by default.

Options:
  --candidate <dir>   Candidate batch folder (required), e.g.
                      candidates/artists-2026-05-20T10-42-22Z/
  --write             Perform the apply: merge new events into
                      public/data/events.json and run the events pipeline.
                      Without this flag nothing is written.
  --allow-rejected    Proceed when events.rejected.json is non-empty.
                      Rejected rows are never applied regardless.
  --self-test         Run built-in checks without touching any file.
  -h, --help          Show this help

This step is EVENTS ONLY. It never adds artists or catalog links, never
edits public/data/artists.json, public/data/catalog.json,
functions/api/out.js, or functions/api/shows.js, and never publishes pages.
`;
}

function clean(value, max = 4096) {
  return String(value ?? "").trim().slice(0, max);
}

function parseArgs(argv) {
  const options = { candidate: "", write: false, allowRejected: false, selfTest: false, help: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    switch (arg) {
      case "--candidate":
        options.candidate = clean(argv[(i += 1)]);
        break;
      case "--write":
        options.write = true;
        break;
      case "--allow-rejected":
        options.allowRejected = true;
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
  return options;
}

// Minimal RFC4180-style CSV parser: handles quoted fields, escaped quotes,
// and commas/newlines inside quotes. Returns an array of string arrays.
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field);
      field = "";
      rows.push(row);
      row = [];
    } else if (ch !== "\r") {
      field += ch;
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

// Parses a CSV file into header-keyed row objects.
function csvToObjects(text) {
  const rows = parseCsv(text);
  if (rows.length === 0) return { header: [], records: [] };
  const header = rows[0].map((h) => h.trim());
  const records = rows.slice(1).map((cells) => {
    const obj = {};
    header.forEach((key, idx) => {
      obj[key] = cells[idx] ?? "";
    });
    return obj;
  });
  return { header, records };
}

// Plain-text reasons a candidate row is not apply-ready. Empty array = valid.
function rowIssues(row) {
  const issues = [];
  for (const field of REQUIRED_FIELDS) {
    if (!clean(row[field])) issues.push(`missing required field '${field}'`);
  }
  const slug = clean(row.artist_slug);
  if (slug && !SLUG_RE.test(slug)) issues.push(`artist_slug '${slug}' is not lowercase-hyphenated`);
  const dt = clean(row.datetime_iso);
  if (dt && Number.isNaN(Date.parse(dt))) issues.push(`datetime_iso '${dt}' is not parseable`);
  const status = clean(row.status);
  if (status && !ALLOWED_STATUSES.has(status)) issues.push(`status '${status}' not in allowed set`);
  return issues;
}

function normalizeKeyPart(value, { stripPunctuation = false } = {}) {
  let out = clean(value).toLowerCase();
  if (!out) return "";
  if (stripPunctuation) out = out.replace(/[.,'’"()\-_/]/g, " ");
  return out.replace(/\s+/g, " ").trim();
}

function localDateFromIso(datetimeIso) {
  const dt = clean(datetimeIso);
  if (!dt) return "";
  const m = dt.match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : "";
}

function semanticDuplicateKey(row) {
  return [
    normalizeKeyPart(row.artist_slug),
    normalizeKeyPart(row.venue, { stripPunctuation: true }),
    normalizeKeyPart(row.city, { stripPunctuation: true }),
    normalizeKeyPart(row.country, { stripPunctuation: true }),
    localDateFromIso(row.datetime_iso)
  ].join("||");
}

function unverifiedProviderStub() {
  return {
    event_id: null,
    url: null,
    verified: false,
    last_verified_at: null,
    availability_status: "not_checked"
  };
}

// Builds the full-schema event object inserted into public/data/events.json.
// Trust markers start unverified by design: nothing here is human-checked yet,
// so verified is false and dates are null. event_name is left empty because
// the candidate CSV carries no event name and inventing one is forbidden.
// Mirrors functions/api/out.js PROVIDERS.ticketmaster.allowedDestinationHosts.
// Read-only policy copy: never extend this list here — out.js is the gate.
const TICKETMASTER_PUBLISHABLE_HOSTS = [
  "ticketmaster.com",
  "ticketmaster.ca",
  "ticketmaster.co.uk",
  "ticketmaster.es",
  "ticketmaster.de",
  "ticketmaster.nl",
  "ticketmaster.se",
  "ticketmaster.pl",
  "ticketmaster.be",
  "ticketmaster.it"
];

function ticketmasterHostAllowed(hostname) {
  const host = String(hostname || "").toLowerCase();
  return TICKETMASTER_PUBLISHABLE_HOSTS.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
}

// Classifies a candidate row's Ticketmaster link publishability. A row may be
// labelled machine_high_confidence only when the Discovery artist match
// confidence is exactly 1.0 AND the URL is a canonical storefront link:
// https, allowlisted Ticketmaster host, a slug segment before /event/<id>
// (short-form /event/<id> URLs are excluded — they have 404'd in browsers
// while still resolving via the Discovery API), the storefront event id
// appears in the URL, and the row has a full datetime plus venue and city.
// Everything else is needs_recheck: the URL is preserved but CTAs and
// /api/out redirects stay suppressed until a human verifies it. This never
// produces human_verified — machine approval and human verification are
// distinct states.
function classifyCandidateLink(row, confidenceBySlug) {
  const confidence = confidenceBySlug instanceof Map ? confidenceBySlug.get(clean(row.artist_slug)) : undefined;
  if (confidence !== 1) return "needs_recheck";
  const url = clean(row.ticketmaster_url);
  if (!url) return "needs_recheck";
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return "needs_recheck";
  }
  if (parsed.protocol !== "https:") return "needs_recheck";
  if (!ticketmasterHostAllowed(parsed.hostname)) return "needs_recheck";
  const segments = parsed.pathname.split("/").filter(Boolean);
  const eventIndex = segments.indexOf("event");
  if (eventIndex === -1 || !segments[eventIndex + 1]) return "needs_recheck";
  if (eventIndex === 0) return "needs_recheck";
  const tmEventId = clean(row.ticketmaster_event_id).toLowerCase();
  if (!tmEventId || !url.toLowerCase().includes(tmEventId)) return "needs_recheck";
  if (!/T\d{2}:\d{2}/.test(clean(row.datetime_iso))) return "needs_recheck";
  if (!clean(row.venue) || !clean(row.city)) return "needs_recheck";
  return "machine_high_confidence";
}

function buildEvent(row, verificationStatus = "needs_recheck") {
  const tmUrl = clean(row.ticketmaster_url);
  const tmEventId = clean(row.ticketmaster_event_id);
  const tmDiscoveryEventId = clean(row.ticketmaster_discovery_event_id);
  const timezone = clean(row.timezone);
  const status = clean(row.status);
  const event = {
    id: clean(row.id),
    artist_slug: clean(row.artist_slug),
    artist_name: clean(row.artist_name),
    // Verbatim official listing title from the candidate row (sourced from the
    // Ticketmaster Discovery API `name` field by the proposal tooling; blank
    // when the batch predates the column). Never constructed locally.
    event_name: clean(row.event_name),
    city: clean(row.city),
    country: clean(row.country),
    venue: clean(row.venue),
    datetime_iso: clean(row.datetime_iso),
    // timezone and status are inserted below only when present: an empty
    // string is rejected by validate-events.py, but an absent key is fine.
    tour_name: "",
    ticketmaster_event_id: tmEventId,
    ticketmaster_url: tmUrl,
    seatgeek_url: clean(row.seatgeek_url),
    vividseats_url: clean(row.vividseats_url),
    source_type: "ticketmaster",
    source_url: tmUrl,
    last_verified_at: null,
    // Explicit publishability state read by the runtime CTA/redirect gates
    // (eventLinkPublishable in functions/[[path]].js, public/app.js,
    // functions/api/out.js). machine_high_confidence rows may render without
    // human review; needs_recheck rows never render until a human flips them.
    verification_status: verificationStatus,
    provider_links: {
      ticketmaster: {
        event_id: tmEventId || null,
        discovery_event_id: tmDiscoveryEventId || null,
        url: tmUrl || null,
        verified: false,
        last_verified_at: null,
        availability_status: "not_checked"
      },
      seatgeek: unverifiedProviderStub(),
      "vivid-seats": unverifiedProviderStub(),
      stubhub: unverifiedProviderStub()
    }
  };
  if (tmDiscoveryEventId) {
    event.ticketmaster_discovery_event_id = tmDiscoveryEventId;
  }
  if (timezone) event.timezone = timezone;
  if (status) event.status = status;
  return event;
}

// Pure planning step: classifies candidate rows against existing events.
function planMerge(existingEvents, candidateRows) {
  const validRows = [];
  const invalidRows = [];
  for (const row of candidateRows) {
    const issues = rowIssues(row);
    if (issues.length > 0) invalidRows.push({ row, issues });
    else validRows.push(row);
  }
  const existingIds = new Set(existingEvents.map((event) => clean(event?.id)).filter(Boolean));
  const newRows = [];
  const duplicateRows = [];
  const seenInBatch = new Set();
  for (const row of validRows) {
    const id = clean(row.id);
    if (existingIds.has(id) || seenInBatch.has(id)) duplicateRows.push(row);
    else newRows.push(row);
    seenInBatch.add(id);
  }

  const semanticDuplicateGroups = [];
  const bySemanticKey = new Map();
  for (const row of validRows) {
    const key = semanticDuplicateKey(row);
    if (!key) continue;
    const bucket = bySemanticKey.get(key) || [];
    bucket.push(row);
    bySemanticKey.set(key, bucket);
  }
  for (const [key, rows] of bySemanticKey.entries()) {
    const distinctIds = new Set(rows.map((row) => clean(row.id)).filter(Boolean));
    if (rows.length > 1 && distinctIds.size > 1) semanticDuplicateGroups.push({ key, rows });
  }

  return { validRows, invalidRows, newRows, duplicateRows, semanticDuplicateGroups };
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function tryReadJson(filePath) {
  try {
    return { ok: true, data: await readJson(filePath) };
  } catch (error) {
    return { ok: false, error: error.code === "ENOENT" ? "file not found" : String(error.message || error) };
  }
}

// Inspects the trust-flag convention of the existing events.json.
function inspectProviderConvention(events) {
  let withTm = 0;
  const verifiedCounts = {};
  const availabilityValues = new Set();
  for (const event of events) {
    const tm = event?.provider_links?.ticketmaster;
    if (!tm) continue;
    withTm += 1;
    const key = JSON.stringify(tm.verified ?? null);
    verifiedCounts[key] = (verifiedCounts[key] || 0) + 1;
    if (tm.availability_status) availabilityValues.add(tm.availability_status);
  }
  return { total: events.length, withTm, verifiedCounts, availabilityValues: [...availabilityValues] };
}

function describeDrift(csvText) {
  const { header, records } = csvToObjects(csvText);
  return {
    headerOnly: records.length === 0,
    dataRows: records.length,
    columnCount: header.length,
    missingRichColumns: RICH_ONLY_FIELDS.filter((field) => !header.includes(field))
  };
}

function line(label, value) {
  return `  ${label.padEnd(34)}${value}`;
}

// Snapshots every file the events pipeline may write, so a failed apply can
// be rolled back to a byte-identical pre-run state.
async function snapshotPipelineFiles() {
  const files = new Map();
  for (const filePath of [EVENTS_JSON_PATH, EVENTS_INDEX_PATH, INDEX_HTML_PATH]) {
    try {
      files.set(filePath, await fs.readFile(filePath));
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  let partitionFiles = [];
  try {
    partitionFiles = (await fs.readdir(EVENTS_PARTITION_DIR)).filter((f) => f.endsWith(".json"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  for (const name of partitionFiles) {
    const filePath = path.join(EVENTS_PARTITION_DIR, name);
    files.set(filePath, await fs.readFile(filePath));
  }
  return files;
}

// Restores a snapshot: rewrites captured files and deletes any partition file
// created after the snapshot (e.g. a new per-artist file).
async function restoreSnapshot(snapshot) {
  for (const [filePath, content] of snapshot) {
    await fs.writeFile(filePath, content);
  }
  let current = [];
  try {
    current = (await fs.readdir(EVENTS_PARTITION_DIR)).filter((f) => f.endsWith(".json"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  for (const name of current) {
    const filePath = path.join(EVENTS_PARTITION_DIR, name);
    if (!snapshot.has(filePath)) await fs.rm(filePath);
  }
}

// Runs a pipeline step; returns { ok, label, detail }.
function runStep(label, command, args) {
  const result = spawnSync(command, args, { cwd: REPO_ROOT, encoding: "utf8" });
  if (result.error) return { ok: false, label, detail: String(result.error.message || result.error) };
  if (result.status !== 0) {
    const tail = clean(`${result.stderr || ""}${result.stdout || ""}`, 600);
    return { ok: false, label, detail: `exit ${result.status}: ${tail}` };
  }
  return { ok: true, label, detail: clean(result.stdout, 200) };
}

function runSelfTest() {
  const checks = [];
  const assert = (label, condition) => checks.push({ label, pass: Boolean(condition) });

  const parsed = parseCsv('a,b\n"x,y",z\n');
  assert("csv parses quoted comma", parsed.length === 2 && parsed[1][0] === "x,y");
  const objs = csvToObjects("id,venue\n1,The O2\n");
  assert("csv maps headers to objects", objs.records[0].id === "1" && objs.records[0].venue === "The O2");

  const goodRow = { id: "x", artist_slug: "olivia-rodrigo", artist_name: "a", city: "a", country: "a", venue: "The O2", datetime_iso: "2026-01-01T00:00:00Z" };
  assert("clean row has no issues", rowIssues(goodRow).length === 0);
  assert("missing venue is flagged", rowIssues({ ...goodRow, venue: "" }).some((r) => r.includes("venue")));
  assert("bad slug is flagged", rowIssues({ ...goodRow, artist_slug: "Bad Slug" }).length > 0);

  const event = buildEvent({
    ...goodRow,
    ticketmaster_url: "https://tm.example/e/1",
    ticketmaster_event_id: "E1",
    ticketmaster_discovery_event_id: "vv1AAZkOVGkdF4IwR",
    status: "on-sale"
  });
  assert("built event starts unverified", event.provider_links.ticketmaster.verified === false);
  assert("built event defaults to needs_recheck", event.verification_status === "needs_recheck");

  const canonicalRow = {
    ...goodRow,
    ticketmaster_url: "https://www.ticketmaster.com/artist-show-city-01-01-2026/event/E100ABC",
    ticketmaster_event_id: "E100ABC",
    datetime_iso: "2026-01-01T19:30:00Z"
  };
  const fullConfidence = new Map([["olivia-rodrigo", 1]]);
  assert(
    "canonical 1.0-confidence row is machine_high_confidence",
    classifyCandidateLink(canonicalRow, fullConfidence) === "machine_high_confidence"
  );
  assert(
    "sub-1.0 confidence row is needs_recheck",
    classifyCandidateLink(canonicalRow, new Map([["olivia-rodrigo", 0.92]])) === "needs_recheck"
  );
  assert(
    "missing confidence is needs_recheck",
    classifyCandidateLink(canonicalRow, new Map()) === "needs_recheck"
  );
  assert(
    "short-form /event/<id> url is needs_recheck",
    classifyCandidateLink(
      { ...canonicalRow, ticketmaster_url: "https://www.ticketmaster.com/event/E100ABC" },
      fullConfidence
    ) === "needs_recheck"
  );
  assert(
    "non-allowlisted host is needs_recheck",
    classifyCandidateLink(
      { ...canonicalRow, ticketmaster_url: "https://www.axs.com/artist-show/event/E100ABC" },
      fullConfidence
    ) === "needs_recheck"
  );
  assert(
    "event id missing from url is needs_recheck",
    classifyCandidateLink(
      { ...canonicalRow, ticketmaster_url: "https://www.ticketmaster.com/artist-show-city-01-01-2026/event/OTHER1" },
      fullConfidence
    ) === "needs_recheck"
  );
  assert(
    "date-only datetime is needs_recheck",
    classifyCandidateLink({ ...canonicalRow, datetime_iso: "2026-01-01" }, fullConfidence) === "needs_recheck"
  );
  const builtHighConfidence = buildEvent(canonicalRow, classifyCandidateLink(canonicalRow, fullConfidence));
  assert(
    "machine approval never sets the human-verified provider flag",
    builtHighConfidence.verification_status === "machine_high_confidence" &&
      builtHighConfidence.provider_links.ticketmaster.verified === false
  );
  assert("built event keeps storefront id top-level", event.ticketmaster_event_id === "E1");
  assert("built event stores Discovery id top-level", event.ticketmaster_discovery_event_id === "vv1AAZkOVGkdF4IwR");
  assert("built event stores Discovery id in provider metadata", event.provider_links.ticketmaster.discovery_event_id === "vv1AAZkOVGkdF4IwR");
  assert("built event source_type is ticketmaster", event.source_type === "ticketmaster");
  assert("built event blanks event_name when the row has none", event.event_name === "");
  assert(
    "built event carries the row's API listing title verbatim as event_name",
    buildEvent({ ...goodRow, event_name: "The Eternal Sunshine Tour" }).event_name === "The Eternal Sunshine Tour"
  );
  assert("built event never invents tour_name", event.tour_name === "");
  assert(
    "built event never carries a row tour_name (human-gated, #172)",
    buildEvent({ ...goodRow, tour_name: "Should Not Pass Through" }).tour_name === ""
  );
  assert("built event keeps last_verified_at null", event.last_verified_at === null);

  const existing = [{ id: "dup-1" }, { id: "keep-1" }];
  const plan = planMerge(existing, [
    { ...goodRow, id: "dup-1" },
    { ...goodRow, id: "new-1" },
    { ...goodRow, id: "new-1" },
    { ...goodRow, id: "bad", venue: "" }
  ]);
  assert("duplicate id is skipped", plan.duplicateRows.length === 2 && plan.newRows.length === 1);
  assert("invalid row is excluded", plan.invalidRows.length === 1 && plan.newRows.every((r) => r.id !== "bad"));
  const semanticDupePlan = planMerge([], [
    { ...goodRow, id: "a1", venue: "Madison Square Garden", city: "New York", country: "US", datetime_iso: "2026-06-01T19:00:00-04:00" },
    { ...goodRow, id: "a2", venue: "Madison  Square  Garden", city: "new york", country: "us", datetime_iso: "2026-06-01T00:00:00Z" }
  ]);
  assert("semantic duplicate with distinct ids is flagged", semanticDupePlan.semanticDuplicateGroups.length === 1);
  const differentGeoPlan = planMerge([], [
    { ...goodRow, id: "b1", venue: "The O2", city: "London", country: "GB", datetime_iso: "2026-06-01T19:00:00+01:00" },
    { ...goodRow, id: "b2", venue: "The O2", city: "Prague", country: "CZ", datetime_iso: "2026-06-01T19:00:00+01:00" }
  ]);
  assert("same artist/venue/date but different city-country is not duplicate", differentGeoPlan.semanticDuplicateGroups.length === 0);
  const differentDatePlan = planMerge([], [
    { ...goodRow, id: "c1", venue: "The O2", city: "London", country: "GB", datetime_iso: "2026-06-01T19:00:00+01:00" },
    { ...goodRow, id: "c2", venue: "The O2", city: "London", country: "GB", datetime_iso: "2026-06-02T19:00:00+01:00" }
  ]);
  assert("same artist/venue but different date is not duplicate", differentDatePlan.semanticDuplicateGroups.length === 0);

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
  if (!options.candidate) {
    console.error("ERROR: --candidate <dir> is required. See --help.");
    return 2;
  }

  const candidateDir = path.resolve(REPO_ROOT, options.candidate);
  const csvPath = path.join(candidateDir, "events.csv");
  const rejectedPath = path.join(candidateDir, "events.rejected.json");
  const reportPath = path.join(candidateDir, "report.json");
  const artistsPath = path.join(candidateDir, "artists.proposed.json");
  const catalogPath = path.join(candidateDir, "catalog-ticket-links.proposed.json");

  let candidateCsvText;
  try {
    candidateCsvText = await fs.readFile(csvPath, "utf8");
  } catch {
    console.error(`ERROR: cannot read ${path.relative(REPO_ROOT, csvPath)} - is --candidate a valid batch folder?`);
    return 2;
  }

  const eventsResult = await tryReadJson(EVENTS_JSON_PATH);
  if (!eventsResult.ok) {
    console.error(`ERROR: cannot read public/data/events.json: ${eventsResult.error}`);
    return 2;
  }
  const existingEvents = Array.isArray(eventsResult.data) ? eventsResult.data : [];

  const rejectedResult = await tryReadJson(rejectedPath);
  const rejectedEvents = rejectedResult.ok && Array.isArray(rejectedResult.data) ? rejectedResult.data : [];
  const reportResult = await tryReadJson(reportPath);
  const report = reportResult.ok ? reportResult.data : null;
  // Discovery artist-match confidence per slug, used to classify candidate
  // link publishability. Missing report or missing entry → no confidence →
  // rows land as needs_recheck (suppressed until human review).
  const confidenceBySlug = new Map(
    (Array.isArray(report?.accepted) ? report.accepted : [])
      .filter((entry) => entry && clean(entry.proposed_slug))
      .map((entry) => [clean(entry.proposed_slug), entry.confidence])
  );
  const artistsResult = await tryReadJson(artistsPath);
  const proposedArtists = artistsResult.ok && Array.isArray(artistsResult.data) ? artistsResult.data : [];
  const catalogResult = await tryReadJson(catalogPath);
  const proposedCatalog = catalogResult.ok && Array.isArray(catalogResult.data) ? catalogResult.data : [];

  const { records: candidateRows } = csvToObjects(candidateCsvText);
  const { validRows, invalidRows, newRows, duplicateRows, semanticDuplicateGroups } = planMerge(existingEvents, candidateRows);

  const convention = inspectProviderConvention(existingEvents);
  const drift = describeDrift(await fs.readFile(EVENTS_CSV_PATH, "utf8").catch(() => ""));

  // Conditions that block a real --write run (the drift is handled by design,
  // so it is a warning, not a blocker).
  const writeBlockers = [];
  if (report && clean(report.mode) !== "dry-run") writeBlockers.push("report.json mode is not 'dry-run'");
  if (invalidRows.length > 0) writeBlockers.push(`${invalidRows.length} invalid candidate row(s)`);
  if (semanticDuplicateGroups.length > 0) {
    writeBlockers.push(`${semanticDuplicateGroups.length} semantic duplicate group(s) found in candidate rows (same artist_slug + venue + city + country + local date from datetime_iso)`);
  }
  if (rejectedEvents.length > 0 && !options.allowRejected) {
    writeBlockers.push(`events.rejected.json is non-empty (${rejectedEvents.length}); pass --allow-rejected to proceed`);
  }

  // ---- Report -------------------------------------------------------------
  const out = [];
  out.push("=".repeat(72));
  out.push(`apply-artists.mjs - ${options.write ? "WRITE MODE (events only)" : "PREVIEW ONLY (no files written)"}`);
  out.push("=".repeat(72));
  out.push(`Candidate batch: ${path.relative(REPO_ROOT, candidateDir)}/`);
  out.push("Live events file: public/data/events.json");
  out.push("");

  out.push("SOURCE-OF-TRUTH CHECK");
  out.push(line("public/data/events.json:", `${existingEvents.length} events - AUTHORITATIVE live source (confirmed)`));
  if (drift.headerOnly) {
    out.push(line("data/events.csv:", `header-only (${drift.columnCount} columns, 0 data rows) - STALE`));
    out.push("");
    out.push("  >> SOURCE-OF-TRUTH DRIFT (warning, not a blocker)");
    out.push(`     data/events.csv is header-only while events.json holds ${existingEvents.length} events.`);
    if (drift.missingRichColumns.length > 0) {
      out.push(`     The CSV schema is lossy: no column for ${drift.missingRichColumns.join(", ")}.`);
    }
    out.push("     This apply step merges into events.json directly and never runs");
    out.push("     csv-to-events.py, so the stale CSV cannot corrupt live data.");
    out.push("     Future cleanup: treat events.json as the single source of truth;");
    out.push("     retire data/events.csv or regenerate it from events.json.");
  } else {
    out.push(line("data/events.csv:", `${drift.dataRows} data rows`));
  }
  out.push("");

  out.push("CANDIDATE BATCH CONTENTS");
  out.push(line("report.json mode:", report ? clean(report.mode) || "(unknown)" : "(report.json missing)"));
  out.push(line("events.csv rows:", String(candidateRows.length)));
  out.push(line("events.rejected.json rows:", String(rejectedEvents.length)));
  out.push(line("artists.proposed.json:", `${proposedArtists.length} (NOT applied - events only)`));
  out.push(line("catalog-ticket-links.proposed:", `${proposedCatalog.length} (NOT applied - events only)`));
  out.push("");

  out.push("ROW VALIDATION (re-check of candidate events.csv)");
  out.push(line("valid rows:", String(validRows.length)));
  out.push(line("invalid rows (excluded):", String(invalidRows.length)));
  for (const { row, issues } of invalidRows.slice(0, 10)) {
    out.push(`    - ${clean(row.id) || "(no id)"}: ${issues.join("; ")}`);
  }
  out.push("");

  out.push("DUPLICATE DETECTION (candidate id vs events.json id)");
  out.push(line("new events (to add):", String(newRows.length)));
  out.push(line("duplicates (skipped):", String(duplicateRows.length)));
  for (const row of duplicateRows.slice(0, 10)) out.push(`    - ${clean(row.id)}`);
  out.push("");

  out.push("SEMANTIC DUPLICATE DETECTION (within candidate events.csv)");
  out.push("  Duplicate key: artist_slug + venue + city + country + local-date(datetime_iso)");
  out.push(line("duplicate groups:", String(semanticDuplicateGroups.length)));
  if (semanticDuplicateGroups.length > 0) {
    out.push("  Likely duplicate real-world shows detected. Clean candidate CSV before apply.");
  }
  semanticDuplicateGroups.slice(0, 10).forEach((group, index) => {
    out.push(`    Group ${index + 1}: ${group.key}`);
    for (const row of group.rows) {
      out.push(
        `      - row id=${clean(row.id)} tm_event_id=${clean(row.ticketmaster_event_id) || "(none)"} ` +
          `artist_slug=${clean(row.artist_slug)} venue=${clean(row.venue)} city=${clean(row.city)} ` +
          `country=${clean(row.country)} date=${localDateFromIso(row.datetime_iso) || "(invalid)"} ` +
          `ticketmaster_url=${clean(row.ticketmaster_url) || "(none)"}`
      );
    }
  });
  if (semanticDuplicateGroups.length > 10) {
    out.push(`    ... ${semanticDuplicateGroups.length - 10} more group(s) not shown`);
  }
  out.push("");

  out.push("EXISTING provider_links.ticketmaster CONVENTION (events.json)");
  out.push(line("events with ticketmaster link:", `${convention.withTm}/${convention.total}`));
  out.push(line("verified flag distribution:", JSON.stringify(convention.verifiedCounts)));
  out.push("  Applied candidates start verified:false / availability not_checked");
  out.push("  until a human verifies them.");
  out.push("");

  // ---- Write path ---------------------------------------------------------
  let writeResult = null;
  if (options.write) {
    if (writeBlockers.length > 0) {
      out.push("WRITE ABORTED - preconditions not met:");
      for (const blocker of writeBlockers) out.push(`   - ${blocker}`);
      out.push("");
      out.push("No files were written.");
      out.push("=".repeat(72));
      console.log(out.join("\n"));
      return 1;
    }
    if (newRows.length === 0) {
      out.push("WRITE SKIPPED - no new events to add (nothing to do).");
      out.push("No files were written.");
      out.push("=".repeat(72));
      console.log(out.join("\n"));
      return 0;
    }
    writeResult = await performWrite(existingEvents, newRows, confidenceBySlug);
  }

  out.push("BEFORE / AFTER SUMMARY");
  out.push(line("events.json before:", String(existingEvents.length)));
  out.push(line("valid candidate rows:", String(validRows.length)));
  out.push(line("rejected rows ignored:", `${rejectedEvents.length} (never applied)`));
  out.push(line("duplicates skipped:", String(duplicateRows.length)));
  out.push(line("new events added:", options.write ? String(writeResult?.added ?? 0) : `${newRows.length} (projected)`));
  out.push(
    line(
      options.write ? "events.json after (actual):" : "events.json after (projected):",
      String(options.write ? writeResult?.after ?? existingEvents.length : existingEvents.length + newRows.length)
    )
  );

  if (options.write && writeResult) {
    out.push("");
    out.push("WRITE RESULT");
    if (writeResult.ok) {
      out.push("  status: SUCCESS");
      out.push("  files changed:");
      for (const f of writeResult.filesChanged) out.push(`   - ${f}`);
      out.push("  pipeline:");
      for (const step of writeResult.steps) out.push(`   - ${step.label}: ${step.ok ? "OK" : "FAILED"}`);
    } else {
      out.push("  status: FAILED - changes rolled back");
      for (const step of writeResult.steps) {
        out.push(`   - ${step.label}: ${step.ok ? "OK" : "FAILED"}`);
        if (!step.ok) out.push(`       ${step.detail}`);
      }
      out.push(`  rollback: ${writeResult.rolledBack ? "events.json and pipeline files restored to pre-run state" : "INCOMPLETE - inspect manually"}`);
    }
  }
  out.push("");

  if (!options.write) {
    out.push("APPLY-READINESS VERDICT");
    if (writeBlockers.length === 0) {
      out.push("  --write could proceed for this batch.");
    } else {
      out.push("  --write would abort until these are handled:");
      for (const blocker of writeBlockers) out.push(`   - ${blocker}`);
    }
    out.push("");
    out.push("PREVIEW ONLY: no files were written. Re-run with --write to apply.");
  }
  out.push("=".repeat(72));

  console.log(out.join("\n"));
  return options.write && writeResult && !writeResult.ok ? 1 : 0;
}

// Performs the events-only apply with snapshot/rollback around the pipeline.
async function performWrite(existingEvents, newRows, confidenceBySlug) {
  const snapshot = await snapshotPipelineFiles();
  const steps = [];
  const builtEvents = newRows.map((row) => buildEvent(row, classifyCandidateLink(row, confidenceBySlug)));
  // Existing events are preserved exactly; new events are appended in order.
  const merged = [...existingEvents, ...builtEvents];

  await fs.writeFile(EVENTS_JSON_PATH, `${JSON.stringify(merged, null, 2)}\n`, "utf8");

  // partition-events.py and sync-events-data.py are Python scripts; they are
  // invoked with python3 (the package.json events:* aliases do the same).
  const pipeline = [
    ["validate events (pre-pipeline)", "python3", ["scripts/validate-events.py", "--for-production"]],
    ["partition events", "python3", ["scripts/partition-events.py"]],
    ["sync events data", "python3", ["scripts/sync-events-data.py"]],
    ["validate events (post-pipeline)", "python3", ["scripts/validate-events.py", "--for-production"]]
  ];
  for (const [label, command, args] of pipeline) {
    const step = runStep(label, command, args);
    steps.push(step);
    if (!step.ok) {
      let rolledBack = true;
      try {
        await restoreSnapshot(snapshot);
      } catch {
        rolledBack = false;
      }
      return { ok: false, steps, rolledBack, added: 0, after: existingEvents.length };
    }
  }

  const filesChanged = ["public/data/events.json", "public/data/events-index.json", "public/data/events/*.json", "public/index.html"];
  return { ok: true, steps, added: builtEvents.length, after: merged.length, filesChanged };
}

main()
  .then((code) => process.exit(code))
  .catch((error) => {
    console.error(`ERROR: ${error.message || error}`);
    process.exit(1);
  });
