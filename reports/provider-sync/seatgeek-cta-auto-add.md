# SeatGeek CTA auto-add log

Generated: 2026-11-01T17:05:40.038Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4902
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4902
- Events already carrying a valid SeatGeek URL: 2661
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2661
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2241
- Eligible (upcoming, resolvable local date) after pre-API filtering: 6
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20758)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 6
- Events checked by this run: 6
- API calls made: 30
- Rate-limit responses: 0
- URLs added: 2
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

- `URLs added: 2` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2661 event(s) already carried valid SeatGeek URLs before this run, including 2661 enrichment-eligible event(s).
- This run queried only the 2241 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-cody-johnson-2027-austin-g5diz_43sxhzn | Cody Johnson | 2027-02-19 | Austin | https://seatgeek.com/cody-johnson-tickets/austin-texas-moody-center-atx-2027-02-19-7-pm/concert/18710054 |
| tm-cody-johnson-2027-austin-g5diz_46xjfxh | Cody Johnson | 2027-02-20 | Austin | https://seatgeek.com/cody-johnson-tickets/austin-texas-moody-center-atx-2027-02-20-7-pm/concert/18701505 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-cody-johnson-2026-birmingham-1kfyv0o_ga1tsuk | Cody Johnson | 2026-11-01 | Birmingham | no_candidates_returned | - |
| tm-cody-johnson-2026-glasgow-1auzk8ugkdf-aiv | Cody Johnson | 2026-11-02 | Glasgow | no_candidates_returned | - |
| tm-cody-johnson-2026-belfast-1azzkodgkdbmxb7 | Cody Johnson | 2026-11-04 | Belfast | no_candidates_returned | - |
| tm-cody-johnson-2026-dublin-1avoz_73704zd85a | Cody Johnson | 2026-11-05 | Dublin | no_candidates_returned | - |

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

Generated: 2026-11-01T17:03:55.587Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4882
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4882
- Events already carrying a valid SeatGeek URL: 2650
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2650
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2232
- Eligible (upcoming, resolvable local date) after pre-API filtering: 2
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20758)
- Runs needed to check every eligible event once: 1
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
- 2650 event(s) already carried valid SeatGeek URLs before this run, including 2650 enrichment-eligible event(s).
- This run queried only the 2232 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-daniel-caesar-2026-honolulu-vvg1iz_fxhtber | Daniel Caesar | 2026-11-14 | Honolulu | https://seatgeek.com/daniel-caesar-tickets/honolulu-hawaii-neal-s-blaisdell-arena-2026-11-14-8-pm/concert/18692471 |
| tm-daniel-caesar-2026-honolulu-vvg1iz_fxhniew | Daniel Caesar | 2026-11-15 | Honolulu | https://seatgeek.com/daniel-caesar-tickets/honolulu-hawaii-neal-s-blaisdell-arena-2026-11-15-8-pm/concert/18700620 |

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

Generated: 2026-11-01T17:05:41.211Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4902
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4902
- Events already carrying a valid SeatGeek URL: 2661
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2661
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2241
- Eligible (upcoming, resolvable local date) after pre-API filtering: 0
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20758)
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
- 2661 event(s) already carried valid SeatGeek URLs before this run, including 2661 enrichment-eligible event(s).
- This run queried only the 2241 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
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

Generated: 2026-11-01T17:01:07.996Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4819
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4819
- Events already carrying a valid SeatGeek URL: 2639
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2639
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2180
- Eligible (upcoming, resolvable local date) after pre-API filtering: 1
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20758)
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
- 2639 event(s) already carried valid SeatGeek URLs before this run, including 2639 enrichment-eligible event(s).
- This run queried only the 2180 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-jason-aldean-2027-hollywood-vvg1vz_4r1id24 | Jason Aldean | 2027-02-27 | Hollywood | https://seatgeek.com/jason-aldean-tickets/hollywood-florida-hard-rock-live-hollywood-2027-02-27-8-pm/concert/18724459 |

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

Generated: 2026-11-01T17:01:30.269Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4822
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4822
- Events already carrying a valid SeatGeek URL: 2639
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2639
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2183
- Eligible (upcoming, resolvable local date) after pre-API filtering: 3
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20758)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 3
- Events checked by this run: 3
- API calls made: 15
- Rate-limit responses: 0
- URLs added: 0
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

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2639 event(s) already carried valid SeatGeek URLs before this run, including 2639 enrichment-eligible event(s).
- This run queried only the 2183 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-mariah-carey-2026-birmingham-1anzkfsgkdvieos | Mariah Carey | 2026-11-27 | Birmingham | no_candidates_returned | - |
| tm-mariah-carey-2026-london-1agzkfsgkdzymm6 | Mariah Carey | 2026-11-30 | London | no_candidates_returned | - |
| tm-mariah-carey-2026-manchester-1amzkfsgkejdwkf | Mariah Carey | 2026-12-02 | Manchester | no_candidates_returned | - |

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

