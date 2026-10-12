// Expected-commission ranking of upcoming shows (the "top 25 shows" list).
//
// Owner decision 2026-10-11 (revenue plan, /mnt/project-files/plans/
// revenue-plan-2026-10.md): one daily ranked list decides, automatically,
// which shows get their prices refreshed first, which get internal links,
// which event pages go in the next indexing batch, which go in the weekly
// social pack, and which provider-coverage gaps the sync fixes first.
//
// The score is a rough expected commission per week for one show, from data we
// already hold. It ranks; it is never shown to visitors and never changes what
// a show card offers or in which order (that is the CTA gate's job).
//
//   expected £ = weekly demand × order rate × order value × best lane rate × closeness
//
//   weekly demand  visitor-days that clicked a ticket button for this show in
//                  the last 14 days (halved to a week), plus the artist's
//                  page visitors in the last 7 days × the site click rate,
//                  spread over the artist's dates in the next 60 days (later
//                  dates get none of it), plus a
//                  small prior so a show with no traffic still ranks by price
//   order rate     1 order per 100 clickers (Oct 2026: 3 resale orders from
//                  ~290 clicker-days; inferred, replace once tracking is live)
//   order value    lowest current listed price across live lanes × 2 seats,
//                  USD converted to GBP; artist median, then a default, when
//                  the show has no current price
//   lane rate      the best commission rate among the show's live lanes
//   closeness      ×3 inside 7 days, ×1.5 inside 30 days, ×1 after that
//
// `gap` is what the missing high-paying lanes (StubHub International, Vivid
// Seats) would add: half their rate each, because a new lane partly takes
// buyers from the lanes already there rather than adding new ones. It is not
// zero next to an existing 10% lane: where StubHub International is listed it
// takes about two thirds of clicks. `potential` = expected + gap.

import { eventLifecycleHeld } from "../../functions/_route-indexability.js";
import { publishableLaneSlugs } from "./event-link-coverage.mjs";

const DAY_MS = 86400000;

// Commission per order by lane, as a share of the order. Vivid Seats (10%) and
// StubHub International (9%) are measured from the Impact Action Listing
// (Oct 2026). TicketNetwork and Ticket Liquidator have no order yet, so 8% is
// an assumption. SeatGeek pays ~1% in Impact (its $10 promo-code payout sits
// outside Impact and is per order, not a share). Ticketmaster pays nothing.
export const LANE_COMMISSION = Object.freeze({
  "vivid-seats": 0.10,
  "stubhub-international": 0.09,
  ticketnetwork: 0.08,
  "ticket-liquidator": 0.08,
  seatgeek: 0.01,
  ticketmaster: 0
});

// The lanes whose absence is worth fixing first: the two measured high payers.
export const HIGH_PAYING_LANES = Object.freeze(["stubhub-international", "vivid-seats"]);

export const MODEL = Object.freeze({
  orderRate: 0.01,
  seats: 2,
  usdToGbp: 0.79,
  defaultPriceUsd: 120,
  siteClickRate: 0.31,
  artistSpreadDays: 60,
  priorWeeklyClickers: 0.05,
  horizonDays: 365
});

export function closenessWeight(daysOut) {
  if (daysOut <= 7) return 3;
  if (daysOut <= 30) return 1.5;
  return 1;
}

