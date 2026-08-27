// Shared route metadata used by functions/[[path]].js (Pages Functions).
// Edit here; do not duplicate in the consumer.

// Canonical production host. Canonicals, og:url, JSON-LD, and sitemap/llms.txt
// URLs must always reference the apex host — robots.txt already hardcodes it,
// and a request on www must not emit www canonicals.
//
// Cloudflare serves the *production* deployment on <project>.pages.dev
// permanently, so that host is not a throwaway preview: left alone it is a
// fully crawlable duplicate of the live site that self-canonicalises away from
// the apex. Every non-local host therefore emits apex canonicals (below) and
// noindex robots meta (see isIndexableOrigin). Only local dev keeps its own
// origin, so links stay clickable off-network.
export const CANONICAL_HOST = "tourticketcompare.com";
export const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;

// The content editor runs on its own hostname, not on the apex.
//
// This is a security boundary, not cosmetics. Sveltia persists the signed-in
// user's GitHub token in localStorage, and localStorage is shared by every page
// on an origin. The apex serves the public site with Google Tag Manager and
// Analytics on it, so an editor on the apex would put a repository-write
// credential within reach of any third-party tag or any XSS anywhere on the
// site — and a push to main auto-deploys. A separate hostname gives the editor
// its own storage partition.
//
// Two rules keep the origins apart, both enforced in _middleware.js: the admin
// host serves nothing except the editor, and no other host serves the editor.
export const ADMIN_HOST = `admin.${CANONICAL_HOST}`;
export const ADMIN_ORIGIN = `https://${ADMIN_HOST}`;

const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "0.0.0.0", "[::1]", "::1"]);

function hostnameOf(origin) {
  try {
    return new URL(origin).hostname.toLowerCase();
  } catch (error) {
    return "";
  }
}

export function isLocalOrigin(origin) {
  const host = hostnameOf(origin);
  return Boolean(host) && (LOCAL_HOSTNAMES.has(host) || host.endsWith(".local"));
}

export function isCanonicalOrigin(origin) {
  const host = hostnameOf(origin);
  return host === CANONICAL_HOST || host.endsWith(`.${CANONICAL_HOST}`);
}

// Only the production host (and local dev) may serve indexable HTML. Any other
// host — *.pages.dev above all — is a duplicate and must be noindex so search
// engines drop it. Note this is deliberately *not* a robots.txt disallow:
// blocking the crawl would hide the noindex and strand already-indexed copies.
export function isIndexableOrigin(origin) {
  // The admin host is a subdomain of the canonical host, so it would otherwise
  // read as canonical here. It must never emit indexable HTML.
  if (isAdminHost(hostnameOf(origin))) return false;
  return isCanonicalOrigin(origin) || isLocalOrigin(origin);
}

/**
 * Whether this hostname is the dedicated editor origin.
 *
 * @param {string} hostname
 * @returns {boolean}
 */
export function isAdminHost(hostname) {
  return String(hostname || "").toLowerCase() === ADMIN_HOST;
}

/**
 * Whether this path belongs to the content editor: the editor shell, its static
 * assets, and its OAuth handshake.
 *
 * @param {string} pathname Already normalized (no trailing slash).
 * @returns {boolean}
 */
export function isAdminPath(pathname) {
  const path = String(pathname || "");
  return path === "/admin" || path.startsWith("/admin/") || path.startsWith("/api/admin/");
}

export function canonicalOrigin(origin) {
  if (isLocalOrigin(origin)) return origin;
  return CANONICAL_ORIGIN;
}

// Search-result display budgets. Google truncates a SERP title at roughly 60
// characters and a meta description at roughly 155-160, so every title below
// stays within TITLE_LENGTH_LIMIT and every description within
// META_DESCRIPTION_LENGTH_LIMIT.
// Generated metadata in functions/[[path]].js is fitted to the same budgets,
// and scripts/audit-internal-links.mjs --check fails the build on any route
// that exceeds them.
export const TITLE_LENGTH_LIMIT = 60;
export const META_DESCRIPTION_LENGTH_LIMIT = 160;

