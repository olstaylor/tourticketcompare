#!/usr/bin/env node
//
// sync-tm-events-write-pr.mjs
//
// Ticketmaster write-to-PR mode (provider-sync sequence step 3 —
// docs/PROVIDER_SYNC.md). This is the explicitly-gated, PR-based write step
// that sits on top of the dry-run recogniser. It NEVER writes to events.json
// directly and NEVER commits to main:
//
//   1. Reads the dry-run recogniser report (scripts/sync-ticketmaster-events.py
//      --json) — either a pre-generated --report file, or by running the
//      recogniser itself for --artist / --all-approved.
//   2. Turns the PROPOSED rows into a candidate batch in the exact format the
//      canonical events writer (scripts/apply-artists.mjs) already consumes
//      (events.csv + report.json + empty events.rejected.json). WITHHELD rows
//      are written to a human review report and never enter the batch.
//   3. Drives apply-artists.mjs, which is the single source of event-record
//      building, link classification (machine_high_confidence vs
//      needs_recheck), events.json serialization, partition + fallback
//      regeneration, and validate-with-rollback. No data logic is duplicated
//      here.
//   4. Runs the full validation suite, then opens a branch + PR for human
//      review (mirroring scripts/tm-discovery-shell-pr.mjs).
//
// Default mode is PREVIEW: it emits the batch and runs apply-artists in
// preview (no --write), touching no tracked data and creating no PR. Only
// --write-pr performs the write + commit, and only a GITHUB_TOKEN +
// GITHUB_REPOSITORY environment opens the PR (use --no-pr to stop after the
// local commit).
//
// Safety properties (see SAFE_PUBLISHING_RULES.md / docs/PROVIDER_SYNC.md):
//   - tour_name is never inferred (left blank for human verification, #172).
//   - Only registry-eligible, sync_enabled, verified artists are processed
//     (the recogniser enforces this; this script trusts its report).
//   - Withheld rows are surfaced for review, never published.
//   - apply-artists.mjs validation failure aborts the run with rollback; no
//     PR is opened.
//
// Usage:
//   node scripts/sync-tm-events-write-pr.mjs --report <report.json>            (preview)
//   node scripts/sync-tm-events-write-pr.mjs --report <report.json> --write-pr
//   node scripts/sync-tm-events-write-pr.mjs --all-approved --write-pr
//   node scripts/sync-tm-events-write-pr.mjs --artist raye --write-pr --no-pr
//   node scripts/sync-tm-events-write-pr.mjs --self-test
//
// Environment (only for the GitHub PR step): GITHUB_TOKEN, GITHUB_REPOSITORY.
// Running the recogniser inline additionally needs TICKETMASTER_API_KEY.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { slugify } from "./lib/slugify.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const ARTISTS_PATH = path.join(REPO_ROOT, "public", "data", "artists.json");
const RECOGNISER = path.join("scripts", "sync-ticketmaster-events.py");
const LABEL = "automation:tm-events";

// Must stay identical to CSV_COLUMNS in scripts/propose-artists.mjs — that is
// the schema apply-artists.mjs (via csvToObjects) reads.
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
  "ticketmaster_discovery_event_id",
  "ticketmaster_url",
  "seatgeek_event_id",
  "seatgeek_url",
  "vividseats_event_id",
  "vividseats_url",
];

// ─── Pure helpers (covered by --self-test) ──────────────────────────────────

function clean(value) {
  return String(value ?? "").trim();
}

// Discovery status code -> events.json status enum. Matches
// discoveryStatusToStatus in propose-artists.mjs; never invents a more
// optimistic state than the API reports.
function statusFromCode(code) {
  return clean(code).toLowerCase() === "onsale" ? "on-sale" : "announced";
}

