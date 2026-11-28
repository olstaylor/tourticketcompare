// Date-controlled tests for the /tours/2027 hub derivation and page body.
// Run standalone (node scripts/tours-hub.test.mjs) and as part of
// `npm run test:mvp`.
//
// The hub counts reviewed events per artist and links each artist page. These
// tests lock what it may count (upcoming, not cancelled, in the year at the
// venue, artist in the catalog), that it never links a ticket site or an event
// page, and that it is indexable only while an indexable artist qualifies.

import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`tours-hub: ${message}`);
  passed += 1;
}

const NOW_MS = Date.parse("2026-10-09T12:00:00Z");
Date.now = () => NOW_MS;

const load = (relativePath) => import(pathToFileURL(path.join(root, relativePath)));
const { deriveToursHub, deriveToursHubCityRuns, deriveHomeCityRuns, TOURS_HUB_INDEXABLE, TOURS_HUB_PATH } = await load("functions/_tours-hub.js");
const { renderToursHubBody } = await load("functions/[[path]].js");

const catalog = {
  artists: [
    { slug: "artist-a", name: "Artist A" },
    { slug: "artist-b", name: "Artist B" }
  ]
};

function event(id, artist, datetime, extra = {}) {
  return {
    id,
    artist_slug: artist,
    artist_name: artist,
    city: "Springfield",
    country: "United States",
    venue: "Springfield Arena",
    datetime_iso: datetime,
    timezone: "America/Los_Angeles",
    tour_name: "The Big Tour",
    ticketmaster_url: `https://www.ticketmaster.com/event/${id}`,
    ...extra
  };
}

const events = [
  event("a-1", "artist-a", "2027-03-01T03:00:00Z"),
  event("a-2", "artist-a", "2027-08-10T03:00:00Z", { city: "London", country: "United Kingdom" }),
  // 05:00Z on 1 Jan 2027 is still 31 Dec 2026 in Los Angeles.
  event("a-nye", "artist-a", "2027-01-01T05:00:00Z"),
  event("a-2026", "artist-a", "2026-11-01T03:00:00Z"),
  event("a-2028", "artist-a", "2028-02-01T03:00:00Z"),
  event("a-cancelled", "artist-a", "2027-05-01T03:00:00Z", { ticketmaster_status_code: "cancelled" }),
  event("b-1", "artist-b", "2027-06-01T03:00:00Z", { tour_name: "" }),
  event("unknown", "not-in-catalog", "2027-06-01T03:00:00Z")
];

const hub = deriveToursHub(events, catalog, 2027, NOW_MS);
assert(TOURS_HUB_PATH === "/tours/2027", "the hub lives at /tours/2027");
assert(hub.artistCount === 2, "only catalog artists with 2027 dates are listed");
assert(hub.showCount === 3, "past-year, next-year, cancelled and venue-local 2026 dates are not counted");
const [first, second] = hub.artists;
assert(first.artistSlug === "artist-a" && first.showCount === 2, "the artist with the most dates is first");
assert(first.cityCount === 2 && first.countries.length === 2, "cities and countries are counted per artist");
assert(first.firstMonth === 2 && first.lastMonth === 8, "months are read in the venue's local calendar");
assert(first.tourName === "The Big Tour", "a shared tour name is carried");
assert(second.tourName === "", "no tour name is invented when the dates carry none");
assert(first.path === "/artists/artist-a", "each row links the artist page");
assert(TOURS_HUB_INDEXABLE === true && hub.indexable === true, "the hub is indexable once an artist qualifies");
const linkableOnly = deriveToursHub(events, catalog, 2027, NOW_MS, ["artist-a"]);
assert(linkableOnly.artistCount === 1 && linkableOnly.artists[0].artistSlug === "artist-a", "artists whose own page is noindex are left out");
assert(deriveToursHub(events, catalog, 2027, NOW_MS, []).indexable === false, "with no indexable artist the hub is noindex");

const body = renderToursHubBody({ path: TOURS_HUB_PATH, hub, breadcrumb: [{ name: "2027 tours", path: TOURS_HUB_PATH }] });
assert(body.includes('href="/artists/artist-a"') && body.includes('href="/artists/artist-b"'), "the page links each artist page");
assert(!/ticketmaster\.com|\/events\/|\/api\/out/.test(body), "the page links no ticket site, event page or redirect");
assert(body.includes("Feb–Aug") && body.includes("2 dates"), "each row says how many dates and which months");
assert(!/(?:[$£€]|\b(?:USD|CAD|AUD|GBP|EUR)\s+)\d/.test(body), "the page carries no price figures");

