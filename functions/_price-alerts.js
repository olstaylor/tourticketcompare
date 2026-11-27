// Shared contract for price-drop email alerts (design: plans/price-alerts-plan.md).
//
// A visitor asks to be told when ONE show's lowest listed price on a ticket
// site drops. Flow: signup (/api/price-alert) -> confirmation email with a
// button link (double opt-in, /api/price-alert-confirm) -> alerts sent by
// scripts/send-price-alerts.mjs only when the same detector the X price-drop
// drafts use finds a real, dated drop. Unsubscribing reuses the site-wide
// /api/unsubscribe: every email this feature sends is recorded in
// email_alert_sends with its own token.

export const PRICE_ALERT_SCHEMA_STATEMENTS = Object.freeze([
  `CREATE TABLE IF NOT EXISTS price_alert_subscriptions (
  email TEXT NOT NULL,
  event_id TEXT NOT NULL,
  artist_slug TEXT NOT NULL,
  status TEXT NOT NULL,
  confirm_token TEXT NOT NULL,
  consent_text TEXT NOT NULL,
  source_path TEXT,
  created_at TEXT NOT NULL,
  confirm_sent_at TEXT,
  confirmed_at TEXT,
  PRIMARY KEY (email, event_id)
)`,
  "CREATE UNIQUE INDEX IF NOT EXISTS idx_price_alert_subscriptions_token ON price_alert_subscriptions(confirm_token)",
  "CREATE INDEX IF NOT EXISTS idx_price_alert_subscriptions_status ON price_alert_subscriptions(status, event_id)"
]);

// Exact wording shown next to the signup button; stored with every signup as
// the record of what was agreed to. Change the wording => change this string.
export const PRICE_ALERT_CONSENT_TEXT =
  "Email me when the lowest listed price for this show drops. I'll confirm by email first. You'll get only price-drop emails for this show, at most 2 a week, and can unsubscribe any time.";

export const PRICE_ALERT_KIND_PREFIX = "price_drop:";
export const PRICE_ALERT_CONFIRM_KIND_PREFIX = "price_alert_confirm:";

// Frequency caps (owner can tune; documented in plans/price-alerts-plan.md).
export const PRICE_ALERT_CAPS = Object.freeze({
  perAddressPerWeek: 2,
  perShowCooldownDays: 7,
  confirmResendMinutes: 10,
  confirmValidDays: 7
});

const SITE_URL = "https://tourticketcompare.com";

export const isConfirmToken = (value) => /^[a-f0-9]{48}$/.test(String(value || ""));

export function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(24));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function shell(subject, bodyHtml, footerLines) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${escapeHtml(subject)}</title></head><body style="margin:0;padding:24px;background:#f6f6f4;font-family:Arial,Helvetica,sans-serif;color:#1d1d1b;line-height:1.5"><div style="max-width:560px;margin:0 auto;background:#ffffff;padding:24px;border-radius:8px">${bodyHtml}<hr style="border:none;border-top:1px solid #ddd;margin:24px 0 16px" />${footerLines.map((l) => `<p style="margin:0 0 8px;font-size:12px;color:#555">${l}</p>`).join("")}</div></body></html>`;
}

const button = (href, label) => `<p style="margin:0 0 16px"><a href="${escapeHtml(href)}" style="display:inline-block;background:#1d1d1b;color:#ffffff;padding:10px 16px;border-radius:6px;text-decoration:none">${escapeHtml(label)}</a></p>`;
const INDEPENDENCE = "TourTicketCompare is an independent fan site, not affiliated with any artist, venue or ticket seller.";

export const confirmUrl = (token) => `${SITE_URL}/api/price-alert-confirm?t=${token}`;
export const unsubscribeUrl = (token) => `${SITE_URL}/api/unsubscribe?t=${token}`;

/** Confirmation email: nothing else is sent until this is confirmed. */
export function buildConfirmEmail({ showLabel, confirmToken, unsubscribeToken, postalAddress }) {
  const subject = "Confirm your price alert";
  const confirm = confirmUrl(confirmToken);
  const unsubscribe = unsubscribeUrl(unsubscribeToken);
  const intro = `Someone entered this address on TourTicketCompare to get an email when the lowest listed ticket price drops for ${showLabel}. If that was you, confirm below. If not, ignore this email and nothing will be sent.`;
  const why = `You get this once. The confirm link works for ${PRICE_ALERT_CAPS.confirmValidDays} days.`;
  const text = [intro, "", `Confirm: ${confirm}`, "", why, "", "--", `Unsubscribe from all TourTicketCompare emails: ${unsubscribe}`, INDEPENDENCE, postalAddress].join("\n");
  const html = shell(subject, `<p style="margin:0 0 16px">${escapeHtml(intro)}</p>${button(confirm, "Confirm price alert")}`, [
    escapeHtml(why),
    `<a href="${escapeHtml(unsubscribe)}" style="color:#555">Unsubscribe from all TourTicketCompare emails</a>.`,
    escapeHtml(INDEPENDENCE),
    escapeHtml(postalAddress)
  ]);
  return { subject, text, html, headers: { "List-Unsubscribe": `<${unsubscribe}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" } };
}

