const PROVIDERS = {
  ticketnetwork: {
    slug: "ticketnetwork",
    name: "TicketNetwork",
    envPrefix: "IMPACT_TICKETNETWORK",
    urlField: "ticketnetwork_url",
    linkKey: "ticketnetwork",
    priceSource: "ticketnetwork_impact_marketplace_api",
    defaultProgramId: "2322",
    defaultCatalogId: "896",
    allowedHosts: ["ticketnetwork.com"]
  },
  "ticket-liquidator": {
    slug: "ticket-liquidator",
    name: "Ticket Liquidator",
    envPrefix: "IMPACT_TICKETLIQUIDATOR",
    urlField: "ticketliquidator_url",
    linkKey: "ticket-liquidator",
    priceSource: "ticketliquidator_impact_marketplace_api",
    defaultProgramId: "2085",
    defaultCatalogId: "1315",
    allowedHosts: ["ticketliquidator.com"]
  },
  "stubhub-international": {
    slug: "stubhub-international",
    name: "StubHub International",
    envPrefix: "IMPACT_STUBHUB_INTERNATIONAL",
    urlField: "stubhub_international_url",
    linkKey: "stubhub-international",
    priceSource: "stubhub_international_impact_marketplace_api",
    defaultProgramId: "24092",
    defaultCatalogId: "17571",
    allowedHosts: [
      "stubhub.co.uk", "stubhub.ie", "stubhub.de", "stubhub.fr", "stubhub.es",
      "stubhub.it", "stubhub.pt", "stubhub.pl", "stubhub.se", "stubhub.dk",
      "stubhub.fi", "stubhub.gr", "stubhub.nl", "stubhub.lu", "stubhub.cz",
      "stubhub.be", "stubhub.co.at"
    ]
  }
};

function clean(value, max = 2048) {
  return String(value ?? "").trim().slice(0, max);
}

function providerConfig(slug) {
  return PROVIDERS[clean(slug, 80).toLowerCase()] || null;
}

function hostnameAllowed(hostname, allowedHosts) {
  const host = clean(hostname, 255).toLowerCase();
  return allowedHosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
}

function normalizeProviderUrl(config, value) {
  const raw = clean(value);
  if (!config || !raw || /example\.com|placeholder|replace-me|localhost|127\.0\.0\.1/i.test(raw)) return "";
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:" || !hostnameAllowed(parsed.hostname, config.allowedHosts)) return "";
    const pathname = decodeURIComponent(parsed.pathname || "/").replace(/\/{2,}/g, "/").replace(/\/+$/, "");
    if (!pathname || pathname === "/") return "";
    if (/^\/(search|home|about|help|support|faq|contact|terms|privacy)(?:\/|$)/i.test(pathname)) return "";
    parsed.pathname = pathname;
    parsed.hash = "";
    for (const key of [...parsed.searchParams.keys()]) {
      if (/^(utm_|irclickid|irgwc|clickid|aff|affiliate|ref)/i.test(key)) parsed.searchParams.delete(key);
    }
    return parsed.toString().replace(/\?$/, "");
  } catch {
    return "";
  }
}

function impactCredentials(config, env = process.env) {
  if (!config) throw new Error("Unknown Impact marketplace provider");
  const proxyUrl = clean(env.IMPACT_CATALOG_PROXY_URL, 2048);
  // All active catalog access uses the approved SeatGeek publisher account.
  // Provider-specific and retired generic credentials are intentionally ignored.
  const accountSid = clean(env.IMPACT_SEATGEEK_ACCOUNT_SID, 255);
  const authToken = clean(env.IMPACT_SEATGEEK_AUTH_TOKEN, 2000);
  const programId = clean(
    env[`${config.envPrefix}_CAMPAIGN_ID`] || env[`${config.envPrefix}_PROGRAM_ID`] || config.defaultProgramId,
    120
  );
  const catalogId = clean(env[`${config.envPrefix}_CATALOG_ID`] || config.defaultCatalogId, 120);
  if ((!accountSid || !authToken) && !proxyUrl) {
    throw new Error(`IMPACT_SEATGEEK credentials or IMPACT_CATALOG_PROXY_URL are required`);
  }
  if (!programId || !catalogId) throw new Error(`${config.envPrefix} campaign and catalog IDs are required`);
  return { accountSid, authToken, programId, catalogId, proxyUrl };
}

function catalogItemsUrl(config, artistName, page, env = process.env, pageSize = 100) {
  const { accountSid, catalogId, programId, proxyUrl } = impactCredentials(config, env);
  const apiVersion = /^\d{1,2}$/.test(clean(env.IMPACT_CATALOG_API_VERSION, 2))
    ? clean(env.IMPACT_CATALOG_API_VERSION, 2)
    : "16";
  if (proxyUrl) {
    const endpoint = new URL(proxyUrl);
    endpoint.searchParams.set("credentialSet", clean(env.IMPACT_CATALOG_CREDENTIAL_SET || "seatgeek", 40));
    endpoint.searchParams.set("version", apiVersion);
    endpoint.searchParams.set("q", clean(artistName, 200));
    endpoint.searchParams.set("catalogId", catalogId);
    endpoint.searchParams.set("campaignId", programId);
    endpoint.searchParams.set("pageSize", String(pageSize));
    endpoint.searchParams.set("page", String(page));
    return endpoint.toString();
  }
  const base = clean(env.IMPACT_API_BASE_URL || "https://api.impact.com").replace(/\/+$/, "");
  const params = new URLSearchParams({
    Keyword: clean(artistName, 200),
    PageSize: String(pageSize),
    Page: String(page),
    IrVersion: apiVersion
  });
  const resource = catalogId
    ? `Catalogs/${encodeURIComponent(catalogId)}/Items`
    : "Catalogs/ItemSearch";
  return `${base}/Mediapartners/${encodeURIComponent(accountSid)}/${resource}?${params.toString()}`;
}

