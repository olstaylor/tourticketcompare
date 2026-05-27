#!/usr/bin/env node
/**
 * validate-partitions.mjs
 *
 * Verifies that every per-artist partition file under public/data/events/<slug>.json
 * is an exact subset match of public/data/events.json for that artist slug.
 *
 * Exit 1 (FAIL) on:
 *   - missing partition file for a slug present in events.json
 *   - extra IDs in a partition (not in master subset)
 *   - missing IDs in a partition (in master but absent from partition)
 *   - event count mismatch
 *   - invalid JSON in a partition file
 *
 * Exit 0 (PASS) with warnings on:
 *   - artist with indexing_status "indexable_with_substantial_content" having zero events
 *   - orphan partition file (partition exists but slug has no events in events.json)
 *
 * Artists with indexing_status "review_required" are excluded from zero-event warnings.
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const EVENTS_PATH = join(ROOT, "public/data/events.json");
const ARTISTS_PATH = join(ROOT, "public/data/artists.json");
const PARTITIONS_DIR = join(ROOT, "public/data/events");

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
