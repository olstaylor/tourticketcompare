# TourTicketCompare Handover

Use this file for the current working state only. Historical MVP, prelaunch, CRO, and route experiments have been moved to `docs/history.md`.

## Current Live State

- Live URL: `https://tourticketcompare.com`
- `www` URL: `https://www.tourticketcompare.com` redirects to apex.
- Current live deployment target: Cloudflare Worker `tourticketcompare-live`.
- Current live public product: SEO-focused ticket comparison affiliate build with factual artist pages, verified Ticketmaster CTAs, and hidden SeatGeek/Vivid Seats CTAs.
- Current local product state: matches the deployed SEO affiliate build.
- Intended product direction: SEO-focused ticket comparison affiliate site with factual artist/tour pages and verified provider buttons for Ticketmaster, SeatGeek, and Vivid Seats.

Deployment note: Worker `tourticketcompare-live` was updated on 2026-05-01 with standalone Worker build `d3cc71487403`. Live smoke checks passed after deployment.

## Current Architecture

- Frontend: static assets in `public/`.
- Cloudflare Pages Functions: `functions/`.
- Standalone Worker generator: `scripts/build-standalone-worker.mjs`.
- Vercel preview support: `api/` and `vercel.json`.
- Production custom domain is currently served by the standalone Worker, not by a direct Pages deploy.
- D1 storage is used for demand capture and analytics through binding `DEMAND_DB`.

Keep these paths aligned when implementing product changes:

- Browser/static UI in `public/`.
- Pages Function routing and APIs in `functions/`.
- Production Worker generation in `scripts/build-standalone-worker.mjs`.
- Route-specific HTML fallbacks are injected server-side so non-JS users and crawlers see the correct H1/body content for each public route.

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

Live Worker bindings confirmed after deploy:

- `DEMAND_DB`
- `IMPACT_ACCOUNT_SID` as secret
- `IMPACT_AUTH_TOKEN` as secret
- `MOCK_MODE=false`
- `ALLOW_MOCK_PRICES=false`

Do not expose secrets in public HTML, JavaScript, CSS, JSON, logs, or docs.

## Provider And Affiliate Status

Intended providers:

- Ticketmaster
- SeatGeek
- Vivid Seats

Current live verified provider status:

- Ticketmaster artist-level affiliate links are configured server-side in `/api/out` and the standalone Worker generator.
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

Passed locally on 2026-05-01:

- `node scripts/smoke-prelaunch.mjs`
- `node scripts/build-standalone-worker.mjs /tmp/tourticketcompare-worker.js`
- `node --check /tmp/tourticketcompare-worker.js`
- `node --check public/app.js`
- `node --check functions/api/out.js`

Generated Worker build:

- Build ID: `d3cc71487403`
- Output: `/tmp/tourticketcompare-worker.js`
- Deployed to Worker: `tourticketcompare-live`
- Worker upload ETag: `c42497469d7011fd2daad8a01bbb9ee737de7db9d049c3a7b278777825b739ec`

Live smoke checks passed on 2026-05-01:

- `/`, `/artists`, `/artists/beyonce`, `/guides`, `/guides/ticketmaster-vs-seatgeek-vs-vivid-seats`, `/how-it-works`, `/sitemap.xml`, and `/robots.txt` returned `200`.
- Seven artist pages and five guide pages return `index,follow,max-image-preview:large` with canonical URLs.
- Served HTML now includes route-specific H1/body content for `/artists`, artist pages, `/guides`, guide pages, `/how-it-works`, `/about`, `/contact`, `/editorial-policy`, and `/affiliate-disclosure`.
- Unknown non-asset routes return a useful `404` page with `noindex,follow`.
- `www.tourticketcompare.com` redirects to `https://tourticketcompare.com/`.
- `/artists/beyonce/tickets`, `/beyonce-tickets-london`, and the old guide slug redirect to canonical URLs.
- `/api/out` returns the expected Ticketmaster `302` for all seven artists.
- `/api/out` rejects unconfigured SeatGeek, `example.com` deep links, and unknown artist/provider requests with `400`.
- Sitemap contains 20 intended URLs only: homepage, `/artists`, `/guides`, trust pages, five guide pages, and seven artist pages.
- Public `/app.js`, `/styles.css`, `/data/catalog.json`, `/data/artists.json`, `/data/events.json`, and `/data/events-index.json` contain no raw Ticketmaster affiliate URLs, `example.com`, fake price strings, unsupported "cheapest/best price/best deal/sold out/lowest price/guaranteed" claims, or `MusicEvent`.
- In-app browser QA passed for `/`, `/artists`, `/artists/beyonce`, and `/guides/when-is-the-best-time-to-buy-concert-tickets`: route-specific visible headings render, mobile-width menu works, artist CTA anchors use `/api/out`, raw affiliate anchors are absent, and site console errors are zero.
- D1 analytics confirmed recent `outbound_click` rows for all seven Ticketmaster artist tests with `provider`, `artist_slug`, `source_path`, `destination_host`, `link_id`, and `created_at`.

## Exact Next Recommended Build Steps

1. Add verified SeatGeek and Vivid Seats provider links only after destination and attribution behavior are proven.
2. Add tour records only when source-backed tour facts exist.
3. Add event/city pages only when real event date, venue, and availability data is verified.
4. If future code changes affect public routes, update `public/`, `functions/`, and `scripts/build-standalone-worker.mjs` together, then rebuild and deploy Worker `tourticketcompare-live`.
5. Repeat live smoke checks after every Worker deploy.

## Known Risks

- The repo has mixed Cloudflare Pages, standalone Worker, and Vercel preview paths; production will drift if only one path is updated.
- Historical docs and code comments may still mention old MVP states; use `README.md` as the source of truth.
- Ticketmaster affiliate links are approved for use, but SeatGeek and Vivid Seats still need verified link data before public buttons.
- Any future factual artist/tour claims need source URLs or public verification.
- Thin duplicate ticket pages or old root-level artist URLs could damage SEO if reintroduced as canonicals.
- Publishing prices without verified provider data and timestamps would violate the product safety rules.

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
