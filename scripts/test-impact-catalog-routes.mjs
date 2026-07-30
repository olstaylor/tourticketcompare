import assert from "node:assert/strict";
import { onRequestGet as impactCatalogs } from "../functions/api/impact/catalogs.js";
import { onRequestGet as impactHealth } from "../functions/api/impact/health.js";
import { onRequestGet as impactProducts } from "../functions/api/impact/products.js";
import { impactConfig as outboundImpactConfig } from "../functions/api/out.js";
import { impactMarketplaceRuntimeConfig } from "../functions/_impact-marketplace-config.js";

// Every /api/impact/* route is gated on the shared diagnostics bearer token.
// These helpers keep the existing behavioural assertions focused on catalog
// behaviour; the gate itself is asserted separately below.
const DIAGNOSTICS_TOKEN = "impact-diagnostics-self-test-token";
const authorized = (url, init = {}) =>
  new Request(url, { ...init, headers: { ...(init.headers || {}), Authorization: `Bearer ${DIAGNOSTICS_TOKEN}` } });
const withToken = (env = {}) => ({ ...env, IMPACT_DIAGNOSTICS_TOKEN: DIAGNOSTICS_TOKEN });

// The gate fails closed: no configured token, a wrong token, and a missing
// header all answer 404 without reaching the Impact credentials.
const healthUrl = "https://tourticketcompare.com/api/impact/health";
for (const [label, request, env] of [
  ["no token configured", authorized(healthUrl), {}],
  ["wrong token, same length", new Request(healthUrl, { headers: { Authorization: `Bearer ${"x".repeat(DIAGNOSTICS_TOKEN.length)}` } }), withToken()],
  ["wrong token, different length", new Request(healthUrl, { headers: { Authorization: "Bearer short" } }), withToken()],
  ["no header", new Request(healthUrl), withToken()],
  ["empty bearer", new Request(healthUrl, { headers: { Authorization: "Bearer " } }), withToken()]
]) {
  const denied = await impactHealth({ request, env });
  assert.equal(denied.status, 404, `/api/impact/health should 404: ${label}`);
  assert.equal((await denied.json()).status, "not_found");
}
const deniedProducts = await impactProducts({
  request: new Request("https://tourticketcompare.com/api/impact/products?q=ticket"),
  env: withToken({ IMPACT_SEATGEEK_ACCOUNT_SID: "sg-account", IMPACT_SEATGEEK_AUTH_TOKEN: "sg-token" })
});
assert.equal(deniedProducts.status, 404, "/api/impact/products must not serve catalog data without the token");
const deniedCatalogs = await impactCatalogs({
  request: new Request("https://tourticketcompare.com/api/impact/catalogs?q=ticket"),
  env: withToken({ IMPACT_SEATGEEK_ACCOUNT_SID: "sg-account", IMPACT_SEATGEEK_AUTH_TOKEN: "sg-token" })
});
assert.equal(deniedCatalogs.status, 404, "/api/impact/catalogs must not serve catalog data without the token");
// The x-ttc-impact-token header is accepted as an alternative to Bearer.
const headerTokenHealth = await impactHealth({
  request: new Request(healthUrl, { headers: { "x-ttc-impact-token": DIAGNOSTICS_TOKEN } }),
  env: withToken()
});
assert.equal(headerTokenHealth.status, 200, "x-ttc-impact-token should authorize the diagnostics routes");

const missingEnv = withToken();
const healthResponse = await impactHealth({ request: authorized(healthUrl), env: missingEnv });
const healthJson = await healthResponse.json();
assert.equal(healthResponse.status, 200);
assert.equal(healthJson.productSearchReady, false);
assert.equal(healthJson.productSearchAccessVerified, false);

const retiredTicketmasterHealth = await impactHealth({
  request: authorized(healthUrl),
  env: withToken({ IMPACT_ACCOUNT_SID: "retired-account", IMPACT_AUTH_TOKEN: "retired-token" })
});
const retiredTicketmasterJson = await retiredTicketmasterHealth.json();
assert.equal(retiredTicketmasterJson.readiness.configured, false);
assert.equal(retiredTicketmasterJson.productSearchConfigured, false);

const missingCatalogs = await impactCatalogs({
  request: authorized("https://tourticketcompare.com/api/impact/catalogs?q=ticket"),
  env: missingEnv
});
assert.equal((await missingCatalogs.json()).status, "missing_credentials");

const missingProducts = await impactProducts({
  request: authorized("https://tourticketcompare.com/api/impact/products?q=ticket"),
  env: missingEnv
});
assert.equal((await missingProducts.json()).status, "missing_credentials");

