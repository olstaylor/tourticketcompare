# SeatGeek CTA auto-add log

Generated: 2026-11-27T07:33:57.640Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 6139
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 6137
- Events already carrying a valid SeatGeek URL: 3781
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3781
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2356
- Eligible (upcoming, resolvable local date) after pre-API filtering: 32
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 25
- Rotation: window 1 of 2 (key 20784)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 25
- Events checked by this run: 25
- API calls made: 25
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 25
- no_candidates_returned: 25
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-10cc-2027-folkestone-1kuovpjagagra6l
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist '10cc' --max-api-calls 50 --resume-from 'tm-10cc-2027-folkestone-1kuovpjagagra6l'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 25

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 3781 event(s) already carried valid SeatGeek URLs before this run, including 3781 enrichment-eligible event(s).
- This run queried only the 2356 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-10cc-2027-llandudno-g5vhz_ctswfup | 10cc | 2027-02-25 | Llandudno | no_candidates_returned | - |
| tm-10cc-2027-stoke-on-trent-17uyv0g6ctwydoc | 10cc | 2027-02-26 | Stoke-On-Trent | no_candidates_returned | - |
| tm-10cc-2027-harrogate-17u8v0g6ctlxq9y | 10cc | 2027-02-27 | Harrogate | no_candidates_returned | - |
| tm-10cc-2027-scarborough-17u8v0g62dwld0w | 10cc | 2027-02-28 | Scarborough | no_candidates_returned | - |
| tm-10cc-2027-leicester-g5vhz_chkdnos | 10cc | 2027-03-04 | Leicester | no_candidates_returned | - |
| tm-10cc-2027-torquay-17uov0g62e2ner2 | 10cc | 2027-03-06 | Torquay | no_candidates_returned | - |
| tm-10cc-2027-truro-g5vhz_2m-aejk | 10cc | 2027-03-07 | Truro | no_candidates_returned | - |
| tm-10cc-2027-salisbury-g5vhz_ctjq9vl | 10cc | 2027-03-08 | Salisbury | no_candidates_returned | - |
| tm-10cc-2027-basingstoke-g5vhz_cts0tzr | 10cc | 2027-03-09 | Basingstoke | no_candidates_returned | - |
| tm-10cc-2027-watford-17uyv0g6ctns3km | 10cc | 2027-03-11 | Watford | no_candidates_returned | - |
| tm-10cc-2027-bath-17uyv0g62evevt9 | 10cc | 2027-03-12 | Bath | no_candidates_returned | - |
| tm-10cc-2027-croydon-g5vhz_ctdn_nm | 10cc | 2027-03-13 | Croydon | no_candidates_returned | - |
| tm-10cc-2027-eastbourne-g5vhz_2epbsoo | 10cc | 2027-03-14 | Eastbourne | no_candidates_returned | - |
| tm-10cc-2027-aylesbury-17u8v0g6ctc0wu5 | 10cc | 2027-03-15 | Aylesbury | no_candidates_returned | - |
| tm-10cc-2027-coventry-g5vhz_ctmqz4m | 10cc | 2027-03-17 | Coventry | no_candidates_returned | - |
| tm-10cc-2027-northampton-g5vhz_ctw2ats | 10cc | 2027-03-18 | Northampton | no_candidates_returned | - |
| tm-10cc-2027-scunthorpe-17uov0g62e9zs8y | 10cc | 2027-03-19 | Scunthorpe | no_candidates_returned | - |
| tm-10cc-2027-derby-17fyv0g6cx5rowg | 10cc | 2027-03-20 | Derby | no_candidates_returned | - |
| tm-10cc-2027-halifax-g5vhz_2exijk0 | 10cc | 2027-03-22 | Halifax | no_candidates_returned | - |
| tm-10cc-2027-perth-17uov0g6ctyjann | 10cc | 2027-03-23 | Perth | no_candidates_returned | - |
| tm-10cc-2027-edinburgh-17uov0g6chf_1iz | 10cc | 2027-03-24 | Edinburgh | no_candidates_returned | - |
| tm-10cc-2027-stockton-on-tees-g5vhz_2zfodiq | 10cc | 2027-03-25 | Stockton-on-Tees | no_candidates_returned | - |
| tm-10cc-2027-milton-keynes-16mzk4yx7zaue7ed | 10cc | 2027-05-11 | Milton Keynes | no_candidates_returned | - |
| tm-10cc-2027-hull-1ku8vpjfgag2ojo | 10cc | 2027-05-12 | Hull | no_candidates_returned | - |
| tm-10cc-2027-tunbridge-wells-1kuyvpjaga5kwmj | 10cc | 2027-05-14 | Tunbridge Wells | no_candidates_returned | - |

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

