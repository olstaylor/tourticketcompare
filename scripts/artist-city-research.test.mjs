// Date-controlled tests for the artist city research (scripts/lib/artist-city-research.mjs).
// Run standalone (node scripts/artist-city-research.test.mjs) and as part of
// `npm run test:mvp`.
//
// These lock what the report may print (one site, each city's next date, one
// country and currency, fresh gated snapshots), when it must refuse to
// publish, that a new post is always a draft and a published one is never
// unpublished, and that neither the post, the PR package nor the chart carries
// a banned claim, a contact, an outreach promise or first-person copy.

import {
  ARTIST_CITY_GATE,
  artistCityGate,
  artistCitySlug,
  buildArtistCityFigures,
  headline,
  renderArtistCityChart,
  renderArtistCityPost,
  renderArtistCityPrPackage
} from "./lib/artist-city-research.mjs";
import { PRICE_DISCLOSURE } from "../functions/_price-wording.js";
import { findFirstPersonPlural } from "./check-site-voice.mjs";

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`artist-city-research: ${message}`);
  passed += 1;
}

const NOW_MS = Date.parse("2026-10-16T12:00:00Z");
const FRESH = "2026-10-16T10:00:00.000Z";
const LIVE = new Set(["vivid-seats", "ticketnetwork", "stubhub-international"]);
const artists = [
  { slug: "artist-a", name: "Artist A", indexing_status: "indexable_with_substantial_content" },
  { slug: "artist-held", name: "Held", indexing_status: "review_required" }
];

