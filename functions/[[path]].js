import {
  TRUST_ROUTES,
  GUIDE_ROUTES,
  OLD_GUIDE_REDIRECTS,
  CANONICAL_HOST,
  META_DESCRIPTION_LENGTH_LIMIT,
  canonicalOrigin,
  isIndexableOrigin,
  fitTitleToBudget,
  withoutParentheticalQualifier
} from "./_route-metadata.js";
import { attachApprovedMarketplacePrices } from "./api/shows.js";
import { impactMarketplaceRuntimeConfig } from "./_impact-marketplace-config.js";
import { deriveVenues, findVenue } from "./_venues.js";
import { deriveCities, findCity, normalizeCountry } from "./_cities.js";
import { deriveArtistCities, findArtistCity, artistCityFootprint } from "./_artist-cities.js";
import { buildArtistContentModel, artistSearchIntro, artistPricingExplanation } from "./_artist-content.js";
import { artistPageIndexable, artistHasUpcomingShow } from "./_artist-indexability.js";

const PUBLIC_HTML_ROUTES = new Set([
  "/artists",
  "/compare-concert-ticket-prices",
  "/guides",
  "/how-it-works",
  "/currency-converter",
  "/affiliate-disclosure",
  "/editorial-policy",
  "/about",
  "/contact"
]);

const RESERVED_PREFIXES = ["/api/", "/data/"];
const RESERVED_FILES = new Set(["/app.js", "/styles.css", "/favicon.svg", "/robots.txt", "/sitemap.xml"]);

// Keep the highest-value editorial guide routable even if an edge deploy briefly
// serves stale route metadata. This fallback mirrors _route-metadata.js and
// prevents Googlebot/Search Console from seeing a transient 404/noindex response.
const EVENT_PRICE_GUIDE_PATH = "/guides/how-to-compare-event-ticket-prices";
const EVENT_PRICE_GUIDE_FALLBACK = {
  title: "How to Compare Event Ticket Prices | TourTicketCompare",
  h1: "How to Compare Event Ticket Prices",
  description:
    "Compare event ticket prices across concerts, sports, and theatre by matching the exact event, seat or section, ticket type, fees, and final checkout total.",
  fullContent: true,
  datePublished: "2026-07-14",
  lastmod: "2026-07-14"
};

// _headers applies to static-asset responses only, not to function-generated responses.
// These headers must be set explicitly on every HTML Response returned by this function.
const SECURITY_HEADERS = {
  // The sha256 hash authorizes the inline Google tag (gtag.js) snippet in public/index.html;
  // recompute it if that snippet's contents change (see scripts/smoke-prelaunch.mjs EXPECTED_CSP).
  "Content-Security-Policy":
    "default-src 'self'; img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com; style-src 'self'; script-src 'self' 'sha256-NA6Fs6EENO5v4wTsp2imB+jef7W4UHySG38JuT59oy0=' https://*.googletagmanager.com https://utt.impactcdn.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://utt.impactcdn.com; base-uri 'self'; frame-ancestors 'none'; object-src 'none'",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin"
};

function applySecurityHeaders(headers) {
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(name, value);
  }
}

function escapeAttr(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtml(value) {
  return escapeAttr(value).replace(/'/g, "&#39;");
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Meta descriptions for city, venue, and artist-city pages are composed from
// event data whose length is not bounded (venue lists, long venue names, date
// ranges), so a single template overflows Google's ~155-160 character display
// budget on the busiest pages. Each generator instead offers several phrasings
// from most to least detailed and takes the first that fits: an optional clause
// is dropped rather than a sentence being cut mid-word. The word-boundary clamp
// is a last-resort guard so an outlier record can never emit an overlong tag.
function clampMetaDescription(value) {
  const text = String(value || "").trim();
  if (text.length <= META_DESCRIPTION_LENGTH_LIMIT) return text;
  const cut = text.slice(0, META_DESCRIPTION_LENGTH_LIMIT);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:—–-]+$/, "")}.`;
}

function fitMetaDescription(...candidates) {
  const usable = candidates.map((candidate) => String(candidate || "").trim()).filter(Boolean);
  for (const candidate of usable) {
    if (candidate.length <= META_DESCRIPTION_LENGTH_LIMIT) return candidate;
  }
  return clampMetaDescription(usable.at(-1) || "");
}

function showAnchorId(show) {
  const id = slugify(show?.id);
  return id ? `show-${id}` : "";
}

async function loadCatalog(env) {
  try {
    const response = await env.ASSETS.fetch(new Request("https://assets.local/data/catalog.json"));
    if (!response.ok) return { artists: [], tours: [] };
    const data = await response.json();
    return data && typeof data === "object" ? data : { artists: [], tours: [] };
  } catch (error) {
    return { artists: [], tours: [] };
  }
}

async function loadEvents(env) {
  try {
    const response = await env.ASSETS.fetch(new Request("https://assets.local/data/events.json"));
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

async function loadArtistsMeta(env) {
  try {
    const response = await env.ASSETS.fetch(new Request("https://assets.local/data/artists.json"));
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

async function loadGuideContent(env) {
  try {
    const response = await env.ASSETS.fetch(new Request("https://assets.local/data/guides-content.json"));
    if (!response.ok) return {};
    const data = await response.json();
    return data && typeof data === "object" ? data : {};
  } catch (error) {
    return {};
  }
}

function normalizePath(pathname) {
  if (pathname !== "/" && pathname.endsWith("/")) return pathname.replace(/\/+$/, "");
  return pathname || "/";
}

function findArtist(catalog, slug) {
  return (catalog.artists || []).find((row) => slugify(row.slug) === slug);
}

function findTour(catalog, artistSlug, tourSlug) {
  return (catalog.tours || []).find((row) => slugify(row.artist_slug) === artistSlug && slugify(row.slug) === tourSlug);
}

async function routeForPath(pathname, env) {
  const path = normalizePath(pathname);
  if (OLD_GUIDE_REDIRECTS[path]) return { type: "redirect", location: OLD_GUIDE_REDIRECTS[path] };
  if (path === "/compare-concert-ticket-prices") return { type: "comparison-hub", path, ...TRUST_ROUTES[path] };
  if (path === "/" || PUBLIC_HTML_ROUTES.has(path)) return { type: "static", path, ...TRUST_ROUTES[path] };
  const guide = GUIDE_ROUTES[path] || (path === EVENT_PRICE_GUIDE_PATH ? EVENT_PRICE_GUIDE_FALLBACK : null);
  if (guide) {
    return {
      type: "guide",
      path,
      indexable: true,
      ...guide,
      breadcrumb: [
        { name: "Guides", path: "/guides" },
        { name: guide.title.replace(" | TourTicketCompare", ""), path }
      ]
    };
  }

  if (path === "/cities" || path.startsWith("/cities/")) {
    const cityEvents = await loadEvents(env);
    if (path === "/cities") {
      const cities = deriveCities(cityEvents).filter((city) => city.indexable);
      return {
        type: "cities-index",
        path,
        indexable: true,
        title: "Concerts by City | Upcoming Tour Dates | TourTicketCompare",
        description:
          "Browse cities with multiple upcoming tracked concerts across major artists, then open a city to match the artist, venue, date, and checked ticket options.",
        cities,
        breadcrumb: [{ name: "Cities", path: "/cities" }]
      };
    }
    const cityMatch = path.match(/^\/cities\/([a-z0-9-]+)$/);
    if (!cityMatch) return null;
    const city = findCity(cityEvents, cityMatch[1]);
    if (!city) return null;
    const artistsMeta = await loadArtistsMeta(env);
    const yearLabel = cityYearLabel(city);
    return {
      type: "city",
      path,
      indexable: city.indexable,
      // Shed the year label, then the long suffix, before truncating. The
      // city name itself is never dropped — it is what the page is about.
      title: fitTitleToBudget([
        `Concerts in ${city.city}${yearLabel ? ` ${yearLabel}` : ""} | Upcoming Shows & Tickets`,
        `Concerts in ${city.city} | Upcoming Shows & Tickets`,
        `Concerts in ${city.city} | Tickets`,
        `Concerts in ${city.city}`
      ]),
      description: cityMetaDescription(city, yearLabel),
      city,
      events: cityEvents,
      indexableArtistSlugs: artistsMeta
        .filter((artist) => artist?.indexing_status === "indexable_with_substantial_content")
        .map((artist) => slugify(artist?.slug)),
      breadcrumb: [
        { name: "Cities", path: "/cities" },
        { name: `${city.city}, ${city.country}`, path }
      ]
    };
  }

  if (path === "/venues" || path.startsWith("/venues/")) {
    const venueEvents = await loadEvents(env);
    if (path === "/venues") {
      const venues = deriveVenues(venueEvents).filter((venue) => venue.indexable);
      return {
        type: "venues-index",
        path,
        indexable: true,
        title: "Concert Venues & Upcoming Tour Dates | TourTicketCompare",
        description:
          "Browse concert venues and the upcoming tracked tour dates at each, with links to verified artist ticket pages and approved price snapshots where available.",
        venues,
        breadcrumb: [{ name: "Venues", path: "/venues" }]
      };
    }
    const venueMatch = path.match(/^\/venues\/([a-z0-9-]+)$/);
    if (!venueMatch) return null;
    const venue = findVenue(venueEvents, venueMatch[1]);
    if (!venue) return null;
    const artistsMeta = await loadArtistsMeta(env);
    return {
      type: "venue",
      path,
      indexable: venue.indexable,
      title: `${venue.venue} Concerts${venue.city ? ` in ${venue.city}` : ""} | Tickets`,
      description: venueMetaDescription(venue),
      venue,
      events: venueEvents,
      indexableArtistSlugs: artistsMeta
        .filter((artist) => artist?.indexing_status === "indexable_with_substantial_content")
        .map((artist) => slugify(artist?.slug)),
      breadcrumb: [
        { name: "Venues", path: "/venues" },
        { name: venue.venue, path }
      ]
    };
  }

  const [catalog, artistsMeta] = await Promise.all([loadCatalog(env), loadArtistsMeta(env)]);
  const artistMatch = path.match(/^\/artists\/([a-z0-9-]+)$/);
  if (artistMatch) {
    const artist = findArtist(catalog, artistMatch[1]);
    if (!artist) return null;
    const artistMetaRecord = artistsMeta.find(m => slugify(m.slug) === artistMatch[1]) || {};
    const enrichedArtist = { ...artist, indexing_status: artistMetaRecord.indexing_status || "" };
    // Indexability is dynamic: an editorially-indexable artist page is only
    // index,follow while it currently has an upcoming show. With zero upcoming
    // dates the board is empty (no dates, no ticket links), so the page
    // downgrades to noindex,follow and leaves the sitemap until a new verified
    // date lands. Shared with sitemap.xml.js so robots meta and sitemap agree.
    const artistEvents = await loadEvents(env);
    return {
      type: "artist",
      path,
      indexable: artistPageIndexable(enrichedArtist.indexing_status, artistEvents, artist.slug),
      title: artist.seo_title || `${artist.name} Tickets | Options & Availability`,
      description:
        artist.meta_description ||
        `Check ${artist.name} watchlist notes and verified ticket links where available, with practical buying guidance and transparent sourcing.`,
      artist: enrichedArtist,
      breadcrumb: [
        { name: "Artists", path: "/artists" },
        { name: artist.name, path }
      ]
    };
  }

  const ticketDuplicateMatch = path.match(/^\/artists\/([a-z0-9-]+)\/tickets$/);
  if (ticketDuplicateMatch) {
    const artist = findArtist(catalog, ticketDuplicateMatch[1]);
    if (artist) return { type: "redirect", location: `/artists/${artist.slug}` };
  }

  // Artist-city landing pages: /artists/<artist>/tickets/<city>. A four-segment
  // path, so it never collides with the two-segment tour route below or the
  // /artists/<artist>/tickets redirect above. Lifecycle (policy:
  // docs/ROUTE_INDEXABILITY_POLICY.md):
  //   - indexable artist + a multi-date city run (>=ARTIST_CITY_MIN_SHOWS
  //     publishable upcoming shows) -> 200 index,follow, self-canonical.
  //   - indexable artist + exactly one publishable upcoming show -> 200
  //     noindex,follow. The page is the artist board filtered to one show card,
  //     so it stays available and linked for navigation but does not compete
  //     with the artist page for a listing. It re-indexes by itself the moment
  //     a second date in that city is verified.
  //   - a real but currently-inactive combination (the artist has some event
  //     footprint in that city, but no publishable upcoming show right now, or
  //     the artist itself is under review) -> 301 to the artist hub, the most
  //     relevant surviving page. This is the *selective* redirect: it fires only
  //     for cities the artist has genuinely played, never for arbitrary slugs.
  //   - anything else (unknown artist, or a city the artist has never played)
  //     -> 404 via the shared not-found path (return null).
  const artistCityMatch = path.match(/^\/artists\/([a-z0-9-]+)\/tickets\/([a-z0-9-]+)$/);
  if (artistCityMatch) {
    const artist = findArtist(catalog, artistCityMatch[1]);
    if (!artist) return null;
    const cityEvents = await loadEvents(env);
    const artistMetaRecord = artistsMeta.find((m) => slugify(m.slug) === artistCityMatch[1]) || {};
    const artistIndexable = artistMetaRecord.indexing_status === "indexable_with_substantial_content";
    const artistCity = findArtistCity(cityEvents, artist.slug, artistCityMatch[2]);
    if (artistIndexable && artistCity && artistCity.hasPublishable) {
      const enrichedArtist = { ...artist, indexing_status: artistMetaRecord.indexing_status || "" };
      const indexableVenueSlugs = deriveVenues(cityEvents)
        .filter((venue) => venue.indexable)
        .map((venue) => venue.slug);
      const cityIndexable = deriveCities(cityEvents).some((c) => c.indexable && c.slug === artistCity.slug);
      // Only the artist's other *indexable* city runs are linked from here:
      // internal authority should flow to the pages that can rank, and every
      // single-date combination already keeps its inbound link from the artist
      // page's own by-city section, so nothing is orphaned.
      const otherCities = deriveArtistCities(cityEvents, artist.slug)
        .filter((c) => c.indexable && c.slug !== artistCity.slug);
      return {
        type: "artist-city",
        path,
        indexable: artistCity.indexable,
        title: artistCityTitle(enrichedArtist, artistCity),
        description: artistCityDescription(enrichedArtist, artistCity),
        artist: enrichedArtist,
        artistCity,
        events: cityEvents,
        otherCities,
        cityIndexable,
        indexableVenueSlugs,
        breadcrumb: [
          { name: "Artists", path: "/artists" },
          { name: artist.name, path: `/artists/${artist.slug}` },
          { name: `${artistCity.label} tickets`, path }
        ]
      };
    }
    // Expired / under-review / non-qualifying but genuine footprint: redirect to
    // the artist hub. Unknown city slugs fall through to a real 404.
    const footprint = artistCityFootprint(cityEvents, artist.slug);
    if (footprint.has(slugify(artistCityMatch[2]))) {
      return { type: "redirect", location: `/artists/${artist.slug}` };
    }
    return null;
  }

  const tourMatch = path.match(/^\/artists\/([a-z0-9-]+)\/([a-z0-9-]+)$/);
  if (tourMatch) {
    const artist = findArtist(catalog, tourMatch[1]);
    const tour = artist ? findTour(catalog, artist.slug, tourMatch[2]) : null;
    if (!artist || !tour) return null;
    return {
      type: "tour",
      path,
      indexable: tour.verified === true,
      title: tour.seo_title || `${tour.tour_name} Tickets | TourTicketCompare`,
      description: tour.meta_description || `Verified ticket information for ${tour.tour_name} by ${artist.name}.`,
      artist,
      tour,
      breadcrumb: [
        { name: "Artists", path: "/artists" },
        { name: artist.name, path: `/artists/${artist.slug}` },
        { name: tour.tour_name, path }
      ]
    };
  }

  const legacyTicketRoute = path.match(/^\/([a-z0-9-]+)-tickets(?:-[a-z0-9-]+)?$/);
  if (legacyTicketRoute) {
    const artist = findArtist(catalog, legacyTicketRoute[1]);
    if (artist) return { type: "redirect", location: `/artists/${artist.slug}` };
  }

  const legacyArtistRoute = path.match(/^\/([a-z0-9-]+)$/);
  if (legacyArtistRoute) {
    const artist = findArtist(catalog, legacyArtistRoute[1]);
    if (artist) return { type: "redirect", location: `/artists/${artist.slug}` };
  }

  return null;
}

function baseSchema(origin) {
  const organizationId = `${origin}/#organization`;
  const websiteId = `${origin}/#website`;
  return [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "TourTicketCompare",
      alternateName: "Tour Ticket Compare",
      url: `${origin}/`,
      description: "Independent ticket research for major live music tours with verified links and approved, timestamped provider price snapshots where available.",
      email: "hello@tourticketcompare.com",
      publishingPrinciples: `${origin}/editorial-policy`,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "editorial corrections and site feedback",
        email: "hello@tourticketcompare.com",
        url: `${origin}/contact`
      },
      logo: {
        "@type": "ImageObject",
        url: `${origin}/og-image.png`,
        width: 1200,
        height: 630
      }
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: "TourTicketCompare",
      alternateName: "Tour Ticket Compare",
      url: `${origin}/`,
      publisher: { "@id": organizationId },
      inLanguage: "en",
      description: "Independent ticket research for major live music tours with verified ticket links where available."
    }
  ];
}

function genericArtistFaq(artistName) {
  return [
    [
      `Does this page list ${artistName} tour dates?`,
      "No. This page does not publish tour dates unless event details have been verified. Use the verified ticket link, when available, to check current platform information."
    ],
    [
      `Does TourTicketCompare sell ${artistName} tickets?`,
      "No. TourTicketCompare does not sell tickets directly. We link to external ticketing platforms when a destination is verified."
    ],
    [
      "Are ticket prices shown here?",
      "A timestamped listed-price snapshot may appear when approved provider data for the exact event passes verification and freshness checks. It is not live inventory or a final checkout total; confirm the current price, fees, availability, and terms with the provider."
    ]
  ];
}

function artistFaqEntries(artist) {
  const custom = Array.isArray(artist.faq)
    ? artist.faq
        .filter((entry) => entry && typeof entry === "object" && entry.question && entry.answer)
        .map((entry) => [String(entry.question), String(entry.answer)])
    : [];
  return custom.length ? custom : genericArtistFaq(artist.name);
}

// Guides author their FAQ as a visible "FAQ" section in guides-content.json:
// bold questions followed by plain-paragraph answers. Parse that section so
// the same content is exposed as FAQPage JSON-LD without keeping a second
// copy that could drift from the rendered page.
function guideFaqEntries(guideEntry) {
  const sections = Array.isArray(guideEntry?.sections) ? guideEntry.sections : [];
  const faqSection = sections.find((section) => /^faq\b/i.test(String(section?.title || "").trim()));
  if (!faqSection) return [];
  const entries = [];
  let current = null;
  for (const block of String(faqSection.content || "").split(/\n{2,}/)) {
    const text = block.trim();
    const question = text.match(/^\*\*(.+?)\*\*$/);
    if (question) {
      current = { question: question[1], answers: [] };
      entries.push(current);
    } else if (current && text) {
      current.answers.push(text);
    }
  }
  return entries.filter((entry) => entry.answers.length).map((entry) => [entry.question, entry.answers.join(" ")]);
}

function faqPageSchema(questions) {
  return {
    "@type": "FAQPage",
    mainEntity: questions.map(([name, answer]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };
}

function faqSchema(route) {
  const questions =
    route.type === "artist"
      ? artistFaqEntries(route.artist)
      : [
          ["Is TourTicketCompare official?", "No. TourTicketCompare is independent and unofficial."],
          ["Does the site sell tickets directly?", "No. Ticket buying happens on the external provider site."],
          ["Why are some ticket buttons missing?", "Ticket buttons are hidden until the destination can be verified."],
          ["Can final prices change?", "Yes. External ticketing sites set their own prices, fees, availability, and checkout terms."]
        ];

  return faqPageSchema(questions);
}

// Only questions whose answer is specific to this city. The generic
// ticket-buying answers that used to sit here ("does the site sell tickets",
// "are snapshots final totals") repeated verbatim on every location page and
// were mirrored into FAQPage structured data on each one; both facts are still
// stated on the page, in the visible disclosure note, and explained at length
// in the linked guides. See docs/ROUTE_INDEXABILITY_POLICY.md § Shared content.
function cityFaqEntries(city) {
  const next = city.shows[0];
  const venues = [...new Set(city.shows.map((show) => show.venue))];
  return [
    [
      `What concerts does TourTicketCompare track in ${city.city}?`,
      `This page currently groups ${city.showCount} upcoming tracked concerts in ${city.city}, ${city.country}, across ${city.artistCount} artists and ${city.venueCount} venues. Coverage changes as reviewed dates pass or new dates are verified.`
    ],
    [
      `What is the next concert TourTicketCompare tracks in ${city.city}?`,
      next
        ? `The next currently tracked date is ${next.artist_name || next.artist_slug} at ${next.venue} on ${formatShowDateServer(next.datetime_iso, next.timezone)}. Check the artist page and provider before travelling because schedules and ticket details can change.`
        : "No upcoming reviewed date is currently available."
    ],
    [
      `Which ${city.city} venues are included?`,
      `The current page includes reviewed dates at ${venues.join(", ")}. It is selective coverage, not a complete directory of every concert venue in the city.`
    ],
    [
      `How current is this ${city.city} concert page?`,
      city.lastmod
        ? `The most recently checked event record on this page was verified ${formatVerificationDate(city.lastmod)}. Individual dates can have different verification dates, and expired dates are removed automatically.`
        : "Each date is tied to a reviewed event record, and expired dates are removed automatically."
    ]
  ];
}

function breadcrumbSchema(route, origin) {
  const items = [{ name: "Home", path: "/" }].concat(route.breadcrumb || []);
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${origin}${item.path}`
    }))
  };
}

function artistSchema(route, origin) {
  const type = route.artist.schema_type === "MusicGroup" || route.artist.slug === "bts" ? "MusicGroup" : "Person";
  return {
    "@type": type,
    "@id": `${origin}${route.path}#artist`,
    name: route.artist.name,
    url: `${origin}${route.path}`,
    sameAs: route.artist.official_website ? [route.artist.official_website] : undefined,
    description: route.artist.factual_summary
  };
}

// MusicEvent nodes are emitted only for shows that pass the same publishable
// gate as the visible show board (verified date + venue + artist; see
// docs/CONTENT_RULES.md). Offers, prices, and availability stay off every node
// by default — validate-route-schema.mjs fails the build if they appear — with
// one owner-approved exception (2026-07-22, SAFE_PUBLISHING_RULES.md): behind
// SCHEMA_OFFERS_ENABLED, an `offers` array may mirror the visible price badge
// for the redistribution-approved lanes in SCHEMA_OFFERS_APPROVED_PROVIDERS
// (see musicEventOffersSchema below). Availability is never emitted under any
// flag. `description` and `image` are composed only from already-verified
// facts (name/venue/city/date) and the site's own representative image, so
// they add Search Console coverage without inventing data. `organizer` and
// `endDate` stay omitted: we hold no verified promoter or event end time, and
// fabricating either would violate the never-invent rule.
// Shared MusicEvent node builder for the artist, venue, and city @graphs. Every
// field is composed from already-verified facts (name/venue/city/country/date)
// plus the site's own representative image; addressCountry is included only
// when the source record carries it. `offers` is always the output of the
// flag-gated musicEventOffersSchema (empty by default) so the never-emit-price
// invariant holds identically on every page type. `performer` is a reference to
// the page's Person/MusicGroup node on artist pages and an inline
// Person/MusicGroup on venue/city pages, which aggregate multiple artists.
function musicEventNode(show, origin, { displayName, performer, offers = [] }) {
  const name = displayName || show.artist_name || show.artist_slug;
  const displayDate = formatShowDateServer(show.dateTimeISO, show.timezone);
  const address = { "@type": "PostalAddress", addressLocality: show.city };
  if (show.country) address.addressCountry = show.country;
  return {
    "@type": "MusicEvent",
    name: show.event_name || `${name} — ${show.city}`,
    description: `${name} live at ${show.venue} in ${show.city}${displayDate ? ` on ${displayDate}` : ""}.`,
    image: `${origin}/og-image.png`,
    startDate: show.dateTimeISO,
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "Place", name: show.venue, address },
    performer,
    url: `${origin}/artists/${show.artist_slug}#${showAnchorId(show)}`,
    ...(offers.length ? { offers } : {})
  };
}

