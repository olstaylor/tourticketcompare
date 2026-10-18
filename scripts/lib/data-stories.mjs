// Automated data stories: figures, a blog draft and a press-release draft built
// from the site's own reviewed event records, with no human writing step.
//
// Three story types. The yearly touring map: where the major tours
// TourTicketCompare tracks are playing in a calendar year, counted by city,
// venue, country and month, over the same records the /tours/<year> hub, city
// pages and venue pages already render. The price-moves story: per site, how
// many dates are listed lower or higher than 30 days earlier (see below). The
// city-prices story: one site's listed price for the same tour in each city.
//
// Deliberately out of scope (docs/BLOG.md, "Automated data stories"): printed
// prices outside the city-prices story, cross-site comparisons and "best time to buy" claims (PROVIDER_DATA_POLICY.md and the
// price-timing evidence thresholds), presale windows (Ticketmaster's lists mix
// VIP packages and card offers, so a count of them would mislead), inventory,
// and any claim about the whole concert market. The copy always says the
// figures cover the tours the site tracks.
//
// Pure: callers pass every input, including `now`, so the output is
// reproducible and testable. Nothing here reads files or the network.

import { isUpcomingShow } from "../../functions/_upcoming.js";
import { eventLocalDateParts, eventLocalDateIso } from "../../functions/_event-local-date.js";
import { eventLifecycleHeld } from "../../functions/_route-indexability.js";
import { artistPageIndexable } from "../../functions/_artist-indexability.js";
import { citySlug, metroCity, normalizeCountry, deriveCities } from "../../functions/_cities.js";
import { canonicalCity, venueSlug, deriveVenues } from "../../functions/_venues.js";
import { TOURS_HUB_YEAR, TOURS_HUB_PATH } from "../../functions/_tours-hub.js";
import { deriveArtistCities } from "../../functions/_artist-cities.js";

const SITE = "https://tourticketcompare.com";
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// The publish gate. Below these the corpus is too thin for a claim a reporter
// could repeat, so the build refuses rather than writing a weak story.
export const STORY_GATE = {
  minShows: 300,
  minArtists: 30,
  minCountries: 5,
  // The newest recheck in the counted records must be this recent, so a story
  // never goes out on a corpus the nightly sync has stopped refreshing.
  maxStaleDays: 14,
  // A ranked row needs at least this many shows to be named.
  minRankedShows: 5
};

export const TOUR_MAP_SLUG_PREFIX = "where-the-big-concert-tours-are-playing-in";

function trimmed(value) {
  return String(value ?? "").trim();
}

function isoDay(ms) {
  return new Date(ms).toISOString().slice(0, 10);
}

function rank(map, limit) {
  return [...map.values()]
    .filter((row) => row.showCount >= STORY_GATE.minRankedShows)
    .sort((a, b) => b.showCount - a.showCount || a.label.localeCompare(b.label))
    .slice(0, limit);
}

function tally(map, key, seed) {
  if (!map.has(key)) map.set(key, { ...seed, showCount: 0, artists: new Set() });
  return map.get(key);
}

/**
 * Count one year's upcoming tracked shows by city, venue, country and month.
 *
 * A show counts when its artist page is indexable, it has not started, it is
 * not cancelled or postponed, and it falls in `year` on the venue's calendar:
 * the same rules as the /tours/<year> hub.
 *
 * @param {any[]} events events.json records.
 * @param {any[]} artists artists.json records.
 * @param {{ year: number, now: number }} options
 */
