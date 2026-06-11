# SeatGeek CTA auto-add log

Generated: 2026-06-11T09:32:43.450Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: false
- API access with client ID only: HTTP 200
- Total events in data: 329
- Ticketmaster-sourced events eligible for SeatGeek enrichment: 329
- Ticketmaster-verified events: 264
- Events carrying a valid SeatGeek URL before this run: 180
- Events carrying a valid SeatGeek URL after this run: 226
- Ticketmaster-sourced events carrying a valid SeatGeek URL before this run: 180
- Ticketmaster-sourced events carrying a valid SeatGeek URL after this run: 226
- Ticketmaster-sourced events missing a valid SeatGeek URL before this run: 149
- Ticketmaster-sourced events missing a valid SeatGeek URL after this run: 103
- Ticketmaster-verified events carrying a valid SeatGeek URL before this run: 176
- Ticketmaster-verified events carrying a valid SeatGeek URL after this run: 177
- Ticketmaster-verified events missing a valid SeatGeek URL before this run: 88
- Ticketmaster-verified events missing a valid SeatGeek URL after this run: 87
- Events selected/logged by this run: 149
- Events checked by this run: 149
- API calls made: 894
- Rate-limit responses: 0
- URLs added: 46
- Events skipped: 103
- no_candidates_returned: 101
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: 
- Next recommended resume command: 
- Accepted venue mismatches: 0
- Accepted missing-timezone date adjustments: 4
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 101
- city_or_metro_match_failed: 2

## Interpretation

