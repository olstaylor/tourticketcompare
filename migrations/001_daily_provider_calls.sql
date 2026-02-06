-- D1 migration (optional): durable daily API call counters per provider.
-- Create a D1 database and bind it to Pages/Workers as RATE_LIMIT_DB (recommended).

CREATE TABLE IF NOT EXISTS daily_provider_calls (
  provider TEXT NOT NULL,
  day TEXT NOT NULL, -- YYYY-MM-DD (UTC)
  count INTEGER NOT NULL,
  updated_at TEXT NOT NULL, -- ISO timestamp
  PRIMARY KEY (provider, day)
);

