import { eventInstantMs } from "./_event-local-date.js";
import { eventLifecycle, EVENT_LIFECYCLE } from "./_route-indexability.js";

// Previous dates are recorded facts, never inferred from an event URL, its ID,
// or a typical tour schedule. Date-only records must stay date-only (time TBA).
export function validPreviousStartDate(value) {
  if (typeof value !== "string") return "";
  const iso = value.trim();
  // Keep this storage grammar aligned with validate-events.py. Both minute
  // and second precision, and colon/no-colon numeric offsets, are supported.
  if (!/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2}))?$/.test(iso)) return "";
  if (iso.includes("T") && (Number(iso.slice(11, 13)) > 23 || Number(iso.slice(14, 16)) > 59)) return "";
  const day = iso.slice(0, 10);
  const ms = Date.parse(iso);
  if (!Number.isFinite(ms) || new Date(`${day}T00:00:00Z`).toISOString().slice(0, 10) !== day) return "";
  return iso;
}

export function eventPreviousStartDate(event) {
  return eventLifecycle(event) === EVENT_LIFECYCLE.RESCHEDULED
    ? validPreviousStartDate(event?.previous_start_date)
    : "";
}

// Called only after the exact-identity, no-blockers Ticketmaster sync gate
// confirms a real date move. Resolve naive times through the OLD timezone,
// before the new venue/date/timezone is applied.
export function previousStartDateFromEvent(event) {
  const raw = String(event?.datetime_iso || "").trim();
  if (!validPreviousStartDate(raw.slice(0, 10))) return "";
  // An explicit offset already encodes the old venue's wall date. Converting
  // it to UTC would lose that date when there is no separate IANA timezone.
  if (validPreviousStartDate(raw)) return raw;
  const instant = eventInstantMs(event);
  return instant === null ? "" : validPreviousStartDate(new Date(instant).toISOString());
}