// Mirror of artistSchema's Person/MusicGroup selection so venue/city inline
// performers carry the same type the artist page uses.
function performerTypeForArtist(catalog, artistSlug) {
  const slug = slugify(artistSlug);
  const record = (catalog?.artists || []).find((artist) => slugify(artist?.slug) === slug);
  return record?.schema_type === "MusicGroup" || slug === "bts" ? "MusicGroup" : "Person";
}

function musicEventsSchema(route, origin, events, env = {}) {
  const artistId = `${origin}${route.path}#artist`;
  const offersEnabled = schemaOffersEnabledForArtist(env, route.artist.slug);
  return futureShowsForArtist(events, route.artist.slug, 6)
    .filter((show) => show.publishable && show.dateTimeISO && show.venue && show.city)
    .map((show) =>
      musicEventNode(show, origin, {
        displayName: route.artist.name,
        performer: { "@id": artistId },
        offers: offersEnabled ? musicEventOffersSchema(show, origin, env) : []
      })
    );
}

// MusicEvent nodes for the venue/city @graph. These pages already render an
// upcoming-shows listing (ItemList + visible show groups); this emits the
// matching Event structured data for exactly the publishable verified shows in
// that listing, keyed back to each show's original events.json record so the
// same publishable gate, offers gate, and provider provenance apply as on the
// artist board. The listing shows are aggregated (stripped of verification and
// provider fields), so each is re-enriched from the source event by id.
function musicEventsSchemaForListing(listingShows, events, origin, catalog, env, fallbackCountry = "") {
  const eventsById = new Map((events || []).map((ev) => [String(ev.id || "").trim(), ev]));
  const nodes = [];
  for (const listShow of (listingShows || []).slice(0, 50)) {
    const ev = eventsById.get(String(listShow?.id || "").trim());
    if (!ev) continue;
    const show = enrichEventAsShow(ev);
    if (!(show.publishable && show.dateTimeISO && show.venue && show.city && show.artist_slug)) continue;
    if (!show.country && fallbackCountry) show.country = normalizeCountry(fallbackCountry);
    const performer = {
      "@type": performerTypeForArtist(catalog, show.artist_slug),
      name: show.artist_name || show.artist_slug,
      url: `${origin}/artists/${show.artist_slug}`
    };
    const offers = schemaOffersEnabledForArtist(env, show.artist_slug) ? musicEventOffersSchema(show, origin, env) : [];
    nodes.push(musicEventNode(show, origin, { displayName: show.artist_name, performer, offers }));
  }
  return nodes;
}

// Schema offers are opt-in per environment (default off) and optionally scoped
// to a pilot artist list, so rollout and rollback are dashboard flag flips —
// the next render simply omits the nodes. Indexed copies age out under their
// own priceValidUntil; there is no revocation mechanism beyond recrawl.
function schemaOffersEnabledForArtist(env, artistSlug) {
  if (String(env?.SCHEMA_OFFERS_ENABLED || "").trim().toLowerCase() !== "true") return false;
  const pilotSlugs = String(env?.SCHEMA_OFFERS_PILOT_SLUGS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  return pilotSlugs.length === 0 || pilotSlugs.includes(String(artistSlug || ""));
}

// An Offer node may exist only when the same gate chain that renders the
// visible price badge on the provider CTA button passes on the same render:
// provider configured, event-level provenance publishable, tracked /api/out
// destination, approvedServerPriceLane (approved source, fresh unexpired
// cache row, finite price, ISO currency), and the badge formatting checks.
// Each Offer carries only price, priceCurrency, priceValidUntil (the snapshot
// row's expires_at — the machine-readable claim expires with the same row
// that hides the visible price), and the tracked /api/out URL. Availability
// and inventory are never emitted. Keep the gate chain in sync with
// renderShowCardServerHtml.
function musicEventOffersSchema(show, origin, env) {
  const laneSpecs = [];
  if (
    SCHEMA_OFFERS_APPROVED_PROVIDERS.includes("vivid-seats") &&
    vividSeatsOutAvailable(show, isVividSeatsConfigured(env))
  ) {
    laneSpecs.push({ slug: "vivid-seats", name: "Vivid Seats" });
  }
  for (const provider of IMPACT_MARKETPLACE_PROVIDERS) {
    if (!SCHEMA_OFFERS_APPROVED_PROVIDERS.includes(provider.slug)) continue;
    const publishable = show?.impactMarketplacePublishable?.[provider.slug] ?? providerEventPublishable(show, provider.slug);
    if (isImpactMarketplaceConfigured(env, provider) && publishable) {
      laneSpecs.push({ slug: provider.slug, name: provider.name });
    }
  }
  const offers = [];
  for (const spec of laneSpecs) {
    const href = eventTicketHref(show, spec.slug);
    const lane = href ? approvedServerPriceLane(show, spec.name) : null;
    if (!lane) continue;
    if (!formatServerPrice(lane.price, lane.currency) || !formatServerSnapshotTime(lane.fetchedAt)) continue;
    offers.push({
      "@type": "Offer",
      price: lane.price,
      priceCurrency: lane.currency,
      priceValidUntil: lane.expiresAt,
      url: `${origin}${href}`
    });
  }
  return offers;
}

function guideClusterTitle(path) {
  const cluster = GUIDE_CLUSTERS.find((entry) => entry.slugs.includes(path));
  return cluster ? cluster.title : undefined;
}

function articleSchema(route, origin, guideEntry = {}) {
  const organizationId = `${origin}/#organization`;
  const citations = (Array.isArray(guideEntry?.sources) ? guideEntry.sources : [])
    .map((source) => safeGuideSourceUrl(source?.url))
    .filter(Boolean);
  return {
    "@type": "Article",
    "@id": `${origin}${route.path}#article`,
    headline: route.title.replace(" | TourTicketCompare", ""),
    description: route.description,
    mainEntityOfPage: `${origin}${route.path}`,
    url: `${origin}${route.path}`,
    image: `${origin}/og-image.png`,
    author: {
      "@type": "Organization",
      "@id": organizationId,
      name: "TourTicketCompare editorial team",
      url: `${origin}/about`
    },
    publisher: { "@id": organizationId },
    isPartOf: { "@id": `${origin}/#website` },
    inLanguage: "en",
    datePublished: route.datePublished || undefined,
    dateModified: route.lastmod || route.datePublished || undefined,
    articleSection: guideClusterTitle(route.path),
    citation: citations.length ? citations : undefined
  };
}

function routeSchema(route, origin, guideContent = {}, events = [], catalog = {}, env = {}) {
  const graph = baseSchema(origin);
  if (route.breadcrumb) graph.push(breadcrumbSchema(route, origin));
  if (route.type === "artist") {
    graph.push(artistSchema(route, origin), faqSchema(route));
    if (route.indexable) graph.push(...musicEventsSchema(route, origin, events, env));
  }
  if (route.type === "guide") {
    const guideEntry = guideContent[route.path];
    graph.push(articleSchema(route, origin, guideEntry));
    const faqEntries = guideFaqEntries(guideEntry);
    if (faqEntries.length) graph.push(faqPageSchema(faqEntries));
    // Emit authored HowTo structured data from guides-content.json. Authored
    // Article objects are superseded by articleSchema above (avoid duplicates).
    const authored = guideEntry?.schema;
    if (authored && typeof authored === "object" && authored["@type"] === "HowTo") {
      const { "@context": _context, ...howTo } = authored;
      graph.push(howTo);
    }
  }
  if (route.type === "comparison-hub") {
    graph.push({
      "@type": "WebPage",
      "@id": `${origin}${route.path}#webpage`,
      url: `${origin}${route.path}`,
      name: route.title,
      description: route.description,
      isPartOf: { "@type": "WebSite", url: `${origin}/`, name: "TourTicketCompare" }
    });
    graph.push(faqPageSchema(comparisonHubFaqEntries()));
    graph.push(...comparisonHubItemListSchema(route, origin, catalog, events));
  }
  if (route.type === "cities-index") {
    const cities = route.cities || [];
    const dateModified = cities.map((city) => city.lastmod).filter(Boolean).sort().at(-1);
    graph.push({
      "@type": "CollectionPage",
      "@id": `${origin}${route.path}#webpage`,
      url: `${origin}${route.path}`,
      name: route.title,
      description: route.description,
      inLanguage: "en",
      dateModified: dateModified || undefined,
      publisher: { "@id": `${origin}/#organization` },
      isPartOf: { "@id": `${origin}/#website` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: cities.length,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: cities.map((city, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${city.city}, ${city.country}`,
          url: `${origin}/cities/${city.slug}`
        }))
      }
    });
  }
  if (route.type === "city" && route.city) {
    const city = route.city;
    graph.push({
      "@type": "Place",
      "@id": `${origin}${route.path}#place`,
      name: `${city.city}, ${city.country}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.city,
        addressCountry: city.country
      }
    });
    graph.push({
      "@type": "CollectionPage",
      "@id": `${origin}${route.path}#webpage`,
      url: `${origin}${route.path}`,
      name: route.title,
      description: route.description,
      inLanguage: "en",
      dateModified: city.lastmod || undefined,
      publisher: { "@id": `${origin}/#organization` },
      about: { "@id": `${origin}${route.path}#place` },
      isPartOf: { "@id": `${origin}/#website` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: city.shows.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: city.shows.slice(0, 50).map((show, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${show.artist_name || show.artist_slug} at ${show.venue} — ${formatShowDateServer(show.datetime_iso, show.timezone)}`,
          url: `${origin}/artists/${show.artist_slug}#${showAnchorId(show)}`
        }))
      }
    });
    // Structured data follows indexability. A noindex page cannot earn a rich
    // result, so emitting FAQPage from one only adds a near-duplicate copy of
    // the same markup across the site; the visible answers stay for the
    // visitor who is on the page. Same reasoning as the MusicEvent gate below.
    if (route.indexable) {
      graph.push(faqPageSchema(cityFaqEntries(city)));
      graph.push(...musicEventsSchemaForListing(city.shows, events, origin, catalog, env, city.country));
    }
  }
  if (route.type === "artist-city" && route.artistCity) {
    const artist = route.artist;
    const artistCity = route.artistCity;
    const performerType = performerTypeForArtist(catalog, artist.slug);
    const artistId = `${origin}/artists/${artist.slug}#artist`;
    graph.push({
      "@type": "Place",
      "@id": `${origin}${route.path}#place`,
      name: `${artistCity.city}, ${artistCity.country}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: artistCity.city,
        addressCountry: artistCity.country
      }
    });
    graph.push({
      "@type": "CollectionPage",
      "@id": `${origin}${route.path}#webpage`,
      url: `${origin}${route.path}`,
      name: route.title,
      description: route.description,
      inLanguage: "en",
      dateModified: artistCity.lastmod || undefined,
      publisher: { "@id": `${origin}/#organization` },
      about: { "@id": `${origin}${route.path}#place` },
      isPartOf: { "@id": `${origin}/#website` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: artistCity.shows.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: artistCity.shows.slice(0, 50).map((show, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${artist.name} at ${show.venue} — ${formatShowDateServer(show.datetime_iso, show.timezone)}`,
          url: `${origin}/artists/${artist.slug}#${showAnchorId(show)}`
        }))
      }
    });
    // Inline the performer (the artist page owns the canonical Person/MusicGroup
    // @id; here we reference it) and emit MusicEvent nodes for exactly the
    // publishable shows in this city's visible listing — same gate as the
    // artist board, offers off by default.
    graph.push({ "@type": performerType, "@id": artistId, name: artist.name, url: `${origin}/artists/${artist.slug}` });
    if (route.indexable) {
      // The visible FAQ block is rendered under the same condition, so schema
      // and page content stay aligned in both directions.
      graph.push(faqPageSchema(artistCityFaqEntries(artist, artistCity)));
      graph.push(
        ...musicEventsSchemaForListing(artistCity.shows, events, origin, catalog, env, artistCity.country)
      );
    }
  }
  if (route.type === "venues-index") {
    const venues = route.venues || [];
    const dateModified = venues.map((venue) => venue.lastmod).filter(Boolean).sort().at(-1);
    graph.push({
      "@type": "CollectionPage",
      "@id": `${origin}${route.path}#webpage`,
      url: `${origin}${route.path}`,
      name: route.title,
      description: route.description,
      inLanguage: "en",
      dateModified: dateModified || undefined,
      publisher: { "@id": `${origin}/#organization` },
      isPartOf: { "@id": `${origin}/#website` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: venues.length,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: venues.map((venue, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${venue.venue}, ${venue.city}`,
          url: `${origin}/venues/${venue.slug}`
        }))
      }
    });
  }
  if (route.type === "venue" && route.venue) {
    const venue = route.venue;
    graph.push({
      "@type": "MusicVenue",
      "@id": `${origin}${route.path}#venue`,
      name: venue.venue,
      url: `${origin}${route.path}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: venue.city || undefined,
        addressCountry: venue.country || undefined
      }
    });
    graph.push({
      "@type": "CollectionPage",
      "@id": `${origin}${route.path}#webpage`,
      url: `${origin}${route.path}`,
      name: route.title,
      description: route.description,
      inLanguage: "en",
      dateModified: venue.lastmod || undefined,
      publisher: { "@id": `${origin}/#organization` },
      about: { "@id": `${origin}${route.path}#venue` },
      isPartOf: { "@id": `${origin}/#website` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: venue.shows.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: venue.shows.map((show, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${show.artist_name || show.artist_slug} — ${formatShowDateServer(show.datetime_iso, show.timezone)}`,
          url: `${origin}/artists/${show.artist_slug}#${showAnchorId(show)}`
        }))
      }
    });
    if (route.indexable) {
      graph.push(faqPageSchema(venueFaqEntries(venue)));
      graph.push(...musicEventsSchemaForListing(venue.shows, events, origin, catalog, env, venue.country));
    }
  }
  if (route.faq) graph.push(faqSchema(route));
  return { "@context": "https://schema.org", "@graph": graph };
}

function providerEnabled(catalog, providerSlug) {
  return (catalog.providers || []).some((provider) => slugify(provider.slug) === providerSlug && provider.public_enabled === true);
}

function ticketLinksForArtist(catalog, artistSlug) {
  return (catalog.ticket_links || []).filter(
    (item) =>
      slugify(item.artist_slug) === artistSlug &&
      item.verified === true &&
      item.public_enabled === true &&
      item.affiliate_enabled === true &&
      providerEnabled(catalog, slugify(item.provider))
  );
}

function anchor(label, href, className = "text-link", attrs = "") {
  return `<a class="${escapeAttr(className)}" href="${escapeAttr(href)}"${attrs ? ` ${attrs}` : ""}>${escapeHtml(label)}</a>`;
}

function renderBreadcrumbHtml(route) {
  const items = [{ name: "Home", path: "/" }].concat(route.breadcrumb || []);
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${items
    .map((item, index) => {
      if (index === items.length - 1) return `<li aria-current="page">${escapeHtml(item.name)}</li>`;
      return `<li>${anchor(item.name, item.path, "")}</li>`;
    })
    .join("")}</ol></nav>`;
}

function artistHasVerifiedEventLinks(catalog, events, artistSlug) {
  return futureShowsForArtist(events, artistSlug, 6).some((show) => Boolean(
    show.id && (
      (show.publishable && safeShowTicketUrl(show.ticketmaster_url)) ||
      (show.seatgeekPublishable && safeSeatGeekTicketUrl(show.seatgeek_url)) ||
      (show.vividseatsPublishable && safeVividSeatsTicketUrl(show.vividseats_url)) ||
      IMPACT_MARKETPLACE_PROVIDERS.some((provider) =>
        (catalog?.providers || []).some((entry) => entry?.slug === provider.slug && entry?.public_enabled === true) &&
        show.impactMarketplacePublishable?.[provider.slug] &&
        safeImpactMarketplaceTicketUrl(show?.[provider.urlField], provider)
      )
    )
  ));
}

// Card state for an artist tile. The `dateless` flag is derived from the *same*
// gate that decides whether the artist page is indexable at all
// (functions/_artist-indexability.js), so a card can never promise dates that
// the page it links to does not have. An empty board is a real destination —
// bio, recent dates, and a watchlist signup — but it is not a "tickets and tour
// dates" answer, so the card says so before the click and the tile is sorted
// and styled as secondary. Keep in sync with artistCardStatus in public/app.js.
function artistCardStatus(catalog, artist, events) {
  const hasArtistLinks = ticketLinksForArtist(catalog, artist.slug).length > 0;
  const hasUpcoming = artistHasUpcomingShow(events, artist.slug);
  if (hasUpcoming && artistHasVerifiedEventLinks(catalog, events, artist.slug)) {
    return {
      pending: false,
      dateless: false,
      badgeClass: "status-badge",
      badge: "Dates listed",
      detail: "Ticket links for individual dates",
      cardStatus: "Ticket links are live for individual dates on this page.",
      ctaLabel: "View dates",
      ctaClass: "button button-primary"
    };
  }
  if (!hasArtistLinks) {
    return {
      pending: true,
      dateless: !hasUpcoming,
      badgeClass: "status-badge status-badge-muted",
      badge: "Being checked",
      detail: "Links appear once we've checked them",
      cardStatus: "We haven't published a ticket link for this artist yet.",
      ctaLabel: "View artist page",
      ctaClass: "button button-secondary"
    };
  }
  // Dates are on the page, but no individual date has a publishable ticket link
  // yet — the artist-level provider links are what the page can offer.
  if (hasUpcoming) {
    return {
      pending: false,
      dateless: false,
      badgeClass: "status-badge",
      badge: "Dates listed",
      detail: "Links to the artist's page on each provider",
      cardStatus: "Dates are listed; the links go to this artist's page on each provider.",
      ctaLabel: "View dates",
      ctaClass: "button button-primary"
    };
  }
  return {
    pending: false,
    dateless: true,
    badgeClass: "status-badge status-badge-muted",
    badge: "No dates yet",
    detail: "No announced dates — get an alert when they land",
    cardStatus: "No dates listed yet — the links go to this artist's page on each provider.",
    ctaLabel: "Get date alerts",
    ctaClass: "button button-secondary"
  };
}

function formatCardDate(iso, timezone) {
  const parts = venueDateParts(iso, timezone);
  if (!parts) return null;
  try {
    return parts.date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: parts.timeZone });
  } catch (error) {
    return null;
  }
}

// Keep in sync with upcomingVerifiedShowSummary in public/app.js.
function upcomingVerifiedShowSummary(events, artistSlug) {
  const shows = futureShowsForArtist(events, artistSlug, 500).filter((show) => show.publishable && safeShowTicketUrl(show.ticketmaster_url));
  if (!shows.length) return null;
  const next = formatCardDate(shows[0].dateTimeISO, shows[0].timezone);
  if (!next) return null;
  return `Next date: ${next} · ${shows.length} upcoming ${shows.length === 1 ? "date" : "dates"}`;
}

// Grid tier: artists with upcoming dates first, then empty boards, then
// unverified shells. Two reasons, both deliberate:
//   1. Visitors — the first thing on the grid is an artist who actually has
//      dates to buy for, instead of a tile that dead-ends on "No upcoming
//      dates yet".
//   2. Crawling — empty-board pages are noindex (see _artist-indexability.js),
//      so keeping them below the indexable tiles puts the homepage's most
//      prominent internal links on the pages search engines can actually keep.
//      The links stay followed: those pages are noindex,follow and their own
//      internal links still pass equity on.
function artistCardTier(status) {
  if (status.pending) return 2;
  return status.dateless ? 1 : 0;
}

function renderArtistLinks(catalog, events = []) {
  const cards = (catalog.artists || []).map((artist) => ({
    artist,
    status: artistCardStatus(catalog, artist, events)
  }));
  // Array#sort is stable, so catalog order is preserved inside each tier.
  cards.sort((a, b) => artistCardTier(a.status) - artistCardTier(b.status));
  return `<div class="artist-card-grid">${cards
    .map(({ artist, status }) => {
      const showSummary = status.pending ? null : upcomingVerifiedShowSummary(events, artist.slug);
      const cardClass = ["artist-card", status.pending ? "is-pending" : "", status.dateless ? "is-dateless" : ""]
        .filter(Boolean)
        .join(" ");
      return `<article class="${cardClass}"><h3>${escapeHtml(
        artist.name
      )}</h3><div class="artist-status-row"><p class="${status.badgeClass}">${escapeHtml(
        status.badge
      )}</p></div><p class="card-status">${escapeHtml(
        showSummary || status.detail
      )}</p>${anchor(status.ctaLabel, `/artists/${artist.slug}`, status.ctaClass)}</article>`;
    })
    .join("")}</div>`;
}

function cityShowCountLabel(count) {
  return `${count} upcoming ${count === 1 ? "show" : "shows"}`;
}

function cityArtistCountLabel(count) {
  return `${count} ${count === 1 ? "artist" : "artists"}`;
}

function cityVenueCountLabel(count) {
  return `${count} ${count === 1 ? "venue" : "venues"}`;
}

function cityYearLabel(city) {
  const years = [...new Set((city?.shows || [])
    .map((show) => new Date(show.datetime_iso).getUTCFullYear())
    .filter(Number.isFinite))].sort((a, b) => a - b);
  if (!years.length) return "";
  return years.length === 1 ? String(years[0]) : `${years[0]}–${years.at(-1)}`;
}

function cityMetaDescription(city, yearLabel) {
  const lead = `${city.showCount} reviewed upcoming concerts in ${city.city}, ${city.country}`;
  const year = yearLabel ? ` for ${yearLabel}` : "";
  const spread = `${cityArtistCountLabel(city.artistCount)} and ${cityVenueCountLabel(city.venueCount)}`;
  return fitMetaDescription(
    `See ${lead}${year}, across ${spread}. Compare dates, venues, and checked ticket options.`,
    `See ${lead}, across ${spread}. Compare dates, venues, and checked ticket options.`,
    `See ${lead}${year}. Compare dates, venues, and checked ticket options.`,
    `See ${lead}. Compare dates and checked ticket options.`
  );
}

function cityDateRangeLabel(city) {
  const first = city?.shows?.[0];
  const last = city?.shows?.at(-1);
  const firstLabel = formatShowDateServer(first?.datetime_iso, first?.timezone);
  const lastLabel = formatShowDateServer(last?.datetime_iso, last?.timezone);
  if (!firstLabel) return "";
  return lastLabel && lastLabel !== firstLabel ? `${firstLabel} to ${lastLabel}` : firstLabel;
}

function cityArtistsWithCounts(city) {
  const artists = new Map();
  for (const show of city?.shows || []) {
    if (!artists.has(show.artist_slug)) {
      artists.set(show.artist_slug, {
        slug: show.artist_slug,
        name: show.artist_name || show.artist_slug,
        shows: []
      });
    }
    artists.get(show.artist_slug).shows.push(show);
  }
  return [...artists.values()].sort(
    (a, b) => b.shows.length - a.shows.length || a.name.localeCompare(b.name)
  );
}

function renderCityAnswerSummary(city) {
  const next = city.shows[0];
  const range = cityDateRangeLabel(city);
  const checked = formatVerificationDate(city.lastmod);
  return `<section class="nested-panel" aria-labelledby="cityAnswerTitle"><h2 id="cityAnswerTitle">At a glance: upcoming concerts in ${escapeHtml(
    city.city
  )}</h2><p><strong>Short answer:</strong> TourTicketCompare currently tracks ${escapeHtml(
    cityShowCountLabel(city.showCount)
  )} in ${escapeHtml(city.city)}, covering ${escapeHtml(cityArtistCountLabel(city.artistCount))} at ${escapeHtml(
    cityVenueCountLabel(city.venueCount)
  )}. The list contains reviewed tour dates rather than every event taking place in the city.</p><div class="card-grid"><article class="info-card"><h3>Next tracked show</h3><p>${next ? `${escapeHtml(
    formatShowDateServer(next.datetime_iso, next.timezone)
  )}: ${anchor(next.artist_name || next.artist_slug, `/artists/${next.artist_slug}#${showAnchorId(next)}`)} at ${escapeHtml(next.venue)}.` : "No upcoming reviewed date is available."}</p></article><article class="info-card"><h3>Tracked date range</h3><p>${escapeHtml(
    range || "Dates are shown in the schedule below."
  )}</p></article><article class="info-card"><h3>Coverage</h3><p>${escapeHtml(
    `${city.artistCount} ${city.artistCount === 1 ? "artist" : "artists"}, ${city.venueCount} ${city.venueCount === 1 ? "venue" : "venues"}, ${city.showCount} ${city.showCount === 1 ? "date" : "dates"}.`
  )}</p></article><article class="info-card"><h3>Verification recency</h3><p>${checked ? `The most recently checked event record on this page was verified ${escapeHtml(checked)}.` : "Each date remains subject to the event-level verification shown on its artist page."}</p></article></div></section>`;
}

function renderCityArtistCoverage(city, indexableArtistSlugs = new Set()) {
  const items = cityArtistsWithCounts(city)
    .map((artist) => {
      const next = artist.shows[0];
      const label = `${artist.shows.length} upcoming ${artist.shows.length === 1 ? "date" : "dates"}; next tracked ${formatShowDateServer(
        next.datetime_iso,
        next.timezone
      )} at ${next.venue}`;
      const name = indexableArtistSlugs.has(artist.slug)
        ? anchor(artist.name, `/artists/${artist.slug}`)
        : escapeHtml(artist.name);
      return `<li><strong>${name}</strong> — ${escapeHtml(label)}.</li>`;
    })
    .join("");
  return `<section class="nested-panel"><h2>Which artists have upcoming concerts in ${escapeHtml(
    city.city
  )}?</h2><p>These artists have reviewed dates in the current ${escapeHtml(city.city)} coverage:</p><ul class="guide-link-list">${items}</ul></section>`;
}

function renderCityLinks(cities) {
  if (!cities.length) {
    return `<p class="muted">No city currently meets the substantial-coverage threshold. Cities appear here once multiple artists have verified upcoming dates.</p>`;
  }
  return `<div class="artist-card-grid">${cities
    .map((city) => `<article class="artist-card"><h3>${escapeHtml(city.city)}</h3><p class="card-status">${escapeHtml(
      city.country
    )}</p><p class="card-status">${escapeHtml(
      `${cityShowCountLabel(city.showCount)} · ${cityArtistCountLabel(city.artistCount)} · ${cityVenueCountLabel(city.venueCount)}`
    )}</p>${anchor(`View concerts in ${city.city}`, `/cities/${city.slug}`, "button button-secondary")}</article>`)
    .join("")}</div>`;
}

function renderCityProvenance(city) {
  const checked = formatVerificationDate(city.lastmod);
  return `<section class="guide-provenance" aria-label="Editorial and data information"><p><strong>Maintained by the TourTicketCompare editorial team.</strong>${
    checked ? ` The most recently checked event record on this page was verified ${escapeHtml(checked)}.` : ""
  }</p><p>Every listing comes from a reviewed upcoming event record. Expired dates are removed automatically, country aliases are normalized, and this page does not claim to cover every concert in ${escapeHtml(
    city.city
  )}. Read our ${anchor("editorial policy", "/editorial-policy")} and ${anchor(
    "how the site works",
    "/how-it-works"
  )}, or ${anchor("report an incorrect date", "/contact")}.</p></section>`;
}

function artistIndexableCities(events, artistSlug) {
  const target = slugify(artistSlug);
  return deriveCities(events).filter((city) => city.indexable && city.artistSlugs.includes(target));
}

function renderArtistCitiesHtml(events, artist) {
  const cities = artistIndexableCities(events, artist.slug);
  if (!cities.length) return "";
  const items = cities
    .slice(0, 30)
    .map((city) => `<li>${anchor(`${city.city}, ${city.country}`, `/cities/${city.slug}`)}</li>`)
    .join("");
  return `<section class="nested-panel"><h2>Cities on this run</h2><p>Who else is playing the cities ${escapeHtml(
    artist.name
  )} is visiting:</p><ul class="guide-link-list">${items}</ul></section>`;
}

function cityShowsByVenue(city) {
  const order = [];
  const byVenue = new Map();
  for (const show of city.shows) {
    if (!byVenue.has(show.venue_slug)) {
      byVenue.set(show.venue_slug, { slug: show.venue_slug, name: show.venue, shows: [] });
      order.push(show.venue_slug);
    }
    byVenue.get(show.venue_slug).shows.push(show);
  }
  return order.map((slug) => byVenue.get(slug));
}

function renderCityShowGroups(city, indexableArtistSlugs = new Set(), indexableVenueSlugs = new Set()) {
  return cityShowsByVenue(city)
    .map((group) => {
      const venueHeading = indexableVenueSlugs.has(group.slug)
        ? anchor(group.name, `/venues/${group.slug}`)
        : escapeHtml(group.name);
      const items = group.shows
        .map((show) => {
          const date = formatShowDateServer(show.datetime_iso, show.timezone) || "Date shown on the artist page";
          const artistLabel = show.artist_name || show.artist_slug;
          const artist = indexableArtistSlugs.has(show.artist_slug)
            ? anchor(artistLabel, `/artists/${show.artist_slug}#${showAnchorId(show)}`)
            : escapeHtml(artistLabel);
          const eventLabel = show.event_name || show.tour_name;
          return `<li><time datetime="${escapeAttr(show.datetime_iso)}">${escapeHtml(date)}</time> — ${artist}${
            eventLabel ? ` <span class="muted">(${escapeHtml(eventLabel)})</span>` : ""
          }</li>`;
        })
        .join("");
      return `<article class="nested-panel"><h3>${venueHeading}</h3><ul class="guide-link-list">${items}</ul></article>`;
    })
    .join("");
}

