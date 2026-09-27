#!/usr/bin/env node
//
// Read-only diagnostic for the event identity foundation (functions/_event-pages.js).
// Reports, for the current events.json: stable-key uniqueness, venue-local
// date coverage, what the live /events/* router does with each upcoming
// event's canonical path (resolveEventRoute: render, 301 or 404, and why),
// which served pages may carry a MusicEvent node and with which status
// (eventPageSchemaDecision), the non-performance listings, and — the factual
// source for choosing indexing-pilot events — the event-page indexability
// policy (eventIndexabilityDecision in functions/_event-indexability.js):
// eligible and ineligible counts, every exclusion reason, the destination and
// snapshot-ready distributions, the classified duplicate groups, each
// eligible page's artist-city relationship and expiry horizon, and the
// strongest pilot candidates.
//
// Every figure comes from functions/_event-pages.js and
// functions/_event-indexability.js; per-event publishable destination lanes
// come from scripts/lib/event-link-coverage.mjs, the offline mirror of the
// runtime CTA gate. Writes nothing. Eligible is not indexed: every served
// event page is noindex,follow until the rollout gate
// (eventPageIndexingDecision) is switched on for a pilot.
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
  eventPageSchemaDecision,
  resolveEventRoute,
  EVENT_ROUTE_ACTION
} from "../functions/_event-pages.js";
import {
  EVENT_INDEXING_PILOT_KEYS,
  EVENT_MIN_PUBLISHABLE_DESTINATIONS,
  EVENT_MIN_SNAPSHOT_READY_LANES,
  deriveEventDuplicateGroups,
  deriveEventIndexability,
  eventArtistCityRelation,
  eventPageIndexingDecision
} from "../functions/_event-indexability.js";
import { normalizeCountry } from "../functions/_cities.js";
import { providerConfiguredTest, publishableLaneSlugs } from "./lib/event-link-coverage.mjs";
import { wranglerVars } from "./lib/event-indexability-audit.mjs";

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
const eventById = new Map(events.map((event) => [String(event.id).trim(), event]));
const upcoming = states.filter((state) => state.upcoming);
const renderable = states.filter((state) => state.renderable);

// What the router does with each upcoming event's own canonical path — the
// same decision a request would get, not a re-derivation of it. An event with
// no path (no key or no venue-local date) cannot be requested at all.
const decisions = upcoming.map((state) => {
  if (!state.path) return { state, action: EVENT_ROUTE_ACTION.NOT_FOUND, reason: state.addressReasons[0] || "no_path" };
  const decision = resolveEventRoute(events, artists, state.path, { now });
  return { state, action: decision.action, reason: decision.reason };
});
const byAction = (action) => decisions.filter((entry) => entry.action === action);
const served = byAction(EVENT_ROUTE_ACTION.RENDER);

// Structured data on each served page, by the module's decision. The renderer
// additionally withholds the node when the stored offset and zone disagree on
// the visible date; scripts/validate-route-schema.mjs counts the rendered nodes.
const schema = served.map((entry) => eventPageSchemaDecision(eventById.get(entry.state.id), { now }));

// The indexability policy for every record. Summarised over the served pages:
// a page that does not serve is ineligible by definition (not_addressable).
const policyDecisions = deriveEventIndexability(events, artists, { lanesFor: (event) => publishableLaneSlugs(event, isConfigured, now), now });
const decisionById = new Map(policyDecisions.map((decision) => [decision.id, decision]));
const servedDecisions = served.map((entry) => decisionById.get(entry.state.id));
const eligible = servedDecisions.filter((decision) => decision.eligible);
// What the rollout gate would index with the repo-managed flags. The rendered
// robots meta is checked by npm run audit:indexable-surface:check.
const deployedVars = wranglerVars(fs.readFileSync(path.join(ROOT, "wrangler.toml"), "utf8"));
const rolloutIndexable = servedDecisions.filter((decision) => eventPageIndexingDecision(decision, deployedVars).indexable);
const DAY_MS = 86400000;
const daysAway = (decision) => (Date.parse(eventById.get(decision.id)?.datetime_iso || "") - now) / DAY_MS;
const bucket = (count) => (count >= 4 ? "4+" : String(count));
const relationOf = (decision) => eventArtistCityRelation(events, eventById.get(decision.id), { now });
const eligibleRelations = eligible.map((decision) => ({ decision, relation: relationOf(decision) }));
const duplicateGroups = deriveEventDuplicateGroups(events).filter((group) =>
  group.ids.some((id) => decisionById.get(id)?.inputs.upcoming)
);

// Pilot candidates: the strongest eligible pages, spread across artists — most
// destinations, then most snapshot-ready lanes, then soonest beyond 30 days
// (a pilot page should live long enough to be crawled and measured), one per
// artist, single-date cities first because that is where an event page adds
// most. A shortlist for a human to choose from, nothing more.
const candidates = [];
const seenArtists = new Set();
const ranked = eligibleRelations
  .filter(({ decision }) => daysAway(decision) > 30)
  .sort(
    (a, b) =>
      b.decision.inputs.destinationCount - a.decision.inputs.destinationCount ||
      b.decision.inputs.snapshotReadyLanes.length - a.decision.inputs.snapshotReadyLanes.length ||
      Number(a.relation !== "noindex_single_date") - Number(b.relation !== "noindex_single_date") ||
      daysAway(a.decision) - daysAway(b.decision) ||
      a.decision.id.localeCompare(b.decision.id)
  );
