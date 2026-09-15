#!/usr/bin/env node
/**
 * validate-partitions.mjs
 *
 * Verifies that every per-artist partition file under public/data/events/<slug>.json
 * is an exact subset match of public/data/events.json for that artist slug.
 *
 * Also verifies public/data/events-index.json — the flat search index the same
 * generator writes — against events.json. Both public/app.js and
 * public/ttc-home.js load that index to power search, so drift there hides a
 * newly added date from search or keeps a removed one listed, and a stale field
 * value shows the wrong venue or time in a search result. Nothing compared the
 * two until this check: validate-partitions covered the per-artist partitions
 * only, and the smoke suite asserts the file exists and is fetched, not its
 * contents.
 *
 * Exit 1 (FAIL) on:
 *   - missing partition file for a slug present in events.json
 *   - extra IDs in a partition (not in master subset)
 *   - missing IDs in a partition (in master but absent from partition)
 *   - event count mismatch
 *   - invalid JSON in a partition file
 *   - events-index.json missing, unparseable, or not a JSON array
 *   - IDs present in events.json but absent from the index, or vice versa
 *   - an ID carried a different number of times in the two files
 *   - an indexed field whose value has drifted from events.json, or a row
 *     carrying a field the master event does not have (or missing one it does)
 *   - the index holding the right rows in a different order. Both search
 *     consumers sort the records themselves, so order no longer reaches a
 *     visitor; what a divergence proves is that this generated file was not
 *     written by its generator, which is the same staleness a wrong value is
 *
 * Exit 0 (PASS) with warnings on:
 *   - artist with indexing_status "indexable_with_substantial_content" having zero events
 *   - orphan partition file (partition exists but slug has no events in events.json)
 *
 * Artists with indexing_status "review_required" are excluded from zero-event warnings.
 *
 * Every failure here is fixed the same way, by regenerating rather than editing:
 *   npm run events:partition
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";
import { INDEX_FIELDS, indexRowFor } from "./lib/events-index.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const EVENTS_PATH = join(ROOT, "public/data/events.json");
const ARTISTS_PATH = join(ROOT, "public/data/artists.json");
const PARTITIONS_DIR = join(ROOT, "public/data/events");
const INDEX_PATH = join(ROOT, "public/data/events-index.json");

// ── The index contract ────────────────────────────────────────────────────────
//
// INDEX_FIELDS and the row projection live in scripts/lib/events-index.mjs, so
// this checker and the timezone backfill that also writes the file cannot
// disagree about its shape. That module documents why the list is mirrored from
// scripts/partition-events.py rather than inferred.

const show = (value) => (value === undefined ? "—" : JSON.stringify(value));

function rowDifferences(expected, actual) {
  const diffs = [];
  for (const field of INDEX_FIELDS) {
    const inExpected = field in expected;
    const inActual = field in actual;
    if (inExpected !== inActual) {
      diffs.push(inExpected ? `${field} missing from index row` : `${field} present in index but not in the event`);
      continue;
    }
    if (!inExpected) continue;
    if (JSON.stringify(expected[field]) !== JSON.stringify(actual[field])) {
      diffs.push(`${field}: master=${show(expected[field])} index=${show(actual[field])}`);
    }
  }
  for (const key of Object.keys(actual)) {
    if (!INDEX_FIELDS.includes(key)) diffs.push(`unknown field ${key}`);
  }
  return diffs;
}

const sample = (items, limit = 3) => {
  const head = items.slice(0, limit).join(", ");
  return items.length > limit ? `${head} … (+${items.length - limit} more)` : head;
};

const countById = (rows) => {
  const counts = new Map();
  for (const row of rows) {
    const id = row && row.id;
    counts.set(id, (counts.get(id) || 0) + 1);
  }
  return counts;
};

/**
 * Compare public/data/events-index.json against events.json.
 *
 * Pure so the self-test can exercise it without touching the repository's data:
 * takes both arrays, returns what is wrong with them.
 *
 * @param {unknown} events  parsed events.json
 * @param {unknown} index   parsed events-index.json
 * @returns {{ failures: string[], warnings: string[] }}
 */
