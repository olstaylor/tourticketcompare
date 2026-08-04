# D1 migrations (`tourticketcompare-demand`)

Numbered SQL files applied to the production D1 database `tourticketcompare-demand`.

| File | Purpose | How it was applied |
|---|---|---|
| `0001_demand.sql` | Email signup + base analytics tables | `npm run demand:migrate` |
| `0002_analytics_click_fields.sql` | Extra analytics click fields | Applied manually via `wrangler d1 execute` |
| `0003_provider_pricing_cache.sql` | `provider_pricing_cache` table (SeatGeek price snapshots) | Applied manually via `wrangler d1 execute` |
| `0004_provider_pricing_cache_source.sql` | `source` column on the pricing cache | Applied manually via `wrangler d1 execute` |
| `0005_daily_provider_calls.sql` | `daily_provider_calls` rate-cap table (used by `functions/api/shows.js`) | Applied manually via `wrangler d1 execute` (originally named `001_daily_provider_calls.sql`; renamed 2026-07-07 for consistent numbering) |
| `0006_provider_pricing_history.sql` | `provider_pricing_history` immutable provider-attributed price observations | Covered by the `0007` bootstrap (same `CREATE TABLE IF NOT EXISTS` schema) |
| `0007_bootstrap_provider_pricing_schema.sql` | Idempotent bootstrap of the pricing cache + history tables and indexes (`CREATE ... IF NOT EXISTS` only, no destructive statements) | `bootstrap-provider-pricing-schema.yml` workflow (`workflow_dispatch`, `apply: true`); added 2026-07-10 |
| `0008_analytics_commercial_funnel.sql` | Commercial funnel dimensions on `analytics_events` (page type, landing path, event id/date/city/venue, CTA location, destination category, affiliate flag, device, acquisition source, UTM, click id) plus supporting indexes | **Not yet applied** — apply with `wrangler d1 execute` (see below); added 2026-07-31. Confirmed still unapplied on 2026-08-04 by reading the live column list of `analytics_events`, which ends at `link_id`. |

Notes:

- `npm run demand:migrate` runs **only** `0001_demand.sql`. Later migrations were applied
  one-off with `wrangler d1 execute tourticketcompare-demand --remote --file migrations/<file>`,
  except `0007`, which is applied via its dedicated GitHub Actions workflow and is safe to
  re-run (idempotent).
- New migrations should take the next `NNNN_` number and be applied the same way, then
  recorded here. Confirm live schema state through the price-snapshot run summaries and
  `/api/health` rather than assuming from this file.
- `0008` is purely additive (`ADD COLUMN` / `CREATE INDEX IF NOT EXISTS`). The analytics
  writers in `functions/api/analytics.js`, `functions/api/out.js` and `functions/api/signup.js`
  fall back to the previous column set when the new columns are absent, so the code is safe to
  deploy before or after this migration is applied — the new dimensions are simply NULL until
  it lands. Apply it with:
  `npx wrangler d1 execute tourticketcompare-demand --remote --file migrations/0008_analytics_commercial_funnel.sql`
  Rationale and the metric definitions are in [../docs/COMMERCIAL_FUNNEL.md](../docs/COMMERCIAL_FUNNEL.md).
