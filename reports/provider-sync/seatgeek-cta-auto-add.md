# SeatGeek CTA auto-add log

Generated: 2026-10-23T15:34:27.964Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3969
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3111
- Events already carrying a valid SeatGeek URL: 2091
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1610
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1501
- Eligible (upcoming, resolvable local date) after pre-API filtering: 9
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20749)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 9
- Events checked by this run: 9
- API calls made: 45
- Rate-limit responses: 0
- URLs added: 9
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

- `URLs added: 9` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2091 event(s) already carried valid SeatGeek URLs before this run, including 1610 enrichment-eligible event(s).
- This run queried only the 1501 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-cece-winans-2026-duluth-vvg1zz_a3epgc8 | CeCe Winans | 2026-10-23 | Duluth | https://seatgeek.com/cece-winans-tickets/duluth-georgia-gas-south-arena-2026-10-23-7-pm/concert/18089916 |
| tm-cece-winans-2026-new-orleans-g5viz_a29lq83 | CeCe Winans | 2026-10-24 | New Orleans | https://seatgeek.com/cece-winans-tickets/new-orleans-louisiana-smoothie-king-center-2026-10-24-7-pm/concert/18089898 |
| tm-cece-winans-2026-orlando-16xzkokj9za57fca | CeCe Winans | 2026-10-27 | Orlando | https://seatgeek.com/cece-winans-tickets/orlando-florida-addition-financial-arena-2026-10-27-7-pm/concert/18090034 |
| tm-cece-winans-2026-north-charleston-g5evz_a3s0b-f | CeCe Winans | 2026-10-28 | North Charleston | https://seatgeek.com/cece-winans-tickets/north-charleston-south-carolina-north-charleston-coliseum-2026-10-28-7-pm/concert/18089897 |
| tm-cece-winans-2026-tampa-vvg1vz_a3ceusx | CeCe Winans | 2026-10-29 | Tampa | https://seatgeek.com/cece-winans-tickets/tampa-florida-yuengling-center-2026-10-29-7-pm/concert/18090040 |
| tm-cece-winans-2026-jacksonville-1kfov047gag6hdu | CeCe Winans | 2026-10-30 | Jacksonville | https://seatgeek.com/cece-winans-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2026-10-30-7-pm/concert/18089908 |
| tm-cece-winans-2026-seattle-vvg1hz_c5fehuk | CeCe Winans | 2026-12-10 | Seattle | https://seatgeek.com/cece-winans-tickets/seattle-washington-wamu-theater-2026-12-10-7-pm/concert/18361599 |
| tm-cece-winans-2026-phoenix-17k8v0g6ch4_jyt | CeCe Winans | 2026-12-15 | Phoenix | https://seatgeek.com/cece-winans-tickets/phoenix-arizona-arizona-financial-theatre-2026-12-15-7-pm/concert/18361639 |
| tm-cece-winans-2026-sacramento-g5vyz_cr1cmnb | CeCe Winans | 2026-12-18 | Sacramento | https://seatgeek.com/cece-winans-tickets/sacramento-california-sacramento-memorial-auditorium-2026-12-18-7-pm/concert/18361612 |

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

Generated: 2026-10-23T15:36:09.314Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4025
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3145
- Events already carrying a valid SeatGeek URL: 2099
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1618
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1527
- Eligible (upcoming, resolvable local date) after pre-API filtering: 12
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 2 (key 20749)
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
- 2099 event(s) already carried valid SeatGeek URLs before this run, including 1618 enrichment-eligible event(s).
- This run queried only the 1527 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-gavin-adcock-2027-houston-g5diz_f9nlu8w | Gavin Adcock | 2027-05-08 | Houston | https://seatgeek.com/gavin-adcock-tickets/houston-texas-white-oak-music-hall-lawn-2027-05-08-6-pm/concert/18674403 |
| tm-gavin-adcock-2027-atlantic-city-vv17fz_fgkbsdawx | Gavin Adcock | 2027-05-14 | Atlantic City | https://seatgeek.com/gavin-adcock-tickets/atlantic-city-new-jersey-hard-rock-live-at-etess-arena-2027-05-14-7-pm/concert/18672973 |

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

