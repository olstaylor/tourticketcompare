// Date-controlled tests for the shared city and venue page templates.
// Run standalone (node scripts/location-pages.test.mjs) and as part of
// `npm run test:mvp`.
//
// These templates render every /cities/<slug> and /venues/<slug> URL, so a
// sentence added to either is published hundreds of times over. The tests lock
// the contract that keeps them useful:
//
//   * every visible claim is derived from the upcoming events the page lists;
//   * the counts are stated once, in the lead, and never restated;
//   * the removed filler (an "at a glance" summary, a coverage panel, a
//     verification-recency paragraph, a templated FAQ) does not come back, and
//     nothing was generated to replace it;
//   * a record with no upcoming shows produces a short, accurate empty state
//     rather than a page-shaped frame around nothing;
//   * metadata, canonical URL, structured data and indexability are unchanged
//     by the trim — including the FAQPage node, which had to go with the
//     visible FAQ it mirrored.
//
// The fixture is synthetic and rendered against a pinned clock, so it exercises
// city and venue records with a fixed shape rather than whatever today's
// events.json happens to contain. Real-data coverage of the same routes stays
// in scripts/audit-internal-links.mjs and scripts/smoke-prelaunch.mjs.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://tourticketcompare.com";

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`location-pages: ${message}`);
  passed += 1;
}

// The clock is pinned before the router is imported so every "is this show
// upcoming?" comparison in the derivations sees the same instant.
const NOW_ISO = "2026-08-09T12:00:00Z";
const NOW_MS = Date.parse(NOW_ISO);
assert(Number.isFinite(NOW_MS), "the pinned test clock must be a valid ISO timestamp");
Date.now = () => NOW_MS;

const read = (relativePath) => fs.readFile(path.join(root, relativePath), "utf8");
const load = (relativePath) => import(pathToFileURL(path.join(root, relativePath)));

const [middlewareModule, routerModule] = await Promise.all([
  load("functions/_middleware.js"),
  load("functions/[[path]].js")
]);
const { renderCityPageBody, renderVenuePageBody } = routerModule;
assert(typeof renderCityPageBody === "function", "the router exports renderCityPageBody");
assert(typeof renderVenuePageBody === "function", "the router exports renderVenuePageBody");

const { deriveCities, findCity } = await load("functions/_cities.js");
const { deriveVenues, findVenue } = await load("functions/_venues.js");

// ─── fixture ────────────────────────────────────────────────────────────────

// Two artists whose editorial record is indexable, so the templates take their
// linking path rather than the plain-text fallback.
const artistsMeta = JSON.parse(await read("public/data/artists.json"));
const indexableArtists = artistsMeta
  .filter((artist) => artist?.indexing_status === "indexable_with_substantial_content")
  .slice(0, 2);
assert(indexableArtists.length === 2, "the fixture needs two editorially indexable artists to link to");
const [artistA, artistB] = indexableArtists.map((artist) => ({
  slug: String(artist.slug),
  name: String(artist.name || artist.slug)
}));

const CITY = "Springfield";
const COUNTRY = "United States";
const CITY_SLUG = "springfield-united-states";
const MAIN_VENUE = "Springfield Arena";
const MAIN_VENUE_SLUG = "springfield-arena-springfield";
const SECOND_VENUE = "Riverside Hall";

// A US evening show is already the next calendar day in UTC. The fixture keeps
// that case in every row so a regression back to UTC labelling is visible as a
// wrong weekday rather than as an invisible off-by-one.
function fixtureEvent({ id, artist, venue, iso }) {
  const ticketmasterUrl = `https://www.ticketmaster.com/event/${id.toUpperCase()}`;
  return {
    id,
    artist_slug: artist.slug,
    artist_name: artist.name,
    event_name: `${artist.name}: Fixture Tour`,
    city: CITY,
    country: COUNTRY,
    venue,
    datetime_iso: iso,
    timezone: "America/Chicago",
    tour_name: "Fixture Tour",
    status: "announced",
    ticketmaster_event_id: id.toUpperCase(),
    ticketmaster_url: ticketmasterUrl,
    seatgeek_url: "",
    vividseats_url: "",
    source_type: "ticketmaster",
    source_url: ticketmasterUrl,
    last_verified_at: "2026-08-01",
    provider_links: {
      ticketmaster: {
        event_id: id.toUpperCase(),
        url: ticketmasterUrl,
        verified: true,
        last_verified_at: "2026-08-01",
        availability_status: "on_sale"
      }
    },
    verification_status: "human_verified"
  };
}

