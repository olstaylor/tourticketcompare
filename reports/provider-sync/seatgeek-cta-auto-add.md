# SeatGeek CTA auto-add log

Generated: 2026-11-05T18:22:52.113Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5125
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5125
- Events already carrying a valid SeatGeek URL: 2780
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2780
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2345
- Eligible (upcoming, resolvable local date) after pre-API filtering: 0
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20762)
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
- 2780 event(s) already carried valid SeatGeek URLs before this run, including 2780 enrichment-eligible event(s).
- This run queried only the 2345 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
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

Generated: 2026-11-05T18:23:55.381Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5142
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5142
- Events already carrying a valid SeatGeek URL: 2787
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2787
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2355
- Eligible (upcoming, resolvable local date) after pre-API filtering: 17
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 2 (key 20762)
- Runs needed to check every eligible event once: 2
- Events selected/logged by this run: 10
- Events checked by this run: 10
- API calls made: 50
- Rate-limit responses: 0
- URLs added: 7
- Events skipped: 3
- no_candidates_returned: 2
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: tm-lenny-pearce-2026-richmond-z7r9jz1a7ptxv
- Next recommended resume command: node scripts/enrich-seatgeek-events.mjs --apply-high-confidence --artist 'lenny-pearce' --max-api-calls 50 --resume-from 'tm-lenny-pearce-2026-richmond-z7r9jz1a7ptxv'
- Accepted venue mismatches: 1
- Conflicts found: 0

## Skipped reasons

- city_or_metro_match_failed: 1
- no_candidates_returned: 2

## Interpretation

- `URLs added: 7` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2787 event(s) already carried valid SeatGeek URLs before this run, including 2787 enrichment-eligible event(s).
- This run queried only the 2355 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-lenny-pearce-2026-san-antonio-g5diz_gedaabt | Lenny Pearce | 2026-11-05 | San Antonio | https://seatgeek.com/lenny-pearce-tickets/san-antonio-texas-aztec-theatre-2026-11-05-6-pm/concert/18305062 |
| tm-lenny-pearce-2026-austin-g5diz_uux5j8i | Lenny Pearce | 2026-11-06 | Austin | https://seatgeek.com/lenny-pearce-tickets/austin-texas-stubb-s-waller-creek-amphitheater-2026-11-06-6-pm/concert/18305061 |
| tm-lenny-pearce-2026-irving-vvg1yz_g0p_mts | Lenny Pearce | 2026-11-07 | Irving | https://seatgeek.com/lenny-pearce-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2026-11-07-5-pm/concert/18305069 |
| tm-lenny-pearce-2026-houston-g5diz_geaxmd2 | Lenny Pearce | 2026-11-08 | Houston | https://seatgeek.com/lenny-pearce-tickets/houston-texas-bayou-music-center-2026-11-08-12-30-pm/concert/18305070 |
| tm-lenny-pearce-2026-orlando-17fov0g6g3w_f1c | Lenny Pearce | 2026-11-10 | Orlando | https://seatgeek.com/lenny-pearce-tickets/orlando-florida-hard-rock-live-orlando-2026-11-10-6-pm/concert/18305071 |
| tm-lenny-pearce-2026-fort-lauderdale-z7r9jz1a7ppo0 | Lenny Pearce | 2026-11-11 | Fort Lauderdale | https://seatgeek.com/lenny-pearce-tickets/fort-lauderdale-florida-ftl-war-memorial-auditorium-2026-11-11-6-pm/concert/18283469 |
| tm-lenny-pearce-2026-atlanta-z7r9jz1a7pnza | Lenny Pearce | 2026-11-14 | Atlanta | https://seatgeek.com/lenny-pearce-tickets/atlanta-georgia-the-eastern-atlanta-2026-11-14-12-30-pm/concert/18305101 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-lenny-pearce-2026-st-petersburg-vvg1vz_gcd9hph | Lenny Pearce | 2026-11-12 | St Petersburg | city_or_metro_match_failed | https://seatgeek.com/lenny-pearce-tickets/saint-petersburg-florida-duke-energy-center-for-the-arts-mahaffey-theater-2026-11-12-6-pm/concert/18305072 |
| tm-lenny-pearce-2026-nashville-z7r9jz1a7p0bp | Lenny Pearce | 2026-11-15 | Nashville | no_candidates_returned | - |
| tm-lenny-pearce-2026-norfolk-z7r9jz1a7ptxe | Lenny Pearce | 2026-11-17 | Norfolk | no_candidates_returned | - |

