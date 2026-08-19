#!/usr/bin/env node
//
// Offline test for scripts/lib/tm-ingestion-outcomes.mjs — the per-candidate
// accounting behind the automatic new-show ingestion loop.
//
// It runs against a checked-in synthetic recogniser report
// (scripts/fixtures/tm-discovery-report.fixture.json), shaped exactly like real
// `sync-ticketmaster-events.py --json` output but describing no real artist,
// venue or show. The cases pinned here are the ones the report exists to make
// legible:
//
//   - a successful addition, and the same row when it is already published
//     (existing duplicate) or when the canonical writer silently dropped it;
//   - each of the main withholding paths, including the deliberate rule that a
//     tombstoned or mixed-reason row stays `withheld` rather than `duplicate`;
//   - rows under an artist whose live lookup failed — accounted for, never
//     dropped on the floor;
//   - the invariants a diagnostic must not break: every candidate resolved,
//     every non-added candidate explained, stable output for stable input,
//     capped samples, and no secrets or provider payloads in the artifact.
//
// Usage: node scripts/tm-ingestion-outcomes.test.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  DUPLICATE_REASON_CODES,
  WRITER_REASON_CODES,
  assertAccounting,
  buildOutcomesArtifact,
  buildOutcomesMarkdown,
  candidateKey,
  deriveOutcomes,
  summariseOutcomes,
} from "./lib/tm-ingestion-outcomes.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FIXTURE_PATH = path.join(REPO_ROOT, "scripts", "fixtures", "tm-discovery-report.fixture.json");
const RECOGNISER_PATH = path.join(REPO_ROOT, "scripts", "sync-ticketmaster-events.py");
const GENERATED_AT = "2026-08-11T04:00:00.000Z";

const checks = [];
const assert = (label, pass) => checks.push({ label, pass: !!pass });

const readFixture = () => JSON.parse(fs.readFileSync(FIXTURE_PATH, "utf8"));
const report = readFixture();

// The three rows the writer would batch, with the deterministic events.json id
// each would carry (tm-<slug>-<year>-<city>-<discoveryId lowercased>, built by
// sync-tm-events-write-pr.mjs).
const PROPOSED = new Map([
  ["fixture-artist-a|VVFIXA001", "tm-fixture-artist-a-2027-testville-vvfixa001"],
  ["fixture-artist-a|VVFIXA002", "tm-fixture-artist-a-2027-testville-vvfixa002"],
  ["fixture-artist-a|VVFIXA003", "tm-fixture-artist-a-2027-othertown-vvfixa003"],
]);
const PRE_EXISTING = new Set(["tm-fixture-artist-a-2026-testville-vvold001"]);
const allApplied = new Set([...PRE_EXISTING, ...PROPOSED.values()]);

function outcomesFor({ existingEventIds = PRE_EXISTING, appliedEventIds = allApplied, source = report } = {}) {
  return deriveOutcomes({ report: source, proposedIdByKey: PROPOSED, existingEventIds, appliedEventIds });
}
function artifactFor(options = {}) {
  const { mode = "write-pr", applied = true, ...rest } = options;
  return buildOutcomesArtifact({
    report: options.source || report,
    outcomes: outcomesFor(rest),
    mode,
    applied,
    generatedAt: GENERATED_AT,
    artistScope: "all-approved",
  });
}
const byKey = (outcomes, key) => outcomes.find((outcome) => outcome.key === key);

// ── The fixture is a faithful stand-in for real recogniser output ────────────

const recogniserSource = fs.readFileSync(RECOGNISER_PATH, "utf8");
const catalogueBlock = recogniserSource.slice(
  recogniserSource.indexOf("WITHHOLD_REASON_CODES = {"),
  recogniserSource.indexOf("\n}", recogniserSource.indexOf("WITHHOLD_REASON_CODES = {"))
);
const recogniserCodes = [...catalogueBlock.matchAll(/^ {4}"([a-z0-9_]+)":/gm)].map((m) => m[1]).sort();
assert("the recogniser exposes a non-empty reason-code catalogue", recogniserCodes.length >= 20);
assert(
  "fixture reason-code catalogue matches the recogniser's, so the tests cannot drift from the real vocabulary",
  JSON.stringify(Object.keys(report.withhold_reason_codes).sort()) === JSON.stringify(recogniserCodes)
);
assert(
  "every reason code used by a fixture row is a declared code",
  report.artists
    .flatMap((artist) => artist.rows || [])
    .flatMap((row) => row.withheld_reason_codes || [])
    .every((code) => code in report.withhold_reason_codes)
);

