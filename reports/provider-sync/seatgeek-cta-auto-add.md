# SeatGeek CTA auto-add log

Generated: 2026-10-16T15:05:45.259Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3559
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2798
- Events already carrying a valid SeatGeek URL: 1298
- Enrichment-eligible events already carrying a valid SeatGeek URL: 942
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1856
- Eligible (upcoming, resolvable local date) after pre-API filtering: 2
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20742)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 2
- Events checked by this run: 2
- API calls made: 10
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 2
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- city_or_metro_match_failed: 2

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1298 event(s) already carried valid SeatGeek URLs before this run, including 942 enrichment-eligible event(s).
- This run queried only the 1856 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-aerosmith-2026-hollywood-vvg1iz_kzl1gke | Aerosmith | 2026-10-29 | Hollywood | city_or_metro_match_failed | https://seatgeek.com/aerosmith-tickets/los-angeles-california-hollywood-bowl-2026-10-29-7-pm/concert/18658985 |
| tm-aerosmith-2026-hollywood-vvg1iz_kzl5ikm | Aerosmith | 2026-11-01 | Hollywood | city_or_metro_match_failed | https://seatgeek.com/aerosmith-tickets/los-angeles-california-hollywood-bowl-2026-11-01-6-30-pm/concert/18658987 |

## Accepted venue mismatches

- None

## Conflicts found

- None

## Rate-limited / not checked

- None

## API/environment failures

- None

## Skipped before any API call

Enrichment-eligible events missing a SeatGeek URL that this run deliberately did not query. Past events can never gain a useful CTA; an unresolvable venue-local date would make the SeatGeek date filter search the wrong night, so it is never guessed.

- None
# SeatGeek CTA auto-add log

Generated: 2026-10-16T15:07:49.113Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3606
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2838
- Events already carrying a valid SeatGeek URL: 1315
- Enrichment-eligible events already carrying a valid SeatGeek URL: 959
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1879
- Eligible (upcoming, resolvable local date) after pre-API filtering: 2
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20742)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 2
- Events checked by this run: 2
- API calls made: 10
- Rate-limit responses: 0
- URLs added: 2
- Events skipped: 0
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 2` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1315 event(s) already carried valid SeatGeek URLs before this run, including 959 enrichment-eligible event(s).
- This run queried only the 1879 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-brent-faiyaz-2026-chicago-vv1a7zkfwgkda-klv | Brent Faiyaz | 2026-11-30 | Chicago | https://seatgeek.com/brent-faiyaz-tickets/chicago-illinois-united-center-2026-11-30-8-pm/concert/18617422 |
| tm-brent-faiyaz-2026-brooklyn-1adzz_3gkxkyvwj | Brent Faiyaz | 2026-12-03 | Brooklyn | https://seatgeek.com/brent-faiyaz-tickets/brooklyn-new-york-barclays-center-2026-12-03-8-pm/concert/18618383 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

- None

## Accepted venue mismatches

- None

## Conflicts found

- None

## Rate-limited / not checked

- None

## API/environment failures

- None

## Skipped before any API call

Enrichment-eligible events missing a SeatGeek URL that this run deliberately did not query. Past events can never gain a useful CTA; an unresolvable venue-local date would make the SeatGeek date filter search the wrong night, so it is never guessed.

- None
# SeatGeek CTA auto-add log

Generated: 2026-10-16T15:05:29.344Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3557
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2796
- Events already carrying a valid SeatGeek URL: 1298
- Enrichment-eligible events already carrying a valid SeatGeek URL: 942
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1854
- Eligible (upcoming, resolvable local date) after pre-API filtering: 1
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20742)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 1
- Events checked by this run: 1
- API calls made: 5
- Rate-limit responses: 0
- URLs added: 1
- Events skipped: 0
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 1` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1298 event(s) already carried valid SeatGeek URLs before this run, including 942 enrichment-eligible event(s).
- This run queried only the 1854 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-ella-langley-2026-lincoln-vvg1bz_u6bp0me | Ella Langley | 2026-10-30 | Lincoln | https://seatgeek.com/ella-langley-tickets/lincoln-nebraska-pinnacle-bank-arena-2026-10-30-7-pm/concert/18324412 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

- None

## Accepted venue mismatches

- None

## Conflicts found

- None

## Rate-limited / not checked

- None

## API/environment failures

- None

## Skipped before any API call

Enrichment-eligible events missing a SeatGeek URL that this run deliberately did not query. Past events can never gain a useful CTA; an unresolvable venue-local date would make the SeatGeek date filter search the wrong night, so it is never guessed.

- None
# SeatGeek CTA auto-add log

