-- Migration: record when each price lane last looked for a listed price
-- Purpose: lets a show card with no price say when it was last checked
--   (priceUnavailableNote in functions/[[path]].js). One row per event and
--   lane, upserted by the snapshot writers for every completed lookup, priced
--   or not. See scripts/lib/price-checks.mjs.
-- Applied by the writers themselves: every price-check SQL file they execute
--   starts with this same CREATE TABLE IF NOT EXISTS, so no manual run is
--   needed. Safe to run by hand too (idempotent, no destructive statements).

CREATE TABLE IF NOT EXISTS provider_price_checks (
  event_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  checked_at TEXT NOT NULL,
  outcome TEXT NOT NULL,
  PRIMARY KEY (event_id, provider)
);
