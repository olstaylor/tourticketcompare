-- Migration: index recorded-price reads by their approved source
-- Purpose: the artist-city, event and price-guide recorded-low queries filter
--   provider_pricing_history by event_id, provider, source and observed_at.
--   The original index omitted source, leaving D1 to filter it after the
--   lookup and to scan substantially more history rows than the query needs.
--
-- Additive and idempotent. This changes neither displayed prices nor source
-- data; it only makes the existing read path more selective.

CREATE INDEX IF NOT EXISTS idx_provider_pricing_history_event_provider_source_observed
  ON provider_pricing_history(event_id, provider, source, observed_at);
