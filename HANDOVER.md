# TourTicketCompare Handover

Last updated: 2026-05-14

Start here for future Codex sessions. For full current facts, read `PROJECT_STATUS.md`; for prioritised work, read `BACKLOG.md`; for issue-ready task prompts, read `docs/ISSUE_DRAFTS.md`.

## Current product state

TourTicketCompare is an independent, unofficial ticket research site for major live music tours. It helps fans find verified ticket links where available and read safe ticket-buying guidance. It must not claim live price comparison, guaranteed availability, cheapest tickets, or invented event facts.

## Current architecture

- Static frontend assets: `public/`.
- Cloudflare Pages Functions: `functions/`.
- Active HTML routing: `functions/_middleware.js` delegates public HTML routes to `functions/[[path]].js`.
- Route metadata source of truth: `functions/_route-metadata.js`.
- Data files: `public/data/`.
- Validation/smoke scripts: `scripts/`.

## Current repo facts

- `public/data/catalog.json`: 7 artists, 0 tour records.
- `public/data/events.json`: 130 events; all have Ticketmaster URLs; 93 have stored SeatGeek event URLs.
- `public/data/guides-content.json`: 10 guide content entries.
- `functions/_route-metadata.js`: 10 guide routes plus trust/static route metadata.
- `wrangler.toml`: active `DEMAND_DB` binding; no placeholder `RATE_LIMIT_DB` or `CLICKS_DB` blocks.
- `functions/.DS_Store`: still tracked and should be removed in a small housekeeping task.

## Protected areas

Do not touch unless the task explicitly says to:

- `/api/out`, Impact logic, affiliate redirects, provider URL handling, CTA generation, or destination URL logic.
- Artist/event/provider datasets.
- Cloudflare routing, middleware, route shims, fallback catalog, provider abstraction, public app rendering, SeatGeek redirects, or diagnostic API routes.
- Legacy deployment artifacts such as `api/`, `vercel.json`, `archive/vercel-experimental/`, and `scripts/build-standalone-worker.mjs`.

## Highest-priority next work

1. Prove raw HTML routing/canonical behavior for public non-root routes, then make only the smallest fix if a mismatch is found.
2. Build safe SeatGeek promo-code content without unsupported discount claims.
3. Add safe ticket-buying guide content clusters.
4. Continue verified SeatGeek URL coverage through the existing data workflow without changing redirect logic.
5. Remove tracked `.DS_Store` in a housekeeping-only task.

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