Generated: 2026-11-01T17:03:38.866Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4880
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4880
- Events already carrying a valid SeatGeek URL: 2648
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2648
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2232
- Eligible (upcoming, resolvable local date) after pre-API filtering: 19
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20758)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 7
- Events skipped: 3
- no_candidates_returned: 3
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-queens-of-the-stone-age-2027-morrison-z7r9jz1aa7nqm
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'queens-of-the-stone-age' --max-api-calls 50 --resume-from 'tm-queens-of-the-stone-age-2027-morrison-z7r9jz1aa7nqm'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 3

## Interpretation

- `URLs added: 7` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2648 event(s) already carried valid SeatGeek URLs before this run, including 2648 enrichment-eligible event(s).
- This run queried only the 2232 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-queens-of-the-stone-age-2027-san-diego-vvg1iz_4c-ppva | Queens Of The Stone Age | 2027-05-01 | San Diego | https://seatgeek.com/queens-of-the-stone-age-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2027-05-01-6-30-pm/concert/18709210 |
| tm-queens-of-the-stone-age-2027-inglewood-vv1k0z_48eg7ij9v | Queens Of The Stone Age | 2027-05-02 | Inglewood | https://seatgeek.com/queens-of-the-stone-age-tickets/inglewood-california-kia-forum-2027-05-02-6-30-pm/concert/18709211 |
| tm-queens-of-the-stone-age-2027-oakland-g5vyz_4k7itnp | Queens Of The Stone Age | 2027-05-04 | Oakland | https://seatgeek.com/queens-of-the-stone-age-tickets/oakland-california-oakland-arena-2027-05-04-6-30-pm/concert/18709212 |
| tm-queens-of-the-stone-age-2027-sacramento-g5vyz_4paibie | Queens Of The Stone Age | 2027-05-05 | Sacramento | https://seatgeek.com/queens-of-the-stone-age-tickets/sacramento-california-golden-1-center-2027-05-05-6-30-pm/concert/18709213 |
| tm-queens-of-the-stone-age-2027-seattle-vvg1hz_43n59ay | Queens Of The Stone Age | 2027-05-07 | Seattle | https://seatgeek.com/queens-of-the-stone-age-tickets/seattle-washington-climate-pledge-arena-2027-05-07-6-30-pm/concert/18709214 |
| tm-queens-of-the-stone-age-2027-portland-vvg1hz_42zzik2 | Queens Of The Stone Age | 2027-05-09 | Portland | https://seatgeek.com/queens-of-the-stone-age-tickets/portland-oregon-moda-center-2027-05-09-6-30-pm/concert/18709215 |
| tm-queens-of-the-stone-age-2027-salt-lake-city-z7r9jz1aa7-1z | Queens Of The Stone Age | 2027-05-11 | Salt Lake City | https://seatgeek.com/queens-of-the-stone-age-tickets/salt-lake-city-utah-delta-center-1-2027-05-11-6-30-pm/concert/18475187 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-queens-of-the-stone-age-2026-adelaide-17a8v0g6cj0fp2t | Queens Of The Stone Age | 2026-12-08 | Adelaide | no_candidates_returned | - |
| tm-queens-of-the-stone-age-2026-glenorchy-177yv0g6cla9khl | Queens Of The Stone Age | 2026-12-11 | Glenorchy | no_candidates_returned | - |
| tm-queens-of-the-stone-age-2026-auckland-17azv0g6cjw0kgn | Queens Of The Stone Age | 2026-12-20 | Auckland | no_candidates_returned | - |

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

Generated: 2026-11-01T17:02:35.871Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4861
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4861
- Events already carrying a valid SeatGeek URL: 2641
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2641
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2220
- Eligible (upcoming, resolvable local date) after pre-API filtering: 39
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 3 of 4 (key 20758)
- Runs needed to check every eligible event once: 4
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 2
- Events skipped: 8
- no_candidates_returned: 8
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-sting-2027-konstanz-z698xzc2z1kjfov_n
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'sting' --max-api-calls 50 --resume-from 'tm-sting-2027-konstanz-z698xzc2z1kjfov_n'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 8

## Interpretation

- `URLs added: 2` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2641 event(s) already carried valid SeatGeek URLs before this run, including 2641 enrichment-eligible event(s).
- This run queried only the 2220 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-sting-2027-las-vegas-1ayzk4agkecamcg | Sting | 2027-03-10 | Las Vegas | https://seatgeek.com/sting-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2027-03-10-8-pm/concert/18674619 |
| tm-sting-2027-las-vegas-1ayzk4agkec6msw | Sting | 2027-03-12 | Las Vegas | https://seatgeek.com/sting-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2027-03-12-8-pm/concert/18674620 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-sting-2027-gliwice-z698xzqpz1kckp0pa | Sting | 2027-06-06 | Gliwice | no_candidates_returned | - |
| tm-sting-2027-gdansk-sopot-z698xzqpz16vv6c7f6 | Sting | 2027-06-07 | Gdańsk/Sopot | no_candidates_returned | - |
| tm-sting-2027-krakow-z698xzqpz16evtf6jd | Sting | 2027-06-09 | Krakow | no_candidates_returned | - |
| tm-sting-2027-odz-z698xzqpz1k06xapf | Sting | 2027-06-10 | Łódź | no_candidates_returned | - |
| tm-sting-2027-magdeburg-z698xzc2z16vzxvefv | Sting | 2027-06-12 | Magdeburg | no_candidates_returned | - |
| tm-sting-2027-rastatt-z698xzc2z1ke30sgb | Sting | 2027-06-17 | Rastatt | no_candidates_returned | - |
| tm-sting-2027-hemer-z698xzc2z16vagofpv | Sting | 2027-06-20 | Hemer | no_candidates_returned | - |
| tm-sting-2027-fulda-z698xzc2z16v1vjxok | Sting | 2027-06-26 | Fulda | no_candidates_returned | - |

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

