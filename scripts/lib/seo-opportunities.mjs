// Read-only SEO opportunity scorer (plan: /mnt/project-files/plans/
// seo-growth-engine-2026-10-16.md, owner go-ahead 2026-10-16).
//
// Joins three kinds of evidence that no lane joins today and gives each
// candidate exactly one action: CREATE, IMPROVE, REFRESH, LINK or HOLD.
//
//   Google demand    Search Console page and query rows (impressions, CTR,
//                    position). The only source of search demand: SeatGeek or
//                    Ticketmaster popularity is never used as search volume.
//   Page conversion  D1 landing visitor-days by page type and how many of them
//                    clicked a ticket button. Clicks, never sales.
//   Commercial value the daily show-priority list (expected commission per
//                    show) and the venue-clock days to each artist's next show.
//
// Pure functions only: the caller reads files and D1. Nothing here publishes,
// changes indexability, CTAs or affiliate logic, or calls an AI model. Every
// row carries the numbers it was decided from so a person can check it.
import { classifyPageType } from "../../functions/_funnel.js";
import { isUpcomingShow, showStartMs } from "../../functions/_upcoming.js";
import { closenessWeight } from "./show-priority.mjs";

const DAY_MS = 86400000;

export const ACTIONS = Object.freeze(["CREATE", "IMPROVE", "REFRESH", "LINK", "HOLD"]);

// Fixed effort weights: value is divided by these to rank.
export const EFFORT = Object.freeze({ LINK: 1, REFRESH: 1, IMPROVE: 2, CREATE: 4, HOLD: 1 });

export const MODEL = Object.freeze({
  // Pages below this many impressions in the export are too thin to act on.
  minPageImpressions: 100,
  // Artist-level search intent needs this many impressions to count as demand.
  minIntentImpressions: 100,
  // A landing page type needs this many visitor-days before its click rate is
  // treated as measured rather than unknown.
  minLandings: 20,
  // Below this click rate a page type is informational: send its visitors on.
  informationalRate: 0.02,
  // IMPROVE when CTR is under this share of the site's own CTR for the band.
  ctrShortfall: 0.5,
  // ...and only when that gap is worth at least this many clicks in the export
  // window; below it a zero-click page is noise, not evidence.
  minHeadroomClicks: 3,
  // LINK when the price guide gets under this share of the artist's price-search impressions.
  guideShare: 0.25,
  // Revenue plan (11 Oct 2026): ~£0.45 commission per clicker. INFERRED from
  // 3 to 5 orders; replace once the Impact Sub ID join exists.
  gbpPerClicker: 0.45,
  // ASSUMPTION: share of a page's visitors who follow one new, relevant link.
  linkFollowRate: 0.1,
  // ASSUMPTION: share of misrouted price-search clicks a guide can win back.
  recoverableShare: 0.5,
  // REFRESH a blog post whose last update is older than this.
  staleBlogDays: 60,
  // Site-wide click rate used when a page type is unmeasured. INFERRED (D1, 2-15 Oct 2026).
  fallbackRate: 0.3
});

const PRICE_INTENT = /\b(price|prices|pricing|cost|costs|how much|cheap|cheaper|cheapest)\b/;
const PRESALE_INTENT = /\b(presale|pre-sale|pre sale|presale code|access code)\b/;
const DECISION_INTENT = /\b(vip|floor|seats?|seating|standing|which night|ticket types?|resale|best seats?|view from|lawn|pit|general admission)\b/;
const ARTIST_FAMILY = new Set(["artist", "artist_city", "artist_tour", "artist_price_guide", "artist_presale"]);

const round = (value, places = 2) => (Number.isFinite(value) ? Number(value.toFixed(places)) : null);
const pct = (value) => (Number.isFinite(value) ? `${(value * 100).toFixed(1)}%` : "unknown");

// ── Search Console input ───────────────────────────────────────────────────

