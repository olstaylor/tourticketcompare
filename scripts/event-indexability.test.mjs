#!/usr/bin/env node
//
// Tests for the event-page indexability policy (functions/_event-indexability.js):
// which individual event pages are eligible for indexing, why every other page
// is not, the duplicate-ambiguity rule, the rollout gate, and the frozen
// 30-key indexing pilot — that exactly its active members render index,follow,
// enter the events sitemap and llms.txt and are identified by their event page
// on the parent boards, and that nothing else changes. Eligibility must follow
// canonical data (lifecycle, provider provenance, the route) and never cached
// prices or D1.
//
// Fixture decisions first, then rendered pages through the real middleware
// (robots, sitemaps, llms.txt, parent structured data), then invariants over
// the real events.json.
//
// Usage: node scripts/event-indexability.test.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://tourticketcompare.com";
const checks = [];
const assert = (label, pass) => checks.push({ label, pass: !!pass });
const load = (relative) => import(pathToFileURL(path.join(ROOT, relative)));
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(ROOT, relative), "utf8"));
const { slugify } = await import(pathToFileURL(path.join(ROOT, "functions/_cities.js")));

// The router reads the wall clock; pin it so fixture dates stay upcoming.
const NOW = Date.parse("2026-08-09T12:00:00Z");
const realNow = Date.now;
Date.now = () => NOW;

const policy = await load("functions/_event-indexability.js");
const eventPages = await load("functions/_event-pages.js");
const coverage = await load("scripts/lib/event-link-coverage.mjs");
const middleware = await load("functions/_middleware.js");
const {
  EVENT_INDEXABILITY_REASONS: R,
  EVENT_DUPLICATE_CLASS: D,
  EVENT_ARTIST_CITY_RELATION: REL,
  EVENT_INDEXING_ROLLOUT_REASONS: ROLLOUT,
  eventIndexabilityDecision,
  eventPageIndexingDecision
} = policy;

// ─── fixture ────────────────────────────────────────────────────────────────

const artistsMeta = readJson("public/data/artists.json");
const catalog = readJson("public/data/catalog.json");
const catalogSlugs = new Set((catalog.artists || []).map((artist) => String(artist?.slug || "")));
const artistRecord = artistsMeta.find(
  (artist) => artist?.indexing_status === "indexable_with_substantial_content" && catalogSlugs.has(String(artist.slug)) && artist.promotion_source !== "auto"
);
const shellRecord = artistsMeta.find((artist) => artist?.indexing_status === "review_required" && catalogSlugs.has(String(artist.slug)));
const ARTIST = { slug: String(artistRecord.slug), name: String(artistRecord.name || artistRecord.slug) };
const ALL_LANES = ["seatgeek", "vivid-seats", "ticketnetwork", "stubhub-international"];

function fixtureEvent(id, iso, extra = {}, { lanes = ALL_LANES, ticketmaster = true } = {}) {
  const tm = ticketmaster ? `https://www.ticketmaster.com/event/${id.toUpperCase()}` : "";
  // A distinct provider listing id per row (derived from its key), so rows
  // share a listing only where a test says so.
  const numeric = String(parseInt(eventPages.eventKey(id).slice(0, 7), 16) + 1000000);
  const urls = {
    seatgeek: ["seatgeek_url", `https://seatgeek.com/fixture-tickets/springfield-${numeric}/concert/${numeric}`],
    "vivid-seats": ["vividseats_url", `https://www.vividseats.com/fixture-springfield--concerts-pop/production/${numeric}`],
    ticketnetwork: ["ticketnetwork_url", `https://www.ticketnetwork.com/en/p/${numeric}`],
    "stubhub-international": ["stubhub_international_url", `https://www.stubhub.ie/fixture-springfield-tickets/event/${numeric}`]
  };
  const event = {
    id,
    artist_slug: ARTIST.slug,
    artist_name: ARTIST.name,
    event_name: `${ARTIST.name}: Fixture Tour`,
    city: "Springfield",
    country: "United States",
    venue: "Fixture Arena",
    datetime_iso: iso,
    timezone: "America/Chicago",
    status: "on-sale",
    ticketmaster_event_id: ticketmaster ? id.toUpperCase() : "",
    ticketmaster_url: tm,
    source_type: "ticketmaster",
    source_url: tm,
    last_verified_at: "2026-08-01",
    provider_links: {},
    verification_status: "human_verified",
    ...extra
  };
  if (tm) event.provider_links.ticketmaster = { event_id: id.toUpperCase(), url: tm, verified: true };
  for (const lane of lanes) {
    const [field, url] = urls[lane];
    event[field] = url;
    event.provider_links[lane] = { event_id: numeric, url, verified: true };
  }
  return { ...event, ...extra };
}

// One derivation of publishable lanes: the offline CTA mirror, every lane configured.
const lanesOf = (event, now = NOW) => coverage.publishableLaneSlugs(event, () => true, now);
const decide = (events, event, { artists = artistsMeta, now = NOW, lanes } = {}) =>
  eventIndexabilityDecision(events, artists, event, { publishableLanes: lanes ?? lanesOf(event, now), now });
const sameReasons = (decision, expected) => decision.reasons.join(",") === expected.join(",");

// Springfield: one date (its artist-city page is noindex, single-date).
const STRONG = fixtureEvent("fixture-strong", "2026-09-11T01:00:00Z");
// Shelbyville: two dates (an indexable artist-city page).
const MULTI_A = fixtureEvent("fixture-multi-a", "2026-09-12T01:00:00Z", { city: "Shelbyville", venue: "Shelby Hall" });
const MULTI_B = fixtureEvent("fixture-multi-b", "2026-09-13T01:00:00Z", { city: "Shelbyville", venue: "Shelby Hall" });
const ONE_LANE = fixtureEvent("fixture-one-lane", "2026-09-14T01:00:00Z", { city: "Ogdenville", venue: "Ogden Hall" }, { lanes: [] });
const TWO_LANES = fixtureEvent("fixture-two-lanes", "2026-09-15T01:00:00Z", { city: "North Haverbrook", venue: "Haver Hall" }, { lanes: ["vivid-seats"] });
const NO_SNAPSHOT = fixtureEvent("fixture-no-snapshot", "2026-09-16T01:00:00Z", { city: "Capital City", venue: "Capital Arena" }, { lanes: ["seatgeek"] });
const CANCELLED = fixtureEvent("fixture-cancelled", "2026-09-17T01:00:00Z", { city: "Brockway", venue: "Brock Hall", ticketmaster_status_code: "cancelled" });
const POSTPONED = fixtureEvent("fixture-postponed", "2026-09-18T01:00:00Z", { city: "Brockway", venue: "Brock Hall", ticketmaster_status_code: "postponed" });
const UNKNOWN = fixtureEvent("fixture-unknown", "2026-09-19T01:00:00Z", { city: "Brockway", venue: "Brock Hall", ticketmaster_status_code: "paused" });
const RESCHEDULED = fixtureEvent("fixture-rescheduled", "2026-09-20T01:00:00Z", { city: "Cypress Creek", venue: "Cypress Dome", ticketmaster_status_code: "rescheduled" });
const PRE_ONSALE = fixtureEvent("fixture-pre-onsale", "2026-09-21T01:00:00Z", { city: "Waverly Hills", venue: "Waverly Hall", status: "announced", public_onsale_at: "2026-08-20T15:00:00Z" });
const RESALE_ONLY = fixtureEvent("fixture-resale-only", "2026-09-22T01:00:00Z", { city: "Dunkirk", venue: "Dunkirk Hall" }, { ticketmaster: false });
const UPSELL = fixtureEvent("fixture-upsell", "2026-09-23T01:00:00Z", { city: "Dunkirk", venue: "Dunkirk Hall", event_name: `${ARTIST.name} | Premium Seats` });
const PAST = fixtureEvent("fixture-past", "2026-07-01T01:00:00Z", { city: "Dunkirk", venue: "Dunkirk Hall" });
const NO_DESTINATION = fixtureEvent("fixture-no-destination", "2026-09-24T01:00:00Z", { city: "Nowhere Junction", venue: "Junction Hall" }, { lanes: [], ticketmaster: false });
const DATE_ONLY = fixtureEvent("fixture-date-only", "2026-09-25", { city: "Dunkirk", venue: "Dunkirk Hall" });
const SHELL = fixtureEvent("fixture-shell", "2026-09-26T01:00:00Z", { artist_slug: String(shellRecord.slug), artist_name: String(shellRecord.name || shellRecord.slug) });
const EVENTS = [STRONG, MULTI_A, MULTI_B, ONE_LANE, TWO_LANES, NO_SNAPSHOT, CANCELLED, POSTPONED, UNKNOWN, RESCHEDULED, PRE_ONSALE, RESALE_ONLY, UPSELL, PAST, NO_DESTINATION, DATE_ONLY, SHELL];

// ─── the policy, condition by condition ─────────────────────────────────────

{
  const strong = decide(EVENTS, STRONG);
  assert("1. a genuine strong event is eligible", strong.eligible && strong.reasons.length === 0);
  assert("   its decision carries its key, canonical path and inputs", strong.key === eventPages.eventKey(STRONG.id) && strong.path === eventPages.eventPath(STRONG) && strong.inputs.destinationCount === 5 && strong.inputs.snapshotReadyLanes.join(",") === "vivid-seats,ticketnetwork,stubhub-international");

  const one = decide(EVENTS, ONE_LANE);
  assert("2. a Ticketmaster-only event fails the two-destination threshold", one.inputs.destinationCount === 1 && one.reasons.includes(R.BELOW_DESTINATION_THRESHOLD) && !one.eligible);

  const two = decide(EVENTS, TWO_LANES);
  assert("3. two destinations (one snapshot-capable) pass", two.eligible && two.inputs.destinationCount === 2);

  const noSnap = decide(EVENTS, NO_SNAPSHOT);
  assert("4. SeatGeek + Ticketmaster has no snapshot-ready lane and fails on that alone", sameReasons(noSnap, [R.NO_SNAPSHOT_READY_LANE]));

  assert("5. a snapshot-capable lane passes with no numeric price anywhere", !("prices" in STRONG) && strong.eligible);
  const unverifiedVivid = decide(EVENTS, STRONG, { lanes: ["vivid-seats", "ticketmaster"] });
  const vividWithoutProvenance = { ...STRONG, provider_links: { ...STRONG.provider_links, "vivid-seats": { url: STRONG.vividseats_url, verified: false } }, ticketnetwork_url: "", stubhub_international_url: "" };
  assert("   a snapshot lane counts only with verified provenance for this event", unverifiedVivid.eligible && !decide(EVENTS, vividWithoutProvenance, { lanes: ["vivid-seats", "ticketmaster"] }).eligible);
  assert("   a lane counts only when it publishes (the caller's CTA lanes)", decide(EVENTS, STRONG, { lanes: ["seatgeek", "ticketmaster"] }).reasons.includes(R.NO_SNAPSHOT_READY_LANE));
  assert("   a missing lane list fails closed", eventIndexabilityDecision(EVENTS, artistsMeta, STRONG, { now: NOW }).reasons.includes(R.BELOW_DESTINATION_THRESHOLD));
}