// 4 upcoming shows / 2 artists / 2 venues clears the city gate; the 3 shows and
// 2 artists at Springfield Arena clear the venue gate.
const UPCOMING_EVENTS = [
  fixtureEvent({ id: "fixture-a1", artist: artistA, venue: MAIN_VENUE, iso: "2026-09-11T01:00:00Z" }),
  fixtureEvent({ id: "fixture-a2", artist: artistA, venue: MAIN_VENUE, iso: "2026-09-13T01:00:00Z" }),
  fixtureEvent({ id: "fixture-b1", artist: artistB, venue: MAIN_VENUE, iso: "2026-10-03T01:00:00Z" }),
  fixtureEvent({ id: "fixture-b2", artist: artistB, venue: SECOND_VENUE, iso: "2026-10-17T01:00:00Z" })
];

// The same shows, every one of them in the past. This is what the site looks
// like once a run finishes and nothing new has been verified yet.
const EXPIRED_EVENTS = UPCOMING_EVENTS.map((event, index) => ({
  ...event,
  datetime_iso: `2026-0${index + 1}-05T01:00:00Z`
}));

const ASSET_FILES = [
  "index.html",
  "data/catalog.json",
  "data/artists.json",
  "data/events.json",
  "data/guides-content.json",
  "data/blog-content.json",
  "data/provider-configs.json"
];

const baseAssets = new Map();
for (const file of ASSET_FILES) baseAssets.set(`/${file}`, await read(`public/${file}`));
baseAssets.set("/", baseAssets.get("/index.html"));

function envWithEvents(events) {
  const assets = new Map(baseAssets);
  assets.set("/data/events.json", JSON.stringify(events));
  return {
    MOCK_MODE: "false",
    ALLOW_MOCK_PRICES: "false",
    TICKETMASTER_DISCOVERY_ENABLED: "false",
    ASSETS: {
      async fetch(request) {
        const body = assets.get(new URL(request.url).pathname);
        return body == null ? new Response("not found", { status: 404 }) : new Response(body, { status: 200 });
      }
    }
  };
}

