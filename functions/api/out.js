import { impactMarketplacePublicEnabled } from "../_impact-marketplace-config.js";
import { isLikelyBot } from "../_bot-detection.js";
import { insertAnalyticsRow } from "../_analytics-write.js";
import {
  classifyDestination,
  classifyDeviceCategory,
  classifyPageType,
  createClickId,
  isAffiliateProvider,
  isAffiliateTrackingHost,
  isValidClickId,
  normalizeAnalyticsPath,
  normalizeCtaLocation
} from "../_funnel.js";

const PLACEHOLDER_URL_PATTERN = /example\.com|placeholder|your-link|replace-me|localhost|127\.0\.0\.1/i;
const EVENTS_JSON_PATH = "/data/events.json";
const DEFAULT_IMPACT_API_BASE = "https://api.impact.com";
const IMPACT_PXF_TRACKING_HOSTS = ["pxf.io"];
// Temporary production proof header for /api/out. Remove after verifying
// plain (non-affiliate) Ticketmaster redirects are live.
const OUT_VERSION_HEADER = "tm-plain-redirects-2026-07-02";

const PROVIDERS = {
  ticketmaster: {
    name: "Ticketmaster",
    allowedDestinationHosts: [
      "ticketmaster.com",
      "ticketmaster.ca",
      "ticketmaster.co.uk",
      "ticketmaster.es",
      "ticketmaster.de",
      "ticketmaster.nl",
      "ticketmaster.se",
      "ticketmaster.pl",
      "ticketmaster.be",
      "ticketmaster.it"
    ],
    trustedAffiliateHosts: []
  },
  seatgeek: {
    name: "SeatGeek",
    allowedDestinationHosts: ["seatgeek.com"],
    trustedAffiliateHosts: []
  },
  "vivid-seats": {
    name: "Vivid Seats",
    allowedDestinationHosts: ["vividseats.com"],
    trustedAffiliateHosts: []
  },
  ticketnetwork: {
    name: "TicketNetwork",
    allowedDestinationHosts: ["ticketnetwork.com"],
    trustedAffiliateHosts: [],
    urlField: "ticketnetwork_url",
    publicEnabledEnv: "TICKETNETWORK_PUBLIC_ENABLED"
  },
  "ticket-liquidator": {
    name: "Ticket Liquidator",
    allowedDestinationHosts: ["ticketliquidator.com"],
    trustedAffiliateHosts: [],
    urlField: "ticketliquidator_url",
    publicEnabledEnv: "TICKETLIQUIDATOR_PUBLIC_ENABLED"
  },
  "stubhub-international": {
    name: "StubHub International",
    allowedDestinationHosts: [
      "stubhub.co.uk", "stubhub.ie", "stubhub.de", "stubhub.fr", "stubhub.es",
      "stubhub.it", "stubhub.pt", "stubhub.pl", "stubhub.se", "stubhub.dk",
      "stubhub.fi", "stubhub.gr", "stubhub.nl", "stubhub.lu", "stubhub.cz",
      "stubhub.be", "stubhub.co.at"
    ],
    trustedAffiliateHosts: [],
    urlField: "stubhub_international_url",
    publicEnabledEnv: "STUBHUB_INTERNATIONAL_PUBLIC_ENABLED"
  }
};

