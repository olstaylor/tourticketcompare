#!/usr/bin/env node
//
// Proposes the next staged event-page indexing batch (owner decision
// 2026-10-09: widen event-page indexing beyond the 30-page pilot in staged,
// reviewed batches). Read-only: prints the proposed members and the selection
// facts; adding a batch is a reviewed PR that copies the keys into
// EVENT_INDEXING_BATCHES (functions/_event-indexing-batches.js) and the
// record into data/event-indexing-batches.json.
//
// A batch is stricter than eligibility (eventIndexabilityDecision), so the
// first pages Google sees are the strongest ones:
//
//   - eligible today under the event-page indexability policy;
//   - not already in the pilot or an earlier batch;
//   - no needs_recheck anywhere in the record;
//   - every date-bearing provider URL names the event's venue-local date;
//   - at least BATCH_MIN_DAYS_OUT days away, so the page lives long enough to
//     be crawled and measured;
//   - at most --per-artist pages per artist (default 6), single-date
//     artist-city cases first (where an event page adds most), then most
//     destinations, most snapshot-ready lanes, soonest date.
//
// Usage:
//   node scripts/select-event-indexing-batch.mjs [--size 200] [--per-artist 6] [--json]

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { deriveEventIndexability, eventArtistCityRelation, EVENT_INDEXING_PILOT_KEYS } from "../functions/_event-indexability.js";
import { EVENT_INDEXING_BATCHES } from "../functions/_event-indexing-batches.js";
import { resolveEventLocalDate } from "../functions/_event-local-date.js";
import { normalizeCountry } from "../functions/_cities.js";
import { providerConfiguredTest, publishableLaneSlugs } from "./lib/event-link-coverage.mjs";

export const BATCH_MIN_DAYS_OUT = 21;
const DAY_MS = 86400000;
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/**
 * Every date an URL in the record spells out. Each entry is the set of
 * YYYY-MM-DD readings of one spelled date: "7-17-2026" has one reading, while
 * "1-4-2027" (US month-first or European day-first, both used by approved
 * lanes) has two.
 *
 * @returns {string[][]}
 */
