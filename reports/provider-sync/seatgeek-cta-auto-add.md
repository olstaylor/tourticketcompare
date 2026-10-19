# SeatGeek CTA auto-add log

Generated: 2026-10-19T17:17:40.509Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3750
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2931
- Events already carrying a valid SeatGeek URL: 1551
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1093
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1838
- Eligible (upcoming, resolvable local date) after pre-API filtering: 12
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 2 (key 20745)
- Runs needed to check every eligible event once: 2
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
- 1551 event(s) already carried valid SeatGeek URLs before this run, including 1093 enrichment-eligible event(s).
- This run queried only the 1838 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-arcangel-2026-inglewood-vvg1iz_1r3weok | Arcangel | 2026-11-20 | Inglewood | https://seatgeek.com/arcangel-tickets/inglewood-california-youtube-theater-2026-11-20-8-pm/concert/18266331 |
| tm-arcangel-2026-san-jose-g5vyz_1s5ejmh | Arcangel | 2026-11-21 | San Jose | https://seatgeek.com/arcangel-tickets/san-jose-california-san-jose-civic-2026-11-21-8-pm/concert/18266334 |

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

Generated: 2026-10-19T17:17:25.999Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3738
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2919
- Events already carrying a valid SeatGeek URL: 1549
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1091
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1828
- Eligible (upcoming, resolvable local date) after pre-API filtering: 17
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 2 (key 20745)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 7
- Events checked by this run: 7
- API calls made: 35
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 7
- no_candidates_returned: 7
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 7

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1549 event(s) already carried valid SeatGeek URLs before this run, including 1091 enrichment-eligible event(s).
- This run queried only the 1828 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-bryson-tiller-2026-manchester-17uyv0g65whosmd | Bryson Tiller | 2026-12-03 | Manchester | no_candidates_returned | - |
| tm-bryson-tiller-2026-leeds-g5vhz_5siv57- | Bryson Tiller | 2026-12-04 | Leeds | no_candidates_returned | - |
| tm-bryson-tiller-2026-cardiff-17uov0g65m7upzx | Bryson Tiller | 2026-12-05 | Cardiff | no_candidates_returned | - |
| tm-bryson-tiller-2026-london-17u8v0g6gkcb7og | Bryson Tiller | 2026-12-07 | London | no_candidates_returned | - |
| tm-bryson-tiller-2026-birmingham-17fyv0g65u9_ewp | Bryson Tiller | 2026-12-09 | Birmingham | no_candidates_returned | - |
| tm-bryson-tiller-2027-linlithgow-ave-177yv0g65m3hnkk | Bryson Tiller | 2027-01-21 | Linlithgow Ave | no_candidates_returned | - |
| tm-bryson-tiller-2027-auckland-17azv0g65qclfnt | Bryson Tiller | 2027-01-27 | Auckland | no_candidates_returned | - |

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

Generated: 2026-10-19T17:16:08.974Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3700
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2887
- Events already carrying a valid SeatGeek URL: 1549
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1091
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1796
- Eligible (upcoming, resolvable local date) after pre-API filtering: 0
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20745)
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
- 1549 event(s) already carried valid SeatGeek URLs before this run, including 1091 enrichment-eligible event(s).
- This run queried only the 1796 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
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

Generated: 2026-10-19T17:16:08.022Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3700
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2887
- Events already carrying a valid SeatGeek URL: 1549
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1091
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1796
- Eligible (upcoming, resolvable local date) after pre-API filtering: 2
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20745)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 2
- Events checked by this run: 2
- API calls made: 10
- Rate-limit responses: 0
- URLs added: 1
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

- `URLs added: 1` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1549 event(s) already carried valid SeatGeek URLs before this run, including 1091 enrichment-eligible event(s).
- This run queried only the 1796 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-chris-stapleton-2026-lincoln-vv1akzk8pgkdqln9v | Chris Stapleton | 2026-10-26 | Lincoln | https://seatgeek.com/chris-stapleton-tickets/lincoln-nebraska-pinnacle-bank-arena-2026-10-26-7-30-pm/concert/18004730 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-chris-stapleton-2026-nashville-g5viz_kleeols | Chris Stapleton | 2026-12-01 | Nashville | no_candidates_returned | - |

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

Generated: 2026-10-19T17:18:14.026Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3755
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2936
- Events already carrying a valid SeatGeek URL: 1556
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1098
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1838
- Eligible (upcoming, resolvable local date) after pre-API filtering: 5
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20745)
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
- 1556 event(s) already carried valid SeatGeek URLs before this run, including 1098 enrichment-eligible event(s).
- This run queried only the 1838 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-garth-brooks-2026-seattle-vvg1hz_fstanbp | Garth Brooks | 2026-11-13 | Seattle | https://seatgeek.com/garth-brooks-tickets/seattle-washington-climate-pledge-arena-2026-11-13-8-pm/concert/18686081 |
| tm-garth-brooks-2026-seattle-vvg1hz_fghqxgl | Garth Brooks | 2026-11-14 | Seattle | https://seatgeek.com/garth-brooks-tickets/seattle-washington-climate-pledge-arena-2026-11-14-8-pm/concert/18686083 |
| tm-garth-brooks-2026-tulsa-1aozkfugkd8c0en | Garth Brooks | 2026-10-23 | Tulsa | https://seatgeek.com/garth-brooks-tickets/tulsa-oklahoma-bok-center-2026-10-23-8-pm/concert/18613386 |
| tm-garth-brooks-2026-tulsa-1aozkfugkdlv4l0 | Garth Brooks | 2026-10-24 | Tulsa | https://seatgeek.com/garth-brooks-tickets/tulsa-oklahoma-bok-center-2026-10-24-8-pm/concert/18613385 |
| tm-garth-brooks-2026-tulsa-1aozkfugkdlmpx_ | Garth Brooks | 2026-10-25 | Tulsa | https://seatgeek.com/garth-brooks-tickets/tulsa-oklahoma-bok-center-2026-10-25-2-pm/concert/18613384 |

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

Generated: 2026-10-19T17:16:41.024Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3717
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2902
- Events already carrying a valid SeatGeek URL: 1549
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1091
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1811
- Eligible (upcoming, resolvable local date) after pre-API filtering: 15
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 2 (key 20745)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 5
- Events checked by this run: 5
- API calls made: 25
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 5
- no_candidates_returned: 5
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 5

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1549 event(s) already carried valid SeatGeek URLs before this run, including 1091 enrichment-eligible event(s).
- This run queried only the 1811 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-phoebe-bridgers-2026-manchester-17uyv0g6gcqzprx | Phoebe Bridgers | 2026-11-26 | Manchester | no_candidates_returned | - |
| tm-phoebe-bridgers-2026-glasgow-17uov0g6gor33_x | Phoebe Bridgers | 2026-11-27 | Glasgow | no_candidates_returned | - |
| tm-phoebe-bridgers-2026-birmingham-17fyv0g6g2_ps5a | Phoebe Bridgers | 2026-11-28 | Birmingham | no_candidates_returned | - |
| tm-phoebe-bridgers-2026-london-17u8v0g6gpqo1c- | Phoebe Bridgers | 2026-12-01 | London | no_candidates_returned | - |
| tm-phoebe-bridgers-2026-london-17u8v0g6gnyjt5y | Phoebe Bridgers | 2026-12-02 | London | no_candidates_returned | - |

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
