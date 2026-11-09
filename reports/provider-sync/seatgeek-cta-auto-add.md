# SeatGeek CTA auto-add log

Generated: 2026-11-09T21:12:42.899Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5308
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5308
- Events already carrying a valid SeatGeek URL: 3012
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3012
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2296
- Eligible (upcoming, resolvable local date) after pre-API filtering: 27
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 3 (key 20766)
- Runs needed to check every eligible event once: 3
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 10
- no_candidates_returned: 10
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-fall-out-boy-2027-arlington-vvg1yz_potb4m0
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'fall-out-boy' --max-api-calls 50 --resume-from 'tm-fall-out-boy-2027-arlington-vvg1yz_potb4m0'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 10

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 3012 event(s) already carried valid SeatGeek URLs before this run, including 3012 enrichment-eligible event(s).
- This run queried only the 2296 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-fall-out-boy-2027-praha-9-z698xzu0z16eepqfuf | Fall Out Boy | 2027-05-17 | Praha 9 | no_candidates_returned | - |
| tm-fall-out-boy-2027-assago-zg9rmiynyzf1fa | Fall Out Boy | 2027-05-21 | Assago | no_candidates_returned | - |
| tm-fall-out-boy-2027-madrid-z698xz2qz1k83o_fe | Fall Out Boy | 2027-05-23 | Madrid | no_candidates_returned | - |
| tm-fall-out-boy-2027-brussels-z698xzg2z16vfjc3ef | Fall Out Boy | 2027-05-27 | Brussels | no_candidates_returned | - |
| tm-fall-out-boy-2027-glasgow-1kuovp_ega1oorm | Fall Out Boy | 2027-05-30 | Glasgow | no_candidates_returned | - |
| tm-fall-out-boy-2027-dublin-1abzk4xgkdbhdty | Fall Out Boy | 2027-06-01 | Dublin | no_candidates_returned | - |
| tm-fall-out-boy-2027-manchester-1amzk4pgkdukzs6 | Fall Out Boy | 2027-06-03 | Manchester | no_candidates_returned | - |
| tm-fall-out-boy-2027-london-1adfz_4gkxmx9xa | Fall Out Boy | 2027-06-05 | London | no_candidates_returned | - |
| tm-fall-out-boy-2027-amsterdam-z698xzbpz16vv-vwva | Fall Out Boy | 2027-06-08 | Amsterdam | no_candidates_returned | - |
| tm-fall-out-boy-2027-odz-z698xzqpz16evyz9fj | Fall Out Boy | 2027-06-13 | Łódź | no_candidates_returned | - |

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

Generated: 2026-11-09T21:13:47.686Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5329
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5329
- Events already carrying a valid SeatGeek URL: 3012
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3012
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2317
- Eligible (upcoming, resolvable local date) after pre-API filtering: 21
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 3 (key 20766)
- Runs needed to check every eligible event once: 3
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 10
- no_candidates_returned: 10
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-the-dead-south-2027-montreal-1kg8vpbigaujwul
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'the-dead-south' --max-api-calls 50 --resume-from 'tm-the-dead-south-2027-montreal-1kg8vpbigaujwul'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 10

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 3012 event(s) already carried valid SeatGeek URLs before this run, including 3012 enrichment-eligible event(s).
- This run queried only the 2317 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-the-dead-south-2027-silver-spring-1avfz_4gktp2lu0 | The Dead South | 2027-04-19 | Silver Spring | no_candidates_returned | - |
| tm-the-dead-south-2027-saint-louis-16e7z_pf4g7neqx | The Dead South | 2027-04-27 | Saint Louis | no_candidates_returned | - |
| tm-the-dead-south-2027-kansas-city-vv1akzk40gkemk2eh | The Dead South | 2027-04-28 | Kansas City | no_candidates_returned | - |
| tm-the-dead-south-2027-nashville-g5viz_p3okygx | The Dead South | 2027-05-01 | Nashville | no_candidates_returned | - |
| tm-the-dead-south-2027-vancouver-1k78vpbzgacmkgo | The Dead South | 2027-09-23 | Vancouver | no_candidates_returned | - |
| tm-the-dead-south-2027-kelowna-z7r9jz1aa7moa | The Dead South | 2027-09-24 | Kelowna | no_candidates_returned | - |
| tm-the-dead-south-2027-calgary-1aozk4xgkd6z6-j | The Dead South | 2027-09-25 | Calgary | no_candidates_returned | - |
| tm-the-dead-south-2027-edmonton-1aozk4ngkemvpah | The Dead South | 2027-09-26 | Edmonton | no_candidates_returned | - |
| tm-the-dead-south-2027-toronto-1a8zk4pgkexzbc2 | The Dead South | 2027-09-30 | Toronto | no_candidates_returned | - |
| tm-the-dead-south-2027-montreal-1kg8vpbigaujeuh | The Dead South | 2027-10-01 | Montreal | no_candidates_returned | - |

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