let seq = 0;
function event(datetime, extra = {}) {
  seq += 1;
  return {
    id: `e-${seq}`,
    artist_slug: "artist-a",
    artist_name: "Artist A",
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

const lane = (provider, price, extra = {}) => ({ provider, price, currency: "USD", fetchedAt: FRESH, status: "ok", ...extra });

// `names` US cities, two dates each (only the first may be used), priced on
// Vivid Seats at `base + index * step`, plus a UK date and a tourless date.
function fixture(names, { base = 40, step = 10, priceOf = null, unpriced = new Set() } = {}) {
  const events = [];
  const shows = [];
  for (const [i, city] of names.entries()) {
    const first = event(`2027-03-${String((i % 27) + 1).padStart(2, "0")}T22:00:00Z`, { city, venue: `${city} Hall` });
    const later = event(`2027-04-${String((i % 27) + 1).padStart(2, "0")}T22:00:00Z`, { city, venue: `${city} Hall` });
    events.push(first, later);
    const price = priceOf ? priceOf(i) : base + i * step;
    shows.push({ ...first, prices: unpriced.has(city) ? [] : [lane("Vivid Seats", price), ...(i < 3 ? [lane("TicketNetwork", 20)] : [])] });
    shows.push({ ...later, prices: [lane("Vivid Seats", 1)] }); // a later date's lower figure must not be used
  }
  const uk = event("2027-05-01T19:00:00Z", { city: "London", country: "Great Britain", venue: "The O2", timezone: "Europe/London" });
  events.push(uk, event("2027-05-02T22:00:00Z", { city: "Tucson", venue: "Tucson Hall", tour_name: "" }));
  shows.push({ ...uk, prices: [lane("Vivid Seats", 900)] });
  return { events, shows };
}

const names = ["Austin", "Boston", "Chicago", "Denver", "El Paso", "Fresno", "Gary", "Houston", "Irvine", "Jackson"];
const { events, shows } = fixture(names);
const build = (overrides = {}, input = { events, shows }) =>
  buildArtistCityFigures(input.shows, input.events, artists, { artistSlug: "artist-a", now: NOW_MS, priceGuideArtists: new Set(["artist-a"]), availableSites: LIVE, ...overrides });

const figures = build();
assert(figures.site === "vivid-seats" && figures.siteLabel === "Vivid Seats", "the site pricing the most cities is chosen; TicketNetwork's three are not shown");
assert(figures.cities.length === 10 && figures.currency === "USD" && figures.country === "United States", "ten US cities in one currency");
assert(figures.cities.map((row) => row.price).join() === "40,50,60,70,80,90,100,110,120,130", "each city's next date only, lowest first");
assert(figures.low.city === "Austin" && figures.high.city === "Jackson" && figures.median === 85, "low, high and median city");
assert(figures.ratio === 3.2, "the gap is 130 / 40 = 3.25, rounded down to 3.2");
assert(figures.coverage.marketCities === 10 && figures.coverage.pricedCities === 10 && figures.coverage.share === 1, "every US city is priced");
assert(figures.coverage.otherCountries.length === 1 && figures.coverage.otherCountries[0].country === "United Kingdom" && figures.coverage.otherCountries[0].dates === 1, "the UK date is reported as not compared");
assert(figures.cities.every((row) => /^\/artists\/artist-a\/tickets\/[a-z-]+-united-states$/.test(row.path)), "each city links to its artist-city page");
assert(figures.pricePath === "/artists/artist-a/ticket-prices" && build({ priceGuideArtists: new Set() }).pricePath === "", "the price guide link exists only for artists that have one");
assert(artistCityGate(figures).length === 0, "a complete 10-city result clears the gate");

// Suppression.
assert(buildArtistCityFigures(shows, events, artists, { artistSlug: "artist-a", now: NOW_MS }) === null, "no availability answer means no figures");
assert(artistCityGate(null).length === 1, "no figures is a refusal, not an empty page");
assert(build({ artistSlug: "nobody" }) === null, "an unknown artist has no figures");
const thin = fixture(names.slice(0, 6));
assert(artistCityGate(build({}, thin)).some((reason) => /needs 8/.test(reason)), `${ARTIST_CITY_GATE.minPricedCities}+ priced cities are needed`);
const wideNames = Array.from({ length: 20 }, (_, i) => `City${String.fromCharCode(65 + i)}`);
const patchy = fixture(wideNames, { unpriced: new Set(wideNames.slice(9)) });
const patchyFigures = build({}, patchy);
assert(patchyFigures.cities.length === 9 && patchyFigures.coverage.marketCities === 20, "unpriced cities still count against coverage");
assert(artistCityGate(patchyFigures).some((reason) => /9 of 20/.test(reason)), "under half the cities priced is refused");
assert(artistCityGate({ ...figures, artistPageIndexable: false }).length === 1, "an artist page that is not indexable is refused");
const heldArtists = [...artists, { slug: "artist-held", name: "Held", indexing_status: "review_required" }];
const heldEvents = events.map((ev) => ({ ...ev, artist_slug: "artist-held" }));
const heldShows = shows.map((show) => ({ ...show, artist_slug: "artist-held" }));
const held = buildArtistCityFigures(heldShows, heldEvents, heldArtists, { artistSlug: "artist-held", now: NOW_MS, availableSites: LIVE });
assert(!held || !held.artistPageIndexable, "an artist held from indexing cannot pass");
assert(build({ now: NOW_MS + 4 * 86400000 }) === null, "snapshots older than 72 hours are left out");

// Market: the largest country and currency group wins, never a mix.
const mixed = fixture(names);
mixed.shows = mixed.shows.map((show) => (["Austin", "Boston", "Chicago"].includes(show.city) ? { ...show, prices: show.prices.map((price) => ({ ...price, currency: "CAD" })) } : show));
const mixedFigures = build({}, mixed);
assert(mixedFigures.currency === "USD" && mixedFigures.cities.length === 7, "dates priced in another currency are left out, not converted");

// More than 20 cities: every priced city is tabled, so the headline count and the table rows always agree.
const big = fixture(wideNames.concat(["CityU", "CityV", "CityW", "CityX"]));
const bigFigures = build({}, big);
const bigPost = renderArtistCityPost(bigFigures);
assert(bigFigures.cities.length === 24, "24 priced cities");
assert((bigPost.match(/^\| \[/gm) || []).length === bigFigures.cities.length && !/cities in between/.test(bigPost), "every priced city is tabled, none hidden");
assert(bigPost.includes(`the lowest listed price for the next date in ${bigFigures.cities.length} cities`) && bigPost.includes(`${bigFigures.cities.length} cities had a recent listed price`), "headline, summary and intro use the table's row count");

// Post.
const post = renderArtistCityPost(figures);
assert(/^status: draft$/m.test(post), "a new post is a draft");
assert(/^date: 2026-10-16$/m.test(post) && !/^updated:/m.test(post), "a new post carries today's date");
assert((post.match(/^\| \[/gm) || []).length === 10, "every city is tabled");
assert(post.includes("16 October, 10:00 UTC") && post.includes("Vivid Seats"), "each figure carries its site and capture time");
assert(post.includes(PRICE_DISCLOSURE), "the shared price disclosure is printed");
assert(post.includes("(/artists/artist-a/ticket-prices)") && post.includes("/artists/artist-a/tickets/austin-united-states"), "the post links the price guide and the city pages");
assert(/the United Kingdom \(1\)/.test(post) && /Next date only/.test(post) && /72 hours/.test(post), "the method names the left-out dates, next-date rule and age cap");
assert(!/\b(cheapest|lowest price|will (?:fall|drop|rise)|best time|sold out|guaranteed)\b/i.test(post) && !/\bfrom \$/.test(post), "the post makes no banned or forecast claim");
assert(findFirstPersonPlural(post).length === 0, "the post does not speak as \"we\"");
const published = renderArtistCityPost({ ...figures, asOf: "2026-10-20" }, { date: "2026-10-16", status: "published" });
assert(/^status: published$/m.test(published) && /^date: 2026-10-16$/m.test(published) && /^updated: 2026-10-20$/m.test(published), "a published post stays published and is re-dated only by `updated`");
assert(/^description: ".{20,160}"$/m.test(post), "the search description fits the blog build's 160 characters");
const longName = renderArtistCityPost({ ...figures, artist: "An Artist With A Remarkably Long Name Indeed", tourName: "The Extraordinarily Long And Winding World Tour Of Twenty Twenty Seven" });
assert(/^description: ".{20,160}"$/m.test(longName), "a long artist and tour name falls back to a shorter description");
assert(artistCitySlug("artist-a") === "artist-a-tour-ticket-prices-by-city", "the slug is stable per artist");
assert(headline(figures).includes("$40 in Austin") && headline(figures).includes("$130 in Jackson"), "the headline names both cities and prices");

// PR package.
const pr = renderArtistCityPrPackage(figures);
assert(/DRAFT, NOT SENT/.test(pr) && /- \[ \] Approve recipients/.test(pr) && !/- \[x\]/i.test(pr), "the package is unsent with an unticked owner approval list");
assert(pr.includes("https://tourticketcompare.com/blog/artist-a-tour-ticket-prices-by-city"), "the package names the permanent URL");
assert(!/@|mailto:|https?:\/\/(?!tourticketcompare\.com)/.test(pr), "no contact, address or outside link is invented");
assert(/Austin, low end/.test(pr) && /Jackson, high end\.[^\n]*3\.2 times/.test(pr), "city angles cite their figures");
assert(!/\b(cheapest|lowest price|will (?:fall|drop|rise)|best time|guaranteed)\b/i.test(pr), "the package makes no banned or forecast claim");
assert(findFirstPersonPlural(pr).length === 0, "the package does not speak as \"we\"");
assert(/no saving is claimed/.test(pr), "no travel saving is claimed without travel-cost data");

// Search title: 60 characters including the site suffix, whatever the artist's name length.
for (const artist of ["Sombr", "Lizzy McAlpine", "Greta Van Fleet", "Carly Rae Jepsen", "An Artist With A Remarkably Long Name Indeed"]) {
  const seo = renderArtistCityPost({ ...figures, artist }).match(/^seo_title: "(.+)"$/m)?.[1] || "";
  assert(seo.startsWith(artist) && (seo + " | TourTicketCompare").length <= 60 || artist.length > 40, `${artist}: seo_title fits the 60-character budget`);
}

// Chart.
const svg = renderArtistCityChart({ ...figures, cities: figures.cities.map((row, i) => (i === 0 ? { ...row, city: "Salt & <Pepper>" } : row)) });
assert(svg.startsWith("<svg") && svg.includes("Salt &amp; &lt;Pepper&gt;") && !svg.includes("<Pepper>"), "city names are escaped in the chart");
assert(svg.includes("Vivid Seats") && svg.includes("16 October 2026") && /Listed prices, not final totals/.test(svg), "the chart names the site, the capture date and the caveat");

console.log(`artist-city-research: ${passed} assertions passed`);