export function compareEventsIndex(events, index) {
  const failures = [];
  const warnings = [];

  if (!Array.isArray(index)) {
    failures.push("does not contain a JSON array");
    return { failures, warnings };
  }

  if (events.length !== index.length) {
    failures.push(`count mismatch: events.json=${events.length} events-index.json=${index.length}`);
  }

  // Multisets, not sets: a duplicated row is drift even when both files name the
  // same IDs, and it would make the row-by-row comparison below ambiguous.
  const masterCounts = countById(events);
  const indexCounts = countById(index);

  const missing = [...masterCounts.keys()].filter((id) => !indexCounts.has(id));
  const extra = [...indexCounts.keys()].filter((id) => !masterCounts.has(id));
  const duplicated = [...indexCounts.entries()]
    .filter(([id, count]) => masterCounts.has(id) && count !== masterCounts.get(id))
    .map(([id, count]) => `${id} (events.json ${masterCounts.get(id)}×, index ${count}×)`);

  if (missing.length) failures.push(`missing from the index: ${sample(missing)}`);
  if (extra.length) failures.push(`present in the index but not in events.json: ${sample(extra)}`);
  if (duplicated.length) failures.push(`carried a different number of times: ${sample(duplicated)}`);

  // Field drift, for the IDs both files agree on. Keyed by ID rather than by
  // position so a reordered file reports only its ordering, not every row.
  const indexById = new Map();
  for (const row of index) {
    if (row && typeof row === "object" && !indexById.has(row.id)) indexById.set(row.id, row);
  }

  const drifted = [];
  for (const event of events) {
    const row = indexById.get(event.id);
    if (!row) continue;
    const diffs = rowDifferences(indexRowFor(event), row);
    if (diffs.length) drifted.push(`${event.id} — ${diffs.join("; ")}`);
  }
  if (drifted.length) {
    failures.push(`stale field value(s): ${sample(drifted, 2)}`);
  }

  // Order is part of the contract. It used to be load-bearing for what a
  // visitor saw — public/ttc-home.js truncated in file order — and that was
  // fixed at the source on 2026-09-14 by sorting there, as public/app.js
  // already did. The check stays a failure on different grounds: this file is
  // generated, so rows in an order the generator would not produce mean
  // something else wrote it, exactly as a stale value would.
  if (!failures.length) {
    const masterOrder = events.map((event) => event.id);
    const indexOrder = index.map((row) => row.id);
    const firstDivergence = masterOrder.findIndex((id, i) => id !== indexOrder[i]);
    if (firstDivergence !== -1) {
      failures.push(
        `rows are in a different order from events.json (first at position ${firstDivergence + 1}: ` +
          `events.json has ${masterOrder[firstDivergence]}, index has ${indexOrder[firstDivergence]})`,
      );
    }
  }

  return { failures, warnings };
}

// ── Self-test ─────────────────────────────────────────────────────────────────
//
// Runs before any repository data is read, so it exercises the comparison on
// fixtures alone and cannot be made to pass or fail by the current contents of
// public/data/.

function selfTest() {
  const failures = [];
  const check = (name, condition) => {
    if (!condition) failures.push(name);
  };

  const event = (id, overrides = {}) => ({
    id,
    artist_slug: "test-artist",
    artist_name: "Test Artist",
    country: "United States",
    city: "Austin",
    venue: "Moody Center",
    datetime_iso: "2026-11-02T02:00:00Z",
    timezone: "America/Chicago",
    status: "announced",
    // Not an indexed field: present on the event, never expected in a row.
    verification_status: "human_verified",
    ...overrides,
  });

  const events = [event("evt-1"), event("evt-2", { city: "Dallas" })];
  const cleanIndex = events.map(indexRowFor);

  const clean = compareEventsIndex(events, cleanIndex);
  check("a matching index passes", clean.failures.length === 0 && clean.warnings.length === 0);
  check(
    "the projection drops fields the index does not carry",
    !("verification_status" in cleanIndex[0]),
  );

  const missing = compareEventsIndex(events, [cleanIndex[0]]);
  check("a row missing from the index fails", missing.failures.some((f) => f.includes("missing from the index")));
  check("a short index reports the count", missing.failures.some((f) => f.includes("count mismatch")));

  const extra = compareEventsIndex(events, [...cleanIndex, indexRowFor(event("evt-3"))]);
  check("a row the master does not have fails", extra.failures.some((f) => f.includes("but not in events.json")));

  const duplicated = compareEventsIndex(events, [...cleanIndex, cleanIndex[0]]);
  check(
    "a duplicated row fails",
    duplicated.failures.some((f) => f.includes("carried a different number of times")),
  );

  const staleValue = compareEventsIndex(events, [{ ...cleanIndex[0], venue: "Old Venue" }, cleanIndex[1]]);
  check("a stale field value fails", staleValue.failures.some((f) => f.includes("venue:")));

  const addedKey = compareEventsIndex(events, [{ ...cleanIndex[0], tour_name: "Invented Tour" }, cleanIndex[1]]);
  check(
    "a field the event does not have fails",
    addedKey.failures.some((f) => f.includes("present in index but not in the event")),
  );

  const droppedKey = compareEventsIndex(events, [(({ venue, ...rest }) => rest)(cleanIndex[0]), cleanIndex[1]]);
  check(
    "a field dropped from the row fails",
    droppedKey.failures.some((f) => f.includes("missing from index row")),
  );

  const unknownKey = compareEventsIndex(events, [{ ...cleanIndex[0], price_from: 42 }, cleanIndex[1]]);
  check("an unknown field fails", unknownKey.failures.some((f) => f.includes("unknown field price_from")));

  const notArray = compareEventsIndex(events, { rows: cleanIndex });
  check("a non-array index fails", notArray.failures.some((f) => f.includes("does not contain a JSON array")));

  const reordered = compareEventsIndex(events, [cleanIndex[1], cleanIndex[0]]);
  check("a reordered index fails", reordered.failures.some((f) => f.includes("different order")));

  if (failures.length) {
    console.error(`[validate-partitions] self-test: ${failures.length} failure(s)`);
    for (const failure of failures) console.error(`  - ${failure}`);
    return 1;
  }
  console.log("[validate-partitions] self-test: all assertions passed");
  return 0;
}