Generated: 2026-11-01T17:04:59.154Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4896
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4896
- Events already carrying a valid SeatGeek URL: 2659
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2659
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2237
- Eligible (upcoming, resolvable local date) after pre-API filtering: 14
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20758)
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
- Next resume showId: tm-three-days-grace-2026-san-jose-g5vyzbu3r_nwh
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'three-days-grace' --max-api-calls 50 --resume-from 'tm-three-days-grace-2026-san-jose-g5vyzbu3r_nwh'
- Accepted venue mismatches: 0
- Conflicts found: 1

## Skipped reasons

- conflicting_same_date_city_candidates: 1

## Interpretation

- `URLs added: 9` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2659 event(s) already carried valid SeatGeek URLs before this run, including 2659 enrichment-eligible event(s).
- This run queried only the 2237 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-three-days-grace-2026-peoria-vv1a6zkuppfa-ze27 | Three Days Grace | 2026-11-03 | Peoria | https://seatgeek.com/three-days-grace-tickets/peoria-illinois-peoria-civic-center-arena-2026-11-03-7-pm/concert/17895156 |
| tm-three-days-grace-2026-indianapolis-vv11v8vn_af0q_vg | Three Days Grace | 2026-11-04 | Indianapolis | https://seatgeek.com/three-days-grace-tickets/indianapolis-indiana-gainbridge-fieldhouse-2026-11-04-7-pm/concert/17895157 |
| tm-three-days-grace-2026-tulsa-1aozkupgkdxuamf | Three Days Grace | 2026-11-06 | Tulsa | https://seatgeek.com/three-days-grace-tickets/tulsa-oklahoma-bok-center-2026-11-06-7-pm/concert/17895159 |
| tm-three-days-grace-2026-saint-louis-vv1akzku0gkd5ahjs | Three Days Grace | 2026-11-07 | Saint Louis | https://seatgeek.com/three-days-grace-tickets/saint-louis-missouri-enterprise-center-2026-11-07-7-pm/concert/17895158 |
| tm-three-days-grace-2026-kansas-city-vv1akzkujgkeirwar | Three Days Grace | 2026-11-09 | Kansas City | https://seatgeek.com/three-days-grace-tickets/kansas-city-missouri-t-mobile-center-2026-11-09-7-pm/concert/17895165 |
| tm-three-days-grace-2026-denver-g5vzzbuiyxc-- | Three Days Grace | 2026-11-11 | Denver | https://seatgeek.com/three-days-grace-tickets/denver-colorado-ball-arena-2026-11-11-7-pm/concert/17895166 |
| tm-three-days-grace-2026-nampa-z7r9jz1a7qz3z | Three Days Grace | 2026-11-14 | Nampa | https://seatgeek.com/three-days-grace-tickets/nampa-idaho-ford-idaho-center-2026-11-14-7-pm/concert/17895168 |
| tm-three-days-grace-2026-spokane-z7r9jz1a7qz3e | Three Days Grace | 2026-11-15 | Spokane | https://seatgeek.com/three-days-grace-tickets/spokane-washington-numerica-veterans-arena-2026-11-15-7-pm/concert/17895171 |
| tm-three-days-grace-2026-sacramento-g5vyzbu2whwe8 | Three Days Grace | 2026-11-17 | Sacramento | https://seatgeek.com/three-days-grace-tickets/sacramento-california-golden-1-center-2026-11-17-7-pm/concert/17895172 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-three-days-grace-2026-nashville-g5vizbu4hqfya | Three Days Grace | 2026-11-01 | Nashville | conflicting_same_date_city_candidates | https://seatgeek.com/three-days-grace-tickets/nashville-tennessee-bridgestone-arena-2026-11-01-7-pm/concert/17895154 |

## Accepted venue mismatches

- None

## Conflicts found

- tm-three-days-grace-2026-nashville-g5vizbu4hqfya (Three Days Grace, 2026-11-01, Nashville)
  - 100: https://seatgeek.com/three-days-grace-tickets/nashville-tennessee-bridgestone-arena-2026-11-01-9-15-pm/concert/18662936

## Rate-limited / not checked

- None

## API/environment failures

- None

## Skipped before any API call

Enrichment-eligible events missing a SeatGeek URL that this run deliberately did not query. Past events can never gain a useful CTA; an unresolvable venue-local date would make the SeatGeek date filter search the wrong night, so it is never guessed.

- None
