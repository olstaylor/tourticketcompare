CREATE TABLE IF NOT EXISTS email_subscribers (
  email TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  source_path TEXT,
  latest_artist_slug TEXT,
  request_key TEXT,
  referrer TEXT,
  user_agent TEXT
);

CREATE TABLE IF NOT EXISTS artist_interests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  artist_slug TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  source_path TEXT,
  request_key TEXT,
  referrer TEXT,
  user_agent TEXT,
  UNIQUE(email, artist_slug)
);

CREATE TABLE IF NOT EXISTS analytics_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL,
  event_name TEXT NOT NULL,
  source_path TEXT,
  artist_slug TEXT,
  email TEXT,
  request_key TEXT,
  referrer TEXT,
  user_agent TEXT,
  metadata_json TEXT
);

CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT PRIMARY KEY,
  window_start TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  reset_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_artist_interests_artist_slug ON artist_interests(artist_slug);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);
