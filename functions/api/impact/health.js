import { impactReadiness, json } from "./_utils.js";

export async function onRequestGet({ env }) {
  const readiness = impactReadiness(env, "shared");
  const seatgeekReadiness = impactReadiness(env, "seatgeek");
  const productSearchConfigured = readiness.configured || seatgeekReadiness.configured;
  return json({
    generatedAt: new Date().toISOString(),
    ok: true,
    status: productSearchConfigured ? "configured" : "missing_credentials",
    source: "impact-publisher",
    readiness,
    credentialSets: {
      shared: readiness,
      seatgeek: seatgeekReadiness
    },
    productSearchConfigured,
    productSearchAccessVerified: false,
    productSearchReady: false,
    trackingLinkCreateReady: readiness.configured
  });
}
