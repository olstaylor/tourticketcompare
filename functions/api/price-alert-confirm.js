import { EMAIL_ALERT_SCHEMA_STATEMENTS } from "../_email-alerts.js";
import { PRICE_ALERT_SCHEMA_STATEMENTS, PRICE_ALERT_CAPS, isConfirmToken } from "../_price-alerts.js";

// Confirm a price alert, from the button in the confirmation email
// (functions/api/price-alert.js).
//
// GET shows a page with one button and changes nothing, so a mail scanner that
// pre-fetches links cannot confirm anyone. POST confirms. A link older than
// PRICE_ALERT_CAPS.confirmValidDays is refused; the person can ask again.

const PAGES = {
  confirm: { status: 200, heading: "Confirm your price alert", message: "Press the button to get an email when the lowest listed price for this show drops. You can unsubscribe from any email." },
  done: { status: 200, heading: "Price alert confirmed", message: "You'll get an email if the lowest listed price for this show drops, at most twice a week." },
  invalid: { status: 400, heading: "That confirm link didn't work", message: "The link may have been cut short or expired. Ask for the price alert again on the show page." },
  unavailable: { status: 503, heading: "Confirming is briefly unavailable", message: "Please try the link again shortly." }
};

function page(kind, token = "") {
  const { status, heading, message } = PAGES[kind];
  const form =
    kind === "confirm"
      ? `<form method="post" action="/api/price-alert-confirm?t=${token}"><button class="button button-primary" type="submit">Confirm price alert</button></form>`
      : `<div class="action-row"><a class="button button-secondary" href="/">Back to TourTicketCompare</a></div>`;
  const body = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="robots" content="noindex" /><title>${heading} | TourTicketCompare</title><link rel="stylesheet" href="/styles.css?v=20261106a" /></head><body><main id="mainContent"><section class="content-page"><h1>${heading}</h1><p class="lead">${message}</p>${form}</section></main></body></html>`;
  return new Response(body, { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
}

const tokenFrom = (request) => {
  const t = new URL(request.url).searchParams.get("t") || "";
  return isConfirmToken(t) ? t : null;
};

export async function onRequestGet({ request }) {
  const token = tokenFrom(request);
  return token ? page("confirm", token) : page("invalid");
}

export async function onRequestPost({ request, env }) {
  const token = tokenFrom(request);
  if (!token) return page("invalid");
  const db = env?.DEMAND_DB && typeof env.DEMAND_DB.prepare === "function" ? env.DEMAND_DB : null;
  if (!db) return page("unavailable");
  try {
    for (const sql of [...EMAIL_ALERT_SCHEMA_STATEMENTS, ...PRICE_ALERT_SCHEMA_STATEMENTS]) await db.prepare(sql).run();
    const row = await db
      .prepare("SELECT email, event_id, status, created_at FROM price_alert_subscriptions WHERE confirm_token = ?1")
      .bind(token)
      .first();
    if (!row) return page("invalid");
    if (row.status === "confirmed") return page("done");
    const age = Date.now() - Date.parse(row.created_at);
    if (!(age >= 0 && age <= PRICE_ALERT_CAPS.confirmValidDays * 86400000)) return page("invalid");
    await db
      .prepare("UPDATE price_alert_subscriptions SET status = 'confirmed', confirmed_at = ?1 WHERE confirm_token = ?2 AND status = 'pending'")
      .bind(new Date().toISOString(), token)
      .run();
    return page("done");
  } catch {
    return page("unavailable");
  }
}
