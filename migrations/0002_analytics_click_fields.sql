ALTER TABLE analytics_events ADD COLUMN provider TEXT;
ALTER TABLE analytics_events ADD COLUMN tour_slug TEXT;
ALTER TABLE analytics_events ADD COLUMN destination_host TEXT;
ALTER TABLE analytics_events ADD COLUMN link_id TEXT;

CREATE INDEX IF NOT EXISTS idx_analytics_events_provider ON analytics_events(provider);
CREATE INDEX IF NOT EXISTS idx_analytics_events_artist_provider ON analytics_events(artist_slug, provider);