const VERIFIED_TICKET_LINKS = {
  "beyonce:ticketmaster": {
    artistSlug: "beyonce",
    provider: "ticketmaster",
    linkId: "tm-artist-beyonce",
    redirectUrl: "https://www.ticketmaster.com/beyonce-tickets/artist/894191",
    verified: true
  },
  "harry-styles:ticketmaster": {
    artistSlug: "harry-styles",
    provider: "ticketmaster",
    linkId: "tm-artist-harry-styles",
    redirectUrl: "https://www.ticketmaster.com/harry-styles-tickets/artist/2366444",
    verified: true
  },
  "bts:ticketmaster": {
    artistSlug: "bts",
    provider: "ticketmaster",
    linkId: "tm-artist-bts",
    redirectUrl: "https://www.ticketmaster.com/bts-tickets/artist/2110227",
    verified: true
  },
  "ariana-grande:ticketmaster": {
    artistSlug: "ariana-grande",
    provider: "ticketmaster",
    linkId: "tm-artist-ariana-grande",
    redirectUrl: "https://www.ticketmaster.com/ariana-grande-tickets/artist/1688071",
    verified: true
  },
  "bad-bunny:ticketmaster": {
    artistSlug: "bad-bunny",
    provider: "ticketmaster",
    linkId: "tm-artist-bad-bunny",
    redirectUrl: "https://www.ticketmaster.com/bad-bunny-tickets/artist/2317395",
    verified: true
  },
  "morgan-wallen:ticketmaster": {
    artistSlug: "morgan-wallen",
    provider: "ticketmaster",
    linkId: "tm-artist-morgan-wallen",
    redirectUrl: "https://www.ticketmaster.com/morgan-wallen-tickets/artist/2288122",
    verified: true
  },
  "jay-z:ticketmaster": {
    artistSlug: "jay-z",
    provider: "ticketmaster",
    linkId: "tm-artist-jay-z",
    redirectUrl: "https://www.ticketmaster.com/jayz-tickets/artist/781009",
    verified: true
  },
  "olivia-rodrigo:ticketmaster": {
    artistSlug: "olivia-rodrigo",
    provider: "ticketmaster",
    linkId: "tm-artist-olivia-rodrigo",
    redirectUrl: "https://www.ticketmaster.com/artist/2836194",
    verified: true
  },
  "bruno-mars:ticketmaster": {
    artistSlug: "bruno-mars",
    provider: "ticketmaster",
    linkId: "tm-artist-bruno-mars",
    redirectUrl: "https://www.ticketmaster.com/bruno-mars-tickets/artist/1466801",
    verified: true
  },
  "shakira:ticketmaster": {
    artistSlug: "shakira",
    provider: "ticketmaster",
    linkId: "tm-artist-shakira",
    redirectUrl: "https://www.ticketmaster.com/shakira-tickets/artist/779049",
    verified: true
  },
  "raye:ticketmaster": {
    artistSlug: "raye",
    provider: "ticketmaster",
    linkId: "tm-artist-raye",
    redirectUrl: "https://www.ticketmaster.com/raye-tickets/artist/2065089",
    verified: true
  },
  "charli-xcx:ticketmaster": {
    artistSlug: "charli-xcx",
    provider: "ticketmaster",
    linkId: "tm-artist-charli-xcx",
    redirectUrl: "https://www.ticketmaster.com/charli-xcx-tickets/artist/1638380",
    verified: true
  },
  "tate-mcrae:ticketmaster": {
    artistSlug: "tate-mcrae",
    provider: "ticketmaster",
    linkId: "tm-artist-tate-mcrae",
    redirectUrl: "https://www.ticketmaster.com/tate-mcrae-tickets/artist/2720246",
    verified: true
  },
  "ed-sheeran:ticketmaster": {
    artistSlug: "ed-sheeran",
    provider: "ticketmaster",
    linkId: "tm-artist-ed-sheeran",
    redirectUrl: "https://www.ticketmaster.com/ed-sheeran-tickets/artist/1560779",
    verified: true
  },
  "summer-walker:ticketmaster": {
    artistSlug: "summer-walker",
    provider: "ticketmaster",
    linkId: "tm-artist-summer-walker",
    redirectUrl: "https://www.ticketmaster.com/summer-walker-tickets/artist/2537562",
    verified: true
  },
  "rosalia:ticketmaster": {
    artistSlug: "rosalia",
    provider: "ticketmaster",
    linkId: "tm-artist-rosalia",
    redirectUrl: "https://www.ticketmaster.com/rosalia-tickets/artist/2453211",
    verified: true
  },
  // Artist-level SeatGeek performer pages. URLs captured 2026-07-02 from the
  // SeatGeek /2/performers/{id} API record for each artist's human-verified
  // performer id in data/provider-identities.json (never constructed from
  // names). Redirects are Impact-wrapped at click time.
  "beyonce:seatgeek": {
    artistSlug: "beyonce",
    provider: "seatgeek",
    linkId: "sg-artist-beyonce",
    redirectUrl: "https://seatgeek.com/beyonce-tickets",
    verified: true
  },
  "harry-styles:seatgeek": {
    artistSlug: "harry-styles",
    provider: "seatgeek",
    linkId: "sg-artist-harry-styles",
    redirectUrl: "https://seatgeek.com/harry-styles-tickets",
    verified: true
  },
  "bts:seatgeek": {
    artistSlug: "bts",
    provider: "seatgeek",
    linkId: "sg-artist-bts",
    redirectUrl: "https://seatgeek.com/bts-tickets",
    verified: true
  },
  "ariana-grande:seatgeek": {
    artistSlug: "ariana-grande",
    provider: "seatgeek",
    linkId: "sg-artist-ariana-grande",
    redirectUrl: "https://seatgeek.com/ariana-grande-tickets",
    verified: true
  },
  "bad-bunny:seatgeek": {
    artistSlug: "bad-bunny",
    provider: "seatgeek",
    linkId: "sg-artist-bad-bunny",
    redirectUrl: "https://seatgeek.com/bad-bunny-tickets",
    verified: true
  },
  "morgan-wallen:seatgeek": {
    artistSlug: "morgan-wallen",
    provider: "seatgeek",
    linkId: "sg-artist-morgan-wallen",
    redirectUrl: "https://seatgeek.com/morgan-wallen-tickets",
    verified: true
  },
  "jay-z:seatgeek": {
    artistSlug: "jay-z",
    provider: "seatgeek",
    linkId: "sg-artist-jay-z",
    redirectUrl: "https://seatgeek.com/jay-z-tickets",
    verified: true
  },
  "olivia-rodrigo:seatgeek": {
    artistSlug: "olivia-rodrigo",
    provider: "seatgeek",
    linkId: "sg-artist-olivia-rodrigo",
    redirectUrl: "https://seatgeek.com/olivia-rodrigo-tickets",
    verified: true
  },
  "bruno-mars:seatgeek": {
    artistSlug: "bruno-mars",
    provider: "seatgeek",
    linkId: "sg-artist-bruno-mars",
    redirectUrl: "https://seatgeek.com/bruno-mars-tickets",
    verified: true
  },
  "ed-sheeran:seatgeek": {
    artistSlug: "ed-sheeran",
    provider: "seatgeek",
    linkId: "sg-artist-ed-sheeran",
    redirectUrl: "https://seatgeek.com/ed-sheeran-tickets",
    verified: true
  },
  "shakira:seatgeek": {
    artistSlug: "shakira",
    provider: "seatgeek",
    linkId: "sg-artist-shakira",
    redirectUrl: "https://seatgeek.com/shakira-tickets",
    verified: true
  },
  "raye:seatgeek": {
    artistSlug: "raye",
    provider: "seatgeek",
    linkId: "sg-artist-raye",
    redirectUrl: "https://seatgeek.com/raye-tickets",
    verified: true
  },
  "charli-xcx:seatgeek": {
    artistSlug: "charli-xcx",
    provider: "seatgeek",
    linkId: "sg-artist-charli-xcx",
    redirectUrl: "https://seatgeek.com/charli-xcx-tickets",
    verified: true
  },
  "tate-mcrae:seatgeek": {
    artistSlug: "tate-mcrae",
    provider: "seatgeek",
    linkId: "sg-artist-tate-mcrae",
    redirectUrl: "https://seatgeek.com/tate-mcrae-tickets",
    verified: true
  },
  "summer-walker:seatgeek": {
    artistSlug: "summer-walker",
    provider: "seatgeek",
    linkId: "sg-artist-summer-walker",
    redirectUrl: "https://seatgeek.com/summer-walker-tickets",
    verified: true
  },
  "rosalia:seatgeek": {
    artistSlug: "rosalia",
    provider: "seatgeek",
    linkId: "sg-artist-rosalia",
    redirectUrl: "https://seatgeek.com/rosalia-tickets",
    verified: true
  },
  "post-malone:ticketmaster": {
    artistSlug: "post-malone",
    provider: "ticketmaster",
    linkId: "tm-artist-post-malone",
    redirectUrl: "https://www.ticketmaster.com/post-malone-tickets/artist/2119390",
    verified: true
  },
  "post-malone:seatgeek": {
    artistSlug: "post-malone",
    provider: "seatgeek",
    linkId: "sg-artist-post-malone",
    redirectUrl: "https://seatgeek.com/post-malone-tickets",
    verified: true
  },
  "zach-bryan:ticketmaster": {
    artistSlug: "zach-bryan",
    provider: "ticketmaster",
    linkId: "tm-artist-zach-bryan",
    redirectUrl: "https://www.ticketmaster.com/zach-bryan-tickets/artist/2811359",
    verified: true
  },
  "zach-bryan:seatgeek": {
    artistSlug: "zach-bryan",
    provider: "seatgeek",
    linkId: "sg-artist-zach-bryan",
    redirectUrl: "https://seatgeek.com/zach-bryan-tickets",
    verified: true
  },
  "jelly-roll:ticketmaster": {
    artistSlug: "jelly-roll",
    provider: "ticketmaster",
    linkId: "tm-artist-jelly-roll",
    redirectUrl: "https://www.ticketmaster.com/jelly-roll-tickets/artist/2131374",
    verified: true
  },
  "jelly-roll:seatgeek": {
    artistSlug: "jelly-roll",
    provider: "seatgeek",
    linkId: "sg-artist-jelly-roll",
    redirectUrl: "https://seatgeek.com/jelly-roll-tickets",
    verified: true
  },
  "tame-impala:ticketmaster": {
    artistSlug: "tame-impala",
    provider: "ticketmaster",
    linkId: "tm-artist-tame-impala",
    redirectUrl: "https://www.ticketmaster.com/tame-impala-tickets/artist/1446562",
    verified: true
  },
  "tame-impala:seatgeek": {
    artistSlug: "tame-impala",
    provider: "seatgeek",
    linkId: "sg-artist-tame-impala",
    redirectUrl: "https://seatgeek.com/tame-impala-tickets",
    verified: true
  },
  "gracie-abrams:ticketmaster": {
    artistSlug: "gracie-abrams",
    provider: "ticketmaster",
    linkId: "tm-artist-gracie-abrams",
    redirectUrl: "https://www.ticketmaster.com/gracie-abrams-tickets/artist/2763148",
    verified: true
  },
  "gracie-abrams:seatgeek": {
    artistSlug: "gracie-abrams",
    provider: "seatgeek",
    linkId: "sg-artist-gracie-abrams",
    redirectUrl: "https://seatgeek.com/gracie-abrams-tickets",
    verified: true
  },
  "niall-horan:ticketmaster": {
    artistSlug: "niall-horan",
    provider: "ticketmaster",
    linkId: "tm-artist-niall-horan",
    redirectUrl: "https://www.ticketmaster.com/niall-horan-tickets/artist/2297125",
    verified: true
  },
  "niall-horan:seatgeek": {
    artistSlug: "niall-horan",
    provider: "seatgeek",
    linkId: "sg-artist-niall-horan",
    redirectUrl: "https://seatgeek.com/niall-horan-tickets",
    verified: true
  },
  "doja-cat:ticketmaster": {
    artistSlug: "doja-cat",
    provider: "ticketmaster",
    linkId: "tm-artist-doja-cat",
    redirectUrl: "https://www.ticketmaster.com/doja-cat-tickets/artist/2062205",
    verified: true
  },
  "doja-cat:seatgeek": {
    artistSlug: "doja-cat",
    provider: "seatgeek",
    linkId: "sg-artist-doja-cat",
    redirectUrl: "https://seatgeek.com/doja-cat-tickets",
    verified: true
  },
  "sombr:ticketmaster": {
    artistSlug: "sombr",
    provider: "ticketmaster",
    linkId: "tm-artist-sombr",
    redirectUrl: "https://www.ticketmaster.com/sombr-tickets/artist/3144534",
    verified: true
  },
  "sombr:seatgeek": {
    artistSlug: "sombr",
    provider: "seatgeek",
    linkId: "sg-artist-sombr",
    redirectUrl: "https://seatgeek.com/sombr-tickets",
    verified: true
  },
  "latto:ticketmaster": {
    artistSlug: "latto",
    provider: "ticketmaster",
    linkId: "tm-artist-latto",
    redirectUrl: "https://www.ticketmaster.com/latto-tickets/artist/2842518",
    verified: true
  },
  "latto:seatgeek": {
    artistSlug: "latto",
    provider: "seatgeek",
    linkId: "sg-artist-latto",
    redirectUrl: "https://seatgeek.com/latto-tickets",
    verified: true
  },
  "john-summit:ticketmaster": {
    artistSlug: "john-summit",
    provider: "ticketmaster",
    linkId: "tm-artist-john-summit",
    redirectUrl: "https://www.ticketmaster.com/john-summit-tickets/artist/2730221",
    verified: true
  },
  "john-summit:seatgeek": {
    artistSlug: "john-summit",
    provider: "seatgeek",
    linkId: "sg-artist-john-summit",
    redirectUrl: "https://seatgeek.com/john-summit-tickets",
    verified: true
  }
};