for (const entry of ranked) {
  const artist = eventById.get(entry.decision.id)?.artist_slug;
  if (seenArtists.has(artist)) continue;
  seenArtists.add(artist);
  candidates.push(entry);
  if (candidates.length === 20) break;
}

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
  routing: {
    served_noindex: served.length,
    served_commercially_live: served.filter((entry) => entry.state.commerciallyLive).length,
    served_held: served.filter((entry) => entry.state.held).length,
    served_pre_onsale: served.filter((entry) => !entry.state.held && !entry.state.commerciallyLive && entry.state.onsalePending).length,
    redirect_by_reason: tally(byAction(EVENT_ROUTE_ACTION.REDIRECT).map((entry) => entry.reason)),
    not_found_by_reason: tally(byAction(EVENT_ROUTE_ACTION.NOT_FOUND).map((entry) => entry.reason))
  },
  structured_data: {
    served_with_node: schema.filter((decision) => decision.eligible).length,
    by_status: tally(schema.filter((decision) => decision.eligible).map((decision) => decision.eventStatus.replace("https://schema.org/", ""))),
    served_without_node_by_reason: tally(schema.filter((decision) => !decision.eligible).map((decision) => decision.reason))
  },
  indexability: {
    policy: {
      min_publishable_destinations: EVENT_MIN_PUBLISHABLE_DESTINATIONS,
      min_snapshot_ready_lanes: EVENT_MIN_SNAPSHOT_READY_LANES,
      requires_event_schema: true
    },
    served: served.length,
    rollout_flag: deployedVars.EVENT_PAGES_INDEXING || "",
    pilot_keys: EVENT_INDEXING_PILOT_KEYS.length,
    rollout_indexable: rolloutIndexable.length,
    eligible: eligible.length,
    ineligible: served.length - eligible.length,
    eligible_share_of_served: served.length ? Number((eligible.length / served.length).toFixed(4)) : 0,
    eligible_artists: new Set(eligible.map((decision) => eventById.get(decision.id)?.artist_slug)).size,
    served_artists: new Set(served.map((entry) => entry.state.artistSlug)).size,
    // Every failed condition is counted, so a page can appear under several.
    served_excluded_by_reason: tally(servedDecisions.flatMap((decision) => decision.reasons)),
    served_without_schema_by_reason: tally(servedDecisions.filter((decision) => !decision.inputs.schemaEligible).map((decision) => decision.inputs.schemaReason)),
    served_destinations: tally(servedDecisions.map((decision) => bucket(decision.inputs.destinationCount))),
    served_snapshot_ready_lanes: tally(servedDecisions.map((decision) => bucket(decision.inputs.snapshotReadyLanes.length))),
    eligible_destinations: tally(eligible.map((decision) => bucket(decision.inputs.destinationCount))),
    eligible_snapshot_ready_lanes: tally(eligible.map((decision) => bucket(decision.inputs.snapshotReadyLanes.length))),
    eligible_by_snapshot_lane: tally(eligible.flatMap((decision) => decision.inputs.snapshotReadyLanes)),
    eligible_by_lifecycle: tally(eligible.map((decision) => decision.inputs.lifecycle)),
    eligible_by_artist_city: tally(eligibleRelations.map((entry) => entry.relation)),
    eligible_within_days: {
      30: eligible.filter((decision) => daysAway(decision) <= 30).length,
      90: eligible.filter((decision) => daysAway(decision) <= 90).length,
      180: eligible.filter((decision) => daysAway(decision) <= 180).length
    },
    eligible_by_country: Object.fromEntries(
      Object.entries(tally(eligible.map((decision) => normalizeCountry(eventById.get(decision.id)?.country) || "(none)"))).sort((a, b) => b[1] - a[1])
    ),
    duplicate_groups: duplicateGroups.map((group) => ({
      kind: group.kind,
      key: group.key,
      classification: group.classification,
      ids: group.ids,
      excluded_ids: group.excludedIds,
      evidence: group.evidence
    })),
    duplicate_excluded_served: servedDecisions.filter((decision) => decision.reasons.includes("duplicate_ambiguity")).map((decision) => decision.id),
    pilot_candidates: candidates.map(({ decision, relation }) => ({
      id: decision.id,
      key: decision.key,
      path: decision.path,
      destinations: decision.inputs.publishableLanes,
      snapshot_ready: decision.inputs.snapshotReadyLanes,
      artist_city: relation,
      days_away: Math.floor(daysAway(decision))
    }))
  },
  non_performance_upcoming: upcoming
    .filter((state) => state.nonPerformance.length)
    .map((state) => ({ id: state.id, markers: state.nonPerformance, event_name: eventById.get(state.id)?.event_name || "" })),
};

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(report, null, 2));
} else {
  const ix = report.indexability;
  const lines = [
    `Event routes — ${report.generated_at} (read-only; every served event page is noindex,follow)`,
    "",
    `Events: ${report.events}`,
    `Stable keys: ${report.keys.unique} unique · ${report.keys.collisions.length} collisions · ${report.keys.duplicate_ids.length} duplicate ids`,
    `Venue-local date: ${report.local_date.resolved} resolved · unresolved ${JSON.stringify(report.local_date.unresolved_by_reason)} · upcoming unresolved ${report.local_date.upcoming_unresolved.length}`,
    `Upcoming: ${report.upcoming} · structurally renderable: ${report.renderable}`,
    `Upcoming but not renderable, by reason: ${JSON.stringify(report.upcoming_not_renderable_by_reason)}`,
    "",
    "Live /events/* routing of each upcoming event's canonical path:",
    `  served (200, noindex): ${report.routing.served_noindex} · commercially live ${report.routing.served_commercially_live} · held ${report.routing.served_held} · pre-on-sale ${report.routing.served_pre_onsale}`,
    `  301 to parent, by reason: ${JSON.stringify(report.routing.redirect_by_reason)}`,
    `  404, by reason: ${JSON.stringify(report.routing.not_found_by_reason)}`,
    "",
    "Structured data on served pages (noindex; not an indexing count):",
    `  one MusicEvent: ${report.structured_data.served_with_node} ${JSON.stringify(report.structured_data.by_status)} · none, by reason: ${JSON.stringify(report.structured_data.served_without_node_by_reason)}`,
    "",
    "Indexability policy (functions/_event-indexability.js) — eligible, not indexed:",
    `  rollout: EVENT_PAGES_INDEXING ${ix.rollout_flag ? `"${ix.rollout_flag}"` : "unset"} · pilot keys ${ix.pilot_keys} · indexable by the rollout gate ${ix.rollout_indexable}`,
    `  eligible ${ix.eligible} of ${ix.served} served (${(ix.eligible_share_of_served * 100).toFixed(1)}%) · ineligible ${ix.ineligible} · artists ${ix.eligible_artists} of ${ix.served_artists}`,
    `  rule: served 200 · artist page indexable · upcoming · not held · commercially live · genuine performance · valid MusicEvent · ≥${ix.policy.min_publishable_destinations} publishable destinations · ≥${ix.policy.min_snapshot_ready_lanes} snapshot-ready lane · no duplicate ambiguity`,
    `  served exclusions (every failed condition): ${JSON.stringify(ix.served_excluded_by_reason)}`,
    `  served without a MusicEvent, by reason: ${JSON.stringify(ix.served_without_schema_by_reason)}`,
    `  destinations — served ${JSON.stringify(ix.served_destinations)} · eligible ${JSON.stringify(ix.eligible_destinations)}`,
    `  snapshot-ready lanes — served ${JSON.stringify(ix.served_snapshot_ready_lanes)} · eligible ${JSON.stringify(ix.eligible_snapshot_ready_lanes)} · by lane ${JSON.stringify(ix.eligible_by_snapshot_lane)}`,
    `  eligible by lifecycle ${JSON.stringify(ix.eligible_by_lifecycle)} · by artist-city page ${JSON.stringify(ix.eligible_by_artist_city)}`,
    `  eligible events within 30 / 90 / 180 days: ${ix.eligible_within_days[30]} / ${ix.eligible_within_days[90]} / ${ix.eligible_within_days[180]}`,
    `  eligible by country: ${JSON.stringify(ix.eligible_by_country)}`,
    "",
    `Duplicate groups touching an upcoming event: ${ix.duplicate_groups.length} · served pages excluded: ${ix.duplicate_excluded_served.length}`,
    ...ix.duplicate_groups.map((group) => `  [${group.classification}] ${group.key}: ${group.ids.join(", ")}${group.excluded_ids.length ? ` — excluded ${group.excluded_ids.join(", ")}` : " — none excluded"}`),
    "",
    `Pilot candidates (one per artist; >30 days out; most destinations and snapshot lanes first):`,
    ...ix.pilot_candidates.map((row) => `  ${row.key} ${row.path} [${row.destinations.length} destinations, ${row.snapshot_ready.length} snapshot, artist-city ${row.artist_city}, ${row.days_away}d]`),
    "",
    `Non-performance listings (upcoming): ${report.non_performance_upcoming.length}`,
    ...report.non_performance_upcoming.map((row) => `  ${row.id} [${row.markers.join(", ")}] ${row.event_name}`)
  ];
  if (report.keys.collisions.length || report.keys.duplicate_ids.length) {
    lines.push("", "KEY PROBLEMS — resolution fails closed for these:", ...report.keys.collisions.map((c) => `  ${c.key}: ${c.ids.join(", ")}`), ...report.keys.duplicate_ids.map((id) => `  duplicate id: ${id}`));
  }
  console.log(lines.join("\n"));
}
