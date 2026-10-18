// Date-controlled tests for the automated data stories (scripts/lib/data-stories.mjs).
// Run standalone (node scripts/data-stories.test.mjs) and as part of
// `npm run test:mvp`.
//
// These lock what a story may count (the /tours/<year> hub rules), the publish
// gate, that a new post is always a draft and a published one is never
// unpublished or re-dated, and that neither the post nor the press release
// carries a price, a banned claim or first-person copy.

import {
  buildTourMapFigures,
  storyGate,
  renderTourMapPost,
  renderTourMapPressRelease,
  tourMapSlug,
  STORY_GATE,
  buildPriceMoveFigures,
  priceMovesGate,
  priceMovesSql,
  renderPriceMovesPost,
  PRICE_MOVE_GATE,
  buildCityPriceFigures,
  cityPricesGate,
  renderCityPricesPost,
  CITY_PRICE_GATE
} from "./lib/data-stories.mjs";
import { findFirstPersonPlural } from "./check-site-voice.mjs";

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`data-stories: ${message}`);
  passed += 1;
}

const NOW_MS = Date.parse("2026-10-16T12:00:00Z");

const artists = [
  { slug: "artist-a", name: "Artist A", indexing_status: "indexable_with_substantial_content" },
  { slug: "artist-b", name: "Artist B", indexing_status: "indexable_with_substantial_content" },
  { slug: "artist-held", name: "Held", indexing_status: "review_required" }
];

let seq = 0;
function event(artist, datetime, extra = {}) {
  seq += 1;
  return {
    id: `e-${seq}`,
    artist_slug: artist,
    artist_name: artist === "artist-a" ? "Artist A" : "Artist B",
    city: "Springfield",
    country: "United States Of America",
    venue: "Springfield Arena",
    datetime_iso: datetime,
    timezone: "America/Los_Angeles",
    tour_name: "The Big Tour",
    last_verified_at: "2026-10-15",
    ticketmaster_url: `https://www.ticketmaster.com/event/${seq}`,
    ...extra
  };
}

const events = [
  ...Array.from({ length: 6 }, (_, i) => event("artist-a", `2027-03-0${i + 1}T22:00:00Z`)),
  ...Array.from({ length: 5 }, (_, i) =>
    event("artist-b", `2027-05-0${i + 1}T19:00:00Z`, { city: "London", country: "Great Britain", venue: "The O2", timezone: "Europe/London" })
  ),
  // 05:00Z on 1 Jan 2027 is still 31 Dec 2026 in Los Angeles: not a 2027 date.
  event("artist-a", "2027-01-01T05:00:00Z"),
  event("artist-a", "2026-11-01T03:00:00Z"),
  event("artist-a", "2028-02-01T03:00:00Z"),
  event("artist-a", "2027-04-01T03:00:00Z", { ticketmaster_status_code: "cancelled" }),
  event("artist-held", "2027-04-02T03:00:00Z"),
  event("not-in-artists", "2027-04-03T03:00:00Z")
];

const figures = buildTourMapFigures(events, artists, { year: 2027, now: NOW_MS });
assert(figures.showCount === 11, `counts only upcoming, live, in-year shows by indexable artists (got ${figures.showCount})`);
assert(figures.artistCount === 2, "non-indexable and unknown artists are left out");
assert(figures.countryCount === 2, "United States spellings merge, Great Britain reads as United Kingdom");
assert(figures.topCountries[0].label === "United States", "country labels are normalised");
assert(figures.months[2].showCount === 6 && figures.months[4].showCount === 5, "months use the venue's local date");
assert(figures.months[0].showCount === 0, "a show on 31 Dec local time is not counted in January");
assert(figures.topCities[0].label === "Springfield" && figures.topCities[0].showCount === 6, "cities rank by dates");
assert(figures.topVenues.every((row) => row.showCount >= STORY_GATE.minRankedShows), "rows below the ranking floor are not named");
assert(figures.asOf === "2026-10-16" && figures.latestVerified === "2026-10-15", "as-of and freshness dates are carried");

// The gate: this fixture is far too thin to publish.
const reasons = storyGate(figures, NOW_MS);
assert(reasons.some((reason) => reason.includes("shows")), "thin corpus fails the show floor");
assert(reasons.some((reason) => reason.includes("artists")), "thin corpus fails the artist floor");
const stale = storyGate({ ...figures, latestVerified: "2026-09-01" }, NOW_MS);
assert(stale.some((reason) => reason.includes("newest recheck")), "a stale corpus fails");
const healthy = {
  ...figures,
  showCount: 1000,
  artistCount: 50,
  countryCount: 10,
  topCities: [figures.topCities[0], figures.topCities[1], figures.topCities[0]],
  topVenues: [figures.topVenues[0], figures.topVenues[1], figures.topVenues[0]]
};
assert(storyGate(healthy, NOW_MS).length === 0, "a broad, fresh corpus passes");

