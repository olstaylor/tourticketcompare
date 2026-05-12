# TourTicketCompare Project Status

Last updated: 2026-05-12 (revised)

---

## 1. Current Production Architecture

### Runtime
- **Platform:** Cloudflare Pages + Pages Functions
- **Source of truth:** GitHub `main` — merges trigger automatic production deploys via Cloudflare Pages Git integration (confirmed 2026-05-11)
- **Production runtime confirmed:** `cloudflare-pages-functions` via `/api/health` (2026-05-11)
- **Manual deploy path:** `npm run deploy:pages` or `npm run deploy:pages:safe` (runs smoke check first)
- **No build step:** `public/` is served as-is; `functions/` is bundled by Cloudflare Pages

### Request routing
- `public/_routes.json` routes all requests (`/*`) through Pages Functions; only `/_assets/*` and `/favicon.ico` are excluded
- `functions/_middleware.js` is the active entry point — it passes static asset paths and `/api/` and `/data/` prefixes directly to `context.next()`, and sends all HTML routes to `functions/[[path]].js`
- `functions/[[path]].js` handles all HTML rendering: serves correct server-injected `<title>`, `<meta>`, canonical, JSON-LD, and full `<main>` content for every route
- Named route shims (`functions/artists.js`, `functions/guides.js`, etc.) re-export from `[[path]].js` but are **not invoked** while `_middleware.js` is active — editing them has no effect on production
- `functions/_route-metadata.js` is the **single source of truth** for page titles, H1s, descriptions, guide routes, and old-guide redirects

### Data bindings
- **`DEMAND_DB`** (D1, `tourticketcompare-demand`, ID `19b314b8-10f1-4504-a3bc-963f7ecbe9f6`): active; used for analytics event writes and email signup. Confirmed present via live `/api/health` (2026-05-11)
- **`RATE_LIMIT_DB`** and **`CLICKS_DB`**: referenced in `wrangler.toml` as commented-out blocks with placeholder IDs — not provisioned
- **Impact credentials** (`IMPACT_ACCOUNT_SID`, `IMPACT_AUTH_TOKEN`, `IMPACT_TICKETMASTER_PROGRAM_ID`): confirmed present as Cloudflare Pages secrets (2026-05-11); used server-side only in `functions/api/out.js`
- **`impactDefaultProgramId`:** reported `false` by `/api/health`; Ticketmaster-specific program ID is sufficient if that is the only active program

### Key env vars (wrangler.toml defaults, overrideable via Cloudflare dashboard)
- `MOCK_MODE=false`, `ALLOW_MOCK_PRICES=false` — confirmed live (2026-05-11)
- `CLICK_TRACKING_ENABLED=true`
- `TICKETMASTER_DISCOVERY_ENABLED=true`, `TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED=false`

### Custom domains
- `https://tourticketcompare.com` — production
- `https://www.tourticketcompare.com` — 301 → apex (path-preserving, Cloudflare Redirect Rule, confirmed 2026-05-11)

---

## 2. Current Working Features

### Public pages (all server-rendered via Pages Functions)
| Route | Type | Indexable |
|---|---|---|
| `/` | Homepage | Yes |
| `/artists` | Artist index | Yes |
| `/guides` | Guide index | Yes |
| `/how-it-works` | Trust/info | Yes |
| `/about` | Trust/info | Yes |
| `/contact` | Trust/info | Yes |
| `/editorial-policy` | Trust/legal | Yes |
| `/affiliate-disclosure` | Trust/legal | Yes |

### Artist pages
Seven artist pages, each with verified Ticketmaster affiliate links:
`/artists/beyonce`, `/artists/harry-styles`, `/artists/bts`, `/artists/ariana-grande`, `/artists/bad-bunny`, `/artists/morgan-wallen`, `/artists/jay-z`

Each artist page renders:
- Correct server-injected `<title>`, canonical, and meta description
- Breadcrumb navigation
- Verified ticket link(s) via `/api/out` when configured
- Practical buying checklist, about section, artist FAQ
- Safe empty state when no verified link exists

### Guide pages (five active)
- `/guides/how-to-compare-concert-ticket-prices`
- `/guides/ticketmaster-vs-seatgeek-vs-vivid-seats`
- `/guides/how-to-avoid-overpaying-for-concert-tickets`
- `/guides/when-is-the-best-time-to-buy-concert-tickets`
- `/guides/primary-vs-resale-concert-tickets`

Four old guide slugs redirect 301 → canonical URLs (defined in `_route-metadata.js`).

### `/api/out` affiliate redirect (high level only — do not modify)
- **GET**: validates params, looks up verified link, optionally creates Impact tracking URL server-side, writes click analytics to `DEMAND_DB`, then 302 redirects
- **POST**: same flow, returns JSON `{ok, redirectUrl}` instead of redirecting
- Handles two modes: `showId` (event-specific, resolves from `events.json`) and `artistSlug` (artist-level, resolves from `VERIFIED_TICKET_LINKS` in source)
- All destination URLs validated against a strict allowlist of provider hostnames; localhost/RFC1918/placeholder URLs rejected
- Impact credential calls are server-side only; failure falls back safely to stored verified URL