function cityForVenue(events, venue) {
  return deriveCities(events).find(
    (city) => city.indexable && city.city === venue.city && city.venueSlugs.includes(venue.slug)
  ) || null;
}

function venueLocationLabel(venue) {
  return [venue.city, venue.country].filter((part) => String(part || "").trim()).join(", ");
}

function venueShowCountLabel(count) {
  return `${count} upcoming ${count === 1 ? "show" : "shows"}`;
}

function venueArtistCountLabel(count) {
  return `${count} ${count === 1 ? "artist" : "artists"}`;
}

// Venue-specific questions only — see the note above cityFaqEntries().
function venueFaqEntries(venue) {
  const next = venue.shows[0];
  const artists = venueShowsByArtist(venue).map((artist) => artist.name);
  return [
    [
      `What upcoming concerts does TourTicketCompare track at ${venue.venue}?`,
      `This page currently groups ${venue.showCount} upcoming reviewed shows at ${venue.venue} across ${venue.artistSlugs.length} artists. It is selective TourTicketCompare coverage, not the venue's complete calendar.`
    ],
    [
      `What is the next concert TourTicketCompare tracks at ${venue.venue}?`,
      next
        ? `The next currently tracked date is ${next.artist_name || next.artist_slug} on ${formatShowDateServer(next.datetime_iso, next.timezone)}. Confirm the schedule with the artist and ticket provider before travelling.`
        : "No upcoming reviewed date is currently available."
    ],
    [
      `Which artists does TourTicketCompare currently track at ${venue.venue}?`,
      artists.length
        ? `The reviewed upcoming dates at ${venue.venue} are for ${artists.join(", ")}. Artists appear here only while they have a verified upcoming date at this venue.`
        : "No artist currently has a reviewed upcoming date at this venue."
    ],
    [
      `How current is this ${venue.venue} concert page?`,
      venue.lastmod
        ? `The most recently checked event record on this page was verified ${formatVerificationDate(venue.lastmod)}. Individual events can have different verification dates, and expired dates are removed automatically.`
        : "Each date is tied to a reviewed event record, and expired dates are removed automatically."
    ]
  ];
}

function renderVenueAnswerSummary(venue, indexableArtistSlugs = new Set()) {
  const next = venue.shows[0];
  const range = cityDateRangeLabel(venue);
  const artists = venueShowsByArtist(venue)
    .map((artist) => indexableArtistSlugs.has(artist.slug) ? anchor(artist.name, `/artists/${artist.slug}`) : escapeHtml(artist.name))
    .join(", ");
  return `<section class="nested-panel" aria-labelledby="venueAnswerTitle"><h2 id="venueAnswerTitle">At a glance: upcoming shows at ${escapeHtml(
    venue.venue
  )}</h2><p><strong>Short answer:</strong> TourTicketCompare currently tracks ${escapeHtml(
    venueShowCountLabel(venue.showCount)
  )} at ${escapeHtml(venue.venue)} across ${escapeHtml(venueArtistCountLabel(venue.artistSlugs.length))}. This is a reviewed subset rather than the venue's complete event calendar.</p><div class="card-grid"><article class="info-card"><h3>Next tracked show</h3><p>${next ? `${escapeHtml(
    formatShowDateServer(next.datetime_iso, next.timezone)
  )}: ${escapeHtml(next.artist_name || next.artist_slug)}.` : "No upcoming reviewed date is available."}</p></article><article class="info-card"><h3>Tracked date range</h3><p>${escapeHtml(
    range || "Dates are shown in the schedule below."
  )}</p></article><article class="info-card"><h3>Artists in this coverage</h3><p>${artists}</p></article><article class="info-card"><h3>Verification recency</h3><p>${venue.lastmod ? `The latest event record was checked ${escapeHtml(
    formatVerificationDate(venue.lastmod)
  )}.` : "Each event carries its own verification record."}</p></article></div></section>`;
}

function renderVenueProvenance(venue) {
  return `<section class="guide-provenance" aria-label="Editorial and data information"><p><strong>Maintained by the TourTicketCompare editorial team.</strong>${
    venue.lastmod ? ` The most recently checked event record on this page was verified ${escapeHtml(formatVerificationDate(venue.lastmod))}.` : ""
  }</p><p>Every listing comes from a reviewed upcoming event record, and expired dates are removed automatically. This page does not claim to reproduce ${escapeHtml(
    venue.venue
  )}'s complete calendar. Read our ${anchor("editorial policy", "/editorial-policy")}, see ${anchor(
    "how the site works",
    "/how-it-works"
  )}, or ${anchor("report an incorrect event", "/contact")}.</p></section>`;
}

function venueMetaDescription(venue) {
  const lead = `See ${venueShowCountLabel(venue.showCount)} at ${venue.venue}`;
  const city = venue.city ? ` in ${venue.city}` : "";
  const artists = ` across ${venueArtistCountLabel(venue.artistSlugs.length)}`;
  const tail = "Match the exact date, review checked ticket options, then confirm prices and fees with the provider.";
  // The city is the more useful qualifier on a venue page, so the artist count
  // is the first clause dropped when the full sentence does not fit.
  return fitMetaDescription(
    `${lead}${city}${artists}. ${tail}`,
    `${lead}${city}. ${tail}`,
    `${lead}${artists}. ${tail}`,
    `${lead}. ${tail}`,
    `${lead}. Match the exact date, then confirm prices and fees with the provider.`
  );
}

// Group a venue's upcoming shows by artist, preserving first-show chronological order.
function venueShowsByArtist(venue) {
  const order = [];
  const byArtist = new Map();
  for (const show of venue.shows) {
    if (!byArtist.has(show.artist_slug)) {
      byArtist.set(show.artist_slug, { slug: show.artist_slug, name: show.artist_name || show.artist_slug, shows: [] });
      order.push(show.artist_slug);
    }
    byArtist.get(show.artist_slug).shows.push(show);
  }
  return order.map((slug) => byArtist.get(slug));
}

function renderVenueLinks(venues) {
  if (!venues.length) {
    return `<p class="muted">No venue currently has at least three upcoming tracked dates across two artists. New venues appear here as tour dates are verified.</p>`;
  }
  return `<div class="artist-card-grid">${venues
    .map((venue) => {
      const location = venueLocationLabel(venue);
      return `<article class="artist-card"><h3>${escapeHtml(venue.venue)}</h3>${
        location ? `<p class="card-status">${escapeHtml(location)}</p>` : ""
      }<p class="card-status">${escapeHtml(
        `${venueShowCountLabel(venue.showCount)} · ${venueArtistCountLabel(venue.artistSlugs.length)}`
      )}</p>${anchor("View upcoming shows", `/venues/${venue.slug}`, "button button-secondary")}</article>`;
    })
    .join("")}</div>`;
}

// Indexable venues an artist has upcoming shows at, for the artist -> venue
// backlinks that complete the venue<->artist internal-linking loop.
function artistIndexableVenues(events, artistSlug) {
  const slug = slugify(artistSlug);
  return deriveVenues(events).filter((venue) => venue.indexable && venue.artistSlugs.includes(slug));
}

function renderArtistVenuesHtml(events, artist) {
  const venues = artistIndexableVenues(events, artist.slug);
  if (!venues.length) return "";
  const items = venues
    .slice(0, 30)
    .map((venue) => {
      const location = venueLocationLabel(venue);
      return `<li>${anchor(
        `${venue.venue}${location ? ` — ${location}` : ""}`,
        `/venues/${venue.slug}`
      )}</li>`;
    })
    .join("");
  return `<section class="nested-panel"><h2>Venues on this run</h2><p>What else is on at the venues ${escapeHtml(
    artist.name
  )} is playing:</p><ul class="guide-link-list">${items}</ul></section>`;
}

// Data-derived upcoming-tour summaries. Each card is composed only from the
// verified tour name / city / date carried on publishable event records (see
// deriveTourSummaries in _artist-content.js); nothing is invented.
function renderArtistTourSummariesHtml(tours, artist) {
  if (!Array.isArray(tours) || !tours.length) return "";
  const cards = tours
    .map((tour) => {
      const start = formatShowDateServer(tour.startISO, tour.startTimezone);
      const end = formatShowDateServer(tour.endISO, tour.endTimezone);
      const range = start && end && start !== end ? `${start} – ${end}` : start || end || "";
      const showLabel = `${tour.showCount} upcoming ${tour.showCount === 1 ? "date" : "dates"}`;
      const cityLabel = tour.cityCount
        ? ` across ${tour.cityCount} ${tour.cityCount === 1 ? "city" : "cities"}`
        : "";
      const citiesLine = tour.sampleCities.length
        ? `<p class="muted">Cities include ${escapeHtml(tour.sampleCities.join(", "))}${
            tour.cityCount > tour.sampleCities.length ? ", and more" : ""
          }.</p>`
        : "";
      return `<article class="info-card"><h3>${escapeHtml(tour.name)}</h3><p>${escapeHtml(
        `${showLabel}${cityLabel}.`
      )}</p>${range ? `<p class="muted">${escapeHtml(range)}</p>` : ""}${citiesLine}</article>`;
    })
    .join("");
  return `<section class="nested-panel"><h2>${escapeHtml(
    artist.name
  )} tours and dates</h2><p>The runs behind the dates listed above. Pick a date up there to get to the ticket links for it.</p><div class="card-grid">${cards}</div></section>`;
}

// Practical ticket-buying guide, from artistBuyingGuide in _artist-content.js.
function renderArtistBuyingGuideHtml(guide, artist) {
  const steps = guide.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("");
  return `<section class="nested-panel"><h2>How to buy ${escapeHtml(
    artist.name
  )} tickets</h2><p>${escapeHtml(guide.intro)}</p><ol class="check-list">${steps}</ol></section>`;
}

// Pricing explanation with a safe fallback, from artistPricingExplanation.
function renderArtistPricingHtml(pricing) {
  const points = pricing.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("");
  return `<section class="nested-panel"><h2>How ticket prices are shown here</h2><p>${escapeHtml(
    pricing.intro
  )}</p><ul class="check-list">${points}</ul></section>`;
}

// Artist -> artist-city crawl paths. Only rendered for editorially indexable
// artists, because artist-city pages exist only for those artists; every link
// points at a page that returns 200.
//
// The two groups are deliberately unequal. Multi-date city runs are the
// combinations that carry standalone value and stay indexable, so they get the
// prominent list with show counts. Single-date cities are `noindex,follow`
// pages, so they get a compact secondary list: still linked (a visitor who
// wants "the Denver date" gets there, and a crawler can still reach the page to
// see the noindex rather than being left to guess), just not given the same
// prominence as the pages that can rank. This mirrors the treatment empty-board
// artists already get on the homepage and /artists listings.
function renderArtistTicketCitiesHtml(events, artist) {
  if (artist?.indexing_status !== "indexable_with_substantial_content") return "";
  const cities = deriveArtistCities(events, artist.slug).filter((city) => city.hasPublishable);
  if (!cities.length) return "";
  const runs = cities.filter((city) => city.indexable);
  const singles = cities.filter((city) => !city.indexable);

  const runsHtml = runs.length
    ? `<p>Multi-date runs — the dates, venues, and ticket links for each city:</p><ul class="guide-link-list">${runs
        .slice(0, 40)
        .map(
          (city) =>
            `<li>${anchor(
              `${artist.name} tickets in ${city.label}`,
              `/artists/${artist.slug}/tickets/${city.slug}`
            )} — ${escapeHtml(cityShowCountLabel(city.showCount))}</li>`
        )
        .join("")}</ul>`
    : "";
  const singlesHtml = singles.length
    ? `<p class="muted">Single dates${runs.length ? " elsewhere" : ""}: ${singles
        .slice(0, 60)
        .map((city) => anchor(city.label, `/artists/${artist.slug}/tickets/${city.slug}`))
        .join(", ")}.</p>`
    : "";
  return `<section class="nested-panel"><h2>${escapeHtml(
    artist.name
  )} tickets by city</h2>${runsHtml}${singlesHtml}</section>`;
}

// The derived, data-driven artist content block. It is wrapped in a single
// [data-artist-extra-content] container so public/app.js can transplant the
// server-rendered markup unchanged during hydration (guaranteeing parity)
// instead of rebuilding it client-side.
function renderArtistExtraContentHtml(model, events, artist) {
  const inner = [
    renderArtistTourSummariesHtml(model.tours, artist),
    renderArtistTicketCitiesHtml(events, artist),
    renderArtistCitiesHtml(events, artist),
    renderArtistVenuesHtml(events, artist),
    renderArtistBuyingGuideHtml(model.buyingGuide, artist),
    renderArtistPricingHtml(model.pricing)
  ].join("");
  return `<div data-artist-extra-content>${inner}</div>`;
}

// ---- Artist-city landing pages (functions/_artist-cities.js) ---------------
// Metadata, FAQ, and section builders for /artists/<artist>/tickets/<city>.
// Every string is composed from already-verified event data (artist name, city,
// country, venue, date, show count) — no invented local facts, no price or
// availability claims, and no lowest-price ranking language (the show board's
// gated snapshot badges are the only place a price can ever appear).

function artistCityVenueLabel(artistCity) {
  const venues = artistCity.venues || [];
  if (!venues.length) return "";
  if (venues.length === 1) return venues[0];
  if (venues.length === 2) return `${venues[0]} and ${venues[1]}`;
  return `${venues[0]}, ${venues[1]}, and other venues`;
}

// The label carries ", Country" only when the city name is ambiguous across
// countries, so that suffix is kept ahead of the "| Compare Prices" tail — a
// disambiguating country matters more to a searcher than the tail does.
function artistCityTitle(artist, artistCity) {
  const label = artistCity.label;
  const shortLabel = withoutParentheticalQualifier(label);
  return fitTitleToBudget([
    `${artist.name} Tickets in ${label} | Compare Prices`,
    `${artist.name} Tickets in ${shortLabel} | Compare Prices`,
    `${artist.name} Tickets in ${shortLabel} | Tickets`,
    `${artist.name} Tickets in ${shortLabel}`
  ]);
}

function artistCityDescription(artist, artistCity) {
  const count = cityShowCountLabel(artistCity.showCount);
  const range = cityDateRangeLabel(artistCity);
  const venueLabel = artistCityVenueLabel(artistCity);
  const lead = `Compare tickets for ${artist.name} in ${artistCity.label}. View ${count}`;
  const wherePart = venueLabel ? ` at ${venueLabel}` : "";
  const whenPart = range ? ` (${range})` : "";
  const tail = "then check dates and provider terms before you buy.";
  // Fallback ladder: both clauses, then venue only, then date range only, then
  // neither. The venue is the distinguishing local fact on an artist-city page
  // (same reasoning as keeping the city on a venue page), so it outranks the
  // range when only one clause fits; a long multi-venue list overflows both of
  // the first two candidates anyway and falls through to the range.
  return fitMetaDescription(
    `${lead}${wherePart}${whenPart}, ${tail}`,
    `${lead}${wherePart}, ${tail}`,
    `${lead}${whenPart}, ${tail}`,
    `${lead}, ${tail}`
  );
}

function artistCityIntroSentence(artist, artistCity) {
  const count = cityShowCountLabel(artistCity.showCount);
  const range = cityDateRangeLabel(artistCity);
  const venueLabel = artistCityVenueLabel(artistCity);
  const pieces = [`We track ${count} for ${artist.name} in ${artistCity.city}, ${artistCity.country}`];
  if (venueLabel) pieces.push(`at ${venueLabel}`);
  if (range) pieces.push(range);
  return `${pieces.join(", ")}. Match the date you want, then compare checked ticket options before you buy.`;
}

// Questions specific to this artist in this city — see the note above
// cityFaqEntries(). Only rendered on indexable (multi-date) artist-city pages:
// on a single-date page every one of these restates the one show card that is
// already on screen.
function artistCityFaqEntries(artist, artistCity) {
  const next = artistCity.shows[0];
  const venues = artistCity.venues || [];
  const range = cityDateRangeLabel(artistCity);
  const entries = [
    [
      `How many ${artist.name} concerts are coming up in ${artistCity.city}?`,
      `TourTicketCompare currently tracks ${cityShowCountLabel(artistCity.showCount)} for ${artist.name} in ${artistCity.city}, ${artistCity.country}${
        range ? ` (${range})` : ""
      }. Coverage changes automatically as reviewed dates pass or new dates are verified.`
    ],
    [
      `Where does ${artist.name} play in ${artistCity.city}?`,
      venues.length
        ? `The tracked ${artistCity.city} ${venues.length === 1 ? "date is" : "dates are"} at ${venues.join(", ")}. This is selective reviewed coverage, not a full local calendar.`
        : `Venue details appear on each date once verified by the source.`
    ],
    [
      `What is the next ${artist.name} date in ${artistCity.city}?`,
      next
        ? `The next currently tracked date is ${formatShowDateServer(next.datetime_iso, next.timezone)} at ${next.venue}. Confirm the schedule and ticket details with the provider before travelling, because they can change.`
        : "No upcoming reviewed date is currently available."
    ],
    [
      `How current is this ${artist.name} ${artistCity.city} page?`,
      artistCity.lastmod
        ? `The most recently checked event record on this page was verified ${formatVerificationDate(artistCity.lastmod)}. Individual dates can have different verification dates, and expired dates are removed automatically.`
        : "Each date is tied to a reviewed event record, and expired dates are removed automatically."
    ]
  ];
  return entries;
}

function artistCityShowIdSet(artistCity) {
  return new Set((artistCity.shows || []).map((show) => String(show.id || "")).filter(Boolean));
}

