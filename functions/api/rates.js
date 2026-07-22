// Cached currency reference rates for the /currency-converter page.
// Upstream: Frankfurter (https://frankfurter.dev), which republishes the
// European Central Bank's daily reference rates. Public data, no credentials,
// no user input reaches the upstream request.
// Fail-closed: if the upstream response is missing, non-JSON, or malformed we
// return 503 and the client keeps the converter disabled — rates are never
// invented, defaulted, or served stale beyond the edge-cache TTL.

const UPSTREAM_URL = "https://api.frankfurter.dev/v1/latest?base=EUR";
const CACHE_KEY_URL = "https://tourticketcompare.com/api/rates?cache=v1";
const EDGE_CACHE_SECONDS = 21600; // ECB publishes once per working day
const BROWSER_CACHE_SECONDS = 1800;
const UPSTREAM_TIMEOUT_MS = 8000;
const CURRENCY_CODE = /^[A-Z]{3}$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function json(payload, status = 200, cacheControl = "no-store") {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": cacheControl
    }
  });
}

function unavailable() {
  return json({ ok: false, error: "rates_unavailable" }, 503);
}

// EUR-based rate table: keep only well-formed 3-letter codes with finite
// positive rates, and include the base itself so clients convert uniformly.
function sanitizeRates(payload) {
  if (!payload || payload.base !== "EUR") return null;
  const date = String(payload.date || "").trim();
  if (!ISO_DATE.test(date)) return null;
  const rates = { EUR: 1 };
  for (const [code, value] of Object.entries(payload.rates || {})) {
    const normalized = String(code || "").trim().toUpperCase();
    const rate = Number(value);
    if (!CURRENCY_CODE.test(normalized) || !Number.isFinite(rate) || rate <= 0) continue;
    rates[normalized] = rate;
  }
  if (Object.keys(rates).length < 2) return null;
  return { date, rates };
}

export async function onRequestGet(context) {
  const cache = caches.default;
  const cacheKey = new Request(CACHE_KEY_URL);
  try {
    const cached = await cache.match(cacheKey);
    if (cached) return cached;
  } catch (error) {
    // Cache API unavailable (e.g. local dev) — fall through to the upstream fetch.
  }

  let upstream;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
    try {
      upstream = await fetch(UPSTREAM_URL, {
        signal: controller.signal,
        headers: { Accept: "application/json" }
      });
    } finally {
      clearTimeout(timer);
    }
  } catch (error) {
    return unavailable();
  }
  if (!upstream || !upstream.ok) return unavailable();

  let payload;
  try {
    payload = await upstream.json();
  } catch (error) {
    return unavailable();
  }

  const sanitized = sanitizeRates(payload);
  if (!sanitized) return unavailable();

  const response = json(
    {
      ok: true,
      base: "EUR",
      date: sanitized.date,
      rates: sanitized.rates,
      source: "European Central Bank daily reference rates (via Frankfurter)",
      fetchedAt: new Date().toISOString()
    },
    200,
    `public, max-age=${BROWSER_CACHE_SECONDS}, s-maxage=${EDGE_CACHE_SECONDS}`
  );
  try {
    context.waitUntil(cache.put(cacheKey, response.clone()));
  } catch (error) {
    // Best-effort cache write; the response itself is still valid.
  }
  return response;
}
