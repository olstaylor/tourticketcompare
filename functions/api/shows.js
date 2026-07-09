import { VERIFIED_TICKET_LINKS } from "./out.js";

const EVENTS_JSON_PATH = "/data/events.json";
const ARTISTS_JSON_PATH = "/data/artists.json";
const IN_FLIGHT_PROVIDER_REQUESTS = new Map();
const IN_FLIGHT_ARTIST_DISCOVERY_REQUESTS = new Map();
const DEFAULT_LIST_LIMIT = 200;
const MAX_LIST_LIMIT = 500;
const DEFAULT_TICKETMASTER_DISCOVERY_BASE = "https://app.ticketmaster.com/discovery/v2";
const DEFAULT_TICKETMASTER_ARTIST_EVENTS_LIMIT = 100;
const PLACEHOLDER_URL_MARKERS = [
  "example.com",
  "your-affiliate-link",
  "your-link-here",
  "replace-me",
  "placeholder",
  "tbd"
];
const PLACEHOLDER_HOST_REGEX = /(^|\.)example\.com$|(^|\.)example$|(^|\.)localhost$|^127\.0\.0\.1$/i;
// Derived from the verified link registry in out.js — do not hand-edit.
// Keyed provider → { artistSlug → redirectUrl }. Promoting an artist
// (VERIFIED_TICKET_LINKS entry) makes them appear here.
const ARTIST_LINKS_BY_PROVIDER = {};
for (const link of Object.values(VERIFIED_TICKET_LINKS)) {
  if (link?.verified !== true || !link?.redirectUrl || !link?.provider || !link?.artistSlug) continue;
  if (!ARTIST_LINKS_BY_PROVIDER[link.provider]) ARTIST_LINKS_BY_PROVIDER[link.provider] = {};
  ARTIST_LINKS_BY_PROVIDER[link.provider][link.artistSlug] = link.redirectUrl;
}

export { ARTIST_LINKS_BY_PROVIDER };

function isValidDateISO(value) {
  if (typeof value !== "string") return false;
  const ms = Date.parse(value);
  return Number.isFinite(ms);
}

async function loadEventsFromAssets(env) {
  const assets = env?.ASSETS;
  if (!assets || typeof assets.fetch !== "function") return [];

  try {
    const req = new Request(`https://assets.local${EVENTS_JSON_PATH}`, { method: "GET" });
    const res = await assets.fetch(req);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return [];
  }
}

async function loadArtistsFromAssets(env) {
  const assets = env?.ASSETS;
  if (!assets || typeof assets.fetch !== "function") return [];

  try {
    const req = new Request(`https://assets.local${ARTISTS_JSON_PATH}`, { method: "GET" });
    const res = await assets.fetch(req);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return [];
  }
}

function mapEventsToShows(events) {
  if (!Array.isArray(events)) return [];

  const now = Date.now();
  return events
    .filter((event) => event && typeof event === "object")
    .filter((event) => typeof event.id === "string" && event.id.trim().length)
    .map((event) => {
      const dateTimeISO = event.dateTimeISO || event.datetime_iso;
      const city = typeof event.city === "string" ? event.city : "";
      const country = typeof event.country === "string" ? event.country : "";
      return {
        id: event.id,
        event_name: event.event_name || event.name || "",
        artist: event.artist_name || event.artist || "",
        artist_slug: event.artist_slug,
        artist_name: event.artist_name,
        dateTimeISO,
        city,
        country,
        city_display: city && country ? `${city}, ${country}` : (city || country || ""),
        venue: event.venue || "",
        image_url: event.image_url || event.image || "",
        timezone: event.timezone,
        tour_name: event.tour_name,
        status: event.status,
        seatgeek_event_id: event.seatgeek_event_id,
        vividseats_event_id: event.vividseats_event_id,
        ticketmaster_event_id: event.ticketmaster_event_id,
        seatgeek_url: event.seatgeek_url,
        vividseats_url: event.vividseats_url,
        ticketmaster_url: event.ticketmaster_url,
        // Publishability state consumed by eventLinkPublishable /
        // providerEventPublishable in public/app.js — without it, hydrated
        // show cards could not distinguish machine-approved links from
        // needs-recheck links. The slim provider_links carries the legacy
        // fallback flag (ticketmaster.verified) plus the per-provider
        // provenance flags that let a SeatGeek / Vivid Seats CTA stand alone
        // on a needs_recheck event.
        verification_status: event.verification_status,
        provider_links: {
          ticketmaster: {
            verified: event?.provider_links?.ticketmaster?.verified === true
          },
          seatgeek: {
            verified: event?.provider_links?.seatgeek?.verified === true
          },
          "vivid-seats": {
            verified: event?.provider_links?.["vivid-seats"]?.verified === true
          }
        },
        impact_program_id: event.impact_program_id,
        impact_deep_link: event.impact_deep_link,
        ticketmaster_impact_program_id: event.ticketmaster_impact_program_id,
        seatgeek_impact_program_id: event.seatgeek_impact_program_id,
        vividseats_impact_program_id: event.vividseats_impact_program_id,
        ticketmaster_deep_link: event.ticketmaster_deep_link,
        seatgeek_deep_link: event.seatgeek_deep_link,
        vividseats_deep_link: event.vividseats_deep_link
      };
    })
    .filter((show) => isValidDateISO(show.dateTimeISO))
    .filter((show) => Date.parse(show.dateTimeISO) >= now)
    .sort((a, b) => Date.parse(a.dateTimeISO) - Date.parse(b.dateTimeISO));
}

function resolveArtistName(artistSlug, artists, allShows) {
  const normalizedSlug = slugify(artistSlug);
  if (!normalizedSlug) return "";

  if (Array.isArray(artists)) {
    for (const artist of artists) {
      if (!artist || typeof artist !== "object") continue;
      const slug = slugify(artist.slug || artist.artist_slug || "");
      if (slug !== normalizedSlug) continue;
      const name = String(artist.name || artist.artist_name || "").trim();
      if (name) return name;
    }
  }

  if (Array.isArray(allShows)) {
    const match = allShows.find((show) => slugify(show.artist_slug) === normalizedSlug && show.artist_name);
    if (match && typeof match.artist_name === "string" && match.artist_name.trim()) {
      return match.artist_name.trim();
    }
  }

  return titleCaseFromSlug(normalizedSlug);
}

