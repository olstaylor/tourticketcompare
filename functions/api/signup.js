import { insertAnalyticsRow } from "../_analytics-write.js";
import { classifyDeviceCategory, classifyPageType, normalizeAnalyticsPath } from "../_funnel.js";

const MAX_BODY_SIZE = 8 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const ARTISTS_JSON_PATH = "/data/artists.json";

// Allowlist is derived from artists.json at runtime — every artist record
// (including review_required ones) accepts watchlist signups; CTAs are gated
// separately via indexing_status. Cached for the isolate lifetime; a failed
// or empty load is never cached.
let CACHED_ARTIST_SLUGS = null;

async function loadArtistSlugs(env) {
  if (CACHED_ARTIST_SLUGS) return CACHED_ARTIST_SLUGS;
  const assets = env?.ASSETS;
  if (!assets || typeof assets.fetch !== "function") return null;

  try {
    const req = new Request(`https://assets.local${ARTISTS_JSON_PATH}`, { method: "GET" });
    const res = await assets.fetch(req);
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data)) return null;
    const slugs = new Set(
      data
        .map((artist) => String(artist?.slug || "").trim().toLowerCase())
        .filter(Boolean)
    );
    if (slugs.size === 0) return null;
    CACHED_ARTIST_SLUGS = slugs;
    return slugs;
  } catch (error) {
    return null;
  }
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function clean(value, max = 255) {
  return String(value || "").trim().slice(0, max);
}

function normalizeEmail(value) {
  return clean(value, 254).toLowerCase();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value) && value.length <= 254;
}

function getDemandDb(env) {
  const candidate = env?.DEMAND_DB;
  return candidate && typeof candidate.prepare === "function" ? candidate : null;
}

