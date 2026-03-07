const MAX_BODY_SIZE = 8 * 1024;
let clickTableReady = false;

function getEnvBoolean(value, fallback) {
  if (value == null) return fallback;
  return String(value).toLowerCase() === "true";
}

function getClickDb(env) {
  const candidate = env?.CLICKS_DB || env?.RATE_LIMIT_DB || env?.DB;
  if (candidate && typeof candidate.prepare === "function") return candidate;
  return null;
}

function isHttpUrl(value) {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (err) {
    return false;
  }
}

function clean(value, max = 160) {
  return String(value || "").trim().slice(0, max);
}

async function ensureClickSchema(db) {
  if (!db || clickTableReady) return;
  await db.prepare(
    `CREATE TABLE IF NOT EXISTS affiliate_clicks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL,
      event_id TEXT,
      artist_slug TEXT,
      provider TEXT,
      city TEXT,
      country TEXT,
      surface TEXT,
      target_url TEXT,
      user_agent TEXT,
      referrer TEXT
    )`
  ).run();
  clickTableReady = true;
}

export async function onRequestPost({ request, env }) {
  const trackingEnabled = getEnvBoolean(env.CLICK_TRACKING_ENABLED, true);
  const noStoreHeaders = { "Cache-Control": "no-store" };
  if (!trackingEnabled) {
    return new Response(null, { status: 204, headers: noStoreHeaders });
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_SIZE) {
    return new Response(JSON.stringify({ error: "payload too large" }), {
      status: 413,
      headers: { "Content-Type": "application/json", ...noStoreHeaders }
    });
  }

  let payload = null;
  try {
    payload = await request.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: "invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...noStoreHeaders }
    });
  }

  const targetUrl = clean(payload && payload.targetUrl, 2048);
  if (!isHttpUrl(targetUrl)) {
    return new Response(JSON.stringify({ error: "invalid targetUrl" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...noStoreHeaders }
    });
  }

  const row = {
    createdAt: new Date().toISOString(),
    eventId: clean(payload && payload.eventId, 80),
    artistSlug: clean(payload && payload.artistSlug, 80),
    provider: clean(payload && payload.provider, 40),
    city: clean(payload && payload.city, 80),
    country: clean(payload && payload.country, 80),
    surface: clean(payload && payload.surface, 32),
    targetUrl,
    userAgent: clean(request.headers.get("user-agent"), 255),
    referrer: clean(request.headers.get("referer"), 512)
  };

  const db = getClickDb(env);
  if (db) {
    try {
      await ensureClickSchema(db);
      await db.prepare(
        `INSERT INTO affiliate_clicks (
          created_at, event_id, artist_slug, provider, city, country, surface, target_url, user_agent, referrer
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)`
      ).bind(
        row.createdAt,
        row.eventId || null,
        row.artistSlug || null,
        row.provider || null,
        row.city || null,
        row.country || null,
        row.surface || null,
        row.targetUrl,
        row.userAgent || null,
        row.referrer || null
      ).run();
    } catch (err) {
      // Keep tracking non-blocking for user flows.
    }
  } else {
    // Fallback for environments without a DB binding.
    console.log("affiliate_click", row);
  }

  return new Response(null, { status: 204, headers: noStoreHeaders });
}
