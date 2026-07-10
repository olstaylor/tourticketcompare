-- Migration: Bootstrap provider pricing schema for uninitialized D1 databases
-- Purpose: Safely create the approved-provider price cache and immutable history tables
-- when they do not yet exist. This migration contains no destructive statements.

CREATE TABLE IF NOT EXISTS provider_pricing_cache (
  id TEXT PRIMARY KEY,
  artist_slug TEXT NOT NULL,
  event_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  low_price REAL,
  avg_price REAL,
  high_price REAL,
  currency TEXT DEFAULT 'USD',
  inventory_count INTEGER,
  verified_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  source TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(event_id, provider)
);

CREATE INDEX IF NOT EXISTS idx_provider_pricing_event_id ON provider_pricing_cache(event_id);
CREATE INDEX IF NOT EXISTS idx_provider_pricing_provider ON provider_pricing_cache(provider);
CREATE INDEX IF NOT EXISTS idx_provider_pricing_expires_at ON provider_pricing_cache(expires_at);
CREATE INDEX IF NOT EXISTS idx_provider_pricing_provider_event_expires
  ON provider_pricing_cache(provider, event_id, expires_at);

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
