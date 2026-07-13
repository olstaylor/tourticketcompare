# D1 migrations (`tourticketcompare-demand`)

Numbered SQL files applied to the production D1 database `tourticketcompare-demand`.

| File | Purpose | How it was applied |
|---|---|---|
| `0001_demand.sql` | Email signup + base analytics tables | `npm run demand:migrate` |
| `0002_analytics_click_fields.sql` | Extra analytics click fields | Applied manually via `wrangler d1 execute` |
| `0003_provider_pricing_cache.sql` | `provider_pricing_cache` table (SeatGeek price snapshots) | Applied manually via `wrangler d1 execute` |
| `0004_provider_pricing_cache_source.sql` | `source` column on the pricing cache | Applied manually via `wrangler d1 execute` |
| `0005_daily_provider_calls.sql` | `daily_provider_calls` rate-cap table (used by `functions/api/shows.js`) | Applied manually via `wrangler d1 execute` (originally named `001_daily_provider_calls.sql`; renamed 2026-07-07 for consistent numbering) |
| `0006_provider_pricing_history.sql` | `provider_pricing_history` immutable provider-attributed price observations | Pending manual application via `wrangler d1 execute` |
| `0008_normalized_provider_pricing.sql` | Additive integer-minor normalized observations/current prices | Apply before normalized ingestion; legacy tables remain untouched |

Notes:

- `npm run demand:migrate` runs **only** `0001_demand.sql`. Later migrations were applied
  one-off with `wrangler d1 execute tourticketcompare-demand --remote --file migrations/<file>`.
- All migrations above are already applied in production. New migrations should take the
  next `NNNN_` number and be applied the same way, then recorded here.