const number = (value) => {
  const n = Number(String(value ?? "").replace(/[%,\s]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

/**
 * Rows of a Search Console "Pages" or "Queries" export, already parsed to
 * arrays (header first). Column names follow the UI export:
 * <dimension>,Clicks,Impressions,CTR,Position.
 */
export function searchConsoleRows(table) {
  const [header = [], ...body] = table;
  const index = (name) => header.findIndex((cell) => String(cell).trim().toLowerCase() === name);
  const [clicks, impressions, position] = ["clicks", "impressions", "position"].map(index);
  if (clicks < 0 || impressions < 0 || position < 0) throw new Error("Search Console export needs Clicks, Impressions and Position columns");
  return body
    .filter((row) => row.length > 1 && String(row[0]).trim())
    .map((row) => {
      const imp = number(row[impressions]);
      const clk = number(row[clicks]);
      return { key: String(row[0]).trim(), clicks: clk, impressions: imp, ctr: imp ? clk / imp : 0, position: number(row[position]) };
    });
}

export function pathOf(url) {
  try {
    const path = new URL(url, "https://tourticketcompare.com").pathname;
    return path.length > 1 ? path.replace(/\/+$/, "") : "/";
  } catch {
    return "";
  }
}

// ── Benchmarks ─────────────────────────────────────────────────────────────

export function positionBand(position) {
  if (!(position > 0)) return "unranked";
  if (position < 3.5) return "1-3";
  if (position < 5.5) return "4-5";
  if (position < 10.5) return "6-10";
  if (position < 20.5) return "11-20";
  return "21+";
}

/** The site's own impression-weighted CTR per position band. */
export function ctrBenchmarks(pages) {
  const bands = {};
  for (const page of pages) {
    const band = positionBand(page.position);
    bands[band] ||= { clicks: 0, impressions: 0 };
    bands[band].clicks += page.clicks;
    bands[band].impressions += page.impressions;
  }
  return Object.fromEntries(Object.entries(bands).map(([band, b]) => [band, b.impressions ? b.clicks / b.impressions : 0]));
}

/**
 * Click rate by landing page type from D1 rows
 * [{ page_type, landings, clickers }]. Unmeasured types are left out.
 */
export function conversionByPageType(rows, minLandings = MODEL.minLandings) {
  const out = {};
  for (const row of rows || []) {
    const landings = Number(row.landings) || 0;
    const clickers = Number(row.clickers) || 0;
    out[String(row.page_type)] = { landings, clickers, rate: landings >= minLandings ? clickers / landings : null };
  }
  return out;
}

// ── Artist matching ────────────────────────────────────────────────────────

const fold = (text) => String(text || "").normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim();

/** Matchers for artist names, longest first so "the 1975" beats "1975". Names under 4 letters never match. */
export function artistMatchers(artists) {
  return artists
    .map((artist) => ({ slug: artist.slug, name: fold(artist.name) }))
    .filter((artist) => artist.name.replace(/\s/g, "").length >= 4)
    .sort((a, b) => b.name.length - a.name.length)
    .map((artist) => ({ ...artist, pattern: new RegExp(`(^| )${artist.name.replace(/ /g, " ")}( |$)`) }));
}

/** The artist a query names, or "" (unmatched stays unmatched: no guessing). */
export function matchArtist(query, matchers) {
  const text = fold(query);
  return matchers.find((matcher) => matcher.pattern.test(text))?.slug || "";
}

export function queryIntent(query) {
  const text = fold(query);
  if (PRICE_INTENT.test(text)) return "price";
  if (PRESALE_INTENT.test(text)) return "presale";
  if (DECISION_INTENT.test(text)) return "decision";
  return "other";
}

// ── The scorer ─────────────────────────────────────────────────────────────

function nextShow(events, slug, now) {
  let best = null;
  for (const event of events) {
    if (event.artist_slug !== slug || !isUpcomingShow(event, now)) continue;
    const start = showStartMs(event);
    if (Number.isFinite(start) && (!best || start < best)) best = start;
  }
  return best ? Math.max(0, Math.floor((best - now) / DAY_MS)) : null;
}

function artistOfPath(path) {
  const parts = path.split("/").filter(Boolean);
  return parts[0] === "artists" && parts[1] ? parts[1] : "";
}

/**
 * Ranked opportunities. Inputs are plain data; see report-seo-opportunities.mjs
 * for where each comes from.
 *
 * @param {object} input
 * @param {Array} input.pages      searchConsoleRows of the Pages export
 * @param {Array} input.queries    searchConsoleRows of the Queries export
 * @param {Array} input.artists    public/data/artists.json
 * @param {Array} input.events     public/data/events.json
 * @param {string[]} input.priceGuides  PRICE_GUIDE_ARTISTS
 * @param {Array} input.blogPosts  [{ slug, updated, related_artists }]
 * @param {Array} input.priority   show-priority rows [{ artist_slug, expected_gbp, rank }]
 * @param {object} input.conversion conversionByPageType output ({} when unknown)
 * @param {Array} input.holds      [{ pageType, until: "YYYY-MM-DD", reason }]
 * @param {object|null} input.titleFreeze { until: "YYYY-MM-DD", reason }: while
 *                  active, title and description rewrites (IMPROVE) are HOLD
 * @param {string[]} input.linkedPaths pages that already carry the near-show links
 *                  (SELLING_SOON_PATHS in public/shell.js): their LINK is in place
 *                  and being measured, so it is HOLD, not repeated
 * @param {number} input.now
 */
export function scoreOpportunities({ pages = [], queries = [], artists = [], events = [], priceGuides = [], blogPosts = [], priority = [], conversion = {}, holds = [], linkedPaths = [], titleFreeze = null, now = Date.now() }) {
  const rows = [];
  const benchmarks = ctrBenchmarks(pages);
  const artistBySlug = new Map(artists.map((artist) => [artist.slug, artist]));
  const guides = new Set(priceGuides);
  const linked = new Set(linkedPaths);
  const blogBySlug = new Map(blogPosts.map((post) => [post.slug, post]));
  const daysOut = new Map();
  const daysTo = (slug) => {
    if (!daysOut.has(slug)) daysOut.set(slug, nextShow(events, slug, now));
    return daysOut.get(slug);
  };
  const rateOf = (pageType) => conversion[pageType]?.rate;
  const measuredRate = (pageType) => rateOf(pageType) ?? MODEL.fallbackRate;
  const timing = (slug) => (slug && daysTo(slug) != null ? closenessWeight(daysTo(slug)) : 1);
  const activeHold = (pageType) => holds.find((hold) => hold.pageType === pageType && Date.parse(`${hold.until}T00:00:00Z`) > now);
  const priorityByArtist = new Map();
  for (const row of priority) {
    const slug = row.artist_slug;
    const current = priorityByArtist.get(slug) || { expected: 0, bestRank: Infinity };
    current.expected += Number(row.expected_gbp) || 0;
    current.bestRank = Math.min(current.bestRank, Number(row.rank) || Infinity);
    priorityByArtist.set(slug, current);
  }

  const frozen = titleFreeze && Date.parse(`${titleFreeze.until}T00:00:00Z`) > now;
  const push = (input) => {
    const row = frozen && input.action === "IMPROVE"
      ? { ...input, action: "HOLD", reason: `${input.reason} Held: ${titleFreeze.reason} (until ${titleFreeze.until}).` }
      : input;
    const value = Number.isFinite(row.value) ? row.value : 0;
    rows.push({ ...row, value: round(value), score: round(row.action === "HOLD" ? 0 : value / EFFORT[row.action], 3) });
  };

  // 1. Pages that already rank.
  const impressionsByArtist = new Map();
  for (const page of pages) {
    const path = pathOf(page.key);
    if (!path) continue;
    const pageType = classifyPageType(path);
    const slug = artistOfPath(path);
    if (slug && ARTIST_FAMILY.has(pageType)) impressionsByArtist.set(slug, (impressionsByArtist.get(slug) || 0) + page.impressions);
    if (page.impressions < MODEL.minPageImpressions) continue;
    const base = { url: path, pageType, artist: slug, evidence: { impressions: page.impressions, clicks: page.clicks, ctr: round(page.ctr, 4), position: round(page.position, 1) } };
    const hold = activeHold(pageType);
    if (hold) {
      push({ ...base, action: "HOLD", reason: `${hold.reason} (held until ${hold.until}).` });
      continue;
    }
    const conv = conversion[pageType];
    if (conv && conv.rate != null && conv.rate < MODEL.informationalRate && !ARTIST_FAMILY.has(pageType)) {
      if (linked.has(path)) {
        push({ ...base, action: "HOLD", reason: "Already links to the near-show buying pages (selling-soon cohort). Measure that before adding more." });
        continue;
      }
      const buyingRate = measuredRate("artist_price_guide");
      push({
        ...base, action: "LINK",
        value: page.clicks * MODEL.linkFollowRate * buyingRate * MODEL.gbpPerClicker,
        evidence: { ...base.evidence, landings: conv.landings, clickers: conv.clickers },
        reason: `Ranks (${page.impressions} impressions) but its visitors don't click tickets (${conv.clickers} of ${conv.landings} ${pageType} landings). Send its visitors to near-show buying pages, e.g. add it to SELLING_SOON_PATHS once #1621 shows the block works. Value assumes 1 in 10 visitors follows the link.`
      });
      continue;
    }
    if (pageType === "blog") {
      const post = blogBySlug.get(path.split("/")[2]);
      const updated = Date.parse(`${post?.updated || post?.date || ""}T00:00:00Z`);
      const stale = Number.isFinite(updated) && now - updated > MODEL.staleBlogDays * DAY_MS;
      const noDates = (post?.related_artists || []).filter((related) => daysTo(related) == null);
      if (stale || noDates.length) {
        push({
          ...base, action: "REFRESH", artist: (post?.related_artists || [])[0] || "",
          value: page.clicks * MODEL.linkFollowRate * measuredRate("artist") * MODEL.gbpPerClicker,
          reason: [stale ? `last updated ${post.updated || post.date}` : "", noDates.length ? `no upcoming verified dates for ${noDates.join(", ")}` : ""].filter(Boolean).join("; ") + ". Recheck the facts it states."
        });
        continue;
      }
    }
    if (ARTIST_FAMILY.has(pageType) && slug && daysTo(slug) == null) {
      push({ ...base, action: "REFRESH", value: 0, reason: "Ranks, but the artist has no upcoming verified dates. Check for a new tour before spending anything else on it." });
      continue;
    }
    const band = positionBand(page.position);
    const expected = benchmarks[band];
    const headroom = page.impressions * (expected - page.ctr);
    if (page.position >= 3.5 && page.position <= 20.5 && expected > 0 && page.ctr < expected * MODEL.ctrShortfall && headroom >= MODEL.minHeadroomClicks) {
      push({
        ...base, action: "IMPROVE",
        value: headroom * measuredRate(pageType) * MODEL.gbpPerClicker * timing(slug),
        evidence: { ...base.evidence, bandCtr: round(expected, 4), headroomClicks: round(headroom, 1), pageTypeRate: round(rateOf(pageType), 3) },
        reason: `CTR ${pct(page.ctr)} against the site's ${pct(expected)} at positions ${band}. Rewrite the title and description to match what searchers ask.`
      });
    }
  }

  // 2. Artist-level search intent from the Queries export.
  const matchers = artistMatchers(artists);
  const intents = new Map();
  for (const query of queries) {
    const slug = matchArtist(query.key, matchers);
    if (!slug) continue;
    const intent = queryIntent(query.key);
    const key = `${slug}|${intent}`;
    const current = intents.get(key) || { slug, intent, impressions: 0, clicks: 0, top: [] };
    current.impressions += query.impressions;
    current.clicks += query.clicks;
    current.top.push([query.key, query.impressions]);
    intents.set(key, current);
  }
  const guideImpressions = new Map(pages.map((page) => [pathOf(page.key), page.impressions]));
  const bestBandCtr = benchmarks["6-10"] || 0;
  for (const demand of intents.values()) {
    if (demand.impressions < MODEL.minIntentImpressions) continue;
    const artist = artistBySlug.get(demand.slug);
    const topQueries = demand.top.sort((a, b) => b[1] - a[1]).slice(0, 3).map(([q]) => q);
    const evidence = { queryImpressions: demand.impressions, queryClicks: demand.clicks, topQueries, daysToNextShow: daysTo(demand.slug) };
    if (demand.intent === "price") {
      const guideUrl = `/artists/${demand.slug}/ticket-prices`;
      if (!guides.has(demand.slug)) {
        const ready = artist?.indexing_status === "indexable_with_substantial_content" && daysTo(demand.slug) != null;
        push({
          url: guideUrl, pageType: "artist_price_guide", artist: demand.slug, evidence,
          action: ready ? "CREATE" : "HOLD",
          value: ready ? demand.impressions * bestBandCtr * measuredRate("artist_price_guide") * MODEL.gbpPerClicker * timing(demand.slug) : 0,
          reason: ready
            ? `People search for ${artist.name} prices (${demand.impressions} impressions) and no price guide exists. Add it to PRICE_GUIDE_ARTISTS through the usual reviewed PR.`
            : "Price searches exist, but the artist is not indexable with verified upcoming dates yet. Needs facts first."
        });
      } else if ((guideImpressions.get(guideUrl) || 0) < demand.impressions * MODEL.guideShare) {
        // Every artist page with a live guide already links it in its lead
        // block (functions/[[path]].js, priceGuideLinkHtml), so the gap is
        // which page Google ranks for price searches: a targeting fix, not a link.
        push({
          url: guideUrl, pageType: "artist_price_guide", artist: demand.slug,
          evidence: { ...evidence, guideImpressions: guideImpressions.get(guideUrl) || 0 },
          action: "IMPROVE", titleChange: true,
          value: demand.impressions * bestBandCtr * measuredRate("artist_price_guide") * MODEL.gbpPerClicker * timing(demand.slug) * MODEL.recoverableShare,
          reason: `Price searches (${demand.impressions} impressions) land on other pages, not the guide (${guideImpressions.get(guideUrl) || 0}), although the artist page already links it near the top. Make the guide the clearer match for those searches (title, H1, anchor wording) and the artist page less so. Value assumes half the missed clicks are recoverable.`
        });
      }
    } else if (demand.intent === "decision") {
      const hasPost = blogPosts.some((post) => (post.related_artists || []).includes(demand.slug));
      if (hasPost) continue;
      const blogRate = rateOf("blog");
      const measured = blogRate != null && blogRate > 0;
      push({
        url: `/blog/ (new post: ${demand.slug})`, pageType: "blog", artist: demand.slug, evidence: { ...evidence, blogLandingRate: round(blogRate, 3) },
        action: measured ? "CREATE" : "HOLD",
        value: measured ? demand.impressions * bestBandCtr * blogRate * MODEL.gbpPerClicker * timing(demand.slug) : 0,
        reason: measured
          ? `A buying-decision question (${topQueries[0]}) has no post. Candidate for the weekly blog-ideas issue.`
          : `A buying-decision question (${topQueries[0]}) has no post, but blog visitors are not yet shown to click tickets. Holding until blog conversion is measured.`
      });
    }
  }

  // 3. High expected commission, little Google visibility: link to it.
  for (const [slug, value] of priorityByArtist) {
    if ((impressionsByArtist.get(slug) || 0) >= 50 || !artistBySlug.has(slug)) continue;
    push({
      url: `/artists/${slug}`, pageType: "artist", artist: slug,
      evidence: { artistImpressions: impressionsByArtist.get(slug) || 0, priorityRank: value.bestRank, expectedGbpWeek: round(value.expected), daysToNextShow: daysTo(slug) },
      action: "LINK",
      value: value.expected * 4 * MODEL.linkFollowRate,
      reason: `Show-priority rank ${value.bestRank} (about £${value.expected.toFixed(2)} a week expected) but little Google visibility. Link to it from the pages that do rank. Value assumes links lift it by a tenth.`
    });
  }

  const order = (a, b) => (a.action === "HOLD") - (b.action === "HOLD") || b.score - a.score || b.value - a.value || a.url.localeCompare(b.url);
  return { benchmarks: Object.fromEntries(Object.entries(benchmarks).map(([k, v]) => [k, round(v, 4)])), rows: rows.sort(order) };
}

// ── Output ─────────────────────────────────────────────────────────────────

const cell = (text) => String(text ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");

export function renderMarkdown({ rows, benchmarks }, { top = 15, generatedAt = "", sources = [] } = {}) {
  const actionable = rows.filter((row) => row.action !== "HOLD").slice(0, top);
  const held = rows.filter((row) => row.action === "HOLD").slice(0, 10);
  const counts = ACTIONS.map((action) => `${action} ${rows.filter((row) => row.action === action).length}`).join(", ");
  const table = (list) => [
    "| # | Action | URL | Value £ | Score | Why |",
    "|---|---|---|---|---|---|",
    ...list.map((row, i) => `| ${i + 1} | ${row.action} | \`${cell(row.url)}\` | ${row.value ?? 0} | ${row.score ?? 0} | ${cell(row.reason)} |`)
  ].join("\n");
  return [
    "# SEO opportunities",
    "",
    `Generated ${generatedAt}. Read-only: nothing was changed. ${counts}.`,
    "",
    "Value is a ranking aid, not a forecast: extra ticket-clickers over the export window × £0.45 (inferred, revenue plan 11 Oct 2026); score is value ÷ effort (LINK and REFRESH 1, IMPROVE 2, CREATE 4). Clicks are not sales.",
    "",
    sources.length ? `Sources: ${sources.join("; ")}.` : "",
    "",
    `Site CTR by position band: ${Object.entries(benchmarks).map(([band, ctr]) => `${band} ${pct(ctr)}`).join(", ")}.`,
    "",
    "## Act on",
    "",
    actionable.length ? table(actionable) : "Nothing cleared the thresholds.",
    "",
    "## Held",
    "",
    held.length ? table(held) : "Nothing held.",
    ""
  ].join("\n");
}
