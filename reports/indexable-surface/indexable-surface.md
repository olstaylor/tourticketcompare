# Indexable-surface audit

Generated: 2026-07-31T12:52:34.137Z (read-only, rendered in-process — no live crawl)

## Totals

- rendered routes: 469
- indexable: 205
- non-indexable: 264
- stored baseline indexable: 205 (+0)

## Routes by type

| Type | Rendered | Indexable | Non-indexable | Indexable share |
|---|---|---|---|---|
| home | 1 | 1 | 0 | 100% |
| index | 4 | 4 | 0 | 100% |
| static | 7 | 7 | 0 | 100% |
| guide | 17 | 17 | 0 | 100% |
| artist | 40 | 18 | 22 | 45% |
| city | 81 | 35 | 46 | 43% |
| venue | 109 | 41 | 68 | 38% |
| artist-city | 210 | 82 | 128 | 39% |

## Reasons for exclusion

| Type | Reason | Routes |
|---|---|---|
| artist | no_upcoming_shows | 22 |
| artist | artist_not_editorially_indexable | 14 |
| city | below_show_threshold | 43 |
| city | below_artist_threshold | 31 |
| city | no_publishable_destination | 15 |
| venue | below_show_threshold | 60 |
| venue | below_artist_threshold | 56 |
| venue | no_publishable_destination | 18 |
| artist-city | below_show_threshold | 128 |

## Losing indexability within 14 days

| Route | Type | Last tracked show | Days left |
|---|---|---|---|
| /artists/morgan-wallen | artist | 2026-08-01 | 1 |
| /artists/morgan-wallen/tickets/philadelphia-united-states | artist-city | 2026-08-01 | 1 |
| /artists/bts/tickets/east-rutherford-united-states | artist-city | 2026-08-03 | 2 |
| /artists/summer-walker/tickets/london-united-kingdom | artist-city | 2026-08-02 | 2 |
| /artists/tame-impala/tickets/charlotte-united-states | artist-city | 2026-08-02 | 2 |
| /artists/zach-bryan/tickets/san-diego-united-states | artist-city | 2026-08-02 | 2 |
| /artists/tame-impala/tickets/nashville-united-states | artist-city | 2026-08-06 | 5 |
| /artists/ariana-grande/tickets/chicago-united-states | artist-city | 2026-08-06 | 6 |
| /artists/bts/tickets/foxborough-united-states | artist-city | 2026-08-07 | 6 |

## Indexable routes with zero internal links

- none

## Indexable routes with no future events

- none

## Title patterns among indexable routes

| Routes | Share | Pattern |
|---|---|---|
| 82 | 40% | `{} Tickets in {} | Compare Prices` |
| 41 | 20% | `{} Concerts in {} | Tickets` |
| 35 | 17.1% | `Concerts in {} | Upcoming Shows & Tickets` |
| 18 | 8.8% | `{} Tickets & Tour Dates | TourTicketCompare` |
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

Baseline generated 2026-07-31T12:38:28.546Z.

| Type | Baseline | Now | Indexable delta | Share delta | Classification |
|---|---|---|---|---|---|
| home | 1/1 | 1/1 | +0 | +0pp | unchanged |
| index | 4/4 | 4/4 | +0 | +0pp | unchanged |
| static | 7/7 | 7/7 | +0 | +0pp | unchanged |
| guide | 17/17 | 17/17 | +0 | +0pp | unchanged |
| artist | 18/30 | 18/40 | +0 | -15pp | unchanged |
| city | 35/81 | 35/81 | +0 | +0pp | unchanged |
| venue | 41/109 | 41/109 | +0 | +0pp | unchanged |
| artist-city | 82/210 | 82/210 | +0 | +0pp | unchanged |

`inventory-decay` / `inventory-growth` are expected: dated shows pass and new ones land, moving rendered and indexable counts together. `structural` means routes that still render changed indexability, which is a code or policy change.

## Warnings (non-blocking)

- none

## Problems

- none