function withOutVersionHeader(response) {
  response.headers.set("X-TTC-Out-Version", OUT_VERSION_HEADER);
  return response;
}

function json(payload, status = 200) {
  return withOutVersionHeader(new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  }));
}

function redirectResponse(destination, status = 302) {
  return new Response(null, {
    status,
    headers: {
      Location: destination,
      "X-TTC-Out-Version": OUT_VERSION_HEADER
    }
  });
}

function clean(value, max = 255) {
  return String(value || "").trim().slice(0, max);
}

function slugify(value) {
  return clean(value, 120)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function providerKey(value) {
  const key = slugify(value);
  if (key === "vividseats") return "vivid-seats";
  if (key === "ticketliquidator") return "ticket-liquidator";
  if (key === "stubhubinternational") return "stubhub-international";
  return key;
}

function getDemandDb(env) {
  const candidate = env?.DEMAND_DB;
  return candidate && typeof candidate.prepare === "function" ? candidate : null;
}

function isPlaceholderUrl(value) {
  return PLACEHOLDER_URL_PATTERN.test(String(value || ""));
}

function safeUrl(value) {
  const raw = clean(value, 2048);
  if (!raw || isPlaceholderUrl(raw)) return null;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    if (isUnsafeHost(parsed.hostname)) return null;
    return parsed;
  } catch (error) {
    return null;
  }
}

function isUnsafeHost(hostname) {
  const host = String(hostname || "").toLowerCase();
  if (!host) return true;
  if (host === "localhost" || host.endsWith(".localhost")) return true;
  if (/^127\./.test(host) || host === "0.0.0.0" || host === "::1" || host === "[::1]") return true;
  if (/^10\./.test(host) || /^192\.168\./.test(host)) return true;
  const private172 = host.match(/^172\.(\d+)\./);
  if (private172) {
    const second = Number(private172[1]);
    if (second >= 16 && second <= 31) return true;
  }
  return false;
}

function hostnameAllowed(hostname, allowedHosts) {
  const host = String(hostname || "").toLowerCase();
  return allowedHosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
}

function validateRequestedDestination(provider, value) {
  if (!value) return { ok: true };
  const parsed = safeUrl(value);
  if (!parsed) return { ok: false, status: "invalid_destination" };
  if (!hostnameAllowed(parsed.hostname, provider.allowedDestinationHosts)) {
    return { ok: false, status: "destination_not_allowlisted" };
  }
  return { ok: true, destinationHost: parsed.hostname.toLowerCase() };
}

function validateConfiguredRedirect(provider, value) {
  const parsed = safeUrl(value);
  if (!parsed) return null;
  const hosts = provider.allowedDestinationHosts.concat(provider.trustedAffiliateHosts);
  return hostnameAllowed(parsed.hostname, hosts) ? parsed : null;
}

async function loadEventsFromAssets(env) {
  const assets = env?.ASSETS;
  if (!assets || typeof assets.fetch !== "function") return null;

  try {
    const response = await assets.fetch(new Request(`https://assets.local${EVENTS_JSON_PATH}`));
    if (!response.ok) return null;
    const data = await response.json();
    return Array.isArray(data) ? data : null;
  } catch (error) {
    return null;
  }
}

function eventUrlContainsTicketmasterId(redirect, eventId) {
  const expected = clean(eventId, 255).toLowerCase();
  if (!expected) return true;

  const pathSegments = redirect.pathname
    .split("/")
    .map((segment) => decodeURIComponent(segment).toLowerCase());
  if (pathSegments.includes(expected)) return true;

  return redirect.toString().toLowerCase().includes(encodeURIComponent(expected).toLowerCase());
}

// Explicit event-link publishability. verification_status is retained as
// provenance metadata, but it is no longer a human-review gate. A stored
// destination may resolve when it passes the strict provider host/event-id
// validation below. Events without a destination fall back to the legacy
// human-verified provider flag. Keep in sync with eventLinkPublishable in
// functions/[[path]].js and public/app.js.
function eventLinkPublishable(event) {
  const destination = clean(event?.ticketmaster_url || event?.source_url, 2048);
  if (destination) return true;
  return event?.provider_links?.ticketmaster?.verified === true;
}

// Per-provider event publishability. Impact marketplace lanes require their
// own verified provenance; SeatGeek/Vivid retain their existing event-link
// fallback. Ticketmaster relies on its stored destination and the redirect
// validator. Keep in sync with providerEventPublishable in
// functions/[[path]].js and public/app.js.
function providerEventPublishable(event, provider) {
  if (["ticketnetwork", "ticket-liquidator", "stubhub-international"].includes(provider)) {
    return event?.provider_links?.[provider]?.verified === true;
  }
  if (provider !== "ticketmaster" && event?.provider_links?.[provider]?.verified === true) return true;
  return eventLinkPublishable(event);
}

function validateTicketmasterEventUrl(event, providerConfig) {
  const candidates = [event?.ticketmaster_url, event?.source_url];
  const eventId = clean(event?.ticketmaster_event_id, 255);

  for (const candidate of candidates) {
    const redirect = validateConfiguredRedirect(providerConfig, candidate);
    if (!redirect) continue;
    if (!eventUrlContainsTicketmasterId(redirect, eventId)) continue;
    return redirect;
  }

  return null;
}

// SeatGeek event URLs must be pre-approved in event data. The SeatGeek API is
// intentionally not used in /api/out, so click-time redirects never run broad
// SeatGeek search or auto-publish candidate matches. Event-level SeatGeek
// destinations must be direct HTTPS SeatGeek URLs; no affiliate or HTTP
// fallback is accepted before Impact tracking is applied.
function validateSeatGeekEventUrl(seatGeekUrl, providerConfig) {
  const redirect = validateConfiguredRedirect(providerConfig, seatGeekUrl);
  if (!redirect || redirect.protocol !== "https:") return null;
  const host = redirect.hostname.toLowerCase();
  if (host !== "seatgeek.com" && host !== "www.seatgeek.com") return null;
  const path = decodeURIComponent(redirect.pathname || "/").replace(/\/+$/, "");
  if (!path || path === "/") return null;
  if (/^\/(search|venues?|performers?|artists?|concert-tickets|tickets)(?:\/|$)/i.test(path)) return null;
  if (!/\/(concert|sports|theater|theatre)\/\d+$/i.test(path)) return null;
  return redirect;
}

// Vivid Seats event URLs follow the same policy: pre-approved in event data,
// direct HTTPS vividseats.com production-page URLs only. The shape is
// conservative — /…/production/<id> — and rejects search/venue/performer/
// category pages and bare "…-tickets" root paths. Adjust only alongside the
// first owner-verified vividseats_url data (a too-strict validator fails safe).
function validateVividSeatsEventUrl(vividSeatsUrl, providerConfig) {
  const redirect = validateConfiguredRedirect(providerConfig, vividSeatsUrl);
  if (!redirect || redirect.protocol !== "https:") return null;
  const host = redirect.hostname.toLowerCase();
  if (host !== "vividseats.com" && host !== "www.vividseats.com") return null;
  const path = decodeURIComponent(redirect.pathname || "/").replace(/\/+$/, "");
  if (!path || path === "/") return null;
  if (/^\/(search|venues?|performers?|artists?|category|concerts?|sports?|theater|theatre)(?:\/|$)/i.test(path)) return null;
  if (!/\/production\/\d+$/i.test(path)) return null;
  return redirect;
}

// Impact Catalogs integrations use provider-specific host
// allowlists plus stored verified provenance. Their storefront path shapes can
// vary by market, so reject only bare/generic pages here; the sync script is
// responsible for exact artist/date/city/venue matching before the URL is
// written to event data.
function validateImpactMarketplaceEventUrl(value, providerConfig) {
  const redirect = validateConfiguredRedirect(providerConfig, value);
  if (!redirect || redirect.protocol !== "https:") return null;
  const path = decodeURIComponent(redirect.pathname || "/").replace(/\/+$/, "");
  if (!path || path === "/") return null;
  if (/^\/(search|home|about|help|support|faq|contact|terms|privacy)(?:\/|$)/i.test(path)) return null;
  return redirect;
}