function renderArtistCityAnswerSummary(artist, artistCity) {
  const next = artistCity.shows[0];
  const range = cityDateRangeLabel(artistCity);
  const checked = formatVerificationDate(artistCity.lastmod);
  const venuesLabel = (artistCity.venues || []).join(", ") || "Shown on each date";
  const runNote = artistCity.multiNightSameVenue
    ? ` This is a multi-night run at the same venue.`
    : "";
  return `<section class="nested-panel" aria-labelledby="artistCityAnswerTitle"><h2 id="artistCityAnswerTitle">At a glance: ${escapeHtml(
    artist.name
  )} in ${escapeHtml(artistCity.city)}</h2><p><strong>Short answer:</strong> TourTicketCompare tracks ${escapeHtml(
    cityShowCountLabel(artistCity.showCount)
  )} for ${escapeHtml(artist.name)} in ${escapeHtml(artistCity.city)}, ${escapeHtml(
    artistCity.country
  )}, across ${escapeHtml(cityVenueCountLabel(artistCity.venueCount))}.${escapeHtml(
    runNote
  )}</p><div class="card-grid"><article class="info-card"><h3>Next tracked date</h3><p>${next ? `${escapeHtml(
    formatShowDateServer(next.datetime_iso, next.timezone)
  )} at ${escapeHtml(next.venue)}.` : "No upcoming reviewed date is available."}</p></article><article class="info-card"><h3>Tracked date range</h3><p>${escapeHtml(
    range || "Shown in the schedule below."
  )}</p></article><article class="info-card"><h3>Venues</h3><p>${escapeHtml(
    venuesLabel
  )}</p></article><article class="info-card"><h3>Verification recency</h3><p>${checked ? `Most recent event record checked ${escapeHtml(
    checked
  )}.` : "Each date carries its own verification record."}</p></article></div></section>`;
}

// Links out from an artist-city page: the artist hub, the shared multi-artist
// city page and venue pages where those already qualify for indexing, and the
// artist's other indexable city runs. Descriptive anchors, no keyword-link block.
function renderArtistCityRelatedLinks(artist, artistCity, otherCities, cityIndexable, indexableVenueSlugs) {
  const venueSlugSet = new Set(indexableVenueSlugs || []);
  const parts = [];
  const cityLinks = [];
  if (cityIndexable) {
    cityLinks.push(`<li>${anchor(`All concerts in ${artistCity.city}`, `/cities/${artistCity.slug}`)}</li>`);
  }
  for (const slug of artistCity.venueSlugs || []) {
    if (!venueSlugSet.has(slug)) continue;
    const venueName = (artistCity.shows.find((show) => show.venue_slug === slug) || {}).venue || slug;
    cityLinks.push(`<li>${anchor(`Upcoming shows at ${venueName}`, `/venues/${slug}`)}</li>`);
  }
  if (cityLinks.length) {
    parts.push(
      `<section class="nested-panel"><h2>More concerts in ${escapeHtml(
        artistCity.city
      )}</h2><ul class="guide-link-list">${cityLinks.join("")}</ul></section>`
    );
  }
  const others = (otherCities || []).slice(0, 24);
  if (others.length) {
    const items = others
      .map((city) => `<li>${anchor(`${artist.name} tickets in ${city.label}`, `/artists/${artist.slug}/tickets/${city.slug}`)}</li>`)
      .join("");
    parts.push(
      `<section class="nested-panel"><h2>Other cities on the ${escapeHtml(
        artist.name
      )} run</h2><p>See ${escapeHtml(artist.name)} dates and checked ticket options in other cities:</p><ul class="guide-link-list">${items}</ul></section>`
    );
  }
  return parts.join("");
}

function renderVenueShowGroups(venue, events = [], indexableArtistSlugs = new Set(), seatGeekAvailable = false, vividSeatsAvailable = false, marketplaceAvailability = {}) {
  const venueRuns = venueRunIndex(venue.shows);
  const eventsById = new Map(
    (Array.isArray(events) ? events : [])
      .filter((event) => event && event.id)
      .map((event) => [String(event.id), event])
  );
  return venueShowsByArtist(venue)
    .map((group) => {
      const cards = group.shows
        .map((show) => {
          const sourceEvent = eventsById.get(show.id);
          const fullShow = sourceEvent ? futureShowsForArtist([sourceEvent], group.slug, 1)[0] : null;
          return fullShow
            ? renderShowCardServerHtml(
                fullShow,
                seatGeekAvailable,
                indexableArtistSlugs.has(group.slug),
                vividSeatsAvailable,
                group.name,
                marketplaceAvailability,
                group.slug,
                venueRuns
              )
            : "";
        })
        .join("");
      return `<article class="nested-panel"><h3>${anchor(
        `${group.name} at ${venue.venue}`,
        `/artists/${group.slug}`
      )}</h3><div class="card-grid show-card-grid venue-show-cards">${cards}</div>${anchor(
        `View all ${group.name} dates and ticket options`,
        `/artists/${group.slug}`,
        "text-link"
      )}</article>`;
    })
    .join("");
}

const GUIDE_CLUSTERS = [
  {
    title: "Compare prices and fees",
    intro: "Compare final checkout totals, fees, and provider terms before you decide.",
    slugs: [
      "/guides/how-to-compare-event-ticket-prices",
      "/guides/how-to-compare-concert-ticket-prices",
      "/guides/how-to-avoid-overpaying-for-concert-tickets",
      "/guides/concert-ticket-fees-explained",
      "/guides/why-ticket-prices-change",
      "/guides/ticketmaster-vs-seatgeek-vs-vivid-seats",
      "/guides/seatgeek-vs-ticketmaster"
    ]
  },
  {
    title: "Buy safely",
    intro: "Check legitimacy, avoid risky sellers, and understand what to verify before payment.",
    slugs: [
      "/guides/how-to-avoid-ticket-scams",
      "/guides/ticketmaster-vs-stubhub",
      "/guides/seatgeek-promo-code-guide"
    ]
  },
  {
    title: "Understand resale and listings",
    intro: "Understand how resale listings, transfer timing, and provider protections can differ.",
    slugs: [
      "/guides/primary-vs-resale-concert-tickets",
      "/guides/how-resale-ticket-pricing-works",
      "/guides/how-to-read-a-ticket-listing",
      "/guides/ticket-delivery-and-transfer-timing"
    ]
  },
  {
    title: "Timing and planning",
    intro: "Plan when to buy and what to check before committing to a ticket.",
    slugs: [
      "/guides/when-is-the-best-time-to-buy-concert-tickets",
      "/guides/how-to-prepare-for-a-ticket-onsale",
      "/guides/what-to-do-if-a-concert-is-postponed-or-cancelled"
    ]
  }
];

function guideCardHtml(path) {
  const guide = GUIDE_ROUTES[path];
  if (!guide) return "";
  return `<article class="info-card"><h3>${anchor(guide.h1, path, "guide-card-link")}</h3><p>${escapeHtml(guide.description)}</p></article>`;
}

function renderGuideClusters() {
  const clustered = new Set();
  const clusterSections = GUIDE_CLUSTERS.map((cluster) => {
    const cards = cluster.slugs
      .map((path) => {
        clustered.add(path);
        return guideCardHtml(path);
      })
      .join("");
    return `<section class="nested-panel"><h2>${escapeHtml(cluster.title)}</h2><p>${escapeHtml(
      cluster.intro
    )}</p><div class="card-grid guide-grid">${cards}</div></section>`;
  }).join("");
  const uncovered = Object.keys(GUIDE_ROUTES).filter((path) => !clustered.has(path));
  const moreSection = uncovered.length
    ? `<section class="nested-panel"><h2>More guides</h2><div class="card-grid guide-grid">${uncovered
        .map(guideCardHtml)
        .join("")}</div></section>`
    : "";
  return clusterSections + moreSection;
}

// Keep in sync with renderArtistStatusLegend in public/app.js.
function renderArtistStatusLegendHtml() {
  const items = [
    ["status-badge", "Dates listed", "Upcoming dates and ticket links on the page"],
    ["status-badge status-badge-muted", "No dates yet", "No announced dates — artist page and alerts only"],
    ["status-badge status-badge-muted", "Being checked", "Links appear once we've checked them"]
  ];
  return `<div class="artist-status-legend" aria-label="Artist card status legend">${items
    .map(
      ([badgeClass, badge, detail]) =>
        `<span class="artist-status-legend-item"><span class="${badgeClass}">${escapeHtml(
          badge
        )}</span><span class="status-chip-detail">${escapeHtml(detail)}</span></span>`
    )
    .join("")}</div>`;
}

function renderHomepageGuideLinks() {
  const priorityPaths = [
    "/guides/seatgeek-vs-ticketmaster",
    "/guides/ticketmaster-vs-seatgeek-vs-vivid-seats",
    "/guides/how-to-compare-concert-ticket-prices"
  ];
  const prioritizedGuides = [
    ...priorityPaths.map((path) => [path, GUIDE_ROUTES[path]]).filter(([, guide]) => Boolean(guide)),
    ...Object.entries(GUIDE_ROUTES).filter(([path]) => !priorityPaths.includes(path))
  ];
  return `<div class="card-grid guide-grid">${prioritizedGuides
    .slice(0, 6)
    .map(
      ([path, guide]) =>
        `<article class="info-card"><h3>${anchor(guide.h1, path, "guide-card-link")}</h3><p>${escapeHtml(guide.description)}</p></article>`
    )
    .join("")}</div>`;
}


function publishableFutureShows(events, limit = 500) {
  return (events || [])
    .map((ev) => ({
      id: String(ev.id || "").trim(),
      artist_slug: slugify(ev.artist_slug),
      artist_name: String(ev.artist_name || "").trim(),
      event_name: String(ev.event_name || ev.name || "").trim(),
      city: String(ev.city || "").trim(),
      venue: String(ev.venue || "").trim(),
      dateTimeISO: String(ev.dateTimeISO || ev.datetime_iso || "").trim(),
      ticketmaster_url: String(ev.ticketmaster_url || "").trim(),
      seatgeek_url: String(ev.seatgeek_url || "").trim(),
      vividseats_url: String(ev.vividseats_url || "").trim(),
      ticketnetwork_url: String(ev.ticketnetwork_url || "").trim(),
      ticketliquidator_url: String(ev.ticketliquidator_url || "").trim(),
      stubhub_international_url: String(ev.stubhub_international_url || "").trim(),
      publishable: Boolean(
        (eventLinkPublishable(ev) && safeShowTicketUrl(ev.ticketmaster_url)) ||
        (providerEventPublishable(ev, "seatgeek") && safeSeatGeekTicketUrl(ev.seatgeek_url)) ||
        (providerEventPublishable(ev, "vivid-seats") && safeVividSeatsTicketUrl(ev.vividseats_url)) ||
        IMPACT_MARKETPLACE_PROVIDERS.some((provider) => providerEventPublishable(ev, provider.slug) && safeImpactMarketplaceTicketUrl(ev?.[provider.urlField], provider))
      )
    }))
    .filter((show) => show.id && show.dateTimeISO && Number.isFinite(Date.parse(show.dateTimeISO)))
    .filter((show) => Date.parse(show.dateTimeISO) >= Date.now())
    .filter((show) => show.publishable)
    .sort((a, b) => Date.parse(a.dateTimeISO) - Date.parse(b.dateTimeISO))
    .slice(0, limit);
}

function artistUpcomingCount(events, artistSlug) {
  return publishableFutureShows(events).filter((show) => show.artist_slug === slugify(artistSlug)).length;
}

function renderComparisonHubArtistCards(catalog, events = []) {
  const artists = (catalog.artists || [])
    .map((artist) => ({ ...artist, upcomingCount: artistUpcomingCount(events, artist.slug) }))
    .filter((artist) => artist.upcomingCount > 0)
    .sort((a, b) => b.upcomingCount - a.upcomingCount || String(a.name).localeCompare(String(b.name)))
    .slice(0, 12);
  if (!artists.length) return `<p class="muted">Artist pages are being reviewed. Check back for verified ticket links and buying guidance.</p>`;
  return `<div class="artist-card-grid">${artists
    .map((artist) => {
      const countText = `${artist.upcomingCount} upcoming ${artist.upcomingCount === 1 ? "show" : "shows"}`;
      return `<article class="artist-card"><h3>${escapeHtml(artist.name)}</h3><p class="card-status">${escapeHtml(countText)}</p>${anchor("View shows", `/artists/${artist.slug}`, "button button-primary")}</article>`;
    })
    .join("")}</div>`;
}

function renderComparisonHubCityLinks(events = []) {
  const cities = deriveCities(events).filter((city) => city.indexable).slice(0, 8);
  if (!cities.length) return `<p class="muted">City pages appear once multiple artists have enough reviewed upcoming dates.</p>`;
  return `<div class="mini-link-grid">${cities
    .map((city) => anchor(`${city.city} concerts (${city.showCount})`, `/cities/${city.slug}`, "mini-link"))
    .join("")}</div>`;
}

function renderComparisonHubEventCards(events = []) {
  const shows = publishableFutureShows(events, 6);
  if (!shows.length) return "";
  return `<section id="current-events" class="nested-panel"><h2>Prices on upcoming shows</h2><p>For each show below, we load whatever current prices we have from the ticket sites. Where two or more sites quote the same show in the same currency, we'll point out the lower one — but that's a listed price, not your final total. Fees, tax, delivery, and availability are settled at the provider's checkout.</p><div class="card-grid show-card-grid">${shows
    .map((show) => {
      const date = formatShowDateServer(show.dateTimeISO, show.timezone);
      const title = show.event_name || [show.artist_name, show.city].filter(Boolean).join(" – ") || "Upcoming concert";
      return `<article class="info-card" data-comparison-show-id="${escapeAttr(show.id)}"><h3>${escapeHtml(title)}</h3>${date ? `<p class="card-status">${escapeHtml(date)}</p>` : ""}<p class="muted">${escapeHtml(showLocationServer(show) || "Venue details shown when verified.")}</p><p class="disclosure-note">Loading approved provider price snapshots…</p>${anchor("View artist ticket options", `/artists/${show.artist_slug}`, "text-link")}</article>`;
    })
    .join("")}</div></section>`;
}

function latestHubVerificationDate(events = []) {
  const dates = (events || [])
    .map((event) => String(event?.last_verified_at || event?.provider_links?.ticketmaster?.last_verified_at || "").trim())
    .filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value))
    .sort();
  return dates.length ? formatVerificationDate(dates[dates.length - 1]) : null;
}

function renderComparisonIntentCards() {
  return `<section class="nested-panel"><h2>Start with what you know</h2><div class="card-grid"><article class="info-card"><h3>I know the artist</h3><p>Go to their page for the dates, the ticket links, and what to watch for before you pay.</p>${anchor("Browse artist pages", "#compare-by-artist", "text-link")}</article><article class="info-card"><h3>I know the city</h3><p>Open the city to see who's playing there, at which venue, and when.</p>${anchor("Browse concert cities", "#compare-by-city", "text-link")}</article><article class="info-card"><h3>I know the date or venue</h3><p>Search for the venue or date, then double-check the event details on the provider before buying.</p>${anchor("Browse upcoming shows", "#current-events", "text-link")}</article></div></section>`;
}

function renderProviderChecklistSection() {
  return `<section class="nested-panel"><h2>What to check before you buy</h2><p>Two listings can look identical right up until the payment screen. Run through this on every site.</p><div class="card-grid"><article class="info-card"><h3>1. Is it the same show?</h3><p>Artist, city, venue, local date and event name — all of it has to match the gig you mean.</p></article><article class="info-card"><h3>2. What's the total?</h3><p>Get to the checkout screen where service, delivery, tax and handling fees are all showing.</p></article><article class="info-card"><h3>3. Where's the seat?</h3><p>Section, row, seat number or standing area — and any restricted-view or accessibility notes.</p></article><article class="info-card"><h3>4. When do the tickets arrive?</h3><p>Check transfer timing, delayed delivery, ID requirements, and whether you can pass them on.</p></article><article class="info-card"><h3>5. What if something goes wrong?</h3><p>On resale, read the guarantee and refund rules, and what happens if the event moves.</p></article><article class="info-card"><h3>6. Look again before you pay</h3><p>Totals and availability shift. Give the final screen one more read before you commit.</p></article></div></section>`;
}

function renderComparisonTrustPanel(events = []) {
  const lastChecked = latestHubVerificationDate(events);
  return `<section class="nested-panel verification-disclosure"><h2>What we actually check</h2><ul class="check-list"><li>Every date and link on the site comes from a record someone has reviewed.</li><li>We don't make up prices, venues, dates, availability, or relationships with providers.</li><li>If we can't stand behind where a link goes, we hide the button rather than guess.</li><li>Final prices, fees, seat details, availability and delivery are the provider's call, not ours.</li></ul>${lastChecked ? `<p class="disclosure-note">Most recent link check in the current data: ${escapeHtml(lastChecked)}.</p>` : ""}</section>`;
}

function comparisonHubFaqEntries() {
  return [
    ["What is a ticket comparison site?", "A ticket comparison site helps you review options from ticket providers for the same event. TourTicketCompare provides checked links and, where approved data is available, timestamped listed-price snapshots; confirm the current seats, fees, availability and final total on the provider site."],
    ["What is the best way to compare concert ticket prices?", "Start with the exact artist, city, venue and date, then compare the final checkout total on trusted ticket sites. Check seat location, ticket type, delivery timing, restrictions and all service fees before buying."],
    ["Why are concert ticket prices different on each site?", "Prices can differ because sellers, seat locations, demand, availability, timing before the event, service fees and primary versus resale inventory are not the same on every ticket site."],
    ["Do resale ticket prices include fees?", "Sometimes fees are included early and sometimes they appear later in checkout. Always review the final provider checkout total, including service, delivery, tax and handling fees, before paying."],
    ["Are resale concert tickets safe?", "Resale tickets can be legitimate when bought through trusted marketplaces with clear buyer protections, but risk varies. Avoid private sellers, check transfer timing and read the provider guarantee and restrictions before purchase."],
    ["When is the best time to buy concert tickets?", "There is no single best time. Buying early can improve choice and certainty, while waiting can sometimes reveal different resale options. Balance price, seat choice, group needs, delivery timing and risk tolerance."],
    ["Can I track ticket prices for a specific artist?", "TourTicketCompare does not currently provide automated price tracking alerts. Use the artist pages to find checked ticket links and confirm current prices and fees directly on the provider site."]
  ];
}

function comparisonHubItemListSchema(route, origin, catalog, events) {
  const artists = (catalog.artists || []).slice(0, 12);
  const shows = publishableFutureShows(events, 6);
  const artistList = artists.length
    ? {
        "@type": "ItemList",
        name: "Artist ticket option pages",
        itemListElement: artists.map((artist, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: artist.name,
          url: `${origin}/artists/${artist.slug}`
        }))
      }
    : null;
  const eventList = shows.length
    ? {
        "@type": "ItemList",
        name: "Verified concert ticket links",
        itemListElement: shows.map((show, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: show.event_name || `${show.artist_name} ${show.city}`.trim(),
          url: `${origin}/artists/${show.artist_slug}`
        }))
      }
    : null;
  return [artistList, eventList].filter(Boolean);
}

function renderArtistBrowseSection(catalog) {
  const artists = catalog.artists || [];
  if (!artists.length) return "";
  const items = artists
    .map(a => `<li>${anchor(`${a.name} ticket links and buying guidance`, `/artists/${a.slug}`)}</li>`)
    .join("");
  return `<section class="nested-panel"><h2>Browse artist pages</h2><p>Find checked ticket links and buying guidance for these artists:</p><ul class="guide-link-list">${items}</ul></section>`;
}

function inlineMarkdownToHtml(text) {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\((\/guides\/[a-z0-9-]+)\)/g, (_match, label, href) => {
      return `<a class="text-link" href="${escapeAttr(href)}">${label}</a>`;
    })
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function markdownToHtml(text) {
  if (!text) return "";
  return text
    .split("\n\n")
    .map(para => {
      if (para.startsWith("- ")) {
        const items = para.split("\n").map(line => line.replace(/^- /, ""));
        return `<ul><li>${items.map(item => inlineMarkdownToHtml(item)).join("</li><li>")}</li></ul>`;
      }
      if (para.startsWith("|")) {
        const rows = para.split("\n").filter(r => r.trim());
        if (rows.length < 2) return `<p>${inlineMarkdownToHtml(para)}</p>`;
        const headerCells = rows[0].split("|").slice(1, -1).map(c => `<th>${inlineMarkdownToHtml(c.trim())}</th>`).join("");
        const bodyRows = rows.slice(2).map(row => {
          const cells = row.split("|").slice(1, -1).map(c => `<td>${inlineMarkdownToHtml(c.trim())}</td>`).join("");
          return `<tr>${cells}</tr>`;
        }).join("");
        return `<table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table>`;
      }
      return `<p>${inlineMarkdownToHtml(para)}</p>`;
    })
    .join("");
}

function safeGuideSourceUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  try {
    const parsed = new URL(raw);
    return parsed.protocol === "https:" ? parsed.toString() : null;
  } catch (error) {
    return null;
  }
}

function renderGuideProvenance(route) {
  const published = formatVerificationDate(route.datePublished);
  const updated =
    route.lastmod && route.lastmod !== route.datePublished
      ? formatVerificationDate(route.lastmod)
      : null;
  const dates = [
    published ? `Published ${published}` : "",
    updated ? `Updated ${updated}` : ""
  ].filter(Boolean);
  return `<div class="guide-provenance"><p>By ${anchor(
    "TourTicketCompare editorial team",
    "/about",
    "text-link"
  )}${dates.length ? ` · ${escapeHtml(dates.join(" · "))}` : ""}</p><p class="disclosure-note">Our guides are reviewed against primary provider and regulator sources. See the ${anchor(
    "editorial policy",
    "/editorial-policy",
    "text-link"
  )} for the verification and corrections process.</p></div>`;
}

function renderGuideSources(sources) {
  if (!Array.isArray(sources) || !sources.length) return "";
  const items = sources
    .map((source) => {
      const url = safeGuideSourceUrl(source?.url);
      const name = String(source?.name || "").trim();
      if (!url || !name) return "";
      const publisher = String(source?.publisher || "").trim();
      const checked = formatVerificationDate(source?.lastChecked);
      const details = [publisher, checked ? `checked ${checked}` : ""].filter(Boolean).join(" · ");
      return `<li><a class="text-link" href="${escapeAttr(url)}" target="_blank" rel="noopener">${escapeHtml(
        name
      )}</a>${details ? ` <span class="muted">(${escapeHtml(details)})</span>` : ""}</li>`;
    })
    .filter(Boolean)
    .join("");
  if (!items) return "";
  return `<section class="nested-panel guide-sources"><h2>Sources</h2><p>Primary sources used to check time-sensitive provider and fee claims in this guide:</p><ul class="guide-link-list">${items}</ul></section>`;
}

function renderFullGuideContent(sections) {
  if (!Array.isArray(sections)) return "";
  return sections
    .map(section => {
      if (section.type === "intro") {
        return `<section class="nested-panel">${markdownToHtml(section.content)}</section>`;
      }
      if (section.type === "section") {
        return `<section class="nested-panel"><h2>${escapeHtml(section.title)}</h2>${markdownToHtml(section.content)}</section>`;
      }
      if (section.type === "subsection") {
        return `<section class="nested-panel"><h3>${escapeHtml(section.title)}</h3>${markdownToHtml(section.content)}</section>`;
      }
      return "";
    })
    .join("");
}

function providerVerificationNote(item) {
  const date = formatVerificationDate(item?.last_verified_at);
  return date ? `Provider link last checked: ${date}.` : "";
}

const IMPACT_MARKETPLACE_PROVIDERS = [
  { slug: "ticketnetwork", name: "TicketNetwork", envPrefix: "IMPACT_TICKETNETWORK", urlField: "ticketnetwork_url", allowedHosts: ["ticketnetwork.com"], priceSource: "ticketnetwork_impact_marketplace_api", publicFlag: "TICKETNETWORK_PUBLIC_ENABLED" },
  { slug: "ticket-liquidator", name: "Ticket Liquidator", envPrefix: "IMPACT_TICKETLIQUIDATOR", urlField: "ticketliquidator_url", allowedHosts: ["ticketliquidator.com"], priceSource: "ticketliquidator_impact_marketplace_api", publicFlag: "TICKETLIQUIDATOR_PUBLIC_ENABLED" },
  { slug: "stubhub-international", name: "StubHub International", envPrefix: "IMPACT_STUBHUB_INTERNATIONAL", urlField: "stubhub_international_url", allowedHosts: ["stubhub.co.uk", "stubhub.ie", "stubhub.de", "stubhub.fr", "stubhub.es", "stubhub.it", "stubhub.pt", "stubhub.pl", "stubhub.se", "stubhub.dk", "stubhub.fi", "stubhub.gr", "stubhub.nl", "stubhub.lu", "stubhub.cz", "stubhub.be", "stubhub.co.at"], priceSource: "stubhub_international_impact_marketplace_api", publicFlag: "STUBHUB_INTERNATIONAL_PUBLIC_ENABLED" }
];

