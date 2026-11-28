// "Alert me below X": finds shows whose latest listed price on one ticket site
// is at or below a subscriber's target. Pure: callers pass rows, events,
// artists and `now`.
//
// Same gates as the drop detector (detectPriceDrops): one show, one site, one
// currency, newest reading within 30 hours, plausible price, show still
// upcoming and not held, artist page indexable. The result carries the same
// fields as a drop so one email builder serves both; `from` is the reading
// 6-8 days earlier when there is one (else null, and the email says so).

import { isUpcomingShow } from "../../functions/_upcoming.js";
import { eventLocalDateIso } from "../../functions/_event-local-date.js";
import { eventLifecycleHeld } from "../../functions/_route-indexability.js";
import { artistPageIndexable } from "../../functions/_artist-indexability.js";
import { eventPath } from "../../functions/_event-pages.js";
import { MIN_PLAUSIBLE_LISTED_PRICE } from "../../functions/api/shows.js";
import { PRICE_MOVE_SITES } from "./data-stories.mjs";

const DAY_MS = 86400000;
const MAX_LATEST_AGE_HOURS = 30;
const trimmed = (v) => String(v ?? "").trim();
const dayMs = (d) => Date.parse(`${d}T00:00:00Z`);
const dayDiff = (a, b) => Math.round((dayMs(a) - dayMs(b)) / DAY_MS);

/** Latest reading per show x site x currency, with the earlier comparison reading. */
export function latestReadings(rows, events, artists, { now }) {
  const eventList = Array.isArray(events) ? events : [];
  const byId = new Map(eventList.map((e) => [trimmed(e?.id), e]));
  const artistList = Array.isArray(artists) ? artists : [];
  const names = new Map(artistList.map((a) => [trimmed(a?.slug), trimmed(a?.name)]));
  const indexable = new Set(artistList.filter((a) => a && artistPageIndexable(a, eventList, trimmed(a.slug), now)).map((a) => trimmed(a.slug)));

  const groups = new Map();
  for (const row of Array.isArray(rows) ? rows : []) {
    if (!PRICE_MOVE_SITES.has(trimmed(row?.provider))) continue;
    const key = [row.event_id, row.provider, row.source, row.currency].map(trimmed).join("|");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  }

  const out = [];
  for (const series of groups.values()) {
    series.sort((a, b) => trimmed(a.observed_date).localeCompare(trimmed(b.observed_date)));
    const latest = series[series.length - 1];
    const event = byId.get(trimmed(latest.event_id));
    if (!event || eventLifecycleHeld(event) || !isUpcomingShow(event, now)) continue;
    const slug = trimmed(event.artist_slug);
    if (!indexable.has(slug) || slug !== trimmed(latest.artist_slug)) continue;
    const price = Number(latest.low_price_last);
    if (!Number.isFinite(price) || price < MIN_PLAUSIBLE_LISTED_PRICE) continue;
    const latestAt = Date.parse(trimmed(latest.last_observed_at));
    if (!Number.isFinite(latestAt) || now - latestAt > MAX_LATEST_AGE_HOURS * 3600000 || latestAt > now + 3600000) continue;
    const localDate = eventLocalDateIso(event);
    if (!localDate) continue;
    const earlier = series
      .filter((r) => Number(r.low_price_last) >= MIN_PLAUSIBLE_LISTED_PRICE)
      .filter((r) => { const gap = dayDiff(latest.observed_date, r.observed_date); return gap >= 6 && gap <= 8; })
      .sort((a, b) => Math.abs(dayDiff(latest.observed_date, a.observed_date) - 7) - Math.abs(dayDiff(latest.observed_date, b.observed_date) - 7))[0];
    const from = earlier ? Number(earlier.low_price_last) : null;
    out.push({
      key: `${trimmed(latest.event_id)}|${trimmed(latest.provider)}|${latest.currency}|${price}`,
      eventId: trimmed(latest.event_id),
      artistSlug: slug,
      artist: names.get(slug) || trimmed(event.artist_name),
      city: trimmed(event.city),
      venue: trimmed(event.venue),
      localDate,
      provider: trimmed(latest.provider),
      site: PRICE_MOVE_SITES.get(trimmed(latest.provider)),
      currency: trimmed(latest.currency),
      from,
      fromDate: earlier ? trimmed(earlier.observed_date) : "",
      to: price,
      toDate: trimmed(latest.observed_date),
      capturedAt: new Date(latestAt).toISOString(),
      dropShare: from && from > price ? (from - price) / from : 0,
      eventPath: eventPath(event)
    });
  }
  return out;
}

/** Readings at or below `target` in `currency`, lowest first. */
export function targetHitsFor(readings, eventId, target, currency) {
  return readings
    .filter((r) => r.eventId === eventId && r.currency === currency && r.to <= target)
    .sort((a, b) => a.to - b.to || a.provider.localeCompare(b.provider));
}
