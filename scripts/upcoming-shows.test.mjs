// Regression for the compare hub's "Prices on upcoming shows" list (owner
// review, 2026-10-06): with a fixed clock, a date that has passed never
// appears there, and the hub, artist, city and venue lists all use the same
// isUpcomingShow predicate from functions/_upcoming.js.
import { readFile } from "node:fs/promises";
import { isUpcomingShow } from "../functions/_upcoming.js";
import { deriveCities } from "../functions/_cities.js";
import { deriveVenues } from "../functions/_venues.js";

const pathModule = await import("../functions/[[path]].js");
let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`upcoming-shows: ${message}`);
  passed += 1;
}

const NOW = Date.parse("2026-10-06T12:00:00Z");
assert(!isUpcomingShow({ dateTimeISO: "2026-09-28T19:00:00Z" }, NOW), "a September date is past on 6 October");
assert(!isUpcomingShow({ dateTimeISO: "2026-10-06T11:59:00Z" }, NOW), "a show that started a minute ago is past");
assert(isUpcomingShow({ dateTimeISO: "2026-10-06T12:00:00Z" }, NOW), "a show starting now is still upcoming");
assert(isUpcomingShow({ datetime_iso: "2026-10-07T19:00:00Z" }, NOW), "the datetime_iso field is read too");
assert(!isUpcomingShow({ dateTimeISO: "" }, NOW) && !isUpcomingShow({ dateTimeISO: "TBA" }, NOW), "an unparseable date is never upcoming");

// Real events with a known-good ticket link, re-dated around the fixed clock.
const events = JSON.parse(await readFile(new URL("../public/data/events.json", import.meta.url), "utf8"));
const list = Array.isArray(events) ? events : events.events;
const base = pathModule.publishableFutureShows(list, 2, Date.parse("2020-01-01T00:00:00Z"));
assert(base.length === 2, "two publishable fixture events are available");
const raw = list.filter((ev) => base.some((show) => show.id === String(ev.id).trim()));
const past = { ...raw[0], id: "fixture-past", dateTimeISO: "2026-09-28T19:00:00Z", datetime_iso: "2026-09-28T19:00:00Z" };
const future = { ...raw[1], id: "fixture-future", dateTimeISO: "2026-10-07T19:00:00Z", datetime_iso: "2026-10-07T19:00:00Z" };
const fixture = [past, future];

const hubShows = pathModule.publishableFutureShows(fixture, 6, NOW);
assert(hubShows.length === 1 && hubShows[0].id === "fixture-future", "the hub list keeps only the future date");
const hubHtml = pathModule.renderComparisonHubEventCards(fixture, {}, NOW);
assert(hubHtml.includes("Prices on upcoming shows, as of Oct 6, 2026"), "the hub heading carries the date the list was built");
assert(hubHtml.includes("data-nosnippet"), "the hub list is kept out of search snippets");
assert(!/Sep(t)? 28|2026-09-28/.test(hubHtml), "no 28 September date appears under upcoming");
assert(/2026-10-07/.test(hubHtml), "the 7 October date is listed");

const cityShows = deriveCities(fixture, { now: NOW }).flatMap((city) => city.shows);
const venueShows = deriveVenues(fixture, { now: NOW }).flatMap((venue) => venue.shows);
assert(cityShows.every((show) => show.id !== "fixture-past"), "city lists drop the past date with the same predicate");
assert(venueShows.every((show) => show.id !== "fixture-past"), "venue lists drop the past date with the same predicate");

console.log(`upcoming-shows: ${passed} assertions passed`);
