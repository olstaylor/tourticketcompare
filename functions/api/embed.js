// GET /api/embed?artist=<slug>[&limit=5][&theme=light|dark][&src=<id>]
//   -> the embeddable ticket-price widget (an iframe-friendly HTML page).
// GET /api/embed?artist=<slug>&view=builder -> the "Embed this" copy-paste page.
//
// Read-only. Prices come through loadEmbedPrices, i.e. the artist page's own
// gate. Links point at tourticketcompare.com pages only, never /api/out.
// Framing is allowed here on purpose (the site-wide policy is frame-ancestors
// 'none'); everything else stays locked down.

import { loadEmbedPrices } from "../[[path]].js";
import { parseEmbedParams, renderBuilderHtml, renderEmbedHtml, selectEmbedEntries } from "../_embed.js";

function page(html, extra = {}) {
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex, nofollow", "X-Content-Type-Options": "nosniff", "Referrer-Policy": "no-referrer", ...extra } });
}

function notFound() {
  return new Response("Not found.\n", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
}

export async function onRequestGet({ request, env }) {
  const params = parseEmbedParams(new URL(request.url).searchParams);
  if (!params.artist) return notFound();
  let data = null;
  try {
    data = await loadEmbedPrices(env, params.artist);
  } catch {
    return new Response("Temporarily unavailable.\n", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
  }
  if (!data) return notFound();

  if (params.builder) {
    const nonce = crypto.randomUUID().replace(/-/g, "");
    return page(renderBuilderHtml({ artist: data.artist, limit: params.limit, theme: params.theme, src: params.src, nonce }), {
      "Cache-Control": "public, max-age=300",
      "Content-Security-Policy": `default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}'; frame-src 'self'; base-uri 'none'; frame-ancestors 'none'`
    });
  }
  const entries = selectEmbedEntries(data, params.limit);
  return page(renderEmbedHtml({ artist: data.artist, entries, totalDates: data.totalDates, theme: params.theme, src: params.src }), {
    "Cache-Control": "public, max-age=300",
    "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors *"
  });
}
