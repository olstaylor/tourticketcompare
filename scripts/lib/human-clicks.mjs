// Which /api/out redirects reports count: page-backed redirects.
//
// Most redirect receipts are automated: in 1-9 Oct 2026 a crawler rotating
// stock browser user agents and residential IPs produced ~95% of
// `outbound_click` rows. It requests /api/out directly and never loads a page,
// so isLikelyBot (user-agent tokens) cannot see it.
//
// A redirect is page-backed when the same anonymous visitor key (the IP+UA
// hash, `request_key`) also sent a browser-side event that day. Those beacons
// normally fire only after a TTC page has run its JavaScript, which the direct
// crawler never does. Page-backed is not proof of a person: /api/analytics is
// public, so automation that runs page scripts or posts beacons still passes.
// It also misses real visitors with JavaScript off, a lost beacon, or an IP
// change between page and click, so unmatched redirects are "without page
// evidence", not proven automated.
export const PAGE_EVIDENCE_EVENTS = [
  "page_view",
  "artist_view",
  "event_view",
  "provider_cta_view",
  "provider_click",
  "web_vitals"
];

const EVENT_LIST = PAGE_EVIDENCE_EVENTS.map((name) => `'${name}'`).join(", ");

// SQL predicate: true when the row's visitor sent a browser event on the same
// UTC day. Scoping to the visitor-day keeps unrelated page activity from the
// same IP+UA on another day from qualifying a crawler hit, and keeps a rerun
// of an old window stable. Pass the table alias when the outer query uses one.
export function pageBackedSql(alias = "") {
  const prefix = alias ? `${alias}.` : "";
  return `(${prefix}request_key || '|' || substr(${prefix}created_at, 1, 10)) IN (SELECT seen.request_key || '|' || substr(seen.created_at, 1, 10) FROM analytics_events seen WHERE seen.event_name IN (${EVENT_LIST}) AND seen.request_key IS NOT NULL)`;
}

// SQL predicate for a page-backed redirect: an outbound_click with page
// evidence from the same visitor-day.
export function humanRedirectSql(alias = "") {
  const name = alias ? `${alias}.event_name` : "event_name";
  return `${name} = 'outbound_click' AND ${pageBackedSql(alias)}`;
}
