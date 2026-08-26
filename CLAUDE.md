# CLAUDE.md

Instructions for Claude Code — and any other AI or human contributor — working in this repository. This file holds stable, non-negotiable rules and key commands only. It does not restate architecture, current state, or automation detail that lives elsewhere.

**Read in order at session start:** `CLAUDE.md` (this file) → `PROJECT_STATUS.md` → `BACKLOG.md`. For how anything works: `docs/ARCHITECTURE.md`. For workflows/secrets/incidents: `docs/OPERATIONS.md`. Full list: "Key Documentation" below.

## Project Overview

**TourTicketCompare** is an independent, unofficial fan-facing ticket research site for major live music tours: verified ticket links, buying guidance, and artist watchlist pages. Live at https://tourticketcompare.com. Stack: Cloudflare Pages + Pages Functions, no build step (`public/` served as-is, `functions/` bundled by Cloudflare). GitHub `main` is the source of truth; merges auto-deploy. Storage: Cloudflare D1 (`DEMAND_DB`).

## Affiliate & Provider Model

- **Ticketmaster is a plain, unmonetized verification/link source.** Never re-add Impact wrapping, the Publisher Tag, or `evyy.net` shortlinks for it.
- **SeatGeek is the primary affiliate CTA.** Vivid Seats, TicketNetwork, Ticket Liquidator, and StubHub International are the other approved event-level affiliate lanes — each has independent allowlists, provenance, and flags. StubHub International does not imply StubHub US/Canada approval.
- **Price display is cache-only and provider-specific**, never inventory or a final checkout total. Every lane requires rights, an approved source, exact-event mapping, a verified URL, enabled flags, and freshness. See `docs/PROVIDER_DATA_POLICY.md`.

## Critical Product Rules

See [SAFE_PUBLISHING_RULES.md](SAFE_PUBLISHING_RULES.md) for the full non-negotiable list. In brief: never invent data, never scrape, never show fake CTAs or price comparisons, never expose credentials client-side, and never modify `/api/out` or affiliate logic without explicit scope. Every provider comparison stays gated by rights, exact-event matching, approved source, timestamps, and freshness.

## How the repository is organized

`public/` static frontend; `functions/` Pages Functions (routing + APIs) — `[[path]].js` handles all HTML routes, `_route-metadata.js` owns fixed/guide metadata; `content/blog/` and `content/guides/` Markdown content source; `data/` verified provider-identity registry; `scripts/` validation/automation tooling; `docs/` stable policy and runbooks. Full map, routing flow, and bindings: **`docs/ARCHITECTURE.md`**. Live schedule, secrets, incidents: **`docs/OPERATIONS.md`**. Non-secret flags (`SCHEMA_OFFERS_ENABLED`, etc.) are repo-managed in `wrangler.toml` `[vars]` — only credentials live in the Cloudflare dashboard.

## Validation

Match the check to the change. CI (`prelaunch-validation.yml`) runs the full suite on every PR regardless, so a local run is about catching a failure early, not about proving the branch.

```bash
npm run test:content      # ~1s   — edited content/blog/*.md or content/guides/*.md
npm run test:providers    # ~1s   — touched provider registry, CTA or allowlist data
npm run test:routes       # ~20s  — touched routing, route metadata or internal links
npm run test:quick        # ~60s  — touched several areas, or you are unsure
npm run test:mvp          # ~75s  — REQUIRED below
```

Full command list per area (a single artist, schema, funnel/analytics) is in [CONTRIBUTING.md](CONTRIBUTING.md).

**`npm run test:mvp` is required, locally and in-job, before committing anything that touches automation, provider sync, redirect, or affiliate logic** — the sanctioned auto-publish paths in [SAFE_PUBLISHING_RULES.md](SAFE_PUBLISHING_RULES.md) are gated on the complete suite passing on exactly the proposed content, so the fast lanes never substitute for it there.

`test:quick` and `test:units` together are exactly `test:mvp`, split into data/route checks and script unit tests; `npm run test:lanes` enforces that partition, so a step added to `test:mvp` can never silently drop out of the fast lane.

Report results honestly: "checks passed" or the actual failures, never skipped.

## Protected Areas

Do not modify without explicit task scope:

