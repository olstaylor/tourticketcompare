#!/usr/bin/env node
// Candidate batch splitter for per-artist review and apply.
//
// Reads one candidate folder produced by scripts/propose-artists.mjs and
// writes a NEW candidate folder containing only the requested artist
// slug(s), so scripts/apply-artists.mjs can be run against a smaller,
// individually reviewed subset (the workflow mandates one artist per PR).
//
// This script only reads the source candidate folder and (read-only)
// public/data/catalog.json for an advisory host check. It writes only a new
// folder under candidates/ (gitignored). It never edits public/data/*,
// functions/*, or any production file, never deduplicates or invents rows,
// and never flips any trust flag.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { slugify } from "./lib/slugify.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const CANDIDATES_ROOT = path.join(REPO_ROOT, "candidates");
const CATALOG_JSON_PATH = path.join(REPO_ROOT, "public", "data", "catalog.json");

// Number of detail lines printed per warning category before truncating.
const MAX_DETAIL_LINES = 10;

function usage() {
  return `Usage: node scripts/split-candidates.mjs --source <dir> --slugs <a[,b,...]> [options]

Splits a propose-artists.mjs candidate folder into a new candidate folder
containing only the requested artist slug(s). Writes only inside candidates/;
never touches production data.

Options:
  --source <dir>     Source candidate folder (required), e.g.
                     candidates/batch-new-artists-2026-06-10
  --slugs <list>     Comma-separated artist slugs to keep (required, repeatable)
  --out <dir>        Output folder (default: <source>--<slug1>[+N-more])
  --force            Allow overwriting an existing output folder
  --drop-rejected    Write an empty events.rejected.json instead of carrying
                     the selected artists' rejected rows
  --self-test        Run built-in checks without reading any folder
  -h, --help         Show this help

Notes:
  - Splitting never fixes semantic duplicates: apply-artists.mjs --write will
    still refuse until a human removes duplicate rows from events.csv.
  - A non-empty events.rejected.json still requires --allow-rejected at apply
    time (rejected rows are never applied regardless).
  - Production onboarding remains ONE artist per PR; multi-slug folders are
    for review convenience only.
`;
}

function clean(value, max = 4096) {
  return String(value ?? "").trim().slice(0, max);
}

