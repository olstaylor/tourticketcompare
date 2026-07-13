# TourTicketCompare Content Rules

_Reviewed current: 2026-07-13._

Rules for what can and cannot be published on TourTicketCompare. These apply to all human and AI contributors. For provider/price-display rights and the inert-catalog-metadata rule, see `SAFE_PUBLISHING_RULES.md` and `docs/PROVIDER_DATA_POLICY.md`.

---

## What TourTicketCompare Is

An independent, unofficial fan-facing ticket research site. The site helps fans find verified ticket links, understand buying risks, and read practical guides before leaving for an external ticket provider.

It is not affiliated with any artist, venue, promoter, or ticket platform.

---

## Hard Rules

These rules have no exceptions.

### Never invent

Do not publish content that is not confirmed from a verifiable source:

- Tour dates
- Venues or cities
- Ticket prices (face value, resale, or range)
- Ticket availability or inventory status
- Artist tour announcements
- Provider coverage or partnership status

### Never perform unapproved scraping

Do not obtain data from unofficial sources, competitor sites, or automated crawls of ticketing platforms without explicit written provider approval. The only current direct-page exception is the catalog-scoped Ticketmaster/SeatGeek lowest-price snapshot writer documented in `docs/PROVIDER_DATA_POLICY.md`; it is restricted to the exact approved fields and never stores page content.

### Never fake

Do not publish:

- Fake comparison tables
- Provider buttons without a destination URL
- Show cards without event data
- "Available" or "on sale" claims without confirmed provider status

### Never expose credentials

Do not publish:

- API keys, secret tokens, or account IDs in public HTML, CSS, JavaScript, JSON, or documentation
- Impact affiliate link parameters or program IDs in client-visible output
- Affiliate URLs as raw `<a href>` tags visible in page source (all affiliate links must go through `/api/out`)

---

## When Ticket Buttons May Appear

A ticket button (CTA) may appear only when **all three conditions** are met:

1. The artist slug is in `public/data/catalog.json` and is a known, verified artist.
2. The provider has a configured, verified `redirectUrl` in `/api/out`'s `VERIFIED_TICKET_LINKS` or a verified event record in `events.json`.
3. The link passes `/api/out` validation (not a placeholder URL, not an open redirect, destination host is allowlisted).

Artist-level buttons (pointing to a provider's artist page) are acceptable when the above conditions are met.

Event-level buttons must additionally have a verified event record (`events.json`) with a `ticketmaster_event_id` or equivalent confirmed destination.

---

## Artist Pages

- Only publish artist pages for slugs in `public/data/catalog.json`.
- Unknown artist slugs must return a 404 or honest empty state, not a thin generated page.
- Artist factual summaries must come from confirmed public sources.
- Do not invent tour announcements or imply touring activity that is not confirmed.
- The "artist watchlist" framing is intentional: the page is useful even when no current ticket link exists.

---

## Event and Show Cards

- Do not publish show cards from unreviewed or unverified data.
- Event records must have a confirmed date, venue, and artist.
- Do not add `Event` or `MusicEvent` schema to any page without verified event-level data.
- If no verified events exist, show a polished empty state.

---

## Price Data

- Ticketmaster may supply a provider-attributed lowest-price snapshot only through the authorized event-page writer, for a verified unauthenticated catalog event URL, when `TICKETMASTER_PRICE_DISPLAY_ENABLED=true` and the exact-source/timestamp/expiry gates pass.
- SeatGeek may supply a provider-attributed snapshot from the approved SeatGeek partner API or, where equivalent API pricing is unavailable, its authorized event-page writer. `SEATGEEK_PRICE_DISPLAY_ENABLED=true`, verified provider provenance, exact source URL for page-derived rows, approved source and freshness remain mandatory.
- Vivid Seats may supply a provider-attributed snapshot only from its approved feed when `VIVIDSEATS_PRICE_DISPLAY_ENABLED=true`, the event has a valid verified `vividseats_url`, the cached row has `source='vividseats_impact_marketplace_api'`, and the snapshot is timestamped and fresh.
- TicketNetwork and StubHub International may supply provider-attributed listed-price snapshots only from their approved Impact catalogs under the same gate pattern (`TICKETNETWORK_PRICE_DISPLAY_ENABLED` / `STUBHUB_INTERNATIONAL_PRICE_DISPLAY_ENABLED`, exact provider-level event verification, approved source, timestamped fresh cache row). Ticket Liquidator price display stays disabled while its catalog supplies no numeric `CurrentPrice` (`TICKETLIQUIDATOR_PRICE_DISPLAY_ENABLED` must not be enabled until it does).
- Written agreements confirmed on 2026-07-10 permit SeatGeek and Vivid Seats snapshots to be displayed side by side for the same verified event, including lower-listed-price and difference calculations plus history.
- Price data must be timestamped, attributed to the provider, tied to the exact event, and clearly distinguished from final checkout totals.

---

## Guides

- Guide content should answer practical, search-intent questions fans have before buying tickets.
- Guides may reference general market behaviour (e.g., "service fees typically add 20–30% to face value") if that is factual and widely documented.
- Guides may explain the approved SeatGeek/Vivid Seats comparison feature, but must not claim guaranteed savings, final checkout totals, availability, or data that is not actually displayed.

---

## SEO and Schema

- Use `index,follow` only on pages that are fully published and correctly represent real content.
- Use `noindex,follow` on 404 pages, tour pages for unverified tours, and any page that does not meet the content rules above.
- Do not create thin duplicate pages (e.g., `/artists/beyonce-tickets`, city subpages) unless they have distinct verified content.
- Legacy root-level artist URLs (`/beyonce`, `/beyonce-tickets`) redirect to canonical `/artists/beyonce` and must not be revived as canonical pages.
- Do not add BreadcrumbList, FAQPage, or Article schema to pages that do not meet the content rules.

---

## Placeholder and Development Content

Before deploying, confirm that no page contains:

- `example.com`, `localhost`, `127.0.0.1`, `placeholder`, `your-link-here`, `replace-me`, `tbd` in ticket link URLs
- "Coming soon", "Under construction", or dev-mode wording visible to users
- Internal route or function names in public-facing copy
- Fake or sample prices used during development
