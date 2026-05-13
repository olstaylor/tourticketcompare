import { createImpactTrackingUrlResult, impactConfig as outImpactConfig, inspectImpactProgram, safeImpactDiagnosticConfig } from "./out.js";

// Debug endpoint: Test SeatGeek event matching without public redirect.
// Protected by DEBUG_API_TOKEN environment variable.
// Usage: GET /api/debug-seatgeek?eventId=<id>&token=<token>
// Without valid token: returns 404 (not found)
// With valid token: returns detailed debug info for testing.

const EVENTS_JSON_PATH = "/data/events.json";
const DEFAULT_IMPACT_API_BASE = "https://api.impact.com";

function clean(value, max = 255) {
  return String(value || "").trim().slice(0, max);
}

function isAuthorised(token, env) {
  const expected = clean(env?.DEBUG_API_TOKEN, 255);
  if (!expected) return false;
  return token === expected;
}

function slugify(value) {
  return clean(value, 120)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
}

function seatgeekConfig(env = {}) {
  const clientId = clean(env?.SEATGEEK_CLIENT_ID, 255);
  const clientSecret = clean(env?.SEATGEEK_CLIENT_SECRET, 255);
  return {
    clientId,
    clientSecret,
    configured: Boolean(clientId && clientSecret)
  };
}