- **`functions/api/out.js`** — verified outbound redirect logic; contains `VERIFIED_TICKET_LINKS`
- **`functions/_middleware.js`** — entry point for all requests; a bug here breaks all HTML routes
- **`functions/[[path]].js`** — all HTML routing; changes affect every public page
- **`functions/_route-metadata.js`** — trust/static route metadata and `OLD_GUIDE_REDIRECTS`; re-exports the generated `GUIDE_ROUTES`
- **`public/data/events.json`, `artists.json`, `catalog.json`** — no records added, modified, or removed without a verified source
- **`public/data/blog-content.json`** — generated. Edit `content/blog/*.md` and run `npm run blog:build`; never edit the JSON directly
- **`public/data/guides-content.json` and `functions/_guide-routes.generated.js`** — generated. Edit `content/guides/*.md` and run `npm run guides:build`; never edit either directly
- **`public/og/` and `functions/_og-cards.generated.js`** — generated per-page Open Graph cards. Run `npm run og:build`; never hand-edit a card or the manifest
- **`data/content-provenance.json`** — generated. Holds each page's copy fingerprint, its derived `lastmod`, and each guide's immutable first-publication date; run `npm run content:provenance`
- **`public/_routes.json`** — incorrect changes cause site-wide failures
- **Impact credentials and affiliate tracking logic** (including `functions/api/impact/`)
- **Cloudflare dashboard settings** (routes, bindings, secrets)

Named-shim trap: editing `functions/artists.js` etc. has **no effect** while `_middleware.js` is active — edit `[[path]].js` instead.

## Working Style

- **Read only files relevant to the task.** Do not scan or rewrite the whole repo.
- **Make small, isolated changes.** One task = one or a few related commits. Artist onboarding batches up to 20 shells or 20 promotions per PR (see the onboarding skill) — keep it to one phase per PR, and keep it out of unrelated changes.
- **Use plan mode / confirm scope first** for multi-step work, routing changes, schema changes, or anything touching protected files.
- **Validate before committing**, then summarise: which files changed, what changed, which checks passed, what was not touched.
- **Never invent data** — tours, dates, venues, prices, availability, providers, URLs. If a task seems to require inventing data or touching a protected file out of scope, stop and ask.
- **Do not create new governance/status docs** unless explicitly asked; update the canonical ones (`docs/DOCS_MAINTENANCE.md` maps which file owns what).
- Artist onboarding, provider changes, and event data changes follow their dedicated gated workflows — see the doc map below.

## Live State & Priorities

`PROJECT_STATUS.md` (current data counts, per-artist states, generated route surface — repo wins if they disagree), `docs/OPERATIONS.md` (automation schedule, secrets, incidents), and `BACKLOG.md` (prioritised active + parked work; owner-managed — agents may correct facts but not reorder or re-scope priorities) are authoritative for "what is true right now," not this file.

## Key Documentation

[ARCHITECTURE](docs/ARCHITECTURE.md) · [OPERATIONS](docs/OPERATIONS.md) · [DEPLOYMENT](docs/DEPLOYMENT.md) · [CONTENT_RULES](docs/CONTENT_RULES.md) · [PROVIDER_DATA_POLICY](docs/PROVIDER_DATA_POLICY.md) · [ROUTE_INDEXABILITY_POLICY](docs/ROUTE_INDEXABILITY_POLICY.md) · [BLOG](docs/BLOG.md) · [ARTIST_ONBOARDING](.claude/skills/artist-onboarding/SKILL.md) · [ADDING_PROVIDERS](docs/ADDING_PROVIDERS.md) · [PROVIDER_SYNC](docs/PROVIDER_SYNC.md) · [SEATGEEK_DISCOVERY](docs/SEATGEEK_DISCOVERY.md) · [COMMERCIAL_FUNNEL](docs/COMMERCIAL_FUNNEL.md) · [BACKLINK_CAMPAIGN](docs/BACKLINK_CAMPAIGN.md) · [DOCS_MAINTENANCE](docs/DOCS_MAINTENANCE.md)

`AGENTS.md` is the concise repository-discovery entrypoint. Do not add parallel handover, archive, status, or governance documents; update the canonical file and use git history for superseded material.
