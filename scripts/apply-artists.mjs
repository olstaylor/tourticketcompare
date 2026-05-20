#!/usr/bin/env node
// Preview-only apply planner for reviewed Ticketmaster candidate batches.
//
// Reads one candidate folder (produced by scripts/propose-artists.mjs) and the
// current public/data/events.json, then reports exactly what a future apply
// step WOULD do: which rows merge, which are duplicates, which are invalid,
// and what a full-schema event object would look like.
//
// This script is PREVIEW-ONLY. It writes nothing. There is intentionally no
// --write flag: a write-capable apply step is a separate, unapproved task.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const EVENTS_JSON_PATH = path.join(REPO_ROOT, "public", "data", "events.json");
const EVENTS_CSV_PATH = path.join(REPO_ROOT, "data", "events.csv");

const REQUIRED_FIELDS = ["id", "artist_slug", "artist_name", "city", "country", "venue", "datetime_iso"];
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ALLOWED_STATUSES = new Set(["draft", "announced", "on-sale", "past"]);

// Columns the existing events.json schema carries that the flat events.csv
// schema cannot represent. Used to describe source-of-truth drift.
const RICH_ONLY_FIELDS = ["event_name", "source_type", "source_url", "last_verified_at", "provider_links"];

function usage() {
  return `Usage: node scripts/apply-artists.mjs --candidate <dir> [options]

Preview-only apply planner. Reports what a future apply step would do for one
reviewed candidate batch. It writes nothing - there is no --write flag.

Options:
  --candidate <dir>   Candidate batch folder (required), e.g.
                      candidates/artists-2026-05-20T10-42-22Z/
  --allow-rejected    Show the plan as if a real apply were allowed to run
                      with a non-empty events.rejected.json. Rejected rows are
                      never applied regardless of this flag.
  -h, --help          Show this help

This script never edits public/data/*, functions/*, data/events.csv, or any
production file. Applying a batch for real is a separate, unapproved step.
`;
}

function clean(value, max = 4096) {
  return String(value ?? "").trim().slice(0, max);
}