export function buildTourMapFigures(events, artists, { year, now }) {
  const rows = Array.isArray(events) ? events : [];
  const indexable = new Set(
    (Array.isArray(artists) ? artists : [])
      .filter((artist) => artist && artistPageIndexable(artist, rows, trimmed(artist.slug), now))
      .map((artist) => trimmed(artist.slug))
  );
  const linkableCities = new Set(deriveCities(rows, { now }).filter((city) => city.indexable).map((city) => city.slug));
  const linkableVenues = new Set(deriveVenues(rows, { now }).filter((venue) => venue.indexable).map((venue) => venue.slug));

  const cities = new Map();
  const venues = new Map();
  const countries = new Map();
  const tourArtists = new Map();
  const months = new Array(12).fill(0);
  let showCount = 0;
  let latestVerified = "";

  for (const event of rows) {
    const artistSlug = trimmed(event?.artist_slug);
    if (!indexable.has(artistSlug)) continue;
    if (eventLifecycleHeld(event) || !isUpcomingShow(event, now)) continue;
    const parts = eventLocalDateParts(event);
    if (!parts || parts.year !== year) continue;
    const country = normalizeCountry(event.country);
    const rawCity = canonicalCity(event.city);
    const venueName = trimmed(event.venue);
    if (!country || !rawCity || !venueName) continue;

    showCount += 1;
    months[parts.month - 1] += 1;
    const verified = trimmed(event.last_verified_at);
    if (/^\d{4}-\d{2}-\d{2}$/.test(verified) && verified > latestVerified) latestVerified = verified;

    const city = metroCity(rawCity, country);
    const cSlug = citySlug(city, country);
    tally(cities, cSlug, { slug: cSlug, label: city, country, path: linkableCities.has(cSlug) ? `/cities/${cSlug}` : "" }).artists.add(artistSlug);
    cities.get(cSlug).showCount += 1;

    const vSlug = venueSlug(venueName, rawCity);
    tally(venues, vSlug, { slug: vSlug, label: venueName, city: rawCity, country, path: linkableVenues.has(vSlug) ? `/venues/${vSlug}` : "" }).artists.add(artistSlug);
    venues.get(vSlug).showCount += 1;

    tally(countries, country, { label: country }).artists.add(artistSlug);
    countries.get(country).showCount += 1;

    tally(tourArtists, artistSlug, { slug: artistSlug, label: trimmed(event.artist_name) || artistSlug, path: `/artists/${artistSlug}` }).artists.add(artistSlug);
    tourArtists.get(artistSlug).showCount += 1;
  }

  const finish = (row) => {
    const { artists: set, ...rest } = row;
    return { ...rest, artistCount: set.size };
  };
  const busiestMonth = months.indexOf(Math.max(...months));

  return {
    storyType: "tour-map",
    year,
    asOf: isoDay(now),
    latestVerified,
    showCount,
    artistCount: tourArtists.size,
    cityCount: cities.size,
    venueCount: venues.size,
    countryCount: countries.size,
    topCities: rank(cities, 10).map(finish),
    topVenues: rank(venues, 10).map(finish),
    topCountries: rank(countries, 8).map(finish),
    topArtists: rank(tourArtists, 5).map(finish),
    months: months.map((count, index) => ({ month: MONTHS[index], showCount: count })),
    busiestMonth: showCount ? MONTHS[busiestMonth] : ""
  };
}

/**
 * The publish gate. Returns the reasons a story must not be written; empty
 * means it may be drafted.
 */
export function storyGate(figures, now) {
  const reasons = [];
  if (figures.showCount < STORY_GATE.minShows) reasons.push(`only ${figures.showCount} shows (needs ${STORY_GATE.minShows})`);
  if (figures.artistCount < STORY_GATE.minArtists) reasons.push(`only ${figures.artistCount} artists (needs ${STORY_GATE.minArtists})`);
  if (figures.countryCount < STORY_GATE.minCountries) reasons.push(`only ${figures.countryCount} countries (needs ${STORY_GATE.minCountries})`);
  const staleDays = figures.latestVerified ? Math.floor((now - Date.parse(`${figures.latestVerified}T00:00:00Z`)) / 86400000) : Infinity;
  if (staleDays > STORY_GATE.maxStaleDays) reasons.push(`newest recheck is ${figures.latestVerified || "missing"} (older than ${STORY_GATE.maxStaleDays} days)`);
  if (figures.topCities.length < 3 || figures.topVenues.length < 3) reasons.push("fewer than three cities or venues clear the ranking floor");
  return reasons;
}

function number(value) {
  return Number(value).toLocaleString("en-GB");
}

function percent(part, whole) {
  return whole ? Math.round((part / whole) * 100) : 0;
}

// "The United States", "the Netherlands"; other names take no article.
function countryName(name, sentenceStart = false) {
  if (!/^(United |Netherlands$|Philippines$|Czech Republic$)/.test(name)) return name;
  return `${sentenceStart ? "The" : "the"} ${name}`;
}

function linked(row) {
  return row.path ? `[${row.label}](${row.path})` : row.label;
}

function longDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function tourMapSlug(year) {
  return `${TOUR_MAP_SLUG_PREFIX}-${year}`;
}

/**
 * The blog post (Markdown with front matter). `existing` keeps the first
 * publication date and status of an earlier version, so a monthly refresh
 * updates one URL instead of starting a new one, and a published story stays
 * published only because a person published it.
 */
