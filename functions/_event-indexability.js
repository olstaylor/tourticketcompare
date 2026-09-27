// @ts-check
// Event-page indexability policy: which individual event pages
// (/events/<slug>-<key>) are strong and safe enough to be indexed.
//
// This module is the one answer to that question. The indexing diagnostic
// (scripts/report-event-routes.mjs), the indexable-surface audit and its tests
// read eventIndexabilityDecision below; the router's robots meta and parent
// MusicEvent identity, the events sitemap and llms.txt read the active pilot
// (deriveEventIndexingPilot, built on the rollout gate
// eventPageIndexingDecision). None of them may restate the policy. It is
// documented in docs/ROUTE_INDEXABILITY_POLICY.md → "Event"; change both
// together.
//
// Four different questions, never to be conflated:
//
//   1. Addressable        the router serves the page (200 at its canonical
//                         path): resolveEventRoute in functions/_event-pages.js.
//   2. Commercially live  ticket links may be shown today: eventRouteState's
//                         `commerciallyLive`.
//   3. Eligible           this policy (eventIndexabilityDecision): the page is
//                         strong and safe enough that it *could* be indexed.
//   4. Indexable          the page actually renders index,follow and is listed
//                         in a sitemap. Eligible AND the rollout allows it
//                         (eventPageIndexingDecision): the flag is "pilot", the
//                         request is on the canonical host, and the stable key
//                         is one of the 30 frozen EVENT_INDEXING_PILOT_KEYS.
//
// Design rules:
//
//   - Stable signals only. Every input is canonical data (events.json,
//     artists.json, the stored provider provenance) or repo configuration.
//     Nothing here reads D1, a cached price, a snapshot's age or a live API,
//     so a cache row expiring, a provider API failing or D1 being unavailable
//     can never flip a page's eligibility. "Snapshot-ready" means the event
//     carries verified provenance on a lane that can produce a TTC-approved
//     listed-price snapshot, not that a price happens to be cached now.
//   - One provider-link derivation. The publishable destination lanes are
//     supplied by the caller from the CTA gate itself (offline:
//     scripts/lib/event-link-coverage.mjs, the mirror of serverShowCtaSpecs),
//     so this module never becomes another copy of the per-provider CTA rules.
//     A missing lane list fails closed.
//   - Every failure is explained. `reasons` lists every failed condition with
//     a stable code from EVENT_INDEXABILITY_REASONS; renaming a code changes a
//     reported figure, so add a new one rather than repurposing an old one.
//   - Deterministic. The same records, lane lists and `now` always give the
//     same answer; the time-dependent conditions (upcoming, public on-sale)
//     change only as the calendar passes a stored instant.

import {
  EVENT_ROUTE_ACTION,
  buildEventKeyIndex,
  eventKey,
  eventPageSchemaDecision,
  eventPath,
  eventRouteState,
  eventSlugPart,
  nonPerformanceMarkers,
  resolveEventRoute
} from "./_event-pages.js";
import { resolveEventLocalDate, eventInstantMs } from "./_event-local-date.js";
import { artistPageIndexable } from "./_artist-indexability.js";
import { PRICE_GUIDE_SNAPSHOT_PROVIDERS, linkVerifiedWithUrl } from "./_price-guides.js";
import { findArtistCity } from "./_artist-cities.js";
import { citySlug, slugify } from "./_cities.js";

// ---------------------------------------------------------------------------
// Thresholds
// ---------------------------------------------------------------------------

// An event page's reason to exist beside its artist page is the comparison of
// independent ticket destinations for exactly this date. One destination is a
// restatement of the card on the parent board.
export const EVENT_MIN_PUBLISHABLE_DESTINATIONS = 2;

// ...and the listed-price snapshot, recorded low and price moves for this date,
// which only a snapshot-capable lane can ever supply.
export const EVENT_MIN_SNAPSHOT_READY_LANES = 1;

// Two same-day listings at the same venue whose start times are at least this
// far apart are two performances (a matinee and an evening show), not one
// performance listed twice. Doors-vs-show-time offsets are well under it.
export const EVENT_DISTINCT_PERFORMANCE_MIN_GAP_MS = 3 * 60 * 60 * 1000;

// ---------------------------------------------------------------------------
// Reasons
// ---------------------------------------------------------------------------

