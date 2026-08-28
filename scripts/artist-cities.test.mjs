// Focused unit tests for the artist-city derivation in
// functions/_artist-cities.js. Run standalone
// (node scripts/artist-cities.test.mjs) and as part of `npm run test:mvp`.
//
// These lock the data-derived half of the artist-city lifecycle: which
// combinations qualify for an indexable page, how single-event, multi-event,
// multi-venue, expired, accented, and duplicate-city-name cases behave, and
// that every URL is a deterministic, self-referencing slug.

import {
  deriveArtistCities,
  findArtistCity,
  artistCityFootprint,
  deriveIndexableArtistCities,
  deriveRenderedArtistCities
} from "../functions/_artist-cities.js";
import { ARTIST_CITY_MIN_SHOWS, EXCLUSION_REASONS } from "../functions/_route-indexability.js";

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`artist-cities: ${message}`);
  passed += 1;
}

const NOW = Date.parse("2026-07-01T00:00:00Z");
const opts = { now: NOW };
const future1 = "2026-08-01T19:00:00Z";
const future2 = "2026-08-15T19:00:00Z";
const future3 = "2026-09-10T19:00:00Z";
const past = "2026-05-01T19:00:00Z";

function ev(overrides) {
  return {
    id: overrides.id || `id-${Math.random().toString(36).slice(2)}`,
    artist_slug: "test-artist",
    artist_name: "Test Artist",
    city: "London",
    country: "United Kingdom",
    venue: "The O2",
    datetime_iso: future1,
    tour_name: "Test Tour",
    event_name: "Test Artist Live",
    verification_status: "human_verified",
    provider_links: { ticketmaster: { verified: true } },
    last_verified_at: "2026-06-01",
    ...overrides
  };
}

// --- Single upcoming event: renders, but is NOT indexable -------------------
// The route-usefulness policy treats a one-date city as the artist page
// filtered to one show card: it stays reachable (hasPublishable) and
// noindex,follow (indexable === false).
{
  const events = [ev({ id: "a1" })];
  const cities = deriveArtistCities(events, "test-artist", opts);
  assert(cities.length === 1, "a single upcoming event should yield one artist-city group");
  const city = cities[0];
  assert(city.slug === "london-united-kingdom", "slug should be city + normalized country");
  assert(city.showCount === 1 && city.venueCount === 1, "counts should reflect the single show/venue");
  assert(city.hasPublishable === true, "a human_verified event should be publishable");
  assert(city.publishableCount === 1, "publishableCount counts the publishable upcoming shows");
  assert(city.indexable === false, "a single-date city run is not indexable");
  assert(
    city.exclusionReasons.includes(EXCLUSION_REASONS.BELOW_SHOW_THRESHOLD),
    "a single-date city run reports the show-threshold exclusion reason"
  );
  assert(city.label === "London", "unambiguous city keeps a bare label");
  assert(city.providers.includes("Ticketmaster"), "verified Ticketmaster link should surface as a provider");
  assert(city.multiNightSameVenue === false, "a single date is not a multi-night run");
  // It still renders, so it still appears in the rendered set the router and
  // the internal-link audit walk.
  const rendered = deriveRenderedArtistCities(events, ["test-artist"], opts);
  assert(rendered.length === 1, "a single-date combination still renders");
  assert(rendered[0].indexable === false, "the rendered entry carries indexable: false");
  assert(deriveIndexableArtistCities(events, ["test-artist"], opts).length === 0, "and never enters the indexable/sitemap set");
}

// Event timezone must survive the projection used by the artist-city prose.
// This keeps the summary in the venue's local date rather than falling back to UTC.
{
  const events = [ev({ id: "timezone-1", datetime_iso: "2026-08-29T01:00:00Z", timezone: "America/Chicago" })];
  const city = deriveArtistCities(events, "test-artist", opts)[0];
  assert(city.shows[0].timezone === "America/Chicago", "artist-city shows preserve the event timezone");
}

