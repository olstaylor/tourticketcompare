// Which /api/out redirects count as people.
//
// Most redirect receipts are automated: in 1-9 Oct 2026 a crawler rotating
// stock browser user agents and residential IPs produced ~95% of
// `outbound_click` rows. It requests /api/out directly and never loads a page,
// so isLikelyBot (user-agent tokens) cannot see it.
//
// A redirect counts as a person's click when the same anonymous visitor key
// (the IP+UA hash, `request_key`) also sent a browser-side event: those beacons
// only fire after a TTC page has run its JavaScript. This is the counting basis
// for every click and conversion figure in the reports. It can miss a real
// visitor with JavaScript off, or one whose IP changed between page and click,
// so it is a slight undercount, never an inflation.
export const PAGE_EVIDENCE_EVENTS = [
  "page_view",
  "artist_view",
  "event_view",
  "provider_cta_view",
  "provider_click",
  "web_vitals"
];

const EVENT_LIST = PAGE_EVIDENCE_EVENTS.map((name) => `'${name}'`).join(", ");

// SQL predicate: true when the row's visitor also loaded a TTC page. Pass the
// table alias when the outer query uses one.
export function pageBackedSql(alias = "") {
  const column = alias ? `${alias}.request_key` : "request_key";
  return `${column} IN (SELECT seen.request_key FROM analytics_events seen WHERE seen.event_name IN (${EVENT_LIST}) AND seen.request_key IS NOT NULL)`;
}

// SQL predicate for a person's redirect: an outbound_click backed by a page.
export function humanRedirectSql(alias = "") {
  const name = alias ? `${alias}.event_name` : "event_name";
  return `${name} = 'outbound_click' AND ${pageBackedSql(alias)}`;
}
