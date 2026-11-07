# SeatGeek CTA auto-add log

Generated: 2026-11-07T16:44:38.494Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5247
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5247
- Events already carrying a valid SeatGeek URL: 2849
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2849
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2398
- Eligible (upcoming, resolvable local date) after pre-API filtering: 16
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20764)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 10
- Events skipped: 0
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-breaking-benjamin-2027-albany-k7vgf_4lulxcj
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'breaking-benjamin' --max-api-calls 50 --resume-from 'tm-breaking-benjamin-2027-albany-k7vgf_4lulxcj'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2849 event(s) already carried valid SeatGeek URLs before this run, including 2849 enrichment-eligible event(s).
- This run queried only the 2398 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-breaking-benjamin-2027-cedar-rapids-vv1akzk49gkd1-vah | Breaking Benjamin | 2027-02-16 | Cedar Rapids | https://seatgeek.com/breaking-benjamin-tickets/cedar-rapids-iowa-alliant-energy-powerhouse-2027-02-16-6-30-pm/concert/18742671 |
| tm-breaking-benjamin-2027-kalamazoo-z7r9jz1aa7mr3 | Breaking Benjamin | 2027-02-18 | Kalamazoo | https://seatgeek.com/breaking-benjamin-tickets/kalamazoo-michigan-wings-event-center-2027-02-18-6-30-pm/concert/18742686 |
| tm-breaking-benjamin-2027-fort-wayne-vv1aazk4pgkde48xz | Breaking Benjamin | 2027-02-19 | Fort Wayne | https://seatgeek.com/breaking-benjamin-tickets/fort-wayne-indiana-allen-county-war-memorial-coliseum-2027-02-19-6-30-pm/concert/18742688 |
| tm-breaking-benjamin-2027-evansville-vv1aazk49gkengkxe | Breaking Benjamin | 2027-02-20 | Evansville | https://seatgeek.com/breaking-benjamin-tickets/evansville-indiana-ford-center-in-2027-02-20-6-30-pm/concert/18742693 |
| tm-breaking-benjamin-2027-peoria-vv1kvyvp4yga29pez | Breaking Benjamin | 2027-02-22 | Peoria | https://seatgeek.com/breaking-benjamin-tickets/peoria-illinois-peoria-civic-center-arena-2027-02-22-6-30-pm/concert/18742700 |
| tm-breaking-benjamin-2027-louisville-1kaovp4zgaui0w6 | Breaking Benjamin | 2027-02-23 | Louisville | https://seatgeek.com/breaking-benjamin-tickets/louisville-kentucky-kfc-yum-center-2027-02-23-6-30-pm/concert/18742710 |
| tm-breaking-benjamin-2027-columbus-vv1aazk49gkeujesy | Breaking Benjamin | 2027-02-25 | Columbus | https://seatgeek.com/breaking-benjamin-tickets/columbus-ohio-nationwide-arena-2027-02-25-6-30-pm/concert/18742717 |
| tm-breaking-benjamin-2027-university-park-vv1aezk4pgkdz5iak | Breaking Benjamin | 2027-02-26 | University Park | https://seatgeek.com/breaking-benjamin-tickets/university-park-pennsylvania-bryce-jordan-center-2027-02-26-6-30-pm/concert/18742722 |
| tm-breaking-benjamin-2027-uncasville-g5vvz_4l6n7hw | Breaking Benjamin | 2027-02-28 | Uncasville | https://seatgeek.com/breaking-benjamin-tickets/uncasville-connecticut-mohegan-sun-arena-2027-02-28-6-30-pm/concert/18742724 |
| tm-breaking-benjamin-2027-syracuse-k7vgf_4hgmiu3 | Breaking Benjamin | 2027-03-02 | Syracuse | https://seatgeek.com/breaking-benjamin-tickets/syracuse-new-york-upstate-medical-university-arena-at-the-oncenter-war-memorial-2027-03-02-6-30-pm/concert/18742726 |

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

Generated: 2026-11-07T16:45:43.880Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5274
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5274
- Events already carrying a valid SeatGeek URL: 2859
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2859
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2415
- Eligible (upcoming, resolvable local date) after pre-API filtering: 27
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 3 (key 20764)
- Runs needed to check every eligible event once: 3
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 10
- Events skipped: 0
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-feid-2027-fresno-g5vyz_pcewaox
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'feid' --max-api-calls 50 --resume-from 'tm-feid-2027-fresno-g5vyz_pcewaox'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2859 event(s) already carried valid SeatGeek URLs before this run, including 2859 enrichment-eligible event(s).
- This run queried only the 2415 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-feid-2027-montreal-1ad7z_4gkd0zh9f | FEID | 2027-03-13 | Montreal | https://seatgeek.com/feid-tickets/montreal-canada-centre-bell-2027-03-13-8-pm/concert/18746768 |
| tm-feid-2027-chicago-vv1a7zk4xgkdhjeow | FEID | 2027-03-18 | Chicago | https://seatgeek.com/feid-tickets/chicago-illinois-united-center-2027-03-18-8-pm/concert/18746737 |
| tm-feid-2027-dallas-vvg1yz_pkmsn11 | FEID | 2027-03-24 | Dallas | https://seatgeek.com/feid-tickets/dallas-texas-american-airlines-center-2027-03-24-8-pm/concert/18746738 |
| tm-feid-2027-austin-g5diz_pkrkhdd | FEID | 2027-03-26 | Austin | https://seatgeek.com/feid-tickets/austin-texas-moody-center-atx-2027-03-26-8-pm/concert/18746739 |
| tm-feid-2027-denver-g5vzz_pkrlpf6 | FEID | 2027-03-31 | Denver | https://seatgeek.com/feid-tickets/denver-colorado-ball-arena-2027-03-31-8-pm/concert/18746743 |
| tm-feid-2027-seattle-vvg1hz_pkvb_3- | FEID | 2027-04-04 | Seattle | https://seatgeek.com/feid-tickets/seattle-washington-climate-pledge-arena-2027-04-04-8-pm/concert/18746746 |
| tm-feid-2027-portland-vvg1hz_pckgfmh | FEID | 2027-04-06 | Portland | https://seatgeek.com/feid-tickets/portland-oregon-moda-center-2027-04-06-8-pm/concert/18746749 |
| tm-feid-2027-sacramento-g5vyz_p5pdckj | FEID | 2027-04-08 | Sacramento | https://seatgeek.com/feid-tickets/sacramento-california-golden-1-center-2027-04-08-8-pm/concert/18746750 |
| tm-feid-2027-san-francisco-g5vyz_p1g3qkq | FEID | 2027-04-10 | San Francisco | https://seatgeek.com/feid-tickets/san-francisco-california-chase-center-2027-04-10-8-pm/concert/18746753 |
| tm-feid-2027-san-jose-g5vyz_p5keuz1 | FEID | 2027-04-11 | San Jose | https://seatgeek.com/feid-tickets/san-jose-california-sap-center-at-san-jose-2027-04-11-8-pm/concert/18746754 |

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
