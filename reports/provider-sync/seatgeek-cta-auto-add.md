# SeatGeek CTA auto-add log

Generated: 2026-10-08T17:41:05.470Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 2716
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2184
- Events already carrying a valid SeatGeek URL: 708
- Enrichment-eligible events already carrying a valid SeatGeek URL: 471
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1713
- Eligible (upcoming, resolvable local date) after pre-API filtering: 52
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 5 of 6 (key 20734)
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
- Next resume showId: tm-dancing-with-the-stars-2027-charlotte-g5evz_kj22ebd
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'dancing-with-the-stars' --max-api-calls 50 --resume-from 'tm-dancing-with-the-stars-2027-charlotte-g5evz_kj22ebd'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 10

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 708 event(s) already carried valid SeatGeek URLs before this run, including 471 enrichment-eligible event(s).
- This run queried only the 1713 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-dancing-with-the-stars-2027-portland-vvg1hz_kxomi0l | Dancing With The Stars | 2027-03-24 | Portland | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-sacramento-g5vyz_kzd-r6s | Dancing With The Stars | 2027-03-26 | Sacramento | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-san-jose-g5vyz_kxgynut | Dancing With The Stars | 2027-03-27 | San Jose | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-san-diego-vvg1iz_kxrbyxe | Dancing With The Stars | 2027-03-31 | San Diego | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-anaheim-vv170z_kgkbh3n6- | Dancing With The Stars | 2027-04-01 | Anaheim | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-los-angeles-g5eyz_fk9yzip | Dancing With The Stars | 2027-04-02 | Los Angeles | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-phoenix-1av0z_kgkb3yfyn | Dancing With The Stars | 2027-04-04 | Phoenix | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-mobile-g5viz_f1cm1bo | Dancing With The Stars | 2027-04-07 | Mobile | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-greenville-g5evz_kdpl_8w | Dancing With The Stars | 2027-04-08 | Greenville | no_candidates_returned | - |
| tm-dancing-with-the-stars-2027-raleigh-g5evz_f60r-5g | Dancing With The Stars | 2027-04-09 | Raleigh | no_candidates_returned | - |

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

Generated: 2026-10-08T17:42:06.560Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 2754
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2222
- Events already carrying a valid SeatGeek URL: 718
- Enrichment-eligible events already carrying a valid SeatGeek URL: 481
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1741
- Eligible (upcoming, resolvable local date) after pre-API filtering: 38
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 3 of 4 (key 20734)
- Runs needed to check every eligible event once: 4
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 10
- Events skipped: 0
- no_candidates_returned: 0
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-def-leppard-2027-atlanta-vvg1zz_fpttjci
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'def-leppard' --max-api-calls 50 --resume-from 'tm-def-leppard-2027-atlanta-vvg1zz_fpttjci'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 718 event(s) already carried valid SeatGeek URLs before this run, including 481 enrichment-eligible event(s).
- This run queried only the 1741 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-def-leppard-2027-sacramento-g5vyz_f5hdkto | Def Leppard | 2027-05-07 | Sacramento | https://seatgeek.com/def-leppard-tickets/sacramento-california-golden-1-center-2027-05-07-7-pm/concert/18662420 |
| tm-def-leppard-2027-seattle-vvg1hz_f1kfpyl | Def Leppard | 2027-05-09 | Seattle | https://seatgeek.com/def-leppard-tickets/seattle-washington-climate-pledge-arena-2027-05-09-7-pm/concert/18662421 |
| tm-def-leppard-2027-vancouver-1aozk4agkddzaes | Def Leppard | 2027-05-14 | Vancouver | https://seatgeek.com/def-leppard-tickets/vancouver-canada-rogers-arena-2027-05-14-7-pm/concert/18662462 |
| tm-def-leppard-2027-edmonton-1k78vpoiga55fiz | Def Leppard | 2027-05-16 | Edmonton | https://seatgeek.com/def-leppard-tickets/edmonton-canada-rogers-place-2027-05-16-7-pm/concert/18662464 |
| tm-def-leppard-2027-san-antonio-g5diz_fqmcwez | Def Leppard | 2027-05-29 | San Antonio | https://seatgeek.com/def-leppard-tickets/san-antonio-texas-frost-bank-center-2027-05-29-7-pm/concert/18662426 |
| tm-def-leppard-2027-oklahoma-city-vvg1yz_fkymbmf | Def Leppard | 2027-06-03 | Oklahoma City | https://seatgeek.com/def-leppard-tickets/oklahoma-city-oklahoma-paycom-center-2027-06-03-7-pm/concert/18662428 |
| tm-def-leppard-2027-milwaukee-vv1a6zk4kgkd_k6yp | Def Leppard | 2027-06-05 | Milwaukee | https://seatgeek.com/def-leppard-tickets/milwaukee-wisconsin-fiserv-forum-2027-06-05-7-pm/concert/18662432 |
| tm-def-leppard-2027-saint-louis-vv1kvovp8tga1iyft | Def Leppard | 2027-06-07 | Saint Louis | https://seatgeek.com/def-leppard-tickets/saint-louis-missouri-enterprise-center-2027-06-07-7-pm/concert/18662434 |
| tm-def-leppard-2027-louisville-1kaovpoiga1ispc | Def Leppard | 2027-06-09 | Louisville | https://seatgeek.com/def-leppard-tickets/louisville-kentucky-kfc-yum-center-2027-06-09-7-pm/concert/18662436 |
| tm-def-leppard-2027-tampa-vvg1vz_fpw01di | Def Leppard | 2027-06-13 | Tampa | https://seatgeek.com/def-leppard-tickets/tampa-florida-benchmark-international-arena-2027-06-13-7-pm/concert/18662437 |

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

