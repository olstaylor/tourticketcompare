# Indexable-surface audit

Generated: 2026-09-10T10:47:02.143Z (read-only, rendered in-process — no live crawl)

## Totals

- rendered routes: 1537
- indexable: 383
- non-indexable: 1154
- stored baseline indexable: 311 (+72)

## Routes by type

| Type | Rendered | Indexable | Non-indexable | Indexable share |
|---|---|---|---|---|
| home | 1 | 1 | 0 | 100% |
| index | 5 | 5 | 0 | 100% |
| static | 9 | 9 | 0 | 100% |
| guide | 18 | 18 | 0 | 100% |
| blog-post | 4 | 4 | 0 | 100% |
| blog-tag | 3 | 3 | 0 | 100% |
| artist | 65 | 58 | 7 | 89% |
| city | 208 | 59 | 149 | 28% |
| venue | 433 | 95 | 338 | 22% |
| artist-city | 791 | 131 | 660 | 17% |

## Reasons for exclusion

| Type | Reason | Routes |
|---|---|---|
| artist | artist_not_editorially_indexable | 7 |
| artist | no_upcoming_shows | 7 |
| city | below_show_threshold | 149 |
| city | below_artist_threshold | 98 |
| venue | below_show_threshold | 333 |
| venue | below_artist_threshold | 282 |
| artist-city | below_show_threshold | 660 |

## Losing indexability within 14 days

| Route | Type | Last tracked show | Days left | Why |
|---|---|---|---|---|
| /artists/bruno-mars/tickets/tampa-united-states | artist-city | 2026-09-13 | 4 | runs_out_of_shows |
| /artists/charli-xcx/tickets/brooklyn-united-states | artist-city | 2026-09-15 | 6 | runs_out_of_shows |
| /artists/andrea-bocelli/tickets/hollywood-united-states | artist-city | 2026-09-17 | 7 | runs_out_of_shows |
| /artists/beartooth/tickets/oberhausen-germany | artist-city | 2026-09-18 | 8 | runs_out_of_shows |
| /artists/karol-g/tickets/east-rutherford-united-states | artist-city | 2026-09-18 | 9 | runs_out_of_shows |
| /artists/zach-bryan/tickets/dover-united-states | artist-city | 2026-09-19 | 9 | runs_out_of_shows |
| /artists/bruno-mars/tickets/miami-united-states | artist-city | 2026-09-20 | 11 | runs_out_of_shows |
| /artists/tame-impala/tickets/houston-united-states | artist-city | 2026-09-21 | 11 | runs_out_of_shows |
| /artists/andrea-bocelli/tickets/morrison-united-states | artist-city | 2026-09-22 | 12 | runs_out_of_shows |
| /artists/zach-bryan/tickets/toronto-canada | artist-city | 2026-09-22 | 13 | runs_out_of_shows |
| /venues/hard-rock-stadium-miami | venue | 2026-10-03 | 24 | falls_below_threshold |
| /venues/hollywood-bowl-hollywood | venue | 2026-11-01 | 52 | falls_below_threshold |
| /venues/t-mobile-center-kansas-city | venue | 2026-11-01 | 52 | falls_below_threshold |
| /venues/sap-center-at-san-jose-san-jose | venue | 2026-11-06 | 57 | falls_below_threshold |
| /venues/raymond-james-stadium-tampa | venue | 2026-11-07 | 58 | falls_below_threshold |
| /venues/enterprise-center-saint-louis | venue | 2027-03-28 | 199 | falls_below_threshold |
| /cities/san-antonio-united-states | city | 2027-04-10 | 212 | falls_below_threshold |

`runs_out_of_shows` = the route's last tracked date passes. `falls_below_threshold` = the route keeps future dates but drops under a count gate, which is why this section re-runs the real gates at the horizon rather than looking at the last show date.

## Indexable routes with zero internal links

- none

## Indexable routes with no future events

- /artists/ariana-grande
- /artists/bad-bunny
- /artists/beyonce
- /artists/bts
- /artists/jelly-roll
- /artists/morgan-wallen
- /artists/post-malone
- /artists/raye
- /artists/rosalia
- /artists/tate-mcrae
- /artists/the-weeknd
- /artists/yuridia

## Title patterns among indexable routes

| Routes | Share | Pattern |
|---|---|---|
| 130 | 33.9% | `{} Tickets in {} | Compare Prices` |
| 91 | 23.8% | `{} Concerts in {} | Tickets` |
| 59 | 15.4% | `Concerts in {} | Upcoming Shows & Tickets` |
| 56 | 14.6% | `{} Tickets & Tour Dates | TourTicketCompare` |
| 2 | 0.5% | `{} | Concerts in {}` |
| 1 | 0.3% | `Compare Concert Tickets & Tour Dates | TourTicketCompare` |
| 1 | 0.3% | `Compare Concert Ticket Prices by Site | TourTicketCompare` |
| 1 | 0.3% | `Artists | TourTicketCompare` |
| 1 | 0.3% | `Concert Ticket Buying Guides | TourTicketCompare` |
| 1 | 0.3% | `How TourTicketCompare Works` |
| 1 | 0.3% | `Currency Converter for Concert Tickets | TourTicketCompare` |
| 1 | 0.3% | `About TourTicketCompare` |

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
| artist | 42/50 | 58/65 | 58/65 | +0 | +16 (tol 5) | unexplained-growth |
| city | 56/173 | 61/208 | 59/208 | -2 | +5 (tol 6) | inventory-growth |
| venue | 75/299 | 99/436 | 95/433 | -4 | +24 (tol 8) | unexplained-growth |
| artist-city | 106/575 | 137/804 | 131/791 | -6 | +31 (tol 11) | unexplained-growth |

**Clock** is what the calendar alone accounts for: the same gates re-run over the same event data at the baseline's timestamp versus now. **Residual** is everything left over — a code, gate, or data change. `inventory-decay` / `inventory-growth` are expected. `structural` (residual loss beyond tolerance) fails `--check`; `unexplained-growth` only warns, because an artist batch or a big discovery run produces it legitimately.

## Warnings (non-blocking)

- blog-post: 4 more indexable route(s) than the baseline, beyond what the calendar explains (tolerance 3). Expected after an artist batch or a large discovery run.
- artist: 16 more indexable route(s) than the baseline, beyond what the calendar explains (tolerance 5). Expected after an artist batch or a large discovery run.
- venue: 24 more indexable route(s) than the baseline, beyond what the calendar explains (tolerance 8). Expected after an artist batch or a large discovery run.
- artist-city: 31 more indexable route(s) than the baseline, beyond what the calendar explains (tolerance 11). Expected after an artist batch or a large discovery run.

## Problems

- none