function mapTicketmasterStatus(code) {
  const normalized = String(code || "").toLowerCase();
  if (!normalized) return "announced";
  if (normalized === "onsale") return "on-sale";
  if (normalized === "offsale") return "past";
  return "announced";
}

function extractTicketmasterDateTime(event) {
  const dateTime = event?.dates?.start?.dateTime;
  if (typeof dateTime === "string" && Number.isFinite(Date.parse(dateTime))) {
    return dateTime;
  }
  const localDate = event?.dates?.start?.localDate;
  if (typeof localDate !== "string" || !localDate.trim()) return null;
  const localTime = typeof event?.dates?.start?.localTime === "string" && event.dates.start.localTime.trim()
    ? event.dates.start.localTime.trim()
    : "19:00:00";
  const fallbackIso = `${localDate}T${localTime}Z`;
  return Number.isFinite(Date.parse(fallbackIso)) ? fallbackIso : null;
}

function mapTicketmasterEventToShow(event, artistSlug, artistName) {
  if (!event || typeof event !== "object") return null;
  const tmEventId = String(event.id || "").trim();
  if (!tmEventId) return null;

  const dateTimeISO = extractTicketmasterDateTime(event);
  if (!dateTimeISO || !Number.isFinite(Date.parse(dateTimeISO))) return null;

  const venue = event?._embedded?.venues?.[0] || {};
  const city = typeof venue?.city?.name === "string" && venue.city.name.trim()
    ? venue.city.name.trim()
    : "";
  const country = typeof venue?.country?.name === "string" && venue.country.name.trim()
    ? venue.country.name.trim()
    : "";
  const venueName = typeof venue?.name === "string" && venue.name.trim()
    ? venue.name.trim()
    : "";
  const eventUrl = isUsableAffiliateUrl(event.url) ? event.url.trim() : null;
  const images = Array.isArray(event.images) ? event.images : [];
  const bestImage = images.find((image) => image && typeof image.url === "string" && image.url.trim()) || null;

  return {
    id: `tm-${tmEventId}`,
    event_name: String(event.name || "").trim() || artistName,
    artist: artistName,
    artist_slug: artistSlug,
    artist_name: artistName,
    dateTimeISO,
    city,
    country,
    city_display: city && country ? `${city}, ${country}` : (city || country || ""),
    venue: venueName,
    image_url: bestImage ? bestImage.url.trim() : null,
    timezone: typeof event?.dates?.timezone === "string" ? event.dates.timezone : null,
    tour_name: "",
    status: mapTicketmasterStatus(event?.dates?.status?.code),
    seatgeek_event_id: null,
    vividseats_event_id: null,
    ticketmaster_event_id: tmEventId,
    seatgeek_url: null,
    vividseats_url: null,
    ticketmaster_url: eventUrl
  };
}

function buildTicketmasterArtistEventsCacheKey(artistSlug, artistName, countryCode, limit) {
  return `https://cache.local/tm-discovery/events?artistSlug=${encodeURIComponent(
    artistSlug
  )}&artist=${encodeURIComponent(artistName)}&country=${encodeURIComponent(
    countryCode || ""
  )}&limit=${encodeURIComponent(String(limit))}`;
}

async function fetchTicketmasterArtistEvents(options) {
  const {
    env,
    cache,
    artistSlug,
    artistName,
    countryCode,
    limit,
    ttlSeconds
  } = options || {};

  const apiKey = String(env?.TICKETMASTER_API_KEY || "").trim();
  if (!apiKey) {
    return { shows: [], cacheState: "disabled", error: "missing_ticketmaster_api_key" };
  }

  const normalizedSlug = slugify(artistSlug);
  const normalizedName = String(artistName || "").trim();
  if (!normalizedSlug || !normalizedName) {
    return { shows: [], cacheState: "disabled", error: "missing_artist_filter" };
  }

  const cacheKey = buildTicketmasterArtistEventsCacheKey(normalizedSlug, normalizedName, countryCode, limit);
  const cached = await cache.match(cacheKey);
  if (cached) {
    try {
      const data = await cached.json();
      const shows = Array.isArray(data?.shows) ? data.shows : [];
      return {
        shows,
        cacheState: "cached",
        fetchedAt: data?.fetchedAt || null,
        error: null
      };
    } catch (err) {
      // Fall through to refetch.
    }
  }

  const inflightKey = `tm-events:${normalizedSlug}:${countryCode || "all"}:${limit}`;
  const existingInFlight = IN_FLIGHT_ARTIST_DISCOVERY_REQUESTS.get(inflightKey);
  if (existingInFlight) {
    return existingInFlight;
  }

  const requestTask = (async () => {
    const baseUrl = String(env?.TICKETMASTER_DISCOVERY_BASE_URL || DEFAULT_TICKETMASTER_DISCOVERY_BASE).replace(/\/+$/, "");
    const params = new URLSearchParams();
    params.set("apikey", apiKey);
    params.set("keyword", normalizedName);
    params.set("classificationName", "music");
    params.set("sort", "date,asc");
    params.set("includeTBA", "no");
    params.set("includeTBD", "no");
    params.set("size", String(Math.max(1, Math.min(200, limit || DEFAULT_TICKETMASTER_ARTIST_EVENTS_LIMIT))));

    const trimmedCountry = String(countryCode || "").trim().toUpperCase();
    if (/^[A-Z]{2}$/.test(trimmedCountry)) {
      params.set("countryCode", trimmedCountry);
    }

    const endpoint = `${baseUrl}/events.json?${params.toString()}`;

    try {
      const res = await fetch(endpoint, {
        headers: { Accept: "application/json" }
      });
      if (!res.ok) {
        if (res.status === 429) {
          return {
            shows: [],
            cacheState: "rate_limited",
            error: "ticketmaster_discovery_rate_limited"
          };
        }
        throw new Error(`ticketmaster_discovery_http_${res.status}`);
      }

      const payload = await res.json();
      const events = Array.isArray(payload?._embedded?.events) ? payload._embedded.events : [];
      const shows = events
        .map((event) => mapTicketmasterEventToShow(event, normalizedSlug, normalizedName))
        .filter(Boolean)
        .filter((show) => Number.isFinite(Date.parse(show.dateTimeISO)))
        .filter((show) => Date.parse(show.dateTimeISO) >= Date.now())
        .sort((a, b) => Date.parse(a.dateTimeISO) - Date.parse(b.dateTimeISO));

      const responsePayload = {
        artistSlug: normalizedSlug,
        artistName: normalizedName,
        fetchedAt: new Date().toISOString(),
        shows
      };
      const response = new Response(JSON.stringify(responsePayload), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": `public, max-age=${Math.max(60, ttlSeconds || 1800)}`
        }
      });
      await cache.put(cacheKey, response);

      return {
        shows,
        cacheState: "live",
        fetchedAt: responsePayload.fetchedAt,
        error: null
      };
    } catch (err) {
      return {
        shows: [],
        cacheState: "error",
        error: err && err.message ? err.message : "ticketmaster_discovery_error"
      };
    }
  })();

  IN_FLIGHT_ARTIST_DISCOVERY_REQUESTS.set(inflightKey, requestTask);
  try {
    return await requestTask;
  } finally {
    IN_FLIGHT_ARTIST_DISCOVERY_REQUESTS.delete(inflightKey);
  }
}

