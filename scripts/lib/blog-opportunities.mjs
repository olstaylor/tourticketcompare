// Pure editorial discovery from committed facts. No prices, provider requests,
// inferred announcements, traffic estimates or content writes.
import { eventInstantMs, eventLocalDateIso } from "../../functions/_event-local-date.js";
import { showStartMs } from "../../functions/_upcoming.js";
import { eventLifecycleHeld } from "../../functions/_route-indexability.js";
import { normalizePresaleWindows, deriveArtistPresales } from "../../functions/_presales.js";
import { priceGuideRegistered } from "../../functions/_price-guides.js";
import { PROVIDER_LANES, safeLaneUrl, providerEventPublishable } from "./event-link-coverage.mjs";
import { isCalendarDate, SLUG_PATTERN } from "./content-markdown.mjs";

const DAY = 86400000;
export const MAX_RECOMMENDATIONS = 6;
export const FRESH_DAYS = 30;
export const HISTORY_WEEKS = 26;
export const HISTORY_LIMIT = HISTORY_WEEKS * MAX_RECOMMENDATIONS;
export const STATE_MARKER = "ttc-blog-ideas:v1";
const INDEXABLE = "indexable_with_substantial_content";
const KINDS = new Set(["sale", "presale", "nights"]);
const fail = (message) => { throw new Error(`Blog discovery: ${message}`); };
const text = (value) => typeof value === "string" && value.trim().length > 0;

export function weekOf(now) {
  if (!Number.isFinite(now)) fail("invalid evaluation time");
  const date = new Date(now);
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 6) % 7);
  return date.toISOString().slice(0, 10);
}

// Dates without an offset are not evidence of a sale instant. Year-9999
// placeholders and dates after the concert are excluded by the caller.
function saleInstant(value) {
  if (!text(value) || !isCalendarDate(value.slice(0, 10)) || !/T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value)) return NaN;
  return Date.parse(value);
}

function fresh(value, now) {
  if (!text(value) || !isCalendarDate(value)) return false;
  const age = now - Date.parse(`${value}T00:00:00Z`);
  return age >= 0 && age <= FRESH_DAYS * DAY;
}

function eventDate(event) {
  return eventLocalDateIso(event) || (/^\d{4}-\d{2}-\d{2}$/.test(event.datetime_iso) ? event.datetime_iso : "");
}

function unique(rows, field, label) {
  if (!Array.isArray(rows) || !rows.length) fail(`${label} must be a non-empty array`);
  const seen = new Set();
  for (const row of rows) {
    if (!row || !text(row[field]) || seen.has(row[field])) fail(`${label}: missing or duplicate ${field}`);
    seen.add(row[field]);
  }
}

export function validateSources({ events, artists, catalog, documents }, now) {
  weekOf(now);
  unique(events, "id", "events");
  unique(artists, "slug", "artists");
  unique(catalog?.artists, "slug", "catalog artists");
  unique(catalog.providers, "slug", "catalog providers");
  if (catalog.providers.some((provider) => typeof provider.public_enabled !== "boolean")) fail("invalid provider public flags");
  if (!Array.isArray(documents)) fail("missing Markdown content inventory");
  const artistSlugs = new Set(artists.map((artist) => artist.slug));
  const catalogSlugs = new Set(catalog.artists.map((artist) => artist.slug));
  for (const artist of artists) {
    if (!SLUG_PATTERN.test(artist.slug) || !text(artist.name) || !catalogSlugs.has(artist.slug)) fail("artist/catalog identity mismatch");
  }
  for (const event of events) {
    if (!artistSlugs.has(event.artist_slug) || !["city", "venue", "country", "datetime_iso"].every((key) => text(event[key]))) fail(`incomplete event ${event.id}`);
    if (!isCalendarDate(event.datetime_iso.slice(0, 10)) || !Number.isFinite(Date.parse(event.datetime_iso))) fail(`invalid event date: ${event.id}`);
    if (event.provider_links != null && (typeof event.provider_links !== "object" || Array.isArray(event.provider_links))) fail(`invalid provider evidence: ${event.id}`);
  }
  const files = new Set();
  for (const doc of documents) {
    if (!text(doc.file) || files.has(doc.file) || !text(doc.title) || !["published", "draft"].includes(doc.status) || !Array.isArray(doc.relatedArtists) || typeof doc.body !== "string") fail("invalid Markdown content inventory");
    if (doc.status === "published" && (!isCalendarDate(doc.modified) || !text(doc.body))) fail(`invalid published content: ${doc.file}`);
    files.add(doc.file);
  }
}

