# TourTicketCompare Project Brief

## Product Summary

TourTicketCompare is an independent, unofficial ticket research site for fans of major live music tours. The site is live at `https://tourticketcompare.com` and helps users find checked ticket options, understand buying risks, and use practical guides before leaving for an external ticket provider.

The product should feel useful today without pretending to provide live multi-provider price comparison. Ticket links should only appear when the show, artist, and destination can be verified. Final prices, fees, availability, delivery terms, and checkout terms are confirmed by the ticket provider.

## Current Positioning

- Fan-facing ticket research for major tours.
- Checked ticket links where available.
- Practical buying guidance for fees, resale risk, delivery terms, and checkout checks.
- Independent and unofficial; not affiliated with artists, venues, promoters, or ticketing platforms.
- Affiliate links may be used, but affiliate relationships must not weaken verification standards.

## Current Product Shape

- Static frontend in `public/`.
- Cloudflare Pages Functions in `functions/`.
- Live site: `tourticketcompare.com`.
- Known artist pages only; unknown artist routes should not become thin generated pages.
- Verified event cards render only from reviewed data or approved official sources.
- Existing affiliate redirects work and must remain server-side and safe.
- Ticketmaster is an official event-link source, but not a reliable price source for display pricing.

## Data And Content Rules

- Do not invent prices, dates, venues, availability, tours, providers, listings, or savings claims.
- Do not show placeholder, example, localhost, or dead-end ticket links as real CTAs.
- Do not claim live price comparison is available until approved multi-provider price data exists.
- Show price data only when approved providers supply displayable pricing that is allowed for public use.
- Do not scrape unofficial sources.
- Use empty states when no checked ticket link exists.
- Do not add Event or MusicEvent schema without verified event-level data.

## Affiliate And Provider Rules

- Ticket CTAs should preserve verified event specificity.
- `/api/out` is the safe outbound path for checked event/provider redirects.
- Impact credentials and affiliate-link generation must stay server-side.
- If affiliate tracking fails, redirects should fail safely or fall back only to a verified stored destination.
- Do not expose API keys, Impact credentials, account IDs, or secret configuration in public assets.

## Current Known Limitation

The raw HTML routing issue for non-root routes is parked unless explicitly requested. Do not work on Cloudflare routing, middleware, `_routes.json`, or deployment infrastructure unless a task specifically asks for it.

## Success Criteria

- Fans immediately understand what the site does and how to use it.
- Artist pages feel useful even when no current checked ticket link exists.
- Event CTAs, when shown, point to exact verified destinations.
- Guides answer practical search-intent questions without fake data or unsupported claims.
- Public pages contain no internal/dev wording.
- Affiliate disclosure is transparent but not alarming.

