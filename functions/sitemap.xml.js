import { TRUST_ROUTES, GUIDE_ROUTES } from "./_route-metadata.js";

// Derived from _route-metadata.js (single source of truth) so the sitemap
// cannot silently drift from the routes the site actually renders.
const STATIC_INDEXABLE_PATHS = [
  ...Object.keys(TRUST_ROUTES).filter((path) => TRUST_ROUTES[path].indexable),
  ...Object.keys(GUIDE_ROUTES)
];

const INDEXABLE_ARTIST_STATUS = "indexable_with_substantial_content";

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function loadJsonAsset(env, pathname) {
  const response = await env?.ASSETS?.fetch(new Request(`https://assets.local${pathname}`));
  if (!response?.ok) return null;
  return response.json();
}

async function loadIndexableArtistSlugs(env) {
  try {
    const [catalog, artistsMeta] = await Promise.all([
      loadJsonAsset(env, "/data/catalog.json"),
      loadJsonAsset(env, "/data/artists.json")
    ]);

    if (!Array.isArray(catalog?.artists) || !Array.isArray(artistsMeta)) return [];

    const indexableMetaSlugs = new Set(
      artistsMeta
        .filter((artist) => artist?.indexing_status === INDEXABLE_ARTIST_STATUS)
        .map((artist) => String(artist?.slug || "").trim())
        .filter(Boolean)
    );

    return catalog.artists
      .map((artist) => String(artist?.slug || "").trim())
      .filter((slug) => slug && indexableMetaSlugs.has(slug));
  } catch (error) {
    return [];
  }
}

export async function onRequestGet({ request, env }) {
  const requestUrl = new URL(request.url);
  const origin = `${requestUrl.protocol}//${requestUrl.host}`;
  const today = new Date().toISOString().slice(0, 10);
  const artistPaths = (await loadIndexableArtistSlugs(env)).map((slug) => `/artists/${slug}`);
  const paths = STATIC_INDEXABLE_PATHS.concat(artistPaths);

  const urlsXml = paths
    .map((path) => {
      return [
        "  <url>",
        `    <loc>${escapeXml(`${origin}${path}`)}</loc>`,
        `    <lastmod>${escapeXml(today)}</lastmod>`,
        "  </url>"
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=UTF-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
