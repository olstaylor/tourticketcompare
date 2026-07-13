import assert from "node:assert/strict";
import { onRequestGet as impactCatalogs } from "../functions/api/impact/catalogs.js";
import { onRequestGet as impactHealth } from "../functions/api/impact/health.js";
import { onRequestGet as impactProducts } from "../functions/api/impact/products.js";

const missingEnv = {};
const healthResponse = await impactHealth({ env: missingEnv });
const healthJson = await healthResponse.json();
assert.equal(healthResponse.status, 200);
assert.equal(healthJson.productSearchReady, false);
assert.equal(healthJson.productSearchAccessVerified, false);

const missingCatalogs = await impactCatalogs({
  request: new Request("https://tourticketcompare.com/api/impact/catalogs?q=ticket"),
  env: missingEnv
});
assert.equal((await missingCatalogs.json()).status, "missing_credentials");

const missingProducts = await impactProducts({
  request: new Request("https://tourticketcompare.com/api/impact/products?q=ticket"),
  env: missingEnv
});
assert.equal((await missingProducts.json()).status, "missing_credentials");

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
    request: new Request("https://tourticketcompare.com/api/impact/catalogs?credentialSet=seatgeek&version=15"),
    env: {
      IMPACT_ACCOUNT_SID: "shared-account",
      IMPACT_AUTH_TOKEN: "shared-token",
      IMPACT_SEATGEEK_ACCOUNT_SID: "sg-account",
      IMPACT_SEATGEEK_AUTH_TOKEN: "sg-token"
    }
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
    request: new Request("https://tourticketcompare.com/api/impact/catalogs?credentialSet=seatgeek&q=ticketnetwork"),
    env: { IMPACT_SEATGEEK_ACCOUNT_SID: "sg-account", IMPACT_SEATGEEK_AUTH_TOKEN: "sg-token" }
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

console.log("Impact Catalogs route self-test passed (credential selection, v16 default, redaction).\n");
