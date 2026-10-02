import { EMAIL_ALERT_SCHEMA_STATEMENTS, isUnsubscribeToken } from "../_email-alerts.js";

// Unsubscribe from TourTicketCompare emails, from the link in a date-alert
// email (scripts/send-date-alerts.mjs).
//
// GET shows a confirmation page with one button and changes nothing, so a mail
// scanner that pre-fetches links cannot unsubscribe anyone. POST records the
// opt-out: from that button, or from a mail client's one-click unsubscribe
// (RFC 8058 List-Unsubscribe-Post, which POSTs to the same URL). The opt-out
// covers every email the site sends, and the sender skips any address in
// email_unsubscribes unless the person signs up again afterwards.

function getDemandDb(env) {
  const candidate = env?.DEMAND_DB;
  return candidate && typeof candidate.prepare === "function" ? candidate : null;
}

async function ensureSchema(db) {
  for (const sql of EMAIL_ALERT_SCHEMA_STATEMENTS) {
    await db.prepare(sql).run();
  }
}

const PAGES = {
  confirm: {
    status: 200,
    heading: "Unsubscribe from TourTicketCompare emails",
    message: "Press the button to stop all emails from TourTicketCompare, including artist date alerts."
  },
  done: {
    status: 200,
    heading: "You're unsubscribed",
    message: "You won't get any more emails from TourTicketCompare. If you sign up for an artist alert again later, that new signup will be honoured."
  },
  invalid: {
    status: 400,
    heading: "That unsubscribe link didn't work",
    message: "The link may have been cut short. Email hello@tourticketcompare.com and the address will be removed by hand."
  },
  unavailable: {
    status: 503,
    heading: "Unsubscribe is briefly unavailable",
    message: "Please try the link again shortly, or email hello@tourticketcompare.com and the address will be removed by hand."
  }
};

function page(kind, token = "") {
  const { status, heading, message } = PAGES[kind];
  const form =
    kind === "confirm"
      ? `<form method="post" action="/api/unsubscribe?t=${token}"><button class="button button-primary" type="submit">Unsubscribe</button></form>`
      : `<div class="action-row"><a class="button button-secondary" href="/">Back to TourTicketCompare</a></div>`;
  const body = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="robots" content="noindex" /><title>${heading} | TourTicketCompare</title><link rel="stylesheet" href="/styles.css?v=20260927a" /></head><body><main id="mainContent"><section class="content-page"><h1>${heading}</h1><p class="lead">${message}</p>${form}</section></main></body></html>`;
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex"
    }
  });
}

function tokenFrom(request) {
  const token = new URL(request.url).searchParams.get("t") || "";
  return isUnsubscribeToken(token) ? token : null;
}

export async function onRequestGet({ request }) {
  const token = tokenFrom(request);
  return token ? page("confirm", token) : page("invalid");
}

export async function onRequestPost({ request, env }) {
  const token = tokenFrom(request);
  if (!token) return page("invalid");
  const db = getDemandDb(env);
  if (!db) return page("unavailable");
  try {
    await ensureSchema(db);
    const row = await db
      .prepare("SELECT email FROM email_alert_sends WHERE unsubscribe_token = ?1")
      .bind(token)
      .first();
    if (!row?.email) return page("invalid");
    await db
      .prepare(
        `INSERT INTO email_unsubscribes (email, unsubscribed_at, source)
         VALUES (?1, ?2, 'alert_link')
         ON CONFLICT(email) DO UPDATE SET unsubscribed_at = excluded.unsubscribed_at, source = excluded.source`
      )
      .bind(row.email, new Date().toISOString())
      .run();
    return page("done");
  } catch (error) {
    return page("unavailable");
  }
}
