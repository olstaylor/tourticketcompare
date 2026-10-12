import assert from "node:assert/strict";
import { hasSchemaProperty } from "./lib/schema-properties.mjs";

const forbidden = /offer|price|availability|inventory/i;
for (const name of ["Rod Stewart - Premium Priced Seats", "Rod Stewart - Premium Priced Seating", "Special Offers", "Availability Tour"]) {
  assert.equal(hasSchemaProperty({ "@type": "MusicEvent", name, url: "https://www.ticketmaster.ie/premium-priced-seats/event/18006539DDB1281D" }, forbidden), false, name);
}
for (const field of ["offers", "price", "priceCurrency", "priceSpecification", "lowPrice", "highPrice", "availability", "inventoryLevel"]) {
  assert.equal(hasSchemaProperty({ "@type": "MusicEvent", [field]: null }, forbidden), true, field);
  assert.equal(hasSchemaProperty({ "@type": "MusicEvent", location: [{ [field]: "value" }] }, forbidden), true, `nested ${field}`);
}
for (const type of ["Offer", "AggregateOffer", "https://schema.org/Offer", "schema:UnitPriceSpecification"]) {
  assert.equal(hasSchemaProperty({ subject: { "@type": ["Thing", type] } }, forbidden), true, type);
}
assert.equal(hasSchemaProperty({ offers: [{ "@type": "Offer", price: 12, priceCurrency: "GBP" }] }, /availability|inventory/i), false, "approved Offers remain permitted by the inventory-only gate");
assert.equal(hasSchemaProperty({ offers: [{ availability: "https://schema.org/InStock" }] }, /availability|inventory/i), true, "availability remains prohibited even inside an approved Offer");
assert.equal(hasSchemaProperty(null, forbidden), false);
console.log("Schema property guard passed: ordinary names/URLs accepted; direct, nested and typed commercial schema rejected.");
