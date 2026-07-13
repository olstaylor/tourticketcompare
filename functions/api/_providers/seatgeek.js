import { detectAccessBarrier, parseAuthorizedLowestPrice } from "./_authorized-page-price.js";

export const SEATGEEK_PAGE_PRICE_SOURCE = "seatgeek_authorized_event_page";

function validateSeatGeekUrl(value) {
  try {
    const parsed = new URL(value);
    const host = parsed.hostname.toLowerCase();
    const path = decodeURIComponent(parsed.pathname || "").replace(/\/$/, "");
    if (parsed.protocol !== "https:") return null;
    if (host !== "seatgeek.com" && host !== "www.seatgeek.com") return null;
    if (!/\/(?:concert|sports|theater|theatre)\/\d+$/i.test(path)) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

function seatGeekEventIdFromUrl(value) {
  const validated = validateSeatGeekUrl(value);
  if (!validated) return "";
  const match = new URL(validated).pathname.replace(/\/$/, "").match(/\/(\d+)$/);
  return match?.[1] || "";
}

export const seatgeekProvider = {
  slug: "seatgeek",
  name: "SeatGeek",
  providerDbKey: "seatgeek",
  pagePriceSource: SEATGEEK_PAGE_PRICE_SOURCE,
  apiPriceSource: "seatgeek_partner_api",
  displayFlagKey: "SEATGEEK_PRICE_DISPLAY_ENABLED",
  minimumRetrievalIntervalHours: 24,
  freshnessHours: 24,
  authorizationReference: "SeatGeek Partnerships Team approval text supplied by the repository owner in Codex task 019f5c0a-13c6-7c61-83b2-6885185a2b3c on 2026-07-13; original correspondence retained by the owner.",
  eventUrl(event) {
    return validateSeatGeekUrl(event?.seatgeek_url);
  },
  eventVerified(event) {
    return event?.provider_links?.seatgeek?.verified === true;
  },
  validateEventLink(event, destination) {
    const canonical = validateSeatGeekUrl(event?.seatgeek_url);
    const candidate = validateSeatGeekUrl(destination);
    return Boolean(
      canonical && candidate && event?.provider_links?.seatgeek?.verified === true &&
      seatGeekEventIdFromUrl(canonical) === seatGeekEventIdFromUrl(candidate)
    );
  },
  parseLowestPagePrice(html, context = {}) {
    return parseAuthorizedLowestPrice(html, {
      eventId: context.eventId || seatGeekEventIdFromUrl(context.sourceUrl),
      sourceUrl: context.sourceUrl,
      lowestKeys: ["lowest_price", "lowestPrice", "low_price", "lowest_sg_base_price", "lowestSgBasePrice"]
    });
  },
  detectAccessBarrier,
  getPricing: async () => null,
  getHealth: async () => ({ status: "authorized_page_snapshot" })
};

export { seatGeekEventIdFromUrl, validateSeatGeekUrl };
