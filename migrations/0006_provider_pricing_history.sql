-- Migration: Add immutable provider pricing history
-- Status: INACTIVE until pricing display feature is enabled
-- Purpose: Store provider-attributed approved pricing observations without overwriting prior snapshots

CREATE TABLE IF NOT EXISTS provider_pricing_history (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL,
  artist_slug TEXT NOT NULL,
  provider TEXT NOT NULL,
  low_price REAL NOT NULL,
  currency TEXT DEFAULT 'USD',
  inventory_count INTEGER,
  source TEXT NOT NULL,
  observed_at TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_provider_pricing_history_event_provider_observed
  ON provider_pricing_history(event_id, provider, observed_at);

CREATE INDEX IF NOT EXISTS idx_provider_pricing_history_provider_observed
  ON provider_pricing_history(provider, observed_at);
