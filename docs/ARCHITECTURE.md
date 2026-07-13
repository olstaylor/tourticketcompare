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

`functions/[[path]].js` handles the home page, trust pages, guide routes, artist routes, redirects, schemas, and 404s. `functions/_route-metadata.js` is the single metadata registry. Update metadata there rather than duplicating it in the router.

The named route shims (`functions/artists.js`, `guides.js`, and peers) only re-export `onRequest` from `[[path]].js`. While middleware is active, editing a shim does not change live routing.

Unknown non-file routes return a real noindex 404. The site must not generate thin pages for unknown artists, tours, cities, or venues.

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