// Funnel dimensions taken from the reviewed event record that the redirect has
// already resolved and validated. They are read from `events.json`, never from
// the request, so a click can never assert an event date, city or venue that
// the catalogue does not hold. The date is stored as the calendar day only —
// enough to segment near-term versus distant shows without turning the row into
// a precise behavioural timestamp of the visitor.
function eventFacts(event) {
  const iso = clean(event?.datetime_iso, 40);
  const eventDate = /^\d{4}-\d{2}-\d{2}/.test(iso) ? iso.slice(0, 10) : null;
  return {
    eventId: clean(event?.id, 120) || null,
    eventDate,
    eventCity: clean(event?.city, 120) || null,
    eventVenue: clean(event?.venue, 160) || null
  };
}

async function resolveShowLink(env, showId, provider) {
  const events = await loadEventsFromAssets(env);
  if (!events) return { ok: false, status: "event_data_unavailable", httpStatus: 503 };

  const event = events.find((candidate) => clean(candidate?.id, 255) === showId);
  if (!event) return { ok: false, status: "show_not_found" };
  if (!providerEventPublishable(event, provider)) return { ok: false, status: "event_link_not_publishable" };

  if (provider === "ticketmaster") {
    const providerConfig = PROVIDERS.ticketmaster;
    const redirect = validateTicketmasterEventUrl(event, providerConfig);
    if (!redirect) return { ok: false, status: "event_ticket_url_unavailable" };

    return {
      ok: true,
      link: {
        artistSlug: slugify(event.artist_slug),
        provider: "ticketmaster",
        linkId: clean(event.id, 255),
        showId: clean(event.id, 255),
        redirectUrl: redirect.toString(),
        verified: true,
        ...eventFacts(event)
      },
      redirect
    };
  }

  if (provider === "seatgeek") {
    const providerConfig = PROVIDERS.seatgeek;
    const seatGeekUrl = clean(event?.seatgeek_url, 2048);
    const redirect = validateSeatGeekEventUrl(seatGeekUrl, providerConfig);
    if (!redirect) return { ok: false, status: "event_ticket_url_unavailable" };

    return {
      ok: true,
      link: {
        artistSlug: slugify(event.artist_slug),
        provider: "seatgeek",
        linkId: clean(event.id, 255),
        showId: clean(event.id, 255),
        redirectUrl: redirect.toString(),
        verified: true,
        ...eventFacts(event)
      },
      redirect
    };
  }

  if (provider === "vivid-seats") {
    const providerConfig = PROVIDERS["vivid-seats"];
    const vividSeatsUrl = clean(event?.vividseats_url, 2048);
    const redirect = validateVividSeatsEventUrl(vividSeatsUrl, providerConfig);
    if (!redirect) return { ok: false, status: "event_ticket_url_unavailable" };

    return {
      ok: true,
      link: {
        artistSlug: slugify(event.artist_slug),
        provider: "vivid-seats",
        linkId: clean(event.id, 255),
        showId: clean(event.id, 255),
        redirectUrl: redirect.toString(),
        verified: true,
        ...eventFacts(event)
      },
      redirect
    };
  }

  const impactMarketplaceConfig = PROVIDERS[provider];
  if (impactMarketplaceConfig?.urlField) {
    const storedUrl = clean(event?.[impactMarketplaceConfig.urlField], 2048);
    const redirect = validateImpactMarketplaceEventUrl(storedUrl, impactMarketplaceConfig);
    if (!redirect) return { ok: false, status: "event_ticket_url_unavailable" };
    return {
      ok: true,
      link: {
        artistSlug: slugify(event.artist_slug),
        provider,
        linkId: clean(event.id, 255),
        showId: clean(event.id, 255),
        redirectUrl: redirect.toString(),
        verified: true,
        ...eventFacts(event)
      },
      redirect
    };
  }

  return { ok: false, status: "provider_not_configured" };
}


const BASE_TRACKING_URL_ENV_VARS = {
  seatgeek: "IMPACT_SEATGEEK_BASE_TRACKING_URL",
  "vivid-seats": "IMPACT_VIVIDSEATS_BASE_TRACKING_URL",
  ticketnetwork: "IMPACT_TICKETNETWORK_BASE_TRACKING_URL",
  "ticket-liquidator": "IMPACT_TICKETLIQUIDATOR_BASE_TRACKING_URL",
  "stubhub-international": "IMPACT_STUBHUB_INTERNATIONAL_BASE_TRACKING_URL"
};

const IMPACT_PROVIDER_ENV_PREFIXES = {
  ticketnetwork: "IMPACT_TICKETNETWORK",
  "ticket-liquidator": "IMPACT_TICKETLIQUIDATOR",
  "stubhub-international": "IMPACT_STUBHUB_INTERNATIONAL"
};

const IMPACT_PROVIDER_DEFAULT_PROGRAM_IDS = {
  ticketnetwork: "2322",
  "ticket-liquidator": "2085",
  "stubhub-international": "24092"
};

function baseTrackingUrlFor(env = {}, provider) {
  const envVar = BASE_TRACKING_URL_ENV_VARS[providerKey(provider)];
  return envVar ? clean(env?.[envVar], 2048) : "";
}

function hasBaseTrackingUrl(env = {}, provider) {
  return Boolean(baseTrackingUrlFor(env, provider));
}

function validateImpactPxfBaseTrackingUrl(value) {
  const raw = clean(value, 2048);
  if (!raw || isPlaceholderUrl(raw)) {
    return { ok: false, status: "impact_base_tracking_url_invalid" };
  }

  let parsed;
  try {
    parsed = new URL(raw);
  } catch (error) {
    return { ok: false, status: "impact_base_tracking_url_invalid" };
  }

  if (parsed.protocol !== "https:" || isUnsafeHost(parsed.hostname)) {
    return { ok: false, status: "impact_base_tracking_url_unsafe" };
  }

  if (!hostnameAllowed(parsed.hostname, IMPACT_PXF_TRACKING_HOSTS)) {
    return { ok: false, status: "impact_base_tracking_url_host_not_allowed" };
  }

  return { ok: true, url: parsed };
}

// Optional SubId passthrough for affiliate reconciliation, **default off**.
//
// Impact tracking links can carry a publisher-supplied SubId that comes back on
// the click and action rows in Impact's reporting, which is what turns "we
// recorded 40 SeatGeek clicks" into "these 40 rows are the same 40 rows Impact
// shows". Enabling it changes a live affiliate URL, so it stays behind an
// explicit flag and the parameter name is configurable — the owner confirms the
// expected name with Impact, sets it, and verifies one click end to end before
// relying on it. See docs/COMMERCIAL_FUNNEL.md.
//
// Applies only to the pxf.io base-tracking path. The Impact API TrackingLinks
// path builds its link server-side from Type/DeepLink and is not covered.
function outboundClickIdParam(env = {}) {
  if (String(env?.OUT_CLICK_ID_SUBID_ENABLED || "").trim().toLowerCase() !== "true") return "";
  const configured = clean(env?.OUT_CLICK_ID_SUBID_PARAM, 40) || "subId1";
  return /^[A-Za-z][A-Za-z0-9_]{0,39}$/.test(configured) ? configured : "";
}

// Wraps a pre-validated provider destination with the provider's configured
// pxf.io base tracking URL. `validateDestination` re-validates the destination
// with the caller's context (event-shape validator on the showId path;
// validateConfiguredRedirect for hand-verified artist-level entries).
function buildBaseTrackingRedirect(env, provider, destination, validateDestination, clickId = "") {
  const configuredBase = baseTrackingUrlFor(env, provider);
  if (!configuredBase) return { ok: false, status: "impact_base_tracking_url_missing" };

  const base = validateImpactPxfBaseTrackingUrl(configuredBase);
  if (!base.ok) return base;

  const destinationUrl = validateDestination(destination);
  if (!destinationUrl) {
    return { ok: false, status: "event_ticket_url_unavailable" };
  }

  const outbound = new URL(base.url.toString());
  outbound.searchParams.set("u", destinationUrl.toString());
  const clickIdParam = outboundClickIdParam(env);
  if (clickIdParam && isValidClickId(clickId)) outbound.searchParams.set(clickIdParam, clickId);
  return { ok: true, trackingUrl: outbound.toString() };
}

