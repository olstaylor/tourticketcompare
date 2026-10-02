import { eventInstantMs } from "./event-local-date.mjs";
import { eventLifecycle, eventLifecycleHeld } from "../../functions/_route-indexability.js";
import { PRICE_TIMING_VERSION, PRICE_TIMING_SOURCES, PRICE_TIMING_COMPLETION_GRACE_MS, timingWindows } from "../../functions/_price-timing.js";

// Compact sufficient evidence: nearest valid price AND nearest attempted
// lookup per checkpoint/provider/revision. At most six rows per provider per
// schedule revision; unchanged prices are real observations and compete too.
// Schema is self-applying with the existing check import, as migration 0010 is.
export const PRICE_TIMING_SCHEMA_SQL = `CREATE TABLE IF NOT EXISTS event_price_timing_events (
  event_id TEXT PRIMARY KEY,
  artist_slug TEXT NOT NULL,
  country TEXT NOT NULL,
  event_start_at TEXT,
  lifecycle TEXT NOT NULL,
  schedule_revision INTEGER NOT NULL DEFAULT 1,
  metadata_at TEXT NOT NULL,
  completed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_price_timing_artist_country_completed
  ON event_price_timing_events(artist_slug, country, completed_at, event_id);
CREATE TABLE IF NOT EXISTS event_price_timing_checkpoints (
  event_id TEXT NOT NULL,
  schedule_revision INTEGER NOT NULL,
  event_start_at TEXT NOT NULL,
  provider TEXT NOT NULL,
  checkpoint TEXT NOT NULL,
  methodology_version INTEGER NOT NULL,
  observed_at TEXT,
  low_price REAL,
  currency TEXT,
  inventory_count INTEGER,
  source TEXT,
  external_id TEXT,
  price_distance_ms INTEGER,
  price_key TEXT,
  attempt_at TEXT NOT NULL,
  outcome TEXT NOT NULL,
  attempt_external_id TEXT NOT NULL,
  attempt_distance_ms INTEGER NOT NULL,
  attempt_key TEXT NOT NULL,
  PRIMARY KEY(event_id, schedule_revision, provider, checkpoint, methodology_version)
);`;

const literal = (value) => value == null ? "NULL" : typeof value === "number" ? String(value) : `'${String(value).replaceAll("'", "''")}'`;
const OUTCOMES = new Set(["priced", "no_price", "unusable", "failed", "incomplete"]);

export function withinFinalHours(event, now, hours) {
  const start = eventInstantMs(event);
  return Number.isFinite(start) && start > now.getTime() && start - now.getTime() <= hours * 3600000 && !eventLifecycleHeld(event);
}

export function prioritizeFinalHours(events, now, hours) {
  return events.filter((event) => withinFinalHours(event, now, hours))
    .sort((a, b) => eventInstantMs(a) - eventInstantMs(b) || String(a.id).localeCompare(String(b.id)));
}

export function timingObservation(event, provider, externalId, outcome, observedAt, price = null) {
  return {
    event, provider, externalId, outcome, observedAt: observedAt.toISOString(),
    lowPrice: price?.lowPrice ?? price?.price ?? null,
    currency: price?.currency ?? null, inventoryCount: price?.inventoryCount ?? null
  };
}

function metadataSql(events, metadataAt) {
  const unique = new Map(events.filter((e) => e?.id && e?.artist_slug).map((e) => [e.id, e]));
  const rows = [...unique.values()].map((event) => {
    const start = eventInstantMs(event), lifecycle = eventLifecycle(event);
    const complete = Number.isFinite(start) && !eventLifecycleHeld(event) && Date.parse(metadataAt) >= start + PRICE_TIMING_COMPLETION_GRACE_MS;
    return [event.id, event.artist_slug, event.country || "", Number.isFinite(start) ? new Date(start).toISOString() : null, lifecycle, metadataAt, complete ? metadataAt : null].map(literal).join(", ");
  });
  const sql = [];
  for (let i = 0; i < rows.length; i += 100) {
    sql.push(`INSERT INTO event_price_timing_events (event_id, artist_slug, country, event_start_at, lifecycle, metadata_at, completed_at)
VALUES ${rows.slice(i, i + 100).map((r) => `(${r})`).join(",\n")}
ON CONFLICT(event_id) DO UPDATE SET
  artist_slug=excluded.artist_slug, country=excluded.country, event_start_at=excluded.event_start_at,
  lifecycle=excluded.lifecycle, metadata_at=excluded.metadata_at,
  schedule_revision=event_price_timing_events.schedule_revision + CASE WHEN event_start_at IS NOT excluded.event_start_at OR lifecycle IS NOT excluded.lifecycle OR artist_slug IS NOT excluded.artist_slug OR country IS NOT excluded.country THEN 1 ELSE 0 END,
  completed_at=CASE WHEN event_start_at IS NOT excluded.event_start_at OR lifecycle IS NOT excluded.lifecycle THEN excluded.completed_at ELSE COALESCE(event_price_timing_events.completed_at, excluded.completed_at) END
WHERE excluded.metadata_at > event_price_timing_events.metadata_at AND (
  event_start_at IS NOT excluded.event_start_at OR lifecycle IS NOT excluded.lifecycle OR artist_slug IS NOT excluded.artist_slug OR country IS NOT excluded.country OR
  (event_price_timing_events.completed_at IS NULL AND excluded.completed_at IS NOT NULL));`);
  }
  return sql;
}

