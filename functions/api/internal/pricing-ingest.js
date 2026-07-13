import { normalizeObservation } from "../../../scripts/pricing/core.mjs";

const MAX_BYTES = 512 * 1024;
const MAX_OBSERVATIONS = 500;
const PROVIDER_URL_FIELDS = {
  ticketmaster: "ticketmaster_url",
  seatgeek: "seatgeek_url",
  "vivid-seats": "vividseats_url"
};

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
}
function db(env) { return env?.DEMAND_DB && typeof env.DEMAND_DB.prepare === "function" ? env.DEMAND_DB : null; }
function authorized(request, env) {
  const expected = String(env?.PRICING_INGEST_TOKEN || "");
  const supplied = String(request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  return expected.length >= 24 && supplied.length === expected.length &&
    crypto.subtle.timingSafeEqual
      ? crypto.subtle.timingSafeEqual(new TextEncoder().encode(expected), new TextEncoder().encode(supplied))
      : expected === supplied;
}
async function eventsFromAssets(env) {
  try {
    const response = await env.ASSETS.fetch(new Request("https://assets.local/data/events.json"));
    const events = await response.json();
    return Array.isArray(events) ? events : [];
  } catch { return []; }
}
function validSource(event, observation) {
  const url = String(event?.[PROVIDER_URL_FIELDS[observation.provider]] || "");
  const link = event?.provider_links?.[observation.provider];
  return link?.verified === true && url === observation.sourceUrl;
}
function statementForObservation(database, row) {
  return database.prepare(`INSERT OR IGNORE INTO provider_price_observations
    (id,event_id,provider,currency,lowest_price_minor,price_type,includes_fees,checked_at,source_url,status)
    VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10)`).bind(
    row.id,row.eventId,row.provider,row.currency,row.lowestPriceMinor,row.priceType,
    row.includesFees == null ? null : Number(row.includesFees),row.checkedAt,row.sourceUrl,row.status
  );
}
function statementForCurrent(database, row) {
  if (row.status !== "available") return null;
  return database.prepare(`INSERT INTO provider_price_current
    (event_id,provider,currency,lowest_price_minor,price_type,includes_fees,checked_at,source_url,observation_id,updated_at)
    VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,CURRENT_TIMESTAMP)
    ON CONFLICT(event_id,provider) DO UPDATE SET
      currency=excluded.currency, lowest_price_minor=excluded.lowest_price_minor,
      price_type=excluded.price_type, includes_fees=excluded.includes_fees,
      checked_at=excluded.checked_at, source_url=excluded.source_url,
      observation_id=excluded.observation_id, updated_at=CURRENT_TIMESTAMP
    WHERE excluded.checked_at > provider_price_current.checked_at`).bind(
    row.eventId,row.provider,row.currency,row.lowestPriceMinor,row.priceType,
    row.includesFees == null ? null : Number(row.includesFees),row.checkedAt,row.sourceUrl,row.id
  );
}

export async function onRequestPost({ request, env }) {
  if (!authorized(request, env)) return json({ ok: false, status: "unauthorized" }, 401);
  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_BYTES) return json({ ok: false, status: "payload_too_large" }, 413);
  let body;
  try { body = await request.json(); } catch { return json({ ok: false, status: "invalid_json" }, 400); }
  if (!Array.isArray(body?.observations) || !body.observations.length || body.observations.length > MAX_OBSERVATIONS) {
    return json({ ok: false, status: "invalid_batch" }, 400);
  }
  const database = db(env);
  if (!database) return json({ ok: false, status: "storage_unavailable" }, 503);
  const events = await eventsFromAssets(env);
  const eventById = new Map(events.map((event) => [event?.id, event]));
  const normalized = body.observations.map(normalizeObservation);
  if (normalized.some((row) => !row)) return json({ ok: false, status: "invalid_observation" }, 400);
  const unique = new Map();
  for (const row of normalized) {
    const event = eventById.get(row.eventId);
    if (!event || !validSource(event, row)) return json({ ok: false, status: "event_or_source_not_verified", eventId: row.eventId }, 400);
    unique.set(row.id, row);
  }
  const statements = [];
  for (const row of unique.values()) {
    statements.push(statementForObservation(database, row));
    const current = statementForCurrent(database, row);
    if (current) statements.push(current);
  }
  try { await database.batch(statements); }
  catch (error) { return json({ ok: false, status: "write_failed" }, 503); }
  return json({ ok: true, accepted: unique.size, currentCandidates: [...unique.values()].filter((row) => row.status === "available").length });
}
