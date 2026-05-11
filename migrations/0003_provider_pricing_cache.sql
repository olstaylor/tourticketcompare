-- Migration: Add provider pricing cache table
-- Status: INACTIVE until pricing display feature is enabled
-- Purpose: Store verified, time-limited pricing data from provider APIs

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
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(event_id, provider)
);

CREATE INDEX IF NOT EXISTS idx_provider_pricing_event_id ON provider_pricing_cache(event_id);
CREATE INDEX IF NOT EXISTS idx_provider_pricing_provider ON provider_pricing_cache(provider);
CREATE INDEX IF NOT EXISTS idx_provider_pricing_expires_at ON provider_pricing_cache(expires_at);

-- Table for provider health checks and credential status
CREATE TABLE IF NOT EXISTS provider_health_checks (
  id TEXT PRIMARY KEY,
  provider TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL,
  last_check_at TEXT NOT NULL,
  last_successful_check_at TEXT,
  error_message TEXT,
  credential_verified BOOLEAN DEFAULT FALSE,
  api_response_time_ms INTEGER,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
