# SeatGeek CTA verification log

Generated: 2026-11-22T23:47:23.651Z

Written by `scripts/verify-seatgeek-events.mjs`. Identity anchor: the
registry-verified `seatgeek_performer_id`; date anchor: UTC-instant match
(±3h) between the event `datetime_iso` and the SeatGeek `datetime_utc`.

## Run summary

- Mode: apply
- Events selected: 1603 (needs_recheck: 734, provenance backfill: 30, stale re-check: 1492)
- Events skipped before API checks: 832
- API calls made: 800
- Verified provenance written: 618
- URLs added: 8
- URLs corrected: 0
- URLs cleared: 61
- Provenance un-verified: 2
- Conflicts (ambiguous, untouched): 3
- No qualifying listing: 45
- Transient API errors (untouched, retried next run): 0
- Stopped early: api_call_limit_reached

## Outcomes

| showId | artist | action | SeatGeek id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-kings-of-leon-2027-phoenix-1a_zk4xgkewyfnx | kings-of-leon | verify (applied) | 18746672 | https://seatgeek.com/kings-of-leon-tickets/phoenix-arizona-talking-stick-resort-amphitheatre-2027-09-24-7-30-pm/concert/18746672 | - |
| tm-megadeth-2027-wichita-vv17bz_pgkr9vwea | megadeth | verify (applied) | 18778424 | https://seatgeek.com/megadeth-tickets/wichita-kansas-intrust-bank-arena-2027-09-25-7-pm/concert/18778424 | - |
| tm-kings-of-leon-2027-austin-g5diz_pk2f12g | kings-of-leon | verify (applied) | 18746674 | https://seatgeek.com/kings-of-leon-tickets/austin-texas-moody-center-atx-2027-09-26-7-30-pm/concert/18746674 | - |
| tm-kings-of-leon-2027-fort-worth-vvg1yz_4lzyuso | kings-of-leon | verify (applied) | 18746676 | https://seatgeek.com/kings-of-leon-tickets/fort-worth-texas-ariat-arena-2027-09-28-7-30-pm/concert/18746676 | - |
| tm-kings-of-leon-2027-alpharetta-vvg1zz_pch0zpt | kings-of-leon | verify (applied) | 18746678 | https://seatgeek.com/kings-of-leon-tickets/alpharetta-georgia-ameris-bank-amphitheatre-2027-09-30-7-30-pm/concert/18746678 | - |
| tm-kings-of-leon-2027-orlando-1axzk40gkdkpvf2 | kings-of-leon | verify (applied) | 18746680 | https://seatgeek.com/kings-of-leon-tickets/orlando-florida-kia-center-2027-10-01-7-pm/concert/18746680 | - |
| tm-kings-of-leon-2027-raleigh-g5evz_p3nejt5 | kings-of-leon | verify (applied) | 18746682 | https://seatgeek.com/kings-of-leon-tickets/raleigh-north-carolina-coastal-credit-union-music-park-at-walnut-creek-2027-10-03-7-30-pm/concert/18746682 | - |
| tm-kings-of-leon-2027-charlotte-g5evz_p5ab5ro | kings-of-leon | verify (applied) | 18747126 | https://seatgeek.com/kings-of-leon-tickets/charlotte-north-carolina-truliant-amphitheater-2027-10-06-7-30-pm/concert/18747126 | - |
| tm-the-dead-south-2027-thunder-bay-1avzz_4gkumrenk | the-dead-south | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Auditorium' vs 'Thunder Bay Community Auditorium'; no qualifying replacement found |
| tm-kings-of-leon-2027-franklin-g5viz_p28lhsa | kings-of-leon | verify (applied) | 18746684 | https://seatgeek.com/kings-of-leon-tickets/franklin-tennessee-firstbank-amphitheater-2027-10-08-7-30-pm/concert/18746684 | - |
| tm-kings-of-leon-2027-mansfield-vv1avzk40gkelbik2 | kings-of-leon | verify (applied) | 18746689 | https://seatgeek.com/kings-of-leon-tickets/mansfield-massachusetts-xfinity-center-ma-2027-10-14-7-30-pm/concert/18746689 | - |
| tm-kings-of-leon-2027-new-york-g5diz_4_hy-cs | kings-of-leon | verify (applied) | 18746691 | https://seatgeek.com/kings-of-leon-tickets/new-york-new-york-madison-square-garden-2027-10-15-8-pm/concert/18746691 | - |
| tm-mat-kearney-2027-madison-vv1a6zk48gkehsz0t | mat-kearney | clear (applied) | - | - | stored URL failed: venue mismatch: 'Orpheum Theater' vs 'Orpheum Theatre - Madison'; no qualifying replacement found |
| tm-beartooth-2026-maplewood-z7r9jz1aava89 | beartooth | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-black-stone-cherry-2026-birmingham-rz7hnez1afuf1f | black-stone-cherry | clear (applied) | - | - | stored URL failed: SeatGeek /events/18637134 returned HTTP 404 (listing confirmed gone); no qualifying replacement found |
| tm-black-stone-cherry-2026-nashville-z7r9jz1aaeapk | black-stone-cherry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-rufus-du-sol-2026-las-vegas-z7r9jz1aav9uy | rufus-du-sol | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |
| tm-latto-2026-boston-z7r9jz1aae_7z | latto | clear (applied) | - | - | stored URL failed: venue mismatch: 'Roadrunner-Boston' vs 'TD Garden'; no qualifying replacement found |
| tm-intocable-2026-san-antonio-g5diz_6xnmhis | intocable | verify (applied) | 18176233 | https://seatgeek.com/intocable-tickets/san-antonio-texas-freeman-coliseum-2026-11-25-7-pm/concert/18176233 | - |
| tm-intocable-2026-fort-worth-vvg1yz_7cpuxpt | intocable | verify (applied) | 18184627 | https://seatgeek.com/intocable-tickets/fort-worth-texas-ariat-arena-2026-11-27-8-pm/concert/18184627 | - |
| tm-latto-2026-philadelphia-vv17fz_4gkux4p4m | latto | clear (applied) | - | - | stored URL failed: venue mismatch: 'NOTO' vs 'Xfinity Mobile Arena'; no qualifying replacement found |
| tm-chris-tomlin-2026-birmingham-1kfzvpfyga2ugky | chris-tomlin | verify (applied) | 18560966 | https://seatgeek.com/chris-tomlin-tickets/birmingham-alabama-alabama-theatre-birmingham-2026-11-30-7-pm/concert/18560966 | - |
| tm-chris-tomlin-2026-birmingham-1aezz_ogkloidyk | chris-tomlin | verify (applied) | 18543012 | https://seatgeek.com/chris-tomlin-tickets/birmingham-alabama-alabama-theatre-birmingham-2026-12-01-7-pm/concert/18543012 | - |
| tm-chris-tomlin-2026-daytona-beach-z7r9jz1aav44a | chris-tomlin | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Peabody Daytona Beach' vs 'Peabody Auditorium'; no qualifying replacement found |
| tm-chris-tomlin-2026-north-charleston-g5evz_oontasw | chris-tomlin | verify (applied) | 18542992 | https://seatgeek.com/chris-tomlin-tickets/north-charleston-south-carolina-north-charleston-performing-arts-center-2026-12-03-7-pm/concert/18542992 | - |
| tm-grace-potter-2026-poughkeepsie-k7vgf_4m5us3r | grace-potter | verify (applied) | 18728149 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/poughkeepsie-new-york-bardavon-opera-house-2026-12-03-7-30-pm/concert/18728149 | - |
| tm-tommy-emmanuel-2026-newberry-z7r9jz1aavs4z | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chris-tomlin-2026-pensacola-g5viz_on0-j6v | chris-tomlin | verify (applied) | 18543014 | https://seatgeek.com/chris-tomlin-tickets/pensacola-florida-saenger-theatre-pensacola-2026-12-04-7-pm/concert/18543014 | - |
| tm-pink-martini-2026-redding-z7r9jz1a7ps3o | pink-martini | clear (applied) | - | - | stored URL failed: venue mismatch: 'Cascade Theater' vs 'Cascade Theatre - Redding'; no qualifying replacement found |
| tm-billy-strings-2026-new-orleans-g5viz_6n0bmge | billy-strings | verify (applied) | 18155651 | https://seatgeek.com/billy-strings-tickets/new-orleans-louisiana-smoothie-king-center-2026-12-05-7-30-pm/concert/18155651 | - |
| tm-rascal-flatts-2026-las-vegas-17c8v0g6c1qpoq5 | rascal-flatts | verify (applied) | 18354506 | https://seatgeek.com/rascal-flatts-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2026-12-05-8-pm/concert/18354506 | - |
| tm-blue-october-2026-oklahoma-city-z7r9jz1a7-v0b | blue-october | clear (applied) | - | - | stored URL failed: venue mismatch: 'Criterion Theater - Oklahoma City' vs 'The Criterion - OKC'; no qualifying replacement found |
| tm-chris-tomlin-2026-knoxville-g5viz_ojuxkcz | chris-tomlin | verify (applied) | 18542727 | https://seatgeek.com/chris-tomlin-tickets/knoxville-tennessee-knoxville-civic-auditorium-and-coliseum-2026-12-08-7-pm/concert/18542727 | - |
| tm-chris-tomlin-2026-newport-news-z7r9jz1aavoof | chris-tomlin | verify (applied) | 18549320 | https://seatgeek.com/chris-tomlin-tickets/newport-news-virginia-ferguson-center-for-the-arts-concert-hall-2026-12-09-7-30-pm/concert/18549320 | - |
| tm-chris-tomlin-2026-jersey-city-vv1aezkf_gkedtdkm | chris-tomlin | verify (applied) | 18543039 | https://seatgeek.com/chris-tomlin-tickets/jersey-city-new-jersey-loew-s-jersey-theatre-2026-12-10-5-30-pm/concert/18543039 | - |
| tm-luke-bryan-2026-las-vegas-1avjz_agkws6gfv | luke-bryan | clear (applied) | - | - | stored URL failed: event instants differ by -12.5h (tolerance ±3h) — likely a different night; no qualifying replacement found |
| tm-lord-huron-2026-philadelphia-vvg1fz_2mgblql | lord-huron | verify (applied) | 18421969 | https://seatgeek.com/lord-huron-tickets/philadelphia-pennsylvania-the-met-philadelphia-2026-12-12-8-pm/concert/18421969 | - |
| tm-a-boogie-wit-da-hoodie-2026-new-york-k7vgf_p5e9_go | a-boogie-wit-da-hoodie | verify (applied) | 18740860 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/new-york-new-york-manhattan-center-hammerstein-ballroom-2026-12-13-7-pm/concert/18740860 | - |
| tm-pink-martini-2026-philadelphia-z7r9jz1a70ppv | pink-martini | clear (applied) | - | - | stored URL failed: venue mismatch: 'Marian Anderson Hall - Kimmel Center' vs 'Kimmel Center - Miller Theater'; no qualifying replacement found |
| tm-victoria-monet-2026-seattle-vvg1hz_31fteps | victoria-monet | clear (applied) | - | - | stored URL failed: venue mismatch: 'Paramount Theatre' vs 'WaMu Theater'; no qualifying replacement found |
| tm-chris-tomlin-2026-detroit-z7r9jz1aav34i | chris-tomlin | add (applied) | 18745094 | https://seatgeek.com/chris-tomlin-tickets/detroit-michigan-fisher-theatre-2026-12-15-7-pm/concert/18745094 | - |
| tm-chris-tomlin-2026-indianapolis-vv17fz_ogkmojkil | chris-tomlin | verify (applied) | 18543195 | https://seatgeek.com/chris-tomlin-tickets/indianapolis-indiana-murat-theatre-at-old-national-centre-2026-12-16-7-pm/concert/18543195 | - |
| tm-beartooth-2026-phoenix-17k8v0g61i5gitx | beartooth | verify (applied) | 18253074 | https://seatgeek.com/beartooth-tickets/phoenix-arizona-the-van-buren-2026-12-16-6-30-pm/concert/18253074 | - |
| tm-victoria-monet-2026-sacramento-g5vyz_3xulwgw | victoria-monet | verify (applied) | 18579797 | https://seatgeek.com/victoria-monet-tickets/sacramento-california-sacramento-memorial-auditorium-2026-12-16-8-pm/concert/18579797 | - |
| tm-chris-tomlin-2026-milwaukee-z7r9jz1aav4be | chris-tomlin | add (applied) | 18549322 | https://seatgeek.com/chris-tomlin-tickets/milwaukee-wisconsin-riverside-theater-milwaukee-2026-12-17-7-pm/concert/18549322 | - |
| tm-jon-pardi-2026-nashville-g5viz_p4pjkae | jon-pardi | verify (applied) | 18763089 | https://seatgeek.com/jon-pardi-tickets/nashville-tennessee-the-truth-nashville-2026-12-17-7-30-pm/concert/18763089 | - |
| tm-lord-huron-2027-oakland-g5vyz_2mrsp3q | lord-huron | verify (applied) | 18421985 | https://seatgeek.com/lord-huron-tickets/oakland-california-fox-theater-oakland-2027-01-03-8-pm/concert/18421985 | - |
| tm-lord-huron-2027-vancouver-1778v0g62bp9vz3 | lord-huron | verify (applied) | 18421986 | https://seatgeek.com/lord-huron-tickets/vancouver-canada-orpheum-theatre-vancouver-2027-01-05-8-pm/concert/18421986 | - |
| tm-brandi-carlile-2027-seattle-vvg1hz_44goz5b | brandi-carlile | verify (applied) | 18723858 | https://seatgeek.com/brandi-carlile-tickets/seattle-washington-paramount-theatre-wa-2027-01-05-8-pm/concert/18723858 | - |
| tm-lord-huron-2027-vancouver-1778v0g62bpn7yz | lord-huron | verify (applied) | 18421991 | https://seatgeek.com/lord-huron-tickets/vancouver-canada-orpheum-theatre-vancouver-2027-01-06-8-pm/concert/18421991 | - |
| tm-brandi-carlile-2027-seattle-vvg1hz_44gxf5- | brandi-carlile | verify (applied) | 18723857 | https://seatgeek.com/brandi-carlile-tickets/seattle-washington-paramount-theatre-wa-2027-01-06-8-pm/concert/18723857 | - |
| tm-lord-huron-2027-seattle-vvg1hz_2t-gnc5 | lord-huron | verify (applied) | 18421992 | https://seatgeek.com/lord-huron-tickets/seattle-washington-paramount-theatre-wa-2027-01-07-8-pm/concert/18421992 | - |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31y4afw | yacht-rock-revue | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Paramount in concert with Northwell' vs 'The Paramount - Huntington'; no qualifying replacement found |
| tm-koe-wetzel-2027-rohnert-park-z7r9jz1aa7zjf | koe-wetzel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31ykyfq | yacht-rock-revue | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Paramount in concert with Northwell' vs 'The Paramount - Huntington'; no qualifying replacement found |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31y3tkt | yacht-rock-revue | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Paramount in concert with Northwell' vs 'The Paramount - Huntington'; no qualifying replacement found |
| tm-missio-2027-chicago-z7r9jz1aazivb | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-grace-potter-2027-portland-vv1avzk4jgkebfxbx | grace-potter | verify (applied) | 18755498 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/portland-maine-state-theatre-portland-me-2027-01-15-7-30-pm/concert/18755498 | - |
| tm-grace-potter-2027-boston-vv1avzk4pgkd0q4bh | grace-potter | verify (applied) | 18755497 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/boston-massachusetts-citizens-house-of-blues-boston-2027-01-16-7-30-pm/concert/18755497 | - |
| tm-barry-manilow-2027-estero-vvg1vzbwhe6k-q | barry-manilow | verify (applied) | 17748832 | https://seatgeek.com/barry-manilow-tickets/estero-florida-hertz-arena-2027-01-16-7-pm/concert/17748832 | - |
| tm-two-friends-2027-miami-beach-rz7hnez1a4vo7k | two-friends | verify (applied) | 18758782 | https://seatgeek.com/two-friends-tickets/miami-beach-florida-liv-nightclub-miami-beach-2027-01-16-11-30-pm/concert/18758782 | - |
| tm-barry-manilow-2027-estero-vvg1vzbwhe6n-j | barry-manilow | verify (applied) | 17748833 | https://seatgeek.com/barry-manilow-tickets/estero-florida-hertz-arena-2027-01-17-7-pm/concert/17748833 | - |
| tm-pink-martini-2027-athens-z7r9jz1a7pv8_ | pink-martini | clear (applied) | - | - | stored URL failed: venue mismatch: 'Ramsey Concert Hall' vs 'Hodgson Concert Hall at the UGA Performing Arts Center'; no qualifying replacement found |
| tm-grace-potter-2027-mckees-rocks-1apzk4jgkdpsghe | grace-potter | verify (applied) | 18755496 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/mckees-rocks-pennsylvania-roxian-theatre-2027-01-20-7-30-pm/concert/18755496 | - |
| tm-atmosphere-2027-grand-junction-z7r9jz1aaezfe | atmosphere | clear (applied) | - | - | stored URL failed: venue mismatch: 'Mesa Theatre & Club' vs 'Mesa Theater'; no qualifying replacement found |
| tm-grace-potter-2027-rochester-k7vgf_peejxna | grace-potter | verify (applied) | 18755499 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/rochester-new-york-kodak-center-2027-01-21-7-30-pm/concert/18755499 | - |
| tm-air-supply-2027-daytona-beach-z7r9jz1a7pozg | air-supply | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Peabody Daytona Beach' vs 'Peabody Auditorium'; no qualifying replacement found |
| tm-grace-potter-2027-new-york-g5diz_pqp7kdd | grace-potter | verify (applied) | 18755507 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/new-york-new-york-beacon-theatre-2027-01-23-8-pm/concert/18755507 | - |
| tm-grace-potter-2027-patchogue-z7r9jz1aaak_x | grace-potter | clear (applied) | - | - | stored URL failed: venue mismatch: 'Patchogue Theater' vs 'Patchogue Theatre for the Performing Arts'; no qualifying replacement found |
| tm-simple-plan-2027-victoria-z7r9jz1aae__3 | simple-plan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-saint-petersburg-z7r9jz1aae_gk | chelsea-cutler | clear (applied) | - | - | stored URL failed: event instants differ by -15.5h (tolerance ±3h) — likely a different night; no qualifying replacement found |
| tm-chelsea-cutler-2027-atlanta-z7r9jz1aae_gf | chelsea-cutler | clear (applied) | - | - | stored URL failed: event instants differ by -16.5h (tolerance ±3h) — likely a different night; no qualifying replacement found |
| tm-air-supply-2027-immokalee-vvg1vz_2x6gs2d | air-supply | clear (applied) | - | - | stored URL failed: venue mismatch: 'Seminole Center' vs 'Seminole Casino Immokalee'; no qualifying replacement found |
| tm-tommy-emmanuel-2027-rochester-z7r9jz1aavsp7 | tommy-emmanuel | clear (applied) | - | - | stored URL failed: venue mismatch: 'Rose Marie and John Beston Hall' vs 'Nazareth College Arts Center'; no qualifying replacement found |
| tm-chelsea-cutler-2027-nashville-z7r9jz1aaefb3 | chelsea-cutler | clear (applied) | - | - | stored URL failed: event instants differ by -16.5h (tolerance ±3h) — likely a different night; no qualifying replacement found |
| tm-karan-aujla-2026-dallas-vvg1yz_3r_e2at | karan-aujla | verify (applied) | 18592287 | https://seatgeek.com/karan-aujla-tickets/dallas-texas-american-airlines-center-2027-02-03-8-pm/concert/18592287 | - |
| tm-garth-brooks-2027-north-little-rock-g5viz_ploilrd | garth-brooks | verify (applied) | 18758115 | https://seatgeek.com/garth-brooks-tickets/north-little-rock-arkansas-simmons-bank-arena-2027-02-05-8-pm/concert/18758115 | - |
| tm-mat-kearney-2027-kalispell-z7r9jz1aazpfi | mat-kearney | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-karan-aujla-2026-washington-1a4zkftgkdhkud5 | karan-aujla | verify (applied) | 18592289 | https://seatgeek.com/karan-aujla-tickets/washington-district-of-columbia-capital-one-arena-2027-02-06-8-pm/concert/18592289 | - |
| tm-garth-brooks-2027-north-little-rock-g5viz_plkwtt5 | garth-brooks | verify (applied) | 18758119 | https://seatgeek.com/garth-brooks-tickets/north-little-rock-arkansas-simmons-bank-arena-2027-02-06-8-pm/concert/18758119 | - |
| tm-karan-aujla-2026-new-york-g5diz_3ivacnr | karan-aujla | verify (applied) | 18592288 | https://seatgeek.com/karan-aujla-tickets/new-york-new-york-madison-square-garden-2027-02-08-8-pm/concert/18592288 | - |
| tm-valley-2027-waterloo-z7r9jz1aavzft | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tame-impala-2027-tulsa-1aozk4jgkexpfxk | tame-impala | verify (applied) | 18760897 | https://seatgeek.com/tame-impala-tickets/tulsa-oklahoma-bok-center-2027-02-10-7-pm/concert/18760897 | - |
| tm-pink-martini-2027-cincinnati-z7r9jz1a7pp4b | pink-martini | clear (applied) | - | - | stored URL failed: venue mismatch: 'Memorial Hall - OH' vs 'Anderson Theater At Cincinnati Memorial Hall'; no qualifying replacement found |
| tm-karan-aujla-2026-atlanta-vvg1zz_3myjgwo | karan-aujla | verify (applied) | 18592290 | https://seatgeek.com/karan-aujla-tickets/atlanta-georgia-state-farm-arena-1-2027-02-11-8-pm/concert/18592290 | - |
| tm-tame-impala-2027-tulsa-1aezz_pgkmxe71m | tame-impala | verify (applied) | 18843579 | https://seatgeek.com/tame-impala-tickets/tulsa-oklahoma-bok-center-2027-02-11-7-pm/concert/18843579 | - |
| tm-yuridia-2027-palm-desert-vvg1iz_35qkx8b | yuridia | clear (applied) | - | - | stored URL failed: city mismatch: 'Palm Desert' vs 'Thousand Palms'; no qualifying replacement found |
| tm-missio-2027-brooklyn-z7r9jz1aazivx | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-grace-potter-2027-st-paul-z7r9jz1aaak_e | grace-potter | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-boston-z7r9jz1aaefp9 | chelsea-cutler | clear (applied) | - | - | stored URL failed: event instants differ by -16.5h (tolerance ±3h) — likely a different night; no qualifying replacement found |
| tm-dylan-scott-2026-milwaukee-z7r9jz1aavse9 | dylan-scott | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-grace-potter-2027-des-moines-vv1akzk4jgkd-akup | grace-potter | verify (applied) | 18755536 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/des-moines-iowa-hoyt-sherman-place-2027-02-13-8-pm/concert/18755536 | - |
| tm-cristian-castro-2027-palm-desert-vvg1iz_1h-rylv | cristian-castro | clear (applied) | - | - | stored URL failed: city mismatch: 'Palm Desert' vs 'Thousand Palms'; no qualifying replacement found |
| tm-foreigner-2027-daytona-beach-z7r9jz1aaedca | foreigner | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Peabody Daytona Beach' vs 'Peabody Auditorium'; no qualifying replacement found |
| tm-pink-martini-2027-madison-vv1a6zkfagkec5a4v | pink-martini | clear (applied) | - | - | stored URL failed: venue mismatch: 'Orpheum Theater' vs 'Orpheum Theatre - Madison'; no qualifying replacement found |
| tm-phoebe-bridgers-2027-portland-vvg1hz_pjbo4da | phoebe-bridgers | verify (applied) | 18760617 | https://seatgeek.com/phoebe-bridgers-tickets/portland-oregon-moda-center-2027-02-17-7-30-pm/concert/18760617 | - |
| tm-valley-2027-regina-z7r9jz1aavzfw | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-edmonton-1av7z_3gkbxlimr | valley | clear (applied) | - | - | stored URL failed: venue mismatch: 'Midway Music Hall' vs 'Midway - Edmonton'; no qualifying replacement found |
| tm-karan-aujla-2026-los-angeles-g5eyz_3lgqzvb | karan-aujla | verify (applied) | 18592285 | https://seatgeek.com/karan-aujla-tickets/los-angeles-california-crypto-com-arena-2027-02-19-8-pm/concert/18592285 | - |
| tm-intocable-2027-chicago-vv178z_pgkrpyrnn | intocable | verify (applied) | 18780707 | https://seatgeek.com/intocable-tickets/chicago-illinois-credit-union-1-arena-at-uic-2027-02-20-8-pm/concert/18780707 | - |
| tm-chelsea-cutler-2027-columbus-z7r9jz1aaef0s | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-meshuggah-2027-omaha-1aozk4fgkd-wmvg | meshuggah | verify (applied) | 18724647 | https://seatgeek.com/meshuggah-tickets/omaha-nebraska-steelhouse-omaha-2027-02-21-7-pm/concert/18724647 | - |
| tm-phoebe-bridgers-2027-edmonton-1av7z_pgkm691wt | phoebe-bridgers | verify (applied) | 18785990 | https://seatgeek.com/phoebe-bridgers-tickets/edmonton-canada-rogers-place-2027-02-21-6-30-pm/concert/18785990 | - |
| tm-karan-aujla-2026-sacramento-g5vyz_3m-gnbm | karan-aujla | verify (applied) | 18592286 | https://seatgeek.com/karan-aujla-tickets/sacramento-california-golden-1-center-2027-02-21-8-pm/concert/18592286 | - |
| tm-phoebe-bridgers-2027-winnipeg-1av7z_pgknuq0xy | phoebe-bridgers | verify (applied) | 18760619 | https://seatgeek.com/phoebe-bridgers-tickets/winnipeg-canada-canada-life-centre-2027-02-23-7-30-pm/concert/18760619 | - |
| tm-hollywood-undead-2027-london-g5dzz_kxga-ng | hollywood-undead | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-remi-wolf-2027-washington-1a4zk4agkemriif | remi-wolf | verify (applied) | 18786076 | https://seatgeek.com/remi-wolf-tickets/washington-district-of-columbia-the-anthem-dc-2027-02-24-7-30-pm/concert/18786076 | - |
| tm-santana-2027-san-francisco-g5vyz_puhzl3h | santana | verify (applied) | 18784694 | https://seatgeek.com/santana-tickets/san-francisco-california-the-fillmore-san-francisco-2027-02-25-8-pm/concert/18784694 | - |
| tm-meshuggah-2027-virginia-beach-vv1a8vp4dga5tbtb | meshuggah | verify (applied) | 18724654 | https://seatgeek.com/meshuggah-tickets/virginia-beach-virginia-the-dome-13-2027-02-26-7-pm/concert/18724654 | - |
| tm-remi-wolf-2027-philadelphia-vv1aovpotga2njys | remi-wolf | verify (applied) | 18664758 | https://seatgeek.com/remi-wolf-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-02-26-8-pm/concert/18664758 | - |
| tm-dinosaur-jr-2027-cincinnati-1kaovpaogacpo0v | dinosaur-jr | clear (applied) | - | - | stored URL failed: venue mismatch: 'Bogart's' vs 'Bogarts - Cincinnati'; no qualifying replacement found |
| tm-grace-potter-2027-denver-g5vzz_phlm6bi | grace-potter | verify (applied) | 18755540 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/denver-colorado-fillmore-auditorium-denver-2027-02-27-7-30-pm/concert/18755540 | - |
| tm-dylan-scott-2027-chandler-1av0z_3gkshqv4x | dylan-scott | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Showroom at Wild Horse Pass Resort & Casino' vs 'Gila River Hotels & Casinos - Wild Horse Pass'; no qualifying replacement found |
| tm-santana-2027-san-francisco-g5vyz_puqth3t | santana | verify (applied) | 18784692 | https://seatgeek.com/santana-tickets/san-francisco-california-the-fillmore-san-francisco-2027-02-27-8-pm/concert/18784692 | - |
| tm-intocable-2027-duluth-vvg1zz_pwe5ag0 | intocable | verify (applied) | 18780651 | https://seatgeek.com/intocable-tickets/duluth-georgia-gas-south-arena-2027-02-28-7-pm/concert/18780651 | - |
| tm-chelsea-cutler-2027-denver-z7r9jz1aae_g4 | chelsea-cutler | clear (applied) | - | - | stored URL failed: event instants differ by -16.5h (tolerance ±3h) — likely a different night; no qualifying replacement found |
| tm-santana-2027-san-francisco-g5vyz_puqx53g | santana | verify (applied) | 18784696 | https://seatgeek.com/santana-tickets/san-francisco-california-the-fillmore-san-francisco-2027-02-28-8-pm/concert/18784696 | - |
| tm-daughtry-2027-orono-z7r9jz1aae836 | daughtry | clear (applied) | - | - | stored URL failed: venue mismatch: 'Hutchins Concert Hall' vs 'Collins Center for the Arts'; no qualifying replacement found |
| tm-meshuggah-2027-philadelphia-vv1aezk44gkd2msbd | meshuggah | verify (applied) | 18724657 | https://seatgeek.com/meshuggah-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-03-02-7-pm/concert/18724657 | - |
| tm-air-supply-2027-ottawa-1ad7z_3gksa1dub | air-supply | clear (applied) | - | - | stored URL failed: venue mismatch: 'Hard Rock Hotel & Casino Ottawa' vs 'Hard Rock Cafe'; no qualifying replacement found |
| tm-phoebe-bridgers-2027-milwaukee-vv1kjz_pjpg7y3tm | phoebe-bridgers | verify (applied) | 18760629 | https://seatgeek.com/phoebe-bridgers-tickets/milwaukee-wisconsin-fiserv-forum-2027-03-04-7-30-pm/concert/18760629 | - |
| tm-grace-potter-2027-tucson-1a_zk4jgkdj3ibg | grace-potter | verify (applied) | 18755548 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/tucson-arizona-rialto-theatre-2027-03-04-8-pm/concert/18755548 | - |
| tm-hazlett-2027-oslo-z698xzb_z16v-jveop | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dinosaur-jr-2027-chicago-z7r9jz1aaedov | dinosaur-jr | clear (applied) | - | - | stored URL failed: venue mismatch: 'Vic Theatre' vs 'The WIP Theater'; no qualifying replacement found |
| tm-flans-2027-kansas-city-z7r9jz1aaevrv | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-intocable-2027-fresno-g5vyz_pmjs49u | intocable | verify (applied) | 18780589 | https://seatgeek.com/intocable-tickets/fresno-california-save-mart-center-2027-03-05-8-pm/concert/18780589 | - |
| tm-mico-2027-lawrence-z7r9jz1aa7a_g | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jason-aldean-2027-durant-vvg1yz_4wtfp_q | jason-aldean | verify (applied) | 18781160 | https://seatgeek.com/jason-aldean-tickets/durant-oklahoma-choctaw-grand-theater-2027-03-06-8-pm/concert/18781160 | - |
| tm-grace-potter-2027-las-vegas-1a9zk4jgken85tq | grace-potter | verify (applied) | 18755550 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/las-vegas-nevada-the-stage-at-zouk-2027-03-06-7-30-pm/concert/18755550 | - |
| tm-valley-2027-denver-z7r9jz1aavzfu | valley | clear (applied) | - | - | stored URL failed: venue mismatch: 'Bluebird Theatre' vs 'Bluebird Theater - Denver'; no qualifying replacement found |
| tm-chelsea-cutler-2027-san-francisco-z7r9jz1aae_gp | chelsea-cutler | clear (applied) | - | - | stored URL failed: event instants differ by -16.5h (tolerance ±3h) — likely a different night; no qualifying replacement found |
| tm-intocable-2027-inglewood-vv170z_pgkrollqf | intocable | verify (applied) | 18782990 | https://seatgeek.com/intocable-tickets/inglewood-california-intuit-dome-2027-03-06-8-pm/concert/18782990 | - |
| tm-grace-potter-2027-phoenix-1a_zk4jgkdkzmdr | grace-potter | verify (applied) | 18755552 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/phoenix-arizona-the-van-buren-2027-03-07-7-30-pm/concert/18755552 | - |
| tm-pink-martini-2027-pittsburgh-z7r9jz1aavjpj | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-phoebe-bridgers-2027-raleigh-g5evz_pekwioi | phoebe-bridgers | verify (applied) | 18760632 | https://seatgeek.com/phoebe-bridgers-tickets/raleigh-north-carolina-lenovo-center-2027-03-09-7-30-pm/concert/18760632 | - |
| tm-phoebe-bridgers-2027-baltimore-1a4zk4jgkdbmyfh | phoebe-bridgers | verify (applied) | 18760637 | https://seatgeek.com/phoebe-bridgers-tickets/baltimore-maryland-cfg-bank-arena-2027-03-10-7-30-pm/concert/18760637 | - |
| tm-jhene-aiko-2027-saint-louis-vv17bz_pgkmdcqlf | jhene-aiko | verify (applied) | 18783861 | https://seatgeek.com/jhene-aiko-tickets/saint-louis-missouri-enterprise-center-2027-03-10-7-30-pm/concert/18783861 | - |
| tm-theory-of-a-deadman-2027-ottawa-1aszkfngkedu_z0 | theory-of-a-deadman | clear (applied) | - | - | stored URL failed: venue mismatch: 'Hard Rock Hotel & Casino Ottawa' vs 'Hard Rock Cafe'; no qualifying replacement found |
| tm-flans-2027-las-vegas-z7r9jz1aaeaov | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-grace-potter-2027-san-francisco-g5vyz_php4sdr | grace-potter | verify (applied) | 18755560 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/san-francisco-california-the-fillmore-san-francisco-2027-03-11-8-pm/concert/18755560 | - |
| tm-mico-2027-cincinnati-1apzk47gkdey9ag | mico | clear (applied) | - | - | stored URL failed: venue mismatch: 'Bogart's' vs 'Bogarts - Cincinnati'; no qualifying replacement found |
| tm-cody-johnson-2027-albany-k7vgf_p30ueon | cody-johnson | verify (applied) | 18842219 | https://seatgeek.com/cody-johnson-tickets/albany-new-york-mvp-arena-2027-03-12-7-pm/concert/18842219 | - |
| tm-breaking-benjamin-2027-atlantic-city-vv1aezk49gkdmxvx- | breaking-benjamin | verify (applied) | 18742758 | https://seatgeek.com/breaking-benjamin-tickets/atlantic-city-new-jersey-ovation-hall-at-ocean-resort-casino-2027-03-12-7-30-pm/concert/18742758 | - |
| tm-phoebe-bridgers-2027-pittsburgh-1kaovpqdgaugc_p | phoebe-bridgers | verify (applied) | 18760633 | https://seatgeek.com/phoebe-bridgers-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-03-12-7-30-pm/concert/18760633 | - |
| tm-jhene-aiko-2027-minneapolis-vv17bz_pgkm4rom4 | jhene-aiko | verify (applied) | 18783860 | https://seatgeek.com/jhene-aiko-tickets/minneapolis-minnesota-target-center-2027-03-12-7-30-pm/concert/18783860 | - |
| tm-cody-johnson-2027-albany-k7vgf_4nhl9nn | cody-johnson | verify (applied) | 18773452 | https://seatgeek.com/cody-johnson-tickets/albany-new-york-mvp-arena-2027-03-13-7-pm/concert/18773452 | - |
| tm-jhene-aiko-2027-milwaukee-vv17jz_pgkuxx_4x | jhene-aiko | verify (applied) | 18783857 | https://seatgeek.com/jhene-aiko-tickets/milwaukee-wisconsin-fiserv-forum-2027-03-13-7-30-pm/concert/18783857 | - |
| tm-grace-potter-2027-napa-g5vyz_ppqswad | grace-potter | verify (applied) | 18755562 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/napa-california-uptown-theatre-napa-2027-03-13-7-pm/concert/18755562 | - |
| tm-mercyme-2027-highland-heights-1avbz_fgkwx5pep | mercyme | verify (applied) | 18692229 | https://seatgeek.com/mercyme-tickets/highland-heights-kentucky-truist-arena-2027-03-14-7-pm/concert/18692229 | - |
| tm-grace-potter-2027-redding-z7r9jz1aaa64i | grace-potter | clear (applied) | - | - | stored URL failed: venue mismatch: 'Cascade Theater' vs 'Cascade Theatre - Redding'; no qualifying replacement found |
| tm-jhene-aiko-2027-kansas-city-vv17bz_pgkmduzpp | jhene-aiko | verify (applied) | 18783859 | https://seatgeek.com/jhene-aiko-tickets/kansas-city-missouri-t-mobile-center-2027-03-15-7-30-pm/concert/18783859 | - |
| tm-the-rankin-family-2027-thunder-bay-1a8zk40gkd5kq6z | the-rankin-family | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Auditorium' vs 'Thunder Bay Community Auditorium'; no qualifying replacement found |
| tm-phoebe-bridgers-2027-newark-vv1kfz_9vyg7cw_y | phoebe-bridgers | verify (applied) | 18784688 | https://seatgeek.com/phoebe-bridgers-tickets/newark-new-jersey-prudential-center-2027-03-17-7-30-pm/concert/18784688 | - |
| tm-remi-wolf-2027-cincinnati-1kaovpo_gagbfxb | remi-wolf | verify (applied) | 18664773 | https://seatgeek.com/remi-wolf-tickets/cincinnati-ohio-andrew-j-brady-music-center-2027-03-17-8-pm/concert/18664773 | - |
| tm-jhene-aiko-2027-columbus-vv17fz_pgkmwl1_h | jhene-aiko | verify (applied) | 18783858 | https://seatgeek.com/jhene-aiko-tickets/columbus-ohio-nationwide-arena-2027-03-18-7-30-pm/concert/18783858 | - |
| tm-theory-of-a-deadman-2027-thunder-bay-1avzz_ogkrpopru | theory-of-a-deadman | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Auditorium' vs 'Thunder Bay Community Auditorium'; no qualifying replacement found |
| tm-phoebe-bridgers-2027-university-park-vv1aovp_uga2cx87 | phoebe-bridgers | verify (applied) | 18760641 | https://seatgeek.com/phoebe-bridgers-tickets/university-park-pennsylvania-bryce-jordan-center-2027-03-19-7-30-pm/concert/18760641 | - |
| tm-jhene-aiko-2027-buffalo-k7vgf_pm2cxpu | jhene-aiko | verify (applied) | 18783862 | https://seatgeek.com/jhene-aiko-tickets/buffalo-new-york-keybank-center-2027-03-19-7-30-pm/concert/18783862 | - |
| tm-intocable-2027-san-jose-g5vyz_pi39fpd | intocable | verify (applied) | 18780588 | https://seatgeek.com/intocable-tickets/san-jose-california-sap-center-at-san-jose-2027-03-19-8-pm/concert/18780588 | - |
| tm-cody-johnson-2027-fargo-vv1akzk4fgkejxfzw | cody-johnson | verify (applied) | 18773454 | https://seatgeek.com/cody-johnson-tickets/fargo-north-dakota-fargodome-2027-03-20-7-pm/concert/18773454 | - |
| tm-rascal-flatts-2027-rexburg-z7r9jz1aaa-fg | rascal-flatts | verify (applied) | 18839964 | https://seatgeek.com/rascal-flatts-tickets/rexburg-idaho-byu-idaho-center-2027-03-20-7-30-pm/concert/18839964 | - |
| tm-grace-potter-2027-bozeman-g5vzz_pprxf60 | grace-potter | verify (applied) | 18755573 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/bozeman-montana-the-elm-1-2027-03-20-8-pm/concert/18755573 | - |
| tm-rod-stewart-2027-lexington-1avbz_pgkw52aaz | rod-stewart | verify (applied) | 18780590 | https://seatgeek.com/rod-stewart-tickets/lexington-kentucky-rupp-arena-2027-03-21-6-30-pm/concert/18780590 | - |
| tm-phoebe-bridgers-2027-hamilton-168zk4eqbza5ddga | phoebe-bridgers | verify (applied) | 18760650 | https://seatgeek.com/phoebe-bridgers-tickets/hamilton-canada-td-coliseum-2027-03-21-7-30-pm/concert/18760650 | - |
| tm-jhene-aiko-2027-chicago-vv178z_pgkm4m_1r | jhene-aiko | verify (applied) | 18783869 | https://seatgeek.com/jhene-aiko-tickets/chicago-illinois-united-center-2027-03-21-7-30-pm/concert/18783869 | - |
| tm-grace-potter-2027-missoula-g5vzz_pf4jtaa | grace-potter | verify (applied) | 18755574 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/missoula-montana-the-wilma-theatre-mt-2027-03-21-7-pm/concert/18755574 | - |
| tm-jhene-aiko-2027-detroit-vv17oz_pgkwjgvk2 | jhene-aiko | verify (applied) | 18783871 | https://seatgeek.com/jhene-aiko-tickets/detroit-michigan-little-caesars-arena-2027-03-22-7-30-pm/concert/18783871 | - |
| tm-tori-kelly-2027-tulsa-z7r9jz1aaafav | tori-kelly | add (applied) | 18778951 | https://seatgeek.com/tori-kelly-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-03-22-7-pm/concert/18778951 | - |
| tm-grace-potter-2027-spokane-g5vzz_penguiq | grace-potter | verify (applied) | 18755575 | https://seatgeek.com/grace-potter-the-nocturnals-tickets/spokane-washington-knitting-factory-spokane-2027-03-22-7-30-pm/concert/18755575 | - |
| tm-phoebe-bridgers-2027-montreal-1aszk4jgkd6dpxr | phoebe-bridgers | verify (applied) | 18760651 | https://seatgeek.com/phoebe-bridgers-tickets/montreal-canada-centre-bell-2027-03-23-7-30-pm/concert/18760651 | - |
| tm-jhene-aiko-2027-toronto-1avzz_pgkm8-pwg | jhene-aiko | verify (applied) | 18783919 | https://seatgeek.com/jhene-aiko-tickets/toronto-canada-scotiabank-arena-2027-03-24-7-30-pm/concert/18783919 | - |
| tm-tori-kelly-2027-austin-z7r9jz1aaafaz | tori-kelly | add (applied) | 18778949 | https://seatgeek.com/tori-kelly-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-03-24-7-pm/concert/18778949 | - |
| tm-phoebe-bridgers-2027-kanata-1kg8vp_fga54way | phoebe-bridgers | verify (applied) | 18760655 | https://seatgeek.com/phoebe-bridgers-tickets/kanata-canada-canadian-tire-centre-2027-03-25-7-30-pm/concert/18760655 | - |
| tm-mercyme-2027-tallahassee-17fov0g613pbs0q | mercyme | verify (applied) | 18692246 | https://seatgeek.com/mercyme-tickets/tallahassee-florida-donald-l-tucker-civic-center-2027-03-26-7-pm/concert/18692246 | - |
| tm-jhene-aiko-2027-brooklyn-1adzz_pgkwqo0e1 | jhene-aiko | verify (applied) | 18783873 | https://seatgeek.com/jhene-aiko-tickets/brooklyn-new-york-barclays-center-2027-03-26-7-30-pm/concert/18783873 | - |
| tm-warren-zeiders-2027-hollywood-vvg1vz_fkapkzq | warren-zeiders | clear (applied) | - | - | stored URL failed: venue mismatch: 'Hard Rock Live' vs 'DAER Nightclub At The Seminole Hard Rock Hotel & Casino'; no qualifying replacement found |
| tm-jhene-aiko-2027-boston-vv177z_pgkm0b_wn | jhene-aiko | verify (applied) | 18783874 | https://seatgeek.com/jhene-aiko-tickets/boston-massachusetts-td-garden-2027-03-27-7-30-pm/concert/18783874 | - |
| tm-santana-2027-bethlehem-vv17fz_pgkmh0npz | santana | verify (applied) | 18784697 | https://seatgeek.com/santana-tickets/bethlehem-pennsylvania-wind-creek-event-center-2027-03-27-8-pm/concert/18784697 | - |
| tm-foreigner-2027-irvine-z7r9jz1aaa6uy | foreigner | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-vnv-nation-2027-denver-z7r9jz1a7jv8m | vnv-nation | clear (applied) | - | - | stored URL failed: venue mismatch: 'Oriental Theatre-CO' vs 'The Oriental Theater'; no qualifying replacement found |
| tm-jhene-aiko-2027-pittsburgh-1avbz_pgkuj2euk | jhene-aiko | verify (applied) | 18783876 | https://seatgeek.com/jhene-aiko-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-03-29-7-30-pm/concert/18783876 | - |
| tm-santana-2027-pittsburgh-1avbz_pgkmfvkd9 | santana | verify (applied) | 18784704 | https://seatgeek.com/santana-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2027-03-29-8-pm/concert/18784704 | - |
| tm-vnv-nation-2027-st-paul-z7r9jz1a7jzvu | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-santana-2027-windsor-1avzz_pgkyz-kdw | santana | verify (applied) | 18784705 | https://seatgeek.com/santana-tickets/windsor-canada-the-colosseum-at-caesars-windsor-2027-03-31-8-pm/concert/18784705 | - |
| tm-jhene-aiko-2027-washington-1avfz_pgkirkqcv | jhene-aiko | verify (applied) | 18783878 | https://seatgeek.com/jhene-aiko-tickets/washington-district-of-columbia-capital-one-arena-2027-04-01-7-30-pm/concert/18783878 | - |
| tm-santana-2027-niagara-falls-1avzz_pgkm2345j | santana | verify (applied) | 18784708 | https://seatgeek.com/santana-tickets/niagara-falls-canada-olg-stage-at-fallsview-casino-2027-04-01-8-pm/concert/18784708 | - |
| tm-jhene-aiko-2027-newark-vv17fz_pgksjk0ub | jhene-aiko | verify (applied) | 18783880 | https://seatgeek.com/jhene-aiko-tickets/newark-new-jersey-prudential-center-2027-04-02-7-30-pm/concert/18783880 | - |
| tm-vnv-nation-2027-cleveland-vv1kfzbv0wg7mfd6 | vnv-nation | verify (applied) | 18842839 | https://seatgeek.com/vnv-nation-tickets/cleveland-ohio-house-of-blues-cleveland-2027-04-03-7-pm/concert/18842839 | - |
| tm-cody-johnson-2027-charlottesville-vv1avzk4ngkde3rwt | cody-johnson | verify (applied) | 18773453 | https://seatgeek.com/cody-johnson-tickets/charlottesville-virginia-john-paul-jones-arena-2027-04-03-7-pm/concert/18773453 | - |
| tm-air-supply-2027-indianapolis-vv17fz_pgkskhuw1 | air-supply | verify (applied) | 18782016 | https://seatgeek.com/air-supply-tickets/indianapolis-indiana-murat-theatre-at-old-national-centre-2027-04-03-7-pm/concert/18782016 | - |
| tm-jhene-aiko-2027-philadelphia-1adzz_pgkmceakj | jhene-aiko | verify (applied) | 18783883 | https://seatgeek.com/jhene-aiko-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-04-03-7-30-pm/concert/18783883 | - |
| tm-santana-2027-boston-vv1avzk4tgkeo56zw | santana | verify (applied) | 18784709 | https://seatgeek.com/santana-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-04-03-8-pm/concert/18784709 | - |
| tm-melissa-etheridge-2027-madison-vv1a6zk4ngkd9d6lz | melissa-etheridge | clear (applied) | - | - | stored URL failed: venue mismatch: 'Orpheum Theater' vs 'Orpheum Theatre - Madison'; no qualifying replacement found |
| tm-vnv-nation-2027-toronto-1avzzbvgkvjgkmw | vnv-nation | verify (applied) | 18802428 | https://seatgeek.com/vnv-nation-tickets/toronto-canada-the-danforth-music-hall-2027-04-04-6-30-pm/concert/18802428 | - |
| tm-santana-2027-uncasville-g5vvz_9dli7ln | santana | verify (applied) | 18784710 | https://seatgeek.com/santana-tickets/uncasville-connecticut-mohegan-sun-arena-2027-04-04-7-30-pm/concert/18784710 | - |
| tm-jhene-aiko-2027-columbia-g5evz_py95t01 | jhene-aiko | verify (applied) | 18783885 | https://seatgeek.com/jhene-aiko-tickets/columbia-south-carolina-colonial-life-arena-2027-04-05-7-30-pm/concert/18783885 | - |
| tm-alex-warren-2027-oklahoma-city-vvg1yz_pm_4u36 | alex-warren | verify (applied) | 18773517 | https://seatgeek.com/alex-warren-tickets/oklahoma-city-oklahoma-paycom-center-2027-04-05-7-45-pm/concert/18773517 | - |
| tm-billy-strings-2027-tampa-vvg1vz_pkwq5nj | billy-strings | verify (applied) | 18755184 | https://seatgeek.com/billy-strings-tickets/tampa-florida-benchmark-international-arena-2027-04-06-7-30-pm/concert/18755184 | - |
| tm-santana-2027-new-york-g5dyz_prxuxs3 | santana | verify (applied) | 18784714 | https://seatgeek.com/santana-tickets/new-york-new-york-radio-city-music-hall-2027-04-06-8-pm/concert/18784714 | - |
| tm-alex-warren-2027-north-little-rock-g5viz_pi6umuc | alex-warren | verify (applied) | 18773519 | https://seatgeek.com/alex-warren-tickets/north-little-rock-arkansas-simmons-bank-arena-2027-04-06-7-30-pm/concert/18773519 | - |
| tm-nothing-but-thieves-2027-san-diego-rz7hnez1afpvcd | nothing-but-thieves | clear (applied) | - | - | stored URL failed: venue mismatch: 'SOMA - Mainstage' vs 'SOMA - San Diego'; no qualifying replacement found |
| tm-jhene-aiko-2027-charlotte-g5evz_pdpjkpz | jhene-aiko | verify (applied) | 18783887 | https://seatgeek.com/jhene-aiko-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-04-07-7-30-pm/concert/18783887 | - |
| tm-vnv-nation-2027-boston-vv177zbvgkmc0qfx | vnv-nation | verify (applied) | 18793518 | https://seatgeek.com/vnv-nation-tickets/boston-massachusetts-paradise-rock-club-2027-04-07-8-pm/concert/18793518 | - |
| tm-jhene-aiko-2027-raleigh-g5evz_9engbxl | jhene-aiko | verify (applied) | 18783890 | https://seatgeek.com/jhene-aiko-tickets/raleigh-north-carolina-lenovo-center-2027-04-08-7-30-pm/concert/18783890 | - |
| tm-missio-2027-san-antonio-z7r9jz1aazivi | missio | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Rock Box' vs 'Vibes Event Center'; no qualifying replacement found |
| tm-santana-2027-verona-k7vgf_psngfze | santana | verify (applied) | 18784715 | https://seatgeek.com/santana-tickets/verona-new-york-the-event-center-at-turning-stone-resort-casino-2027-04-09-8-pm/concert/18784715 | - |
| tm-jhene-aiko-2027-atlanta-vvg1zz_puzair5 | jhene-aiko | verify (applied) | 18783889 | https://seatgeek.com/jhene-aiko-tickets/atlanta-georgia-state-farm-arena-1-2027-04-10-7-30-pm/concert/18783889 | - |
| tm-mat-kearney-2027-charlottesville-z7r9jz1aaa-pv | mat-kearney | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2027-university-z7r9jz1a7-y8- | gavin-adcock | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-santana-2027-atlantic-city-vv17fz_pgkwmc5tp | santana | verify (applied) | 18784720 | https://seatgeek.com/santana-tickets/atlantic-city-new-jersey-hard-rock-live-at-etess-arena-2027-04-10-8-pm/concert/18784720 | - |
| tm-vnv-nation-2027-baltimore-1avfzbvgklmrqky | vnv-nation | verify (applied) | 18809274 | https://seatgeek.com/vnv-nation-tickets/baltimore-maryland-baltimore-soundstage-2027-04-10-9-pm/concert/18809274 | - |
| tm-mei-semones-2027-atlanta-z7r9jz1aaeb46 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-foy-vance-2027-cincinnati-z7r9jz1a7-k1v | foy-vance | clear (applied) | - | - | stored URL failed: venue mismatch: 'Memorial Hall - OH' vs 'Anderson Theater At Cincinnati Memorial Hall'; no qualifying replacement found |
| tm-jhene-aiko-2027-orlando-1kfovpjagau4wx9 | jhene-aiko | verify (applied) | 18783893 | https://seatgeek.com/jhene-aiko-tickets/orlando-florida-kia-center-2027-04-12-7-30-pm/concert/18783893 | - |
| tm-haiden-henderson-2027-nashville-rz7hnez1afgiq7 | haiden-henderson | verify (applied) | 18850714 | https://seatgeek.com/haiden-henderson-tickets/nashville-tennessee-the-basement-east-2027-04-13-8-pm/concert/18850714 | - |
| tm-alex-warren-2027-knoxville-g5viz_pcmddpz | alex-warren | verify (applied) | 18773526 | https://seatgeek.com/alex-warren-tickets/knoxville-tennessee-thompson-boling-arena-at-food-city-center-2027-04-15-7-30-pm/concert/18773526 | - |
| tm-hazlett-2027-nashville-z7r9jz1a7p0ay | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-alex-warren-2027-louisville-1avbz_pgkm-pfx2 | alex-warren | verify (applied) | 18773527 | https://seatgeek.com/alex-warren-tickets/louisville-kentucky-kfc-yum-center-2027-04-16-7-30-pm/concert/18773527 | - |
| tm-calvin-harris-2027-montreal-1ad7z_fxfqwzdua5 | calvin-harris | verify (applied) | 18674911 | https://seatgeek.com/calvin-harris-tickets/montreal-canada-centre-bell-2027-04-16-8-pm/concert/18674911 | - |
| tm-billy-strings-2027-north-charleston-g5evz_pjcaeyp | billy-strings | verify (applied) | 18755189 | https://seatgeek.com/billy-strings-tickets/north-charleston-south-carolina-north-charleston-coliseum-2027-04-17-7-30-pm/concert/18755189 | - |
| tm-tori-kelly-2027-philadelphia-z7r9jz1aaafa- | tori-kelly | add (applied) | 18827093 | https://seatgeek.com/tori-kelly-tickets/philadelphia-pennsylvania-franklin-music-hall-2027-04-17-8-pm/concert/18827093 | - |
| tm-alex-warren-2027-saint-louis-vv17bz_pgkm394lj | alex-warren | verify (applied) | 18773530 | https://seatgeek.com/alex-warren-tickets/saint-louis-missouri-enterprise-center-2027-04-18-7-30-pm/concert/18773530 | - |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0v4 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-billy-strings-2027-greenville-g5evz_perum8k | billy-strings | verify (applied) | 18755188 | https://seatgeek.com/billy-strings-tickets/greenville-south-carolina-bon-secours-wellness-arena-2027-04-21-7-30-pm/concert/18755188 | - |
| tm-melissa-etheridge-2027-wichita-vv1kbz_pfvg7sw9z | melissa-etheridge | verify (applied) | 18754513 | https://seatgeek.com/melissa-etheridge-tickets/wichita-kansas-orpheum-theatre-wichita-2027-04-21-7-30-pm/concert/18754513 | - |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0vp | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-travis-tritt-2027-macon-vvg1zz_k1bu6z9 | travis-tritt | verify (applied) | 18105539 | https://seatgeek.com/travis-tritt-tickets/macon-georgia-macon-city-auditorium-2027-04-22-7-30-pm/concert/18105539 | - |
| tm-lola-young-2027-st-paul-z7r9jz1aaebve | lola-young | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-alex-warren-2027-winnipeg-1av7z_pgkwqqal2 | alex-warren | verify (applied) | 18773537 | https://seatgeek.com/alex-warren-tickets/winnipeg-canada-canada-life-centre-2027-04-23-7-30-pm/concert/18773537 | - |
| tm-melissa-etheridge-2027-chandler-1a_zk4ngkdm2bwk | melissa-etheridge | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Showroom at Wild Horse Pass Resort & Casino' vs 'Gila River Hotels & Casinos - Wild Horse Pass'; no qualifying replacement found |
| tm-sam-fender-2027-toronto-1avzz_pgkl1qlzt | sam-fender | verify (applied) | 18760801 | https://seatgeek.com/sam-fender-tickets/toronto-canada-scotiabank-arena-2027-04-24-8-pm/concert/18760801 | - |
| tm-tori-kelly-2027-louisville-1avbz_pgksxzvfu | tori-kelly | verify (applied) | 18778568 | https://seatgeek.com/tori-kelly-tickets/louisville-kentucky-louisville-palace-2027-04-24-8-pm/concert/18778568 | - |
| tm-carin-leon-2027-sparks-1avjz_pgkrt9h7o | carin-leon | verify (applied) | 18782513 | https://seatgeek.com/carin-leon-tickets/sparks-nevada-nugget-event-center-2027-04-24-7-pm/concert/18782513 | - |
| tm-mat-kearney-2027-portsmouth-z7r9jz1aa7s83 | mat-kearney | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-alex-warren-2027-grand-rapids-vv17oz_pgkrvt515 | alex-warren | verify (applied) | 18773541 | https://seatgeek.com/alex-warren-tickets/grand-rapids-michigan-van-andel-arena-2027-04-26-7-30-pm/concert/18773541 | - |
| tm-tori-kelly-2027-indianapolis-vv17fz_pgkswj0w7 | tori-kelly | verify (applied) | 18778566 | https://seatgeek.com/tori-kelly-tickets/indianapolis-indiana-egyptian-room-at-old-national-centre-2027-04-27-7-30-pm/concert/18778566 | - |
| tm-alex-warren-2027-columbus-vv17fz_pgkrmanar | alex-warren | verify (applied) | 18773543 | https://seatgeek.com/alex-warren-tickets/columbus-ohio-nationwide-arena-2027-04-28-7-30-pm/concert/18773543 | - |
| tm-the-psychedelic-furs-2027-huntington-k7vgf_3n_asme | the-psychedelic-furs | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Paramount in concert with Northwell' vs 'The Paramount - Huntington'; no qualifying replacement found |
| tm-tori-kelly-2027-milwaukee-z7r9jz1aaa4u3 | tori-kelly | verify (applied) | 18778953 | https://seatgeek.com/tori-kelly-tickets/milwaukee-wisconsin-pabst-theater-2027-04-28-7-pm/concert/18778953 | - |
| tm-saint-levant-2027-san-diego-rz7hnez1afa7-7 | saint-levant | clear (applied) | - | - | stored URL failed: venue mismatch: 'SOMA - Mainstage' vs 'SOMA - San Diego'; no qualifying replacement found |
| tm-alex-warren-2027-hamilton-1avzz_pgkiu_f3b | alex-warren | verify (applied) | 18773542 | https://seatgeek.com/alex-warren-tickets/hamilton-canada-td-coliseum-2027-04-30-7-30-pm/concert/18773542 | - |
| tm-tori-kelly-2027-chicago-vv178z_pgkrb2cst | tori-kelly | verify (applied) | 18778569 | https://seatgeek.com/tori-kelly-tickets/chicago-illinois-house-of-blues-chicago-2027-04-30-7-pm/concert/18778569 | - |
| tm-remi-wolf-2027-berkeley-g5vyz_pmrwpif | remi-wolf | verify (applied) | 18785269 | https://seatgeek.com/remi-wolf-tickets/berkeley-california-the-greek-theatre-at-u-c-berkeley-2027-04-30-8-pm/concert/18785269 | - |
| tm-alex-warren-2027-kanata-1aszk4jgkdqmz4o | alex-warren | verify (applied) | 18773545 | https://seatgeek.com/alex-warren-tickets/kanata-canada-canadian-tire-centre-2027-05-01-7-30-pm/concert/18773545 | - |
| tm-the-warning-2027-oklahoma-city-z7r9jz1aavtgp | the-warning | clear (applied) | - | - | stored URL failed: venue mismatch: 'Criterion Theater - Oklahoma City' vs 'The Criterion - OKC'; no qualifying replacement found |
| tm-foreigner-2027-uncasville-g5vvz_pubgaoy | foreigner | verify (applied) | 18780602 | https://seatgeek.com/foreigner-tickets/uncasville-connecticut-mohegan-sun-arena-2027-05-01-8-pm/concert/18780602 | - |
| tm-cody-johnson-2027-evansville-vv1aazk4ngkd4mac1 | cody-johnson | verify (applied) | 18773456 | https://seatgeek.com/cody-johnson-tickets/evansville-indiana-ford-center-in-2027-05-01-7-pm/concert/18773456 | - |
| tm-tori-kelly-2027-minneapolis-z7r9jz1aaa4uk | tori-kelly | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-warren-zeiders-2027-charlotte-z7r9jz1aaeb7u | warren-zeiders | clear (applied) | - | - | stored URL failed: event instants differ by -4.0h (tolerance ±3h) — likely a different night; stored URL failed: venue mismatch: 'Coyote Joes' vs 'Coyote Joe's - Charlotte'; no qualifying replacement found |
| tm-alex-warren-2027-quebec-1ad7z_pgkmtnafk | alex-warren | verify (applied) | 18773549 | https://seatgeek.com/alex-warren-tickets/quebec-canada-videotron-centre-2027-05-02-7-30-pm/concert/18773549 | - |
| tm-meshuggah-2027-oklahoma-city-z7r9jz1aa7izs | meshuggah | clear (applied) | - | - | stored URL failed: venue mismatch: 'Criterion Theater - Oklahoma City' vs 'The Criterion - OKC'; no qualifying replacement found |
| tm-mei-semones-2027-denver-z7r9jz1aae37y | mei-semones | clear (applied) | - | - | stored URL failed: venue mismatch: 'Bluebird Theatre' vs 'Bluebird Theater - Denver'; no qualifying replacement found |
| tm-alex-warren-2027-albany-k7vgf_prpg3o4 | alex-warren | verify (applied) | 18773550 | https://seatgeek.com/alex-warren-tickets/albany-new-york-mvp-arena-2027-05-04-7-30-pm/concert/18773550 | - |
| tm-alex-warren-2027-belmont-park-1adzz_pgkmwcbz2 | alex-warren | verify (applied) | 18773552 | https://seatgeek.com/alex-warren-tickets/elmont-new-york-ubs-arena-2027-05-05-7-45-pm/concert/18773552 | - |
| tm-carly-rae-jepsen-2027-irving-vvg1yz_kwbaerl | carly-rae-jepsen | verify (applied) | 18639025 | https://seatgeek.com/carly-rae-jepsen-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2027-05-05-7-30-pm/concert/18639025 | - |
| tm-tori-kelly-2027-kansas-city-z7r9jz1aaaffz | tori-kelly | verify (applied) | 18778957 | https://seatgeek.com/tori-kelly-tickets/kansas-city-missouri-the-truman-2027-05-05-7-pm/concert/18778957 | - |
| tm-def-leppard-2027-san-francisco-g5vyz_f5oof-x | def-leppard | verify (applied) | 18662417 | https://seatgeek.com/def-leppard-tickets/san-francisco-california-chase-center-2027-05-05-7-pm/concert/18662417 | - |
| tm-mei-semones-2027-columbus-z7r9jz1aaef7k | mei-semones | add (applied) | 18863054 | https://seatgeek.com/mei-semones-tickets/columbus-ohio-ace-of-cups-2027-05-07-7-pm/concert/18863054 | - |
| tm-meshuggah-2027-atlanta-vvg1zz_4ptwc-- | meshuggah | verify (applied) | 18724693 | https://seatgeek.com/meshuggah-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-05-07-7-pm/concert/18724693 | - |
| tm-alex-warren-2027-baltimore-1avfz_pgkrfpurm | alex-warren | verify (applied) | 18773555 | https://seatgeek.com/alex-warren-tickets/baltimore-maryland-cfg-bank-arena-2027-05-07-7-45-pm/concert/18773555 | - |
| tm-remi-wolf-2027-houston-g5diz_f9ubux3 | remi-wolf | verify (applied) | 18664782 | https://seatgeek.com/remi-wolf-tickets/houston-texas-713-music-hall-2027-05-07-8-pm/concert/18664782 | - |
| tm-def-leppard-2027-sacramento-g5vyz_f5hdkto | def-leppard | verify (applied) | 18662420 | https://seatgeek.com/def-leppard-tickets/sacramento-california-golden-1-center-2027-05-07-7-pm/concert/18662420 | - |
| tm-calvin-harris-2027-oakland-g5vyz_fh6tm8u | calvin-harris | verify (applied) | 18674847 | https://seatgeek.com/calvin-harris-tickets/oakland-california-oakland-arena-2027-05-07-7-30-pm/concert/18674847 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mcfd | john-mayer | verify (applied) | 18659139 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-07-8-pm/concert/18659139 | - |
| tm-too-many-zooz-2027-san-diego-rz7hnez1afgpof | too-many-zooz | verify (applied) | 18844643 | https://seatgeek.com/too-many-zooz-tickets/san-diego-california-music-box-san-diego-2027-05-07-9-pm/concert/18844643 | - |
| tm-kings-of-leon-2027-bristow-1ka8vp__gaurfu5 | kings-of-leon | verify (applied) | 18746638 | https://seatgeek.com/kings-of-leon-tickets/bristow-virginia-jiffy-lube-live-2027-05-08-7-30-pm/concert/18746638 | - |
| tm-alex-warren-2027-uncasville-g5vvz_piu1phv | alex-warren | verify (applied) | 18773556 | https://seatgeek.com/alex-warren-tickets/uncasville-connecticut-mohegan-sun-arena-2027-05-08-7-30-pm/concert/18773556 | - |
| tm-hazlett-2027-east-cleveland-z7r9jz1a7pe8a | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tori-kelly-2027-denver-g5vzz_pmqeaxk | tori-kelly | verify (applied) | 18778574 | https://seatgeek.com/tori-kelly-tickets/denver-colorado-summit-music-hall-denver-2027-05-08-7-pm/concert/18778574 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mwfa | john-mayer | verify (applied) | 18659118 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-08-8-pm/concert/18659118 | - |
| tm-two-door-cinema-club-2027-st-paul-z7r9jz1aa7p8o | two-door-cinema-club | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tori-kelly-2027-salt-lake-city-g5vzz_pw0n4ot | tori-kelly | verify (applied) | 18778576 | https://seatgeek.com/tori-kelly-tickets/salt-lake-city-utah-the-depot-salt-lake-city-2027-05-09-7-pm/concert/18778576 | - |
| tm-def-leppard-2027-seattle-vvg1hz_f1kfpyl | def-leppard | verify (applied) | 18662421 | https://seatgeek.com/def-leppard-tickets/seattle-washington-climate-pledge-arena-2027-05-09-7-pm/concert/18662421 | - |
| tm-meshuggah-2027-greensboro-g5evz_4knt1ei | meshuggah | clear (applied) | - | - | stored URL failed: venue mismatch: 'Greensboro Complex' vs 'Special Events Center At Greensboro Coliseum Complex'; no qualifying replacement found |
| tm-alex-warren-2027-raleigh-g5evz_pmr-wuh | alex-warren | verify (applied) | 18773557 | https://seatgeek.com/alex-warren-tickets/raleigh-north-carolina-coastal-credit-union-music-park-at-walnut-creek-2027-05-11-7-40-pm/concert/18773557 | - |
| tm-haiden-henderson-2027-seattle-z7r9jz1aa79uf | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2027-houston-g5diz_4wkxf3f | noah-kahan | verify (applied) | 18728704 | https://seatgeek.com/noah-kahan-tickets/houston-texas-reliant-stadium-2027-05-12-6-30-pm/concert/18728704 | - |
| tm-alex-warren-2027-charleston-g5evz_pwy4cww | alex-warren | verify (applied) | 18773559 | https://seatgeek.com/alex-warren-tickets/charleston-south-carolina-credit-one-stadium-2027-05-12-7-30-pm/concert/18773559 | - |
| tm-tori-kelly-2027-vancouver-1av7z_pgkwlyauw | tori-kelly | verify (applied) | 18778581 | https://seatgeek.com/tori-kelly-tickets/vancouver-canada-queen-elizabeth-theatre-vancouver-2027-05-12-7-pm/concert/18778581 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mwf6 | john-mayer | verify (applied) | 18659120 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-12-8-pm/concert/18659120 | - |
| tm-jon-pardi-2027-loveland-z7r9jz1aazeb3 | jon-pardi | clear (applied) | - | - | stored URL failed: venue mismatch: 'Blue Arena at The Ranch Events Complex' vs 'Blue Federal Credit Union Arena'; no qualifying replacement found |
| tm-jhene-aiko-2027-seattle-vvg1hz_pm77anw | jhene-aiko | verify (applied) | 18783915 | https://seatgeek.com/jhene-aiko-tickets/seattle-washington-climate-pledge-arena-2027-05-13-7-30-pm/concert/18783915 | - |
| tm-tori-kelly-2027-seattle-z7r9jz1aaafgn | tori-kelly | add (applied) | 18778959 | https://seatgeek.com/tori-kelly-tickets/seattle-washington-showbox-sodo-2027-05-13-7-pm/concert/18778959 | - |
| tm-kings-of-leon-2027-cuyahoga-falls-vv16azk4nouzac7agu | kings-of-leon | verify (applied) | 18746642 | https://seatgeek.com/kings-of-leon-tickets/cuyahoga-falls-ohio-blossom-music-center-2027-05-14-7-30-pm/concert/18746642 | - |
| tm-alex-warren-2027-noblesville-vv17fz_pgkmuvbx2 | alex-warren | verify (applied) | 18773562 | https://seatgeek.com/alex-warren-tickets/noblesville-indiana-ruoff-music-center-2027-05-14-7-30-pm/concert/18773562 | - |
| tm-travis-tritt-2027-northfield-vv1kfz_pfzg7zdfa | travis-tritt | verify (applied) | 18757257 | https://seatgeek.com/travis-tritt-tickets/northfield-ohio-mgm-northfield-park-center-stage-2027-05-14-8-pm/concert/18757257 | - |
| tm-interpol-2027-los-angeles-vvg1iz_pmocxuu | interpol | verify (applied) | 18780190 | https://seatgeek.com/interpol-tickets/los-angeles-california-bmo-stadium-2027-05-14-6-pm/concert/18780190 | - |
| tm-megadeth-2027-albuquerque-g5vzz_pwxigv1 | megadeth | verify (applied) | 18778362 | https://seatgeek.com/megadeth-tickets/albuquerque-new-mexico-first-financial-credit-union-amphitheater-2027-05-14-7-pm/concert/18778362 | - |
| tm-haiden-henderson-2027-san-francisco-rz7hnez1afggu7 | haiden-henderson | verify (applied) | 18809827 | https://seatgeek.com/haiden-henderson-tickets/san-francisco-california-brick-and-mortar-music-hall-2027-05-14-8-pm/concert/18809827 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zufa | john-mayer | verify (applied) | 18659129 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-14-8-pm/concert/18659129 | - |
| tm-calvin-harris-2027-seattle-vvg1hz_fjlgmb1 | calvin-harris | verify (applied) | 18674849 | https://seatgeek.com/calvin-harris-tickets/seattle-washington-climate-pledge-arena-2027-05-14-8-pm/concert/18674849 | - |
| tm-tori-kelly-2027-portland-z7r9jz1aaafff | tori-kelly | add (applied) | 18778961 | https://seatgeek.com/tori-kelly-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-05-14-7-pm/concert/18778961 | - |
| tm-megadeth-2027-phoenix-1av0z_pgknttpbb | megadeth | verify (applied) | 18778361 | https://seatgeek.com/megadeth-tickets/phoenix-arizona-talking-stick-resort-amphitheatre-2027-05-15-7-pm/concert/18778361 | - |
| tm-jhene-aiko-2027-vancouver-1av7z_pgkwqspc7 | jhene-aiko | verify (applied) | 18783923 | https://seatgeek.com/jhene-aiko-tickets/vancouver-canada-rogers-arena-2027-05-15-7-30-pm/concert/18783923 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zqf5 | john-mayer | verify (applied) | 18659130 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-05-15-8-pm/concert/18659130 | - |
| tm-calvin-harris-2027-seattle-vvg1hz_48c3k9c | calvin-harris | verify (applied) | 18708080 | https://seatgeek.com/calvin-harris-tickets/seattle-washington-climate-pledge-arena-2027-05-15-8-pm/concert/18708080 | - |
| tm-queens-of-the-stone-age-2027-rosemont-vv1kvzvpfygacy0ah | queens-of-the-stone-age | verify (applied) | 18709223 | https://seatgeek.com/queens-of-the-stone-age-tickets/rosemont-illinois-allstate-arena-2027-05-16-6-30-pm/concert/18709223 | - |
| tm-alex-warren-2027-birmingham-1aezz_pgkmbd7bp | alex-warren | verify (applied) | 18773565 | https://seatgeek.com/alex-warren-tickets/birmingham-alabama-coca-cola-amphitheater-2027-05-16-7-30-pm/concert/18773565 | - |
| tm-two-door-cinema-club-2027-seattle-vvg1hz_4ppr1wj | two-door-cinema-club | verify (applied) | 18711331 | https://seatgeek.com/two-door-cinema-club-tickets/seattle-washington-paramount-theatre-wa-2027-05-17-7-30-pm/concert/18711331 | - |
| tm-queens-of-the-stone-age-2027-indianapolis-vv1aazk4fgkd2j1lw | queens-of-the-stone-age | verify (applied) | 18709226 | https://seatgeek.com/queens-of-the-stone-age-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-05-18-6-30-pm/concert/18709226 | - |
| tm-lizzy-mcalpine-2027-oklahoma-city-z7r9jz1aaea-p | lizzy-mcalpine | clear (applied) | - | - | stored URL failed: venue mismatch: 'Thelma Gaylord Performing Arts Theatre' vs 'Thelma Gaylord PAT At Civic Center Music Hall'; no qualifying replacement found |
| tm-megadeth-2027-chula-vista-vvg1iz_pjb5pwc | megadeth | verify (applied) | 18778358 | https://seatgeek.com/megadeth-tickets/chula-vista-california-north-island-credit-union-amphitheatre-2027-05-18-7-pm/concert/18778358 | - |
| tm-queens-of-the-stone-age-2027-columbus-vv1kv8vp4agacm7ii | queens-of-the-stone-age | verify (applied) | 18709227 | https://seatgeek.com/queens-of-the-stone-age-tickets/columbus-ohio-nationwide-arena-2027-05-19-6-30-pm/concert/18709227 | - |
| tm-a-perfect-circle-2027-elizabethtown-1avbz_pgkucnyj0 | a-perfect-circle | verify (applied) | 18784729 | https://seatgeek.com/a-perfect-circle-tickets/elizabethtown-kentucky-steelgrove-amphitheater-2027-05-19-7-pm/concert/18784729 | - |
| tm-jhene-aiko-2027-west-valley-city-g5vzz_ps36muq | jhene-aiko | verify (applied) | 18783917 | https://seatgeek.com/jhene-aiko-tickets/west-valley-city-utah-maverik-center-2027-05-19-7-30-pm/concert/18783917 | - |
| tm-megadeth-2027-inglewood-vv16azk4ev7zauakk1 | megadeth | verify (applied) | 18778360 | https://seatgeek.com/megadeth-tickets/inglewood-california-kia-forum-2027-05-19-7-pm/concert/18778360 | - |
| tm-two-door-cinema-club-2027-sacramento-g5vyz_46svaa8 | two-door-cinema-club | verify (applied) | 18711334 | https://seatgeek.com/two-door-cinema-club-tickets/sacramento-california-channel-24-sacramento-2027-05-19-8-pm/concert/18711334 | - |
| tm-dylan-gossett-2027-oklahoma-city-z7r9jz1aae4ba | dylan-gossett | clear (applied) | - | - | stored URL failed: venue mismatch: 'Criterion Theater - Oklahoma City' vs 'The Criterion - OKC'; no qualifying replacement found |
| tm-calvin-harris-2027-anaheim-vv1aazk44gkdgr8bi | calvin-harris | verify (applied) | 18709501 | https://seatgeek.com/calvin-harris-tickets/anaheim-california-honda-center-2027-05-20-8-pm/concert/18709501 | - |
| tm-two-door-cinema-club-2027-oakland-g5vyz_48x4wje | two-door-cinema-club | verify (applied) | 18711335 | https://seatgeek.com/two-door-cinema-club-tickets/oakland-california-fox-theater-oakland-2027-05-20-8-pm/concert/18711335 | - |
| tm-travis-tritt-2027-waterloo-k7vgf_29lrc4r | travis-tritt | verify (applied) | 18757506 | https://seatgeek.com/travis-tritt-tickets/waterloo-new-york-the-vine-at-del-lago-resort-and-casino-2027-05-21-8-pm/concert/18757506 | - |
| tm-noah-kahan-2027-las-vegas-1avjz_4gkrmeou0 | noah-kahan | verify (applied) | 18728719 | https://seatgeek.com/noah-kahan-tickets/las-vegas-nevada-allegiant-stadium-2027-05-21-6-30-pm/concert/18728719 | - |
| tm-megadeth-2027-ridgefield-vvg1hz_pj4m0zq | megadeth | verify (applied) | 18778363 | https://seatgeek.com/megadeth-tickets/ridgefield-washington-cascades-amphitheater-2027-05-21-7-pm/concert/18778363 | - |
| tm-jhene-aiko-2027-los-angeles-g5eyz_pusyoov | jhene-aiko | verify (applied) | 18783918 | https://seatgeek.com/jhene-aiko-tickets/los-angeles-california-crypto-com-arena-2027-05-21-7-30-pm/concert/18783918 | - |
| tm-queens-of-the-stone-age-2027-detroit-vv1kezvp4_gagidyd | queens-of-the-stone-age | verify (applied) | 18709231 | https://seatgeek.com/queens-of-the-stone-age-tickets/detroit-michigan-little-caesars-arena-2027-05-22-6-30-pm/concert/18709231 | - |
| tm-travis-tritt-2027-charles-town-1a4zk4ngkdpzfky | travis-tritt | verify (applied) | 18756742 | https://seatgeek.com/travis-tritt-tickets/charles-town-west-virginia-hollywood-casino-at-charles-town-races-2027-05-22-7-pm/concert/18756742 | - |
| tm-two-friends-2027-ottawa-1aszk4xgkdbc6bg | two-friends | verify (applied) | 18757902 | https://seatgeek.com/two-friends-tickets/ottawa-canada-history-ottawa-2027-05-22-7-30-pm/concert/18757902 | - |
| tm-zach-bryan-2027-nashville-z7r9jz1aa7k17 | zach-bryan | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |
| tm-megadeth-2027-auburn-vvg1hz_ph-ktdl | megadeth | verify (applied) | 18778359 | https://seatgeek.com/megadeth-tickets/auburn-washington-white-river-amphitheatre-2027-05-22-7-pm/concert/18778359 | - |
| tm-jhene-aiko-2027-los-angeles-g5eyz_9ditouk | jhene-aiko | verify (applied) | 18841805 | https://seatgeek.com/jhene-aiko-tickets/los-angeles-california-crypto-com-arena-2027-05-22-7-30-pm/concert/18841805 | - |
| tm-two-friends-2027-ottawa-1ad7z_pgkgxjwbt | two-friends | verify (applied) | 18774332 | https://seatgeek.com/two-friends-tickets/ottawa-canada-history-ottawa-2027-05-23-6-30-pm/concert/18774332 | - |
| tm-kings-of-leon-2027-clarkston-vv1afzk4pgkdf_fbn | kings-of-leon | verify (applied) | 18746648 | https://seatgeek.com/kings-of-leon-tickets/clarkston-michigan-pine-knob-music-theatre-2027-05-23-7-30-pm/concert/18746648 | - |
| tm-queens-of-the-stone-age-2027-boston-vv1avzk43gkdss-xl | queens-of-the-stone-age | verify (applied) | 18709234 | https://seatgeek.com/queens-of-the-stone-age-tickets/boston-massachusetts-td-garden-2027-05-24-6-30-pm/concert/18709234 | - |
| tm-kings-of-leon-2027-bridgeport-g5vvz_pclhssb | kings-of-leon | verify (applied) | 18746650 | https://seatgeek.com/kings-of-leon-tickets/bridgeport-connecticut-hartford-healthcare-amphitheater-2027-05-25-7-30-pm/concert/18746650 | - |
| tm-calvin-harris-2027-inglewood-vv1f0z_48vcazd8d1 | calvin-harris | verify (applied) | 18708087 | https://seatgeek.com/calvin-harris-tickets/inglewood-california-kia-forum-2027-05-26-8-pm/concert/18708087 | - |
| tm-calvin-harris-2027-inglewood-vv1aazk4fgkebghyq | calvin-harris | verify (applied) | 18674854 | https://seatgeek.com/calvin-harris-tickets/inglewood-california-kia-forum-2027-05-27-8-pm/concert/18674854 | - |
| tm-megadeth-2027-tinley-park-vv1a7zk4tgkdt6btl | megadeth | verify (applied) | 18778375 | https://seatgeek.com/megadeth-tickets/tinley-park-illinois-credit-union-1-amphitheatre-2027-05-28-7-pm/concert/18778375 | - |
| tm-calvin-harris-2027-inglewood-vv1aazk48gkd68xic | calvin-harris | verify (applied) | 18699754 | https://seatgeek.com/calvin-harris-tickets/inglewood-california-kia-forum-2027-05-28-8-pm/concert/18699754 | - |
| tm-cody-johnson-2027-gilford-vv177z_pgksxdnvq | cody-johnson | verify (applied) | 18784858 | https://seatgeek.com/cody-johnson-tickets/gilford-new-hampshire-banknh-pavilion-2027-05-29-7-pm/concert/18784858 | - |
| tm-def-leppard-2027-san-antonio-g5diz_fqmcwez | def-leppard | verify (applied) | 18662426 | https://seatgeek.com/def-leppard-tickets/san-antonio-texas-frost-bank-center-2027-05-29-7-pm/concert/18662426 | - |
| tm-megadeth-2027-shakopee-1ae7z_pgkcukysu | megadeth | verify (applied) | 18778376 | https://seatgeek.com/megadeth-tickets/shakopee-minnesota-mystic-lake-amphitheater-2027-05-29-7-pm/concert/18778376 | - |
| tm-calvin-harris-2027-inglewood-vv1aazk48gkd6fcij | calvin-harris | verify (applied) | 18702244 | https://seatgeek.com/calvin-harris-tickets/inglewood-california-kia-forum-2027-05-29-8-pm/concert/18702244 | - |
| tm-kings-of-leon-2027-bethel-k7vgf_pkjzmnn | kings-of-leon | verify (applied) | 18746656 | https://seatgeek.com/kings-of-leon-tickets/bethel-new-york-bethel-woods-center-for-the-arts-2027-05-30-7-30-pm/concert/18746656 | - |
| tm-megadeth-2027-grand-rapids-vv17oz_pgkmgtnqb | megadeth | verify (applied) | 18778377 | https://seatgeek.com/megadeth-tickets/grand-rapids-michigan-acrisure-amphitheater-2027-06-02-7-pm/concert/18778377 | - |
| tm-two-friends-2027-philadelphia-vv1aovp_fga1qsqx | two-friends | verify (applied) | 18757690 | https://seatgeek.com/two-friends-tickets/philadelphia-pennsylvania-skyline-stage-at-the-mann-2027-06-04-7-pm/concert/18757690 | - |
| tm-megadeth-2027-clarkston-vv17oz_pgks8s9m3 | megadeth | verify (applied) | 18778380 | https://seatgeek.com/megadeth-tickets/clarkston-michigan-pine-knob-music-theatre-2027-06-04-7-pm/concert/18778380 | - |
| tm-billy-strings-2027-birmingham-1aozk4tgkd5-7_e | billy-strings | verify (applied) | 18755199 | https://seatgeek.com/billy-strings-tickets/birmingham-alabama-legacy-arena-at-the-bjcc-2027-06-04-7-30-pm/concert/18755199 | - |
| tm-noah-kahan-2027-columbus-vv17fz_4gkshkqmo | noah-kahan | verify (applied) | 18728731 | https://seatgeek.com/noah-kahan-tickets/columbus-ohio-ohio-stadium-2027-06-05-6-30-pm/concert/18728731 | - |
| tm-megadeth-2027-cincinnati-1avbz_pgkn_24l6 | megadeth | clear (applied) | - | - | stored URL failed: SeatGeek /events/18780625 returned HTTP 404 (listing confirmed gone); no qualifying replacement found |
| tm-billy-strings-2027-birmingham-1aozk4tgkd5x7_7 | billy-strings | verify (applied) | 18755203 | https://seatgeek.com/billy-strings-tickets/birmingham-alabama-legacy-arena-at-the-bjcc-2027-06-05-7-30-pm/concert/18755203 | - |
| tm-kings-of-leon-2027-tinley-park-vv1kvzvpbygacp7l6 | kings-of-leon | verify (applied) | 18746660 | https://seatgeek.com/kings-of-leon-tickets/tinley-park-illinois-credit-union-1-amphitheatre-2027-06-06-7-30-pm/concert/18746660 | - |
| tm-megadeth-2027-burgettstown-1avbz_pgkwkmpmi | megadeth | verify (applied) | 18778386 | https://seatgeek.com/megadeth-tickets/burgettstown-pennsylvania-the-pavilion-at-star-lake-2027-06-07-7-pm/concert/18778386 | - |
| tm-megadeth-2027-bristow-1avfz_pgknmlaeb | megadeth | verify (applied) | 18778388 | https://seatgeek.com/megadeth-tickets/bristow-virginia-jiffy-lube-live-2027-06-08-7-pm/concert/18778388 | - |
| tm-noah-kahan-2027-detroit-vv1koz_kr3g7cdve | noah-kahan | verify (applied) | 18728732 | https://seatgeek.com/noah-kahan-tickets/detroit-michigan-ford-field-2027-06-10-6-30-pm/concert/18728732 | - |
| tm-megadeth-2027-toronto-1avzz_pgksfsdba | megadeth | verify (applied) | 18778436 | https://seatgeek.com/megadeth-tickets/toronto-canada-rbc-amphitheatre-2027-06-10-7-pm/concert/18778436 | - |
| tm-intocable-2027-miami-vvg1vz_pmzxge8 | intocable | verify (applied) | 18781154 | https://seatgeek.com/intocable-tickets/miami-florida-james-l-knight-center-2027-06-11-8-pm/concert/18781154 | - |
| tm-noah-kahan-2027-orchard-park-vv17gz_4gksqg3zl | noah-kahan | verify (applied) | 18728735 | https://seatgeek.com/noah-kahan-tickets/orchard-park-new-york-highmark-stadium-ny-2027-06-12-6-pm/concert/18728735 | - |
| tm-megadeth-2027-mansfield-vv177z_pgkmjh1ou | megadeth | verify (applied) | 18778390 | https://seatgeek.com/megadeth-tickets/mansfield-massachusetts-xfinity-center-ma-2027-06-12-7-pm/concert/18778390 | - |
| tm-kpop-demon-hunters-2027-newark-vv1aezk4pgkd6hbhj | kpop-demon-hunters | verify (applied) | 18839590 | https://seatgeek.com/kpop-demon-hunters-tickets/newark-new-jersey-prudential-center-2027-06-13-2-pm/concert/18839590 | - |
| tm-megadeth-2027-camden-vv17fz_pgkmjnhj7 | megadeth | verify (applied) | 18778391 | https://seatgeek.com/megadeth-tickets/camden-new-jersey-freedom-mortgage-pavilion-2027-06-13-7-pm/concert/18778391 | - |
| tm-noah-kahan-2027-montreal-1aszk4pgkdjhrvf | noah-kahan | verify (applied) | 18728737 | https://seatgeek.com/noah-kahan-tickets/montreal-canada-parc-jean-drapeau-2027-06-15-6-30-pm/concert/18728737 | - |
| tm-megadeth-2027-new-york-g5diz_prtfsjt | megadeth | verify (applied) | 18778392 | https://seatgeek.com/megadeth-tickets/new-york-new-york-madison-square-garden-2027-06-15-7-pm/concert/18778392 | - |
| tm-kpop-demon-hunters-2027-columbus-vv1aazk4pgkdbznja | kpop-demon-hunters | verify (applied) | 18838896 | https://seatgeek.com/kpop-demon-hunters-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2027-06-15-7-30-pm/concert/18838896 | - |
| tm-megadeth-2027-charlotte-g5evz_pjm1iz7 | megadeth | verify (applied) | 18778393 | https://seatgeek.com/megadeth-tickets/charlotte-north-carolina-truliant-amphitheater-2027-06-17-7-pm/concert/18778393 | - |
| tm-kings-of-leon-2027-hamburg-z698xzc2z1kjifpz9 | kings-of-leon | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2027-east-rutherford-k7vgf_4me3p-- | noah-kahan | verify (applied) | 18728736 | https://seatgeek.com/noah-kahan-tickets/east-rutherford-new-jersey-metlife-stadium-2027-06-18-6-30-pm/concert/18728736 | - |
| tm-megadeth-2027-alpharetta-vvg1zz_pnf8blb | megadeth | verify (applied) | 18778394 | https://seatgeek.com/megadeth-tickets/alpharetta-georgia-ameris-bank-amphitheatre-2027-06-18-7-pm/concert/18778394 | - |
| tm-travis-tritt-2027-durham-g5evz_p2pdn7v | travis-tritt | verify (applied) | 18756343 | https://seatgeek.com/travis-tritt-tickets/durham-north-carolina-dpac-durham-performing-arts-center-2027-06-18-7-30-pm/concert/18756343 | - |
| tm-noah-kahan-2027-east-rutherford-k7vgf_pevlzwu | noah-kahan | verify (applied) | 18755182 | https://seatgeek.com/noah-kahan-tickets/east-rutherford-new-jersey-metlife-stadium-2027-06-19-6-30-pm/concert/18755182 | - |
| tm-stray-kids-2027-chicago-vv167zk4yjazaue56a | stray-kids | verify (applied) | 18792968 | https://seatgeek.com/stray-kids-tickets/chicago-illinois-soldier-field-2027-06-19-7-30-pm/concert/18792968 | - |
| tm-kpop-demon-hunters-2027-chicago-vv178z_pgkra4jvj | kpop-demon-hunters | verify (applied) | 18838894 | https://seatgeek.com/kpop-demon-hunters-tickets/chicago-illinois-united-center-2027-06-20-2-pm/concert/18838894 | - |
| tm-megadeth-2027-the-woodlands-g5diz_penjw6e | megadeth | verify (applied) | 18778400 | https://seatgeek.com/megadeth-tickets/the-woodlands-texas-the-cynthia-woods-mitchell-pavilion-presented-by-huntsman-2027-06-20-7-pm/concert/18778400 | - |
| tm-megadeth-2027-irving-vvg1yz_psnfnkd | megadeth | verify (applied) | 18778402 | https://seatgeek.com/megadeth-tickets/irving-texas-the-pavilion-at-toyota-music-factory-2027-06-22-7-pm/concert/18778402 | - |
| tm-megadeth-2027-austin-g5diz_pevm_m_ | megadeth | verify (applied) | 18778404 | https://seatgeek.com/megadeth-tickets/austin-texas-germania-insurance-amphitheater-2027-06-23-6-pm/concert/18778404 | - |
| tm-kpop-demon-hunters-2027-belmont-park-1kgzvpbsgagectc | kpop-demon-hunters | verify (applied) | 18772683 | https://seatgeek.com/kpop-demon-hunters-tickets/elmont-new-york-ubs-arena-2027-06-29-7-30-pm/concert/18772683 | - |
| tm-two-friends-2027-toronto-1a8zk49gkesrne- | two-friends | verify (applied) | 18725838 | https://seatgeek.com/two-friends-tickets/toronto-canada-rbc-amphitheatre-2027-06-30-7-pm/concert/18725838 | - |
| tm-kpop-demon-hunters-2027-belmont-park-1kgzvpbsgag7qt4 | kpop-demon-hunters | verify (applied) | 18772726 | https://seatgeek.com/kpop-demon-hunters-tickets/elmont-new-york-ubs-arena-2027-06-30-7-30-pm/concert/18772726 | - |
| tm-two-friends-2027-bala-1avzz_4gkztkppc | two-friends | verify (applied) | 18756748 | https://seatgeek.com/two-friends-tickets/bala-canada-kee-to-bala-2027-07-01-8-pm/concert/18756748 | - |
| tm-oasis-2027-munich-z698xzc2z16vca8yqu | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-munich-z698xzc2z16ezoffov | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kenny-chesney-2027-nashville-z7r9jz1aavsaa | kenny-chesney | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |
| tm-oasis-2027-munich-z698xzc2z16v7f7_4g | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2027-sevilla-z698xz2qz16v3duzrf | noah-kahan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-barcelona-z698xz2qz1kosq3xa | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-barcelona-z698xz2qz1kvz7a4m | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fall-out-boy-2027-arlington-vvg1yz_potb4m0 | fall-out-boy | verify (applied) | 18753400 | https://seatgeek.com/fall-out-boy-tickets/arlington-texas-globe-life-field-2027-07-13-5-30-pm/concert/18753400 | - |
| tm-oasis-2027-amsterdam-z698xzbpz16vrdz-8b | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fall-out-boy-2027-atlanta-vvg1zz_pkn5gmk | fall-out-boy | verify (applied) | 18753402 | https://seatgeek.com/fall-out-boy-tickets/atlanta-georgia-truist-park-2027-07-16-5-30-pm/concert/18753402 | - |
| tm-foreigner-2027-bangor-vv177z_pgkzwgr47 | foreigner | verify (applied) | 18778525 | https://seatgeek.com/foreigner-tickets/bangor-maine-maine-savings-amphitheater-2027-07-16-7-pm/concert/18778525 | - |
| tm-travis-tritt-2027-bossier-city-g5viz_p2n3lzw | travis-tritt | verify (applied) | 18756251 | https://seatgeek.com/travis-tritt-tickets/bossier-city-louisiana-horseshoe-casino-riverdome-2027-07-16-8-pm/concert/18756251 | - |
| tm-mumford-sons-2027-st-john-s-z7r9jz1aaakg4 | mumford-sons | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-amsterdam-z698xzbpz1kodp337 | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-foreigner-2027-gilford-vv177z_pgkichxsp | foreigner | verify (applied) | 18778524 | https://seatgeek.com/foreigner-tickets/gilford-new-hampshire-banknh-pavilion-2027-07-17-7-pm/concert/18778524 | - |
| tm-fall-out-boy-2027-washington-1avfz_4gkhvu21c | fall-out-boy | verify (applied) | 18753401 | https://seatgeek.com/fall-out-boy-tickets/washington-district-of-columbia-nationals-park-2027-07-18-5-30-pm/concert/18753401 | - |
| tm-foreigner-2027-bethel-k7vgf_ps6zwby | foreigner | verify (applied) | 18778526 | https://seatgeek.com/foreigner-tickets/bethel-new-york-bethel-woods-center-for-the-arts-2027-07-18-7-pm/concert/18778526 | - |
| tm-fall-out-boy-2027-chicago-vv118z_pqp44qd | fall-out-boy | verify (applied) | 18753405 | https://seatgeek.com/fall-out-boy-tickets/chicago-illinois-soldier-field-2027-07-24-5-30-pm/concert/18753405 | - |
| tm-fall-out-boy-2027-boston-vv1avzk4ngkenvma1 | fall-out-boy | verify (applied) | 18753413 | https://seatgeek.com/fall-out-boy-tickets/boston-massachusetts-fenway-park-2027-07-30-5-pm/concert/18753413 | - |
| tm-travis-tritt-2027-bristol-g5viz_4sc3z7i | travis-tritt | verify (applied) | 18757839 | https://seatgeek.com/travis-tritt-tickets/bristol-virginia-hard-rock-hotel-and-casino-bristol-2027-07-30-8-pm/concert/18757839 | - |
| tm-hannah-harper-2027-effingham-vv1kjz_p3eg7ds0b | hannah-harper | verify (applied) | 18754536 | https://seatgeek.com/hannah-harper-tickets/effingham-illinois-effingham-performance-center-2027-07-30-7-pm/concert/18754536 | - |
| tm-fall-out-boy-2027-atlantic-city-vv1aezk4pgkdw5r4k | fall-out-boy | verify (applied) | 18753417 | https://seatgeek.com/fall-out-boy-tickets/atlantic-city-new-jersey-atlantic-city-beach-2027-08-03-5-30-pm/concert/18753417 | - |
| tm-fall-out-boy-2027-saint-charles-z7r9jz1aaakz9 | fall-out-boy | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fall-out-boy-2027-san-francisco-g5vyz_p3s9d3l | fall-out-boy | verify (applied) | 18753428 | https://seatgeek.com/fall-out-boy-tickets/san-francisco-california-oracle-park-2027-08-15-5-30-pm/concert/18753428 | - |
| tm-fall-out-boy-2027-san-diego-vvg1iz_pc9ifhq | fall-out-boy | verify (applied) | 18753429 | https://seatgeek.com/fall-out-boy-tickets/san-diego-california-petco-park-2027-08-17-5-30-pm/concert/18753429 | - |
| tm-fall-out-boy-2027-phoenix-1a_zk4xgkdxdu-e | fall-out-boy | verify (applied) | 18753432 | https://seatgeek.com/fall-out-boy-tickets/phoenix-arizona-chase-field-2027-08-19-5-30-pm/concert/18753432 | - |
| tm-fall-out-boy-2027-los-angeles-vvg1iz_p4zt_kr | fall-out-boy | verify (applied) | 18753433 | https://seatgeek.com/fall-out-boy-tickets/los-angeles-california-dodger-stadium-2027-08-21-5-30-pm/concert/18753433 | - |
| tm-fall-out-boy-2027-seattle-vvg1hz_p5fubur | fall-out-boy | verify (applied) | 18753436 | https://seatgeek.com/fall-out-boy-tickets/seattle-washington-t-mobile-park-2027-08-24-5-30-pm/concert/18753436 | - |
| tm-the-red-clay-strays-2027-englewood-z7r9jz1aaef4s | the-red-clay-strays | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-megadeth-2027-north-little-rock-g5viz_pnjetpo | megadeth | verify (applied) | 18778408 | https://seatgeek.com/megadeth-tickets/north-little-rock-arkansas-simmons-bank-arena-2027-09-06-7-pm/concert/18778408 | - |
| tm-megadeth-2027-biloxi-g5viz_plz_cl1 | megadeth | verify (applied) | 18778407 | https://seatgeek.com/megadeth-tickets/biloxi-mississippi-mississippi-coast-coliseum-2027-09-07-7-pm/concert/18778407 | - |
| tm-megadeth-2027-nashville-g5viz_pmzogzi | megadeth | verify (applied) | 18778406 | https://seatgeek.com/megadeth-tickets/nashville-tennessee-bridgestone-arena-2027-09-09-7-pm/concert/18778406 | - |
| tm-megadeth-2027-virginia-beach-vv177z_pgkl4llwn | megadeth | verify (applied) | 18778409 | https://seatgeek.com/megadeth-tickets/virginia-beach-virginia-veterans-united-home-loans-amphitheater-at-virginia-beach-2027-09-11-7-pm/concert/18778409 | - |
| tm-megadeth-2027-allentown-1adzz_pgkmxuggq | megadeth | verify (applied) | 18778410 | https://seatgeek.com/megadeth-tickets/allentown-pennsylvania-ppl-center-2027-09-12-7-pm/concert/18778410 | - |
| tm-megadeth-2027-laval-1ad7z_pgkmil4lx | megadeth | verify (applied) | 18782651 | https://seatgeek.com/megadeth-tickets/laval-canada-place-bell-2027-09-14-7-pm/concert/18782651 | - |
| tm-kings-of-leon-2027-vancouver-16v7z_ppfg7nnqo | kings-of-leon | verify (applied) | 18746697 | https://seatgeek.com/kings-of-leon-tickets/vancouver-canada-rogers-arena-2027-09-14-7-30-pm/concert/18746697 | - |
| tm-kings-of-leon-2027-seattle-vvg1hz_p57x6w0 | kings-of-leon | verify (applied) | 18746664 | https://seatgeek.com/kings-of-leon-tickets/seattle-washington-climate-pledge-arena-2027-09-15-7-30-pm/concert/18746664 | - |
| tm-megadeth-2027-buffalo-k7vgf_pr36-mz | megadeth | verify (applied) | 18778416 | https://seatgeek.com/megadeth-tickets/buffalo-new-york-keybank-center-2027-09-16-7-pm/concert/18778416 | - |
| tm-kings-of-leon-2027-mountain-view-g5vyz_p1j_6oc | kings-of-leon | verify (applied) | 18746666 | https://seatgeek.com/kings-of-leon-tickets/mountain-view-california-shoreline-amphitheatre-2027-09-17-7-pm/concert/18746666 | - |
| tm-megadeth-2027-toledo-vv1afzk4tgkdzzv33 | megadeth | verify (applied) | 18778418 | https://seatgeek.com/megadeth-tickets/toledo-ohio-huntington-center-2027-09-18-7-pm/concert/18778418 | - |
| tm-kings-of-leon-2027-inglewood-vv1aazk4ngkdyvvz_ | kings-of-leon | verify (applied) | 18746668 | https://seatgeek.com/kings-of-leon-tickets/inglewood-california-kia-forum-2027-09-18-7-30-pm/concert/18746668 | - |
| tm-megadeth-2027-columbus-vv17fz_pgksfzclm | megadeth | verify (applied) | 18778420 | https://seatgeek.com/megadeth-tickets/columbus-ohio-value-city-arena-at-schottenstein-center-2027-09-19-7-pm/concert/18778420 | - |
| tm-megadeth-2027-milwaukee-vv17jz_pgkrcmzyk | megadeth | verify (applied) | 18778422 | https://seatgeek.com/megadeth-tickets/milwaukee-wisconsin-bmo-pavilion-2027-09-21-7-pm/concert/18778422 | - |
| tm-megadeth-2027-fargo-vv1kvovpq_ga53kds | megadeth | verify (applied) | 18778421 | https://seatgeek.com/megadeth-tickets/fargo-north-dakota-fargodome-2027-09-22-7-pm/concert/18778421 | - |
| tm-megadeth-2027-lincoln-vv17bz_pgkmwzqwq | megadeth | verify (applied) | 18778423 | https://seatgeek.com/megadeth-tickets/lincoln-nebraska-pinnacle-bank-arena-2027-09-24-7-pm/concert/18778423 | - |
| tm-the-airborne-toxic-event-2027-englewood-z7r9jz1aazgov | the-airborne-toxic-event | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18415996 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-zac-brown-band-2027-milwaukee-vv1a6zkf0gkdpf9tr | zac-brown-band | unverify (applied) | - | - | stored URL failed: candidate URL fails the event-URL shape validator; previously verified record no longer matches |
| tm-theory-of-a-deadman-2027-rama-1a8zkfngkeitbvf | theory-of-a-deadman | verify (applied) | 18570545 | https://seatgeek.com/theory-of-a-deadman-tickets/rama-canada-casino-rama-resort-2027-03-12-9-pm/concert/18570545 | - |
| tm-travis-tritt-2027-nashville-z7r9jz1a7jf0f | travis-tritt | verify (applied) | 18362997 | https://seatgeek.com/travis-tritt-tickets/nashville-tennessee-ryman-auditorium-2027-03-12-8-pm/concert/18362997 | - |
| tm-michelle-branch-2027-anaheim-vv1aazkf6gkdxx2ly | michelle-branch | verify (applied) | 18508836 | https://seatgeek.com/michelle-branch-tickets/anaheim-california-house-of-blues-anaheim-2027-03-12-7-pm/concert/18508836 | - |
| tm-tommy-emmanuel-2027-vancouver-1aozkfugkdvinj7 | tommy-emmanuel | verify (applied) | 18633861 | https://seatgeek.com/tommy-emmanuel-tickets/vancouver-canada-queen-elizabeth-theatre-vancouver-2027-03-12-8-pm/concert/18633861 | - |
| tm-flans-2027-san-diego-vvg1iz_3rf4hkp | flans | verify (applied) | 18612871 | https://seatgeek.com/flans-tickets/san-diego-california-san-diego-civic-theatre-2027-03-12-8-pm/concert/18612871 | - |
| tm-foreigner-2027-las-vegas-1avjz_kgkursnk8 | foreigner | verify (applied) | 18723999 | https://seatgeek.com/foreigner-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2027-03-12-8-pm/concert/18723999 | - |
| tm-sting-2027-las-vegas-1ayzk4agkec6msw | sting | verify (applied) | 18674620 | https://seatgeek.com/sting-tickets/las-vegas-nevada-the-colosseum-at-caesars-palace-2027-03-12-8-pm/concert/18674620 | - |
| tm-staind-2027-west-palm-beach-vvg1vz_kdb8l2e | staind | verify (applied) | 18654501 | https://seatgeek.com/staind-tickets/west-palm-beach-florida-ithink-financial-amphitheatre-2027-03-13-6-pm/concert/18654501 | - |
| tm-dinosaur-jr-2027-boston-vv16vzkf4vvza5c5kf | dinosaur-jr | verify (applied) | 18540462 | https://seatgeek.com/dinosaur-jr-tickets/boston-massachusetts-citizens-house-of-blues-boston-2027-03-13-7-pm/concert/18540462 | - |
| tm-greta-van-fleet-2027-knoxville-g5viz_fat50pa | greta-van-fleet | verify (applied) | 18641980 | https://seatgeek.com/greta-van-fleet-tickets/knoxville-tennessee-thompson-boling-arena-at-food-city-center-2027-03-13-7-pm/concert/18641980 | - |
| tm-def-leppard-2027-newark-vv1aezk4kgkdvinob | def-leppard | verify (applied) | 18662381 | https://seatgeek.com/def-leppard-tickets/newark-new-jersey-prudential-center-2027-03-13-7-pm/concert/18662381 | - |
| tm-polyphia-2027-orlando-17fov0g6gemc12a | polyphia | verify (applied) | 18312347 | https://seatgeek.com/polyphia-tickets/orlando-florida-hard-rock-live-orlando-2027-03-13-7-30-pm/concert/18312347 | - |
| tm-gracie-abrams-2027-philadelphia-17gzv0g65prugzw | gracie-abrams | verify (applied) | 18270574 | https://seatgeek.com/gracie-abrams-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-03-13-8-pm/concert/18270574 | - |
| tm-hans-zimmer-2027-miami-vvg1vz_3gotwd8 | hans-zimmer | verify (applied) | 18601933 | https://seatgeek.com/hans-zimmer-tickets/miami-florida-kaseya-center-2027-03-13-8-pm/concert/18601933 | - |
| tm-needtobreathe-2027-columbia-g5evz_kkuppj_ | needtobreathe | verify (applied) | 18621554 | https://seatgeek.com/needtobreathe-tickets/columbia-south-carolina-township-auditorium-2027-03-13-8-pm/concert/18621554 | - |
| tm-valley-2027-charlotte-g5evz_3nrncxj | valley | verify (applied) | 18606490 | https://seatgeek.com/valley-tickets/charlotte-north-carolina-the-underground-at-the-fillmore-charlotte-2027-03-13-8-pm/concert/18606490 | - |
| tm-mico-2027-cleveland-rz7hnez1afut40 | mico | verify (applied) | 18746851 | https://seatgeek.com/mico-tickets/cleveland-ohio-globe-iron-2027-03-13-8-pm/concert/18746851 | - |
| tm-theory-of-a-deadman-2027-toronto-1a8zkfngked-56c | theory-of-a-deadman | verify (applied) | 18570546 | https://seatgeek.com/theory-of-a-deadman-tickets/toronto-canada-the-theatre-at-great-canadian-casino-resort-toronto-2027-03-13-8-pm/concert/18570546 | - |
| tm-feid-2027-montreal-1ad7z_4gkd0zh9f | feid | verify (applied) | 18746768 | https://seatgeek.com/feid-tickets/montreal-canada-centre-bell-2027-03-13-8-pm/concert/18746768 | - |
| tm-sylvan-esso-2027-nashville-g5viz_g3v82ae | sylvan-esso | verify (applied) | 18299188 | https://seatgeek.com/sylvan-esso-tickets/nashville-tennessee-brooklyn-bowl-nashville-2027-03-13-7-pm/concert/18299188 | - |
| tm-yacht-rock-revue-2027-nashville-g5viz_k26z3ab | yacht-rock-revue | verify (applied) | 18613250 | https://seatgeek.com/yacht-rock-revue-tickets/nashville-tennessee-the-truth-nashville-2027-03-13-8-pm/concert/18613250 | - |
| tm-remi-wolf-2027-milwaukee-vv1a6zk4kgkei14ha | remi-wolf | verify (applied) | 18664770 | https://seatgeek.com/remi-wolf-tickets/milwaukee-wisconsin-landmark-credit-union-live-2027-03-13-8-pm/concert/18664770 | - |
| tm-michelle-branch-2027-los-angeles-vv170z_8gksjroc_ | michelle-branch | verify (applied) | 18508837 | https://seatgeek.com/michelle-branch-tickets/los-angeles-california-the-wiltern-2027-03-13-7-pm/concert/18508837 | - |
| tm-los-tigres-del-norte-2027-temecula-vvg1iz_km0aey4 | los-tigres-del-norte | verify (applied) | 18652912 | https://seatgeek.com/los-tigres-del-norte-tickets/temecula-california-pechanga-resort-casino-2027-03-13-8-pm/concert/18652912 | - |
| tm-foreigner-2027-las-vegas-1avjz_kgkurwnkf | foreigner | verify (applied) | 18724000 | https://seatgeek.com/foreigner-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2027-03-13-8-pm/concert/18724000 | - |
| tm-metallica-2027-las-vegas-1a9zko-gkepzxff | metallica | verify (applied) | 18111118 | https://seatgeek.com/metallica-tickets/las-vegas-nevada-sphere-2027-03-13-8-30-pm/concert/18111118 | - |
| tm-blue-october-2027-rockford-17f8v0g61mnfk5g | blue-october | verify (applied) | 18239397 | https://seatgeek.com/blue-october-tickets/rockford-illinois-hard-rock-live-rockford-2027-03-14-6-pm/concert/18239397 | - |
| tm-needtobreathe-2027-orlando-1axzkfggkdmxefx | needtobreathe | verify (applied) | 18621555 | https://seatgeek.com/needtobreathe-tickets/orlando-florida-hard-rock-live-orlando-2027-03-14-7-pm/concert/18621555 | - |
| tm-valley-2027-washington-16vfz_333g7mktl | valley | verify (applied) | 18606068 | https://seatgeek.com/valley-tickets/washington-district-of-columbia-9-30-club-2027-03-14-7-pm/concert/18606068 | - |
| tm-hans-zimmer-2027-tampa-vvg1vz_3xhwnhj | hans-zimmer | verify (applied) | 18601934 | https://seatgeek.com/hans-zimmer-tickets/tampa-florida-benchmark-international-arena-2027-03-14-7-30-pm/concert/18601934 | - |
| tm-don-omar-2027-orlando-17fov0g6u6m7kw6 | don-omar | verify (applied) | 18325188 | https://seatgeek.com/don-omar-tickets/orlando-florida-kia-center-2027-03-14-8-pm/concert/18325188 | - |
| tm-the-red-clay-strays-2027-winnipeg-1av7z_kgkgyzwh1 | the-red-clay-strays | verify (applied) | 18639084 | https://seatgeek.com/the-red-clay-strays-tickets/winnipeg-canada-canada-life-centre-2027-03-14-7-pm/concert/18639084 | - |
| tm-jay-wheeler-2027-charlotte-g5evz_f75dxcp | jay-wheeler | verify (applied) | 18649599 | https://seatgeek.com/jay-wheeler-tickets/charlotte-north-carolina-ovens-auditorium-2027-03-14-8-pm/concert/18649599 | - |
| tm-morat-2027-hidalgo-g5diz_1bprewh | morat | verify (applied) | 18251579 | https://seatgeek.com/morat-tickets/hidalgo-texas-payne-arena-2027-03-14-8-pm/concert/18251579 | - |
| tm-yuridia-2027-el-paso-vvg1yz_3ggzxqt | yuridia | verify (applied) | 18570407 | https://seatgeek.com/yuridia-tickets/el-paso-texas-don-haskins-center-2027-03-14-8-pm/concert/18570407 | - |
| tm-tommy-emmanuel-2027-calgary-1k78vpuega13dcp | tommy-emmanuel | verify (applied) | 18634114 | https://seatgeek.com/tommy-emmanuel-tickets/calgary-canada-southern-alberta-jubilee-auditorium-2027-03-14-8-pm/concert/18634114 | - |
| tm-flans-2027-los-angeles-vv1aazkfsgkdiitze | flans | verify (applied) | 18612688 | https://seatgeek.com/flans-tickets/los-angeles-california-orpheum-theatre-los-angeles-2027-03-14-8-pm/concert/18612688 | - |
| tm-blondshell-2027-washington-17a8v0g61wjljxg | blondshell | verify (applied) | 18251055 | https://seatgeek.com/blondshell-tickets/washington-district-of-columbia-9-30-club-2027-03-15-7-pm/concert/18251055 | - |
| tm-greta-van-fleet-2027-fort-worth-vvg1yz_f6vci7r | greta-van-fleet | verify (applied) | 18641983 | https://seatgeek.com/greta-van-fleet-tickets/fort-worth-texas-dickies-arena-2027-03-15-7-pm/concert/18641983 | - |
| tm-staind-2027-birmingham-1aozk4vgkdpep6o | staind | verify (applied) | 18654502 | https://seatgeek.com/staind-tickets/birmingham-alabama-legacy-arena-at-the-bjcc-2027-03-16-6-pm/concert/18654502 | - |
| tm-hans-zimmer-2027-atlanta-vvg1zz_3ebknkc | hans-zimmer | verify (applied) | 18601941 | https://seatgeek.com/hans-zimmer-tickets/atlanta-georgia-state-farm-arena-1-2027-03-16-7-30-pm/concert/18601941 | - |
| tm-polyphia-2027-atlanta-vvg1zz_gwmeyrd | polyphia | verify (applied) | 18312348 | https://seatgeek.com/polyphia-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-03-16-7-30-pm/concert/18312348 | - |
| tm-gracie-abrams-2027-brooklyn-17gzv0g61s0b9dq | gracie-abrams | verify (applied) | 18270579 | https://seatgeek.com/gracie-abrams-tickets/brooklyn-new-york-barclays-center-2027-03-16-8-pm/concert/18270579 | - |
| tm-pink-martini-2027-toronto-177zv0g65s2z1n6 | pink-martini | verify (applied) | 18281445 | https://seatgeek.com/pink-martini-tickets/toronto-canada-roy-thomson-hall-2027-03-16-8-pm/concert/18281445 | - |
| tm-valley-2027-philadelphia-vv1aezkfygkdw6utw | valley | verify (applied) | 18606537 | https://seatgeek.com/valley-tickets/philadelphia-pennsylvania-brooklyn-bowl-philadelphia-2027-03-16-8-pm/concert/18606537 | - |
| tm-greta-van-fleet-2027-tulsa-1aezz_kgkdnv4sg | greta-van-fleet | verify (applied) | 18641984 | https://seatgeek.com/greta-van-fleet-tickets/tulsa-oklahoma-bok-center-2027-03-16-7-pm/concert/18641984 | - |
| tm-tobymac-2027-sioux-falls-vv1akzkg_gkd7w414 | tobymac | verify (applied) | 18175905 | https://seatgeek.com/tobymac-tickets/sioux-falls-south-dakota-denny-sanford-premier-center-2027-03-16-7-pm/concert/18175905 | - |
| tm-needtobreathe-2027-memphis-g5viz_k1t4cqs | needtobreathe | verify (applied) | 18621556 | https://seatgeek.com/needtobreathe-tickets/memphis-tennessee-satellite-music-hall-2027-03-17-6-pm/concert/18621556 | - |
| tm-def-leppard-2027-boston-vv1a8vp88ga16tl3 | def-leppard | verify (applied) | 18662380 | https://seatgeek.com/def-leppard-tickets/boston-massachusetts-td-garden-2027-03-17-7-pm/concert/18662380 | - |
| tm-theory-of-a-deadman-2027-windsor-1avzz_ogktpe4kz | theory-of-a-deadman | verify (applied) | 18560921 | https://seatgeek.com/theory-of-a-deadman-tickets/windsor-canada-the-colosseum-at-caesars-windsor-2027-03-17-7-pm/concert/18560921 | - |
| tm-gracie-abrams-2027-brooklyn-17gzv0g65ie2coz | gracie-abrams | verify (applied) | 18270580 | https://seatgeek.com/gracie-abrams-tickets/brooklyn-new-york-barclays-center-2027-03-17-8-pm/concert/18270580 | - |
| tm-tobymac-2027-fargo-vv1akzkf_gkd8vyo- | tobymac | verify (applied) | 18542853 | https://seatgeek.com/tobymac-tickets/fargo-north-dakota-fargodome-2027-03-17-7-pm/concert/18542853 | - |
| tm-polyphia-2027-birmingham-1aozkfbgkdtjfo5 | polyphia | verify (applied) | 18536027 | https://seatgeek.com/polyphia-tickets/birmingham-alabama-avondale-brewing-company-2027-03-17-7-30-pm/concert/18536027 | - |
| tm-hans-zimmer-2027-nashville-g5viz_3pzfvfc | hans-zimmer | verify (applied) | 18601967 | https://seatgeek.com/hans-zimmer-tickets/nashville-tennessee-bridgestone-arena-2027-03-17-7-30-pm/concert/18601967 | - |
| tm-tommy-emmanuel-2027-winnipeg-1k78vpupga1vvti | tommy-emmanuel | verify (applied) | 18633853 | https://seatgeek.com/tommy-emmanuel-tickets/winnipeg-canada-burton-cummings-theatre-2027-03-17-8-pm/concert/18633853 | - |
| tm-too-many-zooz-2027-colorado-springs-1ae0z_3gkzlv-ok | too-many-zooz | verify (applied) | 18612556 | https://seatgeek.com/too-many-zooz-tickets/colorado-springs-colorado-black-sheep-2027-03-17-8-pm/concert/18612556 | - |
| tm-foreigner-2027-las-vegas-1avjz_kgkursnk_ | foreigner | verify (applied) | 18724001 | https://seatgeek.com/foreigner-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2027-03-17-8-pm/concert/18724001 | - |
| tm-needtobreathe-2027-memphis-g5viz_k1tpwrf | needtobreathe | verify (applied) | 18621561 | https://seatgeek.com/needtobreathe-tickets/memphis-tennessee-satellite-music-hall-2027-03-18-6-pm/concert/18621561 | - |
| tm-valley-2027-boston-vv177z_3gkmvpndn | valley | verify (applied) | 18606067 | https://seatgeek.com/valley-tickets/boston-massachusetts-paradise-rock-club-2027-03-18-7-pm/concert/18606067 | - |
| tm-the-red-clay-strays-2027-uncasville-g5vvz_koktqjf | the-red-clay-strays | verify (applied) | 18639085 | https://seatgeek.com/the-red-clay-strays-tickets/uncasville-connecticut-mohegan-sun-arena-2027-03-18-7-pm/concert/18639085 | - |
| tm-staind-2027-oklahoma-city-vvg1yz_kb9ngdb | staind | verify (applied) | 18654504 | https://seatgeek.com/staind-tickets/oklahoma-city-oklahoma-paycom-center-2027-03-18-6-pm/concert/18654504 | - |
| tm-blondshell-2027-boston-vvg17z_1uqvup8 | blondshell | verify (applied) | 18251060 | https://seatgeek.com/blondshell-tickets/boston-massachusetts-citizens-house-of-blues-boston-2027-03-18-7-pm/concert/18251060 | - |
| tm-mercyme-2027-florence-g5evz_fmi8uks | mercyme | verify (applied) | 18692228 | https://seatgeek.com/mercyme-tickets/florence-south-carolina-florence-center-2027-03-18-7-pm/concert/18692228 | - |
| tm-morat-2027-orlando-17fov0g61xg_prh | morat | verify (applied) | 18251530 | https://seatgeek.com/morat-tickets/orlando-florida-kia-center-2027-03-18-8-pm/concert/18251530 | - |
| tm-death-cab-for-cutie-2027-miami-beach-vvg1vz_3ltyqny | death-cab-for-cutie | verify (applied) | 18603788 | https://seatgeek.com/death-cab-for-cutie-tickets/miami-beach-florida-the-fillmore-miami-beach-at-jackie-gleason-theater-2027-03-18-8-pm/concert/18603788 | - |
| tm-jay-wheeler-2027-washington-1a4zk4egkd30m3a | jay-wheeler | verify (applied) | 18649600 | https://seatgeek.com/jay-wheeler-tickets/washington-district-of-columbia-dar-constitution-hall-2027-03-18-8-pm/concert/18649600 | - |
| tm-pink-martini-2027-quebec-17g8v0g61ihh8sg | pink-martini | verify (applied) | 18238944 | https://seatgeek.com/pink-martini-tickets/quebec-city-canada-theatre-capitole-2027-03-18-8-30-pm/concert/18238944 | - |
| tm-polyphia-2027-nashville-g5viz_gnfsyiq | polyphia | verify (applied) | 18312351 | https://seatgeek.com/polyphia-tickets/nashville-tennessee-the-truth-nashville-2027-03-18-7-30-pm/concert/18312351 | - |
| tm-yuridia-2027-laredo-g5diz_3f66dhn | yuridia | verify (applied) | 18570409 | https://seatgeek.com/yuridia-tickets/laredo-texas-sames-auto-arena-2027-03-18-8-pm/concert/18570409 | - |
| tm-feid-2027-chicago-vv1a7zk4xgkdhjeow | feid | verify (applied) | 18746737 | https://seatgeek.com/feid-tickets/chicago-illinois-united-center-2027-03-18-8-pm/concert/18746737 | - |
| tm-the-avett-brothers-2027-orlando-1axzk4egkex8si1 | the-avett-brothers | verify (applied) | 18754598 | https://seatgeek.com/the-avett-brothers-tickets/orlando-florida-house-of-blues-orlando-2027-03-19-6-30-pm/concert/18754598 | - |
| tm-saint-levant-2027-ottawa-1aszkf_gkdi5bcd | saint-levant | verify (applied) | 18552167 | https://seatgeek.com/saint-levant-tickets/ottawa-canada-history-ottawa-2027-03-19-7-pm/concert/18552167 | - |
| tm-needtobreathe-2027-new-orleans-g5viz_ocxa2ai | needtobreathe | verify (applied) | 18621562 | https://seatgeek.com/needtobreathe-tickets/new-orleans-louisiana-fillmore-new-orleans-2027-03-19-6-pm/concert/18621562 | - |
| tm-the-red-clay-strays-2027-allentown-1adzz_kgkmg3bkj | the-red-clay-strays | verify (applied) | 18639090 | https://seatgeek.com/the-red-clay-strays-tickets/allentown-pennsylvania-ppl-center-2027-03-19-7-pm/concert/18639090 | - |
| tm-staind-2027-dallas-vvg1yz_ffb7hxs | staind | verify (applied) | 18654503 | https://seatgeek.com/staind-tickets/dallas-texas-dos-equis-pavilion-2027-03-19-6-pm/concert/18654503 | - |
| tm-niall-horan-2027-detroit-vvg1oz_1rv4ast | niall-horan | verify (applied) | 18235522 | https://seatgeek.com/niall-horan-tickets/detroit-michigan-little-caesars-arena-2027-03-19-7-30-pm/concert/18235522 | - |
| tm-rod-stewart-2027-uncasville-g5vvz_flfx92d | rod-stewart | verify (applied) | 18683772 | https://seatgeek.com/rod-stewart-tickets/uncasville-connecticut-mohegan-sun-arena-2027-03-19-7-30-pm/concert/18683772 | - |
| tm-gracie-abrams-2027-brooklyn-17gzv0g65iekqou | gracie-abrams | verify (applied) | 18270584 | https://seatgeek.com/gracie-abrams-tickets/brooklyn-new-york-barclays-center-2027-03-19-8-pm/concert/18270584 | - |
| tm-tobymac-2027-rockford-vv1a7zkfpgkdtiktq | tobymac | verify (applied) | 18542858 | https://seatgeek.com/tobymac-tickets/rockford-illinois-bmo-center-2027-03-19-7-pm/concert/18542858 | - |
| tm-def-leppard-2027-nashville-g5viz_f9p6_vj | def-leppard | verify (applied) | 18662382 | https://seatgeek.com/def-leppard-tickets/nashville-tennessee-bridgestone-arena-2027-03-19-7-pm/concert/18662382 | - |
| tm-blondshell-2027-montreal-17g8v0g61mppmq0 | blondshell | verify (applied) | 18251053 | https://seatgeek.com/blondshell-tickets/montreal-canada-beanfield-theatre-2027-03-19-8-pm/concert/18251053 | - |
| tm-the-lemonheads-2027-madison-vv17jz_3gkbfxvrj | the-lemonheads | verify (applied) | 18593821 | https://seatgeek.com/the-lemonheads-tickets/madison-wisconsin-majestic-theatre-wi-2027-03-19-8-pm/concert/18593821 | - |
| tm-too-many-zooz-2027-denver-g5vzz_kkf1pnr | too-many-zooz | verify (applied) | 18612771 | https://seatgeek.com/too-many-zooz-tickets/denver-colorado-summit-music-hall-denver-2027-03-19-7-pm/concert/18612771 | - |
| tm-jay-wheeler-2027-atlantic-city-vv1aezk4vgkduqubi | jay-wheeler | verify (applied) | 18649597 | https://seatgeek.com/jay-wheeler-tickets/atlantic-city-new-jersey-hard-rock-live-at-etess-arena-2027-03-19-8-pm/concert/18649597 | - |
| tm-interpol-2027-hidalgo-g5diz_4kwcels | interpol | verify (applied) | 18710343 | https://seatgeek.com/interpol-tickets/hidalgo-texas-payne-arena-2027-03-19-8-pm/concert/18710343 | - |
| tm-remi-wolf-2027-nashville-g5viz_fni20_x | remi-wolf | verify (applied) | 18664774 | https://seatgeek.com/remi-wolf-tickets/nashville-tennessee-the-truth-nashville-2027-03-19-8-pm/concert/18664774 | - |
| tm-the-interrupters-2027-tempe-16v0z_3j3g7wujq | the-interrupters | verify (applied) | 18612836 | https://seatgeek.com/the-interrupters-tickets/tempe-arizona-marquee-theatre-tempe-az-2027-03-19-7-pm/concert/18612836 | - |
| tm-greta-van-fleet-2027-anaheim-vv170z_kgkm7preh | greta-van-fleet | verify (applied) | 18641986 | https://seatgeek.com/greta-van-fleet-tickets/anaheim-california-honda-center-2027-03-19-7-pm/concert/18641986 | - |
| tm-vnv-nation-2027-san-diego-vvg1izbvnuske3 | vnv-nation | verify (applied) | 18150796 | https://seatgeek.com/vnv-nation-tickets/san-diego-california-house-of-blues-san-diego-2027-03-19-7-pm/concert/18150796 | - |
| tm-foreigner-2027-las-vegas-1avjz_kgkurvnkq | foreigner | verify (applied) | 18724002 | https://seatgeek.com/foreigner-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2027-03-19-8-pm/concert/18724002 | - |
| tm-nickelback-2027-hamilton-1a8zk4axofsze2g | nickelback | verify (applied) | 18664627 | https://seatgeek.com/nickelback-tickets/hamilton-canada-td-coliseum-2027-03-20-6-30-pm/concert/18664627 | - |
| tm-saint-levant-2027-london-1avzz_ogktcpwjw | saint-levant | verify (applied) | 18551699 | https://seatgeek.com/saint-levant-tickets/london-canada-london-music-hall-2027-03-20-7-pm/concert/18551699 | - |
| tm-staind-2027-san-antonio-g5diz_fkhzhba | staind | verify (applied) | 18654512 | https://seatgeek.com/staind-tickets/san-antonio-texas-frost-bank-center-2027-03-20-6-pm/concert/18654512 | - |
| tm-blondshell-2027-toronto-177zv0g61ygdrn9 | blondshell | verify (applied) | 18251050 | https://seatgeek.com/blondshell-tickets/toronto-canada-the-danforth-music-hall-2027-03-20-7-pm/concert/18251050 | - |
| tm-mercyme-2027-macon-vvg1zz_fsveixl | mercyme | verify (applied) | 18692238 | https://seatgeek.com/mercyme-tickets/macon-georgia-atrium-health-amphitheater-2027-03-20-7-pm/concert/18692238 | - |
| tm-niall-horan-2027-columbus-vvg1fz_1x9ig7q | niall-horan | verify (applied) | 18235520 | https://seatgeek.com/niall-horan-tickets/columbus-ohio-nationwide-arena-2027-03-20-7-30-pm/concert/18235520 | - |
| tm-gracie-abrams-2027-brooklyn-17gzv0g65iebqor | gracie-abrams | verify (applied) | 18270586 | https://seatgeek.com/gracie-abrams-tickets/brooklyn-new-york-barclays-center-2027-03-20-8-pm/concert/18270586 | - |
| tm-morat-2027-miami-vvg1vz_1toy-p6 | morat | verify (applied) | 18251573 | https://seatgeek.com/morat-tickets/miami-florida-kaseya-center-2027-03-20-8-pm/concert/18251573 | - |
| tm-death-cab-for-cutie-2027-orlando-1aefz_3gkr16pfe | death-cab-for-cutie | verify (applied) | 18603759 | https://seatgeek.com/death-cab-for-cutie-tickets/orlando-florida-hard-rock-live-orlando-2027-03-20-8-pm/concert/18603759 | - |
| tm-needtobreathe-2027-houston-g5diz_kkbawh- | needtobreathe | verify (applied) | 18621563 | https://seatgeek.com/needtobreathe-tickets/houston-texas-713-music-hall-2027-03-20-7-pm/concert/18621563 | - |
| tm-valley-2027-toronto-1avzz_3gkdexa9o | valley | verify (applied) | 18606234 | https://seatgeek.com/valley-tickets/toronto-canada-massey-hall-2027-03-20-8-pm/concert/18606234 | - |
| tm-tommy-emmanuel-2027-ottawa-1aszkfgjd0vzecc | tommy-emmanuel | verify (applied) | 18633859 | https://seatgeek.com/tommy-emmanuel-tickets/ottawa-canada-national-arts-centre-2027-03-20-8-pm/concert/18633859 | - |
| tm-jay-wheeler-2027-mashantucket-g5vvz_fp_melk | jay-wheeler | verify (applied) | 18649598 | https://seatgeek.com/jay-wheeler-tickets/mashantucket-connecticut-premier-theater-at-foxwoods-resort-casino-2027-03-20-8-pm/concert/18649598 | - |
| tm-remi-wolf-2027-atlanta-vvg1zz_fj5-2nn | remi-wolf | verify (applied) | 18664775 | https://seatgeek.com/remi-wolf-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-03-20-8-pm/concert/18664775 | - |
| tm-polyphia-2027-dallas-vvg1yz_glmqcu0 | polyphia | verify (applied) | 18312313 | https://seatgeek.com/polyphia-tickets/dallas-texas-south-side-ballroom-in-gilley-s-2027-03-20-7-30-pm/concert/18312313 | - |
| tm-jon-pardi-2027-durant-vvg1yz_ksrbiue | jon-pardi | verify (applied) | 18652960 | https://seatgeek.com/jon-pardi-tickets/durant-oklahoma-choctaw-grand-theater-2027-03-20-8-pm/concert/18652960 | - |
| tm-theory-of-a-deadman-2027-winnipeg-1av7z_ogkxutibu | theory-of-a-deadman | verify (applied) | 18570549 | https://seatgeek.com/theory-of-a-deadman-tickets/winnipeg-canada-burton-cummings-theatre-2027-03-20-8-pm/concert/18570549 | - |
| tm-los-tigres-del-norte-2027-rosemont-vv1a7zk4kgkdecl8m | los-tigres-del-norte | verify (applied) | 18738294 | https://seatgeek.com/los-tigres-del-norte-tickets/rosemont-illinois-allstate-arena-2027-03-20-8-pm/concert/18738294 | - |
| tm-greta-van-fleet-2027-phoenix-1av0z_kgkbck9ok | greta-van-fleet | verify (applied) | 18641989 | https://seatgeek.com/greta-van-fleet-tickets/phoenix-arizona-mortgage-matchup-center-2027-03-20-7-pm/concert/18641989 | - |
| tm-the-lemonheads-2027-chicago-rz7hnez1afgof7 | the-lemonheads | verify (applied) | 18595347 | https://seatgeek.com/the-lemonheads-tickets/chicago-illinois-empty-bottle-1-2027-03-20-9-pm/concert/18595347 | - |
| tm-foreigner-2027-las-vegas-1avjz_kgkurgbki | foreigner | verify (applied) | 18723997 | https://seatgeek.com/foreigner-tickets/las-vegas-nevada-venetian-theatre-at-the-venetian-resort-2027-03-20-8-pm/concert/18723997 | - |
| tm-nickelback-2027-toronto-1a8zk47gkdvbcpm | nickelback | verify (applied) | 18664630 | https://seatgeek.com/nickelback-tickets/toronto-canada-scotiabank-arena-2027-03-21-6-30-pm/concert/18664630 | - |
| tm-def-leppard-2027-washington-17a8v0g62pvh_yy | def-leppard | verify (applied) | 18662383 | https://seatgeek.com/def-leppard-tickets/washington-district-of-columbia-capital-one-arena-2027-03-21-7-pm/concert/18662383 | - |
| tm-tobymac-2027-tulsa-1aozkf_gkdn-dht | tobymac | verify (applied) | 18542855 | https://seatgeek.com/tobymac-tickets/tulsa-oklahoma-bok-center-2027-03-21-6-30-pm/concert/18542855 | - |
| tm-tommy-emmanuel-2027-toronto-z7r9jz1aaeox3 | tommy-emmanuel | verify (applied) | 18785601 | https://seatgeek.com/tommy-emmanuel-tickets/toronto-canada-massey-hall-2027-03-21-8-pm/concert/18785601 | - |
| tm-mercyme-2027-huntsville-1aezz_fgksvhplo | mercyme | verify (applied) | 18692239 | https://seatgeek.com/mercyme-tickets/huntsville-alabama-propst-arena-at-the-von-braun-center-2027-03-21-7-pm/concert/18692239 | - |
| tm-vnv-nation-2027-san-francisco-g5vyzbvdfhbds | vnv-nation | verify (applied) | 18150870 | https://seatgeek.com/vnv-nation-tickets/san-francisco-california-august-hall-2027-03-21-7-30-pm/concert/18150870 | - |
| tm-staind-2027-denver-g5vzz_f7kx5yq | staind | verify (applied) | 18654511 | https://seatgeek.com/staind-tickets/denver-colorado-ball-arena-2027-03-22-6-pm/concert/18654511 | - |
| tm-interpol-2027-memphis-g5viz_4agmgrr | interpol | verify (applied) | 18710346 | https://seatgeek.com/interpol-tickets/memphis-tennessee-satellite-music-hall-2027-03-22-7-pm/concert/18710346 | - |
| tm-hans-zimmer-2027-fort-worth-vvg1yz_8uydbmt | hans-zimmer | verify (applied) | 18601942 | https://seatgeek.com/hans-zimmer-tickets/fort-worth-texas-dickies-arena-2027-03-22-7-30-pm/concert/18601942 | - |
| tm-death-cab-for-cutie-2027-houston-g5diz_3dogrf9 | death-cab-for-cutie | verify (applied) | 18604033 | https://seatgeek.com/death-cab-for-cutie-tickets/houston-texas-713-music-hall-2027-03-22-8-pm/concert/18604033 | - |
| tm-greta-van-fleet-2027-reno-1avjz_kgkmchefe | greta-van-fleet | verify (applied) | 18641990 | https://seatgeek.com/greta-van-fleet-tickets/reno-nevada-reno-events-center-2027-03-22-7-pm/concert/18641990 | - |
| tm-the-interrupters-2027-dallas-vvg1yz_k69fczg | the-interrupters | verify (applied) | 18612572 | https://seatgeek.com/the-interrupters-tickets/dallas-texas-house-of-blues-dallas-2027-03-23-6-pm/concert/18612572 | - |
| tm-blondshell-2027-asbury-park-k7vgf_knjlgim | blondshell | verify (applied) | 18633502 | https://seatgeek.com/blondshell-tickets/asbury-park-new-jersey-the-stone-pony-2-2027-03-23-7-pm/concert/18633502 | - |
| tm-def-leppard-2027-pittsburgh-1apzk4egkdr8ult | def-leppard | verify (applied) | 18662390 | https://seatgeek.com/def-leppard-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2027-03-23-7-pm/concert/18662390 | - |
| tm-saint-levant-2027-toronto-177zv0g6cemiqt_ | saint-levant | verify (applied) | 18387668 | https://seatgeek.com/saint-levant-tickets/toronto-canada-history-2027-03-23-7-pm/concert/18387668 | - |
| tm-michelle-branch-2027-portland-vv177z_8gkm-dic1 | michelle-branch | verify (applied) | 18508848 | https://seatgeek.com/michelle-branch-tickets/portland-maine-state-theatre-portland-me-2027-03-23-8-pm/concert/18508848 | - |
| tm-interpol-2027-asheville-g5evz_4oz4dpm | interpol | verify (applied) | 18710348 | https://seatgeek.com/interpol-tickets/asheville-north-carolina-thomas-wolfe-auditorium-at-harrah-s-cherokee-center-2027-03-23-8-pm/concert/18710348 | - |
| tm-niall-horan-2027-chicago-vvg18z_1llyajb | niall-horan | verify (applied) | 18235524 | https://seatgeek.com/niall-horan-tickets/chicago-illinois-united-center-2027-03-23-7-30-pm/concert/18235524 | - |
| tm-nickelback-2027-buffalo-k7vgf_fruee-y | nickelback | verify (applied) | 18664602 | https://seatgeek.com/nickelback-tickets/buffalo-new-york-keybank-center-2027-03-24-6-30-pm/concert/18664602 | - |
| tm-the-interrupters-2027-houston-g5diz_3r-jkhd | the-interrupters | verify (applied) | 18612693 | https://seatgeek.com/the-interrupters-tickets/houston-texas-house-of-blues-houston-2027-03-24-6-pm/concert/18612693 | - |
| tm-saint-levant-2027-toronto-177zv0g6cemcutq | saint-levant | verify (applied) | 18387667 | https://seatgeek.com/saint-levant-tickets/toronto-canada-history-2027-03-24-7-pm/concert/18387667 | - |
| tm-interpol-2027-washington-1a4zk4kgkd5cf0g | interpol | verify (applied) | 18710355 | https://seatgeek.com/interpol-tickets/washington-district-of-columbia-the-anthem-dc-2027-03-24-7-30-pm/concert/18710355 | - |
| tm-staind-2027-boise-g5vzz_kb7mfuo | staind | verify (applied) | 18654515 | https://seatgeek.com/staind-tickets/boise-idaho-extramile-arena-2027-03-24-6-pm/concert/18654515 | - |
| tm-jay-wheeler-2027-brooklyn-1ayzk4vgkebxenn | jay-wheeler | verify (applied) | 18649607 | https://seatgeek.com/jay-wheeler-tickets/brooklyn-new-york-barclays-center-2027-03-24-8-pm/concert/18649607 | - |
| tm-mercyme-2027-pensacola-g5viz_fuwn07x | mercyme | verify (applied) | 18692241 | https://seatgeek.com/mercyme-tickets/pensacola-florida-pensacola-bay-center-2027-03-24-7-pm/concert/18692241 | - |
| tm-yuridia-2027-rosemont-vv1a7zkf0gkeskm_x | yuridia | verify (applied) | 18609778 | https://seatgeek.com/yuridia-tickets/rosemont-illinois-rosemont-theatre-2027-03-24-8-pm/concert/18609778 | - |
| tm-the-psychedelic-furs-2027-san-antonio-g5diz_a6js1qk | the-psychedelic-furs | verify (applied) | 18092201 | https://seatgeek.com/the-psychedelic-furs-tickets/san-antonio-texas-aztec-theatre-2027-03-24-8-pm/concert/18092201 | - |
| tm-feid-2027-dallas-vvg1yz_pkmsn11 | feid | verify (applied) | 18746738 | https://seatgeek.com/feid-tickets/dallas-texas-american-airlines-center-2027-03-24-8-pm/concert/18746738 | - |
| tm-greta-van-fleet-2027-seattle-vvg1hz_km-zrdh | greta-van-fleet | verify (applied) | 18641992 | https://seatgeek.com/greta-van-fleet-tickets/seattle-washington-climate-pledge-arena-2027-03-24-7-pm/concert/18641992 | - |
| tm-theory-of-a-deadman-2027-enoch-1aozkfngkdgjwil | theory-of-a-deadman | verify (applied) | 18570557 | https://seatgeek.com/theory-of-a-deadman-tickets/enoch-canada-river-cree-resort-casino-2027-03-24-8-pm/concert/18570557 | - |
| tm-vnv-nation-2027-seattle-vvg1hzbvl3-6jq | vnv-nation | verify (applied) | 18149562 | https://seatgeek.com/vnv-nation-tickets/seattle-washington-neptune-theatre-wa-2027-03-24-8-pm/concert/18149562 | - |
| tm-warren-zeiders-2027-orlando-1axzk4vgkenxkjc | warren-zeiders | verify (applied) | 18649742 | https://seatgeek.com/warren-zeiders-tickets/orlando-florida-house-of-blues-orlando-2027-03-25-7-pm/concert/18649742 | - |
| tm-saint-levant-2027-toronto-1a8zkf_gkdyntyg | saint-levant | verify (applied) | 18550847 | https://seatgeek.com/saint-levant-tickets/toronto-canada-history-2027-03-25-7-pm/concert/18550847 | - |
| tm-the-lemonheads-2027-detroit-vv17oz_3gklkn916 | the-lemonheads | verify (applied) | 18593750 | https://seatgeek.com/the-lemonheads-tickets/detroit-michigan-saint-andrews-hall-2027-03-25-7-pm/concert/18593750 | - |
| tm-mercyme-2027-orlando-1kfovp3_ga2o7he | mercyme | verify (applied) | 18692243 | https://seatgeek.com/mercyme-tickets/orlando-florida-addition-financial-arena-2027-03-25-7-pm/concert/18692243 | - |
| tm-michelle-branch-2027-new-york-g5diz_8xxfdpf | michelle-branch | verify (applied) | 18508849 | https://seatgeek.com/michelle-branch-tickets/new-york-new-york-beacon-theatre-2027-03-25-8-pm/concert/18508849 | - |
| tm-the-red-clay-strays-2027-mobile-g5viz_k1kuycs | the-red-clay-strays | verify (applied) | 18617428 | https://seatgeek.com/the-red-clay-strays-tickets/mobile-alabama-mobile-civic-center-arena-2027-03-25-7-pm/concert/18617428 | - |
| tm-dylan-gossett-2027-charleston-g5evz_kdp4j6z | dylan-gossett | verify (applied) | 18642081 | https://seatgeek.com/dylan-gossett-tickets/charleston-south-carolina-charleston-music-hall-2027-03-25-7-pm/concert/18642081 | - |
| tm-def-leppard-2027-chicago-vv1k8z_fgkg7dl8f | def-leppard | verify (applied) | 18662394 | https://seatgeek.com/def-leppard-tickets/chicago-illinois-united-center-2027-03-25-7-pm/concert/18662394 | - |
| tm-jay-wheeler-2027-reading-vv17fz_kgkblt_5x | jay-wheeler | verify (applied) | 18649606 | https://seatgeek.com/jay-wheeler-tickets/reading-pennsylvania-santander-arena-2027-03-25-8-pm/concert/18649606 | - |
| tm-pink-martini-2027-houston-g5diz_8uc2ajn | pink-martini | verify (applied) | 18515284 | https://seatgeek.com/pink-martini-tickets/houston-texas-sarofim-hall-at-the-hobby-center-2027-03-25-7-30-pm/concert/18515284 | - |
| tm-yuridia-2027-rosemont-vv1a7zkf0gkenyiy- | yuridia | verify (applied) | 18570495 | https://seatgeek.com/yuridia-tickets/rosemont-illinois-rosemont-theatre-2027-03-25-8-pm/concert/18570495 | - |
| tm-hans-zimmer-2027-denver-g5vzz_keile5w | hans-zimmer | verify (applied) | 18601943 | https://seatgeek.com/hans-zimmer-tickets/denver-colorado-ball-arena-2027-03-25-7-30-pm/concert/18601943 | - |
| tm-greta-van-fleet-2027-portland-vvg1hz_kle7js7 | greta-van-fleet | verify (applied) | 18641995 | https://seatgeek.com/greta-van-fleet-tickets/portland-oregon-moda-center-2027-03-25-7-pm/concert/18641995 | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dw2ugw | barry-manilow | verify (applied) | 17637123 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-03-25-7-pm/concert/17637123 | - |
| tm-theory-of-a-deadman-2027-calgary-1av7z_ogkn_kbte | theory-of-a-deadman | verify (applied) | 18570558 | https://seatgeek.com/theory-of-a-deadman-tickets/calgary-canada-southern-alberta-jubilee-auditorium-2027-03-25-8-pm/concert/18570558 | - |
| tm-nickelback-2027-detroit-vv1afzk46gkdogect | nickelback | verify (applied) | 18664604 | https://seatgeek.com/nickelback-tickets/detroit-michigan-little-caesars-arena-2027-03-26-6-30-pm/concert/18664604 | - |
| tm-morat-2027-toronto-177zv0g65ag8wpj | morat | verify (applied) | 18252780 | https://seatgeek.com/morat-tickets/toronto-canada-history-2027-03-26-7-pm/concert/18252780 | - |
| tm-dylan-gossett-2027-north-myrtle-beach-g5evz_kuxkrl8 | dylan-gossett | verify (applied) | 18642079 | https://seatgeek.com/dylan-gossett-tickets/north-myrtle-beach-south-carolina-house-of-blues-myrtle-beach-2027-03-26-7-pm/concert/18642079 | - |
| tm-niall-horan-2027-indianapolis-vvg1fz_1htnybv | niall-horan | verify (applied) | 18235521 | https://seatgeek.com/niall-horan-tickets/indianapolis-indiana-gainbridge-fieldhouse-2027-03-26-7-30-pm/concert/18235521 | - |
| tm-the-lemonheads-2027-cincinnati-1avbz_3gkmybpfp | the-lemonheads | verify (applied) | 18594482 | https://seatgeek.com/the-lemonheads-tickets/cincinnati-ohio-live-at-the-ludlow-garage-2027-03-26-7-30-pm/concert/18594482 | - |
| tm-michelle-branch-2027-silver-spring-16vfz_809g7nt6o | michelle-branch | verify (applied) | 18508850 | https://seatgeek.com/michelle-branch-tickets/silver-spring-maryland-the-fillmore-silver-spring-2027-03-26-8-pm/concert/18508850 | - |
| tm-fantasia-2027-atlanta-vvg1zz_kqs5ty6 | fantasia | verify (applied) | 18629276 | https://seatgeek.com/fantasia-tickets/atlanta-georgia-state-farm-arena-1-2027-03-26-8-pm/concert/18629276 | - |
| tm-the-red-clay-strays-2027-mobile-g5viz_3tpkkro | the-red-clay-strays | verify (applied) | 18609522 | https://seatgeek.com/the-red-clay-strays-tickets/mobile-alabama-mobile-civic-center-arena-2027-03-26-7-pm/concert/18609522 | - |
| tm-interpol-2027-philadelphia-vv1aezk4fgkevbabi | interpol | verify (applied) | 18710357 | https://seatgeek.com/interpol-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-03-26-8-pm/concert/18710357 | - |
| tm-los-tigres-del-norte-2027-miami-vvg1vz_fxmchil | los-tigres-del-norte | verify (applied) | 18738296 | https://seatgeek.com/los-tigres-del-norte-tickets/miami-florida-james-l-knight-center-2027-03-26-8-pm/concert/18738296 | - |
| tm-feid-2027-austin-g5diz_pkrkhdd | feid | verify (applied) | 18746739 | https://seatgeek.com/feid-tickets/austin-texas-moody-center-atx-2027-03-26-8-pm/concert/18746739 | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dw8pgt | barry-manilow | verify (applied) | 17637124 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-03-26-8-pm/concert/17637124 | - |
| tm-saint-levant-2027-boston-vvg17z_cxqdi4_ | saint-levant | verify (applied) | 18386180 | https://seatgeek.com/saint-levant-tickets/boston-massachusetts-citizens-house-of-blues-boston-2027-03-27-7-pm/concert/18386180 | - |
| tm-the-lemonheads-2027-columbus-rz7hnez1afgpp0 | the-lemonheads | verify (applied) | 18595355 | https://seatgeek.com/the-lemonheads-tickets/columbus-ohio-rumba-cafe-columbus-oh-2027-03-27-8-pm/concert/18595355 | - |
| tm-nickelback-2027-milwaukee-vv1a6zk4agkd7raaf | nickelback | verify (applied) | 18664601 | https://seatgeek.com/nickelback-tickets/milwaukee-wisconsin-fiserv-forum-2027-03-27-6-30-pm/concert/18664601 | - |
| tm-morat-2027-montreal-17g8v0g65cezfzf | morat | verify (applied) | 18258641 | https://seatgeek.com/morat-tickets/montreal-canada-mtelus-2027-03-27-8-pm/concert/18258641 | - |
| tm-fantasia-2027-orlando-1aefz_3gkx--7oo | fantasia | verify (applied) | 18629529 | https://seatgeek.com/fantasia-tickets/orlando-florida-addition-financial-arena-2027-03-27-8-pm/concert/18629529 | - |
| tm-the-red-clay-strays-2027-mobile-g5viz_k14dqes | the-red-clay-strays | verify (applied) | 18612577 | https://seatgeek.com/the-red-clay-strays-tickets/mobile-alabama-mobile-civic-center-arena-2027-03-27-7-pm/concert/18612577 | - |
| tm-dylan-gossett-2027-charlotte-g5evz_kb2iepf | dylan-gossett | verify (applied) | 18642082 | https://seatgeek.com/dylan-gossett-tickets/charlotte-north-carolina-the-fillmore-charlotte-2027-03-27-7-pm/concert/18642082 | - |
| tm-jay-wheeler-2027-boston-vv1avzk4agkejxnem | jay-wheeler | verify (applied) | 18649625 | https://seatgeek.com/jay-wheeler-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-03-27-8-pm/concert/18649625 | - |
| tm-the-psychedelic-furs-2027-houston-g5diz_a5ghu6h | the-psychedelic-furs | verify (applied) | 18091246 | https://seatgeek.com/the-psychedelic-furs-tickets/houston-texas-house-of-blues-houston-2027-03-27-7-pm/concert/18091246 | - |
| tm-niall-horan-2027-saint-louis-vvg1bz_1qy32om | niall-horan | verify (applied) | 18235528 | https://seatgeek.com/niall-horan-tickets/saint-louis-missouri-enterprise-center-2027-03-27-7-30-pm/concert/18235528 | - |
| tm-greta-van-fleet-2027-boise-g5vzz_fkffj8x | greta-van-fleet | verify (applied) | 18641996 | https://seatgeek.com/greta-van-fleet-tickets/boise-idaho-extramile-arena-2027-03-27-7-pm/concert/18641996 | - |
| tm-staind-2027-seattle-vvg1hz_km9huyk | staind | verify (applied) | 18654516 | https://seatgeek.com/staind-tickets/seattle-washington-climate-pledge-arena-2027-03-27-6-pm/concert/18654516 | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dwokuv | barry-manilow | verify (applied) | 17637125 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-03-27-7-pm/concert/17637125 | - |
| tm-the-interrupters-2027-orlando-1aefz_3gkdwdk5a | the-interrupters | verify (applied) | 18612830 | https://seatgeek.com/the-interrupters-tickets/orlando-florida-house-of-blues-orlando-2027-03-28-6-pm/concert/18612830 | - |
| tm-the-psychedelic-furs-2027-dallas-vvg1yz_a29lq69 | the-psychedelic-furs | verify (applied) | 18091081 | https://seatgeek.com/the-psychedelic-furs-tickets/dallas-texas-house-of-blues-dallas-2027-03-28-6-30-pm/concert/18091081 | - |
| tm-yuridia-2027-national-harbor-1a4zkfxgkelii5v | yuridia | verify (applied) | 18570413 | https://seatgeek.com/yuridia-tickets/national-harbor-maryland-the-theater-at-mgm-national-harbor-2027-03-28-8-pm/concert/18570413 | - |
| tm-saint-levant-2027-philadelphia-vvg1fz_cxbxmek | saint-levant | verify (applied) | 18386192 | https://seatgeek.com/saint-levant-tickets/philadelphia-pennsylvania-theatre-of-living-arts-2027-03-28-8-pm/concert/18386192 | - |
| tm-death-cab-for-cutie-2027-columbus-vv1aazk4fgkd90ltp | death-cab-for-cutie | verify (applied) | 18715562 | https://seatgeek.com/death-cab-for-cutie-tickets/columbus-ohio-wexner-center-mershon-auditorium-2027-03-29-7-30-pm/concert/18715562 | - |
| tm-staind-2027-vancouver-1aozk4egkdceqzp | staind | verify (applied) | 18654531 | https://seatgeek.com/staind-tickets/vancouver-canada-rogers-arena-2027-03-29-6-pm/concert/18654531 | - |
| tm-def-leppard-2027-denver-g5vzz_frfov07 | def-leppard | verify (applied) | 18662397 | https://seatgeek.com/def-leppard-tickets/denver-colorado-ball-arena-2027-03-29-7-pm/concert/18662397 | - |
| tm-the-interrupters-2027-atlanta-vvg1zz_3dh5hjb | the-interrupters | verify (applied) | 18613133 | https://seatgeek.com/the-interrupters-tickets/atlanta-georgia-the-masquerade-heaven-2027-03-30-6-pm/concert/18613133 | - |
| tm-saint-levant-2027-brooklyn-k7vgf_cl-wdb8 | saint-levant | verify (applied) | 18386179 | https://seatgeek.com/saint-levant-tickets/brooklyn-new-york-brooklyn-paramount-2027-03-30-7-pm/concert/18386179 | - |
| tm-michelle-branch-2027-toronto-1a8zk4kgkdkp6j5 | michelle-branch | verify (applied) | 18688593 | https://seatgeek.com/michelle-branch-tickets/toronto-canada-history-2027-03-30-7-pm/concert/18688593 | - |
| tm-niall-horan-2027-toronto-177zv0g61h1eoxc | niall-horan | verify (applied) | 18235565 | https://seatgeek.com/niall-horan-tickets/toronto-canada-scotiabank-arena-2027-03-30-7-30-pm/concert/18235565 | - |
| tm-death-cab-for-cutie-2027-pittsburgh-1apzkfygkd_ubdt | death-cab-for-cutie | verify (applied) | 18604164 | https://seatgeek.com/death-cab-for-cutie-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2027-03-30-8-pm/concert/18604164 | - |
| tm-greta-van-fleet-2027-denver-g5vzz_kbjtioy | greta-van-fleet | verify (applied) | 18641999 | https://seatgeek.com/greta-van-fleet-tickets/denver-colorado-ball-arena-2027-03-30-7-pm/concert/18641999 | - |
| tm-hans-zimmer-2027-phoenix-1av0z_3gktywjdb | hans-zimmer | verify (applied) | 18601944 | https://seatgeek.com/hans-zimmer-tickets/phoenix-arizona-mortgage-matchup-center-2027-03-30-7-30-pm/concert/18601944 | - |
| tm-nothing-but-thieves-2027-vancouver-1778v0g65pb8zxj | nothing-but-thieves | verify (applied) | 18266338 | https://seatgeek.com/nothing-but-thieves-tickets/vancouver-canada-queen-elizabeth-theatre-vancouver-2027-03-30-8-pm/concert/18266338 | - |
| tm-saint-levant-2027-brooklyn-k7vgf_cl-wsb- | saint-levant | verify (applied) | 18386181 | https://seatgeek.com/saint-levant-tickets/brooklyn-new-york-brooklyn-paramount-2027-03-31-7-pm/concert/18386181 | - |
| tm-michelle-branch-2027-toronto-1a8zk4kgkdkj6jq | michelle-branch | verify (applied) | 18685627 | https://seatgeek.com/michelle-branch-tickets/toronto-canada-history-2027-03-31-7-pm/concert/18685627 | - |
| tm-staind-2027-calgary-1av7z_kgkm-emew | staind | verify (applied) | 18654536 | https://seatgeek.com/staind-tickets/calgary-canada-scotiabank-saddledome-2027-03-31-6-pm/concert/18654536 | - |
| tm-feid-2027-denver-g5vzz_pkrlpf6 | feid | verify (applied) | 18746743 | https://seatgeek.com/feid-tickets/denver-colorado-ball-arena-2027-03-31-8-pm/concert/18746743 | - |
| tm-nothing-but-thieves-2027-seattle-vvg1hz_59quyyu | nothing-but-thieves | verify (applied) | 18266337 | https://seatgeek.com/nothing-but-thieves-tickets/seattle-washington-paramount-theatre-wa-2027-03-31-8-pm/concert/18266337 | - |
| tm-theory-of-a-deadman-2027-vancouver-1av7z_ogknc7mrb | theory-of-a-deadman | verify (applied) | 18570564 | https://seatgeek.com/theory-of-a-deadman-tickets/vancouver-canada-queen-elizabeth-theatre-vancouver-2027-03-31-8-pm/concert/18570564 | - |
| tm-saint-levant-2027-brooklyn-k7vgf_ocsz0pi | saint-levant | verify (applied) | 18550841 | https://seatgeek.com/saint-levant-tickets/brooklyn-new-york-brooklyn-paramount-2027-04-01-7-pm/concert/18550841 | - |
| tm-mercyme-2027-fayetteville-g5evz_frs44wl | mercyme | verify (applied) | 18692247 | https://seatgeek.com/mercyme-tickets/fayetteville-north-carolina-crown-coliseum-crown-complex-2027-04-01-7-pm/concert/18692247 | - |
| tm-gavin-adcock-2027-lexington-1apzk4egkdqsq_b | gavin-adcock | verify (applied) | 18674497 | https://seatgeek.com/gavin-adcock-tickets/lexington-kentucky-gatton-park-1-2027-04-01-7-30-pm/concert/18674497 | - |
| tm-morat-2027-brooklyn-17gzv0g61xr7dfv | morat | verify (applied) | 18252365 | https://seatgeek.com/morat-tickets/brooklyn-new-york-barclays-center-2027-04-01-8-pm/concert/18252365 | - |
| tm-staind-2027-edmonton-1av7z_kgkz_xe9- | staind | verify (applied) | 18654538 | https://seatgeek.com/staind-tickets/edmonton-canada-rogers-place-2027-04-01-6-pm/concert/18654538 | - |
| tm-the-psychedelic-furs-2027-waukegan-vv166zkf-0ozagdv5d | the-psychedelic-furs | verify (applied) | 18592664 | https://seatgeek.com/the-psychedelic-furs-tickets/waukegan-illinois-genesee-theatre-2027-04-01-7-30-pm/concert/18592664 | - |
| tm-barry-manilow-2027-las-vegas-1avjz_3gkroi64s | barry-manilow | verify (applied) | 18590289 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-04-01-7-pm/concert/18590289 | - |
| tm-lukas-graham-2027-boston-vv1k7z_k8xg7ihpb | lukas-graham | verify (applied) | 18617577 | https://seatgeek.com/lukas-graham-tickets/boston-massachusetts-citizens-house-of-blues-boston-2027-04-02-7-pm/concert/18617577 | - |
| tm-the-interrupters-2027-silver-spring-1avfz_3gkbss6tr | the-interrupters | verify (applied) | 18612960 | https://seatgeek.com/the-interrupters-tickets/silver-spring-maryland-the-fillmore-silver-spring-2027-04-02-7-pm/concert/18612960 | - |
| tm-vnv-nation-2027-detroit-vv1afzkuagkexq-mx | vnv-nation | verify (applied) | 18156403 | https://seatgeek.com/vnv-nation-tickets/detroit-michigan-saint-andrews-hall-2027-04-02-7-pm/concert/18156403 | - |
| tm-mercyme-2027-norfolk-z7r9jz1aaa4os | mercyme | verify (applied) | 18692250 | https://seatgeek.com/mercyme-tickets/norfolk-virginia-chartway-arena-2027-04-02-7-pm/concert/18692250 | - |
| tm-niall-horan-2027-montreal-17g8v0g61rtd60v | niall-horan | verify (applied) | 18235567 | https://seatgeek.com/niall-horan-tickets/montreal-canada-centre-bell-2027-04-02-7-30-pm/concert/18235567 | - |
| tm-warren-zeiders-2027-waukee-1ae7z_kgkdkgpa5 | warren-zeiders | verify (applied) | 18649743 | https://seatgeek.com/warren-zeiders-tickets/waukee-iowa-vibrant-music-hall-2027-04-02-7-pm/concert/18649743 | - |
| tm-nickelback-2027-saskatoon-16v7z_ff7g7wwtw | nickelback | verify (applied) | 18664632 | https://seatgeek.com/nickelback-tickets/saskatoon-canada-sasktel-centre-2027-04-02-6-30-pm/concert/18664632 | - |
| tm-jay-wheeler-2027-rosemont-vv178z_kgkbjdkxl | jay-wheeler | verify (applied) | 18649608 | https://seatgeek.com/jay-wheeler-tickets/rosemont-illinois-rosemont-theatre-2027-04-02-8-pm/concert/18649608 | - |
| tm-riley-green-2027-seattle-vvg1hz_keoq4yp | riley-green | verify (applied) | 18626514 | https://seatgeek.com/riley-green-tickets/seattle-washington-climate-pledge-arena-2027-04-02-7-pm/concert/18626514 | - |
| tm-melissa-etheridge-2027-knoxville-g5viz_p14c6_a | melissa-etheridge | verify (applied) | 18754448 | https://seatgeek.com/melissa-etheridge-tickets/knoxville-tennessee-tennessee-theatre-2027-04-07-7-30-pm/concert/18754448 | - |
| tm-alex-warren-2027-hollywood-vvg1vz_pwf7u4q | alex-warren | verify (applied) | 18773520 | https://seatgeek.com/alex-warren-tickets/hollywood-florida-hard-rock-live-hollywood-2027-04-09-7-30-pm/concert/18773520 | - |
| tm-melissa-etheridge-2027-danville-vv1avzk4pgkdw6bmt | melissa-etheridge | verify (applied) | 18754920 | https://seatgeek.com/melissa-etheridge-tickets/danville-virginia-the-pantheon-at-caesars-virginia-2027-04-09-9-pm/concert/18754920 | - |
| tm-alex-warren-2027-orlando-1aefz_pgkm4kktv | alex-warren | verify (applied) | 18773516 | https://seatgeek.com/alex-warren-tickets/orlando-florida-kia-center-2027-04-10-7-30-pm/concert/18773516 | - |
| tm-melissa-etheridge-2027-charleston-g5evz_pcyahcw | melissa-etheridge | verify (applied) | 18754417 | https://seatgeek.com/melissa-etheridge-tickets/charleston-south-carolina-charleston-music-hall-2027-04-11-8-pm/concert/18754417 | - |
| tm-alex-warren-2027-tampa-vvg1vz_prcolqy | alex-warren | verify (applied) | 18773518 | https://seatgeek.com/alex-warren-tickets/tampa-florida-benchmark-international-arena-2027-04-12-7-30-pm/concert/18773518 | - |
| tm-alex-warren-2027-jacksonville-1aefz_pgkwxdf59 | alex-warren | verify (applied) | 18773515 | https://seatgeek.com/alex-warren-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2027-04-13-7-30-pm/concert/18773515 | - |
| tm-josiah-queen-2027-worcester-vv1a8vpfygauucfi | josiah-queen | verify (applied) | 18574500 | https://seatgeek.com/josiah-queen-tickets/worcester-massachusetts-dcu-center-2027-04-15-7-pm/concert/18574500 | - |
| tm-niall-horan-2027-raleigh-g5evz_1r802la | niall-horan | verify (applied) | 18235538 | https://seatgeek.com/niall-horan-tickets/raleigh-north-carolina-lenovo-center-2027-04-15-7-30-pm/concert/18235538 | - |
| tm-jay-wheeler-2027-orlando-1axzk4vgkd6tfj5 | jay-wheeler | verify (applied) | 18649618 | https://seatgeek.com/jay-wheeler-tickets/orlando-florida-kia-center-2027-04-15-8-pm/concert/18649618 | - |
| tm-a-perfect-circle-2027-calgary-1av7z_kgkn55gda | a-perfect-circle | verify (applied) | 18632506 | https://seatgeek.com/a-perfect-circle-tickets/calgary-canada-scotiabank-saddledome-2027-04-15-7-30-pm/concert/18632506 | - |
| tm-carly-rae-jepsen-2027-edmonton-1av7z_kgklarlu8 | carly-rae-jepsen | verify (applied) | 18639050 | https://seatgeek.com/carly-rae-jepsen-tickets/edmonton-canada-northern-alberta-jubilee-auditorium-2027-04-15-7-30-pm/concert/18639050 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7uwkb | john-mayer | verify (applied) | 18626619 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-15-8-pm/concert/18626619 | - |
| tm-the-interrupters-2027-detroit-vv1afzkfxgkesf0dw | the-interrupters | verify (applied) | 18612691 | https://seatgeek.com/the-interrupters-tickets/detroit-michigan-the-fillmore-detroit-2027-04-16-6-pm/concert/18612691 | - |
| tm-josiah-queen-2027-hershey-vv1aezkf0gkdfm7yq | josiah-queen | verify (applied) | 18574510 | https://seatgeek.com/josiah-queen-tickets/hershey-pennsylvania-giant-center-2027-04-16-7-pm/concert/18574510 | - |
| tm-nothing-but-thieves-2027-philadelphia-vvg1fz_5qfmzvi | nothing-but-thieves | verify (applied) | 18266361 | https://seatgeek.com/nothing-but-thieves-tickets/philadelphia-pennsylvania-the-fillmore-philadelphia-2027-04-16-8-pm/concert/18266361 | - |
| tm-death-cab-for-cutie-2027-asheville-g5evz_3io8wkm | death-cab-for-cutie | verify (applied) | 18603768 | https://seatgeek.com/death-cab-for-cutie-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2027-04-16-8-pm/concert/18603768 | - |
| tm-fantasia-2027-jacksonville-1axzkfwgkeynp6z | fantasia | verify (applied) | 18629294 | https://seatgeek.com/fantasia-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2027-04-16-8-pm/concert/18629294 | - |
| tm-def-leppard-2027-north-little-rock-g5viz_f5gacpb | def-leppard | verify (applied) | 18662402 | https://seatgeek.com/def-leppard-tickets/north-little-rock-arkansas-simmons-bank-arena-2027-04-16-7-pm/concert/18662402 | - |
| tm-saint-levant-2027-miami-beach-vvg1vz_clijxyh | saint-levant | verify (applied) | 18384604 | https://seatgeek.com/saint-levant-tickets/miami-beach-florida-the-fillmore-miami-beach-at-jackie-gleason-theater-2027-04-16-8-pm/concert/18384604 | - |
| tm-the-psychedelic-furs-2027-charlotte-g5evz_ausriiu | the-psychedelic-furs | verify (applied) | 18592676 | https://seatgeek.com/the-psychedelic-furs-tickets/charlotte-north-carolina-the-fillmore-charlotte-2027-04-16-8-pm/concert/18592676 | - |
| tm-mei-semones-2027-houston-g5diz_kenctep | mei-semones | verify (applied) | 18638869 | https://seatgeek.com/mei-semones-tickets/houston-texas-white-oak-music-hall-upstairs-2027-04-16-7-pm/concert/18638869 | - |
| tm-los-tigres-del-norte-2027-atlantic-city-vv17fz_4gkmu5cz_ | los-tigres-del-norte | verify (applied) | 18738298 | https://seatgeek.com/los-tigres-del-norte-tickets/atlantic-city-new-jersey-hard-rock-live-at-etess-arena-2027-04-16-8-30-pm/concert/18738298 | - |
| tm-travis-tritt-2027-oxford-z7r9jz1a7jao6 | travis-tritt | verify (applied) | 18758661 | https://seatgeek.com/travis-tritt-tickets/oxford-alabama-oxford-performing-arts-center-2027-04-16-7-30-pm/concert/18758661 | - |
| tm-carly-rae-jepsen-2027-calgary-1av7z_kgkulm9f3 | carly-rae-jepsen | verify (applied) | 18639051 | https://seatgeek.com/carly-rae-jepsen-tickets/calgary-canada-grey-eagle-event-centre-2027-04-16-7-30-pm/concert/18639051 | - |
| tm-luke-combs-2027-detroit-vv1afzkf6gkesjjgl | luke-combs | verify (applied) | 18493404 | https://seatgeek.com/luke-combs-tickets/detroit-michigan-ford-field-2027-04-17-5-45-pm/concert/18493404 | - |
| tm-the-interrupters-2027-chicago-vv178z_ogkmzy5fz | the-interrupters | verify (applied) | 18612762 | https://seatgeek.com/the-interrupters-tickets/chicago-illinois-house-of-blues-chicago-2027-04-17-5-30-pm/concert/18612762 | - |
| tm-nothing-but-thieves-2027-brooklyn-k7vgf_5qzhcl7 | nothing-but-thieves | verify (applied) | 18266362 | https://seatgeek.com/nothing-but-thieves-tickets/brooklyn-new-york-brooklyn-paramount-2027-04-17-8-pm/concert/18266362 | - |
| tm-josiah-queen-2027-charlotte-g5evz_3r2npem | josiah-queen | verify (applied) | 18574511 | https://seatgeek.com/josiah-queen-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-04-17-7-pm/concert/18574511 | - |
| tm-niall-horan-2027-orlando-17fov0g61xk1ezu | niall-horan | verify (applied) | 18235541 | https://seatgeek.com/niall-horan-tickets/orlando-florida-kia-center-2027-04-17-7-30-pm/concert/18235541 | - |
| tm-the-psychedelic-furs-2027-asheville-g5evz_35jhjdg | the-psychedelic-furs | verify (applied) | 18592680 | https://seatgeek.com/the-psychedelic-furs-tickets/asheville-north-carolina-harrah-s-cherokee-center-asheville-2027-04-17-7-30-pm/concert/18592680 | - |
| tm-fantasia-2027-hollywood-vvg1vz_k9lsilt | fantasia | verify (applied) | 18631704 | https://seatgeek.com/fantasia-tickets/hollywood-florida-hard-rock-live-hollywood-2027-04-17-8-pm/concert/18631704 | - |
| tm-foy-vance-2027-chicago-rz7hnez1af7f-v | foy-vance | verify (applied) | 18368104 | https://seatgeek.com/foy-vance-tickets/chicago-illinois-thalia-hall-chicago-2027-04-17-7-pm/concert/18368104 | - |
| tm-calvin-harris-2027-hamilton-1a8zk4agkd5cdnl | calvin-harris | verify (applied) | 18674914 | https://seatgeek.com/calvin-harris-tickets/hamilton-canada-td-coliseum-2027-04-17-8-pm/concert/18674914 | - |
| tm-mercyme-2027-cedar-park-g5diz_fiumntg | mercyme | verify (applied) | 18692268 | https://seatgeek.com/mercyme-tickets/cedar-park-texas-h-e-b-center-at-cedar-park-2027-04-17-7-pm/concert/18692268 | - |
| tm-warren-zeiders-2027-chicago-vv1k8z_f1pg7v9f6 | warren-zeiders | verify (applied) | 18649755 | https://seatgeek.com/warren-zeiders-tickets/chicago-illinois-the-salt-shed-indoors-2027-04-17-7-pm/concert/18649755 | - |
| tm-a-perfect-circle-2027-edmonton-1aozkfygkey3iuu | a-perfect-circle | verify (applied) | 18632507 | https://seatgeek.com/a-perfect-circle-tickets/edmonton-canada-rogers-place-2027-04-17-7-30-pm/concert/18632507 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mukw | john-mayer | verify (applied) | 18626618 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-17-8-pm/concert/18626618 | - |
| tm-josiah-queen-2027-duluth-vvg1zz_3nnlvdz | josiah-queen | verify (applied) | 18574513 | https://seatgeek.com/josiah-queen-tickets/duluth-georgia-gas-south-arena-2027-04-18-7-pm/concert/18574513 | - |
| tm-lola-young-2027-detroit-vv1afzk4vgkdwfh0c | lola-young | verify (applied) | 18649711 | https://seatgeek.com/lola-young-tickets/detroit-michigan-the-fillmore-detroit-2027-04-18-8-pm/concert/18649711 | - |
| tm-mercyme-2027-bossier-city-g5viz_fdsgolb | mercyme | verify (applied) | 18692269 | https://seatgeek.com/mercyme-tickets/bossier-city-louisiana-brookshire-grocery-arena-2027-04-18-6-30-pm/concert/18692269 | - |
| tm-haiden-henderson-2027-charlotte-g5evz_k7koqsd | haiden-henderson | verify (applied) | 18613118 | https://seatgeek.com/haiden-henderson-tickets/charlotte-north-carolina-the-underground-at-the-fillmore-charlotte-2027-04-18-8-pm/concert/18613118 | - |
| tm-def-leppard-2027-fort-worth-vvg1yz_fhfmaat | def-leppard | verify (applied) | 18662404 | https://seatgeek.com/def-leppard-tickets/fort-worth-texas-dickies-arena-2027-04-18-7-pm/concert/18662404 | - |
| tm-saint-levant-2027-atlanta-vvg1zz_cjej40m | saint-levant | verify (applied) | 18386193 | https://seatgeek.com/saint-levant-tickets/atlanta-georgia-buckhead-theatre-2027-04-18-8-pm/concert/18386193 | - |
| tm-mat-kearney-2027-charlotte-g5evz_ftdyo7x | mat-kearney | verify (applied) | 18725925 | https://seatgeek.com/mat-kearney-tickets/charlotte-north-carolina-the-fillmore-charlotte-2027-04-18-8-pm/concert/18725925 | - |
| tm-the-warning-2027-phoenix-1av0z_3gkl3jytk | the-warning | verify (applied) | 18591375 | https://seatgeek.com/the-warning-tickets/phoenix-arizona-the-van-buren-2027-04-18-8-pm/concert/18591375 | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mukt | john-mayer | verify (applied) | 18626617 | https://seatgeek.com/john-mayer-tickets/las-vegas-nevada-sphere-2027-04-18-8-pm/concert/18626617 | - |
| tm-hazlett-2027-charlotte-g5evz_gmhpguu | hazlett | verify (applied) | 18311905 | https://seatgeek.com/hazlett-tickets/charlotte-north-carolina-neighborhood-theatre-2027-04-19-8-pm/concert/18311905 | - |
| tm-a-perfect-circle-2027-winnipeg-16v7z_kjkg7bgkj | a-perfect-circle | verify (applied) | 18632505 | https://seatgeek.com/a-perfect-circle-tickets/winnipeg-canada-canada-life-centre-2027-04-19-7-30-pm/concert/18632505 | - |
| tm-meshuggah-2027-salt-lake-city-g5vzz_4r3jsmh | meshuggah | verify (applied) | 18724672 | https://seatgeek.com/meshuggah-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2027-04-19-6-30-pm/concert/18724672 | - |
| tm-haiden-henderson-2027-washington-16vfz_kzng7lczd | haiden-henderson | verify (applied) | 18613187 | https://seatgeek.com/haiden-henderson-tickets/washington-district-of-columbia-the-atlantis-2027-04-20-6-30-pm/concert/18613187 | - |
| tm-ha-ash-2027-toronto-1a8zkfwgkedyh_t | ha-ash | verify (applied) | 18608865 | https://seatgeek.com/ha-ash-tickets/toronto-canada-meridian-hall-2027-04-20-8-pm/concert/18608865 | - |
| tm-def-leppard-2027-mobile-g5viz_fptcweu | def-leppard | verify (applied) | 18662407 | https://seatgeek.com/def-leppard-tickets/mobile-alabama-mobile-civic-center-arena-2027-04-20-7-pm/concert/18662407 | - |
| tm-saint-levant-2027-austin-g5diz_cxcz7mc | saint-levant | verify (applied) | 18386196 | https://seatgeek.com/saint-levant-tickets/austin-texas-stubb-s-waller-creek-amphitheater-2027-04-20-8-pm/concert/18386196 | - |
| tm-hazlett-2027-charlottesville-vvg17z_gcwfexc | hazlett | verify (applied) | 18311798 | https://seatgeek.com/hazlett-tickets/charlottesville-virginia-jefferson-theater-charlottesville-va-2027-04-20-8-pm/concert/18311798 | - |
| tm-sam-fender-2027-boston-vv1k7z_pbvg7sogy | sam-fender | verify (applied) | 18760793 | https://seatgeek.com/sam-fender-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-04-20-8-pm/concert/18760793 | - |
| tm-lola-young-2027-chicago-vv118z_f13zkq9 | lola-young | verify (applied) | 18649710 | https://seatgeek.com/lola-young-tickets/chicago-illinois-the-salt-shed-indoors-2027-04-20-7-30-pm/concert/18649710 | - |
| tm-the-interrupters-2027-minneapolis-vv17bz_3gkbzsymo | the-interrupters | verify (applied) | 18613147 | https://seatgeek.com/the-interrupters-tickets/minneapolis-minnesota-fillmore-minneapolis-2027-04-21-6-pm/concert/18613147 | - |
| tm-foy-vance-2027-toronto-1a8zkoogkd3hucs | foy-vance | verify (applied) | 18084267 | https://seatgeek.com/foy-vance-tickets/toronto-canada-the-danforth-music-hall-2027-04-21-7-pm/concert/18084267 | - |
| tm-nothing-but-thieves-2027-toronto-177zv0g65qu93gl | nothing-but-thieves | verify (applied) | 18266368 | https://seatgeek.com/nothing-but-thieves-tickets/toronto-canada-massey-hall-2027-04-21-8-pm/concert/18266368 | - |
| tm-lola-young-2027-chicago-vv1kvzvpoega5wbhb | lola-young | verify (applied) | 18662116 | https://seatgeek.com/lola-young-tickets/chicago-illinois-the-salt-shed-indoors-2027-04-21-7-30-pm/concert/18662116 | - |
| tm-saint-levant-2027-houston-g5diz_clj5bta | saint-levant | verify (applied) | 18386202 | https://seatgeek.com/saint-levant-tickets/houston-texas-bayou-music-center-2027-04-21-8-pm/concert/18386202 | - |
| tm-warren-zeiders-2027-philadelphia-vv17fz_kgkmdo0cj | warren-zeiders | verify (applied) | 18649760 | https://seatgeek.com/warren-zeiders-tickets/philadelphia-pennsylvania-the-met-philadelphia-2027-04-22-7-pm/concert/18649760 | - |
| tm-phoebe-bridgers-2027-tampa-vvg1vz_pnorv0s | phoebe-bridgers | verify (applied) | 18760643 | https://seatgeek.com/phoebe-bridgers-tickets/tampa-florida-benchmark-international-arena-2027-04-22-7-30-pm/concert/18760643 | - |
| tm-ha-ash-2027-indianapolis-vv1kv8vpg3ga1gw8k | ha-ash | verify (applied) | 18608840 | https://seatgeek.com/ha-ash-tickets/indianapolis-indiana-murat-theatre-at-old-national-centre-2027-04-22-8-pm/concert/18608840 | - |
| tm-haiden-henderson-2027-philadelphia-vv16ovpgt4oz75ua7 | haiden-henderson | verify (applied) | 18613099 | https://seatgeek.com/haiden-henderson-tickets/philadelphia-pennsylvania-brooklyn-bowl-philadelphia-2027-04-22-8-pm/concert/18613099 | - |
| tm-a-perfect-circle-2027-niagara-falls-1a8zkfmgkemh_mw | a-perfect-circle | verify (applied) | 18632509 | https://seatgeek.com/a-perfect-circle-tickets/niagara-falls-canada-olg-stage-at-fallsview-casino-2027-04-22-7-pm/concert/18632509 | - |
| tm-fontaines-d-c-2027-boston-vv1avzkfggkedloqr | fontaines-d-c | verify (applied) | 18658875 | https://seatgeek.com/fontaines-d-c-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-04-22-8-pm/concert/18658875 | - |
| tm-def-leppard-2027-wichita-vv1akzk4kgkexoysl | def-leppard | verify (applied) | 18662406 | https://seatgeek.com/def-leppard-tickets/wichita-kansas-intrust-bank-arena-2027-04-22-7-pm/concert/18662406 | - |
| tm-mercyme-2027-tulsa-1aezz_fgkbolkrk | mercyme | verify (applied) | 18692271 | https://seatgeek.com/mercyme-tickets/tulsa-oklahoma-bok-center-2027-04-22-7-pm/concert/18692271 | - |
| tm-mat-kearney-2027-washington-1a4zk49gkdhkrsu | mat-kearney | verify (applied) | 18726087 | https://seatgeek.com/mat-kearney-tickets/washington-district-of-columbia-lincoln-theatre-dc-2027-04-22-8-pm/concert/18726087 | - |
| tm-sam-fender-2027-new-york-g5dyz_pnxxsdo | sam-fender | verify (applied) | 18760794 | https://seatgeek.com/sam-fender-tickets/new-york-new-york-radio-city-music-hall-2027-04-22-8-pm/concert/18760794 | - |
| tm-saint-levant-2027-dallas-vvg1yz_cxxtz4x | saint-levant | verify (applied) | 18386201 | https://seatgeek.com/saint-levant-tickets/dallas-texas-south-side-ballroom-in-gilley-s-2027-04-22-8-pm/concert/18386201 | - |
| tm-carly-rae-jepsen-2027-inglewood-vv170z_kgkmkrrsm | carly-rae-jepsen | verify (applied) | 18639016 | https://seatgeek.com/carly-rae-jepsen-tickets/inglewood-california-kia-forum-2027-04-22-7-30-pm/concert/18639016 | - |
| tm-haiden-henderson-2027-new-york-k7vgf_k9pms1b | haiden-henderson | verify (applied) | 18612878 | https://seatgeek.com/haiden-henderson-tickets/new-york-new-york-irving-plaza-2027-04-23-7-pm/concert/18612878 | - |
| tm-the-neighbourhood-2027-philadelphia-1adzz_4gkl39a_b | the-neighbourhood | verify (applied) | 18726905 | https://seatgeek.com/the-neighbourhood-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2027-04-23-7-pm/concert/18726905 | - |
| tm-warren-zeiders-2027-pittsburgh-1apzk4vgkd7rttm | warren-zeiders | verify (applied) | 18649761 | https://seatgeek.com/warren-zeiders-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2027-04-23-7-pm/concert/18649761 | - |
| tm-the-psychedelic-furs-2027-baltimore-1avfz_ogktjo5z- | the-psychedelic-furs | verify (applied) | 18592681 | https://seatgeek.com/the-psychedelic-furs-tickets/baltimore-maryland-nevermore-hall-2027-04-23-8-pm/concert/18592681 | - |
| tm-josiah-queen-2027-hoffman-estates-vv1a7zkfigkdsnse_ | josiah-queen | verify (applied) | 18574515 | https://seatgeek.com/josiah-queen-tickets/hoffman-estates-illinois-now-arena-2027-04-23-7-pm/concert/18574515 | - |
| tm-a-perfect-circle-2027-niagara-falls-1a8zkfmgkemjazz | a-perfect-circle | verify (applied) | 18632508 | https://seatgeek.com/a-perfect-circle-tickets/niagara-falls-canada-olg-stage-at-fallsview-casino-2027-04-23-7-pm/concert/18632508 | - |
| tm-fontaines-d-c-2027-boston-vv1avzkfggkedosqi | fontaines-d-c | verify (applied) | 18642818 | https://seatgeek.com/fontaines-d-c-tickets/boston-massachusetts-mgm-music-hall-at-fenway-2027-04-23-8-pm/concert/18642818 | - |
| tm-hazlett-2027-washington-rz7hnez1afukvf | hazlett | verify (applied) | 18319949 | https://seatgeek.com/hazlett-tickets/washington-district-of-columbia-the-howard-theatre-2027-04-23-8-pm/concert/18319949 | - |
| tm-leon-bridges-2027-fort-worth-vvg1yz_f9mdndc | leon-bridges | verify (applied) | 18662691 | https://seatgeek.com/leon-bridges-tickets/fort-worth-texas-dickies-arena-2027-04-23-7-pm/concert/18662691 | - |
| tm-mercyme-2027-lincoln-vv17bz_fgktuaum7 | mercyme | verify (applied) | 18692274 | https://seatgeek.com/mercyme-tickets/lincoln-nebraska-pinnacle-bank-arena-2027-04-23-7-pm/concert/18692274 | - |
| tm-los-tigres-del-norte-2027-duluth-vvg1zz_fq51ps_ | los-tigres-del-norte | verify (applied) | 18738682 | https://seatgeek.com/los-tigres-del-norte-tickets/duluth-georgia-gas-south-arena-2027-04-23-8-pm/concert/18738682 | - |
| tm-mat-kearney-2027-atlantic-city-vv1aezk48gkd-q-0n | mat-kearney | verify (applied) | 18726580 | https://seatgeek.com/mat-kearney-tickets/atlantic-city-new-jersey-music-box-at-the-borgata-2027-04-23-8-pm/concert/18726580 | - |
| tm-the-warning-2027-seattle-vvg1hz_3rqncw_ | the-warning | verify (applied) | 18590298 | https://seatgeek.com/the-warning-tickets/seattle-washington-moore-theatre-seattle-2027-04-23-8-pm/concert/18590298 | - |
| tm-fantasia-2027-phoenix-1a_zkfmgke0qgen | fantasia | verify (applied) | 18629227 | https://seatgeek.com/fantasia-tickets/phoenix-arizona-mortgage-matchup-center-2027-04-23-8-pm/concert/18629227 | - |
| tm-haiden-henderson-2027-boston-vv1avzkfygkegtmcp | haiden-henderson | verify (applied) | 18613146 | https://seatgeek.com/haiden-henderson-tickets/boston-massachusetts-big-night-live-2027-04-24-6-pm/concert/18613146 | - |
| tm-fontaines-d-c-2027-philadelphia-vv17fz_kgks-xsxp | fontaines-d-c | verify (applied) | 18642821 | https://seatgeek.com/fontaines-d-c-tickets/philadelphia-pennsylvania-skyline-stage-at-the-mann-2027-04-24-7-pm/concert/18642821 | - |
| tm-foy-vance-2027-washington-rz7hnez1afab_f | foy-vance | verify (applied) | 18086032 | https://seatgeek.com/foy-vance-tickets/washington-district-of-columbia-the-howard-theatre-2027-04-24-7-pm/concert/18086032 | - |
| tm-the-neighbourhood-2027-boston-vv1avzk4_gkdekcqu | the-neighbourhood | verify (applied) | 18726904 | https://seatgeek.com/the-neighbourhood-tickets/boston-massachusetts-td-garden-2027-04-24-7-pm/concert/18726904 | - |
| tm-the-psychedelic-furs-2027-bethlehem-vv17fz_3gkmknapk | the-psychedelic-furs | verify (applied) | 18592683 | https://seatgeek.com/the-psychedelic-furs-tickets/bethlehem-pennsylvania-wind-creek-event-center-2027-04-24-8-pm/concert/18592683 | - |
| tm-warren-zeiders-2027-cincinnati-1avbz_kgkbydi6_ | warren-zeiders | verify (applied) | 18649764 | https://seatgeek.com/warren-zeiders-tickets/cincinnati-ohio-andrew-j-brady-music-center-2027-04-24-7-pm/concert/18649764 | - |
| tm-def-leppard-2027-lincoln-vv1akzk4vgkel3utc | def-leppard | verify (applied) | 18662408 | https://seatgeek.com/def-leppard-tickets/lincoln-nebraska-pinnacle-bank-arena-2027-04-24-7-pm/concert/18662408 | - |
| tm-mercyme-2027-moline-vv17bz_fgkwrzpms | mercyme | verify (applied) | 18692276 | https://seatgeek.com/mercyme-tickets/moline-illinois-vibrant-arena-at-the-mark-2027-04-24-7-pm/concert/18692276 | - |
| tm-los-tigres-del-norte-2027-charlotte-g5evz_fqspq1u | los-tigres-del-norte | verify (applied) | 18738300 | https://seatgeek.com/los-tigres-del-norte-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-04-24-8-pm/concert/18738300 | - |
| tm-the-interrupters-2027-salt-lake-city-g5vzz_3nsybuv | the-interrupters | verify (applied) | 18613135 | https://seatgeek.com/the-interrupters-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2027-04-24-6-30-pm/concert/18613135 | - |
| tm-calvin-harris-2027-fort-worth-vvg1yz_flvwxhm | calvin-harris | verify (applied) | 18674837 | https://seatgeek.com/calvin-harris-tickets/fort-worth-texas-ariat-arena-2027-04-24-8-pm/concert/18674837 | - |
| tm-mei-semones-2027-san-francisco-g5vyz_kyxockk | mei-semones | verify (applied) | 18637391 | https://seatgeek.com/mei-semones-tickets/san-francisco-california-castro-theatre-2027-04-24-8-pm/concert/18637391 | - |
| tm-mercyme-2027-grand-rapids-vv17oz_fgkmddfhb | mercyme | verify (applied) | 18692277 | https://seatgeek.com/mercyme-tickets/grand-rapids-michigan-van-andel-arena-2027-04-25-7-pm/concert/18692277 | - |
| tm-a-perfect-circle-2027-detroit-vv16fzkfma3zac8uka | a-perfect-circle | verify (applied) | 18632516 | https://seatgeek.com/a-perfect-circle-tickets/detroit-michigan-fox-theatre-detroit-2027-04-25-7-30-pm/concert/18632516 | - |
| tm-saint-levant-2027-denver-g5vzz_cl6uyod | saint-levant | verify (applied) | 18386203 | https://seatgeek.com/saint-levant-tickets/denver-colorado-summit-music-hall-denver-2027-04-25-8-pm/concert/18386203 | - |

