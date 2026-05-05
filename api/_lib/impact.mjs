const DEFAULT_IMPACT_API_BASE = "https://api.impact.com";

export function getImpactConfig(env = process.env) {
  const accountSid = String(env.IMPACT_ACCOUNT_SID || "").trim();
  const authToken = String(env.IMPACT_AUTH_TOKEN || "").trim();
  const apiBase = String(env.IMPACT_API_BASE_URL || DEFAULT_IMPACT_API_BASE).replace(/\/+$/, "");

  return {
    accountSid,
    authToken,
    apiBase,
    configured: Boolean(accountSid && authToken)
  };
}

export function getImpactReadiness(env = process.env) {
  const config = getImpactConfig(env);
  return {
    configured: config.configured,
    source: "impact-publisher",
    accountSidPresent: Boolean(config.accountSid),
    authTokenPresent: Boolean(config.authToken)
  };
}

export function buildImpactHeaders(config) {
  const credentials = Buffer.from(`${config.accountSid}:${config.authToken}`, "utf8").toString("base64");
  return {
    Accept: "application/json",
    Authorization: `Basic ${credentials}`
  };
}

export async function fetchImpactCompanyInformation(env = process.env) {
  const config = getImpactConfig(env);
  if (!config.configured) {
    return {
      ok: false,
      status: "missing_credentials",
      source: "impact-publisher",
      message: "Set IMPACT_ACCOUNT_SID and IMPACT_AUTH_TOKEN to enable impact.com publisher API checks."
    };
  }

  const endpoint = `${config.apiBase}/Mediapartners/${encodeURIComponent(config.accountSid)}/CompanyInformation`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: buildImpactHeaders(config)
    });

    let payload = null;
    try {
      payload = await response.json();
    } catch (error) {
      payload = null;
    }

    if (!response.ok) {
      return {
        ok: false,
        status: "auth_failed",
        source: "impact-publisher",
        httpStatus: response.status,
        message: "impact.com rejected the configured publisher API credentials.",
        error: payload?.Message || payload?.message || null
      };
    }

    return {
      ok: true,
      status: "connected",
      source: "impact-publisher",
      httpStatus: response.status,
      companyName: payload?.CompanyName || null,
      website: payload?.Website || null,
      currency: payload?.Currency || null,
      timezone: payload?.Timezone || null
    };
  } catch (error) {
    return {
      ok: false,
      status: "request_failed",
      source: "impact-publisher",
      message: "Unable to reach the impact.com publisher API from this environment."
    };
  }
}

export async function searchImpactMarketplaceProducts(options = {}) {
  const env = options.env || process.env;
  const config = getImpactConfig(env);
  if (!config.configured) {
    return {
      ok: false,
      status: "missing_credentials",
      source: "impact-marketplace-products",
      products: [],
      message: "Set IMPACT_ACCOUNT_SID and IMPACT_AUTH_TOKEN to search impact.com Marketplace Products."
    };
  }

  const params = new URLSearchParams();
  const query = String(options.query || "").trim();
  const page = Number.parseInt(options.page || "1", 10);
  const pageSize = Number.parseInt(options.pageSize || "20", 10);

  if (query) params.set("Keyword", query);
  params.set("Page", String(Number.isFinite(page) && page > 0 ? page : 1));
  params.set("PageSize", String(Math.max(1, Math.min(100, Number.isFinite(pageSize) ? pageSize : 20))));

  const endpoint = `${config.apiBase}/Mediapartners/${encodeURIComponent(config.accountSid)}/Marketplace/Products?${params.toString()}`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: buildImpactHeaders(config)
    });

    let payload = null;
    try {
      payload = await response.json();
    } catch (error) {
      payload = null;
    }

    if (!response.ok) {
      return {
        ok: false,
        status: "request_rejected",
        source: "impact-marketplace-products",
        httpStatus: response.status,
        products: [],
        message: "impact.com rejected the Marketplace Products request.",
        error: payload?.Message || payload?.message || null
      };
    }

    const products = Array.isArray(payload?.Results)
      ? payload.Results
      : Array.isArray(payload?.Products)
      ? payload.Products
      : Array.isArray(payload?.MarketplaceProducts)
        ? payload.MarketplaceProducts
        : [];

    return {
      ok: true,
      status: "connected",
      source: "impact-marketplace-products",
      httpStatus: response.status,
      page: payload?.Page || payload?.["@page"] || null,
      pageSize: payload?.PageSize || payload?.["@pagesize"] || null,
      total: payload?.Total || payload?.["@total"] || null,
      products
    };
  } catch (error) {
    return {
      ok: false,
      status: "request_failed",
      source: "impact-marketplace-products",
      products: [],
      message: "Unable to reach the impact.com Marketplace Products API from this environment."
    };
  }
}