export function renderTourMapPost(figures, existing = null) {
  const { year } = figures;
  const [city1, city2, city3] = figures.topCities;
  const [venue1] = figures.topVenues;
  const [country1] = figures.topCountries;
  const date = existing?.date || figures.asOf;
  const status = existing?.status === "published" ? "published" : "draft";
  const updated = date !== figures.asOf ? figures.asOf : "";

  const cityRows = figures.topCities
    .map((row, index) => `| ${index + 1} | ${linked(row)} | ${row.country} | ${row.showCount} | ${row.artistCount} |`)
    .join("\n");
  const venueRows = figures.topVenues
    .map((row, index) => `| ${index + 1} | ${linked(row)} | ${row.city} | ${row.showCount} | ${row.artistCount} |`)
    .join("\n");
  const countryRows = figures.topCountries
    .map((row) => `| ${row.label} | ${number(row.showCount)} | ${percent(row.showCount, figures.showCount)}% |`)
    .join("\n");
  const monthRows = figures.months
    .filter((row) => row.showCount > 0)
    .map((row) => `| ${row.month} | ${row.showCount} |`)
    .join("\n");
  const artistList = figures.topArtists.map((row) => `[${row.label}](${row.path}) (${row.showCount})`).join(", ");

  const title = `Where the big concert tours are playing in ${year}`;
  const description = `${city1.label}, ${city2.label} and ${city3.label} have the most ${year} dates among ${number(figures.artistCount)} major tours tracked by TourTicketCompare. Counts by city, venue and month.`;
  const summary = `${number(figures.showCount)} upcoming ${year} dates from ${number(figures.artistCount)} major touring artists, counted by city, venue, country and month. ${city1.label} leads with ${city1.showCount} dates. Figures as of ${longDate(figures.asOf)}.`;

  const front = [
    "---",
    `title: "${title}"`,
    `seo_title: "${year} concert tours: the busiest cities"`,
    `description: "${description.replace(/"/g, "'")}"`,
    `summary: "${summary.replace(/"/g, "'")}"`,
    `date: ${date}`,
    ...(updated ? [`updated: ${updated}`] : []),
    `status: ${status}`,
    "tags:",
    "  - tour-data",
    "related_artists:",
    ...figures.topArtists.slice(0, 3).map((row) => `  - ${row.slug}`),
    "---"
  ].join("\n");

  const body = `TourTicketCompare tracks the upcoming dates of ${number(figures.artistCount)} major touring artists, and as of ${longDate(figures.asOf)} ${number(figures.showCount)} of those dates fall in ${year}. They are spread over ${number(figures.cityCount)} cities and ${number(figures.venueCount)} venues in ${figures.countryCount} countries. ${city1.label} has the most, with ${city1.showCount} dates from ${city1.artistCount} artists, followed by ${city2.label} (${city2.showCount}) and ${city3.label} (${city3.showCount}).

These are counts of announced shows on the tours the site follows, not of every concert in ${year}. Each one is a date with a checked Ticketmaster event behind it, and each is still listed on its artist's page on this site.

## The busiest cities in ${year}

| Rank | City | Country | Dates | Artists |
|---|---|---|---|---|
${cityRows}

A city counts its metro area, so a stadium Ticketmaster files under a suburb is counted with the city it serves.

## The busiest venues

| Rank | Venue | City | Dates | Artists |
|---|---|---|---|---|
${venueRows}

${venue1.label} in ${venue1.city} has the most dates of any single venue, ${venue1.showCount} from ${venue1.artistCount} ${venue1.artistCount === 1 ? "artist" : "artists"}. A residency puts many nights in one building, which is why one venue can outrank whole cities.

## Countries

| Country | Dates | Share of ${year} dates |
|---|---|---|
${countryRows}

${countryName(country1.label, true)} accounts for ${percent(country1.showCount, figures.showCount)}% of the tracked ${year} dates. Countries with fewer than ${STORY_GATE.minRankedShows} dates are counted in the totals but not listed.

## Month by month

| Month | Dates |
|---|---|
${monthRows}

${figures.busiestMonth} is the busiest month so far. Later months fill in as more tours announce, so these totals change with each update of this page.

## The artists with the most ${year} dates

${artistList}.${year === TOURS_HUB_YEAR ? ` The full list of artists touring in ${year} is on the [${year} tours page](${TOURS_HUB_PATH}).` : ""}

## How these numbers are counted

- **What counts:** an announced ${year} show by an artist whose page is live on TourTicketCompare, matched to an exact Ticketmaster event and not cancelled or postponed. The date is the venue's local date.
- **What doesn't:** shows by artists the site doesn't track, and dates that have already happened.
- **Freshness:** event records are rechecked automatically. The newest recheck in this data set is ${longDate(figures.latestVerified)}.
- **Prices:** this page has no prices. Ticket prices change constantly and are shown, with the time they were captured, on each artist's page.

If you're writing about this, the [press page](/press) has background on the site. To buy for one of these shows, start on the artist's page, which links the official sale and any checked resale listings for each date.
`;

  return `${front}\n\n${body}`;
}

/**
 * The press-release draft. Quote-free (a quote would need a real person to
 * say it), never sent by automation, and every figure is one the post shows.
 */
