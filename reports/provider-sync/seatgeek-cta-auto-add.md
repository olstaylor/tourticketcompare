# SeatGeek CTA auto-add log

Generated: 2026-10-12T20:10:39.395Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3372
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2647
- Events already carrying a valid SeatGeek URL: 1126
- Enrichment-eligible events already carrying a valid SeatGeek URL: 820
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1827
- Eligible (upcoming, resolvable local date) after pre-API filtering: 16
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20738)
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
- Next resume showId: tm-backstreet-boys-2027-toronto-1avzz_kgkz7owqt
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'backstreet-boys' --max-api-calls 50 --resume-from 'tm-backstreet-boys-2027-toronto-1avzz_kgkz7owqt'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1126 event(s) already carried valid SeatGeek URLs before this run, including 820 enrichment-eligible event(s).
- This run queried only the 1827 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-backstreet-boys-2026-las-vegas-17ayv0g62tqwir3 | Backstreet Boys | 2026-12-26 | Las Vegas | https://seatgeek.com/backstreet-boys-tickets/las-vegas-nevada-sphere-2026-12-26-8-pm/concert/18513686 |
| tm-backstreet-boys-2026-las-vegas-17ayv0g62tqtbry | Backstreet Boys | 2026-12-27 | Las Vegas | https://seatgeek.com/backstreet-boys-tickets/las-vegas-nevada-sphere-2026-12-27-8-pm/concert/18513688 |
| tm-backstreet-boys-2027-las-vegas-17ayv0g62th2fwx | Backstreet Boys | 2026-12-31 | Las Vegas | https://seatgeek.com/backstreet-boys-tickets/las-vegas-nevada-sphere-2026-12-31-10-pm/concert/18470170 |
| tm-backstreet-boys-2027-las-vegas-17ayv0g62thois9 | Backstreet Boys | 2027-01-01 | Las Vegas | https://seatgeek.com/backstreet-boys-tickets/las-vegas-nevada-sphere-2027-01-01-8-pm/concert/18470178 |
| tm-backstreet-boys-2027-las-vegas-17ayv0g62th3iss | Backstreet Boys | 2027-01-02 | Las Vegas | https://seatgeek.com/backstreet-boys-tickets/las-vegas-nevada-sphere-2027-01-02-8-pm/concert/18470180 |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7jcq4 | Backstreet Boys | 2027-02-12 | Toronto | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-12-8-pm/concert/18642041 |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7qqq_ | Backstreet Boys | 2027-02-13 | Toronto | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-13-8-pm/concert/18642039 |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7ruqx | Backstreet Boys | 2027-02-14 | Toronto | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-14-8-pm/concert/18652781 |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7luql | Backstreet Boys | 2027-02-19 | Toronto | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-19-8-pm/concert/18642040 |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7ouqm | Backstreet Boys | 2027-02-20 | Toronto | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-20-8-pm/concert/18642042 |

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

Generated: 2026-10-12T20:07:23.799Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3313
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2594
- Events already carrying a valid SeatGeek URL: 1096
- Enrichment-eligible events already carrying a valid SeatGeek URL: 790
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1804
- Eligible (upcoming, resolvable local date) after pre-API filtering: 12
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20738)
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
- Next resume showId: tm-eagles-2027-las-vegas-1a9zk3dgkdpxtsi
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'eagles' --max-api-calls 50 --resume-from 'tm-eagles-2027-las-vegas-1a9zk3dgkdpxtsi'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1096 event(s) already carried valid SeatGeek URLs before this run, including 790 enrichment-eligible event(s).
- This run queried only the 1804 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-eagles-2026-las-vegas-1a9zk37gkdxvozi | Eagles | 2026-11-13 | Las Vegas | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-11-13-8-30-pm/concert/18219945 |
| tm-eagles-2026-las-vegas-1a9zk37gkdxg-zv | Eagles | 2026-11-14 | Las Vegas | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-11-14-8-30-pm/concert/18219946 |
| tm-eagles-2026-las-vegas-1a9zk37gkdxusyv | Eagles | 2026-11-27 | Las Vegas | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-11-27-8-30-pm/concert/18219952 |
| tm-eagles-2026-las-vegas-1a9zk37gkdxzvy5 | Eagles | 2026-11-28 | Las Vegas | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-11-28-8-30-pm/concert/18219951 |
| tm-eagles-2026-las-vegas-1a9zk3dgkdpxlsb | Eagles | 2026-12-04 | Las Vegas | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-12-04-8-30-pm/concert/18355049 |
| tm-eagles-2026-las-vegas-1a9zk3dgkdpxrsr | Eagles | 2026-12-05 | Las Vegas | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-12-05-8-30-pm/concert/18355050 |
| tm-eagles-2026-las-vegas-1a9zk3dgkdpxrso | Eagles | 2026-12-11 | Las Vegas | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-12-11-8-30-pm/concert/18355052 |
| tm-eagles-2026-las-vegas-1a9zk3dgkdbgzr6 | Eagles | 2026-12-12 | Las Vegas | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2026-12-12-8-30-pm/concert/18355051 |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpxrs0 | Eagles | 2027-01-15 | Las Vegas | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-15-8-30-pm/concert/18421044 |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpxtsj | Eagles | 2027-01-16 | Las Vegas | https://seatgeek.com/eagles-tickets/las-vegas-nevada-sphere-2027-01-16-8-30-pm/concert/18421045 |

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

