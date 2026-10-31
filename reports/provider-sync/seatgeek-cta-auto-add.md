# SeatGeek CTA auto-add log

Generated: 2026-10-31T16:01:05.208Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4802
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4802
- Events already carrying a valid SeatGeek URL: 2613
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2613
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2189
- Eligible (upcoming, resolvable local date) after pre-API filtering: 22
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 3 (key 20757)
- Runs needed to check every eligible event once: 3
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 7
- Events skipped: 3
- no_candidates_returned: 1
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-black-stone-cherry-2027-london-g5dzzbzpu7g4_
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'black-stone-cherry' --max-api-calls 50 --resume-from 'tm-black-stone-cherry-2027-london-g5dzzbzpu7g4_'
- Accepted venue mismatches: 2
- Conflicts found: 0

## Skipped reasons

- city_or_metro_match_failed: 2
- no_candidates_returned: 1

## Interpretation

- `URLs added: 7` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2613 event(s) already carried valid SeatGeek URLs before this run, including 2613 enrichment-eligible event(s).
- This run queried only the 2189 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-black-stone-cherry-2026-milwaukee-z7r9jz1aae8ot | Black Stone Cherry | 2026-11-13 | Milwaukee | https://seatgeek.com/black-stone-cherry-tickets/milwaukee-wisconsin-the-rave-eagles-club-2026-11-13-8-pm/concert/18637121 |
| tm-black-stone-cherry-2026-omaha-z7r9jz1aae8_- | Black Stone Cherry | 2026-11-18 | Omaha | https://seatgeek.com/black-stone-cherry-tickets/omaha-nebraska-the-waiting-room-omaha-2026-11-18-8-pm/concert/18637126 |
| tm-black-stone-cherry-2026-sauget-rz7hnez1afggzf | Black Stone Cherry | 2026-11-20 | Sauget | https://seatgeek.com/black-stone-cherry-tickets/sauget-illinois-pop-s-sauget-2026-11-20-8-pm/concert/18637133 |
| tm-black-stone-cherry-2026-birmingham-rz7hnez1afuf1f | Black Stone Cherry | 2026-11-21 | Birmingham | https://seatgeek.com/black-stone-cherry-tickets/birmingham-alabama-the-fennec-sports-live-music-events-2026-11-21-8-pm/concert/18637134 |
| tm-black-stone-cherry-2026-lexington-1avbz_kgklcscxl | Black Stone Cherry | 2026-11-27 | Lexington | https://seatgeek.com/black-stone-cherry-tickets/lexington-kentucky-manchester-music-hall-2026-11-27-8-pm/concert/18630042 |
| tm-black-stone-cherry-2026-hartford-z7r9jz1aaea0z | Black Stone Cherry | 2026-12-05 | Hartford | https://seatgeek.com/black-stone-cherry-tickets/hartford-connecticut-webster-underground-hartford-2026-12-05-8-pm/concert/18637149 |
| tm-black-stone-cherry-2026-columbus-z7r9jz1aae7be | Black Stone Cherry | 2026-12-12 | Columbus | https://seatgeek.com/black-stone-cherry-tickets/columbus-ohio-the-king-of-clubs-oh-2026-12-12-5-30-pm/concert/18637158 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-black-stone-cherry-2026-nashville-z7r9jz1aaeapk | Black Stone Cherry | 2026-11-22 | Nashville | city_or_metro_match_failed | https://seatgeek.com/black-stone-cherry-tickets/madison-tennessee-the-58-at-eastside-bowl-2026-11-22-8-pm/concert/18637135 |
| tm-black-stone-cherry-2026-toronto-16tzkfzkozagevde | Black Stone Cherry | 2026-12-05 | Toronto | city_or_metro_match_failed | https://seatgeek.com/black-stone-cherry-tickets/hartford-connecticut-the-webster-hartford-2026-12-05-7-30-pm/concert/18637147 |
| tm-black-stone-cherry-2027-bournemouth-g5dzz_g9ioeuq | Black Stone Cherry | 2027-01-14 | Bournemouth | no_candidates_returned | - |

## Accepted venue mismatches

