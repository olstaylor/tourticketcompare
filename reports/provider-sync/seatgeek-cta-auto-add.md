# SeatGeek CTA auto-add log

Generated: 2026-10-24T14:13:48.396Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4049
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3160
- Events already carrying a valid SeatGeek URL: 2150
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1644
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1516
- Eligible (upcoming, resolvable local date) after pre-API filtering: 7
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20750)
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
- 2150 event(s) already carried valid SeatGeek URLs before this run, including 1644 enrichment-eligible event(s).
- This run queried only the 1516 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-beck-2026-washington-1avfz_fgkdleutu | Beck | 2026-10-25 | Washington | https://seatgeek.com/beck-tickets/washington-district-of-columbia-the-anthem-dc-2026-10-25-7-30-pm/concert/18194417 |
| tm-beck-2026-durham-g5evz_fbugjju | Beck | 2026-10-27 | Durham | https://seatgeek.com/beck-tickets/durham-north-carolina-dpac-durham-performing-arts-center-2026-10-27-8-pm/concert/18194420 |
| tm-beck-2026-asheville-g5evz_ftjugdd | Beck | 2026-10-28 | Asheville | https://seatgeek.com/beck-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2026-10-28-8-pm/concert/18194423 |
| tm-beck-2026-atlanta-vvg1zz_fbor4w0 | Beck | 2026-10-30 | Atlanta | https://seatgeek.com/beck-tickets/atlanta-georgia-coca-cola-roxy-theatre-2026-10-30-8-pm/concert/18194424 |
| tm-beck-2026-nashville-g5viz_kspxnlj | Beck | 2026-10-31 | Nashville | https://seatgeek.com/beck-tickets/nashville-tennessee-the-truth-nashville-2026-10-31-8-pm/concert/18126028 |
| tm-beck-2026-seattle-vvg1hz_3rxx2pm | Beck | 2026-11-08 | Seattle | https://seatgeek.com/beck-tickets/seattle-washington-benaroya-hall-2026-11-08-7-pm/concert/18590355 |
| tm-beck-2026-vancouver-1aozk3a0babze8k | Beck | 2026-11-09 | Vancouver | https://seatgeek.com/beck-tickets/vancouver-canada-queen-elizabeth-theatre-vancouver-2026-11-09-8-pm/concert/18194425 |

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

Generated: 2026-10-24T14:14:40.100Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4057
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3168
- Events already carrying a valid SeatGeek URL: 2150
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1644
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1524
- Eligible (upcoming, resolvable local date) after pre-API filtering: 8
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20750)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 8
- Events checked by this run: 8
- API calls made: 40
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 8
- no_candidates_returned: 8
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 8

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2150 event(s) already carried valid SeatGeek URLs before this run, including 1644 enrichment-eligible event(s).
- This run queried only the 1524 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-dermot-kennedy-2026-west-perth-1avgz_agkmqzbyp | Dermot Kennedy | 2026-11-14 | West Perth | no_candidates_returned | - |
| tm-dermot-kennedy-2026-brisbane-1avgz_agksulpj1 | Dermot Kennedy | 2026-11-17 | Brisbane | no_candidates_returned | - |
| tm-dermot-kennedy-2026-christchurch-1ae8z_agkm57djw | Dermot Kennedy | 2026-11-25 | Christchurch | no_candidates_returned | - |
| tm-dermot-kennedy-2026-wellington-1ae8z_agkmdax8r | Dermot Kennedy | 2026-11-27 | Wellington | no_candidates_returned | - |
| tm-dermot-kennedy-2026-auckland-1ae8z_agkranxjl | Dermot Kennedy | 2026-11-28 | Auckland | no_candidates_returned | - |
| tm-dermot-kennedy-2027-tramore-rd-cork-1kkzvpozga5u0fg | Dermot Kennedy | 2027-06-23 | Tramore Rd Cork | no_candidates_returned | - |
| tm-dermot-kennedy-2027-tramore-rd-cork-1kkzvpozga5mff_ | Dermot Kennedy | 2027-06-24 | Tramore Rd Cork | no_candidates_returned | - |
| tm-dermot-kennedy-2027-belfast-1azzk4kgkeju-cx | Dermot Kennedy | 2027-06-26 | Belfast | no_candidates_returned | - |

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

Generated: 2026-10-24T14:14:48.872Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4060
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3169
- Events already carrying a valid SeatGeek URL: 2151
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1645
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1524
- Eligible (upcoming, resolvable local date) after pre-API filtering: 1
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20750)
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
- 2151 event(s) already carried valid SeatGeek URLs before this run, including 1645 enrichment-eligible event(s).
- This run queried only the 1524 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-turnpike-troubadours-2026-las-vegas-17ayv0g62soqkki | Turnpike Troubadours | 2026-12-11 | Las Vegas | https://seatgeek.com/turnpike-troubadours-tickets/las-vegas-nevada-brooklyn-bowl-las-vegas-2026-12-11-9-pm/concert/18424535 |

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

Generated: 2026-10-24T14:13:03.983Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4040
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3153
- Events already carrying a valid SeatGeek URL: 2143
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1637
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1516
- Eligible (upcoming, resolvable local date) after pre-API filtering: 4
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20750)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 4
- Events checked by this run: 4
- API calls made: 20
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 4
- no_candidates_returned: 4
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 4

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2143 event(s) already carried valid SeatGeek URLs before this run, including 1637 enrichment-eligible event(s).
- This run queried only the 1516 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-u2-2027-ciudad-de-mexico-1afzk4agkebign2 | U2 | 2027-03-02 | Ciudad de México | no_candidates_returned | - |
| tm-u2-2027-ciudad-de-mexico-1afzk4agkeysi-t | U2 | 2027-02-23 | Ciudad de México | no_candidates_returned | - |
| tm-u2-2027-ciudad-de-mexico-1afzk4agkebeind | U2 | 2027-02-26 | Ciudad de México | no_candidates_returned | - |
| tm-u2-2027-ciudad-de-mexico-1afzk4agkebeina | U2 | 2027-02-28 | Ciudad de México | no_candidates_returned | - |

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
