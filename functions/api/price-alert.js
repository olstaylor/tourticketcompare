// POST /api/price-alert: ask for an email when ONE show's lowest listed price
// drops. Step 1 of a double opt-in: this only stores a PENDING request and
// sends a confirmation email. Nothing else is emailed until the address
// confirms at /api/price-alert-confirm. See plans/price-alerts-plan.md.
//
// Nothing here touches /api/out, links or tracking. The show is checked
// against the site's own event partition, so an alert can only be requested
// for a real, upcoming, published show.
//
// Provider: functions/_email-provider.js. Default stub sends nothing; the
// request is still stored as pending so the owner can see demand.

import { EMAIL_ALERT_SCHEMA_STATEMENTS } from "../_email-alerts.js";
import {
  PRICE_ALERT_SCHEMA_STATEMENTS,
  PRICE_ALERT_CONSENT_TEXT,
  PRICE_ALERT_CONFIRM_KIND_PREFIX,
  PRICE_ALERT_CAPS,
  randomToken,
  buildConfirmEmail
} from "../_price-alerts.js";
import { createEmailProvider } from "../_email-provider.js";
import { isUpcomingShow } from "../_upcoming.js";
import { eventLifecycleHeld } from "../_route-indexability.js";

const MAX_BODY = 4 * 1024;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const slugOk = (v) => /^[a-z0-9][a-z0-9-]{0,80}$/.test(v);
const idOk = (v) => /^[A-Za-z0-9_.-]{1,160}$/.test(v);
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 254;
const clean = (v, max = 255) => String(v ?? "").trim().slice(0, max);

const json = (payload, status = 200) =>
  new Response(JSON.stringify(payload), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });

async function sha256Hex(text) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

