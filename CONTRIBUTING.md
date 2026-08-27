# Contributing

Practical guide for working on TourTicketCompare. Start by reading [CLAUDE.md](CLAUDE.md) → [PROJECT_STATUS.md](PROJECT_STATUS.md) → [BACKLOG.md](BACKLOG.md). Architecture: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). Workflow schedules, secrets, and incidents: [docs/OPERATIONS.md](docs/OPERATIONS.md).

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

### Blog / content

```bash
npm run blog:build          # compile content/blog/*.md   -> public/data/blog-content.json
npm run guides:build        # compile content/guides/*.md -> public/data/guides-content.json
                            #   and functions/_guide-routes.generated.js
npm run content:provenance  # derive each page's Updated date from its copy (see below)
npm run blog:check          # fail if the generated blog JSON is stale (also run by test:mvp)
npm run guides:check        # fail if either generated guide file is stale (also run by test:mvp)
npm run blog:self-test      # parser + validator unit tests
npm run guides:self-test    # validator, publication-ledger and emitter unit tests
npm run content:cms-contract  # every persisted front-matter key has a CMS field, and every
                              #   document survives a Sveltia-style save unchanged
```

### Social cards

```bash
npm run og:build            # render public/og/*.png + functions/_og-cards.generated.js
npm run og:check            # fail if the manifest references a card that is not committed
npm run og:self-test        # text-fit, layout-geometry and manifest unit tests
```

Run `npm run og:build` after adding an artist, guide or blog post, and commit the
new cards with the change. Routes that appear between builds (a city or venue
qualifying as dates land) fall back to the shared `/og-image.png` until the next
run — that is expected, not a failure.

`npm run blog:build` is required after any edit under `content/blog/`, and
`npm run guides:build` after any edit under `content/guides/`. Both validate
before they write: a page with a broken internal link, an over-budget title, or a
claim the site cannot support fails rather than publishing.

Two things you do **not** edit by hand. A guide's Updated date lives in
`data/content-provenance.json` and is derived from a fingerprint of its copy, so
run `npm run content:provenance` after changing a guide's words and commit the
result. A source's "link checked" date lives in
`data/guide-source-link-checks.json` and is written only by the nightly audit —
the editorial claim is `last_checked` in the Markdown. Generated files
(`public/data/*-content.json`, `functions/_guide-routes.generated.js`,
`functions/_og-cards.generated.js`, `public/og/*.png`,
`data/content-provenance.json`) are never hand-edited.

Withdrawing a published guide — drafting, renaming or deleting it — fails the
build unless `OLD_GUIDE_REDIRECTS` in `functions/_route-metadata.js` carries an
entry for the old path. Authoring reference: [docs/BLOG.md](docs/BLOG.md).

### Start here: pick a lane

Measured on a clean checkout — match the lane to what you changed rather than
reaching for the full suite. CI runs `test:mvp` on every PR anyway, so a local
run exists to catch a failure early, not to prove the branch.

| Lane | Time | Use when |
| --- | --- | --- |
| `npm run test:content` | ~1s | edited `content/blog/*.md` or `content/guides/*.md` |
| `npm run test:providers` | ~1s | touched provider registry, CTA or allowlist data |
| `npm run test:routes` | ~20s | touched routing, route metadata or internal links |
| `npm run test:quick` | ~60s | touched several areas, or unsure |
| `npm run test:units` | ~20s | changed a script that has a `*:self-test` |
| `npm run test:mvp` | ~75s | **required** for automation, provider-sync, redirect or affiliate changes |

`test:quick` and `test:units` are an exact partition of `test:mvp`, enforced by
`npm run test:lanes`, which both lanes run first — a step added to `test:mvp`
cannot silently drop out of either.

Two things the lanes do **not** cover, because they are not in `test:mvp` at all:

- `npm run providers:validate` and `npm run providers:identities:validate` live
  only in `test:providers`. Provider structure, review-status fields and
  identity URL constraints are therefore checked by neither `test:quick` nor
  CI's `test:mvp` step — run `test:providers` whenever provider configuration or
  `data/provider-identities.json` is involved, including as part of a
  multi-area change.
- A script with a dedicated non-`self-test` test — `test:event-local-date` is
  the shared venue-local date resolver — sits in `test:quick`, not `test:units`.
  Changing `scripts/lib/event-local-date.mjs` means running `test:quick` (or
  that one command), not `test:units` alone. `test:mvp` itself must stay the complete suite: the sanctioned
auto-publish paths in
[SAFE_PUBLISHING_RULES.md](SAFE_PUBLISHING_RULES.md) are gated on it passing
in-job on exactly the proposed content.

### Route / provider / artist validators (run the ones relevant to your change)

