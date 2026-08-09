// Runtime-faithful event CTA publishability, shared by the tooling.
//
// The renderer decides what a show card offers in `serverShowCtaSpecs`
// (functions/[[path]].js), with the identical gate mirrored in public/app.js,
// functions/api/shows.js and functions/api/out.js. Any offline tool that wants
// to answer "how many checked ticket sites does this date actually lead to?"
// has to reproduce that decision exactly, or it reports a number the site never
// shows. This module is the one offline mirror; `scripts/report-link-coverage.mjs`
// and the SeatGeek enrichment prioritiser both read it, so they cannot drift
// from each other even if one of them is edited.
//
// The gate has three independent parts, all of which must pass for a lane:
//
//   1. Provider publishability (`providerEventPublishable`) — Ticketmaster
//      uses its stored destination; every other lane publishes on its own
//      verified provenance.
//   2. A stored destination that passes that provider's URL-shape validator —
//      host allowlist, no generic search/artist/venue page, provider-specific
//      event-path shape.
//   3. Runtime provider configuration — the public flag plus Impact tracking
//      credentials for the affiliate lanes.
//
// Nothing here is a policy decision of its own. When the runtime gate changes,
// change it here in the same commit.

function clean(value, max = 2048) {
  return String(value ?? "").trim().slice(0, max);
}

// ---------------------------------------------------------------------------
// Lane definitions (mirrors IMPACT_MARKETPLACE_PROVIDERS + the two dedicated
// lanes in functions/[[path]].js)
// ---------------------------------------------------------------------------

export const PROVIDER_LANES = Object.freeze([
  Object.freeze({ slug: "seatgeek", name: "SeatGeek", urlField: "seatgeek_url", kind: "seatgeek" }),
  Object.freeze({ slug: "vivid-seats", name: "Vivid Seats", urlField: "vividseats_url", kind: "vividseats" }),
  Object.freeze({
    slug: "ticketnetwork", name: "TicketNetwork", urlField: "ticketnetwork_url", kind: "impact-marketplace",
    allowedHosts: Object.freeze(["ticketnetwork.com"])
  }),
  Object.freeze({
    slug: "ticket-liquidator", name: "Ticket Liquidator", urlField: "ticketliquidator_url", kind: "impact-marketplace",
    allowedHosts: Object.freeze(["ticketliquidator.com"])
  }),
  Object.freeze({
    slug: "stubhub-international", name: "StubHub International", urlField: "stubhub_international_url", kind: "impact-marketplace",
    allowedHosts: Object.freeze([
      "stubhub.co.uk", "stubhub.ie", "stubhub.de", "stubhub.fr", "stubhub.es", "stubhub.it",
      "stubhub.pt", "stubhub.pl", "stubhub.se", "stubhub.dk", "stubhub.fi", "stubhub.gr",
      "stubhub.nl", "stubhub.lu", "stubhub.cz", "stubhub.be", "stubhub.co.at"
    ])
  }),
  // Ticketmaster renders last on the card and is a plain, unmonetized link.
  Object.freeze({ slug: "ticketmaster", name: "Ticketmaster", urlField: "ticketmaster_url", kind: "ticketmaster" })
]);

export const IMPACT_MARKETPLACE_SLUGS = Object.freeze(
  PROVIDER_LANES.filter((lane) => lane.kind === "impact-marketplace").map((lane) => lane.slug)
);

export function laneBySlug(slug) {
  return PROVIDER_LANES.find((lane) => lane.slug === slug) || null;
}

// ---------------------------------------------------------------------------
// Publishability (faithful copy of functions/[[path]].js)
// ---------------------------------------------------------------------------

/** Row-status gate — governs the Ticketmaster link. */
export function eventLinkPublishable(event) {
  const destination = clean(event?.ticketmaster_url || event?.source_url);
  if (destination) return true;
  return event?.provider_links?.ticketmaster?.verified === true;
}

/** Per-provider gate. */
export function providerEventPublishable(event, provider) {
  if (IMPACT_MARKETPLACE_SLUGS.includes(provider)) {
    return event?.provider_links?.[provider]?.verified === true;
  }
  if (provider !== "ticketmaster" && event?.provider_links?.[provider]?.verified === true) return true;
  return eventLinkPublishable(event);
}

// ---------------------------------------------------------------------------
// URL-shape validators (faithful copies of the safe*TicketUrl helpers)
// ---------------------------------------------------------------------------