Generated: 2026-10-08T17:43:07.125Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 2774
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2237
- Events already carrying a valid SeatGeek URL: 728
- Enrichment-eligible events already carrying a valid SeatGeek URL: 491
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1746
- Eligible (upcoming, resolvable local date) after pre-API filtering: 15
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20734)
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
- Next resume showId: tm-jay-wheeler-2027-denver-g5vzz_f20_jhu
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'jay-wheeler' --max-api-calls 50 --resume-from 'tm-jay-wheeler-2027-denver-g5vzz_f20_jhu'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 728 event(s) already carried valid SeatGeek URLs before this run, including 491 enrichment-eligible event(s).
- This run queried only the 1746 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-jay-wheeler-2027-miami-vvg1vz_f7_l-6l | Jay Wheeler | 2027-03-11 | Miami | https://seatgeek.com/jay-wheeler-tickets/miami-florida-kaseya-center-2027-03-11-8-pm/concert/18649595 |
| tm-jay-wheeler-2027-atlanta-vvg1zz_f288dbv | Jay Wheeler | 2027-03-12 | Atlanta | https://seatgeek.com/jay-wheeler-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-03-12-8-pm/concert/18649596 |
| tm-jay-wheeler-2027-charlotte-g5evz_f75dxcp | Jay Wheeler | 2027-03-14 | Charlotte | https://seatgeek.com/jay-wheeler-tickets/charlotte-north-carolina-ovens-auditorium-2027-03-14-8-pm/concert/18649599 |
| tm-jay-wheeler-2027-washington-1a4zk4egkd30m3a | Jay Wheeler | 2027-03-18 | Washington | https://seatgeek.com/jay-wheeler-tickets/washington-district-of-columbia-dar-constitution-hall-2027-03-18-8-pm/concert/18649600 |
| tm-jay-wheeler-2027-atlantic-city-vv1aezk4vgkduqubi | Jay Wheeler | 2027-03-19 | Atlantic City | https://seatgeek.com/jay-wheeler-tickets/atlantic-city-new-jersey-hard-rock-live-at-etess-arena-2027-03-19-8-pm/concert/18649597 |
| tm-jay-wheeler-2027-mashantucket-g5vvz_fp_melk | Jay Wheeler | 2027-03-20 | Mashantucket | https://seatgeek.com/jay-wheeler-tickets/mashantucket-connecticut-premier-theater-at-foxwoods-resort-casino-2027-03-20-8-pm/concert/18649598 |
| tm-jay-wheeler-2027-brooklyn-1ayzk4vgkebxenn | Jay Wheeler | 2027-03-24 | Brooklyn | https://seatgeek.com/jay-wheeler-tickets/brooklyn-new-york-barclays-center-2027-03-24-8-pm/concert/18649607 |
| tm-jay-wheeler-2027-reading-vv17fz_kgkblt_5x | Jay Wheeler | 2027-03-25 | Reading | https://seatgeek.com/jay-wheeler-tickets/reading-pennsylvania-santander-arena-2027-03-25-8-pm/concert/18649606 |
| tm-jay-wheeler-2027-boston-vv1avzk4agkejxnem | Jay Wheeler | 2027-03-27 | Boston | https://seatgeek.com/jay-wheeler-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-03-27-8-pm/concert/18649625 |
| tm-jay-wheeler-2027-rosemont-vv178z_kgkbjdkxl | Jay Wheeler | 2027-04-02 | Rosemont | https://seatgeek.com/jay-wheeler-tickets/rosemont-illinois-rosemont-theatre-2027-04-02-8-pm/concert/18649608 |

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

