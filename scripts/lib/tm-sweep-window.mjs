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
// non-actionable evidence. So it does not need a call every day. It does still
// need one now and then: Ticketmaster can postpone or reschedule a date long
// after it has passed, and because the new-shows recogniser withholds any row
// whose Ticketmaster id already exists, these sweeps are the only path that can
// move such a row to its new date. So a long-past event is not dropped; it is
// re-checked on a fixed rotation, once every PAST_RECHECK_DAYS days.
//
// An event is "long past" only when BOTH hold:
//
//   - its date parses and lies more than PAST_GRACE_DAYS in the past; and
//   - it carries no stored `ticketmaster_status_code`. A held or rescheduled
//     date is exactly the one Ticketmaster may still move, so it is checked
//     every day however old its stored date is.
//
// Everything else (upcoming, recently past, unparseable, held) is fetched every
// run, exactly as before. The rotation is stateless and deterministic: an
// event's day comes from a hash of its id, so every run on the same UTC day
// agrees and the long-past set is spread evenly across the week.
//
// `TM_SWEEP_INCLUDE_PAST=1` (the repository variable of the same name, wired
// into the calling workflows) restores the full daily sweep. The scripts print
// how many events they skipped rather than hiding it.

export const PAST_GRACE_DAYS = 14;
export const PAST_RECHECK_DAYS = 7;
const DAY_MS = 24 * 60 * 60 * 1000;

function eventTimestamp(event) {
  const value = String(event?.datetime_iso ?? "").trim();
  if (!value) return Number.NaN;
  // A date-only value counts until the end of its calendar day.
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? Date.parse(`${value}T23:59:59Z`) : Date.parse(value);
}

/** Past the grace window with no stored Ticketmaster status. */
export function longPastEvent(event, now = Date.now(), graceDays = PAST_GRACE_DAYS) {
  if (String(event?.ticketmaster_status_code ?? "").trim()) return false;
  const at = eventTimestamp(event);
  return Number.isFinite(at) && at < now - graceDays * DAY_MS;
}

// 32-bit FNV-1a: synchronous, dependency-free and stable across runs.
function rotationSlot(id) {
  let hash = 0x811c9dc5;
  for (const char of String(id ?? "")) {
    hash ^= char.codePointAt(0);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash % PAST_RECHECK_DAYS;
}

/** True on the one UTC day in every PAST_RECHECK_DAYS that this event is re-checked. */
export function pastRecheckDue(event, now = Date.now()) {
  return rotationSlot(event?.id) === Math.floor(now / DAY_MS) % PAST_RECHECK_DAYS;
}

/** True when today's sweep may skip this event without losing a current finding. */
export function skipInSweep(event, now = Date.now(), { includePast = false } = {}) {
  if (includePast) return false;
  return longPastEvent(event, now) && !pastRecheckDue(event, now);
}

export function includePastFromEnv(env = process.env) {
  return String(env?.TM_SWEEP_INCLUDE_PAST ?? "").trim() === "1";
}