// Owner-approved lanes for machine-readable price redistribution in JSON-LD
// Offer nodes (confirmed with each programme 2026-07-22; see
// SAFE_PUBLISHING_RULES.md and docs/PROVIDER_DATA_POLICY.md).
// validate-route-schema.mjs imports this list: a provider absent here can
// never emit an Offer node, whatever the runtime flags say. Ticketmaster,
// SeatGeek, and Ticket Liquidator are deliberately excluded.
export const SCHEMA_OFFERS_APPROVED_PROVIDERS = Object.freeze(["vivid-seats", "ticketnetwork", "stubhub-international"]);

// Affiliate providers render before the plain,
// unmonetized Ticketmaster link. Keep in sync with PROVIDER_DISPLAY_ORDER in
// public/app.js.
const PROVIDER_DISPLAY_ORDER = ["seatgeek", "vivid-seats", ...IMPACT_MARKETPLACE_PROVIDERS.map((provider) => provider.slug), "ticketmaster"];
const PROVIDER_DISPLAY_NAMES = { ticketmaster: "Ticketmaster", seatgeek: "SeatGeek", "vivid-seats": "Vivid Seats", ...Object.fromEntries(IMPACT_MARKETPLACE_PROVIDERS.map((provider) => [provider.slug, provider.name])) };

function providerDisplayRank(providerSlug) {
  const rank = PROVIDER_DISPLAY_ORDER.indexOf(providerSlug);
  return rank === -1 ? PROVIDER_DISPLAY_ORDER.length : rank;
}

// SeatGeek / Vivid Seats artist cards render only when the provider's
// Impact config is present server-side, so an unconfigured provider never
// shows a dead button. Plain Ticketmaster links have no config requirement.
function availableArtistProviderLinks(catalog, artist, providerAvailability = {}) {
  return ticketLinksForArtist(catalog, artist.slug)
    .filter((item) => slugify(item.provider) === "ticketmaster" || Boolean(safeShowTicketUrl(item?.url)))
    .filter((item) => {
      const provider = slugify(item.provider);
      if (provider === "seatgeek") return providerAvailability.seatgeek === true;
      if (provider === "vivid-seats") return providerAvailability["vivid-seats"] === true;
      if (IMPACT_MARKETPLACE_PROVIDERS.some((candidate) => candidate.slug === provider)) return providerAvailability[provider] === true;
      return true;
    })
    .sort((a, b) => providerDisplayRank(slugify(a.provider)) - providerDisplayRank(slugify(b.provider)));
}

function renderProviderFallback(catalog, artist, surface, providerAvailability = {}) {
  const links = availableArtistProviderLinks(catalog, artist, providerAvailability);
  if (!links.length) {
    return `<section class="provider-panel"><h2>Where to buy</h2><p class="muted">We haven't got a checked provider page for this artist yet — buttons only go up once we've followed the link ourselves.</p><p class="muted">Worth reading before you pick a ticket site:</p><ul class="guide-link-list"><li>${anchor("How to avoid overpaying for concert tickets", "/guides/how-to-avoid-overpaying-for-concert-tickets")}</li><li>${anchor("When is the best time to buy concert tickets?", "/guides/when-is-the-best-time-to-buy-concert-tickets")}</li><li>${anchor("How to spot ticket scams and fake listings", "/guides/how-to-avoid-ticket-scams")}</li></ul><div class="action-row">${anchor("Read buying guides", "/guides", "button button-secondary")}${anchor("Browse other artists", "/artists", "button button-secondary")}</div></section>`;
  }
  const cards = links
    .map((item) => {
      const provider = slugify(item.provider);
      const displayName = PROVIDER_DISPLAY_NAMES[provider] || item.provider;
      const label = "Check provider";
      const destination = artistProviderHref(artist, item, surface);
      const verificationNote = providerVerificationNote(item);
      return `<article class="provider-card"><p class="eyebrow">Artist page</p><h3>${escapeHtml(displayName)}</h3>${anchor(
        label,
        destination,
        "button button-primary",
        `target="_blank" rel="${escapeAttr(outboundCtaRel(destination) || "noopener")}" data-cta-provider="${escapeAttr(provider)}" data-cta-artist="${escapeAttr(artist.slug)}" data-cta-price-snapshot="absent" data-cta-location="artist_provider_panel"${item.link_id ? ` data-cta-link-id="${escapeAttr(item.link_id)}"` : ""}`
      )}${verificationNote ? `<p class="disclosure-note">${escapeHtml(verificationNote)}</p>` : ""}</article>`;
    })
    .join("");
  const singleProviderNote = links.length === 1 ? `<p class="disclosure-note">We've only got one checked provider page for this artist so far, so there's nothing to compare it against yet.</p>` : "";
  return `<section class="provider-panel"><h2>Where to buy</h2><p class="muted">These go to the artist's page on each ticket site, not to a specific date.</p>${singleProviderNote}<div class="provider-actions">${cards}</div></section>`;
}

function formatVerificationDate(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  const parsed = new Date(`${raw}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime())) return null;
  try {
    return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  } catch (error) {
    return null;
  }
}

function renderVerificationDisclosure(artist, shows = []) {
  // Single consolidated trust block for artist pages. Keep in sync with
  // buildVerificationDisclosurePanel in public/app.js.
  const artistVerifiedDate = formatVerificationDate(artist.last_verified_at);
  const eventDates = [...new Set(shows.map(show => formatVerificationDate(show.last_verified_at)).filter(Boolean))];
  const eventRange = eventDates.length ? (eventDates.length === 1 ? eventDates[0] : `${eventDates[0]} to ${eventDates[eventDates.length - 1]}`) : null;
  return `<section class="nested-panel verification-disclosure"><h2>How these links work</h2><p class="muted">We follow every ticket link before it goes up. Prices, fees, availability and delivery are the provider's, not ours — and some links earn us a commission.</p>${
    artistVerifiedDate ? `<p class="disclosure-note">Artist last checked: ${escapeHtml(artistVerifiedDate)}.</p>` : ""
  }${eventRange ? `<p class="disclosure-note">Event links last checked: ${escapeHtml(eventRange)}.</p>` : ""}</section>`;
}

// Normalise a raw events.json record into the enriched "show" shape used by
// the show board and the MusicEvent schema builders. Carrying artist_slug,
// artist_name, and country here lets the city/venue schema paths (which
// aggregate across artists and hold location facts at the page level) reuse
// the identical publishable/offers gate as the artist board.
function enrichEventAsShow(ev) {
  return {
    id: String(ev.id || "").trim(),
    artist_slug: slugify(ev.artist_slug),
    artist_name: String(ev.artist_name || "").trim(),
    event_name: String(ev.event_name || ev.name || "").trim(),
    tour_name: String(ev.tour_name || "").trim(),
    dateTimeISO: String(ev.dateTimeISO || ev.datetime_iso || "").trim(),
    // Required to render dateTimeISO at the venue rather than in UTC — see
    // venueDateParts. Dropping it here is what silently sent every Z-suffixed
    // date back to the UTC fallback.
    timezone: String(ev.timezone || "").trim(),
    city: String(ev.city || "").trim(),
    country: normalizeCountry(ev.country),
    venue: String(ev.venue || "").trim(),
    ticketmaster_url: String(ev.ticketmaster_url || "").trim(),
    seatgeek_url: String(ev.seatgeek_url || "").trim(),
    vividseats_url: String(ev.vividseats_url || "").trim(),
    ticketnetwork_url: String(ev.ticketnetwork_url || "").trim(),
    ticketliquidator_url: String(ev.ticketliquidator_url || "").trim(),
    stubhub_international_url: String(ev.stubhub_international_url || "").trim(),
    last_verified_at: String(ev.last_verified_at || "").trim(),
    verification_status: String(ev.verification_status || "").trim(),
    provider_links: ev.provider_links && typeof ev.provider_links === "object" ? ev.provider_links : {},
    prices: Array.isArray(ev.prices) ? ev.prices : [],
    publishable: eventLinkPublishable(ev),
    seatgeekPublishable: providerEventPublishable(ev, "seatgeek"),
    vividseatsPublishable: providerEventPublishable(ev, "vivid-seats"),
    impactMarketplacePublishable: Object.fromEntries(
      IMPACT_MARKETPLACE_PROVIDERS.map((provider) => [provider.slug, providerEventPublishable(ev, provider.slug)])
    )
  };
}

function futureShowsForArtist(events, artistSlug, limit = Infinity) {
  const now = Date.now();
  const slug = slugify(artistSlug);
  return events
    .filter((ev) => ev && typeof ev === "object" && slugify(ev.artist_slug) === slug)
    .map(enrichEventAsShow)
    .filter((show) => show.id && show.dateTimeISO && Number.isFinite(Date.parse(show.dateTimeISO)))
    .filter((show) => Date.parse(show.dateTimeISO) >= now)
    .sort((a, b) => Date.parse(a.dateTimeISO) - Date.parse(b.dateTimeISO))
    .slice(0, limit);
}

// Recent past shows for an artist, most-recent first. Used by the empty-state
// board so a page with no confirmed upcoming date still surfaces the artist's
// last verified tour footprint (factual venue/city/date only — no CTAs or
// prices). Same publishable gate as the upcoming board; expired dates only.
function recentPastShowsForArtist(events, artistSlug, limit = 3) {
  const now = Date.now();
  const slug = slugify(artistSlug);
  return events
    .filter((ev) => ev && typeof ev === "object" && slugify(ev.artist_slug) === slug)
    .map(enrichEventAsShow)
    .filter((show) => show.id && show.dateTimeISO && Number.isFinite(Date.parse(show.dateTimeISO)))
    .filter((show) => Date.parse(show.dateTimeISO) < now && show.publishable && show.venue && show.city)
    .sort((a, b) => Date.parse(b.dateTimeISO) - Date.parse(a.dateTimeISO))
    .slice(0, limit);
}

// Resolve a stored datetime to the venue's wall clock. Keep in sync with
// venueDateParts in public/app.js.
//
// datetime_iso carries three shapes and each needs different handling:
//
//   "2026-07-10T20:00:00"        naive venue-local wall time. The venue's clock
//                                is written literally in the text.
//   "2026-11-19T19:00:00-05:00"  venue-local wall time WITH the offset, so the
//                                exact instant is preserved for sorting and the
//                                upcoming-show filter. The clock is still
//                                written literally in the text.
//   "2026-10-24T03:00:00Z"       a bare instant. The venue's clock is NOT in the
//                                text and can only be recovered from `timezone`.
//                                Rendering it in UTC shows the following day for
//                                any evening show west of Greenwich — the bug
//                                that had /artists/jay-z advertising
//                                "Sat 24 Oct 2026" for a Friday 23 Oct show.
//
// Returns the Date to format and the zone to format it in, such that the result
// is always the venue's own calendar date. For the first two shapes the wall
// time is re-read as UTC so formatting in UTC returns it byte-for-byte; only a
// bare instant consults `timezone`, falling back to UTC when it is absent or
// unparseable. The fallback never guesses a zone from city or country.
function venueDateParts(iso, timezone) {
  const raw = String(iso || "").trim();
  if (!raw) return null;
  if (/Z$/.test(raw)) {
    const instant = new Date(raw);
    if (!Number.isFinite(instant.getTime())) return null;
    const tz = String(timezone || "").trim();
    if (tz) {
      try {
        new Intl.DateTimeFormat("en-US", { timeZone: tz });
        return { date: instant, timeZone: tz };
      } catch (error) {
        // fall through to UTC
      }
    }
    return { date: instant, timeZone: "UTC" };
  }
  const wall = raw.replace(/[+-]\d{2}:?\d{2}$/, "");
  const asUtc = new Date(`${wall}Z`);
  if (!Number.isFinite(asUtc.getTime())) return null;
  return { date: asUtc, timeZone: "UTC" };
}

function formatShowDateServer(iso, timezone) {
  const parts = venueDateParts(iso, timezone);
  if (!parts) return "";
  try {
    return parts.date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: parts.timeZone
    });
  } catch (error) {
    return "";
  }
}

function showLocationServer(show) {
  return [show.city, show.venue].filter((v) => String(v || "").trim()).join(" · ");
}

// Date badge parts for the compact show card. Keep in sync with
// showDateParts in public/app.js.
function showDatePartsServer(iso, timezone) {
  const parts = venueDateParts(iso, timezone);
  if (!parts) return null;
  const { date, timeZone } = parts;
  try {
    return {
      weekday: date.toLocaleDateString("en-US", { weekday: "short", timeZone }),
      day: date.toLocaleDateString("en-US", { day: "numeric", timeZone }),
      monthYear: date.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone })
    };
  } catch (error) {
    return null;
  }
}

// Explicit event-link publishability. CTAs may render only for events whose
// verification_status is an allowed publish state ("human_verified" or
// "machine_high_confidence"); "needs_recheck" suppresses CTAs even when a
// top-level ticketmaster_url is present. Events without an explicit
// verification_status fall back to the legacy human-verified provider flag.
// Keep in sync with eventLinkPublishable in public/app.js and
// functions/api/out.js.
const PUBLISHABLE_VERIFICATION_STATUSES = new Set(["human_verified", "machine_high_confidence"]);

function eventLinkPublishable(event) {
  const status = String(event?.verification_status || "").trim().toLowerCase();
  if (status) return PUBLISHABLE_VERIFICATION_STATUSES.has(status);
  return event?.provider_links?.ticketmaster?.verified === true;
}

// Per-provider event publishability. Ticketmaster follows the event-level
// verification_status above. SeatGeek and Vivid Seats event CTAs may
// additionally publish on a needs_recheck event when that provider link carries
// its own verified provenance — the recheck flag tracks the Ticketmaster
// storefront URL, not the independently verified marketplace listing. Keep in
// sync with providerEventPublishable in functions/api/out.js and
// public/app.js.
function providerEventPublishable(event, provider) {
  if (IMPACT_MARKETPLACE_PROVIDERS.some((candidate) => candidate.slug === provider)) {
    return event?.provider_links?.[provider]?.verified === true;
  }
  if (provider !== "ticketmaster" && event?.provider_links?.[provider]?.verified === true) return true;
  return eventLinkPublishable(event);
}

function safeShowTicketUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    const host = parsed.hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1") return null;
    if (/example/.test(host) || raw.includes("placeholder")) return null;
    return raw;
  } catch (error) {
    return null;
  }
}

// /api/out is a tracked redirect endpoint, not indexable content: every CTA
// pointing at it is rel="nofollow" so crawlers don't spend budget on the
// redirect hop, and monetized providers additionally declare rel="sponsored".
// Ticketmaster stays plain and unmonetized, so it is nofollow-only. Keep in
// sync with outboundCtaRel in public/app.js.
function outboundCtaRel(href) {
  const raw = String(href || "");
  if (!raw.startsWith("/api/out?")) return null;
  const provider = new URLSearchParams(raw.slice(raw.indexOf("?") + 1)).get("provider") || "";
  return provider === "ticketmaster" ? "noopener nofollow" : "noopener nofollow sponsored";
}

function eventTicketHref(show, provider) {
  const showId = show?.id ? String(show.id) : "";
  if (!showId) return null;
  if (provider === "ticketmaster") {
    return `/api/out?${new URLSearchParams({ showId, provider }).toString()}`;
  }
  // Monetized providers route through /api/out so the click is Impact-tracked
  // server-side (no raw affiliate URLs in the page). Only emit the tracked link
  // when a valid stored destination exists, so the CTA stays suppressed exactly
  // as before — out.js re-resolves the stored URL and Impact-wraps it.
  let hasDestination = false;
  if (provider === "seatgeek") {
    hasDestination = Boolean(safeSeatGeekTicketUrl(show?.seatgeek_url));
  } else if (provider === "vivid-seats") {
    hasDestination = Boolean(safeVividSeatsTicketUrl(show?.vividseats_url));
  } else {
    const marketplace = IMPACT_MARKETPLACE_PROVIDERS.find((candidate) => candidate.slug === provider);
    if (marketplace) hasDestination = Boolean(safeImpactMarketplaceTicketUrl(show?.[marketplace.urlField], marketplace));
  }
  if (!hasDestination) return null;
  return `/api/out?${new URLSearchParams({ showId, provider }).toString()}`;
}

function artistProviderHref(artist, item, surface) {
  const provider = slugify(item?.provider);
  // Ticketmaster stays a plain /api/out redirect; monetized artist links route
  // through /api/out too so the click is Impact-tracked server-side. Only emit a
  // link when a verified destination exists — out.js resolves the tracked
  // performer-page URL from VERIFIED_TICKET_LINKS.
  if (provider !== "ticketmaster" && !safeShowTicketUrl(item?.url)) return null;
  return `/api/out?${new URLSearchParams({
    artistSlug: artist.slug,
    provider,
    sourcePath: `/artists/${artist.slug}`,
    surface
  }).toString()}`;
}

function safeSeatGeekTicketUrl(value) {
  const safeUrl = safeShowTicketUrl(value);
  if (!safeUrl) return null;
  try {
    const parsed = new URL(safeUrl);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    const path = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
    if (host !== "seatgeek.com" && host !== "www.seatgeek.com") return null;
    if (!path || path === "/") return null;
    if (/^\/(search|venues?|performers?|artists?|concert-tickets|tickets)(?:\/|$)/i.test(path)) return null;
    return /\/(concert|sports|theater|theatre)\/\d+$/i.test(path) ? safeUrl : null;
  } catch (error) {
    return null;
  }
}

function seatGeekOutAvailable(show, seatGeekAvailable = false) {
  if (!seatGeekAvailable) return false;
  const publishable = typeof show?.seatgeekPublishable === "boolean"
    ? show.seatgeekPublishable
    : providerEventPublishable(show, "seatgeek");
  return Boolean(publishable && safeSeatGeekTicketUrl(show?.seatgeek_url));
}

function safeVividSeatsTicketUrl(value) {
  const safeUrl = safeShowTicketUrl(value);
  if (!safeUrl) return null;
  try {
    const parsed = new URL(safeUrl);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    const path = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
    if (host !== "vividseats.com" && host !== "www.vividseats.com") return null;
    if (!path || path === "/") return null;
    if (/^\/(search|venues?|performers?|artists?|category|concerts?|sports?|theater|theatre)(?:\/|$)/i.test(path)) return null;
    return /\/production\/\d+$/i.test(path) ? safeUrl : null;
  } catch (error) {
    return null;
  }
}

function vividSeatsOutAvailable(show, vividSeatsAvailable = false) {
  if (!vividSeatsAvailable) return false;
  const publishable = typeof show?.vividseatsPublishable === "boolean"
    ? show.vividseatsPublishable
    : providerEventPublishable(show, "vivid-seats");
  return Boolean(publishable && safeVividSeatsTicketUrl(show?.vividseats_url));
}

function clean(value, max = 255) {
  return String(value || "").trim().slice(0, max);
}

function isSeatGeekConfigured(env = {}) {
  const impactSeatGeekBaseTrackingUrl = clean(env?.IMPACT_SEATGEEK_BASE_TRACKING_URL, 2048);
  const impactSeatGeekAccountSid = clean(env?.IMPACT_SEATGEEK_ACCOUNT_SID, 255);
  const impactSeatGeekAuthToken = clean(env?.IMPACT_SEATGEEK_AUTH_TOKEN, 255);
  const impactSeatGeekProgramId = clean(env?.IMPACT_SEATGEEK_CAMPAIGN_ID || env?.IMPACT_SEATGEEK_PROGRAM_ID, 120);
  return Boolean(impactSeatGeekBaseTrackingUrl || (impactSeatGeekAccountSid && impactSeatGeekAuthToken && impactSeatGeekProgramId));
}

function isVividSeatsConfigured(env = {}) {
  const impactVividSeatsBaseTrackingUrl = clean(env?.IMPACT_VIVIDSEATS_BASE_TRACKING_URL, 2048);
  const impactVividSeatsAccountSid = clean(env?.IMPACT_SEATGEEK_ACCOUNT_SID, 255);
  const impactVividSeatsAuthToken = clean(env?.IMPACT_SEATGEEK_AUTH_TOKEN, 255);
  const impactVividSeatsProgramId = clean(env?.IMPACT_VIVIDSEATS_CAMPAIGN_ID || env?.IMPACT_VIVIDSEATS_PROGRAM_ID, 120);
  return Boolean(impactVividSeatsBaseTrackingUrl || (impactVividSeatsAccountSid && impactVividSeatsAuthToken && impactVividSeatsProgramId));
}

function safeImpactMarketplaceTicketUrl(value, provider) {
  const safeUrl = safeShowTicketUrl(value);
  if (!safeUrl || !provider) return null;
  try {
    const parsed = new URL(safeUrl);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    if (!provider.allowedHosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`))) return null;
    const path = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
    if (!path || path === "/" || /^\/(search|home|about|help|support|faq|contact|terms|privacy)(?:\/|$)/i.test(path)) return null;
    return safeUrl;
  } catch { return null; }
}

function isImpactMarketplaceConfigured(env = {}, provider) {
  return Boolean(provider && impactMarketplaceRuntimeConfig(env, provider.slug)?.configured);
}

function approvedServerPriceLane(show, provider) {
  const marketplace = IMPACT_MARKETPLACE_PROVIDERS.find((item) => item.name === provider);
  const providerSlug = provider === "SeatGeek" ? "seatgeek" : provider === "Vivid Seats" ? "vivid-seats" : marketplace?.slug;
  const providerVerified = Boolean(providerSlug && show?.provider_links?.[providerSlug]?.verified === true);
  if (!providerVerified) return null;

  const approvedSource = provider === "SeatGeek" ? "seatgeek_partner_api" : provider === "Vivid Seats" ? "vividseats_impact_marketplace_api" : marketplace?.priceSource;
  if (!approvedSource) return null;
  const lane = (Array.isArray(show?.prices) ? show.prices : []).find((item) => item?.provider === provider);
  if (!lane || lane.status !== "ok" || lane.providerStatus !== "ok" || lane.source !== approvedSource) return null;
  const price = Number(lane.price);
  const currency = String(lane.currency || "").trim().toUpperCase();
  const fetchedAt = String(lane.fetchedAt || "").trim();
  const expiresAt = String(lane.expiresAt || "").trim();
  if (!Number.isFinite(price) || price < 0 || !/^[A-Z]{3}$/.test(currency)) return null;
  if (!Number.isFinite(Date.parse(fetchedAt)) || !Number.isFinite(Date.parse(expiresAt)) || Date.parse(expiresAt) <= Date.now()) return null;
  return { price, currency, fetchedAt, expiresAt };
}

function formatServerPrice(value, currency) {
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      maximumFractionDigits: Number(value) % 1 === 0 ? 0 : 2
    }).format(value);
  } catch (error) {
    return "";
  }
}

function formatServerSnapshotTime(value) {
  try {
    return `${new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC"
    }).format(new Date(value))} UTC`;
  } catch (error) {
    return "";
  }
}