- `URLs added: 46` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 180 event(s) carried valid SeatGeek URLs before this run; 226 carry valid SeatGeek URLs after this run.
- This run queried the 149 Ticketmaster-sourced event(s) that were still missing a valid `seatgeek_url` at the start of the run.
- SeatGeek returned high-confidence API matches for 46 of those events; the remaining 103 Ticketmaster-sourced event(s) still lack a safe event-level SeatGeek URL.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-olivia-rodrigo-2026-sunrise-z7r9jz1a7067o | Olivia Rodrigo | 2026-11-21 | Sunrise | https://seatgeek.com/olivia-rodrigo-tickets/sunrise-florida-amerant-bank-arena-2026-11-20-7-pm/concert/18208620 |
| tm-olivia-rodrigo-2026-las-vegas-z7r9jz1a706kf | Olivia Rodrigo | 2026-12-21 | Las Vegas | https://seatgeek.com/olivia-rodrigo-tickets/las-vegas-nevada-t-mobile-arena-2026-12-20-7-pm/concert/18211723 |
| tm-bruno-mars-2026-colorado-springs-z7r9jz1a7ox8i | Bruno Mars | 2026-09-28 | Colorado Springs | https://seatgeek.com/bruno-mars-tickets/colorado-springs-colorado-falcon-stadium-2026-09-27-7-pm/concert/18013502 |
| tm-shakira-2026-inglewood-vv1aazkovgkdf4iwr | Shakira | 2026-06-13 | Inglewood | https://seatgeek.com/shakira-tickets/inglewood-california-intuit-dome-2026-06-13-7-30-pm/concert/18157383 |
| tm-shakira-2026-inglewood-vv1aazkovgkdf_jwm | Shakira | 2026-06-14 | Inglewood | https://seatgeek.com/shakira-tickets/inglewood-california-intuit-dome-2026-06-14-7-30-pm/concert/18157382 |
| tm-shakira-2026-san-jose-g5vyz_663mr7p | Shakira | 2026-06-19 | San Jose | https://seatgeek.com/shakira-tickets/san-jose-california-sap-center-at-san-jose-2026-06-19-7-30-pm/concert/18157391 |
| tm-shakira-2026-san-jose-g5vyz_6x6bktl | Shakira | 2026-06-20 | San Jose | https://seatgeek.com/shakira-tickets/san-jose-california-sap-center-at-san-jose-2026-06-20-7-30-pm/concert/18225032 |
| tm-shakira-2026-dallas-vvg1yz_6c939ia | Shakira | 2026-06-23 | Dallas | https://seatgeek.com/shakira-tickets/dallas-texas-american-airlines-center-2026-06-23-7-30-pm/concert/18157392 |
| tm-shakira-2026-atlanta-vvg1zz_66u4nyt | Shakira | 2026-06-26 | Atlanta | https://seatgeek.com/shakira-tickets/atlanta-georgia-state-farm-arena-1-2026-06-26-7-30-pm/concert/18157394 |
| tm-shakira-2026-atlanta-vvg1zz_f6arur7 | Shakira | 2026-06-28 | Atlanta | https://seatgeek.com/shakira-tickets/atlanta-georgia-state-farm-arena-1-2026-06-28-7-30-pm/concert/18225030 |
| tm-shakira-2026-miami-vvg1vz_6knubnj | Shakira | 2026-07-01 | Miami | https://seatgeek.com/shakira-tickets/miami-florida-kaseya-center-2026-07-01-7-30-pm/concert/18157395 |
| tm-shakira-2026-miami-vvg1vz_6r8_upj | Shakira | 2026-07-02 | Miami | https://seatgeek.com/shakira-tickets/miami-florida-kaseya-center-2026-07-02-7-30-pm/concert/18225031 |
| tm-shakira-2026-baltimore-1a4zkosgf76zecv | Shakira | 2026-07-06 | Baltimore | https://seatgeek.com/shakira-tickets/baltimore-maryland-cfg-bank-arena-2026-07-06-7-30-pm/concert/18157397 |
| tm-shakira-2026-boston-vv1avzkosgkdb5unc | Shakira | 2026-07-10 | Boston | https://seatgeek.com/shakira-tickets/boston-massachusetts-td-garden-2026-07-10-7-30-pm/concert/18157398 |
| tm-shakira-2026-boston-vv177z_6gkrmuczn | Shakira | 2026-07-11 | Boston | https://seatgeek.com/shakira-tickets/boston-massachusetts-td-garden-2026-07-11-7-30-pm/concert/18225033 |
| tm-shakira-2026-newark-vv1aezkosgketdd_b | Shakira | 2026-07-14 | Newark | https://seatgeek.com/shakira-tickets/newark-new-jersey-prudential-center-2026-07-14-7-30-pm/concert/18157380 |
| tm-shakira-2026-brooklyn-1ayzkosgkdghkeg | Shakira | 2026-07-20 | Brooklyn | https://seatgeek.com/shakira-tickets/brooklyn-new-york-barclays-center-2026-07-20-7-30-pm/concert/18157379 |
| tm-shakira-2026-brooklyn-1adzz_6gktq1p0z | Shakira | 2026-07-21 | Brooklyn | https://seatgeek.com/shakira-tickets/brooklyn-new-york-barclays-center-2026-07-21-7-30-pm/concert/18225034 |
| tm-shakira-2026-atlantic-city-vv17fz_6gkb5efrp | Shakira | 2026-07-25 | Atlantic City | https://seatgeek.com/shakira-tickets/atlantic-city-new-jersey-boardwalk-hall-2026-07-25-7-30-pm/concert/18157403 |
| tm-ed-sheeran-2026-glendale-z7r9jz1a7jm | Ed Sheeran | 2026-06-14 | Glendale | https://seatgeek.com/ed-sheeran-tickets/glendale-arizona-state-farm-stadium-2026-06-13-5-30-pm/concert/17724383 |
| tm-ed-sheeran-2026-nashville-z7r9jz1a7js | Ed Sheeran | 2026-06-20 | Nashville | https://seatgeek.com/ed-sheeran-tickets/nashville-tennessee-nissan-stadium-2026-06-20-5-30-pm/concert/17722014 |
| tm-ed-sheeran-2026-milwaukee-0700632fb5d7362c | Ed Sheeran | 2026-06-25 | Milwaukee | https://seatgeek.com/ed-sheeran-tickets/milwaukee-wisconsin-american-family-insurance-amphitheater-summerfest-grounds-2026-06-25-7-30-pm/concert/17738440 |
| tm-ed-sheeran-2026-chicago-04006331fcb85a8a | Ed Sheeran | 2026-06-27 | Chicago | https://seatgeek.com/ed-sheeran-tickets/chicago-illinois-soldier-field-2026-06-27-5-30-pm/concert/17738438 |
| tm-ed-sheeran-2026-denver-1e006330c3b936ad | Ed Sheeran | 2026-07-04 | Denver | https://seatgeek.com/ed-sheeran-tickets/denver-colorado-empower-field-at-mile-high-2026-07-04-5-30-pm/concert/17738439 |
| tm-ed-sheeran-2026-las-vegas-1700632f29ecabed | Ed Sheeran | 2026-07-18 | Las Vegas | https://seatgeek.com/ed-sheeran-tickets/las-vegas-nevada-allegiant-stadium-2026-07-18-5-30-pm/concert/17738441 |
| tm-ed-sheeran-2026-san-diego-0a006331da303659 | Ed Sheeran | 2026-07-21 | San Diego | https://seatgeek.com/ed-sheeran-tickets/san-diego-california-petco-park-2026-07-21-5-30-pm/concert/17738442 |
| tm-ed-sheeran-2026-santa-clara-1c006331c1a54d19 | Ed Sheeran | 2026-07-25 | Santa Clara | https://seatgeek.com/ed-sheeran-tickets/santa-clara-california-levi-s-stadium-2026-07-25-5-30-pm/concert/17738443 |
| tm-ed-sheeran-2026-seattle-0f00632ea04f19df | Ed Sheeran | 2026-08-01 | Seattle | https://seatgeek.com/ed-sheeran-tickets/seattle-washington-lumen-field-2026-08-01-5-30-pm/concert/17738449 |
| tm-ed-sheeran-2026-inglewood-0a006331dc273765 | Ed Sheeran | 2026-08-08 | Inglewood | https://seatgeek.com/ed-sheeran-tickets/inglewood-california-sofi-stadium-2026-08-08-5-30-pm/concert/17738451 |
| tm-ed-sheeran-2026-minneapolis-0600632e29196b3e | Ed Sheeran | 2026-08-15 | Minneapolis | https://seatgeek.com/ed-sheeran-tickets/minneapolis-minnesota-u-s-bank-stadium-2026-08-15-5-30-pm/concert/17738452 |
| tm-ed-sheeran-2026-toronto-1000632fe9bb4345 | Ed Sheeran | 2026-08-20 | Toronto | https://seatgeek.com/ed-sheeran-tickets/toronto-canada-rogers-centre-2026-08-20-5-30-pm/concert/17751967 |
| tm-ed-sheeran-2026-toronto-1000632fe9c34349 | Ed Sheeran | 2026-08-21 | Toronto | https://seatgeek.com/ed-sheeran-tickets/toronto-canada-rogers-centre-2026-08-21-5-30-pm/concert/17738477 |
| tm-ed-sheeran-2026-toronto-1000632fe9ca4361 | Ed Sheeran | 2026-08-22 | Toronto | https://seatgeek.com/ed-sheeran-tickets/toronto-canada-rogers-centre-2026-08-22-5-30-pm/concert/17738478 |
| tm-ed-sheeran-2026-detroit-0800632ca3272367 | Ed Sheeran | 2026-08-29 | Detroit | https://seatgeek.com/ed-sheeran-tickets/detroit-michigan-ford-field-2026-08-29-5-30-pm/concert/17738481 |
| tm-ed-sheeran-2026-east-rutherford-00006331cc3a2a14 | Ed Sheeran | 2026-09-04 | East Rutherford | https://seatgeek.com/ed-sheeran-tickets/east-rutherford-new-jersey-metlife-stadium-2026-09-04-5-30-pm/concert/17738453 |
| tm-ed-sheeran-2026-east-rutherford-00006331cecb2b77 | Ed Sheeran | 2026-09-05 | East Rutherford | https://seatgeek.com/ed-sheeran-tickets/east-rutherford-new-jersey-metlife-stadium-2026-09-05-5-30-pm/concert/17738455 |
| tm-ed-sheeran-2026-philadelphia-02006331ed9c6125 | Ed Sheeran | 2026-09-19 | Philadelphia | https://seatgeek.com/ed-sheeran-tickets/philadelphia-pennsylvania-lincoln-financial-field-2026-09-19-5-30-pm/concert/17738457 |
| tm-ed-sheeran-2026-foxborough-0100632fcae52e03 | Ed Sheeran | 2026-09-25 | Foxborough | https://seatgeek.com/ed-sheeran-tickets/foxborough-massachusetts-gillette-stadium-2026-09-25-5-30-pm/concert/17738460 |
| tm-ed-sheeran-2026-foxborough-01006331f67e74d9 | Ed Sheeran | 2026-09-26 | Foxborough | https://seatgeek.com/ed-sheeran-tickets/foxborough-massachusetts-gillette-stadium-2026-09-26-5-30-pm/concert/17738463 |
| tm-ed-sheeran-2026-atlanta-0e00632fc0572cc1 | Ed Sheeran | 2026-10-03 | Atlanta | https://seatgeek.com/ed-sheeran-tickets/atlanta-georgia-mercedes-benz-stadium-2026-10-03-5-30-pm/concert/17738465 |
| tm-ed-sheeran-2026-indianapolis-050063299afd15f3 | Ed Sheeran | 2026-10-10 | Indianapolis | https://seatgeek.com/ed-sheeran-tickets/indianapolis-indiana-lucas-oil-stadium-2026-10-10-5-30-pm/concert/17738466 |
| tm-ed-sheeran-2026-charlotte-2d006331aac349eb | Ed Sheeran | 2026-10-17 | Charlotte | https://seatgeek.com/ed-sheeran-tickets/charlotte-north-carolina-bank-of-america-stadium-2026-10-17-5-30-pm/concert/17738470 |
| tm-ed-sheeran-2026-arlington-z7r9jz1a7jw | Ed Sheeran | 2026-10-24 | Arlington | https://seatgeek.com/ed-sheeran-tickets/arlington-texas-at-t-stadium-2026-10-24-5-30-pm/concert/17729039 |
| tm-ed-sheeran-2026-hollywood-0d006331a7d91aff | Ed Sheeran | 2026-10-29 | Hollywood | https://seatgeek.com/ed-sheeran-tickets/hollywood-florida-hard-rock-live-hollywood-2026-10-29-8-pm/concert/17738469 |
| tm-ed-sheeran-2026-hollywood-0d006331f45e4089 | Ed Sheeran | 2026-10-30 | Hollywood | https://seatgeek.com/ed-sheeran-tickets/hollywood-florida-hard-rock-live-hollywood-2026-10-30-8-pm/concert/17738471 |
| tm-ed-sheeran-2026-tampa-0d006331d60a3a7a | Ed Sheeran | 2026-11-07 | Tampa | https://seatgeek.com/ed-sheeran-tickets/tampa-florida-raymond-james-stadium-2026-11-07-5-30-pm/concert/17738474 |

