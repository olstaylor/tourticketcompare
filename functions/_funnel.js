// Shared, pure classification helpers for the commercial funnel.
//
// Every dimension recorded against a funnel event is derived here so that the
// client beacon endpoint (`functions/api/analytics.js`) and the authoritative
// outbound redirect (`functions/api/out.js`) label a click the same way. The
// module holds no secrets, performs no I/O, and never reaches the network — it
// is imported unchanged by `scripts/funnel-analytics.test.mjs`.
//
// Privacy contract for everything in this file: inputs are a URL path, a
// user-agent string, a provider slug and a hostname. Outputs are values drawn
// from fixed, low-cardinality vocabularies. Nothing here derives, stores or
// returns a name, an email address, a complete IP address, or a full URL.

// ── Page type ───────────────────────────────────────────────────────────────
// The client reports `routeType` from its own router, which collapses cities,
// venues, artist-city and the currency converter into one "server-rendered"
// bucket. Page type is therefore derived server-side from the request path so
// that every event — including the server-side outbound click, which has no
// client router — is labelled from one source of truth.
export const PAGE_TYPES = Object.freeze([
  "home",
  "artists_index",
  "artist",
  "artist_city",
  "artist_tour",
  "cities_index",
  "city",
  "venues_index",
  "venue",
  "guides_index",
  "guide",
  "compare_hub",
  "currency_converter",
  "trust",
  "other"
]);

const TRUST_PATHS = new Set([
  "/how-it-works",
  "/about",
  "/contact",
  "/editorial-policy",
  "/affiliate-disclosure",
  "/privacy",
  "/terms"
]);

function pathSegments(pathname) {
  return String(pathname || "/")
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean);
}

export function classifyPageType(pathname) {
  const path = normalizeAnalyticsPath(pathname);
  if (path === "/") return "home";
  if (TRUST_PATHS.has(path)) return "trust";
  if (path === "/compare-concert-ticket-prices") return "compare_hub";
  if (path === "/currency-converter") return "currency_converter";

  const parts = pathSegments(path);
  if (parts[0] === "artists") {
    if (parts.length === 1) return "artists_index";
    if (parts.length === 2) return "artist";
    // /artists/<artist>/tickets/<city> is the artist-city landing page; any
    // other three-segment form is an artist tour route.
    if (parts.length === 4 && parts[2] === "tickets") return "artist_city";
    if (parts.length === 3) return "artist_tour";
    return "other";
  }
  if (parts[0] === "cities") return parts.length === 1 ? "cities_index" : parts.length === 2 ? "city" : "other";
  if (parts[0] === "venues") return parts.length === 1 ? "venues_index" : parts.length === 2 ? "venue" : "other";
  if (parts[0] === "guides") return parts.length === 1 ? "guides_index" : parts.length === 2 ? "guide" : "other";
  return "other";
}

// A page type that represents a specific artist, whichever surface it is on.
// Used by the report to build the artist-view denominator.
export function isArtistPageType(pageType) {
  return pageType === "artist" || pageType === "artist_city" || pageType === "artist_tour";
}

// ── Path normalisation ──────────────────────────────────────────────────────
// Analytics rows store a path and never a full URL: no origin, no query string
// (which can carry UTM values or, on a mistyped link, arbitrary user input) and
// no fragment. Everything that writes `source_path` or `landing_path` goes
// through this.
export function normalizeAnalyticsPath(value, max = 255) {
  const raw = String(value ?? "").trim();
  if (!raw) return "/";
  try {
    const parsed = new URL(raw, "https://tourticketcompare.local");
    const pathname = parsed.pathname || "/";
    const trimmed = pathname !== "/" ? pathname.replace(/\/+$/, "") : pathname;
    return (trimmed || "/").slice(0, max);
  } catch {
    return "/";
  }
}

// ── Device category ─────────────────────────────────────────────────────────
// Three coarse buckets derived from the user-agent string that is already
// stored on every row. No client hints are requested, no model or OS version is
// retained, and no attempt is made to fingerprint — the only question asked is
// "phone, tablet, or desktop", because that is what changes CTA behaviour.
export function classifyDeviceCategory(userAgent) {
  const ua = String(userAgent || "").toLowerCase().trim();
  if (!ua) return "unknown";
  if (/ipad|tablet|playbook|silk|kindle|(android(?!.*mobile))/.test(ua)) return "tablet";
  if (/mobi|iphone|ipod|android.*mobile|windows phone|blackberry|iemobile|opera mini/.test(ua)) return "mobile";
  return "desktop";
}