| showId | TTC venue | SeatGeek venue | URL |
| --- | --- | --- | --- |
| tm-black-stone-cherry-2026-sauget-rz7hnez1afggzf | Pop's Concert Venue | Pop's - Sauget | https://seatgeek.com/black-stone-cherry-tickets/sauget-illinois-pop-s-sauget-2026-11-20-8-pm/concert/18637133 |
| tm-black-stone-cherry-2026-birmingham-rz7hnez1afuf1f | The Fennec - Main Stage | The Fennec - Sports, Live Music, Events | https://seatgeek.com/black-stone-cherry-tickets/birmingham-alabama-the-fennec-sports-live-music-events-2026-11-21-8-pm/concert/18637134 |

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

Generated: 2026-10-31T15:58:55.794Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4760
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4760
- Events already carrying a valid SeatGeek URL: 2596
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2596
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2164
- Eligible (upcoming, resolvable local date) after pre-API filtering: 12
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 2 (key 20757)
- Runs needed to check every eligible event once: 2
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
- 2596 event(s) already carried valid SeatGeek URLs before this run, including 2596 enrichment-eligible event(s).
- This run queried only the 2164 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-erasure-2027-brighton-g5dzz_kwfhs5r | Erasure | 2027-05-11 | Brighton | no_candidates_returned | - |
| tm-erasure-2027-london-1agzkfmgkdxoix5 | Erasure | 2027-05-12 | London | no_candidates_returned | - |

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

Generated: 2026-10-31T16:02:10.437Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4811
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4811
- Events already carrying a valid SeatGeek URL: 2614
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2614
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2197
- Eligible (upcoming, resolvable local date) after pre-API filtering: 0
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20757)
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
- 2614 event(s) already carried valid SeatGeek URLs before this run, including 2614 enrichment-eligible event(s).
- This run queried only the 2197 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
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

Generated: 2026-10-31T16:02:08.707Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4811
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4811
- Events already carrying a valid SeatGeek URL: 2614
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2614
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2197
- Eligible (upcoming, resolvable local date) after pre-API filtering: 8
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20757)
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
- 2614 event(s) already carried valid SeatGeek URLs before this run, including 2614 enrichment-eligible event(s).
- This run queried only the 2197 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-kings-of-leon-2027-hamburg-z698xzc2z1kjifpz9 | Kings Of Leon | 2027-06-18 | Hamburg | no_candidates_returned | - |
| tm-kings-of-leon-2027-auckland-1kazvpfagago3z7 | Kings Of Leon | 2027-02-24 | Auckland | no_candidates_returned | - |
| tm-kings-of-leon-2027-bowen-hills-1avgz_fgkxy2l3h | Kings Of Leon | 2027-03-03 | Bowen Hills | no_candidates_returned | - |
| tm-kings-of-leon-2027-flemington-1aefz_fgkxtcmb- | Kings Of Leon | 2027-03-05 | Flemington | no_candidates_returned | - |
| tm-kings-of-leon-2027-dublin-1avoz_fgktpkxi7 | Kings Of Leon | 2027-06-22 | Dublin | no_candidates_returned | - |
| tm-kings-of-leon-2027-scarborough-1agzk4fgke0iell | Kings Of Leon | 2027-06-27 | Scarborough | no_candidates_returned | - |
| tm-kings-of-leon-2027-london-1agzk4egkesvn16 | Kings Of Leon | 2027-07-02 | London | no_candidates_returned | - |
| tm-kings-of-leon-2027-london-1agzk4egkdt5lpe | Kings Of Leon | 2027-07-03 | London | no_candidates_returned | - |

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

Generated: 2026-10-31T16:02:58.174Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4818
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4818
- Events already carrying a valid SeatGeek URL: 2620
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2620
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2198
- Eligible (upcoming, resolvable local date) after pre-API filtering: 7
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20757)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 7
- Events checked by this run: 7
- API calls made: 35
- Rate-limit responses: 0
- URLs added: 6
- Events skipped: 1
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 1

## Skipped reasons

- conflicting_same_date_city_candidates: 1

## Interpretation

