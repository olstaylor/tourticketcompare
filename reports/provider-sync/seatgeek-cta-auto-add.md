# SeatGeek CTA auto-add log

Generated: 2026-10-07T17:37:24.027Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 2709
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2182
- Events already carrying a valid SeatGeek URL: 649
- Enrichment-eligible events already carrying a valid SeatGeek URL: 410
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1772
- Eligible (upcoming, resolvable local date) after pre-API filtering: 52
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 4 of 6 (key 20733)
- Runs needed to check every eligible event once: 6
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 10
- no_candidates_returned: 10
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-dancing-with-the-stars-2027-portland-vvg1hz_kxomi0l
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'dancing-with-the-stars' --max-api-calls 50 --resume-from 'tm-dancing-with-the-stars-2027-portland-vvg1hz_kxomi0l'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 10

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 649 event(s) already carried valid SeatGeek URLs before this run, including 410 enrichment-eligible event(s).
- This run queried only the 1772 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-dancing-with-the-stars-2027-tampa-vvg1vz_kbbl4rs | Dancing With The Stars | 2027-03-09 | Tampa | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-birmingham-1aezz_kgkwr4ecx | Dancing With The Stars | 2027-03-10 | Birmingham | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-new-orleans-g5viz_kxwz34h | Dancing With The Stars | 2027-03-11 | New Orleans | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-austin-g5diz_knamopo | Dancing With The Stars | 2027-03-12 | Austin | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-san-antonio-g5diz_kdu_auv | Dancing With The Stars | 2027-03-13 | San Antonio | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-dallas-vvg1yz_ke4gsnj | Dancing With The Stars | 2027-03-16 | Dallas | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-tulsa-1aezz_kgkslhpir | Dancing With The Stars | 2027-03-17 | Tulsa | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-denver-g5vzz_kbv0118 | Dancing With The Stars | 2027-03-19 | Denver | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-seattle-vvg1hz_f63jugd | Dancing With The Stars | 2027-03-22 | Seattle | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-abbotsford-1aozkfygkejjqyp | Dancing With The Stars | 2027-03-23 | Abbotsford | no_candidates_returned | - |

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

Generated: 2026-10-07T17:39:48.295Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 2794
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2252
- Events already carrying a valid SeatGeek URL: 664
- Enrichment-eligible events already carrying a valid SeatGeek URL: 425
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1827
- Eligible (upcoming, resolvable local date) after pre-API filtering: 14
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 2 (key 20733)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 4
- Events checked by this run: 4
- API calls made: 20
- Rate-limit responses: 0
- URLs added: 1
- Events skipped: 3
- no_candidates_returned: 3
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 3

## Interpretation

- `URLs added: 1` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 664 event(s) already carried valid SeatGeek URLs before this run, including 425 enrichment-eligible event(s).
- This run queried only the 1827 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-hans-williams-2027-austin-g5diz_f2t_y5l | Hans Williams | 2027-04-02 | Austin | https://seatgeek.com/hans-williams-tickets/austin-texas-antone-s-nightclub-2027-04-02-8-pm/concert/18655715 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-hans-williams-2026-dublin-1abzkf-gke0kxsy | Hans Williams | 2026-12-01 | Dublin | no_candidates_returned | - |
| tm-hans-williams-2026-manchester-g5vhz_3hm6fzc | Hans Williams | 2026-12-02 | Manchester | no_candidates_returned | - |
| tm-hans-williams-2026-london-1agzkfigkdpfnww | Hans Williams | 2026-12-03 | London | no_candidates_returned | - |

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

Generated: 2026-10-07T17:37:55.764Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 2729
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2197
- Events already carrying a valid SeatGeek URL: 654
- Enrichment-eligible events already carrying a valid SeatGeek URL: 415
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1782
- Eligible (upcoming, resolvable local date) after pre-API filtering: 15
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 2 (key 20733)
- Runs needed to check every eligible event once: 2
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
- 654 event(s) already carried valid SeatGeek URLs before this run, including 415 enrichment-eligible event(s).
- This run queried only the 1782 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-jay-wheeler-2027-denver-g5vzz_f20_jhu | Jay Wheeler | 2027-04-04 | Denver | https://seatgeek.com/jay-wheeler-tickets/denver-colorado-fillmore-auditorium-denver-2027-04-04-8-pm/concert/18649609 |
| tm-jay-wheeler-2027-irving-vvg1yz_f8nrws_ | Jay Wheeler | 2027-04-06 | Irving | https://seatgeek.com/jay-wheeler-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2027-04-06-8-pm/concert/18649614 |
| tm-jay-wheeler-2027-houston-g5diz_f62ij1f | Jay Wheeler | 2027-04-07 | Houston | https://seatgeek.com/jay-wheeler-tickets/houston-texas-713-music-hall-2027-04-07-8-pm/concert/18649616 |
| tm-jay-wheeler-2027-inglewood-vvg1iz_f8af9cn | Jay Wheeler | 2027-04-10 | Inglewood | https://seatgeek.com/jay-wheeler-tickets/inglewood-california-youtube-theater-2027-04-10-8-pm/concert/18649617 |
| tm-jay-wheeler-2027-orlando-1axzk4vgkd6tfj5 | Jay Wheeler | 2027-04-15 | Orlando | https://seatgeek.com/jay-wheeler-tickets/orlando-florida-kia-center-2027-04-15-8-pm/concert/18649618 |

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

