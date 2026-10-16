// GET /api/selling-soon: the "Selling soon" links shown on the most-seen
// pages (functions/_selling-soon.js has the rules). Read-only; returns
// { shows: [] } whenever the list or its data is unavailable.

import { loadSellingSoon } from "../_selling-soon.js";

const TTL_MS = 5 * 60 * 1000;
let memo = null;

export async function onRequestGet({ env }) {
  const now = Date.now();
  if (!memo || now - memo.at > TTL_MS) {
    const shows = await loadSellingSoon(env, now);
    memo = { at: now, shows };
  }
  return new Response(JSON.stringify({ shows: memo.shows }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "X-Robots-Tag": "noindex"
    }
  });
}
