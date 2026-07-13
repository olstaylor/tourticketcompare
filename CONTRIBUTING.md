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

## Validation (run the relevant subset before every commit)

### Syntax checks

```bash
node --check public/app.js
node --check 'functions/[[path]].js'
node --check functions/api/out.js
```

If you modified a named route shim, `node --check` it too (`functions/artists.js`, `guides.js`, `how-it-works.js`, `editorial-policy.js`, `affiliate-disclosure.js`, `contact.js`).

### Event data

```bash
python3 scripts/validate-events.py --for-production
```

### Smoke tests

```bash
node scripts/smoke-prelaunch.mjs
```

### Authorized Ticketmaster/SeatGeek page-price lane

```bash
npm run page-prices:self-test # offline parsers, pacing, stop conditions and runtime cache gates
npm run page-prices:preview   # catalog scope only; no provider requests or D1 writes
npm run page-prices:apply     # live retrieval + durable 24-hour ledger + D1 cache/history writes
```

Live mode is intentionally inseparable from a durable write: every retrieval attempt must be
recorded to enforce the providers' once-per-event-per-24-hours limit. Apply migration `0008`
before D1 mode. For a fully local persistent log, add
`--sqlite .local/authorized-page-prices.sqlite`; the path must remain inside the repository
and the script initializes the approved schema without Wrangler or Cloudflare. Use
`.github/workflows/authorized-page-price-snapshots.yml` for the supervised paired
10-show pass; it is manual-only until the owner reviews that run. Never run the script with
ad-hoc URLs or modified pacing, and stop on its CAPTCHA/login/block or coverage failure.

### Combined suite

```bash
npm run test:mvp     # events self-test + provider validators + smoke suite
```

### Hygiene

- `git diff --check` — no trailing whitespace or conflict markers
- No `console.log`, `TODO`, `FIXME` left in `functions/`
- No credentials or `.env` content in the diff

---

## Event Data Management

Events land via the Ticketmaster Discovery pipeline (`docs/PROVIDER_SYNC.md`) and per-artist batches (`npm run artists:apply-preview`). Manual data hygiene commands:

```bash
npm run events:validate  # Validate events.json against production rules
npm run events:partition # Partition events by artist
npm run events:sync      # Sync event data and update public/index.html inline fallback
npm run events:update    # validate → partition → sync
```

`npm run events:sync` is required after any JSON edits to `public/data/`. The `stale-sync-guard` CI job fails the PR if `public/index.html` is out of sync with the data files.

### SeatGeek event-URL discovery

```bash
npm run seatgeek:self-test    # Scoring + safety smoke test (no API calls)
npm run seatgeek:propose      # Proposal-only review file (no event-data edits)
npm run seatgeek:enrich       # Dry-run enrichment (audit log only)
npm run seatgeek:enrich:apply # Apply high-confidence seatgeek_url matches
```

Requires `SEATGEEK_CLIENT_ID` (and optional `SEATGEEK_CLIENT_SECRET`). Event-level
only; never invents URLs. After `seatgeek:enrich:apply`, run `events:sync` and the
validators, then open a PR. Full runbook: [docs/SEATGEEK_DISCOVERY.md](docs/SEATGEEK_DISCOVERY.md).

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
npm run demand:migrate   # Run the base migration on production D1 (0001 only)
npm run demand:export    # Export email_subscribers from production D1
```

Later migrations are applied one-off with `wrangler d1 execute` — see [migrations/README.md](migrations/README.md) for the applied state.

---

## Adding a New Artist

Batch onboarding (preferred): `npm run artists:onboard:propose` → review the identity manifest → shells → `npm run artists:promote:batch` (≤20 artists/PR, per-artist human browser spot-check checklist in the PR body). Single-artist path and phase gates: [docs/SAFE_NEXT_ARTIST_WORKFLOW.md](docs/SAFE_NEXT_ARTIST_WORKFLOW.md); field templates: [docs/ADDING_ARTISTS.md](docs/ADDING_ARTISTS.md). Every artist requires human browser verification before promotion — never auto-publish.

---

## PR Checklist

- [ ] Relevant syntax checks pass (`node --check`)
- [ ] Event data validated (`npm run events:validate`) if `events.json` was touched
- [ ] `npm run events:sync` run if any data files changed
- [ ] Smoke tests pass (`node scripts/smoke-prelaunch.mjs`)
- [ ] `npm run page-prices:self-test` passes if provider pricing, cache gates, workflows, or policy changed
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
