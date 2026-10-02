import { TRUST_ROUTES, GUIDE_ROUTES, canonicalOrigin } from "./_route-metadata.js";
import { deriveCities, citySlug } from "./_cities.js";
import { deriveVenues } from "./_venues.js";
import { deriveIndexableArtistCities } from "./_artist-cities.js";
import { derivePosts as deriveBlogPosts, postIndexable as blogPostIndexable } from "./_blog.js";
import { artistPageIndexable } from "./_artist-indexability.js";
import { deriveOnsaleCalendar, ONSALE_LOOKAHEAD_DAYS } from "./_onsale-calendar.js";
import { deriveIndexablePriceGuides } from "./_price-guides.js";
import { resolveEventLocalDate } from "./_event-local-date.js";
import { eventIndexingPilotFor } from "./[[path]].js";
import { eventLifecycleHeld } from "./_route-indexability.js";

// llms.txt (https://llmstxt.org) — a curated index for answer engines and AI
// crawlers. Derived from _route-metadata.js and the artist data files (the
// same sources as sitemap.xml) so it cannot silently drift from the routes
// the site actually renders.


// Each file is fetched and parsed once per request: events.json is several
// megabytes and three sections of this document read it.
const assetsByEnv = new WeakMap();
function loadJsonAsset(env, pathname) {
  if (!env || typeof env !== "object") return fetchJsonAsset(env, pathname);
  if (!assetsByEnv.has(env)) assetsByEnv.set(env, new Map());
  const cache = assetsByEnv.get(env);
  if (!cache.has(pathname)) {
    // A failed load is not memoised, so one transient ASSETS error cannot
    // blank the file for every later read against this env.
    const load = fetchJsonAsset(env, pathname).catch(() => null).then((value) => {
      if (value === null) cache.delete(pathname);
      return value;
    });
    cache.set(pathname, load);
  }
  return cache.get(pathname);
}

async function fetchJsonAsset(env, pathname) {
  const response = await env?.ASSETS?.fetch(new Request(`https://assets.local${pathname}`));
  if (!response?.ok) return null;
  return response.json();
}

async function loadIndexableArtists(env) {
  try {
    const [catalog, artistsMeta] = await Promise.all([
      loadJsonAsset(env, "/data/catalog.json"),
      loadJsonAsset(env, "/data/artists.json")
    ]);
    if (!Array.isArray(catalog?.artists) || !Array.isArray(artistsMeta)) return [];

    // Keep durable artist URLs available to answer engines even when their
    // current event boards are empty. The pages state that honestly and fill
    // again when future events are added. Only an auto-promoted artist is gated
    // on upcoming dates (the same rule as its robots meta and the sitemap).
    // Every artist gate now reads events: an owner-promoted artist needs one
    // tracked date, an auto-promoted one three upcoming (artistPageIndexable).
    const events = await loadJsonAsset(env, "/data/events.json");
    const indexableSlugs = new Set(
      artistsMeta
        .filter((artist) => artist && artistPageIndexable(artist, Array.isArray(events) ? events : []))
        .map((artist) => String(artist?.slug || "").trim())
        .filter(Boolean)
    );

    return catalog.artists
      .filter((artist) => indexableSlugs.has(String(artist?.slug || "").trim()))
      .map((artist) => ({
        slug: String(artist.slug).trim(),
        name: String(artist?.name || "").trim() || String(artist.slug).trim(),
        description: String(artist?.short_description || "").trim()
      }));
  } catch (error) {
    return [];
  }
}

async function loadIndexableLocations(env, indexableArtistSlugs = []) {
  try {
    const events = await loadJsonAsset(env, "/data/events.json");
    if (!Array.isArray(events)) return { cities: [], venues: [], artistCities: [], priceGuides: [], onsale: null };
    return {
      onsale: deriveOnsaleCalendar(events),
      cities: deriveCities(events).filter((city) => city.indexable),
      venues: deriveVenues(events).filter((venue) => venue.indexable),
      artistCities: deriveIndexableArtistCities(events, indexableArtistSlugs),
      priceGuides: deriveIndexablePriceGuides(events, indexableArtistSlugs)
    };
  } catch (error) {
    return { cities: [], venues: [], artistCities: [], priceGuides: [], onsale: null };
  }
}

