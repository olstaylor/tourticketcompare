# SeatGeek CTA auto-add log

Generated: 2026-11-15T17:31:56.654Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5551
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5551
- Events already carrying a valid SeatGeek URL: 3093
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3093
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2458
- Eligible (upcoming, resolvable local date) after pre-API filtering: 14
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20772)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 9
- Events skipped: 1
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-cody-jinks-2027-eugene-z7r9jz1aaa837
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'cody-jinks' --max-api-calls 50 --resume-from 'tm-cody-jinks-2027-eugene-z7r9jz1aaa837'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- city_or_metro_match_failed: 1

## Interpretation

- `URLs added: 9` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 3093 event(s) already carried valid SeatGeek URLs before this run, including 3093 enrichment-eligible event(s).
- This run queried only the 2458 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-cody-jinks-2027-hollywood-vvg1vz_p3xfvoe | Cody Jinks | 2027-02-03 | Hollywood | https://seatgeek.com/cody-jinks-tickets/hollywood-florida-hard-rock-live-hollywood-2027-02-03-8-pm/concert/18754087 |
| tm-cody-jinks-2027-cocoa-z7r9jz1aaakjb | Cody Jinks | 2027-02-05 | Cocoa | https://seatgeek.com/cody-jinks-tickets/cocoa-florida-cocoa-riverfront-park-2027-02-05-6-pm/concert/18754085 |
| tm-cody-jinks-2027-apopka-z7r9jz1aaakjo | Cody Jinks | 2027-02-06 | Apopka | https://seatgeek.com/cody-jinks-tickets/apopka-florida-apopka-amphitheater-2027-02-06-6-pm/concert/18754088 |
| tm-cody-jinks-2027-macon-vvg1zz_pcm9nti | Cody Jinks | 2027-02-07 | Macon | https://seatgeek.com/cody-jinks-tickets/macon-georgia-macon-city-auditorium-2027-02-07-8-pm/concert/18754089 |
| tm-cody-jinks-2027-fort-worth-z7r9jz1aaakr8 | Cody Jinks | 2027-04-01 | Fort Worth | https://seatgeek.com/cody-jinks-tickets/fort-worth-texas-billy-bob-s-texas-2027-04-01-9-pm/concert/18754084 |
| tm-cody-jinks-2027-fort-worth-z7r9jz1aaakrz | Cody Jinks | 2027-04-02 | Fort Worth | https://seatgeek.com/cody-jinks-tickets/fort-worth-texas-billy-bob-s-texas-2027-04-02-10-pm/concert/18754086 |
| tm-cody-jinks-2027-las-vegas-1a9zk40gkdisrrp | Cody Jinks | 2027-04-25 | Las Vegas | https://seatgeek.com/cody-jinks-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-04-25-8-pm/concert/18754094 |
| tm-cody-jinks-2027-modesto-g5vyz_4lc0uvr | Cody Jinks | 2027-06-11 | Modesto | https://seatgeek.com/cody-jinks-tickets/modesto-california-fruit-yard-amphitheater-2027-06-11-7-pm/concert/18754095 |
| tm-cody-jinks-2027-central-point-vvg1hz_pkp9lkp | Cody Jinks | 2027-06-15 | Central Point | https://seatgeek.com/cody-jinks-tickets/central-point-oregon-bi-mart-amphitheater-2027-06-15-7-pm/concert/18754098 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-cody-jinks-2027-lake-tahoe-1a9zk4ngkdmvw-8 | Cody Jinks | 2027-06-12 | Lake Tahoe | city_or_metro_match_failed | https://seatgeek.com/cody-jinks-tickets/stateline-nevada-lake-tahoe-amphitheatre-at-caesars-republic-2027-06-12-7-pm/concert/18754097 |

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