function normalizeQueryValue(value) {
  return String(value || "").trim().toLowerCase();
}

function filterShows(shows, params) {
  const artistSlug = normalizeQueryValue(params.get("artistSlug"));
  const city = normalizeQueryValue(params.get("city"));
  const country = normalizeQueryValue(params.get("country"));
  const venue = normalizeQueryValue(params.get("venue"));
  const from = params.get("from");
  const to = params.get("to");
  const showId = params.get("showId");

  const fromTs = from ? Date.parse(from) : Number.NaN;
  const toTs = to ? Date.parse(to) : Number.NaN;

  return shows.filter((show) => {
    if (showId && show.id !== showId) return false;
    if (artistSlug && normalizeQueryValue(show.artist_slug) !== artistSlug) return false;
    if (city && !normalizeQueryValue(show.city).includes(city)) return false;
    if (country && !normalizeQueryValue(show.country).includes(country)) return false;
    if (venue && !normalizeQueryValue(show.venue).includes(venue)) return false;

    const dt = Date.parse(show.dateTimeISO);
    if (Number.isFinite(fromTs) && dt < fromTs) return false;
    if (Number.isFinite(toTs) && dt > toTs) return false;
    return true;
  });
}

function getEnvBoolean(value, fallback) {
  if (value == null) return fallback;
  return String(value).toLowerCase() === "true";
}

function getEnvNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function parsePositiveInt(value, fallback) {
  const parsed = Number.parseInt(String(value || ""), 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function titleCaseFromSlug(slug) {
  return String(slug || "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function isLikelyPlaceholderUrl(rawUrl) {
  const source = String(rawUrl || "").toLowerCase();
  if (!source) return true;
  if (PLACEHOLDER_URL_MARKERS.some((token) => source.includes(token))) return true;
  try {
    const parsed = new URL(source);
    return PLACEHOLDER_HOST_REGEX.test(parsed.hostname);
  } catch (err) {
    return true;
  }
}

function isUsableAffiliateUrl(rawUrl) {
  if (typeof rawUrl !== "string") return false;
  const trimmed = rawUrl.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;
    return !isLikelyPlaceholderUrl(trimmed);
  } catch (err) {
    return false;
  }
}

function providerKey(provider) {
  return String(provider || "").toLowerCase().replace(/\s+/g, "");
}

// Public SeatGeek CTA availability is tied to Impact affiliate-link creation,
// not to SeatGeek API discovery credentials. SeatGeek API credentials are only
// for debug/future proposal tooling and should not gate approved event URLs.
function hasSeatGeekProviderConfig(env = {}) {
  const hasBaseTrackingUrl = Boolean(String(env?.IMPACT_SEATGEEK_BASE_TRACKING_URL || "").trim());
  const hasImpactApiConfig = Boolean(
    String(env?.IMPACT_SEATGEEK_ACCOUNT_SID || env?.IMPACT_ACCOUNT_SID || "").trim() &&
    String(env?.IMPACT_SEATGEEK_AUTH_TOKEN || env?.IMPACT_AUTH_TOKEN || "").trim() &&
    String(env?.IMPACT_SEATGEEK_CAMPAIGN_ID || env?.IMPACT_SEATGEEK_PROGRAM_ID || "").trim()
  );
  return hasBaseTrackingUrl || hasImpactApiConfig;
}

function validSeatGeekEventUrl(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || isLikelyPlaceholderUrl(trimmed)) return null;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    const path = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
    if (host !== "seatgeek.com" && host !== "www.seatgeek.com") return null;
    if (!path || path === "/") return null;
    if (/^\/(search|venues?|performers?|artists?|concert-tickets|tickets)(?:\/|$)/i.test(path)) return null;
    return /\/(concert|sports|theater|theatre)\/\d+$/i.test(path) ? parsed.toString() : null;
  } catch (err) {
    return null;
  }
}

function hasVividSeatsProviderConfig(env = {}) {
  const hasBaseTrackingUrl = Boolean(String(env?.IMPACT_VIVIDSEATS_BASE_TRACKING_URL || "").trim());
  const hasImpactApiConfig = Boolean(
    String(env?.IMPACT_VIVIDSEATS_ACCOUNT_SID || env?.IMPACT_ACCOUNT_SID || "").trim() &&
    String(env?.IMPACT_VIVIDSEATS_AUTH_TOKEN || env?.IMPACT_AUTH_TOKEN || "").trim() &&
    String(env?.IMPACT_VIVIDSEATS_CAMPAIGN_ID || env?.IMPACT_VIVIDSEATS_PROGRAM_ID || "").trim()
  );
  return hasBaseTrackingUrl || hasImpactApiConfig;
}

function validVividSeatsEventUrl(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || isLikelyPlaceholderUrl(trimmed)) return null;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    const path = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
    if (host !== "vividseats.com" && host !== "www.vividseats.com") return null;
    if (!path || path === "/") return null;
    if (/^\/(search|venues?|performers?|artists?|category|concerts?|sports?|theater|theatre)(?:\/|$)/i.test(path)) return null;
    return /\/production\/\d+$/i.test(path) ? parsed.toString() : null;
  } catch (err) {
    return null;
  }
}

// Per-provider event publishability. Keep in sync with
// providerEventPublishable in functions/api/out.js, functions/[[path]].js
// and public/app.js: a needs_recheck event may publish a SeatGeek CTA only
// when the SeatGeek link carries its own verified provenance.
const PUBLISHABLE_VERIFICATION_STATUSES = new Set(["human_verified", "machine_high_confidence"]);

