import { detectAccessBarrier, parseAuthorizedLowestPrice } from "./_authorized-page-price.js";

export const TICKETMASTER_PAGE_PRICE_SOURCE = "ticketmaster_authorized_event_page";

function validateTicketmasterUrl(value) {
  try {
    const parsed = new URL(value);
    const host = parsed.hostname.toLowerCase();
    const path = decodeURIComponent(parsed.pathname || "");
    if (parsed.protocol !== "https:") return null;
    if (host !== "ticketmaster.com" && host !== "www.ticketmaster.com") return null;
    if (!/\/event\//i.test(path)) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

function ticketmasterEventIdFromUrl(value) {
  const validated = validateTicketmasterUrl(value);
  if (!validated) return "";
  const path = new URL(validated).pathname.replace(/\/$/, "");
  return decodeURIComponent(path.split("/").pop() || "");
}

function ticketmasterEventVerified(event) {
  if (event?.provider_links?.ticketmaster?.verified === true) return true;
  return new Set(["human_verified", "machine_high_confidence"]).has(
    String(event?.verification_status || "").trim().toLowerCase()
  );
}

export const ticketmasterProvider = {
  slug: "ticketmaster",
  name: "Ticketmaster",
  providerDbKey: "ticketmaster",
  pagePriceSource: TICKETMASTER_PAGE_PRICE_SOURCE,
  displayFlagKey: "TICKETMASTER_PRICE_DISPLAY_ENABLED",
  minimumRetrievalIntervalHours: 24,
  freshnessHours: 24,
  authorizationReference: "Ticketmaster Partnerships Team approval text supplied by the repository owner in Codex task 019f5c0a-13c6-7c61-83b2-6885185a2b3c on 2026-07-13; original correspondence retained by the owner.",
  eventUrl(event) {
    return validateTicketmasterUrl(event?.ticketmaster_url);
  },
  eventVerified: ticketmasterEventVerified,
  validateEventLink(event, destination) {
    const canonical = validateTicketmasterUrl(event?.ticketmaster_url);
    const candidate = validateTicketmasterUrl(destination);
    return Boolean(
      canonical && candidate && ticketmasterEventVerified(event) &&
      ticketmasterEventIdFromUrl(canonical) === ticketmasterEventIdFromUrl(candidate)
    );
  },
  parseLowestPagePrice(html, context = {}) {
    return parseAuthorizedLowestPrice(html, {
      eventId: context.eventId || ticketmasterEventIdFromUrl(context.sourceUrl),
      sourceUrl: context.sourceUrl,
      lowestKeys: ["lowestPrice", "lowest_price", "minPrice", "minimumPrice"]
    });
  },
  detectAccessBarrier,
  getPricing: async () => null,
  getHealth: async () => ({ status: "authorized_page_snapshot" })
};

export { ticketmasterEventIdFromUrl, validateTicketmasterUrl };