Generated: 2026-10-16T15:07:33.517Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3603
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2836
- Events already carrying a valid SeatGeek URL: 1313
- Enrichment-eligible events already carrying a valid SeatGeek URL: 957
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1879
- Eligible (upcoming, resolvable local date) after pre-API filtering: 31
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 3 of 4 (key 20742)
- Runs needed to check every eligible event once: 4
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 10
- Events skipped: 0
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-jonas-brothers-2026-newark-vv17fz_8gkzo8xsx
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'jonas-brothers' --max-api-calls 50 --resume-from 'tm-jonas-brothers-2026-newark-vv17fz_8gkzo8xsx'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1313 event(s) already carried valid SeatGeek URLs before this run, including 957 enrichment-eligible event(s).
- This run queried only the 1879 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-jonas-brothers-2026-glendale-1av0z_8gkmoa_ep | Jonas Brothers | 2026-11-27 | Glendale | https://seatgeek.com/jonas-brothers-tickets/glendale-arizona-desert-diamond-arena-2026-11-27-7-30-pm/concert/18503907 |
| tm-jonas-brothers-2026-san-diego-vvg1iz_8uk3mob | Jonas Brothers | 2026-11-30 | San Diego | https://seatgeek.com/jonas-brothers-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2026-11-30-7-30-pm/concert/18503919 |
| tm-jonas-brothers-2026-anaheim-vv170z_8gkskkuxl | Jonas Brothers | 2026-12-02 | Anaheim | https://seatgeek.com/jonas-brothers-tickets/anaheim-california-honda-center-2026-12-02-7-30-pm/concert/18503918 |
| tm-jonas-brothers-2026-seattle-vvg1hz_8uqqunb | Jonas Brothers | 2026-12-05 | Seattle | https://seatgeek.com/jonas-brothers-tickets/seattle-washington-climate-pledge-arena-2026-12-05-7-30-pm/concert/18503920 |
| tm-jonas-brothers-2026-denver-g5vzz_8u_uayk | Jonas Brothers | 2026-12-09 | Denver | https://seatgeek.com/jonas-brothers-tickets/denver-colorado-ball-arena-2026-12-09-7-30-pm/concert/18503921 |
| tm-jonas-brothers-2026-lincoln-vv17bz_8gkmchsxu | Jonas Brothers | 2026-12-10 | Lincoln | https://seatgeek.com/jonas-brothers-tickets/lincoln-nebraska-pinnacle-bank-arena-2026-12-10-7-30-pm/concert/18503923 |
| tm-jonas-brothers-2026-sioux-falls-vv17bz_8gkdvaovc | Jonas Brothers | 2026-12-12 | Sioux Falls | https://seatgeek.com/jonas-brothers-tickets/sioux-falls-south-dakota-denny-sanford-premier-center-2026-12-12-7-30-pm/concert/18503922 |
| tm-jonas-brothers-2026-grand-rapids-vv17oz_8gkbyzdvo | Jonas Brothers | 2026-12-15 | Grand Rapids | https://seatgeek.com/jonas-brothers-tickets/grand-rapids-michigan-van-andel-arena-2026-12-15-7-30-pm/concert/18503930 |
| tm-jonas-brothers-2026-belmont-park-1adzz_8gku_lwnk | Jonas Brothers | 2026-12-19 | Belmont Park | https://seatgeek.com/jonas-brothers-tickets/elmont-new-york-ubs-arena-2026-12-19-7-30-pm/concert/18503931 |
| tm-jonas-brothers-2026-newark-vv17fz_8gkzo23wg | Jonas Brothers | 2026-12-21 | Newark | https://seatgeek.com/jonas-brothers-tickets/newark-new-jersey-prudential-center-2026-12-21-7-30-pm/concert/18503932 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

- None

## Accepted venue mismatches

- None

## Conflicts found

- None

## Rate-limited / not checked

- None

## API/environment failures

- None

## Skipped before any API call

Enrichment-eligible events missing a SeatGeek URL that this run deliberately did not query. Past events can never gain a useful CTA; an unresolvable venue-local date would make the SeatGeek date filter search the wrong night, so it is never guessed.

- None
# SeatGeek CTA auto-add log

Generated: 2026-10-16T15:06:30.231Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3567
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2805
- Events already carrying a valid SeatGeek URL: 1303
- Enrichment-eligible events already carrying a valid SeatGeek URL: 947
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1858
- Eligible (upcoming, resolvable local date) after pre-API filtering: 7
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20742)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 7
- Events checked by this run: 7
- API calls made: 35
- Rate-limit responses: 0
- URLs added: 5
- Events skipped: 2
- no_candidates_returned: 2
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 2

## Interpretation