Generated: 2026-11-27T07:35:11.409Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 6161
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 6159
- Events already carrying a valid SeatGeek URL: 3791
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3791
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2368
- Eligible (upcoming, resolvable local date) after pre-API filtering: 5
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 25
- Rotation: window 1 of 1 (key 20784)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 5
- Events checked by this run: 5
- API calls made: 5
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
- 3791 event(s) already carried valid SeatGeek URLs before this run, including 3791 enrichment-eligible event(s).
- This run queried only the 2368 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-jorja-smith-2027-amsterdam-z698xzbpz16vp07o1a | Jorja Smith | 2027-05-26 | Amsterdam | no_candidates_returned | - |
| tm-jorja-smith-2027-brussels-z698xzg2z16v-6xajf | Jorja Smith | 2027-05-29 | Brussels | no_candidates_returned | - |
| tm-jorja-smith-2027-dusseldorf-z698xzc2z16vc4ra7p | Jorja Smith | 2027-06-01 | Düsseldorf | no_candidates_returned | - |
| tm-jorja-smith-2027-london-1fu8vp7n0az75fd6 | Jorja Smith | 2027-07-17 | London | no_candidates_returned | - |
| tm-jorja-smith-2027-brisbane-1avgz_8gknnf3nj | Jorja Smith | 2027-11-06 | Brisbane | no_candidates_returned | - |

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

Generated: 2026-11-27T07:35:01.485Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 6156
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 6154
- Events already carrying a valid SeatGeek URL: 3791
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3791
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2363
- Eligible (upcoming, resolvable local date) after pre-API filtering: 17
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 25
- Rotation: window 1 of 1 (key 20784)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 11
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 10
- Events skipped: 1
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: api_call_limit_reached
- Next resume showId: tm-the-doobie-brothers-2027-las-vegas-1a9zk49gkdw-j7d
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'the-doobie-brothers' --max-api-calls 50 --resume-from 'tm-the-doobie-brothers-2027-las-vegas-1a9zk49gkdw-j7d'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- api_call_limit_not_checked: 1

## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 3791 event(s) already carried valid SeatGeek URLs before this run, including 3791 enrichment-eligible event(s).
- This run queried only the 2363 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-the-doobie-brothers-2027-halifax-1aszk4vgkem55xl | The Doobie Brothers | 2027-08-05 | Halifax | https://seatgeek.com/the-doobie-brothers-tickets/halifax-canada-scotiabank-centre-2027-08-05-8-pm/concert/18867594 |
| tm-the-doobie-brothers-2027-moncton-1aszk4vgkdperjo | The Doobie Brothers | 2027-08-06 | Moncton | https://seatgeek.com/the-doobie-brothers-tickets/moncton-canada-avenir-centre-2027-08-06-8-pm/concert/18867593 |
| tm-the-doobie-brothers-2027-laval-1aszk4wgkdkwh-0 | The Doobie Brothers | 2027-08-09 | Laval | https://seatgeek.com/the-doobie-brothers-tickets/laval-canada-place-bell-2027-08-09-8-pm/concert/18867596 |
| tm-the-doobie-brothers-2027-kanata-16szk4wjdza2faae | The Doobie Brothers | 2027-08-10 | Kanata | https://seatgeek.com/the-doobie-brothers-tickets/kanata-canada-canadian-tire-centre-2027-08-10-8-pm/concert/18867597 |
| tm-the-doobie-brothers-2027-st-catharines-1a8zk4sgkdjlu6e | The Doobie Brothers | 2027-08-12 | St Catharines | https://seatgeek.com/the-doobie-brothers-tickets/st-catharines-canada-meridian-centre-2027-08-12-8-pm/concert/18867592 |
| tm-the-doobie-brothers-2027-winnipeg-1aozk4sgkd30xaz | The Doobie Brothers | 2027-08-16 | Winnipeg | https://seatgeek.com/the-doobie-brothers-tickets/winnipeg-canada-canada-life-centre-2027-08-16-8-pm/concert/18867595 |
| tm-the-doobie-brothers-2027-edmonton-1aozk4sptc3ze8k | The Doobie Brothers | 2027-08-19 | Edmonton | https://seatgeek.com/the-doobie-brothers-tickets/edmonton-canada-rogers-place-2027-08-19-8-pm/concert/18867604 |
| tm-the-doobie-brothers-2027-abbotsford-15v7z_9c9zac3 | The Doobie Brothers | 2027-08-24 | Abbotsford | https://seatgeek.com/the-doobie-brothers-tickets/abbotsford-canada-rogers-forum-2027-08-24-8-pm/concert/18867609 |
| tm-the-doobie-brothers-2027-las-vegas-1a9zk49gkdwjh7q | The Doobie Brothers | 2027-02-26 | Las Vegas | https://seatgeek.com/the-doobie-brothers-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-02-26-8-pm/concert/18723363 |
| tm-the-doobie-brothers-2027-las-vegas-1a9zk49gkdwlg7i | The Doobie Brothers | 2027-02-27 | Las Vegas | https://seatgeek.com/the-doobie-brothers-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-02-27-8-pm/concert/18723365 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-the-doobie-brothers-2027-las-vegas-1a9zk49gkdw-j7d | The Doobie Brothers | 2027-03-05 | Las Vegas | api_call_limit_not_checked | - |

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