```bash
node scripts/validate-guide-routes.mjs        # guides or route metadata touched
npm run content:provenance                    # REQUIRED after editing any guide or trust-page copy.
                                              #   Re-fingerprints each static route and advances its
                                              #   published lastmod only where the copy actually
                                              #   changed. Commit the result: content:provenance:check
                                              #   runs in test:mvp and fails a stale commit.
npm run guides:sources:check:dry-run          # optional: confirm every cited guide source still
                                              #   resolves. The scheduled daily audit runs the writing
                                              #   form; it records the check in
                                              #   data/guide-source-link-checks.json only, never the
                                              #   editorial last_checked in the Markdown.
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
npm run audit:indexable-surface:check         # route-usefulness policy guard (in test:mvp) — fails on
                                              #   structural indexability change, orphaned indexable
                                              #   routes, indexable routes with no future events, and
                                              #   duplicate titles; ordinary event expiry is reported,
                                              #   never failed. See docs/ROUTE_INDEXABILITY_POLICY.md
npm run audit:indexable-surface               # full surface report to reports/indexable-surface/
npm run status:surface:write                  # regenerate the <!-- generated:… --> blocks in
                                              #   PROJECT_STATUS.md (route surface, empty boards)
                                              #   from a real render of every route. Runs daily in
                                              #   daily-audit.yml; run it by hand after a change
                                              #   that moves the indexable set.
npm run audit:indexable-surface:baseline      # re-anchor the baseline (only for an intended policy change)
npm run test:route-indexability               # gate units, city/venue derivations, redirect-map safety
npm run test:location-pages                   # the shared city/venue page templates rendered against a
                                              #   pinned clock, with and without upcoming shows — run it
                                              #   after editing either template. See
                                              #   docs/ROUTE_INDEXABILITY_POLICY.md § Shared content
npm run test:homepage-proposition             # homepage/artists/how-it-works copy parity across the
                                              #   server template, the hydrated homepage, and the
                                              #   client fallback (in test:mvp) — run it after editing
                                              #   any of that copy. See docs/ARCHITECTURE.md
```

### Targeted subset commands (scoped changes)

Prefer these over the full `test:mvp` chain when a change is scoped to one area — useful for an agent that only needs to inspect and validate the relevant page/route type. Summarised with timings under "Start here: pick a lane" above.

```bash
npm run test:routes      # ~20s — route-metadata + route-indexability units, guide-route validation,
                         #   and the internal-links crawl (the slow part) — routing/metadata changes
npm run test:content     # ~1s  — blog:check + guides:check + content:provenance:check + guide-route
                         #   validation — content/copy changes (guides, trust pages, blog)
npm run test:providers   # ~1s  — provider-structure, artist-provider-claims, CTA-provider-state,
                         #   provider-allowlists, and provider-identities validators —
                         #   provider/CTA changes
npm run test:quick       # ~60s — every data/route check in test:mvp, without the script unit tests
npm run test:units       # ~20s — only the script unit tests (the *:self-test steps)
```

### Tooling self-tests (before changing the matching/snapshot scripts)

```bash
npm run test:event-local-date                 # shared venue-local date/instant resolver used by
                                              #   every provider matcher (in test:mvp)
npm run seatgeek:self-test                    # SeatGeek discovery scoring/safety
npm run seatgeek:enrich:self-test             # SeatGeek enrichment scheduling + matching (in test:mvp)
npm run seatgeek:verify:self-test             # SeatGeek verification invariants (in test:mvp)
npm run vividseats:sync:self-test             # Vivid Seats CTA sync (in test:mvp)
npm run impact-providers:sync:self-test       # shared Impact catalog matcher
npm run impact-providers:prices:self-test     # exact-ID snapshot writer
npm run prices:history:prune:self-test        # history retention statement shape
npm run events:backfill-timezones:self-test   # Discovery timezone backfill decisions (in test:mvp)
npm run providers:sync:tm:self-test           # Ticketmaster withhold rules + the stable reason-code
                                              #   catalogue they emit (in test:mvp)
npm run providers:sync:tm:write-pr:self-test  # new-shows write-to-PR partitioning and candidate rows
                                              #   (in test:mvp)
npm run test:tm-ingestion-outcomes            # per-candidate ingestion accounting: added / existing
                                              #   duplicate / withheld, totals, capped samples
                                              #   (in test:mvp)
```

### Exact-event link coverage (before changing CTA gates or provider matchers)

```bash
npm run report:link-coverage                  # 0/1/2/3+ publishable CTAs per upcoming event,
                                              #   low-coverage events grouped by artist/country/cause
npm run report:link-coverage:json             # same, machine-readable
npm run report:link-coverage:check            # fails on any zero-link upcoming event (in test:mvp);
                                              #   one-link events are a reported warning, not a failure
```

### Analytics / commercial funnel (before changing measurement code)

```bash
npm run test:funnel-analytics                 # event validation, duplicate prevention, redirect
                                              #   tracking, dimension classification, schema
                                              #   tolerance (in test:mvp)
npm run report:commercial-funnel:self-test    # read-only report aggregation + SQL safety (in test:mvp)
npm run report:affiliate-performance:self-test # Impact Actions x TTC click join, self-test only (in test:mvp)
npm run report:funnel:self-test               # legacy provider/CTA-location report (in test:mvp)
npm run report:web-vitals:self-test           # percentile aggregation + low-sample warnings
npm run report:web-vitals -- --days 28        # read-only mobile p50/p75/p95 by route/navigation
```

Touching `functions/api/analytics.js`, `functions/api/out.js`, `functions/_funnel.js`,
`functions/_analytics-write.js`, or the client beacon in `public/app.js` means running all four.
Metric definitions and the authoritative-source rule live in [docs/COMMERCIAL_FUNNEL.md](docs/COMMERCIAL_FUNNEL.md).

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

Batch onboarding (preferred): `npm run artists:onboard:propose` → review the identity manifest → shells → `npm run artists:promote:batch` (≤20 artists/PR, per-artist human browser spot-check checklist in the PR body). Single-artist path, phase gates, and field templates: [.claude/skills/artist-onboarding/SKILL.md](.claude/skills/artist-onboarding/SKILL.md). Every artist requires human browser verification before promotion — never auto-publish.

---

## PR Checklist

- [ ] Relevant syntax checks pass (`node --check`)
- [ ] Event data validated (`npm run events:validate`) if `events.json` was touched
- [ ] `npm run events:sync` run if any data files changed
- [ ] `npm run blog:build` run if any `content/blog/*.md` was changed
- [ ] `npm run guides:build` run if any `content/guides/*.md` was changed
- [ ] `npm run content:provenance` run if any guide or trust-page copy was changed
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
