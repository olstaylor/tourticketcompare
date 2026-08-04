// _middleware.js is the active entry point for all HTML routes on Cloudflare Pages.
// It intercepts every request before named route shims (artists.js, guides.js, etc.)
// can be invoked, so those shims are never reached in production.
// The named shims exist solely as a Cloudflare Pages routing fallback: if this
// middleware were ever removed, Pages would still dispatch each route to the correct
// handler via the shim rather than returning a 404. Do not edit the shims expecting
// a production effect while this file is present.
import { onRequest as renderRouteHtml } from "./[[path]].js";
import { CANONICAL_HOST, isAdminHost, isAdminPath, isLocalOrigin } from "./_route-metadata.js";

const STATIC_ASSET_PATHS = new Set([
  "/app.js",
  "/styles.css",
  "/favicon.svg",
  "/robots.txt",
  "/_routes.json",
  // The content editor. It has no file extension, so without this entry it
  // would be routed to [[path]].js and 404. context.next() dispatches it to
  // functions/admin.js, which sets its own Content-Security-Policy.
  "/admin"
]);

function normalizePath(pathname) {
  if (pathname !== "/" && pathname.endsWith("/")) return pathname.replace(/\/+$/, "");
  return pathname || "/";
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathname = normalizePath(url.pathname);

  // ---------------------------------------------------------------------
  // Editor origin isolation. The content editor keeps a GitHub token in
  // localStorage, which is shared across an entire origin, so it must not
  // share one with the public site and its third-party tags. See ADMIN_HOST
  // in _route-metadata.js.
  // ---------------------------------------------------------------------
  const onAdminHost = isAdminHost(url.hostname);
  const adminAllowed = onAdminHost || isLocalOrigin(url.origin);

  if (onAdminHost) {
    // Nothing but the editor is served here, so no public page — and therefore
    // no analytics or tag-manager script — ever runs on this origin.
    if (pathname === "/robots.txt") {
      return new Response("User-agent: *\nDisallow: /\n", {
        headers: { "Content-Type": "text/plain; charset=UTF-8", "Cache-Control": "public, max-age=3600" }
      });
    }
    if (!isAdminPath(pathname)) {
      const apex = new URL(url);
      apex.hostname = CANONICAL_HOST;
      return Response.redirect(apex.toString(), 301);
    }
  } else if (isAdminPath(pathname)) {
    // The editor is not reachable from the public site's origin at all.
    return new Response("Not found.\n", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=UTF-8",
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow"
      }
    });
  }

  // /admin/ must normalize before the pass-through below, which matches on the
  // normalized path and would otherwise hand "/admin/" to asset serving as-is
  // and 404. Scoped to this one route so no /api/ path changes behaviour.
  if (adminAllowed && pathname === "/admin" && url.pathname !== "/admin") {
    const canonicalAdmin = new URL(url);
    canonicalAdmin.pathname = "/admin";
    return Response.redirect(canonicalAdmin.toString(), 301);
  }

  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/data/") ||
    STATIC_ASSET_PATHS.has(pathname) ||
    /\.[a-z0-9]+$/i.test(pathname)
  ) {
    return context.next();
  }

  // Keep one crawlable URL per HTML route. The renderer normalizes the path
  // used for routing and metadata, but without this redirect both slash and
  // non-slash forms can still return 200 responses. Preserve the query string
  // for legitimate search/filter links while avoiding redirects for the root.
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    const canonicalUrl = new URL(url);
    canonicalUrl.pathname = pathname;
    return Response.redirect(canonicalUrl.toString(), 301);
  }

  return renderRouteHtml(context);
}
