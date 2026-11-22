# SeatGeek CTA auto-add log

Generated: 2026-11-22T18:11:48.127Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5947
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5945
- Events already carrying a valid SeatGeek URL: 3769
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3768
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2177
- Eligible (upcoming, resolvable local date) after pre-API filtering: 13
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 25
- Rotation: window 1 of 1 (key 20779)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 11
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 9
- Events skipped: 2
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: api_call_limit_reached
- Next resume showId: tm-chris-tomlin-2026-milwaukee-z7r9jz1aav4be
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'chris-tomlin' --max-api-calls 50 --resume-from 'tm-chris-tomlin-2026-milwaukee-z7r9jz1aav4be'
- Accepted venue mismatches: 1
- Conflicts found: 1

## Skipped reasons

- conflicting_same_date_city_candidates: 1
- api_call_limit_not_checked: 1

## Interpretation

- `URLs added: 9` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 3769 event(s) already carried valid SeatGeek URLs before this run, including 3768 enrichment-eligible event(s).
- This run queried only the 2177 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-chris-tomlin-2026-birmingham-1kfzvpfyga2ugky | Chris Tomlin | 2026-11-30 | Birmingham | https://seatgeek.com/chris-tomlin-tickets/birmingham-alabama-alabama-theatre-birmingham-2026-11-30-7-pm/concert/18560966 |
| tm-chris-tomlin-2026-birmingham-1aezz_ogkloidyk | Chris Tomlin | 2026-12-01 | Birmingham | https://seatgeek.com/chris-tomlin-tickets/birmingham-alabama-alabama-theatre-birmingham-2026-12-01-7-pm/concert/18543012 |
| tm-chris-tomlin-2026-daytona-beach-z7r9jz1aav44a | Chris Tomlin | 2026-12-02 | Daytona Beach | https://seatgeek.com/chris-tomlin-tickets/daytona-beach-florida-peabody-auditorium-2026-12-02-7-pm/concert/18549313 |
| tm-chris-tomlin-2026-north-charleston-g5evz_oontasw | Chris Tomlin | 2026-12-03 | North Charleston | https://seatgeek.com/chris-tomlin-tickets/north-charleston-south-carolina-north-charleston-performing-arts-center-2026-12-03-7-pm/concert/18542992 |
| tm-chris-tomlin-2026-pensacola-g5viz_on0-j6v | Chris Tomlin | 2026-12-04 | Pensacola | https://seatgeek.com/chris-tomlin-tickets/pensacola-florida-saenger-theatre-pensacola-2026-12-04-7-pm/concert/18543014 |
| tm-chris-tomlin-2026-knoxville-g5viz_ojuxkcz | Chris Tomlin | 2026-12-08 | Knoxville | https://seatgeek.com/chris-tomlin-tickets/knoxville-tennessee-knoxville-civic-auditorium-and-coliseum-2026-12-08-7-pm/concert/18542727 |
| tm-chris-tomlin-2026-newport-news-z7r9jz1aavoof | Chris Tomlin | 2026-12-09 | Newport News | https://seatgeek.com/chris-tomlin-tickets/newport-news-virginia-ferguson-center-for-the-arts-concert-hall-2026-12-09-7-30-pm/concert/18549320 |
| tm-chris-tomlin-2026-jersey-city-vv1aezkf_gkedtdkm | Chris Tomlin | 2026-12-10 | Jersey City | https://seatgeek.com/chris-tomlin-tickets/jersey-city-new-jersey-loew-s-jersey-theatre-2026-12-10-5-30-pm/concert/18543039 |
| tm-chris-tomlin-2026-indianapolis-vv17fz_ogkmojkil | Chris Tomlin | 2026-12-16 | Indianapolis | https://seatgeek.com/chris-tomlin-tickets/indianapolis-indiana-murat-theatre-at-old-national-centre-2026-12-16-7-pm/concert/18543195 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-chris-tomlin-2026-detroit-z7r9jz1aav34i | Chris Tomlin | 2026-12-15 | Detroit | conflicting_same_date_city_candidates | https://seatgeek.com/chris-tomlin-tickets/detroit-michigan-fisher-theatre-2026-12-15-7-pm/concert/18745094 |
| tm-chris-tomlin-2026-milwaukee-z7r9jz1aav4be | Chris Tomlin | 2026-12-17 | Milwaukee | api_call_limit_not_checked | - |

## Accepted venue mismatches

| showId | TTC venue | SeatGeek venue | URL |
| --- | --- | --- | --- |
| tm-chris-tomlin-2026-daytona-beach-z7r9jz1aav44a | The Peabody Daytona Beach | Peabody Auditorium | https://seatgeek.com/chris-tomlin-tickets/daytona-beach-florida-peabody-auditorium-2026-12-02-7-pm/concert/18549313 |

## Conflicts found

- tm-chris-tomlin-2026-detroit-z7r9jz1aav34i (Chris Tomlin, 2026-12-15, Detroit)
  - 100: https://seatgeek.com/chris-tomlin-tickets/detroit-michigan-fisher-theatre-2026-12-15-12-pm/concert/18745492

## Rate-limited / not checked

- None

## API/environment failures

- None

## Skipped before any API call

