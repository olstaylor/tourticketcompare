import assert from "node:assert/strict";
import { PRICE_DISCLOSURE_FIELDS, normalizePriceDisclosure, disclosureFromCacheRow } from "./lib/price-disclosure-fields.mjs";

const keys = Object.keys(PRICE_DISCLOSURE_FIELDS);
assert.deepEqual(keys, ["original_total_price", "displayed_total_price", "fees_included", "ticket_category", "section", "row", "seat", "price_ceiling", "inventory_at_price", "jurisdiction", "price_checked_at"]);

for (const input of [undefined, null, {}, "x", []]) {
  const out = normalizePriceDisclosure(input);
  assert.deepEqual(Object.keys(out), keys);
  assert.ok(Object.values(out).every((v) => v === null), "unknown stays null");
}

const full = normalizePriceDisclosure({ original_total_price: 90, displayed_total_price: 120.5, fees_included: false, ticket_category: " Floor ", section: "A", row: "12", seat: "7", price_ceiling: 300, inventory_at_price: 0, jurisdiction: "GB", price_checked_at: "2026-11-16T10:00:00Z" });
assert.equal(full.ticket_category, "Floor");
assert.equal(full.fees_included, false);
assert.equal(full.inventory_at_price, 0);

const bad = normalizePriceDisclosure({ original_total_price: "90", displayed_total_price: -1, fees_included: "yes", section: "  ", inventory_at_price: 1.5, price_checked_at: "nope" });
assert.ok(Object.values(bad).every((v) => v === null), "invalid values become null, never coerced");

const fromRow = disclosureFromCacheRow({ low_price: 55, inventory_count: 9, verified_at: "2026-11-16T10:00:00Z" });
assert.equal(fromRow.price_checked_at, "2026-11-16T10:00:00Z");
assert.equal(fromRow.displayed_total_price, null);
assert.equal(fromRow.inventory_at_price, null);

console.log("price-disclosure-fields tests passed");