Generated: 2026-11-15T17:33:03.056Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5576
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5576
- Events already carrying a valid SeatGeek URL: 3103
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3103
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2473
- Eligible (upcoming, resolvable local date) after pre-API filtering: 25
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 3 (key 20772)
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
- Next resume showId: tm-melissa-etheridge-2027-madison-vv1a6zk4ngkd9d6lz
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'melissa-etheridge' --max-api-calls 50 --resume-from 'tm-melissa-etheridge-2027-madison-vv1a6zk4ngkd9d6lz'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 3103 event(s) already carried valid SeatGeek URLs before this run, including 3103 enrichment-eligible event(s).
- This run queried only the 2473 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-melissa-etheridge-2027-vashon-z7r9jz1aaakuy | Melissa Etheridge | 2027-03-20 | Vashon | https://seatgeek.com/melissa-etheridge-tickets/vashon-washington-vashon-center-for-the-arts-2027-03-20-7-30-pm/concert/18758750 |
| tm-melissa-etheridge-2027-vashon-z7r9jz1aaakcz | Melissa Etheridge | 2027-03-21 | Vashon | https://seatgeek.com/melissa-etheridge-tickets/vashon-washington-vashon-center-for-the-arts-2027-03-21-7-30-pm/concert/18758748 |
| tm-melissa-etheridge-2027-richmond-1aozk4jgkdae_qq | Melissa Etheridge | 2027-03-23 | Richmond | https://seatgeek.com/melissa-etheridge-tickets/richmond-canada-river-rock-casino-2027-03-23-8-pm/concert/18754737 |
| tm-melissa-etheridge-2027-calgary-1aozk40gkdyyany | Melissa Etheridge | 2027-03-25 | Calgary | https://seatgeek.com/melissa-etheridge-tickets/calgary-canada-grey-eagle-event-centre-2027-03-25-8-pm/concert/18754777 |
| tm-melissa-etheridge-2027-enoch-1aozk4pgkdrvn3r | Melissa Etheridge | 2027-03-26 | Enoch | https://seatgeek.com/melissa-etheridge-tickets/enoch-canada-river-cree-resort-casino-2027-03-26-9-pm/concert/18754353 |
| tm-melissa-etheridge-2027-saskatoon-z7r9jz1aaakcv | Melissa Etheridge | 2027-03-27 | Saskatoon | https://seatgeek.com/melissa-etheridge-tickets/saskatoon-canada-tcu-place-2027-03-27-7-30-pm/concert/18758749 |
| tm-melissa-etheridge-2027-regina-z7r9jz1aaakce | Melissa Etheridge | 2027-03-29 | Regina | https://seatgeek.com/melissa-etheridge-tickets/regina-canada-conexus-arts-centre-2027-03-29-7-30-pm/concert/18758751 |
| tm-melissa-etheridge-2027-winnipeg-1aozk4jgkenj9vg | Melissa Etheridge | 2027-03-30 | Winnipeg | https://seatgeek.com/melissa-etheridge-tickets/winnipeg-canada-burton-cummings-theatre-2027-03-30-8-pm/concert/18754333 |
| tm-melissa-etheridge-2027-des-moines-vv1akzk4ngkd0rml4 | Melissa Etheridge | 2027-04-01 | Des Moines | https://seatgeek.com/melissa-etheridge-tickets/des-moines-iowa-hoyt-sherman-place-2027-04-01-7-30-pm/concert/18754305 |
| tm-melissa-etheridge-2027-nashville-vv1aazk4xgkdnma5h | Melissa Etheridge | 2027-04-02 | Nashville | https://seatgeek.com/melissa-etheridge-tickets/nashville-indiana-brown-county-music-center-2027-04-02-8-pm/concert/18754809 |

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

Generated: 2026-11-15T17:34:09.105Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5606
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5606
- Events already carrying a valid SeatGeek URL: 3112
- Enrichment-eligible events already carrying a valid SeatGeek URL: 3112
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2494
- Eligible (upcoming, resolvable local date) after pre-API filtering: 30
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 3 (key 20772)
- Runs needed to check every eligible event once: 3
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 9
- Events skipped: 1
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-two-friends-2027-detroit-z7r9jz1aaa6pk
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'two-friends' --max-api-calls 50 --resume-from 'tm-two-friends-2027-detroit-z7r9jz1aaa6pk'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- city_or_metro_match_failed: 1

## Interpretation

- `URLs added: 9` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 3112 event(s) already carried valid SeatGeek URLs before this run, including 3112 enrichment-eligible event(s).
- This run queried only the 2494 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-two-friends-2026-atlantic-city-1atzk4fgkd6j8cf | Two Friends | 2026-11-21 | Atlantic City | https://seatgeek.com/two-friends-tickets/atlantic-city-new-jersey-ocean-resort-casino-hq2-beachclub-2026-11-21-11-pm/concert/18664299 |
| tm-two-friends-2026-nashville-g5viz_kmfvexe | Two Friends | 2026-12-05 | Nashville | https://seatgeek.com/two-friends-tickets/nashville-tennessee-the-truth-nashville-2026-12-05-8-pm/concert/18126049 |
| tm-two-friends-2026-seattle-vvg1hz_krkthyp | Two Friends | 2026-12-12 | Seattle | https://seatgeek.com/two-friends-tickets/seattle-washington-wamu-theater-2026-12-12-7-pm/concert/18633839 |
| tm-two-friends-2027-tampa-vvg1vz_fhrt2gz | Two Friends | 2026-12-31 | Tampa | https://seatgeek.com/two-friends-tickets/tampa-florida-seminole-hard-rock-tampa-2026-12-31-9-pm/concert/18739111 |
| tm-two-friends-2027-morrison-z7r9jz1aa76-a | Two Friends | 2027-04-30 | Morrison | https://seatgeek.com/two-friends-tickets/morrison-colorado-red-rocks-amphitheatre-2027-04-30-7-pm/concert/18683907 |
| tm-two-friends-2027-indianapolis-vv1aazk40gkd83bu9 | Two Friends | 2027-05-06 | Indianapolis | https://seatgeek.com/two-friends-tickets/indianapolis-indiana-everwise-amphitheater-at-white-river-state-park-2027-05-06-7-pm/concert/18756186 |
| tm-two-friends-2027-milwaukee-vv1a6zk4n0kbize5e | Two Friends | 2027-05-07 | Milwaukee | https://seatgeek.com/two-friends-tickets/milwaukee-wisconsin-landmark-credit-union-live-2027-05-07-8-pm/concert/18757860 |
| tm-two-friends-2027-minneapolis-vv1akzk4jgkehfygr | Two Friends | 2027-05-08 | Minneapolis | https://seatgeek.com/two-friends-tickets/minneapolis-minnesota-the-armory-minneapolis-2027-05-08-9-pm/concert/18757536 |
| tm-two-friends-2027-chicago-vv1a7zkfwgkdmtcgf | Two Friends | 2027-05-15 | Chicago | https://seatgeek.com/two-friends-tickets/chicago-illinois-huntington-bank-pavilion-at-northerly-island-2027-05-15-6-30-pm/concert/18612569 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-two-friends-2027-saint-louis-1a-zk4pgkdsvsmy | Two Friends | 2027-05-05 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/two-friends-tickets/chesterfield-missouri-the-factory-stl-2027-05-05-7-30-pm/concert/18757696 |

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