export function renderTourMapPressRelease(figures) {
  const { year } = figures;
  const [city1, city2, city3] = figures.topCities;
  const [venue1] = figures.topVenues;
  const [country1] = figures.topCountries;
  const url = `${SITE}/blog/${tourMapSlug(year)}`;
  return `# DRAFT PRESS RELEASE — not sent. Needs owner review before any use.

**For immediate release, ${longDate(figures.asOf)}**

## ${city1.label} leads ${year} dates on ${number(figures.artistCount)} tracked major tours, ahead of ${city2.label} and ${city3.label}

${city1.label} has more ${year} dates than any other city across ${number(figures.artistCount)} major tours tracked by TourTicketCompare, an independent concert ticket research site. ${city1.label} has ${city1.showCount} dates from ${city1.artistCount} artists, ${city2.label} ${city2.showCount} and ${city3.label} ${city3.showCount}.

Key figures (as of ${longDate(figures.asOf)}):

- ${number(figures.showCount)} announced ${year} dates across ${number(figures.cityCount)} cities and ${figures.countryCount} countries.
- ${venue1.label} in ${venue1.city} has the most dates of any venue: ${venue1.showCount}.
- ${countryName(country1.label, true)} hosts ${percent(country1.showCount, figures.showCount)}% of the dates.
- ${figures.busiestMonth} is the busiest month announced so far.

Full tables by city, venue, country and month: ${url}

**Method.** Counts cover announced ${year} shows by the artists TourTicketCompare tracks, each matched to an exact Ticketmaster event and not cancelled or postponed, by the venue's local date. They are not a count of every concert in ${year}. Data is rechecked automatically; the newest recheck in this set is ${longDate(figures.latestVerified)}.

**About TourTicketCompare.** TourTicketCompare (tourticketcompare.com) is a free, independent site that shows, for each date on a major tour, which ticket sites list it, with links checked against the exact show. Some links earn a commission. Press resources: ${SITE}/press

**Contact:** see ${SITE}/contact
`;
}

// ---------------------------------------------------------------------------
// Price moves story
// ---------------------------------------------------------------------------
//
// How many upcoming dates each ticket site now lists lower, higher or about
// the same as it did about 30 days earlier. Counts only: no price figure is
// printed, and every comparison is one event on one site in one currency
// (PROVIDER_DATA_POLICY.md, "A recorded price move is historical"). Sites are
// never compared with each other or ranked, and nothing here says what prices
// will do next: that is the price-timing claim, which still lacks evidence.

// Sites with an approved numeric listed-price lane. SeatGeek has no snapshot
// lane and Ticket Liquidator has display off, so neither can appear.
export const PRICE_MOVE_SITES = new Map([
  ["vivid-seats", "Vivid Seats"],
  ["ticketnetwork", "TicketNetwork"],
  ["stubhub-international", "StubHub International"]
]);

// A change inside this band reads as "about the same", so rounding and fee
// noise never count as a move.
export const PRICE_MOVE_BAND = 0.02;

export const PRICE_MOVE_GATE = {
  minDatesPerSite: 50,
  minArtistsPerSite: 10,
  minDatesPerArtistRow: 5,
  // The latest reading must be this recent, and the earlier one 25-35 days older.
  maxLatestAgeDays: 3,
  windowDays: [25, 35]
};

export const PRICE_MOVES_SLUG = "how-resale-ticket-prices-moved-this-month";

// One row per event and site: the daily rollup's closing figure about 30 days
// ago and its newest one. Read through `wrangler d1 execute --command` (see
// scripts/lib/d1-read.mjs); `?1` is the as-of date.
export const PRICE_MOVES_SQL = `WITH b AS (SELECT event_id, artist_slug, provider, currency, MIN(observed_date) d FROM provider_pricing_daily WHERE observed_date BETWEEN date('{AS_OF}','-31 day') AND date('{AS_OF}','-29 day') GROUP BY event_id, provider, currency),
bp AS (SELECT b.event_id, b.artist_slug, b.provider, b.currency, b.d, p.low_price_last price FROM b JOIN provider_pricing_daily p ON p.event_id=b.event_id AND p.provider=b.provider AND p.currency=b.currency AND p.observed_date=b.d),
l AS (SELECT event_id, provider, currency, MAX(observed_date) d FROM provider_pricing_daily WHERE observed_date >= date('{AS_OF}','-2 day') GROUP BY event_id, provider, currency),
lp AS (SELECT l.event_id, l.provider, l.currency, l.d, p.low_price_last price FROM l JOIN provider_pricing_daily p ON p.event_id=l.event_id AND p.provider=l.provider AND p.currency=l.currency AND p.observed_date=l.d)
SELECT bp.artist_slug, bp.provider, bp.event_id, bp.currency, bp.d base_date, MIN(bp.price) base_price, lp.d latest_date, MIN(lp.price) latest_price FROM bp JOIN lp ON lp.event_id=bp.event_id AND lp.provider=bp.provider AND lp.currency=bp.currency GROUP BY bp.event_id, bp.provider, bp.currency`;

export function priceMovesSql(asOf) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(asOf))) throw new Error(`priceMovesSql: bad as-of date "${asOf}"`);
  return PRICE_MOVES_SQL.replaceAll("{AS_OF}", asOf);
}

function dayDiff(a, b) {
  return Math.round((Date.parse(`${a}T00:00:00Z`) - Date.parse(`${b}T00:00:00Z`)) / 86400000);
}