export function safeShowTicketUrl(value) {
  const raw = clean(value);
  if (!raw) return null;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    const host = parsed.hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1") return null;
    if (/example/.test(host) || raw.includes("placeholder")) return null;
    return raw;
  } catch {
    return null;
  }
}

export function safeSeatGeekEventUrl(value) {
  const safeUrl = safeShowTicketUrl(value);
  if (!safeUrl) return null;
  try {
    const parsed = new URL(safeUrl);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    const path = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
    if (host !== "seatgeek.com" && host !== "www.seatgeek.com") return null;
    if (!path || path === "/") return null;
    if (/^\/(search|venues?|performers?|artists?|concert-tickets|tickets)(?:\/|$)/i.test(path)) return null;
    return /\/(concert|sports|theater|theatre)\/\d+$/i.test(path) ? safeUrl : null;
  } catch {
    return null;
  }
}

export function safeVividSeatsEventUrl(value) {
  const safeUrl = safeShowTicketUrl(value);
  if (!safeUrl) return null;
  try {
    const parsed = new URL(safeUrl);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    const path = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
    if (host !== "vividseats.com" && host !== "www.vividseats.com") return null;
    if (!path || path === "/") return null;
    if (/^\/(search|venues?|performers?|artists?|category|concerts?|sports?|theater|theatre)(?:\/|$)/i.test(path)) return null;
    return /\/production\/\d+$/i.test(path) ? safeUrl : null;
  } catch {
    return null;
  }
}