// ── Successful additions ────────────────────────────────────────────────────

const applied = outcomesFor();
assert("every discovered candidate gets exactly one outcome", applied.length === 14);
assert(
  "a clean proposed row that landed in events.json is `added`",
  byKey(applied, "fixture-artist-a|VVFIXA001")?.result === "added"
);
assert(
  "an added candidate carries the events.json id it was written under",
  byKey(applied, "fixture-artist-a|VVFIXA001")?.events_json_id === "tm-fixture-artist-a-2027-testville-vvfixa001"
);
assert("an added candidate carries no reason codes", byKey(applied, "fixture-artist-a|VVFIXA001").reason_codes.length === 0);
assert(
  "all three batched rows are added when the write applied them",
  summariseOutcomes(applied).by_result.added === 3
);

// ── Duplicates ──────────────────────────────────────────────────────────────

assert(
  "a row the recogniser withheld purely as an id duplicate is `duplicate`",
  byKey(applied, "fixture-artist-a|VVFIXA004")?.result === "duplicate"
);
assert(
  "a venue/date duplicate is `duplicate`",
  byKey(applied, "fixture-artist-a|VVFIXA005")?.result === "duplicate"
);
assert(
  "a within-batch duplicate is `duplicate`",
  byKey(applied, "fixture-artist-a|VVFIXA006")?.result === "duplicate"
);
assert(
  "a candidate that is both past and duplicated stays `withheld` — a human still has something to look at",
  byKey(applied, "fixture-artist-b|VVFIXB003")?.result === "withheld"
);
assert(
  "a tombstoned (owner-deleted) match is withheld, never counted as a routine duplicate",
  byKey(applied, "fixture-artist-b|VVFIXB002")?.result === "withheld" &&
    byKey(applied, "fixture-artist-b|VVFIXB002").reason_codes.includes("tombstoned_event_id")
);
assert(
  "tombstone codes are deliberately absent from the duplicate set",
  !DUPLICATE_REASON_CODES.has("tombstoned_event_id") && !DUPLICATE_REASON_CODES.has("tombstoned_venue_date")
);

// A proposed row whose deterministic id is already published: the recogniser's
// own dedup missed it (different Discovery id, same computed row), and before
// this report the run would simply have written nothing and said nothing.
const alreadyPublished = outcomesFor({
  existingEventIds: new Set([...PRE_EXISTING, "tm-fixture-artist-a-2027-testville-vvfixa002"]),
});
assert(
  "a batched row whose events.json id already exists is `duplicate`, not `added`",
  byKey(alreadyPublished, "fixture-artist-a|VVFIXA002")?.result === "duplicate" &&
    byKey(alreadyPublished, "fixture-artist-a|VVFIXA002").reason_codes.includes("duplicate_existing_event_row")
);
assert(
  "the other two batched rows are unaffected",
  summariseOutcomes(alreadyPublished).by_result.added === 2 &&
    summariseOutcomes(alreadyPublished).by_result.duplicate === 4
);

// ── Withholding paths ───────────────────────────────────────────────────────

const codesOf = (key) => byKey(applied, key)?.reason_codes || [];
assert("past event is withheld with past_event", codesOf("fixture-artist-a|VVFIXA007").includes("past_event"));
assert(
  "a cancelled listing is withheld with status_not_onsale",
  codesOf("fixture-artist-a|VVFIXA008").includes("status_not_onsale")
);
assert(
  "a non-allowlisted host is withheld and keeps every rule that fired",
  codesOf("fixture-artist-a|VVFIXA009").join(",") === "host_not_allowlisted,missing_storefront_event_id"
);
assert(
  "an upsell package is withheld with travel_package_listing",
  codesOf("fixture-artist-a|VVFIXA010").includes("travel_package_listing")
);
assert(
  "a festival/support appearance is withheld with not_primary_attraction",
  codesOf("fixture-artist-b|VVFIXB001").includes("not_primary_attraction")
);
assert(
  "rows under an artist whose live lookup failed are withheld, not dropped from the count",
  byKey(applied, "fixture-artist-c|VVFIXC001")?.result === "withheld" &&
    codesOf("fixture-artist-c|VVFIXC001").includes("artist_lookup_failed")
);

