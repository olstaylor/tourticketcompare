# SeatGeek CTA auto-add log

Generated: 2026-10-20T15:31:53.746Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3810
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2979
- Events already carrying a valid SeatGeek URL: 1719
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1261
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1718
- Eligible (upcoming, resolvable local date) after pre-API filtering: 8
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20746)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 8
- Events checked by this run: 8
- API calls made: 40
- Rate-limit responses: 0
- URLs added: 8
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

- `URLs added: 8` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1719 event(s) already carried valid SeatGeek URLs before this run, including 1261 enrichment-eligible event(s).
- This run queried only the 1718 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-a-boogie-wit-da-hoodie-2026-belmont-park-1adzz_8gkuljdyg | A Boogie Wit Da Hoodie | 2026-10-29 | Belmont Park | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/elmont-new-york-ubs-arena-2026-10-29-8-pm/concert/18499209 |
| tm-a-boogie-wit-da-hoodie-2026-belmont-park-17gzv0g6ctu4ij2 | A Boogie Wit Da Hoodie | 2026-10-30 | Belmont Park | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/elmont-new-york-ubs-arena-2026-10-30-8-pm/concert/18473030 |
| tm-a-boogie-wit-da-hoodie-2026-boston-vv1a8vpgbgaumyrw | A Boogie Wit Da Hoodie | 2026-11-06 | Boston | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/boston-massachusetts-agganis-arena-2026-11-06-8-pm/concert/18637279 |
| tm-a-boogie-wit-da-hoodie-2026-boston-vv1a8vpgbgauu_ra | A Boogie Wit Da Hoodie | 2026-11-07 | Boston | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/boston-massachusetts-agganis-arena-2026-11-07-8-pm/concert/18629299 |
| tm-a-boogie-wit-da-hoodie-2026-philadelphia-vv1aezkfygkeinqmd | A Boogie Wit Da Hoodie | 2026-11-13 | Philadelphia | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/philadelphia-pennsylvania-liacouras-center-2026-11-13-8-pm/concert/18645455 |
| tm-a-boogie-wit-da-hoodie-2026-philadelphia-vv1aezkfygkecacwb | A Boogie Wit Da Hoodie | 2026-11-14 | Philadelphia | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/philadelphia-pennsylvania-liacouras-center-2026-11-14-8-pm/concert/18629507 |
| tm-a-boogie-wit-da-hoodie-2026-toronto-168zkfspyzauf8v5 | A Boogie Wit Da Hoodie | 2026-11-28 | Toronto | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/toronto-canada-scotiabank-arena-2026-11-28-8-pm/concert/18629264 |
| tm-a-boogie-wit-da-hoodie-2026-minneapolis-vv1akzkfygkd_ao6r | A Boogie Wit Da Hoodie | 2026-12-12 | Minneapolis | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/minneapolis-minnesota-the-armory-minneapolis-2026-12-12-8-pm/concert/18631720 |

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

Generated: 2026-10-20T15:28:44.563Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3772
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2948
- Events already carrying a valid SeatGeek URL: 1694
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1236
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1712
- Eligible (upcoming, resolvable local date) after pre-API filtering: 7
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20746)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 7
- Events checked by this run: 7
- API calls made: 35
- Rate-limit responses: 0
- URLs added: 7
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

- `URLs added: 7` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1694 event(s) already carried valid SeatGeek URLs before this run, including 1236 enrichment-eligible event(s).
- This run queried only the 1712 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-elevation-worship-2027-tacoma-vvg1hz_35ckwg5 | Elevation Worship | 2027-02-26 | Tacoma | https://seatgeek.com/elevation-worship-tickets/tacoma-washington-tacoma-dome-2027-02-26-7-pm/concert/18590103 |
| tm-elevation-worship-2027-sacramento-g5vyz_38zvlqx | Elevation Worship | 2027-03-01 | Sacramento | https://seatgeek.com/elevation-worship-tickets/sacramento-california-golden-1-center-2027-03-01-7-pm/concert/18591315 |
| tm-elevation-worship-2027-oakland-g5vyz_3npydie | Elevation Worship | 2027-03-02 | Oakland | https://seatgeek.com/elevation-worship-tickets/oakland-california-oakland-arena-2027-03-02-7-pm/concert/18590093 |
| tm-elevation-worship-2027-anaheim-vv16azkfivpza5vug5 | Elevation Worship | 2027-03-03 | Anaheim | https://seatgeek.com/elevation-worship-tickets/anaheim-california-honda-center-2027-03-03-7-pm/concert/18590108 |
| tm-elevation-worship-2027-san-diego-vvg1iz_37k-njg | Elevation Worship | 2027-03-05 | San Diego | https://seatgeek.com/elevation-worship-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2027-03-05-7-pm/concert/18590214 |
| tm-elevation-worship-2027-phoenix-1a_zkf0gkdcjit6 | Elevation Worship | 2027-03-06 | Phoenix | https://seatgeek.com/elevation-worship-tickets/phoenix-arizona-mortgage-matchup-center-2027-03-06-7-pm/concert/18590079 |
| tm-elevation-worship-2027-inglewood-vv1aazkfigkdewunn | Elevation Worship | 2027-03-07 | Inglewood | https://seatgeek.com/elevation-worship-tickets/inglewood-california-kia-forum-2027-03-07-7-pm/concert/18590126 |

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

