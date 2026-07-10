# TourTicketCompare Provider Data Policy

This document defines how TourTicketCompare uses data from ticket providers, affiliate networks, and external APIs.

---

## Safe Model

> Verified ticket links first. Provider-specific price information only where an approved provider feed explicitly permits public display and usage rights are confirmed. Final prices, fees, availability, delivery terms, and checkout terms are always confirmed by the ticket provider.

---

## Ticketmaster

**Role:** Official event verification source and official ticket link source.

**What Ticketmaster data can be used for:**
- Verifying that an event exists (via Ticketmaster Discovery API, with `TICKETMASTER_API_KEY`)
- Providing artist-level and event-level ticket links (via `/api/out` using verified plain, unmonetized Ticketmaster destinations)
- Populating event show cards with date, venue, and city information

**What Ticketmaster data cannot be used for:**
- Public price display, unless `TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED=true` and the price data is confirmed displayable
- "Lowest price from Ticketmaster" or equivalent claims unless live, timestamped, approved price data is shown

**Affiliate status: none (plain links only).**
The site was removed from the Ticketmaster affiliate programme. All Ticketmaster links — artist-level entries in `/api/out` (`VERIFIED_TICKET_LINKS`) and event-level `ticketmaster_url` redirects — are plain, unmonetized `https://www.ticketmaster.com/...` URLs. There is no Impact Publisher Tag (`public/impact.js` was removed), no `ticketmaster.evyy.net` shortlinks, and `/api/out` never calls the Impact API for a Ticketmaster redirect.

Only plain `ticketmaster.com` (and allowlisted country-TLD) URLs pass `validateConfiguredRedirect` in `functions/api/out.js`; `PROVIDERS.ticketmaster.trustedAffiliateHosts` is empty. As always, do not invent URLs: only use a Ticketmaster URL that has been confirmed from the Ticketmaster API or another trusted source.

**Daily API cap:**
`TICKETMASTER_DAILY_CAP` (default 1000) limits Discovery API calls per day. Stale cached data is served when the cap is hit.

---

## SeatGeek

**Role:** Primary affiliate provider (Impact network). Artist-level and event-level.

**Current status (2026-07-09):** Live in production as the **primary CTA**. The Impact SeatGeek bindings (`IMPACT_SEATGEEK_ACCOUNT_SID`, `IMPACT_SEATGEEK_AUTH_TOKEN`, `IMPACT_SEATGEEK_PROGRAM_ID`/`_CAMPAIGN_ID`, optional `IMPACT_SEATGEEK_BASE_TRACKING_URL`) are present. Two lanes:

1. **Event-level:** `/api/out?showId=<id>&provider=seatgeek` resolves the verified event-level `seatgeek_url`, validates it (HTTPS, host `seatgeek.com`, event path pattern `/(concert|sports|theater|theatre)/<id>`), wraps it in Impact tracking, and 302s. The "Check SeatGeek" CTA renders as the primary button on publishable event cards; it may render **standalone** (a publishable Ticketmaster URL is no longer required on the same card). On a `needs_recheck` event it renders only when the SeatGeek link carries its own verified provenance (`provider_links.seatgeek.verified === true`).
2. **Artist-level:** `/api/out?artistSlug=<slug>&provider=seatgeek` resolves the `<slug>:seatgeek` entry in `VERIFIED_TICKET_LINKS`. Destinations are performer-page URLs **captured from the SeatGeek `/2/performers/{id}` API record for the registry-verified `seatgeek_performer_id`** (stored as `seatgeek_artist_url` in `data/provider-identities.json`) — never constructed from names, and browser-verified by the owner before merge. Artist-level clicks are Impact-wrapped exactly like the event lane.

When the SeatGeek Impact config is absent, `/api/out` fails safely with `provider_not_configured` / `impact_missing_credentials` (JSON, not a redirect), and no SeatGeek CTA renders anywhere.

