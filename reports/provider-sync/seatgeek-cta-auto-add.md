# SeatGeek CTA auto-add log

Generated: 2026-10-30T17:00:05.248Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4709
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4709
- Events already carrying a valid SeatGeek URL: 2590
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2590
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2119
- Eligible (upcoming, resolvable local date) after pre-API filtering: 29
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 3 of 3 (key 20756)
- Runs needed to check every eligible event once: 3
- Events selected/logged by this run: 9
- Events checked by this run: 9
- API calls made: 45
- Rate-limit responses: 0
- URLs added: 8
- Events skipped: 1
- no_candidates_returned: 1
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 1
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 1

## Interpretation

- `URLs added: 8` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2590 event(s) already carried valid SeatGeek URLs before this run, including 2590 enrichment-eligible event(s).
- This run queried only the 2119 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-air-supply-2027-dawson-creek-z7r9jz1aavmfk | Air Supply | 2027-02-22 | Dawson Creek | https://seatgeek.com/air-supply-tickets/dawson-creek-canada-ovintiv-events-centre-2027-02-22-7-30-pm/concert/18646928 |
| tm-air-supply-2027-calgary-1aozkf0gkev7qvg | Air Supply | 2027-02-24 | Calgary | https://seatgeek.com/air-supply-tickets/calgary-canada-grey-eagle-event-centre-2027-02-24-7-pm/concert/18594382 |
| tm-air-supply-2027-winnipeg-1aozkftgkdfjy5c | Air Supply | 2027-02-28 | Winnipeg | https://seatgeek.com/air-supply-tickets/winnipeg-canada-canada-life-centre-2027-02-28-7-30-pm/concert/18593527 |
| tm-air-supply-2027-ottawa-1ad7z_3gksa1dub | Air Supply | 2027-03-03 | Ottawa | https://seatgeek.com/air-supply-tickets/ottawa-canada-hard-rock-hotel-and-casino-ottawa-2027-03-03-7-pm/concert/18594799 |
| tm-air-supply-2027-rama-1avzz_3gkn3a6sv | Air Supply | 2027-03-05 | Rama | https://seatgeek.com/air-supply-tickets/rama-canada-casino-rama-resort-2027-03-05-9-pm/concert/18618284 |
| tm-air-supply-2027-toronto-1avzz_3gkws1scj | Air Supply | 2027-03-06 | Toronto | https://seatgeek.com/air-supply-tickets/toronto-canada-the-theatre-at-great-canadian-casino-resort-toronto-2027-03-06-8-pm/concert/18594770 |
| tm-air-supply-2027-windsor-1avzz_3gki_rnez | Air Supply | 2027-03-07 | Windsor | https://seatgeek.com/air-supply-tickets/windsor-canada-the-colosseum-at-caesars-windsor-2027-03-07-7-pm/concert/18593816 |
| tm-air-supply-2027-saint-louis-vv1akzkftgkdvwrkv | Air Supply | 2027-05-23 | Saint Louis | https://seatgeek.com/air-supply-tickets/saint-louis-missouri-river-city-casino-2027-05-23-7-pm/concert/18653998 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-air-supply-2027-moose-jaw-z7r9jz1aavsx4 | Air Supply | 2027-02-26 | Moose Jaw | no_candidates_returned | - |

## Accepted venue mismatches

| showId | TTC venue | SeatGeek venue | URL |
| --- | --- | --- | --- |
| tm-air-supply-2027-ottawa-1ad7z_3gksa1dub | Hard Rock Hotel & Casino Ottawa | Hard Rock Cafe | https://seatgeek.com/air-supply-tickets/ottawa-canada-hard-rock-hotel-and-casino-ottawa-2027-03-03-7-pm/concert/18594799 |

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

