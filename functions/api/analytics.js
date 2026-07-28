import { CANONICAL_HOST } from "../_route-metadata.js";
import { isLikelyBot } from "../_bot-detection.js";

const MAX_BODY_SIZE = 8 * 1024;
const ALLOWED_EVENTS = new Set(["page_view", "email_signup", "artist_interest", "outbound_click", "provider_click", "web_vitals"]);

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

const SAFE_METADATA_KEYS = new Set([
  "routeType", "artistSlug", "guideSlug", "tourSlug", "provider", "linkId",
  "eventId", "showId", "status", "reason", "currency", "hasPrice",
  "comparisonProviders", "result", "priceSnapshot", "ctaLocation",
  "lcp", "inp", "cls", "navigationType",
  "utmSource", "utmMedium", "utmCampaign", "entry"
]);

export function sanitizeMetadata(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const output = {};
  for (const [key, raw] of Object.entries(value)) {
    if (!SAFE_METADATA_KEYS.has(key)) continue;
    if (typeof raw === "boolean") {
      output[key] = raw;
      continue;
    }
    if (typeof raw === "number") {
      if (Number.isFinite(raw)) output[key] = raw;
      continue;
    }
    if (typeof raw !== "string") continue;
    const cleaned = raw.trim().slice(0, 160);
    if (!cleaned || /(?:https?:|www\\.|\\.com\\b|\\.net\\b|\\.org\\b)/i.test(cleaned)) continue;
    output[key] = cleaned;
  }
  return output;
}

function safePath(value) {
  try {
    return new URL(String(value || "/"), "https://tourticketcompare.local").pathname.slice(0, 255) || "/";
  } catch {
    return "/";
  }
}

function safeReferrer(value) {
  try {
    return value ? new URL(String(value)).origin.slice(0, 255) : null;
  } catch {
    return null;
  }
}

// Hosts that are us. A referrer pointing at one of these is same-site
// navigation, not acquisition, and must never be recorded as a traffic source.
function isOwnHost(host) {
  return (
    host === CANONICAL_HOST ||
    host.endsWith(`.${CANONICAL_HOST}`) ||
    host.endsWith(".pages.dev") ||
    host === "localhost" ||
    host === "127.0.0.1"
  );
}

// The Referer header on the beacon POST is always the page that sent it, so it
// can only ever say "tourticketcompare.com" — useless for working out where a
// visitor came from. The client reports the real external referrer origin
// instead; this validates it and drops anything self-referential.
function externalReferrer(value) {
  const origin = safeReferrer(value);
  if (!origin) return null;
  try {
    const url = new URL(origin);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (!url.hostname || isOwnHost(url.hostname.toLowerCase())) return null;
  } catch {
    return null;
  }
  return origin;
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

  const eventName = clean(payload?.eventName, 80);
  if (!ALLOWED_EVENTS.has(eventName)) return json({ ok: false, status: "invalid_event" }, 400);

  // Some crawlers execute page JS and fire beacons. Those page_view/web_vitals
  // rows are not demand signal, so drop them — accepted, not an error, so the
  // caller has nothing to retry.
  if (isLikelyBot(request.headers.get("user-agent"))) return json({ ok: true, status: "ignored" });

  const metadata = sanitizeMetadata(payload?.metadata);
  const now = new Date().toISOString();
  const sourcePath = safePath(payload?.sourcePath);
  const artistSlug = clean(payload?.artistSlug, 80) || null;
  const email = clean(payload?.email, 254).toLowerCase() || null;
  const requestKey = await hashRequestKey(request);
  // Client-reported external origin wins; the header is kept only as a
  // last-resort fallback so existing behaviour is unchanged when absent.
  const referrer =
    externalReferrer(payload?.referrer) || safeReferrer(request.headers.get("referer"));
  const userAgent = clean(request.headers.get("user-agent"), 255) || null;
  const metadataJson = JSON.stringify(metadata).slice(0, 2048);
  const provider = clean(payload?.provider || metadata.provider, 80) || null;
  const tourSlug = clean(payload?.tourSlug || metadata.tourSlug, 120) || null;
  const destinationHost = clean(payload?.destinationHost || metadata.destinationHost, 255) || null;
  const linkId = clean(payload?.linkId || metadata.linkId, 120) || null;

  try {
    await db
      .prepare(
        `INSERT INTO analytics_events (
          created_at, event_name, source_path, artist_slug, email, request_key, referrer, user_agent,
          metadata_json, provider, tour_slug, destination_host, link_id
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13)`
      )
      .bind(
        now,
        eventName,
        sourcePath,
        artistSlug,
        email,
        requestKey,
        referrer,
        userAgent,
        metadataJson,
        provider,
        tourSlug,
        destinationHost,
        linkId
      )
      .run();
  } catch (error) {
    await db
      .prepare(
        `INSERT INTO analytics_events (
          created_at, event_name, source_path, artist_slug, email, request_key, referrer, user_agent, metadata_json
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)`
      )
      .bind(now, eventName, sourcePath, artistSlug, email, requestKey, referrer, userAgent, metadataJson)
      .run();
  }

  return json({ ok: true });
}