// The write path's own failure mode: the row was batched, the write ran, and
// events.json does not contain it afterwards.
const dropped = outcomesFor({
  appliedEventIds: new Set([...PRE_EXISTING, "tm-fixture-artist-a-2027-testville-vvfixa001", "tm-fixture-artist-a-2027-testville-vvfixa002"]),
});
assert(
  "a batched row missing from events.json after the write is withheld with write_not_applied",
  byKey(dropped, "fixture-artist-a|VVFIXA003")?.result === "withheld" &&
    byKey(dropped, "fixture-artist-a|VVFIXA003").reason_codes.includes("write_not_applied")
);
assert("the dropped row is not counted as added", summariseOutcomes(dropped).by_result.added === 2);

// An ineligible artist blocks its rows even if the recogniser ever returns any.
const ineligibleReport = readFixture();
ineligibleReport.artists.find((a) => a.artist_slug === "fixture-artist-d").rows = [
  { ticketmaster_discovery_event_id: "VVFIXD001", disposition: "proposed", datetime_iso: "2027-10-10T19:00:00Z", venue: "Fixture Hall", city: "Testville" },
];
const ineligible = deriveOutcomes({ report: ineligibleReport, proposedIdByKey: PROPOSED, existingEventIds: PRE_EXISTING, appliedEventIds: allApplied });
assert(
  "a row under an ineligible artist is withheld with artist_not_eligible",
  byKey(ineligible, "fixture-artist-d|VVFIXD001")?.result === "withheld" &&
    byKey(ineligible, "fixture-artist-d|VVFIXD001").reason_codes.includes("artist_not_eligible")
);

// A report generated before the recogniser emitted codes must not be silently
// re-classified by guessing at its prose.
const legacyReport = readFixture();
for (const row of legacyReport.artists[0].rows) delete row.withheld_reason_codes;
const legacy = deriveOutcomes({ report: legacyReport, proposedIdByKey: PROPOSED, existingEventIds: PRE_EXISTING, appliedEventIds: allApplied });
assert(
  "a withheld row with no codes is reported as unknown, never inferred from its sentence",
  byKey(legacy, "fixture-artist-a|VVFIXA007")?.reason_codes.join() === "reason_codes_missing_from_report" &&
    byKey(legacy, "fixture-artist-a|VVFIXA007").result === "withheld"
);
assert("the unknown-code case is catalogued", "reason_codes_missing_from_report" in WRITER_REASON_CODES);

// ── Totals ──────────────────────────────────────────────────────────────────

const summary = summariseOutcomes(applied);
assert(
  "results add up to the candidate count",
  summary.by_result.added + summary.by_result.duplicate + summary.by_result.withheld === summary.candidates
);
assert("totals by result are exact", summary.by_result.added === 3 && summary.by_result.duplicate === 3 && summary.by_result.withheld === 8);
assert("reason-code totals count each rule that fired", summary.by_reason_code.past_event === 2);
assert(
  "a candidate that tripped two rules is counted under both",
  summary.by_reason_code.host_not_allowlisted === 1 && summary.by_reason_code.missing_storefront_event_id === 1
);
assert(
  "reason codes are ordered by frequency for a readable summary",
  Object.values(summary.by_reason_code).every((count, index, all) => index === 0 || all[index - 1] >= count)
);
assert(
  "per-artist totals are broken out",
  summary.by_artist.find((a) => a.slug === "fixture-artist-a")?.added === 3 &&
    summary.by_artist.find((a) => a.slug === "fixture-artist-b")?.withheld === 3
);
assert("accounting guard passes on a well-formed run", assertAccounting(applied, summary) === true);
assert(
  "accounting guard rejects an unexplained non-added candidate",
  (() => {
    const broken = [{ key: "x", artist_slug: "x", result: "withheld", reason_codes: [], event: {} }];
    try {
      assertAccounting(broken, summariseOutcomes(broken));
      return false;
    } catch (error) {
      return /no reason code/.test(String(error.message));
    }
  })()
);

// ── Artifact + Markdown ─────────────────────────────────────────────────────

const artifact = artifactFor();
assert("artifact declares its schema version", artifact.schema_version === 1);
assert("artifact records the run mode and that the write applied", artifact.run.mode === "write-pr" && artifact.run.applied === true);
assert(
  "artifact lists skipped artists with a code, not prose",
  artifact.run.artists_skipped.length === 2 &&
    artifact.run.artists_skipped.every((a) => ["artist_not_eligible", "artist_lookup_failed"].includes(a.reason_code))
);
assert(
  "artifact catalogue merges the recogniser's codes with the writer's own",
  artifact.reason_code_catalogue.past_event && artifact.reason_code_catalogue.write_not_applied
);