Generated: 2026-10-20T15:30:19.681Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3792
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2964
- Events already carrying a valid SeatGeek URL: 1704
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1246
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1718
- Eligible (upcoming, resolvable local date) after pre-API filtering: 5
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20746)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 5
- Events checked by this run: 5
- API calls made: 25
- Rate-limit responses: 0
- URLs added: 5
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

- `URLs added: 5` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1704 event(s) already carried valid SeatGeek URLs before this run, including 1246 enrichment-eligible event(s).
- This run queried only the 1718 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-lil-wayne-2026-knoxville-g5viz_kqar_ob | Lil Wayne | 2026-10-23 | Knoxville | https://seatgeek.com/lil-wayne-tickets/knoxville-tennessee-thompson-boling-arena-at-food-city-center-2026-10-23-8-pm/concert/18128391 |
| tm-lil-wayne-2026-greenville-g5evz_6d5sngf | Lil Wayne | 2026-10-24 | Greenville | https://seatgeek.com/lil-wayne-tickets/greenville-south-carolina-bon-secours-wellness-arena-2026-10-24-8-30-pm/concert/18128379 |
| tm-lil-wayne-2026-lexington-1avbz_kgkyr04kw | Lil Wayne | 2026-12-04 | Lexington | https://seatgeek.com/lil-wayne-tickets/lexington-kentucky-rupp-arena-2026-12-04-8-30-pm/concert/18128388 |
| tm-lil-wayne-2026-savannah-vvg1zz_3n_vz4w | Lil Wayne | 2026-12-05 | Savannah | https://seatgeek.com/lil-wayne-tickets/savannah-georgia-enmarket-arena-2026-12-05-7-pm/concert/18649583 |
| tm-lil-wayne-2027-reading-vv17fz_kgkwwyiai | Lil Wayne | 2027-02-26 | Reading | https://seatgeek.com/lil-wayne-tickets/reading-pennsylvania-santander-arena-2027-02-26-7-30-pm/concert/18128377 |

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

Generated: 2026-10-20T15:29:47.011Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3787
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2959
- Events already carrying a valid SeatGeek URL: 1699
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1241
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1718
- Eligible (upcoming, resolvable local date) after pre-API filtering: 11
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20746)
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
- Next resume showId: tm-stevie-wonder-2026-inglewood-vv1aazkf0onvvzeug
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'stevie-wonder' --max-api-calls 50 --resume-from 'tm-stevie-wonder-2026-inglewood-vv1aazkf0onvvzeug'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 5

## Interpretation

- `URLs added: 5` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1699 event(s) already carried valid SeatGeek URLs before this run, including 1241 enrichment-eligible event(s).
- This run queried only the 1718 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-stevie-wonder-2026-new-york-g5diz_gpossvv | Stevie Wonder | 2026-11-19 | New York | https://seatgeek.com/stevie-wonder-tickets/new-york-new-york-madison-square-garden-2026-11-19-8-pm/concert/18570214 |
| tm-stevie-wonder-2026-chicago-vv1a7zkfngkd8ke_p | Stevie Wonder | 2026-11-21 | Chicago | https://seatgeek.com/stevie-wonder-tickets/chicago-illinois-united-center-2026-11-21-8-pm/concert/18570213 |
| tm-stevie-wonder-2026-washington-1a4zkfxgkdptcca | Stevie Wonder | 2026-11-23 | Washington | https://seatgeek.com/stevie-wonder-tickets/washington-district-of-columbia-capital-one-arena-2026-11-23-8-pm/concert/18570216 |
| tm-stevie-wonder-2026-detroit-vv1kezvpa-gaukuph | Stevie Wonder | 2026-12-08 | Detroit | https://seatgeek.com/stevie-wonder-tickets/detroit-michigan-fox-theatre-detroit-2026-12-08-8-pm/concert/18570215 |
| tm-stevie-wonder-2026-detroit-vv1koz_3bxg7sqna | Stevie Wonder | 2026-12-09 | Detroit | https://seatgeek.com/stevie-wonder-tickets/detroit-michigan-fox-theatre-detroit-2026-12-09-8-pm/concert/18570217 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-stevie-wonder-2026-dublin-1avoz_ogkmfynew | Stevie Wonder | 2026-11-01 | Dublin | no_candidates_returned | - |
| tm-stevie-wonder-2026-london-1adfz_ogkluzbfe | Stevie Wonder | 2026-11-03 | London | no_candidates_returned | - |
| tm-stevie-wonder-2026-london-1adfz_ogkwbmppe | Stevie Wonder | 2026-11-05 | London | no_candidates_returned | - |
| tm-stevie-wonder-2026-manchester-1adjz_ogklby6m_ | Stevie Wonder | 2026-11-08 | Manchester | no_candidates_returned | - |
| tm-stevie-wonder-2026-glasgow-1adbz_ogkw2mz1l | Stevie Wonder | 2026-11-11 | Glasgow | no_candidates_returned | - |

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

