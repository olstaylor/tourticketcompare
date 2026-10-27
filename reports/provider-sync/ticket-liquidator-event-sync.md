# Ticket Liquidator event sync log

Generated: 2026-10-27T01:15:10.065Z

Written by `scripts/sync-impact-marketplace-events.mjs`. One Impact catalog
fetch per registry-verified artist; a link is written only for one
unambiguous listing whose artist, venue, city and venue-local date all agree.
`scripts/report-link-coverage.mjs` reads the notes column as coverage evidence.

## Run summary

- Mode: apply
- Events selected: 3432
- API calls made: 529
- Verified provenance written: 0
- URLs added: 87
- URLs corrected: 0
- URLs cleared: 0
- Provenance un-verified: 24
- Conflicts (ambiguous, untouched): 51
- No qualifying listing (complete catalog): 1069
- Not checked (catalog incomplete): 0

## Outcomes

| showId | artist | action | Ticket Liquidator id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-harry-styles-2026-new-york-3b00643506bf83b6 | Harry Styles | none | 7695893 | https://www.ticketliquidator.com/tickets/7695893/Harry-Styles-tickets-Wed-Oct-28-2026-Madison-Square-Garden | - |
| tm-harry-styles-2026-new-york-3b00643506cf83cb | Harry Styles | none | 7695894 | https://www.ticketliquidator.com/tickets/7695894/Harry-Styles-tickets-Fri-Oct-30-2026-Madison-Square-Garden | - |
| tm-harry-styles-2026-new-york-3b00643506da83de | Harry Styles | none | 7695895 | https://www.ticketliquidator.com/tickets/7695895/Harry-Styles-tickets-Sat-Oct-31-2026-Madison-Square-Garden | - |
| tm-olivia-rodrigo-2026-toronto-1avzz_agkmwmykb | Olivia Rodrigo | none | - | - | no qualifying listing (complete catalog checked) |
| tm-olivia-rodrigo-2026-toronto-1avzz_agkvcvogj | Olivia Rodrigo | none | - | - | no qualifying listing (complete catalog checked) |
| tm-olivia-rodrigo-2026-columbus-vv17fz_agkmtn2ij | Olivia Rodrigo | none | 7921659 | https://www.ticketliquidator.com/tickets/7921659/Olivia-Rodrigo-tickets-Thu-Oct-29-2026-Value-City-Arena-at-The-Schottenstein-Center | - |
| tm-olivia-rodrigo-2026-columbus-vv17fz_agkmtnri- | Olivia Rodrigo | none | 7921660 | https://www.ticketliquidator.com/tickets/7921660/Olivia-Rodrigo-tickets-Fri-Oct-30-2026-Value-City-Arena-at-The-Schottenstein-Center | - |
| tm-olivia-rodrigo-2026-philadelphia-1adzz_agkmzlmmg | Olivia Rodrigo | none | 7921661 | https://www.ticketliquidator.com/tickets/7921661/Olivia-Rodrigo-tickets-Sat-Nov-7-2026-Xfinity-Mobile-Arena | - |
| tm-olivia-rodrigo-2026-philadelphia-1adzz_agkmzoemy | Olivia Rodrigo | none | 7921662 | https://www.ticketliquidator.com/tickets/7921662/Olivia-Rodrigo-tickets-Sun-Nov-8-2026-Xfinity-Mobile-Arena | - |
| tm-olivia-rodrigo-2026-atlanta-vvg1zz_auw2ij5 | Olivia Rodrigo | none | 7921663 | https://www.ticketliquidator.com/tickets/7921663/Olivia-Rodrigo-tickets-Wed-Nov-11-2026-State-Farm-Arena-GA | - |
| tm-olivia-rodrigo-2026-atlanta-vvg1zz_auw8bjb | Olivia Rodrigo | none | 7921664 | https://www.ticketliquidator.com/tickets/7921664/Olivia-Rodrigo-tickets-Thu-Nov-12-2026-State-Farm-Arena-GA | - |
| tm-olivia-rodrigo-2026-orlando-1aefz_agkup8poj | Olivia Rodrigo | none | 7921665 | https://www.ticketliquidator.com/tickets/7921665/Olivia-Rodrigo-tickets-Sun-Nov-15-2026-Kia-Center | - |
| tm-olivia-rodrigo-2026-orlando-1aefz_agkuwopdf | Olivia Rodrigo | none | 7921666 | https://www.ticketliquidator.com/tickets/7921666/Olivia-Rodrigo-tickets-Mon-Nov-16-2026-Kia-Center | - |
| tm-olivia-rodrigo-2026-sunrise-z7r9jz1a7067f | Olivia Rodrigo | none | 7921667 | https://www.ticketliquidator.com/tickets/7921667/Olivia-Rodrigo-tickets-Thu-Nov-19-2026-Amerant-Bank-Arena | - |
| tm-olivia-rodrigo-2026-sunrise-z7r9jz1a7067o | Olivia Rodrigo | none | 7921668 | https://www.ticketliquidator.com/tickets/7921668/Olivia-Rodrigo-tickets-Fri-Nov-20-2026-Amerant-Bank-Arena | - |
| tm-olivia-rodrigo-2026-nashville-g5viz_avuiqeo | Olivia Rodrigo | none | 7921669 | https://www.ticketliquidator.com/tickets/7921669/Olivia-Rodrigo-tickets-Mon-Nov-23-2026-Bridgestone-Arena | - |
| tm-olivia-rodrigo-2026-nashville-g5viz_avcebgh | Olivia Rodrigo | none | 7921670 | https://www.ticketliquidator.com/tickets/7921670/Olivia-Rodrigo-tickets-Tue-Nov-24-2026-Bridgestone-Arena | - |
| tm-olivia-rodrigo-2026-vancouver-1av7z_agkueipzb | Olivia Rodrigo | none | 7921691 | https://www.ticketliquidator.com/tickets/7921691/Olivia-Rodrigo-tickets-Tue-Dec-1-2026-Rogers-Arena | - |
| tm-olivia-rodrigo-2026-vancouver-1av7z_agkueckzj | Olivia Rodrigo | none | 7921692 | https://www.ticketliquidator.com/tickets/7921692/Olivia-Rodrigo-tickets-Wed-Dec-2-2026-Rogers-Arena | - |
| tm-olivia-rodrigo-2026-seattle-vvg1hz_amovxty | Olivia Rodrigo | none | 7921671 | https://www.ticketliquidator.com/tickets/7921671/Olivia-Rodrigo-tickets-Mon-Dec-7-2026-Climate-Pledge-Arena | - |
| tm-olivia-rodrigo-2026-seattle-vvg1hz_amegpa1 | Olivia Rodrigo | none | 7921672 | https://www.ticketliquidator.com/tickets/7921672/Olivia-Rodrigo-tickets-Tue-Dec-8-2026-Climate-Pledge-Arena | - |
| tm-olivia-rodrigo-2026-oakland-g5vyz_ambko0b | Olivia Rodrigo | none | 7921673 | https://www.ticketliquidator.com/tickets/7921673/Olivia-Rodrigo-tickets-Fri-Dec-11-2026-Oakland-Arena | - |
| tm-olivia-rodrigo-2026-oakland-g5vyz_ambfsp1 | Olivia Rodrigo | none | 7921674 | https://www.ticketliquidator.com/tickets/7921674/Olivia-Rodrigo-tickets-Sat-Dec-12-2026-Oakland-Arena | - |
| tm-olivia-rodrigo-2026-sacramento-g5vyz_awltsfi | Olivia Rodrigo | none | 7921675 | https://www.ticketliquidator.com/tickets/7921675/Olivia-Rodrigo-tickets-Tue-Dec-15-2026-Golden-1-Center | - |
| tm-olivia-rodrigo-2026-sacramento-g5vyz_awlnnfy | Olivia Rodrigo | none | 7921676 | https://www.ticketliquidator.com/tickets/7921676/Olivia-Rodrigo-tickets-Wed-Dec-16-2026-Golden-1-Center | - |
| tm-olivia-rodrigo-2026-las-vegas-z7r9jz1a706kk | Olivia Rodrigo | none | 7921677 | https://www.ticketliquidator.com/tickets/7921677/Olivia-Rodrigo-tickets-Sat-Dec-19-2026-T-Mobile-Arena | - |
| tm-olivia-rodrigo-2026-las-vegas-z7r9jz1a706kf | Olivia Rodrigo | none | 7921678 | https://www.ticketliquidator.com/tickets/7921678/Olivia-Rodrigo-tickets-Sun-Dec-20-2026-T-Mobile-Arena | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmesjcw | Olivia Rodrigo | none | 7921679 | https://www.ticketliquidator.com/tickets/7921679/Olivia-Rodrigo-tickets-Tue-Jan-12-2027-Intuit-Dome | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmetj8b | Olivia Rodrigo | none | 7921680 | https://www.ticketliquidator.com/tickets/7921680/Olivia-Rodrigo-tickets-Wed-Jan-13-2027-Intuit-Dome | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmikkku | Olivia Rodrigo | none | 7921681 | https://www.ticketliquidator.com/tickets/7921681/Olivia-Rodrigo-tickets-Sat-Jan-16-2027-Intuit-Dome | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmijp45 | Olivia Rodrigo | none | 7921682 | https://www.ticketliquidator.com/tickets/7921682/Olivia-Rodrigo-tickets-Sun-Jan-17-2027-Intuit-Dome | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mjrpr | Olivia Rodrigo | none | 7939456 | https://www.ticketliquidator.com/tickets/7939456/Olivia-Rodrigo-tickets-Wed-Jan-20-2027-Intuit-Dome | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mtrph | Olivia Rodrigo | none | 7940735 | https://www.ticketliquidator.com/tickets/7940735/Olivia-Rodrigo-tickets-Thu-Jan-21-2027-Intuit-Dome | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mirjo | Olivia Rodrigo | none | 7940980 | https://www.ticketliquidator.com/tickets/7940980/Olivia-Rodrigo-tickets-Sun-Jan-24-2027-Intuit-Dome | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mrtjd | Olivia Rodrigo | none | 7943084 | https://www.ticketliquidator.com/tickets/7943084/Olivia-Rodrigo-tickets-Mon-Jan-25-2027-Intuit-Dome | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mwte- | Olivia Rodrigo | none | 7946756 | https://www.ticketliquidator.com/tickets/7946756/Olivia-Rodrigo-tickets-Thu-Jan-28-2027-Intuit-Dome | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mzliq | Olivia Rodrigo | none | 7946757 | https://www.ticketliquidator.com/tickets/7946757/Olivia-Rodrigo-tickets-Fri-Jan-29-2027-Intuit-Dome | - |
| tm-olivia-rodrigo-2027-brooklyn-1ayzk39gkdwvwfq | Olivia Rodrigo | none | 7921683 | https://www.ticketliquidator.com/tickets/7921683/Olivia-Rodrigo-tickets-Thu-Feb-11-2027-Barclays-Center | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkv43gjn | Olivia Rodrigo | none | 7921684 | https://www.ticketliquidator.com/tickets/7921684/Olivia-Rodrigo-tickets-Fri-Feb-12-2027-Barclays-Center | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkv44jjl | Olivia Rodrigo | none | 7921685 | https://www.ticketliquidator.com/tickets/7921685/Olivia-Rodrigo-tickets-Mon-Feb-15-2027-Barclays-Center | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkv49hjs | Olivia Rodrigo | none | 7921686 | https://www.ticketliquidator.com/tickets/7921686/Olivia-Rodrigo-tickets-Tue-Feb-16-2027-Barclays-Center | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwvwpx | Olivia Rodrigo | none | 7939015 | https://www.ticketliquidator.com/tickets/7939015/Olivia-Rodrigo-tickets-Fri-Feb-19-2027-Barclays-Center | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwdwpi | Olivia Rodrigo | none | 7940856 | https://www.ticketliquidator.com/tickets/7940856/Olivia-Rodrigo-tickets-Sat-Feb-20-2027-Barclays-Center | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwkupi | Olivia Rodrigo | none | 7942121 | https://www.ticketliquidator.com/tickets/7942121/Olivia-Rodrigo-tickets-Tue-Feb-23-2027-Barclays-Center | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwfupw | Olivia Rodrigo | none | 7942272 | https://www.ticketliquidator.com/tickets/7942272/Olivia-Rodrigo-tickets-Wed-Feb-24-2027-Barclays-Center | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvw1wpg | Olivia Rodrigo | none | 7944931 | https://www.ticketliquidator.com/tickets/7944931/Olivia-Rodrigo-tickets-Sat-Feb-27-2027-Barclays-Center | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwuqpx | Olivia Rodrigo | none | 7945595 | https://www.ticketliquidator.com/tickets/7945595/Olivia-Rodrigo-tickets-Sun-Feb-28-2027-Barclays-Center | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz16vawas-e | Olivia Rodrigo | none | 7921730 | https://www.ticketliquidator.com/tickets/7921730/Olivia-Rodrigo-tickets-Tue-Mar-23-2027-Ziggo-Dome | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz1kk7ajpa | Olivia Rodrigo | none | 7921731 | https://www.ticketliquidator.com/tickets/7921731/Olivia-Rodrigo-tickets-Wed-Mar-24-2027-Ziggo-Dome | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz16v1zf-za | Olivia Rodrigo | none | 7938168 | https://www.ticketliquidator.com/tickets/7938168/Olivia-Rodrigo-tickets-Sat-Mar-27-2027-Ziggo-Dome | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz16v_8bagm | Olivia Rodrigo | none | 7938169 | https://www.ticketliquidator.com/tickets/7938169/Olivia-Rodrigo-tickets-Sun-Mar-28-2027-Ziggo-Dome | - |
| tm-olivia-rodrigo-2027-munich-z698xzc2z1kfyg9ao | Olivia Rodrigo | none | 7921732 | https://www.ticketliquidator.com/tickets/7921732/Olivia-Rodrigo-tickets-Thu-Apr-1-2027-Kleine-Olympiahalle-Munich | - |
| tm-olivia-rodrigo-2027-munich-z698xzc2z16vuw_9j8 | Olivia Rodrigo | none | 7921733 | https://www.ticketliquidator.com/tickets/7921733/Olivia-Rodrigo-tickets-Fri-Apr-2-2027-Kleine-Olympiahalle-Munich | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkuyj7ah | Olivia Rodrigo | none | - | - | no qualifying listing (complete catalog checked) |
| tm-olivia-rodrigo-2027-london-1adfz_agkusg7f3 | Olivia Rodrigo | none | - | - | no qualifying listing (complete catalog checked) |
| tm-olivia-rodrigo-2027-london-1adfz_agkusmfph | Olivia Rodrigo | none | - | - | no qualifying listing (complete catalog checked) |
| tm-olivia-rodrigo-2027-london-1adfz_agkug10qr | Olivia Rodrigo | none | - | - | no qualifying listing (complete catalog checked) |
| tm-olivia-rodrigo-2027-london-1adfz_agkdf5uep | Olivia Rodrigo | none | - | - | no qualifying listing (complete catalog checked) |
| tm-olivia-rodrigo-2027-london-1adfz_agkdbfuff | Olivia Rodrigo | none | - | - | no qualifying listing (complete catalog checked) |
| tm-olivia-rodrigo-2027-london-1adfz_agkdqyuqd | Olivia Rodrigo | none | - | - | no qualifying listing (complete catalog checked) |
| tm-olivia-rodrigo-2027-london-1adfz_agkdjmpol | Olivia Rodrigo | none | - | - | no qualifying listing (complete catalog checked) |
| tm-olivia-rodrigo-2027-london-1adfz_agkdj-m1i | Olivia Rodrigo | none | - | - | no qualifying listing (complete catalog checked) |
| tm-olivia-rodrigo-2027-barcelona-z698xz2qz1kf4gb0b | Olivia Rodrigo | none | 7921741 | https://www.ticketliquidator.com/tickets/7921741/Olivia-Rodrigo-tickets-Sat-May-1-2027-Palau-Sant-Jordi | - |
| tm-olivia-rodrigo-2027-barcelona-z698xz2qz1k8uzwj6 | Olivia Rodrigo | none | 7921742 | https://www.ticketliquidator.com/tickets/7921742/Olivia-Rodrigo-tickets-Sun-May-2-2027-Palau-Sant-Jordi | - |
| tm-olivia-rodrigo-2027-barcelona-z698xz2qz16ezxvpe7 | Olivia Rodrigo | none | 7938204 | https://www.ticketliquidator.com/tickets/7938204/Olivia-Rodrigo-tickets-Wed-May-5-2027-Palau-Sant-Jordi | - |
| tm-olivia-rodrigo-2027-barcelona-z698xz2qz1k8ffjf_ | Olivia Rodrigo | none | 8127307 | https://www.ticketliquidator.com/tickets/8127307/Olivia-Rodrigo-tickets-Thu-May-6-2027-Palau-Sant-Jordi | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkdz-z3p | Olivia Rodrigo | none | - | - | no qualifying listing (complete catalog checked) |
| tm-olivia-rodrigo-2027-london-1adfz_agkdd-fh3 | Olivia Rodrigo | none | - | - | no qualifying listing (complete catalog checked) |
| tm-ed-sheeran-2026-hollywood-0d006331a7d91aff | Ed Sheeran | none | 7418599 | https://www.ticketliquidator.com/tickets/7418599/Ed-Sheeran-tickets-Thu-Oct-29-2026-Hard-Rock-Live-At-The-Seminole-Hard-Rock-Hotel-Casino-Hollywood | - |
| tm-ed-sheeran-2026-hollywood-0d006331f45e4089 | Ed Sheeran | none | 7418600 | https://www.ticketliquidator.com/tickets/7418600/Ed-Sheeran-tickets-Fri-Oct-30-2026-Hard-Rock-Live-At-The-Seminole-Hard-Rock-Hotel-Casino-Hollywood | - |
| tm-ed-sheeran-2026-tampa-0d006331d60a3a7a | Ed Sheeran | none | 7418601 | https://www.ticketliquidator.com/tickets/7418601/Ed-Sheeran-tickets-Sat-Nov-7-2026-Raymond-James-Stadium | - |
| tm-gracie-abrams-2026-denver-g5vzz_55eui2w | Gracie Abrams | none | 8002235 | https://www.ticketliquidator.com/tickets/8002235/Gracie-Abrams-tickets-Wed-Dec-2-2026-Ball-Arena | - |
| tm-gracie-abrams-2026-denver-g5vzz_5lhxedg | Gracie Abrams | none | 8002236 | https://www.ticketliquidator.com/tickets/8002236/Gracie-Abrams-tickets-Thu-Dec-3-2026-Ball-Arena | - |
| tm-gracie-abrams-2026-oakland-g5vyz_1udxfhx | Gracie Abrams | none | 8002237 | https://www.ticketliquidator.com/tickets/8002237/Gracie-Abrams-tickets-Sun-Dec-6-2026-Oakland-Arena | - |
| tm-gracie-abrams-2026-oakland-g5vyz_5mq0w7n | Gracie Abrams | none | 8002238 | https://www.ticketliquidator.com/tickets/8002238/Gracie-Abrams-tickets-Mon-Dec-7-2026-Oakland-Arena | - |
| tm-gracie-abrams-2026-glendale-17k8v0g652smnjw | Gracie Abrams | none | 8002239 | https://www.ticketliquidator.com/tickets/8002239/Gracie-Abrams-tickets-Wed-Dec-9-2026-Desert-Diamond-Arena | - |
| tm-gracie-abrams-2026-glendale-17k8v0g65839wds | Gracie Abrams | none | 8002240 | https://www.ticketliquidator.com/tickets/8002240/Gracie-Abrams-tickets-Thu-Dec-10-2026-Desert-Diamond-Arena | - |
| tm-gracie-abrams-2026-inglewood-vvg10z_53kkqpx | Gracie Abrams | none | 8002241 | https://www.ticketliquidator.com/tickets/8002241/Gracie-Abrams-tickets-Mon-Dec-14-2026-The-Kia-Forum | - |
| tm-gracie-abrams-2026-inglewood-vvg10z_5r0-czu | Gracie Abrams | none | 8002242 | https://www.ticketliquidator.com/tickets/8002242/Gracie-Abrams-tickets-Fri-Dec-18-2026-The-Kia-Forum | - |
| tm-gracie-abrams-2026-inglewood-vvg10z_5r0nxzp | Gracie Abrams | none | 8002243 | https://www.ticketliquidator.com/tickets/8002243/Gracie-Abrams-tickets-Sat-Dec-19-2026-The-Kia-Forum | - |
| tm-gracie-abrams-2026-inglewood-vvg10z_5r0eryu | Gracie Abrams | none | 8002244 | https://www.ticketliquidator.com/tickets/8002244/Gracie-Abrams-tickets-Sun-Dec-20-2026-The-Kia-Forum | - |
| tm-gracie-abrams-2027-seattle-vvg1hz_1bnjn8f | Gracie Abrams | none | 8002270 | https://www.ticketliquidator.com/tickets/8002270/Gracie-Abrams-tickets-Tue-Jan-26-2027-Climate-Pledge-Arena | - |
| tm-gracie-abrams-2027-seattle-vvg1hz_5rykvjn | Gracie Abrams | none | 8002271 | https://www.ticketliquidator.com/tickets/8002271/Gracie-Abrams-tickets-Wed-Jan-27-2027-Climate-Pledge-Arena | - |
| tm-gracie-abrams-2027-seattle-vvg1hz_5ry97ef | Gracie Abrams | none | 8002272 | https://www.ticketliquidator.com/tickets/8002272/Gracie-Abrams-tickets-Fri-Jan-29-2027-Climate-Pledge-Arena | - |
| tm-gracie-abrams-2027-portland-vvg1hz_1byq5cg | Gracie Abrams | none | 8002273 | https://www.ticketliquidator.com/tickets/8002273/Gracie-Abrams-tickets-Sun-Jan-31-2027-Moda-Center-at-the-Rose-Quarter | - |
| tm-gracie-abrams-2027-portland-vvg1hz_1byqdcd | Gracie Abrams | none | 8002274 | https://www.ticketliquidator.com/tickets/8002274/Gracie-Abrams-tickets-Mon-Feb-1-2027-Moda-Center-at-the-Rose-Quarter | - |
| tm-gracie-abrams-2027-chicago-vv1fvzv0pycdz72ag6 | Gracie Abrams | none | 8002275 | https://www.ticketliquidator.com/tickets/8002275/Gracie-Abrams-tickets-Thu-Feb-11-2027-United-Center | - |
| tm-gracie-abrams-2027-chicago-vvg18z_5rd-dah | Gracie Abrams | none | 8002276 | https://www.ticketliquidator.com/tickets/8002276/Gracie-Abrams-tickets-Fri-Feb-12-2027-United-Center | - |
| tm-gracie-abrams-2027-nashville-g5viz_51oey1w | Gracie Abrams | none | 8002277 | https://www.ticketliquidator.com/tickets/8002277/Gracie-Abrams-tickets-Sun-Feb-14-2027-Bridgestone-Arena | - |
| tm-gracie-abrams-2027-nashville-g5viz_5rgv7ra | Gracie Abrams | none | 8002278 | https://www.ticketliquidator.com/tickets/8002278/Gracie-Abrams-tickets-Mon-Feb-15-2027-Bridgestone-Arena | - |
| tm-gracie-abrams-2027-toronto-177zv0g61sqb4k8 | Gracie Abrams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-gracie-abrams-2027-toronto-177zv0g65ic_clu | Gracie Abrams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-gracie-abrams-2027-atlanta-vvg1zz_5nqeia0 | Gracie Abrams | none | 8002281 | https://www.ticketliquidator.com/tickets/8002281/Gracie-Abrams-tickets-Tue-Feb-23-2027-State-Farm-Arena-GA | - |
| tm-gracie-abrams-2027-atlanta-vvg1zz_5nqiiai | Gracie Abrams | none | 8002282 | https://www.ticketliquidator.com/tickets/8002282/Gracie-Abrams-tickets-Wed-Feb-24-2027-State-Farm-Arena-GA | - |
| tm-gracie-abrams-2027-charlotte-g5evz_am0wlwu | Gracie Abrams | none | 8002283 | https://www.ticketliquidator.com/tickets/8002283/Gracie-Abrams-tickets-Fri-Feb-26-2027-Spectrum-Center | - |
| tm-gracie-abrams-2027-charlotte-g5evz_5ryzbyv | Gracie Abrams | none | 8002284 | https://www.ticketliquidator.com/tickets/8002284/Gracie-Abrams-tickets-Sat-Feb-27-2027-Spectrum-Center | - |
| tm-gracie-abrams-2027-boston-vv177z_agkwp_mnl | Gracie Abrams | none | 8002285 | https://www.ticketliquidator.com/tickets/8002285/Gracie-Abrams-tickets-Mon-Mar-1-2027-TD-Garden | - |
| tm-gracie-abrams-2027-boston-vvg17z_5rug2cb | Gracie Abrams | none | 8002286 | https://www.ticketliquidator.com/tickets/8002286/Gracie-Abrams-tickets-Tue-Mar-2-2027-TD-Garden | - |
| tm-gracie-abrams-2027-washington-1avfz_agksfejeq | Gracie Abrams | none | 8002287 | https://www.ticketliquidator.com/tickets/8002287/Gracie-Abrams-tickets-Thu-Mar-4-2027-Capital-One-Arena | - |
| tm-gracie-abrams-2027-washington-17a8v0g65r4j5jx | Gracie Abrams | none | 8002288 | https://www.ticketliquidator.com/tickets/8002288/Gracie-Abrams-tickets-Fri-Mar-5-2027-Capital-One-Arena | - |
| tm-gracie-abrams-2027-montreal-17g8v0g65th0d1g | Gracie Abrams | none | 8002289 | https://www.ticketliquidator.com/tickets/8002289/Gracie-Abrams-tickets-Mon-Mar-8-2027-Centre-Bell | - |
| tm-gracie-abrams-2027-montreal-17g8v0g65thpd1k | Gracie Abrams | none | 8002290 | https://www.ticketliquidator.com/tickets/8002290/Gracie-Abrams-tickets-Tue-Mar-9-2027-Centre-Bell | - |
| tm-gracie-abrams-2027-philadelphia-17gzv0g65pru4zd | Gracie Abrams | none | 8002291 | https://www.ticketliquidator.com/tickets/8002291/Gracie-Abrams-tickets-Fri-Mar-12-2027-Xfinity-Mobile-Arena | - |
| tm-gracie-abrams-2027-philadelphia-17gzv0g65prugzw | Gracie Abrams | none | 8002292 | https://www.ticketliquidator.com/tickets/8002292/Gracie-Abrams-tickets-Sat-Mar-13-2027-Xfinity-Mobile-Arena | - |
| tm-gracie-abrams-2027-brooklyn-17gzv0g61s0b9dq | Gracie Abrams | none | 8002293 | https://www.ticketliquidator.com/tickets/8002293/Gracie-Abrams-tickets-Tue-Mar-16-2027-Barclays-Center | - |
| tm-gracie-abrams-2027-brooklyn-17gzv0g65ie2coz | Gracie Abrams | none | 8002294 | https://www.ticketliquidator.com/tickets/8002294/Gracie-Abrams-tickets-Wed-Mar-17-2027-Barclays-Center | - |
| tm-gracie-abrams-2027-brooklyn-17gzv0g65iekqou | Gracie Abrams | none | 8002295 | https://www.ticketliquidator.com/tickets/8002295/Gracie-Abrams-tickets-Fri-Mar-19-2027-Barclays-Center | - |
| tm-gracie-abrams-2027-brooklyn-17gzv0g65iebqor | Gracie Abrams | none | 8002296 | https://www.ticketliquidator.com/tickets/8002296/Gracie-Abrams-tickets-Sat-Mar-20-2027-Barclays-Center | - |
| tm-gracie-abrams-2027-merksem-antwerpen-z698xzg2z1k_p3f_b | Gracie Abrams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-gracie-abrams-2027-merksem-antwerpen-z698xzg2z1k4vofa4 | Gracie Abrams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-gracie-abrams-2027-manchester-17uyv0g65rbpnzf | Gracie Abrams | none | 8002339 | https://www.ticketliquidator.com/tickets/8002339/Gracie-Abrams-tickets-Thu-Apr-22-2027-Co-Op-Live | - |
| tm-gracie-abrams-2027-manchester-17uyv0g6gk_vkhl | Gracie Abrams | none | 8018170 | https://www.ticketliquidator.com/tickets/8018170/Gracie-Abrams-tickets-Sat-Apr-24-2027-Co-Op-Live | - |
| tm-gracie-abrams-2027-manchester-17uyv0g6gkp6vc5 | Gracie Abrams | none | 8018184 | https://www.ticketliquidator.com/tickets/8018184/Gracie-Abrams-tickets-Sun-Apr-25-2027-Co-Op-Live | - |
| tm-gracie-abrams-2027-london-17u8v0g65wthjl9 | Gracie Abrams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-gracie-abrams-2027-london-17u8v0g65wi6peh | Gracie Abrams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-gracie-abrams-2027-london-17u8v0g65wcbpi1 | Gracie Abrams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-gracie-abrams-2027-london-17u8v0g65wm9us5 | Gracie Abrams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16vpdafzk | Gracie Abrams | none | 8018171 | https://www.ticketliquidator.com/tickets/8018171/Gracie-Abrams-tickets-Fri-May-7-2027-Ziggo-Dome | - |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v00_azt | Gracie Abrams | none | 8018172 | https://www.ticketliquidator.com/tickets/8018172/Gracie-Abrams-tickets-Sat-May-8-2027-Ziggo-Dome | - |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v0oan4g | Gracie Abrams | none | 8018173 | https://www.ticketliquidator.com/tickets/8018173/Gracie-Abrams-tickets-Mon-May-10-2027-Ziggo-Dome | - |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vx9ppa7 | Gracie Abrams | none | 8018174 | https://www.ticketliquidator.com/tickets/8018174/Gracie-Abrams-tickets-Wed-May-12-2027-Uber-Arena | - |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vfef4pp | Gracie Abrams | none | 8018175 | https://www.ticketliquidator.com/tickets/8018175/Gracie-Abrams-tickets-Thu-May-13-2027-Uber-Arena | - |
| tm-gracie-abrams-2027-barcelona-z698xz2qz16vav0xgz | Gracie Abrams | none | 8018168 | https://www.ticketliquidator.com/tickets/8018168/Gracie-Abrams-tickets-Thu-May-27-2027-Palau-Sant-Jordi | - |
| tm-gracie-abrams-2027-barcelona-z698xz2qz16vpsaikv | Gracie Abrams | none | 8018169 | https://www.ticketliquidator.com/tickets/8018169/Gracie-Abrams-tickets-Fri-May-28-2027-Palau-Sant-Jordi | - |
| tm-niall-horan-2026-assago-zg9rmiynyzedfa | Niall Horan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-niall-horan-2026-casalecchio-di-reno-bologna-zg9rmiynyzedff | Niall Horan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-niall-horan-2026-munich-z698xzc2z1kaaofap | Niall Horan | none | 7831764 | https://www.ticketliquidator.com/tickets/7831764/Niall-Horan-tickets-Sat-Oct-31-2026-Kleine-Olympiahalle-Munich | - |
| tm-niall-horan-2026-krakow-z698xzqpz1kq7zp-- | Niall Horan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-niall-horan-2026-merksem-antwerpen-z698xzg2z1k1kb9e_ | Niall Horan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-niall-horan-2027-saint-paul-z7r9jz1a704vb | Niall Horan | none | 7954151 | https://www.ticketliquidator.com/tickets/7954151/Niall-Horan-tickets-Wed-Mar-17-2027-Grand-Casino-Arena | - |
| tm-niall-horan-2027-detroit-vvg1oz_1rv4ast | Niall Horan | none | 7954156 | https://www.ticketliquidator.com/tickets/7954156/Niall-Horan-tickets-Fri-Mar-19-2027-Little-Caesars-Arena | - |
| tm-niall-horan-2027-columbus-vvg1fz_1x9ig7q | Niall Horan | none | 7954157 | https://www.ticketliquidator.com/tickets/7954157/Niall-Horan-tickets-Sat-Mar-20-2027-Nationwide-Arena | - |
| tm-niall-horan-2027-chicago-vvg18z_1llyajb | Niall Horan | none | 7954198 | https://www.ticketliquidator.com/tickets/7954198/Niall-Horan-tickets-Tue-Mar-23-2027-United-Center | - |
| tm-niall-horan-2027-indianapolis-vvg1fz_1htnybv | Niall Horan | none | 7954200 | https://www.ticketliquidator.com/tickets/7954200/Niall-Horan-tickets-Fri-Mar-26-2027-Gainbridge-Fieldhouse | - |
| tm-niall-horan-2027-saint-louis-vvg1bz_1qy32om | Niall Horan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-niall-horan-2027-toronto-177zv0g61h1eoxc | Niall Horan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-niall-horan-2027-montreal-17g8v0g61rtd60v | Niall Horan | none | 7954209 | https://www.ticketliquidator.com/tickets/7954209/Niall-Horan-tickets-Fri-Apr-2-2027-Centre-Bell | - |
| tm-niall-horan-2027-brooklyn-17gzv0g61hpqmr1 | Niall Horan | none | 7954210 | https://www.ticketliquidator.com/tickets/7954210/Niall-Horan-tickets-Sun-Apr-4-2027-Barclays-Center | - |
| tm-niall-horan-2027-baltimore-17a8v0g61lfcmsv | Niall Horan | none | 7954211 | https://www.ticketliquidator.com/tickets/7954211/Niall-Horan-tickets-Thu-Apr-8-2027-CFG-Bank-Arena | - |
| tm-niall-horan-2027-boston-vvg17z_1qxbhwy | Niall Horan | none | 7954213 | https://www.ticketliquidator.com/tickets/7954213/Niall-Horan-tickets-Mon-Apr-12-2027-TD-Garden | - |
| tm-niall-horan-2027-raleigh-g5evz_1r802la | Niall Horan | none | 7954215 | https://www.ticketliquidator.com/tickets/7954215/Niall-Horan-tickets-Thu-Apr-15-2027-Lenovo-Center | - |
| tm-niall-horan-2027-orlando-17fov0g61xk1ezu | Niall Horan | none | 7954325 | https://www.ticketliquidator.com/tickets/7954325/Niall-Horan-tickets-Sat-Apr-17-2027-Kia-Center | - |
| tm-niall-horan-2027-atlanta-vvg1zz_1hoxudt | Niall Horan | none | 7954216 | https://www.ticketliquidator.com/tickets/7954216/Niall-Horan-tickets-Wed-Apr-28-2027-State-Farm-Arena-GA | - |
| tm-niall-horan-2027-new-orleans-g5viz_1xkcnon | Niall Horan | none | 7954217 | https://www.ticketliquidator.com/tickets/7954217/Niall-Horan-tickets-Thu-Apr-29-2027-Smoothie-King-Center | - |
| tm-niall-horan-2027-houston-z7r9jz1a709uy | Niall Horan | none | 7954218 | https://www.ticketliquidator.com/tickets/7954218/Niall-Horan-tickets-Sat-May-1-2027-Toyota-Center-TX | - |
| tm-niall-horan-2027-fort-worth-vvg1yz_1r1jeer | Niall Horan | unverify (applied) | 7954219 | https://www.ticketliquidator.com/tickets/7954219/Niall-Horan-tickets-Sun-May-2-2027-Dickies-Arena | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-niall-horan-2027-austin-g5diz_1lpaglw | Niall Horan | none | 7954220 | https://www.ticketliquidator.com/tickets/7954220/Niall-Horan-tickets-Fri-May-14-2027-Moody-Center-ATX | - |
| tm-niall-horan-2027-denver-g5vzz_1lspoiu | Niall Horan | none | 7954221 | https://www.ticketliquidator.com/tickets/7954221/Niall-Horan-tickets-Sun-May-16-2027-Ball-Arena | - |
| tm-niall-horan-2027-west-valley-city-g5vzz_1xafaiw | Niall Horan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-niall-horan-2027-phoenix-17k8v0g61ruofyr | Niall Horan | none | 7954224 | https://www.ticketliquidator.com/tickets/7954224/Niall-Horan-tickets-Thu-May-20-2027-Mortgage-Matchup-Center | - |
| tm-niall-horan-2027-inglewood-vvg10z_1jzwise | Niall Horan | none | 7954226 | https://www.ticketliquidator.com/tickets/7954226/Niall-Horan-tickets-Sat-May-22-2027-The-Kia-Forum | - |
| tm-niall-horan-2027-san-francisco-g5vyz_195tivo | Niall Horan | none | 7954234 | https://www.ticketliquidator.com/tickets/7954234/Niall-Horan-tickets-Tue-May-25-2027-Chase-Center | - |
| tm-niall-horan-2027-seattle-vvg1hz_1hqc03- | Niall Horan | none | 7954237 | https://www.ticketliquidator.com/tickets/7954237/Niall-Horan-tickets-Thu-May-27-2027-Climate-Pledge-Arena | - |
| tm-niall-horan-2027-vancouver-1778v0g61qodyye | Niall Horan | none | 7954249 | https://www.ticketliquidator.com/tickets/7954249/Niall-Horan-tickets-Sat-May-29-2027-Rogers-Arena | - |
| tm-doja-cat-2026-san-francisco-g5vyzbs0ua9tw | Doja Cat | unverify (applied) | 7457622 | https://www.ticketliquidator.com/tickets/7457622/Doja-Cat-tickets-Sun-Oct-25-2026-Chase-Center | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-doja-cat-2026-san-diego-vvg1izbsi8_kno | Doja Cat | none | 7457630 | https://www.ticketliquidator.com/tickets/7457630/Doja-Cat-tickets-Tue-Oct-27-2026-Viejas-Arena-At-Aztec-Bowl | - |
| tm-doja-cat-2026-phoenix-1av0zbsgknh-n_z | Doja Cat | none | 7457632 | https://www.ticketliquidator.com/tickets/7457632/Doja-Cat-tickets-Thu-Oct-29-2026-Mortgage-Matchup-Center | - |
| tm-doja-cat-2026-austin-g5dizbsl2m6xd | Doja Cat | none | 7457635 | https://www.ticketliquidator.com/tickets/7457635/Doja-Cat-tickets-Tue-Nov-3-2026-Moody-Center-ATX | - |
| tm-doja-cat-2026-dallas-vvg1yzbstqyohd | Doja Cat | none | 7457636 | https://www.ticketliquidator.com/tickets/7457636/Doja-Cat-tickets-Wed-Nov-4-2026-American-Airlines-Center | - |
| tm-doja-cat-2026-san-antonio-g5dizbsnv5jt4 | Doja Cat | none | 7457638 | https://www.ticketliquidator.com/tickets/7457638/Doja-Cat-tickets-Fri-Nov-6-2026-Frost-Bank-Center | - |
| tm-doja-cat-2026-houston-z7r9jz1a7js4g | Doja Cat | none | 7457641 | https://www.ticketliquidator.com/tickets/7457641/Doja-Cat-tickets-Sat-Nov-7-2026-Toyota-Center-TX | - |
| tm-doja-cat-2026-miami-vvg1vzbs0fdfw5 | Doja Cat | none | 7457643 | https://www.ticketliquidator.com/tickets/7457643/Doja-Cat-tickets-Wed-Nov-11-2026-Kaseya-Center | - |
| tm-doja-cat-2026-tampa-vvg1vzbslmpvjz | Doja Cat | none | 7457644 | https://www.ticketliquidator.com/tickets/7457644/Doja-Cat-tickets-Fri-Nov-13-2026-Benchmark-International-Arena | - |
| tm-doja-cat-2026-orlando-1aefzbsgklnlnmt | Doja Cat | none | 7457645 | https://www.ticketliquidator.com/tickets/7457645/Doja-Cat-tickets-Sat-Nov-14-2026-Kia-Center | - |
| tm-doja-cat-2026-atlanta-vvg1zzbsle3ugd | Doja Cat | none | 7457487 | https://www.ticketliquidator.com/tickets/7457487/Doja-Cat-tickets-Tue-Nov-17-2026-State-Farm-Arena-GA | - |
| tm-doja-cat-2026-charlotte-g5evzbsemdalv | Doja Cat | none | 7457650 | https://www.ticketliquidator.com/tickets/7457650/Doja-Cat-tickets-Wed-Nov-18-2026-Spectrum-Center | - |
| tm-doja-cat-2026-baltimore-1avfzbsgknfre1x | Doja Cat | none | 7457652 | https://www.ticketliquidator.com/tickets/7457652/Doja-Cat-tickets-Fri-Nov-20-2026-CFG-Bank-Arena | - |
| tm-doja-cat-2026-washington-1a4zkgygkdpgprp | Doja Cat | none | 7457653 | https://www.ticketliquidator.com/tickets/7457653/Doja-Cat-tickets-Sat-Nov-21-2026-Capital-One-Arena | - |
| tm-doja-cat-2026-boston-vv1f7zbs09vyzd227 | Doja Cat | none | 7457655 | https://www.ticketliquidator.com/tickets/7457655/Doja-Cat-tickets-Mon-Nov-23-2026-TD-Garden | - |
| tm-doja-cat-2026-toronto-1k7zvncbgagve_c | Doja Cat | none | - | - | no qualifying listing (complete catalog checked) |
| tm-doja-cat-2026-montreal-1aszkgygkemvjjt | Doja Cat | none | 7457664 | https://www.ticketliquidator.com/tickets/7457664/Doja-Cat-tickets-Fri-Nov-27-2026-Centre-Bell | - |
| tm-doja-cat-2026-philadelphia-1adzzbsgkldzvua | Doja Cat | none | 7457657 | https://www.ticketliquidator.com/tickets/7457657/Doja-Cat-tickets-Sun-Nov-29-2026-Xfinity-Mobile-Arena | - |
| tm-doja-cat-2026-new-york-g5dizbsintkzt | Doja Cat | none | 7457486 | https://www.ticketliquidator.com/tickets/7457486/Doja-Cat-tickets-Tue-Dec-1-2026-Madison-Square-Garden | - |
| tm-sombr-2026-charlotte-g5evz_fneqevn | Sombr | none | 7874869 | https://www.ticketliquidator.com/tickets/7874869/sombr-tickets-Tue-Oct-27-2026-Spectrum-Center | - |
| tm-sombr-2026-nashville-g5viz_fja3nq8 | Sombr | none | 7874870 | https://www.ticketliquidator.com/tickets/7874870/sombr-tickets-Wed-Oct-28-2026-Bridgestone-Arena | - |
| tm-sombr-2026-saint-louis-vv1akzk3fgkey5tam | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sombr-2026-kansas-city-vv1kbz_fjfg7wetj | Sombr | none | 7874872 | https://www.ticketliquidator.com/tickets/7874872/sombr-tickets-Sat-Oct-31-2026-T-Mobile-Center | - |
| tm-sombr-2026-minneapolis-vv1akzk3agkeivme6 | Sombr | none | 7874873 | https://www.ticketliquidator.com/tickets/7874873/sombr-tickets-Sun-Nov-1-2026-Target-Center | - |
| tm-sombr-2026-milwaukee-vv1a6zk3fgkdlouyw | Sombr | none | 7874874 | https://www.ticketliquidator.com/tickets/7874874/sombr-tickets-Tue-Nov-3-2026-Fiserv-Forum | - |
| tm-sombr-2026-chicago-vv1a7zk36gkd2hi7b | Sombr | none | 7874875 | https://www.ticketliquidator.com/tickets/7874875/sombr-tickets-Wed-Nov-4-2026-United-Center | - |
| tm-sombr-2026-indianapolis-vv1aazk3apba_ze8u | Sombr | none | 7874876 | https://www.ticketliquidator.com/tickets/7874876/sombr-tickets-Fri-Nov-6-2026-Gainbridge-Fieldhouse | - |
| tm-sombr-2026-detroit-vv1afzk3fgkeg5jlz | Sombr | none | 7874877 | https://www.ticketliquidator.com/tickets/7874877/sombr-tickets-Sat-Nov-7-2026-Little-Caesars-Arena | - |
| tm-sombr-2026-columbus-vv1kv8v0xbga57f2- | Sombr | none | 7874878 | https://www.ticketliquidator.com/tickets/7874878/sombr-tickets-Sun-Nov-8-2026-Nationwide-Arena | - |
| tm-sombr-2026-washington-1a4zk3vgkd85lni | Sombr | none | 7874879 | https://www.ticketliquidator.com/tickets/7874879/sombr-tickets-Tue-Nov-10-2026-Capital-One-Arena | - |
| tm-sombr-2026-pittsburgh-1kaov0xfga560gt | Sombr | none | 7874880 | https://www.ticketliquidator.com/tickets/7874880/sombr-tickets-Thu-Nov-12-2026-PPG-Paints-Arena | - |
| tm-sombr-2026-cleveland-z7r9jz1a7xav7 | Sombr | none | 7874881 | https://www.ticketliquidator.com/tickets/7874881/sombr-tickets-Fri-Nov-13-2026-Rocket-Arena | - |
| tm-sombr-2026-buffalo-k7v17_f0kg7ij1e | Sombr | none | 7874882 | https://www.ticketliquidator.com/tickets/7874882/sombr-tickets-Sat-Nov-14-2026-KeyBank-Center | - |
| tm-sombr-2026-toronto-1a8zk36gkdv1i_l | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sombr-2026-boston-vv1avzk36gkdfnkex | Sombr | none | 7874884 | https://www.ticketliquidator.com/tickets/7874884/sombr-tickets-Wed-Nov-18-2026-TD-Garden | - |
| tm-sombr-2026-philadelphia-1kgzv0xbga5zeae | Sombr | none | 7874885 | https://www.ticketliquidator.com/tickets/7874885/sombr-tickets-Thu-Nov-19-2026-Xfinity-Mobile-Arena | - |
| tm-sombr-2026-newark-vv1aezk3fgkdhlmuf | Sombr | none | 7874886 | https://www.ticketliquidator.com/tickets/7874886/sombr-tickets-Sat-Nov-21-2026-Prudential-Center | - |
| tm-sombr-2026-new-york-g5diz_flfogz- | Sombr | none | 7874887 | https://www.ticketliquidator.com/tickets/7874887/sombr-tickets-Mon-Nov-23-2026-Madison-Square-Garden | - |
| tm-sombr-2026-new-york-g5diz_flffpzi | Sombr | none | 7877722 | https://www.ticketliquidator.com/tickets/7877722/sombr-tickets-Tue-Nov-24-2026-Madison-Square-Garden | - |
| tm-john-summit-2026-boston-vvg17z_51ivlnd | John Summit | none | 7982946 | https://www.ticketliquidator.com/tickets/7982946/John-Summit-tickets-Thu-Oct-29-2026-TD-Garden | - |
| tm-john-summit-2026-university-park-vvg1fz_55aanmw | John Summit | none | 7982947 | https://www.ticketliquidator.com/tickets/7982947/John-Summit-tickets-Fri-Oct-30-2026-Bryce-Jordan-Center | - |
| tm-john-summit-2026-washington-1avfz_agklgjntv | John Summit | none | 7982948 | https://www.ticketliquidator.com/tickets/7982948/John-Summit-tickets-Sat-Oct-31-2026-Capital-One-Arena | - |
| tm-john-summit-2026-houston-z7r9jz1a70t74 | John Summit | none | 7982952 | https://www.ticketliquidator.com/tickets/7982952/John-Summit-tickets-Thu-Nov-5-2026-Toyota-Center-TX | - |
| tm-john-summit-2026-austin-g5diz_52qgtuz | John Summit | none | 7982953 | https://www.ticketliquidator.com/tickets/7982953/John-Summit-tickets-Fri-Nov-6-2026-Moody-Center-ATX | - |
| tm-john-summit-2026-fort-worth-vvg1yz_522ahqk | John Summit | unverify (applied) | 7982955 | https://www.ticketliquidator.com/tickets/7982955/John-Summit-tickets-Sat-Nov-7-2026-Dickies-Arena | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-john-summit-2026-fort-worth-vvg1yz_53r5bha | John Summit | unverify (applied) | 8005641 | https://www.ticketliquidator.com/tickets/8005641/John-Summit-tickets-Sun-Nov-8-2026-Dickies-Arena | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-john-summit-2026-columbus-vvg1fz_52gqiba | John Summit | none | 7982957 | https://www.ticketliquidator.com/tickets/7982957/John-Summit-tickets-Fri-Nov-13-2026-Value-City-Arena-at-The-Schottenstein-Center | - |
| tm-john-summit-2026-charlotte-g5evz_52qpkue | John Summit | none | 7982959 | https://www.ticketliquidator.com/tickets/7982959/John-Summit-tickets-Sat-Nov-14-2026-Spectrum-Center | - |
| tm-john-summit-2026-atlanta-vvg1zz_527ymui | John Summit | none | 7982960 | https://www.ticketliquidator.com/tickets/7982960/John-Summit-tickets-Sun-Nov-15-2026-State-Farm-Arena-GA | - |
| tm-john-summit-2026-miami-vvg1vz_51zozkr | John Summit | none | 7982963 | https://www.ticketliquidator.com/tickets/7982963/John-Summit-tickets-Fri-Nov-20-2026-Kaseya-Center | - |
| tm-john-summit-2026-miami-vvg1vz_5ctzbz1 | John Summit | none | 7982964 | https://www.ticketliquidator.com/tickets/7982964/John-Summit-tickets-Sat-Nov-21-2026-Kaseya-Center | - |
| tm-john-summit-2026-chicago-vvg18z_52-bljx | John Summit | none | 7982944 | https://www.ticketliquidator.com/tickets/7982944/John-Summit-tickets-Tue-Nov-24-2026-United-Center | - |
| tm-john-summit-2026-chicago-vvg18z_52-dlqv | John Summit | none | 7982965 | https://www.ticketliquidator.com/tickets/7982965/John-Summit-tickets-Wed-Nov-25-2026-United-Center | - |
| tm-john-summit-2026-philadelphia-vvg1fz_5ctejox | John Summit | none | - | - | no qualifying listing (complete catalog checked) |
| tm-john-summit-2026-brooklyn-17gzv0g655ozaay | John Summit | none | 7982967 | https://www.ticketliquidator.com/tickets/7982967/John-Summit-tickets-Sat-Nov-28-2026-Barclays-Center | - |
| tm-john-summit-2026-oakland-g5vyz_5chdjie | John Summit | none | 7982968 | https://www.ticketliquidator.com/tickets/7982968/John-Summit-tickets-Fri-Dec-4-2026-Oakland-Arena | - |
| tm-john-summit-2026-oakland-g5vyz_5925f5n | John Summit | none | 8005513 | https://www.ticketliquidator.com/tickets/8005513/John-Summit-tickets-Sat-Dec-5-2026-Oakland-Arena | - |
| tm-john-summit-2026-los-angeles-vvg1iz_2teslqm | John Summit | none | 8204658 | https://www.ticketliquidator.com/tickets/8204658/John-Summit-tickets-Sat-Dec-12-2026-Los-Angeles-Memorial-Coliseum | - |
| tm-karol-g-2027-barcelona-z698xz2qz1k-d-v1k | Karol G | none | - | - | no qualifying listing (complete catalog checked) |
| tm-karol-g-2027-barcelona-z698xz2qz1k8n04vk | Karol G | none | - | - | no qualifying listing (complete catalog checked) |
| tm-karol-g-2027-sevilla-z698xz2qz1kp4_vuk | Karol G | none | 7896500 | https://www.ticketliquidator.com/tickets/7896500/Karol-G-tickets-Fri-Jun-11-2027-Estadio-La-Cartuja | - |
| tm-karol-g-2027-sevilla-z698xz2qz16vvepfuz | Karol G | none | 7912285 | https://www.ticketliquidator.com/tickets/7912285/Karol-G-tickets-Sat-Jun-12-2027-Estadio-La-Cartuja | - |
| tm-karol-g-2027-sevilla-z698xz2qz16v_a-6fw | Karol G | none | 7921229 | https://www.ticketliquidator.com/tickets/7921229/Karol-G-tickets-Sun-Jun-13-2027-Estadio-La-Cartuja | - |
| tm-karol-g-2027-madrid-z698xz2qz16vq8a4f7 | Karol G | none | - | - | no qualifying listing (complete catalog checked) |
| tm-karol-g-2027-madrid-z698xz2qz1kpmzkfn | Karol G | none | - | - | no qualifying listing (complete catalog checked) |
| tm-karol-g-2027-madrid-z698xz2qz16v8zxv0i | Karol G | none | - | - | no qualifying listing (complete catalog checked) |
| tm-karol-g-2027-madrid-z698xz2qz1koujx1f | Karol G | none | - | - | no qualifying listing (complete catalog checked) |
| tm-karol-g-2027-london-1agzk3ogkddbuhf | Karol G | none | - | - | no qualifying listing (complete catalog checked) |
| tm-karol-g-2027-amsterdam-z698xzbpz16vc_bwjy | Karol G | none | 7896506 | https://www.ticketliquidator.com/tickets/7896506/Karol-G-tickets-Sat-Jul-10-2027-Johan-Cruijff-Arena | - |
| tm-metallica-2026-uncasville-g5vvz_6nrigot | Metallica | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-metallica-2026-uncasville-g5vvz_6n-zpjb | Metallica | none | 7859974 | https://www.ticketliquidator.com/tickets/7859974/Metallica-tickets-Sat-Nov-21-2026-Mohegan-Sun-Arena-CT | - |
| tm-metallica-2027-las-vegas-1fayv0b_z4z7ggvk | Metallica | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-metallica-2027-las-vegas-16vjz_kk3g7ndxr | Metallica | none | 7775513 | https://www.ticketliquidator.com/tickets/7775513/Metallica-tickets-Sat-Jan-30-2027-Sphere | - |
| tm-metallica-2027-las-vegas-1a9zko-gke0yct0 | Metallica | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-metallica-2027-las-vegas-1a9zko-gkepzr6s | Metallica | none | 7785087 | https://www.ticketliquidator.com/tickets/7785087/Metallica-tickets-Sat-Feb-6-2027-Sphere | - |
| tm-metallica-2027-las-vegas-1a9zko-gke0ywtn | Metallica | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-metallica-2027-las-vegas-1a9zko-gkepzr6g | Metallica | none | 7785089 | https://www.ticketliquidator.com/tickets/7785089/Metallica-tickets-Sat-Feb-20-2027-Sphere | - |
| tm-metallica-2027-las-vegas-1a9zko-gke0buti | Metallica | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-metallica-2027-las-vegas-1a9zko-gkepzxff | Metallica | none | 7785871 | https://www.ticketliquidator.com/tickets/7785871/Metallica-tickets-Sat-Mar-13-2027-Sphere | - |
| tm-my-chemical-romance-2026-hollywood-vvg1izbs55ykjr | My Chemical Romance | none | 7570185 | https://www.ticketliquidator.com/tickets/7570185/My-Chemical-Romance-tickets-Fri-Oct-30-2026-Hollywood-Bowl | - |
| tm-my-chemical-romance-2026-hollywood-vvg1izbs55bdjv | My Chemical Romance | none | 7570377 | https://www.ticketliquidator.com/tickets/7570377/My-Chemical-Romance-tickets-Sat-Oct-31-2026-Hollywood-Bowl | - |
| tm-my-chemical-romance-2026-singapore-z7r9jz1a7oup6 | My Chemical Romance | none | - | - | no qualifying listing (complete catalog checked) |
| tm-teddy-swims-2026-houston-z7r9jz1a7x4fs | Teddy Swims | none | 7892526 | https://www.ticketliquidator.com/tickets/7892526/Teddy-Swims-tickets-Tue-Oct-27-2026-Toyota-Center-TX | - |
| tm-teddy-swims-2026-austin-g5diz_fxgrqaf | Teddy Swims | none | 7883110 | https://www.ticketliquidator.com/tickets/7883110/Teddy-Swims-tickets-Wed-Oct-28-2026-Moody-Center-ATX | - |
| tm-teddy-swims-2026-fort-worth-vvg1yz_flxlbcf | Teddy Swims | unverify (applied) | 7883111 | https://www.ticketliquidator.com/tickets/7883111/Teddy-Swims-tickets-Fri-Oct-30-2026-Dickies-Arena | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-teddy-swims-2026-denver-g5vzz_fuokkc4 | Teddy Swims | none | 7883112 | https://www.ticketliquidator.com/tickets/7883112/Teddy-Swims-tickets-Sun-Nov-1-2026-Ball-Arena | - |
| tm-teddy-swims-2026-salt-lake-city-z7r9jz1a7x_ag | Teddy Swims | none | 7883114 | https://www.ticketliquidator.com/tickets/7883114/Teddy-Swims-tickets-Tue-Nov-3-2026-Delta-Center | - |
| tm-teddy-swims-2026-seattle-vvg1hz_fujpiyp | Teddy Swims | none | 7883115 | https://www.ticketliquidator.com/tickets/7883115/Teddy-Swims-tickets-Thu-Nov-5-2026-Climate-Pledge-Arena | - |
| tm-teddy-swims-2026-vancouver-1av7z_fgkbd-_xv | Teddy Swims | none | 7883116 | https://www.ticketliquidator.com/tickets/7883116/Teddy-Swims-tickets-Fri-Nov-6-2026-Rogers-Arena | - |
| tm-teddy-swims-2026-portland-vvg1hz_fbodkr9 | Teddy Swims | none | 7883117 | https://www.ticketliquidator.com/tickets/7883117/Teddy-Swims-tickets-Sun-Nov-8-2026-Moda-Center-at-the-Rose-Quarter | - |
| tm-teddy-swims-2026-san-francisco-g5vyz_fnhi2ez | Teddy Swims | none | 7883120 | https://www.ticketliquidator.com/tickets/7883120/Teddy-Swims-tickets-Tue-Nov-10-2026-Chase-Center | - |
| tm-teddy-swims-2026-sacramento-g5vyz_fmsnbtg | Teddy Swims | none | 7883122 | https://www.ticketliquidator.com/tickets/7883122/Teddy-Swims-tickets-Wed-Nov-11-2026-Golden-1-Center | - |
| tm-teddy-swims-2026-san-diego-z7r9jz1a7xpf- | Teddy Swims | none | 7883123 | https://www.ticketliquidator.com/tickets/7883123/Teddy-Swims-tickets-Fri-Nov-13-2026-Pechanga-Arena-San-Diego | - |
| tm-teddy-swims-2026-las-vegas-z7r9jz1a7xpfb | Teddy Swims | none | 7883124 | https://www.ticketliquidator.com/tickets/7883124/Teddy-Swims-tickets-Sat-Nov-14-2026-T-Mobile-Arena | - |
| tm-teddy-swims-2026-phoenix-1av0z_fgkbna4b9 | Teddy Swims | none | 7883125 | https://www.ticketliquidator.com/tickets/7883125/Teddy-Swims-tickets-Mon-Nov-16-2026-Mortgage-Matchup-Center | - |
| tm-teddy-swims-2026-inglewood-vv170z_fgkmxw1os | Teddy Swims | none | 7883127 | https://www.ticketliquidator.com/tickets/7883127/Teddy-Swims-tickets-Wed-Nov-18-2026-The-Kia-Forum | - |
| tm-teddy-swims-2027-berlin-z698xzc2z16v8g0v0d | Teddy Swims | none | 8167509 | https://www.ticketliquidator.com/tickets/8167509/Teddy-Swims-tickets-Thu-Mar-11-2027-Uber-Arena | - |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vajo8c6 | Teddy Swims | none | 8166020 | https://www.ticketliquidator.com/tickets/8166020/Teddy-Swims-tickets-Tue-Mar-16-2027-Ziggo-Dome | - |
| tm-teddy-swims-2027-amsterdam-z698xzbpz1kb300fz | Teddy Swims | none | 8168696 | https://www.ticketliquidator.com/tickets/8168696/Teddy-Swims-tickets-Wed-Mar-17-2027-Ziggo-Dome | - |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vckf4-9 | Teddy Swims | none | - | - | no qualifying listing (complete catalog checked) |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z1kf7vp3p | Teddy Swims | none | - | - | no qualifying listing (complete catalog checked) |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z16v_sztub | Teddy Swims | none | - | - | no qualifying listing (complete catalog checked) |
| tm-teddy-swims-2027-glasgow-17uov0g62qlspvu | Teddy Swims | none | 8163374 | https://www.ticketliquidator.com/tickets/8163374/Teddy-Swims-tickets-Tue-Apr-13-2027-OVO-Hydro | - |
| tm-teddy-swims-2027-manchester-17uyv0g62pcoosz | Teddy Swims | none | 8163375 | https://www.ticketliquidator.com/tickets/8163375/Teddy-Swims-tickets-Fri-Apr-16-2027-Co-Op-Live | - |
| tm-teddy-swims-2027-manchester-17uyv0g62m2z8vc | Teddy Swims | none | 8230821 | https://www.ticketliquidator.com/tickets/8230821/Teddy-Swims-tickets-Sat-Apr-17-2027-Co-Op-Live | - |
| tm-teddy-swims-2027-london-17u8v0g6253xeaz | Teddy Swims | none | - | - | no qualifying listing (complete catalog checked) |
| tm-teddy-swims-2027-london-17u8v0g623cnnvk | Teddy Swims | none | - | - | no qualifying listing (complete catalog checked) |
| tm-teddy-swims-2027-london-17u8v0g623yvkkm | Teddy Swims | none | - | - | no qualifying listing (complete catalog checked) |
| tm-five-finger-death-punch-2027-manchester-g5vhz_gnh6q4f | Five Finger Death Punch | none | 7987816 | https://www.ticketliquidator.com/tickets/7987816/Five-Finger-Death-Punch-tickets-Sat-Jan-16-2027-AO-Arena | - |
| tm-five-finger-death-punch-2027-birmingham-1anzk3bgkev6s0s | Five Finger Death Punch | none | 8090419 | https://www.ticketliquidator.com/tickets/8090419/Five-Finger-Death-Punch-tickets-Fri-Jan-22-2027-bp-pulse-LIVE | - |
| tm-five-finger-death-punch-2027-london-1agzk3bgkdreu6- | Five Finger Death Punch | none | - | - | no qualifying listing (complete catalog checked) |
| tm-five-finger-death-punch-2027-odz-z698xzqpz1k-o8yj_ | Five Finger Death Punch | none | - | - | no qualifying listing (complete catalog checked) |
| tm-five-finger-death-punch-2027-forest-brussels-z698xzg2z1asr3q7 | Five Finger Death Punch | none | - | - | no qualifying listing (complete catalog checked) |
| tm-teddy-swims-2027-manchester-17uyv0g62mo98gp | Teddy Swims | none | 8230822 | https://www.ticketliquidator.com/tickets/8230822/Teddy-Swims-tickets-Sun-Apr-18-2027-Co-Op-Live | - |
| tm-tame-impala-2027-manchester-1amzkf4gkemyn8u | Tame Impala | none | 8231212 | https://www.ticketliquidator.com/tickets/8231212/Tame-Impala-tickets-Fri-May-28-2027-Co-Op-Live | - |
| tm-tame-impala-2027-manchester-1amzkf_gkdr-2ec | Tame Impala | none | 8237407 | https://www.ticketliquidator.com/tickets/8237407/Tame-Impala-tickets-Sat-May-29-2027-Co-Op-Live | - |
| tm-tame-impala-2027-london-16dfz_ofpg7t8j2 | Tame Impala | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tame-impala-2027-london-16dfz_ofjg7iyih | Tame Impala | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tame-impala-2027-london-1agzkfbgkdvvzlq | Tame Impala | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tame-impala-2027-rotterdam-z698xzbpz1kppan3z | Tame Impala | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tame-impala-2027-rotterdam-z698xzbpz1k_yjz0i | Tame Impala | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tame-impala-2027-rotterdam-z698xzbpz1k3e07a0 | Tame Impala | none | - | - | no qualifying listing (complete catalog checked) |
| tm-don-omar-2026-el-paso-vvg1yz_1hpge4r | Don Omar | none | - | - | no qualifying listing (complete catalog checked) |
| tm-don-omar-2026-ontario-vvg10z_1tpplao | Don Omar | none | 7976488 | https://www.ticketliquidator.com/tickets/7976488/Don-Omar-tickets-Thu-Oct-29-2026-Toyota-Arena-Ontario | - |
| tm-don-omar-2026-las-vegas-z7r9jz1a70eqs | Don Omar | none | 7976499 | https://www.ticketliquidator.com/tickets/7976499/Don-Omar-tickets-Fri-Oct-30-2026-Michelob-ULTRA-Arena-At-Mandalay-Bay | - |
| tm-don-omar-2026-salt-lake-city-z7r9jz1a70efv | Don Omar | none | 7976501 | https://www.ticketliquidator.com/tickets/7976501/Don-Omar-tickets-Sun-Nov-1-2026-Delta-Center | - |
| tm-don-omar-2026-san-jose-g5vyz_1mqembe | Don Omar | none | - | - | no qualifying listing (complete catalog checked) |
| tm-don-omar-2026-inglewood-vvg10z_56fvyeu | Don Omar | none | 7976490 | https://www.ticketliquidator.com/tickets/7976490/Don-Omar-tickets-Fri-Nov-6-2026-The-Kia-Forum | - |
| tm-don-omar-2026-phoenix-17k8v0g61tfaez1 | Don Omar | none | 7976491 | https://www.ticketliquidator.com/tickets/7976491/Don-Omar-tickets-Sun-Nov-8-2026-Mortgage-Matchup-Center | - |
| tm-don-omar-2027-denver-g5vzz_u2hqxbt | Don Omar | none | 8071957 | https://www.ticketliquidator.com/tickets/8071957/Don-Omar-tickets-Wed-Feb-3-2027-Ball-Arena | - |
| tm-don-omar-2027-sacramento-g5vyz_u1sfm0b | Don Omar | none | 8071958 | https://www.ticketliquidator.com/tickets/8071958/Don-Omar-tickets-Fri-Feb-5-2027-Golden-1-Center | - |
| tm-don-omar-2027-seattle-vvg1hz_u4jzxck | Don Omar | none | 8071959 | https://www.ticketliquidator.com/tickets/8071959/Don-Omar-tickets-Sun-Feb-7-2027-Climate-Pledge-Arena | - |
| tm-don-omar-2027-san-diego-z7r9jz1a7pggy | Don Omar | none | 8086304 | https://www.ticketliquidator.com/tickets/8086304/Don-Omar-tickets-Wed-Feb-10-2027-Pechanga-Arena-San-Diego | - |
| tm-don-omar-2027-fresno-g5vyz_u5k7ws7 | Don Omar | none | 8071960 | https://www.ticketliquidator.com/tickets/8071960/Don-Omar-tickets-Thu-Feb-11-2027-Save-Mart-Center | - |
| tm-don-omar-2027-inglewood-vvg10z_u2a3ul3 | Don Omar | none | 8071961 | https://www.ticketliquidator.com/tickets/8071961/Don-Omar-tickets-Fri-Feb-12-2027-Intuit-Dome | - |
| tm-don-omar-2027-toronto-177zv0g6u2fwanb | Don Omar | none | - | - | no qualifying listing (complete catalog checked) |
| tm-don-omar-2027-montreal-17g8v0g6ucxtixy | Don Omar | none | 8071972 | https://www.ticketliquidator.com/tickets/8071972/Don-Omar-tickets-Sun-Feb-21-2027-Centre-Bell | - |
| tm-don-omar-2027-rosemont-vvg18z_u5mkrgh | Don Omar | none | 8071962 | https://www.ticketliquidator.com/tickets/8071962/Don-Omar-tickets-Fri-Feb-26-2027-Allstate-Arena | - |
| tm-don-omar-2027-belmont-park-17gzv0g6u15uw7e | Don Omar | none | - | - | no qualifying listing (complete catalog checked) |
| tm-don-omar-2027-newark-vvg1fz_u5xkezy | Don Omar | none | 8071964 | https://www.ticketliquidator.com/tickets/8071964/Don-Omar-tickets-Wed-Mar-3-2027-Prudential-Center | - |
| tm-don-omar-2027-baltimore-17a8v0g6ukar9g1 | Don Omar | none | 8071965 | https://www.ticketliquidator.com/tickets/8071965/Don-Omar-tickets-Thu-Mar-4-2027-CFG-Bank-Arena | - |
| tm-don-omar-2027-fort-worth-vvg1yz_u1_ouro | Don Omar | unverify (applied) | 8071966 | https://www.ticketliquidator.com/tickets/8071966/Don-Omar-tickets-Sat-Mar-6-2027-Dickies-Arena | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-don-omar-2027-austin-g5diz_u3mkhzt | Don Omar | none | 8073019 | https://www.ticketliquidator.com/tickets/8073019/Don-Omar-tickets-Sun-Mar-7-2027-Moody-Center-ATX | - |
| tm-don-omar-2027-tampa-vvg1vz_uc-buha | Don Omar | none | 8071967 | https://www.ticketliquidator.com/tickets/8071967/Don-Omar-tickets-Wed-Mar-10-2027-Benchmark-International-Arena | - |
| tm-don-omar-2027-miami-vvg1vz_uk8ovtf | Don Omar | none | 8071968 | https://www.ticketliquidator.com/tickets/8071968/Don-Omar-tickets-Fri-Mar-12-2027-Kaseya-Center | - |
| tm-don-omar-2027-orlando-17fov0g6u6m7kw6 | Don Omar | none | 8071970 | https://www.ticketliquidator.com/tickets/8071970/Don-Omar-tickets-Sun-Mar-14-2027-Kia-Center | - |
| tm-luke-combs-2027-arlington-z7r9jz1aazyf6 | Luke Combs | none | 8203740 | https://www.ticketliquidator.com/tickets/8203740/Luke-Combs-tickets-Sat-Apr-3-2027-ATT-Stadium | - |
| tm-luke-combs-2027-detroit-vv1afzkf6gkesjjgl | Luke Combs | none | 8203726 | https://www.ticketliquidator.com/tickets/8203726/Luke-Combs-tickets-Sat-Apr-17-2027-Ford-Field | - |
| tm-luke-combs-2027-philadelphia-vv17fz_8gklpk2ll | Luke Combs | none | 8203727 | https://www.ticketliquidator.com/tickets/8203727/Luke-Combs-tickets-Sat-Apr-24-2027-Lincoln-Financial-Field | - |
| tm-luke-combs-2027-foxborough-vv177z_8gkinn93w | Luke Combs | none | 8203728 | https://www.ticketliquidator.com/tickets/8203728/Luke-Combs-tickets-Sat-May-1-2027-Gillette-Stadium | - |
| tm-luke-combs-2027-pittsburgh-1avbz_8gkd1oiqd | Luke Combs | none | 8203729 | https://www.ticketliquidator.com/tickets/8203729/Luke-Combs-tickets-Sat-May-8-2027-Acrisure-Stadium | - |
| tm-luke-combs-2027-kansas-city-vv1akzkf6gkesjbxu | Luke Combs | none | 8203731 | https://www.ticketliquidator.com/tickets/8203731/Luke-Combs-tickets-Sat-May-15-2027-Arrowhead-Stadium | - |
| tm-luke-combs-2027-edmonton-1av7z_8gkw3oea5 | Luke Combs | none | - | - | no qualifying listing (complete catalog checked) |
| tm-luke-combs-2027-vancouver-1av7z_8gkwig5fh | Luke Combs | none | 8203738 | https://www.ticketliquidator.com/tickets/8203738/Luke-Combs-tickets-Sat-Jun-5-2027-BC-Place-Stadium | - |
| tm-luke-combs-2027-boise-g5vzz_8lfjx4v | Luke Combs | none | 8203732 | https://www.ticketliquidator.com/tickets/8203732/Luke-Combs-tickets-Sat-Jun-12-2027-Albertsons-Stadium | - |
| tm-luke-combs-2027-denver-g5vzz_8l39sxz | Luke Combs | none | 8203733 | https://www.ticketliquidator.com/tickets/8203733/Luke-Combs-tickets-Sat-Jun-19-2027-Empower-Field-At-Mile-High | - |
| tm-luke-combs-2027-san-diego-vvg1iz_8l9y-6a | Luke Combs | none | 8203734 | https://www.ticketliquidator.com/tickets/8203734/Luke-Combs-tickets-Sat-Jun-26-2027-Petco-Park | - |
| tm-blue-october-2026-milwaukee-z7r9jz1a7-v04 | Blue October | none | 7828054 | https://www.ticketliquidator.com/tickets/7828054/Blue-October-tickets-Wed-Oct-28-2026-Pabst-Theater | - |
| tm-blue-october-2026-grand-rapids-vv1kezv0_8ga1aqp6 | Blue October | none | 7827963 | https://www.ticketliquidator.com/tickets/7827963/Blue-October-tickets-Thu-Oct-29-2026-GLC-Live-at-20-Monroe | - |
| tm-blue-october-2026-detroit-vv17oz_kgkmvfl46 | Blue October | none | 7827962 | https://www.ticketliquidator.com/tickets/7827962/Blue-October-tickets-Fri-Oct-30-2026-The-Fillmore-Detroit | - |
| tm-blue-october-2026-toronto-1avzz_kgkvawuqh | Blue October | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blue-october-2026-montreal-1aszkowgke-yptc | Blue October | none | 7827988 | https://www.ticketliquidator.com/tickets/7827988/Blue-October-tickets-Sun-Nov-1-2026-MTelus | - |
| tm-blue-october-2026-portland-vv177z_kgkuvxsds | Blue October | none | 7827964 | https://www.ticketliquidator.com/tickets/7827964/Blue-October-tickets-Tue-Nov-3-2026-State-Theatre-ME | - |
| tm-blue-october-2026-new-york-city-k7v17_67ag7rfqz | Blue October | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blue-october-2026-albany-z7r9jz1a7-v0o | Blue October | none | 7828055 | https://www.ticketliquidator.com/tickets/7828055/Blue-October-tickets-Fri-Nov-6-2026-Hart-Theatre-At-The-Egg | - |
| tm-blue-october-2026-cleveland-z7r9jz1a7-z0p | Blue October | none | 7828056 | https://www.ticketliquidator.com/tickets/7828056/Blue-October-tickets-Sat-Nov-7-2026-Agora-Theatre | - |
| tm-blue-october-2026-nashville-vv1aazkosgkezrhqm | Blue October | none | 7827966 | https://www.ticketliquidator.com/tickets/7827966/Blue-October-tickets-Sun-Nov-8-2026-Brown-County-Music-Center | - |
| tm-blue-october-2026-north-tonawanda-z7r9jz1aazwby | Blue October | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blue-october-2026-red-bank-g5vvz_kudtusm | Blue October | none | 7827967 | https://www.ticketliquidator.com/tickets/7827967/Blue-October-tickets-Thu-Nov-12-2026-Hackensack-Meridian-Health-Theatre-at-the-Count-Basie-Center-for-the-Arts | - |
| tm-blue-october-2026-boston-vv177z_kgkw31n77 | Blue October | none | 7827968 | https://www.ticketliquidator.com/tickets/7827968/Blue-October-tickets-Fri-Nov-13-2026-Citizens-House-Of-Blues-Boston | - |
| tm-blue-october-2026-wilkes-barre-vv1aezkosgkdamrl_ | Blue October | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blue-october-2026-philadelphia-vv1aezkowgkdcmrr7 | Blue October | none | 7827970 | https://www.ticketliquidator.com/tickets/7827970/Blue-October-tickets-Sun-Nov-15-2026-The-Fillmore-Philadelphia | - |
| tm-blue-october-2026-charlotte-g5evz_kng4bet | Blue October | none | 7827971 | https://www.ticketliquidator.com/tickets/7827971/Blue-October-tickets-Tue-Nov-17-2026-The-Fillmore-Charlotte | - |
| tm-blue-october-2026-jacksonville-z7r9jz1a7-v03 | Blue October | none | 7827972 | https://www.ticketliquidator.com/tickets/7827972/Blue-October-tickets-Thu-Nov-19-2026-FIVE | - |
| tm-blue-october-2026-clearwater-z7r9jz1a7-v0f | Blue October | none | 7828058 | https://www.ticketliquidator.com/tickets/7828058/Blue-October-tickets-Fri-Nov-20-2026-Ruth-Eckerd-Hall | - |
| tm-blue-october-2026-orlando-1aefz_kgknmxmnk | Blue October | none | 7827973 | https://www.ticketliquidator.com/tickets/7827973/Blue-October-tickets-Sat-Nov-21-2026-Hard-Rock-Live-Orlando | - |
| tm-blue-october-2026-atlanta-vvg1zz_6ddzdk3 | Blue October | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blue-october-2026-nashville-g5viz_kskltsv | Blue October | none | 7808857 | https://www.ticketliquidator.com/tickets/7808857/Blue-October-tickets-Wed-Nov-25-2026-The-Truth | - |
| tm-blue-october-2026-irving-vvg1yz_6kcyhkx | Blue October | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-blue-october-2026-irving-vvg1yz_68kdxnx | Blue October | none | 7827976 | https://www.ticketliquidator.com/tickets/7827976/Blue-October-tickets-Sat-Nov-28-2026-The-Pavilion-at-Toyota-Music-Factory | - |
| tm-blue-october-2026-kansas-city-z7r9jz1a7xk4- | Blue October | none | 7828059 | https://www.ticketliquidator.com/tickets/7828059/Blue-October-tickets-Thu-Dec-3-2026-The-Midland-Theatre-MO | - |
| tm-blue-october-2026-minneapolis-vv1akzkowgkdjzvr0 | Blue October | none | 7827978 | https://www.ticketliquidator.com/tickets/7827978/Blue-October-tickets-Fri-Dec-4-2026-The-Fillmore-Minneapolis-Presented-by-Affinity-Plus | - |
| tm-blue-october-2026-la-vista-1aezz_kgks7afny | Blue October | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blue-october-2026-oklahoma-city-z7r9jz1a7-v0b | Blue October | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blue-october-2026-beaumont-g5diz_kmboj7t | Blue October | none | 7827981 | https://www.ticketliquidator.com/tickets/7827981/Blue-October-tickets-Thu-Dec-10-2026-Jefferson-Theatre-TX | - |
| tm-blue-october-2026-austin-z7r9jz1a7-v0k | Blue October | none | 7828061 | https://www.ticketliquidator.com/tickets/7828061/Blue-October-tickets-Fri-Dec-11-2026-Bass-Concert-Hall | - |
| tm-blue-october-2026-hidalgo-g5diz_6r53fc7 | Blue October | none | 7827983 | https://www.ticketliquidator.com/tickets/7827983/Blue-October-tickets-Sun-Dec-13-2026-Payne-Arena | - |
| tm-blue-october-2026-corpus-christi-g5diz_65ljyy0 | Blue October | none | 7827984 | https://www.ticketliquidator.com/tickets/7827984/Blue-October-tickets-Thu-Dec-17-2026-Selena-Auditorium | - |
| tm-blue-october-2026-houston-g5diz_65lrohi | Blue October | none | 7827985 | https://www.ticketliquidator.com/tickets/7827985/Blue-October-tickets-Fri-Dec-18-2026-713-Music-Hall | - |
| tm-blue-october-2026-houston-g5diz_65lyohs | Blue October | none | 7827986 | https://www.ticketliquidator.com/tickets/7827986/Blue-October-tickets-Sat-Dec-19-2026-713-Music-Hall | - |
| tm-blue-october-2026-houston-g5diz_1sa9wed | Blue October | none | 7969786 | https://www.ticketliquidator.com/tickets/7969786/Blue-October-tickets-Sun-Dec-20-2026-713-Music-Hall | - |
| tm-blue-october-2027-midland-z7r9jz1a70pjo | Blue October | none | 7957476 | https://www.ticketliquidator.com/tickets/7957476/Blue-October-tickets-Fri-Jan-29-2027-Wagner-Noel-Performing-Arts-Center | - |
| tm-blue-october-2027-el-paso-vvg1yz_1msxe0e | Blue October | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blue-october-2027-amarillo-z7r9jz1a7pxau | Blue October | none | 7957486 | https://www.ticketliquidator.com/tickets/7957486/Blue-October-tickets-Sun-Jan-31-2027-Globe-News-Center-For-The-Performing-Arts | - |
| tm-blue-october-2027-tucson-17k8v0g61r3fg2b | Blue October | none | 7957261 | https://www.ticketliquidator.com/tickets/7957261/Blue-October-tickets-Wed-Feb-3-2027-Rialto-Theatre-Tucson | - |
| tm-blue-october-2027-phoenix-17k8v0g61lto1cb | Blue October | none | 7957263 | https://www.ticketliquidator.com/tickets/7957263/Blue-October-tickets-Fri-Feb-5-2027-The-Van-Buren | - |
| tm-blue-october-2027-phoenix-17k8v0g61ltk12k | Blue October | none | 7957264 | https://www.ticketliquidator.com/tickets/7957264/Blue-October-tickets-Sat-Feb-6-2027-The-Van-Buren | - |
| tm-blue-october-2027-los-angeles-vvg10z_1ri5jq_ | Blue October | none | 7957265 | https://www.ticketliquidator.com/tickets/7957265/Blue-October-tickets-Sun-Feb-7-2027-The-Wiltern | - |
| tm-blue-october-2027-san-luis-obispo-z7r9jz1a70_f7 | Blue October | none | 7957493 | https://www.ticketliquidator.com/tickets/7957493/Blue-October-tickets-Wed-Feb-10-2027-Fremont-Theater-CA | - |
| tm-blue-october-2027-valley-center-vvg1iz_1qjyqty | Blue October | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blue-october-2027-las-vegas-17ayv0g61ppuqbc | Blue October | none | 7957273 | https://www.ticketliquidator.com/tickets/7957273/Blue-October-tickets-Sat-Feb-13-2027-Brooklyn-Bowl-Las-Vegas | - |
| tm-blue-october-2027-bakersfield-z7r9jz1a70_4m | Blue October | none | 7957494 | https://www.ticketliquidator.com/tickets/7957494/Blue-October-tickets-Wed-Feb-17-2027-The-Historic-Bakersfield-Fox-Theater | - |
| tm-blue-october-2027-san-francisco-z7r9jz1a70_4z | Blue October | none | 7957495 | https://www.ticketliquidator.com/tickets/7957495/Blue-October-tickets-Thu-Feb-18-2027-The-Regency-Ballroom | - |
| tm-blue-october-2027-sacramento-g5vyz_1kgjhjj | Blue October | none | 7987108 | https://www.ticketliquidator.com/tickets/7987108/Blue-October-tickets-Fri-Feb-19-2027-Channel-24 | - |
| tm-blue-october-2027-sacramento-g5vyz_1kvkgjw | Blue October | none | 7957274 | https://www.ticketliquidator.com/tickets/7957274/Blue-October-tickets-Sat-Feb-20-2027-Channel-24 | - |
| tm-blue-october-2027-reno-17c8v0g61lh4py0 | Blue October | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blue-october-2027-spokane-g5vzz_1rinhtu | Blue October | none | 7957276 | https://www.ticketliquidator.com/tickets/7957276/Blue-October-tickets-Wed-Feb-24-2027-Knitting-Factory-Spokane | - |
| tm-blue-october-2027-vancouver-1778v0g61pgtl-u | Blue October | none | 7957283 | https://www.ticketliquidator.com/tickets/7957283/Blue-October-tickets-Thu-Feb-25-2027-Commodore-Ballroom | - |
| tm-blue-october-2027-seattle-vvg1hz_1rxwtla | Blue October | none | 7957277 | https://www.ticketliquidator.com/tickets/7957277/Blue-October-tickets-Fri-Feb-26-2027-Moore-Theatre-WA | - |
| tm-blue-october-2027-portland-z7r9jz1a70_-u | Blue October | none | 7957496 | https://www.ticketliquidator.com/tickets/7957496/Blue-October-tickets-Sat-Feb-27-2027-Roseland-Theater | - |
| tm-blue-october-2027-portland-z7r9jz1a70of9 | Blue October | none | 7957497 | https://www.ticketliquidator.com/tickets/7957497/Blue-October-tickets-Sun-Feb-28-2027-Roseland-Theater | - |
| tm-blue-october-2027-boise-g5vzz_1rcvq7p | Blue October | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blue-october-2027-salt-lake-city-z7r9jz1a70te4 | Blue October | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blue-october-2027-denver-z7r9jz1a70_-g | Blue October | none | 7957244 | https://www.ticketliquidator.com/tickets/7957244/Blue-October-tickets-Sat-Mar-6-2027-The-Mission-Ballroom | - |
| tm-blue-october-2027-colorado-springs-z7r9jz1a70_p7 | Blue October | none | 7957499 | https://www.ticketliquidator.com/tickets/7957499/Blue-October-tickets-Sun-Mar-7-2027-Pikes-Peak-Center | - |
| tm-blue-october-2027-chicago-z7r9jz1a70_-s | Blue October | none | 7957500 | https://www.ticketliquidator.com/tickets/7957500/Blue-October-tickets-Thu-Mar-11-2027-Riviera-Theatre-IL | - |
| tm-blue-october-2027-des-moines-vvg1bz_1xphcoz | Blue October | none | 7957280 | https://www.ticketliquidator.com/tickets/7957280/Blue-October-tickets-Fri-Mar-12-2027-Hoyt-Sherman-Place-Theater | - |
| tm-blue-october-2027-rockford-17f8v0g61mnfk5g | Blue October | none | 7957282 | https://www.ticketliquidator.com/tickets/7957282/Blue-October-tickets-Sun-Mar-14-2027-Hard-Rock-Live-Rockford | - |
| tm-pentatonix-2026-tacoma-vvg1hz_2zdlw0j | Pentatonix | none | 8184406 | https://www.ticketliquidator.com/tickets/8184406/Pentatonix-tickets-Thu-Nov-5-2026-Tacoma-Dome | - |
| tm-pentatonix-2026-vancouver-1k78vpvbga1v43o | Pentatonix | none | 8184455 | https://www.ticketliquidator.com/tickets/8184455/Pentatonix-tickets-Sat-Nov-7-2026-Rogers-Arena | - |
| tm-pentatonix-2026-bozeman-z7r9jz1aaz-xz | Pentatonix | none | 8194951 | https://www.ticketliquidator.com/tickets/8194951/Pentatonix-tickets-Mon-Nov-9-2026-Brick-Breeden-Fieldhouse | - |
| tm-pentatonix-2026-casper-g5vzz_2uvfg47 | Pentatonix | none | 8184409 | https://www.ticketliquidator.com/tickets/8184409/Pentatonix-tickets-Tue-Nov-10-2026-Ford-Wyoming-Center | - |
| tm-pentatonix-2026-lincoln-vv1akzkf7gkdppsjy | Pentatonix | none | 8184413 | https://www.ticketliquidator.com/tickets/8184413/Pentatonix-tickets-Thu-Nov-12-2026-Pinnacle-Bank-Arena | - |
| tm-pentatonix-2026-milwaukee-vvg1jz_296mpvg | Pentatonix | none | 8184416 | https://www.ticketliquidator.com/tickets/8184416/Pentatonix-tickets-Sat-Nov-14-2026-Fiserv-Forum | - |
| tm-pentatonix-2026-grand-rapids-vvg1oz_2h1hwe2 | Pentatonix | none | 8184418 | https://www.ticketliquidator.com/tickets/8184418/Pentatonix-tickets-Sun-Nov-15-2026-Van-Andel-Arena | - |
| tm-pentatonix-2026-louisville-1apzkf7gker9zih | Pentatonix | none | 8184419 | https://www.ticketliquidator.com/tickets/8184419/Pentatonix-tickets-Mon-Nov-16-2026-KFC-Yum-Center | - |
| tm-pentatonix-2026-buffalo-k7vgf_8kru5hf | Pentatonix | none | 8184420 | https://www.ticketliquidator.com/tickets/8184420/Pentatonix-tickets-Wed-Nov-18-2026-KeyBank-Center | - |
| tm-pentatonix-2026-cleveland-z7r9jz1aazofo | Pentatonix | none | 8184421 | https://www.ticketliquidator.com/tickets/8184421/Pentatonix-tickets-Thu-Nov-19-2026-Rocket-Arena | - |
| tm-pentatonix-2026-pittsburgh-1apzkfdgkdrcd8b | Pentatonix | none | 8184422 | https://www.ticketliquidator.com/tickets/8184422/Pentatonix-tickets-Sat-Nov-21-2026-PPG-Paints-Arena | - |
| tm-pentatonix-2026-hamilton-1a8zkf7gkdvkv7f | Pentatonix | none | - | - | no qualifying listing (complete catalog checked) |
| tm-pentatonix-2026-charlottesville-vv1f7z_8uv7ozdc1c | Pentatonix | none | 8184423 | https://www.ticketliquidator.com/tickets/8184423/Pentatonix-tickets-Sat-Nov-28-2026-John-Paul-Jones-Arena | - |
| tm-pentatonix-2026-albany-k7vgf_2br5dvf | Pentatonix | none | 8184424 | https://www.ticketliquidator.com/tickets/8184424/Pentatonix-tickets-Sun-Nov-29-2026-MVP-Arena | - |
| tm-pentatonix-2026-baltimore-17a8v0g62urg9es | Pentatonix | none | 8184425 | https://www.ticketliquidator.com/tickets/8184425/Pentatonix-tickets-Thu-Dec-3-2026-CFG-Bank-Arena | - |
| tm-pentatonix-2026-columbia-g5evz_2t_yqom | Pentatonix | none | 8184426 | https://www.ticketliquidator.com/tickets/8184426/Pentatonix-tickets-Sat-Dec-5-2026-Colonial-Life-Arena | - |
| tm-pentatonix-2026-greenville-g5evz_2tznjd_ | Pentatonix | none | 8184428 | https://www.ticketliquidator.com/tickets/8184428/Pentatonix-tickets-Sun-Dec-6-2026-Bon-Secours-Wellness-Arena | - |
| tm-pentatonix-2026-raleigh-g5evz_2xkfyfh | Pentatonix | none | 8184430 | https://www.ticketliquidator.com/tickets/8184430/Pentatonix-tickets-Mon-Dec-7-2026-Lenovo-Center | - |
| tm-pentatonix-2026-nashville-g5viz_8pdi7wi | Pentatonix | none | 8184431 | https://www.ticketliquidator.com/tickets/8184431/Pentatonix-tickets-Wed-Dec-9-2026-Bridgestone-Arena | - |
| tm-pentatonix-2026-atlanta-vvg1zz_8pzyi3r | Pentatonix | none | 8184432 | https://www.ticketliquidator.com/tickets/8184432/Pentatonix-tickets-Thu-Dec-10-2026-State-Farm-Arena-GA | - |
| tm-pentatonix-2026-north-little-rock-g5viz_2r0054y | Pentatonix | none | 8184433 | https://www.ticketliquidator.com/tickets/8184433/Pentatonix-tickets-Sat-Dec-12-2026-Simmons-Bank-Arena | - |
| tm-pentatonix-2026-bossier-city-g5viz_2gyyd_m | Pentatonix | none | 8184435 | https://www.ticketliquidator.com/tickets/8184435/Pentatonix-tickets-Sun-Dec-13-2026-Brookshire-Grocery-Arena | - |
| tm-pentatonix-2026-austin-g5diz_8kmjslp | Pentatonix | none | 8184790 | https://www.ticketliquidator.com/tickets/8184790/Pentatonix-tickets-Tue-Dec-15-2026-Moody-Center-ATX | - |
| tm-pentatonix-2026-fort-worth-vvg1yz_cn4la0m | Pentatonix | unverify (applied) | 8184443 | https://www.ticketliquidator.com/tickets/8184443/Pentatonix-tickets-Wed-Dec-16-2026-Dickies-Arena | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-pentatonix-2026-lubbock-z7r9jz1aaz-j6 | Pentatonix | none | 8193304 | https://www.ticketliquidator.com/tickets/8193304/Pentatonix-tickets-Thu-Dec-17-2026-United-Supermarkets-Arena | - |
| tm-pentatonix-2026-glendale-16_zkfdauzauuafa | Pentatonix | none | 8184445 | https://www.ticketliquidator.com/tickets/8184445/Pentatonix-tickets-Sat-Dec-19-2026-Desert-Diamond-Arena | - |
| tm-pentatonix-2026-san-diego-vvg1iz_2i-g3fb | Pentatonix | none | 8184448 | https://www.ticketliquidator.com/tickets/8184448/Pentatonix-tickets-Sun-Dec-20-2026-Viejas-Arena-At-Aztec-Bowl | - |
| tm-pentatonix-2026-inglewood-vv1aazkf7gkdi1gsn | Pentatonix | none | 8184452 | https://www.ticketliquidator.com/tickets/8184452/Pentatonix-tickets-Tue-Dec-22-2026-The-Kia-Forum | - |
| tm-tyla-2026-berlin-z698xzc2z16vfognfa | Tyla | none | 8168766 | https://www.ticketliquidator.com/tickets/8168766/Tyla-tickets-Tue-Oct-27-2026-Uber-Eats-Music-Hall | - |
| tm-tyla-2026-wheatland-g5vyz_2qphiow | Tyla | none | 8164815 | https://www.ticketliquidator.com/tickets/8164815/Tyla-tickets-Thu-Nov-12-2026-Hard-Rock-Live-Sacramento | - |
| tm-tyla-2026-san-francisco-g5vyz_2fimqin | Tyla | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tyla-2026-vancouver-1778v0g62hxtorg | Tyla | none | 8164819 | https://www.ticketliquidator.com/tickets/8164819/Tyla-tickets-Sun-Nov-15-2026-UBC-Doug-Mitchell-Thunderbird-Sports-Centre | - |
| tm-tyla-2026-seattle-vvg1hz_2qgz489 | Tyla | none | 8164824 | https://www.ticketliquidator.com/tickets/8164824/Tyla-tickets-Tue-Nov-17-2026-Wamu-Theater-At-Lumen-Field-Event-Center | - |
| tm-tyla-2026-denver-g5vzz_2qdtig- | Tyla | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tyla-2026-chicago-vvg18z_2o77qju | Tyla | none | 8164826 | https://www.ticketliquidator.com/tickets/8164826/Tyla-tickets-Sun-Nov-22-2026-Byline-Bank-Aragon-Ballroom | - |
| tm-tyla-2026-boston-vvg17z_2pblciw | Tyla | none | 8164827 | https://www.ticketliquidator.com/tickets/8164827/Tyla-tickets-Wed-Nov-25-2026-MGM-Music-Hall-at-Fenway-Park | - |
| tm-tyla-2026-toronto-177zv0g6294fsr8 | Tyla | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tyla-2026-brooklyn-k7vgf_2xiqkw5 | Tyla | none | 8164811 | https://www.ticketliquidator.com/tickets/8164811/Tyla-tickets-Sat-Nov-28-2026-Brooklyn-Paramount | - |
| tm-tyla-2026-brooklyn-k7vgf_2xiquwo | Tyla | none | 8228565 | https://www.ticketliquidator.com/tickets/8228565/Tyla-tickets-Sun-Nov-29-2026-Brooklyn-Paramount | - |
| tm-tyla-2026-washington-17a8v0g6267w7kc | Tyla | none | 8164835 | https://www.ticketliquidator.com/tickets/8164835/Tyla-tickets-Wed-Dec-2-2026-The-Anthem-DC | - |
| tm-tyla-2026-tampa-vvg1vz_2xeqp5j | Tyla | none | 8164840 | https://www.ticketliquidator.com/tickets/8164840/Tyla-tickets-Sat-Dec-5-2026-The-Yuengling-Center | - |
| tm-tyla-2026-atlanta-vvg1zz_2xnv9ge | Tyla | none | 8164845 | https://www.ticketliquidator.com/tickets/8164845/Tyla-tickets-Sun-Dec-6-2026-Coca-Cola-Roxy | - |
| tm-tyla-2026-irving-vvg1yz_2hhoqxx | Tyla | none | 8164850 | https://www.ticketliquidator.com/tickets/8164850/Tyla-tickets-Wed-Dec-9-2026-The-Pavilion-at-Toyota-Music-Factory | - |
| tm-tyla-2026-houston-g5diz_2qrewdk | Tyla | none | 8164851 | https://www.ticketliquidator.com/tickets/8164851/Tyla-tickets-Thu-Dec-10-2026-713-Music-Hall | - |
| tm-tyla-2026-austin-g5diz_2xjh2vb | Tyla | none | 8164672 | https://www.ticketliquidator.com/tickets/8164672/Tyla-tickets-Fri-Dec-11-2026-Moody-Center-ATX | - |
| tm-tyla-2026-phoenix-17k8v0g62ljff-n | Tyla | none | 8164852 | https://www.ticketliquidator.com/tickets/8164852/Tyla-tickets-Mon-Dec-14-2026-Arizona-Financial-Theatre | - |
| tm-tyla-2026-san-diego-vvg1iz_cilyeb0 | Tyla | none | 8164857 | https://www.ticketliquidator.com/tickets/8164857/Tyla-tickets-Tue-Dec-15-2026-Viejas-Arena-At-Aztec-Bowl | - |
| tm-tyla-2026-inglewood-vvg1iz_cjqejmf | Tyla | none | 8164858 | https://www.ticketliquidator.com/tickets/8164858/Tyla-tickets-Wed-Dec-16-2026-YouTube-Theater-at-Hollywood-Park | - |
| tm-tyla-2026-las-vegas-17ayv0g629nf-rw | Tyla | none | 8164859 | https://www.ticketliquidator.com/tickets/8164859/Tyla-tickets-Sat-Dec-19-2026-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-nothing-but-thieves-2027-amsterdam-z698xzbpz1k4d_v4s | Nothing But Thieves | none | 8090592 | https://www.ticketliquidator.com/tickets/8090592/Nothing-But-Thieves-tickets-Fri-Jan-15-2027-Ziggo-Dome | - |
| tm-nothing-but-thieves-2027-amsterdam-z698xzbpz1k86ab8e | Nothing But Thieves | none | 8090593 | https://www.ticketliquidator.com/tickets/8090593/Nothing-But-Thieves-tickets-Sat-Jan-16-2027-Ziggo-Dome | - |
| tm-nothing-but-thieves-2027-assago-zg9rmiynyzefv7 | Nothing But Thieves | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nothing-but-thieves-2027-merksem-antwerpen-z698xzg2z16v_u87zn | Nothing But Thieves | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nothing-but-thieves-2027-nottingham-17u8v0g65hxepmr | Nothing But Thieves | none | 8090588 | https://www.ticketliquidator.com/tickets/8090588/Nothing-But-Thieves-tickets-Thu-Feb-4-2027-Motorpoint-Arena-Nottingham | - |
| tm-nothing-but-thieves-2027-london-17u8v0g65h5y7dp | Nothing But Thieves | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nothing-but-thieves-2027-cardiff-17uov0g65qps55o | Nothing But Thieves | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nothing-but-thieves-2027-glasgow-17uov0g65qojiik | Nothing But Thieves | none | 8090594 | https://www.ticketliquidator.com/tickets/8090594/Nothing-But-Thieves-tickets-Wed-Feb-10-2027-OVO-Hydro | - |
| tm-nothing-but-thieves-2027-manchester-17uyv0g65hofvrj | Nothing But Thieves | none | 7996760 | https://www.ticketliquidator.com/tickets/7996760/Nothing-But-Thieves-tickets-Fri-Feb-12-2027-Co-Op-Live | - |
| tm-nothing-but-thieves-2027-birmingham-17fyv0g65h43oux | Nothing But Thieves | none | 8090586 | https://www.ticketliquidator.com/tickets/8090586/Nothing-But-Thieves-tickets-Sat-Feb-13-2027-bp-pulse-LIVE | - |
| tm-nothing-but-thieves-2027-vancouver-1778v0g65pb8zxj | Nothing But Thieves | none | 7996252 | https://www.ticketliquidator.com/tickets/7996252/Nothing-But-Thieves-tickets-Tue-Mar-30-2027-Queen-Elizabeth-Theatre-Vancouver | - |
| tm-nothing-but-thieves-2027-seattle-vvg1hz_59quyyu | Nothing But Thieves | none | 7996241 | https://www.ticketliquidator.com/tickets/7996241/Nothing-But-Thieves-tickets-Wed-Mar-31-2027-Paramount-Theatre-Seattle | - |
| tm-nothing-but-thieves-2027-portland-z7r9jz1a70gfm | Nothing But Thieves | none | 7996255 | https://www.ticketliquidator.com/tickets/7996255/Nothing-But-Thieves-tickets-Thu-Apr-1-2027-McMenamins-Crystal-Ballroom | - |
| tm-nothing-but-thieves-2027-oakland-g5vyz_5kszteq | Nothing But Thieves | none | 7996242 | https://www.ticketliquidator.com/tickets/7996242/Nothing-But-Thieves-tickets-Sat-Apr-3-2027-Fox-Theater-Oakland | - |
| tm-nothing-but-thieves-2027-hollywood-vvg10z_5blnvha | Nothing But Thieves | none | 7996243 | https://www.ticketliquidator.com/tickets/7996243/Nothing-But-Thieves-tickets-Sun-Apr-4-2027-Hollywood-Palladium | - |
| tm-nothing-but-thieves-2027-phoenix-17k8v0g659aif3n | Nothing But Thieves | none | 7996244 | https://www.ticketliquidator.com/tickets/7996244/Nothing-But-Thieves-tickets-Wed-Apr-7-2027-The-Van-Buren | - |
| tm-nothing-but-thieves-2027-denver-z7r9jz1a70g46 | Nothing But Thieves | none | 7996257 | https://www.ticketliquidator.com/tickets/7996257/Nothing-But-Thieves-tickets-Fri-Apr-9-2027-The-Mission-Ballroom | - |
| tm-nothing-but-thieves-2027-minneapolis-vvg1bz_5fojtcd | Nothing But Thieves | none | 7996245 | https://www.ticketliquidator.com/tickets/7996245/Nothing-But-Thieves-tickets-Sun-Apr-11-2027-The-Fillmore-Minneapolis-Presented-by-Affinity-Plus | - |
| tm-nothing-but-thieves-2027-chicago-vvg18z_5oubqpe | Nothing But Thieves | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nothing-but-thieves-2027-detroit-vvg1oz_5qme6mi | Nothing But Thieves | none | 7996247 | https://www.ticketliquidator.com/tickets/7996247/Nothing-But-Thieves-tickets-Tue-Apr-13-2027-The-Fillmore-Detroit | - |
| tm-nothing-but-thieves-2027-mckees-rocks-17aov0g65qrt_qd | Nothing But Thieves | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nothing-but-thieves-2027-philadelphia-vvg1fz_5qfmzvi | Nothing But Thieves | none | 7996249 | https://www.ticketliquidator.com/tickets/7996249/Nothing-But-Thieves-tickets-Fri-Apr-16-2027-The-Fillmore-Philadelphia | - |
| tm-nothing-but-thieves-2027-brooklyn-k7vgf_5qzhcl7 | Nothing But Thieves | none | 7996250 | https://www.ticketliquidator.com/tickets/7996250/Nothing-But-Thieves-tickets-Sat-Apr-17-2027-Brooklyn-Paramount | - |
| tm-nothing-but-thieves-2027-boston-vvg17z_5qrro-j | Nothing But Thieves | none | 7996251 | https://www.ticketliquidator.com/tickets/7996251/Nothing-But-Thieves-tickets-Mon-Apr-19-2027-Citizens-House-Of-Blues-Boston | - |
| tm-nothing-but-thieves-2027-montreal-17g8v0g65q_kpje | Nothing But Thieves | none | 7996253 | https://www.ticketliquidator.com/tickets/7996253/Nothing-But-Thieves-tickets-Tue-Apr-20-2027-MTelus | - |
| tm-nothing-but-thieves-2027-toronto-177zv0g65qu93gl | Nothing But Thieves | none | - | - | no qualifying listing (complete catalog checked) |
| tm-trivium-2026-st-petersburg-vvg1vz_cbh66cw | Trivium | none | 8151244 | https://www.ticketliquidator.com/tickets/8151244/Trivium-tickets-Thu-Nov-5-2026-Jannus-Live | - |
| tm-trivium-2026-atlanta-z7r9jz1aazdby | Trivium | none | 8151274 | https://www.ticketliquidator.com/tickets/8151274/Trivium-tickets-Fri-Nov-6-2026-The-Eastern-GA | - |
| tm-trivium-2026-louisville-z7r9jz1aazdbs | Trivium | none | 8151275 | https://www.ticketliquidator.com/tickets/8151275/Trivium-tickets-Sat-Nov-7-2026-Old-Foresters-Paristown-Hall | - |
| tm-trivium-2026-grand-rapids-vvg1oz_cnishwh | Trivium | none | 8151245 | https://www.ticketliquidator.com/tickets/8151245/Trivium-tickets-Sun-Nov-8-2026-GLC-Live-at-20-Monroe | - |
| tm-trivium-2026-silver-spring-17a8v0g6cngp9y6 | Trivium | none | 8151248 | https://www.ticketliquidator.com/tickets/8151248/Trivium-tickets-Tue-Nov-10-2026-The-Fillmore-Silver-Spring | - |
| tm-trivium-2026-new-haven-z7r9jz1aazdbw | Trivium | none | 8151276 | https://www.ticketliquidator.com/tickets/8151276/Trivium-tickets-Wed-Nov-11-2026-College-Street-Music-Hall | - |
| tm-trivium-2026-new-york-z7r9jz1aazdbs | Trivium | none | 8151277 | https://www.ticketliquidator.com/tickets/8151277/Trivium-tickets-Thu-Nov-12-2026-Terminal-5 | - |
| tm-trivium-2026-philadelphia-z7r9jz1aazdbv | Trivium | none | 8151278 | https://www.ticketliquidator.com/tickets/8151278/Trivium-tickets-Sat-Nov-14-2026-Franklin-Music-Hall | - |
| tm-trivium-2026-worcester-z7r9jz1aazdbg | Trivium | none | - | - | no qualifying listing (complete catalog checked) |
| tm-trivium-2026-laval-17g8v0g6cubsshb | Trivium | none | 8151271 | https://www.ticketliquidator.com/tickets/8151271/Trivium-tickets-Tue-Nov-17-2026-Place-Bell | - |
| tm-trivium-2026-toronto-177zv0g62er1iat | Trivium | none | - | - | no qualifying listing (complete catalog checked) |
| tm-trivium-2026-royal-oak-z7r9jz1aazdbu | Trivium | none | 8151280 | https://www.ticketliquidator.com/tickets/8151280/Trivium-tickets-Fri-Nov-20-2026-Royal-Oak-Music-Theatre | - |
| tm-trivium-2026-chicago-vvg18z_cnmg_i8 | Trivium | none | 8151249 | https://www.ticketliquidator.com/tickets/8151249/Trivium-tickets-Sat-Nov-21-2026-Byline-Bank-Aragon-Ballroom | - |
| tm-trivium-2026-madison-vvg1jz_cbaz-zj | Trivium | none | 8151250 | https://www.ticketliquidator.com/tickets/8151250/Trivium-tickets-Sun-Nov-22-2026-The-Sylvee-WI | - |
| tm-trivium-2026-nashville-z7r9jz1aazdbm | Trivium | none | - | - | no qualifying listing (complete catalog checked) |
| tm-trivium-2026-saint-louis-17f8v0g6cy863b6 | Trivium | none | - | - | no qualifying listing (complete catalog checked) |
| tm-trivium-2026-houston-g5diz_cdfyhi_ | Trivium | none | 8151254 | https://www.ticketliquidator.com/tickets/8151254/Trivium-tickets-Sat-Nov-28-2026-Bayou-Music-Center | - |
| tm-trivium-2026-dallas-vvg1yz_cdoxznj | Trivium | none | 8151256 | https://www.ticketliquidator.com/tickets/8151256/Trivium-tickets-Sun-Nov-29-2026-South-Side-Ballroom-at-Gilleys | - |
| tm-trivium-2026-phoenix-17k8v0g62douihb | Trivium | none | 8151257 | https://www.ticketliquidator.com/tickets/8151257/Trivium-tickets-Wed-Dec-2-2026-Arizona-Financial-Theatre | - |
| tm-trivium-2026-inglewood-vvg1iz_ceqwhij | Trivium | none | 8151261 | https://www.ticketliquidator.com/tickets/8151261/Trivium-tickets-Fri-Dec-4-2026-YouTube-Theater-at-Hollywood-Park | - |
| tm-trivium-2026-san-francisco-g5vyz_2ejmndl | Trivium | none | 8151262 | https://www.ticketliquidator.com/tickets/8151262/Trivium-tickets-Sat-Dec-5-2026-The-Masonic-San-Francisco | - |
| tm-trivium-2026-penticton-z7r9jz1aazdbz | Trivium | none | 8151283 | https://www.ticketliquidator.com/tickets/8151283/Trivium-tickets-Mon-Dec-7-2026-Penticton-Trade-Convention-Centre | - |
| tm-trivium-2026-vancouver-1778v0g626krqj1 | Trivium | none | 8151273 | https://www.ticketliquidator.com/tickets/8151273/Trivium-tickets-Tue-Dec-8-2026-UBC-Doug-Mitchell-Thunderbird-Sports-Centre | - |
| tm-trivium-2026-seattle-vvg1hz_2dp1x5t | Trivium | none | 8151265 | https://www.ticketliquidator.com/tickets/8151265/Trivium-tickets-Wed-Dec-9-2026-Paramount-Theatre-Seattle | - |
| tm-trivium-2026-reno-17ayv0g6cnaivry | Trivium | none | - | - | no qualifying listing (complete catalog checked) |
| tm-trivium-2026-denver-z7r9jz1aazdby | Trivium | none | 8151286 | https://www.ticketliquidator.com/tickets/8151286/Trivium-tickets-Sun-Dec-13-2026-The-Mission-Ballroom | - |
| tm-trivium-2026-tulsa-z7r9jz1aazd_z | Trivium | none | 8151287 | https://www.ticketliquidator.com/tickets/8151287/Trivium-tickets-Tue-Dec-15-2026-Tulsa-Theater | - |
| tm-trivium-2026-omaha-17fzv0g6cxxpndr | Trivium | none | 8151268 | https://www.ticketliquidator.com/tickets/8151268/Trivium-tickets-Wed-Dec-16-2026-Steelhouse-Omaha | - |
| tm-trivium-2026-pittsburgh-17aov0g6cymqerk | Trivium | none | 8151269 | https://www.ticketliquidator.com/tickets/8151269/Trivium-tickets-Fri-Dec-18-2026-Citizens-Live-at-The-Wylie | - |
| tm-trivium-2026-charlotte-g5evz_cufmier | Trivium | none | 8151270 | https://www.ticketliquidator.com/tickets/8151270/Trivium-tickets-Sat-Dec-19-2026-The-Fillmore-Charlotte | - |
| tm-trivium-2027-glasgow-1auzkfpgken_hpc | Trivium | none | - | - | no qualifying listing (complete catalog checked) |
| tm-trivium-2027-manchester-1amzkffgkdkmgfp | Trivium | none | 8233453 | https://www.ticketliquidator.com/tickets/8233453/Trivium-tickets-Fri-Apr-2-2027-Co-Op-Live | - |
| tm-trivium-2027-london-g5vhz_o63ceuv | Trivium | none | - | - | no qualifying listing (complete catalog checked) |
| tm-trivium-2027-cardiff-1kuovpa6gacrw-h | Trivium | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sabaton-2026-hollywood-vv1aazko4gkdzwp0r | Sabaton | none | 7410008 | https://www.ticketliquidator.com/tickets/7410008/Sabaton-tickets-Thu-Nov-12-2026-Hollywood-Palladium | - |
| tm-sabaton-2026-pittsburgh-1avbz_kgkwfjp1j | Sabaton | none | 7808973 | https://www.ticketliquidator.com/tickets/7808973/Sabaton-tickets-Thu-Dec-3-2026-Citizens-Live-at-The-Wylie | - |
| tm-sabaton-2026-nashville-g5viz_kmyac0s | Sabaton | none | 7808860 | https://www.ticketliquidator.com/tickets/7808860/Sabaton-tickets-Wed-Dec-9-2026-The-Truth | - |
| tm-sabaton-2026-orlando-16efz_afzg7dbn1 | Sabaton | none | 7784220 | https://www.ticketliquidator.com/tickets/7784220/Sabaton-tickets-Fri-Dec-11-2026-Hard-Rock-Live-Orlando | - |
| tm-sabaton-2026-fort-lauderdale-z7r9jz1a7-oqe | Sabaton | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sabaton-2027-glasgow-17uov0g6g3si1v4 | Sabaton | none | 8127263 | https://www.ticketliquidator.com/tickets/8127263/Sabaton-tickets-Fri-Apr-9-2027-OVO-Hydro | - |
| tm-sabaton-2027-birmingham-17fyv0g6gp8gytu | Sabaton | none | 8127262 | https://www.ticketliquidator.com/tickets/8127262/Sabaton-tickets-Sat-Apr-10-2027-bp-pulse-LIVE | - |
| tm-sabaton-2027-rotterdam-z698xzbpz1k_n08z3 | Sabaton | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beartooth-2026-boston-vvg17z_1njiezr | Beartooth | none | 7980209 | https://www.ticketliquidator.com/tickets/7980209/Beartooth-tickets-Wed-Nov-11-2026-MGM-Music-Hall-at-Fenway-Park | - |
| tm-beartooth-2026-new-york-k7vgf_1s1uowe | Beartooth | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beartooth-2026-philadelphia-z7r9jz1a70tke | Beartooth | none | 7980349 | https://www.ticketliquidator.com/tickets/7980349/Beartooth-tickets-Fri-Nov-13-2026-Franklin-Music-Hall | - |
| tm-beartooth-2026-national-harbor-17a8v0g61vjcef3 | Beartooth | none | 7980212 | https://www.ticketliquidator.com/tickets/7980212/Beartooth-tickets-Sun-Nov-15-2026-The-Theater-at-MGM-National-Harbor | - |
| tm-beartooth-2026-pittsburgh-z7r9jz1a70t36 | Beartooth | none | 7980350 | https://www.ticketliquidator.com/tickets/7980350/Beartooth-tickets-Wed-Nov-18-2026-Stage-AE | - |
| tm-beartooth-2026-chicago-vvg18z_1nj0ag4 | Beartooth | none | 7980215 | https://www.ticketliquidator.com/tickets/7980215/Beartooth-tickets-Fri-Nov-20-2026-Byline-Bank-Aragon-Ballroom | - |
| tm-beartooth-2026-maplewood-z7r9jz1aava89 | Beartooth | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beartooth-2026-omaha-17fzv0g61sq6aec | Beartooth | none | 7980217 | https://www.ticketliquidator.com/tickets/7980217/Beartooth-tickets-Sun-Nov-22-2026-Steelhouse-Omaha | - |
| tm-beartooth-2026-nashville-g5viz_1sjbpcf | Beartooth | none | 7980219 | https://www.ticketliquidator.com/tickets/7980219/Beartooth-tickets-Sat-Nov-28-2026-The-Truth | - |
| tm-beartooth-2026-atlanta-vvg1zz_1br-um- | Beartooth | none | 7980221 | https://www.ticketliquidator.com/tickets/7980221/Beartooth-tickets-Sun-Nov-29-2026-Coca-Cola-Roxy | - |
| tm-beartooth-2026-charlotte-g5evz_1mwgsx1 | Beartooth | none | 7980223 | https://www.ticketliquidator.com/tickets/7980223/Beartooth-tickets-Tue-Dec-1-2026-The-Fillmore-Charlotte | - |
| tm-beartooth-2026-saint-augustine-z7r9jz1a70igm | Beartooth | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beartooth-2026-fort-lauderdale-z7r9jz1a70igy | Beartooth | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beartooth-2026-new-orleans-g5viz_1lu2gm0 | Beartooth | none | 7980229 | https://www.ticketliquidator.com/tickets/7980229/Beartooth-tickets-Mon-Dec-7-2026-The-Fillmore-New-Orleans | - |
| tm-beartooth-2026-dallas-vvg1yz_1mmkrmi | Beartooth | none | 7980234 | https://www.ticketliquidator.com/tickets/7980234/Beartooth-tickets-Thu-Dec-10-2026-South-Side-Ballroom-at-Gilleys | - |
| tm-beartooth-2026-denver-g5vzz_1sigr2s | Beartooth | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beartooth-2026-salt-lake-city-g5vzz_1w63kam | Beartooth | none | 7980237 | https://www.ticketliquidator.com/tickets/7980237/Beartooth-tickets-Sun-Dec-13-2026-The-Union-Event-Center | - |
| tm-beartooth-2026-phoenix-17k8v0g61i5gitx | Beartooth | none | 7980239 | https://www.ticketliquidator.com/tickets/7980239/Beartooth-tickets-Wed-Dec-16-2026-Arizona-Financial-Theatre | - |
| tm-beartooth-2026-hollywood-vvg10z_1ikgdyb | Beartooth | none | 7980240 | https://www.ticketliquidator.com/tickets/7980240/Beartooth-tickets-Fri-Dec-18-2026-Hollywood-Palladium | - |
| tm-beartooth-2026-wheatland-g5vyz_1xgdb2f | Beartooth | none | 7980241 | https://www.ticketliquidator.com/tickets/7980241/Beartooth-tickets-Sat-Dec-19-2026-Hard-Rock-Live-Sacramento | - |
| tm-luke-combs-2027-minneapolis-z7r9jz1aazgx6 | Luke Combs | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sombr-2027-hamburg-z698xzc2z1k-yjfqj | Sombr | none | 8245510 | https://www.ticketliquidator.com/tickets/8245510/sombr-tickets-Fri-May-14-2027-Barclays-Arena-Hamburg | - |
| tm-sombr-2027-merksem-antwerpen-z698xzg2z16v0pps8o | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sombr-2027-berlin-z698xzc2z1akrz8f | Sombr | none | 8245511 | https://www.ticketliquidator.com/tickets/8245511/sombr-tickets-Tue-May-18-2027-Uber-Arena | - |
| tm-sombr-2027-munich-z698xzc2z1kosuv4v | Sombr | none | 8245513 | https://www.ticketliquidator.com/tickets/8245513/sombr-tickets-Fri-May-28-2027-Kleine-Olympiahalle-Munich | - |
| tm-sombr-2027-amsterdam-z698xzbpz16ee7oboy | Sombr | none | 8245523 | https://www.ticketliquidator.com/tickets/8245523/sombr-tickets-Mon-May-31-2027-Ziggo-Dome | - |
| tm-sombr-2027-amsterdam-z698xzbpz16v0w4skv | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sombr-2027-milano-zg9rmiynyzd611 | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sombr-2027-glasgow-1auzkfbgkeiqyo0 | Sombr | none | 8245421 | https://www.ticketliquidator.com/tickets/8245421/sombr-tickets-Sat-Jun-19-2027-Bellahouston-Park | - |
| tm-sombr-2027-london-1adfz_ogkwyrfux | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sombr-2027-london-1adfz_ogklwvhfa | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sombr-2027-london-1adfz_ogkwskt7w | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sombr-2027-london-1adfz_ogkwy2ti0 | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sombr-2027-london-1adfz_ogkwwynfm | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-in-flames-2026-ft-lauderdale-vvg1vz_3k_p4ju | In Flames | none | - | - | no qualifying listing (complete catalog checked) |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0v4 | Teddy Swims | none | - | - | no qualifying listing (complete catalog checked) |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0vp | Teddy Swims | none | - | - | no qualifying listing (complete catalog checked) |
| tm-polyphia-2026-barcelona-z698xz2qz16va8gvrd | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-polyphia-2026-madrid-z698xz2qz1kp_ozf3 | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-polyphia-2026-milano-zg9rmiynyzefaa | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-polyphia-2026-warsaw-z698xzqpz1k-vasek | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-polyphia-2026-berlin-z698xzc2z16vompnuz | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-polyphia-2026-oberhausen-z698xzc2z16vk8v9xd | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-polyphia-2026-birmingham-g5dzz_gsc9wjr | Polyphia | none | 8265862 | https://www.ticketliquidator.com/tickets/8265862/Polyphia-tickets-Fri-Dec-11-2026-O2-Academy-Birmingham | - |
| tm-polyphia-2026-manchester-g5vhz_gr4jgl2 | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-polyphia-2026-leeds-g5dzz_gl9y_6t | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-polyphia-2026-london-g5dzz_gljhn6p | Polyphia | none | 8324859 | https://www.ticketliquidator.com/tickets/8324859/Polyphia-tickets-Wed-Dec-16-2026-O2-Academy-Brixton | - |
| tm-polyphia-2027-phoenix-16_zkf_ofzag77fu | Polyphia | none | 8235923 | https://www.ticketliquidator.com/tickets/8235923/Polyphia-tickets-Fri-Feb-5-2027-Arizona-Financial-Theatre | - |
| tm-polyphia-2027-las-vegas-169zkfppazau15va | Polyphia | none | 8235924 | https://www.ticketliquidator.com/tickets/8235924/Polyphia-tickets-Sat-Feb-6-2027-House-Of-Blues-Las-Vegas | - |
| tm-polyphia-2027-san-diego-z7r9jz1aav67j | Polyphia | none | 8235926 | https://www.ticketliquidator.com/tickets/8235926/Polyphia-tickets-Wed-Feb-10-2027-SOMA | - |
| tm-polyphia-2027-seattle-vvg1hz_oxmv1cx | Polyphia | none | 8235936 | https://www.ticketliquidator.com/tickets/8235936/Polyphia-tickets-Wed-Feb-17-2027-Paramount-Theatre-Seattle | - |
| tm-polyphia-2027-salt-lake-city-g5vzz_ojsblfw | Polyphia | none | 8056767 | https://www.ticketliquidator.com/tickets/8056767/Polyphia-tickets-Fri-Feb-19-2027-The-Depot-Salt-Lake-City | - |
| tm-polyphia-2027-denver-g5vzz_oe6fcei | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-polyphia-2027-minneapolis-vv16kzkfbfazacg5v8 | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-polyphia-2027-indianapolis-vv1aazkfbgkd_h8yq | Polyphia | none | 8235950 | https://www.ticketliquidator.com/tickets/8235950/Polyphia-tickets-Fri-Feb-26-2027-Egyptian-Room-At-Old-National-Centre | - |
| tm-polyphia-2027-charlotte-g5evz_ojpf6hx | Polyphia | none | 8235961 | https://www.ticketliquidator.com/tickets/8235961/Polyphia-tickets-Fri-Mar-12-2027-The-Fillmore-Charlotte | - |
| tm-polyphia-2027-st-petersburg-vvg1vz_oesihnv | Polyphia | none | 8235963 | https://www.ticketliquidator.com/tickets/8235963/Polyphia-tickets-Sun-Mar-14-2027-Jannus-Live | - |
| tm-polyphia-2027-birmingham-1aozkfbgkdtjfo5 | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stella-lefty-2026-san-francisco-z7r9jz1a70epk | Stella Lefty | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stella-lefty-2026-west-hollywood-z7r9jz1a70e4e | Stella Lefty | none | 7976893 | https://www.ticketliquidator.com/tickets/7976893/Stella-Lefty-tickets-Sun-Nov-1-2026-Troubadour | - |
| tm-stella-lefty-2026-los-angeles-z7r9jz1a70sod | Stella Lefty | none | 7990417 | https://www.ticketliquidator.com/tickets/7990417/Stella-Lefty-tickets-Mon-Nov-2-2026-The-Fonda-Theatre | - |
| tm-stella-lefty-2026-phoenix-z7r9jz1a70tgw | Stella Lefty | none | 7977189 | https://www.ticketliquidator.com/tickets/7977189/Stella-Lefty-tickets-Tue-Nov-3-2026-The-Crescent-Ballroom-Phoenix | - |
| tm-stella-lefty-2026-dallas-vvg1yz_1xpakgv | Stella Lefty | none | 7976584 | https://www.ticketliquidator.com/tickets/7976584/Stella-Lefty-tickets-Fri-Nov-6-2026-Cambridge-Room-at-House-Of-Blues-Dallas | - |
| tm-stella-lefty-2026-houston-g5diz_1ymrkkp | Stella Lefty | none | 7976585 | https://www.ticketliquidator.com/tickets/7976585/Stella-Lefty-tickets-Sat-Nov-7-2026-Bronze-Peacock-At-The-House-Of-Blues-Houston | - |
| tm-stella-lefty-2026-atlanta-vvg1zz_1byaqd- | Stella Lefty | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stella-lefty-2026-toronto-177zv0g61mkytjo | Stella Lefty | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stella-lefty-2026-new-york-z7r9jz1a7pg08 | Stella Lefty | none | 7990418 | https://www.ticketliquidator.com/tickets/7990418/Stella-Lefty-tickets-Sun-Nov-15-2026-Webster-Hall | - |
| tm-stella-lefty-2026-new-york-k7vgf_1dgeulr | Stella Lefty | none | 7976587 | https://www.ticketliquidator.com/tickets/7976587/Stella-Lefty-tickets-Mon-Nov-16-2026-Bowery-Ballroom | - |
| tm-stella-lefty-2026-boston-z7r9jz1a70eoz | Stella Lefty | none | 7976872 | https://www.ticketliquidator.com/tickets/7976872/Stella-Lefty-tickets-Tue-Nov-17-2026-Royale-Boston | - |
| tm-stella-lefty-2026-washington-17a8v0g61ujpeyi | Stella Lefty | none | 7976588 | https://www.ticketliquidator.com/tickets/7976588/Stella-Lefty-tickets-Thu-Nov-19-2026-The-Atlantis | - |
| tm-stella-lefty-2027-detroit-vv1afzkfkgkesu99t | Stella Lefty | none | 8231213 | https://www.ticketliquidator.com/tickets/8231213/Stella-Lefty-tickets-Sat-Jan-9-2027-The-Fillmore-Detroit | - |
| tm-stella-lefty-2027-columbus-z7r9jz1aav7q6 | Stella Lefty | none | 8231224 | https://www.ticketliquidator.com/tickets/8231224/Stella-Lefty-tickets-Sun-Jan-10-2027-KEMBA-Live | - |
| tm-stella-lefty-2027-toronto-1a8zkf4gkddr1l2 | Stella Lefty | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stella-lefty-2027-toronto-1avzz_ogklpe4bz | Stella Lefty | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stella-lefty-2027-montreal-1kg8vp7yga51kww | Stella Lefty | none | 8231124 | https://www.ticketliquidator.com/tickets/8231124/Stella-Lefty-tickets-Fri-Jan-15-2027-MTelus | - |
| tm-stella-lefty-2027-boston-vv168vp7y-kz7ukua | Stella Lefty | none | 8231214 | https://www.ticketliquidator.com/tickets/8231214/Stella-Lefty-tickets-Sun-Jan-17-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-stella-lefty-2027-brooklyn-k7vgf_ocrjdss | Stella Lefty | none | 8231219 | https://www.ticketliquidator.com/tickets/8231219/Stella-Lefty-tickets-Tue-Jan-19-2027-Brooklyn-Paramount | - |
| tm-stella-lefty-2027-brooklyn-k7vgf_ocrqdsw | Stella Lefty | none | 8237158 | https://www.ticketliquidator.com/tickets/8237158/Stella-Lefty-tickets-Wed-Jan-20-2027-Brooklyn-Paramount | - |
| tm-stella-lefty-2027-philadelphia-vv1aezkfkgkddxsrk | Stella Lefty | none | 8231140 | https://www.ticketliquidator.com/tickets/8231140/Stella-Lefty-tickets-Fri-Jan-22-2027-The-Met-Presented-by-Highmark | - |
| tm-stella-lefty-2027-washington-1a4zkffgkdf8c-z | Stella Lefty | none | 8231143 | https://www.ticketliquidator.com/tickets/8231143/Stella-Lefty-tickets-Sat-Jan-23-2027-The-Anthem-DC | - |
| tm-stella-lefty-2027-charlotte-g5evz_o9kpb3z | Stella Lefty | none | 8231132 | https://www.ticketliquidator.com/tickets/8231132/Stella-Lefty-tickets-Mon-Jan-25-2027-The-Fillmore-Charlotte | - |
| tm-stella-lefty-2027-atlanta-vvg1zz_olg43wy | Stella Lefty | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stella-lefty-2027-dallas-vvg1yz_o8qf6xm | Stella Lefty | none | 8231142 | https://www.ticketliquidator.com/tickets/8231142/Stella-Lefty-tickets-Thu-Jan-28-2027-South-Side-Ballroom-at-Gilleys | - |
| tm-stella-lefty-2027-houston-g5diz_opbsxqh | Stella Lefty | none | 8231123 | https://www.ticketliquidator.com/tickets/8231123/Stella-Lefty-tickets-Sat-Jan-30-2027-House-Of-Blues-Houston | - |
| tm-stella-lefty-2027-san-francisco-g5vyz_ok5hlnw | Stella Lefty | none | 8231139 | https://www.ticketliquidator.com/tickets/8231139/Stella-Lefty-tickets-Tue-Feb-9-2027-The-Masonic-San-Francisco | - |
| tm-stella-lefty-2027-salt-lake-city-g5vzz_okzttv5 | Stella Lefty | none | 8231141 | https://www.ticketliquidator.com/tickets/8231141/Stella-Lefty-tickets-Fri-Feb-12-2027-The-Union-Event-Center | - |
| tm-stella-lefty-2027-denver-g5vzz_o3ivhxh | Stella Lefty | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stella-lefty-2027-chicago-vv1a7zkf3ovc9zec5 | Stella Lefty | none | 8231138 | https://www.ticketliquidator.com/tickets/8231138/Stella-Lefty-tickets-Sat-Feb-20-2027-Byline-Bank-Aragon-Ballroom | - |
| tm-stella-lefty-2027-amsterdam-z698xzbpz16vj_pxbp | Stella Lefty | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stella-lefty-2027-manchester-g5dzz_36uppzk | Stella Lefty | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stella-lefty-2027-birmingham-g5dzz_o1n7vhc | Stella Lefty | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tobymac-2026-columbia-vvg1bz_1xth3vu | TobyMac | none | 7957524 | https://www.ticketliquidator.com/tickets/7957524/TobyMac-tickets-Thu-Nov-5-2026-Mizzou-Arena | - |
| tm-tobymac-2026-evansville-vvg1fz_1ipflre | TobyMac | none | 7957526 | https://www.ticketliquidator.com/tickets/7957526/TobyMac-tickets-Fri-Nov-6-2026-Ford-Center-IN | - |
| tm-tobymac-2026-cleveland-vvg1fz_1raogqa | TobyMac | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tobymac-2026-greensboro-g5evz_1nayk4t | TobyMac | none | 7957529 | https://www.ticketliquidator.com/tickets/7957529/TobyMac-tickets-Sun-Nov-8-2026-First-Horizon-Coliseum-At-Greensboro-Complex | - |
| tm-saint-levant-2026-utrecht-z698xzbpz16ezo1d8_ | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2026-amsterdam-z698xzbpz1kqt7gc_ | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2026-stockholm-z698xzq2z16vfgv3vs | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2026-milano-zg9rmiynyzdda7 | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2027-ottawa-1aszkf_gkdi5bcd | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2027-london-1avzz_ogktcpwjw | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2027-toronto-1a8zkf_gkdyntyg | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2027-brooklyn-k7vgf_ocsz0pi | Saint Levant | none | 8244019 | https://www.ticketliquidator.com/tickets/8244019/Saint-Levant-tickets-Thu-Apr-1-2027-Brooklyn-Paramount | - |
| tm-saint-levant-2027-chicago-vv1a7zkf_gkewujj1 | Saint Levant | none | 8133113 | https://www.ticketliquidator.com/tickets/8133113/Saint-Levant-tickets-Sat-Apr-3-2027-Byline-Bank-Aragon-Ballroom | - |
| tm-saint-levant-2027-detroit-vv1koz_opyg7lxkw | Saint Levant | none | 8244020 | https://www.ticketliquidator.com/tickets/8244020/Saint-Levant-tickets-Wed-Apr-7-2027-The-Fillmore-Detroit | - |
| tm-saint-levant-2027-silver-spring-1ka8vpkbgagykaz | Saint Levant | none | 8244017 | https://www.ticketliquidator.com/tickets/8244017/Saint-Levant-tickets-Sat-Apr-10-2027-The-Fillmore-Silver-Spring | - |
| tm-saint-levant-2027-los-angeles-vv1aazkf_gkdotx7a | Saint Levant | none | 8244022 | https://www.ticketliquidator.com/tickets/8244022/Saint-Levant-tickets-Sun-May-2-2027-The-Wiltern | - |
| tm-saint-levant-2027-seattle-vvg1hz_oejiei5 | Saint Levant | none | 8244021 | https://www.ticketliquidator.com/tickets/8244021/Saint-Levant-tickets-Mon-May-10-2027-Paramount-Theatre-Seattle | - |
| tm-saint-levant-2027-vancouver-1aozkfbgkd_gms9 | Saint Levant | none | 8244014 | https://www.ticketliquidator.com/tickets/8244014/Saint-Levant-tickets-Wed-May-12-2027-Malkin-Bowl-Stanley-Park | - |
| tm-saint-levant-2027-vancouver-1aozkfbgkdqarvt | Saint Levant | none | 8244009 | https://www.ticketliquidator.com/tickets/8244009/Saint-Levant-tickets-Thu-May-13-2027-Malkin-Bowl-Stanley-Park | - |
| tm-the-airborne-toxic-event-2026-chicago-z7r9jz1a70iqs | The Airborne Toxic Event | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-airborne-toxic-event-2027-chicago-z7r9jz1aazbfj | The Airborne Toxic Event | none | 7978141 | https://www.ticketliquidator.com/tickets/7978141/The-Airborne-Toxic-Event-tickets-Wed-May-26-2027-Vic-Theatre | - |
| tm-the-airborne-toxic-event-2027-englewood-z7r9jz1aazgov | The Airborne Toxic Event | none | 7978059 | https://www.ticketliquidator.com/tickets/7978059/The-Airborne-Toxic-Event-tickets-Tue-Jun-8-2027-Gothic-Theatre | - |
| tm-the-airborne-toxic-event-2027-portland-z7r9jz1aazfzx | The Airborne Toxic Event | none | 7977696 | https://www.ticketliquidator.com/tickets/7977696/The-Airborne-Toxic-Event-tickets-Fri-Jun-11-2027-Revolution-Hall-Portland | - |
| tm-andrea-bocelli-2026-boston-vv1k7z_dz6g7ymm- | Andrea Bocelli | none | 7711521 | https://www.ticketliquidator.com/tickets/7711521/Andrea-Bocelli-tickets-Thu-Dec-10-2026-TD-Garden | - |
| tm-andrea-bocelli-2026-buffalo-k7vgf_dlhwxlk | Andrea Bocelli | none | 7711522 | https://www.ticketliquidator.com/tickets/7711522/Andrea-Bocelli-tickets-Fri-Dec-11-2026-KeyBank-Center | - |
| tm-andrea-bocelli-2026-montreal-1ad7z_dgkclbvf3 | Andrea Bocelli | none | 7711527 | https://www.ticketliquidator.com/tickets/7711527/Andrea-Bocelli-tickets-Sun-Dec-13-2026-Centre-Bell | - |
| tm-andrea-bocelli-2026-new-york-g5diz_drrs_4p | Andrea Bocelli | none | 7711523 | https://www.ticketliquidator.com/tickets/7711523/Andrea-Bocelli-tickets-Wed-Dec-16-2026-Madison-Square-Garden | - |
| tm-andrea-bocelli-2026-new-york-g5diz_drrgy4q | Andrea Bocelli | none | 7711524 | https://www.ticketliquidator.com/tickets/7711524/Andrea-Bocelli-tickets-Thu-Dec-17-2026-Madison-Square-Garden | - |
| tm-andrea-bocelli-2026-hamilton-1a8zk8vgkel0c3m | Andrea Bocelli | none | - | - | no qualifying listing (complete catalog checked) |
| tm-andrea-bocelli-2026-pittsburgh-1apzk8vgkdk8zer | Andrea Bocelli | none | 7711525 | https://www.ticketliquidator.com/tickets/7711525/Andrea-Bocelli-tickets-Mon-Dec-21-2026-PPG-Paints-Arena | - |
| tm-andrea-bocelli-2026-philadelphia-1ayzk8ygkdwg9ej | Andrea Bocelli | none | 7711526 | https://www.ticketliquidator.com/tickets/7711526/Andrea-Bocelli-tickets-Tue-Dec-22-2026-Xfinity-Mobile-Arena | - |
| tm-andrea-bocelli-2027-cardiff-1agzkfkgkejnxkj | Andrea Bocelli | none | 8198913 | https://www.ticketliquidator.com/tickets/8198913/Andrea-Bocelli-tickets-Sat-May-8-2027-Principality-Stadium | - |
| tm-morat-2027-inglewood-vvg10z_1tsiuwe | Morat | none | 7977736 | https://www.ticketliquidator.com/tickets/7977736/Morat-tickets-Fri-Feb-26-2027-Intuit-Dome | - |
| tm-morat-2027-el-paso-vvg1yz_1xncffn | Morat | none | - | - | no qualifying listing (complete catalog checked) |
| tm-morat-2027-rosemont-vvg18z_1rgckw0 | Morat | none | 7977739 | https://www.ticketliquidator.com/tickets/7977739/Morat-tickets-Fri-Mar-5-2027-Rosemont-Theatre | - |
| tm-morat-2027-boston-vvg17z_1b5nnhl | Morat | none | 7977740 | https://www.ticketliquidator.com/tickets/7977740/Morat-tickets-Sun-Mar-7-2027-Agganis-Arena | - |
| tm-morat-2027-grand-prairie-z7r9jz1a70iu_ | Morat | none | 7985682 | https://www.ticketliquidator.com/tickets/7985682/Morat-tickets-Fri-Mar-12-2027-Texas-Trust-CU-Theatre-at-Grand-Prairie | - |
| tm-morat-2027-sugar-land-z7r9jz1a70iu- | Morat | none | - | - | no qualifying listing (complete catalog checked) |
| tm-morat-2027-hidalgo-g5diz_1bprewh | Morat | none | 7977523 | https://www.ticketliquidator.com/tickets/7977523/Morat-tickets-Sun-Mar-14-2027-Payne-Arena | - |
| tm-morat-2027-orlando-17fov0g61xg_prh | Morat | none | 7977742 | https://www.ticketliquidator.com/tickets/7977742/Morat-tickets-Thu-Mar-18-2027-Kia-Center | - |
| tm-morat-2027-miami-vvg1vz_1toy-p6 | Morat | none | 7977745 | https://www.ticketliquidator.com/tickets/7977745/Morat-tickets-Sat-Mar-20-2027-Kaseya-Center | - |
| tm-morat-2027-toronto-177zv0g65ag8wpj | Morat | none | - | - | no qualifying listing (complete catalog checked) |
| tm-morat-2027-montreal-17g8v0g65cezfzf | Morat | none | 7985892 | https://www.ticketliquidator.com/tickets/7985892/Morat-tickets-Sat-Mar-27-2027-MTelus | - |
| tm-morat-2027-brooklyn-17gzv0g61xr7dfv | Morat | none | 7977746 | https://www.ticketliquidator.com/tickets/7977746/Morat-tickets-Thu-Apr-1-2027-Barclays-Center | - |
| tm-morat-2027-fairfax-17a8v0g61boau0r | Morat | none | 7977748 | https://www.ticketliquidator.com/tickets/7977748/Morat-tickets-Sat-Apr-3-2027-EagleBank-Arena | - |
| tm-missio-2026-phoenix-z7r9jz1aaziv4 | Missio | none | 8200524 | https://www.ticketliquidator.com/tickets/8200524/Missio-tickets-Thu-Oct-29-2026-The-Rebel-Lounge-Phoenix | - |
| tm-missio-2026-san-diego-vvg1iz_8m2p9ef | Missio | none | 8200525 | https://www.ticketliquidator.com/tickets/8200525/Missio-tickets-Fri-Oct-30-2026-Voodoo-Room-at-House-of-Blues-San-Diego | - |
| tm-missio-2026-los-angeles-vv170z_8gkie-eov | Missio | none | 8200526 | https://www.ticketliquidator.com/tickets/8200526/Missio-tickets-Sun-Nov-1-2026-Teragram-Ballroom | - |
| tm-missio-2026-salt-lake-city-z7r9jz1aazivp | Missio | none | - | - | no qualifying listing (complete catalog checked) |
| tm-missio-2026-denver-g5vzz_8l-vdn4 | Missio | none | 8200529 | https://www.ticketliquidator.com/tickets/8200529/Missio-tickets-Wed-Nov-11-2026-Marquis-Theater-CO | - |
| tm-missio-2026-detroit-z7r9jz1aaziv8 | Missio | none | - | - | no qualifying listing (complete catalog checked) |
| tm-missio-2026-toronto-1avzz_8gklvsj7l | Missio | none | - | - | no qualifying listing (complete catalog checked) |
| tm-missio-2026-boston-vv177z_8gklypyp_ | Missio | none | - | - | no qualifying listing (complete catalog checked) |
| tm-missio-2026-portland-z7r9jz1aazivo | Missio | none | 8200534 | https://www.ticketliquidator.com/tickets/8200534/Missio-tickets-Thu-Dec-10-2026-Star-Theater-Portland | - |
| tm-missio-2026-seattle-z7r9jz1aaziv3 | Missio | none | 8200536 | https://www.ticketliquidator.com/tickets/8200536/Missio-tickets-Fri-Dec-11-2026-The-Funhouse-at-El-Corazon | - |
| tm-missio-2026-vancouver-z7r9jz1aaziv9 | Missio | none | 8200541 | https://www.ticketliquidator.com/tickets/8200541/Missio-tickets-Sat-Dec-12-2026-The-Pearl-BC | - |
| tm-missio-2026-spokane-z7r9jz1aazivk | Missio | none | 8200546 | https://www.ticketliquidator.com/tickets/8200546/Missio-tickets-Sun-Dec-13-2026-The-District-Bar-Spokane | - |
| tm-missio-2026-boise-z7r9jz1aazivf | Missio | none | 8200513 | https://www.ticketliquidator.com/tickets/8200513/Missio-tickets-Tue-Dec-15-2026-Knitting-Factory-Concert-House-Boise | - |
| tm-missio-2027-chicago-z7r9jz1aazivb | Missio | none | 8200547 | https://www.ticketliquidator.com/tickets/8200547/Missio-tickets-Wed-Jan-13-2027-Beat-Kitchen | - |
| tm-missio-2027-cudahy-z7r9jz1aaziv_ | Missio | none | 8200548 | https://www.ticketliquidator.com/tickets/8200548/Missio-tickets-Thu-Jan-14-2027-X-Ray-Arcade | - |
| tm-missio-2027-minneapolis-z7r9jz1aazivo | Missio | none | 8200549 | https://www.ticketliquidator.com/tickets/8200549/Missio-tickets-Fri-Jan-15-2027-Fine-Line-Music-Cafe | - |
| tm-missio-2027-cleveland-vv17fz_8gkl63cwa | Missio | none | 8200550 | https://www.ticketliquidator.com/tickets/8200550/Missio-tickets-Sun-Jan-17-2027-Cambridge-Room-At-The-House-Of-Blues-Cleveland | - |
| tm-missio-2027-washington-z7r9jz1aaziv- | Missio | none | 8200552 | https://www.ticketliquidator.com/tickets/8200552/Missio-tickets-Thu-Feb-11-2027-Union-Stage-DC | - |
| tm-missio-2027-brooklyn-z7r9jz1aazivx | Missio | none | 8200554 | https://www.ticketliquidator.com/tickets/8200554/Missio-tickets-Fri-Feb-12-2027-Market-Hotel-NY | - |
| tm-missio-2027-philadelphia-vv17fz_8gkn83pvw | Missio | none | 8200555 | https://www.ticketliquidator.com/tickets/8200555/Missio-tickets-Sat-Feb-13-2027-The-Foundry-Philadelphia | - |
| tm-missio-2027-carrboro-z7r9jz1aazivn | Missio | none | 8200515 | https://www.ticketliquidator.com/tickets/8200515/Missio-tickets-Wed-Mar-10-2027-Cats-Cradle | - |
| tm-missio-2027-atlanta-vvg1zz_8mbtifq | Missio | none | 8200559 | https://www.ticketliquidator.com/tickets/8200559/Missio-tickets-Thu-Mar-11-2027-The-Loft-Atlanta | - |
| tm-missio-2027-birmingham-z7r9jz1aazivp | Missio | none | - | - | no qualifying listing (complete catalog checked) |
| tm-missio-2027-nashville-z7r9jz1aazivj | Missio | none | 8200563 | https://www.ticketliquidator.com/tickets/8200563/Missio-tickets-Sun-Mar-14-2027-The-End-Nashville | - |
| tm-missio-2027-dallas-z7r9jz1aazive | Missio | none | 8200564 | https://www.ticketliquidator.com/tickets/8200564/Missio-tickets-Thu-Apr-8-2027-Puzzles-Deep-Ellum | - |
| tm-missio-2027-san-antonio-z7r9jz1aazivi | Missio | none | 8200566 | https://www.ticketliquidator.com/tickets/8200566/Missio-tickets-Fri-Apr-9-2027-The-Rock-Box-TX | - |
| tm-missio-2027-austin-z7r9jz1aazivt | Missio | none | 8200568 | https://www.ticketliquidator.com/tickets/8200568/Missio-tickets-Sat-Apr-10-2027-Come-and-Take-It-Live | - |
| tm-vnv-nation-2027-tampa-z7r9jz1a7jv8s | VNV Nation | none | - | - | no qualifying listing (complete catalog checked) |
| tm-vnv-nation-2027-atlanta-z7r9jz1a7jvoo | VNV Nation | none | 8099561 | https://www.ticketliquidator.com/tickets/8099561/VNV-Nation-tickets-Sun-Mar-14-2027-Variety-Playhouse | - |
| tm-vnv-nation-2027-salt-lake-city-z7r9jz1a7pmzg | VNV Nation | none | - | - | no qualifying listing (complete catalog checked) |
| tm-vnv-nation-2027-st-paul-z7r9jz1a7jzvu | VNV Nation | none | - | - | no qualifying listing (complete catalog checked) |
| tm-vnv-nation-2027-chicago-z7r9jz1a7pupm | VNV Nation | none | 7495772 | https://www.ticketliquidator.com/tickets/7495772/VNV-Nation-tickets-Thu-Apr-1-2027-Metro-Chicago | - |
| tm-michelle-branch-2026-boston-z7r9jz1a7j4zs | Michelle Branch | none | - | - | no qualifying listing (complete catalog checked) |
| tm-michelle-branch-2026-new-york-g5diz_uurkkpj | Michelle Branch | none | 8135353 | https://www.ticketliquidator.com/tickets/8135353/Michelle-Branch-tickets-Thu-Nov-5-2026-Beacon-Theatre-NY | - |
| tm-michelle-branch-2026-asbury-park-k7vgf_c7zp9vt | Michelle Branch | none | - | - | no qualifying listing (complete catalog checked) |
| tm-michelle-branch-2026-chicago-vvg18z_c6jmind | Michelle Branch | none | 8135378 | https://www.ticketliquidator.com/tickets/8135378/Michelle-Branch-tickets-Tue-Nov-10-2026-House-Of-Blues-Chicago | - |
| tm-michelle-branch-2026-minneapolis-z7r9jz1a7j3xd | Michelle Branch | none | 8135392 | https://www.ticketliquidator.com/tickets/8135392/Michelle-Branch-tickets-Wed-Nov-11-2026-First-Avenue | - |
| tm-michelle-branch-2026-milwaukee-z7r9jz1aazyfa | Michelle Branch | none | 8135393 | https://www.ticketliquidator.com/tickets/8135393/Michelle-Branch-tickets-Thu-Nov-12-2026-Pabst-Theater | - |
| tm-michelle-branch-2026-lexington-17aov0g6cdozqjd | Michelle Branch | none | 8135386 | https://www.ticketliquidator.com/tickets/8135386/Michelle-Branch-tickets-Fri-Nov-13-2026-Manchester-Music-Hall | - |
| tm-michelle-branch-2027-charleston-g5evz_8w8tpxk | Michelle Branch | none | - | - | no qualifying listing (complete catalog checked) |
| tm-michelle-branch-2027-atlanta-vvg1zz_8qvo7-q | Michelle Branch | none | - | - | no qualifying listing (complete catalog checked) |
| tm-michelle-branch-2027-dallas-vvg1yz_8by9itm | Michelle Branch | none | 8217761 | https://www.ticketliquidator.com/tickets/8217761/Michelle-Branch-tickets-Sat-Mar-6-2027-House-Of-Blues-Dallas | - |
| tm-michelle-branch-2027-houston-g5diz_8jaig6j | Michelle Branch | none | 8217762 | https://www.ticketliquidator.com/tickets/8217762/Michelle-Branch-tickets-Sun-Mar-7-2027-House-Of-Blues-Houston | - |
| tm-michelle-branch-2027-tempe-1av0z_8gkntcuaa | Michelle Branch | none | 8217763 | https://www.ticketliquidator.com/tickets/8217763/Michelle-Branch-tickets-Thu-Mar-11-2027-Marquee-Theatre-AZ | - |
| tm-michelle-branch-2027-anaheim-vv1aazkf6gkdxx2ly | Michelle Branch | none | 8217764 | https://www.ticketliquidator.com/tickets/8217764/Michelle-Branch-tickets-Fri-Mar-12-2027-House-Of-Blues-Anaheim | - |
| tm-michelle-branch-2027-los-angeles-vv170z_8gksjroc_ | Michelle Branch | none | 8217765 | https://www.ticketliquidator.com/tickets/8217765/Michelle-Branch-tickets-Sat-Mar-13-2027-The-Wiltern | - |
| tm-michelle-branch-2027-denver-z7r9jz1aavkbw | Michelle Branch | none | 8222814 | https://www.ticketliquidator.com/tickets/8222814/Michelle-Branch-tickets-Wed-Mar-17-2027-The-Mission-Ballroom | - |
| tm-michelle-branch-2027-saint-louis-vv17bz_8gknw__z8 | Michelle Branch | none | - | - | no qualifying listing (complete catalog checked) |
| tm-michelle-branch-2027-columbus-z7r9jz1aazmzz | Michelle Branch | none | 8220390 | https://www.ticketliquidator.com/tickets/8220390/Michelle-Branch-tickets-Sat-Mar-20-2027-KEMBA-Live | - |
| tm-michelle-branch-2027-royal-oak-z7r9jz1aazmje | Michelle Branch | none | 8220389 | https://www.ticketliquidator.com/tickets/8220389/Michelle-Branch-tickets-Sun-Mar-21-2027-Royal-Oak-Music-Theatre | - |
| tm-michelle-branch-2027-portland-vv177z_8gkm-dic1 | Michelle Branch | none | 8217768 | https://www.ticketliquidator.com/tickets/8217768/Michelle-Branch-tickets-Tue-Mar-23-2027-State-Theatre-ME | - |
| tm-michelle-branch-2027-new-york-g5diz_8xxfdpf | Michelle Branch | none | 8217769 | https://www.ticketliquidator.com/tickets/8217769/Michelle-Branch-tickets-Thu-Mar-25-2027-Beacon-Theatre-NY | - |
| tm-michelle-branch-2027-silver-spring-16vfz_809g7nt6o | Michelle Branch | none | 8217770 | https://www.ticketliquidator.com/tickets/8217770/Michelle-Branch-tickets-Fri-Mar-26-2027-The-Fillmore-Silver-Spring | - |
| tm-michelle-branch-2027-philadelphia-z7r9jz1aazyqb | Michelle Branch | none | 8219779 | https://www.ticketliquidator.com/tickets/8219779/Michelle-Branch-tickets-Sat-Mar-27-2027-Franklin-Music-Hall | - |
| tm-fkj-2026-london-g5vhz_g13mdtb | FKJ | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fkj-2026-london-g5vhz_g1bafoo | FKJ | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fkj-2027-portland-z7r9jz1a7pdgd | FKJ | none | 8012914 | https://www.ticketliquidator.com/tickets/8012914/FKJ-tickets-Tue-Apr-20-2027-McMenamins-Crystal-Ballroom | - |
| tm-fkj-2027-seattle-z7r9jz1a7pduz | FKJ | none | 8012969 | https://www.ticketliquidator.com/tickets/8012969/FKJ-tickets-Fri-Apr-23-2027-Showbox-SoDo | - |
| tm-fkj-2027-vancouver-1778v0g65j57kh7 | FKJ | none | 8012944 | https://www.ticketliquidator.com/tickets/8012944/FKJ-tickets-Sun-Apr-25-2027-Commodore-Ballroom | - |
| tm-fkj-2027-vancouver-1778v0g6g4hh0bi | FKJ | none | 8045995 | https://www.ticketliquidator.com/tickets/8045995/FKJ-tickets-Mon-Apr-26-2027-Commodore-Ballroom | - |
| tm-fkj-2027-denver-z7r9jz1a7pk0s | FKJ | none | 8012973 | https://www.ticketliquidator.com/tickets/8012973/FKJ-tickets-Thu-Apr-29-2027-The-Mission-Ballroom | - |
| tm-fkj-2027-chicago-vvg18z_5uyql9j | FKJ | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fkj-2027-toronto-177zv0g65u2nyx_ | FKJ | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fkj-2027-montreal-17g8v0g65rqmwty | FKJ | none | 8012965 | https://www.ticketliquidator.com/tickets/8012965/FKJ-tickets-Mon-May-31-2027-MTelus | - |
| tm-fkj-2027-boston-vvg17z_5ryet2j | FKJ | none | 8012958 | https://www.ticketliquidator.com/tickets/8012958/FKJ-tickets-Tue-Jun-1-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-fkj-2027-philadelphia-vvg1fz_5rrowhv | FKJ | none | 8012959 | https://www.ticketliquidator.com/tickets/8012959/FKJ-tickets-Thu-Jun-3-2027-The-Fillmore-Philadelphia | - |
| tm-fkj-2027-brooklyn-k7vgf_5rij1fj | FKJ | none | 8012960 | https://www.ticketliquidator.com/tickets/8012960/FKJ-tickets-Fri-Jun-4-2027-Brooklyn-Paramount | - |
| tm-fkj-2027-washington-17a8v0g65nnmzs3 | FKJ | none | 8012945 | https://www.ticketliquidator.com/tickets/8012945/FKJ-tickets-Mon-Jun-7-2027-The-Anthem-DC | - |
| tm-fkj-2027-atlanta-vvg1zz_59up5bx | FKJ | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fkj-2027-houston-g5diz_5msvufk | FKJ | none | 8012943 | https://www.ticketliquidator.com/tickets/8012943/FKJ-tickets-Fri-Jun-11-2027-Bayou-Music-Center | - |
| tm-fkj-2027-austin-z7r9jz1a7pdvn | FKJ | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fkj-2027-dallas-vvg1yz_5ry7uyw | FKJ | none | 8012963 | https://www.ticketliquidator.com/tickets/8012963/FKJ-tickets-Mon-Jun-14-2027-South-Side-Ballroom-at-Gilleys | - |
| tm-sylvan-esso-2027-seattle-vvg1hz_g92don0 | Sylvan Esso | none | 8043891 | https://www.ticketliquidator.com/tickets/8043891/Sylvan-Esso-tickets-Fri-Feb-19-2027-Paramount-Theatre-Seattle | - |
| tm-sylvan-esso-2027-vancouver-z7r9jz1a7pffp | Sylvan Esso | none | 8043820 | https://www.ticketliquidator.com/tickets/8043820/Sylvan-Esso-tickets-Sat-Feb-20-2027-Vogue-Theatre-BC | - |
| tm-sylvan-esso-2027-portland-z7r9jz1a7pf-d | Sylvan Esso | none | 8043821 | https://www.ticketliquidator.com/tickets/8043821/Sylvan-Esso-tickets-Mon-Feb-22-2027-McMenamins-Crystal-Ballroom | - |
| tm-sylvan-esso-2027-portland-z7r9jz1a7pf-7 | Sylvan Esso | none | 8043822 | https://www.ticketliquidator.com/tickets/8043822/Sylvan-Esso-tickets-Tue-Feb-23-2027-McMenamins-Crystal-Ballroom | - |
| tm-sylvan-esso-2027-oakland-g5vyz_gf0ezov | Sylvan Esso | none | 8042272 | https://www.ticketliquidator.com/tickets/8042272/Sylvan-Esso-tickets-Thu-Feb-25-2027-Fox-Theater-Oakland | - |
| tm-sylvan-esso-2027-los-angeles-vvg10z_gjuyprv | Sylvan Esso | none | 8042270 | https://www.ticketliquidator.com/tickets/8042270/Sylvan-Esso-tickets-Fri-Feb-26-2027-The-Wiltern | - |
| tm-sylvan-esso-2027-santa-ana-vvg10z_26gjjny | Sylvan Esso | none | 8152338 | https://www.ticketliquidator.com/tickets/8152338/Sylvan-Esso-tickets-Sat-Feb-27-2027-The-Observatory-Santa-Ana | - |
| tm-sylvan-esso-2027-del-mar-vvg1iz_g9535-x | Sylvan Esso | add (applied) | 8042799 | https://www.ticketliquidator.com/tickets/8042799/Sylvan-Esso-tickets-Mon-Mar-1-2027-The-Sound-At-The-Del-Mar-Fairgrounds | - |
| tm-sylvan-esso-2027-phoenix-17k8v0g6g3yxemg | Sylvan Esso | none | 8042806 | https://www.ticketliquidator.com/tickets/8042806/Sylvan-Esso-tickets-Tue-Mar-2-2027-The-Van-Buren | - |
| tm-sylvan-esso-2027-denver-z7r9jz1a7pf46 | Sylvan Esso | none | 8043797 | https://www.ticketliquidator.com/tickets/8043797/Sylvan-Esso-tickets-Fri-Mar-5-2027-Ogden-Theatre | - |
| tm-sylvan-esso-2027-denver-z7r9jz1a7pj-s | Sylvan Esso | none | 8062806 | https://www.ticketliquidator.com/tickets/8062806/Sylvan-Esso-tickets-Sat-Mar-6-2027-Ogden-Theatre | - |
| tm-sylvan-esso-2027-austin-z7r9jz1a7pxj7 | Sylvan Esso | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sylvan-esso-2027-dallas-vvg1yz_g8bdfye | Sylvan Esso | none | 8042813 | https://www.ticketliquidator.com/tickets/8042813/Sylvan-Esso-tickets-Tue-Mar-9-2027-House-Of-Blues-Dallas | - |
| tm-sylvan-esso-2027-birmingham-17fzv0g6gpo7w2j | Sylvan Esso | none | 8042820 | https://www.ticketliquidator.com/tickets/8042820/Sylvan-Esso-tickets-Fri-Mar-12-2027-Iron-City-Birmingham | - |
| tm-sylvan-esso-2027-nashville-g5viz_g3v82ae | Sylvan Esso | none | 8042832 | https://www.ticketliquidator.com/tickets/8042832/Sylvan-Esso-tickets-Sat-Mar-13-2027-Brooklyn-Bowl-Nashville | - |
| tm-blondshell-2026-amsterdam-z698xzbpz16evuaf-z | Blondshell | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blondshell-2026-manchester-g5dzz_anefaed | Blondshell | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blondshell-2026-glasgow-17uov0g616cnj6j | Blondshell | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blondshell-2026-london-g5vhz_adn7kja | Blondshell | none | - | - | no qualifying listing (complete catalog checked) |
| tm-pink-martini-2026-reno-17ayv0g651b0bey | Pink Martini | none | - | - | no qualifying listing (complete catalog checked) |
| tm-pink-martini-2026-redding-z7r9jz1a7ps3o | Pink Martini | none | - | - | no qualifying listing (complete catalog checked) |
| tm-pink-martini-2026-fairfax-z7r9jz1aazojt | Pink Martini | none | 8166331 | https://www.ticketliquidator.com/tickets/8166331/Pink-Martini-All-Stars-tickets-Thu-Dec-10-2026-George-Mason-Center-For-The-Arts-Concert-Hall | - |
| tm-pink-martini-2026-lebanon-z7r9jz1a7pwba | Pink Martini | none | 8087921 | https://www.ticketliquidator.com/tickets/8087921/Pink-Martini-All-Stars-tickets-Sat-Dec-12-2026-Lebanon-Opera-House | - |
| tm-pink-martini-2026-brooklyn-k7vgf_u53h-yh | Pink Martini | none | 8072032 | https://www.ticketliquidator.com/tickets/8072032/Pink-Martini-All-Stars-tickets-Sun-Dec-13-2026-Brooklyn-Paramount | - |
| tm-pink-martini-2026-philadelphia-z7r9jz1a70ppv | Pink Martini | none | - | - | no qualifying listing (complete catalog checked) |
| tm-pink-martini-2026-red-bank-g5vvz_gnt3jau | Pink Martini | none | 8072011 | https://www.ticketliquidator.com/tickets/8072011/Pink-Martini-All-Stars-tickets-Wed-Dec-16-2026-Hackensack-Meridian-Health-Theatre-at-the-Count-Basie-Center-for-the-Arts | - |
| tm-pink-martini-2026-boston-z7r9jz1a7psqp | Pink Martini | none | - | - | no qualifying listing (complete catalog checked) |
| tm-pink-martini-2027-fort-worth-z7r9jz1a7p6-z | Pink Martini | none | 7950714 | https://www.ticketliquidator.com/tickets/7950714/Pink-Martini-tickets-Fri-Jan-8-2027-Bass-Performance-Hall | - |
| tm-pink-martini-2027-jacksonville-z7r9jz1aazepf | Pink Martini | none | - | - | no qualifying listing (complete catalog checked) |
| tm-pink-martini-2027-ft-lauderdale-vvg1vz_asbh4yx | Pink Martini | none | - | - | no qualifying listing (complete catalog checked) |
| tm-pink-martini-2027-athens-z7r9jz1a7pv8_ | Pink Martini | none | - | - | no qualifying listing (complete catalog checked) |
| tm-pink-martini-2027-bellingham-z7r9jz1aazp-s | Pink Martini | none | 8043631 | https://www.ticketliquidator.com/tickets/8043631/Pink-Martini-tickets-Sun-Jan-24-2027-Mount-Baker-Theatre | - |
| tm-pink-martini-2027-cleveland-vvg1fz_uzuo2ng | Pink Martini | none | 8121295 | https://www.ticketliquidator.com/tickets/8121295/Pink-Martini-tickets-Wed-Feb-10-2027-Cleveland-Museum-of-Art-Gartner-Auditorium | - |
| tm-pink-martini-2027-cincinnati-z7r9jz1a7pp4b | Pink Martini | none | - | - | no qualifying listing (complete catalog checked) |
| tm-pink-martini-2027-chicago-z7r9jz1aaz6g7 | Pink Martini | none | - | - | no qualifying listing (complete catalog checked) |
| tm-pink-martini-2027-minneapolis-vv1akzkfagkes0irs | Pink Martini | none | 8194294 | https://www.ticketliquidator.com/tickets/8194294/Pink-Martini-tickets-Sat-Feb-13-2027-Pantages-Theatre-MN | - |
| tm-pink-martini-2027-minneapolis-vv1akzkfagkesphrg | Pink Martini | none | 8194295 | https://www.ticketliquidator.com/tickets/8194295/Pink-Martini-tickets-Sun-Feb-14-2027-Pantages-Theatre-MN | - |
| tm-pink-martini-2027-madison-vv1a6zkfagkec5a4v | Pink Martini | none | - | - | no qualifying listing (complete catalog checked) |
| tm-pink-martini-2027-colorado-springs-z7r9jz1aaztzk | Pink Martini | none | 8193669 | https://www.ticketliquidator.com/tickets/8193669/Pink-Martini-tickets-Fri-Mar-5-2027-Pikes-Peak-Center | - |
| tm-pink-martini-2027-colorado-springs-z7r9jz1a7joxz | Pink Martini | none | 8193668 | https://www.ticketliquidator.com/tickets/8193668/Pink-Martini-tickets-Sat-Mar-6-2027-Pikes-Peak-Center | - |
| tm-pink-martini-2027-toronto-177zv0g65s2z1n6 | Pink Martini | none | - | - | no qualifying listing (complete catalog checked) |
| tm-pink-martini-2027-quebec-17g8v0g61ihh8sg | Pink Martini | none | 8173902 | https://www.ticketliquidator.com/tickets/8173902/Pink-Martini-tickets-Thu-Mar-18-2027-Le-Theatre-Capitole | - |
| tm-pink-martini-2027-houston-g5diz_8uc2ajn | Pink Martini | none | 8223615 | https://www.ticketliquidator.com/tickets/8223615/Pink-Martini-All-Stars-tickets-Thu-Mar-25-2027-Sarofim-Hall-Hobby-Center | - |
| tm-harry-styles-2026-docklands-1apzk8ugkd2sm8u | Harry Styles | none | - | - | no qualifying listing (complete catalog checked) |
| tm-harry-styles-2026-docklands-16efz_dckg7slsc | Harry Styles | none | - | - | no qualifying listing (complete catalog checked) |
| tm-harry-styles-2026-docklands-1apzk8ugkd2mxoc | Harry Styles | none | - | - | no qualifying listing (complete catalog checked) |
| tm-harry-styles-2026-docklands-1apzk8ugkd2broi | Harry Styles | none | - | - | no qualifying listing (complete catalog checked) |
| tm-harry-styles-2026-sydney-olympic-park-1ka8v0ukgagf72c | Harry Styles | none | 7695899 | https://www.ticketliquidator.com/tickets/7695899/Harry-Styles-tickets-Sat-Dec-12-2026-Accor-Stadium | - |
| tm-harry-styles-2026-sydney-olympic-park-1apzk8ugkdafgq9 | Harry Styles | none | 7695900 | https://www.ticketliquidator.com/tickets/7695900/Harry-Styles-tickets-Sun-Dec-13-2026-Accor-Stadium | - |
| tm-harry-styles-2027-pasadena-vvg1iz_3npi4df | Harry Styles | none | 8257680 | https://www.ticketliquidator.com/tickets/8257680/Harry-Styles-tickets-Fri-Apr-23-2027-Rose-Bowl-Stadium-Pasadena | - |
| tm-harry-styles-2027-pasadena-vvg1iz_3ntnu7b | Harry Styles | none | 8257681 | https://www.ticketliquidator.com/tickets/8257681/Harry-Styles-tickets-Sat-Apr-24-2027-Rose-Bowl-Stadium-Pasadena | - |
| tm-harry-styles-2027-toronto-1a8zkftgkdpce50 | Harry Styles | none | - | - | no qualifying listing (complete catalog checked) |
| tm-harry-styles-2027-toronto-1a8zkftanayze5g | Harry Styles | none | - | - | no qualifying listing (complete catalog checked) |
| tm-harry-styles-2027-atlanta-vvg1zz_3nnlppu | Harry Styles | none | 8257684 | https://www.ticketliquidator.com/tickets/8257684/Harry-Styles-tickets-Fri-May-21-2027-Mercedes-Benz-Stadium | - |
| tm-harry-styles-2027-atlanta-vvg1zz_3ef8eqn | Harry Styles | none | 8257685 | https://www.ticketliquidator.com/tickets/8257685/Harry-Styles-tickets-Sat-May-22-2027-Mercedes-Benz-Stadium | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdrmtch | Harry Styles | none | 8257686 | https://www.ticketliquidator.com/tickets/8257686/Harry-Styles-tickets-Fri-May-28-2027-Soldier-Field | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdgsgdj | Harry Styles | none | 8257687 | https://www.ticketliquidator.com/tickets/8257687/Harry-Styles-tickets-Sat-May-29-2027-Soldier-Field | - |
| tm-harry-styles-2027-madrid-z698xz2qz16v0sptae | Harry Styles | none | - | - | no qualifying listing (complete catalog checked) |
| tm-harry-styles-2027-madrid-z698xz2qz16v8zj448 | Harry Styles | none | - | - | no qualifying listing (complete catalog checked) |
| tm-harry-styles-2027-dublin-1abzkftgkexalp_ | Harry Styles | none | - | - | no qualifying listing (complete catalog checked) |
| tm-harry-styles-2027-dublin-1avoz_3gkn1nb3y | Harry Styles | none | - | - | no qualifying listing (complete catalog checked) |
| tm-harry-styles-2027-london-1aegz_8gkdalwdz | Harry Styles | none | 8257655 | https://www.ticketliquidator.com/tickets/8257655/Harry-Styles-tickets-Wed-Aug-25-2027-Wembley-Stadium | - |
| tm-harry-styles-2027-london-1anzkfigkew9djd | Harry Styles | none | 8257656 | https://www.ticketliquidator.com/tickets/8257656/Harry-Styles-tickets-Fri-Aug-27-2027-Wembley-Stadium | - |
| tm-harry-styles-2027-london-1anzkfigkeycdjb | Harry Styles | none | 8257657 | https://www.ticketliquidator.com/tickets/8257657/Harry-Styles-tickets-Sat-Aug-28-2027-Wembley-Stadium | - |
| tm-bts-2027-docklands-17a8v0g65r_eq8g | BTS | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bts-2027-docklands-17a8v0g659_gumr | BTS | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bts-2027-docklands-17a8v0g65r_ew8m | BTS | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bts-2027-sydney-olympic-park-17a8v0g65qfkdo_ | BTS | none | 8090606 | https://www.ticketliquidator.com/tickets/8090606/BTS-tickets-Sat-Feb-20-2027-Accor-Stadium | - |
| tm-bts-2027-sydney-olympic-park-17a8v0g65qfik-s | BTS | none | 8090607 | https://www.ticketliquidator.com/tickets/8090607/BTS-tickets-Sun-Feb-21-2027-Accor-Stadium | - |
| tm-bruno-mars-2027-burswood-1apzkfbgkdn2ves | Bruno Mars | none | 8245500 | https://www.ticketliquidator.com/tickets/8245500/Bruno-Mars-tickets-Sat-Feb-13-2027-Optus-Stadium | - |
| tm-bruno-mars-2027-burswood-1aefz_ogklrp4vu | Bruno Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bruno-mars-2027-docklands-1aefz_o37vvzdckk | Bruno Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bruno-mars-2027-docklands-1aefz_ogknww0xk | Bruno Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bruno-mars-2027-docklands-1aefz_ogknwx7x5 | Bruno Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bruno-mars-2027-docklands-1aefz_ogknwx0x2 | Bruno Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bruno-mars-2027-milton-1akzkf3gkdacg5v | Bruno Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bruno-mars-2027-milton-1avgz_ogklamkhm | Bruno Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bruno-mars-2027-sydney-olympic-park-1aefz_o3ezszduv6 | Bruno Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bruno-mars-2027-sydney-olympic-park-1aefz_ogknavvld | Bruno Mars | none | 8264032 | https://www.ticketliquidator.com/tickets/8264032/Bruno-Mars-tickets-Fri-Mar-5-2027-Accor-Stadium | - |
| tm-bruno-mars-2027-sydney-olympic-park-1aefz_ogknaxvi7 | Bruno Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bruno-mars-2027-sydney-olympic-park-1aefz_ogknaxoik | Bruno Mars | none | 8264033 | https://www.ticketliquidator.com/tickets/8264033/Bruno-Mars-tickets-Tue-Mar-9-2027-Accor-Stadium | - |
| tm-gracie-abrams-2027-dublin-17kzv0g65nd0zys | Gracie Abrams | none | 8018182 | https://www.ticketliquidator.com/tickets/8018182/Gracie-Abrams-tickets-Mon-Apr-19-2027-3Arena-Dublin | - |
| tm-gracie-abrams-2027-dublin-17kzv0g65ndpfyh | Gracie Abrams | none | 8018183 | https://www.ticketliquidator.com/tickets/8018183/Gracie-Abrams-tickets-Tue-Apr-20-2027-3Arena-Dublin | - |
| tm-niall-horan-2026-dublin-1avoz_6rofpzd5ed | Niall Horan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-niall-horan-2026-dublin-1avoz_6rofjzd576 | Niall Horan | none | 7902927 | https://www.ticketliquidator.com/tickets/7902927/Niall-Horan-tickets-Fri-Nov-13-2026-3Arena-Dublin | - |
| tm-sombr-2027-co-dublin-1abzkf4gkd83jcw | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sombr-2027-belfast-16doz_oxfg7tv55 | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-teddy-swims-2027-dublin-17kzv0g626ngihj | Teddy Swims | none | 8167532 | https://www.ticketliquidator.com/tickets/8167532/Teddy-Swims-tickets-Thu-Apr-8-2027-3Arena-Dublin | - |
| tm-five-finger-death-punch-2027-dublin-1avoz_fgkbmo2st | Five Finger Death Punch | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nothing-but-thieves-2027-dublin-17kzv0g654xs6b3 | Nothing But Thieves | none | - | - | no qualifying listing (complete catalog checked) |
| tm-trivium-2027-dublin-1abzkffgkdvsqon | Trivium | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sabaton-2027-dublin-17kzv0g6g1kowuo | Sabaton | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beartooth-2027-torrensville-177yv0g61te6f3g | Beartooth | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beartooth-2027-west-melbourne-177yv0g61tqsnpg | Beartooth | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beartooth-2027-brisbane-177yv0g61drwqfa | Beartooth | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stella-lefty-2027-dublin-1avoz_8gkr5muwq | Stella Lefty | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stella-lefty-2027-dublin-1avoz_8gkr5mcw- | Stella Lefty | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tobymac-2027-fayetteville-g5evz_ojlfi-_ | TobyMac | none | 8239058 | https://www.ticketliquidator.com/tickets/8239058/TobyMac-tickets-Thu-Jan-28-2027-Crown-Coliseum-The-Crown-Center | - |
| tm-tobymac-2027-lexington-1apzkfbgker-a4j | TobyMac | none | 8239059 | https://www.ticketliquidator.com/tickets/8239059/TobyMac-tickets-Fri-Jan-29-2027-Rupp-Arena-At-Central-Bank-Center | - |
| tm-tobymac-2027-huntsville-1aozkfbgkdezfqd | TobyMac | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tobymac-2027-lafayette-g5viz_2bfz904 | TobyMac | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tobymac-2027-tampa-vvg1vz_oe_5n5h | TobyMac | none | 8239062 | https://www.ticketliquidator.com/tickets/8239062/TobyMac-tickets-Thu-Feb-4-2027-Benchmark-International-Arena | - |
| tm-tobymac-2027-sunrise-z7r9jz1aav8xe | TobyMac | none | 8239108 | https://www.ticketliquidator.com/tickets/8239108/TobyMac-tickets-Fri-Feb-5-2027-Amerant-Bank-Arena | - |
| tm-tobymac-2027-orlando-1axzkf_gkdtkgpv | TobyMac | none | 8239066 | https://www.ticketliquidator.com/tickets/8239066/TobyMac-tickets-Sat-Feb-6-2027-Kia-Center | - |
| tm-tobymac-2027-estero-vvg1vz_onusnh8 | TobyMac | none | 8239067 | https://www.ticketliquidator.com/tickets/8239067/TobyMac-tickets-Sun-Feb-7-2027-Hertz-Arena | - |
| tm-tobymac-2027-pensacola-g5viz_o9zokbz | TobyMac | none | 8239087 | https://www.ticketliquidator.com/tickets/8239087/TobyMac-tickets-Thu-Feb-11-2027-Pensacola-Bay-Center | - |
| tm-tobymac-2027-sugar-land-z7r9jz1aav8op | TobyMac | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tobymac-2027-grand-prairie-z7r9jz1aav8of | TobyMac | none | 8239110 | https://www.ticketliquidator.com/tickets/8239110/TobyMac-tickets-Sat-Feb-13-2027-Texas-Trust-CU-Theatre-at-Grand-Prairie | - |
| tm-tobymac-2027-columbus-vv1aazkfbgkdjr-4o | TobyMac | none | 8239088 | https://www.ticketliquidator.com/tickets/8239088/TobyMac-tickets-Thu-Feb-18-2027-Nationwide-Arena | - |
| tm-tobymac-2027-norfolk-z7r9jz1aav8r3 | TobyMac | none | 8239111 | https://www.ticketliquidator.com/tickets/8239111/TobyMac-tickets-Sun-Feb-21-2027-Chartway-Arena-at-Ted-Constant-Convocation-Center | - |
| tm-tobymac-2027-jacksonville-1axzkf_gkdts4j7 | TobyMac | none | 8239091 | https://www.ticketliquidator.com/tickets/8239091/TobyMac-tickets-Thu-Feb-25-2027-VyStar-Veterans-Memorial-Arena | - |
| tm-tobymac-2027-nashville-g5viz_oeqedtw | TobyMac | none | 8239092 | https://www.ticketliquidator.com/tickets/8239092/TobyMac-tickets-Fri-Feb-26-2027-Bridgestone-Arena | - |
| tm-tobymac-2027-duluth-vvg1zz_oxyi5ps | TobyMac | none | 8239093 | https://www.ticketliquidator.com/tickets/8239093/TobyMac-tickets-Sat-Feb-27-2027-Gas-South-Arena | - |
| tm-tobymac-2027-knoxville-g5viz_oeoyvqw | TobyMac | none | 8239094 | https://www.ticketliquidator.com/tickets/8239094/TobyMac-tickets-Sun-Feb-28-2027-Thompson-Boling-Arena-at-Food-City-Center | - |
| tm-tobymac-2027-toledo-vv1afzkf_gkeg66aj | TobyMac | none | 8239097 | https://www.ticketliquidator.com/tickets/8239097/TobyMac-tickets-Thu-Mar-4-2027-Huntington-Center | - |
| tm-tobymac-2027-fishers-vv1aazkf4gkdkqmmm | TobyMac | none | 8239099 | https://www.ticketliquidator.com/tickets/8239099/TobyMac-tickets-Fri-Mar-5-2027-Fishers-Event-Center | - |
| tm-tobymac-2027-cape-girardeau-z7r9jz1aav8-f | TobyMac | none | 8239112 | https://www.ticketliquidator.com/tickets/8239112/TobyMac-tickets-Sat-Mar-6-2027-Show-Me-Center | - |
| tm-tobymac-2027-grand-rapids-vv1afzkfbgkdx_n_v | TobyMac | none | 8239100 | https://www.ticketliquidator.com/tickets/8239100/TobyMac-tickets-Sun-Mar-7-2027-Van-Andel-Arena | - |
| tm-tobymac-2027-austin-g5diz_oelxrxd | TobyMac | none | 8239102 | https://www.ticketliquidator.com/tickets/8239102/TobyMac-tickets-Thu-Mar-11-2027-Moody-Center-ATX | - |
| tm-tobymac-2027-lubbock-z7r9jz1aav8o_ | TobyMac | none | 8239113 | https://www.ticketliquidator.com/tickets/8239113/TobyMac-tickets-Sat-Mar-13-2027-United-Supermarkets-Arena | - |
| tm-tobymac-2027-rockford-vv1a7zkfpgkdtiktq | TobyMac | none | 8238872 | https://www.ticketliquidator.com/tickets/8238872/TobyMac-tickets-Fri-Mar-19-2027-BMO-Center-Rockford | - |
| tm-tobymac-2027-saint-louis-vv1akzkf_gkdu8agp | TobyMac | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2026-dublin-17kzv0g6c1fpluo | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fkj-2027-brisbane-177yv0g6ckieecd | FKJ | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blondshell-2026-dublin-1avoz_agkwt8mru | Blondshell | none | - | - | no qualifying listing (complete catalog checked) |
| tm-michelle-branch-2027-nashville-z7r9jz1aazma_ | Michelle Branch | none | 8220717 | https://www.ticketliquidator.com/tickets/8220717/Michelle-Branch-tickets-Sat-Feb-27-2027-Ryman-Auditorium | - |
| tm-michelle-branch-2027-nashville-z7r9jz1aazyfg | Michelle Branch | none | 8225387 | https://www.ticketliquidator.com/tickets/8225387/Michelle-Branch-tickets-Sun-Feb-28-2027-Ryman-Auditorium | - |
| tm-yuridia-2027-seattle-vvg1hz_36ea3aq | Yuridia | none | 8252886 | https://www.ticketliquidator.com/tickets/8252886/Yuridia-tickets-Thu-Feb-4-2027-Paramount-Theatre-Seattle | - |
| tm-yuridia-2027-reno-1a9zkf0gkdps324 | Yuridia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-yuridia-2027-san-jose-g5vyz_oxvxyml | Yuridia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-yuridia-2027-palm-desert-vvg1iz_35qkx8b | Yuridia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-yuridia-2027-phoenix-1a_zkfxgkecvpec | Yuridia | none | 8252897 | https://www.ticketliquidator.com/tickets/8252897/Yuridia-tickets-Sat-Feb-13-2027-Arizona-Financial-Theatre | - |
| tm-yuridia-2027-highland-z7r9jz1aav-j_ | Yuridia | none | 8255474 | https://www.ticketliquidator.com/tickets/8255474/Yuridia-tickets-Wed-Feb-17-2027-Yaamava-Theater-at-Yaamava-Resort-Casino | - |
| tm-yuridia-2027-las-vegas-1ayzkfngkdql5vb | Yuridia | none | 8252899 | https://www.ticketliquidator.com/tickets/8252899/Yuridia-tickets-Thu-Feb-18-2027-PH-Live-At-Planet-Hollywood | - |
| tm-yuridia-2027-inglewood-vvg1iz_3kmopkh | Yuridia | none | 8252903 | https://www.ticketliquidator.com/tickets/8252903/Yuridia-tickets-Sat-Feb-20-2027-YouTube-Theater-at-Hollywood-Park | - |
| tm-yuridia-2027-inglewood-vvg1iz_33c4njl | Yuridia | none | 8259518 | https://www.ticketliquidator.com/tickets/8259518/Yuridia-tickets-Sun-Feb-21-2027-YouTube-Theater-at-Hollywood-Park | - |
| tm-yuridia-2027-fresno-g5vyz_35vhmjx | Yuridia | none | 8252904 | https://www.ticketliquidator.com/tickets/8252904/Yuridia-tickets-Thu-Feb-25-2027-Save-Mart-Center | - |
| tm-yuridia-2027-wheatland-g5vyz_32kawxi | Yuridia | none | 8252906 | https://www.ticketliquidator.com/tickets/8252906/Yuridia-tickets-Sat-Feb-27-2027-Hard-Rock-Live-Sacramento | - |
| tm-yuridia-2027-san-diego-vvg1iz_3fqrwdv | Yuridia | none | 8252908 | https://www.ticketliquidator.com/tickets/8252908/Yuridia-tickets-Sun-Feb-28-2027-Viejas-Arena-At-Aztec-Bowl | - |
| tm-yuridia-2027-dallas-vvg1yz_32hm5d6 | Yuridia | none | 8252911 | https://www.ticketliquidator.com/tickets/8252911/Yuridia-tickets-Fri-Mar-12-2027-Dos-Equis-Pavilion | - |
| tm-yuridia-2027-el-paso-vvg1yz_3ggzxqt | Yuridia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-yuridia-2027-laredo-g5diz_3f66dhn | Yuridia | none | 8252914 | https://www.ticketliquidator.com/tickets/8252914/Yuridia-tickets-Thu-Mar-18-2027-Sames-Auto-Arena | - |
| tm-yuridia-2027-rosemont-vv1a7zkf0gkenyiy- | Yuridia | none | 8259597 | https://www.ticketliquidator.com/tickets/8259597/Yuridia-tickets-Thu-Mar-25-2027-Rosemont-Theatre | - |
| tm-yuridia-2027-national-harbor-1a4zkfxgkelii5v | Yuridia | none | 8252920 | https://www.ticketliquidator.com/tickets/8252920/Yuridia-tickets-Sun-Mar-28-2027-The-Theater-at-MGM-National-Harbor | - |
| tm-fkj-2027-salt-lake-city-z7r9jz1a7pk0m | FKJ | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sylvan-esso-2027-salt-lake-city-z7r9jz1a7pxjk | Sylvan Esso | none | - | - | no qualifying listing (complete catalog checked) |
| tm-harry-styles-2027-dublin-1avoz_3gklibgmq | Harry Styles | none | - | - | no qualifying listing (complete catalog checked) |
| tm-harry-styles-2027-arlington-z7r9jz1aavp49 | Harry Styles | none | 8257671 | https://www.ticketliquidator.com/tickets/8257671/Harry-Styles-tickets-Fri-Apr-9-2027-ATT-Stadium | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavp4p | Harry Styles | none | 8257672 | https://www.ticketliquidator.com/tickets/8257672/Harry-Styles-tickets-Sat-Apr-10-2027-ATT-Stadium | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavsoa | Harry Styles | none | 8266038 | https://www.ticketliquidator.com/tickets/8266038/Harry-Styles-tickets-Fri-Apr-16-2027-ATT-Stadium | - |
| tm-harry-styles-2027-pasadena-vvg1iz_3bgqfli | Harry Styles | none | 8266437 | https://www.ticketliquidator.com/tickets/8266437/Harry-Styles-tickets-Fri-Apr-30-2027-Rose-Bowl-Stadium-Pasadena | - |
| tm-harry-styles-2027-pasadena-vvg1iz_3bg-0lz | Harry Styles | none | 8266438 | https://www.ticketliquidator.com/tickets/8266438/Harry-Styles-tickets-Sat-May-1-2027-Rose-Bowl-Stadium-Pasadena | - |
| tm-harry-styles-2027-toronto-1avzz_3gkzqzh13 | Harry Styles | none | - | - | no qualifying listing (complete catalog checked) |
| tm-harry-styles-2027-toronto-1avzz_3gkzqbl5d | Harry Styles | none | - | - | no qualifying listing (complete catalog checked) |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdbxpoy | Harry Styles | none | 8265970 | https://www.ticketliquidator.com/tickets/8265970/Harry-Styles-tickets-Fri-Jun-4-2027-Soldier-Field | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdwejgw | Harry Styles | none | 8265969 | https://www.ticketliquidator.com/tickets/8265969/Harry-Styles-tickets-Sat-Jun-5-2027-Soldier-Field | - |
| tm-harry-styles-2027-madrid-z698xz2qz1ko4op48 | Harry Styles | none | - | - | no qualifying listing (complete catalog checked) |
| tm-harry-styles-2027-arlington-z7r9jz1aavszi | Harry Styles | none | 8268342 | https://www.ticketliquidator.com/tickets/8268342/Harry-Styles-tickets-Wed-Apr-14-2027-ATT-Stadium | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavw00 | Harry Styles | none | 8267109 | https://www.ticketliquidator.com/tickets/8267109/Harry-Styles-tickets-Sat-Apr-17-2027-ATT-Stadium | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdxye23 | Harry Styles | none | 8267110 | https://www.ticketliquidator.com/tickets/8267110/Harry-Styles-tickets-Mon-May-31-2027-Soldier-Field | - |
| tm-charli-xcx-2027-dublin-16voz_3jvg7sk3f | Charli xcx | none | - | - | no qualifying listing (complete catalog checked) |
| tm-charli-xcx-2027-glasgow-1auzkftgkez7jxt | Charli xcx | none | 8267812 | https://www.ticketliquidator.com/tickets/8267812/Brandi-Carlile-tickets-Mon-Feb-15-2027-OVO-Hydro | - |
| tm-charli-xcx-2027-manchester-1amzkfegkdf5asp | Charli xcx | none | 8259353 | https://www.ticketliquidator.com/tickets/8259353/Brandi-Carlile-tickets-Wed-Feb-17-2027-Co-Op-Live | - |
| tm-charli-xcx-2027-london-1agzkfigkenre1t | Charli xcx | none | - | - | no qualifying listing (complete catalog checked) |
| tm-charli-xcx-2027-london-1adfz_3gknni7-u | Charli xcx | none | - | - | no qualifying listing (complete catalog checked) |
| tm-charli-xcx-2027-amsterdam-z698xzbpz1kqn76of | Charli xcx | none | 8267859 | https://www.ticketliquidator.com/tickets/8267859/Brandi-Carlile-tickets-Mon-Feb-22-2027-Ziggo-Dome | - |
| tm-blue-october-2027-saint-louis-1ae7z_3gkiei5ox | Blue October | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stella-lefty-2026-saint-louis-1a-zkfxgkegfvfo | Stella Lefty | none | - | - | no qualifying listing (complete catalog checked) |
| tm-andrea-bocelli-2027-charlotte-g5evz_8mutuyo | Andrea Bocelli | none | 8258124 | https://www.ticketliquidator.com/tickets/8258124/Andrea-Bocelli-tickets-Fri-Jan-29-2027-Spectrum-Center | - |
| tm-andrea-bocelli-2027-baltimore-1a4zkffgkepsf12 | Andrea Bocelli | none | 8258125 | https://www.ticketliquidator.com/tickets/8258125/Andrea-Bocelli-tickets-Sun-Jan-31-2027-CFG-Bank-Arena | - |
| tm-andrea-bocelli-2027-atlanta-vvg1zz_36bbobm | Andrea Bocelli | none | 8258126 | https://www.ticketliquidator.com/tickets/8258126/Andrea-Bocelli-tickets-Tue-Feb-2-2027-State-Farm-Arena-GA | - |
| tm-andrea-bocelli-2027-austin-g5diz_3kpl_-e | Andrea Bocelli | none | 8258127 | https://www.ticketliquidator.com/tickets/8258127/Andrea-Bocelli-tickets-Thu-Feb-4-2027-Moody-Center-ATX | - |
| tm-andrea-bocelli-2027-dallas-vvg1yz_33_tj3c | Andrea Bocelli | none | 8258128 | https://www.ticketliquidator.com/tickets/8258128/Andrea-Bocelli-tickets-Fri-Feb-5-2027-American-Airlines-Center | - |
| tm-andrea-bocelli-2027-houston-z7r9jz1aavs_v | Andrea Bocelli | none | 8265103 | https://www.ticketliquidator.com/tickets/8265103/Andrea-Bocelli-tickets-Sun-Feb-7-2027-Toyota-Center-TX | - |
| tm-andrea-bocelli-2027-orlando-1axzkfigkdrsgpw | Andrea Bocelli | none | 8258129 | https://www.ticketliquidator.com/tickets/8258129/Andrea-Bocelli-tickets-Wed-Feb-10-2027-Kia-Center | - |
| tm-andrea-bocelli-2027-hollywood-vvg1vz_3nv0vjm | Andrea Bocelli | none | 8258130 | https://www.ticketliquidator.com/tickets/8258130/Andrea-Bocelli-tickets-Fri-Feb-12-2027-Hard-Rock-Live-At-The-Seminole-Hard-Rock-Hotel-Casino-Hollywood | - |
| tm-andrea-bocelli-2027-hollywood-vvg1vz_3ervkx7 | Andrea Bocelli | none | 8258131 | https://www.ticketliquidator.com/tickets/8258131/Andrea-Bocelli-tickets-Sat-Feb-13-2027-Hard-Rock-Live-At-The-Seminole-Hard-Rock-Hotel-Casino-Hollywood | - |
| tm-tobymac-2027-fairfax-1a4zkf_gkd7dmjf | TobyMac | none | 8239089 | https://www.ticketliquidator.com/tickets/8239089/TobyMac-tickets-Fri-Feb-19-2027-EagleBank-Arena | - |
| tm-tobymac-2027-fairfax-1a4zkf_gkdgvwvn | TobyMac | none | 8239090 | https://www.ticketliquidator.com/tickets/8239090/TobyMac-tickets-Sat-Feb-20-2027-EagleBank-Arena | - |
| tm-tobymac-2027-san-antonio-g5diz_olf8jri | TobyMac | none | 8239103 | https://www.ticketliquidator.com/tickets/8239103/TobyMac-tickets-Fri-Mar-12-2027-Freeman-Coliseum | - |
| tm-tobymac-2027-fargo-vv1akzkf_gkd8vyo- | TobyMac | none | 8239104 | https://www.ticketliquidator.com/tickets/8239104/TobyMac-tickets-Wed-Mar-17-2027-Fargodome | - |
| tm-tobymac-2027-tulsa-1aozkf_gkdn-dht | TobyMac | none | 8239106 | https://www.ticketliquidator.com/tickets/8239106/TobyMac-tickets-Sun-Mar-21-2027-BOK-Center | - |
| tm-fkj-2027-new-orleans-z7r9jz1a7pd1a | FKJ | none | 8012974 | https://www.ticketliquidator.com/tickets/8012974/FKJ-tickets-Thu-Jun-10-2027-Saenger-Theatre-New-Orleans | - |
| tm-trans-siberian-orchestra-2026-green-bay-z7r9jz1aavxjs | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-council-bluffs-vv17bz_8gkr7r5-j | Trans-Siberian Orchestra | none | 8255034 | https://www.ticketliquidator.com/tickets/8255034/Trans-Siberian-Orchestra-tickets-Thu-Nov-19-2026-Mid-America-Center | - |
| tm-trans-siberian-orchestra-2026-cincinnati-1apzkffgkdggxqt | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-denver-g5vzz_o66yljp | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-youngstown-vv1aazkfagkd2zwpt | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-salt-lake-city-z7r9jz1aavpc_ | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-wilkes-barre-vv17fz_8gku2vdcc | Trans-Siberian Orchestra | none | 8255046 | https://www.ticketliquidator.com/tickets/8255046/Trans-Siberian-Orchestra-tickets-Tue-Nov-24-2026-Mohegan-Arena-at-Casey-Plaza | - |
| tm-trans-siberian-orchestra-2026-manchester-vv1avzkffgkecconl | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-boise-g5vzz_8l3-m4c | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-worcester-vv1avzkf7gkd6__c- | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-portland-vvg1hz_8rkn5r8 | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-uncasville-g5vvz_8ebyjdo | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-seattle-vvg1hz_8bxdfpp | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-sacramento-g5vyz_8hivhsq | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-nashville-g5viz_oinlsr4 | Trans-Siberian Orchestra | none | 8255062 | https://www.ticketliquidator.com/tickets/8255062/Trans-Siberian-Orchestra-tickets-Wed-Dec-2-2026-Bridgestone-Arena | - |
| tm-trans-siberian-orchestra-2026-charleston-1avbz_8gkwouueg | Trans-Siberian Orchestra | none | 8255063 | https://www.ticketliquidator.com/tickets/8255063/Trans-Siberian-Orchestra-tickets-Thu-Dec-3-2026-Charleston-Coliseum-Convention-Center-Charleston | - |
| tm-trans-siberian-orchestra-2026-fresno-g5vyz_o5rjusr | Trans-Siberian Orchestra | none | 8255064 | https://www.ticketliquidator.com/tickets/8255064/Trans-Siberian-Orchestra-tickets-Thu-Dec-3-2026-Save-Mart-Center | - |
| tm-trans-siberian-orchestra-2026-toledo-vv1kezvpv_gacwg13 | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-columbus-vv17fz_8gkuihkxu | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-ontario-z7r9jz1aav08p | Trans-Siberian Orchestra | none | - | - | no qualifying listing (complete catalog checked) |
| tm-trans-siberian-orchestra-2026-grand-rapids-vv17oz_8gksfqipn | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-phoenix-1av0z_8gks2uk5t | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-allentown-17gzv0g62dv8e6s | Trans-Siberian Orchestra | none | 8255080 | https://www.ticketliquidator.com/tickets/8255080/Trans-Siberian-Orchestra-tickets-Wed-Dec-9-2026-PPL-Center | - |
| tm-trans-siberian-orchestra-2026-austin-g5diz_od7g9c0 | Trans-Siberian Orchestra | none | 8255081 | https://www.ticketliquidator.com/tickets/8255081/Trans-Siberian-Orchestra-tickets-Wed-Dec-9-2026-Moody-Center-ATX | - |
| tm-trans-siberian-orchestra-2026-raleigh-g5evz_2wee5m0 | Trans-Siberian Orchestra | none | 8255082 | https://www.ticketliquidator.com/tickets/8255082/Trans-Siberian-Orchestra-tickets-Thu-Dec-10-2026-Lenovo-Center | - |
| tm-trans-siberian-orchestra-2026-bossier-city-g5viz_8b0hcmp | Trans-Siberian Orchestra | none | 8255084 | https://www.ticketliquidator.com/tickets/8255084/Trans-Siberian-Orchestra-tickets-Thu-Dec-10-2026-Brookshire-Grocery-Arena | - |
| tm-trans-siberian-orchestra-2026-greenville-g5evz_o2s2bkg | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-houston-z7r9jz1aavnas | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-charlotte-g5evz_o6l3kkc | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-san-antonio-g5diz_8q4vky5 | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-duluth-vvg1zz_8rk7fyq | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-dallas-vvg1yz_8bgba0q | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-charlottesville-vv177z_ogksqlpte | Trans-Siberian Orchestra | none | 8255100 | https://www.ticketliquidator.com/tickets/8255100/Trans-Siberian-Orchestra-tickets-Wed-Dec-16-2026-John-Paul-Jones-Arena | - |
| tm-trans-siberian-orchestra-2026-birmingham-1aezz_ockcvzdcau | Trans-Siberian Orchestra | none | 8255101 | https://www.ticketliquidator.com/tickets/8255101/Trans-Siberian-Orchestra-tickets-Wed-Dec-16-2026-Legacy-Arena-at-The-BJCC | - |
| tm-trans-siberian-orchestra-2026-jacksonville-1aefz_ogkwzigon | Trans-Siberian Orchestra | none | 8255102 | https://www.ticketliquidator.com/tickets/8255102/Trans-Siberian-Orchestra-tickets-Thu-Dec-17-2026-VyStar-Veterans-Memorial-Arena | - |
| tm-trans-siberian-orchestra-2026-albany-k7vgf_8uqsipg | Trans-Siberian Orchestra | none | 8255103 | https://www.ticketliquidator.com/tickets/8255103/Trans-Siberian-Orchestra-tickets-Thu-Dec-17-2026-MVP-Arena | - |
| tm-trans-siberian-orchestra-2026-hershey-vv1aovpkfgau5bfb | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-sunrise-z7r9jz1aavnag | Trans-Siberian Orchestra | none | 8255106 | https://www.ticketliquidator.com/tickets/8255106/Trans-Siberian-Orchestra-tickets-Fri-Dec-18-2026-Amerant-Bank-Arena | - |
| tm-trans-siberian-orchestra-2026-orlando-1aefz_8gkmasnhq | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-pittsburgh-1apzkfdgkej_ji6 | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-philadelphia-1adzz_8gkbpbarl | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-tampa-vvg1vz_oku2sug | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-cleveland-z7r9jz1aavx-d | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-indianapolis-vv17fz_8gkiwqjq1 | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-detroit-vv17oz_8gkyvghou | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-rosemont-vv1a7zkffgkdsxaxx | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-newark-vv1aezkf_gkdmwuvf | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-milwaukee-vv1a6zkfogkdqpudv | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-washington-17a8v0g62bwqi08 | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-minneapolis-vv1akzkfbgkelyd6x | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-death-cab-for-cutie-2026-brisbane-1akzk3fgkd_ud6g | Death Cab for Cutie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-death-cab-for-cutie-2026-chicago-vvg18z_cej4l_d | Death Cab for Cutie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-alan-walker-2027-austin-z7r9jz1aavtfx | Alan Walker | none | - | - | no qualifying listing (complete catalog checked) |
| tm-alan-walker-2027-irving-vvg1yz_3nb2d-j | Alan Walker | none | 8265222 | https://www.ticketliquidator.com/tickets/8265222/Alan-Walker-tickets-Fri-Jan-22-2027-The-Pavilion-at-Toyota-Music-Factory | - |
| tm-alan-walker-2027-houston-g5diz_3no4w3_ | Alan Walker | none | 8265214 | https://www.ticketliquidator.com/tickets/8265214/Alan-Walker-tickets-Sat-Jan-23-2027-713-Music-Hall | - |
| tm-alan-walker-2027-saint-louis-1a-zkf0gkdapg7j | Alan Walker | none | - | - | no qualifying listing (complete catalog checked) |
| tm-alan-walker-2027-nashville-z7r9jz1aavt47 | Alan Walker | none | - | - | no qualifying listing (complete catalog checked) |
| tm-alan-walker-2027-raleigh-g5evz_31nnqnu | Alan Walker | none | 8265275 | https://www.ticketliquidator.com/tickets/8265275/Alan-Walker-tickets-Sat-Jan-30-2027-The-Ritz-Raleigh | - |
| tm-alan-walker-2027-charleston-g5evz_3nuc_ky | Alan Walker | none | - | - | no qualifying listing (complete catalog checked) |
| tm-alan-walker-2027-washington-1a4zkftgkdat1lk | Alan Walker | none | 8265284 | https://www.ticketliquidator.com/tickets/8265284/Alan-Walker-tickets-Sat-Feb-6-2027-The-Anthem-DC | - |
| tm-alan-walker-2027-philadelphia-vv1aezkfxgkdmhfsx | Alan Walker | none | 8265283 | https://www.ticketliquidator.com/tickets/8265283/Alan-Walker-tickets-Tue-Feb-9-2027-The-Fillmore-Philadelphia | - |
| tm-alan-walker-2027-boston-vv1a8vpfzgauaajv | Alan Walker | none | 8265260 | https://www.ticketliquidator.com/tickets/8265260/Alan-Walker-tickets-Wed-Feb-10-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-alan-walker-2027-new-york-z7r9jz1aavt4a | Alan Walker | none | 8265262 | https://www.ticketliquidator.com/tickets/8265262/Alan-Walker-tickets-Thu-Feb-11-2027-Terminal-5 | - |
| tm-alan-walker-2027-new-york-z7r9jz1aavt4k | Alan Walker | none | 8265263 | https://www.ticketliquidator.com/tickets/8265263/Alan-Walker-tickets-Fri-Feb-12-2027-Terminal-5 | - |
| tm-alan-walker-2027-montreal-1aszkfngkelr9-v | Alan Walker | none | 8269075 | https://www.ticketliquidator.com/tickets/8269075/Alan-Walker-tickets-Tue-Feb-16-2027-MTelus | - |
| tm-alan-walker-2027-toronto-1avzz_3gkilb6g_ | Alan Walker | none | - | - | no qualifying listing (complete catalog checked) |
| tm-alan-walker-2027-toronto-1avzz_3gkilbmgn | Alan Walker | none | - | - | no qualifying listing (complete catalog checked) |
| tm-alan-walker-2027-ottawa-16d7z_3qeg7dn9t | Alan Walker | none | - | - | no qualifying listing (complete catalog checked) |
| tm-alan-walker-2027-pittsburgh-z7r9jz1aavt46 | Alan Walker | none | 8265270 | https://www.ticketliquidator.com/tickets/8265270/Alan-Walker-tickets-Tue-Feb-23-2027-Stage-AE | - |
| tm-alan-walker-2027-columbus-z7r9jz1aavt4f | Alan Walker | none | 8265272 | https://www.ticketliquidator.com/tickets/8265272/Alan-Walker-tickets-Wed-Feb-24-2027-KEMBA-Live | - |
| tm-alan-walker-2027-indianapolis-vv1aazkfegkewtmln | Alan Walker | none | 8265273 | https://www.ticketliquidator.com/tickets/8265273/Alan-Walker-tickets-Thu-Feb-25-2027-Egyptian-Room-At-Old-National-Centre | - |
| tm-alan-walker-2027-chicago-vv1k8z_3gyg7zohx | Alan Walker | none | 8265271 | https://www.ticketliquidator.com/tickets/8265271/Alan-Walker-tickets-Fri-Feb-26-2027-Byline-Bank-Aragon-Ballroom | - |
| tm-alan-walker-2027-seattle-z7r9jz1aavt4a | Alan Walker | none | 8265274 | https://www.ticketliquidator.com/tickets/8265274/Alan-Walker-tickets-Wed-Mar-3-2027-Showbox-SoDo | - |
| tm-alan-walker-2027-portland-z7r9jz1aavt48 | Alan Walker | none | 8261374 | https://www.ticketliquidator.com/tickets/8261374/Alan-Walker-tickets-Thu-Mar-4-2027-McMenamins-Crystal-Ballroom | - |
| tm-alan-walker-2027-los-angeles-vvg1iz_3n0r6vh | Alan Walker | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-psychedelic-furs-2026-riverside-vvg1iz_cbbunjv | The Psychedelic Furs | none | 8234745 | https://www.ticketliquidator.com/tickets/8234745/The-Psychedelic-Furs-tickets-Wed-Nov-11-2026-Fox-Performing-Arts-Center | - |
| tm-the-psychedelic-furs-2027-austin-z7r9jz1aavso0 | The Psychedelic Furs | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-psychedelic-furs-2027-saint-louis-1ae7z_3gkmwkki0 | The Psychedelic Furs | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-psychedelic-furs-2027-waukegan-vv166zkf-0ozagdv5d | The Psychedelic Furs | none | 8266290 | https://www.ticketliquidator.com/tickets/8266290/The-Psychedelic-Furs-tickets-Thu-Apr-1-2027-Genesee-Theatre | - |
| tm-the-psychedelic-furs-2027-tallahassee-z7r9jz1aavsop | The Psychedelic Furs | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-psychedelic-furs-2027-saint-petersburg-z7r9jz1aavsof | The Psychedelic Furs | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-psychedelic-furs-2027-miami-beach-vvg1vz_3egjcmc | The Psychedelic Furs | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-psychedelic-furs-2027-asheville-g5evz_35jhjdg | The Psychedelic Furs | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-psychedelic-furs-2027-norfolk-z7r9jz1aavs4p | The Psychedelic Furs | none | 8268317 | https://www.ticketliquidator.com/tickets/8268317/The-Psychedelic-Furs-tickets-Tue-Apr-20-2027-The-Norva | - |
| tm-the-psychedelic-furs-2027-baltimore-1avfz_ogktjo5z- | The Psychedelic Furs | none | 8266296 | https://www.ticketliquidator.com/tickets/8266296/The-Psychedelic-Furs-tickets-Fri-Apr-23-2027-Nevermore-Hall | - |
| tm-the-psychedelic-furs-2027-bethlehem-vv17fz_3gkmknapk | The Psychedelic Furs | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-psychedelic-furs-2027-red-bank-g5vvz_3ilcqvm | The Psychedelic Furs | none | 8266297 | https://www.ticketliquidator.com/tickets/8266297/The-Psychedelic-Furs-tickets-Tue-Apr-27-2027-Hackensack-Meridian-Health-Theatre-at-the-Count-Basie-Center-for-the-Arts | - |
| tm-the-psychedelic-furs-2027-huntington-k7vgf_3n_asme | The Psychedelic Furs | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-psychedelic-furs-2027-northfield-vv17fz_ogkhgkwao | The Psychedelic Furs | none | 8267710 | https://www.ticketliquidator.com/tickets/8267710/The-Psychedelic-Furs-tickets-Sat-May-1-2027-Northfield-Park-Racino-Center-Stage | - |
| tm-eros-ramazzotti-2027-new-york-g5dyz_ou7is1y | Eros Ramazzotti | none | 8244289 | https://www.ticketliquidator.com/tickets/8244289/Eros-Ramazzotti-tickets-Sat-Oct-2-2027-Radio-City-Music-Hall | - |
| tm-the-warning-2027-madrid-z698xz2qz1k_074bf | The Warning | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-warning-2027-barcelona-z698xz2qz16vgvavjf | The Warning | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-warning-2027-birmingham-g5dzz_3jthdkp | The Warning | none | 8265893 | https://www.ticketliquidator.com/tickets/8265893/The-Warning-tickets-Mon-Mar-29-2027-O2-Academy-Birmingham | - |
| tm-the-warning-2027-glasgow-g5dzz_3cmwwj3 | The Warning | none | 8267822 | https://www.ticketliquidator.com/tickets/8267822/The-Warning-tickets-Tue-Mar-30-2027-O2-Academy-Glasgow | - |
| tm-the-warning-2027-manchester-g5dzz_3jr_df6 | The Warning | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-warning-2027-phoenix-1av0z_3gkl3jytk | The Warning | none | 8264649 | https://www.ticketliquidator.com/tickets/8264649/The-Warning-tickets-Sun-Apr-18-2027-The-Van-Buren | - |
| tm-the-warning-2027-san-francisco-z7r9jz1aavtgn | The Warning | none | 8264655 | https://www.ticketliquidator.com/tickets/8264655/The-Warning-tickets-Tue-Apr-20-2027-Warfield | - |
| tm-the-warning-2027-portland-z7r9jz1aavtg0 | The Warning | none | 8264657 | https://www.ticketliquidator.com/tickets/8264657/The-Warning-tickets-Thu-Apr-22-2027-Roseland-Theater | - |
| tm-the-warning-2027-seattle-vvg1hz_3rqncw_ | The Warning | none | 8264648 | https://www.ticketliquidator.com/tickets/8264648/The-Warning-tickets-Fri-Apr-23-2027-Moore-Theatre-WA | - |
| tm-the-warning-2027-vancouver-z7r9jz1aavjo7 | The Warning | none | 8264658 | https://www.ticketliquidator.com/tickets/8264658/The-Warning-tickets-Sun-Apr-25-2027-Vogue-Theatre-BC | - |
| tm-the-warning-2027-denver-g5vzz_3mnvfjd | The Warning | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-warning-2027-oklahoma-city-z7r9jz1aavtgp | The Warning | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-warning-2027-houston-g5diz_30oeism | The Warning | none | 8264650 | https://www.ticketliquidator.com/tickets/8264650/The-Warning-tickets-Sun-May-2-2027-Bayou-Music-Center | - |
| tm-the-warning-2027-atlanta-z7r9jz1aavtgj | The Warning | none | 8264656 | https://www.ticketliquidator.com/tickets/8264656/The-Warning-tickets-Tue-May-4-2027-The-Eastern-GA | - |
| tm-the-warning-2027-detroit-vv17oz_3gklkji_k | The Warning | none | 8264651 | https://www.ticketliquidator.com/tickets/8264651/The-Warning-tickets-Thu-May-6-2027-The-Fillmore-Detroit | - |
| tm-the-warning-2027-ottawa-1ad7z_3gklmhbs8 | The Warning | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-warning-2027-montreal-1ad7z_3gknfhkqk | The Warning | none | 8270802 | https://www.ticketliquidator.com/tickets/8270802/The-Warning-tickets-Sun-May-9-2027-MTelus | - |
| tm-the-warning-2027-toronto-1avzz_3gkltrh3z | The Warning | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-warning-2027-pittsburgh-1avbz_3gknh0_t1 | The Warning | none | 8264652 | https://www.ticketliquidator.com/tickets/8264652/The-Warning-tickets-Sat-May-15-2027-Citizens-Live-at-The-Wylie | - |
| tm-the-warning-2027-brooklyn-k7vgf_3iu7xhd | The Warning | none | 8264661 | https://www.ticketliquidator.com/tickets/8264661/The-Warning-tickets-Tue-May-18-2027-Brooklyn-Paramount | - |
| tm-the-warning-2027-boston-vv177z_3gklqgssu | The Warning | none | 8264653 | https://www.ticketliquidator.com/tickets/8264653/The-Warning-tickets-Sun-May-23-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-latto-2026-las-vegas-g5ezz_khrbusj | Latto | none | 8286255 | https://www.ticketliquidator.com/tickets/8286255/Latto-tickets-Sat-Oct-31-2026-On-The-Record-at-Park-MGM | - |
| tm-metallica-2027-vancouver-1av7z_3gkd3wcu8 | Metallica | none | 8268591 | https://www.ticketliquidator.com/tickets/8268591/Metallica-tickets-Sat-May-8-2027-BC-Place-Stadium | - |
| tm-metallica-2027-san-diego-vvg1iz_3rsxtwd | Metallica | none | 8268592 | https://www.ticketliquidator.com/tickets/8268592/Metallica-tickets-Thu-May-13-2027-Snapdragon-Stadium | - |
| tm-metallica-2027-el-paso-vvg1yz_3zjrn4d | Metallica | none | 8268593 | https://www.ticketliquidator.com/tickets/8268593/Metallica-tickets-Tue-May-18-2027-Sun-Bowl-Stadium | - |
| tm-metallica-2027-san-antonio-g5diz_3mpis-k | Metallica | none | 8268594 | https://www.ticketliquidator.com/tickets/8268594/Metallica-tickets-Sat-May-22-2027-Alamodome | - |
| tm-metallica-2027-fayetteville-g5viz_om30atl | Metallica | none | 8268595 | https://www.ticketliquidator.com/tickets/8268595/Metallica-tickets-Wed-May-26-2027-Donald-W-Reynolds-Razorback-Stadium | - |
| tm-metallica-2027-kansas-city-vv17bz_3gkwemfok | Metallica | none | 8268597 | https://www.ticketliquidator.com/tickets/8268597/Metallica-tickets-Sat-May-29-2027-Arrowhead-Stadium | - |
| tm-metallica-2027-indianapolis-vv17fz_3gktr8lni | Metallica | none | 8268598 | https://www.ticketliquidator.com/tickets/8268598/Metallica-tickets-Sat-Jun-5-2027-Lucas-Oil-Stadium | - |
| tm-metallica-2027-orchard-park-vv17gz_3gktmreup | Metallica | none | 8268600 | https://www.ticketliquidator.com/tickets/8268600/Metallica-tickets-Tue-Jun-8-2027-New-Highmark-Stadium | - |
| tm-metallica-2027-cleveland-vv17fz_3gkdywngg | Metallica | none | 8268601 | https://www.ticketliquidator.com/tickets/8268601/Metallica-tickets-Tue-Jun-15-2027-Huntington-Bank-Field | - |
| tm-metallica-2027-salt-lake-city-g5vzz_3hepr-9 | Metallica | none | 8268602 | https://www.ticketliquidator.com/tickets/8268602/Metallica-tickets-Sat-Jun-19-2027-Rice-Eccles-Stadium | - |
| tm-teddy-swims-2027-dublin-17kzv0g6260hbxf | Teddy Swims | none | 8314998 | https://www.ticketliquidator.com/tickets/8314998/Teddy-Swims-tickets-Fri-Apr-9-2027-3Arena-Dublin | - |
| tm-teddy-swims-2027-london-17u8v0g623nj3ov | Teddy Swims | none | - | - | no qualifying listing (complete catalog checked) |
| tm-michelle-branch-2027-tulsa-z7r9jz1aazuoa | Michelle Branch | none | - | - | no qualifying listing (complete catalog checked) |
| tm-yuridia-2027-rosemont-vv1a7zkf0gkeskm_x | Yuridia | none | 8276961 | https://www.ticketliquidator.com/tickets/8276961/Yuridia-tickets-Wed-Mar-24-2027-Rosemont-Theatre | - |
| tm-pink-martini-2027-charlottesville-z7r9jz1aav-zj | Pink Martini | none | - | - | no qualifying listing (complete catalog checked) |
| tm-oasis-2027-munich-z698xzc2z16vca8yqu | Oasis | none | - | - | no qualifying listing (complete catalog checked) |
| tm-oasis-2027-munich-z698xzc2z16ezoffov | Oasis | none | - | - | no qualifying listing (complete catalog checked) |
| tm-oasis-2027-munich-z698xzc2z16v7f7_4g | Oasis | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hans-zimmer-2027-belmont-park-1adzz_3gkmrvuzw | Hans Zimmer | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hans-zimmer-2027-newark-vv1aezkfygkepjhre | Hans Zimmer | none | 8270976 | https://www.ticketliquidator.com/tickets/8270976/Hans-Zimmer-tickets-Sun-Feb-21-2027-Prudential-Center | - |
| tm-hans-zimmer-2027-philadelphia-1kgzvpgaga1lecy | Hans Zimmer | none | 8270977 | https://www.ticketliquidator.com/tickets/8270977/Hans-Zimmer-tickets-Tue-Feb-23-2027-Xfinity-Mobile-Arena | - |
| tm-hans-zimmer-2027-boston-vv1avzkftgkdjvzxr | Hans Zimmer | none | 8270978 | https://www.ticketliquidator.com/tickets/8270978/Hans-Zimmer-tickets-Wed-Feb-24-2027-TD-Garden | - |
| tm-hans-zimmer-2027-kanata-1aszkf0gkdalm2x | Hans Zimmer | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hans-zimmer-2027-quebec-1fg8vp17a7z7uce8 | Hans Zimmer | none | 8271005 | https://www.ticketliquidator.com/tickets/8271005/Hans-Zimmer-tickets-Sun-Feb-28-2027-Centre-Videotron | - |
| tm-hans-zimmer-2027-hamilton-1a8zkfigkdxfojj | Hans Zimmer | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hans-zimmer-2027-detroit-vv17oz_3gky-owzw | Hans Zimmer | none | 8270979 | https://www.ticketliquidator.com/tickets/8270979/Hans-Zimmer-tickets-Wed-Mar-3-2027-Little-Caesars-Arena | - |
| tm-hans-zimmer-2027-chicago-vv178z_3gkta7u7g | Hans Zimmer | none | 8270980 | https://www.ticketliquidator.com/tickets/8270980/Hans-Zimmer-tickets-Fri-Mar-5-2027-United-Center | - |
| tm-hans-zimmer-2027-cincinnati-1avbz_3gkbx_fb1 | Hans Zimmer | none | 8270981 | https://www.ticketliquidator.com/tickets/8270981/Hans-Zimmer-tickets-Sun-Mar-7-2027-Heritage-Bank-Center | - |
| tm-hans-zimmer-2027-charlotte-g5evz_3h3lwh3 | Hans Zimmer | none | 8270982 | https://www.ticketliquidator.com/tickets/8270982/Hans-Zimmer-tickets-Tue-Mar-9-2027-Spectrum-Center | - |
| tm-hans-zimmer-2027-orlando-1axzkfygkexmgrx | Hans Zimmer | none | 8270983 | https://www.ticketliquidator.com/tickets/8270983/Hans-Zimmer-tickets-Thu-Mar-11-2027-Kia-Center | - |
| tm-hans-zimmer-2027-miami-vvg1vz_3gotwd8 | Hans Zimmer | none | 8270985 | https://www.ticketliquidator.com/tickets/8270985/Hans-Zimmer-tickets-Sat-Mar-13-2027-Kaseya-Center | - |
| tm-hans-zimmer-2027-tampa-vvg1vz_3xhwnhj | Hans Zimmer | none | 8270987 | https://www.ticketliquidator.com/tickets/8270987/Hans-Zimmer-tickets-Sun-Mar-14-2027-Benchmark-International-Arena | - |
| tm-hans-zimmer-2027-atlanta-vvg1zz_3ebknkc | Hans Zimmer | none | 8270989 | https://www.ticketliquidator.com/tickets/8270989/Hans-Zimmer-tickets-Tue-Mar-16-2027-State-Farm-Arena-GA | - |
| tm-hans-zimmer-2027-nashville-g5viz_3pzfvfc | Hans Zimmer | none | 8270990 | https://www.ticketliquidator.com/tickets/8270990/Hans-Zimmer-tickets-Wed-Mar-17-2027-Bridgestone-Arena | - |
| tm-hans-zimmer-2027-fort-worth-vvg1yz_8uydbmt | Hans Zimmer | unverify (applied) | 8270991 | https://www.ticketliquidator.com/tickets/8270991/Hans-Zimmer-tickets-Mon-Mar-22-2027-Dickies-Arena | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-hans-zimmer-2027-denver-g5vzz_keile5w | Hans Zimmer | none | 8270993 | https://www.ticketliquidator.com/tickets/8270993/Hans-Zimmer-tickets-Thu-Mar-25-2027-Ball-Arena | - |
| tm-hans-zimmer-2027-phoenix-1av0z_3gktywjdb | Hans Zimmer | none | 8270994 | https://www.ticketliquidator.com/tickets/8270994/Hans-Zimmer-tickets-Tue-Mar-30-2027-Mortgage-Matchup-Center | - |
| tm-hans-zimmer-2027-anaheim-vv170z_3gkwtdbyn | Hans Zimmer | none | 8270996 | https://www.ticketliquidator.com/tickets/8270996/Hans-Zimmer-tickets-Fri-Apr-2-2027-Honda-Center | - |
| tm-hans-zimmer-2027-san-francisco-g5vyz_32ucflk | Hans Zimmer | none | 8270997 | https://www.ticketliquidator.com/tickets/8270997/Hans-Zimmer-tickets-Sun-Apr-4-2027-Chase-Center | - |
| tm-hans-zimmer-2027-sacramento-g5vyz_3nnpqvc | Hans Zimmer | none | 8270998 | https://www.ticketliquidator.com/tickets/8270998/Hans-Zimmer-tickets-Mon-Apr-5-2027-Golden-1-Center | - |
| tm-hans-zimmer-2027-vancouver-1av7z_3gkxmnqqq | Hans Zimmer | none | 8271008 | https://www.ticketliquidator.com/tickets/8271008/Hans-Zimmer-tickets-Thu-Apr-8-2027-Rogers-Arena | - |
| tm-hans-zimmer-2027-seattle-vvg1hz_3exntsl | Hans Zimmer | none | 8271000 | https://www.ticketliquidator.com/tickets/8271000/Hans-Zimmer-tickets-Fri-Apr-9-2027-Climate-Pledge-Arena | - |
| tm-hans-zimmer-2027-portland-vvg1hz_3zbqmzv | Hans Zimmer | none | 8271002 | https://www.ticketliquidator.com/tickets/8271002/Hans-Zimmer-tickets-Sun-Apr-11-2027-Moda-Center-at-the-Rose-Quarter | - |
| tm-kenny-chesney-2027-tampa-vvg1vz_3xhd4sr | Kenny Chesney | none | 8265768 | https://www.ticketliquidator.com/tickets/8265768/Kenny-Chesney-tickets-Sat-Apr-24-2027-Raymond-James-Stadium | - |
| tm-kenny-chesney-2027-greenville-z7r9jz1aavsad | Kenny Chesney | none | 8265769 | https://www.ticketliquidator.com/tickets/8265769/Kenny-Chesney-tickets-Sat-May-1-2027-Dowdy-Ficklen-Stadium | - |
| tm-kenny-chesney-2027-arlington-z7r9jz1aavsa7 | Kenny Chesney | none | 8265770 | https://www.ticketliquidator.com/tickets/8265770/Kenny-Chesney-tickets-Sat-May-8-2027-ATT-Stadium | - |
| tm-kenny-chesney-2027-saint-louis-vv1kvovpfigaupvvy | Kenny Chesney | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kenny-chesney-2027-minneapolis-vv1akzkf0gkdyrnq8 | Kenny Chesney | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kenny-chesney-2027-pittsburgh-1apzkfxgkdbuj3l | Kenny Chesney | none | 8265775 | https://www.ticketliquidator.com/tickets/8265775/Kenny-Chesney-tickets-Sat-May-29-2027-Acrisure-Stadium | - |
| tm-kenny-chesney-2027-ames-vv1kbz_3x6g7cusy | Kenny Chesney | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kenny-chesney-2027-philadelphia-vv1aezkfigkdubjp8 | Kenny Chesney | none | 8265777 | https://www.ticketliquidator.com/tickets/8265777/Kenny-Chesney-tickets-Sat-Jun-12-2027-Lincoln-Financial-Field | - |
| tm-kenny-chesney-2027-orchard-park-vv1adzkfngkd3refj | Kenny Chesney | none | 8265778 | https://www.ticketliquidator.com/tickets/8265778/Kenny-Chesney-tickets-Sat-Jun-19-2027-New-Highmark-Stadium | - |
| tm-kenny-chesney-2027-chicago-vv1f8z_3ao7xzd2g1 | Kenny Chesney | none | 8265779 | https://www.ticketliquidator.com/tickets/8265779/Kenny-Chesney-tickets-Sat-Jun-26-2027-Soldier-Field | - |
| tm-kenny-chesney-2027-nashville-z7r9jz1aavsaa | Kenny Chesney | none | 8265780 | https://www.ticketliquidator.com/tickets/8265780/Kenny-Chesney-tickets-Sat-Jul-3-2027-New-Nissan-Stadium | - |
| tm-kenny-chesney-2027-milwaukee-vv1a6zkftgkdfvyq7 | Kenny Chesney | none | 8265781 | https://www.ticketliquidator.com/tickets/8265781/Kenny-Chesney-tickets-Sat-Jul-10-2027-American-Family-Field | - |
| tm-kenny-chesney-2027-denver-g5vzz_3k6u08y | Kenny Chesney | none | 8265782 | https://www.ticketliquidator.com/tickets/8265782/Kenny-Chesney-tickets-Sat-Jul-17-2027-Empower-Field-At-Mile-High | - |
| tm-kenny-chesney-2027-kansas-city-vv1akzkfxgkdkijos | Kenny Chesney | none | 8265784 | https://www.ticketliquidator.com/tickets/8265784/Kenny-Chesney-tickets-Sat-Jul-24-2027-Arrowhead-Stadium | - |
| tm-kenny-chesney-2027-atlanta-vvg1zz_3x03by9 | Kenny Chesney | none | 8265786 | https://www.ticketliquidator.com/tickets/8265786/Kenny-Chesney-tickets-Sat-Jul-31-2027-Mercedes-Benz-Stadium | - |
| tm-kenny-chesney-2027-east-rutherford-k7vgf_3cwtd0z | Kenny Chesney | none | 8265787 | https://www.ticketliquidator.com/tickets/8265787/Kenny-Chesney-tickets-Sat-Aug-7-2027-MetLife-Stadium | - |
| tm-kenny-chesney-2027-detroit-vv17oz_8gkmnwpji | Kenny Chesney | none | 8265788 | https://www.ticketliquidator.com/tickets/8265788/Kenny-Chesney-tickets-Sat-Aug-14-2027-Ford-Field | - |
| tm-kenny-chesney-2027-charlotte-g5evz_3c19bfo | Kenny Chesney | none | 8265789 | https://www.ticketliquidator.com/tickets/8265789/Kenny-Chesney-tickets-Sat-Aug-21-2027-Bank-Of-America-Stadium | - |
| tm-kenny-chesney-2027-foxborough-vv177z_3gkt1lkmv | Kenny Chesney | none | 8276965 | https://www.ticketliquidator.com/tickets/8276965/Kenny-Chesney-tickets-Fri-Aug-27-2027-Gillette-Stadium | - |
| tm-kenny-chesney-2027-foxborough-vv1avzkfxgkdu8gfo | Kenny Chesney | none | 8265790 | https://www.ticketliquidator.com/tickets/8265790/Kenny-Chesney-tickets-Sat-Aug-28-2027-Gillette-Stadium | - |
| tm-death-cab-for-cutie-2027-honolulu-vvg1iz_3dqr_0d | Death Cab for Cutie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-death-cab-for-cutie-2027-nashville-g5viz_3bvgq-a | Death Cab for Cutie | none | 8271386 | https://www.ticketliquidator.com/tickets/8271386/Death-Cab-for-Cutie-tickets-Thu-Mar-11-2027-The-Truth | - |
| tm-death-cab-for-cutie-2027-knoxville-g5viz_3xoa9li | Death Cab for Cutie | none | 8271387 | https://www.ticketliquidator.com/tickets/8271387/Death-Cab-for-Cutie-tickets-Fri-Mar-12-2027-Tennessee-Theatre | - |
| tm-death-cab-for-cutie-2027-miami-beach-vvg1vz_3ltyqny | Death Cab for Cutie | none | 8271388 | https://www.ticketliquidator.com/tickets/8271388/Death-Cab-for-Cutie-tickets-Thu-Mar-18-2027-The-Fillmore-Miami-Beach-At-Jackie-Gleason-Theater | - |
| tm-death-cab-for-cutie-2027-orlando-1aefz_3gkr16pfe | Death Cab for Cutie | none | 8271389 | https://www.ticketliquidator.com/tickets/8271389/Death-Cab-for-Cutie-tickets-Sat-Mar-20-2027-Hard-Rock-Live-Orlando | - |
| tm-death-cab-for-cutie-2027-houston-g5diz_3dogrf9 | Death Cab for Cutie | none | 8271390 | https://www.ticketliquidator.com/tickets/8271390/Death-Cab-for-Cutie-tickets-Mon-Mar-22-2027-713-Music-Hall | - |
| tm-death-cab-for-cutie-2027-pittsburgh-1apzkfygkd_ubdt | Death Cab for Cutie | none | 8271391 | https://www.ticketliquidator.com/tickets/8271391/Death-Cab-for-Cutie-tickets-Tue-Mar-30-2027-Citizens-Live-at-The-Wylie | - |
| tm-death-cab-for-cutie-2027-niagara-falls-1avzz_3gkxslrqs | Death Cab for Cutie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-death-cab-for-cutie-2027-ottawa-1ad7z_3gkhxejxw | Death Cab for Cutie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-death-cab-for-cutie-2027-montreal-1ad7z_3gkrplg-n | Death Cab for Cutie | none | 8271400 | https://www.ticketliquidator.com/tickets/8271400/Death-Cab-for-Cutie-tickets-Mon-Apr-5-2027-MTelus | - |
| tm-death-cab-for-cutie-2027-boston-vv177z_3gklgkjcy | Death Cab for Cutie | none | 8271392 | https://www.ticketliquidator.com/tickets/8271392/Death-Cab-for-Cutie-tickets-Wed-Apr-7-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-death-cab-for-cutie-2027-boston-vv177z_3gklgfg2c | Death Cab for Cutie | none | 8271393 | https://www.ticketliquidator.com/tickets/8271393/Death-Cab-for-Cutie-tickets-Thu-Apr-8-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-death-cab-for-cutie-2027-uncasville-g5vvz_3vqdtrt | Death Cab for Cutie | none | 8271394 | https://www.ticketliquidator.com/tickets/8271394/Death-Cab-for-Cutie-tickets-Fri-Apr-9-2027-Mohegan-Sun-Arena-CT | - |
| tm-death-cab-for-cutie-2027-portland-vv1k7z_ke_g7zcjz | Death Cab for Cutie | none | 8271395 | https://www.ticketliquidator.com/tickets/8271395/Death-Cab-for-Cutie-tickets-Sun-Apr-11-2027-State-Theatre-ME | - |
| tm-death-cab-for-cutie-2027-new-york-g5dyz_kedn3qx | Death Cab for Cutie | none | 8271396 | https://www.ticketliquidator.com/tickets/8271396/Death-Cab-for-Cutie-tickets-Tue-Apr-13-2027-Radio-City-Music-Hall | - |
| tm-death-cab-for-cutie-2027-asheville-g5evz_3io8wkm | Death Cab for Cutie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-psychedelic-furs-2027-ridgefield-z7r9jz1aavuq6 | The Psychedelic Furs | none | 8314924 | https://www.ticketliquidator.com/tickets/8314924/The-Psychedelic-Furs-tickets-Fri-Jan-15-2027-The-Ridgefield-Playhouse | - |
| tm-the-psychedelic-furs-2027-birmingham-g5dzz_kk-v07y | The Psychedelic Furs | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-psychedelic-furs-2027-london-1amzkfwgkeiysgf | The Psychedelic Furs | none | - | - | no qualifying listing (complete catalog checked) |
| tm-atmosphere-2027-madison-vv1a6zkfygkes1aem | Atmosphere | none | 8277969 | https://www.ticketliquidator.com/tickets/8277969/Atmosphere-tickets-Fri-Jan-15-2027-The-Sylvee-WI | - |
| tm-atmosphere-2027-boise-g5vzz_kkmetdo | Atmosphere | none | - | - | no qualifying listing (complete catalog checked) |
| tm-atmosphere-2027-bozeman-g5vzz_k6poibm | Atmosphere | none | 8277971 | https://www.ticketliquidator.com/tickets/8277971/Atmosphere-tickets-Sat-Jan-23-2027-The-Elm-Bozeman | - |
| tm-atmosphere-2027-spokane-g5vzz_kkyknfe | Atmosphere | none | 8277972 | https://www.ticketliquidator.com/tickets/8277972/Atmosphere-tickets-Sun-Jan-24-2027-Knitting-Factory-Spokane | - |
| tm-atmosphere-2027-vancouver-1av7z_3gkx859iu | Atmosphere | none | 8277978 | https://www.ticketliquidator.com/tickets/8277978/Atmosphere-tickets-Tue-Jan-26-2027-Commodore-Ballroom | - |
| tm-atmosphere-2027-eugene-z7r9jz1aaez3b | Atmosphere | none | 8277983 | https://www.ticketliquidator.com/tickets/8277983/Atmosphere-tickets-Thu-Jan-28-2027-McDonald-Theatre | - |
| tm-atmosphere-2027-reno-1a9zkfwgkddbjmf | Atmosphere | none | - | - | no qualifying listing (complete catalog checked) |
| tm-atmosphere-2027-tucson-1kk8vpgiga2ka3q | Atmosphere | none | 8277974 | https://www.ticketliquidator.com/tickets/8277974/Atmosphere-tickets-Mon-Feb-1-2027-Rialto-Theatre-Tucson | - |
| tm-atmosphere-2027-kansas-city-vv11bz_k7z0sqj | Atmosphere | none | - | - | no qualifying listing (complete catalog checked) |
| tm-atmosphere-2027-joliet-vv17jz_3gknvxst7 | Atmosphere | none | - | - | no qualifying listing (complete catalog checked) |
| tm-atmosphere-2027-rockford-1ae7z_3gkl5agu0 | Atmosphere | none | 8277977 | https://www.ticketliquidator.com/tickets/8277977/Atmosphere-tickets-Sat-Feb-6-2027-Hard-Rock-Live-Rockford | - |
| tm-hilary-duff-2027-vancouver-1aozko7gkervl69 | Hilary Duff | none | 7734988 | https://www.ticketliquidator.com/tickets/7734988/Hilary-Duff-tickets-Fri-Jan-22-2027-Rogers-Arena | - |
| tm-hilary-duff-2027-vancouver-1av7z_7gkuh7fot | Hilary Duff | none | 7745831 | https://www.ticketliquidator.com/tickets/7745831/Hilary-Duff-tickets-Sat-Jan-23-2027-Rogers-Arena | - |
| tm-hilary-duff-2027-calgary-1k78v0ojga2h3es | Hilary Duff | none | 7734989 | https://www.ticketliquidator.com/tickets/7734989/Hilary-Duff-tickets-Tue-Jan-26-2027-Scotiabank-Saddledome | - |
| tm-hilary-duff-2027-edmonton-1k78v0ooga1ytpq | Hilary Duff | none | 7734990 | https://www.ticketliquidator.com/tickets/7734990/Hilary-Duff-tickets-Wed-Jan-27-2027-Rogers-Place | - |
| tm-hilary-duff-2027-saskatoon-1k78v0fmgaungny | Hilary Duff | none | 7751988 | https://www.ticketliquidator.com/tickets/7751988/Hilary-Duff-tickets-Fri-Jan-29-2027-SaskTel-Centre | - |
| tm-hilary-duff-2027-winnipeg-1av7z_7gknwgxan | Hilary Duff | none | 7734991 | https://www.ticketliquidator.com/tickets/7734991/Hilary-Duff-tickets-Sat-Jan-30-2027-Canada-Life-Centre | - |
| tm-hilary-duff-2027-hamilton-1avzz_7gkr2rr5b | Hilary Duff | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hilary-duff-2027-kanata-1aszkokgkdr1nwx | Hilary Duff | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hilary-duff-2027-montreal-1aszkoagkeug7uo | Hilary Duff | none | 7734993 | https://www.ticketliquidator.com/tickets/7734993/Hilary-Duff-tickets-Fri-Feb-5-2027-Centre-Bell | - |
| tm-hilary-duff-2027-halifax-1ad7z_7gkm3f7fo | Hilary Duff | none | 7734994 | https://www.ticketliquidator.com/tickets/7734994/Hilary-Duff-tickets-Sun-Feb-7-2027-Scotiabank-Centre | - |
| tm-hilary-duff-2027-madrid-z698xz2qz16vpo4y_t | Hilary Duff | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hilary-duff-2027-milano-zg9rmiynyz776e | Hilary Duff | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hilary-duff-2027-forest-brussels-z698xzg2z1kqm7d-k | Hilary Duff | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hilary-duff-2027-amsterdam-z698xzbpz1k3djpek | Hilary Duff | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hilary-duff-2027-orlando-1axzkfugkdwff3y | Hilary Duff | none | 8284544 | https://www.ticketliquidator.com/tickets/8284544/Hilary-Duff-tickets-Sat-Oct-2-2027-Kia-Center | - |
| tm-hilary-duff-2027-raleigh-g5evz_kpqg6lj | Hilary Duff | none | 8284585 | https://www.ticketliquidator.com/tickets/8284585/Hilary-Duff-tickets-Mon-Oct-4-2027-Lenovo-Center | - |
| tm-hilary-duff-2027-baltimore-1a4zkfwgket7cfe | Hilary Duff | none | 8284545 | https://www.ticketliquidator.com/tickets/8284545/Hilary-Duff-tickets-Wed-Oct-6-2027-CFG-Bank-Arena | - |
| tm-hilary-duff-2027-uncasville-g5vvz_k5dwnjz | Hilary Duff | none | 8284546 | https://www.ticketliquidator.com/tickets/8284546/Hilary-Duff-tickets-Fri-Oct-8-2027-Mohegan-Sun-Arena-CT | - |
| tm-hilary-duff-2027-hershey-vv1aezkfugkempa0j | Hilary Duff | none | 8284547 | https://www.ticketliquidator.com/tickets/8284547/Hilary-Duff-tickets-Sat-Oct-9-2027-Giant-Center | - |
| tm-hilary-duff-2027-buffalo-k7vgf_k9lboi8 | Hilary Duff | none | 8284548 | https://www.ticketliquidator.com/tickets/8284548/Hilary-Duff-tickets-Mon-Oct-11-2027-KeyBank-Center | - |
| tm-hilary-duff-2027-columbus-vv1kv8vpu8ga1ilbe | Hilary Duff | none | 8284550 | https://www.ticketliquidator.com/tickets/8284550/Hilary-Duff-tickets-Fri-Oct-15-2027-Value-City-Arena-at-The-Schottenstein-Center | - |
| tm-hilary-duff-2027-pittsburgh-1apzkfsgkdqpqgi | Hilary Duff | none | 8284583 | https://www.ticketliquidator.com/tickets/8284583/Hilary-Duff-tickets-Sat-Oct-16-2027-PPG-Paints-Arena | - |
| tm-hilary-duff-2027-san-antonio-g5diz_kh8lc6s | Hilary Duff | none | 8284551 | https://www.ticketliquidator.com/tickets/8284551/Hilary-Duff-tickets-Fri-Nov-5-2027-Frost-Bank-Center | - |
| tm-hilary-duff-2027-fort-worth-vvg1yz_3lpl3yg | Hilary Duff | unverify (applied) | 8284554 | https://www.ticketliquidator.com/tickets/8284554/Hilary-Duff-tickets-Sat-Nov-6-2027-Dickies-Arena | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-hilary-duff-2027-tulsa-1aozkfggkd6ydle | Hilary Duff | none | 8284555 | https://www.ticketliquidator.com/tickets/8284555/Hilary-Duff-tickets-Mon-Nov-8-2027-BOK-Center | - |
| tm-hilary-duff-2027-omaha-vv1akzkfggkdletyo | Hilary Duff | none | 8284567 | https://www.ticketliquidator.com/tickets/8284567/Hilary-Duff-tickets-Wed-Nov-10-2027-CHI-Health-Center-Omaha | - |
| tm-hilary-duff-2027-milwaukee-vv1a6zkfggkdrdjze | Hilary Duff | none | 8284568 | https://www.ticketliquidator.com/tickets/8284568/Hilary-Duff-tickets-Fri-Nov-12-2027-Fiserv-Forum | - |
| tm-hilary-duff-2027-kansas-city-vv1kvovpuoga1lapx | Hilary Duff | none | 8284570 | https://www.ticketliquidator.com/tickets/8284570/Hilary-Duff-tickets-Mon-Nov-15-2027-T-Mobile-Center | - |
| tm-hilary-duff-2027-denver-g5vzz_kkrpbyy | Hilary Duff | none | 8284571 | https://www.ticketliquidator.com/tickets/8284571/Hilary-Duff-tickets-Wed-Nov-17-2027-Ball-Arena | - |
| tm-hilary-duff-2027-anaheim-vv110z_kqbpjub | Hilary Duff | none | 8284572 | https://www.ticketliquidator.com/tickets/8284572/Hilary-Duff-tickets-Sat-Nov-20-2027-Honda-Center | - |
| tm-josiah-queen-2027-tulsa-1aozkf0gkevkv5m | Josiah Queen | none | 8255314 | https://www.ticketliquidator.com/tickets/8255314/Josiah-Queen-tickets-Thu-Apr-8-2027-BOK-Center | - |
| tm-josiah-queen-2027-saint-louis-vv1akzkfngkee0a6p | Josiah Queen | none | - | - | no qualifying listing (complete catalog checked) |
| tm-josiah-queen-2027-indianapolis-vv1ffz_3xppazdu26 | Josiah Queen | none | 8255316 | https://www.ticketliquidator.com/tickets/8255316/Josiah-Queen-tickets-Sat-Apr-10-2027-Gainbridge-Fieldhouse | - |
| tm-josiah-queen-2027-grand-rapids-vv1afzkfngkeiofuw | Josiah Queen | none | 8255317 | https://www.ticketliquidator.com/tickets/8255317/Josiah-Queen-tickets-Sun-Apr-11-2027-Van-Andel-Arena | - |
| tm-josiah-queen-2027-toronto-1a8zkf-gkdrxwct | Josiah Queen | none | - | - | no qualifying listing (complete catalog checked) |
| tm-josiah-queen-2027-worcester-vv1a8vpfygauucfi | Josiah Queen | none | 8255318 | https://www.ticketliquidator.com/tickets/8255318/Josiah-Queen-tickets-Thu-Apr-15-2027-DCU-Center | - |
| tm-josiah-queen-2027-hershey-vv1aezkf0gkdfm7yq | Josiah Queen | none | 8255319 | https://www.ticketliquidator.com/tickets/8255319/Josiah-Queen-tickets-Fri-Apr-16-2027-Giant-Center | - |
| tm-josiah-queen-2027-charlotte-g5evz_3r2npem | Josiah Queen | none | 8255320 | https://www.ticketliquidator.com/tickets/8255320/Josiah-Queen-tickets-Sat-Apr-17-2027-Spectrum-Center | - |
| tm-josiah-queen-2027-duluth-vvg1zz_3nnlvdz | Josiah Queen | none | 8255321 | https://www.ticketliquidator.com/tickets/8255321/Josiah-Queen-tickets-Sun-Apr-18-2027-Gas-South-Arena | - |
| tm-josiah-queen-2027-hoffman-estates-vv1a7zkfigkdsnse_ | Josiah Queen | none | 8255322 | https://www.ticketliquidator.com/tickets/8255322/Josiah-Queen-tickets-Fri-Apr-23-2027-NOW-Arena | - |
| tm-josiah-queen-2027-anaheim-vv16azkf00fza5k85a | Josiah Queen | none | 8255323 | https://www.ticketliquidator.com/tickets/8255323/Josiah-Queen-tickets-Thu-Apr-29-2027-Honda-Center | - |
| tm-josiah-queen-2027-san-diego-vvg1iz_33lzbne | Josiah Queen | none | 8255324 | https://www.ticketliquidator.com/tickets/8255324/Josiah-Queen-tickets-Fri-Apr-30-2027-Viejas-Arena-At-Aztec-Bowl | - |
| tm-josiah-queen-2027-glendale-1fk8vpavkaz7g1ee | Josiah Queen | none | 8255325 | https://www.ticketliquidator.com/tickets/8255325/Josiah-Queen-tickets-Sat-May-1-2027-Desert-Diamond-Arena | - |
| tm-josiah-queen-2027-fort-worth-vvg1yz_kebfbqm | Josiah Queen | unverify (applied) | 8272507 | https://www.ticketliquidator.com/tickets/8272507/Josiah-Queen-tickets-Wed-May-5-2027-Dickies-Arena | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-josiah-queen-2027-cedar-park-g5diz_32hchtd | Josiah Queen | none | - | - | no qualifying listing (complete catalog checked) |
| tm-josiah-queen-2027-fort-worth-vvg1yz_35oahaq | Josiah Queen | unverify (applied) | 8255327 | https://www.ticketliquidator.com/tickets/8255327/Josiah-Queen-tickets-Sat-May-8-2027-Dickies-Arena | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-ha-ash-2027-toronto-1a8zkfwgkedyh_t | Ha*Ash | none | - | - | no qualifying listing (complete catalog checked) |
| tm-ha-ash-2027-indianapolis-vv1kv8vpg3ga1gw8k | Ha*Ash | none | 8277079 | https://www.ticketliquidator.com/tickets/8277079/HaAsh-tickets-Thu-Apr-22-2027-Murat-Theatre-at-Old-National-Centre | - |
| tm-ha-ash-2027-rosemont-vv1fvzvpg_o4z7ueuv | Ha*Ash | none | 8278251 | https://www.ticketliquidator.com/tickets/8278251/HaAsh-tickets-Fri-Apr-23-2027-Rosemont-Theatre | - |
| tm-ha-ash-2027-denver-g5vzz_k1t3qaq | Ha*Ash | none | 8277080 | https://www.ticketliquidator.com/tickets/8277080/HaAsh-tickets-Sun-Apr-25-2027-Paramount-Theatre-Denver | - |
| tm-ha-ash-2027-seattle-vvg1hz_k1hjj1j | Ha*Ash | none | 8277081 | https://www.ticketliquidator.com/tickets/8277081/HaAsh-tickets-Wed-Apr-28-2027-Paramount-Theatre-Seattle | - |
| tm-ha-ash-2027-inglewood-vvg1iz_3teyn4f | Ha*Ash | none | 8277083 | https://www.ticketliquidator.com/tickets/8277083/HaAsh-tickets-Sun-May-2-2027-YouTube-Theater-at-Hollywood-Park | - |
| tm-ha-ash-2027-san-jose-g5vyz_k6wigg_ | Ha*Ash | none | 8277082 | https://www.ticketliquidator.com/tickets/8277082/HaAsh-tickets-Thu-May-6-2027-San-Jose-Civic | - |
| tm-ha-ash-2027-phoenix-1a_zkfwgkdcnqcy | Ha*Ash | none | 8277084 | https://www.ticketliquidator.com/tickets/8277084/HaAsh-tickets-Sat-May-8-2027-Arizona-Financial-Theatre | - |
| tm-ha-ash-2027-el-paso-vvg1yz_kgeolu1 | Ha*Ash | none | 8277085 | https://www.ticketliquidator.com/tickets/8277085/HaAsh-tickets-Wed-May-12-2027-El-Paso-County-Coliseum | - |
| tm-ha-ash-2027-irving-vvg1yz_k558xwt | Ha*Ash | none | 8277086 | https://www.ticketliquidator.com/tickets/8277086/HaAsh-tickets-Fri-May-14-2027-The-Pavilion-at-Toyota-Music-Factory | - |
| tm-ha-ash-2027-hidalgo-g5diz_kauvdks | Ha*Ash | none | 8277087 | https://www.ticketliquidator.com/tickets/8277087/HaAsh-tickets-Sat-May-15-2027-Payne-Arena | - |
| tm-ha-ash-2027-houston-g5diz_kkygldl | Ha*Ash | none | 8277088 | https://www.ticketliquidator.com/tickets/8277088/HaAsh-tickets-Sun-May-16-2027-713-Music-Hall | - |
| tm-ha-ash-2027-new-york-k7vgf_kc2qanb | Ha*Ash | none | 8277089 | https://www.ticketliquidator.com/tickets/8277089/HaAsh-tickets-Wed-May-19-2027-United-Palace-Theatre | - |
| tm-ha-ash-2027-atlanta-vvg1zz_k1bpf9p | Ha*Ash | none | 8277090 | https://www.ticketliquidator.com/tickets/8277090/HaAsh-tickets-Fri-May-21-2027-Coca-Cola-Roxy | - |
| tm-ha-ash-2027-miami-beach-vvg1vz_k1-dzg7 | Ha*Ash | none | 8277091 | https://www.ticketliquidator.com/tickets/8277091/HaAsh-tickets-Sat-May-22-2027-The-Fillmore-Miami-Beach-At-Jackie-Gleason-Theater | - |
| tm-lukas-graham-2027-dallas-vvg1yz_kg_q-ih | Lukas Graham | none | 8286278 | https://www.ticketliquidator.com/tickets/8286278/Lukas-Graham-tickets-Tue-Mar-2-2027-The-Echo-Lounge-and-Music-Hall | - |
| tm-lukas-graham-2027-atlanta-vvg1zz_kgj9z2e | Lukas Graham | none | 8286279 | https://www.ticketliquidator.com/tickets/8286279/Lukas-Graham-tickets-Thu-Mar-4-2027-Buckhead-Theatre | - |
| tm-lukas-graham-2027-tampa-vvg1vz_kpwcutv | Lukas Graham | none | 8286280 | https://www.ticketliquidator.com/tickets/8286280/Lukas-Graham-tickets-Fri-Mar-5-2027-The-Ritz-Ybor | - |
| tm-lukas-graham-2027-charlotte-g5evz_kpbekzf | Lukas Graham | none | 8286281 | https://www.ticketliquidator.com/tickets/8286281/Lukas-Graham-tickets-Sun-Mar-7-2027-The-Fillmore-Charlotte | - |
| tm-lukas-graham-2027-silver-spring-1a4zkfwgkdu1_zg | Lukas Graham | none | 8286282 | https://www.ticketliquidator.com/tickets/8286282/Lukas-Graham-tickets-Tue-Mar-9-2027-The-Fillmore-Silver-Spring | - |
| tm-lukas-graham-2027-new-york-k7vgf_kq-e_yf | Lukas Graham | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lukas-graham-2027-boston-vv1k7z_k8xg7ihpb | Lukas Graham | none | 8286284 | https://www.ticketliquidator.com/tickets/8286284/Lukas-Graham-tickets-Fri-Apr-2-2027-Citizens-House-Of-Blues-Boston | - |
| tm-lukas-graham-2027-philadelphia-vv1aovpuf-zf9v5 | Lukas Graham | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lukas-graham-2027-toronto-1f7zvpgxaoz786kf | Lukas Graham | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lukas-graham-2027-detroit-vv1afzkfwgkddfuvd | Lukas Graham | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lukas-graham-2027-indianapolis-vv1kv8vpuvgauq0sn | Lukas Graham | none | 8286290 | https://www.ticketliquidator.com/tickets/8286290/Lukas-Graham-tickets-Thu-Apr-8-2027-Egyptian-Room-At-Old-National-Centre | - |
| tm-lukas-graham-2027-minneapolis-vv11bz_kf-ovb0 | Lukas Graham | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lukas-graham-2027-chicago-vv1a7zkfugkegdi06 | Lukas Graham | none | 8286294 | https://www.ticketliquidator.com/tickets/8286294/Lukas-Graham-tickets-Sun-Apr-11-2027-House-Of-Blues-Chicago | - |
| tm-passenger-2027-brussels-z698xzg2z16v-xbfos | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-milano-zg9rmiynyzd6ea | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-dublin-1avoz_8gkm9ghn7 | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-belfast-16zzkfkojzage16c | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-glasgow-g5dzz_8wyqwf1 | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-edinburgh-1adbz_8gks0vdnw | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-newcastle-upon-tyne-g5dzz_o6adefx | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-manchester-17uov0g62wjanur | Passenger | none | 8297868 | https://www.ticketliquidator.com/tickets/8297868/Passenger-tickets-Wed-Sep-15-2027-O2-Apollo-Manchester | - |
| tm-passenger-2027-london-1auzkf3gkd0sykm | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-exeter-g5vhz_o2o0irs | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-birmingham-g5dzz_2wg0-vu | Passenger | none | 8265897 | https://www.ticketliquidator.com/tickets/8265897/Passenger-tickets-Fri-Sep-24-2027-O2-Academy-Birmingham | - |
| tm-passenger-2027-brighton-g5vhz_o5oziab | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-brisbane-1avgz_8gkmdlzyi | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-st-kilda-1avgz_8gkm6pbt5 | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-sydney-16vgz_oayg7zvfp | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-john-summit-2026-brooklyn-17gzv0g65ttxsbe | John Summit | none | 8292934 | https://www.ticketliquidator.com/tickets/8292934/John-Summit-tickets-Sun-Nov-29-2026-Barclays-Center | - |
| tm-vnv-nation-2027-denver-z7r9jz1a7jv8m | VNV Nation | none | - | - | no qualifying listing (complete catalog checked) |
| tm-oasis-2027-glasgow-1adfz_3gknft-og | Oasis | none | 8264751 | https://www.ticketliquidator.com/tickets/8264751/Oasis-tickets-Fri-May-21-2027-Celtic-Park | - |
| tm-oasis-2027-glasgow-1agzkfwgkd1ybno | Oasis | none | 8264752 | https://www.ticketliquidator.com/tickets/8264752/Oasis-tickets-Sun-May-23-2027-Celtic-Park | - |
| tm-oasis-2027-glasgow-1agzkfwgkd5kfpx | Oasis | none | 8264753 | https://www.ticketliquidator.com/tickets/8264753/Oasis-tickets-Tue-May-25-2027-Celtic-Park | - |
| tm-oasis-2027-glasgow-1agzkfwgkd5pben | Oasis | none | 8264754 | https://www.ticketliquidator.com/tickets/8264754/Oasis-tickets-Fri-May-28-2027-Celtic-Park | - |
| tm-oasis-2027-glasgow-1agzkfwgkdu5imb | Oasis | none | 8264755 | https://www.ticketliquidator.com/tickets/8264755/Oasis-tickets-Sat-May-29-2027-Celtic-Park | - |
| tm-oasis-2027-manchester-g5dzz_3lwzpdp | Oasis | none | 8264756 | https://www.ticketliquidator.com/tickets/8264756/Oasis-tickets-Fri-Jun-4-2027-Etihad-Stadium | - |
| tm-oasis-2027-manchester-g5dzz_3lmyj87 | Oasis | none | 8264757 | https://www.ticketliquidator.com/tickets/8264757/Oasis-tickets-Sun-Jun-6-2027-Etihad-Stadium | - |
| tm-oasis-2027-manchester-g5dzz_3lbuu4c | Oasis | none | 8264758 | https://www.ticketliquidator.com/tickets/8264758/Oasis-tickets-Tue-Jun-8-2027-Etihad-Stadium | - |
| tm-oasis-2027-manchester-g5dzz_3lwcjqy | Oasis | none | 8264759 | https://www.ticketliquidator.com/tickets/8264759/Oasis-tickets-Fri-Jun-11-2027-Etihad-Stadium | - |
| tm-oasis-2027-manchester-g5dzz_3lxmu-j | Oasis | none | 8264760 | https://www.ticketliquidator.com/tickets/8264760/Oasis-tickets-Sat-Jun-12-2027-Etihad-Stadium | - |
| tm-oasis-2027-manchester-g5dzz_3nq9ecb | Oasis | none | 8264761 | https://www.ticketliquidator.com/tickets/8264761/Oasis-tickets-Tue-Jun-15-2027-Etihad-Stadium | - |
| tm-oasis-2027-manchester-g5dzz_3lv67ao | Oasis | none | 8264762 | https://www.ticketliquidator.com/tickets/8264762/Oasis-tickets-Fri-Jun-18-2027-Etihad-Stadium | - |
| tm-oasis-2027-manchester-g5dzz_3l--ppl | Oasis | none | 8264763 | https://www.ticketliquidator.com/tickets/8264763/Oasis-tickets-Sat-Jun-19-2027-Etihad-Stadium | - |
| tm-oasis-2027-manchester-g5dzz_3l0pglg | Oasis | none | 8264764 | https://www.ticketliquidator.com/tickets/8264764/Oasis-tickets-Tue-Jun-22-2027-Etihad-Stadium | - |
| tm-oasis-2027-manchester-g5dzz_3ljog0t | Oasis | none | 8264765 | https://www.ticketliquidator.com/tickets/8264765/Oasis-tickets-Fri-Jun-25-2027-Etihad-Stadium | - |
| tm-oasis-2027-manchester-g5dzz_3lnpprv | Oasis | none | 8264766 | https://www.ticketliquidator.com/tickets/8264766/Oasis-tickets-Sat-Jun-26-2027-Etihad-Stadium | - |
| tm-oasis-2027-co-meath-1avoz_3gkrnpmuo | Oasis | none | - | - | no qualifying listing (complete catalog checked) |
| tm-oasis-2027-co-meath-1avoz_3gkrn9ru4 | Oasis | none | - | - | no qualifying listing (complete catalog checked) |
| tm-oasis-2027-stevenage-1adjz_3gklfny3e | Oasis | none | - | - | no qualifying listing (complete catalog checked) |
| tm-oasis-2027-stevenage-1adjz_3gkrrmy7n | Oasis | none | - | - | no qualifying listing (complete catalog checked) |
| tm-oasis-2027-stevenage-1adjz_3gkrnjt4_ | Oasis | none | - | - | no qualifying listing (complete catalog checked) |
| tm-oasis-2027-stevenage-1adjz_3gkreiyj0 | Oasis | none | - | - | no qualifying listing (complete catalog checked) |
| tm-oasis-2027-stevenage-1adjz_3gkrs3n_k | Oasis | none | - | - | no qualifying listing (complete catalog checked) |
| tm-oasis-2027-stevenage-1adjz_3gkrz1qva | Oasis | none | - | - | no qualifying listing (complete catalog checked) |
| tm-atmosphere-2027-salt-lake-city-g5vzz_kl2vywj | Atmosphere | none | 8277984 | https://www.ticketliquidator.com/tickets/8277984/Atmosphere-tickets-Sat-Jan-30-2027-The-Depot-Salt-Lake-City | - |
| tm-oasis-2027-barcelona-z698xz2qz1kosq3xa | Oasis | none | - | - | no qualifying listing (complete catalog checked) |
| tm-oasis-2027-barcelona-z698xz2qz1kvz7a4m | Oasis | none | - | - | no qualifying listing (complete catalog checked) |
| tm-oasis-2027-amsterdam-z698xzbpz16vrdz-8b | Oasis | none | 8264772 | https://www.ticketliquidator.com/tickets/8264772/Oasis-tickets-Fri-Jul-16-2027-Johan-Cruijff-Arena | - |
| tm-oasis-2027-amsterdam-z698xzbpz1kodp337 | Oasis | none | 8264773 | https://www.ticketliquidator.com/tickets/8264773/Oasis-tickets-Sat-Jul-17-2027-Johan-Cruijff-Arena | - |
| tm-sienna-spiro-2026-chicago-z7r9jz1a7pxq8 | Sienna Spiro | none | 8038348 | https://www.ticketliquidator.com/tickets/8038348/Sienna-Spiro-tickets-Tue-Oct-27-2026-Riviera-Theatre-IL | - |
| tm-sienna-spiro-2026-minneapolis-z7r9jz1a7pko4 | Sienna Spiro | none | 8038349 | https://www.ticketliquidator.com/tickets/8038349/Sienna-Spiro-tickets-Wed-Oct-28-2026-First-Avenue | - |
| tm-sienna-spiro-2026-englewood-z7r9jz1a7p-ji | Sienna Spiro | none | 8038350 | https://www.ticketliquidator.com/tickets/8038350/Sienna-Spiro-tickets-Fri-Oct-30-2026-Gothic-Theatre | - |
| tm-sienna-spiro-2026-seattle-z7r9jz1a7pxzs | Sienna Spiro | none | 8038352 | https://www.ticketliquidator.com/tickets/8038352/Sienna-Spiro-tickets-Mon-Nov-2-2026-The-Showbox | - |
| tm-sienna-spiro-2026-vancouver-z7r9jz1a7pk0e | Sienna Spiro | none | 8047966 | https://www.ticketliquidator.com/tickets/8047966/Sienna-Spiro-tickets-Wed-Nov-4-2026-Vogue-Theatre-BC | - |
| tm-sienna-spiro-2026-vancouver-z7r9jz1a7pa4e | Sienna Spiro | none | 8047967 | https://www.ticketliquidator.com/tickets/8047967/Sienna-Spiro-tickets-Thu-Nov-5-2026-Vogue-Theatre-BC | - |
| tm-sienna-spiro-2026-portland-z7r9jz1a7p-q3 | Sienna Spiro | none | 8047968 | https://www.ticketliquidator.com/tickets/8047968/Sienna-Spiro-tickets-Sat-Nov-7-2026-McMenamins-Crystal-Ballroom | - |
| tm-sienna-spiro-2026-san-francisco-g5vyz_gkw-ewe | Sienna Spiro | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sienna-spiro-2026-los-angeles-vvg10z_gpwxv_j | Sienna Spiro | none | 8038344 | https://www.ticketliquidator.com/tickets/8038344/Sienna-Spiro-tickets-Tue-Nov-10-2026-The-Wiltern | - |
| tm-sienna-spiro-2026-los-angeles-vvg10z_udz2l-k | Sienna Spiro | none | 8058397 | https://www.ticketliquidator.com/tickets/8058397/Sienna-Spiro-tickets-Thu-Nov-12-2026-Orpheum-Theatre-Los-Angeles | - |
| tm-sienna-spiro-2027-west-melbourne-177yv0g6gecffyz | Sienna Spiro | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sienna-spiro-2027-west-melbourne-177yv0g6gmjpde2 | Sienna Spiro | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sienna-spiro-2027-brisbane-177yv0g6gjxxnip | Sienna Spiro | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sienna-spiro-2027-edinburgh-g5dzz_g3xlvct | Sienna Spiro | none | 8056624 | https://www.ticketliquidator.com/tickets/8056624/Sienna-Spiro-tickets-Mon-Feb-22-2027-Edinburgh-Corn-Exchange | - |
| tm-sienna-spiro-2027-edinburgh-g5dzz_g3jtvqc | Sienna Spiro | none | 8058895 | https://www.ticketliquidator.com/tickets/8058895/Sienna-Spiro-tickets-Tue-Feb-23-2027-Edinburgh-Corn-Exchange | - |
| tm-sienna-spiro-2027-manchester-17uov0g6ghevqqt | Sienna Spiro | none | 8090734 | https://www.ticketliquidator.com/tickets/8090734/Sienna-Spiro-tickets-Mon-Mar-1-2027-O2-Apollo-Manchester | - |
| tm-sienna-spiro-2027-manchester-17uov0g6gnyji_e | Sienna Spiro | none | 8057458 | https://www.ticketliquidator.com/tickets/8057458/Sienna-Spiro-tickets-Tue-Mar-2-2027-O2-Apollo-Manchester | - |
| tm-sienna-spiro-2027-forest-brussels-z698xzg2z1kk3-m-y | Sienna Spiro | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sienna-spiro-2027-berlin-z698xzc2z16v0n7t_u | Sienna Spiro | none | 8057456 | https://www.ticketliquidator.com/tickets/8057456/Sienna-Spiro-tickets-Wed-Mar-24-2027-Tempodrom | - |
| tm-sienna-spiro-2027-milano-zg9rmiynyzef6a | Sienna Spiro | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sienna-spiro-2027-barcelona-z698xz2qz16evg76uk | Sienna Spiro | none | 8058056 | https://www.ticketliquidator.com/tickets/8058056/Sienna-Spiro-tickets-Mon-Mar-29-2027-Main-Hall-At-Parallel-62 | - |
| tm-sienna-spiro-2027-madrid-z698xz2qz16v4sjdu3 | Sienna Spiro | none | 8058057 | https://www.ticketliquidator.com/tickets/8058057/Sienna-Spiro-tickets-Tue-Mar-30-2027-La-Riviera-Spain | - |
| tm-sienna-spiro-2027-dublin-17kzv0g6gpq41un | Sienna Spiro | none | - | - | no qualifying listing (complete catalog checked) |
| tm-malcolm-todd-2026-phoenix-17k8v0g6g538qi9 | Malcolm Todd | unverify (applied) | 8035370 | https://www.ticketliquidator.com/tickets/8035370/Malcolm-Todd-tickets-Sun-Oct-25-2026-Arizona-Financial-Theatre | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-malcolm-todd-2026-los-angeles-vvg10z_gcgtrwf | Malcolm Todd | none | 8034349 | https://www.ticketliquidator.com/tickets/8034349/Malcolm-Todd-tickets-Wed-Oct-28-2026-Greek-Theatre-Los-Angeles-CA | - |
| tm-malcolm-todd-2026-los-angeles-vvg10z_gpovtcx | Malcolm Todd | none | 8038273 | https://www.ticketliquidator.com/tickets/8038273/Malcolm-Todd-tickets-Thu-Oct-29-2026-Greek-Theatre-Los-Angeles-CA | - |
| tm-malcolm-todd-2026-los-angeles-vvg10z_gpomy2y | Malcolm Todd | none | 8038476 | https://www.ticketliquidator.com/tickets/8038476/Malcolm-Todd-tickets-Fri-Oct-30-2026-Greek-Theatre-Los-Angeles-CA | - |
| tm-malcolm-todd-2027-stockholm-z698xzq2z1afq0g8 | Malcolm Todd | none | - | - | no qualifying listing (complete catalog checked) |
| tm-malcolm-todd-2027-forest-brussels-z698xzg2z1a3rzza | Malcolm Todd | none | - | - | no qualifying listing (complete catalog checked) |
| tm-malcolm-todd-2027-dublin-1kkzvpfyga5vo0x | Malcolm Todd | none | - | - | no qualifying listing (complete catalog checked) |
| tm-malcolm-todd-2027-glasgow-1adbz_3gknizpvr | Malcolm Todd | none | - | - | no qualifying listing (complete catalog checked) |
| tm-malcolm-todd-2027-birmingham-g5dzz_3nh3wrn | Malcolm Todd | none | 8265887 | https://www.ticketliquidator.com/tickets/8265887/Malcolm-Todd-tickets-Sat-Feb-27-2027-O2-Academy-Birmingham | - |
| tm-malcolm-todd-2027-manchester-1adbz_3gknvr9ad | Malcolm Todd | none | - | - | no qualifying listing (complete catalog checked) |
| tm-malcolm-todd-2027-london-g5dzz_3lpy7hq | Malcolm Todd | none | - | - | no qualifying listing (complete catalog checked) |
| tm-malcolm-todd-2027-london-g5dzz_3rjik2s | Malcolm Todd | none | - | - | no qualifying listing (complete catalog checked) |
| tm-malcolm-todd-2027-london-g5dzz_3rsuku2 | Malcolm Todd | none | - | - | no qualifying listing (complete catalog checked) |
| tm-malcolm-todd-2027-brisbane-1akzkftgkduv9ih | Malcolm Todd | none | - | - | no qualifying listing (complete catalog checked) |
| tm-malcolm-todd-2027-west-melbourne-1avgz_3gklkoff0 | Malcolm Todd | none | - | - | no qualifying listing (complete catalog checked) |
| tm-malcolm-todd-2027-west-melbourne-1avgz_3gkdbmub7 | Malcolm Todd | none | - | - | no qualifying listing (complete catalog checked) |
| tm-malcolm-todd-2027-mt-claremont-1avgz_3gkl3ubod | Malcolm Todd | none | - | - | no qualifying listing (complete catalog checked) |
| tm-malcolm-todd-2027-mt-claremont-1avgz_3gkydesct | Malcolm Todd | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lizzy-mcalpine-2027-torrensville-1akzkfggkdqgjdn | Lizzy McAlpine | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lizzy-mcalpine-2027-brisbane-1akzkfugkeggjy4 | Lizzy McAlpine | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lizzy-mcalpine-2027-warsaw-z698xzqpz16vfyab0p | Lizzy McAlpine | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lizzy-mcalpine-2027-glasgow-g5dzz_krfm-83 | Lizzy McAlpine | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lizzy-mcalpine-2027-dublin-16bzkfw-sza81kca | Lizzy McAlpine | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lizzy-mcalpine-2027-houston-g5diz_kko6pz2 | Lizzy McAlpine | none | 8287503 | https://www.ticketliquidator.com/tickets/8287503/Lizzy-McAlpine-tickets-Sat-May-1-2027-713-Music-Hall | - |
| tm-lizzy-mcalpine-2027-durham-g5evz_klljeql | Lizzy McAlpine | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lizzy-mcalpine-2027-detroit-vv1afzkfmgkdd0jd5 | Lizzy McAlpine | none | 8287505 | https://www.ticketliquidator.com/tickets/8287505/Lizzy-McAlpine-tickets-Fri-May-7-2027-Fox-Theatre-Detroit | - |
| tm-lizzy-mcalpine-2027-indianapolis-vv1aazkfggkeu7rbe | Lizzy McAlpine | none | 8287506 | https://www.ticketliquidator.com/tickets/8287506/Lizzy-McAlpine-tickets-Sun-May-9-2027-Clowes-Memorial-Hall | - |
| tm-lizzy-mcalpine-2027-minneapolis-vv1akzkfsgkdlvc7g | Lizzy McAlpine | none | 8287507 | https://www.ticketliquidator.com/tickets/8287507/Lizzy-McAlpine-tickets-Wed-May-12-2027-State-Theatre-MN | - |
| tm-lizzy-mcalpine-2027-saint-louis-vv1kvovpu_ga2r6bf | Lizzy McAlpine | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lizzy-mcalpine-2027-nashville-g5viz_kqsm0og | Lizzy McAlpine | none | 8287510 | https://www.ticketliquidator.com/tickets/8287510/Lizzy-McAlpine-tickets-Wed-Jun-16-2027-Bridgestone-Arena | - |
| tm-lizzy-mcalpine-2027-philadelphia-1ayzkfsgkdubyxp | Lizzy McAlpine | none | 8287512 | https://www.ticketliquidator.com/tickets/8287512/Lizzy-McAlpine-tickets-Fri-Jun-18-2027-Xfinity-Mobile-Arena | - |
| tm-lizzy-mcalpine-2027-boston-vv1a8vpuzga1bapr | Lizzy McAlpine | none | 8287513 | https://www.ticketliquidator.com/tickets/8287513/Lizzy-McAlpine-tickets-Sun-Jun-20-2027-Agganis-Arena | - |
| tm-lizzy-mcalpine-2027-new-york-g5diz_kr8e3se | Lizzy McAlpine | none | 8287514 | https://www.ticketliquidator.com/tickets/8287514/Lizzy-McAlpine-tickets-Thu-Jun-24-2027-Madison-Square-Garden | - |
| tm-lizzy-mcalpine-2027-columbia-1a4zkfmgkejxp8r | Lizzy McAlpine | none | 8287516 | https://www.ticketliquidator.com/tickets/8287516/Lizzy-McAlpine-tickets-Fri-Jun-25-2027-Merriweather-Post-Pavilion | - |
| tm-lizzy-mcalpine-2027-toronto-1a8zkfwgke-nzw8 | Lizzy McAlpine | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lizzy-mcalpine-2027-chicago-vv1a7zkfggkenm_sz | Lizzy McAlpine | none | 8287517 | https://www.ticketliquidator.com/tickets/8287517/Lizzy-McAlpine-tickets-Tue-Jun-29-2027-United-Center | - |
| tm-lizzy-mcalpine-2027-austin-g5diz_k1qabc1 | Lizzy McAlpine | none | 8287518 | https://www.ticketliquidator.com/tickets/8287518/Lizzy-McAlpine-tickets-Fri-Jul-2-2027-Moody-Center-ATX | - |
| tm-lizzy-mcalpine-2027-san-diego-vvg1iz_k_8qjmi | Lizzy McAlpine | none | 8287519 | https://www.ticketliquidator.com/tickets/8287519/Lizzy-McAlpine-tickets-Fri-Jul-9-2027-The-Rady-Shell-at-Jacobs-Park | - |
| tm-lizzy-mcalpine-2027-inglewood-vv1aazkfugkdnwr6l | Lizzy McAlpine | none | 8287520 | https://www.ticketliquidator.com/tickets/8287520/Lizzy-McAlpine-tickets-Sat-Jul-10-2027-The-Kia-Forum | - |
| tm-lizzy-mcalpine-2027-san-francisco-g5vyz_k6tphz4 | Lizzy McAlpine | none | 8287521 | https://www.ticketliquidator.com/tickets/8287521/Lizzy-McAlpine-tickets-Tue-Jul-13-2027-Chase-Center | - |
| tm-lizzy-mcalpine-2027-portland-vvg1hz_kpe4n79 | Lizzy McAlpine | none | 8287522 | https://www.ticketliquidator.com/tickets/8287522/Lizzy-McAlpine-tickets-Thu-Jul-15-2027-Moda-Center-at-the-Rose-Quarter | - |
| tm-lizzy-mcalpine-2027-seattle-vvg1hz_kf6i_hn | Lizzy McAlpine | none | 8287523 | https://www.ticketliquidator.com/tickets/8287523/Lizzy-McAlpine-tickets-Sat-Jul-17-2027-Climate-Pledge-Arena | - |
| tm-the-interrupters-2027-tempe-16v0z_3j3g7wujq | The Interrupters | none | 8284358 | https://www.ticketliquidator.com/tickets/8284358/The-Interrupters-tickets-Fri-Mar-19-2027-Marquee-Theatre-AZ | - |
| tm-the-interrupters-2027-dallas-vvg1yz_k69fczg | The Interrupters | none | 8284360 | https://www.ticketliquidator.com/tickets/8284360/The-Interrupters-tickets-Tue-Mar-23-2027-House-Of-Blues-Dallas | - |
| tm-the-interrupters-2027-houston-g5diz_3r-jkhd | The Interrupters | none | 8284361 | https://www.ticketliquidator.com/tickets/8284361/The-Interrupters-tickets-Wed-Mar-24-2027-House-Of-Blues-Houston | - |
| tm-the-interrupters-2027-st-petersburg-vvg1vz_3xxt6_9 | The Interrupters | none | 8284362 | https://www.ticketliquidator.com/tickets/8284362/The-Interrupters-tickets-Fri-Mar-26-2027-Jannus-Live | - |
| tm-the-interrupters-2027-ft-lauderdale-vvg1vz_3bjcjr0 | The Interrupters | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-interrupters-2027-orlando-1aefz_3gkdwdk5a | The Interrupters | none | 8284364 | https://www.ticketliquidator.com/tickets/8284364/The-Interrupters-tickets-Sun-Mar-28-2027-House-Of-Blues-Orlando | - |
| tm-the-interrupters-2027-atlanta-vvg1zz_3dh5hjb | The Interrupters | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-interrupters-2027-silver-spring-1avfz_3gkbss6tr | The Interrupters | none | 8284367 | https://www.ticketliquidator.com/tickets/8284367/The-Interrupters-tickets-Fri-Apr-2-2027-The-Fillmore-Silver-Spring | - |
| tm-the-interrupters-2027-brooklyn-k7vgf_k6y5uwc | The Interrupters | none | 8284355 | https://www.ticketliquidator.com/tickets/8284355/The-Interrupters-tickets-Sun-Apr-4-2027-Brooklyn-Paramount | - |
| tm-the-interrupters-2027-boston-vv1avzkftgkexzmrt | The Interrupters | none | 8284368 | https://www.ticketliquidator.com/tickets/8284368/The-Interrupters-tickets-Wed-Apr-7-2027-Citizens-House-Of-Blues-Boston | - |
| tm-the-interrupters-2027-montreal-1ad7z_3gkmrxjga | The Interrupters | none | 8284369 | https://www.ticketliquidator.com/tickets/8284369/The-Interrupters-tickets-Fri-Apr-9-2027-MTelus | - |
| tm-the-interrupters-2027-toronto-1a8zkfsgkdrk_-b | The Interrupters | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-interrupters-2027-london-1avzz_3gkmfyun4 | The Interrupters | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-interrupters-2027-cleveland-vv17fz_3gklukmo_ | The Interrupters | none | 8284372 | https://www.ticketliquidator.com/tickets/8284372/The-Interrupters-tickets-Tue-Apr-13-2027-House-Of-Blues-Cleveland | - |
| tm-the-interrupters-2027-mckees-rocks-1avbz_3gktimcny | The Interrupters | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-interrupters-2027-detroit-vv1afzkfxgkesf0dw | The Interrupters | none | 8284374 | https://www.ticketliquidator.com/tickets/8284374/The-Interrupters-tickets-Fri-Apr-16-2027-The-Fillmore-Detroit | - |
| tm-the-interrupters-2027-chicago-vv178z_ogkmzy5fz | The Interrupters | none | 8284376 | https://www.ticketliquidator.com/tickets/8284376/The-Interrupters-tickets-Sat-Apr-17-2027-House-Of-Blues-Chicago | - |
| tm-the-interrupters-2027-saint-louis-vv17bz_3gkdzh1rc | The Interrupters | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-interrupters-2027-minneapolis-vv17bz_3gkbzsymo | The Interrupters | none | 8284379 | https://www.ticketliquidator.com/tickets/8284379/The-Interrupters-tickets-Wed-Apr-21-2027-The-Fillmore-Minneapolis-Presented-by-Affinity-Plus | - |
| tm-the-interrupters-2027-salt-lake-city-g5vzz_3nsybuv | The Interrupters | none | 8284381 | https://www.ticketliquidator.com/tickets/8284381/The-Interrupters-tickets-Sat-Apr-24-2027-The-Union-Event-Center | - |
| tm-the-interrupters-2027-los-angeles-vv1ke8vpgbgautgrg | The Interrupters | none | 8284386 | https://www.ticketliquidator.com/tickets/8284386/The-Interrupters-tickets-Fri-Apr-30-2027-The-Wiltern | - |
| tm-the-interrupters-2027-anaheim-vv1fe8vpg33pz72fk7 | The Interrupters | none | 8284387 | https://www.ticketliquidator.com/tickets/8284387/The-Interrupters-tickets-Sun-May-2-2027-House-Of-Blues-Anaheim | - |
| tm-dinosaur-jr-2026-salt-lake-city-z7r9jz1a7pmzv | Dinosaur Jr. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dinosaur-jr-2026-denver-z7r9jz1a7pu0p | Dinosaur Jr. | none | 8099079 | https://www.ticketliquidator.com/tickets/8099079/Dinosaur-Jr-tickets-Thu-Oct-29-2026-Ogden-Theatre | - |
| tm-dinosaur-jr-2026-houston-g5diz_uj-6tws | Dinosaur Jr. | none | 8099101 | https://www.ticketliquidator.com/tickets/8099101/Dinosaur-Jr-tickets-Wed-Nov-4-2026-House-Of-Blues-Houston | - |
| tm-dinosaur-jr-2026-austin-g5diz_usqkioq | Dinosaur Jr. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dinosaur-jr-2026-san-antonio-z7r9jz1a7j7j_ | Dinosaur Jr. | none | 8097391 | https://www.ticketliquidator.com/tickets/8097391/Dinosaur-Jr-tickets-Fri-Nov-6-2026-Paper-Tiger | - |
| tm-dinosaur-jr-2026-new-orleans-z7r9jz1a7pu-o | Dinosaur Jr. | none | 8105622 | https://www.ticketliquidator.com/tickets/8105622/Dinosaur-Jr-tickets-Sat-Nov-7-2026-Tipitinas | - |
| tm-dinosaur-jr-2027-brooklyn-z7r9jz1aavk1a | Dinosaur Jr. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dinosaur-jr-2027-brooklyn-z7r9jz1aavk1f | Dinosaur Jr. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dinosaur-jr-2027-silver-spring-164zkf4pnzau65fa | Dinosaur Jr. | none | 8244704 | https://www.ticketliquidator.com/tickets/8244704/Dinosaur-Jr-tickets-Tue-Feb-16-2027-The-Fillmore-Silver-Spring | - |
| tm-dinosaur-jr-2027-orlando-z7r9jz1aav8-u | Dinosaur Jr. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dinosaur-jr-2027-athens-z7r9jz1aavk1o | Dinosaur Jr. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dinosaur-jr-2027-nashville-g5viz_o987bgu | Dinosaur Jr. | none | 8239819 | https://www.ticketliquidator.com/tickets/8239819/Dinosaur-Jr-tickets-Fri-Feb-26-2027-Brooklyn-Bowl-Nashville | - |
| tm-dinosaur-jr-2027-cincinnati-1kaovpaogacpo0v | Dinosaur Jr. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dinosaur-jr-2027-minneapolis-z7r9jz1aav8op | Dinosaur Jr. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dinosaur-jr-2027-chicago-z7r9jz1aaedov | Dinosaur Jr. | none | 8245942 | https://www.ticketliquidator.com/tickets/8245942/Dinosaur-Jr-tickets-Fri-Mar-5-2027-Vic-Theatre | - |
| tm-dinosaur-jr-2027-toronto-1a8zkf4gkdtrlfj | Dinosaur Jr. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dinosaur-jr-2027-boston-vv16vzkf4vvza5c5kf | Dinosaur Jr. | none | 8239627 | https://www.ticketliquidator.com/tickets/8239627/Dinosaur-Jr-tickets-Sat-Mar-13-2027-Citizens-House-Of-Blues-Boston | - |
| tm-oasis-2027-foxborough-vv1avzkftgkehnj-e | Oasis | none | 8264685 | https://www.ticketliquidator.com/tickets/8264685/Oasis-tickets-Tue-Aug-10-2027-Gillette-Stadium | - |
| tm-oasis-2027-foxborough-vv1avzkfggke0ghpz | Oasis | none | 8264686 | https://www.ticketliquidator.com/tickets/8264686/Oasis-tickets-Fri-Aug-13-2027-Gillette-Stadium | - |
| tm-oasis-2027-foxborough-vv1avzkfggke08hpi | Oasis | none | 8264687 | https://www.ticketliquidator.com/tickets/8264687/Oasis-tickets-Sat-Aug-14-2027-Gillette-Stadium | - |
| tm-oasis-2027-las-vegas-1kayvp7_ga25ajz | Oasis | none | 8264688 | https://www.ticketliquidator.com/tickets/8264688/Oasis-tickets-Fri-Aug-20-2027-Allegiant-Stadium | - |
| tm-oasis-2027-las-vegas-1kayvp7_ga2gaje | Oasis | none | 8264689 | https://www.ticketliquidator.com/tickets/8264689/Oasis-tickets-Sat-Aug-21-2027-Allegiant-Stadium | - |
| tm-oasis-2027-las-vegas-1kayvp7_ga2u_jk | Oasis | none | 8264691 | https://www.ticketliquidator.com/tickets/8264691/Oasis-tickets-Tue-Aug-24-2027-Allegiant-Stadium | - |
| tm-harry-styles-2027-glendale-z7r9jz1aavp4_ | Harry Styles | none | 8257669 | https://www.ticketliquidator.com/tickets/8257669/Harry-Styles-tickets-Fri-Apr-2-2027-State-Farm-Stadium | - |
| tm-harry-styles-2027-glendale-z7r9jz1aavp4b | Harry Styles | none | 8257670 | https://www.ticketliquidator.com/tickets/8257670/Harry-Styles-tickets-Sat-Apr-3-2027-State-Farm-Stadium | - |
| tm-gracie-abrams-2027-glasgow-17uov0g65lvesak | Gracie Abrams | none | 8002348 | https://www.ticketliquidator.com/tickets/8002348/Gracie-Abrams-tickets-Tue-Apr-27-2027-OVO-Hydro | - |
| tm-gracie-abrams-2027-glasgow-17uov0g65vd1fhq | Gracie Abrams | none | 8018186 | https://www.ticketliquidator.com/tickets/8018186/Gracie-Abrams-tickets-Wed-Apr-28-2027-OVO-Hydro | - |
| tm-niall-horan-2026-belfast-1adoz_kgkuhawcy | Niall Horan | none | 7831757 | https://www.ticketliquidator.com/tickets/7831757/Niall-Horan-tickets-Sun-Nov-15-2026-The-O2-Belfast | - |
| tm-niall-horan-2026-belfast-1adoz_6gkmwqvwh | Niall Horan | none | 7846501 | https://www.ticketliquidator.com/tickets/7846501/Niall-Horan-tickets-Mon-Nov-16-2026-The-O2-Belfast | - |
| tm-niall-horan-2027-hartford-z7r9jz1a709uz | Niall Horan | none | 7954214 | https://www.ticketliquidator.com/tickets/7954214/Niall-Horan-tickets-Tue-Apr-13-2027-PeoplesBank-Arena | - |
| tm-doja-cat-2026-las-vegas-z7r9jz1a7js4u | Doja Cat | none | 7457634 | https://www.ticketliquidator.com/tickets/7457634/Doja-Cat-tickets-Sat-Oct-31-2026-T-Mobile-Arena | - |
| tm-metallica-2026-las-vegas-1fayv048rvz72a6e | Metallica | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-metallica-2026-las-vegas-1fayv048rvz72a6k | Metallica | none | 7759027 | https://www.ticketliquidator.com/tickets/7759027/Metallica-tickets-Sat-Oct-31-2026-Sphere | - |
| tm-metallica-2026-las-vegas-1fayv048rez72a62 | Metallica | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-metallica-2026-las-vegas-1fayv048rez72afa | Metallica | none | 7775511 | https://www.ticketliquidator.com/tickets/7775511/Metallica-tickets-Sat-Nov-7-2026-Sphere | - |
| tm-metallica-2027-las-vegas-1a9zko-gkepzm6y | Metallica | none | 7785091 | https://www.ticketliquidator.com/tickets/7785091/Metallica-tickets-Sat-Feb-27-2027-Sphere | - |
| tm-metallica-2027-las-vegas-1a9zko-gke0butu | Metallica | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-metallica-2027-las-vegas-1a9zko-gkepzm6w | Metallica | none | 7785869 | https://www.ticketliquidator.com/tickets/7785869/Metallica-tickets-Sat-Mar-6-2027-Sphere | - |
| tm-metallica-2027-las-vegas-1a9zko-gke0bqtz | Metallica | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-metallica-2027-raleigh-z7r9jz1aavwaj | Metallica | none | 8268626 | https://www.ticketliquidator.com/tickets/8268626/Metallica-tickets-Wed-Jun-2-2027-Carter-Finley-Stadium | - |
| tm-metallica-2027-madison-z7r9jz1aavw0o | Metallica | none | 8268634 | https://www.ticketliquidator.com/tickets/8268634/Metallica-tickets-Sat-Jun-12-2027-Camp-Randall-Stadium | - |
| tm-five-finger-death-punch-2027-glasgow-1adbz_agkuc9oes | Five Finger Death Punch | none | 8090424 | https://www.ticketliquidator.com/tickets/8090424/Five-Finger-Death-Punch-tickets-Sun-Jan-17-2027-OVO-Hydro | - |
| tm-blue-october-2026-san-antonio-z7r9jz1a7-vz7 | Blue October | none | 7827982 | https://www.ticketliquidator.com/tickets/7827982/Blue-October-tickets-Sat-Dec-12-2026-Boeing-Center-at-Tech-Port | - |
| tm-blue-october-2027-albuquerque-z7r9jz1a70pgn | Blue October | none | 7957262 | https://www.ticketliquidator.com/tickets/7957262/Blue-October-tickets-Thu-Feb-4-2027-Revel-Entertainment-Center | - |
| tm-trivium-2026-san-antonio-z7r9jz1aazdco | Trivium | none | 8151010 | https://www.ticketliquidator.com/tickets/8151010/Trivium-tickets-Fri-Nov-27-2026-Boeing-Center-at-Tech-Port | - |
| tm-trivium-2026-las-vegas-z7r9jz1a7j_4j | Trivium | none | 8151259 | https://www.ticketliquidator.com/tickets/8151259/Trivium-tickets-Thu-Dec-3-2026-Pearl-Concert-Theater-At-Palms-Casino-Resort | - |
| tm-sabaton-2026-loveland-z7r9jz1a7-ojz | Sabaton | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beartooth-2026-austin-z7r9jz1a70i8v | Beartooth | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beartooth-2026-albuquerque-z7r9jz1a70i3o | Beartooth | none | 7980238 | https://www.ticketliquidator.com/tickets/7980238/Beartooth-tickets-Tue-Dec-15-2026-Revel-Entertainment-Center | - |
| tm-polyphia-2027-raleigh-g5evz_oemqprp | Polyphia | none | 8056818 | https://www.ticketliquidator.com/tickets/8056818/Polyphia-tickets-Wed-Mar-10-2027-The-Ritz-Raleigh | - |
| tm-stella-lefty-2027-austin-z7r9jz1aav7f6 | Stella Lefty | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stella-lefty-2027-nashville-z7r9jz1aav7ff | Stella Lefty | none | 8231300 | https://www.ticketliquidator.com/tickets/8231300/Stella-Lefty-tickets-Wed-Feb-17-2027-Ryman-Auditorium | - |
| tm-stella-lefty-2027-nashville-z7r9jz1aavffx | Stella Lefty | none | 8237688 | https://www.ticketliquidator.com/tickets/8237688/Stella-Lefty-tickets-Thu-Feb-18-2027-Ryman-Auditorium | - |
| tm-missio-2026-san-francisco-z7r9jz1aazja_ | Missio | none | 8200527 | https://www.ticketliquidator.com/tickets/8200527/Missio-tickets-Tue-Nov-3-2026-Brick-Mortar-Music-Hall | - |
| tm-yuridia-2027-sugar-land-z7r9jz1aav-_t | Yuridia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-yuridia-2027-edinburg-z7r9jz1aav-_y | Yuridia | none | 8252916 | https://www.ticketliquidator.com/tickets/8252916/Yuridia-tickets-Fri-Mar-19-2027-Bert-Ogden-Arena | - |
| tm-yuridia-2027-brooklyn-z7r9jz1aav-_s | Yuridia | none | 8252919 | https://www.ticketliquidator.com/tickets/8252919/Yuridia-tickets-Sat-Mar-27-2027-Kings-Theatre-NY | - |
| tm-hans-zimmer-2027-hartford-z7r9jz1aavvqk | Hans Zimmer | none | 8271018 | https://www.ticketliquidator.com/tickets/8271018/Hans-Zimmer-tickets-Wed-Feb-17-2027-PeoplesBank-Arena | - |
| tm-hans-zimmer-2027-kansas-city-z7r9jz1aavvq6 | Hans Zimmer | none | 8271016 | https://www.ticketliquidator.com/tickets/8271016/Hans-Zimmer-tickets-Fri-Mar-19-2027-T-Mobile-Center | - |
| tm-hans-zimmer-2027-oklahoma-city-z7r9jz1aavvqf | Hans Zimmer | none | 8271014 | https://www.ticketliquidator.com/tickets/8271014/Hans-Zimmer-tickets-Sun-Mar-21-2027-Paycom-Center | - |
| tm-hans-zimmer-2027-salt-lake-city-z7r9jz1aavvqa | Hans Zimmer | none | 8285031 | https://www.ticketliquidator.com/tickets/8285031/Hans-Zimmer-tickets-Sat-Mar-27-2027-Delta-Center | - |
| tm-hans-zimmer-2027-los-angeles-z7r9jz1aavvq8 | Hans Zimmer | none | 8271012 | https://www.ticketliquidator.com/tickets/8271012/Hans-Zimmer-tickets-Thu-Apr-1-2027-Cryptocom-Arena | - |
| tm-trans-siberian-orchestra-2026-colorado-springs-z7r9jz1aavnz9 | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-las-vegas-z7r9jz1aavnzs | Trans-Siberian Orchestra | none | 8255067 | https://www.ticketliquidator.com/tickets/8255067/Trans-Siberian-Orchestra-tickets-Fri-Dec-4-2026-Michelob-ULTRA-Arena-At-Mandalay-Bay | - |
| tm-death-cab-for-cutie-2027-atlanta-z7r9jz1aavufx | Death Cab for Cutie | none | 8271401 | https://www.ticketliquidator.com/tickets/8271401/Death-Cab-for-Cutie-tickets-Sun-Mar-14-2027-The-Eastern-GA | - |
| tm-death-cab-for-cutie-2027-atlanta-z7r9jz1aavuf- | Death Cab for Cutie | none | 8271402 | https://www.ticketliquidator.com/tickets/8271402/Death-Cab-for-Cutie-tickets-Mon-Mar-15-2027-The-Eastern-GA | - |
| tm-death-cab-for-cutie-2027-saint-augustine-z7r9jz1aavgpy | Death Cab for Cutie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-death-cab-for-cutie-2027-new-orleans-z7r9jz1aavuv8 | Death Cab for Cutie | none | 8271406 | https://www.ticketliquidator.com/tickets/8271406/Death-Cab-for-Cutie-tickets-Fri-Mar-26-2027-Saenger-Theatre-New-Orleans | - |
| tm-the-psychedelic-furs-2027-nashville-z7r9jz1aavpq_ | The Psychedelic Furs | none | 8266292 | https://www.ticketliquidator.com/tickets/8266292/The-Psychedelic-Furs-tickets-Fri-Apr-2-2027-Ryman-Auditorium | - |
| tm-atmosphere-2027-green-bay-z7r9jz1aavz-e | Atmosphere | none | 8277979 | https://www.ticketliquidator.com/tickets/8277979/Atmosphere-tickets-Thu-Jan-14-2027-EPIC-Event-Center-WI | - |
| tm-atmosphere-2027-west-des-moines-z7r9jz1aaezfw | Atmosphere | none | 8277957 | https://www.ticketliquidator.com/tickets/8277957/Atmosphere-tickets-Sat-Jan-16-2027-Val-Air-Ballroom | - |
| tm-atmosphere-2027-omaha-z7r9jz1aaez39 | Atmosphere | none | - | - | no qualifying listing (complete catalog checked) |
| tm-atmosphere-2027-fort-collins-z7r9jz1aaezpv | Atmosphere | none | - | - | no qualifying listing (complete catalog checked) |
| tm-atmosphere-2027-grand-junction-z7r9jz1aaezfe | Atmosphere | none | - | - | no qualifying listing (complete catalog checked) |
| tm-atmosphere-2027-minneapolis-z7r9jz1aaez4o | Atmosphere | none | 8277958 | https://www.ticketliquidator.com/tickets/8277958/Atmosphere-tickets-Sun-Feb-7-2027-First-Avenue | - |
| tm-the-warning-2027-las-vegas-z7r9jz1aavtgx | The Warning | none | 8264654 | https://www.ticketliquidator.com/tickets/8264654/The-Warning-tickets-Sat-Apr-17-2027-Pearl-Concert-Theater-At-Palms-Casino-Resort | - |
| tm-the-warning-2027-san-antonio-z7r9jz1aavtf4 | The Warning | none | 8264193 | https://www.ticketliquidator.com/tickets/8264193/The-Warning-tickets-Fri-Apr-30-2027-Boeing-Center-at-Tech-Port | - |
| tm-ha-ash-2027-portland-z7r9jz1aavz-k | Ha*Ash | none | 8278252 | https://www.ticketliquidator.com/tickets/8278252/HaAsh-tickets-Thu-Apr-29-2027-Keller-Auditorium | - |
| tm-ha-ash-2027-highland-z7r9jz1aavz-m | Ha*Ash | none | 8278253 | https://www.ticketliquidator.com/tickets/8278253/HaAsh-tickets-Sat-May-1-2027-Yaamava-Theater-at-Yaamava-Resort-Casino | - |
| tm-needtobreathe-2027-omaha-1aezz_kekbozdu2k | NEEDTOBREATHE | none | 8290910 | https://www.ticketliquidator.com/tickets/8290910/Needtobreathe-tickets-Thu-Feb-18-2027-Steelhouse-Omaha | - |
| tm-needtobreathe-2027-waukee-1ae7z_3gktpcjjf | NEEDTOBREATHE | none | 8290913 | https://www.ticketliquidator.com/tickets/8290913/Needtobreathe-tickets-Fri-Feb-19-2027-Vibrant-Music-Hall | - |
| tm-needtobreathe-2027-minneapolis-vv1akzkfwgkdmqcn1 | NEEDTOBREATHE | none | 8290989 | https://www.ticketliquidator.com/tickets/8290989/Needtobreathe-tickets-Sat-Feb-20-2027-The-Armory-Minneapolis | - |
| tm-needtobreathe-2027-duluth-vv1kbz_kekg7rpco | NEEDTOBREATHE | none | - | - | no qualifying listing (complete catalog checked) |
| tm-needtobreathe-2027-madison-vv17jz_3gktprkgd | NEEDTOBREATHE | none | 8290918 | https://www.ticketliquidator.com/tickets/8290918/Needtobreathe-tickets-Thu-Feb-25-2027-The-Sylvee-WI | - |
| tm-needtobreathe-2027-grand-rapids-vv1afzkfwgkd2p_kw | NEEDTOBREATHE | none | 8290924 | https://www.ticketliquidator.com/tickets/8290924/Needtobreathe-tickets-Fri-Feb-26-2027-GLC-Live-at-20-Monroe | - |
| tm-needtobreathe-2027-cincinnati-1kaovpgtgauok5q | NEEDTOBREATHE | none | - | - | no qualifying listing (complete catalog checked) |
| tm-needtobreathe-2027-brooklyn-k7vgf_kxvnxba | NEEDTOBREATHE | none | 8290990 | https://www.ticketliquidator.com/tickets/8290990/Needtobreathe-tickets-Thu-Mar-4-2027-Brooklyn-Paramount | - |
| tm-needtobreathe-2027-boston-vv177z_3gkiozdvt | NEEDTOBREATHE | none | 8290991 | https://www.ticketliquidator.com/tickets/8290991/Needtobreathe-tickets-Fri-Mar-5-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-needtobreathe-2027-washington-1a4zkfggkdjqhau | NEEDTOBREATHE | none | 8290993 | https://www.ticketliquidator.com/tickets/8290993/Needtobreathe-tickets-Sat-Mar-6-2027-The-Anthem-DC | - |
| tm-needtobreathe-2027-pittsburgh-1apzkfggkd9zzsh | NEEDTOBREATHE | none | 8290994 | https://www.ticketliquidator.com/tickets/8290994/Needtobreathe-tickets-Sun-Mar-7-2027-Citizens-Live-at-The-Wylie | - |
| tm-needtobreathe-2027-durham-g5evz_khc4kmz | NEEDTOBREATHE | none | - | - | no qualifying listing (complete catalog checked) |
| tm-needtobreathe-2027-asheville-g5evz_kd9sqw9 | NEEDTOBREATHE | none | - | - | no qualifying listing (complete catalog checked) |
| tm-needtobreathe-2027-chattanooga-g5viz_kepfq3l | NEEDTOBREATHE | none | 8290982 | https://www.ticketliquidator.com/tickets/8290982/Needtobreathe-tickets-Fri-Mar-12-2027-Soldiers-Sailors-Memorial-Auditorium | - |
| tm-needtobreathe-2027-columbia-g5evz_kkuppj_ | NEEDTOBREATHE | none | 8290983 | https://www.ticketliquidator.com/tickets/8290983/Needtobreathe-tickets-Sat-Mar-13-2027-Township-Auditorium | - |
| tm-needtobreathe-2027-orlando-1axzkfggkdmxefx | NEEDTOBREATHE | none | 8290984 | https://www.ticketliquidator.com/tickets/8290984/Needtobreathe-tickets-Sun-Mar-14-2027-Hard-Rock-Live-Orlando | - |
| tm-needtobreathe-2027-memphis-g5viz_k1t4cqs | NEEDTOBREATHE | none | 8290985 | https://www.ticketliquidator.com/tickets/8290985/Needtobreathe-tickets-Wed-Mar-17-2027-Satellite-Music-Hall | - |
| tm-needtobreathe-2027-memphis-g5viz_k1tpwrf | NEEDTOBREATHE | none | 8290986 | https://www.ticketliquidator.com/tickets/8290986/Needtobreathe-tickets-Thu-Mar-18-2027-Satellite-Music-Hall | - |
| tm-needtobreathe-2027-new-orleans-g5viz_ocxa2ai | NEEDTOBREATHE | none | 8290987 | https://www.ticketliquidator.com/tickets/8290987/Needtobreathe-tickets-Fri-Mar-19-2027-The-Fillmore-New-Orleans | - |
| tm-needtobreathe-2027-houston-g5diz_kkbawh- | NEEDTOBREATHE | none | 8290988 | https://www.ticketliquidator.com/tickets/8290988/Needtobreathe-tickets-Sat-Mar-20-2027-713-Music-Hall | - |
| tm-foy-vance-2026-wexford-1avoz_7gksprdxw | Foy Vance | none | - | - | no qualifying listing (complete catalog checked) |
| tm-foy-vance-2026-dublin-1abzko8gkdu8sqd | Foy Vance | none | - | - | no qualifying listing (complete catalog checked) |
| tm-foy-vance-2026-los-angeles-z7r9jz1a7-9fp | Foy Vance | none | 7748033 | https://www.ticketliquidator.com/tickets/7748033/Foy-Vance-tickets-Fri-Nov-6-2026-El-Rey-Theatre-Los-Angeles | - |
| tm-foy-vance-2026-los-angeles-z7r9jz1a7--kd | Foy Vance | none | 7748034 | https://www.ticketliquidator.com/tickets/7748034/Foy-Vance-tickets-Sat-Nov-7-2026-El-Rey-Theatre-Los-Angeles | - |
| tm-foy-vance-2026-portland-z7r9jz1aavffz | Foy Vance | none | 7746920 | https://www.ticketliquidator.com/tickets/7746920/Foy-Vance-tickets-Tue-Nov-10-2026-Aladdin-Theater | - |
| tm-foy-vance-2026-seattle-vvg1hz_7scn270 | Foy Vance | none | 7746768 | https://www.ticketliquidator.com/tickets/7746768/Foy-Vance-tickets-Fri-Nov-13-2026-The-Neptune-Theatre | - |
| tm-foy-vance-2026-spokane-g5vzz_akiabhz | Foy Vance | none | 7748036 | https://www.ticketliquidator.com/tickets/7748036/Foy-Vance-tickets-Sat-Nov-14-2026-Knitting-Factory-Spokane | - |
| tm-foy-vance-2026-boise-g5vzz_akyqnb8 | Foy Vance | none | - | - | no qualifying listing (complete catalog checked) |
| tm-foy-vance-2026-englewood-z7r9jz1a7--ke | Foy Vance | none | 7748041 | https://www.ticketliquidator.com/tickets/7748041/Foy-Vance-tickets-Sat-Nov-21-2026-Gothic-Theatre | - |
| tm-foy-vance-2027-brisbane-1akzkf_gkes7kkl | Foy Vance | none | - | - | no qualifying listing (complete catalog checked) |
| tm-foy-vance-2027-birmingham-1aezz_7gkwqcsov | Foy Vance | none | 7748047 | https://www.ticketliquidator.com/tickets/7748047/Foy-Vance-tickets-Wed-Apr-7-2027-Iron-City-Birmingham | - |
| tm-foy-vance-2027-atlanta-z7r9jz1a7--ka | Foy Vance | none | 7748048 | https://www.ticketliquidator.com/tickets/7748048/Foy-Vance-tickets-Thu-Apr-8-2027-Variety-Playhouse | - |
| tm-foy-vance-2027-knoxville-g5viz_7w-hjuu | Foy Vance | none | 7748050 | https://www.ticketliquidator.com/tickets/7748050/Foy-Vance-tickets-Sat-Apr-10-2027-Bijou-Theatre-TN | - |
| tm-foy-vance-2027-cincinnati-z7r9jz1a7-k1v | Foy Vance | none | - | - | no qualifying listing (complete catalog checked) |
| tm-foy-vance-2027-saint-paul-z7r9jz1a7jfgw | Foy Vance | none | 7748052 | https://www.ticketliquidator.com/tickets/7748052/Foy-Vance-tickets-Thu-Apr-15-2027-Fitzgerald-Theater | - |
| tm-foy-vance-2027-toronto-1a8zkoogkd3hucs | Foy Vance | none | - | - | no qualifying listing (complete catalog checked) |
| tm-foy-vance-2027-york-z7r9jz1a7pnjx | Foy Vance | none | 7748060 | https://www.ticketliquidator.com/tickets/7748060/Foy-Vance-tickets-Tue-Apr-27-2027-Capitol-Theatre-at-Appell-Center-for-the-Performing-Arts | - |
| tm-foy-vance-2027-boston-vv177z_7gksjyniw | Foy Vance | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-lemonheads-2027-boston-vv177z_3gkn_hus- | The Lemonheads | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-lemonheads-2027-brooklyn-k7vgf_3rtiqkk | The Lemonheads | none | 8266203 | https://www.ticketliquidator.com/tickets/8266203/The-Lemonheads-tickets-Thu-Feb-11-2027-Brooklyn-Bowl-NY | - |
| tm-the-lemonheads-2027-atlanta-vvg1zz_3rf_-sk | The Lemonheads | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-lemonheads-2027-houston-g5diz_3mypste | The Lemonheads | none | 8266214 | https://www.ticketliquidator.com/tickets/8266214/The-Lemonheads-tickets-Mon-Feb-22-2027-White-Oak-Music-Hall-Upstairs | - |
| tm-the-lemonheads-2027-los-angeles-vv1ke8vp13ga5mfmw | The Lemonheads | none | 8266221 | https://www.ticketliquidator.com/tickets/8266221/The-Lemonheads-tickets-Thu-Mar-4-2027-Teragram-Ballroom | - |
| tm-the-lemonheads-2027-san-francisco-g5vyz_3niolho | The Lemonheads | none | 8266224 | https://www.ticketliquidator.com/tickets/8266224/The-Lemonheads-tickets-Sun-Mar-7-2027-August-Hall | - |
| tm-the-lemonheads-2027-madison-vv17jz_3gkbfxvrj | The Lemonheads | none | 8266231 | https://www.ticketliquidator.com/tickets/8266231/The-Lemonheads-tickets-Fri-Mar-19-2027-Majestic-Theatre-Madison | - |
| tm-the-lemonheads-2027-detroit-vv17oz_3gklkn916 | The Lemonheads | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-lemonheads-2027-cincinnati-1avbz_3gkmybpfp | The Lemonheads | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tommy-emmanuel-2026-dublin-1kkzv0qagauuqvy | Tommy Emmanuel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tommy-emmanuel-2026-charleston-g5evz_aboyxr9 | Tommy Emmanuel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tommy-emmanuel-2026-newberry-z7r9jz1aavs4z | Tommy Emmanuel | none | 7942280 | https://www.ticketliquidator.com/tickets/7942280/Tommy-Emmanuel-tickets-Fri-Dec-4-2026-Newberry-Opera-House | - |
| tm-tommy-emmanuel-2026-chattanooga-g5viz_au3swzr | Tommy Emmanuel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tommy-emmanuel-2026-durham-z7r9jz1a70f-w | Tommy Emmanuel | none | 7942282 | https://www.ticketliquidator.com/tickets/7942282/Tommy-Emmanuel-tickets-Sun-Dec-6-2026-Carolina-Theatre-Durham | - |
| tm-tommy-emmanuel-2026-charlotte-z7r9jz1a70f-s | Tommy Emmanuel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tommy-emmanuel-2026-atlanta-z7r9jz1a70b-i | Tommy Emmanuel | none | 7941629 | https://www.ticketliquidator.com/tickets/7941629/Tommy-Emmanuel-tickets-Wed-Dec-9-2026-Variety-Playhouse | - |
| tm-tommy-emmanuel-2026-ponte-vedra-beach-z7r9jz1a70kze | Tommy Emmanuel | none | 7941593 | https://www.ticketliquidator.com/tickets/7941593/Tommy-Emmanuel-tickets-Thu-Dec-10-2026-Ponte-Vedra-Concert-Hall | - |
| tm-tommy-emmanuel-2026-orlando-z7r9jz1a70b-e | Tommy Emmanuel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tommy-emmanuel-2026-clearwater-z7r9jz1aav8__ | Tommy Emmanuel | none | 7942284 | https://www.ticketliquidator.com/tickets/7942284/Tommy-Emmanuel-tickets-Sat-Dec-12-2026-Nancy-and-David-Bilheimer-Capitol-Theatre | - |
| tm-tommy-emmanuel-2027-saint-louis-z7r9jz1aavs4y | Tommy Emmanuel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tommy-emmanuel-2027-saint-louis-z7r9jz1aavspz | Tommy Emmanuel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tommy-emmanuel-2027-des-moines-vv1kbz_3jvg7w7g3 | Tommy Emmanuel | none | 8267993 | https://www.ticketliquidator.com/tickets/8267993/Tommy-Emmanuel-tickets-Sat-Jan-23-2027-Hoyt-Sherman-Place-Theater | - |
| tm-tommy-emmanuel-2027-madison-vv17jz_ogks7bgcu | Tommy Emmanuel | none | 8267996 | https://www.ticketliquidator.com/tickets/8267996/Tommy-Emmanuel-tickets-Sun-Jan-24-2027-Barrymore-Theatre-Madison | - |
| tm-tommy-emmanuel-2027-skokie-vv1a6zkfpgkegwg7a | Tommy Emmanuel | none | 8268004 | https://www.ticketliquidator.com/tickets/8268004/Tommy-Emmanuel-tickets-Mon-Jan-25-2027-George-Van-Dusen-Theatre-At-North-Shore-Center-For-The-Performing-Arts | - |
| tm-tommy-emmanuel-2027-champaign-z7r9jz1aavspv | Tommy Emmanuel | none | 8268012 | https://www.ticketliquidator.com/tickets/8268012/Tommy-Emmanuel-tickets-Tue-Jan-26-2027-Virginia-Theatre-Il | - |
| tm-tommy-emmanuel-2027-mckees-rocks-1apzkfngkd53yok | Tommy Emmanuel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tommy-emmanuel-2027-grand-rapids-z7r9jz1aavspe | Tommy Emmanuel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tommy-emmanuel-2027-buffalo-z7r9jz1aavspd | Tommy Emmanuel | none | 8266792 | https://www.ticketliquidator.com/tickets/8266792/Tommy-Emmanuel-tickets-Sun-Jan-31-2027-Asbury-Hall-at-Babeville | - |
| tm-tommy-emmanuel-2027-rochester-z7r9jz1aavsp7 | Tommy Emmanuel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tommy-emmanuel-2027-albany-z7r9jz1aavspa | Tommy Emmanuel | none | 8268041 | https://www.ticketliquidator.com/tickets/8268041/Tommy-Emmanuel-tickets-Wed-Feb-3-2027-Hart-Theatre-At-The-Egg | - |
| tm-tommy-emmanuel-2027-derry-z7r9jz1aavspk | Tommy Emmanuel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tommy-emmanuel-2027-fairfield-z7r9jz1aavsp6 | Tommy Emmanuel | none | 8268049 | https://www.ticketliquidator.com/tickets/8268049/Tommy-Emmanuel-tickets-Fri-Feb-5-2027-SHU-Community-Theatre | - |
| tm-tommy-emmanuel-2027-charlottesville-z7r9jz1aavspf | Tommy Emmanuel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-dublin-1abzkfigkeweheg | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-manchester-g5vhz_kduqskh | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-london-g5vhz_kew3xpo | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-cardiff-g5vhz_kdajwvp | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-birmingham-g5dzz_ke9h3b2 | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-amsterdam-z698xzbpz16evufjub | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-madrid-z698xz2qz1kumofqp | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-santa-ana-vv1aazkfwgkdn3e19 | Haiden Henderson | none | 8284317 | https://www.ticketliquidator.com/tickets/8284317/Haiden-Henderson-tickets-Mon-Apr-5-2027-Constellation-Room-at-The-Observatory-Santa-Ana | - |
| tm-haiden-henderson-2027-houston-g5diz_kdeuth4 | Haiden Henderson | none | 8284319 | https://www.ticketliquidator.com/tickets/8284319/Haiden-Henderson-tickets-Fri-Apr-9-2027-Bronze-Peacock-At-The-House-Of-Blues-Houston | - |
| tm-haiden-henderson-2027-atlanta-vvg1zz_k5fswrb | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-charlotte-g5evz_k7koqsd | Haiden Henderson | none | 8284324 | https://www.ticketliquidator.com/tickets/8284324/Haiden-Henderson-tickets-Sun-Apr-18-2027-The-Underground-Charlotte | - |
| tm-haiden-henderson-2027-washington-16vfz_kzng7lczd | Haiden Henderson | none | 8284325 | https://www.ticketliquidator.com/tickets/8284325/Haiden-Henderson-tickets-Tue-Apr-20-2027-The-Atlantis | - |
| tm-haiden-henderson-2027-philadelphia-vv16ovpgt4oz75ua7 | Haiden Henderson | none | 8284326 | https://www.ticketliquidator.com/tickets/8284326/Haiden-Henderson-tickets-Thu-Apr-22-2027-Brooklyn-Bowl-Philadelphia | - |
| tm-haiden-henderson-2027-new-york-k7vgf_k9pms1b | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-boston-vv1avzkfygkegtmcp | Haiden Henderson | none | 8284328 | https://www.ticketliquidator.com/tickets/8284328/Haiden-Henderson-tickets-Sat-Apr-24-2027-Big-Night-Live | - |
| tm-haiden-henderson-2027-toronto-1a8zkfggkd2jp9d | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-milwaukee-z7r9jz1aaeea6 | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-scott-2026-westbury-k7vgf_oh3fr0h | Dylan Scott | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-scott-2027-detroit-vv1afzkfigkddz4or | Dylan Scott | none | 8268802 | https://www.ticketliquidator.com/tickets/8268802/Dylan-Scott-tickets-Thu-Jan-21-2027-The-Fillmore-Detroit | - |
| tm-dylan-scott-2027-grand-rapids-vv1afzkfigker90br | Dylan Scott | none | 8268806 | https://www.ticketliquidator.com/tickets/8268806/Dylan-Scott-tickets-Fri-Jan-22-2027-GLC-Live-at-20-Monroe | - |
| tm-dylan-scott-2027-waukee-1ae7z_3gkl2epqo | Dylan Scott | none | 8268807 | https://www.ticketliquidator.com/tickets/8268807/Dylan-Scott-tickets-Sat-Jan-23-2027-Vibrant-Music-Hall | - |
| tm-dylan-scott-2027-sioux-falls-vv17bz_3gkbn6kzm | Dylan Scott | none | 8268810 | https://www.ticketliquidator.com/tickets/8268810/Dylan-Scott-tickets-Thu-Jan-28-2027-Sanford-Pentagon | - |
| tm-dylan-scott-2027-bismarck-z7r9jz1aavseb | Dylan Scott | none | 8261286 | https://www.ticketliquidator.com/tickets/8261286/Dylan-Scott-tickets-Fri-Jan-29-2027-Bismarck-Event-Center | - |
| tm-dylan-scott-2027-rochester-vv17bz_3gklxuys_ | Dylan Scott | none | 8268816 | https://www.ticketliquidator.com/tickets/8268816/Dylan-Scott-tickets-Sat-Jan-30-2027-Mayo-Civic-Center-Auditorium | - |
| tm-dylan-scott-2027-philadelphia-vv17fz_3gklnt6ea | Dylan Scott | none | 8268820 | https://www.ticketliquidator.com/tickets/8268820/Dylan-Scott-tickets-Thu-Feb-4-2027-The-Fillmore-Philadelphia | - |
| tm-dylan-scott-2027-wallingford-g5vvz_3ekjcji | Dylan Scott | none | 8268824 | https://www.ticketliquidator.com/tickets/8268824/Dylan-Scott-tickets-Fri-Feb-5-2027-Toyota-Oakdale-Theatre | - |
| tm-dylan-scott-2027-boston-vv1avzkftgkeyygcg | Dylan Scott | none | 8268829 | https://www.ticketliquidator.com/tickets/8268829/Dylan-Scott-tickets-Sat-Feb-6-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-dylan-scott-2027-denver-z7r9jz1aavse_ | Dylan Scott | none | 8268878 | https://www.ticketliquidator.com/tickets/8268878/Dylan-Scott-tickets-Thu-Feb-18-2027-The-Mission-Ballroom | - |
| tm-dylan-scott-2027-omaha-1aezz_3gknwydtt | Dylan Scott | none | 8268835 | https://www.ticketliquidator.com/tickets/8268835/Dylan-Scott-tickets-Fri-Feb-19-2027-Steelhouse-Omaha | - |
| tm-dylan-scott-2027-park-city-vv17bz_3gkmnbnzl | Dylan Scott | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-scott-2027-albuquerque-g5vzz_3mo5e82 | Dylan Scott | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-scott-2027-prescott-valley-1av0z_3gkmlgghm | Dylan Scott | none | 8268847 | https://www.ticketliquidator.com/tickets/8268847/Dylan-Scott-tickets-Fri-Feb-26-2027-Findlay-Toyota-Center | - |
| tm-dylan-scott-2027-chandler-1av0z_3gkshqv4x | Dylan Scott | none | 8268850 | https://www.ticketliquidator.com/tickets/8268850/Dylan-Scott-tickets-Sat-Feb-27-2027-Gila-River-Hotels-Casinos-Wild-Horse-Pass | - |
| tm-dylan-scott-2027-kennewick-vvg1hz_3ngdpch | Dylan Scott | none | 8268851 | https://www.ticketliquidator.com/tickets/8268851/Dylan-Scott-tickets-Thu-Mar-4-2027-Toyota-Center-Kennewick | - |
| tm-dylan-scott-2027-spokane-z7r9jz1aavsvm | Dylan Scott | none | 8268901 | https://www.ticketliquidator.com/tickets/8268901/Dylan-Scott-tickets-Fri-Mar-5-2027-First-Interstate-Center-for-the-Arts | - |
| tm-dylan-scott-2027-wenatchee-z7r9jz1aavs7z | Dylan Scott | none | - | - | no qualifying listing (complete catalog checked) |
| tm-valley-2027-quebec-z7r9jz1aavzfi | Valley | none | 8310947 | https://www.ticketliquidator.com/tickets/8310947/Valley-Band-tickets-Thu-Feb-4-2027-Grizzly-Fuzz | - |
| tm-valley-2027-montreal-1ad7z_3gkblokhd | Valley | none | 8274453 | https://www.ticketliquidator.com/tickets/8274453/Valley-Band-tickets-Fri-Feb-5-2027-Le-Studio-TD | - |
| tm-valley-2027-ottawa-1ad7z_3gkv11nuz | Valley | none | - | - | no qualifying listing (complete catalog checked) |
| tm-valley-2027-waterloo-z7r9jz1aavzft | Valley | none | - | - | no qualifying listing (complete catalog checked) |
| tm-valley-2027-london-1avzz_3gktpgnuv | Valley | none | - | - | no qualifying listing (complete catalog checked) |
| tm-valley-2027-chicago-z7r9jz1aavzfy | Valley | none | 8272760 | https://www.ticketliquidator.com/tickets/8272760/Valley-Band-tickets-Fri-Feb-12-2027-Park-West | - |
| tm-valley-2027-minneapolis-z7r9jz1aavzfs | Valley | none | 8272761 | https://www.ticketliquidator.com/tickets/8272761/Valley-Band-tickets-Sat-Feb-13-2027-Fine-Line-Music-Cafe | - |
| tm-valley-2027-winnipeg-1av7z_3gkbokkjd | Valley | none | 8272762 | https://www.ticketliquidator.com/tickets/8272762/Valley-Band-tickets-Tue-Feb-16-2027-Park-Theatre-Winnipeg | - |
| tm-valley-2027-regina-z7r9jz1aavzfw | Valley | none | 8272763 | https://www.ticketliquidator.com/tickets/8272763/Valley-Band-tickets-Thu-Feb-18-2027-Casino-Regina | - |
| tm-valley-2027-edmonton-1av7z_3gkbxlimr | Valley | none | - | - | no qualifying listing (complete catalog checked) |
| tm-valley-2027-calgary-1av7z_3gkb3cpp6 | Valley | none | - | - | no qualifying listing (complete catalog checked) |
| tm-valley-2027-victoria-z7r9jz1aavgoz | Valley | none | 8272766 | https://www.ticketliquidator.com/tickets/8272766/Valley-Band-tickets-Tue-Feb-23-2027-Capital-Ballroom-BC | - |
| tm-valley-2027-vancouver-1av7z_3gkb3hpv9 | Valley | none | 8272767 | https://www.ticketliquidator.com/tickets/8272767/Valley-Band-tickets-Wed-Feb-24-2027-Commodore-Ballroom | - |
| tm-valley-2027-seattle-vvg1hz_3nsltnp | Valley | none | 8272768 | https://www.ticketliquidator.com/tickets/8272768/Valley-Band-tickets-Fri-Feb-26-2027-The-Neptune-Theatre | - |
| tm-valley-2027-portland-z7r9jz1aavzfs | Valley | none | 8272769 | https://www.ticketliquidator.com/tickets/8272769/Valley-Band-tickets-Sat-Feb-27-2027-Wonder-Ballroom | - |
| tm-valley-2027-san-francisco-z7r9jz1aavzfv | Valley | none | 8272715 | https://www.ticketliquidator.com/tickets/8272715/Valley-Band-tickets-Mon-Mar-1-2027-The-Independent | - |
| tm-valley-2027-los-angeles-vv1aazkf-gkdqrhdg | Valley | none | 8272770 | https://www.ticketliquidator.com/tickets/8272770/Valley-Band-tickets-Tue-Mar-2-2027-The-Bellwether | - |
| tm-valley-2027-phoenix-z7r9jz1aavzfg | Valley | none | 8272716 | https://www.ticketliquidator.com/tickets/8272716/Valley-Band-tickets-Wed-Mar-3-2027-The-Crescent-Ballroom-Phoenix | - |
| tm-valley-2027-salt-lake-city-g5vzz_3bnvu2b | Valley | none | 8272771 | https://www.ticketliquidator.com/tickets/8272771/Valley-Band-tickets-Fri-Mar-5-2027-The-Depot-Salt-Lake-City | - |
| tm-valley-2027-denver-z7r9jz1aavzfu | Valley | none | - | - | no qualifying listing (complete catalog checked) |
| tm-valley-2027-saint-louis-vv16kzkfipkzaga2f7 | Valley | none | - | - | no qualifying listing (complete catalog checked) |
| tm-valley-2027-nashville-g5viz_3rrquu4 | Valley | none | 8272774 | https://www.ticketliquidator.com/tickets/8272774/Valley-Band-tickets-Wed-Mar-10-2027-Brooklyn-Bowl-Nashville | - |
| tm-valley-2027-atlanta-vvg1zz_32aklli | Valley | none | - | - | no qualifying listing (complete catalog checked) |
| tm-valley-2027-charlotte-g5evz_3nrncxj | Valley | none | 8272776 | https://www.ticketliquidator.com/tickets/8272776/Valley-Band-tickets-Sat-Mar-13-2027-The-Underground-Charlotte | - |
| tm-valley-2027-washington-16vfz_333g7mktl | Valley | none | 8272777 | https://www.ticketliquidator.com/tickets/8272777/Valley-Band-tickets-Sun-Mar-14-2027-930-Club | - |
| tm-valley-2027-philadelphia-vv1aezkfygkdw6utw | Valley | none | 8272778 | https://www.ticketliquidator.com/tickets/8272778/Valley-Band-tickets-Tue-Mar-16-2027-Brooklyn-Bowl-Philadelphia | - |
| tm-valley-2027-new-york-z7r9jz1aavzfm | Valley | none | 8272779 | https://www.ticketliquidator.com/tickets/8272779/Valley-Band-tickets-Wed-Mar-17-2027-Webster-Hall | - |
| tm-valley-2027-boston-vv177z_3gkmvpndn | Valley | none | 8272780 | https://www.ticketliquidator.com/tickets/8272780/Valley-Band-tickets-Thu-Mar-18-2027-Paradise-Rock-Club-Presented-by-Citizens | - |
| tm-valley-2027-toronto-1avzz_3gkdexa9o | Valley | none | - | - | no qualifying listing (complete catalog checked) |
| tm-valley-2027-amsterdam-z698xzbpz1kuzjpzo | Valley | none | - | - | no qualifying listing (complete catalog checked) |
| tm-valley-2027-bristol-g5vhz_3zkbafq | Valley | none | - | - | no qualifying listing (complete catalog checked) |
| tm-valley-2027-birmingham-g5dzz_36osp2q | Valley | none | - | - | no qualifying listing (complete catalog checked) |
| tm-valley-2027-manchester-g5vhz_ohdx77o | Valley | none | - | - | no qualifying listing (complete catalog checked) |
| tm-valley-2027-london-g5dzz_3vpsj3z | Valley | none | - | - | no qualifying listing (complete catalog checked) |
| tm-valley-2027-leeds-1adfz_3gkihrzjf | Valley | none | - | - | no qualifying listing (complete catalog checked) |
| tm-yacht-rock-revue-2026-atlanta-vvg1zz_oecocx5 | Yacht Rock Revue | none | 8244362 | https://www.ticketliquidator.com/tickets/8244362/Yacht-Rock-Revue-tickets-Sat-Dec-19-2026-Coca-Cola-Roxy | - |
| tm-yacht-rock-revue-2027-englewood-k7vgf_k9ovli- | Yacht Rock Revue | none | 8284472 | https://www.ticketliquidator.com/tickets/8284472/Yacht-Rock-Revue-tickets-Thu-Jan-7-2027-Bergen-Performing-Arts-Center | - |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31y4afw | Yacht Rock Revue | none | - | - | no qualifying listing (complete catalog checked) |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31ykyfq | Yacht Rock Revue | none | - | - | no qualifying listing (complete catalog checked) |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31y3tkt | Yacht Rock Revue | none | - | - | no qualifying listing (complete catalog checked) |
| tm-yacht-rock-revue-2027-key-west-z7r9jz1aaeefv | Yacht Rock Revue | none | 8284476 | https://www.ticketliquidator.com/tickets/8284476/Yacht-Rock-Revue-tickets-Wed-Jan-20-2027-Coffee-Butler-Amphitheater | - |
| tm-yacht-rock-revue-2027-ft-lauderdale-vvg1vz_3t9jx1c | Yacht Rock Revue | none | - | - | no qualifying listing (complete catalog checked) |
| tm-yacht-rock-revue-2027-fort-myers-z7r9jz1aaevr7 | Yacht Rock Revue | none | 8281595 | https://www.ticketliquidator.com/tickets/8281595/Yacht-Rock-Revue-tickets-Fri-Jan-22-2027-Caloosa-Sound-Amphitheater | - |
| tm-yacht-rock-revue-2027-clearwater-z7r9jz1aaevfz | Yacht Rock Revue | none | 8284479 | https://www.ticketliquidator.com/tickets/8284479/Yacht-Rock-Revue-tickets-Sat-Jan-23-2027-Ruth-Eckerd-Hall | - |
| tm-yacht-rock-revue-2027-melbourne-z7r9jz1aaee4f | Yacht Rock Revue | none | - | - | no qualifying listing (complete catalog checked) |
| tm-yacht-rock-revue-2027-atlantic-city-vv1aezkfsgkeedrng | Yacht Rock Revue | none | 8284485 | https://www.ticketliquidator.com/tickets/8284485/Yacht-Rock-Revue-tickets-Fri-Mar-5-2027-Hard-Rock-Live-At-Etess-Arena | - |
| tm-yacht-rock-revue-2027-bethlehem-vv17fz_3gkblhlrj | Yacht Rock Revue | none | - | - | no qualifying listing (complete catalog checked) |
| tm-yacht-rock-revue-2027-nashville-vv17fz_3gktkih3j | Yacht Rock Revue | none | 8284487 | https://www.ticketliquidator.com/tickets/8284487/Yacht-Rock-Revue-tickets-Fri-Mar-12-2027-Brown-County-Music-Center | - |
| tm-yacht-rock-revue-2027-nashville-g5viz_k26z3ab | Yacht Rock Revue | none | 8284489 | https://www.ticketliquidator.com/tickets/8284489/Yacht-Rock-Revue-tickets-Sat-Mar-13-2027-The-Truth | - |
| tm-yacht-rock-revue-2027-chicago-vv178z_3gkmzl562 | Yacht Rock Revue | none | - | - | no qualifying listing (complete catalog checked) |
| tm-too-many-zooz-2026-brooklyn-k7vgf_opjosbe | Too Many Zooz | none | 8235574 | https://www.ticketliquidator.com/tickets/8235574/Too-Many-Zooz-tickets-Fri-Oct-30-2026-Brooklyn-Bowl-NY | - |
| tm-too-many-zooz-2027-wroclaw-z698xzqpz1kcapprk | Too Many Zooz | none | - | - | no qualifying listing (complete catalog checked) |
| tm-too-many-zooz-2027-denver-g5vzz_kkf1pnr | Too Many Zooz | none | 8284720 | https://www.ticketliquidator.com/tickets/8284720/Too-Many-Zooz-tickets-Fri-Mar-19-2027-The-Summit-Music-Hall | - |
| tm-too-many-zooz-2027-houston-g5diz_kf4niru | Too Many Zooz | none | 8284721 | https://www.ticketliquidator.com/tickets/8284721/Too-Many-Zooz-tickets-Fri-Apr-30-2027-White-Oak-Music-Hall-Downstairs | - |
| tm-too-many-zooz-2027-tucson-z7r9jz1aavmvf | Too Many Zooz | none | 8284723 | https://www.ticketliquidator.com/tickets/8284723/Too-Many-Zooz-tickets-Thu-May-6-2027-La-Rosa-Tucson | - |
| tm-too-many-zooz-2027-seattle-vvg1hz_3tamn7s | Too Many Zooz | none | 8284730 | https://www.ticketliquidator.com/tickets/8284730/Too-Many-Zooz-tickets-Fri-May-14-2027-The-Neptune-Theatre | - |
| tm-amble-2026-seattle-z7r9jz1a70p_0 | Amble | none | 7930662 | https://www.ticketliquidator.com/tickets/7930662/Amble-tickets-Mon-Oct-26-2026-The-Showbox | - |
| tm-amble-2026-vancouver-1av7z_agkmsrf76 | Amble | none | 7936748 | https://www.ticketliquidator.com/tickets/7936748/Amble-tickets-Tue-Oct-27-2026-Orpheum-Theatre-Vancouver | - |
| tm-amble-2026-detroit-vv1afzk39gkeeybaa | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-amble-2026-toronto-1avzz_agki7dtkh | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-amble-2026-ottawa-1ad7z_agkivxxic | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-amble-2026-boston-vv177z_agkwhenya | Amble | none | 7930665 | https://www.ticketliquidator.com/tickets/7930665/Amble-tickets-Fri-Nov-6-2026-Citizens-House-Of-Blues-Boston | - |
| tm-amble-2026-brooklyn-k7vgf_ad7j_qa | Amble | none | 7930669 | https://www.ticketliquidator.com/tickets/7930669/Amble-tickets-Sat-Nov-7-2026-Brooklyn-Paramount | - |
| tm-amble-2026-philadelphia-vv17fz_agkycvjx3 | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-amble-2026-washington-1avfz_agkmvpzjt | Amble | none | 7930661 | https://www.ticketliquidator.com/tickets/7930661/Amble-tickets-Wed-Nov-11-2026-930-Club | - |
| tm-amble-2026-atlanta-z7r9jz1a70p_n | Amble | none | 7938209 | https://www.ticketliquidator.com/tickets/7938209/Amble-tickets-Fri-Nov-13-2026-Terminal-West-At-King-Plow-Arts-Center | - |
| tm-amble-2026-nashville-g5viz_gnxglok | Amble | none | 8055458 | https://www.ticketliquidator.com/tickets/8055458/Amble-tickets-Sat-Nov-14-2026-Brooklyn-Bowl-Nashville | - |
| tm-amble-2026-new-orleans-g5viz_aeqhsnh | Amble | none | 7930663 | https://www.ticketliquidator.com/tickets/7930663/Amble-tickets-Mon-Nov-16-2026-House-Of-Blues-New-Orleans | - |
| tm-amble-2026-austin-g5diz_ahr-flp | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-amble-2026-dallas-vvg1yz_161iqqj | Amble | none | 7930667 | https://www.ticketliquidator.com/tickets/7930667/Amble-tickets-Wed-Nov-18-2026-The-Echo-Lounge-and-Music-Hall | - |
| tm-amble-2026-co-mayo-1abzkfugkd8h21y | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-amble-2026-co-mayo-1abzkfugkd8hl5a | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-amble-2026-co-mayo-1abzkfugkd8hr56 | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-amble-2027-madrid-z698xz2qz1kozfaa3 | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-amble-2027-barcelona-z698xz2qz16vb40_3f | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-amble-2027-johanneshov-z698xzq2z16v73foub | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-amble-2027-amsterdam-z698xzbpz16vb-0aa8 | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-amble-2027-amsterdam-z698xzbpz1kqkuae7 | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-amble-2027-belfast-17czv0g62qetzl- | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-amble-2027-co-dublin-17kzv0g62mxw25r | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-amble-2027-glasgow-17uov0g62brrf6b | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-amble-2027-limerick-city-17kzv0g62sp3q8m | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-amble-2027-manchester-g5vhz_8upt3w4 | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-amble-2027-london-g5vhz_8sflgki | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-andrea-bocelli-2027-birmingham-1aegz_kgkwagold | Andrea Bocelli | none | - | - | no qualifying listing (complete catalog checked) |
| tm-andrea-bocelli-2027-glasgow-1adbz_k03jdzd5av | Andrea Bocelli | none | 8297135 | https://www.ticketliquidator.com/tickets/8297135/Andrea-Bocelli-tickets-Sat-Oct-9-2027-OVO-Hydro | - |
| tm-fantasia-2027-washington-1ka8vpuogaub0mr | Fantasia | none | 8293963 | https://www.ticketliquidator.com/tickets/8293963/The-Love-of-Soul-Tour-tickets-Fri-Feb-5-2027-Capital-One-Arena | - |
| tm-fantasia-2027-norfolk-vv1avzkfmgkdn5kye | Fantasia | none | 8293964 | https://www.ticketliquidator.com/tickets/8293964/The-Love-of-Soul-Tour-tickets-Sat-Feb-6-2027-Scope-Arena | - |
| tm-fantasia-2027-belmont-park-1ayzkfugkdwafjv | Fantasia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fantasia-2027-atlantic-city-vv1aezkfmgkegjgo6 | Fantasia | none | 8293966 | https://www.ticketliquidator.com/tickets/8293966/The-Love-of-Soul-Tour-tickets-Sat-Feb-13-2027-Boardwalk-Hall-Arena-Boardwalk-Hall | - |
| tm-fantasia-2027-new-orleans-g5viz_k6css2k | Fantasia | none | 8293967 | https://www.ticketliquidator.com/tickets/8293967/The-Love-of-Soul-Tour-tickets-Fri-Feb-19-2027-Smoothie-King-Center | - |
| tm-fantasia-2027-biloxi-g5viz_kxokyjj | Fantasia | none | 8293969 | https://www.ticketliquidator.com/tickets/8293969/The-Love-of-Soul-Tour-tickets-Sat-Feb-20-2027-Mississippi-Coast-Coliseum | - |
| tm-fantasia-2027-ontario-vv1aazkfzgketkqbz | Fantasia | none | 8294732 | https://www.ticketliquidator.com/tickets/8294732/The-Love-of-Soul-Tour-tickets-Fri-Mar-5-2027-Toyota-Arena-Ontario | - |
| tm-fantasia-2027-oakland-g5vyz_krz5jaf | Fantasia | none | 8294733 | https://www.ticketliquidator.com/tickets/8294733/The-Love-of-Soul-Tour-tickets-Sat-Mar-6-2027-Oakland-Arena | - |
| tm-fantasia-2027-fort-worth-vvg1yz_kbtlwh3 | Fantasia | unverify (applied) | 8293970 | https://www.ticketliquidator.com/tickets/8293970/The-Love-of-Soul-Tour-tickets-Sat-Mar-13-2027-Dickies-Arena | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-fantasia-2027-atlanta-vvg1zz_kqs5ty6 | Fantasia | none | 8293971 | https://www.ticketliquidator.com/tickets/8293971/The-Love-of-Soul-Tour-tickets-Fri-Mar-26-2027-State-Farm-Arena-GA | - |
| tm-fantasia-2027-orlando-1aefz_3gkx--7oo | Fantasia | none | 8293972 | https://www.ticketliquidator.com/tickets/8293972/The-Love-of-Soul-Tour-tickets-Sat-Mar-27-2027-Addition-Financial-Arena | - |
| tm-fantasia-2027-saint-louis-vv17bz_3gktv8xq0 | Fantasia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fantasia-2027-southaven-g5viz_krb7nuq | Fantasia | none | 8293975 | https://www.ticketliquidator.com/tickets/8293975/The-Love-of-Soul-Tour-tickets-Sat-Apr-10-2027-Landers-Center | - |
| tm-fantasia-2027-jacksonville-1axzkfwgkeynp6z | Fantasia | none | 8293976 | https://www.ticketliquidator.com/tickets/8293976/The-Love-of-Soul-Tour-tickets-Fri-Apr-16-2027-VyStar-Veterans-Memorial-Arena | - |
| tm-fantasia-2027-hollywood-vvg1vz_k9lsilt | Fantasia | none | 8293977 | https://www.ticketliquidator.com/tickets/8293977/The-Love-of-Soul-Tour-tickets-Sat-Apr-17-2027-Hard-Rock-Live-At-The-Seminole-Hard-Rock-Hotel-Casino-Hollywood | - |
| tm-fantasia-2027-phoenix-1a_zkfmgke0qgen | Fantasia | none | 8294734 | https://www.ticketliquidator.com/tickets/8294734/The-Love-of-Soul-Tour-tickets-Fri-Apr-23-2027-Mortgage-Matchup-Center | - |
| tm-fantasia-2027-charlotte-g5evz_k5a0ajy | Fantasia | none | 8293978 | https://www.ticketliquidator.com/tickets/8293978/The-Love-of-Soul-Tour-tickets-Fri-May-7-2027-Spectrum-Center | - |
| tm-fantasia-2027-raleigh-g5evz_kx4nbzb | Fantasia | none | 8293979 | https://www.ticketliquidator.com/tickets/8293979/The-Love-of-Soul-Tour-tickets-Sat-May-8-2027-Lenovo-Center | - |
| tm-fantasia-2027-chicago-vv1a7zkfugkdbhxkp | Fantasia | none | 8293980 | https://www.ticketliquidator.com/tickets/8293980/The-Love-of-Soul-Tour-tickets-Fri-May-14-2027-United-Center | - |
| tm-fantasia-2027-detroit-vv1afzkfsgkdkxfme | Fantasia | none | 8293981 | https://www.ticketliquidator.com/tickets/8293981/The-Love-of-Soul-Tour-tickets-Sat-May-15-2027-Little-Caesars-Arena | - |
| tm-fantasia-2027-providence-vv1avzkfygkdtqjz9 | Fantasia | none | 8293982 | https://www.ticketliquidator.com/tickets/8293982/The-Love-of-Soul-Tour-tickets-Fri-May-21-2027-Amica-Mutual-Pavilion | - |
| tm-fantasia-2027-newark-vv1aezkfugke-q6sn | Fantasia | none | 8293983 | https://www.ticketliquidator.com/tickets/8293983/The-Love-of-Soul-Tour-tickets-Sat-May-22-2027-Prudential-Center | - |
| tm-a-perfect-circle-2026-adelaide-1aefz_kgkrmdjgo | A Perfect Circle | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-perfect-circle-2026-brisbane-1avgz_kgklfnuo6 | A Perfect Circle | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-perfect-circle-2026-honolulu-vvg1iz_1qirhb6 | A Perfect Circle | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-perfect-circle-2027-vancouver-1k78vpcbgau8awz | A Perfect Circle | none | 8295085 | https://www.ticketliquidator.com/tickets/8295085/A-Perfect-Circle-tickets-Tue-Apr-13-2027-UBC-Doug-Mitchell-Thunderbird-Sports-Centre | - |
| tm-a-perfect-circle-2027-calgary-1av7z_kgkn55gda | A Perfect Circle | none | 8295086 | https://www.ticketliquidator.com/tickets/8295086/A-Perfect-Circle-tickets-Thu-Apr-15-2027-Scotiabank-Saddledome | - |
| tm-a-perfect-circle-2027-edmonton-1aozkfygkey3iuu | A Perfect Circle | none | 8295087 | https://www.ticketliquidator.com/tickets/8295087/A-Perfect-Circle-tickets-Sat-Apr-17-2027-Rogers-Place | - |
| tm-a-perfect-circle-2027-winnipeg-16v7z_kjkg7bgkj | A Perfect Circle | none | 8295088 | https://www.ticketliquidator.com/tickets/8295088/A-Perfect-Circle-tickets-Mon-Apr-19-2027-Canada-Life-Centre | - |
| tm-a-perfect-circle-2027-niagara-falls-1a8zkfmgkemh_mw | A Perfect Circle | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-perfect-circle-2027-niagara-falls-1a8zkfmgkemjazz | A Perfect Circle | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-perfect-circle-2027-detroit-vv16fzkfma3zac8uka | A Perfect Circle | none | 8295063 | https://www.ticketliquidator.com/tickets/8295063/A-Perfect-Circle-tickets-Sun-Apr-25-2027-Fox-Theatre-Detroit | - |
| tm-a-perfect-circle-2027-boston-vv1k7z_kr_g7rccc | A Perfect Circle | none | 8295064 | https://www.ticketliquidator.com/tickets/8295064/A-Perfect-Circle-tickets-Tue-Apr-27-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-a-perfect-circle-2027-uncasville-g5vvz_khq_fxg | A Perfect Circle | none | 8295065 | https://www.ticketliquidator.com/tickets/8295065/A-Perfect-Circle-tickets-Wed-Apr-28-2027-Mohegan-Sun-Arena-CT | - |
| tm-a-perfect-circle-2027-camden-vv1aezkfzgkdun44v | A Perfect Circle | none | 8295066 | https://www.ticketliquidator.com/tickets/8295066/A-Perfect-Circle-tickets-Fri-Apr-30-2027-Freedom-Mortgage-Pavilion | - |
| tm-a-perfect-circle-2027-newark-vv1aezkfzgkecfwzd | A Perfect Circle | none | 8295067 | https://www.ticketliquidator.com/tickets/8295067/A-Perfect-Circle-tickets-Sat-May-1-2027-Prudential-Center | - |
| tm-a-perfect-circle-2027-charlotte-g5evz_kj8b4gy | A Perfect Circle | none | 8295068 | https://www.ticketliquidator.com/tickets/8295068/A-Perfect-Circle-tickets-Tue-May-4-2027-Truliant-Amphitheater | - |
| tm-a-perfect-circle-2027-duluth-vvg1zz_kxwhwhz | A Perfect Circle | none | 8295069 | https://www.ticketliquidator.com/tickets/8295069/A-Perfect-Circle-tickets-Wed-May-5-2027-Gas-South-Arena | - |
| tm-a-perfect-circle-2027-the-woodlands-g5diz_kjdvhi6 | A Perfect Circle | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-perfect-circle-2027-nashville-g5viz_knjkaln | A Perfect Circle | none | 8295071 | https://www.ticketliquidator.com/tickets/8295071/A-Perfect-Circle-tickets-Sat-May-15-2027-Bridgestone-Arena | - |
| tm-a-perfect-circle-2027-saint-louis-vv1akzkfugkdepcmi | A Perfect Circle | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-perfect-circle-2027-cuyahoga-falls-vv1aazkfzgkeutduj | A Perfect Circle | none | 8295073 | https://www.ticketliquidator.com/tickets/8295073/A-Perfect-Circle-tickets-Thu-May-20-2027-Blossom-Music-Center | - |
| tm-a-perfect-circle-2027-chicago-vv1kjz_kf7g7lms3 | A Perfect Circle | none | 8295074 | https://www.ticketliquidator.com/tickets/8295074/A-Perfect-Circle-tickets-Sat-May-22-2027-Wintrust-Arena | - |
| tm-a-perfect-circle-2027-shakopee-1a-zkfygkehcamo | A Perfect Circle | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-perfect-circle-2027-west-valley-city-g5vzz_kk2w7ui | A Perfect Circle | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-perfect-circle-2027-seattle-vvg1hz_kfmppzs | A Perfect Circle | none | 8295077 | https://www.ticketliquidator.com/tickets/8295077/A-Perfect-Circle-tickets-Sun-May-30-2027-Climate-Pledge-Arena | - |
| tm-a-perfect-circle-2027-portland-vvg1hz_kbfgxyu | A Perfect Circle | none | 8295078 | https://www.ticketliquidator.com/tickets/8295078/A-Perfect-Circle-tickets-Tue-Jun-1-2027-Portland-Veterans-Memorial-Coliseum | - |
| tm-a-perfect-circle-2027-reno-1a9zkfygkembtoj | A Perfect Circle | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-perfect-circle-2027-daly-city-g5vyz_kwfsetp | A Perfect Circle | none | 8295079 | https://www.ticketliquidator.com/tickets/8295079/A-Perfect-Circle-tickets-Fri-Jun-4-2027-Cow-Palace | - |
| tm-a-perfect-circle-2027-hollywood-vvg1iz_kj6yzfl | A Perfect Circle | none | 8295081 | https://www.ticketliquidator.com/tickets/8295081/A-Perfect-Circle-tickets-Sun-Jun-6-2027-Hollywood-Bowl | - |
| tm-a-perfect-circle-2027-chula-vista-vvg1iz_kl8jvkq | A Perfect Circle | none | 8295080 | https://www.ticketliquidator.com/tickets/8295080/A-Perfect-Circle-tickets-Tue-Jun-8-2027-North-Island-Credit-Union-Amphitheatre | - |
| tm-a-perfect-circle-2027-las-vegas-1a9zkfmgkd8myho | A Perfect Circle | none | 8295083 | https://www.ticketliquidator.com/tickets/8295083/A-Perfect-Circle-tickets-Thu-Jun-10-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-a-perfect-circle-2027-las-vegas-1a9zkfmgkd8y8h4 | A Perfect Circle | none | 8295084 | https://www.ticketliquidator.com/tickets/8295084/A-Perfect-Circle-tickets-Fri-Jun-11-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-a-perfect-circle-2027-phoenix-1a_zkfsgkd23t56 | A Perfect Circle | none | 8295082 | https://www.ticketliquidator.com/tickets/8295082/A-Perfect-Circle-tickets-Sun-Jun-13-2027-Talking-Stick-Resort-Amphitheatre | - |
| tm-chelsea-cutler-2027-charleston-g5evz_kbudulq | Chelsea Cutler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-chelsea-cutler-2027-charlotte-g5evz_kukxezh | Chelsea Cutler | none | 8301000 | https://www.ticketliquidator.com/tickets/8301000/Chelsea-Cutler-tickets-Fri-Feb-5-2027-The-Fillmore-Charlotte | - |
| tm-chelsea-cutler-2027-washington-164zkfuqdzacd655 | Chelsea Cutler | none | 8301001 | https://www.ticketliquidator.com/tickets/8301001/Chelsea-Cutler-tickets-Sat-Feb-6-2027-930-Club | - |
| tm-chelsea-cutler-2027-washington-1avfz_kgkw7gvak | Chelsea Cutler | none | 8301002 | https://www.ticketliquidator.com/tickets/8301002/Chelsea-Cutler-tickets-Sun-Feb-7-2027-930-Club | - |
| tm-chelsea-cutler-2027-philadelphia-vv1aovpuygauryej | Chelsea Cutler | none | 8301003 | https://www.ticketliquidator.com/tickets/8301003/Chelsea-Cutler-tickets-Wed-Feb-10-2027-The-Fillmore-Philadelphia | - |
| tm-chelsea-cutler-2027-brooklyn-k7vgf_kze_vgc | Chelsea Cutler | none | 8301004 | https://www.ticketliquidator.com/tickets/8301004/Chelsea-Cutler-tickets-Fri-Feb-12-2027-Brooklyn-Paramount | - |
| tm-chelsea-cutler-2027-toronto-1avzz_kgkstt7dw | Chelsea Cutler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-chelsea-cutler-2027-detroit-vv1afzkfugkelhvg0 | Chelsea Cutler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-chelsea-cutler-2027-chicago-vv178z_kgks8xdpl | Chelsea Cutler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-chelsea-cutler-2027-minneapolis-vv17bz_kgkswys5j | Chelsea Cutler | none | 8301007 | https://www.ticketliquidator.com/tickets/8301007/Chelsea-Cutler-tickets-Tue-Feb-23-2027-The-Fillmore-Minneapolis-Presented-by-Affinity-Plus | - |
| tm-chelsea-cutler-2027-dallas-vvg1yz_kraozwg | Chelsea Cutler | none | 8301008 | https://www.ticketliquidator.com/tickets/8301008/Chelsea-Cutler-tickets-Thu-Feb-25-2027-South-Side-Ballroom-at-Gilleys | - |
| tm-chelsea-cutler-2027-phoenix-16v0z_koag7ux58 | Chelsea Cutler | none | 8301009 | https://www.ticketliquidator.com/tickets/8301009/Chelsea-Cutler-tickets-Wed-Mar-3-2027-The-Van-Buren | - |
| tm-chelsea-cutler-2027-los-angeles-vv1aazkfzgkdgncya | Chelsea Cutler | none | 8301010 | https://www.ticketliquidator.com/tickets/8301010/Chelsea-Cutler-tickets-Thu-Mar-4-2027-The-Bellwether | - |
| tm-chelsea-cutler-2027-san-diego-vvg1iz_ks1c6a3 | Chelsea Cutler | none | 8301011 | https://www.ticketliquidator.com/tickets/8301011/Chelsea-Cutler-tickets-Fri-Mar-5-2027-The-Observatory-North-Park | - |
| tm-chelsea-cutler-2027-boise-g5vzz_ksxzvbs | Chelsea Cutler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-red-clay-strays-2026-knoxville-g5viz_ae91dt_ | The Red Clay Strays | none | 7906851 | https://www.ticketliquidator.com/tickets/7906851/The-Red-Clay-Strays-tickets-Wed-Oct-28-2026-Thompson-Boling-Arena-at-Food-City-Center | - |
| tm-the-red-clay-strays-2026-birmingham-1aozk38gkdpv4cc | The Red Clay Strays | none | 7906852 | https://www.ticketliquidator.com/tickets/7906852/The-Red-Clay-Strays-tickets-Sat-Oct-31-2026-Legacy-Arena-at-The-BJCC | - |
| tm-the-red-clay-strays-2026-baton-rouge-z7r9jz1a70vj6 | The Red Clay Strays | none | 7906853 | https://www.ticketliquidator.com/tickets/7906853/The-Red-Clay-Strays-tickets-Thu-Nov-5-2026-Raising-Canes-River-Center-Arena | - |
| tm-the-red-clay-strays-2026-bossier-city-z7r9jz1a70vjf | The Red Clay Strays | none | 7906854 | https://www.ticketliquidator.com/tickets/7906854/The-Red-Clay-Strays-tickets-Fri-Nov-6-2026-Brookshire-Grocery-Arena | - |
| tm-the-red-clay-strays-2026-jonesboro-g5viz_f5t3whv | The Red Clay Strays | none | 7906855 | https://www.ticketliquidator.com/tickets/7906855/The-Red-Clay-Strays-tickets-Sun-Nov-8-2026-First-National-Bank-Arena | - |
| tm-the-red-clay-strays-2026-atlanta-vvg1zz_7rkxyy- | The Red Clay Strays | none | 7748076 | https://www.ticketliquidator.com/tickets/7748076/The-Red-Clay-Strays-tickets-Fri-Nov-13-2026-State-Farm-Arena-GA | - |
| tm-the-red-clay-strays-2026-las-vegas-z7r9jz1a70pzp | The Red Clay Strays | none | 7970241 | https://www.ticketliquidator.com/tickets/7970241/The-Red-Clay-Strays-tickets-Sat-Dec-5-2026-MGM-Grand-Garden-Arena | - |
| tm-the-red-clay-strays-2027-raleigh-g5evz_kwmllt1 | The Red Clay Strays | none | 8300893 | https://www.ticketliquidator.com/tickets/8300893/The-Red-Clay-Strays-tickets-Fri-Jan-22-2027-Lenovo-Center | - |
| tm-the-red-clay-strays-2027-columbia-g5evz_ksmjps3 | The Red Clay Strays | none | 8300894 | https://www.ticketliquidator.com/tickets/8300894/The-Red-Clay-Strays-tickets-Sat-Jan-23-2027-Colonial-Life-Arena | - |
| tm-the-red-clay-strays-2027-rosemont-vv178z_kgksozism | The Red Clay Strays | none | 8300895 | https://www.ticketliquidator.com/tickets/8300895/The-Red-Clay-Strays-tickets-Thu-Jan-28-2027-Allstate-Arena | - |
| tm-the-red-clay-strays-2027-saint-louis-vv17bz_3gkxtmyfx | The Red Clay Strays | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-red-clay-strays-2027-omaha-vv17bz_kgks0gmzs | The Red Clay Strays | none | 8300897 | https://www.ticketliquidator.com/tickets/8300897/The-Red-Clay-Strays-tickets-Sun-Jan-31-2027-CHI-Health-Center-Omaha | - |
| tm-the-red-clay-strays-2027-indianapolis-vv17fz_kgks5i1ir | The Red Clay Strays | none | 8300898 | https://www.ticketliquidator.com/tickets/8300898/The-Red-Clay-Strays-tickets-Fri-Feb-5-2027-Gainbridge-Fieldhouse | - |
| tm-the-red-clay-strays-2027-charleston-1avbz_kgkb6hkqy | The Red Clay Strays | none | 8300899 | https://www.ticketliquidator.com/tickets/8300899/The-Red-Clay-Strays-tickets-Thu-Feb-11-2027-Charleston-Coliseum-Convention-Center-Charleston | - |
| tm-the-red-clay-strays-2027-estero-vvg1vz_ks60_np | The Red Clay Strays | none | 8300900 | https://www.ticketliquidator.com/tickets/8300900/The-Red-Clay-Strays-tickets-Thu-Feb-25-2027-Hertz-Arena | - |
| tm-the-red-clay-strays-2027-saskatoon-1av7z_kgkwfc4o1 | The Red Clay Strays | none | 8300890 | https://www.ticketliquidator.com/tickets/8300890/The-Red-Clay-Strays-tickets-Thu-Mar-11-2027-SaskTel-Centre | - |
| tm-the-red-clay-strays-2027-edmonton-1av7z_kgksqo5v0 | The Red Clay Strays | none | 8300891 | https://www.ticketliquidator.com/tickets/8300891/The-Red-Clay-Strays-tickets-Fri-Mar-12-2027-Rogers-Place | - |
| tm-the-red-clay-strays-2027-winnipeg-1av7z_kgkgyzwh1 | The Red Clay Strays | none | 8300892 | https://www.ticketliquidator.com/tickets/8300892/The-Red-Clay-Strays-tickets-Sun-Mar-14-2027-Canada-Life-Centre | - |
| tm-the-red-clay-strays-2027-uncasville-g5vvz_koktqjf | The Red Clay Strays | none | 8300901 | https://www.ticketliquidator.com/tickets/8300901/The-Red-Clay-Strays-tickets-Thu-Mar-18-2027-Mohegan-Sun-Arena-CT | - |
| tm-the-red-clay-strays-2027-allentown-1adzz_kgkmg3bkj | The Red Clay Strays | none | 8300902 | https://www.ticketliquidator.com/tickets/8300902/The-Red-Clay-Strays-tickets-Fri-Mar-19-2027-PPL-Center | - |
| tm-the-red-clay-strays-2027-mobile-g5viz_k1kuycs | The Red Clay Strays | none | 8285231 | https://www.ticketliquidator.com/tickets/8285231/The-Red-Clay-Strays-tickets-Thu-Mar-25-2027-Regions-Arena | - |
| tm-the-red-clay-strays-2027-mobile-g5viz_3tpkkro | The Red Clay Strays | none | 8277070 | https://www.ticketliquidator.com/tickets/8277070/The-Red-Clay-Strays-tickets-Fri-Mar-26-2027-Regions-Arena | - |
| tm-the-red-clay-strays-2027-mobile-g5viz_k14dqes | The Red Clay Strays | none | 8282109 | https://www.ticketliquidator.com/tickets/8282109/The-Red-Clay-Strays-tickets-Sat-Mar-27-2027-Regions-Arena | - |
| tm-the-red-clay-strays-2027-bangor-vv1f7z_kqaonzdc55 | The Red Clay Strays | none | 8300903 | https://www.ticketliquidator.com/tickets/8300903/The-Red-Clay-Strays-tickets-Fri-Jul-23-2027-Maine-Savings-Amphitheater | - |
| tm-the-red-clay-strays-2027-gilford-vv177z_kgklli63o | The Red Clay Strays | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-red-clay-strays-2027-canandaigua-k7vgf_ksrxvbm | The Red Clay Strays | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-red-clay-strays-2027-clarkston-vv17oz_kgkvl-rxl | The Red Clay Strays | none | 8300906 | https://www.ticketliquidator.com/tickets/8300906/The-Red-Clay-Strays-tickets-Sat-Jul-31-2027-Pine-Knob-Music-Theatre | - |
| tm-the-red-clay-strays-2027-berkeley-g5vyz_kir6nxo | The Red Clay Strays | none | 8300907 | https://www.ticketliquidator.com/tickets/8300907/The-Red-Clay-Strays-tickets-Thu-Aug-12-2027-Greek-Theatre-UC-Berkeley | - |
| tm-the-red-clay-strays-2027-bend-vvg1hz_kwvob2j | The Red Clay Strays | none | 8300908 | https://www.ticketliquidator.com/tickets/8300908/The-Red-Clay-Strays-tickets-Sat-Aug-21-2027-Hayden-Homes-Amphitheater | - |
| tm-the-red-clay-strays-2027-boise-g5vzz_kjqef3d | The Red Clay Strays | none | 8300909 | https://www.ticketliquidator.com/tickets/8300909/The-Red-Clay-Strays-tickets-Sun-Aug-22-2027-ExtraMile-Arena | - |
| tm-the-red-clay-strays-2027-rogers-g5viz_kuooawu | The Red Clay Strays | none | 8300910 | https://www.ticketliquidator.com/tickets/8300910/The-Red-Clay-Strays-tickets-Thu-Sep-9-2027-Walmart-AMP | - |
| tm-the-red-clay-strays-2027-corpus-christi-g5diz_ksvr9iw | The Red Clay Strays | none | 8300911 | https://www.ticketliquidator.com/tickets/8300911/The-Red-Clay-Strays-tickets-Sat-Sep-18-2027-Hilliard-Center-Arena | - |
| tm-the-red-clay-strays-2027-austin-g5diz_kmbauv1 | The Red Clay Strays | none | 8300912 | https://www.ticketliquidator.com/tickets/8300912/The-Red-Clay-Strays-tickets-Sun-Sep-19-2027-Moody-Center-ATX | - |
| tm-daughtry-2026-greensburg-z7r9jz1aazman | Daughtry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-daughtry-2026-wheeling-z7r9jz1aav9u8 | Daughtry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-daughtry-2026-nashville-vvg1fz_gmyo5fy | Daughtry | none | 8056802 | https://www.ticketliquidator.com/tickets/8056802/Daughtry-tickets-Thu-Oct-29-2026-Brown-County-Music-Center | - |
| tm-daughtry-2026-la-vista-17fzv0g6gnabvqc | Daughtry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-daughtry-2026-des-moines-vvg1bz_gwkrfot | Daughtry | none | 8056805 | https://www.ticketliquidator.com/tickets/8056805/Daughtry-tickets-Sun-Nov-1-2026-Hoyt-Sherman-Place-Theater | - |
| tm-daughtry-2026-kansas-city-vvg1bz_gsftuwt | Daughtry | none | 8056806 | https://www.ticketliquidator.com/tickets/8056806/Daughtry-tickets-Tue-Nov-3-2026-Uptown-Theater-KC | - |
| tm-daughtry-2026-oklahoma-city-z7r9jz1a7px8p | Daughtry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-daughtry-2026-las-vegas-z7r9jz1a7pxak | Daughtry | none | 8057262 | https://www.ticketliquidator.com/tickets/8057262/Daughtry-tickets-Sat-Nov-7-2026-Pearl-Concert-Theater-At-Palms-Casino-Resort | - |
| tm-daughtry-2026-napa-g5vyz_gnjfn19 | Daughtry | none | 8056807 | https://www.ticketliquidator.com/tickets/8056807/Daughtry-tickets-Sun-Nov-8-2026-Uptown-Theatre-Napa | - |
| tm-daughtry-2026-anaheim-vvg10z_grix-n9 | Daughtry | none | 8056808 | https://www.ticketliquidator.com/tickets/8056808/Daughtry-tickets-Tue-Nov-10-2026-DigAlert-Grove-of-Anaheim | - |
| tm-daughtry-2026-tucson-z7r9jz1a7pxk_ | Daughtry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-daughtry-2026-san-antonio-g5diz_gsupj1v | Daughtry | none | 8056809 | https://www.ticketliquidator.com/tickets/8056809/Daughtry-tickets-Fri-Nov-13-2026-The-Aztec-Theatre | - |
| tm-daughtry-2026-dallas-vvg1yz_gea3drr | Daughtry | none | 8056810 | https://www.ticketliquidator.com/tickets/8056810/Daughtry-tickets-Sat-Nov-14-2026-Majestic-Theatre-Dallas | - |
| tm-daughtry-2027-pine-bluff-g5viz_kyugjqo | Daughtry | none | 8295475 | https://www.ticketliquidator.com/tickets/8295475/Daughtry-tickets-Sat-Jan-23-2027-Saracen-Casino-Resort | - |
| tm-daughtry-2027-orlando-1kfovpgdga2huxq | Daughtry | none | 8295476 | https://www.ticketliquidator.com/tickets/8295476/Daughtry-tickets-Wed-Jan-27-2027-Hard-Rock-Live-Orlando | - |
| tm-daughtry-2027-biloxi-g5viz_ksbnt-6 | Daughtry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-daughtry-2027-houston-g5diz_kxwqqcm | Daughtry | none | 8295478 | https://www.ticketliquidator.com/tickets/8295478/Daughtry-tickets-Sun-Jan-31-2027-Bayou-Music-Center | - |
| tm-daughtry-2027-corpus-christi-g5diz_kxutltw | Daughtry | none | 8295479 | https://www.ticketliquidator.com/tickets/8295479/Daughtry-tickets-Tue-Feb-2-2027-Selena-Auditorium | - |
| tm-daughtry-2027-sacramento-g5vyz_k60xnfe | Daughtry | none | 8295481 | https://www.ticketliquidator.com/tickets/8295481/Daughtry-tickets-Mon-Feb-8-2027-Channel-24 | - |
| tm-daughtry-2027-denver-g5vzz_knzyqbr | Daughtry | none | 8295482 | https://www.ticketliquidator.com/tickets/8295482/Daughtry-tickets-Wed-Feb-10-2027-Paramount-Theatre-Denver | - |
| tm-daughtry-2027-durant-vvg1yz_kgp_ixc | Daughtry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-daughtry-2027-saint-louis-vv1fvovpgtjkz75857 | Daughtry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-daughtry-2027-duluth-vv1akzkfmgkdcbe8w | Daughtry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-daughtry-2027-rockford-16e7z_kkfg7v38v | Daughtry | none | 8295486 | https://www.ticketliquidator.com/tickets/8295486/Daughtry-tickets-Sat-Feb-20-2027-Hard-Rock-Live-Rockford | - |
| tm-daughtry-2027-gary-vv1aazkfygkesuefr | Daughtry | none | 8295487 | https://www.ticketliquidator.com/tickets/8295487/Daughtry-tickets-Sun-Feb-21-2027-Hard-Rock-Live-Northern-Indiana | - |
| tm-daughtry-2027-detroit-vv1kezvpg_ga5zp8l | Daughtry | none | 8295488 | https://www.ticketliquidator.com/tickets/8295488/Daughtry-tickets-Tue-Feb-23-2027-The-Fillmore-Detroit | - |
| tm-daughtry-2027-hershey-vv1aezkfmgkdtwgls | Daughtry | none | 8295489 | https://www.ticketliquidator.com/tickets/8295489/Daughtry-tickets-Fri-Feb-26-2027-Hershey-Theatre | - |
| tm-daughtry-2027-bethlehem-vv1aovpg_ga5ljzy | Daughtry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-daughtry-2027-charleston-g5evz_keoc7ae | Daughtry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-daughtry-2027-nashville-g5viz_khosea- | Daughtry | none | 8295492 | https://www.ticketliquidator.com/tickets/8295492/Daughtry-tickets-Sat-Mar-6-2027-The-Truth | - |
| tm-daughtry-2027-atlanta-vvg1zz_klwyfxu | Daughtry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-andrea-bocelli-2027-chorzow-z698xzqpz16v7kfvze | Andrea Bocelli | none | - | - | no qualifying listing (complete catalog checked) |
| tm-andrea-bocelli-2027-london-1adfz_kgkbcpkr9 | Andrea Bocelli | none | - | - | no qualifying listing (complete catalog checked) |
| tm-andrea-bocelli-2027-manchester-1amzkfzgkd7qkyk | Andrea Bocelli | none | 8293403 | https://www.ticketliquidator.com/tickets/8293403/Andrea-Bocelli-tickets-Tue-Oct-5-2027-Co-Op-Live | - |
| tm-blondshell-2027-vancouver-16ozkfzopzauakea | Blondshell | none | 8295784 | https://www.ticketliquidator.com/tickets/8295784/Blondshell-tickets-Sat-Mar-6-2027-Commodore-Ballroom | - |
| tm-blondshell-2027-asbury-park-k7vgf_knjlgim | Blondshell | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blondshell-2027-madison-vv1kvyvpc_ga55f1w | Blondshell | none | 8295778 | https://www.ticketliquidator.com/tickets/8295778/Blondshell-tickets-Sat-May-15-2027-Majestic-Theatre-Madison | - |
| tm-blondshell-2027-detroit-vv1afzkfmgkdgjzny | Blondshell | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blondshell-2027-saint-louis-vv1kbz_kjdg7cpvx | Blondshell | none | - | - | no qualifying listing (complete catalog checked) |
| tm-death-cab-for-cutie-2027-detroit-z7r9jz1aaeefp | Death Cab for Cutie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hilary-duff-2027-sunrise-z7r9jz1aaeve7 | Hilary Duff | none | 8284543 | https://www.ticketliquidator.com/tickets/8284543/Hilary-Duff-tickets-Fri-Oct-1-2027-Amerant-Bank-Arena | - |
| tm-hilary-duff-2027-cleveland-z7r9jz1aaevea | Hilary Duff | none | 8284549 | https://www.ticketliquidator.com/tickets/8284549/Hilary-Duff-tickets-Wed-Oct-13-2027-Rocket-Arena | - |
| tm-hilary-duff-2027-des-moines-z7r9jz1aaevep | Hilary Duff | none | 8284569 | https://www.ticketliquidator.com/tickets/8284569/Hilary-Duff-tickets-Sun-Nov-14-2027-Caseys-Center | - |
| tm-hilary-duff-2027-anaheim-vv170z_kgkrlzqwi | Hilary Duff | none | 8301234 | https://www.ticketliquidator.com/tickets/8301234/Hilary-Duff-tickets-Sun-Nov-21-2027-Honda-Center | - |
| tm-lizzy-mcalpine-2027-torrensville-1akzkfggkepdplf | Lizzy McAlpine | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lizzy-mcalpine-2027-london-g5dzz_krvbn6w | Lizzy McAlpine | none | 8297685 | https://www.ticketliquidator.com/tickets/8297685/Lizzy-McAlpine-tickets-Wed-Mar-31-2027-O2-Academy-Brixton | - |
| tm-lizzy-mcalpine-2027-london-g5dzz_kslx95p | Lizzy McAlpine | none | 8297134 | https://www.ticketliquidator.com/tickets/8297134/Lizzy-McAlpine-tickets-Thu-Apr-1-2027-O2-Academy-Brixton | - |
| tm-lizzy-mcalpine-2027-london-g5dzz_kscgmsk | Lizzy McAlpine | none | 8299948 | https://www.ticketliquidator.com/tickets/8299948/Lizzy-McAlpine-tickets-Fri-Apr-2-2027-O2-Academy-Brixton | - |
| tm-lizzy-mcalpine-2027-birmingham-g5dzz_kkek096 | Lizzy McAlpine | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lizzy-mcalpine-2027-glasgow-g5dzz_kwtjarb | Lizzy McAlpine | none | 8299949 | https://www.ticketliquidator.com/tickets/8299949/Lizzy-McAlpine-tickets-Sat-Apr-10-2027-O2-Academy-Glasgow | - |
| tm-lizzy-mcalpine-2027-dallas-z7r9jz1aaekq3 | Lizzy McAlpine | none | 8287525 | https://www.ticketliquidator.com/tickets/8287525/Lizzy-McAlpine-tickets-Fri-Apr-30-2027-The-Bomb-Factory | - |
| tm-lizzy-mcalpine-2027-atlanta-z7r9jz1aaea-b | Lizzy McAlpine | none | 8300134 | https://www.ticketliquidator.com/tickets/8300134/Lizzy-McAlpine-tickets-Mon-May-3-2027-Fabulous-Fox-Theatre-Atlanta | - |
| tm-lizzy-mcalpine-2027-columbus-z7r9jz1aaea09 | Lizzy McAlpine | none | 8287526 | https://www.ticketliquidator.com/tickets/8287526/Lizzy-McAlpine-tickets-Thu-May-6-2027-Palace-Theatre-Columbus | - |
| tm-lizzy-mcalpine-2027-milwaukee-z7r9jz1aaea0_ | Lizzy McAlpine | none | 8287527 | https://www.ticketliquidator.com/tickets/8287527/Lizzy-McAlpine-tickets-Mon-May-10-2027-Riverside-Theater-WI | - |
| tm-lizzy-mcalpine-2027-minneapolis-vv1akzkfsgkdlgq7t | Lizzy McAlpine | none | 8300364 | https://www.ticketliquidator.com/tickets/8300364/Lizzy-McAlpine-tickets-Thu-May-13-2027-State-Theatre-MN | - |
| tm-lizzy-mcalpine-2027-kansas-city-z7r9jz1aaekqk | Lizzy McAlpine | none | 8287528 | https://www.ticketliquidator.com/tickets/8287528/Lizzy-McAlpine-tickets-Mon-May-17-2027-The-Midland-Theatre-MO | - |
| tm-lizzy-mcalpine-2027-oklahoma-city-z7r9jz1aaea-p | Lizzy McAlpine | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lizzy-mcalpine-2027-boston-vv1a8vpuzga1bypi | Lizzy McAlpine | none | 8298345 | https://www.ticketliquidator.com/tickets/8298345/Lizzy-McAlpine-tickets-Mon-Jun-21-2027-Agganis-Arena | - |
| tm-lizzy-mcalpine-2027-morrison-z7r9jz1aaeax6 | Lizzy McAlpine | none | 8287530 | https://www.ticketliquidator.com/tickets/8287530/Lizzy-McAlpine-tickets-Tue-Jul-6-2027-Red-Rocks-Amphitheatre | - |
| tm-dinosaur-jr-2027-philadelphia-z7r9jz1aavk18 | Dinosaur Jr. | none | 8326607 | https://www.ticketliquidator.com/tickets/8326607/Dinosaur-Jr-tickets-Sat-Feb-13-2027-Union-Transfer | - |
| tm-needtobreathe-2027-kansas-city-z7r9jz1aaek_i | NEEDTOBREATHE | none | 8291002 | https://www.ticketliquidator.com/tickets/8291002/Needtobreathe-tickets-Tue-Feb-23-2027-The-Midland-Theatre-MO | - |
| tm-needtobreathe-2027-lancaster-z7r9jz1aaek_t | NEEDTOBREATHE | none | 8291003 | https://www.ticketliquidator.com/tickets/8291003/Needtobreathe-tickets-Mon-Mar-1-2027-American-Music-Theatre | - |
| tm-foy-vance-2026-san-francisco-z7r9jz1aae4_v | Foy Vance | none | 7748035 | https://www.ticketliquidator.com/tickets/7748035/Foy-Vance-tickets-Sun-Nov-8-2026-The-Great-American-Music-Hall | - |
| tm-the-lemonheads-2027-tampa-z7r9jz1aavwob | The Lemonheads | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tommy-emmanuel-2027-vancouver-1aozkfugkdvinj7 | Tommy Emmanuel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tommy-emmanuel-2027-calgary-1k78vpuega13dcp | Tommy Emmanuel | none | 8318327 | https://www.ticketliquidator.com/tickets/8318327/Tommy-Emmanuel-tickets-Sun-Mar-14-2027-Southern-Alberta-Jubilee-Auditorium | - |
| tm-tommy-emmanuel-2027-winnipeg-1k78vpupga1vvti | Tommy Emmanuel | none | 8306364 | https://www.ticketliquidator.com/tickets/8306364/Tommy-Emmanuel-tickets-Wed-Mar-17-2027-Burton-Cummings-Theatre | - |
| tm-tommy-emmanuel-2027-ottawa-1aszkfgjd0vzecc | Tommy Emmanuel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tommy-emmanuel-2027-toronto-z7r9jz1aaeox3 | Tommy Emmanuel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-yacht-rock-revue-2027-jacksonville-z7r9jz1aaeebg | Yacht Rock Revue | none | 8284483 | https://www.ticketliquidator.com/tickets/8284483/Yacht-Rock-Revue-tickets-Fri-Jan-29-2027-Florida-Theatre-Jacksonville | - |
| tm-too-many-zooz-2026-buffalo-z7r9jz1aav60y | Too Many Zooz | none | 8236208 | https://www.ticketliquidator.com/tickets/8236208/Too-Many-Zooz-tickets-Fri-Nov-13-2026-Asbury-Hall-at-Babeville | - |
| tm-amble-2026-co-mayo-1abzkfugkd8w25a | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-amble-2026-co-mayo-1abzkfugkd8wl5u | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fantasia-2027-las-vegas-z7r9jz1aaef4j | Fantasia | none | 8294558 | https://www.ticketliquidator.com/tickets/8294558/The-Love-of-Soul-Tour-tickets-Sat-Apr-24-2027-MGM-Grand-Garden-Arena | - |
| tm-a-perfect-circle-2027-grand-prairie-z7r9jz1aae8a6 | A Perfect Circle | none | 8295092 | https://www.ticketliquidator.com/tickets/8295092/A-Perfect-Circle-tickets-Sat-May-8-2027-Texas-Trust-CU-Theatre-at-Grand-Prairie | - |
| tm-a-perfect-circle-2027-morrison-z7r9jz1aae8af | A Perfect Circle | none | 8295091 | https://www.ticketliquidator.com/tickets/8295091/A-Perfect-Circle-tickets-Thu-May-27-2027-Red-Rocks-Amphitheatre | - |
| tm-daughtry-2027-melbourne-z7r9jz1aae83v | Daughtry | none | 8295552 | https://www.ticketliquidator.com/tickets/8295552/Daughtry-tickets-Mon-Jan-25-2027-King-Center-For-The-Performing-Arts | - |
| tm-daughtry-2027-clearwater-z7r9jz1aae83e | Daughtry | none | 8295553 | https://www.ticketliquidator.com/tickets/8295553/Daughtry-tickets-Thu-Jan-28-2027-Ruth-Eckerd-Hall | - |
| tm-daughtry-2027-austin-z7r9jz1aae83d | Daughtry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-daughtry-2027-ventura-z7r9jz1aae837 | Daughtry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-daughtry-2027-cedar-rapids-z7r9jz1aae83a | Daughtry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-daughtry-2027-eau-claire-z7r9jz1aae83k | Daughtry | none | 8295556 | https://www.ticketliquidator.com/tickets/8295556/Daughtry-tickets-Thu-Feb-18-2027-RCU-Theatre-At-Pablo-Center-at-the-Confluence | - |
| tm-daughtry-2027-orono-z7r9jz1aae836 | Daughtry | none | 8295558 | https://www.ticketliquidator.com/tickets/8295558/Daughtry-tickets-Mon-Mar-1-2027-Hutchins-Concert-Hall-At-Collins-Center-for-the-Arts | - |
| tm-daughtry-2027-charlottesville-z7r9jz1aae83f | Daughtry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-greta-van-fleet-2027-savannah-vvg1zz_kdabkfs | Greta Van Fleet | none | 8303343 | https://www.ticketliquidator.com/tickets/8303343/Greta-Van-Fleet-tickets-Wed-Feb-3-2027-Enmarket-Arena | - |
| tm-greta-van-fleet-2027-tampa-vvg1vz_kmcwtil | Greta Van Fleet | none | 8303344 | https://www.ticketliquidator.com/tickets/8303344/Greta-Van-Fleet-tickets-Fri-Feb-5-2027-Benchmark-International-Arena | - |
| tm-greta-van-fleet-2027-jacksonville-1aefz_kgkdyuafx | Greta Van Fleet | none | 8303345 | https://www.ticketliquidator.com/tickets/8303345/Greta-Van-Fleet-tickets-Sat-Feb-6-2027-VyStar-Veterans-Memorial-Arena | - |
| tm-greta-van-fleet-2027-atlanta-vvg1zz_kmneaip | Greta Van Fleet | none | 8303346 | https://www.ticketliquidator.com/tickets/8303346/Greta-Van-Fleet-tickets-Tue-Feb-9-2027-State-Farm-Arena-GA | - |
| tm-greta-van-fleet-2027-nashville-g5viz_kzhjzwy | Greta Van Fleet | none | 8303347 | https://www.ticketliquidator.com/tickets/8303347/Greta-Van-Fleet-tickets-Wed-Feb-10-2027-Bridgestone-Arena | - |
| tm-greta-van-fleet-2027-rosemont-vv178z_kgkmrjctr | Greta Van Fleet | none | 8303349 | https://www.ticketliquidator.com/tickets/8303349/Greta-Van-Fleet-tickets-Fri-Feb-12-2027-Allstate-Arena | - |
| tm-greta-van-fleet-2027-omaha-vv17bz_kgkmgzcnp | Greta Van Fleet | none | 8303350 | https://www.ticketliquidator.com/tickets/8303350/Greta-Van-Fleet-tickets-Sat-Feb-13-2027-CHI-Health-Center-Omaha | - |
| tm-greta-van-fleet-2027-minneapolis-vv17bz_kgku0ofzs | Greta Van Fleet | none | 8303351 | https://www.ticketliquidator.com/tickets/8303351/Greta-Van-Fleet-tickets-Mon-Feb-15-2027-Target-Center | - |
| tm-greta-van-fleet-2027-louisville-1avbz_kgkbymb5h | Greta Van Fleet | none | 8303353 | https://www.ticketliquidator.com/tickets/8303353/Greta-Van-Fleet-tickets-Fri-Feb-19-2027-KFC-Yum-Center | - |
| tm-greta-van-fleet-2027-pittsburgh-1avbz_kgkmosrsz | Greta Van Fleet | none | 8303354 | https://www.ticketliquidator.com/tickets/8303354/Greta-Van-Fleet-tickets-Sat-Feb-20-2027-PPG-Paints-Arena | - |
| tm-greta-van-fleet-2027-detroit-vv17oz_kgkwt_pf2 | Greta Van Fleet | none | 8303355 | https://www.ticketliquidator.com/tickets/8303355/Greta-Van-Fleet-tickets-Tue-Mar-2-2027-Little-Caesars-Arena | - |
| tm-greta-van-fleet-2027-boston-vv177z_kgknm09yr | Greta Van Fleet | none | 8303357 | https://www.ticketliquidator.com/tickets/8303357/Greta-Van-Fleet-tickets-Fri-Mar-5-2027-TD-Garden | - |
| tm-greta-van-fleet-2027-albany-k7vgf_kbmaa9o | Greta Van Fleet | none | 8303358 | https://www.ticketliquidator.com/tickets/8303358/Greta-Van-Fleet-tickets-Sat-Mar-6-2027-MVP-Arena | - |
| tm-greta-van-fleet-2027-brooklyn-1adzz_kgkljmams | Greta Van Fleet | none | 8303359 | https://www.ticketliquidator.com/tickets/8303359/Greta-Van-Fleet-tickets-Mon-Mar-8-2027-Barclays-Center | - |
| tm-greta-van-fleet-2027-philadelphia-1adzz_kgkv_zy6y | Greta Van Fleet | none | 8303360 | https://www.ticketliquidator.com/tickets/8303360/Greta-Van-Fleet-tickets-Wed-Mar-10-2027-Xfinity-Mobile-Arena | - |
| tm-greta-van-fleet-2027-charlotte-g5evz_kd5pkxs | Greta Van Fleet | none | 8303361 | https://www.ticketliquidator.com/tickets/8303361/Greta-Van-Fleet-tickets-Fri-Mar-12-2027-Spectrum-Center | - |
| tm-greta-van-fleet-2027-knoxville-g5viz_fat50pa | Greta Van Fleet | none | 8303362 | https://www.ticketliquidator.com/tickets/8303362/Greta-Van-Fleet-tickets-Sat-Mar-13-2027-Thompson-Boling-Arena-at-Food-City-Center | - |
| tm-greta-van-fleet-2027-fort-worth-vvg1yz_f6vci7r | Greta Van Fleet | unverify (applied) | 8303363 | https://www.ticketliquidator.com/tickets/8303363/Greta-Van-Fleet-tickets-Mon-Mar-15-2027-Dickies-Arena | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-greta-van-fleet-2027-tulsa-1aezz_kgkdnv4sg | Greta Van Fleet | none | 8303364 | https://www.ticketliquidator.com/tickets/8303364/Greta-Van-Fleet-tickets-Tue-Mar-16-2027-BOK-Center | - |
| tm-greta-van-fleet-2027-anaheim-vv170z_kgkm7preh | Greta Van Fleet | none | 8303365 | https://www.ticketliquidator.com/tickets/8303365/Greta-Van-Fleet-tickets-Fri-Mar-19-2027-Honda-Center | - |
| tm-greta-van-fleet-2027-phoenix-1av0z_kgkbck9ok | Greta Van Fleet | none | 8303366 | https://www.ticketliquidator.com/tickets/8303366/Greta-Van-Fleet-tickets-Sat-Mar-20-2027-Mortgage-Matchup-Center | - |
| tm-greta-van-fleet-2027-reno-1avjz_kgkmchefe | Greta Van Fleet | none | 8303367 | https://www.ticketliquidator.com/tickets/8303367/Greta-Van-Fleet-tickets-Mon-Mar-22-2027-Reno-Events-Center | - |
| tm-greta-van-fleet-2027-seattle-vvg1hz_km-zrdh | Greta Van Fleet | none | 8303368 | https://www.ticketliquidator.com/tickets/8303368/Greta-Van-Fleet-tickets-Wed-Mar-24-2027-Climate-Pledge-Arena | - |
| tm-greta-van-fleet-2027-portland-vvg1hz_kle7js7 | Greta Van Fleet | none | 8303369 | https://www.ticketliquidator.com/tickets/8303369/Greta-Van-Fleet-tickets-Thu-Mar-25-2027-Moda-Center-at-the-Rose-Quarter | - |
| tm-greta-van-fleet-2027-boise-g5vzz_fkffj8x | Greta Van Fleet | none | 8303370 | https://www.ticketliquidator.com/tickets/8303370/Greta-Van-Fleet-tickets-Sat-Mar-27-2027-ExtraMile-Arena | - |
| tm-greta-van-fleet-2027-denver-g5vzz_kbjtioy | Greta Van Fleet | none | 8303372 | https://www.ticketliquidator.com/tickets/8303372/Greta-Van-Fleet-tickets-Tue-Mar-30-2027-Ball-Arena | - |
| tm-greta-van-fleet-2027-munich-z698xzc2z16v70efz3 | Greta Van Fleet | none | - | - | no qualifying listing (complete catalog checked) |
| tm-greta-van-fleet-2027-assago-zg9rmiynyz7k7a | Greta Van Fleet | none | - | - | no qualifying listing (complete catalog checked) |
| tm-greta-van-fleet-2027-hamburg-z698xzc2z1k83jea7 | Greta Van Fleet | none | - | - | no qualifying listing (complete catalog checked) |
| tm-greta-van-fleet-2027-berlin-z698xzc2z1kfv0zvs | Greta Van Fleet | none | - | - | no qualifying listing (complete catalog checked) |
| tm-greta-van-fleet-2027-amsterdam-z698xzbpz1kpzobgo | Greta Van Fleet | none | 8326626 | https://www.ticketliquidator.com/tickets/8326626/Greta-Van-Fleet-tickets-Mon-May-24-2027-Ziggo-Dome | - |
| tm-greta-van-fleet-2027-forest-brussels-z698xzg2z16ez30gvn | Greta Van Fleet | none | - | - | no qualifying listing (complete catalog checked) |
| tm-greta-van-fleet-2027-london-1adfz_kgkmuet5g | Greta Van Fleet | none | - | - | no qualifying listing (complete catalog checked) |
| tm-greta-van-fleet-2027-birmingham-1aegz_kgkmz0sov | Greta Van Fleet | none | - | - | no qualifying listing (complete catalog checked) |
| tm-greta-van-fleet-2027-manchester-1adjz_kgkbyud70 | Greta Van Fleet | none | 8303348 | https://www.ticketliquidator.com/tickets/8303348/Greta-Van-Fleet-tickets-Tue-Jun-1-2027-Co-Op-Live | - |
| tm-greta-van-fleet-2027-dublin-1abzkfmgkes3wyd | Greta Van Fleet | add (applied) | 8341562 | https://www.ticketliquidator.com/tickets/8341562/Greta-Van-Fleet-tickets-Fri-Jun-4-2027-3Arena-Dublin | - |
| tm-greta-van-fleet-2027-vancouver-1av7z_kgkw_ogty | Greta Van Fleet | none | 8303387 | https://www.ticketliquidator.com/tickets/8303387/Greta-Van-Fleet-tickets-Mon-Jul-5-2027-Rogers-Arena | - |
| tm-greta-van-fleet-2027-edmonton-1av7z_kgkmfujae | Greta Van Fleet | none | 8303388 | https://www.ticketliquidator.com/tickets/8303388/Greta-Van-Fleet-tickets-Wed-Jul-7-2027-Rogers-Place | - |
| tm-greta-van-fleet-2027-calgary-1av7z_kgkum7iwv | Greta Van Fleet | none | 8303389 | https://www.ticketliquidator.com/tickets/8303389/Greta-Van-Fleet-tickets-Thu-Jul-8-2027-Scotiabank-Saddledome | - |
| tm-greta-van-fleet-2027-winnipeg-1av7z_kgkmeitov | Greta Van Fleet | none | 8303390 | https://www.ticketliquidator.com/tickets/8303390/Greta-Van-Fleet-tickets-Sat-Jul-10-2027-Canada-Life-Centre | - |
| tm-greta-van-fleet-2027-kansas-city-vv1akzk4vgkdr0kg1 | Greta Van Fleet | none | 8303373 | https://www.ticketliquidator.com/tickets/8303373/Greta-Van-Fleet-tickets-Tue-Jul-13-2027-T-Mobile-Center | - |
| tm-greta-van-fleet-2027-saint-louis-vv17bz_kgkm_stkv | Greta Van Fleet | none | - | - | no qualifying listing (complete catalog checked) |
| tm-greta-van-fleet-2027-columbus-vv1aazk4vgkexl1ix | Greta Van Fleet | none | 8303375 | https://www.ticketliquidator.com/tickets/8303375/Greta-Van-Fleet-tickets-Fri-Jul-16-2027-Nationwide-Arena | - |
| tm-greta-van-fleet-2027-noblesville-vv17fz_kgkmuku1m | Greta Van Fleet | none | 8303376 | https://www.ticketliquidator.com/tickets/8303376/Greta-Van-Fleet-tickets-Sat-Jul-17-2027-Ruoff-Music-Center | - |
| tm-greta-van-fleet-2027-raleigh-g5evz_f6z0uw6 | Greta Van Fleet | none | 8303377 | https://www.ticketliquidator.com/tickets/8303377/Greta-Van-Fleet-tickets-Tue-Jul-20-2027-Lenovo-Center | - |
| tm-greta-van-fleet-2027-columbia-1avfz_kgkss_xxt | Greta Van Fleet | none | 8303378 | https://www.ticketliquidator.com/tickets/8303378/Greta-Van-Fleet-tickets-Wed-Jul-21-2027-Merriweather-Post-Pavilion | - |
| tm-greta-van-fleet-2027-hershey-vv17fz_kgkdofs3p | Greta Van Fleet | none | 8303379 | https://www.ticketliquidator.com/tickets/8303379/Greta-Van-Fleet-tickets-Fri-Jul-23-2027-Giant-Center | - |
| tm-greta-van-fleet-2027-uncasville-g5vvz_kwzs711 | Greta Van Fleet | none | 8303380 | https://www.ticketliquidator.com/tickets/8303380/Greta-Van-Fleet-tickets-Sat-Jul-24-2027-Mohegan-Sun-Arena-CT | - |
| tm-greta-van-fleet-2027-gilford-vv177z_kgkni4das | Greta Van Fleet | none | - | - | no qualifying listing (complete catalog checked) |
| tm-greta-van-fleet-2027-laval-1ad7z_kgksakup4 | Greta Van Fleet | none | 8303391 | https://www.ticketliquidator.com/tickets/8303391/Greta-Van-Fleet-tickets-Wed-Jul-28-2027-Place-Bell | - |
| tm-greta-van-fleet-2027-toronto-1avzz_kgkswyehx | Greta Van Fleet | none | - | - | no qualifying listing (complete catalog checked) |
| tm-greta-van-fleet-2027-grand-rapids-vv17oz_kgkwlsfog | Greta Van Fleet | none | 8303382 | https://www.ticketliquidator.com/tickets/8303382/Greta-Van-Fleet-tickets-Sat-Jul-31-2027-Acrisure-Amphitheater | - |
| tm-fontaines-d-c-2026-casalecchio-di-reno-bologna-zg9rmiynyzdk1k | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2026-merksem-antwerpen-z698xzg2z16ve_oz7v | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2026-liverpool-1adjz_8gkv_dtbp | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2026-leeds-g5vhz_8b5sfcc | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2026-birmingham-1aegz_8gkdxxlc2 | Fontaines D.C. | none | 8243928 | https://www.ticketliquidator.com/tickets/8243928/Fontaines-DC-tickets-Wed-Nov-25-2026-Utilita-Arena-Birmingham | - |
| tm-fontaines-d-c-2026-london-1agzkfogkenxxaj | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-boston-vv1avzkfggkedosqi | Fontaines D.C. | none | 8303807 | https://www.ticketliquidator.com/tickets/8303807/Fontaines-DC-tickets-Fri-Apr-23-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-fontaines-d-c-2027-philadelphia-vv17fz_kgks-xsxp | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-detroit-vv17oz_kgksew9wu | Fontaines D.C. | none | 8303810 | https://www.ticketliquidator.com/tickets/8303810/Fontaines-DC-tickets-Tue-Apr-27-2027-Fox-Theatre-Detroit | - |
| tm-fontaines-d-c-2027-chicago-vv1k8z_fkfg7zjno | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-milwaukee-vv17jz_kgkloizcl | Fontaines D.C. | none | 8303812 | https://www.ticketliquidator.com/tickets/8303812/Fontaines-DC-tickets-Fri-Apr-30-2027-Landmark-Credit-Union-Live | - |
| tm-fontaines-d-c-2027-minneapolis-vv17bz_kgkijqu5x | Fontaines D.C. | none | 8303813 | https://www.ticketliquidator.com/tickets/8303813/Fontaines-DC-tickets-Sat-May-1-2027-The-Armory-Minneapolis | - |
| tm-fontaines-d-c-2027-vancouver-1av7z_kgkupzetr | Fontaines D.C. | none | 8303822 | https://www.ticketliquidator.com/tickets/8303822/Fontaines-DC-tickets-Wed-May-5-2027-UBC-Doug-Mitchell-Thunderbird-Sports-Centre | - |
| tm-fontaines-d-c-2027-seattle-vvg1hz_kbr3b0c | Fontaines D.C. | none | 8303814 | https://www.ticketliquidator.com/tickets/8303814/Fontaines-DC-tickets-Sat-May-8-2027-Wamu-Theater-At-Lumen-Field-Event-Center | - |
| tm-fontaines-d-c-2027-sacramento-g5vyz_kmgztid | Fontaines D.C. | none | 8303815 | https://www.ticketliquidator.com/tickets/8303815/Fontaines-DC-tickets-Tue-May-11-2027-Channel-24 | - |
| tm-fontaines-d-c-2027-san-francisco-g5vyz_k9cdguj | Fontaines D.C. | none | 8303816 | https://www.ticketliquidator.com/tickets/8303816/Fontaines-DC-tickets-Wed-May-12-2027-Bill-Graham-Civic-Auditorium | - |
| tm-fontaines-d-c-2027-milano-zg9rmiynyzd1ve | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-co-meath-1avoz_ogkwypefm | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-co-meath-1avoz_ogkw7fwfl | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-cardiff-g5vhz_oiinrjk | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-newcastle-upon-tyne-1adfz_ogkm3hlfk | Fontaines D.C. | none | 8271586 | https://www.ticketliquidator.com/tickets/8271586/Fontaines-DC-tickets-Thu-Jul-1-2027-St-James-Park | - |
| tm-fontaines-d-c-2027-manchester-g5dzz_omjzv0z | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-manchester-g5dzz_osdpprt | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-glasgow-1adbz_ogkrs74cl | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-london-1ku8vpf_ga19knu | Fontaines D.C. | none | 8264053 | https://www.ticketliquidator.com/tickets/8264053/Fontaines-DC-tickets-Fri-Jul-9-2027-London-Stadium-At-Queen-Elizabeth-Olympic-Park | - |
| tm-fontaines-d-c-2027-toronto-1avzz_kgkmdxopu | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-columbia-16vfz_fkag7mpc7 | Fontaines D.C. | none | 8303818 | https://www.ticketliquidator.com/tickets/8303818/Fontaines-DC-tickets-Thu-Sep-30-2027-Merriweather-Post-Pavilion | - |
| tm-fontaines-d-c-2027-atlanta-vvg1zz_keib7ia | Fontaines D.C. | none | 8303820 | https://www.ticketliquidator.com/tickets/8303820/Fontaines-DC-tickets-Fri-Oct-8-2027-Synovus-Bank-Amphitheater-at-Chastain-Park | - |
| tm-fontaines-d-c-2027-inglewood-vv1ke8vpuyga5p1et | Fontaines D.C. | none | 8303821 | https://www.ticketliquidator.com/tickets/8303821/Fontaines-DC-tickets-Fri-Oct-15-2027-The-Kia-Forum | - |
| tm-riley-green-2026-nashville-z7r9jz1aaekfy | Riley Green | none | - | - | no qualifying listing (complete catalog checked) |
| tm-riley-green-2026-las-vegas-z7r9jz1a7peqa | Riley Green | none | 8018163 | https://www.ticketliquidator.com/tickets/8018163/Riley-Green-tickets-Sun-Dec-6-2026-The-Theatre-at-Resorts-World-Las-Vegas | - |
| tm-riley-green-2026-las-vegas-z7r9jz1a7peq7 | Riley Green | none | 8018164 | https://www.ticketliquidator.com/tickets/8018164/Riley-Green-tickets-Thu-Dec-10-2026-The-Theatre-at-Resorts-World-Las-Vegas | - |
| tm-riley-green-2027-spokane-z7r9jz1aaezrp | Riley Green | none | 8293121 | https://www.ticketliquidator.com/tickets/8293121/Riley-Green-tickets-Thu-Apr-1-2027-Numerica-Veterans-Arena | - |
| tm-riley-green-2027-seattle-vvg1hz_keoq4yp | Riley Green | none | 8293123 | https://www.ticketliquidator.com/tickets/8293123/Riley-Green-tickets-Fri-Apr-2-2027-Climate-Pledge-Arena | - |
| tm-riley-green-2027-eugene-vvg1hz_3divdk0 | Riley Green | none | 8293124 | https://www.ticketliquidator.com/tickets/8293124/Riley-Green-tickets-Sat-Apr-3-2027-Matthew-Knight-Arena | - |
| tm-riley-green-2027-edmonton-1av7z_3gkwgn0bp | Riley Green | none | 8293148 | https://www.ticketliquidator.com/tickets/8293148/Riley-Green-tickets-Thu-Apr-8-2027-Rogers-Place | - |
| tm-riley-green-2027-calgary-1aozkfygkderjem | Riley Green | none | 8293149 | https://www.ticketliquidator.com/tickets/8293149/Riley-Green-tickets-Fri-Apr-9-2027-Scotiabank-Saddledome | - |
| tm-riley-green-2027-saskatoon-1av7z_3gkdixvhi | Riley Green | none | 8293150 | https://www.ticketliquidator.com/tickets/8293150/Riley-Green-tickets-Sat-Apr-10-2027-SaskTel-Centre | - |
| tm-riley-green-2027-raleigh-g5evz_ke-2cfw | Riley Green | none | 8293125 | https://www.ticketliquidator.com/tickets/8293125/Riley-Green-tickets-Thu-Apr-29-2027-Coastal-Credit-Union-Music-Park-at-Walnut-Creek | - |
| tm-riley-green-2027-knoxville-g5viz_3wie3-p | Riley Green | none | 8293127 | https://www.ticketliquidator.com/tickets/8293127/Riley-Green-tickets-Fri-Apr-30-2027-Thompson-Boling-Arena-at-Food-City-Center | - |
| tm-riley-green-2027-greenville-g5evz_k14klik | Riley Green | none | 8293128 | https://www.ticketliquidator.com/tickets/8293128/Riley-Green-tickets-Sat-May-1-2027-Bon-Secours-Wellness-Arena | - |
| tm-riley-green-2027-fort-worth-vvg1yz_kepbp4s | Riley Green | unverify (applied) | 8293130 | https://www.ticketliquidator.com/tickets/8293130/Riley-Green-tickets-Thu-May-6-2027-Dickies-Arena | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-riley-green-2027-wichita-vv1akzkfwgkdilqfv | Riley Green | none | 8293131 | https://www.ticketliquidator.com/tickets/8293131/Riley-Green-tickets-Fri-May-7-2027-INTRUST-Bank-Arena | - |
| tm-riley-green-2027-rogers-g5viz_k5ft6hv | Riley Green | none | 8293132 | https://www.ticketliquidator.com/tickets/8293132/Riley-Green-tickets-Sat-May-8-2027-Walmart-AMP | - |
| tm-riley-green-2027-tulsa-1aozkfsgkexhv7n | Riley Green | none | 8293133 | https://www.ticketliquidator.com/tickets/8293133/Riley-Green-tickets-Thu-May-20-2027-BOK-Center | - |
| tm-riley-green-2027-dallas-vvg1yz_k1h0ipi | Riley Green | none | 8293134 | https://www.ticketliquidator.com/tickets/8293134/Riley-Green-tickets-Fri-May-21-2027-Dos-Equis-Pavilion | - |
| tm-riley-green-2027-lafayette-g5viz_3r9l7s7 | Riley Green | none | - | - | no qualifying listing (complete catalog checked) |
| tm-riley-green-2027-brandon-g5viz_3t3qkqr | Riley Green | none | 8293136 | https://www.ticketliquidator.com/tickets/8293136/Riley-Green-tickets-Thu-Jun-3-2027-Brandon-Amphitheater | - |
| tm-riley-green-2027-orange-beach-g5viz_kvcnsvm | Riley Green | none | - | - | no qualifying listing (complete catalog checked) |
| tm-riley-green-2027-orange-beach-g5viz_k5itlvp | Riley Green | none | - | - | no qualifying listing (complete catalog checked) |
| tm-riley-green-2027-mount-pleasant-z7r9jz1aaef_z | Riley Green | none | 8294259 | https://www.ticketliquidator.com/tickets/8294259/Riley-Green-tickets-Thu-Jun-10-2027-Outdoors-At-Soaring-Eagle-Casino-Resort | - |
| tm-riley-green-2027-toronto-1a8zkfwgkd5hci5 | Riley Green | none | - | - | no qualifying listing (complete catalog checked) |
| tm-riley-green-2027-toronto-1a8zkfwgkd5hxip | Riley Green | none | - | - | no qualifying listing (complete catalog checked) |
| tm-riley-green-2027-gilford-vv1avzkfsgke-elvi | Riley Green | none | - | - | no qualifying listing (complete catalog checked) |
| tm-riley-green-2027-gilford-vv1avzkfsgkeipxy_ | Riley Green | none | - | - | no qualifying listing (complete catalog checked) |
| tm-riley-green-2027-clarkston-vv1afzkfwgkdw_jcp | Riley Green | none | 8293140 | https://www.ticketliquidator.com/tickets/8293140/Riley-Green-tickets-Fri-Jun-25-2027-Pine-Knob-Music-Theatre | - |
| tm-riley-green-2027-clarkston-vv1afzkfygkenvgq1 | Riley Green | none | 8300342 | https://www.ticketliquidator.com/tickets/8300342/Riley-Green-tickets-Sat-Jun-26-2027-Pine-Knob-Music-Theatre | - |
| tm-riley-green-2027-syracuse-k7vgf_k1rwxjy | Riley Green | none | 8294264 | https://www.ticketliquidator.com/tickets/8294264/Riley-Green-tickets-Thu-Jul-15-2027-Empower-Federal-Credit-Union-Amphitheater-at-Lakeview | - |
| tm-riley-green-2027-allentown-1adzz_3gkdwsja0 | Riley Green | none | 8293141 | https://www.ticketliquidator.com/tickets/8293141/Riley-Green-tickets-Fri-Jul-16-2027-PPL-Center | - |
| tm-riley-green-2027-columbia-1a4zkfwgkdajcik | Riley Green | none | 8293142 | https://www.ticketliquidator.com/tickets/8293142/Riley-Green-tickets-Thu-Jul-22-2027-Merriweather-Post-Pavilion | - |
| tm-riley-green-2027-bethel-k7vgf_kkxvsto | Riley Green | none | 8293143 | https://www.ticketliquidator.com/tickets/8293143/Riley-Green-tickets-Fri-Jul-23-2027-Bethel-Woods-Center-For-The-Arts | - |
| tm-riley-green-2027-mansfield-vv1avzkfwgke0hynm | Riley Green | none | 8293144 | https://www.ticketliquidator.com/tickets/8293144/Riley-Green-tickets-Sat-Jul-24-2027-Xfinity-Center-MA | - |
| tm-riley-green-2027-evansville-vv16azkfwxpza8acgv | Riley Green | none | 8293145 | https://www.ticketliquidator.com/tickets/8293145/Riley-Green-tickets-Thu-Jul-29-2027-Ford-Center-IN | - |
| tm-riley-green-2027-maryland-heights-vv1fvovpgtqtz755aa | Riley Green | none | - | - | no qualifying listing (complete catalog checked) |
| tm-riley-green-2027-milwaukee-vv1a6zkfwgkdjdyhh | Riley Green | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hazlett-2027-eugene-z7r9jz1aaeojp | Hazlett | none | 8054862 | https://www.ticketliquidator.com/tickets/8054862/Hazlett-tickets-Sat-May-29-2027-Wow-Hall | - |
| tm-hazlett-2027-austin-g5diz_kepkpyq | Hazlett | none | 8054737 | https://www.ticketliquidator.com/tickets/8054737/Hazlett-tickets-Sat-Jun-12-2027-Scoot-Inn | - |
| tm-carly-rae-jepsen-2027-edmonton-1av7z_kgklarlu8 | Carly Rae Jepsen | none | 8300790 | https://www.ticketliquidator.com/tickets/8300790/Carly-Rae-Jepsen-tickets-Thu-Apr-15-2027-Northern-Alberta-Jubilee-Auditorium | - |
| tm-carly-rae-jepsen-2027-calgary-1av7z_kgkulm9f3 | Carly Rae Jepsen | none | - | - | no qualifying listing (complete catalog checked) |
| tm-carly-rae-jepsen-2027-vancouver-1av7z_kgklk3dkw | Carly Rae Jepsen | none | 8300792 | https://www.ticketliquidator.com/tickets/8300792/Carly-Rae-Jepsen-tickets-Sun-Apr-18-2027-Orpheum-Theatre-Vancouver | - |
| tm-carly-rae-jepsen-2027-san-francisco-g5vyz_kdn9abg | Carly Rae Jepsen | none | 8300771 | https://www.ticketliquidator.com/tickets/8300771/Carly-Rae-Jepsen-tickets-Wed-Apr-21-2027-Bill-Graham-Civic-Auditorium | - |
| tm-carly-rae-jepsen-2027-inglewood-vv170z_kgkmkrrsm | Carly Rae Jepsen | none | 8300772 | https://www.ticketliquidator.com/tickets/8300772/Carly-Rae-Jepsen-tickets-Thu-Apr-22-2027-The-Kia-Forum | - |
| tm-carly-rae-jepsen-2027-san-diego-vvg1iz_kmdzlco | Carly Rae Jepsen | none | 8300773 | https://www.ticketliquidator.com/tickets/8300773/Carly-Rae-Jepsen-tickets-Fri-Apr-23-2027-Gallagher-Square-at-Petco-Park | - |
| tm-carly-rae-jepsen-2027-las-vegas-1avjz_kgksxz4qo | Carly Rae Jepsen | none | 8300776 | https://www.ticketliquidator.com/tickets/8300776/Carly-Rae-Jepsen-tickets-Fri-Apr-30-2027-The-Chelsea-The-Cosmopolitan-of-Las-Vegas | - |
| tm-carly-rae-jepsen-2027-phoenix-1kk8vpc_gacbk4n | Carly Rae Jepsen | none | 8300777 | https://www.ticketliquidator.com/tickets/8300777/Carly-Rae-Jepsen-tickets-Sat-May-1-2027-Arizona-Financial-Theatre | - |
| tm-carly-rae-jepsen-2027-irving-vvg1yz_kwbaerl | Carly Rae Jepsen | none | 8300778 | https://www.ticketliquidator.com/tickets/8300778/Carly-Rae-Jepsen-tickets-Wed-May-5-2027-The-Pavilion-at-Toyota-Music-Factory | - |
| tm-carly-rae-jepsen-2027-austin-g5diz_kbdqtji | Carly Rae Jepsen | none | 8300779 | https://www.ticketliquidator.com/tickets/8300779/Carly-Rae-Jepsen-tickets-Fri-May-7-2027-Moody-Amphitheater | - |
| tm-carly-rae-jepsen-2027-houston-g5diz_kbuz9jg | Carly Rae Jepsen | none | 8300780 | https://www.ticketliquidator.com/tickets/8300780/Carly-Rae-Jepsen-tickets-Sat-May-8-2027-713-Music-Hall | - |
| tm-carly-rae-jepsen-2027-nashville-g5viz_kdzypqh | Carly Rae Jepsen | none | 8300781 | https://www.ticketliquidator.com/tickets/8300781/Carly-Rae-Jepsen-tickets-Mon-May-10-2027-The-Truth | - |
| tm-carly-rae-jepsen-2027-atlanta-vvg1zz_kmrbzzs | Carly Rae Jepsen | none | 8300782 | https://www.ticketliquidator.com/tickets/8300782/Carly-Rae-Jepsen-tickets-Tue-May-11-2027-Coca-Cola-Roxy | - |
| tm-carly-rae-jepsen-2027-charlotte-g5evz_ksv1qq1 | Carly Rae Jepsen | none | 8300783 | https://www.ticketliquidator.com/tickets/8300783/Carly-Rae-Jepsen-tickets-Wed-May-12-2027-Skyla-Credit-Union-Amphitheatre | - |
| tm-carly-rae-jepsen-2027-washington-1avfz_kgkz-xcfn | Carly Rae Jepsen | none | 8300784 | https://www.ticketliquidator.com/tickets/8300784/Carly-Rae-Jepsen-tickets-Fri-May-14-2027-The-Anthem-DC | - |
| tm-carly-rae-jepsen-2027-new-york-g5diz_krvp7ot | Carly Rae Jepsen | none | 8300785 | https://www.ticketliquidator.com/tickets/8300785/Carly-Rae-Jepsen-tickets-Sat-May-15-2027-Madison-Square-Garden | - |
| tm-carly-rae-jepsen-2027-philadelphia-vv17fz_kgkmz_nj4 | Carly Rae Jepsen | none | 8300786 | https://www.ticketliquidator.com/tickets/8300786/Carly-Rae-Jepsen-tickets-Tue-May-18-2027-The-Met-Presented-by-Highmark | - |
| tm-carly-rae-jepsen-2027-boston-vv177z_kgklscrut | Carly Rae Jepsen | none | 8300787 | https://www.ticketliquidator.com/tickets/8300787/Carly-Rae-Jepsen-tickets-Wed-May-19-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-carly-rae-jepsen-2027-chicago-vv17jz_kgkbbdisc | Carly Rae Jepsen | none | 8300788 | https://www.ticketliquidator.com/tickets/8300788/Carly-Rae-Jepsen-tickets-Fri-May-21-2027-The-Chicago-Theatre | - |
| tm-carly-rae-jepsen-2027-detroit-vv17oz_kgkdnnigp | Carly Rae Jepsen | none | 8300789 | https://www.ticketliquidator.com/tickets/8300789/Carly-Rae-Jepsen-tickets-Sat-May-22-2027-Fox-Theatre-Detroit | - |
| tm-carly-rae-jepsen-2027-toronto-1avzz_kgkiawwxu | Carly Rae Jepsen | none | - | - | no qualifying listing (complete catalog checked) |
| tm-carly-rae-jepsen-2027-ottawa-1ad7z_kgkir7yjb | Carly Rae Jepsen | none | - | - | no qualifying listing (complete catalog checked) |
| tm-carly-rae-jepsen-2027-montreal-1ad7z_kgkumfj2g | Carly Rae Jepsen | none | 8300795 | https://www.ticketliquidator.com/tickets/8300795/Carly-Rae-Jepsen-tickets-Sat-May-29-2027-MTelus | - |
| tm-teddy-swims-2027-hamburg-z698xzc2z16vpvz6g3 | Teddy Swims | none | 8167507 | https://www.ticketliquidator.com/tickets/8167507/Teddy-Swims-tickets-Wed-Mar-10-2027-Barclays-Arena-Hamburg | - |
| tm-the-warning-2027-london-1adjz_3gknpoval | The Warning | none | 8309065 | https://www.ticketliquidator.com/tickets/8309065/The-Warning-tickets-Fri-Apr-2-2027-OVO-Arena-Wembley | - |
| tm-the-lemonheads-2027-englewood-z7r9jz1aavvvk | The Lemonheads | none | 8266228 | https://www.ticketliquidator.com/tickets/8266228/The-Lemonheads-tickets-Sun-Mar-14-2027-Gothic-Theatre | - |
| tm-haiden-henderson-2027-englewood-z7r9jz1aaevqs | Haiden Henderson | none | 8284336 | https://www.ticketliquidator.com/tickets/8284336/Haiden-Henderson-tickets-Sat-May-8-2027-Gothic-Theatre | - |
| tm-the-red-clay-strays-2027-lubbock-z7r9jz1aaef4t | The Red Clay Strays | none | - | - | no qualifying listing (complete catalog checked) |
| tm-pink-martini-2027-liverpool-g5vhz_fpr6w_w | Pink Martini | none | - | - | no qualifying listing (complete catalog checked) |
| tm-pink-martini-2027-edinburgh-1auzk4agkdmo6dj | Pink Martini | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-neighbourhood-2026-atlanta-vvg1zz_73eik7i | The Neighbourhood | none | 7748316 | https://www.ticketliquidator.com/tickets/7748316/The-Neighbourhood-tickets-Tue-Nov-10-2026-State-Farm-Arena-GA | - |
| tm-the-neighbourhood-2026-orlando-1axzkoogkembvjl | The Neighbourhood | none | 7748317 | https://www.ticketliquidator.com/tickets/7748317/The-Neighbourhood-tickets-Wed-Nov-11-2026-Kia-Center | - |
| tm-the-neighbourhood-2026-miami-vvg1vz_7e0samz | The Neighbourhood | none | 7748318 | https://www.ticketliquidator.com/tickets/7748318/The-Neighbourhood-tickets-Thu-Nov-12-2026-Kaseya-Center | - |
| tm-the-neighbourhood-2026-nashville-g5viz_kmzyt_i | The Neighbourhood | none | 7808855 | https://www.ticketliquidator.com/tickets/7808855/The-Neighbourhood-tickets-Sat-Nov-14-2026-The-Truth | - |
| tm-the-neighbourhood-2026-kansas-city-vv17bz_7gkr3ru0p | The Neighbourhood | none | 7748319 | https://www.ticketliquidator.com/tickets/7748319/The-Neighbourhood-tickets-Mon-Nov-16-2026-T-Mobile-Center | - |
| tm-the-neighbourhood-2026-chicago-vv1a7zkoagkdxvkbx | The Neighbourhood | none | 7828409 | https://www.ticketliquidator.com/tickets/7828409/The-Neighbourhood-tickets-Wed-Nov-18-2026-United-Center | - |
| tm-the-neighbourhood-2026-detroit-vv17oz_7gkwiaino | The Neighbourhood | none | 7748320 | https://www.ticketliquidator.com/tickets/7748320/The-Neighbourhood-tickets-Thu-Nov-19-2026-Little-Caesars-Arena | - |
| tm-the-neighbourhood-2026-brooklyn-1ayzkoagkdftezg | The Neighbourhood | none | 7748321 | https://www.ticketliquidator.com/tickets/7748321/The-Neighbourhood-tickets-Sat-Nov-21-2026-Barclays-Center | - |
| tm-the-neighbourhood-2026-brooklyn-15dzz_aozvwft | The Neighbourhood | none | 7896353 | https://www.ticketliquidator.com/tickets/7896353/The-Neighbourhood-tickets-Sun-Nov-22-2026-Barclays-Center | - |
| tm-the-neighbourhood-2026-phoenix-16v0z_ac6g7w4dv | The Neighbourhood | none | 7748322 | https://www.ticketliquidator.com/tickets/7748322/The-Neighbourhood-tickets-Mon-Nov-30-2026-Mortgage-Matchup-Center | - |
| tm-the-neighbourhood-2026-san-francisco-g5vyz_a2kv6-_ | The Neighbourhood | none | 7748323 | https://www.ticketliquidator.com/tickets/7748323/The-Neighbourhood-tickets-Wed-Dec-2-2026-Bill-Graham-Civic-Auditorium | - |
| tm-the-neighbourhood-2026-inglewood-vv1aazkodgkdu9feo | The Neighbourhood | none | 7748324 | https://www.ticketliquidator.com/tickets/7748324/The-Neighbourhood-tickets-Fri-Dec-4-2026-The-Kia-Forum | - |
| tm-the-neighbourhood-2026-inglewood-vv1k0z_a8dg7vtxb | The Neighbourhood | none | 7896352 | https://www.ticketliquidator.com/tickets/7896352/The-Neighbourhood-tickets-Sat-Dec-5-2026-The-Kia-Forum | - |
| tm-staind-2027-manchester-vv177z_kgkbyj0rc | Staind | none | 8308766 | https://www.ticketliquidator.com/tickets/8308766/Staind-tickets-Thu-Mar-4-2027-SNHU-Arena | - |
| tm-staind-2027-baltimore-11a8vpokayf8vu | Staind | none | 8308767 | https://www.ticketliquidator.com/tickets/8308767/Staind-tickets-Sat-Mar-6-2027-CFG-Bank-Arena | - |
| tm-staind-2027-pittsburgh-1avbz_kgkdoccp7 | Staind | none | 8308768 | https://www.ticketliquidator.com/tickets/8308768/Staind-tickets-Mon-Mar-8-2027-PPG-Paints-Arena | - |
| tm-staind-2027-reading-vv1aezk4vgkeshnyh | Staind | none | - | - | no qualifying listing (complete catalog checked) |
| tm-staind-2027-huntington-1kaovp8iga2ivff | Staind | none | - | - | no qualifying listing (complete catalog checked) |
| tm-staind-2027-tampa-vvg1vz_f6ermdd | Staind | none | 8308771 | https://www.ticketliquidator.com/tickets/8308771/Staind-tickets-Fri-Mar-12-2027-Benchmark-International-Arena | - |
| tm-staind-2027-west-palm-beach-vvg1vz_kdb8l2e | Staind | none | 8308772 | https://www.ticketliquidator.com/tickets/8308772/Staind-tickets-Sat-Mar-13-2027-iTHINK-Financial-Amphitheatre | - |
| tm-staind-2027-birmingham-1aozk4vgkdpep6o | Staind | none | 8308773 | https://www.ticketliquidator.com/tickets/8308773/Staind-tickets-Tue-Mar-16-2027-Legacy-Arena-at-The-BJCC | - |
| tm-staind-2027-oklahoma-city-vvg1yz_kb9ngdb | Staind | none | 8308774 | https://www.ticketliquidator.com/tickets/8308774/Staind-tickets-Thu-Mar-18-2027-Paycom-Center | - |
| tm-staind-2027-dallas-vvg1yz_ffb7hxs | Staind | none | 8308775 | https://www.ticketliquidator.com/tickets/8308775/Staind-tickets-Fri-Mar-19-2027-Dos-Equis-Pavilion | - |
| tm-staind-2027-san-antonio-g5diz_fkhzhba | Staind | none | 8308776 | https://www.ticketliquidator.com/tickets/8308776/Staind-tickets-Sat-Mar-20-2027-Frost-Bank-Center | - |
| tm-staind-2027-denver-g5vzz_f7kx5yq | Staind | none | 8308777 | https://www.ticketliquidator.com/tickets/8308777/Staind-tickets-Mon-Mar-22-2027-Ball-Arena | - |
| tm-staind-2027-boise-g5vzz_kb7mfuo | Staind | none | 8308778 | https://www.ticketliquidator.com/tickets/8308778/Staind-tickets-Wed-Mar-24-2027-ExtraMile-Arena | - |
| tm-staind-2027-seattle-vvg1hz_km9huyk | Staind | none | 8308781 | https://www.ticketliquidator.com/tickets/8308781/Staind-tickets-Sat-Mar-27-2027-Climate-Pledge-Arena | - |
| tm-staind-2027-vancouver-1aozk4egkdceqzp | Staind | none | 8308793 | https://www.ticketliquidator.com/tickets/8308793/Staind-tickets-Mon-Mar-29-2027-Rogers-Arena | - |
| tm-staind-2027-calgary-1av7z_kgkm-emew | Staind | none | 8308794 | https://www.ticketliquidator.com/tickets/8308794/Staind-tickets-Wed-Mar-31-2027-Scotiabank-Saddledome | - |
| tm-staind-2027-edmonton-1av7z_kgkz_xe9- | Staind | none | 8308795 | https://www.ticketliquidator.com/tickets/8308795/Staind-tickets-Thu-Apr-1-2027-Rogers-Place | - |
| tm-staind-2027-sioux-falls-vv1akzk4vgkd8j7ov | Staind | none | 8308785 | https://www.ticketliquidator.com/tickets/8308785/Staind-tickets-Tue-Apr-6-2027-Denny-Sanford-Premier-Center | - |
| tm-staind-2027-fargo-vv17bz_kgkuwy5mz | Staind | none | 8308786 | https://www.ticketliquidator.com/tickets/8308786/Staind-tickets-Wed-Apr-7-2027-Fargodome | - |
| tm-staind-2027-omaha-vv1kvovp8tga5iapt | Staind | none | 8308787 | https://www.ticketliquidator.com/tickets/8308787/Staind-tickets-Fri-Apr-9-2027-CHI-Health-Center-Omaha | - |
| tm-staind-2027-kansas-city-vv1akzk4vgkegdrbt | Staind | none | 8308788 | https://www.ticketliquidator.com/tickets/8308788/Staind-tickets-Sat-Apr-10-2027-T-Mobile-Center | - |
| tm-staind-2027-moline-vv1fbz_fkec7zdga1 | Staind | none | 8308789 | https://www.ticketliquidator.com/tickets/8308789/Staind-tickets-Sun-Apr-11-2027-Vibrant-Arena-at-The-MARK | - |
| tm-staind-2027-grand-rapids-vv17oz_kgkmqeain | Staind | none | 8308790 | https://www.ticketliquidator.com/tickets/8308790/Staind-tickets-Tue-Apr-13-2027-Van-Andel-Arena | - |
| tm-staind-2027-evansville-vv17fz_kgkd3hr7l | Staind | none | 8308791 | https://www.ticketliquidator.com/tickets/8308791/Staind-tickets-Wed-Apr-14-2027-Ford-Center-IN | - |
| tm-dylan-gossett-2026-chicago-vvg18z_u5xbtr6 | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-gossett-2026-pittsburgh-17aov0g6u5ijrxe | Dylan Gossett | none | 8073983 | https://www.ticketliquidator.com/tickets/8073983/Dylan-Gossett-tickets-Fri-Oct-30-2026-Citizens-Live-at-The-Wylie | - |
| tm-dylan-gossett-2026-apopka-z7r9jz1a7ps7y | Dylan Gossett | none | 8073985 | https://www.ticketliquidator.com/tickets/8073985/Dylan-Gossett-tickets-Sat-Nov-21-2026-Apopka-Amphitheater | - |
| tm-dylan-gossett-2026-brisbane-177yv0g61tezlg8 | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-gossett-2026-sydney-177yv0g655_-4r3 | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-gossett-2026-west-melbourne-177yv0g653cuwz_ | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-gossett-2027-london-g5dzz_8kn_3tz | Dylan Gossett | none | 8324860 | https://www.ticketliquidator.com/tickets/8324860/Dylan-Gossett-tickets-Thu-Feb-18-2027-O2-Academy-Brixton | - |
| tm-dylan-gossett-2027-manchester-g5dzz_8hqwevt | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-gossett-2027-birmingham-g5dzz_83l8ohz | Dylan Gossett | none | 8265884 | https://www.ticketliquidator.com/tickets/8265884/Dylan-Gossett-tickets-Sun-Feb-21-2027-O2-Academy-Birmingham | - |
| tm-dylan-gossett-2027-glasgow-g5dzz_8pg5sb3 | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-gossett-2027-glasgow-g5dzz_8qwdoqp | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-gossett-2027-dublin-17kzv0g62wo552g | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-gossett-2027-charleston-g5evz_kdp4j6z | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-gossett-2027-north-myrtle-beach-g5evz_kuxkrl8 | Dylan Gossett | none | 8303652 | https://www.ticketliquidator.com/tickets/8303652/Dylan-Gossett-tickets-Fri-Mar-26-2027-House-Of-Blues-Myrtle-Beach | - |
| tm-dylan-gossett-2027-charlotte-g5evz_kb2iepf | Dylan Gossett | none | 8303653 | https://www.ticketliquidator.com/tickets/8303653/Dylan-Gossett-tickets-Sat-Mar-27-2027-The-Fillmore-Charlotte | - |
| tm-dylan-gossett-2027-chattanooga-z7r9jz1aae4bi | Dylan Gossett | none | 8307109 | https://www.ticketliquidator.com/tickets/8307109/Dylan-Gossett-tickets-Tue-Mar-30-2027-The-Signal-TN | - |
| tm-dylan-gossett-2027-saint-louis-1ae7z_kgkyeggq8 | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-gossett-2027-fayetteville-z7r9jz1aae4bt | Dylan Gossett | none | 8304295 | https://www.ticketliquidator.com/tickets/8304295/Dylan-Gossett-tickets-Fri-Apr-2-2027-Ozark-Music-Hall | - |
| tm-dylan-gossett-2027-memphis-g5viz_f659_2b | Dylan Gossett | none | 8303655 | https://www.ticketliquidator.com/tickets/8303655/Dylan-Gossett-tickets-Sat-Apr-3-2027-Satellite-Music-Hall | - |
| tm-dylan-gossett-2027-birmingham-1aezz_kgkbdr7ks | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-gossett-2027-philadelphia-vv17fz_kgkmvqdsy | Dylan Gossett | none | 8303657 | https://www.ticketliquidator.com/tickets/8303657/Dylan-Gossett-tickets-Tue-Apr-6-2027-The-Met-Presented-by-Highmark | - |
| tm-dylan-gossett-2027-baltimore-1avfz_kgkbht6mj | Dylan Gossett | none | 8303658 | https://www.ticketliquidator.com/tickets/8303658/Dylan-Gossett-tickets-Wed-Apr-7-2027-The-Paramount-Baltimore | - |
| tm-dylan-gossett-2027-columbus-z7r9jz1aae4by | Dylan Gossett | none | 8307089 | https://www.ticketliquidator.com/tickets/8307089/Dylan-Gossett-tickets-Thu-Apr-8-2027-KEMBA-Live | - |
| tm-dylan-gossett-2027-detroit-vv17oz_kgkub0uhh | Dylan Gossett | none | 8303659 | https://www.ticketliquidator.com/tickets/8303659/Dylan-Gossett-tickets-Sat-Apr-10-2027-The-Fillmore-Detroit | - |
| tm-dylan-gossett-2027-grand-rapids-vv17oz_kgkubfkdd | Dylan Gossett | none | 8303660 | https://www.ticketliquidator.com/tickets/8303660/Dylan-Gossett-tickets-Sun-Apr-11-2027-GLC-Live-at-20-Monroe | - |
| tm-dylan-gossett-2027-indianapolis-vv17fz_kgkd3hmfo | Dylan Gossett | none | 8303661 | https://www.ticketliquidator.com/tickets/8303661/Dylan-Gossett-tickets-Tue-May-4-2027-Egyptian-Room-At-Old-National-Centre | - |
| tm-dylan-gossett-2027-madison-vv17jz_kgkmgwnt1 | Dylan Gossett | none | 8303662 | https://www.ticketliquidator.com/tickets/8303662/Dylan-Gossett-tickets-Thu-May-6-2027-The-Sylvee-WI | - |
| tm-dylan-gossett-2027-kansas-city-vv17bz_kgkwikfde | Dylan Gossett | none | 8303663 | https://www.ticketliquidator.com/tickets/8303663/Dylan-Gossett-tickets-Fri-May-7-2027-Uptown-Theater-KC | - |
| tm-dylan-gossett-2027-la-vista-1aezz_kgkwpxe_0 | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-gossett-2027-austin-g5diz_fkdqvvu | Dylan Gossett | none | 8303665 | https://www.ticketliquidator.com/tickets/8303665/Dylan-Gossett-tickets-Thu-May-13-2027-Moody-Amphitheater | - |
| tm-dylan-gossett-2027-houston-g5diz_kmyuwxg | Dylan Gossett | none | 8303666 | https://www.ticketliquidator.com/tickets/8303666/Dylan-Gossett-tickets-Fri-May-14-2027-Bayou-Music-Center | - |
| tm-dylan-gossett-2027-fort-worth-z7r9jz1aae4bs | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-gossett-2027-oklahoma-city-z7r9jz1aae4ba | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-gossett-2027-tulsa-z7r9jz1aae4bw | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-flans-2027-el-paso-vvg1yz_kdaklj7 | Flans | none | - | - | no qualifying listing (complete catalog checked) |
| tm-flans-2027-tucson-1av0z_3gkbvrkjg | Flans | none | 8289130 | https://www.ticketliquidator.com/tickets/8289130/Flans-tickets-Sat-Feb-13-2027-The-Linda-Ronstadt-Music-Hall-At-Tucson-Convention-Center | - |
| tm-flans-2027-atlanta-vvg1zz_k5zjmuk | Flans | none | 8289131 | https://www.ticketliquidator.com/tickets/8289131/Flans-tickets-Thu-Feb-25-2027-Cobb-Energy-Performing-Arts-Centre | - |
| tm-flans-2027-charlotte-g5evz_3xf-_ej | Flans | none | 8289132 | https://www.ticketliquidator.com/tickets/8289132/Flans-tickets-Fri-Feb-26-2027-Ovens-Auditorium | - |
| tm-flans-2027-raleigh-g5evz_k_sqdn_ | Flans | none | 8289133 | https://www.ticketliquidator.com/tickets/8289133/Flans-tickets-Sat-Feb-27-2027-Raleigh-Memorial-Auditorium-At-Martin-Marietta-Center-for-the-Performing-Arts | - |
| tm-flans-2027-denver-g5vzz_kk90pao | Flans | none | 8289134 | https://www.ticketliquidator.com/tickets/8289134/Flans-tickets-Thu-Mar-4-2027-Paramount-Theatre-Denver | - |
| tm-flans-2027-kansas-city-z7r9jz1aaevrv | Flans | none | 8288706 | https://www.ticketliquidator.com/tickets/8288706/Flans-tickets-Fri-Mar-5-2027-The-Midland-Theatre-MO | - |
| tm-flans-2027-san-diego-vvg1iz_3rf4hkp | Flans | none | 8289135 | https://www.ticketliquidator.com/tickets/8289135/Flans-tickets-Fri-Mar-12-2027-San-Diego-Civic-Theatre | - |
| tm-flans-2027-los-angeles-vv1aazkfsgkdiitze | Flans | none | 8289136 | https://www.ticketliquidator.com/tickets/8289136/Flans-tickets-Sun-Mar-14-2027-Orpheum-Theatre-Los-Angeles | - |
| tm-flans-2027-houston-g5diz_k6-kevr | Flans | none | 8289137 | https://www.ticketliquidator.com/tickets/8289137/Flans-tickets-Sat-May-29-2027-Houston-Arena-Theatre | - |
| tm-flans-2027-mcallen-g5diz_3wgxkbw | Flans | none | 8289138 | https://www.ticketliquidator.com/tickets/8289138/Flans-tickets-Sun-May-30-2027-McAllen-Performing-Arts-Center | - |
| tm-flans-2027-san-jose-g5vyz_k6lhlxq | Flans | none | 8289139 | https://www.ticketliquidator.com/tickets/8289139/Flans-tickets-Thu-Jun-3-2027-San-Jose-Civic | - |
| tm-warren-zeiders-2027-orlando-1axzk4vgkenxkjc | Warren Zeiders | none | 8307486 | https://www.ticketliquidator.com/tickets/8307486/Warren-Zeiders-tickets-Thu-Mar-25-2027-House-Of-Blues-Orlando | - |
| tm-warren-zeiders-2027-hollywood-vvg1vz_fkapkzq | Warren Zeiders | none | 8307487 | https://www.ticketliquidator.com/tickets/8307487/Warren-Zeiders-tickets-Fri-Mar-26-2027-Hard-Rock-Live-At-The-Seminole-Hard-Rock-Hotel-Casino-Hollywood | - |
| tm-warren-zeiders-2027-waukee-1ae7z_kgkdkgpa5 | Warren Zeiders | none | 8307488 | https://www.ticketliquidator.com/tickets/8307488/Warren-Zeiders-tickets-Fri-Apr-2-2027-Vibrant-Music-Hall | - |
| tm-warren-zeiders-2027-grand-rapids-vv1afzk4vgkeyak2y | Warren Zeiders | none | 8307489 | https://www.ticketliquidator.com/tickets/8307489/Warren-Zeiders-tickets-Thu-Apr-15-2027-GLC-Live-at-20-Monroe | - |
| tm-warren-zeiders-2027-chicago-vv1k8z_f1pg7v9f6 | Warren Zeiders | none | - | - | no qualifying listing (complete catalog checked) |
| tm-warren-zeiders-2027-philadelphia-vv17fz_kgkmdo0cj | Warren Zeiders | none | 8307492 | https://www.ticketliquidator.com/tickets/8307492/Warren-Zeiders-tickets-Thu-Apr-22-2027-The-Met-Presented-by-Highmark | - |
| tm-warren-zeiders-2027-pittsburgh-1apzk4vgkd7rttm | Warren Zeiders | none | 8307493 | https://www.ticketliquidator.com/tickets/8307493/Warren-Zeiders-tickets-Fri-Apr-23-2027-Citizens-Live-at-The-Wylie | - |
| tm-warren-zeiders-2027-cincinnati-1avbz_kgkbydi6_ | Warren Zeiders | none | - | - | no qualifying listing (complete catalog checked) |
| tm-warren-zeiders-2027-columbia-g5evz_kbmywhz | Warren Zeiders | none | 8307495 | https://www.ticketliquidator.com/tickets/8307495/Warren-Zeiders-tickets-Thu-Apr-29-2027-Township-Auditorium | - |
| tm-warren-zeiders-2027-atlanta-vvg1zz_f6dz4ap | Warren Zeiders | none | 8307496 | https://www.ticketliquidator.com/tickets/8307496/Warren-Zeiders-tickets-Fri-Apr-30-2027-Coca-Cola-Roxy | - |
| tm-john-summit-2027-warsaw-z698xzqpz16eva44jn | John Summit | none | - | - | no qualifying listing (complete catalog checked) |
| tm-john-summit-2027-forest-brussels-z698xzg2z1kfkv_0g | John Summit | none | - | - | no qualifying listing (complete catalog checked) |
| tm-john-summit-2027-amsterdam-z698xzbpz16vu0fx-w | John Summit | none | 8310259 | https://www.ticketliquidator.com/tickets/8310259/John-Summit-tickets-Sat-Feb-13-2027-Ziggo-Dome | - |
| tm-john-summit-2027-london-1agzk4egkdwrmjf | John Summit | none | 8310113 | https://www.ticketliquidator.com/tickets/8310113/John-Summit-tickets-Sat-Feb-27-2027-The-Bubble-Exhibition-Space-at-the-O2 | - |
| tm-pink-martini-2027-london-g5vhz_fqbbwez | Pink Martini | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-salt-lake-city-z7r9jz1aaeefa | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-red-clay-strays-2027-los-angeles-z7r9jz1aaek0t | The Red Clay Strays | none | 8301035 | https://www.ticketliquidator.com/tickets/8301035/The-Red-Clay-Strays-tickets-Tue-Aug-17-2027-Greek-Theatre-Los-Angeles-CA | - |
| tm-carly-rae-jepsen-2027-toronto-1a8zk47gkd65fpy | Carly Rae Jepsen | none | - | - | no qualifying listing (complete catalog checked) |
| tm-flans-2027-grand-prairie-z7r9jz1aaeaoe | Flans | none | 8294749 | https://www.ticketliquidator.com/tickets/8294749/Flans-tickets-Fri-May-28-2027-Texas-Trust-CU-Theatre-at-Grand-Prairie | - |
| tm-death-cab-for-cutie-2027-huntsville-z7r9jz1aavu_y | Death Cab for Cutie | none | 8271408 | https://www.ticketliquidator.com/tickets/8271408/Death-Cab-for-Cutie-tickets-Sat-Mar-27-2027-The-Orion-Amphitheater | - |
| tm-sienna-spiro-2026-salt-lake-city-z7r9jz1aaef49 | Sienna Spiro | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-lemonheads-2027-omaha-z7r9jz1aavv7w | The Lemonheads | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-boston-vv1avzkfggkedloqr | Fontaines D.C. | none | 8310408 | https://www.ticketliquidator.com/tickets/8310408/Fontaines-DC-tickets-Thu-Apr-22-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-fontaines-d-c-2027-vancouver-1aozk4v0aa_zegf | Fontaines D.C. | none | 8313478 | https://www.ticketliquidator.com/tickets/8313478/Fontaines-DC-tickets-Thu-May-6-2027-UBC-Doug-Mitchell-Thunderbird-Sports-Centre | - |
| tm-latto-2026-boston-z7r9jz1aae_7z | Latto | none | - | - | no qualifying listing (complete catalog checked) |
| tm-death-cab-for-cutie-2027-dallas-z7r9jz1aavuug | Death Cab for Cutie | none | 8271405 | https://www.ticketliquidator.com/tickets/8271405/Death-Cab-for-Cutie-tickets-Wed-Mar-24-2027-The-Bomb-Factory | - |
| tm-too-many-zooz-2027-portland-z7r9jz1aaeerf | Too Many Zooz | none | 8284750 | https://www.ticketliquidator.com/tickets/8284750/Too-Many-Zooz-tickets-Thu-May-13-2027-Revolution-Hall-Portland | - |
| tm-the-red-clay-strays-2027-cleveland-z7r9jz1aaefgw | The Red Clay Strays | none | 8301705 | https://www.ticketliquidator.com/tickets/8301705/The-Red-Clay-Strays-tickets-Thu-Feb-4-2027-Rocket-Arena | - |
| tm-carly-rae-jepsen-2027-portland-z7r9jz1aaekuy | Carly Rae Jepsen | none | 8300380 | https://www.ticketliquidator.com/tickets/8300380/Carly-Rae-Jepsen-tickets-Mon-Apr-19-2027-Arlene-Schnitzer-Concert-Hall | - |
| tm-carly-rae-jepsen-2027-morrison-z7r9jz1aaekuz | Carly Rae Jepsen | none | 8300774 | https://www.ticketliquidator.com/tickets/8300774/Carly-Rae-Jepsen-tickets-Sun-Apr-25-2027-Red-Rocks-Amphitheatre | - |
| tm-carly-rae-jepsen-2027-salt-lake-city-z7r9jz1aaekuv | Carly Rae Jepsen | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dancing-with-the-stars-2027-manchester-vv1avzkfzgkexi5cw | Dancing With The Stars | none | 8310115 | https://www.ticketliquidator.com/tickets/8310115/Dancing-With-The-Stars-tickets-Thu-Jan-21-2027-SNHU-Arena | - |
| tm-dancing-with-the-stars-2027-buffalo-k7v16k4vppotze82 | Dancing With The Stars | none | 8310116 | https://www.ticketliquidator.com/tickets/8310116/Dancing-With-The-Stars-tickets-Fri-Jan-22-2027-KeyBank-Center | - |
| tm-dancing-with-the-stars-2027-cincinnati-1apzkfygkeolgly | Dancing With The Stars | none | 8310117 | https://www.ticketliquidator.com/tickets/8310117/Dancing-With-The-Stars-tickets-Sat-Jan-23-2027-Heritage-Bank-Center | - |
| tm-dancing-with-the-stars-2027-toronto-1avzz_kgks022ry | Dancing With The Stars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dancing-with-the-stars-2027-grand-rapids-vv1afzkfygkddhcfb | Dancing With The Stars | none | 8310119 | https://www.ticketliquidator.com/tickets/8310119/Dancing-With-The-Stars-tickets-Wed-Jan-27-2027-Van-Andel-Arena | - |
| tm-dancing-with-the-stars-2027-detroit-vv1afzk4egkdpidi9 | Dancing With The Stars | none | 8310120 | https://www.ticketliquidator.com/tickets/8310120/Dancing-With-The-Stars-tickets-Thu-Jan-28-2027-Little-Caesars-Arena | - |
| tm-dancing-with-the-stars-2027-indianapolis-vv17fz_kgkmo2l7h | Dancing With The Stars | none | 8310121 | https://www.ticketliquidator.com/tickets/8310121/Dancing-With-The-Stars-tickets-Fri-Jan-29-2027-Gainbridge-Fieldhouse | - |
| tm-dancing-with-the-stars-2027-minneapolis-vv1akzkfzgkdjnlsm | Dancing With The Stars | none | 8310122 | https://www.ticketliquidator.com/tickets/8310122/Dancing-With-The-Stars-tickets-Sat-Jan-30-2027-Target-Center | - |
| tm-dancing-with-the-stars-2027-milwaukee-vv1a6zkfzgkemf4pv | Dancing With The Stars | none | 8310123 | https://www.ticketliquidator.com/tickets/8310123/Dancing-With-The-Stars-tickets-Sun-Jan-31-2027-Fiserv-Forum | - |
| tm-dancing-with-the-stars-2027-allentown-1kgzvp8fgagolc1 | Dancing With The Stars | none | 8310124 | https://www.ticketliquidator.com/tickets/8310124/Dancing-With-The-Stars-tickets-Wed-Feb-3-2027-PPL-Center | - |
| tm-dancing-with-the-stars-2027-philadelphia-1ayzk4vgkepepvt | Dancing With The Stars | none | 8310125 | https://www.ticketliquidator.com/tickets/8310125/Dancing-With-The-Stars-tickets-Thu-Feb-4-2027-Xfinity-Mobile-Arena | - |
| tm-dancing-with-the-stars-2027-new-york-g5diz_f1zup-t | Dancing With The Stars | none | 8310126 | https://www.ticketliquidator.com/tickets/8310126/Dancing-With-The-Stars-tickets-Fri-Feb-5-2027-Madison-Square-Garden | - |
| tm-dancing-with-the-stars-2027-washington-1a4zkfsgkew-uk5 | Dancing With The Stars | none | 8310127 | https://www.ticketliquidator.com/tickets/8310127/Dancing-With-The-Stars-tickets-Sun-Feb-7-2027-Capital-One-Arena | - |
| tm-dancing-with-the-stars-2027-baltimore-1a4zk4vgkewzdyv | Dancing With The Stars | none | 8310128 | https://www.ticketliquidator.com/tickets/8310128/Dancing-With-The-Stars-tickets-Tue-Feb-9-2027-CFG-Bank-Arena | - |
| tm-dancing-with-the-stars-2027-pittsburgh-1apzkfygkdqrluc | Dancing With The Stars | none | 8310129 | https://www.ticketliquidator.com/tickets/8310129/Dancing-With-The-Stars-tickets-Wed-Feb-10-2027-PPG-Paints-Arena | - |
| tm-dancing-with-the-stars-2027-boston-vv177z_kgks9d4wi | Dancing With The Stars | none | 8310130 | https://www.ticketliquidator.com/tickets/8310130/Dancing-With-The-Stars-tickets-Thu-Feb-11-2027-TD-Garden | - |
| tm-dancing-with-the-stars-2027-albany-k7vgf_km48smn | Dancing With The Stars | none | 8310131 | https://www.ticketliquidator.com/tickets/8310131/Dancing-With-The-Stars-tickets-Fri-Feb-12-2027-MVP-Arena | - |
| tm-dancing-with-the-stars-2027-newark-vv17fz_kgkbxwhxi | Dancing With The Stars | none | 8310132 | https://www.ticketliquidator.com/tickets/8310132/Dancing-With-The-Stars-tickets-Sat-Feb-13-2027-Prudential-Center | - |
| tm-dancing-with-the-stars-2027-hershey-vv1aezk4egkd_54wn | Dancing With The Stars | none | 8310133 | https://www.ticketliquidator.com/tickets/8310133/Dancing-With-The-Stars-tickets-Wed-Feb-17-2027-Giant-Center | - |
| tm-dancing-with-the-stars-2027-columbus-vv1kv8vp83gacza6r | Dancing With The Stars | none | 8310134 | https://www.ticketliquidator.com/tickets/8310134/Dancing-With-The-Stars-tickets-Thu-Feb-18-2027-Value-City-Arena-at-The-Schottenstein-Center | - |
| tm-dancing-with-the-stars-2027-rosemont-vv178z_kgku4hpsc | Dancing With The Stars | none | 8310135 | https://www.ticketliquidator.com/tickets/8310135/Dancing-With-The-Stars-tickets-Fri-Feb-19-2027-Allstate-Arena | - |
| tm-dancing-with-the-stars-2027-moline-vv17bz_kgkbyihs4 | Dancing With The Stars | none | 8310136 | https://www.ticketliquidator.com/tickets/8310136/Dancing-With-The-Stars-tickets-Sat-Feb-20-2027-Vibrant-Arena-at-The-MARK | - |
| tm-dancing-with-the-stars-2027-omaha-vv1akzk4egkdjg6nb | Dancing With The Stars | none | 8310137 | https://www.ticketliquidator.com/tickets/8310137/Dancing-With-The-Stars-tickets-Tue-Feb-23-2027-CHI-Health-Center-Omaha | - |
| tm-dancing-with-the-stars-2027-kansas-city-vv1kbz_fk9g7ylk6 | Dancing With The Stars | none | 8310138 | https://www.ticketliquidator.com/tickets/8310138/Dancing-With-The-Stars-tickets-Wed-Feb-24-2027-T-Mobile-Center | - |
| tm-dancing-with-the-stars-2027-north-little-rock-g5viz_kxiccfs | Dancing With The Stars | none | 8310139 | https://www.ticketliquidator.com/tickets/8310139/Dancing-With-The-Stars-tickets-Thu-Feb-25-2027-Simmons-Bank-Arena | - |
| tm-dancing-with-the-stars-2027-saint-louis-vv1akzkfsgkdkbgr5 | Dancing With The Stars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dancing-with-the-stars-2027-knoxville-g5viz_kwuvui0 | Dancing With The Stars | none | 8310141 | https://www.ticketliquidator.com/tickets/8310141/Dancing-With-The-Stars-tickets-Sat-Feb-27-2027-Thompson-Boling-Arena-at-Food-City-Center | - |
| tm-dancing-with-the-stars-2027-nashville-g5viz_kb4-h48 | Dancing With The Stars | none | 8310142 | https://www.ticketliquidator.com/tickets/8310142/Dancing-With-The-Stars-tickets-Sun-Feb-28-2027-Bridgestone-Arena | - |
| tm-dancing-with-the-stars-2027-charlottesville-vv16vzk4vjsza2k7u6 | Dancing With The Stars | none | 8310143 | https://www.ticketliquidator.com/tickets/8310143/Dancing-With-The-Stars-tickets-Tue-Mar-2-2027-John-Paul-Jones-Arena | - |
| tm-dancing-with-the-stars-2027-orlando-1axzkfggkescv4v | Dancing With The Stars | none | 8310144 | https://www.ticketliquidator.com/tickets/8310144/Dancing-With-The-Stars-tickets-Sat-Mar-6-2027-Addition-Financial-Arena | - |
| tm-dancing-with-the-stars-2027-tampa-vvg1vz_kbbl4rs | Dancing With The Stars | none | 8310149 | https://www.ticketliquidator.com/tickets/8310149/Dancing-With-The-Stars-tickets-Tue-Mar-9-2027-Benchmark-International-Arena | - |
| tm-dancing-with-the-stars-2027-birmingham-1aezz_kgkwr4ecx | Dancing With The Stars | none | 8310150 | https://www.ticketliquidator.com/tickets/8310150/Dancing-With-The-Stars-tickets-Wed-Mar-10-2027-Legacy-Arena-at-The-BJCC | - |
| tm-dancing-with-the-stars-2027-new-orleans-g5viz_kxwz34h | Dancing With The Stars | none | 8310154 | https://www.ticketliquidator.com/tickets/8310154/Dancing-With-The-Stars-tickets-Thu-Mar-11-2027-Smoothie-King-Center | - |
| tm-dancing-with-the-stars-2027-austin-g5diz_knamopo | Dancing With The Stars | none | 8310155 | https://www.ticketliquidator.com/tickets/8310155/Dancing-With-The-Stars-tickets-Fri-Mar-12-2027-Moody-Center-ATX | - |
| tm-dancing-with-the-stars-2027-san-antonio-g5diz_kdu_auv | Dancing With The Stars | none | 8310156 | https://www.ticketliquidator.com/tickets/8310156/Dancing-With-The-Stars-tickets-Sat-Mar-13-2027-Frost-Bank-Center | - |
| tm-dancing-with-the-stars-2027-dallas-vvg1yz_ke4gsnj | Dancing With The Stars | none | 8310157 | https://www.ticketliquidator.com/tickets/8310157/Dancing-With-The-Stars-tickets-Tue-Mar-16-2027-American-Airlines-Center | - |
| tm-dancing-with-the-stars-2027-tulsa-1aezz_kgkslhpir | Dancing With The Stars | none | 8310158 | https://www.ticketliquidator.com/tickets/8310158/Dancing-With-The-Stars-tickets-Wed-Mar-17-2027-BOK-Center | - |
| tm-dancing-with-the-stars-2027-denver-g5vzz_kbv0118 | Dancing With The Stars | none | 8310159 | https://www.ticketliquidator.com/tickets/8310159/Dancing-With-The-Stars-tickets-Fri-Mar-19-2027-Ball-Arena | - |
| tm-dancing-with-the-stars-2027-seattle-vvg1hz_f63jugd | Dancing With The Stars | none | 8310160 | https://www.ticketliquidator.com/tickets/8310160/Dancing-With-The-Stars-tickets-Mon-Mar-22-2027-Climate-Pledge-Arena | - |
| tm-dancing-with-the-stars-2027-abbotsford-1aozkfygkejjqyp | Dancing With The Stars | none | 8310161 | https://www.ticketliquidator.com/tickets/8310161/Dancing-With-The-Stars-tickets-Tue-Mar-23-2027-Rogers-Forum | - |
| tm-dancing-with-the-stars-2027-portland-vvg1hz_kxomi0l | Dancing With The Stars | none | 8310162 | https://www.ticketliquidator.com/tickets/8310162/Dancing-With-The-Stars-tickets-Wed-Mar-24-2027-Moda-Center-at-the-Rose-Quarter | - |
| tm-dancing-with-the-stars-2027-sacramento-g5vyz_kzd-r6s | Dancing With The Stars | none | 8310163 | https://www.ticketliquidator.com/tickets/8310163/Dancing-With-The-Stars-tickets-Fri-Mar-26-2027-Golden-1-Center | - |
| tm-dancing-with-the-stars-2027-san-jose-g5vyz_kxgynut | Dancing With The Stars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dancing-with-the-stars-2027-san-diego-vvg1iz_kxrbyxe | Dancing With The Stars | none | 8310165 | https://www.ticketliquidator.com/tickets/8310165/Dancing-With-The-Stars-tickets-Wed-Mar-31-2027-Viejas-Arena-At-Aztec-Bowl | - |
| tm-dancing-with-the-stars-2027-anaheim-vv170z_kgkbh3n6- | Dancing With The Stars | none | 8310166 | https://www.ticketliquidator.com/tickets/8310166/Dancing-With-The-Stars-tickets-Thu-Apr-1-2027-Honda-Center | - |
| tm-dancing-with-the-stars-2027-los-angeles-g5eyz_fk9yzip | Dancing With The Stars | none | 8310167 | https://www.ticketliquidator.com/tickets/8310167/Dancing-With-The-Stars-tickets-Fri-Apr-2-2027-Cryptocom-Arena | - |
| tm-dancing-with-the-stars-2027-phoenix-1av0z_kgkb3yfyn | Dancing With The Stars | none | 8310168 | https://www.ticketliquidator.com/tickets/8310168/Dancing-With-The-Stars-tickets-Sun-Apr-4-2027-Mortgage-Matchup-Center | - |
| tm-dancing-with-the-stars-2027-mobile-g5viz_f1cm1bo | Dancing With The Stars | none | 8310169 | https://www.ticketliquidator.com/tickets/8310169/Dancing-With-The-Stars-tickets-Wed-Apr-7-2027-Regions-Arena | - |
| tm-dancing-with-the-stars-2027-greenville-g5evz_kdpl_8w | Dancing With The Stars | none | 8310170 | https://www.ticketliquidator.com/tickets/8310170/Dancing-With-The-Stars-tickets-Thu-Apr-8-2027-Bon-Secours-Wellness-Arena | - |
| tm-dancing-with-the-stars-2027-raleigh-g5evz_f60r-5g | Dancing With The Stars | none | 8310171 | https://www.ticketliquidator.com/tickets/8310171/Dancing-With-The-Stars-tickets-Fri-Apr-9-2027-Lenovo-Center | - |
| tm-dancing-with-the-stars-2027-charlotte-g5evz_kj22ebd | Dancing With The Stars | none | 8310173 | https://www.ticketliquidator.com/tickets/8310173/Dancing-With-The-Stars-tickets-Sat-Apr-10-2027-Spectrum-Center | - |
| tm-dancing-with-the-stars-2027-duluth-vvg1zz_km06fsr | Dancing With The Stars | none | 8310174 | https://www.ticketliquidator.com/tickets/8310174/Dancing-With-The-Stars-tickets-Sun-Apr-11-2027-Gas-South-Arena | - |
| tm-def-leppard-2027-allentown-1ayzk4agkdyeyao | Def Leppard | none | 8312060 | https://www.ticketliquidator.com/tickets/8312060/Def-Leppard-tickets-Tue-Mar-2-2027-PPL-Center | - |
| tm-def-leppard-2027-montreal-1aszk4agkdf99bi | Def Leppard | none | 8312100 | https://www.ticketliquidator.com/tickets/8312100/Def-Leppard-tickets-Fri-Mar-5-2027-Centre-Bell | - |
| tm-def-leppard-2027-detroit-vv1afzk4egkelpgxa | Def Leppard | none | 8312061 | https://www.ticketliquidator.com/tickets/8312061/Def-Leppard-tickets-Sun-Mar-7-2027-Little-Caesars-Arena | - |
| tm-def-leppard-2027-toronto-1a8zk4egkdrqf1w | Def Leppard | none | - | - | no qualifying listing (complete catalog checked) |
| tm-def-leppard-2027-quebec-1aszk4agkesu4rw | Def Leppard | none | 8312104 | https://www.ticketliquidator.com/tickets/8312104/Def-Leppard-tickets-Thu-Mar-11-2027-Centre-Videotron | - |
| tm-def-leppard-2027-newark-vv1aezk4kgkdvinob | Def Leppard | none | 8312062 | https://www.ticketliquidator.com/tickets/8312062/Def-Leppard-tickets-Sat-Mar-13-2027-Prudential-Center | - |
| tm-def-leppard-2027-boston-vv1a8vp88ga16tl3 | Def Leppard | none | 8312063 | https://www.ticketliquidator.com/tickets/8312063/Def-Leppard-tickets-Wed-Mar-17-2027-TD-Garden | - |
| tm-def-leppard-2027-nashville-g5viz_f9p6_vj | Def Leppard | none | 8312064 | https://www.ticketliquidator.com/tickets/8312064/Def-Leppard-tickets-Fri-Mar-19-2027-Bridgestone-Arena | - |
| tm-def-leppard-2027-washington-17a8v0g62pvh_yy | Def Leppard | none | 8312065 | https://www.ticketliquidator.com/tickets/8312065/Def-Leppard-tickets-Sun-Mar-21-2027-Capital-One-Arena | - |
| tm-def-leppard-2027-pittsburgh-1apzk4egkdr8ult | Def Leppard | none | 8312066 | https://www.ticketliquidator.com/tickets/8312066/Def-Leppard-tickets-Tue-Mar-23-2027-PPG-Paints-Arena | - |
| tm-def-leppard-2027-chicago-vv1k8z_fgkg7dl8f | Def Leppard | none | 8312067 | https://www.ticketliquidator.com/tickets/8312067/Def-Leppard-tickets-Thu-Mar-25-2027-United-Center | - |
| tm-def-leppard-2027-denver-g5vzz_frfov07 | Def Leppard | none | 8312069 | https://www.ticketliquidator.com/tickets/8312069/Def-Leppard-tickets-Mon-Mar-29-2027-Ball-Arena | - |
| tm-def-leppard-2027-austin-g5diz_f1_s12h | Def Leppard | none | 8312071 | https://www.ticketliquidator.com/tickets/8312071/Def-Leppard-tickets-Tue-Apr-13-2027-Moody-Center-ATX | - |
| tm-def-leppard-2027-north-little-rock-g5viz_f5gacpb | Def Leppard | none | 8312072 | https://www.ticketliquidator.com/tickets/8312072/Def-Leppard-tickets-Fri-Apr-16-2027-Simmons-Bank-Arena | - |
| tm-def-leppard-2027-fort-worth-vvg1yz_fhfmaat | Def Leppard | unverify (applied) | 8312073 | https://www.ticketliquidator.com/tickets/8312073/Def-Leppard-tickets-Sun-Apr-18-2027-Dickies-Arena | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-def-leppard-2027-mobile-g5viz_fptcweu | Def Leppard | none | 8312074 | https://www.ticketliquidator.com/tickets/8312074/Def-Leppard-tickets-Tue-Apr-20-2027-Regions-Arena | - |
| tm-def-leppard-2027-wichita-vv1akzk4kgkexoysl | Def Leppard | none | 8312075 | https://www.ticketliquidator.com/tickets/8312075/Def-Leppard-tickets-Thu-Apr-22-2027-INTRUST-Bank-Arena | - |
| tm-def-leppard-2027-lincoln-vv1akzk4vgkel3utc | Def Leppard | none | 8312076 | https://www.ticketliquidator.com/tickets/8312076/Def-Leppard-tickets-Sat-Apr-24-2027-Pinnacle-Bank-Arena | - |
| tm-def-leppard-2027-glendale-1kk8vp8bga1l7cc | Def Leppard | none | 8312078 | https://www.ticketliquidator.com/tickets/8312078/Def-Leppard-tickets-Thu-Apr-29-2027-Desert-Diamond-Arena | - |
| tm-def-leppard-2027-hollywood-vvg1iz_f7e8nik | Def Leppard | none | 8312079 | https://www.ticketliquidator.com/tickets/8312079/Def-Leppard-tickets-Sat-May-1-2027-Hollywood-Bowl | - |
| tm-def-leppard-2027-san-francisco-g5vyz_f5oof-x | Def Leppard | none | 8312080 | https://www.ticketliquidator.com/tickets/8312080/Def-Leppard-tickets-Wed-May-5-2027-Chase-Center | - |
| tm-def-leppard-2027-sacramento-g5vyz_f5hdkto | Def Leppard | none | 8312081 | https://www.ticketliquidator.com/tickets/8312081/Def-Leppard-tickets-Fri-May-7-2027-Golden-1-Center | - |
| tm-def-leppard-2027-seattle-vvg1hz_f1kfpyl | Def Leppard | none | 8312082 | https://www.ticketliquidator.com/tickets/8312082/Def-Leppard-tickets-Sun-May-9-2027-Climate-Pledge-Arena | - |
| tm-def-leppard-2027-vancouver-1aozk4agkddzaes | Def Leppard | none | 8312105 | https://www.ticketliquidator.com/tickets/8312105/Def-Leppard-tickets-Fri-May-14-2027-Rogers-Arena | - |
| tm-def-leppard-2027-edmonton-1k78vpoiga55fiz | Def Leppard | none | 8312106 | https://www.ticketliquidator.com/tickets/8312106/Def-Leppard-tickets-Sun-May-16-2027-Rogers-Place | - |
| tm-def-leppard-2027-san-antonio-g5diz_fqmcwez | Def Leppard | none | 8312084 | https://www.ticketliquidator.com/tickets/8312084/Def-Leppard-tickets-Sat-May-29-2027-Frost-Bank-Center | - |
| tm-def-leppard-2027-oklahoma-city-vvg1yz_fkymbmf | Def Leppard | none | 8312086 | https://www.ticketliquidator.com/tickets/8312086/Def-Leppard-tickets-Thu-Jun-3-2027-Paycom-Center | - |
| tm-def-leppard-2027-milwaukee-vv1a6zk4kgkd_k6yp | Def Leppard | none | 8312087 | https://www.ticketliquidator.com/tickets/8312087/Def-Leppard-tickets-Sat-Jun-5-2027-Fiserv-Forum | - |
| tm-def-leppard-2027-saint-louis-vv1kvovp8tga1iyft | Def Leppard | none | - | - | no qualifying listing (complete catalog checked) |
| tm-def-leppard-2027-louisville-1kaovpoiga1ispc | Def Leppard | none | 8312089 | https://www.ticketliquidator.com/tickets/8312089/Def-Leppard-tickets-Wed-Jun-9-2027-KFC-Yum-Center | - |
| tm-def-leppard-2027-savannah-vvg1zz_fqp5bwn | Def Leppard | none | 8312090 | https://www.ticketliquidator.com/tickets/8312090/Def-Leppard-tickets-Fri-Jun-11-2027-Enmarket-Arena | - |
| tm-def-leppard-2027-tampa-vvg1vz_fpw01di | Def Leppard | none | 8312091 | https://www.ticketliquidator.com/tickets/8312091/Def-Leppard-tickets-Sun-Jun-13-2027-Benchmark-International-Arena | - |
| tm-def-leppard-2027-atlanta-vvg1zz_fpttjci | Def Leppard | none | 8312092 | https://www.ticketliquidator.com/tickets/8312092/Def-Leppard-tickets-Thu-Jun-17-2027-State-Farm-Arena-GA | - |
| tm-def-leppard-2027-columbus-vv1aazk4kgkdpgu4v | Def Leppard | none | 8312093 | https://www.ticketliquidator.com/tickets/8312093/Def-Leppard-tickets-Sat-Jun-19-2027-Value-City-Arena-at-The-Schottenstein-Center | - |
| tm-def-leppard-2027-new-york-g5diz_fkxvp6l | Def Leppard | none | 8312095 | https://www.ticketliquidator.com/tickets/8312095/Def-Leppard-tickets-Wed-Jun-23-2027-Madison-Square-Garden | - |
| tm-def-leppard-2027-uncasville-g5vvz_fbgzjmo | Def Leppard | none | 8312096 | https://www.ticketliquidator.com/tickets/8312096/Def-Leppard-tickets-Fri-Jun-25-2027-Mohegan-Sun-Arena-CT | - |
| tm-def-leppard-2027-philadelphia-1ayzk4agkeprd7q | Def Leppard | none | 8312097 | https://www.ticketliquidator.com/tickets/8312097/Def-Leppard-tickets-Sun-Jun-27-2027-Xfinity-Mobile-Arena | - |
| tm-def-leppard-2027-charlotte-g5evz_fps2umn | Def Leppard | none | 8312098 | https://www.ticketliquidator.com/tickets/8312098/Def-Leppard-tickets-Wed-Jun-30-2027-Spectrum-Center | - |
| tm-def-leppard-2027-indianapolis-vv1kv8vp8_ga1mpgy | Def Leppard | none | 8312099 | https://www.ticketliquidator.com/tickets/8312099/Def-Leppard-tickets-Fri-Jul-2-2027-Gainbridge-Fieldhouse | - |
| tm-nickelback-2026-durant-vvg1yz_3xvgs07 | Nickelback | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nickelback-2027-pittsburgh-1apzk4agkenjp68 | Nickelback | none | 8314930 | https://www.ticketliquidator.com/tickets/8314930/Nickelback-tickets-Sat-Feb-6-2027-PPG-Paints-Arena | - |
| tm-nickelback-2027-allentown-15dzz_frakkqv | Nickelback | none | 8314931 | https://www.ticketliquidator.com/tickets/8314931/Nickelback-tickets-Mon-Feb-8-2027-PPL-Center | - |
| tm-nickelback-2027-grand-rapids-vv1afzk4agkd4fpse | Nickelback | none | 8314932 | https://www.ticketliquidator.com/tickets/8314932/Nickelback-tickets-Wed-Feb-10-2027-Van-Andel-Arena | - |
| tm-nickelback-2027-columbus-vv1aazk4agkduqw0h | Nickelback | none | 8314934 | https://www.ticketliquidator.com/tickets/8314934/Nickelback-tickets-Sat-Feb-13-2027-Value-City-Arena-at-The-Schottenstein-Center | - |
| tm-nickelback-2027-indianapolis-vv1aazk4agkdzn6zd | Nickelback | none | 8314935 | https://www.ticketliquidator.com/tickets/8314935/Nickelback-tickets-Tue-Feb-16-2027-Gainbridge-Fieldhouse | - |
| tm-nickelback-2027-chicago-vv1a7zk4agkexo6el | Nickelback | none | 8314936 | https://www.ticketliquidator.com/tickets/8314936/Nickelback-tickets-Thu-Feb-18-2027-United-Center | - |
| tm-nickelback-2027-saint-louis-vv1akzk4kgkdiwpu8 | Nickelback | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nickelback-2027-nashville-g5viz_frya27y | Nickelback | none | 8314938 | https://www.ticketliquidator.com/tickets/8314938/Nickelback-tickets-Sun-Feb-21-2027-Bridgestone-Arena | - |
| tm-nickelback-2027-knoxville-g5viz_f9kxnbt | Nickelback | none | 8314939 | https://www.ticketliquidator.com/tickets/8314939/Nickelback-tickets-Wed-Feb-24-2027-Thompson-Boling-Arena-at-Food-City-Center | - |
| tm-nickelback-2027-hollywood-vvg1vz_fpmhiza | Nickelback | none | 8314940 | https://www.ticketliquidator.com/tickets/8314940/Nickelback-tickets-Fri-Feb-26-2027-Hard-Rock-Live-At-The-Seminole-Hard-Rock-Hotel-Casino-Hollywood | - |
| tm-nickelback-2027-atlanta-vvg1zz_f9i_ugh | Nickelback | none | 8314941 | https://www.ticketliquidator.com/tickets/8314941/Nickelback-tickets-Tue-Mar-2-2027-State-Farm-Arena-GA | - |
| tm-nickelback-2027-raleigh-g5evz_fh5odfi | Nickelback | none | 8314942 | https://www.ticketliquidator.com/tickets/8314942/Nickelback-tickets-Thu-Mar-4-2027-Lenovo-Center | - |
| tm-nickelback-2027-newark-vv1kfz_fj7g7twmf | Nickelback | none | 8314943 | https://www.ticketliquidator.com/tickets/8314943/Nickelback-tickets-Sat-Mar-6-2027-Prudential-Center | - |
| tm-nickelback-2027-washington-16vfz_ffeg7mdpa | Nickelback | none | 8314944 | https://www.ticketliquidator.com/tickets/8314944/Nickelback-tickets-Mon-Mar-8-2027-Capital-One-Arena | - |
| tm-nickelback-2027-boston-vv1avzk4egkdzjayi | Nickelback | none | 8314945 | https://www.ticketliquidator.com/tickets/8314945/Nickelback-tickets-Wed-Mar-10-2027-TD-Garden | - |
| tm-nickelback-2027-montreal-15d7z_fqpa0kk | Nickelback | none | 8314962 | https://www.ticketliquidator.com/tickets/8314962/Nickelback-tickets-Fri-Mar-12-2027-Centre-Bell | - |
| tm-nickelback-2027-hamilton-1a8zk4axofsze2g | Nickelback | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nickelback-2027-toronto-1a8zk47gkdvbcpm | Nickelback | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nickelback-2027-buffalo-k7vgf_fruee-y | Nickelback | none | 8314946 | https://www.ticketliquidator.com/tickets/8314946/Nickelback-tickets-Wed-Mar-24-2027-KeyBank-Center | - |
| tm-nickelback-2027-detroit-vv1afzk46gkdogect | Nickelback | none | 8314947 | https://www.ticketliquidator.com/tickets/8314947/Nickelback-tickets-Fri-Mar-26-2027-Little-Caesars-Arena | - |
| tm-nickelback-2027-milwaukee-vv1a6zk4agkd7raaf | Nickelback | none | 8314948 | https://www.ticketliquidator.com/tickets/8314948/Nickelback-tickets-Sat-Mar-27-2027-Fiserv-Forum | - |
| tm-nickelback-2027-saskatoon-16v7z_ff7g7wwtw | Nickelback | none | 8314965 | https://www.ticketliquidator.com/tickets/8314965/Nickelback-tickets-Fri-Apr-2-2027-SaskTel-Centre | - |
| tm-nickelback-2027-edmonton-1f78vpoopnz72877 | Nickelback | none | 8314966 | https://www.ticketliquidator.com/tickets/8314966/Nickelback-tickets-Sat-Apr-3-2027-Rogers-Place | - |
| tm-nickelback-2027-calgary-1aozk4kgkd_yj0d | Nickelback | none | 8314968 | https://www.ticketliquidator.com/tickets/8314968/Nickelback-tickets-Tue-Apr-6-2027-Scotiabank-Saddledome | - |
| tm-nickelback-2027-vancouver-1aozk4agkdpx1_p | Nickelback | none | 8314969 | https://www.ticketliquidator.com/tickets/8314969/Nickelback-tickets-Fri-Apr-9-2027-Rogers-Arena | - |
| tm-nickelback-2027-seattle-vvg1hz_f5mpsjc | Nickelback | none | 8314951 | https://www.ticketliquidator.com/tickets/8314951/Nickelback-tickets-Sat-Apr-10-2027-Climate-Pledge-Arena | - |
| tm-nickelback-2027-sacramento-g5vyz_f9d-9xg | Nickelback | none | 8314952 | https://www.ticketliquidator.com/tickets/8314952/Nickelback-tickets-Tue-Apr-13-2027-Golden-1-Center | - |
| tm-nickelback-2027-anaheim-vv1aazk4kgkeh-rr7 | Nickelback | none | 8314954 | https://www.ticketliquidator.com/tickets/8314954/Nickelback-tickets-Sun-Apr-18-2027-Honda-Center | - |
| tm-nickelback-2027-phoenix-1a_zk4kgkd7q1b3 | Nickelback | none | 8314956 | https://www.ticketliquidator.com/tickets/8314956/Nickelback-tickets-Tue-Apr-20-2027-Mortgage-Matchup-Center | - |
| tm-nickelback-2027-denver-g5vzz_fpgv_um | Nickelback | none | 8314958 | https://www.ticketliquidator.com/tickets/8314958/Nickelback-tickets-Sat-Apr-24-2027-Ball-Arena | - |
| tm-nickelback-2027-dallas-vvg1yz_f9cwbxt | Nickelback | none | 8314959 | https://www.ticketliquidator.com/tickets/8314959/Nickelback-tickets-Tue-Apr-27-2027-American-Airlines-Center | - |
| tm-nickelback-2027-san-antonio-g5diz_fruim0m | Nickelback | none | 8314961 | https://www.ticketliquidator.com/tickets/8314961/Nickelback-tickets-Sat-May-1-2027-Frost-Bank-Center | - |
| tm-nickelback-2027-leeds-g5vhz_flmspew | Nickelback | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nickelback-2027-london-1agzk46gkdjr1bv | Nickelback | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nickelback-2027-birmingham-1kfyvp3_gagcomu | Nickelback | none | 8314975 | https://www.ticketliquidator.com/tickets/8314975/Nickelback-tickets-Fri-May-28-2027-Utilita-Arena-Birmingham | - |
| tm-nickelback-2027-dublin-1abzkfmgkepnjt6 | Nickelback | none | 8314976 | https://www.ticketliquidator.com/tickets/8314976/Nickelback-tickets-Sun-May-30-2027-3Arena-Dublin | - |
| tm-nickelback-2027-glasgow-1auzk46gkexekqz | Nickelback | none | 8314978 | https://www.ticketliquidator.com/tickets/8314978/Nickelback-tickets-Tue-Jun-1-2027-OVO-Hydro | - |
| tm-nickelback-2027-manchester-1amzk46gkdgpim1 | Nickelback | none | 8314791 | https://www.ticketliquidator.com/tickets/8314791/Nickelback-tickets-Wed-Jun-2-2027-Co-Op-Live | - |
| tm-nickelback-2027-forest-brussels-z698xzg2z1kppuzf3 | Nickelback | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nickelback-2027-amsterdam-z698xzbpz1k-uqgjg | Nickelback | none | 8314980 | https://www.ticketliquidator.com/tickets/8314980/Nickelback-tickets-Mon-Jun-7-2027-Ziggo-Dome | - |
| tm-nickelback-2027-hannover-z698xzc2z16v-v0tgv | Nickelback | none | 8314982 | https://www.ticketliquidator.com/tickets/8314982/Nickelback-tickets-Fri-Jun-11-2027-ZAG-Arena | - |
| tm-nickelback-2027-munich-z698xzc2z1k-kk3-_ | Nickelback | none | 8314985 | https://www.ticketliquidator.com/tickets/8314985/Nickelback-tickets-Sat-Jun-19-2027-Kleine-Olympiahalle-Munich | - |
| tm-nickelback-2027-assago-zg9rmiynyza161 | Nickelback | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nickelback-2027-odz-z698xzqpz1kvw7fvb | Nickelback | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jay-wheeler-2026-malaga-z698xz2qz1kf3jk0a | Jay Wheeler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jay-wheeler-2026-valencia-z698xz2qz16v4e4u-v | Jay Wheeler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jay-wheeler-2026-bilbao-z698xz2qz1kvb7mek | Jay Wheeler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jay-wheeler-2026-madrid-z698xz2qz16va4ba8- | Jay Wheeler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jay-wheeler-2026-barcelona-z698xz2qz1k-ngufw | Jay Wheeler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jay-wheeler-2027-miami-vvg1vz_f7_l-6l | Jay Wheeler | none | 8307352 | https://www.ticketliquidator.com/tickets/8307352/Jay-Wheeler-tickets-Thu-Mar-11-2027-Kaseya-Center | - |
| tm-jay-wheeler-2027-atlanta-vvg1zz_f288dbv | Jay Wheeler | none | 8307353 | https://www.ticketliquidator.com/tickets/8307353/Jay-Wheeler-tickets-Fri-Mar-12-2027-Coca-Cola-Roxy | - |
| tm-jay-wheeler-2027-charlotte-g5evz_f75dxcp | Jay Wheeler | none | 8307354 | https://www.ticketliquidator.com/tickets/8307354/Jay-Wheeler-tickets-Sun-Mar-14-2027-Ovens-Auditorium | - |
| tm-jay-wheeler-2027-washington-1a4zk4egkd30m3a | Jay Wheeler | none | 8307355 | https://www.ticketliquidator.com/tickets/8307355/Jay-Wheeler-tickets-Thu-Mar-18-2027-DAR-Constitution-Hall | - |
| tm-jay-wheeler-2027-atlantic-city-vv1aezk4vgkduqubi | Jay Wheeler | none | 8307356 | https://www.ticketliquidator.com/tickets/8307356/Jay-Wheeler-tickets-Fri-Mar-19-2027-Hard-Rock-Live-At-Etess-Arena | - |
| tm-jay-wheeler-2027-mashantucket-g5vvz_fp_melk | Jay Wheeler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jay-wheeler-2027-brooklyn-1ayzk4vgkebxenn | Jay Wheeler | none | 8307360 | https://www.ticketliquidator.com/tickets/8307360/Jay-Wheeler-tickets-Wed-Mar-24-2027-Barclays-Center | - |
| tm-jay-wheeler-2027-reading-vv17fz_kgkblt_5x | Jay Wheeler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jay-wheeler-2027-boston-vv1avzk4agkejxnem | Jay Wheeler | none | 8309790 | https://www.ticketliquidator.com/tickets/8309790/Jay-Wheeler-tickets-Sat-Mar-27-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-jay-wheeler-2027-rosemont-vv178z_kgkbjdkxl | Jay Wheeler | none | 8307363 | https://www.ticketliquidator.com/tickets/8307363/Jay-Wheeler-tickets-Fri-Apr-2-2027-Rosemont-Theatre | - |
| tm-jay-wheeler-2027-denver-g5vzz_f20_jhu | Jay Wheeler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jay-wheeler-2027-irving-vvg1yz_f8nrws_ | Jay Wheeler | none | 8307366 | https://www.ticketliquidator.com/tickets/8307366/Jay-Wheeler-tickets-Tue-Apr-6-2027-The-Pavilion-at-Toyota-Music-Factory | - |
| tm-jay-wheeler-2027-houston-g5diz_f62ij1f | Jay Wheeler | none | 8307367 | https://www.ticketliquidator.com/tickets/8307367/Jay-Wheeler-tickets-Wed-Apr-7-2027-713-Music-Hall | - |
| tm-jay-wheeler-2027-inglewood-vvg1iz_f8af9cn | Jay Wheeler | none | 8307369 | https://www.ticketliquidator.com/tickets/8307369/Jay-Wheeler-tickets-Sat-Apr-10-2027-YouTube-Theater-at-Hollywood-Park | - |
| tm-jay-wheeler-2027-orlando-1axzk4vgkd6tfj5 | Jay Wheeler | none | 8307371 | https://www.ticketliquidator.com/tickets/8307371/Jay-Wheeler-tickets-Thu-Apr-15-2027-Kia-Center | - |
| tm-mico-2026-nashville-g5viz_1mfi-bc | Mico | none | 7977769 | https://www.ticketliquidator.com/tickets/7977769/Mico-tickets-Mon-Oct-26-2026-Brooklyn-Bowl-Nashville | - |
| tm-mico-2026-atlanta-vvg1zz_1d2p0tb | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2026-washington-17a8v0g61sa7y8c | Mico | none | 7977761 | https://www.ticketliquidator.com/tickets/7977761/Mico-tickets-Thu-Oct-29-2026-930-Club | - |
| tm-mico-2026-new-york-z7r9jz1a70u7_ | Mico | none | 7977878 | https://www.ticketliquidator.com/tickets/7977878/Mico-tickets-Fri-Oct-30-2026-Webster-Hall | - |
| tm-mico-2026-brooklyn-z7r9jz1a70uez | Mico | none | 7977870 | https://www.ticketliquidator.com/tickets/7977870/Mico-tickets-Sat-Oct-31-2026-Music-Hall-Of-Williamsburg | - |
| tm-mico-2026-boston-vvg17z_1mkpkh2 | Mico | none | 7977758 | https://www.ticketliquidator.com/tickets/7977758/Mico-tickets-Mon-Nov-2-2026-Paradise-Rock-Club-Presented-by-Citizens | - |
| tm-mico-2026-providence-z7r9jz1a7p0b9 | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2026-montreal-16szkfk00zagk68g | Mico | none | 8199474 | https://www.ticketliquidator.com/tickets/8199474/Mico-tickets-Thu-Nov-5-2026-MTelus | - |
| tm-mico-2026-toronto-177zv0g61sycnt1 | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2026-toronto-177zv0g659n9upv | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2027-barcelona-z698xz2qz1k4j0yoa | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2027-amsterdam-z698xzbpz16vzefpea | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2027-manchester-g5vhz_flmnkjc | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2027-london-g5vhz_fjlqa3s | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2027-dublin-1abzk46gkd9elri | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2027-charlotte-g5evz_fqqay6k | Mico | none | 8315048 | https://www.ticketliquidator.com/tickets/8315048/Mico-tickets-Sat-Feb-20-2027-The-Underground-Charlotte | - |
| tm-mico-2027-charleston-g5evz_fxr2vbf | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2027-ft-lauderdale-vvg1vz_fqxgdhj | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2027-st-petersburg-vvg1vz_fxbu9sq | Mico | none | 8315051 | https://www.ticketliquidator.com/tickets/8315051/Mico-tickets-Fri-Feb-26-2027-Jannus-Live | - |
| tm-mico-2027-orlando-16efz_fbzg7m_te | Mico | none | 8315052 | https://www.ticketliquidator.com/tickets/8315052/Mico-tickets-Sat-Feb-27-2027-House-Of-Blues-Orlando | - |
| tm-mico-2027-birmingham-1aozk4fgkdswfqm | Mico | none | 8315053 | https://www.ticketliquidator.com/tickets/8315053/Mico-tickets-Mon-Mar-1-2027-Iron-City-Birmingham | - |
| tm-mico-2027-new-orleans-g5viz_f97lnal | Mico | none | 8315055 | https://www.ticketliquidator.com/tickets/8315055/Mico-tickets-Tue-Mar-2-2027-House-Of-Blues-New-Orleans | - |
| tm-mico-2027-indianapolis-vv1aazk4kgkenppel | Mico | none | 8315056 | https://www.ticketliquidator.com/tickets/8315056/Mico-tickets-Tue-Mar-9-2027-The-Deluxe-at-Old-National-Centre | - |
| tm-mico-2027-cincinnati-1apzk47gkdey9ag | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-trans-siberian-orchestra-2026-toronto-1avzz_8gkmdenjm | Trans-Siberian Orchestra | none | - | - | no qualifying listing (complete catalog checked) |
| tm-trans-siberian-orchestra-2026-kansas-city-vv1kvovpkbgacwdwu | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-buffalo-k7vgf_okhdtog | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-trans-siberian-orchestra-2026-saint-louis-vv1akzkfbgkdrsdgs | Trans-Siberian Orchestra | none | - | - | no qualifying listing (complete catalog checked) |
| tm-chelsea-cutler-2027-saint-petersburg-z7r9jz1aae_gk | Chelsea Cutler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-chelsea-cutler-2027-atlanta-z7r9jz1aae_gf | Chelsea Cutler | none | 8301015 | https://www.ticketliquidator.com/tickets/8301015/Chelsea-Cutler-tickets-Sat-Jan-30-2027-The-Eastern-GA | - |
| tm-chelsea-cutler-2027-nashville-z7r9jz1aaefb3 | Chelsea Cutler | none | 8301016 | https://www.ticketliquidator.com/tickets/8301016/Chelsea-Cutler-tickets-Wed-Feb-3-2027-Marathon-Music-Works | - |
| tm-chelsea-cutler-2027-boston-z7r9jz1aaefp9 | Chelsea Cutler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-chelsea-cutler-2027-columbus-z7r9jz1aaef0s | Chelsea Cutler | none | 8301018 | https://www.ticketliquidator.com/tickets/8301018/Chelsea-Cutler-tickets-Sun-Feb-21-2027-Newport-Music-Hall | - |
| tm-chelsea-cutler-2027-denver-z7r9jz1aae_g4 | Chelsea Cutler | none | 8301019 | https://www.ticketliquidator.com/tickets/8301019/Chelsea-Cutler-tickets-Sun-Feb-28-2027-The-Mission-Ballroom | - |
| tm-chelsea-cutler-2027-san-francisco-z7r9jz1aae_gp | Chelsea Cutler | none | 8301020 | https://www.ticketliquidator.com/tickets/8301020/Chelsea-Cutler-tickets-Sat-Mar-6-2027-The-Midway-CA | - |
| tm-chelsea-cutler-2027-salt-lake-city-z7r9jz1aaefp4 | Chelsea Cutler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-chelsea-cutler-2027-seattle-z7r9jz1aae_g9 | Chelsea Cutler | none | 8301029 | https://www.ticketliquidator.com/tickets/8301029/Chelsea-Cutler-tickets-Fri-Mar-12-2027-Showbox-SoDo | - |
| tm-chelsea-cutler-2027-portland-z7r9jz1aae_gb | Chelsea Cutler | none | 8301030 | https://www.ticketliquidator.com/tickets/8301030/Chelsea-Cutler-tickets-Sat-Mar-13-2027-Roseland-Theater | - |
| tm-the-red-clay-strays-2027-jacksonville-z7r9jz1aaef4f | The Red Clay Strays | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-red-clay-strays-2027-green-bay-z7r9jz1aaef4y | The Red Clay Strays | none | 8307875 | https://www.ticketliquidator.com/tickets/8307875/The-Red-Clay-Strays-tickets-Thu-Aug-5-2027-Resch-Center | - |
| tm-the-red-clay-strays-2027-fresno-z7r9jz1aaefgo | The Red Clay Strays | none | 8301706 | https://www.ticketliquidator.com/tickets/8301706/The-Red-Clay-Strays-tickets-Fri-Aug-13-2027-Save-Mart-Center | - |
| tm-the-red-clay-strays-2027-englewood-z7r9jz1aaef4s | The Red Clay Strays | none | 8301199 | https://www.ticketliquidator.com/tickets/8301199/The-Red-Clay-Strays-tickets-Sat-Aug-28-2027-Fiddlers-Green-Amphitheatre | - |
| tm-the-red-clay-strays-2027-huntsville-z7r9jz1aaek-6 | The Red Clay Strays | none | 8301038 | https://www.ticketliquidator.com/tickets/8301038/The-Red-Clay-Strays-tickets-Sat-Sep-11-2027-The-Orion-Amphitheater | - |
| tm-the-red-clay-strays-2027-oklahoma-city-z7r9jz1aaefef | The Red Clay Strays | none | 8301039 | https://www.ticketliquidator.com/tickets/8301039/The-Red-Clay-Strays-tickets-Thu-Sep-16-2027-Paycom-Center | - |
| tm-fontaines-d-c-2027-columbus-z7r9jz1aaepk6 | Fontaines D.C. | none | 8307056 | https://www.ticketliquidator.com/tickets/8307056/Fontaines-DC-tickets-Fri-Sep-24-2027-KEMBA-Live | - |
| tm-fontaines-d-c-2027-forest-hills-z7r9jz1aaep7g | Fontaines D.C. | none | 8303817 | https://www.ticketliquidator.com/tickets/8303817/Fontaines-DC-tickets-Tue-Sep-28-2027-Forest-Hills-Stadium | - |
| tm-fontaines-d-c-2027-forest-hills-z7r9jz1aa7v_9 | Fontaines D.C. | none | 8312114 | https://www.ticketliquidator.com/tickets/8312114/Fontaines-DC-tickets-Wed-Sep-29-2027-Forest-Hills-Stadium | - |
| tm-fontaines-d-c-2027-nashville-z7r9jz1aaepkf | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-morrison-z7r9jz1aaepka | Fontaines D.C. | none | 8303825 | https://www.ticketliquidator.com/tickets/8303825/Fontaines-DC-tickets-Wed-Oct-13-2027-Red-Rocks-Amphitheatre | - |
| tm-staind-2027-spokane-z7r9jz1aae_qs | Staind | none | 8308780 | https://www.ticketliquidator.com/tickets/8308780/Staind-tickets-Fri-Mar-26-2027-Numerica-Veterans-Arena | - |
| tm-staind-2027-billings-z7r9jz1aae_qg | Staind | none | 8308784 | https://www.ticketliquidator.com/tickets/8308784/Staind-tickets-Sat-Apr-3-2027-First-Interstate-Arena | - |
| tm-staind-2027-cleveland-z7r9jz1aae_q- | Staind | none | 8308792 | https://www.ticketliquidator.com/tickets/8308792/Staind-tickets-Fri-Apr-16-2027-Rocket-Arena | - |
| tm-warren-zeiders-2027-kansas-city-z7r9jz1aaeb7w | Warren Zeiders | none | 8307502 | https://www.ticketliquidator.com/tickets/8307502/Warren-Zeiders-tickets-Thu-Apr-1-2027-The-Midland-Theatre-MO | - |
| tm-warren-zeiders-2027-fort-worth-z7r9jz1aaeb7s | Warren Zeiders | none | - | - | no qualifying listing (complete catalog checked) |
| tm-warren-zeiders-2027-helotes-z7r9jz1aaeb7v | Warren Zeiders | none | 8307508 | https://www.ticketliquidator.com/tickets/8307508/Warren-Zeiders-tickets-Sat-Apr-10-2027-John-T-Floore-Country-Store | - |
| tm-warren-zeiders-2027-louisville-z7r9jz1aaeb7g | Warren Zeiders | none | 8307490 | https://www.ticketliquidator.com/tickets/8307490/Warren-Zeiders-tickets-Fri-Apr-16-2027-Old-Foresters-Paristown-Hall | - |
| tm-bruno-mars-2026-ciudad-de-mexico-1afzkokgkesyi9m | Bruno Mars | none | 7798132 | https://www.ticketliquidator.com/tickets/7798132/Bruno-Mars-tickets-Thu-Dec-3-2026-Estadio-GNP-Seguros-Mexico-City | - |
| tm-bruno-mars-2026-ciudad-de-mexico-1afzkokgkehfcxu | Bruno Mars | none | 7798133 | https://www.ticketliquidator.com/tickets/7798133/Bruno-Mars-tickets-Fri-Dec-4-2026-Estadio-GNP-Seguros-Mexico-City | - |
| tm-bruno-mars-2026-ciudad-de-mexico-1afzkokgkehfwxy | Bruno Mars | none | 7798135 | https://www.ticketliquidator.com/tickets/7798135/Bruno-Mars-tickets-Mon-Dec-7-2026-Estadio-GNP-Seguros-Mexico-City | - |
| tm-bruno-mars-2026-ciudad-de-mexico-1afzkokgkehfwxd | Bruno Mars | none | 7798136 | https://www.ticketliquidator.com/tickets/7798136/Bruno-Mars-tickets-Tue-Dec-8-2026-Estadio-GNP-Seguros-Mexico-City | - |
| tm-bruno-mars-2026-ciudad-de-mexico-1afzkokgkehaqnd | Bruno Mars | none | 8271253 | https://www.ticketliquidator.com/tickets/8271253/Bruno-Mars-tickets-Fri-Dec-11-2026-Estadio-GNP-Seguros-Mexico-City | - |
| tm-bruno-mars-2027-auckland-1a0zkfkgkeslw-y | Bruno Mars | none | 8244830 | https://www.ticketliquidator.com/tickets/8244830/Bruno-Mars-tickets-Sat-Mar-13-2027-Eden-Park-New-Zealand | - |
| tm-bruno-mars-2027-auckland-1ae8z_ogkiuunsj | Bruno Mars | none | 8244848 | https://www.ticketliquidator.com/tickets/8244848/Bruno-Mars-tickets-Sun-Mar-14-2027-Eden-Park-New-Zealand | - |
| tm-bruno-mars-2027-auckland-1ae8z_ogksqr0wn | Bruno Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-niall-horan-2027-ciudad-de-mexico-1afzkfegkdnvnrg | Niall Horan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-niall-horan-2027-ciudad-de-mexico-1afzkfegkdpr1hq | Niall Horan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-niall-horan-2027-tlajomulco-de-zuniga-g5dvz_31eksvx | Niall Horan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sombr-2027-mexico-1av8z_agkn6tndi | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sombr-2027-mexico-1av8z_agknaoeux | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sombr-2027-auckland-1ae8z_ogkmlufo4 | Sombr | none | 8264595 | https://www.ticketliquidator.com/tickets/8264595/sombr-tickets-Tue-Apr-27-2027-Spark-Arena | - |
| tm-sombr-2027-fornebu-z698xzb_z16vfe17ut | Sombr | none | 8245506 | https://www.ticketliquidator.com/tickets/8245506/sombr-tickets-Sat-May-8-2027-Unity-Arena | - |
| tm-sombr-2027-helsinki-z698xz8kz1kuwpvu6 | Sombr | none | 8245507 | https://www.ticketliquidator.com/tickets/8245507/sombr-tickets-Tue-May-11-2027-Veikkaus-Arena | - |
| tm-sombr-2027-praha-9-z698xzu0z16v-zgmz9 | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sombr-2027-zurich-z698xzu3z16vqgjk0e | Sombr | none | 8245518 | https://www.ticketliquidator.com/tickets/8245518/sombr-tickets-Thu-May-27-2027-Hallenstadion-Zurich | - |
| tm-sombr-2027-vienna-z698xz5rz16vfevjbe | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-john-summit-2027-zurich-z698xzu3z1kxvu8oj | John Summit | none | 8310405 | https://www.ticketliquidator.com/tickets/8310405/John-Summit-tickets-Sat-Feb-20-2027-Halle-622 | - |
| tm-karol-g-2026-guadalupe-g5dvz_fd0l9ge | Karol G | none | - | - | no qualifying listing (complete catalog checked) |
| tm-karol-g-2026-guadalupe-g5dvz_fdjam8c | Karol G | none | - | - | no qualifying listing (complete catalog checked) |
| tm-karol-g-2026-guadalupe-g5dvz_fdjk688 | Karol G | none | - | - | no qualifying listing (complete catalog checked) |
| tm-karol-g-2026-ciudad-de-mexico-1av8z_kgknv53if | Karol G | none | 7896537 | https://www.ticketliquidator.com/tickets/7896537/Karol-G-tickets-Fri-Nov-13-2026-Estadio-GNP-Seguros-Mexico-City | - |
| tm-karol-g-2026-ciudad-de-mexico-1av8z_kgknefxra | Karol G | none | 7921349 | https://www.ticketliquidator.com/tickets/7921349/Karol-G-tickets-Sat-Nov-14-2026-Estadio-GNP-Seguros-Mexico-City | - |
| tm-karol-g-2026-ciudad-de-mexico-1av8z_kgknefwr5 | Karol G | none | 7925374 | https://www.ticketliquidator.com/tickets/7925374/Karol-G-tickets-Sun-Nov-15-2026-Estadio-GNP-Seguros-Mexico-City | - |
| tm-teddy-swims-2027-fornebu-z698xzb_z1aakf8y | Teddy Swims | none | 8167502 | https://www.ticketliquidator.com/tickets/8167502/Teddy-Swims-tickets-Tue-Mar-2-2027-Unity-Arena | - |
| tm-teddy-swims-2027-praha-9-z698xzu0z1kq9x78k | Teddy Swims | none | - | - | no qualifying listing (complete catalog checked) |
| tm-five-finger-death-punch-2027-praha-9-z698xzu0z1kq-uavz | Five Finger Death Punch | none | - | - | no qualifying listing (complete catalog checked) |
| tm-five-finger-death-punch-2027-fornebu-z698xzb_z16ezeg-gk | Five Finger Death Punch | none | 8090423 | https://www.ticketliquidator.com/tickets/8090423/Five-Finger-Death-Punch-tickets-Fri-Feb-19-2027-Unity-Arena | - |
| tm-blue-october-2026-little-rock-rz7hnez1afr4pn | Blue October | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blue-october-2027-ventura-rz7hnez1af0ofn | Blue October | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tyla-2026-oslo-z698xzb_z16v-8-pb8 | Tyla | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tyla-2027-pretoria-z698xz05z16eza8efw | Tyla | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tyla-2027-pretoria-z698xz05z1kqkoyov | Tyla | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nothing-but-thieves-2027-praha-9-z698xzu0z16vba7mjv | Nothing But Thieves | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nothing-but-thieves-2027-san-diego-rz7hnez1afpvcd | Nothing But Thieves | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sabaton-2026-dallas-vvg1yzbwnj2elc | Sabaton | none | 7410005 | https://www.ticketliquidator.com/tickets/7410005/Sabaton-tickets-Fri-Nov-6-2026-South-Side-Ballroom-at-Gilleys | - |
| tm-sabaton-2026-houston-g5dizbwlrp709 | Sabaton | none | 7410004 | https://www.ticketliquidator.com/tickets/7410004/Sabaton-tickets-Sat-Nov-7-2026-713-Music-Hall | - |
| tm-sabaton-2026-san-antonio-z7r9jz1a7jk4v | Sabaton | none | 7410006 | https://www.ticketliquidator.com/tickets/7410006/Sabaton-tickets-Sun-Nov-8-2026-Boeing-Center-at-Tech-Port | - |
| tm-sabaton-2026-phoenix-1av0zbwgkrn_kuq | Sabaton | none | 7410007 | https://www.ticketliquidator.com/tickets/7410007/Sabaton-tickets-Wed-Nov-11-2026-Arizona-Financial-Theatre | - |
| tm-sabaton-2026-wheatland-g5vyzbwpukkfz | Sabaton | none | 7410009 | https://www.ticketliquidator.com/tickets/7410009/Sabaton-tickets-Sat-Nov-14-2026-Hard-Rock-Live-Sacramento | - |
| tm-sabaton-2026-salt-lake-city-g5vzzbwnvavqo | Sabaton | none | 7410010 | https://www.ticketliquidator.com/tickets/7410010/Sabaton-tickets-Tue-Nov-17-2026-The-Union-Event-Center | - |
| tm-sabaton-2026-omaha-1aozkgigkedlvji | Sabaton | none | 7410012 | https://www.ticketliquidator.com/tickets/7410012/Sabaton-tickets-Fri-Nov-20-2026-Steelhouse-Omaha | - |
| tm-sabaton-2026-milwaukee-vv17jzbvgkusja2a | Sabaton | none | 7492835 | https://www.ticketliquidator.com/tickets/7492835/Sabaton-tickets-Sat-Nov-21-2026-Landmark-Credit-Union-Live | - |
| tm-sabaton-2026-minneapolis-vv1akzkgtgkd2vkhk | Sabaton | none | 7410015 | https://www.ticketliquidator.com/tickets/7410015/Sabaton-tickets-Sun-Nov-22-2026-The-Armory-Minneapolis | - |
| tm-sabaton-2026-chicago-vv178zbwgkltpkse | Sabaton | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sabaton-2026-waukee-1a-zkgtgkdjdyyw | Sabaton | none | 7410014 | https://www.ticketliquidator.com/tickets/7410014/Sabaton-tickets-Wed-Nov-25-2026-Vibrant-Music-Hall | - |
| tm-sabaton-2026-saint-louis-1ae7zbwgkmsi8la | Sabaton | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sabaton-2026-cincinnati-1avbzbwgkn0vsnb | Sabaton | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sabaton-2026-detroit-vv1afzkgpgkdnrjuw | Sabaton | none | 7410018 | https://www.ticketliquidator.com/tickets/7410018/Sabaton-tickets-Sun-Nov-29-2026-The-Fillmore-Detroit | - |
| tm-sabaton-2026-boston-vv1a8vnaygac9fy1 | Sabaton | none | 7410021 | https://www.ticketliquidator.com/tickets/7410021/Sabaton-tickets-Tue-Dec-1-2026-MGM-Music-Hall-at-Fenway-Park | - |
| tm-sabaton-2026-philadelphia-vv17fzbwgklacdxp | Sabaton | none | 7410020 | https://www.ticketliquidator.com/tickets/7410020/Sabaton-tickets-Wed-Dec-2-2026-The-Met-Presented-by-Highmark | - |
| tm-sabaton-2026-virginia-beach-vv177zbwgklinzle | Sabaton | none | 7410022 | https://www.ticketliquidator.com/tickets/7410022/Sabaton-tickets-Sat-Dec-5-2026-The-Dome-by-Rutter-Mills | - |
| tm-sabaton-2026-national-harbor-1a4zkgtgkdyjn0o | Sabaton | none | 7410023 | https://www.ticketliquidator.com/tickets/7410023/Sabaton-tickets-Sun-Dec-6-2026-The-Theater-at-MGM-National-Harbor | - |
| tm-sabaton-2026-atlanta-vvg1zzbwjnkk6z | Sabaton | none | 7410025 | https://www.ticketliquidator.com/tickets/7410025/Sabaton-tickets-Tue-Dec-8-2026-Coca-Cola-Roxy | - |
| tm-sabaton-2027-praha-9-z698xzu0z1kggp0g_ | Sabaton | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sabaton-2027-helsinki-z698xz8kz16vffuzea | Sabaton | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beartooth-2026-charleston-rz7hnez1af0fgk | Beartooth | none | 7980224 | https://www.ticketliquidator.com/tickets/7980224/Beartooth-tickets-Wed-Dec-2-2026-The-Refinery-SC | - |
| tm-polyphia-2026-zurich-z698xzu3z16v333k4j | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-polyphia-2026-praha-7-z698xzu0z16vqdqwjv | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-polyphia-2027-hollywood-vvg10z_glgj36a | Polyphia | none | 8056759 | https://www.ticketliquidator.com/tickets/8056759/Polyphia-tickets-Tue-Feb-9-2027-Hollywood-Palladium | - |
| tm-polyphia-2027-anaheim-vvg10z_gea9xhx | Polyphia | none | 8056760 | https://www.ticketliquidator.com/tickets/8056760/Polyphia-tickets-Thu-Feb-11-2027-House-Of-Blues-Anaheim | - |
| tm-polyphia-2027-san-francisco-g5vyz_gra3gjr | Polyphia | none | 8056761 | https://www.ticketliquidator.com/tickets/8056761/Polyphia-tickets-Sun-Feb-14-2027-The-Masonic-San-Francisco | - |
| tm-polyphia-2027-milwaukee-vvg1jz_gjngwwq | Polyphia | none | 8056853 | https://www.ticketliquidator.com/tickets/8056853/Polyphia-tickets-Wed-Feb-24-2027-Landmark-Credit-Union-Live | - |
| tm-polyphia-2027-chicago-vvg18z_gjsjbx- | Polyphia | none | 8056758 | https://www.ticketliquidator.com/tickets/8056758/Polyphia-tickets-Thu-Feb-25-2027-Byline-Bank-Aragon-Ballroom | - |
| tm-polyphia-2027-detroit-vvg1oz_ge56_sr | Polyphia | none | 8056762 | https://www.ticketliquidator.com/tickets/8056762/Polyphia-tickets-Sat-Feb-27-2027-The-Fillmore-Detroit | - |
| tm-polyphia-2027-toronto-177zv0g6gmyx7u7 | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-polyphia-2027-montreal-17g8v0g6gnmzpef | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-polyphia-2027-philadelphia-vvg1fz_gn-cuhm | Polyphia | none | 8056765 | https://www.ticketliquidator.com/tickets/8056765/Polyphia-tickets-Fri-Mar-5-2027-The-Fillmore-Philadelphia | - |
| tm-polyphia-2027-brooklyn-k7vgf_gsymxmt | Polyphia | none | 8056771 | https://www.ticketliquidator.com/tickets/8056771/Polyphia-tickets-Sat-Mar-6-2027-Brooklyn-Paramount | - |
| tm-polyphia-2027-boston-vvg17z_ge-9vq3 | Polyphia | none | 8056768 | https://www.ticketliquidator.com/tickets/8056768/Polyphia-tickets-Sun-Mar-7-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-polyphia-2027-washington-17a8v0g6gmr0lc4 | Polyphia | none | 8056764 | https://www.ticketliquidator.com/tickets/8056764/Polyphia-tickets-Tue-Mar-9-2027-Echostage | - |
| tm-polyphia-2027-orlando-17fov0g6gemc12a | Polyphia | none | 8056820 | https://www.ticketliquidator.com/tickets/8056820/Polyphia-tickets-Sat-Mar-13-2027-Hard-Rock-Live-Orlando | - |
| tm-polyphia-2027-atlanta-vvg1zz_gwmeyrd | Polyphia | none | 8056821 | https://www.ticketliquidator.com/tickets/8056821/Polyphia-tickets-Tue-Mar-16-2027-Coca-Cola-Roxy | - |
| tm-polyphia-2027-nashville-g5viz_gnfsyiq | Polyphia | none | 8056822 | https://www.ticketliquidator.com/tickets/8056822/Polyphia-tickets-Thu-Mar-18-2027-The-Truth | - |
| tm-polyphia-2027-dallas-vvg1yz_glmqcu0 | Polyphia | none | 8056763 | https://www.ticketliquidator.com/tickets/8056763/Polyphia-tickets-Sat-Mar-20-2027-South-Side-Ballroom-at-Gilleys | - |
| tm-tobymac-2027-sioux-falls-vv1akzkg_gkd7w414 | TobyMac | none | 7376289 | https://www.ticketliquidator.com/tickets/7376289/TobyMac-tickets-Tue-Mar-16-2027-Denny-Sanford-Premier-Center | - |
| tm-saint-levant-2026-k-benhavn-v-z698xzc4z16ez9zpo4 | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2026-oslo-z698xzb_z1kk3atjs | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2026-zurich-z698xzu3z1k8wzyjv | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2027-toronto-177zv0g6cemiqt_ | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2027-toronto-177zv0g6cemcutq | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2027-boston-vvg17z_cxqdi4_ | Saint Levant | none | 8144601 | https://www.ticketliquidator.com/tickets/8144601/Saint-Levant-tickets-Sat-Mar-27-2027-Citizens-House-Of-Blues-Boston | - |
| tm-saint-levant-2027-philadelphia-vvg1fz_cxbxmek | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2027-brooklyn-k7vgf_cl-wdb8 | Saint Levant | none | 8144602 | https://www.ticketliquidator.com/tickets/8144602/Saint-Levant-tickets-Tue-Mar-30-2027-Brooklyn-Paramount | - |
| tm-saint-levant-2027-brooklyn-k7vgf_cl-wsb- | Saint Levant | none | 8144603 | https://www.ticketliquidator.com/tickets/8144603/Saint-Levant-tickets-Wed-Mar-31-2027-Brooklyn-Paramount | - |
| tm-saint-levant-2027-detroit-vvg1oz_cxteu1p | Saint Levant | none | 8133115 | https://www.ticketliquidator.com/tickets/8133115/Saint-Levant-tickets-Tue-Apr-6-2027-The-Fillmore-Detroit | - |
| tm-saint-levant-2027-silver-spring-17a8v0g6cjqrj2z | Saint Levant | none | 8133117 | https://www.ticketliquidator.com/tickets/8133117/Saint-Levant-tickets-Fri-Apr-9-2027-The-Fillmore-Silver-Spring | - |
| tm-saint-levant-2027-charlotte-g5evz_cxoz58q | Saint Levant | none | 8144620 | https://www.ticketliquidator.com/tickets/8144620/Saint-Levant-tickets-Tue-Apr-13-2027-The-Underground-Charlotte | - |
| tm-saint-levant-2027-miami-beach-vvg1vz_clijxyh | Saint Levant | none | 8133114 | https://www.ticketliquidator.com/tickets/8133114/Saint-Levant-tickets-Fri-Apr-16-2027-The-Fillmore-Miami-Beach-At-Jackie-Gleason-Theater | - |
| tm-saint-levant-2027-atlanta-vvg1zz_cjej40m | Saint Levant | none | 8133116 | https://www.ticketliquidator.com/tickets/8133116/Saint-Levant-tickets-Sun-Apr-18-2027-Buckhead-Theatre | - |
| tm-saint-levant-2027-austin-g5diz_cxcz7mc | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2027-houston-g5diz_clj5bta | Saint Levant | none | 8144626 | https://www.ticketliquidator.com/tickets/8144626/Saint-Levant-tickets-Wed-Apr-21-2027-Bayou-Music-Center | - |
| tm-saint-levant-2027-dallas-vvg1yz_cxxtz4x | Saint Levant | none | 8130662 | https://www.ticketliquidator.com/tickets/8130662/Saint-Levant-tickets-Thu-Apr-22-2027-South-Side-Ballroom-at-Gilleys | - |
| tm-saint-levant-2027-denver-g5vzz_cl6uyod | Saint Levant | none | 8144627 | https://www.ticketliquidator.com/tickets/8144627/Saint-Levant-tickets-Sun-Apr-25-2027-The-Summit-Music-Hall | - |
| tm-saint-levant-2027-san-diego-rz7hnez1afa7-7 | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2027-anaheim-vvg10z_cr0rptv | Saint Levant | none | 8144629 | https://www.ticketliquidator.com/tickets/8144629/Saint-Levant-tickets-Thu-Apr-29-2027-House-Of-Blues-Anaheim | - |
| tm-saint-levant-2027-los-angeles-vvg10z_cjir6zj | Saint Levant | none | 8130663 | https://www.ticketliquidator.com/tickets/8130663/Saint-Levant-tickets-Mon-May-3-2027-The-Wiltern | - |
| tm-saint-levant-2027-los-angeles-vvg10z_cjil6zv | Saint Levant | none | 8130664 | https://www.ticketliquidator.com/tickets/8130664/Saint-Levant-tickets-Tue-May-4-2027-The-Wiltern | - |
| tm-saint-levant-2027-san-francisco-g5vyz_cj596wt | Saint Levant | none | 8130665 | https://www.ticketliquidator.com/tickets/8130665/Saint-Levant-tickets-Fri-May-7-2027-The-Masonic-San-Francisco | - |
| tm-the-airborne-toxic-event-2027-charlotte-g5evz_1nj2twb | The Airborne Toxic Event | none | 7977707 | https://www.ticketliquidator.com/tickets/7977707/The-Airborne-Toxic-Event-tickets-Tue-May-18-2027-The-Underground-Charlotte | - |
| tm-the-airborne-toxic-event-2027-washington-17a8v0g61rlmtti | The Airborne Toxic Event | none | 7977704 | https://www.ticketliquidator.com/tickets/7977704/The-Airborne-Toxic-Event-tickets-Thu-May-20-2027-930-Club | - |
| tm-the-airborne-toxic-event-2027-new-york-k7vgf_1hjlw79 | The Airborne Toxic Event | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-airborne-toxic-event-2027-boston-vvg17z_1qyxhxi | The Airborne Toxic Event | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-airborne-toxic-event-2027-cleveland-vvg1fz_1qxxiit | The Airborne Toxic Event | none | 7977705 | https://www.ticketliquidator.com/tickets/7977705/The-Airborne-Toxic-Event-tickets-Mon-May-24-2027-House-Of-Blues-Cleveland | - |
| tm-the-airborne-toxic-event-2027-detroit-vv17oz_agkmoc3ug | The Airborne Toxic Event | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-airborne-toxic-event-2027-minneapolis-vvg1bz_1fhethg | The Airborne Toxic Event | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-airborne-toxic-event-2027-las-vegas-17ayv0g61avjbwz | The Airborne Toxic Event | none | 7977703 | https://www.ticketliquidator.com/tickets/7977703/The-Airborne-Toxic-Event-tickets-Thu-Jun-3-2027-House-Of-Blues-Las-Vegas | - |
| tm-the-airborne-toxic-event-2027-san-diego-vvg1iz_a0ap_1u | The Airborne Toxic Event | none | 7791670 | https://www.ticketliquidator.com/tickets/7791670/The-Airborne-Toxic-Event-tickets-Sat-Jun-5-2027-Humphreys-Concerts-By-The-Bay | - |
| tm-the-airborne-toxic-event-2027-phoenix-17k8v0g61nr_nrj | The Airborne Toxic Event | none | 7977708 | https://www.ticketliquidator.com/tickets/7977708/The-Airborne-Toxic-Event-tickets-Sun-Jun-6-2027-The-Van-Buren | - |
| tm-the-airborne-toxic-event-2027-salt-lake-city-g5vzz_1rps_y3 | The Airborne Toxic Event | none | 7977706 | https://www.ticketliquidator.com/tickets/7977706/The-Airborne-Toxic-Event-tickets-Wed-Jun-9-2027-The-Depot-Salt-Lake-City | - |
| tm-the-airborne-toxic-event-2027-seattle-z7r9jz1a70ybz | The Airborne Toxic Event | none | 7977952 | https://www.ticketliquidator.com/tickets/7977952/The-Airborne-Toxic-Event-tickets-Sun-Jun-13-2027-The-Showbox | - |
| tm-the-airborne-toxic-event-2027-sacramento-g5vyz_1xif7y2 | The Airborne Toxic Event | none | 7978064 | https://www.ticketliquidator.com/tickets/7978064/The-Airborne-Toxic-Event-tickets-Tue-Jun-15-2027-Ace-of-Spades | - |
| tm-the-airborne-toxic-event-2027-san-luis-obispo-z7r9jz1a70w-f | The Airborne Toxic Event | none | 7978076 | https://www.ticketliquidator.com/tickets/7978076/The-Airborne-Toxic-Event-tickets-Wed-Jun-16-2027-Fremont-Theater-CA | - |
| tm-the-airborne-toxic-event-2027-los-angeles-vvg10z_1rtqiih | The Airborne Toxic Event | none | 7977702 | https://www.ticketliquidator.com/tickets/7977702/The-Airborne-Toxic-Event-tickets-Thu-Jun-17-2027-The-Wiltern | - |
| tm-the-airborne-toxic-event-2027-menlo-park-z7r9jz1a70ijm | The Airborne Toxic Event | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-airborne-toxic-event-2027-menlo-park-z7r9jz1a7pj3f | The Airborne Toxic Event | none | - | - | no qualifying listing (complete catalog checked) |
| tm-andrea-bocelli-2026-abu-dhabi-z698xz52z1k7pedfx | Andrea Bocelli | none | 8090357 | https://www.ticketliquidator.com/tickets/8090357/Andrea-Bocelli-tickets-Wed-Dec-2-2026-Etihad-Arena-Yas-Island | - |
| tm-morat-2026-ciudad-de-mexico-1afzk3egkebi9id | Morat | none | - | - | no qualifying listing (complete catalog checked) |
| tm-morat-2026-ciudad-de-mexico-1afzk3egkedjeux | Morat | none | - | - | no qualifying listing (complete catalog checked) |
| tm-morat-2026-ciudad-de-mexico-1afzk3egkedjmu0 | Morat | none | - | - | no qualifying listing (complete catalog checked) |
| tm-morat-2026-ciudad-de-mexico-1afzk3egkedteuw | Morat | none | 8278052 | https://www.ticketliquidator.com/tickets/8278052/Morat-tickets-Fri-Nov-13-2026-Palacio-De-Los-Deportes-Mexico-City | - |
| tm-morat-2026-ciudad-de-mexico-1afzk3egkedteut | Morat | none | - | - | no qualifying listing (complete catalog checked) |
| tm-morat-2026-ciudad-de-mexico-1afzk3egkedjmuj | Morat | none | - | - | no qualifying listing (complete catalog checked) |
| tm-morat-2026-ciudad-de-mexico-1afzk3egkedtmmv | Morat | none | - | - | no qualifying listing (complete catalog checked) |
| tm-morat-2026-tlajomulco-de-zuniga-g5dvz_f6tnua- | Morat | none | - | - | no qualifying listing (complete catalog checked) |
| tm-morat-2026-tlajomulco-de-zuniga-g5dvz_f6ivj5r | Morat | none | - | - | no qualifying listing (complete catalog checked) |
| tm-vnv-nation-2027-limerick-city-1avozbugknqkh_5 | VNV Nation | none | - | - | no qualifying listing (complete catalog checked) |
| tm-vnv-nation-2027-glasgow-16dbzbuq4g7ljkl | VNV Nation | none | - | - | no qualifying listing (complete catalog checked) |
| tm-vnv-nation-2027-nashville-rz7hnez1affnz0 | VNV Nation | none | 8095650 | https://www.ticketliquidator.com/tickets/8095650/VNV-Nation-tickets-Tue-Mar-9-2027-Exit-In | - |
| tm-vnv-nation-2027-ft-lauderdale-vvg1vzbvdf3u-x | VNV Nation | none | - | - | no qualifying listing (complete catalog checked) |
| tm-vnv-nation-2027-mesa-z7r9jz1a7qp8u | VNV Nation | none | - | - | no qualifying listing (complete catalog checked) |
| tm-vnv-nation-2027-san-diego-vvg1izbvnuske3 | VNV Nation | none | 7610204 | https://www.ticketliquidator.com/tickets/7610204/VNV-Nation-tickets-Fri-Mar-19-2027-House-Of-Blues-San-Diego | - |
| tm-vnv-nation-2027-los-angeles-vv170zbvgklj1kgc | VNV Nation | none | - | - | no qualifying listing (complete catalog checked) |
| tm-vnv-nation-2027-san-francisco-g5vyzbvdfhbds | VNV Nation | none | 7493673 | https://www.ticketliquidator.com/tickets/7493673/VNV-Nation-tickets-Sun-Mar-21-2027-August-Hall | - |
| tm-vnv-nation-2027-seattle-vvg1hzbvl3-6jq | VNV Nation | none | 7496081 | https://www.ticketliquidator.com/tickets/7496081/VNV-Nation-tickets-Wed-Mar-24-2027-The-Neptune-Theatre | - |
| tm-vnv-nation-2027-omaha-z7r9jz1a7q0ef | VNV Nation | none | 7584375 | https://www.ticketliquidator.com/tickets/7584375/VNV-Nation-tickets-Mon-Mar-29-2027-The-Slowdown | - |
| tm-vnv-nation-2027-detroit-vv1afzkuagkexq-mx | VNV Nation | none | - | - | no qualifying listing (complete catalog checked) |
| tm-vnv-nation-2027-cleveland-vv1kfzbv0wg7mfd6 | VNV Nation | none | 7493671 | https://www.ticketliquidator.com/tickets/7493671/VNV-Nation-tickets-Sat-Apr-3-2027-House-Of-Blues-Cleveland | - |
| tm-vnv-nation-2027-toronto-1avzzbvgkvjgkmw | VNV Nation | none | - | - | no qualifying listing (complete catalog checked) |
| tm-vnv-nation-2027-montreal-1ad7zbvgklrkbrt | VNV Nation | none | 7498713 | https://www.ticketliquidator.com/tickets/7498713/VNV-Nation-tickets-Tue-Apr-6-2027-Theatre-Beanfield | - |
| tm-vnv-nation-2027-boston-vv177zbvgkmc0qfx | VNV Nation | none | 7503826 | https://www.ticketliquidator.com/tickets/7503826/VNV-Nation-tickets-Wed-Apr-7-2027-Paradise-Rock-Club-Presented-by-Citizens | - |
| tm-vnv-nation-2027-brooklyn-k7vgfbvbkdnzs | VNV Nation | none | 7495786 | https://www.ticketliquidator.com/tickets/7495786/VNV-Nation-tickets-Fri-Apr-9-2027-Warsaw | - |
| tm-vnv-nation-2027-baltimore-1avfzbvgklmrqky | VNV Nation | none | 7665363 | https://www.ticketliquidator.com/tickets/7665363/VNV-Nation-tickets-Sat-Apr-10-2027-Baltimore-Soundstage | - |
| tm-vnv-nation-2027-millvale-rz7hnez1afbaps | VNV Nation | none | - | - | no qualifying listing (complete catalog checked) |
| tm-yuridia-2026-zapopan-g5dvz_aia5kvd | Yuridia | add (applied) | 8307103 | https://www.ticketliquidator.com/tickets/8307103/Yuridia-tickets-Sat-Dec-5-2026-Coliseo-GNP-Seguros | - |
| tm-fkj-2027-auckland-17azv0g6cklgovf | FKJ | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sylvan-esso-2027-new-orleans-rz7hnez1afqk8n | Sylvan Esso | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blondshell-2027-san-diego-vvg1iz_1wv8vq3 | Blondshell | none | 7976571 | https://www.ticketliquidator.com/tickets/7976571/Blondshell-tickets-Sun-Feb-28-2027-The-Observatory-North-Park | - |
| tm-blondshell-2027-los-angeles-vvg10z_1drttoa | Blondshell | none | 7976572 | https://www.ticketliquidator.com/tickets/7976572/Blondshell-tickets-Tue-Mar-2-2027-The-Wiltern | - |
| tm-blondshell-2027-san-francisco-g5vyz_1m0mwvc | Blondshell | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blondshell-2027-seattle-z7r9jz1a70ere | Blondshell | none | 7976575 | https://www.ticketliquidator.com/tickets/7976575/Blondshell-tickets-Sun-Mar-7-2027-Showbox-SoDo | - |
| tm-blondshell-2027-minneapolis-vvg1bz_1dodkri | Blondshell | none | 7976576 | https://www.ticketliquidator.com/tickets/7976576/Blondshell-tickets-Thu-Mar-11-2027-Varsity-Theater-MN | - |
| tm-blondshell-2027-chicago-z7r9jz1a70ubv | Blondshell | none | 7976577 | https://www.ticketliquidator.com/tickets/7976577/Blondshell-tickets-Fri-Mar-12-2027-Vic-Theatre | - |
| tm-blondshell-2027-philadelphia-z7r9jz1a70gjs | Blondshell | none | 7976580 | https://www.ticketliquidator.com/tickets/7976580/Blondshell-tickets-Sun-Mar-14-2027-Union-Transfer | - |
| tm-blondshell-2027-washington-17a8v0g61wjljxg | Blondshell | none | 7976581 | https://www.ticketliquidator.com/tickets/7976581/Blondshell-tickets-Mon-Mar-15-2027-930-Club | - |
| tm-blondshell-2027-boston-vvg17z_1uqvup8 | Blondshell | none | 7976583 | https://www.ticketliquidator.com/tickets/7976583/Blondshell-tickets-Thu-Mar-18-2027-Citizens-House-Of-Blues-Boston | - |
| tm-blondshell-2027-montreal-17g8v0g61mppmq0 | Blondshell | none | 7976579 | https://www.ticketliquidator.com/tickets/7976579/Blondshell-tickets-Fri-Mar-19-2027-Theatre-Beanfield | - |
| tm-blondshell-2027-toronto-177zv0g61ygdrn9 | Blondshell | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blondshell-2027-brooklyn-z7r9jz1a70gjw | Blondshell | none | 7976582 | https://www.ticketliquidator.com/tickets/7976582/Blondshell-tickets-Mon-Mar-22-2027-Brooklyn-Steel | - |
| tm-hans-zimmer-2026-abu-dhabi-z698xz52z16vb-f9q_ | Hans Zimmer | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-psychedelic-furs-2026-rocklin-z7r9jz1a7--1k | The Psychedelic Furs | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-psychedelic-furs-2026-napa-g5vyz_aulujn5 | The Psychedelic Furs | none | 7756935 | https://www.ticketliquidator.com/tickets/7756935/The-Psychedelic-Furs-tickets-Fri-Oct-30-2026-Uptown-Theatre-Napa | - |
| tm-the-psychedelic-furs-2026-menlo-park-z7r9jz1a7p90y | The Psychedelic Furs | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-psychedelic-furs-2026-menlo-park-z7r9jz1a7p9pd | The Psychedelic Furs | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-psychedelic-furs-2026-fresno-g5vyz_aupip7f | The Psychedelic Furs | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-psychedelic-furs-2026-del-mar-vvg1iz_a3sju3n | The Psychedelic Furs | none | 7756933 | https://www.ticketliquidator.com/tickets/7756933/The-Psychedelic-Furs-tickets-Sun-Nov-8-2026-The-Sound-At-The-Del-Mar-Fairgrounds | - |
| tm-the-psychedelic-furs-2026-san-luis-obispo-z7r9jz1a7-o8k | The Psychedelic Furs | none | 7757970 | https://www.ticketliquidator.com/tickets/7757970/The-Psychedelic-Furs-tickets-Mon-Nov-16-2026-Fremont-Theater-CA | - |
| tm-the-psychedelic-furs-2026-phoenix-z7r9jz1a70kx4 | The Psychedelic Furs | none | 7757967 | https://www.ticketliquidator.com/tickets/7757967/The-Psychedelic-Furs-tickets-Thu-Nov-19-2026-Celebrity-Theatre-AZ | - |
| tm-the-psychedelic-furs-2027-rancho-mirage-z7r9jz1a7-n8k | The Psychedelic Furs | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-psychedelic-furs-2027-san-antonio-g5diz_a6js1qk | The Psychedelic Furs | none | 7756931 | https://www.ticketliquidator.com/tickets/7756931/The-Psychedelic-Furs-tickets-Wed-Mar-24-2027-The-Aztec-Theatre | - |
| tm-the-psychedelic-furs-2027-houston-g5diz_a5ghu6h | The Psychedelic Furs | none | 7756930 | https://www.ticketliquidator.com/tickets/7756930/The-Psychedelic-Furs-tickets-Sat-Mar-27-2027-House-Of-Blues-Houston | - |
| tm-the-psychedelic-furs-2027-dallas-vvg1yz_a29lq69 | The Psychedelic Furs | none | 7756928 | https://www.ticketliquidator.com/tickets/7756928/The-Psychedelic-Furs-tickets-Sun-Mar-28-2027-House-Of-Blues-Dallas | - |
| tm-the-psychedelic-furs-2027-new-orleans-g5viz_ad68eh6 | The Psychedelic Furs | none | 7938331 | https://www.ticketliquidator.com/tickets/7938331/The-Psychedelic-Furs-tickets-Sun-Apr-4-2027-The-Fillmore-New-Orleans | - |
| tm-the-psychedelic-furs-2027-orlando-1aefz_agku_10hc | The Psychedelic Furs | none | 7938332 | https://www.ticketliquidator.com/tickets/7938332/The-Psychedelic-Furs-tickets-Sun-Apr-11-2027-Hard-Rock-Live-Orlando | - |
| tm-the-psychedelic-furs-2027-jacksonville-z7r9jz1a703oe | The Psychedelic Furs | none | 7938698 | https://www.ticketliquidator.com/tickets/7938698/The-Psychedelic-Furs-tickets-Wed-Apr-14-2027-Florida-Theatre-Jacksonville | - |
| tm-the-psychedelic-furs-2027-charlotte-g5evz_ausriiu | The Psychedelic Furs | none | 7938330 | https://www.ticketliquidator.com/tickets/7938330/The-Psychedelic-Furs-tickets-Fri-Apr-16-2027-The-Fillmore-Charlotte | - |
| tm-eros-ramazzotti-2027-toronto-1avzzbigklzuxko | Eros Ramazzotti | none | - | - | no qualifying listing (complete catalog checked) |
| tm-eros-ramazzotti-2027-laval-1aszk16gkexqstp | Eros Ramazzotti | none | 7092012 | https://www.ticketliquidator.com/tickets/7092012/Eros-Ramazzotti-tickets-Sun-Sep-26-2027-Place-Bell | - |
| tm-eros-ramazzotti-2027-boston-vv1avzk1fgkd0riv2 | Eros Ramazzotti | none | - | - | no qualifying listing (complete catalog checked) |
| tm-eros-ramazzotti-2027-rosemont-vv1a7zk1egkeidoc0 | Eros Ramazzotti | none | 7091994 | https://www.ticketliquidator.com/tickets/7091994/Eros-Ramazzotti-tickets-Tue-Oct-5-2027-Rosemont-Theatre | - |
| tm-eros-ramazzotti-2027-miami-vvg1vzbicfi7sa | Eros Ramazzotti | none | 7091996 | https://www.ticketliquidator.com/tickets/7091996/Eros-Ramazzotti-tickets-Fri-Oct-8-2027-Kaseya-Center | - |
| tm-eros-ramazzotti-2027-sugar-land-z7r9jz1a74uo8 | Eros Ramazzotti | none | - | - | no qualifying listing (complete catalog checked) |
| tm-eros-ramazzotti-2027-inglewood-vvg1izbiyf5ko0 | Eros Ramazzotti | none | 7091997 | https://www.ticketliquidator.com/tickets/7091997/Eros-Ramazzotti-tickets-Sat-Oct-16-2027-YouTube-Theater-at-Hollywood-Park | - |
| tm-the-warning-2027-ciudad-de-mexico-1afzkf4gkenopd9 | The Warning | none | 8280935 | https://www.ticketliquidator.com/tickets/8280935/The-Warning-tickets-Fri-Feb-5-2027-Estadio-GNP-Seguros-Mexico-City | - |
| tm-hilary-duff-2027-ciudad-de-mexico-1afzko6gkdoa5fw | Hilary Duff | none | 7744482 | https://www.ticketliquidator.com/tickets/7744482/Hilary-Duff-tickets-Fri-Feb-12-2027-Palacio-De-Los-Deportes-Mexico-City | - |
| tm-hilary-duff-2027-ciudad-de-mexico-1afzko6gkdomhcz | Hilary Duff | none | 8174253 | https://www.ticketliquidator.com/tickets/8174253/Hilary-Duff-tickets-Sat-Feb-13-2027-Palacio-De-Los-Deportes-Mexico-City | - |
| tm-hilary-duff-2027-zapopan-1av8z_fgknzgqjq | Hilary Duff | none | - | - | no qualifying listing (complete catalog checked) |
| tm-josiah-queen-2026-trinity-rz7hnez1afuea0 | Josiah Queen | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-zurich-z698xzu3z1kg0bbov | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-praha-1-z698xzu0z16v4-_k4a | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sienna-spiro-2027-auckland-17azv0g6gnlzs7o | Sienna Spiro | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lizzy-mcalpine-2027-praha-7-z698xzu0z1kufbskd | Lizzy McAlpine | none | - | - | no qualifying listing (complete catalog checked) |
| tm-foy-vance-2026-vancouver-rz7hnez1af7gv0 | Foy Vance | none | 7746921 | https://www.ticketliquidator.com/tickets/7746921/Foy-Vance-tickets-Thu-Nov-12-2026-Hollywood-Theatre-Vancouver | - |
| tm-foy-vance-2027-nashville-rz7hnez1af79qf | Foy Vance | none | 7746922 | https://www.ticketliquidator.com/tickets/7746922/Foy-Vance-tickets-Fri-Apr-9-2027-The-Basement-East-Nashville | - |
| tm-foy-vance-2027-chicago-rz7hnez1af7f-v | Foy Vance | none | 7747255 | https://www.ticketliquidator.com/tickets/7747255/Foy-Vance-tickets-Sat-Apr-17-2027-Thalia-Hall | - |
| tm-foy-vance-2027-washington-rz7hnez1afab_f | Foy Vance | none | 7746902 | https://www.ticketliquidator.com/tickets/7746902/Foy-Vance-tickets-Sat-Apr-24-2027-Howard-Theatre-DC | - |
| tm-foy-vance-2027-new-york-rz7hnez1af7s8v | Foy Vance | none | 7746908 | https://www.ticketliquidator.com/tickets/7746908/Foy-Vance-tickets-Fri-Apr-30-2027-Sony-Hall | - |
| tm-the-lemonheads-2027-miami-rz7hnez1afgkkf | The Lemonheads | none | 8266208 | https://www.ticketliquidator.com/tickets/8266208/The-Lemonheads-tickets-Wed-Feb-17-2027-Las-Rosas | - |
| tm-the-lemonheads-2027-orlando-rz7hnez1afgkf0 | The Lemonheads | none | 8266211 | https://www.ticketliquidator.com/tickets/8266211/The-Lemonheads-tickets-Fri-Feb-19-2027-The-Abbey-Orlando | - |
| tm-the-lemonheads-2027-phoenix-rz7hnez1afgbaf | The Lemonheads | none | 8266218 | https://www.ticketliquidator.com/tickets/8266218/The-Lemonheads-tickets-Sat-Feb-27-2027-The-Crescent-Ballroom-Phoenix | - |
| tm-the-lemonheads-2027-san-juan-capistrano-rz7hnez1a4zzjn | The Lemonheads | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-lemonheads-2027-chicago-rz7hnez1afgof7 | The Lemonheads | none | 8266232 | https://www.ticketliquidator.com/tickets/8266232/The-Lemonheads-tickets-Sat-Mar-20-2027-The-Empty-Bottle | - |
| tm-the-lemonheads-2027-columbus-rz7hnez1afgpp0 | The Lemonheads | none | 8266237 | https://www.ticketliquidator.com/tickets/8266237/The-Lemonheads-tickets-Sat-Mar-27-2027-Rumba-Cafe | - |
| tm-haiden-henderson-2027-praha-5-z698xzu0z16v1ec67a | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-nashville-rz7hnez1afgiq7 | Haiden Henderson | none | 8284321 | https://www.ticketliquidator.com/tickets/8284321/Haiden-Henderson-tickets-Tue-Apr-13-2027-The-Basement-East-Nashville | - |
| tm-haiden-henderson-2027-san-francisco-rz7hnez1afggu7 | Haiden Henderson | none | 8284339 | https://www.ticketliquidator.com/tickets/8284339/Haiden-Henderson-tickets-Fri-May-14-2027-Brick-Mortar-Music-Hall | - |
| tm-too-many-zooz-2026-toronto-rz7hnez1affov7 | Too Many Zooz | none | - | - | no qualifying listing (complete catalog checked) |
| tm-too-many-zooz-2026-ottawa-rz7hnez1af1e8f | Too Many Zooz | none | - | - | no qualifying listing (complete catalog checked) |
| tm-too-many-zooz-2027-colorado-springs-1ae0z_3gkzlv-ok | Too Many Zooz | none | 8284717 | https://www.ticketliquidator.com/tickets/8284717/Too-Many-Zooz-tickets-Wed-Mar-17-2027-Black-Sheep | - |
| tm-too-many-zooz-2027-san-diego-rz7hnez1afgpof | Too Many Zooz | none | 8284725 | https://www.ticketliquidator.com/tickets/8284725/Too-Many-Zooz-tickets-Fri-May-7-2027-Music-Box-San-Diego | - |
| tm-too-many-zooz-2027-san-francisco-rz7hnez1afgsv7 | Too Many Zooz | none | 8284728 | https://www.ticketliquidator.com/tickets/8284728/Too-Many-Zooz-tickets-Sun-May-9-2027-The-Independent | - |
| tm-too-many-zooz-2027-vancouver-rz7hnez1afgyg0 | Too Many Zooz | none | 8284731 | https://www.ticketliquidator.com/tickets/8284731/Too-Many-Zooz-tickets-Sat-May-15-2027-The-Pearl-BC | - |
| tm-amble-2027-vienna-z698xz5rz1kburk7p | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-amble-2027-praha-5-z698xzu0z1kje4u8k | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-perfect-circle-2026-auckland-1ae8z_kgkr16koz | A Perfect Circle | none | 8173268 | https://www.ticketliquidator.com/tickets/8173268/A-Perfect-Circle-tickets-Sun-Dec-13-2026-Spark-Arena | - |
| tm-greta-van-fleet-2027-praha-9-z698xzu0z1k0yg9c_ | Greta Van Fleet | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2026-praha-7-z698xzu0z16vouudjv | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2026-oslo-z698xzb_z16vftpojp | Fontaines D.C. | none | 8326646 | https://www.ticketliquidator.com/tickets/8326646/Fontaines-DC-tickets-Fri-Nov-6-2026-Oslo-Spektrum | - |
| tm-fontaines-d-c-2027-mexico-1av8z_ogku9epc3 | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-mexico-1av8z_ogkxugz79 | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hazlett-2027-nashville-z7r9jz1a7p0ay | Hazlett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hazlett-2027-charlotte-g5evz_gmhpguu | Hazlett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hazlett-2027-charlottesville-vvg17z_gcwfexc | Hazlett | none | 8054740 | https://www.ticketliquidator.com/tickets/8054740/Hazlett-tickets-Tue-Apr-20-2027-Jefferson-Theater-VA | - |
| tm-hazlett-2027-washington-rz7hnez1afukvf | Hazlett | none | 8054742 | https://www.ticketliquidator.com/tickets/8054742/Hazlett-tickets-Fri-Apr-23-2027-Howard-Theatre-DC | - |
| tm-hazlett-2027-pittsburgh-17aov0g6gw-k9-o | Hazlett | none | 8054860 | https://www.ticketliquidator.com/tickets/8054860/Hazlett-tickets-Sun-Apr-25-2027-Spirit-Hall | - |
| tm-hazlett-2027-new-york-k7vgf_gs3k6br | Hazlett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hazlett-2027-portland-vvg17z_grwzm6s | Hazlett | none | 8054735 | https://www.ticketliquidator.com/tickets/8054735/Hazlett-tickets-Fri-Apr-30-2027-State-Theatre-ME | - |
| tm-hazlett-2027-boston-vvg17z_grnbkkr | Hazlett | none | 8054734 | https://www.ticketliquidator.com/tickets/8054734/Hazlett-tickets-Sun-May-2-2027-Paradise-Rock-Club-Presented-by-Citizens | - |
| tm-hazlett-2027-montreal-17g8v0g62kxoauq | Hazlett | none | 8054865 | https://www.ticketliquidator.com/tickets/8054865/Hazlett-tickets-Tue-May-4-2027-Theatre-Beanfield | - |
| tm-hazlett-2027-east-cleveland-z7r9jz1a7pe8a | Hazlett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hazlett-2027-toronto-177zv0g6gsbxg-l | Hazlett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hazlett-2027-chicago-vvg18z_glqlopk | Hazlett | none | 8054736 | https://www.ticketliquidator.com/tickets/8054736/Hazlett-tickets-Thu-May-13-2027-House-Of-Blues-Chicago | - |
| tm-hazlett-2027-minneapolis-z7r9jz1a7p0gv | Hazlett | none | 8054867 | https://www.ticketliquidator.com/tickets/8054867/Hazlett-tickets-Fri-May-14-2027-First-Avenue | - |
| tm-hazlett-2027-kansas-city-vvg1bz_c1yj_ec | Hazlett | none | 8054738 | https://www.ticketliquidator.com/tickets/8054738/Hazlett-tickets-Mon-May-17-2027-Madrid-Theatre | - |
| tm-hazlett-2027-seattle-vvg1hz_gmgf1et | Hazlett | none | 8054741 | https://www.ticketliquidator.com/tickets/8054741/Hazlett-tickets-Tue-May-25-2027-The-Neptune-Theatre | - |
| tm-hazlett-2027-vancouver-1778v0g6ctjh581 | Hazlett | none | 8168722 | https://www.ticketliquidator.com/tickets/8168722/Hazlett-tickets-Wed-May-26-2027-Commodore-Ballroom | - |
| tm-hazlett-2027-san-francisco-g5vyz_gmceyww | Hazlett | none | 8054861 | https://www.ticketliquidator.com/tickets/8054861/Hazlett-tickets-Tue-Jun-1-2027-August-Hall | - |
| tm-hazlett-2027-los-angeles-z7r9jz1a7p0oi | Hazlett | none | 8054869 | https://www.ticketliquidator.com/tickets/8054869/Hazlett-tickets-Wed-Jun-2-2027-El-Rey-Theatre-Los-Angeles | - |
| tm-hazlett-2027-san-diego-rz7hnez1afufr7 | Hazlett | none | 8054863 | https://www.ticketliquidator.com/tickets/8054863/Hazlett-tickets-Fri-Jun-4-2027-Music-Box-San-Diego | - |
| tm-hazlett-2027-phoenix-17k8v0g6gijmd6s | Hazlett | none | 8054743 | https://www.ticketliquidator.com/tickets/8054743/Hazlett-tickets-Sat-Jun-5-2027-The-Van-Buren | - |
| tm-hazlett-2027-dallas-z7r9jz1a7pge_ | Hazlett | none | 8054884 | https://www.ticketliquidator.com/tickets/8054884/Hazlett-tickets-Tue-Jun-8-2027-The-Kessler | - |
| tm-dylan-gossett-2026-auckland-17azv0g65cuaddf | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-gossett-2026-waipara-17azv0g653pu3v4 | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-warren-zeiders-2026-oslo-z698xzb_z16v4v_kce | Warren Zeiders | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nickelback-2027-zurich-z698xzu3z1kjt1pck | Nickelback | none | 8314986 | https://www.ticketliquidator.com/tickets/8314986/Nickelback-tickets-Sun-Jun-20-2027-Hallenstadion-Zurich | - |
| tm-nickelback-2027-vienna-z698xz5rz16vz489ev | Nickelback | none | 8314989 | https://www.ticketliquidator.com/tickets/8314989/Nickelback-tickets-Fri-Jun-25-2027-Wiener-Stadthalle-Halle-D | - |
| tm-nickelback-2027-praha-9-z698xzu0z1kqvft7s | Nickelback | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nickelback-2027-helsinki-z698xz8kz16vqs7sfi | Nickelback | none | 8314993 | https://www.ticketliquidator.com/tickets/8314993/Nickelback-tickets-Wed-Jul-7-2027-Veikkaus-Arena | - |
| tm-nickelback-2027-fornebu-z698xzb_z1an7vpy | Nickelback | none | 8314994 | https://www.ticketliquidator.com/tickets/8314994/Nickelback-tickets-Fri-Jul-9-2027-Unity-Arena | - |
| tm-jay-wheeler-2027-estero-vvg1vz9zkibwmk | Jay Wheeler | none | 6151204 | https://www.ticketliquidator.com/tickets/6151204/Jay-Wheeler-tickets-Sun-Mar-7-2027-Hertz-Arena | - |
| tm-jay-wheeler-2027-mexico-16fzkfupgza8kga7 | Jay Wheeler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2027-praha-1-z698xzu0z16vxkonfi | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2027-k-benhavn-v-z698xzc4z16vj9j7ev | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2027-cleveland-rz7hnez1afut40 | Mico | none | 8315361 | https://www.ticketliquidator.com/tickets/8315361/Mico-tickets-Sat-Mar-13-2027-Globe-Iron | - |
| tm-rod-wave-2026-brooklyn-17gzv0g6uz2i9rf | Rod Wave | none | 8063453 | https://www.ticketliquidator.com/tickets/8063453/Rod-Wave-tickets-Tue-Oct-27-2026-Barclays-Center | - |
| tm-rod-wave-2026-brooklyn-17gzv0g6uhl8aq4 | Rod Wave | none | 8173375 | https://www.ticketliquidator.com/tickets/8173375/Rod-Wave-tickets-Wed-Oct-28-2026-Barclays-Center | - |
| tm-rod-wave-2026-chicago-vvg18z_udha5ep | Rod Wave | none | 8063454 | https://www.ticketliquidator.com/tickets/8063454/Rod-Wave-tickets-Sat-Oct-31-2026-United-Center | - |
| tm-rod-wave-2026-chicago-vvg18z_uqcj0ym | Rod Wave | none | 8173160 | https://www.ticketliquidator.com/tickets/8173160/Rod-Wave-tickets-Sun-Nov-1-2026-United-Center | - |
| tm-rod-wave-2026-charlotte-g5evz_uk3_hwq | Rod Wave | none | 8063455 | https://www.ticketliquidator.com/tickets/8063455/Rod-Wave-tickets-Tue-Nov-3-2026-Spectrum-Center | - |
| tm-rod-wave-2026-columbia-g5evz_udquqas | Rod Wave | none | 8063456 | https://www.ticketliquidator.com/tickets/8063456/Rod-Wave-tickets-Fri-Nov-6-2026-Colonial-Life-Arena | - |
| tm-rod-wave-2026-orlando-17fov0g6u6bzp82 | Rod Wave | none | 8063457 | https://www.ticketliquidator.com/tickets/8063457/Rod-Wave-tickets-Mon-Nov-9-2026-Kia-Center | - |
| tm-rod-wave-2026-orlando-17fov0g6uhspnas | Rod Wave | none | 8173585 | https://www.ticketliquidator.com/tickets/8173585/Rod-Wave-tickets-Tue-Nov-10-2026-Kia-Center | - |
| tm-rod-wave-2026-sunrise-z7r9jz1a7ppag | Rod Wave | none | 8063458 | https://www.ticketliquidator.com/tickets/8063458/Rod-Wave-tickets-Sat-Nov-14-2026-Amerant-Bank-Arena | - |
| tm-rod-wave-2026-sunrise-z7r9jz1aazfq4 | Rod Wave | none | 8173479 | https://www.ticketliquidator.com/tickets/8173479/Rod-Wave-tickets-Sun-Nov-15-2026-Amerant-Bank-Arena | - |
| tm-rod-wave-2026-atlanta-vvg1zz_uzryhlw | Rod Wave | none | 8063459 | https://www.ticketliquidator.com/tickets/8063459/Rod-Wave-tickets-Wed-Nov-18-2026-State-Farm-Arena-GA | - |
| tm-rod-wave-2026-atlanta-vvg1zz_uqszfce | Rod Wave | none | 8172951 | https://www.ticketliquidator.com/tickets/8172951/Rod-Wave-tickets-Thu-Nov-19-2026-State-Farm-Arena-GA | - |
| tm-steve-lacy-2026-miami-vvg1vz_8pw-pfe | Steve Lacy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-steve-lacy-2026-tampa-vvg1vz_8uxpnex | Steve Lacy | none | 8199801 | https://www.ticketliquidator.com/tickets/8199801/Steve-Lacy-tickets-Wed-Oct-28-2026-The-Yuengling-Center | - |
| tm-steve-lacy-2026-atlanta-vvg1zz_2x4siub | Steve Lacy | none | 8199802 | https://www.ticketliquidator.com/tickets/8199802/Steve-Lacy-tickets-Fri-Oct-30-2026-Synovus-Bank-Amphitheater-at-Chastain-Park | - |
| tm-steve-lacy-2026-atlanta-vvg1zz_83dtnfh | Steve Lacy | none | 8286235 | https://www.ticketliquidator.com/tickets/8286235/Steve-Lacy-tickets-Sat-Oct-31-2026-Synovus-Bank-Amphitheater-at-Chastain-Park | - |
| tm-steve-lacy-2026-nashville-g5viz_2xpzbxl | Steve Lacy | none | 8199803 | https://www.ticketliquidator.com/tickets/8199803/Steve-Lacy-tickets-Mon-Nov-2-2026-Nashville-Municipal-Auditorium | - |
| tm-steve-lacy-2026-irving-vvg1yz_8n-3vdr | Steve Lacy | none | 8199804 | https://www.ticketliquidator.com/tickets/8199804/Steve-Lacy-tickets-Thu-Nov-5-2026-The-Pavilion-at-Toyota-Music-Factory | - |
| tm-steve-lacy-2026-austin-g5diz_8pb91k2 | Steve Lacy | none | 8199805 | https://www.ticketliquidator.com/tickets/8199805/Steve-Lacy-tickets-Sat-Nov-7-2026-Moody-Amphitheater | - |
| tm-steve-lacy-2026-sugar-land-z7r9jz1aazj8f | Steve Lacy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-steve-lacy-2026-morrison-z7r9jz1aazj84 | Steve Lacy | none | 8199807 | https://www.ticketliquidator.com/tickets/8199807/Steve-Lacy-tickets-Wed-Nov-11-2026-Red-Rocks-Amphitheatre | - |
| tm-steve-lacy-2026-las-vegas-169zkfdovza26a51 | Steve Lacy | none | 8199808 | https://www.ticketliquidator.com/tickets/8199808/Steve-Lacy-tickets-Fri-Nov-13-2026-The-Chelsea-The-Cosmopolitan-of-Las-Vegas | - |
| tm-steve-lacy-2026-phoenix-16_zkf6fzza2g752 | Steve Lacy | none | 8199809 | https://www.ticketliquidator.com/tickets/8199809/Steve-Lacy-tickets-Tue-Nov-17-2026-Arizona-Financial-Theatre | - |
| tm-steve-lacy-2026-san-diego-vvg1iz_8prddbi | Steve Lacy | none | 8199810 | https://www.ticketliquidator.com/tickets/8199810/Steve-Lacy-tickets-Thu-Nov-19-2026-Gallagher-Square-at-Petco-Park | - |
| tm-steve-lacy-2026-hollywood-vvg1iz_8f-wifq | Steve Lacy | none | 8199811 | https://www.ticketliquidator.com/tickets/8199811/Steve-Lacy-tickets-Sat-Nov-21-2026-Hollywood-Bowl | - |
| tm-steve-lacy-2026-san-francisco-g5vyz_8boyp-m | Steve Lacy | none | 8199812 | https://www.ticketliquidator.com/tickets/8199812/Steve-Lacy-tickets-Tue-Nov-24-2026-Bill-Graham-Civic-Auditorium | - |
| tm-steve-lacy-2026-san-francisco-g5vyz_8bk7kme | Steve Lacy | none | 8286236 | https://www.ticketliquidator.com/tickets/8286236/Steve-Lacy-tickets-Wed-Nov-25-2026-Bill-Graham-Civic-Auditorium | - |
| tm-steve-lacy-2026-seattle-vvg1hz_8pk8e2l | Steve Lacy | none | 8199813 | https://www.ticketliquidator.com/tickets/8199813/Steve-Lacy-tickets-Sat-Nov-28-2026-Wamu-Theater-At-Lumen-Field-Event-Center | - |
| tm-steve-lacy-2026-vancouver-1aozkf7gkepzmxx | Steve Lacy | none | 8199816 | https://www.ticketliquidator.com/tickets/8199816/Steve-Lacy-tickets-Mon-Nov-30-2026-UBC-Doug-Mitchell-Thunderbird-Sports-Centre | - |
| tm-the-smashing-pumpkins-2026-denver-g5vzz_1xqviwv | The Smashing Pumpkins | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-smashing-pumpkins-2026-salt-lake-city-z7r9jz1a70x_g | The Smashing Pumpkins | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-smashing-pumpkins-2026-las-vegas-z7r9jz1a70x-e | The Smashing Pumpkins | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-smashing-pumpkins-2026-portland-vvg1hz_1meesxh | The Smashing Pumpkins | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-smashing-pumpkins-2026-calgary-1778v0g61djnfzx | The Smashing Pumpkins | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-smashing-pumpkins-2026-vancouver-1778v0g61badswr | The Smashing Pumpkins | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-smashing-pumpkins-2026-seattle-vvg1hz_1wymaop | The Smashing Pumpkins | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-smashing-pumpkins-2026-san-jose-g5vyz_1dhcziz | The Smashing Pumpkins | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-smashing-pumpkins-2026-phoenix-17k8v0g61xa1k9d | The Smashing Pumpkins | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-smashing-pumpkins-2026-inglewood-vvg10z_1t5e4o_ | The Smashing Pumpkins | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fuerza-regida-2026-bakersfield-z7r9jz1aavaxk | Fuerza Regida | unverify (applied) | 8237408 | https://www.ticketliquidator.com/tickets/8237408/Fuerza-Regida-tickets-Sun-Oct-25-2026-Dignity-Health-Arena | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-fuerza-regida-2026-fresno-g5vyz_89-ysvr | Fuerza Regida | none | 8247043 | https://www.ticketliquidator.com/tickets/8247043/Fuerza-Regida-tickets-Tue-Oct-27-2026-Save-Mart-Center | - |
| tm-fuerza-regida-2026-fresno-g5vyz_8kys-gg | Fuerza Regida | none | 8194525 | https://www.ticketliquidator.com/tickets/8194525/Fuerza-Regida-tickets-Wed-Oct-28-2026-Save-Mart-Center | - |
| tm-fuerza-regida-2026-west-valley-city-g5vzz_8qlaba8 | Fuerza Regida | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fuerza-regida-2026-morrison-z7r9jz1aazpuz | Fuerza Regida | none | 8194529 | https://www.ticketliquidator.com/tickets/8194529/Fuerza-Regida-tickets-Mon-Nov-2-2026-Red-Rocks-Amphitheatre | - |
| tm-fuerza-regida-2026-morrison-z7r9jz1aazt0f | Fuerza Regida | none | 8203898 | https://www.ticketliquidator.com/tickets/8203898/Fuerza-Regida-tickets-Tue-Nov-3-2026-Red-Rocks-Amphitheatre | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgacnenx | Fuerza Regida | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fuerza-regida-2027-ciudad-de-mexico-1afzk4egkdlzcpt | Fuerza Regida | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fuerza-regida-2027-ciudad-de-mexico-1afzk4egkdowrar | Fuerza Regida | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fuerza-regida-2027-ciudad-de-mexico-1afzk4vgkdxsfp_ | Fuerza Regida | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fuerza-regida-2027-ciudad-de-mexico-1afzk4vgkdn9bgh | Fuerza Regida | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgacn3ld | Fuerza Regida | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgauwxey | Fuerza Regida | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgacnxl1 | Fuerza Regida | none | 8303762 | https://www.ticketliquidator.com/tickets/8303762/Fuerza-Regida-tickets-Fri-Feb-5-2027-Palacio-De-Los-Deportes-Mexico-City | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgacnwlg | Fuerza Regida | none | 8303766 | https://www.ticketliquidator.com/tickets/8303766/Fuerza-Regida-tickets-Sat-Feb-6-2027-Palacio-De-Los-Deportes-Mexico-City | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgaclelp | Fuerza Regida | none | 8303767 | https://www.ticketliquidator.com/tickets/8303767/Fuerza-Regida-tickets-Sun-Feb-7-2027-Palacio-De-Los-Deportes-Mexico-City | - |
| tm-mei-semones-2027-cambridge-z7r9jz1aaebpz | Mei Semones | none | 8297659 | https://www.ticketliquidator.com/tickets/8297659/Mei-Semones-tickets-Wed-Feb-24-2027-The-Sinclair-Music-Hall | - |
| tm-mei-semones-2027-portland-z7r9jz1aaekpv | Mei Semones | none | 8297680 | https://www.ticketliquidator.com/tickets/8297680/Mei-Semones-tickets-Thu-Feb-25-2027-Space-Gallery | - |
| tm-mei-semones-2027-toronto-rz7hnez1afu780 | Mei Semones | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mei-semones-2027-chicago-z7r9jz1aae3ax | Mei Semones | none | 8297631 | https://www.ticketliquidator.com/tickets/8297631/Mei-Semones-tickets-Tue-Mar-2-2027-Thalia-Hall | - |
| tm-mei-semones-2027-philadelphia-z7r9jz1aaebpd | Mei Semones | none | 8297660 | https://www.ticketliquidator.com/tickets/8297660/Mei-Semones-tickets-Fri-Mar-5-2027-Union-Transfer | - |
| tm-mei-semones-2027-new-york-z7r9jz1aaebpe | Mei Semones | none | 8297661 | https://www.ticketliquidator.com/tickets/8297661/Mei-Semones-tickets-Sat-Mar-6-2027-Webster-Hall | - |
| tm-mei-semones-2027-washington-16vfz_kjpg7wgxq | Mei Semones | none | 8297634 | https://www.ticketliquidator.com/tickets/8297634/Mei-Semones-tickets-Fri-Apr-9-2027-930-Club | - |
| tm-mei-semones-2027-carrboro-z7r9jz1aaefgv | Mei Semones | none | 8297656 | https://www.ticketliquidator.com/tickets/8297656/Mei-Semones-tickets-Sat-Apr-10-2027-Cats-Cradle | - |
| tm-mei-semones-2027-atlanta-z7r9jz1aaeb46 | Mei Semones | none | 8297662 | https://www.ticketliquidator.com/tickets/8297662/Mei-Semones-tickets-Sun-Apr-11-2027-Terminal-West-At-King-Plow-Arts-Center | - |
| tm-mei-semones-2027-houston-g5diz_kenctep | Mei Semones | none | 8297639 | https://www.ticketliquidator.com/tickets/8297639/Mei-Semones-tickets-Fri-Apr-16-2027-White-Oak-Music-Hall-Upstairs | - |
| tm-mei-semones-2027-tucson-z7r9jz1aae9f6 | Mei Semones | none | 8297686 | https://www.ticketliquidator.com/tickets/8297686/Mei-Semones-tickets-Tue-Apr-20-2027-La-Rosa-Tucson | - |
| tm-mei-semones-2027-san-diego-z7r9jz1aae3k4 | Mei Semones | none | 8297641 | https://www.ticketliquidator.com/tickets/8297641/Mei-Semones-tickets-Wed-Apr-21-2027-Music-Box-San-Diego | - |
| tm-mei-semones-2027-san-francisco-g5vyz_kyxockk | Mei Semones | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mei-semones-2027-vancouver-1178vpcbx94gv5 | Mei Semones | none | 8297654 | https://www.ticketliquidator.com/tickets/8297654/Mei-Semones-tickets-Tue-Apr-27-2027-Commodore-Ballroom | - |
| tm-mei-semones-2027-seattle-vvg1hz_knof3ir | Mei Semones | none | 8297648 | https://www.ticketliquidator.com/tickets/8297648/Mei-Semones-tickets-Wed-Apr-28-2027-The-Neptune-Theatre | - |
| tm-mei-semones-2027-boise-z7r9jz1aaekjo | Mei Semones | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mei-semones-2027-salt-lake-city-z7r9jz1aaefc8 | Mei Semones | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mei-semones-2027-denver-z7r9jz1aae37y | Mei Semones | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mei-semones-2027-lexington-z7r9jz1aaek09 | Mei Semones | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mei-semones-2027-columbus-z7r9jz1aaef7k | Mei Semones | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mei-semones-2027-pittsburgh-1avbz_kgkuez9wb | Mei Semones | none | 8297652 | https://www.ticketliquidator.com/tickets/8297652/Mei-Semones-tickets-Sat-May-8-2027-Spirit-Hall | - |
| tm-slipknot-2027-london-1anzkfggkdhuzzd | Slipknot | none | 8294333 | https://www.ticketliquidator.com/tickets/8294333/Slipknot-tickets-Sat-Jul-3-2027-Wembley-Stadium | - |
| tm-slipknot-2027-washington-1a4zkfmgkdgza4s | Slipknot | none | 8293109 | https://www.ticketliquidator.com/tickets/8293109/Slipknot-tickets-Fri-Jul-16-2027-Nationals-Park | - |
| tm-slipknot-2027-queens-g5vvz_kci8xei | Slipknot | none | - | - | no qualifying listing (complete catalog checked) |
| tm-slipknot-2027-montreal-1ad7z_3gkln01oc | Slipknot | none | 8293126 | https://www.ticketliquidator.com/tickets/8293126/Slipknot-tickets-Wed-Jul-21-2027-Parc-Jean-Drapeau | - |
| tm-slipknot-2027-toronto-1k7zvpczgauvkjd | Slipknot | none | - | - | no qualifying listing (complete catalog checked) |
| tm-slipknot-2027-chicago-vv167zkfmpfza26gu7 | Slipknot | none | 8293111 | https://www.ticketliquidator.com/tickets/8293111/Slipknot-tickets-Sun-Jul-25-2027-Soldier-Field | - |
| tm-slipknot-2027-hershey-vv1aezkfzgkdcrpxj | Slipknot | none | 8293112 | https://www.ticketliquidator.com/tickets/8293112/Slipknot-tickets-Wed-Jul-28-2027-Hersheypark-Stadium | - |
| tm-slipknot-2027-boston-z7r9jz1aavzbi | Slipknot | none | 8293113 | https://www.ticketliquidator.com/tickets/8293113/Slipknot-tickets-Sat-Jul-31-2027-Fenway-Park | - |
| tm-slipknot-2027-nashville-z7r9jz1aaeazk | Slipknot | none | 8293196 | https://www.ticketliquidator.com/tickets/8293196/Slipknot-tickets-Tue-Aug-3-2027-FirstBank-Stadium | - |
| tm-slipknot-2027-houston-g5diz_kx0z68q | Slipknot | none | 8293114 | https://www.ticketliquidator.com/tickets/8293114/Slipknot-tickets-Fri-Aug-6-2027-Daikin-Park | - |
| tm-slipknot-2027-commerce-city-g5vzz_kofjm9p | Slipknot | none | 8293115 | https://www.ticketliquidator.com/tickets/8293115/Slipknot-tickets-Mon-Aug-9-2027-Dicks-Sporting-Goods-Park | - |
| tm-slipknot-2027-inglewood-vvg1iz_k9by2hw | Slipknot | none | 8293118 | https://www.ticketliquidator.com/tickets/8293118/Slipknot-tickets-Fri-Aug-13-2027-SoFi-Stadium | - |
| tm-slipknot-2027-san-francisco-g5vyz_khsbrlp | Slipknot | none | 8293120 | https://www.ticketliquidator.com/tickets/8293120/Slipknot-tickets-Sun-Aug-15-2027-Golden-Gate-Park | - |
| tm-slipknot-2027-phoenix-1a_zkfggkdfoifq | Slipknot | none | 8293122 | https://www.ticketliquidator.com/tickets/8293122/Slipknot-tickets-Wed-Aug-18-2027-Chase-Field | - |
| tm-noah-kahan-2026-glasgow-1adbz_fgkn7svza | Noah Kahan | none | 7874793 | https://www.ticketliquidator.com/tickets/7874793/Noah-Kahan-tickets-Thu-Nov-5-2026-OVO-Hydro | - |
| tm-noah-kahan-2026-glasgow-1auzk3agkdn-buh | Noah Kahan | none | 7874794 | https://www.ticketliquidator.com/tickets/7874794/Noah-Kahan-tickets-Fri-Nov-6-2026-OVO-Hydro | - |
| tm-noah-kahan-2026-manchester-g5vhz_gxilkd5 | Noah Kahan | none | 7874795 | https://www.ticketliquidator.com/tickets/7874795/Noah-Kahan-tickets-Mon-Nov-9-2026-AO-Arena | - |
| tm-noah-kahan-2026-manchester-g5vhz_gxiljdj | Noah Kahan | none | 7874796 | https://www.ticketliquidator.com/tickets/7874796/Noah-Kahan-tickets-Tue-Nov-10-2026-AO-Arena | - |
| tm-noah-kahan-2026-london-1ku8v0x_gag10y_ | Noah Kahan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-noah-kahan-2026-london-1ku8v0x_gag57yq | Noah Kahan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-noah-kahan-2026-dublin-1avoz_fgkn52bxo | Noah Kahan | none | 7885145 | https://www.ticketliquidator.com/tickets/7885145/Noah-Kahan-tickets-Thu-Nov-19-2026-3Arena-Dublin | - |
| tm-noah-kahan-2026-dublin-1kkzv0x9ga2yvxh | Noah Kahan | none | 7879571 | https://www.ticketliquidator.com/tickets/7879571/Noah-Kahan-tickets-Sat-Nov-21-2026-3Arena-Dublin | - |
| tm-noah-kahan-2026-dublin-1abzk3agkdihdnu | Noah Kahan | none | 7885279 | https://www.ticketliquidator.com/tickets/7885279/Noah-Kahan-tickets-Sun-Nov-22-2026-3Arena-Dublin | - |
| tm-noah-kahan-2026-munich-z698xzc2z1k3fveos | Noah Kahan | none | 7877198 | https://www.ticketliquidator.com/tickets/7877198/Noah-Kahan-tickets-Fri-Dec-4-2026-Kleine-Olympiahalle-Munich | - |
| tm-noah-kahan-2027-glasgow-1adbz_8gkufqoce | Noah Kahan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-noah-kahan-2027-dublin-1abzkffgkeyrrov | Noah Kahan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-noah-kahan-2027-dublin-1abzkfbgkd7h5py | Noah Kahan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-noah-kahan-2027-london-1anzkf3gkd7-b4s | Noah Kahan | none | 8224894 | https://www.ticketliquidator.com/tickets/8224894/Noah-Kahan-tickets-Fri-Jul-23-2027-Wembley-Stadium | - |
| tm-noah-kahan-2027-london-1anzkf4gkexwogg | Noah Kahan | none | 8233856 | https://www.ticketliquidator.com/tickets/8233856/Noah-Kahan-tickets-Sat-Jul-24-2027-Wembley-Stadium | - |
| tm-noah-kahan-2027-london-1anzkf4gkddlzu_ | Noah Kahan | none | 8244107 | https://www.ticketliquidator.com/tickets/8244107/Noah-Kahan-tickets-Sun-Jul-25-2027-Wembley-Stadium | - |
| tm-eagles-2026-las-vegas-1a9zk37gkdxvozi | Eagles | none | 7930155 | https://www.ticketliquidator.com/tickets/7930155/The-Eagles-tickets-Fri-Nov-13-2026-Sphere | - |
| tm-eagles-2026-las-vegas-1a9zk37gkdxg-zv | Eagles | none | 7930156 | https://www.ticketliquidator.com/tickets/7930156/The-Eagles-tickets-Sat-Nov-14-2026-Sphere | - |
| tm-eagles-2026-las-vegas-1a9zk37gkdxusyv | Eagles | none | 7930157 | https://www.ticketliquidator.com/tickets/7930157/The-Eagles-tickets-Fri-Nov-27-2026-Sphere | - |
| tm-eagles-2026-las-vegas-1a9zk37gkdxzvy5 | Eagles | none | 7930158 | https://www.ticketliquidator.com/tickets/7930158/The-Eagles-tickets-Sat-Nov-28-2026-Sphere | - |
| tm-eagles-2026-las-vegas-1a9zk3dgkdpxlsb | Eagles | none | 8113664 | https://www.ticketliquidator.com/tickets/8113664/The-Eagles-tickets-Fri-Dec-4-2026-Sphere | - |
| tm-eagles-2026-las-vegas-1a9zk3dgkdpxrsr | Eagles | none | 8113665 | https://www.ticketliquidator.com/tickets/8113665/The-Eagles-tickets-Sat-Dec-5-2026-Sphere | - |
| tm-eagles-2026-las-vegas-1a9zk3dgkdpxrso | Eagles | none | 8113666 | https://www.ticketliquidator.com/tickets/8113666/The-Eagles-tickets-Fri-Dec-11-2026-Sphere | - |
| tm-eagles-2026-las-vegas-1a9zk3dgkdbgzr6 | Eagles | none | 8113667 | https://www.ticketliquidator.com/tickets/8113667/The-Eagles-tickets-Sat-Dec-12-2026-Sphere | - |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpxrs0 | Eagles | none | 8180169 | https://www.ticketliquidator.com/tickets/8180169/The-Eagles-tickets-Fri-Jan-15-2027-Sphere | - |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpxtsj | Eagles | none | 8180170 | https://www.ticketliquidator.com/tickets/8180170/The-Eagles-tickets-Sat-Jan-16-2027-Sphere | - |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpxtsi | Eagles | none | 8180171 | https://www.ticketliquidator.com/tickets/8180171/The-Eagles-tickets-Fri-Jan-22-2027-Sphere | - |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpt2sm | Eagles | none | 8180172 | https://www.ticketliquidator.com/tickets/8180172/The-Eagles-tickets-Sat-Jan-23-2027-Sphere | - |
| tm-journey-2026-philadelphia-17gzv0g61p0-ppk | Journey | none | 7956777 | https://www.ticketliquidator.com/tickets/7956777/Journey-tickets-Wed-Oct-28-2026-Xfinity-Mobile-Arena | - |
| tm-journey-2026-providence-vvg17z_1fuwpyc | Journey | none | 7956778 | https://www.ticketliquidator.com/tickets/7956778/Journey-tickets-Thu-Oct-29-2026-Amica-Mutual-Pavilion | - |
| tm-journey-2026-detroit-vvg1oz_13slngw | Journey | none | 7956779 | https://www.ticketliquidator.com/tickets/7956779/Journey-tickets-Mon-Nov-2-2026-Little-Caesars-Arena | - |
| tm-journey-2026-toronto-177zv0g6110gajo | Journey | none | - | - | no qualifying listing (complete catalog checked) |
| tm-journey-2026-wilkes-barre-z7r9jz1a70abw | Journey | none | - | - | no qualifying listing (complete catalog checked) |
| tm-journey-2026-uniondale-k7vgf_1ka_zph | Journey | none | 7956780 | https://www.ticketliquidator.com/tickets/7956780/Journey-tickets-Sat-Nov-7-2026-Nassau-Veterans-Memorial-Coliseum | - |
| tm-journey-2026-boston-vvg17z_19ipadt | Journey | none | 7956781 | https://www.ticketliquidator.com/tickets/7956781/Journey-tickets-Tue-Nov-10-2026-TD-Garden | - |
| tm-journey-2026-cleveland-z7r9jz1a70_7k | Journey | none | 7956853 | https://www.ticketliquidator.com/tickets/7956853/Journey-tickets-Thu-Nov-12-2026-Rocket-Arena | - |
| tm-journey-2026-greenville-g5evz_1k1vuwb | Journey | none | 7956782 | https://www.ticketliquidator.com/tickets/7956782/Journey-tickets-Sat-Nov-14-2026-Bon-Secours-Wellness-Arena | - |
| tm-journey-2026-saint-louis-vvg1bz_1qqkifj | Journey | none | - | - | no qualifying listing (complete catalog checked) |
| tm-journey-2026-houston-z7r9jz1a70_fz | Journey | none | 7956854 | https://www.ticketliquidator.com/tickets/7956854/Journey-tickets-Wed-Nov-18-2026-Toyota-Center-TX | - |
| tm-journey-2026-dallas-vvg1yz_14w7vrn | Journey | none | 7956784 | https://www.ticketliquidator.com/tickets/7956784/Journey-tickets-Fri-Nov-20-2026-American-Airlines-Center | - |
| tm-journey-2026-denver-g5vzz_1kxjfbe | Journey | none | 7956785 | https://www.ticketliquidator.com/tickets/7956785/Journey-tickets-Sun-Nov-22-2026-Ball-Arena | - |
| tm-journey-2026-anaheim-vvg10z_1q4chn3 | Journey | none | 7956786 | https://www.ticketliquidator.com/tickets/7956786/Journey-tickets-Tue-Nov-24-2026-Honda-Center | - |
| tm-journey-2026-las-vegas-z7r9jz1a70_7f | Journey | none | 7956855 | https://www.ticketliquidator.com/tickets/7956855/Journey-tickets-Fri-Nov-27-2026-MGM-Grand-Garden-Arena | - |
| tm-journey-2026-san-francisco-g5vyz_aeock9c | Journey | none | 7956787 | https://www.ticketliquidator.com/tickets/7956787/Journey-tickets-Sat-Nov-28-2026-Chase-Center | - |
| tm-john-mayer-2027-las-vegas-11ayvpu8jkxpvc | John Mayer | none | 8294204 | https://www.ticketliquidator.com/tickets/8294204/John-Mayer-tickets-Thu-Apr-8-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7ucku | John Mayer | none | 8294205 | https://www.ticketliquidator.com/tickets/8294205/John-Mayer-tickets-Sat-Apr-10-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7uckz | John Mayer | none | 8294206 | https://www.ticketliquidator.com/tickets/8294206/John-Mayer-tickets-Sun-Apr-11-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7uwkb | John Mayer | none | 8294208 | https://www.ticketliquidator.com/tickets/8294208/John-Mayer-tickets-Thu-Apr-15-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mukw | John Mayer | none | 8294209 | https://www.ticketliquidator.com/tickets/8294209/John-Mayer-tickets-Sat-Apr-17-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mukt | John Mayer | none | 8294211 | https://www.ticketliquidator.com/tickets/8294211/John-Mayer-tickets-Sun-Apr-18-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_fp3g7i6pt | John Mayer | none | 8310915 | https://www.ticketliquidator.com/tickets/8310915/John-Mayer-tickets-Wed-Apr-28-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_fp3g7w9n5 | John Mayer | none | 8310917 | https://www.ticketliquidator.com/tickets/8310917/John-Mayer-tickets-Fri-Apr-30-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_fp3g7dmck | John Mayer | none | 8310918 | https://www.ticketliquidator.com/tickets/8310918/John-Mayer-tickets-Sat-May-1-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mqfv | John Mayer | none | 8310919 | https://www.ticketliquidator.com/tickets/8310919/John-Mayer-tickets-Wed-May-5-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mcfd | John Mayer | none | 8310920 | https://www.ticketliquidator.com/tickets/8310920/John-Mayer-tickets-Fri-May-7-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mwfa | John Mayer | none | 8310921 | https://www.ticketliquidator.com/tickets/8310921/John-Mayer-tickets-Sat-May-8-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mwf6 | John Mayer | none | 8311171 | https://www.ticketliquidator.com/tickets/8311171/John-Mayer-tickets-Wed-May-12-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zufa | John Mayer | none | 8311172 | https://www.ticketliquidator.com/tickets/8311172/John-Mayer-tickets-Fri-May-14-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zqf5 | John Mayer | none | 8311173 | https://www.ticketliquidator.com/tickets/8311173/John-Mayer-tickets-Sat-May-15-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zqfu | John Mayer | none | 8311174 | https://www.ticketliquidator.com/tickets/8311174/John-Mayer-tickets-Wed-Jun-2-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zcf2 | John Mayer | none | 8311175 | https://www.ticketliquidator.com/tickets/8311175/John-Mayer-tickets-Fri-Jun-4-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zwf4 | John Mayer | none | 8311176 | https://www.ticketliquidator.com/tickets/8311176/John-Mayer-tickets-Sat-Jun-5-2027-Sphere | - |
| tm-backstreet-boys-2026-las-vegas-17ayv0g62tqwir3 | Backstreet Boys | none | 8223803 | https://www.ticketliquidator.com/tickets/8223803/Backstreet-Boys-tickets-Sat-Dec-26-2026-Sphere | - |
| tm-backstreet-boys-2026-las-vegas-17ayv0g62tqtbry | Backstreet Boys | none | 8223802 | https://www.ticketliquidator.com/tickets/8223802/Backstreet-Boys-tickets-Sun-Dec-27-2026-Sphere | - |
| tm-backstreet-boys-2027-las-vegas-17ayv0g62th2fwx | Backstreet Boys | none | 8194445 | https://www.ticketliquidator.com/tickets/8194445/Backstreet-Boys-tickets-Thu-Dec-31-2026-Sphere | - |
| tm-backstreet-boys-2027-las-vegas-17ayv0g62thois9 | Backstreet Boys | none | 8194446 | https://www.ticketliquidator.com/tickets/8194446/Backstreet-Boys-tickets-Fri-Jan-1-2027-Sphere | - |
| tm-backstreet-boys-2027-las-vegas-17ayv0g62th3iss | Backstreet Boys | none | 8194447 | https://www.ticketliquidator.com/tickets/8194447/Backstreet-Boys-tickets-Sat-Jan-2-2027-Sphere | - |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7jcq4 | Backstreet Boys | none | - | - | no qualifying listing (complete catalog checked) |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7qqq_ | Backstreet Boys | none | - | - | no qualifying listing (complete catalog checked) |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7ruqx | Backstreet Boys | none | - | - | no qualifying listing (complete catalog checked) |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7luql | Backstreet Boys | none | - | - | no qualifying listing (complete catalog checked) |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7ouqm | Backstreet Boys | none | - | - | no qualifying listing (complete catalog checked) |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7owqt | Backstreet Boys | none | - | - | no qualifying listing (complete catalog checked) |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7-cha | Backstreet Boys | none | - | - | no qualifying listing (complete catalog checked) |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7xqhp | Backstreet Boys | none | - | - | no qualifying listing (complete catalog checked) |
| tm-backstreet-boys-2027-toronto-1avzz_kgkz7nuhj | Backstreet Boys | none | - | - | no qualifying listing (complete catalog checked) |
| tm-backstreet-boys-2027-toronto-1k7zvpotga1oqed | Backstreet Boys | none | - | - | no qualifying listing (complete catalog checked) |
| tm-backstreet-boys-2027-toronto-1k7zvpotga14bio | Backstreet Boys | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-west-hollywood-z7r9jz1aaeexf | Haiden Henderson | none | 8284340 | https://www.ticketliquidator.com/tickets/8284340/Haiden-Henderson-tickets-Sat-May-15-2027-Troubadour | - |
| tm-hazlett-2027-glasgow-1auzkfggkeyhp7l | Hazlett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hazlett-2027-manchester-g5vhz_klkyfqd | Hazlett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hazlett-2027-dublin-1abzkfmgkdlb_c6 | Hazlett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hazlett-2027-london-g5dzz_3nl_fgq | Hazlett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nickelback-2027-waurn-ponds-1akzk4fgker3psp | Nickelback | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nickelback-2027-pokolbin-1akzk46gkdiziaq | Nickelback | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-reading-vv17fz_kgks7life | Rod Stewart | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-niagara-falls-16vzzbmcag7m0q9 | Rod Stewart | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-savannah-vvg1zz_kexgebo | Rod Stewart | none | 8277059 | https://www.ticketliquidator.com/tickets/8277059/Rod-Stewart-tickets-Mon-Mar-8-2027-Enmarket-Arena | - |
| tm-rod-stewart-2027-biloxi-g5viz_kjgqiyx | Rod Stewart | none | 8294731 | https://www.ticketliquidator.com/tickets/8294731/Rod-Stewart-tickets-Wed-Mar-10-2027-Mississippi-Coast-Coliseum | - |
| tm-rod-stewart-2027-hollywood-vvg1vz_3j9ejp4 | Rod Stewart | none | 8266994 | https://www.ticketliquidator.com/tickets/8266994/Rod-Stewart-tickets-Fri-Mar-12-2027-Hard-Rock-Live-At-The-Seminole-Hard-Rock-Hotel-Casino-Hollywood | - |
| tm-rod-stewart-2027-saint-augustine-z7r9jz1aavybs | Rod Stewart | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-uncasville-g5vvz_flfx92d | Rod Stewart | none | 8319868 | https://www.ticketliquidator.com/tickets/8319868/Rod-Stewart-tickets-Fri-Mar-19-2027-Mohegan-Sun-Arena-CT | - |
| tm-rod-stewart-2027-dublin-1avoz_kgkw68xnf | Rod Stewart | none | 8307235 | https://www.ticketliquidator.com/tickets/8307235/Rod-Stewart-tickets-Sat-Apr-24-2027-3Arena-Dublin | - |
| tm-rod-stewart-2027-glasgow-1auzkfygkdhvxxd | Rod Stewart | none | 8308633 | https://www.ticketliquidator.com/tickets/8308633/Rod-Stewart-tickets-Sat-May-1-2027-OVO-Hydro | - |
| tm-rod-stewart-2027-birmingham-1kfyvpcfga2dzlv | Rod Stewart | none | 8297144 | https://www.ticketliquidator.com/tickets/8297144/Rod-Stewart-tickets-Tue-May-4-2027-Utilita-Arena-Birmingham | - |
| tm-rod-stewart-2027-manchester-1amzkfugkesbky7 | Rod Stewart | none | 8293090 | https://www.ticketliquidator.com/tickets/8293090/Rod-Stewart-tickets-Thu-May-6-2027-Co-Op-Live | - |
| tm-rod-stewart-2027-manchester-1amzkfzgkdjwz0v | Rod Stewart | none | 8308591 | https://www.ticketliquidator.com/tickets/8308591/Rod-Stewart-tickets-Sat-May-8-2027-Co-Op-Live | - |
| tm-rod-stewart-2027-london-1agzkfzgkdv3zff | Rod Stewart | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-london-1agzkfzgkdvmnjo | Rod Stewart | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-amsterdam-z698xzbpz1kbf3oo4 | Rod Stewart | none | 8299870 | https://www.ticketliquidator.com/tickets/8299870/Rod-Stewart-tickets-Fri-May-28-2027-Ziggo-Dome | - |
| tm-rod-stewart-2027-merksem-antwerpen-z698xzg2z1kq_k_u9 | Rod Stewart | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-berlin-z698xzc2z16vov80ga | Rod Stewart | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-helsinki-z698xz8kz16v7ia-bv | Rod Stewart | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-trondheim-z698xzb_z16vaukozj | Rod Stewart | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-munich-z698xzc2z1kqvo_bs | Rod Stewart | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-praha-9-z698xzu0z16v8ffvx6 | Rod Stewart | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-krakow-z698xzqpz1kk400qk | Rod Stewart | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-hannover-z698xzc2z1k88ofxe | Rod Stewart | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-morrison-z7r9jz1a7qu14 | Rod Stewart | none | 7548018 | https://www.ticketliquidator.com/tickets/7548018/Rod-Stewart-tickets-Thu-Sep-2-2027-Red-Rocks-Amphitheatre | - |
| tm-rod-stewart-2027-morrison-z7r9jz1a7r6o4 | Rod Stewart | none | 7566556 | https://www.ticketliquidator.com/tickets/7566556/Rod-Stewart-tickets-Fri-Sep-3-2027-Red-Rocks-Amphitheatre | - |
| tm-leon-bridges-2026-miami-z7r9jz1aaeaqz | Leon Bridges | none | - | - | no qualifying listing (complete catalog checked) |
| tm-leon-bridges-2027-south-yarra-1avgz_3gkmvg9lb | Leon Bridges | none | - | - | no qualifying listing (complete catalog checked) |
| tm-leon-bridges-2027-south-yarra-1avgz_3gkrjiqf8 | Leon Bridges | none | - | - | no qualifying listing (complete catalog checked) |
| tm-leon-bridges-2027-las-vegas-1a9zkfsgkex2qfe | Leon Bridges | none | 8313659 | https://www.ticketliquidator.com/tickets/8313659/Leon-Bridges-tickets-Wed-Apr-7-2027-The-Chelsea-The-Cosmopolitan-of-Las-Vegas | - |
| tm-leon-bridges-2027-fort-worth-vvg1yz_f9mdndc | Leon Bridges | unverify (applied) | 8313660 | https://www.ticketliquidator.com/tickets/8313660/Leon-Bridges-tickets-Fri-Apr-23-2027-Dickies-Arena | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-leon-bridges-2027-toronto-1a8zk46gkesn6zx | Leon Bridges | none | - | - | no qualifying listing (complete catalog checked) |
| tm-leon-bridges-2027-new-york-g5diz_fqi50fg | Leon Bridges | none | 8313661 | https://www.ticketliquidator.com/tickets/8313661/Leon-Bridges-tickets-Sat-May-1-2027-Madison-Square-Garden | - |
| tm-leon-bridges-2027-charlotte-g5evz_ks2c2jb | Leon Bridges | none | 8313662 | https://www.ticketliquidator.com/tickets/8313662/Leon-Bridges-tickets-Fri-Jul-16-2027-Skyla-Credit-Union-Amphitheatre | - |
| tm-leon-bridges-2027-alpharetta-vvg1zz_k76-tb0 | Leon Bridges | none | 8313663 | https://www.ticketliquidator.com/tickets/8313663/Leon-Bridges-tickets-Sat-Jul-17-2027-Ameris-Bank-Amphitheatre | - |
| tm-leon-bridges-2027-wilmington-g5evz_kw2tkfi | Leon Bridges | none | 8313664 | https://www.ticketliquidator.com/tickets/8313664/Leon-Bridges-tickets-Wed-Jul-21-2027-Live-Oak-Bank-Pavilion-At-Riverfront-Park | - |
| tm-leon-bridges-2027-columbia-1avfz_fqmqezd586 | Leon Bridges | none | 8313665 | https://www.ticketliquidator.com/tickets/8313665/Leon-Bridges-tickets-Fri-Jul-23-2027-Merriweather-Post-Pavilion | - |
| tm-leon-bridges-2027-boston-vv177z_kgkikdrri | Leon Bridges | none | 8313666 | https://www.ticketliquidator.com/tickets/8313666/Leon-Bridges-tickets-Sat-Jul-24-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-leon-bridges-2027-philadelphia-vv17fz_kgkbngqe2 | Leon Bridges | none | - | - | no qualifying listing (complete catalog checked) |
| tm-leon-bridges-2027-bend-vvg1hz_ks7yjc4 | Leon Bridges | none | 8313668 | https://www.ticketliquidator.com/tickets/8313668/Leon-Bridges-tickets-Thu-Aug-12-2027-Hayden-Homes-Amphitheater | - |
| tm-leon-bridges-2027-seattle-vvg1hz_fqtqa-a | Leon Bridges | none | 8313669 | https://www.ticketliquidator.com/tickets/8313669/Leon-Bridges-tickets-Fri-Aug-13-2027-Climate-Pledge-Arena | - |
| tm-leon-bridges-2027-edmonton-1aozkfigkdr2_nl | Leon Bridges | none | 8313680 | https://www.ticketliquidator.com/tickets/8313680/Leon-Bridges-tickets-Tue-Aug-17-2027-Northern-Alberta-Jubilee-Auditorium | - |
| tm-leon-bridges-2027-calgary-1aozkfygkeskgd1 | Leon Bridges | none | - | - | no qualifying listing (complete catalog checked) |
| tm-leon-bridges-2027-calgary-1aozkfygkesvjka | Leon Bridges | none | - | - | no qualifying listing (complete catalog checked) |
| tm-leon-bridges-2027-bonner-g5vzz_fhjrcg3 | Leon Bridges | none | 8313670 | https://www.ticketliquidator.com/tickets/8313670/Leon-Bridges-tickets-Sat-Aug-21-2027-KettleHouse-Amphitheater | - |
| tm-leon-bridges-2027-waukee-1a-zkfzgkd1bnt9 | Leon Bridges | none | 8313671 | https://www.ticketliquidator.com/tickets/8313671/Leon-Bridges-tickets-Wed-Aug-25-2027-Vibrant-Music-Hall | - |
| tm-leon-bridges-2027-indianapolis-vv17fz_kgkupdufu | Leon Bridges | none | 8313672 | https://www.ticketliquidator.com/tickets/8313672/Leon-Bridges-tickets-Thu-Aug-26-2027-Everwise-Amphitheater-at-White-River-State-Park | - |
| tm-leon-bridges-2027-milwaukee-vv17jz_kgkbyybma | Leon Bridges | none | 8313673 | https://www.ticketliquidator.com/tickets/8313673/Leon-Bridges-tickets-Wed-Sep-15-2027-Landmark-Credit-Union-Live | - |
| tm-leon-bridges-2027-minneapolis-vv1fbz_fb9zezd8da | Leon Bridges | none | 8313674 | https://www.ticketliquidator.com/tickets/8313674/Leon-Bridges-tickets-Fri-Sep-17-2027-The-Armory-Minneapolis | - |
| tm-leon-bridges-2027-rogers-g5viz_kpps1qm | Leon Bridges | none | 8313675 | https://www.ticketliquidator.com/tickets/8313675/Leon-Bridges-tickets-Thu-Sep-23-2027-Walmart-AMP | - |
| tm-leon-bridges-2027-austin-g5diz_flks0j9 | Leon Bridges | none | 8313676 | https://www.ticketliquidator.com/tickets/8313676/Leon-Bridges-tickets-Fri-Sep-24-2027-Moody-Center-ATX | - |
| tm-leon-bridges-2027-houston-g5diz_kb01hxf | Leon Bridges | none | 8313677 | https://www.ticketliquidator.com/tickets/8313677/Leon-Bridges-tickets-Sat-Sep-25-2027-713-Music-Hall | - |
| tm-leon-bridges-2027-phoenix-1a_zk4kgkdlzjqa | Leon Bridges | none | 8313678 | https://www.ticketliquidator.com/tickets/8313678/Leon-Bridges-tickets-Wed-Sep-29-2027-Arizona-Financial-Theatre | - |
| tm-lionel-richie-2026-las-vegas-17ayv0g62k5zuj3 | Lionel Richie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lionel-richie-2026-las-vegas-17ayv0g62k5zcj9 | Lionel Richie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lionel-richie-2026-las-vegas-17ayv0g62k5yqjh | Lionel Richie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lionel-richie-2027-las-vegas-17ayv0g62k5uqjk | Lionel Richie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lionel-richie-2027-las-vegas-17ayv0g62k5muj2 | Lionel Richie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lionel-richie-2027-thackerville-z7r9jz1aav_-z | Lionel Richie | none | 8237289 | https://www.ticketliquidator.com/tickets/8237289/Lionel-Richie-tickets-Sat-Jan-30-2027-Lucas-Oil-Live-At-WinStar-Casino | - |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlu34n | Earth, Wind & Fire | none | - | - | no qualifying listing (complete catalog checked) |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdlc34z | Earth, Wind & Fire | none | - | - | no qualifying listing (complete catalog checked) |
| tm-earth-wind-fire-2026-las-vegas-1a9zkopgkdl23po | Earth, Wind & Fire | none | - | - | no qualifying listing (complete catalog checked) |
| tm-earth-wind-fire-2026-atlantic-city-vv1aezkfagkd-8nc- | Earth, Wind & Fire | none | 8196638 | https://www.ticketliquidator.com/tickets/8196638/Earth-Wind-and-Fire-tickets-Fri-Dec-11-2026-Hard-Rock-Live-At-Etess-Arena | - |
| tm-earth-wind-fire-2026-atlantic-city-vv1aezkfagkd-okcm | Earth, Wind & Fire | none | 8196639 | https://www.ticketliquidator.com/tickets/8196639/Earth-Wind-and-Fire-tickets-Sat-Dec-12-2026-Hard-Rock-Live-At-Etess-Arena | - |
| tm-earth-wind-fire-2027-thackerville-z7r9jz1aazwqd | Earth, Wind & Fire | none | - | - | no qualifying listing (complete catalog checked) |
| tm-earth-wind-fire-2027-west-palm-beach-z7r9jz1aaea-g | Earth, Wind & Fire | none | - | - | no qualifying listing (complete catalog checked) |
| tm-earth-wind-fire-2027-brandon-g5viz_kuehuto | Earth, Wind & Fire | none | 8307212 | https://www.ticketliquidator.com/tickets/8307212/Earth-Wind-and-Fire-tickets-Sat-Apr-17-2027-Brandon-Amphitheater | - |
| tm-earth-wind-fire-2027-southaven-g5viz_f7otpyl | Earth, Wind & Fire | none | - | - | no qualifying listing (complete catalog checked) |
| tm-earth-wind-fire-2027-huntsville-z7r9jz1aaeb18 | Earth, Wind & Fire | none | 8310384 | https://www.ticketliquidator.com/tickets/8310384/Earth-Wind-and-Fire-tickets-Wed-Apr-21-2027-The-Orion-Amphitheater | - |
| tm-earth-wind-fire-2027-atlanta-vvg1zz_33xgiy_ | Earth, Wind & Fire | none | 8307214 | https://www.ticketliquidator.com/tickets/8307214/Earth-Wind-and-Fire-tickets-Fri-Apr-23-2027-Synovus-Bank-Amphitheater-at-Chastain-Park | - |
| tm-earth-wind-fire-2027-savannah-vvg1zz_3cl5hyq | Earth, Wind & Fire | none | 8307215 | https://www.ticketliquidator.com/tickets/8307215/Earth-Wind-and-Fire-tickets-Sat-Apr-24-2027-Enmarket-Arena | - |
| tm-earth-wind-fire-2027-columbia-g5evz_kl2875x | Earth, Wind & Fire | none | 8307216 | https://www.ticketliquidator.com/tickets/8307216/Earth-Wind-and-Fire-tickets-Tue-Apr-27-2027-Township-Auditorium | - |
| tm-earth-wind-fire-2027-knoxville-g5viz_35urusm | Earth, Wind & Fire | none | 8307217 | https://www.ticketliquidator.com/tickets/8307217/Earth-Wind-and-Fire-tickets-Wed-Apr-28-2027-Tennessee-Theatre | - |
| tm-earth-wind-fire-2027-charlotte-g5evz_kmaoltm | Earth, Wind & Fire | none | 8307218 | https://www.ticketliquidator.com/tickets/8307218/Earth-Wind-and-Fire-tickets-Fri-Apr-30-2027-Skyla-Credit-Union-Amphitheatre | - |
| tm-earth-wind-fire-2027-durham-g5evz_f5p7r9- | Earth, Wind & Fire | none | - | - | no qualifying listing (complete catalog checked) |
| tm-santana-2026-las-vegas-17ayv0g6ck11zds | Santana | none | 8113675 | https://www.ticketliquidator.com/tickets/8113675/Santana-tickets-Wed-Nov-4-2026-House-Of-Blues-Las-Vegas | - |
| tm-santana-2026-las-vegas-17ayv0g6ck1gfdb | Santana | none | 8113676 | https://www.ticketliquidator.com/tickets/8113676/Santana-tickets-Thu-Nov-5-2026-House-Of-Blues-Las-Vegas | - |
| tm-santana-2026-las-vegas-17ayv0g6ck1ub7d | Santana | none | 8113677 | https://www.ticketliquidator.com/tickets/8113677/Santana-tickets-Sat-Nov-7-2026-House-Of-Blues-Las-Vegas | - |
| tm-santana-2026-las-vegas-17ayv0g6ck1cz73 | Santana | none | 8113678 | https://www.ticketliquidator.com/tickets/8113678/Santana-tickets-Sun-Nov-8-2026-House-Of-Blues-Las-Vegas | - |
| tm-santana-2026-las-vegas-17ayv0g6ck18f79 | Santana | none | 8113679 | https://www.ticketliquidator.com/tickets/8113679/Santana-tickets-Wed-Nov-11-2026-House-Of-Blues-Las-Vegas | - |
| tm-santana-2026-las-vegas-17ayv0g6ck1oi7r | Santana | none | 8113680 | https://www.ticketliquidator.com/tickets/8113680/Santana-tickets-Thu-Nov-12-2026-House-Of-Blues-Las-Vegas | - |
| tm-santana-2026-las-vegas-17ayv0g6ck13z7p | Santana | none | 8113681 | https://www.ticketliquidator.com/tickets/8113681/Santana-tickets-Sat-Nov-14-2026-House-Of-Blues-Las-Vegas | - |
| tm-santana-2026-las-vegas-17ayv0g6ck1fb7i | Santana | none | 8113682 | https://www.ticketliquidator.com/tickets/8113682/Santana-tickets-Sun-Nov-15-2026-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gau5vmo | Santana | none | 8294011 | https://www.ticketliquidator.com/tickets/8294011/Santana-tickets-Wed-Jan-20-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gaugomb | Santana | none | 8294012 | https://www.ticketliquidator.com/tickets/8294012/Santana-tickets-Thu-Jan-21-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gauu-zk | Santana | none | 8294013 | https://www.ticketliquidator.com/tickets/8294013/Santana-tickets-Sat-Jan-23-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gaucsz4 | Santana | none | 8294014 | https://www.ticketliquidator.com/tickets/8294014/Santana-tickets-Sun-Jan-24-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gau8vze | Santana | none | 8294015 | https://www.ticketliquidator.com/tickets/8294015/Santana-tickets-Wed-Jan-27-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gauoozw | Santana | none | 8294016 | https://www.ticketliquidator.com/tickets/8294016/Santana-tickets-Thu-Jan-28-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gau3-y4 | Santana | none | 8294018 | https://www.ticketliquidator.com/tickets/8294018/Santana-tickets-Sat-Jan-30-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gauksyx | Santana | none | 8294019 | https://www.ticketliquidator.com/tickets/8294019/Santana-tickets-Sun-Jan-31-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gau4vyt | Santana | none | 8294020 | https://www.ticketliquidator.com/tickets/8294020/Santana-tickets-Wed-May-12-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gaupoyr | Santana | none | 8294021 | https://www.ticketliquidator.com/tickets/8294021/Santana-tickets-Thu-May-13-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gau9-ys | Santana | none | 8294022 | https://www.ticketliquidator.com/tickets/8294022/Santana-tickets-Sat-May-15-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gaubsyw | Santana | none | 8294023 | https://www.ticketliquidator.com/tickets/8294023/Santana-tickets-Sun-May-16-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gauq-b9 | Santana | none | 8294024 | https://www.ticketliquidator.com/tickets/8294024/Santana-tickets-Wed-May-19-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gaujvbi | Santana | none | 8294025 | https://www.ticketliquidator.com/tickets/8294025/Santana-tickets-Thu-May-20-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gauq-bb | Santana | none | 8294026 | https://www.ticketliquidator.com/tickets/8294026/Santana-tickets-Sat-May-22-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gaursdv | Santana | none | 8294027 | https://www.ticketliquidator.com/tickets/8294027/Santana-tickets-Sun-May-23-2027-House-Of-Blues-Las-Vegas | - |
| tm-simple-minds-2027-auckland-17azv0g6g9-xfc0 | Simple Minds | none | 8173259 | https://www.ticketliquidator.com/tickets/8173259/Simple-Minds-tickets-Thu-Feb-25-2027-Spark-Arena | - |
| tm-simple-minds-2027-wellington-17azv0g6gjon-by | Simple Minds | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-minds-2027-christchurch-17azv0g6gjwt3e9 | Simple Minds | none | 8180239 | https://www.ticketliquidator.com/tickets/8180239/Simple-Minds-tickets-Mon-Mar-1-2027-Wolfbrook-Arena | - |
| tm-simple-minds-2027-assago-zg9rmiynyzdf1v | Simple Minds | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-minds-2027-casalecchio-di-reno-bologna-zg9rmiynyzdfaa | Simple Minds | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-minds-2027-munich-z698xzc2z16vqkpa7j | Simple Minds | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-minds-2027-berlin-z698xzc2z1kbdpf-d | Simple Minds | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-minds-2027-hamburg-z698xzc2z1k0n7tj3 | Simple Minds | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-minds-2027-amsterdam-z698xzbpz16v_t_v7k | Simple Minds | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-minds-2027-amsterdam-z698xzbpz1k8banaf | Simple Minds | none | 8315154 | https://www.ticketliquidator.com/tickets/8315154/Simple-Minds-tickets-Sat-May-1-2027-Ziggo-Dome | - |
| tm-simple-minds-2027-london-16dfz_313g7wgmr | Simple Minds | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-minds-2027-manchester-1amzkfxgkdzwjhm | Simple Minds | none | 8247671 | https://www.ticketliquidator.com/tickets/8247671/Simple-Minds-tickets-Fri-May-7-2027-Co-Op-Live | - |
| tm-simple-minds-2027-birmingham-1aegz_31ka4zdg5d | Simple Minds | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-minds-2027-nottingham-1adfz_31k14zduv5 | Simple Minds | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-minds-2027-leeds-g5vhz_31k8si9 | Simple Minds | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-minds-2027-newcastle-upon-tyne-g5vhz_31k4viz | Simple Minds | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-minds-2027-glasgow-1auzkfxgkd0xdr8 | Simple Minds | none | 8272591 | https://www.ticketliquidator.com/tickets/8272591/Simple-Minds-tickets-Fri-May-14-2027-OVO-Hydro | - |
| tm-simple-minds-2027-dublin-1kkzvpk_ga2vkuc | Simple Minds | add (applied) | 8341561 | https://www.ticketliquidator.com/tickets/8341561/Simple-Minds-tickets-Mon-May-17-2027-3Arena-Dublin | - |
| tm-thirty-seconds-to-mars-2027-madrid-z698xz2qz1kvp4xag | Thirty Seconds to Mars | none | 7877280 | https://www.ticketliquidator.com/tickets/7877280/Thirty-Seconds-To-Mars-tickets-Thu-Apr-8-2027-Movistar-Arena-Madrid | - |
| tm-thirty-seconds-to-mars-2027-valencia-z698xz2qz16vuf8kq4 | Thirty Seconds to Mars | none | 7877281 | https://www.ticketliquidator.com/tickets/7877281/Thirty-Seconds-To-Mars-tickets-Fri-Apr-9-2027-Roig-Arena | - |
| tm-thirty-seconds-to-mars-2027-assago-zg9rmiynyzeadk | Thirty Seconds to Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-thirty-seconds-to-mars-2027-munich-z698xzc2z16vfvofpp | Thirty Seconds to Mars | none | 7877284 | https://www.ticketliquidator.com/tickets/7877284/Thirty-Seconds-To-Mars-tickets-Mon-Apr-12-2027-Kleine-Olympiahalle-Munich | - |
| tm-thirty-seconds-to-mars-2027-vienna-z698xz5rz1k-suw-g | Thirty Seconds to Mars | none | 7877285 | https://www.ticketliquidator.com/tickets/7877285/Thirty-Seconds-To-Mars-tickets-Wed-Apr-14-2027-Wiener-Stadthalle-Halle-D | - |
| tm-thirty-seconds-to-mars-2027-krakow-z698xzqpz1ke8f3ad | Thirty Seconds to Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-thirty-seconds-to-mars-2027-hannover-z698xzc2z16vqp_xfz | Thirty Seconds to Mars | none | 7877291 | https://www.ticketliquidator.com/tickets/7877291/Thirty-Seconds-To-Mars-tickets-Tue-Apr-20-2027-ZAG-Arena | - |
| tm-thirty-seconds-to-mars-2027-merksem-antwerpen-z698xzg2z1k-8asf4 | Thirty Seconds to Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-thirty-seconds-to-mars-2027-london-1agzk3agkdevn9u | Thirty Seconds to Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-thirty-seconds-to-mars-2027-manchester-1amzk3agkeyexfs | Thirty Seconds to Mars | none | 7870156 | https://www.ticketliquidator.com/tickets/7870156/Thirty-Seconds-To-Mars-tickets-Thu-Apr-29-2027-Co-Op-Live | - |
| tm-thirty-seconds-to-mars-2027-dublin-1abzk36gkeuawhf | Thirty Seconds to Mars | none | 7877303 | https://www.ticketliquidator.com/tickets/7877303/Thirty-Seconds-To-Mars-tickets-Sat-May-1-2027-3Arena-Dublin | - |
| tm-hayley-williams-2026-ciudad-de-mexico-g5dvz_1q0q4bc | Hayley Williams | none | 8072644 | https://www.ticketliquidator.com/tickets/8072644/The-Hayley-Williams-Show-tickets-Thu-Nov-26-2026-Auditorio-Nacional-Mexico | - |
| tm-hayley-williams-2027-ciudad-de-mexico-g5dvz_5u9jpc7 | Hayley Williams | none | 8072651 | https://www.ticketliquidator.com/tickets/8072651/The-Hayley-Williams-Show-tickets-Wed-Jan-13-2027-Auditorio-Nacional-Mexico | - |
| tm-hayley-williams-2027-monterrey-17azv0g65m2hkin | Hayley Williams | none | 8220574 | https://www.ticketliquidator.com/tickets/8220574/Hayley-Williams-tickets-Fri-Jan-15-2027-Auditorio-Banamex | - |
| tm-hayley-williams-2027-zapopan-17azv0g65ulwtlf | Hayley Williams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hayley-williams-2027-forest-brussels-z698xzg2z1kopjxf_ | Hayley Williams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hayley-williams-2027-glasgow-1auzkf-gkd-5zto | Hayley Williams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hayley-williams-2027-cardiff-1adbz_ogkwuumuk | Hayley Williams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blink-182-2027-milano-zg9rmiynyzefk6 | blink-182 | none | - | - | no qualifying listing (complete catalog checked) |
| tm-janet-jackson-2026-sunrise-z7r9jz1aazz43 | Janet Jackson | none | 8225038 | https://www.ticketliquidator.com/tickets/8225038/Janet-Jackson-tickets-Sat-Dec-12-2026-Amerant-Bank-Arena | - |
| tm-gorillaz-2026-san-diego-vvg1iz_ai_rrcv | Gorillaz | unverify (applied) | 7774764 | https://www.ticketliquidator.com/tickets/7774764/Gorillaz-tickets-Sun-Oct-25-2026-Pechanga-Arena-San-Diego | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-gorillaz-2026-oakland-g5vyz_allhhol | Gorillaz | none | 7774765 | https://www.ticketliquidator.com/tickets/7774765/Gorillaz-tickets-Wed-Oct-28-2026-Oakland-Arena | - |
| tm-gorillaz-2026-portland-vvg1hz_anwqdfp | Gorillaz | none | 7774766 | https://www.ticketliquidator.com/tickets/7774766/Gorillaz-tickets-Fri-Oct-30-2026-Moda-Center-at-the-Rose-Quarter | - |
| tm-gorillaz-2026-seattle-vvg1hz_aeloqv3 | Gorillaz | none | 7774767 | https://www.ticketliquidator.com/tickets/7774767/Gorillaz-tickets-Sat-Oct-31-2026-Climate-Pledge-Arena | - |
| tm-gorillaz-2026-zapopan-g5dvz_8mtgfu6 | Gorillaz | none | - | - | no qualifying listing (complete catalog checked) |
| tm-weezer-2027-dublin-17kzv0g62rlynaf | Weezer | none | - | - | no qualifying listing (complete catalog checked) |
| tm-weezer-2027-newcastle-upon-tyne-g5vhz_8kkspwo | Weezer | none | - | - | no qualifying listing (complete catalog checked) |
| tm-weezer-2027-manchester-1amzkf7gkderotz | Weezer | none | 8182169 | https://www.ticketliquidator.com/tickets/8182169/Weezer-tickets-Sat-May-15-2027-Co-Op-Live | - |
| tm-weezer-2027-leeds-g5vhz_8pmm7nv | Weezer | none | - | - | no qualifying listing (complete catalog checked) |
| tm-weezer-2027-glasgow-1auzkf7gkdxjsmu | Weezer | none | 8307719 | https://www.ticketliquidator.com/tickets/8307719/Weezer-tickets-Wed-May-19-2027-OVO-Hydro | - |
| tm-weezer-2027-birmingham-1anzkf7gkdaoymm | Weezer | none | - | - | no qualifying listing (complete catalog checked) |
| tm-weezer-2027-london-g5vhz_83wtacz | Weezer | none | 8195680 | https://www.ticketliquidator.com/tickets/8195680/Weezer-tickets-Sat-May-22-2027-Alexandra-Palace | - |
| tm-weezer-2027-cardiff-1auzkf7gkevbx3b | Weezer | none | - | - | no qualifying listing (complete catalog checked) |
| tm-weezer-2027-oslo-z698xzb_z16vpd8jgb | Weezer | none | - | - | no qualifying listing (complete catalog checked) |
| tm-weezer-2027-helsinki-z698xz8kz1ku3e4ea | Weezer | none | - | - | no qualifying listing (complete catalog checked) |
| tm-ella-langley-2026-des-moines-z7r9jz1a7pwkk | Ella Langley | none | 8071952 | https://www.ticketliquidator.com/tickets/8071952/Ella-Langley-tickets-Thu-Oct-29-2026-Caseys-Center | - |
| tm-ella-langley-2026-lincoln-vvg1bz_u6bp0me | Ella Langley | none | 8071933 | https://www.ticketliquidator.com/tickets/8071933/Ella-Langley-tickets-Fri-Oct-30-2026-Pinnacle-Bank-Arena | - |
| tm-ella-langley-2026-saint-paul-z7r9jz1a7ppo7 | Ella Langley | none | 8071934 | https://www.ticketliquidator.com/tickets/8071934/Ella-Langley-tickets-Sat-Oct-31-2026-Grand-Casino-Arena | - |
| tm-aerosmith-2026-hollywood-vvg1iz_kzl1gke | Aerosmith | none | 8311062 | https://www.ticketliquidator.com/tickets/8311062/Aerosmith-tickets-Thu-Oct-29-2026-Hollywood-Bowl | - |
| tm-aerosmith-2026-hollywood-vvg1iz_kzl5ikm | Aerosmith | none | 8311063 | https://www.ticketliquidator.com/tickets/8311063/Aerosmith-tickets-Sun-Nov-1-2026-Hollywood-Bowl | - |
| tm-mana-2026-rosemont-vv167zkuuokza2adc5 | MANA | none | 7594540 | https://www.ticketliquidator.com/tickets/7594540/Mana-tickets-Fri-Oct-30-2026-Allstate-Arena | - |
| tm-mana-2026-detroit-vv1fozbj3ezozd87v | MANA | none | 7032741 | https://www.ticketliquidator.com/tickets/7032741/Mana-tickets-Sun-Nov-1-2026-Little-Caesars-Arena | - |
| tm-mana-2026-houston-z7r9jz1a7rbk4 | MANA | none | 7594542 | https://www.ticketliquidator.com/tickets/7594542/Mana-tickets-Fri-Nov-6-2026-Toyota-Center-TX | - |
| tm-mana-2026-austin-g5dizbmoaqckm | MANA | none | 7594543 | https://www.ticketliquidator.com/tickets/7594543/Mana-tickets-Sun-Nov-8-2026-Moody-Center-ATX | - |
| tm-mana-2026-ciudad-de-mexico-17azv0g6glh8hre | MANA | none | 8178327 | https://www.ticketliquidator.com/tickets/8178327/Mana-tickets-Wed-Dec-16-2026-Estadio-GNP-Seguros-Mexico-City | - |
| tm-mana-2026-ciudad-de-mexico-17azv0g6gcz4ax4 | MANA | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jonas-brothers-2026-pittsburgh-1avbz_8gky0yxyy | Jonas Brothers | none | 8214349 | https://www.ticketliquidator.com/tickets/8214349/Jonas-Brothers-tickets-Mon-Oct-26-2026-PPG-Paints-Arena | - |
| tm-jonas-brothers-2026-milwaukee-vv17jz_8gkmhf3ll | Jonas Brothers | none | 8214350 | https://www.ticketliquidator.com/tickets/8214350/Jonas-Brothers-tickets-Sun-Nov-1-2026-Fiserv-Forum | - |
| tm-jonas-brothers-2026-saint-paul-z7r9jz1aazwba | Jonas Brothers | none | 8214351 | https://www.ticketliquidator.com/tickets/8214351/Jonas-Brothers-tickets-Mon-Nov-2-2026-Grand-Casino-Arena | - |
| tm-jonas-brothers-2026-kansas-city-vv17bz_8gkbffbsf | Jonas Brothers | none | 8214352 | https://www.ticketliquidator.com/tickets/8214352/Jonas-Brothers-tickets-Tue-Nov-3-2026-T-Mobile-Center | - |
| tm-jonas-brothers-2026-nashville-g5viz_8vksnah | Jonas Brothers | none | 8214353 | https://www.ticketliquidator.com/tickets/8214353/Jonas-Brothers-tickets-Thu-Nov-5-2026-Bridgestone-Arena | - |
| tm-jonas-brothers-2026-birmingham-1aezz_8gkmdc0pi | Jonas Brothers | none | 8220596 | https://www.ticketliquidator.com/tickets/8220596/Jonas-Brothers-tickets-Fri-Nov-6-2026-Legacy-Arena-at-The-BJCC | - |
| tm-jonas-brothers-2026-houston-z7r9jz1aavxjk | Jonas Brothers | none | 8255267 | https://www.ticketliquidator.com/tickets/8255267/Jonas-Brothers-tickets-Sun-Nov-8-2026-Toyota-Center-TX | - |
| tm-jonas-brothers-2026-oklahoma-city-vvg1yz_8mnyt3j | Jonas Brothers | none | 8214354 | https://www.ticketliquidator.com/tickets/8214354/Jonas-Brothers-tickets-Mon-Nov-9-2026-Paycom-Center | - |
| tm-jonas-brothers-2026-dallas-vvg1yz_8uftpd5 | Jonas Brothers | none | 8214355 | https://www.ticketliquidator.com/tickets/8214355/Jonas-Brothers-tickets-Tue-Nov-10-2026-American-Airlines-Center | - |
| tm-jonas-brothers-2026-austin-g5diz_8vesk58 | Jonas Brothers | none | 8214357 | https://www.ticketliquidator.com/tickets/8214357/Jonas-Brothers-tickets-Fri-Nov-13-2026-Moody-Center-ATX | - |
| tm-jonas-brothers-2026-san-antonio-g5diz_8uwwbjr | Jonas Brothers | none | 8214358 | https://www.ticketliquidator.com/tickets/8214358/Jonas-Brothers-tickets-Sat-Nov-14-2026-Frost-Bank-Center | - |
| tm-jonas-brothers-2026-palm-desert-vvg1iz_8yuodgq | Jonas Brothers | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jonas-brothers-2026-hollywood-vvg1iz_8duyuu5 | Jonas Brothers | none | 8214360 | https://www.ticketliquidator.com/tickets/8214360/Jonas-Brothers-tickets-Wed-Nov-18-2026-Hollywood-Bowl | - |
| tm-jonas-brothers-2026-hollywood-vvg1iz_o7yeh8v | Jonas Brothers | none | 8235986 | https://www.ticketliquidator.com/tickets/8235986/Jonas-Brothers-tickets-Thu-Nov-19-2026-Hollywood-Bowl | - |
| tm-jonas-brothers-2026-san-francisco-g5vyz_8sbxulz | Jonas Brothers | none | 8214362 | https://www.ticketliquidator.com/tickets/8214362/Jonas-Brothers-tickets-Sat-Nov-21-2026-Chase-Center | - |
| tm-jonas-brothers-2026-sacramento-g5vyz_8sde9yz | Jonas Brothers | none | 8214363 | https://www.ticketliquidator.com/tickets/8214363/Jonas-Brothers-tickets-Sun-Nov-22-2026-Golden-1-Center | - |
| tm-jonas-brothers-2026-glendale-1av0z_8gkmoa_ep | Jonas Brothers | none | 8214364 | https://www.ticketliquidator.com/tickets/8214364/Jonas-Brothers-tickets-Fri-Nov-27-2026-Desert-Diamond-Arena | - |
| tm-jonas-brothers-2026-las-vegas-z7r9jz1aazwb_ | Jonas Brothers | none | 8214365 | https://www.ticketliquidator.com/tickets/8214365/Jonas-Brothers-tickets-Sat-Nov-28-2026-MGM-Grand-Garden-Arena | - |
| tm-jonas-brothers-2026-san-diego-vvg1iz_8uk3mob | Jonas Brothers | none | 8214367 | https://www.ticketliquidator.com/tickets/8214367/Jonas-Brothers-tickets-Mon-Nov-30-2026-Viejas-Arena-At-Aztec-Bowl | - |
| tm-jonas-brothers-2026-anaheim-vv170z_8gkskkuxl | Jonas Brothers | none | 8214371 | https://www.ticketliquidator.com/tickets/8214371/Jonas-Brothers-tickets-Wed-Dec-2-2026-Honda-Center | - |
| tm-jonas-brothers-2026-seattle-vvg1hz_8uqqunb | Jonas Brothers | none | 8214373 | https://www.ticketliquidator.com/tickets/8214373/Jonas-Brothers-tickets-Sat-Dec-5-2026-Climate-Pledge-Arena | - |
| tm-jonas-brothers-2026-salt-lake-city-z7r9jz1aazwb9 | Jonas Brothers | none | 8214374 | https://www.ticketliquidator.com/tickets/8214374/Jonas-Brothers-tickets-Mon-Dec-7-2026-Delta-Center | - |
| tm-jonas-brothers-2026-denver-g5vzz_8u_uayk | Jonas Brothers | none | 8214376 | https://www.ticketliquidator.com/tickets/8214376/Jonas-Brothers-tickets-Wed-Dec-9-2026-Ball-Arena | - |
| tm-jonas-brothers-2026-lincoln-vv17bz_8gkmchsxu | Jonas Brothers | none | 8214378 | https://www.ticketliquidator.com/tickets/8214378/Jonas-Brothers-tickets-Thu-Dec-10-2026-Pinnacle-Bank-Arena | - |
| tm-jonas-brothers-2026-sioux-falls-vv17bz_8gkdvaovc | Jonas Brothers | none | 8214380 | https://www.ticketliquidator.com/tickets/8214380/Jonas-Brothers-tickets-Sat-Dec-12-2026-Denny-Sanford-Premier-Center | - |
| tm-jonas-brothers-2026-grand-rapids-vv17oz_8gkbyzdvo | Jonas Brothers | none | 8214382 | https://www.ticketliquidator.com/tickets/8214382/Jonas-Brothers-tickets-Tue-Dec-15-2026-Van-Andel-Arena | - |
| tm-jonas-brothers-2026-belmont-park-1adzz_8gku_lwnk | Jonas Brothers | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jonas-brothers-2026-newark-vv17fz_8gkzo23wg | Jonas Brothers | none | 8214386 | https://www.ticketliquidator.com/tickets/8214386/Jonas-Brothers-tickets-Mon-Dec-21-2026-Prudential-Center | - |
| tm-jonas-brothers-2026-newark-vv17fz_8gkzo8xsx | Jonas Brothers | none | 8235385 | https://www.ticketliquidator.com/tickets/8235385/Jonas-Brothers-tickets-Tue-Dec-22-2026-Prudential-Center | - |
| tm-brent-faiyaz-2026-chicago-vv1a7zkfwgkda-klv | Brent Faiyaz | none | 8287394 | https://www.ticketliquidator.com/tickets/8287394/Brent-Faiyaz-tickets-Mon-Nov-30-2026-United-Center | - |
| tm-brent-faiyaz-2026-brooklyn-1adzz_3gkxkyvwj | Brent Faiyaz | none | 8287393 | https://www.ticketliquidator.com/tickets/8287393/Brent-Faiyaz-tickets-Thu-Dec-3-2026-Barclays-Center | - |
| tm-brent-faiyaz-2026-los-angeles-z7r9jz1aae7ub | Brent Faiyaz | none | 8287395 | https://www.ticketliquidator.com/tickets/8287395/Brent-Faiyaz-tickets-Fri-Dec-11-2026-Cryptocom-Arena | - |
| tm-zach-bryan-2027-indianapolis-vv17fz_fgkwtxpko | Zach Bryan | none | 8322365 | https://www.ticketliquidator.com/tickets/8322365/Zach-Bryan-tickets-Sat-May-1-2027-Lucas-Oil-Stadium | - |
| tm-zach-bryan-2027-green-bay-vv17jz_fgkshdkie | Zach Bryan | none | 8322366 | https://www.ticketliquidator.com/tickets/8322366/Zach-Bryan-tickets-Tue-May-4-2027-Lambeau-Field | - |
| tm-zach-bryan-2027-east-rutherford-k7vgf_fsxrnwp | Zach Bryan | none | 8322367 | https://www.ticketliquidator.com/tickets/8322367/Zach-Bryan-tickets-Fri-May-14-2027-MetLife-Stadium | - |
| tm-zach-bryan-2027-east-rutherford-k7vgf_fs0cbhd | Zach Bryan | none | 8322368 | https://www.ticketliquidator.com/tickets/8322368/Zach-Bryan-tickets-Sat-May-15-2027-MetLife-Stadium | - |
| tm-zach-bryan-2027-philadelphia-vv17fz_fgksiy1rz | Zach Bryan | none | 8322370 | https://www.ticketliquidator.com/tickets/8322370/Zach-Bryan-tickets-Tue-May-25-2027-Lincoln-Financial-Field | - |
| tm-zach-bryan-2027-atlanta-vvg1zz_fwy55os | Zach Bryan | none | 8322371 | https://www.ticketliquidator.com/tickets/8322371/Zach-Bryan-tickets-Sat-May-29-2027-Mercedes-Benz-Stadium | - |
| tm-zach-bryan-2027-orchard-park-vv17gz_fgksis3fj | Zach Bryan | none | 8322372 | https://www.ticketliquidator.com/tickets/8322372/Zach-Bryan-tickets-Wed-Jun-2-2027-New-Highmark-Stadium | - |
| tm-zach-bryan-2027-las-vegas-1avjz_fgkwbrzg6 | Zach Bryan | none | 8322373 | https://www.ticketliquidator.com/tickets/8322373/Zach-Bryan-tickets-Fri-Jul-16-2027-Allegiant-Stadium | - |
| tm-zach-bryan-2027-inglewood-vvg1iz_frht9v6 | Zach Bryan | none | 8322374 | https://www.ticketliquidator.com/tickets/8322374/Zach-Bryan-tickets-Tue-Jul-20-2027-SoFi-Stadium | - |
| tm-zach-bryan-2027-seattle-vvg1hz_fytloed | Zach Bryan | none | 8322375 | https://www.ticketliquidator.com/tickets/8322375/Zach-Bryan-tickets-Sat-Jul-24-2027-Lumen-Field | - |
| tm-zach-bryan-2027-vancouver-1av7z_fgks885w5 | Zach Bryan | none | 8322377 | https://www.ticketliquidator.com/tickets/8322377/Zach-Bryan-tickets-Wed-Jul-28-2027-BC-Place-Stadium | - |
| tm-zach-bryan-2027-edmonton-1av7z_fgkw2fvlh | Zach Bryan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-zach-bryan-2027-boise-g5vzz_fsbnh4h | Zach Bryan | none | 8322376 | https://www.ticketliquidator.com/tickets/8322376/Zach-Bryan-tickets-Fri-Aug-6-2027-Albertsons-Stadium | - |
| tm-five-finger-death-punch-2027-helsinki-z698xz8kz16evk7gay | Five Finger Death Punch | none | 8090422 | https://www.ticketliquidator.com/tickets/8090422/Five-Finger-Death-Punch-tickets-Mon-Feb-22-2027-Veikkaus-Arena | - |
| tm-morat-2026-madrid-z698xz2qz1kv97no3 | Morat | none | - | - | no qualifying listing (complete catalog checked) |
| tm-morat-2026-madrid-z698xz2qz16vao-oox | Morat | none | - | - | no qualifying listing (complete catalog checked) |
| tm-morat-2026-madrid-z698xz2qz16v0v0ypz | Morat | none | - | - | no qualifying listing (complete catalog checked) |
| tm-michelle-branch-2027-toronto-1a8zk4kgkdkp6j5 | Michelle Branch | none | - | - | no qualifying listing (complete catalog checked) |
| tm-michelle-branch-2027-toronto-1a8zk4kgkdkj6jq | Michelle Branch | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sylvan-esso-2027-dublin-1avoz_fgkugispy | Sylvan Esso | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sylvan-esso-2027-manchester-g5vhz_fudi7pq | Sylvan Esso | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sylvan-esso-2027-london-g5dzz_fua9vy_ | Sylvan Esso | none | - | - | no qualifying listing (complete catalog checked) |
| tm-alan-walker-2027-montreal-1aszkfngkely6-x | Alan Walker | none | 8325265 | https://www.ticketliquidator.com/tickets/8325265/Alan-Walker-tickets-Wed-Feb-17-2027-MTelus | - |
| tm-the-lemonheads-2027-roseville-z7r9jz1aavy-u | The Lemonheads | none | 8266222 | https://www.ticketliquidator.com/tickets/8266222/The-Lemonheads-tickets-Fri-Mar-5-2027-Goldfield-Trading-Post-Roseville | - |
| tm-the-lemonheads-2027-portland-z7r9jz1aavv7i | The Lemonheads | none | 8266225 | https://www.ticketliquidator.com/tickets/8266225/The-Lemonheads-tickets-Wed-Mar-10-2027-Hawthorne-Theatre | - |
| tm-haiden-henderson-2027-portland-z7r9jz1aaeekk | Haiden Henderson | none | 8284338 | https://www.ticketliquidator.com/tickets/8284338/Haiden-Henderson-tickets-Wed-May-12-2027-Hawthorne-Lounge-at-Hawthorne-Theatre | - |
| tm-fantasia-2027-houston-z7r9jz1aa74o6 | Fantasia | none | 8297853 | https://www.ticketliquidator.com/tickets/8297853/The-Love-of-Soul-Tour-tickets-Fri-Mar-12-2027-Toyota-Center-TX | - |
| tm-greta-van-fleet-2027-glasgow-1auzkfugkd_hipm | Greta Van Fleet | add (applied) | 8341908 | https://www.ticketliquidator.com/tickets/8341908/Greta-Van-Fleet-tickets-Wed-Jun-2-2027-OVO-Hydro | - |
| tm-fontaines-d-c-2026-manchester-g5vhz_okyh0m1 | Fontaines D.C. | none | 8243932 | https://www.ticketliquidator.com/tickets/8243932/Fontaines-DC-tickets-Sat-Nov-21-2026-AO-Arena | - |
| tm-fontaines-d-c-2026-glasgow-1adbz_8gkucuwyw | Fontaines D.C. | none | 8243933 | https://www.ticketliquidator.com/tickets/8243933/Fontaines-DC-tickets-Sun-Nov-22-2026-OVO-Hydro | - |
| tm-fontaines-d-c-2027-nashville-z7r9jz1aa7vxe | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hazlett-2027-oslo-z698xzb_z16v-jveop | Hazlett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-def-leppard-2027-minneapolis-z7r9jz1aa7eoa | Def Leppard | none | 8312068 | https://www.ticketliquidator.com/tickets/8312068/Def-Leppard-tickets-Sat-Mar-27-2027-Target-Center | - |
| tm-def-leppard-2027-salt-lake-city-z7r9jz1aa7eo3 | Def Leppard | none | 8312070 | https://www.ticketliquidator.com/tickets/8312070/Def-Leppard-tickets-Wed-Mar-31-2027-Delta-Center | - |
| tm-def-leppard-2027-kansas-city-z7r9jz1aa7eof | Def Leppard | none | 8312077 | https://www.ticketliquidator.com/tickets/8312077/Def-Leppard-tickets-Mon-Apr-26-2027-T-Mobile-Center | - |
| tm-def-leppard-2027-spokane-z7r9jz1aa7eoo | Def Leppard | none | 8312083 | https://www.ticketliquidator.com/tickets/8312083/Def-Leppard-tickets-Tue-May-11-2027-Numerica-Veterans-Arena | - |
| tm-def-leppard-2027-houston-z7r9jz1aa7eob | Def Leppard | none | 8312085 | https://www.ticketliquidator.com/tickets/8312085/Def-Leppard-tickets-Tue-Jun-1-2027-Toyota-Center-TX | - |
| tm-def-leppard-2027-cleveland-z7r9jz1aa7eo8 | Def Leppard | none | 8312094 | https://www.ticketliquidator.com/tickets/8312094/Def-Leppard-tickets-Mon-Jun-21-2027-Rocket-Arena | - |
| tm-nickelback-2027-cleveland-z7r9jz1aa774f | Nickelback | none | 8314933 | https://www.ticketliquidator.com/tickets/8314933/Nickelback-tickets-Fri-Feb-12-2027-Rocket-Arena | - |
| tm-nickelback-2027-saint-paul-z7r9jz1aa774k | Nickelback | none | 8314949 | https://www.ticketliquidator.com/tickets/8314949/Nickelback-tickets-Tue-Mar-30-2027-Grand-Casino-Arena | - |
| tm-nickelback-2027-las-vegas-z7r9jz1aa7746 | Nickelback | none | 8314953 | https://www.ticketliquidator.com/tickets/8314953/Nickelback-tickets-Fri-Apr-16-2027-T-Mobile-Arena | - |
| tm-nickelback-2027-salt-lake-city-z7r9jz1aa774a | Nickelback | none | 8314957 | https://www.ticketliquidator.com/tickets/8314957/Nickelback-tickets-Thu-Apr-22-2027-Delta-Center | - |
| tm-nickelback-2027-houston-z7r9jz1aa774o | Nickelback | none | 8314960 | https://www.ticketliquidator.com/tickets/8314960/Nickelback-tickets-Thu-Apr-29-2027-Toyota-Center-TX | - |
| tm-nickelback-2027-london-1agzk46gkddli7z | Nickelback | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2027-jacksonville-z7r9jz1aa7a4e | Mico | none | 8315358 | https://www.ticketliquidator.com/tickets/8315358/Mico-tickets-Tue-Feb-23-2027-FIVE | - |
| tm-mico-2027-lawrence-z7r9jz1aa7a_g | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mei-semones-2027-los-angeles-z7r9jz1aa7e-9 | Mei Semones | none | 8297664 | https://www.ticketliquidator.com/tickets/8297664/Mei-Semones-tickets-Fri-Apr-23-2027-The-Fonda-Theatre | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zwf9 | John Mayer | none | 8319987 | https://www.ticketliquidator.com/tickets/8319987/John-Mayer-tickets-Wed-Jun-9-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7yuf_ | John Mayer | none | 8319986 | https://www.ticketliquidator.com/tickets/8319986/John-Mayer-tickets-Fri-Jun-11-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7yufh | John Mayer | none | 8319985 | https://www.ticketliquidator.com/tickets/8319985/John-Mayer-tickets-Sat-Jun-12-2027-Sphere | - |
| tm-backstreet-boys-2027-toronto-1a8zk4agkeehx1f | Backstreet Boys | none | - | - | no qualifying listing (complete catalog checked) |
| tm-leon-bridges-2027-saint-augustine-z7r9jz1aa7dqk | Leon Bridges | none | - | - | no qualifying listing (complete catalog checked) |
| tm-leon-bridges-2027-morrison-z7r9jz1aa7dvk | Leon Bridges | none | 8313527 | https://www.ticketliquidator.com/tickets/8313527/Leon-Bridges-tickets-Tue-Aug-3-2027-Red-Rocks-Amphitheatre | - |
| tm-leon-bridges-2027-vancouver-z7r9jz1aa7dr6 | Leon Bridges | none | 8313686 | https://www.ticketliquidator.com/tickets/8313686/Leon-Bridges-tickets-Sat-Aug-14-2027-Freedom-Mobile-Arch | - |
| tm-leon-bridges-2027-columbus-z7r9jz1aa7dpa | Leon Bridges | none | 8313684 | https://www.ticketliquidator.com/tickets/8313684/Leon-Bridges-tickets-Tue-Sep-14-2027-KEMBA-Live | - |
| tm-leon-bridges-2027-nashville-z7r9jz1aa7dqd | Leon Bridges | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-dublin-1kkzvpcfga1_k0w | Rod Stewart | none | 8307232 | https://www.ticketliquidator.com/tickets/8307232/Rod-Stewart-tickets-Fri-Apr-23-2027-3Arena-Dublin | - |
| tm-rod-stewart-2027-belfast-1azzkfugkd15ooi | Rod Stewart | none | 8326046 | https://www.ticketliquidator.com/tickets/8326046/Rod-Stewart-tickets-Tue-Apr-27-2027-The-O2-Belfast | - |
| tm-rod-stewart-2027-glasgow-1auzkfmgkehwkob | Rod Stewart | none | 8299954 | https://www.ticketliquidator.com/tickets/8299954/Rod-Stewart-tickets-Thu-Apr-29-2027-OVO-Hydro | - |
| tm-ye-2026-houston-g5diz_osqzjfe | Ye | none | 8244550 | https://www.ticketliquidator.com/tickets/8244550/Kanye-West-tickets-Sat-Oct-31-2026-Reliant-Stadium | - |
| tm-ye-2026-arlington-z7r9jz1aav0vv | Ye | none | 8245565 | https://www.ticketliquidator.com/tickets/8245565/Kanye-West-tickets-Sat-Nov-7-2026-ATT-Stadium | - |
| tm-ye-2026-glendale-z7r9jz1aav08u | Ye | none | 8244532 | https://www.ticketliquidator.com/tickets/8244532/Kanye-West-tickets-Sat-Nov-21-2026-State-Farm-Stadium | - |
| tm-brand-new-2026-independence-vvg1bz_uefy4ji | Brand New | none | 8062597 | https://www.ticketliquidator.com/tickets/8062597/Brand-New-tickets-Wed-Oct-28-2026-Cable-Dahmer-Arena | - |
| tm-brand-new-2026-grand-prairie-z7r9jz1a7pijy | Brand New | none | 8062598 | https://www.ticketliquidator.com/tickets/8062598/Brand-New-tickets-Fri-Oct-30-2026-Texas-Trust-CU-Theatre-at-Grand-Prairie | - |
| tm-brand-new-2026-denver-z7r9jz1a7ptjo | Brand New | none | 8062599 | https://www.ticketliquidator.com/tickets/8062599/Brand-New-tickets-Mon-Nov-2-2026-The-Mission-Ballroom | - |
| tm-brand-new-2026-las-vegas-z7r9jz1a7jdfs | Brand New | none | 8062600 | https://www.ticketliquidator.com/tickets/8062600/Brand-New-tickets-Fri-Nov-6-2026-The-Theater-at-Virgin-Hotels-Las-Vegas | - |
| tm-brand-new-2026-anaheim-vvg10z_ueuvpcr | Brand New | none | 8062601 | https://www.ticketliquidator.com/tickets/8062601/Brand-New-tickets-Sat-Nov-7-2026-Honda-Center | - |
| tm-brand-new-2026-san-francisco-g5vyz_ghzwhnz | Brand New | none | 8062602 | https://www.ticketliquidator.com/tickets/8062602/Brand-New-tickets-Wed-Nov-11-2026-Bill-Graham-Civic-Auditorium | - |
| tm-brand-new-2026-phoenix-17k8v0g6gh6bhfj | Brand New | none | 8062603 | https://www.ticketliquidator.com/tickets/8062603/Brand-New-tickets-Sat-Nov-14-2026-Arizona-Financial-Theatre | - |
| tm-kacey-musgraves-2026-seattle-vvg1hz_al3e8eo | Kacey Musgraves | none | 7919153 | https://www.ticketliquidator.com/tickets/7919153/Kacey-Musgraves-tickets-Mon-Oct-26-2026-Climate-Pledge-Arena | - |
| tm-kacey-musgraves-2026-seattle-vvg1hz_awrtnmb | Kacey Musgraves | none | 7919155 | https://www.ticketliquidator.com/tickets/7919155/Kacey-Musgraves-tickets-Tue-Oct-27-2026-Climate-Pledge-Arena | - |
| tm-kacey-musgraves-2027-glasgow-1adbz_agkdqknt2 | Kacey Musgraves | none | 7964274 | https://www.ticketliquidator.com/tickets/7964274/Kacey-Musgraves-tickets-Mon-Feb-22-2027-OVO-Hydro | - |
| tm-kacey-musgraves-2027-manchester-g5vhz_gkaityt | Kacey Musgraves | none | 7964277 | https://www.ticketliquidator.com/tickets/7964277/Kacey-Musgraves-tickets-Wed-Feb-24-2027-AO-Arena | - |
| tm-kacey-musgraves-2027-london-1adjz_agkmwrf6s | Kacey Musgraves | none | 7964279 | https://www.ticketliquidator.com/tickets/7964279/Kacey-Musgraves-tickets-Fri-Feb-26-2027-OVO-Arena-Wembley | - |
| tm-knocked-loose-2026-mesa-z7r9jz1a70yjo | Knocked Loose | none | 8023375 | https://www.ticketliquidator.com/tickets/8023375/Knocked-Loose-tickets-Tue-Oct-27-2026-Mesa-Amphitheatre | - |
| tm-knocked-loose-2026-los-angeles-z7r9jz1a70yjs | Knocked Loose | none | 8003134 | https://www.ticketliquidator.com/tickets/8003134/Knocked-Loose-tickets-Thu-Oct-29-2026-Shrine-LA-Outdoors | - |
| tm-knocked-loose-2026-san-diego-vvg1iz_5_l1ogs | Knocked Loose | none | 8002991 | https://www.ticketliquidator.com/tickets/8002991/Knocked-Loose-tickets-Fri-Oct-30-2026-Gallagher-Square-at-Petco-Park | - |
| tm-knocked-loose-2026-daly-city-g5vyz_5mdvnwz | Knocked Loose | none | - | - | no qualifying listing (complete catalog checked) |
| tm-knocked-loose-2026-salt-lake-city-g5vzz_53unjyf | Knocked Loose | none | 8002987 | https://www.ticketliquidator.com/tickets/8002987/Knocked-Loose-tickets-Mon-Nov-2-2026-The-Union-Event-Center | - |
| tm-knocked-loose-2026-denver-g5vzz_5nhwfmo | Knocked Loose | none | - | - | no qualifying listing (complete catalog checked) |
| tm-knocked-loose-2026-austin-g5diz_5qpgquo | Knocked Loose | none | 8002990 | https://www.ticketliquidator.com/tickets/8002990/Knocked-Loose-tickets-Thu-Nov-5-2026-Moody-Amphitheater | - |
| tm-chris-stapleton-2026-lincoln-vv1akzk8pgkdqln9v | Chris Stapleton | none | 7668749 | https://www.ticketliquidator.com/tickets/7668749/Chris-Stapletons-All-American-Road-Show-tickets-Mon-Oct-26-2026-Pinnacle-Bank-Arena | - |
| tm-chris-stapleton-2026-nashville-g5viz_kleeols | Chris Stapleton | none | - | - | no qualifying listing (complete catalog checked) |
| tm-phoebe-bridgers-2026-san-francisco-g5vyz_5ehic8t | Phoebe Bridgers | none | 8028491 | https://www.ticketliquidator.com/tickets/8028491/Phoebe-Bridgers-tickets-Tue-Oct-27-2026-Chase-Center | - |
| tm-phoebe-bridgers-2026-san-francisco-g5vyz_gpqjtlc | Phoebe Bridgers | none | 8034548 | https://www.ticketliquidator.com/tickets/8034548/Phoebe-Bridgers-tickets-Wed-Oct-28-2026-Chase-Center | - |
| tm-phoebe-bridgers-2026-inglewood-vvg10z_5eplbfx | Phoebe Bridgers | none | 8028492 | https://www.ticketliquidator.com/tickets/8028492/Phoebe-Bridgers-tickets-Fri-Oct-30-2026-Intuit-Dome | - |
| tm-phoebe-bridgers-2026-inglewood-vvg10z_goubfs2 | Phoebe Bridgers | none | 8028493 | https://www.ticketliquidator.com/tickets/8028493/Phoebe-Bridgers-tickets-Sat-Oct-31-2026-Intuit-Dome | - |
| tm-phoebe-bridgers-2026-inglewood-vvg10z_gomyvhe | Phoebe Bridgers | none | 8034546 | https://www.ticketliquidator.com/tickets/8034546/Phoebe-Bridgers-tickets-Sun-Nov-1-2026-Intuit-Dome | - |
| tm-phoebe-bridgers-2026-dublin-17kzv0g65ra4cgv | Phoebe Bridgers | none | 8134619 | https://www.ticketliquidator.com/tickets/8134619/Phoebe-Bridgers-tickets-Mon-Nov-23-2026-3Arena-Dublin | - |
| tm-phoebe-bridgers-2026-dublin-17kzv0g65ra4mgk | Phoebe Bridgers | none | 8329498 | https://www.ticketliquidator.com/tickets/8329498/Phoebe-Bridgers-tickets-Tue-Nov-24-2026-3Arena-Dublin | - |
| tm-phoebe-bridgers-2026-manchester-17uyv0g6gcqzprx | Phoebe Bridgers | none | 8028496 | https://www.ticketliquidator.com/tickets/8028496/Phoebe-Bridgers-tickets-Thu-Nov-26-2026-Co-Op-Live | - |
| tm-phoebe-bridgers-2026-glasgow-17uov0g6gor33_x | Phoebe Bridgers | none | 8090638 | https://www.ticketliquidator.com/tickets/8090638/Phoebe-Bridgers-tickets-Fri-Nov-27-2026-OVO-Hydro | - |
| tm-phoebe-bridgers-2026-birmingham-17fyv0g6g2_ps5a | Phoebe Bridgers | none | 8090634 | https://www.ticketliquidator.com/tickets/8090634/Phoebe-Bridgers-tickets-Sat-Nov-28-2026-bp-pulse-LIVE | - |
| tm-phoebe-bridgers-2026-london-17u8v0g6gpqo1c- | Phoebe Bridgers | none | - | - | no qualifying listing (complete catalog checked) |
| tm-phoebe-bridgers-2026-london-17u8v0g6gnyjt5y | Phoebe Bridgers | none | - | - | no qualifying listing (complete catalog checked) |
| tm-phoebe-bridgers-2026-forest-brussels-z698xzg2z16ezpgzqe | Phoebe Bridgers | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryson-tiller-2026-inglewood-vvg10z_5eio1ci | Bryson Tiller | unverify (applied) | 8011577 | https://www.ticketliquidator.com/tickets/8011577/Bryson-Tiller-tickets-Sun-Oct-25-2026-Intuit-Dome | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-bryson-tiller-2026-concord-g5vyz_5ix0y73 | Bryson Tiller | none | 8011579 | https://www.ticketliquidator.com/tickets/8011579/Bryson-Tiller-tickets-Tue-Oct-27-2026-Toyota-Pavilion-At-Concord | - |
| tm-bryson-tiller-2026-portland-vvg1hz_5po9bdo | Bryson Tiller | none | 8011580 | https://www.ticketliquidator.com/tickets/8011580/Bryson-Tiller-tickets-Thu-Oct-29-2026-Portland-Veterans-Memorial-Coliseum | - |
| tm-bryson-tiller-2026-vancouver-1778v0g65sqi5ae | Bryson Tiller | none | 8011583 | https://www.ticketliquidator.com/tickets/8011583/Bryson-Tiller-tickets-Fri-Oct-30-2026-Rogers-Arena | - |
| tm-bryson-tiller-2026-seattle-vvg1hz_5llgxaj | Bryson Tiller | none | 8011581 | https://www.ticketliquidator.com/tickets/8011581/Bryson-Tiller-tickets-Sun-Nov-1-2026-Climate-Pledge-Arena | - |
| tm-bryson-tiller-2026-zurich-z698xzu3z16v7d03_k | Bryson Tiller | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryson-tiller-2026-amsterdam-z698xzbpz1kevfzpk | Bryson Tiller | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryson-tiller-2026-dusseldorf-z698xzc2z16vojuk_e | Bryson Tiller | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryson-tiller-2026-forest-brussels-z698xzg2z1kq6a0r6 | Bryson Tiller | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryson-tiller-2026-dublin-17kzv0g659_puvu | Bryson Tiller | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryson-tiller-2026-manchester-17uyv0g65whosmd | Bryson Tiller | none | 8090585 | https://www.ticketliquidator.com/tickets/8090585/Bryson-Tiller-tickets-Thu-Dec-3-2026-Co-Op-Live | - |
| tm-bryson-tiller-2026-leeds-g5vhz_5siv57- | Bryson Tiller | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryson-tiller-2026-cardiff-17uov0g65m7upzx | Bryson Tiller | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryson-tiller-2026-london-17u8v0g6gkcb7og | Bryson Tiller | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryson-tiller-2026-birmingham-17fyv0g65u9_ewp | Bryson Tiller | none | 8090582 | https://www.ticketliquidator.com/tickets/8090582/Bryson-Tiller-tickets-Wed-Dec-9-2026-bp-pulse-LIVE | - |
| tm-bryson-tiller-2027-linlithgow-ave-177yv0g65m3hnkk | Bryson Tiller | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryson-tiller-2027-auckland-17azv0g65qclfnt | Bryson Tiller | none | 8173262 | https://www.ticketliquidator.com/tickets/8173262/Bryson-Tiller-tickets-Wed-Jan-27-2027-Spark-Arena | - |
| tm-arcangel-2026-boston-vvg17z_1mzt4ek | Arcangel | none | 7977638 | https://www.ticketliquidator.com/tickets/7977638/Arcangel-tickets-Wed-Oct-28-2026-MGM-Music-Hall-at-Fenway-Park | - |
| tm-arcangel-2026-rosemont-vvg18z_1u8np3l | Arcangel | none | 7997047 | https://www.ticketliquidator.com/tickets/7997047/Arcangel-tickets-Sat-Oct-31-2026-Rosemont-Theatre | - |
| tm-arcangel-2026-houston-g5diz_53je_pf | Arcangel | none | 7997050 | https://www.ticketliquidator.com/tickets/7997050/Arcangel-tickets-Thu-Nov-5-2026-713-Music-Hall | - |
| tm-arcangel-2026-irving-vvg1yz_5kyqgxt | Arcangel | none | 7997053 | https://www.ticketliquidator.com/tickets/7997053/Arcangel-tickets-Fri-Nov-6-2026-The-Pavilion-at-Toyota-Music-Factory | - |
| tm-arcangel-2026-denver-g5vzz_1bwrqu_ | Arcangel | none | 7997054 | https://www.ticketliquidator.com/tickets/7997054/Arcangel-tickets-Sun-Nov-15-2026-Paramount-Theatre-Denver | - |
| tm-arcangel-2026-salt-lake-city-g5vzz_5343iam | Arcangel | none | 7997055 | https://www.ticketliquidator.com/tickets/7997055/Arcangel-tickets-Wed-Nov-18-2026-The-Union-Event-Center | - |
| tm-arcangel-2026-inglewood-vvg1iz_1r3weok | Arcangel | none | 7997056 | https://www.ticketliquidator.com/tickets/7997056/Arcangel-tickets-Fri-Nov-20-2026-YouTube-Theater-at-Hollywood-Park | - |
| tm-arcangel-2026-san-jose-g5vyz_1s5ejmh | Arcangel | none | 7997057 | https://www.ticketliquidator.com/tickets/7997057/Arcangel-tickets-Sat-Nov-21-2026-San-Jose-Civic | - |
| tm-garth-brooks-2026-seattle-vvg1hz_fstanbp | Garth Brooks | none | 8321626 | https://www.ticketliquidator.com/tickets/8321626/Garth-Brooks-tickets-Fri-Nov-13-2026-Climate-Pledge-Arena | - |
| tm-garth-brooks-2026-seattle-vvg1hz_fghqxgl | Garth Brooks | none | 8321627 | https://www.ticketliquidator.com/tickets/8321627/Garth-Brooks-tickets-Sat-Nov-14-2026-Climate-Pledge-Arena | - |
| tm-saint-levant-2027-glasgow-1adbz_fgkb_vncq | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2027-manchester-g5dzz_fbnzksb | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2027-london-1auzk48gkdxoa9q | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2027-ciudad-de-mexico-g5dvz_o3qzslc | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-morat-2026-madrid-z698xz2qz16vqfvsuz | Morat | none | 7823355 | https://www.ticketliquidator.com/tickets/7823355/Morat-tickets-Sat-Oct-31-2026-Movistar-Arena-Madrid | - |
| tm-the-lemonheads-2027-seattle-z7r9jz1aa79u7 | The Lemonheads | none | 8266226 | https://www.ticketliquidator.com/tickets/8266226/The-Lemonheads-tickets-Thu-Mar-11-2027-El-Corazon | - |
| tm-haiden-henderson-2027-seattle-z7r9jz1aa79uf | Haiden Henderson | none | 8289676 | https://www.ticketliquidator.com/tickets/8289676/Haiden-Henderson-tickets-Tue-May-11-2027-El-Corazon | - |
| tm-yacht-rock-revue-2027-athens-z7r9jz1aa7oam | Yacht Rock Revue | none | 8310576 | https://www.ticketliquidator.com/tickets/8310576/Yacht-Rock-Revue-tickets-Fri-Feb-26-2027-Georgia-Theatre | - |
| tm-backstreet-boys-2026-las-vegas-17ayv0g62thvzyn | Backstreet Boys | none | 8330023 | https://www.ticketliquidator.com/tickets/8330023/Backstreet-Boys-tickets-Tue-Dec-29-2026-Sphere | - |
| tm-elevation-worship-2027-spokane-z7r9jz1aavwus | Elevation Worship | none | 8272430 | https://www.ticketliquidator.com/tickets/8272430/Elevation-Worship-tickets-Thu-Feb-25-2027-Numerica-Veterans-Arena | - |
| tm-elevation-worship-2027-tacoma-vvg1hz_35ckwg5 | Elevation Worship | none | 8264722 | https://www.ticketliquidator.com/tickets/8264722/Elevation-Worship-tickets-Fri-Feb-26-2027-Tacoma-Dome | - |
| tm-elevation-worship-2027-sacramento-g5vyz_38zvlqx | Elevation Worship | none | 8264723 | https://www.ticketliquidator.com/tickets/8264723/Elevation-Worship-tickets-Mon-Mar-1-2027-Golden-1-Center | - |
| tm-elevation-worship-2027-oakland-g5vyz_3npydie | Elevation Worship | none | 8264724 | https://www.ticketliquidator.com/tickets/8264724/Elevation-Worship-tickets-Tue-Mar-2-2027-Oakland-Arena | - |
| tm-elevation-worship-2027-anaheim-vv16azkfivpza5vug5 | Elevation Worship | none | 8264725 | https://www.ticketliquidator.com/tickets/8264725/Elevation-Worship-tickets-Wed-Mar-3-2027-Honda-Center | - |
| tm-elevation-worship-2027-san-diego-vvg1iz_37k-njg | Elevation Worship | none | 8264726 | https://www.ticketliquidator.com/tickets/8264726/Elevation-Worship-tickets-Fri-Mar-5-2027-Viejas-Arena-At-Aztec-Bowl | - |
| tm-elevation-worship-2027-phoenix-1a_zkf0gkdcjit6 | Elevation Worship | none | 8264727 | https://www.ticketliquidator.com/tickets/8264727/Elevation-Worship-tickets-Sat-Mar-6-2027-Mortgage-Matchup-Center | - |
| tm-elevation-worship-2027-inglewood-vv1aazkfigkdewunn | Elevation Worship | none | 8264728 | https://www.ticketliquidator.com/tickets/8264728/Elevation-Worship-tickets-Sun-Mar-7-2027-The-Kia-Forum | - |
| tm-stevie-wonder-2026-amsterdam-z698xzbpz16vcpofak | Stevie Wonder | none | 8252672 | https://www.ticketliquidator.com/tickets/8252672/Stevie-Wonder-tickets-Wed-Oct-28-2026-Ziggo-Dome | - |
| tm-stevie-wonder-2026-dublin-1avoz_ogkmfynew | Stevie Wonder | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stevie-wonder-2026-london-1adfz_ogkluzbfe | Stevie Wonder | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stevie-wonder-2026-london-1adfz_ogkwbmppe | Stevie Wonder | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stevie-wonder-2026-manchester-1adjz_ogklby6m_ | Stevie Wonder | none | 8252674 | https://www.ticketliquidator.com/tickets/8252674/Stevie-Wonder-tickets-Sun-Nov-8-2026-Co-Op-Live | - |
| tm-stevie-wonder-2026-glasgow-1adbz_ogkw2mz1l | Stevie Wonder | none | 8252675 | https://www.ticketliquidator.com/tickets/8252675/Stevie-Wonder-tickets-Wed-Nov-11-2026-OVO-Hydro | - |
| tm-stevie-wonder-2026-new-york-g5diz_gpossvv | Stevie Wonder | none | 8252655 | https://www.ticketliquidator.com/tickets/8252655/Stevie-Wonder-tickets-Thu-Nov-19-2026-Madison-Square-Garden | - |
| tm-stevie-wonder-2026-chicago-vv1a7zkfngkd8ke_p | Stevie Wonder | none | 8252656 | https://www.ticketliquidator.com/tickets/8252656/Stevie-Wonder-tickets-Sat-Nov-21-2026-United-Center | - |
| tm-stevie-wonder-2026-washington-1a4zkfxgkdptcca | Stevie Wonder | none | 8252657 | https://www.ticketliquidator.com/tickets/8252657/Stevie-Wonder-tickets-Mon-Nov-23-2026-Capital-One-Arena | - |
| tm-stevie-wonder-2026-detroit-vv1kezvpa-gaukuph | Stevie Wonder | none | 8252658 | https://www.ticketliquidator.com/tickets/8252658/Stevie-Wonder-tickets-Tue-Dec-8-2026-Fox-Theatre-Detroit | - |
| tm-stevie-wonder-2026-detroit-vv1koz_3bxg7sqna | Stevie Wonder | none | 8252659 | https://www.ticketliquidator.com/tickets/8252659/Stevie-Wonder-tickets-Wed-Dec-9-2026-Fox-Theatre-Detroit | - |
| tm-stevie-wonder-2026-inglewood-vv1aazkf0onvvzeug | Stevie Wonder | none | 8252660 | https://www.ticketliquidator.com/tickets/8252660/Stevie-Wonder-tickets-Sat-Dec-19-2026-Intuit-Dome | - |
| tm-lil-wayne-2026-lexington-1avbz_kgkyr04kw | Lil Wayne | none | 7810684 | https://www.ticketliquidator.com/tickets/7810684/Lil-Wayne-tickets-Fri-Dec-4-2026-Rupp-Arena-At-Central-Bank-Center | - |
| tm-lil-wayne-2026-savannah-vvg1zz_3n_vz4w | Lil Wayne | none | 8307423 | https://www.ticketliquidator.com/tickets/8307423/Lil-Wayne-tickets-Sat-Dec-5-2026-Enmarket-Arena | - |
| tm-lil-wayne-2027-reading-vv17fz_kgkwwyiai | Lil Wayne | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tom-jones-2026-los-angeles-vvg10z_58xadko | Tom Jones | unverify (applied) | 7997398 | https://www.ticketliquidator.com/tickets/7997398/Tom-Jones-tickets-Mon-Oct-26-2026-Greek-Theatre-Los-Angeles-CA | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-tom-jones-2026-san-diego-vvg1iz_5gqcfyd | Tom Jones | unverify (applied) | 7997399 | https://www.ticketliquidator.com/tickets/7997399/Tom-Jones-tickets-Tue-Oct-27-2026-The-Rady-Shell-at-Jacobs-Park | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-tom-jones-2026-highland-z7r9jz1a7p6r4 | Tom Jones | none | 8003601 | https://www.ticketliquidator.com/tickets/8003601/Tom-Jones-tickets-Thu-Oct-29-2026-Yaamava-Theater-at-Yaamava-Resort-Casino | - |
| tm-tom-jones-2026-wheatland-g5vyz_1uw3ukc | Tom Jones | none | 7997400 | https://www.ticketliquidator.com/tickets/7997400/Tom-Jones-tickets-Sat-Oct-31-2026-Hard-Rock-Live-Sacramento | - |
| tm-tom-jones-2026-san-francisco-g5vyz_5d9skqu | Tom Jones | none | 7997401 | https://www.ticketliquidator.com/tickets/7997401/Tom-Jones-tickets-Sun-Nov-1-2026-The-Masonic-San-Francisco | - |
| tm-a-boogie-wit-da-hoodie-2026-belmont-park-1adzz_8gkuljdyg | A Boogie Wit Da Hoodie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-boogie-wit-da-hoodie-2026-belmont-park-17gzv0g6ctu4ij2 | A Boogie Wit Da Hoodie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-boogie-wit-da-hoodie-2026-boston-vv1a8vpgbgaumyrw | A Boogie Wit Da Hoodie | none | 8298499 | https://www.ticketliquidator.com/tickets/8298499/A-Boogie-Wit-Da-Hoodie-tickets-Fri-Nov-6-2026-Agganis-Arena | - |
| tm-a-boogie-wit-da-hoodie-2026-boston-vv1a8vpgbgauu_ra | A Boogie Wit Da Hoodie | none | 8293621 | https://www.ticketliquidator.com/tickets/8293621/A-Boogie-Wit-Da-Hoodie-tickets-Sat-Nov-7-2026-Agganis-Arena | - |
| tm-a-boogie-wit-da-hoodie-2026-philadelphia-vv1aezkfygkeinqmd | A Boogie Wit Da Hoodie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-boogie-wit-da-hoodie-2026-philadelphia-vv1aezkfygkecacwb | A Boogie Wit Da Hoodie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-boogie-wit-da-hoodie-2026-toronto-168zkfspyzauf8v5 | A Boogie Wit Da Hoodie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-boogie-wit-da-hoodie-2026-orlando-z7r9jz1aaef4e | A Boogie Wit Da Hoodie | none | 8293991 | https://www.ticketliquidator.com/tickets/8293991/A-Boogie-Wit-Da-Hoodie-tickets-Sat-Dec-5-2026-Orlando-Amphitheater-at-Central-Florida-Fairgrounds | - |
| tm-a-boogie-wit-da-hoodie-2026-minneapolis-vv1akzkfygkd_ao6r | A Boogie Wit Da Hoodie | none | 8294956 | https://www.ticketliquidator.com/tickets/8294956/A-Boogie-Wit-Da-Hoodie-tickets-Sat-Dec-12-2026-The-Armory-Minneapolis | - |
| tm-a-boogie-wit-da-hoodie-2026-hartford-z7r9jz1aaea_k | A Boogie Wit Da Hoodie | none | 8293968 | https://www.ticketliquidator.com/tickets/8293968/A-Boogie-Wit-Da-Hoodie-tickets-Sat-Dec-19-2026-PeoplesBank-Arena | - |
| tm-zach-top-2026-duluth-vvg1zz_5pbvq93 | Zach Top | none | 8026607 | https://www.ticketliquidator.com/tickets/8026607/Zach-Top-tickets-Thu-Oct-29-2026-Gas-South-Arena | - |
| tm-zach-top-2026-nashville-g5viz_g6sznnj | Zach Top | none | 8026602 | https://www.ticketliquidator.com/tickets/8026602/Zach-Top-tickets-Fri-Oct-30-2026-Bridgestone-Arena | - |
| tm-sienna-spiro-2027-austin-g5diz_47ytekn | Sienna Spiro | none | 8332299 | https://www.ticketliquidator.com/tickets/8332299/Sienna-Spiro-tickets-Thu-Aug-5-2027-Moody-Amphitheater | - |
| tm-sienna-spiro-2027-washington-1avfz_fgksa-bdm | Sienna Spiro | none | 8332313 | https://www.ticketliquidator.com/tickets/8332313/Sienna-Spiro-tickets-Thu-Aug-12-2027-The-Anthem-DC | - |
| tm-sienna-spiro-2027-philadelphia-vv17fz_fgkuhzdr4 | Sienna Spiro | none | 8332317 | https://www.ticketliquidator.com/tickets/8332317/Sienna-Spiro-tickets-Sat-Aug-14-2027-The-Met-Presented-by-Highmark | - |
| tm-sienna-spiro-2027-boston-vv177z_fgkd_e0km | Sienna Spiro | none | 8332320 | https://www.ticketliquidator.com/tickets/8332320/Sienna-Spiro-tickets-Sun-Aug-15-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-sienna-spiro-2027-new-york-g5dyz_46da3nv | Sienna Spiro | none | 8332325 | https://www.ticketliquidator.com/tickets/8332325/Sienna-Spiro-tickets-Tue-Aug-17-2027-Radio-City-Music-Hall | - |
| tm-sienna-spiro-2027-detroit-vv1afzk48gkebo40x | Sienna Spiro | none | 8332344 | https://www.ticketliquidator.com/tickets/8332344/Sienna-Spiro-tickets-Mon-Aug-23-2027-Fox-Theatre-Detroit | - |
| tm-sienna-spiro-2027-chicago-vv17jz_fgkxlgu6j | Sienna Spiro | none | 8332347 | https://www.ticketliquidator.com/tickets/8332347/Sienna-Spiro-tickets-Wed-Aug-25-2027-The-Chicago-Theatre | - |
| tm-sienna-spiro-2027-chicago-vv17jz_fgkxlcj6o | Sienna Spiro | none | 8332348 | https://www.ticketliquidator.com/tickets/8332348/Sienna-Spiro-tickets-Thu-Aug-26-2027-The-Chicago-Theatre | - |
| tm-sienna-spiro-2027-minneapolis-vv17bz_fgktexhi7 | Sienna Spiro | none | 8332354 | https://www.ticketliquidator.com/tickets/8332354/Sienna-Spiro-tickets-Sat-Aug-28-2027-The-Armory-Minneapolis | - |
| tm-sienna-spiro-2027-seattle-vvg1hz_4ediyof | Sienna Spiro | none | 8332362 | https://www.ticketliquidator.com/tickets/8332362/Sienna-Spiro-tickets-Thu-Sep-2-2027-Wamu-Theater-At-Lumen-Field-Event-Center | - |
| tm-sienna-spiro-2027-vancouver-1av7z_fgkxqzaez | Sienna Spiro | none | 8332368 | https://www.ticketliquidator.com/tickets/8332368/Sienna-Spiro-tickets-Sat-Sep-4-2027-UBC-Doug-Mitchell-Thunderbird-Sports-Centre | - |
| tm-sienna-spiro-2027-berkeley-g5vyz_fbwbrn7 | Sienna Spiro | none | 8332372 | https://www.ticketliquidator.com/tickets/8332372/Sienna-Spiro-tickets-Tue-Sep-7-2027-Greek-Theatre-UC-Berkeley | - |
| tm-sienna-spiro-2027-mexico-1afzk4ogkeyuq9e | Sienna Spiro | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-interrupters-2027-san-diego-vvg1iz_4zg9ez5 | The Interrupters | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tommy-emmanuel-2027-grand-junction-g5vzz_fdgnqkn | Tommy Emmanuel | none | 8333067 | https://www.ticketliquidator.com/tickets/8333067/Tommy-Emmanuel-tickets-Wed-Feb-24-2027-The-Avalon-Theatre-CO | - |
| tm-tommy-emmanuel-2027-virginia-beach-vv177z_fgkxnvih0 | Tommy Emmanuel | none | 8333070 | https://www.ticketliquidator.com/tickets/8333070/Tommy-Emmanuel-tickets-Wed-Jun-2-2027-Sandler-Center-For-The-Performing-Arts | - |
| tm-haiden-henderson-2027-minneapolis-z7r9jz1aaeerb | Haiden Henderson | none | 8284334 | https://www.ticketliquidator.com/tickets/8284334/Haiden-Henderson-tickets-Sun-May-2-2027-7th-Street-Entry | - |
| tm-eagles-2027-las-vegas-1a9zk4egkdcmdns | Eagles | none | 8332074 | https://www.ticketliquidator.com/tickets/8332074/The-Eagles-tickets-Fri-Jan-8-2027-Sphere | - |
| tm-eagles-2027-las-vegas-1a9zk4egkdmahp8 | Eagles | none | 8332075 | https://www.ticketliquidator.com/tickets/8332075/The-Eagles-tickets-Sat-Jan-9-2027-Sphere | - |
| tm-sienna-spiro-2027-new-york-g5dyz_46d6wnd | Sienna Spiro | none | 8333456 | https://www.ticketliquidator.com/tickets/8333456/Sienna-Spiro-tickets-Wed-Aug-18-2027-Radio-City-Music-Hall | - |
| tm-yacht-rock-revue-2027-atlanta-z7r9jz1aa7oau | Yacht Rock Revue | none | 8312038 | https://www.ticketliquidator.com/tickets/8312038/Yacht-Rock-Revue-tickets-Sat-Feb-27-2027-The-Eastern-GA | - |
| tm-earth-wind-fire-2027-saint-augustine-z7r9jz1aaeb-p | Earth, Wind & Fire | none | - | - | no qualifying listing (complete catalog checked) |
| tm-katseye-2026-boston-vvg17z_1eilxli | KATSEYE | none | 7961636 | https://www.ticketliquidator.com/tickets/7961636/Katseye-tickets-Wed-Oct-28-2026-TD-Garden | - |
| tm-katseye-2026-montreal-17g8v0g61xoe95k | KATSEYE | none | 7961852 | https://www.ticketliquidator.com/tickets/7961852/Katseye-tickets-Fri-Oct-30-2026-Centre-Bell | - |
| tm-katseye-2026-hamilton-177zv0g61i6mwwe | KATSEYE | none | - | - | no qualifying listing (complete catalog checked) |
| tm-katseye-2026-detroit-vvg1oz_1efshc4 | KATSEYE | none | 7961637 | https://www.ticketliquidator.com/tickets/7961637/Katseye-tickets-Tue-Nov-3-2026-Little-Caesars-Arena | - |
| tm-katseye-2026-chicago-vvg18z_1mip6i3 | KATSEYE | none | 7961638 | https://www.ticketliquidator.com/tickets/7961638/Katseye-tickets-Thu-Nov-5-2026-United-Center | - |
| tm-katseye-2026-minneapolis-vvg1bz_1syoq0j | KATSEYE | none | 7961641 | https://www.ticketliquidator.com/tickets/7961641/Katseye-tickets-Sat-Nov-7-2026-Target-Center | - |
| tm-katseye-2026-austin-g5diz_1lv8_jd | KATSEYE | none | 7961642 | https://www.ticketliquidator.com/tickets/7961642/Katseye-tickets-Tue-Nov-10-2026-Moody-Center-ATX | - |
| tm-katseye-2026-dallas-vvg1yz_1jrlmao | KATSEYE | none | 7961644 | https://www.ticketliquidator.com/tickets/7961644/Katseye-tickets-Wed-Nov-11-2026-American-Airlines-Center | - |
| tm-katseye-2026-las-vegas-z7r9jz1a70ouv | KATSEYE | none | 7961834 | https://www.ticketliquidator.com/tickets/7961834/Katseye-tickets-Sat-Nov-14-2026-MGM-Grand-Garden-Arena | - |
| tm-katseye-2026-seattle-vvg1hz_1e8gggs | KATSEYE | none | 7961840 | https://www.ticketliquidator.com/tickets/7961840/Katseye-tickets-Tue-Nov-17-2026-Climate-Pledge-Arena | - |
| tm-katseye-2026-oakland-g5vyz_1m-ew1q | KATSEYE | none | 7961842 | https://www.ticketliquidator.com/tickets/7961842/Katseye-tickets-Thu-Nov-19-2026-Oakland-Arena | - |
| tm-katseye-2026-los-angeles-g5eyz_1rkf-rx | KATSEYE | none | 7961846 | https://www.ticketliquidator.com/tickets/7961846/Katseye-tickets-Sat-Nov-21-2026-Cryptocom-Arena | - |
| tm-katseye-2026-los-angeles-g5eyz_52cssfl | KATSEYE | none | 7984757 | https://www.ticketliquidator.com/tickets/7984757/Katseye-tickets-Sun-Nov-22-2026-Cryptocom-Arena | - |
| tm-katseye-2026-phoenix-17k8v0g61m4tf9t | KATSEYE | none | 7961848 | https://www.ticketliquidator.com/tickets/7961848/Katseye-tickets-Tue-Nov-24-2026-Mortgage-Matchup-Center | - |
| tm-katseye-2026-ciudad-de-mexico-17azv0g61mujevj | KATSEYE | none | 7983201 | https://www.ticketliquidator.com/tickets/7983201/Katseye-tickets-Fri-Nov-27-2026-Palacio-De-Los-Deportes-Mexico-City | - |
| tm-katseye-2026-ciudad-de-mexico-17azv0g61m2a3xe | KATSEYE | none | 7990930 | https://www.ticketliquidator.com/tickets/7990930/Katseye-tickets-Sat-Nov-28-2026-Palacio-De-Los-Deportes-Mexico-City | - |
| tm-ricky-martin-2026-las-vegas-17ayv0g6ubm5h5l | Ricky Martin | none | 8130658 | https://www.ticketliquidator.com/tickets/8130658/Ricky-Martin-tickets-Fri-Oct-30-2026-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-ricky-martin-2026-las-vegas-17ayv0g6ubmuh5y | Ricky Martin | none | 8130659 | https://www.ticketliquidator.com/tickets/8130659/Ricky-Martin-tickets-Sat-Oct-31-2026-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-ricky-martin-2026-lincoln-g5vyz_grrfawg | Ricky Martin | none | 8057196 | https://www.ticketliquidator.com/tickets/8057196/Ricky-Martin-tickets-Fri-Nov-6-2026-The-Venue-At-Thunder-Valley-Casino-Resort | - |
| tm-ricky-martin-2026-temecula-vvg1iz_g21wliz | Ricky Martin | none | 8072742 | https://www.ticketliquidator.com/tickets/8072742/Ricky-Martin-tickets-Sun-Nov-8-2026-Summit-At-Pechanga-Resort-Casino | - |
| tm-ty-myers-2026-austin-g5diz_kuopazl | Ty Myers | none | 7830817 | https://www.ticketliquidator.com/tickets/7830817/Ty-Myers-tickets-Fri-Nov-20-2026-Moody-Center-ATX | - |
| tm-ty-myers-2026-fort-worth-vvg1yz_61djqel | Ty Myers | unverify (applied) | 7830819 | https://www.ticketliquidator.com/tickets/7830819/Ty-Myers-tickets-Sat-Nov-21-2026-Dickies-Arena | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-dan-shay-2026-denver-g5vzz_1dezhf3 | Dan + Shay | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dan-shay-2026-salt-lake-city-z7r9jz1a70jp0 | Dan + Shay | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dan-shay-2026-phoenix-17k8v0g61dxzizm | Dan + Shay | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dan-shay-2026-anaheim-vvg10z_1damnyd | Dan + Shay | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dan-shay-2026-mountain-view-g5vyz_1wl9ah6 | Dan + Shay | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beabadoobee-2026-oakland-g5vyz_ufp_rvl | beabadoobee | none | 8081072 | https://www.ticketliquidator.com/tickets/8081072/beabadoobee-tickets-Mon-Oct-26-2026-Oakland-Arena | - |
| tm-beabadoobee-2026-vancouver-1778v0g6u5paqr- | beabadoobee | none | 8081057 | https://www.ticketliquidator.com/tickets/8081057/beabadoobee-tickets-Wed-Oct-28-2026-Rogers-Arena | - |
| tm-beabadoobee-2026-seattle-vvg1hz_u_uadg3 | beabadoobee | none | 8081075 | https://www.ticketliquidator.com/tickets/8081075/beabadoobee-tickets-Thu-Oct-29-2026-Climate-Pledge-Arena | - |
| tm-beabadoobee-2026-glasgow-17uov0g6uryba3u | beabadoobee | none | 8090672 | https://www.ticketliquidator.com/tickets/8090672/beabadoobee-tickets-Sat-Nov-14-2026-OVO-Hydro | - |
| tm-beabadoobee-2026-cardiff-17uov0g6uhod1tg | beabadoobee | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beabadoobee-2026-manchester-g5vhz_u1guca1 | beabadoobee | none | 8090671 | https://www.ticketliquidator.com/tickets/8090671/beabadoobee-tickets-Tue-Nov-17-2026-AO-Arena | - |
| tm-beabadoobee-2026-greenwich-z7r9jz1a7ps_a | beabadoobee | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beabadoobee-2026-stockholm-z698xzq2z1kp0a-oa | beabadoobee | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beabadoobee-2026-oslo-z698xzb_z16v38kfe3 | beabadoobee | none | 8094857 | https://www.ticketliquidator.com/tickets/8094857/beabadoobee-tickets-Fri-Nov-27-2026-Oslo-Spektrum | - |
| tm-beabadoobee-2026-forest-brussels-z698xzg2z16vovadfj | beabadoobee | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beabadoobee-2026-berlin-z698xzc2z16vpmfp_a | beabadoobee | none | 8094855 | https://www.ticketliquidator.com/tickets/8094855/beabadoobee-tickets-Sun-Dec-6-2026-Tempodrom | - |
| tm-beabadoobee-2026-dusseldorf-z698xzc2z1k09qy83 | beabadoobee | none | 8094856 | https://www.ticketliquidator.com/tickets/8094856/beabadoobee-tickets-Mon-Dec-7-2026-Mitsubishi-Electric-Halle | - |
| tm-dave-matthews-band-2026-madison-z7r9jz1aazj8x | Dave Matthews Band | none | 8195877 | https://www.ticketliquidator.com/tickets/8195877/Dave-Matthews-Band-tickets-Wed-Nov-4-2026-Kohl-Center | - |
| tm-dave-matthews-band-2026-nashville-g5viz_2znwmqm | Dave Matthews Band | none | 8195878 | https://www.ticketliquidator.com/tickets/8195878/Dave-Matthews-Band-tickets-Fri-Nov-6-2026-Bridgestone-Arena | - |
| tm-dave-matthews-band-2026-chicago-vvg18z_cde9wdz | Dave Matthews Band | none | 8195879 | https://www.ticketliquidator.com/tickets/8195879/Dave-Matthews-Band-tickets-Sat-Nov-7-2026-United-Center | - |
| tm-dave-matthews-band-2026-providence-vvg17z_2piw04c | Dave Matthews Band | none | 8195880 | https://www.ticketliquidator.com/tickets/8195880/Dave-Matthews-Band-tickets-Mon-Nov-9-2026-Amica-Mutual-Pavilion | - |
| tm-dave-matthews-band-2026-baltimore-1ka8vpevgauw1qw | Dave Matthews Band | none | 8195881 | https://www.ticketliquidator.com/tickets/8195881/Dave-Matthews-Band-tickets-Tue-Nov-10-2026-CFG-Bank-Arena | - |
| tm-dave-matthews-band-2026-new-york-g5diz_2njwaf8 | Dave Matthews Band | none | 8195882 | https://www.ticketliquidator.com/tickets/8195882/Dave-Matthews-Band-tickets-Thu-Nov-12-2026-Madison-Square-Garden | - |
| tm-dave-matthews-band-2026-new-york-g5diz_2njdtfa | Dave Matthews Band | none | 8195883 | https://www.ticketliquidator.com/tickets/8195883/Dave-Matthews-Band-tickets-Fri-Nov-13-2026-Madison-Square-Garden | - |
| tm-garth-brooks-2026-seattle-vvg1hz_4dkzhpm | Garth Brooks | none | 8335342 | https://www.ticketliquidator.com/tickets/8335342/Garth-Brooks-tickets-Sun-Nov-15-2026-Climate-Pledge-Arena | - |
| tm-los-tigres-del-norte-2026-palm-desert-vvg1iz_axk_2p- | Los Tigres del Norte | none | - | - | no qualifying listing (complete catalog checked) |
| tm-los-tigres-del-norte-2026-san-diego-z7r9jz1a7-p4f | Los Tigres del Norte | none | 7761203 | https://www.ticketliquidator.com/tickets/7761203/Los-Tigres-del-Norte-tickets-Sat-Nov-14-2026-Pechanga-Arena-San-Diego | - |
| tm-los-tigres-del-norte-2026-columbus-z7r9jz1a7ofo9 | Los Tigres del Norte | none | 7467758 | https://www.ticketliquidator.com/tickets/7467758/Los-Tigres-del-Norte-tickets-Fri-Nov-20-2026-Palace-Theatre-Columbus | - |
| tm-los-tigres-del-norte-2026-detroit-vv1kezv0jiga2jpfm | Los Tigres del Norte | none | 7935104 | https://www.ticketliquidator.com/tickets/7935104/Los-Tigres-del-Norte-tickets-Sat-Nov-21-2026-Fox-Theatre-Detroit | - |
| tm-los-tigres-del-norte-2026-baltimore-164zko9e6zackudg | Los Tigres del Norte | none | 7759914 | https://www.ticketliquidator.com/tickets/7759914/Los-Tigres-del-Norte-tickets-Fri-Nov-27-2026-CFG-Bank-Arena | - |
| tm-los-tigres-del-norte-2026-belmont-park-1kgzv0pfgagsn5l | Los Tigres del Norte | none | - | - | no qualifying listing (complete catalog checked) |
| tm-los-tigres-del-norte-2026-nashville-g5viz_an5hweq | Los Tigres del Norte | none | 7759916 | https://www.ticketliquidator.com/tickets/7759916/Los-Tigres-del-Norte-tickets-Fri-Dec-4-2026-Bridgestone-Arena | - |
| tm-los-tigres-del-norte-2026-birmingham-1aozkobgkdkxmhh | Los Tigres del Norte | none | - | - | no qualifying listing (complete catalog checked) |
| tm-los-tigres-del-norte-2027-san-jose-g5vyz_k6cidvv | Los Tigres del Norte | none | - | - | no qualifying listing (complete catalog checked) |
| tm-los-tigres-del-norte-2027-temecula-vvg1iz_km0aey4 | Los Tigres del Norte | none | 8309342 | https://www.ticketliquidator.com/tickets/8309342/Los-Tigres-del-Norte-tickets-Sat-Mar-13-2027-Summit-At-Pechanga-Resort-Casino | - |
| tm-the-chicks-2026-seattle-vvg1hz_52nooej | The Chicks | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-chicks-2026-seattle-vvg1hz_52n3-el | The Chicks | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-chicks-2026-san-francisco-g5vyz_5k9t5fo | The Chicks | none | 7999837 | https://www.ticketliquidator.com/tickets/7999837/The-Chicks-tickets-Thu-Oct-29-2026-The-Masonic-San-Francisco | - |
| tm-the-chicks-2026-san-francisco-g5vyz_5kbz5fl | The Chicks | none | 7999839 | https://www.ticketliquidator.com/tickets/7999839/The-Chicks-tickets-Fri-Oct-30-2026-The-Masonic-San-Francisco | - |
| tm-the-chicks-2026-hollywood-vvg10z_5ljdml9 | The Chicks | none | 7999840 | https://www.ticketliquidator.com/tickets/7999840/The-Chicks-tickets-Sun-Nov-1-2026-Dolby-Theatre | - |
| tm-the-chicks-2026-hollywood-vvg10z_5ra8fba | The Chicks | none | 7999841 | https://www.ticketliquidator.com/tickets/7999841/The-Chicks-tickets-Mon-Nov-2-2026-Dolby-Theatre | - |
| tm-the-chicks-2026-hollywood-vvg10z_5rao7bc | The Chicks | none | 8193502 | https://www.ticketliquidator.com/tickets/8193502/The-Chicks-tickets-Tue-Nov-3-2026-Dolby-Theatre | - |
| tm-young-miko-2026-miami-vvg1vz_fchiqhv | Young Miko | none | 7860530 | https://www.ticketliquidator.com/tickets/7860530/Young-Miko-tickets-Wed-Oct-28-2026-Kaseya-Center | - |
| tm-young-miko-2026-orlando-1axzk3dgkeha7uv | Young Miko | none | 7860531 | https://www.ticketliquidator.com/tickets/7860531/Young-Miko-tickets-Thu-Oct-29-2026-Kia-Center | - |
| tm-young-miko-2026-atlanta-vvg1zz_f1gfmts | Young Miko | none | 7860532 | https://www.ticketliquidator.com/tickets/7860532/Young-Miko-tickets-Sat-Oct-31-2026-State-Farm-Arena-GA | - |
| tm-young-miko-2026-charlotte-g5evz_fffmq2n | Young Miko | none | 7860533 | https://www.ticketliquidator.com/tickets/7860533/Young-Miko-tickets-Sun-Nov-1-2026-Spectrum-Center | - |
| tm-young-miko-2026-philadelphia-1ayzk3egkdcdzmm | Young Miko | none | 7860534 | https://www.ticketliquidator.com/tickets/7860534/Young-Miko-tickets-Wed-Nov-4-2026-Xfinity-Mobile-Arena | - |
| tm-young-miko-2026-brooklyn-16dzz_f13g7dsys | Young Miko | none | 7860535 | https://www.ticketliquidator.com/tickets/7860535/Young-Miko-tickets-Thu-Nov-5-2026-Barclays-Center | - |
| tm-zac-brown-band-2026-buffalo-k7vgf_dh65dyo | Zac Brown Band | none | 7703260 | https://www.ticketliquidator.com/tickets/7703260/Zac-Brown-Band-tickets-Thu-Nov-5-2026-KeyBank-Center | - |
| tm-zac-brown-band-2026-detroit-vv1afzk8vgkdi6e86 | Zac Brown Band | none | 7703261 | https://www.ticketliquidator.com/tickets/7703261/Zac-Brown-Band-tickets-Fri-Nov-6-2026-Little-Caesars-Arena | - |
| tm-zac-brown-band-2026-lincoln-vv16kzk8wakzacfeeu | Zac Brown Band | none | 7703262 | https://www.ticketliquidator.com/tickets/7703262/Zac-Brown-Band-tickets-Thu-Nov-19-2026-Pinnacle-Bank-Arena | - |
| tm-zac-brown-band-2026-des-moines-z7r9jz1a7osk3 | Zac Brown Band | none | 7705909 | https://www.ticketliquidator.com/tickets/7705909/Zac-Brown-Band-tickets-Fri-Nov-20-2026-Caseys-Center | - |
| tm-zac-brown-band-2026-rosemont-vv1a7zk8sgkdldbon | Zac Brown Band | none | 7703263 | https://www.ticketliquidator.com/tickets/7703263/Zac-Brown-Band-tickets-Sat-Nov-21-2026-Allstate-Arena | - |
| tm-zac-brown-band-2027-milwaukee-vv1a6zkf0gkdpf9tr | Zac Brown Band | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sleeping-with-sirens-2026-pittsburgh-z7r9jz1a7p_ae | Sleeping With Sirens | none | 8053970 | https://www.ticketliquidator.com/tickets/8053970/Sleeping-With-Sirens-tickets-Tue-Oct-27-2026-Stage-AE | - |
| tm-sleeping-with-sirens-2026-royal-oak-z7r9jz1a7p_ad | Sleeping With Sirens | none | 8053969 | https://www.ticketliquidator.com/tickets/8053969/Sleeping-With-Sirens-tickets-Wed-Oct-28-2026-Royal-Oak-Music-Theatre | - |
| tm-sleeping-with-sirens-2026-montreal-17g8v0g6gxey070 | Sleeping With Sirens | none | 8053967 | https://www.ticketliquidator.com/tickets/8053967/Sleeping-With-Sirens-tickets-Fri-Oct-30-2026-MTelus | - |
| tm-sleeping-with-sirens-2026-ottawa-17g8v0g6gwupswm | Sleeping With Sirens | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sleeping-with-sirens-2026-toronto-177zv0g6gwdvb1r | Sleeping With Sirens | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sleeping-with-sirens-2026-boston-vvg17z_gmbz9_j | Sleeping With Sirens | none | 8053941 | https://www.ticketliquidator.com/tickets/8053941/Sleeping-With-Sirens-tickets-Tue-Nov-3-2026-Citizens-House-Of-Blues-Boston | - |
| tm-sleeping-with-sirens-2026-sayreville-z7r9jz1a7p_a7 | Sleeping With Sirens | none | 8053971 | https://www.ticketliquidator.com/tickets/8053971/Sleeping-With-Sirens-tickets-Wed-Nov-4-2026-Starland-Ballroom | - |
| tm-sleeping-with-sirens-2026-philadelphia-vvg1fz_gm9cqxe | Sleeping With Sirens | none | 8053942 | https://www.ticketliquidator.com/tickets/8053942/Sleeping-With-Sirens-tickets-Fri-Nov-6-2026-The-Fillmore-Philadelphia | - |
| tm-sleeping-with-sirens-2026-new-york-k7vgf_gnebmkt | Sleeping With Sirens | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sleeping-with-sirens-2026-baltimore-17a8v0g6gxtb5eg | Sleeping With Sirens | none | 8053963 | https://www.ticketliquidator.com/tickets/8053963/Sleeping-With-Sirens-tickets-Sun-Nov-8-2026-Nevermore-Hall | - |
| tm-sleeping-with-sirens-2026-charlotte-g5evz_gnuzybg | Sleeping With Sirens | none | 8053964 | https://www.ticketliquidator.com/tickets/8053964/Sleeping-With-Sirens-tickets-Wed-Nov-11-2026-The-Fillmore-Charlotte | - |
| tm-sleeping-with-sirens-2026-atlanta-z7r9jz1a7p_aa | Sleeping With Sirens | none | 8053972 | https://www.ticketliquidator.com/tickets/8053972/Sleeping-With-Sirens-tickets-Thu-Nov-12-2026-The-Eastern-GA | - |
| tm-sleeping-with-sirens-2027-bristol-17u8v0g6gfkrxfj | Sleeping With Sirens | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sleeping-with-sirens-2027-glasgow-g5dzz_g5isp0f | Sleeping With Sirens | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sleeping-with-sirens-2027-manchester-g5vhz_gfgtq6v | Sleeping With Sirens | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sleeping-with-sirens-2027-birmingham-g5dzz_5wuo0od | Sleeping With Sirens | none | 8127272 | https://www.ticketliquidator.com/tickets/8127272/Sleeping-With-Sirens-tickets-Sat-Mar-6-2027-O2-Academy-Birmingham | - |
| tm-sleeping-with-sirens-2027-london-g5dzz_g5cip1i | Sleeping With Sirens | none | 8050887 | https://www.ticketliquidator.com/tickets/8050887/Sleeping-With-Sirens-tickets-Sun-Mar-7-2027-O2-Academy-Brixton | - |
| tm-sleeping-with-sirens-2027-brisbane-1akzkfygkeprtzf | Sleeping With Sirens | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sleeping-with-sirens-2027-west-melbourne-1avgz_kgkwtduwz | Sleeping With Sirens | none | - | - | no qualifying listing (complete catalog checked) |
| tm-chayanne-2026-tampa-vvg1vz_km8pku0 | Chayanne | none | 7892339 | https://www.ticketliquidator.com/tickets/7892339/Chayanne-tickets-Fri-Oct-30-2026-Benchmark-International-Arena | - |
| tm-chayanne-2026-orlando-1aefz_kgkwoqkla | Chayanne | none | 7892340 | https://www.ticketliquidator.com/tickets/7892340/Chayanne-tickets-Sat-Oct-31-2026-Kia-Center | - |
| tm-dinosaur-jr-2027-brisbane-1k7yvp4bgacdnzm | Dinosaur Jr. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-zach-bryan-2027-vancouver-1k78vp4fgacgpjm | Zach Bryan | none | 8338720 | https://www.ticketliquidator.com/tickets/8338720/Zach-Bryan-tickets-Tue-Jul-27-2027-BC-Place-Stadium | - |
| tm-zach-bryan-2027-edmonton-16v7z_43bg7l9tm | Zach Bryan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dinosaur-jr-2027-auckland-1a0zk4fgkei-ffe | Dinosaur Jr. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-cece-winans-2026-orlando-16xzkokj9za57fca | CeCe Winans | none | 7752709 | https://www.ticketliquidator.com/tickets/7752709/CeCe-Winans-tickets-Tue-Oct-27-2026-Addition-Financial-Arena | - |
| tm-cece-winans-2026-north-charleston-g5evz_a3s0b-f | CeCe Winans | none | 7752710 | https://www.ticketliquidator.com/tickets/7752710/CeCe-Winans-tickets-Wed-Oct-28-2026-North-Charleston-Coliseum | - |
| tm-cece-winans-2026-tampa-vvg1vz_a3ceusx | CeCe Winans | none | 7752712 | https://www.ticketliquidator.com/tickets/7752712/CeCe-Winans-tickets-Thu-Oct-29-2026-The-Yuengling-Center | - |
| tm-cece-winans-2026-jacksonville-1kfov047gag6hdu | CeCe Winans | none | 7752713 | https://www.ticketliquidator.com/tickets/7752713/CeCe-Winans-tickets-Fri-Oct-30-2026-VyStar-Veterans-Memorial-Arena | - |
| tm-cece-winans-2026-seattle-vvg1hz_c5fehuk | CeCe Winans | none | 8121702 | https://www.ticketliquidator.com/tickets/8121702/CeCe-Winans-tickets-Thu-Dec-10-2026-Wamu-Theater-At-Lumen-Field-Event-Center | - |
| tm-cece-winans-2026-portland-z7r9jz1a7j6jj | CeCe Winans | none | 8121635 | https://www.ticketliquidator.com/tickets/8121635/CeCe-Winans-tickets-Fri-Dec-11-2026-Arlene-Schnitzer-Concert-Hall | - |
| tm-cece-winans-2026-phoenix-17k8v0g6ch4_jyt | CeCe Winans | none | 8121699 | https://www.ticketliquidator.com/tickets/8121699/CeCe-Winans-tickets-Tue-Dec-15-2026-Arizona-Financial-Theatre | - |
| tm-cece-winans-2026-bakersfield-z7r9jz1a7jfpa | CeCe Winans | none | 8124361 | https://www.ticketliquidator.com/tickets/8124361/CeCe-Winans-tickets-Wed-Dec-16-2026-Dignity-Health-Theater | - |
| tm-cece-winans-2026-los-angeles-z7r9jz1a7jfjs | CeCe Winans | none | - | - | no qualifying listing (complete catalog checked) |
| tm-cece-winans-2026-sacramento-g5vyz_cr1cmnb | CeCe Winans | none | 8124362 | https://www.ticketliquidator.com/tickets/8124362/CeCe-Winans-tickets-Fri-Dec-18-2026-Sacramento-Memorial-Auditorium | - |
| tm-cece-winans-2027-nashville-z7r9jz1aaebzs | CeCe Winans | none | 7854204 | https://www.ticketliquidator.com/tickets/7854204/CeCe-Winans-tickets-Sun-Mar-21-2027-Grand-Ole-Opry-House | - |
| tm-role-model-2027-berlin-z698xzc2z16vjt07ba | Role Model | none | - | - | no qualifying listing (complete catalog checked) |
| tm-role-model-2027-forest-brussels-z698xzg2z1k8kjzbp | Role Model | none | - | - | no qualifying listing (complete catalog checked) |
| tm-role-model-2027-dusseldorf-z698xzc2z1ka6aaoi | Role Model | none | - | - | no qualifying listing (complete catalog checked) |
| tm-role-model-2027-dublin-17kzv0g6uvbpba3 | Role Model | none | - | - | no qualifying listing (complete catalog checked) |
| tm-role-model-2027-london-17uyv0g6ueic0m_ | Role Model | none | 8074604 | https://www.ticketliquidator.com/tickets/8074604/Role-Model-tickets-Wed-Feb-24-2027-OVO-Arena-Wembley | - |
| tm-karan-aujla-2026-sacramento-g5vyz_3m-gnbm | Karan Aujla | none | 8267874 | https://www.ticketliquidator.com/tickets/8267874/Karan-Aujla-tickets-Sat-Nov-7-2026-Golden-1-Center | - |
| tm-karan-aujla-2026-los-angeles-g5eyz_3lgqzvb | Karan Aujla | none | 8267866 | https://www.ticketliquidator.com/tickets/8267866/Karan-Aujla-tickets-Mon-Nov-9-2026-Cryptocom-Arena | - |
| tm-karan-aujla-2026-dallas-vvg1yz_3r_e2at | Karan Aujla | none | 8267876 | https://www.ticketliquidator.com/tickets/8267876/Karan-Aujla-tickets-Fri-Nov-13-2026-American-Airlines-Center | - |
| tm-karan-aujla-2026-atlanta-vvg1zz_3myjgwo | Karan Aujla | none | 8267877 | https://www.ticketliquidator.com/tickets/8267877/Karan-Aujla-tickets-Mon-Nov-16-2026-State-Farm-Arena-GA | - |
| tm-karan-aujla-2026-new-york-g5diz_3ivacnr | Karan Aujla | none | 8267865 | https://www.ticketliquidator.com/tickets/8267865/Karan-Aujla-tickets-Wed-Nov-18-2026-Madison-Square-Garden | - |
| tm-karan-aujla-2026-washington-1a4zkftgkdhkud5 | Karan Aujla | none | 8267878 | https://www.ticketliquidator.com/tickets/8267878/Karan-Aujla-tickets-Fri-Nov-20-2026-Capital-One-Arena | - |
| tm-jack-johnson-2026-brisbane-1k7yv0jtgaugdpl | Jack Johnson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jack-johnson-2026-brisbane-1akzkosgkdpve0m | Jack Johnson | none | 8237263 | https://www.ticketliquidator.com/tickets/8237263/Jack-Johnson-tickets-Sat-Nov-7-2026-Riverstage-Brisbane | - |
| tm-jack-johnson-2026-brisbane-1k7yv0jtgaudsje | Jack Johnson | none | 8237264 | https://www.ticketliquidator.com/tickets/8237264/Jack-Johnson-tickets-Sun-Nov-8-2026-Riverstage-Brisbane | - |
| tm-jack-johnson-2026-west-perth-1k7yv0qzga2dx6- | Jack Johnson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jack-johnson-2026-west-perth-1akzkomgkd_zu0i | Jack Johnson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jack-johnson-2026-west-perth-1akzkomgkd_bj0s | Jack Johnson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jack-johnson-2026-sydney-1akzkosgkdq3fwf | Jack Johnson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jack-johnson-2026-linlithgow-ave-1avgz_6cppkzd52a | Jack Johnson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jack-johnson-2026-linlithgow-ave-1avgz_6gkbxcfqh | Jack Johnson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jack-johnson-2026-auckland-1a0zkowgkdch7lq | Jack Johnson | none | 8127248 | https://www.ticketliquidator.com/tickets/8127248/Jack-Johnson-tickets-Fri-Nov-20-2026-Spark-Arena | - |
| tm-jack-johnson-2026-waipara-1kazv0jzgaua-ts | Jack Johnson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jack-johnson-2027-forest-brussels-z698xzg2z1koeez-t | Jack Johnson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jack-johnson-2027-amsterdam-z698xzbpz16v8kg7fn | Jack Johnson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jack-johnson-2027-st-austell-g5vhz_4eimdn_ | Jack Johnson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jack-johnson-2027-st-austell-g5vhz_4d63ah_ | Jack Johnson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jack-johnson-2027-london-16dfz_4ebg7va-j | Jack Johnson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-phil-wickham-2026-fontana-rz7hnez1afu7r7 | Phil Wickham | none | - | - | no qualifying listing (complete catalog checked) |
| tm-phil-wickham-2026-fontana-rz7hnez1afu7o0 | Phil Wickham | none | - | - | no qualifying listing (complete catalog checked) |
| tm-phil-wickham-2026-san-diego-rz7hnez1afu7ov | Phil Wickham | none | 8324868 | https://www.ticketliquidator.com/tickets/8324868/Phil-Wickham-tickets-Thu-Dec-3-2026-Maranatha-Chapel | - |
| tm-phil-wickham-2026-san-diego-rz7hnez1afu7x7 | Phil Wickham | none | 8324869 | https://www.ticketliquidator.com/tickets/8324869/Phil-Wickham-tickets-Fri-Dec-4-2026-Maranatha-Chapel | - |
| tm-phil-wickham-2026-downey-rz7hnez1afu7xf | Phil Wickham | none | 8324870 | https://www.ticketliquidator.com/tickets/8324870/Phil-Wickham-tickets-Sun-Dec-6-2026-Calvary-Chapel-Downey | - |
| tm-gavin-adcock-2026-charlotte-g5evz_kjjq1qk | Gavin Adcock | none | 7806866 | https://www.ticketliquidator.com/tickets/7806866/Gavin-Adcock-tickets-Thu-Oct-29-2026-Bojangles-Coliseum | - |
| tm-gavin-adcock-2026-savannah-vvg1zz_kjxemhw | Gavin Adcock | none | 7806867 | https://www.ticketliquidator.com/tickets/7806867/Gavin-Adcock-tickets-Fri-Oct-30-2026-Enmarket-Arena | - |
| tm-gavin-adcock-2026-estero-vvg1vz_kjvgfqs | Gavin Adcock | none | 7806868 | https://www.ticketliquidator.com/tickets/7806868/Gavin-Adcock-tickets-Sat-Oct-31-2026-Hertz-Arena | - |
| tm-gavin-adcock-2026-boston-vv177z_kgkmr1ooo | Gavin Adcock | none | 7806869 | https://www.ticketliquidator.com/tickets/7806869/Gavin-Adcock-tickets-Fri-Nov-6-2026-MGM-Music-Hall-at-Fenway-Park | - |
| tm-gavin-adcock-2026-reading-vv1aezkotgkeivbwv | Gavin Adcock | none | - | - | no qualifying listing (complete catalog checked) |
| tm-gavin-adcock-2026-detroit-z7r9jz1a7-yus | Gavin Adcock | none | - | - | no qualifying listing (complete catalog checked) |
| tm-gavin-adcock-2026-grand-rapids-z7r9jz1a7-yut | Gavin Adcock | none | 7806928 | https://www.ticketliquidator.com/tickets/7806928/Gavin-Adcock-tickets-Sat-Nov-14-2026-Van-Andel-Arena | - |
| tm-gavin-adcock-2026-houston-g5diz_3mqabzl | Gavin Adcock | none | - | - | no qualifying listing (complete catalog checked) |
| tm-gavin-adcock-2026-las-vegas-z7r9jz1a7paas | Gavin Adcock | none | 7927241 | https://www.ticketliquidator.com/tickets/7927241/Gavin-Adcock-tickets-Thu-Dec-10-2026-The-Theater-at-Virgin-Hotels-Las-Vegas | - |
| tm-gavin-adcock-2027-lexington-1apzk4egkdqsq_b | Gavin Adcock | none | 8318410 | https://www.ticketliquidator.com/tickets/8318410/Gavin-Adcock-tickets-Thu-Apr-1-2027-Gatton-Park | - |
| tm-gavin-adcock-2027-saint-louis-1a-zk46gkdfwuei | Gavin Adcock | none | - | - | no qualifying listing (complete catalog checked) |
| tm-gavin-adcock-2027-saint-louis-1a-zk46gkdfsjen | Gavin Adcock | none | - | - | no qualifying listing (complete catalog checked) |
| tm-gavin-adcock-2027-university-z7r9jz1a7-y8- | Gavin Adcock | none | 7807220 | https://www.ticketliquidator.com/tickets/7807220/Gavin-Adcock-tickets-Sat-Apr-10-2027-The-Sandy-and-John-Black-Pavilion-at-Ole-Miss | - |
| tm-gavin-adcock-2027-salem-vv1avzk4kgkdddflu | Gavin Adcock | none | 8318413 | https://www.ticketliquidator.com/tickets/8318413/Gavin-Adcock-tickets-Thu-Apr-29-2027-Salem-Civic-Center | - |
| tm-gavin-adcock-2027-saint-augustine-z7r9jz1aa76gg | Gavin Adcock | none | - | - | no qualifying listing (complete catalog checked) |
| tm-gavin-adcock-2027-oklahoma-city-z7r9jz1aa76gu | Gavin Adcock | none | - | - | no qualifying listing (complete catalog checked) |
| tm-gavin-adcock-2027-houston-g5diz_f9nlu8w | Gavin Adcock | none | 8318414 | https://www.ticketliquidator.com/tickets/8318414/Gavin-Adcock-tickets-Sat-May-8-2027-White-Oak-Music-Hall-Lawn | - |
| tm-gavin-adcock-2027-richmond-z7r9jz1aa76gm | Gavin Adcock | none | 8319557 | https://www.ticketliquidator.com/tickets/8319557/Gavin-Adcock-tickets-Thu-May-13-2027-Virginia-Credit-Union-LIVE-at-Richmond-Raceway | - |
| tm-gavin-adcock-2027-atlantic-city-vv17fz_fgkbsdawx | Gavin Adcock | none | 8318415 | https://www.ticketliquidator.com/tickets/8318415/Gavin-Adcock-tickets-Fri-May-14-2027-Hard-Rock-Live-At-Etess-Arena | - |
| tm-gavin-adcock-2027-baltimore-z7r9jz1aa76ue | Gavin Adcock | none | 8319558 | https://www.ticketliquidator.com/tickets/8319558/Gavin-Adcock-tickets-Sat-May-15-2027-Pier-Six-Pavilion | - |
| tm-gavin-adcock-2027-helotes-z7r9jz1aa76gz | Gavin Adcock | none | 8319559 | https://www.ticketliquidator.com/tickets/8319559/Gavin-Adcock-tickets-Thu-May-27-2027-John-T-Floore-Country-Store | - |
| tm-gavin-adcock-2027-helotes-z7r9jz1aa76gy | Gavin Adcock | none | 8319560 | https://www.ticketliquidator.com/tickets/8319560/Gavin-Adcock-tickets-Fri-May-28-2027-John-T-Floore-Country-Store | - |
| tm-zach-bryan-2027-minneapolis-z7r9jz1aa7kad | Zach Bryan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-zach-bryan-2027-chicago-z7r9jz1aa7pvj | Zach Bryan | none | 8338574 | https://www.ticketliquidator.com/tickets/8338574/Zach-Bryan-tickets-Fri-May-7-2027-Soldier-Field | - |
| tm-zach-bryan-2027-chicago-z7r9jz1aa7ka- | Zach Bryan | none | 8322381 | https://www.ticketliquidator.com/tickets/8322381/Zach-Bryan-tickets-Sat-May-8-2027-Soldier-Field | - |
| tm-zach-bryan-2027-baltimore-z7r9jz1aa7kav | Zach Bryan | none | 8322382 | https://www.ticketliquidator.com/tickets/8322382/Zach-Bryan-tickets-Tue-May-18-2027-MT-Bank-Stadium | - |
| tm-zach-bryan-2027-nashville-z7r9jz1aa7k17 | Zach Bryan | none | 8322383 | https://www.ticketliquidator.com/tickets/8322383/Zach-Bryan-tickets-Sat-May-22-2027-New-Nissan-Stadium | - |
| tm-death-cab-for-cutie-2027-columbus-vv1aazk4fgkd90ltp | Death Cab for Cutie | none | 8338611 | https://www.ticketliquidator.com/tickets/8338611/Death-Cab-for-Cutie-tickets-Mon-Mar-29-2027-Mershon-Auditorium-At-Wexner-Center-For-The-Arts | - |
| tm-death-cab-for-cutie-2027-charlottesville-vv1a8vp46ga2dsp3 | Death Cab for Cutie | none | 8338610 | https://www.ticketliquidator.com/tickets/8338610/Death-Cab-for-Cutie-tickets-Wed-Apr-14-2027-Ting-Pavilion | - |
| tm-tommy-emmanuel-2027-loveland-z7r9jz1aa791k | Tommy Emmanuel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-riley-green-2026-manchester-vv177z_fgkwnh6_i | Riley Green | none | 8339188 | https://www.ticketliquidator.com/tickets/8339188/Riley-Green-tickets-Mon-Nov-2-2026-SNHU-Arena | - |
| tm-mico-2026-brooklyn-rz7hnez1afcpa7 | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-garth-brooks-2026-seattle-vvg1hz_4dkkd9j | Garth Brooks | none | 8338947 | https://www.ticketliquidator.com/tickets/8338947/Garth-Brooks-tickets-Thu-Nov-12-2026-Climate-Pledge-Arena | - |
| tm-u2-2027-ciudad-de-mexico-1afzk4agkeysi-t | U2 | none | 8329176 | https://www.ticketliquidator.com/tickets/8329176/U2-tickets-Tue-Feb-23-2027-Estadio-GNP-Seguros-Mexico-City | - |
| tm-u2-2027-ciudad-de-mexico-1afzk4agkebeind | U2 | none | 8329177 | https://www.ticketliquidator.com/tickets/8329177/U2-tickets-Fri-Feb-26-2027-Estadio-GNP-Seguros-Mexico-City | - |
| tm-u2-2027-ciudad-de-mexico-1afzk4agkebeina | U2 | none | 8337104 | https://www.ticketliquidator.com/tickets/8337104/U2-tickets-Sun-Feb-28-2027-Estadio-GNP-Seguros-Mexico-City | - |
| tm-u2-2027-ciudad-de-mexico-1afzk4agkebign2 | U2 | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beck-2026-durham-g5evz_fbugjju | Beck | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beck-2026-asheville-g5evz_ftjugdd | Beck | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beck-2026-atlanta-vvg1zz_fbor4w0 | Beck | none | 7896100 | https://www.ticketliquidator.com/tickets/7896100/Beck-tickets-Fri-Oct-30-2026-Coca-Cola-Roxy | - |
| tm-beck-2026-nashville-g5viz_kspxnlj | Beck | none | 7808848 | https://www.ticketliquidator.com/tickets/7808848/Beck-tickets-Sat-Oct-31-2026-The-Truth | - |
| tm-beck-2026-spokane-z7r9jz1aae87y | Beck | none | 8301187 | https://www.ticketliquidator.com/tickets/8301187/Beck-tickets-Fri-Nov-6-2026-First-Interstate-Center-for-the-Arts | - |
| tm-beck-2026-seattle-vvg1hz_3rxx2pm | Beck | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beck-2026-vancouver-1aozk3a0babze8k | Beck | none | 7896101 | https://www.ticketliquidator.com/tickets/7896101/Beck-tickets-Mon-Nov-9-2026-Queen-Elizabeth-Theatre-Vancouver | - |
| tm-beck-2026-portland-z7r9jz1a7xffk | Beck | none | 7896028 | https://www.ticketliquidator.com/tickets/7896028/Beck-tickets-Tue-Nov-10-2026-Keller-Auditorium | - |
| tm-dermot-kennedy-2026-west-perth-1avgz_agkmqzbyp | Dermot Kennedy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dermot-kennedy-2026-brisbane-1avgz_agksulpj1 | Dermot Kennedy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dermot-kennedy-2026-christchurch-1ae8z_agkm57djw | Dermot Kennedy | none | 8326048 | https://www.ticketliquidator.com/tickets/8326048/Dermot-Kennedy-tickets-Wed-Nov-25-2026-Christchurch-Town-Hall | - |
| tm-dermot-kennedy-2026-wellington-1ae8z_agkmdax8r | Dermot Kennedy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dermot-kennedy-2026-auckland-1ae8z_agkranxjl | Dermot Kennedy | none | 8173279 | https://www.ticketliquidator.com/tickets/8173279/Dermot-Kennedy-tickets-Sat-Nov-28-2026-Spark-Arena | - |
| tm-dermot-kennedy-2027-tramore-rd-cork-1kkzvpozga5u0fg | Dermot Kennedy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dermot-kennedy-2027-tramore-rd-cork-1kkzvpozga5mff_ | Dermot Kennedy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dermot-kennedy-2027-belfast-1azzk4kgkeju-cx | Dermot Kennedy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-turnpike-troubadours-2026-las-vegas-17ayv0g62soqkki | Turnpike Troubadours | none | 8182281 | https://www.ticketliquidator.com/tickets/8182281/Turnpike-Troubadours-tickets-Fri-Dec-11-2026-Brooklyn-Bowl-Las-Vegas | - |
| tm-sam-fender-2027-newcastle-upon-tyne-1agzk4fgkd88g8t | Sam Fender | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sam-fender-2027-newcastle-upon-tyne-1adfz_fgktpp_oj | Sam Fender | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sam-fender-2027-cardiff-16gzk4fpszage5ca | Sam Fender | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sam-fender-2027-london-16nzk4f00zauv12c | Sam Fender | none | 8334269 | https://www.ticketliquidator.com/tickets/8334269/Sam-Fender-tickets-Fri-Jun-18-2027-Wembley-Stadium | - |
| tm-sam-fender-2027-london-1anzk4fgkdp88g6 | Sam Fender | none | 8334270 | https://www.ticketliquidator.com/tickets/8334270/Sam-Fender-tickets-Sun-Jun-20-2027-Wembley-Stadium | - |
| tm-sam-fender-2027-dublin-1avoz_fgkxvywdt | Sam Fender | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sam-fender-2027-edinburgh-1auzk4fgkd4qebt | Sam Fender | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sam-fender-2027-manchester-g5dzz_42lyjlw | Sam Fender | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sam-fender-2027-manchester-g5dzz_4k4turs | Sam Fender | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bon-jovi-2027-docklands-1aefz_fgkxe60v9 | Bon Jovi | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bon-jovi-2027-east-rutherford-k7vgf_4evgqwy | Bon Jovi | none | 8329063 | https://www.ticketliquidator.com/tickets/8329063/Bon-Jovi-tickets-Thu-Jul-15-2027-MetLife-Stadium | - |
| tm-bon-jovi-2027-chicago-vv178z_fgkh_n5td | Bon Jovi | none | 8329064 | https://www.ticketliquidator.com/tickets/8329064/Bon-Jovi-tickets-Wed-Jul-21-2027-Soldier-Field | - |
| tm-bon-jovi-2027-foxborough-vv1avzk48gke-15d8 | Bon Jovi | none | 8329065 | https://www.ticketliquidator.com/tickets/8329065/Bon-Jovi-tickets-Wed-Jul-28-2027-Gillette-Stadium | - |
| tm-bon-jovi-2027-toronto-1a8zk48je1zze8k | Bon Jovi | none | - | - | no qualifying listing (complete catalog checked) |
| tm-anuel-aa-2026-belmont-park-1ayzkffgkd4zfkj | Anuel AA | none | - | - | no qualifying listing (complete catalog checked) |
| tm-anuel-aa-2027-monterrey-g5dvz_6rcdk4r | Anuel AA | none | - | - | no qualifying listing (complete catalog checked) |
| tm-anuel-aa-2027-zapopan-g5dvz_6raf6md | Anuel AA | none | - | - | no qualifying listing (complete catalog checked) |
| tm-luke-bryan-2026-mescalero-vvg1yz_gw6bfly | Luke Bryan | none | 8259472 | https://www.ticketliquidator.com/tickets/8259472/Luke-Bryan-tickets-Sat-Dec-5-2026-Inn-Of-The-Mountain-Gods-Resort-Casino | - |
| tm-luke-bryan-2026-las-vegas-1avjz_agkws6gfv | Luke Bryan | none | 7922101 | https://www.ticketliquidator.com/tickets/7922101/Luke-Bryan-tickets-Fri-Dec-11-2026-Allegiant-Stadium | - |
| tm-billy-strings-2026-baltimore-1avfz_6gkm3naew | Billy Strings | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-billy-strings-2026-baltimore-1avfz_6gkmktg1d | Billy Strings | none | 7843522 | https://www.ticketliquidator.com/tickets/7843522/Billy-Strings-tickets-Sat-Oct-31-2026-CFG-Bank-Arena | - |
| tm-billy-strings-2026-new-orleans-g5viz_fhsj6zp | Billy Strings | none | 7843538 | https://www.ticketliquidator.com/tickets/7843538/Billy-Strings-tickets-Fri-Dec-4-2026-Saenger-Theatre-New-Orleans | - |
| tm-billy-strings-2026-new-orleans-g5viz_6n0bmge | Billy Strings | none | 7843524 | https://www.ticketliquidator.com/tickets/7843524/Billy-Strings-tickets-Sat-Dec-5-2026-Smoothie-King-Center | - |
| tm-billy-strings-2026-sugar-land-z7r9jz1a7xvj- | Billy Strings | none | - | - | no qualifying listing (complete catalog checked) |
| tm-billy-strings-2026-fort-worth-vvg1yz_6mc3yqf | Billy Strings | unverify (applied) | 7843525 | https://www.ticketliquidator.com/tickets/7843525/Billy-Strings-tickets-Fri-Dec-11-2026-Dickies-Arena | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-billy-strings-2026-austin-g5diz_ub5bart | Billy Strings | none | 8108535 | https://www.ticketliquidator.com/tickets/8108535/Billy-Strings-tickets-Sat-Dec-12-2026-Moody-Center-ATX | - |
| tm-billy-strings-2027-asheville-g5evz_omwlg3b | Billy Strings | none | - | - | no qualifying listing (complete catalog checked) |
| tm-billy-strings-2027-asheville-g5evz_omwlh3- | Billy Strings | none | - | - | no qualifying listing (complete catalog checked) |
| tm-billy-strings-2027-asheville-g5evz_omwig3e | Billy Strings | none | - | - | no qualifying listing (complete catalog checked) |
| tm-billy-strings-2027-asheville-g5evz_omwii3v | Billy Strings | none | - | - | no qualifying listing (complete catalog checked) |
| tm-billy-strings-2027-asheville-g5evz_omwcg3b | Billy Strings | none | - | - | no qualifying listing (complete catalog checked) |
| tm-billy-strings-2027-duluth-vvg1zz_oinx98f | Billy Strings | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-billy-strings-2027-duluth-vvg1zz_ointe8l | Billy Strings | none | 8238820 | https://www.ticketliquidator.com/tickets/8238820/Billy-Strings-tickets-Sat-Feb-13-2027-Gas-South-Arena | - |
| tm-billy-strings-2027-nashville-g5viz_on579po | Billy Strings | conflict | - | - | ambiguous: missing or conflicting performance start evidence |
| tm-billy-strings-2027-nashville-g5viz_on5a9pr | Billy Strings | none | 8238824 | https://www.ticketliquidator.com/tickets/8238824/Billy-Strings-tickets-Sat-Feb-20-2027-Bridgestone-Arena | - |
| tm-thirty-seconds-to-mars-2027-nurnberg-z698xzc2z16vqofzv8 | Thirty Seconds to Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-thirty-seconds-to-mars-2027-casalecchio-di-reno-bologna-zg9rmiynyzffde | Thirty Seconds to Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-thirty-seconds-to-mars-2027-praha-9-z698xzu0z1k788y-z | Thirty Seconds to Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-thirty-seconds-to-mars-2027-helsinki-z698xz8kz16v7so3fa | Thirty Seconds to Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-cristian-castro-2026-glendale-1a_zko8gkebja4t | Cristian Castro | add (applied) | 7744413 | https://www.ticketliquidator.com/tickets/7744413/Cristian-Castro-tickets-Fri-Nov-6-2026-Desert-Diamond-Arena | - |
| tm-cristian-castro-2026-el-paso-vvg1yz_adzeyjf | Cristian Castro | add (applied) | 7744415 | https://www.ticketliquidator.com/tickets/7744415/Cristian-Castro-tickets-Sat-Nov-7-2026-El-Paso-County-Coliseum | - |
| tm-cristian-castro-2026-san-diego-z7r9jz1a7-80a | Cristian Castro | add (applied) | 7746197 | https://www.ticketliquidator.com/tickets/7746197/Cristian-Castro-tickets-Fri-Nov-27-2026-Pechanga-Arena-San-Diego | - |
| tm-cristian-castro-2026-los-angeles-z7r9jz1a7-f4v | Cristian Castro | none | - | - | no qualifying listing (complete catalog checked) |
| tm-cristian-castro-2027-denver-z7r9jz1a7-boz | Cristian Castro | add (applied) | 7757487 | https://www.ticketliquidator.com/tickets/7757487/Cristian-Castro-tickets-Fri-Jan-29-2027-Bellco-Theatre | - |
| tm-cristian-castro-2027-west-valley-city-g5vzz_aklolqq | Cristian Castro | none | - | - | no qualifying listing (complete catalog checked) |
| tm-cristian-castro-2027-anaheim-vv1aazkofgkeidrym | Cristian Castro | add (applied) | 7757473 | https://www.ticketliquidator.com/tickets/7757473/Cristian-Castro-tickets-Fri-Feb-12-2027-Honda-Center | - |
| tm-cristian-castro-2027-palm-desert-vvg1iz_1h-rylv | Cristian Castro | none | - | - | no qualifying listing (complete catalog checked) |
| tm-cristian-castro-2027-hidalgo-g5diz_a2dt_o4 | Cristian Castro | add (applied) | 7756937 | https://www.ticketliquidator.com/tickets/7756937/Cristian-Castro-tickets-Sat-Feb-27-2027-Payne-Arena | - |
| tm-cristian-castro-2027-cedar-park-g5diz_ak4-aew | Cristian Castro | none | - | - | no qualifying listing (complete catalog checked) |
| tm-cristian-castro-2027-orlando-1kfov0fzgac5wgd | Cristian Castro | add (applied) | 7756941 | https://www.ticketliquidator.com/tickets/7756941/Cristian-Castro-tickets-Fri-Mar-12-2027-Addition-Financial-Arena | - |
| tm-cristian-castro-2027-miami-vvg1vz_aphhc62 | Cristian Castro | add (applied) | 7756942 | https://www.ticketliquidator.com/tickets/7756942/Cristian-Castro-tickets-Sat-Mar-13-2027-James-L-Knight-Center | - |
| tm-treaty-oak-revival-2026-corpus-christi-z7r9jz1a70e78 | Treaty Oak Revival | add (applied) | 7944777 | https://www.ticketliquidator.com/tickets/7944777/Treaty-Oak-Revival-tickets-Thu-Oct-29-2026-Concrete-Street-Amphitheater | - |
| tm-treaty-oak-revival-2026-austin-g5diz_19twyeh | Treaty Oak Revival | add (applied) | 7944768 | https://www.ticketliquidator.com/tickets/7944768/Treaty-Oak-Revival-tickets-Thu-Nov-12-2026-Moody-Center-ATX | - |
| tm-treaty-oak-revival-2026-the-woodlands-g5diz_1panpuq | Treaty Oak Revival | none | - | - | no qualifying listing (complete catalog checked) |
| tm-treaty-oak-revival-2026-tulsa-1aezz_3x88ozdgea | Treaty Oak Revival | add (applied) | 8264458 | https://www.ticketliquidator.com/tickets/8264458/Treaty-Oak-Revival-tickets-Sat-Nov-21-2026-BOK-Center | - |
| tm-boyz-ii-men-2026-waurn-ponds-177yv0g6cqczn9y | Boyz II Men | none | - | - | no qualifying listing (complete catalog checked) |
| tm-boyz-ii-men-2026-auckland-17azv0g6c2evn3t | Boyz II Men | add (applied) | 8173275 | https://www.ticketliquidator.com/tickets/8173275/Boyz-II-Men-tickets-Tue-Dec-1-2026-Spark-Arena | - |
| tm-boyz-ii-men-2026-pokolbin-177yv0g6cro9xjr | Boyz II Men | none | - | - | no qualifying listing (complete catalog checked) |
| tm-boyz-ii-men-2026-mount-cotton-177yv0g6chtbuni | Boyz II Men | none | - | - | no qualifying listing (complete catalog checked) |
| tm-boyz-ii-men-2026-norman-z7r9jz1aaed_y | Boyz II Men | add (applied) | 8234392 | https://www.ticketliquidator.com/tickets/8234392/Boyz-II-Men-tickets-Fri-Dec-18-2026-Showplace-Theatre-At-Riverwind-Casino | - |
| tm-boyz-ii-men-2026-thackerville-z7r9jz1a70-f8 | Boyz II Men | none | - | - | no qualifying listing (complete catalog checked) |
| tm-boyz-ii-men-2027-boston-vv1avzk4egkdp6cdw | Boyz II Men | add (applied) | 8318130 | https://www.ticketliquidator.com/tickets/8318130/Boyz-II-Men-tickets-Fri-Feb-5-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-boyz-ii-men-2027-atlantic-city-vv1kfz_fbxg7mvlj | Boyz II Men | add (applied) | 8318131 | https://www.ticketliquidator.com/tickets/8318131/Boyz-II-Men-tickets-Sat-Feb-6-2027-Borgata-Event-Center | - |
| tm-boyz-ii-men-2027-national-harbor-1ka8vp3aga5lj2s | Boyz II Men | add (applied) | 8318132 | https://www.ticketliquidator.com/tickets/8318132/Boyz-II-Men-tickets-Thu-Feb-11-2027-The-Theater-at-MGM-National-Harbor | - |
| tm-boyz-ii-men-2027-national-harbor-1ka8vp3aga5ij2m | Boyz II Men | add (applied) | 8318133 | https://www.ticketliquidator.com/tickets/8318133/Boyz-II-Men-tickets-Fri-Feb-12-2027-The-Theater-at-MGM-National-Harbor | - |
| tm-boyz-ii-men-2027-national-harbor-1ka8vp3aga5cu2t | Boyz II Men | add (applied) | 8318134 | https://www.ticketliquidator.com/tickets/8318134/Boyz-II-Men-tickets-Sat-Feb-13-2027-The-Theater-at-MGM-National-Harbor | - |
| tm-boyz-ii-men-2027-las-vegas-1kayvp7mgaglg6h | Boyz II Men | add (applied) | 8231600 | https://www.ticketliquidator.com/tickets/8231600/Boyz-II-Men-tickets-Fri-Mar-12-2027-The-Chelsea-The-Cosmopolitan-of-Las-Vegas | - |
| tm-boyz-ii-men-2027-las-vegas-1kayvp7mgag-4fc | Boyz II Men | add (applied) | 8231601 | https://www.ticketliquidator.com/tickets/8231601/Boyz-II-Men-tickets-Sat-Mar-13-2027-The-Chelsea-The-Cosmopolitan-of-Las-Vegas | - |
| tm-boyz-ii-men-2027-las-vegas-1kayvp7mgagn4f9 | Boyz II Men | add (applied) | 8231602 | https://www.ticketliquidator.com/tickets/8231602/Boyz-II-Men-tickets-Fri-Mar-19-2027-The-Chelsea-The-Cosmopolitan-of-Las-Vegas | - |
| tm-boyz-ii-men-2027-las-vegas-1kayvp7mgag0pfj | Boyz II Men | add (applied) | 8231603 | https://www.ticketliquidator.com/tickets/8231603/Boyz-II-Men-tickets-Sat-Mar-20-2027-The-Chelsea-The-Cosmopolitan-of-Las-Vegas | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw4juo | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwppux | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwpuu0 | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw9jut | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwbkui | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwbuur | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw_pus | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwqkuv | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwqjuu | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwhpuz | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwhuub | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwjjc1 | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwqpcc | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwrkco | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwlkck | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2027-sunrise-z7r9jz1a7ji0e | Barry Manilow | add (applied) | 7425008 | https://www.ticketliquidator.com/tickets/7425008/Barry-Manilow-tickets-Fri-Jan-15-2027-Amerant-Bank-Arena | - |
| tm-barry-manilow-2027-estero-vvg1vzbwhe6k-q | Barry Manilow | add (applied) | 7425011 | https://www.ticketliquidator.com/tickets/7425011/Barry-Manilow-tickets-Sat-Jan-16-2027-Hertz-Arena | - |
| tm-barry-manilow-2027-estero-vvg1vzbwhe6n-j | Barry Manilow | add (applied) | 7425012 | https://www.ticketliquidator.com/tickets/7425012/Barry-Manilow-tickets-Sun-Jan-17-2027-Hertz-Arena | - |
| tm-barry-manilow-2027-tampa-vvg1vzbsept-t8 | Barry Manilow | add (applied) | 7425010 | https://www.ticketliquidator.com/tickets/7425010/Barry-Manilow-tickets-Wed-Jan-20-2027-Benchmark-International-Arena | - |
| tm-barry-manilow-2027-orlando-1aefzbwgksczswf | Barry Manilow | add (applied) | 7425009 | https://www.ticketliquidator.com/tickets/7425009/Barry-Manilow-tickets-Thu-Jan-21-2027-Kia-Center | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dw5kgq | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dw5ugn | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dwupgi | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dwuugv | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dwcjgy | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dw2kgd | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dw2ugw | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dw8pgt | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dwokuv | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2027-las-vegas-1avjz_3gkroi64s | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2027-las-vegas-1avjz_3gkrocmpa | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-barry-manilow-2027-las-vegas-1avjz_3gkrorept | Barry Manilow | none | - | - | no qualifying listing (complete catalog checked) |
| tm-koe-wetzel-2026-morrison-z7r9jz1a7-0gf | Koe Wetzel | add (applied) | 7764123 | https://www.ticketliquidator.com/tickets/7764123/Koe-Wetzel-tickets-Wed-Oct-28-2026-Red-Rocks-Amphitheatre | - |
| tm-koe-wetzel-2026-lubbock-z7r9jz1a7-jaw | Koe Wetzel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-koe-wetzel-2026-helotes-z7r9jz1aaebqp | Koe Wetzel | add (applied) | 8307857 | https://www.ticketliquidator.com/tickets/8307857/Koe-Wetzel-tickets-Wed-Dec-2-2026-John-T-Floore-Country-Store | - |
| tm-koe-wetzel-2026-corpus-christi-z7r9jz1aaebqk | Koe Wetzel | add (applied) | 8307858 | https://www.ticketliquidator.com/tickets/8307858/Koe-Wetzel-tickets-Fri-Dec-4-2026-Concrete-Street-Amphitheater | - |
| tm-koe-wetzel-2026-round-rock-z7r9jz1aaeb-n | Koe Wetzel | add (applied) | 8307859 | https://www.ticketliquidator.com/tickets/8307859/Koe-Wetzel-tickets-Sat-Dec-5-2026-Round-Rock-Amp | - |
| tm-koe-wetzel-2026-fort-worth-z7r9jz1aa7evf | Koe Wetzel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-koe-wetzel-2026-fort-worth-z7r9jz1aa7vfe | Koe Wetzel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-koe-wetzel-2026-las-vegas-1ayzkfkgkdtup_a | Koe Wetzel | add (applied) | 8194341 | https://www.ticketliquidator.com/tickets/8194341/Koe-Wetzel-tickets-Fri-Dec-11-2026-PH-Live-At-Planet-Hollywood | - |
| tm-victoria-monet-2026-houston-g5diz_33ccqfw | Victoria Monet | add (applied) | 8258101 | https://www.ticketliquidator.com/tickets/8258101/Victoria-Monet-tickets-Sat-Oct-31-2026-713-Music-Hall | - |
| tm-victoria-monet-2026-dallas-vvg1yz_3n9clqe | Victoria Monet | add (applied) | 8258102 | https://www.ticketliquidator.com/tickets/8258102/Victoria-Monet-tickets-Mon-Nov-2-2026-South-Side-Ballroom-at-Gilleys | - |
| tm-victoria-monet-2026-atlanta-z7r9jz1aavpbj | Victoria Monet | add (applied) | 8258103 | https://www.ticketliquidator.com/tickets/8258103/Victoria-Monet-tickets-Wed-Nov-4-2026-Fabulous-Fox-Theatre-Atlanta | - |
| tm-victoria-monet-2026-charlotte-g5evz_3nkdbni | Victoria Monet | none | - | - | no qualifying listing (complete catalog checked) |
| tm-victoria-monet-2026-fort-lauderdale-z7r9jz1aavpbe | Victoria Monet | none | - | - | no qualifying listing (complete catalog checked) |
| tm-victoria-monet-2026-tampa-vvg1vz_3nvhqgr | Victoria Monet | add (applied) | 8258105 | https://www.ticketliquidator.com/tickets/8258105/Victoria-Monet-tickets-Sun-Nov-8-2026-The-Yuengling-Center | - |
| tm-victoria-monet-2026-philadelphia-vv1aezkfxgkegbvoj | Victoria Monet | add (applied) | 8258106 | https://www.ticketliquidator.com/tickets/8258106/Victoria-Monet-tickets-Thu-Nov-12-2026-The-Met-Presented-by-Highmark | - |
| tm-victoria-monet-2026-boston-vv1avzkfpgkdybxe- | Victoria Monet | add (applied) | 8258107 | https://www.ticketliquidator.com/tickets/8258107/Victoria-Monet-tickets-Fri-Nov-13-2026-MGM-Music-Hall-at-Fenway-Park | - |
| tm-victoria-monet-2026-detroit-vv1afzkfegkdcyvij | Victoria Monet | add (applied) | 8258108 | https://www.ticketliquidator.com/tickets/8258108/Victoria-Monet-tickets-Sun-Nov-15-2026-Fox-Theatre-Detroit | - |
| tm-victoria-monet-2026-milwaukee-vv1kjz_3f4g7vnwv | Victoria Monet | add (applied) | 8258109 | https://www.ticketliquidator.com/tickets/8258109/Victoria-Monet-tickets-Mon-Nov-16-2026-Landmark-Credit-Union-Live | - |
| tm-victoria-monet-2026-chicago-vv1k8z_3bag7xjoo | Victoria Monet | add (applied) | 8258110 | https://www.ticketliquidator.com/tickets/8258110/Victoria-Monet-tickets-Wed-Nov-18-2026-Byline-Bank-Aragon-Ballroom | - |
| tm-victoria-monet-2026-toronto-1a8zkf-gkdrpzii | Victoria Monet | none | - | - | no qualifying listing (complete catalog checked) |
| tm-victoria-monet-2026-pittsburgh-1apzkftgkexngtr | Victoria Monet | add (applied) | 8258111 | https://www.ticketliquidator.com/tickets/8258111/Victoria-Monet-tickets-Sun-Nov-22-2026-Citizens-Live-at-The-Wylie | - |
| tm-victoria-monet-2026-new-york-g5diz_3c1vwav | Victoria Monet | add (applied) | 8258112 | https://www.ticketliquidator.com/tickets/8258112/Victoria-Monet-tickets-Tue-Nov-24-2026-Infosys-Theater-at-Madison-Square-Garden | - |
| tm-victoria-monet-2026-washington-1a4zkfigkeu6i0b | Victoria Monet | add (applied) | 8258113 | https://www.ticketliquidator.com/tickets/8258113/Victoria-Monet-tickets-Fri-Nov-27-2026-The-Anthem-DC | - |
| tm-victoria-monet-2026-nashville-g5viz_3rdnbd2 | Victoria Monet | add (applied) | 8258114 | https://www.ticketliquidator.com/tickets/8258114/Victoria-Monet-tickets-Mon-Nov-30-2026-The-Truth | - |
| tm-victoria-monet-2026-austin-z7r9jz1aavpbs | Victoria Monet | none | - | - | no qualifying listing (complete catalog checked) |
| tm-victoria-monet-2026-phoenix-1fk8vpadufz7ccuc | Victoria Monet | add (applied) | 8258116 | https://www.ticketliquidator.com/tickets/8258116/Victoria-Monet-tickets-Sat-Dec-5-2026-Arizona-Financial-Theatre | - |
| tm-victoria-monet-2026-san-diego-vvg1iz_32hzdgh | Victoria Monet | add (applied) | 8258117 | https://www.ticketliquidator.com/tickets/8258117/Victoria-Monet-tickets-Sun-Dec-6-2026-Cal-Coast-Credit-Union-Open-Air-Theatre | - |
| tm-victoria-monet-2026-inglewood-vvg1iz_3xv_aba | Victoria Monet | add (applied) | 8258118 | https://www.ticketliquidator.com/tickets/8258118/Victoria-Monet-tickets-Tue-Dec-8-2026-YouTube-Theater-at-Hollywood-Park | - |
| tm-victoria-monet-2026-las-vegas-1avjz_38nr4zdcac | Victoria Monet | add (applied) | 8258119 | https://www.ticketliquidator.com/tickets/8258119/Victoria-Monet-tickets-Wed-Dec-9-2026-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-victoria-monet-2026-vancouver-1aozkf0gkdm521c | Victoria Monet | add (applied) | 8258123 | https://www.ticketliquidator.com/tickets/8258123/Victoria-Monet-tickets-Sat-Dec-12-2026-UBC-Doug-Mitchell-Thunderbird-Sports-Centre | - |
| tm-victoria-monet-2026-seattle-vvg1hz_31fteps | Victoria Monet | add (applied) | 8258120 | https://www.ticketliquidator.com/tickets/8258120/Victoria-Monet-tickets-Mon-Dec-14-2026-Wamu-Theater-At-Lumen-Field-Event-Center | - |
| tm-victoria-monet-2026-sacramento-g5vyz_3xulwgw | Victoria Monet | add (applied) | 8258121 | https://www.ticketliquidator.com/tickets/8258121/Victoria-Monet-tickets-Wed-Dec-16-2026-Sacramento-Memorial-Auditorium | - |
| tm-victoria-monet-2026-san-francisco-g5vyz_320sgvq | Victoria Monet | add (applied) | 8259524 | https://www.ticketliquidator.com/tickets/8259524/Victoria-Monet-tickets-Thu-Dec-17-2026-Bill-Graham-Civic-Auditorium | - |
| tm-jon-pardi-2026-biloxi-g5viz_ctexxwa | Jon Pardi | add (applied) | 8149211 | https://www.ticketliquidator.com/tickets/8149211/Jon-Pardi-tickets-Thu-Oct-29-2026-Mississippi-Coast-Coliseum | - |
| tm-jon-pardi-2026-macon-vvg1zz_cbiziyi | Jon Pardi | add (applied) | 8149210 | https://www.ticketliquidator.com/tickets/8149210/Jon-Pardi-tickets-Fri-Oct-30-2026-Atrium-Health-Amphitheater | - |
| tm-jon-pardi-2026-laredo-g5diz_ctprcyh | Jon Pardi | add (applied) | 8149214 | https://www.ticketliquidator.com/tickets/8149214/Jon-Pardi-tickets-Thu-Nov-5-2026-Sames-Auto-Arena | - |
| tm-jon-pardi-2026-corpus-christi-z7r9jz1aazdpk | Jon Pardi | add (applied) | 8149243 | https://www.ticketliquidator.com/tickets/8149243/Jon-Pardi-tickets-Fri-Nov-6-2026-Concrete-Street-Amphitheater | - |
| tm-jon-pardi-2026-round-rock-z7r9jz1aazd8o | Jon Pardi | add (applied) | 8149248 | https://www.ticketliquidator.com/tickets/8149248/Jon-Pardi-tickets-Sat-Nov-7-2026-Round-Rock-Amp | - |
| tm-jon-pardi-2026-cedar-rapids-vvg1bz_ctazgrx | Jon Pardi | add (applied) | 8149215 | https://www.ticketliquidator.com/tickets/8149215/Jon-Pardi-tickets-Thu-Nov-12-2026-Alliant-Energy-PowerHouse | - |
| tm-jon-pardi-2026-peoria-vvg1jz_cjyd3ia | Jon Pardi | add (applied) | 8149216 | https://www.ticketliquidator.com/tickets/8149216/Jon-Pardi-tickets-Fri-Nov-13-2026-Carver-Arena-At-Peoria-Civic-Center | - |
| tm-jon-pardi-2026-independence-vvg1bz_cu03zzw | Jon Pardi | add (applied) | 8149217 | https://www.ticketliquidator.com/tickets/8149217/Jon-Pardi-tickets-Sat-Nov-14-2026-Cable-Dahmer-Arena | - |
| tm-jon-pardi-2026-saint-louis-16e7z_obyg7v9-3 | Jon Pardi | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jon-pardi-2027-durant-vvg1yz_ksrbiue | Jon Pardi | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jon-pardi-2027-nampa-z7r9jz1aazeqe | Jon Pardi | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jon-pardi-2027-loveland-z7r9jz1aazeb3 | Jon Pardi | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jon-pardi-2027-west-valley-city-g5vzz_2evjpcf | Jon Pardi | none | - | - | no qualifying listing (complete catalog checked) |
| tm-brandi-carlile-2026-portland-z7r9jz1aaea4m | Brandi Carlile | add (applied) | 8293661 | https://www.ticketliquidator.com/tickets/8293661/Brandi-Carlile-tickets-Thu-Nov-5-2026-Revolution-Hall-Portland | - |
| tm-brandi-carlile-2026-oakland-g5vyz_k55sumi | Brandi Carlile | add (applied) | 8293180 | https://www.ticketliquidator.com/tickets/8293180/Brandi-Carlile-tickets-Sat-Nov-7-2026-Fox-Theater-Oakland | - |
| tm-brandi-carlile-2026-tucson-1a_zkfygkdorlne | Brandi Carlile | add (applied) | 8293181 | https://www.ticketliquidator.com/tickets/8293181/Brandi-Carlile-tickets-Mon-Nov-9-2026-Rialto-Theatre-Tucson | - |
| tm-brandi-carlile-2026-tucson-1a_zkfygkdoyl04 | Brandi Carlile | add (applied) | 8293182 | https://www.ticketliquidator.com/tickets/8293182/Brandi-Carlile-tickets-Tue-Nov-10-2026-Rialto-Theatre-Tucson | - |
| tm-brandi-carlile-2026-milwaukee-z7r9jz1aaeajv | Brandi Carlile | add (applied) | 8293191 | https://www.ticketliquidator.com/tickets/8293191/Brandi-Carlile-tickets-Sat-Nov-14-2026-Pabst-Theater | - |
| tm-brandi-carlile-2026-milwaukee-z7r9jz1aaeaje | Brandi Carlile | add (applied) | 8293192 | https://www.ticketliquidator.com/tickets/8293192/Brandi-Carlile-tickets-Sun-Nov-15-2026-Pabst-Theater | - |
| tm-brandi-carlile-2026-minneapolis-vv1akzkfmgkdnqpgx | Brandi Carlile | add (applied) | 8293183 | https://www.ticketliquidator.com/tickets/8293183/Brandi-Carlile-tickets-Tue-Nov-17-2026-State-Theatre-MN | - |
| tm-brandi-carlile-2026-minneapolis-vv1akzkfmgkdnrguf | Brandi Carlile | add (applied) | 8293184 | https://www.ticketliquidator.com/tickets/8293184/Brandi-Carlile-tickets-Wed-Nov-18-2026-State-Theatre-MN | - |
| tm-brandi-carlile-2026-louisville-1apzkfugkdjvl2t | Brandi Carlile | none | - | - | no qualifying listing (complete catalog checked) |
| tm-brandi-carlile-2026-louisville-1apzkfugkdjal8x | Brandi Carlile | none | - | - | no qualifying listing (complete catalog checked) |
| tm-brandi-carlile-2026-kansas-city-vv1akzkfzgkd6vlxs | Brandi Carlile | add (applied) | 8293193 | https://www.ticketliquidator.com/tickets/8293193/Brandi-Carlile-tickets-Sun-Nov-22-2026-Uptown-Theater-KC | - |
| tm-brandi-carlile-2026-port-chester-g5vvz_kx-skxh | Brandi Carlile | none | - | - | no qualifying listing (complete catalog checked) |
| tm-brandi-carlile-2026-port-chester-g5vvz_kx-vnxl | Brandi Carlile | none | - | - | no qualifying listing (complete catalog checked) |
| tm-brandi-carlile-2026-port-chester-g5vvz_kx-gsxn | Brandi Carlile | none | - | - | no qualifying listing (complete catalog checked) |
| tm-brandi-carlile-2027-seattle-vvg1hz_44goz5b | Brandi Carlile | none | - | - | no qualifying listing (complete catalog checked) |
| tm-brandi-carlile-2027-seattle-vvg1hz_44gxf5- | Brandi Carlile | none | - | - | no qualifying listing (complete catalog checked) |
| tm-brandi-carlile-2027-seattle-vvg1hz_44gnb5t | Brandi Carlile | none | - | - | no qualifying listing (complete catalog checked) |
| tm-brandi-carlile-2027-seattle-vvg1hz_44g0z5w | Brandi Carlile | none | - | - | no qualifying listing (complete catalog checked) |
| tm-brandi-carlile-2027-dublin-1abzku4gkdpubm4 | Brandi Carlile | add (applied) | 8248298 | https://www.ticketliquidator.com/tickets/8248298/Brandi-Carlile-tickets-Sun-Apr-4-2027-3Arena-Dublin | - |
| tm-brandi-carlile-2027-glasgow-16dbz_8p8g7is9u | Brandi Carlile | none | - | - | no qualifying listing (complete catalog checked) |
| tm-brandi-carlile-2027-glasgow-1auzkfagkeeywvx | Brandi Carlile | none | - | - | no qualifying listing (complete catalog checked) |
| tm-brandi-carlile-2027-manchester-16dbz_8qkg7xvln | Brandi Carlile | none | - | - | no qualifying listing (complete catalog checked) |
| tm-brandi-carlile-2027-manchester-1auzkfkgkd0yvnl | Brandi Carlile | none | - | - | no qualifying listing (complete catalog checked) |
| tm-brandi-carlile-2027-wolverhampton-g5vhz_8ni4sv1 | Brandi Carlile | none | - | - | no qualifying listing (complete catalog checked) |
| tm-brandi-carlile-2027-london-16dbz_8rdg7g-dj | Brandi Carlile | none | - | - | no qualifying listing (complete catalog checked) |
| tm-brandi-carlile-2027-london-16uzkf6-7za5ev8a | Brandi Carlile | none | - | - | no qualifying listing (complete catalog checked) |
| tm-andrea-bocelli-2027-praha-9-z698xzu0z1k3k74-f | Andrea Bocelli | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blondshell-2027-columbus-z7r9jz1aaeogk | Blondshell | add (applied) | 8295790 | https://www.ticketliquidator.com/tickets/8295790/Blondshell-tickets-Thu-May-20-2027-Newport-Music-Hall | - |
| tm-sienna-spiro-2027-morrison-z7r9jz1aa7-1d | Sienna Spiro | add (applied) | 8332358 | https://www.ticketliquidator.com/tickets/8332358/Sienna-Spiro-tickets-Mon-Aug-30-2027-Red-Rocks-Amphitheatre | - |
| tm-the-red-clay-strays-2027-bend-vvg1hz_kwvcqcl | The Red Clay Strays | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2027-columbus-z7r9jz1aa7_pz | Mico | add (applied) | 8315360 | https://www.ticketliquidator.com/tickets/8315360/Mico-tickets-Wed-Mar-10-2027-Newport-Music-Hall | - |
| tm-santana-2027-london-1agzk4pgkemmuru | Santana | none | - | - | no qualifying listing (complete catalog checked) |
| tm-santana-2027-krakow-z698xzqpz16va4pvo4 | Santana | none | - | - | no qualifying listing (complete catalog checked) |
| tm-santana-2027-oslo-z698xzb_z16v43vmbv | Santana | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mana-2027-highland-z7r9jz1aa7ngx | MANA | add (applied) | 8334766 | https://www.ticketliquidator.com/tickets/8334766/Mana-tickets-Tue-Apr-6-2027-Yaamava-Theater-at-Yaamava-Resort-Casino | - |
| tm-mana-2027-highland-z7r9jz1aa7x_k | MANA | add (applied) | 8334767 | https://www.ticketliquidator.com/tickets/8334767/Mana-tickets-Thu-Apr-8-2027-Yaamava-Theater-at-Yaamava-Resort-Casino | - |
| tm-mana-2027-highland-z7r9jz1aa7x_7 | MANA | add (applied) | 8334768 | https://www.ticketliquidator.com/tickets/8334768/Mana-tickets-Sun-Apr-11-2027-Yaamava-Theater-at-Yaamava-Resort-Casino | - |
| tm-mana-2027-highland-z7r9jz1aa7x_6 | MANA | add (applied) | 8334769 | https://www.ticketliquidator.com/tickets/8334769/Mana-tickets-Wed-Sep-1-2027-Yaamava-Theater-at-Yaamava-Resort-Casino | - |
| tm-mana-2027-highland-z7r9jz1aa7ng- | MANA | add (applied) | 8334770 | https://www.ticketliquidator.com/tickets/8334770/Mana-tickets-Thu-Sep-2-2027-Yaamava-Theater-at-Yaamava-Resort-Casino | - |
| tm-mana-2027-highland-z7r9jz1aa7x_a | MANA | add (applied) | 8334771 | https://www.ticketliquidator.com/tickets/8334771/Mana-tickets-Mon-Sep-6-2027-Yaamava-Theater-at-Yaamava-Resort-Casino | - |
| tm-turnpike-troubadours-2027-morrison-z7r9jz1aa7_ae | Turnpike Troubadours | add (applied) | 8329462 | https://www.ticketliquidator.com/tickets/8329462/Turnpike-Troubadours-tickets-Thu-May-13-2027-Red-Rocks-Amphitheatre | - |
| tm-turnpike-troubadours-2027-morrison-z7r9jz1aa7_av | Turnpike Troubadours | add (applied) | 8329463 | https://www.ticketliquidator.com/tickets/8329463/Turnpike-Troubadours-tickets-Fri-May-14-2027-Red-Rocks-Amphitheatre | - |
