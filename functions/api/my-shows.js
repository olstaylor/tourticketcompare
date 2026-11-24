// GET /api/my-shows?s=<artist-slug>~<event-id>,...: current state of the shows a
// visitor saved in their own browser ("My shows", public/my-shows.js).
//
// Read-only. For each saved show it returns whether the date is still on the
// site, the date and place, and the lowest fresh listed price through the same
// gate the show card uses (attachApprovedMarketplacePrices; one currency, site
// named, capture time). Nothing is stored and nothing identifies the visitor.
// No CTA, redirect or affiliate logic: the page links to the show's artist page.

import { attachApprovedMarketplacePrices } from "./shows.js";
import { lowestListedPrice } from "../_selling-soon.js";
import { isUpcomingShow } from "../_upcoming.js";
import { eventLifecycleHeld } from "../_route-indexability.js";

const MAX_SAVED = 20;
const slugOk = (v) => /^[a-z0-9][a-z0-9-]{0,80}$/.test(v);
const idOk = (v) => /^[A-Za-z0-9_.-]{1,160}$/.test(v);

async function readPartition(env, slug) {
  const assets = env?.ASSETS;
  if (!assets || typeof assets.fetch !== "function") return [];
  try {
    const res = await assets.fetch(new Request(`https://assets.local/data/events/${encodeURIComponent(slug)}.json`));
    const body = res.ok ? await res.json() : [];
    return Array.isArray(body) ? body : [];
  } catch {
    return [];
  }
}

export function parseSaved(raw) {
  const out = [];
  const seen = new Set();
  for (const part of String(raw || "").split(",").slice(0, MAX_SAVED)) {
    const [slug, id] = part.split("~");
    if (!slugOk(slug || "") || !idOk(id || "") || seen.has(id)) continue;
    seen.add(id);
    out.push({ slug, id });
  }
  return out;
}

export async function onRequestGet({ request, env }) {
  const saved = parseSaved(new URL(request.url).searchParams.get("s"));
  const now = Date.now();
  const slugs = [...new Set(saved.map((s) => s.slug))];
  const partitions = new Map(await Promise.all(slugs.map(async (slug) => [slug, await readPartition(env, slug)])));
  const found = saved.map(({ slug, id }) => ({ slug, id, event: (partitions.get(slug) || []).find((e) => String(e?.id) === id) || null }));
  const live = found.filter((f) => f.event && isUpcomingShow(f.event, now) && !eventLifecycleHeld(f.event));
  const priced = new Map();
  if (live.length) {
    try {
      const shows = await attachApprovedMarketplacePrices(live.map((f) => f.event), env);
      for (const show of shows) {
        if (show.priceQueryFailed) continue;
        const lowest = lowestListedPrice(show.prices);
        if (lowest) priced.set(String(show.id), lowest);
      }
    } catch {
      // No prices is a valid answer; the page then shows none.
    }
  }
  const shows = found.map(({ slug, id, event }) => {
    if (!event) return { id, slug, status: "gone" };
    if (!live.some((f) => f.id === id)) return { id, slug, status: "past" };
    return {
      id,
      slug,
      status: "upcoming",
      artist_name: String(event.artist_name || "").trim(),
      city: String(event.city || "").trim(),
      venue: String(event.venue || "").trim(),
      datetime_iso: String(event.datetime_iso || ""),
      timezone: String(event.timezone || ""),
      ...(priced.has(id) ? { lowest: priced.get(id) } : {})
    };
  });
  return new Response(JSON.stringify({ shows }), {
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "private, max-age=300", "X-Robots-Tag": "noindex" }
  });
}
