# Safe Publishing Rules

_Reviewed current: 2026-06-03._

Non-negotiable rules for TourTicketCompare. Violating these compromises the site's integrity or affiliate agreements.

See [docs/CONTENT_RULES.md](docs/CONTENT_RULES.md) and [docs/PROVIDER_DATA_POLICY.md](docs/PROVIDER_DATA_POLICY.md) for full detail and provider-specific policy.

---

## Data Integrity

- **Never invent** tours, artists, events, dates, venues, prices, availability, providers, or partner relationships.
- **Never scrape** ticket providers or unofficial sources.
- Accepted verification sources: official artist/venue websites, verified social accounts, Ticketmaster artist pages, Billboard/Pollstar/Variety. Wikipedia alone is not sufficient; AI-generated data is not a source.

## Ticket CTAs

A "Buy tickets" button may only appear when all three conditions are met:

1. The artist exists in `public/data/catalog.json` with a configured provider entry.
2. The provider has a `redirectUrl` that passes validation (no `localhost`, `example.com`, `replace-me`, `placeholder`, `tbd`).
3. The link is present in `VERIFIED_TICKET_LINKS` in `functions/api/out.js`.

If any condition is unmet, show the watchlist / empty state. No placeholder or dead-end links as real CTAs.

## Artist Page Publishing

Artist pages may exist in `indexing_status: "review_required"` with no CTAs. This is the safe default for new artists.

Pages become indexable and conversion-led only after completing the phase gates in [docs/SAFE_NEXT_ARTIST_WORKFLOW.md](docs/SAFE_NEXT_ARTIST_WORKFLOW.md). Do not set `indexing_status: "indexable_with_substantial_content"` without human browser verification of the live ticket URL.

**New artists and events are never auto-published.** Discovery tooling (Ticketmaster / SeatGeek) may only *propose* candidates for human review. Promotion to indexable, and any `VERIFIED_TICKET_LINKS` / `/api/out` entry, require a human to verify the live ticket URL in a browser and to follow the phase gates. The only sanctioned scaling exception is the Ed Sheeran Phase 2 `review_required` shell — no CTAs, no `/api/out`, no events.

## Price Display

- Do not claim live price comparison is available.
- Do not say "sold out" or "available" based on unverified inventory data.
- Do not publish cross-provider comparison, scraping-derived prices, fake/manual prices, or any "cheapest", "lowest", "best deal", "savings", "price guarantee", or "real-time cheapest" claims.
- Ticketmaster price display from an approved provider feed requires `TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED=true` and is off by default.
- SeatGeek price snapshots are allowed only for a SeatGeek-only, provider-attributed latest snapshot when all of these are true: written SeatGeek display permission has been confirmed, the data is sourced from the approved SeatGeek partner API only, `SEATGEEK_PRICE_DISPLAY_ENABLED=true`, the event has a valid verified `seatgeek_url`, the cached row has `source='seatgeek_partner_api'`, the price is timestamped, and stale rows are hidden.

## Provider Rights and Catalog Metadata

- **Ticketmaster is an official event-verification and link source only — not a reliable price source.** Do not present Ticketmaster data as a price comparison.
- Marketplace partners (SeatGeek, Vivid Seats, StubHub, TicketNetwork) may display provider-specific pricing **only** where an approved feed/API explicitly permits public display, under the gating conditions above.
- **Impact affiliate approval grants link/commission rights only — it never implies price-display rights.** Do not infer the right to show prices from affiliate enrolment.
- Capability fields in `public/data/catalog.json` (`pricing_type`, `supports_pricing`, `price_aggregation`, `real_time_inventory`) are **inert metadata**. Price display remains gated by `TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED` / `SEATGEEK_PRICE_DISPLAY_ENABLED` (both OFF) and the SeatGeek written-permission conditions. These flags must never be read as "prices are shown".

## Affiliate and Redirect Rules

- All ticket outbound links must route through `/api/out` — no raw affiliate URLs in HTML or data files.
- `functions/api/out.js` and `VERIFIED_TICKET_LINKS` are protected. Do not modify without explicit scope.
- Impact credentials (`IMPACT_ACCOUNT_SID`, `IMPACT_AUTH_TOKEN`, `IMPACT_TICKETMASTER_PROGRAM_ID`) are server-side only. Never expose in public assets, API responses, or client-side code.
- If affiliate tracking fails, the redirect must fail safe or fall back only to the verified stored destination.

## Schema and SEO

- Do not add `Event` or `MusicEvent` JSON-LD schema without verified event-level data (confirmed date, venue, artist from an official source).
- Do not set a page to `indexable` status until it has substantial, verified content.
- Do not include `noindex` pages in the sitemap.

## Empty States

- When no verified ticket destination exists for an artist or event, show the honest watchlist / empty state — never a placeholder, a dead-end link, or an artist-level link presented as event-specific.

## Discovery, Enrichment, and Rendering

- SeatGeek is **event-level only**. Artist-level SeatGeek links and any SeatGeek price display are parked. Enrichment auto-apply is limited to high-confidence event-URL matches (logged); price snapshots write only to D1 and never enable display.
- Every non-root route must return route-specific H1, title, and canonical in raw HTML (SSR via `functions/[[path]].js`). Smoke tests assert this; production proof for issue #10 is a human curl/browser checklist.

## What AI Agents May Not Change Without an Explicit Scoped Issue

- Protected code/data: `functions/api/out.js`, `functions/_middleware.js`, `functions/[[path]].js`, `functions/_route-metadata.js`, `public/_routes.json`, and records in `public/data/{artists,catalog,events}.json`.
- Impact credentials and affiliate/CTA destination generation.
- Agents must not invent data, scrape providers, auto-publish artists/events, or create new governance docs. Edit the canonical docs (`CLAUDE.md` → `PROJECT_STATUS.md` → `BACKLOG.md`) instead of adding parallel ones.

## Dev and Placeholder Content

- No internal or dev wording on public pages at deploy time.
- No mock prices or mock events in production (`MOCK_MODE=false`, `ALLOW_MOCK_PRICES=false` in Cloudflare dashboard).
- No `localhost`, `example.com`, `replace-me`, `placeholder`, or `tbd` strings in any live configuration.