function csvCell(value) {
  const text = clean(value).slice(0, 1024);
  if (/[",\r\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

function toCsv(rows) {
  const lines = [CSV_COLUMNS.join(",")];
  for (const row of rows) {
    lines.push(CSV_COLUMNS.map((col) => csvCell(row[col])).join(","));
  }
  return lines.join("\n") + "\n";
}

// Builds the deterministic events.json id, identical to propose-artists.mjs:
// tm-<slug>-<year>-<citySlug>-<discoveryId lowercased>.
function buildEventId(slug, datetimeIso, city, discoveryId) {
  const year = clean(datetimeIso).slice(0, 4);
  return `tm-${slug}-${year}-${slugify(city)}-${clean(discoveryId).toLowerCase()}`;
}

// Maps one recogniser report row (status code resolved already, storefront URL
// resolved already) into a candidate CSV row object. tour_name is always blank
// — never inferred from a URL slug (#172).
function buildCsvRow(reportRow, slug, artistName) {
  const discoveryId = clean(reportRow.ticketmaster_discovery_event_id);
  return {
    id: buildEventId(slug, reportRow.datetime_iso, reportRow.city, discoveryId),
    artist_slug: slug,
    artist_name: clean(artistName),
    country: clean(reportRow.country),
    city: clean(reportRow.city),
    venue: clean(reportRow.venue),
    datetime_iso: clean(reportRow.datetime_iso),
    timezone: clean(reportRow.timezone),
    tour_name: "",
    status: statusFromCode(reportRow.status_code),
    ticketmaster_event_id: clean(reportRow.ticketmaster_event_id),
    ticketmaster_discovery_event_id: discoveryId,
    ticketmaster_url: clean(reportRow.ticketmaster_url),
    seatgeek_event_id: "",
    seatgeek_url: "",
    vividseats_event_id: "",
    vividseats_url: "",
  };
}

// Splits a recogniser report into the per-artist proposed/withheld rows plus
// any artists whose live lookup did not succeed (cannot be trusted to write).
function partitionReport(report, namesBySlug) {
  const proposedRows = [];
  const withheld = [];
  const skippedArtists = [];
  const usedArtists = [];
  for (const artist of report?.artists || []) {
    const slug = clean(artist.artist_slug);
    if (!artist.eligible) {
      skippedArtists.push({ slug, reason: `not eligible: ${(artist.eligibility_blockers || []).join("; ") || "unknown"}` });
      continue;
    }
    if (artist.live_lookup !== "ok") {
      skippedArtists.push({ slug, reason: `live lookup ${artist.live_lookup || "unavailable"} — refusing to write from an incomplete fetch` });
      continue;
    }
    const name = namesBySlug.get(slug) || slug;
    let proposedForArtist = 0;
    for (const row of artist.rows || []) {
      if (row.disposition === "proposed") {
        proposedRows.push(buildCsvRow(row, slug, name));
        proposedForArtist += 1;
      } else {
        withheld.push({ slug, row });
      }
    }
    usedArtists.push({ slug, proposed: proposedForArtist });
  }
  return { proposedRows, withheld, skippedArtists, usedArtists };
}

// report.json the apply-artists.mjs write path expects: mode must be "dry-run"
// and every processed slug needs a confidence. The recogniser only proposes a
// row when the registry's verified attraction is the event's PRIMARY
// attraction, which is our identity proof — so confidence is 1 (this is what
// lets apply-artists classify a canonical long-form URL as
// machine_high_confidence; short-form/other URLs still fall to needs_recheck).
function buildApplyReport(usedArtists) {
  return {
    mode: "dry-run",
    source: "sync-tm-events-write-pr.mjs",
    generated_at: new Date().toISOString(),
    accepted: usedArtists.map((a) => ({ proposed_slug: a.slug, confidence: 1 })),
  };
}

function buildWithheldMarkdown(withheld) {
  if (withheld.length === 0) return "# Withheld rows\n\nNone — every recognised event was proposed.\n";
  const lines = ["# Withheld rows (human review required)", "", `${withheld.length} recognised event(s) were withheld and NOT written to events.json.`, ""];
  const byReason = new Map();
  for (const { row } of withheld) {
    for (const reason of row.withheld_reasons || []) {
      byReason.set(reason, (byReason.get(reason) || 0) + 1);
    }
  }
  lines.push("## Reason histogram", "");
  for (const [reason, count] of [...byReason.entries()].sort((a, b) => b[1] - a[1])) {
    lines.push(`- ${count}× ${reason}`);
  }
  lines.push("", "## Rows", "");
  for (const { slug, row } of withheld) {
    lines.push(`- **${slug}** ${row.event_id || "(no id)"} — ${row.datetime_iso || "(no date)"} — ${row.venue || "(no venue)"}, ${row.city || "(no city)"}`);
    for (const reason of row.withheld_reasons || []) lines.push(`  - withheld: ${reason}`);
  }
  lines.push("");
  return lines.join("\n");
}

// ─── I/O + process helpers (not exercised by --self-test) ───────────────────

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, "utf8"));
}

function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, { stdio: "inherit", cwd: REPO_ROOT, ...opts });
  // res.error (e.g. ENOENT when the binary is missing) leaves status null;
  // surface the system error rather than a generic status failure.
  if (res.error) throw res.error;
  if (res.status !== 0) throw new Error(`Command failed: ${cmd} ${args.join(" ")}`);
  return res;
}

