import crypto from "node:crypto";

export const PROVIDERS = new Set(["ticketmaster", "seatgeek", "vivid-seats"]);
export const STATUSES = new Set(["available", "sold_out", "unavailable", "blocked", "extractor_error"]);
export const PRICE_TYPES = new Set(["displayed_from", "listing_minimum", "api"]);

export function toMinor(value, currency = "USD") {
  if (!/^[A-Z]{3}$/.test(String(currency).toUpperCase())) return null;
  const numeric = typeof value === "number" ? value : Number(String(value).replace(/[^0-9.,-]/g, "").replace(",", "."));
  if (!Number.isFinite(numeric) || numeric < 0) return null;
  return Math.round((numeric + Number.EPSILON) * 100);
}

export function observationId(observation) {
  return crypto.createHash("sha256").update([
    observation.eventId, observation.provider, observation.checkedAt,
    observation.status, observation.lowestPriceMinor ?? "", observation.sourceUrl
  ].join("\u0000")).digest("hex");
}

export function normalizeObservation(input) {
  const provider = String(input?.provider || "").toLowerCase();
  const status = String(input?.status || "").toLowerCase();
  const currency = String(input?.currency || "").toUpperCase();
  const priceType = String(input?.priceType || "");
  const eventId = String(input?.eventId || "").trim();
  const sourceUrl = String(input?.sourceUrl || "").trim();
  const checkedAt = String(input?.checkedAt || "").trim();
  const lowestPriceMinor = input?.lowestPriceMinor == null ? null : Number(input.lowestPriceMinor);
  if (!eventId || !PROVIDERS.has(provider) || !STATUSES.has(status) || !PRICE_TYPES.has(priceType)) return null;
  if (!/^[A-Z]{3}$/.test(currency) || !sourceUrl || !Number.isFinite(Date.parse(checkedAt))) return null;
  if (status === "available" && (!Number.isInteger(lowestPriceMinor) || lowestPriceMinor < 0)) return null;
  if (status !== "available" && lowestPriceMinor !== null) return null;
  const includesFees = input.includesFees == null ? null : Boolean(input.includesFees);
  const observation = { eventId, provider, currency, lowestPriceMinor, priceType, includesFees, checkedAt: new Date(checkedAt).toISOString(), sourceUrl, status };
  return { ...observation, id: observationId(observation) };
}

export function isFutureEvent(event, now = Date.now()) {
  return Number.isFinite(Date.parse(event?.datetime_iso || event?.dateTimeISO || "")) &&
    Date.parse(event.datetime_iso || event.dateTimeISO) >= now;
}
