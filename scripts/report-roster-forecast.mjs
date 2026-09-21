#!/usr/bin/env node
//
// report-roster-forecast.mjs
//
// Roster decay forecast + onboarding candidate discovery. REPORT ONLY.
//
// Why this exists
// ---------------
// Every *location* surface on the site is gated on upcoming shows:
//
//   city page        >=4 upcoming shows across >=2 artists
//   venue page       >=3 upcoming shows across >=2 artists
//   artist-city page artist indexable AND >=2 upcoming publishable shows
//
// Artist pages are the deliberate exception: artistPageIndexable() reads the
// editorial status alone, so an artist whose tour has ended keeps an indexable
// page with an empty-state board (docs/ROUTE_INDEXABILITY_POLICY.md § Artist).
// This reporter still tracks when each artist goes dateless, because that is
// what drains the three location gates above.
//
// Those location gates self-heal in both directions, which is correct — but it
// means the indexable route set shrinks on its own as tour dates pass, and
// nothing in the repo measured the rate. This reporter projects the four
// shared gate modules forward so the roster can be refilled *before* pages fall
// out of the index rather than after (a page that leaves the index and returns
// loses the authority it had accumulated).
//
// Two parts:
//
//   1. Forecast (offline, no credentials). Re-runs the real gate modules at
//      future timestamps and reports the projected indexable surface, the date
//      each artist page drops out, and which city/venue pages fall below their
//      thresholds inside the horizon.
//
//   2. Candidates (--candidates, needs TICKETMASTER_API_KEY). Asks the
//      Ticketmaster Discovery API which artists are playing the markets the
//      site already covers, drops anything already on the roster or billed
//      below the headline (--min-primary-rate), and ranks what is left by how
//      many at-risk city/venue pages that artist would hold above their gate.
//      Output is a review list of *names* — the input the existing onboarding
//      pipeline lacks.
//
// The forecast half also reports net surface change as a per-30-day rate and
// the break-even a roster batch has to clear, and — with --candidates — what
// the top 20 would actually be worth at the horizon. Those three numbers are
// the point: roster cadence was previously a judgement call with no figure
// attached to it.
//
// The forecast is a floor, not a prediction: it assumes no new dates are ever
// announced for artists already tracked. Real decay is slower whenever the
// nightly discovery lanes land new shows.
//
// Data safety
// -----------
// This script NEVER writes public/data/*, functions/*, or any production file.
// Candidate rows are API-sourced only — names, Ticketmaster attraction ids and
// the API's own attraction URL, never constructed or inferred (see
// SAFE_PUBLISHING_RULES.md). Candidate events are used solely for an in-memory
// projection and are never persisted as event records. Every candidate is
// marked needs_human_check and must go through the existing gated flow:
//
//   npm run artists:onboard:propose -- --names "<names from this report>"
//   npm run artists:promote:batch                      (human spot-check, --write)
//
// Usage:
//   node scripts/report-roster-forecast.mjs
//   node scripts/report-roster-forecast.mjs --check --warn-days 30
//   node scripts/report-roster-forecast.mjs --candidates --limit 25
//   node scripts/report-roster-forecast.mjs --candidates --json reports/roster-forecast.json
//   node scripts/report-roster-forecast.mjs --self-test
//
// Options:
//   --horizon-days <n>    Candidate/at-risk horizon in days (default 90)
//   --warn-days <n>       Drop-out warning window in days (default 30)
//   --check               Exit 1 if any artist page drops out inside --warn-days
//   --candidates          Run Ticketmaster candidate discovery (needs API key)
//   --limit <n>           Max candidates reported (default 25)
//   --min-shows <n>       Min shows in tracked markets past the horizon (default 3)
//   --pages-per-city <n>  Discovery pages per tracked city (default 2, size 200)
//   --delay-ms <n>        Delay between Discovery requests (default 250)
//   --max-cities <n>      Cap tracked cities scanned (default 0 = all)
//   --min-upcoming-total <n>  Min upcoming Ticketmaster events site-wide for a
//                             candidate to count as a touring act (default 8)
//   --min-primary-rate <r>    Min share of a candidate's tracked-market dates
//                             that must bill it first, 0..1 (default 0.4). The
//                             same test the Ticketmaster sync applies when it
//                             withholds a row as `not_primary_attraction`;
//                             screens out support acts, which Discovery credits
//                             with the headliner's entire routing.
//   --enrich-limit <n>    Max attractions to scale-check via the attraction
//                         endpoint, one request each (default 60)
//   --json <path>         Also write the full report as JSON
//   --markdown <path>     Also write the report as Markdown
//   --self-test           Offline assertions only; no API calls
//
// Environment:
//   TICKETMASTER_API_KEY  Required only for --candidates
//   TTC_NOW               Optional ISO instant override for deterministic runs

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { deriveCities, citySlug, normalizeCountry, slugify } from "../functions/_cities.js";
import { deriveVenues, venueSlug } from "../functions/_venues.js";
import { deriveIndexableArtistCities } from "../functions/_artist-cities.js";
import { artistPageIndexable, INDEXABLE_ARTIST_STATUS } from "../functions/_artist-indexability.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DAY_MS = 86_400_000;
const DISCOVERY_BASE = "https://app.ticketmaster.com/discovery/v2";
const DISCOVERY_PAGE_SIZE = 200;
const DEFAULT_HORIZONS = [0, 14, 30, 60, 90, 120, 180, 365];
// Artist onboarding batches up to 20 promotions per PR (see the onboarding
// skill), so that is the unit a cadence decision is actually made in.
const BATCH_SIZE_FOR_CONTRIBUTION = 20;

// Ticketmaster requires an ISO country code on city-scoped queries. Keys are
// the canonical labels normalizeCountry() emits; anything absent is skipped
// rather than guessed.
const COUNTRY_CODES = new Map([
  ["united states", "US"],
  ["canada", "CA"],
  ["united kingdom", "GB"],
  ["ireland", "IE"],
  ["spain", "ES"],
  ["france", "FR"],
  ["germany", "DE"],
  ["italy", "IT"],
  ["netherlands", "NL"],
  ["belgium", "BE"],
  ["sweden", "SE"],
  ["norway", "NO"],
  ["denmark", "DK"],
  ["poland", "PL"],
  ["portugal", "PT"],
  ["switzerland", "CH"],
  ["austria", "AT"],
  ["mexico", "MX"],
  ["australia", "AU"]
]);

// Same-name collision traps that must never be proposed as an artist. Mirrors
// the guard in scripts/propose-onboarding-batch.mjs.
const COLLISION_PATTERN =
  /\b(tribute|parking|experience|dance party|karaoke|vs\.?|night:|themed|drag brunch|orchestra plays|candlelight|celebration of|music of|sing-?along)\b/i;

// Ticketmaster storefront hosts, kept in sync with scripts/propose-artists.mjs,
// scripts/validate-events.py and functions/api/out.js. Never widen this to a
// generic ticketmaster.* pattern.
const TICKETMASTER_STOREFRONT_DOMAINS = [
  "ticketmaster.com",
  "ticketmaster.ca",
  "ticketmaster.co.uk",
  "ticketmaster.es",
  "ticketmaster.de",
  "ticketmaster.nl",
  "ticketmaster.se",
  "ticketmaster.pl",
  "ticketmaster.be",
  "ticketmaster.it"
];

/**
 * Resolve an attraction URL to a plain public Ticketmaster storefront page.
 * This matters concretely here: Discovery returns `url` values that are
 * sometimes already Impact affiliate links
 * (`https://ticketmaster.evyy.net/c/...?u=<real url>`), and re-introducing
 * evyy.net shortlinks for Ticketmaster is explicitly forbidden — Ticketmaster
 * is a plain, unmonetized verification source (CLAUDE.md → Affiliate & Provider
 * Model). The wrapper is stripped and only its destination kept; anything whose
 * final destination is not on the storefront allowlist is dropped rather than
 * unwrapped, so no affiliate URL can ever reach a report or the onboarding
 * pipeline. The canonical clean URL comes from /discovery/v2/attractions/{id}.
 */
