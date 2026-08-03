import {
  basicAuthHeader,
  clean,
  diagnosticNotFound,
  impactCatalogApiVersion,
  impactConfig,
  impactCredentialSet,
  isDiagnosticAuthorised,
  json,
  missingCredentialsPayload,
  readImpactResponse
} from "./_utils.js";

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
      : clean(catalog?.ServiceAreas, 500)
  };
}

export async function onRequestGet({ request, env }) {
  if (!isDiagnosticAuthorised(request, env)) return diagnosticNotFound();

  const url = new URL(request.url);
  const credentialSet = impactCredentialSet(url.searchParams.get("credentialSet"));
  const config = impactConfig(env, credentialSet);
  if (!config.configured) return json(missingCredentialsPayload("impact-catalogs", credentialSet));

  const query = clean(url.searchParams.get("q"), 120).toLowerCase();
  const campaignId = clean(url.searchParams.get("campaignId") || url.searchParams.get("CampaignId"), 120);
  const apiVersion = impactCatalogApiVersion(env, url.searchParams.get("version") || url.searchParams.get("IrVersion"));
  const params = new URLSearchParams({ IrVersion: apiVersion });
  if (campaignId) params.set("CampaignId", campaignId);
  const endpoint = `${config.apiBase}/Mediapartners/${encodeURIComponent(config.accountSid)}/Catalogs?${params.toString()}`;

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: "application/json", Authorization: basicAuthHeader(config) }
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
        source: "impact-catalogs",
        credentialSet,
        requestedVersion: apiVersion,
        httpStatus: response.status,
        message: "impact.com rejected the Catalogs request.",
        ...diagnostic
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
      credentialSet,
      requestedVersion: apiVersion,
      upstreamVersion: diagnostic.upstreamVersion,
      httpStatus: response.status,
      campaignId: campaignId || null,
      catalogs
    });
  } catch {
    return json({ ok: false, status: "request_failed", source: "impact-catalogs", message: "Unable to reach the impact.com Catalogs API from Cloudflare Pages." }, 502);
  }
}