## Skipped before API checks

| showId | artist | reason |
| --- | --- | --- |
| tm-morgan-wallen-2026-gainesville-2200635d19f97a46 | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-gainesville-2200635d1be07abe | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-denver-1e00635df7cf9add | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-denver-1e00635df7d99ae8 | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-pittsburgh-1600635c84ff1ead | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-pittsburgh-1600635d93d83472 | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-chicago-z7r9jz1a7qtbn | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-chicago-z7r9jz1a7qtba | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-clemson-z7r9jz1a7qtbd | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-clemson-z7r9jz1a7qtb7 | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-baltimore-z7r9jz1a7qtba2 | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-baltimore-z7r9jz1a7qtbk | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-ann-arbor-z7r9jz1a7qtbs | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morgan-wallen-2026-philadelphia-0200635da084a7a9 | morgan-wallen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b0064350404814e | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b006435046481aa | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b006435047f81c1 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b006435049481d0 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643504a381d8 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643504c881f8 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643504e38212 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643505178231 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b0064350525823a | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643505428256 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b006435054e8262 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643505888295 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643505aa82b9 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643505d182df | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643505dd82e6 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643505ee82f4 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b0064350690838a | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643506ae83a2 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643506bf83b6 | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643506cf83cb | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-harry-styles-2026-new-york-3b00643506da83de | harry-styles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-stanford-1c006429c95ea2b8 | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-stanford-1c006429c9dda300 | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-stanford-1c006435858268ec | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-las-vegas-17006429d233149a | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-las-vegas-17006429e3354a8c | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-las-vegas-17006429e3454a9e | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-las-vegas-17006429e3514ab0 | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-east-rutherford-00006429eb39bb6f | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-east-rutherford-00006429ed30bceb | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-foxborough-0100642cbd7ab56b | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-chicago-0400642acbbd5d44 | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-inglewood-0a006429ab3c5ef1 | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-inglewood-0a006429b1b363a4 | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-inglewood-0a006429b2cb6418 | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-oakland-1c00631913d14ad8 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-oakland-1c00631a8fc31891 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-oakland-1c00632490b77e47 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-los-angeles-2c00631bd2240c78 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-los-angeles-2c00631bd1f40c75 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-inglewood-09006319299f5deb | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-inglewood-090063192f945f68 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-inglewood-09006325c6486b2e | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-austin-3a00631b9ce923db | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-austin-3a00631b9e202403 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-austin-3a00631b9f022430 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-atlanta-0e00631a8e691e65 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-atlanta-0e00631a8f331ed1 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-atlanta-0e006325bea26298 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-brooklyn-30006319f49f4acd | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-montreal-31006319de3a2b37 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ariana-grande-2026-chicago-0400631adf313481 | ariana-grande | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jay-z-2026-bronx-1d006473d9d109cb | jay-z | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jay-z-2026-bronx-1d006473db760a7f | jay-z | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-hartford-z7r9jz1a706ep | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-hartford-z7r9jz1a70677 | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-pittsburgh-1avbz_agkm9w2rv | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-washington-1avfz_agkvqmncz | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-charlotte-g5evz_auyed-b | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-charlotte-g5evz_auyt5-g | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-chicago-vv178z_agkyetuoa | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-chicago-vv178z_agkmlebgy | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-boston-vv177z_agksbtqpc | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-boston-vvg17z_13s_x9k | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-montreal-1ad7z_agkmby4v9 | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-montreal-1ad7z_agkmbsav_ | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-toronto-1avzz_agkmwmykb | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-toronto-1avzz_agkvcvogj | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-columbus-vv17fz_agkmtn2ij | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-columbus-vv17fz_agkmtnri- | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-philadelphia-1adzz_agkmzlmmg | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-philadelphia-1adzz_agkmzoemy | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-atlanta-vvg1zz_auw2ij5 | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-orlando-1aefz_agkup8poj | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-orlando-1aefz_agkuwopdf | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-sunrise-z7r9jz1a7067f | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-olivia-rodrigo-2026-sunrise-z7r9jz1a7067o | olivia-rodrigo | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-east-rutherford-k7vgfbydolwcm | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-east-rutherford-k7vgfbydonw2z | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-pittsburgh-1avbzbygkuhq626 | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-philadelphia-vv1aezk8pgkdj_ywf | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-philadelphia-vv17fz_egkssn1i0 | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-foxborough-vv1a8vn0_ga221kn | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-tampa-vvg1vz_exa-kfw | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-new-orleans-g5vizbye_a_hw | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-miami-vvg1vz_ekc64hs | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-miami-vvg1vz_e-dkwj_ | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-san-antonio-g5dizbyc__upm | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-colorado-springs-z7r9jz1a7o9_a | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-inglewood-vvg1izbyqbb4mx | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-inglewood-vvg1iz_eheo7is | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-santa-clara-g5vyz_epx9ygn | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-santa-clara-g5vyz_eejsdnx | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-vancouver-16v7zbyrvg7dkhm | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-vancouver-1av7z_egkshvjex | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bruno-mars-2026-vancouver-1k78v0fjgacrkay | bruno-mars | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-inglewood-vv1aazkovgkdf4iwr | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-inglewood-vv1aazkovgkdf_jwm | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-palm-desert-vvg1iz_6abv7yw | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-san-jose-g5vyz_663mr7p | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-san-jose-g5vyz_6x6bktl | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-dallas-vvg1yz_6c939ia | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-atlanta-vvg1zz_66u4nyt | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-atlanta-vvg1zz_f6arur7 | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-miami-vvg1vz_6knubnj | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-miami-vvg1vz_6r8_upj | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-baltimore-1a4zkosgf76zecv | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-boston-vv177z_6gkrmuczn | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-newark-vv1aezkosgketdd_b | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-brooklyn-1ayzkosgkdghkeg | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-brooklyn-1adzz_6gktq1p0z | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-belmont-park-15dzz_619b3pj | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-glendale-z7r9jz1a7jm | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-nashville-z7r9jz1a7js | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-milwaukee-0700632fb5d7362c | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-chicago-04006331fcb85a8a | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-denver-1e006330c3b936ad | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-las-vegas-1700632f29ecabed | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-san-diego-0a006331da303659 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-seattle-0f00632ea04f19df | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-inglewood-0a006331dc273765 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-minneapolis-0600632e29196b3e | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-toronto-1000632fe9bb4345 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-toronto-1000632fe9c34349 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-detroit-0800632ca3272367 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-east-rutherford-00006331cc3a2a14 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-east-rutherford-00006331cecb2b77 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-philadelphia-02006331ed9c6125 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-foxborough-0100632fcae52e03 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-foxborough-01006331f67e74d9 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-indianapolis-050063299afd15f3 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-arlington-z7r9jz1a7jw | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-hollywood-0d006331a7d91aff | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-hollywood-0d006331f45e4089 | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ed-sheeran-2026-tampa-0d006331d60a3a7a | ed-sheeran | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-summer-walker-2026-dallas-vvg1yz_dphg_3m | summer-walker | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-summer-walker-2026-austin-g5diz_dpyyjel | summer-walker | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-summer-walker-2026-los-angeles-g5eyz_dpcrysi | summer-walker | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-summer-walker-2026-oakland-g5vyz_dptbovy | summer-walker | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-summer-walker-2026-seattle-vvg1hz_d9kqqkt | summer-walker | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-summer-walker-2026-vancouver-1f78v0uvf8z7g576 | summer-walker | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-madrid-z698xz2qz16ezdbsgk | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-madrid-z698xz2qz16ez94-rv | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-arlington-z7r9jz1a7ooui | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-arlington-z7r9jz1a7oout | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bts-2026-toronto-1avzz_egkicklrr | bts | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-marseille-z7r9jz1a7baxb | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-charli-xcx-2026-philadelphia-17gzv0g6gp0_67j | charli-xcx | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-charli-xcx-2026-brooklyn-17gzv0g6g9lbbzt | charli-xcx | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-charli-xcx-2026-washington-17a8v0g6gknsol1 | charli-xcx | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-charli-xcx-2026-san-diego-vvg1iz_gpnxmrx | charli-xcx | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-charli-xcx-2026-inglewood-vvg10z_g9gehi7 | charli-xcx | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rosalia-2026-oakland-g5vyzbumkyr1f | rosalia | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-summer-walker-2026-chicago-vvg18z_uroiect | summer-walker | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-brussels-z7r9jz1a7xzuo | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-bryan-2026-arlington-z7r9jz1a7r4vu | zach-bryan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-bryan-2026-glendale-z7r9jz1a7r4vt | zach-bryan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-bryan-2026-dover-z7r9jz1a7r4vz | zach-bryan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-bryan-2026-dover-z7r9jz1a7r4vj | zach-bryan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jelly-roll-2026-colorado-springs-z7r9jz1a7xfou | jelly-roll | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tame-impala-2026-minneapolis-z7r9jz1a7-f_m | tame-impala | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tame-impala-2026-houston-z7r9jz1a7-f_z | tame-impala | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tame-impala-2026-houston-z7r9jz1a7-a4m | tame-impala | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jay-z-2026-inglewood-vvg1iz_gntjqqm | jay-z | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-amsterdam-z698xzbpz1a9focb | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-amsterdam-z698xzbpz16vxbu8jy | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-barcelona-z698xz2qz16va-q_8k | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-munich-z698xzc2z1kaaofap | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-san-francisco-g5vyzbs0ua9tw | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-inglewood-vv170zbsgkihfzey | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-san-diego-vvg1izbsi8_kno | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-phoenix-1av0zbsgknh-n_z | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-houston-z7r9jz1a7js4g | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-miami-vvg1vzbs0fdfw5 | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-tampa-vvg1vzbslmpvjz | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-charlotte-g5evzbsemdalv | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-san-diego-z7r9jz1a7x8gw | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-glendale-z7r9jz1a7x8gy | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-oklahoma-city-z7r9jz1a7x8av | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-houston-z7r9jz1a7x8ae | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-atlanta-vvg1zz_fxet19l | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-sunrise-z7r9jz1a7x8vw | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-charlotte-g5evz_fneqevn | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-nashville-g5viz_fja3nq8 | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-saint-louis-vv1akzk3fgkey5tam | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-kansas-city-vv1kbz_fjfg7wetj | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-minneapolis-vv1akzk3agkeivme6 | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-milwaukee-vv1a6zk3fgkdlouyw | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-columbus-vv1kv8v0xbga57f2- | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-washington-1a4zk3vgkd85lni | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-cleveland-z7r9jz1a7xav7 | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-toronto-1a8zk36gkdv1i_l | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sombr-2026-boston-vv1avzk36gkdfnkex | sombr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-chicago-z7r9jz1aazo4o | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-champaign-z7r9jz1a70ijb | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-hamilton-177zv0g65247nfx | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-toronto-177zv0g65ctmbsj | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-boston-vvg17z_51ivlnd | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-university-park-vvg1fz_55aanmw | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-houston-z7r9jz1a70t74 | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-columbus-vvg1fz_52gqiba | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-atlanta-vvg1zz_527ymui | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazgb_ | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazm40 | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-karol-g-2026-arlington-z7r9jz1a7xfrb | karol-g | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-my-chemical-romance-2026-singapore-z7r9jz1a7oup6 | my-chemical-romance | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-kansas-city-z7r9jz1a70v1a | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-saint-paul-z7r9jz1a7xf0u | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-orlando-1aefz_fgkd1sjat | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-sunrise-z7r9jz1a70v8i | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-houston-z7r9jz1a7x4fs | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-austin-g5diz_fxgrqaf | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-fort-worth-vvg1yz_flxlbcf | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-salt-lake-city-z7r9jz1a7x_ag | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-portland-vvg1hz_fbodkr9 | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-sacramento-g5vyz_fmsnbtg | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-san-diego-z7r9jz1a7xpf- | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-las-vegas-z7r9jz1a7xpfb | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-phoenix-1av0z_fgkbna4b9 | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-hartford-z7r9jz1a70eoa | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-san-antonio-g5diz_1dg8uln | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-houston-z7r9jz1a70e_w | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-ontario-vvg10z_1tpplao | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-las-vegas-z7r9jz1a70eqs | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-salt-lake-city-z7r9jz1a70efv | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-san-jose-g5vyz_1mqembe | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-phoenix-17k8v0g61tfaez1 | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-abilene-z7r9jz1a7-v0n | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-lubbock-z7r9jz1a70v8t | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-tulsa-z7r9jz1a7-v0_ | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-wichita-z7r9jz1a7-v0p | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-milwaukee-z7r9jz1a7-v04 | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-grand-rapids-vv1kezv0_8ga1aqp6 | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-detroit-vv17oz_kgkmvfl46 | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-toronto-1avzz_kgkvawuqh | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-portland-vv177z_kgkuvxsds | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-albany-z7r9jz1a7-v0o | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-cleveland-z7r9jz1a7-z0p | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-nashville-vv1aazkosgkezrhqm | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-north-tonawanda-z7r9jz1aazwby | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-boston-vv177z_kgkw31n77 | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-philadelphia-vv1aezkowgkdcmrr7 | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-jacksonville-z7r9jz1a7-v03 | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-clearwater-z7r9jz1a7-v0f | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-pentatonix-2026-tacoma-vvg1hz_2zdlw0j | pentatonix | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-pentatonix-2026-bozeman-z7r9jz1aaz-xz | pentatonix | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-pentatonix-2026-casper-g5vzz_2uvfg47 | pentatonix | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-pentatonix-2026-grand-rapids-vvg1oz_2h1hwe2 | pentatonix | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-pentatonix-2026-louisville-1apzkf7gker9zih | pentatonix | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-pentatonix-2026-buffalo-k7vgf_8kru5hf | pentatonix | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-pentatonix-2026-cleveland-z7r9jz1aazofo | pentatonix | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-forest-brussels-z698xzg2z16vrkgpa9 | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-dusseldorf-z698xzc2z16vq4jjgn | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-berlin-z698xzc2z16vfognfa | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-wheatland-g5vyz_2qphiow | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-san-francisco-g5vyz_2fimqin | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-vancouver-1778v0g62hxtorg | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-seattle-vvg1hz_2qgz489 | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-atlanta-z7r9jz1aazdby | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-louisville-z7r9jz1aazdbs | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-grand-rapids-vvg1oz_cnishwh | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-silver-spring-17a8v0g6cngp9y6 | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-new-haven-z7r9jz1aazdbw | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-new-york-z7r9jz1aazdbs | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-philadelphia-z7r9jz1aazdbv | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-worcester-z7r9jz1aazdbg | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-laval-17g8v0g6cubsshb | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-toronto-177zv0g62er1iat | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trivium-2026-royal-oak-z7r9jz1aazdbu | trivium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sabaton-2026-vancouver-z7r9jz1a7-ojs | sabaton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-oberhausen-z698xzc2z16v0vue-v | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-hannover-z698xzc2z16vcpokjv | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-berlin-z698xzc2z16vovkbjo | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-boston-vvg17z_1njiezr | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-new-york-k7vgf_1s1uowe | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-philadelphia-z7r9jz1a70tke | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-national-harbor-17a8v0g61vjcef3 | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-pittsburgh-z7r9jz1a70t36 | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-oberhausen-z698xzc2z16voyj3up | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-san-francisco-z7r9jz1a70epk | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-west-hollywood-z7r9jz1a70e4e | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-los-angeles-z7r9jz1a70sod | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-phoenix-z7r9jz1a70tgw | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-houston-g5diz_1ymrkkp | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-atlanta-vvg1zz_1byaqd- | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-new-york-z7r9jz1a7pg08 | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-new-york-k7vgf_1dgeulr | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-boston-z7r9jz1a70eoz | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tobymac-2026-columbia-vvg1bz_1xth3vu | tobymac | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tobymac-2026-cleveland-vvg1fz_1raogqa | tobymac | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tobymac-2026-greensboro-g5evz_1nayk4t | tobymac | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7-zq4 | andrea-bocelli | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7oy3p | andrea-bocelli | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-phoenix-z7r9jz1aaziv4 | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-san-diego-vvg1iz_8m2p9ef | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-salt-lake-city-z7r9jz1aazivp | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-denver-g5vzz_8l-vdn4 | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-detroit-z7r9jz1aaziv8 | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-seattle-z7r9jz1a7jfoo | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-portland-z7r9jz1a7jfov | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-san-luis-obispo-z7r9jz1a7jfbx | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-aspen-z7r9jz1a7jfoj | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-boulder-z7r9jz1a7jffk | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-boston-z7r9jz1a7j4zs | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-chicago-vvg18z_c6jmind | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-minneapolis-z7r9jz1a7j3xd | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-milwaukee-z7r9jz1aazyfa | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-lexington-17aov0g6cdozqjd | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-atlanta-z7r9jz1a7pf-y | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-philadelphia-z7r9jz1a7pxvf | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-milwaukee-z7r9jz1a7pfos | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-minneapolis-z7r9jz1a7pfoy | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blondshell-2026-portland-z7r9jz1a70e_4 | blondshell | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-salt-lake-city-z7r9jz1aav-qo | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-trans-siberian-orchestra-2026-green-bay-z7r9jz1aavxjs | trans-siberian-orchestra | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-death-cab-for-cutie-2026-brussels-z698xzg2z1ayvwax | death-cab-for-cutie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-riverside-vvg1iz_cbbunjv | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-latto-2026-las-vegas-g5ezz_khrbusj | latto | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-las-vegas-z7r9jz1a7xbfk | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-nashville-z7r9jz1a7pkok | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-new-york-k7vgf_uedf3n_ | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-montreal-17g8v0g6gp5n0pn | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-toronto-177zv0g6g9hzrkw | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-chicago-z7r9jz1a7pxq8 | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-minneapolis-z7r9jz1a7pko4 | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-englewood-z7r9jz1a7p-ji | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-seattle-z7r9jz1a7pxzs | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-vancouver-z7r9jz1a7pk0e | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-vancouver-z7r9jz1a7pa4e | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-portland-z7r9jz1a7p-q3 | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-los-angeles-vvg10z_gpwxv_j | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-los-angeles-vvg10z_udz2l-k | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-denver-z7r9jz1a7pobe | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-denver-z7r9jz1a7pk4i | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-vancouver-z7r9jz1a7p87i | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-portland-z7r9jz1a7p8vw | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-oakland-g5vyz_gfww-6g | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-san-diego-vvg1iz_gcici-d | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-phoenix-17k8v0g6g538qi9 | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-los-angeles-vvg10z_gcgtrwf | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-los-angeles-vvg10z_gpovtcx | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-malcolm-todd-2026-los-angeles-vvg10z_gpomy2y | malcolm-todd | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-solana-beach-z7r9jz1a7puxp | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-menlo-park-z7r9jz1aazmfs | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-portland-z7r9jz1a7pu-m | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-seattle-vvg1hz_ul9nqcx | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-salt-lake-city-z7r9jz1a7pmzv | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-denver-z7r9jz1a7pu0p | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-houston-g5diz_uj-6tws | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-san-antonio-z7r9jz1a7j7j_ | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dinosaur-jr-2026-new-orleans-z7r9jz1a7pu-o | dinosaur-jr | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-charli-xcx-2026-las-vegas-z7r9jz1a7p8v- | charli-xcx | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-las-vegas-z7r9jz1a7js4u | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfc4w | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfc4g | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1fayv048rvz72a6e | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1fayv048rvz72a6k | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1fayv048rez72a62 | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1fayv048rez72afa | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-five-finger-death-punch-2026-huntsville-z7r9jz1a7ooob | five-finger-death-punch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sabaton-2026-loveland-z7r9jz1a7-ojz | sabaton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-san-francisco-z7r9jz1aazja_ | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7pajj | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7paje | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foy-vance-2026-los-angeles-z7r9jz1a7-9fp | foy-vance | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foy-vance-2026-los-angeles-z7r9jz1a7--kd | foy-vance | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foy-vance-2026-portland-z7r9jz1aavffz | foy-vance | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foy-vance-2026-seattle-vvg1hz_7scn270 | foy-vance | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foy-vance-2026-boise-g5vzz_akyqnb8 | foy-vance | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tommy-emmanuel-2026-anchorage-z7r9jz1a7pdjf | tommy-emmanuel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-scott-2026-dallas-z7r9jz1aavsep | dylan-scott | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-san-francisco-g5vyz_gntwbu0 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-seattle-z7r9jz1a70p_0 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-vancouver-1av7z_agkmsrf76 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-detroit-vv1afzk39gkeeybaa | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-toronto-1avzz_agki7dtkh | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-ottawa-1ad7z_agkivxxic | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-brooklyn-k7vgf_ad7j_qa | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-philadelphia-vv17fz_agkycvjx3 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-washington-1avfz_agkmvpzjt | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-atlanta-z7r9jz1a70p_n | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-new-orleans-g5viz_aeqhsnh | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-dallas-vvg1yz_161iqqj | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-grand-rapids-z7r9jz1a70vjk | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-savannah-vvg1zz_fxgmnus | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-greenville-g5evz_a5lvwt0 | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-nashville-g5vizbum8x11w | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-nashville-g5vizbubiwctj | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-knoxville-g5viz_ae91dt_ | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-birmingham-1aozk38gkdpv4cc | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-baton-rouge-z7r9jz1a70vj6 | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-bossier-city-z7r9jz1a70vjf | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-jonesboro-g5viz_f5t3whv | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-atlanta-vvg1zz_7rkxyy- | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-beverly-z7r9jz1a7pyjj | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-florence-17aov0g6gj3vrxt | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-greensburg-z7r9jz1aazman | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-wheeling-z7r9jz1aav9u8 | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-nashville-vvg1fz_gmyo5fy | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-la-vista-17fzv0g6gnabvqc | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-des-moines-vvg1bz_gwkrfot | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-kansas-city-vvg1bz_gsftuwt | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-oklahoma-city-z7r9jz1a7px8p | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-las-vegas-z7r9jz1a7pxak | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-napa-g5vyz_gnjfn19 | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-anaheim-vvg10z_grix-n9 | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-tucson-z7r9jz1a7pxk_ | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-san-antonio-g5diz_gsupj1v | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foy-vance-2026-san-francisco-z7r9jz1aae4_v | foy-vance | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-too-many-zooz-2026-buffalo-z7r9jz1aav60y | too-many-zooz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-madrid-z698xz2qz1k__7ko4 | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-barcelona-z698xz2qz16vvp4sps | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-riley-green-2026-nashville-z7r9jz1aaekfy | riley-green | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-hamburg-z698xzc2z1ka-fjkp | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-berlin-z698xzc2z16vvx0w-e | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-madrid-z698xz2qz16evp_eqp | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-san-francisco-g5vyzbgd1f1iu | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-inglewood-vv170zbggkzetq9z | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-atlanta-vvg1zz_73eik7i | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-orlando-1axzkoogkembvjl | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-kansas-city-vv17bz_7gkr3ru0p | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-chicago-vv1a7zkoagkdxvkbx | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-staind-2026-phoenix-1av0z_dgku63v-5 | staind | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-staind-2026-albuquerque-g5vzz_dsirnej | staind | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-gossett-2026-waco-z7r9jz1a7jdak | dylan-gossett | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-gossett-2026-pittsburgh-17aov0g6u5ijrxe | dylan-gossett | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-gossett-2026-apopka-z7r9jz1a7ps7y | dylan-gossett | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-pamplona-iruna-z698xz2qz16voojza6 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sienna-spiro-2026-salt-lake-city-z7r9jz1aaef49 | sienna-spiro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-def-leppard-2026-hollywood-vvg1vz_5sqbrak | def-leppard | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-seattle-z7r9jz1a70u7s | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-portland-z7r9jz1a70i8e | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-san-francisco-z7r9jz1a70i80 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-los-angeles-z7r9jz1a70uao | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-los-angeles-z7r9jz1a70ua4 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-tucson-z7r9jz1a70ioy | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-dallas-vvg1yz_1tobhle | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-houston-g5diz_1ucylhw | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-nashville-g5viz_1mfi-bc | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-atlanta-vvg1zz_1d2p0tb | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-washington-17a8v0g61sa7y8c | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-new-york-z7r9jz1a70u7_ | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-brooklyn-z7r9jz1a70uez | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-boston-vvg17z_1mkpkh2 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-providence-z7r9jz1a7p0b9 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-toronto-177zv0g659n9upv | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-oslo-z698xzb_z16v-8-pb8 | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sabaton-2026-houston-g5dizbwlrp709 | sabaton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sabaton-2026-san-antonio-z7r9jz1a7jk4v | sabaton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sabaton-2026-phoenix-1av0zbwgkrn_kuq | sabaton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fkj-2026-k-benhavn-v-z698xzc4z16vvpef0i | fkj | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fkj-2026-praha-1-z698xzu0z16v7kp8r6 | fkj | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-rocklin-z7r9jz1a7--1k | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-napa-g5vyz_aulujn5 | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-menlo-park-z7r9jz1a7p90y | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-menlo-park-z7r9jz1a7p9pd | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-fresno-g5vyz_aupip7f | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-del-mar-vvg1iz_a3sju3n | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-san-luis-obispo-z7r9jz1a7-o8k | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-phoenix-z7r9jz1a70kx4 | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-josiah-queen-2026-westlake-village-rz7hnez1afuekf | josiah-queen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-josiah-queen-2026-trinity-rz7hnez1afuea0 | josiah-queen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-too-many-zooz-2026-ottawa-rz7hnez1af1e8f | too-many-zooz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-phoenix-rz7hnez1afk4vf | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-praha-7-z698xzu0z16vouudjv | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-oslo-z698xzb_z16vftpojp | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-warren-zeiders-2026-oslo-z698xzb_z16v4v_kce | warren-zeiders | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-columbus-vvg1fz_u68l-x- | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-brooklyn-17gzv0g6uz2i9rf | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-brooklyn-17gzv0g6uhl8aq4 | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-charlotte-g5evz_uk3_hwq | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-orlando-17fov0g6uhspnas | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-sunrise-z7r9jz1a7ppag | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-sunrise-z7r9jz1aazfq4 | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-atlanta-vvg1zz_uzryhlw | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-austin-g5diz_6rfioeh | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-new-orleans-g5viz_6roljgm | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-atlanta-vvg1zz_6rspgk8 | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-uicideboy-2026-sunrise-z7r9jz1a7xzpd | uicideboy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-charlotte-g5evz_83vdq5d | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-miami-vvg1vz_8pw-pfe | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-tampa-vvg1vz_8uxpnex | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-atlanta-vvg1zz_2x4siub | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-atlanta-vvg1zz_83dtnfh | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-nashville-g5viz_2xpzbxl | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-irving-vvg1yz_8n-3vdr | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-austin-g5diz_8pb91k2 | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-sugar-land-z7r9jz1aazj8f | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-morrison-z7r9jz1aazj84 | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-steve-lacy-2026-las-vegas-169zkfdovza26a51 | steve-lacy | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-madison-z7r9jz1a700fm | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-saint-paul-z7r9jz1a70xpt | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-oklahoma-city-vvg1yz_1hjjehy | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-denver-g5vzz_1xqviwv | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-salt-lake-city-z7r9jz1a70x_g | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-las-vegas-z7r9jz1a70x-e | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-calgary-1778v0g61djnfzx | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-vancouver-1778v0g61badswr | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-san-jose-g5vyz_1dhcziz | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-phoenix-17k8v0g61xa1k9d | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-inglewood-vvg10z_1t5e4o_ | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-bakersfield-z7r9jz1aazpuu | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-bakersfield-z7r9jz1aavaxk | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-fresno-g5vyz_89-ysvr | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-fresno-g5vyz_8kys-gg | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-west-valley-city-g5vzz_8qlaba8 | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-morrison-z7r9jz1aazpuz | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-morrison-z7r9jz1aazt0f | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-eagles-2026-las-vegas-1a9zk37gkdxvozi | eagles | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-biloxi-g5viz_19l6he3 | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-birmingham-17fzv0g61p_lkay | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-sunrise-z7r9jz1a70_73 | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-atlanta-vvg1zz_1p_clel | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-nashville-g5viz_141b_9f | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-louisville-z7r9jz1a70f_w | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-baltimore-17a8v0g61kp2ris | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-newark-vvg1fz_197dnkr | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-philadelphia-17gzv0g61p0-ppk | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-providence-vvg17z_1fuwpyc | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-detroit-vvg1oz_13slngw | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-toronto-177zv0g6110gajo | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-wilkes-barre-z7r9jz1a70abw | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-uniondale-k7vgf_1ka_zph | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-boston-vvg17z_19ipadt | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-cleveland-z7r9jz1a70_7k | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-saint-louis-vvg1bz_1qqkifj | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-journey-2026-houston-z7r9jz1a70_fz | journey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-leon-bridges-2026-miami-z7r9jz1aaeaqz | leon-bridges | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lionel-richie-2026-las-vegas-17ayv0g62k5zuj3 | lionel-richie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lionel-richie-2026-las-vegas-17ayv0g62k5zcj9 | lionel-richie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlk3fc | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlfwft | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlawfd | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlge4b | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlu34n | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlc34z | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdl23po | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-santana-2026-las-vegas-17ayv0g6ck1cz73 | santana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-santana-2026-las-vegas-17ayv0g6ck18f79 | santana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-santana-2026-las-vegas-17ayv0g6ck1oi7r | santana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-santana-2026-las-vegas-17ayv0g6ck1fb7i | santana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-austin-g5diz_ar2gvot | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-fort-worth-vvg1yz_dxo-e0o | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-denver-g5vzz_amqia8m | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-salt-lake-city-z7r9jz1a7-9ai | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-inglewood-vv170z_agkmi0jmt | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-san-diego-vvg1iz_ai_rrcv | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-oakland-g5vyz_allhhol | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-portland-vvg1hz_anwqdfp | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gorillaz-2026-seattle-vvg1hz_aeloqv3 | gorillaz | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-houston-z7r9jz1a7-mum | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-austin-g5diz_kmlrxx1 | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-san-diego-vvg1iz_kucq_7i | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-las-vegas-z7r9jz1a7-muy | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-weezer-2026-los-angeles-g5eyz_ku9s8xi | weezer | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ella-langley-2026-des-moines-z7r9jz1a7pwkk | ella-langley | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ella-langley-2026-lincoln-vvg1bz_u6bp0me | ella-langley | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ella-langley-2026-saint-paul-z7r9jz1a7ppo7 | ella-langley | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mana-2026-portland-vvg1hzbmka2ayz | mana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mana-2026-rosemont-vv167zkuuokza2adc5 | mana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mana-2026-houston-z7r9jz1a7rbk4 | mana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mana-2026-austin-g5dizbmoaqckm | mana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-cleveland-z7r9jz1aazw4y | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-rosemont-vv178z_8gkymmwt7 | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-toronto-1avzz_ogkui9hto | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-pittsburgh-1avbz_8gky0yxyy | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-saint-paul-z7r9jz1aazwba | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-kansas-city-vv17bz_8gkbffbsf | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-nashville-g5viz_8vksnah | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-houston-z7r9jz1aavxjk | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-austin-g5diz_8vesk58 | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-valencia-z698xz2qz1aofa18 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-sevilla-z698xz2qz16vb7goa0 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-madrid-z698xz2qz1kv97no3 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-madrid-z698xz2qz16vao-oox | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-madrid-z698xz2qz16v0v0ypz | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ye-2026-houston-g5diz_osqzjfe | ye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ye-2026-arlington-z7r9jz1aav0vv | ye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kevin-gates-2026-nashville-g5viz_kuq0g54 | kevin-gates | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-boston-z7r9jz1a7pwfs | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-boston-z7r9jz1a7ps_m | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-newport-z7r9jz1aaz_o7 | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-atlanta-z7r9jz1a7pyrk | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-hollywood-vvg1vz_gl6rgiu | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-independence-vvg1bz_uefy4ji | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-grand-prairie-z7r9jz1a7pijy | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-denver-z7r9jz1a7ptjo | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-las-vegas-z7r9jz1a7jdfs | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-san-francisco-g5vyz_ghzwhnz | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-los-angeles-z7r9jz1a70kau | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-los-angeles-z7r9jz1a70kag | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-oakland-z7r9jz1a70kkf | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-seattle-vvg1hz_al3e8eo | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kacey-musgraves-2026-seattle-vvg1hz_awrtnmb | kacey-musgraves | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-nashville-z7r9jz1a7pd4s | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-kansas-city-vvg1bz_5nc5gbq | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-mesa-z7r9jz1a70yjo | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-los-angeles-z7r9jz1a70yjs | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-san-diego-vvg1iz_5_l1ogs | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-salt-lake-city-g5vzz_53unjyf | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-denver-g5vzz_5nhwfmo | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-knocked-loose-2026-austin-g5diz_5qpgquo | knocked-loose | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-chris-stapleton-2026-lincoln-vv1akzk8pgkdqln9v | chris-stapleton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-phoebe-bridgers-2026-salt-lake-city-z7r9jz1a7pa_0 | phoebe-bridgers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bryson-tiller-2026-portland-vvg1hz_5po9bdo | bryson-tiller | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-fairfax-17a8v0g61uycyrn | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-wallingford-g5vvz_197pihv | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-philadelphia-vvg1fz_1skmms5 | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-boston-vvg17z_1mzt4ek | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-rosemont-vvg18z_1u8np3l | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-houston-g5diz_53je_pf | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-arcangel-2026-denver-g5vzz_1bwrqu_ | arcangel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-garth-brooks-2026-tulsa-1aozkfugkd8c0en | garth-brooks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-garth-brooks-2026-tulsa-1aozkfugkdlv4l0 | garth-brooks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-garth-brooks-2026-tulsa-1aozkfugkdlmpx_ | garth-brooks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-garth-brooks-2026-seattle-vvg1hz_fstanbp | garth-brooks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-madrid-z698xz2qz16vqfvsuz | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stevie-wonder-2026-fornebu-z698xzb_z1k03fkoa | stevie-wonder | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stevie-wonder-2026-stockholm-z698xzq2z16vqozokb | stevie-wonder | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stevie-wonder-2026-hannover-z698xzc2z16v78zovo | stevie-wonder | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stevie-wonder-2026-amsterdam-z698xzbpz16vcpofak | stevie-wonder | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lil-wayne-2026-knoxville-g5viz_kqar_ob | lil-wayne | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lil-wayne-2026-greenville-g5evz_6d5sngf | lil-wayne | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tom-jones-2026-las-vegas-17ayv0g61xuaqyn | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tom-jones-2026-las-vegas-17ayv0g61xukqbd | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tom-jones-2026-las-vegas-17ayv0g61xu61b0 | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tom-jones-2026-los-angeles-vvg10z_58xadko | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tom-jones-2026-highland-z7r9jz1a7p6r4 | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tom-jones-2026-wheatland-g5vyz_1uw3ukc | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-a-boogie-wit-da-hoodie-2026-belmont-park-1adzz_8gkuljdyg | a-boogie-wit-da-hoodie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-a-boogie-wit-da-hoodie-2026-belmont-park-17gzv0g6ctu4ij2 | a-boogie-wit-da-hoodie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-a-boogie-wit-da-hoodie-2026-boston-vv1a8vpgbgauu_ra | a-boogie-wit-da-hoodie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-a-boogie-wit-da-hoodie-2026-philadelphia-vv1aezkfygkeinqmd | a-boogie-wit-da-hoodie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-lafayette-g5viz_52-gfk2 | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-rogers-g5viz_5ulwxbq | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-duluth-vvg1zz_5pbvq93 | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-nashville-g5viz_g6sznnj | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-belmont-park-17gzv0g61mqcddn | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-montreal-17g8v0g61xoe95k | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-hamilton-177zv0g61i6mwwe | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-chicago-vvg18z_1mip6i3 | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-dallas-vvg1yz_1jrlmao | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-las-vegas-z7r9jz1a70ouv | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ricky-martin-2026-thackerville-z7r9jz1a7jax9 | ricky-martin | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ricky-martin-2026-las-vegas-17ayv0g6ubm5h5l | ricky-martin | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ricky-martin-2026-las-vegas-17ayv0g6ubmuh5y | ricky-martin | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ricky-martin-2026-temecula-vvg1iz_g21wliz | ricky-martin | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ty-myers-2026-pikeville-1apzkovgkdxnmip | ty-myers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-dallas-vvg1yz_1thoo6h | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-maryland-heights-vvg1bz_1udxnrk | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-denver-g5vzz_1dezhf3 | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-salt-lake-city-z7r9jz1a70jp0 | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-phoenix-17k8v0g61dxzizm | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-mountain-view-g5vyz_1wl9ah6 | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-inglewood-vvg10z_ucyohlw | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-san-diego-vvg1iz_u3myfkf | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-oakland-g5vyz_ufp_rvl | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-vancouver-1778v0g6u5paqr- | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-seattle-vvg1hz_u_uadg3 | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-greenwich-z7r9jz1a7ps_a | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dave-matthews-band-2026-madison-z7r9jz1aazj8x | dave-matthews-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dave-matthews-band-2026-chicago-vvg18z_cde9wdz | dave-matthews-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dave-matthews-band-2026-baltimore-1ka8vpevgauw1qw | dave-matthews-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dave-matthews-band-2026-new-york-g5diz_2njdtfa | dave-matthews-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-garth-brooks-2026-seattle-vvg1hz_4dkzhpm | garth-brooks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-los-tigres-del-norte-2026-glendale-1fk8v0p7atz785ae | los-tigres-del-norte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-los-tigres-del-norte-2026-san-diego-z7r9jz1a7-p4f | los-tigres-del-norte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-los-tigres-del-norte-2026-columbus-z7r9jz1a7ofo9 | los-tigres-del-norte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-chicks-2026-seattle-vvg1hz_52n3-el | the-chicks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-chicks-2026-san-francisco-g5vyz_5k9t5fo | the-chicks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-chicks-2026-san-francisco-g5vyz_5kbz5fl | the-chicks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-chicks-2026-hollywood-vvg10z_5rao7bc | the-chicks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-san-antonio-g5diz_f5slxer | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-houston-z7r9jz1a7x73v | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-miami-vvg1vz_fchiqhv | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-orlando-1axzk3dgkeha7uv | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-atlanta-vvg1zz_f1gfmts | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-charlotte-g5evz_fffmq2n | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-philadelphia-1ayzk3egkdcdzmm | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-young-miko-2026-brooklyn-16dzz_f13g7dsys | young-miko | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zac-brown-band-2026-minneapolis-z7r9jz1a7owqo | zac-brown-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zac-brown-band-2026-sioux-falls-z7r9jz1a7owq_ | zac-brown-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zac-brown-band-2026-buffalo-k7vgf_dh65dyo | zac-brown-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zac-brown-band-2026-des-moines-z7r9jz1a7osk3 | zac-brown-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-grand-rapids-vvg1oz_gxwrjxj | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-pittsburgh-z7r9jz1a7p_ae | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-royal-oak-z7r9jz1a7p_ad | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-montreal-17g8v0g6gxey070 | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-ottawa-17g8v0g6gwupswm | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-toronto-177zv0g6gwdvb1r | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-boston-vvg17z_gmbz9_j | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-sayreville-z7r9jz1a7p_a7 | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-new-york-k7vgf_gnebmkt | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-baltimore-17a8v0g6gxtb5eg | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-charlotte-g5evz_gnuzybg | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-atlanta-z7r9jz1a7p_aa | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-chayanne-2026-miami-vvg1vz_kt0yodw | chayanne | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-chayanne-2026-tampa-vvg1vz_km8pku0 | chayanne | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-chayanne-2026-orlando-1aefz_kgkwoqkla | chayanne | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-cece-winans-2026-duluth-vvg1zz_a3epgc8 | cece-winans | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-cece-winans-2026-new-orleans-g5viz_a29lq83 | cece-winans | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-cece-winans-2026-orlando-16xzkokj9za57fca | cece-winans | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-cece-winans-2026-north-charleston-g5evz_a3s0b-f | cece-winans | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-cece-winans-2026-tampa-vvg1vz_a3ceusx | cece-winans | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-cece-winans-2026-jacksonville-1kfov047gag6hdu | cece-winans | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gavin-adcock-2026-knoxville-z7r9jz1a7-yuw | gavin-adcock | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gavin-adcock-2026-cary-z7r9jz1a7-y8f | gavin-adcock | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gavin-adcock-2026-charlotte-g5evz_kjjq1qk | gavin-adcock | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gavin-adcock-2026-savannah-vvg1zz_kjxemhw | gavin-adcock | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gavin-adcock-2026-estero-vvg1vz_kjvgfqs | gavin-adcock | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gavin-adcock-2026-reading-vv1aezkotgkeivbwv | gavin-adcock | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gavin-adcock-2026-detroit-z7r9jz1a7-yus | gavin-adcock | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gavin-adcock-2026-grand-rapids-z7r9jz1a7-yut | gavin-adcock | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mico-2026-brooklyn-rz7hnez1afcpa7 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-garth-brooks-2026-seattle-vvg1hz_4dkkd9j | garth-brooks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-washington-1avfz_fgkdleutu | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-durham-g5evz_fbugjju | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-asheville-g5evz_ftjugdd | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-atlanta-vvg1zz_fbor4w0 | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-nashville-g5viz_kspxnlj | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-spokane-z7r9jz1aae87y | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-seattle-vvg1hz_3rxx2pm | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-portland-z7r9jz1a7xffk | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-turnpike-troubadours-2026-saint-augustine-z7r9jz1a7-v0a | turnpike-troubadours | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-turnpike-troubadours-2026-clearwater-z7r9jz1a7-ga_ | turnpike-troubadours | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-billy-strings-2026-baltimore-1avfz_6gkmktg1d | billy-strings | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-cristian-castro-2026-el-paso-vvg1yz_adzeyjf | cristian-castro | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-treaty-oak-revival-2026-corpus-christi-z7r9jz1a70e78 | treaty-oak-revival | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-treaty-oak-revival-2026-the-woodlands-g5diz_1panpuq | treaty-oak-revival | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw4juo | barry-manilow | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwpuu0 | barry-manilow | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw9jut | barry-manilow | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwbkui | barry-manilow | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-koe-wetzel-2026-morrison-z7r9jz1a7-0gf | koe-wetzel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-koe-wetzel-2026-lubbock-z7r9jz1a7-jaw | koe-wetzel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-victoria-monet-2026-atlanta-z7r9jz1aavpbj | victoria-monet | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-victoria-monet-2026-fort-lauderdale-z7r9jz1aavpbe | victoria-monet | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-victoria-monet-2026-tampa-vvg1vz_3nvhqgr | victoria-monet | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-victoria-monet-2026-boston-vv1avzkfpgkdybxe- | victoria-monet | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-victoria-monet-2026-detroit-vv1afzkfegkdcyvij | victoria-monet | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-victoria-monet-2026-milwaukee-vv1kjz_3f4g7vnwv | victoria-monet | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-victoria-monet-2026-chicago-vv1k8z_3bag7xjoo | victoria-monet | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jon-pardi-2026-biloxi-g5viz_ctexxwa | jon-pardi | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jon-pardi-2026-macon-vvg1zz_cbiziyi | jon-pardi | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jon-pardi-2026-laredo-g5diz_ctprcyh | jon-pardi | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jon-pardi-2026-corpus-christi-z7r9jz1aazdpk | jon-pardi | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jon-pardi-2026-round-rock-z7r9jz1aazd8o | jon-pardi | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brandi-carlile-2026-portland-z7r9jz1aaea4m | brandi-carlile | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brandi-carlile-2026-milwaukee-z7r9jz1aaeajv | brandi-carlile | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brandi-carlile-2026-milwaukee-z7r9jz1aaeaje | brandi-carlile | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-little-big-town-2026-san-antonio-z7r9jz1a7p8a_ | little-big-town | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-little-big-town-2026-houston-g5diz_g2cmeda | little-big-town | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-little-big-town-2026-dallas-vvg1yz_g1nt6fw | little-big-town | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-little-big-town-2026-chicago-vvg1jz_gohfssb | little-big-town | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shaboozey-2026-los-angeles-z7r9jz1a70kpt | shaboozey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-illenium-2026-las-vegas-z7r9jz1aaz7qs | illenium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mraf38 | bryan-adams | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mr173- | bryan-adams | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mr1v3m | bryan-adams | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-calvin-harris-2026-las-vegas-z7r9jz1aav9ui | calvin-harris | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-air-supply-2026-easton-z7r9jz1a70afy | air-supply | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-air-supply-2026-stamford-g5vvz_axiecx- | air-supply | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-air-supply-2026-orlando-z7r9jz1aazdae | air-supply | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foreigner-2026-lincoln-g5vyz_66kfcgc | foreigner | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-black-stone-cherry-2026-milwaukee-z7r9jz1aae8ot | black-stone-cherry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-black-stone-cherry-2026-omaha-z7r9jz1aae8_- | black-stone-cherry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sting-2026-cincinnati-1apzko9gkelizys | sting | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sting-2026-brooklyn-k7v17_a0ag7nwya | sting | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sting-2026-brooklyn-k7v17_a0ag7lcyc | sting | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sting-2026-brooklyn-k7v17_a0ag7twrb | sting | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sting-2026-brooklyn-k7v17_a0ag7tury | sting | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sting-2026-brooklyn-k7v17_a0ag7iure | sting | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-three-days-grace-2026-indianapolis-vv11v8vn_af0q_vg | three-days-grace | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-three-days-grace-2026-saint-louis-vv1akzku0gkd5ahjs | three-days-grace | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-three-days-grace-2026-denver-g5vzzbuiyxc-- | three-days-grace | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-three-days-grace-2026-nampa-z7r9jz1a7qz3z | three-days-grace | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-three-days-grace-2026-spokane-z7r9jz1a7qz3e | three-days-grace | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-motionless-in-white-2026-albany-k7vgf_5wspmvj | motionless-in-white | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-motionless-in-white-2026-portland-vvg17z_5r6traw | motionless-in-white | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-yg-2026-honolulu-z7r9jz1aaz6-d | yg | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-yg-2026-honolulu-z7r9jz1aazajy | yg | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rawayana-2026-national-harbor-1avfz_kgkw9bb9h | rawayana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rawayana-2026-chicago-vv178z_kgkrasef7 | rawayana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rawayana-2026-inglewood-vv170z_kgkuw4lc4 | rawayana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jodeci-2026-chicago-vvg1jz_2brfg7b | jodeci | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jodeci-2026-indianapolis-vvg1fz_2rfzpki | jodeci | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jodeci-2026-cincinnati-17aov0g62qly9ie | jodeci | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jodeci-2026-cleveland-z7r9jz1aaed_7 | jodeci | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jodeci-2026-bristol-g5viz_25fd7l0 | jodeci | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jodeci-2026-jersey-city-vvg1fz_2hzjb2j | jodeci | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jodeci-2026-bensalem-z7r9jz1aaz98b | jodeci | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mercyme-2026-colorado-springs-z7r9jz1a70nz_ | mercyme | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mercyme-2026-park-city-vvg1bz_135gz80 | mercyme | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mercyme-2026-springfield-z7r9jz1a70n7d | mercyme | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mercyme-2026-oklahoma-city-vvg1yz_13ofzsb | mercyme | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mercyme-2026-kansas-city-z7r9jz1a70nek | mercyme | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mercyme-2026-minneapolis-z7r9jz1a70nz6 | mercyme | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-omer-adam-2026-brooklyn-1ayzk4vgkdfutko | omer-adam | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gary-allan-2026-catoosa-z7r9jz1aaza0p | gary-allan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gary-allan-2026-dodge-city-vvg1bz_gx9hm-8 | gary-allan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gary-allan-2026-lake-charles-z7r9jz1aazdcb | gary-allan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mon-laferte-2026-salt-lake-city-z7r9jz1a70v_v | mon-laferte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mon-laferte-2026-las-vegas-z7r9jz1a7-sud | mon-laferte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mon-laferte-2026-inglewood-vv170z_kgksmomdw | mon-laferte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mon-laferte-2026-inglewood-vvg10z_gloruht | mon-laferte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-austin-g5diz_uux5j8i | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-irving-vvg1yz_g0p_mts | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-houston-g5diz_geaxmd2 | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-orlando-17fov0g6g3w_f1c | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-fort-lauderdale-z7r9jz1a7ppo0 | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-atlanta-z7r9jz1a7pnza | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-nashville-z7r9jz1a7p0bp | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-norfolk-z7r9jz1a7ptxe | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-richmond-z7r9jz1a7ptxv | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-lenny-pearce-2026-pittsburgh-z7r9jz1a7pnqd | lenny-pearce | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-dublin-z7r9jz1a7-mpd | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-dublin-z7r9jz1a7-m4y | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-gary-allan-2026-newkirk-z7r9jz1aavecf | gary-allan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
