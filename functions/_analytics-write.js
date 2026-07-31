// Schema-tolerant writer for analytics_events.
//
// The table has grown in three steps: the original nine columns (0001), the
// click fields (0002), and the commercial funnel dimensions (0008). Cloudflare
// Pages deploys code and D1 migrations independently, so a writer that assumed
// the widest schema would throw on every insert until the migration landed —
// and click tracking must never be the reason a redirect or a beacon fails.
//
// Inserts are therefore attempted widest-first and fall back one tier at a
// time. Older deployments used the same pattern inline; this centralises it so
// `/api/analytics` and `/api/out` cannot drift apart.

const BASE_COLUMNS = Object.freeze([
  "created_at",
  "event_name",
  "source_path",
  "artist_slug",
  "email",
  "request_key",
  "referrer",
  "user_agent",
  "metadata_json"
]);

const CLICK_COLUMNS = Object.freeze(["provider", "tour_slug", "destination_host", "link_id"]);

const FUNNEL_COLUMNS = Object.freeze([
  "page_type",
  "landing_path",
  "event_id",
  "event_date",
  "event_city",
  "event_venue",
  "cta_location",
  "destination_category",
  "is_affiliate",
  "device_category",
  "acquisition_source",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "click_id"
]);

// Widest first. Every entry is a compile-time constant, so no caller-supplied
// string ever reaches the SQL text.
export const COLUMN_TIERS = Object.freeze([
  Object.freeze([...BASE_COLUMNS, ...CLICK_COLUMNS, ...FUNNEL_COLUMNS]),
  Object.freeze([...BASE_COLUMNS, ...CLICK_COLUMNS]),
  BASE_COLUMNS
]);

export function buildInsertSql(columns) {
  const placeholders = columns.map((_, index) => `?${index + 1}`).join(", ");
  return `INSERT INTO analytics_events (${columns.join(", ")}) VALUES (${placeholders})`;
}

// Normalises a value for D1: undefined becomes NULL, booleans become 0/1 so the
// `is_affiliate` INTEGER column round-trips predictably.
export function bindValue(value) {
  if (value === undefined || value === "") return value === "" ? null : null;
  if (typeof value === "boolean") return value ? 1 : 0;
  return value;
}

export async function insertAnalyticsRow(db, row) {
  if (!db || typeof db.prepare !== "function") return { ok: false, tier: -1 };
  for (let tier = 0; tier < COLUMN_TIERS.length; tier += 1) {
    const columns = COLUMN_TIERS[tier];
    try {
      await db
        .prepare(buildInsertSql(columns))
        .bind(...columns.map((column) => bindValue(row?.[column])))
        .run();
      return { ok: true, tier };
    } catch (error) {
      // Fall through to the next-narrower tier. A failure on the narrowest tier
      // is swallowed by the caller: analytics must never break the response.
    }
  }
  return { ok: false, tier: -1 };
}
