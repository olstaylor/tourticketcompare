# SeatGeek CTA auto-add log

Generated: 2026-11-03T18:09:06.614Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5038
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5038
- Events already carrying a valid SeatGeek URL: 2709
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2709
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2329
- Eligible (upcoming, resolvable local date) after pre-API filtering: 0
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20760)
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
- 2709 event(s) already carried valid SeatGeek URLs before this run, including 2709 enrichment-eligible event(s).
- This run queried only the 2329 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
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

Generated: 2026-11-03T18:10:10.991Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5049
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5049
- Events already carrying a valid SeatGeek URL: 2717
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2717
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2332
- Eligible (upcoming, resolvable local date) after pre-API filtering: 11
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20760)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 8
- Events skipped: 2
- no_candidates_returned: 1
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-gary-allan-2027-peoria-vvg1jz_ub8qzyr
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'gary-allan' --max-api-calls 50 --resume-from 'tm-gary-allan-2027-peoria-vvg1jz_ub8qzyr'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- city_or_metro_match_failed: 1
- no_candidates_returned: 1

## Interpretation

- `URLs added: 8` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2717 event(s) already carried valid SeatGeek URLs before this run, including 2717 enrichment-eligible event(s).
- This run queried only the 2332 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-gary-allan-2026-bakersfield-z7r9jz1aae3j4 | Gary Allan | 2026-12-06 | Bakersfield | https://seatgeek.com/gary-allan-tickets/bakersfield-california-historic-bakersfield-fox-theater-2026-12-06-7-pm/concert/18639145 |
| tm-gary-allan-2026-dodge-city-vvg1bz_gx9hm-8 | Gary Allan | 2026-11-13 | Dodge City | https://seatgeek.com/gary-allan-tickets/dodge-city-kansas-united-wireless-arena-2026-11-13-7-30-pm/concert/18344599 |
| tm-gary-allan-2026-lake-charles-z7r9jz1aazdcb | Gary Allan | 2026-11-20 | Lake Charles | https://seatgeek.com/gary-allan-tickets/lake-charles-louisiana-grand-event-center-golden-nugget-lake-charles-2026-11-20-8-30-pm/concert/18391791 |
| tm-gary-allan-2026-biloxi-g5viz_889usjk | Gary Allan | 2026-11-21 | Biloxi | https://seatgeek.com/gary-allan-tickets/biloxi-mississippi-beau-rivage-theatre-2026-11-21-8-pm/concert/18472669 |
| tm-gary-allan-2026-napa-g5vyz_3dfyx0l | Gary Allan | 2026-12-05 | Napa | https://seatgeek.com/gary-allan-tickets/napa-california-uptown-theatre-napa-2026-12-05-8-pm/concert/18593936 |
| tm-gary-allan-2027-tysons-17a8v0g65hn_upy | Gary Allan | 2027-02-18 | Tysons | https://seatgeek.com/gary-allan-tickets/tysons-virginia-capital-one-hall-2027-02-18-7-30-pm/concert/18281788 |
| tm-gary-allan-2027-greensboro-g5evz_89x5mox | Gary Allan | 2027-02-19 | Greensboro | https://seatgeek.com/gary-allan-tickets/greensboro-north-carolina-steven-tanger-center-for-the-performing-arts-2027-02-19-7-30-pm/concert/18449332 |
| tm-gary-allan-2027-spartanburg-g5evz_8fssjkd | Gary Allan | 2027-02-20 | Spartanburg | https://seatgeek.com/gary-allan-tickets/spartanburg-south-carolina-spartanburg-memorial-auditorium-2027-02-20-7-30-pm/concert/18446298 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-gary-allan-2026-catoosa-z7r9jz1aaza0p | Gary Allan | 2026-11-06 | Catoosa | city_or_metro_match_failed | https://seatgeek.com/gary-allan-tickets/fort-gibson-oklahoma-cherokee-casino-2-2026-11-06-8-pm/concert/18450871 |
| tm-gary-allan-2026-las-vegas-z7r9jz1aavf1f | Gary Allan | 2026-12-04 | Las Vegas | no_candidates_returned | - |

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

Generated: 2026-11-03T18:12:13.966Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5093
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5093
- Events already carrying a valid SeatGeek URL: 2728
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2728
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2365
- Eligible (upcoming, resolvable local date) after pre-API filtering: 35
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 4 (key 20760)
- Runs needed to check every eligible event once: 4
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 6
- Events skipped: 4
- no_candidates_returned: 4
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-meshuggah-2027-omaha-1aozk4fgkd-wmvg
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'meshuggah' --max-api-calls 50 --resume-from 'tm-meshuggah-2027-omaha-1aozk4fgkd-wmvg'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 4

## Interpretation

