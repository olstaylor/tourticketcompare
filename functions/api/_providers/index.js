/**
 * Provider API Stubs
 *
 * Modular provider-specific implementations.
 * Each provider exports:
 * - validateEventLink(event, destination)
 * - getPricing(env, eventId) [stub until enabled]
 * - getHealth(env) [stub until enabled]
 *
 * Allows future implementation of provider APIs without restructuring
 * the main request flow.
 */

import { ProviderRegistry } from "../_provider-registry.js";

/**
 * Stub: Ticketmaster provider handler
 * Currently delegates to existing out.js logic
 */
export const ticketmasterProvider = {
  slug: "ticketmaster",
  validateEventLink: (event, destination) => {
    // Validate that event.ticketmaster_url matches destination
    if (!event?.ticketmaster_url || !destination) return false;
    try {
      const eventUrl = new URL(event.ticketmaster_url);
      const destUrl = new URL(destination);
      return eventUrl.hostname === destUrl.hostname;
    } catch {
      return false;
    }
  },
  getPricing: async (env, eventId) => {
    // TODO: Implement Ticketmaster Search API pricing fetch
    // For now, return null (no pricing display)
    return null;
  },
  getHealth: async (env) => {
    // TODO: Implement Ticketmaster API health check
    return { status: "not_checked" };
  }
};

/**
 * Stub: SeatGeek provider handler
 * Ready for future API integration
 */
export const seatgeekProvider = {
  slug: "seatgeek",
  validateEventLink: (event, destination) => {
    // TODO: Implement SeatGeek event matching
    // Requires SeatGeek event ID in events.json
    return false; // Not yet integrated
  },
  getPricing: async (env, eventId) => {
    // TODO: Implement SeatGeek API pricing fetch
    return null;
  },
  getHealth: async (env) => {
    // TODO: Implement SeatGeek API health check
    return { status: "not_configured" };
  }
};

/**
 * Stub: Vivid Seats provider handler
 * Ready for future API integration
 */
export const vividSeatsProvider = {
  slug: "vivid-seats",
  validateEventLink: (event, destination) => {
    // TODO: Implement Vivid Seats event matching
    return false; // Not yet integrated
  },
  getPricing: async (env, eventId) => {
    // TODO: Implement Vivid Seats API pricing fetch
    return null;
  },
  getHealth: async (env) => {
    // TODO: Implement Vivid Seats API health check
    return { status: "not_configured" };
  }
};

/**
 * Stub: StubHub provider handler
 * Ready for future API integration
 */
export const stubhubProvider = {
  slug: "stubhub",
  validateEventLink: (event, destination) => {
    // TODO: Implement StubHub event matching
    return false; // Not yet integrated
  },
  getPricing: async (env, eventId) => {
    // TODO: Implement StubHub API pricing fetch
    return null;
  },
  getHealth: async (env) => {
    // TODO: Implement StubHub API health check
    return { status: "not_configured" };
  }
};

/**
 * Registry of all providers
 */
export const PROVIDER_IMPLEMENTATIONS = {
  ticketmaster: ticketmasterProvider,
  seatgeek: seatgeekProvider,
  "vivid-seats": vividSeatsProvider,
  stubhub: stubhubProvider
};

/**
 * Get provider implementation by slug
 */
export function getProviderHandler(slug) {
  return PROVIDER_IMPLEMENTATIONS[slug] || null;
}

/**
 * Validate event link for a provider
 */
export function validateEventLink(slug, event, destination) {
  const handler = getProviderHandler(slug);
  if (!handler) return false;
  return handler.validateEventLink(event, destination);
}

/**
 * Stub for getting pricing from a provider (not yet implemented)
 * Returns null until provider API integration is enabled
 */
export async function getPricingFromProvider(slug, env, eventId) {
  const handler = getProviderHandler(slug);
  if (!handler) return null;
  return handler.getPricing(env, eventId);
}

/**
 * Stub for provider health check (not yet implemented)
 */
export async function checkProviderHealth(slug, env) {
  const handler = getProviderHandler(slug);
  if (!handler) return { status: "unknown_provider" };
  return handler.getHealth(env);
}