Generated: 2026-10-30T16:56:00.772Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4605
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4605
- Events already carrying a valid SeatGeek URL: 2573
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2573
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2032
- Eligible (upcoming, resolvable local date) after pre-API filtering: 6
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20756)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 6
- Events checked by this run: 6
- API calls made: 30
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 6
- no_candidates_returned: 6
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 6

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2573 event(s) already carried valid SeatGeek URLs before this run, including 2573 enrichment-eligible event(s).
- This run queried only the 2032 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-bullet-for-my-valentine-2027-praha-9-z698xzu0z1kbijs_f | Bullet For My Valentine | 2027-02-16 | Praha 9 | no_candidates_returned | - |
| tm-bullet-for-my-valentine-2027-forest-brussels-z698xzg2z1ku8c37e | Bullet For My Valentine | 2027-02-20 | Forest (Brussels) | no_candidates_returned | - |
| tm-bullet-for-my-valentine-2027-glasgow-1kuovpuoga5adth | Bullet For My Valentine | 2027-02-23 | Glasgow | no_candidates_returned | - |
| tm-bullet-for-my-valentine-2027-birmingham-1anzkfggkel7zmz | Bullet For My Valentine | 2027-02-25 | Birmingham | no_candidates_returned | - |
| tm-bullet-for-my-valentine-2027-london-16dfz_kqeg7loo3 | Bullet For My Valentine | 2027-02-26 | London | no_candidates_returned | - |
| tm-bullet-for-my-valentine-2027-manchester-g5vhz_kd3nkoq | Bullet For My Valentine | 2027-02-27 | Manchester | no_candidates_returned | - |

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

Generated: 2026-10-30T17:01:09.091Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4729
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4729
- Events already carrying a valid SeatGeek URL: 2596
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2596
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2133
- Eligible (upcoming, resolvable local date) after pre-API filtering: 20
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20756)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 6
- Events skipped: 4
- no_candidates_returned: 3
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-foreigner-2027-las-vegas-1avjz_kgkursnk_
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'foreigner' --max-api-calls 50 --resume-from 'tm-foreigner-2027-las-vegas-1avjz_kgkursnk_'
- Accepted venue mismatches: 1
- Conflicts found: 1

## Skipped reasons

- conflicting_same_date_city_candidates: 1
- no_candidates_returned: 3

## Interpretation

- `URLs added: 6` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2596 event(s) already carried valid SeatGeek URLs before this run, including 2596 enrichment-eligible event(s).
- This run queried only the 2133 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-foreigner-2026-lincoln-g5vyz_66kfcgc | Foreigner | 2026-10-30 | Lincoln | https://seatgeek.com/foreigner-tickets/lincoln-california-the-venue-at-thunder-valley-casino-resort-2026-10-30-7-pm/concert/18166570 |
| tm-foreigner-2027-daytona-beach-z7r9jz1aaedca | Foreigner | 2027-02-15 | Daytona Beach | https://seatgeek.com/foreigner-tickets/daytona-beach-florida-peabody-auditorium-2027-02-15-8-pm/concert/18617000 |
| tm-foreigner-2027-pompano-beach-z7r9jz1aav6fn | Foreigner | 2027-02-19 | Pompano Beach | https://seatgeek.com/foreigner-tickets/pompano-beach-florida-pompano-beach-amphitheater-2027-02-19-8-pm/concert/18570609 |
| tm-foreigner-2027-las-vegas-1avjz_kgkurynka | Foreigner | 2027-03-10 | Las Vegas | https://seatgeek.com/foreigner-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2027-03-10-8-pm/concert/18723998 |
| tm-foreigner-2027-las-vegas-1avjz_kgkursnk8 | Foreigner | 2027-03-12 | Las Vegas | https://seatgeek.com/foreigner-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2027-03-12-8-pm/concert/18723999 |
| tm-foreigner-2027-las-vegas-1avjz_kgkurwnkf | Foreigner | 2027-03-13 | Las Vegas | https://seatgeek.com/foreigner-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2027-03-13-8-pm/concert/18724000 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-foreigner-2026-reno-1kc8v0otgacbkaa | Foreigner | 2026-11-01 | Reno | conflicting_same_date_city_candidates | https://seatgeek.com/foreigner-tickets/reno-nevada-reno-ballroom-2026-11-01-7-pm/concert/18187656 |
| tm-foreigner-2027-monterrey-1av8zbygkudzz0k | Foreigner | 2027-02-27 | Monterrey | no_candidates_returned | - |
| tm-foreigner-2027-zapopan-1afzk3ogkd3htid | Foreigner | 2027-02-28 | Zapopan | no_candidates_returned | - |
| tm-foreigner-2027-ciudad-de-mexico-g5dvz_8xzavz- | Foreigner | 2027-03-03 | Ciudad de México | no_candidates_returned | - |

## Accepted venue mismatches

| showId | TTC venue | SeatGeek venue | URL |
| --- | --- | --- | --- |
| tm-foreigner-2027-daytona-beach-z7r9jz1aaedca | The Peabody Daytona Beach | Peabody Auditorium | https://seatgeek.com/foreigner-tickets/daytona-beach-florida-peabody-auditorium-2027-02-15-8-pm/concert/18617000 |

## Conflicts found

