# Indexable-surface audit

Generated: 2026-09-10T12:36:41.993Z (read-only, rendered in-process — no live crawl)

## Totals

- rendered routes: 1557
- indexable: 394
- non-indexable: 1163
- stored baseline indexable: 311 (+83)

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
| city | 212 | 59 | 153 | 28% |
| venue | 440 | 97 | 343 | 22% |
| artist-city | 800 | 140 | 660 | 18% |

## Reasons for exclusion

| Type | Reason | Routes |
|---|---|---|
| artist | artist_not_editorially_indexable | 7 |
| artist | no_upcoming_shows | 7 |
| city | below_show_threshold | 152 |
| city | below_artist_threshold | 102 |
| venue | below_show_threshold | 337 |
| venue | below_artist_threshold | 288 |
| artist-city | below_show_threshold | 660 |

## Losing indexability within 14 days

| Route | Type | Last tracked show | Days left | Why |
|---|---|---|---|---|
| /artists/bruno-mars/tickets/tampa-united-states | artist-city | 2026-09-13 | 3 | runs_out_of_shows |
| /artists/charli-xcx/tickets/brooklyn-united-states | artist-city | 2026-09-15 | 5 | runs_out_of_shows |
| /artists/andrea-bocelli/tickets/hollywood-united-states | artist-city | 2026-09-17 | 7 | runs_out_of_shows |
| /artists/beartooth/tickets/oberhausen-germany | artist-city | 2026-09-18 | 8 | runs_out_of_shows |
| /artists/karol-g/tickets/east-rutherford-united-states | artist-city | 2026-09-18 | 8 | runs_out_of_shows |
| /artists/zach-bryan/tickets/dover-united-states | artist-city | 2026-09-19 | 9 | runs_out_of_shows |
| /artists/bruno-mars/tickets/miami-united-states | artist-city | 2026-09-20 | 10 | runs_out_of_shows |
| /artists/tame-impala/tickets/houston-united-states | artist-city | 2026-09-21 | 10 | runs_out_of_shows |
| /artists/andrea-bocelli/tickets/morrison-united-states | artist-city | 2026-09-22 | 12 | runs_out_of_shows |
| /artists/zach-bryan/tickets/toronto-canada | artist-city | 2026-09-22 | 12 | runs_out_of_shows |
| /venues/hard-rock-stadium-miami | venue | 2026-10-03 | 23 | falls_below_threshold |
| /venues/t-mobile-center-kansas-city | venue | 2026-11-01 | 51 | falls_below_threshold |
| /venues/hollywood-bowl-hollywood | venue | 2026-11-01 | 52 | falls_below_threshold |
| /venues/sap-center-at-san-jose-san-jose | venue | 2026-11-06 | 57 | falls_below_threshold |
| /venues/raymond-james-stadium-tampa | venue | 2026-11-07 | 58 | falls_below_threshold |
| /venues/enterprise-center-saint-louis | venue | 2027-03-28 | 198 | falls_below_threshold |
| /cities/san-antonio-united-states | city | 2027-04-10 | 211 | falls_below_threshold |

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
| 139 | 35.3% | `{} Tickets in {} | Compare Prices` |
| 92 | 23.4% | `{} Concerts in {} | Tickets` |
| 59 | 15% | `Concerts in {} | Upcoming Shows & Tickets` |
| 56 | 14.2% | `{} Tickets & Tour Dates | TourTicketCompare` |
| 3 | 0.8% | `{} | Concerts in {}` |
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
| city | 56/173 | 61/212 | 59/212 | -2 | +5 (tol 6) | inventory-growth |
| venue | 75/299 | 101/443 | 97/440 | -4 | +26 (tol 8) | unexplained-growth |
| artist-city | 106/575 | 146/813 | 140/800 | -6 | +40 (tol 11) | unexplained-growth |

**Clock** is what the calendar alone accounts for: the same gates re-run over the same event data at the baseline's timestamp versus now. **Residual** is everything left over — a code, gate, or data change. `inventory-decay` / `inventory-growth` are expected. `structural` (residual loss beyond tolerance) fails `--check`; `unexplained-growth` only warns, because an artist batch or a big discovery run produces it legitimately.

## Warnings (non-blocking)

- blog-post: 4 more indexable route(s) than the baseline, beyond what the calendar explains (tolerance 3). Expected after an artist batch or a large discovery run.
- artist: 16 more indexable route(s) than the baseline, beyond what the calendar explains (tolerance 5). Expected after an artist batch or a large discovery run.
- venue: 26 more indexable route(s) than the baseline, beyond what the calendar explains (tolerance 8). Expected after an artist batch or a large discovery run.
- artist-city: 40 more indexable route(s) than the baseline, beyond what the calendar explains (tolerance 11). Expected after an artist batch or a large discovery run.
- indexable surface moved +26.7% against the stored baseline (311 -> 394) with no structural change detected. Expected if a tour ended or a large batch of dates landed; investigate otherwise.

## Problems

- none