export function urlDates(event) {
  const urls = [];
  const walk = (value, key = "") => {
    if (typeof value === "string") {
      if (/^https?:\/\//.test(value) && /url$/i.test(key)) urls.push(value);
    } else if (value && typeof value === "object") {
      for (const [k, v] of Object.entries(value)) walk(v, Array.isArray(value) ? key : k);
    }
  };
  walk(event);
  const pad = (n) => String(n).padStart(2, "0");
  const valid = (y, m, d) => Number(m) >= 1 && Number(m) <= 12 && Number(d) >= 1 && Number(d) <= 31;
  const read = (y, m, d) => (valid(y, m, d) ? [`${y}-${pad(m)}-${pad(d)}`] : []);
  const found = [];
  for (const url of new Set(urls)) {
    for (const m of url.matchAll(/(?<![\d])(20\d\d)-(\d{1,2})-(\d{1,2})(?![\d])/g)) found.push(read(m[1], m[2], m[3]));
    for (const m of url.matchAll(/(?<![\d])(\d{1,2})-(\d{1,2})-(20\d\d)(?![\d])/g)) found.push([...new Set([...read(m[3], m[1], m[2]), ...read(m[3], m[2], m[1])])]);
    for (const m of url.matchAll(/(?<![a-z])(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*-(\d{1,2})-(20\d\d)(?![\d])/gi)) found.push(read(m[3], MONTHS.indexOf(m[1].toLowerCase()) + 1, m[2]));
  }
  return found.filter((readings) => readings.length);
}

export function selectBatch({ events, artists, catalog, now = Date.now(), size = 200, perArtist = 6, excludedKeys = [] }) {
  const isConfigured = providerConfiguredTest(catalog);
  const excluded = new Set(excludedKeys);
  const byId = new Map(events.map((event) => [String(event.id).trim(), event]));
  const decisions = deriveEventIndexability(events, artists, { lanesFor: (event) => publishableLaneSlugs(event, isConfigured, now), now });
  const eligible = decisions.filter((decision) => decision.eligible);
  const rows = [];
  const skipped = { already_indexed: 0, needs_recheck: 0, url_date_mismatch: 0, too_soon: 0 };
  for (const decision of eligible) {
    const event = byId.get(decision.id);
    if (excluded.has(decision.key)) { skipped.already_indexed++; continue; }
    if (JSON.stringify(event).includes("needs_recheck")) { skipped.needs_recheck++; continue; }
    const localDate = resolveEventLocalDate(event).iso;
    if (urlDates(event).some((readings) => !readings.includes(localDate))) { skipped.url_date_mismatch++; continue; }
    const daysOut = Math.floor((Date.parse(event.datetime_iso) - now) / DAY_MS);
    if (daysOut < BATCH_MIN_DAYS_OUT) { skipped.too_soon++; continue; }
    rows.push({ decision, event, localDate, daysOut, relation: eventArtistCityRelation(events, event, { now }) });
  }
  rows.sort(
    (a, b) =>
      Number(a.relation !== "noindex_single_date") - Number(b.relation !== "noindex_single_date") ||
      b.decision.inputs.destinationCount - a.decision.inputs.destinationCount ||
      b.decision.inputs.snapshotReadyLanes.length - a.decision.inputs.snapshotReadyLanes.length ||
      a.daysOut - b.daysOut ||
      a.decision.key.localeCompare(b.decision.key)
  );
  const perArtistCount = new Map();
  const members = [];
  for (const row of rows) {
    const artist = row.event.artist_slug;
    if ((perArtistCount.get(artist) || 0) >= perArtist) continue;
    perArtistCount.set(artist, (perArtistCount.get(artist) || 0) + 1);
    members.push(row);
    if (members.length >= size) break;
  }
  return {
    eligible: eligible.length,
    pool: rows.length,
    skipped,
    members: members.map(({ decision, event, localDate, daysOut, relation }) => ({
      key: decision.key,
      event_id: decision.id,
      canonical_path: decision.path,
      artist_slug: event.artist_slug,
      venue: event.venue,
      city: event.city,
      country: normalizeCountry(event.country),
      local_date: localDate,
      artist_city: relation === "noindex_single_date" ? "single_date" : "multi_date",
      destinations: decision.inputs.destinationCount,
      snapshot_ready_lanes: decision.inputs.snapshotReadyLanes.length,
      days_out_at_selection: daysOut
    }))
  };
}

function main() {
  const arg = (name, fallback) => {
    const index = process.argv.indexOf(name);
    return index > 0 ? Number(process.argv[index + 1]) : fallback;
  };
  const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(ROOT, relative), "utf8"));
  const result = selectBatch({
    events: readJson("public/data/events.json"),
    artists: readJson("public/data/artists.json"),
    catalog: readJson("public/data/catalog.json"),
    size: arg("--size", 200),
    perArtist: arg("--per-artist", 6),
    excludedKeys: [...EVENT_INDEXING_PILOT_KEYS, ...EVENT_INDEXING_BATCHES.flatMap((batch) => batch.keys)]
  });
  if (process.argv.includes("--json")) return console.log(JSON.stringify(result, null, 2));
  const tally = (key) => result.members.reduce((acc, m) => ({ ...acc, [m[key]]: (acc[m[key]] || 0) + 1 }), {});
  console.log(`Eligible ${result.eligible} · selectable ${result.pool} · skipped ${JSON.stringify(result.skipped)}`);
  console.log(`Proposed ${result.members.length} pages across ${new Set(result.members.map((m) => m.artist_slug)).size} artists`);
  console.log(`  artist-city ${JSON.stringify(tally("artist_city"))} · countries ${JSON.stringify(tally("country"))}`);
  for (const m of result.members) console.log(`  ${m.key} ${m.canonical_path} [${m.destinations} dest, ${m.snapshot_ready_lanes} snap, ${m.days_out_at_selection}d]`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