const originalProductFetch = globalThis.fetch;
try {
  globalThis.fetch = async () => new Response(JSON.stringify({
    Items: [{
      CatalogItemId: "item-1",
      CatalogId: "catalog-1",
      CampaignId: "2322",
      Name: "Example event",
      Description: "Example listing",
      Url: "https://tracking.example/c/publisher-account/2322?u=https%3A%2F%2Fwww.ticketnetwork.com%2Fen%2Fp%2Ftn-1%3Faffiliate%3Dpublisher-account",
      CurrentPrice: "84.00",
      Currency: "USD",
      InternalPublisherToken: "publisher-token"
    }]
  }), { status: 200, headers: { "content-type": "application/json" } });
  const safeProductsResponse = await impactProducts({
    request: authorized("https://tourticketcompare.com/api/impact/products?credentialSet=seatgeek&q=example"),
    env: withToken({ IMPACT_SEATGEEK_ACCOUNT_SID: "sg-account", IMPACT_SEATGEEK_AUTH_TOKEN: "sg-token" })
  });
  const safeProducts = await safeProductsResponse.json();
  assert.equal(safeProductsResponse.status, 200);
  assert.equal(safeProducts.products.length, 1);
  assert.equal(safeProducts.products[0].OriginalUrl, "https://www.ticketnetwork.com/en/p/tn-1");
  assert.doesNotMatch(JSON.stringify(safeProducts), /publisher-account|publisher-token|tracking\.example/);
} finally {
  globalThis.fetch = originalProductFetch;
}

const outboundEnv = {
  IMPACT_SEATGEEK_ACCOUNT_SID: "sg-account",
  IMPACT_SEATGEEK_AUTH_TOKEN: "sg-token"
};
for (const [provider, programId] of [
  ["ticketnetwork", "2322"],
  ["ticket-liquidator", "2085"],
  ["stubhub-international", "24092"]
]) {
  const config = outboundImpactConfig(outboundEnv, provider);
  assert.equal(config.configured, true);
  assert.equal(config.accountSid, "sg-account");
  assert.equal(config.programId, programId);
  assert.equal(config.programIdSource, "impact_catalog_campaign");
}

for (const [provider, priceDisplayEnabled] of [
  ["ticketnetwork", true],
  ["ticket-liquidator", false],
  ["stubhub-international", true]
]) {
  const runtime = impactMarketplaceRuntimeConfig(outboundEnv, provider);
  assert.equal(runtime.publicEnabled, true);
  assert.equal(runtime.priceDisplayEnabled, priceDisplayEnabled);
  assert.equal(runtime.trackingConfigured, true);
  assert.equal(runtime.accountSid, "sg-account");
}
assert.equal(impactMarketplaceRuntimeConfig({ TICKETNETWORK_PUBLIC_ENABLED: "false" }, "ticketnetwork").publicEnabled, false);
assert.equal(impactMarketplaceRuntimeConfig({ TICKETNETWORK_PRICE_DISPLAY_ENABLED: "false" }, "ticketnetwork").priceDisplayEnabled, false);

const originalFetch = globalThis.fetch;
let probeUrl = "";
try {
  globalThis.fetch = async (request, options = {}) => {
    probeUrl = String(request);
    assert.match(String(options.headers?.Authorization || ""), /^Basic /);
    return new Response("<html><body>Denied for sg-account using sg-token</body></html>", {
      status: 403,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "x-request-id": "impact-request-1"
      }
    });
  };
  const deniedResponse = await impactCatalogs({
    request: authorized("https://tourticketcompare.com/api/impact/catalogs?credentialSet=seatgeek&version=15"),
    env: withToken({
      IMPACT_ACCOUNT_SID: "shared-account",
      IMPACT_AUTH_TOKEN: "shared-token",
      IMPACT_SEATGEEK_ACCOUNT_SID: "sg-account",
      IMPACT_SEATGEEK_AUTH_TOKEN: "sg-token"
    })
  });
  const denied = await deniedResponse.json();
  assert.equal(deniedResponse.status, 403);
  assert.equal(denied.credentialSet, "seatgeek");
  assert.equal(denied.requestedVersion, "15");
  assert.equal(denied.upstreamRequestId, "impact-request-1");
  assert.match(denied.error, /\[redacted\]/);
  assert.doesNotMatch(JSON.stringify(denied), /sg-account|sg-token/);
  assert.match(new URL(probeUrl).pathname, /\/Mediapartners\/sg-account\/Catalogs$/);
  assert.equal(new URL(probeUrl).searchParams.get("IrVersion"), "15");

  globalThis.fetch = async (request) => {
    probeUrl = String(request);
    return new Response(JSON.stringify({
      Catalogs: [{
        Id: "catalog-1",
        Name: "TicketNetwork events",
        CampaignId: "campaign-1",
        CampaignName: "TicketNetwork",
        NumberOfItems: "42",
        ServiceAreas: "US"
      }]
    }), {
      status: 200,
      headers: { "content-type": "application/json", "ir-version": "16" }
    });
  };
  const connectedResponse = await impactCatalogs({
    request: authorized("https://tourticketcompare.com/api/impact/catalogs?credentialSet=seatgeek&q=ticketnetwork"),
    env: withToken({ IMPACT_SEATGEEK_ACCOUNT_SID: "sg-account", IMPACT_SEATGEEK_AUTH_TOKEN: "sg-token" })
  });
  const connected = await connectedResponse.json();
  assert.equal(connectedResponse.status, 200);
  assert.equal(connected.requestedVersion, "16");
  assert.equal(connected.upstreamVersion, "16");
  assert.equal(connected.catalogs.length, 1);
  assert.equal(connected.catalogs[0].campaignId, "campaign-1");
  assert.equal(new URL(probeUrl).searchParams.has("Page"), false);
  assert.equal(new URL(probeUrl).searchParams.has("PageSize"), false);
} finally {
  globalThis.fetch = originalFetch;
}

console.log("Impact Catalogs route self-test passed (auth gate, credential selection, v16 default, redaction).\n");