Enrichment-eligible events missing a SeatGeek URL that this run deliberately did not query. Past events can never gain a useful CTA; an unresolvable venue-local date would make the SeatGeek date filter search the wrong night, so it is never guessed.

- None
# SeatGeek CTA auto-add log

Generated: 2026-11-22T18:12:05.140Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5949
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5947
- Events already carrying a valid SeatGeek URL: 3771
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3770
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2177
- Eligible (upcoming, resolvable local date) after pre-API filtering: 2
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 25
- Rotation: window 1 of 1 (key 20779)
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
- 3771 event(s) already carried valid SeatGeek URLs before this run, including 3770 enrichment-eligible event(s).
- This run queried only the 2177 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-rascal-flatts-2027-rexburg-z7r9jz1aaa-fg | Rascal Flatts | 2027-03-20 | Rexburg | https://seatgeek.com/rascal-flatts-tickets/rexburg-idaho-byu-idaho-center-2027-03-20-7-30-pm/concert/18839964 |
| tm-rascal-flatts-2026-las-vegas-17c8v0g6c1qpoq5 | Rascal Flatts | 2026-12-05 | Las Vegas | https://seatgeek.com/rascal-flatts-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2026-12-05-8-pm/concert/18354506 |

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

Generated: 2026-11-22T18:10:41.925Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5934
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5932
- Events already carrying a valid SeatGeek URL: 3760
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3759
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2173
- Eligible (upcoming, resolvable local date) after pre-API filtering: 39
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 25
- Rotation: window 2 of 2 (key 20779)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 11
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 8
- Events skipped: 3
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: api_call_limit_reached
- Next resume showId: tm-tori-kelly-2027-seattle-z7r9jz1aaafgn
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'tori-kelly' --max-api-calls 50 --resume-from 'tm-tori-kelly-2027-seattle-z7r9jz1aaafgn'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- city_or_metro_match_failed: 2
- api_call_limit_not_checked: 1

## Interpretation

- `URLs added: 8` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 3760 event(s) already carried valid SeatGeek URLs before this run, including 3759 enrichment-eligible event(s).
- This run queried only the 2173 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-tori-kelly-2027-louisville-1avbz_pgksxzvfu | Tori Kelly | 2027-04-24 | Louisville | https://seatgeek.com/tori-kelly-tickets/louisville-kentucky-louisville-palace-2027-04-24-8-pm/concert/18778568 |
| tm-tori-kelly-2027-indianapolis-vv17fz_pgkswj0w7 | Tori Kelly | 2027-04-27 | Indianapolis | https://seatgeek.com/tori-kelly-tickets/indianapolis-indiana-egyptian-room-at-old-national-centre-2027-04-27-7-30-pm/concert/18778566 |
| tm-tori-kelly-2027-milwaukee-z7r9jz1aaa4u3 | Tori Kelly | 2027-04-28 | Milwaukee | https://seatgeek.com/tori-kelly-tickets/milwaukee-wisconsin-pabst-theater-2027-04-28-7-pm/concert/18778953 |
| tm-tori-kelly-2027-chicago-vv178z_pgkrb2cst | Tori Kelly | 2027-04-30 | Chicago | https://seatgeek.com/tori-kelly-tickets/chicago-illinois-house-of-blues-chicago-2027-04-30-7-pm/concert/18778569 |
| tm-tori-kelly-2027-kansas-city-z7r9jz1aaaffz | Tori Kelly | 2027-05-05 | Kansas City | https://seatgeek.com/tori-kelly-tickets/kansas-city-missouri-the-truman-2027-05-05-7-pm/concert/18778957 |
| tm-tori-kelly-2027-denver-g5vzz_pmqeaxk | Tori Kelly | 2027-05-08 | Denver | https://seatgeek.com/tori-kelly-tickets/denver-colorado-summit-music-hall-denver-2027-05-08-7-pm/concert/18778574 |
| tm-tori-kelly-2027-salt-lake-city-g5vzz_pw0n4ot | Tori Kelly | 2027-05-09 | Salt Lake City | https://seatgeek.com/tori-kelly-tickets/salt-lake-city-utah-the-depot-salt-lake-city-2027-05-09-7-pm/concert/18778576 |
| tm-tori-kelly-2027-vancouver-1av7z_pgkwlyauw | Tori Kelly | 2027-05-12 | Vancouver | https://seatgeek.com/tori-kelly-tickets/vancouver-canada-queen-elizabeth-theatre-vancouver-2027-05-12-7-pm/concert/18778581 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-tori-kelly-2027-minneapolis-z7r9jz1aaa4uk | Tori Kelly | 2027-05-01 | Minneapolis | city_or_metro_match_failed | https://seatgeek.com/tori-kelly-tickets/saint-paul-minnesota-fitzgerald-theater-2027-05-01-7-pm/concert/18778955 |
| tm-tori-kelly-2027-saint-louis-vv17bz_pgkmbgu0t | Tori Kelly | 2027-05-04 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/tori-kelly-tickets/st-louis-missouri-the-pageant-st-louis-2027-05-04-8-pm/concert/18778571 |
| tm-tori-kelly-2027-seattle-z7r9jz1aaafgn | Tori Kelly | 2027-05-13 | Seattle | api_call_limit_not_checked | - |

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
