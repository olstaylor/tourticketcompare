# TourTicketCompare Historical Notes

This file archives older project states that are no longer the source of truth. Use `README.md` for product and implementation rules, and use `HANDOVER.md` for current state and next steps.

## Archived States

### Early Ticket-Link MVP

- The site previously shipped as a simple artist ticket-link hub.
- Public routes included root-level artist pages such as `/beyonce`, `/harry-styles`, and `/bts`.
- Ticketmaster artist-level affiliate links were confirmed for seven artists.
- SeatGeek, Vivid Seats, StubHub, and Viagogo were intentionally hidden because attribution-safe routes were not proven.
- This route strategy is obsolete. Root-level artist routes should redirect to canonical `/artists/...` routes.

### CRO Ticket Funnel Pass

- The site temporarily used conversion-first copy such as artist cards, large Ticketmaster CTAs, and a Ticketmaster-only public funnel.
- It avoided fake prices and hidden unproven providers.
- This state is not the long-term documentation source because the current product direction is broader: SEO-focused artist/tour content with verified provider buttons for Ticketmaster, SeatGeek, and Vivid Seats.

### Transactional SEO Experiment

- The site previously experimented with root-level SEO routes such as `/beyonce-tickets` and city variants such as `/beyonce-tickets-london`.
- Those pages were intended to capture ticket search demand, but they conflict with the current canonical strategy.
- Current rule: use `/artists/[artist-slug]`, `/artists/[artist-slug]/tickets`, and `/artists/[artist-slug]/[tour-slug]`; redirect old root-level routes to canonical artist routes where appropriate.

### Prelaunch Foundation

- The live site was later reset to a trust-first prelaunch demand-capture site.
- It removed public ticket CTAs, fake listings, and affiliate URLs.
- It added D1-backed signup and analytics endpoints.
- This is the current live state before the SEO affiliate rebuild, but it is not the final product strategy.

### Demand Capture Deployment

- D1 database `tourticketcompare-demand` was created with binding `DEMAND_DB`.
- The Worker `tourticketcompare-live` was deployed with signup and analytics routes.
- Public guide pages were added under older slugs:
  - `/guides/compare-ticket-prices-safely`
  - `/guides/why-ticket-prices-vary`
  - `/guides/avoid-overpaying-concert-tickets`
  - `/guides/best-time-to-buy-concert-tickets`
- Current strategy replaces these with canonical guide routes under `/guides/[guide-slug]`.

## Historical Provider Findings

- Ticketmaster static artist affiliate links were supplied and treated as verified for the seven launch artists.
- Impact TrackingLinks API IDs previously tested were not confirmed as valid Program IDs.
- SeatGeek and Vivid Seats links remain future work until verified destination and attribution behavior are documented.
- StubHub and Viagogo are not part of the current intended provider set.

## Historical Deployment Notes

- The repository supports Cloudflare Pages and Pages Functions.
- Production traffic has repeatedly been served by standalone Worker `tourticketcompare-live`.
- Old notes mention multiple Worker build IDs, compact Worker uploads, and prelaunch deployments. Treat those as historical breadcrumbs only.
- Current deployment rule: if `tourticketcompare-live` remains attached to the domain, rebuild and deploy that Worker for production changes.