async function render(pathname, events) {
  const response = await middlewareModule.onRequest({
    request: new Request(`${ORIGIN}${pathname}`),
    env: envWithEvents(events),
    next: () => new Response("static-asset", { status: 200 })
  });
  const html = await response.text();
  return {
    status: response.status,
    html,
    main: (html.match(/<main id="mainContent">([\s\S]*?)<\/main>/) || [])[1] || "",
    robots: (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || "",
    canonical: (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || "",
    title: (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "",
    description: (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "",
    schemaTypes: [...html.matchAll(/"@type":"([^"]+)"/g)].map((match) => match[1])
  };
}

function text(html) {
  return String(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function occurrences(haystack, needle) {
  return haystack.split(needle).length - 1;
}

// Copy that used to appear on every location page. None of it may return, and
// none of it may be replaced with a differently worded equivalent — the point
// of the trim was to remove the sections, not to rewrite them.
const FILLER_MARKERS = [
  "Short answer:",
  "At a glance:",
  "At a glance",
  "Verification recency",
  "Tracked date range",
  "Next tracked show",
  "Coverage",
  "concert FAQ",
  "<details>",
  "how the site works",
  "was verified",
  "Expired dates are removed automatically",
  "selective TourTicketCompare coverage",
  "verification and freshness gates",
  "runtime gates"
];

// ─── city page, with upcoming shows ─────────────────────────────────────────

const cityRecord = findCity(UPCOMING_EVENTS, CITY_SLUG);
assert(cityRecord?.showCount === 4, "fixture city derives four upcoming shows");
assert(cityRecord.indexable, "fixture city clears the 4-show / 2-artist / publishable gate");

const cityPage = await render(`/cities/${CITY_SLUG}`, UPCOMING_EVENTS);
assert(cityPage.status === 200, "city page with upcoming shows returns 200");
const cityText = text(cityPage.main);

// One factual introduction, built from the record — counts and span both.
assert(
  cityText.includes(
    `4 upcoming shows in ${CITY}, ${COUNTRY}: 2 artists at 2 venues, from Thu, Sep 10, 2026 to Fri, Oct 16, 2026.`
  ),
  "city lead states the derived counts and local date span in one sentence"
);
assert(
  cityText.includes(`Selected tour dates we have verified — not a complete ${CITY} events calendar.`),
  "city page keeps the selective-coverage disclosure the policy requires"
);
// Stated once. A second copy is the summary-of-the-summary the trim removed.
assert(occurrences(cityText, "4 upcoming shows") === 1, "city page states its show count exactly once");
assert(occurrences(cityText, "2 artists") === 1, "city page states its artist count exactly once");

// The dates themselves: every upcoming show is listed, labelled with the day it
// happens locally rather than in UTC.
assert(
  occurrences(cityPage.main, "<time datetime=") === cityRecord.showCount,
  "city page renders one dated listing per upcoming show"
);
assert(cityText.includes("Thu, Sep 10, 2026"), "city page labels a 01:00Z show with its local date, not the UTC one");
assert(!cityText.includes("Fri, Sep 11, 2026"), "city page uses no UTC date labels anywhere");
assert(cityText.includes(MAIN_VENUE) && cityText.includes(SECOND_VENUE), "city page groups shows under both venues");
assert(
  cityPage.main.includes(`href="/artists/${artistA.slug}#show-`),
  "city page deep-links each show to its artist event card"
);
assert(
  new RegExp(`<article[^>]*class="info-card show-card[^>]*>[\\s\\S]*?href="/artists/${artistA.slug}#show-[^"]+"[\\s\\S]*?</article>`).test(cityPage.main),
  "city page keeps each artist detail link inside its show card"
);
assert(
  /href="\/api\/out\?showId=[^"]+&amp;provider=ticketmaster/.test(cityPage.main),
  "city page surfaces the existing gated event-level ticket destination"
);
assert(
  occurrences(cityPage.main, 'class="info-card show-card') === cityRecord.showCount,
  "city page renders one event card per upcoming source show"
);
assert(
  occurrences(cityPage.main, 'class="show-card-artist muted"') === cityRecord.showCount &&
    cityPage.main.includes(`>${artistA.name}</p>`) &&
    cityPage.main.includes(`>${artistB.name}</p>`),
  "city cards identify the performer even when the event name adds nothing"
);
assert(
  !cityPage.main.includes('data-copy-show-link='),
  "city cards omit copy-link controls until their client behavior is loaded on city routes"
);

// Ticket-comparison guidance is retained.
assert(cityText.includes(`Compare tickets for a ${CITY} concert`), "city page keeps its ticket-comparison section");
assert(
  cityText.includes("Use the ticket button on the selected date above") &&
    cityText.includes("Open the artist page for additional date details"),
  "city guidance directs visitors to the direct ticket CTA and retains artist pages for details"
);
assert(
  cityPage.main.includes('href="/guides/how-to-compare-concert-ticket-prices"') &&
    cityPage.main.includes('href="/guides/concert-ticket-fees-explained"'),
  "city page links the buying guides rather than restating them"
);
assert(cityText.includes("Maintained by the TourTicketCompare editorial team."), "city page keeps its editorial byline");

for (const marker of FILLER_MARKERS) {
  assert(!cityPage.main.includes(marker), `city page no longer renders template filler: "${marker}"`);
}

// Metadata, canonical, indexability and structured data survive the trim.
assert(cityPage.robots.startsWith("index,follow"), "indexable city page stays index,follow");
assert(cityPage.canonical === `${ORIGIN}/cities/${CITY_SLUG}`, "city page keeps its self-referencing canonical");
assert(cityPage.title.includes(`Concerts in ${CITY}`), "city page keeps its title");
assert(cityPage.description.includes(CITY), "city page keeps its meta description");
for (const type of ["Place", "CollectionPage", "BreadcrumbList", "MusicEvent"]) {
  assert(cityPage.schemaTypes.includes(type), `city page still emits ${type} structured data`);
}
// The FAQ is gone from the page, so its mirror is gone from the graph: schema
// never describes content the page does not show.
assert(!cityPage.schemaTypes.includes("FAQPage"), "city page emits no FAQPage without a visible FAQ");

// ─── city page, with no upcoming shows ──────────────────────────────────────

// The route itself 404s once every date has passed — that behaviour is
// unchanged, and is what keeps an empty city out of the index.
assert(deriveCities(EXPIRED_EVENTS).length === 0, "a city with only past shows derives no record");
const expiredCity = await render(`/cities/${CITY_SLUG}`, EXPIRED_EVENTS);
assert(expiredCity.status === 404, "a city whose dates have all passed returns 404");

// The template still has to answer for the record it is handed. This is the
// state between a date passing and the derivation seeing it.
const emptyCityBody = renderCityPageBody({
  type: "city",
  path: `/cities/${CITY_SLUG}`,
  city: { slug: CITY_SLUG, city: CITY, country: COUNTRY, shows: [], showCount: 0, artistCount: 0, venueCount: 0 },
  breadcrumb: [
    { name: "Cities", path: "/cities" },
    { name: `${CITY}, ${COUNTRY}`, path: `/cities/${CITY_SLUG}` }
  ]
});
const emptyCityText = text(emptyCityBody);
assert(
  emptyCityText.includes(`No upcoming shows in ${CITY}, ${COUNTRY} are listed right now.`),
  "empty city page states plainly that nothing is listed"
);
assert(emptyCityBody.includes('href="/cities"') && emptyCityBody.includes('href="/artists"'), "empty city page offers a way onward");
assert(!emptyCityBody.includes("<time datetime="), "empty city page renders no dated listings");
assert(
  !/\b\d+ upcoming shows?\b/.test(emptyCityText),
  "empty city page claims no show count"
);
for (const marker of FILLER_MARKERS) {
  assert(!emptyCityBody.includes(marker), `empty city page renders no filler: "${marker}"`);
}
// Short means short: heading, one sentence, two links, byline.
assert(emptyCityText.split(" ").length < 40, `empty city page stays brief (was ${emptyCityText.split(" ").length} words)`);

// ─── venue page, with upcoming shows ────────────────────────────────────────

const venueRecord = findVenue(UPCOMING_EVENTS, MAIN_VENUE_SLUG);
assert(venueRecord?.showCount === 3, "fixture venue derives three upcoming shows");
assert(venueRecord.indexable, "fixture venue clears the 3-show / 2-artist / publishable gate");

const venuePage = await render(`/venues/${MAIN_VENUE_SLUG}`, UPCOMING_EVENTS);
assert(venuePage.status === 200, "venue page with upcoming shows returns 200");
const venueText = text(venuePage.main);

assert(
  venueText.includes(
    `3 upcoming shows at ${MAIN_VENUE} in ${CITY}, ${COUNTRY}: 2 artists, from Thu, Sep 10, 2026 to Fri, Oct 2, 2026.`
  ),
  "venue lead states the derived counts and local date span in one sentence"
);
assert(
  venueText.includes(`Selected tour dates we have verified — not the full ${MAIN_VENUE} calendar.`),
  "venue page keeps its selective-coverage disclosure"
);
assert(occurrences(venueText, "3 upcoming shows") === 1, "venue page states its show count exactly once");
assert(occurrences(venueText, "2 artists") === 1, "venue page states its artist count exactly once");

assert(venueText.includes(`Upcoming shows at ${MAIN_VENUE}`), "venue page keeps its schedule heading");
// The lead's span and the show cards below it are formatted by different code
// paths; a UTC fallback in either would make the page contradict itself.
assert(!venueText.includes("Fri, Sep 11, 2026"), "venue page uses no UTC date labels anywhere");
assert(!venueText.includes(SECOND_VENUE), "venue page lists only shows at this venue");
assert(
  venuePage.main.includes(`href="/artists/${artistA.slug}"`) && venuePage.main.includes(`href="/artists/${artistB.slug}"`),
  "venue page links out to both artists' pages"
);
// The venue schedule is the show-card component, so the event-level CTA and its
// gating are unchanged by the template trim.
assert(
  /href="\/api\/out\?showId=fixture-[^"]+&amp;provider=/.test(venuePage.main),
  "venue page still renders gated event-level provider CTAs"
);

assert(venueText.includes(`Getting tickets at ${MAIN_VENUE}`), "venue page keeps its ticket guidance section");
assert(
  venuePage.main.includes('href="/guides/how-to-compare-concert-ticket-prices"') &&
    venuePage.main.includes('href="/guides/concert-ticket-fees-explained"'),
  "venue page links the buying guides"
);
assert(venuePage.main.includes(`href="/cities/${CITY_SLUG}"`), "venue page links back to its city page");
assert(venueText.includes("Maintained by the TourTicketCompare editorial team."), "venue page keeps its editorial byline");

for (const marker of FILLER_MARKERS) {
  assert(!venuePage.main.includes(marker), `venue page no longer renders template filler: "${marker}"`);
}

assert(venuePage.robots.startsWith("index,follow"), "indexable venue page stays index,follow");
assert(venuePage.canonical === `${ORIGIN}/venues/${MAIN_VENUE_SLUG}`, "venue page keeps its self-referencing canonical");
assert(venuePage.title.includes(MAIN_VENUE), "venue page keeps its title");
assert(venuePage.description.includes(MAIN_VENUE), "venue page keeps its meta description");
for (const type of ["MusicVenue", "CollectionPage", "BreadcrumbList", "MusicEvent"]) {
  assert(venuePage.schemaTypes.includes(type), `venue page still emits ${type} structured data`);
}
assert(!venuePage.schemaTypes.includes("FAQPage"), "venue page emits no FAQPage without a visible FAQ");

// ─── venue page, with no upcoming shows ─────────────────────────────────────

assert(deriveVenues(EXPIRED_EVENTS).length === 0, "a venue with only past shows derives no record");
const expiredVenue = await render(`/venues/${MAIN_VENUE_SLUG}`, EXPIRED_EVENTS);
assert(expiredVenue.status === 404, "a venue whose dates have all passed returns 404");

const emptyVenueBody = renderVenuePageBody(
  {
    type: "venue",
    path: `/venues/${MAIN_VENUE_SLUG}`,
    venue: { slug: MAIN_VENUE_SLUG, venue: MAIN_VENUE, city: CITY, country: COUNTRY, shows: [], showCount: 0, artistSlugs: [] },
    breadcrumb: [
      { name: "Venues", path: "/venues" },
      { name: MAIN_VENUE, path: `/venues/${MAIN_VENUE_SLUG}` }
    ]
  },
  []
);
const emptyVenueText = text(emptyVenueBody);
assert(
  emptyVenueText.includes(`No upcoming shows at ${MAIN_VENUE} are listed right now.`),
  "empty venue page states plainly that nothing is listed"
);
assert(emptyVenueBody.includes('href="/venues"') && emptyVenueBody.includes('href="/artists"'), "empty venue page offers a way onward");
assert(!emptyVenueBody.includes("/api/out?"), "empty venue page renders no ticket CTAs");
assert(!/\b\d+ upcoming shows?\b/.test(emptyVenueText), "empty venue page claims no show count");
for (const marker of FILLER_MARKERS) {
  assert(!emptyVenueBody.includes(marker), `empty venue page renders no filler: "${marker}"`);
}
assert(emptyVenueText.split(" ").length < 40, `empty venue page stays brief (was ${emptyVenueText.split(" ").length} words)`);

console.log(`location-pages: ${passed} assertions passed`);
