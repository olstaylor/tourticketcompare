// @ts-check
// "On sale this week": internal links from high-traffic pages (home, guides)
// to artists whose Ticketmaster public on-sale or presale opens in the next 7
// days. Derived from the same facts as /on-sale and the presale pages
// (`public_onsale_at`, `presales[]` on reviewed events), so it needs no
// upkeep: the block fills as dates approach and disappears when none are near.
//
// Links and Ticketmaster-stated times only. No price, availability or ticket
// link: before a public on-sale there is no primary inventory to point at.
// Pure: no I/O. The caller passes the slugs whose artist pages are indexable.

import { deriveOnsaleCalendar } from "./_onsale-calendar.js";
import { deriveUpcomingPresales, deriveArtistPresales, presalePath } from "./_presales.js";

const DAY_MS = 86400000;

export const THIS_WEEK_DAYS = 7;
export const THIS_WEEK_MAX_ITEMS = 6;

// Guides read by people deciding when and how to buy, where an on-sale this
// week is relevant. The comparison and "is X legit" guides are left alone.
export const THIS_WEEK_GUIDE_PATHS = new Set([
  "/guides",
  "/guides/how-to-prepare-for-a-ticket-onsale",
  "/guides/when-is-the-best-time-to-buy-concert-tickets",
  "/guides/primary-vs-resale-concert-tickets",
  "/guides/no-tickets-left-on-ticketmaster",
  "/guides/how-to-avoid-overpaying-for-concert-tickets"
]);

/**
 * @param {any[]} events Raw events.json records.
 * @param {Set<string>} linkableSlugs Artist slugs with an indexable artist page.
 * @param {number} [now]
 * @param {{ kinds?: Array<"onsale"|"presale"> }} [options]
 */
export function deriveThisWeek(events, linkableSlugs, now = Date.now(), options = {}) {
  const kinds = options.kinds || ["onsale", "presale"];
  const limit = now + THIS_WEEK_DAYS * DAY_MS;
  const items = [];
  const seen = new Set();
  const push = (item) => {
    const key = `${item.kind}|${item.artistSlug}`;
    if (seen.has(key) || !linkableSlugs.has(item.artistSlug)) return;
    seen.add(key);
    items.push(item);
  };
  if (kinds.includes("onsale")) {
    for (const day of deriveOnsaleCalendar(events, now).upcoming) {
      for (const artist of day.artists) {
        const first = artist.shows[0];
        if (first.onsaleMs > limit) continue;
        push({ kind: "onsale", artistSlug: artist.artistSlug, artistName: artist.artistName, atMs: first.onsaleMs, timezone: first.timezone, dates: artist.shows.length });
      }
    }
  }
  if (kinds.includes("presale")) {
    for (const artist of deriveUpcomingPresales(events, now).artists) {
      const next = artist.windows.find((window) => window.startMs > now && window.startMs <= limit);
      if (!next) continue;
      push({
        kind: "presale",
        artistSlug: artist.artistSlug,
        artistName: artist.artistName,
        atMs: next.startMs,
        timezone: next.shows[0]?.timezone || "UTC",
        dates: next.shows.length,
        name: next.name,
        presaleLinked: deriveArtistPresales(events, artist.artistSlug, now).indexable
      });
    }
  }
  items.sort((a, b) => a.atMs - b.atMs || a.artistName.localeCompare(b.artistName));
  return items.slice(0, THIS_WEEK_MAX_ITEMS);
}

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/'/g, "&#39;");
}

function whenLabel(item) {
  try {
    return new Date(item.atMs).toLocaleString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: item.timezone,
      timeZoneName: "short"
    });
  } catch (error) {
    return `${new Date(item.atMs).toISOString().slice(0, 16).replace("T", " ")} UTC`;
  }
}

/**
 * @param {ReturnType<typeof deriveThisWeek>} items
 * @param {string} [id] Unique heading id for the page.
 */
export function renderThisWeekHtml(items, id = "thisWeekOnsaleTitle") {
  if (!items.length) return "";
  const rows = items
    .map((item) => {
      const dates = `${item.dates} ${item.dates === 1 ? "date" : "dates"}`;
      const what = item.kind === "presale" ? `${item.name}${/presale/i.test(item.name) ? "" : " presale"} opens` : "Public on-sale";
      const href = item.kind === "presale" && item.presaleLinked ? presalePath(item.artistSlug) : `/artists/${item.artistSlug}`;
      return `<li><a href="${esc(href)}"><strong>${esc(item.artistName)}</strong><span> ${esc(what)} ${esc(whenLabel(item))} · ${esc(dates)}</span></a></li>`;
    })
    .join("");
  return `<section class="nested-panel this-week-onsale" aria-labelledby="${esc(id)}"><h2 id="${esc(id)}">On sale this week</h2><p>Times are as listed by Ticketmaster, in each venue's local time. Check the artist page for each date's status.</p><ul>${rows}</ul><p><a href="/on-sale">Full on-sale calendar</a></p></section>`;
}
