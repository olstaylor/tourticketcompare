// Date-controlled tests for the /tours/2027 hub derivation and page body.
// Run standalone (node scripts/tours-hub.test.mjs) and as part of
// `npm run test:mvp`.
//
// The hub counts reviewed events per artist and links each artist page. These
// tests lock what it may count (upcoming, not cancelled, in the year at the
// venue, artist in the catalog), that it never links a ticket site or an event
// page, and that it stays noindex until TOURS_HUB_INDEXABLE is flipped.

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
const { deriveToursHub, TOURS_HUB_INDEXABLE, TOURS_HUB_PATH } = await load("functions/_tours-hub.js");
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
assert(TOURS_HUB_INDEXABLE === false && hub.indexable === false, "the hub stays noindex until the pilot read-out");

const body = renderToursHubBody({ path: TOURS_HUB_PATH, hub, breadcrumb: [{ name: "2027 tours", path: TOURS_HUB_PATH }] });
assert(body.includes('href="/artists/artist-a"') && body.includes('href="/artists/artist-b"'), "the page links each artist page");
assert(!/ticketmaster\.com|\/events\/|\/api\/out/.test(body), "the page links no ticket site, event page or redirect");
assert(body.includes("Feb–Aug") && body.includes("2 dates"), "each row says how many dates and which months");
assert(!/\$\d|£\d|€\d/.test(body), "the page carries no price figures");

const empty = renderToursHubBody({ path: TOURS_HUB_PATH, hub: deriveToursHub([], catalog, 2027, NOW_MS), breadcrumb: [] });
assert(empty.includes("No tracked artist has upcoming dates in 2027 yet"), "an empty hub says so");

console.log(`tours-hub: ${passed} assertions passed`);
