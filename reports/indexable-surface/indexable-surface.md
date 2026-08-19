# Indexable-surface audit

Generated: 2026-08-19T10:17:48.436Z (read-only, rendered in-process — no live crawl)

## Totals

- rendered routes: 492
- indexable: 224
- non-indexable: 268
- stored baseline indexable: 227 (-3)

## Routes by type

| Type | Rendered | Indexable | Non-indexable | Indexable share |
|---|---|---|---|---|
| home | 1 | 1 | 0 | 100% |
| index | 5 | 5 | 0 | 100% |
| static | 7 | 7 | 0 | 100% |
| guide | 18 | 18 | 0 | 100% |
| blog-post | 3 | 3 | 0 | 100% |
| blog-tag | 3 | 2 | 1 | 67% |
| artist | 40 | 26 | 14 | 65% |
| city | 81 | 34 | 47 | 42% |
| venue | 105 | 45 | 60 | 43% |
| artist-city | 229 | 83 | 146 | 36% |

## Reasons for exclusion

| Type | Reason | Routes |
|---|---|---|
| artist | artist_not_editorially_indexable | 14 |
| artist | no_upcoming_shows | 14 |
| city | below_show_threshold | 46 |
| city | below_artist_threshold | 30 |
| venue | below_show_threshold | 56 |
| venue | below_artist_threshold | 51 |
| artist-city | below_show_threshold | 146 |
| blog-tag | editorial_or_static_route | 1 |

## Losing indexability within 14 days

| Route | Type | Last tracked show | Days left | Why |
|---|---|---|---|---|
| /artists/ed-sheeran/tickets/toronto-canada | artist-city | 2026-08-22 | 3 | runs_out_of_shows |
| /artists/bts/tickets/toronto-canada | artist-city | 2026-08-24 | 5 | runs_out_of_shows |
| /artists/bruno-mars/tickets/east-rutherford-united-states | artist-city | 2026-08-26 | 8 | runs_out_of_shows |
| /artists/bts/tickets/chicago-united-states | artist-city | 2026-08-29 | 10 | runs_out_of_shows |
| /artists/ariana-grande/tickets/london-united-kingdom | artist-city | 2026-09-01 | 13 | runs_out_of_shows |
| /artists/bruno-mars/tickets/philadelphia-united-states | artist-city | 2026-09-02 | 15 | falls_below_threshold |
| /artists/tame-impala/tickets/seattle-united-states | artist-city | 2026-09-03 | 15 | falls_below_threshold |
| /cities/east-rutherford-united-states | city | 2026-09-05 | 17 | falls_below_threshold |
| /venues/metlife-stadium-east-rutherford | venue | 2026-09-05 | 17 | falls_below_threshold |
| /venues/lincoln-financial-field-philadelphia | venue | 2026-09-19 | 31 | falls_below_threshold |
| /venues/rogers-centre-toronto | venue | 2026-09-22 | 35 | falls_below_threshold |
| /venues/target-center-minneapolis | venue | 2026-11-02 | 75 | falls_below_threshold |
| /cities/pittsburgh-united-states | city | 2026-11-13 | 86 | falls_below_threshold |
| /cities/detroit-united-states | city | 2027-03-19 | 213 | falls_below_threshold |
| /venues/nationwide-arena-columbus | venue | 2027-03-20 | 214 | falls_below_threshold |

`runs_out_of_shows` = the route's last tracked date passes. `falls_below_threshold` = the route keeps future dates but drops under a count gate, which is why this section re-runs the real gates at the horizon rather than looking at the last show date.

## Indexable routes with zero internal links

- none

## Indexable routes with no future events

- /artists/bad-bunny
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
| 82 | 36.6% | `{} Tickets in {} | Compare Prices` |
| 45 | 20.1% | `{} Concerts in {} | Tickets` |
| 34 | 15.2% | `Concerts in {} | Upcoming Shows & Tickets` |
| 26 | 11.6% | `{} Tickets & Tour Dates | TourTicketCompare` |
| 1 | 0.4% | `Compare Concert Tickets & Tour Dates | TourTicketCompare` |
| 1 | 0.4% | `Compare Concert Ticket Prices | TourTicketCompare` |
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
| artist | 18/40 | 26/40 | 26/40 | +0 | +8 (tol 3) | unexplained-growth |
| city | 37/81 | 37/82 | 34/81 | -3 | +0 (tol 4) | inventory-decay |
| venue | 45/108 | 46/110 | 45/105 | -1 | +1 (tol 5) | unchanged |
| artist-city | 92/241 | 92/243 | 83/229 | -9 | +0 (tol 10) | inventory-decay |

**Clock** is what the calendar alone accounts for: the same gates re-run over the same event data at the baseline's timestamp versus now. **Residual** is everything left over — a code, gate, or data change. `inventory-decay` / `inventory-growth` are expected. `structural` (residual loss beyond tolerance) fails `--check`; `unexplained-growth` only warns, because an artist batch or a big discovery run produces it legitimately.

## Warnings (non-blocking)

- artist: 8 more indexable route(s) than the baseline, beyond what the calendar explains (tolerance 3). Expected after an artist batch or a large discovery run.

## Problems

- none