function median(values) {
  const sorted = values.filter(Number.isFinite).sort((a, b) => a - b);
  if (!sorted.length) return null;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

const round2 = (n) => Math.round(n * 100) / 100;

/**
 * @param {object} input
 * @param {object[]} input.events            public/data/events.json records
 * @param {(slug: string) => boolean} input.isConfigured  providerConfiguredTest(catalog)
 * @param {Map<string, number>} input.eventClickers   event_id -> clicker visitor-days, last 14 days
 * @param {Map<string, number>} input.artistVisitors  artist_slug -> page-view visitor-days, last 7 days
 * @param {Map<string, Map<string, number>>} input.prices  event_id -> provider -> current low price (USD)
 * @param {number} [input.now]
 */
export function rankShows({ events, isConfigured, eventClickers = new Map(), artistVisitors = new Map(), prices = new Map(), now = Date.now() }) {
  const upcoming = [];
  for (const event of events) {
    const start = Date.parse(event?.datetime_iso || "");
    if (!event?.id || !event?.artist_slug || !Number.isFinite(start)) continue;
    const daysOut = (start - now) / DAY_MS;
    if (daysOut < 0 || daysOut > MODEL.horizonDays || eventLifecycleHeld(event)) continue;
    upcoming.push({ event, daysOut });
  }

  const spreadCount = new Map();
  for (const { event, daysOut } of upcoming) {
    if (daysOut <= MODEL.artistSpreadDays) spreadCount.set(event.artist_slug, (spreadCount.get(event.artist_slug) || 0) + 1);
  }

  const lowestFor = (event, lanes) => {
    const byProvider = prices.get(event.id);
    if (!byProvider) return null;
    const values = lanes.map((lane) => byProvider.get(lane)).filter((v) => Number.isFinite(v) && v > 0);
    return values.length ? Math.min(...values) : null;
  };

  const rows = upcoming.map(({ event, daysOut }) => {
    const lanes = publishableLaneSlugs(event, isConfigured, now);
    return { event, daysOut, lanes, lowest: lowestFor(event, lanes) };
  });

  const artistMedian = new Map();
  for (const slug of new Set(rows.map((r) => r.event.artist_slug))) {
    artistMedian.set(slug, median(rows.filter((r) => r.event.artist_slug === slug).map((r) => r.lowest)));
  }

  const ranked = rows.map(({ event, daysOut, lanes, lowest }) => {
    const slug = event.artist_slug;
    const clickers = (eventClickers.get(event.id) || 0) / 2;
    const fromArtist = daysOut <= MODEL.artistSpreadDays
      ? ((artistVisitors.get(slug) || 0) * MODEL.siteClickRate) / Math.max(1, spreadCount.get(slug) || 1)
      : 0;
    const demand = clickers + fromArtist + MODEL.priorWeeklyClickers;
    const priceUsd = lowest ?? artistMedian.get(slug) ?? MODEL.defaultPriceUsd;
    const orderGbp = priceUsd * MODEL.seats * MODEL.usdToGbp;
    const bestRate = Math.max(0, ...lanes.map((lane) => LANE_COMMISSION[lane] ?? 0));
    const base = demand * MODEL.orderRate * orderGbp * closenessWeight(daysOut);
    const missing = HIGH_PAYING_LANES.filter((lane) => !lanes.includes(lane));
    const gapRate = missing.reduce((sum, lane) => sum + LANE_COMMISSION[lane] / 2, 0);
    return {
      event_id: event.id,
      artist_slug: slug,
      artist_name: event.artist_name || slug,
      city: event.city || "",
      venue: event.venue || "",
      country: event.country || "",
      date: String(event.datetime_iso).slice(0, 10),
      days_out: Math.floor(daysOut),
      weekly_demand: round2(demand),
      price_usd: Math.round(priceUsd),
      price_source: lowest != null ? "show" : artistMedian.get(slug) != null ? "artist_median" : "default",
      lanes,
      best_lane_rate: bestRate,
      missing_high_paying_lanes: missing,
      expected_gbp: round2(base * bestRate),
      gap_gbp: round2(base * gapRate),
      potential_gbp: round2(base * (bestRate + gapRate))
    };
  });

  ranked.sort((a, b) => b.expected_gbp - a.expected_gbp || b.potential_gbp - a.potential_gbp || a.days_out - b.days_out || a.event_id.localeCompare(b.event_id));
  ranked.forEach((row, index) => { row.rank = index + 1; });
  return ranked;
}

/** The shows where adding a missing high-paying lane is worth most, best first. */
export function coverageGaps(ranked, { top = 25 } = {}) {
  return ranked
    .filter((row) => row.missing_high_paying_lanes.length)
    .sort((a, b) => b.gap_gbp - a.gap_gbp || a.rank - b.rank)
    .slice(0, top);
}

// Artists whose upcoming shows lack `provider`, by the value of those shows.
// The provider sync iterates artists, so it checks these first.
export function gapArtists(ranked, provider, { top = 25 } = {}) {
  const value = new Map();
  for (const row of ranked) {
    if (row.lanes.includes(provider)) continue;
    value.set(row.artist_slug, (value.get(row.artist_slug) || 0) + (Number(row.potential_gbp) || 0));
  }
  return [...value.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, top).map(([slug]) => slug);
}