export const EVENT_INDEXABILITY_REASONS = Object.freeze({
  // The canonical path does not serve 200 (404, 301, or no path at all).
  NOT_ADDRESSABLE: "not_addressable",
  // The parent artist page is not itself indexable (artistPageIndexable).
  ARTIST_NOT_INDEXABLE: "artist_not_indexable",
  NOT_UPCOMING: "not_upcoming",
  // Cancelled, postponed or an unrecognised Ticketmaster status.
  LIFECYCLE_HELD: "lifecycle_held",
  // Not held, but no ticket link may be shown (e.g. waiting for the on-sale).
  NOT_COMMERCIALLY_LIVE: "not_commercially_live",
  // An upsell product (premium seats, box, package), not the concert.
  NON_PERFORMANCE: "non_performance",
  // The page may not carry a MusicEvent (pre-on-sale, resale-only, unknown status).
  NO_EVENT_SCHEMA: "no_event_schema",
  BELOW_DESTINATION_THRESHOLD: "below_destination_threshold",
  NO_SNAPSHOT_READY_LANE: "no_snapshot_ready_lane",
  // TTC cannot tell this row apart from another row for the same performance.
  DUPLICATE_AMBIGUITY: "duplicate_ambiguity"
});

// ---------------------------------------------------------------------------
// Duplicate ambiguity
// ---------------------------------------------------------------------------

// How a group of rows that might describe one performance was read.
export const EVENT_DUPLICATE_CLASS = Object.freeze({
  // Every other row in the group is a non-performance listing (already 404).
  // Resolved: the performance row is unambiguous.
  NON_PERFORMANCE_VARIANT: "non_performance_variant",
  // The extra row is an add-on product named "<the performance's name> | …"
  // (a hospitality or lounge package the classifier does not name). Resolved:
  // the performance row is unambiguous; the add-on row is excluded.
  ADD_ON_VARIANT: "add_on_variant",
  // Two or more rows share a start instant or a provider listing: one
  // performance listed more than once. Every row is excluded.
  SAME_PERFORMANCE: "same_performance",
  // Same venue, start times far enough apart, no shared listing: a matinee and
  // an evening show. Resolved: every row is its own performance.
  DISTINCT_PERFORMANCES: "distinct_performances",
  // Anything else. Every row is excluded until the data says otherwise.
  AMBIGUOUS: "ambiguous",
  // Rows on different dates that claim the same resale provider listing: at
  // least one is mapped to the wrong night. Every row is excluded.
  SHARED_PROVIDER_LISTING: "shared_provider_listing"
});

/**
 * @typedef {Object} EventDuplicateGroup
 * @property {string} kind            "same_date" or "shared_provider_listing".
 * @property {string} key             artist|city|venue-local date, or provider:listing id.
 * @property {string} classification  One of EVENT_DUPLICATE_CLASS.
 * @property {string[]} ids           Every row in the group, in events.json order.
 * @property {string[]} excludedIds   The rows this group makes ineligible.
 * @property {{ sameStartInstant: boolean, sharedProviderListing: boolean, sameVenue: boolean, nonPerformanceIds: string[], addOnIds: string[] }} evidence
 */

/**
 * The provider listings a row claims: every verified provider link's event id,
 * plus the Ticketmaster event id. A listing id belongs to exactly one
 * performance, so two rows holding one are the same show or a wrong mapping.
 *
 * @param {any} event
 * @returns {string[]}
 */
function providerListings(event) {
  const listings = [];
  const tm = String(event?.ticketmaster_event_id ?? "").trim();
  if (tm) listings.push(`ticketmaster:${tm}`);
  const links = event?.provider_links && typeof event.provider_links === "object" ? event.provider_links : {};
  for (const [provider, link] of Object.entries(links)) {
    if (provider === "ticketmaster" || link?.verified !== true) continue;
    const id = String(link?.event_id ?? "").trim();
    if (id) listings.push(`${provider}:${id}`);
  }
  return listings;
}

const normalizedName = (event) => String(event?.event_name || "").trim().replace(/\s+/g, " ").toLowerCase();

/**
 * Classify one same-date group (same artist, city and venue-local date).
 *
 * @param {any[]} rows
 * @returns {{ classification: string, excludedIds: string[], evidence: EventDuplicateGroup["evidence"] }}
 */
