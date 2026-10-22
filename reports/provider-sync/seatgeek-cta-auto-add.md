# SeatGeek CTA auto-add log

Generated: 2026-10-22T15:50:10.140Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3952
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3098
- Events already carrying a valid SeatGeek URL: 1960
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1487
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1611
- Eligible (upcoming, resolvable local date) after pre-API filtering: 3
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20748)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 3
- Events checked by this run: 3
- API calls made: 15
- Rate-limit responses: 0
- URLs added: 3
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

- `URLs added: 3` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1960 event(s) already carried valid SeatGeek URLs before this run, including 1487 enrichment-eligible event(s).
- This run queried only the 1611 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-chayanne-2026-miami-vvg1vz_kt0yodw | Chayanne | 2026-10-24 | Miami | https://seatgeek.com/chayanne-tickets/miami-florida-kaseya-center-2026-10-24-8-pm/concert/18192110 |
| tm-chayanne-2026-tampa-vvg1vz_km8pku0 | Chayanne | 2026-10-30 | Tampa | https://seatgeek.com/chayanne-tickets/tampa-florida-benchmark-international-arena-2026-10-30-8-pm/concert/18192114 |
| tm-chayanne-2026-orlando-1aefz_kgkwoqkla | Chayanne | 2026-10-31 | Orlando | https://seatgeek.com/chayanne-tickets/orlando-florida-kia-center-2026-10-31-8-pm/concert/18192116 |

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

Generated: 2026-10-22T15:46:30.444Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3905
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3059
- Events already carrying a valid SeatGeek URL: 1928
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1455
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1604
- Eligible (upcoming, resolvable local date) after pre-API filtering: 9
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20748)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 9
- Events checked by this run: 9
- API calls made: 45
- Rate-limit responses: 0
- URLs added: 9
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

- `URLs added: 9` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1928 event(s) already carried valid SeatGeek URLs before this run, including 1455 enrichment-eligible event(s).
- This run queried only the 1604 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-los-tigres-del-norte-2026-glendale-1fk8v0p7atz785ae | Los Tigres del Norte | 2026-10-24 | Glendale | https://seatgeek.com/los-tigres-del-norte-tickets/glendale-arizona-desert-diamond-arena-2026-10-24-8-pm/concert/18092538 |
| tm-los-tigres-del-norte-2026-palm-desert-vvg1iz_axk_2p- | Los Tigres del Norte | 2026-11-13 | Palm Desert | https://seatgeek.com/los-tigres-del-norte-tickets/thousand-palms-california-acrisure-arena-2026-11-13-8-pm/concert/18093245 |
| tm-los-tigres-del-norte-2026-detroit-vv1kezv0jiga2jpfm | Los Tigres del Norte | 2026-11-21 | Detroit | https://seatgeek.com/los-tigres-del-norte-tickets/detroit-michigan-fox-theatre-detroit-2026-11-21-8-pm/concert/18138848 |
| tm-los-tigres-del-norte-2026-baltimore-164zko9e6zackudg | Los Tigres del Norte | 2026-11-27 | Baltimore | https://seatgeek.com/los-tigres-del-norte-tickets/baltimore-maryland-cfg-bank-arena-2026-11-27-8-pm/concert/18092532 |
| tm-los-tigres-del-norte-2026-belmont-park-1kgzv0pfgagsn5l | Los Tigres del Norte | 2026-11-28 | Belmont Park | https://seatgeek.com/los-tigres-del-norte-tickets/elmont-new-york-ubs-arena-2026-11-28-8-pm/concert/18093247 |
| tm-los-tigres-del-norte-2026-nashville-g5viz_an5hweq | Los Tigres del Norte | 2026-12-04 | Nashville | https://seatgeek.com/los-tigres-del-norte-tickets/nashville-tennessee-bridgestone-arena-2026-12-04-8-pm/concert/18092545 |
| tm-los-tigres-del-norte-2026-birmingham-1aozkobgkdkxmhh | Los Tigres del Norte | 2026-12-05 | Birmingham | https://seatgeek.com/los-tigres-del-norte-tickets/birmingham-alabama-bjcc-concert-hall-2026-12-05-8-pm/concert/18092802 |
| tm-los-tigres-del-norte-2027-san-jose-g5vyz_k6cidvv | Los Tigres del Norte | 2027-02-20 | San Jose | https://seatgeek.com/los-tigres-del-norte-tickets/san-jose-california-sap-center-at-san-jose-2027-02-20-8-pm/concert/18612557 |
| tm-los-tigres-del-norte-2027-temecula-vvg1iz_km0aey4 | Los Tigres del Norte | 2027-03-13 | Temecula | https://seatgeek.com/los-tigres-del-norte-tickets/temecula-california-pechanga-resort-casino-2027-03-13-8-pm/concert/18652912 |

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