// Monotonic selection: distance, earlier capture time, then a canonical tuple
// key. Replaying identical evidence, or receiving it out of order, gives the
// same winner. An event schedule change creates a new revision, never rewrites
// an old revision's checkpoint evidence.
function better(prefix) {
  return `(excluded.${prefix}_distance_ms < ${prefix}_distance_ms OR
    (excluded.${prefix}_distance_ms = ${prefix}_distance_ms AND
      (excluded.${prefix === "price" ? "observed_at" : "attempt_at"} < ${prefix === "price" ? "observed_at" : "attempt_at"} OR
       (excluded.${prefix === "price" ? "observed_at" : "attempt_at"} = ${prefix === "price" ? "observed_at" : "attempt_at"} AND excluded.${prefix}_key < ${prefix}_key))))`;
}

export function buildPriceTimingSql({ events = [], observations = [], metadataAt }) {
  if (!Number.isFinite(Date.parse(metadataAt))) throw new Error("Price timing metadata requires a capture instant");
  const statements = [PRICE_TIMING_SCHEMA_SQL, ...metadataSql(events, metadataAt)];
  for (const observation of observations) {
    const { event, provider, externalId, outcome, observedAt, lowPrice, currency, inventoryCount } = observation;
    const source = PRICE_TIMING_SOURCES[provider], start = eventInstantMs(event);
    if (!source || !event?.id || event.provider_links?.[provider]?.verified !== true || !externalId || !OUTCOMES.has(outcome) || !Number.isFinite(start) || eventLifecycleHeld(event)) continue;
    const eventStartAt = new Date(start).toISOString();
    const valid = outcome === "priced" && typeof lowPrice === "number" && Number.isFinite(lowPrice) && lowPrice >= 10 && /^[A-Z]{3}$/.test(currency || "") && inventoryCount !== 0;
    const key = JSON.stringify([observedAt, source, externalId, outcome, lowPrice, currency, inventoryCount]);
    for (const { checkpoint, distanceMs } of timingWindows(eventStartAt, observedAt)) {
      const columns = ["observed_at", "low_price", "currency", "inventory_count", "source", "external_id", "price_distance_ms", "price_key", "attempt_at", "outcome", "attempt_external_id", "attempt_distance_ms", "attempt_key"];
      const values = [valid ? observedAt : null, valid ? lowPrice : null, valid ? currency : null, valid ? inventoryCount : null, valid ? source : null, valid ? externalId : null, valid ? distanceMs : null, valid ? key : null, observedAt, valid || outcome !== "priced" ? outcome : "unusable", externalId, distanceMs, key];
      const choosePrice = `(excluded.low_price IS NOT NULL AND (low_price IS NULL OR ${better("price")}))`;
      const assignments = columns.map((column, i) => `${column}=CASE WHEN ${i < 8 ? choosePrice : better("attempt")} THEN excluded.${column} ELSE ${column} END`);
      statements.push(`INSERT INTO event_price_timing_checkpoints (event_id, schedule_revision, event_start_at, provider, checkpoint, methodology_version, ${columns.join(", ")})
SELECT event_id, schedule_revision, event_start_at, ${literal(provider)}, ${literal(checkpoint)}, ${PRICE_TIMING_VERSION}, ${values.map(literal).join(", ")}
FROM event_price_timing_events WHERE event_id=${literal(event.id)} AND event_start_at=${literal(eventStartAt)} AND lifecycle=${literal(eventLifecycle(event))} AND metadata_at <= ${literal(observedAt)}
ON CONFLICT(event_id, schedule_revision, provider, checkpoint, methodology_version) DO UPDATE SET ${assignments.join(",\n")}
WHERE ${choosePrice} OR ${better("attempt")};`);
    }
  }
  return statements.join("\n");
}
