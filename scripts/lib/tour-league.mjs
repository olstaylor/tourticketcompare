// Tour price league table: which US tours have the highest and lowest listed
// prices right now. Owner decision 2026-11-02 (PROVIDER_DATA_POLICY.md,
// "Relaxed data-story rules"): tours may be ranked by price, using the cheapest
// listed price across the sites we check for each date.
//
// Method, kept simple so it can be explained on the page:
// - One reading per event and site: the newest daily low in the last 3 days.
// - US shows only, USD only, at least 7 days away (final-week feeds carry
//   placeholder prices), not cancelled or postponed, artist page indexable.
// - A price under $10 is dropped, and so is one far below the other sites for
//   the same show (the shared cross-site guard in functions/_price-outliers.js).
// - A date's figure is the lowest of its remaining site readings.
// - A tour is ranked by the MEDIAN of its dates' figures, with the middle half
//   of its dates (25th to 75th percentile) shown, and only with 6+ dates.
// Pure: callers pass every input, including `now`.

import { isUpcomingShow } from "../../functions/_upcoming.js";
import { eventLifecycleHeld } from "../../functions/_route-indexability.js";
import { artistPageIndexable } from "../../functions/_artist-indexability.js";
import { implausiblyLowAmongSites } from "../../functions/_price-outliers.js";
import { normalizeCountry } from "../../functions/_cities.js";
import { trimmed, isoDay } from "./data-stories.mjs";

export const TOUR_LEAGUE_SLUG = "which-us-tours-have-the-highest-ticket-prices";

export const TOUR_LEAGUE_SITES = new Map([
  ["vivid-seats", "Vivid Seats"],
  ["ticketnetwork", "TicketNetwork"],
  ["stubhub-international", "StubHub International"]
]);

export const TOUR_LEAGUE_GATE = {
  minDatesPerTour: 6,
  minTours: 12,
  maxReadingAgeDays: 3,
  minDaysToShow: 7,
  minPrice: 10,
  listSize: 10
};

export const TOUR_LEAGUE_SQL = `WITH l AS (SELECT event_id, provider, currency, MAX(observed_date) d FROM provider_pricing_daily WHERE observed_date >= date('{AS_OF}','-2 day') GROUP BY event_id, provider, currency)
SELECT p.artist_slug, p.event_id, p.provider, p.currency, p.observed_date, MIN(p.low_price_last) price FROM l JOIN provider_pricing_daily p ON p.event_id=l.event_id AND p.provider=l.provider AND p.currency=l.currency AND p.observed_date=l.d GROUP BY p.artist_slug, p.event_id, p.provider, p.currency, p.observed_date`;

export function tourLeagueSql(asOf) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(asOf))) throw new Error(`tourLeagueSql: bad as-of date "${asOf}"`);
  return TOUR_LEAGUE_SQL.replaceAll("{AS_OF}", asOf);
}

function dayDiff(a, b) {
  return Math.round((Date.parse(`${a}T00:00:00Z`) - Date.parse(`${b}T00:00:00Z`)) / 86400000);
}

/** Linear-interpolated percentile of an ascending numeric list. */
export function percentile(sorted, p) {
  if (!sorted.length) return NaN;
  const pos = (sorted.length - 1) * p;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
}

const money = (value) => `$${Math.round(value).toLocaleString("en-US")}`;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const longDate = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};

/**
 * @param {any[]} rows TOUR_LEAGUE_SQL rows.
 * @param {any[]} events events.json records.
 * @param {any[]} artists artists.json records.
 * @param {{ now: number }} options
 */
export function buildTourLeagueFigures(rows, events, artists, { now }) {
  const asOf = isoDay(now);
  const eventList = Array.isArray(events) ? events : [];
  const byId = new Map(eventList.map((event) => [trimmed(event?.id), event]));
  const names = new Map((Array.isArray(artists) ? artists : []).map((artist) => [trimmed(artist?.slug), trimmed(artist?.name)]));
  const indexable = new Set(
    (Array.isArray(artists) ? artists : [])
      .filter((artist) => artist && artistPageIndexable(artist, eventList, trimmed(artist.slug), now))
      .map((artist) => trimmed(artist.slug))
  );

  // event id -> site -> price
  const readings = new Map();
  let newest = "";
  for (const row of Array.isArray(rows) ? rows : []) {
    const site = trimmed(row?.provider);
    if (!TOUR_LEAGUE_SITES.has(site) || trimmed(row?.currency) !== "USD") continue;
    const event = byId.get(trimmed(row?.event_id));
    if (!event || eventLifecycleHeld(event) || !isUpcomingShow(event, now)) continue;
    if (normalizeCountry(trimmed(event.country)) !== "United States") continue;
    const artistSlug = trimmed(event.artist_slug);
    if (!indexable.has(artistSlug) || artistSlug !== trimmed(row.artist_slug)) continue;
    const startMs = Date.parse(trimmed(event.datetime_iso));
    if (!Number.isFinite(startMs) || startMs - now < TOUR_LEAGUE_GATE.minDaysToShow * 86400000) continue;
    const price = Number(row.price);
    if (!(price >= TOUR_LEAGUE_GATE.minPrice)) continue;
    const observed = trimmed(row.observed_date);
    if (dayDiff(asOf, observed) > TOUR_LEAGUE_GATE.maxReadingAgeDays) continue;
    if (!readings.has(event.id)) readings.set(event.id, { event, prices: new Map() });
    readings.get(event.id).prices.set(site, price);
    if (!newest || observed > newest) newest = observed;
  }

  const tours = new Map();
  let droppedLow = 0;
  for (const { event, prices } of readings.values()) {
    const entries = [...prices.entries()].map(([site, price]) => ({ site, price, currency: "USD" }));
    const hide = implausiblyLowAmongSites(entries);
    const kept = entries.filter((_, index) => !hide[index]);
    droppedLow += entries.length - kept.length;
    if (!kept.length) continue;
    const artistSlug = trimmed(event.artist_slug);
    if (!tours.has(artistSlug)) tours.set(artistSlug, { slug: artistSlug, tourNames: new Map(), figures: [] });
    const tour = tours.get(artistSlug);
    tour.figures.push(Math.min(...kept.map((entry) => entry.price)));
    const tourName = trimmed(event.tour_name);
    if (tourName) tour.tourNames.set(tourName, (tour.tourNames.get(tourName) || 0) + 1);
  }

  const ranked = [...tours.values()]
    .filter((tour) => tour.figures.length >= TOUR_LEAGUE_GATE.minDatesPerTour)
    .map((tour) => {
      const sorted = [...tour.figures].sort((a, b) => a - b);
      const tourName = [...tour.tourNames.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0] || "";
      return {
        slug: tour.slug,
        label: names.get(tour.slug) || tour.slug,
        path: `/artists/${tour.slug}`,
        tourName,
        dates: sorted.length,
        median: percentile(sorted, 0.5),
        p25: percentile(sorted, 0.25),
        p75: percentile(sorted, 0.75)
      };
    })
    .sort((a, b) => b.median - a.median || a.label.localeCompare(b.label));

  const totalDates = ranked.reduce((sum, tour) => sum + tour.dates, 0);
  return {
    storyType: "tour-league",
    asOf,
    newestReading: newest,
    tourCount: ranked.length,
    totalDates,
    largestTourShare: totalDates ? Math.max(...ranked.map((tour) => tour.dates)) / totalDates : 0,
    droppedImplausiblyLow: droppedLow,
    tours: ranked
  };
}