**Approved public display rights (confirmed 2026-07-09):**
- **Ticket links/CTAs:** approved for public display through verified SeatGeek destinations and server-side Impact wrapping.
- **Lowest/listing price:** not approved for public display today. May be shown only after separate written SeatGeek display permission is stored/confirmed, `SEATGEEK_PRICE_DISPLAY_ENABLED=true`, and the `/api/shows` cache/source/freshness gates pass.
- **Fees/final checkout total:** not approved for public display from TourTicketCompare data. Users must confirm fees and final totals on SeatGeek.
- **Inventory/availability counts:** not approved for public display today, even if an internal cache row contains `inventory_count`; do not say tickets are available, sold out, limited, or scarce from SeatGeek inventory data.
- **Trend/history data:** not approved for public display today; do not publish price movement, demand, savings, or trend claims.
- **Comparisons/rankings:** not approved. Do not compare SeatGeek against another provider or use "cheapest", "lowest", "best deal", "savings", ranking, or winner language unless separate written comparison rights are obtained.

**Constraints:**
- The destination host is `seatgeek.com` (the only allowlisted SeatGeek host). Generic search/venue URLs are rejected on the event lane; the artist lane accepts only the hand-verified performer-page constants in `VERIFIED_TICKET_LINKS`.
- **SeatGeek price snapshots are default-off and display-only.** SeatGeek price data may be used only as a SeatGeek-only, provider-attributed latest snapshot after written SeatGeek display permission has been confirmed, sourced from the approved SeatGeek partner API only, gated by `SEATGEEK_PRICE_DISPLAY_ENABLED=true`, tied to an event with a valid verified `seatgeek_url`, loaded from a cached row with `source='seatgeek_partner_api'`, timestamped, and hidden when stale. Do not scrape, invent, manually enter, compare across providers, or make "cheapest", "lowest", "best deal", "savings", "price guarantee", or "real-time cheapest" claims.

---

## Vivid Seats

**Role:** Second affiliate provider (Impact network, approved), live for verified event-level links.

**Current status (2026-07-10):** Event-level Vivid Seats CTAs are live. The reviewed data set contains 218 `vividseats_url` destinations with matching `provider_links["vivid-seats"].verified === true` provenance and a strict `/production/<numeric id>` URL shape. Runtime Impact configuration remains mandatory; `/api/out` returns diagnostic JSON rather than an untracked redirect when configuration or tracking fails. Artist-level `VERIFIED_TICKET_LINKS` support exists in code, but no artist-level Vivid Seats entries are configured. The sync workflow is manual-dispatch-only until its commented nightly cron is explicitly enabled.

**Approved public display rights (confirmed 2026-07-09):**
- **Ticket links/CTAs:** approved and live for event records that pass the per-event provenance, URL-shape, runtime configuration, and redirect gates.
- **Lowest/listing price:** not approved for public display today. The client supports a gated provider-attributed lane, but `VIVIDSEATS_PRICE_DISPLAY_ENABLED` must remain default-off. Enabling it additionally requires separate written display permission and a fresh cached row with `source='vividseats_approved_feed'`.
- **Fees/final checkout total:** not approved for public display from TourTicketCompare data. Users must confirm fees and final totals on Vivid Seats.
- **Inventory/availability counts:** not approved for public display today, even if an internal cache row contains `inventory_count`; do not say tickets are available, sold out, limited, or scarce from Vivid Seats inventory data.
- **Trend/history data:** not approved for public display today; do not publish price movement, demand, savings, or trend claims.
- **Comparisons/rankings:** not approved. Do not compare Vivid Seats against another provider or use "cheapest", "lowest", "best deal", "savings", ranking, or winner language unless separate written comparison rights are obtained.

**Remaining operational work:**
1. Keep the verified event data and runtime Impact configuration healthy; a tracking failure must continue to return diagnostic JSON, never an untracked redirect.
2. Enable and monitor the commented `vividseats-cta-sync.yml` nightly cron only after owner approval.
3. Treat artist-level Vivid Seats entries as separate scope.
4. Keep `VIVIDSEATS_PRICE_DISPLAY_ENABLED=false` until separate written price-display rights exist.

---

## Impact Affiliate Network

**Role:** Affiliate tracking and link generation for approved providers.

**Server-side only.** `IMPACT_ACCOUNT_SID` and `IMPACT_AUTH_TOKEN` are secrets; they must never appear in public HTML, JavaScript, JSON, or documentation.