// Rendering.
const story = { ...healthy, topCities: [...healthy.topCities], topCountries: figures.topCountries, topArtists: figures.topArtists };
const post = renderTourMapPost(story);
assert(/^status: draft$/m.test(post), "a new post is a draft");
assert(/^date: 2026-10-16$/m.test(post) && !/^updated:/m.test(post), "a new post is dated today with no updated date");
const refreshed = renderTourMapPost({ ...story, asOf: "2026-11-16" }, { date: "2026-10-16", status: "published" });
assert(/^status: published$/m.test(refreshed), "a refresh keeps a person's publish decision");
assert(/^date: 2026-10-16$/m.test(refreshed) && /^updated: 2026-11-16$/m.test(refreshed), "a refresh keeps the first date and sets updated");
const stillDraft = renderTourMapPost(story, { date: "2026-10-01", status: "anything-else" });
assert(/^status: draft$/m.test(stillDraft), "only an explicit published status survives");
assert(post.includes("not of every concert in 2027"), "the post says the counts cover tracked tours only");
assert(post.includes("(/tours/2027)"), "the live hub year links the tours hub");
const otherYear = renderTourMapPost({ ...story, year: 2028 });
assert(!otherYear.includes("/tours/"), "another year does not link a hub route that does not exist");

const release = renderTourMapPressRelease(story);
assert(release.startsWith("# DRAFT PRESS RELEASE — not sent."), "the release is marked as an unsent draft");
assert(!/[“"][^”"]{20,}[”"]\s*(?:said|says)/i.test(release) && !/\bsaid\b/i.test(release), "the release has no quotes");
assert(release.includes(`/blog/${tourMapSlug(2027)}`), "the release links the story");

for (const [name, text] of [["post", post], ["release", release]]) {
  assert(!/[$£€]\s?\d/.test(text), `${name} carries no price`);
  assert(!/\b(cheapest|lowest price|sold out|selling fast|last chance|prices? (?:drop|fall|rise))\b/i.test(text), `${name} carries no banned claim`);
  assert(findFirstPersonPlural(text).length === 0, `${name} does not speak as "we"`);
}

// Price moves: counts per site, same event and site only, no price figures.
const pmEvents = Array.from({ length: 60 }, (_, i) =>
  event(i % 2 ? "artist-a" : "artist-b", `2027-02-${String((i % 27) + 1).padStart(2, "0")}T22:00:00Z`)
);
const pmRow = (ev, base, latest, extra = {}) => ({
  artist_slug: ev.artist_slug,
  provider: "vivid-seats",
  event_id: ev.id,
  currency: "USD",
  base_date: "2026-09-17",
  base_price: base,
  latest_date: "2026-10-16",
  latest_price: latest,
  ...extra
});
const pmRows = [
  ...pmEvents.map((ev, i) => pmRow(ev, 100, i < 30 ? 80 : i < 50 ? 120 : 101)),
  pmRow(pmEvents[0], 100, 50, { provider: "seatgeek" }),
  pmRow(pmEvents[1], 100, 50, { latest_date: "2026-10-01" }),
  pmRow(pmEvents[2], 100, 50, { base_date: "2026-10-10", provider: "ticketnetwork" }),
  pmRow(pmEvents[3], 0, 50, { provider: "stubhub-international" }),
  pmRow({ id: "gone", artist_slug: "artist-a" }, 100, 50, { provider: "ticketnetwork" })
];
const pmArtists = [...artists, ...Array.from({ length: 9 }, (_, i) => ({ slug: `x${i}`, name: `X${i}`, indexing_status: "indexable_with_substantial_content" }))];
const pm = buildPriceMoveFigures(pmRows, pmEvents, pmArtists, { now: NOW_MS });
assert(pm.sites.length === 1 && pm.sites[0].site === "vivid-seats", "only price-lane sites with valid, in-window rows count");
assert(pm.sites[0].lower === 30 && pm.sites[0].higher === 20 && pm.sites[0].same === 10, "moves inside 2% count as about the same");
assert(pm.sites[0].dates === 60 && pm.sites[0].artistCount === 2, "dates and artists are counted per site");
assert(priceMovesGate(pm).sites.length === 0, `a site needs ${PRICE_MOVE_GATE.minArtistsPerSite}+ artists to clear the gate`);
const wide = { ...pm, sites: [{ ...pm.sites[0], artistCount: 12 }] };
assert(priceMovesGate(wide).sites.length === 1, "a broad site clears the gate");
const pmPost = renderPriceMovesPost(wide);
assert(/^status: draft$/m.test(pmPost), "a new price-moves post is a draft");
assert(!/[$£€]\s?\d/.test(pmPost) && !/\bUSD\b/.test(pmPost), "the price-moves post prints no price");
assert(!/\b(cheapest|lowest price|will (?:fall|drop|rise)|best time)\b/i.test(pmPost), "the price-moves post makes no ranking or forecast claim");
assert(findFirstPersonPlural(pmPost).length === 0, "the price-moves post does not speak as \"we\"");
assert(priceMovesSql("2026-10-17").includes("date('2026-10-17','-31 day')"), "the query is anchored on the as-of date");
let rejected = false;
try { priceMovesSql("2026-10-17'; DROP"); } catch { rejected = true; }
assert(rejected, "the query refuses anything but a plain date");

// Same tour, different city: one site per tour, each city's next date, one
// country and currency, gated snapshots only.
const CITIES = ["Austin", "Boston", "Chicago", "Denver", "El Paso", "Fresno", "Gary", "Houston", "Irvine", "Jackson"];
const cityEvents = [];
for (const [i, city] of CITIES.entries()) {
  // Two dates per city; only the earlier one may be used.
  cityEvents.push(event("artist-a", `2027-03-${String(i + 1).padStart(2, "0")}T22:00:00Z`, { city, venue: `${city} Hall` }));
  cityEvents.push(event("artist-a", `2027-04-${String(i + 1).padStart(2, "0")}T22:00:00Z`, { city, venue: `${city} Hall` }));
}
cityEvents.push(event("artist-a", "2027-05-01T19:00:00Z", { city: "London", country: "Great Britain", venue: "The O2", timezone: "Europe/London" }));
cityEvents.push(event("artist-a", "2027-05-02T22:00:00Z", { city: "Tucson", venue: "Tucson Hall", tour_name: "" }));
const fresh = "2026-10-16T10:00:00.000Z";
const lane = (provider, price, extra = {}) => ({ provider, price, currency: "USD", fetchedAt: fresh, status: "ok", ...extra });
const priced = cityEvents.map((ev, i) => {
  const cityIndex = Math.floor(i / 2);
  const prices = [];
  if (ev.city === "London") prices.push(lane("Vivid Seats", 900));
  else if (ev.city === "Tucson") prices.push(lane("Vivid Seats", 5));
  else if (i % 2) prices.push(lane("Vivid Seats", 1)); // a later date's lower figure must not be used
  else {
    prices.push(lane("Vivid Seats", 40 + cityIndex * 10));
    if (cityIndex < 3) prices.push(lane("TicketNetwork", 20));
    if (cityIndex === 9) prices.push(lane("StubHub International", 10, { fetchedAt: "2026-10-01T00:00:00.000Z" }));
    if (cityIndex === 8) prices.push(lane("SeatGeek", 10));
  }
  return { ...ev, prices };
});
const cityFigures = buildCityPriceFigures(priced, cityEvents, artists, { now: NOW_MS, priceGuideArtists: new Set(["artist-a"]) });
const tour = cityFigures.tours[0];
assert(cityFigures.tours.length === 1 && tour.site === "vivid-seats", "the site pricing the most cities is chosen; other sites are not shown");
assert(tour.cityCount === 10 && tour.country === "United States", "the tour is compared inside its main country");
assert(tour.low.price === 40 && tour.low.city === "Austin" && tour.high.price === 130, "each city uses its next date, never a lower later date");
assert(tour.cities.every((row) => row.capturedAt === fresh), "every figure carries its capture time");
assert(tour.path === "/artists/artist-a/ticket-prices", "a registered price guide is linked");
assert(cityFigures.doubledCount === 1 && tour.ratio === 3.3, "the gap is high over low");
assert(cityPricesGate(cityFigures).length === 1, `${CITY_PRICE_GATE.minTours} tours are needed to publish`);
const thin = buildCityPriceFigures(priced.slice(0, 14), cityEvents, artists, { now: NOW_MS });
assert(thin.tours.length === 0, `a tour needs ${CITY_PRICE_GATE.minCitiesPerTour}+ priced cities`);
const stalePrices = buildCityPriceFigures(priced, cityEvents, artists, { now: NOW_MS + 4 * 86400000 });
assert(stalePrices.tours.length === 0, "snapshots older than the freshness window are left out");
const cityPost = renderCityPricesPost(cityFigures);
assert(/^status: draft$/m.test(cityPost), "a new city-prices post is a draft");
assert(cityPost.includes("$40") && cityPost.includes("16 October, 10:00 UTC") && cityPost.includes("| Vivid Seats |"), "each printed price names its site and capture time");
assert(!cityPost.includes("TicketNetwork") && !cityPost.includes("StubHub"), "sites are never set against each other");
assert(!/\b(cheapest|lowest price|will (?:fall|drop|rise)|best time|sold out)\b/i.test(cityPost), "the city-prices post makes no banned claim");
assert(findFirstPersonPlural(cityPost).length === 0, "the city-prices post does not speak as \"we\"");

console.log(`data-stories: ${passed} assertions passed`);