function classifySameDateGroup(rows) {
  const id = (event) => String(event.id).trim();
  const nonPerformance = rows.filter((event) => nonPerformanceMarkers(event).length);
  const performances = rows.filter((event) => !nonPerformanceMarkers(event).length);
  const names = performances.map(normalizedName);
  const addOns = performances.filter((event, index) =>
    names.some((name, other) => other !== index && name && names[index].startsWith(`${name} |`))
  );
  const base = performances.filter((event) => !addOns.includes(event));
  const instants = base.map((event) => eventInstantMs(event));
  const listingCounts = new Map();
  for (const event of base) for (const listing of new Set(providerListings(event))) listingCounts.set(listing, (listingCounts.get(listing) || 0) + 1);
  const evidence = {
    sameStartInstant: new Set(instants).size < instants.length,
    sharedProviderListing: [...listingCounts.values()].some((count) => count > 1),
    sameVenue: new Set(base.map((event) => slugify(event.venue))).size === 1,
    nonPerformanceIds: nonPerformance.map(id),
    addOnIds: addOns.map(id)
  };
  if (base.length <= 1) {
    return {
      classification: addOns.length ? EVENT_DUPLICATE_CLASS.ADD_ON_VARIANT : EVENT_DUPLICATE_CLASS.NON_PERFORMANCE_VARIANT,
      excludedIds: addOns.map(id),
      evidence
    };
  }
  if (evidence.sameStartInstant || evidence.sharedProviderListing) {
    return { classification: EVENT_DUPLICATE_CLASS.SAME_PERFORMANCE, excludedIds: performances.map(id), evidence };
  }
  const sorted = instants.every((ms) => ms !== null) ? [...instants].sort((a, b) => Number(a) - Number(b)) : [];
  const farApart = sorted.length === base.length && sorted.every((ms, index) => index === 0 || Number(ms) - Number(sorted[index - 1]) >= EVENT_DISTINCT_PERFORMANCE_MIN_GAP_MS);
  if (evidence.sameVenue && farApart) {
    return { classification: EVENT_DUPLICATE_CLASS.DISTINCT_PERFORMANCES, excludedIds: addOns.map(id), evidence };
  }
  return { classification: EVENT_DUPLICATE_CLASS.AMBIGUOUS, excludedIds: performances.map(id), evidence };
}

/**
 * Every group of rows that might describe one performance, classified.
 *
 *   - Same date: two or more rows for one artist, city and venue-local date.
 *     Grouped over every dated row, past or future, so the answer does not
 *     depend on the clock.
 *   - Shared provider listing: two or more performance rows holding the same
 *     verified provider listing id (or Ticketmaster event id). Non-performance
 *     rows are left out: they never serve, and a resale site mapping an upsell
 *     to the concert's listing says nothing against the concert row.
 *
 * Reported for review and used by the policy; never acted on — no row is
 * merged, rewritten or deleted.
 *
 * @param {any[]} events
 * @returns {EventDuplicateGroup[]}
 */
export function deriveEventDuplicateGroups(events) {
  const list = Array.isArray(events) ? events : [];
  const byDate = new Map();
  const byListing = new Map();
  for (const event of list) {
    const id = String(event?.id ?? "").trim();
    if (!id) continue;
    const localDate = resolveEventLocalDate(event).iso;
    const artist = eventSlugPart(event?.artist_slug);
    if (localDate && artist) {
      const key = `${artist}|${eventSlugPart(event?.city)}|${localDate}`;
      if (!byDate.has(key)) byDate.set(key, []);
      byDate.get(key).push(event);
    }
    if (nonPerformanceMarkers(event).length) continue;
    for (const listing of new Set(providerListings(event))) {
      if (!byListing.has(listing)) byListing.set(listing, []);
      byListing.get(listing).push(event);
    }
  }
  /** @type {EventDuplicateGroup[]} */
  const groups = [];
  for (const [key, rows] of byDate) {
    if (rows.length < 2) continue;
    const { classification, excludedIds, evidence } = classifySameDateGroup(rows);
    groups.push({ kind: "same_date", key, classification, ids: rows.map((event) => String(event.id).trim()), excludedIds, evidence });
  }
  // One group per distinct set of rows: a pair mapped to the same wrong night
  // usually shares two or three lanes' listing ids. A set already reported as
  // one same-date group (one performance listed twice) is not reported again.
  const seen = new Set(groups.map((group) => [...group.ids].sort().join(",")));
  for (const [key, rows] of byListing) {
    const ids = [...new Set(rows.map((event) => String(event.id).trim()))];
    if (ids.length < 2) continue;
    const signature = [...ids].sort().join(",");
    if (seen.has(signature)) continue;
    seen.add(signature);
    groups.push({
      kind: "shared_provider_listing",
      key,
      classification: EVENT_DUPLICATE_CLASS.SHARED_PROVIDER_LISTING,
      ids,
      excludedIds: ids,
      evidence: { sameStartInstant: false, sharedProviderListing: true, sameVenue: new Set(rows.map((event) => slugify(event.venue))).size === 1, nonPerformanceIds: [], addOnIds: [] }
    });
  }
  return groups;
}