export function ticketmasterStorefrontUrl(rawUrl) {
  let current = clean(rawUrl);
  if (!current) return "";
  for (let depth = 0; depth < 4; depth += 1) {
    let parsed;
    try {
      parsed = new URL(current);
    } catch {
      return "";
    }
    // Unwrap Impact affiliate links to the plain destination they carry. This
    // strips affiliate tracking rather than adding it — the wrapper is what
    // must never survive, and Discovery returns it inconsistently for the same
    // attraction. Mirrors resolveTicketmasterUrl() in propose-artists.mjs.
    if (/(^|\.)evyy\.net$/i.test(parsed.hostname)) {
      const target = clean(parsed.searchParams.get("u"));
      if (!target) return "";
      current = target;
      continue;
    }
    if (parsed.protocol !== "https:") return "";
    const host = parsed.hostname.toLowerCase();
    const allowed = TICKETMASTER_STOREFRONT_DOMAINS.some((d) => host === d || host.endsWith(`.${d}`));
    return allowed ? parsed.toString() : "";
  }
  return "";
}

// ─── CLI ────────────────────────────────────────────────────────────────────

const argv = process.argv.slice(2);
function arg(name, fallback = null) {
  const i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : fallback;
}
function intArg(name, fallback) {
  const raw = arg(name);
  if (raw === null) return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : fallback;
}
function floatArg(name, fallback) {
  const raw = arg(name);
  if (raw === null) return fallback;
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) ? n : fallback;
}

const clean = (v) => String(v ?? "").trim();

function referenceNow() {
  const override = clean(process.env.TTC_NOW);
  const ts = override ? Date.parse(override) : Date.now();
  return Number.isFinite(ts) ? ts : Date.now();
}

const isoDate = (ts) => new Date(ts).toISOString().slice(0, 10);

// ─── Forecast (pure) ────────────────────────────────────────────────────────

/**
 * Indexable route counts at one instant, derived from the same shared modules
 * the router and sitemap use so the projection cannot drift from production.
 */
export function surfaceAt(events, artists, now) {
  const indexableArtists = (artists || []).filter((a) =>
    artistPageIndexable(a.indexing_status, events, a.slug, now)
  );
  const cities = deriveCities(events, { now }).filter((c) => c.indexable);
  const venues = deriveVenues(events, { now }).filter((v) => v.indexable);
  const artistCities = deriveIndexableArtistCities(
    events,
    indexableArtists.map((a) => a.slug),
    { now }
  );
  return {
    artists: indexableArtists.length,
    cities: cities.length,
    venues: venues.length,
    artistCities: artistCities.length,
    total: indexableArtists.length + cities.length + venues.length + artistCities.length,
    artistSlugs: indexableArtists.map((a) => a.slug),
    citySlugs: cities.map((c) => c.slug),
    venueSlugs: venues.map((v) => v.slug)
  };
}

export function projectSurface(events, artists, baseNow, horizons = DEFAULT_HORIZONS) {
  return horizons.map((days) => {
    const now = baseNow + days * DAY_MS;
    const s = surfaceAt(events, artists, now);
    return { days, date: isoDate(now), ...s };
  });
}

// Default windows for the net-change table. 30d is the roster batch cadence
// worth comparing against; 90d is long enough that a single large ingestion run
// does not dominate the rate.
export const NET_CHANGE_WINDOWS = [30, 90];

/**
 * Net indexable-surface change over each window, and the same figure expressed
 * as a per-30-day rate.
 *
 * The projection table above already shows the surface at each horizon, but a
 * column of absolute totals does not answer the question the roster cadence
 * actually turns on: *is a batch of this size, at this interval, gaining or
 * losing ground?* Decay is continuous and roster batches are episodic, so the
 * two are only comparable once decay is expressed as a rate.
 *
 * `perThirtyDays` is the number to hold against a batch's contribution. A batch
 * that adds fewer indexable pages than this per 30 days is net negative however
 * many artists it onboards.
 *
 * @param {Array<{days:number,date:string,total:number}>} projection
 * @param {number[]} [windows]
 * @returns {Array<object>}
 */
export function netSurfaceChange(projection, windows = NET_CHANGE_WINDOWS) {
  const byDay = new Map((projection || []).map((row) => [row.days, row]));
  const start = byDay.get(0);
  if (!start) return [];
  return windows
    .filter((days) => days > 0 && byDay.has(days))
    .map((days) => {
      const end = byDay.get(days);
      const net = end.total - start.total;
      return {
        days,
        date: end.date,
        from: start.total,
        to: end.total,
        net,
        perThirtyDays: Math.round((net / days) * 30),
        retainedPct: start.total > 0 ? Math.round((end.total / start.total) * 100) : null
      };
    });
}

/**
 * Indexable pages a batch must add per 30 days to hold the surface flat.
 *
 * Read off the longest window available, because the short window is the
 * noisiest: a single cluster of tour-end dates inside the next 30 days can make
 * the 30d rate look like a cliff that the 90d rate shows to be a step.
 *
 * @param {Array<object>} netChange  Output of netSurfaceChange().
 * @returns {number} Positive = pages/30d that must be replaced. 0 = not losing.
 */
export function breakEvenPerThirtyDays(netChange) {
  const longest = (netChange || []).reduce((a, b) => (b.days > (a?.days || 0) ? b : a), null);
  if (!longest) return 0;
  return Math.max(0, -longest.perThirtyDays);
}

/**
 * What a candidate batch is actually worth: the indexable surface at the
 * horizon with the top `batchSize` candidates' upcoming shows merged in,
 * against the same horizon with nothing added.
 *
 * This is the half of the cadence question the decay rate cannot answer on its
 * own. `coverageScore` ranks candidates against each other but is not in units
 * of pages — it counts at-risk pages an artist *touches*, and both location
 * gates need a second artist, so touching is not holding. Re-running the real
 * gate modules over the merged set is the only honest way to say whether a
 * batch clears the break-even rate, because it lets the batch's own members
 * satisfy each other's >=2-artist requirement exactly as they would in
 * production.
 *
 * Candidates are projected as promoted artists (`INDEXABLE_ARTIST_STATUS`)
 * because that is the state being costed: an unpromoted shell contributes no
 * indexable page of any type. Projected events are in-memory only and carry the
 * `projected: true` marker from projectionRecord() — they are never persisted.
 *
 * This is a FLOOR, in two directions at once. Discovery dates are unverified,
 * so some will not survive onboarding (pushing the real figure down); and
 * projected rows are not publishable (see projectionRecord()), so a candidate
 * gets no credit for a city or venue page in a market where nothing publishable
 * exists yet (pushing it up). Read it as "at least this many", and never as a
 * forecast of what a batch will deliver.
 *
 * @returns {{batchSize:number, horizonDays:number, baseline:object, withBatch:object,
 *            added:number, perThirtyDays:number, beatsDecay:boolean|null}}
 */
export function batchSurfaceContribution(events, artists, scored, baseNow, horizonDays, batchSize, breakEvenRate = null) {
  const batch = (scored || []).slice(0, batchSize);
  const at = baseNow + horizonDays * DAY_MS;

  const projectedEvents = [];
  const projectedArtists = [];
  for (const candidate of batch) {
    for (const event of candidate.events || []) {
      projectedEvents.push(projectionRecord(candidate.slug, event));
    }
    projectedArtists.push({
      slug: candidate.slug,
      name: candidate.name,
      indexing_status: INDEXABLE_ARTIST_STATUS
    });
  }

  const baseline = surfaceAt(events, artists, at);
  const withBatch = surfaceAt(events.concat(projectedEvents), (artists || []).concat(projectedArtists), at);
  const added = withBatch.total - baseline.total;
  const perThirtyDays = Math.round((added / horizonDays) * 30);

  return {
    batchSize: batch.length,
    horizonDays,
    baseline: {
      total: baseline.total,
      artists: baseline.artists,
      cities: baseline.cities,
      venues: baseline.venues,
      artistCities: baseline.artistCities
    },
    withBatch: {
      total: withBatch.total,
      artists: withBatch.artists,
      cities: withBatch.cities,
      venues: withBatch.venues,
      artistCities: withBatch.artistCities
    },
    added,
    perThirtyDays,
    beatsDecay: breakEvenRate === null ? null : perThirtyDays >= breakEvenRate
  };
}

