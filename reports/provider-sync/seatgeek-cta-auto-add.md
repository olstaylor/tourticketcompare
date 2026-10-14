# SeatGeek CTA auto-add log

Generated: 2026-10-14T15:34:59.760Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3464
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2724
- Events already carrying a valid SeatGeek URL: 1171
- Enrichment-eligible events already carrying a valid SeatGeek URL: 865
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1859
- Eligible (upcoming, resolvable local date) after pre-API filtering: 19
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20740)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 9
- Events skipped: 1
- no_candidates_returned: 1
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-earth-wind-fire-2026-atlantic-city-vv1aezkfagkd-okcm
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'earth-wind-fire' --max-api-calls 50 --resume-from 'tm-earth-wind-fire-2026-atlantic-city-vv1aezkfagkd-okcm'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 1

## Interpretation

- `URLs added: 9` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1171 event(s) already carried valid SeatGeek URLs before this run, including 865 enrichment-eligible event(s).
- This run queried only the 1859 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlk3fc | Earth, Wind & Fire | 2026-10-16 | Las Vegas | https://seatgeek.com/earth-wind-fire-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2026-10-16-8-30-pm/concert/18138584 |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdl6xfl | Earth, Wind & Fire | 2026-10-17 | Las Vegas | https://seatgeek.com/earth-wind-fire-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2026-10-17-8-30-pm/concert/18138586 |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlfwft | Earth, Wind & Fire | 2026-10-18 | Las Vegas | https://seatgeek.com/earth-wind-fire-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2026-10-18-8-30-pm/concert/18138583 |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlawfd | Earth, Wind & Fire | 2026-10-21 | Las Vegas | https://seatgeek.com/earth-wind-fire-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2026-10-21-8-30-pm/concert/18138582 |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdl5e46 | Earth, Wind & Fire | 2026-10-23 | Las Vegas | https://seatgeek.com/earth-wind-fire-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2026-10-23-8-30-pm/concert/18138585 |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlge4b | Earth, Wind & Fire | 2026-10-24 | Las Vegas | https://seatgeek.com/earth-wind-fire-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2026-10-24-8-30-pm/concert/18138587 |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlu34n | Earth, Wind & Fire | 2026-10-28 | Las Vegas | https://seatgeek.com/earth-wind-fire-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2026-10-28-8-30-pm/concert/18138592 |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlc34z | Earth, Wind & Fire | 2026-10-30 | Las Vegas | https://seatgeek.com/earth-wind-fire-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2026-10-30-8-30-pm/concert/18138594 |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdl23po | Earth, Wind & Fire | 2026-10-31 | Las Vegas | https://seatgeek.com/earth-wind-fire-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2026-10-31-8-30-pm/concert/18138595 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-earth-wind-fire-2026-atlantic-city-vv1aezkfagkd-8nc- | Earth, Wind & Fire | 2026-12-11 | Atlantic City | no_candidates_returned | - |

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

Generated: 2026-10-14T15:37:31.414Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3517
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2765
- Events already carrying a valid SeatGeek URL: 1181
- Enrichment-eligible events already carrying a valid SeatGeek URL: 875
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1890
- Eligible (upcoming, resolvable local date) after pre-API filtering: 0
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20740)
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
- 1181 event(s) already carried valid SeatGeek URLs before this run, including 875 enrichment-eligible event(s).
- This run queried only the 1890 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
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

Generated: 2026-10-14T15:36:01.769Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3488
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2748
- Events already carrying a valid SeatGeek URL: 1181
- Enrichment-eligible events already carrying a valid SeatGeek URL: 875
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1873
- Eligible (upcoming, resolvable local date) after pre-API filtering: 24
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 3 (key 20740)
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
- Next resume showId: tm-santana-2027-las-vegas-1kayvpa0gauq-b9
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'santana' --max-api-calls 50 --resume-from 'tm-santana-2027-las-vegas-1kayvpa0gauq-b9'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1181 event(s) already carried valid SeatGeek URLs before this run, including 875 enrichment-eligible event(s).
- This run queried only the 1873 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-santana-2027-las-vegas-1kayvpa0gauu-zk | Santana | 2027-01-23 | Las Vegas | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-23-7-pm/concert/18628821 |
| tm-santana-2027-las-vegas-1kayvpa0gaucsz4 | Santana | 2027-01-24 | Las Vegas | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-24-7-pm/concert/18628822 |
| tm-santana-2027-las-vegas-1kayvpa0gau8vze | Santana | 2027-01-27 | Las Vegas | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-27-7-pm/concert/18628823 |
| tm-santana-2027-las-vegas-1kayvpa0gauoozw | Santana | 2027-01-28 | Las Vegas | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-28-7-pm/concert/18628824 |
| tm-santana-2027-las-vegas-1kayvpa0gau3-y4 | Santana | 2027-01-30 | Las Vegas | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-30-7-pm/concert/18628831 |
| tm-santana-2027-las-vegas-1kayvpa0gauksyx | Santana | 2027-01-31 | Las Vegas | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-01-31-7-pm/concert/18628832 |
| tm-santana-2027-las-vegas-1kayvpa0gau4vyt | Santana | 2027-05-12 | Las Vegas | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-12-7-pm/concert/18628833 |
| tm-santana-2027-las-vegas-1kayvpa0gaupoyr | Santana | 2027-05-13 | Las Vegas | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-13-7-pm/concert/18628834 |
| tm-santana-2027-las-vegas-1kayvpa0gau9-ys | Santana | 2027-05-15 | Las Vegas | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-15-7-pm/concert/18628836 |
| tm-santana-2027-las-vegas-1kayvpa0gaubsyw | Santana | 2027-05-16 | Las Vegas | https://seatgeek.com/santana-tickets/las-vegas-nevada-house-of-blues-las-vegas-2027-05-16-7-pm/concert/18628837 |

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

