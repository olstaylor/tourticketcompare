# Tour Ticket Compare (Cloudflare Pages MVP)

Unofficial, fan-made ticket comparison site for major stadium tours.

## Tech stack

- Frontend: static `HTML/CSS/JS` in `public/`
- Backend: Cloudflare Pages Functions in `functions/`
- Data:
  - `public/data/events.json` (master show-level data, with CSV tooling)
  - `public/data/events-index.json` (lightweight global index for homepage/all-artists views)
  - `public/data/events/*.json` (per-artist event partitions for scalable artist routes)
  - `public/data/artists.json` (artist-level metadata for route SEO/navigation)

## Key routes

- Home: `/`
- Artist pages (path-based): `/bruno-mars`, `/bts`, `/guns-n-roses`, `/luke-combs`, `/harry-styles`
- API: `/api/shows`
- Sitemap: `/sitemap.xml`

Only known artist slugs (from `artists.json`/`events.json`) are served as artist pages. Unknown slugs return 404.

## Local development

1. Install dependencies:

```bash
npm install
```

2. Run local Pages dev:

```bash
npm run dev
```

For local Pages Functions environment variables, copy `.dev.vars.example` to `.dev.vars` and fill in your values.

3. Apply D1 migrations locally if you are working on catalog, demand, or sync data:

```bash
npm run d1:migrate:local
```

This uses the `DEMAND_DB` binding from `wrangler.toml` and creates a local Wrangler D1 database. The local database is separate from production.

4. Open:

- `http://localhost:3000`
- `http://localhost:3000/bruno-mars`
- `http://localhost:3000/bts`
- `http://localhost:3000/guns-n-roses`
- `http://localhost:3000/luke-combs`
- `http://localhost:3000/harry-styles`

## How pricing works now

- Frontend no longer simulates provider prices.
- Provider cards load from `GET /api/shows?showId=<eventId>`.
- API returns provider `status` and `cacheState` (`live`, `cached`, `stale`, `rate_limited`).
- Frontend surfaces these states in provider badges and "Last checked" text.
- Ticketmaster provider pricing uses Discovery API event details when `MOCK_MODE=false`.
- Placeholder/example affiliate links are treated as invalid and are never used for CTAs.
- If no verified provider URL exists, CTAs are disabled and the UI shows trust-safe fallback copy.
- Mock mode can be enabled for QA, but synthetic mock prices are disabled by default.
- API dedupes in-flight provider fetches per `showId:provider`.
- Outbound affiliate clicks are tracked via `POST /api/click` (non-blocking beacon/fetch).

## Artist events from Ticketmaster Discovery

- Artist pages can fetch live event listings through `GET /api/shows?artistSlug=<slug>&source=ticketmaster`.
- Discovery response is mapped into site show fields:
  - event name
  - datetime
  - venue
  - city
  - Ticketmaster URL
  - image URL (if present)
- Artist-page frontend uses this API path first and falls back to local JSON only if the request fails.
- API response includes `artistFeed` metadata (`source`, `cacheState`, `error`) for graceful UI messaging.
- If only Ticketmaster URLs are available for an event, UI shows Ticketmaster as the available source and does not present fake comparison CTAs.

## API query params

`/api/shows` supports:

- `showId`
- `artistSlug`
- `city`
- `country`
- `venue`
- `from` (ISO datetime)
- `to` (ISO datetime)
- `includePrices=true` (without this, list queries return shows metadata only)
- `offset` and `limit` for metadata pagination (`limit` capped server-side)

Past events are excluded server-side.

Guardrail:

- `includePrices=true` is allowed only with `showId` to prevent bulk provider fan-out.

## Caching and rate limits

- Provider results are cached in the Workers Cache API per show/provider.
- Ticketmaster daily cap logic is enforced in the API.
- If `RATE_LIMIT_DB` (D1 binding) is configured, daily counting is durable.
- If no D1 binding is present, a best-effort cache-based counter is used.
- Stale fallback is returned when rate-limited and stale data exists.

## Environment variables

Set these in Cloudflare Pages (Preview + Production):

```bash
MOCK_MODE=false
ALLOW_MOCK_PRICES=false
CACHE_TTL_MINUTES=60
TICKETMASTER_DAILY_CAP=1000
TICKETMASTER_STALE_TTL_HOURS=168
CLICK_TRACKING_ENABLED=true
TICKETMASTER_DISCOVERY_ENABLED=true
TICKETMASTER_EVENTS_TTL_MINUTES=30
TICKETMASTER_ARTIST_EVENTS_LIMIT=100
TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED=true
TICKETMASTER_DISCOVERY_COUNTRY=

TICKETMASTER_API_KEY=your_key_here
SEATGEEK_CLIENT_ID=your_client_id_here
SEATGEEK_CLIENT_SECRET=your_client_secret_here
VIVID_SEATS_API_KEY=your_key_here
```

Notes:

- Ticketmaster Discovery requires `TICKETMASTER_API_KEY`.
- `TICKETMASTER_DISCOVERY_COUNTRY` is optional and should be a 2-letter country code if set.
- Set `TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED=false` if you want metadata discovery only (no Ticketmaster price-range checks).
- D1 binding name expected by code: `RATE_LIMIT_DB` (or fallback `DB`).
- Optional dedicated D1 binding for click tracking: `CLICKS_DB`.
- Verified catalog and demand-capture storage uses the `DEMAND_DB` D1 binding.

