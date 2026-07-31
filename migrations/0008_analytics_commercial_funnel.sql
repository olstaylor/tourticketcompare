-- Commercial funnel dimensions on analytics_events.
--
-- Purely additive: every statement is ADD COLUMN / CREATE INDEX IF NOT EXISTS,
-- so existing rows keep their values and read NULL for the new columns. The
-- writers in functions/api/analytics.js and functions/api/out.js fall back to
-- the previous column set when these columns are absent, so the code is safe to
-- deploy before or after this migration is applied.
--
-- No column added here holds a name, an email address, a complete IP address,
-- or a full URL. `landing_path` and `source_path` are site-relative paths with
-- the query string stripped; `acquisition_source`, `page_type`,
-- `device_category` and `destination_category` are fixed vocabularies from
-- functions/_funnel.js; `click_id` is opaque random hex.

ALTER TABLE analytics_events ADD COLUMN page_type TEXT;
ALTER TABLE analytics_events ADD COLUMN landing_path TEXT;
ALTER TABLE analytics_events ADD COLUMN event_id TEXT;
ALTER TABLE analytics_events ADD COLUMN event_date TEXT;
ALTER TABLE analytics_events ADD COLUMN event_city TEXT;
ALTER TABLE analytics_events ADD COLUMN event_venue TEXT;
ALTER TABLE analytics_events ADD COLUMN cta_location TEXT;
ALTER TABLE analytics_events ADD COLUMN destination_category TEXT;
ALTER TABLE analytics_events ADD COLUMN is_affiliate INTEGER;
ALTER TABLE analytics_events ADD COLUMN device_category TEXT;
ALTER TABLE analytics_events ADD COLUMN acquisition_source TEXT;
ALTER TABLE analytics_events ADD COLUMN utm_source TEXT;
ALTER TABLE analytics_events ADD COLUMN utm_medium TEXT;
ALTER TABLE analytics_events ADD COLUMN utm_campaign TEXT;
ALTER TABLE analytics_events ADD COLUMN click_id TEXT;

-- The funnel report windows on created_at and then groups by event name, so the
-- composite index carries both. The remaining indexes serve the per-artist,
-- per-page-type and session-join sections.
CREATE INDEX IF NOT EXISTS idx_analytics_events_name_created ON analytics_events(event_name, created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_request_key ON analytics_events(request_key);
CREATE INDEX IF NOT EXISTS idx_analytics_events_page_type ON analytics_events(page_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_click_id ON analytics_events(click_id);
