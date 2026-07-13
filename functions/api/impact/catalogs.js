import { basicAuthHeader, clean, impactConfig, json, missingCredentialsPayload } from "./_utils.js";

function catalogRows(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.Catalogs)) return payload.Catalogs;
  if (payload && typeof payload === "object" && payload.Id && payload.CampaignId) return [payload];
  return null;
}

function safeCatalog(catalog) {
  return {
    id: clean(catalog?.Id, 120),
    name: clean(catalog?.Name, 255),
    advertiserId: clean(catalog?.AdvertiserId, 120),
    advertiserName: clean(catalog?.AdvertiserName, 255),
    campaignId: clean(catalog?.CampaignId, 120),
    campaignName: clean(catalog?.CampaignName, 255),
    numberOfItems: Number.isFinite(Number(catalog?.NumberOfItems)) ? Number(catalog.NumberOfItems) : null,
    dateLastUpdated: clean(catalog?.DateLastUpdated, 80),
    currency: clean(catalog?.Currency, 12),
    serviceAreas: Array.isArray(catalog?.ServiceAreas)
      ? catalog.ServiceAreas.map((value) => clean(value, 120)).filter(Boolean).slice(0, 50)
      : []
  };
}

export async function onRequestGet({ request, env }) {
  const config = impactConfig(env);
  if (!config.configured) return json(missingCredentialsPayload("impact-catalogs"));

  const url = new URL(request.url);
  const query = clean(url.searchParams.get("q"), 120).toLowerCase();
  const page = Number.parseInt(url.searchParams.get("Page") || url.searchParams.get("page") || "0", 10);
  const pageSize = Number.parseInt(url.searchParams.get("PageSize") || url.searchParams.get("pageSize") || "100", 10);
  const params = new URLSearchParams({
    Page: String(Number.isFinite(page) && page >= 0 ? page : 0),
    PageSize: String(Math.max(1, Math.min(200, Number.isFinite(pageSize) ? pageSize : 100)))
  });
  const endpoint = `${config.apiBase}/Mediapartners/${encodeURIComponent(config.accountSid)}/Catalogs?${params.toString()}`;

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: "application/json", Authorization: basicAuthHeader(config) }
    });
    let payload = null;
    try { payload = await response.json(); } catch { payload = null; }
    if (!response.ok) {
      return json({
        ok: false,
        status: response.status === 403 ? "missing_scope_or_approval" : "request_rejected",
        source: "impact-catalogs",
        httpStatus: response.status,
        message: "impact.com rejected the Catalogs request.",
        error: payload?.Message || payload?.message || null
      }, response.status === 401 || response.status === 403 ? 403 : 502);
    }
    const rows = catalogRows(payload);
    if (!rows) {
      return json({ ok: false, status: "unexpected_response", source: "impact-catalogs", message: "impact.com returned no Catalogs array." }, 502);
    }
    const catalogs = rows.map(safeCatalog).filter((catalog) => {
      if (!query) return true;
      return [catalog.name, catalog.advertiserName, catalog.campaignName]
        .some((value) => value.toLowerCase().includes(query));
    });
    return json({
      ok: true,
      status: "connected",
      source: "impact-catalogs",
      httpStatus: response.status,
      page: payload?.Page ?? payload?.["@page"] ?? null,
      pageSize: payload?.PageSize ?? payload?.["@pagesize"] ?? null,
      total: payload?.Total ?? payload?.["@total"] ?? null,
      catalogs
    });
  } catch {
    return json({ ok: false, status: "request_failed", source: "impact-catalogs", message: "Unable to reach the impact.com Catalogs API from Cloudflare Pages." }, 502);
  }
}
