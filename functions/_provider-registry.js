/**
 * ProviderRegistry
 *
 * Single source of truth for provider definitions and runtime configuration.
 * Loaded from catalog.json and provider-configs.json at request time.
 *
 * Provides:
 * - Unified provider lookup
 * - Public/affiliate enablement checks
 * - Destination validation (allowlisting)
 * - Pricing strategy queries
 * - Credential availability checks
 */

export class ProviderRegistry {
  constructor(catalogData, configData) {
    if (!catalogData?.providers) {
      throw new Error("ProviderRegistry: catalog.providers missing");
    }
    if (!configData?.provider_credentials) {
      throw new Error("ProviderRegistry: config.provider_credentials missing");
    }

    this.providers = catalogData.providers.reduce((acc, p) => {
      acc[p.slug] = p;
      return acc;
    }, {});

    this.config = configData.provider_credentials;
    this.pricingRules = configData.pricing_display_rules || {};
    this.cacheSettings = configData.cache_settings || {};
  }

  /**
   * Get provider definition by slug
   */
  getProvider(slug) {
    return this.providers[slug] || null;
  }

  /**
   * Check if provider is publicly enabled and ready
   */
  isPublicEnabled(slug) {
    const provider = this.getProvider(slug);
    const config = this.config[slug];
    if (!provider || !config) return false;

    return provider.public_enabled === true && config.public_enabled === true;
  }

  /**
   * Check if affiliate tracking is enabled for this provider
   */
  isAffiliateEnabled(slug) {
    const provider = this.getProvider(slug);
    const config = this.config[slug];
    if (!provider || !config) return false;

    const hasAffiliateHosts =
      provider.trusted_affiliate_hosts && provider.trusted_affiliate_hosts.length > 0;

    return (
      config.affiliate_enabled === true &&
      config.enabled === true &&
      hasAffiliateHosts === true
    );
  }

  /**
   * Get all publicly enabled providers
   */
  getPublicProviders() {
    return Object.entries(this.providers)
      .filter(([slug]) => this.isPublicEnabled(slug))
      .map(([_, provider]) => provider);
  }

  /**
   * Validate that a destination URL is allowlisted for this provider
   * Returns { ok: true } or { ok: false, reason: string }
   */
  validateDestination(slug, url) {
    const provider = this.getProvider(slug);
    if (!provider) {
      return { ok: false, reason: "unknown_provider" };
    }

    if (!url) {
      return { ok: false, reason: "missing_url" };
    }

    try {
      const parsed = new URL(url);
      const allowedHosts = provider.allowed_destination_hosts || [];

      const isAllowed = allowedHosts.some((allowed) => {
        const hostname = parsed.hostname.toLowerCase();
        return hostname === allowed || hostname.endsWith(`.${allowed}`);
      });

      if (!isAllowed) {
        return { ok: false, reason: "destination_not_allowlisted" };
      }

      return { ok: true, hostname: parsed.hostname.toLowerCase() };
    } catch (error) {
      return { ok: false, reason: "invalid_url" };
    }
  }

  /**
   * Validate that a configured redirect (affiliate or direct) is safe
   * Returns parsed URL or null if invalid
   */
  validateConfiguredRedirect(slug, redirectUrl) {
    const provider = this.getProvider(slug);
    if (!provider) return null;

    try {
      const parsed = new URL(redirectUrl);
      const allAllowed = [
        ...(provider.allowed_destination_hosts || []),
        ...(provider.trusted_affiliate_hosts || [])
      ];

      const isAllowed = allAllowed.some((allowed) => {
        const hostname = parsed.hostname.toLowerCase();
        return hostname === allowed || hostname.endsWith(`.${allowed}`);
      });

      return isAllowed ? parsed : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Get pricing display strategy
   */
  getPricingStrategy() {
    return this.pricingRules;
  }

  /**
   * Check if pricing should be displayed based on config
   */
  shouldDisplayPricing() {
    return this.pricingRules?.enabled === true;
  }

  /**
   * Get cache TTL for event data (seconds)
   */
  getEventDataTtl() {
    return this.cacheSettings?.event_data_ttl_seconds || 3600;
  }

  /**
   * Get cache TTL for pricing data (seconds)
   */
  getPricingDataTtl() {
    return this.cacheSettings?.pricing_data_ttl_seconds || 300;
  }

  /**
   * Get provider health check interval (seconds)
   */
  getHealthCheckInterval() {
    return this.cacheSettings?.provider_health_check_interval_seconds || 1800;
  }

  /**
   * Get all provider credentials that should exist based on config
   * Returns { [slug]: { fields: string[], enabled: bool } }
   */
  getRequiredCredentials() {
    const required = {};
    for (const [slug, provider] of Object.entries(this.providers)) {
      const config = this.config[slug];
      if (config?.enabled) {
        required[slug] = {
          type: provider.credential_type,
          fields: provider.credential_fields || [],
          configured: config.credentials_set === true
        };
      }
    }
    return required;
  }

  /**
   * Get affiliate disclosure for a provider
   */
  getAffiliateDisclosure(slug) {
    const provider = this.getProvider(slug);
    return provider?.affiliate_disclosure || null;
  }

  /**
   * Get provider contact information
   */
  getProviderContact(slug) {
    const provider = this.getProvider(slug);
    return provider?.contact || null;
  }
}

/**
 * Load catalog and provider configs from assets
 */
export async function loadRegistryFromAssets(env) {
  if (!env?.ASSETS || typeof env.ASSETS.fetch !== "function") {
    return null;
  }

  try {
    const [catalogRes, configRes] = await Promise.all([
      env.ASSETS.fetch(new Request("https://assets.local/data/catalog.json")),
      env.ASSETS.fetch(new Request("https://assets.local/data/provider-configs.json"))
    ]);

    if (!catalogRes.ok || !configRes.ok) {
      return null;
    }

    const catalog = await catalogRes.json();
    const config = await configRes.json();

    return new ProviderRegistry(catalog, config);
  } catch (error) {
    return null;
  }
}
