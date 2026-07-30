# TourTicketCompare Provider Data Policy

This document defines how TourTicketCompare uses data from ticket providers, affiliate networks, and external APIs.

---

## Safe Model

> Verified ticket links first. Approved provider price snapshots may be displayed and retained only when the provider's rights, exact-event mapping, feature flags, source, and freshness gates all pass. Final prices, fees, availability, delivery terms, and checkout terms are always confirmed by the ticket provider.

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

**Operational model:** SeatGeek is an approved affiliate provider at artist and event level.

1. **Event-level:** `/api/out?showId=<id>&provider=seatgeek` resolves a verified event URL, enforces the SeatGeek event-path/host rules, wraps it server-side through Impact, and redirects. On a `needs_recheck` event the SeatGeek CTA requires its own verified provenance.
2. **Artist-level:** `/api/out?artistSlug=<slug>&provider=seatgeek` resolves a protected `VERIFIED_TICKET_LINKS` entry. The destination must be the performer-page URL captured from the SeatGeek API for the registry-verified performer ID and browser-verified before merge; never construct it from a name.

When runtime Impact configuration is absent or tracking generation fails, `/api/out` returns diagnostic JSON and no SeatGeek CTA renders. Current coverage and runtime activation are recorded in `PROJECT_STATUS.md`.

**Approved public display rights:**
- **Ticket links/CTAs:** approved for public display through verified SeatGeek destinations and server-side Impact wrapping.
- **Listed price:** never displayed in practice — SeatGeek has no numeric snapshot lane. Its API returns null pricing statistics for this client (owner-confirmed 2026-07-15, a permanent provider-API limitation, not a pending entitlement), so no snapshot rows are ever written. The `/api/shows` display gate (`SEATGEEK_PRICE_DISPLAY_ENABLED` plus cache/source/freshness checks) remains in place and fail-closed; it is inert. Public copy must not claim SeatGeek price snapshots while this remains true.
- **Side-by-side comparisons:** the SeatGeek/Vivid Seats comparison path remains in code but is inert for the same reason. Displayed price comparison is served by the providers with active numeric-price lanes (see `PROJECT_STATUS.md`).
- **History:** approved for archival and historical display when the provider/source attribution and observation time remain attached.
- **Fees/final checkout total:** not approved from TourTicketCompare data. Users must confirm fees and final totals on SeatGeek.
- **Inventory/availability counts:** remain prohibited; do not say tickets are available, sold out, limited, or scarce from SeatGeek inventory data.

**Constraints:**
- The destination host is `seatgeek.com` (the only allowlisted SeatGeek host). Generic search/venue URLs are rejected on the event lane; the artist lane accepts only the hand-verified performer-page constants in `VERIFIED_TICKET_LINKS`.
- **SeatGeek price snapshots could only ever go live behind their source and freshness gate.** Should SeatGeek ever ship pricing-stat access, snapshots must be sourced from the approved SeatGeek partner API, gated by `SEATGEEK_PRICE_DISPLAY_ENABLED=true`, tied to an event with a valid verified `seatgeek_url`, loaded from a cached row with `source='seatgeek_partner_api'`, timestamped, and hidden when stale. Do not scrape, invent, or manually enter prices.

---

## Vivid Seats

**Role:** Second affiliate provider (Impact network, approved), live for verified event-level links.

**Operational model:** Vivid Seats is an approved event-level Impact provider. A CTA requires a strict `/production/<numeric id>` destination, matching `provider_links["vivid-seats"]` provenance, runtime configuration, and successful server-side tracking. Artist-level entries are separate scope. Current coverage and workflow state are recorded in `PROJECT_STATUS.md`.

