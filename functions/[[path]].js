const EVENTS_JSON_PATH = "/data/events.json";
const ARTISTS_JSON_PATH = "/data/artists.json";
const RESERVED_PATHS = new Set(["api", "robots.txt", "sitemap.xml", "favicon.svg"]);

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function fetchJsonAsset(env, path) {
  try {
    const req = new Request(`https://assets.local${path}`);
    const res = await env.ASSETS.fetch(req);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return [];
  }
}

async function loadArtistCatalog(env) {
  const map = new Map();

  const artists = await fetchJsonAsset(env, ARTISTS_JSON_PATH);
  artists.forEach((artist) => {
    if (!artist || typeof artist !== "object") return;
    const slug = slugify(artist.slug || artist.artist_slug || "");
    if (!slug) return;
    const name = String(artist.name || artist.artist_name || "").trim() || titleCaseFromSlug(slug);
    const description = String(artist.description || "").trim();
    map.set(slug, { slug, name, description });
  });

  const events = await fetchJsonAsset(env, EVENTS_JSON_PATH);
  events.forEach((event) => {
    if (!event || typeof event !== "object") return;
    const slug = slugify(event.artist_slug || "");
    if (!slug) return;
    if (map.has(slug)) return;
    const name = String(event.artist_name || "").trim() || titleCaseFromSlug(slug);
    map.set(slug, { slug, name, description: "" });
  });

  return map;
}

function titleCaseFromSlug(slug) {
  return String(slug || "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) return html;
  return html.replace(pattern, replacement);
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function injectJsonLd(html, scriptId, updater) {
  const pattern = new RegExp(`<script id="${scriptId}" type="application/ld\\+json">([\\s\\S]*?)<\\/script>`, "i");
  const match = html.match(pattern);
  if (!match) return html;

  try {
    const payload = JSON.parse((match[1] || "").trim());
    const next = updater(payload);
    const nextBody = `${JSON.stringify(next, null, 2)}\n    `;
    return html.replace(pattern, `<script id="${scriptId}" type="application/ld+json">\n${nextBody}</script>`);
  } catch (err) {
    return html;
  }
}

function injectArtistMeta(html, artist, canonicalUrl) {
  const title = `${artist.name} Tour Tickets | Unofficial Fan-Made Comparison`;
  const description = artist.description ||
    `Independent fan-made ${artist.name} ticket comparison across SeatGeek, Vivid Seats, and Ticketmaster.`;
  const safeTitle = escapeAttr(title);
  const safeDescription = escapeAttr(description);
  const safeCanonicalUrl = escapeAttr(canonicalUrl);

  let next = html;
  next = replaceTag(next, /<title>[^<]*<\/title>/i, `<title>${safeTitle}</title>`);
  next = replaceTag(next, /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${safeDescription}" />`);
  next = replaceTag(next, /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${safeTitle}" />`);
  next = replaceTag(next, /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${safeDescription}" />`);
  next = replaceTag(next, /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${safeTitle}" />`);
  next = replaceTag(next, /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${safeDescription}" />`);
  next = replaceTag(next, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${safeCanonicalUrl}" />`);
  next = replaceTag(next, /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${safeCanonicalUrl}" />`);

  next = injectJsonLd(next, "structuredDataWebsite", (payload) => ({
    ...payload,
    url: canonicalUrl
  }));

  next = injectJsonLd(next, "structuredDataWebPage", (payload) => ({
    ...payload,
    name: title,
    description,
    url: canonicalUrl
  }));

  return next;
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname.startsWith("/api/")) {
    return next();
  }

  // Support relative asset/data paths from artist routes such as /beyonce/.
  const assetMatch = pathname.match(
    /^\/[a-z0-9-]+\/(app\.js|styles\.css|favicon\.svg|data\/artists\.json|data\/events\.json|data\/events-index\.json|data\/events\/[a-z0-9-]+\.json)$/
  );
  if (assetMatch) {
    const rootAssetPath = `/${assetMatch[1]}`;
    const assetRequest = new Request(new URL(rootAssetPath, request.url), request);
    const assetResponse = await env.ASSETS.fetch(assetRequest);
    if (assetResponse.ok) return assetResponse;
  }

  const upstream = await next();
  if (upstream.status !== 404) {
    return upstream;
  }

  const cleanPath = pathname.replace(/^\/+|\/+$/g, "");
  const isArtistSlugRoute =
    cleanPath.length > 0 &&
    !cleanPath.includes("/") &&
    !cleanPath.includes(".") &&
    /^[a-z0-9-]+$/.test(cleanPath) &&
    !RESERVED_PATHS.has(cleanPath);

  if (!isArtistSlugRoute) {
    return upstream;
  }

  const artists = await loadArtistCatalog(env);
  const artist = artists.get(cleanPath);
  if (!artist) {
    return upstream;
  }

  const indexRequest = new Request(new URL("/index.html", request.url), request);
  const indexResponse = await env.ASSETS.fetch(indexRequest);
  if (!indexResponse.ok) {
    return upstream;
  }

  const html = await indexResponse.text();
  const canonicalUrl = `${url.origin}/${cleanPath}`;
  const injected = injectArtistMeta(html, artist, canonicalUrl);

  const headers = new Headers(indexResponse.headers);
  headers.set("Content-Type", "text/html; charset=UTF-8");
  headers.set("Cache-Control", "public, max-age=300");
  return new Response(injected, {
    status: 200,
    headers
  });
}
