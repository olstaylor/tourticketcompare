# UK cities with the most announced concerts for 2027 — TTC catalogue sample (internal prototype)

INTERNAL ONLY — not cleared for publication or outreach.

Snapshot: 2026-10-23T18:08:39Z. Repository inspection; not a simultaneous live provider check.

Within this TTC catalogue sample, London leads with 70 recorded 2027 concerts.

## Ranking within the source sample

| Rank | City label | Concerts | Artists | Venues |
| --- | --- | --- | --- | --- |
| 1 | London | 70 | 37 | 16 |
| 2 | Manchester | 48 | 30 | 12 |
| 3 | Glasgow | 35 | 27 | 11 |
| 4 | Birmingham | 18 | 18 | 5 |
| 5 | Cardiff | 7 | 7 | 4 |
| 6 | Stevenage | 6 | 1 | 1 |
| 7 | Edinburgh | 4 | 3 | 2 |
| 7 | Leeds | 4 | 4 | 2 |
| 7 | Newcastle Upon Tyne | 4 | 4 | 3 |
| 10 | Nottingham | 2 | 2 | 1 |
| 11 | Brighton | 1 | 1 | 1 |
| 11 | Bristol | 1 | 1 | 1 |
| 11 | Exeter | 1 | 1 | 1 |
| 11 | Liverpool | 1 | 1 | 1 |

## Coverage

- input_observations: 4025
- uk_input_observations: 327
- uk_2027_dated_observations: 218
- uk_unresolved_date_observations: 9
- counted_concerts: 202
- represented_cities: 14
- represented_artists: 43
- represented_venues: 61
- oldest_counted_observation: 2026-10-15
- newest_counted_observation: 2026-10-21
- uk_market_coverage_percent: unknown / not measured

Excluded observations (one disposition per input row):

- invalid_observation_date: 9
- invalid_provenance: 4
- outside_2027: 100
- outside_uk: 3698
- stale_observation: 9
- unconfirmed_or_non_concert: 1
- unverified: 2

## Sources and observation dates

- TTC reviewed catalogue; original event evidence: Ticketmaster. Selected TTC music artists and reviewed events, not a country-wide feed. Stored event last_verified_at (day precision), not a fresh API check. Record verification is separate from provider-link CTA flags.

## Methodology

- Read the pinned repository revision and record SHA-256 hashes of both inputs. Keep the snapshot time separate from original observation dates.
- Resolve repeated source IDs using the latest observation before eligibility; conflicting equal-time observations are withheld. An invalid observation date blocks fallback to an older row.
- Count only permitted, verified UK concert observations with complete provenance, artist, venue, city, exact start and venue-local 2027 date; exclude held/unknown statuses and each stale or future-dated observation.
- Collapse identical city/venue/start performances, retaining all eligible source evidence. Count separate dates and same-day performances with different start instants separately.
- Rank by distinct concert count descending; ties share competition rank (1, 1, 3) and sort by city using fixed code-point order. All supporting events and exclusions are supplied for verification.

## Limitations and release blockers

- Selected TTC artist coverage is not the UK concert market. Unrepresented cities are unobserved, not zero-concert cities.
- Counts describe recorded scheduled performances in 2027, known at the repository snapshot; they are not announcements made during 2027, attendance, demand, inventory or affordability.
- Classification uses the reviewed music-artist catalogue and conservative title exclusions, not a provider concert taxonomy. Festivals, multi-day and uncertain products are excluded; manual classification review is still needed.
- City labels reuse TTC location normalization, not official city boundaries or population areas. No new geographic or regional assignments are inferred.
- Deduplication uses source IDs, then normalized city, venue and exact start instant. Venue aliases and differing doors/start times can leave duplicates; same-time listings at a venue collapse conservatively.
- Stored verification dates are day precision and are not current live API checks. Every counted observation must be at most 14 days old at the snapshot; time-TBA and unresolved dates are excluded.
- Research publication, redistribution and archive rights are not established. Output is for internal review only; no feed data was collected or retained.

- Insufficient UK geographic and artist coverage
- Research publication and retention rights not established
- Concert classification and city boundaries require editorial validation

## Supporting data

Every counted performance is below; report.json includes source IDs, raw city labels, observation precision and excluded-record decisions.

