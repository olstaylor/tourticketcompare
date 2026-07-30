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
node scripts/validate-partitions.mjs          # if partitions touched
```

`validate-events.py --for-production` hard-errors on a missing `tour_name` key and warns on a blank `tour_name` for indexed artists.

### Route / provider / artist validators (run the ones relevant to your change)

```bash
node scripts/validate-guide-routes.mjs        # guides or route metadata touched
npm run artist:check -- <slug>                # a specific artist touched — checks artists.json,
                                              #   catalog.json, events.json, partitions,
                                              #   VERIFIED_TICKET_LINKS in out.js, and the shows.js
                                              #   affiliate map (derived from out.js; the signup
                                              #   allowlist derives from artists.json — neither is
                                              #   hand-edited per artist)
npm run validate:artist-providers             # artists.json vs VERIFIED_TICKET_LINKS drift
npm run validate:cta-provider-state           # CTA ↔ provider-state guard (read-only):
                                              #   artist CTAs backed by a verified registry identity,
                                              #   no withheld identity publishing, every publishable
                                              #   event resolvable through /api/out, every
                                              #   machine_high_confidence row meeting its canonical
                                              #   contract, and every verified provider provenance row
                                              #   carrying a matching redirect-valid provider URL
npm run validate:provider-allowlists          # provider host allowlists
npm run providers:identities:validate         # data/provider-identities.json registry
npm run schema:validate                       # route schema markup
npm run validate:internal-links               # read-only in-process crawl of every HTML route —
                                              #   fails on orphaned indexable pages, canonical drift,
                                              #   robots/indexability disagreement, duplicate
                                              #   titles/descriptions, broken legacy guide redirects,
                                              #   and sitemap/indexability mismatches (in test:mvp)
npm run audit:internal-links                  # full internal-link & indexability report to reports/internal-links/
```

### Tooling self-tests (before changing the matching/snapshot scripts)

```bash
npm run seatgeek:self-test                    # SeatGeek discovery scoring/safety
npm run seatgeek:verify:self-test             # SeatGeek verification invariants
npm run vividseats:sync:self-test             # Vivid Seats CTA sync
npm run impact-providers:sync:self-test       # shared Impact catalog matcher
npm run impact-providers:prices:self-test     # exact-ID snapshot writer
npm run prices:history:prune:self-test        # history retention statement shape
```

### Smoke tests

```bash
node scripts/smoke-prelaunch.mjs
```

### Combined suite

```bash
npm run test:mvp     # docs + events/link/Impact self-tests + provider validators
                     # + CTA-provider-state guard + allowlists + smoke suite
```

### Documentation and hygiene

```bash
npm run docs:check   # relative links, documented npm scripts, canonical file set
```

- `git diff --check` — no trailing whitespace or conflict markers
- No `console.log`, `TODO`, `FIXME` left in `functions/`
- No credentials or `.env` content in the diff
- Update the existing canonical/topic document; do not add handover, archive, or parallel status files

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
- [ ] `npm run docs:check` passes
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
