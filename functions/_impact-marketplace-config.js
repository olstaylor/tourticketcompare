const PROVIDERS = Object.freeze({
  ticketnetwork: Object.freeze({
    envPrefix: "IMPACT_TICKETNETWORK",
    publicFlag: "TICKETNETWORK_PUBLIC_ENABLED",
    priceFlag: "TICKETNETWORK_PRICE_DISPLAY_ENABLED",
    defaultProgramId: "2322",
    publicEnabledByDefault: true,
    priceDisplayEnabledByDefault: true
  }),
  "ticket-liquidator": Object.freeze({
    envPrefix: "IMPACT_TICKETLIQUIDATOR",
    publicFlag: "TICKETLIQUIDATOR_PUBLIC_ENABLED",
    priceFlag: "TICKETLIQUIDATOR_PRICE_DISPLAY_ENABLED",
    defaultProgramId: "2085",
    publicEnabledByDefault: true,
    priceDisplayEnabledByDefault: false
  }),
  "stubhub-international": Object.freeze({
    envPrefix: "IMPACT_STUBHUB_INTERNATIONAL",
    publicFlag: "STUBHUB_INTERNATIONAL_PUBLIC_ENABLED",
    priceFlag: "STUBHUB_INTERNATIONAL_PRICE_DISPLAY_ENABLED",
    defaultProgramId: "24092",
    publicEnabledByDefault: true,
    priceDisplayEnabledByDefault: true
  }),
  // Dormant lanes (prepared 2026-11-22, programmes not yet joined). Public and
  // price-display flags default OFF; nothing renders until the owner flips them.
  tickpick: Object.freeze({
    envPrefix: "IMPACT_TICKPICK",
    publicFlag: "TICKPICK_PUBLIC_ENABLED",
    priceFlag: "TICKPICK_PRICE_DISPLAY_ENABLED",
    defaultProgramId: "10353",
    publicEnabledByDefault: false,
    priceDisplayEnabledByDefault: false
  }),
  gametime: Object.freeze({
    envPrefix: "IMPACT_GAMETIME",
    publicFlag: "GAMETIME_PUBLIC_ENABLED",
    priceFlag: "GAMETIME_PRICE_DISPLAY_ENABLED",
    defaultProgramId: "10874",
    publicEnabledByDefault: false,
    priceDisplayEnabledByDefault: false
  })
});

function providerKey(value) {
  const compact = String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
  if (compact === "ticketliquidator") return "ticket-liquidator";
  if (compact === "stubhubinternational") return "stubhub-international";
  return compact;
}

function envBoolean(value, fallback) {
  if (value == null || String(value).trim() === "") return fallback;
  return String(value).trim().toLowerCase() === "true";
}

function clean(value) {
  return String(value || "").trim();
}

export function impactMarketplaceRuntimeConfig(env = {}, provider) {
  const slug = providerKey(provider);
  const definition = PROVIDERS[slug];
  if (!definition) return null;

  // All active marketplace programs run through the approved SeatGeek
  // publisher account. Provider-specific and retired Ticketmaster credentials
  // are deliberately ignored.
  const accountSid = clean(env?.IMPACT_SEATGEEK_ACCOUNT_SID);
  const authToken = clean(env?.IMPACT_SEATGEEK_AUTH_TOKEN);
  const programId = clean(
    env?.[`${definition.envPrefix}_CAMPAIGN_ID`] ||
    env?.[`${definition.envPrefix}_PROGRAM_ID`] ||
    definition.defaultProgramId
  );
  const baseTrackingUrl = clean(env?.[`${definition.envPrefix}_BASE_TRACKING_URL`]);
  const publicEnabled = envBoolean(env?.[definition.publicFlag], definition.publicEnabledByDefault);
  const priceDisplayEnabled = envBoolean(env?.[definition.priceFlag], definition.priceDisplayEnabledByDefault);
  const trackingConfigured = Boolean(baseTrackingUrl || (accountSid && authToken && programId));

  return {
    slug,
    ...definition,
    accountSid,
    authToken,
    programId,
    baseTrackingUrl,
    publicEnabled,
    priceDisplayEnabled,
    trackingConfigured,
    configured: publicEnabled && trackingConfigured
  };
}

export function impactMarketplacePublicEnabled(env = {}, provider) {
  return impactMarketplaceRuntimeConfig(env, provider)?.publicEnabled === true;
}

export function impactMarketplacePriceDisplayEnabled(env = {}, provider) {
  const config = impactMarketplaceRuntimeConfig(env, provider);
  return Boolean(config?.publicEnabled && config?.priceDisplayEnabled);
}

