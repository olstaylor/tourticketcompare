// What the show-priority report says to people. The stored list (D1
// `show_priority`, rank / expected_gbp / potential_gbp) keeps its legacy order
// for the automation that reads it; this module is the honest view of the same
// rows (owner request 2026-11-23, issue #1539):
//
//   - event-level observations (visitors who clicked a seller button for this
//     show in the last 14 days) are kept apart from artist-level proxies (the
//     artist's page visitors, which says nothing about one date);
//   - pounds appear only for event-level observations, as a range built from
//     measured commission per click, never from an assumed order rate;
//   - low-volume rows are labelled as such instead of ranked on a decimal.
//
// Nothing here changes a link, a button order, an indexing decision or what a
// visitor sees.

import { LANE_COMMISSION } from "./show-priority.mjs";

/**
 * Site-only commission per page-backed seller click, 1 Sep-20 Nov 2026, from
 * /mnt/project-files/plans/route-to-500-2026-11.md: conservative 4.6p, central
 * 7.0p, optimistic 15p (Vivid Seats alone has shown 22.6p). Built from 7-10
 * orders, so it is a range, not a rate. Replace when the Impact order import
 * lands (see docs/OPERATIONS.md).
 */
export const CLICK_YIELD_GBP = Object.freeze({ low: 0.046, central: 0.07, high: 0.15, asOf: "2026-11-20", orders: 10 });

/** Site commission per week, Nov 1-20 (£69.93 in 20 days), the figure the legacy total is checked against. */
export const OBSERVED_WEEKLY_GBP = Object.freeze({ value: 24.5, asOf: "2026-11-20", note: "£69.93 site-only commission, 1-20 Nov" });

/** Distinct visitor-days clicking one show in 14 days. Under this, one or two visitors can reorder the list. */
export const OBSERVED_MIN_CLICKER_DAYS = 5;

export const TIER_LABEL = Object.freeze({
  observed: "Observed",
  thin: "Thin (1-4)",
  artist_only: "Artist traffic only",
  none: "No traffic data"
});

export function evidenceTier(row) {
  const clickers = Number(row.event_clickers_14d) || 0;
  if (clickers >= OBSERVED_MIN_CLICKER_DAYS) return "observed";
  if (clickers > 0) return "thin";
  if ((Number(row.artist_visitors_7d) || 0) > 0) return "artist_only";
  return "none";
}

export function urgencyBand(daysOut) {
  if (daysOut <= 7) return "within 7 days";
  if (daysOut <= 30) return "8-30 days";
  return "31+ days";
}

/** Does any live lane pay? Ticketmaster is a plain link and pays nothing. */
export const hasPayingLane = (row) => row.lanes.some((lane) => (LANE_COMMISSION[lane] ?? 0) > 0);

/**
 * £ a week from this show's own clicks, as [low, high], or null when the show
 * has no event-level clicks. Price and seller mix are deliberately not in it:
 * the per-click figure already averages over the orders we have seen, and a
 * price-scaled number would claim precision 10 orders cannot give.
 */
export function weeklyRange(row) {
  const clickers = Number(row.event_clickers_14d) || 0;
  if (!clickers) return null;
  if (!hasPayingLane(row)) return [0, 0];
  const weekly = clickers / 2;
  return [weekly * CLICK_YIELD_GBP.low, weekly * CLICK_YIELD_GBP.high];
}

export function formatRange(range) {
  if (!range) return "n/a";
  const [low, high] = range;
  if (high === 0) return "£0 (no paying seller)";
  const money = (n) => (n < 1 ? `£${n.toFixed(2)}` : `£${n.toFixed(1)}`);
  return `${money(low)}-${money(high)}`;
}

/** Shows with event-level clicks, most clicked first; nearer shows win ties. */
export function eventLevel(ranked) {
  return ranked
    .filter((row) => (Number(row.event_clickers_14d) || 0) > 0)
    .sort((a, b) => b.event_clickers_14d - a.event_clickers_14d || a.days_out - b.days_out || a.event_id.localeCompare(b.event_id));
}

/** Artists by page visitors this week, with how many of their next 60 days of dates drew clicks. */
export function artistLevel(ranked, { top = 10 } = {}) {
  const byArtist = new Map();
  for (const row of ranked) {
    const entry = byArtist.get(row.artist_slug) || { artist_slug: row.artist_slug, artist_name: row.artist_name, visitors_7d: 0, dates_60d: 0, clicked_dates_60d: 0, clicker_days_60d: 0, paying: false };
    entry.visitors_7d = Math.max(entry.visitors_7d, Number(row.artist_visitors_7d) || 0);
    if (row.days_out <= 60) {
      entry.dates_60d += 1;
      if (row.event_clickers_14d > 0) entry.clicked_dates_60d += 1;
      entry.clicker_days_60d += Number(row.event_clickers_14d) || 0;
    }
    entry.paying ||= hasPayingLane(row);
    byArtist.set(row.artist_slug, entry);
  }
  return [...byArtist.values()]
    .filter((a) => a.visitors_7d > 0)
    .sort((a, b) => b.visitors_7d - a.visitors_7d || a.artist_slug.localeCompare(b.artist_slug))
    .slice(0, top);
}

/**
 * Missing StubHub International / Vivid Seats lanes on shows people have
 * actually clicked, most clicked first. Gaps with no clicks are only counted.
 */
export function reportGaps(ranked, { top = 10 } = {}) {
  const gaps = ranked.filter((row) => row.missing_high_paying_lanes.length);
  const clicked = gaps.filter((row) => row.event_clickers_14d > 0)
    .sort((a, b) => b.event_clickers_14d - a.event_clickers_14d || a.days_out - b.days_out || a.event_id.localeCompare(b.event_id));
  return { shown: clicked.slice(0, top), withClicks: clicked.length, withoutClicks: gaps.length - clicked.length };
}

/** The legacy model's weekly total over every show, for checking against what the site really earns. */
export const legacyTotal = (ranked) => ranked.reduce((sum, row) => sum + (Number(row.expected_gbp) || 0), 0);

/** Counts of each evidence tier over every upcoming show. */
export function tierCounts(ranked) {
  const counts = { observed: 0, thin: 0, artist_only: 0, none: 0 };
  for (const row of ranked) counts[evidenceTier(row)] += 1;
  return counts;
}
