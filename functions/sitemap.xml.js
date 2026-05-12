const STATIC_INDEXABLE_PATHS = [
  "/",
  "/artists",
  "/guides",
  "/how-it-works",
  "/about",
  "/contact",
  "/editorial-policy",
  "/affiliate-disclosure",
  "/guides/how-to-compare-concert-ticket-prices",
  "/guides/ticketmaster-vs-seatgeek-vs-vivid-seats",
  "/guides/how-to-avoid-overpaying-for-concert-tickets",
  "/guides/when-is-the-best-time-to-buy-concert-tickets",
  "/guides/primary-vs-resale-concert-tickets",
  "/guides/best-time-to-buy-concert-tickets",
  "/guides/how-to-avoid-ticket-scams",
  "/guides/why-ticket-prices-change",
  "/guides/ticketmaster-vs-stubhub",
  "/guides/how-resale-ticket-pricing-works"
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
