import assert from "node:assert/strict";
import { normalizeObservation, toMinor } from "./core.mjs";
import { extractTicketmasterPrice } from "./providers/ticketmaster.mjs";
import { extractSeatGeekPrice } from "./providers/seatgeek.mjs";

const event = { id: "event-1", ticketmaster_url: "https://www.ticketmaster.com/event/1", seatgeek_url: "https://seatgeek.com/a/concert/1" };
assert.equal(toMinor("12.34", "USD"), 1234);
assert.equal(toMinor("-1", "USD"), null);
assert.equal(normalizeObservation({ eventId: "x", provider: "ticketmaster", currency: "USD", lowestPriceMinor: 1200, priceType: "displayed_from", includesFees: null, checkedAt: "2026-01-01T00:00:00Z", sourceUrl: "https://example.test/a", status: "available" }).lowestPriceMinor, 1200);
assert.equal(normalizeObservation({ eventId: "x", provider: "ticketmaster", currency: "USD", lowestPriceMinor: null, priceType: "displayed_from", includesFees: null, checkedAt: "2026-01-01T00:00:00Z", sourceUrl: "https://example.test/a", status: "available" }), null);
assert.equal(extractTicketmasterPrice("Tickets from $45.50", event).lowestPriceMinor, 4550);
assert.equal(extractSeatGeekPrice("Sold out", event).status, "sold_out");
console.log("pricing self-test passed");
