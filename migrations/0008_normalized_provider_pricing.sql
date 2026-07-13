-- Additive normalized provider pricing model. Legacy provider_pricing_* tables remain untouched.
CREATE TABLE IF NOT EXISTS provider_price_observations (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('ticketmaster', 'seatgeek', 'vivid-seats')),
  currency TEXT NOT NULL,
  lowest_price_minor INTEGER,
  price_type TEXT NOT NULL CHECK (price_type IN ('displayed_from', 'listing_minimum', 'api')),
  includes_fees INTEGER,
  checked_at TEXT NOT NULL,
  source_url TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('available', 'sold_out', 'unavailable', 'blocked', 'extractor_error')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (length(currency) = 3),
  CHECK (lowest_price_minor IS NULL OR lowest_price_minor >= 0),
  CHECK (includes_fees IS NULL OR includes_fees IN (0, 1))
);
CREATE INDEX IF NOT EXISTS idx_provider_price_observations_event_provider_checked
  ON provider_price_observations(event_id, provider, checked_at DESC);

CREATE TABLE IF NOT EXISTS provider_price_current (
  event_id TEXT NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('ticketmaster', 'seatgeek', 'vivid-seats')),
  currency TEXT NOT NULL,
  lowest_price_minor INTEGER NOT NULL CHECK (lowest_price_minor >= 0),
  price_type TEXT NOT NULL CHECK (price_type IN ('displayed_from', 'listing_minimum', 'api')),
  includes_fees INTEGER,
  checked_at TEXT NOT NULL,
  source_url TEXT NOT NULL,
  observation_id TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (event_id, provider),
  CHECK (length(currency) = 3),
  CHECK (includes_fees IS NULL OR includes_fees IN (0, 1))
);
CREATE INDEX IF NOT EXISTS idx_provider_price_current_provider_checked
  ON provider_price_current(provider, checked_at DESC);