| Local date | City | Venue | Artist | Source record | Observed |
| --- | --- | --- | --- | --- | --- |
| 2027-01-16 | Manchester | AO Arena | Five Finger Death Punch | [tm-five-finger-death-punch-2027-manchester-g5vhz_gnh6q4f](https://www.ticketmaster.co.uk/five-finger-death-punch-20th-anniversary-manchester-16-01-2027/event/1F0064CABC1DA554) | 2026-10-15 (day) |
| 2027-01-17 | Glasgow | OVO Hydro | Five Finger Death Punch | [tm-five-finger-death-punch-2027-glasgow-1adbz_agkuc9oes](https://www.ticketmaster.co.uk/five-finger-death-punch-glasgow-17-01-2027/event/3600649D8E5D19F1) | 2026-10-15 (day) |
| 2027-01-18 | Glasgow | Galvanizers SWG3 | Saint Levant | [tm-saint-levant-2027-glasgow-1adbz_fgkb_vncq](https://www.ticketmaster.co.uk/saint-levant-afandi-world-tour-glasgow-18-01-2027/event/3600654E99D23B5D) | 2026-10-21 (day) |
| 2027-01-20 | Manchester | O2 Ritz Manchester | Saint Levant | [tm-saint-levant-2027-manchester-g5dzz_fbnzksb](https://www.ticketmaster.co.uk/saint-levant-afandi-world-tour-manchester-20-01-2027/event/3E00654EA3E13C7A) | 2026-10-20 (day) |
| 2027-01-21 | London | Eventim Apollo | Saint Levant | [tm-saint-levant-2027-london-1auzk48gkdxoa9q](https://www.ticketmaster.co.uk/saint-levant-afandi-world-tour-london-21-01-2027/event/36006550E24495DA) | 2026-10-21 (day) |
| 2027-01-22 | Birmingham | bp pulse LIVE | Five Finger Death Punch | [tm-five-finger-death-punch-2027-birmingham-1anzk3bgkev6s0s](https://www.ticketmaster.co.uk/five-finger-death-punch-birmingham-22-01-2027/event/23006498B41F1933) | 2026-10-15 (day) |
| 2027-01-23 | London | The O2 | Five Finger Death Punch | [tm-five-finger-death-punch-2027-london-1agzk3bgkdreu6-](https://www.ticketmaster.co.uk/five-finger-death-punch-london-23-01-2027/event/35006498EF9F61E1) | 2026-10-15 (day) |
| 2027-01-26 | Birmingham | O2 Academy Birmingham | The Psychedelic Furs | [tm-the-psychedelic-furs-2027-birmingham-g5dzz_kk-v07y](https://www.ticketmaster.co.uk/the-psychedelic-furs-the-jesus-mary-birmingham-26-01-2027/event/3E006531A1D24130) | 2026-10-15 (day) |
| 2027-01-28 | Manchester | Albert Hall | Sylvan Esso | [tm-sylvan-esso-2027-manchester-g5vhz_fudi7pq](https://www.ticketmaster.co.uk/sylvan-esso-manchester-28-01-2027/event/1F00654DBBB0495D) | 2026-10-18 (day) |
| 2027-01-29 | London | British Airways ARC | The Psychedelic Furs | [tm-the-psychedelic-furs-2027-london-1amzkfwgkeiysgf](https://www.ticketmaster.co.uk/the-psychedelic-furs-the-jesus-mary-london-29-01-2027/event/37006532ACE73314) | 2026-10-15 (day) |
| 2027-01-29 | London | Troxy | Sylvan Esso | [tm-sylvan-esso-2027-london-g5dzz_fua9vy_](https://www.ticketmaster.co.uk/sylvan-esso-london-29-01-2027/event/3E00654D895C1C19) | 2026-10-18 (day) |
| 2027-02-01 | Glasgow | Glasgow Garage | VNV Nation | [tm-vnv-nation-2027-glasgow-16dbzbuq4g7ljkl](https://www.ticketmaster.co.uk/vnv-nation-glasgow-01-02-2027/event/3600636695AE61AB) | 2026-10-15 (day) |
| 2027-02-01 | Manchester | Manchester Academy | Mico | [tm-mico-2027-manchester-g5vhz_flmnkjc](https://www.ticketmaster.co.uk/mico-manchester-01-02-2027/event/1F006547F78C69AD) | 2026-10-18 (day) |
| 2027-02-04 | Nottingham | Motorpoint Arena Nottingham | Nothing But Thieves | [tm-nothing-but-thieves-2027-nottingham-17u8v0g65hxepmr](https://www.ticketmaster.co.uk/nothing-but-thieves-nottingham-04-02-2027/event/350064B6E20A5DEF) | 2026-10-15 (day) |
| 2027-02-04 | London | Roundhouse | Mico | [tm-mico-2027-london-g5vhz_fjlqa3s](https://www.ticketmaster.co.uk/mico-london-04-02-2027/event/1F0065472B6894B1) | 2026-10-18 (day) |
| 2027-02-05 | London | The O2 | Nothing But Thieves | [tm-nothing-but-thieves-2027-london-17u8v0g65h5y7dp](https://www.ticketmaster.co.uk/nothing-but-thieves-london-05-02-2027/event/350064B6CBC04ED6) | 2026-10-15 (day) |
| 2027-02-08 | Cardiff | Utilita Arena Cardiff | Nothing But Thieves | [tm-nothing-but-thieves-2027-cardiff-17uov0g65qps55o](https://www.ticketmaster.co.uk/nothing-but-thieves-the-stray-dogs-cardiff-08-02-2027/event/360064B6A5CCB2E0) | 2026-10-15 (day) |
| 2027-02-10 | Glasgow | OVO Hydro | Nothing But Thieves | [tm-nothing-but-thieves-2027-glasgow-17uov0g65qojiik](https://www.ticketmaster.co.uk/nothing-but-thieves-the-stray-dogs-glasgow-10-02-2027/event/360064B691728A06) | 2026-10-15 (day) |
| 2027-02-12 | Manchester | Co-op Live | Nothing But Thieves | [tm-nothing-but-thieves-2027-manchester-17uyv0g65hofvrj](https://www.ticketmaster.co.uk/nothing-but-thieves-manchester-12-02-2027/event/370064B6E02347A6) | 2026-10-15 (day) |
| 2027-02-13 | Birmingham | bp pulse LIVE | Nothing But Thieves | [tm-nothing-but-thieves-2027-birmingham-17fyv0g65h43oux](https://www.ticketmaster.co.uk/nothing-but-thieves-birmingham-13-02-2027/event/230064B6D5491DBE) | 2026-10-15 (day) |
| 2027-02-17 | Manchester | Co-op Live | Charli xcx | [tm-charli-xcx-2027-manchester-1amzkfegkdf5asp](https://www.ticketmaster.co.uk/charli-xcx-music-fashion-film-tour-manchester-17-02-2027/event/37006527D42C5C65) | 2026-10-15 (day) |
| 2027-02-18 | London | O2 Academy Brixton | Dylan Gossett | [tm-dylan-gossett-2027-london-g5dzz_8kn_3tz](https://www.ticketmaster.co.uk/dylan-gossett-london-18-02-2027/event/3E006504EA652A78) | 2026-10-15 (day) |
| 2027-02-19 | London | The O2 | Charli xcx | [tm-charli-xcx-2027-london-1agzkfigkenre1t](https://www.ticketmaster.co.uk/charli-xcx-music-fashion-film-tour-london-19-02-2027/event/35006528AA7822A9) | 2026-10-15 (day) |
| 2027-02-19 | Manchester | O2 Victoria Warehouse Manchester | Dylan Gossett | [tm-dylan-gossett-2027-manchester-g5dzz_8hqwevt](https://www.ticketmaster.co.uk/dylan-gossett-ramblin-euuk-tour-2027-manchester-19-02-2027/event/3E006506DDF4207F) | 2026-10-15 (day) |
| 2027-02-20 | London | The O2 | Charli xcx | [tm-charli-xcx-2027-london-1adfz_3gknni7-u](https://www.ticketmaster.co.uk/charli-xcx-music-fashion-film-tour-london-20-02-2027/event/3500652AA3A04876) | 2026-10-15 (day) |
| 2027-02-21 | Birmingham | O2 Academy Birmingham | Dylan Gossett | [tm-dylan-gossett-2027-birmingham-g5dzz_83l8ohz](https://www.ticketmaster.co.uk/dylan-gossett-birmingham-21-02-2027/event/3E006504AB4116C0) | 2026-10-15 (day) |
| 2027-02-21 | Manchester | Manchester Academy 2 | Haiden Henderson | [tm-haiden-henderson-2027-manchester-g5vhz_kduqskh](https://www.ticketmaster.co.uk/haiden-henderson-the-dumblond-tour-manchester-21-02-2027/event/1F006530CD6B31BC) | 2026-10-15 (day) |
| 2027-02-22 | Glasgow | OVO Hydro | Kacey Musgraves | [tm-kacey-musgraves-2027-glasgow-1adbz_agkdqknt2](https://www.ticketmaster.co.uk/kacey-musgraves-glasgow-22-02-2027/event/3600649EDD1A3FCF) | 2026-10-20 (day) |
| 2027-02-22 | Edinburgh | Edinburgh Corn Exchange | Sienna Spiro | [tm-sienna-spiro-2027-edinburgh-g5dzz_g3xlvct](https://www.ticketmaster.co.uk/sienna-spiro-edinburgh-22-02-2027/event/3E0064C4A2AF43A9) | 2026-10-15 (day) |
| 2027-02-23 | Edinburgh | Edinburgh Corn Exchange | Sienna Spiro | [tm-sienna-spiro-2027-edinburgh-g5dzz_g3jtvqc](https://www.ticketmaster.co.uk/sienna-spiro-edinburgh-23-02-2027/event/3E0064C4A6FF476D) | 2026-10-15 (day) |
| 2027-02-23 | Glasgow | O2 Academy Glasgow | Dylan Gossett | [tm-dylan-gossett-2027-glasgow-g5dzz_8pg5sb3](https://www.ticketmaster.co.uk/dylan-gossett-ramblin-euuk-tour-2027-glasgow-23-02-2027/event/3E006505B52F1612) | 2026-10-15 (day) |
| 2027-02-23 | London | Electric Ballroom | Haiden Henderson | [tm-haiden-henderson-2027-london-g5vhz_kew3xpo](https://www.ticketmaster.co.uk/haiden-henderson-the-dumblond-tour-london-23-02-2027/event/1F006530BD4A2960) | 2026-10-15 (day) |
| 2027-02-24 | Manchester | AO Arena | Kacey Musgraves | [tm-kacey-musgraves-2027-manchester-g5vhz_gkaityt](https://www.ticketmaster.co.uk/kacey-musgraves-manchester-24-02-2027/event/1F0064C4C9B29E69) | 2026-10-20 (day) |
| 2027-02-24 | Cardiff | Tramshed | Haiden Henderson | [tm-haiden-henderson-2027-cardiff-g5vhz_kdajwvp](https://www.ticketmaster.co.uk/haiden-henderson-the-dumblond-tour-cardiff-24-02-2027/event/1F006530C5732D16) | 2026-10-15 (day) |
| 2027-02-24 | Glasgow | O2 Academy Glasgow | Dylan Gossett | [tm-dylan-gossett-2027-glasgow-g5dzz_8qwdoqp](https://www.ticketmaster.co.uk/dylan-gossett-ramblin-euuk-tour-2027-glasgow-24-02-2027/event/3E006506B20D1765) | 2026-10-15 (day) |
| 2027-02-25 | Birmingham | O2 Institute2 Birmingham | Haiden Henderson | [tm-haiden-henderson-2027-birmingham-g5dzz_ke9h3b2](https://www.ticketmaster.co.uk/haiden-henderson-the-dumblond-tour-birmingham-25-02-2027/event/3E006530976D260F) | 2026-10-15 (day) |
| 2027-02-25 | Glasgow | Barrowland Ballroom | Malcolm Todd | [tm-malcolm-todd-2027-glasgow-1adbz_3gknizpvr](https://www.ticketmaster.co.uk/malcolm-todd-do-that-again-tour-glasgow-25-02-2027/event/3600652AA8E1605E) | 2026-10-15 (day) |
| 2027-02-26 | London | OVO Arena Wembley | Kacey Musgraves | [tm-kacey-musgraves-2027-london-1adjz_agkmwrf6s](https://www.ticketmaster.co.uk/kacey-musgraves-london-26-02-2027/event/3700649DF2BC81F3) | 2026-10-20 (day) |
| 2027-02-27 | London | The O2 | John Summit | [tm-john-summit-2027-london-1agzk4egkdwrmjf](https://www.ticketmaster.co.uk/john-summit-europe-ctrl-escape-arena-london-27-02-2027/event/35006542F27AE994) | 2026-10-15 (day) |
| 2027-02-27 | Birmingham | O2 Academy Birmingham | Malcolm Todd | [tm-malcolm-todd-2027-birmingham-g5dzz_3nh3wrn](https://www.ticketmaster.co.uk/malcolm-todd-do-that-again-tour-birmingham-27-02-2027/event/3E00652A9B4B2BE3) | 2026-10-15 (day) |
| 2027-02-28 | Manchester | O2 Apollo Manchester | Malcolm Todd | [tm-malcolm-todd-2027-manchester-1adbz_3gknvr9ad](https://www.ticketmaster.co.uk/malcolm-todd-do-that-again-tour-manchester-28-02-2027/event/3600652AB4BD7243) | 2026-10-15 (day) |
| 2027-03-01 | Manchester | O2 Apollo Manchester | Sienna Spiro | [tm-sienna-spiro-2027-manchester-17uov0g6ghevqqt](https://www.ticketmaster.co.uk/sienna-spiro-my-house-tour-manchester-01-03-2027/event/360064C6E7D1D769) | 2026-10-15 (day) |
| 2027-03-02 | London | O2 Academy Brixton | Malcolm Todd | [tm-malcolm-todd-2027-london-g5dzz_3lpy7hq](https://www.ticketmaster.co.uk/malcolm-todd-do-that-again-tour-london-02-03-2027/event/3E00652AD6E44F1A) | 2026-10-15 (day) |
| 2027-03-02 | Manchester | O2 Apollo Manchester | Sienna Spiro | [tm-sienna-spiro-2027-manchester-17uov0g6gnyji_e](https://www.ticketmaster.co.uk/sienna-spiro-my-house-tour-manchester-02-03-2027/event/360064C8F09AC667) | 2026-10-15 (day) |
| 2027-03-03 | London | O2 Academy Brixton | Malcolm Todd | [tm-malcolm-todd-2027-london-g5dzz_3rjik2s](https://www.ticketmaster.co.uk/malcolm-todd-do-that-again-tour-london-03-03-2027/event/3E00652BE6A063F3) | 2026-10-15 (day) |
| 2027-03-04 | London | O2 Academy Brixton | Malcolm Todd | [tm-malcolm-todd-2027-london-g5dzz_3rsuku2](https://www.ticketmaster.co.uk/malcolm-todd-do-that-again-tour-london-04-03-2027/event/3E00652BF1D86D8F) | 2026-10-15 (day) |
| 2027-03-16 | Glasgow | Queen Margaret Union | Hazlett | [tm-hazlett-2027-glasgow-1auzkfggkeyhp7l](https://www.ticketmaster.co.uk/hazlett-glasgow-16-03-2027/event/36006535B06E511F) | 2026-10-18 (day) |
| 2027-03-17 | Manchester | Manchester Academy 2 | Hazlett | [tm-hazlett-2027-manchester-g5vhz_klkyfqd](https://www.ticketmaster.co.uk/hazlett-manchester-17-03-2027/event/1F006537C6C146BB) | 2026-10-18 (day) |
| 2027-03-19 | Manchester | O2 Ritz Manchester | Stella Lefty | [tm-stella-lefty-2027-manchester-g5dzz_36uppzk](https://www.ticketmaster.co.uk/stella-lefty-manchester-19-03-2027/event/3E006521F6956E13) | 2026-10-15 (day) |
| 2027-03-20 | London | O2 Shepherds Bush Empire | Hazlett | [tm-hazlett-2027-london-g5dzz_3nl_fgq](https://www.ticketmaster.co.uk/hazlett-london-20-03-2027/event/3E006528EB654D5A) | 2026-10-18 (day) |
| 2027-03-22 | Birmingham | O2 Institute Birmingham | Stella Lefty | [tm-stella-lefty-2027-birmingham-g5dzz_o1n7vhc](https://www.ticketmaster.co.uk/stella-lefty-birmingham-22-03-2027/event/3E006512AA1016ED) | 2026-10-15 (day) |
| 2027-03-29 | Birmingham | O2 Academy Birmingham | The Warning | [tm-the-warning-2027-birmingham-g5dzz_3jthdkp](https://www.ticketmaster.co.uk/the-warning-birmingham-29-03-2027/event/3E006529A9F03196) | 2026-10-15 (day) |
| 2027-03-30 | Glasgow | O2 Academy Glasgow | The Warning | [tm-the-warning-2027-glasgow-g5dzz_3cmwwj3](https://www.ticketmaster.co.uk/the-warning-glasgow-30-03-2027/event/3E006523AECB2992) | 2026-10-15 (day) |
| 2027-03-31 | Glasgow | OVO Hydro | Trivium | [tm-trivium-2027-glasgow-1auzkfpgken_hpc](https://www.ticketmaster.co.uk/trivium-glasgow-31-03-2027/event/36006516A365B96D) | 2026-10-15 (day) |
| 2027-03-31 | London | O2 Academy Brixton | Lizzy McAlpine | [tm-lizzy-mcalpine-2027-london-g5dzz_krvbn6w](https://www.ticketmaster.co.uk/lizzy-mcalpine-the-over-country-tour-london-31-03-2027/event/3E006537B4EA31F2) | 2026-10-15 (day) |
| 2027-04-01 | London | O2 Academy Brixton | Lizzy McAlpine | [tm-lizzy-mcalpine-2027-london-g5dzz_kslx95p](https://www.ticketmaster.co.uk/lizzy-mcalpine-the-over-country-tour-london-01-04-2027/event/3E00653CDFF972D6) | 2026-10-15 (day) |
| 2027-04-01 | Manchester | O2 Victoria Warehouse Manchester | The Warning | [tm-the-warning-2027-manchester-g5dzz_3jr_df6](https://www.ticketmaster.co.uk/the-warning-manchester-01-04-2027/event/3E006529AF643507) | 2026-10-15 (day) |
| 2027-04-02 | Manchester | Co-op Live | Trivium | [tm-trivium-2027-manchester-1amzkffgkdkmgfp](https://www.ticketmaster.co.uk/trivium-manchester-02-04-2027/event/37006514C6DCC225) | 2026-10-15 (day) |
| 2027-04-02 | London | O2 Academy Brixton | Lizzy McAlpine | [tm-lizzy-mcalpine-2027-london-g5dzz_kscgmsk](https://www.ticketmaster.co.uk/lizzy-mcalpine-the-over-country-tour-london-02-04-2027/event/3E00653CED337C46) | 2026-10-15 (day) |
| 2027-04-02 | London | OVO Arena Wembley | The Warning | [tm-the-warning-2027-london-1adjz_3gknpoval](https://www.ticketmaster.co.uk/the-warning-london-02-04-2027/event/3700652A9683415F) | 2026-10-15 (day) |
| 2027-04-03 | London | Alexandra Palace | Trivium | [tm-trivium-2027-london-g5vhz_o63ceuv](https://www.ticketmaster.co.uk/trivium-london-03-04-2027/event/1F006511D23A7DB4) | 2026-10-15 (day) |
| 2027-04-04 | Cardiff | Utilita Arena Cardiff | Trivium | [tm-trivium-2027-cardiff-1kuovpa6gacrw-h](https://www.ticketmaster.co.uk/trivium-cardiff-04-04-2027/event/360065147E7B287C) | 2026-10-15 (day) |
| 2027-04-05 | London | The O2 | Olivia Rodrigo | [tm-olivia-rodrigo-2027-london-1adfz_agkuyj7ah](https://www.ticketmaster.co.uk/olivia-rodrigo-the-unraveled-tour-london-05-04-2027/event/3500649DB098427C) | 2026-10-15 (day) |
| 2027-04-06 | London | The O2 | Olivia Rodrigo | [tm-olivia-rodrigo-2027-london-1adfz_agkusg7f3](https://www.ticketmaster.co.uk/olivia-rodrigo-the-unraveled-tour-london-06-04-2027/event/3500649DB3304512) | 2026-10-15 (day) |
| 2027-04-07 | Birmingham | O2 Academy Birmingham | Lizzy McAlpine | [tm-lizzy-mcalpine-2027-birmingham-g5dzz_kkek096](https://www.ticketmaster.co.uk/lizzy-mcalpine-the-over-country-tour-birmingham-07-04-2027/event/3E006531A74E45C7) | 2026-10-15 (day) |
| 2027-04-08 | London | The O2 | Olivia Rodrigo | [tm-olivia-rodrigo-2027-london-1adfz_agkusmfph](https://www.ticketmaster.co.uk/olivia-rodrigo-the-unraveled-tour-london-08-04-2027/event/3500649DB3DD459B) | 2026-10-15 (day) |
| 2027-04-09 | Glasgow | O2 Academy Glasgow | Lizzy McAlpine | [tm-lizzy-mcalpine-2027-glasgow-g5dzz_krfm-83](https://www.ticketmaster.co.uk/lizzy-mcalpine-glasgow-09-04-2027/event/3E00653788BA1412) | 2026-10-15 (day) |
| 2027-04-09 | Glasgow | OVO Hydro | Sabaton | [tm-sabaton-2027-glasgow-17uov0g6g3si1v4](https://www.ticketmaster.co.uk/sabaton-the-legendary-tour-glasgow-09-04-2027/event/360064C4B1A0A055) | 2026-10-15 (day) |
| 2027-04-09 | London | The O2 | Olivia Rodrigo | [tm-olivia-rodrigo-2027-london-1adfz_agkug10qr](https://www.ticketmaster.co.uk/olivia-rodrigo-the-unraveled-tour-london-09-04-2027/event/3500649DB52A469E) | 2026-10-15 (day) |
| 2027-04-10 | Birmingham | bp pulse LIVE | Sabaton | [tm-sabaton-2027-birmingham-17fyv0g6gp8gytu](https://www.ticketmaster.co.uk/sabaton-the-legendary-tour-the-legendary-birmingham-10-04-2027/event/230064C590D70A76) | 2026-10-15 (day) |
| 2027-04-10 | Glasgow | O2 Academy Glasgow | Lizzy McAlpine | [tm-lizzy-mcalpine-2027-glasgow-g5dzz_kwtjarb](https://www.ticketmaster.co.uk/lizzy-mcalpine-the-over-country-tour-glasgow-10-04-2027/event/3E00653CBF9857BA) | 2026-10-15 (day) |
| 2027-04-12 | London | The O2 | Olivia Rodrigo | [tm-olivia-rodrigo-2027-london-1adfz_agkdf5uep](https://www.ticketmaster.co.uk/olivia-rodrigo-the-unraveled-tour-london-12-04-2027/event/3500649ED42F6096) | 2026-10-15 (day) |
| 2027-04-13 | Glasgow | OVO Hydro | Teddy Swims | [tm-teddy-swims-2027-glasgow-17uov0g62qlspvu](https://www.ticketmaster.co.uk/teddy-swims-the-ugly-tour-glasgow-13-04-2027/event/360064F69FC65D0D) | 2026-10-15 (day) |
| 2027-04-14 | London | The O2 | Olivia Rodrigo | [tm-olivia-rodrigo-2027-london-1adfz_agkdbfuff](https://www.ticketmaster.co.uk/olivia-rodrigo-the-unraveled-tour-london-14-04-2027/event/3500649ED8236514) | 2026-10-15 (day) |
| 2027-04-15 | London | The O2 | Olivia Rodrigo | [tm-olivia-rodrigo-2027-london-1adfz_agkdqyuqd](https://www.ticketmaster.co.uk/olivia-rodrigo-the-unraveled-tour-london-15-04-2027/event/3500649EDAC36683) | 2026-10-15 (day) |
| 2027-04-16 | Manchester | Co-op Live | Teddy Swims | [tm-teddy-swims-2027-manchester-17uyv0g62pcoosz](https://www.ticketmaster.co.uk/teddy-swims-the-ugly-tour-manchester-16-04-2027/event/370064F5AD451CF8) | 2026-10-15 (day) |
| 2027-04-17 | Manchester | Co-op Live | Teddy Swims | [tm-teddy-swims-2027-manchester-17uyv0g62m2z8vc](https://www.ticketmaster.co.uk/teddy-swims-the-ugly-tour-manchester-17-04-2027/event/370064FB8FE10D2D) | 2026-10-15 (day) |
| 2027-04-18 | Manchester | Co-op Live | Teddy Swims | [tm-teddy-swims-2027-manchester-17uyv0g62mo98gp](https://www.ticketmaster.co.uk/teddy-swims-the-ugly-tour-manchester-18-04-2027/event/370064FB915D0D56) | 2026-10-15 (day) |
| 2027-04-19 | London | The O2 | Olivia Rodrigo | [tm-olivia-rodrigo-2027-london-1adfz_agkdjmpol](https://www.ticketmaster.co.uk/olivia-rodrigo-the-unraveled-tour-london-19-04-2027/event/3500649EDCB9682B) | 2026-10-15 (day) |
| 2027-04-20 | London | The O2 | Olivia Rodrigo | [tm-olivia-rodrigo-2027-london-1adfz_agkdj-m1i](https://www.ticketmaster.co.uk/olivia-rodrigo-the-unraveled-tour-london-20-04-2027/event/3500649EE68772AC) | 2026-10-15 (day) |
| 2027-04-21 | London | The O2 | Teddy Swims | [tm-teddy-swims-2027-london-17u8v0g6253xeaz](https://www.ticketmaster.co.uk/teddy-swims-the-ugly-tour-london-21-04-2027/event/350064F2D28A7140) | 2026-10-15 (day) |
| 2027-04-22 | London | The O2 | Teddy Swims | [tm-teddy-swims-2027-london-17u8v0g623cnnvk](https://www.ticketmaster.co.uk/teddy-swims-the-ugly-tour-london-22-04-2027/event/350064F4AD8E3046) | 2026-10-15 (day) |
| 2027-04-22 | Manchester | Co-op Live | Gracie Abrams | [tm-gracie-abrams-2027-manchester-17uyv0g65rbpnzf](https://www.ticketmaster.co.uk/gracie-abrams-the-look-at-my-manchester-22-04-2027/event/370064BBD8963014) | 2026-10-15 (day) |
| 2027-04-24 | London | The O2 | Teddy Swims | [tm-teddy-swims-2027-london-17u8v0g623yvkkm](https://www.ticketmaster.co.uk/teddy-swims-the-ugly-tour-london-24-04-2027/event/350064F4B00531B7) | 2026-10-15 (day) |
| 2027-04-24 | Manchester | Co-op Live | Gracie Abrams | [tm-gracie-abrams-2027-manchester-17uyv0g6gk_vkhl](https://www.ticketmaster.co.uk/gracie-abrams-the-look-at-my-manchester-24-04-2027/event/370064C199D13F1F) | 2026-10-15 (day) |
| 2027-04-25 | London | The O2 | Teddy Swims | [tm-teddy-swims-2027-london-17u8v0g623nj3ov](https://www.ticketmaster.co.uk/teddy-swims-the-ugly-tour-london-25-04-2027/event/350064F4A3712441) | 2026-10-15 (day) |
| 2027-04-25 | Manchester | Co-op Live | Gracie Abrams | [tm-gracie-abrams-2027-manchester-17uyv0g6gkp6vc5](https://www.ticketmaster.co.uk/gracie-abrams-the-look-at-my-manchester-25-04-2027/event/370064C1A51F4B4B) | 2026-10-15 (day) |
| 2027-04-27 | Glasgow | OVO Hydro | Gracie Abrams | [tm-gracie-abrams-2027-glasgow-17uov0g65lvesak](https://www.ticketmaster.co.uk/gracie-abrams-the-look-at-my-glasgow-27-04-2027/event/360064BAF49F1146) | 2026-10-15 (day) |
| 2027-04-28 | Glasgow | OVO Hydro | Gracie Abrams | [tm-gracie-abrams-2027-glasgow-17uov0g65vd1fhq](https://www.ticketmaster.co.uk/gracie-abrams-the-look-at-my-glasgow-28-04-2027/event/360064BD032946DD) | 2026-10-15 (day) |
| 2027-04-28 | London | The O2 | Thirty Seconds to Mars | [tm-thirty-seconds-to-mars-2027-london-1agzk3agkdevn9u](https://www.ticketmaster.co.uk/thirty-seconds-to-mars-presents-a-london-28-04-2027/event/35006489E7D2A5CD) | 2026-10-15 (day) |
| 2027-04-29 | Manchester | Co-op Live | Thirty Seconds to Mars | [tm-thirty-seconds-to-mars-2027-manchester-1amzk3agkeyexfs](https://www.ticketmaster.co.uk/thirty-seconds-to-mars-presents-a-manchester-29-04-2027/event/37006489B09E2233) | 2026-10-15 (day) |
| 2027-04-29 | Glasgow | OVO Hydro | Rod Stewart | [tm-rod-stewart-2027-glasgow-1auzkfmgkehwkob](https://www.ticketmaster.co.uk/rod-stewart-the-final-encore-glasgow-29-04-2027/event/36006537BCF4683A) | 2026-10-18 (day) |
| 2027-04-30 | London | The O2 | Gracie Abrams | [tm-gracie-abrams-2027-london-17u8v0g65wthjl9](https://www.ticketmaster.co.uk/gracie-abrams-the-look-at-my-london-30-04-2027/event/350064BCA96E67D7) | 2026-10-15 (day) |
| 2027-05-01 | Glasgow | OVO Hydro | Rod Stewart | [tm-rod-stewart-2027-glasgow-1auzkfygkdhvxxd](https://www.ticketmaster.co.uk/rod-stewart-the-final-encore-glasgow-01-05-2027/event/36006539FC07E883) | 2026-10-15 (day) |
| 2027-05-01 | London | The O2 | Gracie Abrams | [tm-gracie-abrams-2027-london-17u8v0g65wi6peh](https://www.ticketmaster.co.uk/gracie-abrams-the-look-at-my-london-01-05-2027/event/350064BCAC1D69DB) | 2026-10-15 (day) |
| 2027-05-03 | London | The O2 | Gracie Abrams | [tm-gracie-abrams-2027-london-17u8v0g65wcbpi1](https://www.ticketmaster.co.uk/gracie-abrams-the-look-at-my-london-03-05-2027/event/350064BCAD616B0A) | 2026-10-15 (day) |
| 2027-05-04 | Birmingham | Utilita Arena Birmingham | Rod Stewart | [tm-rod-stewart-2027-birmingham-1kfyvpcfga2dzlv](https://www.ticketmaster.co.uk/rod-stewart-the-final-encore-birmingham-04-05-2027/event/230065388F0C0AC1) | 2026-10-15 (day) |
| 2027-05-04 | London | The O2 | Gracie Abrams | [tm-gracie-abrams-2027-london-17u8v0g65wm9us5](https://www.ticketmaster.co.uk/gracie-abrams-the-look-at-my-london-04-05-2027/event/350064BCAE5F6C4B) | 2026-10-15 (day) |
| 2027-05-06 | Manchester | Co-op Live | Rod Stewart | [tm-rod-stewart-2027-manchester-1amzkfugkesbky7](https://www.ticketmaster.co.uk/rod-stewart-manchester-06-05-2027/event/37006536B3613C04) | 2026-10-15 (day) |
| 2027-05-06 | London | The O2 | Simple Minds | [tm-simple-minds-2027-london-16dfz_313g7wgmr](https://www.ticketmaster.co.uk/simple-minds-london-06-05-2027/event/3500652292F75B9E) | 2026-10-15 (day) |
| 2027-05-07 | Manchester | Co-op Live | Simple Minds | [tm-simple-minds-2027-manchester-1amzkfxgkdzwjhm](https://www.ticketmaster.co.uk/simple-minds-manchester-07-05-2027/event/37006522C0F666EE) | 2026-10-15 (day) |
| 2027-05-08 | Birmingham | Utilita Arena Birmingham | Simple Minds | [tm-simple-minds-2027-birmingham-1aegz_31ka4zdg5d](https://www.ticketmaster.co.uk/simple-minds-birmingham-08-05-2027/event/2300652293155BA2) | 2026-10-15 (day) |
| 2027-05-08 | Manchester | Co-op Live | Rod Stewart | [tm-rod-stewart-2027-manchester-1amzkfzgkdjwz0v](https://www.ticketmaster.co.uk/rod-stewart-manchester-08-05-2027/event/37006538E6F78934) | 2026-10-15 (day) |
| 2027-05-08 | Cardiff | Principality Stadium | Andrea Bocelli | [tm-andrea-bocelli-2027-cardiff-1agzkfkgkejnxkj](https://www.ticketmaster.co.uk/andrea-bocelli-ft-welsh-national-opera-cardiff-08-05-2027/event/35006506A68E21A6) | 2026-10-15 (day) |
| 2027-05-09 | London | The O2 | Olivia Rodrigo | [tm-olivia-rodrigo-2027-london-1adfz_agkdz-z3p](https://www.ticketmaster.co.uk/olivia-rodrigo-the-unraveled-tour-london-09-05-2027/event/3500649EF88784A5) | 2026-10-15 (day) |
| 2027-05-10 | London | The O2 | Olivia Rodrigo | [tm-olivia-rodrigo-2027-london-1adfz_agkdd-fh3](https://www.ticketmaster.co.uk/olivia-rodrigo-the-unraveled-tour-london-10-05-2027/event/3500649EFB8486D2) | 2026-10-15 (day) |
| 2027-05-10 | Nottingham | Motorpoint Arena Nottingham | Simple Minds | [tm-simple-minds-2027-nottingham-1adfz_31k14zduv5](https://www.ticketmaster.co.uk/simple-minds-nottingham-10-05-2027/event/3500652293295C0A) | 2026-10-15 (day) |
| 2027-05-10 | Bristol | Thekla | Valley | [tm-valley-2027-bristol-g5vhz_3zkbafq](https://www.ticketmaster.co.uk/valley-do-you-need-to-be-bristol-10-05-2027/event/1F00652E06E8551D) | 2026-10-15 (day) |
| 2027-05-11 | Leeds | Leeds First Direct Bank Arena | Simple Minds | [tm-simple-minds-2027-leeds-g5vhz_31k8si9](https://www.ticketmaster.co.uk/simple-minds-leeds-11-05-2027/event/1F00652293431A17) | 2026-10-15 (day) |
| 2027-05-11 | London | The O2 | Rod Stewart | [tm-rod-stewart-2027-london-1agzkfzgkdv3zff](https://www.ticketmaster.co.uk/rod-stewart-the-final-encore-london-11-05-2027/event/35006538C14B8214) | 2026-10-15 (day) |
| 2027-05-11 | Birmingham | O2 Institute2 Birmingham | Valley | [tm-valley-2027-birmingham-g5dzz_36osp2q](https://www.ticketmaster.co.uk/valley-do-you-need-to-be-birmingham-11-05-2027/event/3E006521D1CE53DD) | 2026-10-15 (day) |
| 2027-05-12 | Manchester | Manchester Club Academy | Valley | [tm-valley-2027-manchester-g5vhz_ohdx77o](https://www.ticketmaster.co.uk/valley-do-you-need-to-be-manchester-12-05-2027/event/1F00651F3B884120) | 2026-10-15 (day) |
| 2027-05-13 | Newcastle Upon Tyne | Utilita Arena Newcastle | Simple Minds | [tm-simple-minds-2027-newcastle-upon-tyne-g5vhz_31k4viz](https://www.ticketmaster.co.uk/simple-minds-newcastle-upon-tyne-13-05-2027/event/1F00652293541A38) | 2026-10-15 (day) |
| 2027-05-14 | Newcastle Upon Tyne | Utilita Arena Newcastle | Weezer | [tm-weezer-2027-newcastle-upon-tyne-g5vhz_8kkspwo](https://www.ticketmaster.co.uk/weezer-newcastle-upon-tyne-14-05-2027/event/1F006504D3CD6C91) | 2026-10-18 (day) |
| 2027-05-14 | Glasgow | OVO Hydro | Simple Minds | [tm-simple-minds-2027-glasgow-1auzkfxgkd0xdr8](https://www.ticketmaster.co.uk/simple-minds-glasgow-14-05-2027/event/36006522E48BBBD0) | 2026-10-15 (day) |
| 2027-05-14 | London | The O2 | Rod Stewart | [tm-rod-stewart-2027-london-1agzkfzgkdvmnjo](https://www.ticketmaster.co.uk/rod-stewart-the-final-encore-london-14-05-2027/event/35006538F4DEA720) | 2026-10-15 (day) |
| 2027-05-14 | London | O2 Forum Kentish Town | Valley | [tm-valley-2027-london-g5dzz_3vpsj3z](https://www.ticketmaster.co.uk/valley-do-you-need-to-be-london-14-05-2027/event/3E00652D16C664B8) | 2026-10-15 (day) |
| 2027-05-15 | Manchester | Co-op Live | Weezer | [tm-weezer-2027-manchester-1amzkf7gkderotz](https://www.ticketmaster.co.uk/weezer-manchester-15-05-2027/event/37006504C2791A78) | 2026-10-18 (day) |
| 2027-05-16 | Leeds | Brudenell Social Club | Valley | [tm-valley-2027-leeds-1adfz_3gkihrzjf](https://www.ticketmaster.co.uk/valley-do-you-need-to-be-leeds-16-05-2027/event/3500652A3CBC0988) | 2026-10-15 (day) |
| 2027-05-17 | Leeds | Leeds First Direct Bank Arena | Weezer | [tm-weezer-2027-leeds-g5vhz_8pmm7nv](https://www.ticketmaster.co.uk/weezer-leeds-17-05-2027/event/1F006505AEB848C1) | 2026-10-18 (day) |
| 2027-05-19 | Glasgow | OVO Hydro | Weezer | [tm-weezer-2027-glasgow-1auzkf7gkdxjsmu](https://www.ticketmaster.co.uk/weezer-glasgow-19-05-2027/event/36006504E29B3DF6) | 2026-10-18 (day) |
| 2027-05-21 | Glasgow | Celtic Park | Oasis | [tm-oasis-2027-glasgow-1adfz_3gknft-og](https://www.ticketmaster.co.uk/oasis-live-27-glasgow-21-05-2027/event/3500652A88FE1835) | 2026-10-15 (day) |
| 2027-05-21 | Birmingham | Utilita Arena Birmingham | Weezer | [tm-weezer-2027-birmingham-1anzkf7gkdaoymm](https://www.ticketmaster.co.uk/weezer-birmingham-21-05-2027/event/23006504C9470BAE) | 2026-10-18 (day) |
| 2027-05-22 | Leeds | Leeds First Direct Bank Arena | Nickelback | [tm-nickelback-2027-leeds-g5vhz_flmspew](https://www.ticketmaster.co.uk/nickelback-everything-under-the-sun-tour-leeds-22-05-2027/event/1F006547F7CD69F2) | 2026-10-18 (day) |
| 2027-05-22 | London | Alexandra Palace | Weezer | [tm-weezer-2027-london-g5vhz_83wtacz](https://www.ticketmaster.co.uk/weezer-london-22-05-2027/event/1F006504BDA453B8) | 2026-10-18 (day) |
| 2027-05-23 | Glasgow | Celtic Park | Oasis | [tm-oasis-2027-glasgow-1agzkfwgkd1ybno](https://www.ticketmaster.co.uk/oasis-live-27-glasgow-23-05-2027/event/35006532CAE588E0) | 2026-10-15 (day) |
| 2027-05-23 | Cardiff | Utilita Arena Cardiff | Weezer | [tm-weezer-2027-cardiff-1auzkf7gkevbx3b](https://www.ticketmaster.co.uk/weezer-cardiff-23-05-2027/event/36006504B4EA24BA) | 2026-10-18 (day) |
| 2027-05-24 | London | The O2 | Nickelback | [tm-nickelback-2027-london-1agzk46gkddli7z](https://www.ticketmaster.co.uk/nickelback-everything-under-the-sun-tour-london-24-05-2027/event/35006547C37E8138) | 2026-10-18 (day) |
| 2027-05-25 | Glasgow | Celtic Park | Oasis | [tm-oasis-2027-glasgow-1agzkfwgkd5kfpx](https://www.ticketmaster.co.uk/oasis-live-27-glasgow-25-05-2027/event/35006532CB4C8962) | 2026-10-15 (day) |
| 2027-05-25 | London | The O2 | Nickelback | [tm-nickelback-2027-london-1agzk46gkdjr1bv](https://www.ticketmaster.co.uk/nickelback-everything-under-the-sun-tour-london-25-05-2027/event/35006547E6BCA601) | 2026-10-18 (day) |
| 2027-05-28 | Glasgow | Celtic Park | Oasis | [tm-oasis-2027-glasgow-1agzkfwgkd5pben](https://www.ticketmaster.co.uk/oasis-live-27-glasgow-28-05-2027/event/35006532CB9589E3) | 2026-10-15 (day) |
| 2027-05-28 | Birmingham | Utilita Arena Birmingham | Nickelback | [tm-nickelback-2027-birmingham-1kfyvp3_gagcomu](https://www.ticketmaster.co.uk/nickelback-everything-under-the-sun-tour-birmingham-28-05-2027/event/230065499CB60DF6) | 2026-10-18 (day) |
| 2027-05-28 | Manchester | Co-op Live | Tame Impala | [tm-tame-impala-2027-manchester-1amzkf4gkemyn8u](https://www.ticketmaster.co.uk/tame-impala-deadbeat-euuk-tour-2027-manchester-28-05-2027/event/37006515B7C2A40D) | 2026-10-15 (day) |
| 2027-05-28 | London | The O2 | Greta Van Fleet | [tm-greta-van-fleet-2027-london-1adfz_kgkmuet5g](https://www.ticketmaster.co.uk/greta-van-fleet-into-the-beginning-london-28-05-2027/event/3500653DF69FF2F5) | 2026-10-15 (day) |
| 2027-05-29 | Glasgow | Celtic Park | Oasis | [tm-oasis-2027-glasgow-1agzkfwgkdu5imb](https://www.ticketmaster.co.uk/oasis-live-27-glasgow-29-05-2027/event/35006532CD2E8B98) | 2026-10-15 (day) |
| 2027-05-29 | Manchester | Co-op Live | Tame Impala | [tm-tame-impala-2027-manchester-1amzkf_gkdr-2ec](https://www.ticketmaster.co.uk/tame-impala-deadbeat-euuk-tour-2027-manchester-29-05-2027/event/37006519DE84F9ED) | 2026-10-15 (day) |
| 2027-05-30 | Birmingham | Utilita Arena Birmingham | Greta Van Fleet | [tm-greta-van-fleet-2027-birmingham-1aegz_kgkmz0sov](https://www.ticketmaster.co.uk/greta-van-fleet-into-the-beginning-birmingham-30-05-2027/event/2300653DF8931441) | 2026-10-15 (day) |
| 2027-06-01 | Glasgow | OVO Hydro | Nickelback | [tm-nickelback-2027-glasgow-1auzk46gkexekqz](https://www.ticketmaster.co.uk/nickelback-everything-under-the-sun-tour-glasgow-01-06-2027/event/36006547BE9C6740) | 2026-10-18 (day) |
| 2027-06-01 | London | The O2 | Tame Impala | [tm-tame-impala-2027-london-16dfz_ofpg7t8j2](https://www.ticketmaster.co.uk/tame-impala-deadbeat-euuk-tour-2027-london-01-06-2027/event/3500651525FD098F) | 2026-10-15 (day) |
| 2027-06-01 | Manchester | Co-op Live | Greta Van Fleet | [tm-greta-van-fleet-2027-manchester-1adjz_kgkbyud70](https://www.ticketmaster.co.uk/greta-van-fleet-into-the-beginning-manchester-01-06-2027/event/3700653EB0D83124) | 2026-10-15 (day) |
| 2027-06-02 | London | The O2 | Tame Impala | [tm-tame-impala-2027-london-16dfz_ofjg7iyih](https://www.ticketmaster.co.uk/tame-impala-deadbeat-euuk-tour-2027-london-02-06-2027/event/3500651526A30A1B) | 2026-10-15 (day) |
| 2027-06-02 | Glasgow | OVO Hydro | Greta Van Fleet | [tm-greta-van-fleet-2027-glasgow-1auzkfugkd_hipm](https://www.ticketmaster.co.uk/greta-van-fleet-into-the-beginning-glasgow-02-06-2027/event/36006536D9F285AE) | 2026-10-18 (day) |
| 2027-06-02 | Manchester | Co-op Live | Nickelback | [tm-nickelback-2027-manchester-1amzk46gkdgpim1](https://www.ticketmaster.co.uk/nickelback-everything-under-the-sun-tour-manchester-02-06-2027/event/37006547CC5A8DCA) | 2026-10-18 (day) |
| 2027-06-03 | London | The O2 | Tame Impala | [tm-tame-impala-2027-london-1agzkfbgkdvvzlq](https://www.ticketmaster.co.uk/tame-impala-deadbeat-euuk-tour-2027-london-03-06-2027/event/35006518F4D387DA) | 2026-10-15 (day) |
| 2027-06-04 | Manchester | Etihad Stadium | Oasis | [tm-oasis-2027-manchester-g5dzz_3lwzpdp](https://www.ticketmaster.co.uk/oasis-live-27-manchester-04-06-2027/event/3E00652AF20160D6) | 2026-10-15 (day) |
| 2027-06-06 | Manchester | Etihad Stadium | Oasis | [tm-oasis-2027-manchester-g5dzz_3lmyj87](https://www.ticketmaster.co.uk/oasis-live-27-manchester-06-06-2027/event/3E00652AF7E66404) | 2026-10-15 (day) |
| 2027-06-08 | Manchester | Etihad Stadium | Oasis | [tm-oasis-2027-manchester-g5dzz_3lbuu4c](https://www.ticketmaster.co.uk/oasis-live-27-manchester-08-06-2027/event/3E00652AFA37656D) | 2026-10-15 (day) |
| 2027-06-11 | Manchester | Etihad Stadium | Oasis | [tm-oasis-2027-manchester-g5dzz_3lwcjqy](https://www.ticketmaster.co.uk/oasis-live-27-manchester-11-06-2027/event/3E00652AFD3A6770) | 2026-10-15 (day) |
| 2027-06-12 | Manchester | Etihad Stadium | Oasis | [tm-oasis-2027-manchester-g5dzz_3lxmu-j](https://www.ticketmaster.co.uk/oasis-live-27-manchester-12-06-2027/event/3E00652AFEBB6866) | 2026-10-15 (day) |
| 2027-06-15 | Manchester | Etihad Stadium | Oasis | [tm-oasis-2027-manchester-g5dzz_3nq9ecb](https://www.ticketmaster.co.uk/oasis-live-27-manchester-15-06-2027/event/3E00652A9A5C2B58) | 2026-10-15 (day) |
| 2027-06-18 | Manchester | Etihad Stadium | Oasis | [tm-oasis-2027-manchester-g5dzz_3lv67ao](https://www.ticketmaster.co.uk/oasis-live-27-manchester-18-06-2027/event/3E00652AC11C4260) | 2026-10-15 (day) |
| 2027-06-19 | Glasgow | Bellahouston Park | Sombr | [tm-sombr-2027-glasgow-1auzkfbgkeiqyo0](https://www.ticketmaster.co.uk/glasgow-summer-sessions-sombr-you-are-glasgow-19-06-2027/event/36006518AC6B9824) | 2026-10-15 (day) |
| 2027-06-19 | Manchester | Etihad Stadium | Oasis | [tm-oasis-2027-manchester-g5dzz_3l--ppl](https://www.ticketmaster.co.uk/oasis-live-27-manchester-19-06-2027/event/3E00652AE186559F) | 2026-10-15 (day) |
| 2027-06-21 | London | The O2 | Sombr | [tm-sombr-2027-london-1adfz_ogkwyrfux](https://www.ticketmaster.co.uk/sombr-you-are-the-reason-tour-london-21-06-2027/event/3500651CB0788DBE) | 2026-10-15 (day) |
| 2027-06-22 | Manchester | Etihad Stadium | Oasis | [tm-oasis-2027-manchester-g5dzz_3l0pglg](https://www.ticketmaster.co.uk/oasis-live-27-manchester-22-06-2027/event/3E00652AE49757CC) | 2026-10-15 (day) |
| 2027-06-22 | London | The O2 | Sombr | [tm-sombr-2027-london-1adfz_ogklwvhfa](https://www.ticketmaster.co.uk/sombr-you-are-the-reason-tour-london-22-06-2027/event/3500651AF207C509) | 2026-10-15 (day) |
| 2027-06-23 | Glasgow | OVO Hydro | Hayley Williams | [tm-hayley-williams-2027-glasgow-1auzkf-gkd-5zto](https://www.ticketmaster.co.uk/the-hayley-williams-show-glasgow-23-06-2027/event/36006521E12F8A60) | 2026-10-16 (day) |
| 2027-06-24 | London | The O2 | Sombr | [tm-sombr-2027-london-1adfz_ogkwskt7w](https://www.ticketmaster.co.uk/sombr-you-are-the-reason-tour-london-24-06-2027/event/3500651CB34E913D) | 2026-10-15 (day) |
| 2027-06-25 | Manchester | Etihad Stadium | Oasis | [tm-oasis-2027-manchester-g5dzz_3ljog0t](https://www.ticketmaster.co.uk/oasis-live-27-manchester-25-06-2027/event/3E00652AE6835929) | 2026-10-15 (day) |
| 2027-06-25 | London | The O2 | Sombr | [tm-sombr-2027-london-1adfz_ogkwy2ti0](https://www.ticketmaster.co.uk/sombr-you-are-the-reason-tour-london-25-06-2027/event/3500651CB93E9B24) | 2026-10-15 (day) |
| 2027-06-26 | Manchester | Etihad Stadium | Oasis | [tm-oasis-2027-manchester-g5dzz_3lnpprv](https://www.ticketmaster.co.uk/oasis-live-27-manchester-26-06-2027/event/3E00652AEA965BC1) | 2026-10-15 (day) |
| 2027-06-29 | Cardiff | Blackweir Fields, Cardiff | Fontaines D.C. | [tm-fontaines-d-c-2027-cardiff-g5vhz_oiinrjk](https://www.ticketmaster.co.uk/fontaines-dc-cardiff-29-06-2027/event/1F00651B2C8DE986) | 2026-10-15 (day) |
| 2027-06-29 | Glasgow | Galvanizers Yard SWG3 | Amble | [tm-amble-2027-glasgow-17uov0g62brrf6b](https://www.ticketmaster.co.uk/amble-love-and-all-its-wares-glasgow-29-06-2027/event/360064FE9EBD41FA) | 2026-10-15 (day) |
| 2027-06-29 | London | The O2 | Sombr | [tm-sombr-2027-london-1adfz_ogkwwynfm](https://www.ticketmaster.co.uk/sombr-you-are-the-reason-tour-london-29-06-2027/event/3500651CBDE6A237) | 2026-10-15 (day) |
| 2027-06-30 | Cardiff | Utilita Arena Cardiff | Hayley Williams | [tm-hayley-williams-2027-cardiff-1adbz_ogkwuumuk](https://www.ticketmaster.co.uk/the-hayley-williams-show-cardiff-30-06-2027/event/3600651C8DDB7D86) | 2026-10-16 (day) |
| 2027-07-01 | Newcastle Upon Tyne | St James Park | Fontaines D.C. | [tm-fontaines-d-c-2027-newcastle-upon-tyne-1adfz_ogkm3hlfk](https://www.ticketmaster.co.uk/fontaines-dc-newcastle-upon-tyne-01-07-2027/event/3500651DD2F2B513) | 2026-10-15 (day) |
| 2027-07-02 | London | Royal Albert Hall | Pink Martini | [tm-pink-martini-2027-london-g5vhz_fqbbwez](https://www.ticketmaster.co.uk/pink-martini-london-02-07-2027/event/1F00654698EB20B8) | 2026-10-15 (day) |
| 2027-07-03 | Manchester | Heaton Park | Fontaines D.C. | [tm-fontaines-d-c-2027-manchester-g5dzz_omjzv0z](https://www.ticketmaster.co.uk/fontaines-dc-manchester-03-07-2027/event/3E00651BA6E01938) | 2026-10-15 (day) |
| 2027-07-03 | London | Wembley Stadium | Slipknot | [tm-slipknot-2027-london-1anzkfggkdhuzzd](https://www.ticketmaster.co.uk/slipknot-sicest-stadium-tour-london-03-07-2027/event/23006535DBD80E3B) | 2026-10-15 (day) |
| 2027-07-03 | Liverpool | Liverpool Philharmonic Hall | Pink Martini | [tm-pink-martini-2027-liverpool-g5vhz_fpr6w_w](https://www.ticketmaster.co.uk/pink-martini-liverpool-03-07-2027/event/1F0065459E1F267D) | 2026-10-15 (day) |
| 2027-07-04 | Manchester | Heaton Park | Fontaines D.C. | [tm-fontaines-d-c-2027-manchester-g5dzz_osdpprt](https://www.ticketmaster.co.uk/fontaines-dc-manchester-04-07-2027/event/3E00651CC35A57A9) | 2026-10-15 (day) |
| 2027-07-04 | Edinburgh | Usher Hall | Pink Martini | [tm-pink-martini-2027-edinburgh-1auzk4agkdmo6dj](https://www.ticketmaster.co.uk/pink-martini-edinburgh-04-07-2027/event/36006545EE447EE6) | 2026-10-15 (day) |
| 2027-07-06 | Glasgow | Glasgow Green | Fontaines D.C. | [tm-fontaines-d-c-2027-glasgow-1adbz_ogkrs74cl](https://www.ticketmaster.co.uk/fontaines-dc-glasgow-06-07-2027/event/3600651BF31153AB) | 2026-10-15 (day) |
| 2027-07-06 | London | Tottenham Hotspur Stadium | Karol G | [tm-karol-g-2027-london-1agzk3ogkddbuhf](https://www.ticketmaster.co.uk/karol-g-viajando-por-el-mundo-london-06-07-2027/event/35006491FBEB66D4) | 2026-10-15 (day) |
| 2027-07-08 | Manchester | Castlefield Bowl | Amble | [tm-amble-2027-manchester-g5vhz_8upt3w4](https://www.ticketmaster.co.uk/amble-love-and-all-its-wares-manchester-08-07-2027/event/1F00650D96FD2F55) | 2026-10-15 (day) |
| 2027-07-09 | London | Alexandra Palace Park | Amble | [tm-amble-2027-london-g5vhz_8sflgki](https://www.ticketmaster.co.uk/amble-love-and-all-its-wares-london-09-07-2027/event/1F00650CC87F51A8) | 2026-10-15 (day) |
| 2027-07-09 | London | London Stadium | Fontaines D.C. | [tm-fontaines-d-c-2027-london-1ku8vpf_ga19knu](https://www.ticketmaster.co.uk/fontaines-dc-london-09-07-2027/event/350065219A5D38CD) | 2026-10-15 (day) |
| 2027-07-13 | Glasgow | Barclays Hampden | Noah Kahan | [tm-noah-kahan-2027-glasgow-1adbz_8gkufqoce](https://www.ticketmaster.co.uk/noah-kahan-the-last-of-the-glasgow-13-07-2027/event/3600650D94751B67) | 2026-10-15 (day) |
| 2027-07-23 | London | Wembley Stadium | Noah Kahan | [tm-noah-kahan-2027-london-1anzkf3gkd7-b4s](https://www.ticketmaster.co.uk/noah-kahan-the-last-of-the-london-23-07-2027/event/23006512C487A573) | 2026-10-15 (day) |
| 2027-07-24 | London | Wembley Stadium | Noah Kahan | [tm-noah-kahan-2027-london-1anzkf4gkexwogg](https://www.ticketmaster.co.uk/noah-kahan-the-last-of-the-london-24-07-2027/event/23006515BECA0D4C) | 2026-10-15 (day) |
| 2027-07-25 | London | Wembley Stadium | Noah Kahan | [tm-noah-kahan-2027-london-1anzkf4gkddlzu_](https://www.ticketmaster.co.uk/noah-kahan-the-last-of-the-london-25-07-2027/event/23006515C37C0D99) | 2026-10-15 (day) |
| 2027-08-25 | London | Wembley Stadium | Harry Styles | [tm-harry-styles-2027-london-1aegz_8gkdalwdz](https://www.ticketmaster.co.uk/harry-styles-together-together-london-25-08-2027/event/2300650EC5AF20F8) | 2026-10-15 (day) |
| 2027-08-27 | London | Wembley Stadium | Harry Styles | [tm-harry-styles-2027-london-1anzkfigkew9djd](https://www.ticketmaster.co.uk/harry-styles-together-together-london-27-08-2027/event/23006528B25C373B) | 2026-10-15 (day) |
| 2027-08-28 | London | Wembley Stadium | Harry Styles | [tm-harry-styles-2027-london-1anzkfigkeycdjb](https://www.ticketmaster.co.uk/harry-styles-together-together-london-28-08-2027/event/23006528B9383998) | 2026-10-15 (day) |
| 2027-09-11 | Stevenage | Knebworth | Oasis | [tm-oasis-2027-stevenage-1adjz_3gklfny3e](https://www.ticketmaster.co.uk/oasis-live-27-stevenage-11-09-2027/event/3700652AD4AB9482) | 2026-10-15 (day) |
| 2027-09-11 | Glasgow | O2 Academy Glasgow | Passenger | [tm-passenger-2027-glasgow-g5dzz_8wyqwf1](https://www.ticketmaster.co.uk/passenger-glasgow-11-09-2027/event/3E00650CB077220A) | 2026-10-15 (day) |
| 2027-09-12 | Stevenage | Knebworth | Oasis | [tm-oasis-2027-stevenage-1adjz_3gkrrmy7n](https://www.ticketmaster.co.uk/oasis-live-27-stevenage-12-09-2027/event/3700652BDEBB9123) | 2026-10-15 (day) |
| 2027-09-12 | Edinburgh | Usher Hall | Passenger | [tm-passenger-2027-edinburgh-1adbz_8gks0vdnw](https://www.ticketmaster.co.uk/passenger-edinburgh-12-09-2027/event/3600650CE407B8FD) | 2026-10-15 (day) |
| 2027-09-14 | Newcastle Upon Tyne | O2 City Hall Newcastle | Passenger | [tm-passenger-2027-newcastle-upon-tyne-g5dzz_o6adefx](https://www.ticketmaster.co.uk/passenger-newcastle-upon-tyne-14-09-2027/event/3E006511C90C223E) | 2026-10-15 (day) |
| 2027-09-15 | Manchester | O2 Apollo Manchester | Passenger | [tm-passenger-2027-manchester-17uov0g62wjanur](https://www.ticketmaster.co.uk/passenger-manchester-15-09-2027/event/360064FC9C26336F) | 2026-10-15 (day) |
| 2027-09-17 | London | Eventim Apollo | Passenger | [tm-passenger-2027-london-1auzkf3gkd0sykm](https://www.ticketmaster.co.uk/passenger-london-17-09-2027/event/36006512E4CF91AE) | 2026-10-15 (day) |
| 2027-09-18 | Stevenage | Knebworth | Oasis | [tm-oasis-2027-stevenage-1adjz_3gkrnjt4_](https://www.ticketmaster.co.uk/oasis-live-27-stevenage-18-09-2027/event/3700652BE39A9559) | 2026-10-15 (day) |
| 2027-09-19 | Stevenage | Knebworth | Oasis | [tm-oasis-2027-stevenage-1adjz_3gkreiyj0](https://www.ticketmaster.co.uk/oasis-live-27-stevenage-19-09-2027/event/3700652BE7A399A4) | 2026-10-15 (day) |
| 2027-09-21 | Exeter | The Great Hall, Exeter | Passenger | [tm-passenger-2027-exeter-g5vhz_o2o0irs](https://www.ticketmaster.co.uk/passenger-exeter-21-09-2027/event/1F006513E0928BF1) | 2026-10-15 (day) |
| 2027-09-24 | Birmingham | O2 Academy Birmingham | Passenger | [tm-passenger-2027-birmingham-g5dzz_2wg0-vu](https://www.ticketmaster.co.uk/passenger-birmingham-24-09-2027/event/3E0064FC8C92104D) | 2026-10-15 (day) |
| 2027-09-25 | Stevenage | Knebworth | Oasis | [tm-oasis-2027-stevenage-1adjz_3gkrs3n_k](https://www.ticketmaster.co.uk/oasis-live-27-stevenage-25-09-2027/event/3700652BF34AA653) | 2026-10-15 (day) |
| 2027-09-25 | Brighton | Brighton Dome | Passenger | [tm-passenger-2027-brighton-g5vhz_o5oziab](https://www.ticketmaster.co.uk/passenger-brighton-25-09-2027/event/1F006512E002817A) | 2026-10-15 (day) |
| 2027-09-26 | Stevenage | Knebworth | Oasis | [tm-oasis-2027-stevenage-1adjz_3gkrz1qva](https://www.ticketmaster.co.uk/oasis-live-27-stevenage-26-09-2027/event/3700652BF829AD09) | 2026-10-15 (day) |
| 2027-09-29 | Birmingham | Utilita Arena Birmingham | Andrea Bocelli | [tm-andrea-bocelli-2027-birmingham-1aegz_kgkwagold](https://www.ticketmaster.co.uk/andrea-bocelli-birmingham-29-09-2027/event/2300653C85D60AC3) | 2026-10-15 (day) |
| 2027-10-01 | London | The O2 | Andrea Bocelli | [tm-andrea-bocelli-2027-london-1adfz_kgkbcpkr9](https://www.ticketmaster.co.uk/andrea-bocelli-london-01-10-2027/event/3500653E8E593797) | 2026-10-15 (day) |
| 2027-10-05 | Manchester | Co-op Live | Andrea Bocelli | [tm-andrea-bocelli-2027-manchester-1amzkfzgkd7qkyk](https://www.ticketmaster.co.uk/andrea-bocelli-romanza-30th-anniversary-manchester-05-10-2027/event/37006538C4746C13) | 2026-10-15 (day) |
| 2027-10-09 | Glasgow | OVO Hydro | Andrea Bocelli | [tm-andrea-bocelli-2027-glasgow-1adbz_k03jdzd5av](https://www.ticketmaster.co.uk/andrea-bocelli-romanza-30th-anniversary-glasgow-09-10-2027/event/3600653912983A40) | 2026-10-15 (day) |

## Possible local PR angles — withheld

- London: a local 2027 concert-planning story could examine the 70 recorded performances from 37 artists across 16 venues in this TTC sample. Verify the programme with those venues. No regional winner, national superlative or popularity claim is supported. Broader coverage and publication rights are required.
- Manchester: a local 2027 concert-planning story could examine the 48 recorded performances from 30 artists across 12 venues in this TTC sample. Verify the programme with those venues. No regional winner, national superlative or popularity claim is supported. Broader coverage and publication rights are required.
- Glasgow: a local 2027 concert-planning story could examine the 35 recorded performances from 27 artists across 11 venues in this TTC sample. Verify the programme with those venues. No regional winner, national superlative or popularity claim is supported. Broader coverage and publication rights are required.
- Birmingham: a local 2027 concert-planning story could examine the 18 recorded performances from 18 artists across 5 venues in this TTC sample. Verify the programme with those venues. No regional winner, national superlative or popularity claim is supported. Broader coverage and publication rights are required.
- Cardiff: a local 2027 concert-planning story could examine the 7 recorded performances from 7 artists across 4 venues in this TTC sample. Verify the programme with those venues. No regional winner, national superlative or popularity claim is supported. Broader coverage and publication rights are required.
- Stevenage: one tracked artist accounts for this sample's 6 performances. Explore the confirmed run of dates with the venue before developing a local programme story. No regional winner, national superlative or popularity claim is supported. Broader coverage and publication rights are required.
- Edinburgh: a local 2027 concert-planning story could examine the 4 recorded performances from 3 artists across 2 venues in this TTC sample. Verify the programme with those venues. No regional winner, national superlative or popularity claim is supported. Broader coverage and publication rights are required.
- Leeds: a local 2027 concert-planning story could examine the 4 recorded performances from 4 artists across 2 venues in this TTC sample. Verify the programme with those venues. No regional winner, national superlative or popularity claim is supported. Broader coverage and publication rights are required.
- Newcastle Upon Tyne: a local 2027 concert-planning story could examine the 4 recorded performances from 4 artists across 3 venues in this TTC sample. Verify the programme with those venues. No regional winner, national superlative or popularity claim is supported. Broader coverage and publication rights are required.
- Nottingham: a local 2027 concert-planning story could examine the 2 recorded performances from 2 artists across 1 venues in this TTC sample. Verify the programme with those venues. No regional winner, national superlative or popularity claim is supported. Broader coverage and publication rights are required.
- Brighton: one tracked artist accounts for this sample's 1 performances. Explore the confirmed run of dates with the venue before developing a local programme story. No regional winner, national superlative or popularity claim is supported. Broader coverage and publication rights are required.
- Bristol: one tracked artist accounts for this sample's 1 performances. Explore the confirmed run of dates with the venue before developing a local programme story. No regional winner, national superlative or popularity claim is supported. Broader coverage and publication rights are required.
- Exeter: one tracked artist accounts for this sample's 1 performances. Explore the confirmed run of dates with the venue before developing a local programme story. No regional winner, national superlative or popularity claim is supported. Broader coverage and publication rights are required.
- Liverpool: one tracked artist accounts for this sample's 1 performances. Explore the confirmed run of dates with the venue before developing a local programme story. No regional winner, national superlative or popularity claim is supported. Broader coverage and publication rights are required.

## Reproduce and verify

Input revision: 04d67ee63ebcc1f69bc629ca093bb0fd80cf0434

- public/data/events.json: SHA-256 97aae3ae5ac1dbe8a494e43b68d1ad66934b9efc88852e77936a3d6248b08e83
- public/data/artists.json: SHA-256 e0b32db6aa7d6eab154f187e960077eba14ad97aaadd3a108d648cc270cb05b5

`npm run research:uk-concerts -- --revision 04d67ee63ebcc1f69bc629ca093bb0fd80cf0434 --snapshot-at 2026-10-23T18:08:39Z --output /tmp/ttc-uk-concert-review`

Review report.json, group supporting_events by city and count performances; compare those totals with rankings. Check excluded decisions against the pinned source records. A later snapshot may exclude older observations; a rerun does not reverify them.
