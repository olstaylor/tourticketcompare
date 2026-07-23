import {
  loadEventsFromAssets,
  mapEventsToShows,
  attachApprovedMarketplacePrices,
  APPROVED_MARKETPLACE_PRICE_LANES
} from "./shows.js";

// On-site per-event price history (Phase 1). Read-only consumer of the
// immutable provider_pricing_history table written by the scheduled snapshot
// workflows. It renders NOTHING that the live price badge would not also show
// at the same moment: a provider's history series is returned only when that
// same provider currently passes the exact public price-display gate on this
// event (attachApprovedMarketplacePrices — verified provider link, approved
// source, matching valid URL, provider flags, finite price, fresh unexpired
// cache row). Per-provider only; providers are never merged or ranked, and no
// "lowest"/"cheapest" is ever computed. Each point is a past provider-supplied
// listed-price snapshot, framed as such per SAFE_PUBLISHING_RULES.md.

// How far back a series may reach. Bounds payload size and keeps stale-era
// snapshots out of the displayed trend.
const HISTORY_WINDOW_DAYS = 90;
// Hard cap on returned points per provider, newest kept. A busy lane snapshots
// a few times a day, so this covers the full window with headroom.
const MAX_POINTS_PER_PROVIDER = 240;
// A single observation is not a history. Require at least two points before a
// provider series is shown at all.
const MIN_POINTS_PER_PROVIDER = 2;

const SNAPSHOT_FRAMING =
  "Provider-supplied listed-price snapshots, not live inventory, availability, or final checkout totals. Fees, taxes, delivery and availability are controlled by the provider and may change.";

// Approved numeric-price lanes keyed by their public display name, mapping to
// the history table's `provider` column value and approved `source`. SeatGeek
// (no numeric lane) and Ticket Liquidator (price-disabled) never appear here,
// so they are structurally excluded from history, not merely flagged off.
const LANE_BY_DISPLAY_NAME = new Map(
  APPROVED_MARKETPLACE_PRICE_LANES.map((lane) => [lane.provider, lane])
);

function getPricingDb(env) {
  const candidate = env?.DEMAND_DB || env?.DB;
  return candidate && typeof candidate.prepare === "function" ? candidate : null;
}

function json(payload, status = 200, maxAgeSeconds = 300) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": `public, max-age=${maxAgeSeconds}`
    }
  });
}

// The public badge gate, as already applied by attachApprovedMarketplacePrices:
// a lane is displayable only when it resolved to an approved snapshot ("ok"
// with an approved source) whose cache row is still unexpired. Mirrors the
// client-side approved*PriceLane checks in public/app.js.
function displayableLane(priceLane) {
  if (!priceLane || priceLane.status !== "ok" || priceLane.providerStatus !== "ok") return null;
  if (typeof priceLane.source !== "string" || !priceLane.source) return null;
  const price = Number(priceLane.price);
  if (!Number.isFinite(price) || price < 0) return null;
  const currency = String(priceLane.currency || "").trim().toUpperCase();
  if (!/^[A-Z]{3}$/.test(currency)) return null;
  const expiresAtMs = Date.parse(String(priceLane.expiresAt || ""));
  if (!Number.isFinite(expiresAtMs) || expiresAtMs <= Date.now()) return null;
  return { currency, source: priceLane.source, price, observedAt: priceLane.fetchedAt || null };
}

async function fetchProviderSeries(db, eventId, dbKey, source, currency) {
  const since = new Date(Date.now() - HISTORY_WINDOW_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const result = await db
    .prepare(
      `SELECT low_price, currency, observed_at
       FROM provider_pricing_history
       WHERE event_id = ?1
         AND provider = ?2
         AND source = ?3
         AND currency = ?4
         AND observed_at >= ?5
       ORDER BY observed_at ASC`
    )
    .bind(eventId, dbKey, source, currency, since)
    .all();

  const rows = Array.isArray(result?.results) ? result.results : [];
  const points = [];
  for (const row of rows) {
    const price = Number(row?.low_price);
    const observedAt = String(row?.observed_at || "").trim();
    if (!Number.isFinite(price) || price < 0) continue;
    if (!Number.isFinite(Date.parse(observedAt))) continue;
    points.push({ price: Number(price.toFixed(2)), observedAt });
  }
  // Newest kept if the window is unusually dense.
  return points.length > MAX_POINTS_PER_PROVIDER
    ? points.slice(points.length - MAX_POINTS_PER_PROVIDER)
    : points;
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const showId = String(url.searchParams.get("showId") || "").trim();
  if (!showId) {
    return json({ ok: false, status: "missing_show_id", providers: [] }, 400, 0);
  }

  const db = getPricingDb(env);
  const empty = { ok: true, showId, generatedAt: new Date().toISOString(), framing: SNAPSHOT_FRAMING, providers: [] };
  if (!db) return json(empty);

  // Reuse the exact display path: load the reviewed event, then let
  // attachApprovedMarketplacePrices apply the public price-display gate. Past
  // or unknown events map to no show, so they return no history.
  const events = await loadEventsFromAssets(env);
  const show = mapEventsToShows(events).find((candidate) => String(candidate?.id || "") === showId);
  if (!show) return json(empty);

  let pricedShow = null;
  try {
    const priced = await attachApprovedMarketplacePrices([show], env);
    pricedShow = Array.isArray(priced) ? priced[0] : null;
  } catch (error) {
    return json(empty);
  }

  const lanes = Array.isArray(pricedShow?.prices) ? pricedShow.prices : [];
  const providers = [];
  for (const priceLane of lanes) {
    const laneConfig = LANE_BY_DISPLAY_NAME.get(priceLane?.provider);
    if (!laneConfig) continue; // not an approved numeric-price lane
    const gate = displayableLane(priceLane);
    if (!gate) continue; // provider is not showing a live badge on this event
    // The history source must be the same approved source the badge resolved
    // from — never a different lane's rows.
    if (gate.source !== laneConfig.approvedSource) continue;

    let points = [];
    try {
      points = await fetchProviderSeries(db, showId, laneConfig.dbKey, laneConfig.approvedSource, gate.currency);
    } catch (error) {
      points = [];
    }
    if (points.length < MIN_POINTS_PER_PROVIDER) continue;

    providers.push({
      provider: priceLane.provider,
      currency: gate.currency,
      windowDays: HISTORY_WINDOW_DAYS,
      points
    });
  }

  return json({
    ok: true,
    showId,
    generatedAt: new Date().toISOString(),
    framing: SNAPSHOT_FRAMING,
    providers
  });
}