## Cloudflare D1

The repo includes D1 migrations for durable catalog and sync metadata:

- `migrations/001_daily_provider_calls.sql`: optional durable provider rate-limit counters.
- `migrations/002_ticket_catalog.sql`: artists, events, sync runs, and featured artist seed rows.

### Binding

`wrangler.toml` declares the shared D1 binding:

```toml
[[d1_databases]]
binding = "DEMAND_DB"
database_name = "tourticketcompare-demand"
```

Do not commit D1 database IDs or secrets. For remote deployments, configure the `DEMAND_DB` binding in the Cloudflare dashboard or CI environment after creating/selecting the database.

If the database does not exist yet, create it with:

```bash
npm run d1:create
```

Wrangler will print a database ID. Keep that ID in Cloudflare configuration only; do not paste it into source code.

### Apply migrations locally

```bash
npm run d1:migrate:local
```

Local migrations seed these featured artists:

- Beyoncé
- Harry Styles
- BTS
- Ariana Grande
- Bad Bunny
- Morgan Wallen
- JAY-Z

No event rows are seeded. Add events only after dates, venues, source URLs, provider links, and inventory status are verified.

### Apply migrations remotely

Confirm the remote Cloudflare environment has a `DEMAND_DB` binding, then run:

```bash
npm run d1:migrate:remote
```

To inspect migration status:

```bash
npm run d1:migrations:list
```

### D1 schema

`artists`

- `slug`: canonical artist slug and primary key.
- `name`: public artist name.
- `featured`: `1` for featured launch artists.
- `sort_order`: display priority.
- `status`: planning/status marker for internal catalog workflows.

`events`

- `id`: stable event ID.
- `artist_slug`: foreign key to `artists.slug`.
- `event_name`, `venue_name`, `city`, `region`, `country`, `starts_at`, `timezone`: nullable until verified.
- `source_type`, `source_url`: where verified event data came from.
- `inventory_status`: safe state such as `unknown`, `verified_link_available`, `price_unavailable`, `limited_availability`, `sold_out`, `unavailable`, or `error`.
- `last_verified_at`: timestamp for the last verified provider/source check.

`sync_runs`

- Stores source sync status, counts, timestamps, error messages, and optional JSON metadata.

## Data model

Events are expected in `public/data/events.json` with fields like:

- `id`
- `artist_slug`
- `artist_name`
- `country`
- `city`
- `venue`
- `datetime_iso`
- provider event IDs and provider URLs (`ticketmaster_url`, `seatgeek_url`, `vividseats_url`)

Artists are expected in `public/data/artists.json` with fields:

- `slug`
- `name`
- `description` (optional, used for route-level SEO text)
- `events_path` (optional, route-specific events file; defaults to `./data/events/<slug>.json`)
- `priority` (optional, lower = earlier in artist directory)

## Data update workflow

1. Edit `data/events.csv` (or update JSON directly).
2. Update `public/data/artists.json` when adding/removing artist pages.
3. Convert CSV to JSON:

```bash
npm run events:csv
```

4. Validate:

```bash
npm run events:validate
```

Production safety validation:

```bash
npm run events:validate:prod
```

This fails if data is empty, if affiliate URLs are missing, or if placeholder/example URLs are present.

5. Partition events into index + per-artist files:

```bash
npm run events:partition
```

6. Optional sync for local `file://` fallback:

```bash
npm run events:sync
```

This sync now writes a small fallback subset (not the full dataset) into `index.html` to keep local previews usable without bloating page size.

7. One-shot update:

```bash
npm run events:update
```

Safety guardrails are enabled in `events:update`:
- CSV conversion refuses to overwrite non-empty data with `0` rows unless explicitly allowed.
- CSV conversion blocks unexpected large drops in row count by default.
- Partitioning refuses to run on empty datasets unless explicitly allowed.

## Deployment

This repo is set up for Cloudflare Pages with Pages Functions.

### Git-connected Cloudflare Pages

Use these settings in the Cloudflare Pages dashboard:

- Framework preset: `None`
- Production branch: `main`
- Root directory: repository root
- Build command: leave blank
- Build output directory: `public`

Cloudflare will serve static assets from `public/` and automatically wire Pages Functions from `functions/`.

### Required repo files for Pages

- `public/`
- `functions/`
- `wrangler.toml`
- `.env.example`

### Environment variables

Set the same values from `.env.example` in both Preview and Production.

### Optional bindings

If you want durable rate-limit and click tracking storage, add D1 bindings in the Cloudflare dashboard:

- `RATE_LIMIT_DB`
- `CLICKS_DB`

### Local Wrangler config

`wrangler.toml` is included so local dev and CLI-based Pages deploys use the same output directory and compatibility date.

Use this command for direct CLI deploy:

```bash
npm run deploy
```

Safer production deploy (runs strict data validation first):

```bash
npm run deploy:safe
```

## SEO setup

- `robots.txt` points to `/sitemap.xml`
- `functions/sitemap.xml.js` generates canonical entries from current host, artists, and event city links
- `functions/[[path]].js` serves only known artist slugs and injects artist-specific title/description/canonical tags server-side

## Compliance posture

- No scraping.
- Official APIs/affiliate feeds only.
- Site must remain clearly unofficial and fan-made.