### Other API endpoints
- `/api/health` — returns runtime config status (mock flags, credential presence); confirmed safe (no secrets exposed)
- `/api/shows` — returns event data for a given `artistSlug` filtered from `events.json`; mock pricing disabled
- `/api/analytics`, `/api/click`, `/api/signup` — D1-backed data capture endpoints
- `/api/impact/health`, `/api/impact/products`, `/api/impact/tracking-links` — Impact integration helpers; fail safely when credentials are absent

### Data files (read-only; do not modify without a verified source)
- `public/data/catalog.json` — 7 artists, 0 tours, 4 providers (Ticketmaster public_enabled; SeatGeek, Vivid Seats, StubHub defined but `public_enabled: false`), 7 verified ticket links (all Ticketmaster artist-level)
- `public/data/events.json` — 130 events (Ticketmaster-sourced; each has `ticketmaster_url` with event-specific path)
- `public/data/events/` — per-artist partitioned event files (6 files: ariana-grande, bad-bunny, bts, harry-styles, jay-z, morgan-wallen; beyoncé events remain in the root events.json)
- `public/data/artists.json`, `events-index.json`, `affiliate-routes.json`, `inventory-model.json`

### Sitemap
- `functions/api/sitemap.xml.js` generates a sitemap covering 20 indexable URLs (confirmed 2026-05-11)
- `public/robots.txt` present

---

## 3. Known Risks and Parked Issues

| Risk | Detail | Severity |
|---|---|---|
| **✓ Smoke test false positives (FIXED 2026-05-12)** | `node scripts/smoke-prelaunch.mjs` was failing on two false positives: (1) "guaranteed claim" rule flagged safe copy like "not guaranteed" in FAQ; (2) development domain "ticketmaster.evyy.net" appeared in public data (catalog.json). Both fixed: added allowedContext to "guaranteed claim" rule, and removed development domain from trusted_affiliate_hosts. Smoke test now passes. | ✓ Resolved |
| **Raw HTML routing** | Non-root routes (`/artists`, `/guides`, `/how-it-works`, etc.) serve correct server-injected HTML via Pages Functions, but `public/app.js` re-renders content client-side on load. If a crawler catches an intermediate state or JS fails, the homepage H1/title could be indexed instead of the route-specific values. Parked until explicitly prioritised; must be resolved before SEO scaling. See `docs/ARCHITECTURE.md`. | Medium (SEO) |
| **`impactDefaultProgramId` not configured** | `/api/health` reports `impactDefaultProgramId: false`. Confirm whether this binding is needed for any active feature or whether the Ticketmaster-specific program ID is sufficient. | Medium |
| **Placeholder D1 bindings** | `wrangler.toml` has two commented-out D1 bindings (`RATE_LIMIT_DB`, `CLICKS_DB`) with `replace-with-d1-database-id` placeholder IDs. Uncommenting without real IDs breaks local dev. Either provision with real IDs or remove the blocks. | Medium |
| **Named route shims inactive** | `functions/artists.js` and peers re-export from `[[path]].js` but are never reached while `_middleware.js` is active. Editing them has no production effect. | Low |
| **Legacy deployment paths** | `vercel.json` and `api/` directory are present but not production. `scripts/build-standalone-worker.mjs` is present as emergency rollback reference. Neither should be accidentally deployed. | Low |
| **SeatGeek / Vivid Seats not configured** | Providers are defined in `PROVIDERS` and `catalog.json` but have no verified `VERIFIED_TICKET_LINKS` entries and no ticket links in catalog. Any attempt to enable requires verified destination URLs, not just code changes. | Low |

### Parked (do not action without explicit scope)
- Raw HTML routing fix — parked until SEO scaling is prioritised
- `RATE_LIMIT_DB` / `CLICKS_DB` provisioning or cleanup
- `vercel.json` / `api/` / `scripts/build-standalone-worker.mjs` retirement
- Tour-level pages (routing supports them; no verified tour records exist)
- Event-level show cards with dates/venues (events.json exists but no UI surface renders them on artist pages)

---

## 4. Safe Next Roadmap

### Recommended next 5 implementation tasks (priority order)

1. **Confirm `impactDefaultProgramId`** — `/api/health` reports `false`; verify whether any active affiliate feature requires this binding or whether the Ticketmaster-specific program ID is sufficient. No code changes needed if it is confirmed not required.
2. **Clean up placeholder D1 bindings** — remove or provision the `RATE_LIMIT_DB` and `CLICKS_DB` blocks in `wrangler.toml`. Placeholder IDs break local dev if accidentally uncommented. Either delete the blocks or fill real database IDs.
3. **Wire event-level show cards on artist pages** — `events.json` and `/api/shows` already exist; the UI surface on artist pages is not yet wired. Start with one artist (e.g. Beyoncé) to prove the pattern before rolling out.
4. **Complete remaining live smoke checks** — run through the full page matrix (six artist pages, five guide pages, five trust/legal pages, four old-guide redirects, D1 analytics write) and record results in `docs/LIVE_PRODUCTION_VERIFICATION.md`.
5. **Add one verified SeatGeek or Vivid Seats affiliate link** — add a single artist-level destination URL (after confirming the redirect behaviour in `/api/out`), prove Impact attribution works, then expand. Do not add without a verified destination URL.