Generated: 2026-10-12T20:09:35.279Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3356
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2631
- Events already carrying a valid SeatGeek URL: 1116
- Enrichment-eligible events already carrying a valid SeatGeek URL: 810
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1821
- Eligible (upcoming, resolvable local date) after pre-API filtering: 18
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20738)
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
- Next resume showId: tm-john-mayer-2027-las-vegas-16vjz_komg7mcfd
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'john-mayer' --max-api-calls 50 --resume-from 'tm-john-mayer-2027-las-vegas-16vjz_komg7mcfd'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1116 event(s) already carried valid SeatGeek URLs before this run, including 810 enrichment-eligible event(s).
- This run queried only the 1821 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-john-mayer-2027-las-vegas-11ayvpu8jkxpvc | John Mayer | 2027-04-08 | Las Vegas | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-08-8-pm/concert/18626622 |
| tm-john-mayer-2027-las-vegas-16vjz_komg7ucku | John Mayer | 2027-04-10 | Las Vegas | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-10-8-pm/concert/18626621 |
| tm-john-mayer-2027-las-vegas-16vjz_komg7uckz | John Mayer | 2027-04-11 | Las Vegas | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-11-8-pm/concert/18626620 |
| tm-john-mayer-2027-las-vegas-16vjz_komg7uwkb | John Mayer | 2027-04-15 | Las Vegas | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-15-8-pm/concert/18626619 |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mukw | John Mayer | 2027-04-17 | Las Vegas | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-17-8-pm/concert/18626618 |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mukt | John Mayer | 2027-04-18 | Las Vegas | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-18-8-pm/concert/18626617 |
| tm-john-mayer-2027-las-vegas-16vjz_fp3g7i6pt | John Mayer | 2027-04-28 | Las Vegas | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-28-8-pm/concert/18659121 |
| tm-john-mayer-2027-las-vegas-16vjz_fp3g7w9n5 | John Mayer | 2027-04-30 | Las Vegas | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-30-8-pm/concert/18659117 |
| tm-john-mayer-2027-las-vegas-16vjz_fp3g7dmck | John Mayer | 2027-05-01 | Las Vegas | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-01-8-pm/concert/18659119 |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mqfv | John Mayer | 2027-05-05 | Las Vegas | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-05-8-pm/concert/18659122 |

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

