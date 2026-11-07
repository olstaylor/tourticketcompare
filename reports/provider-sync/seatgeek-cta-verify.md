# SeatGeek CTA verification log

Generated: 2026-11-07T22:10:52.385Z

Written by `scripts/verify-seatgeek-events.mjs`. Identity anchor: the
registry-verified `seatgeek_performer_id`; date anchor: UTC-instant match
(±3h) between the event `datetime_iso` and the SeatGeek `datetime_utc`.

## Run summary

- Mode: apply
- Events selected: 1967 (needs_recheck: 676, provenance backfill: 34, stale re-check: 1798)
- Events skipped before API checks: 586
- API calls made: 800
- Verified provenance written: 578
- URLs added: 6
- URLs corrected: 0
- URLs cleared: 22
- Provenance un-verified: 25
- Conflicts (ambiguous, untouched): 2
- No qualifying listing: 120
- Transient API errors (untouched, retried next run): 0
- Stopped early: api_call_limit_reached

## Outcomes

| showId | artist | action | SeatGeek id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-tommy-emmanuel-2026-charlotte-z7r9jz1a70f-s | tommy-emmanuel | verify (applied) | 18225325 | https://seatgeek.com/tommy-emmanuel-tickets/charlotte-north-carolina-knight-theater-at-levine-center-for-the-arts-2026-12-07-7-30-pm/concert/18225325 | - |
| tm-jonas-brothers-2026-salt-lake-city-z7r9jz1aazwb9 | jonas-brothers | verify (applied) | 18471182 | https://seatgeek.com/jonas-brothers-tickets/salt-lake-city-utah-delta-center-1-2026-12-07-7-30-pm/concert/18471182 | - |
| tm-trivium-2026-penticton-z7r9jz1aazdbz | trivium | verify (applied) | 18391977 | https://seatgeek.com/trivium-tickets/penticton-canada-penticton-trade-convention-centre-2026-12-07-6-35-pm/concert/18391977 | - |
| tm-little-big-town-2026-nashville-z7r9jz1a7j8ra | little-big-town | verify (applied) | 18385970 | https://seatgeek.com/little-big-town-tickets/nashville-tennessee-ryman-auditorium-2026-12-08-7-30-pm/concert/18385970 | - |
| tm-beartooth-2026-austin-z7r9jz1a70i8v | beartooth | verify (applied) | 18253063 | https://seatgeek.com/beartooth-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2026-12-09-6-30-pm/concert/18253063 | - |
| tm-tommy-emmanuel-2026-atlanta-z7r9jz1a70b-i | tommy-emmanuel | verify (applied) | 18237606 | https://seatgeek.com/tommy-emmanuel-tickets/atlanta-georgia-variety-playhouse-2026-12-09-8-pm/concert/18237606 | - |
| tm-billy-strings-2026-sugar-land-z7r9jz1a7xvj- | billy-strings | verify (applied) | 18158743 | https://seatgeek.com/billy-strings-tickets/sugar-land-texas-smart-financial-centre-2026-12-09-7-30-pm/concert/18158743 | - |
| tm-little-big-town-2026-nashville-z7r9jz1a7j8_7 | little-big-town | verify (applied) | 18385972 | https://seatgeek.com/little-big-town-tickets/nashville-tennessee-ryman-auditorium-2026-12-09-7-30-pm/concert/18385972 | - |
| tm-koe-wetzel-2026-fort-worth-z7r9jz1aa7evf | koe-wetzel | verify (applied) | 18665100 | https://seatgeek.com/koe-wetzel-tickets/fort-worth-texas-billy-bob-s-texas-2026-12-09-9-pm/concert/18665100 | - |
| tm-tommy-emmanuel-2026-ponte-vedra-beach-z7r9jz1a70kze | tommy-emmanuel | verify (applied) | 18237612 | https://seatgeek.com/tommy-emmanuel-tickets/ponte-vedra-beach-florida-ponte-vedra-concert-hall-2026-12-10-7-pm/concert/18237612 | - |
| tm-pink-martini-2026-fairfax-z7r9jz1aazojt | pink-martini | verify (applied) | 18701980 | https://seatgeek.com/pink-martini-tickets/fairfax-virginia-center-for-the-arts-george-mason-university-2026-12-10-7-30-pm/concert/18701980 | - |
| tm-little-big-town-2026-nashville-z7r9jz1a7j_4x | little-big-town | verify (applied) | 18385974 | https://seatgeek.com/little-big-town-tickets/nashville-tennessee-ryman-auditorium-2026-12-10-7-30-pm/concert/18385974 | - |
| tm-koe-wetzel-2026-fort-worth-z7r9jz1aa7vfe | koe-wetzel | verify (applied) | 18649775 | https://seatgeek.com/koe-wetzel-tickets/fort-worth-texas-billy-bob-s-texas-2026-12-10-9-pm/concert/18649775 | - |
| tm-riley-green-2026-las-vegas-z7r9jz1a7peq7 | riley-green | verify (applied) | 18282386 | https://seatgeek.com/riley-green-tickets/las-vegas-nevada-resorts-world-theatre-2026-12-10-8-30-pm/concert/18282386 | - |
| tm-gavin-adcock-2026-las-vegas-z7r9jz1a7paas | gavin-adcock | verify (applied) | 18293611 | https://seatgeek.com/gavin-adcock-tickets/las-vegas-nevada-the-theater-at-virgin-hotels-2026-12-10-8-30-pm/concert/18293611 | - |
| tm-trans-siberian-orchestra-2026-houston-z7r9jz1aavnas | trans-siberian-orchestra | verify (applied) | 18573440 | https://seatgeek.com/trans-siberian-orchestra-tickets/houston-texas-toyota-center-2026-12-11-3-pm/concert/18573440 | - |
| tm-tommy-emmanuel-2026-orlando-z7r9jz1a70b-e | tommy-emmanuel | verify (applied) | 18237614 | https://seatgeek.com/tommy-emmanuel-tickets/orlando-florida-the-plaza-live-2026-12-11-8-pm/concert/18237614 | - |
| tm-blue-october-2026-austin-z7r9jz1a7-v0k | blue-october | verify (applied) | 18147885 | https://seatgeek.com/blue-october-tickets/austin-texas-bass-concert-hall-2026-12-11-7-pm/concert/18147885 | - |
| tm-brent-faiyaz-2026-los-angeles-z7r9jz1aae7ub | brent-faiyaz | verify (applied) | 18619390 | https://seatgeek.com/brent-faiyaz-tickets/los-angeles-california-crypto-com-arena-2026-12-11-8-pm/concert/18619390 | - |
| tm-cece-winans-2026-portland-z7r9jz1a7j6jj | cece-winans | verify (applied) | 18499845 | https://seatgeek.com/cece-winans-tickets/portland-oregon-arlene-schnitzer-concert-hall-2026-12-11-8-pm/concert/18499845 | - |
| tm-black-stone-cherry-2026-columbus-z7r9jz1aae7be | black-stone-cherry | verify (applied) | 18637158 | https://seatgeek.com/black-stone-cherry-tickets/columbus-ohio-the-king-of-clubs-oh-2026-12-12-5-30-pm/concert/18637158 | - |
| tm-sabaton-2026-fort-lauderdale-z7r9jz1a7-oqe | sabaton | verify (applied) | 17726761 | https://seatgeek.com/sabaton-tickets/fort-lauderdale-florida-ftl-war-memorial-auditorium-2026-12-12-7-pm/concert/17726761 | - |
| tm-pink-martini-2026-lebanon-z7r9jz1a7pwba | pink-martini | verify (applied) | 18670209 | https://seatgeek.com/pink-martini-tickets/lebanon-new-hampshire-lebanon-opera-house-2026-12-12-7-30-pm/concert/18670209 | - |
| tm-lady-a-2026-shipshewana-z7r9jz1a7pkv6 | lady-a | verify (applied) | 18295863 | https://seatgeek.com/lady-a-tickets/shipshewana-indiana-blue-gate-performing-arts-center-2026-12-12-7-30-pm/concert/18295863 | - |
| tm-tommy-emmanuel-2026-clearwater-z7r9jz1aav8__ | tommy-emmanuel | verify (applied) | 18237615 | https://seatgeek.com/tommy-emmanuel-tickets/clearwater-florida-bilheimer-capitol-theatre-2026-12-12-7-pm/concert/18237615 | - |
| tm-janet-jackson-2026-sunrise-z7r9jz1aazz43 | janet-jackson | verify (applied) | 18443314 | https://seatgeek.com/janet-jackson-tickets/sunrise-florida-amerant-bank-arena-2026-12-12-8-pm/concert/18443314 | - |
| tm-blue-october-2026-san-antonio-z7r9jz1a7-vz7 | blue-october | verify (applied) | 18142024 | https://seatgeek.com/blue-october-tickets/san-antonio-texas-boeing-center-at-tech-port-2026-12-12-8-pm/concert/18142024 | - |
| tm-missio-2026-vancouver-z7r9jz1aaziv9 | missio | verify (applied) | 18646946 | https://seatgeek.com/missio-tickets/vancouver-canada-the-pearl-bc-2026-12-12-6-pm/concert/18646946 | - |
| tm-trivium-2026-denver-z7r9jz1aazdby | trivium | verify (applied) | 18391983 | https://seatgeek.com/trivium-tickets/denver-colorado-mission-ballroom-2026-12-13-6-35-pm/concert/18391983 | - |
| tm-trivium-2026-tulsa-z7r9jz1aazd_z | trivium | verify (applied) | 18391987 | https://seatgeek.com/trivium-tickets/tulsa-oklahoma-tulsa-theater-2026-12-15-6-35-pm/concert/18391987 | - |
| tm-jodeci-2026-jacksonville-z7r9jz1aaz3fu | jodeci | verify (applied) | 18407288 | https://seatgeek.com/jodeci-tickets/jacksonville-florida-florida-theatre-jacksonville-2026-12-15-8-pm/concert/18407288 | - |
| tm-beartooth-2026-albuquerque-z7r9jz1a70i3o | beartooth | verify (applied) | 18253073 | https://seatgeek.com/beartooth-tickets/albuquerque-new-mexico-revel-entertainment-center-2026-12-15-6-30-pm/concert/18253073 | - |
| tm-cece-winans-2026-bakersfield-z7r9jz1a7jfpa | cece-winans | verify (applied) | 18598785 | https://seatgeek.com/cece-winans-tickets/bakersfield-california-dignity-health-theater-2026-12-16-7-pm/concert/18598785 | - |
| tm-pentatonix-2026-lubbock-z7r9jz1aaz-j6 | pentatonix | verify (applied) | 18427242 | https://seatgeek.com/pentatonix-tickets/lubbock-texas-united-supermarkets-arena-2026-12-17-7-pm/concert/18427242 | - |
| tm-cece-winans-2026-los-angeles-z7r9jz1a7jfjs | cece-winans | verify (applied) | 18499823 | https://seatgeek.com/cece-winans-tickets/los-angeles-california-peacock-theater-2026-12-17-7-pm/concert/18499823 | - |
| tm-trans-siberian-orchestra-2026-sunrise-z7r9jz1aavnag | trans-siberian-orchestra | verify (applied) | 18410573 | https://seatgeek.com/trans-siberian-orchestra-tickets/sunrise-florida-amerant-bank-arena-2026-12-18-7-pm/concert/18410573 | - |
| tm-pink-martini-2026-boston-z7r9jz1a7psqp | pink-martini | verify (applied) | 18668809 | https://seatgeek.com/pink-martini-tickets/boston-massachusetts-berklee-performance-center-2026-12-18-8-pm/concert/18668809 | - |
| tm-lord-huron-2026-brooklyn-z7r9jz1aazpf3 | lord-huron | verify (applied) | 18421979 | https://seatgeek.com/lord-huron-tickets/brooklyn-new-york-kings-theatre-brooklyn-2026-12-18-8-pm/concert/18421979 | - |
| tm-lady-a-2026-bensalem-z7r9jz1a7p380 | lady-a | verify (applied) | 18353855 | https://seatgeek.com/lady-a-tickets/bensalem-pennsylvania-xcite-center-at-parx-casino-2026-12-18-8-pm/concert/18353855 | - |
| tm-boyz-ii-men-2026-norman-z7r9jz1aaed_y | boyz-ii-men | verify (applied) | 18320946 | https://seatgeek.com/boyz-ii-men-tickets/norman-oklahoma-riverwind-casino-2026-12-18-8-pm/concert/18320946 | - |
| tm-a-boogie-wit-da-hoodie-2026-hartford-z7r9jz1aaea_k | a-boogie-wit-da-hoodie | verify (applied) | 18639406 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/hartford-connecticut-peoplesbank-arena-2026-12-19-8-pm/concert/18639406 | - |
| tm-lord-huron-2026-brooklyn-z7r9jz1aazbbi | lord-huron | verify (applied) | 18421980 | https://seatgeek.com/lord-huron-tickets/brooklyn-new-york-kings-theatre-brooklyn-2026-12-19-8-pm/concert/18421980 | - |
| tm-boyz-ii-men-2026-thackerville-z7r9jz1a70-f8 | boyz-ii-men | verify (applied) | 18211756 | https://seatgeek.com/boyz-ii-men-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2026-12-19-8-pm/concert/18211756 | - |
| tm-olivia-rodrigo-2026-las-vegas-z7r9jz1a706kk | olivia-rodrigo | verify (applied) | 18211722 | https://seatgeek.com/olivia-rodrigo-tickets/las-vegas-nevada-t-mobile-arena-2026-12-19-7-pm/concert/18211722 | - |
| tm-illenium-2026-las-vegas-z7r9jz1aavupe | illenium | verify (applied) | 18643550 | https://seatgeek.com/illenium-tickets/las-vegas-nevada-omnia-las-vegas-2026-12-19-10-30-pm/concert/18643550 | - |
| tm-olivia-rodrigo-2026-las-vegas-z7r9jz1a706kf | olivia-rodrigo | verify (applied) | 18211723 | https://seatgeek.com/olivia-rodrigo-tickets/las-vegas-nevada-t-mobile-arena-2026-12-20-7-pm/concert/18211723 | - |
| tm-lady-a-2026-nashville-z7r9jz1a7p0p9 | lady-a | verify (applied) | 18295865 | https://seatgeek.com/lady-a-tickets/nashville-tennessee-ryman-auditorium-2026-12-21-3-pm/concert/18295865 | - |
| tm-trans-siberian-orchestra-2026-cleveland-z7r9jz1aavx-d | trans-siberian-orchestra | verify (applied) | 18368862 | https://seatgeek.com/trans-siberian-orchestra-tickets/cleveland-ohio-rocket-arena-2026-12-22-3-pm/concert/18368862 | - |
| tm-earth-wind-fire-2027-thackerville-z7r9jz1aazwqd | earth-wind-fire | verify (applied) | 18409857 | https://seatgeek.com/earth-wind-fire-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2026-12-31-8-pm/concert/18409857 | - |
| tm-post-malone-2027-salt-lake-city-z7r9jz1aa7skb | post-malone | verify (applied) | 18414663 | https://seatgeek.com/post-malone-tickets/salt-lake-city-utah-delta-center-1-2026-12-31-10-pm/concert/18414663 | - |
| tm-calvin-harris-2027-las-vegas-z7r9jz1aaeaa4 | calvin-harris | verify (applied) | 18701921 | https://seatgeek.com/calvin-harris-tickets/las-vegas-nevada-xs-nightclub-at-encore-5-2026-12-31-10-30-pm/concert/18701921 | - |
| tm-lord-huron-2027-las-vegas-z7r9jz1aazbo8 | lord-huron | verify (applied) | 18421984 | https://seatgeek.com/lord-huron-tickets/las-vegas-nevada-the-theater-at-virgin-hotels-2027-01-02-8-pm/concert/18421984 | - |
| tm-rufus-du-sol-2027-san-francisco-z7r9jz1aae3qg | rufus-du-sol | verify (applied) | 18639575 | https://seatgeek.com/rufus-du-sol-tickets/san-francisco-california-pier-80-2027-01-03-4-pm/concert/18639575 | - |
| tm-pink-martini-2027-fort-worth-z7r9jz1a7p6-z | pink-martini | verify (applied) | 18659747 | https://seatgeek.com/pink-martini-tickets/fort-worth-texas-bass-performance-hall-2027-01-08-7-30-pm/concert/18659747 | - |
| tm-stella-lefty-2027-columbus-z7r9jz1aav7q6 | stella-lefty | verify (applied) | 18527907 | https://seatgeek.com/stella-lefty-tickets/columbus-ohio-kemba-live-2027-01-10-8-pm/concert/18527907 | - |
| tm-pink-martini-2027-jacksonville-z7r9jz1aazepf | pink-martini | verify (applied) | 18668813 | https://seatgeek.com/pink-martini-tickets/jacksonville-florida-florida-theatre-jacksonville-2027-01-12-7-30-pm/concert/18668813 | - |
| tm-atmosphere-2027-green-bay-z7r9jz1aavz-e | atmosphere | verify (applied) | 18609071 | https://seatgeek.com/atmosphere-tickets/green-bay-wisconsin-epic-event-center-green-bay-2027-01-14-6-45-pm/concert/18609071 | - |
| tm-barry-manilow-2027-sunrise-z7r9jz1a7ji0e | barry-manilow | verify (applied) | 17732521 | https://seatgeek.com/barry-manilow-tickets/sunrise-florida-amerant-bank-arena-2027-01-15-7-pm/concert/17732521 | - |
| tm-the-psychedelic-furs-2027-ridgefield-z7r9jz1aavuq6 | the-psychedelic-furs | verify (applied) | 18670227 | https://seatgeek.com/the-psychedelic-furs-tickets/ridgefield-connecticut-the-ridgefield-playhouse-2027-01-15-8-pm/concert/18670227 | - |
| tm-atmosphere-2027-west-des-moines-z7r9jz1aaezfw | atmosphere | verify (applied) | 18609072 | https://seatgeek.com/atmosphere-tickets/west-des-moines-iowa-val-air-ballroom-2027-01-16-6-45-pm/concert/18609072 | - |
| tm-atmosphere-2027-omaha-z7r9jz1aaez39 | atmosphere | verify (applied) | 18609074 | https://seatgeek.com/atmosphere-tickets/omaha-nebraska-the-admiral-omaha-2027-01-17-8-pm/concert/18609074 | - |
| tm-atmosphere-2027-fort-collins-z7r9jz1aaezpv | atmosphere | verify (applied) | 18609075 | https://seatgeek.com/atmosphere-tickets/fort-collins-colorado-aggie-theatre-2027-01-19-6-45-pm/concert/18609075 | - |
| tm-yacht-rock-revue-2027-key-west-z7r9jz1aaeefv | yacht-rock-revue | verify (applied) | 18618566 | https://seatgeek.com/yacht-rock-revue-tickets/key-west-florida-coffee-butler-amphitheater-2027-01-20-7-30-pm/concert/18618566 | - |
| tm-alan-walker-2027-austin-z7r9jz1aavtfx | alan-walker | verify (applied) | 18595131 | https://seatgeek.com/alan-walker-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-01-21-7-pm/concert/18595131 | - |
| tm-tommy-emmanuel-2027-saint-louis-z7r9jz1aavs4y | tommy-emmanuel | verify (applied) | 18690599 | https://seatgeek.com/tommy-emmanuel-tickets/saint-louis-missouri-sheldon-concert-hall-2027-01-21-8-pm/concert/18690599 | - |
| tm-yacht-rock-revue-2027-fort-myers-z7r9jz1aaevr7 | yacht-rock-revue | verify (applied) | 18621507 | https://seatgeek.com/yacht-rock-revue-tickets/fort-myers-florida-caloosa-sound-amphitheater-2027-01-22-7-30-pm/concert/18621507 | - |
| tm-tommy-emmanuel-2027-saint-louis-z7r9jz1aavspz | tommy-emmanuel | verify (applied) | 18690598 | https://seatgeek.com/tommy-emmanuel-tickets/saint-louis-missouri-sheldon-concert-hall-2027-01-22-8-pm/concert/18690598 | - |
| tm-yacht-rock-revue-2027-clearwater-z7r9jz1aaevfz | yacht-rock-revue | verify (applied) | 18699569 | https://seatgeek.com/yacht-rock-revue-tickets/clearwater-florida-ruth-eckerd-hall-2027-01-23-8-pm/concert/18699569 | - |
| tm-air-supply-2027-sarasota-z7r9jz1a7p_4p | air-supply | verify (applied) | 18355670 | https://seatgeek.com/air-supply-tickets/sarasota-florida-van-wezel-performing-arts-hall-2027-01-24-7-pm/concert/18355670 | - |
| tm-pink-martini-2027-bellingham-z7r9jz1aazp-s | pink-martini | verify (applied) | 18668823 | https://seatgeek.com/pink-martini-tickets/bellingham-washington-mount-baker-theatre-2027-01-24-7-pm/concert/18668823 | - |
| tm-daughtry-2027-melbourne-z7r9jz1aae83v | daughtry | verify (applied) | 18632894 | https://seatgeek.com/daughtry-tickets/melbourne-florida-maxwell-c-king-center-for-the-performing-arts-2027-01-25-7-pm/concert/18632894 | - |
| tm-tommy-emmanuel-2027-champaign-z7r9jz1aavspv | tommy-emmanuel | verify (applied) | 18690443 | https://seatgeek.com/tommy-emmanuel-tickets/champaign-illinois-virginia-theatre-2027-01-26-7-30-pm/concert/18690443 | - |
| tm-yacht-rock-revue-2027-melbourne-z7r9jz1aaee4f | yacht-rock-revue | verify (applied) | 18618051 | https://seatgeek.com/yacht-rock-revue-tickets/melbourne-florida-maxwell-c-king-center-for-the-performing-arts-2027-01-27-7-30-pm/concert/18618051 | - |
| tm-daughtry-2027-clearwater-z7r9jz1aae83e | daughtry | verify (applied) | 18632896 | https://seatgeek.com/daughtry-tickets/clearwater-florida-ruth-eckerd-hall-2027-01-28-7-pm/concert/18632896 | - |
| tm-alan-walker-2027-nashville-z7r9jz1aavt47 | alan-walker | verify (applied) | 18621798 | https://seatgeek.com/alan-walker-tickets/nashville-tennessee-the-pinnacle-nashville-2027-01-28-8-pm/concert/18621798 | - |
| tm-atmosphere-2027-eugene-z7r9jz1aaez3b | atmosphere | verify (applied) | 18609088 | https://seatgeek.com/atmosphere-tickets/eugene-oregon-mcdonald-theatre-2027-01-28-8-pm/concert/18609088 | - |
| tm-yacht-rock-revue-2027-jacksonville-z7r9jz1aaeebg | yacht-rock-revue | verify (applied) | 18621818 | https://seatgeek.com/yacht-rock-revue-tickets/jacksonville-florida-florida-theatre-jacksonville-2027-01-29-7-30-pm/concert/18621818 | - |
| tm-dylan-scott-2027-bismarck-z7r9jz1aavseb | dylan-scott | verify (applied) | 18603379 | https://seatgeek.com/dylan-scott-tickets/bismarck-north-dakota-bismarck-event-center-2027-01-29-7-30-pm/concert/18603379 | - |
| tm-blue-october-2027-midland-z7r9jz1a70pjo | blue-october | verify (applied) | 18354266 | https://seatgeek.com/blue-october-tickets/midland-texas-wagner-noel-performing-arts-center-2027-01-29-8-pm/concert/18354266 | - |
| tm-cristian-castro-2027-denver-z7r9jz1a7-boz | cristian-castro | verify (applied) | 18103535 | https://seatgeek.com/cristian-castro-tickets/denver-colorado-bellco-theatre-2027-01-29-8-pm/concert/18103535 | - |
| tm-lionel-richie-2027-thackerville-z7r9jz1aav_-z | lionel-richie | verify (applied) | 18424874 | https://seatgeek.com/lionel-richie-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2027-01-30-8-pm/concert/18424874 | - |
| tm-tommy-emmanuel-2027-buffalo-z7r9jz1aavspd | tommy-emmanuel | verify (applied) | 18690413 | https://seatgeek.com/tommy-emmanuel-tickets/buffalo-new-york-asbury-hall-buffalo-2027-01-31-8-pm/concert/18690413 | - |
| tm-blue-october-2027-amarillo-z7r9jz1a7pxau | blue-october | verify (applied) | 18655859 | https://seatgeek.com/blue-october-tickets/amarillo-texas-globe-news-center-for-the-performing-arts-2027-01-31-7-30-pm/concert/18655859 | - |
| tm-stella-lefty-2027-austin-z7r9jz1aav7f6 | stella-lefty | verify (applied) | 18527893 | https://seatgeek.com/stella-lefty-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-01-31-8-pm/concert/18527893 | - |
| tm-daughtry-2027-austin-z7r9jz1aae83d | daughtry | verify (applied) | 18632906 | https://seatgeek.com/daughtry-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-02-03-7-pm/concert/18632906 | - |
| tm-the-red-clay-strays-2027-cleveland-z7r9jz1aaefgw | the-red-clay-strays | verify (applied) | 18592284 | https://seatgeek.com/the-red-clay-strays-tickets/cleveland-ohio-rocket-arena-2027-02-04-7-pm/concert/18592284 | - |
| tm-valley-2027-quebec-z7r9jz1aavzfi | valley | verify (applied) | 18696397 | https://seatgeek.com/valley-tickets/quebec-canada-grizzly-fuzz-2027-02-04-8-pm/concert/18696397 | - |
| tm-blue-october-2027-albuquerque-z7r9jz1a70pgn | blue-october | verify (applied) | 18239716 | https://seatgeek.com/blue-october-tickets/albuquerque-new-mexico-revel-entertainment-center-2027-02-04-8-pm/concert/18239716 | - |
| tm-tobymac-2027-sunrise-z7r9jz1aav8xe | tobymac | verify (applied) | 18527954 | https://seatgeek.com/tobymac-tickets/sunrise-florida-amerant-bank-arena-2027-02-05-7-pm/concert/18527954 | - |
| tm-dropkick-murphys-2027-albuquerque-z7r9jz1aae80p | dropkick-murphys | verify (applied) | 18633525 | https://seatgeek.com/dropkick-murphys-tickets/albuquerque-new-mexico-revel-entertainment-center-2027-02-05-7-pm/concert/18633525 | - |
| tm-tommy-emmanuel-2027-charlottesville-z7r9jz1aavspf | tommy-emmanuel | verify (applied) | 18690564 | https://seatgeek.com/tommy-emmanuel-tickets/charlottesville-virginia-paramount-theater-charlottesville-2027-02-06-8-pm/concert/18690564 | - |
| tm-air-supply-2027-wisconsin-dells-z7r9jz1a7x_ez | air-supply | verify (applied) | 18200030 | https://seatgeek.com/air-supply-tickets/wisconsin-dells-wisconsin-crystal-grand-music-theatre-2027-02-06-8-pm/concert/18200030 | - |
| tm-daughtry-2027-ventura-z7r9jz1aae837 | daughtry | verify (applied) | 18632907 | https://seatgeek.com/daughtry-tickets/ventura-california-the-majestic-ventura-theater-2027-02-06-8-pm/concert/18632907 | - |
| tm-atmosphere-2027-minneapolis-z7r9jz1aaez4o | atmosphere | verify (applied) | 18609105 | https://seatgeek.com/atmosphere-tickets/minneapolis-minnesota-first-avenue-minneapolis-2027-02-07-6-45-pm/concert/18609105 | - |
| tm-andrea-bocelli-2027-houston-z7r9jz1aavs_v | andrea-bocelli | verify (applied) | 18581453 | https://seatgeek.com/andrea-bocelli-tickets/houston-texas-toyota-center-2027-02-07-8-pm/concert/18581453 | - |
| tm-polyphia-2027-san-diego-z7r9jz1aav67j | polyphia | verify (applied) | 18536015 | https://seatgeek.com/polyphia-tickets/san-diego-california-soma-san-diego-2027-02-10-7-30-pm/concert/18536015 | - |
| tm-don-omar-2027-san-diego-z7r9jz1a7pggy | don-omar | verify (applied) | 18333383 | https://seatgeek.com/don-omar-tickets/san-diego-california-pechanga-arena-san-diego-2027-02-10-8-pm/concert/18333383 | - |
| tm-blue-october-2027-san-luis-obispo-z7r9jz1a70_f7 | blue-october | verify (applied) | 18245801 | https://seatgeek.com/blue-october-tickets/san-luis-obispo-california-fremont-theater-san-luis-obispo-2027-02-10-8-pm/concert/18245801 | - |
| tm-dinosaur-jr-2027-brooklyn-z7r9jz1aavk1a | dinosaur-jr | verify (applied) | 18540431 | https://seatgeek.com/dinosaur-jr-tickets/brooklyn-new-york-brooklyn-steel-2027-02-11-8-pm/concert/18540431 | - |
| tm-alan-walker-2027-new-york-z7r9jz1aavt4a | alan-walker | verify (applied) | 18595137 | https://seatgeek.com/alan-walker-tickets/new-york-new-york-terminal-5-2027-02-11-9-pm/concert/18595137 | - |
| tm-nickelback-2027-cleveland-z7r9jz1aa774f | nickelback | verify (applied) | 18604483 | https://seatgeek.com/nickelback-tickets/cleveland-ohio-rocket-arena-2027-02-12-6-30-pm/concert/18604483 | - |
| tm-tobymac-2027-sugar-land-z7r9jz1aav8op | tobymac | verify (applied) | 18548802 | https://seatgeek.com/tobymac-tickets/sugar-land-texas-smart-financial-centre-2027-02-12-7-pm/concert/18548802 | - |
| tm-dinosaur-jr-2027-brooklyn-z7r9jz1aavk1f | dinosaur-jr | verify (applied) | 18540433 | https://seatgeek.com/dinosaur-jr-tickets/brooklyn-new-york-brooklyn-steel-2027-02-12-8-pm/concert/18540433 | - |
| tm-valley-2027-chicago-z7r9jz1aavzfy | valley | verify (applied) | 18684172 | https://seatgeek.com/valley-tickets/chicago-illinois-park-west-2027-02-12-7-30-pm/concert/18684172 | - |
| tm-pink-martini-2027-chicago-z7r9jz1aaz6g7 | pink-martini | verify (applied) | 18396258 | https://seatgeek.com/pink-martini-tickets/chicago-illinois-chicago-symphony-center-2027-02-12-8-pm/concert/18396258 | - |
| tm-alan-walker-2027-new-york-z7r9jz1aavt4k | alan-walker | verify (applied) | 18595135 | https://seatgeek.com/alan-walker-tickets/new-york-new-york-terminal-5-2027-02-12-9-pm/concert/18595135 | - |
| tm-dropkick-murphys-2027-vancouver-z7r9jz1aaeopk | dropkick-murphys | verify (applied) | 18633528 | https://seatgeek.com/dropkick-murphys-tickets/vancouver-canada-pne-forum-vancouver-2027-02-12-7-pm/concert/18633528 | - |
| tm-tobymac-2027-grand-prairie-z7r9jz1aav8of | tobymac | verify (applied) | 18548804 | https://seatgeek.com/tobymac-tickets/grand-prairie-texas-texas-trust-cu-theatre-2027-02-13-7-pm/concert/18548804 | - |
| tm-dinosaur-jr-2027-philadelphia-z7r9jz1aavk18 | dinosaur-jr | verify (applied) | 18540434 | https://seatgeek.com/dinosaur-jr-tickets/philadelphia-pennsylvania-union-transfer-philadelphia-2027-02-13-8-pm/concert/18540434 | - |
| tm-valley-2027-minneapolis-z7r9jz1aavzfs | valley | verify (applied) | 18684018 | https://seatgeek.com/valley-tickets/minneapolis-minnesota-fine-line-music-cafe-2027-02-13-7-30-pm/concert/18684018 | - |
| tm-dropkick-murphys-2027-penticton-z7r9jz1aae8_9 | dropkick-murphys | verify (applied) | 18633535 | https://seatgeek.com/dropkick-murphys-tickets/penticton-canada-penticton-trade-convention-centre-2027-02-13-7-pm/concert/18633535 | - |
| tm-daughtry-2027-cedar-rapids-z7r9jz1aae83a | daughtry | verify (applied) | 18632918 | https://seatgeek.com/daughtry-tickets/cedar-rapids-iowa-paramount-theatre-cedar-rapids-2027-02-15-7-pm/concert/18632918 | - |
| tm-meshuggah-2027-detroit-z7r9jz1aa7t8- | meshuggah | verify (applied) | 18724637 | https://seatgeek.com/meshuggah-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2027-02-16-6-pm/concert/18724637 | - |
| tm-hans-zimmer-2027-hartford-z7r9jz1aavvqk | hans-zimmer | verify (applied) | 18601917 | https://seatgeek.com/hans-zimmer-tickets/hartford-connecticut-peoplesbank-arena-2027-02-17-7-30-pm/concert/18601917 | - |
| tm-greta-van-fleet-2027-green-bay-z7r9jz1aae44u | greta-van-fleet | verify (applied) | 18641961 | https://seatgeek.com/greta-van-fleet-tickets/green-bay-wisconsin-resch-center-2027-02-17-7-pm/concert/18641961 | - |
| tm-stella-lefty-2027-nashville-z7r9jz1aav7ff | stella-lefty | verify (applied) | 18527898 | https://seatgeek.com/stella-lefty-tickets/nashville-tennessee-ryman-auditorium-2027-02-17-8-pm/concert/18527898 | - |
| tm-blue-october-2027-bakersfield-z7r9jz1a70_4m | blue-october | verify (applied) | 18653245 | https://seatgeek.com/blue-october-tickets/bakersfield-california-historic-bakersfield-fox-theater-2027-02-17-8-pm/concert/18653245 | - |
| tm-yuridia-2027-highland-z7r9jz1aav-j_ | yuridia | verify (applied) | 18570387 | https://seatgeek.com/yuridia-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2027-02-17-8-pm/concert/18570387 | - |
| tm-the-lemonheads-2027-tampa-z7r9jz1aavwob | the-lemonheads | verify (applied) | 18595315 | https://seatgeek.com/the-lemonheads-tickets/tampa-florida-the-orpheum-tampa-2027-02-18-7-pm/concert/18595315 | - |
| tm-daughtry-2027-eau-claire-z7r9jz1aae83k | daughtry | verify (applied) | 18632922 | https://seatgeek.com/daughtry-tickets/eau-claire-wisconsin-rcu-theatre-pablo-center-at-the-confluence-2027-02-18-7-pm/concert/18632922 | - |
| tm-stella-lefty-2027-nashville-z7r9jz1aavffx | stella-lefty | verify (applied) | 18539564 | https://seatgeek.com/stella-lefty-tickets/nashville-tennessee-ryman-auditorium-2027-02-18-8-pm/concert/18539564 | - |
| tm-dylan-scott-2027-denver-z7r9jz1aavse_ | dylan-scott | verify (applied) | 18603380 | https://seatgeek.com/dylan-scott-tickets/denver-colorado-mission-ballroom-2027-02-18-8-pm/concert/18603380 | - |
| tm-blue-october-2027-san-francisco-z7r9jz1a70_4z | blue-october | verify (applied) | 18652826 | https://seatgeek.com/blue-october-tickets/san-francisco-california-the-regency-ballroom-2027-02-18-8-pm/concert/18652826 | - |
| tm-foreigner-2027-pompano-beach-z7r9jz1aav6fn | foreigner | verify (applied) | 18570609 | https://seatgeek.com/foreigner-tickets/pompano-beach-florida-pompano-beach-amphitheater-2027-02-19-8-pm/concert/18570609 | - |
| tm-air-supply-2027-penticton-z7r9jz1aa7o-a | air-supply | verify (applied) | 18646927 | https://seatgeek.com/air-supply-tickets/penticton-canada-south-okanagan-events-centre-2027-02-19-6-30-pm/concert/18646927 | - |
| tm-dinosaur-jr-2027-saint-petersburg-z7r9jz1aavk16 | dinosaur-jr | verify (applied) | 18540442 | https://seatgeek.com/dinosaur-jr-tickets/saint-petersburg-florida-jannus-live-2027-02-20-8-pm/concert/18540442 | - |
| tm-meshuggah-2027-kansas-city-z7r9jz1aa7t8x | meshuggah | verify (applied) | 18724639 | https://seatgeek.com/meshuggah-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-02-20-7-pm/concert/18724639 | - |
| tm-sylvan-esso-2027-vancouver-z7r9jz1a7pffp | sylvan-esso | verify (applied) | 18299162 | https://seatgeek.com/sylvan-esso-tickets/vancouver-canada-vogue-theatre-bc-1-2027-02-20-8-pm/concert/18299162 | - |
| tm-tobymac-2027-norfolk-z7r9jz1aav8r3 | tobymac | verify (applied) | 18548806 | https://seatgeek.com/tobymac-tickets/norfolk-virginia-chartway-arena-2027-02-21-6-30-pm/concert/18548806 | - |
| tm-dropkick-murphys-2027-green-bay-z7r9jz1aaeopf | dropkick-murphys | verify (applied) | 18633547 | https://seatgeek.com/dropkick-murphys-tickets/green-bay-wisconsin-epic-event-center-green-bay-2027-02-21-7-pm/concert/18633547 | - |
| tm-air-supply-2027-prince-george-z7r9jz1aaek-z | air-supply | verify (applied) | 18736469 | https://seatgeek.com/air-supply-tickets/prince-george-canada-cn-centre-2027-02-21-6-30-pm/concert/18736469 | - |
| tm-dropkick-murphys-2027-fort-wayne-z7r9jz1aaeop4 | dropkick-murphys | verify (applied) | 18633548 | https://seatgeek.com/dropkick-murphys-tickets/fort-wayne-indiana-the-clyde-theatre-fort-wayne-in-2027-02-22-7-pm/concert/18633548 | - |
| tm-air-supply-2027-dawson-creek-z7r9jz1aavmfk | air-supply | verify (applied) | 18646928 | https://seatgeek.com/air-supply-tickets/dawson-creek-canada-ovintiv-events-centre-2027-02-22-7-30-pm/concert/18646928 | - |
| tm-sylvan-esso-2027-portland-z7r9jz1a7pf-d | sylvan-esso | verify (applied) | 18299165 | https://seatgeek.com/sylvan-esso-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-02-22-8-30-pm/concert/18299165 | - |
| tm-dinosaur-jr-2027-orlando-z7r9jz1aav8-u | dinosaur-jr | verify (applied) | 18540443 | https://seatgeek.com/dinosaur-jr-tickets/orlando-florida-the-plaza-live-2027-02-23-7-30-pm/concert/18540443 | - |
| tm-alan-walker-2027-pittsburgh-z7r9jz1aavt46 | alan-walker | verify (applied) | 18595139 | https://seatgeek.com/alan-walker-tickets/pittsburgh-pennsylvania-stage-ae-2027-02-23-8-pm/concert/18595139 | - |
| tm-needtobreathe-2027-kansas-city-z7r9jz1aaek_i | needtobreathe | verify (applied) | 18621528 | https://seatgeek.com/needtobreathe-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-02-23-7-pm/concert/18621528 | - |
| tm-mico-2027-jacksonville-z7r9jz1aa7a4e | mico | verify (applied) | 18685771 | https://seatgeek.com/mico-tickets/jacksonville-florida-five-jacksonville-2027-02-23-8-pm/concert/18685771 | - |
| tm-valley-2027-victoria-z7r9jz1aavgoz | valley | verify (applied) | 18606164 | https://seatgeek.com/valley-tickets/victoria-canada-capital-ballroom-2027-02-23-8-pm/concert/18606164 | - |
| tm-sylvan-esso-2027-portland-z7r9jz1a7pf-7 | sylvan-esso | verify (applied) | 18299164 | https://seatgeek.com/sylvan-esso-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-02-23-8-30-pm/concert/18299164 | - |
| tm-alan-walker-2027-columbus-z7r9jz1aavt4f | alan-walker | verify (applied) | 18595141 | https://seatgeek.com/alan-walker-tickets/columbus-ohio-kemba-live-2027-02-24-8-pm/concert/18595141 | - |
| tm-mei-semones-2027-cambridge-z7r9jz1aaebpz | mei-semones | verify (applied) | 18702716 | https://seatgeek.com/mei-semones-tickets/cambridge-massachusetts-the-sinclair-cambridge-2027-02-24-8-pm/concert/18702716 | - |
| tm-dinosaur-jr-2027-athens-z7r9jz1aavk1o | dinosaur-jr | verify (applied) | 18540444 | https://seatgeek.com/dinosaur-jr-tickets/athens-georgia-georgia-theatre-2027-02-25-7-pm/concert/18540444 | - |
| tm-tommy-emmanuel-2027-loveland-z7r9jz1aa791k | tommy-emmanuel | verify (applied) | 18704552 | https://seatgeek.com/tommy-emmanuel-tickets/loveland-colorado-rialto-theater-center-2027-02-25-7-30-pm/concert/18704552 | - |
| tm-elevation-worship-2027-spokane-z7r9jz1aavwus | elevation-worship | verify (applied) | 18723495 | https://seatgeek.com/elevation-worship-tickets/spokane-washington-numerica-veterans-arena-2027-02-25-7-pm/concert/18723495 | - |
| tm-the-red-clay-strays-2027-jacksonville-z7r9jz1aaef4f | the-red-clay-strays | verify (applied) | 18639134 | https://seatgeek.com/the-red-clay-strays-tickets/jacksonville-florida-vystar-veterans-memorial-arena-2027-02-26-7-pm/concert/18639134 | - |
| tm-yacht-rock-revue-2027-athens-z7r9jz1aa7oam | yacht-rock-revue | verify (applied) | 18686093 | https://seatgeek.com/yacht-rock-revue-tickets/athens-georgia-georgia-theatre-2027-02-26-8-pm/concert/18686093 | - |
| tm-yacht-rock-revue-2027-atlanta-z7r9jz1aa7oau | yacht-rock-revue | verify (applied) | 18687365 | https://seatgeek.com/yacht-rock-revue-tickets/atlanta-georgia-the-eastern-atlanta-2027-02-27-8-pm/concert/18687365 | - |
| tm-michelle-branch-2027-nashville-z7r9jz1aazma_ | michelle-branch | verify (applied) | 18508824 | https://seatgeek.com/michelle-branch-tickets/nashville-tennessee-ryman-auditorium-2027-02-27-8-pm/concert/18508824 | - |
| tm-blue-october-2027-portland-z7r9jz1a70_-u | blue-october | verify (applied) | 18704137 | https://seatgeek.com/blue-october-tickets/portland-oregon-roseland-theater-2027-02-27-8-pm/concert/18704137 | - |
| tm-valley-2027-portland-z7r9jz1aavzfs | valley | verify (applied) | 18670132 | https://seatgeek.com/valley-tickets/portland-oregon-wonder-ballroom-2027-02-27-8-pm/concert/18670132 | - |
| tm-michelle-branch-2027-nashville-z7r9jz1aazyfg | michelle-branch | verify (applied) | 18517279 | https://seatgeek.com/michelle-branch-tickets/nashville-tennessee-ryman-auditorium-2027-02-28-8-pm/concert/18517279 | - |
| tm-blue-october-2027-portland-z7r9jz1a70of9 | blue-october | verify (applied) | 18716616 | https://seatgeek.com/blue-october-tickets/portland-oregon-roseland-theater-2027-02-28-8-pm/concert/18716616 | - |
| tm-needtobreathe-2027-lancaster-z7r9jz1aaek_t | needtobreathe | verify (applied) | 18621540 | https://seatgeek.com/needtobreathe-tickets/lancaster-pennsylvania-american-music-theatre-2027-03-01-7-pm/concert/18621540 | - |
| tm-valley-2027-san-francisco-z7r9jz1aavzfv | valley | verify (applied) | 18690439 | https://seatgeek.com/valley-tickets/san-francisco-california-the-independent-2027-03-01-8-pm/concert/18690439 | - |
| tm-greta-van-fleet-2027-cleveland-z7r9jz1aae44m | greta-van-fleet | verify (applied) | 18611175 | https://seatgeek.com/greta-van-fleet-tickets/cleveland-ohio-rocket-arena-2027-03-03-7-pm/concert/18611175 | - |
| tm-daughtry-2027-charlottesville-z7r9jz1aae83f | daughtry | verify (applied) | 18632936 | https://seatgeek.com/daughtry-tickets/charlottesville-virginia-paramount-theater-charlottesville-2027-03-03-7-pm/concert/18632936 | - |
| tm-alan-walker-2027-seattle-z7r9jz1aavt4a | alan-walker | verify (applied) | 18595143 | https://seatgeek.com/alan-walker-tickets/seattle-washington-showbox-sodo-2027-03-03-8-pm/concert/18595143 | - |
| tm-dinosaur-jr-2027-minneapolis-z7r9jz1aav8op | dinosaur-jr | verify (applied) | 18540453 | https://seatgeek.com/dinosaur-jr-tickets/minneapolis-minnesota-first-avenue-minneapolis-2027-03-04-8-pm/concert/18540453 | - |
| tm-sylvan-esso-2027-salt-lake-city-z7r9jz1a7pxjk | sylvan-esso | verify (applied) | 18299176 | https://seatgeek.com/sylvan-esso-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-03-04-8-pm/concert/18299176 | - |
| tm-alan-walker-2027-portland-z7r9jz1aavt48 | alan-walker | verify (applied) | 18595145 | https://seatgeek.com/alan-walker-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-03-04-8-pm/concert/18595145 | - |
| tm-theory-of-a-deadman-2027-halifax-z7r9jz1aav0ak | theory-of-a-deadman | verify (applied) | 18570534 | https://seatgeek.com/theory-of-a-deadman-tickets/halifax-canada-light-house-arts-centre-2027-03-05-8-pm/concert/18570534 | - |
| tm-michelle-branch-2027-tulsa-z7r9jz1aazuoa | michelle-branch | verify (applied) | 18508826 | https://seatgeek.com/michelle-branch-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-03-05-7-30-pm/concert/18508826 | - |
| tm-pink-martini-2027-colorado-springs-z7r9jz1aaztzk | pink-martini | verify (applied) | 18660140 | https://seatgeek.com/pink-martini-tickets/colorado-springs-colorado-pikes-peak-center-2027-03-05-7-30-pm/concert/18660140 | - |
| tm-blue-october-2027-salt-lake-city-z7r9jz1a70te4 | blue-october | verify (applied) | 18717561 | https://seatgeek.com/blue-october-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-03-05-8-pm/concert/18717561 | - |
| tm-dylan-scott-2027-spokane-z7r9jz1aavsvm | dylan-scott | verify (applied) | 18603382 | https://seatgeek.com/dylan-scott-tickets/spokane-washington-first-interstate-center-for-the-arts-2027-03-05-7-30-pm/concert/18603382 | - |
| tm-the-lemonheads-2027-roseville-z7r9jz1aavy-u | the-lemonheads | verify (applied) | 18595332 | https://seatgeek.com/the-lemonheads-tickets/roseville-california-goldfield-trading-post-roseville-2027-03-05-7-pm/concert/18595332 | - |
| tm-sylvan-esso-2027-denver-z7r9jz1a7pf46 | sylvan-esso | verify (applied) | 18299177 | https://seatgeek.com/sylvan-esso-tickets/denver-colorado-ogden-theatre-2027-03-05-9-pm/concert/18299177 | - |
| tm-earth-wind-fire-2027-west-palm-beach-z7r9jz1aaea-g | earth-wind-fire | verify (applied) | 18689366 | https://seatgeek.com/earth-wind-fire-tickets/west-palm-beach-florida-kravis-center-dreyfoos-hall-2027-03-06-7-pm/concert/18689366 | - |
| tm-mei-semones-2027-new-york-z7r9jz1aaebpe | mei-semones | verify (applied) | 18658871 | https://seatgeek.com/mei-semones-tickets/new-york-new-york-webster-hall-2027-03-06-7-30-pm/concert/18658871 | - |
| tm-tobymac-2027-cape-girardeau-z7r9jz1aav8-f | tobymac | verify (applied) | 18548872 | https://seatgeek.com/tobymac-tickets/cape-girardeau-missouri-show-me-center-2027-03-06-7-pm/concert/18548872 | - |
| tm-the-neighbourhood-2027-houston-z7r9jz1aa7ypb | the-neighbourhood | verify (applied) | 18726903 | https://seatgeek.com/the-neighbourhood-tickets/houston-texas-toyota-center-2027-03-06-7-pm/concert/18726903 | - |
| tm-pink-martini-2027-colorado-springs-z7r9jz1a7joxz | pink-martini | verify (applied) | 18500192 | https://seatgeek.com/pink-martini-tickets/colorado-springs-colorado-pikes-peak-center-2027-03-06-7-30-pm/concert/18500192 | - |
| tm-blue-october-2027-denver-z7r9jz1a70_-g | blue-october | verify (applied) | 18262264 | https://seatgeek.com/blue-october-tickets/denver-colorado-mission-ballroom-2027-03-06-8-pm/concert/18262264 | - |
| tm-dylan-scott-2027-wenatchee-z7r9jz1aavs7z | dylan-scott | verify (applied) | 18603381 | https://seatgeek.com/dylan-scott-tickets/wenatchee-washington-town-toyota-center-2027-03-06-7-30-pm/concert/18603381 | - |
| tm-sylvan-esso-2027-denver-z7r9jz1a7pj-s | sylvan-esso | verify (applied) | 18675732 | https://seatgeek.com/sylvan-esso-tickets/denver-colorado-ogden-theatre-2027-03-06-9-pm/concert/18675732 | - |
| tm-remi-wolf-2027-detroit-z7r9jz1aa7k0m | remi-wolf | verify (applied) | 18664757 | https://seatgeek.com/remi-wolf-tickets/detroit-michigan-the-masonic-temple-theatre-detroit-2027-03-07-7-pm/concert/18664757 | - |
| tm-blue-october-2027-colorado-springs-z7r9jz1a70_p7 | blue-october | verify (applied) | 18306113 | https://seatgeek.com/blue-october-tickets/colorado-springs-colorado-pikes-peak-center-2027-03-07-8-pm/concert/18306113 | - |
| tm-blondshell-2027-seattle-z7r9jz1a70ere | blondshell | verify (applied) | 18251042 | https://seatgeek.com/blondshell-tickets/seattle-washington-showbox-sodo-2027-03-07-8-pm/concert/18251042 | - |
| tm-sylvan-esso-2027-austin-z7r9jz1a7pxj7 | sylvan-esso | verify (applied) | 18299178 | https://seatgeek.com/sylvan-esso-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-03-08-8-pm/concert/18299178 | - |
| tm-chelsea-cutler-2027-salt-lake-city-z7r9jz1aaefp4 | chelsea-cutler | verify (applied) | 18639209 | https://seatgeek.com/chelsea-cutler-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-03-09-7-pm/concert/18639209 | - |
| tm-mico-2027-columbus-z7r9jz1aa7_pz | mico | verify (applied) | 18702224 | https://seatgeek.com/mico-tickets/columbus-ohio-newport-music-hall-2027-03-10-7-pm/concert/18702224 | - |
| tm-the-lemonheads-2027-portland-z7r9jz1aavv7i | the-lemonheads | verify (applied) | 18595335 | https://seatgeek.com/the-lemonheads-tickets/portland-oregon-hawthorne-theatre-2027-03-10-7-pm/concert/18595335 | - |
| tm-blue-october-2027-chicago-z7r9jz1a70_-s | blue-october | verify (applied) | 18343763 | https://seatgeek.com/blue-october-tickets/chicago-illinois-riviera-theatre-chicago-2027-03-11-8-pm/concert/18343763 | - |
| tm-yuridia-2027-sugar-land-z7r9jz1aav-_t | yuridia | verify (applied) | 18570402 | https://seatgeek.com/yuridia-tickets/sugar-land-texas-smart-financial-centre-2027-03-11-8-pm/concert/18570402 | - |
| tm-the-lemonheads-2027-seattle-z7r9jz1aa79u7 | the-lemonheads | verify (applied) | 18595337 | https://seatgeek.com/the-lemonheads-tickets/seattle-washington-el-corazon-2027-03-11-7-pm/concert/18595337 | - |
| tm-morat-2027-grand-prairie-z7r9jz1a70iu_ | morat | verify (applied) | 18259792 | https://seatgeek.com/morat-tickets/grand-prairie-texas-texas-trust-cu-theatre-2027-03-12-8-pm/concert/18259792 | - |
| tm-blondshell-2027-chicago-z7r9jz1a70ubv | blondshell | verify (applied) | 18251049 | https://seatgeek.com/blondshell-tickets/chicago-illinois-vic-theatre-chicago-2027-03-12-8-pm/concert/18251049 | - |
| tm-fantasia-2027-houston-z7r9jz1aa74o6 | fantasia | verify (applied) | 18643133 | https://seatgeek.com/fantasia-tickets/houston-texas-toyota-center-2027-03-12-8-pm/concert/18643133 | - |
| tm-chelsea-cutler-2027-seattle-z7r9jz1aae_g9 | chelsea-cutler | verify (applied) | 18639214 | https://seatgeek.com/chelsea-cutler-tickets/seattle-washington-showbox-sodo-2027-03-12-7-pm/concert/18639214 | - |
| tm-tobymac-2027-lubbock-z7r9jz1aav8o_ | tobymac | verify (applied) | 18548874 | https://seatgeek.com/tobymac-tickets/lubbock-texas-united-supermarkets-arena-2027-03-13-7-pm/concert/18548874 | - |
| tm-morat-2027-sugar-land-z7r9jz1a70iu- | morat | verify (applied) | 18259793 | https://seatgeek.com/morat-tickets/sugar-land-texas-smart-financial-centre-2027-03-13-8-pm/concert/18259793 | - |
| tm-chelsea-cutler-2027-portland-z7r9jz1aae_gb | chelsea-cutler | verify (applied) | 18639215 | https://seatgeek.com/chelsea-cutler-tickets/portland-oregon-roseland-theater-2027-03-13-7-pm/concert/18639215 | - |
| tm-vnv-nation-2027-atlanta-z7r9jz1a7jvoo | vnv-nation | verify (applied) | 17912521 | https://seatgeek.com/vnv-nation-tickets/atlanta-georgia-variety-playhouse-2027-03-14-8-pm/concert/17912521 | - |
| tm-death-cab-for-cutie-2027-atlanta-z7r9jz1aavufx | death-cab-for-cutie | verify (applied) | 18604670 | https://seatgeek.com/death-cab-for-cutie-tickets/atlanta-georgia-the-eastern-atlanta-2027-03-14-8-pm/concert/18604670 | - |
| tm-blondshell-2027-philadelphia-z7r9jz1a70gjs | blondshell | verify (applied) | 18251054 | https://seatgeek.com/blondshell-tickets/philadelphia-pennsylvania-union-transfer-philadelphia-2027-03-14-8-pm/concert/18251054 | - |
| tm-the-lemonheads-2027-englewood-z7r9jz1aavvvk | the-lemonheads | verify (applied) | 18595343 | https://seatgeek.com/the-lemonheads-tickets/englewood-colorado-gothic-theatre-2027-03-14-8-30-pm/concert/18595343 | - |
| tm-death-cab-for-cutie-2027-atlanta-z7r9jz1aavuf- | death-cab-for-cutie | verify (applied) | 18604671 | https://seatgeek.com/death-cab-for-cutie-tickets/atlanta-georgia-the-eastern-atlanta-2027-03-15-8-pm/concert/18604671 | - |
| tm-rod-stewart-2027-saint-augustine-z7r9jz1aavybs | rod-stewart | verify (applied) | 18603490 | https://seatgeek.com/rod-stewart-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-03-16-7-30-pm/concert/18603490 | - |
| tm-the-lemonheads-2027-omaha-z7r9jz1aavv7w | the-lemonheads | verify (applied) | 18595344 | https://seatgeek.com/the-lemonheads-tickets/omaha-nebraska-the-waiting-room-omaha-2027-03-16-7-pm/concert/18595344 | - |
| tm-death-cab-for-cutie-2027-saint-augustine-z7r9jz1aavgpy | death-cab-for-cutie | verify (applied) | 18604673 | https://seatgeek.com/death-cab-for-cutie-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-03-17-7-pm/concert/18604673 | - |
| tm-valley-2027-new-york-z7r9jz1aavzfm | valley | verify (applied) | 18643169 | https://seatgeek.com/valley-tickets/new-york-new-york-webster-hall-2027-03-17-8-pm/concert/18643169 | - |
| tm-niall-horan-2027-saint-paul-z7r9jz1a704vb | niall-horan | verify (applied) | 18235523 | https://seatgeek.com/niall-horan-tickets/saint-paul-minnesota-grand-casino-arena-2027-03-17-7-30-pm/concert/18235523 | - |
| tm-michelle-branch-2027-denver-z7r9jz1aavkbw | michelle-branch | verify (applied) | 18650112 | https://seatgeek.com/michelle-branch-tickets/denver-colorado-mission-ballroom-2027-03-17-8-pm/concert/18650112 | - |
| tm-interpol-2027-san-antonio-z7r9jz1aa70ja | interpol | verify (applied) | 18710345 | https://seatgeek.com/interpol-tickets/san-antonio-texas-the-espee-2027-03-18-7-30-pm/concert/18710345 | - |
| tm-vnv-nation-2027-mesa-z7r9jz1a7qp8u | vnv-nation | verify (applied) | 18165972 | https://seatgeek.com/vnv-nation-tickets/mesa-arizona-nile-theater-mesa-2027-03-18-8-pm/concert/18165972 | - |
| tm-yuridia-2027-edinburg-z7r9jz1aav-_y | yuridia | verify (applied) | 18570410 | https://seatgeek.com/yuridia-tickets/edinburg-texas-bert-ogden-arena-2027-03-19-8-pm/concert/18570410 | - |
| tm-hans-zimmer-2027-kansas-city-z7r9jz1aavvq6 | hans-zimmer | verify (applied) | 18601968 | https://seatgeek.com/hans-zimmer-tickets/kansas-city-missouri-t-mobile-center-2027-03-19-8-pm/concert/18601968 | - |
| tm-michelle-branch-2027-columbus-z7r9jz1aazmzz | michelle-branch | verify (applied) | 18508844 | https://seatgeek.com/michelle-branch-tickets/columbus-ohio-kemba-live-2027-03-20-8-pm/concert/18508844 | - |
| tm-interpol-2027-dallas-z7r9jz1aa7sce | interpol | verify (applied) | 18710347 | https://seatgeek.com/interpol-tickets/dallas-texas-the-bomb-factory-dallas-2027-03-20-8-pm/concert/18710347 | - |
| tm-michelle-branch-2027-royal-oak-z7r9jz1aazmje | michelle-branch | verify (applied) | 18508847 | https://seatgeek.com/michelle-branch-tickets/royal-oak-michigan-royal-oak-music-theatre-2027-03-21-7-pm/concert/18508847 | - |
| tm-pink-martini-2027-charlottesville-z7r9jz1aav-zj | pink-martini | verify (applied) | 18670185 | https://seatgeek.com/pink-martini-tickets/charlottesville-virginia-paramount-theater-charlottesville-2027-03-21-7-30-pm/concert/18670185 | - |
| tm-hans-zimmer-2027-oklahoma-city-z7r9jz1aavvqf | hans-zimmer | verify (applied) | 18601969 | https://seatgeek.com/hans-zimmer-tickets/oklahoma-city-oklahoma-paycom-center-2027-03-21-7-30-pm/concert/18601969 | - |
| tm-cece-winans-2027-nashville-z7r9jz1aaebzs | cece-winans | verify (applied) | 18237649 | https://seatgeek.com/cece-winans-tickets/nashville-tennessee-grand-ole-opry-house-2027-03-21-7-30-pm/concert/18237649 | - |
| tm-blondshell-2027-brooklyn-z7r9jz1a70gjw | blondshell | verify (applied) | 18251059 | https://seatgeek.com/blondshell-tickets/brooklyn-new-york-brooklyn-steel-2027-03-22-8-pm/concert/18251059 | - |
| tm-theory-of-a-deadman-2027-regina-z7r9jz1aavxpg | theory-of-a-deadman | verify (applied) | 18570554 | https://seatgeek.com/theory-of-a-deadman-tickets/regina-canada-conexus-arts-centre-2027-03-22-8-pm/concert/18570554 | - |
| tm-lola-young-2027-nashville-z7r9jz1aaebv0 | lola-young | verify (applied) | 18649730 | https://seatgeek.com/lola-young-tickets/nashville-tennessee-the-pinnacle-nashville-2027-04-06-8-pm/concert/18649730 | - |
| tm-the-psychedelic-furs-2027-tallahassee-z7r9jz1aavsop | the-psychedelic-furs | verify (applied) | 18592691 | https://seatgeek.com/the-psychedelic-furs-tickets/tallahassee-florida-the-moon-2027-04-07-7-30-pm/concert/18592691 | - |
| tm-foy-vance-2027-atlanta-z7r9jz1a7--ka | foy-vance | verify (applied) | 18085786 | https://seatgeek.com/foy-vance-tickets/atlanta-georgia-variety-playhouse-2027-04-08-7-pm/concert/18085786 | - |
| tm-the-psychedelic-furs-2027-saint-petersburg-z7r9jz1aavsof | the-psychedelic-furs | verify (applied) | 18592671 | https://seatgeek.com/the-psychedelic-furs-tickets/saint-petersburg-florida-jannus-live-2027-04-08-8-pm/concert/18592671 | - |
| tm-dylan-gossett-2027-columbus-z7r9jz1aae4by | dylan-gossett | verify (applied) | 18642098 | https://seatgeek.com/dylan-gossett-tickets/columbus-ohio-kemba-live-2027-04-08-7-pm/concert/18642098 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavp49 | harry-styles | verify (applied) | 18516103 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-09-7-45-pm/concert/18516103 | - |
| tm-nothing-but-thieves-2027-denver-z7r9jz1a70g46 | nothing-but-thieves | verify (applied) | 18266350 | https://seatgeek.com/nothing-but-thieves-tickets/denver-colorado-mission-ballroom-2027-04-09-8-pm/concert/18266350 | - |
| tm-warren-zeiders-2027-fort-worth-z7r9jz1aaeb7s | warren-zeiders | verify (applied) | 18649744 | https://seatgeek.com/warren-zeiders-tickets/fort-worth-texas-billy-bob-s-texas-2027-04-09-7-pm/concert/18649744 | - |
| tm-luke-combs-2027-minneapolis-z7r9jz1aazgx6 | luke-combs | verify (applied) | 18493422 | https://seatgeek.com/luke-combs-tickets/minneapolis-minnesota-u-s-bank-stadium-2027-04-10-5-45-pm/concert/18493422 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavp4p | harry-styles | verify (applied) | 18577780 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-10-7-45-pm/concert/18577780 | - |
| tm-warren-zeiders-2027-helotes-z7r9jz1aaeb7v | warren-zeiders | verify (applied) | 18649752 | https://seatgeek.com/warren-zeiders-tickets/helotes-texas-john-t-floore-country-store-2027-04-10-7-pm/concert/18649752 | - |
| tm-niall-horan-2027-hartford-z7r9jz1a709uz | niall-horan | verify (applied) | 18235537 | https://seatgeek.com/niall-horan-tickets/hartford-connecticut-peoplesbank-arena-2027-04-13-7-30-pm/concert/18235537 | - |
| tm-lola-young-2027-boston-z7r9jz1aaebvp | lola-young | verify (applied) | 18649732 | https://seatgeek.com/lola-young-tickets/boston-massachusetts-roadrunner-boston-2027-04-13-8-pm/concert/18649732 | - |
| tm-earth-wind-fire-2027-saint-augustine-z7r9jz1aaeb-p | earth-wind-fire | verify (applied) | 18664856 | https://seatgeek.com/earth-wind-fire-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-04-14-7-30-pm/concert/18664856 | - |
| tm-the-psychedelic-furs-2027-jacksonville-z7r9jz1a703oe | the-psychedelic-furs | verify (applied) | 18592675 | https://seatgeek.com/the-psychedelic-furs-tickets/jacksonville-florida-florida-theatre-jacksonville-2027-04-14-8-pm/concert/18592675 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavszi | harry-styles | verify (applied) | 18584154 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-14-7-45-pm/concert/18584154 | - |
| tm-foy-vance-2027-saint-paul-z7r9jz1a7jfgw | foy-vance | verify (applied) | 18085797 | https://seatgeek.com/foy-vance-tickets/saint-paul-minnesota-fitzgerald-theater-2027-04-15-7-pm/concert/18085797 | - |
| tm-lola-young-2027-toronto-z7r9jz1aaebvx | lola-young | verify (applied) | 18649734 | https://seatgeek.com/lola-young-tickets/toronto-canada-massey-hall-2027-04-15-8-pm/concert/18649734 | - |
| tm-mercyme-2027-grand-prairie-z7r9jz1aa74jn | mercyme | verify (applied) | 18692264 | https://seatgeek.com/mercyme-tickets/grand-prairie-texas-texas-trust-cu-theatre-2027-04-15-7-pm/concert/18692264 | - |
| tm-meshuggah-2027-vancouver-z7r9jz1aa7tay | meshuggah | verify (applied) | 18724665 | https://seatgeek.com/meshuggah-tickets/vancouver-canada-pne-forum-vancouver-2027-04-15-7-pm/concert/18724665 | - |
| tm-staind-2027-cleveland-z7r9jz1aae_q- | staind | verify (applied) | 18589059 | https://seatgeek.com/staind-tickets/cleveland-ohio-rocket-arena-2027-04-16-6-pm/concert/18589059 | - |
| tm-warren-zeiders-2027-louisville-z7r9jz1aaeb7g | warren-zeiders | verify (applied) | 18649753 | https://seatgeek.com/warren-zeiders-tickets/louisville-kentucky-old-forester-s-paristown-hall-2027-04-16-7-pm/concert/18649753 | - |
| tm-lola-young-2027-toronto-z7r9jz1aaebvn | lola-young | verify (applied) | 18649736 | https://seatgeek.com/lola-young-tickets/toronto-canada-massey-hall-2027-04-16-8-pm/concert/18649736 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavsoa | harry-styles | verify (applied) | 18584157 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-16-7-45-pm/concert/18584157 | - |
| tm-nickelback-2027-las-vegas-z7r9jz1aa7746 | nickelback | verify (applied) | 18664612 | https://seatgeek.com/nickelback-tickets/las-vegas-nevada-t-mobile-arena-2027-04-16-6-30-pm/concert/18664612 | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavw00 | harry-styles | verify (applied) | 18584160 | https://seatgeek.com/harry-styles-tickets/arlington-texas-at-t-stadium-2027-04-17-7-45-pm/concert/18584160 | - |
| tm-the-warning-2027-las-vegas-z7r9jz1aavtgx | the-warning | verify (applied) | 18590177 | https://seatgeek.com/the-warning-tickets/las-vegas-nevada-pearl-concert-theater-at-palms-casino-resort-2027-04-17-8-pm/concert/18590177 | - |
| tm-carly-rae-jepsen-2027-portland-z7r9jz1aaekuy | carly-rae-jepsen | verify (applied) | 18639014 | https://seatgeek.com/carly-rae-jepsen-tickets/portland-oregon-arlene-schnitzer-concert-hall-2027-04-19-7-30-pm/concert/18639014 | - |
| tm-the-psychedelic-furs-2027-norfolk-z7r9jz1aavs4p | the-psychedelic-furs | verify (applied) | 18592697 | https://seatgeek.com/the-psychedelic-furs-tickets/norfolk-virginia-the-norva-norfolk-2027-04-20-7-30-pm/concert/18592697 | - |
| tm-mei-semones-2027-tucson-z7r9jz1aae9f6 | mei-semones | verify (applied) | 18645989 | https://seatgeek.com/mei-semones-tickets/tucson-arizona-la-rosa-tucson-2027-04-20-8-pm/concert/18645989 | - |
| tm-fkj-2027-portland-z7r9jz1a7pdgd | fkj | verify (applied) | 18282296 | https://seatgeek.com/fkj-tickets/portland-oregon-mcmenamins-crystal-ballroom-2027-04-20-8-pm/concert/18282296 | - |
| tm-the-warning-2027-san-francisco-z7r9jz1aavtgn | the-warning | verify (applied) | 18593338 | https://seatgeek.com/the-warning-tickets/san-francisco-california-the-warfield-2027-04-20-8-pm/concert/18593338 | - |
| tm-earth-wind-fire-2027-huntsville-z7r9jz1aaeb18 | earth-wind-fire | verify (applied) | 18689500 | https://seatgeek.com/earth-wind-fire-tickets/huntsville-alabama-orion-amphitheater-2027-04-21-7-30-pm/concert/18689500 | - |
| tm-meshuggah-2027-morrison-z7r9jz1aa7e-0 | meshuggah | verify (applied) | 18724675 | https://seatgeek.com/meshuggah-tickets/morrison-colorado-red-rocks-amphitheatre-2027-04-21-7-pm/concert/18724675 | - |
| tm-nickelback-2027-salt-lake-city-z7r9jz1aa774a | nickelback | verify (applied) | 18647743 | https://seatgeek.com/nickelback-tickets/salt-lake-city-utah-delta-center-1-2027-04-22-6-30-pm/concert/18647743 | - |
| tm-the-warning-2027-portland-z7r9jz1aavtg0 | the-warning | verify (applied) | 18593342 | https://seatgeek.com/the-warning-tickets/portland-oregon-roseland-theater-2027-04-22-8-pm/concert/18593342 | - |
| tm-foy-vance-2027-ardmore-z7r9jz1aa7_fo | foy-vance | verify (applied) | 18370696 | https://seatgeek.com/foy-vance-tickets/ardmore-pennsylvania-the-ardmore-music-hall-2027-04-23-8-pm/concert/18370696 | - |
| tm-calvin-harris-2027-houston-z7r9jz1aa76pk | calvin-harris | verify (applied) | 18674838 | https://seatgeek.com/calvin-harris-tickets/houston-texas-toyota-center-2027-04-23-8-pm/concert/18674838 | - |
| tm-fkj-2027-seattle-z7r9jz1a7pduz | fkj | verify (applied) | 18282297 | https://seatgeek.com/fkj-tickets/seattle-washington-showbox-sodo-2027-04-23-8-pm/concert/18282297 | - |
| tm-mei-semones-2027-los-angeles-z7r9jz1aa7e-9 | mei-semones | verify (applied) | 18662617 | https://seatgeek.com/mei-semones-tickets/los-angeles-california-the-fonda-theatre-2027-04-23-9-pm/concert/18662617 | - |
| tm-fantasia-2027-las-vegas-z7r9jz1aaef4j | fantasia | verify (applied) | 18632945 | https://seatgeek.com/fantasia-tickets/las-vegas-nevada-mgm-grand-garden-arena-2027-04-24-8-pm/concert/18632945 | - |
| tm-carly-rae-jepsen-2027-morrison-z7r9jz1aaekuz | carly-rae-jepsen | verify (applied) | 18639047 | https://seatgeek.com/carly-rae-jepsen-tickets/morrison-colorado-red-rocks-amphitheatre-2027-04-25-7-30-pm/concert/18639047 | - |
| tm-the-warning-2027-vancouver-z7r9jz1aavjo7 | the-warning | verify (applied) | 18590212 | https://seatgeek.com/the-warning-tickets/vancouver-canada-vogue-theatre-bc-1-2027-04-25-7-pm/concert/18590212 | - |
| tm-def-leppard-2027-kansas-city-z7r9jz1aa7eof | def-leppard | verify (applied) | 18662412 | https://seatgeek.com/def-leppard-tickets/kansas-city-missouri-t-mobile-center-2027-04-26-7-pm/concert/18662412 | - |
| tm-foy-vance-2027-york-z7r9jz1a7pnjx | foy-vance | verify (applied) | 18387603 | https://seatgeek.com/foy-vance-tickets/york-pennsylvania-appell-center-for-the-performing-arts-capitol-theatre-2027-04-27-7-pm/concert/18387603 | - |
| tm-carly-rae-jepsen-2027-salt-lake-city-z7r9jz1aaekuv | carly-rae-jepsen | verify (applied) | 18639063 | https://seatgeek.com/carly-rae-jepsen-tickets/salt-lake-city-utah-the-complex-2027-04-27-7-30-pm/concert/18639063 | - |
| tm-zach-bryan-2027-minneapolis-z7r9jz1aa7kad | zach-bryan | verify (applied) | 18686652 | https://seatgeek.com/zach-bryan-tickets/minneapolis-minnesota-u-s-bank-stadium-2027-04-28-7-pm/concert/18686652 | - |
| tm-fkj-2027-salt-lake-city-z7r9jz1a7pk0m | fkj | verify (applied) | 18282298 | https://seatgeek.com/fkj-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-04-28-8-pm/concert/18282298 | - |
| tm-the-red-clay-strays-2027-lubbock-z7r9jz1aaef4t | the-red-clay-strays | verify (applied) | 18639092 | https://seatgeek.com/the-red-clay-strays-tickets/lubbock-texas-cook-s-garage-2027-04-29-7-pm/concert/18639092 | - |
| tm-nickelback-2027-houston-z7r9jz1aa774o | nickelback | verify (applied) | 18664619 | https://seatgeek.com/nickelback-tickets/houston-texas-toyota-center-2027-04-29-6-30-pm/concert/18664619 | - |
| tm-calvin-harris-2027-saint-paul-z7r9jz1aa76pf | calvin-harris | verify (applied) | 18665651 | https://seatgeek.com/calvin-harris-tickets/saint-paul-minnesota-grand-casino-arena-2027-04-29-8-pm/concert/18665651 | - |
| tm-fkj-2027-denver-z7r9jz1a7pk0s | fkj | verify (applied) | 18282299 | https://seatgeek.com/fkj-tickets/denver-colorado-mission-ballroom-2027-04-29-8-pm/concert/18282299 | - |
| tm-ha-ash-2027-portland-z7r9jz1aavz-k | ha-ash | verify (applied) | 18608867 | https://seatgeek.com/ha-ash-tickets/portland-oregon-keller-auditorium-2027-04-29-8-pm/concert/18608867 | - |
| tm-lizzy-mcalpine-2027-dallas-z7r9jz1aaekq3 | lizzy-mcalpine | verify (applied) | 18619417 | https://seatgeek.com/lizzy-mcalpine-tickets/dallas-texas-the-bomb-factory-dallas-2027-04-30-7-pm/concert/18619417 | - |
| tm-the-warning-2027-san-antonio-z7r9jz1aavtf4 | the-warning | verify (applied) | 18591754 | https://seatgeek.com/the-warning-tickets/san-antonio-texas-boeing-center-at-tech-port-2027-04-30-8-pm/concert/18591754 | - |
| tm-kenny-chesney-2027-greenville-z7r9jz1aavsad | kenny-chesney | verify (applied) | 18570962 | https://seatgeek.com/kenny-chesney-tickets/greenville-north-carolina-dowdy-ficklen-stadium-2027-05-01-4-30-pm/concert/18570962 | - |
| tm-gavin-adcock-2027-saint-augustine-z7r9jz1aa76gg | gavin-adcock | verify (applied) | 18676336 | https://seatgeek.com/gavin-adcock-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-05-01-7-pm/concert/18676336 | - |
| tm-meshuggah-2027-san-antonio-z7r9jz1aa7e0a | meshuggah | verify (applied) | 18724684 | https://seatgeek.com/meshuggah-tickets/san-antonio-texas-boeing-center-at-tech-port-2027-05-01-7-pm/concert/18724684 | - |
| tm-niall-horan-2027-houston-z7r9jz1a709uy | niall-horan | verify (applied) | 18235544 | https://seatgeek.com/niall-horan-tickets/houston-texas-toyota-center-2027-05-01-7-30-pm/concert/18235544 | - |
| tm-ha-ash-2027-highland-z7r9jz1aavz-m | ha-ash | verify (applied) | 18608868 | https://seatgeek.com/ha-ash-tickets/highland-california-yaamava-theater-at-yaamava-resort-and-casino-2027-05-01-8-pm/concert/18608868 | - |
| tm-lizzy-mcalpine-2027-atlanta-z7r9jz1aaea-b | lizzy-mcalpine | verify (applied) | 18619419 | https://seatgeek.com/lizzy-mcalpine-tickets/atlanta-georgia-fox-theatre-atlanta-2027-05-03-7-pm/concert/18619419 | - |
| tm-the-warning-2027-atlanta-z7r9jz1aavtgj | the-warning | verify (applied) | 18593340 | https://seatgeek.com/the-warning-tickets/atlanta-georgia-the-eastern-atlanta-2027-05-04-8-pm/concert/18593340 | - |
| tm-calvin-harris-2027-salt-lake-city-z7r9jz1aa76p8 | calvin-harris | verify (applied) | 18659029 | https://seatgeek.com/calvin-harris-tickets/salt-lake-city-utah-delta-center-1-2027-05-05-8-pm/concert/18659029 | - |
| tm-lizzy-mcalpine-2027-columbus-z7r9jz1aaea09 | lizzy-mcalpine | verify (applied) | 18619421 | https://seatgeek.com/lizzy-mcalpine-tickets/columbus-ohio-palace-theatre-columbus-2027-05-06-7-pm/concert/18619421 | - |
| tm-two-door-cinema-club-2027-chicago-z7r9jz1aa7p88 | two-door-cinema-club | verify (applied) | 18711333 | https://seatgeek.com/two-door-cinema-club-tickets/chicago-illinois-riviera-theatre-chicago-2027-05-06-7-30-pm/concert/18711333 | - |
| tm-too-many-zooz-2027-tucson-z7r9jz1aavmvf | too-many-zooz | verify (applied) | 18613218 | https://seatgeek.com/too-many-zooz-tickets/tucson-arizona-la-rosa-tucson-2027-05-06-8-pm/concert/18613218 | - |
| tm-gavin-adcock-2027-oklahoma-city-z7r9jz1aa76gu | gavin-adcock | verify (applied) | 18676332 | https://seatgeek.com/gavin-adcock-tickets/oklahoma-city-oklahoma-the-zoo-amphitheatre-2027-05-07-7-30-pm/concert/18676332 | - |
| tm-zach-bryan-2027-chicago-z7r9jz1aa7pvj | zach-bryan | verify (applied) | 18711214 | https://seatgeek.com/zach-bryan-tickets/chicago-illinois-soldier-field-2027-05-07-7-pm/concert/18711214 | - |
| tm-kenny-chesney-2027-arlington-z7r9jz1aavsa7 | kenny-chesney | verify (applied) | 18414534 | https://seatgeek.com/kenny-chesney-tickets/arlington-texas-at-t-stadium-2027-05-08-4-30-pm/concert/18414534 | - |
| tm-zach-bryan-2027-chicago-z7r9jz1aa7ka- | zach-bryan | verify (applied) | 18686654 | https://seatgeek.com/zach-bryan-tickets/chicago-illinois-soldier-field-2027-05-08-7-pm/concert/18686654 | - |
| tm-a-perfect-circle-2027-grand-prairie-z7r9jz1aae8a6 | a-perfect-circle | verify (applied) | 18632531 | https://seatgeek.com/a-perfect-circle-tickets/grand-prairie-texas-texas-trust-cu-theatre-2027-05-08-8-pm/concert/18632531 | - |
| tm-jon-pardi-2027-nampa-z7r9jz1aazeqe | jon-pardi | verify (applied) | 18391252 | https://seatgeek.com/jon-pardi-tickets/nampa-idaho-ford-idaho-center-2027-05-08-7-pm/concert/18391252 | - |
| tm-haiden-henderson-2027-englewood-z7r9jz1aaevqs | haiden-henderson | verify (applied) | 18669978 | https://seatgeek.com/haiden-henderson-tickets/englewood-colorado-gothic-theatre-2027-05-08-8-pm/concert/18669978 | - |
| tm-meshuggah-2027-fort-lauderdale-z7r9jz1aa7iax | meshuggah | verify (applied) | 18709209 | https://seatgeek.com/meshuggah-tickets/fort-lauderdale-florida-ftl-war-memorial-auditorium-2027-05-09-7-pm/concert/18709209 | - |
| tm-lizzy-mcalpine-2027-milwaukee-z7r9jz1aaea0_ | lizzy-mcalpine | verify (applied) | 18619430 | https://seatgeek.com/lizzy-mcalpine-tickets/milwaukee-wisconsin-riverside-theater-milwaukee-2027-05-10-7-pm/concert/18619430 | - |
| tm-remi-wolf-2027-tulsa-z7r9jz1aa7ar_ | remi-wolf | verify (applied) | 18664784 | https://seatgeek.com/remi-wolf-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-05-10-8-pm/concert/18664784 | - |
| tm-queens-of-the-stone-age-2027-salt-lake-city-z7r9jz1aa7-1z | queens-of-the-stone-age | verify (applied) | 18475187 | https://seatgeek.com/queens-of-the-stone-age-tickets/salt-lake-city-utah-delta-center-1-2027-05-11-6-30-pm/concert/18475187 | - |
| tm-remi-wolf-2027-kansas-city-z7r9jz1aa7kjk | remi-wolf | verify (applied) | 18664787 | https://seatgeek.com/remi-wolf-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-05-11-8-pm/concert/18664787 | - |
| tm-two-door-cinema-club-2027-morrison-z7r9jz1aa7p83 | two-door-cinema-club | verify (applied) | 18711220 | https://seatgeek.com/two-door-cinema-club-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-11-7-30-pm/concert/18711220 | - |
| tm-def-leppard-2027-spokane-z7r9jz1aa7eoo | def-leppard | verify (applied) | 18662424 | https://seatgeek.com/def-leppard-tickets/spokane-washington-numerica-veterans-arena-2027-05-11-7-pm/concert/18662424 | - |
| tm-queens-of-the-stone-age-2027-morrison-z7r9jz1aa7nqm | queens-of-the-stone-age | verify (applied) | 18709238 | https://seatgeek.com/queens-of-the-stone-age-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-12-6-30-pm/concert/18709238 | - |
| tm-remi-wolf-2027-west-des-moines-z7r9jz1aa7aj7 | remi-wolf | verify (applied) | 18664791 | https://seatgeek.com/remi-wolf-tickets/west-des-moines-iowa-val-air-ballroom-2027-05-12-8-pm/concert/18664791 | - |
| tm-gavin-adcock-2027-richmond-z7r9jz1aa76gm | gavin-adcock | verify (applied) | 18676334 | https://seatgeek.com/gavin-adcock-tickets/richmond-virginia-virginia-credit-union-live-at-richmond-raceway-2027-05-13-7-30-pm/concert/18676334 | - |
| tm-turnpike-troubadours-2027-morrison-z7r9jz1aa7_ae | turnpike-troubadours | verify (applied) | 18709207 | https://seatgeek.com/turnpike-troubadours-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-13-7-pm/concert/18709207 | - |
| tm-queens-of-the-stone-age-2027-saint-paul-z7r9jz1aa7-1v | queens-of-the-stone-age | verify (applied) | 18701766 | https://seatgeek.com/queens-of-the-stone-age-tickets/saint-paul-minnesota-grand-casino-arena-2027-05-14-6-30-pm/concert/18701766 | - |
| tm-hazlett-2027-minneapolis-z7r9jz1a7p0gv | hazlett | verify (applied) | 18319957 | https://seatgeek.com/hazlett-tickets/minneapolis-minnesota-first-avenue-minneapolis-2027-05-14-7-30-pm/concert/18319957 | - |
| tm-turnpike-troubadours-2027-morrison-z7r9jz1aa7_av | turnpike-troubadours | verify (applied) | 18706629 | https://seatgeek.com/turnpike-troubadours-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-14-7-pm/concert/18706629 | - |
| tm-gavin-adcock-2027-baltimore-z7r9jz1aa76ue | gavin-adcock | verify (applied) | 18676333 | https://seatgeek.com/gavin-adcock-tickets/baltimore-maryland-pier-six-pavilion-2027-05-15-7-30-pm/concert/18676333 | - |
| tm-haiden-henderson-2027-west-hollywood-z7r9jz1aaeexf | haiden-henderson | verify (applied) | 18669773 | https://seatgeek.com/haiden-henderson-tickets/west-hollywood-california-troubadour-2027-05-15-7-pm/concert/18669773 | - |
| tm-dylan-gossett-2027-fort-worth-z7r9jz1aae4bs | dylan-gossett | verify (applied) | 18642114 | https://seatgeek.com/dylan-gossett-tickets/fort-worth-texas-billy-bob-s-texas-2027-05-15-7-pm/concert/18642114 | - |
| tm-remi-wolf-2027-morrison-z7r9jz1aa7kap | remi-wolf | verify (applied) | 18664789 | https://seatgeek.com/remi-wolf-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-16-7-pm/concert/18664789 | - |
| tm-lizzy-mcalpine-2027-kansas-city-z7r9jz1aaekqk | lizzy-mcalpine | verify (applied) | 18619436 | https://seatgeek.com/lizzy-mcalpine-tickets/kansas-city-missouri-the-midland-theatre-mo-2027-05-17-7-pm/concert/18619436 | - |
| tm-zach-bryan-2027-baltimore-z7r9jz1aa7kav | zach-bryan | verify (applied) | 18655057 | https://seatgeek.com/zach-bryan-tickets/baltimore-maryland-m-t-bank-stadium-2027-05-18-8-pm/concert/18655057 | - |
| tm-the-airborne-toxic-event-2026-glenside-z7r9jz1a70_pw | the-airborne-toxic-event | verify (applied) | 18271150 | https://seatgeek.com/the-airborne-toxic-event-tickets/glenside-pennsylvania-keswick-theatre-2027-05-19-8-pm/concert/18271150 | - |
| tm-blondshell-2027-columbus-z7r9jz1aaeogk | blondshell | verify (applied) | 18633503 | https://seatgeek.com/blondshell-tickets/columbus-ohio-newport-music-hall-2027-05-20-8-pm/concert/18633503 | - |
| tm-dylan-gossett-2027-tulsa-z7r9jz1aae4bw | dylan-gossett | verify (applied) | 18642120 | https://seatgeek.com/dylan-gossett-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-05-21-7-pm/concert/18642120 | - |
| tm-hazlett-2027-salt-lake-city-z7r9jz1aa7ec3 | hazlett | verify (applied) | 18319961 | https://seatgeek.com/hazlett-tickets/salt-lake-city-utah-rockwell-at-the-complex-2027-05-21-7-30-pm/concert/18319961 | - |
| tm-remi-wolf-2027-vancouver-z7r9jz1aa7kaf | remi-wolf | verify (applied) | 18664793 | https://seatgeek.com/remi-wolf-tickets/vancouver-canada-pne-forum-vancouver-2027-05-21-8-pm/concert/18664793 | - |
| tm-the-airborne-toxic-event-2027-chicago-z7r9jz1aazbfj | the-airborne-toxic-event | verify (applied) | 18653224 | https://seatgeek.com/the-airborne-toxic-event-tickets/chicago-illinois-vic-theatre-chicago-2027-05-26-7-30-pm/concert/18653224 | - |
| tm-gavin-adcock-2027-helotes-z7r9jz1aa76gz | gavin-adcock | verify (applied) | 18676335 | https://seatgeek.com/gavin-adcock-tickets/helotes-texas-floores-country-store-2027-05-27-7-30-pm/concert/18676335 | - |
| tm-two-door-cinema-club-2027-austin-z7r9jz1aa7p8f | two-door-cinema-club | verify (applied) | 18711344 | https://seatgeek.com/two-door-cinema-club-tickets/austin-texas-united-heritage-hall-2027-05-27-8-pm/concert/18711344 | - |
| tm-a-perfect-circle-2027-morrison-z7r9jz1aae8af | a-perfect-circle | verify (applied) | 18632540 | https://seatgeek.com/a-perfect-circle-tickets/morrison-colorado-red-rocks-amphitheatre-2027-05-27-7-30-pm/concert/18632540 | - |
| tm-gavin-adcock-2027-helotes-z7r9jz1aa76gy | gavin-adcock | verify (applied) | 18676344 | https://seatgeek.com/gavin-adcock-tickets/helotes-texas-floores-country-store-2027-05-28-7-30-pm/concert/18676344 | - |
| tm-two-door-cinema-club-2027-dallas-z7r9jz1aa7p84 | two-door-cinema-club | verify (applied) | 18711349 | https://seatgeek.com/two-door-cinema-club-tickets/dallas-texas-the-bomb-factory-dallas-2027-05-29-8-pm/concert/18711349 | - |
| tm-hazlett-2027-eugene-z7r9jz1aaeojp | hazlett | verify (applied) | 18319963 | https://seatgeek.com/hazlett-tickets/eugene-oregon-wow-hall-2027-05-29-7-pm/concert/18319963 | - |
| tm-def-leppard-2027-houston-z7r9jz1aa7eob | def-leppard | verify (applied) | 18662427 | https://seatgeek.com/def-leppard-tickets/houston-texas-toyota-center-2027-06-01-7-pm/concert/18662427 | - |
| tm-metallica-2027-raleigh-z7r9jz1aavwaj | metallica | verify (applied) | 18595092 | https://seatgeek.com/metallica-tickets/raleigh-north-carolina-carter-finley-stadium-2027-06-02-6-pm/concert/18595092 | - |
| tm-hazlett-2027-los-angeles-z7r9jz1a7p0oi | hazlett | verify (applied) | 18319968 | https://seatgeek.com/hazlett-tickets/los-angeles-california-el-rey-theatre-los-angeles-2027-06-02-8-pm/concert/18319968 | - |
| tm-hazlett-2027-dallas-z7r9jz1a7pge_ | hazlett | verify (applied) | 18319973 | https://seatgeek.com/hazlett-tickets/dallas-texas-the-kessler-theater-2027-06-08-8-pm/concert/18319973 | - |
| tm-the-airborne-toxic-event-2027-englewood-z7r9jz1aazgov | the-airborne-toxic-event | verify (applied) | 18415996 | https://seatgeek.com/the-airborne-toxic-event-tickets/englewood-colorado-gothic-theatre-2027-06-08-8-pm/concert/18415996 | - |
| tm-riley-green-2027-mount-pleasant-z7r9jz1aaef_z | riley-green | verify (applied) | 18626567 | https://seatgeek.com/riley-green-tickets/mount-pleasant-michigan-soaring-eagle-casino-resort-2027-06-10-7-pm/concert/18626567 | - |
| tm-fkj-2027-new-orleans-z7r9jz1a7pd1a | fkj | verify (applied) | 18282300 | https://seatgeek.com/fkj-tickets/new-orleans-louisiana-saenger-theatre-new-orleans-2027-06-10-8-30-pm/concert/18282300 | - |
| tm-the-airborne-toxic-event-2027-portland-z7r9jz1aazfzx | the-airborne-toxic-event | verify (applied) | 18722601 | https://seatgeek.com/the-airborne-toxic-event-tickets/portland-oregon-revolution-hall-portland-2027-06-11-8-pm/concert/18722601 | - |
| tm-metallica-2027-madison-z7r9jz1aavw0o | metallica | verify (applied) | 18595101 | https://seatgeek.com/metallica-tickets/madison-wisconsin-camp-randall-stadium-2027-06-12-6-pm/concert/18595101 | - |
| tm-fkj-2027-austin-z7r9jz1a7pdvn | fkj | verify (applied) | 18282301 | https://seatgeek.com/fkj-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-06-12-8-pm/concert/18282301 | - |
| tm-the-airborne-toxic-event-2027-seattle-z7r9jz1a70ybz | the-airborne-toxic-event | verify (applied) | 18280592 | https://seatgeek.com/the-airborne-toxic-event-tickets/seattle-washington-the-showbox-2027-06-13-8-pm/concert/18280592 | - |
| tm-the-airborne-toxic-event-2027-san-luis-obispo-z7r9jz1a70w-f | the-airborne-toxic-event | verify (applied) | 18310983 | https://seatgeek.com/the-airborne-toxic-event-tickets/san-luis-obispo-california-fremont-theater-san-luis-obispo-2027-06-16-8-pm/concert/18310983 | - |
| tm-the-airborne-toxic-event-2027-menlo-park-z7r9jz1a70ijm | the-airborne-toxic-event | verify (applied) | 18351287 | https://seatgeek.com/the-airborne-toxic-event-tickets/menlo-park-california-the-guild-theatre-menlo-park-2027-06-18-8-pm/concert/18351287 | - |
| tm-the-airborne-toxic-event-2027-menlo-park-z7r9jz1a7pj3f | the-airborne-toxic-event | verify (applied) | 18482934 | https://seatgeek.com/the-airborne-toxic-event-tickets/menlo-park-california-the-guild-theatre-menlo-park-2027-06-19-8-pm/concert/18482934 | - |
| tm-def-leppard-2027-cleveland-z7r9jz1aa7eo8 | def-leppard | verify (applied) | 18639422 | https://seatgeek.com/def-leppard-tickets/cleveland-ohio-rocket-arena-2027-06-21-7-pm/concert/18639422 | - |
| tm-death-cab-for-cutie-2027-calgary-z7r9jz1aa7k3a | death-cab-for-cutie | verify (applied) | 18715569 | https://seatgeek.com/death-cab-for-cutie-tickets/calgary-canada-spruce-meadows-2027-07-02-7-pm/concert/18715569 | - |
| tm-lizzy-mcalpine-2027-morrison-z7r9jz1aaeax6 | lizzy-mcalpine | verify (applied) | 18619455 | https://seatgeek.com/lizzy-mcalpine-tickets/morrison-colorado-red-rocks-amphitheatre-2027-07-06-7-pm/concert/18619455 | - |
| tm-death-cab-for-cutie-2027-morrison-z7r9jz1aa7sqe | death-cab-for-cutie | verify (applied) | 18715561 | https://seatgeek.com/death-cab-for-cutie-tickets/morrison-colorado-red-rocks-amphitheatre-2027-07-08-7-pm/concert/18715561 | - |
| tm-leon-bridges-2027-saint-augustine-z7r9jz1aa7dqk | leon-bridges | verify (applied) | 18662703 | https://seatgeek.com/leon-bridges-tickets/saint-augustine-florida-st-augustine-amphitheatre-2027-07-18-7-pm/concert/18662703 | - |
| tm-slipknot-2027-boston-z7r9jz1aavzbi | slipknot | verify (applied) | 18626574 | https://seatgeek.com/slipknot-tickets/boston-massachusetts-fenway-park-2027-07-31-6-30-pm/concert/18626574 | - |
| tm-slipknot-2027-nashville-z7r9jz1aaeazk | slipknot | verify (applied) | 18626599 | https://seatgeek.com/slipknot-tickets/nashville-tennessee-firstbank-stadium-2027-08-03-6-30-pm/concert/18626599 | - |
| tm-leon-bridges-2027-morrison-z7r9jz1aa7dvk | leon-bridges | verify (applied) | 18662713 | https://seatgeek.com/leon-bridges-tickets/morrison-colorado-red-rocks-amphitheatre-2027-08-03-7-30-pm/concert/18662713 | - |
| tm-the-red-clay-strays-2027-green-bay-z7r9jz1aaef4y | the-red-clay-strays | verify (applied) | 18639102 | https://seatgeek.com/the-red-clay-strays-tickets/green-bay-wisconsin-resch-center-2027-08-05-7-pm/concert/18639102 | - |
| tm-sienna-spiro-2027-nashville-z7r9jz1aa7bjy | sienna-spiro | verify (applied) | 18702009 | https://seatgeek.com/sienna-spiro-tickets/nashville-tennessee-grand-ole-opry-house-2027-08-08-7-pm/concert/18702009 | - |
| tm-sienna-spiro-2027-atlanta-z7r9jz1aa7oab | sienna-spiro | verify (applied) | 18702010 | https://seatgeek.com/sienna-spiro-tickets/atlanta-georgia-fox-theatre-atlanta-2027-08-10-7-pm/concert/18702010 | - |
| tm-the-red-clay-strays-2027-fresno-z7r9jz1aaefgo | the-red-clay-strays | verify (applied) | 18639106 | https://seatgeek.com/the-red-clay-strays-tickets/fresno-california-save-mart-center-2027-08-13-7-pm/concert/18639106 | - |
| tm-leon-bridges-2027-vancouver-z7r9jz1aa7dr6 | leon-bridges | verify (applied) | 18662715 | https://seatgeek.com/leon-bridges-tickets/vancouver-canada-freedom-mobile-arch-2027-08-14-7-pm/concert/18662715 | - |
| tm-the-red-clay-strays-2027-los-angeles-z7r9jz1aaek0t | the-red-clay-strays | verify (applied) | 18639108 | https://seatgeek.com/the-red-clay-strays-tickets/los-angeles-california-the-greek-theatre-los-angeles-2027-08-17-7-pm/concert/18639108 | - |
| tm-sienna-spiro-2027-morrison-z7r9jz1aa7-1d | sienna-spiro | verify (applied) | 18702034 | https://seatgeek.com/sienna-spiro-tickets/morrison-colorado-red-rocks-amphitheatre-2027-08-30-7-pm/concert/18702034 | - |
| tm-rod-stewart-2027-morrison-z7r9jz1a7qu14 | rod-stewart | verify (applied) | 17890592 | https://seatgeek.com/rod-stewart-tickets/morrison-colorado-red-rocks-amphitheatre-2027-09-02-7-30-pm/concert/17890592 | - |
| tm-rod-stewart-2027-morrison-z7r9jz1a7r6o4 | rod-stewart | verify (applied) | 17914318 | https://seatgeek.com/rod-stewart-tickets/morrison-colorado-red-rocks-amphitheatre-2027-09-03-7-30-pm/concert/17914318 | - |
| tm-the-red-clay-strays-2027-huntsville-z7r9jz1aaek-6 | the-red-clay-strays | verify (applied) | 18639118 | https://seatgeek.com/the-red-clay-strays-tickets/huntsville-alabama-orion-amphitheater-2027-09-11-7-pm/concert/18639118 | - |
| tm-the-red-clay-strays-2027-huntsville-z7r9jz1aa7svn | the-red-clay-strays | verify (applied) | 18727012 | https://seatgeek.com/the-red-clay-strays-tickets/huntsville-alabama-orion-amphitheater-2027-09-12-7-pm/concert/18727012 | - |
| tm-leon-bridges-2027-columbus-z7r9jz1aa7dpa | leon-bridges | verify (applied) | 18662732 | https://seatgeek.com/leon-bridges-tickets/columbus-ohio-kemba-live-2027-09-14-7-30-pm/concert/18662732 | - |
| tm-the-red-clay-strays-2027-oklahoma-city-z7r9jz1aaefef | the-red-clay-strays | verify (applied) | 18639122 | https://seatgeek.com/the-red-clay-strays-tickets/oklahoma-city-oklahoma-paycom-center-2027-09-16-7-pm/concert/18639122 | - |
| tm-leon-bridges-2027-nashville-z7r9jz1aa7dqd | leon-bridges | verify (applied) | 18662741 | https://seatgeek.com/leon-bridges-tickets/nashville-tennessee-ascend-amphitheater-2027-09-21-7-30-pm/concert/18662741 | - |
| tm-fontaines-d-c-2027-columbus-z7r9jz1aaepk6 | fontaines-d-c | verify (applied) | 18642836 | https://seatgeek.com/fontaines-d-c-tickets/columbus-ohio-kemba-live-2027-09-24-6-pm/concert/18642836 | - |
| tm-fontaines-d-c-2027-forest-hills-z7r9jz1aaep7g | fontaines-d-c | verify (applied) | 18642842 | https://seatgeek.com/fontaines-d-c-tickets/forest-hills-new-york-forest-hills-stadium-2027-09-28-6-pm/concert/18642842 | - |
| tm-fontaines-d-c-2027-forest-hills-z7r9jz1aa7v_9 | fontaines-d-c | verify (applied) | 18658900 | https://seatgeek.com/fontaines-d-c-tickets/forest-hills-new-york-forest-hills-stadium-2027-09-29-6-pm/concert/18658900 | - |
| tm-hilary-duff-2027-sunrise-z7r9jz1aaeve7 | hilary-duff | verify (applied) | 18604684 | https://seatgeek.com/hilary-duff-tickets/sunrise-florida-amerant-bank-arena-2027-10-01-7-30-pm/concert/18604684 | - |
| tm-fontaines-d-c-2027-nashville-z7r9jz1aa7vxe | fontaines-d-c | verify (applied) | 18658902 | https://seatgeek.com/fontaines-d-c-tickets/nashville-tennessee-the-pinnacle-nashville-2027-10-04-8-pm/concert/18658902 | - |
| tm-fontaines-d-c-2027-nashville-z7r9jz1aaepkf | fontaines-d-c | verify (applied) | 18642844 | https://seatgeek.com/fontaines-d-c-tickets/nashville-tennessee-the-pinnacle-nashville-2027-10-05-8-pm/concert/18642844 | - |
| tm-hilary-duff-2027-cleveland-z7r9jz1aaevea | hilary-duff | verify (applied) | 18589799 | https://seatgeek.com/hilary-duff-tickets/cleveland-ohio-rocket-arena-2027-10-13-7-30-pm/concert/18589799 | - |
| tm-eros-ramazzotti-2027-sugar-land-z7r9jz1a74uo8 | eros-ramazzotti | verify (applied) | 17491601 | https://seatgeek.com/eros-ramazzotti-tickets/sugar-land-texas-smart-financial-centre-2027-10-13-8-pm/concert/17491601 | - |
| tm-fontaines-d-c-2027-morrison-z7r9jz1aaepka | fontaines-d-c | verify (applied) | 18642850 | https://seatgeek.com/fontaines-d-c-tickets/morrison-colorado-red-rocks-amphitheatre-2027-10-13-7-30-pm/concert/18642850 | - |
| tm-hilary-duff-2027-des-moines-z7r9jz1aaevep | hilary-duff | verify (applied) | 18613415 | https://seatgeek.com/hilary-duff-tickets/des-moines-iowa-casey-s-center-2027-11-14-7-30-pm/concert/18613415 | - |
| tm-gary-allan-2026-catoosa-z7r9jz1aaza0p | gary-allan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tom-jones-2026-highland-z7r9jz1a7p6r4 | tom-jones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dinosaur-jr-2026-new-orleans-z7r9jz1a7pu-o | dinosaur-jr | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gary-allan-2026-newkirk-z7r9jz1aavecf | gary-allan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-calvin-harris-2026-las-vegas-z7r9jz1aav9ui | calvin-harris | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-niall-horan-2026-dublin-z7r9jz1a7-mpd | niall-horan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-my-chemical-romance-2026-singapore-z7r9jz1a7oup6 | my-chemical-romance | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-niall-horan-2026-dublin-z7r9jz1a7-m4y | niall-horan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-salt-lake-city-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beabadoobee-2026-greenwich-z7r9jz1a7ps_a | beabadoobee | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-sabaton-2026-loveland-z7r9jz1a7-ojz | sabaton | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-detroit-z7r9jz1aaziv8 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-beartooth-2026-maplewood-z7r9jz1aava89 | beartooth | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-black-stone-cherry-2026-nashville-z7r9jz1aaeapk | black-stone-cherry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-latto-2026-boston-z7r9jz1aae_7z | latto | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-los-tucanes-de-tijuana-2026-austin-z7r9jz1aazgav | los-tucanes-de-tijuana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2026-newberry-z7r9jz1aavs4z | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2026-redding-z7r9jz1a7ps3o | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-los-tucanes-de-tijuana-2026-catoosa-z7r9jz1aaef8- | los-tucanes-de-tijuana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-blue-october-2026-oklahoma-city-z7r9jz1a7-v0b | blue-october | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-portland-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-seattle-z7r9jz1aaziv3 | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2026-spokane-z7r9jz1aazivk | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2026-philadelphia-z7r9jz1a70ppv | pink-martini | clear (applied) | - | - | stored URL failed: venue mismatch: 'Marian Anderson Hall - Kimmel Center' vs 'Kimmel Center - Miller Theater'; no qualifying replacement found |
| tm-missio-2026-boise-z7r9jz1aazivf | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dom-dolla-2027-miami-z7r9jz1aaavbz | dom-dolla | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31y4afw | yacht-rock-revue | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Paramount in concert with Northwell' vs 'The Paramount - Huntington'; no qualifying replacement found |
| tm-koe-wetzel-2027-rohnert-park-z7r9jz1aa7zjf | koe-wetzel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31ykyfq | yacht-rock-revue | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Paramount in concert with Northwell' vs 'The Paramount - Huntington'; no qualifying replacement found |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31y3tkt | yacht-rock-revue | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Paramount in concert with Northwell' vs 'The Paramount - Huntington'; no qualifying replacement found |
| tm-missio-2027-chicago-z7r9jz1aazivb | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-cudahy-z7r9jz1aaziv_ | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-minneapolis-z7r9jz1aazivo | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-athens-z7r9jz1a7pv8_ | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-atmosphere-2027-grand-junction-z7r9jz1aaezfe | atmosphere | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2027-daytona-beach-z7r9jz1a7pozg | air-supply | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-plan-2027-victoria-z7r9jz1aae__3 | simple-plan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-saint-petersburg-z7r9jz1aae_gk | chelsea-cutler | clear (applied) | - | - | stored URL failed: event instants differ by -15.5h (tolerance ±3h) — likely a different night; no qualifying replacement found |
| tm-tommy-emmanuel-2027-grand-rapids-z7r9jz1aavspe | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-koe-wetzel-2027-durant-vvg1yz_4wsdj6f | koe-wetzel | verify (applied) | 18738802 | https://seatgeek.com/koe-wetzel-tickets/durant-oklahoma-choctaw-grand-theater-2027-01-29-7-30-pm/concert/18738802 | - |
| tm-chelsea-cutler-2027-atlanta-z7r9jz1aae_gf | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-rochester-z7r9jz1aavsp7 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-albany-z7r9jz1aavspa | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-nashville-z7r9jz1aaefb3 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-derry-z7r9jz1aavspk | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-tommy-emmanuel-2027-fairfield-z7r9jz1aavsp6 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mat-kearney-2027-kalispell-z7r9jz1aazpfi | mat-kearney | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-plan-2027-kingston-1a8zk4vgkdbqsjy | simple-plan | verify (applied) | 18655727 | https://seatgeek.com/simple-plan-tickets/kingston-canada-slush-puppie-place-2027-02-09-7-pm/concert/18655727 | - |
| tm-valley-2027-waterloo-z7r9jz1aavzft | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-washington-z7r9jz1aaziv- | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-pink-martini-2027-cincinnati-z7r9jz1a7pp4b | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-brooklyn-z7r9jz1aazivx | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-los-tigres-del-norte-2027-oklahoma-city-vvg1yz_f5olqqc | los-tigres-del-norte | verify (applied) | 18738645 | https://seatgeek.com/los-tigres-del-norte-tickets/oklahoma-city-oklahoma-paycom-center-2027-02-12-8-pm/concert/18738645 | - |
| tm-gary-allan-2027-thackerville-z7r9jz1aaaz4v | gary-allan | add (applied) | 18727084 | https://seatgeek.com/gary-allan-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2027-02-12-8-pm/concert/18727084 | - |
| tm-los-tucanes-de-tijuana-2027-glendale-17k8v0g62nuo9-m | los-tucanes-de-tijuana | verify (applied) | 18405269 | https://seatgeek.com/los-tucanes-de-tijuana-tickets/glendale-arizona-desert-diamond-arena-2027-02-12-8-pm/concert/18405269 | - |
| tm-marc-anthony-2027-las-vegas-1avjz_3gkmcrlvv | marc-anthony | verify (applied) | 18608820 | https://seatgeek.com/marc-anthony-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-02-12-9-pm/concert/18608820 | - |
| tm-chelsea-cutler-2027-boston-z7r9jz1aaefp9 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-boyz-ii-men-2027-national-harbor-1ka8vp3aga5cu2t | boyz-ii-men | verify (applied) | 18687410 | https://seatgeek.com/boyz-ii-men-tickets/national-harbor-maryland-the-theater-at-mgm-national-harbor-2027-02-13-8-pm/concert/18687410 | - |
| tm-dylan-scott-2026-milwaukee-z7r9jz1aavse9 | dylan-scott | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2027-rancho-mirage-vv1aazkffgkd9xjwx | air-supply | verify (applied) | 18533274 | https://seatgeek.com/air-supply-tickets/rancho-mirage-california-agua-caliente-casino-rancho-mirage-2027-02-13-8-pm/concert/18533274 | - |
| tm-los-tucanes-de-tijuana-2027-inglewood-vvg10z_udzwaf3 | los-tucanes-de-tijuana | verify (applied) | 18354983 | https://seatgeek.com/los-tucanes-de-tijuana-tickets/inglewood-california-intuit-dome-2027-02-13-8-pm/concert/18354983 | - |
| tm-marc-anthony-2027-las-vegas-1avjz_3gkmcslva | marc-anthony | verify (applied) | 18608822 | https://seatgeek.com/marc-anthony-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-02-13-9-pm/concert/18608822 | - |
| tm-simple-plan-2027-moncton-1aszkfygkdcttvt | simple-plan | verify (applied) | 18656907 | https://seatgeek.com/simple-plan-tickets/moncton-canada-avenir-centre-2027-02-14-7-pm/concert/18656907 | - |
| tm-simple-plan-2027-sydney-1aszk4agkex2k4f | simple-plan | verify (applied) | 18656127 | https://seatgeek.com/simple-plan-tickets/sydney-canada-centre-200-2027-02-15-7-pm/concert/18656127 | - |
| tm-foreigner-2027-daytona-beach-z7r9jz1aaedca | foreigner | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-simple-plan-2027-halifax-1ad7z_kgkmojy7e | simple-plan | verify (applied) | 18655677 | https://seatgeek.com/simple-plan-tickets/halifax-canada-scotiabank-centre-2027-02-16-7-pm/concert/18655677 | - |
| tm-breaking-benjamin-2027-cedar-rapids-vv1akzk49gkd1-vah | breaking-benjamin | verify (applied) | 18742671 | https://seatgeek.com/breaking-benjamin-tickets/cedar-rapids-iowa-alliant-energy-powerhouse-2027-02-16-6-30-pm/concert/18742671 | - |
| tm-dropkick-murphys-2027-edmonton-1aozkfygkesdhkn | dropkick-murphys | verify (applied) | 18633539 | https://seatgeek.com/dropkick-murphys-tickets/edmonton-canada-edmonton-convention-centre-2027-02-16-7-pm/concert/18633539 | - |
| tm-dropkick-murphys-2027-saskatoon-1aozkfmgke0_iup | dropkick-murphys | verify (applied) | 18633540 | https://seatgeek.com/dropkick-murphys-tickets/saskatoon-canada-sasktel-centre-2027-02-17-7-pm/concert/18633540 | - |
| tm-marc-anthony-2027-las-vegas-1avjz_3gkmcslvq | marc-anthony | verify (applied) | 18608838 | https://seatgeek.com/marc-anthony-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-02-17-9-pm/concert/18608838 | - |
| tm-breaking-benjamin-2027-kalamazoo-z7r9jz1aa7mr3 | breaking-benjamin | verify (applied) | 18742686 | https://seatgeek.com/breaking-benjamin-tickets/kalamazoo-michigan-wings-event-center-2027-02-18-6-30-pm/concert/18742686 | - |
| tm-valley-2027-regina-z7r9jz1aavzfw | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2027-abbotsford-1k78vp18gau9wma | air-supply | verify (applied) | 18593901 | https://seatgeek.com/air-supply-tickets/abbotsford-canada-rogers-forum-2027-02-18-7-30-pm/concert/18593901 | - |
| tm-breaking-benjamin-2027-fort-wayne-vv1aazk4pgkde48xz | breaking-benjamin | verify (applied) | 18742688 | https://seatgeek.com/breaking-benjamin-tickets/fort-wayne-indiana-allen-county-war-memorial-coliseum-2027-02-19-6-30-pm/concert/18742688 | - |
| tm-mico-2027-carrboro-z7r9jz1aa73ap | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-marc-anthony-2027-las-vegas-1avjz_3gkmcglvg | marc-anthony | verify (applied) | 18608821 | https://seatgeek.com/marc-anthony-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-02-19-9-pm/concert/18608821 | - |
| tm-breaking-benjamin-2027-evansville-vv1aazk49gkengkxe | breaking-benjamin | verify (applied) | 18742693 | https://seatgeek.com/breaking-benjamin-tickets/evansville-indiana-ford-center-in-2027-02-20-6-30-pm/concert/18742693 | - |
| tm-los-tucanes-de-tijuana-2027-rosemont-vv1a7zkffgkdqp4jc | los-tucanes-de-tijuana | verify (applied) | 18472484 | https://seatgeek.com/los-tucanes-de-tijuana-tickets/rosemont-illinois-rosemont-theatre-2027-02-20-8-pm/concert/18472484 | - |
| tm-marc-anthony-2027-las-vegas-1avjz_3gkmcmlvw | marc-anthony | verify (applied) | 18608827 | https://seatgeek.com/marc-anthony-tickets/las-vegas-nevada-fontainebleau-at-liv-las-vegas-2027-02-20-9-pm/concert/18608827 | - |
| tm-chelsea-cutler-2027-columbus-z7r9jz1aaef0s | chelsea-cutler | clear (applied) | - | - | stored URL failed: event instants differ by -16.5h (tolerance ±3h) — likely a different night; no qualifying replacement found |
| tm-breaking-benjamin-2027-peoria-vv1kvyvp4yga29pez | breaking-benjamin | verify (applied) | 18742700 | https://seatgeek.com/breaking-benjamin-tickets/peoria-illinois-peoria-civic-center-arena-2027-02-22-6-30-pm/concert/18742700 | - |
| tm-breaking-benjamin-2027-louisville-1kaovp4zgaui0w6 | breaking-benjamin | verify (applied) | 18742710 | https://seatgeek.com/breaking-benjamin-tickets/louisville-kentucky-kfc-yum-center-2027-02-23-6-30-pm/concert/18742710 | - |
| tm-remi-wolf-2027-washington-1a4zk46gketspla | remi-wolf | verify (applied) | 18664756 | https://seatgeek.com/remi-wolf-tickets/washington-district-of-columbia-the-anthem-dc-2027-02-23-7-30-pm/concert/18664756 | - |
| tm-meshuggah-2027-nashville-g5viz_4l7rl-d | meshuggah | verify (applied) | 18724651 | https://seatgeek.com/meshuggah-tickets/nashville-tennessee-the-truth-nashville-2027-02-24-7-pm/concert/18724651 | - |
| tm-breaking-benjamin-2027-columbus-vv1aazk49gkeujesy | breaking-benjamin | verify (applied) | 18742717 | https://seatgeek.com/breaking-benjamin-tickets/columbus-ohio-nationwide-arena-2027-02-25-6-30-pm/concert/18742717 | - |
| tm-mei-semones-2027-portland-z7r9jz1aaekpv | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-breaking-benjamin-2027-university-park-vv1aezk4pgkdz5iak | breaking-benjamin | verify (applied) | 18742722 | https://seatgeek.com/breaking-benjamin-tickets/university-park-pennsylvania-bryce-jordan-center-2027-02-26-6-30-pm/concert/18742722 | - |
| tm-air-supply-2027-moose-jaw-z7r9jz1aavsx4 | air-supply | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-austin-z7r9jz1aa7ug0 | chelsea-cutler | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-meshuggah-2027-baltimore-1a4zk4fgkdwfxtt | meshuggah | verify (applied) | 18724653 | https://seatgeek.com/meshuggah-tickets/baltimore-maryland-the-paramount-baltimore-2027-02-27-7-pm/concert/18724653 | - |
| tm-remi-wolf-2027-new-york-g5dyz_fqhrymh | remi-wolf | verify (applied) | 18664759 | https://seatgeek.com/remi-wolf-tickets/new-york-new-york-radio-city-music-hall-2027-02-27-8-pm/concert/18664759 | - |
| tm-los-tigres-del-norte-2027-denver-z7r9jz1aaaz8e | los-tigres-del-norte | verify (applied) | 18747096 | https://seatgeek.com/los-tigres-del-norte-tickets/denver-colorado-bellco-theatre-2027-02-27-8-pm/concert/18747096 | - |
| tm-breaking-benjamin-2027-uncasville-g5vvz_4l6n7hw | breaking-benjamin | verify (applied) | 18742724 | https://seatgeek.com/breaking-benjamin-tickets/uncasville-connecticut-mohegan-sun-arena-2027-02-28-6-30-pm/concert/18742724 | - |
| tm-meshuggah-2027-pittsburgh-1kaovp4oga2k8sn | meshuggah | verify (applied) | 18724655 | https://seatgeek.com/meshuggah-tickets/pittsburgh-pennsylvania-citizens-live-at-the-wylie-2027-02-28-7-pm/concert/18724655 | - |
| tm-don-omar-2027-belmont-park-17gzv0g6u15uw7e | don-omar | verify (applied) | 18326568 | https://seatgeek.com/don-omar-tickets/elmont-new-york-ubs-arena-2027-02-28-8-pm/concert/18326568 | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7nuhj | backstreet-boys | verify (applied) | 18657844 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-02-28-8-pm/concert/18657844 | - |
| tm-morat-2027-el-paso-vvg1yz_1xncffn | morat | verify (applied) | 18251588 | https://seatgeek.com/morat-tickets/el-paso-texas-don-haskins-center-2027-02-28-8-pm/concert/18251588 | - |
| tm-chelsea-cutler-2027-denver-z7r9jz1aae_g4 | chelsea-cutler | clear (applied) | - | - | stored URL failed: event instants differ by -16.5h (tolerance ±3h) — likely a different night; no qualifying replacement found |
| tm-daughtry-2027-orono-z7r9jz1aae836 | daughtry | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-breaking-benjamin-2027-syracuse-k7vgf_4hgmiu3 | breaking-benjamin | verify (applied) | 18742726 | https://seatgeek.com/breaking-benjamin-tickets/syracuse-new-york-upstate-medical-university-arena-at-the-oncenter-war-memorial-2027-03-02-6-30-pm/concert/18742726 | - |
| tm-hans-zimmer-2027-hamilton-1a8zkfigkdxfojj | hans-zimmer | verify (applied) | 18601959 | https://seatgeek.com/hans-zimmer-tickets/hamilton-canada-td-coliseum-2027-03-02-7-30-pm/concert/18601959 | - |
| tm-rod-stewart-2027-reading-vv17fz_kgks7life | rod-stewart | verify (applied) | 18652809 | https://seatgeek.com/rod-stewart-tickets/reading-pennsylvania-santander-arena-2027-03-02-7-30-pm/concert/18652809 | - |
| tm-mei-semones-2027-chicago-z7r9jz1aae3ax | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-air-supply-2027-ottawa-1ad7z_3gksa1dub | air-supply | clear (applied) | - | - | stored URL failed: venue mismatch: 'Hard Rock Hotel & Casino Ottawa' vs 'Hard Rock Cafe'; no qualifying replacement found |
| tm-blue-october-2027-boise-g5vzz_1rcvq7p | blue-october | verify (applied) | 18238525 | https://seatgeek.com/blue-october-tickets/boise-idaho-knitting-factory-concert-house-boise-2027-03-03-8-pm/concert/18238525 | - |
| tm-valley-2027-phoenix-z7r9jz1aavzfg | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dropkick-murphys-2027-quebec-1aszkfzbgoozeg5 | dropkick-murphys | verify (applied) | 18633563 | https://seatgeek.com/dropkick-murphys-tickets/quebec-city-canada-theatre-capitole-2027-03-04-7-pm/concert/18633563 | - |
| tm-michelle-branch-2027-tulsa-z7r9jz1aa7vv3 | michelle-branch | add (applied) | 18517280 | https://seatgeek.com/michelle-branch-tickets/tulsa-oklahoma-cain-s-ballroom-tulsa-2027-03-04-7-pm/concert/18517280 | - |
| tm-hazlett-2027-oslo-z698xzb_z16v-jveop | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-daughtry-2027-charleston-g5evz_keoc7ae | daughtry | verify (applied) | 18632937 | https://seatgeek.com/daughtry-tickets/charleston-south-carolina-charleston-music-hall-2027-03-05-7-pm/concert/18632937 | - |
| tm-meshuggah-2027-new-haven-z7r9jz1aa7t0i | meshuggah | add (applied) | 18724663 | https://seatgeek.com/meshuggah-tickets/new-haven-connecticut-college-street-music-hall-2027-03-05-7-pm/concert/18724663 | - |
| tm-mei-semones-2027-philadelphia-z7r9jz1aaebpd | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-backstreet-boys-2027-toronto-1k7zvpotga1oqed | backstreet-boys | verify (applied) | 18665148 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-03-05-8-pm/concert/18665148 | - |
| tm-remi-wolf-2027-toronto-1a8zk46gkdlbbff | remi-wolf | verify (applied) | 18664754 | https://seatgeek.com/remi-wolf-tickets/toronto-canada-massey-hall-2027-03-05-8-pm/concert/18664754 | - |
| tm-dinosaur-jr-2027-chicago-z7r9jz1aaedov | dinosaur-jr | clear (applied) | - | - | stored URL failed: venue mismatch: 'Vic Theatre' vs 'The WIP Theater'; no qualifying replacement found |
| tm-flans-2027-kansas-city-z7r9jz1aaevrv | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-theory-of-a-deadman-2027-moncton-16d7z_31_g7xauw | theory-of-a-deadman | verify (applied) | 18570536 | https://seatgeek.com/theory-of-a-deadman-tickets/moncton-canada-molson-canadian-centre-at-casino-new-brunswick-2027-03-06-8-pm/concert/18570536 | - |
| tm-backstreet-boys-2027-toronto-1k7zvpotga14bio | backstreet-boys | verify (applied) | 18665150 | https://seatgeek.com/backstreet-boys-tickets/toronto-canada-rogers-centre-2027-03-06-8-pm/concert/18665150 | - |
| tm-remi-wolf-2027-toronto-1a8zk46gkdlbzfe | remi-wolf | verify (applied) | 18693184 | https://seatgeek.com/remi-wolf-tickets/toronto-canada-massey-hall-2027-03-06-8-pm/concert/18693184 | - |
| tm-mico-2027-lawrence-z7r9jz1aa7a_g | mico | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-valley-2027-denver-z7r9jz1aavzfu | valley | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-chelsea-cutler-2027-san-francisco-z7r9jz1aae_gp | chelsea-cutler | clear (applied) | - | - | stored URL failed: event instants differ by -16.5h (tolerance ±3h) — likely a different night; no qualifying replacement found |
| tm-dropkick-murphys-2027-wilmington-vv1aezkfmgkexqysz | dropkick-murphys | verify (applied) | 18633568 | https://seatgeek.com/dropkick-murphys-tickets/wilmington-delaware-the-queen-wilmington-2027-03-08-7-pm/concert/18633568 | - |
| tm-theory-of-a-deadman-2027-quebec-1aszkf04if8zegk | theory-of-a-deadman | verify (applied) | 18570535 | https://seatgeek.com/theory-of-a-deadman-tickets/quebec-city-canada-theatre-capitole-2027-03-08-8-pm/concert/18570535 | - |
| tm-pink-martini-2027-pittsburgh-z7r9jz1aavjpj | pink-martini | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-theory-of-a-deadman-2027-montreal-1aszkfxgkerzpy6 | theory-of-a-deadman | verify (applied) | 18570537 | https://seatgeek.com/theory-of-a-deadman-tickets/montreal-canada-mtelus-2027-03-09-8-pm/concert/18570537 | - |
| tm-missio-2027-carrboro-z7r9jz1aazivn | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-dropkick-murphys-2027-portland-vv177z_kgksaw-ns | dropkick-murphys | verify (applied) | 18633572 | https://seatgeek.com/dropkick-murphys-tickets/portland-maine-state-theatre-portland-me-2027-03-11-7-pm/concert/18633572 | - |
| tm-flans-2027-las-vegas-z7r9jz1aaeaov | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-remi-wolf-2027-minneapolis-vv1akzk46gkdn_2lp | remi-wolf | verify (applied) | 18664767 | https://seatgeek.com/remi-wolf-tickets/minneapolis-minnesota-the-armory-minneapolis-2027-03-12-7-30-pm/concert/18664767 | - |
| tm-missio-2027-birmingham-z7r9jz1aazivp | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mercyme-2027-chattanooga-z7r9jz1aa7_af | mercyme | verify (applied) | 18692230 | https://seatgeek.com/mercyme-tickets/chattanooga-tennessee-mckenzie-arena-2027-03-13-7-pm/concert/18692230 | - |
| tm-vnv-nation-2027-tampa-z7r9jz1a7jv8s | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mico-2027-cleveland-rz7hnez1afut40 | mico | verify (applied) | 18746851 | https://seatgeek.com/mico-tickets/cleveland-ohio-globe-iron-2027-03-13-8-pm/concert/18746851 | - |
| tm-feid-2027-montreal-1ad7z_4gkd0zh9f | feid | verify (applied) | 18746768 | https://seatgeek.com/feid-tickets/montreal-canada-centre-bell-2027-03-13-8-pm/concert/18746768 | - |
| tm-remi-wolf-2027-milwaukee-vv1a6zk4kgkei14ha | remi-wolf | verify (applied) | 18664770 | https://seatgeek.com/remi-wolf-tickets/milwaukee-wisconsin-landmark-credit-union-live-2027-03-13-8-pm/concert/18664770 | - |
| tm-zach-top-2027-thackerville-z7r9jz1aaaeap | zach-top | add (applied) | 18592206 | https://seatgeek.com/zach-top-tickets/thackerville-oklahoma-lucas-oil-live-at-winstar-world-casino-and-resort-2027-03-13-8-pm/concert/18592206 | - |
| tm-missio-2027-nashville-z7r9jz1aazivj | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-feid-2027-chicago-vv1a7zk4xgkdhjeow | feid | verify (applied) | 18746737 | https://seatgeek.com/feid-tickets/chicago-illinois-united-center-2027-03-18-8-pm/concert/18746737 | - |
| tm-too-many-zooz-2027-frisco-z7r9jz1aaeep4 | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-theory-of-a-deadman-2027-thunder-bay-1avzz_ogkrpopru | theory-of-a-deadman | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Auditorium' vs 'Thunder Bay Community Auditorium'; no qualifying replacement found |
| tm-remi-wolf-2027-nashville-g5viz_fni20_x | remi-wolf | verify (applied) | 18664774 | https://seatgeek.com/remi-wolf-tickets/nashville-tennessee-the-truth-nashville-2027-03-19-8-pm/concert/18664774 | - |
| tm-the-psychedelic-furs-2027-rancho-mirage-z7r9jz1a7-n8k | the-psychedelic-furs | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mercyme-2027-macon-vvg1zz_fsveixl | mercyme | verify (applied) | 18692238 | https://seatgeek.com/mercyme-tickets/macon-georgia-atrium-health-amphitheater-2027-03-20-7-pm/concert/18692238 | - |
| tm-remi-wolf-2027-atlanta-vvg1zz_fj5-2nn | remi-wolf | verify (applied) | 18664775 | https://seatgeek.com/remi-wolf-tickets/atlanta-georgia-coca-cola-roxy-theatre-2027-03-20-8-pm/concert/18664775 | - |
| tm-los-tigres-del-norte-2027-rosemont-vv1a7zk4kgkdecl8m | los-tigres-del-norte | verify (applied) | 18738294 | https://seatgeek.com/los-tigres-del-norte-tickets/rosemont-illinois-allstate-arena-2027-03-20-8-pm/concert/18738294 | - |
| tm-tommy-emmanuel-2027-toronto-z7r9jz1aaeox3 | tommy-emmanuel | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-death-cab-for-cutie-2027-austin-z7r9jz1aa7sc6 | death-cab-for-cutie | verify (applied) | 18715563 | https://seatgeek.com/death-cab-for-cutie-tickets/austin-texas-united-heritage-hall-2027-03-23-7-pm/concert/18715563 | - |
| tm-mercyme-2027-pensacola-g5viz_fuwn07x | mercyme | verify (applied) | 18692241 | https://seatgeek.com/mercyme-tickets/pensacola-florida-pensacola-bay-center-2027-03-24-7-pm/concert/18692241 | - |
| tm-feid-2027-dallas-vvg1yz_pkmsn11 | feid | verify (applied) | 18746738 | https://seatgeek.com/feid-tickets/dallas-texas-american-airlines-center-2027-03-24-8-pm/concert/18746738 | - |
| tm-mercyme-2027-orlando-1kfovp3_ga2o7he | mercyme | verify (applied) | 18692243 | https://seatgeek.com/mercyme-tickets/orlando-florida-addition-financial-arena-2027-03-25-7-pm/concert/18692243 | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dw2ugw | barry-manilow | verify (applied) | 17637123 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-03-25-7-pm/concert/17637123 | - |
| tm-los-tigres-del-norte-2027-miami-vvg1vz_fxmchil | los-tigres-del-norte | verify (applied) | 18738296 | https://seatgeek.com/los-tigres-del-norte-tickets/miami-florida-james-l-knight-center-2027-03-26-8-pm/concert/18738296 | - |
| tm-feid-2027-austin-g5diz_pkrkhdd | feid | verify (applied) | 18746739 | https://seatgeek.com/feid-tickets/austin-texas-moody-center-atx-2027-03-26-8-pm/concert/18746739 | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dw8pgt | barry-manilow | verify (applied) | 17637124 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-03-26-8-pm/concert/17637124 | - |
| tm-vnv-nation-2027-denver-z7r9jz1a7jv8m | vnv-nation | clear (applied) | - | - | stored URL failed: venue mismatch: 'Oriental Theatre-CO' vs 'The Oriental Theater'; no qualifying replacement found |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dwokuv | barry-manilow | verify (applied) | 17637125 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-03-27-7-pm/concert/17637125 | - |
| tm-vnv-nation-2027-st-paul-z7r9jz1a7jzvu | vnv-nation | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-feid-2027-denver-g5vzz_pkrlpf6 | feid | verify (applied) | 18746743 | https://seatgeek.com/feid-tickets/denver-colorado-ball-arena-2027-03-31-8-pm/concert/18746743 | - |
| tm-mercyme-2027-fayetteville-g5evz_frs44wl | mercyme | verify (applied) | 18692247 | https://seatgeek.com/mercyme-tickets/fayetteville-north-carolina-crown-coliseum-crown-complex-2027-04-01-7-pm/concert/18692247 | - |
| tm-los-tigres-del-norte-2027-montreal-z7r9jz1aa7zf8 | los-tigres-del-norte | add (applied) | 18747973 | https://seatgeek.com/los-tigres-del-norte-tickets/montreal-canada-place-des-arts-2027-04-01-8-pm/concert/18747973 | - |
| tm-barry-manilow-2027-las-vegas-1avjz_3gkroi64s | barry-manilow | verify (applied) | 18590289 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-04-01-7-pm/concert/18590289 | - |
| tm-barry-manilow-2027-las-vegas-1avjz_3gkrocmpa | barry-manilow | verify (applied) | 18590288 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-04-02-8-pm/concert/18590288 | - |
| tm-mercyme-2027-salisbury-z7r9jz1aa7_aj | mercyme | verify (applied) | 18692251 | https://seatgeek.com/mercyme-tickets/salisbury-maryland-wicomico-civic-center-2027-04-03-7-pm/concert/18692251 | - |
| tm-barry-manilow-2027-las-vegas-1avjz_3gkrorept | barry-manilow | verify (applied) | 18590286 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2027-04-03-7-pm/concert/18590286 | - |
| tm-mercyme-2027-reading-vv17fz_fgks27zye | mercyme | verify (applied) | 18692254 | https://seatgeek.com/mercyme-tickets/reading-pennsylvania-santander-arena-2027-04-04-7-pm/concert/18692254 | - |
| tm-feid-2027-seattle-vvg1hz_pkvb_3- | feid | verify (applied) | 18746746 | https://seatgeek.com/feid-tickets/seattle-washington-climate-pledge-arena-2027-04-04-8-pm/concert/18746746 | - |
| tm-nothing-but-thieves-2027-san-diego-rz7hnez1afpvcd | nothing-but-thieves | clear (applied) | - | - | stored URL failed: venue mismatch: 'SOMA - Mainstage' vs 'SOMA - San Diego'; no qualifying replacement found |
| tm-mana-2027-highland-z7r9jz1aa7ngx | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-feid-2027-portland-vvg1hz_pckgfmh | feid | verify (applied) | 18746749 | https://seatgeek.com/feid-tickets/portland-oregon-moda-center-2027-04-06-8-pm/concert/18746749 | - |
| tm-missio-2027-dallas-z7r9jz1aazive | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mercyme-2027-portland-vv177z_fgkxgyxqn | mercyme | verify (applied) | 18692256 | https://seatgeek.com/mercyme-tickets/portland-maine-cross-insurance-arena-2027-04-08-7-pm/concert/18692256 | - |
| tm-mana-2027-highland-z7r9jz1aa7x_k | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-feid-2027-sacramento-g5vyz_p5pdckj | feid | verify (applied) | 18746750 | https://seatgeek.com/feid-tickets/sacramento-california-golden-1-center-2027-04-08-8-pm/concert/18746750 | - |
| tm-missio-2027-san-antonio-z7r9jz1aazivi | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-missio-2027-austin-z7r9jz1aazivt | missio | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mercyme-2027-trenton-k7vgf_fedotss | mercyme | verify (applied) | 18692260 | https://seatgeek.com/mercyme-tickets/trenton-new-jersey-cure-insurance-arena-2027-04-10-7-pm/concert/18692260 | - |
| tm-mei-semones-2027-carrboro-z7r9jz1aaefgv | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-gavin-adcock-2027-university-z7r9jz1a7-y8- | gavin-adcock | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-los-tigres-del-norte-2027-los-angeles-z7r9jz1aa7mao | los-tigres-del-norte | verify (applied) | 18739614 | https://seatgeek.com/los-tigres-del-norte-tickets/los-angeles-california-crypto-com-arena-2027-04-10-8-pm/concert/18739614 | - |
| tm-feid-2027-san-francisco-g5vyz_p1g3qkq | feid | verify (applied) | 18746753 | https://seatgeek.com/feid-tickets/san-francisco-california-chase-center-2027-04-10-8-pm/concert/18746753 | - |
| tm-mercyme-2027-johnson-city-z7r9jz1aa7mot | mercyme | verify (applied) | 18692262 | https://seatgeek.com/mercyme-tickets/johnson-city-tennessee-freedom-hall-civic-center-2027-04-11-7-pm/concert/18692262 | - |
| tm-mei-semones-2027-atlanta-z7r9jz1aaeb46 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7x_7 | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-feid-2027-san-jose-g5vyz_p5keuz1 | feid | verify (applied) | 18746754 | https://seatgeek.com/feid-tickets/san-jose-california-sap-center-at-san-jose-2027-04-11-8-pm/concert/18746754 | - |
| tm-foy-vance-2027-cincinnati-z7r9jz1a7-k1v | foy-vance | clear (applied) | - | - | stored URL failed: venue mismatch: 'Memorial Hall - OH' vs 'Anderson Theater At Cincinnati Memorial Hall'; no qualifying replacement found |
| tm-calvin-harris-2027-toronto-1a8zk4fgkevlxcb | calvin-harris | verify (applied) | 18674913 | https://seatgeek.com/calvin-harris-tickets/toronto-canada-scotiabank-arena-2027-04-12-8-pm/concert/18674913 | - |
| tm-earth-wind-fire-2027-pompano-beach-z7r9jz1aaazue | earth-wind-fire | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-nashville-z7r9jz1a7p0ay | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-orlando-z7r9jz1aaevq0 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mat-kearney-2027-durham-z7r9jz1aa7tga | mat-kearney | verify (applied) | 18725770 | https://seatgeek.com/mat-kearney-tickets/durham-north-carolina-carolina-theatre-durham-2027-04-16-7-30-pm/concert/18725770 | - |
| tm-los-tigres-del-norte-2027-atlantic-city-vv17fz_4gkmu5cz_ | los-tigres-del-norte | verify (applied) | 18738298 | https://seatgeek.com/los-tigres-del-norte-tickets/atlantic-city-new-jersey-hard-rock-live-at-etess-arena-2027-04-16-8-30-pm/concert/18738298 | - |
| tm-calvin-harris-2027-hamilton-1a8zk4agkd5cdnl | calvin-harris | verify (applied) | 18674914 | https://seatgeek.com/calvin-harris-tickets/hamilton-canada-td-coliseum-2027-04-17-8-pm/concert/18674914 | - |
| tm-mercyme-2027-cedar-park-g5diz_fiumntg | mercyme | verify (applied) | 18692268 | https://seatgeek.com/mercyme-tickets/cedar-park-texas-h-e-b-center-at-cedar-park-2027-04-17-7-pm/concert/18692268 | - |
| tm-los-tigres-del-norte-2027-hartford-z7r9jz1aaaz18 | los-tigres-del-norte | verify (applied) | 18747975 | https://seatgeek.com/los-tigres-del-norte-tickets/hartford-connecticut-peoplesbank-arena-2027-04-17-8-30-pm/concert/18747975 | - |
| tm-mercyme-2027-bossier-city-g5viz_fdsgolb | mercyme | verify (applied) | 18692269 | https://seatgeek.com/mercyme-tickets/bossier-city-louisiana-brookshire-grocery-arena-2027-04-18-6-30-pm/concert/18692269 | - |
| tm-mat-kearney-2027-charlotte-g5evz_ftdyo7x | mat-kearney | verify (applied) | 18725925 | https://seatgeek.com/mat-kearney-tickets/charlotte-north-carolina-the-fillmore-charlotte-2027-04-18-8-pm/concert/18725925 | - |
| tm-meshuggah-2027-salt-lake-city-g5vzz_4r3jsmh | meshuggah | verify (applied) | 18724672 | https://seatgeek.com/meshuggah-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2027-04-19-6-30-pm/concert/18724672 | - |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0v4 | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lola-young-2027-chicago-vv1kvzvpoega5wbhb | lola-young | verify (applied) | 18662116 | https://seatgeek.com/lola-young-tickets/chicago-illinois-the-salt-shed-indoors-2027-04-21-7-30-pm/concert/18662116 | - |
| tm-mei-semones-2027-san-diego-z7r9jz1aae3k4 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0vp | teddy-swims | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mercyme-2027-tulsa-1aezz_fgkbolkrk | mercyme | verify (applied) | 18692271 | https://seatgeek.com/mercyme-tickets/tulsa-oklahoma-bok-center-2027-04-22-7-pm/concert/18692271 | - |
| tm-mat-kearney-2027-washington-1a4zk49gkdhkrsu | mat-kearney | verify (applied) | 18726087 | https://seatgeek.com/mat-kearney-tickets/washington-district-of-columbia-lincoln-theatre-dc-2027-04-22-8-pm/concert/18726087 | - |
| tm-mercyme-2027-lincoln-vv17bz_fgktuaum7 | mercyme | verify (applied) | 18692274 | https://seatgeek.com/mercyme-tickets/lincoln-nebraska-pinnacle-bank-arena-2027-04-23-7-pm/concert/18692274 | - |
| tm-los-tigres-del-norte-2027-duluth-vvg1zz_fq51ps_ | los-tigres-del-norte | verify (applied) | 18738682 | https://seatgeek.com/los-tigres-del-norte-tickets/duluth-georgia-gas-south-arena-2027-04-23-8-pm/concert/18738682 | - |
| tm-mat-kearney-2027-atlantic-city-vv1aezk48gkd-q-0n | mat-kearney | verify (applied) | 18726580 | https://seatgeek.com/mat-kearney-tickets/atlantic-city-new-jersey-music-box-at-the-borgata-2027-04-23-8-pm/concert/18726580 | - |
| tm-lola-young-2027-st-paul-z7r9jz1aaebve | lola-young | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mercyme-2027-moline-vv17bz_fgkwrzpms | mercyme | verify (applied) | 18692276 | https://seatgeek.com/mercyme-tickets/moline-illinois-vibrant-arena-at-the-mark-2027-04-24-7-pm/concert/18692276 | - |
| tm-los-tigres-del-norte-2027-charlotte-g5evz_fqspq1u | los-tigres-del-norte | verify (applied) | 18738300 | https://seatgeek.com/los-tigres-del-norte-tickets/charlotte-north-carolina-spectrum-center-charlotte-2027-04-24-8-pm/concert/18738300 | - |
| tm-calvin-harris-2027-fort-worth-vvg1yz_flvwxhm | calvin-harris | verify (applied) | 18674837 | https://seatgeek.com/calvin-harris-tickets/fort-worth-texas-ariat-arena-2027-04-24-8-pm/concert/18674837 | - |
| tm-mercyme-2027-grand-rapids-vv17oz_fgkmddfhb | mercyme | verify (applied) | 18692277 | https://seatgeek.com/mercyme-tickets/grand-rapids-michigan-van-andel-arena-2027-04-25-7-pm/concert/18692277 | - |
| tm-lola-young-2027-denver-g5vzz_f11k7mj | lola-young | verify (applied) | 18649718 | https://seatgeek.com/lola-young-tickets/denver-colorado-fillmore-auditorium-denver-2027-04-25-8-pm/concert/18649718 | - |
| tm-mat-kearney-2027-portsmouth-z7r9jz1aa7s83 | mat-kearney | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lola-young-2027-salt-lake-city-g5vzz_fk8daho | lola-young | verify (applied) | 18649720 | https://seatgeek.com/lola-young-tickets/salt-lake-city-utah-the-union-event-center-salt-lake-city-2027-04-26-8-pm/concert/18649720 | - |
| tm-mat-kearney-2027-new-york-vv16dzk44g3zauv5ea | mat-kearney | verify (applied) | 18726039 | https://seatgeek.com/mat-kearney-tickets/new-york-new-york-the-town-hall-new-york-2027-04-27-7-30-pm/concert/18726039 | - |
| tm-the-psychedelic-furs-2027-huntington-k7vgf_3n_asme | the-psychedelic-furs | clear (applied) | - | - | stored URL failed: venue mismatch: 'The Paramount in concert with Northwell' vs 'The Paramount - Huntington'; no qualifying replacement found |
| tm-foreigner-2027-montclair-vv1aezkf_gkded4lx | foreigner | verify (applied) | 18550003 | https://seatgeek.com/foreigner-tickets/montclair-new-jersey-the-wellmont-theater-2027-04-28-8-pm/concert/18550003 | - |
| tm-mat-kearney-2027-portland-vv177z_fgkbwdmul | mat-kearney | verify (applied) | 18725688 | https://seatgeek.com/mat-kearney-tickets/portland-maine-state-theatre-portland-me-2027-04-28-8-pm/concert/18725688 | - |
| tm-saint-levant-2027-san-diego-rz7hnez1afa7-7 | saint-levant | clear (applied) | - | - | stored URL failed: venue mismatch: 'SOMA - Mainstage' vs 'SOMA - San Diego'; no qualifying replacement found |
| tm-lola-young-2027-seattle-vvg1hz_falrsfg | lola-young | verify (applied) | 18649719 | https://seatgeek.com/lola-young-tickets/seattle-washington-wamu-theater-2027-04-28-8-pm/concert/18649719 | - |
| tm-noah-kahan-2027-tampa-vvg1vz_4rlk1ty | noah-kahan | verify (applied) | 18728707 | https://seatgeek.com/noah-kahan-tickets/tampa-florida-raymond-james-stadium-2027-04-29-6-30-pm/concert/18728707 | - |
| tm-mercyme-2027-milwaukee-vv17jz_fgkboydiq | mercyme | verify (applied) | 18692280 | https://seatgeek.com/mercyme-tickets/milwaukee-wisconsin-uw-milwaukee-panther-arena-2027-04-29-7-pm/concert/18692280 | - |
| tm-lola-young-2027-vancouver-16ozk4vpyzau66a6 | lola-young | verify (applied) | 18649726 | https://seatgeek.com/lola-young-tickets/vancouver-canada-ubc-doug-mitchell-thunderbird-sports-centre-2027-04-29-8-pm/concert/18649726 | - |
| tm-mat-kearney-2027-mckees-rocks-1avbz_fgkh6lcsf | mat-kearney | verify (applied) | 18726607 | https://seatgeek.com/mat-kearney-tickets/mckees-rocks-pennsylvania-roxian-theatre-2027-04-30-6-30-pm/concert/18726607 | - |
| tm-foreigner-2027-port-chester-g5vvz_ony3-go | foreigner | verify (applied) | 18550006 | https://seatgeek.com/foreigner-tickets/port-chester-new-york-the-capitol-theatre-port-chester-2027-04-30-8-pm/concert/18550006 | - |
| tm-mercyme-2027-springfield-vv1a6zk4agkeirfgx | mercyme | verify (applied) | 18692282 | https://seatgeek.com/mercyme-tickets/springfield-illinois-bank-of-springfield-center-2027-04-30-7-pm/concert/18692282 | - |
| tm-mei-semones-2027-boise-z7r9jz1aaekjo | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mat-kearney-2027-cincinnati-16pzk48jvzacdggk | mat-kearney | verify (applied) | 18725946 | https://seatgeek.com/mat-kearney-tickets/cincinnati-ohio-taft-theatre-2027-05-01-7-30-pm/concert/18725946 | - |
| tm-the-warning-2027-oklahoma-city-z7r9jz1aavtgp | the-warning | clear (applied) | - | - | stored URL failed: venue mismatch: 'Criterion Theater - Oklahoma City' vs 'The Criterion - OKC'; no qualifying replacement found |
| tm-haiden-henderson-2027-milwaukee-z7r9jz1aaeea6 | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-salt-lake-city-z7r9jz1aaefc8 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-zac-brown-band-2027-sparks-1avjz_4gkrmjou6 | zac-brown-band | verify (applied) | 18739090 | https://seatgeek.com/zac-brown-band-tickets/sparks-nevada-nugget-event-center-2027-05-01-7-pm/concert/18739090 | - |
| tm-warren-zeiders-2027-charlotte-z7r9jz1aaeb7u | warren-zeiders | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-foreigner-2027-westbury-k7vgf_ocs3r5v | foreigner | verify (applied) | 18549843 | https://seatgeek.com/foreigner-tickets/westbury-new-york-flagstar-at-westbury-music-fair-2027-05-02-8-pm/concert/18549843 | - |
| tm-meshuggah-2027-oklahoma-city-z7r9jz1aa7izs | meshuggah | clear (applied) | - | - | stored URL failed: venue mismatch: 'Criterion Theater - Oklahoma City' vs 'The Criterion - OKC'; no qualifying replacement found |
| tm-haiden-henderson-2027-minneapolis-z7r9jz1aaeerb | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-denver-z7r9jz1aae37y | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-too-many-zooz-2027-oklahoma-city-z7r9jz1aaee-e | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2027-charlotte-g5evz_4r3uqrt | noah-kahan | verify (applied) | 18728703 | https://seatgeek.com/noah-kahan-tickets/charlotte-north-carolina-bank-of-america-stadium-2027-05-06-6-30-pm/concert/18728703 | - |
| tm-meshuggah-2027-new-orleans-g5viz_49c3t4b | meshuggah | verify (applied) | 18724691 | https://seatgeek.com/meshuggah-tickets/new-orleans-louisiana-fillmore-new-orleans-2027-05-06-6-pm/concert/18724691 | - |
| tm-mei-semones-2027-lexington-z7r9jz1aaek09 | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-remi-wolf-2027-austin-g5diz_fncgjpo | remi-wolf | verify (applied) | 18664777 | https://seatgeek.com/remi-wolf-tickets/austin-texas-moody-amphitheater-2027-05-06-7-pm/concert/18664777 | - |
| tm-haiden-henderson-2027-salt-lake-city-z7r9jz1aaeefa | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mei-semones-2027-columbus-z7r9jz1aaef7k | mei-semones | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-hazlett-2027-east-cleveland-z7r9jz1a7pe8a | hazlett | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-two-door-cinema-club-2027-milwaukee-vv1a6zk47gkemmn1x | two-door-cinema-club | verify (applied) | 18711332 | https://seatgeek.com/two-door-cinema-club-tickets/milwaukee-wisconsin-landmark-credit-union-live-2027-05-08-7-30-pm/concert/18711332 | - |
| tm-two-door-cinema-club-2027-st-paul-z7r9jz1aa7p8o | two-door-cinema-club | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-seattle-z7r9jz1aa79uf | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-haiden-henderson-2027-portland-z7r9jz1aaeekk | haiden-henderson | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jon-pardi-2027-loveland-z7r9jz1aazeb3 | jon-pardi | clear (applied) | - | - | stored URL failed: venue mismatch: 'Blue Arena at The Ranch Events Complex' vs 'Blue Federal Credit Union Arena'; no qualifying replacement found |
| tm-too-many-zooz-2027-portland-z7r9jz1aaeerf | too-many-zooz | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-lizzy-mcalpine-2027-oklahoma-city-z7r9jz1aaea-p | lizzy-mcalpine | clear (applied) | - | - | stored URL failed: venue mismatch: 'Thelma Gaylord Performing Arts Theatre' vs 'Thelma Gaylord PAT At Civic Center Music Hall'; no qualifying replacement found |
| tm-dylan-gossett-2027-oklahoma-city-z7r9jz1aae4ba | dylan-gossett | clear (applied) | - | - | stored URL failed: venue mismatch: 'Criterion Theater - Oklahoma City' vs 'The Criterion - OKC'; no qualifying replacement found |
| tm-zach-bryan-2027-nashville-z7r9jz1aa7k17 | zach-bryan | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |
| tm-flans-2027-grand-prairie-z7r9jz1aaeaoe | flans | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-jack-johnson-2027-las-vegas-1avjz_fgkthyfka | jack-johnson | verify (applied) | 18738901 | https://seatgeek.com/jack-johnson-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2027-06-02-8-pm/concert/18738901 | - |
| tm-jack-johnson-2027-las-vegas-1avjz_fgkthbfkc | jack-johnson | verify (applied) | 18738900 | https://seatgeek.com/jack-johnson-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2027-06-03-8-pm/concert/18738900 | - |
| tm-kings-of-leon-2027-hamburg-z698xzc2z1kjifpz9 | kings-of-leon | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-death-cab-for-cutie-2027-milwaukee-vv17jz_4gkdidvax | death-cab-for-cutie | verify (applied) | 18738391 | https://seatgeek.com/death-cab-for-cutie-tickets/milwaukee-wisconsin-bmo-pavilion-2027-06-25-7-pm/concert/18738391 | - |
| tm-oasis-2027-munich-z698xzc2z16vca8yqu | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-munich-z698xzc2z16ezoffov | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-kenny-chesney-2027-nashville-z7r9jz1aavsaa | kenny-chesney | conflict | - | - | ambiguous: 2 qualifying SeatGeek events in the window |
| tm-oasis-2027-munich-z698xzc2z16v7f7_4g | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-noah-kahan-2027-sevilla-z698xz2qz16v3duzrf | noah-kahan | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-barcelona-z698xz2qz1kosq3xa | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-barcelona-z698xz2qz1kvz7a4m | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-amsterdam-z698xzbpz16vrdz-8b | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-oasis-2027-amsterdam-z698xzbpz1kodp337 | oasis | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mat-kearney-2027-austin-z7r9jz1aa7t0p | mat-kearney | add (applied) | 18747385 | https://seatgeek.com/mat-kearney-tickets/austin-texas-austin-city-limits-live-at-the-moody-theater-2027-08-13-8-pm/concert/18747385 | - |
| tm-mat-kearney-2027-dallas-z7r9jz1aa7s_b | mat-kearney | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mat-kearney-2027-cerritos-vvg1iz_4z4bvmr | mat-kearney | verify (applied) | 18725672 | https://seatgeek.com/mat-kearney-tickets/cerritos-california-cerritos-center-2027-08-21-7-30-pm/concert/18725672 | - |
| tm-the-red-clay-strays-2027-englewood-z7r9jz1aaef4s | the-red-clay-strays | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mat-kearney-2027-boise-z7r9jz1aa7yr7 | mat-kearney | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7x_6 | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7ng- | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mana-2027-highland-z7r9jz1aa7x_a | mana | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-fontaines-d-c-2027-asheville-z7r9jz1aae84b | fontaines-d-c | verify (applied) | 18642845 | https://seatgeek.com/fontaines-d-c-tickets/asheville-north-carolina-hellbenders-by-the-orange-peel-2027-10-07-6-30-pm/concert/18642845 | - |
| tm-mat-kearney-2027-madison-vv1a6zk48gkehsz0t | mat-kearney | clear (applied) | - | - | stored URL failed: venue mismatch: 'Orpheum Theater' vs 'Orpheum Theatre - Madison'; no qualifying replacement found |
| tm-mat-kearney-2027-shipshewana-z7r9jz1aa7t8k | mat-kearney | none | - | - | no qualifying SeatGeek listing (may not be listed) |
| tm-mat-kearney-2027-cleveland-vv1aazk4fgkdoxqwy | mat-kearney | verify (applied) | 18725705 | https://seatgeek.com/mat-kearney-tickets/cleveland-ohio-house-of-blues-cleveland-2027-11-10-6-30-pm/concert/18725705 | - |
| tm-mat-kearney-2027-omaha-1aozk4kgkes-kce | mat-kearney | verify (applied) | 18726697 | https://seatgeek.com/mat-kearney-tickets/omaha-nebraska-steelhouse-omaha-2027-11-12-7-30-pm/concert/18726697 | - |
| tm-mat-kearney-2027-atlanta-vvg1zz_4golpzd | mat-kearney | verify (applied) | 18725655 | https://seatgeek.com/mat-kearney-tickets/atlanta-georgia-the-tabernacle-atlanta-2027-11-19-7-30-pm/concert/18725655 | - |
| tm-sombr-2026-indianapolis-vv1aazk3apba_ze8u | sombr | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18175596 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-michelle-branch-2026-asbury-park-k7vgf_c7zp9vt | michelle-branch | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18373504 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-amble-2026-boston-vv177z_agkwhenya | amble | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18222463 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-mico-2026-toronto-177zv0g61sycnt1 | mico | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18252202 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-zac-brown-band-2026-detroit-vv1afzk8vgkdi6e86 | zac-brown-band | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18032030 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-sleeping-with-sirens-2026-philadelphia-vvg1fz_gm9cqxe | sleeping-with-sirens | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18312116 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-little-big-town-2026-durham-g5evz_gplfpyl | little-big-town | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18292628 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-stella-lefty-2026-dallas-vvg1yz_1xpakgv | stella-lefty | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18252621 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-tobymac-2026-evansville-vvg1fz_1ipflre | tobymac | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18239020 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-dylan-scott-2026-westbury-k7vgf_oh3fr0h | dylan-scott | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18529124 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-sabaton-2026-dallas-vvg1yzbwnj2elc | sabaton | unverify (applied) | - | - | stored URL failed: SeatGeek /events/17732671 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-rod-wave-2026-columbia-g5evz_udquqas | rod-wave | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18320065 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-a-boogie-wit-da-hoodie-2026-boston-vv1a8vpgbgaumyrw | a-boogie-wit-da-hoodie | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18637279 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-anuel-aa-2026-belmont-park-1ayzkffgkd4zfkj | anuel-aa | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18579489 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-three-days-grace-2026-tulsa-1aozkupgkdxuamf | three-days-grace | unverify (applied) | - | - | stored URL failed: SeatGeek /events/17895159 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-jodeci-2026-detroit-vvg1oz_2lg-loc | jodeci | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18407238 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-jonas-brothers-2026-birmingham-1aezz_8gkmdc0pi | jonas-brothers | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18503986 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-dave-matthews-band-2026-nashville-g5viz_2znwmqm | dave-matthews-band | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18474895 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-arcangel-2026-irving-vvg1yz_5kyqgxt | arcangel | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18266326 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-dan-shay-2026-anaheim-vvg10z_1damnyd | dan-shay | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18250837 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-cristian-castro-2026-glendale-1a_zko8gkebja4t | cristian-castro | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18078145 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-the-smashing-pumpkins-2026-seattle-vvg1hz_1wymaop | the-smashing-pumpkins | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18250170 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-ricky-martin-2026-lincoln-g5vyz_grrfawg | ricky-martin | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18318163 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwppux | barry-manilow | unverify (applied) | - | - | stored URL failed: SeatGeek /events/17637145 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-mon-laferte-2026-san-jose-g5vyz_kmf8y1d | mon-laferte | unverify (applied) | - | - | stored URL failed: SeatGeek /events/18140311 returned HTTP 404 (listing confirmed gone); previously verified record no longer matches |
| tm-ed-sheeran-2026-tampa-0d006331d60a3a7a | ed-sheeran | verify (applied) | 17738474 | https://seatgeek.com/ed-sheeran-tickets/tampa-florida-raymond-james-stadium-2026-11-07-5-30-pm/concert/17738474 | - |
| tm-olivia-rodrigo-2026-philadelphia-1adzz_agkmzlmmg | olivia-rodrigo | verify (applied) | 18211690 | https://seatgeek.com/olivia-rodrigo-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-11-07-7-pm/concert/18211690 | - |
| tm-tobymac-2026-cleveland-vvg1fz_1raogqa | tobymac | verify (applied) | 18238371 | https://seatgeek.com/tobymac-tickets/cleveland-ohio-wolstein-center-2026-11-07-7-pm/concert/18238371 | - |
| tm-amble-2026-brooklyn-k7vgf_ad7j_qa | amble | verify (applied) | 18223366 | https://seatgeek.com/amble-tickets/brooklyn-new-york-brooklyn-paramount-2026-11-07-7-pm/concert/18223366 | - |
| tm-mico-2026-toronto-177zv0g659n9upv | mico | verify (applied) | 18260543 | https://seatgeek.com/mico-tickets/toronto-canada-the-danforth-music-hall-2026-11-07-7-pm/concert/18260543 | - |
| tm-sleeping-with-sirens-2026-new-york-k7vgf_gnebmkt | sleeping-with-sirens | verify (applied) | 18311638 | https://seatgeek.com/sleeping-with-sirens-tickets/new-york-new-york-manhattan-center-hammerstein-ballroom-2026-11-07-7-pm/concert/18311638 | - |
| tm-gavin-adcock-2026-reading-vv1aezkotgkeivbwv | gavin-adcock | verify (applied) | 18126468 | https://seatgeek.com/gavin-adcock-tickets/reading-pennsylvania-santander-arena-2026-11-07-7-pm/concert/18126468 | - |
| tm-journey-2026-uniondale-k7vgf_1ka_zph | journey | verify (applied) | 18237083 | https://seatgeek.com/journey-tickets/uniondale-new-york-nassau-coliseum-2026-11-07-7-30-pm/concert/18237083 | - |
| tm-stella-lefty-2026-houston-g5diz_1ymrkkp | stella-lefty | verify (applied) | 18252613 | https://seatgeek.com/stella-lefty-tickets/houston-texas-the-bronze-peacock-at-house-of-blues-houston-2026-11-07-7-pm/concert/18252613 | - |
| tm-sabaton-2026-houston-g5dizbwlrp709 | sabaton | verify (applied) | 17732669 | https://seatgeek.com/sabaton-tickets/houston-texas-713-music-hall-2026-11-07-7-pm/concert/17732669 | - |
| tm-a-boogie-wit-da-hoodie-2026-boston-vv1a8vpgbgauu_ra | a-boogie-wit-da-hoodie | verify (applied) | 18629299 | https://seatgeek.com/a-boogie-wit-da-hoodie-tickets/boston-massachusetts-agganis-arena-2026-11-07-8-pm/concert/18629299 | - |
| tm-air-supply-2026-stamford-g5vvz_axiecx- | air-supply | verify (applied) | 18126968 | https://seatgeek.com/air-supply-tickets/stamford-connecticut-the-palace-theatre-stamford-2026-11-07-8-pm/concert/18126968 | - |
| tm-three-days-grace-2026-saint-louis-vv1akzku0gkd5ahjs | three-days-grace | verify (applied) | 17895158 | https://seatgeek.com/three-days-grace-tickets/saint-louis-missouri-enterprise-center-2026-11-07-7-pm/concert/17895158 | - |
| tm-dave-matthews-band-2026-chicago-vvg18z_cde9wdz | dave-matthews-band | verify (applied) | 18474896 | https://seatgeek.com/dave-matthews-band-tickets/chicago-illinois-united-center-2026-11-07-7-30-pm/concert/18474896 | - |
| tm-steve-lacy-2026-austin-g5diz_8pb91k2 | steve-lacy | verify (applied) | 18485938 | https://seatgeek.com/steve-lacy-tickets/austin-texas-moody-amphitheater-2026-11-07-8-pm/concert/18485938 | - |
| tm-rawayana-2026-chicago-vv178z_kgkrasef7 | rawayana | verify (applied) | 18126546 | https://seatgeek.com/rawayana-tickets/chicago-illinois-byline-bank-aragon-ballroom-2026-11-07-8-pm/concert/18126546 | - |
| tm-jodeci-2026-chicago-vvg1jz_2brfg7b | jodeci | verify (applied) | 18407239 | https://seatgeek.com/jodeci-tickets/chicago-illinois-arie-crown-theater-2026-11-07-8-pm/concert/18407239 | - |
| tm-dan-shay-2026-mountain-view-g5vyz_1wl9ah6 | dan-shay | verify (applied) | 18250838 | https://seatgeek.com/dan-shay-tickets/mountain-view-california-shoreline-amphitheatre-2026-11-07-7-pm/concert/18250838 | - |
| tm-cristian-castro-2026-el-paso-vvg1yz_adzeyjf | cristian-castro | verify (applied) | 18078276 | https://seatgeek.com/cristian-castro-tickets/el-paso-texas-el-paso-county-coliseum-2026-11-07-8-pm/concert/18078276 | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwpuu0 | barry-manilow | verify (applied) | 17637146 | https://seatgeek.com/barry-manilow-tickets/las-vegas-nevada-westgate-las-vegas-resort-casino-2026-11-07-7-pm/concert/17637146 | - |
| tm-mon-laferte-2026-inglewood-vv170z_kgksmomdw | mon-laferte | verify (applied) | 18140313 | https://seatgeek.com/mon-laferte-tickets/inglewood-california-kia-forum-2026-11-07-8-pm/concert/18140313 | - |
| tm-metallica-2026-las-vegas-1fayv048rez72afa | metallica | verify (applied) | 18103477 | https://seatgeek.com/metallica-tickets/las-vegas-nevada-sphere-2026-11-07-8-30-pm/concert/18103477 | - |
| tm-trivium-2026-grand-rapids-vvg1oz_cnishwh | trivium | verify (applied) | 18391933 | https://seatgeek.com/trivium-tickets/grand-rapids-michigan-glc-live-at-20-monroe-2026-11-08-5-30-pm/concert/18391933 | - |
| tm-olivia-rodrigo-2026-philadelphia-1adzz_agkmzoemy | olivia-rodrigo | verify (applied) | 18211692 | https://seatgeek.com/olivia-rodrigo-tickets/philadelphia-pennsylvania-xfinity-mobile-arena-2026-11-08-7-pm/concert/18211692 | - |
| tm-sombr-2026-columbus-vv1kv8v0xbga57f2- | sombr | verify (applied) | 18175600 | https://seatgeek.com/sombr-tickets/columbus-ohio-nationwide-arena-2026-11-08-7-pm/concert/18175600 | - |
| tm-tobymac-2026-greensboro-g5evz_1nayk4t | tobymac | verify (applied) | 18238331 | https://seatgeek.com/tobymac-tickets/greensboro-north-carolina-first-horizon-coliseum-2026-11-08-7-pm/concert/18238331 | - |
| tm-sleeping-with-sirens-2026-baltimore-17a8v0g6gxtb5eg | sleeping-with-sirens | verify (applied) | 18312278 | https://seatgeek.com/sleeping-with-sirens-tickets/baltimore-maryland-nevermore-hall-2026-11-08-7-pm/concert/18312278 | - |
| tm-blue-october-2026-nashville-vv1aazkosgkezrhqm | blue-october | verify (applied) | 18141852 | https://seatgeek.com/blue-october-tickets/nashville-indiana-brown-county-music-center-2026-11-08-7-30-pm/concert/18141852 | - |
| tm-the-red-clay-strays-2026-jonesboro-g5viz_f5t3whv | the-red-clay-strays | verify (applied) | 18200020 | https://seatgeek.com/the-red-clay-strays-tickets/jonesboro-arkansas-first-national-bank-arena-2026-11-08-6-30-pm/concert/18200020 | - |
| tm-jodeci-2026-indianapolis-vvg1fz_2rfzpki | jodeci | verify (applied) | 18407240 | https://seatgeek.com/jodeci-tickets/indianapolis-indiana-murat-theatre-at-old-national-centre-2026-11-08-7-30-pm/concert/18407240 | - |
| tm-mana-2026-austin-g5dizbmoaqckm | mana | verify (applied) | 17938859 | https://seatgeek.com/mana-tickets/austin-texas-moody-center-atx-2026-11-08-8-30-pm/concert/17938859 | - |
| tm-beck-2026-seattle-vvg1hz_3rxx2pm | beck | verify (applied) | 18590355 | https://seatgeek.com/beck-tickets/seattle-washington-benaroya-hall-2026-11-08-7-pm/concert/18590355 | - |
| tm-ricky-martin-2026-temecula-vvg1iz_g21wliz | ricky-martin | verify (applied) | 18325393 | https://seatgeek.com/ricky-martin-tickets/temecula-california-pechanga-resort-casino-2026-11-08-7-30-pm/concert/18325393 | - |
| tm-daughtry-2026-napa-g5vyz_gnjfn19 | daughtry | verify (applied) | 18316806 | https://seatgeek.com/daughtry-tickets/napa-california-uptown-theatre-napa-2026-11-08-7-pm/concert/18316806 | - |
| tm-the-psychedelic-furs-2026-del-mar-vvg1iz_a3sju3n | the-psychedelic-furs | verify (applied) | 18091775 | https://seatgeek.com/the-psychedelic-furs-tickets/del-mar-california-the-sound-del-mar-2026-11-08-8-pm/concert/18091775 | - |
| tm-the-smashing-pumpkins-2026-san-jose-g5vyz_1dhcziz | the-smashing-pumpkins | verify (applied) | 18250171 | https://seatgeek.com/the-smashing-pumpkins-tickets/san-jose-california-sap-center-at-san-jose-2026-11-08-8-pm/concert/18250171 | - |
| tm-mon-laferte-2026-inglewood-vvg10z_gloruht | mon-laferte | verify (applied) | 18311530 | https://seatgeek.com/mon-laferte-tickets/inglewood-california-kia-forum-2026-11-08-8-pm/concert/18311530 | - |
| tm-dave-matthews-band-2026-providence-vvg17z_2piw04c | dave-matthews-band | verify (applied) | 18474897 | https://seatgeek.com/dave-matthews-band-tickets/providence-rhode-island-amica-mutual-pavilion-2026-11-09-7-30-pm/concert/18474897 | - |
| tm-rod-wave-2026-orlando-17fov0g6u6bzp82 | rod-wave | verify (applied) | 18320069 | https://seatgeek.com/rod-wave-tickets/orlando-florida-kia-center-2026-11-09-8-30-pm/concert/18320069 | - |
| tm-three-days-grace-2026-kansas-city-vv1akzkujgkeirwar | three-days-grace | verify (applied) | 17895165 | https://seatgeek.com/three-days-grace-tickets/kansas-city-missouri-t-mobile-center-2026-11-09-7-pm/concert/17895165 | - |
| tm-jonas-brothers-2026-oklahoma-city-vvg1yz_8mnyt3j | jonas-brothers | verify (applied) | 18503896 | https://seatgeek.com/jonas-brothers-tickets/oklahoma-city-oklahoma-paycom-center-2026-11-09-7-30-pm/concert/18503896 | - |
| tm-beck-2026-vancouver-1aozk3a0babze8k | beck | verify (applied) | 18194425 | https://seatgeek.com/beck-tickets/vancouver-canada-queen-elizabeth-theatre-vancouver-2026-11-09-8-pm/concert/18194425 | - |
| tm-sienna-spiro-2026-san-francisco-g5vyz_gkw-ewe | sienna-spiro | verify (applied) | 18297308 | https://seatgeek.com/sienna-spiro-tickets/san-francisco-california-castro-theatre-2026-11-09-8-pm/concert/18297308 | - |
| tm-trivium-2026-silver-spring-17a8v0g6cngp9y6 | trivium | verify (applied) | 18391934 | https://seatgeek.com/trivium-tickets/silver-spring-maryland-the-fillmore-silver-spring-2026-11-10-6-35-pm/concert/18391934 | - |
| tm-stella-lefty-2026-atlanta-vvg1zz_1byaqd- | stella-lefty | verify (applied) | 18251775 | https://seatgeek.com/stella-lefty-tickets/atlanta-georgia-the-masquerade-hell-2026-11-10-7-pm/concert/18251775 | - |
| tm-the-neighbourhood-2026-atlanta-vvg1zz_73eik7i | the-neighbourhood | verify (applied) | 18085136 | https://seatgeek.com/the-neighbourhood-tickets/atlanta-georgia-state-farm-arena-1-2026-11-10-7-30-pm/concert/18085136 | - |
| tm-dave-matthews-band-2026-baltimore-1ka8vpevgauw1qw | dave-matthews-band | verify (applied) | 18474899 | https://seatgeek.com/dave-matthews-band-tickets/baltimore-maryland-cfg-bank-arena-2026-11-10-7-30-pm/concert/18474899 | - |
| tm-michelle-branch-2026-chicago-vvg18z_c6jmind | michelle-branch | verify (applied) | 18373509 | https://seatgeek.com/michelle-branch-tickets/chicago-illinois-house-of-blues-chicago-2026-11-10-8-pm/concert/18373509 | - |
| tm-amble-2026-philadelphia-vv17fz_agkycvjx3 | amble | verify (applied) | 18222479 | https://seatgeek.com/amble-tickets/philadelphia-pennsylvania-theatre-of-living-arts-2026-11-10-8-pm/concert/18222479 | - |
| tm-rod-wave-2026-orlando-17fov0g6uhspnas | rod-wave | verify (applied) | 18414835 | https://seatgeek.com/rod-wave-tickets/orlando-florida-kia-center-2026-11-10-8-pm/concert/18414835 | - |
| tm-jodeci-2026-cincinnati-17aov0g62qly9ie | jodeci | verify (applied) | 18407241 | https://seatgeek.com/jodeci-tickets/cincinnati-ohio-andrew-j-brady-music-center-2026-11-10-8-pm/concert/18407241 | - |
| tm-pentatonix-2026-casper-g5vzz_2uvfg47 | pentatonix | verify (applied) | 18427194 | https://seatgeek.com/pentatonix-tickets/casper-wyoming-ford-wyoming-center-2026-11-10-7-pm/concert/18427194 | - |
| tm-sienna-spiro-2026-los-angeles-vvg10z_gpwxv_j | sienna-spiro | verify (applied) | 18297309 | https://seatgeek.com/sienna-spiro-tickets/los-angeles-california-the-wiltern-2026-11-10-8-pm/concert/18297309 | - |
| tm-daughtry-2026-anaheim-vvg10z_grix-n9 | daughtry | verify (applied) | 18316807 | https://seatgeek.com/daughtry-tickets/anaheim-california-city-national-grove-of-anaheim-2026-11-10-7-pm/concert/18316807 | - |
| tm-don-omar-2026-ontario-vvg10z_1tpplao | don-omar | verify (applied) | 18250868 | https://seatgeek.com/don-omar-tickets/ontario-california-toyota-arena-ontario-2026-11-10-8-pm/concert/18250868 | - |
| tm-olivia-rodrigo-2026-atlanta-vvg1zz_auw2ij5 | olivia-rodrigo | verify (applied) | 18211693 | https://seatgeek.com/olivia-rodrigo-tickets/atlanta-georgia-state-farm-arena-1-2026-11-11-7-pm/concert/18211693 | - |
| tm-amble-2026-washington-1avfz_agkmvpzjt | amble | verify (applied) | 18222468 | https://seatgeek.com/amble-tickets/washington-district-of-columbia-9-30-club-2026-11-11-7-pm/concert/18222468 | - |
| tm-the-neighbourhood-2026-orlando-1axzkoogkembvjl | the-neighbourhood | verify (applied) | 18085138 | https://seatgeek.com/the-neighbourhood-tickets/orlando-florida-kia-center-2026-11-11-7-30-pm/concert/18085138 | - |
| tm-sleeping-with-sirens-2026-charlotte-g5evz_gnuzybg | sleeping-with-sirens | verify (applied) | 18311702 | https://seatgeek.com/sleeping-with-sirens-tickets/charlotte-north-carolina-the-fillmore-charlotte-2026-11-11-7-pm/concert/18311702 | - |
| tm-missio-2026-denver-g5vzz_8l-vdn4 | missio | verify (applied) | 18492221 | https://seatgeek.com/missio-tickets/denver-colorado-marquis-theater-denver-2026-11-11-7-pm/concert/18492221 | - |
| tm-sabaton-2026-phoenix-1av0zbwgkrn_kuq | sabaton | verify (applied) | 17732667 | https://seatgeek.com/sabaton-tickets/phoenix-arizona-arizona-financial-theatre-2026-11-11-7-pm/concert/17732667 | - |
| tm-katseye-2026-dallas-vvg1yz_1jrlmao | katseye | verify (applied) | 18240151 | https://seatgeek.com/katseye-tickets/dallas-texas-american-airlines-center-2026-11-11-8-pm/concert/18240151 | - |
| tm-three-days-grace-2026-denver-g5vzzbuiyxc-- | three-days-grace | verify (applied) | 17895166 | https://seatgeek.com/three-days-grace-tickets/denver-colorado-ball-arena-2026-11-11-7-pm/concert/17895166 | - |
| tm-the-psychedelic-furs-2026-riverside-vvg1iz_cbbunjv | the-psychedelic-furs | verify (applied) | 18394805 | https://seatgeek.com/the-psychedelic-furs-tickets/riverside-california-fox-performing-arts-center-2026-11-11-7-pm/concert/18394805 | - |
| tm-the-smashing-pumpkins-2026-phoenix-17k8v0g61xa1k9d | the-smashing-pumpkins | verify (applied) | 18250172 | https://seatgeek.com/the-smashing-pumpkins-tickets/phoenix-arizona-mortgage-matchup-center-2026-11-11-8-pm/concert/18250172 | - |
| tm-lionel-richie-2026-las-vegas-17ayv0g62k5zuj3 | lionel-richie | verify (applied) | 18405684 | https://seatgeek.com/lionel-richie-tickets/las-vegas-nevada-encore-at-wynn-las-vegas-2026-11-11-8-pm/concert/18405684 | - |
| tm-brand-new-2026-san-francisco-g5vyz_ghzwhnz | brand-new | verify (applied) | 18319858 | https://seatgeek.com/brand-new-tickets/san-francisco-california-bill-graham-civic-auditorium-2026-11-11-8-pm/concert/18319858 | - |
| tm-beartooth-2026-new-york-k7vgf_1s1uowe | beartooth | verify (applied) | 18253044 | https://seatgeek.com/beartooth-tickets/new-york-new-york-manhattan-center-hammerstein-ballroom-2026-11-12-6-30-pm/concert/18253044 | - |
| tm-olivia-rodrigo-2026-atlanta-vvg1zz_auw8bjb | olivia-rodrigo | verify (applied) | 18211698 | https://seatgeek.com/olivia-rodrigo-tickets/atlanta-georgia-state-farm-arena-1-2026-11-12-7-pm/concert/18211698 | - |
| tm-sombr-2026-pittsburgh-1kaov0xfga560gt | sombr | verify (applied) | 18175603 | https://seatgeek.com/sombr-tickets/pittsburgh-pennsylvania-ppg-paints-arena-2026-11-12-7-pm/concert/18175603 | - |
| tm-stella-lefty-2026-toronto-177zv0g61mkytjo | stella-lefty | verify (applied) | 18252162 | https://seatgeek.com/stella-lefty-tickets/toronto-canada-the-opera-house-toronto-2026-11-12-7-pm/concert/18252162 | - |
| tm-the-neighbourhood-2026-miami-vvg1vz_7e0samz | the-neighbourhood | verify (applied) | 18085137 | https://seatgeek.com/the-neighbourhood-tickets/miami-florida-kaseya-center-2026-11-12-7-30-pm/concert/18085137 | - |
| tm-dave-matthews-band-2026-new-york-g5diz_2njwaf8 | dave-matthews-band | verify (applied) | 18474900 | https://seatgeek.com/dave-matthews-band-tickets/new-york-new-york-madison-square-garden-2026-11-12-7-30-pm/concert/18474900 | - |
| tm-blue-october-2026-red-bank-g5vvz_kudtusm | blue-october | verify (applied) | 18141374 | https://seatgeek.com/blue-october-tickets/red-bank-new-jersey-hackensack-meridian-health-theatre-at-count-basie-center-2026-11-12-8-pm/concert/18141374 | - |
| tm-pentatonix-2026-lincoln-vv1akzkf7gkdppsjy | pentatonix | verify (applied) | 18427193 | https://seatgeek.com/pentatonix-tickets/lincoln-nebraska-pinnacle-bank-arena-2026-11-12-7-pm/concert/18427193 | - |
| tm-treaty-oak-revival-2026-austin-g5diz_19twyeh | treaty-oak-revival | verify (applied) | 18229329 | https://seatgeek.com/treaty-oak-revival-tickets/austin-texas-moody-center-atx-2026-11-12-7-pm/concert/18229329 | - |
| tm-jon-pardi-2026-cedar-rapids-vvg1bz_ctazgrx | jon-pardi | verify (applied) | 18390356 | https://seatgeek.com/jon-pardi-tickets/cedar-rapids-iowa-alliant-energy-powerhouse-2026-11-12-7-pm/concert/18390356 | - |
| tm-jodeci-2026-national-harbor-164zk3ffyzacfekc | jodeci | verify (applied) | 18407243 | https://seatgeek.com/jodeci-tickets/national-harbor-maryland-the-theater-at-mgm-national-harbor-2026-11-12-8-pm/concert/18407243 | - |

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
| tm-john-summit-2026-chicago-z7r9jz1aazo4o | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-champaign-z7r9jz1a70ijb | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-hamilton-177zv0g65247nfx | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-toronto-177zv0g65ctmbsj | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-boston-vvg17z_51ivlnd | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-university-park-vvg1fz_55aanmw | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-john-summit-2026-houston-z7r9jz1a70t74 | john-summit | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazgb_ | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bad-bunny-2026-san-juan-z7r9jz1aazm40 | bad-bunny | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-karol-g-2026-arlington-z7r9jz1a7xfrb | karol-g | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-kansas-city-z7r9jz1a70v1a | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-saint-paul-z7r9jz1a7xf0u | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-orlando-1aefz_fgkd1sjat | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-sunrise-z7r9jz1a70v8i | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-houston-z7r9jz1a7x4fs | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-austin-g5diz_fxgrqaf | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-fort-worth-vvg1yz_flxlbcf | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-teddy-swims-2026-salt-lake-city-z7r9jz1a7x_ag | teddy-swims | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-hartford-z7r9jz1a70eoa | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-san-antonio-g5diz_1dg8uln | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-houston-z7r9jz1a70e_w | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-salt-lake-city-z7r9jz1a70efv | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-don-omar-2026-san-jose-g5vyz_1mqembe | don-omar | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-abilene-z7r9jz1a7-v0n | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-lubbock-z7r9jz1a70v8t | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-tulsa-z7r9jz1a7-v0_ | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-wichita-z7r9jz1a7-v0p | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-milwaukee-z7r9jz1a7-v04 | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-grand-rapids-vv1kezv0_8ga1aqp6 | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-detroit-vv17oz_kgkmvfl46 | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-toronto-1avzz_kgkvawuqh | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blue-october-2026-portland-vv177z_kgkuvxsds | blue-october | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-pentatonix-2026-tacoma-vvg1hz_2zdlw0j | pentatonix | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-forest-brussels-z698xzg2z16vrkgpa9 | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-dusseldorf-z698xzc2z16vq4jjgn | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tyla-2026-berlin-z698xzc2z16vfognfa | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sabaton-2026-vancouver-z7r9jz1a7-ojs | sabaton | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-oberhausen-z698xzc2z16v0vue-v | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-hannover-z698xzc2z16vcpokjv | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-berlin-z698xzc2z16vovkbjo | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beartooth-2026-oberhausen-z698xzc2z16voyj3up | beartooth | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-san-francisco-z7r9jz1a70epk | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-west-hollywood-z7r9jz1a70e4e | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-los-angeles-z7r9jz1a70sod | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-stella-lefty-2026-phoenix-z7r9jz1a70tgw | stella-lefty | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tobymac-2026-columbia-vvg1bz_1xth3vu | tobymac | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7-zq4 | andrea-bocelli | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-andrea-bocelli-2026-morrison-z7r9jz1a7oy3p | andrea-bocelli | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-phoenix-z7r9jz1aaziv4 | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-san-diego-vvg1iz_8m2p9ef | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-seattle-z7r9jz1a7jfoo | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-portland-z7r9jz1a7jfov | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-san-luis-obispo-z7r9jz1a7jfbx | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-aspen-z7r9jz1a7jfoj | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-boulder-z7r9jz1a7jffk | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-boston-z7r9jz1a7j4zs | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-atlanta-z7r9jz1a7pf-y | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-philadelphia-z7r9jz1a7pxvf | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-milwaukee-z7r9jz1a7pfos | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-minneapolis-z7r9jz1a7pfoy | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-blondshell-2026-portland-z7r9jz1a70e_4 | blondshell | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-michelle-branch-2026-salt-lake-city-z7r9jz1aav-qo | michelle-branch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-death-cab-for-cutie-2026-brussels-z698xzg2z1ayvwax | death-cab-for-cutie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-charli-xcx-2026-las-vegas-z7r9jz1a7p8v- | charli-xcx | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-doja-cat-2026-las-vegas-z7r9jz1a7js4u | doja-cat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfc4w | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1a9zko4gkdtfc4g | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1fayv048rvz72a6e | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1fayv048rvz72a6k | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-metallica-2026-las-vegas-1fayv048rez72a62 | metallica | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-five-finger-death-punch-2026-huntsville-z7r9jz1a7ooob | five-finger-death-punch | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-missio-2026-san-francisco-z7r9jz1aazja_ | missio | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7pajj | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sylvan-esso-2026-asheville-z7r9jz1a7paje | sylvan-esso | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-tommy-emmanuel-2026-anchorage-z7r9jz1a7pdjf | tommy-emmanuel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-scott-2026-dallas-z7r9jz1aavsep | dylan-scott | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-san-francisco-g5vyz_gntwbu0 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-seattle-z7r9jz1a70p_0 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-vancouver-1av7z_agkmsrf76 | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-detroit-vv1afzk39gkeeybaa | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-toronto-1avzz_agki7dtkh | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-ottawa-1ad7z_agkivxxic | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-grand-rapids-z7r9jz1a70vjk | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-savannah-vvg1zz_fxgmnus | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-greenville-g5evz_a5lvwt0 | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-nashville-g5vizbum8x11w | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-nashville-g5vizbubiwctj | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-knoxville-g5viz_ae91dt_ | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-birmingham-1aozk38gkdpv4cc | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-red-clay-strays-2026-baton-rouge-z7r9jz1a70vj6 | the-red-clay-strays | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-beverly-z7r9jz1a7pyjj | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-florence-17aov0g6gj3vrxt | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-greensburg-z7r9jz1aazman | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-wheeling-z7r9jz1aav9u8 | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-nashville-vvg1fz_gmyo5fy | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-la-vista-17fzv0g6gnabvqc | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-des-moines-vvg1bz_gwkrfot | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-kansas-city-vvg1bz_gsftuwt | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-daughtry-2026-oklahoma-city-z7r9jz1a7px8p | daughtry | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-madrid-z698xz2qz1k__7ko4 | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-barcelona-z698xz2qz16vvp4sps | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-riley-green-2026-nashville-z7r9jz1aaekfy | riley-green | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-hamburg-z698xzc2z1ka-fjkp | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-niall-horan-2026-berlin-z698xzc2z16vvx0w-e | niall-horan | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shakira-2026-madrid-z698xz2qz16evp_eqp | shakira | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-san-francisco-g5vyzbgd1f1iu | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-neighbourhood-2026-inglewood-vv170zbggkzetq9z | the-neighbourhood | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-staind-2026-phoenix-1av0z_dgku63v-5 | staind | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-staind-2026-albuquerque-g5vzz_dsirnej | staind | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-gossett-2026-waco-z7r9jz1a7jdak | dylan-gossett | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dylan-gossett-2026-pittsburgh-17aov0g6u5ijrxe | dylan-gossett | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-tyla-2026-oslo-z698xzb_z16v-8-pb8 | tyla | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fkj-2026-k-benhavn-v-z698xzc4z16vvpef0i | fkj | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fkj-2026-praha-1-z698xzu0z16v7kp8r6 | fkj | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-rocklin-z7r9jz1a7--1k | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-napa-g5vyz_aulujn5 | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-menlo-park-z7r9jz1a7p90y | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-menlo-park-z7r9jz1a7p9pd | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-psychedelic-furs-2026-fresno-g5vyz_aupip7f | the-psychedelic-furs | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-josiah-queen-2026-westlake-village-rz7hnez1afuekf | josiah-queen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-josiah-queen-2026-trinity-rz7hnez1afuea0 | josiah-queen | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-amble-2026-phoenix-rz7hnez1afk4vf | amble | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-praha-7-z698xzu0z16vouudjv | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fontaines-d-c-2026-oslo-z698xzb_z16vftpojp | fontaines-d-c | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-warren-zeiders-2026-oslo-z698xzb_z16v4v_kce | warren-zeiders | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-columbus-vvg1fz_u68l-x- | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-brooklyn-17gzv0g6uz2i9rf | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-brooklyn-17gzv0g6uhl8aq4 | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rod-wave-2026-charlotte-g5evz_uk3_hwq | rod-wave | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-the-smashing-pumpkins-2026-madison-z7r9jz1a700fm | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-saint-paul-z7r9jz1a70xpt | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-oklahoma-city-vvg1yz_1hjjehy | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-denver-g5vzz_1xqviwv | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-salt-lake-city-z7r9jz1a70x_g | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-las-vegas-z7r9jz1a70x-e | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-calgary-1778v0g61djnfzx | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-the-smashing-pumpkins-2026-vancouver-1778v0g61badswr | the-smashing-pumpkins | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-bakersfield-z7r9jz1aazpuu | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-bakersfield-z7r9jz1aavaxk | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-fresno-g5vyz_89-ysvr | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-fresno-g5vyz_8kys-gg | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-west-valley-city-g5vzz_8qlaba8 | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-morrison-z7r9jz1aazpuz | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-fuerza-regida-2026-morrison-z7r9jz1aazt0f | fuerza-regida | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-leon-bridges-2026-miami-z7r9jz1aaeaqz | leon-bridges | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlk3fc | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlfwft | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlawfd | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlge4b | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlu34n | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlc34z | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdl23po | earth-wind-fire | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-jonas-brothers-2026-cleveland-z7r9jz1aazw4y | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-rosemont-vv178z_8gkymmwt7 | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-toronto-1avzz_ogkui9hto | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-pittsburgh-1avbz_8gky0yxyy | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-saint-paul-z7r9jz1aazwba | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-kansas-city-vv17bz_8gkbffbsf | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jonas-brothers-2026-nashville-g5viz_8vksnah | jonas-brothers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-valencia-z698xz2qz1aofa18 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-sevilla-z698xz2qz16vb7goa0 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-madrid-z698xz2qz1kv97no3 | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-madrid-z698xz2qz16vao-oox | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-morat-2026-madrid-z698xz2qz16v0v0ypz | morat | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ye-2026-houston-g5diz_osqzjfe | ye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-kevin-gates-2026-nashville-g5viz_kuq0g54 | kevin-gates | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-boston-z7r9jz1a7pwfs | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-boston-z7r9jz1a7ps_m | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-newport-z7r9jz1aaz_o7 | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-atlanta-z7r9jz1a7pyrk | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-hollywood-vvg1vz_gl6rgiu | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-independence-vvg1bz_uefy4ji | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-grand-prairie-z7r9jz1a7pijy | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brand-new-2026-denver-z7r9jz1a7ptjo | brand-new | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-garth-brooks-2026-tulsa-1aozkfugkd8c0en | garth-brooks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-garth-brooks-2026-tulsa-1aozkfugkdlv4l0 | garth-brooks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-garth-brooks-2026-tulsa-1aozkfugkdlmpx_ | garth-brooks | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-tom-jones-2026-wheatland-g5vyz_1uw3ukc | tom-jones | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-a-boogie-wit-da-hoodie-2026-belmont-park-1adzz_8gkuljdyg | a-boogie-wit-da-hoodie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-a-boogie-wit-da-hoodie-2026-belmont-park-17gzv0g6ctu4ij2 | a-boogie-wit-da-hoodie | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-lafayette-g5viz_52-gfk2 | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-rogers-g5viz_5ulwxbq | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-duluth-vvg1zz_5pbvq93 | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-zach-top-2026-nashville-g5viz_g6sznnj | zach-top | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-belmont-park-17gzv0g61mqcddn | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-montreal-17g8v0g61xoe95k | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-katseye-2026-hamilton-177zv0g61i6mwwe | katseye | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ricky-martin-2026-thackerville-z7r9jz1a7jax9 | ricky-martin | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ricky-martin-2026-las-vegas-17ayv0g6ubm5h5l | ricky-martin | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ricky-martin-2026-las-vegas-17ayv0g6ubmuh5y | ricky-martin | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-ty-myers-2026-pikeville-1apzkovgkdxnmip | ty-myers | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-dallas-vvg1yz_1thoo6h | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-maryland-heights-vvg1bz_1udxnrk | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-denver-g5vzz_1dezhf3 | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-salt-lake-city-z7r9jz1a70jp0 | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dan-shay-2026-phoenix-17k8v0g61dxzizm | dan-shay | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-inglewood-vvg10z_ucyohlw | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-san-diego-vvg1iz_u3myfkf | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-oakland-g5vyz_ufp_rvl | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-vancouver-1778v0g6u5paqr- | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beabadoobee-2026-seattle-vvg1hz_u_uadg3 | beabadoobee | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-dave-matthews-band-2026-madison-z7r9jz1aazj8x | dave-matthews-band | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-los-tigres-del-norte-2026-glendale-1fk8v0p7atz785ae | los-tigres-del-norte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-sleeping-with-sirens-2026-grand-rapids-vvg1oz_gxwrjxj | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-pittsburgh-z7r9jz1a7p_ae | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-royal-oak-z7r9jz1a7p_ad | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-montreal-17g8v0g6gxey070 | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-ottawa-17g8v0g6gwupswm | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-toronto-177zv0g6gwdvb1r | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-boston-vvg17z_gmbz9_j | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sleeping-with-sirens-2026-sayreville-z7r9jz1a7p_a7 | sleeping-with-sirens | event is in the past — SeatGeek delists finished shows; nothing to maintain |
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
| tm-mico-2026-brooklyn-rz7hnez1afcpa7 | mico | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-washington-1avfz_fgkdleutu | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-durham-g5evz_fbugjju | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-asheville-g5evz_ftjugdd | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-atlanta-vvg1zz_fbor4w0 | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-beck-2026-nashville-g5viz_kspxnlj | beck | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-turnpike-troubadours-2026-saint-augustine-z7r9jz1a7-v0a | turnpike-troubadours | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-turnpike-troubadours-2026-clearwater-z7r9jz1a7-ga_ | turnpike-troubadours | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-billy-strings-2026-baltimore-1avfz_6gkmktg1d | billy-strings | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-treaty-oak-revival-2026-corpus-christi-z7r9jz1a70e78 | treaty-oak-revival | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw4juo | barry-manilow | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-koe-wetzel-2026-morrison-z7r9jz1a7-0gf | koe-wetzel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-koe-wetzel-2026-lubbock-z7r9jz1a7-jaw | koe-wetzel | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-victoria-monet-2026-atlanta-z7r9jz1aavpbj | victoria-monet | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jon-pardi-2026-biloxi-g5viz_ctexxwa | jon-pardi | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jon-pardi-2026-macon-vvg1zz_cbiziyi | jon-pardi | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-jon-pardi-2026-laredo-g5diz_ctprcyh | jon-pardi | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-brandi-carlile-2026-portland-z7r9jz1aaea4m | brandi-carlile | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-little-big-town-2026-san-antonio-z7r9jz1a7p8a_ | little-big-town | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-little-big-town-2026-houston-g5diz_g2cmeda | little-big-town | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-little-big-town-2026-dallas-vvg1yz_g1nt6fw | little-big-town | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-shaboozey-2026-los-angeles-z7r9jz1a70kpt | shaboozey | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-illenium-2026-las-vegas-z7r9jz1aaz7qs | illenium | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mraf38 | bryan-adams | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mr173- | bryan-adams | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-bryan-adams-2026-las-vegas-17ayv0g62mr1v3m | bryan-adams | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-foreigner-2026-lincoln-g5vyz_66kfcgc | foreigner | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-sting-2026-cincinnati-1apzko9gkelizys | sting | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-three-days-grace-2026-indianapolis-vv11v8vn_af0q_vg | three-days-grace | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-rawayana-2026-national-harbor-1avfz_kgkw9bb9h | rawayana | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mercyme-2026-colorado-springs-z7r9jz1a70nz_ | mercyme | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-omer-adam-2026-brooklyn-1ayzk4vgkdfutko | omer-adam | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mon-laferte-2026-salt-lake-city-z7r9jz1a70v_v | mon-laferte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
| tm-mon-laferte-2026-las-vegas-z7r9jz1a7-sud | mon-laferte | event is in the past — SeatGeek delists finished shows; nothing to maintain |
