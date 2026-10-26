// Artist city research: one artist's tour, city by city, on one resale site.
//
// The first research type of the TTC Data & Insights engine (docs/BLOG.md,
// "Data & Insights engine"). It reuses the city-prices story's lane and market
// selection (scripts/lib/data-stories.mjs) and adds what a single-artist
// report needs: a coverage count against the tour's own cities, a gate that
// suppresses a thin result, a draft post, a PR package and a shareable chart.
//
// Same rules as the city-prices story (PROVIDER_DATA_POLICY.md, "One site,
// across cities, in a data story"): each figure is one site's listed price for
// the next date in its city, never a minimum across a city's dates; it passes
// the live display gate; it is under 72 hours old and carries its capture
// time; one country and one currency; no conversion; sites are never compared
// or ranked. Pure: callers pass every input, including `now`.

import { isUpcomingShow } from "../../functions/_upcoming.js";
import { eventLifecycleHeld } from "../../functions/_route-indexability.js";
import { artistPageIndexable } from "../../functions/_artist-indexability.js";
import { deriveArtistCities } from "../../functions/_artist-cities.js";
import { PRICE_DISCLOSURE } from "../../functions/_price-wording.js";
import {
  CITY_PRICE_GATE,
  PRICE_MOVE_SITES,
  gatherPriceLanes,
  chooseTourMarket,
  trimmed,
  isoDay,
  countryName,
  longDate,
  shortDate,
  money,
  captured
} from "./data-stories.mjs";

const SITE = "https://tourticketcompare.com";

// Quality thresholds. Below them the result is suppressed, not softened.
export const ARTIST_CITY_GATE = {
  // Fewer priced cities is a list, not a comparison.
  minPricedCities: 8,
  // Share of the market country's cities (those with a publishable next date)
  // that must have a fresh price on the chosen site. A ranking that leaves out
  // half the tour's cities would mislead.
  minCoverage: 0.5
};

export const artistCitySlug = (artistSlug) => `${artistSlug}-tour-ticket-prices-by-city`;

