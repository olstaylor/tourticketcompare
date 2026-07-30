import { impactDiagnosticsAuthorized, impactReadiness, json, unauthorizedPayload } from "./_utils.js";

export async function onRequestGet({ request, env }) {
  if (!impactDiagnosticsAuthorized(request, env)) return unauthorizedPayload();

  const readiness = impactReadiness(env, "seatgeek");
  const productSearchConfigured = readiness.configured;
  return json({
    generatedAt: new Date().toISOString(),
    ok: true,
    // Presence of credentials is not evidence that the Impact account has the
    // required Catalogs or TrackingLinks permissions. Live verification happens
    // through the dedicated read-only API routes, so this endpoint must not
    // overstate readiness.
    status: productSearchConfigured ? "credentials_configured_unverified" : "missing_credentials",
    source: "impact-publisher",
    readiness,
    credentialSets: {
      seatgeek: readiness
    },
    productSearchConfigured,
    productSearchAccessVerified: false,
    productSearchReady: false,
    trackingLinkAccessVerified: false,
    trackingLinkCreateReady: false,
    trackingLinkReady: false
  });
}
