# Indexable-surface audit

Generated: 2026-08-23T18:47:44.169Z (read-only, rendered in-process — no live crawl)

## Totals

- rendered routes: 669
- indexable: 262
- non-indexable: 407
- stored baseline indexable: 227 (+35)

## Routes by type

| Type | Rendered | Indexable | Non-indexable | Indexable share |
|---|---|---|---|---|
| home | 1 | 1 | 0 | 100% |
| index | 5 | 5 | 0 | 100% |
| static | 7 | 7 | 0 | 100% |
| guide | 18 | 18 | 0 | 100% |
| blog-post | 3 | 3 | 0 | 100% |
| blog-tag | 3 | 2 | 1 | 67% |
| artist | 40 | 32 | 8 | 80% |
| city | 108 | 46 | 62 | 43% |
| venue | 154 | 54 | 100 | 35% |
| artist-city | 330 | 94 | 236 | 28% |

## Reasons for exclusion

| Type | Reason | Routes |
|---|---|---|
| artist | artist_not_editorially_indexable | 8 |
| artist | no_upcoming_shows | 8 |
| city | below_show_threshold | 62 |
| city | below_artist_threshold | 47 |
| venue | below_show_threshold | 93 |
| venue | below_artist_threshold | 88 |
| artist-city | below_show_threshold | 236 |
| blog-tag | editorial_or_static_route | 1 |

## Losing indexability within 14 days

| Route | Type | Last tracked show | Days left | Why |
|---|---|---|---|---|
| /artists/bruno-mars/tickets/east-rutherford-united-states | artist-city | 2026-08-26 | 3 | runs_out_of_shows |
| /artists/bts/tickets/chicago-united-states | artist-city | 2026-08-29 | 5 | runs_out_of_shows |
| /artists/ariana-grande/tickets/london-united-kingdom | artist-city | 2026-09-01 | 9 | runs_out_of_shows |
| /artists/bruno-mars/tickets/philadelphia-united-states | artist-city | 2026-09-02 | 10 | runs_out_of_shows |
| /artists/tame-impala/tickets/seattle-united-states | artist-city | 2026-09-03 | 10 | runs_out_of_shows |
| /artists/ed-sheeran/tickets/east-rutherford-united-states | artist-city | 2026-09-05 | 13 | runs_out_of_shows |
| /artists/jay-z/tickets/london-united-kingdom | artist-city | 2026-09-05 | 13 | runs_out_of_shows |
| /artists/bruno-mars/tickets/foxborough-united-states | artist-city | 2026-09-06 | 14 | falls_below_threshold |
| /artists/bts/tickets/inglewood-united-states | artist-city | 2026-09-07 | 14 | falls_below_threshold |
| /artists/karol-g/tickets/el-paso-united-states | artist-city | 2026-09-07 | 14 | falls_below_threshold |
| /artists/tame-impala/tickets/vancouver-canada | artist-city | 2026-09-07 | 14 | falls_below_threshold |
| /cities/east-rutherford-united-states | city | 2026-09-18 | 26 | falls_below_threshold |
| /venues/metlife-stadium-east-rutherford | venue | 2026-09-18 | 26 | falls_below_threshold |
| /venues/lincoln-financial-field-philadelphia | venue | 2026-09-19 | 27 | falls_below_threshold |
| /venues/alamodome-san-antonio | venue | 2026-09-24 | 31 | falls_below_threshold |
| /cities/minneapolis-united-states | city | 2026-11-02 | 70 | falls_below_threshold |
| /venues/target-center-minneapolis | venue | 2026-11-02 | 70 | falls_below_threshold |
| /cities/san-antonio-united-states | city | 2026-11-07 | 75 | falls_below_threshold |
| /cities/pittsburgh-united-states | city | 2026-11-13 | 81 | falls_below_threshold |
| /venues/tottenham-hotspur-stadium-london | venue | 2027-07-06 | 317 | falls_below_threshold |

`runs_out_of_shows` = the route's last tracked date passes. `falls_below_threshold` = the route keeps future dates but drops under a count gate, which is why this section re-runs the real gates at the horizon rather than looking at the last show date.

## Indexable routes with zero internal links

- none

## Indexable routes with no future events

- /artists/beyonce
- /artists/jelly-roll
- /artists/morgan-wallen
- /artists/post-malone
- /artists/raye
- /artists/rosalia
- /artists/tate-mcrae

## Title patterns among indexable routes

| Routes | Share | Pattern |
|---|---|---|
| 93 | 35.5% | `{} Tickets in {} | Compare Prices` |
| 54 | 20.6% | `{} Concerts in {} | Tickets` |
| 46 | 17.6% | `Concerts in {} | Upcoming Shows & Tickets` |
| 31 | 11.8% | `{} Tickets & Tour Dates | TourTicketCompare` |
| 1 | 0.4% | `Compare Concert Tickets & Tour Dates | TourTicketCompare` |
| 1 | 0.4% | `Compare Concert Ticket Prices by Site | TourTicketCompare` |
| 1 | 0.4% | `Artists | TourTicketCompare` |
| 1 | 0.4% | `Concert Ticket Buying Guides | TourTicketCompare` |
| 1 | 0.4% | `How TourTicketCompare Works` |
| 1 | 0.4% | `Currency Converter for Concert Tickets | TourTicketCompare` |
| 1 | 0.4% | `About TourTicketCompare` |
| 1 | 0.4% | `Contact TourTicketCompare` |

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
| guide | 17/17 | 18/18 | 18/18 | +0 | +1 (tol 3) | inventory-growth |
| blog-post | 3/3 | 3/3 | 3/3 | +0 | +0 (tol 3) | unchanged |
| blog-tag | 2/3 | 2/3 | 2/3 | +0 | +0 (tol 3) | unchanged |
| artist | 18/40 | 32/40 | 32/40 | +0 | +14 (tol 3) | unexplained-growth |
| city | 37/81 | 47/108 | 46/108 | -1 | +10 (tol 4) | unexplained-growth |
| venue | 45/108 | 57/158 | 54/154 | -3 | +12 (tol 5) | unexplained-growth |
| artist-city | 92/241 | 106/347 | 94/330 | -12 | +14 (tol 10) | unexplained-growth |

**Clock** is what the calendar alone accounts for: the same gates re-run over the same event data at the baseline's timestamp versus now. **Residual** is everything left over — a code, gate, or data change. `inventory-decay` / `inventory-growth` are expected. `structural` (residual loss beyond tolerance) fails `--check`; `unexplained-growth` only warns, because an artist batch or a big discovery run produces it legitimately.

## Warnings (non-blocking)

- artist: 14 more indexable route(s) than the baseline, beyond what the calendar explains (tolerance 3). Expected after an artist batch or a large discovery run.
- city: 10 more indexable route(s) than the baseline, beyond what the calendar explains (tolerance 4). Expected after an artist batch or a large discovery run.
- venue: 12 more indexable route(s) than the baseline, beyond what the calendar explains (tolerance 5). Expected after an artist batch or a large discovery run.
- artist-city: 14 more indexable route(s) than the baseline, beyond what the calendar explains (tolerance 10). Expected after an artist batch or a large discovery run.

## Problems

- none
