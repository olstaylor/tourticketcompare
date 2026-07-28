# TourTicketCompare deployment

Production runs on Cloudflare Pages with Pages Functions. Normal production changes deploy from merges to GitHub `main`; manual CLI deployment is an emergency/operator path.

Current binding presence, provider rollout state, and operational risks are tracked in [PROJECT_STATUS.md](../PROJECT_STATUS.md).

## Local development

```bash
npm install
npm run dev
```

The preview listens on `http://localhost:3000`; check `http://localhost:3000/api/health`.

Run the combined suite before a deploy:

```bash
npm run test:mvp
git diff --check
```

Use targeted syntax/data checks from [CONTRIBUTING.md](../CONTRIBUTING.md) while developing.

## Normal production deploy

1. Open a pull request against `main`.
2. Run the relevant validation and ensure CI passes.
3. Merge the reviewed pull request.
4. Cloudflare Pages Git integration builds and deploys the repository.
5. Verify health, representative routes, and affected provider redirects.

No standalone Worker or Vercel build is required.

## Manual deploy

Use the guarded command:

```bash
npm run deploy:pages:safe
```

It runs `npm run test:mvp` before `wrangler pages deploy public`. The unguarded `npm run deploy:pages` command exists for diagnosed emergencies only; record why the preflight could not be used.

## Post-deploy verification

```bash
curl -fsS https://tourticketcompare.com/api/health
curl -fsSI https://www.tourticketcompare.com/
```

Confirm:

- health returns `ok: true` and `runtime: "cloudflare-pages-functions"`;
- the response reports configuration presence without secret values;
- `www` redirects to the apex domain;
- the home page and one affected artist/guide route return route-specific HTML;
- affected `/api/out` redirects either reach the verified provider destination or fail closed with diagnostic JSON; and
- price lanes, when in scope, include the expected source and `fetchedAt` freshness.

Never place credentials in browser URLs, command output, issue text, or screenshots.

## Search-engine notification (IndexNow)

`indexnow-ping.yml` submits the live sitemap's URL list to [IndexNow](https://www.indexnow.org) (Bing/Yandex-class engines, which also feed ChatGPT search and Copilot) so newly verified shows are announced instead of waiting for a scheduled recrawl. It fires on pushes to `main` that touch the data or code determining which routes are indexable — including the auto-merged sync lanes — and on manual dispatch (preview by default).

The job derives the sitemap from the merged commit by running the real `functions/sitemap.xml.js` against a filesystem-backed assets stub, then polls production until it serves that URL set before submitting, so a ping fired straight after a merge does not submit the pre-deploy list. Convergence is best-effort: on timeout it still submits whatever production currently serves and logs the missing URLs, because submitting a live URL list is never harmful and the next data change pings again.

It publishes nothing and changes no data. Google does not participate in IndexNow — it is not a substitute for Search Console coverage.

```bash
npm run indexnow:ping:self-test           # offline checks, no network
npm run indexnow:ping -- --dry-run        # list what would be submitted
npm run indexnow:ping -- --await-deploy   # wait for the deploy, then submit
```

Submission requires `public/9ffca7bd48067983c70d2ce6601728d3.txt` to be served at the apex; the script verifies this first and refuses to ping if it is missing.

## Cloudflare Pages configuration

Production requires:

- D1 binding: `DEMAND_DB`;
- non-secret safety flags such as `MOCK_MODE=false` and `ALLOW_MOCK_PRICES=false`;
- provider public/price-display flags documented in [PROVIDER_DATA_POLICY.md](PROVIDER_DATA_POLICY.md); and
- server-side credentials for the provider lanes that are enabled.

Provider credential families currently used by code include network-level Impact credentials, SeatGeek, Vivid Seats, and optional marketplace-provider overrides. Exact current configuration belongs in `PROJECT_STATUS.md` and should be verified via `/api/health` plus a fail-closed redirect test. Obsolete `IMPACT_TICKETMASTER_*` values should not be restored.

`wrangler.toml` is useful for local/CLI defaults but does not replace Cloudflare Pages dashboard configuration for Git-integrated production deployments.

## GitHub Actions configuration

Automation may require:

- `TICKETMASTER_API_KEY` for Discovery-based event checks and sync;
- `SEATGEEK_CLIENT_ID` / `SEATGEEK_CLIENT_SECRET` for SeatGeek API lanes;
- provider-specific or approved fallback Impact credentials for catalog/tracking lanes; and
- `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` for remote D1 writes.

Missing credentials must cause a safe no-op or explicit failure, never guessed data or an untracked redirect.

### Repository write capability

Direct-to-`main` capability exists in exactly one workflow: `nightly-data-sync.yml`, and only for its gated lossless factual updates (see [PROVIDER_SYNC.md](PROVIDER_SYNC.md)). The price-snapshot workflows (`impact-marketplace-price-snapshots.yml`, `vividseats-price-snapshots.yml`) write only to D1, never to the repository. Auto-merge-capable workflows: `tm-new-shows-pr.yml`, `seatgeek-cta-sync.yml`, `vividseats-cta-sync.yml`, and — scheduled runs only — `impact-marketplace-provider-sync.yml`; each only after its in-run validation suite passes, and a failed merge leaves the PR open for a human. `indexnow-ping.yml` writes to neither the repository nor D1 — it only submits already-public sitemap URLs to an external endpoint, and asserts a clean working tree at the end. Every other workflow is report-only or opens a review-only PR that never auto-merges. Widening any of these capabilities is an owner decision, not a maintenance change.

## Provider snapshot operations

Scheduled snapshot workflows write approved exact-event observations to `provider_pricing_cache`; public traffic reads only D1.

- Vivid Seats has a dedicated scheduled snapshot workflow. The SeatGeek snapshot workflow is dispatch-only and produces no usable rows: SeatGeek's API returns null pricing statistics for this client (permanent limitation — SeatGeek is a CTA-only provider; see `PROJECT_STATUS.md`).
- `impact-marketplace-price-snapshots.yml` schedules only providers whose feed has an approved numeric-price lane; providers without numeric price data remain manual and display-disabled.
- `bootstrap-provider-pricing-schema.yml` is the manual idempotent schema bootstrap for the cache/history tables; its migration is tracked in `migrations/README.md`.
- A run summary must make `eligible`, `fetched`, `usable`, `written`, `skipped`, `stale`, and `failed` outcomes explicit.
- Failed or unusable observations must not overwrite a fresh cache row.

Treat workflow YAML and [PROJECT_STATUS.md](../PROJECT_STATUS.md) as the current schedule/activation sources; do not copy run numbers or eligible-row counts into this stable runbook.

## D1 migrations

The applied/pending ledger, including the idempotent pricing-schema bootstrap migration, is [migrations/README.md](../migrations/README.md). Apply later migrations explicitly with `wrangler d1 execute`; do not assume `npm run demand:migrate` applies more than the base migration.

Before applying a migration:

1. confirm the target database and migration ledger;
2. back up/export affected data when appropriate;
3. run the exact migration once;
4. verify schema and dependent endpoints; and
5. update the ledger in the same change.

## Rollback

For a bad Git-integrated deploy, use Cloudflare Pages deployment rollback or revert the offending commit through a reviewed pull request. Do not reintroduce the retired Worker/Vercel paths as an ad hoc rollback mechanism.
