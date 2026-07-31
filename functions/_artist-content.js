// @ts-check
// Reusable, typed, data-driven content model for the main artist pages.
//
// This module is the single source of truth for the *derived* editorial
// content on an artist page — the data-grounded introduction, the tour-status
// summary, tour groupings, the consolidated ticket/price help, the FAQ, and
// the empty-board copy. It is pure and returns plain data only (no HTML, no
// DOM, no provider secrets), so the server renderer in functions/[[path]].js
// can turn it into escaped markup. Because artist pages are always
// server-rendered first and public/app.js transplants that markup unchanged
// during hydration, this content is derived exactly once per request.
//
// Hard rule: everything here is composed only from already-verified facts
// carried on publishable event records (tour name, city, country, venue, date)
// plus the per-show CTA/snapshot annotations the renderer computes from the
// same gates it uses to draw the buttons. Nothing invents tours, dates,
// venues, prices, availability, demand, popularity, or ranking claims, and no
// sentence here would read identically on every artist page.

/**
 * @typedef {Object} ArtistContentShow
 * @property {string} [id]
 * @property {string} [tour_name]   Tour label carried on the event record (may be blank).
 * @property {string} [city]        City for the show.
 * @property {string} [country]     Country for the show.
 * @property {string} [venue]       Venue for the show.
 * @property {string} [dateTimeISO] ISO datetime for the show.
 * @property {string} [timezone]    IANA zone of the venue.
 * @property {boolean} [publishable] Whether the event passes the publishable gate.
 * @property {number} [ctaProviderCount] Providers whose CTA actually renders on this card.
 */

/**
 * @typedef {Object} TourSummary
 * @property {string} name          Verbatim tour name from the event data.
 * @property {number} showCount     Number of upcoming publishable shows on the tour.
 * @property {number} cityCount     Number of distinct cities on the tour.
 * @property {string} startISO      Earliest upcoming show datetime (ISO).
 * @property {string} endISO        Latest upcoming show datetime (ISO).
 * @property {string} startTimezone IANA zone of the earliest show, for rendering
 *                                  startISO at the venue rather than in UTC.
 * @property {string} endTimezone   IANA zone of the latest show.
 * @property {string[]} sampleCities Up to four distinct cities, in date order.
 */

/**
 * @typedef {Object} VenueRun
 * @property {string} venue
 * @property {string} city
 * @property {number} count
 */

/**
 * @typedef {Object} ArtistBoardStatus
 * @property {number} showCount
 * @property {number} cityCount
 * @property {number} countryCount
 * @property {number} venueCount
 * @property {string[]} countries    Distinct countries, in date order.
 * @property {{iso: string, timezone: string, city: string, venue: string, country: string}|null} next
 * @property {{iso: string, timezone: string}|null} first
 * @property {{iso: string, timezone: string}|null} last
 * @property {VenueRun[]} multiNightRuns Venues with more than one tracked date, largest first.
 * @property {number} multiNightShowCount Shows that sit inside a multi-night run.
 * @property {number} showsWithCta   Shows rendering at least one provider button.
 * @property {number} showsWithoutCta
 * @property {boolean} providerCoverageVaries True when the per-date provider count is not uniform.
 * @property {number} maxProviderCount
 *
 * Deliberately absent: a count of dates carrying a listed-price snapshot. The
 * server attaches cached price rows to only the first few upcoming shows of a
 * board (see the price-candidate cap in functions/[[path]].js), so any
 * board-wide snapshot count derived here would be a truncated sample presented
 * as a fact — and the client then hydrates snapshots across the whole board, so
 * the page would visibly contradict its own summary. Snapshots are disclosed
 * per date, on the button that carries one, where the count is always right.
 */

const EMPTY_STATUS = /** @type {ArtistBoardStatus} */ ({
  showCount: 0,
  cityCount: 0,
  countryCount: 0,
  venueCount: 0,
  countries: [],
  next: null,
  first: null,
  last: null,
  multiNightRuns: [],
  multiNightShowCount: 0,
  showsWithCta: 0,
  showsWithoutCta: 0,
  providerCoverageVaries: false,
  maxProviderCount: 0
});