/**
 * Pick the first candidate title that fits the SERP budget.
 *
 * Generated city and artist-city titles interpolate place names and date
 * ranges from event data, so their length is not knowable in advance. The
 * internal-link audit fails the build on an over-budget title, which is the
 * right guard but has no way to shorten one: on 2026-07-30 three routes went
 * over at once (Philadelphia and Indianapolis at 61 chars once their year
 * label spanned two years, and "Casalecchio di Reno (Bologna)" at 69), which
 * failed `npm run test:mvp` inside tm-new-shows-pr.yml and discarded a PR
 * carrying ~183 newly discovered events. Because discovery re-runs nightly
 * against the same data, that deadlocks all event ingestion until a human
 * intervenes.
 *
 * Callers pass candidates from most to least complete. The first that fits
 * wins, so titles already within budget are returned byte-identical and no
 * existing page's title changes. The last candidate is hard-truncated as a
 * final guarantee, because no fallback list can anticipate every place name.
 *
 * @param {Array<string>} candidates  Most complete first.
 * @param {number} [limit]
 * @returns {string}
 */
export function fitTitleToBudget(candidates, limit = TITLE_LENGTH_LIMIT) {
  const options = (Array.isArray(candidates) ? candidates : [candidates])
    .map((value) => String(value ?? "").trim())
    .filter(Boolean);
  if (options.length === 0) return "";
  for (const option of options) {
    if (option.length <= limit) return option;
  }
  // Every candidate overflows: truncate the shortest on a word boundary where
  // one exists, so the result reads as a clipped phrase rather than a cut word.
  const shortest = options.reduce((a, b) => (b.length < a.length ? b : a));
  const clipped = shortest.slice(0, limit);
  const lastSpace = clipped.lastIndexOf(" ");
  return (lastSpace > limit * 0.6 ? clipped.slice(0, lastSpace) : clipped).trimEnd();
}

/**
 * Strip a trailing parenthetical qualifier from a place label
 * ("Casalecchio di Reno (Bologna)" → "Casalecchio di Reno"). Ticketmaster
 * supplies these province/metro hints inside the city name itself, so they are
 * the first thing to drop when a generated title overflows — the remaining
 * name is still the real city, never an invented one. Returns the input
 * unchanged when there is no parenthetical or nothing would be left.
 *
 * @param {string} label
 * @returns {string}
 */
export function withoutParentheticalQualifier(label) {
  const raw = String(label ?? "").trim();
  const stripped = raw.replace(/\s*\([^()]*\)\s*$/, "").trim();
  return stripped || raw;
}