/**
 * Count moves per site and per artist on each site.
 *
 * A row counts when its site has a price lane, its event is still in
 * events.json, upcoming, not cancelled or postponed, by an artist whose page is
 * indexable, both figures are plausible prices in one currency, and the two
 * readings are 25-35 days apart with the newer one recent.
 *
 * @param {any[]} rows PRICE_MOVES_SQL rows.
 * @param {any[]} events events.json records.
 * @param {any[]} artists artists.json records.
 * @param {{ now: number }} options
 */
export function buildPriceMoveFigures(rows, events, artists, { now }) {
  const asOf = isoDay(now);
  const eventList = Array.isArray(events) ? events : [];
  const byId = new Map(eventList.map((event) => [trimmed(event?.id), event]));
  const names = new Map((Array.isArray(artists) ? artists : []).map((artist) => [trimmed(artist?.slug), trimmed(artist?.name)]));
  const indexable = new Set(
    (Array.isArray(artists) ? artists : [])
      .filter((artist) => artist && artistPageIndexable(artist, eventList, trimmed(artist.slug), now))
      .map((artist) => trimmed(artist.slug))
  );

  const sites = new Map();
  let earliest = "";
  let latest = "";
  for (const row of Array.isArray(rows) ? rows : []) {
    const site = trimmed(row?.provider);
    if (!PRICE_MOVE_SITES.has(site)) continue;
    const event = byId.get(trimmed(row?.event_id));
    if (!event || eventLifecycleHeld(event) || !isUpcomingShow(event, now)) continue;
    const artistSlug = trimmed(event.artist_slug);
    if (!indexable.has(artistSlug) || artistSlug !== trimmed(row.artist_slug)) continue;
    const base = Number(row.base_price);
    const last = Number(row.latest_price);
    if (!(base >= 1) || !(last >= 1)) continue;
    const baseDate = trimmed(row.base_date);
    const latestDate = trimmed(row.latest_date);
    if (dayDiff(asOf, latestDate) > PRICE_MOVE_GATE.maxLatestAgeDays) continue;
    const span = dayDiff(latestDate, baseDate);
    if (!(span >= PRICE_MOVE_GATE.windowDays[0] && span <= PRICE_MOVE_GATE.windowDays[1])) continue;

    const move = last < base * (1 - PRICE_MOVE_BAND) ? "lower" : last > base * (1 + PRICE_MOVE_BAND) ? "higher" : "same";
    if (!sites.has(site)) sites.set(site, { site, label: PRICE_MOVE_SITES.get(site), lower: 0, higher: 0, same: 0, artists: new Map() });
    const tally = sites.get(site);
    tally[move] += 1;
    if (!tally.artists.has(artistSlug)) {
      tally.artists.set(artistSlug, { slug: artistSlug, label: names.get(artistSlug) || trimmed(event.artist_name) || artistSlug, path: `/artists/${artistSlug}`, lower: 0, higher: 0, same: 0 });
    }
    tally.artists.get(artistSlug)[move] += 1;
    if (!earliest || baseDate < earliest) earliest = baseDate;
    if (!latest || latestDate > latest) latest = latestDate;
  }

  const total = (row) => row.lower + row.higher + row.same;
  return {
    storyType: "price-moves",
    asOf,
    windowStart: earliest,
    windowEnd: latest,
    band: PRICE_MOVE_BAND,
    sites: [...sites.values()]
      .map((tally) => ({
        site: tally.site,
        label: tally.label,
        dates: total(tally),
        lower: tally.lower,
        higher: tally.higher,
        same: tally.same,
        artistCount: tally.artists.size,
        artists: [...tally.artists.values()]
          .filter((row) => total(row) >= PRICE_MOVE_GATE.minDatesPerArtistRow)
          .map((row) => ({ ...row, dates: total(row) }))
          .sort((a, b) => b.dates - a.dates || a.label.localeCompare(b.label))
          .slice(0, 8)
      }))
      // Fixed order, never by any count: the story does not rank sites.
      .sort((a, b) => [...PRICE_MOVE_SITES.keys()].indexOf(a.site) - [...PRICE_MOVE_SITES.keys()].indexOf(b.site))
  };
}

/** Sites that clear the gate; the story is written only when one does. */
export function priceMovesGate(figures) {
  const sites = figures.sites.filter(
    (site) => site.dates >= PRICE_MOVE_GATE.minDatesPerSite && site.artistCount >= PRICE_MOVE_GATE.minArtistsPerSite
  );
  return { sites, reasons: sites.length ? [] : ["no ticket site has enough upcoming dates with a reading about 30 days apart"] };
}

