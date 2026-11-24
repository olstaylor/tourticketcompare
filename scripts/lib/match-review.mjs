// Human-review queue for ambiguous provider matches. Read-only: reads the sync
// logs in reports/provider-sync and the reviewed events, and lists what the
// matchers withheld. It never writes a link and never changes events.json.
export const REPORTS = [
  { file: "vividseats-cta-sync.md", provider: "vivid-seats", label: "Vivid Seats" },
  { file: "ticketnetwork-event-sync.md", provider: "ticketnetwork", label: "TicketNetwork" },
  { file: "ticket-liquidator-event-sync.md", provider: "ticket-liquidator", label: "Ticket Liquidator" },
  { file: "stubhub-international-event-sync.md", provider: "stubhub-international", label: "StubHub International" }
];
export const DECISIONS = new Set(["approved_match", "rejected"]);

// Rows of a sync log table: | showId | artist | action | id | url | notes |
export function parseSyncRows(markdown) {
  const rows = [];
  for (const line of String(markdown).split("\n")) {
    if (!line.startsWith("| tm-") && !/^\| [a-z0-9]/.test(line)) continue;
    const cells = line.replace(/^\| /, "").replace(/ \|$/, "").split(" | ");
    if (cells.length < 6 || cells[0] === "showId" || cells[0].startsWith("---")) continue;
    const [showId, artist, action, listingId, url, ...notes] = cells;
    rows.push({ showId, artist, action, listingId, url, note: notes.join(" | ") });
  }
  return rows;
}

// Why a row is withheld, or null when it is not a review case. Exact matches
// (add/verify/refresh/correct), plain "no listing", incomplete catalogs and API
// failures are never queued: they are not evidence of a candidate.
export function reviewReason(row) {
  const note = row.note || "";
  if (/not checked|incomplete|transient|error/i.test(note) && !/^ambiguous/.test(note)) return null;
  if (row.action === "conflict" || /^ambiguous/.test(note)) {
    return /start evidence|start time/.test(note) ? "ambiguous: no performance start time to tell listings apart" : "ambiguous: several qualifying listings";
  }
  return null;
}

export function candidatesOf(note) {
  const at = note.indexOf("candidates:");
  return at < 0 ? [] : note.slice(at + "candidates:".length).split(/,\s(?=https?:|\d{5,}\s@)/).map((s) => s.trim()).filter(Boolean);
}

const hasVerified = (event, provider) => event.provider_links?.[provider]?.verified === true && Boolean(event.provider_links[provider].url);

export function buildQueue({ reports, events, decisions = [], now = new Date(0) }) {
  const byId = new Map(events.map((e) => [e.id, e]));
  const decided = new Map(decisions.map((d) => [`${d.provider}|${d.show_id}`, d]));
  const open = []; const resolved = []; const skipped = { already_verified: 0, not_upcoming_or_unknown: 0 };
  const seen = new Set();
  for (const { provider, label, markdown } of reports) {
    for (const row of parseSyncRows(markdown)) {
      const reason = reviewReason(row);
      if (!reason) continue;
      const key = `${provider}|${row.showId}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const event = byId.get(row.showId);
      if (!event || !(Date.parse(event.datetime_iso) >= now.getTime()) || ["cancelled", "postponed"].includes(event.status)) { skipped.not_upcoming_or_unknown += 1; continue; }
      if (hasVerified(event, provider)) { skipped.already_verified += 1; continue; }
      const item = { show_id: row.showId, provider, provider_label: label, artist: event.artist_name || row.artist, venue: event.venue || "", city: event.city || "", date: String(event.datetime_iso || "").slice(0, 10), reason, candidates: candidatesOf(row.note) };
      const decision = decided.get(key);
      if (decision && DECISIONS.has(decision.decision)) resolved.push({ ...item, decision: decision.decision, reviewed_at: decision.reviewed_at || "" });
      else open.push(item);
    }
  }
  const cmp = (a, b) => a.artist.localeCompare(b.artist) || a.date.localeCompare(b.date) || a.provider.localeCompare(b.provider) || a.show_id.localeCompare(b.show_id);
  open.sort(cmp); resolved.sort(cmp);
  const orphan = decisions.filter((d) => !seen.has(`${d.provider}|${d.show_id}`)).map((d) => ({ show_id: d.show_id, provider: d.provider, decision: d.decision }));
  return { open, resolved, orphan_decisions: orphan, skipped };
}

export function renderQueue(queue) {
  const lines = ["# Provider match review queue", "",
    "Written by `scripts/report-match-review.mjs` from the provider sync logs. Read-only: nothing here is published. Decisions go in `data/match-review-decisions.json`; an `approved_match` is applied only by a separate reviewed change through the verified-write path.", "",
    `- Open (withheld, awaiting a human): ${queue.open.length}`, `- Decided: ${queue.resolved.length}`, `- Skipped, already verified on that provider: ${queue.skipped.already_verified}`, `- Skipped, past/cancelled/unknown show: ${queue.skipped.not_upcoming_or_unknown}`, `- Decisions that match no current case: ${queue.orphan_decisions.length}`, ""];
  const table = (items, extra) => { lines.push(`| Show | Artist | Date | City | Venue | Provider | Reason | Candidates${extra ? " | Decision" : ""} |`, `| --- | --- | --- | --- | --- | --- | --- | ---${extra ? " | ---" : ""} |`);
    for (const i of items) lines.push(`| ${i.show_id} | ${i.artist} | ${i.date} | ${i.city} | ${i.venue} | ${i.provider_label} | ${i.reason} | ${i.candidates.join("<br>") || "-"}${extra ? ` | ${i.decision}` : ""} |`); lines.push(""); };
  lines.push("## Open", ""); queue.open.length ? table(queue.open, false) : lines.push("None.", "");
  lines.push("## Decided", ""); queue.resolved.length ? table(queue.resolved, true) : lines.push("None.", "");
  return `${lines.join("\n")}\n`;
}
