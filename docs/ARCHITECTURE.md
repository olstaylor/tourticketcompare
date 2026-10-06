# TourTicketCompare architecture

TourTicketCompare is a static-first Cloudflare Pages application with Pages Functions for routing and APIs. This document describes durable repository contracts; current data counts belong in [PROJECT_STATUS.md](../PROJECT_STATUS.md), and workflow schedules, secrets, and known infrastructure incidents belong in [OPERATIONS.md](OPERATIONS.md).

## Runtime

| Layer | Responsibility |
|---|---|
| `public/` | Static HTML shell, client JavaScript, CSS, and public JSON data |
| `functions/` | Cloudflare Pages middleware, server-rendered route adaptation, APIs, redirects, and sitemap |
| Cloudflare Pages | Production hosting and Git-integrated deployment |
| Cloudflare D1 (`DEMAND_DB`) | Signups, analytics, rate caps, provider pricing cache, pricing history, and the never-pruned daily price rollup |

Cloudflare Pages + Pages Functions is the only production path. Vercel and the former standalone Worker are not deployment targets; do not reintroduce either without an explicit architecture decision.

## Repository map (key paths)

```text
public/
  index.html                 Shared HTML shell and generated inline data fallback
  app.js                     Progressive-enhancement client
  price-history.js           Price-history panels + price-drop interest form (any page with show cards)
  data/
    artists.json             Artist records and indexing state
    catalog.json             Provider metadata, artist links, and tours
    fallback-catalog.json    Client fallback if catalog loading fails
    provider-configs.json    Provider display/cache/safety configuration
    guides-content.json      Guide content keyed by route
    events.json              Reviewed event records
    events/                  Generated per-artist partitions
      _shards/               Generated contiguous slices of events.json (router reads these)
    events-index.json        Generated partition index
  og/                        Generated per-page Open Graph cards (1200x630 PNG)
  og-image.png               Shared Open Graph card, used where no per-page card exists

functions/
  _middleware.js             Entry point for requests
  [[path]].js                Active HTML router and server rendering
  _route-metadata.js         Route titles, descriptions, H1s, and guide registry
  _impact-marketplace-config.js  Shared marketplace provider configuration
  _cities.js                 City aggregation derived from events.json (shared with sitemap/llms.txt)
  _venues.js                 Venue aggregation derived from events.json (shared with sitemap)
  _artist-cities.js          Artist-city aggregation for /artists/<artist>/tickets/<city>
  _price-guides.js           Artist price-guide registry, derivation and launch detection (/artists/<artist>/ticket-prices)
  _event-price-moves.js      Latest recorded per-date, per-provider price move; 7-day change for dates ≤ 14 days out
  _price-outliers.js         Isolated-spike rule shared by every recorded-price claim
  _route-indexability.js     Shared route-usefulness thresholds, publishability test, reasons
  _event-local-date.js       Strict venue-local date/instant resolver (runtime + provider matchers)
  _event-pages.js            Event identity, stable keys, /events/* routing and event-page schema decision
  _event-indexability.js     Event-page indexability policy and the frozen 30-key indexing pilot
  _artist-indexability.js    Artist-page index/noindex gate (≥1 upcoming show)
  _artist-content.js         Data-derived editorial content model for artist pages
  _blog.js                   Blog derivation and indexability gates (posts, tags, related)
  _funnel.js                 Pure funnel classifiers shared by analytics and /api/out
  _analytics-write.js        Schema-tolerant analytics_events writer
  _bot-detection.js          Shared self-identifying-crawler classifier
  admin.js                   Content-editor shell, ADMIN_HOST origin only
  sitemap.xml.js / llms.txt.js  Generated discovery endpoints
  sitemap-index.xml.js, sitemaps/  Per-type sitemaps behind a sitemap index (robots.txt)
  blog/rss.xml.js            Blog RSS feed, gated like the sitemap
  [named route shims]        Fallback re-exports from [[path]].js
  api/
    out.js                   Fail-closed outbound redirect and provider policy
    shows.js                 Event API and cache-only price responses
    health.js                Runtime/config presence without secret values
    analytics.js             First-party write-only analytics beacon
    signup.js                Email/interest capture; artist date-alert signups are emailed
                             once by scripts/send-date-alerts.mjs, price interest never
    unsubscribe.js           Opt-out from the link in a date-alert email (GET confirms, POST records)
    price-history.js         Read-only snapshot history behind the badge display gate
    rates.js                 Cache-backed ECB reference rates for /currency-converter
    admin/                   GitHub OAuth handshake for the editor (ADMIN_HOST only)
    impact/                  Server-side Impact helpers and diagnostics — every route is
                             DEBUG_API_TOKEN-gated and 404s without it

content/
  blog/                      Markdown + front matter; source of truth for the blog

data/
  provider-identities.json   Human-verified provider identity registry
  event-indexing-pilot.json  Frozen record of the event-page indexing pilot cohort (experiment metadata)

scripts/                     Validation, sync, reporting, and automation tools
  lib/event-local-date.mjs   Re-export of functions/_event-local-date.js (all provider matchers)
  lib/event-link-coverage.mjs  Offline mirror of the runtime event-CTA publishability gate
  lib/artist-filter.mjs      Shared exact `--artist` filter semantics
.github/workflows/           Scheduled and manual automation
reports/provider-sync/       Latest generated provider-sync audit output
docs/                        Stable policies and runbooks
migrations/                  Ordered D1 migrations and applied-state ledger
```

## Request routing

```text
request
  → public/_routes.json
      └─ excluded (/_assets/*, /og/*, /favicon.ico) → static asset, no Function
  → functions/_middleware.js
      ├─ /api/* and known assets → context.next()
      ├─ /admin                  → context.next() → functions/admin.js
      ├─ file-extension paths    → static asset handling
      └─ HTML routes            → functions/[[path]].js
```

The `_routes.json` exclude list is pinned by `scripts/smoke-prelaunch.mjs` and
stays minimal: an excluded path bypasses Functions entirely, losing routing and
metadata injection. The generated OG cards are excluded because they are inert
images needing neither, and the `/*` rules in `public/_headers` are applied by
Pages rather than the middleware — so they keep every security header while
costing no Function invocation.

