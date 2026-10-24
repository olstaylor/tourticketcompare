// @ts-check
// Venue facts for the richer event-page pilot: what a ticket buyer needs to know
// at the door, each field carried from the venue's own published page.
//
// Reviewed data, not derived: every venue record names its source page and the
// day it was read, and every fact is a paraphrase of what that page says. A
// venue with no readable official page has no record (Madison Square Garden
// and Mohegan Sun Arena had none on 2026-10-23), and the renderer prints
// nothing for it. Rules change per event and per tour, so the page always
// tells the reader to check their own event's listing.
//
// Keyed by venueSlug(venue, city) from functions/_venues.js.

/**
 * @typedef {Object} VenueFacts
 * @property {string} venue     Display name.
 * @property {string} sourceUrl Official page the facts were read from.
 * @property {string} sourceNote Short note on the page, e.g. its own "last updated" date.
 * @property {string} checked   ISO date the page was read.
 * @property {string[]} facts   One sentence each.
 */

/** @type {Record<string, VenueFacts>} */
export const VENUE_FACTS = {
  "sphere-las-vegas": {
    venue: "Sphere",
    sourceUrl: "https://www.thesphere.com/faqs",
    sourceNote: "Sphere FAQs",
    checked: "2026-10-23",
    facts: [
      "Sphere is a “no bag” venue: large bags and backpacks are not allowed. Small clutches, purses and fanny packs up to about 6 x 6 x 2 in, diaper bags and bags needed for medical items are allowed, and all bags are screened.",
      "Sphere says it has no area to check bags, coats or other belongings.",
      "All exits are final: guests can't leave and come back in.",
      "Sphere is cashless and takes cards and mobile payment only.",
      "Every guest needs a ticket, whatever their age."
    ]
  },
  "scotiabank-arena-toronto": {
    venue: "Scotiabank Arena",
    sourceUrl: "https://www.scotiabankarena.com/plan-your-visit/bag-policy",
    sourceNote: "Scotiabank Arena bag policy page, which says it was last updated October 2022",
    checked: "2026-10-23",
    facts: [
      "Only small purses, clutches and fanny-pack bags smaller than 16.5 x 11.5 cm (6.5 x 4.5 in) are allowed, and the arena encourages fans to bring no bags at all.",
      "A larger bag needed for medical or other reasons may be let in after x-ray inspection, with x-ray at gates 1, 3 and 5.",
      "Bag check costs $25 for items that don't fit, in the galleria across from Gate 1.",
      "The arena says the policy can change from event to event."
    ]
  },
  "kia-center-orlando": {
    venue: "Kia Center",
    sourceUrl: "https://www.kiacenter.com/information/bag-policy",
    sourceNote: "Kia Center bag policy page",
    checked: "2026-10-23",
    facts: [
      "Bags are not allowed at Kia Center events, including purses, backpacks and duffel bags.",
      "One small clutch up to 4.5 x 6.5 x 1 in is allowed.",
      "Medical and parent bags up to 14 x 14 x 6 in are allowed after x-ray screening at designated entrances."
    ]
  },
  "schottenstein-center-columbus": {
    venue: "Schottenstein Center",
    sourceUrl: "https://schottensteincenter.com/a-z-guide",
    sourceNote: "Schottenstein Center A-Z guide",
    checked: "2026-10-23",
    facts: [
      "No bags or purses of any size are allowed. Wallets and wristlets up to 5 x 8 x 1 in are, and a separate screening lane is available for guests with medical, dietary or childcare needs.",
      "Depending on the event, doors typically open 60 to 90 minutes before the show start time.",
      "Guests may not leave and re-enter except in a personal emergency.",
      "The venue is cashless: parking, food and merchandise are paid by card or mobile payment.",
      "Guests of any age need a valid ticket, though for most concerts children under two sit on a lap without one."
    ]
  },
  "xfinity-mobile-arena-philadelphia": {
    venue: "Xfinity Mobile Arena",
    sourceUrl: "https://www.xfinitymobilearena.com/plan-your-visit/security-policy",
    sourceNote: "Xfinity Mobile Arena security policy page",
    checked: "2026-10-23",
    facts: [
      "Clutches, wristlets and small purses up to 4.5 x 6.5 in skip x-ray but are still inspected.",
      "Bags larger than that and smaller than 14 x 14 x 6 in are x-rayed at the Broad Street, 11th Street and Premium entrances. Backpacks, suitcases and large multi-compartment bags are restricted.",
      "Lockers for prohibited bags are on the 11th Street side, priced $5 to $15 by bag size, card only and subject to availability.",
      "There is no re-entry once your ticket has been scanned."
    ]
  },
  "amerant-bank-arena-sunrise": {
    venue: "Amerant Bank Arena",
    sourceUrl: "https://www.amerantbankarena.com/security-policies",
    sourceNote: "Amerant Bank Arena security policies page",
    checked: "2026-10-23",
    facts: [
      "Bags up to 12 x 12 in are allowed and clear bags are not required. Bags over 4 x 6 in go through x-ray screening.",
      "Coolers and hard-sided bags are not allowed. Diaper bags, breast pump bags and bags needed for medical purposes are allowed.",
      "Bags that are too big can go back to your vehicle or into the paid bag lockers at the bottom of the Publix Plaza stairs, in front of the main entrance.",
      "There is no re-entry after tickets are scanned."
    ]
  },
  "intuit-dome-inglewood": {
    venue: "Intuit Dome",
    sourceUrl: "https://intuitdome.com/about/a-z-guide",
    sourceNote: "Intuit Dome A-Z guide",
    checked: "2026-10-23",
    facts: [
      "Only personal clutches, clear bags included, up to 10 x 6 x 2 in are allowed. Medical and childcare bags up to 14 x 14 x 6 in are let in after screening.",
      "Tickets are good for one-time entry: fans can't leave and re-enter except in an emergency.",
      "Intuit Dome is cashless, and the venue asks fans to add a payment method in its app for concessions and retail.",
      "Children aged two and under don't need a ticket if they sit on an adult's lap, though some events set a different age policy."
    ]
  }
};

/**
 * @param {string} slug venueSlug(venue, city)
 * @returns {VenueFacts|null}
 */
export function venueFactsFor(slug) {
  return Object.prototype.hasOwnProperty.call(VENUE_FACTS, slug) ? VENUE_FACTS[slug] : null;
}
