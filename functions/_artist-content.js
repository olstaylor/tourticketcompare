// @ts-check
// Reusable, typed, data-driven content model for the main artist pages.
//
// This module is the single source of truth for the *derived* editorial
// content on an artist page — the search-focused introduction, data-derived
// tour summaries, the ticket-buying guide, and the pricing explanation. It is
// pure and returns plain data only (no HTML, no DOM, no provider secrets), so
// the server renderer in functions/[[path]].js can turn it into escaped markup
// and the client hydration in public/app.js can transplant that rendered markup
// unchanged. Keeping the logic here means the content is derived once, from the
// same verified event data, and stays testable in isolation
// (scripts/artist-content.test.mjs).
//
// Hard rule: everything here is composed only from already-verified facts
// (artist name, and the tour name / city / date carried on publishable event
// records). Nothing invents tours, dates, venues, prices, availability, or
// ranking claims. Tours with a blank tour_name and non-publishable
// shows are excluded rather than guessed.

/**
 * @typedef {Object} ArtistContentShow
 * @property {string} [tour_name]   Tour label carried on the event record (may be blank).
 * @property {string} [city]        City for the show.
 * @property {string} [dateTimeISO] ISO datetime for the show.
 * @property {boolean} [publishable] Whether the event passes the publishable gate.
 */

/**
 * @typedef {Object} TourSummary
 * @property {string} name          Verbatim tour name from the event data.
 * @property {number} showCount     Number of upcoming publishable shows on the tour.
 * @property {number} cityCount     Number of distinct cities on the tour.
 * @property {string} startISO      Earliest upcoming show datetime (ISO).
 * @property {string} endISO        Latest upcoming show datetime (ISO).
 * @property {string[]} sampleCities Up to four distinct cities, in date order.
 */

/**
 * @typedef {Object} GuideContent
 * @property {string} intro
 * @property {string[]} steps
 */

/**
 * @typedef {Object} PricingContent
 * @property {string} intro
 * @property {string[]} points
 */

/**
 * @typedef {Object} ArtistContentModel
 * @property {string} intro         Search-focused lead paragraph.
 * @property {TourSummary[]} tours  Data-derived upcoming-tour summaries.
 * @property {GuideContent} buyingGuide
 * @property {PricingContent} pricing
 */

/**
 * Search-focused introduction for the artist page lead paragraph. Derived from
 * the artist name only so the server render and the client hydration can
 * produce identical text without sharing runtime state.
 *
 * IMPORTANT: keep the wording in sync with artistPageIntro() in public/app.js.
 * The smoke suite asserts both files carry the shared invariant phrase.
 *
 * @param {{ name?: string }} artist
 * @returns {string}
 */
export function artistSearchIntro(artist) {
  const name = String(artist?.name || "").trim() || "this artist";
  return `Every upcoming ${name} date we've confirmed, with the ticket links we've checked and what to look at before you pay.`;
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
    const name = String(show.tour_name || "").trim();
    const iso = String(show.dateTimeISO || "").trim();
    if (!name || !iso || !Number.isFinite(Date.parse(iso))) continue;
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push({ city: String(show.city || "").trim(), iso });
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
      sampleCities: cities.slice(0, 4)
    });
  }

  // Largest tours first, then alphabetically for a stable order.
  summaries.sort((a, b) => b.showCount - a.showCount || a.name.localeCompare(b.name));
  return summaries;
}

/**
 * Practical, provider-neutral ticket-buying guide. Static copy (no invented
 * facts or numbers), lightly personalised with the artist name.
 *
 * @param {{ name?: string }} artist
 * @returns {GuideContent}
 */
export function artistBuyingGuide(artist) {
  const name = String(artist?.name || "").trim() || "this artist";
  return {
    intro: `A quick run-through before you buy ${name} tickets. We don't sell them — we point you at links we've checked, and you buy on the provider's site.`,
    steps: [
      "Pick the exact date, city, and venue you want from the list above.",
      "Open a link for that show and find a section or standing area that fits your budget.",
      "Get to the checkout total — face value plus service, delivery, and tax — not the first number you see.",
      "Check when the tickets arrive and whether they can be transferred, so they reach you in time.",
      "Read the refund, resale, and cancellation terms before you pay."
    ]
  };
}

/**
 * Explanation of how price snapshots work on the site, written to hold up when
 * no snapshot is available (the safe fallback state). No numbers, no ranking,
 * no ranking language — snapshot framing only.
 *
 * @returns {PricingContent}
 */
export function artistPricingExplanation() {
  return {
    intro:
      "When a ticket site gives us a current listed price for one of these exact shows, we show it next to their link. Worth knowing what that number is.",
    points: [
      "It is a snapshot: one ticket site's listed price for that one show, captured at the time shown. Not live stock, and not your final total.",
      "A price only appears if it came from an approved source, matched that exact show, and is still recent. Otherwise you get the link with no price rather than a stale guess.",
      "Each site's price stands on its own, with its own timestamp. We do not rank the sites or claim any one of them is lower.",
      "Fees, taxes, delivery, and whether the seats still exist are all settled at the provider's checkout. Check the total there."
    ]
  };
}

/**
 * Build the full derived content model for an artist page.
 *
 * @param {{ name?: string }} artist
 * @param {ArtistContentShow[]} shows Upcoming shows for the artist (enriched).
 * @returns {ArtistContentModel}
 */
export function buildArtistContentModel(artist, shows) {
  return {
    intro: artistSearchIntro(artist),
    tours: deriveTourSummaries(shows),
    buyingGuide: artistBuyingGuide(artist),
    pricing: artistPricingExplanation()
  };
}