/**
 * When does each editorially-indexable artist lose its future-date status?
 * `dropsOn` is the day after its last upcoming show; null when the artist is
 * already empty-boarded. The artist page itself remains indexable.
 */
export function artistDropouts(events, artists, baseNow) {
  const rows = [];
  for (const artist of artists || []) {
    if (artist.indexing_status !== INDEXABLE_ARTIST_STATUS) continue;
    const stamps = (events || [])
      .filter((e) => slugify(e.artist_slug) === slugify(artist.slug))
      .map((e) => Date.parse(clean(e.datetime_iso)))
      .filter((ts) => Number.isFinite(ts) && ts >= baseNow)
      .sort((a, b) => a - b);
    const live = stamps.length > 0;
    const lastShow = live ? stamps[stamps.length - 1] : null;
    rows.push({
      slug: artist.slug,
      name: artist.name || artist.slug,
      live,
      upcoming: stamps.length,
      lastShow: lastShow ? isoDate(lastShow) : null,
      dropsOn: lastShow ? isoDate(lastShow + DAY_MS) : null,
      daysLeft: lastShow ? Math.ceil((lastShow - baseNow) / DAY_MS) : 0
    });
  }
  // Already-dark first, then soonest to go dark.
  rows.sort((a, b) => Number(a.live) - Number(b.live) || a.daysLeft - b.daysLeft);
  return rows;
}

/**
 * City and venue pages that are indexable now but fall below their gate by the
 * horizon. These are exactly the pages a new artist could hold open.
 */
export function atRiskLocations(events, baseNow, horizonDays) {
  const later = baseNow + horizonDays * DAY_MS;
  const nowCities = new Set(deriveCities(events, { now: baseNow }).filter((c) => c.indexable).map((c) => c.slug));
  const laterCities = new Set(deriveCities(events, { now: later }).filter((c) => c.indexable).map((c) => c.slug));
  const nowVenues = new Set(deriveVenues(events, { now: baseNow }).filter((v) => v.indexable).map((v) => v.slug));
  const laterVenues = new Set(deriveVenues(events, { now: later }).filter((v) => v.indexable).map((v) => v.slug));
  return {
    cities: [...nowCities].filter((s) => !laterCities.has(s)).sort(),
    venues: [...nowVenues].filter((s) => !laterVenues.has(s)).sort()
  };
}

/** Distinct tracked markets (city + country) with any upcoming show. */
export function trackedMarkets(events, baseNow) {
  const out = new Map();
  for (const event of events || []) {
    const ts = Date.parse(clean(event.datetime_iso));
    if (!Number.isFinite(ts) || ts < baseNow) continue;
    const city = clean(event.city);
    const country = normalizeCountry(event.country);
    if (!city || !country) continue;
    const slug = citySlug(city, country);
    if (!slug || out.has(slug)) continue;
    const code = COUNTRY_CODES.get(country.toLowerCase()) || null;
    out.set(slug, { slug, city, country, countryCode: code });
  }
  return [...out.values()].sort((a, b) => a.slug.localeCompare(b.slug));
}

// ─── Candidate scoring (pure) ───────────────────────────────────────────────

/**
 * Turn a Discovery event into the minimal shape the gate modules read. These
 * synthetic records exist only inside this process to answer "what would the
 * gates say if this artist were on the roster" — they are never written to
 * events.json and carry no provider, CTA, or verification fields.
 */
export function projectionRecord(candidateSlug, discoveryEvent) {
  return {
    artist_slug: candidateSlug,
    city: discoveryEvent.city,
    country: discoveryEvent.country,
    venue: discoveryEvent.venue,
    datetime_iso: discoveryEvent.datetime_iso,
    // What the ingestion lane would give these rows on onboarding. NOTE: this
    // field no longer affects the gates. eventStatusPublishable() was changed
    // to test for a destination URL (ticketmaster_url / source_url, or verified
    // Ticketmaster provenance) rather than a verification status, so a
    // projection — which carries neither — is NOT publishable, and the city and
    // venue gates' ">=1 show with a publishable destination" requirement is
    // never satisfied by projected rows alone.
    //
    // That is left as-is deliberately. The alternative is fabricating a
    // destination or a `verified: true` for a link nobody has checked, which
    // SAFE_PUBLISHING_RULES.md forbids, and readDiscoveryEvent() cannot supply
    // a clean one because the URL on an event response is Impact-wrapped for
    // this account. The consequence is a conservative under-count: a candidate
    // is credited with holding open a page that already has a publishable show,
    // and credited with nothing in a market that has none. Under-counting a
    // review list is the safe direction.
    verification_status: "machine_high_confidence",
    // Marker so a projection is identifiable if one ever escapes this
    // report-only script. Projections are never written to events.json, and
    // they deliberately carry no provider_links: no destination has been
    // checked, and fabricating one is forbidden.
    projected: true
  };
}

// Minimum share of an attraction's tracked-market events on which it is the
// FIRST embedded attraction, for it to count as a headliner.
//
// Not a tuned parameter — it reproduces a screen a human already ran. BACKLOG
// item 3 records the outcome of re-screening the 2026-09-09 candidate ranking
// by hand: the support acts it had surfaced measured 0% primary (RJ Pasin,
// Ladrones, Jeremy Camp, Katy Nichole, Treaty Oak Revival, Wyatt McCubbin, Don
// Broco, Magnolia Park), then Avery Anna at 8% and Shenandoah at 14%, while the
// genuine headliners held back only because the sync withholds their
// second-billed dates measured 70% (Whitechapel), 55% (Insomnium) and 45%
// (Amorphis). Any cut between 0.15 and 0.45 separates those two groups; 0.4
// sits inside that band and keeps all three co-headliners.
//
// Raise it to demand cleaner headline status, lower it to review co-headline
// acts the sync would partly withhold. The screen is reported, never silent.
export const DEFAULT_MIN_PRIMARY_RATE = 0.4;

/**
 * Share of a discovered attraction's tracked-market events where it is billed
 * first.
 *
 * Discovery credits every attraction on an event, so a support act inherits the
 * headliner's whole routing and scores an identical coverageScore. That is the
 * documented reason the last two candidate rankings had to be re-screened by
 * hand (BACKLOG item 3). Worse, onboarding one would add almost nothing:
 * sync-ticketmaster-events.py withholds exactly these rows as
 * `not_primary_attraction`, so the dates that earned the ranking never land.
 *
 * @param {{events: Array, primaryCount: number}} record
 * @returns {number} 0..1; 0 when the attraction has no events.
 */
export function primaryAttractionRate(record) {
  const total = record?.events?.length || 0;
  if (total === 0) return 0;
  return (record.primaryCount || 0) / total;
}

/**
 * Rank candidates by how much of the at-risk surface they would help hold open.
 *
 * Two distinct measures, because a solo "would this artist alone re-open the
 * page" test is nearly always false and therefore useless for ranking: both the
 * city gate (>=4 shows across >=2 artists) and the venue gate (>=3 across >=2)
 * require a second artist, so once the roster's own coverage of a market has
 * expired no single candidate can satisfy them. Scoring only on flips would
 * report zero for every candidate and rank on the tiebreakers alone.
 *
 *   coverageScore — at-risk city/venue pages where this artist would add at
 *                   least one upcoming show past the horizon. This is the
 *                   ranking key: it measures how much of the decaying surface
 *                   the artist touches, and it composes across a batch (two
 *                   artists covering the same market together clear the
 *                   >=2-artist gate that neither clears alone).
 *   flipScore     — pages that would become indexable from this artist alone.
 *                   Rare and strictly stronger, so it is reported and used as
 *                   the first tiebreak, never as the primary key.
 */
