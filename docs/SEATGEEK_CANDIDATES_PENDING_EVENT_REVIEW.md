# SeatGeek event-URL candidates awaiting event verification (2026-07-06)

Credentialed SeatGeek discovery run of 2026-07-06 (`npm run seatgeek:propose` +
`npm run seatgeek:enrich:apply`; see `docs/SEATGEEK_CTA_AUTO_ADD_LOG.md`).

## Why these were not auto-applied

The enrichment apply gate (`scripts/enrich-seatgeek-events.mjs`,
`eventIsTicketmasterVerified`) only writes `seatgeek_url` to events whose
`provider_links.ticketmaster.verified` is `true`. All 28 high-confidence
candidates below sit on automation-landed events (daily `tm-new-shows-pr.yml`
discovery) that are still `verified: false` and carry blank `tour_name`/
`event_name` — the open human-review backlog in `BACKLOG.md` item 6 /
`PROJECT_STATUS.md` → Active risks. The 87 Ticketmaster-verified events still
missing a `seatgeek_url` returned **zero** SeatGeek API candidates (European /
non-US legs SeatGeek does not list), so no gate-eligible application was
possible in this run.

Every candidate below scored 100 with an exact local-date, city, and venue
match, a valid `/concert/<id>` event URL, no risk flags, and identity
confirmed by the verified registry `seatgeek_performer_id`
(`data/provider-identities.json`).

## How to land these (after event review)

1. Complete the item-6 review of the underlying events (tour names + browser
   check of the Ticketmaster URLs; flip `provider_links.ticketmaster.verified`
   per the established process — never inferred from URL slugs).
2. Re-run `npm run seatgeek:enrich:apply` with `SEATGEEK_CLIENT_ID` set — the
   tool re-queries the API and applies whatever is then gate-eligible (do not
   hand-copy URLs from this file into `events.json`).
3. `npm run events:sync`, run the validators, and open the data PR per
   `docs/SEATGEEK_DISCOVERY.md`.

## Candidates (28)