// ── Providers, affiliate status and destination category ────────────────────
// Ticketmaster is a plain, unmonetized verification link (the site left the
// Ticketmaster affiliate programme). Every other approved lane is Impact-
// wrapped. Keep in sync with IMPACT_WRAPPED_PROVIDERS in functions/api/out.js.
export const AFFILIATE_PROVIDERS = Object.freeze([
  "seatgeek",
  "vivid-seats",
  "ticketnetwork",
  "ticket-liquidator",
  "stubhub-international"
]);

const AFFILIATE_PROVIDER_SET = new Set(AFFILIATE_PROVIDERS);

export function isAffiliateProvider(provider) {
  return AFFILIATE_PROVIDER_SET.has(normalizeProviderSlug(provider));
}

// Mirrors providerKey() in functions/api/out.js so the two never disagree about
// which slug an event is filed under.
export function normalizeProviderSlug(value) {
  const key = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  if (key === "vividseats") return "vivid-seats";
  if (key === "ticketliquidator") return "ticket-liquidator";
  if (key === "stubhubinternational") return "stubhub-international";
  return key;
}

// Where the visitor actually ends up. `affiliate_network` means the redirect
// handed off to an Impact tracking host (the click is claimable in affiliate
// reporting); `provider_direct` means an unmonetized hop straight to the
// provider. The distinction is observable at redirect time and is what makes
// "affiliate vs non-affiliate clicks" a measured fact rather than an inference
// from the provider name.
export const DESTINATION_CATEGORIES = Object.freeze([
  "affiliate_network",
  "provider_direct",
  "unknown"
]);

// This is the reviewed set of Impact/tracking destinations used by the active
// provider lanes. A host is not affiliate merely because it is unfamiliar: an
// unknown host remains `unknown` until it is reviewed and added here.
export const AFFILIATE_NETWORK_HOST_SUFFIXES = Object.freeze([
  "pxf.io",
  "evyy.net",
  "sjv.io",
  "impactradius.com",
  "goto.ticketnetwork.com"
]);

export function isAffiliateTrackingHost(destinationHost) {
  const host = String(destinationHost || "").trim().toLowerCase();
  return AFFILIATE_NETWORK_HOST_SUFFIXES.some((suffix) => host === suffix || host.endsWith(`.${suffix}`));
}

export function classifyDestination(destinationHost) {
  const host = String(destinationHost || "").trim().toLowerCase();
  if (!host) return "unknown";
  if (isAffiliateTrackingHost(host)) {
    return "affiliate_network";
  }
  // Only a reviewed provider host is a direct destination. This prevents an
  // Impact response or configuration mistake from being reported as a safe,
  // non-affiliate redirect.
  const providerHosts = [
    "ticketmaster.com", "ticketmaster.ca", "ticketmaster.co.uk", "ticketmaster.es", "ticketmaster.de",
    "ticketmaster.nl", "ticketmaster.se", "ticketmaster.pl", "ticketmaster.be", "ticketmaster.it",
    "seatgeek.com", "vividseats.com", "ticketnetwork.com", "ticketliquidator.com",
    "stubhub.co.uk", "stubhub.ie", "stubhub.de", "stubhub.fr", "stubhub.es", "stubhub.it",
    "stubhub.pt", "stubhub.pl", "stubhub.se", "stubhub.dk", "stubhub.fi", "stubhub.gr",
    "stubhub.nl", "stubhub.lu", "stubhub.cz", "stubhub.be", "stubhub.co.at"
  ];
  if (providerHosts.some((suffix) => host === suffix || host.endsWith(`.${suffix}`))) return "provider_direct";
  return "unknown";
}

// ── CTA location ────────────────────────────────────────────────────────────
// A fixed vocabulary. `/api/out` reads the CTA location from the query string,
// so it is attacker-controllable; anything outside this list is discarded
// rather than stored, which keeps the column low-cardinality and unpollutable.
export const CTA_LOCATIONS = Object.freeze([
  "event_card",
  "artist_provider_panel",
  "artist_page",
  "empty_state",
  "comparison_hub",
  "guide_provider_pair",
  "venue_card",
  "city_card"
]);

const CTA_LOCATION_SET = new Set(CTA_LOCATIONS);

export function normalizeCtaLocation(value) {
  const raw = String(value || "").trim().toLowerCase().replace(/[^a-z0-9_]+/g, "_");
  return CTA_LOCATION_SET.has(raw) ? raw : null;
}

// ── Acquisition source ──────────────────────────────────────────────────────
// A coarse channel label derived from the (already validated) external referrer
// origin plus UTM values. Only the channel is stored alongside the referrer
// origin — never the full referring URL, its path, or its query.
export const ACQUISITION_SOURCES = Object.freeze([
  "organic_search",
  "paid",
  "social",
  "ai_assistant",
  "email",
  "referral",
  "direct"
]);

