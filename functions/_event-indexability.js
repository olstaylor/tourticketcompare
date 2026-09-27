// @ts-check
// Event-page indexability policy: which individual event pages
// (/events/<slug>-<key>) are strong and safe enough to be indexed.
//
// This module is the one answer to that question. The indexing diagnostic
// (scripts/report-event-routes.mjs), the indexable-surface audit and its tests
// read eventIndexabilityDecision below; the router, the sitemaps and llms.txt
// will read eventPageIndexingDecision (the rollout gate) when the indexing
// pilot starts. None of them may restate the policy. It is documented in
// docs/ROUTE_INDEXABILITY_POLICY.md → "Event"; change both together.
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
//                         (eventPageIndexingDecision). Nothing is indexable yet:
//                         the rollout flag is off and the pilot list is empty,
//                         and the router still hard-codes noindex,follow.
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
// Rollout (designed for the indexing pilot; off)
// ---------------------------------------------------------------------------

// The environment variable that turns event-page indexing on, and the one
// value that does. Any other value — including absent — is off. It is a
// non-secret flag, so it belongs in wrangler.toml [vars] when the pilot starts;
// it is not set anywhere today. Unsetting it is the rollback: the next render
// is noindex,follow again and the sitemap drops the URLs.
export const EVENT_PAGES_INDEXING_ENV = "EVENT_PAGES_INDEXING";
export const EVENT_PAGES_INDEXING_PILOT = "pilot";

// Stable event keys (eventKey, 16 hex digits) allowed to be indexed while the
// flag is "pilot". Keys, not readable slugs: the readable part of an event URL
// follows the record (a venue rename changes it), the key never does. A key
// here is necessary, not sufficient — its event must still be eligible on
// every request, so a pilot event that is cancelled, loses a destination or
// passes drops out on its own. Empty: no event page is indexable.
export const EVENT_INDEXING_PILOT_KEYS = Object.freeze(/** @type {string[]} */ ([]));

export const EVENT_INDEXING_ROLLOUT_REASONS = Object.freeze({
  NOT_ELIGIBLE: "not_eligible",
  INDEXING_OFF: "indexing_off",
  NOT_IN_PILOT: "not_in_pilot"
});

/**
 * Should this event page actually render index,follow and be listed in a
 * sitemap? Eligible by policy AND the flag is "pilot" AND its stable key is on
 * the pilot list. Nothing calls this for robots or sitemaps yet: the router
 * hard-codes noindex,follow until the pilot is deliberately started.
 *
 * @param {EventIndexabilityDecision} decision
 * @param {Record<string, unknown> | null | undefined} env
 * @param {{ pilotKeys?: readonly string[] }} [options] Tests inject a list; production uses EVENT_INDEXING_PILOT_KEYS.
 * @returns {{ indexable: boolean, reason: string }}
 */
export function eventPageIndexingDecision(decision, env, options = {}) {
  const R = EVENT_INDEXING_ROLLOUT_REASONS;
  if (!decision?.eligible) return { indexable: false, reason: R.NOT_ELIGIBLE };
  if (String(env?.[EVENT_PAGES_INDEXING_ENV] ?? "").trim().toLowerCase() !== EVENT_PAGES_INDEXING_PILOT) {
    return { indexable: false, reason: R.INDEXING_OFF };
  }
  const keys = options.pilotKeys || EVENT_INDEXING_PILOT_KEYS;
  if (!decision.key || !keys.includes(decision.key)) return { indexable: false, reason: R.NOT_IN_PILOT };
  return { indexable: true, reason: "" };
}
