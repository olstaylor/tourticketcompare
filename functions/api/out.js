const PLACEHOLDER_URL_PATTERN = /example\.com|placeholder|your-link|replace-me|localhost|127\.0\.0\.1/i;
const EVENTS_JSON_PATH = "/data/events.json";
const DEFAULT_IMPACT_API_BASE = "https://api.impact.com";
const IMPACT_PXF_TRACKING_HOSTS = ["pxf.io"];
// Temporary production proof header for /api/out. Remove after verifying
// SeatGeek event URL-first redirects are live.
const OUT_VERSION_HEADER = "seatgeek-impact-diagnostics-2026-05-13";

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
    trustedAffiliateHosts: ["ticketmaster.evyy.net"]
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
  }
};

const VERIFIED_TICKET_LINKS = {
  "beyonce:ticketmaster": {
    artistSlug: "beyonce",
    provider: "ticketmaster",
    linkId: "tm-artist-beyonce",
    redirectUrl: "https://ticketmaster.evyy.net/beyonce",
    verified: true
  },
  "harry-styles:ticketmaster": {
    artistSlug: "harry-styles",
    provider: "ticketmaster",
    linkId: "tm-artist-harry-styles",
    redirectUrl: "https://ticketmaster.evyy.net/vD4B5y",
    verified: true
  },
  "bts:ticketmaster": {
    artistSlug: "bts",
    provider: "ticketmaster",
    linkId: "tm-artist-bts",
    redirectUrl: "https://ticketmaster.evyy.net/OY9gkr",
    verified: true
  },
  "ariana-grande:ticketmaster": {
    artistSlug: "ariana-grande",
    provider: "ticketmaster",
    linkId: "tm-artist-ariana-grande",
    redirectUrl: "https://ticketmaster.evyy.net/bkDx6b",
    verified: true
  },
  "bad-bunny:ticketmaster": {
    artistSlug: "bad-bunny",
    provider: "ticketmaster",
    linkId: "tm-artist-bad-bunny",
    redirectUrl: "https://ticketmaster.evyy.net/zzeEWW",
    verified: true
  },
  "morgan-wallen:ticketmaster": {
    artistSlug: "morgan-wallen",
    provider: "ticketmaster",
    linkId: "tm-artist-morgan-wallen",
    redirectUrl: "https://ticketmaster.evyy.net/morganwallenus",
    verified: true
  },
  "jay-z:ticketmaster": {
    artistSlug: "jay-z",
    provider: "ticketmaster",
    linkId: "tm-artist-jay-z",
    redirectUrl: "https://ticketmaster.evyy.net/5kM6W3",
    verified: true
  },
  "olivia-rodrigo:ticketmaster": {
    artistSlug: "olivia-rodrigo",
    provider: "ticketmaster",
    linkId: "tm-artist-olivia-rodrigo",
    redirectUrl: "https://www.ticketmaster.com/artist/2836194",
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

async function resolveShowLink(env, showId, provider) {
  const events = await loadEventsFromAssets(env);
  if (!events) return { ok: false, status: "event_data_unavailable", httpStatus: 503 };

  const event = events.find((candidate) => clean(candidate?.id, 255) === showId);
  if (!event) return { ok: false, status: "show_not_found" };

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
        verified: true
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
        verified: true
      },
      redirect
    };
  }

  return { ok: false, status: "provider_not_configured" };
}


