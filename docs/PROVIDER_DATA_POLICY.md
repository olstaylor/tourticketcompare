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
Ticketmaster artist affiliate links are managed server-side in `/api/out` (`VERIFIED_TICKET_LINKS`). They use the `ticketmaster.evyy.net` affiliate domain. These are approved for the seven currently configured artists only.

**Daily API cap:**
`TICKETMASTER_DAILY_CAP` (default 1000) limits Discovery API calls per day. Stale cached data is served when the cap is hit.

---

## SeatGeek

**Role:** Intended future provider. Not yet live.

**Current status:** SeatGeek buttons are hidden on all artist pages. No verified SeatGeek destination URLs are configured. `/api/out` rejects SeatGeek provider requests with `provider_not_configured`.

**When SeatGeek buttons may be enabled:**
- A verified SeatGeek destination URL (not a placeholder) exists for the artist or event.
- The link has been reviewed and added to `/api/out`'s `VERIFIED_TICKET_LINKS` or to `events.json`.
- The destination host is `seatgeek.com` (currently the only allowlisted SeatGeek host).

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
- SeatGeek and Vivid Seats return `status: unavailable` in all non-mock scenarios because no approved live price feeds are configured.
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
