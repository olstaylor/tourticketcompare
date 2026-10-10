# SeatGeek CTA verification log

Generated: 2026-10-10T02:19:42.573Z

Written by `scripts/verify-seatgeek-events.mjs`. Identity anchor: the
registry-verified `seatgeek_performer_id`; date anchor: UTC-instant match
(±3h) between the event `datetime_iso` and the SeatGeek `datetime_utc`.

## Run summary

- Mode: apply
- Events selected: 28 (needs_recheck: 8, provenance backfill: 0, stale re-check: 26)
- Events skipped before API checks: 0
- API calls made: 28
- Verified provenance written: 20
- URLs added: 6
- URLs corrected: 0
- URLs cleared: 0
- Provenance un-verified: 0
- Conflicts (ambiguous, untouched): 0
- No qualifying listing: 2
- Transient API errors (untouched, retried next run): 0
- Stopped early: no

## Outcomes

| showId | artist | action | SeatGeek id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-lizzy-mcalpine-2027-warsaw-z698xzqpz16vfyab0p | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lizzy-mcalpine-2027-dallas-z7r9jz1aaekq3 | lizzy-mcalpine | add (applied) | 18619417 | https://seatgeek.com/lizzy-mcalpine-tickets/dallas-texas-the-bomb-factory-dallas-2027-04-30-7-pm/concert/18619417 | - |
| tm-lizzy-mcalpine-2027-houston-g5diz_kko6pz2 | lizzy-mcalpine | verify (applied) | 18619416 | https://seatgeek.com/lizzy-mcalpine-tickets/houston-texas-713-music-hall-2027-05-01-7-pm/concert/18619416 | - |
| tm-lizzy-mcalpine-2027-atlanta-z7r9jz1aaea-b | lizzy-mcalpine | add (applied) | 18619419 | https://seatgeek.com/lizzy-mcalpine-tickets/atlanta-georgia-fox-theatre-atlanta-2027-05-03-7-pm/concert/18619419 | - |
| tm-lizzy-mcalpine-2027-durham-g5evz_klljeql | lizzy-mcalpine | verify (applied) | 18619418 | https://seatgeek.com/lizzy-mcalpine-tickets/durham-north-carolina-dpac-durham-performing-arts-center-2027-05-04-7-pm/concert/18619418 | - |
| tm-lizzy-mcalpine-2027-columbus-z7r9jz1aaea09 | lizzy-mcalpine | add (applied) | 18619421 | https://seatgeek.com/lizzy-mcalpine-tickets/columbus-ohio-palace-theatre-columbus-2027-05-06-7-pm/concert/18619421 | - |
| tm-lizzy-mcalpine-2027-detroit-vv1afzkfmgkdd0jd5 | lizzy-mcalpine | verify (applied) | 18619420 | https://seatgeek.com/lizzy-mcalpine-tickets/detroit-michigan-fox-theatre-detroit-2027-05-07-7-pm/concert/18619420 | - |
| tm-lizzy-mcalpine-2027-indianapolis-vv1aazkfggkeu7rbe | lizzy-mcalpine | verify (applied) | 18619426 | https://seatgeek.com/lizzy-mcalpine-tickets/indianapolis-indiana-clowes-memorial-hall-2027-05-09-7-pm/concert/18619426 | - |
| tm-lizzy-mcalpine-2027-milwaukee-z7r9jz1aaea0_ | lizzy-mcalpine | add (applied) | 18619430 | https://seatgeek.com/lizzy-mcalpine-tickets/milwaukee-wisconsin-riverside-theater-milwaukee-2027-05-10-7-pm/concert/18619430 | - |
| tm-lizzy-mcalpine-2027-minneapolis-vv1akzkfsgkdlvc7g | lizzy-mcalpine | verify (applied) | 18619429 | https://seatgeek.com/lizzy-mcalpine-tickets/minneapolis-minnesota-state-theatre-minneapolis-2027-05-12-7-pm/concert/18619429 | - |
| tm-lizzy-mcalpine-2027-minneapolis-vv1akzkfsgkdlgq7t | lizzy-mcalpine | verify (applied) | 18637702 | https://seatgeek.com/lizzy-mcalpine-tickets/minneapolis-minnesota-state-theatre-minneapolis-2027-05-13-7-pm/concert/18637702 | - |
| tm-lizzy-mcalpine-2027-kansas-city-z7r9jz1aaekqk | lizzy-mcalpine | add (applied) | 18619436 | https://seatgeek.com/lizzy-mcalpine-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-05-17-7-pm/concert/18619436 | - |
| tm-lizzy-mcalpine-2027-oklahoma-city-z7r9jz1aaea-p | lizzy-mcalpine | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lizzy-mcalpine-2027-nashville-g5viz_kqsm0og | lizzy-mcalpine | verify (applied) | 18619440 | https://seatgeek.com/lizzy-mcalpine-tickets/nashville-tennessee-bridgestone-arena-2027-06-16-7-pm/concert/18619440 | - |
| tm-lizzy-mcalpine-2027-philadelphia-1ayzkfsgkdubyxp | lizzy-mcalpine | verify (applied) | 18619442 | https://seatgeek.com/lizzy-mcalpine-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-06-18-7-pm/concert/18619442 | - |
| tm-lizzy-mcalpine-2027-boston-vv1a8vpuzga1bapr | lizzy-mcalpine | verify (applied) | 18619443 | https://seatgeek.com/lizzy-mcalpine-tickets/boston-massachusetts-agganis-arena-2027-06-20-7-pm/concert/18619443 | - |
| tm-lizzy-mcalpine-2027-boston-vv1a8vpuzga1bypi | lizzy-mcalpine | verify (applied) | 18637280 | https://seatgeek.com/lizzy-mcalpine-tickets/boston-massachusetts-agganis-arena-2027-06-21-7-pm/concert/18637280 | - |
| tm-lizzy-mcalpine-2027-new-york-g5diz_kr8e3se | lizzy-mcalpine | verify (applied) | 18619444 | https://seatgeek.com/lizzy-mcalpine-tickets/new-york-new-york-madison-square-garden-2027-06-24-7-pm/concert/18619444 | - |
| tm-lizzy-mcalpine-2027-columbia-1a4zkfmgkejxp8r | lizzy-mcalpine | verify (applied) | 18619445 | https://seatgeek.com/lizzy-mcalpine-tickets/columbia-maryland-merriweather-post-pavilion-2027-06-25-7-pm/concert/18619445 | - |
| tm-lizzy-mcalpine-2027-toronto-1a8zkfwgke-nzw8 | lizzy-mcalpine | verify (applied) | 18619449 | https://seatgeek.com/lizzy-mcalpine-tickets/toronto-canada-scotiabank-arena-2027-06-27-7-pm/concert/18619449 | - |
| tm-lizzy-mcalpine-2027-chicago-vv1a7zkfggkenm_sz | lizzy-mcalpine | verify (applied) | 18619452 | https://seatgeek.com/lizzy-mcalpine-tickets/chicago-illinois-united-center-2027-06-29-7-pm/concert/18619452 | - |
| tm-lizzy-mcalpine-2027-austin-g5diz_k1qabc1 | lizzy-mcalpine | verify (applied) | 18619454 | https://seatgeek.com/lizzy-mcalpine-tickets/austin-texas-moody-center-atx-2027-07-02-7-pm/concert/18619454 | - |
| tm-lizzy-mcalpine-2027-morrison-z7r9jz1aaeax6 | lizzy-mcalpine | add (applied) | 18619455 | https://seatgeek.com/lizzy-mcalpine-tickets/morrison-colorado-red-rocks-amphitheatre-2027-07-06-7-pm/concert/18619455 | - |
| tm-lizzy-mcalpine-2027-san-diego-vvg1iz_k_8qjmi | lizzy-mcalpine | verify (applied) | 18619456 | https://seatgeek.com/lizzy-mcalpine-tickets/san-diego-california-the-rady-shell-at-jacobs-park-2027-07-09-6-30-pm/concert/18619456 | - |
| tm-lizzy-mcalpine-2027-inglewood-vv1aazkfugkdnwr6l | lizzy-mcalpine | verify (applied) | 18619461 | https://seatgeek.com/lizzy-mcalpine-tickets/los-angeles-california-forum-23-2027-07-10-7-pm/concert/18619461 | - |
| tm-lizzy-mcalpine-2027-san-francisco-g5vyz_k6tphz4 | lizzy-mcalpine | verify (applied) | 18619460 | https://seatgeek.com/lizzy-mcalpine-tickets/san-francisco-california-chase-center-2027-07-13-7-pm/concert/18619460 | - |
| tm-lizzy-mcalpine-2027-portland-vvg1hz_kpe4n79 | lizzy-mcalpine | verify (applied) | 18619462 | https://seatgeek.com/lizzy-mcalpine-tickets/portland-oregon-moda-center-2027-07-15-7-pm/concert/18619462 | - |
| tm-lizzy-mcalpine-2027-seattle-vvg1hz_kf6i_hn | lizzy-mcalpine | verify (applied) | 18619466 | https://seatgeek.com/lizzy-mcalpine-tickets/seattle-washington-climate-pledge-arena-2027-07-17-7-pm/concert/18619466 | - |

## Skipped before API checks

- None
