-- Migration: price-drop email alert subscriptions
-- Purpose: one row per address x show that asked for a price-drop email.
--   status 'pending' until the address confirms from the link in the
--   confirmation email (double opt-in); 'confirmed' afterwards. Sends are
--   recorded in email_alert_sends (0013) with alert_kind 'price_drop:...' so
--   the existing /api/unsubscribe link works on every email.
-- The same SQL is run idempotently by functions/api/price-alert.js on first
-- use (functions/_price-alerts.js), so applying this by hand is optional:
--   npx wrangler d1 execute tourticketcompare-demand --remote \
--     --file migrations/0016_price_alert_subscriptions.sql

CREATE TABLE IF NOT EXISTS price_alert_subscriptions (
  email TEXT NOT NULL,
  event_id TEXT NOT NULL,
  artist_slug TEXT NOT NULL,
  status TEXT NOT NULL,
  confirm_token TEXT NOT NULL,
  consent_text TEXT NOT NULL,
  target_price REAL,
  target_currency TEXT,
  source_path TEXT,
  created_at TEXT NOT NULL,
  confirm_sent_at TEXT,
  confirmed_at TEXT,
  PRIMARY KEY (email, event_id)
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_price_alert_subscriptions_token ON price_alert_subscriptions(confirm_token);
CREATE INDEX IF NOT EXISTS idx_price_alert_subscriptions_status ON price_alert_subscriptions(status, event_id);
