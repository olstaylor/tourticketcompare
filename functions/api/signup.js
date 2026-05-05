const MAX_BODY_SIZE = 8 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const ARTIST_SLUGS = new Set([
  "beyonce",
  "harry-styles",
  "bts",
  "ariana-grande",
  "bad-bunny",
  "morgan-wallen",
  "jay-z"
]);

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

async function insertAnalytics(db, eventName, row) {
  try {
    await db
      .prepare(
        `INSERT INTO analytics_events (
          created_at, event_name, source_path, artist_slug, email, request_key, referrer, user_agent, metadata_json
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)`
      )
      .bind(
        row.createdAt,
        eventName,
        row.sourcePath || null,
        row.artistSlug || null,
        row.email || null,
        row.requestKey || null,
        row.referrer || null,
        row.userAgent || null,
        "{}"
      )
      .run();
  } catch (error) {
    // Signup should not fail because a secondary analytics insert failed.
  }
}

export async function onRequestPost({ request, env }) {
  const db = getDemandDb(env);
  if (!db) return json({ ok: false, status: "storage_unavailable" }, 503);

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_SIZE) {
    return json({ ok: false, status: "payload_too_large" }, 413);
  }

  let payload = null;
  try {
    payload = await request.json();
  } catch (error) {
    return json({ ok: false, status: "invalid_json" }, 400);
  }

  if (clean(payload?.website, 120)) return json({ ok: false, status: "spam_detected" }, 400);

  const email = normalizeEmail(payload?.email);
  if (!isValidEmail(email)) return json({ ok: false, status: "invalid_email" }, 400);

  const artistSlug = clean(payload?.artistSlug, 80).toLowerCase();
  if (artistSlug && !ARTIST_SLUGS.has(artistSlug)) return json({ ok: false, status: "invalid_artist" }, 400);

  const now = new Date();
  const createdAt = now.toISOString();
  const requestKey = await hashRequestKey(request);
  const allowed = await applyRateLimit(db, requestKey, now);
  if (!allowed) return json({ ok: false, status: "rate_limited" }, 429);

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

  await insertAnalytics(db, artistSlug ? "artist_interest" : "email_signup", row);

  return json({
    ok: true,
    status: existing ? "already_subscribed" : "subscribed",
    email,
    artistSlug: artistSlug || null
  });
}