function ticketmasterEvidence(event, allowedHosts) {
  try {
    const url = new URL(event.ticketmaster_url);
    // Use the stored exact-event identity, including Ticketmaster's non-hex IDs.
    const id = event.ticketmaster_event_id;
    return text(id) && url.protocol === "https:" && !url.username && !url.password && !url.hash
      && allowedHosts.includes(url.hostname.replace(/^www\./, ""))
      && url.pathname.toLowerCase().split("/event/")[1]?.replace(/\/$/, "") === id.toLowerCase()
      && event.source_type === "ticketmaster" && event.source_url === event.ticketmaster_url;
  } catch { return false; }
}

// Coverage is a repository opportunity, not proof that production credentials
// are enabled. Require independently verified, fresh, matching destinations;
// never print their affiliate URLs in the issue.
function checkedLanes(event, providers, now) {
  return PROVIDER_LANES.filter((lane) => {
    const link = event.provider_links?.[lane.slug];
    return providers.get(lane.slug) === true && link?.verified === true
      && link.url === event[lane.urlField] && fresh(link.last_verified_at, now)
      && safeLaneUrl(event, lane) && providerEventPublishable(event, lane.slug, now);
  }).map((lane) => lane.name);
}

function overlaps(documents, artist) {
  const name = artist.name.toLowerCase();
  return documents.filter((doc) => doc.relatedArtists.includes(artist.slug)
    || `${doc.title} ${doc.body}`.toLowerCase().includes(name)
    || doc.file.includes(artist.slug));
}

function sameAngle(doc, artist, kind) {
  // General guides mentioning an artist are context, not artist-specific copies.
  const own = `${doc.title} ${doc.file}`.toLowerCase();
  if (!own.includes(artist.name.toLowerCase()) && !own.includes(artist.slug)) return false;
  const angle = own;
  if (kind === "presale") return /presale|pre-sale|code-only/.test(angle);
  if (kind === "sale") return /on-sale|onsale|on sale|ticket sale/.test(angle);
  return /choosing|choose|which night|exact.date|residency/.test(angle);
}

export function rankCandidates(candidates) {
  return [...candidates].sort((a, b) => b.score - a.score || a.deadline - b.deadline || a.key.localeCompare(b.key));
}

// Fresh, verified, Ticketmaster-evidenced upcoming events of indexable artists.
export function eligibleEvents(source, { now = Date.now() } = {}) {
  validateSources(source, now);
  const { events, artists, catalog } = source;
  const providers = new Map(catalog.providers.map((provider) => [provider.slug, provider.public_enabled === true]));
  const allowedHosts = catalog.providers.find((provider) => provider.slug === "ticketmaster")?.allowed_destination_hosts;
  if (!Array.isArray(allowedHosts) || !allowedHosts.length) fail("missing Ticketmaster host allowlist");
  const indexable = new Map(artists.filter((artist) => artist.indexing_status === INDEXABLE && !artist.demoted).map((artist) => [artist.slug, artist]));
  const eligible = [];
  let upcoming = 0;
  for (const event of events) {
    const at = eventInstantMs(event) ?? (/^\d{4}-\d{2}-\d{2}$/.test(event.datetime_iso) ? showStartMs(event) : NaN);
    if (!indexable.has(event.artist_slug) || eventLifecycleHeld(event)) continue;
    if (!Number.isFinite(at)) {
      if (event.datetime_iso.slice(0, 10) >= new Date(now).toISOString().slice(0, 10)) upcoming += 1;
      continue;
    }
    if (at < now) continue;
    upcoming += 1;
    if (!["human_verified", "machine_high_confidence"].includes(event.verification_status) || !fresh(event.last_verified_at, now) || !ticketmasterEvidence(event, allowedHosts)) continue;
    eligible.push({ ...event, at, lanes: checkedLanes(event, providers, now) });
  }
  // Ordinary expiry is a valid empty result. An active corpus with no fresh,
  // verified source is an outage, not a quiet week; leave the issue untouched.
  if (upcoming && !eligible.length) fail("no fresh, verified upcoming events; source evidence cannot be trusted");
  return { indexable, eligible, upcoming };
}