if (process.argv.includes("--self-test")) {
  process.exit(selfTest());
}

// ── Load source files ──────────────────────────────────────────────────────────

const events = JSON.parse(readFileSync(EVENTS_PATH, "utf8"));
const artists = JSON.parse(readFileSync(ARTISTS_PATH, "utf8"));

if (!Array.isArray(events)) {
  console.error("FATAL: events.json does not contain a JSON array");
  process.exit(2);
}
if (!Array.isArray(artists)) {
  console.error("FATAL: artists.json does not contain a JSON array");
  process.exit(2);
}

// ── Group master event IDs by artist_slug ──────────────────────────────────────

/** @type {Map<string, string[]>} */
const masterBySlug = new Map();
for (const event of events) {
  const slug = (event.artist_slug || "").trim().toLowerCase();
  if (!slug) continue;
  if (!masterBySlug.has(slug)) masterBySlug.set(slug, []);
  masterBySlug.get(slug).push(event.id);
}

// ── Collect partition files on disk ───────────────────────────────────────────

const partitionFiles = existsSync(PARTITIONS_DIR)
  ? readdirSync(PARTITIONS_DIR).filter((f) => f.endsWith(".json"))
  : [];
const partitionSlugsOnDisk = new Set(partitionFiles.map((f) => f.replace(/\.json$/, "")));

// ── Validate each slug that has events in the master ──────────────────────────

const failures = [];
const warnings = [];

/** @type {Array<{slug: string, status: string, count?: number, reason?: string}>} */
const partitionResults = [];

for (const [slug, masterIds] of masterBySlug) {
  const partitionPath = join(PARTITIONS_DIR, `${slug}.json`);

  if (!existsSync(partitionPath)) {
    const msg = `missing partition file: ${slug}.json (master has ${masterIds.length} event(s))`;
    failures.push(msg);
    partitionResults.push({ slug, status: "FAIL", reason: "missing partition file", masterCount: masterIds.length });
    continue;
  }

  let partitionEvents;
  try {
    partitionEvents = JSON.parse(readFileSync(partitionPath, "utf8"));
  } catch (err) {
    const msg = `invalid JSON in ${slug}.json — ${err.message}`;
    failures.push(msg);
    partitionResults.push({ slug, status: "FAIL", reason: `invalid JSON: ${err.message}` });
    continue;
  }

  if (!Array.isArray(partitionEvents)) {
    const msg = `${slug}.json does not contain a JSON array`;
    failures.push(msg);
    partitionResults.push({ slug, status: "FAIL", reason: "not a JSON array" });
    continue;
  }

  const partitionIds = partitionEvents.map((e) => e.id);
  const masterSet = new Set(masterIds);
  const partitionSet = new Set(partitionIds);

  const missingFromPartition = masterIds.filter((id) => !partitionSet.has(id));
  const extraInPartition = partitionIds.filter((id) => !masterSet.has(id));

  const issues = [];
  if (masterIds.length !== partitionIds.length) {
    issues.push(`count mismatch: master=${masterIds.length} partition=${partitionIds.length}`);
  }
  if (missingFromPartition.length > 0) {
    const sample = missingFromPartition.slice(0, 3).join(", ");
    const more = missingFromPartition.length > 3 ? ` … (+${missingFromPartition.length - 3} more)` : "";
    issues.push(`missing from partition: ${sample}${more}`);
  }
  if (extraInPartition.length > 0) {
    const sample = extraInPartition.slice(0, 3).join(", ");
    const more = extraInPartition.length > 3 ? ` … (+${extraInPartition.length - 3} more)` : "";
    issues.push(`extra in partition: ${sample}${more}`);
  }

  if (issues.length > 0) {
    const msg = `${slug}.json — ${issues.join("; ")}`;
    failures.push(msg);
    partitionResults.push({ slug, status: "FAIL", reason: issues.join("; "), masterCount: masterIds.length, partitionCount: partitionIds.length });
  } else {
    partitionResults.push({ slug, status: "PASS", count: masterIds.length });
  }
}

