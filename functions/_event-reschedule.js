import { eventInstantMs } from "./_event-local-date.js";
import { eventLifecycle, EVENT_LIFECYCLE } from "./_route-indexability.js";

// Previous dates are recorded facts, never inferred from an event URL, its ID,
// or a typical tour schedule. Date-only records must stay date-only (time TBA).
export function validPreviousStartDate(value) {
  if (typeof value !== "string") return "";
  const iso = value.trim();
  if (!/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))?$/.test(iso)) return "";
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
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return validPreviousStartDate(raw);
  const instant = eventInstantMs(event);
  return instant === null ? "" : validPreviousStartDate(new Date(instant).toISOString());
}