const money = (price, currency) =>
  new Intl.NumberFormat("en", { style: "currency", currency, maximumFractionDigits: price % 1 === 0 ? 0 : 2 }).format(price);
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const shortDate = (iso) => `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]}`;
const longDate = (iso) => `${shortDate(iso)} ${iso.slice(0, 4)}`;

export function alertShowLabel(drop) {
  return `${drop.artist}, ${[drop.city, drop.venue].filter(Boolean).join(", ")}, ${longDate(drop.localDate)}`;
}

/**
 * Price-drop email from one detectPriceDrops() result. States only what was
 * recorded: one site, one currency, two dated readings and the capture time.
 * No "cheapest", no prediction, no availability. Links to the show page, never
 * to /api/out or an affiliate URL.
 */
export function buildPriceDropEmail({ drop, unsubscribeToken, postalAddress }) {
  const label = alertShowLabel(drop);
  const subject = `Price drop: ${drop.artist}, ${drop.city} ${shortDate(drop.localDate)}`;
  const pct = Math.floor(drop.dropShare * 100);
  const line = `${drop.site}'s lowest listed price for ${label} was ${money(drop.from, drop.currency)} on ${longDate(drop.fromDate)} and is ${money(drop.to, drop.currency)} on ${longDate(drop.toDate)} (${pct}% lower).`;
  const captured = `Captured ${drop.capturedAt.slice(0, 10)} ${drop.capturedAt.slice(11, 16)} UTC.`;
  const caveat = "This is a listed starting price from a snapshot, not a promise of availability or a checkout total. Fees and what's left are shown on the seller's page.";
  const url = new URL(drop.eventPath, SITE_URL);
  url.searchParams.set("utm_source", "ttc_alerts");
  url.searchParams.set("utm_medium", "email");
  url.searchParams.set("utm_campaign", "price_alert");
  const why = `You asked for price-drop emails for this show and confirmed by email. We send at most ${PRICE_ALERT_CAPS.perAddressPerWeek} a week.`;
  const unsubscribe = unsubscribeUrl(unsubscribeToken);
  const text = [line, captured, "", `See this show: ${url}`, "", caveat, "", "--", why, `Unsubscribe from all TourTicketCompare emails: ${unsubscribe}`, INDEPENDENCE, postalAddress].join("\n");
  const html = shell(subject, `<p style="margin:0 0 8px">${escapeHtml(line)}</p><p style="margin:0 0 16px;font-size:14px;color:#555">${escapeHtml(captured)}</p>${button(url.toString(), "See this show")}<p style="margin:0 0 16px;font-size:14px">${escapeHtml(caveat)}</p>`, [
    escapeHtml(why),
    `<a href="${escapeHtml(unsubscribe)}" style="color:#555">Unsubscribe from all TourTicketCompare emails</a>.`,
    escapeHtml(INDEPENDENCE),
    escapeHtml(postalAddress)
  ]);
  return { subject, text, html, headers: { "List-Unsubscribe": `<${unsubscribe}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" } };
}
