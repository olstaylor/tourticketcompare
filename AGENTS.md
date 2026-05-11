# AGENTS.md

## Project
TourTicketCompare.com

Independent, unofficial fan-facing ticket research site for major live music tours.

## Stack
- Cloudflare Pages
- Pages Functions
- GitHub main = source of truth

## Key paths
- `public/` → frontend
- `functions/` → Pages Functions
- `scripts/` → validation/smoke tests

## Product rules
- Never invent tours, dates, venues, prices, availability, or ticket inventory.
- Never scrape ticket providers.
- Never show fake comparison tables or placeholder pricing.
- Never claim live price comparison unless approved provider feeds support it.
- Never expose secrets client-side.

## Protected areas
Do not modify unless explicitly requested:
- `/api/out`
- affiliate logic
- CTA generation
- provider URLs
- artist/event datasets

## Current product state
Supported:
- verified ticket links
- buying guidance
- artist/event pages

Not supported:
- live pricing aggregation
- "cheapest ticket" claims
- guaranteed availability

## Working style
- Read only files relevant to the task.
- Avoid repo-wide scans unless necessary.
- Prefer small, isolated commits.
- Stop after requested scope is complete.

## Validation
Run relevant checks before summarising:
- `node --check public/app.js`
- `node --check 'functions/[[path]].js'`
- `python3 scripts/validate-events.py --for-production`
- `node scripts/smoke-prelaunch.mjs`
- `git diff --check`

## Response format
Summarise:
1. files changed
2. changes made
3. checks run
4. remaining risks

After changes:
- run relevant checks
- show git diff summary
- commit changes
- push the branch to GitHub
- do not open/merge a PR unless I ask
