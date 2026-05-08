import {
  attachProviderState,
  filterShows,
  loadArtists,
  loadSeedEvents,
  mapSeedEvents,
  maybeFetchDiscoveryShows,
  slugify
} from "./_lib/site-data.mjs";

export async function GET(request) {
  const url = new URL(request.url);
  const artists = await loadArtists();
  const seedEvents = mapSeedEvents(await loadSeedEvents());
  const selectedArtistSlug = slugify(url.searchParams.get("artistSlug"));
  const selectedArtist =
    artists.find((artist) => slugify(artist.slug) === selectedArtistSlug) ||
    seedEvents.find((event) => slugify(event.artist_slug) === selectedArtistSlug) ||
    null;

  const fallbackShows = selectedArtistSlug
    ? seedEvents.filter((event) => slugify(event.artist_slug) === selectedArtistSlug)
    : seedEvents;

  const discovery = await maybeFetchDiscoveryShows(
    process.env,
    selectedArtistSlug,
    selectedArtist?.name || selectedArtist?.artist_name || "",
    fallbackShows
  );

  const sourceShows = selectedArtistSlug ? discovery.shows : fallbackShows;
  const filteredShows = filterShows(sourceShows, url.searchParams);
  const includePrices = String(url.searchParams.get("includePrices") || "").toLowerCase() === "true" || Boolean(url.searchParams.get("showId"));
  const shows = includePrices ? filteredShows.map((show) => attachProviderState(show, process.env)) : filteredShows;

  return new Response(
    JSON.stringify({
      generatedAt: new Date().toISOString(),
      includePrices,
      artistFeed: selectedArtistSlug
        ? discovery.artistFeed
        : {
            enabled: true,
            used: false,
            source: "local-preview",
            cacheState: "preview",
            count: filteredShows.length,
            error: null
          },
      shows
    }),
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": includePrices ? "no-store" : "public, max-age=120"
      }
    }
  );
}