function runCapture(cmd, args) {
  const res = spawnSync(cmd, args, { cwd: REPO_ROOT, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (res.error) throw res.error;
  if (res.status !== 0) {
    throw new Error(`Command failed: ${cmd} ${args.join(" ")}\n${res.stderr || res.stdout || ""}`);
  }
  return res.stdout;
}

function runRecogniser(target) {
  const args = [RECOGNISER, ...target, "--dry-run", "--json"];
  console.error(`Running recogniser: python3 ${args.join(" ")}`);
  const stdout = runCapture("python3", args);
  return JSON.parse(stdout);
}

function getRepoInfo() {
  const repo = process.env.GITHUB_REPOSITORY;
  if (!repo || !repo.includes("/")) throw new Error("Missing GITHUB_REPOSITORY (needed to open the PR; use --no-pr to skip).");
  const [owner, name] = repo.split("/");
  return { owner, name };
}

async function githubApi(pathname, { method = "GET", body } = {}) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("Missing GITHUB_TOKEN (needed to open the PR; use --no-pr to skip).");
  const res = await fetch(`https://api.github.com${pathname}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${method} ${pathname} failed: ${res.status} ${text.slice(0, 400)}`);
  }
  return res.status === 204 ? null : res.json();
}

function parseArgs(argv) {
  const options = { report: "", artist: "", allApproved: false, outDir: "", writePr: false, noPr: false, selfTest: false, help: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    switch (arg) {
      case "--report": options.report = clean(argv[(i += 1)]); break;
      case "--artist": options.artist = clean(argv[(i += 1)]); break;
      case "--all-approved": options.allApproved = true; break;
      case "--out-dir": options.outDir = clean(argv[(i += 1)]); break;
      case "--write-pr": options.writePr = true; break;
      case "--no-pr": options.noPr = true; break;
      case "--self-test": options.selfTest = true; break;
      case "-h":
      case "--help": options.help = true; break;
      default: throw new Error(`Unknown option: ${arg}`);
    }
  }
  return options;
}

function usage() {
  return [
    "sync-tm-events-write-pr.mjs — Ticketmaster write-to-PR mode (provider-sync step 3)",
    "",
    "  --report <path>     use a pre-generated recogniser JSON report",
    "  --artist <slug>     run the recogniser for one artist (needs TICKETMASTER_API_KEY)",
    "  --all-approved      run the recogniser for all registry entries",
    "  --out-dir <dir>     where to write the candidate batch (default artifacts/tm-events/<date>)",
    "  --write-pr          apply events + commit + open PR (default is preview only)",
    "  --no-pr             with --write-pr: commit locally but do not open the GitHub PR",
    "  --self-test         offline pure-function tests",
    "",
    "Default (no --write-pr) is preview: emits the batch and runs apply-artists",
    "in preview mode. Nothing tracked is written and no PR is created.",
  ].join("\n");
}

// ─── Self-test ──────────────────────────────────────────────────────────────