const DUPLICATE_INDEX_MEMO = new WeakMap();

/**
 * Event id -> the duplicate groups that make it ineligible, memoised per
 * events array (the router and the audits evaluate many events per array).
 *
 * @param {any[]} events
 * @returns {Map<string, EventDuplicateGroup[]>}
 */
export function eventDuplicateIndex(events) {
  const list = Array.isArray(events) ? events : [];
  const memo = DUPLICATE_INDEX_MEMO.get(list);
  if (memo) return memo;
  const index = new Map();
  for (const group of deriveEventDuplicateGroups(list)) {
    for (const id of group.excludedIds) {
      if (!index.has(id)) index.set(id, []);
      index.get(id).push(group);
    }
  }
  DUPLICATE_INDEX_MEMO.set(list, index);
  return index;
}

// ---------------------------------------------------------------------------
// Snapshot readiness
// ---------------------------------------------------------------------------

/**
 * The event's snapshot-ready lanes: publishable lanes that can carry a
 * TTC-approved listed-price snapshot (PRICE_GUIDE_SNAPSHOT_PROVIDERS, the
 * lanes with owner-confirmed price display rights) and hold verified
 * provenance with a stored URL for this exact event. Static: whether a price
 * is cached, fresh or stale right now is never consulted.
 *
 * @param {any} event
 * @param {string[]} publishableLanes
 * @returns {string[]}
 */
export function snapshotReadyLanes(event, publishableLanes) {
  const lanes = Array.isArray(publishableLanes) ? publishableLanes : [];
  return PRICE_GUIDE_SNAPSHOT_PROVIDERS.filter((provider) => lanes.includes(provider) && linkVerifiedWithUrl(event, provider));
}

// ---------------------------------------------------------------------------
// The decision
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} EventIndexabilityDecision
 * @property {boolean} eligible   Every condition passed. Eligible, not indexed:
 *                                see eventPageIndexingDecision.
 * @property {string[]} reasons   Every failed condition (EVENT_INDEXABILITY_REASONS), in a fixed order.
 * @property {string} id
 * @property {string} key         Stable event key.
 * @property {string} path        Canonical path, "" when none.
 * @property {{
 *   routeAction: string, routeReason: string, upcoming: boolean, lifecycle: string, held: boolean,
 *   commerciallyLive: boolean, onsalePending: boolean, nonPerformance: string[],
 *   artistPageIndexable: boolean, schemaEligible: boolean, schemaReason: string, eventStatus: string,
 *   publishableLanes: string[], destinationCount: number, snapshotReadyLanes: string[],
 *   duplicateGroups: Array<{ kind: string, key: string, classification: string }>
 * }} inputs
 */

