# TourTicketCompare Handover

Use this file for the current working state only. Historical MVP, prelaunch, CRO, and route experiments have been moved to `docs/history.md`.

## Current Live State

- Live URL: `https://tourticketcompare.com`
- `www` URL: `https://www.tourticketcompare.com` → 301 → `https://tourticketcompare.com` (path-preserving; Cloudflare Redirect Rule confirmed 2026-05-11)
- Current live deployment target: **Cloudflare Pages Functions** (confirmed 2026-05-11 via `/api/health` → `runtime: "cloudflare-pages-functions"`)
- Current live public product: SEO-focused ticket comparison affiliate build with factual artist pages, verified Ticketmaster CTAs, and hidden SeatGeek/Vivid Seats CTAs.
- Current local product state: matches the deployed SEO affiliate build.
- Intended product direction: SEO-focused ticket comparison affiliate site with factual artist/tour pages and verified provider buttons for Ticketmaster, SeatGeek, and Vivid Seats.

## Current Architecture

- Frontend: static assets in `public/`.
- Cloudflare Pages Functions: `functions/`.
- Production deploy: merges to `main` trigger automatic Cloudflare Pages deployments via Git integration (confirmed 2026-05-11). `npm run deploy:pages` can be used for out-of-band manual deploys.
- Vercel preview support: `api/` and `vercel.json` — not production; present as legacy artifacts.
- D1 storage is used for demand capture and analytics through binding `DEMAND_DB`.

Keep these paths aligned when implementing product changes:

- Browser/static UI in `public/`.
- Pages Function routing and APIs in `functions/`.
- Shared page metadata (titles, descriptions, H1s) in `functions/_route-metadata.js`.
- Route-specific HTML is injected server-side by `functions/[[path]].js` so non-JS users and crawlers see the correct H1/body content for each public route.

## Current Public Routes

Current canonical route strategy:

- `/artists`
- `/artists/[artist-slug]`
- `/artists/[artist-slug]/tickets` redirects to `/artists/[artist-slug]`
- `/artists/[artist-slug]/[tour-slug]` is supported only when verified tour records exist; no tour pages are currently published.
- `/guides`
- `/guides/[guide-slug]`

Current guide routes:

- `/guides/how-to-compare-concert-ticket-prices`
- `/guides/ticketmaster-vs-seatgeek-vs-vivid-seats`
- `/guides/how-to-avoid-overpaying-for-concert-tickets`
- `/guides/when-is-the-best-time-to-buy-concert-tickets`
- `/guides/primary-vs-resale-concert-tickets`

Old guide routes redirect to the nearest new canonical guide route. Old root-level artist routes such as `/beyonce`, `/beyonce-tickets`, and `/beyonce-tickets-london` redirect to canonical `/artists/...` routes where appropriate. Do not revive them as canonical URLs.

## Current Indexing State

Current live indexing:

- Indexable: `/`, `/artists`, all seven `/artists/[artist-slug]` pages, `/guides`, all five `/guides/[guide-slug]` pages, and trust/legal pages.
- Redirected duplicate: `/artists/[artist-slug]/tickets`.
- Unpublished: `/artists/[artist-slug]/[tour-slug]` unless a verified tour record exists.
- Excluded: root-level legacy artist/ticket/city routes as canonicals.
- City/event pages must remain absent or noindex unless real event date, venue, and availability data is verified.
- Do not add `Event` or `MusicEvent` schema without verified event data.
- Do not create thin duplicate ticket pages.

## Current APIs

- `POST /api/signup`: stores email demand capture in D1.
- `POST /api/analytics`: stores first-party analytics in D1.
- `GET /api/out`: public CTA anchors return `302` for valid verified links.
- `POST /api/out`: backward-compatible JSON flows return `{ ok, status, redirectUrl }`.
- `GET /api/shows`: legacy/provider-data API that should not be used to publish fake inventory.
- `POST /api/click`: legacy click endpoint; prefer consolidating future outbound analytics into `/api/out` and `/api/analytics`.

Implemented `/api/out` behavior:

- Provider buttons route through `/api/out`.
- GET returns `302` for valid verified links.
- POST returns `{ ok, status, redirectUrl }` for compatible JS/API flows.
- Rejects unknown providers, unknown artists, unconfigured links, `example.com`, localhost, malformed URLs, and arbitrary open redirects.
- Tracks `outbound_click` in D1 when available; `provider_click` is also accepted by `/api/analytics`.
- Never exposes Impact credentials or tokens.

## Database And Bindings

D1 demand database:

```text
database_name: tourticketcompare-demand
database_id: 19b314b8-10f1-4504-a3bc-963f7ecbe9f6
binding: DEMAND_DB
```

Current tables:

- `email_subscribers`
- `artist_interests`
- `analytics_events`
- `rate_limits`

Latest migration:

- `migrations/0002_analytics_click_fields.sql` adds `provider`, `tour_slug`, `destination_host`, and `link_id` to `analytics_events`.
- Applied remotely to D1 database `tourticketcompare-demand` on 2026-05-01.

Live Pages bindings confirmed 2026-05-11 via `/api/health`:

- `DEMAND_DB` — active
- `IMPACT_ACCOUNT_SID` — active
- `IMPACT_AUTH_TOKEN` — active
- `IMPACT_TICKETMASTER_PROGRAM_ID` — active
- `MOCK_MODE=false`, `ALLOW_MOCK_PRICES=false`, `CLICK_TRACKING_ENABLED=true` confirmed

Do not expose secrets in public HTML, JavaScript, CSS, JSON, logs, or docs.

## Provider And Affiliate Status

Intended providers:

- Ticketmaster
- SeatGeek
- Vivid Seats

Current live verified provider status:

- Ticketmaster artist-level affiliate links are configured server-side in `functions/api/out.js`.
- Public UI displays Ticketmaster buttons for the seven verified artists through `/api/out`.
- SeatGeek and Vivid Seats remain hidden on artist pages until verified links are configured.

Approved Ticketmaster artist links:

- Beyoncé: `https://ticketmaster.evyy.net/beyonce`
- Harry Styles: `https://ticketmaster.evyy.net/vD4B5y`
- BTS: `https://ticketmaster.evyy.net/OY9gkr`
- Ariana Grande: `https://ticketmaster.evyy.net/bkDx6b`
- Bad Bunny: `https://ticketmaster.evyy.net/zzeEWW`
- Morgan Wallen: `https://ticketmaster.evyy.net/morganwallenus`
- JAY-Z: `https://ticketmaster.evyy.net/5kM6W3`

Provider button rules:

- Show a provider button only when the provider has a verified destination URL.
- Hide SeatGeek and Vivid Seats until their links are verified.
- Do not show placeholder, disabled, or fake provider buttons.
- Do not claim "cheapest", "best price", "best deal", live prices, or live comparison unless verified live data supports it.

## Current Limitations

- SeatGeek and Vivid Seats are intended providers but not yet verified for public CTAs.
- No live prices are available.
- No verified event-level dates, venues, city pages, or tour pages are available.
- No Event/MusicEvent schema should be published.
- Email sending, CRM sync, and newsletter automation are not implemented.

## Latest Validation

Live checks confirmed 2026-05-11:

- `/api/health` → `runtime: "cloudflare-pages-functions"`, all bindings active, mockMode/allowMockPrices false.
- `https://tourticketcompare.com/` — correct title and canonical.
- `https://tourticketcompare.com/artists/beyonce` — correct title and canonical.
- `https://tourticketcompare.com/guides/how-to-compare-concert-ticket-prices` — correct title and canonical.
- `/api/out?artistSlug=beyonce&provider=ticketmaster` → 302 to `ticketmaster.evyy.net/beyonce`.
- Unknown routes → 404 + noindex.
- Sitemap → 20 URLs.
- `www.tourticketcompare.com` → 301 → apex (path-preserving).

See `docs/LIVE_PRODUCTION_VERIFICATION.md` for the full checklist and remaining unchecked routes.

## Exact Next Recommended Build Steps

1. Complete remaining live smoke checks: six artist pages, four guide pages, five trust pages, old guide redirect slugs, D1 analytics write confirmation.
3. Add verified SeatGeek and Vivid Seats provider links only after destination and attribution behavior are proven.
4. Add tour records only when source-backed tour facts exist.
5. Add event/city pages only when real event date, venue, and availability data is verified.
6. Repeat live smoke checks after every production deploy.

## Known Risks

- `impactDefaultProgramId` reports `false` in `/api/health`; confirm whether this binding is needed for any active feature.
- Ticketmaster affiliate links are approved for use, but SeatGeek and Vivid Seats still need verified link data before public buttons.
- Any future factual artist/tour claims need source URLs or public verification.
- Thin duplicate ticket pages or old root-level artist URLs could damage SEO if reintroduced as canonicals.
- Publishing prices without verified provider data and timestamps would violate the product safety rules.
- `vercel.json` and `api/` are present as legacy artifacts; do not accidentally deploy to Vercel.
- `scripts/build-standalone-worker.mjs` is present as an emergency rollback reference; it is not part of the normal production deploy path.

## Do Not Do

- Do not invent artist facts.
- Do not invent tour dates.
- Do not invent ticket availability.
- Do not show fake prices.
- Do not expose affiliate credentials.
- Do not index thin or duplicate pages.
- Do not add provider buttons without verified URLs.
- Do not revive old root-level artist routes as canonicals.
- Do not add Event or MusicEvent schema without verified event data.
- Do not rebuild or upload the standalone Worker as a normal production deploy step — Pages is production.