function shortDate(iso) {
  const [, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]}`;
}

export function renderPriceMovesPost(figures, existing = null) {
  const { sites } = priceMovesGate(figures);
  const date = existing?.date || figures.asOf;
  const status = existing?.status === "published" ? "published" : "draft";
  const updated = date !== figures.asOf ? figures.asOf : "";
  const window = `${shortDate(figures.windowStart)} and ${shortDate(figures.windowEnd)}`;
  const totalDates = sites.reduce((sum, site) => sum + site.dates, 0);
  const band = Math.round(figures.band * 100);

  const summaryRows = sites
    .map((site) => `| ${site.label} | ${site.dates} | ${site.lower} | ${site.higher} | ${site.same} |`)
    .join("\n");
  const siteSections = sites
    .map((site) => {
      const rows = site.artists.map((row) => `| [${row.label}](${row.path}) | ${row.dates} | ${row.lower} | ${row.higher} | ${row.same} |`).join("\n");
      const table = rows
        ? `\n\n| Artist | Dates | Lower | Higher | About the same |\n|---|---|---|---|---|\n${rows}\n\nArtists with fewer than ${PRICE_MOVE_GATE.minDatesPerArtistRow} dates on ${site.label} are counted above but not listed.`
        : "";
      return `## ${site.label}\n\n${site.label} had a reading for ${site.dates} upcoming dates across ${site.artistCount} artists at both ends of the period. On ${site.lower} of them its lowest listed price was lower than about 30 days earlier, on ${site.higher} it was higher, and on ${site.same} it was about the same.${table}`;
    })
    .join("\n\n");

  const front = [
    "---",
    `title: "How resale ticket prices moved in the last 30 days"`,
    `seo_title: "Resale ticket prices: 30-day moves"`,
    `description: "For ${totalDates} upcoming concert dates, how often each resale site's lowest listed price went down, up or stayed about the same between ${window}."`,
    `summary: "A count, site by site, of upcoming dates whose lowest listed resale price was lower, higher or about the same as 30 days earlier. Readings between ${window} ${figures.windowEnd.slice(0, 4)}."`,
    `date: ${date}`,
    ...(updated ? [`updated: ${updated}`] : []),
    `status: ${status}`,
    "tags:",
    "  - tour-data",
    "related_guides:",
    "  - primary-vs-resale-concert-tickets",
    "---"
  ].join("\n");

  const body = `TourTicketCompare records each resale site's lowest listed price for the upcoming dates it tracks, and keeps a daily record. This page compares, for each date and each site, the price at the start of the period with the price at the end, and counts which way it went. The period runs between ${window} ${figures.windowEnd.slice(0, 4)}.

| Site | Dates | Lower | Higher | About the same |
|---|---|---|---|---|
${summaryRows}

"About the same" means within ${band}% either way. Each count compares one date with itself on one site. Sites list different seats with different fees, so this page does not compare one site with another, and a count says nothing about which site is lower for a given show.

${siteSections}

## What this does and doesn't say

- **It is a record of the last 30 days, not a forecast.** A date that went down this month can go up next month. Whether prices tend to fall as a show gets closer is a different question, and TourTicketCompare doesn't have enough history yet to answer it reliably.
- **A listed price is not a checkout total.** Fees, delivery and seat location differ between listings and between sites.
- **No price figures here.** For the current price of any date, with the time it was captured, open the artist's page.

To buy for one of these shows, start on the artist's page, which links the official sale and any checked resale listings for each date.
`;
  return `${front}\n\n${body}`;
}

// ---------------------------------------------------------------------------
// Same tour, different city
// ---------------------------------------------------------------------------
//
// For the biggest tracked tours, one site's lowest listed price for the next
// date in each city, side by side. Every figure is a snapshot that passed the
// live display gate at build time: the CLI runs the shows through
// `attachApprovedMarketplacePrices` (functions/api/shows.js), the same gate a
// CTA button uses, and this module only reads the `status: "ok"` lanes it
// returns. Each figure keeps its site, currency and capture time
// (PROVIDER_DATA_POLICY.md, "Off-site use: social posts and press").
//
// What it never does: compare sites (one site is chosen per tour, by how many
// cities it prices, ties in fixed order), take a minimum across a city's dates
// (each city is its next date, as on the artist page's by-city list), convert
// currencies, or say anything about where prices are heading.

export const CITY_PRICE_SLUG = "same-tour-different-city-ticket-prices";

export const CITY_PRICE_GATE = {
  minCitiesPerTour: 8,
  minTours: 5,
  maxTours: 10,
  // A snapshot older than this is left out even if the display gate would show it.
  maxCaptureAgeHours: 72,
  tableRowsEachEnd: 3
};

const CITY_PRICE_SITE_BY_NAME = new Map([...PRICE_MOVE_SITES].map(([slug, name]) => [name, slug]));

/**
 * @param {any[]} pricedShows Upcoming shows after `attachApprovedMarketplacePrices`.
 * @param {any[]} events events.json records.
 * @param {any[]} artists artists.json records.
 * @param {{ now: number, priceGuideArtists?: Set<string> }} options
 */
