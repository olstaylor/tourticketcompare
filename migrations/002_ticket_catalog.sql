-- D1 migration: catalog foundation for verified artist/event inventory.
-- This seeds featured artists only. Do not seed events until dates, venues,
-- provider links, and inventory status are verified.

CREATE TABLE IF NOT EXISTS artists (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  featured INTEGER NOT NULL DEFAULT 0 CHECK (featured IN (0, 1)),
  sort_order INTEGER NOT NULL DEFAULT 999,
  status TEXT NOT NULL DEFAULT 'planned',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  artist_slug TEXT NOT NULL,
  event_name TEXT,
  venue_name TEXT,
  city TEXT,
  region TEXT,
  country TEXT,
  starts_at TEXT,
  timezone TEXT,
  source_type TEXT NOT NULL DEFAULT 'manual',
  source_url TEXT,
  inventory_status TEXT NOT NULL DEFAULT 'unknown',
  last_verified_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (artist_slug) REFERENCES artists(slug) ON DELETE CASCADE,
  CHECK (inventory_status IN (
    'unknown',
    'verified_link_available',
    'price_unavailable',
    'limited_availability',
    'sold_out',
    'unavailable',
    'error'
  )),
  CHECK (source_type IN (
    'manual',
    'ticketmaster',
    'seatgeek',
    'vivid_seats',
    'stubhub',
    'impact',
    'import'
  ))
);

CREATE TABLE IF NOT EXISTS sync_runs (
  id TEXT PRIMARY KEY,
  source_type TEXT NOT NULL,
  status TEXT NOT NULL,
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT,
  records_seen INTEGER NOT NULL DEFAULT 0,
  records_inserted INTEGER NOT NULL DEFAULT 0,
  records_updated INTEGER NOT NULL DEFAULT 0,
  error_message TEXT,
  metadata_json TEXT,
  CHECK (status IN ('started', 'success', 'partial', 'failed'))
);

CREATE INDEX IF NOT EXISTS idx_events_artist_slug ON events(artist_slug);
CREATE INDEX IF NOT EXISTS idx_events_starts_at ON events(starts_at);
CREATE INDEX IF NOT EXISTS idx_events_inventory_status ON events(inventory_status);
CREATE INDEX IF NOT EXISTS idx_events_source_type ON events(source_type);
CREATE INDEX IF NOT EXISTS idx_sync_runs_source_type ON sync_runs(source_type);
CREATE INDEX IF NOT EXISTS idx_sync_runs_status ON sync_runs(status);
CREATE INDEX IF NOT EXISTS idx_sync_runs_started_at ON sync_runs(started_at);

INSERT INTO artists (slug, name, featured, sort_order, status, updated_at)
VALUES
  ('beyonce', 'Beyoncé', 1, 10, 'planned', datetime('now')),
  ('harry-styles', 'Harry Styles', 1, 20, 'planned', datetime('now')),
  ('bts', 'BTS', 1, 30, 'planned', datetime('now')),
  ('ariana-grande', 'Ariana Grande', 1, 40, 'planned', datetime('now')),
  ('bad-bunny', 'Bad Bunny', 1, 50, 'planned', datetime('now')),
  ('morgan-wallen', 'Morgan Wallen', 1, 60, 'planned', datetime('now')),
  ('jay-z', 'JAY-Z', 1, 70, 'planned', datetime('now'))
ON CONFLICT(slug) DO UPDATE SET
  name = excluded.name,
  featured = excluded.featured,
  sort_order = excluded.sort_order,
  updated_at = datetime('now');