function eventLinkPublishable(event) {
  const status = String(event?.verification_status || "").trim().toLowerCase();
  if (status) return PUBLISHABLE_VERIFICATION_STATUSES.has(status);
  return event?.provider_links?.ticketmaster?.verified === true;
}

function providerEventPublishable(event, provider) {
  if (provider === "seatgeek" && event?.provider_links?.seatgeek?.verified === true) return true;
  if (provider === "vivid-seats" && event?.provider_links?.["vivid-seats"]?.verified === true) return true;
  return eventLinkPublishable(event);
}

function withResolvableProviderCtas(shows, env = {}) {
  const seatGeekConfigured = hasSeatGeekProviderConfig(env);
  const vividSeatsConfigured = hasVividSeatsProviderConfig(env);
  return shows.map((show) => ({
    ...show,
    provider_ctas: {
      ...(show.provider_ctas && typeof show.provider_ctas === "object" ? show.provider_ctas : {}),
      seatgeek: Boolean(
        seatGeekConfigured &&
        providerEventPublishable(show, "seatgeek") &&
        validSeatGeekEventUrl(show.seatgeek_url)
      ),
      vividseats: Boolean(
        vividSeatsConfigured &&
        providerEventPublishable(show, "vivid-seats") &&
        validVividSeatsEventUrl(show.vividseats_url)
      )
    }
  }));
}

function getProviderDeepLink(show, provider, fallbackUrl) {
  const key = providerKey(provider);
  const candidate = String(show?.[`${key}_deep_link`] || show?.impact_deep_link || fallbackUrl || "").trim();
  return isUsableAffiliateUrl(candidate) ? candidate : null;
}

function getAffiliateUrl(show, provider) {
  if (!show) return null;
  const key = providerKey(provider);
  const fromLinks = show.links && typeof show.links === "object" ? show.links[key] : null;
  const fromFields = show[`${key}_url`];
  const value = typeof fromLinks === "string" && fromLinks.trim().length
    ? fromLinks
    : fromFields;
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed.length) return null;
  return isUsableAffiliateUrl(trimmed) ? trimmed : null;
}

const SEATGEEK_APPROVED_PRICE_SOURCE = "seatgeek_partner_api";
const VIVIDSEATS_APPROVED_PRICE_SOURCE = "vividseats_approved_feed";

function getPricingDb(env) {
  const candidate = env?.DEMAND_DB || env?.DB;
  return candidate && typeof candidate.prepare === "function" ? candidate : null;
}

function unavailableProviderPrice(provider, show, error = null) {
  return {
    provider,
    price: null,
    currency: "USD",
    url: buildProviderUrl(show, provider),
    fetchedAt: new Date().toISOString(),
    status: "unavailable",
    ...(error ? { error } : {})
  };
}

async function fetchSeatGeekCachedPrice(show, env) {
  if (!getEnvBoolean(env?.SEATGEEK_PRICE_DISPLAY_ENABLED, false)) {
    return unavailableProviderPrice("SeatGeek", show);
  }

  if (!validSeatGeekEventUrl(show?.seatgeek_url)) {
    return unavailableProviderPrice("SeatGeek", show);
  }

  const showId = String(show?.id || "").trim();
  if (!showId) return unavailableProviderPrice("SeatGeek", show);

  const db = getPricingDb(env);
  if (!db) return unavailableProviderPrice("SeatGeek", show);

  try {
    const row = await db
      .prepare(
        `SELECT low_price, avg_price, high_price, currency, inventory_count, verified_at, expires_at, source
         FROM provider_pricing_cache
         WHERE event_id = ?1
           AND provider = ?2
           AND source = ?3
         LIMIT 1`
      )
      .bind(showId, "seatgeek", SEATGEEK_APPROVED_PRICE_SOURCE)
      .first();

    if (!row || typeof row !== "object") return unavailableProviderPrice("SeatGeek", show);

    const lowPrice = Number(row.low_price);
    if (!Number.isFinite(lowPrice) || lowPrice < 0) return unavailableProviderPrice("SeatGeek", show);

    const currency = String(row.currency || "").trim();
    if (!currency) return unavailableProviderPrice("SeatGeek", show);

    const verifiedAt = String(row.verified_at || "").trim();
    const verifiedAtMs = Date.parse(verifiedAt);
    if (!Number.isFinite(verifiedAtMs)) return unavailableProviderPrice("SeatGeek", show);

    const expiresAt = String(row.expires_at || "").trim();
    const expiresAtMs = Date.parse(expiresAt);
    if (!Number.isFinite(expiresAtMs) || expiresAtMs <= Date.now()) {
      return unavailableProviderPrice("SeatGeek", show);
    }

    const inventoryCount = Number(row.inventory_count);

    return {
      provider: "SeatGeek",
      price: lowPrice,
      currency,
      url: buildProviderUrl(show, "SeatGeek"),
      fetchedAt: verifiedAt,
      status: "ok",
      source: SEATGEEK_APPROVED_PRICE_SOURCE,
      expiresAt,
      inventoryCount: Number.isFinite(inventoryCount) && inventoryCount >= 0 ? inventoryCount : null
    };
  } catch (err) {
    return unavailableProviderPrice("SeatGeek", show);
  }
}

