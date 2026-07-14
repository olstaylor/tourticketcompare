import {
  basicAuthHeader,
  clean,
  impactCatalogApiVersion,
  impactConfig,
  impactCredentialSet,
  json,
  missingCredentialsPayload,
  readImpactResponse
} from "./_utils.js";

const PRODUCT_TEXT_FIELDS = [
  "Name", "Description", "Manufacturer", "Category", "SubCategory", "ParentName",
  "Text1", "Text2", "Text3", "Mpn", "LaunchDate", "ExpirationDate", "EstimatedShipDate"
];
const PRODUCT_NUMBER_FIELDS = ["CurrentPrice", "OriginalPrice", "Price", "InventoryCount"];
const PRODUCT_ID_FIELDS = ["Id", "CatalogId", "CatalogItemId", "CampaignId", "ProgramId", "Sku", "SKU", "Currency", "StockAvailability"];

function safeDestinationUrl(value) {
  const raw = clean(value, 2048);
  if (!raw) return "";
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:") return "";
    for (const key of ["u", "url", "redirect", "deeplink", "deeplinkurl"]) {
      const nested = clean(parsed.searchParams.get(key), 2048);
      if (!nested) continue;
      try {
        const destination = new URL(nested);
        if (destination.protocol === "https:") return `${destination.origin}${destination.pathname}`;
      } catch {}
    }
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return "";
  }
}

function safeOffer(offer) {
  const safe = {};
  for (const field of PRODUCT_TEXT_FIELDS) safe[field] = clean(offer?.[field], 1000);
  for (const field of PRODUCT_NUMBER_FIELDS) safe[field] = offer?.[field] ?? null;
  for (const field of PRODUCT_ID_FIELDS) safe[field] = clean(offer?.[field], 255);
  safe.OriginalUrl = safeDestinationUrl(offer?.OriginalUrl || offer?.Url || offer?.URL);
  return safe;
}

function safeProduct(product) {
  const safe = {};
  for (const field of PRODUCT_TEXT_FIELDS) safe[field] = clean(product?.[field], 1000);
  for (const field of PRODUCT_NUMBER_FIELDS) safe[field] = product?.[field] ?? null;
  for (const field of PRODUCT_ID_FIELDS) safe[field] = clean(product?.[field], 255);
  safe.Bullets = Array.isArray(product?.Bullets) ? product.Bullets.map((value) => clean(value, 1000)).filter(Boolean).slice(0, 25) : [];
  safe.Labels = Array.isArray(product?.Labels) ? product.Labels.map((value) => clean(value, 255)).filter(Boolean).slice(0, 50) : [];
  safe.OriginalUrl = safeDestinationUrl(product?.OriginalUrl || product?.Url || product?.URL);
  if (Array.isArray(product?.Offers)) safe.Offers = product.Offers.map(safeOffer).slice(0, 50);
  return safe;
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const credentialSet = impactCredentialSet(url.searchParams.get("credentialSet"));
  const config = impactConfig(env, credentialSet);
  if (!config.configured) return json(missingCredentialsPayload("impact-catalog-items", credentialSet));

  const params = new URLSearchParams();
  const query = clean(url.searchParams.get("q") || url.searchParams.get("Keyword"), 120);
  const campaignId = clean(url.searchParams.get("campaignId") || url.searchParams.get("CampaignId"), 120);
  const catalogId = clean(url.searchParams.get("catalogId") || url.searchParams.get("CatalogId"), 120);
  const page = Number.parseInt(url.searchParams.get("Page") || url.searchParams.get("page") || "1", 10);
  const pageSize = Number.parseInt(url.searchParams.get("PageSize") || url.searchParams.get("pageSize") || "20", 10);
  const apiVersion = impactCatalogApiVersion(env, url.searchParams.get("version") || url.searchParams.get("IrVersion"));
  if (query) params.set("Keyword", query);
  params.set("Page", String(Number.isFinite(page) && page >= 1 ? page : 1));
  params.set("PageSize", String(Math.max(1, Math.min(200, Number.isFinite(pageSize) ? pageSize : 20))));
  params.set("IrVersion", apiVersion);

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
    const { payload, diagnostic } = await readImpactResponse(response, config);
    if (!response.ok) {
      return json({
        ok: false,
        status: response.status === 401
          ? "invalid_credentials"
          : response.status === 403
            ? "missing_scope_or_approval"
            : "request_rejected",
        source: "impact-catalog-items",
        credentialSet,
        requestedVersion: apiVersion,
        httpStatus: response.status,
        message: "impact.com rejected the Catalogs request.",
        ...diagnostic
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
      credentialSet,
      requestedVersion: apiVersion,
      upstreamVersion: diagnostic.upstreamVersion,
      httpStatus: response.status,
      resource: catalogId ? "catalog-items" : "catalog-item-search",
      catalogId: catalogId || null,
      campaignId: campaignId || null,
      page: payload?.Page ?? payload?.["@page"] ?? null,
      pageSize: payload?.PageSize ?? payload?.["@pagesize"] ?? null,
      total: payload?.Total ?? payload?.["@total"] ?? null,
      products: products.map(safeProduct)
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
