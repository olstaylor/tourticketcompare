// Focused tests for the shared route-usefulness policy in
// functions/_route-indexability.js and its application in the city and venue
// derivations, plus the artist-city redirect map.
//
// Run standalone (node scripts/route-indexability.test.mjs) and as part of
// `npm run test:mvp`. Everything here is offline: fixture events for the gate
// behaviour, and the in-process Pages Functions harness for the redirect map.
//
// Policy: docs/ROUTE_INDEXABILITY_POLICY.md

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
  CITY_MIN_SHOWS,
  CITY_MIN_ARTISTS,
  VENUE_MIN_SHOWS,
  VENUE_MIN_ARTISTS,
  ARTIST_CITY_MIN_SHOWS,
  EXCLUSION_REASONS,
  eventPublishable,
  eventStatusPublishable,
  cityGate,
  venueGate,
  artistCityGate
} from "../functions/_route-indexability.js";
import { deriveCities } from "../functions/_cities.js";
import { deriveVenues } from "../functions/_venues.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

let passed = 0;
function assert(condition, message) {
  if (!condition) throw new Error(`route-indexability: ${message}`);
  passed += 1;
}

const NOW = Date.parse("2026-07-01T00:00:00Z");
const opts = { now: NOW };
const futureA = "2026-08-01T19:00:00Z";
const futureB = "2026-08-05T19:00:00Z";
const futureC = "2026-08-09T19:00:00Z";
const futureD = "2026-08-14T19:00:00Z";
const past = "2026-05-01T19:00:00Z";

function ev(overrides = {}) {
  return {
    id: overrides.id || `id-${Math.random().toString(36).slice(2)}`,
    artist_slug: "artist-one",
    artist_name: "Artist One",
    city: "Leeds",
    country: "United Kingdom",
    venue: "First Direct Arena",
    datetime_iso: futureA,
    verification_status: "human_verified",
    provider_links: { ticketmaster: { verified: true } },
    last_verified_at: "2026-06-01",
    ...overrides
  };
}

// --- Publishability -------------------------------------------------------
{
  assert(eventPublishable(ev()) === true, "human_verified is publishable");
  assert(eventPublishable(ev({ verification_status: "machine_high_confidence" })) === true, "machine_high_confidence is publishable");
  assert(
    eventPublishable(ev({ verification_status: "needs_recheck", provider_links: {} })) === false,
    "needs_recheck with no verified link at all is not publishable"
  );
  assert(
    eventPublishable({ provider_links: { ticketmaster: { verified: true } } }) === true,
    "a statusless record falls back to the verified Ticketmaster link"
  );
  assert(eventPublishable({ provider_links: {} }) === false, "a statusless record with no verified link is not publishable");
  assert(eventPublishable(null) === false, "a missing record is not publishable");
}

// --- Standalone marketplace destinations on needs_recheck rows --------------
// This is the shape that dominates the real data: Arlington, Houston and
// Sunrise are entirely needs_recheck rows carrying verified SeatGeek links, and
// every one of them renders a working SeatGeek CTA. A destination test that
// looked only at the row status would call those pages dead ends.
{
  const standalone = ev({
    verification_status: "needs_recheck",
    provider_links: {
      ticketmaster: { verified: false, url: "https://www.ticketmaster.com/event/ABC" },
      seatgeek: { verified: true, url: "https://seatgeek.com/artist-one-tickets/leeds" }
    }
  });
  assert(eventPublishable(standalone) === true, "a needs_recheck row with a verified SeatGeek destination can lead somewhere");
  assert(
    eventStatusPublishable(standalone) === false,
    "...but it stays outside the row-status gate that governs MusicEvent emission"
  );

  // Provenance without a destination is not a destination: the renderer's
  // safe-URL check would drop the button, so counting it would promise a
  // reachable page with no reachable link.
  const noUrl = ev({
    verification_status: "needs_recheck",
    provider_links: { seatgeek: { verified: true, url: "" } }
  });
  assert(eventPublishable(noUrl) === false, "verified: true with no stored URL is not a publishable destination");

  // A verified Ticketmaster link alone never rescues a needs_recheck row — the
  // recheck flag is precisely a statement about that storefront URL.
  const tmOnly = ev({
    verification_status: "needs_recheck",
    provider_links: { ticketmaster: { verified: true, url: "https://www.ticketmaster.com/event/ABC" } }
  });
  assert(eventPublishable(tmOnly) === false, "a verified Ticketmaster link does not override needs_recheck");

  // Any approved marketplace lane counts, not just SeatGeek.
  for (const provider of ["vivid-seats", "ticketnetwork", "stubhub-international"]) {
    const row = ev({
      verification_status: "needs_recheck",
      provider_links: { [provider]: { verified: true, url: "https://example.com/event/1" } }
    });
    assert(eventPublishable(row) === true, `a verified ${provider} destination counts as publishable`);
  }

  // A fully verified row is publishable under both gates.
  assert(eventStatusPublishable(ev()) === true, "human_verified passes the row-status gate too");
}