async function fetchVividSeatsCachedPrice(show, env) {
  if (!getEnvBoolean(env?.VIVIDSEATS_PRICE_DISPLAY_ENABLED, false)) {
    return unavailableProviderPrice("Vivid Seats", show);
  }

  if (!validVividSeatsEventUrl(show?.vividseats_url)) {
    return unavailableProviderPrice("Vivid Seats", show);
  }

  const showId = String(show?.id || "").trim();
  if (!showId) return unavailableProviderPrice("Vivid Seats", show);

  const db = getPricingDb(env);
  if (!db) return unavailableProviderPrice("Vivid Seats", show);

  try {
    const row = await db
      .prepare(
        `SELECT low_price, avg_price, high_price, currency, inventory_count, verified_at, expires_at, source
         FROM provider_pricing_cache
         WHERE event_id = ?1
           AND provider = ?2
           AND source = ?3
         LIMIT 1`
      )
      .bind(showId, "vivid-seats", VIVIDSEATS_APPROVED_PRICE_SOURCE)
      .first();

    if (!row || typeof row !== "object") return unavailableProviderPrice("Vivid Seats", show);

    const lowPrice = Number(row.low_price);
    if (!Number.isFinite(lowPrice) || lowPrice < 0) return unavailableProviderPrice("Vivid Seats", show);

    const currency = String(row.currency || "").trim();
    if (!currency) return unavailableProviderPrice("Vivid Seats", show);

    const verifiedAt = String(row.verified_at || "").trim();
    const verifiedAtMs = Date.parse(verifiedAt);
    if (!Number.isFinite(verifiedAtMs)) return unavailableProviderPrice("Vivid Seats", show);

    const expiresAt = String(row.expires_at || "").trim();
    const expiresAtMs = Date.parse(expiresAt);
    if (!Number.isFinite(expiresAtMs) || expiresAtMs <= Date.now()) {
      return unavailableProviderPrice("Vivid Seats", show);
    }

    const inventoryCount = Number(row.inventory_count);

    return {
      provider: "Vivid Seats",
      price: lowPrice,
      currency,
      url: buildProviderUrl(show, "Vivid Seats"),
      fetchedAt: verifiedAt,
      status: "ok",
      source: VIVIDSEATS_APPROVED_PRICE_SOURCE,
      expiresAt,
      inventoryCount: Number.isFinite(inventoryCount) && inventoryCount >= 0 ? inventoryCount : null
    };
  } catch (err) {
    return unavailableProviderPrice("Vivid Seats", show);
  }
}

function buildProviderUrl(show, provider) {
  const affiliate = getAffiliateUrl(show, provider);
  if (affiliate) return affiliate;
  return null;
}

function buildAffiliateActionUrl(show, provider, deepLink) {
  const params = new URLSearchParams({
    showId: String(show?.id || ""),
    provider: String(provider || "")
  });
  if (deepLink && String(providerKey(provider)) !== "ticketmaster") {
    params.set("deepLink", deepLink);
  }
  return `/api/out?${params.toString()}`;
}

function decorateProviderResult(result, show, provider, env) {
  const key = providerKey(provider);
  const directUrl = getProviderDeepLink(show, provider, result?.url);
  const hasVerifiedTicketmasterEventUrl = key === "ticketmaster" && Boolean(getAffiliateUrl(show, provider));
  const canUseSafeEventRedirect = hasVerifiedTicketmasterEventUrl;
  const actionUrl = canUseSafeEventRedirect ? buildAffiliateActionUrl(show, provider, directUrl) : null;
  const baseStatus = result?.status || "unavailable";
  const isSeatGeekPriceSnapshot = key === "seatgeek" &&
    baseStatus === "ok" &&
    result?.source === SEATGEEK_APPROVED_PRICE_SOURCE;
  const status = isSeatGeekPriceSnapshot ? "ok" : canUseSafeEventRedirect ? "affiliate_ready" : "unavailable";
  const note = isSeatGeekPriceSnapshot
    ? "SeatGeek price snapshot is sourced from the approved SeatGeek partner API and requires freshness checks before display."
    : canUseSafeEventRedirect
      ? key === "ticketmaster"
        ? "Ticketmaster event link is verified and routed through a safe event-specific redirect."
        : "Affiliate redirect is ready for this provider."
      : directUrl
        ? "A real provider destination exists, but this provider still needs a confirmed safe affiliate route before it can be enabled."
        : "No verified provider destination is available for this lane.";

  return {
    provider,
    price: baseStatus === "ok" && Number.isFinite(Number(result?.price)) ? Number(result.price) : null,
    currency: result?.currency || "USD",
    fetchedAt: result?.fetchedAt || new Date().toISOString(),
    status,
    providerStatus: baseStatus,
    cacheState: result?.cacheState || "live",
    rateLimited: Boolean(result?.rateLimited),
    error: result?.error || null,
    source: result?.source || null,
    expiresAt: result?.expiresAt || null,
    inventoryCount: Number.isFinite(Number(result?.inventoryCount)) ? Number(result.inventoryCount) : null,
    url: actionUrl,
    actionUrl,
    note
  };
}

function createMockAdapter(provider, options = {}) {
  const allowMockPrices = Boolean(options.allowMockPrices);
  return {
    provider,
    async fetchLowestPrice(show) {
      if (!allowMockPrices) {
        return {
          provider,
          price: null,
          currency: "USD",
          url: buildProviderUrl(show, provider),
          fetchedAt: new Date().toISOString(),
          status: "unavailable"
        };
      }

      const dayKey = new Date().toISOString().slice(0, 10);
      const seed = `${show.id}:${provider}:${dayKey}`;
      const hash = hashString(seed);
      const latency = 80 + (hash % 170);
      await new Promise((resolve) => setTimeout(resolve, latency));

      const roll = hash % 100;
      if (roll < 6) {
        const err = new Error("Timeout");
        err.code = "ETIMEDOUT";
        throw err;
      }

      if (roll < 18) {
        return {
          provider,
          price: null,
          currency: "USD",
          url: buildProviderUrl(show, provider),
          fetchedAt: new Date().toISOString(),
          status: "unavailable"
        };
      }

      const providerOffset = provider === "SeatGeek"
        ? -12
        : provider === "Vivid Seats"
          ? -3
          : 8;
      const base = 130 + (hash % 190) + providerOffset;
      const price = Math.max(35, base);

      return {
        provider,
        price,
        currency: "USD",
        url: buildProviderUrl(show, provider),
        fetchedAt: new Date().toISOString(),
        status: "ok"
      };
    }
  };
}

