# Indexable-surface audit

Generated: 2026-07-31T13:21:15.802Z (read-only, rendered in-process — no live crawl)

## Totals

- rendered routes: 497
- indexable: 220
- non-indexable: 277
- stored baseline indexable: 220 (+0)

## Routes by type

| Type | Rendered | Indexable | Non-indexable | Indexable share |
|---|---|---|---|---|
| home | 1 | 1 | 0 | 100% |
| index | 4 | 4 | 0 | 100% |
| static | 7 | 7 | 0 | 100% |
| guide | 17 | 17 | 0 | 100% |
| artist | 40 | 18 | 22 | 45% |
| city | 81 | 37 | 44 | 46% |
| venue | 109 | 44 | 65 | 40% |
| artist-city | 238 | 92 | 146 | 39% |

## Reasons for exclusion

| Type | Reason | Routes |
|---|---|---|
| artist | no_upcoming_shows | 22 |
| artist | artist_not_editorially_indexable | 14 |
| city | below_show_threshold | 43 |
| city | below_artist_threshold | 31 |
| city | no_publishable_destination | 3 |
| venue | below_show_threshold | 60 |
| venue | below_artist_threshold | 56 |
| venue | no_publishable_destination | 4 |
| artist-city | below_show_threshold | 146 |

## Losing indexability within 14 days

| Route | Type | Last tracked show | Days left | Why |
|---|---|---|---|---|
| /artists/morgan-wallen | artist | 2026-08-01 | 1 | runs_out_of_shows |
| /artists/morgan-wallen/tickets/philadelphia-united-states | artist-city | 2026-08-01 | 1 | runs_out_of_shows |
| /artists/bts/tickets/east-rutherford-united-states | artist-city | 2026-08-03 | 2 | runs_out_of_shows |
| /artists/summer-walker/tickets/london-united-kingdom | artist-city | 2026-08-02 | 2 | runs_out_of_shows |
| /artists/tame-impala/tickets/charlotte-united-states | artist-city | 2026-08-02 | 2 | runs_out_of_shows |
| /artists/zach-bryan/tickets/san-diego-united-states | artist-city | 2026-08-02 | 2 | runs_out_of_shows |
| /artists/tame-impala/tickets/nashville-united-states | artist-city | 2026-08-06 | 5 | runs_out_of_shows |
| /artists/ariana-grande/tickets/chicago-united-states | artist-city | 2026-08-06 | 6 | runs_out_of_shows |
| /artists/bts/tickets/foxborough-united-states | artist-city | 2026-08-07 | 6 | runs_out_of_shows |
| /artists/zach-bryan/tickets/denver-united-states | artist-city | 2026-08-15 | 14 | falls_below_threshold |
| /cities/san-diego-united-states | city | 2026-10-28 | 89 | falls_below_threshold |

`runs_out_of_shows` = the route's last tracked date passes. `falls_below_threshold` = the route keeps future dates but drops under a count gate, which is why this section re-runs the real gates at the horizon rather than looking at the last show date.

## Indexable routes with zero internal links

- none

## Indexable routes with no future events

- none

## Title patterns among indexable routes

| Routes | Share | Pattern |
|---|---|---|
| 92 | 41.8% | `{} Tickets in {} | Compare Prices` |
| 44 | 20% | `{} Concerts in {} | Tickets` |
| 37 | 16.8% | `Concerts in {} | Upcoming Shows & Tickets` |
| 18 | 8.2% | `{} Tickets & Tour Dates | TourTicketCompare` |
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

Baseline generated 2026-07-31T13:11:53.766Z.

| Type | Baseline | Same gates @ baseline date | Now | Clock | Residual | Classification |
|---|---|---|---|---|---|---|
| home | 1/1 | 1/1 | 1/1 | +0 | +0 (tol 3) | unchanged |
| index | 4/4 | 4/4 | 4/4 | +0 | +0 (tol 3) | unchanged |
| static | 7/7 | 7/7 | 7/7 | +0 | +0 (tol 3) | unchanged |
| guide | 17/17 | 17/17 | 17/17 | +0 | +0 (tol 3) | unchanged |
| artist | 18/40 | 18/40 | 18/40 | +0 | +0 (tol 3) | unchanged |
| city | 37/81 | 37/81 | 37/81 | +0 | +0 (tol 4) | unchanged |
| venue | 44/109 | 44/109 | 44/109 | +0 | +0 (tol 5) | unchanged |
| artist-city | 92/238 | 92/238 | 92/238 | +0 | +0 (tol 10) | unchanged |

**Clock** is what the calendar alone accounts for: the same gates re-run over the same event data at the baseline's timestamp versus now. **Residual** is everything left over — a code, gate, or data change. `inventory-decay` / `inventory-growth` are expected. `structural` (residual loss beyond tolerance) fails `--check`; `unexplained-growth` only warns, because an artist batch or a big discovery run produces it legitimately.

## Warnings (non-blocking)

- none

## Problems

- none