Generated: 2026-10-14T15:37:03.534Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3506
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2761
- Events already carrying a valid SeatGeek URL: 1181
- Enrichment-eligible events already carrying a valid SeatGeek URL: 875
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1886
- Eligible (upcoming, resolvable local date) after pre-API filtering: 13
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20740)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 10
- no_candidates_returned: 10
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-simple-minds-2027-newcastle-upon-tyne-g5vhz_31k4viz
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'simple-minds' --max-api-calls 50 --resume-from 'tm-simple-minds-2027-newcastle-upon-tyne-g5vhz_31k4viz'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 10

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1181 event(s) already carried valid SeatGeek URLs before this run, including 875 enrichment-eligible event(s).
- This run queried only the 1886 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-simple-minds-2027-auckland-17azv0g6g9-xfc0 | Simple Minds | 2027-02-25 | Auckland | no_candidates_returned | - |
| tm-simple-minds-2027-wellington-17azv0g6gjon-by | Simple Minds | 2027-02-27 | Wellington | no_candidates_returned | - |
| tm-simple-minds-2027-christchurch-17azv0g6gjwt3e9 | Simple Minds | 2027-03-01 | Christchurch | no_candidates_returned | - |
| tm-simple-minds-2027-assago-zg9rmiynyzdf1v | Simple Minds | 2027-04-16 | Assago | no_candidates_returned | - |
| tm-simple-minds-2027-casalecchio-di-reno-bologna-zg9rmiynyzdfaa | Simple Minds | 2027-04-17 | Casalecchio di Reno (Bologna) | no_candidates_returned | - |
| tm-simple-minds-2027-london-16dfz_313g7wgmr | Simple Minds | 2027-05-06 | London | no_candidates_returned | - |
| tm-simple-minds-2027-manchester-1amzkfxgkdzwjhm | Simple Minds | 2027-05-07 | Manchester | no_candidates_returned | - |
| tm-simple-minds-2027-birmingham-1aegz_31ka4zdg5d | Simple Minds | 2027-05-08 | Birmingham | no_candidates_returned | - |
| tm-simple-minds-2027-nottingham-1adfz_31k14zduv5 | Simple Minds | 2027-05-10 | Nottingham | no_candidates_returned | - |
| tm-simple-minds-2027-leeds-g5vhz_31k8si9 | Simple Minds | 2027-05-11 | Leeds | no_candidates_returned | - |

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

Generated: 2026-10-14T15:37:30.732Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3517
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2765
- Events already carrying a valid SeatGeek URL: 1181
- Enrichment-eligible events already carrying a valid SeatGeek URL: 875
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1890
- Eligible (upcoming, resolvable local date) after pre-API filtering: 0
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20740)
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
- 1181 event(s) already carried valid SeatGeek URLs before this run, including 875 enrichment-eligible event(s).
- This run queried only the 1890 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
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

Generated: 2026-10-14T15:37:30.102Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3517
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2765
- Events already carrying a valid SeatGeek URL: 1181
- Enrichment-eligible events already carrying a valid SeatGeek URL: 875
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1890
- Eligible (upcoming, resolvable local date) after pre-API filtering: 4
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20740)
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
- 1181 event(s) already carried valid SeatGeek URLs before this run, including 875 enrichment-eligible event(s).
- This run queried only the 1890 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-thirty-seconds-to-mars-2027-assago-zg9rmiynyzeadk | Thirty Seconds to Mars | 2027-04-11 | Assago | no_candidates_returned | - |
| tm-thirty-seconds-to-mars-2027-london-1agzk3agkdevn9u | Thirty Seconds to Mars | 2027-04-28 | London | no_candidates_returned | - |
| tm-thirty-seconds-to-mars-2027-manchester-1amzk3agkeyexfs | Thirty Seconds to Mars | 2027-04-29 | Manchester | no_candidates_returned | - |
| tm-thirty-seconds-to-mars-2027-dublin-1abzk36gkeuawhf | Thirty Seconds to Mars | 2027-05-01 | Dublin | no_candidates_returned | - |

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