## Events skipped

Skipped rows are only the Ticketmaster-sourced events that were still missing a valid `seatgeek_url` when this run started.

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-morgan-wallen-2026-indianapolis-0500635ddc2db013 | Morgan Wallen | 2026-05-08 | Indianapolis | no_candidates_returned | - |
| tm-morgan-wallen-2026-indianapolis-0500635ddc56b025 | Morgan Wallen | 2026-05-09 | Indianapolis | no_candidates_returned | - |
| tm-ariana-grande-2026-london-3500631c8ea13055 | Ariana Grande | 2026-08-15 | London | no_candidates_returned | - |
| tm-ariana-grande-2026-london-3500631c937630fa | Ariana Grande | 2026-08-16 | London | no_candidates_returned | - |
| tm-ariana-grande-2026-london-3500631c950d310b | Ariana Grande | 2026-08-19 | London | no_candidates_returned | - |
| tm-ariana-grande-2026-london-3500631c97193144 | Ariana Grande | 2026-08-20 | London | no_candidates_returned | - |
| tm-ariana-grande-2026-london-3500631c98a031b3 | Ariana Grande | 2026-08-23 | London | no_candidates_returned | - |
| tm-ariana-grande-2026-london-35006324f4e94ebb | Ariana Grande | 2026-08-24 | London | no_candidates_returned | - |
| tm-ariana-grande-2026-london-35006324f4fe4f2a | Ariana Grande | 2026-08-27 | London | no_candidates_returned | - |
| tm-ariana-grande-2026-london-35006324f5075024 | Ariana Grande | 2026-08-28 | London | no_candidates_returned | - |
| tm-ariana-grande-2026-london-35006324f4f54ef7 | Ariana Grande | 2026-08-31 | London | no_candidates_returned | - |
| tm-ariana-grande-2026-london-35006324f50f50d8 | Ariana Grande | 2026-09-01 | London | no_candidates_returned | - |
| tm-bad-bunny-2026-barcelona-653666176 | Bad Bunny | 2026-05-22 | Barcelona | no_candidates_returned | - |
| tm-bad-bunny-2026-barcelona-1116290311 | Bad Bunny | 2026-05-23 | Barcelona | no_candidates_returned | - |
| tm-bad-bunny-2026-madrid-417009905 | Bad Bunny | 2026-05-30 | Madrid | no_candidates_returned | - |
| tm-bad-bunny-2026-madrid-1848567714 | Bad Bunny | 2026-05-31 | Madrid | no_candidates_returned | - |
| tm-bad-bunny-2026-madrid-1589736692 | Bad Bunny | 2026-06-02 | Madrid | no_candidates_returned | - |
| tm-bad-bunny-2026-madrid-961888291 | Bad Bunny | 2026-06-03 | Madrid | no_candidates_returned | - |
| tm-bad-bunny-2026-madrid-1852247887 | Bad Bunny | 2026-06-06 | Madrid | no_candidates_returned | - |
| tm-bad-bunny-2026-madrid-1341715816 | Bad Bunny | 2026-06-07 | Madrid | no_candidates_returned | - |
| tm-bad-bunny-2026-madrid-412370092 | Bad Bunny | 2026-06-10 | Madrid | no_candidates_returned | - |
| tm-bad-bunny-2026-madrid-2035589996 | Bad Bunny | 2026-06-11 | Madrid | no_candidates_returned | - |
| tm-bad-bunny-2026-madrid-1378879656 | Bad Bunny | 2026-06-14 | Madrid | no_candidates_returned | - |
| tm-bad-bunny-2026-madrid-1566404077 | Bad Bunny | 2026-06-15 | Madrid | no_candidates_returned | - |
| tm-bad-bunny-2026-d-sseldorf-1604365108 | Bad Bunny | 2026-06-20 | Düsseldorf | no_candidates_returned | - |
| tm-bad-bunny-2026-d-sseldorf-653946928 | Bad Bunny | 2026-06-21 | Düsseldorf | no_candidates_returned | - |
| tm-bad-bunny-2026-arnhem-1578299680 | Bad Bunny | 2026-06-23 | Arnhem | no_candidates_returned | - |
| tm-bad-bunny-2026-arnhem-2018685385 | Bad Bunny | 2026-06-24 | Arnhem | no_candidates_returned | - |
| tm-bad-bunny-2026-london-3500629efc0c8bc1 | Bad Bunny | 2026-06-27 | London | no_candidates_returned | - |
| tm-bad-bunny-2026-london-350062a39074101f | Bad Bunny | 2026-06-28 | London | no_candidates_returned | - |
| tm-bad-bunny-2026-stockholm-625835491 | Bad Bunny | 2026-07-10 | Stockholm | no_candidates_returned | - |
| tm-bad-bunny-2026-stockholm-734104140 | Bad Bunny | 2026-07-11 | Stockholm | no_candidates_returned | - |
| tm-bad-bunny-2026-warsaw-1844913130 | Bad Bunny | 2026-07-14 | Warsaw | no_candidates_returned | - |
| tm-bad-bunny-2026-milano-bad-bunny-debi-tirar-mas-fotos-world-tour-17-luglio-2026-ippodromo-snai-la-maura-milano-13382.html | Bad Bunny | 2026-07-17 | Milano | no_candidates_returned | - |
| tm-bad-bunny-2026-milano-bad-bunny-debi-tirar-mas-fotos-world-tour-18-luglio-2026-ippodromo-snai-la-maura-milano-13408.html | Bad Bunny | 2026-07-18 | Milano | no_candidates_returned | - |
| tm-bad-bunny-2026-brussels-1117180915 | Bad Bunny | 2026-07-22 | Brussels | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz16vawas-e | Olivia Rodrigo | 2027-03-23 | Amsterdam | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz16vqafzjg | Olivia Rodrigo | 2027-03-23 | Amsterdam | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz1kk7ajpa | Olivia Rodrigo | 2027-03-24 | Amsterdam | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz16vgjp_pe | Olivia Rodrigo | 2027-03-24 | Amsterdam | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz16v1zf-za | Olivia Rodrigo | 2027-03-27 | Amsterdam | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz16v-bo4pa | Olivia Rodrigo | 2027-03-27 | Amsterdam | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz16v_8bagm | Olivia Rodrigo | 2027-03-28 | Amsterdam | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz1kpn0tog | Olivia Rodrigo | 2027-03-28 | Amsterdam | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-munich-z698xzc2z1kfyg9ao | Olivia Rodrigo | 2027-04-01 | Munich | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-munich-z698xzc2z16vuw_9j8 | Olivia Rodrigo | 2027-04-02 | Munich | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkuyj7ah | Olivia Rodrigo | 2027-04-05 | London | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkusg7f3 | Olivia Rodrigo | 2027-04-06 | London | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkusmfph | Olivia Rodrigo | 2027-04-08 | London | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkug10qr | Olivia Rodrigo | 2027-04-09 | London | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkdf5uep | Olivia Rodrigo | 2027-04-12 | London | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkdbfuff | Olivia Rodrigo | 2027-04-14 | London | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkdqyuqd | Olivia Rodrigo | 2027-04-15 | London | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkdjmpol | Olivia Rodrigo | 2027-04-19 | London | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkdj-m1i | Olivia Rodrigo | 2027-04-20 | London | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-barcelona-z698xz2qz1kf4gb0b | Olivia Rodrigo | 2027-05-01 | Barcelona | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-barcelona-z698xz2qz1k8uzwj6 | Olivia Rodrigo | 2027-05-02 | Barcelona | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-barcelona-z698xz2qz16ezxvpe7 | Olivia Rodrigo | 2027-05-05 | Barcelona | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-barcelona-z698xz2qz1k8ffjf_ | Olivia Rodrigo | 2027-05-06 | Barcelona | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-greenwich-z7r9jz1a70ff4 | Olivia Rodrigo | 2027-05-09 | Greenwich | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkdz-z3p | Olivia Rodrigo | 2027-05-09 | London | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-greenwich-z7r9jz1a70fff | Olivia Rodrigo | 2027-05-10 | Greenwich | no_candidates_returned | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkdd-fh3 | Olivia Rodrigo | 2027-05-10 | London | no_candidates_returned | - |
| tm-bruno-mars-2026-columbus-vv1aazkcfgkdl2qzg | Bruno Mars | 2026-05-20 | Columbus | no_candidates_returned | - |
| tm-bruno-mars-2026-toronto-1a8zkc8gkev_6oa | Bruno Mars | 2026-05-23 | Toronto | no_candidates_returned | - |
| tm-bruno-mars-2026-toronto-1a8zkc8gkevq6og | Bruno Mars | 2026-05-24 | Toronto | no_candidates_returned | - |
| tm-bruno-mars-2026-toronto-1a8zkc8gkevqmo2 | Bruno Mars | 2026-05-27 | Toronto | no_candidates_returned | - |
| tm-bruno-mars-2026-toronto-1a8zkc8gkevhmob | Bruno Mars | 2026-05-28 | Toronto | no_candidates_returned | - |
| tm-bruno-mars-2026-toronto-168zk8yb-za2d6ed | Bruno Mars | 2026-05-30 | Toronto | no_candidates_returned | - |
| tm-bruno-mars-2026-saint-denis-z7r9jz1a7oe_k | Bruno Mars | 2026-06-18 | Saint Denis | no_candidates_returned | - |
| tm-bruno-mars-2026-saint-denis-z7r9jz1a7oe_6 | Bruno Mars | 2026-06-20 | Saint Denis | no_candidates_returned | - |
| tm-bruno-mars-2026-saint-denis-z7r9jz1a7oe_f | Bruno Mars | 2026-06-21 | Saint Denis | no_candidates_returned | - |
| tm-bruno-mars-2026-berlin-z7r9jz1a7oe_k | Bruno Mars | 2026-06-26 | Berlin | no_candidates_returned | - |
| tm-bruno-mars-2026-berlin-z7r9jz1a7oe_f | Bruno Mars | 2026-06-28 | Berlin | no_candidates_returned | - |
| tm-bruno-mars-2026-berlin-z7r9jz1a7oe_4 | Bruno Mars | 2026-06-29 | Berlin | no_candidates_returned | - |
| tm-bruno-mars-2026-amsterdam-z698xzbpz16vg6pypf | Bruno Mars | 2026-07-02 | Amsterdam | no_candidates_returned | - |
| tm-bruno-mars-2026-amsterdam-z698xzbpz16v3zapgk | Bruno Mars | 2026-07-04 | Amsterdam | no_candidates_returned | - |
| tm-bruno-mars-2026-amsterdam-z698xzbpz1kbsa6fz | Bruno Mars | 2026-07-05 | Amsterdam | no_candidates_returned | - |
| tm-bruno-mars-2026-amsterdam-z698xzbpz16vvoue3b | Bruno Mars | 2026-07-07 | Amsterdam | no_candidates_returned | - |
| tm-bruno-mars-2026-madrid-z698xz2qz1kutpbz7 | Bruno Mars | 2026-07-10 | Madrid | no_candidates_returned | - |
| tm-bruno-mars-2026-madrid-z698xz2qz1koyq7f6 | Bruno Mars | 2026-07-11 | Madrid | no_candidates_returned | - |
| tm-bruno-mars-2026-milan-z7r9jz1a7oe_x | Bruno Mars | 2026-07-14 | Milan | no_candidates_returned | - |
| tm-bruno-mars-2026-milan-z7r9jz1a7oe_n | Bruno Mars | 2026-07-15 | Milan | no_candidates_returned | - |
| tm-bruno-mars-2026-london-1aegzbzgksgzoma | Bruno Mars | 2026-07-18 | London | no_candidates_returned | - |
| tm-bruno-mars-2026-london-1anzk8egkdftyue | Bruno Mars | 2026-07-19 | London | no_candidates_returned | - |
| tm-bruno-mars-2026-london-1anzk8egkduy8wh | Bruno Mars | 2026-07-22 | London | no_candidates_returned | - |
| tm-bruno-mars-2026-london-1anzk8egkdmnywe | Bruno Mars | 2026-07-24 | London | no_candidates_returned | - |
| tm-bruno-mars-2026-london-1anzk8egkdzq8wy | Bruno Mars | 2026-07-25 | London | no_candidates_returned | - |
| tm-bruno-mars-2026-london-1anzk8egkdbd8xc | Bruno Mars | 2026-07-28 | London | no_candidates_returned | - |
| tm-shakira-2026-palm-desert-vvg1iz_6abv7yw | Shakira | 2026-06-17 | Palm Desert | city_or_metro_match_failed | https://seatgeek.com/shakira-tickets/thousand-palms-california-acrisure-arena-2026-06-17-7-30-pm/concert/18157384 |
| tm-shakira-2026-belmont-park-15dzz_619b3pj | Shakira | 2026-07-23 | Belmont Park | city_or_metro_match_failed | https://seatgeek.com/shakira-tickets/elmont-new-york-ubs-arena-2026-07-23-7-30-pm/concert/18157381 |
| tm-shakira-2026-madrid-z698xz2qz1k7eo4av | Shakira | 2026-09-18 | Madrid | no_candidates_returned | - |
| tm-shakira-2026-madrid-z698xz2qz16vas39ay | Shakira | 2026-09-19 | Madrid | no_candidates_returned | - |
| tm-shakira-2026-madrid-z698xz2qz16vrkvz38 | Shakira | 2026-09-20 | Madrid | no_candidates_returned | - |
| tm-shakira-2026-madrid-z698xz2qz16v_oqxoe | Shakira | 2026-09-25 | Madrid | no_candidates_returned | - |
| tm-shakira-2026-madrid-z698xz2qz16vowff-f | Shakira | 2026-09-26 | Madrid | no_candidates_returned | - |
| tm-shakira-2026-madrid-z698xz2qz1konkpax | Shakira | 2026-09-27 | Madrid | no_candidates_returned | - |
| tm-shakira-2026-madrid-z698xz2qz1kbi4uav | Shakira | 2026-10-02 | Madrid | no_candidates_returned | - |
| tm-shakira-2026-madrid-z698xz2qz16v4mzjas | Shakira | 2026-10-03 | Madrid | no_candidates_returned | - |
| tm-shakira-2026-madrid-z698xz2qz16v73axp9 | Shakira | 2026-10-04 | Madrid | no_candidates_returned | - |
| tm-shakira-2026-madrid-z698xz2qz1koifuzg | Shakira | 2026-10-09 | Madrid | no_candidates_returned | - |
| tm-shakira-2026-madrid-z698xz2qz1koecouy | Shakira | 2026-10-10 | Madrid | no_candidates_returned | - |
| tm-shakira-2026-madrid-z698xz2qz16vfpafo8 | Shakira | 2026-10-11 | Madrid | no_candidates_returned | - |