function createLiveAdapter(provider, env) {
  return {
    provider,
    async fetchLowestPrice(show) {
      if (provider === "SeatGeek") {
        return fetchSeatGeekCachedPrice(show, env);
      }

      if (provider === "Vivid Seats") {
        return fetchVividSeatsCachedPrice(show, env);
      }

      if (provider !== "Ticketmaster") {
        return unavailableProviderPrice(provider, show);
      }

      const apiKey = String(env?.TICKETMASTER_API_KEY || "").trim();
      if (!apiKey) {
        return {
          provider,
          price: null,
          currency: "USD",
          url: buildProviderUrl(show, provider),
          fetchedAt: new Date().toISOString(),
          status: "unavailable"
        };
      }

      const rawEventId = String(show?.ticketmaster_event_id || show?.id || "").trim();
      const eventId = rawEventId.startsWith("tm-") ? rawEventId.slice(3) : rawEventId;
      if (!eventId) {
        return {
          provider,
          price: null,
          currency: "USD",
          url: buildProviderUrl(show, provider),
          fetchedAt: new Date().toISOString(),
          status: "unavailable"
        };
      }

      const baseUrl = String(env?.TICKETMASTER_DISCOVERY_BASE_URL || DEFAULT_TICKETMASTER_DISCOVERY_BASE).replace(/\/+$/, "");
      const discoveryPriceChecksEnabled = getEnvBoolean(env?.TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED, true);
      if (!discoveryPriceChecksEnabled) {
        return {
          provider,
          price: null,
          currency: "USD",
          url: buildProviderUrl(show, provider),
          fetchedAt: new Date().toISOString(),
          status: "unavailable"
        };
      }
      const endpoint = `${baseUrl}/events/${encodeURIComponent(eventId)}.json?apikey=${encodeURIComponent(apiKey)}`;
      const res = await fetch(endpoint, {
        headers: { Accept: "application/json" }
      });
      if (!res.ok) {
        throw new Error(`ticketmaster_event_http_${res.status}`);
      }

      const payload = await res.json();
      const ranges = Array.isArray(payload?.priceRanges) ? payload.priceRanges : [];
      let minPrice = null;
      let currency = "USD";
      for (const range of ranges) {
        if (!range || typeof range !== "object") continue;
        if (typeof range.currency === "string" && range.currency.trim()) {
          currency = range.currency.trim();
        }
        const candidate = Number(range.min);
        if (!Number.isFinite(candidate)) continue;
        if (minPrice == null || candidate < minPrice) {
          minPrice = candidate;
        }
      }

      const ticketmasterUrl = isUsableAffiliateUrl(payload?.url) ? payload.url : buildProviderUrl(show, provider);
      return {
        provider,
        price: minPrice,
        currency,
        url: ticketmasterUrl,
        fetchedAt: new Date().toISOString(),
        status: minPrice != null ? "ok" : "unavailable"
      };
    }
  };
}

function createProviders(mockMode, allowMockPrices, env) {
  return ["Ticketmaster", "SeatGeek", "Vivid Seats"].map((name) =>
    mockMode ? createMockAdapter(name, { allowMockPrices }) : createLiveAdapter(name, env)
  );
}

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function buildCacheKey(showId, provider) {
  return `https://cache.local/prices-v2-real-affiliate?showId=${encodeURIComponent(
    showId
  )}&provider=${encodeURIComponent(provider)}`;
}

function buildStaleCacheKey(showId, provider) {
  return `https://cache.local/prices-stale-v2-real-affiliate?showId=${encodeURIComponent(
    showId
  )}&provider=${encodeURIComponent(provider)}`;
}

function buildRateLimitKey(provider, dateKey) {
  return `https://cache.local/ratelimit?provider=${encodeURIComponent(
    provider
  )}&date=${encodeURIComponent(dateKey)}`;
}

function secondsUntilUtcMidnight(now = new Date()) {
  const nextDay = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1
  ));
  return Math.max(60, Math.floor((nextDay - now) / 1000));
}

function getRateLimitDb(env) {
  const candidate = env?.RATE_LIMIT_DB || env?.DB;
  if (candidate && typeof candidate.prepare === "function") return candidate;
  return null;
}

async function ensureRateLimitSchema(db) {
  // Best-effort. In production, create this table once via a migration.
  // D1 will just no-op if it already exists.
  try {
    await db.prepare(
      `CREATE TABLE IF NOT EXISTS daily_provider_calls (
        provider TEXT NOT NULL,
        day TEXT NOT NULL,
        count INTEGER NOT NULL,
        updated_at TEXT NOT NULL,
        PRIMARY KEY (provider, day)
      )`
    ).run();
  } catch (err) {
    // Ignore schema errors; we can still fall back to cache-based limits.
  }
}

async function checkAndIncrementDailyCapD1(db, provider, day, dailyCap) {
  // Atomically increments only if count < dailyCap.
  // Returns { allowed: boolean, count: number } where count is the current count.
  const now = new Date().toISOString();

  // Attempt insert-or-increment with a cap condition.
  try {
    const stmt = db.prepare(
      `INSERT INTO daily_provider_calls (provider, day, count, updated_at)
       VALUES (?1, ?2, 1, ?3)
       ON CONFLICT(provider, day) DO UPDATE SET
         count = count + 1,
         updated_at = excluded.updated_at
       WHERE daily_provider_calls.count < ?4
       RETURNING count`
    ).bind(provider, day, now, dailyCap);

    const row = await stmt.first();
    if (row && typeof row.count === "number") {
      return { allowed: true, count: row.count };
    }
  } catch (err) {
    // If RETURNING isn't supported or schema missing, we'll try a safer fallback below.
  }

  // Fallback: read current count; do not increment (not strictly enforcing in a race).
  try {
    const row = await db.prepare(
      `SELECT count FROM daily_provider_calls WHERE provider = ?1 AND day = ?2`
    ).bind(provider, day).first();

    const count = row && typeof row.count === "number" ? row.count : 0;
    return { allowed: count < dailyCap, count };
  } catch (err) {
    return { allowed: true, count: 0 };
  }
}

async function getDailyCount(cache, provider) {
  const dateKey = new Date().toISOString().slice(0, 10);
  const key = buildRateLimitKey(provider, dateKey);
  const ttlSeconds = secondsUntilUtcMidnight();
  const cached = await cache.match(key);
  if (!cached) {
    return { count: 0, key, ttlSeconds };
  }
  try {
    const data = await cached.json();
    return { count: Number(data.count) || 0, key, ttlSeconds };
  } catch (err) {
    return { count: 0, key, ttlSeconds };
  }
}

async function setDailyCount(cache, key, count, ttlSeconds) {
  const response = new Response(JSON.stringify({
    count,
    updatedAt: new Date().toISOString()
  }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": `public, max-age=${ttlSeconds}`
    }
  });
  await cache.put(key, response);
}