/**
 * Is this individual event page strong and safe enough to be indexed?
 *
 * Eligible when every one of these holds:
 *
 *   - its canonical path serves 200 (resolveEventRoute renders it);
 *   - the parent artist page is itself indexable (artistPageIndexable);
 *   - it is upcoming, not held (cancelled, postponed, unknown status), and
 *     commercially live — a rescheduled date qualifies on its current date;
 *   - it is a genuine performance, not an upsell listing;
 *   - its page carries a valid MusicEvent (eventPageSchemaDecision) — which
 *     excludes a pre-on-sale date and a resale-only record, exactly as the
 *     parent boards' schema does;
 *   - it leads to ≥ EVENT_MIN_PUBLISHABLE_DESTINATIONS publishable ticket
 *     destinations, ≥ EVENT_MIN_SNAPSHOT_READY_LANES of them snapshot-ready;
 *   - no other row makes it ambiguous (eventDuplicateIndex).
 *
 * @param {any[]} events   Every events.json record (route resolution, duplicates, the artist gate).
 * @param {any[]} artists  artists.json records.
 * @param {any} event      The raw record being decided.
 * @param {{ publishableLanes?: string[], now?: number }} [options]
 *   `publishableLanes` are the provider lanes whose button renders for this
 *   event, from the CTA gate (offline: publishableLaneSlugs in
 *   scripts/lib/event-link-coverage.mjs). Missing means none.
 * @returns {EventIndexabilityDecision}
 */
export function eventIndexabilityDecision(events, artists, event, options = {}) {
  const now = Number.isFinite(options.now) ? Number(options.now) : Date.now();
  const list = Array.isArray(events) ? events : [];
  const artistSlug = slugify(event?.artist_slug);
  const artist = (Array.isArray(artists) ? artists : []).find((record) => slugify(record?.slug) === artistSlug);
  const state = eventRouteState(event, { artist, now });
  const path = eventPath(event);
  const route = path ? resolveEventRoute(list, artists, path, { now }) : { action: EVENT_ROUTE_ACTION.NOT_FOUND, reason: "no_path" };
  const served = route.action === EVENT_ROUTE_ACTION.RENDER && route.canonicalPath === path;
  const parentIndexable = Boolean(artist) && artistPageIndexable(artist, list, artistSlug, now);
  const schema = eventPageSchemaDecision(event, { now });
  const lanes = Array.isArray(options.publishableLanes) ? [...new Set(options.publishableLanes.map(String))] : [];
  const snapshotLanes = snapshotReadyLanes(event, lanes);
  const duplicateGroups = eventDuplicateIndex(list).get(state.id) || [];

  const R = EVENT_INDEXABILITY_REASONS;
  const reasons = [];
  if (!served) reasons.push(R.NOT_ADDRESSABLE);
  if (!parentIndexable) reasons.push(R.ARTIST_NOT_INDEXABLE);
  if (!state.upcoming) reasons.push(R.NOT_UPCOMING);
  if (state.held) reasons.push(R.LIFECYCLE_HELD);
  else if (!state.commerciallyLive) reasons.push(R.NOT_COMMERCIALLY_LIVE);
  if (state.nonPerformance.length) reasons.push(R.NON_PERFORMANCE);
  if (!schema.eligible) reasons.push(R.NO_EVENT_SCHEMA);
  if (lanes.length < EVENT_MIN_PUBLISHABLE_DESTINATIONS) reasons.push(R.BELOW_DESTINATION_THRESHOLD);
  if (snapshotLanes.length < EVENT_MIN_SNAPSHOT_READY_LANES) reasons.push(R.NO_SNAPSHOT_READY_LANE);
  if (duplicateGroups.length) reasons.push(R.DUPLICATE_AMBIGUITY);

  return {
    eligible: reasons.length === 0,
    reasons,
    id: state.id,
    key: eventKey(state.id),
    path,
    inputs: {
      routeAction: route.action,
      routeReason: route.reason || "",
      upcoming: state.upcoming,
      lifecycle: state.lifecycle,
      held: state.held,
      commerciallyLive: state.commerciallyLive,
      onsalePending: state.onsalePending,
      nonPerformance: state.nonPerformance,
      artistPageIndexable: parentIndexable,
      schemaEligible: schema.eligible,
      schemaReason: schema.reason,
      eventStatus: schema.eventStatus,
      publishableLanes: lanes,
      destinationCount: lanes.length,
      snapshotReadyLanes: snapshotLanes,
      duplicateGroups: duplicateGroups.map((group) => ({ kind: group.kind, key: group.key, classification: group.classification }))
    }
  };
}

/**
 * The decision for every record, in events.json order.
 *
 * @param {any[]} events
 * @param {any[]} artists
 * @param {{ lanesFor: (event: any) => string[], now?: number }} options
 * @returns {EventIndexabilityDecision[]}
 */
