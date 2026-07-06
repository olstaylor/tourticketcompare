# SeatGeek CTA auto-add log

Generated: 2026-07-06T10:32:34.111Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: false
- API access with client ID only: HTTP 200
- Total events in data: 402
- Ticketmaster-verified events: 293
- Events already carrying a valid SeatGeek URL: 262
- Ticketmaster-verified events already carrying a valid SeatGeek URL: 206
- Ticketmaster-verified events still missing a valid SeatGeek URL before this run: 87
- Events selected/logged by this run: 115
- Events checked by this run: 115
- API calls made: 575
- Rate-limit responses: 0
- URLs added: 28
- Events skipped: 87
- no_candidates_returned: 87
- rate_limited_not_checked: 0
- Stopped early: no
- Next resume showId: 
- Next recommended resume command: 
- Accepted venue mismatches: 0
- Conflicts found: 0

## Skipped reasons

- no_candidates_returned: 87

## Interpretation

- `URLs added: 28` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 262 event(s) already carried valid SeatGeek URLs before this run, including 206 Ticketmaster-verified event(s).
- This run queried only the 87 Ticketmaster-verified event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

| showId | artist | date | city | SeatGeek URL |
| --- | --- | --- | --- | --- |
| tm-bts-2026-arlington-z7r9jz1a7ooui | BTS | 2026-08-16 | Arlington | https://seatgeek.com/bts-tickets/arlington-texas-at-t-stadium-2026-08-16-8-pm/concert/18009296 |
| tm-bts-2026-toronto-1avzz_egkiiidcu | BTS | 2026-08-22 | Toronto | https://seatgeek.com/bts-tickets/toronto-canada-rogers-stadium-toronto-2026-08-22-8-pm/concert/18010334 |
| tm-bts-2026-toronto-1avzz_egkicklrr | BTS | 2026-08-23 | Toronto | https://seatgeek.com/bts-tickets/toronto-canada-rogers-stadium-toronto-2026-08-23-8-pm/concert/18010336 |
| tm-ariana-grande-2026-atlanta-vvg1zzbsncqoyp | Ariana Grande | 2026-07-06 | Atlanta | https://seatgeek.com/ariana-grande-tickets/atlanta-georgia-state-farm-arena-1-2026-07-06-8-pm/concert/17700803 |
| tm-ariana-grande-2026-atlanta-vvg1zzbwpxij1b | Ariana Grande | 2026-07-09 | Atlanta | https://seatgeek.com/ariana-grande-tickets/atlanta-georgia-state-farm-arena-1-2026-07-09-8-pm/concert/17724144 |
| tm-ariana-grande-2026-brooklyn-1ayzkg_gkds30nd | Ariana Grande | 2026-07-13 | Brooklyn | https://seatgeek.com/ariana-grande-tickets/brooklyn-new-york-barclays-center-2026-07-13-8-pm/concert/17700819 |
| tm-ariana-grande-2026-brooklyn-1ayzkg_gkdvkvnt | Ariana Grande | 2026-07-16 | Brooklyn | https://seatgeek.com/ariana-grande-tickets/brooklyn-new-york-barclays-center-2026-07-16-8-pm/concert/17700783 |
| tm-ariana-grande-2026-brooklyn-1ayzkgpfavfze27 | Ariana Grande | 2026-07-19 | Brooklyn | https://seatgeek.com/ariana-grande-tickets/brooklyn-new-york-barclays-center-2026-07-19-8-pm/concert/17724146 |
| tm-ariana-grande-2026-boston-vv1a8vn1agacw-67 | Ariana Grande | 2026-07-25 | Boston | https://seatgeek.com/ariana-grande-tickets/boston-massachusetts-td-garden-2026-07-25-8-pm/concert/17724148 |
| tm-ariana-grande-2026-montreal-1aszkg_gkdqixil | Ariana Grande | 2026-07-28 | Montreal | https://seatgeek.com/ariana-grande-tickets/montreal-canada-centre-bell-2026-07-28-8-pm/concert/17700815 |
| tm-ariana-grande-2026-montreal-1aszkg_gkdrmecg | Ariana Grande | 2026-07-31 | Montreal | https://seatgeek.com/ariana-grande-tickets/montreal-canada-centre-bell-2026-07-31-8-pm/concert/17724151 |
| tm-ariana-grande-2026-chicago-vv1a7zkg_gkdqbxs4 | Ariana Grande | 2026-08-03 | Chicago | https://seatgeek.com/ariana-grande-tickets/chicago-illinois-united-center-2026-08-03-8-pm/concert/17700811 |
| tm-ariana-grande-2026-chicago-vv1a7zkgpgkecew3e | Ariana Grande | 2026-08-06 | Chicago | https://seatgeek.com/ariana-grande-tickets/chicago-illinois-united-center-2026-08-06-8-pm/concert/17724381 |
| tm-jay-z-2026-inglewood-vvg1iz_gncu5jv | JAY-Z | 2026-10-23 | Inglewood | https://seatgeek.com/jay-z-tickets/inglewood-california-sofi-stadium-2026-10-23-8-pm/concert/18296599 |
| tm-charli-xcx-2026-philadelphia-17gzv0g6gp0_67j | Charli xcx | 2026-09-11 | Philadelphia | https://seatgeek.com/charli-xcx-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-09-11-8-pm/concert/18292509 |
| tm-charli-xcx-2026-brooklyn-17gzv0g6g9lbbzt | Charli xcx | 2026-09-14 | Brooklyn | https://seatgeek.com/charli-xcx-tickets/brooklyn-new-york-barclays-center-2026-09-14-7-30-pm/concert/18292511 |
| tm-charli-xcx-2026-brooklyn-17gzv0g6g9lhqy5 | Charli xcx | 2026-09-15 | Brooklyn | https://seatgeek.com/charli-xcx-tickets/brooklyn-new-york-barclays-center-2026-09-15-7-30-pm/concert/18292510 |
| tm-charli-xcx-2026-toronto-177zv0g6gkluljm | Charli xcx | 2026-09-21 | Toronto | https://seatgeek.com/charli-xcx-tickets/toronto-canada-scotiabank-arena-2026-09-21-7-30-pm/concert/18292530 |
| tm-charli-xcx-2026-boston-vvg17z_gpmbifj | Charli xcx | 2026-09-24 | Boston | https://seatgeek.com/charli-xcx-tickets/boston-massachusetts-td-garden-2026-09-24-8-pm/concert/18292514 |
| tm-charli-xcx-2026-washington-17a8v0g6gknsol1 | Charli xcx | 2026-09-28 | Washington | https://seatgeek.com/charli-xcx-tickets/washington-district-of-columbia-capital-one-arena-2026-09-28-7-30-pm/concert/18292512 |
| tm-charli-xcx-2026-atlanta-vvg1zz_g99-nfd | Charli xcx | 2026-10-06 | Atlanta | https://seatgeek.com/charli-xcx-tickets/atlanta-georgia-state-farm-arena-1-2026-10-06-8-pm/concert/18292513 |
| tm-charli-xcx-2026-san-diego-vvg1iz_gpnxmrx | Charli xcx | 2026-10-14 | San Diego | https://seatgeek.com/charli-xcx-tickets/san-diego-california-viejas-arena-at-aztec-bowl-2026-10-14-8-pm/concert/18292521 |
| tm-charli-xcx-2026-inglewood-vvg10z_g9r7nph | Charli xcx | 2026-10-17 | Inglewood | https://seatgeek.com/charli-xcx-tickets/inglewood-california-kia-forum-2026-10-17-8-pm/concert/18292522 |
| tm-charli-xcx-2026-inglewood-vvg10z_g9gehi7 | Charli xcx | 2026-10-18 | Inglewood | https://seatgeek.com/charli-xcx-tickets/inglewood-california-kia-forum-2026-10-18-8-pm/concert/18292523 |
| tm-charli-xcx-2026-glendale-17k8v0g6g9pu_yt | Charli xcx | 2026-10-21 | Glendale | https://seatgeek.com/charli-xcx-tickets/glendale-arizona-desert-diamond-arena-2026-10-21-8-pm/concert/18292524 |
| tm-rosalia-2026-oakland-g5vyzbumkyr1f | ROSALÍA | 2026-07-06 | Oakland | https://seatgeek.com/rosalia-tickets/oakland-california-oakland-arena-2026-07-06-8-30-pm/concert/17943520 |
| tm-summer-walker-2026-bristow-17a8v0g6urtwfpk | Summer Walker | 2026-09-19 | Bristow | https://seatgeek.com/summer-walker-tickets/bristow-virginia-jiffy-lube-live-2026-09-19-5-pm/concert/18331559 |
| tm-summer-walker-2026-chicago-vvg18z_uroiect | Summer Walker | 2026-10-16 | Chicago | https://seatgeek.com/summer-walker-tickets/chicago-illinois-credit-union-1-arena-at-uic-2026-10-16-7-30-pm/concert/18328041 |

## Events skipped

Skipped rows are only the Ticketmaster-verified events that were still missing a valid `seatgeek_url` when this run started.

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
| tm-olivia-rodrigo-2027-london-1adfz_agkdz-z3p | Olivia Rodrigo | 2027-05-09 | London | no_candidates_returned | - |
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

## Accepted venue mismatches

- None

## Conflicts found

- None

## Rate-limited / not checked

- None

## API/environment failures

- None
