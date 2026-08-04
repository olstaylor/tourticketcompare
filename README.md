# TourTicketCompare

Independent, unofficial ticket research for major live music tours.

Live at **[tourticketcompare.com](https://tourticketcompare.com)** (`www` redirects to the apex domain).

## What the site does

TourTicketCompare helps fans find checked ticket destinations, understand buying risks, and read practical guidance before leaving for an external provider.

- Verified artist- and event-level ticket links where the required provider checks pass
- Provider-attributed listed-price snapshots for approved, exact-matched events
- Buying guides covering fees, resale risk, timing, and provider differences
- City, venue, and artist-city pages aggregated from the same reviewed event records
- A blog written in Markdown under `content/blog/` ([docs/BLOG.md](docs/BLOG.md))
- Artist watchlist pages for major tours

Ticketmaster is a plain, unmonetized event/link source. Approved affiliate lanes currently include SeatGeek, Vivid Seats, TicketNetwork, Ticket Liquidator, and StubHub International; availability varies by event and each lane fails closed when its URL, provenance, runtime configuration, or source checks do not pass. See [Provider Data Policy](docs/PROVIDER_DATA_POLICY.md) for the durable rules and [Project Status](PROJECT_STATUS.md) for the current rollout state.

Displayed prices are timestamped provider-supplied listed-price snapshots, not live inventory or final checkout totals. Fees, taxes, availability, delivery, and totals must be confirmed with the provider.

## Tech stack

- **Frontend:** static HTML/CSS/JavaScript in `public/` (no compilation step)
- **Routing and APIs:** Cloudflare Pages Functions in `functions/`
- **Storage:** Cloudflare D1 via the `DEMAND_DB` binding
- **Ticketmaster freshness:** a daily, PR-gated discovery job updates the persisted catalogue; visitor requests never fan out to Ticketmaster.
- **Operational live lookup:** disabled by default. Set `TICKETMASTER_LIVE_ARTIST_DISCOVERY_ENABLED=true` only for controlled diagnostics, then request `liveArtist=true`; it is short-cached and serves the last verified result for up to 36 hours if Ticketmaster is rate-limited or unavailable.
- **Deployment:** merges to GitHub `main` deploy through Cloudflare Pages Git integration
- **Configuration:** non-secret flags live in `wrangler.toml` `[vars]` (repo-managed); only credentials live in the Cloudflare dashboard

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000; health: /api/health
npm run test:mvp   # documentation, data/provider, and smoke validation
```

Setup details, targeted checks, event-data commands, and the PR checklist are in [CONTRIBUTING.md](CONTRIBUTING.md).

## Documentation map

| Document | Purpose |
|---|---|
| [CLAUDE.md](CLAUDE.md) | Concise, stable contributor rules, protected areas, and working style |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Repository structure, request routing, and durable contracts |
| [docs/OPERATIONS.md](docs/OPERATIONS.md) | Workflow schedules, secrets/bindings reference, and known incidents |
| [PROJECT_STATUS.md](PROJECT_STATUS.md) | Brief, largely machine-generated current-state snapshot — data counts and per-artist status |
| [BACKLOG.md](BACKLOG.md) | Genuinely outstanding, prioritised work and explicit parking decisions |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Local setup, validation, and change checklist |
| [SAFE_PUBLISHING_RULES.md](SAFE_PUBLISHING_RULES.md) | Non-negotiable data, CTA, price, and automation rules |
| [docs/DOCS_MAINTENANCE.md](docs/DOCS_MAINTENANCE.md) | Documentation ownership, lifecycle, and drift checks |

Topic runbooks and policies are linked from [CLAUDE.md](CLAUDE.md#key-documentation). Superseded decisions and documents belong in git history, not in a parallel archive directory.

## Core integrity rules

- Never invent tours, dates, venues, prices, availability, providers, or inventory.
- Never scrape ticket providers.
- Never expose credentials or raw affiliate tracking in public assets.
- Never claim live or final-price comparison; every displayed lane must satisfy its approved source, exact-event, timestamp, and freshness gates.
- GitHub `main` is the source of truth, and unknown routes return a real 404 instead of a generated thin page.

See [Content Rules](docs/CONTENT_RULES.md) and [Provider Data Policy](docs/PROVIDER_DATA_POLICY.md) for the complete rules.
