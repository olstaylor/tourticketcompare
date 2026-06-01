-- Migration: Add provider pricing source attribution
-- Purpose: Require explicit approved-source attribution for cached provider snapshots

ALTER TABLE provider_pricing_cache ADD COLUMN source TEXT;

CREATE INDEX IF NOT EXISTS idx_provider_pricing_provider_event_expires
  ON provider_pricing_cache(provider, event_id, expires_at);
