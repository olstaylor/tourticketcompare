// Optional price-disclosure fields (EU Digital Fairness Act readiness).
//
// The European Commission proposed ticket-specific price transparency rules on
// 2026-11-11 (not yet law). Dynamic-price sellers may have to disclose how many
// tickets are at the advertised price and the maximum possible price; resale
// offers may have to show the original total price and category/row/seat.
// TTC redirects rather than sells, so its own obligations are unsettled; this
// module only fixes the SHAPE so providers' data is preserved when supplied.
//
// Rules: every field is optional; an absent or invalid value is null, which
// means "unknown". Nothing is estimated, defaulted or inferred. No ingestion
// path persists these yet (that needs an additive D1 migration, owner-gated).
export const PRICE_DISCLOSURE_FIELDS = Object.freeze({
  original_total_price: "money",
  displayed_total_price: "money",
  fees_included: "boolean",
  ticket_category: "text",
  section: "text",
  row: "text",
  seat: "text",
  price_ceiling: "money",
  inventory_at_price: "count",
  jurisdiction: "text",
  price_checked_at: "timestamp"
});

const clean = {
  money: (v) => (typeof v === "number" && Number.isFinite(v) && v > 0 ? v : null),
  boolean: (v) => (typeof v === "boolean" ? v : null),
  text: (v) => (typeof v === "string" && v.trim() ? v.trim() : null),
  count: (v) => (Number.isInteger(v) && v >= 0 ? v : null),
  timestamp: (v) => (typeof v === "string" && Number.isFinite(Date.parse(v)) ? v : null)
};

/** Returns every disclosure field, null where the input does not supply a valid value. */
export function normalizePriceDisclosure(raw) {
  const source = raw && typeof raw === "object" ? raw : {};
  return Object.fromEntries(
    Object.entries(PRICE_DISCLOSURE_FIELDS).map(([key, kind]) => [key, clean[kind](source[key])])
  );
}

/**
 * Disclosure fields derivable from an existing provider_pricing_cache row.
 * Only price_checked_at is known (verified_at). low_price is not a verified
 * total and inventory_count is not tied to a price, so those stay unknown.
 */
export function disclosureFromCacheRow(row) {
  return normalizePriceDisclosure({ price_checked_at: row?.verified_at });
}