export function deriveEventIndexability(events, artists, options) {
  const now = Number.isFinite(options?.now) ? Number(options.now) : Date.now();
  const lanesFor = typeof options?.lanesFor === "function" ? options.lanesFor : () => [];
  return (Array.isArray(events) ? events : []).map((event) =>
    eventIndexabilityDecision(events, artists, event, { publishableLanes: lanesFor(event), now })
  );
}

// ---------------------------------------------------------------------------
// Artist-city relationship (reported, never a gate)
// ---------------------------------------------------------------------------

export const EVENT_ARTIST_CITY_RELATION = Object.freeze({
  // The artist-city page renders and is indexable (≥ 2 publishable dates).
  INDEXABLE: "indexable",
  // It renders noindex,follow: one publishable date, so the event page is the
  // precise leaf for this city.
  NOINDEX_SINGLE_DATE: "noindex_single_date",
  // No artist-city page renders for this event's city.
  ABSENT: "absent"
});

/**
 * How the event's artist-city page stands. A single-date city is not a reason
 * to exclude an event page — it is where the event page adds most.
 *
 * @param {any[]} events
 * @param {any} event
 * @param {{ now?: number }} [options]
 * @returns {string} One of EVENT_ARTIST_CITY_RELATION.
 */
export function eventArtistCityRelation(events, event, options = {}) {
  const now = Number.isFinite(options.now) ? Number(options.now) : Date.now();
  const artistCity = findArtistCity(events, slugify(event?.artist_slug), citySlug(event?.city, event?.country), { now });
  if (!artistCity?.hasPublishable) return EVENT_ARTIST_CITY_RELATION.ABSENT;
  return artistCity.indexable ? EVENT_ARTIST_CITY_RELATION.INDEXABLE : EVENT_ARTIST_CITY_RELATION.NOINDEX_SINGLE_DATE;
}

// ---------------------------------------------------------------------------
// Rollout: the frozen indexing pilot
// ---------------------------------------------------------------------------

// The environment variable that turns event-page indexing on, and the one
// value that does. Any other value — including absent — is off. It is a
// non-secret flag, repo-managed in wrangler.toml [vars] like every other flag.
// Removing it (or setting anything but "pilot") is the rollback: the next
// render is noindex,follow again, the events sitemap empties and parent
// MusicEvent nodes return to their #show-<id> urls.
export const EVENT_PAGES_INDEXING_ENV = "EVENT_PAGES_INDEXING";
export const EVENT_PAGES_INDEXING_PILOT = "pilot";