### Immediate stabilisation (done)
- **✓ Smoke test now passes** — fixed false positives on "guaranteed claim" and development domain. `npm run deploy:pages:safe` is operational as of 2026-05-12.

### Next confirmation needed
- **Confirm `impactDefaultProgramId`** — check whether the absent binding affects any live feature or whether the Ticketmaster-specific program ID covers all active use cases.
- **Clean up or provision placeholder D1 bindings** — remove or fill the `RATE_LIMIT_DB`/`CLICKS_DB` blocks in `wrangler.toml`.
- **Complete remaining live smoke checks** — six artist pages beyond Beyoncé, four guide pages, five trust/legal pages, old guide redirect slugs, D1 analytics write. See `docs/LIVE_PRODUCTION_VERIFICATION.md`.

### MVP product polish
- Add event-level show cards to artist pages (events data already exists in `events.json` and `/api/shows`; UI surface not yet wired up on artist pages)
- Improve empty states for artists where no verified event-specific link exists
- Review and polish existing guide copy for search intent and factual accuracy
- Retire `vercel.json`, `api/`, and `scripts/build-standalone-worker.mjs` once Pages is confirmed stable for a production cycle

### Verified artist/search expansion
- Add more artist pages one at a time using the strict artist template with source-backed factual summaries
- Add one verified SeatGeek or Vivid Seats artist affiliate link only after destination and attribution behaviour are proven in `/api/out`
- Add tour records only when source-backed data is verified and the tour-level routing is ready

### Future provider/API integrations
- Enable `TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED=true` only when there is a product decision to display timestamped Ticketmaster prices
- Add SeatGeek and Vivid Seats artist-level links when verified destination URLs, Impact program IDs (if applicable), and redirect behaviour are confirmed
- Add provider-specific price feeds only when approved API access, explicit display rights, and a compliant pricing display design are in place

### Long-term automation
- Automated Ticketmaster or provider event feed sync (requires human review gates before public display)
- Public live price comparison UI (requires approved multi-provider feeds)
- Email/newsletter automation and CRM sync

---

## 5. Validation Commands

Run the relevant subset before committing any change:

```bash
# Syntax checks — always run these
node --check public/app.js
node --check 'functions/[[path]].js'
node --check functions/api/out.js

# Event data validation
python3 scripts/validate-events.py --for-production

# Smoke test suite (passes as of 2026-05-12; false positives fixed)
node scripts/smoke-prelaunch.mjs

# Whitespace/conflict markers
git diff --check
```

When named route shims are touched, also check:

```bash
node --check functions/artists.js
node --check functions/guides.js
node --check functions/how-it-works.js
node --check functions/editorial-policy.js
node --check functions/affiliate-disclosure.js
node --check functions/contact.js
```

**Note:** `node scripts/smoke-prelaunch.mjs` now passes as of 2026-05-12. Use `npm run deploy:pages:safe` for production deploys with pre-flight checks.

---

## 6. Claude/Codex Operating Rules

- **Make one small change at a time.** Read only the files relevant to the task. Do not scan or rewrite the whole repo.
- **Do not modify `/api/out` or any affiliate routing** unless the task explicitly names that area. The redirect logic, `VERIFIED_TICKET_LINKS`, and Impact credential handling are protected.
- **Do not add pricing, availability, or comparison claims** unless the task explicitly provides an approved provider data source.
- **Do not modify artist, event, or provider data** (`catalog.json`, `events.json`, `artists.json`, `affiliate-routes.json`) unless the task provides a verified source.
- **Do not modify `_routes.json`, `_middleware.js`, or `[[path]].js`** without careful review — bugs here fail all HTML routes site-wide.
- **Do not deploy to Cloudflare or push to `main`** unless explicitly asked. Push to a feature branch and open a PR only when asked.
- **After any change, summarise exactly:** which files were changed, what was changed, which checks were run and their result, and what was not touched.
- **Before starting any session:** read `AGENTS.md`, this file (`PROJECT_STATUS.md`), and `BACKLOG.md` before reading task-specific files.

---

## Do Not Touch (without explicit task scope)

- `functions/api/out.js` and `VERIFIED_TICKET_LINKS` — approved affiliate redirect logic
- `public/data/events.json`, `artists.json`, `catalog.json` — do not add, modify, or remove records without a verified source
- `public/_routes.json` — incorrect changes cause site-wide failures
- `functions/_middleware.js` — a bug here fails all HTML routes
- `functions/[[path]].js` — all HTML routing lives here; changes affect every public page
- `functions/_route-metadata.js` — single source of truth for page titles, H1s, descriptions, and redirects
- Impact credentials and affiliate tracking logic
- Cloudflare dashboard settings (routes, bindings, secrets)
- `scripts/build-standalone-worker.mjs` — emergency rollback reference; do not delete until explicitly scoped
