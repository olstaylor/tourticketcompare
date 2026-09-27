#!/usr/bin/env node
//
// Tests for the event-page indexability policy (functions/_event-indexability.js):
// which individual event pages are eligible for future indexing, why every
// other page is not, the duplicate-ambiguity rule, the pilot rollout gate — and
// that nothing is actually indexed yet. Eligibility must follow canonical data
// (lifecycle, provider provenance, the route) and never cached prices or D1.
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

// Rollout gate (designed for the pilot; off in this PR).
{
  const eligible = decide(EVENTS, STRONG);
  const ineligible = decide(EVENTS, ONE_LANE);
  const on = { EVENT_PAGES_INDEXING: "pilot" };
  assert("rollout: nothing is indexable with the flag unset", eventPageIndexingDecision(eligible, {}, { pilotKeys: [eligible.key] }).reason === ROLLOUT.INDEXING_OFF);
  assert("rollout: any value but \"pilot\" is off", ["true", "1", "all", ""].every((value) => !eventPageIndexingDecision(eligible, { EVENT_PAGES_INDEXING: value }, { pilotKeys: [eligible.key] }).indexable));
  assert("rollout: the flag alone indexes nothing without the key", eventPageIndexingDecision(eligible, on, { pilotKeys: [] }).reason === ROLLOUT.NOT_IN_PILOT);
  assert("rollout: a pilot key never overrides the policy", eventPageIndexingDecision(ineligible, on, { pilotKeys: [ineligible.key] }).reason === ROLLOUT.NOT_ELIGIBLE);
  assert("rollout: eligible AND pilot flag AND stable key listed -> indexable", eventPageIndexingDecision(eligible, on, { pilotKeys: [eligible.key] }).indexable);
  const renamed = { ...STRONG, venue: "Renamed Arena" };
  const renamedDecision = decide(EVENTS.map((event) => (event.id === STRONG.id ? renamed : event)), renamed);
  assert(
    "rollout: the key survives a venue rename (keys, not readable slugs)",
    renamedDecision.path !== eligible.path && eventPageIndexingDecision(renamedDecision, on, { pilotKeys: [eligible.key] }).indexable
  );
  assert("rollout: the repo pilot list is empty in this PR", policy.EVENT_INDEXING_PILOT_KEYS.length === 0 && Object.isFrozen(policy.EVENT_INDEXING_PILOT_KEYS));
  assert("rollout: production uses the repo list, so the flag alone indexes nothing", eventPageIndexingDecision(eligible, on).reason === ROLLOUT.NOT_IN_PILOT);
  const wrangler = fs.readFileSync(path.join(ROOT, "wrangler.toml"), "utf8");
  assert("rollout: wrangler.toml does not set EVENT_PAGES_INDEXING", !/^\s*EVENT_PAGES_INDEXING\s*=/m.test(wrangler));
  const importers = fs
    .readdirSync(path.join(ROOT, "functions"), { recursive: true })
    .filter((file) => String(file).endsWith(".js"))
    .filter((file) => /_event-indexability\.js["']/.test(fs.readFileSync(path.join(ROOT, "functions", String(file)), "utf8")))
    .map(String);
  assert(`rollout: no runtime code reads the policy yet (got ${importers.join(", ") || "none"})`, importers.length === 0);
  const router = fs.readFileSync(path.join(ROOT, "functions/[[path]].js"), "utf8");
  const eventRoute = router.slice(router.indexOf("function eventPageRoute("), router.indexOf("function eventStatusFact("));
  assert("rollout: the router's event route still hard-codes indexable: false", /\n\s*indexable: false,\n/.test(eventRoute));
}

// Offline CTA mirror: the pre-on-sale branch the renderer applies.
{
  assert("mirror: no Ticketmaster lane before the public on-sale", !coverage.providerEventPublishable(PRE_ONSALE, "ticketmaster", NOW) && coverage.providerEventPublishable(PRE_ONSALE, "ticketmaster", Date.parse("2026-08-21T00:00:00Z")));
  assert("mirror: a verified resale lane publishes before the on-sale", coverage.providerEventPublishable(PRE_ONSALE, "vivid-seats", NOW));
  const unverified = { ...PRE_ONSALE, provider_links: { ...PRE_ONSALE.provider_links, "vivid-seats": { verified: false } } };
  assert("mirror: an unverified fallback waits for the on-sale", !coverage.providerEventPublishable(unverified, "vivid-seats", NOW));
}

// ─── rendered pages: nothing is indexed (23–27) ─────────────────────────────

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

{
  // Even with the pilot flag set and an eligible page, nothing changes: the
  // router does not read the policy in this PR. A D1 that throws changes nothing either.
  const brokenDb = { prepare() { throw new Error("D1 unavailable"); } };
  const envs = [["no flag", env(EVENTS)], ["flag set to pilot", env(EVENTS, { EVENT_PAGES_INDEXING: "pilot" })], ["D1 throwing", env(EVENTS, { DEMAND_DB: brokenDb })]];
  const served = EVENTS.filter((event) => decide(EVENTS, event).inputs.routeAction === "render");
  assert("fixture serves eligible and ineligible pages", served.some((event) => decide(EVENTS, event).eligible) && served.some((event) => !decide(EVENTS, event).eligible));
  for (const [label, envValue] of envs) {
    const robots = [];
    for (const event of served) {
      const page = await render(eventPages.eventPath(event), envValue);
      robots.push(page.status === 200 ? robotsOf(page.html) : `status ${page.status}`);
    }
    assert(`23. every served event page renders noindex,follow (${label})`, robots.every((value) => value === "noindex,follow"));
    const { onRequestGet: sitemapIndex } = await load("functions/sitemap.xml.js");
    const bodies = [await (await sitemapIndex({ request: new Request(`${ORIGIN}/sitemap.xml`), env: envValue })).text()];
    for (const segment of ["pages", "artists", "artist-cities", "cities", "venues", "blog"]) {
      const { onRequestGet } = await load(`functions/sitemaps/${segment}.xml.js`);
      bodies.push(await (await onRequestGet({ request: new Request(`${ORIGIN}/sitemaps/${segment}.xml`), env: envValue })).text());
    }
    assert(`24. no sitemap document lists an event URL (${label})`, bodies.every((body) => body.length > 0 && !body.includes("/events/")));
    const { onRequestGet: llms } = await load("functions/llms.txt.js");
    const llmsText = await (await llms({ request: new Request(`${ORIGIN}/llms.txt`), env: envValue })).text();
    assert(`25. llms.txt lists no event URL (${label})`, llmsText.length > 0 && !llmsText.includes("/events/"));
  }
  // 26–27. Parent pages: event links are the router's served paths only; their
  // structured data keeps its #show-<id> identities and references no event page.
  const parent = await render(`/artists/${ARTIST.slug}`, env(EVENTS, { EVENT_PAGES_INDEXING: "pilot" }));
  const links = [...new Set([...parent.html.matchAll(/href="(\/events\/[^"#?]*)"/g)].map((match) => match[1]))].sort();
  const expected = EVENTS.filter((event) => eventPages.eventPageLinkPath(EVENTS, artistsMeta, event) !== "").map((event) => eventPages.eventPath(event)).sort();
  assert("26. the parent board links exactly the served event pages", parent.status === 200 && JSON.stringify(links) === JSON.stringify(expected));
  const jsonLd = jsonLdOf(parent.html);
  assert("27. parent structured data is unchanged: #show-<id> urls, no event-page identity", jsonLd.includes(`/artists/${ARTIST.slug}#show-`) && !jsonLd.includes("/events/") && !jsonLd.includes("#event\""));
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
  assert("real data: no eligible event holds a pilot key yet", eligible.every((decision) => eventPageIndexingDecision(decision, { EVENT_PAGES_INDEXING: "pilot" }).reason === ROLLOUT.NOT_IN_PILOT));
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
  const baseline = await run(good);
  assert(`audit: a well-formed noindex site has no problems (${baseline.problems.length})`, baseline.problems.length === 0 && baseline.summary.rendered_noindex === baseline.summary.served);
  const indexed = await run((pathname) => ({ ...good(pathname), html: good(pathname).html.replace("noindex,follow", "index,follow") }));
  assert("audit: robots switching to index before the pilot is a problem", indexed.problems.some((problem) => problem.includes('robots "index,follow"')));
  const anyEvent = [...BUTTONS.keys()].find(Boolean);
  const leaked = await run(good, [{ name: "sitemaps/artists.xml", body: `<loc>${ORIGIN}${anyEvent}</loc>` }, { name: "llms.txt", body: `- ${ORIGIN}${anyEvent}` }]);
  assert("audit: an event URL in a sitemap or llms.txt before the pilot is a problem", leaked.problems.filter((problem) => problem.includes("the rollout does not index")).length === 2);
  const malformed = await run((pathname) => ({ ...good(pathname), html: good(pathname).html.replace(/<script[\s\S]*?<\/script>/, "") }));
  assert("audit: an eligible page without its MusicEvent is a problem", malformed.problems.some((problem) => problem.includes("0 MusicEvent node(s)")));
  const drift = await run((pathname) => ({ ...good(pathname), html: good(pathname).html.replace(/<a class="provider-cta" data-cta-provider="ticketmaster">/, "") }));
  assert("audit: rendered buttons drifting from the counted lanes is a problem", drift.problems.some((problem) => problem.includes("the CTA mirror has drifted")));
  const typo = await run(good, clean, ["0000000000000000"]);
  assert("audit: a pilot key that resolves to no event is a problem", typo.problems.some((problem) => problem.includes("pilot key 0000000000000000")));
}

let failed = 0;
for (const check of checks) {
  if (!check.pass) failed += 1;
  console.log(`${check.pass ? "PASS" : "FAIL"}  ${check.label}`);
}
console.log(`\n${checks.length - failed}/${checks.length} checks passed.`);
process.exitCode = failed === 0 ? 0 : 1;