| Artist | Local date | City | Venue | Event status | Proposed SeatGeek URL |
|---|---|---|---|---|---|
| Ariana Grande | 2026-07-06 | Atlanta | State Farm Arena | machine_high_confidence | https://seatgeek.com/ariana-grande-tickets/atlanta-georgia-state-farm-arena-1-2026-07-06-8-pm/concert/17700803 |
| ROSALÍA | 2026-07-06 | Oakland | Oakland Arena | machine_high_confidence | https://seatgeek.com/rosalia-tickets/oakland-california-oakland-arena-2026-07-06-8-30-pm/concert/17943520 |
| Ariana Grande | 2026-07-09 | Atlanta | State Farm Arena | machine_high_confidence | https://seatgeek.com/ariana-grande-tickets/atlanta-georgia-state-farm-arena-1-2026-07-09-8-pm/concert/17724144 |
| Ariana Grande | 2026-07-13 | Brooklyn | Barclays Center | machine_high_confidence | https://seatgeek.com/ariana-grande-tickets/brooklyn-new-york-barclays-center-2026-07-13-8-pm/concert/17700819 |
| Ariana Grande | 2026-07-16 | Brooklyn | Barclays Center | machine_high_confidence | https://seatgeek.com/ariana-grande-tickets/brooklyn-new-york-barclays-center-2026-07-16-8-pm/concert/17700783 |
| Ariana Grande | 2026-07-19 | Brooklyn | Barclays Center | machine_high_confidence | https://seatgeek.com/ariana-grande-tickets/brooklyn-new-york-barclays-center-2026-07-19-8-pm/concert/17724146 |
| Ariana Grande | 2026-07-25 | Boston | TD Garden | machine_high_confidence | https://seatgeek.com/ariana-grande-tickets/boston-massachusetts-td-garden-2026-07-25-8-pm/concert/17724148 |
| Ariana Grande | 2026-07-28 | Montreal | Centre Bell | machine_high_confidence | https://seatgeek.com/ariana-grande-tickets/montreal-canada-centre-bell-2026-07-28-8-pm/concert/17700815 |
| Ariana Grande | 2026-07-31 | Montreal | Centre Bell | machine_high_confidence | https://seatgeek.com/ariana-grande-tickets/montreal-canada-centre-bell-2026-07-31-8-pm/concert/17724151 |
| Ariana Grande | 2026-08-03 | Chicago | United Center | machine_high_confidence | https://seatgeek.com/ariana-grande-tickets/chicago-illinois-united-center-2026-08-03-8-pm/concert/17700811 |
| Ariana Grande | 2026-08-06 | Chicago | United Center | machine_high_confidence | https://seatgeek.com/ariana-grande-tickets/chicago-illinois-united-center-2026-08-06-8-pm/concert/17724381 |
| BTS | 2026-08-16 | Arlington | AT&T Stadium | needs_recheck | https://seatgeek.com/bts-tickets/arlington-texas-at-t-stadium-2026-08-16-8-pm/concert/18009296 |
| BTS | 2026-08-22 | Toronto | Rogers Stadium | machine_high_confidence | https://seatgeek.com/bts-tickets/toronto-canada-rogers-stadium-toronto-2026-08-22-8-pm/concert/18010334 |
| BTS | 2026-08-23 | Toronto | Rogers Stadium | machine_high_confidence | https://seatgeek.com/bts-tickets/toronto-canada-rogers-stadium-toronto-2026-08-23-8-pm/concert/18010336 |
| Charli xcx | 2026-09-11 | Philadelphia | Xfinity Mobile Arena | machine_high_confidence | https://seatgeek.com/charli-xcx-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-09-11-8-pm/concert/18292509 |
| Charli xcx | 2026-09-14 | Brooklyn | Barclays Center | machine_high_confidence | https://seatgeek.com/charli-xcx-tickets/brooklyn-new-york-barclays-center-2026-09-14-7-30-pm/concert/18292511 |
| Charli xcx | 2026-09-15 | Brooklyn | Barclays Center | machine_high_confidence | https://seatgeek.com/charli-xcx-tickets/brooklyn-new-york-barclays-center-2026-09-15-7-30-pm/concert/18292510 |
| Summer Walker | 2026-09-19 | Bristow | Jiffy Lube Live | machine_high_confidence | https://seatgeek.com/summer-walker-tickets/bristow-virginia-jiffy-lube-live-2026-09-19-5-pm/concert/18331559 |
| Charli xcx | 2026-09-21 | Toronto | Scotiabank Arena | machine_high_confidence | https://seatgeek.com/charli-xcx-tickets/toronto-canada-scotiabank-arena-2026-09-21-7-30-pm/concert/18292530 |
| Charli xcx | 2026-09-24 | Boston | TD Garden | machine_high_confidence | https://seatgeek.com/charli-xcx-tickets/boston-massachusetts-td-garden-2026-09-24-8-pm/concert/18292514 |
| Charli xcx | 2026-09-28 | Washington | Capital One Arena | machine_high_confidence | https://seatgeek.com/charli-xcx-tickets/washington-district-of-columbia-capital-one-arena-2026-09-28-7-30-pm/concert/18292512 |
| Charli xcx | 2026-10-06 | Atlanta | State Farm Arena | machine_high_confidence | https://seatgeek.com/charli-xcx-tickets/atlanta-georgia-state-farm-arena-1-2026-10-06-8-pm/concert/18292513 |
| Charli xcx | 2026-10-14 | San Diego | Viejas Arena at Aztec Bowl San Diego State University | machine_high_confidence | https://seatgeek.com/charli-xcx-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2026-10-14-8-pm/concert/18292521 |
| Summer Walker | 2026-10-16 | Chicago | Credit Union 1 Arena at UIC | machine_high_confidence | https://seatgeek.com/summer-walker-tickets/chicago-illinois-credit-union-1-arena-at-uic-2026-10-16-7-30-pm/concert/18328041 |
| Charli xcx | 2026-10-17 | Inglewood | Kia Forum | machine_high_confidence | https://seatgeek.com/charli-xcx-tickets/inglewood-california-kia-forum-2026-10-17-8-pm/concert/18292522 |
| Charli xcx | 2026-10-18 | Inglewood | Kia Forum | machine_high_confidence | https://seatgeek.com/charli-xcx-tickets/inglewood-california-kia-forum-2026-10-18-8-pm/concert/18292523 |
| Charli xcx | 2026-10-21 | Glendale | Desert Diamond Arena | machine_high_confidence | https://seatgeek.com/charli-xcx-tickets/glendale-arizona-desert-diamond-arena-2026-10-21-8-pm/concert/18292524 |
| JAY-Z | 2026-10-23 | Inglewood | SoFi Stadium | machine_high_confidence | https://seatgeek.com/jay-z-tickets/inglewood-california-sofi-stadium-2026-10-23-8-pm/concert/18296599 |

Note: the BTS Arlington 2026-08-16 row is additionally `needs_recheck` — even
with a stored SeatGeek URL its CTAs stay suppressed until the event itself is
re-verified (`providerEventPublishable`).