export function safeImpactMarketplaceEventUrl(value, lane) {
  const safeUrl = safeShowTicketUrl(value);
  if (!safeUrl || !lane) return null;
  try {
    const parsed = new URL(safeUrl);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    if (!lane.allowedHosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`))) return null;
    const path = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
    if (!path || path === "/" || /^\/(search|home|about|help|support|faq|contact|terms|privacy)(?:\/|$)/i.test(path)) return null;
    return safeUrl;
  } catch {
    return null;
  }
}

/** The URL-shape validator for one lane, applied to that lane's stored field. */
export function safeLaneUrl(event, lane) {
  const value = event?.[lane.urlField];
  switch (lane.kind) {
    case "seatgeek": return safeSeatGeekEventUrl(value);
    case "vividseats": return safeVividSeatsEventUrl(value);
    case "impact-marketplace": return safeImpactMarketplaceEventUrl(value, lane);
    case "ticketmaster": return safeShowTicketUrl(value);
    default: return null;
  }
}

// ---------------------------------------------------------------------------
// Lane evaluation
// ---------------------------------------------------------------------------

/** Why a lane does not currently publish. Stable machine-readable codes. */
export const LANE_BLOCKERS = Object.freeze({
  PROVIDER_NOT_CONFIGURED: "provider_not_configured",
  NOT_VERIFIED: "provider_not_verified",
  NO_URL: "provider_no_stored_url",
  URL_SHAPE: "provider_url_shape_invalid"
});

/**
 * Evaluate one provider lane for one event.
 *
 * @param {any} event Raw events.json record.
 * @param {object} lane One of PROVIDER_LANES.
 * @param {(slug: string) => boolean} isConfigured Runtime configuration test.
 * @returns {{slug: string, name: string, publishes: boolean, blocker: string, url: string|null}}
 */
export function evaluateLane(event, lane, isConfigured) {
  const configured = isConfigured ? isConfigured(lane.slug) !== false : true;
  const url = safeLaneUrl(event, lane);
  const publishable = providerEventPublishable(event, lane.slug);
  if (!configured) {
    return { slug: lane.slug, name: lane.name, publishes: false, blocker: LANE_BLOCKERS.PROVIDER_NOT_CONFIGURED, url: null };
  }
  if (!clean(event?.[lane.urlField])) {
    return { slug: lane.slug, name: lane.name, publishes: false, blocker: LANE_BLOCKERS.NO_URL, url: null };
  }
  if (!url) {
    return { slug: lane.slug, name: lane.name, publishes: false, blocker: LANE_BLOCKERS.URL_SHAPE, url: null };
  }
  if (!publishable) {
    return { slug: lane.slug, name: lane.name, publishes: false, blocker: LANE_BLOCKERS.NOT_VERIFIED, url: null };
  }
  return { slug: lane.slug, name: lane.name, publishes: true, blocker: "", url };
}

/**
 * Every provider lane evaluated for one event, in card display order.
 * @returns {Array<{slug:string,name:string,publishes:boolean,blocker:string,url:string|null}>}
 */
export function evaluateEventLanes(event, isConfigured) {
  return PROVIDER_LANES.map((lane) => evaluateLane(event, lane, isConfigured));
}

/** Slugs of the lanes whose button would render for this event. */
export function publishableLaneSlugs(event, isConfigured) {
  return evaluateEventLanes(event, isConfigured).filter((lane) => lane.publishes).map((lane) => lane.slug);
}

/** How many checked ticket sites this date currently leads to. */
export function publishableCtaCount(event, isConfigured) {
  return publishableLaneSlugs(event, isConfigured).length;
}

// ---------------------------------------------------------------------------
// Runtime configuration
// ---------------------------------------------------------------------------

/**
 * Runtime-configuration test built from `public/data/catalog.json`.
 *
 * A lane the catalog marks `public_enabled: false` is off everywhere. A lane it
 * marks enabled is treated as configured, which matches the deployed
 * environment recorded in PROJECT_STATUS.md; pass `env` to additionally require
 * the Impact tracking credentials, which is what a local run without secrets
 * should report.
 *
 * @param {any} catalog Parsed catalog.json.
 * @param {object|null} env Optional process.env-like object.
 */
export function providerConfiguredTest(catalog, env = null) {
  const providers = Array.isArray(catalog?.providers) ? catalog.providers : [];
  const publicEnabled = new Map(providers.map((provider) => [clean(provider?.slug, 80), provider?.public_enabled === true]));
  return (slug) => {
    if (publicEnabled.has(slug) && publicEnabled.get(slug) === false) return false;
    if (!env) return true;
    if (slug === "ticketmaster") return true;
    if (slug === "seatgeek") {
      return Boolean(
        clean(env.IMPACT_SEATGEEK_BASE_TRACKING_URL) ||
        (clean(env.IMPACT_SEATGEEK_ACCOUNT_SID) && clean(env.IMPACT_SEATGEEK_AUTH_TOKEN) &&
          clean(env.IMPACT_SEATGEEK_CAMPAIGN_ID || env.IMPACT_SEATGEEK_PROGRAM_ID))
      );
    }
    if (slug === "vivid-seats") {
      return Boolean(
        clean(env.IMPACT_VIVIDSEATS_BASE_TRACKING_URL) ||
        (clean(env.IMPACT_SEATGEEK_ACCOUNT_SID) && clean(env.IMPACT_SEATGEEK_AUTH_TOKEN) &&
          clean(env.IMPACT_VIVIDSEATS_CAMPAIGN_ID || env.IMPACT_VIVIDSEATS_PROGRAM_ID))
      );
    }
    const prefixes = {
      ticketnetwork: ["IMPACT_TICKETNETWORK", "TICKETNETWORK_PUBLIC_ENABLED"],
      "ticket-liquidator": ["IMPACT_TICKETLIQUIDATOR", "TICKETLIQUIDATOR_PUBLIC_ENABLED"],
      "stubhub-international": ["IMPACT_STUBHUB_INTERNATIONAL", "STUBHUB_INTERNATIONAL_PUBLIC_ENABLED"]
    }[slug];
    if (!prefixes) return true;
    const [prefix, publicFlag] = prefixes;
    const flag = clean(env[publicFlag]);
    if (flag && flag.toLowerCase() !== "true") return false;
    return Boolean(
      clean(env[`${prefix}_BASE_TRACKING_URL`]) ||
      (clean(env.IMPACT_SEATGEEK_ACCOUNT_SID) && clean(env.IMPACT_SEATGEEK_AUTH_TOKEN))
    );
  };
}

// ---------------------------------------------------------------------------
// Upcoming-event helper
// ---------------------------------------------------------------------------

/**
 * Is this event still ahead of us? Uses the same parse the renderer's board
 * filter uses (`Date.parse(datetime_iso)`), so the report counts the same set
 * of cards a visitor would see. An unparseable date is conservatively treated
 * as upcoming so it cannot silently vanish from the report.
 */
export function isUpcoming(event, now = Date.now()) {
  const parsed = Date.parse(clean(event?.datetime_iso || event?.dateTimeISO, 100));
  if (!Number.isFinite(parsed)) return true;
  return parsed >= now;
}