- `URLs added: 6` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2620 event(s) already carried valid SeatGeek URLs before this run, including 2620 enrichment-eligible event(s).
- This run queried only the 2198 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-lady-a-2026-northfield-vvg1fz_gkaw2vw | Lady A | 2026-12-10 | Northfield | https://seatgeek.com/lady-a-tickets/northfield-ohio-mgm-northfield-park-center-stage-2026-12-10-7-30-pm/concert/18295291 |
| tm-lady-a-2026-gary-vvg1fz_5la2nke | Lady A | 2026-12-11 | Gary | https://seatgeek.com/lady-a-tickets/gary-indiana-hard-rock-live-northern-indiana-2026-12-11-7-pm/concert/18295733 |
| tm-lady-a-2026-shipshewana-z7r9jz1a7pkv6 | Lady A | 2026-12-12 | Shipshewana | https://seatgeek.com/lady-a-tickets/shipshewana-indiana-blue-gate-performing-arts-center-2026-12-12-7-30-pm/concert/18295863 |
| tm-lady-a-2026-new-york-g5diz_g2zkgbb | Lady A | 2026-12-17 | New York | https://seatgeek.com/lady-a-tickets/new-york-new-york-beacon-theatre-2026-12-17-8-pm/concert/18294956 |
| tm-lady-a-2026-bensalem-z7r9jz1a7p380 | Lady A | 2026-12-18 | Bensalem | https://seatgeek.com/lady-a-tickets/bensalem-pennsylvania-xcite-center-at-parx-casino-2026-12-18-8-pm/concert/18353855 |
| tm-lady-a-2026-greensboro-g5evz_g5lge4i | Lady A | 2026-12-19 | Greensboro | https://seatgeek.com/lady-a-tickets/greensboro-north-carolina-steven-tanger-center-for-the-performing-arts-2026-12-19-7-30-pm/concert/18295539 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-lady-a-2026-nashville-z7r9jz1a7p0p9 | Lady A | 2026-12-21 | Nashville | conflicting_same_date_city_candidates | https://seatgeek.com/lady-a-tickets/nashville-tennessee-ryman-auditorium-2026-12-21-3-pm/concert/18295865 |

## Accepted venue mismatches

- None

## Conflicts found

- tm-lady-a-2026-nashville-z7r9jz1a7p0p9 (Lady A, 2026-12-21, Nashville)
  - 100: https://seatgeek.com/lady-a-tickets/nashville-tennessee-ryman-auditorium-2026-12-21-7-30-pm/concert/18295867

## Rate-limited / not checked

- None

## API/environment failures

- None

## Skipped before any API call

Enrichment-eligible events missing a SeatGeek URL that this run deliberately did not query. Past events can never gain a useful CTA; an unresolvable venue-local date would make the SeatGeek date filter search the wrong night, so it is never guessed.

- None
# SeatGeek CTA auto-add log

Generated: 2026-10-31T15:58:39.663Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4748
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4748
- Events already carrying a valid SeatGeek URL: 2596
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2596
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2152
- Eligible (upcoming, resolvable local date) after pre-API filtering: 7
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20757)
- Runs needed to check every eligible event once: 1
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
- 2596 event(s) already carried valid SeatGeek URLs before this run, including 2596 enrichment-eligible event(s).
- This run queried only the 2152 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-tash-sultana-2027-dublin-1abzkgkgkdrrzgx | Tash Sultana | 2027-03-11 | Dublin | no_candidates_returned | - |
| tm-tash-sultana-2027-london-1adjzbsgkmupg8h | Tash Sultana | 2027-03-13 | London | no_candidates_returned | - |
| tm-tash-sultana-2027-merksem-antwerpen-z698xzg2z1kjpqofb | Tash Sultana | 2027-03-16 | Merksem (Antwerpen) | no_candidates_returned | - |
| tm-tash-sultana-2027-amsterdam-z698xzbpz16vawaob0 | Tash Sultana | 2027-03-26 | Amsterdam | no_candidates_returned | - |
| tm-tash-sultana-2027-auckland-1a0zkfggkee4ejk | Tash Sultana | 2027-04-22 | Auckland | no_candidates_returned | - |
| tm-tash-sultana-2027-auckland-1kazvpgigacnerq | Tash Sultana | 2027-04-23 | Auckland | no_candidates_returned | - |
| tm-tash-sultana-2027-thirroul-1akzkfggkdlsqdl | Tash Sultana | 2027-05-01 | Thirroul | no_candidates_returned | - |

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