export function buildReport(source, { now = Date.now(), history = [] } = {}) {
  validateHistory(history, now);
  const { documents } = source;
  const week = weekOf(now);
  const { indexable, eligible, upcoming } = eligibleEvents(source, { now });
  const candidates = [];
  let duplicateCount = 0;
  for (const artist of indexable.values()) {
    const own = eligible.filter((event) => event.artist_slug === artist.slug).sort((a, b) => a.at - b.at || a.id.localeCompare(b.id));
    if (!own.length) continue;
    const overlap = overlaps(documents, artist);
    const add = (kind, title, intent, why, relevant, deadline, detail) => {
      const key = `${artist.slug}:${kind}`;
      const prior = history.some((entry) => entry.week < week && (
        (entry.key === key && now - Date.parse(entry.week) < 13 * 7 * DAY)
        || (entry.key.split(":")[0] === artist.slug && now - Date.parse(entry.week) < 4 * 7 * DAY)
      ));
      const copies = overlap.filter((doc) => sameAngle(doc, artist, kind));
      const draft = copies.some((doc) => doc.status === "draft");
      // A sale transition is concrete evidence to refresh existing copy. The
      // document must pre-date the sale; never call recent copy stale by age.
      const cited = copies.length === 1 ? relevant.filter((event) => copies[0].sources?.includes(event.source_url) || copies[0].body.includes(event.source_url)) : [];
      const update = kind === "sale" && detail.phase === "recent" && copies.length === 1 && copies[0].status === "published" && cited.length > 0
        && copies[0].modified < cited.map((event) => event.public_onsale_at.slice(0, 10)).sort()[0];
      if (prior || draft || (copies.length && !update)) { duplicateCount += 1; return; }
      if (update) relevant = cited;
      const comparable = relevant.filter((event) => event.lanes.length >= 2).length;
      const affiliate = relevant.some((event) => event.lanes.some((lane) => lane !== "Ticketmaster"));
      const scores = {
        buyingIntent: kind === "nights" ? 24 : 26,
        timeliness: deadline - now <= 14 * DAY ? 20 : 14,
        evidence: Math.min(20, 12 + relevant.length * 2),
        usefulness: kind === "nights" ? 14 : 12,
        internalLinks: comparable ? 10 : 6,
        longevity: kind === "nights" ? 8 : 3,
        overlap: update ? -4 : overlap.some((doc) => doc.status === "published") ? -8 : 0
      };
      const score = Object.values(scores).reduce((sum, value) => sum + value, 0);
      if (score < 70) return;
      const links = [`/artists/${artist.slug}`];
      if (priceGuideRegistered(artist.slug)) links.push(`/artists/${artist.slug}/ticket-prices`);
      if (kind === "presale" && deriveArtistPresales(own, artist.slug, now).windowCount) links.push(`/artists/${artist.slug}/presale`);
      const guide = kind === "nights" ? "how-to-read-a-ticket-listing" : "how-to-prepare-for-a-ticket-onsale";
      if (documents.some((doc) => doc.file === `content/guides/${guide}.md` && doc.status === "published")) links.push(`/guides/${guide}`);
      candidates.push({
        key, artist: artist.slug, kind, action: update ? "update" : "new", title: update ? `Update: ${copies[0].title}` : title,
        searchIntent: intent, why: update ? `The stored public on-sale for ${cited.length} event(s) cited by this article has passed since its last editorial update. Review its sale wording and current buying steps. ${why}` : why,
        evidence: relevant.slice(0, 4).map((event) => ({ id: event.id, date: eventDate(event), venue: event.venue, city: event.city, verified: event.last_verified_at, checkedProviders: event.lanes, ...detail.evidence(event) })),
        evidenceCount: relevant.length, links: update ? [...links, copies[0].path] : links,
        commercialBenefit: affiliate ? "Help buyers select an exact date and reach checked ticket routes, including approved affiliate lanes where enabled. No revenue or savings estimate." : "Bring sale-planning readers to the artist date board and verified ticket routes; affiliate conversion remains unproven for these dates.",
        overlap: overlap.map((doc) => ({ file: doc.file, title: doc.title, status: doc.status })),
        missingEvidence: ["Live inventory, checkout totals, production provider configuration and price movement are not established by repository data.", ...(kind === "presale" ? ["Eligibility, registration rules and codes are not established; only named public windows are stored."] : [])],
        score, scores, deadline, priority: score >= 85 ? "High — consider for the next editorial slot" : "Medium — publish only if the specific buying question adds value"
      });
    };
    const sales = own.filter((event) => {
      const at = saleInstant(event.public_onsale_at);
      return at >= now - 14 * DAY && at <= now + 21 * DAY && at < event.at;
    });
    for (const phase of ["upcoming", "recent"]) {
      const rows = sales.filter((event) => (saleInstant(event.public_onsale_at) > now) === (phase === "upcoming"));
      if (rows.length < 2) continue;
      add("sale", `${artist.name} tickets: ${phase === "upcoming" ? "prepare for the public sale" : "what to check after the public sale"}`,
        `${artist.name} tickets / public on-sale dates; buying preparation`,
        `${rows.length} verified upcoming dates have ${phase} public on-sales. Explain exact-event timing and primary versus resale checks without claiming availability.`,
        rows, phase === "upcoming" ? Math.min(...rows.map((event) => saleInstant(event.public_onsale_at))) : now,
        { phase, evidence: (event) => ({ publicOnsaleAt: event.public_onsale_at }) });
    }
    const presales = own.map((event) => ({ event, windows: normalizePresaleWindows(event.presales, now).filter((window) => {
      const at = saleInstant(window.start);
      const end = saleInstant(window.end);
      // Discovery also stores promotions, VIP sales and months-long reserved
      // ticket windows in sales.presales. They are not useful presale news.
      return /presale|pre-sale|prévente|preventa/i.test(window.name)
        && !/preferred|reserved|packages?|onsale|on.sale|discount|deal|pack|\$|offer/i.test(window.name)
        && end - at <= 7 * DAY && at <= now + 14 * DAY && end <= event.at
        && (at > now || (at >= now - 2 * DAY && end >= now + 2 * DAY));
    }) })).filter((row) => row.windows.length);
    if (presales.length >= 2) {
      const windows = new Map(presales.map((row) => [row.event.id, row.windows]));
      add("presale", `${artist.name} presales: windows and checks before buying`,
        `${artist.name} presale dates / how to prepare`,
        `${presales.length} upcoming dates list short named presale windows opening within 14 days or just opened with at least two days remaining. Explain timing and exact-date checks.`,
        presales.map((row) => row.event), Math.min(...presales.flatMap((row) => row.windows.map((window) => saleInstant(window.start)))),
        { evidence: (event) => ({ presales: windows.get(event.id).slice(0, 3), presaleWindowCount: windows.get(event.id).length }) });
    }
    const venues = new Map();
    for (const event of own.filter((event) => event.at <= now + 90 * DAY && event.lanes.length >= 2)) {
      const key = `${event.venue}|${event.city}|${event.country}`;
      venues.set(key, [...(venues.get(key) || []), event]);
    }
    for (const rows of venues.values()) {
      if (new Set(rows.map(eventDate)).size < 3) continue;
      add("nights", `${artist.name} in ${rows[0].city}: which concert night to choose?`,
        `${artist.name} ${rows[0].city} tickets / choosing a date`,
        `${rows.length} upcoming dates share ${rows[0].venue} in ${rows[0].city}, each with at least two fresh checked provider records. Help buyers distinguish dates and listing terms before comparing options.`,
        rows, rows[0].at, { evidence: () => ({}) });
    }
  }
  const seen = new Set();
  const recommendations = rankCandidates(candidates).filter((candidate) => {
    if (seen.has(candidate.artist)) return false;
    seen.add(candidate.artist);
    return true;
  }).slice(0, MAX_RECOMMENDATIONS);
  return { generatedAt: new Date(now).toISOString(), week, recommendations, diagnostics: { upcoming, trusted: eligible.length, withheld: upcoming - eligible.length, duplicates: duplicateCount } };
}

