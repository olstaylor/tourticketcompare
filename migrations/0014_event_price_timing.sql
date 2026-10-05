-- Durable internal price timing evidence. Self-applied by the price check
-- imports; additive and independent of the 90-day change-history prune.
CREATE TABLE IF NOT EXISTS event_price_timing_events (
  event_id TEXT PRIMARY KEY,
  artist_slug TEXT NOT NULL,
  country TEXT NOT NULL,
  event_start_at TEXT,
  lifecycle TEXT NOT NULL,
  schedule_revision INTEGER NOT NULL DEFAULT 1,
  metadata_at TEXT NOT NULL,
  completed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_price_timing_artist_country_completed
  ON event_price_timing_events(artist_slug, country, completed_at, event_id);
CREATE TABLE IF NOT EXISTS event_price_timing_checkpoints (
  event_id TEXT NOT NULL,
  schedule_revision INTEGER NOT NULL,
  event_start_at TEXT NOT NULL,
  provider TEXT NOT NULL,
  checkpoint TEXT NOT NULL,
  methodology_version INTEGER NOT NULL,
  observed_at TEXT,
  low_price REAL,
  currency TEXT,
  inventory_count INTEGER,
  source TEXT,
  external_id TEXT,
  price_distance_ms INTEGER,
  price_key TEXT,
  attempt_at TEXT NOT NULL,
  outcome TEXT NOT NULL,
  attempt_external_id TEXT NOT NULL,
  attempt_distance_ms INTEGER NOT NULL,
  attempt_key TEXT NOT NULL,
  PRIMARY KEY(event_id, schedule_revision, provider, checkpoint, methodology_version)
);
