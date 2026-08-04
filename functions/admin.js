// Serves the /admin content editor.
//
// This is a Function rather than a static public/admin/index.html for one
// reason: the editor needs a different Content-Security-Policy from the rest of
// the site (it talks to api.github.com and its UI framework injects styles),
// and setting exactly one CSP header here is deterministic, where layering a
// second `_headers` rule over the site-wide one is not.
//
// The page is inert without the OAuth configuration in functions/api/admin/ —
// signing in is what grants any write ability, and that happens through the
// editor's own GitHub account.

import { isAdminHost, isLocalOrigin } from "./_route-metadata.js";

const ADMIN_CSP = [
  "default-src 'self'",
  // The editor is a compiled Svelte app: its component styles are injected as
  // inline <style> elements at runtime, which style-src 'self' alone blocks.
  "style-src 'self' 'unsafe-inline'",
  // The vendored bundle injects @font-face rules pointing at jsDelivr for
  // Source Sans 3, Noto Mono and Material Symbols. Material Symbols is an icon
  // font, so blocking it does not degrade gracefully — every icon button
  // renders its ligature name as literal text and the editor looks broken.
  // A font is data, not code: it cannot execute, and this grant is font-src
  // only, so the "no third-party script origin on a page that can hold a
  // repository token" property is unchanged.
  "font-src 'self' data: https://cdn.jsdelivr.net",
  // GitHub avatars for the signed-in user and commit authors.
  "img-src 'self' data: blob: https://avatars.githubusercontent.com https://*.githubusercontent.com",
  "script-src 'self'",
  "connect-src 'self' https://api.github.com https://raw.githubusercontent.com https://*.githubusercontent.com",
  "form-action 'self' https://github.com",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'"
].join("; ");

const HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Content editor | TourTicketCompare</title>
    <link rel="icon" href="/favicon.svg" />
  </head>
  <body>
    <noscript>The content editor needs JavaScript. You can also edit content/blog/*.md directly on GitHub.</noscript>
    <script src="/admin/sveltia-cms.js"></script>
  </body>
</html>
`;

export async function onRequestGet({ request }) {
  // The middleware already refuses this path on any other host; this is the
  // same rule restated at the handler so the boundary does not depend on a
  // single call site.
  const url = new URL(request.url);
  if (!isAdminHost(url.hostname) && !isLocalOrigin(url.origin)) {
    return new Response("Not found.\n", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=UTF-8", "X-Robots-Tag": "noindex, nofollow" }
    });
  }

  return new Response(HTML, {
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      "Content-Security-Policy": ADMIN_CSP,
      "Cache-Control": "no-store",
      // Belt and braces alongside robots.txt: the editor must never be indexed.
      "X-Robots-Tag": "noindex, nofollow",
      "Referrer-Policy": "same-origin",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups"
    }
  });
}
