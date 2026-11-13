// Edge cache for the heavy derived text routes (/sitemap.xml, /sitemap-index.xml,
// /sitemaps/*.xml, /llms.txt).
//
// Each of these rebuilds from the full event set on every request. With 5,000+
// events a cold build can run past the Worker CPU cap (wrangler.toml
// [limits] cpu_ms) and Cloudflare answers "error code: 1102" (seen on
// 2026-11-13: /llms.txt failed 3 of 6 requests, /sitemap.xml 2 of 4). A
// crawler that gets a 503 for the sitemap learns nothing about the site.
//
// So a successful build is kept in the Cache API for a day and served from
// there. Once a copy is older than FRESH_SECONDS it is still served at once,
// and a rebuild runs in the background (waitUntil); a rebuild that fails or is
// cut off leaves the last good copy in place. Only a colo with no copy at all
// builds in the foreground.
//
// The key is the request URL without its query string, so each host keeps its
// own copy (the event-page pilot never activates off the canonical host).
// Outside Workers (tests, scripts) there is no `caches` global and the handler
// runs directly.

export const EDGE_CACHE_FRESH_SECONDS = 1800;
export const EDGE_CACHE_KEEP_SECONDS = 86400;
const BUILT_AT_HEADER = "x-ttc-built-at";

function edgeCache() {
  try {
    return typeof caches !== "undefined" && caches.default ? caches.default : null;
  } catch {
    return null;
  }
}

async function buildAndStore(handler, context, cache, key) {
  const response = await handler(context);
  if (!response || response.status !== 200) return response;
  const body = await response.text();
  const headers = new Headers(response.headers);
  const stored = new Headers(headers);
  stored.set("Cache-Control", `public, max-age=${EDGE_CACHE_KEEP_SECONDS}`);
  stored.set(BUILT_AT_HEADER, String(Date.now()));
  const put = cache.put(key, new Response(body, { status: 200, headers: stored })).catch(() => {});
  if (typeof context.waitUntil === "function") context.waitUntil(put);
  else await put;
  return new Response(body, { status: 200, headers });
}

/**
 * Wrap a Pages Function GET handler with the edge cache described above.
 *
 * @param {(context: any) => Promise<Response>|Response} handler
 */
export function withEdgeCache(handler) {
  return async function cachedHandler(context) {
    const cache = edgeCache();
    const request = context?.request;
    if (!cache || !request || request.method !== "GET") return handler(context);
    const url = new URL(request.url);
    const key = new Request(`${url.origin}${url.pathname}`, { method: "GET" });
    const hit = await cache.match(key).catch(() => null);
    if (!hit) return buildAndStore(handler, context, cache, key);
    const builtAt = Number(hit.headers.get(BUILT_AT_HEADER));
    const ageSeconds = Number.isFinite(builtAt) && builtAt > 0 ? (Date.now() - builtAt) / 1000 : Infinity;
    if (ageSeconds > EDGE_CACHE_FRESH_SECONDS && typeof context.waitUntil === "function") {
      context.waitUntil(Promise.resolve().then(() => buildAndStore(handler, context, cache, key)).catch(() => {}));
    }
    const headers = new Headers(hit.headers);
    headers.set("Cache-Control", `public, max-age=${EDGE_CACHE_FRESH_SECONDS}`);
    headers.delete(BUILT_AT_HEADER);
    return new Response(hit.body, { status: 200, headers });
  };
}