function impactConfig(env = {}) {
  const cfg = outImpactConfig(env, "seatgeek");
  return {
    accountSidPresent: Boolean(cfg.accountSid),
    authTokenPresent: Boolean(cfg.authToken),
    programIdPresent: Boolean(cfg.programId),
    campaignIdPresent: Boolean(cfg.campaignId),
    programIdSource: cfg.programIdSource || "",
    configured: Boolean(cfg.configured)
  };
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

async function searchSeatGeekCandidates(env, artistSlug, eventDate, venueName) {
  const config = seatgeekConfig(env);
  if (!config.configured) return { ok: false, reason: "SeatGeek credentials not configured" };

  const dateObj = new Date(eventDate);
  if (isNaN(dateObj.getTime())) return { ok: false, reason: "Invalid event date" };

  const dateStr = dateObj.toISOString().split("T")[0];
  const params = new URLSearchParams({
    client_id: config.clientId,
    per_page: "10",
    sort: "datetime.asc"
  });

  if (venueName && venueName.trim()) {
    params.append("venue", venueName.trim());
  }

  const endpoint = `https://api.seatgeek.com/2/events?${params.toString()}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      return { ok: false, reason: `SeatGeek API returned ${response.status}`, candidates: [] };
    }

    const data = await response.json();
    const events = Array.isArray(data.events) ? data.events : [];

    if (events.length === 0) {
      return { ok: false, reason: "No SeatGeek events found for venue/date", candidates: [] };
    }

    const candidates = events.map((e) => {
      const performers = Array.isArray(e.performers) ? e.performers : [];
      const performerNames = performers.map((p) => p.name).filter(Boolean);
      const dateMatch = e.datetime_utc && e.datetime_utc.startsWith(dateStr);
      const performerMatches = performers.filter((p) => {
        const pSlug = slugify(p.name || "");
        return pSlug === artistSlug || slugify(p.slug || "") === artistSlug;
      });

      return {
        eventId: e.id,
        title: e.title || "(no title)",
        datetime_utc: e.datetime_utc,
        dateMatch,
        performers: performerNames,
        performerMatches: performerMatches.map((p) => p.name),
        venue: e.venue?.name || "(no venue)",
        url: e.url || null,
        confidence:
          dateMatch && performerMatches.length > 0
            ? "HIGH"
            : dateMatch
              ? "MEDIUM (date match, performer unclear)"
              : "LOW (date mismatch)"
      };
    });

    const matched = candidates.find((c) => c.dateMatch && c.performerMatches.length > 0);

    return {
      ok: true,
      candidateCount: candidates.length,
      candidates,
      matched: matched || null,
      reason: matched ? "Match found" : "No confident match"
    };
  } catch (error) {
    return { ok: false, reason: `SeatGeek API error: ${error.message}`, candidates: [] };
  }
}

async function runImpactDiagnostics(env, event) {
  const destination = clean(event?.seatgeek_url, 2048);
  const cfg = outImpactConfig(env, "seatgeek");
  const safeConfig = safeImpactDiagnosticConfig(cfg);
  if (!destination) {
    return {
      ok: false,
      status: "event_ticket_url_unavailable",
      config: safeConfig,
      note: "No stored SeatGeek destination is present for this event."
    };
  }

  const programLookup = await inspectImpactProgram(env, "seatgeek");
  const trackingAttempt = await createImpactTrackingUrlResult(env, destination, "seatgeek");
  const tracking = {
    ok: trackingAttempt.ok,
    status: trackingAttempt.ok ? "impact_tracking_link_created" : trackingAttempt.status,
    impactStatusCode: trackingAttempt.impactStatusCode || null,
    endpoint: trackingAttempt.endpointDiagnostics || null,
    hasTrackingUrl: Boolean(trackingAttempt.trackingUrl),
    trackingUrlHost: trackingAttempt.trackingUrl ? new URL(trackingAttempt.trackingUrl).hostname.toLowerCase() : "",
    impactResponseFieldNames: trackingAttempt.impactResponseFieldNames || [],
    impactResponseMessage: trackingAttempt.impactResponseMessage || ""
  };

  return {
    ok: programLookup.ok && trackingAttempt.ok,
    destination: {
      present: true,
      host: new URL(destination).hostname.toLowerCase()
    },
    config: safeConfig,
    programLookup,
    tracking
  };
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const token = clean(url.searchParams.get("token"), 255);

  // Unauthorised access returns generic 404 (not found).
  if (!isAuthorised(token, env)) {
    return json({ ok: false, error: "Not found" }, 404);
  }

  const eventId = clean(url.searchParams.get("eventId"), 255);
  const shouldRunImpactDiagnostics = clean(url.searchParams.get("impact"), 20) === "1";

  if (!eventId) {
    return json(
      {
        ok: false,
        error: "Missing eventId parameter",
        usage: "/api/debug-seatgeek?eventId=<event-id>&token=<token>"
      },
      400
    );
  }

  const events = await loadEventsFromAssets(env);
  if (!events) {
    return json({ ok: false, error: "Could not load events.json" }, 503);
  }

  const event = events.find((e) => clean(e.id, 255) === eventId);
  if (!event) {
    return json({ ok: false, error: `Event not found: ${eventId}` }, 404);
  }

  const sgConfig = seatgeekConfig(env);
  const impactCfg = impactConfig(env);

  const candidates = await searchSeatGeekCandidates(
    env,
    event.artist_slug,
    event.datetime_iso,
    event.venue
  );
  const impactDiagnostics = shouldRunImpactDiagnostics ? await runImpactDiagnostics(env, event) : null;

  return json({
    ok: true,
    event: {
      id: event.id,
      artist_slug: event.artist_slug,
      artist_name: event.artist_name,
      venue: event.venue,
      city: event.city,
      country: event.country,
      datetime_iso: event.datetime_iso
    },
    config: {
      seatgeek_configured: sgConfig.configured,
      impact_seatgeek_configured: impactCfg.configured
    },
    seatgeek_search: candidates,
    impact_diagnostics: impactDiagnostics,
    affiliate_tracking_capable: impactCfg.configured && candidates.matched ? true : false,
    next_steps: [
      !sgConfig.configured ? "Set SEATGEEK_CLIENT_ID and SEATGEEK_CLIENT_SECRET" : null,
      !impactCfg.configured ? "Set IMPACT_ACCOUNT_SID, IMPACT_AUTH_TOKEN, and IMPACT_SEATGEEK_CAMPAIGN_ID for affiliate tracking (IMPACT_SEATGEEK_PROGRAM_ID remains supported as a legacy fallback, with optional SeatGeek-specific account/token overrides)" : null,
      candidates.matched
        ? `SeatGeek URL ready: ${candidates.matched.url}`
        : "No confident SeatGeek match found"
    ].filter(Boolean)
  });
}