## Accepted venue mismatches

- None

## Accepted missing-timezone date adjustments

| showId | stored date | SeatGeek date | URL |
| --- | --- | --- | --- |
| tm-olivia-rodrigo-2026-sunrise-z7r9jz1a7067o | 2026-11-21 | 2026-11-20 | https://seatgeek.com/olivia-rodrigo-tickets/sunrise-florida-amerant-bank-arena-2026-11-20-7-pm/concert/18208620 |
| tm-olivia-rodrigo-2026-las-vegas-z7r9jz1a706kf | 2026-12-21 | 2026-12-20 | https://seatgeek.com/olivia-rodrigo-tickets/las-vegas-nevada-t-mobile-arena-2026-12-20-7-pm/concert/18211723 |
| tm-bruno-mars-2026-colorado-springs-z7r9jz1a7ox8i | 2026-09-28 | 2026-09-27 | https://seatgeek.com/bruno-mars-tickets/colorado-springs-colorado-falcon-stadium-2026-09-27-7-pm/concert/18013502 |
| tm-ed-sheeran-2026-glendale-z7r9jz1a7jm | 2026-06-14 | 2026-06-13 | https://seatgeek.com/ed-sheeran-tickets/glendale-arizona-state-farm-stadium-2026-06-13-5-30-pm/concert/17724383 |

## Conflicts found

- None

## Rate-limited / not checked

- None

## API/environment failures

- None