// One CTA button per provider: provider name on the left, the approved fresh
// listed-price snapshot on the right when one exists (the price is the button),
// otherwise "Check prices". The data-cta-* attributes feed the delegated
// provider_click analytics listener in public/app.js (artist, event, provider,
// snapshot present/absent, CTA location). Keep in sync with
// renderProviderCtaButton in public/app.js.
function renderProviderCtaButtonHtml(name, href, amount, analytics = {}) {
  const value = amount || "Check prices";
  const valueClass = amount ? "provider-cta-value provider-cta-price" : "provider-cta-value provider-cta-check";
  const dataAttrs = ` data-cta-provider="${escapeAttr(analytics.provider || slugify(name))}" data-cta-artist="${escapeAttr(analytics.artistSlug || "")}" data-cta-show-id="${escapeAttr(analytics.showId || "")}" data-cta-price-snapshot="${amount ? "present" : "absent"}" data-cta-location="${escapeAttr(analytics.ctaLocation || "event_card")}"`;
  return `<a class="provider-cta${amount ? " provider-cta-priced" : ""}" href="${escapeAttr(href)}" target="_blank" rel="${escapeAttr(outboundCtaRel(href) || "noopener")}"${dataAttrs}><span class="provider-cta-name">${escapeHtml(name)}</span><span class="${valueClass}">${escapeHtml(value)}</span></a>`;
}

// Required snapshot disclosures for every price shown on a button, rendered
// once below the unified provider list. Provider names and capture times appear
// only for actual approved, fresh lanes.
// Keep in sync with renderShowCardPriceNotes in public/app.js.
function renderServerPriceNotes(ctaSpecs) {
  const priced = ctaSpecs.filter((spec) => spec.priceAmount && spec.priceAsOf);
  if (!priced.length) return "";
  const snapshotTimes = priced.map((spec) => `${spec.name} (${spec.priceAsOf})`).join(" · ");
  const note = `Listed-price snapshots, not live availability. ${snapshotTimes}. Prices may change and may exclude fees.`;
  return `<div class="provider-cta-notes"><p class="disclosure-note">${escapeHtml(note)}</p></div>`;
}

