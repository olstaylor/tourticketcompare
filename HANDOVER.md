# TourTicketCompare Handover

Last updated: 2026-05-21

Start here for future sessions. For full current facts, read `PROJECT_STATUS.md`; for prioritised work, read `BACKLOG.md`; for issue-ready task prompts, read `docs/ISSUE_DRAFTS.md`.

## Current product state

TourTicketCompare is an independent, unofficial ticket research site for major live music tours. It helps fans find verified ticket links where available and read safe ticket-buying guidance. It must not claim live price comparison, guaranteed availability, cheapest tickets, or invented event facts.

## Current architecture

- Static frontend assets: `public/`.
- Cloudflare Pages Functions: `functions/`.
- Active HTML routing: `functions/_middleware.js` delegates public HTML routes to `functions/[[path]].js`.
- Route metadata source of truth: `functions/_route-metadata.js`.
- Data files: `public/data/`.
- Validation/smoke scripts: `scripts/`.

## Current repo facts (as of 2026-05-21)

- `public/data/catalog.json`: 9 artists, 0 tour records.
- `public/data/events.json`: 272 events; all have Ticketmaster URLs; 93 have stored SeatGeek event URLs.
- `public/data/guides-content.json`: 15 guide content entries (includes `/guides/what-to-do-if-a-concert-is-postponed-or-cancelled`).
- `functions/_route-metadata.js`: 15 guide routes plus trust/static route metadata.
- `wrangler.toml`: active `DEMAND_DB` binding only; no placeholder `RATE_LIMIT_DB` or `CLICKS_DB` blocks.
- Artist pages live: Beyoncé, Harry Styles, BTS, Ariana Grande, Bad Bunny, Morgan Wallen, JAY-Z, Olivia Rodrigo, Bruno Mars.

## Work completed in this session (2026-05-21, PR #156 merged)

1. Phase 1 pre-scaling audit passed; baseline docs and metadata reconciled.
2. Guide content drift reduced across guides and route metadata.
3. Three core trust guides improved (copy tightened, no structural change):
   - `/guides/how-to-compare-concert-ticket-prices`
   - `/guides/how-to-avoid-overpaying-for-concert-tickets`
   - `/guides/how-to-avoid-ticket-scams`
4. Homepage and artist-page trust copy improved: hero subcopy softened, artist FAQ tightened, guide links added to artist pages, what-you-can-do cards refreshed.
5. Artist status copy corrected: "Event links available" → "Artist ticket page" across client (`app.js`) and server (`[[path]].js`).
6. Mobile/card layout polished: artist-card-grid 4→3 columns; 2-column intermediate for card-grid at 900px; 2-column mini-link-grid at 1020px; guide-grid min-height reset at 620px; artist-status-legend CSS added.
7. Homepage guide preview reduced to 6 cards (was 14); "View all guides" CTA preserved; `/guides` page still shows all 14.
8. Artist status legend server-rendered on homepage and `/artists` page to eliminate hydration flash.
9. Dead CSS removed: `.trust-ledger` (all rules including media-query override) and `.home-disclosure`.

## Checks that have been passing

- `node --check public/app.js` — clean
- `node --check 'functions/[[path]].js'` — clean
- `node --check functions/api/out.js` — clean
- `python3 scripts/validate-events.py --for-production` — clean
- `node scripts/smoke-prelaunch.mjs` — all routes 200/404 as expected; SeatGeek visibility gating verified
- `git diff --check` — clean

## What not to do next

- Do not add The Weeknd (or any new artist) yet — pausing at usage limit.
- Do not touch `/api/out`, Impact logic, affiliate redirects, provider URL handling, CTA generation, or destination URL logic.
- Do not modify artist/event/provider datasets.
- Do not change routing, middleware, route shims, or event data.
- Do not claim live price comparison, cheapest tickets, guaranteed availability, or invented facts.

## Recommended next task after usage resets

**Propose The Weeknd as next artist candidate (research + proposal only — no implementation).**

Research sources to check:
- Ticketmaster.com search for "The Weeknd" to find the artist page URL.
- Confirm whether a current or upcoming tour is listed.
- Check `public/data/catalog.json` to confirm `the-weeknd` slug is not already present.

The output of this task should be a written proposal only, covering:
- Proposed artist record fields for `artists.json` (slug, name, short_description, factual_summary — no invented dates or availability).
- Proposed `catalog.json` artist entry.
- Whether an artist-level Ticketmaster CTA is supportable (URL confirmed, no price/availability claims).
- Whether event-level data is available and how to source it.
- What the `smoke-prelaunch.mjs` `artistSlugs` fixture update would look like.

Do not implement until the proposal has been reviewed.

## Manual follow-up checklist for any new artist

After running the candidate events pipeline and having the proposal reviewed, the implementation checklist is:

- [ ] `public/data/artists.json` — add artist record (slug, name, short_description, factual_summary)
- [ ] `public/data/catalog.json` — add artist entry under `artists[]`
- [ ] `public/data/catalog.json` — add `ticket_links[]` entry if an artist-level Ticketmaster CTA is intended
- [ ] `functions/api/out.js` `VERIFIED_TICKET_LINKS` — add entry if an Impact vanity/affiliate link is intended
- [ ] Event data — add verified event records via the `events:update` pipeline
- [ ] `scripts/smoke-prelaunch.mjs` — add slug to `artistSlugs` fixture
- [ ] `PROJECT_STATUS.md` and `HANDOVER.md` — update current repo facts
- [ ] Run: `node --check public/app.js`, `node --check 'functions/[[path]].js'`, `node --check functions/api/out.js`, `python3 scripts/validate-events.py --for-production`, `node scripts/smoke-prelaunch.mjs`

## Protected areas

Do not touch unless the task explicitly says to:

- `/api/out`, Impact logic, affiliate redirects, provider URL handling, CTA generation, or destination URL logic.
- Artist/event/provider datasets.
- Cloudflare routing, middleware, route shims, fallback catalog, provider abstraction, public app rendering, SeatGeek redirects, or diagnostic API routes.
- Legacy deployment artifacts such as `api/`, `vercel.json`, `archive/vercel-experimental/`, and `scripts/build-standalone-worker.mjs`.

## Documentation map

- `PROJECT_STATUS.md`: current state and active risks.
- `BACKLOG.md`: active prioritised backlog.
- `CLEANUP_AUDIT.md`: accepted cleanup audit reference.
- `docs/ISSUE_DRAFTS.md`: copy/paste GitHub issue drafts.
- `README.md`: project overview and links.

## Default checks

For documentation-only tasks, run:

```bash
git diff --check
```

If runtime code is touched accidentally, stop and either revert it or run the relevant syntax/smoke checks before committing.
