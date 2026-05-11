# TourTicketCompare Project Status

Last updated: 2026-05-11 (www redirect confirmed fixed)

---

## Current Known-Good State

- Live URL: `https://tourticketcompare.com`
- `www` redirect: **confirmed working** — `https://www.tourticketcompare.com` → 301 → `https://tourticketcompare.com` (path-preserving; fixed 2026-05-11 via Cloudflare Redirect Rule)
- Production runtime: **Cloudflare Pages Functions** (confirmed 2026-05-11 via `/api/health` → `runtime: "cloudflare-pages-functions"`)
- Production runtime changed from: Cloudflare Worker `tourticketcompare-live` (previously deployed 2026-05-01, build `d3cc71487403`) — no longer serving production
- GitHub `main` is the source of truth for the Pages Functions and frontend source
- All seven Ticketmaster artist-level affiliate links are verified and routing correctly through `/api/out` (confirmed 2026-05-11: Beyoncé → 302 to `ticketmaster.evyy.net/beyonce`)
- `DEMAND_DB` D1 binding active; `IMPACT_ACCOUNT_SID`, `IMPACT_AUTH_TOKEN`, `IMPACT_TICKETMASTER_PROGRAM_ID` all confirmed present via health endpoint
- `mockMode: false`, `allowMockPrices: false`, `clickTrackingEnabled: true` confirmed live
- Homepage, Beyoncé artist page, guide page: correct server-injected titles and canonicals confirmed 2026-05-11
- 404 returns HTTP 404 + `noindex,follow` confirmed 2026-05-11
- Sitemap returns 20 URLs confirmed 2026-05-11

See `docs/LIVE_PRODUCTION_VERIFICATION.md` for full live evidence.

### What is publicly available

- Homepage with verified ticket guidance
- Seven artist pages: Beyoncé, Harry Styles, BTS, Ariana Grande, Bad Bunny, Morgan Wallen, JAY-Z
- Five guide pages: concert price comparison, fee guidance, avoiding overpaying, timing, primary vs resale
- Trust/legal pages: how it works, about, contact, editorial policy, affiliate disclosure
- 20-URL sitemap with all indexable pages

### What is not currently available

- Live multi-provider price comparison
- SeatGeek or Vivid Seats ticket buttons (hidden until verified links are configured)
- Verified event-level show cards with dates, venues, or cities
- Event/MusicEvent schema (must not be added without verified event data)
- Tour-level pages (supported in routing but no verified tour records exist)

---

## Current Known Risks

| Risk | Detail | Severity |
|---|---|---|
| ~~www redirect broken~~ | **Resolved 2026-05-11.** Cloudflare Redirect Rule added; `www.tourticketcompare.com` now 301→apex (path-preserving). Confirmed live. | ~~High~~ |
| GitHub→Pages CI pipeline unconfirmed | It is unknown whether the current production deploy was triggered by a GitHub push or a manual CLI deploy. If no Git integration is active, every deploy requires a manual `npm run deploy:pages` step. Check Cloudflare Pages dashboard. | High |
| ~~Worker version gap~~ | **Closed.** Production is now on Pages Functions, not the standalone Worker. The Worker version gap is no longer relevant. | ~~High~~ |
| ~~No npm script for Worker deploy~~ | **Closed.** Worker is no longer production. `npm run deploy:pages` is the correct production deploy path. | ~~High~~ |
| ~~Structural content divergence~~ | **Resolved.** `functions/_route-metadata.js` is now the single source of truth for page titles, descriptions, H1s, and redirects. | ~~High~~ |
| `impactDefaultProgramId` not configured | `/api/health` reports `impactDefaultProgramId: false`. May be intentional if the Ticketmaster-specific program ID is sufficient. Confirm with account settings. | Medium |
| Placeholder D1 bindings | `wrangler.toml` has two commented-out D1 bindings with `replace-with-d1-database-id`. Uncommenting without real IDs breaks local dev. | Medium |
| Named route shims inactive | `functions/artists.js` and similar shims re-export from `[[path]].js` but are never invoked while `_middleware.js` is active. Editing them has no effect. | Low |
| Vercel path exists | `vercel.json` and `api/` are present; neither is production but could be accidentally deployed. | Low |
| SeatGeek/Vivid Seats not configured | Any attempt to enable these providers requires verified URLs, not just code changes. | Low |
| `scripts/build-standalone-worker.mjs` still present | No longer needed for production; retire after Pages is confirmed stable. | Low |

