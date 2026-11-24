-- Durable, append-only record of Impact orders (actions) so commission state
-- can be tracked past the 45-day window the Actions API is read in.
-- Additive and idempotent. Written only by scripts/sync-impact-action-ledger.mjs,
-- which runs the same CREATE ... IF NOT EXISTS first, so nothing needs applying by
-- hand. No customer data: the Impact action id, campaign, state, payout, dates
-- and our own random click id only. Payment status is deliberately absent: the
-- Actions API gives no order-level payment evidence. `attribution` is one of
-- matched | unmatched | no_sub_id | invalid_sub_id | unknown (lookup failed).
CREATE TABLE IF NOT EXISTS impact_action_ledger (
  action_id TEXT PRIMARY KEY,
  campaign_id TEXT,
  provider TEXT,
  state TEXT NOT NULL,
  state_changed_at TEXT NOT NULL,
  first_seen_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL,
  event_date TEXT,
  lock_date TEXT,
  cleared_date TEXT,
  payout REAL,
  currency TEXT,
  click_id TEXT,
  attribution TEXT NOT NULL,
  artist_slug TEXT,
  event_id TEXT,
  page_type TEXT,
  source_path TEXT,
  cta_location TEXT,
  clicked_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_impact_action_ledger_state ON impact_action_ledger(state, event_date);
CREATE TABLE IF NOT EXISTS impact_action_state_history (
  action_id TEXT NOT NULL,
  observed_at TEXT NOT NULL,
  from_state TEXT,
  to_state TEXT NOT NULL,
  payout REAL,
  PRIMARY KEY (action_id, to_state, observed_at)
);
CREATE TABLE IF NOT EXISTS impact_action_import_runs (
  run_at TEXT PRIMARY KEY,
  status TEXT NOT NULL,
  window_since TEXT,
  fetched INTEGER NOT NULL DEFAULT 0,
  written INTEGER NOT NULL DEFAULT 0,
  flags TEXT
);