const markdown = buildOutcomesMarkdown(artifact);
assert("markdown states the candidate total", markdown.includes("14 candidate(s)"));
assert("markdown reports all three results", /\| added \(added\) \| 3 \|/.test(markdown) && markdown.includes("| existing duplicate | 3 |") && markdown.includes("| withheld | 8 |"));
assert("markdown lists reason codes with their rule", markdown.includes("`past_event`") && markdown.includes("Start date is already in the past."));
assert("markdown names the skipped artists", markdown.includes("`fixture-artist-c`") && markdown.includes("`artist_lookup_failed`"));
assert("markdown stays short enough for a PR body / job summary", markdown.length < 8000);

const previewArtifact = artifactFor({ mode: "preview", applied: false, appliedEventIds: null });
assert("a preview run never claims rows were written", previewArtifact.run.applied === false);
assert(
  "preview markdown says `would be added` instead of `added`",
  buildOutcomesMarkdown(previewArtifact).includes("would be added") &&
    buildOutcomesMarkdown(previewArtifact).includes("(nothing written)")
);
assert(
  "a preview run still classifies duplicates and withholds",
  previewArtifact.totals.by_result.duplicate === 3 && previewArtifact.totals.by_result.withheld === 8
);

// ── Idempotency, capping, and disclosure ────────────────────────────────────

assert(
  "the same run produces byte-identical output (nothing depends on iteration order or a hidden clock)",
  JSON.stringify(artifactFor()) === JSON.stringify(artifactFor())
);
assert(
  "outcomes never mutate the report they are derived from",
  JSON.stringify(readFixture()) === JSON.stringify(report)
);

// A real roster run discovers hundreds of candidates; the artifact must stay a
// summary, not a dump.
const bigReport = {
  withhold_reason_codes: report.withhold_reason_codes,
  artists: [
    {
      artist_slug: "fixture-artist-bulk",
      eligible: true,
      live_lookup: "ok",
      rows: Array.from({ length: 240 }, (_, index) => ({
        ticketmaster_discovery_event_id: `VVBULK${String(index).padStart(4, "0")}`,
        datetime_iso: `2027-05-${String((index % 28) + 1).padStart(2, "0")}T19:00:00Z`,
        venue: `Bulk Fixture Venue ${index % 7}`,
        city: "Testville",
        country: "United Kingdom",
        status_code: "onsale",
        disposition: "withheld",
        withheld_reasons: ["duplicate of an existing events.json row (same ticketmaster event id)"],
        withheld_reason_codes: [index % 3 === 0 ? "past_event" : "duplicate_existing_event_id"],
      })),
    },
  ],
};
const bigArtifact = buildOutcomesArtifact({
  report: bigReport,
  outcomes: deriveOutcomes({ report: bigReport }),
  mode: "write-pr",
  applied: true,
  generatedAt: GENERATED_AT,
});
assert("every one of the 240 candidates is counted", bigArtifact.totals.candidates === 240);
assert("the sample is capped", bigArtifact.sample.shown <= bigArtifact.sample.cap.total && bigArtifact.sample.truncated === true);
assert(
  "the cap is per bucket as well as overall, so no single reason floods the sample",
  Object.values(
    bigArtifact.sample.outcomes.reduce((acc, outcome) => {
      const bucket = outcome.result === "added" ? "added" : outcome.reason_codes[0];
      acc[bucket] = (acc[bucket] || 0) + 1;
      return acc;
    }, {})
  ).every((count) => count <= bigArtifact.sample.cap.per_bucket)
);
assert(
  "capping never distorts the totals",
  bigArtifact.totals.by_reason_code.past_event + bigArtifact.totals.by_reason_code.duplicate_existing_event_id === 240
);
assert("the capped markdown says so and points at the full artifact", buildOutcomesMarkdown(bigArtifact).includes("ingestion-outcomes.json"));

const serialised = JSON.stringify(artifact);
assert(
  "no credential from a provider URL reaches the artifact",
  !serialised.includes("FIXTURE_SECRET_MUST_NOT_LEAK") && !serialised.toLowerCase().includes("apikey")
);
assert("no provider URL is copied into the artifact at all", !serialised.includes("ticketmaster_url") && !serialised.includes("https://"));
assert(
  "sample rows expose only allowlisted fields",
  artifact.sample.outcomes.every((outcome) =>
    Object.keys(outcome.event).every((key) =>
      ["discovery_event_id", "storefront_event_id", "date", "venue", "city", "country", "status_code", "url_host"].includes(key)
    )
  )
);
assert(
  "the host is kept, because host allowlisting is itself a withhold rule",
  artifact.sample.outcomes.some((outcome) => outcome.event.url_host)
);
assert(
  "candidateKey falls back to position for a row with no ids at all",
  candidateKey("slug", {}, 4) === "slug|row-4"
);

