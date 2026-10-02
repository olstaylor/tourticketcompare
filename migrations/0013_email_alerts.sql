-- Migration: artist date-alert sends and email opt-outs
-- Purpose: email_alert_sends records every date-alert email
--   scripts/send-date-alerts.mjs sends (one per address, artist and kind, with
--   the token its unsubscribe link carries); email_unsubscribes records opt-outs
--   from that link (functions/api/unsubscribe.js).
-- Applied by its users: both run this same schema (EMAIL_ALERT_SCHEMA_STATEMENTS
--   in functions/_email-alerts.js) before touching the tables, so no manual run
--   is needed. Safe to run by hand too (idempotent, no destructive statements).

CREATE TABLE IF NOT EXISTS email_alert_sends (
  email TEXT NOT NULL,
  artist_slug TEXT NOT NULL,
  alert_kind TEXT NOT NULL,
  status TEXT NOT NULL,
  run_id TEXT NOT NULL,
  unsubscribe_token TEXT NOT NULL,
  claimed_at TEXT NOT NULL,
  sent_at TEXT,
  provider_message_id TEXT,
  error TEXT,
  PRIMARY KEY (email, artist_slug, alert_kind)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_email_alert_sends_token ON email_alert_sends(unsubscribe_token);

CREATE TABLE IF NOT EXISTS email_unsubscribes (
  email TEXT PRIMARY KEY,
  unsubscribed_at TEXT NOT NULL,
  source TEXT
);