// --- Gate units -----------------------------------------------------------
{
  assert(cityGate({ showCount: CITY_MIN_SHOWS, artistCount: CITY_MIN_ARTISTS, publishableCount: 1 }).indexable, "a city exactly on every threshold is indexable");
  assert(
    cityGate({ showCount: CITY_MIN_SHOWS - 1, artistCount: CITY_MIN_ARTISTS, publishableCount: 1 }).reasons.includes(
      EXCLUSION_REASONS.BELOW_SHOW_THRESHOLD
    ),
    "one show short of the city threshold reports below_show_threshold"
  );
  assert(
    cityGate({ showCount: CITY_MIN_SHOWS, artistCount: 1, publishableCount: 1 }).reasons.includes(EXCLUSION_REASONS.BELOW_ARTIST_THRESHOLD),
    "a single-artist city reports below_artist_threshold"
  );
  assert(
    cityGate({ showCount: CITY_MIN_SHOWS, artistCount: CITY_MIN_ARTISTS, publishableCount: 0 }).reasons.includes(
      EXCLUSION_REASONS.NO_PUBLISHABLE_DESTINATION
    ),
    "a city whose dates all lead nowhere reports no_publishable_destination"
  );
  assert(
    cityGate({ showCount: 0, artistCount: 0, publishableCount: 0 }).reasons.includes(EXCLUSION_REASONS.NO_UPCOMING_SHOWS),
    "an empty city reports no_upcoming_shows rather than a threshold miss"
  );

  assert(venueGate({ showCount: VENUE_MIN_SHOWS, artistCount: VENUE_MIN_ARTISTS, publishableCount: 1 }).indexable, "a venue exactly on every threshold is indexable");
  assert(
    !venueGate({ showCount: VENUE_MIN_SHOWS, artistCount: VENUE_MIN_ARTISTS, publishableCount: 0 }).indexable,
    "a venue with no publishable destination is excluded"
  );

  assert(artistCityGate({ showCount: 2, publishableCount: ARTIST_CITY_MIN_SHOWS }).indexable, "an artist-city run on the threshold is indexable");
  assert(
    artistCityGate({ showCount: 1, publishableCount: 1 }).reasons.includes(EXCLUSION_REASONS.BELOW_SHOW_THRESHOLD),
    "a single-date artist-city reports below_show_threshold"
  );
  assert(
    artistCityGate({ showCount: 3, publishableCount: 0 }).reasons.includes(EXCLUSION_REASONS.NO_PUBLISHABLE_DESTINATION),
    "an artist-city with no publishable date reports no_publishable_destination, not a threshold miss"
  );
  const noPublishable = artistCityGate({ showCount: 3, publishableCount: 0 });
  assert(
    !noPublishable.reasons.includes(EXCLUSION_REASONS.BELOW_SHOW_THRESHOLD),
    "the two artist-city exclusion reasons are mutually exclusive, so the report cannot double-count"
  );
}

