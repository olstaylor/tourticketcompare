#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { attachApprovedMarketplacePrices } from "../functions/api/shows.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const show = {
  id: "show-1",
  artist_slug: "artist-one",
  verification_status: "human_verified",
  ticketmaster_url: "https://www.ticketmaster.com/artist-one/event/1234ABCD",
  seatgeek_url: "https://seatgeek.com/artist-one-tickets/london/concert/12345678",
  links: {
    ticketmaster: "https://www.ticketmaster.com/artist-one/event/1234ABCD",
    seatgeek: "https://seatgeek.com/artist-one-tickets/london/concert/12345678"
  },
  provider_links: {
    ticketmaster: { verified: true },
    seatgeek: { verified: true }
  }
};

function fakeDb(rows) {
  return {
    prepare(sql) {
      return {
        bind() {
          return {
            async all() {
              if (!sql.includes("provider_pricing_cache")) return { results: [] };
              return { results: rows };
            }
          };
        }
      };
    }
  };
}

const verifiedAt = new Date().toISOString();
const expiresAt = "2099-01-01T00:00:00.000Z";
const rows = [
  {
    event_id: "show-1", provider: "ticketmaster", low_price: 44, currency: "GBP",
    verified_at: verifiedAt, expires_at: expiresAt, source: "ticketmaster_authorized_event_page",
    source_url: show.ticketmaster_url
  },
  {
    event_id: "show-1", provider: "seatgeek", low_price: 55, currency: "GBP",
    verified_at: verifiedAt, expires_at: expiresAt, source: "seatgeek_authorized_event_page",
    source_url: show.seatgeek_url
  }
];

const env = {
  DEMAND_DB: fakeDb(rows),
  TICKETMASTER_PRICE_DISPLAY_ENABLED: "true",
  SEATGEEK_PRICE_DISPLAY_ENABLED: "true",
  IMPACT_SEATGEEK_BASE_TRACKING_URL: "https://seatgeek.sjv.io/c/approved"
};
const [priced] = await attachApprovedMarketplacePrices([show], env);
const ticketmaster = priced.prices.find((price) => price.provider === "Ticketmaster");
const seatgeek = priced.prices.find((price) => price.provider === "SeatGeek");
assert.equal(ticketmaster.status, "ok");
assert.equal(ticketmaster.price, 44);
assert.equal(ticketmaster.sourceUrl, show.ticketmaster_url);
assert.match(ticketmaster.actionUrl, /^\/api\/out\?/);
assert.equal(seatgeek.status, "ok");
assert.equal(seatgeek.price, 55);
assert.equal(seatgeek.sourceUrl, show.seatgeek_url);
assert.match(seatgeek.actionUrl, /^\/api\/out\?/);

const mismatchedRows = rows.map((row) => row.provider === "ticketmaster"
  ? { ...row, source_url: "https://www.ticketmaster.com/unrelated/event/OTHER" }
  : row);
const [mismatched] = await attachApprovedMarketplacePrices([show], { ...env, DEMAND_DB: fakeDb(mismatchedRows) });
assert.notEqual(mismatched.prices.find((price) => price.provider === "Ticketmaster").status, "ok");

const [noSeatGeekAffiliateLink] = await attachApprovedMarketplacePrices([show], {
  ...env,
  IMPACT_SEATGEEK_BASE_TRACKING_URL: "",
  DEMAND_DB: fakeDb(rows)
});
assert.equal(noSeatGeekAffiliateLink.prices.find((price) => price.provider === "SeatGeek").price, null, "SeatGeek page prices must not display without the required affiliate event route");
const [zeroPagePrice] = await attachApprovedMarketplacePrices([show], {
  ...env,
  DEMAND_DB: fakeDb(rows.map((row) => row.provider === "ticketmaster" ? { ...row, low_price: 0 } : row))
});
assert.equal(zeroPagePrice.prices.find((price) => price.provider === "Ticketmaster").price, null, "page-derived prices must be strictly positive");
const [malformedCurrency] = await attachApprovedMarketplacePrices([show], {
  ...env,
  DEMAND_DB: fakeDb(rows.map((row) => row.provider === "ticketmaster" ? { ...row, currency: "dollars" } : row))
});
assert.equal(malformedCurrency.prices.find((price) => price.provider === "Ticketmaster").price, null, "page-derived prices must use an ISO currency code");

const appSource = await fs.readFile(path.join(repoRoot, "public", "app.js"), "utf8");
const gateStart = appSource.indexOf("const PUBLISHABLE_VERIFICATION_STATUSES");
const gateEnd = appSource.indexOf("function approvedVividSeatsPriceLane", gateStart);
assert.ok(gateStart >= 0 && gateEnd > gateStart, "client price gates must remain extractable for offline verification");
const gateContext = { URL, Intl, Date, IMPACT_MARKETPLACE_PROVIDERS: [] };
vm.runInNewContext(`${appSource.slice(gateStart, gateEnd)}\n` +
  `globalThis.result = {\n` +
  ` ticketmaster: approvedTicketmasterPriceLane(globalThis.show),\n` +
  ` seatgeek: approvedSeatGeekPriceLane(globalThis.show),\n` +
  ` wrongTicketmaster: approvedTicketmasterPriceLane(globalThis.wrongTicketmaster),\n` +
  ` wrongSeatGeek: approvedSeatGeekPriceLane(globalThis.wrongSeatGeek)\n` +
  `};`, Object.assign(gateContext, {
  show: { ...show, prices: priced.prices },
  wrongTicketmaster: {
    ...show,
    prices: priced.prices.map((lane) => lane.provider === "Ticketmaster"
      ? { ...lane, sourceUrl: "https://www.ticketmaster.com/unrelated/event/OTHER" }
      : lane)
  },
  wrongSeatGeek: {
    ...show,
    prices: priced.prices.map((lane) => lane.provider === "SeatGeek"
      ? { ...lane, sourceUrl: "https://seatgeek.com/unrelated/concert/99999999" }
      : lane)
  }
}));
assert.ok(gateContext.result.ticketmaster, "client renderer gate should accept the exact fresh Ticketmaster page row");
assert.ok(gateContext.result.seatgeek, "client renderer gate should accept the exact fresh SeatGeek page row");
assert.equal(gateContext.result.wrongTicketmaster, null, "client renderer gate must reject a mismatched Ticketmaster source URL");
assert.equal(gateContext.result.wrongSeatGeek, null, "client renderer gate must reject a mismatched SeatGeek source URL");

const ssrSource = await fs.readFile(path.join(repoRoot, "functions", "[[path]].js"), "utf8");
assert.match(ssrSource, /approvedServerPriceLane\(show, "Ticketmaster"\)/, "server renderer should read the approved Ticketmaster cache lane");
assert.match(ssrSource, /Ticketmaster price snapshot as of .*subject to availability, fees and change/, "server-rendered Ticketmaster prices should retain the required qualification");

console.log("Authorized page-price runtime self-test passed (19 checks).");
