import { eventInstantMs } from './_event-local-date.js';
import { validPreviousStartDate } from './_event-reschedule.js';

// Only verbatim names from the exact official event, never performers or venues.
export function organizerNames(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((name) => typeof name === 'string' && name.trim() && name.length <= 200 && !/[<>\r\n]|https?:\/\//i.test(name)).map((name) => name.trim()))];
}

export function eventEndDate(event) {
  const end = validPreviousStartDate(event?.end_datetime_iso);
  const start = eventInstantMs(event);
  return end.includes('T') && start !== null && Date.parse(end) > start ? end : '';
}

export function officialEventMetadata(data) {
  const names = organizerNames((Array.isArray(data?.promoters) && data.promoters.length ? data.promoters : [data?.promoter]).map((p) => p?.name));
  const end = eventEndDate({ datetime_iso: data?.dates?.start?.dateTime, end_datetime_iso: data?.dates?.end?.dateTime });
  return { ...(names.length ? { organizer_names: names } : {}), ...(end ? { end_datetime_iso: end } : {}) };
}