## Accepted venue mismatches

| showId | TTC venue | SeatGeek venue | URL |
| --- | --- | --- | --- |
| tm-lenny-pearce-2026-atlanta-z7r9jz1a7pnza | The Eastern-GA | The Eastern - Atlanta | https://seatgeek.com/lenny-pearce-tickets/atlanta-georgia-the-eastern-atlanta-2026-11-14-12-30-pm/concert/18305101 |

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

Generated: 2026-11-05T18:24:53.123Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5151
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5151
- Events already carrying a valid SeatGeek URL: 2794
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2794
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2357
- Eligible (upcoming, resolvable local date) after pre-API filtering: 9
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 1 of 1 (key 20762)
- Runs needed to check every eligible event once: 1
- Events selected/logged by this run: 9
- Events checked by this run: 9
- API calls made: 45
- Rate-limit responses: 0
- URLs added: 7
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

- `URLs added: 7` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2794 event(s) already carried valid SeatGeek URLs before this run, including 2794 enrichment-eligible event(s).
- This run queried only the 2357 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-los-tucanes-de-tijuana-2026-highland-z7r9jz1a7paao | Los Tucanes de Tijuana | 2026-11-24 | Highland | https://seatgeek.com/los-tucanes-de-tijuana-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2026-11-24-8-pm/concert/18288551 |
| tm-los-tucanes-de-tijuana-2026-fairfax-17a8v0g61bgdzeq | Los Tucanes de Tijuana | 2026-11-27 | Fairfax | https://seatgeek.com/los-tucanes-de-tijuana-tickets/fairfax-virginia-eaglebank-arena-2026-11-27-8-pm/concert/18251692 |
| tm-los-tucanes-de-tijuana-2026-elizabeth-k7vgf_1yuvjm8 | Los Tucanes de Tijuana | 2026-11-28 | Elizabeth | https://seatgeek.com/los-tucanes-de-tijuana-tickets/elizabeth-new-jersey-ritz-theatre-performing-arts-center-2026-11-28-8-pm/concert/18252126 |
| tm-los-tucanes-de-tijuana-2026-thackerville-z7r9jz1aaz9fb | Los Tucanes de Tijuana | 2026-12-04 | Thackerville | https://seatgeek.com/los-tucanes-de-tijuana-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2026-12-04-8-pm/concert/18398232 |
| tm-los-tucanes-de-tijuana-2027-glendale-17k8v0g62nuo9-m | Los Tucanes de Tijuana | 2027-02-12 | Glendale | https://seatgeek.com/los-tucanes-de-tijuana-tickets/glendale-arizona-desert-diamond-arena-2027-02-12-8-pm/concert/18405269 |
| tm-los-tucanes-de-tijuana-2027-inglewood-vvg10z_udzwaf3 | Los Tucanes de Tijuana | 2027-02-13 | Inglewood | https://seatgeek.com/los-tucanes-de-tijuana-tickets/inglewood-california-intuit-dome-2027-02-13-8-pm/concert/18354983 |
| tm-los-tucanes-de-tijuana-2027-rosemont-vv1a7zkffgkdqp4jc | Los Tucanes de Tijuana | 2027-02-20 | Rosemont | https://seatgeek.com/los-tucanes-de-tijuana-tickets/rosemont-illinois-rosemont-theatre-2027-02-20-8-pm/concert/18472484 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-los-tucanes-de-tijuana-2026-austin-z7r9jz1aazgav | Los Tucanes de Tijuana | 2026-12-03 | Austin | no_candidates_returned | - |
| tm-los-tucanes-de-tijuana-2026-catoosa-z7r9jz1aaef8- | Los Tucanes de Tijuana | 2026-12-05 | Catoosa | no_candidates_returned | - |

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

