import assert from "node:assert/strict";
import { onRequestGet as impactCatalogs } from "../functions/api/impact/catalogs.js";
import { onRequestGet as impactHealth } from "../functions/api/impact/health.js";
import { onRequestGet as impactProducts } from "../functions/api/impact/products.js";
import { impactConfig as outboundImpactConfig } from "../functions/api/out.js";
import { impactMarketplaceRuntimeConfig } from "../functions/_impact-marketplace-config.js";

// Every /api/impact/* route is an internal diagnostic gated on DEBUG_API_TOKEN,
// so each fixture env carries a token and each request presents it.
const DEBUG_TOKEN = "fixture-debug-token";
const gated = (env = {}) => ({ ...env, DEBUG_API_TOKEN: DEBUG_TOKEN });
const gatedRequest = (url, init) => {
  const parsed = new URL(url);
  parsed.searchParams.set("token", DEBUG_TOKEN);
  return new Request(parsed, init);
};

// The gate itself: no token, a wrong token, and a configured-but-tokenless
// deployment must all be indistinguishable from an unrouted path.
for (const [label, request, env] of [
  ["no token", new Request("https://tourticketcompare.com/api/impact/catalogs?q=ticket"), gated()],
  ["wrong token", new Request("https://tourticketcompare.com/api/impact/catalogs?token=nope"), gated()],
  ["unset DEBUG_API_TOKEN", new Request(`https://tourticketcompare.com/api/impact/catalogs?token=${DEBUG_TOKEN}`), {}]
]) {
  for (const [routeName, route] of [["catalogs", impactCatalogs], ["products", impactProducts], ["health", impactHealth]]) {
    const response = await route({ request, env });
    assert.equal(response.status, 404, `${routeName} must 404 with ${label}`);
    assert.equal((await response.json()).error, "Not found");
  }
}

// A header-supplied token is accepted so POST callers need not log it in a URL.
const headerAuthed = await impactHealth({
  request: new Request("https://tourticketcompare.com/api/impact/health", { headers: { "X-Debug-Token": DEBUG_TOKEN } }),
  env: gated()
});
assert.equal(headerAuthed.status, 200);

const missingEnv = gated();
const healthResponse = await impactHealth({
  request: gatedRequest("https://tourticketcompare.com/api/impact/health"),
  env: missingEnv
});
const healthJson = await healthResponse.json();
assert.equal(healthResponse.status, 200);
assert.equal(healthJson.productSearchReady, false);
assert.equal(healthJson.productSearchAccessVerified, false);

const retiredTicketmasterHealth = await impactHealth({
  request: gatedRequest("https://tourticketcompare.com/api/impact/health"),
  env: gated({ IMPACT_ACCOUNT_SID: "retired-account", IMPACT_AUTH_TOKEN: "retired-token" })
});
const retiredTicketmasterJson = await retiredTicketmasterHealth.json();
assert.equal(retiredTicketmasterJson.readiness.configured, false);
assert.equal(retiredTicketmasterJson.productSearchConfigured, false);

const missingCatalogs = await impactCatalogs({
  request: gatedRequest("https://tourticketcompare.com/api/impact/catalogs?q=ticket"),
  env: missingEnv
});
assert.equal((await missingCatalogs.json()).status, "missing_credentials");

const missingProducts = await impactProducts({
  request: gatedRequest("https://tourticketcompare.com/api/impact/products?q=ticket"),
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
    request: gatedRequest("https://tourticketcompare.com/api/impact/products?credentialSet=seatgeek&q=example"),
    env: gated({ IMPACT_SEATGEEK_ACCOUNT_SID: "sg-account", IMPACT_SEATGEEK_AUTH_TOKEN: "sg-token" })
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
    request: gatedRequest("https://tourticketcompare.com/api/impact/catalogs?credentialSet=seatgeek&version=15"),
    env: gated({
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
    request: gatedRequest("https://tourticketcompare.com/api/impact/catalogs?credentialSet=seatgeek&q=ticketnetwork"),
    env: gated({ IMPACT_SEATGEEK_ACCOUNT_SID: "sg-account", IMPACT_SEATGEEK_AUTH_TOKEN: "sg-token" })
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

console.log("Impact Catalogs route self-test passed (DEBUG_API_TOKEN gate, credential selection, v16 default, redaction).\n");