Generated: 2026-10-12T20:08:30.004Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3338
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2613
- Events already carrying a valid SeatGeek URL: 1106
- Enrichment-eligible events already carrying a valid SeatGeek URL: 800
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1813
- Eligible (upcoming, resolvable local date) after pre-API filtering: 19
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20738)
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
- Next resume showId: tm-journey-2026-toronto-177zv0g6110gajo
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'journey' --max-api-calls 50 --resume-from 'tm-journey-2026-toronto-177zv0g6110gajo'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1106 event(s) already carried valid SeatGeek URLs before this run, including 800 enrichment-eligible event(s).
- This run queried only the 1813 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-journey-2026-biloxi-g5viz_19l6he3 | Journey | 2026-10-12 | Biloxi | https://seatgeek.com/journey-tickets/biloxi-mississippi-mississippi-coast-coliseum-2026-10-12-7-30-pm/concert/18237101 |
| tm-journey-2026-birmingham-17fzv0g61p_lkay | Journey | 2026-10-13 | Birmingham | https://seatgeek.com/journey-tickets/birmingham-alabama-legacy-arena-at-the-bjcc-2026-10-13-7-30-pm/concert/18237104 |
| tm-journey-2026-orlando-17fov0g613pzs04 | Journey | 2026-10-17 | Orlando | https://seatgeek.com/journey-tickets/orlando-florida-kia-center-2026-10-17-7-30-pm/concert/18237106 |
| tm-journey-2026-atlanta-vvg1zz_1p_clel | Journey | 2026-10-19 | Atlanta | https://seatgeek.com/journey-tickets/atlanta-georgia-state-farm-arena-1-2026-10-19-7-30-pm/concert/18237108 |
| tm-journey-2026-nashville-g5viz_141b_9f | Journey | 2026-10-21 | Nashville | https://seatgeek.com/journey-tickets/nashville-tennessee-bridgestone-arena-2026-10-21-7-30-pm/concert/18237111 |
| tm-journey-2026-baltimore-17a8v0g61kp2ris | Journey | 2026-10-24 | Baltimore | https://seatgeek.com/journey-tickets/baltimore-maryland-cfg-bank-arena-2026-10-24-7-30-pm/concert/18237112 |
| tm-journey-2026-newark-vvg1fz_197dnkr | Journey | 2026-10-25 | Newark | https://seatgeek.com/journey-tickets/newark-new-jersey-prudential-center-2026-10-25-7-30-pm/concert/18237088 |
| tm-journey-2026-philadelphia-17gzv0g61p0-ppk | Journey | 2026-10-28 | Philadelphia | https://seatgeek.com/journey-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-10-28-7-30-pm/concert/18237115 |
| tm-journey-2026-providence-vvg17z_1fuwpyc | Journey | 2026-10-29 | Providence | https://seatgeek.com/journey-tickets/providence-rhode-island-amica-mutual-pavilion-2026-10-29-7-30-pm/concert/18237117 |
| tm-journey-2026-detroit-vvg1oz_13slngw | Journey | 2026-11-02 | Detroit | https://seatgeek.com/journey-tickets/detroit-michigan-little-caesars-arena-2026-11-02-7-30-pm/concert/18237116 |

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

Generated: 2026-10-12T20:06:19.003Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3301
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2582
- Events already carrying a valid SeatGeek URL: 1086
- Enrichment-eligible events already carrying a valid SeatGeek URL: 780
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1802
- Eligible (upcoming, resolvable local date) after pre-API filtering: 15
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20738)
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
- Next resume showId: tm-noah-kahan-2027-dublin-1abzkffgkeyrrov
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'noah-kahan' --max-api-calls 50 --resume-from 'tm-noah-kahan-2027-dublin-1abzkffgkeyrrov'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 10

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1086 event(s) already carried valid SeatGeek URLs before this run, including 780 enrichment-eligible event(s).
- This run queried only the 1802 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-noah-kahan-2026-glasgow-1adbz_fgkn7svza | Noah Kahan | 2026-11-05 | Glasgow | no_candidates_returned | - |
| tm-noah-kahan-2026-glasgow-1auzk3agkdn-buh | Noah Kahan | 2026-11-06 | Glasgow | no_candidates_returned | - |
| tm-noah-kahan-2026-manchester-g5vhz_gxilkd5 | Noah Kahan | 2026-11-09 | Manchester | no_candidates_returned | - |
| tm-noah-kahan-2026-manchester-g5vhz_gxiljdj | Noah Kahan | 2026-11-10 | Manchester | no_candidates_returned | - |
| tm-noah-kahan-2026-london-1ku8v0x_gag10y_ | Noah Kahan | 2026-11-13 | London | no_candidates_returned | - |
| tm-noah-kahan-2026-london-1ku8v0x_gag57yq | Noah Kahan | 2026-11-14 | London | no_candidates_returned | - |
| tm-noah-kahan-2026-dublin-1avoz_fgkn52bxo | Noah Kahan | 2026-11-19 | Dublin | no_candidates_returned | - |
| tm-noah-kahan-2026-dublin-1kkzv0x9ga2yvxh | Noah Kahan | 2026-11-21 | Dublin | no_candidates_returned | - |
| tm-noah-kahan-2026-dublin-1abzk3agkdihdnu | Noah Kahan | 2026-11-22 | Dublin | no_candidates_returned | - |
| tm-noah-kahan-2027-glasgow-1adbz_8gkufqoce | Noah Kahan | 2027-07-13 | Glasgow | no_candidates_returned | - |

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

