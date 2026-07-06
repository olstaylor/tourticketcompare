# SeatGeek CTA auto-add log

Generated: 2026-07-06T09:16:38.049Z

## Run summary

- Mode: apply-high-confidence
- SeatGeek client ID present: true
- SeatGeek client secret present: false
- API access with client ID only: HTTP 200
- Total events in data: 402
- Ticketmaster-verified events: 265
- Events already carrying a valid SeatGeek URL: 234
- Ticketmaster-verified events already carrying a valid SeatGeek URL: 178
- Ticketmaster-verified events still missing a valid SeatGeek URL before this run: 87
- Events selected/logged by this run: 87
- Events checked by this run: 87
- API calls made: 435
- Rate-limit responses: 0
- URLs added: 0
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

- `URLs added: 0` refers only to new links added by this run; it does not mean the data set has no SeatGeek links.
- 234 event(s) already carried valid SeatGeek URLs before this run, including 178 Ticketmaster-verified event(s).
- This run queried only the 87 Ticketmaster-verified event(s) that were still missing a valid `seatgeek_url`.
- SeatGeek returned no API candidates for those remaining event/date/city searches, so no additional event-level URLs were safe to apply automatically.

## URLs added

This section lists only URLs newly added by this run. Events that already had valid SeatGeek URLs were retained in event data and were not re-listed here.

- None

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
