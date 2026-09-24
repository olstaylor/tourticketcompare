// Auto-promote screen: criteria D1–D5 of the owner-approved auto-ingest plan
// (BACKLOG.md → Engineering track). Pure: every input is fetched by the caller,
// so the thresholds are testable against the batch evidence they came from.
// This only decides eligibility; nothing here writes data or promotes anyone.
//
//   node scripts/lib/artist-screen.mjs --self-test

// Same-name collision traps (propose ∪ forecast), plus the tribute/film-score
// shapes the 2026-09-22 batch showed the old patterns missed.
import { readFileSync } from "node:fs";
export const COLLISION_PATTERN =
  /\b(tribute|parking|experience|dance party|karaoke|vs\.?|night:|themed|drag brunch|orchestra plays|candlelight|celebration of|music of|sing-?along|in concert|floyd)\b/i;

export const THRESHOLDS = {
  minPrimaryShare: 0.8, // support acts screened 0–14%, co-headliners 45–70% (2026-09-09)
  minPrimaryEvents: 8,
  minQualifyingEvents: 3, // Oasis had 0 TM upcoming (2026-09-22)
  minCities: 2,
  minSeatGeekUpcoming: 1, // system-of-a-down / laura-pausini held at 1 and 0
  maxTitleLength: 60, // TSO (65) and The Psychedelic Furs (61) overflowed at Promote
};

const SUFFIX = " | TourTicketCompare";