Generated: 2026-10-22T15:49:47.557Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3949
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3095
- Events already carrying a valid SeatGeek URL: 1957
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1484
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1611
- Eligible (upcoming, resolvable local date) after pre-API filtering: 17
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20748)
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
- Next resume showId: tm-sleeping-with-sirens-2027-bristol-17u8v0g6gfkrxfj
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'sleeping-with-sirens' --max-api-calls 50 --resume-from 'tm-sleeping-with-sirens-2027-bristol-17u8v0g6gfkrxfj'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons


## Interpretation

- `URLs added: 10` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1957 event(s) already carried valid SeatGeek URLs before this run, including 1484 enrichment-eligible event(s).
- This run queried only the 1611 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-sleeping-with-sirens-2026-grand-rapids-vvg1oz_gxwrjxj | Sleeping With Sirens | 2026-10-24 | Grand Rapids | https://seatgeek.com/sleeping-with-sirens-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2026-10-24-6-pm/concert/18312165 |
| tm-sleeping-with-sirens-2026-chicago-vvg18z_gr6ix5f | Sleeping With Sirens | 2026-10-25 | Chicago | https://seatgeek.com/sleeping-with-sirens-tickets/chicago-illinois-the-salt-shed-indoors-2026-10-25-7-pm/concert/18312229 |
| tm-sleeping-with-sirens-2026-montreal-17g8v0g6gxey070 | Sleeping With Sirens | 2026-10-30 | Montreal | https://seatgeek.com/sleeping-with-sirens-tickets/montreal-canada-mtelus-2026-10-30-7-pm/concert/18311678 |
| tm-sleeping-with-sirens-2026-ottawa-17g8v0g6gwupswm | Sleeping With Sirens | 2026-10-31 | Ottawa | https://seatgeek.com/sleeping-with-sirens-tickets/ottawa-canada-history-ottawa-2026-10-31-6-pm/concert/18312283 |
| tm-sleeping-with-sirens-2026-toronto-177zv0g6gwdvb1r | Sleeping With Sirens | 2026-11-01 | Toronto | https://seatgeek.com/sleeping-with-sirens-tickets/toronto-canada-history-2026-11-01-6-pm/concert/18312214 |
| tm-sleeping-with-sirens-2026-boston-vvg17z_gmbz9_j | Sleeping With Sirens | 2026-11-03 | Boston | https://seatgeek.com/sleeping-with-sirens-tickets/boston-massachusetts-citizens-house-of-blues-boston-2026-11-03-7-pm/concert/18311622 |
| tm-sleeping-with-sirens-2026-philadelphia-vvg1fz_gm9cqxe | Sleeping With Sirens | 2026-11-06 | Philadelphia | https://seatgeek.com/sleeping-with-sirens-tickets/philadelphia-pennsylvania-the-fillmore-philadelphia-2026-11-06-7-pm/concert/18312116 |
| tm-sleeping-with-sirens-2026-new-york-k7vgf_gnebmkt | Sleeping With Sirens | 2026-11-07 | New York | https://seatgeek.com/sleeping-with-sirens-tickets/new-york-new-york-manhattan-center-hammerstein-ballroom-2026-11-07-7-pm/concert/18311638 |
| tm-sleeping-with-sirens-2026-baltimore-17a8v0g6gxtb5eg | Sleeping With Sirens | 2026-11-08 | Baltimore | https://seatgeek.com/sleeping-with-sirens-tickets/baltimore-maryland-nevermore-hall-2026-11-08-7-pm/concert/18312278 |
| tm-sleeping-with-sirens-2026-charlotte-g5evz_gnuzybg | Sleeping With Sirens | 2026-11-11 | Charlotte | https://seatgeek.com/sleeping-with-sirens-tickets/charlotte-north-carolina-the-fillmore-charlotte-2026-11-11-7-pm/concert/18311702 |

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