// --- City derivation ------------------------------------------------------
{
  // Four shows, two artists, all publishable -> indexable.
  const events = [
    ev({ id: "c1", datetime_iso: futureA }),
    ev({ id: "c2", datetime_iso: futureB }),
    ev({ id: "c3", artist_slug: "artist-two", artist_name: "Artist Two", datetime_iso: futureC }),
    ev({ id: "c4", artist_slug: "artist-two", artist_name: "Artist Two", datetime_iso: futureD })
  ];
  const city = deriveCities(events, opts)[0];
  assert(city.showCount === 4 && city.artistCount === 2, "the fixture city has four shows across two artists");
  assert(city.publishableCount === 4 && city.hasPublishable === true, "all four fixture dates are publishable");
  assert(city.indexable === true, "a four-show two-artist city with destinations is indexable");
  assert(city.exclusionReasons.length === 0, "an indexable city reports no exclusion reasons");
}
{
  // Same shape, but every date is CTA-suppressed: the page lists dates that
  // cannot lead anywhere, so it must not be indexed.
  const suppressed = { verification_status: "needs_recheck", provider_links: {} };
  const events = [
    ev({ id: "d1", datetime_iso: futureA, ...suppressed }),
    ev({ id: "d2", datetime_iso: futureB, ...suppressed }),
    ev({ id: "d3", artist_slug: "artist-two", datetime_iso: futureC, ...suppressed }),
    ev({ id: "d4", artist_slug: "artist-two", datetime_iso: futureD, ...suppressed })
  ];
  const city = deriveCities(events, opts)[0];
  assert(city.showCount === 4 && city.artistCount === 2, "the suppressed fixture still clears the count thresholds");
  assert(city.publishableCount === 0, "no date in the suppressed fixture is publishable");
  assert(city.indexable === false, "a city whose every date is CTA-suppressed is not indexable");
  assert(
    city.exclusionReasons.includes(EXCLUSION_REASONS.NO_PUBLISHABLE_DESTINATION),
    "and it says so with the no_publishable_destination reason"
  );
}
{
  // One publishable date is enough to clear the destination gate.
  const events = [
    ev({ id: "e1", datetime_iso: futureA }),
    ev({ id: "e2", datetime_iso: futureB, verification_status: "needs_recheck", provider_links: {} }),
    ev({ id: "e3", artist_slug: "artist-two", datetime_iso: futureC, verification_status: "needs_recheck", provider_links: {} }),
    ev({ id: "e4", artist_slug: "artist-two", datetime_iso: futureD, verification_status: "needs_recheck", provider_links: {} })
  ];
  const city = deriveCities(events, opts)[0];
  assert(city.publishableCount === 1 && city.indexable === true, "one reachable destination clears the city destination gate");
}
{
  const events = [ev({ id: "f1", datetime_iso: past })];
  assert(deriveCities(events, opts).length === 0, "past-only events produce no city record at all");
}

// --- Venue derivation -----------------------------------------------------
{
  const events = [
    ev({ id: "g1", datetime_iso: futureA }),
    ev({ id: "g2", datetime_iso: futureB }),
    ev({ id: "g3", artist_slug: "artist-two", datetime_iso: futureC })
  ];
  const venue = deriveVenues(events, opts)[0];
  assert(venue.showCount === 3 && venue.artistCount === 2, "the fixture venue has three shows across two artists");
  assert(venue.indexable === true, "a three-show two-artist venue with destinations is indexable");
}
{
  const suppressed = { verification_status: "needs_recheck", provider_links: {} };
  const events = [
    ev({ id: "h1", datetime_iso: futureA, ...suppressed }),
    ev({ id: "h2", datetime_iso: futureB, ...suppressed }),
    ev({ id: "h3", artist_slug: "artist-two", datetime_iso: futureC, ...suppressed })
  ];
  const venue = deriveVenues(events, opts)[0];
  assert(venue.indexable === false, "a venue whose every date is CTA-suppressed is not indexable");
  assert(venue.exclusionReasons.includes(EXCLUSION_REASONS.NO_PUBLISHABLE_DESTINATION), "with the destination reason recorded");
}
{
  const events = [
    ev({ id: "i1", datetime_iso: futureA }),
    ev({ id: "i2", datetime_iso: futureB }),
    ev({ id: "i3", datetime_iso: futureC })
  ];
  const venue = deriveVenues(events, opts)[0];
  assert(venue.indexable === false, "three shows from a single artist do not make a venue page indexable");
  assert(venue.exclusionReasons.includes(EXCLUSION_REASONS.BELOW_ARTIST_THRESHOLD), "with the artist-threshold reason recorded");
}

