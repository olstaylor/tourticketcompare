# SeatGeek CTA auto-add log

Generated: 2026-05-13T20:35:55.924Z

## Run summary

- Mode: apply-high-confidence (based on completed dry-run candidate set; a follow-up apply probe using `--apply-high-confidence --limit 1` confirmed client-ID-only API access remained HTTP 200)
- SeatGeek client ID present: true
- SeatGeek client secret present: false
- API access with client ID only: HTTP 200
- Events checked: 129
- URLs added: 17
- Events skipped: 112
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 3
- api_failure: 109

## URLs added

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-morgan-wallen-2026-gainesville-2200635d1be07abe | Morgan Wallen | 2026-05-16 | Gainesville | https://seatgeek.com/morgan-wallen-tickets/gainesville-florida-ben-hill-griffin-stadium-2026-05-16-5-30-pm/concert/17873116 |
| tm-morgan-wallen-2026-denver-1e00635df7cf9add | Morgan Wallen | 2026-05-29 | Denver | https://seatgeek.com/morgan-wallen-tickets/denver-colorado-empower-field-at-mile-high-2026-05-29-5-30-pm/concert/17873122 |
| tm-morgan-wallen-2026-denver-1e00635df7d99ae8 | Morgan Wallen | 2026-05-30 | Denver | https://seatgeek.com/morgan-wallen-tickets/denver-colorado-empower-field-at-mile-high-2026-05-30-5-30-pm/concert/17873123 |
| tm-morgan-wallen-2026-pittsburgh-1600635c84ff1ead | Morgan Wallen | 2026-06-05 | Pittsburgh | https://seatgeek.com/morgan-wallen-tickets/pittsburgh-pennsylvania-acrisure-stadium-2026-06-05-5-30-pm/concert/17873125 |
| tm-morgan-wallen-2026-pittsburgh-1600635d93d83472 | Morgan Wallen | 2026-06-06 | Pittsburgh | https://seatgeek.com/morgan-wallen-tickets/pittsburgh-pennsylvania-acrisure-stadium-2026-06-06-5-30-pm/concert/17873127 |
| tm-morgan-wallen-2026-chicago-z7r9jz1a7qtbn | Morgan Wallen | 2026-06-19 | Chicago | https://seatgeek.com/morgan-wallen-tickets/chicago-illinois-soldier-field-2026-06-19-5-30-pm/concert/17873130 |
| tm-morgan-wallen-2026-chicago-z7r9jz1a7qtba | Morgan Wallen | 2026-06-20 | Chicago | https://seatgeek.com/morgan-wallen-tickets/chicago-illinois-soldier-field-2026-06-20-5-30-pm/concert/17873131 |
| tm-morgan-wallen-2026-clemson-z7r9jz1a7qtbd | Morgan Wallen | 2026-06-26 | Clemson | https://seatgeek.com/morgan-wallen-tickets/clemson-south-carolina-clemson-memorial-stadium-2026-06-26-5-30-pm/concert/17882630 |
| tm-morgan-wallen-2026-clemson-z7r9jz1a7qtb7 | Morgan Wallen | 2026-06-27 | Clemson | https://seatgeek.com/morgan-wallen-tickets/clemson-south-carolina-clemson-memorial-stadium-2026-06-27-5-30-pm/concert/17882632 |
| tm-morgan-wallen-2026-baltimore-z7r9jz1a7qtba2 | Morgan Wallen | 2026-07-17 | Baltimore | https://seatgeek.com/morgan-wallen-tickets/baltimore-maryland-m-t-bank-stadium-2026-07-17-5-30-pm/concert/17846495 |
| tm-morgan-wallen-2026-baltimore-z7r9jz1a7qtbk | Morgan Wallen | 2026-07-18 | Baltimore | https://seatgeek.com/morgan-wallen-tickets/baltimore-maryland-m-t-bank-stadium-2026-07-18-5-30-pm/concert/17872176 |
| tm-morgan-wallen-2026-ann-arbor-z7r9jz1a7qtbs | Morgan Wallen | 2026-07-24 | Ann Arbor | https://seatgeek.com/morgan-wallen-tickets/ann-arbor-michigan-michigan-stadium-2026-07-24-5-30-pm/concert/17873138 |
| tm-morgan-wallen-2026-ann-arbor-z7r9jz1a7qtbf | Morgan Wallen | 2026-07-25 | Ann Arbor | https://seatgeek.com/morgan-wallen-tickets/ann-arbor-michigan-michigan-stadium-2026-07-25-5-30-pm/concert/17873140 |
| tm-morgan-wallen-2026-philadelphia-0200635dc72ec234 | Morgan Wallen | 2026-07-31 | Philadelphia | https://seatgeek.com/morgan-wallen-tickets/philadelphia-pennsylvania-lincoln-financial-field-2026-07-31-5-30-pm/concert/17873142 |
| tm-morgan-wallen-2026-philadelphia-0200635da084a7a9 | Morgan Wallen | 2026-08-01 | Philadelphia | https://seatgeek.com/morgan-wallen-tickets/philadelphia-pennsylvania-lincoln-financial-field-2026-08-01-5-30-pm/concert/17873143 |
| tm-harry-styles-2026-new-york-3b0064350404814e | Harry Styles | 2026-08-26 | New York | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-08-26-8-pm/concert/18027090 |
| tm-harry-styles-2026-new-york-3b00643504538196 | Harry Styles | 2026-08-28 | New York | https://seatgeek.com/harry-styles-tickets/new-york-new-york-madison-square-garden-2026-08-28-8-pm/concert/18027089 |