// The indexing pilot cohort: 30 stable event keys (eventKey, 16 hex digits),
// frozen on 2026-09-27 and recorded with their selection facts in
// data/event-indexing-pilot.json. Keys, not readable slugs: the readable part
// of an event URL follows the record (a venue rename changes it), the key
// never does.
//
// This is an experiment cohort, not a queue. A key here is necessary, not
// sufficient — its event must still be eligible on every request, so a pilot
// event that is cancelled, postponed, loses a destination, becomes ambiguous
// or passes drops back to noindex on its own. Nothing replaces it: never add,
// swap or regenerate a key to keep the count at 30, because that changes the
// cohort being measured. npm run test:event-indexability pins the list to the
// record.
export const EVENT_INDEXING_PILOT_KEYS = Object.freeze(/** @type {string[]} */ ([
  "c436513406e7f2da", // Olivia Rodrigo · Palau Sant Jordi, Barcelona · 2027-05-01
  "72af8cbd1cd8d3d8", // Gracie Abrams · 3Arena, Dublin · 2027-04-19
  "d73ff903727f20f4", // Harry Styles · Accor Stadium, Sydney Olympic Park · 2026-12-13
  "e6e1faddff7976d5", // Oasis · Celtic Park, Glasgow · 2027-05-21
  "ea513c3d1839644c", // Teddy Swims · Co-op Live, Manchester · 2027-04-16
  "5e3215d7a36ec741", // Metallica · Sphere, Las Vegas · 2027-01-30
  "610c635a5559f3f9", // Blue October · 713 Music Hall, Houston · 2026-12-20
  "ead9d829437edbb7", // John Summit · Oakland Arena, Oakland · 2026-12-05
  "63a3d0ac045b3f21", // Yuridia · YouTube Theater, Inglewood · 2027-02-20
  "a42166f660ea6209", // Andrea Bocelli · Madison Square Garden, New York · 2026-12-17
  "e39ddcc1ba2ad1f5", // Stella Lefty · History Toronto, Toronto · 2027-01-13
  "9876efbfe96058d8", // Charli xcx · OVO Hydro, Glasgow · 2027-02-15
  "a70cd786f82a70d4", // Five Finger Death Punch · bp pulse LIVE, Birmingham · 2027-01-22
  "2bc3fb2dfa45fc5d", // Doja Cat · Centre Bell, Montreal · 2026-11-27
  "4c425ff88e7af37e", // Pentatonix · TD Coliseum, Hamilton · 2026-11-22
  "1b05de0de9e664c0", // Hans Zimmer · Rogers Arena, Vancouver · 2027-04-08
  "2d87c7c05e96d0d2", // Niall Horan · Little Caesars Arena, Detroit · 2027-03-19
  "c4f64b18ec718de4", // Luke Combs · Ford Field, Detroit · 2027-04-17
  "1d2c4b83096cde36", // Kenny Chesney · Raymond James Stadium, Tampa · 2027-04-24
  "7b10d67b330286fb", // Trans-Siberian Orchestra · Legacy Arena at the BJCC, Birmingham · 2026-12-16
  "3cf8970ff8acddc1", // Don Omar · Golden 1 Center, Sacramento · 2027-02-05
  "579f35575a62d3bd", // Trivium · The Fillmore Charlotte, Charlotte · 2026-12-19
  "672f3eb3e9201475", // TobyMac · Benchmark International Arena, Tampa · 2027-02-04
  "58744f821a109f9f", // Sylvan Esso · Paramount Theatre, Seattle · 2027-02-19
  "6e93ba2f732c3f15", // Beartooth · Hollywood Palladium, Hollywood · 2026-12-18
  "470d8f4792c6b314", // Tyla · YouTube Theater, Inglewood · 2026-12-16
  "1cb4e113d803bfe0", // Sombr · Prudential Center, Newark · 2026-11-21
  "acfa386138dd4901", // Death Cab for Cutie · Hard Rock Live Orlando, Orlando · 2027-03-20
  "6e6a78cb4fd634e3", // The Interrupters · House of Blues Dallas, Dallas · 2027-03-23
  "d64a9bd109f76856" // Michelle Branch · House of Blues Houston, Houston · 2027-03-07
]));

export const EVENT_INDEXING_ROLLOUT_REASONS = Object.freeze({
  NOT_ELIGIBLE: "not_eligible",
  INDEXING_OFF: "indexing_off",
  NOT_IN_PILOT: "not_in_pilot",
  // The request is not on the canonical production host (a *.pages.dev
  // preview or production alias): the pilot never activates there.
  HOST_NOT_INDEXABLE: "host_not_indexable",
  // A pilot key that names no single event (unknown, or a key collision).
  UNKNOWN_KEY: "unknown_key"
});

/**
 * Is the rollout flag set to "pilot"? The cheap first check: every caller
 * that would otherwise load or evaluate anything asks this first.
 *
 * @param {Record<string, unknown> | null | undefined} env
 * @returns {boolean}
 */
export function eventPagesIndexingEnabled(env) {
  return String(env?.[EVENT_PAGES_INDEXING_ENV] ?? "").trim().toLowerCase() === EVENT_PAGES_INDEXING_PILOT;
}
const pilotFlagOn = eventPagesIndexingEnabled;

/**
 * Should this event page actually render index,follow and be listed in a
 * sitemap? Eligible by policy AND the flag is "pilot" AND its stable key is on
 * the pilot list. Per decision; the router, sitemaps and llms.txt call it
 * through deriveEventIndexingPilot, which adds the host rule.
 *
 * @param {EventIndexabilityDecision} decision
 * @param {Record<string, unknown> | null | undefined} env
 * @param {{ pilotKeys?: readonly string[] }} [options] Tests inject a list; production uses EVENT_INDEXING_PILOT_KEYS.
 * @returns {{ indexable: boolean, reason: string }}
 */
