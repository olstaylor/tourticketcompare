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

export async function onRequestGet({ env }) {
  return json({
    ok: true,
    service: "tourticketcompare",
    runtime: "cloudflare-pages-functions",
    status: "ok",
    timestamp: new Date().toISOString(),
    config: {
      mockMode: env?.MOCK_MODE === "true",
      allowMockPrices: env?.ALLOW_MOCK_PRICES === "true",
      clickTrackingEnabled: env?.CLICK_TRACKING_ENABLED === "true",
      seatGeekPriceDisplayEnabled: env?.SEATGEEK_PRICE_DISPLAY_ENABLED === "true",
      vividSeatsPriceDisplayEnabled: env?.VIVIDSEATS_PRICE_DISPLAY_ENABLED === "true",
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
      seatGeekClientId: hasBinding(env, "SEATGEEK_CLIENT_ID"),
      seatGeekClientSecret: hasBinding(env, "SEATGEEK_CLIENT_SECRET"),
      legacyImpactAccountSid: hasBinding(env, "IMPACT_ACCOUNT_SID"),
      legacyImpactAuthToken: hasBinding(env, "IMPACT_AUTH_TOKEN")
    }
  });
}
