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
      clickTrackingEnabled: env?.CLICK_TRACKING_ENABLED === "true"
    },
    bindings: {
      rateLimitDb: hasBinding(env, "RATE_LIMIT_DB") || hasBinding(env, "DB"),
      clicksDb: hasBinding(env, "CLICKS_DB"),
      impactAccountSid: hasBinding(env, "IMPACT_ACCOUNT_SID"),
      impactAuthToken: hasBinding(env, "IMPACT_AUTH_TOKEN"),
      impactDefaultProgramId: hasBinding(env, "IMPACT_DEFAULT_PROGRAM_ID"),
      impactTicketmasterProgramId: hasBinding(env, "IMPACT_TICKETMASTER_PROGRAM_ID")
    }
  });
}