- `URLs added: 5` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1303 event(s) already carried valid SeatGeek URLs before this run, including 947 enrichment-eligible event(s).
- This run queried only the 1858 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-mana-2026-portland-vvg1hzbmka2ayz | MANA | 2026-10-16 | Portland | https://seatgeek.com/mana-tickets/portland-oregon-moda-center-2026-10-16-8-30-pm/concert/17938855 |
| tm-mana-2026-seattle-vvg1hzbmeehmj0 | MANA | 2026-10-17 | Seattle | https://seatgeek.com/mana-tickets/seattle-washington-climate-pledge-arena-2026-10-17-8-30-pm/concert/17938856 |
| tm-mana-2026-rosemont-vv167zkuuokza2adc5 | MANA | 2026-10-30 | Rosemont | https://seatgeek.com/mana-tickets/rosemont-illinois-allstate-arena-2026-10-30-8-pm/concert/17938857 |
| tm-mana-2026-detroit-vv1fozbj3ezozd87v | MANA | 2026-11-01 | Detroit | https://seatgeek.com/mana-tickets/detroit-michigan-little-caesars-arena-2026-11-01-8-pm/concert/17416937 |
| tm-mana-2026-austin-g5dizbmoaqckm | MANA | 2026-11-08 | Austin | https://seatgeek.com/mana-tickets/austin-texas-moody-center-atx-2026-11-08-8-30-pm/concert/17938859 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-mana-2026-ciudad-de-mexico-17azv0g6glh8hre | MANA | 2026-12-16 | Ciudad de México | no_candidates_returned | - |
| tm-mana-2026-ciudad-de-mexico-17azv0g6gcz4ax4 | MANA | 2026-12-17 | Ciudad de México | no_candidates_returned | - |

## Accepted venue mismatches

- None

## Conflicts found

- None

## Rate-limited / not checked

- None

## API/environment failures

- None

## Skipped before any API call

Enrichment-eligible events missing a SeatGeek URL that this run deliberately did not query. Past events can never gain a useful CTA; an unresolvable venue-local date would make the SeatGeek date filter search the wrong night, so it is never guessed.

- None
# SeatGeek CTA auto-add log

Generated: 2026-10-16T15:05:19.585Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3554
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2795
- Events already carrying a valid SeatGeek URL: 1297
- Enrichment-eligible events already carrying a valid SeatGeek URL: 941
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1854
- Eligible (upcoming, resolvable local date) after pre-API filtering: 13
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20742)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 5
- Events skipped: 5
- no_candidates_returned: 5
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-weezer-2027-birmingham-1anzkf7gkdaoymm
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'weezer' --max-api-calls 50 --resume-from 'tm-weezer-2027-birmingham-1anzkf7gkdaoymm'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 5

## Interpretation

- `URLs added: 5` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1297 event(s) already carried valid SeatGeek URLs before this run, including 941 enrichment-eligible event(s).
- This run queried only the 1854 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-weezer-2026-dallas-vvg1yz_kmvonlg | Weezer | 2026-10-17 | Dallas | https://seatgeek.com/weezer-tickets/dallas-texas-american-airlines-center-2026-10-17-7-pm/concert/18147541 |
| tm-weezer-2026-austin-g5diz_kmlrxx1 | Weezer | 2026-10-18 | Austin | https://seatgeek.com/weezer-tickets/austin-texas-moody-center-atx-2026-10-18-7-pm/concert/18147543 |
| tm-weezer-2026-phoenix-1av0z_kgkmn6hu7 | Weezer | 2026-10-20 | Phoenix | https://seatgeek.com/weezer-tickets/phoenix-arizona-mortgage-matchup-center-2026-10-20-7-pm/concert/18147545 |
| tm-weezer-2026-san-diego-vvg1iz_kucq_7i | Weezer | 2026-10-21 | San Diego | https://seatgeek.com/weezer-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2026-10-21-7-pm/concert/18147546 |
| tm-weezer-2026-los-angeles-g5eyz_ku9s8xi | Weezer | 2026-10-24 | Los Angeles | https://seatgeek.com/weezer-tickets/los-angeles-california-crypto-com-arena-2026-10-24-7-pm/concert/18147549 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-weezer-2027-dublin-17kzv0g62rlynaf | Weezer | 2027-05-12 | Dublin | no_candidates_returned | - |
| tm-weezer-2027-newcastle-upon-tyne-g5vhz_8kkspwo | Weezer | 2027-05-14 | Newcastle Upon Tyne | no_candidates_returned | - |
| tm-weezer-2027-manchester-1amzkf7gkderotz | Weezer | 2027-05-15 | Manchester | no_candidates_returned | - |
| tm-weezer-2027-leeds-g5vhz_8pmm7nv | Weezer | 2027-05-17 | Leeds | no_candidates_returned | - |
| tm-weezer-2027-glasgow-1auzkf7gkdxjsmu | Weezer | 2027-05-19 | Glasgow | no_candidates_returned | - |

## Accepted venue mismatches

- None

## Conflicts found

- None

## Rate-limited / not checked

- None

## API/environment failures

- None

## Skipped before any API call

Enrichment-eligible events missing a SeatGeek URL that this run deliberately did not query. Past events can never gain a useful CTA; an unresolvable venue-local date would make the SeatGeek date filter search the wrong night, so it is never guessed.

- None
