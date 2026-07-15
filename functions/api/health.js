import { impactMarketplaceRuntimeConfig } from "../_impact-marketplace-config.js";

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function hasBinding(env, name) {
  return Boolean(env && Object.prototype.hasOwnProperty.call(env, name));
}

async function loadOperationalSummary(env) {
  const assets = env?.ASSETS;
  if (!assets || typeof assets.fetch !== "function") return { status: "unavailable" };
  try {
    const load = async (path) => {
      const response = await assets.fetch(new Request(`https://assets.local${path}`));
      if (!response.ok) throw new Error(`asset ${path} returned ${response.status}`);
      return response.json();
    };
    const [artists, events] = await Promise.all([load("/data/artists.json"), load("/data/events.json")]);
    const rows = Array.isArray(events) ? events : [];
    const providerNames = ["seatgeek", "vividseats", "ticketnetwork", "ticketliquidator", "stubhub_international"];
    const providerEventUrlCoverage = Object.fromEntries(providerNames.map((provider) => [
      provider,
      rows.filter((event) => {
        const key = provider === "stubhub_international" ? "stubhub-international" : provider === "vividseats" ? "vivid-seats" : provider;
        return Boolean(event?.[`${key}_url`] || event?.provider_links?.[key]?.url);
      }).length
    ]));
    return {
      status: "ok",
      artists: Array.isArray(artists) ? artists.length : 0,
      events: rows.length,
      needsRecheck: rows.filter((event) => event?.verification_status === "needs_recheck").length,
      providerEventUrlCoverage
    };
  } catch {
    return { status: "unavailable" };
  }
}

export async function onRequestGet({ env }) {
  const ticketNetwork = impactMarketplaceRuntimeConfig(env, "ticketnetwork");
  const ticketLiquidator = impactMarketplaceRuntimeConfig(env, "ticket-liquidator");
  const stubHubInternational = impactMarketplaceRuntimeConfig(env, "stubhub-international");
  const operational = await loadOperationalSummary(env);
  return json({
    ok: true,
    service: "tourticketcompare",
    runtime: "cloudflare-pages-functions",
    status: "ok",
    timestamp: new Date().toISOString(),
    operational,
    config: {
      mockMode: env?.MOCK_MODE === "true",
      allowMockPrices: env?.ALLOW_MOCK_PRICES === "true",
      clickTrackingEnabled: env?.CLICK_TRACKING_ENABLED === "true",
      seatGeekPriceDisplayEnabled: env?.SEATGEEK_PRICE_DISPLAY_ENABLED === "true",
      vividSeatsPriceDisplayEnabled: env?.VIVIDSEATS_PRICE_DISPLAY_ENABLED === "true",
      ticketNetworkPublicEnabled: ticketNetwork.publicEnabled,
      ticketNetworkPriceDisplayEnabled: ticketNetwork.priceDisplayEnabled,
      ticketLiquidatorPublicEnabled: ticketLiquidator.publicEnabled,
      ticketLiquidatorPriceDisplayEnabled: ticketLiquidator.priceDisplayEnabled,
      stubHubInternationalPublicEnabled: stubHubInternational.publicEnabled,
      stubHubInternationalPriceDisplayEnabled: stubHubInternational.priceDisplayEnabled,
      ticketmasterDiscoveryPriceChecksEnabled: env?.TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED === "true"
    },
    bindings: {
      demandDb: hasBinding(env, "DEMAND_DB"),
      impactSeatGeekAccountSid: hasBinding(env, "IMPACT_SEATGEEK_ACCOUNT_SID"),
      impactSeatGeekAuthToken: hasBinding(env, "IMPACT_SEATGEEK_AUTH_TOKEN"),
      impactSeatGeekProgramId: hasBinding(env, "IMPACT_SEATGEEK_PROGRAM_ID"),
      impactVividSeatsAccountSid: hasBinding(env, "IMPACT_VIVIDSEATS_ACCOUNT_SID"),
      impactVividSeatsAuthToken: hasBinding(env, "IMPACT_VIVIDSEATS_AUTH_TOKEN"),
      impactVividSeatsCampaignId: hasBinding(env, "IMPACT_VIVIDSEATS_CAMPAIGN_ID"),
      impactVividSeatsProgramId: hasBinding(env, "IMPACT_VIVIDSEATS_PROGRAM_ID"),
      impactVividSeatsBaseTrackingUrl: hasBinding(env, "IMPACT_VIVIDSEATS_BASE_TRACKING_URL"),
      impactTicketNetworkConfigured: ticketNetwork.trackingConfigured,
      impactTicketLiquidatorConfigured: ticketLiquidator.trackingConfigured,
      impactStubHubInternationalConfigured: stubHubInternational.trackingConfigured,
      seatGeekClientId: hasBinding(env, "SEATGEEK_CLIENT_ID"),
      seatGeekClientSecret: hasBinding(env, "SEATGEEK_CLIENT_SECRET"),
      retiredTicketmasterImpactCredentialsIgnored: Boolean(
        hasBinding(env, "IMPACT_ACCOUNT_SID") || hasBinding(env, "IMPACT_AUTH_TOKEN")
      )
    }
  });
}
