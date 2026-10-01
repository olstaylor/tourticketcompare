// Which tracked events a per-event Ticketmaster Discovery sweep re-fetches.
//
// The daily audit's drift check (scripts/audit-tm-events.mjs) and the nightly
// field-sync (scripts/apply-tm-updates.mjs) each spend one Discovery call per
// event, and both share one daily API quota with the new-shows lane, which runs
// last. On 2026-09-27 the two sweeps together spent it, and both Ticketmaster
// writers published nothing (docs/OPERATIONS.md -> Known incidents).
//
// A show that is well over can no longer gain or lose a ticket link, and both
// reports already file anything they find about one as historical,
// non-actionable evidence. So an event is skipped only when BOTH hold:
//
//   - its date parses and lies more than PAST_GRACE_DAYS in the past; and
//   - it carries no stored `ticketmaster_status_code`. A held or rescheduled
//     date is exactly the one Ticketmaster may still move into the future, so
//     it stays in the sweep however old its stored date is.
//
// Everything else (upcoming, recently past, unparseable, held) is still fetched,
// so the grace window keeps catching a just-finished date that Ticketmaster
// reschedules. `TM_SWEEP_INCLUDE_PAST=1` restores the full sweep for an archive
// audit; the scripts print how many events they skipped rather than hiding it.

export const PAST_GRACE_DAYS = 14;
const DAY_MS = 24 * 60 * 60 * 1000;

function eventTimestamp(event) {
  const value = String(event?.datetime_iso ?? "").trim();
  if (!value) return Number.NaN;
  // A date-only value counts until the end of its calendar day.
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? Date.parse(`${value}T23:59:59Z`) : Date.parse(value);
}

/** True when a sweep may skip this event without losing a current finding. */
export function longPastEvent(event, now = Date.now(), graceDays = PAST_GRACE_DAYS) {
  if (String(event?.ticketmaster_status_code ?? "").trim()) return false;
  const at = eventTimestamp(event);
  return Number.isFinite(at) && at < now - graceDays * DAY_MS;
}

export function includePastFromEnv(env = process.env) {
  return String(env?.TM_SWEEP_INCLUDE_PAST ?? "").trim() === "1";
}
