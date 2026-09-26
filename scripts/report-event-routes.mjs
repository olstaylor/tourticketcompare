#!/usr/bin/env node
//
// Read-only diagnostic for the event identity foundation (functions/_event-pages.js).
// Reports, for the current events.json: stable-key uniqueness, venue-local
// date coverage, which events could structurally carry a future event route
// and why the rest could not, the preview-only indexability signals, the
// non-performance listings, and possible duplicate listings.
//
// Every figure comes from functions/_event-pages.js; per-event publishable
// destination lanes come from scripts/lib/event-link-coverage.mjs, the offline
// mirror of the runtime CTA gate. Writes nothing and serves nothing — there is
// no event route yet.
//
// Usage:
//   node scripts/report-event-routes.mjs          # human-readable summary
//   node scripts/report-event-routes.mjs --json   # machine-readable

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildEventKeyIndex,
  deriveEventRouteStates,
  eventIndexSignals,
  possibleDuplicateGroups,
  previewEventIndexability
} from "../functions/_event-pages.js";
import { artistPageIndexable } from "../functions/_artist-indexability.js";
import { providerConfiguredTest, publishableLaneSlugs } from "./lib/event-link-coverage.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(ROOT, relative), "utf8"));

const events = readJson("public/data/events.json");
const artists = readJson("public/data/artists.json");
const catalog = readJson("public/data/catalog.json");
const now = Date.now();
// Catalog provider flags only, as in the deployed environment
// (see providerConfiguredTest).
const isConfigured = providerConfiguredTest(catalog);

const tally = (values) => values.reduce((counts, value) => ({ ...counts, [value]: (counts[value] || 0) + 1 }), {});

const index = buildEventKeyIndex(events);
const states = deriveEventRouteStates(events, artists, { now });
const artistBySlug = new Map(artists.map((artist) => [artist.slug, artist]));
const eventById = new Map(events.map((event) => [String(event.id).trim(), event]));
const upcoming = states.filter((state) => state.upcoming);
const renderable = states.filter((state) => state.renderable);

const preview = renderable.map((state) => {
  const event = eventById.get(state.id);
  const signals = eventIndexSignals(event, { publishableLanes: publishableLaneSlugs(event, isConfigured), now });
  const verdict = previewEventIndexability(state, signals, {
    artistPageIndexable: artistPageIndexable(artistBySlug.get(state.artistSlug), events, state.artistSlug, now)
  });
  return { state, signals, verdict };
});

const report = {
  generated_at: new Date(now).toISOString(),
  events: events.length,
  keys: {
    unique: index.byKey.size,
    collisions: [...index.collisions].map(([key, ids]) => ({ key, ids })),
    duplicate_ids: index.duplicateIds
  },
  local_date: {
    resolved: states.filter((state) => state.localDate).length,
    unresolved_by_reason: tally(states.filter((state) => !state.localDate).map((state) => state.localDateReason)),
    upcoming_unresolved: upcoming.filter((state) => !state.localDate).map((state) => state.id)
  },
  upcoming: upcoming.length,
  renderable: renderable.length,
  upcoming_not_renderable_by_reason: tally(upcoming.filter((state) => !state.renderable).flatMap((state) => state.reasons)),
  preview_only_indexability: {
    would_qualify: preview.filter((entry) => entry.verdict.wouldQualify).length,
    excluded_by_reason: tally(preview.flatMap((entry) => entry.verdict.reasons)),
    publishable_destinations_distribution: tally(preview.map((entry) => entry.signals.publishableDestinations))
  },
  non_performance_upcoming: upcoming
    .filter((state) => state.nonPerformance.length)
    .map((state) => ({ id: state.id, markers: state.nonPerformance, event_name: eventById.get(state.id)?.event_name || "" })),
  possible_duplicates_upcoming: possibleDuplicateGroups(states, events)
};

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(report, null, 2));
} else {
  const lines = [
    `Event routes — ${report.generated_at} (read-only; no event route is served)`,
    "",
    `Events: ${report.events}`,
    `Stable keys: ${report.keys.unique} unique · ${report.keys.collisions.length} collisions · ${report.keys.duplicate_ids.length} duplicate ids`,
    `Venue-local date: ${report.local_date.resolved} resolved · unresolved ${JSON.stringify(report.local_date.unresolved_by_reason)} · upcoming unresolved ${report.local_date.upcoming_unresolved.length}`,
    `Upcoming: ${report.upcoming} · structurally renderable: ${report.renderable}`,
    `Upcoming but not renderable, by reason: ${JSON.stringify(report.upcoming_not_renderable_by_reason)}`,
    "",
    "Preview only — not read by the router, sitemap, llms.txt or robots:",
    `  would qualify (≥2 publishable destinations, ≥1 snapshot-ready lane, artist page indexable, not a non-performance listing): ${report.preview_only_indexability.would_qualify} of ${report.renderable}`,
    `  exclusions: ${JSON.stringify(report.preview_only_indexability.excluded_by_reason)}`,
    `  publishable destinations per renderable event: ${JSON.stringify(report.preview_only_indexability.publishable_destinations_distribution)}`,
    "",
    `Non-performance listings (upcoming): ${report.non_performance_upcoming.length}`,
    ...report.non_performance_upcoming.map((row) => `  ${row.id} [${row.markers.join(", ")}] ${row.event_name}`),
    "",
    `Possible duplicate listings (same artist, city and venue-local date, upcoming): ${report.possible_duplicates_upcoming.length}`,
    ...report.possible_duplicates_upcoming.map((group) => `  ${group.artistSlug} · ${group.city} · ${group.localDate}: ${group.ids.join(", ")}`)
  ];
  if (report.keys.collisions.length || report.keys.duplicate_ids.length) {
    lines.push("", "KEY PROBLEMS — resolution fails closed for these:", ...report.keys.collisions.map((c) => `  ${c.key}: ${c.ids.join(", ")}`), ...report.keys.duplicate_ids.map((id) => `  duplicate id: ${id}`));
  }
  console.log(lines.join("\n"));
}