---

## Current Parked Issues

- **Raw HTML routing for non-root routes:** Routes such as `/artists`, `/guides`, `/how-it-works`, etc. have at times served homepage H1/title/canonical in raw HTML before client-side rendering. This is parked until explicitly prioritised; it should be addressed before serious SEO scaling work. See `docs/ARCHITECTURE.md` for routing details.
- **~~Broader deployment architecture cleanup:~~** The three-path deploy model has been resolved — production is now on Pages. Vercel path (`vercel.json`, `api/`) and standalone Worker script (`scripts/build-standalone-worker.mjs`) remain as cleanup debt.
- **`RATE_LIMIT_DB` and `CLICKS_DB`:** These D1 databases are referenced in commented-out `wrangler.toml` blocks with placeholder IDs. Either provision them with real IDs or remove the commented blocks.

---

## Do Not Touch (without explicit task scope)

- `/api/out` — verified affiliate redirect logic; any change must be reviewed carefully
- `VERIFIED_TICKET_LINKS` in `functions/api/out.js` — approved affiliate URLs; do not modify without a new verified source
- `public/data/events.json`, `artists.json`, `catalog.json` — do not add, modify, or remove records without a verified source
- `_routes.json` — routes everything through functions; incorrect changes cause site-wide failures
- `functions/_middleware.js` — a bug here fails all HTML routes
- `functions/[[path]].js` — all HTML routing lives here; changes affect every public page
- `functions/_route-metadata.js` — single source of truth for page titles, H1s, descriptions, and redirects
- Impact credentials and affiliate tracking logic
- Cloudflare dashboard settings (routes, bindings, secrets)
- `scripts/build-standalone-worker.mjs` — still present as emergency rollback reference; do not delete until explicitly scoped

---

## Immediate Priorities

1. ~~**Fix www redirect**~~ — **Done 2026-05-11.** Cloudflare Redirect Rule active; 301 confirmed.
2. **Confirm GitHub→Pages CI pipeline** — check Cloudflare Pages dashboard for Git integration. If no Git integration is active, every deploy requires a manual `npm run deploy:pages` step. (High: operational risk before any feature work lands on main)
3. **Complete live smoke checks** — remaining routes not yet verified: six artist pages, four guide pages, five trust/legal pages, old guide redirect slugs, D1 analytics write. See `docs/LIVE_PRODUCTION_VERIFICATION.md`.
4. **Confirm `impactDefaultProgramId`** — `/api/health` reports `false`; confirm whether the absent binding affects any live feature.
5. Remove or provision the placeholder D1 binding entries in `wrangler.toml` (`RATE_LIMIT_DB`, `CLICKS_DB`)
6. Add verified SeatGeek and Vivid Seats links only after destination and attribution behaviour are proven
7. Add tour records and event-level show cards only when source-backed data is verified

---

## Recommended Workflow for Claude/Codex Sessions

Every session should begin by reading:

1. `AGENTS.md` — project rules and protected areas
2. `PROJECT_STATUS.md` (this file) — current state and risks
3. `BACKLOG.md` — priorities
4. Only the specific files relevant to the task

**Before making changes:**
- Confirm the change is within the task scope defined above
- Do not touch protected areas unless the task explicitly names them
- Validate with relevant checks before committing

**After making changes:**
- Run relevant validation checks (see AGENTS.md)
- Show a git diff summary
- Commit with a clear message
- Push the branch to GitHub
- Do not open or merge a PR unless explicitly asked
- Do not deploy to Cloudflare

**Validation checks (run the relevant subset):**

```bash
node --check public/app.js
node --check 'functions/[[path]].js'
node --check functions/api/out.js
python3 scripts/validate-events.py --for-production
node scripts/smoke-prelaunch.mjs
git diff --check
```

When route shims are touched, also check:

```bash
node --check functions/artists.js
node --check functions/guides.js
node --check functions/how-it-works.js
node --check functions/editorial-policy.js
node --check functions/affiliate-disclosure.js
node --check functions/contact.js
```