export function normalizeName(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** The site's long title form, or the shorter one TSO already uses; null if neither fits. */
export function proposedTitle(name) {
  for (const form of [`${name} Tickets & Tour Dates${SUFFIX}`, `${name} Tickets & Dates${SUFFIX}`]) {
    if (form.length <= THRESHOLDS.maxTitleLength) return form;
  }
  return null;
}

function eventTime(event) {
  const start = event?.dates?.start;
  return Date.parse(start?.dateTime || (start?.localDate ? `${start.localDate}T00:00:00Z` : ""));
}

/**
 * @returns {{ eligible: boolean, reasons: string[], stats: object, seo_title: string|null }}
 */
/**
 * Parse the brand-safety denylist, failing closed: a missing, unreadable or
 * malformed file throws, so no screen or sensor ever runs without it.
 */
export function parseDenylist(text) {
  const denylist = JSON.parse(text);
  if (!denylist || !Array.isArray(denylist.names) || !Array.isArray(denylist.slugs)) {
    throw new Error("data/artist-denylist.json must hold `names` and `slugs` arrays");
  }
  return denylist;
}

export function screenCandidate({ name, slug, sg, tm, tmEvents = [], denylist = {}, urlStatus = {}, existingTitles = new Set(), now = Date.now() }) {
  const reasons = [];
  // D1 — exact identity on both APIs.
  if (!sg?.performer_id || normalizeName(sg.api_name) !== normalizeName(name)) reasons.push("D1: no exact SeatGeek performer match");
  if (!tm?.attraction_id || normalizeName(tm.api_name) !== normalizeName(name)) reasons.push("D1: no exact Ticketmaster attraction match");

  // D2 — collision pattern and denylist.
  if ([name, sg?.api_name, tm?.api_name].some((n) => n && COLLISION_PATTERN.test(n))) reasons.push("D2: name matches the collision pattern");
  const denied =
    (denylist.slugs || []).includes(slug) ||
    (denylist.names || []).map(normalizeName).includes(normalizeName(name)) ||
    (denylist.ticketmaster_attraction_ids || []).map(String).includes(String(tm?.attraction_id || "")) ||
    (denylist.seatgeek_performer_ids || []).map(String).includes(String(sg?.performer_id || ""));
  if (denied) reasons.push("D2: on the brand-safety denylist");
  // Music acts only, by Ticketmaster's own classification; a missing
  // classification fails closed. Comedy, theatre and sport are never promoted.
  if (tm?.attraction_id && tm?.segment !== "Music") reasons.push(`D2: Ticketmaster does not classify it as music (${tm?.segment || "no classification"})`);
  if (/tribute/i.test(String(tm?.sub_type || ""))) reasons.push("D2: Ticketmaster classifies it as a tribute act");

  // D3 — primary-attraction share over upcoming Ticketmaster events.
  const upcoming = tmEvents.filter((e) => eventTime(e) >= now);
  const primary = upcoming.filter((e) => e?._embedded?.attractions?.[0]?.id === tm?.attraction_id).length;
  const share = upcoming.length ? primary / upcoming.length : 0;
  if (upcoming.length < THRESHOLDS.minPrimaryEvents) reasons.push(`D3: ${upcoming.length} upcoming TM events (< ${THRESHOLDS.minPrimaryEvents})`);
  else if (share < THRESHOLDS.minPrimaryShare) reasons.push(`D3: primary-attraction share ${Math.round(share * 100)}% (< 80%)`);

  // D4 — on sale, or offsale with a future public on-sale (amendment 1), in enough cities.
  const qualifying = upcoming.filter((e) => {
    const code = e?.dates?.status?.code;
    if (code === "onsale") return true;
    const publicStart = Date.parse(e?.sales?.public?.startDateTime || "");
    return code === "offsale" && Number.isFinite(publicStart) && publicStart > now;
  });
  const cities = new Set(qualifying.map((e) => normalizeName(e?._embedded?.venues?.[0]?.city?.name)).filter(Boolean));
  if (qualifying.length < THRESHOLDS.minQualifyingEvents) reasons.push(`D4: ${qualifying.length} on-sale/scheduled TM events (< ${THRESHOLDS.minQualifyingEvents})`);
  if (cities.size < THRESHOLDS.minCities) reasons.push(`D4: ${cities.size} cities (< ${THRESHOLDS.minCities})`);
  if ((Number(sg?.num_upcoming_events) || 0) < THRESHOLDS.minSeatGeekUpcoming) reasons.push("D4: no upcoming SeatGeek events");
  // Both providers answer scripted requests with 401/403/429 (bot protection),
  // so a block means "exists, not script-verifiable" — the same reading as the
  // daily link audit (owner decision 2026-09-23). Only a confirmed 404/410 or
  // no response fails; the URL itself always comes from the provider's API.
  const blocked = [];
  for (const provider of ["seatgeek", "ticketmaster"]) {
    const status = urlStatus[provider];
    if (!status || status === 404 || status === 410) reasons.push(`D4: ${provider} artist page answered ${status || "no response"}`);
    else if ([401, 403, 429].includes(status)) blocked.push(provider);
  }

  // D5 — a shell title that fits and is unique.
  const seo_title = proposedTitle(name);
  if (!seo_title) reasons.push("D5: no title form fits 60 characters");
  else if (existingTitles.has(seo_title)) reasons.push("D5: title already used by another page");

  return {
    eligible: reasons.length === 0,
    reasons,
    seo_title,
    stats: { upcoming: upcoming.length, primary_share: Math.round(share * 100) / 100, qualifying: qualifying.length, cities: cities.size, link_blocked: blocked },
  };
}

function selfTest() {
  const now = Date.parse("2026-10-01T00:00:00Z");
  const ev = (i, { id = "K1", status = "onsale", city = `City${i % 4}`, publicStart } = {}) => ({
    dates: { start: { dateTime: `2027-0${1 + (i % 9)}-1${i % 10}T20:00:00Z` }, status: { code: status } },
    sales: publicStart ? { public: { startDateTime: publicStart } } : undefined,
    _embedded: { attractions: [{ id }], venues: [{ city: { name: city } }] },
  });
  const events = (n, opts) => Array.from({ length: n }, (_, i) => ev(i, typeof opts === "function" ? opts(i) : opts));
  const good = {
    name: "Kenny Chesney", slug: "kenny-chesney",
    sg: { performer_id: 1, api_name: "Kenny Chesney", num_upcoming_events: 12 },
    tm: { attraction_id: "K1", api_name: "Kenny Chesney", segment: "Music", sub_type: "" },
    tmEvents: events(20), urlStatus: { seatgeek: 200, ticketmaster: 200 }, now,
  };
  const run = (overrides) => screenCandidate({ ...good, ...overrides });
  const failures = [];
  const check = (cond, msg) => { if (!cond) failures.push(msg); };

  check(run({}).eligible, "a 100%-primary headliner with dates and live links is eligible (2026-09-22 picks)");
  check(!run({ tmEvents: events(20, (i) => ({ id: i < 3 ? "K1" : "K2" })) }).eligible, "a 15% support act is rejected (09-09: RJ Pasin, Avery Anna)");
  check(!run({ tmEvents: events(20, (i) => ({ id: i < 14 ? "K1" : "K2" })) }).eligible, "a 70% co-headliner is held for a human (09-09: Whitechapel)");
  check(!run({ tmEvents: [] }).eligible, "zero upcoming TM events is rejected (Oasis)");
  check(!run({ sg: { ...good.sg, num_upcoming_events: 0 } }).eligible, "zero SeatGeek upcoming is rejected (laura-pausini)");
  const offsale = events(20, { status: "offsale", publicStart: "2026-10-10T15:00:00Z" });
  check(run({ tmEvents: offsale }).eligible, "offsale dates with a future public on-sale count (amendment 1)");
  check(!run({ tmEvents: events(20, { status: "offsale" }) }).eligible, "offsale dates with no future on-sale do not count");
  check(!run({ tmEvents: events(20, { city: "Leeds" }) }).eligible, "a single-city run is rejected");
  check(!run({ name: "Brit Floyd", sg: { ...good.sg, api_name: "Brit Floyd" }, tm: { ...good.tm, api_name: "Brit Floyd" } }).eligible, "Brit Floyd is caught by the collision pattern");
  check(COLLISION_PATTERN.test("Twilight In Concert"), "Twilight In Concert is caught by the collision pattern");
  check(!run({ denylist: { names: ["kenny chesney"] } }).eligible, "a denylisted name is rejected");
  check(run({ urlStatus: { seatgeek: 403, ticketmaster: 429 } }).eligible, "a bot-protection block (403/429) is not a dead page");
  check(!run({ urlStatus: { seatgeek: 404, ticketmaster: 200 } }).eligible, "a confirmed 404 artist page is rejected");
  check(!run({ urlStatus: { seatgeek: 200, ticketmaster: 0 } }).eligible, "no response is rejected");
  check(proposedTitle("Trans-Siberian Orchestra") === "Trans-Siberian Orchestra Tickets & Dates | TourTicketCompare", "TSO falls back to the short title form (60 chars)");
  check(proposedTitle("The Psychedelic Furs").length <= 60, "The Psychedelic Furs gets a title within budget");
  check(!run({ existingTitles: new Set(["Kenny Chesney Tickets & Tour Dates | TourTicketCompare"]) }).eligible, "a duplicate title is rejected");
  check(!run({ name: "A Very Long Artist Name That Cannot Fit", sg: { ...good.sg, api_name: "A Very Long Artist Name That Cannot Fit" }, tm: { ...good.tm, api_name: "A Very Long Artist Name That Cannot Fit" } }).eligible, "a name no title form can fit is rejected");

  check(!run({ tm: { ...good.tm, segment: "Arts & Theatre" } }).eligible, "a comedian (Arts & Theatre) is rejected");
  check(!run({ tm: { ...good.tm, segment: "" } }).eligible, "a missing Ticketmaster classification fails closed");
  check(!run({ tm: { ...good.tm, sub_type: "Tribute Band" } }).eligible, "a Ticketmaster tribute band is rejected");
  const throws = (fn) => { try { fn(); return false; } catch { return true; } };
  check(throws(() => parseDenylist("")) && throws(() => parseDenylist("{}")) && throws(() => parseDenylist('{"names":[]}')), "a missing or malformed denylist fails closed");
  check(parseDenylist('{"names":["X"],"slugs":["x"]}').slugs[0] === "x", "a well-formed denylist parses");
  check(!throws(() => parseDenylist(readFileSync(new URL("../../data/artist-denylist.json", import.meta.url), "utf8"))), "the committed denylist is well formed");

  for (const f of failures) console.error(`  FAIL ${f}`);
  console.log(`[artist-screen] self-test: ${failures.length ? `${failures.length} failure(s)` : "all assertions passed"}`);
  return failures.length ? 1 : 0;
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href && process.argv.includes("--self-test")) {
  process.exit(selfTest());
}