// 6–7. Cached prices and D1 state are not inputs. The router attaches D1 price
// lanes to its own copy of each record (`prices`, `priceChecks`); whatever they
// hold — fresh, stale, empty, or nothing because D1 is down — the decision is
// byte-identical.
{
  const base = JSON.stringify(decide(EVENTS, STRONG));
  const fresh = { ...STRONG, prices: [{ provider: "Vivid Seats", price: 182, currency: "USD", fetchedAt: "2026-08-09T09:00:00Z" }], priceChecks: { "vivid-seats": { status: "fresh" } } };
  const stale = { ...STRONG, prices: [{ provider: "Vivid Seats", price: 99, currency: "USD", fetchedAt: "2026-07-01T09:00:00Z", expiresAt: "2026-07-02T09:00:00Z" }], priceChecks: { "vivid-seats": { status: "stale" } } };
  const unavailable = { ...STRONG, prices: [], priceChecks: null };
  const same = (event) => JSON.stringify(decide(EVENTS.map((e) => (e.id === STRONG.id ? event : e)), event)) === base;
  assert("6. D1 unavailable (no price lanes attached) does not alter eligibility", same(unavailable));
  assert("7. a stale cached price does not alter eligibility", same(stale));
  assert("   nor does a fresh one", same(fresh));
  const source = fs.readFileSync(path.join(ROOT, "functions/_event-indexability.js"), "utf8");
  const code = source.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");
  assert("   the policy module reads no D1 binding, price cache, price field or network", !/DEMAND_DB|provider_pricing|\.prices\b|priceChecks|fetch\(|\benv\.DB\b/.test(code));

  // Things that must move it: provenance, lifecycle, coverage.
  const lostProvenance = { ...TWO_LANES, provider_links: { ...TWO_LANES.provider_links, "vivid-seats": { ...TWO_LANES.provider_links["vivid-seats"], verified: false } } };
  assert("   losing provider provenance can make an event ineligible", !decide(EVENTS, lostProvenance).eligible);
  const nowCancelled = { ...STRONG, ticketmaster_status_code: "cancelled" };
  assert("   a lifecycle change can make an event ineligible", !decide(EVENTS.map((e) => (e.id === STRONG.id ? nowCancelled : e)), nowCancelled).eligible);
  const lostCoverage = fixtureEvent("fixture-strong", STRONG.datetime_iso, {}, { lanes: ["seatgeek"] });
  assert("   losing canonical provider coverage can make an event ineligible", decide(EVENTS.map((e) => (e.id === STRONG.id ? lostCoverage : e)), lostCoverage).reasons.join(",") === R.NO_SNAPSHOT_READY_LANE);
}

{
  const shell = decide(EVENTS, SHELL);
  assert("8. a review_required artist's event is ineligible (artist_not_indexable)", shell.reasons.includes(R.ARTIST_NOT_INDEXABLE) && !shell.eligible);
  const autoArtists = artistsMeta.map((artist) => (artist.slug === ARTIST.slug ? { ...artist, promotion_source: "auto" } : artist));
  const lone = [STRONG];
  const auto = decide(lone, STRONG, { artists: autoArtists });
  assert("   an auto-promoted artist whose own page is noindex blocks an otherwise strong page", sameReasons(auto, [R.ARTIST_NOT_INDEXABLE]) && auto.inputs.routeAction === "render");

  const upsell = decide(EVENTS, UPSELL);
  assert("9. a non-performance listing is ineligible (and 404s)", upsell.reasons.includes(R.NON_PERFORMANCE) && upsell.reasons.includes(R.NOT_ADDRESSABLE));

  for (const [label, event] of [["10. cancelled", CANCELLED], ["11. postponed", POSTPONED]]) {
    const decision = decide(EVENTS, event);
    assert(`${label} is ineligible as lifecycle_held while its page still serves`, decision.reasons.includes(R.LIFECYCLE_HELD) && decision.inputs.routeAction === "render" && !decision.eligible && !decision.reasons.includes(R.NOT_COMMERCIALLY_LIVE));
  }
  const unknown = decide(EVENTS, UNKNOWN);
  assert("12. an unrecognised status is lifecycle_held with no event schema", unknown.reasons.includes(R.LIFECYCLE_HELD) && unknown.reasons.includes(R.NO_EVENT_SCHEMA));

  const rescheduled = decide(EVENTS, RESCHEDULED);
  assert("13. a rescheduled date on its current date may pass (EventRescheduled)", rescheduled.eligible && rescheduled.inputs.eventStatus === "https://schema.org/EventRescheduled");

  const pending = decide(EVENTS, PRE_ONSALE);
  assert("14. a pre-on-sale date with live resale links is ineligible only for its missing MusicEvent", sameReasons(pending, [R.NO_EVENT_SCHEMA]) && pending.inputs.schemaReason === "pre_onsale" && pending.inputs.commerciallyLive);
  const afterOnsale = Date.parse("2026-08-21T00:00:00Z");
  assert("   and becomes eligible once its stored public on-sale passes", decide(EVENTS, PRE_ONSALE, { now: afterOnsale }).eligible);
  const bare = fixtureEvent("fixture-bare-pending", "2026-09-21T02:00:00Z", { city: "Waverly Hills", venue: "Waverly Hall", public_onsale_at: "2026-08-20T15:00:00Z" }, { lanes: [] });
  assert("   a pre-on-sale date with no resale link is also not commercially live", decide([...EVENTS, bare], bare).reasons.includes(R.NOT_COMMERCIALLY_LIVE));

  const resale = decide(EVENTS, RESALE_ONLY);
  assert("15. a resale-only record (no Ticketmaster source) is ineligible only for its missing MusicEvent", sameReasons(resale, [R.NO_EVENT_SCHEMA]) && resale.inputs.schemaReason === "no_ticketmaster_source" && resale.inputs.destinationCount === 4);
  assert("16. no MusicEvent fails with no_event_schema", [unknown, pending, resale].every((decision) => decision.reasons.includes(R.NO_EVENT_SCHEMA)));

  const past = decide(EVENTS, PAST);
  assert("18. a past event (301 to its parent) is not_addressable and not_upcoming", past.inputs.routeAction === "redirect" && past.reasons.includes(R.NOT_ADDRESSABLE) && past.reasons.includes(R.NOT_UPCOMING));
  const noDestination = decide(EVENTS, NO_DESTINATION);
  assert("   a date with nowhere to lead (301) is not_addressable", noDestination.inputs.routeAction === "redirect" && noDestination.reasons.includes(R.NOT_ADDRESSABLE));
  const dateOnly = decide(EVENTS, DATE_ONLY);
  assert("   a record with no canonical path (404) is not_addressable", dateOnly.path === "" && dateOnly.reasons.includes(R.NOT_ADDRESSABLE));
  assert("   an event whose artist has no record (404) is not_addressable", decide(EVENTS, STRONG, { artists: [] }).reasons.includes(R.NOT_ADDRESSABLE));

  const single = decide(EVENTS, STRONG);
  assert("19. a single-date artist-city event qualifies", single.eligible && policy.eventArtistCityRelation(EVENTS, STRONG, { now: NOW }) === REL.NOINDEX_SINGLE_DATE);
  assert("20. a multi-date artist-city event qualifies", decide(EVENTS, MULTI_A).eligible && decide(EVENTS, MULTI_B).eligible && policy.eventArtistCityRelation(EVENTS, MULTI_A, { now: NOW }) === REL.INDEXABLE);
  assert("   a city with no rendered artist-city page is reported absent", policy.eventArtistCityRelation(EVENTS, NO_DESTINATION, { now: NOW }) === REL.ABSENT);
}

// 17. Duplicate ambiguity.
{
  const at = (id, iso, extra = {}, options) => fixtureEvent(id, iso, { city: "Evergreen Terrace", venue: "Terrace Arena", ...extra }, options);
  const groupOf = (events) => policy.deriveEventDuplicateGroups(events).filter((group) => group.kind === "same_date");

  const twin = [at("twin-a", "2026-09-30T01:00:00Z"), at("twin-b", "2026-09-30T01:00:00Z", { venue: "Terrace Arena (Main Hall)" })];
  const [twinGroup] = groupOf(twin);
  assert("17. two rows for one start instant are one performance listed twice", twinGroup?.classification === D.SAME_PERFORMANCE);
  assert("   and both fail duplicate_ambiguity", twin.every((event) => sameReasons(decide(twin, event), [R.DUPLICATE_AMBIGUITY])));

  const listingA = at("listing-a", "2026-09-30T01:00:00Z");
  const listingB = at("listing-b", "2026-09-30T02:30:00Z", { venue: "Terrace Club Room" });
  listingB.provider_links = { ...listingB.provider_links, "vivid-seats": { ...listingA.provider_links["vivid-seats"] } };
  assert("   rows sharing a provider listing on one date are the same performance", groupOf([listingA, listingB])[0]?.classification === D.SAME_PERFORMANCE);

  const vague = [at("vague-a", "2026-09-30T01:00:00Z"), at("vague-b", "2026-09-30T03:00:00Z", { venue: "Other Venue" })];
  assert("   different venues and times with nothing shared stay ambiguous, both excluded", groupOf(vague)[0]?.classification === D.AMBIGUOUS && vague.every((event) => decide(vague, event).reasons.includes(R.DUPLICATE_AMBIGUITY)));

  const twoShows = [at("matinee", "2026-09-29T19:00:00Z"), at("evening", "2026-09-30T01:00:00Z")];
  assert("   a matinee and an evening show at one venue are distinct performances, both eligible", groupOf(twoShows)[0]?.classification === D.DISTINCT_PERFORMANCES && twoShows.every((event) => decide(twoShows, event).eligible));
  const doors = [at("doors", "2026-09-30T00:00:00Z"), at("show", "2026-09-30T01:30:00Z")];
  assert("   a same-venue gap under three hours is not enough to call them distinct", groupOf(doors)[0]?.classification === D.AMBIGUOUS);

  const concert = at("concert", "2026-09-30T01:00:00Z");
  const upsell = at("concert-upsell", "2026-09-30T01:01:00Z", { event_name: `${ARTIST.name} | Venue Premium Packages`, venue: "Terrace Club" });
  assert("   a non-performance variant leaves the concert row unambiguous", groupOf([concert, upsell])[0]?.classification === D.NON_PERFORMANCE_VARIANT && decide([concert, upsell], concert).eligible);

  const addOn = at("concert-add-on", "2026-09-30T02:00:00Z", { event_name: `${concert.event_name} | Bistronomy Experience`, venue: "Legacy Lounge" });
  const addOnGroup = groupOf([concert, addOn])[0];
  assert("   an add-on product named '<concert> | …' is excluded and the concert stays eligible", addOnGroup?.classification === D.ADD_ON_VARIANT && decide([concert, addOn], concert).eligible && decide([concert, addOn], addOn).reasons.includes(R.DUPLICATE_AMBIGUITY));

  const nightOne = fixtureEvent("night-one", "2026-10-01T01:00:00Z", { city: "Evergreen Terrace", venue: "Terrace Arena" });
  const nightTwo = fixtureEvent("night-two", "2026-10-02T01:00:00Z", { city: "Evergreen Terrace", venue: "Terrace Arena" });
  nightOne.provider_links = { ...nightOne.provider_links, ticketnetwork: { ...nightTwo.provider_links.ticketnetwork } };
  const shared = policy.deriveEventDuplicateGroups([nightOne, nightTwo]);
  assert("   two nights claiming one resale listing are both excluded (one is mapped to the wrong night)", shared.length === 1 && shared[0].classification === D.SHARED_PROVIDER_LISTING && [nightOne, nightTwo].every((event) => decide([nightOne, nightTwo], event).reasons.includes(R.DUPLICATE_AMBIGUITY)));
  const upsellShare = at("upsell-share", "2026-10-01T02:00:00Z", { event_name: `${ARTIST.name} | Premium Seats` });
  upsellShare.provider_links = { ...upsellShare.provider_links, ticketnetwork: { ...nightTwo.provider_links.ticketnetwork } };
  assert("   an upsell row sharing the concert's listing does not taint the concert", decide([nightTwo, upsellShare], nightTwo).eligible);
  assert("   the order of the records does not change any duplicate verdict", JSON.stringify(decide([nightTwo, nightOne], nightOne).reasons) === JSON.stringify(decide([nightOne, nightTwo], nightOne).reasons));
}

// 21–22. Stable reason codes; determinism.
{
  const PINNED = {
    NOT_ADDRESSABLE: "not_addressable",
    ARTIST_NOT_INDEXABLE: "artist_not_indexable",
    NOT_UPCOMING: "not_upcoming",
    LIFECYCLE_HELD: "lifecycle_held",
    NOT_COMMERCIALLY_LIVE: "not_commercially_live",
    NON_PERFORMANCE: "non_performance",
    NO_EVENT_SCHEMA: "no_event_schema",
    BELOW_DESTINATION_THRESHOLD: "below_destination_threshold",
    NO_SNAPSHOT_READY_LANE: "no_snapshot_ready_lane",
    DUPLICATE_AMBIGUITY: "duplicate_ambiguity"
  };
  assert("21. the reason codes are pinned (add a code; never rename one)", JSON.stringify(R) === JSON.stringify(PINNED) && Object.isFrozen(R));
  const all = EVENTS.map((event) => decide(EVENTS, event));
  const codes = new Set(Object.values(R));
  assert("   every ineligible fixture has at least one reason, every reason a known code", all.every((d) => d.eligible === (d.reasons.length === 0) && d.reasons.every((reason) => codes.has(reason))));
  assert("22. the decision is deterministic across runs", JSON.stringify(EVENTS.map((event) => decide(EVENTS, event))) === JSON.stringify(all));
  assert("   and across record order", EVENTS.every((event) => JSON.stringify(decide([...EVENTS].reverse(), event)) === JSON.stringify(decide(EVENTS, event))));
}

// Rollout gate and the frozen pilot list.
{
  const eligible = decide(EVENTS, STRONG);
  const ineligible = decide(EVENTS, ONE_LANE);
  const on = { EVENT_PAGES_INDEXING: "pilot" };
  assert("rollout: nothing is indexable with the flag unset", eventPageIndexingDecision(eligible, {}, { pilotKeys: [eligible.key] }).reason === ROLLOUT.INDEXING_OFF);
  assert("rollout: any value but \"pilot\" is off", ["true", "1", "all", "", "pilot,all", "pilots", "on", "PILOT", "Pilot", " pilot ", "pilot\n", "pilot "].every((value) => !eventPageIndexingDecision(eligible, { EVENT_PAGES_INDEXING: value }, { pilotKeys: [eligible.key] }).indexable));
  assert("rollout: the flag alone indexes nothing without the key", eventPageIndexingDecision(eligible, on, { pilotKeys: [] }).reason === ROLLOUT.NOT_IN_PILOT);
  assert("rollout: a pilot key never overrides the policy", eventPageIndexingDecision(ineligible, on, { pilotKeys: [ineligible.key] }).reason === ROLLOUT.NOT_ELIGIBLE);
  assert("rollout: eligible AND pilot flag AND stable key listed -> indexable", eventPageIndexingDecision(eligible, on, { pilotKeys: [eligible.key] }).indexable);
  const renamed = { ...STRONG, venue: "Renamed Arena" };
  const renamedDecision = decide(EVENTS.map((event) => (event.id === STRONG.id ? renamed : event)), renamed);
  assert(
    "rollout: the key survives a venue rename (keys, not readable slugs)",
    renamedDecision.path !== eligible.path && eventPageIndexingDecision(renamedDecision, on, { pilotKeys: [eligible.key] }).indexable
  );
  assert("rollout: production uses the repo list, so an eligible non-pilot event is not indexable", eventPageIndexingDecision(eligible, on).reason === ROLLOUT.NOT_IN_PILOT);

  // deriveEventIndexingPilot: the one runtime answer, fail-closed at each step.
  const derive = (envValue, options = {}) => policy.deriveEventIndexingPilot(EVENTS, artistsMeta, envValue, { hostIndexable: true, lanesFor: (event) => lanesOf(event), now: NOW, pilotKeys: [eligible.key, ineligible.key, "ffffffffffffffff"], ...options });
  const active = derive(on);
  assert("pilot: active on the canonical host with the flag, one member per key", active.active && active.members.length === 3);
  assert("pilot: only the eligible pilot key is indexed", active.indexed.length === 1 && active.pathById.get(STRONG.id) === eligible.path);
  assert("pilot: an ineligible pilot key is listed but not indexed", active.members.find((member) => member.key === ineligible.key)?.reason === ROLLOUT.NOT_ELIGIBLE);
  assert("pilot: a key naming no event fails closed", active.members.find((member) => member.key === "ffffffffffffffff")?.reason === ROLLOUT.UNKNOWN_KEY);
  assert("pilot: inactive off the canonical host (previews, *.pages.dev)", derive(on, { hostIndexable: false }).reason === ROLLOUT.HOST_NOT_INDEXABLE && derive(on, { hostIndexable: false }).indexed.length === 0);
  assert("pilot: inactive when the host rule is not stated", policy.deriveEventIndexingPilot(EVENTS, artistsMeta, on, { lanesFor: (event) => lanesOf(event), now: NOW, pilotKeys: [eligible.key] }).indexed.length === 0);
  assert("pilot: inactive with the flag absent or malformed (exact match only)", [{}, { EVENT_PAGES_INDEXING: "all" }, { EVENT_PAGES_INDEXING: "" }, { EVENT_PAGES_INDEXING: "PILOT" }, { EVENT_PAGES_INDEXING: " pilot " }, { EVENT_PAGES_INDEXING: true }, null].every((envValue) => derive(envValue).reason === ROLLOUT.INDEXING_OFF));
  assert("pilot: no lane source fails every threshold", policy.deriveEventIndexingPilot(EVENTS, artistsMeta, on, { hostIndexable: true, now: NOW, pilotKeys: [eligible.key] }).indexed.length === 0);
  assert("pilot: an empty events file indexes nothing", policy.deriveEventIndexingPilot([], artistsMeta, on, { hostIndexable: true, lanesFor: () => ALL_LANES, now: NOW }).indexed.length === 0);
  assert("pilot: only pilot keys are evaluated, so the indexed set never exceeds the list", derive(on, { pilotKeys: [eligible.key] }).indexed.length === 1 && decide(EVENTS, MULTI_A).eligible);

  // The frozen cohort: 30 unique stable keys, pinned to the experiment record.
  const keys = policy.EVENT_INDEXING_PILOT_KEYS;
  const record = readJson("data/event-indexing-pilot.json");
  assert("pilot list: exactly 30 unique 16-hex stable keys, frozen", keys.length === 30 && new Set(keys).size === 30 && keys.every((key) => /^[0-9a-f]{16}$/.test(key)) && Object.isFrozen(keys));
  assert("pilot list: identical, in order, to data/event-indexing-pilot.json", JSON.stringify(record.members.map((member) => member.key)) === JSON.stringify([...keys]));
  assert("pilot record: every member's key is eventKey(event_id) and ends its canonical path", record.members.every((member) => eventPages.eventKey(member.event_id) === member.key && member.canonical_path.endsWith(`-${member.key}`)));
  assert("pilot record: 30 artists, 11 multi-date and 19 single-date cities", new Set(record.members.map((member) => member.artist_slug)).size === 30 && record.members.filter((member) => member.artist_city === "multi_date").length === 11 && record.members.filter((member) => member.artist_city === "single_date").length === 19);
  assert("pilot record: every member was selected with ≥2 destinations and ≥1 snapshot lane", record.members.every((member) => member.destinations >= 2 && member.snapshot_ready_lanes >= 1 && member.destination_lanes.length === member.destinations));
  assert("pilot record: selected on 2026-09-27 from the stated main", record.selected_on === "2026-09-27" && record.selected_from.main_sha === "596bacef4c6eb3a48519d484e5372500b3359db2");

  const wrangler = fs.readFileSync(path.join(ROOT, "wrangler.toml"), "utf8");
  assert("rollout: wrangler.toml [vars] sets EVENT_PAGES_INDEXING = \"pilot\" (repo-managed, not dashboard-only)", /^EVENT_PAGES_INDEXING = "pilot"$/m.test(wrangler) && (await load("scripts/lib/event-indexability-audit.mjs")).wranglerVars(wrangler).EVENT_PAGES_INDEXING === "pilot");
  const importers = fs
    .readdirSync(path.join(ROOT, "functions"), { recursive: true })
    .filter((file) => String(file).endsWith(".js"))
    .filter((file) => /_event-indexability\.js["']/.test(fs.readFileSync(path.join(ROOT, "functions", String(file)), "utf8")))
    .map(String);
  assert(`rollout: only the router reads the policy at runtime; the sitemaps and llms.txt go through its eventIndexingPilotFor (got ${importers.join(", ") || "none"})`, importers.join(",") === "[[path]].js");
  const router = fs.readFileSync(path.join(ROOT, "functions/[[path]].js"), "utf8");
  const eventRoute = router.slice(router.indexOf("function eventPageRoute("), router.indexOf("function eventStatusFact("));
  assert("rollout: the router's event route defaults to indexable: false (only the active pilot lifts it)", /\n\s*indexable: false,\n/.test(eventRoute));
}

// Offline CTA mirror: the pre-on-sale branch the renderer applies.
{
  assert("mirror: no Ticketmaster lane before the public on-sale", !coverage.providerEventPublishable(PRE_ONSALE, "ticketmaster", NOW) && coverage.providerEventPublishable(PRE_ONSALE, "ticketmaster", Date.parse("2026-08-21T00:00:00Z")));
  assert("mirror: a verified resale lane publishes before the on-sale", coverage.providerEventPublishable(PRE_ONSALE, "vivid-seats", NOW));
  const unverified = { ...PRE_ONSALE, provider_links: { ...PRE_ONSALE.provider_links, "vivid-seats": { verified: false } } };
  assert("mirror: an unverified fallback waits for the on-sale", !coverage.providerEventPublishable(unverified, "vivid-seats", NOW));
}

// ─── rendered pages: flag off, not in the pilot (23–27) ─────────────────────

const ASSET_FILES = ["index.html", "data/catalog.json", "data/artists.json", "data/guides-content.json", "data/blog-content.json", "data/provider-configs.json"];
const assets = new Map();
for (const file of ASSET_FILES) assets.set(`/${file}`, fs.readFileSync(path.join(ROOT, "public", file), "utf8"));
assets.set("/", assets.get("/index.html"));
function env(events, extra = {}) {
  const map = new Map(assets);
  map.set("/data/events.json", JSON.stringify(events));
  return {
    MOCK_MODE: "false",
    ALLOW_MOCK_PRICES: "false",
    TICKETMASTER_DISCOVERY_ENABLED: "false",
    SCHEMA_OFFERS_ENABLED: "true",
    IMPACT_SEATGEEK_ACCOUNT_SID: "fixture-sid",
    IMPACT_SEATGEEK_AUTH_TOKEN: "fixture-token",
    IMPACT_SEATGEEK_CAMPAIGN_ID: "1234",
    IMPACT_ACCOUNT_SID: "fixture-sid",
    IMPACT_AUTH_TOKEN: "fixture-token",
    IMPACT_VIVIDSEATS_CAMPAIGN_ID: "5678",
    TICKETNETWORK_PUBLIC_ENABLED: "true",
    STUBHUB_INTERNATIONAL_PUBLIC_ENABLED: "true",
    ASSETS: {
      async fetch(request) {
        const body = map.get(new URL(request.url).pathname);
        return body == null ? new Response("not found", { status: 404 }) : new Response(body, { status: 200 });
      }
    },
    ...extra
  };
}
async function render(pathname, envValue) {
  const response = await middleware.onRequest({ request: new Request(`${ORIGIN}${pathname}`), env: envValue, next: () => new Response("static", { status: 200 }) });
  return { status: response.status, html: await response.text() };
}
const robotsOf = (html) => (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || "";
const jsonLdOf = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => match[1]).join("\n");

async function renderAt(origin, pathname, envValue) {
  const response = await middleware.onRequest({ request: new Request(`${origin}${pathname}`), env: envValue, next: () => new Response("static", { status: 200 }) });
  return { status: response.status, location: response.headers.get("location") || "", html: await response.text() };
}
const canonicalOf = (html) => (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || "";
const graphOf = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((match) => {
  const data = JSON.parse(match[1]);
  return Array.isArray(data?.["@graph"]) ? data["@graph"] : [data];
});
const mainOf = (html) => (html.match(/<main id="mainContent">([\s\S]*?)<\/main>/) || [])[1] || "";
async function discovery(envValue, origin = ORIGIN) {
  const docs = {};
  const sitemap = await load("functions/sitemap.xml.js");
  docs["sitemap.xml"] = await (await sitemap.onRequestGet({ request: new Request(`${origin}/sitemap.xml`), env: envValue })).text();
  docs["sitemap-index.xml"] = await (await (await load("functions/sitemap-index.xml.js")).onRequestGet({ request: new Request(`${origin}/sitemap-index.xml`), env: envValue })).text();
  for (const segment of sitemap.SITEMAP_SEGMENTS) {
    const { onRequestGet } = await load(`functions/sitemaps/${segment}.xml.js`);
    docs[`sitemaps/${segment}.xml`] = await (await onRequestGet({ request: new Request(`${origin}/sitemaps/${segment}.xml`), env: envValue })).text();
  }
  docs["llms.txt"] = await (await (await load("functions/llms.txt.js")).onRequestGet({ request: new Request(`${origin}/llms.txt`), env: envValue })).text();
  return docs;
}
const eventUrls = (body) => [...String(body).matchAll(/https:\/\/tourticketcompare\.com(\/events\/[a-z0-9-]+)/g)].map((match) => match[1]);

{
  // None of the fixture's events holds a pilot key, so with the flag off,
  // malformed, or on, every served page stays noindex,follow and nothing is
  // discoverable. A D1 that throws changes nothing either.
  const brokenDb = { prepare() { throw new Error("D1 unavailable"); } };
  const envs = [["no flag", env(EVENTS)], ["flag malformed", env(EVENTS, { EVENT_PAGES_INDEXING: "all" })], ["flag pilot, no pilot key", env(EVENTS, { EVENT_PAGES_INDEXING: "pilot" })], ["D1 throwing", env(EVENTS, { DEMAND_DB: brokenDb, EVENT_PAGES_INDEXING: "pilot" })]];
  const served = EVENTS.filter((event) => decide(EVENTS, event).inputs.routeAction === "render");
  assert("fixture serves eligible and ineligible pages", served.some((event) => decide(EVENTS, event).eligible) && served.some((event) => !decide(EVENTS, event).eligible));
  for (const [label, envValue] of envs) {
    const robots = [];
    for (const event of served) {
      const page = await render(eventPages.eventPath(event), envValue);
      robots.push(page.status === 200 ? robotsOf(page.html) : `status ${page.status}`);
    }
    assert(`23. every served event page renders noindex,follow (${label})`, robots.every((value) => value === "noindex,follow"));
    const docs = await discovery(envValue);
    assert(`24. no sitemap document lists an event URL (${label})`, Object.entries(docs).filter(([name]) => name !== "llms.txt").every(([, body]) => body.length > 0 && !body.includes("/events/")) && !docs["sitemap-index.xml"].includes("sitemaps/events.xml"));
    assert(`25. llms.txt lists no event URL (${label})`, docs["llms.txt"].length > 0 && !docs["llms.txt"].includes("/events/"));
  }
  // 26–27. Parent pages: event links are the router's served paths only; their
  // structured data keeps its #show-<id> identities and references no event page.
  const parent = await render(`/artists/${ARTIST.slug}`, env(EVENTS, { EVENT_PAGES_INDEXING: "pilot" }));
  const links = [...new Set([...parent.html.matchAll(/href="(\/events\/[^"#?]*)"/g)].map((match) => match[1]))].sort();
  const expected = EVENTS.filter((event) => eventPages.eventPageLinkPath(EVENTS, artistsMeta, event) !== "").map((event) => eventPages.eventPath(event)).sort();
  assert("26. the parent board links exactly the served event pages", parent.status === 200 && JSON.stringify(links) === JSON.stringify(expected));
  const jsonLd = jsonLdOf(parent.html);
  assert("27. non-pilot parent structured data is unchanged: #show-<id> urls, no event-page identity", jsonLd.includes(`/artists/${ARTIST.slug}#show-`) && !jsonLd.includes("/events/") && !jsonLd.includes("#event\""));
}

// ─── rendered pages: the pilot (P1–P33) ─────────────────────────────────────
//
// Fixture rows built on real pilot event ids: the stable key is a hash of the
// id alone, so each row holds a key from EVENT_INDEXING_PILOT_KEYS while every
// other field is fixture data. Rendered through the real middleware.
{
  const pilotIds = readJson("data/event-indexing-pilot.json").members.map((member) => member.event_id);
  const PILOT = fixtureEvent(pilotIds[0], "2026-09-27T01:00:00Z", { city: "Pilotville", venue: "Pilot Arena" });
  const PILOT_MULTI = fixtureEvent(pilotIds[1], "2026-09-14T01:00:00Z", { city: "Shelbyville", venue: "Shelby Hall" });
  const PILOT_CANCELLED = fixtureEvent(pilotIds[2], "2026-09-28T01:00:00Z", { city: "Cancelburg", venue: "Cancel Hall", ticketmaster_status_code: "cancelled" });
  const PILOT_POSTPONED = fixtureEvent(pilotIds[3], "2026-09-29T01:00:00Z", { city: "Postponia", venue: "Postpone Hall", ticketmaster_status_code: "postponed" });
  const PILOT_THIN = fixtureEvent(pilotIds[4], "2026-09-30T01:00:00Z", { city: "Thinton", venue: "Thin Hall" }, { lanes: [] });
  const PILOT_UPSELL = fixtureEvent(pilotIds[5], "2026-10-01T01:00:00Z", { city: "Upsellia", venue: "Upsell Hall", event_name: `${ARTIST.name} | Premium Seats` });
  const PILOT_DUP = fixtureEvent(pilotIds[6], "2026-10-02T01:00:00Z", { city: "Twinsburg", venue: "Twin Hall" });
  const TWIN = fixtureEvent("fixture-twin-listing", "2026-10-02T01:00:00Z", { city: "Twinsburg", venue: "Twin Hall" });
  const pilotRows = [PILOT, PILOT_MULTI, PILOT_CANCELLED, PILOT_POSTPONED, PILOT_THIN, PILOT_UPSELL];
  const ALL = [...EVENTS, ...pilotRows];
  const keyOf = (event) => eventPages.eventKey(event.id);
  assert("P0. the fixture's pilot rows hold real pilot keys", [...pilotRows, PILOT_DUP].every((event) => policy.EVENT_INDEXING_PILOT_KEYS.includes(keyOf(event))) && !policy.EVENT_INDEXING_PILOT_KEYS.includes(keyOf(STRONG)));
  const on = env(ALL, { EVENT_PAGES_INDEXING: "pilot" });
  const off = env(ALL);
  const P = eventPages.eventPath(PILOT);

  const pilotPage = await render(P, on);
  assert("P1. eligible + pilot flag + allowlisted key -> index,follow", pilotPage.status === 200 && robotsOf(pilotPage.html).startsWith("index,follow") && decide(ALL, PILOT).eligible);
  assert("P2. eligible + pilot flag + not allowlisted -> noindex,follow", robotsOf((await render(eventPages.eventPath(STRONG), on)).html) === "noindex,follow" && decide(ALL, STRONG).eligible);
  assert("P3. eligible pilot key + flag absent -> noindex,follow", robotsOf((await render(P, off)).html) === "noindex,follow");
  for (const value of ["all", "true", "", "index", "PILOT", " pilot "]) {
    assert(`P4. eligible pilot key + flag "${value}" -> noindex,follow`, robotsOf((await render(P, env(ALL, { EVENT_PAGES_INDEXING: value }))).html) === "noindex,follow");
  }
  assert("P5. an allowlisted key whose event is ineligible -> noindex,follow", robotsOf((await render(eventPages.eventPath(PILOT_THIN), on)).html) === "noindex,follow" && !decide(ALL, PILOT_THIN).eligible);
  const cancelledPage = await render(eventPages.eventPath(PILOT_CANCELLED), on);
  const postponedPage = await render(eventPages.eventPath(PILOT_POSTPONED), on);
  assert("P6. a cancelled pilot event keeps its page but renders noindex,follow", cancelledPage.status === 200 && robotsOf(cancelledPage.html) === "noindex,follow");
  assert("P7. a postponed pilot event keeps its page but renders noindex,follow", postponedPage.status === 200 && robotsOf(postponedPage.html) === "noindex,follow");
  const withDup = [...ALL, PILOT_DUP, TWIN];
  assert("P8a. the duplicate fixture is eligible before its twin lands", decide([...ALL, PILOT_DUP], PILOT_DUP).eligible && robotsOf((await render(eventPages.eventPath(PILOT_DUP), env([...ALL, PILOT_DUP], { EVENT_PAGES_INDEXING: "pilot" }))).html).startsWith("index"));
  const dupPage = await render(eventPages.eventPath(PILOT_DUP), env(withDup, { EVENT_PAGES_INDEXING: "pilot" }));
  assert("P8. duplicate ambiguity introduced -> the pilot event renders noindex,follow", robotsOf(dupPage.html) === "noindex,follow" && decide(withDup, PILOT_DUP).reasons.includes(R.DUPLICATE_AMBIGUITY));
  const lostCoverage = ALL.map((event) => (event.id === PILOT.id ? { ...PILOT, provider_links: { ticketmaster: PILOT.provider_links.ticketmaster }, seatgeek_url: "", vividseats_url: "", ticketnetwork_url: "", stubhub_international_url: "" } : event));
  const lostPage = await render(P, env(lostCoverage, { EVENT_PAGES_INDEXING: "pilot" }));
  assert("P9. provider coverage falling below the threshold -> noindex,follow", lostPage.status === 200 && robotsOf(lostPage.html) === "noindex,follow");
  assert("P10. a pilot key on a non-performance listing follows normal route rules (404)", (await render(eventPages.eventPath(PILOT_UPSELL), on)).status === 404);
  assert("P11. the active pilot page is self-canonical", canonicalOf(pilotPage.html) === `${ORIGIN}${P}`);
  const stale = `/events/${ARTIST.slug}-old-arena-pilotville-2026-09-26-${keyOf(PILOT)}`;
  const staleResponse = await renderAt(ORIGIN, stale, on);
  assert("P12. a stale readable slug still 301s to the canonical event URL", staleResponse.status === 301 && new URL(staleResponse.location).pathname === P);

  const docs = await discovery(on);
  const eventsXml = eventUrls(docs["sitemaps/events.xml"]);
  assert("P13. the active pilot event is in the events sitemap and /sitemap.xml", eventsXml.includes(P) && eventUrls(docs["sitemap.xml"]).includes(P));
  assert("P14. an eligible non-pilot event is in no sitemap or llms.txt", !Object.values(docs).some((body) => body.includes(eventPages.eventPath(STRONG))));
  const ineligiblePilotPaths = [PILOT_CANCELLED, PILOT_POSTPONED, PILOT_THIN, PILOT_UPSELL].map((event) => eventPages.eventPath(event));
  assert("P15. ineligible pilot events (cancelled, postponed, thin, upsell) are in no sitemap or llms.txt", ineligiblePilotPaths.every((eventPath) => !Object.values(docs).some((body) => body.includes(eventPath))));
  assert("P16. no sitemap lists an event URL twice", eventsXml.length === new Set(eventsXml).size && eventUrls(docs["sitemap.xml"]).length === new Set(eventUrls(docs["sitemap.xml"])).size);
  const activePaths = [P, eventPages.eventPath(PILOT_MULTI)].sort();
  assert("P16b. the events sitemap is exactly the active pilot", JSON.stringify([...eventsXml].sort()) === JSON.stringify(activePaths));
  assert("P16c. no other sitemap segment lists an event URL; the index lists the events segment", Object.entries(docs).filter(([name]) => name.startsWith("sitemaps/") && name !== "sitemaps/events.xml").every(([, body]) => !body.includes("/events/")) && docs["sitemap-index.xml"].includes(`${ORIGIN}/sitemaps/events.xml`));
  assert("P29. the sitemap's event count equals the active pilot count", eventsXml.length === activePaths.length && eventUrls(docs["sitemap.xml"]).length === activePaths.length);
  assert("P30. llms.txt lists exactly the active pilot, each once, under its own heading", JSON.stringify(eventUrls(docs["llms.txt"]).sort()) === JSON.stringify(activePaths) && docs["llms.txt"].includes("## Individual event pages"));
  const offDocs = await discovery(off);
  assert("P30b. with the flag off the events segment is empty and unlisted, and llms.txt has no event section", !offDocs["sitemaps/events.xml"].includes("<url>") && !offDocs["sitemap-index.xml"].includes("sitemaps/events.xml") && !offDocs["llms.txt"].includes("## Individual event pages"));

  // Preview / *.pages.dev: the flag arrives from wrangler.toml, but the pilot
  // never activates off the canonical host.
  const PREVIEW = "https://0123abcd.tourticketcompare.pages.dev";
  const previewPage = await renderAt(PREVIEW, P, on);
  const previewDocs = await discovery(on, PREVIEW);
  const previewParent = await renderAt(PREVIEW, `/artists/${ARTIST.slug}`, on);
  assert("P31. on a preview host the pilot page renders noindex,follow", previewPage.status === 200 && robotsOf(previewPage.html) === "noindex,follow");
  assert("P32. on a preview host no sitemap or llms.txt lists an event URL", Object.values(previewDocs).every((body) => !body.includes("/events/")));
  assert("P33. on a preview host parent structured data keeps every #show-<id> identity", previewParent.status === 200 && !jsonLdOf(previewParent.html).includes("/events/"));

  // Parent structured data (P17–P23).
  const canonical = `${ORIGIN}${P}`;
  const eventNode = graphOf(pilotPage.html).filter((node) => node["@type"] === "MusicEvent");
  assert("P23. the event page still emits exactly one MusicEvent and no Offers", eventNode.length === 1 && eventNode[0]["@id"] === `${canonical}#event` && eventNode[0].url === canonical && !("offers" in eventNode[0]) && !jsonLdOf(pilotPage.html).includes('"Offer"'));
  const artistOn = await render(`/artists/${ARTIST.slug}`, on);
  const artistOff = await render(`/artists/${ARTIST.slug}`, off);
  const nodesOn = graphOf(artistOn.html).filter((node) => node["@type"] === "MusicEvent");
  const nodesOff = graphOf(artistOff.html).filter((node) => node["@type"] === "MusicEvent");
  const pilotNode = nodesOn.find((node) => node.url === canonical);
  const pilotNodeOff = nodesOff.find((node) => node.url === `${ORIGIN}/artists/${ARTIST.slug}#show-${PILOT.id}`);
  assert("P17. the artist page's MusicEvent for the pilot event uses its canonical event URL", Boolean(pilotNode) && !jsonLdOf(artistOn.html).includes(`#show-${PILOT.id}"`));
  assert("P18. its @id is the event page's @id (page + #event)", pilotNode?.["@id"] === eventNode[0]["@id"]);
  const strip = (node) => JSON.stringify({ ...node, url: undefined, "@id": undefined });
  assert("P22. the pilot node keeps every other field, offers included (identity only)", Boolean(pilotNodeOff) && strip(pilotNode) === strip(pilotNodeOff));
  const multiCanonical = `${ORIGIN}${eventPages.eventPath(PILOT_MULTI)}`;
  const isPilotNode = (node) => [canonical, multiCanonical, pilotNodeOff?.url, `${ORIGIN}/artists/${ARTIST.slug}#show-${PILOT_MULTI.id}`].includes(node.url);
  const others = (nodes) => nodes.filter((node) => !isPilotNode(node)).map((node) => JSON.stringify(node));
  assert("P20. every non-pilot MusicEvent on the artist page is byte-identical with the pilot on and off", others(nodesOn).length > 0 && JSON.stringify(others(nodesOn)) === JSON.stringify(others(nodesOff)) && nodesOn.filter((node) => node["@id"]).length === 2 && nodesOff.every((node) => !node["@id"]));
  assert("P21. the parent's visible page (cards, links, CTAs) is identical with the pilot on and off", mainOf(artistOn.html).length > 0 && mainOf(artistOn.html) === mainOf(artistOff.html));
  // Across parent surfaces: the multi-date pilot event on the artist page and
  // its indexable artist-city page (ListItem included) carries one identity.
  const cityPage = await render(`/artists/${ARTIST.slug}/tickets/shelbyville-united-states`, on);
  const cityGraph = graphOf(cityPage.html);
  const cityNode = cityGraph.find((node) => node["@type"] === "MusicEvent" && node.url === multiCanonical);
  const listItems = cityGraph.flatMap((node) => node?.mainEntity?.itemListElement || node?.itemListElement || []);
  const multiArtistNode = nodesOn.find((node) => node.url === multiCanonical);
  assert("P19. one identity across parent surfaces: artist page and artist-city page (MusicEvent and ListItem)", cityPage.status === 200 && robotsOf(cityPage.html).startsWith("index") && cityNode?.["@id"] === `${multiCanonical}#event` && multiArtistNode?.["@id"] === cityNode?.["@id"] && listItems.some((item) => item.url === multiCanonical) && !jsonLdOf(cityPage.html).includes(`#show-${PILOT_MULTI.id}"`));
  const multiPage = await render(eventPages.eventPath(PILOT_MULTI), on);
  assert("P19b. and it is the @id the multi-date event's own page carries", graphOf(multiPage.html).find((node) => node["@type"] === "MusicEvent")?.["@id"] === cityNode?.["@id"]);
  const parentJsonLd = jsonLdOf(artistOn.html);
  assert("P6b. a held or thin pilot event's parent node never takes the event-page identity", [PILOT_CANCELLED, PILOT_POSTPONED, PILOT_THIN].every((event) => !parentJsonLd.includes(eventPages.eventPath(event))));
  const lostParent = await render(`/artists/${ARTIST.slug}`, env(lostCoverage, { EVENT_PAGES_INDEXING: "pilot" }));
  assert("P9b. a pilot event that loses coverage returns to its #show-<id> parent identity and leaves discovery", !jsonLdOf(lostParent.html).includes(P) && !Object.values(await discovery(env(lostCoverage, { EVENT_PAGES_INDEXING: "pilot" }))).some((body) => body.includes(P)));
}

// ─── real data invariants ───────────────────────────────────────────────────

Date.now = realNow;
{
  const events = readJson("public/data/events.json");
  const now = Date.now();
  const isConfigured = coverage.providerConfiguredTest(catalog);
  const decisions = policy.deriveEventIndexability(events, artistsMeta, { lanesFor: (event) => coverage.publishableLaneSlugs(event, isConfigured, now), now });
  const eligible = decisions.filter((decision) => decision.eligible);
  assert(`real data: some events are eligible (${eligible.length} of ${decisions.length})`, eligible.length > 0);
  assert(
    "real data: every eligible event is served, upcoming, live, a performance, schema-backed, ≥2 destinations, ≥1 snapshot lane, unambiguous",
    eligible.every((d) =>
      d.inputs.routeAction === "render" && d.inputs.upcoming && d.inputs.commerciallyLive && !d.inputs.held &&
      !d.inputs.nonPerformance.length && d.inputs.schemaEligible && d.inputs.artistPageIndexable &&
      d.inputs.destinationCount >= policy.EVENT_MIN_PUBLISHABLE_DESTINATIONS &&
      d.inputs.snapshotReadyLanes.length >= policy.EVENT_MIN_SNAPSHOT_READY_LANES && !d.inputs.duplicateGroups.length
    )
  );
  const again = policy.deriveEventIndexability(events, artistsMeta, { lanesFor: (event) => coverage.publishableLaneSlugs(event, isConfigured, now), now });
  assert("real data: two runs agree exactly", JSON.stringify(again) === JSON.stringify(decisions));
  const groups = policy.deriveEventDuplicateGroups(events);
  const unresolved = new Set([D.SAME_PERFORMANCE, D.AMBIGUOUS, D.SHARED_PROVIDER_LISTING]);
  const byId = new Map(decisions.map((decision) => [decision.id, decision]));
  assert(
    "real data: every performance row in an unresolved duplicate group is ineligible",
    groups.filter((group) => unresolved.has(group.classification)).every((group) =>
      group.ids.filter((id) => !group.evidence.nonPerformanceIds.includes(id)).every((id) => byId.get(id)?.reasons.includes(R.DUPLICATE_AMBIGUITY))
    )
  );
  const pilotKeys = new Set(policy.EVENT_INDEXING_PILOT_KEYS);
  assert(
    "real data: with the flag on, an eligible event is indexable exactly when its key is a pilot key",
    eligible.every((decision) => eventPageIndexingDecision(decision, { EVENT_PAGES_INDEXING: "pilot" }).indexable === pilotKeys.has(decision.key))
  );
  assert("real data: every pilot key names exactly one event", policy.EVENT_INDEXING_PILOT_KEYS.every((key) => eventPages.buildEventKeyIndex(events).byKey.has(key)));
}

// ─── pre-pilot data integrity (2026-09-27 cleanup) ──────────────────────────
//
// The four problem groups PR6's diagnostic found, and the invariants that stop
// each class coming back. The invariants run over whatever events.json holds,
// so an automated sync PR that reintroduces one fails here, in-job.
{
  const { urlDateConflicts, eventLocalDate } = await load("scripts/sync-impact-marketplace-events.mjs");
  const events = readJson("public/data/events.json");
  const tombstones = readJson("data/deleted-events.json").deleted_events;
  const byId = new Map(events.map((event) => [String(event.id), event]));
  const groups = policy.deriveEventDuplicateGroups(events);
  const unresolved = new Set([D.SAME_PERFORMANCE, D.AMBIGUOUS, D.SHARED_PROVIDER_LISTING]);
  // Kept rows are checked until their show has passed (past rows may be pruned).
  const keptOrPast = (id, iso) => byId.has(id) || Date.now() > Date.parse(iso);

  // Policy unchanged.
  assert(
    "integrity: the eligibility thresholds are unchanged (≥2 destinations, ≥1 snapshot lane, 3h matinee gap)",
    policy.EVENT_MIN_PUBLISHABLE_DESTINATIONS === 2 && policy.EVENT_MIN_SNAPSHOT_READY_LANES === 1 &&
      policy.EVENT_DISTINCT_PERFORMANCE_MIN_GAP_MS === 3 * 60 * 60 * 1000
  );
  assert(
    "integrity: the eligibility reason vocabulary is unchanged",
    JSON.stringify(Object.values(R)) === JSON.stringify(["not_addressable", "artist_not_indexable", "not_upcoming", "lifecycle_held", "not_commercially_live", "non_performance", "no_event_schema", "below_destination_threshold", "no_snapshot_ready_lane", "duplicate_ambiguity"])
  );

  // Wrong-night provider links (Bruno Mars, Sydney).
  const conflicting = events.flatMap((event) =>
    Object.entries(event.provider_links || {})
      .filter(([, link]) => link?.verified === true && link.url && urlDateConflicts(link.url, eventLocalDate(event)))
      .map(([lane]) => `${event.id}:${lane}`)
  );
  assert(`integrity: no verified provider URL names a different night than its event (${conflicting.join(", ") || "none"})`, conflicting.length === 0);
  const shared = groups.filter((group) => group.classification === D.SHARED_PROVIDER_LISTING).map((group) => group.key);
  assert(`integrity: no provider listing is held by two performances (${shared.join(", ") || "none"})`, shared.length === 0);
  const WRONG_NIGHT = {
    "tm-bruno-mars-2027-sydney-olympic-park-1aefz_o3ezszduv6": "2027-03-04T06:00:00Z",
    "tm-bruno-mars-2027-sydney-olympic-park-1aefz_ogknaxvi7": "2027-03-08T06:00:00Z"
  };
  assert(
    "integrity: the Sydney 4 and 8 March rows carry no TicketNetwork/Ticket Liquidator link for the following night",
    Object.entries(WRONG_NIGHT).every(([id, iso]) => keptOrPast(id, iso) && (!byId.has(id) ||
      ["ticketnetwork", "ticket-liquidator"].every((lane) => byId.get(id).provider_links?.[lane]?.verified !== true)))
  );

  // Duplicates (Shakira, Madrid; Missio, Cleveland) and the add-on (Hilary Duff, Brussels).
  const REMOVED = {
    "tm-shakira-2026-madrid-z7r9jz1aazaza": { canonical: "tm-shakira-2026-madrid-z698xz2qz16v4mzjas", key: "35bdc8ff51c46c04", iso: "2026-10-03T18:30:00Z" },
    "tm-missio-2027-cleveland-z7r9jz1aaztf7": { canonical: "tm-missio-2027-cleveland-vv17fz_8gkl63cwa", key: "6daff6a36d02b4c4", iso: "2027-01-18T00:00:00Z" },
    "tm-hilary-duff-2027-forest-brussels-z698xzg2z1k3o-w4p": { canonical: "tm-hilary-duff-2027-forest-brussels-z698xzg2z1kqm7d-k", key: "845a12e54eaffe2a", iso: "2027-05-16T16:30:00Z" }
  };
  for (const [removed, { canonical, key, iso }] of Object.entries(REMOVED)) {
    const tombstone = tombstones.find((entry) => entry.id === removed);
    assert(`integrity: ${removed} is gone and tombstoned with its Ticketmaster ids`, !byId.has(removed) && tombstone?.ticketmaster_event_id && tombstone?.ticketmaster_discovery_event_id);
    assert(`integrity: its URL key ${eventPages.eventKey(removed)} resolves to no page`, resolveNothing(events, eventPages.eventKey(removed)));
    assert(`integrity: retained ${canonical} keeps its id and key ${key}`, keptOrPast(canonical, iso) && eventPages.eventKey(canonical) === key);
  }
  const missio = byId.get("tm-missio-2027-cleveland-vv17fz_8gkl63cwa");
  assert(
    "integrity: the retained Missio row carries the duplicate's verified SeatGeek listing for the same show",
    !missio || (missio.provider_links?.seatgeek?.verified === true && String(missio.provider_links.seatgeek.event_id) === "18492738" && missio.seatgeek_url === missio.provider_links.seatgeek.url)
  );
  const sameDay = (artist, city, date) => groups.filter((group) => group.key === `${artist}|${city}|${date}`);
  assert("integrity: Shakira Madrid 2026-10-03 has one row, so no duplicate group", sameDay("shakira", "madrid", "2026-10-03").length === 0);
  assert("integrity: Missio Cleveland 2027-01-17 has one row, so no duplicate group", sameDay("missio", "cleveland", "2027-01-17").length === 0);
  assert("integrity: Hilary Duff Brussels 2027-05-16 has only the concert row", sameDay("hilary-duff", "forest-brussels", "2027-05-16").length === 0);

  // A tombstoned row never reappears, under its own id or its Ticketmaster ids.
  const guarded = new Set(tombstones.flatMap((entry) => [entry.id, entry.ticketmaster_event_id, entry.ticketmaster_discovery_event_id]).filter(Boolean).map((value) => String(value).toUpperCase()));
  const reappeared = events.filter((event) => [event.id, event.ticketmaster_event_id, event.ticketmaster_discovery_event_id].some((value) => value && guarded.has(String(value).toUpperCase()))).map((event) => event.id);
  assert(`integrity: no tombstoned event is back in events.json (${reappeared.join(", ") || "none"})`, reappeared.length === 0);

  // The duplicate diagnostic's remaining ambiguities are exactly the known ones.
  // Only groups touching an upcoming row can put a page in front of anyone.
  const { eventInstantMs } = await load("functions/_event-local-date.js");
  const touchesUpcoming = (group) => group.ids.some((id) => (eventInstantMs(byId.get(id)) ?? Infinity) > Date.now());
  const EXPECTED_UNRESOLVED = [];
  const remaining = groups.filter((group) => unresolved.has(group.classification) && touchesUpcoming(group)).map((group) => `${group.classification}:${group.key}`).sort();
  assert(`integrity: unresolved duplicate groups match the reviewed list (${remaining.join(", ") || "none"})`, JSON.stringify(remaining) === JSON.stringify(EXPECTED_UNRESOLVED));
}

function resolveNothing(events, key) {
  return eventPages.resolveEventRoute(events, artistsMeta, `/events/removed-row-${key}`, { now: Date.now() }).action === "not_found";
}

// The audit (scripts/lib/event-indexability-audit.mjs) catches each regression
// it exists for. Stub renders stand in for a broken router; the real ones are
// exercised by npm run audit:indexable-surface:check.
{
  const { loadSiteFixture } = await load("scripts/lib/route-crawl.mjs");
  const { auditEventIndexability } = await load("scripts/lib/event-indexability-audit.mjs");
  const site = await loadSiteFixture(ROOT);
  const now = Date.now();
  const good = (pathname) => ({
    status: 200,
    html: `<meta name="robots" content="noindex,follow"><link rel="canonical" href="${ORIGIN}${pathname}">` +
      `<script type="application/ld+json">${JSON.stringify({ "@graph": [{ "@type": "MusicEvent", "@id": `${ORIGIN}${pathname}#event` }] })}</script>` +
      `<main id="mainContent">${BUTTONS.get(pathname) || ""}</main>`
  });
  const isConfigured = coverage.providerConfiguredTest(catalog);
  const events = site.data.events;
  const BUTTONS = new Map(
    events.map((event) => [eventPages.eventPath(event), coverage.publishableLaneSlugs(event, isConfigured, now).map((lane) => `<a class="provider-cta" data-cta-provider="${lane}">`).join("")])
  );
  const clean = [{ name: "sitemap.xml", body: "<urlset></urlset>" }];
  const run = (render, documents = clean, pilotKeys) =>
    auditEventIndexability(site, { root: ROOT, now, render: async (pathname) => render(pathname), documents: async () => documents, pilotKeys });
  // The pre-pilot cases run with an empty pilot list: every page noindex.
  const noPilot = [];
  const baseline = await run(good, clean, noPilot);
  assert(`audit: a well-formed noindex site has no problems (${baseline.problems.length})`, baseline.problems.length === 0 && baseline.summary.rendered_noindex === baseline.summary.served);
  const indexed = await run((pathname) => ({ ...good(pathname), html: good(pathname).html.replace("noindex,follow", "index,follow") }), clean, noPilot);
  assert("audit: robots switching to index outside the pilot is a problem", indexed.problems.some((problem) => problem.includes('robots "index,follow"')));
  const anyEvent = [...BUTTONS.keys()].find(Boolean);
  const leaked = await run(good, [{ name: "sitemaps/artists.xml", body: `<loc>${ORIGIN}${anyEvent}</loc>` }, { name: "llms.txt", body: `- ${ORIGIN}${anyEvent}` }], noPilot);
  assert("audit: an event URL in a sitemap or llms.txt outside the pilot is a problem", leaked.problems.filter((problem) => problem.includes("the rollout does not index")).length === 2);
  const malformed = await run((pathname) => ({ ...good(pathname), html: good(pathname).html.replace(/<script[\s\S]*?<\/script>/, "") }), clean, noPilot);
  assert("audit: an eligible page without its MusicEvent is a problem", malformed.problems.some((problem) => problem.includes("0 MusicEvent node(s)")));
  const drift = await run((pathname) => ({ ...good(pathname), html: good(pathname).html.replace(/<a class="provider-cta" data-cta-provider="ticketmaster">/, "") }), clean, noPilot);
  assert("audit: rendered buttons drifting from the counted lanes is a problem", drift.problems.some((problem) => problem.includes("the CTA mirror has drifted")));
  const typo = await run(good, clean, ["0000000000000000"]);
  assert("audit: a pilot key that resolves to no event is a problem", typo.problems.some((problem) => problem.includes("pilot key 0000000000000000")));

  // With one active pilot key: a well-formed pilot site, then each mutation
  // the audit exists to catch.
  const policyDecisions = policy.deriveEventIndexability(events, site.data.artistsMeta, { lanesFor: (event) => coverage.publishableLaneSlugs(event, isConfigured, now), now });
  const pilotDecision = policyDecisions.find((decision) => decision.eligible && policy.EVENT_INDEXING_PILOT_KEYS.includes(decision.key));
  const otherEligible = policyDecisions.find((decision) => decision.eligible && !policy.EVENT_INDEXING_PILOT_KEYS.includes(decision.key));
  const ineligibleServed = policyDecisions.find((decision) => !decision.eligible && decision.inputs.routeAction === "render");
  const pilotEvent = events.find((event) => String(event.id).trim() === pilotDecision.id);
  const artistPath = `/artists/${pilotEvent.artist_slug}`;
  const pilotUrl = `${ORIGIN}${pilotDecision.path}`;
  const parentGraph = (nodes) => `<script type="application/ld+json">${JSON.stringify({ "@graph": nodes })}</script>`;
  const alignedNode = { "@type": "MusicEvent", "@id": `${pilotUrl}#event`, url: pilotUrl };
  const pilotSite = (overrides = {}) => (pathname) => {
    if (overrides[pathname]) return overrides[pathname];
    if (pathname === pilotDecision.path) {
      const page = good(pathname);
      return { ...page, html: page.html.replace("noindex,follow", "index,follow,max-image-preview:large").replace('<main id="mainContent">', `<main id="mainContent"><a href="${artistPath}">artist</a>`) };
    }
    if (pathname === artistPath) return { status: 200, html: parentGraph([alignedNode, { "@type": "MusicEvent", url: `${ORIGIN}${artistPath}#show-other` }]) };
    return good(pathname);
  };
  const listed = (paths) => [
    { name: "sitemaps/events.xml", body: paths.map((listedPath) => `<loc>${ORIGIN}${listedPath}</loc>`).join("") },
    { name: "sitemap.xml", body: paths.map((listedPath) => `<loc>${ORIGIN}${listedPath}</loc>`).join("") },
    { name: "llms.txt", body: paths.map((listedPath) => `- (${ORIGIN}${listedPath})`).join("\n") }
  ];
  const onePilot = [pilotDecision.key];
  const okPilot = await run(pilotSite(), listed([pilotDecision.path]), onePilot);
  assert(`audit: a well-formed pilot site has no problems (${okPilot.problems.join(" | ") || "none"})`, okPilot.problems.length === 0 && okPilot.summary.rendered_indexable === 1 && okPilot.summary.pilot_indexed === 1 && okPilot.summary.parent_nodes_aligned === 1);
  const allEligible = await run((pathname) => (policyDecisions.some((decision) => decision.eligible && decision.path === pathname) ? pilotSite({})(pilotDecision.path) : pilotSite()(pathname)), listed([pilotDecision.path]), onePilot);
  assert("audit mutation: indexing every eligible page instead of the pilot is caught", allEligible.problems.some((problem) => problem.includes("is not a pilot key")) && allEligible.problems.some((problem) => problem.includes("more than the 1 pilot keys")));
  const oneNonPilot = await run(pilotSite({ [otherEligible.path]: { ...good(otherEligible.path), html: good(otherEligible.path).html.replace("noindex,follow", "index,follow") } }), listed([pilotDecision.path]), onePilot);
  assert("audit mutation: one non-pilot page switching to index,follow is caught", oneNonPilot.problems.some((problem) => problem.includes(otherEligible.path) && problem.includes("not a pilot key")));
  const heldIndexed = await run(pilotSite({ [ineligibleServed.path]: { ...good(ineligibleServed.path), html: good(ineligibleServed.path).html.replace("noindex,follow", "index,follow") } }), listed([pilotDecision.path]), [...onePilot, ineligibleServed.key]);
  assert("audit mutation: an allowlisted page left indexable while ineligible is caught", heldIndexed.problems.some((problem) => problem.includes(ineligibleServed.path) && problem.includes("is not eligible")));
  const leakAll = await run(pilotSite(), listed(policyDecisions.filter((decision) => decision.eligible).map((decision) => decision.path)), onePilot);
  assert("audit mutation: every eligible event leaking into the sitemap is caught", leakAll.problems.some((problem) => problem.startsWith("sitemaps/events.xml lists") && problem.includes("the rollout does not index")));
  const missing = await run(pilotSite(), listed([]), onePilot);
  assert("audit mutation: an active pilot event missing from the sitemap and llms.txt is caught", missing.problems.filter((problem) => problem.includes("omits 1 active pilot")).length === 3);
  const doubled = await run(pilotSite(), listed([pilotDecision.path, pilotDecision.path]), onePilot);
  assert("audit mutation: a pilot URL listed twice is caught", doubled.problems.some((problem) => problem.includes("more than once")));
  const oldIdentity = await run(pilotSite({ [artistPath]: { status: 200, html: parentGraph([{ "@type": "MusicEvent", url: `${ORIGIN}${artistPath}#show-${slugify(pilotDecision.id)}` }]) } }), listed([pilotDecision.path]), onePilot);
  assert("audit mutation: a parent keeping the #show-<id> identity for a pilot event is caught", oldIdentity.problems.some((problem) => problem.includes("anchor in structured data")) && oldIdentity.problems.some((problem) => problem.includes("expected exactly 1")));
  const otherId = await run(pilotSite({ [artistPath]: { status: 200, html: parentGraph([{ ...alignedNode, "@id": `${pilotUrl}#performance` }]) } }), listed([pilotDecision.path]), onePilot);
  assert("audit mutation: a parent @id different from the event page's is caught", otherId.problems.some((problem) => problem.includes("url and @id that disagree")));
  const strayId = await run(pilotSite({ [artistPath]: { status: 200, html: parentGraph([alignedNode, { "@type": "MusicEvent", "@id": `${ORIGIN}${otherEligible.path}#event`, url: `${ORIGIN}${otherEligible.path}` }]) } }), listed([pilotDecision.path]), onePilot);
  assert("audit mutation: a non-pilot parent node taking an event-page identity is caught", strayId.problems.some((problem) => problem.includes(`identifies ${otherEligible.path} by its event page`)));
}

// Real data: the frozen cohort today, through the real renderer in a
// deployed-like environment (wrangler.toml [vars], stub affiliate credentials,
// the canonical host). A pilot event that has since become ineligible must be
// noindex and undiscoverable; one that is active must be a sound page.
{
  const { loadSiteFixture } = await load("scripts/lib/route-crawl.mjs");
  const { wranglerVars, renderedCtaProviders } = await load("scripts/lib/event-indexability-audit.mjs");
  const { urlDateConflicts, eventLocalDate } = await load("scripts/sync-impact-marketplace-events.mjs");
  const { resolveEventLocalDate } = await load("functions/_event-local-date.js");
  const router = await load("functions/[[path]].js");
  const site = await loadSiteFixture(ROOT);
  const now = Date.now();
  const stub = { IMPACT_SEATGEEK_ACCOUNT_SID: "t", IMPACT_SEATGEEK_AUTH_TOKEN: "t", IMPACT_SEATGEEK_CAMPAIGN_ID: "1", IMPACT_VIVIDSEATS_CAMPAIGN_ID: "2", IMPACT_ACCOUNT_SID: "t", IMPACT_AUTH_TOKEN: "t" };
  const deployed = { ...site.env, ...wranglerVars(fs.readFileSync(path.join(ROOT, "wrangler.toml"), "utf8")), ...stub };
  const { events } = site.data;
  const isConfigured = coverage.providerConfiguredTest(catalog);
  const runtime = await router.eventIndexingPilotFor(deployed, ORIGIN);
  const offline = policy.deriveEventIndexingPilot(events, site.data.artistsMeta, deployed, { hostIndexable: true, lanesFor: (event) => coverage.publishableLaneSlugs(event, isConfigured, now), now });
  const runtimePaths = runtime.indexed.map((member) => member.path);
  assert(`cohort: the router's active pilot equals the offline derivation (${runtimePaths.length} active of 30)`, runtime.active && JSON.stringify(runtimePaths) === JSON.stringify(offline.indexed.map((member) => member.path)));
  const dropped = runtime.members.filter((member) => !member.indexable);
  if (dropped.length) console.log(`note: ${dropped.length} pilot key(s) inactive today: ${dropped.map((member) => `${member.key} (${member.decision?.reasons.join("+") || member.reason})`).join(", ")}`);
  const renderReal = async (pathname, origin = ORIGIN) => {
    const response = await site.modules.middlewareModule.onRequest({ request: new Request(`${origin}${pathname}`), env: deployed, next: () => new Response("static", { status: 200 }) });
    return { status: response.status, html: await response.text() };
  };
  const MON = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };
  const h1Date = (html) => {
    const match = ((html.match(/<h1 id="eventTitle">([\s\S]*?)<\/h1>/) || [])[1] || "").match(/([A-Z][a-z]{2}) (\d{1,2}), (\d{4})/);
    return match ? `${match[3]}-${MON[match[1]]}-${match[2].padStart(2, "0")}` : "";
  };
  const failures = [];
  for (const member of runtime.members) {
    if (!member.path) {
      failures.push(`${member.key}: no path`);
      continue;
    }
    const page = await renderReal(member.path);
    const robots = robotsOf(page.html);
    if (!member.indexable) {
      if (page.status === 200 && robots !== "noindex,follow") failures.push(`${member.path}: inactive but renders ${robots}`);
      continue;
    }
    const nodes = graphOf(page.html).filter((node) => node["@type"] === "MusicEvent");
    const localDate = member.decision.path.match(/-(\d{4}-\d{2}-\d{2})-[0-9a-f]{16}$/)?.[1];
    const buttons = renderedCtaProviders(page.html);
    const conflicts = Object.entries(member.event.provider_links || {}).filter(([, link]) => link?.verified === true && link.url && urlDateConflicts(link.url, eventLocalDate(member.event)));
    if (page.status !== 200) failures.push(`${member.path}: status ${page.status}`);
    if (!robots.startsWith("index,follow")) failures.push(`${member.path}: robots ${robots}`);
    if (canonicalOf(page.html) !== `${ORIGIN}${member.path}`) failures.push(`${member.path}: canonical ${canonicalOf(page.html)}`);
    if (nodes.length !== 1 || nodes[0]["@id"] !== `${ORIGIN}${member.path}#event` || "offers" in nodes[0]) failures.push(`${member.path}: ${nodes.length} MusicEvent(s)`);
    if (!(localDate && nodes[0]?.startDate?.slice(0, 10) === localDate && h1Date(page.html) === localDate && resolveEventLocalDate(member.event).iso === localDate)) failures.push(`${member.path}: route/H1/startDate/record dates disagree`);
    if ([...buttons].sort().join(",") !== [...member.decision.inputs.publishableLanes].sort().join(",")) failures.push(`${member.path}: CTAs [${buttons}] vs policy [${member.decision.inputs.publishableLanes}]`);
    if (member.decision.inputs.destinationCount < 2 || member.decision.inputs.snapshotReadyLanes.length < 1) failures.push(`${member.path}: below threshold`);
    if (conflicts.length) failures.push(`${member.path}: provider URL names another night (${conflicts.map(([lane]) => lane).join(", ")})`);
    if (member.decision.inputs.duplicateGroups.length) failures.push(`${member.path}: duplicate-ambiguous`);
    if (!member.decision.inputs.artistPageIndexable) failures.push(`${member.path}: parent artist not indexable`);
  }
  assert(`cohort: every active pilot page is 200, index,follow, self-canonical, one MusicEvent without offers, one local date, CTA parity, date-safe provider links (${failures.join(" | ") || "all"})`, failures.length === 0);
  const docs = await discovery(deployed);
  const listedPaths = eventUrls(docs["sitemaps/events.xml"]);
  assert(`cohort: the events sitemap is exactly the active pilot (${listedPaths.length})`, JSON.stringify([...listedPaths].sort()) === JSON.stringify([...runtimePaths].sort()) && listedPaths.length === new Set(listedPaths).size);
  assert("cohort: /sitemap.xml and llms.txt list exactly the active pilot", JSON.stringify(eventUrls(docs["sitemap.xml"]).sort()) === JSON.stringify([...runtimePaths].sort()) && JSON.stringify(eventUrls(docs["llms.txt"]).sort()) === JSON.stringify([...runtimePaths].sort()));
  // Non-selected pages: a spread across the eligible population (the audit
  // renders every served page; this keeps a fast in-test guard).
  const nonPilot = policy.deriveEventIndexability(events, site.data.artistsMeta, { lanesFor: (event) => coverage.publishableLaneSlugs(event, isConfigured, now), now })
    .filter((decision) => decision.eligible && !policy.EVENT_INDEXING_PILOT_KEYS.includes(decision.key));
  const sample = nonPilot.filter((_, index) => index % Math.max(1, Math.floor(nonPilot.length / 40)) === 0);
  const leaks = [];
  for (const decision of sample) {
    const page = await renderReal(decision.path);
    if (page.status !== 200 || robotsOf(page.html) !== "noindex,follow") leaks.push(`${decision.path} (${page.status} ${robotsOf(page.html)})`);
  }
  assert(`cohort: eligible non-pilot pages stay noindex,follow (${sample.length} sampled of ${nonPilot.length}${leaks.length ? `; ${leaks.join(", ")}` : ""})`, sample.length >= 30 && leaks.length === 0);
  const preview = await renderReal(runtimePaths[0] || "/", "https://preview.tourticketcompare.pages.dev");
  assert("cohort: the same deployed config on a *.pages.dev host renders the pilot page noindex,follow", robotsOf(preview.html) === "noindex,follow");
}

let failed = 0;
for (const check of checks) {
  if (!check.pass) failed += 1;
  console.log(`${check.pass ? "PASS" : "FAIL"}  ${check.label}`);
}
console.log(`\n${checks.length - failed}/${checks.length} checks passed.`);
process.exitCode = failed === 0 ? 0 : 1;