function selfTest() {
  const checks = [];
  const assert = (label, pass) => checks.push({ label, pass: !!pass });

  assert("CSV_COLUMNS matches the propose-artists schema length", CSV_COLUMNS.length === 17);
  assert("slugify normalises accents and spaces", slugify("São Paulo") === "sao-paulo");
  assert("statusFromCode maps onsale", statusFromCode("onsale") === "on-sale");
  assert("statusFromCode is conservative for unknown", statusFromCode("") === "announced");
  assert("csvCell quotes embedded commas", csvCell("O2, London") === '"O2, London"');
  assert(
    "buildEventId mirrors the tm-<slug>-<year>-<city>-<discoveryLower> convention",
    buildEventId("shakira", "2026-06-14T02:30:00Z", "Inglewood", "vv1AaZkoVGkdF4iwr") ===
      "tm-shakira-2026-inglewood-vv1aazkovgkdf4iwr"
  );

  const longRow = {
    ticketmaster_discovery_event_id: "vv1ABC",
    ticketmaster_event_id: "09006474C856CC9E",
    ticketmaster_url: "https://www.ticketmaster.com/raye-london/event/09006474C856CC9E",
    datetime_iso: "2027-06-01T19:00:00Z",
    timezone: "Europe/London",
    venue: "The O2",
    city: "London",
    country: "United Kingdom",
    status_code: "onsale",
    disposition: "proposed",
  };
  const csvRow = buildCsvRow(longRow, "raye", "RAYE");
  assert("buildCsvRow keeps every CSV column", CSV_COLUMNS.every((c) => c in csvRow));
  assert("buildCsvRow never infers tour_name", csvRow.tour_name === "");
  assert("buildCsvRow carries the resolved storefront url", csvRow.ticketmaster_url === longRow.ticketmaster_url);
  assert("buildCsvRow blanks marketplace columns", csvRow.seatgeek_url === "" && csvRow.vividseats_url === "");

  const toCsvOut = toCsv([csvRow]);
  assert("toCsv emits a header line + one data line", toCsvOut.trim().split("\n").length === 2);
  assert("toCsv header is the canonical column order", toCsvOut.startsWith(CSV_COLUMNS.join(",") + "\n"));

  const report = {
    artists: [
      {
        artist_slug: "raye",
        eligible: true,
        live_lookup: "ok",
        rows: [
          { ...longRow },
          { ...longRow, disposition: "withheld", event_id: "X2", withheld_reasons: ["past event"] },
        ],
      },
      {
        artist_slug: "beyonce",
        eligible: true,
        live_lookup: "failed",
        rows: [{ ...longRow, disposition: "proposed" }],
      },
      {
        artist_slug: "tate-mcrae",
        eligible: false,
        eligibility_blockers: ["sync_enabled is false"],
        rows: [],
      },
    ],
  };
  const part = partitionReport(report, new Map([["raye", "RAYE"]]));
  assert("partition collects proposed rows from ok artists only", part.proposedRows.length === 1);
  assert("partition collects withheld rows", part.withheld.length === 1);
  assert(
    "partition skips artists with a non-ok live lookup (never writes from a partial fetch)",
    part.skippedArtists.some((s) => s.slug === "beyonce")
  );
  assert(
    "partition skips ineligible artists",
    part.skippedArtists.some((s) => s.slug === "tate-mcrae")
  );
  assert("partition records the proposed count per used artist", part.usedArtists.some((a) => a.slug === "raye" && a.proposed === 1));

  const applyReport = buildApplyReport(part.usedArtists);
  assert("apply report mode is dry-run (apply-artists write precondition)", applyReport.mode === "dry-run");
  assert("apply report sets confidence 1 for every used slug", applyReport.accepted.every((a) => a.confidence === 1));
  assert("apply report covers the proposing artist", applyReport.accepted.some((a) => a.proposed_slug === "raye"));

  const md = buildWithheldMarkdown(part.withheld);
  assert("withheld markdown lists the reason", md.includes("past event"));
  assert("empty withheld markdown is explicit", buildWithheldMarkdown([]).includes("None"));

  let failed = 0;
  for (const c of checks) {
    if (!c.pass) failed += 1;
    console.log(`${c.pass ? "PASS" : "FAIL"}  ${c.label}`);
  }
  console.log(`\n${checks.length - failed}/${checks.length} checks passed.`);
  return failed === 0 ? 0 : 1;
}

