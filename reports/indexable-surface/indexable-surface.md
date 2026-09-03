# Indexable-surface audit

Generated: 2026-09-03T15:26:27.712Z (read-only, rendered in-process — no live crawl)

## Totals

- rendered routes: 1134
- indexable: 317
- non-indexable: 817
- stored baseline indexable: 311 (+6)

## Routes by type

| Type | Rendered | Indexable | Non-indexable | Indexable share |
|---|---|---|---|---|
| home | 1 | 1 | 0 | 100% |
| index | 5 | 5 | 0 | 100% |
| static | 9 | 9 | 0 | 100% |
| guide | 18 | 18 | 0 | 100% |
| blog-post | 4 | 4 | 0 | 100% |
| blog-tag | 3 | 3 | 0 | 100% |
| artist | 50 | 42 | 8 | 84% |
| city | 173 | 56 | 117 | 32% |
| venue | 299 | 73 | 226 | 24% |
| artist-city | 572 | 106 | 466 | 19% |

## Reasons for exclusion

| Type | Reason | Routes |
|---|---|---|
| artist | artist_not_editorially_indexable | 8 |
| artist | no_upcoming_shows | 8 |
| city | below_show_threshold | 117 |
| city | below_artist_threshold | 83 |
| venue | below_show_threshold | 220 |
| venue | below_artist_threshold | 182 |
| artist-city | below_show_threshold | 466 |

## Losing indexability within 14 days

| Route | Type | Last tracked show | Days left | Why |
|---|---|---|---|---|
| /artists/ed-sheeran/tickets/east-rutherford-united-states | artist-city | 2026-09-05 | 2 | runs_out_of_shows |
| /artists/jay-z/tickets/london-united-kingdom | artist-city | 2026-09-05 | 2 | runs_out_of_shows |
| /artists/bruno-mars/tickets/foxborough-united-states | artist-city | 2026-09-06 | 3 | runs_out_of_shows |
| /artists/bts/tickets/inglewood-united-states | artist-city | 2026-09-07 | 3 | runs_out_of_shows |
| /artists/karol-g/tickets/el-paso-united-states | artist-city | 2026-09-07 | 3 | runs_out_of_shows |
| /artists/tame-impala/tickets/vancouver-canada | artist-city | 2026-09-07 | 3 | runs_out_of_shows |
| /artists/bruno-mars/tickets/tampa-united-states | artist-city | 2026-09-13 | 10 | runs_out_of_shows |
| /artists/charli-xcx/tickets/brooklyn-united-states | artist-city | 2026-09-15 | 12 | runs_out_of_shows |
| /cities/east-rutherford-united-states | city | 2026-09-18 | 15 | falls_below_threshold |
| /venues/metlife-stadium-east-rutherford | venue | 2026-09-18 | 15 | falls_below_threshold |
| /cities/san-antonio-united-states | city | 2026-11-07 | 64 | falls_below_threshold |
| /venues/raymond-james-stadium-tampa | venue | 2026-11-07 | 65 | falls_below_threshold |
| /cities/el-paso-united-states | city | 2027-01-31 | 149 | falls_below_threshold |
| /cities/indianapolis-united-states | city | 2027-03-26 | 204 | falls_below_threshold |
| /venues/tottenham-hotspur-stadium-london | venue | 2027-07-06 | 306 | falls_below_threshold |

`runs_out_of_shows` = the route's last tracked date passes. `falls_below_threshold` = the route keeps future dates but drops under a count gate, which is why this section re-runs the real gates at the horizon rather than looking at the last show date.

## Indexable routes with zero internal links

- none

## Indexable routes with no future events

- /artists/ariana-grande
- /artists/bad-bunny
- /artists/beyonce
- /artists/in-flames
- /artists/jelly-roll
- /artists/morgan-wallen
- /artists/post-malone
- /artists/raye
- /artists/rosalia
- /artists/tate-mcrae

## Title patterns among indexable routes

| Routes | Share | Pattern |
|---|---|---|
| 105 | 33.1% | `{} Tickets in {} | Compare Prices` |
| 71 | 22.4% | `{} Concerts in {} | Tickets` |
| 56 | 17.7% | `Concerts in {} | Upcoming Shows & Tickets` |
| 41 | 12.9% | `{} Tickets & Tour Dates | TourTicketCompare` |
| 1 | 0.3% | `Compare Concert Tickets & Tour Dates | TourTicketCompare` |
| 1 | 0.3% | `Compare Concert Ticket Prices by Site | TourTicketCompare` |
| 1 | 0.3% | `Artists | TourTicketCompare` |
| 1 | 0.3% | `Concert Ticket Buying Guides | TourTicketCompare` |
| 1 | 0.3% | `How TourTicketCompare Works` |
| 1 | 0.3% | `Currency Converter for Concert Tickets | TourTicketCompare` |
| 1 | 0.3% | `About TourTicketCompare` |
| 1 | 0.3% | `Contact TourTicketCompare` |

### Exact duplicate titles

- none

## Traffic

- not available: no export at reports/analytics/route-traffic.json
- see the header of scripts/audit-indexable-surface.mjs for the export format

## Change against the stored baseline

Baseline generated 2026-09-02T08:23:02.995Z.

| Type | Baseline | Same gates @ baseline date | Now | Clock | Residual | Classification |
|---|---|---|---|---|---|---|
| home | 1/1 | 1/1 | 1/1 | +0 | +0 (tol 3) | unchanged |
| index | 4/5 | 5/5 | 5/5 | +0 | +1 (tol 3) | inventory-growth |
| static | 9/9 | 9/9 | 9/9 | +0 | +0 (tol 3) | unchanged |
| guide | 18/18 | 18/18 | 18/18 | +0 | +0 (tol 3) | unchanged |
| blog-post | 0/0 | 4/4 | 4/4 | +0 | +4 (tol 3) | unexplained-growth |
| blog-tag | 0/0 | 3/3 | 3/3 | +0 | +3 (tol 3) | inventory-growth |
| artist | 42/50 | 42/50 | 42/50 | +0 | +0 (tol 5) | unchanged |
| city | 56/173 | 56/173 | 56/173 | +0 | +0 (tol 6) | unchanged |
| venue | 75/299 | 75/299 | 73/299 | -2 | +0 (tol 8) | inventory-decay |
| artist-city | 106/575 | 106/575 | 106/572 | +0 | +0 (tol 11) | unchanged |

**Clock** is what the calendar alone accounts for: the same gates re-run over the same event data at the baseline's timestamp versus now. **Residual** is everything left over — a code, gate, or data change. `inventory-decay` / `inventory-growth` are expected. `structural` (residual loss beyond tolerance) fails `--check`; `unexplained-growth` only warns, because an artist batch or a big discovery run produces it legitimately.

## Warnings (non-blocking)

- blog-post: 4 more indexable route(s) than the baseline, beyond what the calendar explains (tolerance 3). Expected after an artist batch or a large discovery run.

## Problems

- none
