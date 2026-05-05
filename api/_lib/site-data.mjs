import { readFile } from "node:fs/promises";
import { getImpactReadiness } from "./impact.mjs";

const eventsFileUrl = new URL("../../public/data/events.json", import.meta.url);
const artistsFileUrl = new URL("../../public/data/artists.json", import.meta.url);
const discoveryBaseUrl = "https://app.ticketmaster.com/discovery/v2";
const placeholderUrlPattern = /example\.com|placeholder|your-link|replace-me|localhost|127\.0\.0\.1/i;

function safeJsonParse(text, fallback) {
  try {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (error) {
    return fallback;
  }
}

export function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function isPlaceholderUrl(value) {
  return placeholderUrlPattern.test(String(value || ""));
}

export function getBooleanEnv(value, fallback = false) {
  if (value == null || value === "") return fallback;
  return String(value).toLowerCase() === "true";
}

export function providerKey(provider) {
  return String(provider || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

export function providerEnvPrefix(provider) {
  const key = providerKey(provider);
  if (key === "ticketmaster") return "TICKETMASTER";
  if (key === "seatgeek") return "SEATGEEK";
  if (key === "vividseats") return "VIVIDSEATS";
  return key.toUpperCase();
}

export function getImpactProgramId(show, provider, env = process.env) {
  const key = providerKey(provider);
  const prefix = providerEnvPrefix(provider);
  return String(
    show?.[`${key}_impact_program_id`] ||
      show?.impact_program_id ||
      env?.[`IMPACT_${prefix}_PROGRAM_ID`] ||
      env?.IMPACT_DEFAULT_PROGRAM_ID ||
      ""
  ).trim();
}

export function getProviderDeepLink(show, provider, fallbackUrl) {
  const key = providerKey(provider);
  const candidate = String(show?.[`${key}_deep_link`] || show?.impact_deep_link || fallbackUrl || "").trim();
  return candidate && !isPlaceholderUrl(candidate) ? candidate : "";
}

export async function loadArtists() {
  const raw = await readFile(artistsFileUrl, "utf8");
  return safeJsonParse(raw, []);
}

export async function loadSeedEvents() {
  const raw = await readFile(eventsFileUrl, "utf8");
  return safeJsonParse(raw, []);
}

function parseDate(value) {
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : null;
}

export function mapSeedEvents(events) {
  return events
    .filter((event) => event && typeof event === "object")
    .map((event) => ({
      id: event.id,
      artist_slug: event.artist_slug,
      artist_name: event.artist_name || event.artist || "",
      artist: event.artist_name || event.artist || "",
      city: event.city || "",
      country: event.country || "",
      venue: event.venue || "",
      dateTimeISO: event.datetime_iso || event.dateTimeISO || null,
      timezone: event.timezone || "",
      tour_name: event.tour_name || "",
      status: event.status || "announced",
      ticketmaster_event_id: event.ticketmaster_event_id || null,
      seatgeek_event_id: event.seatgeek_event_id || null,
      vividseats_event_id: event.vividseats_event_id || null,
      ticketmaster_url: event.ticketmaster_url || null,
      seatgeek_url: event.seatgeek_url || null,
      vividseats_url: event.vividseats_url || null,
      impact_program_id: event.impact_program_id || null,
      impact_deep_link: event.impact_deep_link || null,
      ticketmaster_impact_program_id: event.ticketmaster_impact_program_id || null,
      seatgeek_impact_program_id: event.seatgeek_impact_program_id || null,
      vividseats_impact_program_id: event.vividseats_impact_program_id || null,
      ticketmaster_deep_link: event.ticketmaster_deep_link || null,
      seatgeek_deep_link: event.seatgeek_deep_link || null,
      vividseats_deep_link: event.vividseats_deep_link || null,
      source: "seed"
    }))
    .filter((event) => event.id && parseDate(event.dateTimeISO))
    .sort((a, b) => parseDate(a.dateTimeISO) - parseDate(b.dateTimeISO));
}

export function filterShows(shows, searchParams) {
  const artistSlug = slugify(searchParams.get("artistSlug"));
  const city = String(searchParams.get("city") || "").trim().toLowerCase();
  const country = String(searchParams.get("country") || "").trim().toLowerCase();
  const showId = String(searchParams.get("showId") || "").trim();
  const limit = Math.max(1, Math.min(60, Number.parseInt(searchParams.get("limit") || "48", 10) || 48));

  let filtered = shows;
  if (artistSlug) {
    filtered = filtered.filter((show) => slugify(show.artist_slug) === artistSlug);
  }
  if (city) {
    filtered = filtered.filter((show) => String(show.city || "").trim().toLowerCase() === city);
  }
  if (country) {
    filtered = filtered.filter((show) => String(show.country || "").trim().toLowerCase() === country);
  }
  if (showId) {
    filtered = filtered.filter((show) => show.id === showId);
  }

  return showId ? filtered : filtered.slice(0, limit);
}

function buildProvider(provider, show, env, urlValue, eventIdKey) {
  const rawUrl = typeof urlValue === "string" ? urlValue.trim() : "";
  const hasActionUrl = rawUrl && !isPlaceholderUrl(rawUrl);
  const eventId = show[eventIdKey];
  const impactReadiness = getImpactReadiness(env);
  const programId = getImpactProgramId(show, provider, env);
  const deepLink = getProviderDeepLink(show, provider, rawUrl);
  const canUseImpact = impactReadiness.configured && programId && deepLink;
  const outParams = new URLSearchParams({
    showId: show.id,
    provider
  });
  if (show.source === "ticketmaster-discovery" && deepLink) {
    outParams.set("deepLink", deepLink);
  }
  const status = hasActionUrl ? "live" : eventId ? "mapped" : "pending";
  const note =
    canUseImpact
      ? "Affiliate redirect is ready; users will be routed through a server-side impact.com tracking link."
      : status === "live"
      ? "Verified destination is available, but Impact credentials and a Program ID are required before this lane can be enabled."
      : status === "mapped"
        ? impactReadiness.configured
          ? "impact.com credentials are configured; add a real deep link and Program ID to enable affiliate routing."
          : "Provider lane is wired, but impact.com publisher credentials are not configured in this preview."
        : "No validated source lane is connected for this provider yet.";

  return {
    provider,
    status: canUseImpact ? "affiliate_ready" : status,
    cacheState: show.source === "ticketmaster-discovery" ? "live" : "preview",
    source: impactReadiness.configured ? "impact-publisher-ready" : "seed-preview",
    note,
    actionUrl: canUseImpact ? `/api/out?${outParams.toString()}` : null,
    programIdConfigured: Boolean(programId),
    deepLinkConfigured: Boolean(deepLink),
    lastChecked: new Date().toISOString()
  };
}

function mapDiscoveryEventToShow(event, artistSlug, artistName) {
  const dateTimeISO = event?.dates?.start?.dateTime || null;
  if (!event?.id || !dateTimeISO || !parseDate(dateTimeISO)) return null;

  const venue = event?._embedded?.venues?.[0] || {};
  const city = venue?.city?.name || "City TBA";
  const country = venue?.country?.name || "Country TBA";
  const venueName = venue?.name || "Venue TBA";
  return {
    id: `tm-${event.id}`,
    artist_slug: artistSlug,
    artist_name: artistName,
    artist: artistName,
    city,
    country,
    venue: venueName,
    dateTimeISO,
    timezone: event?.dates?.timezone || "",
    tour_name: "",
    status: event?.dates?.status?.code || "announced",
    ticketmaster_event_id: event.id,
    seatgeek_event_id: null,
    vividseats_event_id: null,
    ticketmaster_url: typeof event?.url === "string" ? event.url : null,
    ticketmaster_deep_link: typeof event?.url === "string" ? event.url : null,
    seatgeek_url: null,
    vividseats_url: null,
    source: "ticketmaster-discovery"
  };
}

export async function maybeFetchDiscoveryShows(env, artistSlug, artistName, fallbackShows) {
  const apiKey = String(env.TICKETMASTER_API_KEY || "").trim();
  const shouldTry = artistSlug && apiKey && (!fallbackShows.length || getBooleanEnv(env.TICKETMASTER_DISCOVERY_ENABLED, true));
  if (!shouldTry) {
    return {
      shows: fallbackShows,
      artistFeed: {
        enabled: getBooleanEnv(env.TICKETMASTER_DISCOVERY_ENABLED, true),
        used: false,
        source: "local-preview",
        cacheState: "preview",
        count: fallbackShows.length,
        error: apiKey ? null : "missing_ticketmaster_api_key"
      }
    };
  }

  const params = new URLSearchParams({
    apikey: apiKey,
    keyword: artistName,
    classificationName: "music",
    sort: "date,asc",
    includeTBA: "no",
    includeTBD: "no",
    size: String(Math.max(1, Math.min(60, Number.parseInt(env.TICKETMASTER_ARTIST_EVENTS_LIMIT || "24", 10) || 24)))
  });

  const countryCode = String(env.TICKETMASTER_DISCOVERY_COUNTRY || "").trim().toUpperCase();
  if (/^[A-Z]{2}$/.test(countryCode)) {
    params.set("countryCode", countryCode);
  }

  try {
    const response = await fetch(`${discoveryBaseUrl}/events.json?${params.toString()}`, {
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      return {
        shows: fallbackShows,
        artistFeed: {
          enabled: true,
          used: false,
          source: "local-preview",
          cacheState: "fallback",
          count: fallbackShows.length,
          error: `ticketmaster_${response.status}`
        }
      };
    }

    const payload = await response.json();
    const events = Array.isArray(payload?._embedded?.events) ? payload._embedded.events : [];
    const shows = events
      .map((event) => mapDiscoveryEventToShow(event, artistSlug, artistName))
      .filter(Boolean);

    return {
      shows: shows.length ? shows : fallbackShows,
      artistFeed: {
        enabled: true,
        used: shows.length > 0,
        source: shows.length ? "ticketmaster-discovery" : "local-preview",
        cacheState: shows.length ? "live" : "fallback",
        count: shows.length || fallbackShows.length,
        error: null
      }
    };
  } catch (error) {
    return {
      shows: fallbackShows,
      artistFeed: {
        enabled: true,
        used: false,
        source: "local-preview",
        cacheState: "fallback",
        count: fallbackShows.length,
        error: "ticketmaster_fetch_failed"
      }
    };
  }
}

export function attachProviderState(show, env) {
  const impactReadiness = getImpactReadiness(env);
  return {
    ...show,
    sourceHealth: {
      impact: impactReadiness
    },
    prices: [
      buildProvider("Ticketmaster", show, env, show.ticketmaster_url, "ticketmaster_event_id"),
      buildProvider("SeatGeek", show, env, show.seatgeek_url, "seatgeek_event_id"),
      buildProvider("Vivid Seats", show, env, show.vividseats_url, "vividseats_event_id")
    ]
  };
}
