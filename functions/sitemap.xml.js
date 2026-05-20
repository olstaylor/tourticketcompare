import { TRUST_ROUTES, GUIDE_ROUTES } from "./_route-metadata.js";

// Derived from _route-metadata.js (single source of truth) so the sitemap
// cannot silently drift from the routes the site actually renders.
const STATIC_INDEXABLE_PATHS = [
  ...Object.keys(TRUST_ROUTES).filter((path) => TRUST_ROUTES[path].indexable),
  ...Object.keys(GUIDE_ROUTES)
];

const FALLBACK_ARTIST_SLUGS = ["beyonce", "harry-styles", "bts", "ariana-grande", "bad-bunny", "morgan-wallen", "jay-z"];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function loadArtistSlugs(env) {
  try {
    const response = await env?.ASSETS?.fetch(new Request("https://assets.local/data/catalog.json"));
    if (!response?.ok) return FALLBACK_ARTIST_SLUGS;
    const data = await response.json();
    const slugs = Array.isArray(data?.artists) ? data.artists.map((artist) => artist.slug).filter(Boolean) : [];
    return slugs.length ? slugs : FALLBACK_ARTIST_SLUGS;
  } catch (error) {
    return FALLBACK_ARTIST_SLUGS;
  }
}

export async function onRequestGet({ request, env }) {
  const requestUrl = new URL(request.url);
  const origin = `${requestUrl.protocol}//${requestUrl.host}`;
  const today = new Date().toISOString().slice(0, 10);
  const artistPaths = (await loadArtistSlugs(env)).map((slug) => `/artists/${slug}`);
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