async function hashRequestKey(request) {
  const ip = clean(request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for"), 120);
  const ua = clean(request.headers.get("user-agent"), 255);
  const bytes = new TextEncoder().encode(`${ip}|${ua}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function applyRateLimit(db, key, now) {
  const windowStart = new Date(Math.floor(now.getTime() / RATE_LIMIT_WINDOW_MS) * RATE_LIMIT_WINDOW_MS).toISOString();
  const resetAt = new Date(Date.parse(windowStart) + RATE_LIMIT_WINDOW_MS).toISOString();
  const limitKey = `signup:${key}:${windowStart}`;
  await db
    .prepare(
      `INSERT INTO rate_limits (key, window_start, count, reset_at)
       VALUES (?1, ?2, 1, ?3)
       ON CONFLICT(key) DO UPDATE SET count = count + 1`
    )
    .bind(limitKey, windowStart, resetAt)
    .run();
  const row = await db.prepare("SELECT count FROM rate_limits WHERE key = ?1").bind(limitKey).first();
  return Number(row?.count || 0) <= RATE_LIMIT_MAX;
}

async function insertAnalytics(db, eventName, row, metadata = null) {
  try {
    let metadataJson = "{}";
    if (metadata && typeof metadata === "object") {
      try {
        metadataJson = JSON.stringify(metadata);
      } catch (error) {
        metadataJson = "{}";
      }
    }
    const sourcePath = normalizeAnalyticsPath(row.sourcePath || "/");
    const pageType = classifyPageType(sourcePath);
    await insertAnalyticsRow(db, {
      created_at: row.createdAt,
      event_name: eventName,
      source_path: sourcePath,
      artist_slug: row.artistSlug || null,
      // The subscriber's own address on their own consented signup. It is the
      // one place an address is written to analytics_events, it predates the
      // commercial funnel, and the funnel report never selects this column —
      // see docs/COMMERCIAL_FUNNEL.md.
      email: row.email || null,
      request_key: row.requestKey || null,
      referrer: row.referrer || null,
      user_agent: row.userAgent || null,
      metadata_json: metadataJson,
      provider: null,
      tour_slug: null,
      destination_host: null,
      link_id: null,
      page_type: pageType,
      landing_path: null,
      event_id: null,
      event_date: null,
      event_city: null,
      event_venue: null,
      cta_location: null,
      destination_category: null,
      is_affiliate: null,
      device_category: classifyDeviceCategory(row.userAgent),
      acquisition_source: null,
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      click_id: null
    });
  } catch (error) {
    // Signup should not fail because a secondary analytics insert failed.
  }
}

// A no-JS watchlist submit is a native <form> POST (form-encoded), not the
// fetch(JSON) path public/app.js uses. Anything that is not JSON is treated as
// a form post and answered with a small HTML confirmation page (Post/Redirect/
// Get-style landing) instead of a JSON body, so the browser shows a readable
// result rather than raw JSON.
function wantsHtmlResponse(request) {
  return !String(request.headers.get("content-type") || "").toLowerCase().includes("application/json");
}

// Restrict the "back" link to a same-origin site path so a crafted sourcePath
// can never turn the confirmation page into an open redirect surface.
function safeBackHref(value) {
  const raw = clean(value, 255);
  return /^\/[A-Za-z0-9/_-]*$/.test(raw) ? raw : "/artists";
}

const HTML_MESSAGES = {
  subscribed: "You're on the watchlist. We'll email you when verified dates and checked ticket links are listed.",
  already_subscribed: "You're already on the watchlist — we'll be in touch when verified dates are listed.",
  invalid_email: "That email address didn't look right. Please go back and try again.",
  invalid_form: "We couldn't read that submission. Please go back and try again.",
  invalid_artist: "We couldn't match that artist. Please go back and try again.",
  artist_validation_unavailable: "Signups are briefly unavailable. Please try again shortly.",
  rate_limited: "Too many signups from this connection just now. Please try again in a few minutes.",
  spam_detected: "That submission looked automated and was not saved.",
  payload_too_large: "That submission was too large to process.",
  storage_unavailable: "Signups are briefly unavailable. Please try again shortly."
};

function htmlResponse(result, status, backHref = "/artists") {
  const heading = result.ok ? "You're on the watchlist" : "Signup not completed";
  const message = HTML_MESSAGES[result.status] || "Something went wrong. Please go back and try again.";
  const body = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="robots" content="noindex" /><title>${heading} | TourTicketCompare</title><link rel="stylesheet" href="/styles.css" /></head><body><main id="mainContent"><section class="content-page"><h1>${heading}</h1><p class="lead">${message}</p><div class="action-row"><a class="button button-primary" href="${backHref}">Back to the artist page</a><a class="button button-secondary" href="/artists">Browse artists</a></div></section></main></body></html>`;
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex"
    }
  });
}

