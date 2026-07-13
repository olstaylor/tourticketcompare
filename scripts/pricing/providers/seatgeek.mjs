import { normalizeObservation, toMinor } from "../core.mjs";

const MONEY = /(?:from\s*)?([£$€])\s*([0-9][0-9,]*(?:\.\d{2})?)/ig;
const SOLD_OUT = /sold\s*out|no\s*tickets\s*available/i;
const CURRENCY = { "$": "USD", "£": "GBP", "€": "EUR" };

export function extractSeatGeekPrice(text, event) {
  const base = { eventId: event.id, provider: "seatgeek", sourceUrl: event.seatgeek_url, checkedAt: new Date().toISOString(), priceType: "displayed_from", includesFees: null };
  if (SOLD_OUT.test(text)) return normalizeObservation({ ...base, currency: event.currency || "USD", lowestPriceMinor: null, status: "sold_out" });
  const matches = [...String(text || "").matchAll(MONEY)]
    .filter((m) => /from|ticket|price/i.test(String(text).slice(Math.max(0, m.index - 60), m.index + 30)));
  if (!matches.length) return normalizeObservation({ ...base, currency: event.currency || "USD", lowestPriceMinor: null, status: "unavailable" });
  const [, symbol, amount] = matches.sort((a, b) => toMinor(a[2]) - toMinor(b[2]))[0];
  return normalizeObservation({ ...base, currency: CURRENCY[symbol], lowestPriceMinor: toMinor(amount), status: "available" });
}