Generated: 2026-10-20T15:31:03.844Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3800
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2971
- Events already carrying a valid SeatGeek URL: 1711
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1253
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1718
- Eligible (upcoming, resolvable local date) after pre-API filtering: 7
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20746)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 7
- Events checked by this run: 7
- API calls made: 35
- Rate-limit responses: 0
- URLs added: 7
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

- `URLs added: 7` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1711 event(s) already carried valid SeatGeek URLs before this run, including 1253 enrichment-eligible event(s).
- This run queried only the 1718 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-tom-jones-2026-las-vegas-17ayv0g61xuaqyn | Tom Jones | 2026-10-21 | Las Vegas | https://seatgeek.com/tom-jones-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-10-21-8-pm/concert/18266693 |
| tm-tom-jones-2026-las-vegas-17ayv0g61xukqbd | Tom Jones | 2026-10-23 | Las Vegas | https://seatgeek.com/tom-jones-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-10-23-8-pm/concert/18266694 |
| tm-tom-jones-2026-las-vegas-17ayv0g61xu61b0 | Tom Jones | 2026-10-24 | Las Vegas | https://seatgeek.com/tom-jones-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-10-24-8-pm/concert/18266696 |
| tm-tom-jones-2026-los-angeles-vvg10z_58xadko | Tom Jones | 2026-10-26 | Los Angeles | https://seatgeek.com/tom-jones-tickets/los-angeles-california-the-greek-theatre-los-angeles-2026-10-26-8-pm/concert/18266701 |
| tm-tom-jones-2026-san-diego-vvg1iz_5gqcfyd | Tom Jones | 2026-10-27 | San Diego | https://seatgeek.com/tom-jones-tickets/san-diego-california-the-rady-shell-at-jacobs-park-2026-10-27-8-pm/concert/18266703 |
| tm-tom-jones-2026-wheatland-g5vyz_1uw3ukc | Tom Jones | 2026-10-31 | Wheatland | https://seatgeek.com/tom-jones-tickets/wheatland-california-hard-rock-live-sacramento-2026-10-31-8-pm/concert/18266706 |
| tm-tom-jones-2026-san-francisco-g5vyz_5d9skqu | Tom Jones | 2026-11-01 | San Francisco | https://seatgeek.com/tom-jones-tickets/san-francisco-california-the-masonic-san-francisco-2026-11-01-8-pm/concert/18266707 |

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

Generated: 2026-10-20T15:32:20.132Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3814
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2983
- Events already carrying a valid SeatGeek URL: 1723
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1265
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1718
- Eligible (upcoming, resolvable local date) after pre-API filtering: 4
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20746)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 4
- Events checked by this run: 4
- API calls made: 20
- Rate-limit responses: 0
- URLs added: 4
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

- `URLs added: 4` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1723 event(s) already carried valid SeatGeek URLs before this run, including 1265 enrichment-eligible event(s).
- This run queried only the 1718 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-zach-top-2026-lafayette-g5viz_52-gfk2 | Zach Top | 2026-10-23 | Lafayette | https://seatgeek.com/zach-top-tickets/lafayette-louisiana-cajundome-2026-10-23-8-pm/concert/18285544 |
| tm-zach-top-2026-rogers-g5viz_5ulwxbq | Zach Top | 2026-10-24 | Rogers | https://seatgeek.com/zach-top-tickets/rogers-arkansas-walmart-amp-2026-10-24-8-pm/concert/18370151 |
| tm-zach-top-2026-duluth-vvg1zz_5pbvq93 | Zach Top | 2026-10-29 | Duluth | https://seatgeek.com/zach-top-tickets/duluth-georgia-gas-south-arena-2026-10-29-8-pm/concert/18285545 |
| tm-zach-top-2026-nashville-g5viz_g6sznnj | Zach Top | 2026-10-30 | Nashville | https://seatgeek.com/zach-top-tickets/nashville-tennessee-bridgestone-arena-2026-10-30-8-30-pm/concert/18285548 |

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
