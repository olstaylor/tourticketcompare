// Shared contract for artist date-alert emails.
//
// Two writers touch these tables: scripts/send-date-alerts.mjs (records each
// alert it sends, from GitHub Actions) and functions/api/unsubscribe.js (records
// an opt-out from a link in that email). Both run the same idempotent schema
// first, so the tables create themselves on first use and no manual migration
// is needed. migrations/0012_email_alerts.sql is the same SQL, for reference
// and for applying by hand.
//
// An unsubscribe link carries a random per-email token stored on the send row,
// not a signature, so no shared secret has to exist in both Cloudflare and
// GitHub. The token proves only that the holder received that email.

export const EMAIL_ALERT_SCHEMA_STATEMENTS = Object.freeze([
  `CREATE TABLE IF NOT EXISTS email_alert_sends (
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
)`,
  "CREATE UNIQUE INDEX IF NOT EXISTS idx_email_alert_sends_token ON email_alert_sends(unsubscribe_token)",
  `CREATE TABLE IF NOT EXISTS email_unsubscribes (
  email TEXT PRIMARY KEY,
  unsubscribed_at TEXT NOT NULL,
  source TEXT
)`
]);

// One alert kind today: the "dates are listed" email the watchlist form
// promises ("Leave your email to hear when confirmed dates are listed.
// Nothing else."). Presale/on-sale reminders would be a new purpose and need
// their own consent wording first.
export const DATE_ALERT_KIND = "dates_listed";

export function isUnsubscribeToken(value) {
  return /^[a-f0-9]{48}$/.test(String(value || ""));
}