- tm-foreigner-2026-reno-1kc8v0otgacbkaa (Foreigner, 2026-11-01, Reno)
  - 100: https://seatgeek.com/foreigner-tickets/reno-nevada-reno-ballroom-2026-11-01-7-pm/concert/18165865

## Rate-limited / not checked

- None

## API/environment failures

- None

## Skipped before any API call

Enrichment-eligible events missing a SeatGeek URL that this run deliberately did not query. Past events can never gain a useful CTA; an unresolvable venue-local date would make the SeatGeek date filter search the wrong night, so it is never guessed.

- None
# SeatGeek CTA auto-add log

Generated: 2026-10-30T16:58:08.001Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4631
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4631
- Events already carrying a valid SeatGeek URL: 2573
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2573
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2058
- Eligible (upcoming, resolvable local date) after pre-API filtering: 0
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20756)
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
- 2573 event(s) already carried valid SeatGeek URLs before this run, including 2573 enrichment-eligible event(s).
- This run queried only the 2058 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
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

Generated: 2026-10-30T16:58:06.571Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4631
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4631
- Events already carrying a valid SeatGeek URL: 2573
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2573
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2058
- Eligible (upcoming, resolvable local date) after pre-API filtering: 10
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20756)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 0
- Events skipped: 10
- no_candidates_returned: 10
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 10

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2573 event(s) already carried valid SeatGeek URLs before this run, including 2573 enrichment-eligible event(s).
- This run queried only the 2058 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-hollywood-undead-2027-praha-9-z698xzu0z16vcf4gue | Hollywood Undead | 2027-02-05 | Praha 9 | no_candidates_returned | - |
| tm-hollywood-undead-2027-warsaw-z698xzqpz1kf0av8y | Hollywood Undead | 2027-02-08 | Warsaw | no_candidates_returned | - |
| tm-hollywood-undead-2027-johanneshov-z698xzq2z1kgnffx_ | Hollywood Undead | 2027-02-13 | Johanneshov | no_candidates_returned | - |
| tm-hollywood-undead-2027-goteborg-z698xzq2z1k_fbiog | Hollywood Undead | 2027-02-14 | Göteborg | no_candidates_returned | - |
| tm-hollywood-undead-2027-k-benhavn-v-z698xzc4z1k_44ijf | Hollywood Undead | 2027-02-17 | København V | no_candidates_returned | - |
| tm-hollywood-undead-2027-birmingham-g5dzz_k9em7do | Hollywood Undead | 2027-02-23 | Birmingham | no_candidates_returned | - |
| tm-hollywood-undead-2027-london-g5dzz_kxga-ng | Hollywood Undead | 2027-02-24 | London | no_candidates_returned | - |
| tm-hollywood-undead-2027-manchester-g5vhz_kjdvnwu | Hollywood Undead | 2027-02-26 | Manchester | no_candidates_returned | - |
| tm-hollywood-undead-2027-glasgow-g5dzz_kpssdt2 | Hollywood Undead | 2027-02-27 | Glasgow | no_candidates_returned | - |
| tm-hollywood-undead-2027-leeds-g5dzz_krmlxyq | Hollywood Undead | 2027-02-28 | Leeds | no_candidates_returned | - |

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

Generated: 2026-10-30T16:57:03.100Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4621
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4621
- Events already carrying a valid SeatGeek URL: 2573
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2573
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2048
- Eligible (upcoming, resolvable local date) after pre-API filtering: 16
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20756)
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
- Next resume showId: tm-jake-bugg-2027-london-g5vhz_olvuind
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'jake-bugg' --max-api-calls 50 --resume-from 'tm-jake-bugg-2027-london-g5vhz_olvuind'
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 10