export function scoreCandidates(events, candidates, baseNow, horizonDays) {
  const later = baseNow + horizonDays * DAY_MS;
  const baseCities = new Set(deriveCities(events, { now: later }).filter((c) => c.indexable).map((c) => c.slug));
  const baseVenues = new Set(deriveVenues(events, { now: later }).filter((v) => v.indexable).map((v) => v.slug));
  const risk = atRiskLocations(events, baseNow, horizonDays);
  const atRiskCities = new Set(risk.cities);
  const atRiskVenues = new Set(risk.venues);

  const scored = candidates.map((candidate) => {
    const projected = candidate.events.map((e) => projectionRecord(candidate.slug, e));
    const merged = events.concat(projected);
    const withCities = deriveCities(merged, { now: later }).filter((c) => c.indexable).map((c) => c.slug);
    const withVenues = deriveVenues(merged, { now: later }).filter((v) => v.indexable).map((v) => v.slug);
    const flippedCities = withCities.filter((s) => !baseCities.has(s));
    const flippedVenues = withVenues.filter((s) => !baseVenues.has(s));

    // Shows past the horizon are the only ones that can hold a page open.
    const futureEvents = candidate.events.filter((e) => Date.parse(e.datetime_iso) >= later);
    const coveredCities = new Set();
    const coveredVenues = new Set();
    for (const event of futureEvents) {
      const city = citySlug(event.city, event.country);
      if (atRiskCities.has(city)) coveredCities.add(city);
      const venue = venueSlug(event.venue, event.city);
      if (atRiskVenues.has(venue)) coveredVenues.add(venue);
    }

    return {
      ...candidate,
      coveredCities: [...coveredCities].sort(),
      coveredVenues: [...coveredVenues].sort(),
      coverageScore: coveredCities.size + coveredVenues.size,
      flippedCities,
      flippedVenues,
      flipScore: flippedCities.length + flippedVenues.length,
      showsAfterHorizon: futureEvents.length
    };
  });

  // Strategic fit first (pages this artist would hold open), then national
  // touring scale, then breadth across tracked markets. Scale is a tiebreak
  // rather than the primary key on purpose: a stadium act that plays none of
  // the at-risk markets does less for the indexable surface than a mid-size
  // act that keeps four city pages alive.
  scored.sort(
    (a, b) =>
      b.coverageScore - a.coverageScore ||
      b.flipScore - a.flipScore ||
      (b.upcomingTotal || 0) - (a.upcomingTotal || 0) ||
      b.marketCount - a.marketCount ||
      b.showsAfterHorizon - a.showsAfterHorizon ||
      b.events.length - a.events.length ||
      a.name.localeCompare(b.name)
  );
  return scored;
}

/** Names already on the roster (any status) plus their TM attraction ids. */
export function rosterExclusions(artists, identities) {
  const slugs = new Set((artists || []).map((a) => slugify(a.slug)));
  const attractionIds = new Set();
  const entries = Array.isArray(identities) ? identities : identities?.artists || [];
  for (const entry of entries) {
    const id = clean(entry?.ticketmaster_attraction_id);
    if (id) attractionIds.add(id);
    const slug = slugify(entry?.slug);
    if (slug) slugs.add(slug);
  }
  return { slugs, attractionIds };
}

export function isExcludedCandidate(name, attractionId, exclusions) {
  const slug = slugify(name);
  if (!slug) return "unslugabble name";
  if (exclusions.slugs.has(slug)) return "already on the roster";
  if (attractionId && exclusions.attractionIds.has(attractionId)) return "attraction id already registered";
  if (COLLISION_PATTERN.test(name)) return "same-name collision trap";
  return null;
}

// ─── Ticketmaster Discovery ─────────────────────────────────────────────────

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function discoveryGet(params, apiKey, timeoutMs = 20_000) {
  const url = new URL(`${DISCOVERY_BASE}/events.json`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  url.searchParams.set("apikey", apiKey);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return { ok: false, status: res.status, events: [] };
    const body = await res.json();
    return { ok: true, status: 200, events: body?._embedded?.events || [], page: body?.page || null };
  } catch (err) {
    return { ok: false, status: 0, error: String(err?.message || err), events: [] };
  } finally {
    clearTimeout(timer);
  }
}