async function getProviderPrice(show, adapter, cache, ttlSeconds, rateLimitConfig) {
  const env = rateLimitConfig?.env || {};
  const bypassProviderCache = (adapter.provider === "SeatGeek" && getEnvBoolean(env?.SEATGEEK_PRICE_DISPLAY_ENABLED, false))
    || (adapter.provider === "Vivid Seats" && getEnvBoolean(env?.VIVIDSEATS_PRICE_DISPLAY_ENABLED, false));
  const cacheKey = buildCacheKey(show.id, adapter.provider);
  const cached = bypassProviderCache ? null : await cache.match(cacheKey);
  if (cached) {
    const data = await cached.json();
    const sanitizedUrl = isUsableAffiliateUrl(data && data.url)
      ? data.url
      : buildProviderUrl(show, adapter.provider);
    if (data && typeof data === "object" && !Array.isArray(data) && !data.url) {
      return decorateProviderResult({
        ...data,
        cacheState: data.cacheState || "cached",
        url: sanitizedUrl
      }, show, adapter.provider, env);
    }
    if (data && typeof data === "object" && !Array.isArray(data)) {
      return decorateProviderResult({
        ...data,
        cacheState: data.cacheState || "cached",
        url: sanitizedUrl
      }, show, adapter.provider, env);
    }
    return data;
  }

  const inflightKey = `${show.id}:${adapter.provider}`;
  const existingInFlight = IN_FLIGHT_PROVIDER_REQUESTS.get(inflightKey);
  if (existingInFlight) {
    return existingInFlight;
  }

  const task = (async () => {
    const isRateLimitedProvider = Boolean(rateLimitConfig) &&
      adapter.provider === rateLimitConfig.provider &&
      rateLimitConfig.dailyCap > 0;

    if (isRateLimitedProvider) {
      const dayKey = new Date().toISOString().slice(0, 10);
      const db = getRateLimitDb(rateLimitConfig.env);
      if (db) {
        await ensureRateLimitSchema(db);
        const { allowed, count } = await checkAndIncrementDailyCapD1(
          db,
          adapter.provider,
          dayKey,
          rateLimitConfig.dailyCap
        );
        if (!allowed) {
          const staleCached = await cache.match(buildStaleCacheKey(show.id, adapter.provider));
          if (staleCached) {
            const staleData = await staleCached.json();
            const staleUrl = isUsableAffiliateUrl(staleData && staleData.url)
              ? staleData.url
              : buildProviderUrl(show, adapter.provider);
            return decorateProviderResult({
              ...(staleData && typeof staleData === "object" ? staleData : {}),
              url: staleUrl,
              status: "stale",
              rateLimited: true,
              cacheState: "stale"
            }, show, adapter.provider, env);
          }

          return decorateProviderResult({
            provider: adapter.provider,
            price: null,
            currency: "USD",
            url: buildProviderUrl(show, adapter.provider),
            fetchedAt: new Date().toISOString(),
            status: "rate_limited",
            dailyCount: count,
            cacheState: "rate_limited"
          }, show, adapter.provider, env);
        }
      } else {
        // Fallback (not strictly durable): use caches.default as a best-effort limiter.
        const { count, key, ttlSeconds: dailyTtl } = await getDailyCount(cache, adapter.provider);
        if (count >= rateLimitConfig.dailyCap) {
          const staleCached = await cache.match(buildStaleCacheKey(show.id, adapter.provider));
          if (staleCached) {
            const staleData = await staleCached.json();
            const staleUrl = isUsableAffiliateUrl(staleData && staleData.url)
              ? staleData.url
              : buildProviderUrl(show, adapter.provider);
            return decorateProviderResult({
              ...(staleData && typeof staleData === "object" ? staleData : {}),
              url: staleUrl,
              status: "stale",
              rateLimited: true,
              cacheState: "stale"
            }, show, adapter.provider, env);
          }

          return decorateProviderResult({
            provider: adapter.provider,
            price: null,
            currency: "USD",
            url: buildProviderUrl(show, adapter.provider),
            fetchedAt: new Date().toISOString(),
            status: "rate_limited",
            dailyCount: count,
            cacheState: "rate_limited"
          }, show, adapter.provider, env);
        }

        await setDailyCount(cache, key, count + 1, dailyTtl);
      }
    }

    try {
      const data = await adapter.fetchLowestPrice(show);
      const normalizedUrl = isUsableAffiliateUrl(data && data.url)
        ? data.url
        : buildProviderUrl(show, adapter.provider);
      const normalized = {
        provider: adapter.provider,
        price: data.price ?? null,
        currency: data.currency || "USD",
        url: normalizedUrl,
        fetchedAt: data.fetchedAt || new Date().toISOString(),
        status: data.status || (data.price ? "ok" : "unavailable"),
        source: data.source || null,
        expiresAt: data.expiresAt || null,
        inventoryCount: Number.isFinite(Number(data.inventoryCount)) ? Number(data.inventoryCount) : null,
        cacheState: "live"
      };

      const response = new Response(JSON.stringify(normalized), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": `public, max-age=${ttlSeconds}`
        }
      });

      if (!bypassProviderCache) {
        await cache.put(cacheKey, response.clone());
      }

      if (isRateLimitedProvider && rateLimitConfig.staleTtlSeconds > 0) {
        const staleResponse = new Response(JSON.stringify(normalized), {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": `public, max-age=${rateLimitConfig.staleTtlSeconds}`
          }
        });
        await cache.put(buildStaleCacheKey(show.id, adapter.provider), staleResponse);
      }

      return decorateProviderResult(normalized, show, adapter.provider, env);
    } catch (err) {
      const fallback = {
        provider: adapter.provider,
        price: null,
        currency: "USD",
        url: buildProviderUrl(show, adapter.provider),
        fetchedAt: new Date().toISOString(),
        status: "unavailable",
        error: err.code || "error",
        cacheState: "live"
      };

      const response = new Response(JSON.stringify(fallback), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": `public, max-age=${ttlSeconds}`
        }
      });

      if (!bypassProviderCache) {
        await cache.put(cacheKey, response.clone());
      }
      return decorateProviderResult(fallback, show, adapter.provider, env);
    }
  })();

  IN_FLIGHT_PROVIDER_REQUESTS.set(inflightKey, task);
  try {
    return await task;
  } finally {
    IN_FLIGHT_PROVIDER_REQUESTS.delete(inflightKey);
  }
}

