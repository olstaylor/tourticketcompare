# TourTicketCompare Project Status

Last updated: 2026-05-19 (P0 raw-HTML routing proven locally)

This file is the current-state source of truth. Use `BACKLOG.md` for prioritised tasks, `HANDOVER.md` for the short session handoff, and `docs/ISSUE_DRAFTS.md` for copy/paste GitHub issue drafts.

## Current state summary

TourTicketCompare is a Cloudflare Pages + Pages Functions ticket research site. It is useful today as an independent guide and verified-link directory, not as a live price comparison engine.

Current repo facts checked on 2026-05-14:

- Production architecture is Pages Functions: static assets live in `public/`, server-side HTML/API logic lives in `functions/`, and there is no application build step.
- `functions/_middleware.js` is the active HTML entry point and delegates non-asset, non-API routes to `functions/[[path]].js`.
- `functions/_route-metadata.js` is the source of truth for public route titles, descriptions, H1s, guide routes, and old-guide redirects.
- `public/data/catalog.json` currently contains 7 artists and 0 tour records.
- `public/data/events.json` currently contains 130 events, all with Ticketmaster URLs; 93 records contain stored SeatGeek event URLs.
- `public/data/guides-content.json` and `functions/_route-metadata.js` both cover 12 guide routes.
- `wrangler.toml` has one active D1 binding, `DEMAND_DB`; stale placeholder `RATE_LIMIT_DB` and `CLICKS_DB` bindings are no longer present.

## Runtime and routing facts

- Platform: Cloudflare Pages + Pages Functions.
- Source of truth: GitHub `main`; prior docs say Cloudflare Pages Git deployment was confirmed on 2026-05-11.
- Manual deploy commands remain `npm run deploy:pages` and `npm run deploy:pages:safe`.
- `public/_routes.json` routes requests through Pages Functions except excluded static assets.
- `_middleware.js` passes `/api/`, `/data/`, known static files, and paths with file extensions to `context.next()`; other paths are rendered by `[[path]].js`.
- Named route shims such as `functions/artists.js` and `functions/guides.js` re-export `[[path]].js`; while middleware is active they are fallback files, not the live routing path.
- Public HTML routes should return route-specific server-rendered title, canonical metadata, JSON-LD, and body content. This should be proven with raw-HTML checks before SEO scaling.

## Current public product

Supported:

- Homepage and trust/legal pages.
- Artist index plus 7 artist pages: Beyoncé, Harry Styles, BTS, Ariana Grande, Bad Bunny, Morgan Wallen, and JAY-Z.
- 12 guide pages with server-rendered guide content (including SeatGeek promo-code guide).
- Verified Ticketmaster links where configured.
- Stored event-level SeatGeek URLs in event data, gated by SeatGeek configuration and safe URL checks before public CTAs render.
- First-party analytics and signup writes through `DEMAND_DB` where bindings are available.

Not supported:

- Live multi-provider price aggregation.
- Cheapest-ticket, guaranteed-availability, or savings claims.
- Scraping ticket providers.
- Unverified tour pages, city pages, venue pages, or event pages.
- Event/MusicEvent schema unless event-level data is verified for that exact page.

## Protected areas and guardrails

Do not modify these without an explicit task that names them:

- `/api/out`, affiliate redirect behavior, Impact logic, and destination URL logic.
- CTA generation and provider URL handling.
- Artist/event/provider datasets.
- Cloudflare routing, middleware, route shims, provider abstraction, fallback catalog, public app rendering, SeatGeek redirects, and diagnostic API routes.
- Legacy deployment files, provider scaffolding, debug endpoints, fallback catalog, and route shims.

Product guardrails:

- Never invent tours, dates, venues, prices, availability, providers, inventory, or ticket links.
- Never show placeholder comparison tables or fake pricing.
- Never claim live price comparison unless approved provider feeds support it.
- Never expose secrets client-side.
- Affiliate relationships must not weaken verification standards.

## Active risks

### P0 — raw HTML routing/canonical proof: PROVEN LOCALLY (2026-05-19)

Proven in local Pages preview (`npm run dev`) against 17 representative routes: homepage, `/artists`, two artist pages (Beyoncé, Harry Styles), `/guides`, two guide pages, five trust/legal pages, three old-guide redirects, and two unknown routes (artist and top-level).

Raw HTTP responses confirmed without relying on client-side JavaScript:

- All public routes return 200 with route-specific server-injected `<title>`, self-referencing `<link rel="canonical">`, page-specific `<h1>`, and `robots: index,follow,max-image-preview:large`.
- `<main>` bodies are server-rendered (Beyoncé artist page: 3,224 chars of visible text; guide page: 8,644 chars; JSON-LD present).
- All three old-guide slugs return 301 to their new canonicals (`compare-ticket-prices-safely` → `how-to-compare-concert-ticket-prices`, `why-ticket-prices-vary` → `why-ticket-prices-change`, `avoid-overpaying-concert-tickets` → `how-to-avoid-overpaying-for-concert-tickets`).
- Unknown routes (`/artists/nonexistent-artist-xyz`, `/random-route-xyzabc`) return HTTP 404 with `robots: noindex,follow`.

No mismatch found; no routing/metadata fix required. Production live-route browser confirmation (`docs/LIVE_PRODUCTION_VERIFICATION.md` § Remaining Unverified Items) remains pending and still requires a non-blocked network.

### P1 — verified ticket-link trust must remain protected

The current product depends on conservative link behavior. Ticketmaster and SeatGeek links must remain verified, provider-specific, and routed safely. No live price, availability, or cheapest-ticket claims should be introduced.

### P1 — SeatGeek expansion must remain data-first and redirect-safe

The dataset now contains many stored SeatGeek event URLs. Public SeatGeek CTAs should remain hidden unless the URL is stored, validated, and the SeatGeek affiliate/configuration path is available. `/api/out` must not search SeatGeek at click time.

### Parked — provider scaffold and legacy deployment decisions

Provider abstraction files, fallback catalog, Vercel artifacts, and standalone Worker rollback files may be intentional scaffolding or rollback support. Do not remove them without a decision task.

## Latest checks recorded in this documentation pass

Documentation-only repo inspection was performed on 2026-05-14 using:

- `git status --short`
- `rg --files -g '!node_modules'`
- `cat package.json`
- `git ls-files | grep -E '(^|/)\.DS_Store$'`
- `sed` inspections of `wrangler.toml`, `functions/_middleware.js`, `functions/[[path]].js`, `functions/_route-metadata.js`, and `functions/sitemap.xml.js`
- a Python count of `public/data/catalog.json`, `public/data/events.json`, and `public/data/guides-content.json`

No runtime product files were changed in this documentation pass.

## Documentation ownership

- `PROJECT_STATUS.md`: current state, active risks, current runtime facts, latest known checks.
- `BACKLOG.md`: prioritised actionable tasks grouped by P0/P1/P2/Parked/Completed.
- `CLEANUP_AUDIT.md`: accepted cleanup audit reference, not the active backlog.
- `HANDOVER.md`: short start-here handoff for future Codex sessions.
- `docs/ISSUE_DRAFTS.md`: copy/paste-ready GitHub issue drafts.
- `README.md`: project overview and links to source-of-truth docs.
