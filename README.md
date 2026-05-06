# TourTicketCompare

TourTicketCompare is an independent, unofficial 2026/27 stadium tour market watch. The MVP is a static Cloudflare Pages site with Pages Functions APIs. It should publish artist watch pages, verified show cards when real data exists, and safe provider links only when destinations are configured.

The product must not invent tour dates, venues, prices, ticket availability, provider coverage, or "deal" claims. It must not be marketed as a live multi-provider comparison product until verified multi-provider data exists.

## Current Product Scope

- Homepage: finished "2026/27 stadium tour market watch" landing page.
- Artist pages: known artist slugs only.
- Show cards: render from `public/data/events.json` or `/api/shows` when real future event data exists.
- Ticket CTAs: appear only for verified configured destinations routed through server-side functions.
- Impact API checks: server-side only and safe when credentials or scopes are missing.
- No scraping, fake prices, invented events, placeholder links, or disabled dead-end CTAs.

## Tech Stack

- Frontend: static HTML, CSS, and JavaScript in `public/`.
- Runtime: Cloudflare Pages.
- APIs: Cloudflare Pages Functions in `functions/`.
- Static data: JSON files in `public/data/`.
- Optional storage: Cloudflare D1 bindings for rate limits, clicks, analytics, or demand capture if those APIs are enabled.

Cloudflare Pages is the deployment path for this MVP.

## Canonical Routes

- `/`
- `/artists`
- `/artists/[artist-slug]`
- `/guides`
- `/guides/[guide-slug]`
- `/how-it-works`
- `/about`
- `/contact`
- `/editorial-policy`
- `/affiliate-disclosure`
- `/sitemap.xml`
- `/robots.txt`
- `/api/health`
- `/api/shows`
- `/api/out`
- `/api/impact/health`
- `/api/impact/products`
- `/api/impact/tracking-links`

Known artist slugs only should resolve as artist pages. Unknown artist routes should return a useful 404.

## Data Rules

Use `public/data/artists.json` and `public/data/catalog.json` for known artists and verified provider-link markers. Use `public/data/events.json` for reviewed event records only.

Event records must not be fabricated. If there are no verified future events, the UI should show a polished empty state instead of fake show cards.

Provider URLs must be rejected or hidden if they contain placeholder/example values such as `example.com`, `localhost`, `placeholder`, `your-link-here`, or `replace-me`.

## API Rules

### `/api/shows`

- Returns show metadata from static data and, when configured, official Ticketmaster Discovery results.
- List queries must not fan out to provider pricing APIs.
- `includePrices=true` is allowed only with `showId`.
- Mock prices are disabled in production.
- Missing API credentials must return safe metadata or an empty state, not fake data.

### `/api/out`

- Server-side outbound route for verified provider links.
- Rejects unknown artists, unknown providers, malformed URLs, placeholder URLs, localhost, and arbitrary open redirects.
- Never exposes Impact credentials or API keys.
- Click tracking is best-effort and must not block a safe redirect.

### `/api/impact/*`

- Server-side only.
- `IMPACT_ACCOUNT_SID` and `IMPACT_AUTH_TOKEN` are required for live Impact API calls.
- Missing credentials should return a safe `missing_credentials` response.
- Missing scopes or approval should return a safe error without exposing secrets.

## Local Development

Install dependencies:

```bash
npm install
```

Run Cloudflare Pages locally:

```bash
npm run dev
```

Run MVP checks:

```bash
npm run test:mvp
```

Convert and validate event data only when you have real reviewed source data:

```bash
npm run events:csv
npm run events:validate
npm run events:partition
```

## Cloudflare Pages Deployment

Use these settings in Cloudflare Pages:

- Production runtime: Cloudflare Pages
- Root directory: repository root
- Framework preset: None
- Build command: leave blank, or run `npm run test:mvp` before manual deploy
- Build output directory: `public`
- Functions directory: `functions`
- Compatibility date: `2025-01-01`

Deploy from the CLI:

```bash
npm run deploy
```

Safer deploy with local checks first:

```bash
npm run deploy:pages:safe
```

## Environment Variables

Set these in Cloudflare Pages Preview and Production:

```text
MOCK_MODE=false
ALLOW_MOCK_PRICES=false
CACHE_TTL_MINUTES=60
TICKETMASTER_DAILY_CAP=1000
TICKETMASTER_STALE_TTL_HOURS=168
CLICK_TRACKING_ENABLED=true
TICKETMASTER_DISCOVERY_ENABLED=true
TICKETMASTER_EVENTS_TTL_MINUTES=30
TICKETMASTER_ARTIST_EVENTS_LIMIT=100
TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED=false
```

Optional live API secrets:

```text
TICKETMASTER_API_KEY=your_ticketmaster_discovery_key
IMPACT_ACCOUNT_SID=your_impact_account_sid
IMPACT_AUTH_TOKEN=your_impact_auth_token
```

Optional D1 bindings if enabled:

```text
RATE_LIMIT_DB
CLICKS_DB
DEMAND_DB
```

Impact API scopes:

- Products: `GET /Mediapartners/<AccountSID>/Marketplace/Products`
- Tracking Links: `POST /Mediapartners/<AccountSID>/Programs/<ProgramId>/TrackingLinks`

## Safety Checklist

Before deployment, confirm:

- Homepage says "2026/27 stadium tour market watch."
- Known artist routes load.
- Unknown artist routes return 404.
- `/api/shows` returns JSON.
- No mock prices are visible.
- No fake events, venues, dates, or availability are visible.
- No placeholder/example affiliate links are shown as real CTAs.
- Impact credentials are not exposed in public assets or `/api/health`.
- README describes Cloudflare Pages only as the MVP deployment path.
