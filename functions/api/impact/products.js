import { basicAuthHeader, clean, impactConfig, json, missingCredentialsPayload } from "./_utils.js";

export async function onRequestGet({ request, env }) {
  const config = impactConfig(env);
  if (!config.configured) return json(missingCredentialsPayload("impact-catalog-items"));

  const url = new URL(request.url);
  const params = new URLSearchParams();
  const query = clean(url.searchParams.get("q") || url.searchParams.get("Keyword"), 120);
  const campaignId = clean(url.searchParams.get("campaignId") || url.searchParams.get("CampaignId"), 120);
  const catalogId = clean(url.searchParams.get("catalogId") || url.searchParams.get("CatalogId"), 120);
  const page = Number.parseInt(url.searchParams.get("Page") || url.searchParams.get("page") || "1", 10);
  const pageSize = Number.parseInt(url.searchParams.get("PageSize") || url.searchParams.get("pageSize") || "20", 10);
  if (query) params.set("Keyword", query);
  params.set("Page", String(Number.isFinite(page) && page >= 1 ? page : 1));
  params.set("PageSize", String(Math.max(1, Math.min(200, Number.isFinite(pageSize) ? pageSize : 20))));
  params.set("IrVersion", /^\d{1,2}$/.test(clean(env.IMPACT_CATALOG_API_VERSION, 2)) ? clean(env.IMPACT_CATALOG_API_VERSION, 2) : "15");

  const resource = catalogId
    ? `Catalogs/${encodeURIComponent(catalogId)}/Items`
    : "Catalogs/ItemSearch";
  const endpoint = `${config.apiBase}/Mediapartners/${encodeURIComponent(config.accountSid)}/${resource}?${params.toString()}`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: basicAuthHeader(config)
      }
    });
    let payload = null;
    try {
      payload = await response.json();
    } catch (error) {
      payload = null;
    }
    if (!response.ok) {
      return json({
        ok: false,
        status: response.status === 403 ? "missing_scope_or_approval" : "request_rejected",
        source: "impact-catalog-items",
        httpStatus: response.status,
        message: "impact.com rejected the Catalogs request.",
        error: payload?.Message || payload?.message || null
      }, response.status === 401 || response.status === 403 ? 403 : 502);
    }
    const allProducts = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.Items)
        ? payload.Items
        : Array.isArray(payload?.Results)
          ? payload.Results
          : payload?.CatalogItemId || payload?.CatalogId
            ? [payload]
            : [];
    const products = campaignId
      ? allProducts.filter((product) => clean(product?.CampaignId || product?.ProgramId, 120) === campaignId)
      : allProducts;
    return json({
      ok: true,
      status: "connected",
      source: "impact-catalog-items",
      httpStatus: response.status,
      resource: catalogId ? "catalog-items" : "catalog-item-search",
      catalogId: catalogId || null,
      campaignId: campaignId || null,
      page: payload?.Page ?? payload?.["@page"] ?? null,
      pageSize: payload?.PageSize ?? payload?.["@pagesize"] ?? null,
      total: payload?.Total ?? payload?.["@total"] ?? null,
      products
    });
  } catch (error) {
    return json({
      ok: false,
      status: "request_failed",
      source: "impact-catalog-items",
      message: "Unable to reach the impact.com Catalogs API from Cloudflare Pages."
    }, 502);
  }
}