`functions/[[path]].js` handles the home page, the `/compare-concert-ticket-prices` comparison hub, trust pages, guide routes, blog routes, artist routes, city routes, venue routes, redirects, schemas, and 404s. `functions/_route-metadata.js` is the single metadata registry for fixed and guide routes; data-derived city and venue metadata is composed in the router from the shared aggregation records.

The named route shims (`functions/artists.js`, `guides.js`, and peers) only re-export `onRequest` from `[[path]].js`. While middleware is active, editing a shim does not change live routing.

Unknown non-file routes return a real noindex 404. Known city and venue aggregations may render below their indexing threshold with `noindex`; the site must not generate pages for unknown artists, tours, cities, or venues.

### Homepage proposition parity

The homepage's complete visual DOM is rendered by `functions/[[path]].js`; crawlers, no-JS visitors, and interactive visitors all receive the same hero and section structure. `public/ttc-home.js` is a small route module that enhances the existing search form from links already present in the HTML. It makes no catalogue request and never clears or replaces `#ttc-main`, so it cannot introduce a late LCP candidate. Server-authoritative routes load the small shared `public/shell.js`, while artist boards and the currency converter add only their route-specific modules. `public/app.js` remains an emergency fallback asset but is not part of routed HTML. The three files cannot share a module, so the headline, supporting copy, primary action (`Find a show`), and the three how-it-works steps live in one marked `homepage-proposition` block copied verbatim into each file. A second `site-proposition` block does the same for the `/artists` and `/how-it-works` leads, which `[[path]].js` owns and `app.js` re-renders. `npm run test:homepage-proposition` (in `test:mvp`) fails the build when a copy drifts, when a renderer stops reading the block, when the homepage meta description stops matching the page, or when the copy starts claiming unsupported coverage, fee-inclusive prices, or a universal price ranking.

## City aggregation layer

