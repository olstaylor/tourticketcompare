# TourTicketCompare Project Status

Last updated: 2026-05-11

---

## Production Sync Status

**Main does NOT reproduce the deployed Worker.**

| | Current `main` | Deployed Worker |
|---|---|---|
| BUILD_ID | `1905d379c8f8` | `d3cc71487403` |
| Last Worker deploy | — | 2026-05-01 (per HANDOVER.md) |

**Cause:** Three files in `public/` changed after the 2026-05-01 deploy:
- `public/app.js` (syntax fix + routing change, May 8)
- `public/404.html` (new file, May 8)
- `public/_routes.json` (updated, May 8)

**Additional structural divergence:** `scripts/build-standalone-worker.mjs` contains its own hardcoded route content (titles, H1s, descriptions) that differs from `functions/[[path]].js`. The Worker and Pages preview serve different page titles and content regardless of the hash. See [docs/PRODUCTION_SYNC_AUDIT.md](docs/PRODUCTION_SYNC_AUDIT.md) for full details.

---

## Current Known-Good State

- Live URL: `https://tourticketcompare.com`
- `www` redirect: `https://www.tourticketcompare.com` → apex (confirmed working 2026-05-01)
- Production runtime: Cloudflare Worker `tourticketcompare-live` (last deployed 2026-05-01, build `d3cc71487403`)
- GitHub `main` is the source of truth for the Pages Functions and frontend source
- All seven Ticketmaster artist-level affiliate links are verified and routing through `/api/out`
- `/api/health`, all artist pages, all guide pages, and trust pages passed smoke checks 2026-05-01
- `DEMAND_DB` D1 binding is active; `outbound_click` analytics are confirmed recording

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
| Worker/Pages divergence — confirmed | `main` builds Worker with BUILD_ID `1905d379c8f8`; deployed Worker is `d3cc71487403`. Three `public/` files changed after the May 1 deploy. Production is behind by the May 8 routing and syntax fixes. See `docs/PRODUCTION_SYNC_AUDIT.md`. | **High** |
| Content divergence between Worker and Pages | The build script and `functions/[[path]].js` have different page titles, guide descriptions, and artist H1 patterns. A new Worker build will continue to serve different content than Pages unless the build script is updated. | **High** |
| No npm script for Worker deploy | `npm run deploy` and `npm run deploy:pages` both deploy to Pages preview/fallback, not the production Worker. A Worker deploy requires a manual build + upload step. | High |
| Placeholder D1 bindings | `wrangler.toml` has two commented-out D1 bindings with `replace-with-d1-database-id`. Uncommenting without real IDs breaks local dev. | Medium |
| Named route shims inactive | `functions/artists.js` and similar shims re-export from `[[path]].js` but are never invoked while `_middleware.js` is active. Editing them has no effect. | Low |
| Vercel path exists | `vercel.json` and `api/` are present; neither is production but could be accidentally deployed. | Low |
| SeatGeek/Vivid Seats not configured | Any attempt to enable these providers requires verified URLs, not just code changes. | Low |

---

## Current Parked Issues

- **Raw HTML routing for non-root routes:** Routes such as `/artists`, `/guides`, `/how-it-works`, etc. have at times served homepage H1/title/canonical in raw HTML before client-side rendering. This is parked until explicitly prioritised; it should be addressed before serious SEO scaling work. See `docs/ARCHITECTURE.md` for routing details.
- **Broader deployment architecture cleanup:** The three-path deploy model (Worker/Pages/Vercel) creates maintenance overhead. Consolidating to Pages + D1 would simplify the workflow but requires a deliberate decision.
- **`RATE_LIMIT_DB` and `CLICKS_DB`:** These D1 databases are referenced in commented-out `wrangler.toml` blocks with placeholder IDs. Either provision them with real IDs or remove the commented blocks.

---

## Do Not Touch (without explicit task scope)

- `/api/out` — verified affiliate redirect logic; any change must be reviewed carefully
- `VERIFIED_TICKET_LINKS` in `functions/api/out.js` — approved affiliate URLs; do not modify without a new verified source
- `public/data/events.json`, `artists.json`, `catalog.json` — do not add, modify, or remove records without a verified source
- `_routes.json` — routes everything through functions; incorrect changes cause site-wide failures
- `functions/_middleware.js` — a bug here fails all HTML routes
- `functions/[[path]].js` — all HTML routing lives here; changes affect every public page
- `scripts/build-standalone-worker.mjs` — production Worker generator; changes must be tested carefully
- Impact credentials and affiliate tracking logic
- Cloudflare dashboard settings (routes, bindings, secrets)

---

## Immediate Priorities

1. Verify that the current `main` branch matches the deployed Worker (requires rebuilding and diffing, or Cloudflare dashboard inspection)
2. Confirm Cloudflare routes still point custom domains to `tourticketcompare-live`
3. Fix the raw HTML routing issue for non-root routes (parked but affects SEO)
4. Remove or provision the placeholder D1 binding entries in `wrangler.toml`
5. Add verified SeatGeek and Vivid Seats links only after destination and attribution behaviour are proven
6. Add tour records and event-level show cards only when source-backed data is verified

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
