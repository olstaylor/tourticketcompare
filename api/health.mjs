function json(payload, status = 200) {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function hasEnv(name) {
  return Boolean(process.env[name]);
}

export default async function handler(request) {
  if (request.method !== "GET") {
    return json({ ok: false, status: "method_not_allowed" }, 405);
  }

  return json({
    ok: true,
    service: "tourticketcompare",
    runtime: "vercel-preview",
    status: "ok",
    timestamp: new Date().toISOString(),
    config: {
      mockMode: process.env.MOCK_MODE === "true",
      allowMockPrices: process.env.ALLOW_MOCK_PRICES === "true",
      clickTrackingEnabled: process.env.CLICK_TRACKING_ENABLED === "true"
    },
    bindings: {
      demandDb: false,
      impactAccountSid: hasEnv("IMPACT_ACCOUNT_SID"),
      impactAuthToken: hasEnv("IMPACT_AUTH_TOKEN"),
      impactDefaultProgramId: hasEnv("IMPACT_DEFAULT_PROGRAM_ID"),
      impactTicketmasterProgramId: hasEnv("IMPACT_TICKETMASTER_PROGRAM_ID")
    }
  });
}