// Multi-night runs: shows sharing a venue and city on an artist board get a
// "Show X of Y at this venue" line so multi-night stands are distinguishable.
// Derived purely from the verified rows already being rendered — no event fact
// is inferred. Keep in sync with venueRunIndex in public/app.js.
function venueRunIndex(shows) {
  const groups = new Map();
  const sorted = [...shows]
    .filter((show) => show?.id)
    .sort((a, b) => {
      const ta = Date.parse(a.dateTimeISO || "");
      const tb = Date.parse(b.dateTimeISO || "");
      return (Number.isFinite(ta) ? ta : 0) - (Number.isFinite(tb) ? tb : 0);
    });
  for (const show of sorted) {
    const venue = String(show.venue || "").trim().toLowerCase();
    const city = String(show.city || "").trim().toLowerCase();
    if (!venue || !city) continue;
    const key = `${venue}|${city}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(String(show.id));
  }
  const index = {};
  for (const ids of groups.values()) {
    if (ids.length < 2) continue;
    ids.forEach((id, position) => {
      index[id] = { position: position + 1, total: ids.length };
    });
  }
  return index;
}

function renderShowCardServerHtml(show, seatGeekAvailable = false, isIndexableArtist = true, vividSeatsAvailable = false, artistName = "", marketplaceAvailability = {}, artistSlug = "", venueRuns = {}) {
  const dateParts = showDatePartsServer(show.dateTimeISO, show.timezone);
  const location = showLocationServer(show);
  const anchorId = showAnchorId(show);
  const validUrl = safeShowTicketUrl(show.ticketmaster_url);
  let ctaHtml = `<p class="disclosure-note">No verified ticket link is available for this date.</p>`;

  if (!isIndexableArtist) {
    ctaHtml = `<p class="disclosure-note">Ticket links for this artist are still being reviewed. Buy buttons appear once the destination has been checked.</p>`;
  } else if (show.id) {
    // One button per available provider. SeatGeek (primary affiliate) leads,
    // then Vivid Seats, the Impact marketplace lanes, and the plain
    // Ticketmaster verification link last. A provider with an approved, fresh
    // price lane shows the listed snapshot amount on its own button (the price
    // is the CTA); the rest read "Check prices". Snapshot disclosures render
    // once beneath the buttons. Keep in sync with renderShowCard in
    // public/app.js.
    const tmAvailable = Boolean(validUrl && show.publishable);
    const sgAvailable = seatGeekOutAvailable(show, seatGeekAvailable);
    const vsAvailable = vividSeatsOutAvailable(show, vividSeatsAvailable);
    const ctaSpecs = [];
      if (sgAvailable) ctaSpecs.push({ provider: "seatgeek", name: "SeatGeek", href: eventTicketHref(show, "seatgeek"), lane: null });
    if (vsAvailable) ctaSpecs.push({ provider: "vivid-seats", name: "Vivid Seats", href: eventTicketHref(show, "vivid-seats"), lane: approvedServerPriceLane(show, "Vivid Seats") });
    for (const provider of IMPACT_MARKETPLACE_PROVIDERS) {
      const publishable = show?.impactMarketplacePublishable?.[provider.slug] ?? providerEventPublishable(show, provider.slug);
      const href = eventTicketHref(show, provider.slug);
      if (marketplaceAvailability[provider.slug] && publishable && href) {
        ctaSpecs.push({ provider: provider.slug, name: provider.name, href, lane: approvedServerPriceLane(show, provider.name) });
      }
    }
    if (tmAvailable) ctaSpecs.push({ provider: "ticketmaster", name: "Ticketmaster", href: eventTicketHref(show, "ticketmaster"), lane: null });

    if (ctaSpecs.length) {
      for (const spec of ctaSpecs) {
        if (!spec.lane) continue;
        const amount = formatServerPrice(spec.lane.price, spec.lane.currency);
        const asOf = formatServerSnapshotTime(spec.lane.fetchedAt);
        if (amount && asOf) {
          spec.priceAmount = amount;
          spec.priceAsOf = asOf;
        } else {
          spec.lane = null;
        }
      }
      // Keep every provider in one fixed-order list. A fresh approved snapshot
      // replaces "Check prices" with the amount, without moving the provider or
      // splitting the card into separate priced and unpriced sections.
      const analyticsBase = { artistSlug, showId: String(show.id || ""), ctaLocation: "event_card" };
      const buttonsHtml = ctaSpecs
        .map((spec) => renderProviderCtaButtonHtml(spec.name, spec.href, spec.priceAmount || "", { ...analyticsBase, provider: spec.provider }))
        .join("");
      ctaHtml = `<div class="provider-cta-group">${buttonsHtml}</div>${renderServerPriceNotes(ctaSpecs)}`;
    }
  }

  const showJson = escapeAttr(JSON.stringify({ last_verified_at: show.last_verified_at || "" }));
  const copyLinkHtml = anchorId
    ? `<a class="text-link copy-show-link" href="#${escapeAttr(anchorId)}" data-copy-show-link="${escapeAttr(anchorId)}">Copy link to this date</a>`
    : "";
  // Compact card: date badge, then city · venue as the heading (the artist
  // name is already the page heading). The event name renders as a sub-line
  // only when it adds information beyond the artist name. Keep in sync with
  // renderShowCard in public/app.js.
  const titleFallback = show.city ? `Show – ${show.city}` : "Upcoming show";
  const eventName = String(show.event_name || "").trim();
  const title = location || eventName || titleFallback;
  const subHtml =
    location && eventName && eventName.toLowerCase() !== String(artistName || "").trim().toLowerCase()
      ? `<p class="show-card-sub muted">${escapeHtml(eventName)}</p>`
      : location
        ? ""
        : `<p class="show-card-sub muted">City and venue details are shown only when verified by the source.</p>`;
  const badgeHtml = dateParts
    ? `<div class="show-date-badge"><span class="show-date-weekday">${escapeHtml(dateParts.weekday)}</span><span class="show-date-day">${escapeHtml(dateParts.day)}</span><span class="show-date-monthyear">${escapeHtml(dateParts.monthYear)}</span></div>`
    : "";
  const run = venueRuns[String(show.id || "")];
  const runHtml = run ? `<p class="show-card-run muted">Show ${run.position} of ${run.total} at this venue</p>` : "";
  return `<article class="info-card show-card"${anchorId ? ` id="${escapeAttr(anchorId)}"` : ""} data-show-json="${showJson}">${badgeHtml}<div class="show-card-body"><h3 class="show-card-title">${escapeHtml(title)}</h3>${subHtml}${runHtml}${ctaHtml}${copyLinkHtml}</div></article>`;
}

// Zero-event board state. The primary CTA is the artist-level page of the
// highest-ranked available provider (never an event-level ticket link — no
// verified dates exist to sell). Falls back to the buying guide when no
// artist-level provider link is verified.
// Factual "recent shows" list for the empty board: the artist's last verified
// dates (already passed) shown as a reference point when no upcoming date is
// confirmed. No CTAs, links, or prices — availability is never implied for an
// expired date. Keep in sync with renderRecentShowsList in public/app.js.
function renderRecentShowsHtml(safeName, pastShows) {
  if (!Array.isArray(pastShows) || !pastShows.length) return "";
  const items = pastShows
    .map((show) => {
      const label = formatShowDateServer(show.dateTimeISO, show.timezone) || "Recent date";
      const place = [show.venue, show.city].filter(Boolean).map((part) => escapeHtml(part)).join(", ");
      return `<li><time datetime="${escapeAttr(show.dateTimeISO)}">${escapeHtml(label)}</time>${place ? ` — ${place}` : ""}</li>`;
    })
    .join("");
  return `<div class="recent-shows"><h4>Recent ${safeName} shows</h4><p class="muted">These dates have already been and gone — they're here for reference while we check any newly announced run.</p><ul class="recent-shows-list">${items}</ul></div>`;
}

// The signup form posts to /api/signup and works without JavaScript: the button
// is a real submit and the form carries method/action plus hidden fields, so a
// no-JS submit sends a native form POST that /api/signup answers with an HTML
// confirmation. With JavaScript, public/app.js intercepts the submit (via the
// data-watchlist-shell hook) and posts JSON for inline status instead. Keep in
// sync with renderShowBoardEmptyState in public/app.js.
function renderShowBoardEmptyStateHtml(artistName = "", providerCta = null, artistSlug = "", pastShows = []) {
  const safeName = escapeHtml(String(artistName || "").trim() || "artist");
  const primaryCta = providerCta
    ? anchor(`Check ${escapeHtml(providerCta.name)} for updates`, providerCta.href, "button button-primary", `rel="${escapeAttr(outboundCtaRel(providerCta.href) || "noopener")}" data-cta-provider="${escapeAttr(slugify(providerCta.name))}" data-cta-artist="${escapeAttr(artistSlug)}" data-cta-price-snapshot="absent" data-cta-location="empty_state"`)
    : anchor("Read ticket buying guide", "/guides/how-to-compare-concert-ticket-prices", "button button-secondary");
  const recentHtml = renderRecentShowsHtml(safeName, pastShows);
  const signupHtml = artistSlug
    ? `<form class="watchlist-signup" method="post" action="/api/signup" data-watchlist-shell="${escapeAttr(artistSlug)}"><h4>Get told when ${safeName} dates land</h4><p class="muted">Leave your email and we'll let you know as soon as we've got confirmed ${safeName} dates and ticket links up.</p><input type="hidden" name="artistSlug" value="${escapeAttr(artistSlug)}" /><input type="hidden" name="sourcePath" value="/artists/${escapeAttr(artistSlug)}" /><div class="watchlist-signup-row"><label class="sr-only" for="watchlist-email-${escapeAttr(artistSlug)}">Email address</label><input type="email" id="watchlist-email-${escapeAttr(artistSlug)}" name="email" required placeholder="Your email address" autocomplete="email" /><input class="hp-field" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" /><button class="button button-primary" type="submit">Notify me</button></div><p class="disclosure-note" data-signup-status aria-live="polite"></p></form>`
    : "";
  return `<div class="empty-state"><h3>No upcoming dates yet</h3><p class="muted">Nothing confirmed for ${safeName} right now. New dates show up here as soon as we've checked where the tickets lead.</p>${recentHtml}${signupHtml}<div class="action-row">${primaryCta}${anchor(
    "Browse artists",
    "/artists",
    "button button-secondary"
  )}</div></div>`;
}

function renderShowBoardServerHtml(shows, seatGeekAvailable = false, isIndexableArtist = true, artistName = "", vividSeatsAvailable = false, emptyStateProviderCta = null, marketplaceAvailability = {}, artistSlug = "", pastShows = []) {
  const venueRuns = venueRunIndex(shows);
  const gridContent = shows.length
    ? shows.map(show => renderShowCardServerHtml(show, seatGeekAvailable, isIndexableArtist, vividSeatsAvailable, artistName, marketplaceAvailability, artistSlug, venueRuns)).join("")
    : renderShowBoardEmptyStateHtml(artistName, emptyStateProviderCta, artistSlug, pastShows);
  const filterIntro = shows.length > 1
    ? `<div class="show-filter-intro"><h3>Find your date</h3><p class="muted">Filter by city, venue, or tour to jump to your date.</p></div>`
    : "";
  return `<section class="section-grid show-board" aria-labelledby="artistShowBoard"><div class="section-intro"><h2 id="artistShowBoard">Upcoming shows</h2><p>Pick your date, compare the prices we have, then check the fees and final total on the provider's site.</p><p class="disclosure-note">Some links earn us a commission — this never affects your price.</p></div>${filterIntro}<div class="card-grid show-card-grid" data-show-grid="true">${gridContent}</div></section>`;
}

function renderMainContent(route, catalog, events = [], guideContent = {}, env = {}) {
  if (route.type === "comparison-hub") {
    const faqHtml = comparisonHubFaqEntries()
      .map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`)
      .join("");
    return `<main id="mainContent"><section class="content-page comparison-hub" aria-labelledby="compareTitle">${renderBreadcrumbHtml(
      route
    )}<section class="nested-panel"><h1 id="compareTitle">Compare concert ticket prices</h1><p class="lead">Start with the show you actually want to see, not a generic "site A vs site B" argument. Where we have current prices for that exact show, use them to narrow things down — then open the providers and compare the real listing, fees, and delivery terms.</p><div class="action-row">${anchor(
      "Browse checked events",
      "#current-events",
      "button button-primary"
    )}${anchor("Browse artists", "#compare-by-artist", "button button-secondary")}</div><p class="disclosure-note">We only compare prices captured for the same event, each with the time it was taken. Treat them as a starting point rather than a seat-for-seat match or a final quote — the provider sets the price, fees, availability and delivery terms.</p></section>${renderComparisonIntentCards()}<section id="compare-by-artist" class="nested-panel"><h2>Start with an artist</h2><p>Open an artist to find the date you mean. Compare at the level of a single show — that's the only comparison that tells you anything.</p>${renderComparisonHubArtistCards(
      catalog,
      events
    )}</section><section id="compare-by-city" class="nested-panel"><h2>Find a concert by city</h2><p>If the city matters more than the act, start here — then narrow down to the artist, venue, and date.</p>${renderComparisonHubCityLinks(
      events
    )}</section>${renderProviderChecklistSection()}<section class="nested-panel"><h2>Why the same show costs different amounts</h2><div class="card-grid"><article class="info-card"><h3>Who's selling it</h3><p>A ticket straight from the box office and a resale listing are different products with different rules.</p></article><article class="info-card"><h3>Where you're sitting</h3><p>Section, row, sightline and how close you are to the stage all move the number.</p></article><article class="info-card"><h3>When you look</h3><p>Onsales, extra releases and resale supply all shift in the weeks before a show.</p></article><article class="info-card"><h3>Fees</h3><p>The first number you see is rarely the last. Service, delivery, tax and handling get added later.</p></article></div></section>${renderComparisonTrustPanel(
      events
    )}<section class="nested-panel"><h2>Ticket sites and sources</h2><p>What we do is collect checked ticket links and explain how to read them. Use them as a starting point, then confirm the price, fees, seat restrictions, delivery, refunds and event terms on the provider before you pay.</p><p class="disclosure-note">Some outbound links are affiliate links. We don't sell tickets, can't guarantee availability, and won't tell you one provider is always cheaper.</p><div class="action-row">${anchor(
      "How it works",
      "/how-it-works",
      "button button-secondary"
    )}${anchor("Affiliate disclosure", "/affiliate-disclosure", "button button-secondary")}${anchor("Ticket buying guide", "/guides/how-to-compare-concert-ticket-prices", "button button-secondary")}${anchor(
      "SeatGeek vs Ticketmaster",
      "/guides/seatgeek-vs-ticketmaster",
      "button button-secondary"
    )}${anchor(
      "Currency converter",
      "/currency-converter",
      "button button-secondary"
    )}</div></section><section id="current-events" class="nested-panel"><h2>Browse concerts and tours</h2><p>Artist and tour pages are where the checked links and per-show guidance live.</p><div class="mini-link-grid">${anchor("All artists", "/artists", "mini-link")}${anchor("Browse cities", "/cities", "mini-link")}${anchor("Browse venues", "/venues", "mini-link")}${anchor("Buying guides", "/guides", "mini-link")}${(catalog.tours || [])
      .filter((tour) => tour && tour.verified === true && tour.artist_slug && tour.slug)
      .slice(0, 6)
      .map((tour) => anchor(tour.tour_name || "Tour ticket options", `/artists/${tour.artist_slug}/${tour.slug}`, "mini-link"))
      .join("")}</div></section>${renderComparisonHubEventCards(
      events
    )}<section class="nested-panel faq-panel"><h2>FAQ</h2>${faqHtml}</section></section></main>`;
  }

  if (route.type === "artist") {
    const artist = route.artist;
    const seatGeekAvailable = isSeatGeekConfigured(env);
    const vividSeatsAvailable = isVividSeatsConfigured(env);
    const marketplaceAvailability = Object.fromEntries(IMPACT_MARKETPLACE_PROVIDERS.map((provider) => [provider.slug, isImpactMarketplaceConfigured(env, provider)]));
    const relatedGuideSlugs = artist.related_guides || [];
    const relatedGuideLinks = relatedGuideSlugs
      .slice(0, 4)
      .map(slug => {
        const guidePath = `/guides/${slug}`;
        const guide = Object.entries(GUIDE_ROUTES).find(([path]) => path === guidePath);
        if (!guide) return "";
        const [path, guideData] = guide;
        return `<li>${anchor(guideData.h1 || guideData.title.replace(" | TourTicketCompare", ""), path)}</li>`;
      })
      .filter(Boolean)
      .join("");
    const relatedGuidesHtml = relatedGuideLinks
      ? `<section class="nested-panel"><h2>Related guides</h2><p>How to compare prices, tell primary from resale, spot a scam, and pick your moment:</p><ul class="guide-link-list">${relatedGuideLinks}</ul></section>`
      : "";
    const isIndexableArtist = artist.indexing_status === "indexable_with_substantial_content";
    const shows = futureShowsForArtist(events, artist.slug);
    // Derived, data-driven content model (search intro, tour summaries, buying
    // guide, pricing explanation) built once from the same verified event data.
    const contentModel = buildArtistContentModel(artist, shows);
    const artistExtraContentHtml = renderArtistExtraContentHtml(contentModel, events, artist);
    const reviewNoticeHtml = isIndexableArtist
      ? ""
      : `<section class="nested-panel review-notice"><p class="disclosure-note">This artist page is currently under review. Event details are shown for reference while ticket links are checked.</p></section>`;
    const artistFaqHtml = artistFaqEntries(artist)
      .map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`)
      .join("");
    const providerAvailability = { seatgeek: seatGeekAvailable, "vivid-seats": vividSeatsAvailable, ...marketplaceAvailability };
    const primaryProviderLink = availableArtistProviderLinks(catalog, artist, providerAvailability)[0] || null;
    const emptyStateProviderCta = primaryProviderLink
      ? {
          name: PROVIDER_DISPLAY_NAMES[slugify(primaryProviderLink.provider)] || primaryProviderLink.provider,
          href: artistProviderHref(artist, primaryProviderLink, "artist_page")
        }
      : null;
    // Only computed for the empty board: the artist's last verified dates give
    // the zero-upcoming state real, factual content instead of a bare form.
    const pastShows = shows.length ? [] : recentPastShowsForArtist(events, artist.slug, 3);
    return `<main id="mainContent"><section class="content-page artist-page" aria-labelledby="artistTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="artistTitle">${escapeHtml(
      artist.name
    )} tickets and tour dates</h1><p class="lead">${escapeHtml(
      artistSearchIntro(artist)
    )}</p>${reviewNoticeHtml}${shows.length ? `${renderShowBoardServerHtml(shows, seatGeekAvailable, isIndexableArtist, artist.name, vividSeatsAvailable, null, marketplaceAvailability, artist.slug)}${renderProviderFallback(
      catalog,
      artist,
      "artist_page",
      providerAvailability
    )}${renderVerificationDisclosure(artist, shows)}` : `${renderProviderFallback(
      catalog,
      artist,
      "artist_page",
      providerAvailability
    )}${renderShowBoardServerHtml(shows, seatGeekAvailable, isIndexableArtist, artist.name, vividSeatsAvailable, emptyStateProviderCta, marketplaceAvailability, artist.slug, pastShows)}${renderVerificationDisclosure(artist, shows)}`}<section class="split-section"><div><h2>About ${escapeHtml(
      artist.name
    )}</h2><p>${escapeHtml(artist.factual_summary)}</p></div><div><h2>About these links</h2><p>${escapeHtml(
      artist.ticket_buying_notes
    )}</p></div></section><section class="nested-panel"><h2>Before you buy</h2><ul class="check-list"><li>Check the price you actually pay, once fees are added.</li><li>Check where the seat is, and whether the view is restricted.</li><li>Check the provider's delivery, refund, and resale terms.</li></ul></section>${artistExtraContentHtml}${relatedGuidesHtml}<section class="nested-panel"><h2>Useful links</h2><div class="mini-link-grid">${anchor(
      "Compare concert ticket prices",
      "/compare-concert-ticket-prices",
      "mini-link"
    )}${anchor("All artists", "/artists", "mini-link")}${anchor("Ticket buying guides", "/guides", "mini-link")}${anchor(
      "How it works",
      "/how-it-works",
      "mini-link"
    )}${anchor(
      "Affiliate disclosure",
      "/affiliate-disclosure",
      "mini-link"
    )}</div></section><section class="nested-panel faq-panel"><h2>${escapeHtml(
      artist.name
    )} ticket FAQ</h2>${artistFaqHtml}</section></section></main>`;
  }

  if (route.type === "artist-city") {
    const artist = route.artist;
    const artistCity = route.artistCity;
    const seatGeekAvailable = isSeatGeekConfigured(env);
    const vividSeatsAvailable = isVividSeatsConfigured(env);
    const marketplaceAvailability = Object.fromEntries(IMPACT_MARKETPLACE_PROVIDERS.map((provider) => [provider.slug, isImpactMarketplaceConfigured(env, provider)]));
    // Reuse the artist show board so CTAs, gated price snapshots, /api/out
    // tracking, and analytics are identical to the main artist page — filtered
    // to exactly the reviewed shows in this city.
    const cityShowIds = artistCityShowIdSet(artistCity);
    const shows = futureShowsForArtist(events, artist.slug).filter((show) => cityShowIds.has(String(show.id || "")));
    // A single-date page is noindex,follow: it renders the one show card, the
    // at-a-glance facts, and the crawl paths, and stops there. The FAQ block
    // would restate that same card four times, which is the filler this policy
    // exists to remove — so it is dropped from the page and from the JSON-LD
    // graph together (routeSchema gates FAQPage on route.indexable).
    const faqHtml = route.indexable
      ? `<section class="nested-panel faq-panel"><h2>${escapeHtml(artist.name)} in ${escapeHtml(
          artistCity.city
        )}: ticket FAQ</h2>${artistCityFaqEntries(artist, artistCity)
          .map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`)
          .join("")}</section>`
      : "";
    const relatedLinksHtml = renderArtistCityRelatedLinks(
      artist,
      artistCity,
      route.otherCities,
      route.cityIndexable,
      route.indexableVenueSlugs
    );
    return `<main id="mainContent"><section class="content-page artist-city-page" aria-labelledby="artistCityTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="artistCityTitle">${escapeHtml(artist.name)} Tickets in ${escapeHtml(
      artistCity.label
    )}</h1><p class="lead">${escapeHtml(
      artistCityIntroSentence(artist, artistCity)
    )}</p><p class="disclosure-note">Prices and availability are set by the provider and can change. Any figure shown is a timestamped listed-price snapshot for a verified event, not a final checkout total. This is a selective list of reviewed dates, not a complete local calendar.</p>${renderArtistCityAnswerSummary(
      artist,
      artistCity
    )}${renderShowBoardServerHtml(
      shows,
      seatGeekAvailable,
      true,
      artist.name,
      vividSeatsAvailable,
      null,
      marketplaceAvailability,
      artist.slug
    )}${renderArtistPricingHtml(
      artistPricingExplanation()
    )}${relatedLinksHtml}<section class="nested-panel"><h2>Useful links</h2><div class="mini-link-grid">${anchor(
      `All ${artist.name} tickets and dates`,
      `/artists/${artist.slug}`,
      "mini-link"
    )}${anchor("Compare concert ticket prices", "/compare-concert-ticket-prices", "mini-link")}${anchor(
      "How to compare concert ticket prices",
      "/guides/how-to-compare-concert-ticket-prices",
      "mini-link"
    )}${anchor("Concert ticket fees explained", "/guides/concert-ticket-fees-explained", "mini-link")}</div></section><div class="action-row">${anchor(
      `All ${artist.name} tickets`,
      `/artists/${artist.slug}`,
      "button button-primary"
    )}${anchor("Compare concert ticket prices", "/compare-concert-ticket-prices", "button button-secondary")}</div>${faqHtml}</section></main>`;
  }

  if (route.type === "guide") {
    const fullContent = route.fullContent && guideContent[route.path]
      ? renderFullGuideContent(guideContent[route.path].sections)
      : "";
    const contentHtml = fullContent
      ? fullContent
      : `<section class="nested-panel"><h2>What this guide covers</h2><p>This guide explains what to check, red flags to avoid, what to confirm before buying, and what TourTicketCompare does and does not verify. Final prices, fees, availability, delivery, and checkout terms should always be confirmed on the provider site.</p></section>`;
    const artistBrowseHtml = renderArtistBrowseSection(catalog);
    return `<main id="mainContent"><section class="content-page guide-page" aria-labelledby="guideTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="guideTitle">${escapeHtml(route.h1 || route.title.replace(" | TourTicketCompare", ""))}</h1><p class="lead">${escapeHtml(
      route.description
    )}</p>${renderGuideProvenance(route)}${contentHtml}${renderGuideSources(
      guideContent[route.path]?.sources
    )}${artistBrowseHtml}<div class="action-row">${anchor(
      "Compare event ticket prices",
      "/guides/how-to-compare-event-ticket-prices",
      "button button-primary"
    )}${anchor(
      "Compare concert ticket prices",
      "/compare-concert-ticket-prices",
      "button button-primary"
    )}${anchor("How it works", "/how-it-works", "button button-secondary")}${anchor(
      "Affiliate disclosure",
      "/affiliate-disclosure",
      "button button-secondary"
    )}</div></section></main>`;
  }

  if (route.type === "cities-index") {
    const cities = Array.isArray(route.cities) ? route.cities : [];
    const leadingCity = cities[0];
    return `<main id="mainContent"><section class="content-page" aria-labelledby="citiesTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="citiesTitle">Concerts by city</h1><p class="lead">Start with where you want to go. Each city guide brings together reviewed upcoming tour dates, artists, and venues so you can identify the exact show before comparing checked ticket options.</p><section class="nested-panel"><h2>Where does TourTicketCompare track upcoming concerts?</h2><p><strong>Short answer:</strong> ${escapeHtml(
      `${cities.length} ${cities.length === 1 ? "city currently has" : "cities currently have"} enough reviewed upcoming dates to appear in this index.`
    )}${leadingCity ? ` The broadest current coverage is ${anchor(leadingCity.city, `/cities/${leadingCity.slug}`)} with ${escapeHtml(cityShowCountLabel(leadingCity.showCount))}.` : ""}</p><p>Coverage is selective rather than a complete events calendar. City pages update as reviewed dates are added or pass, so use the provider linked from the artist page to confirm the latest schedule and ticket terms.</p></section><section class="nested-panel"><h2>What makes a city page useful?</h2><div class="card-grid"><article class="info-card"><h3>Enough distinct coverage</h3><p>A city must have at least four upcoming reviewed shows across at least two artists before it can be indexed.</p></article><article class="info-card"><h3>Event-level facts</h3><p>Every listed date comes from the same reviewed event records used on artist and venue pages; city or venue facts are never invented to fill a page.</p></article><article class="info-card"><h3>A route to the exact show</h3><p>Each city schedule links to the relevant artist event card, where checked provider destinations and eligible price snapshots appear.</p></article></div></section><section class="section-grid"><div class="section-intro"><h2>Cities with upcoming concerts</h2><p>${escapeHtml(
      `${cities.length} ${cities.length === 1 ? "city" : "cities"} currently meet the coverage threshold.`
    )}</p></div>${renderCityLinks(cities)}</section><section class="nested-panel"><h2>Before choosing a concert ticket</h2><p>A city and date narrow the search, but they do not make two tickets equivalent. Match the ticket type, quantity, section or standing area, view notes, delivery method, and final checkout total before deciding.</p><div class="mini-link-grid">${anchor(
      "How to compare concert ticket prices",
      "/guides/how-to-compare-concert-ticket-prices",
      "mini-link"
    )}${anchor("Concert ticket fees explained", "/guides/concert-ticket-fees-explained", "mini-link")}${anchor(
      "How to read a ticket listing",
      "/guides/how-to-read-a-ticket-listing",
      "mini-link"
    )}</div></section><div class="action-row">${anchor(
      "Browse artists",
      "/artists",
      "button button-secondary"
    )}${anchor("Browse venues", "/venues", "button button-secondary")}${anchor(
      "Compare concert ticket prices",
      "/compare-concert-ticket-prices",
      "button button-secondary"
    )}</div></section></main>`;
  }

  if (route.type === "city") {
    const city = route.city;
    const yearLabel = cityYearLabel(city);
    const indexableArtistSlugs = new Set(route.indexableArtistSlugs || []);
    const indexableVenueSlugs = new Set(
      deriveVenues(events).filter((venue) => venue.indexable).map((venue) => venue.slug)
    );
    const faqHtml = cityFaqEntries(city)
      .map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`)
      .join("");
    return `<main id="mainContent"><section class="content-page city-page" aria-labelledby="cityTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="cityTitle">Concerts in ${escapeHtml(city.city)}${yearLabel ? `: ${escapeHtml(yearLabel)} dates and venues` : ""}</h1><p class="lead">Use this reviewed city guide to find an upcoming show by artist, venue, and date before you compare ticket options. We currently track ${escapeHtml(
      `${cityShowCountLabel(city.showCount)} in ${city.city}, ${city.country}, across ${cityArtistCountLabel(
        city.artistCount
      )} and ${cityVenueCountLabel(city.venueCount)}.`
    )}</p><p class="disclosure-note">This is a selective list of reviewed tour dates, not a complete city events calendar. Ticket links and price snapshots appear only when their existing event-level verification and freshness gates pass.</p>${renderCityProvenance(
      city
    )}${renderCityAnswerSummary(
      city
    )}${renderCityArtistCoverage(city, indexableArtistSlugs)}<section class="section-grid"><div class="section-intro"><h2>Upcoming concerts in ${escapeHtml(
      city.city
    )}${yearLabel ? ` for ${escapeHtml(yearLabel)}` : ""}</h2><p>Shows are grouped by venue and listed in chronological order. Follow an artist link to the matching event card and checked provider options.</p></div>${renderCityShowGroups(
      city,
      indexableArtistSlugs,
      indexableVenueSlugs
    )}</section><section class="nested-panel"><h2>Compare tickets for a ${escapeHtml(
      city.city
    )} concert</h2><p>Open the artist page for the date you picked above: the event card there carries the checked provider destinations and any eligible, timestamped price snapshots for that exact show. The guides explain what to match before you pay.</p><div class="action-row">${anchor(
      "How to compare concert ticket prices",
      "/guides/how-to-compare-concert-ticket-prices",
      "button button-secondary"
    )}${anchor("Concert ticket fees explained", "/guides/concert-ticket-fees-explained", "button button-secondary")}${anchor(
      "All cities",
      "/cities",
      "button button-secondary"
    )}</div></section><section class="nested-panel faq-panel"><h2>${escapeHtml(
      city.city
    )} concert FAQ</h2>${faqHtml}</section></section></main>`;
  }

  if (route.type === "venues-index") {
    const venues = Array.isArray(route.venues) ? route.venues : [];
    return `<main id="mainContent"><section class="content-page" aria-labelledby="venuesTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="venuesTitle">Concert venues</h1><p class="lead">Browse venues with enough reviewed coverage to compare upcoming dates across multiple artists. Open a venue to identify the exact show, then follow its artist page to checked ticket options and any approved price snapshots.</p><section class="nested-panel"><h2>Which concert venues are included?</h2><p><strong>Short answer:</strong> ${escapeHtml(
      `${venues.length} ${venues.length === 1 ? "venue currently has" : "venues currently have"} at least three reviewed upcoming shows across at least two artists.`
    )} This is selective TourTicketCompare coverage, not a complete venue directory or a reproduction of each venue's calendar.</p></section><section class="nested-panel"><h2>Why the coverage threshold matters</h2><p>A venue page is indexed only when it can help someone compare more than one artist's schedule at that location. Every date comes from the same reviewed event records used on the artist page; expired dates are removed automatically, and no venue facts are invented to fill a page.</p></section><section class="section-grid"><div class="section-intro"><h2>Venues with upcoming shows</h2><p>${escapeHtml(
      `${venues.length} ${venues.length === 1 ? "venue" : "venues"} currently meet the coverage threshold.`
    )}</p></div>${renderVenueLinks(venues)}</section><div class="action-row">${anchor(
      "Browse artists",
      "/artists",
      "button button-secondary"
    )}${anchor("Browse cities", "/cities", "button button-secondary")}${anchor("Compare concert ticket prices", "/compare-concert-ticket-prices", "button button-secondary")}${anchor(
      "Read buying guides",
      "/guides",
      "button button-secondary"
    )}</div></section></main>`;
  }

  if (route.type === "venue") {
    const venue = route.venue;
    const location = venueLocationLabel(venue);
    const cityPage = cityForVenue(events, venue);
    const seatGeekAvailable = isSeatGeekConfigured(env);
    const vividSeatsAvailable = isVividSeatsConfigured(env);
    const marketplaceAvailability = Object.fromEntries(IMPACT_MARKETPLACE_PROVIDERS.map((provider) => [provider.slug, isImpactMarketplaceConfigured(env, provider)]));
    const indexableArtistSlugs = new Set(route.indexableArtistSlugs || []);
    const faqHtml = venueFaqEntries(venue)
      .map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`)
      .join("");
    return `<main id="mainContent"><section class="content-page venue-page" aria-labelledby="venueTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="venueTitle">${escapeHtml(venue.venue)} concerts and upcoming shows</h1><p class="lead">${escapeHtml(
      `We track ${venueShowCountLabel(venue.showCount)} at ${venue.venue}${location ? ` in ${location}` : ""} across ${venueArtistCountLabel(
        venue.artistSlugs.length
      )}.`
    )} Pick a date and open a checked provider option for that show.</p><p class="disclosure-note">Ticket links and any approved price snapshots are shown only when their existing event-level verification and runtime gates pass. Confirm final prices and fees on the provider site.</p>${renderVenueProvenance(
      venue
    )}${renderVenueAnswerSummary(venue, indexableArtistSlugs)}<section class="section-grid"><div class="section-intro"><h2>Upcoming shows at ${escapeHtml(
      venue.venue
    )}</h2><p>Dates are grouped by artist and listed earliest first. Use the exact event card to review checked destinations and any eligible, timestamped price snapshots.</p></div>${renderVenueShowGroups(
      venue,
      events,
      indexableArtistSlugs,
      seatGeekAvailable,
      vividSeatsAvailable,
      marketplaceAvailability
    )}</section><section class="nested-panel"><h2>Getting tickets at ${escapeHtml(
      venue.venue
    )}</h2><p>Use the checked provider button on the exact date you want above, or open that show's artist page for the full event view and any approved, timestamped price snapshots. The guides cover what to match on the provider site before you pay.</p><div class="action-row">${anchor(
      "How to compare concert ticket prices",
      "/guides/how-to-compare-concert-ticket-prices",
      "button button-secondary"
    )}${cityPage ? anchor(`More concerts in ${cityPage.city}`, `/cities/${cityPage.slug}`, "button button-secondary") : ""}${anchor("Concert ticket fees explained", "/guides/concert-ticket-fees-explained", "button button-secondary")}${anchor(
      "All venues",
      "/venues",
      "button button-secondary"
    )}</div></section><section class="nested-panel faq-panel"><h2>${escapeHtml(
      venue.venue
    )} concert FAQ</h2>${faqHtml}</section></section></main>`;
  }

  if (route.path === "/artists") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="artistsTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="artistsTitle">Artists we track</h1><p class="lead">Pick an artist to see their upcoming dates and where to buy for each one. Artists with announced dates are listed first; the ones marked <strong>No dates yet</strong> have a page and an alert signup, but nothing on sale.</p><p class="disclosure-note">Coverage varies by artist and region. A ticket link only goes up once we've checked the artist, date, venue, and where the link lands.</p>${renderArtistStatusLegendHtml()}${renderArtistLinks(
      catalog,
      events
    )}</section></main>`;
  }

  if (route.path === "/guides") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="guidesTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="guidesTitle">Ticket buying guides</h1><p>Start with whatever you're stuck on: reading a listing, working out the real total, primary or resale, when to buy, or what the small print means.</p><section class="nested-panel"><h2>Read a guide, then go back to the show</h2><p>Guides tell you how to decide. Artist pages are where you apply it to an actual date. If you already know who you're going to see, start there.</p><div class="action-row">${anchor("Browse artists", "/artists", "button button-primary")}${anchor("Browse venues", "/venues", "button button-secondary")}</div></section><section class="nested-panel"><h2>The short version</h2><ul class="check-list"><li>Check the artist, local date, venue, quantity, ticket type, and seat details all match.</li><li>Compare the total at checkout for that exact ticket, not the price on the search card.</li><li>Read the delivery, refund, transfer, and resale terms before you pay.</li><li>Stick to official sources or established marketplaces. Avoid social-media sellers.</li><li>Show priced in another currency? Get a rough figure from the ${anchor(
      "currency converter",
      "/currency-converter",
      "text-link"
    )}, then check which currency you're actually charged in at checkout.</li></ul></section>${renderGuideClusters()}<div class="action-row">${anchor(
      "Compare checked concert events",
      "/compare-concert-ticket-prices",
      "button button-primary"
    )}${anchor("How it works", "/how-it-works", "button button-secondary")}${anchor(
      "Affiliate disclosure",
      "/affiliate-disclosure",
      "button button-secondary"
    )}</div></section></main>`;
  }

  if (route.path === "/how-it-works") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="pageTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="pageTitle">How TourTicketCompare works</h1><p class="lead">We're an independent site that helps you find tour dates, see what the ticket sites are charging for the same show, and work out what to check before you pay. We don't sell tickets, and we only link somewhere once we've followed the link ourselves.</p><section class="nested-panel"><h2>What we do</h2><ul class="check-list"><li>Collect ticket links for major tours, including plain links to official sellers like Ticketmaster.</li><li>Put up a link for a specific date only when we can confirm where it goes.</li><li>Explain how to compare totals, read fees, and check the terms before you commit.</li><li>Say plainly when we've got nothing for a show, instead of padding the page.</li></ul></section><section class="nested-panel"><h2>What we don't do</h2><ul class="check-list"><li>Sell you a ticket.</li><li>Compare prices unless we have current ones for the same confirmed event.</li><li>Show a price without knowing which provider it came from and when.</li><li>Dump you on a generic artist page when you asked about one date.</li><li>Scrape other sites, or publish a tour date we can't confirm.</li></ul></section><section class="nested-panel"><h2>About the links</h2><p>Ticket buttons take you to an external ticketing site. Some of them are affiliate links, so we may earn a commission if you buy — it doesn't cost you anything extra.</p><p class="disclosure-note">That commission doesn't decide which links appear. A button only goes up when we can confirm where it lands, paid or not.</p></section><section class="nested-panel"><h2>What to check on the provider's site</h2><ul class="check-list"><li>The final price, with every fee and tax showing.</li><li>Exactly where the seat or standing area is.</li><li>How and when the tickets reach you — instant, transfer, or posted.</li><li>The refund, resale, and cancellation terms.</li><li>That the date, venue, and artist are the show you meant.</li></ul></section><section class="nested-panel"><h2>What we check first</h2><p>We match the artist, date, and venue on each card against the source data, and we follow the ticket link before showing a button for it. If we can't do both, the card and the link stay off the page.</p></section><section class="nested-panel faq-panel"><h2>FAQ</h2><details><summary>Is TourTicketCompare official?</summary><p>No — we're independent, and not connected to any artist, venue, promoter, or ticket seller.</p></details><details><summary>Can I buy tickets here?</summary><p>No. You buy on the ticket site itself; we just point you to it.</p></details><details><summary>Why does one show have buttons and another doesn't?</summary><p>Because we haven't been able to confirm where that link goes yet. We'd rather show nothing than send you somewhere wrong.</p></details><details><summary>Will the price change?</summary><p>It can. The ticket site sets its own prices, fees, availability and terms, and they move.</p></details></section><div class="action-row">${anchor(
      "Compare concert ticket prices",
      "/compare-concert-ticket-prices",
      "button button-primary"
    )}${anchor("Read buying guides", "/guides", "button button-secondary")}${anchor(
      "Affiliate disclosure",
      "/affiliate-disclosure",
      "button button-secondary"
    )}</div></section></main>`;
  }

  if (route.path === "/currency-converter") {
    // Server-rendered shell for the converter. Controls stay disabled until
    // public/app.js loads rates from /api/rates (ECB reference rates, cached,
    // fail-closed) — no rates are ever rendered or invented server-side.
    return `<main id="mainContent"><section class="content-page currency-converter-page" aria-labelledby="converterTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="converterTitle">Currency converter</h1><p class="lead">Convert a ticket budget between currencies before you buy. Ticket prices and price snapshots are shown in the provider's own currency, so a quick conversion helps you compare a listing against your real budget.</p><section class="nested-panel currency-converter-panel"><h2>Convert an amount</h2><form class="currency-converter-form" data-currency-converter novalidate><div class="currency-converter-grid"><div class="currency-converter-field"><label for="converterAmount">Amount</label><input type="text" id="converterAmount" inputmode="decimal" autocomplete="off" spellcheck="false" value="100" data-converter-amount /></div><div class="currency-converter-field"><label for="converterFrom">From</label><select id="converterFrom" data-converter-from disabled><option>Loading&#8230;</option></select></div><button class="currency-converter-swap" type="button" data-converter-swap aria-label="Swap the from and to currencies" disabled>&#8645;</button><div class="currency-converter-field"><label for="converterTo">To</label><select id="converterTo" data-converter-to disabled><option>Loading&#8230;</option></select></div></div><p class="currency-converter-result" data-converter-result aria-live="polite">Enable JavaScript to load current reference rates.</p><p class="disclosure-note" data-converter-meta>Rates are European Central Bank daily reference rates, updated each working day. They are indicative mid-market rates — not a live FX quote and not the rate your card issuer or the ticket provider applies.</p></form><noscript><p class="disclosure-note">The converter needs JavaScript to load current reference rates. Without it, check the current rate with your bank or card issuer before comparing a listing in another currency.</p></noscript></section><section class="nested-panel"><h2>Why ticket prices appear in different currencies</h2><p>Providers price each event in the currency of the event's market: United States shows in US dollars, United Kingdom shows in pounds, most European shows in euros, and Canadian shows in Canadian dollars. Any price snapshots we display keep the provider's own currency for that reason — we never convert or restate a provider's price.</p></section><section class="nested-panel"><h2>Before you pay in another currency</h2><ul class="check-list"><li>Check which currency the provider charges at checkout — it may differ from the currency shown while browsing.</li><li>If checkout offers to charge you in your home currency instead (dynamic currency conversion), compare carefully: that convenience rate is often worse than your card issuer's rate.</li><li>Ask your bank or card issuer about foreign-transaction fees; they apply on top of any exchange rate.</li><li>Treat converted amounts as a guide only — the exact rate applied is set by your card issuer or payment provider on the day the charge settles.</li></ul></section><div class="action-row">${anchor(
      "Compare concert ticket prices",
      "/compare-concert-ticket-prices",
      "button button-primary"
    )}${anchor("Concert ticket fees explained", "/guides/concert-ticket-fees-explained", "button button-secondary")}${anchor(
      "How it works",
      "/how-it-works",
      "button button-secondary"
    )}</div></section></main>`;
  }

  if (route.path === "/affiliate-disclosure") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="affiliateTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="affiliateTitle">Affiliate disclosure</h1><p class="lead">Some of the ticket links here earn us a commission if you buy through them. You don't pay a penny more for it. Here's exactly how that works.</p><section class="nested-panel"><h2>The short version</h2><ul class="check-list"><li>We link to ticket sites, and some of those links pay us if you buy.</li><li>It doesn't add anything to your price or your fees.</li><li>We say on this page which links are affiliate links and which aren't.</li><li>Whether a link pays us has nothing to do with whether we show it.</li></ul></section><section class="nested-panel"><h2>Why that doesn't change what we publish</h2><p>We don't put up fake prices, made-up dates, venues that don't exist, or a ranking we can't back — not for a commission, not for anything. A ticket button appears when we can confirm the artist, the event, and where the link goes. If we can't confirm it, it doesn't go up.</p></section><section class="nested-panel"><h2>Which links pay us</h2><ul class="check-list"><li><strong>Official sellers</strong> — artist and event pages on official ticketing sites, usually Ticketmaster. Plain links. We're not in their affiliate programme and earn nothing from these.</li><li><strong>Resale marketplaces</strong> — sites like SeatGeek and Vivid Seats, where sellers list tickets. These are affiliate links and may pay us a commission.</li><li><strong>Guides</strong> — just writing. Nothing to buy.</li></ul></section><section class="nested-panel"><h2>What only the provider can tell you</h2><ul class="check-list"><li>The final price, with fees, taxes, and delivery.</li><li>Where the seat is and whether the view is restricted.</li><li>Whether those exact seats are still available.</li><li>Refund, cancellation, transfer, and resale rules.</li><li>How the payment and checkout are handled.</li></ul></section><section class="nested-panel"><h2>Before you pay</h2><p>Read the provider's terms. Check the date, venue, seat details, final total, delivery method, refund policy, and transfer rules. All of that comes from them, not from us — we can point you at the page, but we can't see your basket.</p></section><section class="nested-panel"><h2>Where the money goes</h2><p>Commission is what keeps the site running and the guides free. It's the only way we make money here.</p></section><div class="action-row">${anchor(
      "Compare concert ticket prices",
      "/compare-concert-ticket-prices",
      "button button-primary"
    )}${anchor("Read buying guides", "/guides", "button button-secondary")}</div></section></main>`;
  }

  if (route.path === "/contact") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="contactTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="contactTitle">Contact us</h1><p class="lead">Spotted a broken link or a date that looks wrong? Tell us and we'll fix it.</p><section class="nested-panel"><h2>How to reach us</h2><p>Email ${anchor(
      "hello@tourticketcompare.com",
      "mailto:hello@tourticketcompare.com",
      "text-link"
    )} — that's the quickest way to reach a person. We're also on X as ${anchor(
      "@RenaissanceWT",
      "https://x.com/RenaissanceWT",
      "text-link"
    )} and ${anchor(
      "@CowboyCarterWT",
      "https://x.com/CowboyCarterWT",
      "text-link"
    )}.</p></section><section class="nested-panel"><h2>Worth getting in touch about</h2><ul class="check-list"><li>A ticket button is broken, or drops you somewhere unexpected.</li><li>A date, venue, city, or artist detail looks wrong.</li><li>A provider link behaves oddly.</li><li>Anything about the site, the guides, or an artist page you'd change.</li></ul></section><section class="nested-panel"><h2>What helps us fix it faster</h2><p>Send the artist, the date, the venue or city, the page you were on, the ticket link if there was one, and a line on what looked wrong. That's usually enough for us to reproduce it.</p></section><section class="nested-panel"><h2>What we can't help with</h2><p>We don't sell tickets, so we can't do anything about an order, a refund, a transfer, a delivery that hasn't turned up, a payment problem, or an account you're locked out of. Those all have to go to the ticket site you bought from — the one on your confirmation email.</p></section><div class="action-row">${anchor(
      "Compare concert ticket prices",
      "/compare-concert-ticket-prices",
      "button button-primary"
    )}${anchor("Read buying guides", "/guides", "button button-secondary")}</div></section></main>`;
  }

  if (route.path === "/about") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="aboutTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="aboutTitle">About TourTicketCompare</h1><p class="lead">We're an independent site for working out where to buy tickets to a big tour — and what you'll actually pay.</p><section class="nested-panel"><h2>What we do</h2><ul class="check-list"><li>Pull together ticket links for major artists so you're not opening ten tabs.</li><li>Only publish a link for a specific date once we've checked the artist, date, venue, and where it goes.</li><li>Show the prices we have from each ticket site for that same show, with the time we got them.</li><li>Write plain guides on fees, resale, delivery timing, and what to look at before you pay.</li></ul></section><section class="nested-panel"><h2>What we don't do</h2><ul class="check-list"><li>Sell or resell tickets.</li><li>Pretend a price we captured earlier is live stock or your final total.</li><li>Crown one ticket site as always the better buy, because it never works out that way.</li><li>Make up tour dates, venues, prices, or availability.</li></ul></section><section class="nested-panel"><h2>About the affiliate links</h2><p>Some links earn us a commission when you buy. That's how the site pays for itself — and it has no say in what we publish. A link goes up once we've checked where it lands, whether or not it makes us anything.</p></section><div class="action-row">${anchor(
      "Compare concert ticket prices",
      "/compare-concert-ticket-prices",
      "button button-primary"
    )}${anchor("Read buying guides", "/guides", "button button-secondary")}</div></section></main>`;
  }

  if (route.path === "/editorial-policy") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="editorialTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="editorialTitle">Editorial policy</h1><p class="lead">Nothing goes on this site unless we can check where it came from. These are the rules we hold ourselves to.</p><section class="nested-panel"><h2>What we publish</h2><ul class="check-list"><li>Artist pages for major tours, with summaries drawn from confirmed public sources.</li><li>Links to artist pages on official ticketing sites, once we've followed them.</li><li>Links for a specific date, where we've checked the date, the venue, and where the link lands.</li><li>Current prices from ticket sites for that same show, each labelled with the provider and the time we captured it — and we'll only call one lower when we have fresh figures for both.</li><li>Guides on fees, resale, delivery timing, and what to look at before you pay.</li></ul></section><section class="nested-panel"><h2>What has to be true before a button appears</h2><p>The artist has to be one we've verified, the destination has to be a link we've configured and checked, and the link has to pass our outbound safety checks. For a specific date, we also need an event record with a confirmed date, venue, and artist. Where we have none of that, you get an honest empty state instead of a button.</p></section><section class="nested-panel"><h2>What we won't publish</h2><ul class="check-list"><li>Tour dates, venues, or cities we've made up.</li><li>Prices or availability we can't trace to an approved source.</li><li>Claims about partnerships or coverage we can't back up.</li><li>Fake comparison tables, placeholder prices, or a "cheaper" claim with only one side's figures.</li><li>Anything scraped off a ticket site or a competitor.</li><li>Savings or discount claims we can't evidence.</li><li>Event schema on a page with no confirmed event data behind it.</li></ul></section><section class="nested-panel"><h2>Corrections and broken links</h2><p>If a button's broken, sends you somewhere wrong, or a detail looks off, tell us on the ${anchor(
      "contact page",
      "/contact",
      "text-link"
    )}. When a link goes stale or we can't verify it any more, we fix it or pull it down — we don't leave it sitting there.</p></section><div class="action-row">${anchor(
      "Compare concert ticket prices",
      "/compare-concert-ticket-prices",
      "button button-primary"
    )}${anchor("How it works", "/how-it-works", "button button-secondary")}${anchor(
      "Affiliate disclosure",
      "/affiliate-disclosure",
      "button button-secondary"
    )}${anchor("Contact", "/contact", "button button-secondary")}</div></section></main>`;
  }

  return `<main id="mainContent"><div id="ttc-main"><section class="hero-panel" aria-labelledby="heroTitle"><div class="hero-copy-block"><h1 class="hero-title" id="heroTitle">Find your show, then compare the ticket sites that have it.</h1><p class="hero-subcopy">Search an artist, pick your date, and see the prices we have from each ticket site. Then head over to the provider to check the fees and buy.</p><p class="disclosure-note">Coverage is strongest in the United States, with selected UK, Europe, and Canada dates.</p><form class="hero-search-form" role="search" aria-label="Search artists, events, and guides"><label class="sr-only" for="site-search">Search by artist, city, country, venue, or tour</label><input class="hero-search-input" type="search" id="site-search" name="q" placeholder="Search by artist, city, country, venue, or tour" aria-label="Search by artist, city, country, venue, or tour" autocomplete="off" spellcheck="false" enterkeyhint="search" /><button class="button button-primary hero-search-submit" type="submit">Search</button></form><div class="action-row">${anchor(
    "Compare concert ticket prices",
    "/compare-concert-ticket-prices",
    "button button-primary"
  )}${anchor("Browse artists", "#featured-artists", "button button-secondary")}${anchor("Browse concert cities", "/cities", "button button-secondary")}${anchor("Read buying guides", "/guides", "button button-secondary")}</div></div></section><section id="search-widget" class="section-grid search-section" aria-labelledby="searchSectionTitle"><div class="section-intro"><h2 id="searchSectionTitle">Search results</h2><p>Search across artists, shows, and guides.</p></div><div class="search-results" role="region" aria-label="Search results" aria-live="polite" aria-atomic="false"></div></section><section class="section-grid what-you-can-do" aria-labelledby="whatYouCanDoTitle"><div class="section-intro"><h2 id="whatYouCanDoTitle">How it works</h2></div><div class="card-grid"><article class="info-card"><h3>1. Find your show</h3><p>Search an artist and pick the date you want to go to.</p>${anchor("Browse artists", "/artists", "text-link")}</article><article class="info-card"><h3>2. Compare the sites</h3><p>See the prices we have from each ticket site for that exact show.</p>${anchor("Compare ticket prices", "/compare-concert-ticket-prices", "text-link")}</article><article class="info-card"><h3>3. Buy on the provider's site</h3><p>Head over to check the fees, the final total, and what you're actually getting.</p>${anchor("Read the guide", "/guides/how-to-compare-concert-ticket-prices", "text-link")}</article></div></section><section id="featured-artists" class="section-grid" aria-labelledby="homeArtistsTitle"><div class="section-intro"><h2 id="homeArtistsTitle">Artists we track</h2><p>Upcoming dates and ticket links for every artist on the site. Artists with announced dates come first; the ones marked <strong>No dates yet</strong> have a page and an alert signup, but nothing on sale. Planning around a place rather than an act? ${anchor("Browse cities", "/cities", "text-link")} or ${anchor("browse venues", "/venues", "text-link")}.</p></div>${renderArtistLinks(
    catalog,
    events
  )}</section><section class="section-grid" aria-labelledby="homeBuyingGuidesTitle"><div class="section-intro"><h2 id="homeBuyingGuidesTitle">Buying guides</h2><p>Fees, resale, timing, scams — what to check before you buy.</p></div>${renderHomepageGuideLinks()}<div class="action-row">${anchor(
    "View all guides",
    "/guides",
    "button button-secondary"
  )}</div></section><section class="section-grid trust-section" aria-labelledby="trustTitle"><div class="section-intro"><h2 id="trustTitle">How we stay honest</h2></div><div class="nested-panel"><p>We're independent and unofficial, and we don't sell tickets. Every link is checked before it goes up, and if we can't check it, we don't show it.</p><p>Learn more: ${anchor("How we work", "/how-it-works", "text-link")} • ${anchor("Affiliate disclosure", "/affiliate-disclosure", "text-link")}</p></div></section></div></main>`;
}