function parseArgs(argv) {
  const options = { candidate: "", allowRejected: false, help: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    switch (arg) {
      case "--candidate":
        options.candidate = clean(argv[(i += 1)]);
        break;
      case "--allow-rejected":
        options.allowRejected = true;
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

function unverifiedProviderStub() {
  return {
    event_id: null,
    url: null,
    verified: false,
    last_verified_at: null,
    availability_status: "not_checked"
  };
}

// Builds the full-schema event object a future apply step would insert into
// public/data/events.json. Trust markers start unverified by design: nothing
// here is human-checked yet, so verified is false and dates are null.
function buildSampleEvent(row) {
  const tmUrl = clean(row.ticketmaster_url);
  const tmEventId = clean(row.ticketmaster_event_id);
  return {
    id: clean(row.id),
    artist_slug: clean(row.artist_slug),
    artist_name: clean(row.artist_name),
    event_name: "", // Not available from the candidate CSV; never invented.
    city: clean(row.city),
    country: clean(row.country),
    venue: clean(row.venue),
    datetime_iso: clean(row.datetime_iso),
    timezone: clean(row.timezone),
    tour_name: "", // Discovery returns no reliable tour name.
    status: clean(row.status) || "announced",
    ticketmaster_event_id: tmEventId,
    ticketmaster_url: tmUrl,
    seatgeek_url: clean(row.seatgeek_url),
    vividseats_url: clean(row.vividseats_url),
    source_type: "ticketmaster",
    source_url: tmUrl,
    last_verified_at: null, // Unverified until a human confirms the listing.
    provider_links: {
      ticketmaster: {
        event_id: tmEventId || null,
        url: tmUrl || null,
        verified: false, // Existing events use true; candidates start false.
        last_verified_at: null,
        availability_status: "not_checked"
      },
      seatgeek: unverifiedProviderStub(),
      "vivid-seats": unverifiedProviderStub(),
      stubhub: unverifiedProviderStub()
    }
  };
}

async function readJson(filePath) {
  const text = await fs.readFile(filePath, "utf8");
  return JSON.parse(text);
}

async function tryReadJson(filePath) {
  try {
    return { ok: true, data: await readJson(filePath) };
  } catch (error) {
    return { ok: false, error: error.code === "ENOENT" ? "file not found" : String(error.message || error) };
  }
}

// Inspects the trust-flag convention of the existing events.json so the
// preview can show how applied candidates would differ.
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
  const headerOnly = records.length === 0;
  return {
    headerOnly,
    dataRows: records.length,
    columnCount: header.length,
    missingRichColumns: RICH_ONLY_FIELDS.filter((field) => !header.includes(field))
  };
}

function line(label, value) {
  return `  ${label.padEnd(34)}${value}`;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return 0;
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
  const artistsResult = await tryReadJson(artistsPath);
  const proposedArtists = artistsResult.ok && Array.isArray(artistsResult.data) ? artistsResult.data : [];
  const catalogResult = await tryReadJson(catalogPath);
  const proposedCatalog = catalogResult.ok && Array.isArray(catalogResult.data) ? catalogResult.data : [];

  // Candidate rows.
  const { records: candidateRows } = csvToObjects(candidateCsvText);
  const validRows = [];
  const invalidRows = [];
  for (const row of candidateRows) {
    const issues = rowIssues(row);
    if (issues.length > 0) invalidRows.push({ row, issues });
    else validRows.push(row);
  }

  // Duplicate detection against existing events.json.
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

  const convention = inspectProviderConvention(existingEvents);
  const drift = describeDrift(await fs.readFile(EVENTS_CSV_PATH, "utf8").catch(() => ""));

  // ---- Report -------------------------------------------------------------
  const out = [];
  out.push("=".repeat(72));
  out.push("apply-artists.mjs - PREVIEW ONLY (no files are written)");
  out.push("=".repeat(72));
  out.push(`Candidate batch: ${path.relative(REPO_ROOT, candidateDir)}/`);
  out.push(`Live events file: public/data/events.json`);
  out.push("");

  out.push("SOURCE-OF-TRUTH CHECK");
  out.push(
    line(
      "public/data/events.json:",
      `${existingEvents.length} events - AUTHORITATIVE live source (confirmed)`
    )
  );
  if (drift.headerOnly) {
    out.push(line("data/events.csv:", `header-only (${drift.columnCount} columns, 0 data rows) - STALE`));
    out.push("");
    out.push("  >> SOURCE-OF-TRUTH DRIFT DETECTED");
    out.push("     data/events.csv is header-only while events.json holds");
    out.push(`     ${existingEvents.length} events. The two are out of sync.`);
    if (drift.missingRichColumns.length > 0) {
      out.push(
        `     The CSV schema is also lossy: it has no column for ` +
          `${drift.missingRichColumns.join(", ")},`
      );
      out.push("     all of which exist in events.json records.");
    }
    out.push("     Consequence: running scripts/csv-to-events.py against this");
    out.push("     stale CSV would OVERWRITE events.json and destroy live data.");
    out.push("");
    out.push("  Recommended future cleanup (do NOT do it in this task):");
    out.push("   - Treat public/data/events.json as the single source of truth.");
    out.push("   - Either retire data/events.csv, or add a json->csv exporter so");
    out.push("     it is regenerated from events.json and kept lossless.");
    out.push("   - A future apply step should merge into events.json directly,");
    out.push("     not via data/events.csv + csv-to-events.py.");
  } else {
    out.push(line("data/events.csv:", `${drift.dataRows} data rows`));
  }
  out.push("");

  out.push("CANDIDATE BATCH CONTENTS");
  out.push(line("report.json mode:", report ? clean(report.mode) || "(unknown)" : "(report.json missing)"));
  if (report && Array.isArray(report.structural_issues)) {
    out.push(line("report structural_issues:", String(report.structural_issues.length)));
  }
  out.push(line("events.csv rows:", String(candidateRows.length)));
  out.push(line("events.rejected.json rows:", String(rejectedEvents.length)));
  out.push(line("artists.proposed.json:", String(proposedArtists.length)));
  out.push(line("catalog-ticket-links.proposed:", String(proposedCatalog.length)));
  out.push("");

  out.push("ROW VALIDATION (re-check of candidate events.csv)");
  out.push(line("valid rows:", String(validRows.length)));
  out.push(line("invalid rows (would reject):", String(invalidRows.length)));
  for (const { row, issues } of invalidRows.slice(0, 10)) {
    out.push(`    - ${clean(row.id) || "(no id)"}: ${issues.join("; ")}`);
  }
  if (invalidRows.length > 10) out.push(`    ... and ${invalidRows.length - 10} more`);
  out.push("");

  out.push("DUPLICATE DETECTION (candidate id vs events.json id)");
  out.push(line("new events (would add):", String(newRows.length)));
  out.push(line("duplicates (would skip):", String(duplicateRows.length)));
  for (const row of duplicateRows.slice(0, 10)) {
    out.push(`    - ${clean(row.id)}`);
  }
  if (duplicateRows.length > 10) out.push(`    ... and ${duplicateRows.length - 10} more`);
  out.push("");

  out.push("EXISTING provider_links.ticketmaster CONVENTION (events.json)");
  out.push(line("events with ticketmaster link:", `${convention.withTm}/${convention.total}`));
  out.push(line("verified flag distribution:", JSON.stringify(convention.verifiedCounts)));
  out.push(line("availability_status values:", JSON.stringify(convention.availabilityValues)));
  out.push("  Note: every existing event is verified:true (human-checked).");
  out.push("  Applied candidates would start verified:false / availability");
  out.push("  not_checked until a human verifies them - see sample below.");
  out.push("");

  if (newRows.length > 0) {
    out.push("SAMPLE FULL-SCHEMA EVENT OBJECT (first new event - illustration only)");
    out.push(JSON.stringify(buildSampleEvent(newRows[0]), null, 2).split("\n").map((l) => `  ${l}`).join("\n"));
    out.push("");
  }

  out.push("BEFORE / AFTER SUMMARY (projected - nothing written)");
  out.push(line("events.json before:", String(existingEvents.length)));
  out.push(line("new events to add:", String(newRows.length)));
  out.push(line("duplicates skipped:", String(duplicateRows.length)));
  out.push(line("invalid rows ignored:", String(invalidRows.length)));
  out.push(line("rejected rows ignored:", `${rejectedEvents.length} (events.rejected.json - never applied)`));
  out.push(line("events.json after (projected):", String(existingEvents.length + newRows.length)));
  out.push(line("artists proposed / would add:", `${proposedArtists.length} / 0 (artist add is a separate opt-in)`));
  out.push(line("catalog stubs proposed / add:", `${proposedCatalog.length} / 0 (catalog add is a separate opt-in)`));
  out.push("");

  out.push("APPLY-READINESS VERDICT");
  const blockers = [];
  if (report && clean(report.mode) !== "dry-run") blockers.push("report.json mode is not 'dry-run'");
  if (invalidRows.length > 0) blockers.push(`${invalidRows.length} invalid candidate row(s)`);
  if (rejectedEvents.length > 0 && !options.allowRejected) {
    blockers.push(`events.rejected.json is non-empty (${rejectedEvents.length}) - a real apply would need --allow-rejected`);
  }
  if (drift.headerOnly) {
    blockers.push("source-of-truth drift: a real apply must merge into events.json directly, not via data/events.csv");
  }
  if (blockers.length === 0) {
    out.push("  A future write-capable apply step could proceed for this batch.");
  } else {
    out.push("  A future write-capable apply step would need to handle:");
    for (const blocker of blockers) out.push(`   - ${blocker}`);
  }
  out.push("");
  out.push("PREVIEW ONLY: no files were written. There is no --write flag.");
  out.push("=".repeat(72));

  console.log(out.join("\n"));
  return 0;
}

main()
  .then((code) => process.exit(code))
  .catch((error) => {
    console.error(`ERROR: ${error.message || error}`);
    process.exit(1);
  });
