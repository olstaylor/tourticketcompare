# TourTicketCompare architecture

TourTicketCompare is a static-first Cloudflare Pages application with Pages Functions for routing and APIs. This document describes durable repository contracts; current counts, provider rollout state, and live risks belong in [PROJECT_STATUS.md](../PROJECT_STATUS.md).

## Runtime

| Layer | Responsibility |
|---|---|
| `public/` | Static HTML shell, client JavaScript, CSS, and public JSON data |
| `functions/` | Cloudflare Pages middleware, server-rendered route adaptation, APIs, redirects, and sitemap |
| Cloudflare Pages | Production hosting and Git-integrated deployment |
| Cloudflare D1 (`DEMAND_DB`) | Signups, analytics, rate caps, provider pricing cache, and pricing history |

Cloudflare Pages + Pages Functions is the only production path. Vercel and the former standalone Worker are not deployment targets; do not reintroduce either without an explicit architecture decision.

## Repository map (key paths)

```text
public/
  index.html                 Shared HTML shell and generated inline data fallback
  app.js                     Progressive-enhancement client
  data/
    artists.json             Artist records and indexing state
    catalog.json             Provider metadata, artist links, and tours
    fallback-catalog.json    Client fallback if catalog loading fails
    provider-configs.json    Provider display/cache/safety configuration
    guides-content.json      Guide content keyed by route
    events.json              Reviewed event records
    events/                  Generated per-artist partitions
    events-index.json        Generated partition index

functions/
  _middleware.js             Entry point for requests
  [[path]].js                Active HTML router and server rendering
  _route-metadata.js         Route titles, descriptions, H1s, and guide registry
  _impact-marketplace-config.js  Shared marketplace provider configuration
  _cities.js                 City aggregation derived from events.json (shared with sitemap/llms.txt)
  _venues.js                 Venue aggregation derived from events.json (shared with sitemap)
  sitemap.xml.js / llms.txt.js  Generated discovery endpoints
  [named route shims]        Fallback re-exports from [[path]].js
  api/
    out.js                   Fail-closed outbound redirect and provider policy
    shows.js                 Event API and cache-only price responses
    health.js                Runtime/config presence without secret values
    impact/                  Server-side Impact helpers and diagnostics

data/
  provider-identities.json   Human-verified provider identity registry

scripts/                     Validation, sync, reporting, and automation tools
.github/workflows/           Scheduled and manual automation
reports/provider-sync/       Latest generated provider-sync audit output
reports/status-history/      Dated frozen status narratives moved out of PROJECT_STATUS.md
docs/                        Stable policies and runbooks
migrations/                  Ordered D1 migrations and applied-state ledger
```

## Request routing

```text
request
  → public/_routes.json
  → functions/_middleware.js
      ├─ /api/* and known assets → context.next()
      ├─ file-extension paths    → static asset handling
      └─ HTML routes            → functions/[[path]].js
```

`functions/[[path]].js` handles the home page, the `/compare-concert-ticket-prices` comparison hub, trust pages, guide routes, artist routes, city routes, venue routes, redirects, schemas, and 404s. `functions/_route-metadata.js` is the single metadata registry for fixed and guide routes; data-derived city and venue metadata is composed in the router from the shared aggregation records.

The named route shims (`functions/artists.js`, `guides.js`, and peers) only re-export `onRequest` from `[[path]].js`. While middleware is active, editing a shim does not change live routing.

Unknown non-file routes return a real noindex 404. Known city and venue aggregations may render below their indexing threshold with `noindex`; the site must not generate pages for unknown artists, tours, cities, or venues.

## City aggregation layer

City landing pages (`/cities` index + `/cities/<city-country>`) are a server-rendered aggregation derived purely from reviewed upcoming `events.json` records (`functions/_cities.js`, shared with the sitemap, `llms.txt`, and internal-link audit). Country aliases such as `United States Of America` normalize before grouping so one city does not split into duplicate canonical pages. A city is indexable only with at least four upcoming tracked shows across at least two artists; thinner known cities render `noindex`, and unknown slugs 404. City pages include a data-derived direct answer, artist/date/venue-specific coverage, editorial provenance, grouped schedules, buying guidance, and visible FAQs. They deep-link to the matching artist show card and indexable venue pages, and emit `Place`, `CollectionPage`, `ItemList`, breadcrumb, and FAQ structured data that mirrors visible content without duplicating event offers or inventing location facts. Current city counts live in `PROJECT_STATUS.md` and change with `events.json` and the calendar.

## Venue aggregation layer

