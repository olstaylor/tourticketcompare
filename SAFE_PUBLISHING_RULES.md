# Safe Publishing Rules

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

## Price Display

- Do not display prices, price ranges, or "cheapest" claims.
- Do not claim live price comparison is available.
- Do not say "sold out" or "available" based on unverified inventory data.
- Price display from an approved provider feed requires `TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED=true` and is off by default.

## Affiliate and Redirect Rules

- All ticket outbound links must route through `/api/out` — no raw affiliate URLs in HTML or data files.
- `functions/api/out.js` and `VERIFIED_TICKET_LINKS` are protected. Do not modify without explicit scope.
- Impact credentials (`IMPACT_ACCOUNT_SID`, `IMPACT_AUTH_TOKEN`, `IMPACT_TICKETMASTER_PROGRAM_ID`) are server-side only. Never expose in public assets, API responses, or client-side code.
- If affiliate tracking fails, the redirect must fail safe or fall back only to the verified stored destination.

## Schema and SEO

- Do not add `Event` or `MusicEvent` JSON-LD schema without verified event-level data (confirmed date, venue, artist from an official source).
- Do not set a page to `indexable` status until it has substantial, verified content.
- Do not include `noindex` pages in the sitemap.

## Dev and Placeholder Content

- No internal or dev wording on public pages at deploy time.
- No mock prices or mock events in production (`MOCK_MODE=false`, `ALLOW_MOCK_PRICES=false` in Cloudflare dashboard).
- No `localhost`, `example.com`, `replace-me`, `placeholder`, or `tbd` strings in any live configuration.