// --- Multiple events, same venue: multi-night run, indexable ----------------
{
  const events = [
    ev({ id: "b1", datetime_iso: future1 }),
    ev({ id: "b2", datetime_iso: future2 })
  ];
  const city = deriveArtistCities(events, "test-artist", opts)[0];
  assert(city.showCount === 2 && city.venueCount === 1, "two dates at one venue");
  assert(city.multiNightSameVenue === true, "two dates at one venue is a multi-night run");
  assert(city.earliestISO === future1 && city.latestISO === future2, "earliest/latest span both dates");
  assert(city.shows[0].id === "b1", "shows sort chronologically");
  assert(ARTIST_CITY_MIN_SHOWS === 2, "the artist-city threshold this suite encodes is two publishable shows");
  assert(city.indexable === true, "a multi-date city run is indexable");
  assert(city.exclusionReasons.length === 0, "an indexable run reports no exclusion reasons");
  assert(deriveIndexableArtistCities(events, ["test-artist"], opts).length === 1, "the multi-date run enters the indexable set");
}

// --- Two upcoming dates, only one publishable: not indexable ----------------
// The threshold counts publishable shows, not raw dates: a second CTA-
// suppressed date adds a row to the board but no comparable ticket option.
{
  const events = [
    ev({ id: "b3", datetime_iso: future1 }),
    ev({ id: "b4", datetime_iso: future2, verification_status: "needs_recheck", provider_links: {} })
  ];
  const city = deriveArtistCities(events, "test-artist", opts)[0];
  assert(city.showCount === 2, "both upcoming dates are grouped");
  assert(city.publishableCount === 1, "only the publishable date counts toward the threshold");
  assert(city.indexable === false, "two dates with one publishable destination is not indexable");
  assert(city.hasPublishable === true, "the page still renders, because one date can lead somewhere");
}

// --- Multiple events across venues ------------------------------------------
{
  const events = [
    ev({ id: "c1", venue: "The O2", datetime_iso: future1 }),
    ev({ id: "c2", venue: "Wembley Stadium", datetime_iso: future2 })
  ];
  const city = deriveArtistCities(events, "test-artist", opts)[0];
  assert(city.venueCount === 2, "distinct venues should be counted");
  assert(city.multiNightSameVenue === false, "two venues is not a same-venue run");
  assert(city.venues.length === 2, "venue labels list both venues");
}

// --- Expired events are excluded --------------------------------------------
{
  const events = [ev({ id: "d1", datetime_iso: past })];
  assert(deriveArtistCities(events, "test-artist", opts).length === 0, "past-only events yield no upcoming group");
  const footprint = artistCityFootprint(events, "test-artist");
  assert(footprint.has("london-united-kingdom"), "footprint should still include a past-only city (for selective redirect)");
}

// --- Non-publishable upcoming: group exists but does not qualify -------------
{
  const events = [ev({ id: "e1", verification_status: "needs_recheck", provider_links: {} })];
  const cities = deriveArtistCities(events, "test-artist", opts);
  assert(cities.length === 1, "an incomplete-but-upcoming event still forms a group");
  assert(cities[0].hasPublishable === false, "a needs_recheck event with no verified link is not publishable");
  const indexable = deriveIndexableArtistCities(events, ["test-artist"], opts);
  assert(indexable.length === 0, "a non-publishable city must not enter the indexable set (never sitemapped)");
}

// --- Country normalization: US aliases merge into one slug ------------------
{
  const events = [
    ev({ id: "f1", city: "New York", country: "United States", venue: "MSG" }),
    ev({ id: "f2", city: "New York", country: "United States Of America", venue: "MSG", datetime_iso: future2 })
  ];
  const cities = deriveArtistCities(events, "test-artist", opts);
  assert(cities.length === 1, "country aliases must merge into a single artist-city page");
  assert(cities[0].slug === "new-york-united-states", "normalized country produces one canonical slug");
  assert(cities[0].showCount === 2, "both alias spellings count toward the same city");
}

// --- Accented city name: deterministic, round-trips via findArtistCity -------
{
  const events = [ev({ id: "g1", city: "Düsseldorf", country: "Germany", venue: "Merkur Spiel-Arena" })];
  const city = deriveArtistCities(events, "test-artist", opts)[0];
  assert(city.slug === "d-sseldorf-germany", "accented city slug is deterministic (matches /cities slugify)");
  assert(findArtistCity(events, "test-artist", city.slug, opts)?.slug === city.slug, "the slug round-trips through findArtistCity");
}