export async function onRequestGet({ request, env }) {
  const mockMode = false;
  const allowMockPrices = false;
  const ticketmasterDiscoveryEnabled = getEnvBoolean(env.TICKETMASTER_DISCOVERY_ENABLED, true);
  const ttlMinutes = Math.max(1, getEnvNumber(env.CACHE_TTL_MINUTES, 60));
  const ttlSeconds = ttlMinutes * 60;
  const ticketmasterEventsTtlMinutes = Math.max(5, getEnvNumber(env.TICKETMASTER_EVENTS_TTL_MINUTES, 30));
  const ticketmasterEventsTtlSeconds = ticketmasterEventsTtlMinutes * 60;
  const ticketmasterArtistEventsLimit = Math.max(
    1,
    Math.min(200, parsePositiveInt(env.TICKETMASTER_ARTIST_EVENTS_LIMIT, DEFAULT_TICKETMASTER_ARTIST_EVENTS_LIMIT))
  );
  const ticketmasterDailyCap = Math.max(0, getEnvNumber(env.TICKETMASTER_DAILY_CAP, 1000));
  const ticketmasterStaleTtlHours = Math.max(0, getEnvNumber(env.TICKETMASTER_STALE_TTL_HOURS, 168));
  const ticketmasterStaleTtlSeconds = ticketmasterStaleTtlHours * 60 * 60;

  const cache = caches.default;
  const providers = createProviders(mockMode, allowMockPrices, env);
  const rateLimitConfig = {
    env,
    provider: "Ticketmaster",
    dailyCap: ticketmasterDailyCap,
    staleTtlSeconds: ticketmasterStaleTtlSeconds
  };

  const events = await loadEventsFromAssets(env);
  const allShows = mapEventsToShows(events);
  const url = request ? new URL(request.url) : null;
  const artistSlugParam = url ? slugify(url.searchParams.get("artistSlug")) : "";
  const sourceParam = url ? normalizeQueryValue(url.searchParams.get("source")) : "";
  const liveArtistParam = url ? normalizeQueryValue(url.searchParams.get("liveArtist")) : "";
  const forceTicketmasterArtist = sourceParam === "ticketmaster" || liveArtistParam === "true";
  const discoveryCountry = String(env.TICKETMASTER_DISCOVERY_COUNTRY || "").trim();
  let sourceShows = allShows;
  let artistFeed = {
    enabled: ticketmasterDiscoveryEnabled,
    used: false,
    cacheState: "local",
    source: "local",
    count: 0,
    error: null
  };

  if (ticketmasterDiscoveryEnabled && artistSlugParam) {
    const hasLocalArtistShows = allShows.some((show) => slugify(show.artist_slug) === artistSlugParam);
    const shouldUseDiscovery = forceTicketmasterArtist || !hasLocalArtistShows;
    if (shouldUseDiscovery) {
      const artists = await loadArtistsFromAssets(env);
      const artistName = resolveArtistName(artistSlugParam, artists, allShows);
      const discoveryResult = await fetchTicketmasterArtistEvents({
        env,
        cache,
        artistSlug: artistSlugParam,
        artistName,
        countryCode: discoveryCountry,
        limit: ticketmasterArtistEventsLimit,
        ttlSeconds: ticketmasterEventsTtlSeconds
      });

      const fetchedShows = Array.isArray(discoveryResult.shows) ? discoveryResult.shows : [];
      artistFeed = {
        enabled: true,
        used: true,
        cacheState: discoveryResult.cacheState || "error",
        source: "ticketmaster-discovery",
        count: fetchedShows.length,
        error: discoveryResult.error || null
      };

      if (forceTicketmasterArtist) {
        sourceShows = allShows
          .filter((show) => slugify(show.artist_slug) !== artistSlugParam)
          .concat(fetchedShows);
      } else if (fetchedShows.length > 0) {
        sourceShows = allShows.concat(fetchedShows);
      }
    } else {
      artistFeed = {
        enabled: true,
        used: false,
        cacheState: "local",
        source: "local",
        count: 0,
        error: null
      };
    }
  }

  const filteredShows = url ? filterShows(sourceShows, url.searchParams) : sourceShows;
  const includePricesParam = url ? String(url.searchParams.get("includePrices") || "").toLowerCase() : "";
  const showId = url ? String(url.searchParams.get("showId") || "").trim() : "";
  const includesShowId = Boolean(showId);
  const includePrices = includePricesParam === "true" || includesShowId;
  const offset = url ? parsePositiveInt(url.searchParams.get("offset"), 0) : 0;
  const requestedLimit = url ? parsePositiveInt(url.searchParams.get("limit"), DEFAULT_LIST_LIMIT) : DEFAULT_LIST_LIMIT;
  const limit = Math.min(MAX_LIST_LIMIT, Math.max(1, requestedLimit));

  if (includePrices && !includesShowId) {
    return new Response(
      JSON.stringify({
        error: "includePrices requires showId",
        message: "Request provider prices with /api/shows?showId=<id>&includePrices=true to avoid bulk provider fan-out."
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  const requestedShows = withResolvableProviderCtas(
    includesShowId ? filteredShows : filteredShows.slice(offset, offset + limit),
    env
  );

  if (!includePrices) {
    return new Response(
      JSON.stringify({
        generatedAt: new Date().toISOString(),
        cacheTtlMinutes: ttlMinutes,
        mockMode,
        allowMockPrices,
        artistFeed,
        includePrices: false,
        providerAvailability: {
          seatgeek: hasSeatGeekProviderConfig(env),
          vividseats: hasVividSeatsProviderConfig(env)
        },
        pagination: {
          offset,
          limit,
          total: filteredShows.length,
          returned: requestedShows.length
        },
        shows: requestedShows
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=120"
        }
      }
    );
  }

  const shows = await Promise.all(
    requestedShows.map(async (show) => {
      const prices = await Promise.all(
        providers.map((adapter) => getProviderPrice(show, adapter, cache, ttlSeconds, rateLimitConfig))
      );
      return { ...show, prices };
    })
  );

  return new Response(
    JSON.stringify({
      generatedAt: new Date().toISOString(),
      cacheTtlMinutes: ttlMinutes,
      mockMode,
      allowMockPrices,
      artistFeed,
      includePrices: true,
      providerAvailability: {
        seatgeek: hasSeatGeekProviderConfig(env),
        vividseats: hasVividSeatsProviderConfig(env)
      },
      shows
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=${ttlSeconds}`
      }
    }
  );
}