Generated: 2026-10-07T17:38:21.816Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 2750
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2211
- Events already carrying a valid SeatGeek URL: 654
- Enrichment-eligible events already carrying a valid SeatGeek URL: 415
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1796
- Eligible (upcoming, resolvable local date) after pre-API filtering: 14
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 2 (key 20733)
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
- 654 event(s) already carried valid SeatGeek URLs before this run, including 415 enrichment-eligible event(s).
- This run queried only the 1796 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-rod-stewart-2027-manchester-1amzkfugkesbky7 | Rod Stewart | 2027-05-06 | Manchester | no_candidates_returned | - |
| tm-rod-stewart-2027-manchester-1amzkfzgkdjwz0v | Rod Stewart | 2027-05-08 | Manchester | no_candidates_returned | - |
| tm-rod-stewart-2027-london-1agzkfzgkdv3zff | Rod Stewart | 2027-05-11 | London | no_candidates_returned | - |
| tm-rod-stewart-2027-london-1agzkfzgkdvmnjo | Rod Stewart | 2027-05-14 | London | no_candidates_returned | - |

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

Generated: 2026-10-07T17:39:22.504Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 2777
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2238
- Events already carrying a valid SeatGeek URL: 663
- Enrichment-eligible events already carrying a valid SeatGeek URL: 424
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1814
- Eligible (upcoming, resolvable local date) after pre-API filtering: 27
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 3 (key 20733)
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
- Next resume showId: tm-sammy-rae-the-friends-2026-brooklyn-k7v17_djzg7tt5d
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'sammy-rae-the-friends' --max-api-calls 50 --resume-from 'tm-sammy-rae-the-friends-2026-brooklyn-k7v17_djzg7tt5d'
- Accepted venue mismatches: 1
- Conflicts found: 0

## Skipped reasons

- city_or_metro_match_failed: 1

## Interpretation

- `URLs added: 9` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 663 event(s) already carried valid SeatGeek URLs before this run, including 424 enrichment-eligible event(s).
- This run queried only the 1814 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-sammy-rae-the-friends-2026-san-francisco-g5vyz_6dqsct_ | Sammy Rae & The Friends | 2026-10-07 | San Francisco | https://seatgeek.com/sammy-rae-the-friends-tickets/san-francisco-california-castro-theatre-2026-10-07-8-pm/concert/18141156 |
| tm-sammy-rae-the-friends-2026-vancouver-1aozkoygkemx9hb | Sammy Rae & The Friends | 2026-10-13 | Vancouver | https://seatgeek.com/sammy-rae-the-friends-tickets/vancouver-canada-commodore-ballroom-2026-10-13-7-pm/concert/18141429 |
| tm-sammy-rae-the-friends-2026-salt-lake-city-g5vzz_kvp8pev | Sammy Rae & The Friends | 2026-10-16 | Salt Lake City | https://seatgeek.com/sammy-rae-the-friends-tickets/salt-lake-city-utah-the-depot-salt-lake-city-2026-10-16-7-pm/concert/18141376 |
| tm-sammy-rae-the-friends-2026-chicago-vv1a7zkomgkeb3pbb | Sammy Rae & The Friends | 2026-10-23 | Chicago | https://seatgeek.com/sammy-rae-the-friends-tickets/chicago-illinois-the-salt-shed-indoors-2026-10-23-8-pm/concert/18142026 |
| tm-sammy-rae-the-friends-2026-madison-vv1a6zkosgkdqdeax | Sammy Rae & The Friends | 2026-10-24 | Madison | https://seatgeek.com/sammy-rae-the-friends-tickets/madison-wisconsin-the-sylvee-2026-10-24-8-pm/concert/18141929 |
| tm-sammy-rae-the-friends-2026-cincinnati-1avbz_kgkvpi4s9 | Sammy Rae & The Friends | 2026-10-27 | Cincinnati | https://seatgeek.com/sammy-rae-the-friends-tickets/cincinnati-ohio-bogarts-cincinnati-2026-10-27-7-pm/concert/18141178 |
| tm-sammy-rae-the-friends-2026-charlotte-g5evz_6kzntos | Sammy Rae & The Friends | 2026-10-31 | Charlotte | https://seatgeek.com/sammy-rae-the-friends-tickets/charlotte-north-carolina-the-fillmore-charlotte-2026-10-31-8-pm/concert/18141166 |
| tm-sammy-rae-the-friends-2026-raleigh-g5evz_62qei-x | Sammy Rae & The Friends | 2026-11-01 | Raleigh | https://seatgeek.com/sammy-rae-the-friends-tickets/raleigh-north-carolina-the-ritz-raleigh-2026-11-01-7-pm/concert/18141347 |
| tm-sammy-rae-the-friends-2026-brooklyn-k7v17_djzg7it1g | Sammy Rae & The Friends | 2026-11-05 | Brooklyn | https://seatgeek.com/sammy-rae-the-friends-tickets/brooklyn-new-york-brooklyn-paramount-2026-11-05-7-pm/concert/18036258 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-sammy-rae-the-friends-2026-saint-louis-vv1akzkoygkeocdew | Sammy Rae & The Friends | 2026-10-26 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/sammy-rae-the-friends-tickets/st-louis-missouri-the-pageant-st-louis-2026-10-26-8-pm/concert/18140939 |

## Accepted venue mismatches

| showId | TTC venue | SeatGeek venue | URL |
| --- | --- | --- | --- |
| tm-sammy-rae-the-friends-2026-cincinnati-1avbz_kgkvpi4s9 | Bogart's | Bogarts - Cincinnati | https://seatgeek.com/sammy-rae-the-friends-tickets/cincinnati-ohio-bogarts-cincinnati-2026-10-27-7-pm/concert/18141178 |

## Conflicts found

- None

## Rate-limited / not checked

- None

## API/environment failures

- None

## Skipped before any API call

Enrichment-eligible events missing a SeatGeek URL that this run deliberately did not query. Past events can never gain a useful CTA; an unresolvable venue-local date would make the SeatGeek date filter search the wrong night, so it is never guessed.

- None