Generated: 2026-10-31T16:01:16.056Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4803
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4803
- Events already carrying a valid SeatGeek URL: 2614
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2614
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2189
- Eligible (upcoming, resolvable local date) after pre-API filtering: 1
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20757)
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
- 2614 event(s) already carried valid SeatGeek URLs before this run, including 2614 enrichment-eligible event(s).
- This run queried only the 2189 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-the-avett-brothers-2027-asheville-g5evz_38pztce | The Avett Brothers | 2026-12-31 | Asheville | https://seatgeek.com/the-avett-brothers-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2026-12-31-8-pm/concert/18580244 |

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

Generated: 2026-10-31T15:59:58.656Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4780
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4780
- Events already carrying a valid SeatGeek URL: 2606
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2606
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2174
- Eligible (upcoming, resolvable local date) after pre-API filtering: 20
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 2 (key 20757)
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
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2606 event(s) already carried valid SeatGeek URLs before this run, including 2606 enrichment-eligible event(s).
- This run queried only the 2174 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-theory-of-a-deadman-2027-rama-1a8zkfngkeitbvf | Theory Of A Deadman | 2027-03-12 | Rama | https://seatgeek.com/theory-of-a-deadman-tickets/rama-canada-casino-rama-resort-2027-03-12-9-pm/concert/18570545 |
| tm-theory-of-a-deadman-2027-toronto-1a8zkfngked-56c | Theory Of A Deadman | 2027-03-13 | Toronto | https://seatgeek.com/theory-of-a-deadman-tickets/toronto-canada-the-theatre-at-great-canadian-casino-resort-toronto-2027-03-13-8-pm/concert/18570546 |
| tm-theory-of-a-deadman-2027-windsor-1avzz_ogktpe4kz | Theory Of A Deadman | 2027-03-17 | Windsor | https://seatgeek.com/theory-of-a-deadman-tickets/windsor-canada-the-colosseum-at-caesars-windsor-2027-03-17-7-pm/concert/18560921 |
| tm-theory-of-a-deadman-2027-thunder-bay-1avzz_ogkrpopru | Theory Of A Deadman | 2027-03-19 | Thunder Bay | https://seatgeek.com/theory-of-a-deadman-tickets/thunder-bay-canada-thunder-bay-community-auditorium-2027-03-19-7-30-pm/concert/18570548 |
| tm-theory-of-a-deadman-2027-winnipeg-1av7z_ogkxutibu | Theory Of A Deadman | 2027-03-20 | Winnipeg | https://seatgeek.com/theory-of-a-deadman-tickets/winnipeg-canada-burton-cummings-theatre-2027-03-20-8-pm/concert/18570549 |
| tm-theory-of-a-deadman-2027-regina-z7r9jz1aavxpg | Theory Of A Deadman | 2027-03-22 | Regina | https://seatgeek.com/theory-of-a-deadman-tickets/regina-canada-conexus-arts-centre-2027-03-22-8-pm/concert/18570554 |
| tm-theory-of-a-deadman-2027-enoch-1aozkfngkdgjwil | Theory Of A Deadman | 2027-03-24 | Enoch | https://seatgeek.com/theory-of-a-deadman-tickets/enoch-canada-river-cree-resort-casino-2027-03-24-8-pm/concert/18570557 |
| tm-theory-of-a-deadman-2027-calgary-1av7z_ogkn_kbte | Theory Of A Deadman | 2027-03-25 | Calgary | https://seatgeek.com/theory-of-a-deadman-tickets/calgary-canada-southern-alberta-jubilee-auditorium-2027-03-25-8-pm/concert/18570558 |
| tm-theory-of-a-deadman-2027-dawson-creek-z7r9jz1aavxjp | Theory Of A Deadman | 2027-03-27 | Dawson Creek | https://seatgeek.com/theory-of-a-deadman-tickets/dawson-creek-canada-ovintiv-events-centre-2027-03-27-8-pm/concert/18570559 |
| tm-theory-of-a-deadman-2027-vancouver-1av7z_ogknc7mrb | Theory Of A Deadman | 2027-03-31 | Vancouver | https://seatgeek.com/theory-of-a-deadman-tickets/vancouver-canada-queen-elizabeth-theatre-vancouver-2027-03-31-8-pm/concert/18570564 |

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
