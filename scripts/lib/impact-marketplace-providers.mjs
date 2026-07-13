const PROVIDERS = {
  ticketnetwork: {
    slug: "ticketnetwork",
    name: "TicketNetwork",
    envPrefix: "IMPACT_TICKETNETWORK",
    urlField: "ticketnetwork_url",
    linkKey: "ticketnetwork",
    priceSource: "ticketnetwork_impact_marketplace_api",
    allowedHosts: ["ticketnetwork.com"]
  },
  "ticket-liquidator": {
    slug: "ticket-liquidator",
    name: "Ticket Liquidator",
    envPrefix: "IMPACT_TICKETLIQUIDATOR",
    urlField: "ticketliquidator_url",
    linkKey: "ticket-liquidator",
    priceSource: "ticketliquidator_impact_marketplace_api",
    allowedHosts: ["ticketliquidator.com"]
  },
  "stubhub-international": {
    slug: "stubhub-international",
    name: "StubHub International",
    envPrefix: "IMPACT_STUBHUB_INTERNATIONAL",
    urlField: "stubhub_international_url",
    linkKey: "stubhub-international",
    priceSource: "stubhub_international_impact_marketplace_api",
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
  const accountSid = clean(env[`${config.envPrefix}_ACCOUNT_SID`] || env.IMPACT_ACCOUNT_SID, 255);
  const authToken = clean(env[`${config.envPrefix}_AUTH_TOKEN`] || env.IMPACT_AUTH_TOKEN, 2000);
  const programId = clean(
    env[`${config.envPrefix}_CAMPAIGN_ID`] || env[`${config.envPrefix}_PROGRAM_ID`],
    120
  );
  const catalogId = clean(env[`${config.envPrefix}_CATALOG_ID`], 120);
  if (!accountSid || !authToken || !programId) {
    throw new Error(`${config.envPrefix}_ACCOUNT_SID, _AUTH_TOKEN and _CAMPAIGN_ID (or _PROGRAM_ID) are required`);
  }
  return { accountSid, authToken, programId, catalogId };
}

function catalogItemsUrl(config, artistName, page, env = process.env, pageSize = 100) {
  const { accountSid, catalogId } = impactCredentials(config, env);
  const base = clean(env.IMPACT_API_BASE_URL || "https://api.impact.com").replace(/\/+$/, "");
  const params = new URLSearchParams({
    Keyword: clean(artistName, 200),
    PageSize: String(pageSize),
    Page: String(page)
  });
  const resource = catalogId
    ? `Catalogs/${encodeURIComponent(catalogId)}/Items`
    : "Catalogs/ItemSearch";
  return `${base}/Mediapartners/${encodeURIComponent(accountSid)}/${resource}?${params.toString()}`;
}

function catalogItems(payload) {
  if (Array.isArray(payload)) return payload;
  for (const key of ["Items", "Results", "CatalogItems", "Products"]) {
    if (Array.isArray(payload?.[key])) return payload[key];
  }
  if (payload && typeof payload === "object" && (payload.CatalogItemId || payload.CatalogId)) return [payload];
  return null;
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
    const normalizedUrl = normalizeProviderUrl(config, originalUrl);
    const externalId = clean(
      offer?.Sku || offer?.SKU || item?.Sku || item?.SKU || item?.CatalogItemId || item?.Id,
      255
    );
    if (!normalizedUrl || !externalId) continue;
    const price = Number(offer?.CurrentPrice ?? item?.CurrentPrice ?? offer?.Price ?? item?.Price);
    const inventory = Number(offer?.InventoryCount ?? item?.InventoryCount);
    const currency = clean(offer?.Currency || item?.Currency, 12).toUpperCase();
    const searchableText = [
      item?.Name, item?.Description, item?.Manufacturer, item?.Category, item?.SubCategory,
      item?.ParentName, item?.Text1, item?.Text2, item?.Text3, item?.Mpn,
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
  clean,
  hostnameAllowed,
  impactCredentials,
  normalizeProviderUrl,
  productCandidates,
  providerConfig
};