City landing pages (`/cities` index + `/cities/<city-country>`) are a server-rendered aggregation derived purely from reviewed upcoming `events.json` records (`functions/_cities.js`, shared with the sitemap, `llms.txt`, and internal-link audit). Country aliases such as `United States Of America` normalize before grouping so one city does not split into duplicate canonical pages; known city spellings do the same (`CITY_ALIASES` in `functions/_venues.js`: Ticketmaster sends Jannus Live's city as both "St Petersburg" and "Saint Petersburg", and the nightly sync restores its spelling on each record, so the merge happens at derivation, not in the data). A city, venue or artist-city URL written with an aliased spelling 301s to the canonical slug. A city is indexable only with at least four upcoming tracked shows across at least two artists **and at least one upcoming show carrying a publishable ticket destination** — a page that can list dates but lead nowhere does not serve the purpose its title promises. Thinner known cities render `noindex,follow` and stay linked; a city tracked before but with nothing upcoming 301s to `/cities`; unknown slugs 404. The thresholds and the shared publishability test live in `functions/_route-indexability.js` (policy: [ROUTE_INDEXABILITY_POLICY.md](ROUTE_INDEXABILITY_POLICY.md)). City pages go from the title straight to the schedule, grouped by venue with each card headed by its artist; the data-derived summary sentence and the selective-coverage note sit directly under the schedule, followed by editorial provenance and collapsed buying guidance. Venue pages follow the same order, grouped by artist. They carry no FAQ and emit no `FAQPage`: the old templated questions only restated the lead and schedule, so they were removed (see [ROUTE_INDEXABILITY_POLICY.md](ROUTE_INDEXABILITY_POLICY.md) → Shared content rules for location pages). They deep-link to the matching artist show card and indexable venue pages, and emit `Place`, `CollectionPage`, `ItemList`, breadcrumb, and (on indexable pages) publishable-gated `MusicEvent` structured data that mirrors visible content without duplicating event offers or inventing location facts. Current city counts live in `PROJECT_STATUS.md` and change with `events.json` and the calendar.

## Venue aggregation layer

Venue landing pages (`/venues` index + `/venues/<slug>`) are a server-rendered aggregation derived purely from reviewed `events.json` records (`functions/_venues.js`, shared with the sitemap, `llms.txt`, and internal-link audit). Each qualifying page provides a direct answer, artist/date coverage, editorial provenance, event cards grouped by artist, and buying guidance grounded in the same records. Like city pages, venue pages carry no FAQ and emit no `FAQPage`. The artist pages remain the source of verified provider CTAs and price snapshots — the venue aggregation invents no data or provider state. The slug is `slugify("<venue> <city>")` so inconsistent country labels for one physical venue merge. Venues with ≥3 upcoming shows across ≥2 artists **and ≥1 upcoming show with a publishable ticket destination** are indexable and in the sitemap; thinner known venues render `noindex,follow` and stay linked; a venue tracked before but with nothing upcoming 301s to its city page (or `/venues`); unknown slugs 404. Same shared module and policy as cities. Current venue counts live in `PROJECT_STATUS.md` and move with `events.json` and the calendar.

## Artist-city aggregation layer

The on-sale calendar (`/on-sale`) is a server-rendered list of Ticketmaster public on-sale times (`public_onsale_at`) already carried on reviewed `events.json` records, grouped by the venue's local day and then by artist (`functions/_onsale-calendar.js`, shared with the sitemap and `llms.txt`). It lists shows still ahead whose on-sale falls in the next 60 days or opened in the last 7, recomputed per request so dates move between the two sections with the clock. It links only to artist pages, never to a ticket site, and emits `CollectionPage` + `ItemList` of those artist pages and no `MusicEvent`. Its indexability gate is in `functions/_route-indexability.js` (policy: [ROUTE_INDEXABILITY_POLICY.md](ROUTE_INDEXABILITY_POLICY.md)). Since 2026-10-05 it also lists named presale windows open now or opening in the next 60 days, by artist.

Presale windows (`functions/_presales.js`) are Ticketmaster's named presales for an exact event (`presales: [{ name, start, end }]`), carried by the nightly field-sync (`scripts/apply-tm-updates.mjs`) from the same Discovery responses it already reads. They render on `/artists/<artist>/presale` (one durable URL per artist, indexable only while a window is open or opens within 30 days), in the `/on-sale` presale section and as one line on the artist page. No code, description or link is ever stored.

Artist-city landing pages (`/artists/<artist>/tickets/<city>`) target local intent (`[Artist] tickets [City]`) and are a server-rendered aggregation derived purely from one artist's reviewed upcoming `events.json` records (`functions/_artist-cities.js`, shared with the sitemap, `llms.txt`, and internal-link audit). The four-segment path never collides with the two-segment tour route or the `/artists/<artist>/tickets` redirect. The city slug is the same `slugify("<city> <normalized-country>")` as `/cities/<slug>`, so country aliases merge and a same-named city in two countries stays two distinct pages (the visible label carries the country to keep titles/descriptions unique). The page reuses the artist show board — so CTAs, gated price snapshots, `/api/out` tracking, and analytics are identical to the main artist page — plus a data-derived at-a-glance summary rendered below the dates (the only place the page states its count, venue and date range), a local buying guide, the pricing explanation, artist-city FAQs, and internal links back to the artist hub, the shared `/cities` and `/venues` pages where those qualify, and the artist's other active cities. It emits `Place`, `CollectionPage`, `ItemList`, breadcrumb, an inline performer, and publishable-gated `MusicEvent` structured data mirroring visible content, and never invents local facts, prices, or availability.

**Indexing lifecycle.** A combination *renders* when the artist is `indexable_with_substantial_content` and the city has at least one upcoming publishable show; it is *indexable* (in the sitemap, `index,follow`) only with **at least two**. With a single date the page is the artist page filtered to one show card, so it renders 200 with a self-referencing canonical, keeps its inbound artist-page link, and is `noindex,follow`. A genuinely inactive combination — a city the artist has an event footprint in, but with no qualifying upcoming show now, or an under-review artist — selectively **301s to the artist hub** rather than leaving a misleading empty page. Any other slug (unknown artist, or a city the artist has never played) returns a real **404**, never a soft 404. Expired combinations therefore leave the index automatically as their dates pass. The router, sitemap, and internal-link audit all consume the one `functions/_artist-cities.js` derivation, so the indexable URL set cannot drift between them. Current counts live in `PROJECT_STATUS.md` and move with `events.json` and the calendar.

## Event identity and event pages

Individual event pages (`/events/<slug>-<key>`) are a **noindex leaf**: every one is `noindex,follow` with a self-referencing canonical, and none is in a sitemap or `llms.txt`. Each carries one `MusicEvent` for the performance it shows (see **Event-page structured data** below). `npm run test:event-pages` asserts all of that; `npm run test:event-page` covers the page itself and the parent links. The router serves them from `resolveEventRoute` in `functions/_event-pages.js`:

| Request | Response |
|---|---|
| Unresolvable (malformed, unknown key, key collision, readable part naming another artist, no venue-local date) | 404 |
| Not addressable: a non-performance listing, an artist that is not editorially indexable, no venue or city | 404 |
| Past event, by any slug | 301 to its artist-city page while that page renders, else the artist page |
| Upcoming event, out-of-date readable slug | 301 to the current canonical path |
| Upcoming, not held, not publishable, not waiting for its public on-sale | 301 to its artist-city page while that page renders, else the artist page |
| Otherwise | 200 — commercially live, lifecycle-held, or pre-on-sale |

Four states, never conflated: *addressable* (a real performance TTC can describe; the router serves it), *commercially live* (upcoming, not held, `eventPublishable`: ticket links may show) — both fields on `eventRouteState` — *eligible for indexing* (`eventIndexabilityDecision` in `functions/_event-indexability.js`, see below) and *actually indexable* (renders `index,follow` and is in a sitemap: eligible **and** an active member of the frozen 30-key indexing pilot, see below). A cancelled or postponed future date is addressable and not commercially live: it keeps its page, stating the status, with no button or price. The page renders the one show card every board renders (`renderShowCardServerHtml`, same CTA gates, `/api/out` links and price snapshots), the same per-date row the artist-city price answer builds (`deriveCityDatePrices`) with its 30-day recorded low and latest recorded move, the event facts, and links back to the artist, artist-city, venue and city pages that render or are indexable. `onRequest` prices exactly this one event. Analytics records the page type `event`; buttons keep `ctaLocation=event_card`.

**Parent links.** The artist, artist-city, city and venue boards link each card to its event page with a small "Show details" text link after the ticket buttons and price notes (`presentation.eventPagePath` on `renderShowCardServerHtml`). The path comes from `eventPageLinker` / `eventPageLinkPath` in `functions/_event-pages.js`, which asks `resolveEventRoute` about the event's own canonical path and links only a 200: never a non-performance listing, a past or destination-less date (301), an out-of-date slug, or a shell artist's date (404). A cancelled or postponed future date links to the page stating its status. The event page is optional: every date's buttons and prices stay on the board, and the `#show-<id>` anchors and "Copy link to this date" are unchanged. The homepage, indexes, comparison hub and guides do not link event pages. `scripts/audit-internal-links.mjs` crawls every served event page and fails on a card whose link differs from the router's answer, an event link from any other surface, a served page no board links, or an event page linking a parent that does not render.

- **Identity is the `events.json` `id`.** The D1 price cache, price history and price checks, `/api/out?showId=`, and the `#show-<id>` card anchors already key on it, and the nightly Ticketmaster field-sync rewrites date, venue and city in place without changing it. Provider ids and readable slugs are not identities.
- **The stable key** is the id's 64-bit FNV-1a hash as 16 hex digits: synchronous, dependency-free and identical in Node and Workers. Published FNV vectors and real ids are pinned in the test, so changing the function fails the build. Two records sharing an id, or two ids sharing a key, resolve to nothing, and `assertUniqueEventKeys` fails the test.
- **The future path** is `/events/{artist}-{venue}-{city}-{venue-local date}-{key}`. Only the key identifies the event. The readable part is recomputed from the current record, so a venue rename, a city correction or a moved date changes the path but not the event it resolves to (`resolveEventPath` reports `isCanonical: false` with the current path). A path whose readable part does not start with the resolved event's own artist slug does not resolve.
- **The date is the venue-local date** from the strict resolver in `functions/_event-local-date.js`. Slicing `datetime_iso` prints the UTC date, which is a day late for most evening shows in the Americas. An event whose local date cannot be resolved gets no path.
- **Event-page structured data.** Each served page's graph is the site's Organization and WebSite, the `BreadcrumbList` of its visible trail (Home → Artists → artist → the artist-city page only where that page renders → the event), a reference node for the artist, and one `MusicEvent` (`eventPageSchema` in `functions/[[path]].js`): `@id` `<canonical event URL>#event`, `url` the canonical event URL, `name` "<artist> at <venue>" (the H1, never the provider listing title), `startDate` from the parent nodes' `venueLocalIso` — the venue-local time with its offset, or the venue-local date alone where the page prints no start time — `eventStatus`, `eventAttendanceMode`, `location` (venue, city, country only), `performer` a reference to the artist page's own `/artists/<slug>#artist` entity, and `image` the page's `og:image` (the shared brand card; event pages have no per-page card). `eventPageSchemaDecision` in `functions/_event-pages.js` decides whether there is a node: a scheduled or rescheduled date follows the parent boards' own gate (`eventStatusPublishable`, so a pre-on-sale date or a resale-only record has none); a cancelled or postponed date is described as `EventCancelled`/`EventPostponed` from its Ticketmaster record; any other stored status has none. The renderer also withholds it when the stored offset and zone disagree on the visible date. The node never carries `offers`, price or availability under any flag (the schema-offers exception covers the parent boards only), nor `previousStartDate`, `description`, `organizer` or `endDate`. Parent boards' `MusicEvent` nodes keep their `#show-<id>` urls, except for an active indexing-pilot event: its parent nodes (and `ListItem`s) carry the event page's own `url` and `@id` (`showSchemaIdentity`), with every other field unchanged. `scripts/validate-route-schema.mjs` checks every served page's node against its rendered facts, and lifecycle, timing and commercial-safety fixtures.
- `eventRouteState` separates "the event exists" from "it could structurally carry a route" (editorially indexable artist, upcoming, local date resolved, venue and city present, `eventPublishable`). The non-performance listing classifier mirrors the new-show recogniser's markers.

**Event-page indexability and the indexing pilot.** `functions/_event-indexability.js` is the one policy for which event pages are strong and safe enough to index; the rule and its reasons are in `docs/ROUTE_INDEXABILITY_POLICY.md` → Event. `eventIndexabilityDecision(events, artists, event, { publishableLanes, now })` returns `{ eligible, reasons, id, key, path, inputs }`, where `reasons` are stable codes (`EVENT_INDEXABILITY_REASONS`). It reads only canonical data: the route decision, `eventRouteState`, `artistPageIndexable`, `eventPageSchemaDecision`, the caller's publishable lanes (from the CTA gate — offline, `publishableLaneSlugs` in `scripts/lib/event-link-coverage.mjs`) and the stored provider provenance. It never reads D1, a cached price or a live API, so cache freshness and provider outages cannot flip it. Duplicate ambiguity (`deriveEventDuplicateGroups`, memoised per events array by `eventDuplicateIndex`) groups rows by artist, city and venue-local date, and rows claiming one provider listing; it classifies each group and excludes only the rows TTC cannot tell apart — it never merges or deletes a row. The rollout gate `eventPageIndexingDecision(decision, env)` is eligible **and** `EVENT_PAGES_INDEXING="pilot"` **and** the event's stable key in `EVENT_INDEXING_PILOT_KEYS` (30 keys frozen on 2026-09-27, recorded in `data/event-indexing-pilot.json`). `deriveEventIndexingPilot(events, artists, env, { hostIndexable, lanesFor })` applies it to the pilot keys only, adding the host rule (the canonical host only — never a `*.pages.dev` preview), and is the one runtime answer: the router calls it as `eventIndexingPilotFor(env, origin, candidates)` (full `events.json`, `lanesFor` = `eventPublishableLaneSlugs`, the CTA gate the page renders; a route holding no pilot key, the flag off or a preview host skips it without loading anything) for the event page's robots and the parent boards' `MusicEvent`/`ListItem` identity, and `/sitemaps/events.xml` and `llms.txt` call the same export. Policy and pilot: `docs/ROUTE_INDEXABILITY_POLICY.md` → Event. `npm run report:event-routes` (`--json`) is the factual source for choosing pilot events: routing, schema, eligibility, every exclusion reason, destination and snapshot distributions, classified duplicate groups, the artist-city relationship, expiry horizons and a candidate shortlist. `npm run audit:indexable-surface:check` renders every served event page and the active pilot's parent boards and fails if robots or a sitemap/`llms.txt` disagree with the active pilot, if an indexed page is not a pilot key or not eligible, if an eligible page is malformed (not 200, not self-canonical, not exactly one `MusicEvent` identified as the page + `#event`), if its rendered buttons differ from the lanes the policy counted, or if a parent describes a pilot performance under any other identity — tracked as an exact set, outside the route-type baseline. `npm run test:event-indexability` covers the policy. `npm run report:event-indexing-pilot` is the read-only measurement report on the frozen cohort (launched 2026-09-27): it reads the cohort from the record only, evaluates exactly those keys through `deriveEventIndexingPilot`, and optionally joins Search Console and route-traffic exports by canonical URL (`docs/ROUTE_INDEXABILITY_POLICY.md` → Event → Measuring the pilot).

## Artist price-guide layer

An artist price guide (`/artists/<artist>/ticket-prices`) is one informational page per artist answering "how much are <artist> tickets": where face value is sold (none is printed — there is no approved source), each upcoming date's own lowest listed-price snapshot grouped by city, the latest recorded price move per date, which ticket sites are linked for how many dates, and links to the artist page, the artist's indexable artist-city pages, related blog posts and the pricing guides. The artist page stays the transactional destination; each links the other near the top. `functions/_price-guides.js` is the one derivation shared by the router, sitemap (artists segment), `llms.txt`, the route crawl, the OG card build and `scripts/propose-price-guides.mjs`.

Guides are **owner-approved, machine-proposed**. A guide exists only for a slug in `PRICE_GUIDE_ARTISTS`; any other artist's path 404s. `price-guide-candidates.yml` runs `scripts/propose-price-guides.mjs` daily and rewrites the rolling `automation:price-guide-candidates` issue with indexable artists that have no guide and whose Ticketmaster public on-sales opened in the last 30 days or open in the next 60 for at least 6 dates — the tour-launch signal — each with the gate verdict it would get today. Approving one is a PR adding its slug. Lifecycle and gate: `docs/ROUTE_INDEXABILITY_POLICY.md` → Artist price guide.

Prices follow the artist-city answer table's rules exactly: every figure comes from `deriveCityDatePrices` over `serverShowCtaSpecs` (no second gate), rows are dates in calendar order and never ranked, and no cross-date minimum, range or lowest-date claim is composed. The 30-day recorded low reuses `functions/_event-price-low.js`. The price move (`functions/_event-price-moves.js`) compares one provider's snapshots for one date in one currency — the newest recorded figure that differs from the button's — read with one `ROW_NUMBER()` statement per 50 dates from `provider_pricing_history`, and computed only for a lane passing the live display gate. A failed read degrades to no moves. CTAs carry `ctaLocation=price_guide`; analytics records the page type `artist_price_guide`.

## Blog and content authoring layer

Blog posts are authored as Markdown with YAML front matter in `content/blog/`, which is the source of truth. `scripts/build-blog-content.mjs` compiles them into the single generated asset `public/data/blog-content.json`; the runtime reads only that file. The compile step exists because Cloudflare Pages serves `public/` with no build and Pages Functions cannot list a directory, so the runtime has no way to discover Markdown files. `.github/workflows/content-build.yml` runs the compile on pushes touching `content/blog/`, gates it behind the full validation suite, and commits the result — that commit is what deploys a post. `npm run blog:check` fails CI when the generated file drifts from its source, mirroring the partition-validation contract for event data.

`functions/_blog.js` is the single derivation shared by the router, sitemap, `llms.txt`, the RSS feed at `/blog/rss.xml`, and both site audits, so the blog's indexable URL set cannot drift between them. A `draft` post has no route at all (404). A published post renders at `/blog/<slug>` and is indexable at 300+ body words; a tag page renders at `/blog/tags/<tag>` and is indexable once two or more indexable posts share the tag. Below either threshold the page still returns 200 with a self-referencing canonical and stays internally linked, `noindex,follow` — the same treatment single-date artist-city pages receive (`docs/ROUTE_INDEXABILITY_POLICY.md`). Post pages emit `BlogPosting`; index and tag pages emit `Blog`/`CollectionPage` with a nested `ItemList`. The blog carries no provider, CTA, price, or event logic of its own.

### Derived cross-links

Three link blocks are derived from data at render time, so they need no upkeep as content is added. Each leaves out any target the page body already links:

- **Artist → posts.** An artist page lists up to three published posts that name the artist in `related_artists`, newest first (`postsForArtist` in `functions/_blog.js`).
- **Guide → posts.** A guide page lists, under "From the blog", up to three published posts that name the guide in `related_guides` (`postsForGuide`).
- **Guide → guides about the same ticket site.** A guide whose slug names a ticket site (`ticketmaster`, `seatgeek`, `vivid-seats`, `stubhub`, `ticketnetwork`, `stubhub-international`) renders "More on <site>" with up to six other published guides sharing a site, most shared first, then in `data/guide-order.json` order (`renderGuideProviderLinks` in `functions/[[path]].js`). `stubhub-international` is matched before `stubhub`, so StubHub International is never grouped with StubHub North America.

`onRequest` attaches the post lists only for artist and guide routes. `scripts/smoke-prelaunch.mjs` asserts every published post's artist and guide back-links, and the footer's `/on-sale` link.

### Content pipeline

Two collections share one shape: a Markdown file with YAML front matter, compiled into generated artefacts the runtime reads, because Pages serves `public/` with no build step and a Function cannot list a directory.

| | Blog | Guides |
|---|---|---|
| Source | `content/blog/*.md` | `content/guides/*.md` |
| Build | `npm run blog:build` | `npm run guides:build` |
| Generated | `public/data/blog-content.json` | `public/data/guides-content.json` and `functions/_guide-routes.generated.js` |
| Draft gate | absent from the compiled post list | absent from `GUIDE_ROUTES`, so no route, sitemap entry or `llms.txt` line |
| Staleness guard | `npm run blog:check` | `npm run guides:check` |

### Per-page Open Graph cards

Every indexable URL used to share one social card, so an artist page, a city page
and a guide all previewed identically. `scripts/build-og-cards.mjs` renders one
1200x630 PNG per page from the same brand template as `public/og-image.png` and
writes `functions/_og-cards.generated.js`, which the router consults in
`injectRoute`. A route with no manifest entry falls back to the shared card.
The router's `ogCardUrl` is the single resolver: the `og:image`/`twitter:image`
meta and every `MusicEvent.image` on artist, city, venue, artist-city and event
pages read it, so structured data always names the same card the page previews with.

A card carries only what is stable for the life of the URL — a name, a place, a
title. Show counts, dates and verification stamps are deliberately excluded: they
move whenever the calendar does, and a card carrying them would rewrite hundreds
of binary files on every data sync. This is also why `npm run og:check` verifies
that referenced cards exist rather than that the manifest matches the current
indexable surface — city, venue and artist-city routes appear and disappear on
their own, and an exact-match check would fail on any day the calendar moved.
Cards are built at the source: every lane that writes event or artist data
(auto-promote, Ticketmaster new shows, TM data refresh, nightly sync, the
SeatGeek, Vivid Seats and Impact CTA syncs) runs `npm run og:build` before
`test:mvp` and commits `public/og/` and the manifest with its data, so a page
never ships on the shared card. Coverage is the backstop:
`npm run og:coverage:check` fails when a current indexable route has no card,
and it is the check the generated-freshness sensor runs for the `og-cards`
artefact, so anything a lane misses gets a rebuild PR from the work-queue repair
worker.

Cards are rasterised with `sharp` (a devDependency) against the DejaVu faces the
brand template names first. Generate on Linux so committed cards match CI.

`functions/_route-metadata.js` re-exports the generated `GUIDE_ROUTES` and keeps owning `TRUST_ROUTES` and `OLD_GUIDE_REDIRECTS`. Withdrawal is deliberately outside the CMS: the guide build refuses to drop a previously published path unless `OLD_GUIDE_REDIRECTS` carries an entry for it.

Three machine-owned files sit beside the sources and are never hand-edited:

- `data/content-provenance.json` — each page's copy fingerprint, the `lastmod` derived from it, and `guide_publication`, the append-only record of when each guide first went live. A guide's `date_published` is checked against that ledger on every build, so it cannot move once set, and the entry survives the guide being drafted or deleted.
- `data/guide-source-link-checks.json` — when each cited source URL last resolved, written only by the nightly link check. The editorial claim that a human re-read a source is `last_checked` in the Markdown, which automation never touches.
- `data/guide-order.json` — hand-authored display order for published guides, read by the sitemap, `llms.txt`, `/guides` and the homepage cards. Kept out of the CMS so saving a guide cannot reorder the homepage.

The browser editor is served from a **separate origin**, `admin.tourticketcompare.com` (`ADMIN_HOST` in `functions/_route-metadata.js`), because the CMS keeps the signed-in user's GitHub token in `localStorage` and `localStorage` is shared across an origin — the apex runs GTM and GA, so an editor there would expose a repository-write credential to any third-party tag or XSS. `functions/_middleware.js` enforces the boundary both ways: the admin host serves only `/admin`, `/admin/*` and `/api/admin/*` (everything else 301s to the apex, and it serves its own `Disallow: /` robots), and every other host 404s those paths. `functions/admin.js` restates the host check at the handler. The OAuth handshake in `functions/api/admin/` exchanges a code for a `public_repo`-scoped user token server-side and fails closed with setup instructions when unconfigured; the editor holds no site credential. It edits two collections, blog posts and buying guides, both of which compile through `content-build.yml`. Authoring reference and one-time setup: `docs/BLOG.md`.

## Data and rendering flow

1. Source records live in `public/data/artists.json`, `catalog.json`, and `events.json` (hand-reviewed, or machine-matched by the gated Ticketmaster lane).
2. `npm run events:partition` creates per-artist event files, `events-index.json` and the `events/_shards/` slices.
3. Server rendering and `/api/shows` read the reviewed data and apply the same provider publishability rules.
4. `public/app.js` progressively enhances the server-rendered page; it must not loosen server-side URL, provenance, or price gates.

`npm run events:validate:partitions` prevents the per-artist partitions and `events.json` from drifting, and since 2026-09-14 also holds `public/data/events-index.json` — the flat search index — to the same source, by ID multiset and by indexed field value. It runs in `test:mvp`. It also checks `public/data/events/_shards/`: 200-record slices of `events.json` plus a manifest, which must concatenate back to it exactly. Routes that need every event (`/on-sale`, `/artists`, city, venue and event pages) read the shards through `loadEvents` in `functions/[[path]].js` instead of the 6.6MB file, because one large `env.ASSETS.fetch` intermittently stalled for exactly 10s on live isolates (2026-10-02). A missing, failed or disagreeing shard falls back to `events.json`. Writers that patch partitions in place (`verify-seatgeek-events.mjs`, `enrich-seatgeek-events.mjs`, `sync-vividseats-events.mjs`, `backfill-event-timezones.mjs`) rewrite the shards with `scripts/lib/event-shards.mjs`.

## Provider and redirect contract

All public ticket clicks route through `/api/out`.

- Ticketmaster destinations are verified plain redirects with no affiliate wrapping.
- Affiliate providers require a provider-specific allowlisted URL, publishable provenance, runtime public configuration, and successful server-side tracking generation.
- Artist-level destinations come from protected constants and verified identity records.
- Event-level destinations come from reviewed event data and provider-specific provenance.
- Any missing or invalid condition suppresses the CTA or returns diagnostic JSON. There is no untracked affiliate fallback.

Event CTAs publish independently per provider: Ticketmaster uses its stored destination plus the strict redirect checks; SeatGeek and Vivid retain their event-link fallback; and the Impact marketplace lanes require their own verified provenance. The shared rule is `providerEventPublishable`, implemented in parallel in `functions/api/out.js`, `functions/[[path]].js`, `public/app.js`, and `functions/api/shows.js`; the smoke suite guards SSR/API parity. `scripts/lib/event-link-coverage.mjs` is the offline mirror of that gate — read by the link-coverage report and the SeatGeek enrichment prioritiser so tooling counts exactly the buttons the site renders. It is a mirror, not a source: change it in the same commit as the runtime gate.

**Event lifecycle.** `ticketmaster_status_code` is the verbatim Ticketmaster Discovery status for an event whose status is not a normal sale state, written and cleared by the nightly field-sync (`docs/PROVIDER_SYNC.md`). `eventLifecycleHeld` in `functions/_route-indexability.js` is the one rule: `cancelled`/`canceled`, `postponed`, or any stored value it does not recognise holds the event; `rescheduled` and an absent field do not. Every CTA gate checks it first — `providerEventPublishable`/`eventLinkPublishable` in `[[path]].js`, `api/shows.js`, `api/out.js` and `public/app.js`, and the offline mirror in `scripts/lib/event-link-coverage.mjs` — as do `eventPublishable`/`eventStatusPublishable`, so a held date has no button, no price (the `/api/shows` price gate and the price answer skip it), no `MusicEvent` node, no on-sale calendar entry, and no `/api/out` redirect, and it stops counting towards any route's thresholds — a city's or venue's show and artist counts, a price guide (which leaves it out entirely), and an auto-promoted artist's upcoming-date count. It is still listed on its boards (the `public/app.js` fallback board included), with a line stating the Ticketmaster status in place of its buttons, but a city's or venue's lead sentence takes its date span from the non-held dates only. Live Discovery (`/api/shows` with `TICKETMASTER_LIVE_ARTIST_DISCOVERY_ENABLED`) only ever adds a cancelled or postponed hold and never lifts a stored one; `rescheduled` is recorded only by the validated nightly field-sync. A rescheduled date keeps its buttons, is labelled rescheduled, and its `MusicEvent` says `EventRescheduled` with no `previousStartDate`, because the old date is not kept. The field is separate from `status`, which stays TTC's own sale state.

A show card carries one compact line above its buttons (`ctaCountLabel` in `functions/[[path]].js`, `showCtaCountLabel` in `public/app.js`) only when at least one button shows a price: "Lowest listed price" on a one-button card, else "Lowest listed price on each" if every button is priced, or "Lowest listed price where shown" — SeatGeek and Ticketmaster never carry a price, so "on each" is rare. It states no site count (the buttons are the count) and never uses comparison wording. Under a priced card, the note gives each price's relative age ("Checked 5 hours ago (Vivid Seats)"), with the absolute capture time in the `<time>` element's `datetime` and `title`. The unpriced Ticketmaster button reads "See tickets"; other unpriced buttons read "Check prices". The smoke suite asserts both renderers produce the same wording from the same inputs.

Every page with ticket buttons (artist, artist-city, city, venue, comparison hub) carries one "How we make money" statement (`renderMoneyDisclosureHtml` / `renderMoneyDisclosure`): a single line in the date board's header, directly above the first date and beside the buttons it describes. It states the button order `serverShowCtaSpecs` produces — affiliate lanes first, the unpaid Ticketmaster link last — so the order is disclosed, not presented as a ranking. Change the statement if the order changes.

Client and server CTA builders (`artistProviderHref`/`eventTicketHref` in `public/app.js` and `functions/[[path]].js`) emit `/api/out?...&provider=<slug>`, which `out.js` resolves and Impact-wraps server-side. The account Impact Publisher Tag (`public/impact-publisher-tag.js`, UTT `P-A3977745`) is for **impression** tracking only (`impactStat("trackImpression")`) and, like Google Tag Manager, is loaded by `public/consent.js` only after the visitor accepts cookies (see "Cookie consent" below); it does not transform links, so click attribution never depends on client-side rewriting or Impact dashboard auto-link configuration. Do not switch monetized CTAs to raw/direct destinations.

### Cookie consent

`public/consent.js` (loaded on every page by the `public/index.html` shell, before the app bundle) is the only loader for the two third-party tags that set cookies: Google Tag Manager (`GTM-MZ42TPMM`, which runs GA4) and the Impact Publisher Tag. Neither is in the served HTML, and there is no no-JavaScript GTM frame. The inline Google tag bootstrap sets Consent Mode defaults to `denied` before anything is queued. The visitor's choice is stored in `localStorage` (`ttcCookieConsent`); with no choice the banner shows, Reject and Accept share one button style, and the footer's "Cookie settings" button reopens it. Withdrawing consent clears `_ga*`/`_gid`/`_gat`/`IR_*` cookies on the site's domain and reloads. First-party measurement (`/api/analytics` beacons, the same-tab `sessionStorage` attribution) sets no cookie and is not gated. Click attribution is unaffected either way: affiliate credit comes from the server-side `/api/out` redirect, not from a client tag.

`functions/api/out.js`, the provider identity registry, server rendering, `/api/shows`, and `public/app.js` must preserve equivalent provider eligibility semantics. Validators and smoke tests guard this parity.

Provider-specific rights, sources, URL shapes, and current lanes are documented in [PROVIDER_DATA_POLICY.md](PROVIDER_DATA_POLICY.md).

## Price snapshots

Public page requests never fan out to marketplace APIs. Approved writers put exact-event, provider-attributed observations into D1. `/api/shows` reads that cache in batches and returns a lane only when all of these pass:

- provider public and price-display flags;
- verified provider event provenance and a matching allowlisted destination;
- the approved provider/source identifier;
- finite price and currency values;
- observation and expiry timestamps; and
- an unexpired cache row for the same local event.

Comparisons require at least two eligible snapshots for the same event and currency. They are listed-price observations, not availability or final checkout totals.

Server rendering queries the cache for **exactly the cards a route renders** — the whole artist board, an artist-city page's own city shows, or a city or venue page's listed shows (city pages were added 2026-09-24; before that every city card read "Check prices") — with reads chunked at 50 ids, so coverage is per-card and cost stays O(cards/50) rather than O(cards). This distinction is load-bearing for honesty, not only coverage: a card whose lanes were queried and found ineligible states the unavailable case in provider-neutral wording, while a card whose lanes were **not** queried renders no note at all, because the server has established nothing about it. Never widen the note to unqueried cards. A cache read that throws counts as *not queried*: `attachApprovedMarketplacePrices` returns the shows with no lanes, so a D1 failure renders silence rather than a claim that no snapshot exists.

A queried card with no eligible price says why, as specifically as the server can establish (`priceUnavailableNote` in `functions/[[path]].js`): the price-supplying lanes it is mapped on and the time of their last recorded check (`provider_price_checks`, quoted only under 36h); or, when it has no button on any price-supplying lane, that the date is not matched on those sites yet; otherwise the undated note. None of them is an availability claim.

### Internal historical price timing foundations

The internal implementation is `functions/_price-timing.js`; it has no public
route or UI. It analyses **recorded provider-listed prices**. The Impact writers
accept an unambiguous exact-event `CurrentPrice`/`Price`, but that field's name
does not establish the lowest *available admission ticket*. Confirm that
semantics for every contributing provider before using that public wording.

**Audit, 2026-10-02.** The existing `provider_pricing_history` is change-only;
successful unchanged polls are omitted, earlier `provider_price_checks` outcomes
are overwritten, historical rows have no showtime/lifecycle revision, and
scheduled jobs delete observations older than 90 days. Those tables cannot
reliably reconstruct the six timing checkpoints and are deliberately never
used to backfill this analysis. The repository has 2,339 unique event IDs,
2,336 resolvable start instants and three date-only events. `events.json` is
6.05 MB; the search index is 0.85 MB. These are repository observations, not a
production D1 coverage audit. SeatGeek has no numeric lane; Ticket Liquidator
remains price-disabled. A completed lookup with `no_price` establishes no
supplied price, not no listings or sold out; a failed lookup establishes neither.

**Capture and storage.** `scripts/lib/price-timing-capture.mjs` adds two D1
tables through the existing price-check import (migration `0012`, self-applying):

- `event_price_timing_events`: retained local event ID, artist, country, resolved
  UTC start, lifecycle, schedule revision, metadata observation time and first
  reconciliation at least 24 hours after the scheduled start.
- `event_price_timing_checkpoints`: at most six rows per provider per schedule
  revision and methodology version. Each preserves the nearest valid price
  (UTC showtime, currency, source, exact provider ID, inventory evidence and UTC capture time)
  and, separately, the nearest lookup attempt and its outcome. Outcomes are
  `priced`, `no_price`, `unusable`, `failed` and `incomplete`. Availability remains
  unknown; zero inventory cannot qualify as a usable price.

Every attempted lookup can compete, including unchanged prices and failures.
Capture timestamps are taken after each catalog response, rather than stamping
every event with the start of a long run. Unattempted/deferred events create no
observation. Only verified mappings on the three approved numeric-price lanes
contribute. Missing source times and held lifecycle states do not produce price
evidence. Date conversion reuses the existing venue-time resolver; stored times
are UTC ISO instants. A date-only start is never treated as midnight.

The compact rows are the sufficient evidence for this deterministic metric,
not a complete raw poll log. A closer candidate replaces a farther one; exact
ties choose the earlier capture time, then a canonical observation tuple.
Replaying the same input is a no-op, and out-of-order observations produce the
same selected result. Start, lifecycle, artist or country changes increment the
schedule revision. Earlier revision rows remain stored but cannot contribute to
the current schedule, even if a show moves away and then back to its old date.
Older runs cannot roll metadata backwards or attach a pre-revision observation
to a newer revision. Provider product IDs must also match between paired points.

Timing evidence has **no automatic age-based deletion**, including after the
event disappears from the current catalog. Existing 90-day change-history
pruning does not touch these tables. Completed records retain their metadata;
unreconciled removed records cannot become completed samples. Explicit duplicate
removals after reconciliation still need analytical exclusion before public use.

**Selection windows.** For each provider, select the closest actual valid
observation to start minus the checkpoint, within these inclusive tolerances:

| Checkpoint | Tolerance |
|---|---|
| 14d | ±12 hours |
| 7d | ±6 hours |
| 48h | ±2 hours |
| 24h | ±1 hour |
| 12h | ±1 hour |
| 1h | ±30 minutes |

All observations must precede showtime. There is no interpolation, carry-forward,
stale-cache substitution or legacy-history inference. These accuracy limits do
not guarantee a delivered observation: GitHub can omit scheduled ticks. A closer
failed, absent-price, unusable or incomplete attempt makes a retained price
partial. Primary statistics require complete pairs. Missing checkpoints remain
missing. The derived event result includes price, currency, provider count,
expected count, observation time range, provider attribution, missing reasons,
percentage change versus 14d and versus the immediately previous checkpoint.

**Calculation.** `getPriceTimingStats({ db, artistId, checkpoint, currency,
country, providers })` requires an explicit fixed provider panel and native
currency/country cohort. For each event/checkpoint, take the minimum qualifying
listed price within that panel. Then calculate `100 * (checkpoint / baseline -
1)` for each completed pair, and report the **median of those percentages**,
strictly-cheaper event percentage, paired sample size, eligible event count,
exclusion counts, 25th/75th percentiles and calculation time/version. Ties are
not cheaper. Previous-checkpoint movement has its own paired sample size; it
never skips a missing intermediate checkpoint. No FX conversion is performed.
Current ECB reference rates on `/api/rates` are not historical FX evidence.

Counts below 10 have `confidence: insufficient` and `claimEligible: false`;
10–49 are indicative, and 50+ are a stronger sample. These describe sample
sufficiency, not statistical certainty. A zero sample returns null statistics.
A small non-zero sample may be inspected internally, but never supports a strong
artist-level claim. Counts and exclusions always accompany numerical results.
`claimEligible` refers only to the minimum paired sample rule; `publicReady` is
always false in this internal foundation until the release checks below are
implemented and verified.

Queries are indexed and artist-scoped, chunked at 40 event IDs, and never parse
the master event file. The default ceiling is 500 completed events (maximum
1,000); exceeding it returns `analysis_limit_exceeded` with null statistics,
not an aggregate over truncated data. Database/schema errors propagate rather
than becoming a fabricated zero sample. No aggregate table is necessary yet.
An uncomputed oversized sample has `sampleSize: null`, not an invented zero.
Keep larger report computation off the 2,000 ms public Worker request path.

**Before public use.** Merge and observe successful capture first; this checkout
has not applied production schema or collected production evidence. Verify feed
minimum-price semantics, provider historical aggregate permissions, delivered
checkpoint coverage, stable provider mappings, duplicate/deletion exclusions
and post-show lifecycle reconciliation. Passing a scheduled start plus 24 hours
is an assumption that the performance occurred, not independent attendance
confirmation; cancelled/postponed/unknown lifecycle records are excluded, but
an unreported cancellation can still be missed. The floor of 10 native currency
units follows existing display gates and can exclude genuinely cheap tickets.
Symmetric windows are retrospective approximations, not executable buying
strategies; missing data and provider panels can introduce selection bias.

Full baseline-to-show evidence begins approximately two weeks after deployment
for newly observed shows. Ten comparable completed shows, not ten snapshots,
are needed for an indicative artist claim. Timing depends on that artist's
actual calendar and data coverage. Later use can include artist-level timing
guidance, an event's own observed history alongside comparable-show context,
monthly reports and editorial/PR statistics. All must retain cohort definitions,
sample sizes, provider attribution, dates, exclusions and non-predictive framing.

## Bindings and secrets

`wrangler.toml` declares the `DEMAND_DB` binding and non-secret development defaults. Production secrets and environment-specific flags are configured in Cloudflare Pages and GitHub Actions.

Credential groups include:

- network-level and provider-specific Impact credentials;
- SeatGeek discovery/price API credentials;
- Ticketmaster Discovery API credentials for automation; and
- Cloudflare credentials for scheduled D1 writes.

Secrets are server-side only. `/api/health` may report presence/absence but must never emit values. The obsolete Ticketmaster Impact credentials are not read by code.

## Deployment

Merges to `main` deploy through the Cloudflare Pages Git integration. `npm run deploy:pages:safe` is the emergency/manual path and runs the validation suite before `wrangler pages deploy public`.

See [DEPLOYMENT.md](DEPLOYMENT.md) for the operator runbook.

## Protected architectural areas

Changes to these files require explicit scope and proportionate validation:

- `functions/_middleware.js`
- `functions/[[path]].js`
- `functions/_route-metadata.js`
- `functions/api/out.js`
- `functions/api/shows.js` price/eligibility gates
- `public/_routes.json`
- reviewed records under `public/data/`
- `public/data/blog-content.json` (generated — edit `content/blog/*.md` instead)
- `functions/api/admin/` OAuth handshake and the vendored `public/admin/` bundle
- `functions/_guide-routes.generated.js` — generated; edit `content/guides/*.md` and run `npm run guides:build`
- `functions/_og-cards.generated.js` and `public/og/` — generated; run `npm run og:build`
- Impact/provider credentials and tracking logic

## Documentation boundaries

- Stable contracts and structure: this file, `CLAUDE.md`, and topic runbooks.
- Workflow schedules, secrets/bindings, and known infrastructure incidents: `docs/OPERATIONS.md` only.
- Current data counts and per-artist status: `PROJECT_STATUS.md` only.
- Priorities and parked work: `BACKLOG.md` only.
- Historical implementation details: git history, pull requests, and issues.
