const MAX_BYTES = 512 * 1024;
const MAX_OBSERVATIONS = 500;
const PROVIDERS = new Set(["ticketmaster", "seatgeek", "vivid-seats"]);
const STATUSES = new Set(["available", "sold_out", "unavailable", "blocked", "extractor_error"]);
const PRICE_TYPES = new Set(["displayed_from", "listing_minimum", "api"]);
const PROVIDER_URL_FIELDS = { ticketmaster: "ticketmaster_url", seatgeek: "seatgeek_url", "vivid-seats": "vividseats_url" };

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
}
function db(env) { return env?.DEMAND_DB && typeof env.DEMAND_DB.prepare === "function" ? env.DEMAND_DB : null; }
function stableId(value) {
  let hash = 2166136261;
  for (const char of value) { hash ^= char.charCodeAt(0); hash = Math.imul(hash, 16777619); }
  return "obs_" + (hash >>> 0).toString(16);
}
function normalizeObservation(input) {
  const eventId = String(input?.eventId || "").trim();
  const provider = String(input?.provider || "").toLowerCase();
  const currency = String(input?.currency || "").toUpperCase();
  const status = String(input?.status || "").toLowerCase();
  const priceType = String(input?.priceType || "");
  const sourceUrl = String(input?.sourceUrl || "").trim();
  const checkedMs = Date.parse(String(input?.checkedAt || ""));
  const lowestPriceMinor = input?.lowestPriceMinor == null ? null : Number(input.lowestPriceMinor);
  if (!eventId || !PROVIDERS.has(provider) || !STATUSES.has(status) || !PRICE_TYPES.has(priceType) || !/^[A-Z]{3}$/.test(currency) || !sourceUrl || !Number.isFinite(checkedMs)) return null;
  if (status === "available" && (!Number.isInteger(lowestPriceMinor) || lowestPriceMinor < 0)) return null;
  if (status !== "available" && lowestPriceMinor !== null) return null;
  const checkedAt = new Date(checkedMs).toISOString();
  const includesFees = input.includesFees == null ? null : Boolean(input.includesFees);
  return { eventId, provider, currency, lowestPriceMinor, priceType, includesFees, checkedAt, sourceUrl, status,
    id: stableId([eventId, provider, checkedAt, status, lowestPriceMinor ?? "", sourceUrl].join("\u0000")) };
}
function authorized(request, env) {
  const expected = String(env?.PRICING_INGEST_TOKEN || "");
  const supplied = String(request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (expected.length < 24 || supplied.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i += 1) mismatch |= expected.charCodeAt(i) ^ supplied.charCodeAt(i);
  return mismatch === 0;
}
async function eventsFromAssets(env) {
  try {
    const response = await env.ASSETS.fetch(new Request("https://assets.local/data/events.json"));
    const events = await response.json();
    return Array.isArray(events) ? events : [];
  } catch { return []; }
}
function validSource(event, observation) {
  return event?.provider_links?.[observation.provider]?.verified === true &&
    String(event?.[PROVIDER_URL_FIELDS[observation.provider]] || "") === observation.sourceUrl;
}
function statementForObservation(database, row) {
  return database.prepare(`INSERT OR IGNORE INTO provider_price_observations
    (id,event_id,provider,currency,lowest_price_minor,price_type,includes_fees,checked_at,source_url,status)
    VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10)`).bind(row.id,row.eventId,row.provider,row.currency,row.lowestPriceMinor,row.priceType,row.includesFees == null ? null : Number(row.includesFees),row.checkedAt,row.sourceUrl,row.status);
}
function statementForCurrent(database, row) {
  if (row.status !== "available") return null;
  return database.prepare(`INSERT INTO provider_price_current
    (event_id,provider,currency,lowest_price_minor,price_type,includes_fees,checked_at,source_url,observation_id,updated_at)
    VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,CURRENT_TIMESTAMP)
    ON CONFLICT(event_id,provider) DO UPDATE SET currency=excluded.currency,lowest_price_minor=excluded.lowest_price_minor,
      price_type=excluded.price_type,includes_fees=excluded.includes_fees,checked_at=excluded.checked_at,
      source_url=excluded.source_url,observation_id=excluded.observation_id,updated_at=CURRENT_TIMESTAMP
    WHERE excluded.checked_at > provider_price_current.checked_at`).bind(row.eventId,row.provider,row.currency,row.lowestPriceMinor,row.priceType,row.includesFees == null ? null : Number(row.includesFees),row.checkedAt,row.sourceUrl,row.id);
}
export async function onRequestPost({ request, env }) {
  if (!authorized(request, env)) return json({ ok: false, status: "unauthorized" }, 401);
  if (Number(request.headers.get("content-length") || 0) > MAX_BYTES) return json({ ok: false, status: "payload_too_large" }, 413);
  let body; try { body = await request.json(); } catch { return json({ ok: false, status: "invalid_json" }, 400); }
  if (!Array.isArray(body?.observations) || !body.observations.length || body.observations.length > MAX_OBSERVATIONS) return json({ ok: false, status: "invalid_batch" }, 400);
  const database = db(env); if (!database) return json({ ok: false, status: "storage_unavailable" }, 503);
  const eventById = new Map((await eventsFromAssets(env)).map((event) => [event?.id, event]));
  const unique = new Map();
  for (const input of body.observations) {
    const row = normalizeObservation(input);
    if (!row) return json({ ok: false, status: "invalid_observation" }, 400);
    if (!eventById.has(row.eventId) || !validSource(eventById.get(row.eventId), row)) return json({ ok: false, status: "event_or_source_not_verified", eventId: row.eventId }, 400);
    unique.set(row.id, row);
  }
  const statements = [];
  for (const row of unique.values()) { statements.push(statementForObservation(database, row)); const current = statementForCurrent(database, row); if (current) statements.push(current); }
  try { await database.batch(statements); } catch { return json({ ok: false, status: "write_failed" }, 503); }
  return json({ ok: true, accepted: unique.size, currentCandidates: [...unique.values()].filter((row) => row.status === "available").length });
}