function impactConfig(env = {}, provider = "ticketmaster") {
  const normalizedProvider = providerKey(provider || "ticketmaster");
  const apiBase = clean(env?.IMPACT_API_BASE_URL || DEFAULT_IMPACT_API_BASE, 2048).replace(/\/+$/, "");

  if (normalizedProvider === "seatgeek") {
    // The SeatGeek publisher account is the sole approved Impact credential
    // set for every active affiliate provider. Never fall back to the retired
    // Ticketmaster IMPACT_* pair.
    const accountSid = clean(env?.IMPACT_SEATGEEK_ACCOUNT_SID, 255);
    const authToken = clean(env?.IMPACT_SEATGEEK_AUTH_TOKEN, 255);
    const campaignId = clean(env?.IMPACT_SEATGEEK_CAMPAIGN_ID, 120);
    const legacyProgramId = clean(env?.IMPACT_SEATGEEK_PROGRAM_ID, 120);
    const programId = campaignId || legacyProgramId;
    return {
      accountSid,
      authToken,
      programId,
      campaignId,
      legacyProgramId,
      programIdSource: campaignId ? "IMPACT_SEATGEEK_CAMPAIGN_ID" : legacyProgramId ? "IMPACT_SEATGEEK_PROGRAM_ID" : "",
      apiBase,
      provider: normalizedProvider,
      hasCredentials: Boolean(accountSid && authToken),
      hasProgramId: Boolean(programId),
      hasCampaignId: Boolean(campaignId),
      configured: Boolean(accountSid && authToken && programId)
    };
  }

  if (normalizedProvider === "vivid-seats") {
    // Vivid Seats uses the same approved SeatGeek publisher credentials.
    const accountSid = clean(env?.IMPACT_SEATGEEK_ACCOUNT_SID, 255);
    const authToken = clean(env?.IMPACT_SEATGEEK_AUTH_TOKEN, 255);
    const campaignId = clean(env?.IMPACT_VIVIDSEATS_CAMPAIGN_ID, 120);
    const legacyProgramId = clean(env?.IMPACT_VIVIDSEATS_PROGRAM_ID, 120);
    const programId = campaignId || legacyProgramId;
    return {
      accountSid,
      authToken,
      programId,
      campaignId,
      legacyProgramId,
      programIdSource: campaignId ? "IMPACT_VIVIDSEATS_CAMPAIGN_ID" : legacyProgramId ? "IMPACT_VIVIDSEATS_PROGRAM_ID" : "",
      apiBase,
      provider: normalizedProvider,
      hasCredentials: Boolean(accountSid && authToken),
      hasProgramId: Boolean(programId),
      hasCampaignId: Boolean(campaignId),
      configured: Boolean(accountSid && authToken && programId)
    };
  }

  const envPrefix = IMPACT_PROVIDER_ENV_PREFIXES[normalizedProvider];
  if (envPrefix) {
    const accountSid = clean(env?.IMPACT_SEATGEEK_ACCOUNT_SID, 255);
    const authToken = clean(env?.IMPACT_SEATGEEK_AUTH_TOKEN, 255);
    const configuredCampaignId = clean(env?.[`${envPrefix}_CAMPAIGN_ID`], 120);
    const legacyProgramId = clean(env?.[`${envPrefix}_PROGRAM_ID`], 120);
    const defaultProgramId = clean(IMPACT_PROVIDER_DEFAULT_PROGRAM_IDS[normalizedProvider], 120);
    const campaignId = configuredCampaignId || defaultProgramId;
    const programId = configuredCampaignId || legacyProgramId || defaultProgramId;
    return {
      accountSid, authToken, programId, campaignId, legacyProgramId,
      programIdSource: configuredCampaignId
        ? `${envPrefix}_CAMPAIGN_ID`
        : legacyProgramId
          ? `${envPrefix}_PROGRAM_ID`
          : "impact_catalog_campaign",
      apiBase, provider: normalizedProvider,
      hasCredentials: Boolean(accountSid && authToken),
      hasProgramId: Boolean(programId),
      hasCampaignId: Boolean(campaignId),
      configured: Boolean(accountSid && authToken && programId)
    };
  }

  // Ticketmaster has no Impact program (the site was removed from the
  // Ticketmaster affiliate programme). Ticketmaster redirects are plain,
  // unmonetized links and never call the Impact API.
  return {
    accountSid: "",
    authToken: "",
    programId: "",
    campaignId: "",
    legacyProgramId: "",
    programIdSource: "",
    apiBase,
    provider: normalizedProvider,
    hasCredentials: false,
    hasProgramId: false,
    hasCampaignId: false,
    configured: false
  };
}

function impactEndpointDiagnostics(config, deepLink) {
  const parsedDeepLink = safeUrl(deepLink);
  return {
    endpointPathShape: "/Mediapartners/{AccountSID}/Programs/{ProgramId}/TrackingLinks",
    endpointResource: "Programs",
    identifierType: "ProgramId",
    identifierConfiguredAs: config.programIdSource || "",
    requestMethod: "POST",
    parameterLocation: "query_string",
    requestFields: ["Type", "DeepLink"],
    trackingLinkType: "Regular",
    deepLinkHost: parsedDeepLink ? parsedDeepLink.hostname.toLowerCase() : "",
    deepLinkEncoding: "URLSearchParams"
  };
}

function safeImpactDiagnosticConfig(config) {
  return {
    provider: config.provider || "",
    hasCredentials: Boolean(config.hasCredentials),
    hasProgramId: Boolean(config.hasProgramId),
    hasCampaignId: Boolean(config.hasCampaignId),
    programIdSource: config.programIdSource || "",
    configured: Boolean(config.configured)
  };
}

const IMPACT_WRAPPED_PROVIDERS = new Set([
  "seatgeek", "vivid-seats", "ticketnetwork", "ticket-liquidator", "stubhub-international"
]);

function impactRequestStatus(statusCode, provider = "ticketmaster") {
  if (Number(statusCode) === 404 && IMPACT_WRAPPED_PROVIDERS.has(providerKey(provider))) {
    return "impact_tracking_endpoint_not_found";
  }
  if (Number(statusCode) === 403 && IMPACT_WRAPPED_PROVIDERS.has(providerKey(provider))) {
    return "impact_program_not_accessible";
  }
  return "impact_request_failed";
}

function safeImpactMessageFromPayload(payload, secrets = []) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return "";
  const raw = clean(payload.Message || payload.message || payload.Error || payload.error || payload.Status || payload.status, 180);
  if (!raw || !/^[\w\s.,:;!?()\-/]+$/.test(raw)) return "";
  const lower = raw.toLowerCase();
  if (secrets.some((secret) => secret && lower.includes(String(secret).toLowerCase()))) return "";
  return raw;
}

async function safeImpactResponseDiagnostics(response, config, deepLink) {
  const diagnostics = {};
  let payload = null;
  try {
    const contentType = clean(response.headers.get("content-type"), 120).toLowerCase();
    if (contentType.includes("application/json")) {
      payload = await response.clone().json();
    }
  } catch (error) {
    payload = null;
  }

  const fieldNames = safeFieldNames(payload);
  if (fieldNames.length > 0) diagnostics.impactResponseFieldNames = fieldNames;
  const safeMessage = safeImpactMessageFromPayload(payload, [
    config.accountSid,
    config.authToken,
    config.programId,
    deepLink
  ]);
  if (safeMessage) diagnostics.impactResponseMessage = safeMessage;
  return diagnostics;
}

function buildImpactTrackingEndpoint(config, deepLink) {
  const verifiedDeepLink = safeUrl(deepLink);
  const apiBase = safeUrl(config.apiBase);
  if (!verifiedDeepLink || !apiBase) return null;

  const params = new URLSearchParams({
    Type: "Regular",
    DeepLink: verifiedDeepLink.toString()
  });
  return `${apiBase.toString().replace(/\/+$/, "")}/Mediapartners/${encodeURIComponent(
    config.accountSid
  )}/Programs/${encodeURIComponent(config.programId)}/TrackingLinks?${params.toString()}`;
}

function buildImpactCampaignEndpoint(config) {
  const apiBase = safeUrl(config.apiBase);
  if (!apiBase || !config.accountSid || !config.programId) return null;
  return `${apiBase.toString().replace(/\/+$/, "")}/Mediapartners/${encodeURIComponent(
    config.accountSid
  )}/Campaigns/${encodeURIComponent(config.programId)}`;
}

function impactProgramStatus(statusCode) {
  if (Number(statusCode) === 404) return "impact_program_not_found";
  if (Number(statusCode) === 403) return "impact_program_not_accessible";
  return "impact_program_lookup_failed";
}