Generated: 2026-10-12T20:05:13.642Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3285
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2567
- Events already carrying a valid SeatGeek URL: 1086
- Enrichment-eligible events already carrying a valid SeatGeek URL: 780
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1787
- Eligible (upcoming, resolvable local date) after pre-API filtering: 12
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20738)
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
- Next resume showId: tm-slipknot-2027-san-francisco-g5vyz_khsbrlp
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'slipknot' --max-api-calls 50 --resume-from 'tm-slipknot-2027-san-francisco-g5vyz_khsbrlp'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 1
- city_or_metro_match_failed: 1

## Interpretation

- `URLs added: 8` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1086 event(s) already carried valid SeatGeek URLs before this run, including 780 enrichment-eligible event(s).
- This run queried only the 1787 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-slipknot-2027-washington-1a4zkfmgkdgza4s | Slipknot | 2027-07-16 | Washington | https://seatgeek.com/slipknot-tickets/washington-district-of-columbia-nationals-park-2027-07-16-6-30-pm/concert/18626597 |
| tm-slipknot-2027-montreal-1ad7z_3gkln01oc | Slipknot | 2027-07-21 | Montreal | https://seatgeek.com/slipknot-tickets/montreal-canada-parc-jean-drapeau-2027-07-21-6-30-pm/concert/18626589 |
| tm-slipknot-2027-toronto-1k7zvpczgauvkjd | Slipknot | 2027-07-23 | Toronto | https://seatgeek.com/slipknot-tickets/toronto-canada-rogers-stadium-toronto-2027-07-23-6-30-pm/concert/18626595 |
| tm-slipknot-2027-chicago-vv167zkfmpfza26gu7 | Slipknot | 2027-07-25 | Chicago | https://seatgeek.com/slipknot-tickets/chicago-illinois-soldier-field-2027-07-25-6-30-pm/concert/18626573 |
| tm-slipknot-2027-hershey-vv1aezkfzgkdcrpxj | Slipknot | 2027-07-28 | Hershey | https://seatgeek.com/slipknot-tickets/hershey-pennsylvania-hersheypark-stadium-2027-07-28-6-30-pm/concert/18626575 |
| tm-slipknot-2027-houston-g5diz_kx0z68q | Slipknot | 2027-08-06 | Houston | https://seatgeek.com/slipknot-tickets/houston-texas-daikin-park-2027-08-06-6-30-pm/concert/18626578 |
| tm-slipknot-2027-commerce-city-g5vzz_kofjm9p | Slipknot | 2027-08-09 | Commerce City | https://seatgeek.com/slipknot-tickets/commerce-city-colorado-dick-s-sporting-goods-park-2027-08-09-6-30-pm/concert/18626584 |
| tm-slipknot-2027-inglewood-vvg1iz_k9by2hw | Slipknot | 2027-08-13 | Inglewood | https://seatgeek.com/slipknot-tickets/inglewood-california-sofi-stadium-2027-08-13-6-30-pm/concert/18626585 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-slipknot-2027-london-1anzkfggkdhuzzd | Slipknot | 2027-07-03 | London | no_candidates_returned | - |
| tm-slipknot-2027-queens-g5vvz_kci8xei | Slipknot | 2027-07-18 | Queens | city_or_metro_match_failed | https://seatgeek.com/slipknot-tickets/flushing-new-york-citi-field-2027-07-18-6-30-pm/concert/18626576 |

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