Generated: 2026-10-22T15:47:17.714Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3912
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3066
- Events already carrying a valid SeatGeek URL: 1935
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1462
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1604
- Eligible (upcoming, resolvable local date) after pre-API filtering: 7
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20748)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 7
- Events checked by this run: 7
- API calls made: 35
- Rate-limit responses: 0
- URLs added: 7
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

- `URLs added: 7` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1935 event(s) already carried valid SeatGeek URLs before this run, including 1462 enrichment-eligible event(s).
- This run queried only the 1604 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-the-chicks-2026-seattle-vvg1hz_52nooej | The Chicks | 2026-10-25 | Seattle | https://seatgeek.com/the-chicks-tickets/seattle-washington-benaroya-hall-2026-10-25-8-30-pm/concert/18268866 |
| tm-the-chicks-2026-seattle-vvg1hz_52n3-el | The Chicks | 2026-10-26 | Seattle | https://seatgeek.com/the-chicks-tickets/seattle-washington-benaroya-hall-2026-10-26-8-30-pm/concert/18268868 |
| tm-the-chicks-2026-san-francisco-g5vyz_5k9t5fo | The Chicks | 2026-10-29 | San Francisco | https://seatgeek.com/the-chicks-tickets/san-francisco-california-the-masonic-san-francisco-2026-10-29-8-30-pm/concert/18268871 |
| tm-the-chicks-2026-san-francisco-g5vyz_5kbz5fl | The Chicks | 2026-10-30 | San Francisco | https://seatgeek.com/the-chicks-tickets/san-francisco-california-the-masonic-san-francisco-2026-10-30-8-30-pm/concert/18268873 |
| tm-the-chicks-2026-hollywood-vvg10z_5ljdml9 | The Chicks | 2026-11-01 | Hollywood | https://seatgeek.com/the-chicks-tickets/hollywood-california-dolby-theatre-2026-11-01-8-30-pm/concert/18268872 |
| tm-the-chicks-2026-hollywood-vvg10z_5ra8fba | The Chicks | 2026-11-02 | Hollywood | https://seatgeek.com/the-chicks-tickets/hollywood-california-dolby-theatre-2026-11-02-8-30-pm/concert/18268878 |
| tm-the-chicks-2026-hollywood-vvg10z_5rao7bc | The Chicks | 2026-11-03 | Hollywood | https://seatgeek.com/the-chicks-tickets/hollywood-california-dolby-theatre-2026-11-03-8-30-pm/concert/18469965 |

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

Generated: 2026-10-22T15:48:04.369Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3920
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3073
- Events already carrying a valid SeatGeek URL: 1942
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1469
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1604
- Eligible (upcoming, resolvable local date) after pre-API filtering: 7
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20748)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 7
- Events checked by this run: 7
- API calls made: 35
- Rate-limit responses: 0
- URLs added: 7
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

