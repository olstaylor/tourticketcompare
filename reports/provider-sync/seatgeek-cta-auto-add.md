# SeatGeek CTA auto-add log

Generated: 2026-10-15T15:24:45.291Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3525
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2772
- Events already carrying a valid SeatGeek URL: 1199
- Enrichment-eligible events already carrying a valid SeatGeek URL: 893
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1879
- Eligible (upcoming, resolvable local date) after pre-API filtering: 1
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20741)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 1
- Events checked by this run: 1
- API calls made: 5
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 1
- no_candidates_returned: 1
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 1

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1199 event(s) already carried valid SeatGeek URLs before this run, including 893 enrichment-eligible event(s).
- This run queried only the 1879 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-blink-182-2027-milano-zg9rmiynyzefk6 | blink-182 | 2027-06-13 | Milano | no_candidates_returned | - |

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

Generated: 2026-10-15T15:25:48.293Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3537
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2782
- Events already carrying a valid SeatGeek URL: 1208
- Enrichment-eligible events already carrying a valid SeatGeek URL: 902
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1880
- Eligible (upcoming, resolvable local date) after pre-API filtering: 10
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20741)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 9
- Events skipped: 1
- no_candidates_returned: 1
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 1

## Interpretation

- `URLs added: 9` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1208 event(s) already carried valid SeatGeek URLs before this run, including 902 enrichment-eligible event(s).
- This run queried only the 1880 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-gorillaz-2026-austin-g5diz_ar2gvot | Gorillaz | 2026-10-15 | Austin | https://seatgeek.com/gorillaz-tickets/austin-texas-moody-center-atx-2026-10-15-7-pm/concert/18102838 |
| tm-gorillaz-2026-fort-worth-vvg1yz_dxo-e0o | Gorillaz | 2026-10-16 | Fort Worth | https://seatgeek.com/gorillaz-tickets/fort-worth-texas-dickies-arena-2026-10-16-7-30-pm/concert/18102840 |
| tm-gorillaz-2026-denver-g5vzz_amqia8m | Gorillaz | 2026-10-18 | Denver | https://seatgeek.com/gorillaz-tickets/denver-colorado-ball-arena-2026-10-18-7-pm/concert/18102843 |
| tm-gorillaz-2026-phoenix-1av0z_agknirbye | Gorillaz | 2026-10-23 | Phoenix | https://seatgeek.com/gorillaz-tickets/phoenix-arizona-mortgage-matchup-center-2026-10-23-7-pm/concert/18102846 |
| tm-gorillaz-2026-inglewood-vv170z_agkmi0jmt | Gorillaz | 2026-10-24 | Inglewood | https://seatgeek.com/gorillaz-tickets/inglewood-california-kia-forum-2026-10-24-7-30-pm/concert/18102848 |
| tm-gorillaz-2026-san-diego-vvg1iz_ai_rrcv | Gorillaz | 2026-10-25 | San Diego | https://seatgeek.com/gorillaz-tickets/san-diego-california-pechanga-arena-san-diego-2026-10-25-7-30-pm/concert/18102849 |
| tm-gorillaz-2026-oakland-g5vyz_allhhol | Gorillaz | 2026-10-28 | Oakland | https://seatgeek.com/gorillaz-tickets/oakland-california-oakland-arena-2026-10-28-7-pm/concert/18102850 |
| tm-gorillaz-2026-portland-vvg1hz_anwqdfp | Gorillaz | 2026-10-30 | Portland | https://seatgeek.com/gorillaz-tickets/portland-oregon-moda-center-2026-10-30-7-pm/concert/18102851 |
| tm-gorillaz-2026-seattle-vvg1hz_aeloqv3 | Gorillaz | 2026-10-31 | Seattle | https://seatgeek.com/gorillaz-tickets/seattle-washington-climate-pledge-arena-2026-10-31-7-30-pm/concert/18102856 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-gorillaz-2026-zapopan-g5dvz_8mtgfu6 | Gorillaz | 2026-12-09 | Zapopan | no_candidates_returned | - |

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

Generated: 2026-10-15T15:24:37.307Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3524
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2771
- Events already carrying a valid SeatGeek URL: 1199
- Enrichment-eligible events already carrying a valid SeatGeek URL: 893
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1878
- Eligible (upcoming, resolvable local date) after pre-API filtering: 6
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20741)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 6
- Events checked by this run: 6
- API calls made: 30
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 6
- no_candidates_returned: 6
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 6

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1199 event(s) already carried valid SeatGeek URLs before this run, including 893 enrichment-eligible event(s).
- This run queried only the 1878 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-hayley-williams-2026-ciudad-de-mexico-g5dvz_1q0q4bc | Hayley Williams | 2026-11-26 | Ciudad de México | no_candidates_returned | - |
| tm-hayley-williams-2027-ciudad-de-mexico-g5dvz_5u9jpc7 | Hayley Williams | 2027-01-13 | Ciudad de México | no_candidates_returned | - |
| tm-hayley-williams-2027-monterrey-17azv0g65m2hkin | Hayley Williams | 2027-01-15 | Monterrey | no_candidates_returned | - |
| tm-hayley-williams-2027-zapopan-17azv0g65ulwtlf | Hayley Williams | 2027-01-17 | Zapopan | no_candidates_returned | - |
| tm-hayley-williams-2027-glasgow-1auzkf-gkd-5zto | Hayley Williams | 2027-06-23 | Glasgow | no_candidates_returned | - |
| tm-hayley-williams-2027-cardiff-1adbz_ogkwuumuk | Hayley Williams | 2027-06-30 | Cardiff | no_candidates_returned | - |

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

Generated: 2026-10-15T15:24:47.224Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3526
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2772
- Events already carrying a valid SeatGeek URL: 1199
- Enrichment-eligible events already carrying a valid SeatGeek URL: 893
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1879
- Eligible (upcoming, resolvable local date) after pre-API filtering: 0
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20741)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 0
- Events checked by this run: 0
- API calls made: 0
- Rate-limit responses: 0
- URLs added: 0
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

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1199 event(s) already carried valid SeatGeek URLs before this run, including 893 enrichment-eligible event(s).
- This run queried only the 1879 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

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

Generated: 2026-10-15T15:23:58.601Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3517
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2765
- Events already carrying a valid SeatGeek URL: 1199
- Enrichment-eligible events already carrying a valid SeatGeek URL: 893
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1872
- Eligible (upcoming, resolvable local date) after pre-API filtering: 0
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20741)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 0
- Events checked by this run: 0
- API calls made: 0
- Rate-limit responses: 0
- URLs added: 0
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

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1199 event(s) already carried valid SeatGeek URLs before this run, including 893 enrichment-eligible event(s).
- This run queried only the 1872 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

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

Generated: 2026-10-15T15:23:59.823Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3517
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2765
- Events already carrying a valid SeatGeek URL: 1199
- Enrichment-eligible events already carrying a valid SeatGeek URL: 893
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1872
- Eligible (upcoming, resolvable local date) after pre-API filtering: 0
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20741)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 0
- Events checked by this run: 0
- API calls made: 0
- Rate-limit responses: 0
- URLs added: 0
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

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1199 event(s) already carried valid SeatGeek URLs before this run, including 893 enrichment-eligible event(s).
- This run queried only the 1872 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

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