function cleanString(value) {
  return String(value ?? "").trim();
}

function sortedByDate(shows) {
  return (Array.isArray(shows) ? shows : [])
    .filter((show) => show && cleanString(show.dateTimeISO) && Number.isFinite(Date.parse(show.dateTimeISO)))
    .slice()
    .sort((a, b) => Date.parse(a.dateTimeISO) - Date.parse(b.dateTimeISO));
}

/**
 * Reduce an artist's upcoming board to the countable facts the page is allowed
 * to talk about. Every field is a direct count or a verbatim value from the
 * rows being rendered — there is nothing here that a reader could not confirm
 * by scrolling the board.
 *
 * @param {ArtistContentShow[]} shows Upcoming shows, already enriched and annotated.
 * @returns {ArtistBoardStatus}
 */
export function deriveArtistBoardStatus(shows) {
  const ordered = sortedByDate(shows);
  if (!ordered.length) return { ...EMPTY_STATUS, countries: [], multiNightRuns: [] };

  const cities = [];
  const countries = [];
  const venues = [];
  const runCounts = new Map();
  let showsWithCta = 0;
  let maxProviderCount = 0;
  let minProviderCount = Infinity;

  for (const show of ordered) {
    const city = cleanString(show.city);
    const country = cleanString(show.country);
    const venue = cleanString(show.venue);
    if (city && !cities.includes(city)) cities.push(city);
    if (country && !countries.includes(country)) countries.push(country);
    if (venue && !venues.includes(`${venue}|${city}`)) venues.push(`${venue}|${city}`);
    if (venue && city) {
      const key = `${venue}|${city}`;
      runCounts.set(key, (runCounts.get(key) || 0) + 1);
    }
    const providerCount = Number.isFinite(show.ctaProviderCount) ? Number(show.ctaProviderCount) : 0;
    if (providerCount > 0) showsWithCta += 1;
    maxProviderCount = Math.max(maxProviderCount, providerCount);
    minProviderCount = Math.min(minProviderCount, providerCount);
  }

  const multiNightRuns = [...runCounts.entries()]
    .filter(([, count]) => count > 1)
    .map(([key, count]) => {
      const [venue, city] = key.split("|");
      return { venue, city, count };
    })
    .sort((a, b) => b.count - a.count || a.venue.localeCompare(b.venue));

  const firstShow = ordered[0];
  const lastShow = ordered[ordered.length - 1];

  return {
    showCount: ordered.length,
    cityCount: cities.length,
    countryCount: countries.length,
    venueCount: venues.length,
    countries,
    next: {
      iso: cleanString(firstShow.dateTimeISO),
      timezone: cleanString(firstShow.timezone),
      city: cleanString(firstShow.city),
      venue: cleanString(firstShow.venue),
      country: cleanString(firstShow.country)
    },
    first: { iso: cleanString(firstShow.dateTimeISO), timezone: cleanString(firstShow.timezone) },
    last: { iso: cleanString(lastShow.dateTimeISO), timezone: cleanString(lastShow.timezone) },
    multiNightRuns,
    multiNightShowCount: multiNightRuns.reduce((total, run) => total + run.count, 0),
    showsWithCta,
    showsWithoutCta: ordered.length - showsWithCta,
    providerCoverageVaries: minProviderCount !== maxProviderCount,
    maxProviderCount
  };
}

function plural(count, singular, pluralForm) {
  return `${count} ${count === 1 ? singular : pluralForm || `${singular}s`}`;
}

function joinList(values) {
  const list = values.filter(Boolean);
  if (list.length <= 1) return list[0] || "";
  if (list.length === 2) return `${list[0]} and ${list[1]}`;
  return `${list.slice(0, -1).join(", ")}, and ${list[list.length - 1]}`;
}