**Approved public display rights:**
- **Ticket links/CTAs:** approved and live for event records that pass the per-event provenance, URL-shape, runtime configuration, and redirect gates.
- **Listed price:** approved for public display from the approved Vivid Seats feed when `VIVIDSEATS_PRICE_DISPLAY_ENABLED=true` and the cache/source/freshness gates pass.
- **Machine-readable redistribution (JSON-LD `offers`):** owner-confirmed with the programme 2026-07-22. A schema.org Offer may mirror the visible snapshot under the schema-offers exception in `SAFE_PUBLISHING_RULES.md` (flag-gated, badge-mirroring, `priceValidUntil` = the row's `expires_at`, no availability).
- **Side-by-side comparisons:** approved for the same verified event with another fresh approved provider snapshot. TourTicketCompare may identify the lower listed snapshot and the price difference. (SeatGeek cannot be the other lane — it has no numeric snapshot lane.)
- **History:** approved for archival and historical display when the provider/source attribution and observation time remain attached.
- **Fees/final checkout total:** not approved from TourTicketCompare data. Users must confirm fees and final totals on Vivid Seats.
- **Inventory/availability counts:** remain prohibited; do not say tickets are available, sold out, limited, or scarce from Vivid Seats inventory data.

**Operations:** keep event provenance, runtime Impact configuration, exact-event price source, and freshness gates healthy. Tracking failures must remain diagnostic/fail-closed. Treat artist-level Vivid Seats entries as separate scope.

---

## TicketNetwork, Ticket Liquidator, and StubHub International

These are three independent provider lanes over the shared Impact Catalogs integration. StubHub International is explicitly separate from StubHub US/Canada. Current activation, coverage, and feed constraints are recorded in `PROJECT_STATUS.md`.

The implementation includes:

- `scripts/sync-impact-marketplace-events.mjs`: catalog keyword lookup for registry-verified artists, followed by exact artist/campaign and event-field validation; a candidate is written only when artist, venue, city, and venue-local date agree unambiguously. It writes only the provider's top-level event URL plus `provider_links.<provider>` event ID, URL, verification date, and listing state. Incomplete catalogs never clear a stored link.
- `/api/out`, `/api/shows`, SSR, and client rendering: provider-specific host allowlists, verified-provenance checks, server-side Impact wrapping, and separate public/display flags.
- `scripts/snapshot-impact-marketplace-prices.mjs`: cache-only display writer fed by an exact stored provider event ID. Conflicting prices or currencies are skipped.
- A manual event-sync workflow whose apply mode opens a review PR and never auto-merges. The shared snapshot workflow schedules only provider lanes with approved numeric price data; non-numeric lanes remain manual and price-disabled.

**Activation evidence and continuing runtime requirements:**

1. The verified SeatGeek-scoped Impact account exposes the exact provider campaign and catalog. A later 401/403 or campaign mismatch is a hard stop for ingestion.
2. Event links and any displayed listed-price snapshot must originate from the approved catalog feed and retain the required affiliate/provider disclosure. Catalog membership does not permit invented inventory, fees, or checkout-total claims.
3. Sample catalog event URLs and tracking redirects were browser-verified against artist, venue, city, and date. New or ambiguous matches remain withheld.
4. The public lanes default on; an explicit provider `*_PUBLIC_ENABLED=false` remains the emergency kill switch. TicketNetwork and StubHub International price display default on behind exact-ID/source/freshness/cache gates. Ticket Liquidator price display defaults off while its feed lacks numeric `CurrentPrice`.
5. **Machine-readable redistribution (JSON-LD `offers`):** owner-confirmed 2026-07-22 for **TicketNetwork and StubHub International only** — schema.org Offers may mirror their visible snapshots under the schema-offers exception in `SAFE_PUBLISHING_RULES.md` (flag-gated, badge-mirroring, `priceValidUntil` = the row's `expires_at`, no availability). Ticket Liquidator is excluded (no numeric price lane, display off), and confirmation is never inferred between StubHub International and StubHub US/Canada.

Campaign/catalog IDs and credential routing are server-side configuration and must not be copied into public or stable documentation. Verify them through the provider workflow and record only non-secret current activation in `PROJECT_STATUS.md`.

No inventory/scarcity claim, final-price claim, scraping, generic search link, cross-provider event guess, or untracked affiliate fallback is permitted.

---

## Impact Affiliate Network

**Role:** Affiliate tracking and link generation for approved providers.

**Server-side only.** `IMPACT_ACCOUNT_SID` and `IMPACT_AUTH_TOKEN` are secrets; they must never appear in public HTML, JavaScript, JSON, or documentation.

**What Impact integration does:**
- Generates tracking URLs via `POST /Mediapartners/{AccountSID}/Programs/{ProgramId}/TrackingLinks`
- Used in `/api/out` to wrap verified event deep links with Impact tracking
- Affiliate redirects fail closed when Impact tracking credentials are missing or the API call fails; no untracked affiliate redirect is emitted

**What Impact approval does NOT grant:**
- Blanket permission to invent prices, omit attribution, or compare mismatched or stale events
- Permission to present provider snapshot prices as final checkout totals

**Ticketmaster is an event-verification and link source, not a price source.** Do not present Ticketmaster data as a price or as a price comparison.

**Catalog capability flags are inert metadata.** The `pricing_type`, `supports_pricing`, `price_aggregation`, and `real_time_inventory` fields in `public/data/catalog.json` describe what a provider's API *could* do — they do **not** substitute for runtime gates. Every provider display requires its enabled feature flags plus the approved source, verified event URL, exact-event mapping, timestamps, and unexpired cache rows.

**Impact credentials required for:**
- `GET /api/impact/health` to report credential presence (it does not claim live Catalogs access without a probe)
- `GET /api/impact/catalogs` and `GET /api/impact/products` to return Catalogs API data; both default to current API v16 and can safely probe the provider-specific SeatGeek credentials with `credentialSet=seatgeek`
- `POST /api/impact/tracking-links` to generate tracking URLs

**`/api/impact/*` is operator-only and token-gated.** These routes spend the site's Impact publisher credentials on the caller's behalf: the catalog readers proxy provider price and inventory data outside every display gate, and `tracking-links` performs a real write against the Impact account. All four require the shared bearer token — `Authorization: Bearer <token>` or an `x-ttc-impact-token` header — matched against the `IMPACT_DIAGNOSTICS_TOKEN` Pages secret. They fail closed:

- An absent or wrong token returns `404 {"status":"not_found"}`, the same answer an unrouted path gives, so the routes do not advertise themselves.
- An **unset** `IMPACT_DIAGNOSTICS_TOKEN` keeps them closed. A missing secret must never mean "open to everyone".
- The scheduled provider-sync and price-snapshot workflows reach `/api/impact/products` through `IMPACT_CATALOG_PROXY_URL`; they authenticate with the `IMPACT_CATALOG_PROXY_TOKEN` GitHub secret, which must hold the same value as `IMPACT_DIAGNOSTICS_TOKEN`. If the two drift, catalog reads return 404 and the sync reports a failed run rather than writing anything.

**Missing credentials behaviour:**
- `/api/impact/*` returns a safe `missing_credentials` response to an authorized caller (an unauthorized one gets the 404 above)
- `/api/out` returns diagnostic JSON for Impact affiliate providers when tracking is unavailable; it never emits an untracked affiliate redirect. The three new providers additionally return `provider_not_configured` unless their provider-specific public flag is true. Plain Ticketmaster links remain direct because Ticketmaster is not an affiliate provider.

---

## `/api/shows` Price Display Rules

`GET /api/shows` supports an optional `includePrices=true` parameter, subject to these rules:

- `includePrices=true` requires a `showId` parameter, **except** when `priceProviders=approved-marketplaces` is also set. Bulk price fan-out to provider APIs is not permitted in any mode; the approved-marketplaces exception (added 2026-07-12 so boards can show snapshots for every eligible show) is safe because those lanes are served exclusively from the D1 `provider_pricing_cache` written by the scheduled snapshot workflows — a list request performs a batched cache read and never calls an external provider API. Ticketmaster and any live-lookup lane remain single-`showId` only.
- `MOCK_MODE` and `ALLOW_MOCK_PRICES` must both be `false` in production. Mock prices must never be displayed to users.
- `TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED` must be `true` and a valid `TICKETMASTER_API_KEY` must be configured for live Ticketmaster price lookups.
- SeatGeek returns `status: unavailable` unless `SEATGEEK_PRICE_DISPLAY_ENABLED=true`, `provider_links.seatgeek.verified === true`, the verified provider URL matches the event's `seatgeek_url`, and a fresh D1 `provider_pricing_cache` row exists for the local event ID with `provider='seatgeek'`, `source='seatgeek_partner_api'`, a valid timestamp, an unexpired `expires_at`, a finite non-negative `low_price`, and a currency.
- Vivid Seats returns `status: unavailable` unless `VIVIDSEATS_PRICE_DISPLAY_ENABLED=true`, `provider_links.vividseats.verified === true`, the verified provider URL matches the event's `vividseats_url`, and a fresh D1 `provider_pricing_cache` row exists for the local event ID with `provider='vivid-seats'`, `source='vividseats_impact_marketplace_api'`, a valid timestamp, an unexpired `expires_at`, a finite non-negative `low_price`, and a currency.
- TicketNetwork, Ticket Liquidator, and StubHub International return `status: unavailable` unless both the provider's public flag and price-display flag are true, matching verified provider provenance exists, the URL passes that provider's host/event-page checks, and the D1 row has the exact provider slug/source (`ticketnetwork_impact_marketplace_api`, `ticketliquidator_impact_marketplace_api`, or `stubhub_international_impact_marketplace_api`) with valid timestamps, expiry, price, and currency.
- Price results include `fetchedAt` timestamps. Do not display prices without showing or conveying freshness. A side-by-side comparison additionally requires two fresh approved provider lanes for the same local event ID; when currencies match, the UI may calculate and label the lower listed snapshot and absolute difference.
- Dedicated SeatGeek/Vivid Seats snapshot workflows and the shared Impact marketplace snapshot workflow are the only approved writers for their enabled lanes. The shared workflow schedules only approved numeric-price providers and keeps other lanes manual/display-disabled. Summaries must make zero-row, partial, stale, configuration, provider, and write failures explicit. A failed fetch or unusable observation is skipped; it must not overwrite an existing fresh row.

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

## Provider Scope

The currently activated provider set is recorded in `PROJECT_STATUS.md`. Do not add another provider, revive the parked provider-abstraction scaffolding, create a parallel cache schema, or infer approval across related brands without a separately approved integration backed by verified destinations and explicit usage rights.