// City runs: only 2+ dates in one city, in the year, for indexable artists, and
// each links the existing artist-city page.
const runEvents = [
  event("r-1", "artist-a", "2027-03-01T03:00:00Z"),
  event("r-2", "artist-a", "2027-03-02T03:00:00Z"),
  event("r-3", "artist-b", "2027-03-01T03:00:00Z")
];
const runs = deriveToursHubCityRuns(runEvents, ["artist-a", "artist-b"], 2027, NOW_MS);
assert(runs.every((run) => run.showCount >= 2 && run.path.includes("/tickets/")), "city runs are 2+ dates and link the artist-city page");
assert(!runs.some((run) => run.artistSlug === "artist-b"), "a single date in a city is not a run");
assert(deriveToursHubCityRuns(runEvents, [], 2027, NOW_MS).length === 0, "artists whose page is noindex have no runs");
assert(deriveToursHubCityRuns(runEvents, ["artist-a"], 2028, NOW_MS).length === 0, "runs outside the year are not counted");
const runBody = renderToursHubBody({ path: TOURS_HUB_PATH, hub: { ...hub, cityRuns: [{ artistSlug: "artist-a", path: "/artists/artist-a/tickets/springfield-united-states", city: "Springfield", country: "United States", showCount: 2, venueCount: 1 }] }, breadcrumb: [] });
assert(runBody.includes("Longest 2027 city runs") && runBody.includes('href="/artists/artist-a/tickets/springfield-united-states"'), "the page links each city run");

// Only the first six runs sit above the artist list; the rest stay as links in a closed <details>.
const manyRuns = Array.from({ length: 10 }, (_, i) => ({ artistSlug: "artist-a", path: `/artists/artist-a/tickets/city-${i}-united-states`, city: `City ${i}`, country: "United States", showCount: 10 - i, venueCount: 1 }));
const manyBody = renderToursHubBody({ path: TOURS_HUB_PATH, hub: { ...hub, cityRuns: manyRuns }, breadcrumb: [] });
const [beforeMore, afterMore] = manyBody.split("<details");
assert((beforeMore.match(/city-\d-united-states/g) || []).length === 6, "six city runs show before the disclosure");
assert(afterMore.includes("Show 4 more city runs") && afterMore.includes("city-9-united-states"), "remaining runs stay linked inside the disclosure");
assert(runBody.indexOf("<details") === -1 || !runBody.includes("more city runs"), "a short list has no disclosure");

// Homepage city strip: only runs with two listed-price lanes on a date, so
// fixtures without price snapshots yield none, and noindex artists never appear.
assert(deriveHomeCityRuns(runEvents, ["artist-a", "artist-b"], NOW_MS).length === 0, "the homepage strip needs a priced run");
assert(deriveHomeCityRuns(runEvents, [], NOW_MS).length === 0, "the homepage strip skips noindex artists");

const empty = renderToursHubBody({ path: TOURS_HUB_PATH, hub: deriveToursHub([], catalog, 2027, NOW_MS), breadcrumb: [] });
assert(empty.includes("No tracked artist has upcoming dates in 2027 yet"), "an empty hub says so");

const perCountry = first.byCountry;
assert(Object.keys(perCountry).length === first.countries.length, "per-country counts cover each country the artist plays");
assert(Object.values(perCountry).reduce((n, c) => n + c.showCount, 0) === first.showCount, "per-country dates add up to the artist's dates");
const withChips = renderToursHubBody({ path: TOURS_HUB_PATH, hub: { ...hub, countryChoices: [{ country: "United Kingdom", artistCount: 5 }] }, breadcrumb: [] });
assert(withChips.includes("data-country-chooser") && withChips.includes('data-country="United Kingdom"'), "country chips render");
assert(withChips.includes("data-by-country="), "each artist tile carries its per-country counts");
assert(!empty.includes("data-country-chooser"), "no chips when there is nothing to choose");

import { venueTypeFromName } from "../functions/_tours-hub.js";
assert(venueTypeFromName("Lucas Oil Stadium") === "stadium" && venueTypeFromName("Stade de France") === "stadium", "stadium is read from the venue name");
assert(venueTypeFromName("O2 Arena") === "arena", "arena is read from the venue name");
assert(venueTypeFromName("Madison Square Garden") === "" && venueTypeFromName("") === "" && venueTypeFromName(null) === "", "a venue whose name says neither is left unclassified");
assert(withChips.includes('data-size="stadium"') && withChips.includes("matched on the venue's name only"), "venue type chips and the name-only note render");

const withReport = renderToursHubBody({
  path: TOURS_HUB_PATH,
  hub: { ...hub, priceReport: { path: "/blog/have-2027-concert-ticket-prices-gone-down-since-first-listed", summary: "Prices were lower at 54% of comparisons.", dateModified: "2026-12-01" } },
  breadcrumb: []
});
assert(withReport.includes("Prices were lower at 54% of comparisons.") && withReport.includes("not a forecast") && withReport.includes("Dec 1, 2026"), "the price box quotes the published report with its date and caveat");
assert(!withChips.includes("toursHubPriceTitle") && !empty.includes("toursHubPriceTitle"), "no price box without a published report");

console.log(`tours-hub: ${passed} assertions passed`);