export function validateHistory(history, now) {
  if (!Array.isArray(history) || history.length > HISTORY_LIMIT) fail("invalid issue history");
  const seen = new Set();
  for (const entry of history) {
    const [slug, kind, extra] = String(entry?.key || "").split(":");
    if (!SLUG_PATTERN.test(slug) || !KINDS.has(kind) || extra || !isCalendarDate(entry.week) || weekOf(Date.parse(entry.week)) !== entry.week
      || entry.week > weekOf(now) || !text(entry.title) || entry.title.length > 300 || seen.has(`${entry.key}|${entry.week}`)) fail("invalid issue history entry");
    seen.add(`${entry.key}|${entry.week}`);
  }
}

export function parseHistory(body, now = Date.now()) {
  const matches = [...String(body || "").matchAll(/<!-- ttc-blog-ideas:v1\n([\s\S]*?)\n-->/g)];
  if (matches.length !== 1) fail("issue history marker is missing or duplicated; refusing to reset history");
  let state;
  try { state = JSON.parse(matches[0][1]); } catch { fail("issue history is malformed JSON"); }
  if (state?.version !== 1) fail("unsupported issue history version");
  validateHistory(state.history, now);
  return state.history;
}

export function nextHistory(history, report) {
  const now = Date.parse(report.generatedAt);
  validateHistory(history, now);
  const entries = new Map(history.filter((entry) => Date.parse(report.week) - Date.parse(entry.week) < HISTORY_WEEKS * 7 * DAY).map((entry) => [`${entry.key}|${entry.week}`, entry]));
  for (const candidate of report.recommendations) entries.set(`${candidate.key}|${report.week}`, { key: candidate.key, week: report.week, title: candidate.title.slice(0, 300) });
  return [...entries.values()].sort((a, b) => b.week.localeCompare(a.week) || a.key.localeCompare(b.key)).slice(0, HISTORY_LIMIT);
}