function median(sorted) {
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * @param {any[]} pricedShows Upcoming shows after `attachApprovedMarketplacePrices`.
 * @param {any[]} events events.json records.
 * @param {any[]} artists artists.json records.
 * @param {{ artistSlug: string, now: number, priceGuideArtists?: Set<string>, availableSites?: Set<string> }} options
 * @returns {object | null} null when the artist has no upcoming tour with any priced city.
 */
export function buildArtistCityFigures(pricedShows, events, artists, { artistSlug, now, priceGuideArtists = new Set(), availableSites = new Set() }) {
  const eventList = Array.isArray(events) ? events : [];
  const artist = (Array.isArray(artists) ? artists : []).find((row) => trimmed(row?.slug) === artistSlug);
  if (!artist) return null;
  const indexable = artistPageIndexable(artist, eventList, artistSlug, now);
  const lanes = gatherPriceLanes(pricedShows, { now, availableSites });

  const tours = new Map();
  for (const event of eventList) {
    if (trimmed(event?.artist_slug) !== artistSlug || eventLifecycleHeld(event) || !isUpcomingShow(event, now)) continue;
    const tourName = trimmed(event.tour_name);
    if (!tourName) continue;
    if (!tours.has(tourName.toLowerCase())) tours.set(tourName.toLowerCase(), { tourName, events: [] });
    tours.get(tourName.toLowerCase()).events.push(event);
  }

  // The tour with the most priced cities in one market.
  let best = null;
  for (const tour of tours.values()) {
    const market = chooseTourMarket(tour.events, artistSlug, lanes, { now });
    if (market && (!best || market.rows.length > best.market.rows.length)) best = { tour, market };
  }
  if (!best) return null;

  const { tour, market } = best;
  const cities = [...market.rows].sort((a, b) => a.price - b.price || a.city.localeCompare(b.city));
  const prices = cities.map((row) => row.price);
  const low = cities[0];
  const high = cities.at(-1);

  // Coverage: every city of this tour with a publishable next date, by country.
  const tourCities = deriveArtistCities(tour.events, artistSlug, { now }).filter((city) => city.shows.some((show) => show.publishable));
  const marketCities = tourCities.filter((city) => city.country === market.country);
  const pricedLabels = new Set(cities.map((row) => row.city));
  const otherCountries = new Map();
  for (const city of tourCities) {
    if (city.country === market.country) continue;
    const row = otherCountries.get(city.country) || { country: city.country, cities: 0, dates: 0 };
    row.cities += 1;
    row.dates += city.shows.filter((show) => show.publishable).length;
    otherCountries.set(city.country, row);
  }
  const capturedTimes = cities.map((row) => Date.parse(row.capturedAt)).sort((a, b) => a - b);
  const cityLinks = new Map(tourCities.map((city) => [city.label, `/artists/${artistSlug}/tickets/${city.slug}`]));

  return {
    storyType: "artist-cities",
    asOf: isoDay(now),
    artistSlug,
    artist: trimmed(artist.name) || artistSlug,
    artistPageIndexable: indexable,
    tourName: tour.tourName,
    path: `/artists/${artistSlug}`,
    pricePath: priceGuideArtists.has(artistSlug) ? `/artists/${artistSlug}/ticket-prices` : "",
    site: market.site,
    siteLabel: PRICE_MOVE_SITES.get(market.site),
    country: market.country,
    currency: market.currency,
    capturedFrom: new Date(capturedTimes[0]).toISOString(),
    capturedTo: new Date(capturedTimes.at(-1)).toISOString(),
    tourDates: tour.events.length,
    coverage: {
      marketCities: marketCities.length,
      pricedCities: cities.length,
      share: marketCities.length ? cities.length / marketCities.length : 0,
      unpricedCities: marketCities.filter((city) => !pricedLabels.has(city.label)).map((city) => city.label).sort(),
      otherCountries: [...otherCountries.values()].sort((a, b) => b.dates - a.dates || a.country.localeCompare(b.country))
    },
    low,
    high,
    median: median(prices),
    // Rounded down, so 1.95 reads 1.9× and never as the double it isn't.
    ratio: Math.floor((high.price / low.price) * 10) / 10,
    cities: cities.map((row) => ({ ...row, path: cityLinks.get(row.city) || "" }))
  };
}

/** Reasons the result must not be published; empty means it clears every threshold. */
export function artistCityGate(figures) {
  if (!figures) return ["the artist has no upcoming tour with a priced city on a site whose buttons are rendering"];
  const reasons = [];
  if (!figures.artistPageIndexable) reasons.push("the artist page is not indexable, so the report would have nothing to link to");
  if (figures.cities.length < ARTIST_CITY_GATE.minPricedCities) {
    reasons.push(`only ${figures.cities.length} cities have a fresh price on ${figures.siteLabel} (needs ${ARTIST_CITY_GATE.minPricedCities})`);
  }
  if (figures.coverage.share < ARTIST_CITY_GATE.minCoverage) {
    reasons.push(
      `${figures.cities.length} of ${figures.coverage.marketCities} ${figures.country} cities are priced on ${figures.siteLabel} (${Math.round(figures.coverage.share * 100)}%, needs ${Math.round(ARTIST_CITY_GATE.minCoverage * 100)}%)`
    );
  }
  return reasons;
}

function cityLabel(row) {
  return row.path ? `[${row.city}](${row.path})` : row.city;
}

function tableLine(row, siteLabel) {
  return `| ${cityLabel(row)} | ${longDate(row.localDate)} | ${row.venue} | ${money(row.price, row.currency)} | ${siteLabel} | ${captured(row.capturedAt)} |`;
}

const TABLE_HEAD = "| City | Next date | Venue | Lowest listed | Site | Captured |\n|---|---|---|---|---|---|";

function place(figures) {
  return countryName(figures.country);
}

// "Gracie Abrams'", "Vivid Seats'", "Sabaton's".
function possessive(name) {
  return /s$/.test(name) ? `${name}'` : `${name}'s`;
}

// "23 October 2026" or "22 to 23 October 2026".
function capturedSpan(figures) {
  const from = figures.capturedFrom.slice(0, 10);
  const to = figures.capturedTo.slice(0, 10);
  return from === to ? longDate(to) : `${shortDate(from)} to ${longDate(to)}`;
}

// "23 October, 20:40 UTC" or "22 October, 06:10 UTC to 23 October, 20:40 UTC".
function capturedRange(figures) {
  const from = captured(figures.capturedFrom);
  const to = captured(figures.capturedTo);
  return from === to ? from : `${from} to ${to}`;
}

function plural(count, one, many) {
  return `${count} ${count === 1 ? one : many}`;
}

/** The headline finding, reused by the post and the PR package. */
export function headline(figures) {
  const { artist, low, high, currency, ratio } = figures;
  return `${artist} tour tickets: listed ${money(low.price, currency)} in ${low.city}, ${money(high.price, currency)} in ${high.city} (${ratio}×)`;
}

// Search descriptions are capped at 160 characters by the blog build; fall
// back to shorter wording rather than fail on a long artist or tour name.
function description(figures) {
  const { artist, tourName, cities, low, high, currency } = figures;
  const range = `${money(low.price, currency)} in ${low.city} at the low end, ${money(high.price, currency)} in ${high.city} at the high end`;
  return [
    `${possessive(artist)} ${tourName} in ${place(figures)}: the lowest listed price for the next date in ${cities.length} cities, ${range}.`,
    `${possessive(artist)} tour in ${place(figures)}: the lowest listed price for the next date in ${cities.length} cities, ${range}.`,
    `${artist} tour: the next date in ${cities.length} cities, ${range}.`
  ].find((text) => text.length <= 160) || `${artist} tour ticket prices by city.`;
}

export function renderArtistCityPost(figures, existing = null) {
  const { artist, tourName, cities, low, high, currency, siteLabel, coverage } = figures;
  const date = existing?.date || figures.asOf;
  const status = existing?.status === "published" ? "published" : "draft";
  const updated = date !== figures.asOf ? figures.asOf : "";
  const guide = figures.pricePath ? `[${artist} ticket price guide](${figures.pricePath})` : `[${artist} page](${figures.path})`;
  const unpriced = coverage.unpricedCities.length
    ? `${plural(coverage.unpricedCities.length, "city", "cities")} in ${place(figures)} had no recent listed price on ${siteLabel} and ${coverage.unpricedCities.length === 1 ? "is" : "are"} left out: ${coverage.unpricedCities.join(", ")}.`
    : `Every city on the tour in ${place(figures)} had a recent listed price on ${siteLabel}.`;
  const coverageLine = coverage.unpricedCities.length ? `${cities.length} of the ${coverage.marketCities} cities on the tour in ${place(figures)} are priced. ${unpriced}` : `All ${coverage.marketCities} cities on the tour in ${place(figures)} are priced.`;
  const others = coverage.otherCountries.length
    ? `The tour also has dates in ${coverage.otherCountries.map((row) => `${countryName(row.country)} (${row.dates})`).join(", ")}. They are left out, because comparing across countries would mix markets and currencies.`
    : "";

  // Search title budget: 60 characters including the " | TourTicketCompare" suffix.
  const seoTitle = (name) => ["tour ticket prices by city", "ticket prices by city", "ticket prices"]
    .map((tail) => `${name} ${tail}`)
    .find((candidate) => candidate.length + " | TourTicketCompare".length <= 60) || `${name} ticket prices`;

  const front = [
    "---",
    `title: "${artist} tour tickets: listed prices city by city"`,
    `seo_title: "${seoTitle(artist)}"`,
    `description: "${description(figures)}"`,
    `summary: "${possessive(siteLabel)} lowest listed price for the next ${artist} date in each of ${cities.length} cities, each figure with the time it was captured. Snapshots ${capturedSpan(figures)}."`,
    `date: ${date}`,
    ...(updated ? [`updated: ${updated}`] : []),
    `status: ${status}`,
    "tags:",
    "  - tour-data",
    "related_artists:",
    `  - ${figures.artistSlug}`,
    "related_guides:",
    "  - primary-vs-resale-concert-tickets",
    "---"
  ].join("\n");

  const body = `${possessive(artist)} ${tourName} has ${figures.tourDates} dates that TourTicketCompare tracks. In ${place(figures)}, ${cities.length} cities had a recent listed price on ${siteLabel}. The next date in ${low.city} was listed at ${money(low.price, currency)} at the low end, and the next date in ${high.city} at ${money(high.price, currency)} at the high end, ${figures.ratio} times as much. The median city was listed at ${money(figures.median, currency)}.

## ${artist} ticket prices by city

${TABLE_HEAD}
${cities.map((row) => tableLine(row, siteLabel)).join("\n")}

Each figure is the lowest listed price on ${siteLabel} for the next date in that city, so a city with several dates shows only its first. Cities are ordered from the lowest listed price to the highest. Open a city to see every date there.

## How this was worked out

- **One site.** Every price is from ${siteLabel}, the site with recent listed prices in the most cities for this tour. Sites are not compared with each other.
- **One country, one currency.** ${others || `All figures are in ${currency} for ${place(figures)}.`}
- **Next date only.** A city's figure is its first upcoming date, not the lowest of all its dates.
- **Recent prices only.** A price is used only if it was captured in the 72 hours before this page was updated. Captured times are in the table.
- **Coverage.** ${coverageLine}

## What this does and doesn't say

- **These are listed prices.** ${PRICE_DISCLOSURE}
- **A city gap is not a forecast.** A city that's high today can drop, and a low one can rise. Nothing here says when to buy or why a city is priced as it is.
- **Only the dates TourTicketCompare tracks.** The figures describe those dates on ${siteLabel}, not every ticket for the tour.

For every date and every site, with the current price, open the ${guide}.
`;
  return `${front}\n\n${body}`;
}

function esc(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** A horizontal bar chart of the tabled cities, ready to share. */
export function renderArtistCityChart(figures) {
  const rows = figures.cities;
  const width = 760;
  const left = 190;
  const rowHeight = 26;
  const top = 74;
  const bottom = 52;
  const height = top + rows.length * rowHeight + bottom;
  const max = Math.max(...rows.map((row) => row.price));
  const bars = rows
    .map((row, index) => {
      const y = top + index * rowHeight;
      const barWidth = Math.max(2, Math.round(((width - left - 90) * row.price) / max));
      return `<text x="${left - 8}" y="${y + 17}" text-anchor="end" font-size="13" fill="#1f2933">${esc(row.city)}</text><rect x="${left}" y="${y + 3}" width="${barWidth}" height="18" rx="2" fill="#2563eb"/><text x="${left + barWidth + 6}" y="${y + 17}" font-size="13" fill="#1f2933">${esc(money(row.price, row.currency))}</text>`;
    })
    .join("");
  const title = `${figures.artist}, ${figures.tourName}: lowest listed price by city`;
  const note = `${figures.siteLabel}, next date in each city, captured ${capturedSpan(figures)}. Listed prices, not final totals.`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="t d" font-family="system-ui, -apple-system, Segoe UI, sans-serif"><title id="t">${esc(title)}</title><desc id="d">${esc(note)}</desc><rect width="${width}" height="${height}" fill="#ffffff"/><text x="20" y="32" font-size="18" font-weight="600" fill="#111827">${esc(title)}</text><text x="20" y="54" font-size="12" fill="#4b5563">${esc(note)}</text>${bars}<text x="20" y="${height - 18}" font-size="12" fill="#4b5563">Source: TourTicketCompare, ${SITE.replace("https://", "")}${esc(`/blog/${artistCitySlug(figures.artistSlug)}`)}</text></svg>\n`;
}

/**
 * A draft editorial package. Every angle states the figure it rests on. It
 * names media categories, never people or outlets, and it is not sent.
 */
export function renderArtistCityPrPackage(figures) {
  const { artist, tourName, cities, low, high, currency, siteLabel, coverage, median: mid } = figures;
  const url = `${SITE}/blog/${artistCitySlug(figures.artistSlug)}`;
  const cap = capturedRange(figures);
  const fact = (row) => `${money(row.price, currency)} in ${row.city} (${row.venue}, ${longDate(row.localDate)})`;
  const lowest3 = cities.slice(0, 3);
  const highest3 = cities.slice(-3).reverse();
  const share = Math.round(coverage.share * 100);
  const angles = [
    ...lowest3.map(
      (row) => `**${row.city}, low end.** ${fact(row)} was among the three lowest-listed of ${cities.length} cities in ${place(figures)} on ${siteLabel}. Angle for an entertainment or local-news desk in ${row.city}: what a local fan sees for the same tour compared with the rest of the country. Evidence: row ${cities.indexOf(row) + 1} of ${cities.length} in the table.`
    ),
    ...highest3.map(
      (row) => `**${row.city}, high end.** ${fact(row)} was among the three highest-listed. Angle for a desk in ${row.city}: the same show listed at ${(Math.floor((row.price / low.price) * 10) / 10)} times the lowest city's figure. Evidence: the table.`
    ),
    `**The fan question.** "Is it worth travelling?" The lowest-listed city, ${low.city}, was ${money(high.price - low.price, currency)} below the highest, ${high.city}, before any travel cost. TourTicketCompare holds no travel-cost data, so no saving is claimed.`
  ];

  return `# ${artist}: ${tourName} — PR package (DRAFT, NOT SENT)

> Status: draft for owner review. Nothing here has been sent or posted. Outreach needs the owner's approval of the exact text and recipients.

## Headline

${headline(figures)}

## Key finding

On ${siteLabel}, the lowest listed price for the next ${artist} date in ${cities.length} cities in ${place(figures)} ranged between ${fact(low)} and ${fact(high)}, ${figures.ratio} times as much. The median city was listed at ${money(mid, currency)}.

## Permanent, citable page

${url}

## Quotable facts (each is in the page's table)

- "Across ${cities.length} cities in ${place(figures)} on ${siteLabel}, the lowest listed price for the next ${artist} date was ${money(low.price, currency)} in ${low.city} and ${money(high.price, currency)} in ${high.city}." (TourTicketCompare, captured ${cap})
- "The median of the ${cities.length} cities was ${money(mid, currency)}."
- "These are listed resale prices at the time shown, not final totals and not face value."

## Story angles

${angles.map((angle) => `- ${angle}`).join("\n")}

## Supporting data

${TABLE_HEAD}
${cities.map((row) => tableLine(row, siteLabel)).join("\n")}

Shareable chart: \`chart.svg\` in this folder (carries the site, capture dates and source line).

## Method and limits to state when quoting

- One site (${siteLabel}), next date per city, one country (${place(figures)}) and one currency (${currency}); no conversion; no comparison between sites.
- ${cities.length} of ${coverage.marketCities} cities in ${place(figures)} priced (${share}%). Unpriced: ${coverage.unpricedCities.join(", ") || "none"}.
- Dates in ${coverage.otherCountries.map((row) => countryName(row.country)).join(", ") || "other countries"} are not covered.
- Listed prices at ${cap}; prices move. No forecast, no timing advice, no claim about why a city is priced as it is.
- The figures cover the dates TourTicketCompare tracks, not every ticket for the tour and not the concert market.

## Target media categories (categories only; no contacts are listed)

- ${artist} fan communities and fan-run news accounts (a tour-wide price map is the useful asset; no posting to forums or groups without approval).
- Entertainment and local-news desks in the lowest- and highest-listed cities: ${[...lowest3, ...highest3].map((row) => row.city).join(", ")}.
- Music news desks covering the tour.
- Consumer-money and "cost of going out" desks.

## Rights check before any release

- Off-site use of site prices, named with site and capture time: recorded in docs/PROVIDER_DATA_POLICY.md ("Off-site use").
- Setting one site's cities side by side for a single artist: approved by the owner on 2026-10-23, recorded in docs/PROVIDER_DATA_POLICY.md ("Single-artist city report"), with the same conditions as the same-tour story.
- Nothing is quoted from, or attributed to, a person or outlet.

## Approval checklist (owner)

- [ ] Publish the research page
- [ ] Approve exact pitch text
- [ ] Approve recipients
`;
}