Generated: 2026-11-05T18:25:34.294Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: true
- API access with client ID only: HTTP 200
- Total events in data: 5177
- Enrichment-eligible events (Ticketmaster-verified, or machine_high_confidence with a Ticketmaster identity): 5177
- Events already carrying a valid SeatGeek URL: 2798
- Enrichment-eligible events already carrying a valid SeatGeek URL: 2798
- Enrichment-eligible events still missing a valid SeatGeek URL before this run: 2379
- Eligible (upcoming, resolvable local date) after pre-API filtering: 26
- Skipped before any API call: 0 (none)
- Events this run can check (window size): 10
- Rotation: window 3 of 3 (key 20762)
- Runs needed to check every eligible event once: 3
- Events selected/logged by this run: 6
- Events checked by this run: 6
- API calls made: 30
- Rate-limit responses: 0
- URLs added: 4
- Events skipped: 2
- no_candidates_returned: 1
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId:
- Next recommended resume command:
- Accepted venue mismatches: 1
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 1
- city_or_metro_match_failed: 1

## Interpretation

- `URLs added: 4` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 2798 event(s) already carried valid SeatGeek URLs before this run, including 2798 enrichment-eligible event(s).
- This run queried only the 2379 enrichment-eligible event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-mat-kearney-2027-madison-vv1a6zk48gkehsz0t | Mat Kearney | 2027-11-06 | Madison | https://seatgeek.com/mat-kearney-tickets/madison-wisconsin-orpheum-theatre-madison-2027-11-06-7-30-pm/concert/18725924 |
| tm-mat-kearney-2027-cleveland-vv1aazk4fgkdoxqwy | Mat Kearney | 2027-11-10 | Cleveland | https://seatgeek.com/mat-kearney-tickets/cleveland-ohio-house-of-blues-cleveland-2027-11-10-6-30-pm/concert/18725705 |
| tm-mat-kearney-2027-omaha-1aozk4kgkes-kce | Mat Kearney | 2027-11-12 | Omaha | https://seatgeek.com/mat-kearney-tickets/omaha-nebraska-steelhouse-omaha-2027-11-12-7-30-pm/concert/18726697 |
| tm-mat-kearney-2027-atlanta-vvg1zz_4golpzd | Mat Kearney | 2027-11-19 | Atlanta | https://seatgeek.com/mat-kearney-tickets/atlanta-georgia-the-tabernacle-atlanta-2027-11-19-7-30-pm/concert/18725655 |

## Events skipped

Skipped rows are only the enrichment-eligible events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-mat-kearney-2027-shipshewana-z7r9jz1aa7t8k | Mat Kearney | 2027-11-08 | Shipshewana | no_candidates_returned | - |
| tm-mat-kearney-2027-saint-louis-vv1kvovp4agag9idz | Mat Kearney | 2027-11-13 | Saint Louis | city_or_metro_match_failed | https://seatgeek.com/mat-kearney-tickets/st-louis-missouri-the-pageant-st-louis-2027-11-13-7-30-pm/concert/18725685 |

## Accepted venue mismatches

| showId | TTC venue | SeatGeek venue | URL |
| --- | --- | --- | --- |
| tm-mat-kearney-2027-madison-vv1a6zk48gkehsz0t | Orpheum Theater | Orpheum Theatre - Madison | https://seatgeek.com/mat-kearney-tickets/madison-wisconsin-orpheum-theatre-madison-2027-11-06-7-30-pm/concert/18725924 |

## Conflicts found

- None

## Rate-limited / not checked

- None

## API/environment failures

- None

## Skipped before any API call

Enrichment-eligible events missing a SeatGeek URL that this run deliberately did not query. Past events can never gain a useful CTA; an unresolvable venue-local date would make the SeatGeek date filter search the wrong night, so it is never guessed.

- None