function parseArgs(argv) {
  const options = {
    source: "",
    slugs: [],
    outDir: "",
    force: false,
    dropRejected: false,
    selfTest: false,
    help: false
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => argv[(i += 1)];
    switch (arg) {
      case "--source":
        options.source = clean(next());
        break;
      case "--slugs":
        for (const part of clean(next()).split(",")) {
          const slug = slugify(part);
          if (slug) options.slugs.push(slug);
        }
        break;
      case "--out":
        options.outDir = clean(next());
        break;
      case "--force":
        options.force = true;
        break;
      case "--drop-rejected":
        options.dropRejected = true;
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
  options.slugs = [...new Set(options.slugs)];
  return options;
}

// ---------------------------------------------------------------------------
// CSV: parser copied from scripts/apply-artists.mjs, serializer from
// scripts/propose-artists.mjs, so a split CSV round-trips byte-compatibly
// through both ends of the pipeline.
// ---------------------------------------------------------------------------

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

function csvCell(value) {
  const text = clean(value, 1024);
  if (/[",\r\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

function toCsv(header, rows) {
  const lines = [header.map((col) => csvCell(col)).join(",")];
  for (const row of rows) {
    lines.push(header.map((col) => csvCell(row[col])).join(","));
  }
  return `${lines.join("\n")}\n`;
}

// ---------------------------------------------------------------------------
// Semantic duplicate detection: key logic copied from scripts/apply-artists.mjs
// so this script flags exactly what apply --write would refuse.
// ---------------------------------------------------------------------------

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

function findSemanticDuplicateGroups(rows) {
  const byKey = new Map();
  for (const row of rows) {
    const key = semanticDuplicateKey(row);
    if (!key) continue;
    const bucket = byKey.get(key) || [];
    bucket.push(row);
    byKey.set(key, bucket);
  }
  const groups = [];
  for (const [key, bucket] of byKey.entries()) {
    const distinctIds = new Set(bucket.map((row) => clean(row.id)).filter(Boolean));
    if (bucket.length > 1 && distinctIds.size > 1) groups.push({ key, rows: bucket });
  }
  return groups;
}

// ---------------------------------------------------------------------------
// Host allowlist check (advisory only): same matching rule as
// hostnameAllowed in functions/api/out.js.
// ---------------------------------------------------------------------------

function hostnameAllowed(hostname, allowedHosts) {
  const host = String(hostname || "").toLowerCase();
  return allowedHosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
}

function hostOfUrl(value) {
  try {
    return new URL(clean(value, 2048)).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function findDisallowedHostRows(rows, allowedHosts) {
  const byHost = new Map();
  if (!Array.isArray(allowedHosts) || allowedHosts.length === 0) return byHost;
  for (const row of rows) {
    const url = clean(row.ticketmaster_url);
    if (!url) continue;
    const host = hostOfUrl(url);
    if (!host || hostnameAllowed(host, allowedHosts)) continue;
    const bucket = byHost.get(host) || [];
    bucket.push(clean(row.id) || "(no id)");
    byHost.set(host, bucket);
  }
  return byHost;
}

// ---------------------------------------------------------------------------
// Pure split helpers (covered by --self-test).
// ---------------------------------------------------------------------------

function selectSlugs(requested, available) {
  const availableSet = new Set(available);
  const missing = requested.filter((slug) => !availableSet.has(slug));
  if (missing.length > 0) {
    return { ok: false, missing, available: [...available].sort() };
  }
  return { ok: true, slugs: requested };
}

function filterCsvRows(records, slugSet) {
  return records.filter((row) => slugSet.has(clean(row.artist_slug)));
}

// Rejected rows from propose-artists.mjs always carry artist_slug (the row
// spread includes every CSV column). The id-prefix fallback is defensive
// only, anchored on the propose id shape tm-<slug>-<year|tba>-... so that a
// slug that prefixes another slug cannot false-positive.
function rejectedRowMatchesSlug(row, slug) {
  const rowSlug = clean(row?.artist_slug);
  if (rowSlug) return rowSlug === slug;
  const id = clean(row?.id);
  return new RegExp(`^tm-${slug}-(\\d{4}|tba)-`).test(id);
}

function filterRejectedRows(rows, slugs, dropRejected) {
  if (dropRejected) return [];
  return rows.filter((row) => slugs.some((slug) => rejectedRowMatchesSlug(row, slug)));
}

function defaultOutDir(sourceDir, slugs) {
  const suffix = slugs.length > 1 ? `${slugs[0]}+${slugs.length - 1}-more` : slugs[0];
  return `${sourceDir}--${suffix}`;
}

function isInsideDir(parentDir, childDir) {
  const rel = path.relative(parentDir, childDir);
  return rel !== "" && !rel.startsWith("..") && !path.isAbsolute(rel);
}

function validateOutDir({ outDir, sourceDir, candidatesRoot, exists, force }) {
  if (!isInsideDir(candidatesRoot, outDir)) {
    return { ok: false, reason: `output folder must be inside ${path.basename(candidatesRoot)}/ (got: ${outDir})` };
  }
  if (path.resolve(outDir) === path.resolve(sourceDir)) {
    return { ok: false, reason: "output folder must not equal the source folder" };
  }
  if (exists && !force) {
    return { ok: false, reason: `output folder already exists: ${outDir} (pass --force to overwrite)` };
  }
  return { ok: true };
}

function summarizeCountries(rows) {
  const out = {};
  for (const row of rows) {
    const key = clean(row.country) || "(unknown)";
    out[key] = (out[key] || 0) + 1;
  }
  return out;
}

function findDuplicateIds(rows) {
  const seen = new Map();
  for (const row of rows) {
    const id = clean(row.id);
    seen.set(id, (seen.get(id) || 0) + 1);
  }
  const issues = [];
  for (const [id, count] of seen) {
    if (count > 1) issues.push(`duplicate candidate id '${id}' appears ${count} times`);
  }
  return issues;
}

// ---------------------------------------------------------------------------
// Output builders.
// ---------------------------------------------------------------------------

function buildReport({ sourceReport, sourceRel, slugs, artistGroups, keptRows, keptRejected, splitWarnings }) {
  const sourceAccepted = Array.isArray(sourceReport.accepted) ? sourceReport.accepted : [];
  const acceptedBySlug = new Map(sourceAccepted.map((entry) => [clean(entry?.proposed_slug), entry]));
  const accepted = [];
  for (const group of artistGroups) {
    const sourceEntry = acceptedBySlug.get(group.slug) || {};
    accepted.push({
      ...sourceEntry,
      input: sourceEntry.input || group.name,
      matched_attraction: sourceEntry.matched_attraction || group.name,
      proposed_slug: group.slug,
      event_count: group.acceptedRows.length,
      rejected_event_count: group.rejectedRows.length
    });
  }
  return {
    generated_at: sourceReport.generated_at || null,
    mode: "dry-run",
    split_from: sourceRel,
    split_slugs: slugs,
    split_at: new Date().toISOString(),
    discovery_base: sourceReport.discovery_base ?? null,
    country_filter: sourceReport.country_filter ?? null,
    min_confidence: sourceReport.min_confidence ?? null,
    max_events_per_artist: sourceReport.max_events_per_artist ?? null,
    inputs: accepted.map((entry) => entry.input),
    totals: {
      inputs: slugs.length,
      accepted: accepted.length,
      rejected: 0,
      candidate_events: keptRows.length,
      rejected_events: keptRejected.length
    },
    accepted,
    rejected: [],
    artist_event_summary: artistGroups.map((group) => ({
      slug: group.slug,
      name: group.name,
      accepted_events: group.acceptedRows.length,
      rejected_events: group.rejectedRows.length
    })),
    country_summary: summarizeCountries(keptRows),
    batch_warnings: [],
    split_warnings: splitWarnings,
    structural_issues: findDuplicateIds(keptRows),
    validation_notes: Array.isArray(sourceReport.validation_notes) ? sourceReport.validation_notes : [],
    review_instructions: Array.isArray(sourceReport.review_instructions) ? sourceReport.review_instructions : [],
    notes: [
      `Split from ${sourceRel} by scripts/split-candidates.mjs; see that folder's report.json for the full batch.`,
      "country_source_audit is not carried over: it cannot be reconstructed from events.csv. Consult the source batch report.",
      "Rejected INPUTS (artists that failed matching) from the source batch are not carried over.",
      ...(Array.isArray(sourceReport.notes) ? sourceReport.notes : [])
    ]
  };
}

// Renders the artist-page CTA lines for affiliate-actions.md from a proposed
// artist record, which may carry Discovery-sourced URL evidence added by
// scripts/propose-artists.mjs (ticketmaster_artist_url / artist_page_url_*).
function artistPageCtaLines(slug, record) {
  const url = clean(record?.ticketmaster_artist_url, 2048);
  const status = clean(record?.artist_page_url_status) || "missing";
  if (status === "sourced" && url) {
    return [
      `  - Artist-page CTA: NOT LIVE. Discovery-sourced candidate URL: ${url}`,
      "    (artist_page_url_status: sourced). A human must open this exact URL in a browser and " +
        "confirm it resolves to the correct artist before hand-adding the " +
        `\`VERIFIED_TICKET_LINKS["${slug}:ticketmaster"]\` entry in \`functions/api/out.js\` ` +
        "(protected file - explicit scope required)."
    ];
  }
  return [
    `  - Artist-page CTA: MISSING (artist_page_url_status: ${status}). The Ticketmaster artist page URL must be manually ` +
      "verified in a browser before promotion, then added by hand as a " +
      `\`VERIFIED_TICKET_LINKS["${slug}:ticketmaster"]\` entry in \`functions/api/out.js\` ` +
      "(protected file - explicit scope required)."
  ];
}

function buildAffiliateActions({ sourceRel, artistGroups }) {
  const lines = [
    "# Affiliate / deep-link actions (split folder)",
    "",
    `Generated by \`scripts/split-candidates.mjs\` from \`${sourceRel}\`.`,
    "This file does not change any affiliate behaviour.",
    "",
    "## Per-artist status",
    ""
  ];
  if (artistGroups.length === 0) {
    lines.push("_No artists in this split._", "");
  }
  for (const group of artistGroups) {
    lines.push(`- **${group.name}** (\`${group.slug}\`)`);
    lines.push(
      `  - Event-level CTAs: ${group.acceptedRows.length} candidate event(s) with Ticketmaster URLs ` +
        "-> work automatically via the existing Impact API path once events are applied."
    );
    lines.push(...artistPageCtaLines(group.slug, group.record));
    lines.push("");
  }
  lines.push(`See \`${sourceRel}/affiliate-actions.md\` for the full batch context.`, "");
  return `${lines.join("\n")}\n`;
}

// ---------------------------------------------------------------------------
// Self-test.
// ---------------------------------------------------------------------------

function runSelfTest() {
  const checks = [];
  const assert = (label, condition) => checks.push({ label, pass: Boolean(condition) });

  // CSV round trip with quoted commas.
  const header = ["id", "artist_slug", "venue"];
  const rows = [
    { id: "x1", artist_slug: "shakira", venue: "Arena, Hall \"A\"" },
    { id: "x2", artist_slug: "raye", venue: "Plain Venue" }
  ];
  const roundTrip = csvToObjects(toCsv(header, rows));
  assert("csv round-trips quoted commas and quotes", roundTrip.records[0].venue === 'Arena, Hall "A"');
  assert("csv round-trip preserves row count", roundTrip.records.length === 2);
  assert("csv round-trip preserves header", roundTrip.header.join(",") === header.join(","));

  // Slug filtering.
  const filtered = filterCsvRows(roundTrip.records, new Set(["shakira"]));
  assert("slug filtering keeps only requested rows", filtered.length === 1 && filtered[0].id === "x1");

  // Repeated --slugs handling (comma-separated and repeatable, deduped).
  const args = parseArgs(["--slugs", "shakira,raye", "--slugs", "Karol G", "--slugs", "raye"]);
  assert("repeated --slugs accumulate and dedupe", args.slugs.join("|") === "shakira|raye|karol-g");

  // Output folder guards.
  const root = path.join("/repo", "candidates");
  const src = path.join(root, "batch");
  assert(
    "refuses overwrite without --force",
    validateOutDir({ outDir: path.join(root, "x"), sourceDir: src, candidatesRoot: root, exists: true, force: false }).ok === false
  );
  assert(
    "--force allows existing output folder",
    validateOutDir({ outDir: path.join(root, "x"), sourceDir: src, candidatesRoot: root, exists: true, force: true }).ok === true
  );
  assert(
    "refuses output outside candidates/",
    validateOutDir({ outDir: "/tmp/x", sourceDir: src, candidatesRoot: root, exists: false, force: false }).ok === false
  );
  assert(
    "refuses output equal to source",
    validateOutDir({ outDir: src, sourceDir: src, candidatesRoot: root, exists: false, force: false }).ok === false
  );
  assert("default out dir for one slug", defaultOutDir("candidates/batch", ["shakira"]) === "candidates/batch--shakira");
  assert(
    "default out dir for several slugs",
    defaultOutDir("candidates/batch", ["shakira", "raye", "doja-cat"]) === "candidates/batch--shakira+2-more"
  );

  // Semantic duplicate parity with apply-artists.mjs (same fixtures).
  const goodRow = { id: "x", artist_slug: "olivia-rodrigo", venue: "The O2", city: "London", country: "GB", datetime_iso: "2026-06-01T19:00:00+01:00" };
  const dupGroups = findSemanticDuplicateGroups([
    { ...goodRow, id: "a1", venue: "Madison Square Garden", city: "New York", country: "US", datetime_iso: "2026-06-01T19:00:00-04:00" },
    { ...goodRow, id: "a2", venue: "Madison  Square  Garden", city: "new york", country: "us", datetime_iso: "2026-06-01T00:00:00Z" }
  ]);
  assert("semantic duplicate with distinct ids is flagged", dupGroups.length === 1);
  const differentGeo = findSemanticDuplicateGroups([
    { ...goodRow, id: "b1" },
    { ...goodRow, id: "b2", city: "Prague", country: "CZ" }
  ]);
  assert("different city-country is not duplicate", differentGeo.length === 0);
  const differentDate = findSemanticDuplicateGroups([
    { ...goodRow, id: "c1" },
    { ...goodRow, id: "c2", datetime_iso: "2026-06-02T19:00:00+01:00" }
  ]);
  assert("different date is not duplicate", differentDate.length === 0);
  const sameId = findSemanticDuplicateGroups([
    { ...goodRow, id: "d1" },
    { ...goodRow, id: "d1" }
  ]);
  assert("same id is not a semantic duplicate group", sameId.length === 0);

  // Rejected row filtering.
  const rejectedRows = [
    { id: "tm-shakira-2026-miami-abc", artist_slug: "shakira", rejection_reasons: ["x"] },
    { id: "tm-raye-2026-london-def", artist_slug: "raye", rejection_reasons: ["x"] },
    { id: "tm-shakira-2026-madrid-ghi", artist_slug: "", rejection_reasons: ["x"] },
    { id: "tm-shakira-bell-2026-x-jkl", artist_slug: "", rejection_reasons: ["x"] }
  ];
  const keptRejected = filterRejectedRows(rejectedRows, ["shakira"], false);
  assert("rejected rows filter by artist_slug", keptRejected.some((r) => r.id.endsWith("abc")));
  assert("rejected rows exclude other slugs", !keptRejected.some((r) => r.id.endsWith("def")));
  assert("rejected fallback matches id prefix when slug missing", keptRejected.some((r) => r.id.endsWith("ghi")));
  assert("rejected fallback does not match prefix-colliding slug", !keptRejected.some((r) => r.id.endsWith("jkl")));
  assert("--drop-rejected writes empty set", filterRejectedRows(rejectedRows, ["shakira"], true).length === 0);

  // Artist-page CTA evidence rendering in regenerated affiliate-actions.md.
  const sourcedLines = artistPageCtaLines("shakira", {
    ticketmaster_artist_url: "https://www.ticketmaster.com/shakira-tickets/artist/779049",
    artist_page_url_status: "sourced"
  });
  assert("sourced artist record renders the candidate URL", sourcedLines.join(" ").includes("artist/779049"));
  assert("sourced artist record still requires browser verification", sourcedLines.join(" ").includes("browser"));
  assert("absent artist record renders MISSING", artistPageCtaLines("x", null)[0].includes("MISSING"));
  assert(
    "non-sourced status renders MISSING with the status",
    artistPageCtaLines("x", { artist_page_url_status: "needs_review" })[0].includes("needs_review")
  );
  assert(
    "sourced status without a url renders MISSING",
    artistPageCtaLines("x", { artist_page_url_status: "sourced", ticketmaster_artist_url: "" })[0].includes("MISSING")
  );

  // Missing slug error lists available slugs.
  const selection = selectSlugs(["nope"], ["shakira", "raye"]);
  assert("missing slug is reported", selection.ok === false && selection.missing.join() === "nope");
  assert("missing slug error lists available slugs", selection.ok === false && selection.available.join("|") === "raye|shakira");
  assert("valid slug selection passes", selectSlugs(["raye"], ["shakira", "raye"]).ok === true);

  // Host allowlist matching parity with out.js.
  assert("allowlisted host passes", hostnameAllowed("www.ticketmaster.com", ["ticketmaster.com"]));
  assert("non-allowlisted ticketmaster host fails", !hostnameAllowed("www.ticketmaster.ie", ["ticketmaster.com", "ticketmaster.co.uk"]));
  const hostMap = findDisallowedHostRows(
    [
      { id: "h1", ticketmaster_url: "https://www.ticketmaster.ie/event/1" },
      { id: "h2", ticketmaster_url: "https://www.ticketmaster.com/event/2" },
      { id: "h3", ticketmaster_url: "" }
    ],
    ["ticketmaster.com"]
  );
  assert("disallowed host rows are collected", hostMap.get("www.ticketmaster.ie")?.length === 1 && hostMap.size === 1);

  let failed = 0;
  for (const check of checks) {
    if (!check.pass) failed += 1;
    console.log(`${check.pass ? "PASS" : "FAIL"}  ${check.label}`);
  }
  console.log(`\n${checks.length - failed}/${checks.length} checks passed.`);
  return failed === 0 ? 0 : 1;
}

// ---------------------------------------------------------------------------
// Main.
// ---------------------------------------------------------------------------

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

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function loadTicketmasterAllowedHosts() {
  const result = await tryReadJson(CATALOG_JSON_PATH);
  if (!result.ok) return { hosts: [], warning: `could not read catalog.json for host check (${result.error})` };
  const providers = Array.isArray(result.data?.providers) ? result.data.providers : [];
  const ticketmaster = providers.find((p) => clean(p?.slug) === "ticketmaster");
  const hosts = Array.isArray(ticketmaster?.allowed_destination_hosts)
    ? ticketmaster.allowed_destination_hosts.map((h) => clean(h).toLowerCase()).filter(Boolean)
    : [];
  if (hosts.length === 0) return { hosts: [], warning: "catalog.json has no ticketmaster allowed_destination_hosts; host check skipped" };
  return { hosts, warning: "" };
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
  if (!options.source) {
    console.error("ERROR: --source <dir> is required. See --help.");
    return 2;
  }
  if (options.slugs.length === 0) {
    console.error("ERROR: --slugs <a[,b,...]> is required. See --help.");
    return 2;
  }

  const sourceDir = path.resolve(REPO_ROOT, options.source);
  const sourceRel = path.relative(REPO_ROOT, sourceDir);
  const csvPath = path.join(sourceDir, "events.csv");
  let csvText;
  try {
    csvText = await fs.readFile(csvPath, "utf8");
  } catch {
    console.error(`ERROR: cannot read ${path.relative(REPO_ROOT, csvPath)} - is --source a valid candidate folder?`);
    return 2;
  }

  const reportResult = await tryReadJson(path.join(sourceDir, "report.json"));
  if (!reportResult.ok) {
    console.error(`ERROR: cannot read ${sourceRel}/report.json (${reportResult.error}). A coherent split needs the source report.`);
    return 2;
  }
  const sourceReport = reportResult.data || {};
  if (clean(sourceReport.mode) !== "dry-run") {
    console.error(`ERROR: ${sourceRel}/report.json mode is '${clean(sourceReport.mode) || "(missing)"}', expected 'dry-run'. Refusing to split.`);
    return 2;
  }

  const artistsResult = await tryReadJson(path.join(sourceDir, "artists.proposed.json"));
  const sourceArtists = artistsResult.ok && Array.isArray(artistsResult.data) ? artistsResult.data : [];
  const catalogLinksResult = await tryReadJson(path.join(sourceDir, "catalog-ticket-links.proposed.json"));
  const sourceCatalogLinks = catalogLinksResult.ok && Array.isArray(catalogLinksResult.data) ? catalogLinksResult.data : [];
  const rejectedResult = await tryReadJson(path.join(sourceDir, "events.rejected.json"));
  const sourceRejected = rejectedResult.ok && Array.isArray(rejectedResult.data) ? rejectedResult.data : [];

  const { header, records } = csvToObjects(csvText);
  if (header.length === 0) {
    console.error(`ERROR: ${sourceRel}/events.csv has no header row.`);
    return 2;
  }

  // Requested slugs must exist somewhere in the source batch.
  const availableSlugs = new Set([
    ...sourceArtists.map((a) => clean(a?.slug)).filter(Boolean),
    ...records.map((r) => clean(r.artist_slug)).filter(Boolean),
    ...sourceRejected.map((r) => clean(r?.artist_slug)).filter(Boolean)
  ]);
  const selection = selectSlugs(options.slugs, [...availableSlugs]);
  if (!selection.ok) {
    console.error(`ERROR: slug(s) not found in source batch: ${selection.missing.join(", ")}`);
    console.error(`Available slugs:\n  ${selection.available.join("\n  ")}`);
    return 2;
  }
  const slugs = selection.slugs;
  const slugSet = new Set(slugs);

  // Resolve and guard the output folder.
  const outDir = options.outDir ? path.resolve(REPO_ROOT, options.outDir) : path.resolve(defaultOutDir(sourceDir, slugs));
  const outDirCheck = validateOutDir({
    outDir,
    sourceDir,
    candidatesRoot: CANDIDATES_ROOT,
    exists: await pathExists(outDir),
    force: options.force
  });
  if (!outDirCheck.ok) {
    console.error(`ERROR: ${outDirCheck.reason}`);
    return 2;
  }

  // Filter every file by slug.
  const keptRows = filterCsvRows(records, slugSet);
  const keptArtists = sourceArtists.filter((a) => slugSet.has(clean(a?.slug)));
  const keptCatalogLinks = sourceCatalogLinks.filter((l) => slugSet.has(clean(l?.artist_slug)));
  const keptRejected = filterRejectedRows(sourceRejected, slugs, options.dropRejected);

  const sourceAccepted = Array.isArray(sourceReport.accepted) ? sourceReport.accepted : [];
  const nameBySlug = new Map([
    ...sourceAccepted.map((e) => [clean(e?.proposed_slug), clean(e?.matched_attraction)]),
    ...keptArtists.map((a) => [clean(a?.slug), clean(a?.name)])
  ]);
  const artistGroups = slugs.map((slug) => ({
    slug,
    name: nameBySlug.get(slug) || slug,
    record: keptArtists.find((a) => clean(a?.slug) === slug) || null,
    acceptedRows: keptRows.filter((r) => clean(r.artist_slug) === slug),
    rejectedRows: options.dropRejected
      ? []
      : sourceRejected.filter((r) => rejectedRowMatchesSlug(r, slug))
  }));

  // Advisory checks (warn only; nothing is dropped or rewritten).
  const splitWarnings = [];
  if (slugs.length > 1) {
    splitWarnings.push(
      `STRONG WARNING: ${slugs.length} slugs selected. Production onboarding must remain ONE artist per PR ` +
        "(docs/SAFE_NEXT_ARTIST_WORKFLOW.md guardrail 6). A multi-slug folder is for review convenience only - " +
        "do not apply it as a single batch."
    );
  }
  for (const group of artistGroups) {
    if (group.acceptedRows.length === 0) {
      splitWarnings.push(`artist '${group.slug}' has zero accepted events in this split (events.csv is header-only for it).`);
    }
  }
  const duplicateGroups = findSemanticDuplicateGroups(keptRows);
  if (duplicateGroups.length > 0) {
    splitWarnings.push(
      `${duplicateGroups.length} semantic duplicate group(s) in the split events.csv (same artist+venue+city+country+date, ` +
        "distinct ids). apply-artists.mjs --write WILL REFUSE this folder until a human removes duplicate rows. " +
        "This script never auto-deduplicates."
    );
  }
  if (keptRejected.length > 0) {
    splitWarnings.push(
      `events.rejected.json is non-empty (${keptRejected.length} row(s)). apply-artists.mjs --write will require ` +
        "--allow-rejected (rejected rows are never applied regardless)."
    );
  } else if (options.dropRejected) {
    const droppedCount = sourceRejected.filter((r) => slugs.some((slug) => rejectedRowMatchesSlug(r, slug))).length;
    if (droppedCount > 0) {
      splitWarnings.push(
        `--drop-rejected omitted ${droppedCount} rejected row(s) for the selected slug(s); see ${sourceRel}/events.rejected.json for them.`
      );
    }
  }
  const { hosts: allowedHosts, warning: hostCheckWarning } = await loadTicketmasterAllowedHosts();
  if (hostCheckWarning) splitWarnings.push(hostCheckWarning);
  const disallowedHostRows = findDisallowedHostRows(keptRows, allowedHosts);
  for (const [host, ids] of disallowedHostRows) {
    splitWarnings.push(
      `${ids.length} accepted row(s) use Ticketmaster host '${host}' which is NOT in catalog.json ` +
        "allowed_destination_hosts - event CTAs for these rows would fail /api/out validation if applied as-is."
    );
  }

  // Build and write outputs (the only writes this script performs).
  const report = buildReport({ sourceReport, sourceRel, slugs, artistGroups, keptRows, keptRejected, splitWarnings });
  const affiliateActions = buildAffiliateActions({ sourceRel, artistGroups });

  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, "events.csv"), toCsv(header, keptRows), "utf8");
  await fs.writeFile(path.join(outDir, "events.rejected.json"), `${JSON.stringify(keptRejected, null, 2)}\n`, "utf8");
  await fs.writeFile(path.join(outDir, "artists.proposed.json"), `${JSON.stringify(keptArtists, null, 2)}\n`, "utf8");
  await fs.writeFile(
    path.join(outDir, "catalog-ticket-links.proposed.json"),
    `${JSON.stringify(keptCatalogLinks, null, 2)}\n`,
    "utf8"
  );
  await fs.writeFile(path.join(outDir, "affiliate-actions.md"), affiliateActions, "utf8");
  await fs.writeFile(path.join(outDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");

  // Post-write verification: re-parse the written CSV and assert shape.
  const written = csvToObjects(await fs.readFile(path.join(outDir, "events.csv"), "utf8"));
  const verifyErrors = [];
  if (written.header.join(",") !== header.join(",")) verifyErrors.push("written events.csv header differs from source header");
  if (written.records.length !== keptRows.length) {
    verifyErrors.push(`written events.csv has ${written.records.length} rows, expected ${keptRows.length}`);
  }
  const strayRows = written.records.filter((r) => !slugSet.has(clean(r.artist_slug)));
  if (strayRows.length > 0) verifyErrors.push(`${strayRows.length} written row(s) belong to unrequested slugs`);
  if (verifyErrors.length > 0) {
    console.error("ERROR: post-write verification failed:");
    for (const err of verifyErrors) console.error(`  - ${err}`);
    console.error(`The output folder ${path.relative(REPO_ROOT, outDir)}/ is left in place for inspection. Do not apply it.`);
    return 1;
  }

  // Summary.
  const outRel = path.relative(REPO_ROOT, outDir);
  console.log(`Split ${sourceRel}/ -> ${outRel}/ (slugs: ${slugs.join(", ")})`);
  console.log(`  events.csv                         ${keptRows.length} candidate event(s) (of ${records.length} in source)`);
  console.log(`  events.rejected.json               ${keptRejected.length} withheld row(s)${options.dropRejected ? " (--drop-rejected)" : ""}`);
  console.log(`  artists.proposed.json              ${keptArtists.length} proposed artist record(s)`);
  console.log(`  catalog-ticket-links.proposed.json ${keptCatalogLinks.length} proposed ticket_link draft(s)`);
  console.log("  affiliate-actions.md               regenerated (artist-page URL evidence carried over; human browser verification still required)");
  console.log("  report.json                        rewritten (mode: dry-run preserved; provenance: split_from/split_slugs/split_at)");
  console.log("");
  console.log("Post-write verification passed: CSV re-parsed, row count and slug set match.");
  console.log(
    keptRejected.length === 0
      ? "apply-artists.mjs would NOT require --allow-rejected for this folder."
      : "apply-artists.mjs --write WILL require --allow-rejected for this folder."
  );
  if (duplicateGroups.length > 0) {
    console.log(`Semantic duplicate groups: ${duplicateGroups.length} (apply --write will refuse until a human dedups):`);
    for (const group of duplicateGroups.slice(0, MAX_DETAIL_LINES)) {
      console.log(`  - ${group.key} -> ${group.rows.map((r) => clean(r.id)).join(", ")}`);
    }
    if (duplicateGroups.length > MAX_DETAIL_LINES) {
      console.log(`  ... ${duplicateGroups.length - MAX_DETAIL_LINES} more group(s) not shown (all listed in report.json split_warnings)`);
    }
  } else {
    console.log("Semantic duplicate groups: 0");
  }
  if (disallowedHostRows.size > 0) {
    console.log("Host allowlist warnings (advisory; apply does NOT check these):");
    for (const [host, ids] of disallowedHostRows) {
      console.log(`  - ${host}: ${ids.length} row(s), e.g. ${ids.slice(0, 3).join(", ")}`);
    }
  } else if (allowedHosts.length > 0) {
    console.log("Host allowlist warnings: none (all accepted ticketmaster_url hosts are allowlisted).");
  }
  for (const warning of splitWarnings) console.log(`WARNING: ${warning}`);
  console.log("");
  console.log("Split only: no production files were changed. Review the new folder before any apply step.");
  return 0;
}

main()
  .then((code) => process.exit(code))
  .catch((error) => {
    console.error(`ERROR: ${error.message || error}`);
    process.exit(1);
  });
