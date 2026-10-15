import { eventInstantMs } from './_event-local-date.js';
import { validPreviousStartDate } from './_event-reschedule.js';

// Discovery also uses these fields for anonymous/internal account labels.
// They do not identify an organization; do not turn them into one.
const ORGANIZER_PLACEHOLDER = /^(?:PROMOTED BY VENUE|PROMOTER NOT DEFINED|MISCELLANEOUS PROMOTER|DO NOT USE|UNKNOWN|N\/A|NONE|TBA|TBD)$|(?:^|\s)PRICE\s+\d+$|OFFICIAL MAILING LIST|FOR ARTIST, TOUR, FESTIVAL AND PRESALE NEWS/i;

// Only verbatim names from the exact official event, never performers or venues.
export function organizerNames(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((name) => typeof name === 'string' && name.trim() && name.length <= 200 && !/[<>\r\n]|https?:\/\//i.test(name) && !ORGANIZER_PLACEHOLDER.test(name.trim().replace(/\s+/g, ' '))).map((name) => name.trim()))];
}

export function eventEndDate(event) {
  const end = validPreviousStartDate(event?.end_datetime_iso);
  const start = eventInstantMs(event);
  return end.includes('T') && start !== null && Date.parse(end) > start ? end : '';
}

export function officialEventMetadata(data) {
  const names = organizerNames((Array.isArray(data?.promoters) && data.promoters.length ? data.promoters : [data?.promoter]).map((p) => p?.name));
  // An estimated or time-TBA end is not an exact clock time. Older snapshots
  // lack these qualifiers, so wait for a fresh, explicitly precise response.
  const precise = data?.dates?.end?.approximate === false && data?.dates?.end?.noSpecificTime === false;
  const end = precise ? eventEndDate({ datetime_iso: data?.dates?.start?.dateTime, end_datetime_iso: data?.dates?.end?.dateTime }) : '';
  return { ...(names.length ? { organizer_names: names } : {}), ...(end ? { end_datetime_iso: end } : {}) };
}
