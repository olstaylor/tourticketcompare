// Price-drop social post drafts (stage B: drafts for the owner to approve and
// post by hand; nothing here posts anything).
//
// Finds shows whose lowest listed price on one ticket site fell sharply, from
// the never-pruned provider_pricing_daily rollup, and writes ready-to-post text.
// Every figure is one event on one site in one currency, names the site, and
// carries its capture time (PROVIDER_DATA_POLICY.md, "Off-site use"). The copy
// reports only what was observed: no prediction, no "prices fall before shows",
// no scarcity, no cheapest-site claim, and "lowest we've recorded since <month>",
// never "ever" (the price-timing evidence bar is not met; see
// /mnt/project-files/analysis/price-timing-2026-10-06).
//
// Pure: callers pass every input, including `now`. No files, no network.

import { isUpcomingShow } from "../../functions/_upcoming.js";
import { eventLocalDateIso } from "../../functions/_event-local-date.js";
import { eventLifecycleHeld } from "../../functions/_route-indexability.js";
import { artistPageIndexable } from "../../functions/_artist-indexability.js";
import { eventPath } from "../../functions/_event-pages.js";
import { priceGuidePath, priceGuideRegistered } from "../../functions/_price-guides.js";
import { MIN_PLAUSIBLE_LISTED_PRICE } from "../../functions/api/shows.js";
import { PRICE_MOVE_SITES } from "./data-stories.mjs";

const SITE = "https://tourticketcompare.com";
const DAY_MS = 86400000;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Owner-set trigger (launch plan, 2026-10-09), plus the record-low variant.
export const DROP_RULES = Object.freeze({
  minDropShare: 0.2,        // lowest listed price at least 20% below 7 days earlier
  baseGapDays: [6, 8],      // the comparison reading is 6-8 days before the latest
  minReadings: 3,           // daily readings between the two, inclusive
  heldReadings: 2,          // the latest two readings must both be below the threshold
  minDaysToShow: 7,
  weekOutDays: 10,          // a drop with the show this close gets the "week away" wording
  maxLatestAgeHours: 30,    // newest observation; stage C must re-check within 2h before posting
  recordLowMinShare: 0.05,  // record low: at least 5% under every earlier reading
  recordLowMinHistoryDays: 14,
  perArtist: 1,
  maxDrafts: 10
});

// Owner focus artists (2026-10-30): their drops are drafted ahead of the rest.
export const FOCUS_ARTISTS = Object.freeze(["olivia-rodrigo", "metallica", "lizzy-mcalpine", "zach-bryan", "nickelback"]);
const focusRank = (slug) => (FOCUS_ARTISTS.includes(slug) ? 0 : 1);

const trimmed = (v) => String(v ?? "").trim();
const isoDay = (ms) => new Date(ms).toISOString().slice(0, 10);
const dayMs = (d) => Date.parse(`${d}T00:00:00Z`);
const dayDiff = (a, b) => Math.round((dayMs(a) - dayMs(b)) / DAY_MS);

export function money(price, currency) {
  return new Intl.NumberFormat("en", { style: "currency", currency, maximumFractionDigits: price % 1 === 0 ? 0 : 2 }).format(price);
}

function longDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}
const monthYear = (iso) => `${MONTHS[Number(iso.slice(5, 7)) - 1]}`;
const shortDate = (iso) => `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1].slice(0, 3)}`;
const captured = (iso) => `${shortDate(iso.slice(0, 10))}, ${iso.slice(11, 16)} UTC`;

/**
 * SQL for the daily rollup rows of the stored top-priority shows, 45 days back.
 * Joined to `show_priority` so the result stays small and arrives ranked.
 */
export function priceDropSql(asOf) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(asOf))) throw new Error(`priceDropSql: bad as-of date "${asOf}"`);
  const sites = [...PRICE_MOVE_SITES.keys()].map((s) => `'${s}'`).join(",");
  return `SELECT d.event_id, d.artist_slug, d.provider, d.source, d.currency, d.observed_date, d.low_price_min, d.low_price_last, d.observations, d.last_observed_at, sp.rank priority_rank FROM provider_pricing_daily d JOIN show_priority sp ON sp.event_id = d.event_id WHERE d.observed_date >= date('${asOf}','-45 day') AND d.provider IN (${sites}) ORDER BY d.event_id, d.provider, d.source, d.currency, d.observed_date`;
}