export function tourLeagueGate(figures) {
  const reasons = [];
  if (figures.tourCount < TOUR_LEAGUE_GATE.minTours) {
    reasons.push(`only ${figures.tourCount} tours have ${TOUR_LEAGUE_GATE.minDatesPerTour}+ priced US dates; the table needs ${TOUR_LEAGUE_GATE.minTours}`);
  }
  if (!figures.newestReading) reasons.push("no recent price readings");
  return reasons;
}

export function renderTourLeaguePost(figures, existing = null) {
  const date = existing?.date || figures.asOf;
  const status = existing?.status === "published" ? "published" : "draft";
  const updated = date !== figures.asOf ? figures.asOf : "";
  const size = TOUR_LEAGUE_GATE.listSize;
  const high = figures.tours.slice(0, size);
  const low = figures.tours.slice(-size).reverse();
  const row = (tour) =>
    `| [${tour.label}](${tour.path}) | ${tour.tourName || "-"} | ${tour.dates} | ${money(tour.median)} | ${money(tour.p25)} to ${money(tour.p75)} |`;
  const head = "| Tour | Tour name | US dates priced | Typical lowest price | Middle half of dates |\n|---|---|---|---|---|";

  const front = [
    "---",
    `title: "Which US tours have the highest and lowest ticket prices right now?"`,
    `seo_title: "US concert ticket prices by tour"`,
    `description: "${figures.tourCount} US tours ranked by their typical lowest listed resale price, from ${money(low[0].median)} to ${money(high[0].median)}, checked ${longDate(figures.newestReading)}."`,
    `summary: "A ranking of ${figures.tourCount} US tours by the typical lowest listed resale price across ${figures.totalDates} dates. Prices checked up to ${longDate(figures.newestReading)}."`,
    `date: ${date}`,
    ...(updated ? [`updated: ${updated}`] : []),
    `status: ${status}`,
    "tags:",
    "  - tour-data",
    "related_guides:",
    "  - primary-vs-resale-concert-tickets",
    "---"
  ].join("\n");

  const body = `Ticket prices vary a lot from one tour to the next. To show how much, TourTicketCompare took the lowest listed resale price for every upcoming US date it tracks, then found the typical figure for each tour. The tours below are the ${size} with the highest typical price and the ${size} with the lowest, out of ${figures.tourCount} tours with at least ${TOUR_LEAGUE_GATE.minDatesPerTour} priced US dates. Prices were checked up to ${longDate(figures.newestReading)}.

## Tours with the highest typical lowest price

${head}
${high.map(row).join("\n")}

## Tours with the lowest typical lowest price

${head}
${low.map(row).join("\n")}

## How to read this

- **"Typical lowest price"** is the median, the middle value, of the lowest listed prices across a tour's US dates. "Middle half of dates" runs from the 25th to the 75th percentile, so it shows how much the dates differ within one tour.
- **Each date's figure** is the lowest listed price among the resale sites TourTicketCompare checks (Vivid Seats, TicketNetwork and StubHub International). A price far below every other site's price for the same show is treated as a feed error and left out, as is anything under $10.
- **Included:** United States dates in US dollars, at least a week away, from the newest reading in the last three days. Final-week readings are left out because some feeds show placeholder prices then. ${figures.tourCount} tours and ${figures.totalDates} dates are counted, and no tour is more than ${Math.round(figures.largestTourShare * 100)}% of them.
- **A listed price is not a checkout total.** Fees and delivery are added at the ticket site, and the cheapest seats differ between a stadium and a theatre, so a bigger venue can look cheaper or dearer for reasons that have nothing to do with the artist.
- **This is a snapshot, not a forecast.** It says what listings cost when they were checked, not what they will cost later.

To see the current price for one date, with the ticket site and the time it was captured, open the artist's page from the tables above.
`;
  return `${front}\n\n${body}`;
}