/**
 * The lead paragraph. Two or three short sentences, each one a statement of
 * something countable on this page: how many dates are tracked, where they
 * are, when the run starts and ends, and how link/price coverage varies across
 * the dates. The sentences a page gets depend on its own data, so no two
 * artist pages read the same, and nothing here is biography or atmosphere.
 *
 * @param {{ name?: string }} artist
 * @param {ArtistBoardStatus} status
 * @param {{ formatDate?: (iso: string, timezone: string) => string }} [options]
 * @returns {string}
 */
export function artistSearchIntro(artist, status, options = {}) {
  const name = cleanString(artist?.name) || "this artist";
  const formatDate = typeof options.formatDate === "function" ? options.formatDate : () => "";
  const formatShortDate = typeof options.formatShortDate === "function" ? options.formatShortDate : formatDate;
  if (!status || !status.showCount) {
    return `No verified upcoming ${name} dates are listed right now. A date appears here once we've checked the source record and followed the ticket link ourselves.`;
  }

  const sentences = [];

  if (status.showCount === 1) {
    const only = status.next;
    const label = formatDate(only?.iso, only?.timezone);
    const place = [only?.venue, only?.city].filter(Boolean).join(", ");
    sentences.push(
      `One upcoming ${name} date is verified${label ? `: ${label}` : ""}${place ? ` at ${place}` : ""}.`
    );
  } else {
    const spread = [];
    if (status.cityCount > 1) spread.push(plural(status.cityCount, "city", "cities"));
    if (status.countryCount > 1) spread.push(plural(status.countryCount, "country", "countries"));
    const startLabel = formatShortDate(status.first?.iso, status.first?.timezone);
    const endLabel = formatShortDate(status.last?.iso, status.last?.timezone);
    const range = startLabel && endLabel && startLabel !== endLabel ? `, ${startLabel} to ${endLabel}` : "";
    sentences.push(
      `We track ${plural(status.showCount, "upcoming " + name + " date")}${spread.length ? ` across ${joinList(spread)}` : ""}${range}.`
    );
  }

  if (status.multiNightRuns.length === 1) {
    const only = status.multiNightRuns[0];
    sentences.push(`${only.count} of them are nights at ${only.venue}, so check which night you're buying.`);
  } else if (status.multiNightRuns.length > 1) {
    sentences.push(
      `${status.multiNightRuns.length} of the venues host more than one night, so check the date on the card before you buy.`
    );
  }

  if (status.showsWithoutCta > 0 && status.showsWithCta > 0) {
    sentences.push(
      `${status.showsWithCta} of the ${status.showCount} have a checked ticket link; the rest are listed without one until we've followed where they lead.`
    );
  } else if (status.showsWithCta === 0) {
    sentences.push(
      status.showCount === 1
        ? `We have no checked ticket link for it yet, so the date is listed without a button.`
        : `None of them have a checked ticket link yet, so they are listed without buttons.`
    );
  } else if (status.providerCoverageVaries) {
    sentences.push(`Every date has at least one checked ticket link, though how many ticket sites cover a date varies.`);
  }

  return sentences.slice(0, 3).join(" ");
}

/**
 * The compact fact strip under the lead: the same countable facts as chips, so
 * the page answers "how many dates, where, when, and can I see a price" before
 * the reader has to scroll. Returns label/value pairs only.
 *
 * @param {ArtistBoardStatus} status
 * @param {{ formatDate?: (iso: string, timezone: string) => string }} [options]
 * @returns {{label: string, value: string}[]}
 */
export function artistStatusFacts(status, options = {}) {
  if (!status || !status.showCount) return [];
  const formatDate = typeof options.formatDate === "function" ? options.formatDate : () => "";
  const facts = [{ label: "Dates tracked", value: String(status.showCount) }];
  if (status.cityCount > 1) facts.push({ label: "Cities", value: String(status.cityCount) });
  if (status.countryCount > 1) facts.push({ label: "Countries", value: String(status.countryCount) });
  const nextLabel = formatDate(status.next?.iso, status.next?.timezone);
  if (nextLabel) {
    facts.push({
      label: status.showCount === 1 ? "Date" : "Next date",
      value: status.next?.city ? `${nextLabel}, ${status.next.city}` : nextLabel
    });
  }
  const lastLabel = formatDate(status.last?.iso, status.last?.timezone);
  if (lastLabel && lastLabel !== nextLabel) facts.push({ label: "Last date", value: lastLabel });
  facts.push({
    label: "Checked ticket links",
    value:
      status.showsWithoutCta > 0
        ? `${status.showsWithCta} of ${plural(status.showCount, "date")}`
        : status.showCount === 1
          ? "This date"
          : `All ${status.showCount} dates`
  });
  return facts;
}

