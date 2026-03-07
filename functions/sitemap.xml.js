const EVENTS_JSON_PATH = "/data/events.json";
const ARTISTS_JSON_PATH = "/data/artists.json";

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function dateOnly(iso) {
  const parsed = Date.parse(iso);
  if (!Number.isFinite(parsed)) return null;
  return new Date(parsed).toISOString().slice(0, 10);
}

async function loadEventsFromAssets(env) {
  const assets = env?.ASSETS;
  if (!assets || typeof assets.fetch !== "function") return [];
  try {
    const req = new Request(`https://assets.local${EVENTS_JSON_PATH}`);
    const res = await assets.fetch(req);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return [];
  }
}

async function loadArtistsFromAssets(env) {
  const assets = env?.ASSETS;
  if (!assets || typeof assets.fetch !== "function") return [];
  try {
    const req = new Request(`https://assets.local${ARTISTS_JSON_PATH}`);
    const res = await assets.fetch(req);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return [];
  }
}

function buildEntries(origin, events, artists) {
  const today = new Date().toISOString().slice(0, 10);
  const entries = [
    { loc: `${origin}/`, lastmod: today }
  ];

  const artistEntries = new Map();
  artists.forEach((artist) => {
    if (!artist || typeof artist !== "object") return;
    const artistSlug = slugify(artist.slug || artist.artist_slug || "");
    if (!artistSlug) return;
    artistEntries.set(artistSlug, { loc: `${origin}/${artistSlug}`, lastmod: today });
  });

  const cityEntries = new Map();
  events.forEach((event) => {
    if (!event || typeof event !== "object") return;
    const artistSlug = slugify(event.artist_slug || "");
    const eventDate = dateOnly(event.datetime_iso || event.dateTimeISO) || today;
    if (artistSlug) {
      const artistLoc = `${origin}/${artistSlug}`;
      const existingArtist = artistEntries.get(artistSlug);
      if (!existingArtist || eventDate > existingArtist.lastmod) {
        artistEntries.set(artistSlug, { loc: artistLoc, lastmod: eventDate });
      }
    }

    if (!event.city || !event.country) return;
    const slug = `${slugify(event.city)}-${slugify(event.country)}`;
    if (!slug || slug === "-") return;
    const loc = `${origin}/?city=${encodeURIComponent(slug)}`;
    const lastmod = eventDate;

    const existing = cityEntries.get(slug);
    if (!existing || lastmod > existing.lastmod) {
      cityEntries.set(slug, { loc, lastmod });
    }
  });

  return entries
    .concat(Array.from(artistEntries.values()).sort((a, b) => a.loc.localeCompare(b.loc)))
    .concat(Array.from(cityEntries.values()).sort((a, b) => a.loc.localeCompare(b.loc)));
}

export async function onRequestGet({ request, env }) {
  const requestUrl = new URL(request.url);
  const origin = `${requestUrl.protocol}//${requestUrl.host}`;
  const events = await loadEventsFromAssets(env);
  const artists = await loadArtistsFromAssets(env);
  const entries = buildEntries(origin, events, artists);

  const urlsXml = entries
    .map((entry) => {
      return [
        "  <url>",
        `    <loc>${escapeXml(entry.loc)}</loc>`,
        `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`,
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