// --- Redirect map: canonical destination behaviour -------------------------
// The only redirects this policy relies on are the ones the router already
// owned. These assertions lock their canonical destinations and prove the map
// has no chains and no loops: every destination is a 200 that is not itself a
// redirect, and no destination is a source.
{
  const middleware = await import(pathToFileURL(path.join(root, "functions/_middleware.js")));
  const artistCities = await import(pathToFileURL(path.join(root, "functions/_artist-cities.js")));
  const ORIGIN = "https://tourticketcompare.com";

  const assetMap = new Map();
  for (const file of [
    "index.html",
    "data/catalog.json",
    "data/artists.json",
    "data/events.json",
    "data/guides-content.json",
    "data/provider-configs.json"
  ]) {
    assetMap.set(`/${file}`, await fs.readFile(path.join(root, "public", file), "utf8"));
  }
  assetMap.set("/", assetMap.get("/index.html"));
  const env = {
    MOCK_MODE: "false",
    ALLOW_MOCK_PRICES: "false",
    ASSETS: {
      async fetch(request) {
        const body = assetMap.get(new URL(request.url).pathname);
        return body == null ? new Response("not found", { status: 404 }) : new Response(body, { status: 200 });
      }
    }
  };
  const request = async (pathname) => {
    const response = await middleware.onRequest({
      request: new Request(`${ORIGIN}${pathname}`),
      env,
      next: () => new Response("static-asset", { status: 200 })
    });
    return { status: response.status, location: response.headers.get("location") || "", body: await response.text() };
  };

  const events = JSON.parse(await fs.readFile(path.join(root, "public/data/events.json"), "utf8"));
  const artistsMeta = JSON.parse(await fs.readFile(path.join(root, "public/data/artists.json"), "utf8"));
  const indexableSlugs = artistsMeta
    .filter((artist) => artist?.indexing_status === "indexable_with_substantial_content")
    .map((artist) => String(artist?.slug || "").trim())
    .filter(Boolean);

  // Build the artist-city redirect map: real footprint cities with no
  // publishable upcoming show. Cap the sample so the suite stays quick.
  const redirectMap = [];
  for (const slug of indexableSlugs) {
    const active = new Set(
      artistCities.deriveRenderedArtistCities(events, [slug]).map((entry) => entry.slug)
    );
    for (const citySlug of artistCities.artistCityFootprint(events, slug)) {
      if (active.has(citySlug)) continue;
      redirectMap.push({ from: `/artists/${slug}/tickets/${citySlug}`, to: `/artists/${slug}` });
      break;
    }
    if (redirectMap.length >= 6) break;
  }
  assert(redirectMap.length > 0, "current data should contain at least one inactive artist-city combination to redirect");

  const sources = new Set(redirectMap.map((entry) => entry.from));
  for (const entry of redirectMap) {
    const hop = await request(entry.from);
    assert(hop.status >= 300 && hop.status < 400, `${entry.from} should redirect (got ${hop.status})`);
    assert(hop.location.endsWith(entry.to), `${entry.from} should redirect to ${entry.to} (got ${hop.location})`);
    // No chain: the destination is a terminal 200.
    const destination = await request(entry.to);
    assert(destination.status === 200, `redirect destination ${entry.to} should be a 200 (got ${destination.status})`);
    // No loop: the destination is never itself a redirect source.
    assert(!sources.has(entry.to), `redirect destination ${entry.to} must not itself be a redirect source`);
    // Never to the homepage: a useful old route keeps a relevant destination.
    assert(entry.to !== "/", `${entry.from} must not redirect to the homepage`);
  }

  // A single-date artist-city page is NOT redirected — it renders 200 and is
  // noindex,follow. This is the guard against a future change quietly turning
  // the de-indexing decision into a mass redirect.
  const singleDate = artistCities
    .deriveRenderedArtistCities(events, indexableSlugs)
    .find((entry) => !entry.indexable);
  if (singleDate) {
    const page = await request(singleDate.path);
    assert(page.status === 200, `single-date ${singleDate.path} must render 200, not redirect`);
    assert(/content="noindex,follow"/.test(page.body), `single-date ${singleDate.path} must be noindex,follow`);
    assert(
      page.body.includes(`<link rel="canonical" href="${ORIGIN}${singleDate.path}"`),
      `single-date ${singleDate.path} must keep a self-referencing canonical (no cross-canonical to the artist hub)`
    );
  }

  // The legacy /artists/<slug>/tickets duplicate keeps its existing redirect.
  const ticketsDuplicate = await request(`/artists/${indexableSlugs[0]}/tickets`);
  assert(
    ticketsDuplicate.status >= 300 && ticketsDuplicate.status < 400 && ticketsDuplicate.location.endsWith(`/artists/${indexableSlugs[0]}`),
    "/artists/<slug>/tickets should still redirect to the artist hub"
  );

  // An unknown city for a real artist stays a hard 404 — no doorway page and no
  // speculative redirect for arbitrary slugs.
  const unknown = await request(`/artists/${indexableSlugs[0]}/tickets/no-such-city-anywhere-xyz`);
  assert(unknown.status === 404, "an unknown artist-city slug must 404 rather than redirect");
}

console.log(`route-indexability: ${passed} assertions passed`);