const SEARCH_HOST_PATTERNS = [/(^|\.)google\./, /(^|\.)bing\./, /(^|\.)duckduckgo\./, /(^|\.)yahoo\./, /(^|\.)ecosia\./, /(^|\.)brave\./, /(^|\.)yandex\./, /(^|\.)baidu\./, /(^|\.)startpage\./];
const SOCIAL_HOST_PATTERNS = [/(^|\.)facebook\./, /(^|\.)instagram\./, /(^|\.)t\.co$/, /(^|\.)x\.com$/, /(^|\.)twitter\./, /(^|\.)reddit\./, /(^|\.)tiktok\./, /(^|\.)pinterest\./, /(^|\.)linkedin\./, /(^|\.)threads\./, /(^|\.)youtube\./];
const AI_HOST_PATTERNS = [/(^|\.)chatgpt\.com$/, /(^|\.)openai\.com$/, /(^|\.)claude\.ai$/, /(^|\.)perplexity\.ai$/, /(^|\.)gemini\.google\.com$/, /(^|\.)copilot\.microsoft\.com$/];
const PAID_MEDIUMS = new Set(["cpc", "ppc", "paid", "paidsearch", "paid_search", "display", "cpm", "banner"]);
const EMAIL_MEDIUMS = new Set(["email", "newsletter"]);
const SOCIAL_MEDIUMS = new Set(["social", "social-network", "social_network", "sm"]);

function referrerHostname(referrerOrigin) {
  try {
    return new URL(String(referrerOrigin)).hostname.toLowerCase();
  } catch {
    return "";
  }
}

export function classifyAcquisitionSource({ referrer = "", utmMedium = "", utmSource = "" } = {}) {
  const medium = String(utmMedium || "").trim().toLowerCase();
  if (PAID_MEDIUMS.has(medium)) return "paid";
  if (EMAIL_MEDIUMS.has(medium)) return "email";
  if (SOCIAL_MEDIUMS.has(medium)) return "social";

  const host = referrerHostname(referrer);
  if (host) {
    if (AI_HOST_PATTERNS.some((pattern) => pattern.test(host))) return "ai_assistant";
    if (SEARCH_HOST_PATTERNS.some((pattern) => pattern.test(host))) return "organic_search";
    if (SOCIAL_HOST_PATTERNS.some((pattern) => pattern.test(host))) return "social";
    return "referral";
  }

  // A UTM-tagged visit with no referrer is still a campaign visit, not direct.
  if (String(utmSource || "").trim()) return "referral";
  return "direct";
}

// ── Duplicate prevention ────────────────────────────────────────────────────
// Client interactions can fire twice for one intent: a double-click, a
// bubbling re-dispatch, or a CTA nested inside another tracked element. A
// second beacon for the same key inside the window is dropped so that
// client-side counts cannot inflate the funnel.
//
// This is a *pure factory* so it can be unit-tested with a controlled clock.
// public/app.js carries an equivalent inline implementation (it is a classic
// script and cannot import) — keep the two in sync.
export const DEFAULT_DUPLICATE_WINDOW_MS = 1500;

export function createDuplicateGuard(windowMs = DEFAULT_DUPLICATE_WINDOW_MS, maxKeys = 200) {
  const seen = new Map();
  return function isDuplicate(key, now) {
    const stamp = Number(now);
    if (!key || !Number.isFinite(stamp)) return false;
    const previous = seen.get(key);
    if (previous !== undefined && stamp - previous < windowMs) return true;
    seen.set(key, stamp);
    // Bounded memory: drop the oldest insertions once the map grows past the
    // cap so a long-lived page cannot accumulate keys without limit.
    if (seen.size > maxKeys) {
      const excess = seen.size - maxKeys;
      let removed = 0;
      for (const existing of seen.keys()) {
        seen.delete(existing);
        removed += 1;
        if (removed >= excess) break;
      }
    }
    return false;
  };
}

// ── Click id ────────────────────────────────────────────────────────────────
// An opaque, random, per-click identifier. It carries no information about the
// visitor — it is not derived from the IP, the user agent, or any session key —
// and exists so that one row can be matched to one redirect, and (once the
// owner enables the SubId passthrough) to one line in an affiliate report.
export function createClickId(randomValues) {
  const bytes = randomValues || (typeof crypto !== "undefined" && crypto.getRandomValues
    ? crypto.getRandomValues(new Uint8Array(12))
    : null);
  if (!bytes) return "";
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function isValidClickId(value) {
  return /^[0-9a-f]{24}$/.test(String(value || ""));
}