// Only posts that are indexable on the site are advertised here, so answer
// engines and the search index see the same blog surface.
async function loadIndexableBlogPosts(env) {
  try {
    return deriveBlogPosts(await loadJsonAsset(env, "/data/blog-content.json")).filter(blogPostIndexable);
  } catch (error) {
    return [];
  }
}

// Individual event pages are listed exactly while they are indexable: the
// active members of the event-indexing pilot (eventIndexingPilotFor, the same
// answer as their robots meta and the events sitemap). llms.txt lists every
// indexable route type, so an indexed event page belongs here too, and a
// noindex one never does. Empty (and the section omitted) when the flag is off
// or the request is not on the canonical host.
async function loadIndexedEventPages(env, requestOrigin, artistNameBySlug) {
  try {
    const [events, artists] = await Promise.all([loadJsonAsset(env, "/data/events.json"), loadJsonAsset(env, "/data/artists.json")]);
    const pilot = await eventIndexingPilotFor(env, requestOrigin, null, { events, artists });
    return pilot.indexed.map((member) => {
      const event = member.event || {};
      const artist = artistNameBySlug.get(String(event.artist_slug || "").trim()) || String(event.artist_name || "").trim() || String(event.artist_slug || "");
      return {
        path: member.path,
        name: `${artist} at ${String(event.venue || "").trim()}, ${String(event.city || "").trim()} — ${resolveEventLocalDate(event).iso}`
      };
    });
  } catch (error) {
    return [];
  }
}

// Citable per-artist facts for answer engines: how many upcoming dates the
// artist page lists, in how many cities, the venue-local date range, the tour
// name(s) and the next Ticketmaster public on-sale inside the /on-sale page's
// window (Ticketmaster's far-future "TBA" sentinel never qualifies). Every value is
// read from reviewed events.json records (the same rows the page renders);
// cancelled or postponed dates are left out, and nothing about price is said.
// An artist with no upcoming date gets no fact line rather than a zero.
const MAX_TOUR_NAMES = 2;
const DAY_MS = 24 * 60 * 60 * 1000;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatLocalDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

export function artistFactsBySlug(events, now = Date.now()) {
  const grouped = new Map();
  for (const event of Array.isArray(events) ? events : []) {
    if (!event || typeof event !== "object" || eventLifecycleHeld(event)) continue;
    const slug = String(event.artist_slug || "").trim();
    const showMs = Date.parse(String(event.datetime_iso || "").trim());
    if (!slug || !Number.isFinite(showMs) || showMs < now) continue;
    if (!grouped.has(slug)) grouped.set(slug, []);
    grouped.get(slug).push({ event, showMs });
  }
  const facts = new Map();
  for (const [slug, rows] of grouped) {
    rows.sort((a, b) => a.showMs - b.showMs);
    // Country-qualified, as the city pages are: Birmingham UK and Birmingham
    // US are two cities.
    const cities = new Set(rows.filter(({ event }) => String(event.city || "").trim()).map(({ event }) => citySlug(event.city, event.country)));
    // A range is printed only when every counted date resolves to a venue-local
    // day; otherwise an unresolved first or last show would shorten it.
    const localDates = rows.map(({ event }) => resolveEventLocalDate(event).iso);
    const allDatesResolved = localDates.every(Boolean);
    const tours = [...new Set(rows.map(({ event }) => String(event.tour_name || "").trim()).filter(Boolean))];
    const nextOnsaleMs = rows
      .map(({ event }) => Date.parse(String(event.public_onsale_at || "").trim()))
      .filter((ms) => Number.isFinite(ms) && ms > now && ms - now <= ONSALE_LOOKAHEAD_DAYS * DAY_MS)
      .sort((a, b) => a - b)[0];
    facts.set(slug, {
      showCount: rows.length,
      cityCount: cities.size,
      firstDate: allDatesResolved ? localDates[0] : "",
      lastDate: allDatesResolved ? localDates[localDates.length - 1] : "",
      tours: tours.slice(0, MAX_TOUR_NAMES),
      moreTours: Math.max(0, tours.length - MAX_TOUR_NAMES),
      nextOnsale: Number.isFinite(nextOnsaleMs) ? new Date(nextOnsaleMs).toISOString().slice(0, 16).replace("T", " ") : ""
    });
  }
  return facts;
}

