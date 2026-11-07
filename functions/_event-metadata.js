import { eventInstantMs } from './_event-local-date.js';
import { validPreviousStartDate } from './_event-reschedule.js';

// Discovery also uses these fields for anonymous/internal account labels.
// They do not identify an organization; do not turn them into one.
const ORGANIZER_PLACEHOLDER = /^(?:PROMOTED BY VENUE|PROMOTER NOT DEFINED|MISCELLANEOUS PROMOTER|DO NOT USE|UNKNOWN|N\/A|NONE|TBA|TBD)$|(?:^|\s)PRICE\s+\d+$|OFFICIAL MAILING LIST|FOR ARTIST, TOUR, FESTIVAL AND PRESALE NEWS/i;

// Only verbatim names from the exact official event, never performers or venues.
const identityKey = (value) => typeof value === 'string'
  ? value.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '') : '';

export function organizerNames(value, identities = []) {
  if (!Array.isArray(value)) return [];
  const ambiguous = new Set(identities.map(identityKey).filter(Boolean));
  return [...new Set(value.filter((name) => typeof name === 'string' && name.trim() && name.length <= 200 && !/[<>\r\n]|https?:\/\//i.test(name) && !ORGANIZER_PLACEHOLDER.test(name.trim().replace(/\s+/g, ' ')) && !ambiguous.has(identityKey(name))).map((name) => name.trim()))];
}

export function eventEndDate(event) {
  const end = validPreviousStartDate(event?.end_datetime_iso);
  const start = eventInstantMs(event);
  return end.includes('T') && start !== null && Date.parse(end) > start ? end : '';
}

export function officialEventMetadata(data, event = {}) {
  const sourceNames = (records) => Array.isArray(records) ? records.map((record) => record?.name) : [];
  const names = organizerNames((Array.isArray(data?.promoters) && data.promoters.length ? data.promoters : [data?.promoter]).map((p) => p?.name), [
    event.artist_name, event.venue,
    ...sourceNames(data?._embedded?.attractions), ...sourceNames(data?._embedded?.venues)
  ]);
  // An estimated or time-TBA end is not an exact clock time. Older snapshots
  // lack these qualifiers, so wait for a fresh, explicitly precise response.
  const precise = data?.dates?.end?.approximate === false && data?.dates?.end?.noSpecificTime === false;
  const end = precise ? eventEndDate({ datetime_iso: data?.dates?.start?.dateTime, end_datetime_iso: data?.dates?.end?.dateTime }) : '';
  return { ...(names.length ? { organizer_names: names } : {}), ...(end ? { end_datetime_iso: end } : {}), ...buyingFacts(data) };
}

// Ticketmaster's per-event ticket limit is free text ("There is a 4 Ticket
// Limit on this event"). Only a text that states exactly one limit becomes a
// number; a text naming several limits (a presale with its own cap, say) or
// none is not a limit we can state, so nothing is stored.
const LIMIT_PATTERNS = [
  /ticket limit of (\d{1,3})\b/gi,
  /\b(\d{1,3})[ -]ticket limit\b/gi,
  /\blimit(?:ed)? (?:of |to )?(\d{1,3}) tickets?\b/gi,
  /\b(\d{1,3}) tickets? per (?:person|customer|household|account|order|transaction)\b/gi
];
export const TICKET_LIMIT_MAX = 50;
export function ticketLimitFromText(info) {
  if (typeof info !== 'string' || !info.trim() || info.length > 2000) return null;
  const found = new Set();
  for (const pattern of LIMIT_PATTERNS) for (const match of info.matchAll(pattern)) found.add(Number(match[1]));
  if (found.size !== 1) return null;
  const [limit] = found;
  return Number.isInteger(limit) && limit >= 1 && limit <= TICKET_LIMIT_MAX ? limit : null;
}

export function validTicketLimit(value) {
  return Number.isInteger(value) && value >= 1 && value <= TICKET_LIMIT_MAX ? value : null;
}

// Ticketmaster classifications use these as placeholders, not genres.
const GENRE_PLACEHOLDER = /^(?:undefined|other|miscellaneous|n\/a|none|tba|tbd)$/i;
export function validGenre(value) {
  if (typeof value !== 'string') return '';
  const genre = value.trim().replace(/\s+/g, ' ');
  return genre && genre.length <= 40 && /^[\p{L}\p{N} &'\/.,-]+$/u.test(genre) && !GENRE_PLACEHOLDER.test(genre) ? genre : '';
}

// The music genre of the event's primary classification, verbatim.
export function genreFromClassifications(list) {
  if (!Array.isArray(list)) return '';
  const primary = list.filter((c) => c?.primary === true);
  const pick = primary.length === 1 ? primary[0] : (list.length === 1 ? list[0] : null);
  if (!pick || String(pick.segment?.name || '').trim().toLowerCase() !== 'music') return '';
  return validGenre(pick.genre?.name);
}

// Buying facts from this exact event's Discovery record (owner pick
// 2026-11-06): the stated ticket limit, a legal-age flag and the genre. A key
// is returned only when the response carries the source field, so an older
// snapshot without it never erases a stored fact; a response that carries the
// field without a usable value clears it (null). legalAgeEnforced=false is not
// proof of an all-ages show, so only an explicit true is stored.
export function buyingFacts(data) {
  const out = {};
  if (object(data?.ticketLimit)) out.ticket_limit = ticketLimitFromText(data.ticketLimit.info);
  if (object(data?.ageRestrictions)) out.legal_age_enforced = data.ageRestrictions.legalAgeEnforced === true ? true : null;
  if (Array.isArray(data?.classifications)) out.genre = genreFromClassifications(data.classifications) || null;
  return out;
}
const object = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