async function inspectImpactProgram(env, provider = "seatgeek") {
  const config = impactConfig(env, provider);
  if (!config.hasCredentials) {
    return { ok: false, status: "impact_missing_credentials", config: safeImpactDiagnosticConfig(config) };
  }
  if (!config.hasProgramId) {
    return { ok: false, status: "impact_missing_program_id", config: safeImpactDiagnosticConfig(config) };
  }

  const endpoint = buildImpactCampaignEndpoint(config);
  if (!endpoint) {
    return { ok: false, status: "impact_tracking_url_failed_safety_check", config: safeImpactDiagnosticConfig(config) };
  }

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: basicAuthHeader(config.accountSid, config.authToken)
      }
    });
    if (!response.ok) {
      return {
        ok: false,
        status: impactProgramStatus(response.status),
        impactStatusCode: response.status,
        config: safeImpactDiagnosticConfig(config)
      };
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch (error) {
      return {
        ok: false,
        status: "impact_response_parse_failed",
        impactStatusCode: response.status,
        config: safeImpactDiagnosticConfig(config)
      };
    }
    const domains = payload?.DeeplinkDomains?.DeeplinkDomain || payload?.DeeplinkDomains || [];
    const domainList = Array.isArray(domains) ? domains : [domains].filter(Boolean);
    return {
      ok: true,
      status: "impact_program_found",
      impactStatusCode: response.status,
      config: safeImpactDiagnosticConfig(config),
      program: {
        campaignIdPresent: Boolean(payload?.CampaignId),
        contractStatus: clean(payload?.ContractStatus, 60),
        allowsDeeplinking: String(payload?.AllowsDeeplinking || "").toLowerCase() === "true",
        trackingLinkPresent: Boolean(clean(payload?.TrackingLink, 2048)),
        deeplinkDomainsIncludeDestinationHost: domainList.some((domain) =>
          hostnameAllowed(String(domain).toLowerCase(), PROVIDERS[providerKey(provider)]?.allowedDestinationHosts || [])
        )
      },
      impactResponseFieldNames: safeFieldNames(payload)
    };
  } catch (error) {
    return { ok: false, status: "impact_program_lookup_failed", config: safeImpactDiagnosticConfig(config) };
  }
}

function basicAuthHeader(accountSid, authToken) {
  const raw = `${accountSid}:${authToken}`;
  const encoded = typeof btoa === "function"
    ? btoa(raw)
    : Buffer.from(raw, "utf8").toString("base64");
  return `Basic ${encoded}`;
}

function validateImpactTrackingUrl(value, provider = "") {
  const parsed = safeUrl(value);
  const providerConfig = PROVIDERS[providerKey(provider)];
  const isReviewedTrackingHost = isAffiliateTrackingHost(parsed?.hostname);
  const isReviewedProviderHost = Boolean(
    parsed && providerConfig && hostnameAllowed(parsed.hostname, providerConfig.allowedDestinationHosts)
  );
  // Impact can return a branded provider-domain tracking URL. It is accepted
  // only for the provider whose verified deep link was submitted.
  if (!parsed || (!isReviewedTrackingHost && !isReviewedProviderHost)) return null;
  return parsed;
}

function safeFieldNames(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return [];
  return Object.keys(payload)
    .filter((key) => /^[A-Za-z0-9_-]{1,64}$/.test(key))
    .slice(0, 20);
}

function extractImpactTrackingUrl(payload) {
  if (!payload || typeof payload !== "object") return "";
  return clean(
    payload.TrackingURL ||
    payload.TrackingUrl ||
    payload.trackingUrl ||
    payload.tracking_url,
    2048
  );
}

async function createImpactTrackingUrlResult(env, deepLink, provider = "ticketmaster") {
  const normalizedProvider = providerKey(provider || "ticketmaster");
  const config = impactConfig(env, normalizedProvider);
  const endpointDiagnostics = impactEndpointDiagnostics(config, deepLink);
  if (!config.hasCredentials) {
    return {
      ok: false,
      status: "impact_missing_credentials",
      hasProgramId: config.hasProgramId,
      hasCampaignId: config.hasCampaignId,
      impactConfigPresent: false,
      endpointDiagnostics
    };
  }
  if (!config.hasProgramId) {
    return {
      ok: false,
      status: "impact_missing_program_id",
      hasProgramId: false,
      hasCampaignId: config.hasCampaignId,
      impactConfigPresent: false,
      endpointDiagnostics
    };
  }

  const endpoint = buildImpactTrackingEndpoint(config, deepLink);
  if (!endpoint) {
    return {
      ok: false,
      status: "impact_tracking_url_failed_safety_check",
      hasProgramId: config.hasProgramId,
      hasCampaignId: config.hasCampaignId,
      impactConfigPresent: config.configured,
      endpointDiagnostics
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: basicAuthHeader(config.accountSid, config.authToken)
      }
    });
    if (!response.ok) {
      return {
        ok: false,
        status: impactRequestStatus(response.status, normalizedProvider),
        hasProgramId: config.hasProgramId,
        hasCampaignId: config.hasCampaignId,
        impactConfigPresent: config.configured,
        impactStatusCode: response.status,
        endpointDiagnostics,
        ...(await safeImpactResponseDiagnostics(response, config, deepLink))
      };
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch (error) {
      return {
        ok: false,
        status: "impact_response_parse_failed",
        hasProgramId: config.hasProgramId,
        hasCampaignId: config.hasCampaignId,
        impactConfigPresent: config.configured,
        impactStatusCode: response.status,
        endpointDiagnostics
      };
    }
    const impactResponseFieldNames = safeFieldNames(payload);
    const rawTrackingUrl = extractImpactTrackingUrl(payload);
    if (!rawTrackingUrl) {
      return {
        ok: false,
        status: "impact_response_missing_tracking_url",
        hasProgramId: config.hasProgramId,
        hasCampaignId: config.hasCampaignId,
        impactConfigPresent: config.configured,
        impactStatusCode: response.status,
        impactResponseFieldNames,
        endpointDiagnostics
      };
    }
    const trackingUrl = validateImpactTrackingUrl(rawTrackingUrl, normalizedProvider);
    if (!trackingUrl) {
      return {
        ok: false,
        status: "impact_tracking_url_failed_safety_check",
        hasProgramId: config.hasProgramId,
        hasCampaignId: config.hasCampaignId,
        impactConfigPresent: config.configured,
        impactStatusCode: response.status,
        impactResponseFieldNames,
        endpointDiagnostics
      };
    }
    return {
      ok: true,
      trackingUrl: trackingUrl.toString(),
      endpointDiagnostics,
      impactStatusCode: response.status
    };
  } catch (error) {
    return {
      ok: false,
      status: "impact_request_failed",
      hasProgramId: config.hasProgramId,
      hasCampaignId: config.hasCampaignId,
      impactConfigPresent: config.configured,
      endpointDiagnostics
    };
  }
}

async function readBody(request) {
  if (request.method !== "POST") return {};
  try {
    return await request.json();
  } catch (error) {
    return {};
  }
}