export function artistFactsSentence(facts) {
  if (!facts || !facts.showCount) return "";
  const parts = [];
  let dates = `${facts.showCount} upcoming ${facts.showCount === 1 ? "date" : "dates"}`;
  if (facts.cityCount) dates += ` in ${facts.cityCount} ${facts.cityCount === 1 ? "city" : "cities"}`;
  if (facts.firstDate && facts.lastDate) {
    dates += facts.firstDate === facts.lastDate
      ? ` on ${formatLocalDate(facts.firstDate)}`
      : `, ${formatLocalDate(facts.firstDate)} to ${formatLocalDate(facts.lastDate)}`;
  }
  parts.push(dates);
  if (facts.tours.length) {
    const more = facts.moreTours ? ` and ${facts.moreTours} more` : "";
    parts.push(`Tour: ${facts.tours.join("; ")}${more}`);
  }
  if (facts.nextOnsale) parts.push(`Next Ticketmaster public on-sale: ${facts.nextOnsale} UTC`);
  return `${parts.join(". ")}.`;
}

function linkLine(origin, path, name, description) {
  const suffix = description ? `: ${description}` : "";
  return `- [${name}](${origin}${path})${suffix}`;
}

export async function onRequestGet({ request, env }) {
  const requestUrl = new URL(request.url);
  const origin = canonicalOrigin(`${requestUrl.protocol}//${requestUrl.host}`);

  const guideLines = Object.entries(GUIDE_ROUTES).map(([path, guide]) =>
    linkLine(origin, path, guide.h1 || guide.title, guide.description)
  );

  const blogPosts = await loadIndexableBlogPosts(env);
  const blogLines = blogPosts.length
    ? [
        linkLine(origin, "/blog", "TourTicketCompare blog", "How this site verifies links, reports prices, and decides what to publish."),
        ...blogPosts.map((post) => linkLine(origin, post.path, post.title, post.description))
      ]
    : [];

  const artists = await loadIndexableArtists(env);
  const locations = await loadIndexableLocations(env, artists.map((artist) => artist.slug));
  const facts = artistFactsBySlug(await loadJsonAsset(env, "/data/events.json"));
  const artistLines = artists.map((artist) => {
    const factLine = artistFactsSentence(facts.get(artist.slug));
    const description = [artist.description, factLine].filter(Boolean).join(" ");
    return linkLine(origin, `/artists/${artist.slug}`, artist.name, description);
  });
  const artistNameBySlug = new Map(artists.map((artist) => [artist.slug, artist.name]));
  const eventPages = await loadIndexedEventPages(env, `${requestUrl.protocol}//${requestUrl.host}`, artistNameBySlug);
  const eventLines = eventPages.map((page) =>
    linkLine(origin, page.path, page.name, "Checked ticket links for this one date, with each ticket site's listed-price snapshot where one is available.")
  );
  const artistCityLines = locations.artistCities.map((entry) =>
    linkLine(
      origin,
      entry.path,
      `${artistNameBySlug.get(entry.artistSlug) || entry.artistSlug} tickets in ${entry.label}`,
      `${entry.showCount} upcoming tracked ${entry.showCount === 1 ? "date" : "dates"} across ${entry.venueCount} ${entry.venueCount === 1 ? "venue" : "venues"}.`
    )
  );
  const priceGuideLines = locations.priceGuides.map((guide) =>
    linkLine(
      origin,
      guide.path,
      `${artistNameBySlug.get(guide.artistSlug) || guide.artistSlug} ticket prices`,
      `Where face value is sold, each date's lowest listed resale snapshot with its capture time, and recent price moves, for ${guide.showCount} upcoming ${guide.showCount === 1 ? "date" : "dates"} in ${guide.cityCount} ${guide.cityCount === 1 ? "city" : "cities"}.`
    )
  );
  const cityLines = [
    linkLine(origin, "/cities", "Concerts by city", "Browse substantial city pages built from reviewed upcoming tour dates."),
    ...locations.cities.map((city) =>
      linkLine(
        origin,
        `/cities/${city.slug}`,
        `Concerts in ${city.city}, ${city.country}`,
        `${city.showCount} upcoming tracked shows across ${city.artistCount} artists and ${city.venueCount} venues.`
      )
    )
  ];
  const venueLines = [
    linkLine(origin, "/venues", "Concert venues", "Browse venues with multiple upcoming tracked tour dates."),
    ...locations.venues.map((venue) =>
      linkLine(
        origin,
        `/venues/${venue.slug}`,
        `${venue.venue} concerts in ${venue.city}`,
        `${venue.showCount} upcoming tracked shows across ${venue.artistSlugs.length} artists.`
      )
    )
  ];

  // These four already lead the "Comparison methodology" section below.
  const methodologyPaths = new Set(["/compare-concert-ticket-prices", "/how-it-works", "/editorial-policy", "/affiliate-disclosure"]);
  const trustLines = Object.entries(TRUST_ROUTES)
    .filter(([path, route]) => path !== "/" && !methodologyPaths.has(path) && route.indexable)
    .map(([path, route]) => linkLine(origin, path, route.title.replace(" | TourTicketCompare", ""), route.description));

  const body = `# TourTicketCompare

> Independent, unofficial ticket research for major live music tours. The site publishes verified ticket links, reviewed event details, and timestamped provider-supplied listed-price snapshots when approved data passes exact-event, source, and freshness checks. It does not sell tickets or claim live inventory, guaranteed availability, or final checkout totals.

Updated: ${new Date().toISOString().slice(0, 10)}. Artist dates, city counts and on-sale times below are read from the same reviewed records as the pages they link to.

Key facts:

- TourTicketCompare is independent and unofficial; it is not affiliated with any artist or ticket provider.
- Ticket links are published only after the destination has been verified; unverified links are hidden.
- Event details (date, venue, city) appear only for reviewed event records.
- Provider listed-price snapshots appear only for the same verified event when approved provider data is fresh and correctly attributed. Not every linked provider supplies price snapshots; a provider can carry a verified ticket link without any displayed price.
- When multiple approved numeric snapshots for the same event are current and use the same currency, an event card may identify the lower displayed listed snapshot and the difference. Providers without numeric snapshots are not included in that comparison. Snapshots are not final checkout totals and may exclude fees.
- Some outbound links may earn a commission; this never changes the verification gates or the price shown by the provider.

## Comparison methodology

- [Compare concert ticket prices](${origin}/compare-concert-ticket-prices): Browse exact-event comparisons and the checks to make before buying.
- [How TourTicketCompare works](${origin}/how-it-works): Read the verification, source, and freshness rules.${
  locations.onsale?.indexable
    ? `\n${linkLine(origin, "/on-sale", "Concert tickets going on sale", `Ticketmaster public on-sale times for ${locations.onsale.upcomingCount} tracked upcoming ${locations.onsale.upcomingCount === 1 ? "date" : "dates"}, plus dates that went on sale in the last week.`)}`
    : ""
}
- [Editorial policy](${origin}/editorial-policy): See what the site publishes, withholds, and corrects.
- [Affiliate disclosure](${origin}/affiliate-disclosure): Understand which links may earn commission and why that does not alter the verification standard.

## Buying guides

${guideLines.join("\n")}
${
  blogLines.length
    ? `
## Blog

${blogLines.join("\n")}
`
    : ""
}
## Artist pages

${artistLines.join("\n")}

${priceGuideLines.length ? `## Artist ticket prices

${priceGuideLines.join("\n")}

` : ""}## Concerts by city

${cityLines.join("\n")}

## Concert venues

${venueLines.join("\n")}

## Artist tickets by city

${artistCityLines.length ? artistCityLines.join("\n") : "- No qualifying artist-city pages are currently active."}
${eventLines.length ? `
## Individual event pages

${eventLines.join("\n")}
` : ""}
## About the site

${trustLines.join("\n")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=UTF-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