/**
 * Group upcoming publishable shows into per-tour summaries. Shows without a
 * verified tour name, or that do not pass the publishable gate, are excluded.
 *
 * @param {ArtistContentShow[]} shows
 * @returns {TourSummary[]}
 */
export function deriveTourSummaries(shows) {
  const groups = new Map();
  for (const show of Array.isArray(shows) ? shows : []) {
    if (!show || show.publishable !== true) continue;
    const name = cleanString(show.tour_name);
    const iso = cleanString(show.dateTimeISO);
    if (!name || !iso || !Number.isFinite(Date.parse(iso))) continue;
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push({ city: cleanString(show.city), iso, timezone: cleanString(show.timezone) });
  }

  const summaries = [];
  for (const [name, entries] of groups) {
    entries.sort((a, b) => Date.parse(a.iso) - Date.parse(b.iso));
    const cities = [];
    for (const entry of entries) {
      if (entry.city && !cities.includes(entry.city)) cities.push(entry.city);
    }
    summaries.push({
      name,
      showCount: entries.length,
      cityCount: cities.length,
      startISO: entries[0].iso,
      endISO: entries[entries.length - 1].iso,
      startTimezone: entries[0].timezone,
      endTimezone: entries[entries.length - 1].timezone,
      sampleCities: cities.slice(0, 4)
    });
  }

  // Largest tours first, then alphabetically for a stable order.
  summaries.sort((a, b) => b.showCount - a.showCount || a.name.localeCompare(b.name));
  return summaries;
}

/**
 * The one shared help component. This replaces what used to be three separate
 * blocks of near-identical prose on every artist page ("Before you buy", "How
 * to buy <artist> tickets", "How ticket prices are shown here"). It is
 * deliberately universal and deliberately short: universal information belongs
 * in one component, and page copy is reserved for what is specific to this
 * artist's dates.
 *
 * @returns {{ intro: string, points: string[] }}
 */
export function artistTicketHelp() {
  return {
    intro:
      "We don't sell tickets. You buy on the ticket site the button opens.",
    points: [
      "A button on a date card opens that ticket site's page for that exact date. The buttons under \"Where to buy\" are different: they open the artist's page on a ticket site, not a specific date.",
      "A price on a button is a snapshot: one site's listed price for that one date, captured at the time shown next to it. Not live stock, and not your final total.",
      "Each site's price stands alone, with its own timestamp. We don't rank the sites or claim one is lower.",
      "Fees, delivery and tax are added at the provider's checkout — compare the total there, not the first number you see.",
      "A date-card button only appears once we've followed the link to that exact event. Where we haven't, the date is listed with no button rather than a guess."
    ]
  };
}

/**
 * Empty-board copy for an artist with no verified upcoming dates. States the
 * position plainly, explains what has to happen for a date to appear, and
 * stops there — an empty page is not the place for a ticket-buying course, and
 * nothing here hints that an announcement is coming.
 *
 * @param {{ name?: string }} artist
 * @param {{ pastShowCount?: number }} [options]
 * @returns {{ heading: string, body: string, next: string }}
 */
export function artistEmptyBoardCopy(artist, options = {}) {
  const name = cleanString(artist?.name) || "this artist";
  const pastShowCount = Number(options.pastShowCount) || 0;
  return {
    heading: "No upcoming dates listed",
    body: pastShowCount
      ? `We have no verified upcoming ${name} dates on file. The most recent dates we tracked have already taken place, and we can't say whether more are coming.`
      : `We have no verified upcoming ${name} dates on file, and we can't say whether more are coming.`,
    next: `When a date is confirmed by our source and we've followed the ticket link to that exact event, it appears on this page with the ticket sites that cover it.`
  };
}

