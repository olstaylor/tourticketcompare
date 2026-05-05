import { getImpactReadiness, searchImpactMarketplaceProducts } from "../_lib/impact.mjs";

export async function GET() {
  const readiness = getImpactReadiness(process.env);
  const products = await searchImpactMarketplaceProducts({
    env: process.env,
    pageSize: 1
  });
  const health = {
    ok: products.ok,
    status: products.status,
    source: "impact-marketplace-products",
    httpStatus: products.httpStatus || null,
    total: products.total || null,
    productSearchReady: products.ok,
    trackingLinkCreateReady: readiness.configured,
    message: products.message || null,
    error: products.error || null
  };

  return new Response(
    JSON.stringify({
      generatedAt: new Date().toISOString(),
      readiness,
      health
    }),
    {
      status: health.ok || health.status === "missing_credentials" ? 200 : 502,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      }
    }
  );
}
