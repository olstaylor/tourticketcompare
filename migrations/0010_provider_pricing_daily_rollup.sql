-- Migration: Durable daily price rollup + event date on price history
-- Purpose: Keep a permanent, editorial-resolution record of observed listed
-- prices that survives the 90-day retention prune on provider_pricing_history,
-- and make a history row interpretable without joining a live file.
--
-- Two independent problems, one migration because they share a cause: the raw
-- observation table is bounded and its rows do not carry enough context to
-- outlive the event records they point at.
--
-- 1. RETENTION. Each scheduled snapshot apply run prunes
--    provider_pricing_history to 90 days (scripts/prune-provider-pricing-history.mjs).
--    That window is right for the on-page sparkline and wrong for anything
--    longitudinal: a stadium date goes on sale six to twelve months out, so no
--    90-day window can ever contain one full announce-to-door cycle, and the
--    rows that age out are precisely the ones that can never be re-collected.
--    provider_pricing_daily holds one row per event x provider x source x
--    currency x UTC day and is NEVER pruned. At roughly 1,600 rows a day it is
--    on the order of 1% of the raw volume, so keeping it indefinitely costs
--    little and makes every future retention decision reversible.
--
-- 2. INTERPRETABILITY. provider_pricing_history records when a price was
--    observed but not when the concert is, so "how did this price behave as the
--    date approached" can only be answered by joining event_id back to
--    public/data/events.json — a live file that already retains nothing before
--    2026-05-08. Once a history row outlives its event record the observation
--    becomes uninterpretable. event_date denormalises the venue-local event
--    datetime onto the observation at write time, which is the only point at
--    which it is reliably known.
--
-- Purely additive. The CREATE is IF NOT EXISTS; the ALTER adds one nullable
-- column, so existing rows keep their values and read NULL. Nothing is
-- dropped, renamed, or backfilled here. As with 0008, the code is safe to
-- deploy before or after this lands: no reader requires either.
--
-- NOT idempotent — ALTER TABLE ADD COLUMN fails if re-run. Apply once:
--   npx wrangler d1 execute tourticketcompare-demand --remote \
--     --file migrations/0010_provider_pricing_daily_rollup.sql
--
-- This migration only creates the shape. It writes no rows and changes no
-- writer: provider_pricing_daily stays empty and event_date stays NULL until
-- the snapshot workflows are separately scoped to populate them.

-- One row per event x provider x source x currency x UTC observation day.
--
-- Grain matches the public read path (functions/api/price-history.js filters on
-- exactly event_id + provider + source + currency), so a rollup row is never an
-- aggregate across two things the site would not show side by side. currency is
-- in the key deliberately: observations must never be aggregated across
-- currencies, and today every row is USD including events outside the US, where
-- the figure is provider-converted rather than local.
--
-- Every price column aggregates low_price — the provider's lowest listed
-- starting price — because that is the only price provider_pricing_history
-- records. low_price_max is therefore the highest that day's *starting* price
-- reached, NOT the most expensive ticket on sale. Anything published from this
-- table carries the same framing as the live badge: provider-supplied listed
-- price snapshots, not inventory, availability, or final checkout totals.
CREATE TABLE IF NOT EXISTS provider_pricing_daily (
  id TEXT PRIMARY KEY,
  observed_date TEXT NOT NULL,
  event_id TEXT NOT NULL,
  artist_slug TEXT NOT NULL,
  provider TEXT NOT NULL,
  source TEXT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  -- Venue-local event datetime, copied from the event record at write time so
  -- the row stays interpretable after that record is gone.
  event_date TEXT,
  low_price_min REAL NOT NULL,
  low_price_max REAL NOT NULL,
  low_price_first REAL NOT NULL,
  low_price_last REAL NOT NULL,
  -- How many raw observations this row summarises. A low count is a collection
  -- gap, not market calm: a day with two observations must not be read as a day
  -- with two price changes, and a missing day is never evidence that a ticket
  -- was unavailable.
  observations INTEGER NOT NULL,
  first_observed_at TEXT NOT NULL,
  last_observed_at TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(event_id, provider, source, currency, observed_date)
);

-- The UNIQUE constraint already indexes the event_id prefix, which serves
-- per-event series reads. These two cover the cross-event reporting cuts: an
-- artist's movement over a fixed window, and a whole-window scan.
CREATE INDEX IF NOT EXISTS idx_provider_pricing_daily_artist_date
  ON provider_pricing_daily(artist_slug, observed_date);
CREATE INDEX IF NOT EXISTS idx_provider_pricing_daily_date
  ON provider_pricing_daily(observed_date);

-- Venue-local event datetime on the raw observation, same rationale as the
-- rollup column. Deliberately not indexed: time-to-event is computed as a
-- difference against observed_at, which no index on this column can serve, and
-- provider_pricing_history takes on the order of 12,000 writes a day — a third
-- index would cost every one of them to speed up a report that runs weekly.
ALTER TABLE provider_pricing_history ADD COLUMN event_date TEXT;