## Events skipped

| showId | artist | date | city | reason | best candidate |
| --- | --- | --- | --- | --- | --- |
| tm-morgan-wallen-2026-indianapolis-0500635ddc2db013 | Morgan Wallen | 2026-05-08 | Indianapolis | no_candidates_returned | - |
| tm-morgan-wallen-2026-indianapolis-0500635ddc56b025 | Morgan Wallen | 2026-05-09 | Indianapolis | no_candidates_returned | - |
| tm-harry-styles-2026-new-york-3b006435046481aa | Harry Styles | 2026-08-29 | New York | no_candidates_returned | - |
| tm-harry-styles-2026-new-york-3b006435047f81c1 | Harry Styles | 2026-09-02 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b006435049481d0 | Harry Styles | 2026-09-04 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b00643504a381d8 | Harry Styles | 2026-09-05 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b00643504b581eb | Harry Styles | 2026-09-09 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b00643504c881f8 | Harry Styles | 2026-09-11 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b00643504d78209 | Harry Styles | 2026-09-12 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b00643504e38212 | Harry Styles | 2026-09-16 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b00643505018228 | Harry Styles | 2026-09-18 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b00643505178231 | Harry Styles | 2026-09-19 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b0064350525823a | Harry Styles | 2026-09-23 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b00643505428256 | Harry Styles | 2026-09-25 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b006435054e8262 | Harry Styles | 2026-09-26 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b00643505768283 | Harry Styles | 2026-09-30 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b00643505888295 | Harry Styles | 2026-10-02 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b006435059882a6 | Harry Styles | 2026-10-03 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b00643505aa82b9 | Harry Styles | 2026-10-07 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b00643505b782ca | Harry Styles | 2026-10-09 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b00643505d182df | Harry Styles | 2026-10-10 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b00643505dd82e6 | Harry Styles | 2026-10-14 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b00643505ee82f4 | Harry Styles | 2026-10-16 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b00643506808378 | Harry Styles | 2026-10-17 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b0064350690838a | Harry Styles | 2026-10-21 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b006435069e8398 | Harry Styles | 2026-10-23 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b00643506ae83a2 | Harry Styles | 2026-10-24 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b00643506bf83b6 | Harry Styles | 2026-10-28 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b00643506cf83cb | Harry Styles | 2026-10-30 | New York | api_failure | - |
| tm-harry-styles-2026-new-york-3b00643506da83de | Harry Styles | 2026-10-31 | New York | api_failure | - |
| tm-bts-2026-stanford-1c006429c95ea2b8 | BTS | 2026-05-16 | Stanford | api_failure | - |
| tm-bts-2026-stanford-1c006429c9dda300 | BTS | 2026-05-17 | Stanford | api_failure | - |
| tm-bts-2026-stanford-1c006435858268ec | BTS | 2026-05-19 | Stanford | api_failure | - |
| tm-bts-2026-las-vegas-17006429d233149a | BTS | 2026-05-23 | Las Vegas | api_failure | - |
| tm-bts-2026-las-vegas-17006429e3354a8c | BTS | 2026-05-24 | Las Vegas | api_failure | - |
| tm-bts-2026-las-vegas-17006429e3454a9e | BTS | 2026-05-27 | Las Vegas | api_failure | - |
| tm-bts-2026-las-vegas-17006429e3514ab0 | BTS | 2026-05-28 | Las Vegas | api_failure | - |
| tm-bts-2026-east-rutherford-00006429eb39bb6f | BTS | 2026-08-01 | East Rutherford | api_failure | - |
| tm-bts-2026-east-rutherford-00006429ed30bceb | BTS | 2026-08-02 | East Rutherford | api_failure | - |
| tm-bts-2026-foxborough-0100642cbd7ab56b | BTS | 2026-08-05 | Foxborough | api_failure | - |
| tm-bts-2026-foxborough-0100642cc24ebb04 | BTS | 2026-08-06 | Foxborough | api_failure | - |
| tm-bts-2026-chicago-0400642acbbd5d44 | BTS | 2026-08-27 | Chicago | api_failure | - |
| tm-bts-2026-chicago-0400642acc7e5d9b | BTS | 2026-08-28 | Chicago | api_failure | - |
| tm-bts-2026-inglewood-0a006429ab3c5ef1 | BTS | 2026-09-01 | Inglewood | api_failure | - |
| tm-bts-2026-inglewood-0a006429b1b363a4 | BTS | 2026-09-02 | Inglewood | api_failure | - |
| tm-bts-2026-inglewood-0a006429b2cb6418 | BTS | 2026-09-05 | Inglewood | api_failure | - |
| tm-bts-2026-inglewood-0a006429b353645f | BTS | 2026-09-06 | Inglewood | api_failure | - |
| tm-ariana-grande-2026-oakland-1c00631913d14ad8 | Ariana Grande | 2026-06-06 | Oakland | api_failure | - |
| tm-ariana-grande-2026-oakland-1c00631a8fc31891 | Ariana Grande | 2026-06-09 | Oakland | api_failure | - |
| tm-ariana-grande-2026-oakland-1c00632490b77e47 | Ariana Grande | 2026-06-10 | Oakland | api_failure | - |
| tm-ariana-grande-2026-los-angeles-2c00631bd2240c78 | Ariana Grande | 2026-06-13 | Los Angeles | api_failure | - |
| tm-ariana-grande-2026-los-angeles-2c00631bd1f40c75 | Ariana Grande | 2026-06-14 | Los Angeles | api_failure | - |
| tm-ariana-grande-2026-inglewood-09006319299f5deb | Ariana Grande | 2026-06-17 | Inglewood | api_failure | - |
| tm-ariana-grande-2026-inglewood-090063192f945f68 | Ariana Grande | 2026-06-19 | Inglewood | api_failure | - |
| tm-ariana-grande-2026-inglewood-09006325c6486b2e | Ariana Grande | 2026-06-20 | Inglewood | api_failure | - |
| tm-ariana-grande-2026-austin-3a00631b9ce923db | Ariana Grande | 2026-06-24 | Austin | api_failure | - |
| tm-ariana-grande-2026-austin-3a00631b9e202403 | Ariana Grande | 2026-06-26 | Austin | api_failure | - |
| tm-ariana-grande-2026-austin-3a00631b9f022430 | Ariana Grande | 2026-06-27 | Austin | api_failure | - |
| tm-ariana-grande-2026-atlanta-0e00631a8e691e65 | Ariana Grande | 2026-07-06 | Atlanta | api_failure | - |
| tm-ariana-grande-2026-atlanta-0e00631a8f331ed1 | Ariana Grande | 2026-07-08 | Atlanta | api_failure | - |
| tm-ariana-grande-2026-atlanta-0e006325bea26298 | Ariana Grande | 2026-07-09 | Atlanta | api_failure | - |
| tm-ariana-grande-2026-brooklyn-30006319f0e94aa7 | Ariana Grande | 2026-07-12 | Brooklyn | api_failure | - |
| tm-ariana-grande-2026-brooklyn-30006319f34a4abb | Ariana Grande | 2026-07-13 | Brooklyn | api_failure | - |
| tm-ariana-grande-2026-brooklyn-30006319f41b4abf | Ariana Grande | 2026-07-16 | Brooklyn | api_failure | - |
| tm-ariana-grande-2026-brooklyn-30006319f49f4acd | Ariana Grande | 2026-07-18 | Brooklyn | api_failure | - |
| tm-ariana-grande-2026-brooklyn-30006325205054e3 | Ariana Grande | 2026-07-19 | Brooklyn | api_failure | - |
| tm-ariana-grande-2026-boston-0100631aaef23ee8 | Ariana Grande | 2026-07-22 | Boston | api_failure | - |
| tm-ariana-grande-2026-boston-0100631aca626435 | Ariana Grande | 2026-07-24 | Boston | api_failure | - |
| tm-ariana-grande-2026-boston-010063289ef611c4 | Ariana Grande | 2026-07-25 | Boston | api_failure | - |
| tm-ariana-grande-2026-montreal-31006319ddb22b1f | Ariana Grande | 2026-07-28 | Montreal | api_failure | - |
| tm-ariana-grande-2026-montreal-31006319de3a2b37 | Ariana Grande | 2026-07-30 | Montreal | api_failure | - |
| tm-ariana-grande-2026-montreal-31006319dedc2b4c | Ariana Grande | 2026-07-31 | Montreal | api_failure | - |
| tm-ariana-grande-2026-chicago-04006319ddea2cd5 | Ariana Grande | 2026-08-03 | Chicago | api_failure | - |
| tm-ariana-grande-2026-chicago-0400631adf313481 | Ariana Grande | 2026-08-05 | Chicago | api_failure | - |
| tm-ariana-grande-2026-chicago-04006325ad9f24a7 | Ariana Grande | 2026-08-06 | Chicago | api_failure | - |
| tm-ariana-grande-2026-london-3500631c8ea13055 | Ariana Grande | 2026-08-15 | London | api_failure | - |
| tm-ariana-grande-2026-london-3500631c937630fa | Ariana Grande | 2026-08-16 | London | api_failure | - |
| tm-ariana-grande-2026-london-3500631c950d310b | Ariana Grande | 2026-08-19 | London | api_failure | - |
| tm-ariana-grande-2026-london-3500631c97193144 | Ariana Grande | 2026-08-20 | London | api_failure | - |
| tm-ariana-grande-2026-london-3500631c98a031b3 | Ariana Grande | 2026-08-23 | London | api_failure | - |
| tm-ariana-grande-2026-london-35006324f4e94ebb | Ariana Grande | 2026-08-24 | London | api_failure | - |
| tm-ariana-grande-2026-london-35006324f4fe4f2a | Ariana Grande | 2026-08-27 | London | api_failure | - |
| tm-ariana-grande-2026-london-35006324f5075024 | Ariana Grande | 2026-08-28 | London | api_failure | - |
| tm-ariana-grande-2026-london-35006324f4f54ef7 | Ariana Grande | 2026-08-31 | London | api_failure | - |
| tm-ariana-grande-2026-london-35006324f50f50d8 | Ariana Grande | 2026-09-01 | London | api_failure | - |
| tm-bad-bunny-2026-barcelona-653666176 | Bad Bunny | 2026-05-22 | Barcelona | api_failure | - |
| tm-bad-bunny-2026-barcelona-1116290311 | Bad Bunny | 2026-05-23 | Barcelona | api_failure | - |
| tm-bad-bunny-2026-madrid-417009905 | Bad Bunny | 2026-05-30 | Madrid | api_failure | - |
| tm-bad-bunny-2026-madrid-1848567714 | Bad Bunny | 2026-05-31 | Madrid | api_failure | - |
| tm-bad-bunny-2026-madrid-1589736692 | Bad Bunny | 2026-06-02 | Madrid | api_failure | - |
| tm-bad-bunny-2026-madrid-961888291 | Bad Bunny | 2026-06-03 | Madrid | api_failure | - |
| tm-bad-bunny-2026-madrid-1852247887 | Bad Bunny | 2026-06-06 | Madrid | api_failure | - |
| tm-bad-bunny-2026-madrid-1341715816 | Bad Bunny | 2026-06-07 | Madrid | api_failure | - |
| tm-bad-bunny-2026-madrid-412370092 | Bad Bunny | 2026-06-10 | Madrid | api_failure | - |
| tm-bad-bunny-2026-madrid-2035589996 | Bad Bunny | 2026-06-11 | Madrid | api_failure | - |
| tm-bad-bunny-2026-madrid-1378879656 | Bad Bunny | 2026-06-14 | Madrid | api_failure | - |
| tm-bad-bunny-2026-madrid-1566404077 | Bad Bunny | 2026-06-15 | Madrid | api_failure | - |
| tm-bad-bunny-2026-d-sseldorf-1604365108 | Bad Bunny | 2026-06-20 | Düsseldorf | api_failure | - |
| tm-bad-bunny-2026-d-sseldorf-653946928 | Bad Bunny | 2026-06-21 | Düsseldorf | api_failure | - |
| tm-bad-bunny-2026-arnhem-1578299680 | Bad Bunny | 2026-06-23 | Arnhem | api_failure | - |
| tm-bad-bunny-2026-arnhem-2018685385 | Bad Bunny | 2026-06-24 | Arnhem | api_failure | - |
| tm-bad-bunny-2026-london-3500629efc0c8bc1 | Bad Bunny | 2026-06-27 | London | api_failure | - |
| tm-bad-bunny-2026-london-350062a39074101f | Bad Bunny | 2026-06-28 | London | api_failure | - |
| tm-bad-bunny-2026-stockholm-625835491 | Bad Bunny | 2026-07-10 | Stockholm | api_failure | - |
| tm-bad-bunny-2026-stockholm-734104140 | Bad Bunny | 2026-07-11 | Stockholm | api_failure | - |
| tm-bad-bunny-2026-warsaw-1844913130 | Bad Bunny | 2026-07-14 | Warsaw | api_failure | - |
| tm-bad-bunny-2026-milano-bad-bunny-debi-tirar-mas-fotos-world-tour-17-luglio-2026-ippodromo-snai-la-maura-milano-13382.html | Bad Bunny | 2026-07-17 | Milano | api_failure | - |
| tm-bad-bunny-2026-milano-bad-bunny-debi-tirar-mas-fotos-world-tour-18-luglio-2026-ippodromo-snai-la-maura-milano-13408.html | Bad Bunny | 2026-07-18 | Milano | api_failure | - |
| tm-bad-bunny-2026-brussels-1117180915 | Bad Bunny | 2026-07-22 | Brussels | api_failure | - |
| tm-jay-z-2026-bronx-1d006473d78cfdb8 | JAY-Z | 2026-07-10 | Bronx | api_failure | - |
| tm-jay-z-2026-bronx-1d006473d9d109cb | JAY-Z | 2026-07-11 | Bronx | api_failure | - |
| tm-jay-z-2026-bronx-1d006473db760a7f | JAY-Z | 2026-07-12 | Bronx | api_failure | - |