function seriesKey(row) {
  return [row.event_id, row.provider, row.source, row.currency].map(trimmed).join("|");
}

/**
 * Detect drops and record lows.
 *
 * @param {any[]} rows priceDropSql rows.
 * @param {any[]} events events.json records.
 * @param {any[]} artists artists.json records.
 * @param {{ now: number, rules?: Partial<typeof DROP_RULES> }} options
 */
export function detectPriceDrops(rows, events, artists, { now, rules = {} }) {
  const r = { ...DROP_RULES, ...rules };
  const eventList = Array.isArray(events) ? events : [];
  const byId = new Map(eventList.map((e) => [trimmed(e?.id), e]));
  const artistList = Array.isArray(artists) ? artists : [];
  const names = new Map(artistList.map((a) => [trimmed(a?.slug), trimmed(a?.name)]));
  const indexable = new Set(artistList.filter((a) => a && artistPageIndexable(a, eventList, trimmed(a.slug), now)).map((a) => trimmed(a.slug)));

  const groups = new Map();
  for (const row of Array.isArray(rows) ? rows : []) {
    if (!PRICE_MOVE_SITES.has(trimmed(row?.provider))) continue;
    const key = seriesKey(row);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  }

  const found = [];
  for (const series of groups.values()) {
    series.sort((a, b) => trimmed(a.observed_date).localeCompare(trimmed(b.observed_date)));
    const latest = series[series.length - 1];
    const event = byId.get(trimmed(latest.event_id));
    if (!event || eventLifecycleHeld(event) || !isUpcomingShow(event, now)) continue;
    const slug = trimmed(event.artist_slug);
    if (!indexable.has(slug) || slug !== trimmed(latest.artist_slug)) continue;
    const showMs = Date.parse(trimmed(event.datetime_iso));
    const daysToShow = (showMs - now) / DAY_MS;
    if (!(daysToShow >= r.minDaysToShow)) continue;

    const price = Number(latest.low_price_last);
    if (!Number.isFinite(price) || price < MIN_PLAUSIBLE_LISTED_PRICE) continue;
    const latestAt = Date.parse(trimmed(latest.last_observed_at));
    if (!Number.isFinite(latestAt) || now - latestAt > r.maxLatestAgeHours * 3600000 || latestAt > now + 3600000) continue;

    const clean = series.filter((row) => Number(row.low_price_last) >= MIN_PLAUSIBLE_LISTED_PRICE);
    const [gapMin, gapMax] = r.baseGapDays;
    const bases = clean.filter((row) => {
      const gap = dayDiff(latest.observed_date, row.observed_date);
      return gap >= gapMin && gap <= gapMax;
    });
    if (!bases.length) continue;
    // The reading closest to exactly 7 days before.
    const base = bases.sort((a, b) => Math.abs(dayDiff(latest.observed_date, a.observed_date) - 7) - Math.abs(dayDiff(latest.observed_date, b.observed_date) - 7))[0];
    const between = clean.filter((row) => row.observed_date >= base.observed_date && row.observed_date <= latest.observed_date);
    if (between.length < r.minReadings) continue;

    const basePrice = Number(base.low_price_last);
    const threshold = basePrice * (1 - r.minDropShare);
    const tail = between.slice(-r.heldReadings);
    const held = tail.length >= r.heldReadings && tail.every((row) => Number(row.low_price_last) <= threshold);
    const isDrop = held && price <= threshold;

    // Record low is judged against everything before the held tail, so the
    // new low does not count against itself.
    const earlier = clean.slice(0, Math.max(0, clean.length - r.heldReadings));
    const history = earlier.length ? dayDiff(latest.observed_date, earlier[0].observed_date) : 0;
    const priorMin = earlier.length ? Math.min(...earlier.map((row) => Number(row.low_price_min))) : Infinity;
    const isRecordLow = history >= r.recordLowMinHistoryDays && price <= priorMin * (1 - r.recordLowMinShare)
      && tail.length >= r.heldReadings && tail.every((row) => Number(row.low_price_last) <= priorMin * (1 - r.recordLowMinShare));
    if (!isDrop && !isRecordLow) continue;

    const localDate = eventLocalDateIso(event);
    if (!localDate) continue;
    found.push({
      key: `${trimmed(latest.event_id)}|${trimmed(latest.provider)}|${latest.currency}|${price}`,
      kind: isRecordLow ? "record-low" : daysToShow <= r.weekOutDays ? "week-out" : "drop",
      eventId: trimmed(latest.event_id),
      artistSlug: slug,
      artist: names.get(slug) || trimmed(event.artist_name),
      city: trimmed(event.city),
      venue: trimmed(event.venue),
      localDate,
      daysToShow: Math.floor(daysToShow),
      provider: trimmed(latest.provider),
      site: PRICE_MOVE_SITES.get(trimmed(latest.provider)),
      currency: trimmed(latest.currency),
      from: basePrice,
      fromDate: trimmed(base.observed_date),
      to: price,
      toDate: trimmed(latest.observed_date),
      capturedAt: new Date(latestAt).toISOString(),
      dropShare: (basePrice - price) / basePrice,
      sinceDate: isRecordLow ? trimmed(earlier[0].observed_date) : "",
      priorityRank: Number.isFinite(Number(latest.priority_rank)) ? Number(latest.priority_rank) : 9999,
      eventPath: eventPath(event),
      linkPath: priceGuideRegistered(slug) ? priceGuidePath(slug) : `/artists/${slug}`
    });
  }

  // Best first: focus artists, then stored show priority, then the size of the
  // fall. One draft per artist, so a feed is never one tour's every city.
  found.sort((a, b) => focusRank(a.artistSlug) - focusRank(b.artistSlug) || a.priorityRank - b.priorityRank || b.dropShare - a.dropShare || a.key.localeCompare(b.key));
  const perArtist = new Map();
  const out = [];
  for (const item of found) {
    const n = perArtist.get(item.artistSlug) || 0;
    if (n >= r.perArtist) continue;
    perArtist.set(item.artistSlug, n + 1);
    out.push(item);
    if (out.length >= r.maxDrafts) break;
  }
  return out;
}

