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
- Providing artist-level and event-level ticket links (via `/api/out` using approved affiliate URLs)
- Populating event show cards with date, venue, and city information

**What Ticketmaster data cannot be used for:**
- Public price display, unless `TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED=true` and the price data is confirmed displayable
- "Lowest price from Ticketmaster" or equivalent claims unless live, timestamped, approved price data is shown

**Affiliate links:**
Ticketmaster artist affiliate links are managed server-side in `/api/out` (`VERIFIED_TICKET_LINKS`). Two URL shapes are valid for the `redirectUrl` field:

1. **Plain `https://www.ticketmaster.com/...` URLs** (preferred for new entries). The site-wide Impact Publisher Tag (`public/impact.js`, which calls `impactStat('transformLinks')` on every page) transforms eligible Ticketmaster anchors client-side at load time and attributes the click through the Ticketmaster Impact account. No pre-minted shortlink is required.
2. **`https://ticketmaster.evyy.net/<code>` Impact shortlinks**, manually minted in the Impact dashboard. The seven currently configured artists use this shape for historical reasons. New entries do not need to follow it.

Both shapes pass `validateConfiguredRedirect` in `functions/api/out.js` because `ticketmaster.com` is in `PROVIDERS.ticketmaster.allowedDestinationHosts` and `ticketmaster.evyy.net` is in `trustedAffiliateHosts`.

Do not confuse Publisher Tag transformation with manually generated Impact shortlinks: they are two separate mechanisms. A new artist can be added to `VERIFIED_TICKET_LINKS` as soon as a verified plain Ticketmaster URL is available — minting an Impact shortlink is not a prerequisite. As always, do not invent URLs: only use a Ticketmaster URL that has been confirmed from the Ticketmaster API or another trusted source.

**Daily API cap:**
`TICKETMASTER_DAILY_CAP` (default 1000) limits Discovery API calls per day. Stale cached data is served when the cap is hit.

---

## SeatGeek

**Role:** Live secondary marketplace provider. Event-level only.

**Current status:** Configured and live in production. The Impact SeatGeek bindings (`IMPACT_SEATGEEK_ACCOUNT_SID`, `IMPACT_SEATGEEK_AUTH_TOKEN`, `IMPACT_SEATGEEK_PROGRAM_ID`) are present (confirmed via `/api/health`). `/api/out` resolves `provider=seatgeek` from a verified event-level `seatgeek_url`, validates it (HTTPS, host `seatgeek.com`, event path pattern `/(concert|sports|theater|theatre)/<id>`), wraps it in Impact tracking, and returns a 302 redirect. The "Check SeatGeek" CTA renders as a secondary button on event cards that carry a verified `seatgeek_url` when the SeatGeek Impact config is present.

When the SeatGeek Impact config is absent, `/api/out` fails safely with `impact_missing_credentials` / `impact_missing_program_id` (not a redirect), and the CTA does not render.

**Constraints (unchanged):**
- **Event-level only.** SeatGeek destinations come from a verified `seatgeek_url` in `events.json`; there are no artist-level SeatGeek entries in `/api/out`'s `VERIFIED_TICKET_LINKS`.
- The destination host is `seatgeek.com` (the only allowlisted SeatGeek host). Generic search/artist/venue/performer URLs are rejected.
- **SeatGeek price snapshots are default-off and display-only.** SeatGeek price data may be used only as a SeatGeek-only, provider-attributed latest snapshot after written SeatGeek display permission has been confirmed, sourced from the approved SeatGeek partner API only, gated by `SEATGEEK_PRICE_DISPLAY_ENABLED=true`, tied to an event with a valid verified `seatgeek_url`, loaded from a cached row with `source='seatgeek_partner_api'`, timestamped, and hidden when stale. Do not scrape, invent, manually enter, compare across providers, or make "cheapest", "lowest", "best deal", "savings", "price guarantee", or "real-time cheapest" claims.

---

## Vivid Seats

**Role:** Intended future provider. Not yet live.

**Current status:** Vivid Seats buttons are hidden on all artist pages. No verified Vivid Seats destination URLs are configured. `/api/out` rejects Vivid Seats provider requests with `provider_not_configured`.

**When Vivid Seats buttons may be enabled:**
- Same conditions as SeatGeek: verified destination URL, reviewed and added to `/api/out`, destination host is `vividseats.com`.

---

## Impact Affiliate Network

**Role:** Affiliate tracking and link generation for approved providers.

**Server-side only.** `IMPACT_ACCOUNT_SID` and `IMPACT_AUTH_TOKEN` are secrets; they must never appear in public HTML, JavaScript, JSON, or documentation.

**What Impact integration does:**
- Generates tracking URLs via `POST /Mediapartners/{AccountSID}/Programs/{ProgramId}/TrackingLinks`
- Used in `/api/out` to wrap verified event deep links with Impact tracking
- Click tracking falls back safely if Impact credentials are missing or the API call fails

**What Impact approval does NOT grant:**
- Permission to ingest or publicly display provider pricing data
- Permission to claim price comparison unless an approved feed explicitly supplies displayable pricing

**Ticketmaster is an event-verification and link source, not a price source.** Do not present Ticketmaster data as a price or as a price comparison.

**Catalog capability flags are inert metadata.** The `pricing_type`, `supports_pricing`, `price_aggregation`, and `real_time_inventory` fields in `public/data/catalog.json` describe what a provider's API *could* do — they do **not** mean prices are displayed. Public price display is gated solely by `TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED` / `SEATGEEK_PRICE_DISPLAY_ENABLED` (both OFF) and, for SeatGeek, the written-permission conditions above. Never read these flags as authorization to show prices.

**Impact credentials required for:**
- `GET /api/impact/health` to return `ok: true`
- `GET /api/impact/products` to return product feed data
- `POST /api/impact/tracking-links` to generate tracking URLs

**Missing credentials behaviour:**
- `/api/impact/*` returns a safe `missing_credentials` response
- `/api/out` falls back to the configured `redirectUrl` directly (no Impact wrapping) and still redirects safely

---

## `/api/shows` Price Display Rules

`GET /api/shows` supports an optional `includePrices=true` parameter, subject to these rules:

- `includePrices=true` requires a `showId` parameter. Bulk price fan-out to providers is not permitted.
- `MOCK_MODE` and `ALLOW_MOCK_PRICES` must both be `false` in production. Mock prices must never be displayed to users.
- `TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED` must be `true` and a valid `TICKETMASTER_API_KEY` must be configured for live Ticketmaster price lookups.
- SeatGeek returns `status: unavailable` unless `SEATGEEK_PRICE_DISPLAY_ENABLED=true` and a fresh D1 `provider_pricing_cache` row exists for the local event ID with `provider='seatgeek'`, `source='seatgeek_partner_api'`, a valid timestamp, an unexpired `expires_at`, a finite non-negative `low_price`, and a currency.
- Vivid Seats returns `status: unavailable` in all non-mock scenarios because no approved live price feed is configured.
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