async function withinRateLimit(db, request, now) {
  const ip = clean(request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for"), 120);
  const windowStart = new Date(Math.floor(now / RATE_WINDOW_MS) * RATE_WINDOW_MS).toISOString();
  const key = `pricealert:${await sha256Hex(`price-alert-ip|${ip}`)}:${windowStart}`;
  await db
    .prepare(
      `INSERT INTO rate_limits (key, window_start, count, reset_at) VALUES (?1, ?2, 1, ?3)
       ON CONFLICT(key) DO UPDATE SET count = count + 1`
    )
    .bind(key, windowStart, new Date(Date.parse(windowStart) + RATE_WINDOW_MS).toISOString())
    .run();
  const row = await db.prepare("SELECT count FROM rate_limits WHERE key = ?1").bind(key).first();
  return Number(row?.count || 0) <= RATE_MAX;
}

async function findEvent(env, slug, id) {
  const assets = env?.ASSETS;
  if (!assets || typeof assets.fetch !== "function") return { error: "unavailable" };
  try {
    const res = await assets.fetch(new Request(`https://assets.local/data/events/${encodeURIComponent(slug)}.json`));
    if (res.status === 404) return { event: null };
    if (!res.ok) return { error: "unavailable" };
    const list = await res.json();
    const event = Array.isArray(list) ? list.find((e) => String(e?.id) === id) : null;
    return { event: event || null };
  } catch {
    return { error: "unavailable" };
  }
}

export async function onRequestPost({ request, env }) {
  const db = env?.DEMAND_DB && typeof env.DEMAND_DB.prepare === "function" ? env.DEMAND_DB : null;
  if (!db) return json({ ok: false, status: "storage_unavailable" }, 503);

  const raw = new Uint8Array(await request.arrayBuffer().catch(() => new ArrayBuffer(0)));
  if (raw.byteLength > MAX_BODY) return json({ ok: false, status: "payload_too_large" }, 413);
  let payload;
  try {
    payload = JSON.parse(new TextDecoder().decode(raw));
  } catch {
    return json({ ok: false, status: "invalid_json" }, 400);
  }
  if (clean(payload?.website, 120)) return json({ ok: false, status: "spam_detected" }, 400);

  const email = clean(payload?.email, 254).toLowerCase();
  const slug = clean(payload?.artistSlug, 80).toLowerCase();
  const eventId = clean(payload?.eventId, 160);
  if (!emailOk(email)) return json({ ok: false, status: "invalid_email" }, 400);
  if (!slugOk(slug) || !idOk(eventId)) return json({ ok: false, status: "invalid_show" }, 400);

  const now = Date.now();
  const found = await findEvent(env, slug, eventId);
  if (found.error) return json({ ok: false, status: "show_check_unavailable" }, 503);
  if (!found.event || !isUpcomingShow(found.event, now) || eventLifecycleHeld(found.event)) {
    return json({ ok: false, status: "invalid_show" }, 400);
  }

  try {
    for (const sql of [...EMAIL_ALERT_SCHEMA_STATEMENTS, ...PRICE_ALERT_SCHEMA_STATEMENTS]) await db.prepare(sql).run();
    if (!(await withinRateLimit(db, request, now))) return json({ ok: false, status: "rate_limited" }, 429);

    const nowIso = new Date(now).toISOString();
    const existing = await db
      .prepare("SELECT status, confirm_sent_at, confirmed_at FROM price_alert_subscriptions WHERE email = ?1 AND event_id = ?2")
      .bind(email, eventId)
      .first();
    const recentlySent = existing?.confirm_sent_at && now - Date.parse(existing.confirm_sent_at) < PRICE_ALERT_CAPS.confirmResendMinutes * 60000;
    // Unsubscribing withdraws a confirmation; asking again afterwards is fresh consent.
    const optOut = existing?.status === "confirmed"
      ? await db.prepare("SELECT unsubscribed_at FROM email_unsubscribes WHERE email = ?1").bind(email).first()
      : null;
    const confirmedStill = existing?.status === "confirmed" && !(optOut?.unsubscribed_at && String(optOut.unsubscribed_at) > String(existing.confirmed_at || ""));
    const settled = confirmedStill || (existing?.status === "pending" && recentlySent);

    const provider = createEmailProvider(env);
    const postal = clean(env?.ALERT_POSTAL_ADDRESS, 300);
    const canSend = provider.live && Boolean(postal);
    const respond = () => json({ ok: true, status: "pending_confirmation", emailSent: canSend });
    // Same answer whether or not the address is new, already confirmed or
    // asked a moment ago, so the endpoint cannot be used to look people up.
    if (settled) return respond();

    const confirmToken = randomToken();
    const unsubscribeToken = randomToken();
    await db
      .prepare(
        `INSERT INTO price_alert_subscriptions (email, event_id, artist_slug, status, confirm_token, consent_text, source_path, created_at)
         VALUES (?1, ?2, ?3, 'pending', ?4, ?5, ?6, ?7)
         ON CONFLICT(email, event_id) DO UPDATE SET
           status = 'pending', confirm_token = excluded.confirm_token, consent_text = excluded.consent_text,
           source_path = excluded.source_path, created_at = excluded.created_at, confirmed_at = NULL`
      )
      .bind(email, eventId, slug, confirmToken, PRICE_ALERT_CONSENT_TEXT, clean(payload?.sourcePath, 255) || "/", nowIso)
      .run();

    // The confirmation email carries its own unsubscribe token, recorded the
    // same way as every other email so /api/unsubscribe works on it.
    const kind = `${PRICE_ALERT_CONFIRM_KIND_PREFIX}${eventId}`;
    await db
      .prepare(
        `INSERT INTO email_alert_sends (email, artist_slug, alert_kind, status, run_id, unsubscribe_token, claimed_at)
         VALUES (?1, ?2, ?3, 'claimed', 'signup', ?4, ?5)
         ON CONFLICT(email, artist_slug, alert_kind) DO UPDATE SET
           status = 'claimed', unsubscribe_token = excluded.unsubscribe_token, claimed_at = excluded.claimed_at, error = NULL`
      )
      .bind(email, slug, kind, unsubscribeToken, nowIso)
      .run();

    let status = "not_sent";
    let messageId = "";
    let error = "";
    if (canSend) {
      try {
        const label = `${clean(found.event.artist_name, 120)}, ${clean(found.event.city, 80)}`;
        const message = buildConfirmEmail({ showLabel: label, confirmToken, unsubscribeToken, postalAddress: postal });
        const result = await provider.send(email, message, `ttc-price-confirm-${unsubscribeToken}`);
        status = result.delivered ? "sent" : "not_sent";
        messageId = result.id || "";
      } catch (err) {
        status = "failed";
        error = String(err?.message || err).slice(0, 300);
      }
    }
    await db
      .prepare(
        `UPDATE email_alert_sends SET status = ?1, sent_at = ?2, provider_message_id = ?3, error = ?4
         WHERE email = ?5 AND artist_slug = ?6 AND alert_kind = ?7`
      )
      .bind(status, status === "sent" ? nowIso : null, messageId || null, error || null, email, slug, kind)
      .run();
    if (status === "sent") {
      await db
        .prepare("UPDATE price_alert_subscriptions SET confirm_sent_at = ?1 WHERE email = ?2 AND event_id = ?3")
        .bind(nowIso, email, eventId)
        .run();
    }
    return respond();
  } catch {
    return json({ ok: false, status: "storage_unavailable" }, 503);
  }
}
