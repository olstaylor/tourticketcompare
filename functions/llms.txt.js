import { TRUST_ROUTES, GUIDE_ROUTES, canonicalOrigin } from "./_route-metadata.js";

// llms.txt (https://llmstxt.org) — a curated index for answer engines and AI
// crawlers. Derived from _route-metadata.js and the artist data files (the
// same sources as sitemap.xml) so it cannot silently drift from the routes
// the site actually renders.

const INDEXABLE_ARTIST_STATUS = "indexable_with_substantial_content";

async function loadJsonAsset(env, pathname) {
  const response = await env?.ASSETS?.fetch(new Request(`https://assets.local${pathname}`));
  if (!response?.ok) return null;
  return response.json();
}

async function loadIndexableArtists(env) {
  try {
    const [catalog, artistsMeta] = await Promise.all([
      loadJsonAsset(env, "/data/catalog.json"),
      loadJsonAsset(env, "/data/artists.json")
    ]);
    if (!Array.isArray(catalog?.artists) || !Array.isArray(artistsMeta)) return [];

    const indexableSlugs = new Set(
      artistsMeta
        .filter((artist) => artist?.indexing_status === INDEXABLE_ARTIST_STATUS)
        .map((artist) => String(artist?.slug || "").trim())
        .filter(Boolean)
    );

    return catalog.artists
      .filter((artist) => indexableSlugs.has(String(artist?.slug || "").trim()))
      .map((artist) => ({
        slug: String(artist.slug).trim(),
        name: String(artist?.name || "").trim() || String(artist.slug).trim(),
        description: String(artist?.short_description || "").trim()
      }));
  } catch (error) {
    return [];
  }
}

function linkLine(origin, path, name, description) {
  const suffix = description ? `: ${description}` : "";
  return `- [${name}](${origin}${path})${suffix}`;
}

export async function onRequestGet({ request, env }) {
  const requestUrl = new URL(request.url);
  const origin = canonicalOrigin(`${requestUrl.protocol}//${requestUrl.host}`);

  const guideLines = Object.entries(GUIDE_ROUTES).map(([path, guide]) =>
    linkLine(origin, path, guide.h1 || guide.title, guide.description)
  );

  const artistLines = (await loadIndexableArtists(env)).map((artist) =>
    linkLine(origin, `/artists/${artist.slug}`, artist.name, artist.description)
  );

  const trustLines = Object.entries(TRUST_ROUTES)
    .filter(([path, route]) => path !== "/" && route.indexable)
    .map(([path, route]) => linkLine(origin, path, route.title.replace(" | TourTicketCompare", ""), route.description));

  const body = `# TourTicketCompare

> Independent, unofficial ticket research for major live music tours. We publish verified ticket links and practical buying guidance — we do not sell tickets, display prices, rank providers, or claim availability. Final prices, fees, and availability are always confirmed on the ticket provider's site.

Key facts:

- TourTicketCompare is independent and unofficial; it is not affiliated with any artist or ticket provider.
- Ticket links are published only after the destination has been verified; unverified links are hidden.
- Event details (date, venue, city) appear only for reviewed, verified event records.
- Some outbound links may earn a commission; this never changes which links are shown.

## Buying guides

${guideLines.join("\n")}

## Artist pages

${artistLines.join("\n")}

## About the site

${trustLines.join("\n")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=UTF-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