export function buildCityPriceFigures(pricedShows, events, artists, { now, priceGuideArtists = new Set() }) {
  const eventList = Array.isArray(events) ? events : [];
  const artistList = Array.isArray(artists) ? artists : [];
  const names = new Map(artistList.map((artist) => [trimmed(artist?.slug), trimmed(artist?.name)]));
  const indexable = new Set(
    artistList.filter((artist) => artist && artistPageIndexable(artist, eventList, trimmed(artist.slug), now)).map((artist) => trimmed(artist.slug))
  );

  // showId -> site slug -> gated snapshot
  const lanes = new Map();
  for (const show of Array.isArray(pricedShows) ? pricedShows : []) {
    for (const lane of Array.isArray(show?.prices) ? show.prices : []) {
      const site = CITY_PRICE_SITE_BY_NAME.get(trimmed(lane?.provider));
      const price = Number(lane?.price);
      const captured = Date.parse(trimmed(lane?.fetchedAt));
      if (!site || lane.status !== "ok" || !(price > 0) || !trimmed(lane.currency)) continue;
      if (!Number.isFinite(captured) || now - captured > CITY_PRICE_GATE.maxCaptureAgeHours * 3600000) continue;
      const id = trimmed(show.id);
      if (!lanes.has(id)) lanes.set(id, new Map());
      lanes.get(id).set(site, { price, currency: trimmed(lane.currency).toUpperCase(), capturedAt: new Date(captured).toISOString() });
    }
  }

  const tours = new Map();
  for (const event of eventList) {
    const artistSlug = trimmed(event?.artist_slug);
    const tourName = trimmed(event?.tour_name);
    if (!tourName || !indexable.has(artistSlug)) continue;
    if (eventLifecycleHeld(event) || !isUpcomingShow(event, now)) continue;
    const key = `${artistSlug}|${tourName.toLowerCase()}`;
    if (!tours.has(key)) tours.set(key, { artistSlug, tourName, events: [] });
    tours.get(key).events.push(event);
  }

  const candidates = [];
  for (const tour of tours.values()) {
    const bySite = new Map();
    for (const city of deriveArtistCities(tour.events, tour.artistSlug, { now })) {
      const next = city.shows.find((show) => show.publishable);
      if (!next) continue;
      for (const [site, snap] of lanes.get(next.id) || []) {
        if (!bySite.has(site)) bySite.set(site, []);
        bySite.get(site).push({
          city: city.label,
          country: city.country,
          venue: next.venue,
          eventId: next.id,
          localDate: eventLocalDateIso({ datetime_iso: next.datetime_iso, timezone: next.timezone }),
          ...snap
        });
      }
    }
    // One market per tour: the site's most common currency, then the country
    // with the most cities. Overseas dates listed in dollars on a US site are
    // not like-for-like with home dates, so they are left out.
    const order = [...PRICE_MOVE_SITES.keys()];
    const filtered = [...bySite].map(([siteSlug, rows]) => {
      const currency = mostCommon(rows.map((row) => row.currency));
      const inCurrency = rows.filter((row) => row.currency === currency);
      const country = mostCommon(inCurrency.map((row) => row.country));
      return [siteSlug, currency, country, inCurrency.filter((row) => row.country === country)];
    });
    const [site, currency, country, rows] = filtered.sort((a, b) => b[3].length - a[3].length || order.indexOf(a[0]) - order.indexOf(b[0]))[0] || [];
    if (!site) continue;
    const cities = rows.sort((a, b) => a.price - b.price || a.city.localeCompare(b.city));
    if (cities.length < CITY_PRICE_GATE.minCitiesPerTour) continue;
    const low = cities[0];
    const high = cities.at(-1);
    candidates.push({
      artistSlug: tour.artistSlug,
      artist: names.get(tour.artistSlug) || trimmed(tour.events[0]?.artist_name) || tour.artistSlug,
      tourName: tour.tourName,
      path: priceGuideArtists.has(tour.artistSlug) ? `/artists/${tour.artistSlug}/ticket-prices` : `/artists/${tour.artistSlug}`,
      site,
      siteLabel: PRICE_MOVE_SITES.get(site),
      currency,
      country,
      cityCount: cities.length,
      low,
      high,
      ratio: Math.round((high.price / low.price) * 10) / 10,
      cities
    });
  }

  // Biggest tours first, one tour per artist.
  const seen = new Set();
  const featured = candidates
    .sort((a, b) => b.cityCount - a.cityCount || a.artist.localeCompare(b.artist))
    .filter((tour) => !seen.has(tour.artistSlug) && seen.add(tour.artistSlug))
    .slice(0, CITY_PRICE_GATE.maxTours);

  return {
    storyType: "city-prices",
    asOf: isoDay(now),
    tours: featured,
    // Compared on the raw prices, so 1.95 (shown as 2×) does not count as double.
    doubledCount: featured.filter((tour) => tour.high.price >= tour.low.price * 2).length
  };
}

function mostCommon(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) || 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])))[0][0];
}

export function cityPricesGate(figures) {
  return figures.tours.length >= CITY_PRICE_GATE.minTours
    ? []
    : [`only ${figures.tours.length} tours have ${CITY_PRICE_GATE.minCitiesPerTour}+ cities priced on one site (needs ${CITY_PRICE_GATE.minTours})`];
}