Generated: 2026-10-23T15:35:50.226Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3996
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3133
- Events already carrying a valid SeatGeek URL: 2097
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1616
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1517
- Eligible (upcoming, resolvable local date) after pre-API filtering: 14
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 2 (key 20749)
- Runs needed to check every eligible event once: 2
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
- 2097 event(s) already carried valid SeatGeek URLs before this run, including 1616 enrichment-eligible event(s).
- This run queried only the 1517 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-jack-johnson-2026-waipara-1kazv0jzgaua-ts | Jack Johnson | 2026-11-22 | Waipara | no_candidates_returned | - |
| tm-jack-johnson-2027-st-austell-g5vhz_4eimdn_ | Jack Johnson | 2027-07-02 | St Austell | no_candidates_returned | - |
| tm-jack-johnson-2027-st-austell-g5vhz_4d63ah_ | Jack Johnson | 2027-07-03 | St Austell | no_candidates_returned | - |
| tm-jack-johnson-2027-london-16dfz_4ebg7va-j | Jack Johnson | 2027-07-04 | London | no_candidates_returned | - |

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

Generated: 2026-10-23T15:35:22.741Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3980
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3119
- Events already carrying a valid SeatGeek URL: 2097
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1616
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1503
- Eligible (upcoming, resolvable local date) after pre-API filtering: 6
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20749)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 6
- Events checked by this run: 6
- API calls made: 30
- Rate-limit responses: 0
- URLs added: 6
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

- `URLs added: 6` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2097 event(s) already carried valid SeatGeek URLs before this run, including 1616 enrichment-eligible event(s).
- This run queried only the 1503 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-karan-aujla-2026-sacramento-g5vyz_3m-gnbm | Karan Aujla | 2026-11-07 | Sacramento | https://seatgeek.com/karan-aujla-tickets/sacramento-california-golden-1-center-2026-11-07-8-pm/concert/18592286 |
| tm-karan-aujla-2026-los-angeles-g5eyz_3lgqzvb | Karan Aujla | 2026-11-09 | Los Angeles | https://seatgeek.com/karan-aujla-tickets/los-angeles-california-crypto-com-arena-2026-11-09-8-pm/concert/18592285 |
| tm-karan-aujla-2026-dallas-vvg1yz_3r_e2at | Karan Aujla | 2026-11-13 | Dallas | https://seatgeek.com/karan-aujla-tickets/dallas-texas-american-airlines-center-2026-11-13-8-pm/concert/18592287 |
| tm-karan-aujla-2026-atlanta-vvg1zz_3myjgwo | Karan Aujla | 2026-11-16 | Atlanta | https://seatgeek.com/karan-aujla-tickets/atlanta-georgia-state-farm-arena-1-2026-11-16-8-pm/concert/18592290 |
| tm-karan-aujla-2026-new-york-g5diz_3ivacnr | Karan Aujla | 2026-11-18 | New York | https://seatgeek.com/karan-aujla-tickets/new-york-new-york-madison-square-garden-2026-11-18-8-pm/concert/18592288 |
| tm-karan-aujla-2026-washington-1a4zkftgkdhkud5 | Karan Aujla | 2026-11-20 | Washington | https://seatgeek.com/karan-aujla-tickets/washington-district-of-columbia-capital-one-arena-2026-11-20-8-pm/concert/18592289 |

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

Generated: 2026-10-23T15:35:53.608Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4001
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3133
- Events already carrying a valid SeatGeek URL: 2097
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1616
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1517
- Eligible (upcoming, resolvable local date) after pre-API filtering: 0
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20749)
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
- 2097 event(s) already carried valid SeatGeek URLs before this run, including 1616 enrichment-eligible event(s).
- This run queried only the 1517 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
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

Generated: 2026-10-23T15:34:43.265Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3974
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3113
- Events already carrying a valid SeatGeek URL: 2091
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1610
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1503
- Eligible (upcoming, resolvable local date) after pre-API filtering: 2
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20749)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 2
- Events checked by this run: 2
- API calls made: 10
- Rate-limit responses: 0
- URLs added: 0
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

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2091 event(s) already carried valid SeatGeek URLs before this run, including 1610 enrichment-eligible event(s).
- This run queried only the 1503 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-role-model-2027-dublin-17kzv0g6uvbpba3 | Role Model | 2027-02-22 | Dublin | no_candidates_returned | - |
| tm-role-model-2027-london-17uyv0g6ueic0m_ | Role Model | 2027-02-24 | London | no_candidates_returned | - |

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
