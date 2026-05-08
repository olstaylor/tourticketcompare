# TourTicketCompare

TourTicketCompare is an independent, unofficial ticket research site for fans of major live music tours. It helps users find checked ticket links where available, understand buying risks, and read practical guidance before leaving for an external ticket provider.

The site is live at `https://tourticketcompare.com` and `https://www.tourticketcompare.com`.

TourTicketCompare should feel useful today without pretending to provide live multi-provider price comparison. Ticket links should only appear when the artist, event, and destination can be verified. Final prices, fees, availability, delivery terms, and checkout terms are confirmed by the ticket provider.

## Project Source Of Truth

Before making changes, read:

- `PROJECT_BRIEF.md` — product positioning, safety rules, affiliate/provider constraints, and success criteria.
- `PROJECT_STATUS.md` — current state, known issues, test commands, and next tasks.
- `BACKLOG.md` — prioritised work, guardrails, and parking-lot items.

GitHub `main` is the source of truth. Codex should be used for small, scoped implementation tasks, not as the only project memory.

## Current Product Scope

- Homepage: fan-facing ticket research landing page.
- Artist pages: known artist slugs only.
- Show cards: render only from reviewed data or approved official sources.
- Ticket CTAs: appear only for checked destinations routed through server-side functions.
- Guides: practical buying guidance around fees, resale risk, final totals, timing, and official vs resale tickets.
- Affiliate links: may be used, but affiliate relationships must not weaken verification standards.

The product must not invent tour dates, venues, prices, ticket availability, provider coverage, or deal/savings claims. It must not be marketed as a live multi-provider price comparison product until verified multi-provider data exists and display rights are clear.

## Tech Stack

- Frontend: static HTML, CSS, and JavaScript in `public/`.
- Runtime: Cloudflare Pages.
- APIs: Cloudflare Pages Functions in `functions/`.
- Static data: JSON files in `public/data/`.
- Optional storage: Cloudflare D1 bindings for rate limits, clicks, analytics, or demand capture if those APIs are enabled.

Cloudflare Pages is the deployment path for this project.

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

Known artist slugs only should resolve as artist pages. Unknown artist routes should return a useful 404 or an honest empty state, not a thin generated page.

## Data Rules

Use `public/data/artists.json` and `public/data/catalog.json` for known artists and verified provider-link markers. Use `public/data/events.json` for reviewed event records only.

Event records must not be fabricated. If there are no verified future events, the UI should show a polished empty state instead of fake show cards.

Provider URLs must be rejected or hidden if they contain placeholder/example values such as `example.com`, `localhost`, `placeholder`, `your-link-here`, or `replace-me`.

## Provider And Pricing Model

- Ticketmaster should be treated as an official event verification and official event-link source, not as a reliable public price source for this project.
- Marketplace partners such as SeatGeek, Vivid Seats, TicketNetwork, StubHub International, or others may become provider-specific price sources only if approved feeds/APIs explicitly supply displayable pricing and usage rights.
- Impact affiliate approval does not automatically mean the site can ingest or publicly display price data.

Safe model:

> Verified ticket links first. Provider-specific price information only where approved providers supply it. Final prices, fees, availability, delivery terms, and checkout terms are confirmed by the provider.

## API Rules

### `/api/shows`

- Returns show metadata from reviewed static data and, when configured, approved official sources.
- List queries must not fan out to provider pricing APIs.
- `includePrices=true` is allowed only with `showId` and only where the underlying provider data is approved for display.
- Mock prices are disabled in production.
- Missing API credentials must return safe metadata or an empty state, not fake data.

### `/api/out`

- Server-side outbound route for checked provider links.
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

Run project checks:

```bash
npm run test:mvp
```

Convert and validate event data only when you have real reviewed source data:

```bash
npm run events:csv
npm run events:validate
npm run events:partition
```

## Standard Manual Checks

For most scoped changes, run the relevant subset:

```bash
node --check public/app.js
node --check 'functions/[[path]].js'
python3 scripts/validate-events.py --for-production
node scripts/smoke-prelaunch.mjs
git diff --check
```

When route shims are touched, also check:

```bash
node --check functions/artists.js
node --check functions/guides.js
node --check functions/how-it-works.js
node --check functions/editorial-policy.js
node --check functions/affiliate-disclosure.js
node --check functions/contact.js
```

## Cloudflare Pages Deployment

Use these settings in Cloudflare Pages:

- Production runtime: Cloudflare Pages
- Root directory: repository root
- Framework preset: None
- Build command: leave blank, or run checks before manual deploy
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

## Safety Checklist Before Deployment

Before deployment, confirm:

- Homepage clearly explains checked ticket links and buying guidance.
- Live price comparison is not claimed unless verified provider data exists.
- Known artist routes load.
- Unknown artist routes do not become thin generated pages.
- `/api/shows` returns safe JSON.
- `/api/out` preserves checked event/provider redirect behaviour.
- No mock prices are visible.
- No fake events, venues, dates, prices, or availability are visible.
- No placeholder/example affiliate links are shown as real CTAs.
- Impact credentials are not exposed in public assets or `/api/health`.
- Public pages contain no internal/dev wording.

## Current Parked Issue

The non-root raw HTML routing/canonical issue is parked unless explicitly prioritised. Some non-root routes have previously served homepage H1/title/canonical in raw HTML before client-side rendering. This should be fixed before serious SEO scaling or indexing work, but should not be mixed into copy, content, or artist-data tasks.

## Codex Workflow

Every Codex task should start with:

```text
Read PROJECT_BRIEF.md and PROJECT_STATUS.md first.
Work only on the specific task below.
Do not scan the whole repo unless required.
```

Use one small task at a time. List exact files to inspect/edit. Preserve affiliate routing and verified data unless explicitly working in that area. Stop after summarising changes. Commit after each clean improvement.