async function attractionGet(attractionId, apiKey, timeoutMs = 20_000) {
  const url = new URL(`${DISCOVERY_BASE}/attractions/${encodeURIComponent(attractionId)}.json`);
  url.searchParams.set("apikey", apiKey);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Read the scale and identity signals off an attraction record. `_total`
 * upcoming events across all of Ticketmaster separates a touring act from a
 * local booking far better than the handful of dates visible in the scanned
 * markets, and the attraction endpoint is where the clean (unwrapped)
 * storefront URL lives.
 */
export function readAttractionRecord(raw) {
  const primary = (raw?.classifications || []).find((c) => c?.primary) || raw?.classifications?.[0] || {};
  return {
    ticketmasterUrl: ticketmasterStorefrontUrl(raw?.url),
    upcomingTotal: Number(raw?.upcomingEvents?._total) || 0,
    genre: clean(primary?.genre?.name) || null,
    segment: clean(primary?.segment?.name) || null
  };
}

/** Flatten a Discovery event into the fields the projection and report need. */
export function readDiscoveryEvent(raw) {
  const venueRec = raw?._embedded?.venues?.[0] || {};
  const datetime = clean(raw?.dates?.start?.dateTime) || clean(raw?.dates?.start?.localDate);
  return {
    city: clean(venueRec?.city?.name),
    country: normalizeCountry(clean(venueRec?.country?.name)),
    venue: clean(venueRec?.name),
    datetime_iso: datetime,
    // Deliberately no `url` here: the attraction url embedded in event
    // responses is Impact/evyy.net-wrapped for this account. The clean
    // storefront URL is read from the attraction endpoint instead.
    attractions: (raw?._embedded?.attractions || [])
      .map((a) => ({ id: clean(a?.id), name: clean(a?.name) }))
      .filter((a) => a.id && a.name)
  };
}

/**
 * Scan the markets the site already covers and aggregate upcoming music events
 * by attraction. Anchoring on tracked markets (rather than "all of music")
 * keeps the request budget bounded and biases candidates toward artists who
 * reinforce the city and venue pages already at risk.
 */
async function discoverCandidates({ markets, apiKey, pagesPerCity, delayMs, scanFrom, onProgress }) {
  const byAttraction = new Map();
  const failures = [];
  let requests = 0;

  for (const market of markets) {
    if (!market.countryCode) {
      failures.push({ market: market.slug, reason: "no ISO country code mapping" });
      continue;
    }
    for (let page = 0; page < pagesPerCity; page += 1) {
      const res = await discoveryGet(
        {
          city: market.city,
          countryCode: market.countryCode,
          segmentName: "Music",
          size: DISCOVERY_PAGE_SIZE,
          page,
          sort: "date,asc",
          // Scan forward from the horizon, not from today. The pages at risk
          // are the ones that lose their coverage *after* the horizon, so only
          // shows past it can hold them open — and a near-term-first scan
          // exhausts its page budget on dates that are already covered.
          startDateTime: `${isoDate(scanFrom)}T00:00:00Z`
        },
        apiKey
      );
      requests += 1;
      if (!res.ok) {
        failures.push({ market: market.slug, page, status: res.status, reason: res.error || `HTTP ${res.status}` });
        break;
      }
      for (const rawEvent of res.events) {
        const event = readDiscoveryEvent(rawEvent);
        const ts = Date.parse(event.datetime_iso);
        if (!event.city || !event.country || !event.venue || !Number.isFinite(ts) || ts < scanFrom) continue;
        for (const attraction of event.attractions) {
          if (!byAttraction.has(attraction.id)) {
            byAttraction.set(attraction.id, {
              attractionId: attraction.id,
              name: attraction.name,
              slug: slugify(attraction.name),
              events: [],
              eventKeys: new Set(),
              markets: new Set(),
              primaryCount: 0
            });
          }
          const record = byAttraction.get(attraction.id);
          const key = `${venueSlug(event.venue, event.city)}|${event.datetime_iso}`;
          if (record.eventKeys.has(key)) continue;
          record.eventKeys.add(key);
          record.events.push(event);
          record.markets.add(citySlug(event.city, event.country));
          // Same test sync-ticketmaster-events.py applies when it withholds a
          // row as `not_primary_attraction`: the registry attraction must be
          // the event's FIRST embedded attraction. A support act is credited
          // with the headliner's event here (it really is playing that room on
          // that night), so without this counter it inherits the headliner's
          // entire routing and scores identically on coverage.
          if (event.attractions[0]?.id === attraction.id) record.primaryCount += 1;
        }
      }
      if (res.page && page + 1 >= (res.page.totalPages || 0)) break;
      await sleep(delayMs);
    }
    if (onProgress) onProgress(market, byAttraction.size);
    await sleep(delayMs);
  }

  return { byAttraction, failures, requests };
}

// ─── Rendering ──────────────────────────────────────────────────────────────

function pad(v, w, right = true) {
  const s = String(v);
  return right ? s.padStart(w) : s.padEnd(w);
}

export function renderReport(report) {
  const lines = [];
  const { baseDate, projection, dropouts, atRisk, horizonDays, warnDays, candidates } = report;
  const netChange = report.netChange || [];
  const breakEven = report.breakEvenPerThirtyDays || 0;

  lines.push(`# Roster forecast — ${baseDate}`, "");
  lines.push(
    "Projected indexable routes if no new dates are announced for artists already tracked.",
    "This is a floor, not a prediction: the nightly discovery lanes lift it whenever real new shows land.",
    ""
  );
  lines.push("| Horizon | Date | Artists | Cities | Venues | Artist-cities | Total |");
  lines.push("|---|---|---|---|---|---|---|");
  for (const row of projection) {
    lines.push(
      `| +${row.days}d | ${row.date} | ${row.artists} | ${row.cities} | ${row.venues} | ${row.artistCities} | **${row.total}** |`
    );
  }
  lines.push("");

  if (netChange && netChange.length) {
    lines.push("## Net surface change", "");
    lines.push(
      "The table above is a stock; this one is the flow. Roster batches are episodic and decay is",
      "continuous, so the two are only comparable once decay is a rate.",
      ""
    );
    lines.push("| Window | Surface | Net | Per 30d | Retained |");
    lines.push("|---|---|---|---|---|");
    for (const row of netChange) {
      const sign = row.net > 0 ? "+" : "";
      lines.push(
        `| 0 → +${row.days}d | ${row.from} → ${row.to} | ${sign}${row.net} | ${sign}${row.perThirtyDays} | ${row.retainedPct}% |`
      );
    }
    lines.push("");
    if (breakEven > 0) {
      lines.push(
        `**Break-even: ${breakEven} indexable pages per 30 days.** A roster batch that adds fewer than`,
        "this is net negative however many artists it onboards. Artist pages are excluded from the",
        "decay — they never fall out — so every page in this figure is a city, venue or artist-city",
        "page, and refilling it means upcoming dates in markets that already have some.",
        ""
      );
    } else {
      lines.push("**The surface is not currently shrinking over the measured windows.**", "");
    }
  }

  const dark = dropouts.filter((d) => !d.live);
  const soon = dropouts.filter((d) => d.live && d.daysLeft <= warnDays);
  const later = dropouts.filter((d) => d.live && d.daysLeft > warnDays);

  lines.push(`## Artists going dateless within ${warnDays} days`, "");
  if (soon.length === 0) {
    lines.push("_None._", "");
  } else {
    lines.push("| Artist | Last show | Goes dateless | Days left | Upcoming |");
    lines.push("|---|---|---|---|---|");
    for (const d of soon) {
      lines.push(`| ${d.name} | ${d.lastShow} | **${d.dropsOn}** | ${d.daysLeft} | ${d.upcoming} |`);
    }
    lines.push("");
  }

  if (dark.length) {
    lines.push(`## Already dateless (empty board, still indexable) — ${dark.length}`, "");
    lines.push(dark.map((d) => `- ${d.name} (\`${d.slug}\`)`).join("\n"), "");
  }

  if (later.length) {
    lines.push("## Later", "");
    lines.push("| Artist | Goes dateless | Days left |");
    lines.push("|---|---|---|");
    for (const d of later) lines.push(`| ${d.name} | ${d.dropsOn} | ${d.daysLeft} |`);
    lines.push("");
  }

  lines.push(`## Location pages falling below their gate within ${horizonDays} days`, "");
  lines.push(
    `- Cities: ${atRisk.cities.length}${atRisk.cities.length ? ` — ${atRisk.cities.join(", ")}` : ""}`,
    `- Venues: ${atRisk.venues.length}${atRisk.venues.length ? ` — ${atRisk.venues.join(", ")}` : ""}`,
    ""
  );

  if (candidates) {
    lines.push(`## Onboarding candidates (Ticketmaster Discovery, ${candidates.scannedMarkets} tracked markets)`, "");
    lines.push(
      "Artists playing markets the site already covers, not yet on the roster, ranked by how many",
      `at-risk city/venue pages they would add upcoming shows to past +${horizonDays}d.`,
      "Both location gates need >=2 artists, so coverage composes across a batch — two artists in the",
      "same market clear a gate neither clears alone. \"Solo flips\" counts pages one artist restores unaided.",
      `Filtered to acts with >=${candidates.minUpcomingTotal} upcoming Ticketmaster events site-wide, and to`,
      `headliners: >=${Math.round((candidates.minPrimaryRate ?? 0) * 100)}% of an act\u2019s tracked-market dates must bill it first`,
      `(the same test the Ticketmaster sync applies when it withholds a row as \`not_primary_attraction\`).`,
      candidates.screenedOutAsSupport
        ? `That screen removed ${candidates.screenedOutAsSupport} support/festival-billing attraction(s) before ranking.`
        : "That screen removed no attractions on this run.",
      "**Every row needs human verification** — this is a review list, not an approval.",
      ""
    );
    if (candidates.rows.length === 0) {
      lines.push("_No candidates met the thresholds._", "");
    } else {
      lines.push("| # | Artist | Genre | At-risk pages covered | Solo flips | Tracked markets | Headline rate | Upcoming (all TM) | Ticketmaster |");
      lines.push("|---|---|---|---|---|---|---|---|---|");
      candidates.rows.forEach((row, i) => {
        const url = row.ticketmaster_artist_url ? `[artist page](${row.ticketmaster_artist_url})` : "—";
        const covered = [...row.coveredCities, ...row.coveredVenues].slice(0, 3).join(", ");
        lines.push(
          `| ${i + 1} | ${row.name} | ${row.genre || "—"} | **${row.coverageScore}**${covered ? ` (${covered}${row.coverageScore > 3 ? ", …" : ""})` : ""} | ${row.flipScore} | ${row.marketCount} (${row.upcoming_shows_in_tracked_markets} shows) | ${Math.round((row.primaryRate ?? 0) * 100)}% | ${row.upcomingTotal} | ${url} |`
        );
      });
      lines.push("");
      const bc = candidates.batchContribution;
      if (bc && bc.batchSize > 0) {
        const verdict =
          bc.beatsDecay === null
            ? ""
            : bc.beatsDecay
              ? " — clears the break-even rate."
              : " — does not clear the break-even rate on its own.";
        lines.push(`### What the top ${bc.batchSize} would be worth`, "");
        lines.push(
          `Re-running the real gate modules at +${bc.horizonDays}d with these ${bc.batchSize} artists promoted and`,
          "their discovered dates merged in, against the same horizon with nothing added. The batch's own",
          "members satisfy each other's >=2-artist gates here exactly as they would in production, which is",
          "why this is worth computing rather than summing the coverage column.",
          ""
        );
        lines.push("| | Artists | Cities | Venues | Artist-cities | Total |");
        lines.push("|---|---|---|---|---|---|");
        lines.push(
          `| Nothing added | ${bc.baseline.artists} | ${bc.baseline.cities} | ${bc.baseline.venues} | ${bc.baseline.artistCities} | ${bc.baseline.total} |`
        );
        lines.push(
          `| Top ${bc.batchSize} promoted | ${bc.withBatch.artists} | ${bc.withBatch.cities} | ${bc.withBatch.venues} | ${bc.withBatch.artistCities} | ${bc.withBatch.total} |`
        );
        lines.push("");
        lines.push(
          `**+${bc.added} indexable pages at +${bc.horizonDays}d, or ${bc.perThirtyDays} per 30 days${verdict}**`,
          "",
          "A floor, not a forecast. Discovery dates are unverified and some will not survive onboarding;",
          "and a projected row carries no checked destination, so the batch gets no credit for a city or",
          "venue page in a market where nothing publishable exists yet. Read it as \"at least this many\".",
          ""
        );
      }
      lines.push("Feed the shortlist into the existing gated onboarding flow:", "");
      lines.push("```bash");
      lines.push(
        `npm run artists:onboard:propose -- --names ${JSON.stringify(candidates.rows.slice(0, 10).map((r) => r.name).join(","))}`
      );
      lines.push("```", "");
    }
    if (candidates.failures.length) {
      lines.push(`_${candidates.failures.length} market lookup(s) failed or were skipped._`, "");
    }
  }

  return lines.join("\n");
}

// ─── Self-test ──────────────────────────────────────────────────────────────

function assert(label, condition) {
  if (!condition) {
    console.error(`FAIL ${label}`);
    process.exitCode = 1;
  } else {
    console.log(`ok   ${label}`);
  }
}

function runSelfTest() {
  const base = Date.parse("2026-01-01T00:00:00Z");
  const artists = [
    { slug: "alpha", name: "Alpha", indexing_status: INDEXABLE_ARTIST_STATUS },
    { slug: "beta", name: "Beta", indexing_status: INDEXABLE_ARTIST_STATUS },
    { slug: "gamma", name: "Gamma", indexing_status: "review_required" }
  ];
  const mk = (slug, city, venue, day) => ({
    artist_slug: slug,
    city,
    country: "United States",
    venue,
    datetime_iso: `2026-01-${String(day).padStart(2, "0")}T20:00:00Z`,
    id: `${slug}-${city}-${day}`,
    // Reviewed rows always carry a verification status, and the city/venue
    // gates require at least one publishable upcoming show, so the fixture
    // models a real reviewed record rather than a bare date.
    verification_status: "human_verified",
    provider_links: { ticketmaster: { verified: true } }
  });
  // Testville: 5 shows / 2 artists -> city indexable at base. Four of them fall
  // inside 20 days; alpha's day-28 show is the only one left past the horizon,
  // which leaves the city one artist short of its >=2-artist gate.
  const events = [
    mk("alpha", "Testville", "Test Arena", 10),
    mk("alpha", "Testville", "Test Arena", 11),
    mk("beta", "Testville", "Test Arena", 12),
    mk("beta", "Testville", "Test Arena", 13),
    mk("alpha", "Testville", "Test Arena", 28)
  ];

  const now = surfaceAt(events, artists, base);
  assert("both indexable artists counted while dated", now.artists === 2);
  assert("review_required artist never counted", !now.artistSlugs.includes("gamma"));
  assert("city gate met at base", now.cities === 1);
  assert("venue gate met at base", now.venues === 1);

  const after = surfaceAt(events, artists, base + 30 * DAY_MS);
  assert("surface retains durable artist pages once every date has passed", after.artists === 2 && after.total === 2);

  const projection = projectSurface(events, artists, base, [0, 30]);
  assert("projection covers each requested horizon", projection.length === 2 && projection[0].days === 0);
  assert("projection dates are ISO", /^\d{4}-\d{2}-\d{2}$/.test(projection[1].date));

  const drops = artistDropouts(events, artists, base);
  assert("dropouts exclude non-indexable statuses", drops.every((d) => d.slug !== "gamma"));
  const alpha = drops.find((d) => d.slug === "alpha");
  assert("dropout date is the day after the last show", alpha.dropsOn === "2026-01-29");
  assert("dropout reports remaining upcoming count", alpha.upcoming === 3);
  const empty = artistDropouts(events, artists, base + 60 * DAY_MS);
  assert("empty-boarded artists report live=false", empty.every((d) => d.live === false && d.dropsOn === null));

  const risk = atRiskLocations(events, base, 30);
  assert("at-risk cities detected", risk.cities.length === 1);
  assert("at-risk venues detected", risk.venues.length === 1);

  const markets = trackedMarkets(events, base);
  assert("tracked markets deduped", markets.length === 1);
  assert("tracked market carries an ISO country code", markets[0].countryCode === "US");

  // Candidate scoring: past the horizon Testville is down to alpha's single
  // show. Delta supplies the second artist and the missing show count, so the
  // city and venue pages stay indexable only if Delta is onboarded. A lone new
  // artist can never rescue a page by itself — both gates require >=2 artists,
  // which is exactly the complementarity the rescue score is measuring.
  const horizon = 20;
  const later = base + horizon * DAY_MS;
  const candidateEvents = [3, 4, 5].map((offset) => ({
    city: "Testville",
    country: "United States",
    venue: "Test Arena",
    datetime_iso: new Date(later + offset * DAY_MS).toISOString()
  }));
  const scored = scoreCandidates(
    events,
    [
      { name: "Delta", slug: "delta", attractionId: "K1", ticketmasterUrl: "", events: candidateEvents, marketCount: 1 },
      { name: "Epsilon", slug: "epsilon", attractionId: "K2", ticketmasterUrl: "", events: [], marketCount: 0 }
    ],
    base,
    horizon
  );
  assert("candidate that rescues pages ranks first", scored[0].name === "Delta");
  assert("solo flip counts the rescued city and venue", scored[0].flipScore === 2);
  assert("coverage counts the at-risk city and venue touched", scored[0].coverageScore === 2);
  assert("coverage lists the at-risk city slug", scored[0].coveredCities.includes("testville-united-states"));
  assert("candidate with no events scores zero on both measures", scored[1].flipScore === 0 && scored[1].coverageScore === 0);

  // Coverage must stay non-zero where a flip is impossible, since that is the
  // normal case: once the roster's own coverage of a market expires, no single
  // artist can satisfy the >=2-artist gate on its own.
  const soloOnly = scoreCandidates(
    events,
    [{ name: "Zeta", slug: "zeta", attractionId: "K3", events: candidateEvents.slice(0, 1), marketCount: 1 }],
    base,
    horizon
  );
  assert("one show cannot flip a gate alone", soloOnly[0].flipScore === 0);
  assert("but it still registers as covering the at-risk market", soloOnly[0].coverageScore === 2);
  assert("projection records carry no provider fields", !("provider_links" in projectionRecord("delta", candidateEvents[0])));
  assert("projection records are marked as projections", projectionRecord("delta", candidateEvents[0]).projected === true);
  assert(
    "projection records state the publishability they assume",
    projectionRecord("delta", candidateEvents[0]).verification_status === "machine_high_confidence"
  );

  // A city whose every upcoming date is CTA-suppressed cannot be indexable, so
  // it must never be counted into the projected surface.
  const suppressedEvents = [10, 11, 12, 13].map((day) => ({
    ...mk(day % 2 ? "alpha" : "beta", "Blockville", "Block Arena", day),
    verification_status: "needs_recheck",
    provider_links: {}
  }));
  const suppressedSurface = surfaceAt(suppressedEvents, artists, base);
  assert("a city with no publishable destination is not projected as indexable", suppressedSurface.cities === 0);
  assert("a venue with no publishable destination is not projected as indexable", suppressedSurface.venues === 0);

  const exclusions = rosterExclusions(artists, [{ slug: "alpha", ticketmaster_attraction_id: "KROSTER" }]);
  assert("roster slug excluded", isExcludedCandidate("Alpha", "KNEW", exclusions) === "already on the roster");
  assert("registered attraction id excluded", isExcludedCandidate("Totally New", "KROSTER", exclusions) !== null);
  assert("collision trap excluded", /collision/.test(isExcludedCandidate("The Beatles Tribute", "KX", exclusions) || ""));
  assert("clean new name passes", isExcludedCandidate("Brand New Act", "KX", exclusions) === null);

  const parsed = readDiscoveryEvent({
    dates: { start: { dateTime: "2026-05-05T19:00:00Z" } },
    _embedded: {
      venues: [{ name: "Wembley Stadium", city: { name: "London" }, country: { name: "Great Britain" } }],
      attractions: [{ id: "K9", name: "Somebody", url: "https://www.ticketmaster.com/somebody" }]
    }
  });
  assert("discovery venue parsed", parsed.venue === "Wembley Stadium");
  assert("discovery country normalized", parsed.country === "United Kingdom");
  assert("event-embedded attraction url is never carried", !("url" in parsed.attractions[0]));

  // The affiliate-wrapper guard is the load-bearing safety check here: the live
  // events endpoint returns evyy.net-wrapped attraction urls for this account,
  // and Ticketmaster must stay plain and unmonetized.
  assert(
    "evyy.net wrapper is stripped to the plain storefront destination",
    ticketmasterStorefrontUrl(
      "https://ticketmaster.evyy.net/c/6059518/264167/4272?u=https%3A%2F%2Fwww.ticketmaster.com%2Flady-a-tickets%2Fartist%2F1173672"
    ) === "https://www.ticketmaster.com/lady-a-tickets/artist/1173672"
  );
  assert(
    "unwrapped result never keeps the affiliate host",
    !ticketmasterStorefrontUrl(
      "https://ticketmaster.evyy.net/c/1/2/3?u=https%3A%2F%2Fwww.ticketmaster.com%2Fx"
    ).includes("evyy")
  );
  assert(
    "wrapper pointing off-allowlist is dropped, not followed",
    ticketmasterStorefrontUrl("https://ticketmaster.evyy.net/c/1/2/3?u=https%3A%2F%2Fwww.axs.com%2Fevents%2F1") === ""
  );
  assert(
    "wrapper with no destination param is dropped",
    ticketmasterStorefrontUrl("https://ticketmaster.evyy.net/c/1/2/3") === ""
  );
  assert(
    "plain ticketmaster storefront url is kept",
    ticketmasterStorefrontUrl("https://www.ticketmaster.com/kacey-musgraves-tickets/artist/1668663").includes(
      "ticketmaster.com"
    )
  );
  assert(
    "regional storefront on the allowlist is kept",
    ticketmasterStorefrontUrl("https://www.ticketmaster.co.uk/artist/123") !== ""
  );
  assert(
    "non-allowlisted regional storefront is dropped",
    ticketmasterStorefrontUrl("https://www.ticketmaster.com.mx/artist/123") === ""
  );
  assert("host merely containing ticketmaster is dropped", ticketmasterStorefrontUrl("https://ticketmaster.evil.com/x") === "");
  assert("http is dropped", ticketmasterStorefrontUrl("http://www.ticketmaster.com/artist/1") === "");
  assert("empty url is dropped", ticketmasterStorefrontUrl("") === "");

  const attraction = readAttractionRecord({
    url: "https://www.ticketmaster.com/kacey-musgraves-tickets/artist/1668663",
    upcomingEvents: { tmr: 7, ticketmaster: 34, _total: 41 },
    classifications: [{ primary: true, segment: { name: "Music" }, genre: { name: "Country" } }]
  });
  assert("attraction scale signal read", attraction.upcomingTotal === 41);
  assert("attraction genre read", attraction.genre === "Country");
  assert("attraction url kept when clean", attraction.ticketmasterUrl !== "");
  const wrapped = readAttractionRecord({
    url: "https://ticketmaster.evyy.net/c/1/2/3?u=https%3A%2F%2Fwww.ticketmaster.com%2Ftyla-tickets%2Fartist%2F1",
    upcomingEvents: { _total: 20 }
  });
  assert(
    "wrapped attraction url is stored as the plain destination",
    wrapped.ticketmasterUrl === "https://www.ticketmaster.com/tyla-tickets/artist/1"
  );
  assert("missing upcomingEvents scores zero", readAttractionRecord({}).upcomingTotal === 0);

  // ── Net surface change ────────────────────────────────────────────────────
  const shrinking = [
    { days: 0, date: "2026-01-01", total: 400 },
    { days: 30, date: "2026-01-31", total: 350 },
    { days: 90, date: "2026-04-01", total: 250 }
  ];
  const net = netSurfaceChange(shrinking);
  assert("net change covers both default windows", net.length === 2);
  assert("net change reports the absolute loss", net[0].net === -50 && net[1].net === -150);
  assert("net change normalises to a 30-day rate", net[1].perThirtyDays === -50);
  assert("net change reports retention", net[0].retainedPct === 88 && net[1].retainedPct === 63);
  assert("break-even reads the longest window", breakEvenPerThirtyDays(net) === 50);
  assert(
    "break-even is zero when the surface is growing",
    breakEvenPerThirtyDays(
      netSurfaceChange([
        { days: 0, date: "2026-01-01", total: 100 },
        { days: 90, date: "2026-04-01", total: 200 }
      ])
    ) === 0
  );
  assert("net change is empty without a day-0 row", netSurfaceChange([{ days: 30, total: 10 }]).length === 0);
  assert("net change skips windows the projection lacks", netSurfaceChange(shrinking, [30, 45]).length === 1);

  // ── Primary-attraction screen ─────────────────────────────────────────────
  assert(
    "a support act billed second everywhere rates zero",
    primaryAttractionRate({ events: [1, 2, 3, 4], primaryCount: 0 }) === 0
  );
  assert(
    "a headliner billed first everywhere rates one",
    primaryAttractionRate({ events: [1, 2, 3, 4], primaryCount: 4 }) === 1
  );
  assert(
    "a co-headliner rates between and clears the default screen",
    primaryAttractionRate({ events: [1, 2, 3, 4], primaryCount: 2 }) === 0.5 &&
      0.5 >= DEFAULT_MIN_PRIMARY_RATE
  );
  assert(
    "the recorded support-act rates fall below the default screen",
    [0, 0.08, 0.14].every((rate) => rate < DEFAULT_MIN_PRIMARY_RATE)
  );
  assert(
    "the recorded co-headliner rates clear the default screen",
    [0.45, 0.55, 0.7].every((rate) => rate >= DEFAULT_MIN_PRIMARY_RATE)
  );
  assert("an attraction with no events rates zero, not NaN", primaryAttractionRate({ events: [], primaryCount: 0 }) === 0);

  // ── Batch contribution ────────────────────────────────────────────────────
  // Two candidates each playing the same venue twice past the horizon. Neither
  // clears the venue gate alone (>=3 shows AND >=2 artists); together they do.
  // That is the composition the coverage column cannot express, so it is the
  // case worth pinning.
  const batchAt = Date.parse("2026-07-01T00:00:00Z");
  const mkEvent = (n) => ({
    city: "Testville",
    country: "United States",
    venue: "Test Arena",
    datetime_iso: new Date(batchAt + n * DAY_MS).toISOString()
  });
  const batchPair = [
    { slug: "delta", name: "Delta", events: [mkEvent(1), mkEvent(2)] },
    { slug: "epsilon", name: "Epsilon", events: [mkEvent(3), mkEvent(4)] }
  ];
  // One existing show in the room with a real destination. The venue gate needs
  // >=3 shows, >=2 artists AND >=1 publishable show; projections satisfy the
  // first two and only this row satisfies the third.
  const seeded = [
    {
      artist_slug: "incumbent",
      city: "Testville",
      country: "United States",
      venue: "Test Arena",
      datetime_iso: new Date(batchAt).toISOString(),
      ticketmaster_url: "https://www.ticketmaster.com/event/TESTSEED"
    }
  ];
  const contribution = batchSurfaceContribution(seeded, [], batchPair, base, 180, 2, 10);
  assert("batch contribution reports the batch size it costed", contribution.batchSize === 2);
  assert("one lone show clears no location gate on its own", contribution.baseline.total === 0);
  assert("two candidates compose to clear the venue gate", contribution.withBatch.venues === 1);
  assert("batch contribution counts promoted artist pages too", contribution.added === contribution.withBatch.total);
  assert("batch contribution normalises to a 30-day rate", contribution.perThirtyDays === Math.round((contribution.added / 180) * 30));
  assert("batch contribution judges against break-even when given one", contribution.beatsDecay === false);

  // Pin the conservative under-count documented in projectionRecord(): with no
  // publishable show already in the market, the same two candidates hold open
  // no city or venue page at all. If someone later makes projections
  // publishable, this assertion should fail and force the call to be made
  // deliberately rather than as a side effect.
  const unseeded = batchSurfaceContribution([], [], batchPair, base, 180, 2, 10);
  assert("projections alone never satisfy the publishable-destination gate", unseeded.withBatch.venues === 0 && unseeded.withBatch.cities === 0);
  assert("promoted artist pages still count without any publishable show", unseeded.withBatch.artists === 2);
  assert(
    "batch contribution withholds a verdict without a break-even rate",
    batchSurfaceContribution([], [], [], base, 90, 0).beatsDecay === null
  );

  const md = renderReport({
    baseDate: "2026-01-01",
    projection,
    dropouts: drops,
    atRisk: risk,
    horizonDays: horizon,
    warnDays: 30,
    candidates: null
  });
  assert("report renders a projection table", md.includes("| Horizon | Date |"));
  const mdNet = renderReport({
    baseDate: "2026-01-01",
    projection,
    dropouts: drops,
    atRisk: risk,
    horizonDays: horizon,
    warnDays: 30,
    candidates: null,
    netChange: net,
    breakEvenPerThirtyDays: breakEvenPerThirtyDays(net)
  });
  assert("report renders the net-change section", mdNet.includes("## Net surface change"));
  assert("report states the break-even rate", mdNet.includes("**Break-even: 50 indexable pages per 30 days.**"));
  assert(
    "report says the surface is not shrinking when it is not",
    renderReport({
      baseDate: "2026-01-01",
      projection,
      dropouts: drops,
      atRisk: risk,
      horizonDays: horizon,
      warnDays: 30,
      candidates: null,
      netChange: [{ days: 90, date: "2026-04-01", from: 100, to: 200, net: 100, perThirtyDays: 33, retainedPct: 200 }],
      breakEvenPerThirtyDays: 0
    }).includes("not currently shrinking")
  );
  assert("report states the floor caveat", md.includes("floor, not a prediction"));
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function readJson(relPath) {
  return JSON.parse(await fs.readFile(path.join(ROOT, relPath), "utf8"));
}

async function main() {
  if (argv.includes("--self-test")) {
    runSelfTest();
    return;
  }

  const baseNow = referenceNow();
  const horizonDays = intArg("--horizon-days", 90);
  const warnDays = intArg("--warn-days", 30);
  const limit = intArg("--limit", 25);
  const minShows = intArg("--min-shows", 3);
  const pagesPerCity = intArg("--pages-per-city", 2);
  const delayMs = intArg("--delay-ms", 250);
  const maxCities = intArg("--max-cities", 0);
  const minUpcomingTotal = intArg("--min-upcoming-total", 8);
  const minPrimaryRate = floatArg("--min-primary-rate", DEFAULT_MIN_PRIMARY_RATE);
  const enrichLimit = intArg("--enrich-limit", 60);

  const events = await readJson("public/data/events.json");
  const artists = await readJson("public/data/artists.json");

  const horizons = [...new Set([...DEFAULT_HORIZONS, horizonDays])].sort((a, b) => a - b);
  const report = {
    baseDate: isoDate(baseNow),
    horizonDays,
    warnDays,
    projection: projectSurface(events, artists, baseNow, horizons),
    dropouts: artistDropouts(events, artists, baseNow),
    atRisk: atRiskLocations(events, baseNow, horizonDays),
    candidates: null
  };
  report.netChange = netSurfaceChange(report.projection);
  report.breakEvenPerThirtyDays = breakEvenPerThirtyDays(report.netChange);

  if (argv.includes("--candidates")) {
    const apiKey = clean(process.env.TICKETMASTER_API_KEY);
    if (!apiKey) {
      console.error("--candidates needs TICKETMASTER_API_KEY; skipping candidate discovery.");
    } else {
      const identities = await readJson("data/provider-identities.json").catch(() => []);
      const exclusions = rosterExclusions(artists, identities);
      let markets = trackedMarkets(events, baseNow);
      if (maxCities > 0) markets = markets.slice(0, maxCities);

      console.error(
        `Scanning ${markets.length} tracked markets via Ticketmaster Discovery from ${isoDate(baseNow + horizonDays * DAY_MS)} forward…`
      );
      const scanFrom = baseNow + horizonDays * DAY_MS;
      const { byAttraction, failures, requests } = await discoverCandidates({
        markets,
        apiKey,
        pagesPerCity,
        delayMs,
        scanFrom
      });

      const eligible = [];
      let screenedOutAsSupport = 0;
      for (const record of byAttraction.values()) {
        if (record.events.length < minShows) continue;
        if (isExcludedCandidate(record.name, record.attractionId, exclusions)) continue;
        const primaryRate = primaryAttractionRate(record);
        if (primaryRate < minPrimaryRate) {
          screenedOutAsSupport += 1;
          continue;
        }
        eligible.push({
          name: record.name,
          slug: record.slug,
          attractionId: record.attractionId,
          events: record.events,
          marketCount: record.markets.size,
          primaryCount: record.primaryCount,
          primaryRate
        });
      }
      if (screenedOutAsSupport) {
        console.error(
          `Primary-attraction screen dropped ${screenedOutAsSupport} attraction(s) below ${minPrimaryRate} primary rate.`
        );
      }

      // Enriching every attraction would cost one request each, so pre-rank on
      // the signals already in hand and only look up the plausible head of the
      // list. Everything below the cut is dropped rather than reported without
      // its scale check.
      eligible.sort(
        (a, b) => b.marketCount - a.marketCount || b.events.length - a.events.length || a.name.localeCompare(b.name)
      );
      const shortlist = eligible.slice(0, enrichLimit);
      console.error(`Checking touring scale for ${shortlist.length} of ${eligible.length} eligible attractions…`);

      const enriched = [];
      for (const candidate of shortlist) {
        const record = await attractionGet(candidate.attractionId, apiKey);
        const detail = record ? readAttractionRecord(record) : null;
        if (!detail || detail.upcomingTotal < minUpcomingTotal) continue;
        enriched.push({ ...candidate, ...detail });
        await sleep(delayMs);
      }

      const scored = scoreCandidates(events, enriched, baseNow, horizonDays).slice(0, limit);
      // What the shortlist is actually worth, in the same units as the decay
      // rate. Sized at the onboarding skill's per-PR ceiling so the figure
      // answers "is one batch enough?" rather than "is the whole shortlist?".
      const batchContribution = batchSurfaceContribution(
        events,
        artists,
        scored,
        baseNow,
        horizonDays,
        Math.min(BATCH_SIZE_FOR_CONTRIBUTION, scored.length),
        report.breakEvenPerThirtyDays
      );
      report.candidates = {
        batchContribution,
        scannedMarkets: markets.length,
        scanFrom: isoDate(scanFrom),
        requests: requests + shortlist.length,
        considered: byAttraction.size,
        eligible: eligible.length,
        enriched: enriched.length,
        minUpcomingTotal,
        minPrimaryRate,
        screenedOutAsSupport,
        failures,
        needs_human_check: true,
        rows: scored.map((r) => ({
          name: r.name,
          slug: r.slug,
          ticketmaster_attraction_id: r.attractionId,
          ticketmaster_artist_url: r.ticketmasterUrl,
          genre: r.genre,
          upcomingTotal: r.upcomingTotal,
          primaryRate: r.primaryRate,
          primaryCount: r.primaryCount,
          upcoming_shows_in_tracked_markets: r.events.length,
          showsAfterHorizon: r.showsAfterHorizon,
          marketCount: r.marketCount,
          coverageScore: r.coverageScore,
          coveredCities: r.coveredCities,
          coveredVenues: r.coveredVenues,
          flipScore: r.flipScore,
          flippedCities: r.flippedCities,
          flippedVenues: r.flippedVenues,
          events: r.events,
          needs_human_check: true
        }))
      };
    }
  }

  const markdown = renderReport(report);
  console.log(markdown);

  const jsonPath = arg("--json");
  if (jsonPath) {
    const target = path.resolve(ROOT, jsonPath);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, `${JSON.stringify(report, null, 2)}\n`);
    console.error(`Wrote ${jsonPath}`);
  }
  const mdPath = arg("--markdown");
  if (mdPath) {
    const target = path.resolve(ROOT, mdPath);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, `${markdown}\n`);
    console.error(`Wrote ${mdPath}`);
  }

  if (argv.includes("--check")) {
    const soon = report.dropouts.filter((d) => d.live && d.daysLeft <= warnDays);
    if (soon.length > 0) {
      console.error(
        `\n${soon.length} artist page(s) drop out of the index within ${warnDays} days: ${soon.map((d) => `${d.slug} (${d.dropsOn})`).join(", ")}`
      );
      process.exitCode = 1;
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