function injectRoute(html, route, origin, catalog, events = [], guideContent = {}, env = {}) {
  // A route is indexable only when the *request* host is allowed to be indexed.
  // Non-canonical hosts (notably <project>.pages.dev, which serves production)
  // always emit noindex so they cannot compete with the apex.
  const hostIndexable = isIndexableOrigin(origin);
  origin = canonicalOrigin(origin);
  const canonicalUrl = `${origin}${route.path}`;
  const robots =
    route.indexable && hostIndexable ? "index,follow,max-image-preview:large" : "noindex,follow";
  let next = html;
  next = next.replace(/<title>[^<]*<\/title>/i, `<title>${escapeAttr(route.title)}</title>`);
  next = next.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeAttr(route.description)}" />`
  );
  next = next.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="robots" content="${robots}" />`
  );
  next = next.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeAttr(route.title)}" />`
  );
  next = next.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeAttr(route.description)}" />`
  );
  next = next.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${escapeAttr(canonicalUrl)}" />`
  );
  const ogImageUrl = `${origin}/og-image.png`;
  next = next.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${escapeAttr(ogImageUrl)}" />`
  );
  next = next.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${escapeAttr(ogImageUrl)}" />`
  );
  next = next.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeAttr(route.title)}" />`
  );
  next = next.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeAttr(route.description)}" />`
  );
  next = next.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeAttr(canonicalUrl)}" />`
  );
  next = next.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:type" content="${route.type === "guide" ? "article" : "website"}" />`
  );
  next = next.replace(
    /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json">${JSON.stringify(routeSchema(route, origin, guideContent, events, catalog, env))}</script>`
  );
  next = next.replace(/<main\s+id="mainContent">[\s\S]*?<\/main>/i, renderMainContent(route, catalog, events, guideContent, env));
  if (route.path === "/") {
    // Homepage-only progressive enhancement: ttc-home.js hydrates the #ttc-main
    // mount with the full redesigned homepage. Same-origin, so it satisfies the
    // existing CSP (script-src 'self'). The chrome stylesheet (ttc-home.css) is
    // loaded site-wide from the shell <head>; only this script is homepage-scoped.
    next = next.replace("</body>", '<script src="/ttc-home.js?v=20260729b" defer></script></body>');
  }
  return next;
}

const INTERNAL_IMPACT_TAG_TEST_PATH = "/internal/impact-tag-test";

function safeImpactCdnUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    if (!/(^|\.)impactcdn\.com$|(^|\.)impact\.com$/.test(host)) return null;
    return parsed.toString();
  } catch (err) {
    return null;
  }
}

function safeImpactCdnOrigin(value) {
  const url = safeImpactCdnUrl(value);
  if (!url) return null;
  try {
    return new URL(url).origin;
  } catch (err) {
    return null;
  }
}

function safeSeatGeekUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    if (host === "seatgeek.com" || host.endsWith(".seatgeek.com")) return parsed.toString();
    return null;
  } catch (err) {
    return null;
  }
}

function pickSampleTicketmasterUrl(events) {
  if (!Array.isArray(events)) return null;
  for (const event of events) {
    const url = safeShowTicketUrl(event && event.ticketmaster_url);
    if (url) {
      return { url, id: String(event.id || "").trim(), eventId: String(event.ticketmaster_event_id || "").trim() };
    }
  }
  return null;
}

function tokenMatches(provided, expected) {
  const a = String(provided || "");
  const b = String(expected || "");
  if (!a || !b || a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

function internalTagTestCsp(extraScriptOrigins = []) {
  const baseScript = ["'self'", "https://utt.impactcdn.com"];
  const baseConnect = ["'self'", "https://utt.impactcdn.com"];
  for (const origin of extraScriptOrigins) {
    if (origin && !baseScript.includes(origin)) baseScript.push(origin);
    if (origin && !baseConnect.includes(origin)) baseConnect.push(origin);
  }
  return [
    "default-src 'self'",
    "img-src 'self' data:",
    "style-src 'self'",
    `script-src ${baseScript.join(" ")}`,
    `connect-src ${baseConnect.join(" ")}`,
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'"
  ].join("; ");
}

async function renderInternalImpactTagTest(request, env, url) {
  const expectedToken = String(env && env.IMPACT_TAG_TEST_TOKEN ? env.IMPACT_TAG_TEST_TOKEN : "");
  const providedToken = url.searchParams.get("token") || "";
  if (!expectedToken || !tokenMatches(providedToken, expectedToken)) {
    return null;
  }

  const events = await loadEvents(env);
  const sample = pickSampleTicketmasterUrl(events);

  const sgRawCandidate =
    url.searchParams.get("sgUrl") ||
    (env && env.IMPACT_TAG_TEST_SEATGEEK_URL) ||
    "";
  const sgRawUrl = safeSeatGeekUrl(sgRawCandidate);

  const sgShowId = String(
    url.searchParams.get("sgShowId") ||
      (env && env.IMPACT_TAG_TEST_SEATGEEK_SHOW_ID) ||
      ""
  ).trim();

  const sgTagCandidate =
    url.searchParams.get("sgTagUrl") ||
    (env && env.IMPACT_SEATGEEK_PUBLISHER_TAG_URL) ||
    "";
  const sgTagSrc = safeImpactCdnUrl(sgTagCandidate);
  const sgTagOrigin = safeImpactCdnOrigin(sgTagCandidate);
  const sgTagParamProvided = url.searchParams.has("sgTagUrl");

  const tmRawAnchor = sample
    ? `<a href="${escapeAttr(sample.url)}" data-provider="ticketmaster" data-test-link="raw-ticketmaster" rel="noopener nofollow">Raw Ticketmaster direct link</a>`
    : `<span class="disabled-note" data-test-link="raw-ticketmaster" data-provider="ticketmaster">Raw Ticketmaster direct link unavailable: no event with a Ticketmaster URL found in events.json.</span>`;

  const sgRawAnchor = sgRawUrl
    ? `<a href="${escapeAttr(sgRawUrl)}" data-provider="seatgeek" data-test-link="raw-seatgeek" rel="noopener nofollow">Raw SeatGeek direct link</a>`
    : `<span class="disabled-note" data-test-link="raw-seatgeek" data-provider="seatgeek">Raw SeatGeek direct link unavailable: pass <code>?sgUrl=</code> or set <code>IMPACT_TAG_TEST_SEATGEEK_URL</code> to a https://seatgeek.com URL.</span>`;

  const tmOutHref = sample
    ? `/api/out?${new URLSearchParams({ showId: sample.id, provider: "ticketmaster" }).toString()}`
    : null;
  const tmOutAnchor = tmOutHref
    ? `<a href="${escapeAttr(tmOutHref)}" data-provider="ticketmaster" data-test-link="out-ticketmaster" rel="noopener nofollow">/api/out Ticketmaster control</a>`
    : `<span class="disabled-note" data-test-link="out-ticketmaster" data-provider="ticketmaster">/api/out Ticketmaster control unavailable: no sample event found.</span>`;

  const sgOutHref = sgShowId
    ? `/api/out?${new URLSearchParams({ showId: sgShowId, provider: "seatgeek" }).toString()}`
    : null;
  const sgOutAnchor = sgOutHref
    ? `<a href="${escapeAttr(sgOutHref)}" data-provider="seatgeek" data-test-link="out-seatgeek" rel="noopener nofollow">/api/out SeatGeek control</a>`
    : `<span class="disabled-note" data-test-link="out-seatgeek" data-provider="seatgeek">/api/out SeatGeek control unavailable: pass <code>?sgShowId=</code> or set <code>IMPACT_TAG_TEST_SEATGEEK_SHOW_ID</code>. Backend SeatGeek + Impact SeatGeek program credentials must also be configured server-side for the redirect to succeed.</span>`;

  const sgTagMeta = sgTagSrc
    ? `<meta name="impact-sg-tag-src" content="${escapeAttr(sgTagSrc)}" />`
    : "";

  const sgTagBanner = sgTagSrc
    ? `<p class="info-note">SeatGeek Publisher Tag will load using ${sgTagParamProvided ? "the validated <code>?sgTagUrl=</code> override" : "configured environment"} and a separate global (<code>window.impactStatSG</code>).</p>`
    : `<p class="warning-note"><strong>Warning:</strong> SeatGeek Publisher Tag is not loaded. Pass <code>?sgTagUrl=</code> or set <code>IMPACT_SEATGEEK_PUBLISHER_TAG_URL</code> (must point to an https://utt.impactcdn.com, https://*.impactcdn.com, or https://*.impact.com URL) to enable.</p>`;

  const body = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex,nofollow" />
<meta name="referrer" content="no-referrer" />
<title>Impact Publisher Tag Test (internal) | TourTicketCompare</title>
${sgTagMeta}
<link rel="stylesheet" href="/internal/impact-tag-test.css" />
</head>
<body>
<h1>Impact Publisher Tag Test (internal)</h1>
<p>Internal-only route. Not indexable. Exercises the SeatGeek Impact Publisher Tag. The Ticketmaster Publisher Tag was removed when the site left the Ticketmaster affiliate programme; the Ticketmaster links below are plain, untracked controls.</p>
<p>A Publisher Tag may transform at page load, at click time, through query decoration, or in a way that is confirmed only by Impact dashboard reporting. Do not treat a no-change href snapshot after 2 seconds as a final attribution failure.</p>
<p>Final SeatGeek pass/fail depends on the raw SeatGeek URL landing on the correct SeatGeek event page, the SeatGeek Impact account recording the click, and no double transformation. Keep <code>/api/out</code> controls as the fallback/reference path.</p>
${sgTagBanner}
<p id="sgTagStatus" class="info-note">SeatGeek Publisher Tag status will appear after the helper script runs.</p>

<section class="section">
  <h2>Test links</h2>
  <div class="links">
    ${tmRawAnchor}
    ${sgRawAnchor}
    ${tmOutAnchor}
    ${sgOutAnchor}
  </div>
</section>

<section class="section">
  <h2>Href snapshot diagnostics</h2>
  <p>Initial full hrefs and hosts are captured on DOMContentLoaded. Post-load hrefs and hosts are captured ~2 seconds later. Host changes are reported, but query-param decoration can count as a transform even when the host stays the same. No visible change is not conclusive because some tags transform on click or are verified only in Impact reporting. Nothing is sent off-device.</p>
  <div class="results-scroll">
    <table id="tagTestResults" data-schema-version="expanded-diagnostics-20260513"><thead><tr><th>label</th><th>data-provider</th><th>data-test-link</th><th>initial href host</th><th>post-load href host</th><th>initial full href</th><th>post-load full href</th><th>host changed</th><th>full href changed</th><th>recognised params</th><th>added params</th><th>tracking likely</th><th>diagnostic note</th></tr></thead><tbody><tr><td colspan="13">Waiting for snapshots...</td></tr></tbody></table>
  </div>
</section>

<script src="/internal/impact-tag-test.js?v=expanded-diagnostics-20260513" defer></script>
</body>
</html>`;

  const headers = new Headers();
  headers.set("Content-Type", "text/html; charset=UTF-8");
  headers.set("Cache-Control", "no-store");
  headers.set("X-Robots-Tag", "noindex, nofollow");
  headers.set("Referrer-Policy", "no-referrer");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Permissions-Policy", "interest-cohort=()");
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Cross-Origin-Resource-Policy", "same-origin");
  const extraOrigins = sgTagOrigin ? [sgTagOrigin] : [];
  headers.set("Content-Security-Policy", internalTagTestCsp(extraOrigins));
  return new Response(body, { status: 200, headers });
}

function renderNotFoundHtml(html, pathname, origin) {
  const route = {
    type: "not-found",
    path: pathname,
    title: "Page Not Found | TourTicketCompare",
    description: "This TourTicketCompare page is not published.",
    indexable: false
  };
  let next = injectRoute(html, route, origin, { artists: [], ticket_links: [], providers: [] });
  next = next.replace(
    /<main\s+id="mainContent">[\s\S]*?<\/main>/i,
    `<main id="mainContent"><section class="content-page" aria-labelledby="notFoundTitle"><h1 id="notFoundTitle">Page not found</h1><p>We could not find that page. Use the artist index, buying guides, or homepage to find current public pages.</p><div class="action-row">${anchor(
      "Compare concert ticket prices",
      "/compare-concert-ticket-prices",
      "button button-primary"
    )}${anchor("Read buying guides", "/guides", "button button-secondary")}${anchor("Return home", "/", "button button-secondary")}</div></section></main>`
  );
  return next;
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  // Safety net for www→apex host normalization; if a Cloudflare edge redirect
  // rule exists it fires before this code is reached.
  if (url.hostname === `www.${CANONICAL_HOST}`) {
    const apexUrl = new URL(url);
    apexUrl.hostname = CANONICAL_HOST;
    return Response.redirect(apexUrl.toString(), 301);
  }

  const pathname = normalizePath(url.pathname);

  if (RESERVED_PREFIXES.some((prefix) => pathname.startsWith(prefix)) || RESERVED_FILES.has(pathname)) return next();

  if (pathname === INTERNAL_IMPACT_TAG_TEST_PATH) {
    const internalResponse = await renderInternalImpactTagTest(request, env, url);
    if (internalResponse) return internalResponse;
    // No valid token: fall through to the standard 404 path below.
  }

  const route = await routeForPath(pathname, env);
  if (!route && /\.[a-z0-9]+$/i.test(pathname)) return next();
  const indexResponse = await env.ASSETS.fetch(new Request(new URL("/", request.url), request));
  if (!indexResponse.ok) return next();

  const html = await indexResponse.text();
  if (!route) {
    const injected404 = renderNotFoundHtml(html, pathname, url.origin);
    const headers = new Headers(indexResponse.headers);
    headers.set("Content-Type", "text/html; charset=UTF-8");
    headers.set("Cache-Control", "no-store");
    applySecurityHeaders(headers);
    return new Response(injected404, { status: 404, headers });
  }

  if (route.type === "redirect") {
    return Response.redirect(new URL(route.location, url.origin).toString(), 301);
  }

  const catalog = await loadCatalog(env);
  const needsEvents = route.type === "artist" || route.type === "artist-city" || route.type === "city" || route.type === "venue" || route.type === "comparison-hub" || route.path === "/artists" || route.path === "/";
  const events = route.events || (needsEvents ? await loadEvents(env) : []);
  let renderEvents = events;
  if ((route.type === "artist" || route.type === "artist-city" || route.type === "venue") && events.length) {
    const priceCandidates = route.type === "artist" || route.type === "artist-city"
      ? futureShowsForArtist(events, route.artist.slug, 6)
      : events
        .filter((event) => route.venue?.shows?.some((show) => String(show?.id || "") === String(event?.id || "")))
        .map((event) => futureShowsForArtist([event], event.artist_slug, 1)[0])
        .filter(Boolean);
    const pricedShows = await attachApprovedMarketplacePrices(priceCandidates, env);
    const pricedById = new Map(pricedShows.map((show) => [String(show?.id || ""), show]));
    renderEvents = events.map((event) => {
      const priced = pricedById.get(String(event?.id || ""));
      return priced ? { ...event, prices: Array.isArray(priced.prices) ? priced.prices : [] } : event;
    });
  }
  const guideContent = route.type === "guide" ? await loadGuideContent(env) : {};
  const injected = injectRoute(html, route, url.origin, catalog, renderEvents, guideContent, env);
  const headers = new Headers(indexResponse.headers);
  headers.set("Content-Type", "text/html; charset=UTF-8");
  headers.set("Cache-Control", "no-cache, max-age=0, must-revalidate");
  applySecurityHeaders(headers);
  return new Response(injected, { status: 200, headers });
}