/**
 * Visible FAQ entries, which are also the FAQPage JSON-LD source — the two can
 * never drift because there is only one list.
 *
 * The first entry is answered from this page's own data. The rest are taken
 * from the artist's authored FAQ in catalog.json, minus any entry the page now
 * answers in visible content (the "where do I find tour dates" and "what
 * prices can I see" questions are answered by the board and the shared help
 * component), which is what stops the FAQ from restating the page.
 *
 * @param {{ name?: string, faq?: {question: string, answer: string}[] }} artist
 * @param {ArtistBoardStatus} status
 * @param {{ formatDate?: (iso: string, timezone: string) => string }} [options]
 * @returns {[string, string][]}
 */
export function artistFaqEntries(artist, status, options = {}) {
  const name = cleanString(artist?.name) || "this artist";
  const formatDate = typeof options.formatDate === "function" ? options.formatDate : () => "";
  const entries = [];

  if (status && status.showCount) {
    const spread = [];
    if (status.cityCount > 1) spread.push(plural(status.cityCount, "city", "cities"));
    if (status.countryCount > 1) spread.push(plural(status.countryCount, "country", "countries"));
    const startLabel = formatDate(status.first?.iso, status.first?.timezone);
    const endLabel = formatDate(status.last?.iso, status.last?.timezone);
    const range =
      startLabel && endLabel && startLabel !== endLabel ? ` They run from ${startLabel} to ${endLabel}.` : "";
    const coverage =
      status.showsWithoutCta > 0
        ? status.showsWithCta > 0
          ? ` ${status.showsWithCta} of them currently have a checked ticket link.`
          : ` None of them have a checked ticket link yet.`
        : ` Each one has at least one checked ticket link.`;
    entries.push([
      `How many ${name} dates are listed on this page?`,
      `${plural(status.showCount, "upcoming date")}${spread.length ? `, across ${joinList(spread)}` : ""}.${range}${coverage} The list changes as dates pass and as new ones are verified.`
    ]);
  } else {
    entries.push([
      `Are there upcoming ${name} dates?`,
      `Not on this page. We have no verified upcoming ${name} dates on file, and we don't list a date until our source confirms it and we've followed the ticket link to that exact event.`
    ]);
  }

  // Questions the visible page now answers directly are dropped rather than
  // repeated in the FAQ.
  const SUPERSEDED = [/tour dates\?/i, /prices can i see/i, /prices shown here/i];
  const authored = Array.isArray(artist?.faq) ? artist.faq : [];
  for (const entry of authored) {
    if (!entry || typeof entry !== "object") continue;
    const question = cleanString(entry.question);
    const answer = cleanString(entry.answer);
    if (!question || !answer) continue;
    if (SUPERSEDED.some((rule) => rule.test(question))) continue;
    entries.push([question, answer]);
  }

  if (entries.length === 1) {
    entries.push([
      "Does TourTicketCompare sell tickets?",
      "No. We link out to ticket sites we've checked, and the sale, price, fees, delivery and refund terms are all theirs."
    ]);
  }
  return entries;
}

/**
 * Build the full derived content model for an artist page.
 *
 * @param {{ name?: string, faq?: {question: string, answer: string}[] }} artist
 * @param {ArtistContentShow[]} shows Upcoming shows for the artist (enriched + annotated).
 * @param {{ formatDate?: (iso: string, timezone: string) => string, pastShowCount?: number }} [options]
 */
export function buildArtistContentModel(artist, shows, options = {}) {
  const status = deriveArtistBoardStatus(shows);
  return {
    status,
    intro: artistSearchIntro(artist, status, options),
    facts: artistStatusFacts(status, options),
    tours: deriveTourSummaries(shows),
    help: artistTicketHelp(),
    emptyBoard: artistEmptyBoardCopy(artist, options),
    faq: artistFaqEntries(artist, status, options)
  };
}