// Trust and index routes.
//
// `lastmod` on these entries is NOT hand-maintained: scripts/sync-content-provenance.mjs
// fingerprints each route's rendered copy (its metadata here plus its render block in
// functions/[[path]].js) and advances the date only when that fingerprint changes. A
// reformat, a dependency bump, or the calendar moving will never touch it. The values
// were seeded from the frozen sitemap constant they replaced (2026-07-13), so no page's
// published date moved when the mechanism landed. Run `npm run content:provenance`
// after editing any copy below; `--check` runs in CI and fails a stale commit.
export const TRUST_ROUTES = {
  "/": {
    title: "Compare Concert Tickets & Tour Dates | TourTicketCompare",
    description:
      "Compare ticket prices for the show you want. Choose an artist and date, see current listed prices from ticket sites where available, then check the total.",
    indexable: true,
    lastmod: "2026-08-26"
  },
  "/compare-concert-ticket-prices": {
    title: "Compare Concert Ticket Prices by Site | TourTicketCompare",
    description:
      "Compare prices for the same checked concert across ticket sites where listed-price snapshots are eligible, then confirm fees and the total with the provider.",
    indexable: true,
    breadcrumb: [{ name: "Compare Concert Ticket Prices", path: "/compare-concert-ticket-prices" }],
    lastmod: "2026-08-21"
  },
  "/artists": {
    title: "Artists | TourTicketCompare",
    description:
      "Browse major artist pages with verified ticket links where available and practical buying guidance on what to check before checkout.",
    indexable: true,
    breadcrumb: [{ name: "Artists", path: "/artists" }],
    lastmod: "2026-08-09"
  },
  "/guides": {
    title: "Concert Ticket Buying Guides | TourTicketCompare",
    description:
      "Practical concert-ticket guides on matching listings, checking final totals, choosing primary or resale, timing a purchase, and confirming provider terms.",
    indexable: true,
    breadcrumb: [{ name: "Guides", path: "/guides" }],
    lastmod: "2026-08-21"
  },
  "/how-it-works": {
    title: "How TourTicketCompare Works",
    description:
      "How TourTicketCompare checks official sources, keeps ticket links specific, and gives you clear guidance on what to confirm before checkout.",
    indexable: true,
    faq: true,
    breadcrumb: [{ name: "How it works", path: "/how-it-works" }],
    lastmod: "2026-08-08"
  },
  "/currency-converter": {
    title: "Currency Converter for Concert Tickets | TourTicketCompare",
    description:
      "Convert a ticket budget between currencies using European Central Bank reference rates, then confirm the checkout currency and card fees with the provider.",
    indexable: true,
    breadcrumb: [{ name: "Currency converter", path: "/currency-converter" }],
    lastmod: "2026-07-13"
  },
  "/about": {
    title: "About TourTicketCompare",
    description:
      "TourTicketCompare is an independent, unofficial ticket research site for major live music tours and verified links where available.",
    indexable: true,
    breadcrumb: [{ name: "About", path: "/about" }],
    lastmod: "2026-07-13"
  },
  "/contact": {
    title: "Contact TourTicketCompare",
    description: "Contact TourTicketCompare about broken ticket links, incorrect event details, provider-link issues, or general site feedback.",
    indexable: true,
    breadcrumb: [{ name: "Contact", path: "/contact" }],
    lastmod: "2026-07-13"
  },
  "/editorial-policy": {
    title: "Editorial Policy | TourTicketCompare",
    description:
      "The editorial rules TourTicketCompare follows before publishing artist facts, tour pages, provider links, prices, or availability.",
    indexable: true,
    breadcrumb: [{ name: "Editorial policy", path: "/editorial-policy" }],
    lastmod: "2026-08-25"
  },
  "/affiliate-disclosure": {
    title: "Affiliate Disclosure | TourTicketCompare",
    description:
      "How TourTicketCompare uses affiliate links while staying independent, unofficial, and focused on checked ticket destinations.",
    indexable: true,
    breadcrumb: [{ name: "Affiliate disclosure", path: "/affiliate-disclosure" }],
    lastmod: "2026-07-13"
  },
  "/privacy": {
    title: "Privacy Policy | TourTicketCompare",
    description:
      "How TourTicketCompare handles analytics, watchlist signups, and information when you browse or follow a ticket link.",
    indexable: true,
    breadcrumb: [{ name: "Privacy policy", path: "/privacy" }],
    lastmod: "2026-08-27"
  },
  "/terms": {
    title: "Terms of Use | TourTicketCompare",
    description:
      "The ground rules for using TourTicketCompare's independent ticket-research pages and external provider links.",
    indexable: true,
    breadcrumb: [{ name: "Terms of use", path: "/terms" }],
    lastmod: "2026-08-27"
  }
};

// Guide route metadata is GENERATED from content/guides/*.md — see
// functions/_guide-routes.generated.js and scripts/build-guide-content.mjs.
// It is re-exported here so every existing consumer (the router, the sitemap,
// llms.txt, the audits) keeps importing it from the same place it always has.
//
// Only PUBLISHED guides appear in it, which is the whole draft gate: a guide
// with `status: draft` has no entry, so it has no route, no sitemap entry and
// no llms.txt line. `lastmod` there is maintained by
// scripts/sync-content-provenance.mjs in data/content-provenance.json, on the
// same fingerprint rule as the trust routes above, and `datePublished` is fixed
// at first publication and mechanically immutable afterwards.
//
// OLD_GUIDE_REDIRECTS below stays hand-authored on purpose: withdrawing or
// renaming a published guide is a redirect decision, and the guide build
// refuses to drop a previously published path that has no entry here.
export { GUIDE_ROUTES } from "./_guide-routes.generated.js";

export const OLD_GUIDE_REDIRECTS = {
  "/guides/compare-ticket-prices-safely": "/guides/how-to-compare-concert-ticket-prices",
  // Merged into the concert guide, which now carries the other-event checks too.
  // The two ranked for near-identical queries and split their own signal.
  "/guides/how-to-compare-event-ticket-prices": "/guides/how-to-compare-concert-ticket-prices",
  "/guides/why-ticket-prices-vary": "/guides/why-ticket-prices-change",
  "/guides/avoid-overpaying-concert-tickets": "/guides/how-to-avoid-overpaying-for-concert-tickets",
  "/guides/best-time-to-buy-concert-tickets": "/guides/when-is-the-best-time-to-buy-concert-tickets"
};
