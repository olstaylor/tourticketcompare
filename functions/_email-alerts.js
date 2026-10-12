// Shared contract for TourTicketCompare emails: artist date alerts and the
// optional weekly updates digest.
//
// Writers: functions/api/signup.js records an updates opt-in (only when the
// signup form's optional box is ticked). Two writers touch the send tables: scripts/send-date-alerts.mjs (records each
// alert it sends, from GitHub Actions) and functions/api/unsubscribe.js (records
// an opt-out from a link in that email). Both run the same idempotent schema
// first, so the tables create themselves on first use and no manual migration
// is needed. migrations/0013_email_alerts.sql is the same SQL, for reference
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
)`,
  // One row per address that ticked the optional updates box. consent_text is
  // the exact wording shown next to the box, kept as the record of what was
  // agreed to. An unsubscribe after consented_at withdraws it; ticking the box
  // again later refreshes consented_at, which is fresh consent.
  `CREATE TABLE IF NOT EXISTS email_update_consents (
  email TEXT PRIMARY KEY,
  consented_at TEXT NOT NULL,
  consent_text TEXT NOT NULL,
  source_path TEXT
)`
]);

// One alert kind today: the "dates are listed" email the watchlist form
// promises ("Leave your email to hear when confirmed dates are listed.
// Nothing else."). Presale/on-sale reminders would be a new purpose and need
// their own consent wording first.
export const DATE_ALERT_KIND = "dates_listed";

// The optional box on the signup form. Unticked by default, and separate from
// the date alert, which is sent whether or not it is ticked. Keep the form
// copy in functions/[[path]].js and public/app.js identical to this text.
export const UPDATES_CONSENT_TEXT =
  "Also send me a weekly email of presales and on-sales coming up. Optional; unsubscribe any time.";

// Weekly digest sends are recorded in email_alert_sends with this artist_slug
// and one alert_kind per ISO week ("weekly_digest:2026-W46"), so nobody gets
// the same week twice.
export const DIGEST_ARTIST_SLUG = "*";
export const DIGEST_KIND_PREFIX = "weekly_digest:";

export function isUnsubscribeToken(value) {
  return /^[a-f0-9]{48}$/.test(String(value || ""));
}