// ─── Main ─────────────────────────────────────────────────────────────────

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return 0;
  }
  if (options.selfTest) {
    return selfTest();
  }

  const targets = [];
  if (options.artist) targets.push("--artist", options.artist);
  else if (options.allApproved) targets.push("--all-approved");
  const haveTarget = options.artist || options.allApproved;
  if (!options.report && !haveTarget) {
    console.error("ERROR: provide --report <path>, or --artist <slug> / --all-approved. See --help.");
    return 2;
  }
  if (options.report && haveTarget) {
    console.error("ERROR: --report is mutually exclusive with --artist / --all-approved.");
    return 2;
  }

  const report = options.report ? await readJson(path.resolve(REPO_ROOT, options.report)) : runRecogniser(targets);

  const artists = await readJson(ARTISTS_PATH);
  const namesBySlug = new Map(artists.map((a) => [clean(a.slug), clean(a.name)]));

  const { proposedRows, withheld, skippedArtists, usedArtists } = partitionReport(report, namesBySlug);

  console.log(`Recognised report: ${proposedRows.length} proposed row(s), ${withheld.length} withheld, ${skippedArtists.length} artist(s) skipped.`);
  for (const s of skippedArtists) console.log(`  skipped ${s.slug}: ${s.reason}`);

  const today = new Date().toISOString().slice(0, 10);
  const outDir = path.resolve(REPO_ROOT, options.outDir || path.join("artifacts", "tm-events", today));
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, "events.csv"), toCsv(proposedRows), "utf8");
  await fs.writeFile(path.join(outDir, "events.rejected.json"), "[]\n", "utf8");
  await fs.writeFile(path.join(outDir, "report.json"), `${JSON.stringify(buildApplyReport(usedArtists), null, 2)}\n`, "utf8");
  await fs.writeFile(path.join(outDir, "withheld-review.md"), buildWithheldMarkdown(withheld), "utf8");
  console.log(`Candidate batch written to ${path.relative(REPO_ROOT, outDir)}/`);

  if (proposedRows.length === 0) {
    console.log("No proposed rows — nothing to write, no PR. (Withheld rows, if any, are in withheld-review.md.)");
    return 0;
  }

  const applyArgs = ["scripts/apply-artists.mjs", "--candidate", path.relative(REPO_ROOT, outDir)];
  if (!options.writePr) {
    console.log("\nPREVIEW MODE — running apply-artists.mjs without --write (no tracked files change, no PR):\n");
    run("node", applyArgs);
    console.log("\nPreview complete. Re-run with --write-pr to apply and open a PR.");
    return 0;
  }

  // ---- Write path -----------------------------------------------------------
  console.log("\nWRITE MODE — applying candidate batch via apply-artists.mjs --write:\n");
  run("node", [...applyArgs, "--write"]);
  run("npm", ["run", "test:mvp"]);
  run("git", ["diff", "--check"]);

  const slugs = [...new Set(usedArtists.filter((a) => a.proposed > 0).map((a) => a.slug))];
  const slugLabel = slugs.length === 1 ? slugs[0] : `batch-${slugs.length}`;
  const branch = `automation/tm-events-${slugLabel}-${today}`;
  // -B (not -b) so a re-run after a previous failure, or a same-day rerun,
  // reuses/resets the date+slug automation branch instead of failing fatally.
  run("git", ["checkout", "-B", branch]);
  run("git", [
    "add",
    "public/data/events.json",
    "public/data/events-index.json",
    "public/data/events",
    "public/index.html",
  ]);
  run("git", ["commit", "-m", `automation: add ${proposedRows.length} verified Ticketmaster event(s) for ${slugs.join(", ")}`]);

  if (options.noPr) {
    console.log(`\n--no-pr: committed to branch ${branch}. Push and open a PR manually for human review.`);
    return 0;
  }

  run("git", ["push", "--set-upstream", "origin", branch]);

  const { owner, name } = getRepoInfo();
  const prTitle = slugs.length === 1
    ? `Automated Ticketmaster events: ${slugs[0]} (${proposedRows.length} event${proposedRows.length === 1 ? "" : "s"})`
    : `Automated Ticketmaster events (${slugs.length} artists): ${slugs.join(", ")}`;
  const prBody = [
    "## What this PR does",
    `- Adds ${proposedRows.length} recognised Ticketmaster event(s) for \`${slugs.join("`, `")}\` from the dry-run recogniser, applied through \`scripts/apply-artists.mjs\` (the canonical events writer).`,
    "- Link publishability is classified by apply-artists: canonical long-form storefront URLs become `machine_high_confidence` (CTAs render); short-form `/event/<id>` and any non-canonical URL become `needs_recheck` (URL preserved, CTA suppressed). See the apply-artists output for the per-row split.",
    "",
    "## Withheld (not in this PR)",
    `- ${withheld.length} recognised event(s) were withheld for human review — see \`withheld-review.md\` in the batch artifact. They are NOT written here.`,
    "",
    "## Explicit non-changes",
    "- `tour_name` is left blank on every new row — never inferred from a URL slug (#172). A human must verify the official tour name in a follow-up.",
    "- No changes to `functions/api/out.js`, `VERIFIED_TICKET_LINKS`, or affiliate logic.",
    "- No prices or availability claims.",
    "- No auto-merge.",
    "",
    "## Validation run before this PR",
    "- `apply-artists.mjs --write` (validate → partition → sync → validate, with rollback on failure)",
    "- `npm run test:mvp`",
    "- `git diff --check`",
    "",
    "## Human review checklist",
    "- [ ] Each added event is a real, upcoming, correctly-attributed show.",
    "- [ ] `machine_high_confidence` rows resolve to a working storefront page in a browser.",
    "- [ ] Verify and add the official `tour_name` (or open a follow-up).",
  ].join("\n");

  const pr = await githubApi(`/repos/${owner}/${name}/pulls`, {
    method: "POST",
    body: { title: prTitle, head: branch, base: "main", body: prBody, maintainer_can_modify: true },
  });
  await githubApi(`/repos/${owner}/${name}/issues/${pr.number}/labels`, { method: "POST", body: { labels: [LABEL] } }).catch((err) => {
    console.warn(`Could not add label ${LABEL}: ${err.message}`);
  });
  console.log(`\nCreated PR #${pr.number} for ${slugs.join(", ")}.`);
  return 0;
}

main()
  .then((code) => process.exit(code))
  .catch((error) => {
    console.error(`ERROR: ${error.message || error}`);
    process.exit(1);
  });