**What Impact integration does:**
- Generates tracking URLs via `POST /Mediapartners/{AccountSID}/Programs/{ProgramId}/TrackingLinks`
- Used in `/api/out` to wrap verified event deep links with Impact tracking
- Affiliate redirects fail closed when Impact tracking credentials are missing or the API call fails; no untracked affiliate redirect is emitted

**What Impact approval does NOT grant:**
- Permission to ingest or publicly display provider pricing data
- Permission to claim price comparison unless an approved feed explicitly supplies displayable pricing

**Ticketmaster is an event-verification and link source, not a price source.** Do not present Ticketmaster data as a price or as a price comparison.

**Catalog capability flags are inert metadata.** The `pricing_type`, `supports_pricing`, `price_aggregation`, and `real_time_inventory` fields in `public/data/catalog.json` describe what a provider's API *could* do — they do **not** mean prices are displayed. Public price display is gated solely by `TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED` / `SEATGEEK_PRICE_DISPLAY_ENABLED` / `VIVIDSEATS_PRICE_DISPLAY_ENABLED` (all OFF by default) and, for SeatGeek, the written-permission conditions above. Never read these flags as authorization to show prices.

**Impact credentials required for:**
- `GET /api/impact/health` to return `ok: true`
- `GET /api/impact/products` to return product feed data
- `POST /api/impact/tracking-links` to generate tracking URLs

**Missing credentials behaviour:**
- `/api/impact/*` returns a safe `missing_credentials` response
- `/api/out` returns diagnostic JSON for SeatGeek/Vivid Seats when Impact tracking is unavailable; it never emits an untracked affiliate redirect. Plain Ticketmaster links remain direct because Ticketmaster is not an affiliate provider.

---

## `/api/shows` Price Display Rules

`GET /api/shows` supports an optional `includePrices=true` parameter, subject to these rules:

- `includePrices=true` requires a `showId` parameter. Bulk price fan-out to providers is not permitted.
- `MOCK_MODE` and `ALLOW_MOCK_PRICES` must both be `false` in production. Mock prices must never be displayed to users.
- `TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED` must be `true` and a valid `TICKETMASTER_API_KEY` must be configured for live Ticketmaster price lookups.
- SeatGeek returns `status: unavailable` unless `SEATGEEK_PRICE_DISPLAY_ENABLED=true`, the event has a valid verified `seatgeek_url`, and a fresh D1 `provider_pricing_cache` row exists for the local event ID with `provider='seatgeek'`, `source='seatgeek_partner_api'`, a valid timestamp, an unexpired `expires_at`, a finite non-negative `low_price`, and a currency.
- Vivid Seats returns `status: unavailable` unless `VIVIDSEATS_PRICE_DISPLAY_ENABLED=true`, the event has a valid verified `vividseats_url`, and a fresh D1 `provider_pricing_cache` row exists for the local event ID with `provider='vividseats'`, `source='vividseats_approved_feed'`, a valid timestamp, an unexpired `expires_at`, a finite non-negative `low_price`, and a currency. Because no Vivid Seats price-display rights are confirmed today, this flag must remain default-off.
- Price results include `fetchedAt` timestamps. Do not display prices without showing or conveying freshness.

---

## Placeholder URL Rejection

The following URL patterns are rejected by `/api/out` and `/api/shows`:

- `example.com`
- `your-affiliate-link`
- `your-link-here`
- `replace-me`
- `placeholder`
- `tbd`
- `localhost` and `127.0.0.1`
- RFC 1918 private IP ranges

Any provider URL containing these patterns must not appear as a public CTA.

---

## Adding a New Provider

To add a new provider safely:

1. Confirm the provider has a verified destination URL (not a placeholder).
2. Add the provider's allowlisted destination hosts to `PROVIDERS` in `functions/api/out.js`.
3. Add the verified artist or event link to `VERIFIED_TICKET_LINKS` in `out.js` (for artist-level links) or to the event record in `events.json` (for event-level links).
4. Confirm affiliate handling (Impact or direct) is configured server-side.
5. Rebuild and deploy the standalone Worker if this is a production change.
6. Run smoke checks and verify the new provider buttons appear only for the intended artists/events.
7. Do not enable buttons for artists or events where the destination is not verified.