export function eventPageIndexingDecision(decision, env, options = {}) {
  const R = EVENT_INDEXING_ROLLOUT_REASONS;
  if (!decision?.eligible) return { indexable: false, reason: R.NOT_ELIGIBLE };
  if (!pilotFlagOn(env)) return { indexable: false, reason: R.INDEXING_OFF };
  const keys = options.pilotKeys || EVENT_INDEXING_PILOT_KEYS;
  if (!decision.key || !keys.includes(decision.key)) return { indexable: false, reason: R.NOT_IN_PILOT };
  return { indexable: true, reason: "" };
}

/**
 * @typedef {Object} EventIndexingPilotMember
 * @property {string} key
 * @property {string} id       "" for an unknown key.
 * @property {string} path     Canonical event path, "" when none.
 * @property {boolean} indexable
 * @property {string} reason   EVENT_INDEXING_ROLLOUT_REASONS, "" when indexable.
 * @property {EventIndexabilityDecision | null} decision
 * @property {any} event
 */

/**
 * @typedef {Object} EventIndexingPilot
 * @property {boolean} active   The flag is "pilot" and the host may be indexed.
 * @property {string} reason    Why it is inactive, "" when active.
 * @property {EventIndexingPilotMember[]} members  One per pilot key, in list order (empty when inactive).
 * @property {EventIndexingPilotMember[]} indexed  The members that render index,follow now.
 * @property {Map<string, string>} pathById  Event id -> canonical path, indexed members only.
 */

/**
 * The active indexing pilot: which of the frozen pilot events render
 * index,follow right now. The one runtime answer — the router's robots meta,
 * the parent boards' MusicEvent identity, the events sitemap and llms.txt all
 * read it, so they cannot disagree about which event URLs are indexed.
 *
 * Fails closed at every step: the host must be the canonical production host
 * (`hostIndexable` true, from isIndexableOrigin — never true on *.pages.dev
 * previews), the flag must be exactly "pilot", each key must name exactly one
 * event, and that event must pass eventIndexabilityDecision now. Only the
 * pilot keys are evaluated, never the whole eligible population, so the
 * indexed set can shrink but never grow past the cohort.
 *
 * @param {any[]} events   Every events.json record — the full file, never an artist partition.
 * @param {any[]} artists  artists.json records.
 * @param {Record<string, unknown> | null | undefined} env
 * @param {{ hostIndexable?: boolean, lanesFor?: (event: any) => string[], now?: number, pilotKeys?: readonly string[] }} [options]
 *   `lanesFor` returns the provider lanes whose button renders for an event
 *   (the router's CTA gate); missing means none, which fails every threshold.
 * @returns {EventIndexingPilot}
 */
export function deriveEventIndexingPilot(events, artists, env, options = {}) {
  const R = EVENT_INDEXING_ROLLOUT_REASONS;
  const inactive = (reason) => ({ active: false, reason, members: [], indexed: [], pathById: new Map() });
  if (options.hostIndexable !== true) return inactive(R.HOST_NOT_INDEXABLE);
  if (!pilotFlagOn(env)) return inactive(R.INDEXING_OFF);
  const pilotKeys = options.pilotKeys || EVENT_INDEXING_PILOT_KEYS;
  const now = Number.isFinite(options.now) ? Number(options.now) : Date.now();
  const lanesFor = typeof options.lanesFor === "function" ? options.lanesFor : () => [];
  const list = Array.isArray(events) ? events : [];
  const byKey = buildEventKeyIndex(list).byKey;
  /** @type {EventIndexingPilotMember[]} */
  const members = [];
  for (const key of new Set(pilotKeys)) {
    const event = byKey.get(key);
    if (!event) {
      members.push({ key, id: "", path: "", indexable: false, reason: R.UNKNOWN_KEY, decision: null, event: null });
      continue;
    }
    const decision = eventIndexabilityDecision(list, artists, event, { publishableLanes: lanesFor(event), now });
    const rollout = eventPageIndexingDecision(decision, env, { pilotKeys });
    members.push({ key, id: decision.id, path: decision.path, indexable: rollout.indexable, reason: rollout.reason, decision, event });
  }
  const indexed = members.filter((member) => member.indexable && member.path);
  return { active: true, reason: "", members, indexed, pathById: new Map(indexed.map((member) => [member.id, member.path])) };
}