Venue landing pages (`/venues` index + `/venues/<slug>`) are a server-rendered aggregation derived purely from reviewed `events.json` records (`functions/_venues.js`, shared with the sitemap, `llms.txt`, and internal-link audit). Each qualifying page provides a direct answer, artist/date coverage, editorial provenance, event cards grouped by artist, buying guidance, and visible FAQs grounded in the same records. The artist pages remain the source of verified provider CTAs and price snapshots — the venue aggregation invents no data or provider state. The slug is `slugify("<venue> <city>")` so inconsistent country labels for one physical venue merge. Venues with ≥3 upcoming shows across ≥2 artists are indexable and in the sitemap; thinner known venues render `noindex`; unknown slugs 404. Current venue counts live in `PROJECT_STATUS.md` and move with `events.json` and the calendar.

## Artist-city aggregation layer

Artist-city landing pages (`/artists/<artist>/tickets/<city>`) target local intent (`[Artist] tickets [City]`) and are a server-rendered aggregation derived purely from one artist's reviewed upcoming `events.json` records (`functions/_artist-cities.js`, shared with the sitemap, `llms.txt`, and internal-link audit). The four-segment path never collides with the two-segment tour route or the `/artists/<artist>/tickets` redirect. The city slug is the same `slugify("<city> <normalized-country>")` as `/cities/<slug>`, so country aliases merge and a same-named city in two countries stays two distinct pages (the visible label carries the country to keep titles/descriptions unique). The page reuses the artist show board — so CTAs, gated price snapshots, `/api/out` tracking, and analytics are identical to the main artist page — plus a data-derived at-a-glance summary, a local buying guide, the pricing explanation, artist-city FAQs, and internal links back to the artist hub, the shared `/cities` and `/venues` pages where those qualify, and the artist's other active cities. It emits `Place`, `CollectionPage`, `ItemList`, breadcrumb, an inline performer, and publishable-gated `MusicEvent` structured data mirroring visible content, and never invents local facts, prices, or availability.

**Indexing lifecycle.** A combination is indexable (200, self-canonical, in the sitemap) only when the artist is `indexable_with_substantial_content` **and** the city has at least one upcoming publishable show. A genuinely inactive combination — a city the artist has an event footprint in, but with no qualifying upcoming show now, or an under-review artist — selectively **301s to the artist hub** rather than leaving a misleading empty page. Any other slug (unknown artist, or a city the artist has never played) returns a real **404**, never a soft 404. Expired combinations therefore leave the index automatically as their dates pass. The router, sitemap, and internal-link audit all consume the one `functions/_artist-cities.js` derivation, so the indexable URL set cannot drift between them. Current counts live in `PROJECT_STATUS.md` and move with `events.json` and the calendar.

## Data and rendering flow

1. Reviewed source records live in `public/data/artists.json`, `catalog.json`, and `events.json`.
2. `npm run events:partition` creates per-artist event files and `events-index.json`.
3. `npm run events:sync` refreshes partitions and the inline fallback in `public/index.html`.
4. Server rendering and `/api/shows` read the reviewed data and apply the same provider publishability rules.
5. `public/app.js` progressively enhances the server-rendered page; it must not loosen server-side URL, provenance, or price gates.

The `stale-sync-guard` workflow check prevents public JSON and the inline fallback from drifting.

## Provider and redirect contract

All public ticket clicks route through `/api/out`.

- Ticketmaster destinations are verified plain redirects with no affiliate wrapping.
- Affiliate providers require a provider-specific allowlisted URL, publishable provenance, runtime public configuration, and successful server-side tracking generation.
- Artist-level destinations come from protected constants and verified identity records.
- Event-level destinations come from reviewed event data and provider-specific provenance.
- Any missing or invalid condition suppresses the CTA or returns diagnostic JSON. There is no untracked affiliate fallback.

Event CTAs publish independently per provider: the Ticketmaster link follows the row's verification status, while an affiliate provider link may still publish on a `needs_recheck` row when that provider link carries its own verified provenance. The shared rule is `providerEventPublishable`, implemented in parallel in `functions/api/out.js`, `functions/[[path]].js`, `public/app.js`, and `functions/api/shows.js`; the smoke suite guards SSR/API parity.

Client and server CTA builders (`artistProviderHref`/`eventTicketHref` in `public/app.js` and `functions/[[path]].js`) emit `/api/out?...&provider=<slug>`, which `out.js` resolves and Impact-wraps server-side. The account Impact Publisher Tag (`public/impact-publisher-tag.js`, UTT `P-A3977745`) loads site-wide for **impression** tracking only (`impactStat("trackImpression")`); it does not transform links, so click attribution never depends on client-side rewriting or Impact dashboard auto-link configuration. Do not switch monetized CTAs to raw/direct destinations.

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
- Impact/provider credentials and tracking logic

## Documentation boundaries

- Stable contracts and structure: this file, `CLAUDE.md`, and topic runbooks.
- Current counts, runtime state, and risks: `PROJECT_STATUS.md` only.
- Priorities and parked work: `BACKLOG.md` only.
- Historical implementation details: git history, pull requests, and issues.