function hasSeatGeekBaseTrackingUrl(env = {}) {
  return Boolean(clean(env?.IMPACT_SEATGEEK_BASE_TRACKING_URL, 2048));
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

function buildSeatGeekBaseTrackingRedirect(env, destination) {
  const configuredBase = clean(env?.IMPACT_SEATGEEK_BASE_TRACKING_URL, 2048);
  if (!configuredBase) return { ok: false, status: "impact_base_tracking_url_missing" };

  const base = validateImpactPxfBaseTrackingUrl(configuredBase);
  if (!base.ok) return base;

  const destinationUrl = validateSeatGeekEventUrl(destination, PROVIDERS.seatgeek);
  if (!destinationUrl) {
    return { ok: false, status: "event_ticket_url_unavailable" };
  }

  const outbound = new URL(base.url.toString());
  outbound.searchParams.set("u", destinationUrl.toString());
  return { ok: true, trackingUrl: outbound.toString() };
}

function impactConfig(env = {}, provider = "ticketmaster") {
  const normalizedProvider = providerKey(provider || "ticketmaster");
  const apiBase = clean(env?.IMPACT_API_BASE_URL || DEFAULT_IMPACT_API_BASE, 2048).replace(/\/+$/, "");

  if (normalizedProvider === "seatgeek") {
    // Impact's publisher API calls the create-tracking-link path parameter
    // ProgramId, while the joined-program listing and related endpoints expose
    // the same identifier as CampaignId. Prefer the explicit CampaignId alias
    // for SeatGeek, but keep IMPACT_SEATGEEK_PROGRAM_ID as a backwards-
    // compatible fallback for the current Cloudflare Pages configuration.
    const accountSid = clean(env?.IMPACT_SEATGEEK_ACCOUNT_SID || env?.IMPACT_ACCOUNT_SID, 255);
    const authToken = clean(env?.IMPACT_SEATGEEK_AUTH_TOKEN || env?.IMPACT_AUTH_TOKEN, 255);
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

  const accountSid = clean(env?.IMPACT_TICKETMASTER_ACCOUNT_SID || env?.IMPACT_ACCOUNT_SID, 255);
  const authToken = clean(env?.IMPACT_TICKETMASTER_AUTH_TOKEN || env?.IMPACT_AUTH_TOKEN, 255);
  const programId = clean(env?.IMPACT_TICKETMASTER_PROGRAM_ID, 120);
  return {
    accountSid,
    authToken,
    programId,
    campaignId: "",
    legacyProgramId: programId,
    programIdSource: programId ? "IMPACT_TICKETMASTER_PROGRAM_ID" : "",
    apiBase,
    provider: normalizedProvider,
    hasCredentials: Boolean(accountSid && authToken),
    hasProgramId: Boolean(programId),
    hasCampaignId: false,
    configured: Boolean(accountSid && authToken && programId)
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

function impactRequestStatus(statusCode, provider = "ticketmaster") {
  if (Number(statusCode) === 404 && providerKey(provider) === "seatgeek") {
    return "impact_tracking_endpoint_not_found";
  }
  if (Number(statusCode) === 403 && providerKey(provider) === "seatgeek") {
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
        deeplinkDomainsIncludeDestinationHost: domainList.some((domain) => String(domain).toLowerCase() === "seatgeek.com")
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

function validateImpactTrackingUrl(value) {
  return safeUrl(value);
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
    const trackingUrl = validateImpactTrackingUrl(rawTrackingUrl);
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

async function createImpactTrackingUrl(env, deepLink, provider = "ticketmaster") {
  const result = await createImpactTrackingUrlResult(env, deepLink, provider);
  return result.ok ? result.trackingUrl : null;
}

async function readBody(request) {
  if (request.method !== "POST") return {};
  try {
    return await request.json();
  } catch (error) {
    return {};
  }
}

async function trackClick({ request, env, link, sourcePath, destinationHost }) {
  const db = getDemandDb(env);
  if (!db) return;
  const now = new Date().toISOString();
  const metadata = JSON.stringify({
    provider: link.provider,
    artistSlug: link.artistSlug,
    showId: link.showId || null,
    sourcePath,
    destinationHost,
    linkId: link.linkId
  });
  try {
    await db
      .prepare(
        `INSERT INTO analytics_events (
          created_at, event_name, source_path, artist_slug, email, request_key, referrer, user_agent,
          metadata_json, provider, tour_slug, destination_host, link_id
        ) VALUES (?1, ?2, ?3, ?4, NULL, NULL, ?5, ?6, ?7, ?8, NULL, ?9, ?10)`
      )
      .bind(
        now,
        "outbound_click",
        sourcePath || "/",
        link.artistSlug,
        clean(request.headers.get("referer"), 512) || null,
        clean(request.headers.get("user-agent"), 255) || null,
        metadata,
        link.provider,
        destinationHost || null,
        link.linkId
      )
      .run();
  } catch (error) {
    try {
      await db
        .prepare(
          `INSERT INTO analytics_events (
            created_at, event_name, source_path, artist_slug, email, request_key, referrer, user_agent, metadata_json
          ) VALUES (?1, ?2, ?3, ?4, NULL, NULL, ?5, ?6, ?7)`
        )
        .bind(
          now,
          "outbound_click",
          sourcePath || "/",
          link.artistSlug,
          clean(request.headers.get("referer"), 512) || null,
          clean(request.headers.get("user-agent"), 255) || null,
          metadata
        )
        .run();
    } catch (fallbackError) {
      // Click tracking must never block a safe redirect.
    }
  }
}


function impactFailureStatus(status) {
  if (status === "impact_tracking_url_failed_safety_check") return "impact_tracking_url_unsafe";
  return status || "impact_request_failed";
}

function seatGeekImpactFailurePayload(resolved, result, config) {
  const payload = {
    ok: false,
    status: impactFailureStatus(result.status),
    provider: "seatgeek",
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
  const sourcePath = clean(body.sourcePath || url.searchParams.get("sourcePath") || request.headers.get("referer") || "/", 255);
  const requestedDestination = clean(body.destinationUrl || body.deepLink || url.searchParams.get("destinationUrl") || url.searchParams.get("deepLink"), 2048);

  const providerConfig = PROVIDERS[provider];
  if (!providerConfig) return json({ ok: false, status: "unknown_provider" }, 400);

  if (showId) {
    // showId mode is intentionally controlled: resolve the stored event URL first,
    // then optionally wrap it with Impact. Do not use user deep links or provider
    // discovery/search fallbacks for an event click.
    const resolved = await resolveShowLink(env, showId, provider);
    if (!resolved.ok) {
      return json({ ok: false, status: resolved.status }, resolved.httpStatus || 400);
    }

    if (provider === "seatgeek") {
      // SeatGeek showId redirects are event URL-first. The destination was read
      // from event.seatgeek_url and validated as an HTTPS seatgeek.com URL by
      // resolveShowLink before any Impact call. There is intentionally no
      // SeatGeek API search or broad fallback in this path.
      const destination = resolved.redirect.toString();
      const seatGeekImpactConfig = impactConfig(env, "seatgeek");
      let impactTrackingResult = null;

      if (hasSeatGeekBaseTrackingUrl(env)) {
        impactTrackingResult = buildSeatGeekBaseTrackingRedirect(env, destination);
      } else {
        impactTrackingResult = await createImpactTrackingUrlResult(env, destination, "seatgeek");
      }

      if (!impactTrackingResult.ok) {
        return json(seatGeekImpactFailurePayload(resolved, impactTrackingResult, seatGeekImpactConfig), 400);
      }

      const outbound = safeUrl(impactTrackingResult.trackingUrl);
      if (!outbound) {
        return json(seatGeekImpactFailurePayload(resolved, {
          ok: false,
          status: "impact_tracking_url_failed_safety_check",
          hasProgramId: seatGeekImpactConfig.hasProgramId,
          impactConfigPresent: seatGeekImpactConfig.configured
        }, seatGeekImpactConfig), 400);
      }

      await trackClick({
        request,
        env,
        link: resolved.link,
        sourcePath,
        destinationHost: outbound.hostname.toLowerCase()
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

    const impactTrackingUrl = await createImpactTrackingUrl(env, resolved.redirect.toString(), provider);
    const outboundUrl = impactTrackingUrl || resolved.redirect.toString();
    const outbound = safeUrl(outboundUrl) || resolved.redirect;

    await trackClick({
      request,
      env,
      link: resolved.link,
      sourcePath,
      destinationHost: outbound.hostname.toLowerCase()
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
    return json({ ok: false, status: "provider_not_configured" }, 400);
  }

  const redirect = validateConfiguredRedirect(providerConfig, link.redirectUrl);
  if (!redirect) return json({ ok: false, status: "configured_redirect_rejected" }, 400);

  if (provider === "seatgeek") {
    const impactCfg = impactConfig(env, "seatgeek");
    if (!impactCfg.configured) {
      return json({ ok: false, status: "provider_not_configured" }, 400);
    }
  }

  await trackClick({ request, env, link, sourcePath, destinationHost: redirect.hostname.toLowerCase() });

  if (mode === "redirect") {
    return redirectResponse(redirect.toString(), 302);
  }

  return json({
    ok: true,
    status: "redirect_ready",
    redirectUrl: redirect.toString(),
    provider,
    artistSlug
  });
}

export {
  createImpactTrackingUrlResult,
  impactConfig,
  impactEndpointDiagnostics,
  inspectImpactProgram,
  safeImpactDiagnosticConfig
};

export async function onRequestGet({ request, env }) {
  return handleOut(request, env, "redirect");
}

export async function onRequestPost({ request, env }) {
  return handleOut(request, env, "json");
}