## Accepted venue mismatches

- None

## Conflicts found

- None

## API/environment failures

| showId | artist | reason |
| --- | --- | --- |
| tm-harry-styles-2026-new-york-3b006435047f81c1 | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b006435049481d0 | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b00643504a381d8 | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b00643504b581eb | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b00643504c881f8 | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b00643504d78209 | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b00643504e38212 | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b00643505018228 | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b00643505178231 | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b0064350525823a | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b00643505428256 | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b006435054e8262 | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b00643505768283 | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b00643505888295 | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b006435059882a6 | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b00643505aa82b9 | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b00643505b782ca | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b00643505d182df | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b00643505dd82e6 | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b00643505ee82f4 | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b00643506808378 | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b0064350690838a | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b006435069e8398 | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b00643506ae83a2 | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b00643506bf83b6 | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b00643506cf83cb | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-harry-styles-2026-new-york-3b00643506da83de | Harry Styles | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bts-2026-stanford-1c006429c95ea2b8 | BTS | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bts-2026-stanford-1c006429c9dda300 | BTS | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bts-2026-stanford-1c006435858268ec | BTS | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bts-2026-las-vegas-17006429d233149a | BTS | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bts-2026-las-vegas-17006429e3354a8c | BTS | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bts-2026-las-vegas-17006429e3454a9e | BTS | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bts-2026-las-vegas-17006429e3514ab0 | BTS | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bts-2026-east-rutherford-00006429eb39bb6f | BTS | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bts-2026-east-rutherford-00006429ed30bceb | BTS | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bts-2026-foxborough-0100642cbd7ab56b | BTS | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bts-2026-foxborough-0100642cc24ebb04 | BTS | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bts-2026-chicago-0400642acbbd5d44 | BTS | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bts-2026-chicago-0400642acc7e5d9b | BTS | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bts-2026-inglewood-0a006429ab3c5ef1 | BTS | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bts-2026-inglewood-0a006429b1b363a4 | BTS | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bts-2026-inglewood-0a006429b2cb6418 | BTS | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bts-2026-inglewood-0a006429b353645f | BTS | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-oakland-1c00631913d14ad8 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-oakland-1c00631a8fc31891 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-oakland-1c00632490b77e47 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-los-angeles-2c00631bd2240c78 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-los-angeles-2c00631bd1f40c75 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-inglewood-09006319299f5deb | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-inglewood-090063192f945f68 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-inglewood-09006325c6486b2e | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-austin-3a00631b9ce923db | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-austin-3a00631b9e202403 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-austin-3a00631b9f022430 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-atlanta-0e00631a8e691e65 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-atlanta-0e00631a8f331ed1 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-atlanta-0e006325bea26298 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-brooklyn-30006319f0e94aa7 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-brooklyn-30006319f34a4abb | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-brooklyn-30006319f41b4abf | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-brooklyn-30006319f49f4acd | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-brooklyn-30006325205054e3 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-boston-0100631aaef23ee8 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-boston-0100631aca626435 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-boston-010063289ef611c4 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-montreal-31006319ddb22b1f | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-montreal-31006319de3a2b37 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-montreal-31006319dedc2b4c | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-chicago-04006319ddea2cd5 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-chicago-0400631adf313481 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-chicago-04006325ad9f24a7 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-london-3500631c8ea13055 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-london-3500631c937630fa | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-london-3500631c950d310b | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-london-3500631c97193144 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-london-3500631c98a031b3 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-london-35006324f4e94ebb | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-london-35006324f4fe4f2a | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-london-35006324f5075024 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-london-35006324f4f54ef7 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-ariana-grande-2026-london-35006324f50f50d8 | Ariana Grande | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-barcelona-653666176 | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-barcelona-1116290311 | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-madrid-417009905 | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-madrid-1848567714 | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-madrid-1589736692 | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-madrid-961888291 | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-madrid-1852247887 | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-madrid-1341715816 | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-madrid-412370092 | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-madrid-2035589996 | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-madrid-1378879656 | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-madrid-1566404077 | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-d-sseldorf-1604365108 | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-d-sseldorf-653946928 | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-arnhem-1578299680 | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-arnhem-2018685385 | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-london-3500629efc0c8bc1 | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-london-350062a39074101f | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-stockholm-625835491 | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-stockholm-734104140 | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-warsaw-1844913130 | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-milano-bad-bunny-debi-tirar-mas-fotos-world-tour-17-luglio-2026-ippodromo-snai-la-maura-milano-13382.html | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-milano-bad-bunny-debi-tirar-mas-fotos-world-tour-18-luglio-2026-ippodromo-snai-la-maura-milano-13408.html | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-bad-bunny-2026-brussels-1117180915 | Bad Bunny | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-jay-z-2026-bronx-1d006473d78cfdb8 | JAY-Z | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-jay-z-2026-bronx-1d006473d9d109cb | JAY-Z | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
| tm-jay-z-2026-bronx-1d006473db760a7f | JAY-Z | artist + venue + city + exact date: HTTP 429; artist + city + exact date: HTTP 429; artist + venue + exact date: HTTP 429; artist + city + narrow date window: HTTP 429; artist only + exact date: HTTP 429 |