Generated: 2026-10-08T17:45:09.064Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 2822
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2277
- Events already carrying a valid SeatGeek URL: 732
- Enrichment-eligible events already carrying a valid SeatGeek URL: 495
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1782
- Eligible (upcoming, resolvable local date) after pre-API filtering: 26
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 2 of 3 (key 20734)
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
- Next resume showId: tm-leon-bridges-2027-rogers-g5viz_kpps1qm
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'leon-bridges' --max-api-calls 50 --resume-from 'tm-leon-bridges-2027-rogers-g5viz_kpps1qm'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 10

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 732 event(s) already carried valid SeatGeek URLs before this run, including 495 enrichment-eligible event(s).
- This run queried only the 1782 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-leon-bridges-2027-bend-vvg1hz_ks7yjc4 | Leon Bridges | 2027-08-12 | Bend | no_candidates_returned | - |
| tm-leon-bridges-2027-seattle-vvg1hz_fqtqa-a | Leon Bridges | 2027-08-13 | Seattle | no_candidates_returned | - |
| tm-leon-bridges-2027-edmonton-1aozkfigkdr2_nl | Leon Bridges | 2027-08-17 | Edmonton | no_candidates_returned | - |
| tm-leon-bridges-2027-calgary-1aozkfygkeskgd1 | Leon Bridges | 2027-08-18 | Calgary | no_candidates_returned | - |
| tm-leon-bridges-2027-calgary-1aozkfygkesvjka | Leon Bridges | 2027-08-19 | Calgary | no_candidates_returned | - |
| tm-leon-bridges-2027-bonner-g5vzz_fhjrcg3 | Leon Bridges | 2027-08-21 | Bonner | no_candidates_returned | - |
| tm-leon-bridges-2027-waukee-1a-zkfzgkd1bnt9 | Leon Bridges | 2027-08-25 | Waukee | no_candidates_returned | - |
| tm-leon-bridges-2027-indianapolis-vv17fz_kgkupdufu | Leon Bridges | 2027-08-26 | Indianapolis | no_candidates_returned | - |
| tm-leon-bridges-2027-milwaukee-vv17jz_kgkbyybma | Leon Bridges | 2027-09-15 | Milwaukee | no_candidates_returned | - |
| tm-leon-bridges-2027-minneapolis-vv1fbz_fb9zezd8da | Leon Bridges | 2027-09-17 | Minneapolis | no_candidates_returned | - |

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

Generated: 2026-10-08T17:44:07.782Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 2795
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 2251
- Events already carrying a valid SeatGeek URL: 732
- Enrichment-eligible events already carrying a valid SeatGeek URL: 495
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1756
- Eligible (upcoming, resolvable local date) after pre-API filtering: 14
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20734)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 4
- Events skipped: 6
- no_candidates_returned: 6
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-rod-stewart-2027-manchester-1amzkfugkesbky7
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'rod-stewart' --max-api-calls 50 --resume-from 'tm-rod-stewart-2027-manchester-1amzkfugkesbky7'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 6

## Interpretation

- `URLs added: 4` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 732 event(s) already carried valid SeatGeek URLs before this run, including 495 enrichment-eligible event(s).
- This run queried only the 1756 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-rod-stewart-2027-reading-vv17fz_kgks7life | Rod Stewart | 2027-03-02 | Reading | https://seatgeek.com/rod-stewart-tickets/reading-pennsylvania-santander-arena-2027-03-02-7-30-pm/concert/18652809 |
| tm-rod-stewart-2027-savannah-vvg1zz_kexgebo | Rod Stewart | 2027-03-08 | Savannah | https://seatgeek.com/rod-stewart-tickets/savannah-georgia-enmarket-arena-2027-03-08-8-pm/concert/18611010 |
| tm-rod-stewart-2027-biloxi-g5viz_kjgqiyx | Rod Stewart | 2027-03-10 | Biloxi | https://seatgeek.com/rod-stewart-tickets/biloxi-mississippi-mississippi-coast-coliseum-2027-03-10-7-30-pm/concert/18626760 |
| tm-rod-stewart-2027-hollywood-vvg1vz_3j9ejp4 | Rod Stewart | 2027-03-12 | Hollywood | https://seatgeek.com/rod-stewart-tickets/hollywood-florida-hard-rock-live-hollywood-2027-03-12-8-pm/concert/18591364 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-rod-stewart-2027-dublin-1abzkfygkdqi3oq | Rod Stewart | 2027-04-23 | Dublin | no_candidates_returned | - |
| tm-rod-stewart-2027-dublin-1avoz_kgkw68xnf | Rod Stewart | 2027-04-24 | Dublin | no_candidates_returned | - |
| tm-rod-stewart-2027-belfast-1azzkfygkdgr3ds | Rod Stewart | 2027-04-27 | Belfast | no_candidates_returned | - |
| tm-rod-stewart-2027-glasgow-1auzkfmgkdmgbjs | Rod Stewart | 2027-04-29 | Glasgow | no_candidates_returned | - |
| tm-rod-stewart-2027-glasgow-1auzkfygkdhvxxd | Rod Stewart | 2027-05-01 | Glasgow | no_candidates_returned | - |
| tm-rod-stewart-2027-birmingham-1kfyvpcfga2dzlv | Rod Stewart | 2027-05-04 | Birmingham | no_candidates_returned | - |

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