- `URLs added: 6` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2728 event(s) already carried valid SeatGeek URLs before this run, including 2728 enrichment-eligible event(s).
- This run queried only the 2365 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-meshuggah-2027-toronto-1a8zk4fgkepjpte | Meshuggah | 2027-02-12 | Toronto | https://seatgeek.com/meshuggah-tickets/toronto-canada-coca-cola-coliseum-2027-02-12-7-pm/concert/18724635 |
| tm-meshuggah-2027-laval-1aszk4fgkdtnr8- | Meshuggah | 2027-02-13 | Laval | https://seatgeek.com/meshuggah-tickets/laval-canada-place-bell-2027-02-13-7-pm/concert/18724636 |
| tm-meshuggah-2027-detroit-z7r9jz1aa7t8- | Meshuggah | 2027-02-16 | Detroit | https://seatgeek.com/meshuggah-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2027-02-16-6-pm/concert/18724637 |
| tm-meshuggah-2027-chicago-vv1a7zk49gkdpmbhc | Meshuggah | 2027-02-17 | Chicago | https://seatgeek.com/meshuggah-tickets/chicago-illinois-the-salt-shed-indoors-2027-02-17-6-pm/concert/18724638 |
| tm-meshuggah-2027-minneapolis-vv1akzk44gkdfvhxa | Meshuggah | 2027-02-19 | Minneapolis | https://seatgeek.com/meshuggah-tickets/minneapolis-minnesota-the-armory-minneapolis-2027-02-19-7-pm/concert/18724640 |
| tm-meshuggah-2027-kansas-city-z7r9jz1aa7t8x | Meshuggah | 2027-02-20 | Kansas City | https://seatgeek.com/meshuggah-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-02-20-7-pm/concert/18724639 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-meshuggah-2027-warsaw-z698xzqpz1kgpab4t | Meshuggah | 2027-10-10 | Warsaw | no_candidates_returned | - |
| tm-meshuggah-2027-dublin-1avoz_4gkwrafdq | Meshuggah | 2027-10-27 | Dublin | no_candidates_returned | - |
| tm-meshuggah-2027-manchester-1adfz_4gkvdqmcy | Meshuggah | 2027-10-29 | Manchester | no_candidates_returned | - |
| tm-meshuggah-2027-london-1adjz_4gkbbdf9c | Meshuggah | 2027-10-30 | London | no_candidates_returned | - |

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

Generated: 2026-11-03T18:11:08.993Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5058
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5058
- Events already carrying a valid SeatGeek URL: 2722
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2722
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2336
- Eligible (upcoming, resolvable local date) after pre-API filtering: 9
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20760)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 9
- Events checked by this run: 9
- API calls made: 45
- Rate-limit responses: 0
- URLs added: 5
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

- `URLs added: 5` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2722 event(s) already carried valid SeatGeek URLs before this run, including 2722 enrichment-eligible event(s).
- This run queried only the 2336 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-mon-laferte-2026-salt-lake-city-z7r9jz1a70v_v | Mon Laferte | 2026-11-03 | Salt Lake City | https://seatgeek.com/mon-laferte-tickets/salt-lake-city-utah-eccles-theater-2026-11-03-8-pm/concert/18269203 |
| tm-mon-laferte-2026-las-vegas-z7r9jz1a7-sud | Mon Laferte | 2026-11-05 | Las Vegas | https://seatgeek.com/mon-laferte-tickets/las-vegas-nevada-pearl-concert-theater-at-palms-casino-resort-2026-11-05-8-pm/concert/18140310 |
| tm-mon-laferte-2026-san-jose-g5vyz_kmf8y1d | Mon Laferte | 2026-11-06 | San Jose | https://seatgeek.com/mon-laferte-tickets/san-jose-california-sap-center-at-san-jose-2026-11-06-8-pm/concert/18140311 |
| tm-mon-laferte-2026-inglewood-vv170z_kgksmomdw | Mon Laferte | 2026-11-07 | Inglewood | https://seatgeek.com/mon-laferte-tickets/inglewood-california-kia-forum-2026-11-07-8-pm/concert/18140313 |
| tm-mon-laferte-2026-inglewood-vvg10z_gloruht | Mon Laferte | 2026-11-08 | Inglewood | https://seatgeek.com/mon-laferte-tickets/inglewood-california-kia-forum-2026-11-08-8-pm/concert/18311530 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-mon-laferte-2027-brussels-z698xzg2z1kbx0fgb | Mon Laferte | 2027-01-18 | Brussels | no_candidates_returned | - |
| tm-mon-laferte-2026-monterrey-17azv0g6cxrk0bt | Mon Laferte | 2026-11-16 | Monterrey | no_candidates_returned | - |
| tm-mon-laferte-2026-monterrey-17azv0g61m-mqwh | Mon Laferte | 2026-11-17 | Monterrey | no_candidates_returned | - |
| tm-mon-laferte-2027-madrid-z698xz2qz16vquuz7t | Mon Laferte | 2027-01-13 | Madrid | no_candidates_returned | - |

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
