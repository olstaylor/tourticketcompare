# Tour Ticket Compare

Unofficial, fan-made stadium tour ticket resource for major artists. The site must not claim live ticket or price comparison unless verified multi-provider live data exists.

## Deployment First

Production is the Cloudflare Worker `tourticketcompare-live`.

- Production runtime: Cloudflare Worker `tourticketcompare-live`
- Production routes: `tourticketcompare.com/*` and `www.tourticketcompare.com/*`
- Cloudflare Pages: preview/fallback only while Worker routes own the custom domains
- Vercel: not production unless explicitly reintroduced later

`npm run deploy` intentionally refuses to deploy so a production-sounding command cannot accidentally deploy the wrong platform. Use `npm run deploy:pages` only for the Pages preview/fallback path.

See `docs/DEPLOYMENT.md` for beginner-friendly local checks, preview deploy steps, production Worker deploy guidance, and `/api/health` verification.

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

3. Open:

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

The live custom domains currently route to Cloudflare Worker `tourticketcompare-live`, not directly to Cloudflare Pages. Treat Cloudflare Pages as preview/fallback only unless the Cloudflare routes are intentionally changed.

For the full deployment procedure, see `docs/DEPLOYMENT.md`.

### Git-connected Cloudflare Pages

Use these settings only for the Pages preview/fallback path:

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

Use this command for Pages preview/fallback deploy:

```bash
npm run deploy:pages
```

Safer Pages preview/fallback deploy (runs strict data validation first):

```bash
npm run deploy:pages:safe
```

## SEO setup

- `robots.txt` points to `/sitemap.xml`
- `functions/sitemap.xml.js` generates canonical entries from current host, artists, and event city links
- `functions/[[path]].js` serves only known artist slugs and injects artist-specific title/description/canonical tags server-side

## Compliance posture

- No scraping.
- Official APIs/affiliate feeds only.
- Site must remain clearly unofficial and fan-made.