// Request headers for a catalog read. Direct Impact API calls authenticate with
// the publisher Basic credentials; proxied calls go through
// /api/impact/products, which holds those credentials server-side and now
// requires the shared bearer token (IMPACT_CATALOG_PROXY_TOKEN here,
// IMPACT_DIAGNOSTICS_TOKEN on the Pages runtime). Proxy mode never forwards the
// Basic header — the proxy would ignore it, and the token is the credential
// that route checks.
function catalogRequestHeaders(config, env = process.env) {
  const { accountSid, authToken, proxyUrl } = impactCredentials(config, env);
  const headers = { Accept: "application/json" };
  if (proxyUrl) {
    const proxyToken = clean(env.IMPACT_CATALOG_PROXY_TOKEN, 400);
    if (proxyToken) headers.Authorization = `Bearer ${proxyToken}`;
    return headers;
  }
  if (accountSid && authToken) {
    headers.Authorization = `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`;
  }
  return headers;
}

function catalogItems(payload) {
  if (Array.isArray(payload)) return payload;
  for (const key of ["Items", "Results", "CatalogItems", "Products", "products"]) {
    if (Array.isArray(payload?.[key])) return payload[key];
  }
  if (payload && typeof payload === "object" && (payload.CatalogItemId || payload.CatalogId)) return [payload];
  return null;
}

function providerProductUrl(config, value) {
  const raw = clean(value);
  const direct = normalizeProviderUrl(config, raw);
  if (direct) return direct;
  try {
    const tracking = new URL(raw);
    if (tracking.protocol !== "https:") return "";
    for (const key of ["u", "url", "redirect"]) {
      const nested = normalizeProviderUrl(config, tracking.searchParams.get(key));
      if (nested) return nested;
    }
  } catch {}
  return "";
}

function catalogItemMatchesProgram(item, programId) {
  const expected = clean(programId, 120);
  const actual = clean(item?.CampaignId || item?.ProgramId, 120);
  return Boolean(expected && actual && expected === actual);
}

function offerRows(item) {
  return Array.isArray(item?.Offers) && item.Offers.length ? item.Offers : [item];
}

function productCandidates(config, item, programId = "") {
  if (programId && !catalogItemMatchesProgram(item, programId)) return [];
  const candidates = [];
  for (const offer of offerRows(item)) {
    const originalUrl = clean(
      offer?.OriginalUrl || offer?.Url || offer?.URL || item?.OriginalUrl || item?.Url || item?.URL
    );
    const normalizedUrl = providerProductUrl(config, originalUrl);
    const externalId = clean(
      offer?.Sku || offer?.SKU || item?.Sku || item?.SKU || item?.CatalogItemId || item?.Id,
      255
    );
    if (!normalizedUrl || !externalId) continue;
    const rawPrice = offer?.CurrentPrice ?? item?.CurrentPrice ?? offer?.Price ?? item?.Price;
    const rawInventory = offer?.InventoryCount ?? item?.InventoryCount;
    const price = rawPrice == null || clean(rawPrice, 80) === "" ? Number.NaN : Number(rawPrice);
    const inventory = rawInventory == null || clean(rawInventory, 80) === "" ? Number.NaN : Number(rawInventory);
    const currency = clean(offer?.Currency || item?.Currency, 12).toUpperCase();
    const searchableText = [
      item?.Name, item?.Description, item?.Manufacturer, item?.Category, item?.SubCategory,
      item?.ParentName, item?.Text1, item?.Text2, item?.Text3, item?.Mpn,
      item?.LaunchDate, item?.ExpirationDate, item?.EstimatedShipDate,
      ...(Array.isArray(item?.Bullets) ? item.Bullets : []),
      ...(Array.isArray(item?.Labels) ? item.Labels : []),
      offer?.Name, offer?.Description, decodeURIComponent(new URL(normalizedUrl).pathname)
    ].map((value) => clean(value, 1000)).filter(Boolean).join(" ");
    candidates.push({
      externalId,
      normalizedUrl,
      searchableText,
      price: Number.isFinite(price) && price >= 0 ? price : null,
      currency: /^[A-Z]{3}$/.test(currency) ? currency : "",
      inventoryCount: Number.isInteger(inventory) && inventory >= 0 ? inventory : null
    });
  }
  return candidates;
}

export {
  PROVIDERS,
  catalogItemMatchesProgram,
  catalogItems,
  catalogItemsUrl,
  catalogRequestHeaders,
  clean,
  hostnameAllowed,
  impactCredentials,
  normalizeProviderUrl,
  providerProductUrl,
  productCandidates,
  providerConfig
};
