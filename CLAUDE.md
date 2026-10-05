# CLAUDE.md

Stable rules for anyone (human or AI) changing this repository. Read this file first. Open other docs only when the task needs them:

- Current counts, per-artist state: [PROJECT_STATUS.md](PROJECT_STATUS.md)
- Priorities and parked work: [BACKLOG.md](BACKLOG.md)
- How the code fits together: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- Scheduled jobs, secrets, open incidents: [docs/OPERATIONS.md](docs/OPERATIONS.md)
- Setup and per-area test commands: [CONTRIBUTING.md](CONTRIBUTING.md)
- Topic docs: see "Key documentation" below

## Project

TourTicketCompare (https://tourticketcompare.com) is an independent, unofficial ticket research site for major live music tours: verified ticket links, buying guidance and artist pages. Cloudflare Pages + Pages Functions, no build step (`public/` is served as-is, `functions/` is bundled by Cloudflare). Merges to `main` auto-deploy. Storage: Cloudflare D1 (`DEMAND_DB`). Non-secret flags live in `wrangler.toml` `[vars]`; only credentials live in the Cloudflare dashboard.

## Providers

- **Ticketmaster is a plain, unmonetized link source.** Never re-add Impact wrapping, the Publisher Tag or `evyy.net` links for it.
- **SeatGeek is the primary affiliate CTA.** Vivid Seats, TicketNetwork, Ticket Liquidator and StubHub International are the other approved event-level lanes, each with its own allowlist, provenance and flags. StubHub International does not imply StubHub US/Canada.
- **Prices are cached, per-provider snapshots**, never inventory or a checkout total. Each lane needs rights, an approved source, exact-event mapping, a verified URL, enabled flags and freshness ([docs/PROVIDER_DATA_POLICY.md](docs/PROVIDER_DATA_POLICY.md)).

## Non-negotiable rules

Full list: [SAFE_PUBLISHING_RULES.md](SAFE_PUBLISHING_RULES.md). In short: never invent data (tours, dates, venues, prices, availability, providers, URLs); never scrape; no fake CTAs or price comparisons; no credentials client-side; never change `/api/out` or affiliate logic without explicit scope. If a task seems to need any of these, stop and ask.

## Protected areas

Do not modify without explicit task scope:

- `functions/api/out.js` (verified redirects, `VERIFIED_TICKET_LINKS`), `functions/_middleware.js` (every request), `functions/[[path]].js` (every HTML route), `functions/_route-metadata.js`, `public/_routes.json`.
- `public/data/events.json`, `artists.json`, `catalog.json`: no record added, changed or removed without a verified source.
- Impact credentials and affiliate tracking (including `functions/api/impact/`), and Cloudflare dashboard settings.
- The event-page indexing pilot (`EVENT_INDEXING_PILOT_KEYS` in `functions/_event-indexability.js`, `data/event-indexing-pilot.json`, `EVENT_PAGES_INDEXING`): a frozen cohort. Never add, swap or regenerate keys or widen indexing.
- Generated files. Never hand-edit; regenerate:

| File | Command |
|---|---|
| `public/data/blog-content.json` | `npm run blog:build` (source `content/blog/*.md`) |
| `public/data/guides-content.json`, `functions/_guide-routes.generated.js` | `npm run guides:build` (source `content/guides/*.md`) |
| `public/og/`, `functions/_og-cards.generated.js` | `npm run og:build` |
| `data/content-provenance.json` | `npm run content:provenance` |

Trap: editing a named shim such as `functions/artists.js` has no effect while `_middleware.js` is active. Edit `[[path]].js`.

## Validation

CI runs the full suite on every PR. Locally, run what matches the change:

```bash
npm run test:content     # ~1s   content/blog or content/guides
npm run test:providers   # ~1s   provider registry, CTA or allowlist data
npm run test:routes      # ~20s  routing, route metadata, internal links
npm run test:quick       # ~60s  several areas, or unsure
npm run test:mvp         # ~3m   full suite
```

`npm run test:mvp` is **required** before committing anything that touches automation, provider sync, redirects or affiliate logic; the auto-publish paths are gated on it. Steps are declared once in `scripts/test-manifest.mjs`; re-run one with `npm run test:units -- --only <step-id>`. `npm run test:providers` is the only lane that runs the provider and identity validators. Report results honestly: passed, or the actual failures.

## Working style

- Read only what the task needs. Make small, isolated changes; artist onboarding batches stay at 20 per PR, one phase per PR ([skill](.claude/skills/artist-onboarding/SKILL.md)).
- Confirm scope first for routing, schema or protected-file changes.
- Artist onboarding, provider changes and event-data changes follow their own gated workflows (see the docs below).
- After a change, summarise the files changed, the checks run and what was left alone.
- Do not add status, handover or governance docs. Update the file that owns the topic ([docs/DOCS_MAINTENANCE.md](docs/DOCS_MAINTENANCE.md)); git history keeps the rest.
- `BACKLOG.md` is owner-managed: agents may correct facts but not reorder or re-scope it. If `PROJECT_STATUS.md` disagrees with the repo, the repo wins.

## Key documentation

[ARCHITECTURE](docs/ARCHITECTURE.md) · [OPERATIONS](docs/OPERATIONS.md) · [DEPLOYMENT](docs/DEPLOYMENT.md) · [CONTENT_RULES](docs/CONTENT_RULES.md) · [PROVIDER_DATA_POLICY](docs/PROVIDER_DATA_POLICY.md) · [ROUTE_INDEXABILITY_POLICY](docs/ROUTE_INDEXABILITY_POLICY.md) · [BLOG](docs/BLOG.md) · [ARTIST_INGESTION](docs/ARTIST_INGESTION.md) · [ADDING_PROVIDERS](docs/ADDING_PROVIDERS.md) · [PROVIDER_SYNC](docs/PROVIDER_SYNC.md) · [SEATGEEK_DISCOVERY](docs/SEATGEEK_DISCOVERY.md) · [COMMERCIAL_FUNNEL](docs/COMMERCIAL_FUNNEL.md) · [BACKLINK_CAMPAIGN](docs/BACKLINK_CAMPAIGN.md) · [DOCS_MAINTENANCE](docs/DOCS_MAINTENANCE.md)
