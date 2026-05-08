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