// ── Codex review follow-ups (PR #690) ───────────────────────────────────────

// Two candidates can collapse onto one deterministic events.json id, and
// apply-artists writes a single row for them. Set membership alone would call
// both `added` and overstate the additions.
const collidingReport = {
  withhold_reason_codes: report.withhold_reason_codes,
  artists: [
    {
      artist_slug: "fixture-artist-collide",
      eligible: true,
      live_lookup: "ok",
      rows: [
        { ticketmaster_discovery_event_id: "VVCOL1", disposition: "proposed", datetime_iso: "2027-05-04T19:00:00Z", venue: "Fixture Arena", city: "Testville" },
        { ticketmaster_discovery_event_id: "VVCOL2", disposition: "proposed", datetime_iso: "2027-05-04T19:00:00Z", venue: "Fixture Arena", city: "Testville" },
      ],
    },
  ],
};
const collidingIds = new Map([
  ["fixture-artist-collide|VVCOL1", "tm-fixture-artist-collide-2027-testville-"],
  ["fixture-artist-collide|VVCOL2", "tm-fixture-artist-collide-2027-testville-"],
]);
const collided = deriveOutcomes({
  report: collidingReport,
  proposedIdByKey: collidingIds,
  existingEventIds: new Set(),
  appliedEventIds: new Set(["tm-fixture-artist-collide-2027-testville-"]),
});
assert(
  "two candidates sharing one events.json id count as one addition, not two",
  summariseOutcomes(collided).by_result.added === 1
);
assert(
  "the second claim on a shared id is a duplicate of the first, with its own code",
  byKey(collided, "fixture-artist-collide|VVCOL2")?.result === "duplicate" &&
    byKey(collided, "fixture-artist-collide|VVCOL2").reason_codes.join() === "duplicate_batch_event_id"
);
assert(
  "a colliding pair whose id was already published stays an existing duplicate, not a batch one",
  deriveOutcomes({
    report: collidingReport,
    proposedIdByKey: collidingIds,
    existingEventIds: new Set(["tm-fixture-artist-collide-2027-testville-"]),
    appliedEventIds: new Set(["tm-fixture-artist-collide-2027-testville-"]),
  }).every((outcome) => outcome.reason_codes.join() === "duplicate_existing_event_row")
);
assert("the batch-collision code is catalogued", "duplicate_batch_event_id" in WRITER_REASON_CODES);

// The Markdown points operators at the JSON for the rows the cap omitted, so
// the JSON has to actually contain them.
assert(
  "the artifact carries every candidate, not just the sampled ones",
  bigArtifact.outcomes.length === bigArtifact.totals.candidates && bigArtifact.outcomes.length === 240
);
assert(
  "a candidate omitted from the capped sample is still in the full list with its result and codes",
  (() => {
    const sampled = new Set(bigArtifact.sample.outcomes.map((outcome) => outcome.key));
    const omitted = bigArtifact.outcomes.filter((outcome) => !sampled.has(outcome.key));
    return omitted.length > 0 && omitted.every((outcome) => outcome.result && outcome.reason_codes.length > 0);
  })()
);
assert(
  "the full list obeys the same field allowlist as the sample",
  bigArtifact.outcomes.every((outcome) =>
    Object.keys(outcome.event).every((key) =>
      ["discovery_event_id", "storefront_event_id", "date", "venue", "city", "country", "status_code", "url_host"].includes(key)
    )
  )
);
assert(
  "completeness leaks nothing: no credential or URL reaches the full list either",
  !JSON.stringify(artifactFor().outcomes).includes("FIXTURE_SECRET_MUST_NOT_LEAK") &&
    !JSON.stringify(artifactFor().outcomes).toLowerCase().includes("apikey") &&
    !JSON.stringify(artifactFor().outcomes).includes("https://")
);
assert(
  "the capped markdown names the array an operator should open",
  buildOutcomesMarkdown(bigArtifact).includes("`outcomes` array")
);

let failed = 0;
for (const check of checks) {
  if (!check.pass) failed += 1;
  console.log(`${check.pass ? "PASS" : "FAIL"}  ${check.label}`);
}
console.log(`\n${checks.length - failed}/${checks.length} checks passed.`);
process.exitCode = failed === 0 ? 0 : 1;