function money(price, currency) {
  return new Intl.NumberFormat("en", { style: "currency", currency, maximumFractionDigits: price % 1 === 0 ? 0 : 2 }).format(price);
}

function captured(iso) {
  return `${shortDate(iso.slice(0, 10))}, ${iso.slice(11, 16)} UTC`;
}

function cityRow(row, site) {
  return `| ${row.city} | ${row.localDate ? longDate(row.localDate) : ""} | ${row.venue} | ${money(row.price, row.currency)} | ${site} | ${captured(row.capturedAt)} |`;
}

export function renderCityPricesPost(figures, existing = null) {
  const date = existing?.date || figures.asOf;
  const status = existing?.status === "published" ? "published" : "draft";
  const updated = date !== figures.asOf ? figures.asOf : "";
  const { tours, doubledCount } = figures;
  const each = CITY_PRICE_GATE.tableRowsEachEnd;

  const summaryRows = tours
    .map((tour) => `| [${tour.artist}](${tour.path}) | ${tour.tourName} | ${tour.siteLabel} | ${tour.country} | ${tour.cityCount} | ${money(tour.low.price, tour.currency)} (${tour.low.city}) | ${money(tour.high.price, tour.currency)} (${tour.high.city}) | ${tour.ratio}× |`)
    .join("\n");

  const sections = tours
    .map((tour) => {
      const ends = tour.cities.length > each * 2 ? [...tour.cities.slice(0, each), ...tour.cities.slice(-each)] : tour.cities;
      const gap = tour.cities.length > each * 2 ? `\n\nThe ${tour.cities.length - each * 2} cities in between are on the [${tour.artist} page](${tour.path}).` : "";
      return `## ${tour.artist}: ${tour.tourName}

On ${tour.siteLabel}, the lowest listed price for the next date in each of ${tour.cityCount} cities in ${countryName(tour.country)} was ${money(tour.low.price, tour.currency)} in ${tour.low.city} at the low end and ${money(tour.high.price, tour.currency)} in ${tour.high.city} at the high end, ${tour.ratio} times as much.

| City | Next date | Venue | Lowest listed | Site | Captured |
|---|---|---|---|---|---|
${ends.map((row) => cityRow(row, tour.siteLabel)).join("\n")}${gap}`;
    })
    .join("\n\n");

  const front = [
    "---",
    `title: "Same tour, different city: how listed ticket prices vary"`,
    `seo_title: "Same tour, different city: ticket prices"`,
    `description: "For ${tours.length} big tours, one resale site's lowest listed price for the next date in each city. On ${doubledCount} of them the highest city was at least twice the lowest."`,
    `summary: "Lowest listed resale prices for the same tour in different cities, one site per tour, each figure with the time it was captured. Snapshots up to ${shortDate(figures.asOf)} ${figures.asOf.slice(0, 4)}."`,
    `date: ${date}`,
    ...(updated ? [`updated: ${updated}`] : []),
    `status: ${status}`,
    "tags:",
    "  - tour-data",
    "related_guides:",
    "  - primary-vs-resale-concert-tickets",
    "---"
  ].join("\n");

  const body = `The same tour can cost very different amounts depending on which city you see it in. TourTicketCompare records the lowest listed price on each resale site for the dates it tracks. This page takes the ${tours.length} tours with the most cities priced on a single site and puts those cities side by side.

On ${doubledCount} of the ${tours.length} tours, the next date in the highest-priced city was listed at two or more times the next date in the lowest.

| Artist | Tour | Site | Country | Cities | Lowest city | Highest city | Gap |
|---|---|---|---|---|---|---|---|
${summaryRows}

Each tour uses one site, the one with listed prices in the most of its cities, so cities are compared on the same site's listings. Sites are not compared with each other here. Each tour is compared within one country and one currency, and each city's figure is its next date only, not the lowest of all its dates.

${sections}

## What this does and doesn't say

- **These are listed prices, captured at the time shown.** Each is the lowest listed snapshot a site showed for that date when it was last checked, before fees, delivery and seat choice. Checkout totals are higher, and prices change through the day.
- **A city gap is not a forecast.** A city that's high today can drop, and a low one can rise. Nothing here says when to buy.
- **Only the tours TourTicketCompare tracks.** Cities outside the tour's main country, and cities whose next date had no recent listed price on that site, are left out.

For every date and every site, with the current price, open the artist's page.
`;
  return `${front}\n\n${body}`;
}

// The current snapshot for every price-lane event; the CLI applies the display
// gate (source, expiry, plausibility, flags, verified URL) to these rows.
export const CITY_PRICE_SQL = `SELECT event_id, provider, low_price, avg_price, high_price, currency, inventory_count, verified_at, expires_at, source FROM provider_pricing_cache WHERE provider IN ('vivid-seats', 'ticketnetwork', 'stubhub-international')`;
