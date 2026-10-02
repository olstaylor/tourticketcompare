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
| `0007_bootstrap_provider_pricing_schema.sql` | Idempotent bootstrap of the pricing cache + history + daily-rollup tables and indexes (`CREATE ... IF NOT EXISTS` only, no destructive statements) | `bootstrap-provider-pricing-schema.yml` workflow (`workflow_dispatch`, `apply: true`); added 2026-07-10, extended with `provider_pricing_daily` 2026-09-14 |
| `0008_analytics_commercial_funnel.sql` | Commercial funnel dimensions on `analytics_events` (page type, landing path, event id/date/city/venue, CTA location, destination category, affiliate flag, device, acquisition source, UTM, click id) plus supporting indexes | **Applied 2026-08-07** — confirmed via a live `PRAGMA table_info(analytics_events)` read, which now lists all 15 new columns through `click_id`, plus the four new indexes. Added 2026-07-31. |
| `0009_impact_reconciliation_eligibility.sql` | Records whether TTC actually propagated the click ID into an Impact base-tracking URL; existing rows remain NULL and are not treated as reconcilable | **Applied 2026-08-26** — confirmed via a live `PRAGMA table_info(analytics_events)` read; the nullable integer column is present at column 29. |
| `0010_provider_price_checks.sql` | `provider_price_checks`: when each price lane last looked for a listed price on an event, and whether it found one. Read by the router to date a card's "no listed price" note | **Self-applying.** Both snapshot writers prefix their check SQL with the same `CREATE TABLE IF NOT EXISTS`, so the first scheduled run after merge creates it. Added 2026-09-24. |
| `0011_provider_price_history_source_index.sql` | Additive index for the existing recorded-price read path, matching its `event_id`, `provider`, `source` and `observed_at` predicates | **Pending application.** Apply once with `wrangler d1 execute` after merge, then confirm with `PRAGMA index_list(provider_pricing_history)`. Added 2026-10-01. |
| `0012_provider_pricing_daily_rollup.sql` | Never-pruned `provider_pricing_daily` rollup (one row per event × provider × source × currency × UTC day: min/max/first/last of `low_price`, plus an observation count) and a nullable `event_date` column on `provider_pricing_history` | **Applied 2026-10-02** by agent at the owner's request, through the D1 API: `provider_pricing_daily` and its two indexes exist and `provider_pricing_history` has `event_date`. Backfilled the same day from 2026-07-22 (77,530 rows across the three numeric lanes; observation counts match the raw table). Added 2026-09-14. |
| `0013_email_alerts.sql` | `email_alert_sends` (one row per date-alert email, with its unsubscribe token) and `email_unsubscribes` (opt-outs from that link) | **Self-applying.** `scripts/send-date-alerts.mjs` (send mode) and `functions/api/unsubscribe.js` run the same `CREATE ... IF NOT EXISTS` statements first, so nothing needs applying by hand. Added 2026-10-02. |

Notes:

- `npm run demand:migrate` runs **only** `0001_demand.sql`. Later migrations were applied
  one-off with `wrangler d1 execute tourticketcompare-demand --remote --file migrations/<file>`,
  except `0007`, which is applied via its dedicated GitHub Actions workflow and is safe to
  re-run (idempotent).
- New migrations should take the next `NNNN_` number and be applied the same way, then
  recorded here. Confirm live schema state through the price-snapshot run summaries and
  `/api/health` rather than assuming from this file.
- `0012` is purely additive and **not idempotent** — its `ALTER TABLE ... ADD COLUMN` fails on
  a second run. Apply it once, after `0007`:
  `npx wrangler d1 execute tourticketcompare-demand --remote --file migrations/0012_provider_pricing_daily_rollup.sql`
  `0007` deliberately does *not* add `event_date` to its `provider_pricing_history`
  `CREATE TABLE`, so that `0012`'s `ALTER` stays valid against a freshly bootstrapped
  database. Run them in number order.
  **Order against the code does not matter, in either direction.** Both snapshot writers
  probe the live schema once per run (`scripts/lib/pricing-schema.mjs`) and emit the column
  set the database actually has, exactly as the analytics writers do for the `0008` columns.
  Against a database without this migration they write the previous column set and
  `event_date` is simply not recorded; the rollup reports
  `provider_pricing_daily does not exist — apply migration 0012` and exits clean. The probe
  fails closed to the previous column set, because the cost of wrongly omitting `event_date`
  is one run of history rows missing an optional field, while the cost of wrongly including
  it is a failed write — and a failed history insert takes the cache upsert down with it,
  which with the 24h freshness window blanks every price on the site.
  No reader requires either the column or the table. The 90-day retention prune in
  `scripts/prune-provider-pricing-history.mjs` names `provider_pricing_history` explicitly
  and cannot reach the rollup.
- `0008` is purely additive (`ADD COLUMN` / `CREATE INDEX IF NOT EXISTS`). The analytics
  writers in `functions/api/analytics.js`, `functions/api/out.js` and `functions/api/signup.js`
  fall back to the previous column set when the new columns are absent, so the code is safe to
  deploy before or after this migration is applied — the new dimensions are simply NULL until
  it lands. Apply it with:
  `npx wrangler d1 execute tourticketcompare-demand --remote --file migrations/0008_analytics_commercial_funnel.sql`
  Rationale and the metric definitions are in [../docs/COMMERCIAL_FUNNEL.md](../docs/COMMERCIAL_FUNNEL.md).
