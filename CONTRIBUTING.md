# Contributing

Practical guide for working on TourTicketCompare. Start by reading [CLAUDE.md](CLAUDE.md) → [PROJECT_STATUS.md](PROJECT_STATUS.md) → [BACKLOG.md](BACKLOG.md).

---

## Local Development

```bash
npm install
npm run dev          # Pages preview at http://localhost:3000
                     # Health check at http://localhost:3000/api/health
```

---

## Validation (run before every commit)

### Syntax checks

```bash
node --check public/app.js
node --check 'functions/[[path]].js'
node --check functions/api/out.js
```

If you touched a named route shim, also check:

```bash
node --check functions/artists.js
node --check functions/guides.js
node --check functions/how-it-works.js
node --check functions/editorial-policy.js
node --check functions/affiliate-disclosure.js
node --check functions/contact.js
```

### Event data

```bash
python3 scripts/validate-events.py --for-production
```

### Smoke tests

```bash
node scripts/smoke-prelaunch.mjs
```

### Whitespace / conflict markers

```bash
git diff --check
```

---

## Event Data Management

```bash
npm run events:csv       # Convert CSV input to events.json
npm run events:validate  # Validate events.json against production rules
npm run events:partition # Partition events by artist
npm run events:sync      # Sync event data and update public/index.html inline fallback
npm run events:update    # Full pipeline: csv → validate → partition → sync
```

`npm run events:sync` is required after any JSON edits to `public/data/`. The `stale-sync-guard` CI job fails the PR if `public/index.html` is out of sync with the data files.

---

## Deployment

Merges to `main` deploy automatically via Cloudflare Pages Git integration. Manual deploy is only needed for emergencies:

```bash
npm run deploy:pages:safe   # Run smoke checks, then deploy
npm run deploy:pages        # Deploy without pre-flight checks
```

After any deploy, verify:

```bash
curl -fsS https://tourticketcompare.com/api/health
```

Expected: `{ ok: true, runtime: "cloudflare-pages-functions", ... }`. Secrets must not appear in the response.

---

## Database (D1)

```bash
npm run demand:migrate   # Run migrations on production D1
npm run demand:export    # Export email_subscribers from production D1
```

---

## Adding a New Artist

Follow the gated workflow in [docs/SAFE_NEXT_ARTIST_WORKFLOW.md](docs/SAFE_NEXT_ARTIST_WORKFLOW.md). Field-level templates are in [docs/ADDING_ARTISTS.md](docs/ADDING_ARTISTS.md). Do not add a new artist without completing Phase 1 (Proposal) human verification first.

**Currently blocked:** no new artists until #171 (Olivia Rodrigo trust gap) is resolved. See [BACKLOG.md](BACKLOG.md).

---

## PR Checklist

- [ ] Relevant syntax checks pass (`node --check`)
- [ ] Event data validated (`npm run events:validate`) if `events.json` was touched
- [ ] `npm run events:sync` run if any data files changed
- [ ] Smoke tests pass (`node scripts/smoke-prelaunch.mjs`)
- [ ] `git diff --check` clean
- [ ] No invented data, placeholder CTAs, or dev wording in any public-facing file
- [ ] Protected files unchanged unless this PR's explicit scope

---

## Protected Files

Do not modify without explicit task scope — a bug in these breaks the whole site or exposes credentials:

- `functions/api/out.js` — affiliate redirect logic and `VERIFIED_TICKET_LINKS`
- `functions/_middleware.js` — entry point for all requests
- `functions/[[path]].js` — all HTML routing; changes affect every public page
- `functions/_route-metadata.js` — single source of truth for page titles, H1s, descriptions
- `public/data/events.json`, `artists.json`, `catalog.json` — verified data only; no records without a confirmed source
- `public/_routes.json` — incorrect changes cause site-wide routing failures
- Impact credentials and `functions/api/impact/` — server-side affiliate tracking