// Anonymous visitor key, computed exactly as functions/api/analytics.js does so
// an outbound click can be joined to the page views of the same visit. The IP
// address and user agent are hashed together and discarded — no complete IP is
// stored, and the digest is not reversible to one.
async function hashRequestKey(request) {
  try {
    const ip = clean(request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for"), 120);
    const ua = clean(request.headers.get("user-agent"), 255);
    const bytes = new TextEncoder().encode(`${ip}|${ua}`);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  } catch (error) {
    return null;
  }
}

// The authoritative outbound-click record. Every monetized and unmonetized CTA
// on the site navigates through here, so this row — not the client beacon — is
// what the commercial funnel counts. `provider_click` is the client's
// statement of intent; `outbound_click` is the server's record that a redirect
// was actually issued. See docs/COMMERCIAL_FUNNEL.md.
async function trackClick({ request, env, link, sourcePath, destinationHost, ctaLocation, clickId, impactTracked = false, outcome = "redirected", status = null }) {
  const db = getDemandDb(env);
  if (!db) return;
  // Self-identifying crawlers follow every affiliate link on the page, which
  // inflated outbound_click far above real demand. Skip the analytics write for
  // them; the redirect itself is untouched and still resolves normally.
  if (isLikelyBot(request.headers.get("user-agent"))) return;
  const now = new Date().toISOString();
  const path = normalizeAnalyticsPath(sourcePath);
  const pageType = classifyPageType(path);
  const normalizedCtaLocation = normalizeCtaLocation(ctaLocation);
  const destinationCategory = destinationHost
    ? (impactTracked ? "affiliate_network" : classifyDestination(destinationHost))
    : "unknown";
  // Affiliate status is read from where the redirect actually went, not from the
  // provider's lane. The Impact API tracking path is not host-restricted, so a
  // response resolving to a direct provider URL would otherwise be counted in
  // the affiliate share while `destination_category` correctly said
  // provider_direct. A blocked click has no destination, so it falls back to the
  // lane the visitor was trying to use. Redirect behaviour is unchanged — this
  // only decides what the row records.
  const isAffiliate = destinationCategory === "unknown"
    ? (isAffiliateProvider(link.provider) ? 1 : 0)
    : (destinationCategory === "affiliate_network" ? 1 : 0);
  const userAgent = clean(request.headers.get("user-agent"), 255) || null;
  const metadata = JSON.stringify({
    provider: link.provider,
    artistSlug: link.artistSlug,
    showId: link.showId || null,
    sourcePath: path,
    destinationHost,
    linkId: link.linkId,
    pageType,
    ctaLocation: normalizedCtaLocation || undefined,
    outcome,
    status: status || undefined
  });

  await insertAnalyticsRow(db, {
    created_at: now,
    event_name: outcome === "redirected" ? "outbound_click" : "outbound_blocked",
    source_path: path,
    artist_slug: link.artistSlug || null,
    email: null,
    request_key: await hashRequestKey(request),
    // Not an acquisition source: under the site's same-origin referrer policy
    // the Referer on this hop is one of our own pages, and that page is already
    // recorded as source_path.
    referrer: null,
    user_agent: userAgent,
    metadata_json: metadata,
    provider: link.provider || null,
    tour_slug: null,
    destination_host: destinationHost || null,
    link_id: link.linkId || null,
    page_type: pageType,
    landing_path: null,
    event_id: link.eventId || link.showId || null,
    event_date: link.eventDate || null,
    event_city: link.eventCity || null,
    event_venue: link.eventVenue || null,
    cta_location: normalizedCtaLocation,
    destination_category: destinationCategory,
    is_affiliate: isAffiliate,
    device_category: classifyDeviceCategory(userAgent),
    acquisition_source: null,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    click_id: clickId || null
  });
}

// Server receipt for a legitimate request entering the outbound funnel. This
// is distinct from `outbound_click`, which means a 3xx was actually issued.
// The same opaque click ID joins this row to exactly one terminal outcome.
async function trackOutboundAttempt({ request, env, link, sourcePath, ctaLocation, clickId }) {
  const db = getDemandDb(env);
  if (!db || isLikelyBot(request.headers.get("user-agent"))) return;
  const path = normalizeAnalyticsPath(sourcePath);
  const pageType = classifyPageType(path);
  const userAgent = clean(request.headers.get("user-agent"), 255) || null;
  await insertAnalyticsRow(db, {
    created_at: new Date().toISOString(),
    event_name: "outbound_attempt",
    source_path: path,
    artist_slug: link.artistSlug || null,
    email: null,
    request_key: await hashRequestKey(request),
    referrer: null,
    user_agent: userAgent,
    metadata_json: JSON.stringify({
      provider: link.provider,
      showId: link.showId || null,
      linkId: link.linkId || null,
      pageType,
      ctaLocation: normalizeCtaLocation(ctaLocation) || undefined,
      outcome: "attempted"
    }),
    provider: link.provider || null,
    tour_slug: null,
    destination_host: null,
    link_id: link.linkId || null,
    page_type: pageType,
    landing_path: null,
    event_id: link.eventId || link.showId || null,
    event_date: link.eventDate || null,
    event_city: link.eventCity || null,
    event_venue: link.eventVenue || null,
    cta_location: normalizeCtaLocation(ctaLocation),
    destination_category: "unknown",
    is_affiliate: isAffiliateProvider(link.provider) ? 1 : 0,
    device_category: classifyDeviceCategory(userAgent),
    acquisition_source: null,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    click_id: clickId || null
  });
}

// A CTA the visitor clicked that did not produce a redirect — an Impact
// tracking failure, a provider switched off, or a destination that no longer
// validates. Without this the funnel silently loses the click and the lane
// looks merely unpopular rather than broken. Deliberately limited to provider
// and configuration failures: malformed or probing requests are not demand
// signal and are not recorded.
const TRACKED_BLOCK_STATUSES = new Set([
  "provider_not_configured",
  "configured_redirect_rejected",
  "event_ticket_url_unavailable",
  "event_link_not_publishable",
  "event_data_unavailable",
  "impact_missing_credentials",
  "impact_missing_program_id",
  "impact_request_failed",
  "impact_response_parse_failed",
  "impact_response_missing_tracking_url",
  "impact_tracking_url_unsafe",
  "impact_tracking_url_failed_safety_check",
  "impact_tracking_endpoint_not_found",
  "impact_program_not_accessible",
  "impact_base_tracking_url_missing",
  "impact_base_tracking_url_invalid",
  "impact_base_tracking_url_unsafe",
  "impact_base_tracking_url_host_not_allowed"
]);

async function trackBlockedClick({ request, env, link, sourcePath, ctaLocation, clickId = null, status }) {
  if (!TRACKED_BLOCK_STATUSES.has(String(status || ""))) return;
  await trackClick({
    request,
    env,
    link,
    sourcePath,
    destinationHost: null,
    ctaLocation,
    clickId,
    outcome: "blocked",
    status
  });
}


function impactFailureStatus(status) {
  if (status === "impact_tracking_url_failed_safety_check") return "impact_tracking_url_unsafe";
  return status || "impact_request_failed";
}

function impactFailurePayload(provider, resolved, result, config) {
  const payload = {
    ok: false,
    status: impactFailureStatus(result.status),
    provider,
    hasDestination: true,
    destinationHost: resolved.redirect.hostname.toLowerCase(),
    impactConfigPresent: Boolean(config.configured),
    hasProgramId: Boolean(result.hasProgramId ?? config.hasProgramId),
    hasCampaignId: Boolean(result.hasCampaignId ?? config.hasCampaignId),
    programIdSource: config.programIdSource || "",
    outVersion: OUT_VERSION_HEADER
  };

  if (Number.isInteger(result.impactStatusCode)) {
    payload.impactStatusCode = result.impactStatusCode;
  }
  if (Array.isArray(result.impactResponseFieldNames)) {
    payload.impactResponseFieldNames = result.impactResponseFieldNames;
  }
  if (result.impactResponseMessage) {
    payload.impactResponseMessage = result.impactResponseMessage;
  }
  if (result.endpointDiagnostics) {
    payload.impactEndpoint = result.endpointDiagnostics;
  }

  return payload;
}

async function handleOut(request, env, mode) {
  const url = new URL(request.url);
  const body = await readBody(request);
  const showId = clean(body.showId || url.searchParams.get("showId"), 255);
  const artistSlug = slugify(body.artistSlug || url.searchParams.get("artistSlug"));
  const provider = providerKey(body.provider || url.searchParams.get("provider") || "ticketmaster");
  // The page the click came from. An explicit parameter wins; the Referer is
  // the fallback and is reduced to a path (the site's same-origin referrer
  // policy means this header is one of our own pages and is never sent to a
  // third party). Recorded as a path only — no origin, no query string.
  const sourcePath = normalizeAnalyticsPath(
    body.sourcePath || url.searchParams.get("sourcePath") || request.headers.get("referer") || "/"
  );
  // Which CTA component was clicked. `surface` is the existing artist-level
  // parameter name; both are validated against the fixed CTA_LOCATIONS list, so
  // an arbitrary query value is discarded rather than stored.
  const ctaLocation = normalizeCtaLocation(
    body.ctaLocation || url.searchParams.get("ctaLocation") || url.searchParams.get("surface")
  );
  const requestedDestination = clean(body.destinationUrl || body.deepLink || url.searchParams.get("destinationUrl") || url.searchParams.get("deepLink"), 2048);
  const clickId = createClickId();

  const providerConfig = PROVIDERS[provider];
  if (!providerConfig) return json({ ok: false, status: "unknown_provider" }, 400);
  if (!showId && !artistSlug) return json({ ok: false, status: "missing_artist_slug" }, 400);
  await trackOutboundAttempt({
    request,
    env,
    link: { provider, artistSlug: artistSlug || null, linkId: showId || null, showId: showId || null },
    sourcePath,
    ctaLocation,
    clickId
  });
  if (providerConfig.publicEnabledEnv && !impactMarketplacePublicEnabled(env, provider)) {
    await trackBlockedClick({
      request,
      env,
      link: { provider, artistSlug: artistSlug || null, linkId: null, showId: showId || null },
      sourcePath,
      ctaLocation,
      clickId,
      status: "provider_not_configured"
    });
    return json({ ok: false, status: "provider_not_configured" }, 400);
  }

  if (showId) {
    // showId mode is intentionally controlled: resolve the stored event URL
    // first, then wrap it with Impact for affiliate providers (SeatGeek).
    // Ticketmaster event redirects are plain, unmonetized links. Do not use
    // user deep links or provider discovery/search fallbacks for an event click.
    const resolved = await resolveShowLink(env, showId, provider);
    if (!resolved.ok) {
      await trackBlockedClick({
        request,
        env,
        link: { provider, artistSlug: artistSlug || null, linkId: showId, showId },
        sourcePath,
        ctaLocation,
        clickId,
        status: resolved.status
      });
      return json({ ok: false, status: resolved.status }, resolved.httpStatus || 400);
    }

    if (IMPACT_WRAPPED_PROVIDERS.has(provider)) {
      // SeatGeek / Vivid Seats showId redirects are event URL-first. The
      // destination was read from the stored event field and validated as a
      // direct HTTPS provider URL by resolveShowLink before any Impact call.
      // There is intentionally no provider API search or broad fallback in
      // this path, and no raw-URL fallback: an Impact failure returns a
      // diagnostic JSON, never an untracked redirect.
      const destination = resolved.redirect.toString();
      const providerImpactConfig = impactConfig(env, provider);
      const validateEventDestination = provider === "seatgeek"
        ? (value) => validateSeatGeekEventUrl(value, PROVIDERS.seatgeek)
        : provider === "vivid-seats"
          ? (value) => validateVividSeatsEventUrl(value, PROVIDERS["vivid-seats"])
          : (value) => validateImpactMarketplaceEventUrl(value, providerConfig);
      let impactTrackingResult = null;

      if (hasBaseTrackingUrl(env, provider)) {
        impactTrackingResult = buildBaseTrackingRedirect(env, provider, destination, validateEventDestination, clickId);
      } else {
        impactTrackingResult = await createImpactTrackingUrlResult(env, destination, provider);
      }

      if (!impactTrackingResult.ok) {
        await trackBlockedClick({ request, env, link: resolved.link, sourcePath, ctaLocation, clickId, status: impactTrackingResult.status });
        return json(impactFailurePayload(provider, resolved, impactTrackingResult, providerImpactConfig), 400);
      }

      const outbound = safeUrl(impactTrackingResult.trackingUrl);
      if (!outbound) {
        await trackBlockedClick({ request, env, link: resolved.link, sourcePath, ctaLocation, clickId, status: "impact_tracking_url_failed_safety_check" });
        return json(impactFailurePayload(provider, resolved, {
          ok: false,
          status: "impact_tracking_url_failed_safety_check",
          hasProgramId: providerImpactConfig.hasProgramId,
          impactConfigPresent: providerImpactConfig.configured
        }, providerImpactConfig), 400);
      }

      await trackClick({
        request,
        env,
        link: resolved.link,
        sourcePath,
        destinationHost: outbound.hostname.toLowerCase(),
        ctaLocation,
        clickId,
        impactTracked: true
      });

      if (mode === "redirect") {
        return redirectResponse(outbound.toString(), 302);
      }

      return json({
        ok: true,
        status: "redirect_ready",
        redirectUrl: outbound.toString(),
        provider,
        artistSlug: resolved.link.artistSlug,
        showId: resolved.link.showId
      });
    }

    // Ticketmaster: plain redirect to the verified event URL, no Impact call.
    const outbound = resolved.redirect;

    await trackClick({
      request,
      env,
      link: resolved.link,
      sourcePath,
      destinationHost: outbound.hostname.toLowerCase(),
      ctaLocation,
      clickId
    });

    if (mode === "redirect") {
      return redirectResponse(outbound.toString(), 302);
    }

    return json({
      ok: true,
      status: "redirect_ready",
      redirectUrl: outbound.toString(),
      provider,
      artistSlug: resolved.link.artistSlug,
      showId: resolved.link.showId
    });
  }

  if (!artistSlug) return json({ ok: false, status: "missing_artist_slug" }, 400);

  const destinationCheck = validateRequestedDestination(providerConfig, requestedDestination);
  if (!destinationCheck.ok) {
    return json({ ok: false, status: destinationCheck.status }, 400);
  }

  const link = VERIFIED_TICKET_LINKS[`${artistSlug}:${provider}`];
  if (!link || !link.verified) {
    await trackBlockedClick({
      request,
      env,
      link: { provider, artistSlug, linkId: null, showId: null },
      sourcePath,
      ctaLocation,
      clickId,
      status: "provider_not_configured"
    });
    return json({ ok: false, status: "provider_not_configured" }, 400);
  }

  const redirect = validateConfiguredRedirect(providerConfig, link.redirectUrl);
  if (!redirect) {
    await trackBlockedClick({ request, env, link, sourcePath, ctaLocation, clickId, status: "configured_redirect_rejected" });
    return json({ ok: false, status: "configured_redirect_rejected" }, 400);
  }

  let outbound = redirect;
  if (IMPACT_WRAPPED_PROVIDERS.has(provider)) {
    // Artist-level SeatGeek / Vivid Seats clicks are Impact-wrapped exactly
    // like the event path; failures return diagnostic JSON, never an
    // untracked redirect. Ticketmaster artist links stay plain, unmonetized
    // redirects. The destination re-validation uses the artist-level rule
    // (validateConfiguredRedirect) because the redirectUrl is a hand-verified
    // performer-page constant, not an event URL.
    const providerImpactConfig = impactConfig(env, provider);
    if (!providerImpactConfig.configured && !hasBaseTrackingUrl(env, provider)) {
      await trackBlockedClick({ request, env, link, sourcePath, ctaLocation, clickId, status: "provider_not_configured" });
      return json({ ok: false, status: "provider_not_configured" }, 400);
    }
    const validateArtistDestination = (value) => validateConfiguredRedirect(providerConfig, value);
    const impactTrackingResult = hasBaseTrackingUrl(env, provider)
      ? buildBaseTrackingRedirect(env, provider, redirect.toString(), validateArtistDestination, clickId)
      : await createImpactTrackingUrlResult(env, redirect.toString(), provider);
    if (!impactTrackingResult.ok) {
      await trackBlockedClick({ request, env, link, sourcePath, ctaLocation, clickId, status: impactTrackingResult.status });
      return json(impactFailurePayload(provider, { redirect }, impactTrackingResult, providerImpactConfig), 400);
    }
    outbound = safeUrl(impactTrackingResult.trackingUrl);
    if (!outbound) {
      await trackBlockedClick({ request, env, link, sourcePath, ctaLocation, clickId, status: "impact_tracking_url_failed_safety_check" });
      return json(impactFailurePayload(provider, { redirect }, {
        ok: false,
        status: "impact_tracking_url_failed_safety_check",
        hasProgramId: providerImpactConfig.hasProgramId,
        impactConfigPresent: providerImpactConfig.configured
      }, providerImpactConfig), 400);
    }
  }

  await trackClick({
    request,
    env,
    link,
    sourcePath,
    destinationHost: outbound.hostname.toLowerCase(),
    ctaLocation,
    clickId,
    impactTracked: IMPACT_WRAPPED_PROVIDERS.has(provider)
  });

  if (mode === "redirect") {
    return redirectResponse(outbound.toString(), 302);
  }

  return json({
    ok: true,
    status: "redirect_ready",
    redirectUrl: outbound.toString(),
    provider,
    artistSlug
  });
}

export {
  buildBaseTrackingRedirect,
  outboundClickIdParam,
  createImpactTrackingUrlResult,
  impactConfig,
  impactEndpointDiagnostics,
  inspectImpactProgram,
  safeImpactDiagnosticConfig,
  PROVIDERS,
  VERIFIED_TICKET_LINKS
};

export async function onRequestGet({ request, env }) {
  return handleOut(request, env, "redirect");
}

export async function onRequestPost({ request, env }) {
  return handleOut(request, env, "json");
}
