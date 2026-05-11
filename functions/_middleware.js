// _middleware.js is the active entry point for all HTML routes on Cloudflare Pages.
// It intercepts every request before named route shims (artists.js, guides.js, etc.)
// can be invoked, so those shims are never reached in production.
// The named shims exist solely as a Cloudflare Pages routing fallback: if this
// middleware were ever removed, Pages would still dispatch each route to the correct
// handler via the shim rather than returning a 404. Do not edit the shims expecting
// a production effect while this file is present.
import { onRequest as renderRouteHtml } from "./[[path]].js";

const STATIC_ASSET_PATHS = new Set([
  "/app.js",
  "/styles.css",
  "/favicon.svg",
  "/robots.txt",
  "/_routes.json"
]);

function normalizePath(pathname) {
  if (pathname !== "/" && pathname.endsWith("/")) return pathname.replace(/\/+$/, "");
  return pathname || "/";
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathname = normalizePath(url.pathname);

  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/data/") ||
    STATIC_ASSET_PATHS.has(pathname) ||
    /\.[a-z0-9]+$/i.test(pathname)
  ) {
    return context.next();
  }

  return renderRouteHtml(context);
}