export async function onRequestPost({ request, env }) {
  const asHtml = wantsHtmlResponse(request);
  // Populated from the submitted sourcePath once parsed; only used by the HTML
  // (no-JS) branch for its "back" link.
  let backHref = "/artists";
  const respond = (result, status) =>
    asHtml ? htmlResponse(result, status, backHref) : json(result, status);

  const db = getDemandDb(env);
  if (!db) return respond({ ok: false, status: "storage_unavailable" }, 503);

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_SIZE) {
    return respond({ ok: false, status: "payload_too_large" }, 413);
  }

  let payload = null;
  if (asHtml) {
    try {
      const form = await request.formData();
      payload = Object.fromEntries(Array.from(form.entries()).map(([key, value]) => [key, String(value)]));
    } catch (error) {
      return respond({ ok: false, status: "invalid_form" }, 400);
    }
  } else {
    try {
      payload = await request.json();
    } catch (error) {
      return respond({ ok: false, status: "invalid_json" }, 400);
    }
  }
  backHref = safeBackHref(payload?.sourcePath);

  if (clean(payload?.website, 120)) return respond({ ok: false, status: "spam_detected" }, 400);

  const email = normalizeEmail(payload?.email);
  if (!isValidEmail(email)) return respond({ ok: false, status: "invalid_email" }, 400);

  const artistSlug = clean(payload?.artistSlug, 80).toLowerCase();
  if (artistSlug) {
    const artistSlugs = await loadArtistSlugs(env);
    // Fail closed: if the allowlist cannot be loaded, reject artist-tagged
    // signups rather than letting unknown slugs into artist_interests.
    if (!artistSlugs) return respond({ ok: false, status: "artist_validation_unavailable" }, 503);
    if (!artistSlugs.has(artistSlug)) return respond({ ok: false, status: "invalid_artist" }, 400);
  }

  const now = new Date();
  const createdAt = now.toISOString();
  const requestKey = await hashRequestKey(request);
  const allowed = await applyRateLimit(db, requestKey, now);
  if (!allowed) return respond({ ok: false, status: "rate_limited" }, 429);

  const row = {
    email,
    artistSlug,
    sourcePath: clean(payload?.sourcePath, 255) || "/",
    requestKey,
    referrer: clean(request.headers.get("referer"), 512),
    userAgent: clean(request.headers.get("user-agent"), 255),
    createdAt
  };

  const existing = await db.prepare("SELECT email FROM email_subscribers WHERE email = ?1").bind(email).first();

  await db
    .prepare(
      `INSERT INTO email_subscribers (
        email, created_at, updated_at, source_path, latest_artist_slug, request_key, referrer, user_agent
      ) VALUES (?1, ?2, ?2, ?3, ?4, ?5, ?6, ?7)
      ON CONFLICT(email) DO UPDATE SET
        updated_at = excluded.updated_at,
        source_path = excluded.source_path,
        latest_artist_slug = COALESCE(excluded.latest_artist_slug, email_subscribers.latest_artist_slug),
        request_key = excluded.request_key,
        referrer = excluded.referrer,
        user_agent = excluded.user_agent`
    )
    .bind(email, createdAt, row.sourcePath, artistSlug || null, requestKey, row.referrer || null, row.userAgent || null)
    .run();

  if (artistSlug) {
    await db
      .prepare(
        `INSERT INTO artist_interests (
          email, artist_slug, created_at, updated_at, source_path, request_key, referrer, user_agent
        ) VALUES (?1, ?2, ?3, ?3, ?4, ?5, ?6, ?7)
        ON CONFLICT(email, artist_slug) DO UPDATE SET
          updated_at = excluded.updated_at,
          source_path = excluded.source_path,
          request_key = excluded.request_key,
          referrer = excluded.referrer,
          user_agent = excluded.user_agent`
      )
      .bind(email, artistSlug, createdAt, row.sourcePath, requestKey, row.referrer || null, row.userAgent || null)
      .run();
  }

  // Price-drop demand instrument (Phase 1): the "register interest" control
  // posts intent=price_alert. It reuses this same capture path — the subscriber
  // row stays capture_only and NOTHING is ever emailed. The distinct analytics
  // event (with the event id in metadata) is what lets the owner gauge whether
  // the alert email stack is worth building.
  const isPriceAlertInterest = clean(payload?.intent, 40).toLowerCase() === "price_alert";
  const rawEventId = clean(payload?.eventId, 120);
  const eventId = /^[a-z0-9-]{1,120}$/i.test(rawEventId) ? rawEventId : null;
  const analyticsEventName = isPriceAlertInterest
    ? "price_alert_interest"
    : (artistSlug ? "artist_interest" : "email_signup");
  const analyticsMetadata = isPriceAlertInterest ? { intent: "price_alert", event_id: eventId } : null;
  await insertAnalytics(db, analyticsEventName, row, analyticsMetadata);

  return respond(
    {
      ok: true,
      status: existing ? "already_subscribed" : "subscribed",
      email,
      artistSlug: artistSlug || null
    },
    200
  );
}