function cleanTrackingValue(value, maxLength = 255) {
  return String(value || "").trim().slice(0, maxLength);
}

export async function createImpactTrackingLink(options = {}) {
  const env = options.env || process.env;
  const config = getImpactConfig(env);
  if (!config.configured) {
    return {
      ok: false,
      status: "missing_credentials",
      source: "impact-tracking-links",
      message: "Set IMPACT_ACCOUNT_SID and IMPACT_AUTH_TOKEN to create impact.com tracking links."
    };
  }

  const programId = cleanTrackingValue(options.programId, 120);
  if (!programId) {
    return {
      ok: false,
      status: "missing_program_id",
      source: "impact-tracking-links",
      message: "ProgramId is required to create a tracking link."
    };
  }

  const params = new URLSearchParams();
  const allowedParams = [
    ["Type", options.type],
    ["CustomPath", options.customPath],
    ["AdId", options.adId],
    ["DeepLink", options.deepLink],
    ["MediaPartnerPropertyId", options.mediaPartnerPropertyId],
    ["subId1", options.subId1],
    ["subId2", options.subId2],
    ["subId3", options.subId3],
    ["sharedId", options.sharedId]
  ];

  for (const [key, value] of allowedParams) {
    const cleaned = cleanTrackingValue(value, key === "DeepLink" ? 2048 : 255);
    if (cleaned) params.set(key, cleaned);
  }

  const deepLink = params.get("DeepLink");
  if (deepLink) {
    try {
      const parsed = new URL(deepLink);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        throw new Error("unsupported protocol");
      }
    } catch (error) {
      return {
        ok: false,
        status: "invalid_deep_link",
        source: "impact-tracking-links",
        message: "DeepLink must be a valid http(s) URL."
      };
    }
  }

  const type = params.get("Type");
  if (type && !["Regular", "Vanity"].includes(type)) {
    return {
      ok: false,
      status: "invalid_type",
      source: "impact-tracking-links",
      message: "Type must be Regular or Vanity."
    };
  }

  const endpoint = `${config.apiBase}/Mediapartners/${encodeURIComponent(
    config.accountSid
  )}/Programs/${encodeURIComponent(programId)}/TrackingLinks${params.size ? `?${params.toString()}` : ""}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: buildImpactHeaders(config)
    });

    let payload = null;
    try {
      payload = await response.json();
    } catch (error) {
      payload = null;
    }

    if (!response.ok) {
      return {
        ok: false,
        status: "request_rejected",
        source: "impact-tracking-links",
        httpStatus: response.status,
        message: "impact.com rejected the tracking link creation request.",
        error: payload?.Message || payload?.message || null
      };
    }

    return {
      ok: true,
      status: "created",
      source: "impact-tracking-links",
      httpStatus: response.status,
      trackingUrl: payload?.TrackingURL || payload?.TrackingUrl || null,
      raw: payload
    };
  } catch (error) {
    return {
      ok: false,
      status: "request_failed",
      source: "impact-tracking-links",
      message: "Unable to reach the impact.com TrackingLinks API from this environment."
    };
  }
}
