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
| `0008_authorized_event_page_pricing.sql` | Adds exact source URLs and the canonical provider-event-ID 24-hour Ticketmaster/SeatGeek retrieval ledger | Pending manual application via `wrangler d1 execute` |

Notes:

- `npm run demand:migrate` runs **only** `0001_demand.sql`. Later migrations were applied
  one-off with `wrangler d1 execute tourticketcompare-demand --remote --file migrations/<file>`,
  except `0007`, which is applied via its dedicated GitHub Actions workflow and is safe to
  re-run (idempotent).
- Rows marked pending have not been proven applied in production. New migrations should take
  the next `NNNN_` number and be applied the same way, then recorded here. Confirm live schema
  state through the price-snapshot run summaries and `/api/health` rather than assuming from
  this file.