// --- Duplicate city name across countries for one artist: label disambiguates -
{
  const events = [
    ev({ id: "h1", city: "London", country: "United Kingdom", venue: "The O2" }),
    ev({ id: "h2", city: "London", country: "Canada", venue: "Budweiser Gardens", datetime_iso: future2 })
  ];
  const cities = deriveArtistCities(events, "test-artist", opts);
  assert(cities.length === 2, "same-named cities in different countries stay distinct pages");
  for (const city of cities) {
    assert(city.label.includes(","), `ambiguous city label should carry the country (${city.label})`);
  }
  const slugs = cities.map((c) => c.slug);
  assert(new Set(slugs).size === 2 && slugs.includes("london-united-kingdom") && slugs.includes("london-canada"), "each duplicate city has its own slug");
}

// --- Unknown artist / unknown city ------------------------------------------
{
  const events = [ev({ id: "i1" })];
  assert(deriveArtistCities(events, "no-such-artist", opts).length === 0, "unknown artist yields no groups");
  assert(findArtistCity(events, "test-artist", "no-such-city", opts) === null, "unknown city slug resolves to null");
  assert(artistCityFootprint(events, "no-such-artist").size === 0, "unknown artist has an empty footprint");
}

// --- Indexable set gates on the caller-supplied artist allowlist ------------
{
  const events = [ev({ id: "j1" }), ev({ id: "j2", datetime_iso: future2 })];
  assert(deriveIndexableArtistCities(events, [], opts).length === 0, "no indexable artists -> no indexable artist-city pages");
  assert(deriveRenderedArtistCities(events, [], opts).length === 0, "an editorially non-indexable artist renders no artist-city pages either");
  const entries = deriveIndexableArtistCities(events, ["test-artist"], opts);
  assert(entries.length === 1, "an indexable artist with a qualifying city run yields one entry");
  assert(entries[0].path === "/artists/test-artist/tickets/london-united-kingdom", "entry path is the canonical route shape");
  assert(entries[0].lastmod === "2026-06-01", "entry carries the latest verification date as lastmod");
  assert(entries[0].publishableCount === 2, "entry carries the publishable count the gate was decided on");
  assert(entries[0].indexable === true, "entries returned by deriveIndexableArtistCities are indexable by construction");
}

// --- Sorting: most shows first ----------------------------------------------
{
  const events = [
    ev({ id: "k1", city: "Paris", country: "France", venue: "Accor Arena" }),
    ev({ id: "k2", city: "Berlin", country: "Germany", venue: "Uber Arena", datetime_iso: future2 }),
    ev({ id: "k3", city: "Berlin", country: "Germany", venue: "Uber Arena", datetime_iso: future3 })
  ];
  const cities = deriveArtistCities(events, "test-artist", opts);
  assert(cities[0].city === "Berlin", "the city with more shows should sort first");
}

// --- Real events.json: qualifying set is non-empty and well-formed ----------
{
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const events = JSON.parse(await fs.readFile(path.join(root, "public/data/events.json"), "utf8"));
  const artistsMeta = JSON.parse(await fs.readFile(path.join(root, "public/data/artists.json"), "utf8"));
  const indexableSlugs = artistsMeta
    .filter((artist) => artist?.indexing_status === "indexable_with_substantial_content")
    .map((artist) => artist.slug);
  const entries = deriveIndexableArtistCities(events, indexableSlugs);
  assert(entries.length > 0, "real data should currently produce qualifying artist-city pages");
  for (const entry of entries) {
    assert(/^\/artists\/[a-z0-9-]+\/tickets\/[a-z0-9-]+$/.test(entry.path), `entry path must match the canonical route shape (${entry.path})`);
    assert(indexableSlugs.includes(entry.artistSlug), "every entry belongs to an indexable artist");
  }
  const paths = entries.map((entry) => entry.path);
  assert(new Set(paths).size === paths.length, "artist-city paths are unique (no duplicate URLs)");
}

console.log(`artist-cities: ${passed} assertions passed`);
