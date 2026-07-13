const CURRENCY_BY_SYMBOL = Object.freeze({ "$": "USD", "£": "GBP", "€": "EUR" });

function clean(value, max = 2048) {
  return String(value ?? "").trim().slice(0, max);
}

function finitePositivePrice(value) {
  if (typeof value === "string") value = value.replaceAll(",", "").trim();
  const price = Number(value);
  return Number.isFinite(price) && price > 0 ? price : null;
}

function normalizeCurrency(value, symbol = "") {
  const explicit = clean(value, 8).toUpperCase();
  if (/^[A-Z]{3}$/.test(explicit)) return explicit;
  return CURRENCY_BY_SYMBOL[symbol] || "";
}

function normalizedUrl(value) {
  try {
    const parsed = new URL(value);
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return "";
  }
}

function sameUrl(left, right) {
  const a = normalizedUrl(left);
  const b = normalizedUrl(right);
  if (!a || !b) return false;
  const pa = new URL(a);
  const pb = new URL(b);
  pa.search = "";
  pb.search = "";
  return pa.toString().replace(/\/$/, "") === pb.toString().replace(/\/$/, "");
}

function jsonScripts(html) {
  const scripts = [];
  const pattern = /<script\b[^>]*(?:type=["']application\/(?:ld\+)?json["']|id=["']__NEXT_DATA__["'])[^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of String(html || "").matchAll(pattern)) {
    const raw = match[1].trim();
    if (!raw) continue;
    try {
      scripts.push(JSON.parse(raw));
    } catch {
      // A malformed data block cannot support a confident price.
    }
  }
  return scripts;
}

function typesOf(value) {
  return (Array.isArray(value) ? value : [value]).map((item) => clean(item, 80).toLowerCase());
}

function addCandidate(candidates, price, currency, priority, evidence) {
  const normalizedPrice = finitePositivePrice(price);
  const normalizedCurrency = normalizeCurrency(currency);
  if (normalizedPrice === null || !normalizedCurrency) return;
  candidates.push({ price: normalizedPrice, currency: normalizedCurrency, priority, evidence });
}

function collectOfferCandidates(node, options, candidates) {
  if (!node || typeof node !== "object") return;
  const nodes = Array.isArray(node) ? node : [node];
  for (const item of nodes) {
    if (!item || typeof item !== "object") continue;
    const types = typesOf(item["@type"]);
    const nodeUrl = clean(item.url, 2048);
    const exactEvent = objectMentionsEventId(item, options.eventId) ||
      Boolean(options.eventId && nodeUrl.toLowerCase().includes(clean(options.eventId, 120).toLowerCase()));
    if (exactEvent && types.some((type) => type === "event" || type === "musicevent" || type.endsWith("event"))) {
      const offers = Array.isArray(item.offers) ? item.offers : [item.offers];
      for (const offer of offers) {
        if (!offer || typeof offer !== "object") continue;
        addCandidate(candidates, offer.lowPrice ?? offer.price, offer.priceCurrency, 0, "json_ld_event_offer");
      }
    }
    for (const value of Object.values(item)) collectOfferCandidates(value, options, candidates);
  }
}

function objectEventIdentifiers(node) {
  if (!node || typeof node !== "object") return [];
  return [node.id, node.eventId, node.event_id, node.eventID]
    .map((value) => clean(value, 120).toLowerCase())
    .filter(Boolean);
}

function objectMentionsEventId(node, eventId) {
  if (!eventId) return false;
  return objectEventIdentifiers(node).includes(clean(eventId, 120).toLowerCase());
}

function collectHydrationCandidates(node, options, candidates, inheritedMatch = false, seen = new Set()) {
  if (!node || typeof node !== "object" || seen.has(node)) return;
  seen.add(node);
  if (Array.isArray(node)) {
    for (const value of node) collectHydrationCandidates(value, options, candidates, inheritedMatch, seen);
    return;
  }

  const ownIdentifiers = objectEventIdentifiers(node);
  const exactEvent = ownIdentifiers.length
    ? objectMentionsEventId(node, options.eventId)
    : inheritedMatch;
  if (exactEvent) {
    const currency = node.currency ?? node.currencyCode ?? node.currency_code ?? node.priceCurrency;
    for (const key of options.lowestKeys || []) {
      if (Object.hasOwn(node, key)) addCandidate(candidates, node[key], currency, 1, `exact_event_${key}`);
    }
    const ranges = Array.isArray(node.priceRanges) ? node.priceRanges : [];
    for (const range of ranges) {
      addCandidate(candidates, range?.min, range?.currency ?? currency, 1, "exact_event_price_range");
    }
  }

  for (const [key, value] of Object.entries(node)) {
    if (/recommend|related|similar|suggest/i.test(key)) continue;
    collectHydrationCandidates(value, options, candidates, exactEvent, seen);
  }
}

function collectVisibleFromCandidates(html, candidates) {
  const text = String(html || "")
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&pound;|&#163;/gi, "£")
    .replace(/&euro;|&#8364;/gi, "€")
    .replace(/&dollar;|&#36;/gi, "$")
    .replace(/\s+/g, " ");
  const pattern = /(?:tickets?|prices?)\s+(?:start(?:ing)?\s+)?(?:from|at)\s+(?:(USD|GBP|EUR|CAD|AUD)\s*)?([$£€])?\s*(\d{1,3}(?:,\d{3})+(?:\.\d{1,2})?|\d{1,6}(?:\.\d{1,2})?)/gi;
  for (const match of text.matchAll(pattern)) {
    const currency = normalizeCurrency(match[1], match[2]);
    addCandidate(candidates, match[3], currency, 2, "visible_tickets_from_text");
  }
}

export function parseAuthorizedLowestPrice(html, options = {}) {
  const candidates = [];
  const scripts = jsonScripts(html);
  for (const payload of scripts) {
    collectOfferCandidates(payload, options, candidates);
    collectHydrationCandidates(payload, options, candidates);
  }
  collectVisibleFromCandidates(html, candidates);
  if (!candidates.length) return { ok: false, reason: "pricing_unavailable" };

  const bestPriority = Math.min(...candidates.map((candidate) => candidate.priority));
  const best = candidates.filter((candidate) => candidate.priority === bestPriority);
  const currencies = [...new Set(best.map((candidate) => candidate.currency))];
  if (currencies.length !== 1) return { ok: false, reason: "ambiguous_currency" };
  if (bestPriority === 2 && new Set(best.map((candidate) => candidate.price)).size !== 1) {
    return { ok: false, reason: "ambiguous_visible_price" };
  }
  const price = Math.min(...best.map((candidate) => candidate.price));
  if (!Number.isFinite(price) || price <= 0) return { ok: false, reason: "malformed_price" };
  return {
    ok: true,
    price,
    currency: currencies[0],
    evidence: [...new Set(best.filter((candidate) => candidate.price === price).map((candidate) => candidate.evidence))].sort()
  };
}

export function detectAccessBarrier({ status = 0, html = "", finalUrl = "" } = {}) {
  if (status === 401) return "login_wall";
  if (status === 403) return "http_403_block";
  if (status === 429) return "http_429_rate_limit";
  const body = String(html || "").slice(0, 500000).toLowerCase();
  if (/verify (?:that )?you are human|complete the (?:security )?check|cf-chl-(?:captcha|challenge)|<(?:iframe|div)[^>]+(?:hcaptcha|recaptcha)|(?:id|class)=["'][^"']*captcha/i.test(body)) {
    return "captcha";
  }
  if (/access denied|request blocked|unusual traffic|automated access/i.test(body)) {
    return "access_block";
  }
  try {
    const path = new URL(finalUrl).pathname.toLowerCase();
    if (/\/(?:login|log-in|signin|sign-in|auth)(?:\/|$)/.test(path)) return "login_wall";
  } catch {
    // Invalid final URLs are handled separately by the provider URL validator.
  }
  if (/<title[^>]*>[^<]*(?:sign in|log in|authentication required)[^<]*<\/title>/i.test(body)) {
    return "login_wall";
  }
  return "";
}

export { clean, finitePositivePrice, normalizeCurrency, sameUrl };