- `URLs added: 7` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 1942 event(s) already carried valid SeatGeek URLs before this run, including 1469 enrichment-eligible event(s).
- This run queried only the 1604 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-young-miko-2026-san-antonio-g5diz_f5slxer | Young Miko | 2026-10-22 | San Antonio | https://seatgeek.com/young-miko-tickets/san-antonio-texas-freeman-coliseum-2026-10-22-8-pm/concert/18163833 |
| tm-young-miko-2026-miami-vvg1vz_fchiqhv | Young Miko | 2026-10-28 | Miami | https://seatgeek.com/young-miko-tickets/miami-florida-kaseya-center-2026-10-28-8-pm/concert/18163843 |
| tm-young-miko-2026-orlando-1axzk3dgkeha7uv | Young Miko | 2026-10-29 | Orlando | https://seatgeek.com/young-miko-tickets/orlando-florida-kia-center-2026-10-29-8-pm/concert/18163844 |
| tm-young-miko-2026-atlanta-vvg1zz_f1gfmts | Young Miko | 2026-10-31 | Atlanta | https://seatgeek.com/young-miko-tickets/atlanta-georgia-state-farm-arena-1-2026-10-31-8-pm/concert/18163846 |
| tm-young-miko-2026-charlotte-g5evz_fffmq2n | Young Miko | 2026-11-01 | Charlotte | https://seatgeek.com/young-miko-tickets/charlotte-north-carolina-spectrum-center-charlotte-2026-11-01-8-pm/concert/18163847 |
| tm-young-miko-2026-philadelphia-1ayzk3egkdcdzmm | Young Miko | 2026-11-04 | Philadelphia | https://seatgeek.com/young-miko-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-11-04-8-pm/concert/18163848 |
| tm-young-miko-2026-brooklyn-16dzz_f13g7dsys | Young Miko | 2026-11-05 | Brooklyn | https://seatgeek.com/young-miko-tickets/brooklyn-new-york-barclays-center-2026-11-05-8-pm/concert/18163830 |

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

Generated: 2026-10-22T15:48:40.756Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 3928
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 3078
- Events already carrying a valid SeatGeek URL: 1947
- Enrichment-eligible events already carrying a valid SeatGeek URL: 1474
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 1604
- Eligible (upcoming, resolvable local date) after pre-API filtering: 5
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20748)
- Runs needed to check every eligible event once: 1
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
- 1947 event(s) already carried valid SeatGeek URLs before this run, including 1474 enrichment-eligible event(s).
- This run queried only the 1604 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-zac-brown-band-2026-buffalo-k7vgf_dh65dyo | Zac Brown Band | 2026-11-05 | Buffalo | https://seatgeek.com/zac-brown-band-tickets/buffalo-new-york-keybank-center-2026-11-05-7-pm/concert/18032029 |
| tm-zac-brown-band-2026-detroit-vv1afzk8vgkdi6e86 | Zac Brown Band | 2026-11-06 | Detroit | https://seatgeek.com/zac-brown-band-tickets/detroit-michigan-little-caesars-arena-2026-11-06-7-pm/concert/18032030 |
| tm-zac-brown-band-2026-lincoln-vv16kzk8wakzacfeeu | Zac Brown Band | 2026-11-19 | Lincoln | https://seatgeek.com/zac-brown-band-tickets/lincoln-nebraska-pinnacle-bank-arena-2026-11-19-7-pm/concert/18032031 |
| tm-zac-brown-band-2026-rosemont-vv1a7zk8sgkdldbon | Zac Brown Band | 2026-11-21 | Rosemont | https://seatgeek.com/zac-brown-band-tickets/rosemont-illinois-allstate-arena-2026-11-21-7-pm/concert/18032037 |
| tm-zac-brown-band-2027-milwaukee-vv1a6zkf0gkdpf9tr | Zac Brown Band | 2027-06-25 | Milwaukee | https://seatgeek.com/zac-brown-band-tickets/milwaukee-wisconsin-american-family-insurance-amphitheater-summerfest-grounds-2027-06-25-7-pm/concert/18571701 |

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
