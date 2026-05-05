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

### Current Production Reality

The tracked repo is configured for Cloudflare Pages, but the live custom domains currently route to a standalone Cloudflare Worker:

- `tourticketcompare.com/*` -> Worker `tourticketcompare-live`
- `www.tourticketcompare.com/*` -> Worker `tourticketcompare-live`

That means a Cloudflare Pages deploy does **not** automatically update the live custom domain while those Worker routes are active.

Current production audit:

- Production platform: Cloudflare Workers.
- Production entrypoint: Worker `tourticketcompare-live`.
- Production routes: `tourticketcompare.com/*` and `www.tourticketcompare.com/*`.
- GitHub Actions: no workflow is currently present in this repo.
- Manual Wrangler Pages deploy: supported for Pages previews/fallback only.
- Cloudflare Pages project: `tourticketcompare`, production branch `main`, output directory `public`, build command blank.

Beginner rule: if you want to update the live site, first confirm whether Cloudflare still routes the custom domains to Worker `tourticketcompare-live`. If yes, do not assume a Pages deploy is production.

### Cloudflare Pages Preview/Fallback Deploy

Use these settings in the Cloudflare Pages dashboard:

- Framework preset: `None`
- Production branch: `main`
- Root directory: repository root
- Build command: leave blank
- Build output directory: `public`

Cloudflare will serve static assets from `public/` and automatically wire Pages Functions from `functions/`.

Required repo files for Pages:

- `public/`
- `functions/`
- `wrangler.toml`
- `.env.example`

Deploy Pages manually:

```bash
npm run deploy:pages
```

Run strict data validation first:

```bash
npm run deploy:pages:safe
```

`npm run deploy` intentionally prints a warning instead of deploying, because production is currently Worker-routed.

### Production Worker Deploy

The production Worker deployment path needs to preserve existing Worker bindings and secrets. Before deploying Worker `tourticketcompare-live`, confirm the Worker source/bundle you are uploading is the intended production entrypoint.

Required Worker bindings observed in production:

- `MOCK_MODE=false`
- `ALLOW_MOCK_PRICES=false`
- `CACHE_TTL_MINUTES=60`
- `CLICK_TRACKING_ENABLED=true`
- `DEMAND_DB` D1 binding, if demand capture is enabled
- `IMPACT_ACCOUNT_SID` secret, if Impact Publisher API routes are enabled
- `IMPACT_AUTH_TOKEN` secret, if Impact Publisher API routes are enabled
- `IMPACT_DEFAULT_PROGRAM_ID`, if provider tracking-link creation is enabled
- `IMPACT_TICKETMASTER_PROGRAM_ID`, if Ticketmaster provider routing is enabled

Never paste secret values into README files, public JavaScript, public JSON, logs, or PR descriptions.

### Environment Variables And Bindings

Set the same non-secret values from `.env.example` in Cloudflare for Preview and Production. Secrets must be configured as Cloudflare secrets, not committed to the repo.

Optional D1 bindings:

- `RATE_LIMIT_DB` or fallback `DB`
- `CLICKS_DB`
- `DEMAND_DB`, if demand capture/analytics code is deployed

### Health Check

`GET /api/health` returns non-secret app status for the deployed function path:

```json
{
  "ok": true,
  "service": "tourticketcompare",
  "status": "ok",
  "config": {
    "mockMode": false,
    "allowMockPrices": false
  },
  "bindings": {
    "impactAccountSid": true,
    "impactAuthToken": true
  }
}
```

The health response reports whether bindings exist, but never returns token values, account IDs, API keys, or program IDs.

After any deploy, check:

```bash
curl -fsS https://tourticketcompare.com/api/health
curl -fsSI https://www.tourticketcompare.com/
curl -fsS https://tourticketcompare.com/
```

## SEO setup

- `robots.txt` points to `/sitemap.xml`
- `functions/sitemap.xml.js` generates canonical entries from current host, artists, and event city links
- `functions/[[path]].js` serves only known artist slugs and injects artist-specific title/description/canonical tags server-side

## Compliance posture

- No scraping.
- Official APIs/affiliate feeds only.
- Site must remain clearly unofficial and fan-made.
