#!/usr/bin/env node
import assert from "node:assert/strict";
import { GUIDE_BUY_PATHS, renderGuideBuyPath } from "../functions/[[path]].js";
import { normalizeCtaLocation } from "../functions/_funnel.js";

const soon = new Date(Date.now() + 10 * 86400000).toISOString();
const fresh = new Date().toISOString();
const later = new Date(Date.now() + 3600000).toISOString();
const lane = (provider, source, price, currency = "USD") => ({ provider, status: "ok", providerStatus: "ok", source, price, currency, fetchedAt: fresh, expiresAt: later });
const mkShow = (id, prices) => ({
  id, artist_slug: "test-artist", artist_name: "Test Artist", city: "New York", country: "US", venue: "Test Arena",
  datetime_iso: soon, dateTimeISO: soon, timezone: "America/New_York", publishable: true,
  seatgeek_url: "https://seatgeek.com/test-artist-tickets/new-york-new-york-test-arena-2030-11-19-7-pm/concert/1234567",
  vividseats_url: "https://www.vividseats.com/test-artist-tickets-test-arena-11-19-2030--concerts/production/9876543",
  provider_links: { seatgeek: { verified: true }, "vivid-seats": { verified: true } }, prices
});
const artist = { slug: "test-artist", name: "Test Artist" };
const availability = { seatGeekAvailable: true, vividSeatsAvailable: true, marketplaceAvailability: {} };
const route = { path: "/guides/seatgeek-vs-ticketmaster" };

assert.equal(GUIDE_BUY_PATHS.size, 3);
assert(normalizeCtaLocation("guide_answer") === "guide_answer", "guide_answer must be in the CTA allowlist");
assert.equal(renderGuideBuyPath({ path: "/guides/seatgeek-vs-stubhub" }, [], availability), "", "other guides untouched");

const two = mkShow("a", [lane("SeatGeek", "seatgeek_partner_api", 120), lane("Vivid Seats", "vividseats_impact_marketplace_api", 135)]);
const one = mkShow("b", [lane("SeatGeek", "seatgeek_partner_api", 120)]);
const mixed = mkShow("c", [lane("SeatGeek", "seatgeek_partner_api", 120, "USD"), lane("Vivid Seats", "vividseats_impact_marketplace_api", 100, "GBP")]);
const html = renderGuideBuyPath(route, [{ artist, show: one }, { artist, show: mixed }, { artist, show: two }], availability);
assert.match(html, /guide-buy-path/);
assert.match(html, /ctaLocation=guide_answer/);
assert.match(html, /href="\/compare-concert-ticket-prices"/);
assert.equal((html.match(/guideBuy\d/g) || []).length >= 1, true);
assert.doesNotMatch(html, /showId=b\b|showId=c\b|id=b&|id=c&/, "single-seller and mixed-currency dates are skipped");
assert.equal(renderGuideBuyPath(route, [{ artist, show: one }], availability), "", "nothing rendered without two priced sellers");
console.log("guide-buy-path tests passed");