export function renderIssue(report, history, snapshot = null) {
  const escape = (value) => String(value).replace(/[\r\n]+/g, " ").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/([\\`*_\[\]])/g, "\\$1");
  const lines = [
    `# Weekly blog opportunities — ${report.week}`,
    "", `Generated ${report.generatedAt}. Propose-only: human editorial review and a content PR are required.`,
    "", `${report.recommendations.length} recommendation(s). ${report.diagnostics.trusted} fresh verified upcoming events; ${report.diagnostics.withheld} withheld for missing, stale or untrusted evidence; ${report.diagnostics.duplicates} overlapping or previously suggested angles suppressed.`,
    "", "Scores are editorial rules, not traffic, keyword or revenue metrics. No provider requests, AI API, live prices or production data writes.", ""
  ];
  if (snapshot) {
    if (!/^[\w.-]+\/[\w.-]+$/.test(snapshot.repository) || !/^[a-f0-9]{40}$/.test(snapshot.sha)) fail("invalid repository snapshot reference");
    lines.push(`Source snapshot: [${snapshot.sha.slice(0, 12)}](https://github.com/${snapshot.repository}/tree/${snapshot.sha}). All repository paths below refer to this commit.`, "");
  }
  if (!report.recommendations.length) lines.push("No sufficiently useful new topics this week. An empty shortlist is intentional.");
  for (const [index, candidate] of report.recommendations.entries()) {
    lines.push(`## ${index + 1}. ${escape(candidate.title)}`, "",
      `- **Priority:** ${candidate.priority} (${candidate.score}/100; ${candidate.action === "update" ? "update existing article" : "new article"}).`,
      `- **Search intent:** ${escape(candidate.searchIntent)}`,
      `- **Why publish:** ${escape(candidate.why)}`,
      `- **Commercial purpose:** ${escape(candidate.commercialBenefit)}`,
      `- **TTC links:** ${candidate.links.map((link) => `[${link}](https://tourticketcompare.com${link})`).join(" · ")}`,
      `- **Content overlap:** ${candidate.overlap.length ? candidate.overlap.map((doc) => `${escape(doc.title)} (${escape(doc.file)}, ${doc.status})`).join("; ") : "No artist-specific overlap found in Markdown titles, mentions or related_artists. This is a heuristic; review before writing."}`,
      `- **Missing evidence:** ${candidate.missingEvidence.map(escape).join(" ")}`,
      `- **Ranking:** ${Object.entries(candidate.scores).map(([key, value]) => `${key} ${value}`).join(", ")}.`,
      "", `**Repository evidence** — public/data/events.json (${candidate.evidenceCount} qualifying records; showing up to four). Artist eligibility: public/data/artists.json; checked provider records and public flags: public/data/catalog.json.`, "");
    for (const event of candidate.evidence) {
      lines.push(`- ${escape(event.id)}: ${event.date}, ${escape(event.venue)}, ${escape(event.city)}; verified ${event.verified}; fresh checked provider records: ${event.checkedProviders.join(", ") || "none"}.${event.publicOnsaleAt ? ` Stored public on-sale: ${event.publicOnsaleAt}.` : ""}${event.presales ? ` Windows (${event.presaleWindowCount} qualifying; showing up to three): ${event.presales.map((window) => `${escape(window.name)} (${window.start} → ${window.end})`).join("; ")}.` : ""}`);
    }
    lines.push("");
  }
  lines.push("## Recent suggestion history", "", "The issue retains 26 weeks of topic keys. Same angles cool down for 13 weeks; other angles for the same artist cool down for four weeks. Re-runs in the same UTC week do not consume another suggestion.", "",
    ...history.slice(0, 12).map((entry) => `- ${entry.week}: ${escape(entry.title)} (${escape(entry.key)})`), "",
    `<!-- ${STATE_MARKER}\n${JSON.stringify({ version: 1, history }).replace(/</g, "\\u003c").replace(/>/g, "\\u003e")}\n-->`);
  const body = lines.join("\n");
  if (body.length > 60000) fail("issue report exceeds the safe size limit");
  return body;
}
