import { CANONICAL_HOST } from "../_route-metadata.js";
import { isLikelyBot } from "../_bot-detection.js";
import { insertAnalyticsRow } from "../_analytics-write.js";
import {
  classifyAcquisitionSource,
  classifyDeviceCategory,
  classifyPageType,
  isAffiliateProvider,
  normalizeAnalyticsPath,
  normalizeCtaLocation,
  normalizeProviderSlug
} from "../_funnel.js";

const MAX_BODY_SIZE = 8 * 1024;
// Client-observable funnel steps only.
//
// `outbound_attempt`, `outbound_click` and `outbound_blocked` are deliberately
// NOT accepted here. This endpoint is
// unauthenticated, and the commercial report identifies an authoritative click
// solely by `event_name = 'outbound_click'`, so accepting that name from a
// browser would let anyone inflate every commercial click metric without ever
// completing a redirect — the exact property the funnel is built to guarantee.
// The authoritative row is written server-side by /api/out and by nothing else.
// No client has ever posted this event, so rejecting it loses no data; rows
// already in the table were all written by /api/out and stay comparable.
//
// The remaining events are denominators (views), engagement signals, or the
// non-authoritative `provider_click`. Forging those can only depress a rate,
// never inflate the click count, so they stay open. show_filter and
// event_expand are artist show-board engagement (date filtering, opening a
// date's price-history panel); they are not outbound clicks and never
// duplicate provider_click / outbound_click. See docs/COMMERCIAL_FUNNEL.md.
const ALLOWED_EVENTS = new Set([
  "page_view",
  "artist_view",
  "event_view",
  "provider_cta_view",
  "email_signup",
  "artist_interest",
  "provider_click",
  "show_filter",
  "event_expand",
  "web_vitals"
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

const SAFE_METADATA_KEYS = new Set([
  "routeType", "artistSlug", "guideSlug", "tourSlug", "provider", "linkId",
  "eventId", "showId", "status", "reason", "currency", "hasPrice",
  "comparisonProviders", "result", "priceSnapshot", "ctaLocation",
  "lcp", "inp", "cls", "navigationType",
  "utmSource", "utmMedium", "utmCampaign", "entry",
  // Commercial funnel additions. All are low-cardinality labels or counts —
  // never free text, never an identifier of a person.
  "pageType", "ctaProviders", "ctaCount", "upcomingShows", "position",
  "isAffiliate", "deviceCategory", "acquisitionSource", "outcome",
  // Artist show-board engagement (show_filter / event_expand). Without these
  // the events record only an artist slug and measure nothing. "city" and
  // "country" are the selected filter values, which come from our own event
  // data, not free text — the raw search query is deliberately never sent.
  "control", "hasQuery", "city", "country", "sort", "visibleCount", "totalCount", "panel"
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
    // Reject anything that looks like a URL or a host. Metadata is a label
    // vocabulary, not a place to smuggle destinations or referring pages.
    if (!cleaned || /(?:https?:|\/\/|www\.|\.com\b|\.net\b|\.org\b|\.io\b)/i.test(cleaned)) continue;
    output[key] = cleaned;
  }
  return output;
}

function safePath(value) {
  return normalizeAnalyticsPath(value);
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
export function externalReferrer(value) {
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

// Event ids are opaque catalogue keys (e.g. tm-<artist>-<year>-<city>-<hex>).
// Accept only that shape so a beacon cannot write free text into the column.
export function safeEventId(value) {
  const raw = clean(value, 120);
  return /^[A-Za-z0-9][A-Za-z0-9._:-]{0,119}$/.test(raw) ? raw : null;
}

function safeUtm(value) {
  const raw = clean(value, 80);
  return /^[A-Za-z0-9._\- ]{1,80}$/.test(raw) ? raw : null;
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
  const requestKey = await hashRequestKey(request);
  // Client-reported external origin wins. The header is a last-resort fallback
  // and is subject to the same own-host rejection: under the site's
  // same-origin referrer policy the beacon's own Referer is one of our pages,
  // which is navigation, not acquisition.
  const referrer =
    externalReferrer(payload?.referrer) || externalReferrer(request.headers.get("referer"));
  const userAgent = clean(request.headers.get("user-agent"), 255) || null;
  const provider = normalizeProviderSlug(payload?.provider || metadata.provider) || null;
  const tourSlug = clean(payload?.tourSlug || metadata.tourSlug, 120) || null;
  const destinationHost = clean(payload?.destinationHost || metadata.destinationHost, 255) || null;
  const linkId = clean(payload?.linkId || metadata.linkId, 120) || null;

  // Funnel dimensions. Page type and device category are derived server-side so
  // that every event — including the server-side outbound click, which has no
  // client router — is labelled from one source of truth.
  const pageType = classifyPageType(sourcePath);
  const landingPath = payload?.landingPath ? safePath(payload.landingPath) : null;
  const eventId = safeEventId(payload?.eventId || metadata.eventId || metadata.showId);
  const ctaLocation = normalizeCtaLocation(metadata.ctaLocation);
  const deviceCategory = classifyDeviceCategory(userAgent);
  const utmSource = safeUtm(metadata.utmSource);
  const utmMedium = safeUtm(metadata.utmMedium);
  const utmCampaign = safeUtm(metadata.utmCampaign);
  // Acquisition belongs to the session's entry — the only beacon that carries a
  // referrer or UTM values. Classifying a later beacon would stamp every
  // in-session event "direct" and bury the organic/paid/referral source the
  // visit actually came from, so those rows are left NULL and the report reads
  // acquisition from the entry row.
  const isSessionEntry = metadata.entry === true;
  const acquisitionSource = isSessionEntry || referrer || utmSource || utmMedium || utmCampaign
    ? classifyAcquisitionSource({ referrer, utmMedium, utmSource })
    : null;
  metadata.pageType = pageType;
  const metadataJson = JSON.stringify(metadata).slice(0, 2048);

  await insertAnalyticsRow(db, {
    created_at: now,
    event_name: eventName,
    source_path: sourcePath,
    artist_slug: artistSlug,
    // Deliberately never populated from a client beacon. /api/signup writes the
    // subscriber's own address on its own consented path; a public write
    // endpoint has no business accepting one.
    email: null,
    request_key: requestKey,
    referrer,
    user_agent: userAgent,
    metadata_json: metadataJson,
    provider,
    tour_slug: tourSlug,
    destination_host: destinationHost,
    link_id: linkId,
    page_type: pageType,
    landing_path: landingPath,
    event_id: eventId,
    // Event date, city and venue are written only by /api/out, which resolves
    // them from the reviewed event record. A beacon is not a trusted source of
    // event facts.
    event_date: null,
    event_city: null,
    event_venue: null,
    cta_location: ctaLocation,
    destination_category: null,
    is_affiliate: provider ? (isAffiliateProvider(provider) ? 1 : 0) : null,
    device_category: deviceCategory,
    acquisition_source: acquisitionSource,
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    click_id: null
  });

  return json({ ok: true });
}