// ── Check for orphan partition files ──────────────────────────────────────────

for (const slug of partitionSlugsOnDisk) {
  if (!masterBySlug.has(slug)) {
    warnings.push(`orphan partition: ${slug}.json exists on disk but has no matching events in events.json`);
    partitionResults.push({ slug, status: "WARN", reason: "orphan — no events in master" });
  }
}

// ── Zero-event warnings for indexable artists ─────────────────────────────────

const zeroEventWarnings = [];
for (const artist of artists) {
  if (artist.indexing_status !== "indexable_with_substantial_content") continue;
  const slug = artist.slug;
  const count = masterBySlug.has(slug) ? masterBySlug.get(slug).length : 0;
  if (count === 0) {
    zeroEventWarnings.push(`${artist.name} (${slug}) — indexing_status=indexable_with_substantial_content but 0 events in events.json`);
  }
}

// ── Validate the flat search index ────────────────────────────────────────────

const indexFailures = [];
const indexWarnings = [];

if (!existsSync(INDEX_PATH)) {
  indexFailures.push("the file is missing");
} else {
  let indexRows;
  try {
    indexRows = JSON.parse(readFileSync(INDEX_PATH, "utf8"));
  } catch (err) {
    indexFailures.push(`invalid JSON — ${err.message}`);
  }
  if (indexRows !== undefined) {
    const result = compareEventsIndex(events, indexRows);
    indexFailures.push(...result.failures);
    indexWarnings.push(...result.warnings);
  }
}

failures.push(...indexFailures.map((f) => `events-index.json — ${f}`));
warnings.push(...indexWarnings);

// ── Render output ──────────────────────────────────────────────────────────────

const PASS = "PASS";
const FAIL = "FAIL";
const WARN = "WARN";

const PAD = 6;
const label = (s) => s.padEnd(PAD);

console.log("\n=== Partition Sync Validation ===\n");

// Sort: FAIL first, then WARN, then PASS
const order = { FAIL: 0, WARN: 1, PASS: 2 };
partitionResults.sort((a, b) => (order[a.status] ?? 3) - (order[b.status] ?? 3));

for (const r of partitionResults) {
  if (r.status === PASS) {
    console.log(`  ${label(PASS)} ${r.slug}  (${r.count} events)`);
  } else if (r.status === FAIL) {
    console.log(`  ${label(FAIL)} ${r.slug}  — ${r.reason}`);
  } else {
    console.log(`  ${label(WARN)} ${r.slug}  — ${r.reason}`);
  }
}

if (zeroEventWarnings.length > 0) {
  console.log("\n=== Zero-Event Warnings (indexable artists with no events) ===\n");
  for (const w of zeroEventWarnings) {
    console.log(`  ${label(WARN)} ${w}`);
  }
  console.log();
  console.log(
    "  These are informational. Run the partition script after verified events are added.",
  );
}

console.log("\n=== Events Index Validation ===\n");
if (indexFailures.length === 0 && indexWarnings.length === 0) {
  console.log(`  ${label(PASS)} events-index.json  (${events.length} rows match events.json)`);
} else {
  for (const f of indexFailures) console.log(`  ${label(FAIL)} ${f}`);
  for (const w of indexWarnings) console.log(`  ${label(WARN)} ${w}`);
  if (indexFailures.length > 0) {
    console.log("\n  Regenerate rather than editing the file: npm run events:partition");
  }
}

if (failures.length > 0 || warnings.length > 0) {
  console.log("\n=== Summary of Issues ===\n");
  for (const f of failures) console.log(`  [FAIL] ${f}`);
  for (const w of warnings) console.log(`  [WARN] ${w}`);
}

const totalEvents = events.length;
const passCount = partitionResults.filter((r) => r.status === PASS).length;
const failCount = failures.length;
const warnCount = warnings.length + zeroEventWarnings.length;

console.log();
console.log(`Total events in master: ${totalEvents}`);
console.log(`Partitions checked:     ${masterBySlug.size}`);
console.log();

if (failCount > 0) {
  console.log(
    `RESULT: FAIL — ${failCount} partition error(s), ${warnCount} warning(s), ${passCount} partition(s) passed`,
  );
  process.exit(1);
} else {
  console.log(
    `RESULT: PASS — 0 partition errors, ${warnCount} warning(s), ${passCount} partition(s) passed`,
  );
  process.exit(0);
}
