# Indexable-surface audit

Generated: 2026-08-04T21:40:23.656Z (read-only, rendered in-process — no live crawl)

## Totals

- rendered routes: 498
- indexable: 221
- non-indexable: 277
- stored baseline indexable: 227 (-6)

## Routes by type

| Type | Rendered | Indexable | Non-indexable | Indexable share |
|---|---|---|---|---|
| home | 1 | 1 | 0 | 100% |
| index | 5 | 5 | 0 | 100% |
| static | 7 | 7 | 0 | 100% |
| guide | 17 | 17 | 0 | 100% |
| blog-post | 3 | 3 | 0 | 100% |
| blog-tag | 3 | 2 | 1 | 67% |
| artist | 40 | 17 | 23 | 43% |
| city | 81 | 36 | 45 | 44% |
| venue | 106 | 45 | 61 | 42% |
| artist-city | 235 | 88 | 147 | 37% |

## Reasons for exclusion

| Type | Reason | Routes |
|---|---|---|
| artist | no_upcoming_shows | 23 |
| artist | artist_not_editorially_indexable | 14 |
| city | below_show_threshold | 44 |
| city | below_artist_threshold | 31 |
| venue | below_show_threshold | 57 |
| venue | below_artist_threshold | 53 |
| artist-city | below_show_threshold | 147 |
| blog-tag | editorial_or_static_route | 1 |

## Losing indexability within 14 days

| Route | Type | Last tracked show | Days left | Why |
|---|---|---|---|---|
| /artists/tame-impala/tickets/nashville-united-states | artist-city | 2026-08-06 | 1 | runs_out_of_shows |
| /artists/ariana-grande/tickets/chicago-united-states | artist-city | 2026-08-06 | 2 | runs_out_of_shows |
| /artists/bts/tickets/foxborough-united-states | artist-city | 2026-08-07 | 2 | runs_out_of_shows |
| /artists/zach-bryan/tickets/denver-united-states | artist-city | 2026-08-15 | 10 | runs_out_of_shows |
| /artists/bts/tickets/arlington-united-states | artist-city | 2026-08-17 | 12 | runs_out_of_shows |
| /cities/arlington-united-states | city | 2026-10-24 | 81 | falls_below_threshold |
| /venues/at-t-stadium-arlington | venue | 2026-10-24 | 81 | falls_below_threshold |
| /cities/minneapolis-united-states | city | 2026-11-02 | 89 | falls_below_threshold |

`runs_out_of_shows` = the route's last tracked date passes. `falls_below_threshold` = the route keeps future dates but drops under a count gate, which is why this section re-runs the real gates at the horizon rather than looking at the last show date.

## Indexable routes with zero internal links

- none

## Indexable routes with no future events

- none

## Title patterns among indexable routes

| Routes | Share | Pattern |
|---|---|---|
| 87 | 39.4% | `{} Tickets in {} | Compare Prices` |
| 45 | 20.4% | `{} Concerts in {} | Tickets` |
| 36 | 16.3% | `Concerts in {} | Upcoming Shows & Tickets` |
| 17 | 7.7% | `{} Tickets & Tour Dates | TourTicketCompare` |
| 1 | 0.5% | `Compare Concert Tickets & Tour Dates | TourTicketCompare` |
| 1 | 0.5% | `Compare Concert Ticket Prices | TourTicketCompare` |
| 1 | 0.5% | `Artists | TourTicketCompare` |
| 1 | 0.5% | `Concert Ticket Buying Guides | TourTicketCompare` |
| 1 | 0.5% | `How TourTicketCompare Works` |
| 1 | 0.5% | `Currency Converter for Concert Tickets | TourTicketCompare` |
| 1 | 0.5% | `About TourTicketCompare` |
| 1 | 0.5% | `Contact TourTicketCompare` |

### Exact duplicate titles

- none

## Traffic

- not available: no export at reports/analytics/route-traffic.json
- see the header of scripts/audit-indexable-surface.mjs for the export format

## Change against the stored baseline

Baseline generated 2026-08-01T00:54:49.492Z.

| Type | Baseline | Same gates @ baseline date | Now | Clock | Residual | Classification |
|---|---|---|---|---|---|---|
| home | 1/1 | 1/1 | 1/1 | +0 | +0 (tol 3) | unchanged |
| index | 5/5 | 5/5 | 5/5 | +0 | +0 (tol 3) | unchanged |
| static | 7/7 | 7/7 | 7/7 | +0 | +0 (tol 3) | unchanged |
| guide | 17/17 | 17/17 | 17/17 | +0 | +0 (tol 3) | unchanged |
| blog-post | 3/3 | 3/3 | 3/3 | +0 | +0 (tol 3) | unchanged |
| blog-tag | 2/3 | 2/3 | 2/3 | +0 | +0 (tol 3) | unchanged |
| artist | 18/40 | 18/40 | 17/40 | -1 | +0 (tol 3) | inventory-decay |
| city | 37/81 | 37/81 | 36/81 | -1 | +0 (tol 4) | inventory-decay |
| venue | 45/108 | 45/108 | 45/106 | +0 | +0 (tol 5) | unchanged |
| artist-city | 92/241 | 92/241 | 88/235 | -4 | +0 (tol 10) | inventory-decay |

**Clock** is what the calendar alone accounts for: the same gates re-run over the same event data at the baseline's timestamp versus now. **Residual** is everything left over — a code, gate, or data change. `inventory-decay` / `inventory-growth` are expected. `structural` (residual loss beyond tolerance) fails `--check`; `unexplained-growth` only warns, because an artist batch or a big discovery run produces it legitimately.

## Warnings (non-blocking)

- none

## Problems

- none