## Interpretation

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2573 event(s) already carried valid SeatGeek URLs before this run, including 2573 enrichment-eligible event(s).
- This run queried only the 2048 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-jake-bugg-2027-manchester-g5vhz_owbzlwl | Jake Bugg | 2027-02-06 | Manchester | no_candidates_returned | - |
| tm-jake-bugg-2027-dublin-1kkzvpk9ga1efx9 | Jake Bugg | 2027-02-09 | Dublin | no_candidates_returned | - |
| tm-jake-bugg-2027-edinburgh-1auzkf-gkd9gf1d | Jake Bugg | 2027-02-11 | Edinburgh | no_candidates_returned | - |
| tm-jake-bugg-2027-glasgow-1auzkf-gkeivv0q | Jake Bugg | 2027-02-14 | Glasgow | no_candidates_returned | - |
| tm-jake-bugg-2027-gateshead-11uyvpf_qopzvc | Jake Bugg | 2027-02-17 | Gateshead | no_candidates_returned | - |
| tm-jake-bugg-2027-sheffield-1adfz_ogkmhb1lb | Jake Bugg | 2027-02-18 | Sheffield | no_candidates_returned | - |
| tm-jake-bugg-2027-liverpool-g5vhz_owwx56n | Jake Bugg | 2027-02-20 | Liverpool | no_candidates_returned | - |
| tm-jake-bugg-2027-bristol-1adjz_ogkvkgljy | Jake Bugg | 2027-02-21 | Bristol | no_candidates_returned | - |
| tm-jake-bugg-2027-nottingham-g5vhz_ohmndtt | Jake Bugg | 2027-02-23 | Nottingham | no_candidates_returned | - |
| tm-jake-bugg-2027-london-g5vhz_olkluto | Jake Bugg | 2027-02-25 | London | no_candidates_returned | - |

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

Generated: 2026-10-30T16:58:29.387Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4654
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4654
- Events already carrying a valid SeatGeek URL: 2576
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2576
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2078
- Eligible (upcoming, resolvable local date) after pre-API filtering: 23
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 3 of 3 (key 20756)
- Runs needed to check every eligible event once: 3
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
- 2576 event(s) already carried valid SeatGeek URLs before this run, including 2576 enrichment-eligible event(s).
- This run queried only the 2078 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-lord-huron-2027-los-angeles-vvg10z_2ug7bzu | Lord Huron | 2027-01-10 | Los Angeles | https://seatgeek.com/lord-huron-tickets/los-angeles-california-the-wiltern-2027-01-10-8-pm/concert/18421996 |
| tm-lord-huron-2027-los-angeles-vvg10z_2ugkfzf | Lord Huron | 2027-01-11 | Los Angeles | https://seatgeek.com/lord-huron-tickets/los-angeles-california-the-wiltern-2027-01-11-8-pm/concert/18421997 |
| tm-lord-huron-2027-los-angeles-vvg10z_2d_gilx | Lord Huron | 2027-01-12 | Los Angeles | https://seatgeek.com/lord-huron-tickets/los-angeles-california-the-wiltern-2027-01-12-6-30-pm/concert/18484690 |

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

Generated: 2026-10-30T16:59:08.155Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 4680
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 4680
- Events already carrying a valid SeatGeek URL: 2582
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2582
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2098
- Eligible (upcoming, resolvable local date) after pre-API filtering: 26
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 3 of 3 (key 20756)
- Runs needed to check every eligible event once: 3
- Events selected/logged by this run: 6
- Events checked by this run: 6
- API calls made: 30
- Rate-limit responses: 0
- URLs added: 6
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

- `URLs added: 6` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2582 event(s) already carried valid SeatGeek URLs before this run, including 2582 enrichment-eligible event(s).
- This run queried only the 2098 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-remi-wolf-2027-kansas-city-z7r9jz1aa7kjk | Remi Wolf | 2027-05-11 | Kansas City | https://seatgeek.com/remi-wolf-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-05-11-8-pm/concert/18664787 |
| tm-remi-wolf-2027-west-des-moines-z7r9jz1aa7aj7 | Remi Wolf | 2027-05-12 | West Des Moines | https://seatgeek.com/remi-wolf-tickets/west-des-moines-iowa-val-air-ballroom-2027-05-12-8-pm/concert/18664791 |
| tm-remi-wolf-2027-morrison-z7r9jz1aa7kap | Remi Wolf | 2027-05-16 | Morrison | https://seatgeek.com/remi-wolf-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-16-7-pm/concert/18664789 |
| tm-remi-wolf-2027-bonner-g5vzz_flaijvz | Remi Wolf | 2027-05-19 | Bonner | https://seatgeek.com/remi-wolf-tickets/bonner-montana-kettlehouse-amphitheater-2027-05-19-8-pm/concert/18664792 |
| tm-remi-wolf-2027-vancouver-z7r9jz1aa7kaf | Remi Wolf | 2027-05-21 | Vancouver | https://seatgeek.com/remi-wolf-tickets/vancouver-canada-pne-forum-vancouver-2027-05-21-8-pm/concert/18664793 |
| tm-remi-wolf-2027-seattle-vvg1hz_fqhwypl | Remi Wolf | 2027-05-22 | Seattle | https://seatgeek.com/remi-wolf-tickets/seattle-washington-wamu-theater-2027-05-22-8-pm/concert/18664798 |

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
