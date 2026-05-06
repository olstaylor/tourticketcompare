import { impactReadiness, json } from "./_utils.js";

export async function onRequestGet({ env }) {
  const readiness = impactReadiness(env);
  return json({
    generatedAt: new Date().toISOString(),
    ok: true,
    status: readiness.configured ? "configured" : "missing_credentials",
    source: "impact-publisher",
    readiness,
    productSearchReady: readiness.configured,
    trackingLinkCreateReady: readiness.configured
  });
}

