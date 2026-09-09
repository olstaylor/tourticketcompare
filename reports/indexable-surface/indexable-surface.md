# Indexable-surface audit

Generated: 2026-09-09T15:45:17.358Z (read-only, rendered in-process — no live crawl)

## Totals

- rendered routes: 1151
- indexable: 326
- non-indexable: 825
- stored baseline indexable: 311 (+15)

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
| city | 175 | 55 | 120 | 31% |
| venue | 299 | 71 | 228 | 24% |
| artist-city | 572 | 102 | 470 | 18% |

## Reasons for exclusion

| Type | Reason | Routes |
|---|---|---|
| artist | artist_not_editorially_indexable | 7 |
| artist | no_upcoming_shows | 7 |
| city | below_show_threshold | 120 |
| city | below_artist_threshold | 86 |
| venue | below_show_threshold | 222 |
| venue | below_artist_threshold | 184 |
| artist-city | below_show_threshold | 470 |

## Losing indexability within 14 days

| Route | Type | Last tracked show | Days left | Why |
|---|---|---|---|---|
| /artists/bruno-mars/tickets/tampa-united-states | artist-city | 2026-09-13 | 4 | runs_out_of_shows |
| /artists/charli-xcx/tickets/brooklyn-united-states | artist-city | 2026-09-15 | 6 | runs_out_of_shows |
| /artists/karol-g/tickets/east-rutherford-united-states | artist-city | 2026-09-18 | 9 | runs_out_of_shows |
| /artists/zach-bryan/tickets/dover-united-states | artist-city | 2026-09-19 | 10 | runs_out_of_shows |
| /artists/bruno-mars/tickets/miami-united-states | artist-city | 2026-09-20 | 11 | runs_out_of_shows |
| /artists/tame-impala/tickets/houston-united-states | artist-city | 2026-09-21 | 11 | runs_out_of_shows |
| /artists/zach-bryan/tickets/toronto-canada | artist-city | 2026-09-22 | 13 | runs_out_of_shows |
| /venues/hard-rock-stadium-miami | venue | 2026-10-03 | 24 | falls_below_threshold |
| /venues/t-mobile-center-kansas-city | venue | 2026-11-01 | 52 | falls_below_threshold |
| /cities/san-antonio-united-states | city | 2026-11-07 | 58 | falls_below_threshold |
| /venues/raymond-james-stadium-tampa | venue | 2026-11-07 | 59 | falls_below_threshold |
| /cities/indianapolis-united-states | city | 2027-03-26 | 198 | falls_below_threshold |
| /cities/birmingham-united-kingdom | city | 2027-04-10 | 213 | falls_below_threshold |

`runs_out_of_shows` = the route's last tracked date passes. `falls_below_threshold` = the route keeps future dates but drops under a count gate, which is why this section re-runs the real gates at the horizon rather than looking at the last show date.

## Indexable routes with zero internal links

- none

## Indexable routes with no future events

- /artists/andrea-bocelli
- /artists/ariana-grande
- /artists/bad-bunny
- /artists/beyonce
- /artists/blondshell
- /artists/bts
- /artists/fkj
- /artists/jelly-roll
- /artists/michelle-branch
- /artists/missio
- /artists/morat
- /artists/morgan-wallen
- /artists/pink-martini
- /artists/polyphia
- /artists/post-malone
- /artists/raye
- /artists/rosalia
- /artists/saint-levant
- /artists/stella-lefty
- /artists/sylvan-esso
- /artists/tate-mcrae
- /artists/the-airborne-toxic-event
- /artists/the-weeknd
- /artists/tobymac
- /artists/vnv-nation
- /artists/yuridia

## Title patterns among indexable routes

| Routes | Share | Pattern |
|---|---|---|
| 101 | 31% | `{} Tickets in {} | Compare Prices` |
| 69 | 21.2% | `{} Concerts in {} | Tickets` |
| 57 | 17.5% | `{} Tickets & Tour Dates | TourTicketCompare` |
| 55 | 16.9% | `Concerts in {} | Upcoming Shows & Tickets` |
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
| artist | 42/50 | 58/65 | 58/65 | +0 | +16 (tol 5) | unexplained-growth |
| city | 56/173 | 57/175 | 55/175 | -2 | +1 (tol 6) | inventory-decay |
| venue | 75/299 | 75/302 | 71/299 | -4 | +0 (tol 8) | inventory-decay |
| artist-city | 106/575 | 108/584 | 102/572 | -6 | +2 (tol 11) | inventory-decay |

**Clock** is what the calendar alone accounts for: the same gates re-run over the same event data at the baseline's timestamp versus now. **Residual** is everything left over — a code, gate, or data change. `inventory-decay` / `inventory-growth` are expected. `structural` (residual loss beyond tolerance) fails `--check`; `unexplained-growth` only warns, because an artist batch or a big discovery run produces it legitimately.

## Warnings (non-blocking)

- blog-post: 4 more indexable route(s) than the baseline, beyond what the calendar explains (tolerance 3). Expected after an artist batch or a large discovery run.
- artist: 16 more indexable route(s) than the baseline, beyond what the calendar explains (tolerance 5). Expected after an artist batch or a large discovery run.

## Problems

- none