const pctText = (share) => `${Math.floor(share * 100)}%`;

/** The post text for one detected move. */
export function renderDraftText(d) {
  const where = `${d.artist} in ${d.city} on ${longDate(d.localDate)}`;
  const move = `The lowest listed price on ${d.site} was ${money(d.from, d.currency)} on ${shortDate(d.fromDate)} and ${money(d.to, d.currency)} on ${shortDate(d.toDate)} (captured ${captured(d.capturedAt)}).`;
  const tail = "Starting prices only, not the final total. Check the full order total on the ticket site.";
  let lead;
  if (d.kind === "record-low") {
    lead = `${d.artist} in ${d.city}, ${longDate(d.localDate)}: the lowest listed price we've recorded on ${d.site} since ${monthYear(d.sinceDate)} is ${money(d.to, d.currency)} (captured ${captured(d.capturedAt)}).`;
    return `${lead} ${tail}\n${SITE}${d.eventPath || d.linkPath}`;
  }
  if (d.kind === "week-out") lead = `With ${where} about a week away, the lowest listed ticket price has dropped ${pctText(d.dropShare)} in the last week.`;
  else lead = `Ticket prices for ${where} have dropped ${pctText(d.dropShare)} in a week.`;
  return `${lead} ${move} ${tail}\n${SITE}${d.eventPath || d.linkPath}`;
}

/** The daily draft file. Internal working copy: never commit it to main. */
export function renderDraftFile(drafts, { now }) {
  const day = isoDay(now);
  const head = `# Price-drop post drafts, ${day}\n\nStage B: drafts for approval. Nothing is posted. Before posting each one, open the link and check the ticket site still shows a price near the figure; if it has moved back, skip it. Figures are listed starting prices from the named site, not totals. No claim is made about what prices will do next.\n`;
  if (!drafts.length) return `${head}\nNo drops met the rules today (20%+ fall in the lowest listed price over 7 days, held on two readings, show 7+ days away, fresh data).\n`;
  const body = drafts.map((d, i) => `## ${i + 1}. ${d.artist}, ${d.city} (${d.kind}, show priority #${d.priorityRank})\n\n\`\`\`\n${renderDraftText(d)}\n\`\`\`\n\nSource: ${d.site}, ${d.currency}, ${money(d.from, d.currency)} to ${money(d.to, d.currency)} (${pctText(d.dropShare)}), last observed ${d.capturedAt}. Page: ${SITE}${d.eventPath || d.linkPath}${d.linkPath && d.eventPath ? ` · guide/artist: ${SITE}${d.linkPath}` : ""}`).join("\n\n");
  return `${head}\n${body}\n`;
}
