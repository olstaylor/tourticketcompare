# Ticket Liquidator event sync log

Generated: 2026-11-27T22:14:51.575Z

Written by `scripts/sync-impact-marketplace-events.mjs`. One Impact catalog
fetch per registry-verified artist; a link is written only for one
unambiguous listing whose artist, venue, city and venue-local date all agree.
`scripts/report-link-coverage.mjs` reads the notes column as coverage evidence.

## Run summary

- Mode: apply
- Events selected: 4482
- API calls made: 738
- Verified provenance written: 0
- Verified dates refreshed (link re-confirmed against the live listing): 3447
- URLs added: 23
- URLs corrected: 75
- URLs cleared: 0
- Provenance un-verified: 5
- Conflicts (ambiguous, untouched): 4
- No qualifying listing (complete catalog): 933
- Not checked (catalog incomplete): 0

## Outcomes

| showId | artist | action | Ticket Liquidator id | url | notes |
| --- | --- | --- | --- | --- | --- |
| tm-olivia-rodrigo-2026-vancouver-1av7z_agkueipzb | Olivia Rodrigo | refresh (applied) | 7921691 | https://www.ticketliquidator.com/tickets/7921691/Olivia-Rodrigo-tickets-Tue-Dec-1-2026-Rogers-Arena | - |
| tm-olivia-rodrigo-2026-vancouver-1av7z_agkueckzj | Olivia Rodrigo | refresh (applied) | 7921692 | https://www.ticketliquidator.com/tickets/7921692/Olivia-Rodrigo-tickets-Wed-Dec-2-2026-Rogers-Arena | - |
| tm-olivia-rodrigo-2026-seattle-vvg1hz_amovxty | Olivia Rodrigo | refresh (applied) | 7921671 | https://www.ticketliquidator.com/tickets/7921671/Olivia-Rodrigo-tickets-Mon-Dec-7-2026-Climate-Pledge-Arena | - |
| tm-olivia-rodrigo-2026-seattle-vvg1hz_amegpa1 | Olivia Rodrigo | refresh (applied) | 7921672 | https://www.ticketliquidator.com/tickets/7921672/Olivia-Rodrigo-tickets-Tue-Dec-8-2026-Climate-Pledge-Arena | - |
| tm-olivia-rodrigo-2026-oakland-g5vyz_ambko0b | Olivia Rodrigo | refresh (applied) | 7921673 | https://www.ticketliquidator.com/tickets/7921673/Olivia-Rodrigo-tickets-Fri-Dec-11-2026-Oakland-Arena | - |
| tm-olivia-rodrigo-2026-oakland-g5vyz_ambfsp1 | Olivia Rodrigo | refresh (applied) | 7921674 | https://www.ticketliquidator.com/tickets/7921674/Olivia-Rodrigo-tickets-Sat-Dec-12-2026-Oakland-Arena | - |
| tm-olivia-rodrigo-2026-sacramento-g5vyz_awltsfi | Olivia Rodrigo | refresh (applied) | 7921675 | https://www.ticketliquidator.com/tickets/7921675/Olivia-Rodrigo-tickets-Tue-Dec-15-2026-Golden-1-Center | - |
| tm-olivia-rodrigo-2026-sacramento-g5vyz_awlnnfy | Olivia Rodrigo | refresh (applied) | 7921676 | https://www.ticketliquidator.com/tickets/7921676/Olivia-Rodrigo-tickets-Wed-Dec-16-2026-Golden-1-Center | - |
| tm-olivia-rodrigo-2026-las-vegas-z7r9jz1a706kk | Olivia Rodrigo | refresh (applied) | 7921677 | https://www.ticketliquidator.com/tickets/7921677/Olivia-Rodrigo-tickets-Sat-Dec-19-2026-T-Mobile-Arena | - |
| tm-olivia-rodrigo-2026-las-vegas-z7r9jz1a706kf | Olivia Rodrigo | refresh (applied) | 7921678 | https://www.ticketliquidator.com/tickets/7921678/Olivia-Rodrigo-tickets-Sun-Dec-20-2026-T-Mobile-Arena | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmesjcw | Olivia Rodrigo | refresh (applied) | 7921679 | https://www.ticketliquidator.com/tickets/7921679/Olivia-Rodrigo-tickets-Tue-Jan-12-2027-Intuit-Dome | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmetj8b | Olivia Rodrigo | refresh (applied) | 7921680 | https://www.ticketliquidator.com/tickets/7921680/Olivia-Rodrigo-tickets-Wed-Jan-13-2027-Intuit-Dome | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmikkku | Olivia Rodrigo | refresh (applied) | 7921681 | https://www.ticketliquidator.com/tickets/7921681/Olivia-Rodrigo-tickets-Sat-Jan-16-2027-Intuit-Dome | - |
| tm-olivia-rodrigo-2027-inglewood-vv170z_agkmijp45 | Olivia Rodrigo | refresh (applied) | 7921682 | https://www.ticketliquidator.com/tickets/7921682/Olivia-Rodrigo-tickets-Sun-Jan-17-2027-Intuit-Dome | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mjrpr | Olivia Rodrigo | refresh (applied) | 7939456 | https://www.ticketliquidator.com/tickets/7939456/Olivia-Rodrigo-tickets-Wed-Jan-20-2027-Intuit-Dome | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mtrph | Olivia Rodrigo | refresh (applied) | 7940735 | https://www.ticketliquidator.com/tickets/7940735/Olivia-Rodrigo-tickets-Thu-Jan-21-2027-Intuit-Dome | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mirjo | Olivia Rodrigo | refresh (applied) | 7940980 | https://www.ticketliquidator.com/tickets/7940980/Olivia-Rodrigo-tickets-Sun-Jan-24-2027-Intuit-Dome | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mrtjd | Olivia Rodrigo | refresh (applied) | 7943084 | https://www.ticketliquidator.com/tickets/7943084/Olivia-Rodrigo-tickets-Mon-Jan-25-2027-Intuit-Dome | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mwte- | Olivia Rodrigo | refresh (applied) | 7946756 | https://www.ticketliquidator.com/tickets/7946756/Olivia-Rodrigo-tickets-Thu-Jan-28-2027-Intuit-Dome | - |
| tm-olivia-rodrigo-2027-inglewood-vvg10z_13mzliq | Olivia Rodrigo | refresh (applied) | 7946757 | https://www.ticketliquidator.com/tickets/7946757/Olivia-Rodrigo-tickets-Fri-Jan-29-2027-Intuit-Dome | - |
| tm-olivia-rodrigo-2027-brooklyn-1ayzk39gkdwvwfq | Olivia Rodrigo | refresh (applied) | 7921683 | https://www.ticketliquidator.com/tickets/7921683/Olivia-Rodrigo-tickets-Thu-Feb-11-2027-Barclays-Center | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkv43gjn | Olivia Rodrigo | refresh (applied) | 7921684 | https://www.ticketliquidator.com/tickets/7921684/Olivia-Rodrigo-tickets-Fri-Feb-12-2027-Barclays-Center | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkv44jjl | Olivia Rodrigo | refresh (applied) | 7921685 | https://www.ticketliquidator.com/tickets/7921685/Olivia-Rodrigo-tickets-Mon-Feb-15-2027-Barclays-Center | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkv49hjs | Olivia Rodrigo | refresh (applied) | 7921686 | https://www.ticketliquidator.com/tickets/7921686/Olivia-Rodrigo-tickets-Tue-Feb-16-2027-Barclays-Center | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwvwpx | Olivia Rodrigo | refresh (applied) | 7939015 | https://www.ticketliquidator.com/tickets/7939015/Olivia-Rodrigo-tickets-Fri-Feb-19-2027-Barclays-Center | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwdwpi | Olivia Rodrigo | refresh (applied) | 7940856 | https://www.ticketliquidator.com/tickets/7940856/Olivia-Rodrigo-tickets-Sat-Feb-20-2027-Barclays-Center | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwkupi | Olivia Rodrigo | refresh (applied) | 7942121 | https://www.ticketliquidator.com/tickets/7942121/Olivia-Rodrigo-tickets-Tue-Feb-23-2027-Barclays-Center | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwfupw | Olivia Rodrigo | refresh (applied) | 7942272 | https://www.ticketliquidator.com/tickets/7942272/Olivia-Rodrigo-tickets-Wed-Feb-24-2027-Barclays-Center | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvw1wpg | Olivia Rodrigo | refresh (applied) | 7944931 | https://www.ticketliquidator.com/tickets/7944931/Olivia-Rodrigo-tickets-Sat-Feb-27-2027-Barclays-Center | - |
| tm-olivia-rodrigo-2027-brooklyn-1adzz_agkvwuqpx | Olivia Rodrigo | refresh (applied) | 7945595 | https://www.ticketliquidator.com/tickets/7945595/Olivia-Rodrigo-tickets-Sun-Feb-28-2027-Barclays-Center | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz16vawas-e | Olivia Rodrigo | refresh (applied) | 7921730 | https://www.ticketliquidator.com/tickets/7921730/Olivia-Rodrigo-tickets-Tue-Mar-23-2027-Ziggo-Dome | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz1kk7ajpa | Olivia Rodrigo | refresh (applied) | 7921731 | https://www.ticketliquidator.com/tickets/7921731/Olivia-Rodrigo-tickets-Wed-Mar-24-2027-Ziggo-Dome | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz16v1zf-za | Olivia Rodrigo | refresh (applied) | 7938168 | https://www.ticketliquidator.com/tickets/7938168/Olivia-Rodrigo-tickets-Sat-Mar-27-2027-Ziggo-Dome | - |
| tm-olivia-rodrigo-2027-amsterdam-z698xzbpz16v_8bagm | Olivia Rodrigo | refresh (applied) | 7938169 | https://www.ticketliquidator.com/tickets/7938169/Olivia-Rodrigo-tickets-Sun-Mar-28-2027-Ziggo-Dome | - |
| tm-olivia-rodrigo-2027-munich-z698xzc2z1kfyg9ao | Olivia Rodrigo | refresh (applied) | 7921732 | https://www.ticketliquidator.com/tickets/7921732/Olivia-Rodrigo-tickets-Thu-Apr-1-2027-Kleine-Olympiahalle-Munich | - |
| tm-olivia-rodrigo-2027-munich-z698xzc2z16vuw_9j8 | Olivia Rodrigo | refresh (applied) | 7921733 | https://www.ticketliquidator.com/tickets/7921733/Olivia-Rodrigo-tickets-Fri-Apr-2-2027-Kleine-Olympiahalle-Munich | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkuyj7ah | Olivia Rodrigo | refresh (applied) | 7921734 | https://www.ticketliquidator.com/tickets/7921734/Olivia-Rodrigo-tickets-Mon-Apr-5-2027-O2-Arena-London | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkusg7f3 | Olivia Rodrigo | refresh (applied) | 7921735 | https://www.ticketliquidator.com/tickets/7921735/Olivia-Rodrigo-tickets-Tue-Apr-6-2027-O2-Arena-London | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkusmfph | Olivia Rodrigo | refresh (applied) | 7921736 | https://www.ticketliquidator.com/tickets/7921736/Olivia-Rodrigo-tickets-Thu-Apr-8-2027-O2-Arena-London | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkug10qr | Olivia Rodrigo | refresh (applied) | 7921737 | https://www.ticketliquidator.com/tickets/7921737/Olivia-Rodrigo-tickets-Fri-Apr-9-2027-O2-Arena-London | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkdf5uep | Olivia Rodrigo | refresh (applied) | 7938197 | https://www.ticketliquidator.com/tickets/7938197/Olivia-Rodrigo-tickets-Mon-Apr-12-2027-O2-Arena-London | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkdbfuff | Olivia Rodrigo | refresh (applied) | 7938198 | https://www.ticketliquidator.com/tickets/7938198/Olivia-Rodrigo-tickets-Wed-Apr-14-2027-O2-Arena-London | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkdqyuqd | Olivia Rodrigo | refresh (applied) | 7938199 | https://www.ticketliquidator.com/tickets/7938199/Olivia-Rodrigo-tickets-Thu-Apr-15-2027-O2-Arena-London | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkdjmpol | Olivia Rodrigo | refresh (applied) | 7938200 | https://www.ticketliquidator.com/tickets/7938200/Olivia-Rodrigo-tickets-Mon-Apr-19-2027-O2-Arena-London | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkdj-m1i | Olivia Rodrigo | refresh (applied) | 7942129 | https://www.ticketliquidator.com/tickets/7942129/Olivia-Rodrigo-tickets-Tue-Apr-20-2027-O2-Arena-London | - |
| tm-olivia-rodrigo-2027-barcelona-z698xz2qz1kf4gb0b | Olivia Rodrigo | refresh (applied) | 7921741 | https://www.ticketliquidator.com/tickets/7921741/Olivia-Rodrigo-tickets-Sat-May-1-2027-Palau-Sant-Jordi | - |
| tm-olivia-rodrigo-2027-barcelona-z698xz2qz1k8uzwj6 | Olivia Rodrigo | refresh (applied) | 7921742 | https://www.ticketliquidator.com/tickets/7921742/Olivia-Rodrigo-tickets-Sun-May-2-2027-Palau-Sant-Jordi | - |
| tm-olivia-rodrigo-2027-barcelona-z698xz2qz16ezxvpe7 | Olivia Rodrigo | refresh (applied) | 7938204 | https://www.ticketliquidator.com/tickets/7938204/Olivia-Rodrigo-tickets-Wed-May-5-2027-Palau-Sant-Jordi | - |
| tm-olivia-rodrigo-2027-barcelona-z698xz2qz1k8ffjf_ | Olivia Rodrigo | refresh (applied) | 8127307 | https://www.ticketliquidator.com/tickets/8127307/Olivia-Rodrigo-tickets-Thu-May-6-2027-Palau-Sant-Jordi | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkdz-z3p | Olivia Rodrigo | refresh (applied) | 7944496 | https://www.ticketliquidator.com/tickets/7944496/Olivia-Rodrigo-tickets-Sun-May-9-2027-O2-Arena-London | - |
| tm-olivia-rodrigo-2027-london-1adfz_agkdd-fh3 | Olivia Rodrigo | refresh (applied) | 7944497 | https://www.ticketliquidator.com/tickets/7944497/Olivia-Rodrigo-tickets-Mon-May-10-2027-O2-Arena-London | - |
| tm-gracie-abrams-2026-denver-g5vzz_55eui2w | Gracie Abrams | refresh (applied) | 8002235 | https://www.ticketliquidator.com/tickets/8002235/Gracie-Abrams-tickets-Wed-Dec-2-2026-Ball-Arena | - |
| tm-gracie-abrams-2026-denver-g5vzz_5lhxedg | Gracie Abrams | refresh (applied) | 8002236 | https://www.ticketliquidator.com/tickets/8002236/Gracie-Abrams-tickets-Thu-Dec-3-2026-Ball-Arena | - |
| tm-gracie-abrams-2026-oakland-g5vyz_1udxfhx | Gracie Abrams | refresh (applied) | 8002237 | https://www.ticketliquidator.com/tickets/8002237/Gracie-Abrams-tickets-Sun-Dec-6-2026-Oakland-Arena | - |
| tm-gracie-abrams-2026-oakland-g5vyz_5mq0w7n | Gracie Abrams | refresh (applied) | 8002238 | https://www.ticketliquidator.com/tickets/8002238/Gracie-Abrams-tickets-Mon-Dec-7-2026-Oakland-Arena | - |
| tm-gracie-abrams-2026-glendale-17k8v0g652smnjw | Gracie Abrams | refresh (applied) | 8002239 | https://www.ticketliquidator.com/tickets/8002239/Gracie-Abrams-tickets-Wed-Dec-9-2026-Desert-Diamond-Arena | - |
| tm-gracie-abrams-2026-glendale-17k8v0g65839wds | Gracie Abrams | refresh (applied) | 8002240 | https://www.ticketliquidator.com/tickets/8002240/Gracie-Abrams-tickets-Thu-Dec-10-2026-Desert-Diamond-Arena | - |
| tm-gracie-abrams-2026-inglewood-vvg10z_53kkqpx | Gracie Abrams | refresh (applied) | 8002241 | https://www.ticketliquidator.com/tickets/8002241/Gracie-Abrams-tickets-Mon-Dec-14-2026-The-Kia-Forum | - |
| tm-gracie-abrams-2026-inglewood-vvg10z_5r0-czu | Gracie Abrams | refresh (applied) | 8002242 | https://www.ticketliquidator.com/tickets/8002242/Gracie-Abrams-tickets-Fri-Dec-18-2026-The-Kia-Forum | - |
| tm-gracie-abrams-2026-inglewood-vvg10z_5r0nxzp | Gracie Abrams | refresh (applied) | 8002243 | https://www.ticketliquidator.com/tickets/8002243/Gracie-Abrams-tickets-Sat-Dec-19-2026-The-Kia-Forum | - |
| tm-gracie-abrams-2026-inglewood-vvg10z_5r0eryu | Gracie Abrams | refresh (applied) | 8002244 | https://www.ticketliquidator.com/tickets/8002244/Gracie-Abrams-tickets-Sun-Dec-20-2026-The-Kia-Forum | - |
| tm-gracie-abrams-2027-seattle-vvg1hz_1bnjn8f | Gracie Abrams | refresh (applied) | 8002270 | https://www.ticketliquidator.com/tickets/8002270/Gracie-Abrams-tickets-Tue-Jan-26-2027-Climate-Pledge-Arena | - |
| tm-gracie-abrams-2027-seattle-vvg1hz_5rykvjn | Gracie Abrams | refresh (applied) | 8002271 | https://www.ticketliquidator.com/tickets/8002271/Gracie-Abrams-tickets-Wed-Jan-27-2027-Climate-Pledge-Arena | - |
| tm-gracie-abrams-2027-seattle-vvg1hz_5ry97ef | Gracie Abrams | refresh (applied) | 8002272 | https://www.ticketliquidator.com/tickets/8002272/Gracie-Abrams-tickets-Fri-Jan-29-2027-Climate-Pledge-Arena | - |
| tm-gracie-abrams-2027-portland-vvg1hz_1byq5cg | Gracie Abrams | refresh (applied) | 8002273 | https://www.ticketliquidator.com/tickets/8002273/Gracie-Abrams-tickets-Sun-Jan-31-2027-Moda-Center-at-the-Rose-Quarter | - |
| tm-gracie-abrams-2027-portland-vvg1hz_1byqdcd | Gracie Abrams | refresh (applied) | 8002274 | https://www.ticketliquidator.com/tickets/8002274/Gracie-Abrams-tickets-Mon-Feb-1-2027-Moda-Center-at-the-Rose-Quarter | - |
| tm-gracie-abrams-2027-chicago-vv1fvzv0pycdz72ag6 | Gracie Abrams | refresh (applied) | 8002275 | https://www.ticketliquidator.com/tickets/8002275/Gracie-Abrams-tickets-Thu-Feb-11-2027-United-Center | - |
| tm-gracie-abrams-2027-chicago-vvg18z_5rd-dah | Gracie Abrams | refresh (applied) | 8002276 | https://www.ticketliquidator.com/tickets/8002276/Gracie-Abrams-tickets-Fri-Feb-12-2027-United-Center | - |
| tm-gracie-abrams-2027-nashville-g5viz_51oey1w | Gracie Abrams | refresh (applied) | 8002277 | https://www.ticketliquidator.com/tickets/8002277/Gracie-Abrams-tickets-Sun-Feb-14-2027-Bridgestone-Arena | - |
| tm-gracie-abrams-2027-nashville-g5viz_5rgv7ra | Gracie Abrams | refresh (applied) | 8002278 | https://www.ticketliquidator.com/tickets/8002278/Gracie-Abrams-tickets-Mon-Feb-15-2027-Bridgestone-Arena | - |
| tm-gracie-abrams-2027-toronto-177zv0g61sqb4k8 | Gracie Abrams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-gracie-abrams-2027-toronto-177zv0g65ic_clu | Gracie Abrams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-gracie-abrams-2027-atlanta-vvg1zz_5nqeia0 | Gracie Abrams | refresh (applied) | 8002281 | https://www.ticketliquidator.com/tickets/8002281/Gracie-Abrams-tickets-Tue-Feb-23-2027-State-Farm-Arena-GA | - |
| tm-gracie-abrams-2027-atlanta-vvg1zz_5nqiiai | Gracie Abrams | refresh (applied) | 8002282 | https://www.ticketliquidator.com/tickets/8002282/Gracie-Abrams-tickets-Wed-Feb-24-2027-State-Farm-Arena-GA | - |
| tm-gracie-abrams-2027-charlotte-g5evz_am0wlwu | Gracie Abrams | refresh (applied) | 8002283 | https://www.ticketliquidator.com/tickets/8002283/Gracie-Abrams-tickets-Fri-Feb-26-2027-Spectrum-Center | - |
| tm-gracie-abrams-2027-charlotte-g5evz_5ryzbyv | Gracie Abrams | refresh (applied) | 8002284 | https://www.ticketliquidator.com/tickets/8002284/Gracie-Abrams-tickets-Sat-Feb-27-2027-Spectrum-Center | - |
| tm-gracie-abrams-2027-boston-vv177z_agkwp_mnl | Gracie Abrams | refresh (applied) | 8002285 | https://www.ticketliquidator.com/tickets/8002285/Gracie-Abrams-tickets-Mon-Mar-1-2027-TD-Garden | - |
| tm-gracie-abrams-2027-boston-vvg17z_5rug2cb | Gracie Abrams | refresh (applied) | 8002286 | https://www.ticketliquidator.com/tickets/8002286/Gracie-Abrams-tickets-Tue-Mar-2-2027-TD-Garden | - |
| tm-gracie-abrams-2027-washington-1avfz_agksfejeq | Gracie Abrams | refresh (applied) | 8002287 | https://www.ticketliquidator.com/tickets/8002287/Gracie-Abrams-tickets-Thu-Mar-4-2027-Capital-One-Arena | - |
| tm-gracie-abrams-2027-washington-17a8v0g65r4j5jx | Gracie Abrams | refresh (applied) | 8002288 | https://www.ticketliquidator.com/tickets/8002288/Gracie-Abrams-tickets-Fri-Mar-5-2027-Capital-One-Arena | - |
| tm-gracie-abrams-2027-montreal-17g8v0g65th0d1g | Gracie Abrams | refresh (applied) | 8002289 | https://www.ticketliquidator.com/tickets/8002289/Gracie-Abrams-tickets-Mon-Mar-8-2027-Centre-Bell | - |
| tm-gracie-abrams-2027-montreal-17g8v0g65thpd1k | Gracie Abrams | refresh (applied) | 8002290 | https://www.ticketliquidator.com/tickets/8002290/Gracie-Abrams-tickets-Tue-Mar-9-2027-Centre-Bell | - |
| tm-gracie-abrams-2027-philadelphia-17gzv0g65pru4zd | Gracie Abrams | refresh (applied) | 8002291 | https://www.ticketliquidator.com/tickets/8002291/Gracie-Abrams-tickets-Fri-Mar-12-2027-Xfinity-Mobile-Arena | - |
| tm-gracie-abrams-2027-philadelphia-17gzv0g65prugzw | Gracie Abrams | refresh (applied) | 8002292 | https://www.ticketliquidator.com/tickets/8002292/Gracie-Abrams-tickets-Sat-Mar-13-2027-Xfinity-Mobile-Arena | - |
| tm-gracie-abrams-2027-brooklyn-17gzv0g61s0b9dq | Gracie Abrams | refresh (applied) | 8002293 | https://www.ticketliquidator.com/tickets/8002293/Gracie-Abrams-tickets-Tue-Mar-16-2027-Barclays-Center | - |
| tm-gracie-abrams-2027-brooklyn-17gzv0g65ie2coz | Gracie Abrams | refresh (applied) | 8002294 | https://www.ticketliquidator.com/tickets/8002294/Gracie-Abrams-tickets-Wed-Mar-17-2027-Barclays-Center | - |
| tm-gracie-abrams-2027-brooklyn-17gzv0g65iekqou | Gracie Abrams | refresh (applied) | 8002295 | https://www.ticketliquidator.com/tickets/8002295/Gracie-Abrams-tickets-Fri-Mar-19-2027-Barclays-Center | - |
| tm-gracie-abrams-2027-brooklyn-17gzv0g65iebqor | Gracie Abrams | refresh (applied) | 8002296 | https://www.ticketliquidator.com/tickets/8002296/Gracie-Abrams-tickets-Sat-Mar-20-2027-Barclays-Center | - |
| tm-gracie-abrams-2027-merksem-antwerpen-z698xzg2z1k_p3f_b | Gracie Abrams | refresh (applied) | 8018180 | https://www.ticketliquidator.com/tickets/8018180/Gracie-Abrams-tickets-Thu-Apr-15-2027-AFAS-Dome | - |
| tm-gracie-abrams-2027-merksem-antwerpen-z698xzg2z1k4vofa4 | Gracie Abrams | refresh (applied) | 8018181 | https://www.ticketliquidator.com/tickets/8018181/Gracie-Abrams-tickets-Fri-Apr-16-2027-AFAS-Dome | - |
| tm-gracie-abrams-2027-manchester-17uyv0g65rbpnzf | Gracie Abrams | refresh (applied) | 8002339 | https://www.ticketliquidator.com/tickets/8002339/Gracie-Abrams-tickets-Thu-Apr-22-2027-Co-Op-Live | - |
| tm-gracie-abrams-2027-manchester-17uyv0g6gk_vkhl | Gracie Abrams | refresh (applied) | 8018170 | https://www.ticketliquidator.com/tickets/8018170/Gracie-Abrams-tickets-Sat-Apr-24-2027-Co-Op-Live | - |
| tm-gracie-abrams-2027-manchester-17uyv0g6gkp6vc5 | Gracie Abrams | refresh (applied) | 8018184 | https://www.ticketliquidator.com/tickets/8018184/Gracie-Abrams-tickets-Sun-Apr-25-2027-Co-Op-Live | - |
| tm-gracie-abrams-2027-london-17u8v0g65wthjl9 | Gracie Abrams | refresh (applied) | 8002354 | https://www.ticketliquidator.com/tickets/8002354/Gracie-Abrams-tickets-Fri-Apr-30-2027-O2-Arena-London | - |
| tm-gracie-abrams-2027-london-17u8v0g65wi6peh | Gracie Abrams | refresh (applied) | 8002355 | https://www.ticketliquidator.com/tickets/8002355/Gracie-Abrams-tickets-Sat-May-1-2027-O2-Arena-London | - |
| tm-gracie-abrams-2027-london-17u8v0g65wcbpi1 | Gracie Abrams | refresh (applied) | 8002356 | https://www.ticketliquidator.com/tickets/8002356/Gracie-Abrams-tickets-Mon-May-3-2027-O2-Arena-London | - |
| tm-gracie-abrams-2027-london-17u8v0g65wm9us5 | Gracie Abrams | refresh (applied) | 8002358 | https://www.ticketliquidator.com/tickets/8002358/Gracie-Abrams-tickets-Tue-May-4-2027-O2-Arena-London | - |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16vpdafzk | Gracie Abrams | refresh (applied) | 8018171 | https://www.ticketliquidator.com/tickets/8018171/Gracie-Abrams-tickets-Fri-May-7-2027-Ziggo-Dome | - |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v00_azt | Gracie Abrams | refresh (applied) | 8018172 | https://www.ticketliquidator.com/tickets/8018172/Gracie-Abrams-tickets-Sat-May-8-2027-Ziggo-Dome | - |
| tm-gracie-abrams-2027-amsterdam-z698xzbpz16v0oan4g | Gracie Abrams | refresh (applied) | 8018173 | https://www.ticketliquidator.com/tickets/8018173/Gracie-Abrams-tickets-Mon-May-10-2027-Ziggo-Dome | - |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vx9ppa7 | Gracie Abrams | refresh (applied) | 8018174 | https://www.ticketliquidator.com/tickets/8018174/Gracie-Abrams-tickets-Wed-May-12-2027-Uber-Arena | - |
| tm-gracie-abrams-2027-berlin-z698xzc2z16vfef4pp | Gracie Abrams | refresh (applied) | 8018175 | https://www.ticketliquidator.com/tickets/8018175/Gracie-Abrams-tickets-Thu-May-13-2027-Uber-Arena | - |
| tm-gracie-abrams-2027-barcelona-z698xz2qz16vav0xgz | Gracie Abrams | refresh (applied) | 8018168 | https://www.ticketliquidator.com/tickets/8018168/Gracie-Abrams-tickets-Thu-May-27-2027-Palau-Sant-Jordi | - |
| tm-gracie-abrams-2027-barcelona-z698xz2qz16vpsaikv | Gracie Abrams | refresh (applied) | 8018169 | https://www.ticketliquidator.com/tickets/8018169/Gracie-Abrams-tickets-Fri-May-28-2027-Palau-Sant-Jordi | - |
| tm-niall-horan-2027-saint-paul-z7r9jz1a704vb | Niall Horan | refresh (applied) | 7954151 | https://www.ticketliquidator.com/tickets/7954151/Niall-Horan-tickets-Wed-Mar-17-2027-Grand-Casino-Arena | - |
| tm-niall-horan-2027-detroit-vvg1oz_1rv4ast | Niall Horan | refresh (applied) | 7954156 | https://www.ticketliquidator.com/tickets/7954156/Niall-Horan-tickets-Fri-Mar-19-2027-Little-Caesars-Arena | - |
| tm-niall-horan-2027-columbus-vvg1fz_1x9ig7q | Niall Horan | refresh (applied) | 7954157 | https://www.ticketliquidator.com/tickets/7954157/Niall-Horan-tickets-Sat-Mar-20-2027-Nationwide-Arena | - |
| tm-niall-horan-2027-chicago-vvg18z_1llyajb | Niall Horan | refresh (applied) | 7954198 | https://www.ticketliquidator.com/tickets/7954198/Niall-Horan-tickets-Tue-Mar-23-2027-United-Center | - |
| tm-niall-horan-2027-indianapolis-vvg1fz_1htnybv | Niall Horan | refresh (applied) | 7954200 | https://www.ticketliquidator.com/tickets/7954200/Niall-Horan-tickets-Fri-Mar-26-2027-Gainbridge-Fieldhouse | - |
| tm-niall-horan-2027-saint-louis-vvg1bz_1qy32om | Niall Horan | refresh (applied) | 7954207 | https://www.ticketliquidator.com/tickets/7954207/Niall-Horan-tickets-Sat-Mar-27-2027-Enterprise-Center | - |
| tm-niall-horan-2027-toronto-177zv0g61h1eoxc | Niall Horan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-niall-horan-2027-montreal-17g8v0g61rtd60v | Niall Horan | refresh (applied) | 7954209 | https://www.ticketliquidator.com/tickets/7954209/Niall-Horan-tickets-Fri-Apr-2-2027-Centre-Bell | - |
| tm-niall-horan-2027-brooklyn-17gzv0g61hpqmr1 | Niall Horan | refresh (applied) | 7954210 | https://www.ticketliquidator.com/tickets/7954210/Niall-Horan-tickets-Sun-Apr-4-2027-Barclays-Center | - |
| tm-niall-horan-2027-baltimore-17a8v0g61lfcmsv | Niall Horan | refresh (applied) | 7954211 | https://www.ticketliquidator.com/tickets/7954211/Niall-Horan-tickets-Thu-Apr-8-2027-CFG-Bank-Arena | - |
| tm-niall-horan-2027-boston-vvg17z_1qxbhwy | Niall Horan | refresh (applied) | 7954213 | https://www.ticketliquidator.com/tickets/7954213/Niall-Horan-tickets-Mon-Apr-12-2027-TD-Garden | - |
| tm-niall-horan-2027-raleigh-g5evz_1r802la | Niall Horan | refresh (applied) | 7954215 | https://www.ticketliquidator.com/tickets/7954215/Niall-Horan-tickets-Thu-Apr-15-2027-Lenovo-Center | - |
| tm-niall-horan-2027-orlando-17fov0g61xk1ezu | Niall Horan | refresh (applied) | 7954325 | https://www.ticketliquidator.com/tickets/7954325/Niall-Horan-tickets-Sat-Apr-17-2027-Kia-Center | - |
| tm-niall-horan-2027-atlanta-vvg1zz_1hoxudt | Niall Horan | refresh (applied) | 7954216 | https://www.ticketliquidator.com/tickets/7954216/Niall-Horan-tickets-Wed-Apr-28-2027-State-Farm-Arena-GA | - |
| tm-niall-horan-2027-new-orleans-g5viz_1xkcnon | Niall Horan | refresh (applied) | 7954217 | https://www.ticketliquidator.com/tickets/7954217/Niall-Horan-tickets-Thu-Apr-29-2027-Smoothie-King-Center | - |
| tm-niall-horan-2027-houston-z7r9jz1a709uy | Niall Horan | refresh (applied) | 7954218 | https://www.ticketliquidator.com/tickets/7954218/Niall-Horan-tickets-Sat-May-1-2027-Toyota-Center-TX | - |
| tm-niall-horan-2027-fort-worth-vvg1yz_1r1jeer | Niall Horan | refresh (applied) | 7954219 | https://www.ticketliquidator.com/tickets/7954219/Niall-Horan-tickets-Sun-May-2-2027-Ariat-Arena | - |
| tm-niall-horan-2027-austin-g5diz_1lpaglw | Niall Horan | refresh (applied) | 7954220 | https://www.ticketliquidator.com/tickets/7954220/Niall-Horan-tickets-Fri-May-14-2027-Moody-Center-ATX | - |
| tm-niall-horan-2027-denver-g5vzz_1lspoiu | Niall Horan | refresh (applied) | 7954221 | https://www.ticketliquidator.com/tickets/7954221/Niall-Horan-tickets-Sun-May-16-2027-Ball-Arena | - |
| tm-niall-horan-2027-west-valley-city-g5vzz_1xafaiw | Niall Horan | refresh (applied) | 7954222 | https://www.ticketliquidator.com/tickets/7954222/Niall-Horan-tickets-Tue-May-18-2027-Maverik-Center | - |
| tm-niall-horan-2027-phoenix-17k8v0g61ruofyr | Niall Horan | refresh (applied) | 7954224 | https://www.ticketliquidator.com/tickets/7954224/Niall-Horan-tickets-Thu-May-20-2027-Mortgage-Matchup-Center | - |
| tm-niall-horan-2027-inglewood-vvg10z_1jzwise | Niall Horan | refresh (applied) | 7954226 | https://www.ticketliquidator.com/tickets/7954226/Niall-Horan-tickets-Sat-May-22-2027-The-Kia-Forum | - |
| tm-niall-horan-2027-san-francisco-g5vyz_195tivo | Niall Horan | refresh (applied) | 7954234 | https://www.ticketliquidator.com/tickets/7954234/Niall-Horan-tickets-Tue-May-25-2027-Chase-Center | - |
| tm-niall-horan-2027-seattle-vvg1hz_1hqc03- | Niall Horan | refresh (applied) | 7954237 | https://www.ticketliquidator.com/tickets/7954237/Niall-Horan-tickets-Thu-May-27-2027-Climate-Pledge-Arena | - |
| tm-niall-horan-2027-vancouver-1778v0g61qodyye | Niall Horan | refresh (applied) | 7954249 | https://www.ticketliquidator.com/tickets/7954249/Niall-Horan-tickets-Sat-May-29-2027-Rogers-Arena | - |
| tm-doja-cat-2026-montreal-1aszkgygkemvjjt | Doja Cat | refresh (applied) | 7457664 | https://www.ticketliquidator.com/tickets/7457664/Doja-Cat-tickets-Fri-Nov-27-2026-Centre-Bell | - |
| tm-doja-cat-2026-philadelphia-1adzzbsgkldzvua | Doja Cat | refresh (applied) | 7457657 | https://www.ticketliquidator.com/tickets/7457657/Doja-Cat-tickets-Sun-Nov-29-2026-Xfinity-Mobile-Arena | - |
| tm-doja-cat-2026-new-york-g5dizbsintkzt | Doja Cat | refresh (applied) | 7457486 | https://www.ticketliquidator.com/tickets/7457486/Doja-Cat-tickets-Tue-Dec-1-2026-Madison-Square-Garden | - |
| tm-john-summit-2026-philadelphia-vvg1fz_5ctejox | John Summit | refresh (applied) | 7982966 | https://www.ticketliquidator.com/tickets/7982966/John-Summit-tickets-Fri-Nov-27-2026-Liacouras-Center | - |
| tm-john-summit-2026-brooklyn-17gzv0g655ozaay | John Summit | refresh (applied) | 7982967 | https://www.ticketliquidator.com/tickets/7982967/John-Summit-tickets-Sat-Nov-28-2026-Barclays-Center | - |
| tm-john-summit-2026-oakland-g5vyz_5chdjie | John Summit | refresh (applied) | 7982968 | https://www.ticketliquidator.com/tickets/7982968/John-Summit-tickets-Fri-Dec-4-2026-Oakland-Arena | - |
| tm-john-summit-2026-oakland-g5vyz_5925f5n | John Summit | refresh (applied) | 8005513 | https://www.ticketliquidator.com/tickets/8005513/John-Summit-tickets-Sat-Dec-5-2026-Oakland-Arena | - |
| tm-john-summit-2026-los-angeles-vvg1iz_2teslqm | John Summit | refresh (applied) | 8204658 | https://www.ticketliquidator.com/tickets/8204658/John-Summit-tickets-Sat-Dec-12-2026-Los-Angeles-Memorial-Coliseum | - |
| tm-karol-g-2027-barcelona-z698xz2qz1k-d-v1k | Karol G | refresh (applied) | 7896499 | https://www.ticketliquidator.com/tickets/7896499/Karol-G-tickets-Thu-Jun-3-2027-Estadi-Olimpico-Lluis-Companys | - |
| tm-karol-g-2027-barcelona-z698xz2qz1k8n04vk | Karol G | refresh (applied) | 7912284 | https://www.ticketliquidator.com/tickets/7912284/Karol-G-tickets-Fri-Jun-4-2027-Estadi-Olimpico-Lluis-Companys | - |
| tm-karol-g-2027-sevilla-z698xz2qz1kp4_vuk | Karol G | refresh (applied) | 7896500 | https://www.ticketliquidator.com/tickets/7896500/Karol-G-tickets-Fri-Jun-11-2027-Estadio-La-Cartuja | - |
| tm-karol-g-2027-sevilla-z698xz2qz16vvepfuz | Karol G | refresh (applied) | 7912285 | https://www.ticketliquidator.com/tickets/7912285/Karol-G-tickets-Sat-Jun-12-2027-Estadio-La-Cartuja | - |
| tm-karol-g-2027-sevilla-z698xz2qz16v_a-6fw | Karol G | refresh (applied) | 7921229 | https://www.ticketliquidator.com/tickets/7921229/Karol-G-tickets-Sun-Jun-13-2027-Estadio-La-Cartuja | - |
| tm-karol-g-2027-madrid-z698xz2qz16vq8a4f7 | Karol G | refresh (applied) | 7896501 | https://www.ticketliquidator.com/tickets/7896501/Karol-G-tickets-Thu-Jun-24-2027-Estadio-Metropolitano | - |
| tm-karol-g-2027-madrid-z698xz2qz1kpmzkfn | Karol G | refresh (applied) | 7912286 | https://www.ticketliquidator.com/tickets/7912286/Karol-G-tickets-Fri-Jun-25-2027-Estadio-Metropolitano | - |
| tm-karol-g-2027-madrid-z698xz2qz16v8zxv0i | Karol G | refresh (applied) | 7918852 | https://www.ticketliquidator.com/tickets/7918852/Karol-G-tickets-Sat-Jun-26-2027-Estadio-Metropolitano | - |
| tm-karol-g-2027-madrid-z698xz2qz1koujx1f | Karol G | refresh (applied) | 7921230 | https://www.ticketliquidator.com/tickets/7921230/Karol-G-tickets-Sun-Jun-27-2027-Estadio-Metropolitano | - |
| tm-karol-g-2027-london-1agzk3ogkddbuhf | Karol G | refresh (applied) | 7896396 | https://www.ticketliquidator.com/tickets/7896396/Karol-G-tickets-Tue-Jul-6-2027-Tottenham-Hotspur-New-Stadium | - |
| tm-karol-g-2027-amsterdam-z698xzbpz16vc_bwjy | Karol G | refresh (applied) | 7896506 | https://www.ticketliquidator.com/tickets/7896506/Karol-G-tickets-Sat-Jul-10-2027-Johan-Cruijff-Arena | - |
| tm-metallica-2027-las-vegas-1fayv0b_z4z7ggvk | Metallica | correct (applied) | 7775512 | https://www.ticketliquidator.com/tickets/7775512/Metallica-tickets-Thu-Jan-28-2027-Sphere | - |
| tm-metallica-2027-las-vegas-16vjz_kk3g7ndxr | Metallica | refresh (applied) | 7775513 | https://www.ticketliquidator.com/tickets/7775513/Metallica-tickets-Sat-Jan-30-2027-Sphere | - |
| tm-metallica-2027-las-vegas-1a9zko-gke0yct0 | Metallica | correct (applied) | 7785086 | https://www.ticketliquidator.com/tickets/7785086/Metallica-tickets-Thu-Feb-4-2027-Sphere | - |
| tm-metallica-2027-las-vegas-1a9zko-gkepzr6s | Metallica | refresh (applied) | 7785087 | https://www.ticketliquidator.com/tickets/7785087/Metallica-tickets-Sat-Feb-6-2027-Sphere | - |
| tm-metallica-2027-las-vegas-1a9zko-gke0ywtn | Metallica | correct (applied) | 7785088 | https://www.ticketliquidator.com/tickets/7785088/Metallica-tickets-Thu-Feb-18-2027-Sphere | - |
| tm-metallica-2027-las-vegas-1a9zko-gkepzr6g | Metallica | refresh (applied) | 7785089 | https://www.ticketliquidator.com/tickets/7785089/Metallica-tickets-Sat-Feb-20-2027-Sphere | - |
| tm-metallica-2027-las-vegas-1a9zko-gke0buti | Metallica | correct (applied) | 7785090 | https://www.ticketliquidator.com/tickets/7785090/Metallica-tickets-Thu-Feb-25-2027-Sphere | - |
| tm-metallica-2027-las-vegas-1a9zko-gkepzxff | Metallica | refresh (applied) | 7785871 | https://www.ticketliquidator.com/tickets/7785871/Metallica-tickets-Sat-Mar-13-2027-Sphere | - |
| tm-teddy-swims-2027-berlin-z698xzc2z16v8g0v0d | Teddy Swims | refresh (applied) | 8167509 | https://www.ticketliquidator.com/tickets/8167509/Teddy-Swims-tickets-Thu-Mar-11-2027-Uber-Arena | - |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vajo8c6 | Teddy Swims | refresh (applied) | 8166020 | https://www.ticketliquidator.com/tickets/8166020/Teddy-Swims-tickets-Tue-Mar-16-2027-Ziggo-Dome | - |
| tm-teddy-swims-2027-amsterdam-z698xzbpz1kb300fz | Teddy Swims | refresh (applied) | 8168696 | https://www.ticketliquidator.com/tickets/8168696/Teddy-Swims-tickets-Wed-Mar-17-2027-Ziggo-Dome | - |
| tm-teddy-swims-2027-amsterdam-z698xzbpz16vckf4-9 | Teddy Swims | none | - | - | no qualifying listing (complete catalog checked) |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z1kf7vp3p | Teddy Swims | refresh (applied) | 8167527 | https://www.ticketliquidator.com/tickets/8167527/Teddy-Swims-tickets-Fri-Mar-26-2027-AFAS-Dome | - |
| tm-teddy-swims-2027-merksem-antwerpen-z698xzg2z16v_sztub | Teddy Swims | none | - | - | no qualifying listing (complete catalog checked) |
| tm-teddy-swims-2027-glasgow-17uov0g62qlspvu | Teddy Swims | refresh (applied) | 8163374 | https://www.ticketliquidator.com/tickets/8163374/Teddy-Swims-tickets-Tue-Apr-13-2027-OVO-Hydro | - |
| tm-teddy-swims-2027-manchester-17uyv0g62pcoosz | Teddy Swims | refresh (applied) | 8163375 | https://www.ticketliquidator.com/tickets/8163375/Teddy-Swims-tickets-Fri-Apr-16-2027-Co-Op-Live | - |
| tm-teddy-swims-2027-manchester-17uyv0g62m2z8vc | Teddy Swims | refresh (applied) | 8230821 | https://www.ticketliquidator.com/tickets/8230821/Teddy-Swims-tickets-Sat-Apr-17-2027-Co-Op-Live | - |
| tm-teddy-swims-2027-london-17u8v0g6253xeaz | Teddy Swims | correct (applied) | 8167545 | https://www.ticketliquidator.com/tickets/8167545/Teddy-Swims-tickets-Wed-Apr-21-2027-O2-Arena-London | - |
| tm-teddy-swims-2027-london-17u8v0g623cnnvk | Teddy Swims | correct (applied) | 8173004 | https://www.ticketliquidator.com/tickets/8173004/Teddy-Swims-tickets-Thu-Apr-22-2027-O2-Arena-London | - |
| tm-teddy-swims-2027-london-17u8v0g623yvkkm | Teddy Swims | refresh (applied) | 8183966 | https://www.ticketliquidator.com/tickets/8183966/Teddy-Swims-tickets-Sat-Apr-24-2027-O2-Arena-London | - |
| tm-five-finger-death-punch-2027-manchester-g5vhz_gnh6q4f | Five Finger Death Punch | refresh (applied) | 7987816 | https://www.ticketliquidator.com/tickets/7987816/Five-Finger-Death-Punch-tickets-Sat-Jan-16-2027-AO-Arena | - |
| tm-five-finger-death-punch-2027-birmingham-1anzk3bgkev6s0s | Five Finger Death Punch | refresh (applied) | 8090419 | https://www.ticketliquidator.com/tickets/8090419/Five-Finger-Death-Punch-tickets-Fri-Jan-22-2027-bp-pulse-LIVE | - |
| tm-five-finger-death-punch-2027-london-1agzk3bgkdreu6- | Five Finger Death Punch | none | - | - | no qualifying listing (complete catalog checked) |
| tm-five-finger-death-punch-2027-odz-z698xzqpz1k-o8yj_ | Five Finger Death Punch | none | - | - | no qualifying listing (complete catalog checked) |
| tm-five-finger-death-punch-2027-forest-brussels-z698xzg2z1asr3q7 | Five Finger Death Punch | none | - | - | no qualifying listing (complete catalog checked) |
| tm-teddy-swims-2027-manchester-17uyv0g62mo98gp | Teddy Swims | refresh (applied) | 8230822 | https://www.ticketliquidator.com/tickets/8230822/Teddy-Swims-tickets-Sun-Apr-18-2027-Co-Op-Live | - |
| tm-tame-impala-2027-manchester-1amzkf4gkemyn8u | Tame Impala | refresh (applied) | 8231212 | https://www.ticketliquidator.com/tickets/8231212/Tame-Impala-tickets-Fri-May-28-2027-Co-Op-Live | - |
| tm-tame-impala-2027-manchester-1amzkf_gkdr-2ec | Tame Impala | refresh (applied) | 8237407 | https://www.ticketliquidator.com/tickets/8237407/Tame-Impala-tickets-Sat-May-29-2027-Co-Op-Live | - |
| tm-tame-impala-2027-london-16dfz_ofpg7t8j2 | Tame Impala | refresh (applied) | 8235236 | https://www.ticketliquidator.com/tickets/8235236/Tame-Impala-tickets-Tue-Jun-1-2027-O2-Arena-London | - |
| tm-tame-impala-2027-london-16dfz_ofjg7iyih | Tame Impala | refresh (applied) | 8235237 | https://www.ticketliquidator.com/tickets/8235237/Tame-Impala-tickets-Wed-Jun-2-2027-O2-Arena-London | - |
| tm-tame-impala-2027-london-1agzkfbgkdvvzlq | Tame Impala | refresh (applied) | 8238540 | https://www.ticketliquidator.com/tickets/8238540/Tame-Impala-tickets-Thu-Jun-3-2027-O2-Arena-London | - |
| tm-tame-impala-2027-rotterdam-z698xzbpz1kppan3z | Tame Impala | refresh (applied) | 8235383 | https://www.ticketliquidator.com/tickets/8235383/Tame-Impala-tickets-Mon-Jun-7-2027-Ahoy-Rotterdam | - |
| tm-tame-impala-2027-rotterdam-z698xzbpz1k_yjz0i | Tame Impala | refresh (applied) | 8235384 | https://www.ticketliquidator.com/tickets/8235384/Tame-Impala-tickets-Tue-Jun-8-2027-Ahoy-Rotterdam | - |
| tm-tame-impala-2027-rotterdam-z698xzbpz1k3e07a0 | Tame Impala | none | - | - | no qualifying listing (complete catalog checked) |
| tm-don-omar-2027-denver-g5vzz_u2hqxbt | Don Omar | refresh (applied) | 8071957 | https://www.ticketliquidator.com/tickets/8071957/Don-Omar-tickets-Wed-Feb-3-2027-Ball-Arena | - |
| tm-don-omar-2027-sacramento-g5vyz_u1sfm0b | Don Omar | refresh (applied) | 8071958 | https://www.ticketliquidator.com/tickets/8071958/Don-Omar-tickets-Fri-Feb-5-2027-Golden-1-Center | - |
| tm-don-omar-2027-seattle-vvg1hz_u4jzxck | Don Omar | refresh (applied) | 8071959 | https://www.ticketliquidator.com/tickets/8071959/Don-Omar-tickets-Sun-Feb-7-2027-Climate-Pledge-Arena | - |
| tm-don-omar-2027-san-diego-z7r9jz1a7pggy | Don Omar | refresh (applied) | 8086304 | https://www.ticketliquidator.com/tickets/8086304/Don-Omar-tickets-Wed-Feb-10-2027-Pechanga-Arena-San-Diego | - |
| tm-don-omar-2027-fresno-g5vyz_u5k7ws7 | Don Omar | refresh (applied) | 8071960 | https://www.ticketliquidator.com/tickets/8071960/Don-Omar-tickets-Thu-Feb-11-2027-Save-Mart-Center | - |
| tm-don-omar-2027-inglewood-vvg10z_u2a3ul3 | Don Omar | refresh (applied) | 8071961 | https://www.ticketliquidator.com/tickets/8071961/Don-Omar-tickets-Fri-Feb-12-2027-Intuit-Dome | - |
| tm-don-omar-2027-toronto-177zv0g6u2fwanb | Don Omar | none | - | - | no qualifying listing (complete catalog checked) |
| tm-don-omar-2027-montreal-17g8v0g6ucxtixy | Don Omar | refresh (applied) | 8071972 | https://www.ticketliquidator.com/tickets/8071972/Don-Omar-tickets-Sun-Feb-21-2027-Centre-Bell | - |
| tm-don-omar-2027-rosemont-vvg18z_u5mkrgh | Don Omar | refresh (applied) | 8071962 | https://www.ticketliquidator.com/tickets/8071962/Don-Omar-tickets-Fri-Feb-26-2027-Allstate-Arena | - |
| tm-don-omar-2027-belmont-park-17gzv0g6u15uw7e | Don Omar | refresh (applied) | 8071963 | https://www.ticketliquidator.com/tickets/8071963/Don-Omar-tickets-Sun-Feb-28-2027-UBS-Arena | - |
| tm-don-omar-2027-newark-vvg1fz_u5xkezy | Don Omar | refresh (applied) | 8071964 | https://www.ticketliquidator.com/tickets/8071964/Don-Omar-tickets-Wed-Mar-3-2027-Prudential-Center | - |
| tm-don-omar-2027-baltimore-17a8v0g6ukar9g1 | Don Omar | refresh (applied) | 8071965 | https://www.ticketliquidator.com/tickets/8071965/Don-Omar-tickets-Thu-Mar-4-2027-CFG-Bank-Arena | - |
| tm-don-omar-2027-fort-worth-vvg1yz_u1_ouro | Don Omar | refresh (applied) | 8071966 | https://www.ticketliquidator.com/tickets/8071966/Don-Omar-tickets-Sat-Mar-6-2027-Ariat-Arena | - |
| tm-don-omar-2027-austin-g5diz_u3mkhzt | Don Omar | refresh (applied) | 8073019 | https://www.ticketliquidator.com/tickets/8073019/Don-Omar-tickets-Sun-Mar-7-2027-Moody-Center-ATX | - |
| tm-don-omar-2027-tampa-vvg1vz_uc-buha | Don Omar | refresh (applied) | 8071967 | https://www.ticketliquidator.com/tickets/8071967/Don-Omar-tickets-Wed-Mar-10-2027-Benchmark-International-Arena | - |
| tm-don-omar-2027-miami-vvg1vz_uk8ovtf | Don Omar | refresh (applied) | 8071968 | https://www.ticketliquidator.com/tickets/8071968/Don-Omar-tickets-Fri-Mar-12-2027-Kaseya-Center | - |
| tm-don-omar-2027-orlando-17fov0g6u6m7kw6 | Don Omar | refresh (applied) | 8071970 | https://www.ticketliquidator.com/tickets/8071970/Don-Omar-tickets-Sun-Mar-14-2027-Kia-Center | - |
| tm-luke-combs-2027-arlington-z7r9jz1aazyf6 | Luke Combs | refresh (applied) | 8203740 | https://www.ticketliquidator.com/tickets/8203740/Luke-Combs-tickets-Sat-Apr-3-2027-ATT-Stadium | - |
| tm-luke-combs-2027-detroit-vv1afzkf6gkesjjgl | Luke Combs | refresh (applied) | 8203726 | https://www.ticketliquidator.com/tickets/8203726/Luke-Combs-tickets-Sat-Apr-17-2027-Ford-Field | - |
| tm-luke-combs-2027-philadelphia-vv17fz_8gklpk2ll | Luke Combs | refresh (applied) | 8203727 | https://www.ticketliquidator.com/tickets/8203727/Luke-Combs-tickets-Sat-Apr-24-2027-Lincoln-Financial-Field | - |
| tm-luke-combs-2027-foxborough-vv177z_8gkinn93w | Luke Combs | refresh (applied) | 8203728 | https://www.ticketliquidator.com/tickets/8203728/Luke-Combs-tickets-Sat-May-1-2027-Gillette-Stadium | - |
| tm-luke-combs-2027-pittsburgh-1avbz_8gkd1oiqd | Luke Combs | refresh (applied) | 8203729 | https://www.ticketliquidator.com/tickets/8203729/Luke-Combs-tickets-Sat-May-8-2027-Acrisure-Stadium | - |
| tm-luke-combs-2027-kansas-city-vv1akzkf6gkesjbxu | Luke Combs | refresh (applied) | 8203731 | https://www.ticketliquidator.com/tickets/8203731/Luke-Combs-tickets-Sat-May-15-2027-Arrowhead-Stadium | - |
| tm-luke-combs-2027-edmonton-1av7z_8gkw3oea5 | Luke Combs | refresh (applied) | 8203737 | https://www.ticketliquidator.com/tickets/8203737/Luke-Combs-tickets-Sat-May-29-2027-Commonwealth-Stadium-Edmonton | - |
| tm-luke-combs-2027-vancouver-1av7z_8gkwig5fh | Luke Combs | refresh (applied) | 8203738 | https://www.ticketliquidator.com/tickets/8203738/Luke-Combs-tickets-Sat-Jun-5-2027-BC-Place-Stadium | - |
| tm-luke-combs-2027-boise-g5vzz_8lfjx4v | Luke Combs | refresh (applied) | 8203732 | https://www.ticketliquidator.com/tickets/8203732/Luke-Combs-tickets-Sat-Jun-12-2027-Albertsons-Stadium | - |
| tm-luke-combs-2027-denver-g5vzz_8l39sxz | Luke Combs | refresh (applied) | 8203733 | https://www.ticketliquidator.com/tickets/8203733/Luke-Combs-tickets-Sat-Jun-19-2027-Empower-Field-At-Mile-High | - |
| tm-luke-combs-2027-san-diego-vvg1iz_8l9y-6a | Luke Combs | refresh (applied) | 8203734 | https://www.ticketliquidator.com/tickets/8203734/Luke-Combs-tickets-Sat-Jun-26-2027-Petco-Park | - |
| tm-blue-october-2026-irving-vvg1yz_6kcyhkx | Blue October | correct (applied) | 7827975 | https://www.ticketliquidator.com/tickets/7827975/Blue-October-tickets-Fri-Nov-27-2026-The-Pavilion-at-Toyota-Music-Factory | - |
| tm-blue-october-2026-irving-vvg1yz_68kdxnx | Blue October | refresh (applied) | 7827976 | https://www.ticketliquidator.com/tickets/7827976/Blue-October-tickets-Sat-Nov-28-2026-The-Pavilion-at-Toyota-Music-Factory | - |
| tm-blue-october-2026-kansas-city-z7r9jz1a7xk4- | Blue October | refresh (applied) | 7828059 | https://www.ticketliquidator.com/tickets/7828059/Blue-October-tickets-Thu-Dec-3-2026-The-Midland-Theatre-MO | - |
| tm-blue-october-2026-minneapolis-vv1akzkowgkdjzvr0 | Blue October | refresh (applied) | 7827978 | https://www.ticketliquidator.com/tickets/7827978/Blue-October-tickets-Fri-Dec-4-2026-The-Fillmore-Minneapolis-Presented-by-Affinity-Plus | - |
| tm-blue-october-2026-la-vista-1aezz_kgks7afny | Blue October | refresh (applied) | 7827979 | https://www.ticketliquidator.com/tickets/7827979/Blue-October-tickets-Sat-Dec-5-2026-The-Astro-NE | - |
| tm-blue-october-2026-oklahoma-city-z7r9jz1a7-v0b | Blue October | refresh (applied) | 7828060 | https://www.ticketliquidator.com/tickets/7828060/Blue-October-tickets-Sun-Dec-6-2026-The-Criterion-Oklahoma-City | - |
| tm-blue-october-2026-beaumont-g5diz_kmboj7t | Blue October | refresh (applied) | 7827981 | https://www.ticketliquidator.com/tickets/7827981/Blue-October-tickets-Thu-Dec-10-2026-Jefferson-Theatre-TX | - |
| tm-blue-october-2026-austin-z7r9jz1a7-v0k | Blue October | refresh (applied) | 7828061 | https://www.ticketliquidator.com/tickets/7828061/Blue-October-tickets-Fri-Dec-11-2026-Bass-Concert-Hall | - |
| tm-blue-october-2026-hidalgo-g5diz_6r53fc7 | Blue October | refresh (applied) | 7827983 | https://www.ticketliquidator.com/tickets/7827983/Blue-October-tickets-Sun-Dec-13-2026-Payne-Arena | - |
| tm-blue-october-2026-corpus-christi-g5diz_65ljyy0 | Blue October | refresh (applied) | 7827984 | https://www.ticketliquidator.com/tickets/7827984/Blue-October-tickets-Thu-Dec-17-2026-Selena-Auditorium | - |
| tm-blue-october-2026-houston-g5diz_65lrohi | Blue October | refresh (applied) | 7827985 | https://www.ticketliquidator.com/tickets/7827985/Blue-October-tickets-Fri-Dec-18-2026-713-Music-Hall | - |
| tm-blue-october-2026-houston-g5diz_65lyohs | Blue October | refresh (applied) | 7827986 | https://www.ticketliquidator.com/tickets/7827986/Blue-October-tickets-Sat-Dec-19-2026-713-Music-Hall | - |
| tm-blue-october-2026-houston-g5diz_1sa9wed | Blue October | refresh (applied) | 7969786 | https://www.ticketliquidator.com/tickets/7969786/Blue-October-tickets-Sun-Dec-20-2026-713-Music-Hall | - |
| tm-blue-october-2027-midland-z7r9jz1a70pjo | Blue October | refresh (applied) | 7957476 | https://www.ticketliquidator.com/tickets/7957476/Blue-October-tickets-Fri-Jan-29-2027-Wagner-Noel-Performing-Arts-Center | - |
| tm-blue-october-2027-el-paso-vvg1yz_1msxe0e | Blue October | refresh (applied) | 7957260 | https://www.ticketliquidator.com/tickets/7957260/Blue-October-tickets-Sat-Jan-30-2027-The-Plaza-Theatre-El-Paso | - |
| tm-blue-october-2027-amarillo-z7r9jz1a7pxau | Blue October | refresh (applied) | 7957486 | https://www.ticketliquidator.com/tickets/7957486/Blue-October-tickets-Sun-Jan-31-2027-Globe-News-Center-For-The-Performing-Arts | - |
| tm-blue-october-2027-tucson-17k8v0g61r3fg2b | Blue October | refresh (applied) | 7957261 | https://www.ticketliquidator.com/tickets/7957261/Blue-October-tickets-Wed-Feb-3-2027-Rialto-Theatre-Tucson | - |
| tm-blue-october-2027-phoenix-17k8v0g61lto1cb | Blue October | refresh (applied) | 7957263 | https://www.ticketliquidator.com/tickets/7957263/Blue-October-tickets-Fri-Feb-5-2027-The-Van-Buren | - |
| tm-blue-october-2027-phoenix-17k8v0g61ltk12k | Blue October | refresh (applied) | 7957264 | https://www.ticketliquidator.com/tickets/7957264/Blue-October-tickets-Sat-Feb-6-2027-The-Van-Buren | - |
| tm-blue-october-2027-los-angeles-vvg10z_1ri5jq_ | Blue October | refresh (applied) | 7957265 | https://www.ticketliquidator.com/tickets/7957265/Blue-October-tickets-Sun-Feb-7-2027-The-Wiltern | - |
| tm-blue-october-2027-san-luis-obispo-z7r9jz1a70_f7 | Blue October | refresh (applied) | 7957493 | https://www.ticketliquidator.com/tickets/7957493/Blue-October-tickets-Wed-Feb-10-2027-Fremont-Theater-CA | - |
| tm-blue-october-2027-valley-center-vvg1iz_1qjyqty | Blue October | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Blue October; text: Blue October Blue October /tickets/7957267/Blue-October-tickets-Thu-Feb-11-2027-Harrahs-Southern-California-Casino-Resort Blue October Blue ) |
| tm-blue-october-2027-las-vegas-17ayv0g61ppuqbc | Blue October | refresh (applied) | 7957273 | https://www.ticketliquidator.com/tickets/7957273/Blue-October-tickets-Sat-Feb-13-2027-Brooklyn-Bowl-Las-Vegas | - |
| tm-blue-october-2027-bakersfield-z7r9jz1a70_4m | Blue October | refresh (applied) | 7957494 | https://www.ticketliquidator.com/tickets/7957494/Blue-October-tickets-Wed-Feb-17-2027-The-Historic-Bakersfield-Fox-Theater | - |
| tm-blue-october-2027-san-francisco-z7r9jz1a70_4z | Blue October | refresh (applied) | 7957495 | https://www.ticketliquidator.com/tickets/7957495/Blue-October-tickets-Thu-Feb-18-2027-The-Regency-Ballroom | - |
| tm-blue-october-2027-sacramento-g5vyz_1kgjhjj | Blue October | refresh (applied) | 7987108 | https://www.ticketliquidator.com/tickets/7987108/Blue-October-tickets-Fri-Feb-19-2027-Channel-24 | - |
| tm-blue-october-2027-sacramento-g5vyz_1kvkgjw | Blue October | refresh (applied) | 7957274 | https://www.ticketliquidator.com/tickets/7957274/Blue-October-tickets-Sat-Feb-20-2027-Channel-24 | - |
| tm-blue-october-2027-reno-17c8v0g61lh4py0 | Blue October | refresh (applied) | 7957275 | https://www.ticketliquidator.com/tickets/7957275/Blue-October-tickets-Sun-Feb-21-2027-Silver-Legacy-Casino | - |
| tm-blue-october-2027-spokane-g5vzz_1rinhtu | Blue October | refresh (applied) | 7957276 | https://www.ticketliquidator.com/tickets/7957276/Blue-October-tickets-Wed-Feb-24-2027-Knitting-Factory-Spokane | - |
| tm-blue-october-2027-vancouver-1778v0g61pgtl-u | Blue October | refresh (applied) | 7957283 | https://www.ticketliquidator.com/tickets/7957283/Blue-October-tickets-Thu-Feb-25-2027-Commodore-Ballroom | - |
| tm-blue-october-2027-seattle-vvg1hz_1rxwtla | Blue October | refresh (applied) | 7957277 | https://www.ticketliquidator.com/tickets/7957277/Blue-October-tickets-Fri-Feb-26-2027-Moore-Theatre-WA | - |
| tm-blue-october-2027-portland-z7r9jz1a70_-u | Blue October | refresh (applied) | 7957496 | https://www.ticketliquidator.com/tickets/7957496/Blue-October-tickets-Sat-Feb-27-2027-Roseland-Theater | - |
| tm-blue-october-2027-portland-z7r9jz1a70of9 | Blue October | refresh (applied) | 7957497 | https://www.ticketliquidator.com/tickets/7957497/Blue-October-tickets-Sun-Feb-28-2027-Roseland-Theater | - |
| tm-blue-october-2027-boise-g5vzz_1rcvq7p | Blue October | refresh (applied) | 7957278 | https://www.ticketliquidator.com/tickets/7957278/Blue-October-tickets-Wed-Mar-3-2027-Knitting-Factory-Concert-House-Boise | - |
| tm-blue-october-2027-salt-lake-city-z7r9jz1a70te4 | Blue October | refresh (applied) | 7957498 | https://www.ticketliquidator.com/tickets/7957498/Blue-October-tickets-Fri-Mar-5-2027-Rockwell-At-The-Complex | - |
| tm-blue-october-2027-denver-z7r9jz1a70_-g | Blue October | refresh (applied) | 7957244 | https://www.ticketliquidator.com/tickets/7957244/Blue-October-tickets-Sat-Mar-6-2027-The-Mission-Ballroom | - |
| tm-blue-october-2027-colorado-springs-z7r9jz1a70_p7 | Blue October | refresh (applied) | 7957499 | https://www.ticketliquidator.com/tickets/7957499/Blue-October-tickets-Sun-Mar-7-2027-Pikes-Peak-Center | - |
| tm-blue-october-2027-chicago-z7r9jz1a70_-s | Blue October | refresh (applied) | 7957500 | https://www.ticketliquidator.com/tickets/7957500/Blue-October-tickets-Thu-Mar-11-2027-Riviera-Theatre-IL | - |
| tm-blue-october-2027-des-moines-vvg1bz_1xphcoz | Blue October | refresh (applied) | 7957280 | https://www.ticketliquidator.com/tickets/7957280/Blue-October-tickets-Fri-Mar-12-2027-Hoyt-Sherman-Place-Theater | - |
| tm-blue-october-2027-rockford-17f8v0g61mnfk5g | Blue October | refresh (applied) | 7957282 | https://www.ticketliquidator.com/tickets/7957282/Blue-October-tickets-Sun-Mar-14-2027-Hard-Rock-Live-Rockford | - |
| tm-pentatonix-2026-charlottesville-vv1f7z_8uv7ozdc1c | Pentatonix | refresh (applied) | 8184423 | https://www.ticketliquidator.com/tickets/8184423/Pentatonix-tickets-Sat-Nov-28-2026-John-Paul-Jones-Arena | - |
| tm-pentatonix-2026-albany-k7vgf_2br5dvf | Pentatonix | refresh (applied) | 8184424 | https://www.ticketliquidator.com/tickets/8184424/Pentatonix-tickets-Sun-Nov-29-2026-MVP-Arena | - |
| tm-pentatonix-2026-baltimore-17a8v0g62urg9es | Pentatonix | refresh (applied) | 8184425 | https://www.ticketliquidator.com/tickets/8184425/Pentatonix-tickets-Thu-Dec-3-2026-CFG-Bank-Arena | - |
| tm-pentatonix-2026-columbia-g5evz_2t_yqom | Pentatonix | refresh (applied) | 8184426 | https://www.ticketliquidator.com/tickets/8184426/Pentatonix-tickets-Sat-Dec-5-2026-Colonial-Life-Arena | - |
| tm-pentatonix-2026-greenville-g5evz_2tznjd_ | Pentatonix | refresh (applied) | 8184428 | https://www.ticketliquidator.com/tickets/8184428/Pentatonix-tickets-Sun-Dec-6-2026-Bon-Secours-Wellness-Arena | - |
| tm-pentatonix-2026-raleigh-g5evz_2xkfyfh | Pentatonix | refresh (applied) | 8184430 | https://www.ticketliquidator.com/tickets/8184430/Pentatonix-tickets-Mon-Dec-7-2026-Lenovo-Center | - |
| tm-pentatonix-2026-nashville-g5viz_8pdi7wi | Pentatonix | refresh (applied) | 8184431 | https://www.ticketliquidator.com/tickets/8184431/Pentatonix-tickets-Wed-Dec-9-2026-Bridgestone-Arena | - |
| tm-pentatonix-2026-atlanta-vvg1zz_8pzyi3r | Pentatonix | refresh (applied) | 8184432 | https://www.ticketliquidator.com/tickets/8184432/Pentatonix-tickets-Thu-Dec-10-2026-State-Farm-Arena-GA | - |
| tm-pentatonix-2026-north-little-rock-g5viz_2r0054y | Pentatonix | refresh (applied) | 8184433 | https://www.ticketliquidator.com/tickets/8184433/Pentatonix-tickets-Sat-Dec-12-2026-Simmons-Bank-Arena | - |
| tm-pentatonix-2026-bossier-city-g5viz_2gyyd_m | Pentatonix | refresh (applied) | 8184435 | https://www.ticketliquidator.com/tickets/8184435/Pentatonix-tickets-Sun-Dec-13-2026-Brookshire-Grocery-Arena | - |
| tm-pentatonix-2026-austin-g5diz_8kmjslp | Pentatonix | refresh (applied) | 8184790 | https://www.ticketliquidator.com/tickets/8184790/Pentatonix-tickets-Tue-Dec-15-2026-Moody-Center-ATX | - |
| tm-pentatonix-2026-fort-worth-vvg1yz_cn4la0m | Pentatonix | refresh (applied) | 8184443 | https://www.ticketliquidator.com/tickets/8184443/Pentatonix-tickets-Wed-Dec-16-2026-Ariat-Arena | - |
| tm-pentatonix-2026-lubbock-z7r9jz1aaz-j6 | Pentatonix | refresh (applied) | 8193304 | https://www.ticketliquidator.com/tickets/8193304/Pentatonix-tickets-Thu-Dec-17-2026-United-Supermarkets-Arena | - |
| tm-pentatonix-2026-glendale-16_zkfdauzauuafa | Pentatonix | refresh (applied) | 8184445 | https://www.ticketliquidator.com/tickets/8184445/Pentatonix-tickets-Sat-Dec-19-2026-Desert-Diamond-Arena | - |
| tm-pentatonix-2026-san-diego-vvg1iz_2i-g3fb | Pentatonix | refresh (applied) | 8184448 | https://www.ticketliquidator.com/tickets/8184448/Pentatonix-tickets-Sun-Dec-20-2026-Viejas-Arena-At-Aztec-Bowl | - |
| tm-pentatonix-2026-inglewood-vv1aazkf7gkdi1gsn | Pentatonix | refresh (applied) | 8184452 | https://www.ticketliquidator.com/tickets/8184452/Pentatonix-tickets-Tue-Dec-22-2026-The-Kia-Forum | - |
| tm-tyla-2026-toronto-177zv0g6294fsr8 | Tyla | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tyla-2026-brooklyn-k7vgf_2xiqkw5 | Tyla | refresh (applied) | 8164811 | https://www.ticketliquidator.com/tickets/8164811/Tyla-tickets-Sat-Nov-28-2026-Brooklyn-Paramount | - |
| tm-tyla-2026-brooklyn-k7vgf_2xiquwo | Tyla | refresh (applied) | 8228565 | https://www.ticketliquidator.com/tickets/8228565/Tyla-tickets-Sun-Nov-29-2026-Brooklyn-Paramount | - |
| tm-tyla-2026-washington-17a8v0g6267w7kc | Tyla | refresh (applied) | 8164835 | https://www.ticketliquidator.com/tickets/8164835/Tyla-tickets-Wed-Dec-2-2026-The-Anthem-DC | - |
| tm-tyla-2026-tampa-vvg1vz_2xeqp5j | Tyla | refresh (applied) | 8164840 | https://www.ticketliquidator.com/tickets/8164840/Tyla-tickets-Sat-Dec-5-2026-The-Yuengling-Center | - |
| tm-tyla-2026-atlanta-vvg1zz_2xnv9ge | Tyla | refresh (applied) | 8164845 | https://www.ticketliquidator.com/tickets/8164845/Tyla-tickets-Sun-Dec-6-2026-Coca-Cola-Roxy | - |
| tm-tyla-2026-irving-vvg1yz_2hhoqxx | Tyla | refresh (applied) | 8164850 | https://www.ticketliquidator.com/tickets/8164850/Tyla-tickets-Wed-Dec-9-2026-The-Pavilion-at-Toyota-Music-Factory | - |
| tm-tyla-2026-houston-g5diz_2qrewdk | Tyla | refresh (applied) | 8164851 | https://www.ticketliquidator.com/tickets/8164851/Tyla-tickets-Thu-Dec-10-2026-713-Music-Hall | - |
| tm-tyla-2026-austin-g5diz_2xjh2vb | Tyla | refresh (applied) | 8164672 | https://www.ticketliquidator.com/tickets/8164672/Tyla-tickets-Fri-Dec-11-2026-Moody-Center-ATX | - |
| tm-tyla-2026-phoenix-17k8v0g62ljff-n | Tyla | refresh (applied) | 8164852 | https://www.ticketliquidator.com/tickets/8164852/Tyla-tickets-Mon-Dec-14-2026-Arizona-Financial-Theatre | - |
| tm-tyla-2026-san-diego-vvg1iz_cilyeb0 | Tyla | refresh (applied) | 8164857 | https://www.ticketliquidator.com/tickets/8164857/Tyla-tickets-Tue-Dec-15-2026-Viejas-Arena-At-Aztec-Bowl | - |
| tm-tyla-2026-inglewood-vvg1iz_cjqejmf | Tyla | refresh (applied) | 8164858 | https://www.ticketliquidator.com/tickets/8164858/Tyla-tickets-Wed-Dec-16-2026-YouTube-Theater-at-Hollywood-Park | - |
| tm-tyla-2026-las-vegas-17ayv0g629nf-rw | Tyla | refresh (applied) | 8164859 | https://www.ticketliquidator.com/tickets/8164859/Tyla-tickets-Sat-Dec-19-2026-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-nothing-but-thieves-2027-amsterdam-z698xzbpz1k4d_v4s | Nothing But Thieves | refresh (applied) | 8090592 | https://www.ticketliquidator.com/tickets/8090592/Nothing-But-Thieves-tickets-Fri-Jan-15-2027-Ziggo-Dome | - |
| tm-nothing-but-thieves-2027-amsterdam-z698xzbpz1k86ab8e | Nothing But Thieves | refresh (applied) | 8090593 | https://www.ticketliquidator.com/tickets/8090593/Nothing-But-Thieves-tickets-Sat-Jan-16-2027-Ziggo-Dome | - |
| tm-nothing-but-thieves-2027-assago-zg9rmiynyzefv7 | Nothing But Thieves | refresh (applied) | 8090589 | https://www.ticketliquidator.com/tickets/8090589/Nothing-But-Thieves-tickets-Sun-Jan-24-2027-Forum-di-Milano | - |
| tm-nothing-but-thieves-2027-merksem-antwerpen-z698xzg2z16v_u87zn | Nothing But Thieves | refresh (applied) | 8090595 | https://www.ticketliquidator.com/tickets/8090595/Nothing-But-Thieves-tickets-Sun-Jan-31-2027-AFAS-Dome | - |
| tm-nothing-but-thieves-2027-nottingham-17u8v0g65hxepmr | Nothing But Thieves | refresh (applied) | 8090588 | https://www.ticketliquidator.com/tickets/8090588/Nothing-But-Thieves-tickets-Thu-Feb-4-2027-Motorpoint-Arena-Nottingham | - |
| tm-nothing-but-thieves-2027-london-17u8v0g65h5y7dp | Nothing But Thieves | refresh (applied) | 8277111 | https://www.ticketliquidator.com/tickets/8277111/Nothing-But-Thieves-tickets-Fri-Feb-5-2027-O2-Arena-London | - |
| tm-nothing-but-thieves-2027-cardiff-17uov0g65qps55o | Nothing But Thieves | refresh (applied) | 8090587 | https://www.ticketliquidator.com/tickets/8090587/Nothing-But-Thieves-tickets-Mon-Feb-8-2027-Cardiff-International-Arena | - |
| tm-nothing-but-thieves-2027-glasgow-17uov0g65qojiik | Nothing But Thieves | refresh (applied) | 8090594 | https://www.ticketliquidator.com/tickets/8090594/Nothing-But-Thieves-tickets-Wed-Feb-10-2027-OVO-Hydro | - |
| tm-nothing-but-thieves-2027-manchester-17uyv0g65hofvrj | Nothing But Thieves | refresh (applied) | 7996760 | https://www.ticketliquidator.com/tickets/7996760/Nothing-But-Thieves-tickets-Fri-Feb-12-2027-Co-Op-Live | - |
| tm-nothing-but-thieves-2027-birmingham-17fyv0g65h43oux | Nothing But Thieves | refresh (applied) | 8090586 | https://www.ticketliquidator.com/tickets/8090586/Nothing-But-Thieves-tickets-Sat-Feb-13-2027-bp-pulse-LIVE | - |
| tm-nothing-but-thieves-2027-vancouver-1778v0g65pb8zxj | Nothing But Thieves | refresh (applied) | 7996252 | https://www.ticketliquidator.com/tickets/7996252/Nothing-But-Thieves-tickets-Tue-Mar-30-2027-Queen-Elizabeth-Theatre-Vancouver | - |
| tm-nothing-but-thieves-2027-seattle-vvg1hz_59quyyu | Nothing But Thieves | refresh (applied) | 7996241 | https://www.ticketliquidator.com/tickets/7996241/Nothing-But-Thieves-tickets-Wed-Mar-31-2027-Paramount-Theatre-Seattle | - |
| tm-nothing-but-thieves-2027-portland-z7r9jz1a70gfm | Nothing But Thieves | refresh (applied) | 7996255 | https://www.ticketliquidator.com/tickets/7996255/Nothing-But-Thieves-tickets-Thu-Apr-1-2027-McMenamins-Crystal-Ballroom | - |
| tm-nothing-but-thieves-2027-oakland-g5vyz_5kszteq | Nothing But Thieves | refresh (applied) | 7996242 | https://www.ticketliquidator.com/tickets/7996242/Nothing-But-Thieves-tickets-Sat-Apr-3-2027-Fox-Theater-Oakland | - |
| tm-nothing-but-thieves-2027-hollywood-vvg10z_5blnvha | Nothing But Thieves | refresh (applied) | 7996243 | https://www.ticketliquidator.com/tickets/7996243/Nothing-But-Thieves-tickets-Sun-Apr-4-2027-Hollywood-Palladium | - |
| tm-nothing-but-thieves-2027-phoenix-17k8v0g659aif3n | Nothing But Thieves | refresh (applied) | 7996244 | https://www.ticketliquidator.com/tickets/7996244/Nothing-But-Thieves-tickets-Wed-Apr-7-2027-The-Van-Buren | - |
| tm-nothing-but-thieves-2027-denver-z7r9jz1a70g46 | Nothing But Thieves | refresh (applied) | 7996257 | https://www.ticketliquidator.com/tickets/7996257/Nothing-But-Thieves-tickets-Fri-Apr-9-2027-The-Mission-Ballroom | - |
| tm-nothing-but-thieves-2027-minneapolis-vvg1bz_5fojtcd | Nothing But Thieves | refresh (applied) | 7996245 | https://www.ticketliquidator.com/tickets/7996245/Nothing-But-Thieves-tickets-Sun-Apr-11-2027-The-Fillmore-Minneapolis-Presented-by-Affinity-Plus | - |
| tm-nothing-but-thieves-2027-chicago-vvg18z_5oubqpe | Nothing But Thieves | refresh (applied) | 7996246 | https://www.ticketliquidator.com/tickets/7996246/Nothing-But-Thieves-tickets-Mon-Apr-12-2027-The-Salt-Shed-Indoors-Chicago | - |
| tm-nothing-but-thieves-2027-detroit-vvg1oz_5qme6mi | Nothing But Thieves | refresh (applied) | 7996247 | https://www.ticketliquidator.com/tickets/7996247/Nothing-But-Thieves-tickets-Tue-Apr-13-2027-The-Fillmore-Detroit | - |
| tm-nothing-but-thieves-2027-mckees-rocks-17aov0g65qrt_qd | Nothing But Thieves | refresh (applied) | 7996248 | https://www.ticketliquidator.com/tickets/7996248/Nothing-But-Thieves-tickets-Thu-Apr-15-2027-Roxian-Theatre | - |
| tm-nothing-but-thieves-2027-philadelphia-vvg1fz_5qfmzvi | Nothing But Thieves | refresh (applied) | 7996249 | https://www.ticketliquidator.com/tickets/7996249/Nothing-But-Thieves-tickets-Fri-Apr-16-2027-The-Fillmore-Philadelphia | - |
| tm-nothing-but-thieves-2027-brooklyn-k7vgf_5qzhcl7 | Nothing But Thieves | refresh (applied) | 7996250 | https://www.ticketliquidator.com/tickets/7996250/Nothing-But-Thieves-tickets-Sat-Apr-17-2027-Brooklyn-Paramount | - |
| tm-nothing-but-thieves-2027-boston-vvg17z_5qrro-j | Nothing But Thieves | refresh (applied) | 7996251 | https://www.ticketliquidator.com/tickets/7996251/Nothing-But-Thieves-tickets-Mon-Apr-19-2027-Citizens-House-Of-Blues-Boston | - |
| tm-nothing-but-thieves-2027-montreal-17g8v0g65q_kpje | Nothing But Thieves | refresh (applied) | 7996253 | https://www.ticketliquidator.com/tickets/7996253/Nothing-But-Thieves-tickets-Tue-Apr-20-2027-MTelus | - |
| tm-nothing-but-thieves-2027-toronto-177zv0g65qu93gl | Nothing But Thieves | none | - | - | no qualifying listing (complete catalog checked) |
| tm-trivium-2026-houston-g5diz_cdfyhi_ | Trivium | refresh (applied) | 8151254 | https://www.ticketliquidator.com/tickets/8151254/Trivium-tickets-Sat-Nov-28-2026-Bayou-Music-Center | - |
| tm-trivium-2026-dallas-vvg1yz_cdoxznj | Trivium | refresh (applied) | 8151256 | https://www.ticketliquidator.com/tickets/8151256/Trivium-tickets-Sun-Nov-29-2026-South-Side-Ballroom-at-Gilleys | - |
| tm-trivium-2026-phoenix-17k8v0g62douihb | Trivium | refresh (applied) | 8151257 | https://www.ticketliquidator.com/tickets/8151257/Trivium-tickets-Wed-Dec-2-2026-Arizona-Financial-Theatre | - |
| tm-trivium-2026-inglewood-vvg1iz_ceqwhij | Trivium | refresh (applied) | 8151261 | https://www.ticketliquidator.com/tickets/8151261/Trivium-tickets-Fri-Dec-4-2026-YouTube-Theater-at-Hollywood-Park | - |
| tm-trivium-2026-san-francisco-g5vyz_2ejmndl | Trivium | refresh (applied) | 8151262 | https://www.ticketliquidator.com/tickets/8151262/Trivium-tickets-Sat-Dec-5-2026-The-Masonic-San-Francisco | - |
| tm-trivium-2026-penticton-z7r9jz1aazdbz | Trivium | refresh (applied) | 8151283 | https://www.ticketliquidator.com/tickets/8151283/Trivium-tickets-Mon-Dec-7-2026-Penticton-Trade-Convention-Centre | - |
| tm-trivium-2026-vancouver-1778v0g626krqj1 | Trivium | refresh (applied) | 8151273 | https://www.ticketliquidator.com/tickets/8151273/Trivium-tickets-Tue-Dec-8-2026-UBC-Doug-Mitchell-Thunderbird-Sports-Centre | - |
| tm-trivium-2026-seattle-vvg1hz_2dp1x5t | Trivium | refresh (applied) | 8151265 | https://www.ticketliquidator.com/tickets/8151265/Trivium-tickets-Wed-Dec-9-2026-Paramount-Theatre-Seattle | - |
| tm-trivium-2026-reno-17ayv0g6cnaivry | Trivium | refresh (applied) | 8151267 | https://www.ticketliquidator.com/tickets/8151267/Trivium-tickets-Fri-Dec-11-2026-Grand-Sierra-Theatre | - |
| tm-trivium-2026-denver-z7r9jz1aazdby | Trivium | refresh (applied) | 8151286 | https://www.ticketliquidator.com/tickets/8151286/Trivium-tickets-Sun-Dec-13-2026-The-Mission-Ballroom | - |
| tm-trivium-2026-tulsa-z7r9jz1aazd_z | Trivium | correct (applied) | 8359228 | https://www.ticketliquidator.com/tickets/8359228/Trivium-tickets-Tue-Dec-15-2026-Tulsa-Theater | - |
| tm-trivium-2026-omaha-17fzv0g6cxxpndr | Trivium | refresh (applied) | 8151268 | https://www.ticketliquidator.com/tickets/8151268/Trivium-tickets-Wed-Dec-16-2026-Steelhouse-Omaha | - |
| tm-trivium-2026-pittsburgh-17aov0g6cymqerk | Trivium | refresh (applied) | 8151269 | https://www.ticketliquidator.com/tickets/8151269/Trivium-tickets-Fri-Dec-18-2026-Citizens-Live-at-The-Wylie | - |
| tm-trivium-2026-charlotte-g5evz_cufmier | Trivium | refresh (applied) | 8151270 | https://www.ticketliquidator.com/tickets/8151270/Trivium-tickets-Sat-Dec-19-2026-The-Fillmore-Charlotte | - |
| tm-trivium-2027-glasgow-1auzkfpgken_hpc | Trivium | none | - | - | no qualifying listing (complete catalog checked) |
| tm-trivium-2027-manchester-1amzkffgkdkmgfp | Trivium | refresh (applied) | 8233453 | https://www.ticketliquidator.com/tickets/8233453/Trivium-tickets-Fri-Apr-2-2027-Co-Op-Live | - |
| tm-trivium-2027-london-g5vhz_o63ceuv | Trivium | none | - | - | no qualifying listing (complete catalog checked) |
| tm-trivium-2027-cardiff-1kuovpa6gacrw-h | Trivium | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sabaton-2026-pittsburgh-1avbz_kgkwfjp1j | Sabaton | refresh (applied) | 7808973 | https://www.ticketliquidator.com/tickets/7808973/Sabaton-tickets-Thu-Dec-3-2026-Citizens-Live-at-The-Wylie | - |
| tm-sabaton-2026-nashville-g5viz_kmyac0s | Sabaton | refresh (applied) | 7808860 | https://www.ticketliquidator.com/tickets/7808860/Sabaton-tickets-Wed-Dec-9-2026-The-Truth | - |
| tm-sabaton-2026-orlando-16efz_afzg7dbn1 | Sabaton | refresh (applied) | 7784220 | https://www.ticketliquidator.com/tickets/7784220/Sabaton-tickets-Fri-Dec-11-2026-Hard-Rock-Live-Orlando | - |
| tm-sabaton-2026-fort-lauderdale-z7r9jz1a7-oqe | Sabaton | refresh (applied) | 7409995 | https://www.ticketliquidator.com/tickets/7409995/Sabaton-tickets-Sat-Dec-12-2026-FTL-War-Memorial-Auditorium | - |
| tm-sabaton-2027-glasgow-17uov0g6g3si1v4 | Sabaton | refresh (applied) | 8127263 | https://www.ticketliquidator.com/tickets/8127263/Sabaton-tickets-Fri-Apr-9-2027-OVO-Hydro | - |
| tm-sabaton-2027-birmingham-17fyv0g6gp8gytu | Sabaton | refresh (applied) | 8127262 | https://www.ticketliquidator.com/tickets/8127262/Sabaton-tickets-Sat-Apr-10-2027-bp-pulse-LIVE | - |
| tm-sabaton-2027-rotterdam-z698xzbpz1k_n08z3 | Sabaton | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beartooth-2026-nashville-g5viz_1sjbpcf | Beartooth | refresh (applied) | 7980219 | https://www.ticketliquidator.com/tickets/7980219/Beartooth-tickets-Sat-Nov-28-2026-The-Truth | - |
| tm-beartooth-2026-atlanta-vvg1zz_1br-um- | Beartooth | refresh (applied) | 7980221 | https://www.ticketliquidator.com/tickets/7980221/Beartooth-tickets-Sun-Nov-29-2026-Coca-Cola-Roxy | - |
| tm-beartooth-2026-charlotte-g5evz_1mwgsx1 | Beartooth | refresh (applied) | 7980223 | https://www.ticketliquidator.com/tickets/7980223/Beartooth-tickets-Tue-Dec-1-2026-The-Fillmore-Charlotte | - |
| tm-beartooth-2026-saint-augustine-z7r9jz1a70igm | Beartooth | refresh (applied) | 7980225 | https://www.ticketliquidator.com/tickets/7980225/Beartooth-tickets-Fri-Dec-4-2026-St-Augustine-Amphitheatre | - |
| tm-beartooth-2026-fort-lauderdale-z7r9jz1a70igy | Beartooth | refresh (applied) | 7980227 | https://www.ticketliquidator.com/tickets/7980227/Beartooth-tickets-Sat-Dec-5-2026-FTL-War-Memorial-Auditorium | - |
| tm-beartooth-2026-new-orleans-g5viz_1lu2gm0 | Beartooth | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Beartooth, Don Broco, Magnolia Park & Windwaker; text: Beartooth, Don Broco, Magnolia Park & Windwaker Beartooth, Don Broco, Magnolia Park & Windwaker /tickets/7980229/Beartooth-tickets-Mon-Dec-7) |
| tm-beartooth-2026-dallas-vvg1yz_1mmkrmi | Beartooth | refresh (applied) | 7980234 | https://www.ticketliquidator.com/tickets/7980234/Beartooth-tickets-Thu-Dec-10-2026-South-Side-Ballroom-at-Gilleys | - |
| tm-beartooth-2026-denver-g5vzz_1sigr2s | Beartooth | refresh (applied) | 7980235 | https://www.ticketliquidator.com/tickets/7980235/Beartooth-tickets-Sat-Dec-12-2026-Fillmore-Auditorium-Colorado | - |
| tm-beartooth-2026-salt-lake-city-g5vzz_1w63kam | Beartooth | refresh (applied) | 7980237 | https://www.ticketliquidator.com/tickets/7980237/Beartooth-tickets-Sun-Dec-13-2026-The-Union-Event-Center | - |
| tm-beartooth-2026-phoenix-17k8v0g61i5gitx | Beartooth | refresh (applied) | 7980239 | https://www.ticketliquidator.com/tickets/7980239/Beartooth-tickets-Wed-Dec-16-2026-The-Van-Buren | - |
| tm-beartooth-2026-hollywood-vvg10z_1ikgdyb | Beartooth | refresh (applied) | 7980240 | https://www.ticketliquidator.com/tickets/7980240/Beartooth-tickets-Fri-Dec-18-2026-Hollywood-Palladium | - |
| tm-beartooth-2026-wheatland-g5vyz_1xgdb2f | Beartooth | refresh (applied) | 7980241 | https://www.ticketliquidator.com/tickets/7980241/Beartooth-tickets-Sat-Dec-19-2026-Hard-Rock-Live-Sacramento | - |
| tm-luke-combs-2027-minneapolis-z7r9jz1aazgx6 | Luke Combs | refresh (applied) | 8203741 | https://www.ticketliquidator.com/tickets/8203741/Luke-Combs-tickets-Sat-Apr-10-2027-US-Bank-Stadium | - |
| tm-sombr-2027-hamburg-z698xzc2z1k-yjfqj | Sombr | refresh (applied) | 8245510 | https://www.ticketliquidator.com/tickets/8245510/sombr-tickets-Fri-May-14-2027-Barclays-Arena-Hamburg | - |
| tm-sombr-2027-merksem-antwerpen-z698xzg2z16v0pps8o | Sombr | refresh (applied) | 8389780 | https://www.ticketliquidator.com/tickets/8389780/sombr-tickets-Sun-May-16-2027-AFAS-Dome | - |
| tm-sombr-2027-berlin-z698xzc2z1akrz8f | Sombr | refresh (applied) | 8245511 | https://www.ticketliquidator.com/tickets/8245511/sombr-tickets-Tue-May-18-2027-Uber-Arena | - |
| tm-sombr-2027-munich-z698xzc2z1kosuv4v | Sombr | refresh (applied) | 8245513 | https://www.ticketliquidator.com/tickets/8245513/sombr-tickets-Fri-May-28-2027-Kleine-Olympiahalle-Munich | - |
| tm-sombr-2027-amsterdam-z698xzbpz16ee7oboy | Sombr | refresh (applied) | 8245523 | https://www.ticketliquidator.com/tickets/8245523/sombr-tickets-Mon-May-31-2027-Ziggo-Dome | - |
| tm-sombr-2027-amsterdam-z698xzbpz16v0w4skv | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sombr-2027-milano-zg9rmiynyzd611 | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sombr-2027-glasgow-1auzkfbgkeiqyo0 | Sombr | refresh (applied) | 8245421 | https://www.ticketliquidator.com/tickets/8245421/sombr-tickets-Sat-Jun-19-2027-Bellahouston-Park | - |
| tm-sombr-2027-london-1adfz_ogkwyrfux | Sombr | refresh (applied) | 8245378 | https://www.ticketliquidator.com/tickets/8245378/sombr-tickets-Mon-Jun-21-2027-O2-Arena-London | - |
| tm-sombr-2027-london-1adfz_ogklwvhfa | Sombr | refresh (applied) | 8245379 | https://www.ticketliquidator.com/tickets/8245379/sombr-tickets-Tue-Jun-22-2027-O2-Arena-London | - |
| tm-sombr-2027-london-1adfz_ogkwskt7w | Sombr | refresh (applied) | 8245380 | https://www.ticketliquidator.com/tickets/8245380/sombr-tickets-Thu-Jun-24-2027-O2-Arena-London | - |
| tm-sombr-2027-london-1adfz_ogkwy2ti0 | Sombr | refresh (applied) | 8248707 | https://www.ticketliquidator.com/tickets/8248707/sombr-tickets-Fri-Jun-25-2027-O2-Arena-London | - |
| tm-sombr-2027-london-1adfz_ogkwwynfm | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0v4 | Teddy Swims | conflict | - | - | ambiguous: missing or conflicting performance start evidence; candidates: 8167545 @ no start time ("Teddy Swims") |
| tm-teddy-swims-2027-greenwich-z7r9jz1aav0vp | Teddy Swims | conflict | - | - | ambiguous: missing or conflicting performance start evidence; candidates: 8173004 @ no start time ("Teddy Swims") |
| tm-polyphia-2026-warsaw-z698xzqpz1k-vasek | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-polyphia-2026-berlin-z698xzc2z16vompnuz | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-polyphia-2026-oberhausen-z698xzc2z16vk8v9xd | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-polyphia-2026-birmingham-g5dzz_gsc9wjr | Polyphia | refresh (applied) | 8265862 | https://www.ticketliquidator.com/tickets/8265862/Polyphia-tickets-Fri-Dec-11-2026-O2-Academy-Birmingham | - |
| tm-polyphia-2026-manchester-g5vhz_gr4jgl2 | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-polyphia-2026-leeds-g5dzz_gl9y_6t | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-polyphia-2026-london-g5dzz_gljhn6p | Polyphia | refresh (applied) | 8324859 | https://www.ticketliquidator.com/tickets/8324859/Polyphia-tickets-Wed-Dec-16-2026-O2-Academy-Brixton | - |
| tm-polyphia-2027-phoenix-16_zkf_ofzag77fu | Polyphia | refresh (applied) | 8235923 | https://www.ticketliquidator.com/tickets/8235923/Polyphia-tickets-Fri-Feb-5-2027-Arizona-Financial-Theatre | - |
| tm-polyphia-2027-las-vegas-169zkfppazau15va | Polyphia | refresh (applied) | 8235924 | https://www.ticketliquidator.com/tickets/8235924/Polyphia-tickets-Sat-Feb-6-2027-House-Of-Blues-Las-Vegas | - |
| tm-polyphia-2027-san-diego-z7r9jz1aav67j | Polyphia | refresh (applied) | 8235926 | https://www.ticketliquidator.com/tickets/8235926/Polyphia-tickets-Wed-Feb-10-2027-SOMA | - |
| tm-polyphia-2027-seattle-vvg1hz_oxmv1cx | Polyphia | refresh (applied) | 8235936 | https://www.ticketliquidator.com/tickets/8235936/Polyphia-tickets-Wed-Feb-17-2027-Paramount-Theatre-Seattle | - |
| tm-polyphia-2027-salt-lake-city-g5vzz_ojsblfw | Polyphia | refresh (applied) | 8056767 | https://www.ticketliquidator.com/tickets/8056767/Polyphia-tickets-Fri-Feb-19-2027-The-Depot-Salt-Lake-City | - |
| tm-polyphia-2027-denver-g5vzz_oe6fcei | Polyphia | refresh (applied) | 8056769 | https://www.ticketliquidator.com/tickets/8056769/Polyphia-tickets-Sat-Feb-20-2027-Fillmore-Auditorium-Colorado | - |
| tm-polyphia-2027-minneapolis-vv16kzkfbfazacg5v8 | Polyphia | refresh (applied) | 8056766 | https://www.ticketliquidator.com/tickets/8056766/Polyphia-tickets-Tue-Feb-23-2027-Uptown-Theatre-Minneapolis | - |
| tm-polyphia-2027-indianapolis-vv1aazkfbgkd_h8yq | Polyphia | refresh (applied) | 8235950 | https://www.ticketliquidator.com/tickets/8235950/Polyphia-tickets-Fri-Feb-26-2027-Egyptian-Room-At-Old-National-Centre | - |
| tm-polyphia-2027-charlotte-g5evz_ojpf6hx | Polyphia | refresh (applied) | 8235961 | https://www.ticketliquidator.com/tickets/8235961/Polyphia-tickets-Fri-Mar-12-2027-The-Fillmore-Charlotte | - |
| tm-polyphia-2027-st-petersburg-vvg1vz_oesihnv | Polyphia | refresh (applied) | 8235963 | https://www.ticketliquidator.com/tickets/8235963/Polyphia-tickets-Sun-Mar-14-2027-Jannus-Live | - |
| tm-polyphia-2027-birmingham-1aozkfbgkdtjfo5 | Polyphia | refresh (applied) | 8235965 | https://www.ticketliquidator.com/tickets/8235965/Polyphia-tickets-Wed-Mar-17-2027-Avondale-Brewing-Company | - |
| tm-stella-lefty-2027-detroit-vv1afzkfkgkesu99t | Stella Lefty | refresh (applied) | 8231213 | https://www.ticketliquidator.com/tickets/8231213/Stella-Lefty-tickets-Sat-Jan-9-2027-The-Fillmore-Detroit | - |
| tm-stella-lefty-2027-columbus-z7r9jz1aav7q6 | Stella Lefty | refresh (applied) | 8231224 | https://www.ticketliquidator.com/tickets/8231224/Stella-Lefty-tickets-Sun-Jan-10-2027-KEMBA-Live | - |
| tm-stella-lefty-2027-toronto-1a8zkf4gkddr1l2 | Stella Lefty | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stella-lefty-2027-toronto-1avzz_ogklpe4bz | Stella Lefty | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stella-lefty-2027-montreal-1kg8vp7yga51kww | Stella Lefty | refresh (applied) | 8231124 | https://www.ticketliquidator.com/tickets/8231124/Stella-Lefty-tickets-Fri-Jan-15-2027-MTelus | - |
| tm-stella-lefty-2027-boston-vv168vp7y-kz7ukua | Stella Lefty | refresh (applied) | 8231214 | https://www.ticketliquidator.com/tickets/8231214/Stella-Lefty-tickets-Sun-Jan-17-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-stella-lefty-2027-brooklyn-k7vgf_ocrjdss | Stella Lefty | refresh (applied) | 8231219 | https://www.ticketliquidator.com/tickets/8231219/Stella-Lefty-tickets-Tue-Jan-19-2027-Brooklyn-Paramount | - |
| tm-stella-lefty-2027-brooklyn-k7vgf_ocrqdsw | Stella Lefty | refresh (applied) | 8237158 | https://www.ticketliquidator.com/tickets/8237158/Stella-Lefty-tickets-Wed-Jan-20-2027-Brooklyn-Paramount | - |
| tm-stella-lefty-2027-philadelphia-vv1aezkfkgkddxsrk | Stella Lefty | refresh (applied) | 8231140 | https://www.ticketliquidator.com/tickets/8231140/Stella-Lefty-tickets-Fri-Jan-22-2027-The-Met-Presented-by-Highmark | - |
| tm-stella-lefty-2027-washington-1a4zkffgkdf8c-z | Stella Lefty | refresh (applied) | 8231143 | https://www.ticketliquidator.com/tickets/8231143/Stella-Lefty-tickets-Sat-Jan-23-2027-The-Anthem-DC | - |
| tm-stella-lefty-2027-charlotte-g5evz_o9kpb3z | Stella Lefty | refresh (applied) | 8231132 | https://www.ticketliquidator.com/tickets/8231132/Stella-Lefty-tickets-Mon-Jan-25-2027-The-Fillmore-Charlotte | - |
| tm-stella-lefty-2027-atlanta-vvg1zz_olg43wy | Stella Lefty | refresh (applied) | 8231137 | https://www.ticketliquidator.com/tickets/8231137/Stella-Lefty-tickets-Tue-Jan-26-2027-The-Tabernacle-GA | - |
| tm-stella-lefty-2027-dallas-vvg1yz_o8qf6xm | Stella Lefty | refresh (applied) | 8231142 | https://www.ticketliquidator.com/tickets/8231142/Stella-Lefty-tickets-Thu-Jan-28-2027-South-Side-Ballroom-at-Gilleys | - |
| tm-stella-lefty-2027-houston-g5diz_opbsxqh | Stella Lefty | refresh (applied) | 8231123 | https://www.ticketliquidator.com/tickets/8231123/Stella-Lefty-tickets-Sat-Jan-30-2027-House-Of-Blues-Houston | - |
| tm-stella-lefty-2027-san-francisco-g5vyz_ok5hlnw | Stella Lefty | refresh (applied) | 8231139 | https://www.ticketliquidator.com/tickets/8231139/Stella-Lefty-tickets-Tue-Feb-9-2027-The-Masonic-San-Francisco | - |
| tm-stella-lefty-2027-salt-lake-city-g5vzz_okzttv5 | Stella Lefty | refresh (applied) | 8231141 | https://www.ticketliquidator.com/tickets/8231141/Stella-Lefty-tickets-Fri-Feb-12-2027-The-Union-Event-Center | - |
| tm-stella-lefty-2027-denver-g5vzz_o3ivhxh | Stella Lefty | refresh (applied) | 8231127 | https://www.ticketliquidator.com/tickets/8231127/Stella-Lefty-tickets-Sat-Feb-13-2027-Fillmore-Auditorium-Colorado | - |
| tm-stella-lefty-2027-chicago-vv1a7zkf3ovc9zec5 | Stella Lefty | refresh (applied) | 8231138 | https://www.ticketliquidator.com/tickets/8231138/Stella-Lefty-tickets-Sat-Feb-20-2027-Byline-Bank-Aragon-Ballroom | - |
| tm-stella-lefty-2027-amsterdam-z698xzbpz16vj_pxbp | Stella Lefty | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stella-lefty-2027-manchester-g5dzz_36uppzk | Stella Lefty | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stella-lefty-2027-birmingham-g5dzz_o1n7vhc | Stella Lefty | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2027-ottawa-1aszkf_gkdi5bcd | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2027-london-1avzz_ogktcpwjw | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2027-toronto-1a8zkf_gkdyntyg | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2027-brooklyn-k7vgf_ocsz0pi | Saint Levant | refresh (applied) | 8244019 | https://www.ticketliquidator.com/tickets/8244019/Saint-Levant-tickets-Thu-Apr-1-2027-Brooklyn-Paramount | - |
| tm-saint-levant-2027-chicago-vv1a7zkf_gkewujj1 | Saint Levant | refresh (applied) | 8133113 | https://www.ticketliquidator.com/tickets/8133113/Saint-Levant-tickets-Sat-Apr-3-2027-Byline-Bank-Aragon-Ballroom | - |
| tm-saint-levant-2027-detroit-vv1koz_opyg7lxkw | Saint Levant | refresh (applied) | 8244020 | https://www.ticketliquidator.com/tickets/8244020/Saint-Levant-tickets-Wed-Apr-7-2027-The-Fillmore-Detroit | - |
| tm-saint-levant-2027-silver-spring-1ka8vpkbgagykaz | Saint Levant | refresh (applied) | 8244017 | https://www.ticketliquidator.com/tickets/8244017/Saint-Levant-tickets-Sat-Apr-10-2027-The-Fillmore-Silver-Spring | - |
| tm-saint-levant-2027-los-angeles-vv1aazkf_gkdotx7a | Saint Levant | refresh (applied) | 8244022 | https://www.ticketliquidator.com/tickets/8244022/Saint-Levant-tickets-Sun-May-2-2027-The-Wiltern | - |
| tm-saint-levant-2027-seattle-vvg1hz_oejiei5 | Saint Levant | refresh (applied) | 8244021 | https://www.ticketliquidator.com/tickets/8244021/Saint-Levant-tickets-Mon-May-10-2027-Paramount-Theatre-Seattle | - |
| tm-saint-levant-2027-vancouver-1aozkfbgkd_gms9 | Saint Levant | refresh (applied) | 8244014 | https://www.ticketliquidator.com/tickets/8244014/Saint-Levant-tickets-Wed-May-12-2027-Malkin-Bowl-Stanley-Park | - |
| tm-saint-levant-2027-vancouver-1aozkfbgkdqarvt | Saint Levant | refresh (applied) | 8244009 | https://www.ticketliquidator.com/tickets/8244009/Saint-Levant-tickets-Thu-May-13-2027-Malkin-Bowl-Stanley-Park | - |
| tm-the-airborne-toxic-event-2026-glenside-z7r9jz1a70_pw | The Airborne Toxic Event | refresh (applied) | 7978102 | https://www.ticketliquidator.com/tickets/7978102/The-Airborne-Toxic-Event-tickets-Wed-May-19-2027-Keswick-Theatre | - |
| tm-the-airborne-toxic-event-2027-chicago-z7r9jz1aazbfj | The Airborne Toxic Event | refresh (applied) | 7978141 | https://www.ticketliquidator.com/tickets/7978141/The-Airborne-Toxic-Event-tickets-Wed-May-26-2027-Vic-Theatre | - |
| tm-the-airborne-toxic-event-2027-englewood-z7r9jz1aazgov | The Airborne Toxic Event | refresh (applied) | 7978059 | https://www.ticketliquidator.com/tickets/7978059/The-Airborne-Toxic-Event-tickets-Tue-Jun-8-2027-Gothic-Theatre | - |
| tm-the-airborne-toxic-event-2027-portland-z7r9jz1aazfzx | The Airborne Toxic Event | refresh (applied) | 7977696 | https://www.ticketliquidator.com/tickets/7977696/The-Airborne-Toxic-Event-tickets-Fri-Jun-11-2027-Revolution-Hall-Portland | - |
| tm-andrea-bocelli-2026-boston-vv1k7z_dz6g7ymm- | Andrea Bocelli | refresh (applied) | 7711521 | https://www.ticketliquidator.com/tickets/7711521/Andrea-Bocelli-tickets-Thu-Dec-10-2026-TD-Garden | - |
| tm-andrea-bocelli-2026-buffalo-k7vgf_dlhwxlk | Andrea Bocelli | refresh (applied) | 7711522 | https://www.ticketliquidator.com/tickets/7711522/Andrea-Bocelli-tickets-Fri-Dec-11-2026-KeyBank-Center | - |
| tm-andrea-bocelli-2026-montreal-1ad7z_dgkclbvf3 | Andrea Bocelli | refresh (applied) | 7711527 | https://www.ticketliquidator.com/tickets/7711527/Andrea-Bocelli-tickets-Sun-Dec-13-2026-Centre-Bell | - |
| tm-andrea-bocelli-2026-new-york-g5diz_drrs_4p | Andrea Bocelli | refresh (applied) | 7711523 | https://www.ticketliquidator.com/tickets/7711523/Andrea-Bocelli-tickets-Wed-Dec-16-2026-Madison-Square-Garden | - |
| tm-andrea-bocelli-2026-new-york-g5diz_drrgy4q | Andrea Bocelli | refresh (applied) | 7711524 | https://www.ticketliquidator.com/tickets/7711524/Andrea-Bocelli-tickets-Thu-Dec-17-2026-Madison-Square-Garden | - |
| tm-andrea-bocelli-2026-hamilton-1a8zk8vgkel0c3m | Andrea Bocelli | none | - | - | no qualifying listing (complete catalog checked) |
| tm-andrea-bocelli-2026-pittsburgh-1apzk8vgkdk8zer | Andrea Bocelli | refresh (applied) | 7711525 | https://www.ticketliquidator.com/tickets/7711525/Andrea-Bocelli-tickets-Mon-Dec-21-2026-PPG-Paints-Arena | - |
| tm-andrea-bocelli-2026-philadelphia-1ayzk8ygkdwg9ej | Andrea Bocelli | refresh (applied) | 7711526 | https://www.ticketliquidator.com/tickets/7711526/Andrea-Bocelli-tickets-Tue-Dec-22-2026-Xfinity-Mobile-Arena | - |
| tm-andrea-bocelli-2027-cardiff-1agzkfkgkejnxkj | Andrea Bocelli | refresh (applied) | 8198913 | https://www.ticketliquidator.com/tickets/8198913/Andrea-Bocelli-tickets-Sat-May-8-2027-Principality-Stadium | - |
| tm-morat-2027-inglewood-vvg10z_1tsiuwe | Morat | refresh (applied) | 7977736 | https://www.ticketliquidator.com/tickets/7977736/Morat-tickets-Fri-Feb-26-2027-Intuit-Dome | - |
| tm-morat-2027-el-paso-vvg1yz_1xncffn | Morat | refresh (applied) | 7977738 | https://www.ticketliquidator.com/tickets/7977738/Morat-tickets-Sun-Feb-28-2027-Don-Haskins-Center | - |
| tm-morat-2027-rosemont-vvg18z_1rgckw0 | Morat | refresh (applied) | 7977739 | https://www.ticketliquidator.com/tickets/7977739/Morat-tickets-Fri-Mar-5-2027-Rosemont-Theatre | - |
| tm-morat-2027-boston-vvg17z_1b5nnhl | Morat | refresh (applied) | 7977740 | https://www.ticketliquidator.com/tickets/7977740/Morat-tickets-Sun-Mar-7-2027-Agganis-Arena | - |
| tm-morat-2027-grand-prairie-z7r9jz1a70iu_ | Morat | refresh (applied) | 7985682 | https://www.ticketliquidator.com/tickets/7985682/Morat-tickets-Fri-Mar-12-2027-Texas-Trust-CU-Theatre-at-Grand-Prairie | - |
| tm-morat-2027-sugar-land-z7r9jz1a70iu- | Morat | refresh (applied) | 7983752 | https://www.ticketliquidator.com/tickets/7983752/Morat-tickets-Sat-Mar-13-2027-Smart-Financial-Centre | - |
| tm-morat-2027-hidalgo-g5diz_1bprewh | Morat | refresh (applied) | 7977523 | https://www.ticketliquidator.com/tickets/7977523/Morat-tickets-Sun-Mar-14-2027-Payne-Arena | - |
| tm-morat-2027-orlando-17fov0g61xg_prh | Morat | refresh (applied) | 7977742 | https://www.ticketliquidator.com/tickets/7977742/Morat-tickets-Thu-Mar-18-2027-Kia-Center | - |
| tm-morat-2027-miami-vvg1vz_1toy-p6 | Morat | refresh (applied) | 7977745 | https://www.ticketliquidator.com/tickets/7977745/Morat-tickets-Sat-Mar-20-2027-Kaseya-Center | - |
| tm-morat-2027-toronto-177zv0g65ag8wpj | Morat | none | - | - | no qualifying listing (complete catalog checked) |
| tm-morat-2027-montreal-17g8v0g65cezfzf | Morat | refresh (applied) | 7985892 | https://www.ticketliquidator.com/tickets/7985892/Morat-tickets-Sat-Mar-27-2027-MTelus | - |
| tm-morat-2027-brooklyn-17gzv0g61xr7dfv | Morat | refresh (applied) | 7977746 | https://www.ticketliquidator.com/tickets/7977746/Morat-tickets-Thu-Apr-1-2027-Barclays-Center | - |
| tm-morat-2027-fairfax-17a8v0g61boau0r | Morat | refresh (applied) | 7977748 | https://www.ticketliquidator.com/tickets/7977748/Morat-tickets-Sat-Apr-3-2027-EagleBank-Arena | - |
| tm-missio-2026-portland-z7r9jz1aazivo | Missio | refresh (applied) | 8200534 | https://www.ticketliquidator.com/tickets/8200534/Missio-tickets-Thu-Dec-10-2026-Star-Theater-Portland | - |
| tm-missio-2026-seattle-z7r9jz1aaziv3 | Missio | refresh (applied) | 8200536 | https://www.ticketliquidator.com/tickets/8200536/Missio-tickets-Fri-Dec-11-2026-The-Funhouse-at-El-Corazon | - |
| tm-missio-2026-vancouver-z7r9jz1aaziv9 | Missio | refresh (applied) | 8200541 | https://www.ticketliquidator.com/tickets/8200541/Missio-tickets-Sat-Dec-12-2026-The-Pearl-BC | - |
| tm-missio-2026-spokane-z7r9jz1aazivk | Missio | refresh (applied) | 8200546 | https://www.ticketliquidator.com/tickets/8200546/Missio-tickets-Sun-Dec-13-2026-The-District-Bar-Spokane | - |
| tm-missio-2026-boise-z7r9jz1aazivf | Missio | refresh (applied) | 8200513 | https://www.ticketliquidator.com/tickets/8200513/Missio-tickets-Tue-Dec-15-2026-Knitting-Factory-Concert-House-Boise | - |
| tm-missio-2027-chicago-z7r9jz1aazivb | Missio | refresh (applied) | 8200547 | https://www.ticketliquidator.com/tickets/8200547/Missio-tickets-Wed-Jan-13-2027-Beat-Kitchen | - |
| tm-missio-2027-cudahy-z7r9jz1aaziv_ | Missio | refresh (applied) | 8200548 | https://www.ticketliquidator.com/tickets/8200548/Missio-tickets-Thu-Jan-14-2027-X-Ray-Arcade | - |
| tm-missio-2027-minneapolis-z7r9jz1aazivo | Missio | refresh (applied) | 8200549 | https://www.ticketliquidator.com/tickets/8200549/Missio-tickets-Fri-Jan-15-2027-Fine-Line-Music-Cafe | - |
| tm-missio-2027-cleveland-vv17fz_8gkl63cwa | Missio | refresh (applied) | 8200550 | https://www.ticketliquidator.com/tickets/8200550/Missio-tickets-Sun-Jan-17-2027-Cambridge-Room-At-The-House-Of-Blues-Cleveland | - |
| tm-missio-2027-washington-z7r9jz1aaziv- | Missio | refresh (applied) | 8200552 | https://www.ticketliquidator.com/tickets/8200552/Missio-tickets-Thu-Feb-11-2027-Union-Stage-DC | - |
| tm-missio-2027-brooklyn-z7r9jz1aazivx | Missio | refresh (applied) | 8200554 | https://www.ticketliquidator.com/tickets/8200554/Missio-tickets-Fri-Feb-12-2027-Market-Hotel-NY | - |
| tm-missio-2027-philadelphia-vv17fz_8gkn83pvw | Missio | refresh (applied) | 8200555 | https://www.ticketliquidator.com/tickets/8200555/Missio-tickets-Sat-Feb-13-2027-The-Foundry-Philadelphia | - |
| tm-missio-2027-carrboro-z7r9jz1aazivn | Missio | refresh (applied) | 8200515 | https://www.ticketliquidator.com/tickets/8200515/Missio-tickets-Wed-Mar-10-2027-Cats-Cradle | - |
| tm-missio-2027-atlanta-vvg1zz_8mbtifq | Missio | refresh (applied) | 8200559 | https://www.ticketliquidator.com/tickets/8200559/Missio-tickets-Thu-Mar-11-2027-The-Loft-Atlanta | - |
| tm-missio-2027-birmingham-z7r9jz1aazivp | Missio | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Missio; text: Missio Missio /tickets/8200561/Missio-tickets-Fri-Mar-12-2027-Workplay-Theatre Missio Missio Workplay Theatre 105498 CONCERTS 500 23rd Stree) |
| tm-missio-2027-nashville-z7r9jz1aazivj | Missio | refresh (applied) | 8200563 | https://www.ticketliquidator.com/tickets/8200563/Missio-tickets-Sun-Mar-14-2027-The-End-Nashville | - |
| tm-missio-2027-dallas-z7r9jz1aazive | Missio | refresh (applied) | 8200564 | https://www.ticketliquidator.com/tickets/8200564/Missio-tickets-Thu-Apr-8-2027-Puzzles-Deep-Ellum | - |
| tm-missio-2027-san-antonio-z7r9jz1aazivi | Missio | refresh (applied) | 8200566 | https://www.ticketliquidator.com/tickets/8200566/Missio-tickets-Fri-Apr-9-2027-The-Rock-Box-TX | - |
| tm-missio-2027-austin-z7r9jz1aazivt | Missio | refresh (applied) | 8200568 | https://www.ticketliquidator.com/tickets/8200568/Missio-tickets-Sat-Apr-10-2027-Come-and-Take-It-Live | - |
| tm-vnv-nation-2027-tampa-z7r9jz1a7jv8s | VNV Nation | refresh (applied) | 8095649 | https://www.ticketliquidator.com/tickets/8095649/VNV-Nation-tickets-Sat-Mar-13-2027-Orpheum-Tampa | - |
| tm-vnv-nation-2027-atlanta-z7r9jz1a7jvoo | VNV Nation | refresh (applied) | 8099561 | https://www.ticketliquidator.com/tickets/8099561/VNV-Nation-tickets-Sun-Mar-14-2027-Variety-Playhouse | - |
| tm-vnv-nation-2027-salt-lake-city-z7r9jz1a7pmzg | VNV Nation | refresh (applied) | 7529761 | https://www.ticketliquidator.com/tickets/7529761/VNV-Nation-tickets-Fri-Mar-26-2027-The-Grand-At-The-Complex | - |
| tm-vnv-nation-2027-st-paul-z7r9jz1a7jzvu | VNV Nation | refresh (applied) | 8129097 | https://www.ticketliquidator.com/tickets/8129097/VNV-Nation-tickets-Tue-Mar-30-2027-Amsterdam-Bar-and-Hall | - |
| tm-vnv-nation-2027-chicago-z7r9jz1a7pupm | VNV Nation | refresh (applied) | 7495772 | https://www.ticketliquidator.com/tickets/7495772/VNV-Nation-tickets-Thu-Apr-1-2027-Metro-Chicago | - |
| tm-michelle-branch-2027-charleston-g5evz_8w8tpxk | Michelle Branch | refresh (applied) | 8217759 | https://www.ticketliquidator.com/tickets/8217759/Michelle-Branch-tickets-Thu-Feb-25-2027-Charleston-Music-Hall | - |
| tm-michelle-branch-2027-atlanta-vvg1zz_8qvo7-q | Michelle Branch | refresh (applied) | 8217760 | https://www.ticketliquidator.com/tickets/8217760/Michelle-Branch-tickets-Fri-Feb-26-2027-The-Tabernacle-GA | - |
| tm-michelle-branch-2027-dallas-vvg1yz_8by9itm | Michelle Branch | refresh (applied) | 8217761 | https://www.ticketliquidator.com/tickets/8217761/Michelle-Branch-tickets-Sat-Mar-6-2027-House-Of-Blues-Dallas | - |
| tm-michelle-branch-2027-houston-g5diz_8jaig6j | Michelle Branch | refresh (applied) | 8217762 | https://www.ticketliquidator.com/tickets/8217762/Michelle-Branch-tickets-Sun-Mar-7-2027-House-Of-Blues-Houston | - |
| tm-michelle-branch-2027-tempe-1av0z_8gkntcuaa | Michelle Branch | refresh (applied) | 8217763 | https://www.ticketliquidator.com/tickets/8217763/Michelle-Branch-tickets-Thu-Mar-11-2027-Marquee-Theatre-AZ | - |
| tm-michelle-branch-2027-anaheim-vv1aazkf6gkdxx2ly | Michelle Branch | refresh (applied) | 8217764 | https://www.ticketliquidator.com/tickets/8217764/Michelle-Branch-tickets-Fri-Mar-12-2027-House-Of-Blues-Anaheim | - |
| tm-michelle-branch-2027-los-angeles-vv170z_8gksjroc_ | Michelle Branch | refresh (applied) | 8217765 | https://www.ticketliquidator.com/tickets/8217765/Michelle-Branch-tickets-Sat-Mar-13-2027-The-Wiltern | - |
| tm-michelle-branch-2027-denver-z7r9jz1aavkbw | Michelle Branch | refresh (applied) | 8222814 | https://www.ticketliquidator.com/tickets/8222814/Michelle-Branch-tickets-Wed-Mar-17-2027-The-Mission-Ballroom | - |
| tm-michelle-branch-2027-saint-louis-vv17bz_8gknw__z8 | Michelle Branch | refresh (applied) | 8217767 | https://www.ticketliquidator.com/tickets/8217767/Michelle-Branch-tickets-Fri-Mar-19-2027-The-Pageant | - |
| tm-michelle-branch-2027-columbus-z7r9jz1aazmzz | Michelle Branch | refresh (applied) | 8220390 | https://www.ticketliquidator.com/tickets/8220390/Michelle-Branch-tickets-Sat-Mar-20-2027-KEMBA-Live | - |
| tm-michelle-branch-2027-royal-oak-z7r9jz1aazmje | Michelle Branch | refresh (applied) | 8220389 | https://www.ticketliquidator.com/tickets/8220389/Michelle-Branch-tickets-Sun-Mar-21-2027-Royal-Oak-Music-Theatre | - |
| tm-michelle-branch-2027-portland-vv177z_8gkm-dic1 | Michelle Branch | refresh (applied) | 8217768 | https://www.ticketliquidator.com/tickets/8217768/Michelle-Branch-tickets-Tue-Mar-23-2027-State-Theatre-ME | - |
| tm-michelle-branch-2027-new-york-g5diz_8xxfdpf | Michelle Branch | refresh (applied) | 8217769 | https://www.ticketliquidator.com/tickets/8217769/Michelle-Branch-tickets-Thu-Mar-25-2027-Beacon-Theatre-NY | - |
| tm-michelle-branch-2027-silver-spring-16vfz_809g7nt6o | Michelle Branch | refresh (applied) | 8217770 | https://www.ticketliquidator.com/tickets/8217770/Michelle-Branch-tickets-Fri-Mar-26-2027-The-Fillmore-Silver-Spring | - |
| tm-michelle-branch-2027-philadelphia-z7r9jz1aazyqb | Michelle Branch | refresh (applied) | 8219779 | https://www.ticketliquidator.com/tickets/8219779/Michelle-Branch-tickets-Sat-Mar-27-2027-Franklin-Music-Hall | - |
| tm-fkj-2027-portland-z7r9jz1a7pdgd | FKJ | refresh (applied) | 8012914 | https://www.ticketliquidator.com/tickets/8012914/FKJ-tickets-Tue-Apr-20-2027-McMenamins-Crystal-Ballroom | - |
| tm-fkj-2027-seattle-z7r9jz1a7pduz | FKJ | refresh (applied) | 8012969 | https://www.ticketliquidator.com/tickets/8012969/FKJ-tickets-Fri-Apr-23-2027-Showbox-SoDo | - |
| tm-fkj-2027-vancouver-1778v0g65j57kh7 | FKJ | refresh (applied) | 8012944 | https://www.ticketliquidator.com/tickets/8012944/FKJ-tickets-Sun-Apr-25-2027-Commodore-Ballroom | - |
| tm-fkj-2027-vancouver-1778v0g6g4hh0bi | FKJ | refresh (applied) | 8045995 | https://www.ticketliquidator.com/tickets/8045995/FKJ-tickets-Mon-Apr-26-2027-Commodore-Ballroom | - |
| tm-fkj-2027-denver-z7r9jz1a7pk0s | FKJ | refresh (applied) | 8012973 | https://www.ticketliquidator.com/tickets/8012973/FKJ-tickets-Thu-Apr-29-2027-The-Mission-Ballroom | - |
| tm-fkj-2027-chicago-vvg18z_5uyql9j | FKJ | refresh (applied) | 8012957 | https://www.ticketliquidator.com/tickets/8012957/FKJ-tickets-Thu-May-27-2027-The-Salt-Shed-Outdoors-Chicago | - |
| tm-fkj-2027-toronto-177zv0g65u2nyx_ | FKJ | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fkj-2027-montreal-17g8v0g65rqmwty | FKJ | refresh (applied) | 8012965 | https://www.ticketliquidator.com/tickets/8012965/FKJ-tickets-Mon-May-31-2027-MTelus | - |
| tm-fkj-2027-boston-vvg17z_5ryet2j | FKJ | refresh (applied) | 8012958 | https://www.ticketliquidator.com/tickets/8012958/FKJ-tickets-Tue-Jun-1-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-fkj-2027-philadelphia-vvg1fz_5rrowhv | FKJ | refresh (applied) | 8012959 | https://www.ticketliquidator.com/tickets/8012959/FKJ-tickets-Thu-Jun-3-2027-The-Fillmore-Philadelphia | - |
| tm-fkj-2027-brooklyn-k7vgf_5rij1fj | FKJ | refresh (applied) | 8012960 | https://www.ticketliquidator.com/tickets/8012960/FKJ-tickets-Fri-Jun-4-2027-Brooklyn-Paramount | - |
| tm-fkj-2027-washington-17a8v0g65nnmzs3 | FKJ | refresh (applied) | 8012945 | https://www.ticketliquidator.com/tickets/8012945/FKJ-tickets-Mon-Jun-7-2027-The-Anthem-DC | - |
| tm-fkj-2027-atlanta-vvg1zz_59up5bx | FKJ | refresh (applied) | 8012962 | https://www.ticketliquidator.com/tickets/8012962/FKJ-tickets-Wed-Jun-9-2027-The-Tabernacle-GA | - |
| tm-fkj-2027-houston-g5diz_5msvufk | FKJ | refresh (applied) | 8012943 | https://www.ticketliquidator.com/tickets/8012943/FKJ-tickets-Fri-Jun-11-2027-Bayou-Music-Center | - |
| tm-fkj-2027-austin-z7r9jz1a7pdvn | FKJ | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: FKJ; text: FKJ FKJ /tickets/8012975/FKJ-tickets-Sat-Jun-12-2027-ACL-Live-At-The-Moody-Theater FKJ FKJ ACL Live At The Moody Theater 76796 CONCERTS 310 ) |
| tm-fkj-2027-dallas-vvg1yz_5ry7uyw | FKJ | refresh (applied) | 8012963 | https://www.ticketliquidator.com/tickets/8012963/FKJ-tickets-Mon-Jun-14-2027-South-Side-Ballroom-at-Gilleys | - |
| tm-sylvan-esso-2027-seattle-vvg1hz_g92don0 | Sylvan Esso | refresh (applied) | 8043891 | https://www.ticketliquidator.com/tickets/8043891/Sylvan-Esso-tickets-Fri-Feb-19-2027-Paramount-Theatre-Seattle | - |
| tm-sylvan-esso-2027-vancouver-z7r9jz1a7pffp | Sylvan Esso | refresh (applied) | 8043820 | https://www.ticketliquidator.com/tickets/8043820/Sylvan-Esso-tickets-Sat-Feb-20-2027-Vogue-Theatre-BC | - |
| tm-sylvan-esso-2027-portland-z7r9jz1a7pf-d | Sylvan Esso | refresh (applied) | 8043821 | https://www.ticketliquidator.com/tickets/8043821/Sylvan-Esso-tickets-Mon-Feb-22-2027-McMenamins-Crystal-Ballroom | - |
| tm-sylvan-esso-2027-portland-z7r9jz1a7pf-7 | Sylvan Esso | refresh (applied) | 8043822 | https://www.ticketliquidator.com/tickets/8043822/Sylvan-Esso-tickets-Tue-Feb-23-2027-McMenamins-Crystal-Ballroom | - |
| tm-sylvan-esso-2027-oakland-g5vyz_gf0ezov | Sylvan Esso | refresh (applied) | 8042272 | https://www.ticketliquidator.com/tickets/8042272/Sylvan-Esso-tickets-Thu-Feb-25-2027-Fox-Theater-Oakland | - |
| tm-sylvan-esso-2027-los-angeles-vvg10z_gjuyprv | Sylvan Esso | refresh (applied) | 8042270 | https://www.ticketliquidator.com/tickets/8042270/Sylvan-Esso-tickets-Fri-Feb-26-2027-The-Wiltern | - |
| tm-sylvan-esso-2027-santa-ana-vvg10z_26gjjny | Sylvan Esso | refresh (applied) | 8152338 | https://www.ticketliquidator.com/tickets/8152338/Sylvan-Esso-tickets-Sat-Feb-27-2027-The-Observatory-Santa-Ana | - |
| tm-sylvan-esso-2027-del-mar-vvg1iz_g9535-x | Sylvan Esso | refresh (applied) | 8042799 | https://www.ticketliquidator.com/tickets/8042799/Sylvan-Esso-tickets-Mon-Mar-1-2027-The-Sound-At-The-Del-Mar-Fairgrounds | - |
| tm-sylvan-esso-2027-phoenix-17k8v0g6g3yxemg | Sylvan Esso | refresh (applied) | 8042806 | https://www.ticketliquidator.com/tickets/8042806/Sylvan-Esso-tickets-Tue-Mar-2-2027-The-Van-Buren | - |
| tm-sylvan-esso-2027-denver-z7r9jz1a7pf46 | Sylvan Esso | refresh (applied) | 8043797 | https://www.ticketliquidator.com/tickets/8043797/Sylvan-Esso-tickets-Fri-Mar-5-2027-Ogden-Theatre | - |
| tm-sylvan-esso-2027-denver-z7r9jz1a7pj-s | Sylvan Esso | refresh (applied) | 8062806 | https://www.ticketliquidator.com/tickets/8062806/Sylvan-Esso-tickets-Sat-Mar-6-2027-Ogden-Theatre | - |
| tm-sylvan-esso-2027-austin-z7r9jz1a7pxj7 | Sylvan Esso | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Sylvan Esso; text: Sylvan Esso Sylvan Esso /tickets/8042836/Sylvan-Esso-tickets-Mon-Mar-8-2027-ACL-Live-At-The-Moody-Theater Sylvan Esso Sylvan Esso ACL Live A) |
| tm-sylvan-esso-2027-dallas-vvg1yz_g8bdfye | Sylvan Esso | refresh (applied) | 8042813 | https://www.ticketliquidator.com/tickets/8042813/Sylvan-Esso-tickets-Tue-Mar-9-2027-House-Of-Blues-Dallas | - |
| tm-sylvan-esso-2027-birmingham-17fzv0g6gpo7w2j | Sylvan Esso | refresh (applied) | 8042820 | https://www.ticketliquidator.com/tickets/8042820/Sylvan-Esso-tickets-Fri-Mar-12-2027-Iron-City-Birmingham | - |
| tm-sylvan-esso-2027-nashville-g5viz_g3v82ae | Sylvan Esso | refresh (applied) | 8042832 | https://www.ticketliquidator.com/tickets/8042832/Sylvan-Esso-tickets-Sat-Mar-13-2027-Brooklyn-Bowl-Nashville | - |
| tm-blondshell-2026-amsterdam-z698xzbpz16evuaf-z | Blondshell | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blondshell-2026-manchester-g5dzz_anefaed | Blondshell | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blondshell-2026-glasgow-17uov0g616cnj6j | Blondshell | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blondshell-2026-london-g5vhz_adn7kja | Blondshell | none | - | - | no qualifying listing (complete catalog checked) |
| tm-pink-martini-2026-reno-17ayv0g651b0bey | Pink Martini | refresh (applied) | 7997604 | https://www.ticketliquidator.com/tickets/7997604/Pink-Martini-tickets-Thu-Dec-3-2026-Grand-Sierra-Theatre | - |
| tm-pink-martini-2026-redding-z7r9jz1a7ps3o | Pink Martini | refresh (applied) | 8082379 | https://www.ticketliquidator.com/tickets/8082379/Pink-Martini-All-Stars-tickets-Fri-Dec-4-2026-Cascade-Theatre | - |
| tm-pink-martini-2026-fairfax-z7r9jz1aazojt | Pink Martini | refresh (applied) | 8166331 | https://www.ticketliquidator.com/tickets/8166331/Pink-Martini-All-Stars-tickets-Thu-Dec-10-2026-George-Mason-Center-For-The-Arts-Concert-Hall | - |
| tm-pink-martini-2026-lebanon-z7r9jz1a7pwba | Pink Martini | refresh (applied) | 8087921 | https://www.ticketliquidator.com/tickets/8087921/Pink-Martini-All-Stars-tickets-Sat-Dec-12-2026-Lebanon-Opera-House | - |
| tm-pink-martini-2026-brooklyn-k7vgf_u53h-yh | Pink Martini | refresh (applied) | 8072032 | https://www.ticketliquidator.com/tickets/8072032/Pink-Martini-All-Stars-tickets-Sun-Dec-13-2026-Brooklyn-Paramount | - |
| tm-pink-martini-2026-philadelphia-z7r9jz1a70ppv | Pink Martini | refresh (applied) | 8193302 | https://www.ticketliquidator.com/tickets/8193302/Pink-Martini-tickets-Mon-Dec-14-2026-Marian-Anderson-Hall-at-The-Kimmel-Center | - |
| tm-pink-martini-2026-red-bank-g5vvz_gnt3jau | Pink Martini | refresh (applied) | 8072011 | https://www.ticketliquidator.com/tickets/8072011/Pink-Martini-All-Stars-tickets-Wed-Dec-16-2026-Hackensack-Meridian-Health-Theatre-at-the-Count-Basie-Center-for-the-Arts | - |
| tm-pink-martini-2026-boston-z7r9jz1a7psqp | Pink Martini | refresh (applied) | 8110063 | https://www.ticketliquidator.com/tickets/8110063/Pink-Martini-All-Stars-tickets-Fri-Dec-18-2026-Berklee-Performance-Center-Boston | - |
| tm-pink-martini-2027-fort-worth-z7r9jz1a7p6-z | Pink Martini | refresh (applied) | 7950714 | https://www.ticketliquidator.com/tickets/7950714/Pink-Martini-tickets-Fri-Jan-8-2027-Bass-Performance-Hall | - |
| tm-pink-martini-2027-jacksonville-z7r9jz1aazepf | Pink Martini | refresh (applied) | 8372524 | https://www.ticketliquidator.com/tickets/8372524/Pink-Martini-tickets-Tue-Jan-12-2027-Florida-Theatre-Jacksonville | - |
| tm-pink-martini-2027-ft-lauderdale-vvg1vz_asbh4yx | Pink Martini | refresh (applied) | 7945144 | https://www.ticketliquidator.com/tickets/7945144/Pink-Martini-tickets-Sun-Jan-17-2027-Au-Rene-Theater-at-Broward-Ctr-For-The-Perf-Arts | - |
| tm-pink-martini-2027-athens-z7r9jz1a7pv8_ | Pink Martini | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Pink Martini; text: Pink Martini Pink Martini /tickets/8330029/Pink-Martini-tickets-Tue-Jan-19-2027-Hodgson-Concert-Hall Pink Martini Pink Martini Hodgson Conce) |
| tm-pink-martini-2027-bellingham-z7r9jz1aazp-s | Pink Martini | refresh (applied) | 8043631 | https://www.ticketliquidator.com/tickets/8043631/Pink-Martini-tickets-Sun-Jan-24-2027-Mount-Baker-Theatre | - |
| tm-pink-martini-2027-cleveland-vvg1fz_uzuo2ng | Pink Martini | refresh (applied) | 8121295 | https://www.ticketliquidator.com/tickets/8121295/Pink-Martini-tickets-Wed-Feb-10-2027-Cleveland-Museum-of-Art-Gartner-Auditorium | - |
| tm-pink-martini-2027-cincinnati-z7r9jz1a7pp4b | Pink Martini | refresh (applied) | 8043657 | https://www.ticketliquidator.com/tickets/8043657/Pink-Martini-tickets-Thu-Feb-11-2027-Anderson-Theater-At-Cincinnati-Memorial-Hall | - |
| tm-pink-martini-2027-chicago-z7r9jz1aaz6g7 | Pink Martini | refresh (applied) | 7847496 | https://www.ticketliquidator.com/tickets/7847496/Pink-Martini-tickets-Fri-Feb-12-2027-Orchestra-Hall-At-Chicago-Symphony-Center | - |
| tm-pink-martini-2027-minneapolis-vv1akzkfagkes0irs | Pink Martini | refresh (applied) | 8194294 | https://www.ticketliquidator.com/tickets/8194294/Pink-Martini-tickets-Sat-Feb-13-2027-Pantages-Theatre-MN | - |
| tm-pink-martini-2027-minneapolis-vv1akzkfagkesphrg | Pink Martini | refresh (applied) | 8194295 | https://www.ticketliquidator.com/tickets/8194295/Pink-Martini-tickets-Sun-Feb-14-2027-Pantages-Theatre-MN | - |
| tm-pink-martini-2027-madison-vv1a6zkfagkec5a4v | Pink Martini | refresh (applied) | 8194296 | https://www.ticketliquidator.com/tickets/8194296/Pink-Martini-tickets-Tue-Feb-16-2027-Orpheum-Theatre-Madison | - |
| tm-pink-martini-2027-colorado-springs-z7r9jz1aaztzk | Pink Martini | refresh (applied) | 8193669 | https://www.ticketliquidator.com/tickets/8193669/Pink-Martini-tickets-Fri-Mar-5-2027-Pikes-Peak-Center | - |
| tm-pink-martini-2027-colorado-springs-z7r9jz1a7joxz | Pink Martini | refresh (applied) | 8193668 | https://www.ticketliquidator.com/tickets/8193668/Pink-Martini-tickets-Sat-Mar-6-2027-Pikes-Peak-Center | - |
| tm-pink-martini-2027-toronto-177zv0g65s2z1n6 | Pink Martini | none | - | - | no qualifying listing (complete catalog checked) |
| tm-pink-martini-2027-quebec-17g8v0g61ihh8sg | Pink Martini | refresh (applied) | 8173902 | https://www.ticketliquidator.com/tickets/8173902/Pink-Martini-tickets-Thu-Mar-18-2027-Le-Theatre-Capitole | - |
| tm-pink-martini-2027-houston-g5diz_8uc2ajn | Pink Martini | refresh (applied) | 8223615 | https://www.ticketliquidator.com/tickets/8223615/Pink-Martini-All-Stars-tickets-Thu-Mar-25-2027-Sarofim-Hall-Hobby-Center | - |
| tm-harry-styles-2026-docklands-1apzk8ugkd2sm8u | Harry Styles | unverify (applied) | 7695896 | https://www.ticketliquidator.com/tickets/7695896/Harry-Styles-tickets-Fri-Nov-27-2026-Marvel-Stadium | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-harry-styles-2026-docklands-16efz_dckg7slsc | Harry Styles | refresh (applied) | 7695897 | https://www.ticketliquidator.com/tickets/7695897/Harry-Styles-tickets-Sat-Nov-28-2026-Marvel-Stadium | - |
| tm-harry-styles-2026-docklands-1apzk8ugkd2mxoc | Harry Styles | refresh (applied) | 8178121 | https://www.ticketliquidator.com/tickets/8178121/Harry-Styles-tickets-Wed-Dec-2-2026-Marvel-Stadium | - |
| tm-harry-styles-2026-docklands-1apzk8ugkd2broi | Harry Styles | refresh (applied) | 8178122 | https://www.ticketliquidator.com/tickets/8178122/Harry-Styles-tickets-Fri-Dec-4-2026-Marvel-Stadium | - |
| tm-harry-styles-2026-sydney-olympic-park-1ka8v0ukgagf72c | Harry Styles | refresh (applied) | 7695899 | https://www.ticketliquidator.com/tickets/7695899/Harry-Styles-tickets-Sat-Dec-12-2026-Accor-Stadium | - |
| tm-harry-styles-2026-sydney-olympic-park-1apzk8ugkdafgq9 | Harry Styles | refresh (applied) | 7695900 | https://www.ticketliquidator.com/tickets/7695900/Harry-Styles-tickets-Sun-Dec-13-2026-Accor-Stadium | - |
| tm-harry-styles-2027-pasadena-vvg1iz_3npi4df | Harry Styles | refresh (applied) | 8257680 | https://www.ticketliquidator.com/tickets/8257680/Harry-Styles-tickets-Fri-Apr-23-2027-Rose-Bowl-Stadium-Pasadena | - |
| tm-harry-styles-2027-pasadena-vvg1iz_3ntnu7b | Harry Styles | refresh (applied) | 8257681 | https://www.ticketliquidator.com/tickets/8257681/Harry-Styles-tickets-Sat-Apr-24-2027-Rose-Bowl-Stadium-Pasadena | - |
| tm-harry-styles-2027-toronto-1a8zkftgkdpce50 | Harry Styles | none | - | - | no qualifying listing (complete catalog checked) |
| tm-harry-styles-2027-toronto-1a8zkftanayze5g | Harry Styles | none | - | - | no qualifying listing (complete catalog checked) |
| tm-harry-styles-2027-atlanta-vvg1zz_3nnlppu | Harry Styles | refresh (applied) | 8257684 | https://www.ticketliquidator.com/tickets/8257684/Harry-Styles-tickets-Fri-May-21-2027-Mercedes-Benz-Stadium | - |
| tm-harry-styles-2027-atlanta-vvg1zz_3ef8eqn | Harry Styles | refresh (applied) | 8257685 | https://www.ticketliquidator.com/tickets/8257685/Harry-Styles-tickets-Sat-May-22-2027-Mercedes-Benz-Stadium | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdrmtch | Harry Styles | refresh (applied) | 8257686 | https://www.ticketliquidator.com/tickets/8257686/Harry-Styles-tickets-Fri-May-28-2027-Soldier-Field | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdgsgdj | Harry Styles | refresh (applied) | 8257687 | https://www.ticketliquidator.com/tickets/8257687/Harry-Styles-tickets-Sat-May-29-2027-Soldier-Field | - |
| tm-harry-styles-2027-madrid-z698xz2qz16v0sptae | Harry Styles | refresh (applied) | 8263968 | https://www.ticketliquidator.com/tickets/8263968/Harry-Styles-tickets-Fri-Jul-30-2027-Estadio-Metropolitano | - |
| tm-harry-styles-2027-madrid-z698xz2qz16v8zj448 | Harry Styles | refresh (applied) | 8263969 | https://www.ticketliquidator.com/tickets/8263969/Harry-Styles-tickets-Sat-Jul-31-2027-Estadio-Metropolitano | - |
| tm-harry-styles-2027-dublin-1abzkftgkexalp_ | Harry Styles | none | - | - | no qualifying listing (complete catalog checked) |
| tm-harry-styles-2027-dublin-1avoz_3gkn1nb3y | Harry Styles | none | - | - | no qualifying listing (complete catalog checked) |
| tm-harry-styles-2027-london-1aegz_8gkdalwdz | Harry Styles | refresh (applied) | 8257655 | https://www.ticketliquidator.com/tickets/8257655/Harry-Styles-tickets-Wed-Aug-25-2027-Wembley-Stadium | - |
| tm-harry-styles-2027-london-1anzkfigkew9djd | Harry Styles | refresh (applied) | 8257656 | https://www.ticketliquidator.com/tickets/8257656/Harry-Styles-tickets-Fri-Aug-27-2027-Wembley-Stadium | - |
| tm-harry-styles-2027-london-1anzkfigkeycdjb | Harry Styles | refresh (applied) | 8257657 | https://www.ticketliquidator.com/tickets/8257657/Harry-Styles-tickets-Sat-Aug-28-2027-Wembley-Stadium | - |
| tm-bts-2027-docklands-17a8v0g65r_eq8g | BTS | refresh (applied) | 8090608 | https://www.ticketliquidator.com/tickets/8090608/BTS-tickets-Wed-Feb-10-2027-Marvel-Stadium | - |
| tm-bts-2027-docklands-17a8v0g659_gumr | BTS | refresh (applied) | 8087588 | https://www.ticketliquidator.com/tickets/8087588/BTS-tickets-Fri-Feb-12-2027-Marvel-Stadium | - |
| tm-bts-2027-docklands-17a8v0g65r_ew8m | BTS | refresh (applied) | 8090609 | https://www.ticketliquidator.com/tickets/8090609/BTS-tickets-Sat-Feb-13-2027-Marvel-Stadium | - |
| tm-bts-2027-sydney-olympic-park-17a8v0g65qfkdo_ | BTS | refresh (applied) | 8090606 | https://www.ticketliquidator.com/tickets/8090606/BTS-tickets-Sat-Feb-20-2027-Accor-Stadium | - |
| tm-bts-2027-sydney-olympic-park-17a8v0g65qfik-s | BTS | refresh (applied) | 8090607 | https://www.ticketliquidator.com/tickets/8090607/BTS-tickets-Sun-Feb-21-2027-Accor-Stadium | - |
| tm-bruno-mars-2027-burswood-1apzkfbgkdn2ves | Bruno Mars | refresh (applied) | 8245500 | https://www.ticketliquidator.com/tickets/8245500/Bruno-Mars-tickets-Sat-Feb-13-2027-Optus-Stadium | - |
| tm-bruno-mars-2027-burswood-1aefz_ogklrp4vu | Bruno Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bruno-mars-2027-docklands-1aefz_o37vvzdckk | Bruno Mars | refresh (applied) | 8245501 | https://www.ticketliquidator.com/tickets/8245501/Bruno-Mars-tickets-Fri-Feb-19-2027-Marvel-Stadium | - |
| tm-bruno-mars-2027-docklands-1aefz_ogknww0xk | Bruno Mars | refresh (applied) | 8245502 | https://www.ticketliquidator.com/tickets/8245502/Bruno-Mars-tickets-Sat-Feb-20-2027-Marvel-Stadium | - |
| tm-bruno-mars-2027-docklands-1aefz_ogknwx7x5 | Bruno Mars | refresh (applied) | 8245503 | https://www.ticketliquidator.com/tickets/8245503/Bruno-Mars-tickets-Tue-Feb-23-2027-Marvel-Stadium | - |
| tm-bruno-mars-2027-docklands-1aefz_ogknwx0x2 | Bruno Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bruno-mars-2027-milton-1akzkf3gkdacg5v | Bruno Mars | refresh (applied) | 8245504 | https://www.ticketliquidator.com/tickets/8245504/Bruno-Mars-tickets-Sun-Feb-28-2027-Suncorp-Stadium | - |
| tm-bruno-mars-2027-milton-1avgz_ogklamkhm | Bruno Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bruno-mars-2027-sydney-olympic-park-1aefz_o3ezszduv6 | Bruno Mars | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: provider URL names a different date; listing: Bruno Mars; text: Bruno Mars Bruno Mars /tickets/8264032/Bruno-Mars-tickets-Fri-Mar-5-2027-Accor-Stadium Bruno Mars Bruno Mars Accor Stadium 41979 CONCERTS Ed) |
| tm-bruno-mars-2027-sydney-olympic-park-1aefz_ogknavvld | Bruno Mars | refresh (applied) | 8264032 | https://www.ticketliquidator.com/tickets/8264032/Bruno-Mars-tickets-Fri-Mar-5-2027-Accor-Stadium | - |
| tm-bruno-mars-2027-sydney-olympic-park-1aefz_ogknaxvi7 | Bruno Mars | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: provider URL names a different date; listing: Bruno Mars; text: Bruno Mars Bruno Mars /tickets/8264033/Bruno-Mars-tickets-Tue-Mar-9-2027-Accor-Stadium Bruno Mars Bruno Mars Accor Stadium 41979 CONCERTS Ed) |
| tm-bruno-mars-2027-sydney-olympic-park-1aefz_ogknaxoik | Bruno Mars | refresh (applied) | 8264033 | https://www.ticketliquidator.com/tickets/8264033/Bruno-Mars-tickets-Tue-Mar-9-2027-Accor-Stadium | - |
| tm-gracie-abrams-2027-dublin-17kzv0g65nd0zys | Gracie Abrams | refresh (applied) | 8018182 | https://www.ticketliquidator.com/tickets/8018182/Gracie-Abrams-tickets-Mon-Apr-19-2027-3Arena-Dublin | - |
| tm-gracie-abrams-2027-dublin-17kzv0g65ndpfyh | Gracie Abrams | refresh (applied) | 8018183 | https://www.ticketliquidator.com/tickets/8018183/Gracie-Abrams-tickets-Tue-Apr-20-2027-3Arena-Dublin | - |
| tm-sombr-2027-co-dublin-1abzkf4gkd83jcw | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sombr-2027-belfast-16doz_oxfg7tv55 | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-teddy-swims-2027-dublin-17kzv0g626ngihj | Teddy Swims | refresh (applied) | 8167532 | https://www.ticketliquidator.com/tickets/8167532/Teddy-Swims-tickets-Thu-Apr-8-2027-3Arena-Dublin | - |
| tm-five-finger-death-punch-2027-dublin-1avoz_fgkbmo2st | Five Finger Death Punch | refresh (applied) | 8353347 | https://www.ticketliquidator.com/tickets/8353347/Five-Finger-Death-Punch-tickets-Tue-Jan-19-2027-3Arena-Dublin | - |
| tm-nothing-but-thieves-2027-dublin-17kzv0g654xs6b3 | Nothing But Thieves | none | - | - | no qualifying listing (complete catalog checked) |
| tm-trivium-2027-dublin-1abzkffgkdvsqon | Trivium | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sabaton-2027-dublin-17kzv0g6g1kowuo | Sabaton | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beartooth-2027-torrensville-177yv0g61te6f3g | Beartooth | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beartooth-2027-west-melbourne-177yv0g61tqsnpg | Beartooth | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beartooth-2027-brisbane-177yv0g61drwqfa | Beartooth | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stella-lefty-2027-dublin-1avoz_8gkr5muwq | Stella Lefty | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stella-lefty-2027-dublin-1avoz_8gkr5mcw- | Stella Lefty | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tobymac-2027-fayetteville-g5evz_ojlfi-_ | TobyMac | refresh (applied) | 8239058 | https://www.ticketliquidator.com/tickets/8239058/TobyMac-tickets-Thu-Jan-28-2027-Crown-Coliseum-The-Crown-Center | - |
| tm-tobymac-2027-lexington-1apzkfbgker-a4j | TobyMac | refresh (applied) | 8239059 | https://www.ticketliquidator.com/tickets/8239059/TobyMac-tickets-Fri-Jan-29-2027-Rupp-Arena-At-Central-Bank-Center | - |
| tm-tobymac-2027-huntsville-1aozkfbgkdezfqd | TobyMac | refresh (applied) | 8239060 | https://www.ticketliquidator.com/tickets/8239060/TobyMac-tickets-Sat-Jan-30-2027-Propst-Arena-At-the-Von-Braun-Center | - |
| tm-tobymac-2027-lafayette-g5viz_2bfz904 | TobyMac | refresh (applied) | 8239061 | https://www.ticketliquidator.com/tickets/8239061/TobyMac-tickets-Sun-Jan-31-2027-Cajundome | - |
| tm-tobymac-2027-tampa-vvg1vz_oe_5n5h | TobyMac | refresh (applied) | 8239062 | https://www.ticketliquidator.com/tickets/8239062/TobyMac-tickets-Thu-Feb-4-2027-Benchmark-International-Arena | - |
| tm-tobymac-2027-sunrise-z7r9jz1aav8xe | TobyMac | refresh (applied) | 8239108 | https://www.ticketliquidator.com/tickets/8239108/TobyMac-tickets-Fri-Feb-5-2027-Amerant-Bank-Arena | - |
| tm-tobymac-2027-orlando-1axzkf_gkdtkgpv | TobyMac | refresh (applied) | 8239066 | https://www.ticketliquidator.com/tickets/8239066/TobyMac-tickets-Sat-Feb-6-2027-Kia-Center | - |
| tm-tobymac-2027-estero-vvg1vz_onusnh8 | TobyMac | refresh (applied) | 8239067 | https://www.ticketliquidator.com/tickets/8239067/TobyMac-tickets-Sun-Feb-7-2027-Hertz-Arena | - |
| tm-tobymac-2027-pensacola-g5viz_o9zokbz | TobyMac | refresh (applied) | 8239087 | https://www.ticketliquidator.com/tickets/8239087/TobyMac-tickets-Thu-Feb-11-2027-Pensacola-Bay-Center | - |
| tm-tobymac-2027-sugar-land-z7r9jz1aav8op | TobyMac | refresh (applied) | 8239109 | https://www.ticketliquidator.com/tickets/8239109/TobyMac-tickets-Fri-Feb-12-2027-Smart-Financial-Centre | - |
| tm-tobymac-2027-grand-prairie-z7r9jz1aav8of | TobyMac | refresh (applied) | 8239110 | https://www.ticketliquidator.com/tickets/8239110/TobyMac-tickets-Sat-Feb-13-2027-Texas-Trust-CU-Theatre-at-Grand-Prairie | - |
| tm-tobymac-2027-columbus-vv1aazkfbgkdjr-4o | TobyMac | refresh (applied) | 8239088 | https://www.ticketliquidator.com/tickets/8239088/TobyMac-tickets-Thu-Feb-18-2027-Nationwide-Arena | - |
| tm-tobymac-2027-norfolk-z7r9jz1aav8r3 | TobyMac | refresh (applied) | 8239111 | https://www.ticketliquidator.com/tickets/8239111/TobyMac-tickets-Sun-Feb-21-2027-Chartway-Arena-at-Ted-Constant-Convocation-Center | - |
| tm-tobymac-2027-jacksonville-1axzkf_gkdts4j7 | TobyMac | refresh (applied) | 8239091 | https://www.ticketliquidator.com/tickets/8239091/TobyMac-tickets-Thu-Feb-25-2027-VyStar-Veterans-Memorial-Arena | - |
| tm-tobymac-2027-nashville-g5viz_oeqedtw | TobyMac | refresh (applied) | 8239092 | https://www.ticketliquidator.com/tickets/8239092/TobyMac-tickets-Fri-Feb-26-2027-Bridgestone-Arena | - |
| tm-tobymac-2027-duluth-vvg1zz_oxyi5ps | TobyMac | refresh (applied) | 8239093 | https://www.ticketliquidator.com/tickets/8239093/TobyMac-tickets-Sat-Feb-27-2027-Gas-South-Arena | - |
| tm-tobymac-2027-knoxville-g5viz_oeoyvqw | TobyMac | refresh (applied) | 8239094 | https://www.ticketliquidator.com/tickets/8239094/TobyMac-tickets-Sun-Feb-28-2027-Thompson-Boling-Arena-at-Food-City-Center | - |
| tm-tobymac-2027-toledo-vv1afzkf_gkeg66aj | TobyMac | refresh (applied) | 8239097 | https://www.ticketliquidator.com/tickets/8239097/TobyMac-tickets-Thu-Mar-4-2027-Huntington-Center | - |
| tm-tobymac-2027-fishers-vv1aazkf4gkdkqmmm | TobyMac | refresh (applied) | 8239099 | https://www.ticketliquidator.com/tickets/8239099/TobyMac-tickets-Fri-Mar-5-2027-Fishers-Event-Center | - |
| tm-tobymac-2027-cape-girardeau-z7r9jz1aav8-f | TobyMac | refresh (applied) | 8239112 | https://www.ticketliquidator.com/tickets/8239112/TobyMac-tickets-Sat-Mar-6-2027-Show-Me-Center | - |
| tm-tobymac-2027-grand-rapids-vv1afzkfbgkdx_n_v | TobyMac | refresh (applied) | 8239100 | https://www.ticketliquidator.com/tickets/8239100/TobyMac-tickets-Sun-Mar-7-2027-Van-Andel-Arena | - |
| tm-tobymac-2027-austin-g5diz_oelxrxd | TobyMac | refresh (applied) | 8239102 | https://www.ticketliquidator.com/tickets/8239102/TobyMac-tickets-Thu-Mar-11-2027-Moody-Center-ATX | - |
| tm-tobymac-2027-lubbock-z7r9jz1aav8o_ | TobyMac | refresh (applied) | 8239113 | https://www.ticketliquidator.com/tickets/8239113/TobyMac-tickets-Sat-Mar-13-2027-United-Supermarkets-Arena | - |
| tm-tobymac-2027-rockford-vv1a7zkfpgkdtiktq | TobyMac | refresh (applied) | 8238872 | https://www.ticketliquidator.com/tickets/8238872/TobyMac-tickets-Fri-Mar-19-2027-BMO-Center-Rockford | - |
| tm-tobymac-2027-saint-louis-vv1akzkf_gkdu8agp | TobyMac | refresh (applied) | 8239105 | https://www.ticketliquidator.com/tickets/8239105/TobyMac-tickets-Sat-Mar-20-2027-Chaifetz-Arena | - |
| tm-fkj-2027-brisbane-177yv0g6ckieecd | FKJ | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blondshell-2026-dublin-1avoz_agkwt8mru | Blondshell | none | - | - | no qualifying listing (complete catalog checked) |
| tm-michelle-branch-2027-nashville-z7r9jz1aazma_ | Michelle Branch | refresh (applied) | 8220717 | https://www.ticketliquidator.com/tickets/8220717/Michelle-Branch-tickets-Sat-Feb-27-2027-Ryman-Auditorium | - |
| tm-michelle-branch-2027-nashville-z7r9jz1aazyfg | Michelle Branch | refresh (applied) | 8225387 | https://www.ticketliquidator.com/tickets/8225387/Michelle-Branch-tickets-Sun-Feb-28-2027-Ryman-Auditorium | - |
| tm-yuridia-2027-seattle-vvg1hz_36ea3aq | Yuridia | refresh (applied) | 8252886 | https://www.ticketliquidator.com/tickets/8252886/Yuridia-tickets-Thu-Feb-4-2027-Paramount-Theatre-Seattle | - |
| tm-yuridia-2027-reno-1a9zkf0gkdps324 | Yuridia | refresh (applied) | 8252888 | https://www.ticketliquidator.com/tickets/8252888/Yuridia-tickets-Sat-Feb-6-2027-Grand-Sierra-Theatre | - |
| tm-yuridia-2027-san-jose-g5vyz_oxvxyml | Yuridia | refresh (applied) | 8252890 | https://www.ticketliquidator.com/tickets/8252890/Yuridia-tickets-Sun-Feb-7-2027-SAP-Center | - |
| tm-yuridia-2027-palm-desert-vvg1iz_35qkx8b | Yuridia | refresh (applied) | 8252895 | https://www.ticketliquidator.com/tickets/8252895/Yuridia-tickets-Thu-Feb-11-2027-Acrisure-Arena | - |
| tm-yuridia-2027-phoenix-1a_zkfxgkecvpec | Yuridia | refresh (applied) | 8252897 | https://www.ticketliquidator.com/tickets/8252897/Yuridia-tickets-Sat-Feb-13-2027-Arizona-Financial-Theatre | - |
| tm-yuridia-2027-highland-z7r9jz1aav-j_ | Yuridia | refresh (applied) | 8255474 | https://www.ticketliquidator.com/tickets/8255474/Yuridia-tickets-Wed-Feb-17-2027-Yaamava-Theater-at-Yaamava-Resort-Casino | - |
| tm-yuridia-2027-las-vegas-1ayzkfngkdql5vb | Yuridia | refresh (applied) | 8252899 | https://www.ticketliquidator.com/tickets/8252899/Yuridia-tickets-Thu-Feb-18-2027-PH-Live-At-Planet-Hollywood | - |
| tm-yuridia-2027-inglewood-vvg1iz_3kmopkh | Yuridia | refresh (applied) | 8252903 | https://www.ticketliquidator.com/tickets/8252903/Yuridia-tickets-Sat-Feb-20-2027-YouTube-Theater-at-Hollywood-Park | - |
| tm-yuridia-2027-inglewood-vvg1iz_33c4njl | Yuridia | refresh (applied) | 8259518 | https://www.ticketliquidator.com/tickets/8259518/Yuridia-tickets-Sun-Feb-21-2027-YouTube-Theater-at-Hollywood-Park | - |
| tm-yuridia-2027-fresno-g5vyz_35vhmjx | Yuridia | refresh (applied) | 8252904 | https://www.ticketliquidator.com/tickets/8252904/Yuridia-tickets-Thu-Feb-25-2027-Save-Mart-Center | - |
| tm-yuridia-2027-wheatland-g5vyz_32kawxi | Yuridia | refresh (applied) | 8252906 | https://www.ticketliquidator.com/tickets/8252906/Yuridia-tickets-Sat-Feb-27-2027-Hard-Rock-Live-Sacramento | - |
| tm-yuridia-2027-san-diego-vvg1iz_3fqrwdv | Yuridia | refresh (applied) | 8252908 | https://www.ticketliquidator.com/tickets/8252908/Yuridia-tickets-Sun-Feb-28-2027-Viejas-Arena-At-Aztec-Bowl | - |
| tm-yuridia-2027-dallas-vvg1yz_32hm5d6 | Yuridia | refresh (applied) | 8252911 | https://www.ticketliquidator.com/tickets/8252911/Yuridia-tickets-Fri-Mar-12-2027-Dos-Equis-Pavilion | - |
| tm-yuridia-2027-el-paso-vvg1yz_3ggzxqt | Yuridia | refresh (applied) | 8252912 | https://www.ticketliquidator.com/tickets/8252912/Yuridia-tickets-Sun-Mar-14-2027-Don-Haskins-Center | - |
| tm-yuridia-2027-laredo-g5diz_3f66dhn | Yuridia | refresh (applied) | 8252914 | https://www.ticketliquidator.com/tickets/8252914/Yuridia-tickets-Thu-Mar-18-2027-Sames-Auto-Arena | - |
| tm-yuridia-2027-rosemont-vv1a7zkf0gkenyiy- | Yuridia | refresh (applied) | 8259597 | https://www.ticketliquidator.com/tickets/8259597/Yuridia-tickets-Thu-Mar-25-2027-Rosemont-Theatre | - |
| tm-yuridia-2027-national-harbor-1a4zkfxgkelii5v | Yuridia | refresh (applied) | 8252920 | https://www.ticketliquidator.com/tickets/8252920/Yuridia-tickets-Sun-Mar-28-2027-The-Theater-at-MGM-National-Harbor | - |
| tm-fkj-2027-salt-lake-city-z7r9jz1a7pk0m | FKJ | refresh (applied) | 8012971 | https://www.ticketliquidator.com/tickets/8012971/FKJ-tickets-Wed-Apr-28-2027-Rockwell-At-The-Complex | - |
| tm-sylvan-esso-2027-salt-lake-city-z7r9jz1a7pxjk | Sylvan Esso | refresh (applied) | 8043799 | https://www.ticketliquidator.com/tickets/8043799/Sylvan-Esso-tickets-Thu-Mar-4-2027-Rockwell-At-The-Complex | - |
| tm-harry-styles-2027-dublin-1avoz_3gklibgmq | Harry Styles | none | - | - | no qualifying listing (complete catalog checked) |
| tm-harry-styles-2027-arlington-z7r9jz1aavp49 | Harry Styles | refresh (applied) | 8257671 | https://www.ticketliquidator.com/tickets/8257671/Harry-Styles-tickets-Fri-Apr-9-2027-ATT-Stadium | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavp4p | Harry Styles | refresh (applied) | 8257672 | https://www.ticketliquidator.com/tickets/8257672/Harry-Styles-tickets-Sat-Apr-10-2027-ATT-Stadium | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavsoa | Harry Styles | refresh (applied) | 8266038 | https://www.ticketliquidator.com/tickets/8266038/Harry-Styles-tickets-Fri-Apr-16-2027-ATT-Stadium | - |
| tm-harry-styles-2027-pasadena-vvg1iz_3bgqfli | Harry Styles | refresh (applied) | 8266437 | https://www.ticketliquidator.com/tickets/8266437/Harry-Styles-tickets-Fri-Apr-30-2027-Rose-Bowl-Stadium-Pasadena | - |
| tm-harry-styles-2027-pasadena-vvg1iz_3bg-0lz | Harry Styles | refresh (applied) | 8266438 | https://www.ticketliquidator.com/tickets/8266438/Harry-Styles-tickets-Sat-May-1-2027-Rose-Bowl-Stadium-Pasadena | - |
| tm-harry-styles-2027-toronto-1avzz_3gkzqzh13 | Harry Styles | none | - | - | no qualifying listing (complete catalog checked) |
| tm-harry-styles-2027-toronto-1avzz_3gkzqbl5d | Harry Styles | none | - | - | no qualifying listing (complete catalog checked) |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdbxpoy | Harry Styles | refresh (applied) | 8265970 | https://www.ticketliquidator.com/tickets/8265970/Harry-Styles-tickets-Fri-Jun-4-2027-Soldier-Field | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdwejgw | Harry Styles | refresh (applied) | 8265969 | https://www.ticketliquidator.com/tickets/8265969/Harry-Styles-tickets-Sat-Jun-5-2027-Soldier-Field | - |
| tm-harry-styles-2027-madrid-z698xz2qz1ko4op48 | Harry Styles | refresh (applied) | 8266323 | https://www.ticketliquidator.com/tickets/8266323/Harry-Styles-tickets-Mon-Aug-2-2027-Estadio-Metropolitano | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavszi | Harry Styles | refresh (applied) | 8268342 | https://www.ticketliquidator.com/tickets/8268342/Harry-Styles-tickets-Wed-Apr-14-2027-ATT-Stadium | - |
| tm-harry-styles-2027-arlington-z7r9jz1aavw00 | Harry Styles | refresh (applied) | 8267109 | https://www.ticketliquidator.com/tickets/8267109/Harry-Styles-tickets-Sat-Apr-17-2027-ATT-Stadium | - |
| tm-harry-styles-2027-chicago-vv1a7zkftgkdxye23 | Harry Styles | refresh (applied) | 8267110 | https://www.ticketliquidator.com/tickets/8267110/Harry-Styles-tickets-Mon-May-31-2027-Soldier-Field | - |
| tm-charli-xcx-2027-dublin-16voz_3jvg7sk3f | Charli xcx | none | - | - | no qualifying listing (complete catalog checked) |
| tm-charli-xcx-2027-glasgow-1auzkftgkez7jxt | Charli xcx | refresh (applied) | 8267812 | https://www.ticketliquidator.com/tickets/8267812/Brandi-Carlile-tickets-Mon-Feb-15-2027-OVO-Hydro | - |
| tm-charli-xcx-2027-manchester-1amzkfegkdf5asp | Charli xcx | refresh (applied) | 8259353 | https://www.ticketliquidator.com/tickets/8259353/Brandi-Carlile-tickets-Wed-Feb-17-2027-Co-Op-Live | - |
| tm-charli-xcx-2027-london-1agzkfigkenre1t | Charli xcx | refresh (applied) | 8267813 | https://www.ticketliquidator.com/tickets/8267813/Brandi-Carlile-tickets-Fri-Feb-19-2027-O2-Arena-London | - |
| tm-charli-xcx-2027-london-1adfz_3gknni7-u | Charli xcx | refresh (applied) | 8272391 | https://www.ticketliquidator.com/tickets/8272391/Brandi-Carlile-tickets-Sat-Feb-20-2027-O2-Arena-London | - |
| tm-charli-xcx-2027-amsterdam-z698xzbpz1kqn76of | Charli xcx | refresh (applied) | 8267859 | https://www.ticketliquidator.com/tickets/8267859/Brandi-Carlile-tickets-Mon-Feb-22-2027-Ziggo-Dome | - |
| tm-blue-october-2027-saint-louis-1ae7z_3gkiei5ox | Blue October | refresh (applied) | 8271659 | https://www.ticketliquidator.com/tickets/8271659/Blue-October-tickets-Sat-Mar-13-2027-The-Factory-Chesterfield | - |
| tm-stella-lefty-2026-saint-louis-1a-zkfxgkegfvfo | Stella Lefty | refresh (applied) | 8264079 | https://www.ticketliquidator.com/tickets/8264079/Stella-Lefty-tickets-Fri-Dec-18-2026-The-Factory-Chesterfield | - |
| tm-andrea-bocelli-2027-charlotte-g5evz_8mutuyo | Andrea Bocelli | refresh (applied) | 8258124 | https://www.ticketliquidator.com/tickets/8258124/Andrea-Bocelli-tickets-Fri-Jan-29-2027-Spectrum-Center | - |
| tm-andrea-bocelli-2027-baltimore-1a4zkffgkepsf12 | Andrea Bocelli | refresh (applied) | 8258125 | https://www.ticketliquidator.com/tickets/8258125/Andrea-Bocelli-tickets-Sun-Jan-31-2027-CFG-Bank-Arena | - |
| tm-andrea-bocelli-2027-atlanta-vvg1zz_36bbobm | Andrea Bocelli | refresh (applied) | 8258126 | https://www.ticketliquidator.com/tickets/8258126/Andrea-Bocelli-tickets-Tue-Feb-2-2027-State-Farm-Arena-GA | - |
| tm-andrea-bocelli-2027-austin-g5diz_3kpl_-e | Andrea Bocelli | refresh (applied) | 8258127 | https://www.ticketliquidator.com/tickets/8258127/Andrea-Bocelli-tickets-Thu-Feb-4-2027-Moody-Center-ATX | - |
| tm-andrea-bocelli-2027-dallas-vvg1yz_33_tj3c | Andrea Bocelli | refresh (applied) | 8258128 | https://www.ticketliquidator.com/tickets/8258128/Andrea-Bocelli-tickets-Fri-Feb-5-2027-American-Airlines-Center | - |
| tm-andrea-bocelli-2027-houston-z7r9jz1aavs_v | Andrea Bocelli | refresh (applied) | 8265103 | https://www.ticketliquidator.com/tickets/8265103/Andrea-Bocelli-tickets-Sun-Feb-7-2027-Toyota-Center-TX | - |
| tm-andrea-bocelli-2027-orlando-1axzkfigkdrsgpw | Andrea Bocelli | refresh (applied) | 8258129 | https://www.ticketliquidator.com/tickets/8258129/Andrea-Bocelli-tickets-Wed-Feb-10-2027-Kia-Center | - |
| tm-andrea-bocelli-2027-hollywood-vvg1vz_3nv0vjm | Andrea Bocelli | refresh (applied) | 8258130 | https://www.ticketliquidator.com/tickets/8258130/Andrea-Bocelli-tickets-Fri-Feb-12-2027-Hard-Rock-Live-At-The-Seminole-Hard-Rock-Hotel-Casino-Hollywood | - |
| tm-andrea-bocelli-2027-hollywood-vvg1vz_3ervkx7 | Andrea Bocelli | refresh (applied) | 8258131 | https://www.ticketliquidator.com/tickets/8258131/Andrea-Bocelli-tickets-Sat-Feb-13-2027-Hard-Rock-Live-At-The-Seminole-Hard-Rock-Hotel-Casino-Hollywood | - |
| tm-tobymac-2027-fairfax-1a4zkf_gkd7dmjf | TobyMac | refresh (applied) | 8239089 | https://www.ticketliquidator.com/tickets/8239089/TobyMac-tickets-Fri-Feb-19-2027-EagleBank-Arena | - |
| tm-tobymac-2027-fairfax-1a4zkf_gkdgvwvn | TobyMac | refresh (applied) | 8239090 | https://www.ticketliquidator.com/tickets/8239090/TobyMac-tickets-Sat-Feb-20-2027-EagleBank-Arena | - |
| tm-tobymac-2027-san-antonio-g5diz_olf8jri | TobyMac | refresh (applied) | 8239103 | https://www.ticketliquidator.com/tickets/8239103/TobyMac-tickets-Fri-Mar-12-2027-Freeman-Coliseum | - |
| tm-tobymac-2027-fargo-vv1akzkf_gkd8vyo- | TobyMac | refresh (applied) | 8239104 | https://www.ticketliquidator.com/tickets/8239104/TobyMac-tickets-Wed-Mar-17-2027-Fargodome | - |
| tm-tobymac-2027-tulsa-1aozkf_gkdn-dht | TobyMac | refresh (applied) | 8239106 | https://www.ticketliquidator.com/tickets/8239106/TobyMac-tickets-Sun-Mar-21-2027-BOK-Center | - |
| tm-fkj-2027-new-orleans-z7r9jz1a7pd1a | FKJ | refresh (applied) | 8012974 | https://www.ticketliquidator.com/tickets/8012974/FKJ-tickets-Thu-Jun-10-2027-Saenger-Theatre-New-Orleans | - |
| tm-trans-siberian-orchestra-2026-manchester-vv1avzkffgkecconl | Trans-Siberian Orchestra | correct (applied) | 8255048 | https://www.ticketliquidator.com/tickets/8255048/Trans-Siberian-Orchestra-tickets-Fri-Nov-27-2026-SNHU-Arena | - |
| tm-trans-siberian-orchestra-2026-boise-g5vzz_8l3-m4c | Trans-Siberian Orchestra | conflict | - | - | ambiguous: missing or conflicting performance start evidence; candidates: 8255049 @ no start time ("Trans-Siberian Orchestra"), 8255050 @ no start time ("Trans-Siberian Orchestra") |
| tm-trans-siberian-orchestra-2026-worcester-vv1avzkf7gkd6__c- | Trans-Siberian Orchestra | correct (applied) | 8255052 | https://www.ticketliquidator.com/tickets/8255052/Trans-Siberian-Orchestra-tickets-Sat-Nov-28-2026-DCU-Center | - |
| tm-trans-siberian-orchestra-2026-portland-vvg1hz_8rkn5r8 | Trans-Siberian Orchestra | correct (applied) | 8255054 | https://www.ticketliquidator.com/tickets/8255054/Trans-Siberian-Orchestra-tickets-Sat-Nov-28-2026-Moda-Center-at-the-Rose-Quarter | - |
| tm-trans-siberian-orchestra-2026-uncasville-g5vvz_8ebyjdo | Trans-Siberian Orchestra | correct (applied) | 8255056 | https://www.ticketliquidator.com/tickets/8255056/Trans-Siberian-Orchestra-tickets-Sun-Nov-29-2026-Mohegan-Sun-Arena-CT | - |
| tm-trans-siberian-orchestra-2026-seattle-vvg1hz_8bxdfpp | Trans-Siberian Orchestra | correct (applied) | 8255058 | https://www.ticketliquidator.com/tickets/8255058/Trans-Siberian-Orchestra-tickets-Sun-Nov-29-2026-Climate-Pledge-Arena | - |
| tm-trans-siberian-orchestra-2026-sacramento-g5vyz_8hivhsq | Trans-Siberian Orchestra | correct (applied) | 8255061 | https://www.ticketliquidator.com/tickets/8255061/Trans-Siberian-Orchestra-tickets-Wed-Dec-2-2026-Golden-1-Center | - |
| tm-trans-siberian-orchestra-2026-nashville-g5viz_oinlsr4 | Trans-Siberian Orchestra | refresh (applied) | 8255062 | https://www.ticketliquidator.com/tickets/8255062/Trans-Siberian-Orchestra-tickets-Wed-Dec-2-2026-Bridgestone-Arena | - |
| tm-trans-siberian-orchestra-2026-charleston-1avbz_8gkwouueg | Trans-Siberian Orchestra | refresh (applied) | 8255063 | https://www.ticketliquidator.com/tickets/8255063/Trans-Siberian-Orchestra-tickets-Thu-Dec-3-2026-Charleston-Coliseum-Convention-Center-Charleston | - |
| tm-trans-siberian-orchestra-2026-fresno-g5vyz_o5rjusr | Trans-Siberian Orchestra | refresh (applied) | 8255064 | https://www.ticketliquidator.com/tickets/8255064/Trans-Siberian-Orchestra-tickets-Thu-Dec-3-2026-Save-Mart-Center | - |
| tm-trans-siberian-orchestra-2026-toledo-vv1kezvpv_gacwg13 | Trans-Siberian Orchestra | correct (applied) | 8255065 | https://www.ticketliquidator.com/tickets/8255065/Trans-Siberian-Orchestra-tickets-Fri-Dec-4-2026-Huntington-Center | - |
| tm-trans-siberian-orchestra-2026-columbus-vv17fz_8gkuihkxu | Trans-Siberian Orchestra | correct (applied) | 8255068 | https://www.ticketliquidator.com/tickets/8255068/Trans-Siberian-Orchestra-tickets-Sat-Dec-5-2026-Nationwide-Arena | - |
| tm-trans-siberian-orchestra-2026-ontario-z7r9jz1aav08p | Trans-Siberian Orchestra | correct (applied) | 8255071 | https://www.ticketliquidator.com/tickets/8255071/Trans-Siberian-Orchestra-tickets-Sat-Dec-5-2026-Toyota-Arena-Ontario | - |
| tm-trans-siberian-orchestra-2026-grand-rapids-vv17oz_8gksfqipn | Trans-Siberian Orchestra | correct (applied) | 8255072 | https://www.ticketliquidator.com/tickets/8255072/Trans-Siberian-Orchestra-tickets-Sun-Dec-6-2026-Van-Andel-Arena | - |
| tm-trans-siberian-orchestra-2026-phoenix-1av0z_8gks2uk5t | Trans-Siberian Orchestra | correct (applied) | 8255079 | https://www.ticketliquidator.com/tickets/8255079/Trans-Siberian-Orchestra-tickets-Sun-Dec-6-2026-Mortgage-Matchup-Center | - |
| tm-trans-siberian-orchestra-2026-allentown-17gzv0g62dv8e6s | Trans-Siberian Orchestra | refresh (applied) | 8255080 | https://www.ticketliquidator.com/tickets/8255080/Trans-Siberian-Orchestra-tickets-Wed-Dec-9-2026-PPL-Center | - |
| tm-trans-siberian-orchestra-2026-austin-g5diz_od7g9c0 | Trans-Siberian Orchestra | refresh (applied) | 8255081 | https://www.ticketliquidator.com/tickets/8255081/Trans-Siberian-Orchestra-tickets-Wed-Dec-9-2026-Moody-Center-ATX | - |
| tm-trans-siberian-orchestra-2026-raleigh-g5evz_2wee5m0 | Trans-Siberian Orchestra | refresh (applied) | 8255082 | https://www.ticketliquidator.com/tickets/8255082/Trans-Siberian-Orchestra-tickets-Thu-Dec-10-2026-Lenovo-Center | - |
| tm-trans-siberian-orchestra-2026-bossier-city-g5viz_8b0hcmp | Trans-Siberian Orchestra | refresh (applied) | 8255084 | https://www.ticketliquidator.com/tickets/8255084/Trans-Siberian-Orchestra-tickets-Thu-Dec-10-2026-Brookshire-Grocery-Arena | - |
| tm-trans-siberian-orchestra-2026-greenville-g5evz_o2s2bkg | Trans-Siberian Orchestra | correct (applied) | 8256376 | https://www.ticketliquidator.com/tickets/8256376/Trans-Siberian-Orchestra-tickets-Fri-Dec-11-2026-Bon-Secours-Wellness-Arena | - |
| tm-trans-siberian-orchestra-2026-houston-z7r9jz1aavnas | Trans-Siberian Orchestra | correct (applied) | 8255087 | https://www.ticketliquidator.com/tickets/8255087/Trans-Siberian-Orchestra-tickets-Fri-Dec-11-2026-Toyota-Center-TX | - |
| tm-trans-siberian-orchestra-2026-charlotte-g5evz_o6l3kkc | Trans-Siberian Orchestra | correct (applied) | 8255089 | https://www.ticketliquidator.com/tickets/8255089/Trans-Siberian-Orchestra-tickets-Sat-Dec-12-2026-Spectrum-Center | - |
| tm-trans-siberian-orchestra-2026-san-antonio-g5diz_8q4vky5 | Trans-Siberian Orchestra | correct (applied) | 8255092 | https://www.ticketliquidator.com/tickets/8255092/Trans-Siberian-Orchestra-tickets-Sat-Dec-12-2026-Frost-Bank-Center | - |
| tm-trans-siberian-orchestra-2026-duluth-vvg1zz_8rk7fyq | Trans-Siberian Orchestra | correct (applied) | 8255093 | https://www.ticketliquidator.com/tickets/8255093/Trans-Siberian-Orchestra-tickets-Sun-Dec-13-2026-Gas-South-Arena | - |
| tm-trans-siberian-orchestra-2026-dallas-vvg1yz_8bgba0q | Trans-Siberian Orchestra | correct (applied) | 8255097 | https://www.ticketliquidator.com/tickets/8255097/Trans-Siberian-Orchestra-tickets-Sun-Dec-13-2026-American-Airlines-Center | - |
| tm-trans-siberian-orchestra-2026-charlottesville-vv177z_ogksqlpte | Trans-Siberian Orchestra | refresh (applied) | 8255100 | https://www.ticketliquidator.com/tickets/8255100/Trans-Siberian-Orchestra-tickets-Wed-Dec-16-2026-John-Paul-Jones-Arena | - |
| tm-trans-siberian-orchestra-2026-birmingham-1aezz_ockcvzdcau | Trans-Siberian Orchestra | refresh (applied) | 8255101 | https://www.ticketliquidator.com/tickets/8255101/Trans-Siberian-Orchestra-tickets-Wed-Dec-16-2026-Legacy-Arena-at-The-BJCC | - |
| tm-trans-siberian-orchestra-2026-jacksonville-1aefz_ogkwzigon | Trans-Siberian Orchestra | refresh (applied) | 8255102 | https://www.ticketliquidator.com/tickets/8255102/Trans-Siberian-Orchestra-tickets-Thu-Dec-17-2026-VyStar-Veterans-Memorial-Arena | - |
| tm-trans-siberian-orchestra-2026-albany-k7vgf_8uqsipg | Trans-Siberian Orchestra | refresh (applied) | 8255103 | https://www.ticketliquidator.com/tickets/8255103/Trans-Siberian-Orchestra-tickets-Thu-Dec-17-2026-MVP-Arena | - |
| tm-trans-siberian-orchestra-2026-hershey-vv1aovpkfgau5bfb | Trans-Siberian Orchestra | correct (applied) | 8255105 | https://www.ticketliquidator.com/tickets/8255105/Trans-Siberian-Orchestra-tickets-Fri-Dec-18-2026-Giant-Center | - |
| tm-trans-siberian-orchestra-2026-sunrise-z7r9jz1aavnag | Trans-Siberian Orchestra | refresh (applied) | 8255106 | https://www.ticketliquidator.com/tickets/8255106/Trans-Siberian-Orchestra-tickets-Fri-Dec-18-2026-Amerant-Bank-Arena | - |
| tm-trans-siberian-orchestra-2026-orlando-1aefz_8gkmasnhq | Trans-Siberian Orchestra | correct (applied) | 8255108 | https://www.ticketliquidator.com/tickets/8255108/Trans-Siberian-Orchestra-tickets-Sat-Dec-19-2026-Kia-Center | - |
| tm-trans-siberian-orchestra-2026-pittsburgh-1apzkfdgkej_ji6 | Trans-Siberian Orchestra | correct (applied) | 8255109 | https://www.ticketliquidator.com/tickets/8255109/Trans-Siberian-Orchestra-tickets-Sat-Dec-19-2026-PPG-Paints-Arena | - |
| tm-trans-siberian-orchestra-2026-philadelphia-1adzz_8gkbpbarl | Trans-Siberian Orchestra | correct (applied) | 8255113 | https://www.ticketliquidator.com/tickets/8255113/Trans-Siberian-Orchestra-tickets-Sun-Dec-20-2026-Xfinity-Mobile-Arena | - |
| tm-trans-siberian-orchestra-2026-tampa-vvg1vz_oku2sug | Trans-Siberian Orchestra | correct (applied) | 8255112 | https://www.ticketliquidator.com/tickets/8255112/Trans-Siberian-Orchestra-tickets-Sun-Dec-20-2026-Benchmark-International-Arena | - |
| tm-trans-siberian-orchestra-2026-cleveland-z7r9jz1aavx-d | Trans-Siberian Orchestra | correct (applied) | 8255116 | https://www.ticketliquidator.com/tickets/8255116/Trans-Siberian-Orchestra-tickets-Tue-Dec-22-2026-Rocket-Arena | - |
| tm-trans-siberian-orchestra-2026-indianapolis-vv17fz_8gkiwqjq1 | Trans-Siberian Orchestra | correct (applied) | 8255117 | https://www.ticketliquidator.com/tickets/8255117/Trans-Siberian-Orchestra-tickets-Tue-Dec-22-2026-Gainbridge-Fieldhouse | - |
| tm-trans-siberian-orchestra-2026-detroit-vv17oz_8gkyvghou | Trans-Siberian Orchestra | correct (applied) | 8255120 | https://www.ticketliquidator.com/tickets/8255120/Trans-Siberian-Orchestra-tickets-Wed-Dec-23-2026-Little-Caesars-Arena | - |
| tm-trans-siberian-orchestra-2026-rosemont-vv1a7zkffgkdsxaxx | Trans-Siberian Orchestra | correct (applied) | 8255121 | https://www.ticketliquidator.com/tickets/8255121/Trans-Siberian-Orchestra-tickets-Wed-Dec-23-2026-Allstate-Arena | - |
| tm-trans-siberian-orchestra-2026-newark-vv1aezkf_gkdmwuvf | Trans-Siberian Orchestra | correct (applied) | 8255124 | https://www.ticketliquidator.com/tickets/8255124/Trans-Siberian-Orchestra-tickets-Sat-Dec-26-2026-Prudential-Center | - |
| tm-trans-siberian-orchestra-2026-milwaukee-vv1a6zkfogkdqpudv | Trans-Siberian Orchestra | correct (applied) | 8255125 | https://www.ticketliquidator.com/tickets/8255125/Trans-Siberian-Orchestra-tickets-Sat-Dec-26-2026-Fiserv-Forum | - |
| tm-trans-siberian-orchestra-2026-washington-17a8v0g62bwqi08 | Trans-Siberian Orchestra | correct (applied) | 8255128 | https://www.ticketliquidator.com/tickets/8255128/Trans-Siberian-Orchestra-tickets-Sun-Dec-27-2026-Capital-One-Arena | - |
| tm-trans-siberian-orchestra-2026-minneapolis-vv1akzkfbgkelyd6x | Trans-Siberian Orchestra | correct (applied) | 8255130 | https://www.ticketliquidator.com/tickets/8255130/Trans-Siberian-Orchestra-tickets-Sun-Dec-27-2026-Target-Center | - |
| tm-alan-walker-2027-austin-z7r9jz1aavtfx | Alan Walker | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Alan Walker; text: Alan Walker Alan Walker /tickets/8265244/Alan-Walker-tickets-Thu-Jan-21-2027-ACL-Live-At-The-Moody-Theater Alan Walker Alan Walker ACL Live ) |
| tm-alan-walker-2027-irving-vvg1yz_3nb2d-j | Alan Walker | refresh (applied) | 8265222 | https://www.ticketliquidator.com/tickets/8265222/Alan-Walker-tickets-Fri-Jan-22-2027-The-Pavilion-at-Toyota-Music-Factory | - |
| tm-alan-walker-2027-houston-g5diz_3no4w3_ | Alan Walker | refresh (applied) | 8265214 | https://www.ticketliquidator.com/tickets/8265214/Alan-Walker-tickets-Sat-Jan-23-2027-713-Music-Hall | - |
| tm-alan-walker-2027-saint-louis-1a-zkf0gkdapg7j | Alan Walker | none | - | - | no qualifying listing (complete catalog checked) |
| tm-alan-walker-2027-nashville-z7r9jz1aavt47 | Alan Walker | refresh (applied) | 8265285 | https://www.ticketliquidator.com/tickets/8265285/Alan-Walker-tickets-Thu-Jan-28-2027-The-Pinnacle-At-Nashville-Yards | - |
| tm-alan-walker-2027-raleigh-g5evz_31nnqnu | Alan Walker | refresh (applied) | 8265275 | https://www.ticketliquidator.com/tickets/8265275/Alan-Walker-tickets-Sat-Jan-30-2027-The-Ritz-Raleigh | - |
| tm-alan-walker-2027-charleston-g5evz_3nuc_ky | Alan Walker | refresh (applied) | 8265282 | https://www.ticketliquidator.com/tickets/8265282/Alan-Walker-tickets-Sun-Jan-31-2027-Charleston-Music-Hall | - |
| tm-alan-walker-2027-washington-1a4zkftgkdat1lk | Alan Walker | refresh (applied) | 8265284 | https://www.ticketliquidator.com/tickets/8265284/Alan-Walker-tickets-Sat-Feb-6-2027-The-Anthem-DC | - |
| tm-alan-walker-2027-philadelphia-vv1aezkfxgkdmhfsx | Alan Walker | refresh (applied) | 8265283 | https://www.ticketliquidator.com/tickets/8265283/Alan-Walker-tickets-Tue-Feb-9-2027-The-Fillmore-Philadelphia | - |
| tm-alan-walker-2027-boston-vv1a8vpfzgauaajv | Alan Walker | refresh (applied) | 8265260 | https://www.ticketliquidator.com/tickets/8265260/Alan-Walker-tickets-Wed-Feb-10-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-alan-walker-2027-new-york-z7r9jz1aavt4a | Alan Walker | refresh (applied) | 8265262 | https://www.ticketliquidator.com/tickets/8265262/Alan-Walker-tickets-Thu-Feb-11-2027-Terminal-5 | - |
| tm-alan-walker-2027-new-york-z7r9jz1aavt4k | Alan Walker | refresh (applied) | 8265263 | https://www.ticketliquidator.com/tickets/8265263/Alan-Walker-tickets-Fri-Feb-12-2027-Terminal-5 | - |
| tm-alan-walker-2027-montreal-1aszkfngkelr9-v | Alan Walker | refresh (applied) | 8269075 | https://www.ticketliquidator.com/tickets/8269075/Alan-Walker-tickets-Tue-Feb-16-2027-MTelus | - |
| tm-alan-walker-2027-toronto-1avzz_3gkilb6g_ | Alan Walker | none | - | - | no qualifying listing (complete catalog checked) |
| tm-alan-walker-2027-toronto-1avzz_3gkilbmgn | Alan Walker | none | - | - | no qualifying listing (complete catalog checked) |
| tm-alan-walker-2027-ottawa-16d7z_3qeg7dn9t | Alan Walker | none | - | - | no qualifying listing (complete catalog checked) |
| tm-alan-walker-2027-pittsburgh-z7r9jz1aavt46 | Alan Walker | refresh (applied) | 8265270 | https://www.ticketliquidator.com/tickets/8265270/Alan-Walker-tickets-Tue-Feb-23-2027-Stage-AE | - |
| tm-alan-walker-2027-columbus-z7r9jz1aavt4f | Alan Walker | refresh (applied) | 8265272 | https://www.ticketliquidator.com/tickets/8265272/Alan-Walker-tickets-Wed-Feb-24-2027-KEMBA-Live | - |
| tm-alan-walker-2027-indianapolis-vv1aazkfegkewtmln | Alan Walker | refresh (applied) | 8265273 | https://www.ticketliquidator.com/tickets/8265273/Alan-Walker-tickets-Thu-Feb-25-2027-Egyptian-Room-At-Old-National-Centre | - |
| tm-alan-walker-2027-chicago-vv1k8z_3gyg7zohx | Alan Walker | refresh (applied) | 8265271 | https://www.ticketliquidator.com/tickets/8265271/Alan-Walker-tickets-Fri-Feb-26-2027-Byline-Bank-Aragon-Ballroom | - |
| tm-alan-walker-2027-seattle-z7r9jz1aavt4a | Alan Walker | refresh (applied) | 8265274 | https://www.ticketliquidator.com/tickets/8265274/Alan-Walker-tickets-Wed-Mar-3-2027-Showbox-SoDo | - |
| tm-alan-walker-2027-portland-z7r9jz1aavt48 | Alan Walker | refresh (applied) | 8261374 | https://www.ticketliquidator.com/tickets/8261374/Alan-Walker-tickets-Thu-Mar-4-2027-McMenamins-Crystal-Ballroom | - |
| tm-alan-walker-2027-los-angeles-vvg1iz_3n0r6vh | Alan Walker | refresh (applied) | 8265277 | https://www.ticketliquidator.com/tickets/8265277/Alan-Walker-tickets-Sat-Mar-6-2027-The-Torch-at-Los-Angeles-Memorial-Coliseum | - |
| tm-the-psychedelic-furs-2027-austin-z7r9jz1aavso0 | The Psychedelic Furs | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: The Psychedelic Furs & Living Colour; text: The Psychedelic Furs & Living Colour The Psychedelic Furs & Living Colour /tickets/8267013/The-Psychedelic-Furs-tickets-Thu-Mar-25-2027-ACL-) |
| tm-the-psychedelic-furs-2027-saint-louis-1ae7z_3gkmwkki0 | The Psychedelic Furs | refresh (applied) | 8266282 | https://www.ticketliquidator.com/tickets/8266282/The-Psychedelic-Furs-tickets-Tue-Mar-30-2027-The-Factory-Chesterfield | - |
| tm-the-psychedelic-furs-2027-waukegan-vv166zkf-0ozagdv5d | The Psychedelic Furs | refresh (applied) | 8266290 | https://www.ticketliquidator.com/tickets/8266290/The-Psychedelic-Furs-tickets-Thu-Apr-1-2027-Genesee-Theatre | - |
| tm-the-psychedelic-furs-2027-tallahassee-z7r9jz1aavsop | The Psychedelic Furs | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: The Psychedelic Furs & Living Colour; text: The Psychedelic Furs & Living Colour The Psychedelic Furs & Living Colour /tickets/8269286/The-Psychedelic-Furs-tickets-Wed-Apr-7-2027-The-M) |
| tm-the-psychedelic-furs-2027-saint-petersburg-z7r9jz1aavsof | The Psychedelic Furs | refresh (applied) | 7938701 | https://www.ticketliquidator.com/tickets/7938701/The-Psychedelic-Furs-tickets-Thu-Apr-8-2027-Jannus-Live | - |
| tm-the-psychedelic-furs-2027-miami-beach-vvg1vz_3egjcmc | The Psychedelic Furs | refresh (applied) | 8376130 | https://www.ticketliquidator.com/tickets/8376130/The-Psychedelic-Furs-tickets-Sat-Apr-10-2027-The-Fillmore-Miami-Beach-At-Jackie-Gleason-Theater | - |
| tm-the-psychedelic-furs-2027-asheville-g5evz_35jhjdg | The Psychedelic Furs | refresh (applied) | 8266294 | https://www.ticketliquidator.com/tickets/8266294/The-Psychedelic-Furs-tickets-Sat-Apr-17-2027-Thomas-Wolfe-Auditorium-at-Harrahs-Cherokee-Center | - |
| tm-the-psychedelic-furs-2027-norfolk-z7r9jz1aavs4p | The Psychedelic Furs | refresh (applied) | 8268317 | https://www.ticketliquidator.com/tickets/8268317/The-Psychedelic-Furs-tickets-Tue-Apr-20-2027-The-Norva | - |
| tm-the-psychedelic-furs-2027-baltimore-1avfz_ogktjo5z- | The Psychedelic Furs | refresh (applied) | 8266296 | https://www.ticketliquidator.com/tickets/8266296/The-Psychedelic-Furs-tickets-Fri-Apr-23-2027-Nevermore-Hall | - |
| tm-the-psychedelic-furs-2027-bethlehem-vv17fz_3gkmknapk | The Psychedelic Furs | refresh (applied) | 8266273 | https://www.ticketliquidator.com/tickets/8266273/The-Psychedelic-Furs-tickets-Sat-Apr-24-2027-Wind-Creek-Event-Center | - |
| tm-the-psychedelic-furs-2027-red-bank-g5vvz_3ilcqvm | The Psychedelic Furs | refresh (applied) | 8266297 | https://www.ticketliquidator.com/tickets/8266297/The-Psychedelic-Furs-tickets-Tue-Apr-27-2027-Hackensack-Meridian-Health-Theatre-at-the-Count-Basie-Center-for-the-Arts | - |
| tm-the-psychedelic-furs-2027-huntington-k7vgf_3n_asme | The Psychedelic Furs | refresh (applied) | 8266298 | https://www.ticketliquidator.com/tickets/8266298/The-Psychedelic-Furs-tickets-Wed-Apr-28-2027-Paramount-Theatre-Huntington | - |
| tm-the-psychedelic-furs-2027-northfield-vv17fz_ogkhgkwao | The Psychedelic Furs | refresh (applied) | 8267710 | https://www.ticketliquidator.com/tickets/8267710/The-Psychedelic-Furs-tickets-Sat-May-1-2027-Northfield-Park-Racino-Center-Stage | - |
| tm-eros-ramazzotti-2027-new-york-g5dyz_ou7is1y | Eros Ramazzotti | refresh (applied) | 8244289 | https://www.ticketliquidator.com/tickets/8244289/Eros-Ramazzotti-tickets-Sat-Oct-2-2027-Radio-City-Music-Hall | - |
| tm-the-warning-2027-madrid-z698xz2qz1k_074bf | The Warning | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-warning-2027-barcelona-z698xz2qz16vgvavjf | The Warning | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-warning-2027-birmingham-g5dzz_3jthdkp | The Warning | refresh (applied) | 8265893 | https://www.ticketliquidator.com/tickets/8265893/The-Warning-tickets-Mon-Mar-29-2027-O2-Academy-Birmingham | - |
| tm-the-warning-2027-glasgow-g5dzz_3cmwwj3 | The Warning | refresh (applied) | 8267822 | https://www.ticketliquidator.com/tickets/8267822/The-Warning-tickets-Tue-Mar-30-2027-O2-Academy-Glasgow | - |
| tm-the-warning-2027-manchester-g5dzz_3jr_df6 | The Warning | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-warning-2027-phoenix-1av0z_3gkl3jytk | The Warning | refresh (applied) | 8264649 | https://www.ticketliquidator.com/tickets/8264649/The-Warning-tickets-Sun-Apr-18-2027-The-Van-Buren | - |
| tm-the-warning-2027-san-francisco-z7r9jz1aavtgn | The Warning | refresh (applied) | 8264655 | https://www.ticketliquidator.com/tickets/8264655/The-Warning-tickets-Tue-Apr-20-2027-Warfield | - |
| tm-the-warning-2027-portland-z7r9jz1aavtg0 | The Warning | refresh (applied) | 8264657 | https://www.ticketliquidator.com/tickets/8264657/The-Warning-tickets-Thu-Apr-22-2027-Roseland-Theater | - |
| tm-the-warning-2027-seattle-vvg1hz_3rqncw_ | The Warning | refresh (applied) | 8264648 | https://www.ticketliquidator.com/tickets/8264648/The-Warning-tickets-Fri-Apr-23-2027-Moore-Theatre-WA | - |
| tm-the-warning-2027-vancouver-z7r9jz1aavjo7 | The Warning | refresh (applied) | 8264658 | https://www.ticketliquidator.com/tickets/8264658/The-Warning-tickets-Sun-Apr-25-2027-Vogue-Theatre-BC | - |
| tm-the-warning-2027-denver-g5vzz_3mnvfjd | The Warning | refresh (applied) | 8264659 | https://www.ticketliquidator.com/tickets/8264659/The-Warning-tickets-Wed-Apr-28-2027-Fillmore-Auditorium-Colorado | - |
| tm-the-warning-2027-oklahoma-city-z7r9jz1aavtgp | The Warning | refresh (applied) | 8264660 | https://www.ticketliquidator.com/tickets/8264660/The-Warning-tickets-Sat-May-1-2027-The-Criterion-Oklahoma-City | - |
| tm-the-warning-2027-houston-g5diz_30oeism | The Warning | refresh (applied) | 8264650 | https://www.ticketliquidator.com/tickets/8264650/The-Warning-tickets-Sun-May-2-2027-Bayou-Music-Center | - |
| tm-the-warning-2027-atlanta-z7r9jz1aavtgj | The Warning | refresh (applied) | 8264656 | https://www.ticketliquidator.com/tickets/8264656/The-Warning-tickets-Tue-May-4-2027-The-Eastern-GA | - |
| tm-the-warning-2027-detroit-vv17oz_3gklkji_k | The Warning | refresh (applied) | 8264651 | https://www.ticketliquidator.com/tickets/8264651/The-Warning-tickets-Thu-May-6-2027-The-Fillmore-Detroit | - |
| tm-the-warning-2027-ottawa-1ad7z_3gklmhbs8 | The Warning | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-warning-2027-montreal-1ad7z_3gknfhkqk | The Warning | refresh (applied) | 8270802 | https://www.ticketliquidator.com/tickets/8270802/The-Warning-tickets-Sun-May-9-2027-MTelus | - |
| tm-the-warning-2027-toronto-1avzz_3gkltrh3z | The Warning | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-warning-2027-pittsburgh-1avbz_3gknh0_t1 | The Warning | refresh (applied) | 8264652 | https://www.ticketliquidator.com/tickets/8264652/The-Warning-tickets-Sat-May-15-2027-Citizens-Live-at-The-Wylie | - |
| tm-the-warning-2027-brooklyn-k7vgf_3iu7xhd | The Warning | refresh (applied) | 8264661 | https://www.ticketliquidator.com/tickets/8264661/The-Warning-tickets-Tue-May-18-2027-Brooklyn-Paramount | - |
| tm-the-warning-2027-boston-vv177z_3gklqgssu | The Warning | refresh (applied) | 8264653 | https://www.ticketliquidator.com/tickets/8264653/The-Warning-tickets-Sun-May-23-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-metallica-2027-vancouver-1av7z_3gkd3wcu8 | Metallica | refresh (applied) | 8268591 | https://www.ticketliquidator.com/tickets/8268591/Metallica-tickets-Sat-May-8-2027-BC-Place-Stadium | - |
| tm-metallica-2027-san-diego-vvg1iz_3rsxtwd | Metallica | refresh (applied) | 8268592 | https://www.ticketliquidator.com/tickets/8268592/Metallica-tickets-Thu-May-13-2027-Snapdragon-Stadium | - |
| tm-metallica-2027-el-paso-vvg1yz_3zjrn4d | Metallica | refresh (applied) | 8268593 | https://www.ticketliquidator.com/tickets/8268593/Metallica-tickets-Tue-May-18-2027-Sun-Bowl-Stadium | - |
| tm-metallica-2027-san-antonio-g5diz_3mpis-k | Metallica | refresh (applied) | 8268594 | https://www.ticketliquidator.com/tickets/8268594/Metallica-tickets-Sat-May-22-2027-Alamodome | - |
| tm-metallica-2027-fayetteville-g5viz_om30atl | Metallica | refresh (applied) | 8268595 | https://www.ticketliquidator.com/tickets/8268595/Metallica-tickets-Wed-May-26-2027-Donald-W-Reynolds-Razorback-Stadium | - |
| tm-metallica-2027-kansas-city-vv17bz_3gkwemfok | Metallica | refresh (applied) | 8268597 | https://www.ticketliquidator.com/tickets/8268597/Metallica-tickets-Sat-May-29-2027-Arrowhead-Stadium | - |
| tm-metallica-2027-indianapolis-vv17fz_3gktr8lni | Metallica | refresh (applied) | 8268598 | https://www.ticketliquidator.com/tickets/8268598/Metallica-tickets-Sat-Jun-5-2027-Lucas-Oil-Stadium | - |
| tm-metallica-2027-orchard-park-vv17gz_3gktmreup | Metallica | refresh (applied) | 8268600 | https://www.ticketliquidator.com/tickets/8268600/Metallica-tickets-Tue-Jun-8-2027-New-Highmark-Stadium | - |
| tm-metallica-2027-cleveland-vv17fz_3gkdywngg | Metallica | refresh (applied) | 8268601 | https://www.ticketliquidator.com/tickets/8268601/Metallica-tickets-Tue-Jun-15-2027-Huntington-Bank-Field | - |
| tm-metallica-2027-salt-lake-city-g5vzz_3hepr-9 | Metallica | refresh (applied) | 8268602 | https://www.ticketliquidator.com/tickets/8268602/Metallica-tickets-Sat-Jun-19-2027-Rice-Eccles-Stadium | - |
| tm-teddy-swims-2027-dublin-17kzv0g6260hbxf | Teddy Swims | refresh (applied) | 8314998 | https://www.ticketliquidator.com/tickets/8314998/Teddy-Swims-tickets-Fri-Apr-9-2027-3Arena-Dublin | - |
| tm-teddy-swims-2027-london-17u8v0g623nj3ov | Teddy Swims | refresh (applied) | 8284502 | https://www.ticketliquidator.com/tickets/8284502/Teddy-Swims-tickets-Sun-Apr-25-2027-O2-Arena-London | - |
| tm-michelle-branch-2027-tulsa-z7r9jz1aazuoa | Michelle Branch | refresh (applied) | 8217723 | https://www.ticketliquidator.com/tickets/8217723/Michelle-Branch-tickets-Fri-Mar-5-2027-Cains-Ballroom | - |
| tm-yuridia-2027-rosemont-vv1a7zkf0gkeskm_x | Yuridia | refresh (applied) | 8276961 | https://www.ticketliquidator.com/tickets/8276961/Yuridia-tickets-Wed-Mar-24-2027-Rosemont-Theatre | - |
| tm-pink-martini-2027-charlottesville-z7r9jz1aav-zj | Pink Martini | refresh (applied) | 8210508 | https://www.ticketliquidator.com/tickets/8210508/Pink-Martini-tickets-Sun-Mar-21-2027-Paramount-Theater-Of-Charlottesville | - |
| tm-oasis-2027-munich-z698xzc2z16vca8yqu | Oasis | refresh (applied) | 8264767 | https://www.ticketliquidator.com/tickets/8264767/Oasis-tickets-Fri-Jul-2-2027-Allianz-Arena | - |
| tm-oasis-2027-munich-z698xzc2z16ezoffov | Oasis | refresh (applied) | 8264768 | https://www.ticketliquidator.com/tickets/8264768/Oasis-tickets-Sat-Jul-3-2027-Allianz-Arena | - |
| tm-oasis-2027-munich-z698xzc2z16v7f7_4g | Oasis | refresh (applied) | 8284871 | https://www.ticketliquidator.com/tickets/8284871/Oasis-tickets-Tue-Jul-6-2027-Allianz-Arena | - |
| tm-hans-zimmer-2027-belmont-park-1adzz_3gkmrvuzw | Hans Zimmer | refresh (applied) | 8270975 | https://www.ticketliquidator.com/tickets/8270975/Hans-Zimmer-tickets-Fri-Feb-19-2027-UBS-Arena | - |
| tm-hans-zimmer-2027-newark-vv1aezkfygkepjhre | Hans Zimmer | refresh (applied) | 8270976 | https://www.ticketliquidator.com/tickets/8270976/Hans-Zimmer-tickets-Sun-Feb-21-2027-Prudential-Center | - |
| tm-hans-zimmer-2027-philadelphia-1kgzvpgaga1lecy | Hans Zimmer | refresh (applied) | 8270977 | https://www.ticketliquidator.com/tickets/8270977/Hans-Zimmer-tickets-Tue-Feb-23-2027-Xfinity-Mobile-Arena | - |
| tm-hans-zimmer-2027-boston-vv1avzkftgkdjvzxr | Hans Zimmer | refresh (applied) | 8270978 | https://www.ticketliquidator.com/tickets/8270978/Hans-Zimmer-tickets-Wed-Feb-24-2027-TD-Garden | - |
| tm-hans-zimmer-2027-kanata-1aszkf0gkdalm2x | Hans Zimmer | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hans-zimmer-2027-quebec-1fg8vp17a7z7uce8 | Hans Zimmer | refresh (applied) | 8271005 | https://www.ticketliquidator.com/tickets/8271005/Hans-Zimmer-tickets-Sun-Feb-28-2027-Centre-Videotron | - |
| tm-hans-zimmer-2027-hamilton-1a8zkfigkdxfojj | Hans Zimmer | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hans-zimmer-2027-detroit-vv17oz_3gky-owzw | Hans Zimmer | refresh (applied) | 8270979 | https://www.ticketliquidator.com/tickets/8270979/Hans-Zimmer-tickets-Wed-Mar-3-2027-Little-Caesars-Arena | - |
| tm-hans-zimmer-2027-chicago-vv178z_3gkta7u7g | Hans Zimmer | refresh (applied) | 8270980 | https://www.ticketliquidator.com/tickets/8270980/Hans-Zimmer-tickets-Fri-Mar-5-2027-United-Center | - |
| tm-hans-zimmer-2027-cincinnati-1avbz_3gkbx_fb1 | Hans Zimmer | refresh (applied) | 8270981 | https://www.ticketliquidator.com/tickets/8270981/Hans-Zimmer-tickets-Sun-Mar-7-2027-Heritage-Bank-Center | - |
| tm-hans-zimmer-2027-charlotte-g5evz_3h3lwh3 | Hans Zimmer | refresh (applied) | 8270982 | https://www.ticketliquidator.com/tickets/8270982/Hans-Zimmer-tickets-Tue-Mar-9-2027-Spectrum-Center | - |
| tm-hans-zimmer-2027-orlando-1axzkfygkexmgrx | Hans Zimmer | refresh (applied) | 8270983 | https://www.ticketliquidator.com/tickets/8270983/Hans-Zimmer-tickets-Thu-Mar-11-2027-Kia-Center | - |
| tm-hans-zimmer-2027-miami-vvg1vz_3gotwd8 | Hans Zimmer | refresh (applied) | 8270985 | https://www.ticketliquidator.com/tickets/8270985/Hans-Zimmer-tickets-Sat-Mar-13-2027-Kaseya-Center | - |
| tm-hans-zimmer-2027-tampa-vvg1vz_3xhwnhj | Hans Zimmer | refresh (applied) | 8270987 | https://www.ticketliquidator.com/tickets/8270987/Hans-Zimmer-tickets-Sun-Mar-14-2027-Benchmark-International-Arena | - |
| tm-hans-zimmer-2027-atlanta-vvg1zz_3ebknkc | Hans Zimmer | refresh (applied) | 8270989 | https://www.ticketliquidator.com/tickets/8270989/Hans-Zimmer-tickets-Tue-Mar-16-2027-State-Farm-Arena-GA | - |
| tm-hans-zimmer-2027-nashville-g5viz_3pzfvfc | Hans Zimmer | refresh (applied) | 8270990 | https://www.ticketliquidator.com/tickets/8270990/Hans-Zimmer-tickets-Wed-Mar-17-2027-Bridgestone-Arena | - |
| tm-hans-zimmer-2027-fort-worth-vvg1yz_8uydbmt | Hans Zimmer | refresh (applied) | 8270991 | https://www.ticketliquidator.com/tickets/8270991/Hans-Zimmer-tickets-Mon-Mar-22-2027-Ariat-Arena | - |
| tm-hans-zimmer-2027-denver-g5vzz_keile5w | Hans Zimmer | refresh (applied) | 8270993 | https://www.ticketliquidator.com/tickets/8270993/Hans-Zimmer-tickets-Thu-Mar-25-2027-Ball-Arena | - |
| tm-hans-zimmer-2027-phoenix-1av0z_3gktywjdb | Hans Zimmer | refresh (applied) | 8270994 | https://www.ticketliquidator.com/tickets/8270994/Hans-Zimmer-tickets-Tue-Mar-30-2027-Mortgage-Matchup-Center | - |
| tm-hans-zimmer-2027-anaheim-vv170z_3gkwtdbyn | Hans Zimmer | refresh (applied) | 8270996 | https://www.ticketliquidator.com/tickets/8270996/Hans-Zimmer-tickets-Fri-Apr-2-2027-Honda-Center | - |
| tm-hans-zimmer-2027-san-francisco-g5vyz_32ucflk | Hans Zimmer | refresh (applied) | 8270997 | https://www.ticketliquidator.com/tickets/8270997/Hans-Zimmer-tickets-Sun-Apr-4-2027-Chase-Center | - |
| tm-hans-zimmer-2027-sacramento-g5vyz_3nnpqvc | Hans Zimmer | refresh (applied) | 8270998 | https://www.ticketliquidator.com/tickets/8270998/Hans-Zimmer-tickets-Mon-Apr-5-2027-Golden-1-Center | - |
| tm-hans-zimmer-2027-vancouver-1av7z_3gkxmnqqq | Hans Zimmer | refresh (applied) | 8271008 | https://www.ticketliquidator.com/tickets/8271008/Hans-Zimmer-tickets-Thu-Apr-8-2027-Rogers-Arena | - |
| tm-hans-zimmer-2027-seattle-vvg1hz_3exntsl | Hans Zimmer | refresh (applied) | 8271000 | https://www.ticketliquidator.com/tickets/8271000/Hans-Zimmer-tickets-Fri-Apr-9-2027-Climate-Pledge-Arena | - |
| tm-hans-zimmer-2027-portland-vvg1hz_3zbqmzv | Hans Zimmer | refresh (applied) | 8271002 | https://www.ticketliquidator.com/tickets/8271002/Hans-Zimmer-tickets-Sun-Apr-11-2027-Moda-Center-at-the-Rose-Quarter | - |
| tm-kenny-chesney-2027-tampa-vvg1vz_3xhd4sr | Kenny Chesney | refresh (applied) | 8265768 | https://www.ticketliquidator.com/tickets/8265768/Kenny-Chesney-tickets-Sat-Apr-24-2027-Raymond-James-Stadium | - |
| tm-kenny-chesney-2027-greenville-z7r9jz1aavsad | Kenny Chesney | refresh (applied) | 8265769 | https://www.ticketliquidator.com/tickets/8265769/Kenny-Chesney-tickets-Sat-May-1-2027-Dowdy-Ficklen-Stadium | - |
| tm-kenny-chesney-2027-arlington-z7r9jz1aavsa7 | Kenny Chesney | refresh (applied) | 8265770 | https://www.ticketliquidator.com/tickets/8265770/Kenny-Chesney-tickets-Sat-May-8-2027-ATT-Stadium | - |
| tm-kenny-chesney-2027-saint-louis-vv1kvovpfigaupvvy | Kenny Chesney | refresh (applied) | 8265773 | https://www.ticketliquidator.com/tickets/8265773/Kenny-Chesney-tickets-Sat-May-15-2027-The-Dome-at-Americas-Center | - |
| tm-kenny-chesney-2027-minneapolis-vv1akzkf0gkdyrnq8 | Kenny Chesney | refresh (applied) | 8265774 | https://www.ticketliquidator.com/tickets/8265774/Kenny-Chesney-tickets-Sat-May-22-2027-US-Bank-Stadium | - |
| tm-kenny-chesney-2027-pittsburgh-1apzkfxgkdbuj3l | Kenny Chesney | refresh (applied) | 8265775 | https://www.ticketliquidator.com/tickets/8265775/Kenny-Chesney-tickets-Sat-May-29-2027-Acrisure-Stadium | - |
| tm-kenny-chesney-2027-ames-vv1kbz_3x6g7cusy | Kenny Chesney | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Kenny Chesney, Eric Church, Sheryl Crow & Greylan James; text: Kenny Chesney, Eric Church, Sheryl Crow & Greylan James Kenny Chesney, Eric Church, Sheryl Crow & Greylan James /tickets/8265776/Kenny-Chesn) |
| tm-kenny-chesney-2027-philadelphia-vv1aezkfigkdubjp8 | Kenny Chesney | refresh (applied) | 8265777 | https://www.ticketliquidator.com/tickets/8265777/Kenny-Chesney-tickets-Sat-Jun-12-2027-Lincoln-Financial-Field | - |
| tm-kenny-chesney-2027-orchard-park-vv1adzkfngkd3refj | Kenny Chesney | refresh (applied) | 8265778 | https://www.ticketliquidator.com/tickets/8265778/Kenny-Chesney-tickets-Sat-Jun-19-2027-New-Highmark-Stadium | - |
| tm-kenny-chesney-2027-chicago-vv1f8z_3ao7xzd2g1 | Kenny Chesney | refresh (applied) | 8265779 | https://www.ticketliquidator.com/tickets/8265779/Kenny-Chesney-tickets-Sat-Jun-26-2027-Soldier-Field | - |
| tm-kenny-chesney-2027-nashville-z7r9jz1aavsaa | Kenny Chesney | refresh (applied) | 8265780 | https://www.ticketliquidator.com/tickets/8265780/Kenny-Chesney-tickets-Sat-Jul-3-2027-New-Nissan-Stadium | - |
| tm-kenny-chesney-2027-milwaukee-vv1a6zkftgkdfvyq7 | Kenny Chesney | refresh (applied) | 8265781 | https://www.ticketliquidator.com/tickets/8265781/Kenny-Chesney-tickets-Sat-Jul-10-2027-American-Family-Field | - |
| tm-kenny-chesney-2027-denver-g5vzz_3k6u08y | Kenny Chesney | refresh (applied) | 8265782 | https://www.ticketliquidator.com/tickets/8265782/Kenny-Chesney-tickets-Sat-Jul-17-2027-Empower-Field-At-Mile-High | - |
| tm-kenny-chesney-2027-kansas-city-vv1akzkfxgkdkijos | Kenny Chesney | refresh (applied) | 8265784 | https://www.ticketliquidator.com/tickets/8265784/Kenny-Chesney-tickets-Sat-Jul-24-2027-Arrowhead-Stadium | - |
| tm-kenny-chesney-2027-atlanta-vvg1zz_3x03by9 | Kenny Chesney | refresh (applied) | 8265786 | https://www.ticketliquidator.com/tickets/8265786/Kenny-Chesney-tickets-Sat-Jul-31-2027-Mercedes-Benz-Stadium | - |
| tm-kenny-chesney-2027-east-rutherford-k7vgf_3cwtd0z | Kenny Chesney | refresh (applied) | 8265787 | https://www.ticketliquidator.com/tickets/8265787/Kenny-Chesney-tickets-Sat-Aug-7-2027-MetLife-Stadium | - |
| tm-kenny-chesney-2027-detroit-vv17oz_8gkmnwpji | Kenny Chesney | refresh (applied) | 8265788 | https://www.ticketliquidator.com/tickets/8265788/Kenny-Chesney-tickets-Sat-Aug-14-2027-Ford-Field | - |
| tm-kenny-chesney-2027-charlotte-g5evz_3c19bfo | Kenny Chesney | refresh (applied) | 8265789 | https://www.ticketliquidator.com/tickets/8265789/Kenny-Chesney-tickets-Sat-Aug-21-2027-Bank-Of-America-Stadium | - |
| tm-kenny-chesney-2027-foxborough-vv177z_3gkt1lkmv | Kenny Chesney | refresh (applied) | 8276965 | https://www.ticketliquidator.com/tickets/8276965/Kenny-Chesney-tickets-Fri-Aug-27-2027-Gillette-Stadium | - |
| tm-kenny-chesney-2027-foxborough-vv1avzkfxgkdu8gfo | Kenny Chesney | refresh (applied) | 8265790 | https://www.ticketliquidator.com/tickets/8265790/Kenny-Chesney-tickets-Sat-Aug-28-2027-Gillette-Stadium | - |
| tm-death-cab-for-cutie-2027-honolulu-vvg1iz_3dqr_0d | Death Cab for Cutie | refresh (applied) | 8271385 | https://www.ticketliquidator.com/tickets/8271385/Death-Cab-for-Cutie-tickets-Tue-Jan-19-2027-Neal-S-Blaisdell-Center-Arena | - |
| tm-death-cab-for-cutie-2027-nashville-g5viz_3bvgq-a | Death Cab for Cutie | refresh (applied) | 8271386 | https://www.ticketliquidator.com/tickets/8271386/Death-Cab-for-Cutie-tickets-Thu-Mar-11-2027-The-Truth | - |
| tm-death-cab-for-cutie-2027-knoxville-g5viz_3xoa9li | Death Cab for Cutie | refresh (applied) | 8271387 | https://www.ticketliquidator.com/tickets/8271387/Death-Cab-for-Cutie-tickets-Fri-Mar-12-2027-Tennessee-Theatre | - |
| tm-death-cab-for-cutie-2027-miami-beach-vvg1vz_3ltyqny | Death Cab for Cutie | refresh (applied) | 8271388 | https://www.ticketliquidator.com/tickets/8271388/Death-Cab-for-Cutie-tickets-Thu-Mar-18-2027-The-Fillmore-Miami-Beach-At-Jackie-Gleason-Theater | - |
| tm-death-cab-for-cutie-2027-orlando-1aefz_3gkr16pfe | Death Cab for Cutie | refresh (applied) | 8271389 | https://www.ticketliquidator.com/tickets/8271389/Death-Cab-for-Cutie-tickets-Sat-Mar-20-2027-Hard-Rock-Live-Orlando | - |
| tm-death-cab-for-cutie-2027-houston-g5diz_3dogrf9 | Death Cab for Cutie | refresh (applied) | 8271390 | https://www.ticketliquidator.com/tickets/8271390/Death-Cab-for-Cutie-tickets-Mon-Mar-22-2027-713-Music-Hall | - |
| tm-death-cab-for-cutie-2027-pittsburgh-1apzkfygkd_ubdt | Death Cab for Cutie | refresh (applied) | 8271391 | https://www.ticketliquidator.com/tickets/8271391/Death-Cab-for-Cutie-tickets-Tue-Mar-30-2027-Citizens-Live-at-The-Wylie | - |
| tm-death-cab-for-cutie-2027-niagara-falls-1avzz_3gkxslrqs | Death Cab for Cutie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-death-cab-for-cutie-2027-ottawa-1ad7z_3gkhxejxw | Death Cab for Cutie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-death-cab-for-cutie-2027-montreal-1ad7z_3gkrplg-n | Death Cab for Cutie | refresh (applied) | 8271400 | https://www.ticketliquidator.com/tickets/8271400/Death-Cab-for-Cutie-tickets-Mon-Apr-5-2027-MTelus | - |
| tm-death-cab-for-cutie-2027-boston-vv177z_3gklgkjcy | Death Cab for Cutie | refresh (applied) | 8271392 | https://www.ticketliquidator.com/tickets/8271392/Death-Cab-for-Cutie-tickets-Wed-Apr-7-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-death-cab-for-cutie-2027-boston-vv177z_3gklgfg2c | Death Cab for Cutie | refresh (applied) | 8271393 | https://www.ticketliquidator.com/tickets/8271393/Death-Cab-for-Cutie-tickets-Thu-Apr-8-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-death-cab-for-cutie-2027-uncasville-g5vvz_3vqdtrt | Death Cab for Cutie | refresh (applied) | 8271394 | https://www.ticketliquidator.com/tickets/8271394/Death-Cab-for-Cutie-tickets-Fri-Apr-9-2027-Mohegan-Sun-Arena-CT | - |
| tm-death-cab-for-cutie-2027-portland-vv1k7z_ke_g7zcjz | Death Cab for Cutie | refresh (applied) | 8271395 | https://www.ticketliquidator.com/tickets/8271395/Death-Cab-for-Cutie-tickets-Sun-Apr-11-2027-State-Theatre-ME | - |
| tm-death-cab-for-cutie-2027-new-york-g5dyz_kedn3qx | Death Cab for Cutie | refresh (applied) | 8271396 | https://www.ticketliquidator.com/tickets/8271396/Death-Cab-for-Cutie-tickets-Tue-Apr-13-2027-Radio-City-Music-Hall | - |
| tm-death-cab-for-cutie-2027-asheville-g5evz_3io8wkm | Death Cab for Cutie | refresh (applied) | 8271397 | https://www.ticketliquidator.com/tickets/8271397/Death-Cab-for-Cutie-tickets-Fri-Apr-16-2027-ExploreAshevillecom-Arena-at-Harrahs-Cherokee-Center | - |
| tm-the-psychedelic-furs-2027-ridgefield-z7r9jz1aavuq6 | The Psychedelic Furs | refresh (applied) | 8314924 | https://www.ticketliquidator.com/tickets/8314924/The-Psychedelic-Furs-tickets-Fri-Jan-15-2027-The-Ridgefield-Playhouse | - |
| tm-the-psychedelic-furs-2027-birmingham-g5dzz_kk-v07y | The Psychedelic Furs | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-psychedelic-furs-2027-london-1amzkfwgkeiysgf | The Psychedelic Furs | none | - | - | no qualifying listing (complete catalog checked) |
| tm-atmosphere-2027-madison-vv1a6zkfygkes1aem | Atmosphere | refresh (applied) | 8277969 | https://www.ticketliquidator.com/tickets/8277969/Atmosphere-tickets-Fri-Jan-15-2027-The-Sylvee-WI | - |
| tm-atmosphere-2027-boise-g5vzz_kkmetdo | Atmosphere | refresh (applied) | 8277970 | https://www.ticketliquidator.com/tickets/8277970/Atmosphere-tickets-Fri-Jan-22-2027-Knitting-Factory-Concert-House-Boise | - |
| tm-atmosphere-2027-bozeman-g5vzz_k6poibm | Atmosphere | refresh (applied) | 8277971 | https://www.ticketliquidator.com/tickets/8277971/Atmosphere-tickets-Sat-Jan-23-2027-The-Elm-Bozeman | - |
| tm-atmosphere-2027-spokane-g5vzz_kkyknfe | Atmosphere | refresh (applied) | 8277972 | https://www.ticketliquidator.com/tickets/8277972/Atmosphere-tickets-Sun-Jan-24-2027-Knitting-Factory-Spokane | - |
| tm-atmosphere-2027-vancouver-1av7z_3gkx859iu | Atmosphere | refresh (applied) | 8277978 | https://www.ticketliquidator.com/tickets/8277978/Atmosphere-tickets-Tue-Jan-26-2027-Commodore-Ballroom | - |
| tm-atmosphere-2027-eugene-z7r9jz1aaez3b | Atmosphere | refresh (applied) | 8277983 | https://www.ticketliquidator.com/tickets/8277983/Atmosphere-tickets-Thu-Jan-28-2027-McDonald-Theatre | - |
| tm-atmosphere-2027-reno-1a9zkfwgkddbjmf | Atmosphere | refresh (applied) | 8277973 | https://www.ticketliquidator.com/tickets/8277973/Atmosphere-tickets-Fri-Jan-29-2027-Grand-Sierra-Theatre | - |
| tm-atmosphere-2027-tucson-1kk8vpgiga2ka3q | Atmosphere | refresh (applied) | 8277974 | https://www.ticketliquidator.com/tickets/8277974/Atmosphere-tickets-Mon-Feb-1-2027-Rialto-Theatre-Tucson | - |
| tm-atmosphere-2027-kansas-city-vv11bz_k7z0sqj | Atmosphere | refresh (applied) | 8277975 | https://www.ticketliquidator.com/tickets/8277975/Atmosphere-tickets-Thu-Feb-4-2027-VooDoo-Lounge-At-Harrahs-Kansas-City | - |
| tm-atmosphere-2027-joliet-vv17jz_3gknvxst7 | Atmosphere | refresh (applied) | 8277976 | https://www.ticketliquidator.com/tickets/8277976/Atmosphere-tickets-Fri-Feb-5-2027-Hollywood-Casino-IL | - |
| tm-atmosphere-2027-rockford-1ae7z_3gkl5agu0 | Atmosphere | refresh (applied) | 8277977 | https://www.ticketliquidator.com/tickets/8277977/Atmosphere-tickets-Sat-Feb-6-2027-Hard-Rock-Live-Rockford | - |
| tm-hilary-duff-2027-vancouver-1aozko7gkervl69 | Hilary Duff | refresh (applied) | 7734988 | https://www.ticketliquidator.com/tickets/7734988/Hilary-Duff-tickets-Fri-Jan-22-2027-Rogers-Arena | - |
| tm-hilary-duff-2027-vancouver-1av7z_7gkuh7fot | Hilary Duff | refresh (applied) | 7745831 | https://www.ticketliquidator.com/tickets/7745831/Hilary-Duff-tickets-Sat-Jan-23-2027-Rogers-Arena | - |
| tm-hilary-duff-2027-calgary-1k78v0ojga2h3es | Hilary Duff | refresh (applied) | 7734989 | https://www.ticketliquidator.com/tickets/7734989/Hilary-Duff-tickets-Tue-Jan-26-2027-Scotiabank-Saddledome | - |
| tm-hilary-duff-2027-edmonton-1k78v0ooga1ytpq | Hilary Duff | refresh (applied) | 7734990 | https://www.ticketliquidator.com/tickets/7734990/Hilary-Duff-tickets-Wed-Jan-27-2027-Rogers-Place | - |
| tm-hilary-duff-2027-saskatoon-1k78v0fmgaungny | Hilary Duff | refresh (applied) | 7751988 | https://www.ticketliquidator.com/tickets/7751988/Hilary-Duff-tickets-Fri-Jan-29-2027-SaskTel-Centre | - |
| tm-hilary-duff-2027-winnipeg-1av7z_7gknwgxan | Hilary Duff | refresh (applied) | 7734991 | https://www.ticketliquidator.com/tickets/7734991/Hilary-Duff-tickets-Sat-Jan-30-2027-Canada-Life-Centre | - |
| tm-hilary-duff-2027-hamilton-1avzz_7gkr2rr5b | Hilary Duff | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hilary-duff-2027-kanata-1aszkokgkdr1nwx | Hilary Duff | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hilary-duff-2027-montreal-1aszkoagkeug7uo | Hilary Duff | refresh (applied) | 7734993 | https://www.ticketliquidator.com/tickets/7734993/Hilary-Duff-tickets-Fri-Feb-5-2027-Centre-Bell | - |
| tm-hilary-duff-2027-halifax-1ad7z_7gkm3f7fo | Hilary Duff | refresh (applied) | 7734994 | https://www.ticketliquidator.com/tickets/7734994/Hilary-Duff-tickets-Sun-Feb-7-2027-Scotiabank-Centre | - |
| tm-hilary-duff-2027-madrid-z698xz2qz16vpo4y_t | Hilary Duff | refresh (applied) | 8387793 | https://www.ticketliquidator.com/tickets/8387793/Hilary-Duff-tickets-Fri-May-7-2027-Movistar-Arena-Madrid | - |
| tm-hilary-duff-2027-milano-zg9rmiynyz776e | Hilary Duff | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hilary-duff-2027-forest-brussels-z698xzg2z1kqm7d-k | Hilary Duff | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hilary-duff-2027-amsterdam-z698xzbpz1k3djpek | Hilary Duff | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hilary-duff-2027-orlando-1axzkfugkdwff3y | Hilary Duff | refresh (applied) | 8284544 | https://www.ticketliquidator.com/tickets/8284544/Hilary-Duff-tickets-Sat-Oct-2-2027-Kia-Center | - |
| tm-hilary-duff-2027-raleigh-g5evz_kpqg6lj | Hilary Duff | refresh (applied) | 8284585 | https://www.ticketliquidator.com/tickets/8284585/Hilary-Duff-tickets-Mon-Oct-4-2027-Lenovo-Center | - |
| tm-hilary-duff-2027-baltimore-1a4zkfwgket7cfe | Hilary Duff | refresh (applied) | 8284545 | https://www.ticketliquidator.com/tickets/8284545/Hilary-Duff-tickets-Wed-Oct-6-2027-CFG-Bank-Arena | - |
| tm-hilary-duff-2027-uncasville-g5vvz_k5dwnjz | Hilary Duff | refresh (applied) | 8284546 | https://www.ticketliquidator.com/tickets/8284546/Hilary-Duff-tickets-Fri-Oct-8-2027-Mohegan-Sun-Arena-CT | - |
| tm-hilary-duff-2027-hershey-vv1aezkfugkempa0j | Hilary Duff | refresh (applied) | 8284547 | https://www.ticketliquidator.com/tickets/8284547/Hilary-Duff-tickets-Sat-Oct-9-2027-Giant-Center | - |
| tm-hilary-duff-2027-buffalo-k7vgf_k9lboi8 | Hilary Duff | refresh (applied) | 8284548 | https://www.ticketliquidator.com/tickets/8284548/Hilary-Duff-tickets-Mon-Oct-11-2027-KeyBank-Center | - |
| tm-hilary-duff-2027-columbus-vv1kv8vpu8ga1ilbe | Hilary Duff | refresh (applied) | 8284550 | https://www.ticketliquidator.com/tickets/8284550/Hilary-Duff-tickets-Fri-Oct-15-2027-Value-City-Arena-at-The-Schottenstein-Center | - |
| tm-hilary-duff-2027-pittsburgh-1apzkfsgkdqpqgi | Hilary Duff | refresh (applied) | 8284583 | https://www.ticketliquidator.com/tickets/8284583/Hilary-Duff-tickets-Sat-Oct-16-2027-PPG-Paints-Arena | - |
| tm-hilary-duff-2027-san-antonio-g5diz_kh8lc6s | Hilary Duff | refresh (applied) | 8284551 | https://www.ticketliquidator.com/tickets/8284551/Hilary-Duff-tickets-Fri-Nov-5-2027-Frost-Bank-Center | - |
| tm-hilary-duff-2027-fort-worth-vvg1yz_3lpl3yg | Hilary Duff | refresh (applied) | 8284554 | https://www.ticketliquidator.com/tickets/8284554/Hilary-Duff-tickets-Sat-Nov-6-2027-Ariat-Arena | - |
| tm-hilary-duff-2027-tulsa-1aozkfggkd6ydle | Hilary Duff | refresh (applied) | 8284555 | https://www.ticketliquidator.com/tickets/8284555/Hilary-Duff-tickets-Mon-Nov-8-2027-BOK-Center | - |
| tm-hilary-duff-2027-omaha-vv1akzkfggkdletyo | Hilary Duff | refresh (applied) | 8284567 | https://www.ticketliquidator.com/tickets/8284567/Hilary-Duff-tickets-Wed-Nov-10-2027-CHI-Health-Center-Omaha | - |
| tm-hilary-duff-2027-milwaukee-vv1a6zkfggkdrdjze | Hilary Duff | refresh (applied) | 8284568 | https://www.ticketliquidator.com/tickets/8284568/Hilary-Duff-tickets-Fri-Nov-12-2027-Fiserv-Forum | - |
| tm-hilary-duff-2027-kansas-city-vv1kvovpuoga1lapx | Hilary Duff | refresh (applied) | 8284570 | https://www.ticketliquidator.com/tickets/8284570/Hilary-Duff-tickets-Mon-Nov-15-2027-T-Mobile-Center | - |
| tm-hilary-duff-2027-denver-g5vzz_kkrpbyy | Hilary Duff | refresh (applied) | 8284571 | https://www.ticketliquidator.com/tickets/8284571/Hilary-Duff-tickets-Wed-Nov-17-2027-Ball-Arena | - |
| tm-hilary-duff-2027-anaheim-vv110z_kqbpjub | Hilary Duff | refresh (applied) | 8284572 | https://www.ticketliquidator.com/tickets/8284572/Hilary-Duff-tickets-Sat-Nov-20-2027-Honda-Center | - |
| tm-josiah-queen-2027-tulsa-1aozkf0gkevkv5m | Josiah Queen | refresh (applied) | 8255314 | https://www.ticketliquidator.com/tickets/8255314/Josiah-Queen-tickets-Thu-Apr-8-2027-BOK-Center | - |
| tm-josiah-queen-2027-saint-louis-vv1akzkfngkee0a6p | Josiah Queen | refresh (applied) | 8255315 | https://www.ticketliquidator.com/tickets/8255315/Josiah-Queen-tickets-Fri-Apr-9-2027-Chaifetz-Arena | - |
| tm-josiah-queen-2027-indianapolis-vv1ffz_3xppazdu26 | Josiah Queen | refresh (applied) | 8255316 | https://www.ticketliquidator.com/tickets/8255316/Josiah-Queen-tickets-Sat-Apr-10-2027-Gainbridge-Fieldhouse | - |
| tm-josiah-queen-2027-grand-rapids-vv1afzkfngkeiofuw | Josiah Queen | refresh (applied) | 8255317 | https://www.ticketliquidator.com/tickets/8255317/Josiah-Queen-tickets-Sun-Apr-11-2027-Van-Andel-Arena | - |
| tm-josiah-queen-2027-toronto-1a8zkf-gkdrxwct | Josiah Queen | none | - | - | no qualifying listing (complete catalog checked) |
| tm-josiah-queen-2027-worcester-vv1a8vpfygauucfi | Josiah Queen | refresh (applied) | 8255318 | https://www.ticketliquidator.com/tickets/8255318/Josiah-Queen-tickets-Thu-Apr-15-2027-DCU-Center | - |
| tm-josiah-queen-2027-hershey-vv1aezkf0gkdfm7yq | Josiah Queen | refresh (applied) | 8255319 | https://www.ticketliquidator.com/tickets/8255319/Josiah-Queen-tickets-Fri-Apr-16-2027-Giant-Center | - |
| tm-josiah-queen-2027-charlotte-g5evz_3r2npem | Josiah Queen | refresh (applied) | 8255320 | https://www.ticketliquidator.com/tickets/8255320/Josiah-Queen-tickets-Sat-Apr-17-2027-Spectrum-Center | - |
| tm-josiah-queen-2027-duluth-vvg1zz_3nnlvdz | Josiah Queen | refresh (applied) | 8255321 | https://www.ticketliquidator.com/tickets/8255321/Josiah-Queen-tickets-Sun-Apr-18-2027-Gas-South-Arena | - |
| tm-josiah-queen-2027-hoffman-estates-vv1a7zkfigkdsnse_ | Josiah Queen | refresh (applied) | 8255322 | https://www.ticketliquidator.com/tickets/8255322/Josiah-Queen-tickets-Fri-Apr-23-2027-NOW-Arena | - |
| tm-josiah-queen-2027-anaheim-vv16azkf00fza5k85a | Josiah Queen | refresh (applied) | 8255323 | https://www.ticketliquidator.com/tickets/8255323/Josiah-Queen-tickets-Thu-Apr-29-2027-Honda-Center | - |
| tm-josiah-queen-2027-san-diego-vvg1iz_33lzbne | Josiah Queen | refresh (applied) | 8255324 | https://www.ticketliquidator.com/tickets/8255324/Josiah-Queen-tickets-Fri-Apr-30-2027-Viejas-Arena-At-Aztec-Bowl | - |
| tm-josiah-queen-2027-glendale-1fk8vpavkaz7g1ee | Josiah Queen | refresh (applied) | 8255325 | https://www.ticketliquidator.com/tickets/8255325/Josiah-Queen-tickets-Sat-May-1-2027-Desert-Diamond-Arena | - |
| tm-josiah-queen-2027-fort-worth-vvg1yz_kebfbqm | Josiah Queen | refresh (applied) | 8272507 | https://www.ticketliquidator.com/tickets/8272507/Josiah-Queen-tickets-Wed-May-5-2027-Ariat-Arena | - |
| tm-josiah-queen-2027-cedar-park-g5diz_32hchtd | Josiah Queen | refresh (applied) | 8255326 | https://www.ticketliquidator.com/tickets/8255326/Josiah-Queen-tickets-Fri-May-7-2027-HEB-Center-at-Cedar-Park | - |
| tm-josiah-queen-2027-fort-worth-vvg1yz_35oahaq | Josiah Queen | refresh (applied) | 8255327 | https://www.ticketliquidator.com/tickets/8255327/Josiah-Queen-tickets-Sat-May-8-2027-Ariat-Arena | - |
| tm-ha-ash-2027-toronto-1a8zkfwgkedyh_t | Ha*Ash | none | - | - | no qualifying listing (complete catalog checked) |
| tm-ha-ash-2027-indianapolis-vv1kv8vpg3ga1gw8k | Ha*Ash | refresh (applied) | 8277079 | https://www.ticketliquidator.com/tickets/8277079/HaAsh-tickets-Thu-Apr-22-2027-Murat-Theatre-at-Old-National-Centre | - |
| tm-ha-ash-2027-rosemont-vv1fvzvpg_o4z7ueuv | Ha*Ash | refresh (applied) | 8278251 | https://www.ticketliquidator.com/tickets/8278251/HaAsh-tickets-Fri-Apr-23-2027-Rosemont-Theatre | - |
| tm-ha-ash-2027-denver-g5vzz_k1t3qaq | Ha*Ash | refresh (applied) | 8277080 | https://www.ticketliquidator.com/tickets/8277080/HaAsh-tickets-Sun-Apr-25-2027-Paramount-Theatre-Denver | - |
| tm-ha-ash-2027-seattle-vvg1hz_k1hjj1j | Ha*Ash | refresh (applied) | 8277081 | https://www.ticketliquidator.com/tickets/8277081/HaAsh-tickets-Wed-Apr-28-2027-Paramount-Theatre-Seattle | - |
| tm-ha-ash-2027-inglewood-vvg1iz_3teyn4f | Ha*Ash | refresh (applied) | 8277083 | https://www.ticketliquidator.com/tickets/8277083/HaAsh-tickets-Sun-May-2-2027-YouTube-Theater-at-Hollywood-Park | - |
| tm-ha-ash-2027-san-jose-g5vyz_k6wigg_ | Ha*Ash | refresh (applied) | 8277082 | https://www.ticketliquidator.com/tickets/8277082/HaAsh-tickets-Thu-May-6-2027-San-Jose-Civic | - |
| tm-ha-ash-2027-phoenix-1a_zkfwgkdcnqcy | Ha*Ash | refresh (applied) | 8277084 | https://www.ticketliquidator.com/tickets/8277084/HaAsh-tickets-Sat-May-8-2027-Arizona-Financial-Theatre | - |
| tm-ha-ash-2027-el-paso-vvg1yz_kgeolu1 | Ha*Ash | refresh (applied) | 8277085 | https://www.ticketliquidator.com/tickets/8277085/HaAsh-tickets-Wed-May-12-2027-El-Paso-County-Coliseum | - |
| tm-ha-ash-2027-irving-vvg1yz_k558xwt | Ha*Ash | refresh (applied) | 8277086 | https://www.ticketliquidator.com/tickets/8277086/HaAsh-tickets-Fri-May-14-2027-The-Pavilion-at-Toyota-Music-Factory | - |
| tm-ha-ash-2027-hidalgo-g5diz_kauvdks | Ha*Ash | refresh (applied) | 8277087 | https://www.ticketliquidator.com/tickets/8277087/HaAsh-tickets-Sat-May-15-2027-Payne-Arena | - |
| tm-ha-ash-2027-houston-g5diz_kkygldl | Ha*Ash | refresh (applied) | 8277088 | https://www.ticketliquidator.com/tickets/8277088/HaAsh-tickets-Sun-May-16-2027-713-Music-Hall | - |
| tm-ha-ash-2027-new-york-k7vgf_kc2qanb | Ha*Ash | refresh (applied) | 8277089 | https://www.ticketliquidator.com/tickets/8277089/HaAsh-tickets-Wed-May-19-2027-United-Palace-Theatre | - |
| tm-ha-ash-2027-atlanta-vvg1zz_k1bpf9p | Ha*Ash | refresh (applied) | 8277090 | https://www.ticketliquidator.com/tickets/8277090/HaAsh-tickets-Fri-May-21-2027-Coca-Cola-Roxy | - |
| tm-ha-ash-2027-miami-beach-vvg1vz_k1-dzg7 | Ha*Ash | refresh (applied) | 8277091 | https://www.ticketliquidator.com/tickets/8277091/HaAsh-tickets-Sat-May-22-2027-The-Fillmore-Miami-Beach-At-Jackie-Gleason-Theater | - |
| tm-lukas-graham-2027-dallas-vvg1yz_kg_q-ih | Lukas Graham | refresh (applied) | 8286278 | https://www.ticketliquidator.com/tickets/8286278/Lukas-Graham-tickets-Tue-Mar-2-2027-The-Echo-Lounge-and-Music-Hall | - |
| tm-lukas-graham-2027-atlanta-vvg1zz_kgj9z2e | Lukas Graham | refresh (applied) | 8286279 | https://www.ticketliquidator.com/tickets/8286279/Lukas-Graham-tickets-Thu-Mar-4-2027-Buckhead-Theatre | - |
| tm-lukas-graham-2027-tampa-vvg1vz_kpwcutv | Lukas Graham | refresh (applied) | 8286280 | https://www.ticketliquidator.com/tickets/8286280/Lukas-Graham-tickets-Fri-Mar-5-2027-The-Ritz-Ybor | - |
| tm-lukas-graham-2027-charlotte-g5evz_kpbekzf | Lukas Graham | refresh (applied) | 8286281 | https://www.ticketliquidator.com/tickets/8286281/Lukas-Graham-tickets-Sun-Mar-7-2027-The-Fillmore-Charlotte | - |
| tm-lukas-graham-2027-silver-spring-1a4zkfwgkdu1_zg | Lukas Graham | refresh (applied) | 8286282 | https://www.ticketliquidator.com/tickets/8286282/Lukas-Graham-tickets-Tue-Mar-9-2027-The-Fillmore-Silver-Spring | - |
| tm-lukas-graham-2027-new-york-k7vgf_kq-e_yf | Lukas Graham | refresh (applied) | 8286283 | https://www.ticketliquidator.com/tickets/8286283/Lukas-Graham-tickets-Wed-Mar-10-2027-Irving-Plaza | - |
| tm-lukas-graham-2027-boston-vv1k7z_k8xg7ihpb | Lukas Graham | refresh (applied) | 8286284 | https://www.ticketliquidator.com/tickets/8286284/Lukas-Graham-tickets-Fri-Apr-2-2027-Citizens-House-Of-Blues-Boston | - |
| tm-lukas-graham-2027-philadelphia-vv1aovpuf-zf9v5 | Lukas Graham | refresh (applied) | 8286286 | https://www.ticketliquidator.com/tickets/8286286/Lukas-Graham-tickets-Sat-Apr-3-2027-Theatre-Of-The-Living-Arts | - |
| tm-lukas-graham-2027-toronto-1f7zvpgxaoz786kf | Lukas Graham | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lukas-graham-2027-detroit-vv1afzkfwgkddfuvd | Lukas Graham | refresh (applied) | 8286288 | https://www.ticketliquidator.com/tickets/8286288/Lukas-Graham-tickets-Wed-Apr-7-2027-Saint-Andrews-Hall-Detroit | - |
| tm-lukas-graham-2027-indianapolis-vv1kv8vpuvgauq0sn | Lukas Graham | refresh (applied) | 8286290 | https://www.ticketliquidator.com/tickets/8286290/Lukas-Graham-tickets-Thu-Apr-8-2027-Egyptian-Room-At-Old-National-Centre | - |
| tm-lukas-graham-2027-minneapolis-vv11bz_kf-ovb0 | Lukas Graham | refresh (applied) | 8286292 | https://www.ticketliquidator.com/tickets/8286292/Lukas-Graham-tickets-Sat-Apr-10-2027-Uptown-Theatre-Minneapolis | - |
| tm-lukas-graham-2027-chicago-vv1a7zkfugkegdi06 | Lukas Graham | refresh (applied) | 8286294 | https://www.ticketliquidator.com/tickets/8286294/Lukas-Graham-tickets-Sun-Apr-11-2027-House-Of-Blues-Chicago | - |
| tm-passenger-2027-brussels-z698xzg2z16v-xbfos | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-milano-zg9rmiynyzd6ea | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-dublin-1avoz_8gkm9ghn7 | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-belfast-16zzkfkojzage16c | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-glasgow-g5dzz_8wyqwf1 | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-edinburgh-1adbz_8gks0vdnw | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-newcastle-upon-tyne-g5dzz_o6adefx | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-manchester-17uov0g62wjanur | Passenger | refresh (applied) | 8297868 | https://www.ticketliquidator.com/tickets/8297868/Passenger-tickets-Wed-Sep-15-2027-O2-Apollo-Manchester | - |
| tm-passenger-2027-london-1auzkf3gkd0sykm | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-exeter-g5vhz_o2o0irs | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-birmingham-g5dzz_2wg0-vu | Passenger | refresh (applied) | 8265897 | https://www.ticketliquidator.com/tickets/8265897/Passenger-tickets-Fri-Sep-24-2027-O2-Academy-Birmingham | - |
| tm-passenger-2027-brighton-g5vhz_o5oziab | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-brisbane-1avgz_8gkmdlzyi | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-st-kilda-1avgz_8gkm6pbt5 | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-sydney-16vgz_oayg7zvfp | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-john-summit-2026-brooklyn-17gzv0g65ttxsbe | John Summit | refresh (applied) | 8292934 | https://www.ticketliquidator.com/tickets/8292934/John-Summit-tickets-Sun-Nov-29-2026-Barclays-Center | - |
| tm-vnv-nation-2027-denver-z7r9jz1a7jv8m | VNV Nation | refresh (applied) | 8154218 | https://www.ticketliquidator.com/tickets/8154218/VNV-Nation-tickets-Sat-Mar-27-2027-Oriental-Theater-Denver | - |
| tm-oasis-2027-glasgow-1adfz_3gknft-og | Oasis | refresh (applied) | 8264751 | https://www.ticketliquidator.com/tickets/8264751/Oasis-tickets-Fri-May-21-2027-Celtic-Park | - |
| tm-oasis-2027-glasgow-1agzkfwgkd1ybno | Oasis | refresh (applied) | 8264752 | https://www.ticketliquidator.com/tickets/8264752/Oasis-tickets-Sun-May-23-2027-Celtic-Park | - |
| tm-oasis-2027-glasgow-1agzkfwgkd5kfpx | Oasis | refresh (applied) | 8264753 | https://www.ticketliquidator.com/tickets/8264753/Oasis-tickets-Tue-May-25-2027-Celtic-Park | - |
| tm-oasis-2027-glasgow-1agzkfwgkd5pben | Oasis | refresh (applied) | 8264754 | https://www.ticketliquidator.com/tickets/8264754/Oasis-tickets-Fri-May-28-2027-Celtic-Park | - |
| tm-oasis-2027-glasgow-1agzkfwgkdu5imb | Oasis | refresh (applied) | 8264755 | https://www.ticketliquidator.com/tickets/8264755/Oasis-tickets-Sat-May-29-2027-Celtic-Park | - |
| tm-oasis-2027-manchester-g5dzz_3lwzpdp | Oasis | refresh (applied) | 8264756 | https://www.ticketliquidator.com/tickets/8264756/Oasis-tickets-Fri-Jun-4-2027-Etihad-Stadium | - |
| tm-oasis-2027-manchester-g5dzz_3lmyj87 | Oasis | refresh (applied) | 8264757 | https://www.ticketliquidator.com/tickets/8264757/Oasis-tickets-Sun-Jun-6-2027-Etihad-Stadium | - |
| tm-oasis-2027-manchester-g5dzz_3lbuu4c | Oasis | refresh (applied) | 8264758 | https://www.ticketliquidator.com/tickets/8264758/Oasis-tickets-Tue-Jun-8-2027-Etihad-Stadium | - |
| tm-oasis-2027-manchester-g5dzz_3lwcjqy | Oasis | refresh (applied) | 8264759 | https://www.ticketliquidator.com/tickets/8264759/Oasis-tickets-Fri-Jun-11-2027-Etihad-Stadium | - |
| tm-oasis-2027-manchester-g5dzz_3lxmu-j | Oasis | refresh (applied) | 8264760 | https://www.ticketliquidator.com/tickets/8264760/Oasis-tickets-Sat-Jun-12-2027-Etihad-Stadium | - |
| tm-oasis-2027-manchester-g5dzz_3nq9ecb | Oasis | refresh (applied) | 8264761 | https://www.ticketliquidator.com/tickets/8264761/Oasis-tickets-Tue-Jun-15-2027-Etihad-Stadium | - |
| tm-oasis-2027-manchester-g5dzz_3lv67ao | Oasis | refresh (applied) | 8264762 | https://www.ticketliquidator.com/tickets/8264762/Oasis-tickets-Fri-Jun-18-2027-Etihad-Stadium | - |
| tm-oasis-2027-manchester-g5dzz_3l--ppl | Oasis | refresh (applied) | 8264763 | https://www.ticketliquidator.com/tickets/8264763/Oasis-tickets-Sat-Jun-19-2027-Etihad-Stadium | - |
| tm-oasis-2027-manchester-g5dzz_3l0pglg | Oasis | refresh (applied) | 8264764 | https://www.ticketliquidator.com/tickets/8264764/Oasis-tickets-Tue-Jun-22-2027-Etihad-Stadium | - |
| tm-oasis-2027-manchester-g5dzz_3ljog0t | Oasis | refresh (applied) | 8264765 | https://www.ticketliquidator.com/tickets/8264765/Oasis-tickets-Fri-Jun-25-2027-Etihad-Stadium | - |
| tm-oasis-2027-manchester-g5dzz_3lnpprv | Oasis | refresh (applied) | 8264766 | https://www.ticketliquidator.com/tickets/8264766/Oasis-tickets-Sat-Jun-26-2027-Etihad-Stadium | - |
| tm-oasis-2027-co-meath-1avoz_3gkrnpmuo | Oasis | refresh (applied) | 8264778 | https://www.ticketliquidator.com/tickets/8264778/Oasis-tickets-Sat-Sep-4-2027-Slane-Castle | - |
| tm-oasis-2027-co-meath-1avoz_3gkrn9ru4 | Oasis | refresh (applied) | 8264779 | https://www.ticketliquidator.com/tickets/8264779/Oasis-tickets-Sun-Sep-5-2027-Slane-Castle | - |
| tm-oasis-2027-stevenage-1adjz_3gklfny3e | Oasis | refresh (applied) | 8264780 | https://www.ticketliquidator.com/tickets/8264780/Oasis-tickets-Sat-Sep-11-2027-Knebworth-Park | - |
| tm-oasis-2027-stevenage-1adjz_3gkrrmy7n | Oasis | refresh (applied) | 8264781 | https://www.ticketliquidator.com/tickets/8264781/Oasis-tickets-Sun-Sep-12-2027-Knebworth-Park | - |
| tm-oasis-2027-stevenage-1adjz_3gkrnjt4_ | Oasis | refresh (applied) | 8264782 | https://www.ticketliquidator.com/tickets/8264782/Oasis-tickets-Sat-Sep-18-2027-Knebworth-Park | - |
| tm-oasis-2027-stevenage-1adjz_3gkreiyj0 | Oasis | refresh (applied) | 8264783 | https://www.ticketliquidator.com/tickets/8264783/Oasis-tickets-Sun-Sep-19-2027-Knebworth-Park | - |
| tm-oasis-2027-stevenage-1adjz_3gkrs3n_k | Oasis | refresh (applied) | 8284873 | https://www.ticketliquidator.com/tickets/8284873/Oasis-tickets-Sat-Sep-25-2027-Knebworth-Park | - |
| tm-oasis-2027-stevenage-1adjz_3gkrz1qva | Oasis | refresh (applied) | 8284874 | https://www.ticketliquidator.com/tickets/8284874/Oasis-tickets-Sun-Sep-26-2027-Knebworth-Park | - |
| tm-atmosphere-2027-salt-lake-city-g5vzz_kl2vywj | Atmosphere | refresh (applied) | 8277984 | https://www.ticketliquidator.com/tickets/8277984/Atmosphere-tickets-Sat-Jan-30-2027-The-Depot-Salt-Lake-City | - |
| tm-oasis-2027-barcelona-z698xz2qz1kosq3xa | Oasis | refresh (applied) | 8264769 | https://www.ticketliquidator.com/tickets/8264769/Oasis-tickets-Sat-Jul-10-2027-Estadi-Olimpico-Lluis-Companys | - |
| tm-oasis-2027-barcelona-z698xz2qz1kvz7a4m | Oasis | correct (applied) | 8293289 | https://www.ticketliquidator.com/tickets/8293289/Oasis-tickets-Sun-Jul-11-2027-Estadi-Olimpico-Lluis-Companys | - |
| tm-oasis-2027-amsterdam-z698xzbpz16vrdz-8b | Oasis | refresh (applied) | 8264772 | https://www.ticketliquidator.com/tickets/8264772/Oasis-tickets-Fri-Jul-16-2027-Johan-Cruijff-Arena | - |
| tm-oasis-2027-amsterdam-z698xzbpz1kodp337 | Oasis | refresh (applied) | 8264773 | https://www.ticketliquidator.com/tickets/8264773/Oasis-tickets-Sat-Jul-17-2027-Johan-Cruijff-Arena | - |
| tm-sienna-spiro-2027-west-melbourne-177yv0g6gecffyz | Sienna Spiro | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sienna-spiro-2027-west-melbourne-177yv0g6gmjpde2 | Sienna Spiro | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sienna-spiro-2027-brisbane-177yv0g6gjxxnip | Sienna Spiro | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sienna-spiro-2027-edinburgh-g5dzz_g3xlvct | Sienna Spiro | refresh (applied) | 8056624 | https://www.ticketliquidator.com/tickets/8056624/Sienna-Spiro-tickets-Mon-Feb-22-2027-Edinburgh-Corn-Exchange | - |
| tm-sienna-spiro-2027-edinburgh-g5dzz_g3jtvqc | Sienna Spiro | refresh (applied) | 8058895 | https://www.ticketliquidator.com/tickets/8058895/Sienna-Spiro-tickets-Tue-Feb-23-2027-Edinburgh-Corn-Exchange | - |
| tm-sienna-spiro-2027-manchester-17uov0g6ghevqqt | Sienna Spiro | refresh (applied) | 8090734 | https://www.ticketliquidator.com/tickets/8090734/Sienna-Spiro-tickets-Mon-Mar-1-2027-O2-Apollo-Manchester | - |
| tm-sienna-spiro-2027-manchester-17uov0g6gnyji_e | Sienna Spiro | refresh (applied) | 8057458 | https://www.ticketliquidator.com/tickets/8057458/Sienna-Spiro-tickets-Tue-Mar-2-2027-O2-Apollo-Manchester | - |
| tm-sienna-spiro-2027-forest-brussels-z698xzg2z1kk3-m-y | Sienna Spiro | refresh (applied) | 8090737 | https://www.ticketliquidator.com/tickets/8090737/Sienna-Spiro-tickets-Tue-Mar-16-2027-Vorst-Nationaal | - |
| tm-sienna-spiro-2027-berlin-z698xzc2z16v0n7t_u | Sienna Spiro | refresh (applied) | 8057456 | https://www.ticketliquidator.com/tickets/8057456/Sienna-Spiro-tickets-Wed-Mar-24-2027-Tempodrom | - |
| tm-sienna-spiro-2027-milano-zg9rmiynyzef6a | Sienna Spiro | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sienna-spiro-2027-barcelona-z698xz2qz16evg76uk | Sienna Spiro | refresh (applied) | 8058056 | https://www.ticketliquidator.com/tickets/8058056/Sienna-Spiro-tickets-Mon-Mar-29-2027-Main-Hall-At-Parallel-62 | - |
| tm-sienna-spiro-2027-madrid-z698xz2qz16v4sjdu3 | Sienna Spiro | refresh (applied) | 8058057 | https://www.ticketliquidator.com/tickets/8058057/Sienna-Spiro-tickets-Tue-Mar-30-2027-La-Riviera-Spain | - |
| tm-sienna-spiro-2027-dublin-17kzv0g6gpq41un | Sienna Spiro | refresh (applied) | 8365894 | https://www.ticketliquidator.com/tickets/8365894/Sienna-Spiro-tickets-Tue-Jun-15-2027-Fairview-Park | - |
| tm-malcolm-todd-2027-stockholm-z698xzq2z1afq0g8 | Malcolm Todd | none | - | - | no qualifying listing (complete catalog checked) |
| tm-malcolm-todd-2027-forest-brussels-z698xzg2z1a3rzza | Malcolm Todd | refresh (applied) | 8326652 | https://www.ticketliquidator.com/tickets/8326652/Malcolm-Todd-tickets-Thu-Feb-18-2027-Vorst-Nationaal | - |
| tm-malcolm-todd-2027-dublin-1kkzvpfyga5vo0x | Malcolm Todd | none | - | - | no qualifying listing (complete catalog checked) |
| tm-malcolm-todd-2027-glasgow-1adbz_3gknizpvr | Malcolm Todd | refresh (applied) | 8388030 | https://www.ticketliquidator.com/tickets/8388030/Malcolm-Todd-tickets-Thu-Feb-25-2027-Barrowland | - |
| tm-malcolm-todd-2027-birmingham-g5dzz_3nh3wrn | Malcolm Todd | refresh (applied) | 8265887 | https://www.ticketliquidator.com/tickets/8265887/Malcolm-Todd-tickets-Sat-Feb-27-2027-O2-Academy-Birmingham | - |
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
| tm-lizzy-mcalpine-2027-houston-g5diz_kko6pz2 | Lizzy McAlpine | refresh (applied) | 8287503 | https://www.ticketliquidator.com/tickets/8287503/Lizzy-McAlpine-tickets-Sat-May-1-2027-713-Music-Hall | - |
| tm-lizzy-mcalpine-2027-durham-g5evz_klljeql | Lizzy McAlpine | refresh (applied) | 8287504 | https://www.ticketliquidator.com/tickets/8287504/Lizzy-McAlpine-tickets-Tue-May-4-2027-Durham-Performing-Arts-Center | - |
| tm-lizzy-mcalpine-2027-detroit-vv1afzkfmgkdd0jd5 | Lizzy McAlpine | refresh (applied) | 8287505 | https://www.ticketliquidator.com/tickets/8287505/Lizzy-McAlpine-tickets-Fri-May-7-2027-Fox-Theatre-Detroit | - |
| tm-lizzy-mcalpine-2027-indianapolis-vv1aazkfggkeu7rbe | Lizzy McAlpine | refresh (applied) | 8287506 | https://www.ticketliquidator.com/tickets/8287506/Lizzy-McAlpine-tickets-Sun-May-9-2027-Clowes-Memorial-Hall | - |
| tm-lizzy-mcalpine-2027-minneapolis-vv1akzkfsgkdlvc7g | Lizzy McAlpine | refresh (applied) | 8287507 | https://www.ticketliquidator.com/tickets/8287507/Lizzy-McAlpine-tickets-Wed-May-12-2027-State-Theatre-MN | - |
| tm-lizzy-mcalpine-2027-saint-louis-vv1kvovpu_ga2r6bf | Lizzy McAlpine | refresh (applied) | 8287509 | https://www.ticketliquidator.com/tickets/8287509/Lizzy-McAlpine-tickets-Sat-May-15-2027-Stifel-Theatre | - |
| tm-lizzy-mcalpine-2027-nashville-g5viz_kqsm0og | Lizzy McAlpine | refresh (applied) | 8287510 | https://www.ticketliquidator.com/tickets/8287510/Lizzy-McAlpine-tickets-Wed-Jun-16-2027-Bridgestone-Arena | - |
| tm-lizzy-mcalpine-2027-philadelphia-1ayzkfsgkdubyxp | Lizzy McAlpine | refresh (applied) | 8287512 | https://www.ticketliquidator.com/tickets/8287512/Lizzy-McAlpine-tickets-Fri-Jun-18-2027-Xfinity-Mobile-Arena | - |
| tm-lizzy-mcalpine-2027-boston-vv1a8vpuzga1bapr | Lizzy McAlpine | refresh (applied) | 8287513 | https://www.ticketliquidator.com/tickets/8287513/Lizzy-McAlpine-tickets-Sun-Jun-20-2027-Agganis-Arena | - |
| tm-lizzy-mcalpine-2027-new-york-g5diz_kr8e3se | Lizzy McAlpine | refresh (applied) | 8287514 | https://www.ticketliquidator.com/tickets/8287514/Lizzy-McAlpine-tickets-Thu-Jun-24-2027-Madison-Square-Garden | - |
| tm-lizzy-mcalpine-2027-columbia-1a4zkfmgkejxp8r | Lizzy McAlpine | refresh (applied) | 8287516 | https://www.ticketliquidator.com/tickets/8287516/Lizzy-McAlpine-tickets-Fri-Jun-25-2027-Merriweather-Post-Pavilion | - |
| tm-lizzy-mcalpine-2027-toronto-1a8zkfwgke-nzw8 | Lizzy McAlpine | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lizzy-mcalpine-2027-chicago-vv1a7zkfggkenm_sz | Lizzy McAlpine | refresh (applied) | 8287517 | https://www.ticketliquidator.com/tickets/8287517/Lizzy-McAlpine-tickets-Tue-Jun-29-2027-United-Center | - |
| tm-lizzy-mcalpine-2027-austin-g5diz_k1qabc1 | Lizzy McAlpine | refresh (applied) | 8287518 | https://www.ticketliquidator.com/tickets/8287518/Lizzy-McAlpine-tickets-Fri-Jul-2-2027-Moody-Center-ATX | - |
| tm-lizzy-mcalpine-2027-san-diego-vvg1iz_k_8qjmi | Lizzy McAlpine | refresh (applied) | 8287519 | https://www.ticketliquidator.com/tickets/8287519/Lizzy-McAlpine-tickets-Fri-Jul-9-2027-The-Rady-Shell-at-Jacobs-Park | - |
| tm-lizzy-mcalpine-2027-inglewood-vv1aazkfugkdnwr6l | Lizzy McAlpine | refresh (applied) | 8287520 | https://www.ticketliquidator.com/tickets/8287520/Lizzy-McAlpine-tickets-Sat-Jul-10-2027-The-Kia-Forum | - |
| tm-lizzy-mcalpine-2027-san-francisco-g5vyz_k6tphz4 | Lizzy McAlpine | refresh (applied) | 8287521 | https://www.ticketliquidator.com/tickets/8287521/Lizzy-McAlpine-tickets-Tue-Jul-13-2027-Chase-Center | - |
| tm-lizzy-mcalpine-2027-portland-vvg1hz_kpe4n79 | Lizzy McAlpine | refresh (applied) | 8287522 | https://www.ticketliquidator.com/tickets/8287522/Lizzy-McAlpine-tickets-Thu-Jul-15-2027-Moda-Center-at-the-Rose-Quarter | - |
| tm-lizzy-mcalpine-2027-seattle-vvg1hz_kf6i_hn | Lizzy McAlpine | refresh (applied) | 8287523 | https://www.ticketliquidator.com/tickets/8287523/Lizzy-McAlpine-tickets-Sat-Jul-17-2027-Climate-Pledge-Arena | - |
| tm-the-interrupters-2027-tempe-16v0z_3j3g7wujq | The Interrupters | refresh (applied) | 8284358 | https://www.ticketliquidator.com/tickets/8284358/The-Interrupters-tickets-Fri-Mar-19-2027-Marquee-Theatre-AZ | - |
| tm-the-interrupters-2027-dallas-vvg1yz_k69fczg | The Interrupters | refresh (applied) | 8284360 | https://www.ticketliquidator.com/tickets/8284360/The-Interrupters-tickets-Tue-Mar-23-2027-House-Of-Blues-Dallas | - |
| tm-the-interrupters-2027-houston-g5diz_3r-jkhd | The Interrupters | refresh (applied) | 8284361 | https://www.ticketliquidator.com/tickets/8284361/The-Interrupters-tickets-Wed-Mar-24-2027-House-Of-Blues-Houston | - |
| tm-the-interrupters-2027-st-petersburg-vvg1vz_3xxt6_9 | The Interrupters | refresh (applied) | 8284362 | https://www.ticketliquidator.com/tickets/8284362/The-Interrupters-tickets-Fri-Mar-26-2027-Jannus-Live | - |
| tm-the-interrupters-2027-ft-lauderdale-vvg1vz_3bjcjr0 | The Interrupters | refresh (applied) | 8284363 | https://www.ticketliquidator.com/tickets/8284363/The-Interrupters-tickets-Sat-Mar-27-2027-Revolution-Live | - |
| tm-the-interrupters-2027-orlando-1aefz_3gkdwdk5a | The Interrupters | refresh (applied) | 8284364 | https://www.ticketliquidator.com/tickets/8284364/The-Interrupters-tickets-Sun-Mar-28-2027-House-Of-Blues-Orlando | - |
| tm-the-interrupters-2027-atlanta-vvg1zz_3dh5hjb | The Interrupters | refresh (applied) | 8284365 | https://www.ticketliquidator.com/tickets/8284365/The-Interrupters-tickets-Tue-Mar-30-2027-Heaven-Stage-at-Masquerade-GA | - |
| tm-the-interrupters-2027-silver-spring-1avfz_3gkbss6tr | The Interrupters | refresh (applied) | 8284367 | https://www.ticketliquidator.com/tickets/8284367/The-Interrupters-tickets-Fri-Apr-2-2027-The-Fillmore-Silver-Spring | - |
| tm-the-interrupters-2027-brooklyn-k7vgf_k6y5uwc | The Interrupters | refresh (applied) | 8284355 | https://www.ticketliquidator.com/tickets/8284355/The-Interrupters-tickets-Sun-Apr-4-2027-Brooklyn-Paramount | - |
| tm-the-interrupters-2027-boston-vv1avzkftgkexzmrt | The Interrupters | refresh (applied) | 8284368 | https://www.ticketliquidator.com/tickets/8284368/The-Interrupters-tickets-Wed-Apr-7-2027-Citizens-House-Of-Blues-Boston | - |
| tm-the-interrupters-2027-montreal-1ad7z_3gkmrxjga | The Interrupters | refresh (applied) | 8284369 | https://www.ticketliquidator.com/tickets/8284369/The-Interrupters-tickets-Fri-Apr-9-2027-MTelus | - |
| tm-the-interrupters-2027-toronto-1a8zkfsgkdrk_-b | The Interrupters | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-interrupters-2027-london-1avzz_3gkmfyun4 | The Interrupters | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-interrupters-2027-cleveland-vv17fz_3gklukmo_ | The Interrupters | refresh (applied) | 8284372 | https://www.ticketliquidator.com/tickets/8284372/The-Interrupters-tickets-Tue-Apr-13-2027-House-Of-Blues-Cleveland | - |
| tm-the-interrupters-2027-mckees-rocks-1avbz_3gktimcny | The Interrupters | refresh (applied) | 8284373 | https://www.ticketliquidator.com/tickets/8284373/The-Interrupters-tickets-Wed-Apr-14-2027-Roxian-Theatre | - |
| tm-the-interrupters-2027-detroit-vv1afzkfxgkesf0dw | The Interrupters | refresh (applied) | 8284374 | https://www.ticketliquidator.com/tickets/8284374/The-Interrupters-tickets-Fri-Apr-16-2027-The-Fillmore-Detroit | - |
| tm-the-interrupters-2027-chicago-vv178z_ogkmzy5fz | The Interrupters | refresh (applied) | 8284376 | https://www.ticketliquidator.com/tickets/8284376/The-Interrupters-tickets-Sat-Apr-17-2027-House-Of-Blues-Chicago | - |
| tm-the-interrupters-2027-saint-louis-vv17bz_3gkdzh1rc | The Interrupters | refresh (applied) | 8284377 | https://www.ticketliquidator.com/tickets/8284377/The-Interrupters-tickets-Sun-Apr-18-2027-The-Pageant | - |
| tm-the-interrupters-2027-minneapolis-vv17bz_3gkbzsymo | The Interrupters | refresh (applied) | 8284379 | https://www.ticketliquidator.com/tickets/8284379/The-Interrupters-tickets-Wed-Apr-21-2027-The-Fillmore-Minneapolis-Presented-by-Affinity-Plus | - |
| tm-the-interrupters-2027-salt-lake-city-g5vzz_3nsybuv | The Interrupters | refresh (applied) | 8284381 | https://www.ticketliquidator.com/tickets/8284381/The-Interrupters-tickets-Sat-Apr-24-2027-The-Union-Event-Center | - |
| tm-the-interrupters-2027-los-angeles-vv1ke8vpgbgautgrg | The Interrupters | refresh (applied) | 8284386 | https://www.ticketliquidator.com/tickets/8284386/The-Interrupters-tickets-Fri-Apr-30-2027-The-Wiltern | - |
| tm-the-interrupters-2027-anaheim-vv1fe8vpg33pz72fk7 | The Interrupters | refresh (applied) | 8284387 | https://www.ticketliquidator.com/tickets/8284387/The-Interrupters-tickets-Sun-May-2-2027-House-Of-Blues-Anaheim | - |
| tm-dinosaur-jr-2027-brooklyn-z7r9jz1aavk1a | Dinosaur Jr. | refresh (applied) | 8354481 | https://www.ticketliquidator.com/tickets/8354481/Dinosaur-Jr-tickets-Thu-Feb-11-2027-Brooklyn-Steel | - |
| tm-dinosaur-jr-2027-brooklyn-z7r9jz1aavk1f | Dinosaur Jr. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dinosaur-jr-2027-silver-spring-164zkf4pnzau65fa | Dinosaur Jr. | refresh (applied) | 8244704 | https://www.ticketliquidator.com/tickets/8244704/Dinosaur-Jr-tickets-Tue-Feb-16-2027-The-Fillmore-Silver-Spring | - |
| tm-dinosaur-jr-2027-orlando-z7r9jz1aav8-u | Dinosaur Jr. | refresh (applied) | 8256068 | https://www.ticketliquidator.com/tickets/8256068/Dinosaur-Jr-tickets-Tue-Feb-23-2027-The-Plaza-Live | - |
| tm-dinosaur-jr-2027-athens-z7r9jz1aavk1o | Dinosaur Jr. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dinosaur-jr-2027-nashville-g5viz_o987bgu | Dinosaur Jr. | refresh (applied) | 8239819 | https://www.ticketliquidator.com/tickets/8239819/Dinosaur-Jr-tickets-Fri-Feb-26-2027-Brooklyn-Bowl-Nashville | - |
| tm-dinosaur-jr-2027-cincinnati-1kaovpaogacpo0v | Dinosaur Jr. | refresh (applied) | 8240020 | https://www.ticketliquidator.com/tickets/8240020/Dinosaur-Jr-tickets-Sat-Feb-27-2027-Bogarts | - |
| tm-dinosaur-jr-2027-minneapolis-z7r9jz1aav8op | Dinosaur Jr. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dinosaur-jr-2027-chicago-z7r9jz1aaedov | Dinosaur Jr. | refresh (applied) | 8245942 | https://www.ticketliquidator.com/tickets/8245942/Dinosaur-Jr-tickets-Fri-Mar-5-2027-Vic-Theatre | - |
| tm-dinosaur-jr-2027-toronto-1a8zkf4gkdtrlfj | Dinosaur Jr. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dinosaur-jr-2027-boston-vv16vzkf4vvza5c5kf | Dinosaur Jr. | refresh (applied) | 8239627 | https://www.ticketliquidator.com/tickets/8239627/Dinosaur-Jr-tickets-Sat-Mar-13-2027-Citizens-House-Of-Blues-Boston | - |
| tm-oasis-2027-foxborough-vv1avzkftgkehnj-e | Oasis | refresh (applied) | 8264685 | https://www.ticketliquidator.com/tickets/8264685/Oasis-tickets-Tue-Aug-10-2027-Gillette-Stadium | - |
| tm-oasis-2027-foxborough-vv1avzkfggke0ghpz | Oasis | refresh (applied) | 8264686 | https://www.ticketliquidator.com/tickets/8264686/Oasis-tickets-Fri-Aug-13-2027-Gillette-Stadium | - |
| tm-oasis-2027-foxborough-vv1avzkfggke08hpi | Oasis | refresh (applied) | 8264687 | https://www.ticketliquidator.com/tickets/8264687/Oasis-tickets-Sat-Aug-14-2027-Gillette-Stadium | - |
| tm-oasis-2027-las-vegas-1kayvp7_ga25ajz | Oasis | refresh (applied) | 8264688 | https://www.ticketliquidator.com/tickets/8264688/Oasis-tickets-Fri-Aug-20-2027-Allegiant-Stadium | - |
| tm-oasis-2027-las-vegas-1kayvp7_ga2gaje | Oasis | refresh (applied) | 8264689 | https://www.ticketliquidator.com/tickets/8264689/Oasis-tickets-Sat-Aug-21-2027-Allegiant-Stadium | - |
| tm-oasis-2027-las-vegas-1kayvp7_ga2u_jk | Oasis | refresh (applied) | 8264691 | https://www.ticketliquidator.com/tickets/8264691/Oasis-tickets-Tue-Aug-24-2027-Allegiant-Stadium | - |
| tm-harry-styles-2027-glendale-z7r9jz1aavp4_ | Harry Styles | refresh (applied) | 8257669 | https://www.ticketliquidator.com/tickets/8257669/Harry-Styles-tickets-Fri-Apr-2-2027-State-Farm-Stadium | - |
| tm-harry-styles-2027-glendale-z7r9jz1aavp4b | Harry Styles | refresh (applied) | 8257670 | https://www.ticketliquidator.com/tickets/8257670/Harry-Styles-tickets-Sat-Apr-3-2027-State-Farm-Stadium | - |
| tm-gracie-abrams-2027-glasgow-17uov0g65lvesak | Gracie Abrams | refresh (applied) | 8002348 | https://www.ticketliquidator.com/tickets/8002348/Gracie-Abrams-tickets-Tue-Apr-27-2027-OVO-Hydro | - |
| tm-gracie-abrams-2027-glasgow-17uov0g65vd1fhq | Gracie Abrams | refresh (applied) | 8018186 | https://www.ticketliquidator.com/tickets/8018186/Gracie-Abrams-tickets-Wed-Apr-28-2027-OVO-Hydro | - |
| tm-niall-horan-2027-hartford-z7r9jz1a709uz | Niall Horan | refresh (applied) | 7954214 | https://www.ticketliquidator.com/tickets/7954214/Niall-Horan-tickets-Tue-Apr-13-2027-PeoplesBank-Arena | - |
| tm-metallica-2027-las-vegas-1a9zko-gkepzm6y | Metallica | refresh (applied) | 7785091 | https://www.ticketliquidator.com/tickets/7785091/Metallica-tickets-Sat-Feb-27-2027-Sphere | - |
| tm-metallica-2027-las-vegas-1a9zko-gke0butu | Metallica | correct (applied) | 7785868 | https://www.ticketliquidator.com/tickets/7785868/Metallica-tickets-Thu-Mar-4-2027-Sphere | - |
| tm-metallica-2027-las-vegas-1a9zko-gkepzm6w | Metallica | refresh (applied) | 7785869 | https://www.ticketliquidator.com/tickets/7785869/Metallica-tickets-Sat-Mar-6-2027-Sphere | - |
| tm-metallica-2027-las-vegas-1a9zko-gke0bqtz | Metallica | correct (applied) | 7785870 | https://www.ticketliquidator.com/tickets/7785870/Metallica-tickets-Thu-Mar-11-2027-Sphere | - |
| tm-metallica-2027-raleigh-z7r9jz1aavwaj | Metallica | refresh (applied) | 8268626 | https://www.ticketliquidator.com/tickets/8268626/Metallica-tickets-Wed-Jun-2-2027-Carter-Finley-Stadium | - |
| tm-metallica-2027-madison-z7r9jz1aavw0o | Metallica | refresh (applied) | 8268634 | https://www.ticketliquidator.com/tickets/8268634/Metallica-tickets-Sat-Jun-12-2027-Camp-Randall-Stadium | - |
| tm-five-finger-death-punch-2027-glasgow-1adbz_agkuc9oes | Five Finger Death Punch | refresh (applied) | 8090424 | https://www.ticketliquidator.com/tickets/8090424/Five-Finger-Death-Punch-tickets-Sun-Jan-17-2027-OVO-Hydro | - |
| tm-blue-october-2026-san-antonio-z7r9jz1a7-vz7 | Blue October | refresh (applied) | 7827982 | https://www.ticketliquidator.com/tickets/7827982/Blue-October-tickets-Sat-Dec-12-2026-Boeing-Center-at-Tech-Port | - |
| tm-blue-october-2027-albuquerque-z7r9jz1a70pgn | Blue October | refresh (applied) | 7957262 | https://www.ticketliquidator.com/tickets/7957262/Blue-October-tickets-Thu-Feb-4-2027-Revel-Entertainment-Center | - |
| tm-trivium-2026-san-antonio-z7r9jz1aazdco | Trivium | refresh (applied) | 8151010 | https://www.ticketliquidator.com/tickets/8151010/Trivium-tickets-Fri-Nov-27-2026-Boeing-Center-at-Tech-Port | - |
| tm-trivium-2026-las-vegas-z7r9jz1a7j_4j | Trivium | refresh (applied) | 8151259 | https://www.ticketliquidator.com/tickets/8151259/Trivium-tickets-Thu-Dec-3-2026-Pearl-Concert-Theater-At-Palms-Casino-Resort | - |
| tm-beartooth-2026-austin-z7r9jz1a70i8v | Beartooth | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Beartooth, Don Broco, Magnolia Park & Windwaker; text: Beartooth, Don Broco, Magnolia Park & Windwaker Beartooth, Don Broco, Magnolia Park & Windwaker /tickets/7980232/Beartooth-tickets-Wed-Dec-9) |
| tm-beartooth-2026-albuquerque-z7r9jz1a70i3o | Beartooth | refresh (applied) | 7980238 | https://www.ticketliquidator.com/tickets/7980238/Beartooth-tickets-Tue-Dec-15-2026-Revel-Entertainment-Center | - |
| tm-polyphia-2027-raleigh-g5evz_oemqprp | Polyphia | refresh (applied) | 8056818 | https://www.ticketliquidator.com/tickets/8056818/Polyphia-tickets-Wed-Mar-10-2027-The-Ritz-Raleigh | - |
| tm-stella-lefty-2027-austin-z7r9jz1aav7f6 | Stella Lefty | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Stella Lefty; text: Stella Lefty Stella Lefty /tickets/8231220/Stella-Lefty-tickets-Sun-Jan-31-2027-ACL-Live-At-The-Moody-Theater Stella Lefty Stella Lefty ACL ) |
| tm-stella-lefty-2027-nashville-z7r9jz1aav7ff | Stella Lefty | refresh (applied) | 8231300 | https://www.ticketliquidator.com/tickets/8231300/Stella-Lefty-tickets-Wed-Feb-17-2027-Ryman-Auditorium | - |
| tm-stella-lefty-2027-nashville-z7r9jz1aavffx | Stella Lefty | refresh (applied) | 8237688 | https://www.ticketliquidator.com/tickets/8237688/Stella-Lefty-tickets-Thu-Feb-18-2027-Ryman-Auditorium | - |
| tm-yuridia-2027-sugar-land-z7r9jz1aav-_t | Yuridia | refresh (applied) | 8252910 | https://www.ticketliquidator.com/tickets/8252910/Yuridia-tickets-Thu-Mar-11-2027-Smart-Financial-Centre | - |
| tm-yuridia-2027-edinburg-z7r9jz1aav-_y | Yuridia | refresh (applied) | 8252916 | https://www.ticketliquidator.com/tickets/8252916/Yuridia-tickets-Fri-Mar-19-2027-Bert-Ogden-Arena | - |
| tm-yuridia-2027-brooklyn-z7r9jz1aav-_s | Yuridia | refresh (applied) | 8252919 | https://www.ticketliquidator.com/tickets/8252919/Yuridia-tickets-Sat-Mar-27-2027-Kings-Theatre-NY | - |
| tm-hans-zimmer-2027-hartford-z7r9jz1aavvqk | Hans Zimmer | refresh (applied) | 8271018 | https://www.ticketliquidator.com/tickets/8271018/Hans-Zimmer-tickets-Wed-Feb-17-2027-PeoplesBank-Arena | - |
| tm-hans-zimmer-2027-kansas-city-z7r9jz1aavvq6 | Hans Zimmer | refresh (applied) | 8271016 | https://www.ticketliquidator.com/tickets/8271016/Hans-Zimmer-tickets-Fri-Mar-19-2027-T-Mobile-Center | - |
| tm-hans-zimmer-2027-oklahoma-city-z7r9jz1aavvqf | Hans Zimmer | refresh (applied) | 8271014 | https://www.ticketliquidator.com/tickets/8271014/Hans-Zimmer-tickets-Sun-Mar-21-2027-Paycom-Center | - |
| tm-hans-zimmer-2027-salt-lake-city-z7r9jz1aavvqa | Hans Zimmer | refresh (applied) | 8285031 | https://www.ticketliquidator.com/tickets/8285031/Hans-Zimmer-tickets-Sat-Mar-27-2027-Delta-Center | - |
| tm-hans-zimmer-2027-los-angeles-z7r9jz1aavvq8 | Hans Zimmer | refresh (applied) | 8271012 | https://www.ticketliquidator.com/tickets/8271012/Hans-Zimmer-tickets-Thu-Apr-1-2027-Cryptocom-Arena | - |
| tm-trans-siberian-orchestra-2026-las-vegas-z7r9jz1aavnzs | Trans-Siberian Orchestra | refresh (applied) | 8255067 | https://www.ticketliquidator.com/tickets/8255067/Trans-Siberian-Orchestra-tickets-Fri-Dec-4-2026-Michelob-ULTRA-Arena-At-Mandalay-Bay | - |
| tm-death-cab-for-cutie-2027-atlanta-z7r9jz1aavufx | Death Cab for Cutie | refresh (applied) | 8271401 | https://www.ticketliquidator.com/tickets/8271401/Death-Cab-for-Cutie-tickets-Sun-Mar-14-2027-The-Eastern-GA | - |
| tm-death-cab-for-cutie-2027-atlanta-z7r9jz1aavuf- | Death Cab for Cutie | refresh (applied) | 8271402 | https://www.ticketliquidator.com/tickets/8271402/Death-Cab-for-Cutie-tickets-Mon-Mar-15-2027-The-Eastern-GA | - |
| tm-death-cab-for-cutie-2027-saint-augustine-z7r9jz1aavgpy | Death Cab for Cutie | refresh (applied) | 8271403 | https://www.ticketliquidator.com/tickets/8271403/Death-Cab-for-Cutie-tickets-Wed-Mar-17-2027-St-Augustine-Amphitheatre | - |
| tm-death-cab-for-cutie-2027-new-orleans-z7r9jz1aavuv8 | Death Cab for Cutie | refresh (applied) | 8271406 | https://www.ticketliquidator.com/tickets/8271406/Death-Cab-for-Cutie-tickets-Fri-Mar-26-2027-Saenger-Theatre-New-Orleans | - |
| tm-the-psychedelic-furs-2027-nashville-z7r9jz1aavpq_ | The Psychedelic Furs | refresh (applied) | 8266292 | https://www.ticketliquidator.com/tickets/8266292/The-Psychedelic-Furs-tickets-Fri-Apr-2-2027-Ryman-Auditorium | - |
| tm-atmosphere-2027-green-bay-z7r9jz1aavz-e | Atmosphere | refresh (applied) | 8277979 | https://www.ticketliquidator.com/tickets/8277979/Atmosphere-tickets-Thu-Jan-14-2027-EPIC-Event-Center-WI | - |
| tm-atmosphere-2027-west-des-moines-z7r9jz1aaezfw | Atmosphere | refresh (applied) | 8277957 | https://www.ticketliquidator.com/tickets/8277957/Atmosphere-tickets-Sat-Jan-16-2027-Val-Air-Ballroom | - |
| tm-atmosphere-2027-omaha-z7r9jz1aaez39 | Atmosphere | refresh (applied) | 8277980 | https://www.ticketliquidator.com/tickets/8277980/Atmosphere-tickets-Sun-Jan-17-2027-The-Admiral-Omaha | - |
| tm-atmosphere-2027-fort-collins-z7r9jz1aaezpv | Atmosphere | refresh (applied) | 8277981 | https://www.ticketliquidator.com/tickets/8277981/Atmosphere-tickets-Tue-Jan-19-2027-Aggie-Theatre | - |
| tm-atmosphere-2027-grand-junction-z7r9jz1aaezfe | Atmosphere | refresh (applied) | 8277982 | https://www.ticketliquidator.com/tickets/8277982/Atmosphere-tickets-Wed-Jan-20-2027-Mesa-Theater-Club | - |
| tm-atmosphere-2027-minneapolis-z7r9jz1aaez4o | Atmosphere | refresh (applied) | 8277958 | https://www.ticketliquidator.com/tickets/8277958/Atmosphere-tickets-Sun-Feb-7-2027-First-Avenue | - |
| tm-the-warning-2027-las-vegas-z7r9jz1aavtgx | The Warning | refresh (applied) | 8264654 | https://www.ticketliquidator.com/tickets/8264654/The-Warning-tickets-Sat-Apr-17-2027-Pearl-Concert-Theater-At-Palms-Casino-Resort | - |
| tm-the-warning-2027-san-antonio-z7r9jz1aavtf4 | The Warning | refresh (applied) | 8264193 | https://www.ticketliquidator.com/tickets/8264193/The-Warning-tickets-Fri-Apr-30-2027-Boeing-Center-at-Tech-Port | - |
| tm-ha-ash-2027-portland-z7r9jz1aavz-k | Ha*Ash | refresh (applied) | 8278252 | https://www.ticketliquidator.com/tickets/8278252/HaAsh-tickets-Thu-Apr-29-2027-Keller-Auditorium | - |
| tm-ha-ash-2027-highland-z7r9jz1aavz-m | Ha*Ash | refresh (applied) | 8278253 | https://www.ticketliquidator.com/tickets/8278253/HaAsh-tickets-Sat-May-1-2027-Yaamava-Theater-at-Yaamava-Resort-Casino | - |
| tm-needtobreathe-2027-omaha-1aezz_kekbozdu2k | NEEDTOBREATHE | refresh (applied) | 8290910 | https://www.ticketliquidator.com/tickets/8290910/Needtobreathe-tickets-Thu-Feb-18-2027-Steelhouse-Omaha | - |
| tm-needtobreathe-2027-waukee-1ae7z_3gktpcjjf | NEEDTOBREATHE | refresh (applied) | 8290913 | https://www.ticketliquidator.com/tickets/8290913/Needtobreathe-tickets-Fri-Feb-19-2027-Vibrant-Music-Hall | - |
| tm-needtobreathe-2027-minneapolis-vv1akzkfwgkdmqcn1 | NEEDTOBREATHE | refresh (applied) | 8290989 | https://www.ticketliquidator.com/tickets/8290989/Needtobreathe-tickets-Sat-Feb-20-2027-The-Armory-Minneapolis | - |
| tm-needtobreathe-2027-duluth-vv1kbz_kekg7rpco | NEEDTOBREATHE | refresh (applied) | 8290914 | https://www.ticketliquidator.com/tickets/8290914/Needtobreathe-tickets-Sun-Feb-21-2027-Symphony-Hall-At-DECC | - |
| tm-needtobreathe-2027-madison-vv17jz_3gktprkgd | NEEDTOBREATHE | refresh (applied) | 8290918 | https://www.ticketliquidator.com/tickets/8290918/Needtobreathe-tickets-Thu-Feb-25-2027-The-Sylvee-WI | - |
| tm-needtobreathe-2027-grand-rapids-vv1afzkfwgkd2p_kw | NEEDTOBREATHE | refresh (applied) | 8290924 | https://www.ticketliquidator.com/tickets/8290924/Needtobreathe-tickets-Fri-Feb-26-2027-GLC-Live-at-20-Monroe | - |
| tm-needtobreathe-2027-cincinnati-1kaovpgtgauok5q | NEEDTOBREATHE | refresh (applied) | 8290927 | https://www.ticketliquidator.com/tickets/8290927/Needtobreathe-tickets-Sat-Feb-27-2027-The-Andrew-J-Brady-ICON-Music-Center | - |
| tm-needtobreathe-2027-brooklyn-k7vgf_kxvnxba | NEEDTOBREATHE | refresh (applied) | 8290990 | https://www.ticketliquidator.com/tickets/8290990/Needtobreathe-tickets-Thu-Mar-4-2027-Brooklyn-Paramount | - |
| tm-needtobreathe-2027-boston-vv177z_3gkiozdvt | NEEDTOBREATHE | refresh (applied) | 8290991 | https://www.ticketliquidator.com/tickets/8290991/Needtobreathe-tickets-Fri-Mar-5-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-needtobreathe-2027-washington-1a4zkfggkdjqhau | NEEDTOBREATHE | refresh (applied) | 8290993 | https://www.ticketliquidator.com/tickets/8290993/Needtobreathe-tickets-Sat-Mar-6-2027-The-Anthem-DC | - |
| tm-needtobreathe-2027-pittsburgh-1apzkfggkd9zzsh | NEEDTOBREATHE | refresh (applied) | 8290994 | https://www.ticketliquidator.com/tickets/8290994/Needtobreathe-tickets-Sun-Mar-7-2027-Citizens-Live-at-The-Wylie | - |
| tm-needtobreathe-2027-durham-g5evz_khc4kmz | NEEDTOBREATHE | refresh (applied) | 8290955 | https://www.ticketliquidator.com/tickets/8290955/Needtobreathe-tickets-Tue-Mar-9-2027-Durham-Performing-Arts-Center | - |
| tm-needtobreathe-2027-asheville-g5evz_kd9sqw9 | NEEDTOBREATHE | refresh (applied) | 8290981 | https://www.ticketliquidator.com/tickets/8290981/Needtobreathe-tickets-Thu-Mar-11-2027-Thomas-Wolfe-Auditorium-at-Harrahs-Cherokee-Center | - |
| tm-needtobreathe-2027-chattanooga-g5viz_kepfq3l | NEEDTOBREATHE | refresh (applied) | 8290982 | https://www.ticketliquidator.com/tickets/8290982/Needtobreathe-tickets-Fri-Mar-12-2027-Soldiers-Sailors-Memorial-Auditorium | - |
| tm-needtobreathe-2027-columbia-g5evz_kkuppj_ | NEEDTOBREATHE | refresh (applied) | 8290983 | https://www.ticketliquidator.com/tickets/8290983/Needtobreathe-tickets-Sat-Mar-13-2027-Township-Auditorium | - |
| tm-needtobreathe-2027-orlando-1axzkfggkdmxefx | NEEDTOBREATHE | refresh (applied) | 8290984 | https://www.ticketliquidator.com/tickets/8290984/Needtobreathe-tickets-Sun-Mar-14-2027-Hard-Rock-Live-Orlando | - |
| tm-needtobreathe-2027-memphis-g5viz_k1t4cqs | NEEDTOBREATHE | refresh (applied) | 8290985 | https://www.ticketliquidator.com/tickets/8290985/Needtobreathe-tickets-Wed-Mar-17-2027-Satellite-Music-Hall | - |
| tm-needtobreathe-2027-memphis-g5viz_k1tpwrf | NEEDTOBREATHE | refresh (applied) | 8290986 | https://www.ticketliquidator.com/tickets/8290986/Needtobreathe-tickets-Thu-Mar-18-2027-Satellite-Music-Hall | - |
| tm-needtobreathe-2027-new-orleans-g5viz_ocxa2ai | NEEDTOBREATHE | refresh (applied) | 8290987 | https://www.ticketliquidator.com/tickets/8290987/Needtobreathe-tickets-Fri-Mar-19-2027-The-Fillmore-New-Orleans | - |
| tm-needtobreathe-2027-houston-g5diz_kkbawh- | NEEDTOBREATHE | refresh (applied) | 8290988 | https://www.ticketliquidator.com/tickets/8290988/Needtobreathe-tickets-Sat-Mar-20-2027-713-Music-Hall | - |
| tm-foy-vance-2027-brisbane-1akzkf_gkes7kkl | Foy Vance | none | - | - | no qualifying listing (complete catalog checked) |
| tm-foy-vance-2027-birmingham-1aezz_7gkwqcsov | Foy Vance | refresh (applied) | 7748047 | https://www.ticketliquidator.com/tickets/7748047/Foy-Vance-tickets-Wed-Apr-7-2027-Iron-City-Birmingham | - |
| tm-foy-vance-2027-atlanta-z7r9jz1a7--ka | Foy Vance | refresh (applied) | 7748048 | https://www.ticketliquidator.com/tickets/7748048/Foy-Vance-tickets-Thu-Apr-8-2027-Variety-Playhouse | - |
| tm-foy-vance-2027-knoxville-g5viz_7w-hjuu | Foy Vance | refresh (applied) | 7748050 | https://www.ticketliquidator.com/tickets/7748050/Foy-Vance-tickets-Sat-Apr-10-2027-Bijou-Theatre-TN | - |
| tm-foy-vance-2027-cincinnati-z7r9jz1a7-k1v | Foy Vance | refresh (applied) | 7748051 | https://www.ticketliquidator.com/tickets/7748051/Foy-Vance-tickets-Mon-Apr-12-2027-Anderson-Theater-At-Cincinnati-Memorial-Hall | - |
| tm-foy-vance-2027-saint-paul-z7r9jz1a7jfgw | Foy Vance | refresh (applied) | 7748052 | https://www.ticketliquidator.com/tickets/7748052/Foy-Vance-tickets-Thu-Apr-15-2027-Fitzgerald-Theater | - |
| tm-foy-vance-2027-toronto-1a8zkoogkd3hucs | Foy Vance | none | - | - | no qualifying listing (complete catalog checked) |
| tm-foy-vance-2027-york-z7r9jz1a7pnjx | Foy Vance | refresh (applied) | 7748060 | https://www.ticketliquidator.com/tickets/7748060/Foy-Vance-tickets-Tue-Apr-27-2027-Capitol-Theatre-at-Appell-Center-for-the-Performing-Arts | - |
| tm-foy-vance-2027-boston-vv177z_7gksjyniw | Foy Vance | refresh (applied) | 7746767 | https://www.ticketliquidator.com/tickets/7746767/Foy-Vance-tickets-Sat-May-1-2027-Wilbur-Theatre-MA | - |
| tm-the-lemonheads-2027-boston-vv177z_3gkn_hus- | The Lemonheads | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch; listing: The Lemonheads; text: The Lemonheads The Lemonheads /tickets/8266202/The-Lemonheads-tickets-Wed-Feb-10-2027-Brighton-Music-Hall-MA The Lemonheads The Lemonheads B) |
| tm-the-lemonheads-2027-brooklyn-k7vgf_3rtiqkk | The Lemonheads | refresh (applied) | 8266203 | https://www.ticketliquidator.com/tickets/8266203/The-Lemonheads-tickets-Thu-Feb-11-2027-Brooklyn-Bowl-NY | - |
| tm-the-lemonheads-2027-atlanta-vvg1zz_3rf_-sk | The Lemonheads | refresh (applied) | 8266212 | https://www.ticketliquidator.com/tickets/8266212/The-Lemonheads-tickets-Sat-Feb-20-2027-Hell-at-The-Masquerade-GA | - |
| tm-the-lemonheads-2027-houston-g5diz_3mypste | The Lemonheads | refresh (applied) | 8266214 | https://www.ticketliquidator.com/tickets/8266214/The-Lemonheads-tickets-Mon-Feb-22-2027-White-Oak-Music-Hall-Upstairs | - |
| tm-the-lemonheads-2027-los-angeles-vv1ke8vp13ga5mfmw | The Lemonheads | refresh (applied) | 8266221 | https://www.ticketliquidator.com/tickets/8266221/The-Lemonheads-tickets-Thu-Mar-4-2027-Teragram-Ballroom | - |
| tm-the-lemonheads-2027-san-francisco-g5vyz_3niolho | The Lemonheads | refresh (applied) | 8266224 | https://www.ticketliquidator.com/tickets/8266224/The-Lemonheads-tickets-Sun-Mar-7-2027-August-Hall | - |
| tm-the-lemonheads-2027-madison-vv17jz_3gkbfxvrj | The Lemonheads | refresh (applied) | 8266231 | https://www.ticketliquidator.com/tickets/8266231/The-Lemonheads-tickets-Fri-Mar-19-2027-Majestic-Theatre-Madison | - |
| tm-the-lemonheads-2027-detroit-vv17oz_3gklkn916 | The Lemonheads | refresh (applied) | 8266235 | https://www.ticketliquidator.com/tickets/8266235/The-Lemonheads-tickets-Thu-Mar-25-2027-Saint-Andrews-Hall-Detroit | - |
| tm-the-lemonheads-2027-cincinnati-1avbz_3gkmybpfp | The Lemonheads | refresh (applied) | 8266236 | https://www.ticketliquidator.com/tickets/8266236/The-Lemonheads-tickets-Fri-Mar-26-2027-Ludlow-Garage | - |
| tm-tommy-emmanuel-2026-charleston-g5evz_aboyxr9 | Tommy Emmanuel | refresh (applied) | 7939252 | https://www.ticketliquidator.com/tickets/7939252/Tommy-Emmanuel-tickets-Thu-Dec-3-2026-Charleston-Music-Hall | - |
| tm-tommy-emmanuel-2026-newberry-z7r9jz1aavs4z | Tommy Emmanuel | refresh (applied) | 7942280 | https://www.ticketliquidator.com/tickets/7942280/Tommy-Emmanuel-tickets-Fri-Dec-4-2026-Newberry-Opera-House | - |
| tm-tommy-emmanuel-2026-chattanooga-g5viz_au3swzr | Tommy Emmanuel | refresh (applied) | 7941596 | https://www.ticketliquidator.com/tickets/7941596/Tommy-Emmanuel-tickets-Sat-Dec-5-2026-Robert-Kirk-Walker-Theatre | - |
| tm-tommy-emmanuel-2026-durham-z7r9jz1a70f-w | Tommy Emmanuel | refresh (applied) | 7942282 | https://www.ticketliquidator.com/tickets/7942282/Tommy-Emmanuel-tickets-Sun-Dec-6-2026-Carolina-Theatre-Durham | - |
| tm-tommy-emmanuel-2026-charlotte-z7r9jz1a70f-s | Tommy Emmanuel | refresh (applied) | 7942283 | https://www.ticketliquidator.com/tickets/7942283/Tommy-Emmanuel-tickets-Mon-Dec-7-2026-Knight-Theatre-at-Levine-Center-for-the-Arts | - |
| tm-tommy-emmanuel-2026-atlanta-z7r9jz1a70b-i | Tommy Emmanuel | refresh (applied) | 7941629 | https://www.ticketliquidator.com/tickets/7941629/Tommy-Emmanuel-tickets-Wed-Dec-9-2026-Variety-Playhouse | - |
| tm-tommy-emmanuel-2026-ponte-vedra-beach-z7r9jz1a70kze | Tommy Emmanuel | refresh (applied) | 7941593 | https://www.ticketliquidator.com/tickets/7941593/Tommy-Emmanuel-tickets-Thu-Dec-10-2026-Ponte-Vedra-Concert-Hall | - |
| tm-tommy-emmanuel-2026-orlando-z7r9jz1a70b-e | Tommy Emmanuel | refresh (applied) | 7941513 | https://www.ticketliquidator.com/tickets/7941513/Tommy-Emmanuel-tickets-Fri-Dec-11-2026-The-Plaza-Live | - |
| tm-tommy-emmanuel-2026-clearwater-z7r9jz1aav8__ | Tommy Emmanuel | refresh (applied) | 7942284 | https://www.ticketliquidator.com/tickets/7942284/Tommy-Emmanuel-tickets-Sat-Dec-12-2026-Nancy-and-David-Bilheimer-Capitol-Theatre | - |
| tm-tommy-emmanuel-2027-saint-louis-z7r9jz1aavs4y | Tommy Emmanuel | refresh (applied) | 8267988 | https://www.ticketliquidator.com/tickets/8267988/Tommy-Emmanuel-tickets-Thu-Jan-21-2027-Sheldon-Concert-Hall | - |
| tm-tommy-emmanuel-2027-saint-louis-z7r9jz1aavspz | Tommy Emmanuel | refresh (applied) | 8267989 | https://www.ticketliquidator.com/tickets/8267989/Tommy-Emmanuel-tickets-Fri-Jan-22-2027-Sheldon-Concert-Hall | - |
| tm-tommy-emmanuel-2027-des-moines-vv1kbz_3jvg7w7g3 | Tommy Emmanuel | refresh (applied) | 8267993 | https://www.ticketliquidator.com/tickets/8267993/Tommy-Emmanuel-tickets-Sat-Jan-23-2027-Hoyt-Sherman-Place-Theater | - |
| tm-tommy-emmanuel-2027-madison-vv17jz_ogks7bgcu | Tommy Emmanuel | refresh (applied) | 8267996 | https://www.ticketliquidator.com/tickets/8267996/Tommy-Emmanuel-tickets-Sun-Jan-24-2027-Barrymore-Theatre-Madison | - |
| tm-tommy-emmanuel-2027-skokie-vv1a6zkfpgkegwg7a | Tommy Emmanuel | refresh (applied) | 8268004 | https://www.ticketliquidator.com/tickets/8268004/Tommy-Emmanuel-tickets-Mon-Jan-25-2027-George-Van-Dusen-Theatre-At-North-Shore-Center-For-The-Performing-Arts | - |
| tm-tommy-emmanuel-2027-champaign-z7r9jz1aavspv | Tommy Emmanuel | refresh (applied) | 8268012 | https://www.ticketliquidator.com/tickets/8268012/Tommy-Emmanuel-tickets-Tue-Jan-26-2027-Virginia-Theatre-Il | - |
| tm-tommy-emmanuel-2027-mckees-rocks-1apzkfngkd53yok | Tommy Emmanuel | refresh (applied) | 8268026 | https://www.ticketliquidator.com/tickets/8268026/Tommy-Emmanuel-tickets-Thu-Jan-28-2027-Roxian-Theatre | - |
| tm-tommy-emmanuel-2027-grand-rapids-z7r9jz1aavspe | Tommy Emmanuel | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Tommy Emmanuel; text: Tommy Emmanuel Tommy Emmanuel /tickets/8268028/Tommy-Emmanuel-tickets-Fri-Jan-29-2027-Royce-Auditorium Tommy Emmanuel Tommy Emmanuel Royce A) |
| tm-tommy-emmanuel-2027-buffalo-z7r9jz1aavspd | Tommy Emmanuel | refresh (applied) | 8266792 | https://www.ticketliquidator.com/tickets/8266792/Tommy-Emmanuel-tickets-Sun-Jan-31-2027-Asbury-Hall-at-Babeville | - |
| tm-tommy-emmanuel-2027-rochester-z7r9jz1aavsp7 | Tommy Emmanuel | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Tommy Emmanuel & Jack Schneider; text: Tommy Emmanuel & Jack Schneider Tommy Emmanuel & Jack Schneider /tickets/8268037/Tommy-Emmanuel-tickets-Tue-Feb-2-2027-Beston-Hall-At-Nazare) |
| tm-tommy-emmanuel-2027-albany-z7r9jz1aavspa | Tommy Emmanuel | refresh (applied) | 8268041 | https://www.ticketliquidator.com/tickets/8268041/Tommy-Emmanuel-tickets-Wed-Feb-3-2027-Hart-Theatre-At-The-Egg | - |
| tm-tommy-emmanuel-2027-derry-z7r9jz1aavspk | Tommy Emmanuel | refresh (applied) | 8268048 | https://www.ticketliquidator.com/tickets/8268048/Tommy-Emmanuel-tickets-Thu-Feb-4-2027-Tupelo-Music-Hall | - |
| tm-tommy-emmanuel-2027-fairfield-z7r9jz1aavsp6 | Tommy Emmanuel | refresh (applied) | 8268049 | https://www.ticketliquidator.com/tickets/8268049/Tommy-Emmanuel-tickets-Fri-Feb-5-2027-SHU-Community-Theatre | - |
| tm-tommy-emmanuel-2027-charlottesville-z7r9jz1aavspf | Tommy Emmanuel | refresh (applied) | 8268055 | https://www.ticketliquidator.com/tickets/8268055/Tommy-Emmanuel-tickets-Sat-Feb-6-2027-Paramount-Theater-Of-Charlottesville | - |
| tm-haiden-henderson-2027-dublin-1abzkfigkeweheg | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-manchester-g5vhz_kduqskh | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-london-g5vhz_kew3xpo | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-cardiff-g5vhz_kdajwvp | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-birmingham-g5dzz_ke9h3b2 | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-amsterdam-z698xzbpz16evufjub | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-madrid-z698xz2qz1kumofqp | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-santa-ana-vv1aazkfwgkdn3e19 | Haiden Henderson | refresh (applied) | 8284317 | https://www.ticketliquidator.com/tickets/8284317/Haiden-Henderson-tickets-Mon-Apr-5-2027-Constellation-Room-at-The-Observatory-Santa-Ana | - |
| tm-haiden-henderson-2027-houston-g5diz_kdeuth4 | Haiden Henderson | refresh (applied) | 8284319 | https://www.ticketliquidator.com/tickets/8284319/Haiden-Henderson-tickets-Fri-Apr-9-2027-Bronze-Peacock-At-The-House-Of-Blues-Houston | - |
| tm-haiden-henderson-2027-atlanta-vvg1zz_k5fswrb | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Haiden Henderson; text: Haiden Henderson Haiden Henderson /tickets/8284322/Haiden-Henderson-tickets-Wed-Apr-14-2027-Purgatory-Stage-at-Masquerade-GA Haiden Henderso) |
| tm-haiden-henderson-2027-charlotte-g5evz_k7koqsd | Haiden Henderson | refresh (applied) | 8284324 | https://www.ticketliquidator.com/tickets/8284324/Haiden-Henderson-tickets-Sun-Apr-18-2027-The-Underground-Charlotte | - |
| tm-haiden-henderson-2027-washington-16vfz_kzng7lczd | Haiden Henderson | refresh (applied) | 8284325 | https://www.ticketliquidator.com/tickets/8284325/Haiden-Henderson-tickets-Tue-Apr-20-2027-The-Atlantis | - |
| tm-haiden-henderson-2027-philadelphia-vv16ovpgt4oz75ua7 | Haiden Henderson | refresh (applied) | 8284326 | https://www.ticketliquidator.com/tickets/8284326/Haiden-Henderson-tickets-Thu-Apr-22-2027-Brooklyn-Bowl-Philadelphia | - |
| tm-haiden-henderson-2027-new-york-k7vgf_k9pms1b | Haiden Henderson | refresh (applied) | 8284327 | https://www.ticketliquidator.com/tickets/8284327/Haiden-Henderson-tickets-Fri-Apr-23-2027-Irving-Plaza | - |
| tm-haiden-henderson-2027-boston-vv1avzkfygkegtmcp | Haiden Henderson | refresh (applied) | 8284328 | https://www.ticketliquidator.com/tickets/8284328/Haiden-Henderson-tickets-Sat-Apr-24-2027-Big-Night-Live | - |
| tm-haiden-henderson-2027-toronto-1a8zkfggkd2jp9d | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-milwaukee-z7r9jz1aaeea6 | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Haiden Henderson; text: Haiden Henderson Haiden Henderson /tickets/8284333/Haiden-Henderson-tickets-Sat-May-1-2027-The-Rave-Milwaukee Haiden Henderson Haiden Hender) |
| tm-dylan-scott-2026-milwaukee-z7r9jz1aavse9 | Dylan Scott | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Dylan Scott; text: Dylan Scott Dylan Scott /tickets/8220548/Dylan-Scott-tickets-Sat-Feb-13-2027-Eagles-Ballroom Dylan Scott Dylan Scott Eagles Ballroom 68194 C) |
| tm-dylan-scott-2027-detroit-vv1afzkfigkddz4or | Dylan Scott | refresh (applied) | 8268802 | https://www.ticketliquidator.com/tickets/8268802/Dylan-Scott-tickets-Thu-Jan-21-2027-The-Fillmore-Detroit | - |
| tm-dylan-scott-2027-grand-rapids-vv1afzkfigker90br | Dylan Scott | refresh (applied) | 8268806 | https://www.ticketliquidator.com/tickets/8268806/Dylan-Scott-tickets-Fri-Jan-22-2027-GLC-Live-at-20-Monroe | - |
| tm-dylan-scott-2027-waukee-1ae7z_3gkl2epqo | Dylan Scott | refresh (applied) | 8268807 | https://www.ticketliquidator.com/tickets/8268807/Dylan-Scott-tickets-Sat-Jan-23-2027-Vibrant-Music-Hall | - |
| tm-dylan-scott-2027-sioux-falls-vv17bz_3gkbn6kzm | Dylan Scott | refresh (applied) | 8268810 | https://www.ticketliquidator.com/tickets/8268810/Dylan-Scott-tickets-Thu-Jan-28-2027-Sanford-Pentagon | - |
| tm-dylan-scott-2027-bismarck-z7r9jz1aavseb | Dylan Scott | refresh (applied) | 8261286 | https://www.ticketliquidator.com/tickets/8261286/Dylan-Scott-tickets-Fri-Jan-29-2027-Bismarck-Event-Center | - |
| tm-dylan-scott-2027-rochester-vv17bz_3gklxuys_ | Dylan Scott | refresh (applied) | 8268816 | https://www.ticketliquidator.com/tickets/8268816/Dylan-Scott-tickets-Sat-Jan-30-2027-Mayo-Civic-Center-Auditorium | - |
| tm-dylan-scott-2027-philadelphia-vv17fz_3gklnt6ea | Dylan Scott | refresh (applied) | 8268820 | https://www.ticketliquidator.com/tickets/8268820/Dylan-Scott-tickets-Thu-Feb-4-2027-The-Fillmore-Philadelphia | - |
| tm-dylan-scott-2027-wallingford-g5vvz_3ekjcji | Dylan Scott | refresh (applied) | 8268824 | https://www.ticketliquidator.com/tickets/8268824/Dylan-Scott-tickets-Fri-Feb-5-2027-Toyota-Oakdale-Theatre | - |
| tm-dylan-scott-2027-boston-vv1avzkftgkeyygcg | Dylan Scott | refresh (applied) | 8268829 | https://www.ticketliquidator.com/tickets/8268829/Dylan-Scott-tickets-Sat-Feb-6-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-dylan-scott-2027-denver-z7r9jz1aavse_ | Dylan Scott | refresh (applied) | 8268878 | https://www.ticketliquidator.com/tickets/8268878/Dylan-Scott-tickets-Thu-Feb-18-2027-The-Mission-Ballroom | - |
| tm-dylan-scott-2027-omaha-1aezz_3gknwydtt | Dylan Scott | refresh (applied) | 8268835 | https://www.ticketliquidator.com/tickets/8268835/Dylan-Scott-tickets-Fri-Feb-19-2027-Steelhouse-Omaha | - |
| tm-dylan-scott-2027-park-city-vv17bz_3gkmnbnzl | Dylan Scott | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch; listing: Dylan Scott & Graham Barham; text: Dylan Scott & Graham Barham Dylan Scott & Graham Barham /tickets/8268839/Dylan-Scott-tickets-Sat-Feb-20-2027-Heartland-Credit-Union-Arena Dy) |
| tm-dylan-scott-2027-albuquerque-g5vzz_3mo5e82 | Dylan Scott | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Dylan Scott, Graham Barham & Jacob Hackworth; text: Dylan Scott, Graham Barham & Jacob Hackworth Dylan Scott, Graham Barham & Jacob Hackworth /tickets/8268844/Dylan-Scott-tickets-Thu-Feb-25-20) |
| tm-dylan-scott-2027-prescott-valley-1av0z_3gkmlgghm | Dylan Scott | refresh (applied) | 8268847 | https://www.ticketliquidator.com/tickets/8268847/Dylan-Scott-tickets-Fri-Feb-26-2027-Findlay-Toyota-Center | - |
| tm-dylan-scott-2027-chandler-1av0z_3gkshqv4x | Dylan Scott | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Dylan Scott; text: Dylan Scott Dylan Scott /tickets/8268850/Dylan-Scott-tickets-Sat-Feb-27-2027-Gila-River-Hotels-Casinos-Wild-Horse-Pass Dylan Scott Dylan Sco) |
| tm-dylan-scott-2027-kennewick-vvg1hz_3ngdpch | Dylan Scott | refresh (applied) | 8268851 | https://www.ticketliquidator.com/tickets/8268851/Dylan-Scott-tickets-Thu-Mar-4-2027-Toyota-Center-Kennewick | - |
| tm-dylan-scott-2027-spokane-z7r9jz1aavsvm | Dylan Scott | refresh (applied) | 8268901 | https://www.ticketliquidator.com/tickets/8268901/Dylan-Scott-tickets-Fri-Mar-5-2027-First-Interstate-Center-for-the-Arts | - |
| tm-dylan-scott-2027-wenatchee-z7r9jz1aavs7z | Dylan Scott | refresh (applied) | 8268854 | https://www.ticketliquidator.com/tickets/8268854/Dylan-Scott-tickets-Sat-Mar-6-2027-Town-Toyota-Center | - |
| tm-valley-2027-quebec-z7r9jz1aavzfi | Valley | refresh (applied) | 8310947 | https://www.ticketliquidator.com/tickets/8310947/Valley-Band-tickets-Thu-Feb-4-2027-Grizzly-Fuzz | - |
| tm-valley-2027-montreal-1ad7z_3gkblokhd | Valley | refresh (applied) | 8274453 | https://www.ticketliquidator.com/tickets/8274453/Valley-Band-tickets-Fri-Feb-5-2027-Le-Studio-TD | - |
| tm-valley-2027-ottawa-1ad7z_3gkv11nuz | Valley | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch, venue mismatch; listing: Colorado Eagles vs. Coachella Valley Firebirds; text: Colorado Eagles vs. Coachella Valley Firebirds Colorado Eagles vs. Coachella Valley Firebirds /tickets/8122964/Colorado-Eagles-tickets-Sat-F) |
| tm-valley-2027-waterloo-z7r9jz1aavzft | Valley | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch, venue mismatch; listing: Valley Suns vs. Rip City Remix; text: Valley Suns vs. Rip City Remix Valley Suns vs. Rip City Remix /tickets/8241153/Valley-Suns-tickets-Tue-Feb-9-2027-Mullett-Arena Valley Suns ) |
| tm-valley-2027-london-1avzz_3gktpgnuv | Valley | none | - | - | no qualifying listing (complete catalog checked) |
| tm-valley-2027-chicago-z7r9jz1aavzfy | Valley | refresh (applied) | 8272760 | https://www.ticketliquidator.com/tickets/8272760/Valley-Band-tickets-Fri-Feb-12-2027-Park-West | - |
| tm-valley-2027-minneapolis-z7r9jz1aavzfs | Valley | refresh (applied) | 8272761 | https://www.ticketliquidator.com/tickets/8272761/Valley-Band-tickets-Sat-Feb-13-2027-Fine-Line-Music-Cafe | - |
| tm-valley-2027-winnipeg-1av7z_3gkbokkjd | Valley | refresh (applied) | 8272762 | https://www.ticketliquidator.com/tickets/8272762/Valley-Band-tickets-Tue-Feb-16-2027-Park-Theatre-Winnipeg | - |
| tm-valley-2027-regina-z7r9jz1aavzfw | Valley | refresh (applied) | 8272763 | https://www.ticketliquidator.com/tickets/8272763/Valley-Band-tickets-Thu-Feb-18-2027-Casino-Regina | - |
| tm-valley-2027-edmonton-1av7z_3gkbxlimr | Valley | refresh (applied) | 8272764 | https://www.ticketliquidator.com/tickets/8272764/Valley-Band-tickets-Fri-Feb-19-2027-Midway-Edmonton | - |
| tm-valley-2027-calgary-1av7z_3gkb3cpp6 | Valley | refresh (applied) | 8272765 | https://www.ticketliquidator.com/tickets/8272765/Valley-Band-tickets-Sat-Feb-20-2027-Palace-Theatre-Calgary | - |
| tm-valley-2027-victoria-z7r9jz1aavgoz | Valley | refresh (applied) | 8272766 | https://www.ticketliquidator.com/tickets/8272766/Valley-Band-tickets-Tue-Feb-23-2027-Capital-Ballroom-BC | - |
| tm-valley-2027-vancouver-1av7z_3gkb3hpv9 | Valley | refresh (applied) | 8272767 | https://www.ticketliquidator.com/tickets/8272767/Valley-Band-tickets-Wed-Feb-24-2027-Commodore-Ballroom | - |
| tm-valley-2027-seattle-vvg1hz_3nsltnp | Valley | refresh (applied) | 8272768 | https://www.ticketliquidator.com/tickets/8272768/Valley-Band-tickets-Fri-Feb-26-2027-The-Neptune-Theatre | - |
| tm-valley-2027-portland-z7r9jz1aavzfs | Valley | refresh (applied) | 8272769 | https://www.ticketliquidator.com/tickets/8272769/Valley-Band-tickets-Sat-Feb-27-2027-Wonder-Ballroom | - |
| tm-valley-2027-san-francisco-z7r9jz1aavzfv | Valley | refresh (applied) | 8272715 | https://www.ticketliquidator.com/tickets/8272715/Valley-Band-tickets-Mon-Mar-1-2027-The-Independent | - |
| tm-valley-2027-los-angeles-vv1aazkf-gkdqrhdg | Valley | refresh (applied) | 8272770 | https://www.ticketliquidator.com/tickets/8272770/Valley-Band-tickets-Tue-Mar-2-2027-The-Bellwether | - |
| tm-valley-2027-phoenix-z7r9jz1aavzfg | Valley | refresh (applied) | 8272716 | https://www.ticketliquidator.com/tickets/8272716/Valley-Band-tickets-Wed-Mar-3-2027-The-Crescent-Ballroom-Phoenix | - |
| tm-valley-2027-salt-lake-city-g5vzz_3bnvu2b | Valley | refresh (applied) | 8272771 | https://www.ticketliquidator.com/tickets/8272771/Valley-Band-tickets-Fri-Mar-5-2027-The-Depot-Salt-Lake-City | - |
| tm-valley-2027-denver-z7r9jz1aavzfu | Valley | refresh (applied) | 8272772 | https://www.ticketliquidator.com/tickets/8272772/Valley-Band-tickets-Sat-Mar-6-2027-Bluebird-Theater | - |
| tm-valley-2027-saint-louis-vv16kzkfipkzaga2f7 | Valley | refresh (applied) | 8272773 | https://www.ticketliquidator.com/tickets/8272773/Valley-Band-tickets-Tue-Mar-9-2027-Delmar-Hall | - |
| tm-valley-2027-nashville-g5viz_3rrquu4 | Valley | refresh (applied) | 8272774 | https://www.ticketliquidator.com/tickets/8272774/Valley-Band-tickets-Wed-Mar-10-2027-Brooklyn-Bowl-Nashville | - |
| tm-valley-2027-atlanta-vvg1zz_32aklli | Valley | refresh (applied) | 8272775 | https://www.ticketliquidator.com/tickets/8272775/Valley-Band-tickets-Fri-Mar-12-2027-Hell-at-The-Masquerade-GA | - |
| tm-valley-2027-charlotte-g5evz_3nrncxj | Valley | refresh (applied) | 8272776 | https://www.ticketliquidator.com/tickets/8272776/Valley-Band-tickets-Sat-Mar-13-2027-The-Underground-Charlotte | - |
| tm-valley-2027-washington-16vfz_333g7mktl | Valley | refresh (applied) | 8272777 | https://www.ticketliquidator.com/tickets/8272777/Valley-Band-tickets-Sun-Mar-14-2027-930-Club | - |
| tm-valley-2027-philadelphia-vv1aezkfygkdw6utw | Valley | refresh (applied) | 8272778 | https://www.ticketliquidator.com/tickets/8272778/Valley-Band-tickets-Tue-Mar-16-2027-Brooklyn-Bowl-Philadelphia | - |
| tm-valley-2027-new-york-z7r9jz1aavzfm | Valley | refresh (applied) | 8272779 | https://www.ticketliquidator.com/tickets/8272779/Valley-Band-tickets-Wed-Mar-17-2027-Webster-Hall | - |
| tm-valley-2027-boston-vv177z_3gkmvpndn | Valley | refresh (applied) | 8272780 | https://www.ticketliquidator.com/tickets/8272780/Valley-Band-tickets-Thu-Mar-18-2027-Paradise-Rock-Club-Presented-by-Citizens | - |
| tm-valley-2027-toronto-1avzz_3gkdexa9o | Valley | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch, venue mismatch; listing: Austin Spurs vs. Valley Suns; text: Austin Spurs vs. Valley Suns Austin Spurs vs. Valley Suns /tickets/8240656/Austin-Spurs-tickets-Sat-Mar-20-2027-HEB-Center-at-Cedar-Park Aus) |
| tm-valley-2027-amsterdam-z698xzbpz1kuzjpzo | Valley | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch, venue mismatch; listing: Chippewa Valley Symphony Orchestra: Cosmic Connections; text: Chippewa Valley Symphony Orchestra: Cosmic Connections Chippewa Valley Symphony Orchestra: Cosmic Connections /tickets/8274638/Chippewa-Vall) |
| tm-valley-2027-bristol-g5vhz_3zkbafq | Valley | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: provider URL names a different date, city mismatch, venue mismatch; listing: Syracuse Mets vs. Lehigh Valley IronPigs; text: Syracuse Mets vs. Lehigh Valley IronPigs Syracuse Mets vs. Lehigh Valley IronPigs /tickets/8222861/Syracuse-Mets-tickets-Tue-May-11-2027-NBT) |
| tm-valley-2027-birmingham-g5dzz_36osp2q | Valley | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch, venue mismatch; listing: Utah Utes vs. Utah Valley Wolverines; text: Utah Utes vs. Utah Valley Wolverines Utah Utes vs. Utah Valley Wolverines /tickets/8228194/Utah-Utes-Baseball-tickets-Tue-May-11-2027-Charli) |
| tm-valley-2027-manchester-g5vhz_ohdx77o | Valley | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch, venue mismatch; listing: Syracuse Mets vs. Lehigh Valley IronPigs; text: Syracuse Mets vs. Lehigh Valley IronPigs Syracuse Mets vs. Lehigh Valley IronPigs /tickets/8222862/Syracuse-Mets-tickets-Wed-May-12-2027-NBT) |
| tm-valley-2027-london-g5dzz_3vpsj3z | Valley | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch, venue mismatch; listing: Syracuse Mets vs. Lehigh Valley IronPigs; text: Syracuse Mets vs. Lehigh Valley IronPigs Syracuse Mets vs. Lehigh Valley IronPigs /tickets/8222864/Syracuse-Mets-tickets-Fri-May-14-2027-NBT) |
| tm-valley-2027-leeds-1adfz_3gkihrzjf | Valley | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch, venue mismatch; listing: Syracuse Mets vs. Lehigh Valley IronPigs; text: Syracuse Mets vs. Lehigh Valley IronPigs Syracuse Mets vs. Lehigh Valley IronPigs /tickets/8222866/Syracuse-Mets-tickets-Sun-May-16-2027-NBT) |
| tm-yacht-rock-revue-2026-atlanta-vvg1zz_oecocx5 | Yacht Rock Revue | refresh (applied) | 8244362 | https://www.ticketliquidator.com/tickets/8244362/Yacht-Rock-Revue-tickets-Sat-Dec-19-2026-Coca-Cola-Roxy | - |
| tm-yacht-rock-revue-2027-englewood-k7vgf_k9ovli- | Yacht Rock Revue | refresh (applied) | 8284472 | https://www.ticketliquidator.com/tickets/8284472/Yacht-Rock-Revue-tickets-Thu-Jan-7-2027-Bergen-Performing-Arts-Center | - |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31y4afw | Yacht Rock Revue | correct (applied) | 8284473 | https://www.ticketliquidator.com/tickets/8284473/Yacht-Rock-Revue-tickets-Fri-Jan-8-2027-Paramount-Theatre-Huntington | - |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31ykyfq | Yacht Rock Revue | correct (applied) | 8284474 | https://www.ticketliquidator.com/tickets/8284474/Yacht-Rock-Revue-tickets-Sat-Jan-9-2027-Paramount-Theatre-Huntington | - |
| tm-yacht-rock-revue-2027-huntington-k7vgf_31y3tkt | Yacht Rock Revue | refresh (applied) | 8284475 | https://www.ticketliquidator.com/tickets/8284475/Yacht-Rock-Revue-tickets-Sun-Jan-10-2027-Paramount-Theatre-Huntington | - |
| tm-yacht-rock-revue-2027-key-west-z7r9jz1aaeefv | Yacht Rock Revue | refresh (applied) | 8284476 | https://www.ticketliquidator.com/tickets/8284476/Yacht-Rock-Revue-tickets-Wed-Jan-20-2027-Coffee-Butler-Amphitheater | - |
| tm-yacht-rock-revue-2027-ft-lauderdale-vvg1vz_3t9jx1c | Yacht Rock Revue | refresh (applied) | 8284477 | https://www.ticketliquidator.com/tickets/8284477/Yacht-Rock-Revue-tickets-Thu-Jan-21-2027-Lillian-S-Wells-Hall-at-The-Parker | - |
| tm-yacht-rock-revue-2027-fort-myers-z7r9jz1aaevr7 | Yacht Rock Revue | refresh (applied) | 8281595 | https://www.ticketliquidator.com/tickets/8281595/Yacht-Rock-Revue-tickets-Fri-Jan-22-2027-Caloosa-Sound-Amphitheater | - |
| tm-yacht-rock-revue-2027-clearwater-z7r9jz1aaevfz | Yacht Rock Revue | refresh (applied) | 8284479 | https://www.ticketliquidator.com/tickets/8284479/Yacht-Rock-Revue-tickets-Sat-Jan-23-2027-Ruth-Eckerd-Hall | - |
| tm-yacht-rock-revue-2027-melbourne-z7r9jz1aaee4f | Yacht Rock Revue | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Yacht Rock Revue; text: Yacht Rock Revue Yacht Rock Revue /tickets/8284482/Yacht-Rock-Revue-tickets-Wed-Jan-27-2027-King-Center-For-The-Performing-Arts Yacht Rock R) |
| tm-yacht-rock-revue-2027-atlantic-city-vv1aezkfsgkeedrng | Yacht Rock Revue | refresh (applied) | 8284485 | https://www.ticketliquidator.com/tickets/8284485/Yacht-Rock-Revue-tickets-Fri-Mar-5-2027-Hard-Rock-Live-At-Etess-Arena | - |
| tm-yacht-rock-revue-2027-bethlehem-vv17fz_3gkblhlrj | Yacht Rock Revue | refresh (applied) | 8284486 | https://www.ticketliquidator.com/tickets/8284486/Yacht-Rock-Revue-tickets-Sat-Mar-6-2027-Wind-Creek-Event-Center | - |
| tm-yacht-rock-revue-2027-nashville-vv17fz_3gktkih3j | Yacht Rock Revue | refresh (applied) | 8284487 | https://www.ticketliquidator.com/tickets/8284487/Yacht-Rock-Revue-tickets-Fri-Mar-12-2027-Brown-County-Music-Center | - |
| tm-yacht-rock-revue-2027-nashville-g5viz_k26z3ab | Yacht Rock Revue | refresh (applied) | 8284489 | https://www.ticketliquidator.com/tickets/8284489/Yacht-Rock-Revue-tickets-Sat-Mar-13-2027-The-Truth | - |
| tm-yacht-rock-revue-2027-chicago-vv178z_3gkmzl562 | Yacht Rock Revue | none | - | - | no qualifying listing (complete catalog checked) |
| tm-too-many-zooz-2027-wroclaw-z698xzqpz1kcapprk | Too Many Zooz | none | - | - | no qualifying listing (complete catalog checked) |
| tm-too-many-zooz-2027-denver-g5vzz_kkf1pnr | Too Many Zooz | refresh (applied) | 8284720 | https://www.ticketliquidator.com/tickets/8284720/Too-Many-Zooz-tickets-Fri-Mar-19-2027-The-Summit-Music-Hall | - |
| tm-too-many-zooz-2027-houston-g5diz_kf4niru | Too Many Zooz | refresh (applied) | 8284721 | https://www.ticketliquidator.com/tickets/8284721/Too-Many-Zooz-tickets-Fri-Apr-30-2027-White-Oak-Music-Hall-Downstairs | - |
| tm-too-many-zooz-2027-tucson-z7r9jz1aavmvf | Too Many Zooz | refresh (applied) | 8284723 | https://www.ticketliquidator.com/tickets/8284723/Too-Many-Zooz-tickets-Thu-May-6-2027-La-Rosa-Tucson | - |
| tm-too-many-zooz-2027-seattle-vvg1hz_3tamn7s | Too Many Zooz | refresh (applied) | 8284730 | https://www.ticketliquidator.com/tickets/8284730/Too-Many-Zooz-tickets-Fri-May-14-2027-The-Neptune-Theatre | - |
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
| tm-andrea-bocelli-2027-glasgow-1adbz_k03jdzd5av | Andrea Bocelli | refresh (applied) | 8297135 | https://www.ticketliquidator.com/tickets/8297135/Andrea-Bocelli-tickets-Sat-Oct-9-2027-OVO-Hydro | - |
| tm-fantasia-2027-washington-1ka8vpuogaub0mr | Fantasia | refresh (applied) | 8293963 | https://www.ticketliquidator.com/tickets/8293963/The-Love-of-Soul-Tour-tickets-Fri-Feb-5-2027-Capital-One-Arena | - |
| tm-fantasia-2027-norfolk-vv1avzkfmgkdn5kye | Fantasia | refresh (applied) | 8293964 | https://www.ticketliquidator.com/tickets/8293964/The-Love-of-Soul-Tour-tickets-Sat-Feb-6-2027-Scope-Arena | - |
| tm-fantasia-2027-belmont-park-1ayzkfugkdwafjv | Fantasia | refresh (applied) | 8293965 | https://www.ticketliquidator.com/tickets/8293965/The-Love-of-Soul-Tour-tickets-Fri-Feb-12-2027-UBS-Arena | - |
| tm-fantasia-2027-atlantic-city-vv1aezkfmgkegjgo6 | Fantasia | refresh (applied) | 8293966 | https://www.ticketliquidator.com/tickets/8293966/The-Love-of-Soul-Tour-tickets-Sat-Feb-13-2027-Boardwalk-Hall-Arena-Boardwalk-Hall | - |
| tm-fantasia-2027-new-orleans-g5viz_k6css2k | Fantasia | refresh (applied) | 8293967 | https://www.ticketliquidator.com/tickets/8293967/The-Love-of-Soul-Tour-tickets-Fri-Feb-19-2027-Smoothie-King-Center | - |
| tm-fantasia-2027-biloxi-g5viz_kxokyjj | Fantasia | refresh (applied) | 8293969 | https://www.ticketliquidator.com/tickets/8293969/The-Love-of-Soul-Tour-tickets-Sat-Feb-20-2027-Mississippi-Coast-Coliseum | - |
| tm-fantasia-2027-ontario-vv1aazkfzgketkqbz | Fantasia | refresh (applied) | 8294732 | https://www.ticketliquidator.com/tickets/8294732/The-Love-of-Soul-Tour-tickets-Fri-Mar-5-2027-Toyota-Arena-Ontario | - |
| tm-fantasia-2027-oakland-g5vyz_krz5jaf | Fantasia | refresh (applied) | 8294733 | https://www.ticketliquidator.com/tickets/8294733/The-Love-of-Soul-Tour-tickets-Sat-Mar-6-2027-Oakland-Arena | - |
| tm-fantasia-2027-fort-worth-vvg1yz_kbtlwh3 | Fantasia | refresh (applied) | 8293970 | https://www.ticketliquidator.com/tickets/8293970/The-Love-of-Soul-Tour-tickets-Sat-Mar-13-2027-Ariat-Arena | - |
| tm-fantasia-2027-atlanta-vvg1zz_kqs5ty6 | Fantasia | refresh (applied) | 8293971 | https://www.ticketliquidator.com/tickets/8293971/The-Love-of-Soul-Tour-tickets-Fri-Mar-26-2027-State-Farm-Arena-GA | - |
| tm-fantasia-2027-orlando-1aefz_3gkx--7oo | Fantasia | refresh (applied) | 8293972 | https://www.ticketliquidator.com/tickets/8293972/The-Love-of-Soul-Tour-tickets-Sat-Mar-27-2027-Addition-Financial-Arena | - |
| tm-fantasia-2027-saint-louis-vv17bz_3gktv8xq0 | Fantasia | refresh (applied) | 8293974 | https://www.ticketliquidator.com/tickets/8293974/The-Love-of-Soul-Tour-tickets-Fri-Apr-9-2027-Enterprise-Center | - |
| tm-fantasia-2027-southaven-g5viz_krb7nuq | Fantasia | refresh (applied) | 8293975 | https://www.ticketliquidator.com/tickets/8293975/The-Love-of-Soul-Tour-tickets-Sat-Apr-10-2027-Landers-Center | - |
| tm-fantasia-2027-jacksonville-1axzkfwgkeynp6z | Fantasia | refresh (applied) | 8293976 | https://www.ticketliquidator.com/tickets/8293976/The-Love-of-Soul-Tour-tickets-Fri-Apr-16-2027-VyStar-Veterans-Memorial-Arena | - |
| tm-fantasia-2027-hollywood-vvg1vz_k9lsilt | Fantasia | refresh (applied) | 8293977 | https://www.ticketliquidator.com/tickets/8293977/The-Love-of-Soul-Tour-tickets-Sat-Apr-17-2027-Hard-Rock-Live-At-The-Seminole-Hard-Rock-Hotel-Casino-Hollywood | - |
| tm-fantasia-2027-phoenix-1a_zkfmgke0qgen | Fantasia | refresh (applied) | 8294734 | https://www.ticketliquidator.com/tickets/8294734/The-Love-of-Soul-Tour-tickets-Fri-Apr-23-2027-Mortgage-Matchup-Center | - |
| tm-fantasia-2027-charlotte-g5evz_k5a0ajy | Fantasia | refresh (applied) | 8293978 | https://www.ticketliquidator.com/tickets/8293978/The-Love-of-Soul-Tour-tickets-Fri-May-7-2027-Spectrum-Center | - |
| tm-fantasia-2027-raleigh-g5evz_kx4nbzb | Fantasia | refresh (applied) | 8293979 | https://www.ticketliquidator.com/tickets/8293979/The-Love-of-Soul-Tour-tickets-Sat-May-8-2027-Lenovo-Center | - |
| tm-fantasia-2027-chicago-vv1a7zkfugkdbhxkp | Fantasia | refresh (applied) | 8293980 | https://www.ticketliquidator.com/tickets/8293980/The-Love-of-Soul-Tour-tickets-Fri-May-14-2027-United-Center | - |
| tm-fantasia-2027-detroit-vv1afzkfsgkdkxfme | Fantasia | refresh (applied) | 8293981 | https://www.ticketliquidator.com/tickets/8293981/The-Love-of-Soul-Tour-tickets-Sat-May-15-2027-Little-Caesars-Arena | - |
| tm-fantasia-2027-providence-vv1avzkfygkdtqjz9 | Fantasia | refresh (applied) | 8293982 | https://www.ticketliquidator.com/tickets/8293982/The-Love-of-Soul-Tour-tickets-Fri-May-21-2027-Amica-Mutual-Pavilion | - |
| tm-fantasia-2027-newark-vv1aezkfugke-q6sn | Fantasia | refresh (applied) | 8293983 | https://www.ticketliquidator.com/tickets/8293983/The-Love-of-Soul-Tour-tickets-Sat-May-22-2027-Prudential-Center | - |
| tm-a-perfect-circle-2026-adelaide-1aefz_kgkrmdjgo | A Perfect Circle | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-perfect-circle-2026-brisbane-1avgz_kgklfnuo6 | A Perfect Circle | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-perfect-circle-2026-honolulu-vvg1iz_1qirhb6 | A Perfect Circle | refresh (applied) | 7964785 | https://www.ticketliquidator.com/tickets/7964785/A-Perfect-Circle-tickets-Sat-Dec-19-2026-Neal-S-Blaisdell-Center-Arena | - |
| tm-a-perfect-circle-2027-vancouver-1k78vpcbgau8awz | A Perfect Circle | refresh (applied) | 8295085 | https://www.ticketliquidator.com/tickets/8295085/A-Perfect-Circle-tickets-Tue-Apr-13-2027-UBC-Doug-Mitchell-Thunderbird-Sports-Centre | - |
| tm-a-perfect-circle-2027-calgary-1av7z_kgkn55gda | A Perfect Circle | refresh (applied) | 8295086 | https://www.ticketliquidator.com/tickets/8295086/A-Perfect-Circle-tickets-Thu-Apr-15-2027-Scotiabank-Saddledome | - |
| tm-a-perfect-circle-2027-edmonton-1aozkfygkey3iuu | A Perfect Circle | refresh (applied) | 8295087 | https://www.ticketliquidator.com/tickets/8295087/A-Perfect-Circle-tickets-Sat-Apr-17-2027-Rogers-Place | - |
| tm-a-perfect-circle-2027-winnipeg-16v7z_kjkg7bgkj | A Perfect Circle | refresh (applied) | 8295088 | https://www.ticketliquidator.com/tickets/8295088/A-Perfect-Circle-tickets-Mon-Apr-19-2027-Canada-Life-Centre | - |
| tm-a-perfect-circle-2027-niagara-falls-1a8zkfmgkemh_mw | A Perfect Circle | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-perfect-circle-2027-niagara-falls-1a8zkfmgkemjazz | A Perfect Circle | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-perfect-circle-2027-detroit-vv16fzkfma3zac8uka | A Perfect Circle | refresh (applied) | 8295063 | https://www.ticketliquidator.com/tickets/8295063/A-Perfect-Circle-tickets-Sun-Apr-25-2027-Fox-Theatre-Detroit | - |
| tm-a-perfect-circle-2027-boston-vv1k7z_kr_g7rccc | A Perfect Circle | refresh (applied) | 8295064 | https://www.ticketliquidator.com/tickets/8295064/A-Perfect-Circle-tickets-Tue-Apr-27-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-a-perfect-circle-2027-uncasville-g5vvz_khq_fxg | A Perfect Circle | refresh (applied) | 8295065 | https://www.ticketliquidator.com/tickets/8295065/A-Perfect-Circle-tickets-Wed-Apr-28-2027-Mohegan-Sun-Arena-CT | - |
| tm-a-perfect-circle-2027-camden-vv1aezkfzgkdun44v | A Perfect Circle | refresh (applied) | 8295066 | https://www.ticketliquidator.com/tickets/8295066/A-Perfect-Circle-tickets-Fri-Apr-30-2027-Freedom-Mortgage-Pavilion | - |
| tm-a-perfect-circle-2027-newark-vv1aezkfzgkecfwzd | A Perfect Circle | refresh (applied) | 8295067 | https://www.ticketliquidator.com/tickets/8295067/A-Perfect-Circle-tickets-Sat-May-1-2027-Prudential-Center | - |
| tm-a-perfect-circle-2027-charlotte-g5evz_kj8b4gy | A Perfect Circle | refresh (applied) | 8295068 | https://www.ticketliquidator.com/tickets/8295068/A-Perfect-Circle-tickets-Tue-May-4-2027-Truliant-Amphitheater | - |
| tm-a-perfect-circle-2027-duluth-vvg1zz_kxwhwhz | A Perfect Circle | refresh (applied) | 8295069 | https://www.ticketliquidator.com/tickets/8295069/A-Perfect-Circle-tickets-Wed-May-5-2027-Gas-South-Arena | - |
| tm-a-perfect-circle-2027-the-woodlands-g5diz_kjdvhi6 | A Perfect Circle | refresh (applied) | 8295070 | https://www.ticketliquidator.com/tickets/8295070/A-Perfect-Circle-tickets-Fri-May-7-2027-The-Cynthia-Woods-Mitchell-Pavilion | - |
| tm-a-perfect-circle-2027-nashville-g5viz_knjkaln | A Perfect Circle | refresh (applied) | 8295071 | https://www.ticketliquidator.com/tickets/8295071/A-Perfect-Circle-tickets-Sat-May-15-2027-Bridgestone-Arena | - |
| tm-a-perfect-circle-2027-saint-louis-vv1akzkfugkdepcmi | A Perfect Circle | refresh (applied) | 8295072 | https://www.ticketliquidator.com/tickets/8295072/A-Perfect-Circle-tickets-Mon-May-17-2027-Chaifetz-Arena | - |
| tm-a-perfect-circle-2027-cuyahoga-falls-vv1aazkfzgkeutduj | A Perfect Circle | refresh (applied) | 8295073 | https://www.ticketliquidator.com/tickets/8295073/A-Perfect-Circle-tickets-Thu-May-20-2027-Blossom-Music-Center | - |
| tm-a-perfect-circle-2027-chicago-vv1kjz_kf7g7lms3 | A Perfect Circle | refresh (applied) | 8295074 | https://www.ticketliquidator.com/tickets/8295074/A-Perfect-Circle-tickets-Sat-May-22-2027-Wintrust-Arena | - |
| tm-a-perfect-circle-2027-shakopee-1a-zkfygkehcamo | A Perfect Circle | refresh (applied) | 8295075 | https://www.ticketliquidator.com/tickets/8295075/A-Perfect-Circle-tickets-Sun-May-23-2027-Mystic-Lake-Amphitheatre-Shakopee | - |
| tm-a-perfect-circle-2027-west-valley-city-g5vzz_kk2w7ui | A Perfect Circle | refresh (applied) | 8295076 | https://www.ticketliquidator.com/tickets/8295076/A-Perfect-Circle-tickets-Fri-May-28-2027-Maverik-Center | - |
| tm-a-perfect-circle-2027-seattle-vvg1hz_kfmppzs | A Perfect Circle | refresh (applied) | 8295077 | https://www.ticketliquidator.com/tickets/8295077/A-Perfect-Circle-tickets-Sun-May-30-2027-Climate-Pledge-Arena | - |
| tm-a-perfect-circle-2027-portland-vvg1hz_kbfgxyu | A Perfect Circle | refresh (applied) | 8295078 | https://www.ticketliquidator.com/tickets/8295078/A-Perfect-Circle-tickets-Tue-Jun-1-2027-Portland-Veterans-Memorial-Coliseum | - |
| tm-a-perfect-circle-2027-reno-1a9zkfygkembtoj | A Perfect Circle | refresh (applied) | 8295093 | https://www.ticketliquidator.com/tickets/8295093/A-Perfect-Circle-tickets-Thu-Jun-3-2027-Grand-Sierra-Theatre | - |
| tm-a-perfect-circle-2027-daly-city-g5vyz_kwfsetp | A Perfect Circle | refresh (applied) | 8295079 | https://www.ticketliquidator.com/tickets/8295079/A-Perfect-Circle-tickets-Fri-Jun-4-2027-Cow-Palace | - |
| tm-a-perfect-circle-2027-hollywood-vvg1iz_kj6yzfl | A Perfect Circle | refresh (applied) | 8295081 | https://www.ticketliquidator.com/tickets/8295081/A-Perfect-Circle-tickets-Sun-Jun-6-2027-Hollywood-Bowl | - |
| tm-a-perfect-circle-2027-chula-vista-vvg1iz_kl8jvkq | A Perfect Circle | refresh (applied) | 8295080 | https://www.ticketliquidator.com/tickets/8295080/A-Perfect-Circle-tickets-Tue-Jun-8-2027-North-Island-Credit-Union-Amphitheatre | - |
| tm-a-perfect-circle-2027-las-vegas-1a9zkfmgkd8myho | A Perfect Circle | refresh (applied) | 8295083 | https://www.ticketliquidator.com/tickets/8295083/A-Perfect-Circle-tickets-Thu-Jun-10-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-a-perfect-circle-2027-las-vegas-1a9zkfmgkd8y8h4 | A Perfect Circle | refresh (applied) | 8295084 | https://www.ticketliquidator.com/tickets/8295084/A-Perfect-Circle-tickets-Fri-Jun-11-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-a-perfect-circle-2027-phoenix-1a_zkfsgkd23t56 | A Perfect Circle | refresh (applied) | 8295082 | https://www.ticketliquidator.com/tickets/8295082/A-Perfect-Circle-tickets-Sun-Jun-13-2027-Talking-Stick-Resort-Amphitheatre | - |
| tm-chelsea-cutler-2027-charleston-g5evz_kbudulq | Chelsea Cutler | refresh (applied) | 8300999 | https://www.ticketliquidator.com/tickets/8300999/Chelsea-Cutler-tickets-Mon-Feb-1-2027-Charleston-Music-Hall | - |
| tm-chelsea-cutler-2027-charlotte-g5evz_kukxezh | Chelsea Cutler | refresh (applied) | 8301000 | https://www.ticketliquidator.com/tickets/8301000/Chelsea-Cutler-tickets-Fri-Feb-5-2027-The-Fillmore-Charlotte | - |
| tm-chelsea-cutler-2027-washington-164zkfuqdzacd655 | Chelsea Cutler | refresh (applied) | 8301001 | https://www.ticketliquidator.com/tickets/8301001/Chelsea-Cutler-tickets-Sat-Feb-6-2027-930-Club | - |
| tm-chelsea-cutler-2027-washington-1avfz_kgkw7gvak | Chelsea Cutler | refresh (applied) | 8301002 | https://www.ticketliquidator.com/tickets/8301002/Chelsea-Cutler-tickets-Sun-Feb-7-2027-930-Club | - |
| tm-chelsea-cutler-2027-philadelphia-vv1aovpuygauryej | Chelsea Cutler | refresh (applied) | 8301003 | https://www.ticketliquidator.com/tickets/8301003/Chelsea-Cutler-tickets-Wed-Feb-10-2027-The-Fillmore-Philadelphia | - |
| tm-chelsea-cutler-2027-brooklyn-k7vgf_kze_vgc | Chelsea Cutler | refresh (applied) | 8301004 | https://www.ticketliquidator.com/tickets/8301004/Chelsea-Cutler-tickets-Fri-Feb-12-2027-Brooklyn-Paramount | - |
| tm-chelsea-cutler-2027-toronto-1avzz_kgkstt7dw | Chelsea Cutler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-chelsea-cutler-2027-detroit-vv1afzkfugkelhvg0 | Chelsea Cutler | refresh (applied) | 8301005 | https://www.ticketliquidator.com/tickets/8301005/Chelsea-Cutler-tickets-Thu-Feb-18-2027-Saint-Andrews-Hall-Detroit | - |
| tm-chelsea-cutler-2027-chicago-vv178z_kgks8xdpl | Chelsea Cutler | refresh (applied) | 8301006 | https://www.ticketliquidator.com/tickets/8301006/Chelsea-Cutler-tickets-Fri-Feb-19-2027-The-Salt-Shed-Indoors-Chicago | - |
| tm-chelsea-cutler-2027-minneapolis-vv17bz_kgkswys5j | Chelsea Cutler | refresh (applied) | 8301007 | https://www.ticketliquidator.com/tickets/8301007/Chelsea-Cutler-tickets-Tue-Feb-23-2027-The-Fillmore-Minneapolis-Presented-by-Affinity-Plus | - |
| tm-chelsea-cutler-2027-dallas-vvg1yz_kraozwg | Chelsea Cutler | refresh (applied) | 8301008 | https://www.ticketliquidator.com/tickets/8301008/Chelsea-Cutler-tickets-Thu-Feb-25-2027-South-Side-Ballroom-at-Gilleys | - |
| tm-chelsea-cutler-2027-phoenix-16v0z_koag7ux58 | Chelsea Cutler | refresh (applied) | 8301009 | https://www.ticketliquidator.com/tickets/8301009/Chelsea-Cutler-tickets-Wed-Mar-3-2027-The-Van-Buren | - |
| tm-chelsea-cutler-2027-los-angeles-vv1aazkfzgkdgncya | Chelsea Cutler | refresh (applied) | 8301010 | https://www.ticketliquidator.com/tickets/8301010/Chelsea-Cutler-tickets-Thu-Mar-4-2027-The-Bellwether | - |
| tm-chelsea-cutler-2027-san-diego-vvg1iz_ks1c6a3 | Chelsea Cutler | refresh (applied) | 8301011 | https://www.ticketliquidator.com/tickets/8301011/Chelsea-Cutler-tickets-Fri-Mar-5-2027-The-Observatory-North-Park | - |
| tm-chelsea-cutler-2027-boise-g5vzz_ksxzvbs | Chelsea Cutler | refresh (applied) | 8301012 | https://www.ticketliquidator.com/tickets/8301012/Chelsea-Cutler-tickets-Wed-Mar-10-2027-Knitting-Factory-Concert-House-Boise | - |
| tm-the-red-clay-strays-2026-las-vegas-z7r9jz1a70pzp | The Red Clay Strays | refresh (applied) | 7970241 | https://www.ticketliquidator.com/tickets/7970241/The-Red-Clay-Strays-tickets-Sat-Dec-5-2026-MGM-Grand-Garden-Arena | - |
| tm-the-red-clay-strays-2027-raleigh-g5evz_kwmllt1 | The Red Clay Strays | refresh (applied) | 8300893 | https://www.ticketliquidator.com/tickets/8300893/The-Red-Clay-Strays-tickets-Fri-Jan-22-2027-Lenovo-Center | - |
| tm-the-red-clay-strays-2027-columbia-g5evz_ksmjps3 | The Red Clay Strays | refresh (applied) | 8300894 | https://www.ticketliquidator.com/tickets/8300894/The-Red-Clay-Strays-tickets-Sat-Jan-23-2027-Colonial-Life-Arena | - |
| tm-the-red-clay-strays-2027-rosemont-vv178z_kgksozism | The Red Clay Strays | refresh (applied) | 8300895 | https://www.ticketliquidator.com/tickets/8300895/The-Red-Clay-Strays-tickets-Thu-Jan-28-2027-Allstate-Arena | - |
| tm-the-red-clay-strays-2027-saint-louis-vv17bz_3gkxtmyfx | The Red Clay Strays | refresh (applied) | 8300896 | https://www.ticketliquidator.com/tickets/8300896/The-Red-Clay-Strays-tickets-Fri-Jan-29-2027-Enterprise-Center | - |
| tm-the-red-clay-strays-2027-omaha-vv17bz_kgks0gmzs | The Red Clay Strays | refresh (applied) | 8300897 | https://www.ticketliquidator.com/tickets/8300897/The-Red-Clay-Strays-tickets-Sun-Jan-31-2027-CHI-Health-Center-Omaha | - |
| tm-the-red-clay-strays-2027-indianapolis-vv17fz_kgks5i1ir | The Red Clay Strays | refresh (applied) | 8300898 | https://www.ticketliquidator.com/tickets/8300898/The-Red-Clay-Strays-tickets-Fri-Feb-5-2027-Gainbridge-Fieldhouse | - |
| tm-the-red-clay-strays-2027-charleston-1avbz_kgkb6hkqy | The Red Clay Strays | refresh (applied) | 8300899 | https://www.ticketliquidator.com/tickets/8300899/The-Red-Clay-Strays-tickets-Thu-Feb-11-2027-Charleston-Coliseum-Convention-Center-Charleston | - |
| tm-the-red-clay-strays-2027-estero-vvg1vz_ks60_np | The Red Clay Strays | refresh (applied) | 8300900 | https://www.ticketliquidator.com/tickets/8300900/The-Red-Clay-Strays-tickets-Thu-Feb-25-2027-Hertz-Arena | - |
| tm-the-red-clay-strays-2027-saskatoon-1av7z_kgkwfc4o1 | The Red Clay Strays | refresh (applied) | 8300890 | https://www.ticketliquidator.com/tickets/8300890/The-Red-Clay-Strays-tickets-Thu-Mar-11-2027-SaskTel-Centre | - |
| tm-the-red-clay-strays-2027-edmonton-1av7z_kgksqo5v0 | The Red Clay Strays | refresh (applied) | 8300891 | https://www.ticketliquidator.com/tickets/8300891/The-Red-Clay-Strays-tickets-Fri-Mar-12-2027-Rogers-Place | - |
| tm-the-red-clay-strays-2027-winnipeg-1av7z_kgkgyzwh1 | The Red Clay Strays | refresh (applied) | 8300892 | https://www.ticketliquidator.com/tickets/8300892/The-Red-Clay-Strays-tickets-Sun-Mar-14-2027-Canada-Life-Centre | - |
| tm-the-red-clay-strays-2027-uncasville-g5vvz_koktqjf | The Red Clay Strays | refresh (applied) | 8300901 | https://www.ticketliquidator.com/tickets/8300901/The-Red-Clay-Strays-tickets-Thu-Mar-18-2027-Mohegan-Sun-Arena-CT | - |
| tm-the-red-clay-strays-2027-allentown-1adzz_kgkmg3bkj | The Red Clay Strays | refresh (applied) | 8300902 | https://www.ticketliquidator.com/tickets/8300902/The-Red-Clay-Strays-tickets-Fri-Mar-19-2027-PPL-Center | - |
| tm-the-red-clay-strays-2027-mobile-g5viz_k1kuycs | The Red Clay Strays | refresh (applied) | 8285231 | https://www.ticketliquidator.com/tickets/8285231/The-Red-Clay-Strays-tickets-Thu-Mar-25-2027-Regions-Arena | - |
| tm-the-red-clay-strays-2027-mobile-g5viz_3tpkkro | The Red Clay Strays | refresh (applied) | 8277070 | https://www.ticketliquidator.com/tickets/8277070/The-Red-Clay-Strays-tickets-Fri-Mar-26-2027-Regions-Arena | - |
| tm-the-red-clay-strays-2027-mobile-g5viz_k14dqes | The Red Clay Strays | refresh (applied) | 8282109 | https://www.ticketliquidator.com/tickets/8282109/The-Red-Clay-Strays-tickets-Sat-Mar-27-2027-Regions-Arena | - |
| tm-the-red-clay-strays-2027-bangor-vv1f7z_kqaonzdc55 | The Red Clay Strays | refresh (applied) | 8300903 | https://www.ticketliquidator.com/tickets/8300903/The-Red-Clay-Strays-tickets-Fri-Jul-23-2027-Maine-Savings-Amphitheater | - |
| tm-the-red-clay-strays-2027-gilford-vv177z_kgklli63o | The Red Clay Strays | refresh (applied) | 8300904 | https://www.ticketliquidator.com/tickets/8300904/The-Red-Clay-Strays-tickets-Sat-Jul-24-2027-Bank-of-New-Hampshire-Pavilion | - |
| tm-the-red-clay-strays-2027-canandaigua-k7vgf_ksrxvbm | The Red Clay Strays | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: The Red Clay Strays & St. Paul and The Broken Bones; text: The Red Clay Strays & St. Paul and The Broken Bones The Red Clay Strays & St. Paul and The Broken Bones /tickets/8300905/The-Red-Clay-Strays) |
| tm-the-red-clay-strays-2027-clarkston-vv17oz_kgkvl-rxl | The Red Clay Strays | refresh (applied) | 8300906 | https://www.ticketliquidator.com/tickets/8300906/The-Red-Clay-Strays-tickets-Sat-Jul-31-2027-Pine-Knob-Music-Theatre | - |
| tm-the-red-clay-strays-2027-berkeley-g5vyz_kir6nxo | The Red Clay Strays | refresh (applied) | 8300907 | https://www.ticketliquidator.com/tickets/8300907/The-Red-Clay-Strays-tickets-Thu-Aug-12-2027-Greek-Theatre-UC-Berkeley | - |
| tm-the-red-clay-strays-2027-bend-vvg1hz_kwvob2j | The Red Clay Strays | refresh (applied) | 8300908 | https://www.ticketliquidator.com/tickets/8300908/The-Red-Clay-Strays-tickets-Sat-Aug-21-2027-Hayden-Homes-Amphitheater | - |
| tm-the-red-clay-strays-2027-boise-g5vzz_kjqef3d | The Red Clay Strays | refresh (applied) | 8300909 | https://www.ticketliquidator.com/tickets/8300909/The-Red-Clay-Strays-tickets-Sun-Aug-22-2027-ExtraMile-Arena | - |
| tm-the-red-clay-strays-2027-rogers-g5viz_kuooawu | The Red Clay Strays | refresh (applied) | 8300910 | https://www.ticketliquidator.com/tickets/8300910/The-Red-Clay-Strays-tickets-Thu-Sep-9-2027-Walmart-AMP | - |
| tm-the-red-clay-strays-2027-corpus-christi-g5diz_ksvr9iw | The Red Clay Strays | refresh (applied) | 8300911 | https://www.ticketliquidator.com/tickets/8300911/The-Red-Clay-Strays-tickets-Sat-Sep-18-2027-Hilliard-Center-Arena | - |
| tm-the-red-clay-strays-2027-austin-g5diz_kmbauv1 | The Red Clay Strays | refresh (applied) | 8300912 | https://www.ticketliquidator.com/tickets/8300912/The-Red-Clay-Strays-tickets-Sun-Sep-19-2027-Moody-Center-ATX | - |
| tm-daughtry-2027-pine-bluff-g5viz_kyugjqo | Daughtry | refresh (applied) | 8295475 | https://www.ticketliquidator.com/tickets/8295475/Daughtry-tickets-Sat-Jan-23-2027-Saracen-Casino-Resort | - |
| tm-daughtry-2027-orlando-1kfovpgdga2huxq | Daughtry | refresh (applied) | 8295476 | https://www.ticketliquidator.com/tickets/8295476/Daughtry-tickets-Wed-Jan-27-2027-Hard-Rock-Live-Orlando | - |
| tm-daughtry-2027-biloxi-g5viz_ksbnt-6 | Daughtry | refresh (applied) | 8295477 | https://www.ticketliquidator.com/tickets/8295477/Daughtry-tickets-Sat-Jan-30-2027-Hard-Rock-Live-Mississippi | - |
| tm-daughtry-2027-houston-g5diz_kxwqqcm | Daughtry | refresh (applied) | 8295478 | https://www.ticketliquidator.com/tickets/8295478/Daughtry-tickets-Sun-Jan-31-2027-Bayou-Music-Center | - |
| tm-daughtry-2027-corpus-christi-g5diz_kxutltw | Daughtry | refresh (applied) | 8295479 | https://www.ticketliquidator.com/tickets/8295479/Daughtry-tickets-Tue-Feb-2-2027-Selena-Auditorium | - |
| tm-daughtry-2027-sacramento-g5vyz_k60xnfe | Daughtry | refresh (applied) | 8295481 | https://www.ticketliquidator.com/tickets/8295481/Daughtry-tickets-Mon-Feb-8-2027-Channel-24 | - |
| tm-daughtry-2027-denver-g5vzz_knzyqbr | Daughtry | refresh (applied) | 8295482 | https://www.ticketliquidator.com/tickets/8295482/Daughtry-tickets-Wed-Feb-10-2027-Paramount-Theatre-Denver | - |
| tm-daughtry-2027-durant-vvg1yz_kgp_ixc | Daughtry | refresh (applied) | 8295483 | https://www.ticketliquidator.com/tickets/8295483/Daughtry-tickets-Fri-Feb-12-2027-Choctaw-Casino-Resort-Durant | - |
| tm-daughtry-2027-saint-louis-vv1fvovpgtjkz75857 | Daughtry | refresh (applied) | 8295484 | https://www.ticketliquidator.com/tickets/8295484/Daughtry-tickets-Sat-Feb-13-2027-The-Pageant | - |
| tm-daughtry-2027-duluth-vv1akzkfmgkdcbe8w | Daughtry | refresh (applied) | 8295485 | https://www.ticketliquidator.com/tickets/8295485/Daughtry-tickets-Tue-Feb-16-2027-Symphony-Hall-At-DECC | - |
| tm-daughtry-2027-rockford-16e7z_kkfg7v38v | Daughtry | refresh (applied) | 8295486 | https://www.ticketliquidator.com/tickets/8295486/Daughtry-tickets-Sat-Feb-20-2027-Hard-Rock-Live-Rockford | - |
| tm-daughtry-2027-gary-vv1aazkfygkesuefr | Daughtry | refresh (applied) | 8295487 | https://www.ticketliquidator.com/tickets/8295487/Daughtry-tickets-Sun-Feb-21-2027-Hard-Rock-Live-Northern-Indiana | - |
| tm-daughtry-2027-detroit-vv1kezvpg_ga5zp8l | Daughtry | refresh (applied) | 8295488 | https://www.ticketliquidator.com/tickets/8295488/Daughtry-tickets-Tue-Feb-23-2027-The-Fillmore-Detroit | - |
| tm-daughtry-2027-hershey-vv1aezkfmgkdtwgls | Daughtry | refresh (applied) | 8295489 | https://www.ticketliquidator.com/tickets/8295489/Daughtry-tickets-Fri-Feb-26-2027-Hershey-Theatre | - |
| tm-daughtry-2027-bethlehem-vv1aovpg_ga5ljzy | Daughtry | refresh (applied) | 8295490 | https://www.ticketliquidator.com/tickets/8295490/Daughtry-tickets-Sat-Feb-27-2027-Wind-Creek-Event-Center | - |
| tm-daughtry-2027-charleston-g5evz_keoc7ae | Daughtry | refresh (applied) | 8295491 | https://www.ticketliquidator.com/tickets/8295491/Daughtry-tickets-Fri-Mar-5-2027-Charleston-Music-Hall | - |
| tm-daughtry-2027-nashville-g5viz_khosea- | Daughtry | refresh (applied) | 8295492 | https://www.ticketliquidator.com/tickets/8295492/Daughtry-tickets-Sat-Mar-6-2027-The-Truth | - |
| tm-daughtry-2027-atlanta-vvg1zz_klwyfxu | Daughtry | refresh (applied) | 8295494 | https://www.ticketliquidator.com/tickets/8295494/Daughtry-tickets-Sun-Mar-7-2027-The-Tabernacle-GA | - |
| tm-andrea-bocelli-2027-chorzow-z698xzqpz16v7kfvze | Andrea Bocelli | none | - | - | no qualifying listing (complete catalog checked) |
| tm-andrea-bocelli-2027-london-1adfz_kgkbcpkr9 | Andrea Bocelli | refresh (applied) | 8303548 | https://www.ticketliquidator.com/tickets/8303548/Andrea-Bocelli-tickets-Fri-Oct-1-2027-O2-Arena-London | - |
| tm-andrea-bocelli-2027-manchester-1amzkfzgkd7qkyk | Andrea Bocelli | refresh (applied) | 8293403 | https://www.ticketliquidator.com/tickets/8293403/Andrea-Bocelli-tickets-Tue-Oct-5-2027-Co-Op-Live | - |
| tm-blondshell-2027-vancouver-16ozkfzopzauakea | Blondshell | refresh (applied) | 8295784 | https://www.ticketliquidator.com/tickets/8295784/Blondshell-tickets-Sat-Mar-6-2027-Commodore-Ballroom | - |
| tm-blondshell-2027-asbury-park-k7vgf_knjlgim | Blondshell | refresh (applied) | 8295777 | https://www.ticketliquidator.com/tickets/8295777/Blondshell-tickets-Tue-Mar-23-2027-Stone-Pony | - |
| tm-blondshell-2027-madison-vv1kvyvpc_ga55f1w | Blondshell | refresh (applied) | 8295778 | https://www.ticketliquidator.com/tickets/8295778/Blondshell-tickets-Sat-May-15-2027-Majestic-Theatre-Madison | - |
| tm-blondshell-2027-detroit-vv1afzkfmgkdgjzny | Blondshell | refresh (applied) | 8295780 | https://www.ticketliquidator.com/tickets/8295780/Blondshell-tickets-Mon-May-17-2027-Saint-Andrews-Hall-Detroit | - |
| tm-blondshell-2027-saint-louis-vv1kbz_kjdg7cpvx | Blondshell | refresh (applied) | 8295782 | https://www.ticketliquidator.com/tickets/8295782/Blondshell-tickets-Sat-May-22-2027-Delmar-Hall | - |
| tm-death-cab-for-cutie-2027-detroit-z7r9jz1aaeefp | Death Cab for Cutie | refresh (applied) | 8271409 | https://www.ticketliquidator.com/tickets/8271409/Death-Cab-for-Cutie-tickets-Thu-Apr-1-2027-Masonic-Temple-Theatre | - |
| tm-hilary-duff-2027-sunrise-z7r9jz1aaeve7 | Hilary Duff | refresh (applied) | 8284543 | https://www.ticketliquidator.com/tickets/8284543/Hilary-Duff-tickets-Fri-Oct-1-2027-Amerant-Bank-Arena | - |
| tm-hilary-duff-2027-cleveland-z7r9jz1aaevea | Hilary Duff | refresh (applied) | 8284549 | https://www.ticketliquidator.com/tickets/8284549/Hilary-Duff-tickets-Wed-Oct-13-2027-Rocket-Arena | - |
| tm-hilary-duff-2027-des-moines-z7r9jz1aaevep | Hilary Duff | refresh (applied) | 8284569 | https://www.ticketliquidator.com/tickets/8284569/Hilary-Duff-tickets-Sun-Nov-14-2027-Caseys-Center | - |
| tm-hilary-duff-2027-anaheim-vv170z_kgkrlzqwi | Hilary Duff | refresh (applied) | 8301234 | https://www.ticketliquidator.com/tickets/8301234/Hilary-Duff-tickets-Sun-Nov-21-2027-Honda-Center | - |
| tm-lizzy-mcalpine-2027-torrensville-1akzkfggkepdplf | Lizzy McAlpine | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lizzy-mcalpine-2027-london-g5dzz_krvbn6w | Lizzy McAlpine | refresh (applied) | 8297685 | https://www.ticketliquidator.com/tickets/8297685/Lizzy-McAlpine-tickets-Wed-Mar-31-2027-O2-Academy-Brixton | - |
| tm-lizzy-mcalpine-2027-london-g5dzz_kslx95p | Lizzy McAlpine | refresh (applied) | 8297134 | https://www.ticketliquidator.com/tickets/8297134/Lizzy-McAlpine-tickets-Thu-Apr-1-2027-O2-Academy-Brixton | - |
| tm-lizzy-mcalpine-2027-london-g5dzz_kscgmsk | Lizzy McAlpine | refresh (applied) | 8299948 | https://www.ticketliquidator.com/tickets/8299948/Lizzy-McAlpine-tickets-Fri-Apr-2-2027-O2-Academy-Brixton | - |
| tm-lizzy-mcalpine-2027-birmingham-g5dzz_kkek096 | Lizzy McAlpine | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lizzy-mcalpine-2027-glasgow-g5dzz_kwtjarb | Lizzy McAlpine | refresh (applied) | 8299949 | https://www.ticketliquidator.com/tickets/8299949/Lizzy-McAlpine-tickets-Sat-Apr-10-2027-O2-Academy-Glasgow | - |
| tm-lizzy-mcalpine-2027-dallas-z7r9jz1aaekq3 | Lizzy McAlpine | refresh (applied) | 8287525 | https://www.ticketliquidator.com/tickets/8287525/Lizzy-McAlpine-tickets-Fri-Apr-30-2027-The-Bomb-Factory | - |
| tm-lizzy-mcalpine-2027-atlanta-z7r9jz1aaea-b | Lizzy McAlpine | refresh (applied) | 8300134 | https://www.ticketliquidator.com/tickets/8300134/Lizzy-McAlpine-tickets-Mon-May-3-2027-Fabulous-Fox-Theatre-Atlanta | - |
| tm-lizzy-mcalpine-2027-columbus-z7r9jz1aaea09 | Lizzy McAlpine | refresh (applied) | 8287526 | https://www.ticketliquidator.com/tickets/8287526/Lizzy-McAlpine-tickets-Thu-May-6-2027-Palace-Theatre-Columbus | - |
| tm-lizzy-mcalpine-2027-milwaukee-z7r9jz1aaea0_ | Lizzy McAlpine | refresh (applied) | 8287527 | https://www.ticketliquidator.com/tickets/8287527/Lizzy-McAlpine-tickets-Mon-May-10-2027-Riverside-Theater-WI | - |
| tm-lizzy-mcalpine-2027-minneapolis-vv1akzkfsgkdlgq7t | Lizzy McAlpine | refresh (applied) | 8300364 | https://www.ticketliquidator.com/tickets/8300364/Lizzy-McAlpine-tickets-Thu-May-13-2027-State-Theatre-MN | - |
| tm-lizzy-mcalpine-2027-kansas-city-z7r9jz1aaekqk | Lizzy McAlpine | refresh (applied) | 8287528 | https://www.ticketliquidator.com/tickets/8287528/Lizzy-McAlpine-tickets-Mon-May-17-2027-The-Midland-Theatre-MO | - |
| tm-lizzy-mcalpine-2027-oklahoma-city-z7r9jz1aaea-p | Lizzy McAlpine | refresh (applied) | 8287529 | https://www.ticketliquidator.com/tickets/8287529/Lizzy-McAlpine-tickets-Tue-May-18-2027-Thelma-Gaylord-PAT-At-Civic-Center-Music-Hall | - |
| tm-lizzy-mcalpine-2027-boston-vv1a8vpuzga1bypi | Lizzy McAlpine | refresh (applied) | 8298345 | https://www.ticketliquidator.com/tickets/8298345/Lizzy-McAlpine-tickets-Mon-Jun-21-2027-Agganis-Arena | - |
| tm-lizzy-mcalpine-2027-morrison-z7r9jz1aaeax6 | Lizzy McAlpine | refresh (applied) | 8287530 | https://www.ticketliquidator.com/tickets/8287530/Lizzy-McAlpine-tickets-Tue-Jul-6-2027-Red-Rocks-Amphitheatre | - |
| tm-dinosaur-jr-2027-philadelphia-z7r9jz1aavk18 | Dinosaur Jr. | refresh (applied) | 8326607 | https://www.ticketliquidator.com/tickets/8326607/Dinosaur-Jr-tickets-Sat-Feb-13-2027-Union-Transfer | - |
| tm-needtobreathe-2027-kansas-city-z7r9jz1aaek_i | NEEDTOBREATHE | refresh (applied) | 8291002 | https://www.ticketliquidator.com/tickets/8291002/Needtobreathe-tickets-Tue-Feb-23-2027-The-Midland-Theatre-MO | - |
| tm-needtobreathe-2027-lancaster-z7r9jz1aaek_t | NEEDTOBREATHE | refresh (applied) | 8291003 | https://www.ticketliquidator.com/tickets/8291003/Needtobreathe-tickets-Mon-Mar-1-2027-American-Music-Theatre | - |
| tm-the-lemonheads-2027-tampa-z7r9jz1aavwob | The Lemonheads | refresh (applied) | 8266209 | https://www.ticketliquidator.com/tickets/8266209/The-Lemonheads-tickets-Thu-Feb-18-2027-Orpheum-Tampa | - |
| tm-tommy-emmanuel-2027-vancouver-1aozkfugkdvinj7 | Tommy Emmanuel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tommy-emmanuel-2027-calgary-1k78vpuega13dcp | Tommy Emmanuel | refresh (applied) | 8318327 | https://www.ticketliquidator.com/tickets/8318327/Tommy-Emmanuel-tickets-Sun-Mar-14-2027-Southern-Alberta-Jubilee-Auditorium | - |
| tm-tommy-emmanuel-2027-winnipeg-1k78vpupga1vvti | Tommy Emmanuel | refresh (applied) | 8306364 | https://www.ticketliquidator.com/tickets/8306364/Tommy-Emmanuel-tickets-Wed-Mar-17-2027-Burton-Cummings-Theatre | - |
| tm-tommy-emmanuel-2027-ottawa-1aszkfgjd0vzecc | Tommy Emmanuel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tommy-emmanuel-2027-toronto-z7r9jz1aaeox3 | Tommy Emmanuel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-yacht-rock-revue-2027-jacksonville-z7r9jz1aaeebg | Yacht Rock Revue | refresh (applied) | 8284483 | https://www.ticketliquidator.com/tickets/8284483/Yacht-Rock-Revue-tickets-Fri-Jan-29-2027-Florida-Theatre-Jacksonville | - |
| tm-amble-2026-co-mayo-1abzkfugkd8w25a | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-amble-2026-co-mayo-1abzkfugkd8wl5u | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fantasia-2027-las-vegas-z7r9jz1aaef4j | Fantasia | refresh (applied) | 8294558 | https://www.ticketliquidator.com/tickets/8294558/The-Love-of-Soul-Tour-tickets-Sat-Apr-24-2027-MGM-Grand-Garden-Arena | - |
| tm-a-perfect-circle-2027-grand-prairie-z7r9jz1aae8a6 | A Perfect Circle | refresh (applied) | 8295092 | https://www.ticketliquidator.com/tickets/8295092/A-Perfect-Circle-tickets-Sat-May-8-2027-Texas-Trust-CU-Theatre-at-Grand-Prairie | - |
| tm-a-perfect-circle-2027-morrison-z7r9jz1aae8af | A Perfect Circle | refresh (applied) | 8295091 | https://www.ticketliquidator.com/tickets/8295091/A-Perfect-Circle-tickets-Thu-May-27-2027-Red-Rocks-Amphitheatre | - |
| tm-daughtry-2027-melbourne-z7r9jz1aae83v | Daughtry | refresh (applied) | 8295552 | https://www.ticketliquidator.com/tickets/8295552/Daughtry-tickets-Mon-Jan-25-2027-King-Center-For-The-Performing-Arts | - |
| tm-daughtry-2027-clearwater-z7r9jz1aae83e | Daughtry | refresh (applied) | 8295553 | https://www.ticketliquidator.com/tickets/8295553/Daughtry-tickets-Thu-Jan-28-2027-Ruth-Eckerd-Hall | - |
| tm-daughtry-2027-austin-z7r9jz1aae83d | Daughtry | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Daughtry; text: Daughtry Daughtry /tickets/8295554/Daughtry-tickets-Wed-Feb-3-2027-ACL-Live-At-The-Moody-Theater Daughtry Daughtry ACL Live At The Moody The) |
| tm-daughtry-2027-ventura-z7r9jz1aae837 | Daughtry | refresh (applied) | 8295480 | https://www.ticketliquidator.com/tickets/8295480/Daughtry-tickets-Sat-Feb-6-2027-Majestic-Ventura-Theatre | - |
| tm-daughtry-2027-cedar-rapids-z7r9jz1aae83a | Daughtry | refresh (applied) | 8295555 | https://www.ticketliquidator.com/tickets/8295555/Daughtry-tickets-Mon-Feb-15-2027-Paramount-Theatre-Cedar-Rapids | - |
| tm-daughtry-2027-eau-claire-z7r9jz1aae83k | Daughtry | refresh (applied) | 8295556 | https://www.ticketliquidator.com/tickets/8295556/Daughtry-tickets-Thu-Feb-18-2027-RCU-Theatre-At-Pablo-Center-at-the-Confluence | - |
| tm-daughtry-2027-orono-z7r9jz1aae836 | Daughtry | refresh (applied) | 8295558 | https://www.ticketliquidator.com/tickets/8295558/Daughtry-tickets-Mon-Mar-1-2027-Hutchins-Concert-Hall-At-Collins-Center-for-the-Arts | - |
| tm-daughtry-2027-charlottesville-z7r9jz1aae83f | Daughtry | refresh (applied) | 8295559 | https://www.ticketliquidator.com/tickets/8295559/Daughtry-tickets-Wed-Mar-3-2027-Paramount-Theater-Of-Charlottesville | - |
| tm-greta-van-fleet-2027-savannah-vvg1zz_kdabkfs | Greta Van Fleet | refresh (applied) | 8303343 | https://www.ticketliquidator.com/tickets/8303343/Greta-Van-Fleet-tickets-Wed-Feb-3-2027-Enmarket-Arena | - |
| tm-greta-van-fleet-2027-tampa-vvg1vz_kmcwtil | Greta Van Fleet | refresh (applied) | 8303344 | https://www.ticketliquidator.com/tickets/8303344/Greta-Van-Fleet-tickets-Fri-Feb-5-2027-Benchmark-International-Arena | - |
| tm-greta-van-fleet-2027-jacksonville-1aefz_kgkdyuafx | Greta Van Fleet | refresh (applied) | 8303345 | https://www.ticketliquidator.com/tickets/8303345/Greta-Van-Fleet-tickets-Sat-Feb-6-2027-VyStar-Veterans-Memorial-Arena | - |
| tm-greta-van-fleet-2027-atlanta-vvg1zz_kmneaip | Greta Van Fleet | refresh (applied) | 8303346 | https://www.ticketliquidator.com/tickets/8303346/Greta-Van-Fleet-tickets-Tue-Feb-9-2027-State-Farm-Arena-GA | - |
| tm-greta-van-fleet-2027-nashville-g5viz_kzhjzwy | Greta Van Fleet | refresh (applied) | 8303347 | https://www.ticketliquidator.com/tickets/8303347/Greta-Van-Fleet-tickets-Wed-Feb-10-2027-Bridgestone-Arena | - |
| tm-greta-van-fleet-2027-rosemont-vv178z_kgkmrjctr | Greta Van Fleet | refresh (applied) | 8303349 | https://www.ticketliquidator.com/tickets/8303349/Greta-Van-Fleet-tickets-Fri-Feb-12-2027-Allstate-Arena | - |
| tm-greta-van-fleet-2027-omaha-vv17bz_kgkmgzcnp | Greta Van Fleet | refresh (applied) | 8303350 | https://www.ticketliquidator.com/tickets/8303350/Greta-Van-Fleet-tickets-Sat-Feb-13-2027-CHI-Health-Center-Omaha | - |
| tm-greta-van-fleet-2027-minneapolis-vv17bz_kgku0ofzs | Greta Van Fleet | refresh (applied) | 8303351 | https://www.ticketliquidator.com/tickets/8303351/Greta-Van-Fleet-tickets-Mon-Feb-15-2027-Target-Center | - |
| tm-greta-van-fleet-2027-louisville-1avbz_kgkbymb5h | Greta Van Fleet | refresh (applied) | 8303353 | https://www.ticketliquidator.com/tickets/8303353/Greta-Van-Fleet-tickets-Fri-Feb-19-2027-KFC-Yum-Center | - |
| tm-greta-van-fleet-2027-pittsburgh-1avbz_kgkmosrsz | Greta Van Fleet | refresh (applied) | 8303354 | https://www.ticketliquidator.com/tickets/8303354/Greta-Van-Fleet-tickets-Sat-Feb-20-2027-PPG-Paints-Arena | - |
| tm-greta-van-fleet-2027-detroit-vv17oz_kgkwt_pf2 | Greta Van Fleet | refresh (applied) | 8303355 | https://www.ticketliquidator.com/tickets/8303355/Greta-Van-Fleet-tickets-Tue-Mar-2-2027-Little-Caesars-Arena | - |
| tm-greta-van-fleet-2027-boston-vv177z_kgknm09yr | Greta Van Fleet | refresh (applied) | 8303357 | https://www.ticketliquidator.com/tickets/8303357/Greta-Van-Fleet-tickets-Fri-Mar-5-2027-TD-Garden | - |
| tm-greta-van-fleet-2027-albany-k7vgf_kbmaa9o | Greta Van Fleet | refresh (applied) | 8303358 | https://www.ticketliquidator.com/tickets/8303358/Greta-Van-Fleet-tickets-Sat-Mar-6-2027-MVP-Arena | - |
| tm-greta-van-fleet-2027-brooklyn-1adzz_kgkljmams | Greta Van Fleet | refresh (applied) | 8303359 | https://www.ticketliquidator.com/tickets/8303359/Greta-Van-Fleet-tickets-Mon-Mar-8-2027-Barclays-Center | - |
| tm-greta-van-fleet-2027-philadelphia-1adzz_kgkv_zy6y | Greta Van Fleet | refresh (applied) | 8303360 | https://www.ticketliquidator.com/tickets/8303360/Greta-Van-Fleet-tickets-Wed-Mar-10-2027-Xfinity-Mobile-Arena | - |
| tm-greta-van-fleet-2027-charlotte-g5evz_kd5pkxs | Greta Van Fleet | refresh (applied) | 8303361 | https://www.ticketliquidator.com/tickets/8303361/Greta-Van-Fleet-tickets-Fri-Mar-12-2027-Spectrum-Center | - |
| tm-greta-van-fleet-2027-knoxville-g5viz_fat50pa | Greta Van Fleet | refresh (applied) | 8303362 | https://www.ticketliquidator.com/tickets/8303362/Greta-Van-Fleet-tickets-Sat-Mar-13-2027-Thompson-Boling-Arena-at-Food-City-Center | - |
| tm-greta-van-fleet-2027-fort-worth-vvg1yz_f6vci7r | Greta Van Fleet | refresh (applied) | 8303363 | https://www.ticketliquidator.com/tickets/8303363/Greta-Van-Fleet-tickets-Mon-Mar-15-2027-Ariat-Arena | - |
| tm-greta-van-fleet-2027-tulsa-1aezz_kgkdnv4sg | Greta Van Fleet | refresh (applied) | 8303364 | https://www.ticketliquidator.com/tickets/8303364/Greta-Van-Fleet-tickets-Tue-Mar-16-2027-BOK-Center | - |
| tm-greta-van-fleet-2027-anaheim-vv170z_kgkm7preh | Greta Van Fleet | refresh (applied) | 8303365 | https://www.ticketliquidator.com/tickets/8303365/Greta-Van-Fleet-tickets-Fri-Mar-19-2027-Honda-Center | - |
| tm-greta-van-fleet-2027-phoenix-1av0z_kgkbck9ok | Greta Van Fleet | refresh (applied) | 8303366 | https://www.ticketliquidator.com/tickets/8303366/Greta-Van-Fleet-tickets-Sat-Mar-20-2027-Mortgage-Matchup-Center | - |
| tm-greta-van-fleet-2027-reno-1avjz_kgkmchefe | Greta Van Fleet | refresh (applied) | 8303367 | https://www.ticketliquidator.com/tickets/8303367/Greta-Van-Fleet-tickets-Mon-Mar-22-2027-Reno-Events-Center | - |
| tm-greta-van-fleet-2027-seattle-vvg1hz_km-zrdh | Greta Van Fleet | refresh (applied) | 8303368 | https://www.ticketliquidator.com/tickets/8303368/Greta-Van-Fleet-tickets-Wed-Mar-24-2027-Climate-Pledge-Arena | - |
| tm-greta-van-fleet-2027-portland-vvg1hz_kle7js7 | Greta Van Fleet | refresh (applied) | 8303369 | https://www.ticketliquidator.com/tickets/8303369/Greta-Van-Fleet-tickets-Thu-Mar-25-2027-Moda-Center-at-the-Rose-Quarter | - |
| tm-greta-van-fleet-2027-boise-g5vzz_fkffj8x | Greta Van Fleet | refresh (applied) | 8303370 | https://www.ticketliquidator.com/tickets/8303370/Greta-Van-Fleet-tickets-Sat-Mar-27-2027-ExtraMile-Arena | - |
| tm-greta-van-fleet-2027-denver-g5vzz_kbjtioy | Greta Van Fleet | refresh (applied) | 8303372 | https://www.ticketliquidator.com/tickets/8303372/Greta-Van-Fleet-tickets-Tue-Mar-30-2027-Ball-Arena | - |
| tm-greta-van-fleet-2027-munich-z698xzc2z16v70efz3 | Greta Van Fleet | none | - | - | no qualifying listing (complete catalog checked) |
| tm-greta-van-fleet-2027-assago-zg9rmiynyz7k7a | Greta Van Fleet | none | - | - | no qualifying listing (complete catalog checked) |
| tm-greta-van-fleet-2027-hamburg-z698xzc2z1k83jea7 | Greta Van Fleet | none | - | - | no qualifying listing (complete catalog checked) |
| tm-greta-van-fleet-2027-berlin-z698xzc2z1kfv0zvs | Greta Van Fleet | none | - | - | no qualifying listing (complete catalog checked) |
| tm-greta-van-fleet-2027-amsterdam-z698xzbpz1kpzobgo | Greta Van Fleet | refresh (applied) | 8326626 | https://www.ticketliquidator.com/tickets/8326626/Greta-Van-Fleet-tickets-Mon-May-24-2027-Ziggo-Dome | - |
| tm-greta-van-fleet-2027-forest-brussels-z698xzg2z16ez30gvn | Greta Van Fleet | refresh (applied) | 8334422 | https://www.ticketliquidator.com/tickets/8334422/Greta-Van-Fleet-tickets-Tue-May-25-2027-Vorst-Nationaal | - |
| tm-greta-van-fleet-2027-london-1adfz_kgkmuet5g | Greta Van Fleet | refresh (applied) | 8314659 | https://www.ticketliquidator.com/tickets/8314659/Greta-Van-Fleet-tickets-Fri-May-28-2027-O2-Arena-London | - |
| tm-greta-van-fleet-2027-birmingham-1aegz_kgkmz0sov | Greta Van Fleet | none | - | - | no qualifying listing (complete catalog checked) |
| tm-greta-van-fleet-2027-manchester-1adjz_kgkbyud70 | Greta Van Fleet | refresh (applied) | 8303348 | https://www.ticketliquidator.com/tickets/8303348/Greta-Van-Fleet-tickets-Tue-Jun-1-2027-Co-Op-Live | - |
| tm-greta-van-fleet-2027-dublin-1abzkfmgkes3wyd | Greta Van Fleet | refresh (applied) | 8341562 | https://www.ticketliquidator.com/tickets/8341562/Greta-Van-Fleet-tickets-Fri-Jun-4-2027-3Arena-Dublin | - |
| tm-greta-van-fleet-2027-vancouver-1av7z_kgkw_ogty | Greta Van Fleet | refresh (applied) | 8303387 | https://www.ticketliquidator.com/tickets/8303387/Greta-Van-Fleet-tickets-Mon-Jul-5-2027-Rogers-Arena | - |
| tm-greta-van-fleet-2027-edmonton-1av7z_kgkmfujae | Greta Van Fleet | refresh (applied) | 8303388 | https://www.ticketliquidator.com/tickets/8303388/Greta-Van-Fleet-tickets-Wed-Jul-7-2027-Rogers-Place | - |
| tm-greta-van-fleet-2027-calgary-1av7z_kgkum7iwv | Greta Van Fleet | refresh (applied) | 8303389 | https://www.ticketliquidator.com/tickets/8303389/Greta-Van-Fleet-tickets-Thu-Jul-8-2027-Scotiabank-Saddledome | - |
| tm-greta-van-fleet-2027-winnipeg-1av7z_kgkmeitov | Greta Van Fleet | refresh (applied) | 8303390 | https://www.ticketliquidator.com/tickets/8303390/Greta-Van-Fleet-tickets-Sat-Jul-10-2027-Canada-Life-Centre | - |
| tm-greta-van-fleet-2027-kansas-city-vv1akzk4vgkdr0kg1 | Greta Van Fleet | refresh (applied) | 8303373 | https://www.ticketliquidator.com/tickets/8303373/Greta-Van-Fleet-tickets-Tue-Jul-13-2027-T-Mobile-Center | - |
| tm-greta-van-fleet-2027-saint-louis-vv17bz_kgkm_stkv | Greta Van Fleet | refresh (applied) | 8303374 | https://www.ticketliquidator.com/tickets/8303374/Greta-Van-Fleet-tickets-Wed-Jul-14-2027-Chaifetz-Arena | - |
| tm-greta-van-fleet-2027-columbus-vv1aazk4vgkexl1ix | Greta Van Fleet | refresh (applied) | 8303375 | https://www.ticketliquidator.com/tickets/8303375/Greta-Van-Fleet-tickets-Fri-Jul-16-2027-Nationwide-Arena | - |
| tm-greta-van-fleet-2027-noblesville-vv17fz_kgkmuku1m | Greta Van Fleet | refresh (applied) | 8303376 | https://www.ticketliquidator.com/tickets/8303376/Greta-Van-Fleet-tickets-Sat-Jul-17-2027-Ruoff-Music-Center | - |
| tm-greta-van-fleet-2027-raleigh-g5evz_f6z0uw6 | Greta Van Fleet | refresh (applied) | 8303377 | https://www.ticketliquidator.com/tickets/8303377/Greta-Van-Fleet-tickets-Tue-Jul-20-2027-Lenovo-Center | - |
| tm-greta-van-fleet-2027-columbia-1avfz_kgkss_xxt | Greta Van Fleet | refresh (applied) | 8303378 | https://www.ticketliquidator.com/tickets/8303378/Greta-Van-Fleet-tickets-Wed-Jul-21-2027-Merriweather-Post-Pavilion | - |
| tm-greta-van-fleet-2027-hershey-vv17fz_kgkdofs3p | Greta Van Fleet | refresh (applied) | 8303379 | https://www.ticketliquidator.com/tickets/8303379/Greta-Van-Fleet-tickets-Fri-Jul-23-2027-Giant-Center | - |
| tm-greta-van-fleet-2027-uncasville-g5vvz_kwzs711 | Greta Van Fleet | refresh (applied) | 8303380 | https://www.ticketliquidator.com/tickets/8303380/Greta-Van-Fleet-tickets-Sat-Jul-24-2027-Mohegan-Sun-Arena-CT | - |
| tm-greta-van-fleet-2027-gilford-vv177z_kgkni4das | Greta Van Fleet | refresh (applied) | 8303381 | https://www.ticketliquidator.com/tickets/8303381/Greta-Van-Fleet-tickets-Mon-Jul-26-2027-Bank-of-New-Hampshire-Pavilion | - |
| tm-greta-van-fleet-2027-laval-1ad7z_kgksakup4 | Greta Van Fleet | refresh (applied) | 8303391 | https://www.ticketliquidator.com/tickets/8303391/Greta-Van-Fleet-tickets-Wed-Jul-28-2027-Place-Bell | - |
| tm-greta-van-fleet-2027-toronto-1avzz_kgkswyehx | Greta Van Fleet | none | - | - | no qualifying listing (complete catalog checked) |
| tm-greta-van-fleet-2027-grand-rapids-vv17oz_kgkwlsfog | Greta Van Fleet | refresh (applied) | 8303382 | https://www.ticketliquidator.com/tickets/8303382/Greta-Van-Fleet-tickets-Sat-Jul-31-2027-Acrisure-Amphitheater | - |
| tm-fontaines-d-c-2026-london-1agzkfogkenxxaj | Fontaines D.C. | refresh (applied) | 8243623 | https://www.ticketliquidator.com/tickets/8243623/Fontaines-DC-tickets-Fri-Nov-27-2026-O2-Arena-London | - |
| tm-fontaines-d-c-2027-boston-vv1avzkfggkedosqi | Fontaines D.C. | refresh (applied) | 8303807 | https://www.ticketliquidator.com/tickets/8303807/Fontaines-DC-tickets-Fri-Apr-23-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-fontaines-d-c-2027-philadelphia-vv17fz_kgks-xsxp | Fontaines D.C. | refresh (applied) | 8303808 | https://www.ticketliquidator.com/tickets/8303808/Fontaines-DC-tickets-Sat-Apr-24-2027-Highmark-Skyline-Stage-at-The-Mann-Center-For-The-Performing-Arts | - |
| tm-fontaines-d-c-2027-detroit-vv17oz_kgksew9wu | Fontaines D.C. | refresh (applied) | 8303810 | https://www.ticketliquidator.com/tickets/8303810/Fontaines-DC-tickets-Tue-Apr-27-2027-Fox-Theatre-Detroit | - |
| tm-fontaines-d-c-2027-chicago-vv1k8z_fkfg7zjno | Fontaines D.C. | refresh (applied) | 8303811 | https://www.ticketliquidator.com/tickets/8303811/Fontaines-DC-tickets-Wed-Apr-28-2027-The-Salt-Shed-Outdoors-Chicago | - |
| tm-fontaines-d-c-2027-milwaukee-vv17jz_kgkloizcl | Fontaines D.C. | refresh (applied) | 8303812 | https://www.ticketliquidator.com/tickets/8303812/Fontaines-DC-tickets-Fri-Apr-30-2027-Landmark-Credit-Union-Live | - |
| tm-fontaines-d-c-2027-minneapolis-vv17bz_kgkijqu5x | Fontaines D.C. | refresh (applied) | 8303813 | https://www.ticketliquidator.com/tickets/8303813/Fontaines-DC-tickets-Sat-May-1-2027-The-Armory-Minneapolis | - |
| tm-fontaines-d-c-2027-vancouver-1av7z_kgkupzetr | Fontaines D.C. | refresh (applied) | 8303822 | https://www.ticketliquidator.com/tickets/8303822/Fontaines-DC-tickets-Wed-May-5-2027-UBC-Doug-Mitchell-Thunderbird-Sports-Centre | - |
| tm-fontaines-d-c-2027-seattle-vvg1hz_kbr3b0c | Fontaines D.C. | refresh (applied) | 8303814 | https://www.ticketliquidator.com/tickets/8303814/Fontaines-DC-tickets-Sat-May-8-2027-Wamu-Theater-At-Lumen-Field-Event-Center | - |
| tm-fontaines-d-c-2027-sacramento-g5vyz_kmgztid | Fontaines D.C. | refresh (applied) | 8303815 | https://www.ticketliquidator.com/tickets/8303815/Fontaines-DC-tickets-Tue-May-11-2027-Channel-24 | - |
| tm-fontaines-d-c-2027-san-francisco-g5vyz_k9cdguj | Fontaines D.C. | refresh (applied) | 8303816 | https://www.ticketliquidator.com/tickets/8303816/Fontaines-DC-tickets-Wed-May-12-2027-Bill-Graham-Civic-Auditorium | - |
| tm-fontaines-d-c-2027-milano-zg9rmiynyzd1ve | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-co-meath-1avoz_ogkwypefm | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-co-meath-1avoz_ogkw7fwfl | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-cardiff-g5vhz_oiinrjk | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-newcastle-upon-tyne-1adfz_ogkm3hlfk | Fontaines D.C. | refresh (applied) | 8271586 | https://www.ticketliquidator.com/tickets/8271586/Fontaines-DC-tickets-Thu-Jul-1-2027-St-James-Park | - |
| tm-fontaines-d-c-2027-manchester-g5dzz_omjzv0z | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-manchester-g5dzz_osdpprt | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-glasgow-1adbz_ogkrs74cl | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-london-1ku8vpf_ga19knu | Fontaines D.C. | refresh (applied) | 8264053 | https://www.ticketliquidator.com/tickets/8264053/Fontaines-DC-tickets-Fri-Jul-9-2027-London-Stadium-At-Queen-Elizabeth-Olympic-Park | - |
| tm-fontaines-d-c-2027-toronto-1avzz_kgkmdxopu | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-columbia-16vfz_fkag7mpc7 | Fontaines D.C. | refresh (applied) | 8303818 | https://www.ticketliquidator.com/tickets/8303818/Fontaines-DC-tickets-Thu-Sep-30-2027-Merriweather-Post-Pavilion | - |
| tm-fontaines-d-c-2027-atlanta-vvg1zz_keib7ia | Fontaines D.C. | refresh (applied) | 8303820 | https://www.ticketliquidator.com/tickets/8303820/Fontaines-DC-tickets-Fri-Oct-8-2027-Pinnacle-Amphitheater-at-Chastain-Park | - |
| tm-fontaines-d-c-2027-inglewood-vv1ke8vpuyga5p1et | Fontaines D.C. | refresh (applied) | 8303821 | https://www.ticketliquidator.com/tickets/8303821/Fontaines-DC-tickets-Fri-Oct-15-2027-The-Kia-Forum | - |
| tm-riley-green-2026-las-vegas-z7r9jz1a7peqa | Riley Green | refresh (applied) | 8018163 | https://www.ticketliquidator.com/tickets/8018163/Riley-Green-tickets-Sun-Dec-6-2026-The-Theatre-at-Resorts-World-Las-Vegas | - |
| tm-riley-green-2026-las-vegas-z7r9jz1a7peq7 | Riley Green | refresh (applied) | 8018164 | https://www.ticketliquidator.com/tickets/8018164/Riley-Green-tickets-Thu-Dec-10-2026-The-Theatre-at-Resorts-World-Las-Vegas | - |
| tm-riley-green-2027-spokane-z7r9jz1aaezrp | Riley Green | refresh (applied) | 8293121 | https://www.ticketliquidator.com/tickets/8293121/Riley-Green-tickets-Thu-Apr-1-2027-Numerica-Veterans-Arena | - |
| tm-riley-green-2027-seattle-vvg1hz_keoq4yp | Riley Green | refresh (applied) | 8293123 | https://www.ticketliquidator.com/tickets/8293123/Riley-Green-tickets-Fri-Apr-2-2027-Climate-Pledge-Arena | - |
| tm-riley-green-2027-eugene-vvg1hz_3divdk0 | Riley Green | refresh (applied) | 8293124 | https://www.ticketliquidator.com/tickets/8293124/Riley-Green-tickets-Sat-Apr-3-2027-Matthew-Knight-Arena | - |
| tm-riley-green-2027-edmonton-1av7z_3gkwgn0bp | Riley Green | refresh (applied) | 8293148 | https://www.ticketliquidator.com/tickets/8293148/Riley-Green-tickets-Thu-Apr-8-2027-Rogers-Place | - |
| tm-riley-green-2027-calgary-1aozkfygkderjem | Riley Green | refresh (applied) | 8293149 | https://www.ticketliquidator.com/tickets/8293149/Riley-Green-tickets-Fri-Apr-9-2027-Scotiabank-Saddledome | - |
| tm-riley-green-2027-saskatoon-1av7z_3gkdixvhi | Riley Green | refresh (applied) | 8293150 | https://www.ticketliquidator.com/tickets/8293150/Riley-Green-tickets-Sat-Apr-10-2027-SaskTel-Centre | - |
| tm-riley-green-2027-raleigh-g5evz_ke-2cfw | Riley Green | refresh (applied) | 8293125 | https://www.ticketliquidator.com/tickets/8293125/Riley-Green-tickets-Thu-Apr-29-2027-Coastal-Credit-Union-Music-Park-at-Walnut-Creek | - |
| tm-riley-green-2027-knoxville-g5viz_3wie3-p | Riley Green | refresh (applied) | 8293127 | https://www.ticketliquidator.com/tickets/8293127/Riley-Green-tickets-Fri-Apr-30-2027-Thompson-Boling-Arena-at-Food-City-Center | - |
| tm-riley-green-2027-greenville-g5evz_k14klik | Riley Green | refresh (applied) | 8293128 | https://www.ticketliquidator.com/tickets/8293128/Riley-Green-tickets-Sat-May-1-2027-Bon-Secours-Wellness-Arena | - |
| tm-riley-green-2027-fort-worth-vvg1yz_kepbp4s | Riley Green | refresh (applied) | 8293130 | https://www.ticketliquidator.com/tickets/8293130/Riley-Green-tickets-Thu-May-6-2027-Ariat-Arena | - |
| tm-riley-green-2027-wichita-vv1akzkfwgkdilqfv | Riley Green | refresh (applied) | 8293131 | https://www.ticketliquidator.com/tickets/8293131/Riley-Green-tickets-Fri-May-7-2027-INTRUST-Bank-Arena | - |
| tm-riley-green-2027-rogers-g5viz_k5ft6hv | Riley Green | refresh (applied) | 8293132 | https://www.ticketliquidator.com/tickets/8293132/Riley-Green-tickets-Sat-May-8-2027-Walmart-AMP | - |
| tm-riley-green-2027-tulsa-1aozkfsgkexhv7n | Riley Green | refresh (applied) | 8293133 | https://www.ticketliquidator.com/tickets/8293133/Riley-Green-tickets-Thu-May-20-2027-BOK-Center | - |
| tm-riley-green-2027-dallas-vvg1yz_k1h0ipi | Riley Green | refresh (applied) | 8293134 | https://www.ticketliquidator.com/tickets/8293134/Riley-Green-tickets-Fri-May-21-2027-Dos-Equis-Pavilion | - |
| tm-riley-green-2027-lafayette-g5viz_3r9l7s7 | Riley Green | refresh (applied) | 8293135 | https://www.ticketliquidator.com/tickets/8293135/Riley-Green-tickets-Sat-May-22-2027-Cajundome | - |
| tm-riley-green-2027-brandon-g5viz_3t3qkqr | Riley Green | refresh (applied) | 8293136 | https://www.ticketliquidator.com/tickets/8293136/Riley-Green-tickets-Thu-Jun-3-2027-Brandon-Amphitheater | - |
| tm-riley-green-2027-orange-beach-g5viz_kvcnsvm | Riley Green | refresh (applied) | 8293137 | https://www.ticketliquidator.com/tickets/8293137/Riley-Green-tickets-Fri-Jun-4-2027-The-Wharf-Amphitheatre | - |
| tm-riley-green-2027-orange-beach-g5viz_k5itlvp | Riley Green | refresh (applied) | 8300770 | https://www.ticketliquidator.com/tickets/8300770/Riley-Green-tickets-Sat-Jun-5-2027-The-Wharf-Amphitheatre | - |
| tm-riley-green-2027-mount-pleasant-z7r9jz1aaef_z | Riley Green | refresh (applied) | 8294259 | https://www.ticketliquidator.com/tickets/8294259/Riley-Green-tickets-Thu-Jun-10-2027-Outdoors-At-Soaring-Eagle-Casino-Resort | - |
| tm-riley-green-2027-toronto-1a8zkfwgkd5hci5 | Riley Green | none | - | - | no qualifying listing (complete catalog checked) |
| tm-riley-green-2027-toronto-1a8zkfwgkd5hxip | Riley Green | none | - | - | no qualifying listing (complete catalog checked) |
| tm-riley-green-2027-gilford-vv1avzkfsgke-elvi | Riley Green | refresh (applied) | 8293138 | https://www.ticketliquidator.com/tickets/8293138/Riley-Green-tickets-Fri-Jun-18-2027-Bank-of-New-Hampshire-Pavilion | - |
| tm-riley-green-2027-gilford-vv1avzkfsgkeipxy_ | Riley Green | refresh (applied) | 8300341 | https://www.ticketliquidator.com/tickets/8300341/Riley-Green-tickets-Sat-Jun-19-2027-Bank-of-New-Hampshire-Pavilion | - |
| tm-riley-green-2027-clarkston-vv1afzkfwgkdw_jcp | Riley Green | refresh (applied) | 8293140 | https://www.ticketliquidator.com/tickets/8293140/Riley-Green-tickets-Fri-Jun-25-2027-Pine-Knob-Music-Theatre | - |
| tm-riley-green-2027-clarkston-vv1afzkfygkenvgq1 | Riley Green | refresh (applied) | 8300342 | https://www.ticketliquidator.com/tickets/8300342/Riley-Green-tickets-Sat-Jun-26-2027-Pine-Knob-Music-Theatre | - |
| tm-riley-green-2027-syracuse-k7vgf_k1rwxjy | Riley Green | refresh (applied) | 8294264 | https://www.ticketliquidator.com/tickets/8294264/Riley-Green-tickets-Thu-Jul-15-2027-Empower-Federal-Credit-Union-Amphitheater-at-Lakeview | - |
| tm-riley-green-2027-allentown-1adzz_3gkdwsja0 | Riley Green | refresh (applied) | 8293141 | https://www.ticketliquidator.com/tickets/8293141/Riley-Green-tickets-Fri-Jul-16-2027-PPL-Center | - |
| tm-riley-green-2027-columbia-1a4zkfwgkdajcik | Riley Green | refresh (applied) | 8293142 | https://www.ticketliquidator.com/tickets/8293142/Riley-Green-tickets-Thu-Jul-22-2027-Merriweather-Post-Pavilion | - |
| tm-riley-green-2027-bethel-k7vgf_kkxvsto | Riley Green | refresh (applied) | 8293143 | https://www.ticketliquidator.com/tickets/8293143/Riley-Green-tickets-Fri-Jul-23-2027-Bethel-Woods-Center-For-The-Arts | - |
| tm-riley-green-2027-mansfield-vv1avzkfwgke0hynm | Riley Green | refresh (applied) | 8293144 | https://www.ticketliquidator.com/tickets/8293144/Riley-Green-tickets-Sat-Jul-24-2027-Xfinity-Center-MA | - |
| tm-riley-green-2027-evansville-vv16azkfwxpza8acgv | Riley Green | refresh (applied) | 8293145 | https://www.ticketliquidator.com/tickets/8293145/Riley-Green-tickets-Thu-Jul-29-2027-Ford-Center-IN | - |
| tm-riley-green-2027-maryland-heights-vv1fvovpgtqtz755aa | Riley Green | refresh (applied) | 8293146 | https://www.ticketliquidator.com/tickets/8293146/Riley-Green-tickets-Fri-Jul-30-2027-Hollywood-Casino-Amphitheatre-MO | - |
| tm-riley-green-2027-milwaukee-vv1a6zkfwgkdjdyhh | Riley Green | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Riley Green, Muscadine Bloodline, Jake Worthington & Hannah McFarland; text: Riley Green, Muscadine Bloodline, Jake Worthington & Hannah McFarland Riley Green, Muscadine Bloodline, Jake Worthington & Hannah McFarland ) |
| tm-hazlett-2027-eugene-z7r9jz1aaeojp | Hazlett | refresh (applied) | 8054862 | https://www.ticketliquidator.com/tickets/8054862/Hazlett-tickets-Sat-May-29-2027-Wow-Hall | - |
| tm-hazlett-2027-austin-g5diz_kepkpyq | Hazlett | refresh (applied) | 8054737 | https://www.ticketliquidator.com/tickets/8054737/Hazlett-tickets-Sat-Jun-12-2027-Scoot-Inn | - |
| tm-carly-rae-jepsen-2027-edmonton-1av7z_kgklarlu8 | Carly Rae Jepsen | refresh (applied) | 8300790 | https://www.ticketliquidator.com/tickets/8300790/Carly-Rae-Jepsen-tickets-Thu-Apr-15-2027-Northern-Alberta-Jubilee-Auditorium | - |
| tm-carly-rae-jepsen-2027-calgary-1av7z_kgkulm9f3 | Carly Rae Jepsen | refresh (applied) | 8300791 | https://www.ticketliquidator.com/tickets/8300791/Carly-Rae-Jepsen-tickets-Fri-Apr-16-2027-Grey-Eagle-Resort-Casino | - |
| tm-carly-rae-jepsen-2027-vancouver-1av7z_kgklk3dkw | Carly Rae Jepsen | refresh (applied) | 8300792 | https://www.ticketliquidator.com/tickets/8300792/Carly-Rae-Jepsen-tickets-Sun-Apr-18-2027-Orpheum-Theatre-Vancouver | - |
| tm-carly-rae-jepsen-2027-san-francisco-g5vyz_kdn9abg | Carly Rae Jepsen | refresh (applied) | 8300771 | https://www.ticketliquidator.com/tickets/8300771/Carly-Rae-Jepsen-tickets-Wed-Apr-21-2027-Bill-Graham-Civic-Auditorium | - |
| tm-carly-rae-jepsen-2027-inglewood-vv170z_kgkmkrrsm | Carly Rae Jepsen | refresh (applied) | 8300772 | https://www.ticketliquidator.com/tickets/8300772/Carly-Rae-Jepsen-tickets-Thu-Apr-22-2027-The-Kia-Forum | - |
| tm-carly-rae-jepsen-2027-san-diego-vvg1iz_kmdzlco | Carly Rae Jepsen | refresh (applied) | 8300773 | https://www.ticketliquidator.com/tickets/8300773/Carly-Rae-Jepsen-tickets-Fri-Apr-23-2027-Gallagher-Square-at-Petco-Park | - |
| tm-carly-rae-jepsen-2027-las-vegas-1avjz_kgksxz4qo | Carly Rae Jepsen | refresh (applied) | 8300776 | https://www.ticketliquidator.com/tickets/8300776/Carly-Rae-Jepsen-tickets-Fri-Apr-30-2027-The-Chelsea-The-Cosmopolitan-of-Las-Vegas | - |
| tm-carly-rae-jepsen-2027-phoenix-1kk8vpc_gacbk4n | Carly Rae Jepsen | refresh (applied) | 8300777 | https://www.ticketliquidator.com/tickets/8300777/Carly-Rae-Jepsen-tickets-Sat-May-1-2027-Arizona-Financial-Theatre | - |
| tm-carly-rae-jepsen-2027-irving-vvg1yz_kwbaerl | Carly Rae Jepsen | refresh (applied) | 8300778 | https://www.ticketliquidator.com/tickets/8300778/Carly-Rae-Jepsen-tickets-Wed-May-5-2027-The-Pavilion-at-Toyota-Music-Factory | - |
| tm-carly-rae-jepsen-2027-austin-g5diz_kbdqtji | Carly Rae Jepsen | refresh (applied) | 8300779 | https://www.ticketliquidator.com/tickets/8300779/Carly-Rae-Jepsen-tickets-Fri-May-7-2027-Moody-Amphitheater | - |
| tm-carly-rae-jepsen-2027-houston-g5diz_kbuz9jg | Carly Rae Jepsen | refresh (applied) | 8300780 | https://www.ticketliquidator.com/tickets/8300780/Carly-Rae-Jepsen-tickets-Sat-May-8-2027-713-Music-Hall | - |
| tm-carly-rae-jepsen-2027-nashville-g5viz_kdzypqh | Carly Rae Jepsen | refresh (applied) | 8300781 | https://www.ticketliquidator.com/tickets/8300781/Carly-Rae-Jepsen-tickets-Mon-May-10-2027-The-Truth | - |
| tm-carly-rae-jepsen-2027-atlanta-vvg1zz_kmrbzzs | Carly Rae Jepsen | refresh (applied) | 8300782 | https://www.ticketliquidator.com/tickets/8300782/Carly-Rae-Jepsen-tickets-Tue-May-11-2027-Coca-Cola-Roxy | - |
| tm-carly-rae-jepsen-2027-charlotte-g5evz_ksv1qq1 | Carly Rae Jepsen | refresh (applied) | 8300783 | https://www.ticketliquidator.com/tickets/8300783/Carly-Rae-Jepsen-tickets-Wed-May-12-2027-Skyla-Credit-Union-Amphitheatre | - |
| tm-carly-rae-jepsen-2027-washington-1avfz_kgkz-xcfn | Carly Rae Jepsen | refresh (applied) | 8300784 | https://www.ticketliquidator.com/tickets/8300784/Carly-Rae-Jepsen-tickets-Fri-May-14-2027-The-Anthem-DC | - |
| tm-carly-rae-jepsen-2027-new-york-g5diz_krvp7ot | Carly Rae Jepsen | refresh (applied) | 8300785 | https://www.ticketliquidator.com/tickets/8300785/Carly-Rae-Jepsen-tickets-Sat-May-15-2027-Madison-Square-Garden | - |
| tm-carly-rae-jepsen-2027-philadelphia-vv17fz_kgkmz_nj4 | Carly Rae Jepsen | refresh (applied) | 8300786 | https://www.ticketliquidator.com/tickets/8300786/Carly-Rae-Jepsen-tickets-Tue-May-18-2027-The-Met-Presented-by-Highmark | - |
| tm-carly-rae-jepsen-2027-boston-vv177z_kgklscrut | Carly Rae Jepsen | refresh (applied) | 8300787 | https://www.ticketliquidator.com/tickets/8300787/Carly-Rae-Jepsen-tickets-Wed-May-19-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-carly-rae-jepsen-2027-chicago-vv17jz_kgkbbdisc | Carly Rae Jepsen | refresh (applied) | 8300788 | https://www.ticketliquidator.com/tickets/8300788/Carly-Rae-Jepsen-tickets-Fri-May-21-2027-The-Chicago-Theatre | - |
| tm-carly-rae-jepsen-2027-detroit-vv17oz_kgkdnnigp | Carly Rae Jepsen | refresh (applied) | 8300789 | https://www.ticketliquidator.com/tickets/8300789/Carly-Rae-Jepsen-tickets-Sat-May-22-2027-Fox-Theatre-Detroit | - |
| tm-carly-rae-jepsen-2027-toronto-1avzz_kgkiawwxu | Carly Rae Jepsen | none | - | - | no qualifying listing (complete catalog checked) |
| tm-carly-rae-jepsen-2027-ottawa-1ad7z_kgkir7yjb | Carly Rae Jepsen | none | - | - | no qualifying listing (complete catalog checked) |
| tm-carly-rae-jepsen-2027-montreal-1ad7z_kgkumfj2g | Carly Rae Jepsen | refresh (applied) | 8300795 | https://www.ticketliquidator.com/tickets/8300795/Carly-Rae-Jepsen-tickets-Sat-May-29-2027-MTelus | - |
| tm-teddy-swims-2027-hamburg-z698xzc2z16vpvz6g3 | Teddy Swims | refresh (applied) | 8167507 | https://www.ticketliquidator.com/tickets/8167507/Teddy-Swims-tickets-Wed-Mar-10-2027-Barclays-Arena-Hamburg | - |
| tm-the-warning-2027-london-1adjz_3gknpoval | The Warning | refresh (applied) | 8309065 | https://www.ticketliquidator.com/tickets/8309065/The-Warning-tickets-Fri-Apr-2-2027-OVO-Arena-Wembley | - |
| tm-the-lemonheads-2027-englewood-z7r9jz1aavvvk | The Lemonheads | refresh (applied) | 8266228 | https://www.ticketliquidator.com/tickets/8266228/The-Lemonheads-tickets-Sun-Mar-14-2027-Gothic-Theatre | - |
| tm-haiden-henderson-2027-englewood-z7r9jz1aaevqs | Haiden Henderson | refresh (applied) | 8284336 | https://www.ticketliquidator.com/tickets/8284336/Haiden-Henderson-tickets-Sat-May-8-2027-Gothic-Theatre | - |
| tm-the-red-clay-strays-2027-lubbock-z7r9jz1aaef4t | The Red Clay Strays | refresh (applied) | 8304060 | https://www.ticketliquidator.com/tickets/8304060/The-Red-Clay-Strays-tickets-Thu-Apr-29-2027-Cooks-Garage | - |
| tm-pink-martini-2027-liverpool-g5vhz_fpr6w_w | Pink Martini | none | - | - | no qualifying listing (complete catalog checked) |
| tm-pink-martini-2027-edinburgh-1auzk4agkdmo6dj | Pink Martini | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-neighbourhood-2026-phoenix-16v0z_ac6g7w4dv | The Neighbourhood | refresh (applied) | 7748322 | https://www.ticketliquidator.com/tickets/7748322/The-Neighbourhood-tickets-Mon-Nov-30-2026-Mortgage-Matchup-Center | - |
| tm-the-neighbourhood-2026-san-francisco-g5vyz_a2kv6-_ | The Neighbourhood | refresh (applied) | 7748323 | https://www.ticketliquidator.com/tickets/7748323/The-Neighbourhood-tickets-Wed-Dec-2-2026-Bill-Graham-Civic-Auditorium | - |
| tm-the-neighbourhood-2026-inglewood-vv1aazkodgkdu9feo | The Neighbourhood | refresh (applied) | 7748324 | https://www.ticketliquidator.com/tickets/7748324/The-Neighbourhood-tickets-Fri-Dec-4-2026-The-Kia-Forum | - |
| tm-the-neighbourhood-2026-inglewood-vv1k0z_a8dg7vtxb | The Neighbourhood | refresh (applied) | 7896352 | https://www.ticketliquidator.com/tickets/7896352/The-Neighbourhood-tickets-Sat-Dec-5-2026-The-Kia-Forum | - |
| tm-staind-2027-manchester-vv177z_kgkbyj0rc | Staind | refresh (applied) | 8308766 | https://www.ticketliquidator.com/tickets/8308766/Staind-tickets-Thu-Mar-4-2027-SNHU-Arena | - |
| tm-staind-2027-baltimore-11a8vpokayf8vu | Staind | refresh (applied) | 8308767 | https://www.ticketliquidator.com/tickets/8308767/Staind-tickets-Sat-Mar-6-2027-CFG-Bank-Arena | - |
| tm-staind-2027-pittsburgh-1avbz_kgkdoccp7 | Staind | refresh (applied) | 8308768 | https://www.ticketliquidator.com/tickets/8308768/Staind-tickets-Mon-Mar-8-2027-PPG-Paints-Arena | - |
| tm-staind-2027-reading-vv1aezk4vgkeshnyh | Staind | refresh (applied) | 8308769 | https://www.ticketliquidator.com/tickets/8308769/Staind-tickets-Tue-Mar-9-2027-Santander-Arena | - |
| tm-staind-2027-huntington-1kaovp8iga2ivff | Staind | refresh (applied) | 8308770 | https://www.ticketliquidator.com/tickets/8308770/Staind-tickets-Wed-Mar-10-2027-Marshall-Health-Network-Arena | - |
| tm-staind-2027-tampa-vvg1vz_f6ermdd | Staind | refresh (applied) | 8308771 | https://www.ticketliquidator.com/tickets/8308771/Staind-tickets-Fri-Mar-12-2027-Benchmark-International-Arena | - |
| tm-staind-2027-west-palm-beach-vvg1vz_kdb8l2e | Staind | refresh (applied) | 8308772 | https://www.ticketliquidator.com/tickets/8308772/Staind-tickets-Sat-Mar-13-2027-iTHINK-Financial-Amphitheatre | - |
| tm-staind-2027-birmingham-1aozk4vgkdpep6o | Staind | refresh (applied) | 8308773 | https://www.ticketliquidator.com/tickets/8308773/Staind-tickets-Tue-Mar-16-2027-Legacy-Arena-at-The-BJCC | - |
| tm-staind-2027-oklahoma-city-vvg1yz_kb9ngdb | Staind | refresh (applied) | 8308774 | https://www.ticketliquidator.com/tickets/8308774/Staind-tickets-Thu-Mar-18-2027-Paycom-Center | - |
| tm-staind-2027-dallas-vvg1yz_ffb7hxs | Staind | refresh (applied) | 8308775 | https://www.ticketliquidator.com/tickets/8308775/Staind-tickets-Fri-Mar-19-2027-Dos-Equis-Pavilion | - |
| tm-staind-2027-san-antonio-g5diz_fkhzhba | Staind | refresh (applied) | 8308776 | https://www.ticketliquidator.com/tickets/8308776/Staind-tickets-Sat-Mar-20-2027-Frost-Bank-Center | - |
| tm-staind-2027-denver-g5vzz_f7kx5yq | Staind | refresh (applied) | 8308777 | https://www.ticketliquidator.com/tickets/8308777/Staind-tickets-Mon-Mar-22-2027-Ball-Arena | - |
| tm-staind-2027-boise-g5vzz_kb7mfuo | Staind | refresh (applied) | 8308778 | https://www.ticketliquidator.com/tickets/8308778/Staind-tickets-Wed-Mar-24-2027-ExtraMile-Arena | - |
| tm-staind-2027-seattle-vvg1hz_km9huyk | Staind | refresh (applied) | 8308781 | https://www.ticketliquidator.com/tickets/8308781/Staind-tickets-Sat-Mar-27-2027-Climate-Pledge-Arena | - |
| tm-staind-2027-vancouver-1aozk4egkdceqzp | Staind | refresh (applied) | 8308793 | https://www.ticketliquidator.com/tickets/8308793/Staind-tickets-Mon-Mar-29-2027-Rogers-Arena | - |
| tm-staind-2027-calgary-1av7z_kgkm-emew | Staind | refresh (applied) | 8308794 | https://www.ticketliquidator.com/tickets/8308794/Staind-tickets-Wed-Mar-31-2027-Scotiabank-Saddledome | - |
| tm-staind-2027-edmonton-1av7z_kgkz_xe9- | Staind | refresh (applied) | 8308795 | https://www.ticketliquidator.com/tickets/8308795/Staind-tickets-Thu-Apr-1-2027-Rogers-Place | - |
| tm-staind-2027-sioux-falls-vv1akzk4vgkd8j7ov | Staind | refresh (applied) | 8308785 | https://www.ticketliquidator.com/tickets/8308785/Staind-tickets-Tue-Apr-6-2027-Denny-Sanford-Premier-Center | - |
| tm-staind-2027-fargo-vv17bz_kgkuwy5mz | Staind | refresh (applied) | 8308786 | https://www.ticketliquidator.com/tickets/8308786/Staind-tickets-Wed-Apr-7-2027-Fargodome | - |
| tm-staind-2027-omaha-vv1kvovp8tga5iapt | Staind | refresh (applied) | 8308787 | https://www.ticketliquidator.com/tickets/8308787/Staind-tickets-Fri-Apr-9-2027-CHI-Health-Center-Omaha | - |
| tm-staind-2027-kansas-city-vv1akzk4vgkegdrbt | Staind | refresh (applied) | 8308788 | https://www.ticketliquidator.com/tickets/8308788/Staind-tickets-Sat-Apr-10-2027-T-Mobile-Center | - |
| tm-staind-2027-moline-vv1fbz_fkec7zdga1 | Staind | refresh (applied) | 8308789 | https://www.ticketliquidator.com/tickets/8308789/Staind-tickets-Sun-Apr-11-2027-Vibrant-Arena-at-The-MARK | - |
| tm-staind-2027-grand-rapids-vv17oz_kgkmqeain | Staind | refresh (applied) | 8308790 | https://www.ticketliquidator.com/tickets/8308790/Staind-tickets-Tue-Apr-13-2027-Van-Andel-Arena | - |
| tm-staind-2027-evansville-vv17fz_kgkd3hr7l | Staind | refresh (applied) | 8308791 | https://www.ticketliquidator.com/tickets/8308791/Staind-tickets-Wed-Apr-14-2027-Ford-Center-IN | - |
| tm-dylan-gossett-2026-brisbane-177yv0g61tezlg8 | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch; listing: Dylan Gossett; text: Dylan Gossett Dylan Gossett /tickets/8174204/Dylan-Gossett-tickets-Sat-Dec-5-2026-The-Fortitude-Music-Hall Dylan Gossett Dylan Gossett The F) |
| tm-dylan-gossett-2026-sydney-177yv0g655_-4r3 | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-gossett-2026-west-melbourne-177yv0g653cuwz_ | Dylan Gossett | refresh (applied) | 8369706 | https://www.ticketliquidator.com/tickets/8369706/Dylan-Gossett-tickets-Tue-Dec-8-2026-Festival-Hall-Melbourne | - |
| tm-dylan-gossett-2027-london-g5dzz_8kn_3tz | Dylan Gossett | refresh (applied) | 8324860 | https://www.ticketliquidator.com/tickets/8324860/Dylan-Gossett-tickets-Thu-Feb-18-2027-O2-Academy-Brixton | - |
| tm-dylan-gossett-2027-manchester-g5dzz_8hqwevt | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-gossett-2027-birmingham-g5dzz_83l8ohz | Dylan Gossett | refresh (applied) | 8265884 | https://www.ticketliquidator.com/tickets/8265884/Dylan-Gossett-tickets-Sun-Feb-21-2027-O2-Academy-Birmingham | - |
| tm-dylan-gossett-2027-glasgow-g5dzz_8pg5sb3 | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-gossett-2027-glasgow-g5dzz_8qwdoqp | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-gossett-2027-dublin-17kzv0g62wo552g | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-gossett-2027-charleston-g5evz_kdp4j6z | Dylan Gossett | refresh (applied) | 8303651 | https://www.ticketliquidator.com/tickets/8303651/Dylan-Gossett-tickets-Thu-Mar-25-2027-Charleston-Music-Hall | - |
| tm-dylan-gossett-2027-north-myrtle-beach-g5evz_kuxkrl8 | Dylan Gossett | refresh (applied) | 8303652 | https://www.ticketliquidator.com/tickets/8303652/Dylan-Gossett-tickets-Fri-Mar-26-2027-House-Of-Blues-Myrtle-Beach | - |
| tm-dylan-gossett-2027-charlotte-g5evz_kb2iepf | Dylan Gossett | refresh (applied) | 8303653 | https://www.ticketliquidator.com/tickets/8303653/Dylan-Gossett-tickets-Sat-Mar-27-2027-The-Fillmore-Charlotte | - |
| tm-dylan-gossett-2027-chattanooga-z7r9jz1aae4bi | Dylan Gossett | refresh (applied) | 8307109 | https://www.ticketliquidator.com/tickets/8307109/Dylan-Gossett-tickets-Tue-Mar-30-2027-The-Signal-TN | - |
| tm-dylan-gossett-2027-saint-louis-1ae7z_kgkyeggq8 | Dylan Gossett | refresh (applied) | 8303654 | https://www.ticketliquidator.com/tickets/8303654/Dylan-Gossett-tickets-Wed-Mar-31-2027-The-Factory-Chesterfield | - |
| tm-dylan-gossett-2027-fayetteville-z7r9jz1aae4bt | Dylan Gossett | refresh (applied) | 8304295 | https://www.ticketliquidator.com/tickets/8304295/Dylan-Gossett-tickets-Fri-Apr-2-2027-Ozark-Music-Hall | - |
| tm-dylan-gossett-2027-memphis-g5viz_f659_2b | Dylan Gossett | refresh (applied) | 8303655 | https://www.ticketliquidator.com/tickets/8303655/Dylan-Gossett-tickets-Sat-Apr-3-2027-Satellite-Music-Hall | - |
| tm-dylan-gossett-2027-birmingham-1aezz_kgkbdr7ks | Dylan Gossett | refresh (applied) | 8303656 | https://www.ticketliquidator.com/tickets/8303656/Dylan-Gossett-tickets-Sun-Apr-4-2027-Avondale-Brewing-Company | - |
| tm-dylan-gossett-2027-philadelphia-vv17fz_kgkmvqdsy | Dylan Gossett | refresh (applied) | 8303657 | https://www.ticketliquidator.com/tickets/8303657/Dylan-Gossett-tickets-Tue-Apr-6-2027-The-Met-Presented-by-Highmark | - |
| tm-dylan-gossett-2027-baltimore-1avfz_kgkbht6mj | Dylan Gossett | refresh (applied) | 8303658 | https://www.ticketliquidator.com/tickets/8303658/Dylan-Gossett-tickets-Wed-Apr-7-2027-The-Paramount-Baltimore | - |
| tm-dylan-gossett-2027-columbus-z7r9jz1aae4by | Dylan Gossett | refresh (applied) | 8307089 | https://www.ticketliquidator.com/tickets/8307089/Dylan-Gossett-tickets-Thu-Apr-8-2027-KEMBA-Live | - |
| tm-dylan-gossett-2027-detroit-vv17oz_kgkub0uhh | Dylan Gossett | refresh (applied) | 8303659 | https://www.ticketliquidator.com/tickets/8303659/Dylan-Gossett-tickets-Sat-Apr-10-2027-The-Fillmore-Detroit | - |
| tm-dylan-gossett-2027-grand-rapids-vv17oz_kgkubfkdd | Dylan Gossett | refresh (applied) | 8303660 | https://www.ticketliquidator.com/tickets/8303660/Dylan-Gossett-tickets-Sun-Apr-11-2027-GLC-Live-at-20-Monroe | - |
| tm-dylan-gossett-2027-indianapolis-vv17fz_kgkd3hmfo | Dylan Gossett | refresh (applied) | 8303661 | https://www.ticketliquidator.com/tickets/8303661/Dylan-Gossett-tickets-Tue-May-4-2027-Egyptian-Room-At-Old-National-Centre | - |
| tm-dylan-gossett-2027-madison-vv17jz_kgkmgwnt1 | Dylan Gossett | refresh (applied) | 8303662 | https://www.ticketliquidator.com/tickets/8303662/Dylan-Gossett-tickets-Thu-May-6-2027-The-Sylvee-WI | - |
| tm-dylan-gossett-2027-kansas-city-vv17bz_kgkwikfde | Dylan Gossett | refresh (applied) | 8303663 | https://www.ticketliquidator.com/tickets/8303663/Dylan-Gossett-tickets-Fri-May-7-2027-Uptown-Theater-KC | - |
| tm-dylan-gossett-2027-la-vista-1aezz_kgkwpxe_0 | Dylan Gossett | refresh (applied) | 8303664 | https://www.ticketliquidator.com/tickets/8303664/Dylan-Gossett-tickets-Sat-May-8-2027-The-Astro-NE | - |
| tm-dylan-gossett-2027-austin-g5diz_fkdqvvu | Dylan Gossett | refresh (applied) | 8303665 | https://www.ticketliquidator.com/tickets/8303665/Dylan-Gossett-tickets-Thu-May-13-2027-Moody-Amphitheater | - |
| tm-dylan-gossett-2027-houston-g5diz_kmyuwxg | Dylan Gossett | refresh (applied) | 8303666 | https://www.ticketliquidator.com/tickets/8303666/Dylan-Gossett-tickets-Fri-May-14-2027-Bayou-Music-Center | - |
| tm-dylan-gossett-2027-fort-worth-z7r9jz1aae4bs | Dylan Gossett | refresh (applied) | 8307091 | https://www.ticketliquidator.com/tickets/8307091/Dylan-Gossett-tickets-Sat-May-15-2027-Billy-Bobs | - |
| tm-dylan-gossett-2027-oklahoma-city-z7r9jz1aae4ba | Dylan Gossett | refresh (applied) | 8303667 | https://www.ticketliquidator.com/tickets/8303667/Dylan-Gossett-tickets-Thu-May-20-2027-The-Criterion-Oklahoma-City | - |
| tm-dylan-gossett-2027-tulsa-z7r9jz1aae4bw | Dylan Gossett | refresh (applied) | 8305605 | https://www.ticketliquidator.com/tickets/8305605/Dylan-Gossett-tickets-Fri-May-21-2027-Cains-Ballroom | - |
| tm-flans-2027-el-paso-vvg1yz_kdaklj7 | Flans | refresh (applied) | 8289129 | https://www.ticketliquidator.com/tickets/8289129/Flans-tickets-Fri-Feb-12-2027-The-Plaza-Theatre-El-Paso | - |
| tm-flans-2027-tucson-1av0z_3gkbvrkjg | Flans | refresh (applied) | 8289130 | https://www.ticketliquidator.com/tickets/8289130/Flans-tickets-Sat-Feb-13-2027-The-Linda-Ronstadt-Music-Hall-At-Tucson-Convention-Center | - |
| tm-flans-2027-atlanta-vvg1zz_k5zjmuk | Flans | refresh (applied) | 8289131 | https://www.ticketliquidator.com/tickets/8289131/Flans-tickets-Thu-Feb-25-2027-Cobb-Energy-Performing-Arts-Centre | - |
| tm-flans-2027-charlotte-g5evz_3xf-_ej | Flans | refresh (applied) | 8289132 | https://www.ticketliquidator.com/tickets/8289132/Flans-tickets-Fri-Feb-26-2027-Ovens-Auditorium | - |
| tm-flans-2027-raleigh-g5evz_k_sqdn_ | Flans | refresh (applied) | 8289133 | https://www.ticketliquidator.com/tickets/8289133/Flans-tickets-Sat-Feb-27-2027-Raleigh-Memorial-Auditorium-At-Martin-Marietta-Center-for-the-Performing-Arts | - |
| tm-flans-2027-denver-g5vzz_kk90pao | Flans | refresh (applied) | 8289134 | https://www.ticketliquidator.com/tickets/8289134/Flans-tickets-Thu-Mar-4-2027-Paramount-Theatre-Denver | - |
| tm-flans-2027-kansas-city-z7r9jz1aaevrv | Flans | refresh (applied) | 8288706 | https://www.ticketliquidator.com/tickets/8288706/Flans-tickets-Fri-Mar-5-2027-The-Midland-Theatre-MO | - |
| tm-flans-2027-san-diego-vvg1iz_3rf4hkp | Flans | refresh (applied) | 8289135 | https://www.ticketliquidator.com/tickets/8289135/Flans-tickets-Fri-Mar-12-2027-San-Diego-Civic-Theatre | - |
| tm-flans-2027-los-angeles-vv1aazkfsgkdiitze | Flans | refresh (applied) | 8289136 | https://www.ticketliquidator.com/tickets/8289136/Flans-tickets-Sun-Mar-14-2027-Orpheum-Theatre-Los-Angeles | - |
| tm-flans-2027-houston-g5diz_k6-kevr | Flans | refresh (applied) | 8289137 | https://www.ticketliquidator.com/tickets/8289137/Flans-tickets-Sat-May-29-2027-Houston-Arena-Theatre | - |
| tm-flans-2027-mcallen-g5diz_3wgxkbw | Flans | refresh (applied) | 8289138 | https://www.ticketliquidator.com/tickets/8289138/Flans-tickets-Sun-May-30-2027-McAllen-Performing-Arts-Center | - |
| tm-flans-2027-san-jose-g5vyz_k6lhlxq | Flans | refresh (applied) | 8289139 | https://www.ticketliquidator.com/tickets/8289139/Flans-tickets-Thu-Jun-3-2027-San-Jose-Civic | - |
| tm-warren-zeiders-2027-orlando-1axzk4vgkenxkjc | Warren Zeiders | refresh (applied) | 8307486 | https://www.ticketliquidator.com/tickets/8307486/Warren-Zeiders-tickets-Thu-Mar-25-2027-House-Of-Blues-Orlando | - |
| tm-warren-zeiders-2027-hollywood-vvg1vz_fkapkzq | Warren Zeiders | refresh (applied) | 8307487 | https://www.ticketliquidator.com/tickets/8307487/Warren-Zeiders-tickets-Fri-Mar-26-2027-Hard-Rock-Live-At-The-Seminole-Hard-Rock-Hotel-Casino-Hollywood | - |
| tm-warren-zeiders-2027-waukee-1ae7z_kgkdkgpa5 | Warren Zeiders | refresh (applied) | 8307488 | https://www.ticketliquidator.com/tickets/8307488/Warren-Zeiders-tickets-Fri-Apr-2-2027-Vibrant-Music-Hall | - |
| tm-warren-zeiders-2027-grand-rapids-vv1afzk4vgkeyak2y | Warren Zeiders | refresh (applied) | 8307489 | https://www.ticketliquidator.com/tickets/8307489/Warren-Zeiders-tickets-Thu-Apr-15-2027-GLC-Live-at-20-Monroe | - |
| tm-warren-zeiders-2027-chicago-vv1k8z_f1pg7v9f6 | Warren Zeiders | refresh (applied) | 8307491 | https://www.ticketliquidator.com/tickets/8307491/Warren-Zeiders-tickets-Sat-Apr-17-2027-The-Salt-Shed-Indoors-Chicago | - |
| tm-warren-zeiders-2027-philadelphia-vv17fz_kgkmdo0cj | Warren Zeiders | refresh (applied) | 8307492 | https://www.ticketliquidator.com/tickets/8307492/Warren-Zeiders-tickets-Thu-Apr-22-2027-The-Met-Presented-by-Highmark | - |
| tm-warren-zeiders-2027-pittsburgh-1apzk4vgkd7rttm | Warren Zeiders | refresh (applied) | 8307493 | https://www.ticketliquidator.com/tickets/8307493/Warren-Zeiders-tickets-Fri-Apr-23-2027-Citizens-Live-at-The-Wylie | - |
| tm-warren-zeiders-2027-cincinnati-1avbz_kgkbydi6_ | Warren Zeiders | refresh (applied) | 8307494 | https://www.ticketliquidator.com/tickets/8307494/Warren-Zeiders-tickets-Sat-Apr-24-2027-The-Andrew-J-Brady-ICON-Music-Center | - |
| tm-warren-zeiders-2027-columbia-g5evz_kbmywhz | Warren Zeiders | refresh (applied) | 8307495 | https://www.ticketliquidator.com/tickets/8307495/Warren-Zeiders-tickets-Thu-Apr-29-2027-Township-Auditorium | - |
| tm-warren-zeiders-2027-atlanta-vvg1zz_f6dz4ap | Warren Zeiders | refresh (applied) | 8307496 | https://www.ticketliquidator.com/tickets/8307496/Warren-Zeiders-tickets-Fri-Apr-30-2027-Coca-Cola-Roxy | - |
| tm-john-summit-2027-warsaw-z698xzqpz16eva44jn | John Summit | refresh (applied) | 8310401 | https://www.ticketliquidator.com/tickets/8310401/John-Summit-tickets-Thu-Feb-11-2027-Arena-COS-Torwar | - |
| tm-john-summit-2027-forest-brussels-z698xzg2z1kfkv_0g | John Summit | refresh (applied) | 8310402 | https://www.ticketliquidator.com/tickets/8310402/John-Summit-tickets-Fri-Feb-12-2027-Vorst-Nationaal | - |
| tm-john-summit-2027-amsterdam-z698xzbpz16vu0fx-w | John Summit | refresh (applied) | 8310259 | https://www.ticketliquidator.com/tickets/8310259/John-Summit-tickets-Sat-Feb-13-2027-Ziggo-Dome | - |
| tm-john-summit-2027-london-1agzk4egkdwrmjf | John Summit | refresh (applied) | 8310113 | https://www.ticketliquidator.com/tickets/8310113/John-Summit-tickets-Sat-Feb-27-2027-The-Bubble-Exhibition-Space-at-the-O2 | - |
| tm-pink-martini-2027-london-g5vhz_fqbbwez | Pink Martini | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-salt-lake-city-z7r9jz1aaeefa | Haiden Henderson | refresh (applied) | 8284335 | https://www.ticketliquidator.com/tickets/8284335/Haiden-Henderson-tickets-Thu-May-6-2027-The-Grand-At-The-Complex | - |
| tm-the-red-clay-strays-2027-los-angeles-z7r9jz1aaek0t | The Red Clay Strays | refresh (applied) | 8301035 | https://www.ticketliquidator.com/tickets/8301035/The-Red-Clay-Strays-tickets-Tue-Aug-17-2027-Greek-Theatre-Los-Angeles-CA | - |
| tm-carly-rae-jepsen-2027-toronto-1a8zk47gkd65fpy | Carly Rae Jepsen | none | - | - | no qualifying listing (complete catalog checked) |
| tm-flans-2027-grand-prairie-z7r9jz1aaeaoe | Flans | refresh (applied) | 8294749 | https://www.ticketliquidator.com/tickets/8294749/Flans-tickets-Fri-May-28-2027-Texas-Trust-CU-Theatre-at-Grand-Prairie | - |
| tm-death-cab-for-cutie-2027-huntsville-z7r9jz1aavu_y | Death Cab for Cutie | refresh (applied) | 8271408 | https://www.ticketliquidator.com/tickets/8271408/Death-Cab-for-Cutie-tickets-Sat-Mar-27-2027-The-Orion-Amphitheater | - |
| tm-the-lemonheads-2027-omaha-z7r9jz1aavv7w | The Lemonheads | refresh (applied) | 8266229 | https://www.ticketliquidator.com/tickets/8266229/The-Lemonheads-tickets-Tue-Mar-16-2027-The-Waiting-Room-Lounge-NE | - |
| tm-fontaines-d-c-2027-boston-vv1avzkfggkedloqr | Fontaines D.C. | refresh (applied) | 8310408 | https://www.ticketliquidator.com/tickets/8310408/Fontaines-DC-tickets-Thu-Apr-22-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-fontaines-d-c-2027-vancouver-1aozk4v0aa_zegf | Fontaines D.C. | refresh (applied) | 8313478 | https://www.ticketliquidator.com/tickets/8313478/Fontaines-DC-tickets-Thu-May-6-2027-UBC-Doug-Mitchell-Thunderbird-Sports-Centre | - |
| tm-death-cab-for-cutie-2027-dallas-z7r9jz1aavuug | Death Cab for Cutie | refresh (applied) | 8271405 | https://www.ticketliquidator.com/tickets/8271405/Death-Cab-for-Cutie-tickets-Wed-Mar-24-2027-The-Bomb-Factory | - |
| tm-too-many-zooz-2027-portland-z7r9jz1aaeerf | Too Many Zooz | refresh (applied) | 8284750 | https://www.ticketliquidator.com/tickets/8284750/Too-Many-Zooz-tickets-Thu-May-13-2027-Revolution-Hall-Portland | - |
| tm-the-red-clay-strays-2027-cleveland-z7r9jz1aaefgw | The Red Clay Strays | refresh (applied) | 8301705 | https://www.ticketliquidator.com/tickets/8301705/The-Red-Clay-Strays-tickets-Thu-Feb-4-2027-Rocket-Arena | - |
| tm-carly-rae-jepsen-2027-portland-z7r9jz1aaekuy | Carly Rae Jepsen | refresh (applied) | 8300380 | https://www.ticketliquidator.com/tickets/8300380/Carly-Rae-Jepsen-tickets-Mon-Apr-19-2027-Arlene-Schnitzer-Concert-Hall | - |
| tm-carly-rae-jepsen-2027-morrison-z7r9jz1aaekuz | Carly Rae Jepsen | refresh (applied) | 8300774 | https://www.ticketliquidator.com/tickets/8300774/Carly-Rae-Jepsen-tickets-Sun-Apr-25-2027-Red-Rocks-Amphitheatre | - |
| tm-carly-rae-jepsen-2027-salt-lake-city-z7r9jz1aaekuv | Carly Rae Jepsen | refresh (applied) | 8300775 | https://www.ticketliquidator.com/tickets/8300775/Carly-Rae-Jepsen-tickets-Tue-Apr-27-2027-Rockwell-At-The-Complex | - |
| tm-dancing-with-the-stars-2027-manchester-vv1avzkfzgkexi5cw | Dancing With The Stars | refresh (applied) | 8310115 | https://www.ticketliquidator.com/tickets/8310115/Dancing-With-The-Stars-tickets-Thu-Jan-21-2027-SNHU-Arena | - |
| tm-dancing-with-the-stars-2027-buffalo-k7v16k4vppotze82 | Dancing With The Stars | refresh (applied) | 8310116 | https://www.ticketliquidator.com/tickets/8310116/Dancing-With-The-Stars-tickets-Fri-Jan-22-2027-KeyBank-Center | - |
| tm-dancing-with-the-stars-2027-cincinnati-1apzkfygkeolgly | Dancing With The Stars | refresh (applied) | 8310117 | https://www.ticketliquidator.com/tickets/8310117/Dancing-With-The-Stars-tickets-Sat-Jan-23-2027-Heritage-Bank-Center | - |
| tm-dancing-with-the-stars-2027-toronto-1avzz_kgks022ry | Dancing With The Stars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dancing-with-the-stars-2027-grand-rapids-vv1afzkfygkddhcfb | Dancing With The Stars | refresh (applied) | 8310119 | https://www.ticketliquidator.com/tickets/8310119/Dancing-With-The-Stars-tickets-Wed-Jan-27-2027-Van-Andel-Arena | - |
| tm-dancing-with-the-stars-2027-detroit-vv1afzk4egkdpidi9 | Dancing With The Stars | refresh (applied) | 8310120 | https://www.ticketliquidator.com/tickets/8310120/Dancing-With-The-Stars-tickets-Thu-Jan-28-2027-Little-Caesars-Arena | - |
| tm-dancing-with-the-stars-2027-indianapolis-vv17fz_kgkmo2l7h | Dancing With The Stars | refresh (applied) | 8310121 | https://www.ticketliquidator.com/tickets/8310121/Dancing-With-The-Stars-tickets-Fri-Jan-29-2027-Gainbridge-Fieldhouse | - |
| tm-dancing-with-the-stars-2027-minneapolis-vv1akzkfzgkdjnlsm | Dancing With The Stars | refresh (applied) | 8310122 | https://www.ticketliquidator.com/tickets/8310122/Dancing-With-The-Stars-tickets-Sat-Jan-30-2027-Target-Center | - |
| tm-dancing-with-the-stars-2027-milwaukee-vv1a6zkfzgkemf4pv | Dancing With The Stars | refresh (applied) | 8310123 | https://www.ticketliquidator.com/tickets/8310123/Dancing-With-The-Stars-tickets-Sun-Jan-31-2027-Fiserv-Forum | - |
| tm-dancing-with-the-stars-2027-allentown-1kgzvp8fgagolc1 | Dancing With The Stars | refresh (applied) | 8310124 | https://www.ticketliquidator.com/tickets/8310124/Dancing-With-The-Stars-tickets-Wed-Feb-3-2027-PPL-Center | - |
| tm-dancing-with-the-stars-2027-philadelphia-1ayzk4vgkepepvt | Dancing With The Stars | refresh (applied) | 8310125 | https://www.ticketliquidator.com/tickets/8310125/Dancing-With-The-Stars-tickets-Thu-Feb-4-2027-Xfinity-Mobile-Arena | - |
| tm-dancing-with-the-stars-2027-new-york-g5diz_f1zup-t | Dancing With The Stars | refresh (applied) | 8310126 | https://www.ticketliquidator.com/tickets/8310126/Dancing-With-The-Stars-tickets-Fri-Feb-5-2027-Madison-Square-Garden | - |
| tm-dancing-with-the-stars-2027-washington-1a4zkfsgkew-uk5 | Dancing With The Stars | refresh (applied) | 8310127 | https://www.ticketliquidator.com/tickets/8310127/Dancing-With-The-Stars-tickets-Sun-Feb-7-2027-Capital-One-Arena | - |
| tm-dancing-with-the-stars-2027-baltimore-1a4zk4vgkewzdyv | Dancing With The Stars | refresh (applied) | 8310128 | https://www.ticketliquidator.com/tickets/8310128/Dancing-With-The-Stars-tickets-Tue-Feb-9-2027-CFG-Bank-Arena | - |
| tm-dancing-with-the-stars-2027-pittsburgh-1apzkfygkdqrluc | Dancing With The Stars | refresh (applied) | 8310129 | https://www.ticketliquidator.com/tickets/8310129/Dancing-With-The-Stars-tickets-Wed-Feb-10-2027-PPG-Paints-Arena | - |
| tm-dancing-with-the-stars-2027-boston-vv177z_kgks9d4wi | Dancing With The Stars | refresh (applied) | 8310130 | https://www.ticketliquidator.com/tickets/8310130/Dancing-With-The-Stars-tickets-Thu-Feb-11-2027-TD-Garden | - |
| tm-dancing-with-the-stars-2027-albany-k7vgf_km48smn | Dancing With The Stars | refresh (applied) | 8310131 | https://www.ticketliquidator.com/tickets/8310131/Dancing-With-The-Stars-tickets-Fri-Feb-12-2027-MVP-Arena | - |
| tm-dancing-with-the-stars-2027-newark-vv17fz_kgkbxwhxi | Dancing With The Stars | refresh (applied) | 8310132 | https://www.ticketliquidator.com/tickets/8310132/Dancing-With-The-Stars-tickets-Sat-Feb-13-2027-Prudential-Center | - |
| tm-dancing-with-the-stars-2027-hershey-vv1aezk4egkd_54wn | Dancing With The Stars | refresh (applied) | 8310133 | https://www.ticketliquidator.com/tickets/8310133/Dancing-With-The-Stars-tickets-Wed-Feb-17-2027-Giant-Center | - |
| tm-dancing-with-the-stars-2027-columbus-vv1kv8vp83gacza6r | Dancing With The Stars | refresh (applied) | 8310134 | https://www.ticketliquidator.com/tickets/8310134/Dancing-With-The-Stars-tickets-Thu-Feb-18-2027-Value-City-Arena-at-The-Schottenstein-Center | - |
| tm-dancing-with-the-stars-2027-rosemont-vv178z_kgku4hpsc | Dancing With The Stars | refresh (applied) | 8310135 | https://www.ticketliquidator.com/tickets/8310135/Dancing-With-The-Stars-tickets-Fri-Feb-19-2027-Allstate-Arena | - |
| tm-dancing-with-the-stars-2027-moline-vv17bz_kgkbyihs4 | Dancing With The Stars | refresh (applied) | 8310136 | https://www.ticketliquidator.com/tickets/8310136/Dancing-With-The-Stars-tickets-Sat-Feb-20-2027-Vibrant-Arena-at-The-MARK | - |
| tm-dancing-with-the-stars-2027-omaha-vv1akzk4egkdjg6nb | Dancing With The Stars | refresh (applied) | 8310137 | https://www.ticketliquidator.com/tickets/8310137/Dancing-With-The-Stars-tickets-Tue-Feb-23-2027-CHI-Health-Center-Omaha | - |
| tm-dancing-with-the-stars-2027-kansas-city-vv1kbz_fk9g7ylk6 | Dancing With The Stars | refresh (applied) | 8310138 | https://www.ticketliquidator.com/tickets/8310138/Dancing-With-The-Stars-tickets-Wed-Feb-24-2027-T-Mobile-Center | - |
| tm-dancing-with-the-stars-2027-north-little-rock-g5viz_kxiccfs | Dancing With The Stars | refresh (applied) | 8310139 | https://www.ticketliquidator.com/tickets/8310139/Dancing-With-The-Stars-tickets-Thu-Feb-25-2027-Simmons-Bank-Arena | - |
| tm-dancing-with-the-stars-2027-saint-louis-vv1akzkfsgkdkbgr5 | Dancing With The Stars | refresh (applied) | 8310140 | https://www.ticketliquidator.com/tickets/8310140/Dancing-With-The-Stars-tickets-Fri-Feb-26-2027-Enterprise-Center | - |
| tm-dancing-with-the-stars-2027-knoxville-g5viz_kwuvui0 | Dancing With The Stars | refresh (applied) | 8310141 | https://www.ticketliquidator.com/tickets/8310141/Dancing-With-The-Stars-tickets-Sat-Feb-27-2027-Thompson-Boling-Arena-at-Food-City-Center | - |
| tm-dancing-with-the-stars-2027-nashville-g5viz_kb4-h48 | Dancing With The Stars | refresh (applied) | 8310142 | https://www.ticketliquidator.com/tickets/8310142/Dancing-With-The-Stars-tickets-Sun-Feb-28-2027-Bridgestone-Arena | - |
| tm-dancing-with-the-stars-2027-charlottesville-vv16vzk4vjsza2k7u6 | Dancing With The Stars | refresh (applied) | 8310143 | https://www.ticketliquidator.com/tickets/8310143/Dancing-With-The-Stars-tickets-Tue-Mar-2-2027-John-Paul-Jones-Arena | - |
| tm-dancing-with-the-stars-2027-orlando-1axzkfggkescv4v | Dancing With The Stars | refresh (applied) | 8310144 | https://www.ticketliquidator.com/tickets/8310144/Dancing-With-The-Stars-tickets-Sat-Mar-6-2027-Addition-Financial-Arena | - |
| tm-dancing-with-the-stars-2027-tampa-vvg1vz_kbbl4rs | Dancing With The Stars | refresh (applied) | 8310149 | https://www.ticketliquidator.com/tickets/8310149/Dancing-With-The-Stars-tickets-Tue-Mar-9-2027-Benchmark-International-Arena | - |
| tm-dancing-with-the-stars-2027-birmingham-1aezz_kgkwr4ecx | Dancing With The Stars | refresh (applied) | 8310150 | https://www.ticketliquidator.com/tickets/8310150/Dancing-With-The-Stars-tickets-Wed-Mar-10-2027-Legacy-Arena-at-The-BJCC | - |
| tm-dancing-with-the-stars-2027-new-orleans-g5viz_kxwz34h | Dancing With The Stars | refresh (applied) | 8310154 | https://www.ticketliquidator.com/tickets/8310154/Dancing-With-The-Stars-tickets-Thu-Mar-11-2027-Smoothie-King-Center | - |
| tm-dancing-with-the-stars-2027-austin-g5diz_knamopo | Dancing With The Stars | refresh (applied) | 8310155 | https://www.ticketliquidator.com/tickets/8310155/Dancing-With-The-Stars-tickets-Fri-Mar-12-2027-Moody-Center-ATX | - |
| tm-dancing-with-the-stars-2027-san-antonio-g5diz_kdu_auv | Dancing With The Stars | refresh (applied) | 8310156 | https://www.ticketliquidator.com/tickets/8310156/Dancing-With-The-Stars-tickets-Sat-Mar-13-2027-Frost-Bank-Center | - |
| tm-dancing-with-the-stars-2027-dallas-vvg1yz_ke4gsnj | Dancing With The Stars | refresh (applied) | 8310157 | https://www.ticketliquidator.com/tickets/8310157/Dancing-With-The-Stars-tickets-Tue-Mar-16-2027-American-Airlines-Center | - |
| tm-dancing-with-the-stars-2027-tulsa-1aezz_kgkslhpir | Dancing With The Stars | refresh (applied) | 8310158 | https://www.ticketliquidator.com/tickets/8310158/Dancing-With-The-Stars-tickets-Wed-Mar-17-2027-BOK-Center | - |
| tm-dancing-with-the-stars-2027-denver-g5vzz_kbv0118 | Dancing With The Stars | refresh (applied) | 8310159 | https://www.ticketliquidator.com/tickets/8310159/Dancing-With-The-Stars-tickets-Fri-Mar-19-2027-Ball-Arena | - |
| tm-dancing-with-the-stars-2027-seattle-vvg1hz_f63jugd | Dancing With The Stars | refresh (applied) | 8310160 | https://www.ticketliquidator.com/tickets/8310160/Dancing-With-The-Stars-tickets-Mon-Mar-22-2027-Climate-Pledge-Arena | - |
| tm-dancing-with-the-stars-2027-abbotsford-1aozkfygkejjqyp | Dancing With The Stars | refresh (applied) | 8310161 | https://www.ticketliquidator.com/tickets/8310161/Dancing-With-The-Stars-tickets-Tue-Mar-23-2027-Rogers-Forum | - |
| tm-dancing-with-the-stars-2027-portland-vvg1hz_kxomi0l | Dancing With The Stars | refresh (applied) | 8310162 | https://www.ticketliquidator.com/tickets/8310162/Dancing-With-The-Stars-tickets-Wed-Mar-24-2027-Moda-Center-at-the-Rose-Quarter | - |
| tm-dancing-with-the-stars-2027-sacramento-g5vyz_kzd-r6s | Dancing With The Stars | refresh (applied) | 8310163 | https://www.ticketliquidator.com/tickets/8310163/Dancing-With-The-Stars-tickets-Fri-Mar-26-2027-Golden-1-Center | - |
| tm-dancing-with-the-stars-2027-san-jose-g5vyz_kxgynut | Dancing With The Stars | refresh (applied) | 8310164 | https://www.ticketliquidator.com/tickets/8310164/Dancing-With-The-Stars-tickets-Sat-Mar-27-2027-SAP-Center | - |
| tm-dancing-with-the-stars-2027-san-diego-vvg1iz_kxrbyxe | Dancing With The Stars | refresh (applied) | 8310165 | https://www.ticketliquidator.com/tickets/8310165/Dancing-With-The-Stars-tickets-Wed-Mar-31-2027-Viejas-Arena-At-Aztec-Bowl | - |
| tm-dancing-with-the-stars-2027-anaheim-vv170z_kgkbh3n6- | Dancing With The Stars | refresh (applied) | 8310166 | https://www.ticketliquidator.com/tickets/8310166/Dancing-With-The-Stars-tickets-Thu-Apr-1-2027-Honda-Center | - |
| tm-dancing-with-the-stars-2027-los-angeles-g5eyz_fk9yzip | Dancing With The Stars | refresh (applied) | 8310167 | https://www.ticketliquidator.com/tickets/8310167/Dancing-With-The-Stars-tickets-Fri-Apr-2-2027-Cryptocom-Arena | - |
| tm-dancing-with-the-stars-2027-phoenix-1av0z_kgkb3yfyn | Dancing With The Stars | refresh (applied) | 8310168 | https://www.ticketliquidator.com/tickets/8310168/Dancing-With-The-Stars-tickets-Sun-Apr-4-2027-Mortgage-Matchup-Center | - |
| tm-dancing-with-the-stars-2027-mobile-g5viz_f1cm1bo | Dancing With The Stars | refresh (applied) | 8310169 | https://www.ticketliquidator.com/tickets/8310169/Dancing-With-The-Stars-tickets-Wed-Apr-7-2027-Regions-Arena | - |
| tm-dancing-with-the-stars-2027-greenville-g5evz_kdpl_8w | Dancing With The Stars | refresh (applied) | 8310170 | https://www.ticketliquidator.com/tickets/8310170/Dancing-With-The-Stars-tickets-Thu-Apr-8-2027-Bon-Secours-Wellness-Arena | - |
| tm-dancing-with-the-stars-2027-raleigh-g5evz_f60r-5g | Dancing With The Stars | refresh (applied) | 8310171 | https://www.ticketliquidator.com/tickets/8310171/Dancing-With-The-Stars-tickets-Fri-Apr-9-2027-Lenovo-Center | - |
| tm-dancing-with-the-stars-2027-charlotte-g5evz_kj22ebd | Dancing With The Stars | refresh (applied) | 8310173 | https://www.ticketliquidator.com/tickets/8310173/Dancing-With-The-Stars-tickets-Sat-Apr-10-2027-Spectrum-Center | - |
| tm-dancing-with-the-stars-2027-duluth-vvg1zz_km06fsr | Dancing With The Stars | refresh (applied) | 8310174 | https://www.ticketliquidator.com/tickets/8310174/Dancing-With-The-Stars-tickets-Sun-Apr-11-2027-Gas-South-Arena | - |
| tm-def-leppard-2027-allentown-1ayzk4agkdyeyao | Def Leppard | refresh (applied) | 8312060 | https://www.ticketliquidator.com/tickets/8312060/Def-Leppard-tickets-Tue-Mar-2-2027-PPL-Center | - |
| tm-def-leppard-2027-montreal-1aszk4agkdf99bi | Def Leppard | refresh (applied) | 8312100 | https://www.ticketliquidator.com/tickets/8312100/Def-Leppard-tickets-Fri-Mar-5-2027-Centre-Bell | - |
| tm-def-leppard-2027-detroit-vv1afzk4egkelpgxa | Def Leppard | refresh (applied) | 8312061 | https://www.ticketliquidator.com/tickets/8312061/Def-Leppard-tickets-Sun-Mar-7-2027-Little-Caesars-Arena | - |
| tm-def-leppard-2027-toronto-1a8zk4egkdrqf1w | Def Leppard | none | - | - | no qualifying listing (complete catalog checked) |
| tm-def-leppard-2027-quebec-1aszk4agkesu4rw | Def Leppard | refresh (applied) | 8312104 | https://www.ticketliquidator.com/tickets/8312104/Def-Leppard-tickets-Thu-Mar-11-2027-Centre-Videotron | - |
| tm-def-leppard-2027-newark-vv1aezk4kgkdvinob | Def Leppard | refresh (applied) | 8312062 | https://www.ticketliquidator.com/tickets/8312062/Def-Leppard-tickets-Sat-Mar-13-2027-Prudential-Center | - |
| tm-def-leppard-2027-boston-vv1a8vp88ga16tl3 | Def Leppard | refresh (applied) | 8312063 | https://www.ticketliquidator.com/tickets/8312063/Def-Leppard-tickets-Wed-Mar-17-2027-TD-Garden | - |
| tm-def-leppard-2027-nashville-g5viz_f9p6_vj | Def Leppard | refresh (applied) | 8312064 | https://www.ticketliquidator.com/tickets/8312064/Def-Leppard-tickets-Fri-Mar-19-2027-Bridgestone-Arena | - |
| tm-def-leppard-2027-washington-17a8v0g62pvh_yy | Def Leppard | refresh (applied) | 8312065 | https://www.ticketliquidator.com/tickets/8312065/Def-Leppard-tickets-Sun-Mar-21-2027-Capital-One-Arena | - |
| tm-def-leppard-2027-pittsburgh-1apzk4egkdr8ult | Def Leppard | refresh (applied) | 8312066 | https://www.ticketliquidator.com/tickets/8312066/Def-Leppard-tickets-Tue-Mar-23-2027-PPG-Paints-Arena | - |
| tm-def-leppard-2027-chicago-vv1k8z_fgkg7dl8f | Def Leppard | refresh (applied) | 8312067 | https://www.ticketliquidator.com/tickets/8312067/Def-Leppard-tickets-Thu-Mar-25-2027-United-Center | - |
| tm-def-leppard-2027-denver-g5vzz_frfov07 | Def Leppard | refresh (applied) | 8312069 | https://www.ticketliquidator.com/tickets/8312069/Def-Leppard-tickets-Mon-Mar-29-2027-Ball-Arena | - |
| tm-def-leppard-2027-austin-g5diz_f1_s12h | Def Leppard | refresh (applied) | 8312071 | https://www.ticketliquidator.com/tickets/8312071/Def-Leppard-tickets-Tue-Apr-13-2027-Moody-Center-ATX | - |
| tm-def-leppard-2027-north-little-rock-g5viz_f5gacpb | Def Leppard | refresh (applied) | 8312072 | https://www.ticketliquidator.com/tickets/8312072/Def-Leppard-tickets-Fri-Apr-16-2027-Simmons-Bank-Arena | - |
| tm-def-leppard-2027-fort-worth-vvg1yz_fhfmaat | Def Leppard | refresh (applied) | 8312073 | https://www.ticketliquidator.com/tickets/8312073/Def-Leppard-tickets-Sun-Apr-18-2027-Ariat-Arena | - |
| tm-def-leppard-2027-mobile-g5viz_fptcweu | Def Leppard | refresh (applied) | 8312074 | https://www.ticketliquidator.com/tickets/8312074/Def-Leppard-tickets-Tue-Apr-20-2027-Regions-Arena | - |
| tm-def-leppard-2027-wichita-vv1akzk4kgkexoysl | Def Leppard | refresh (applied) | 8312075 | https://www.ticketliquidator.com/tickets/8312075/Def-Leppard-tickets-Thu-Apr-22-2027-INTRUST-Bank-Arena | - |
| tm-def-leppard-2027-lincoln-vv1akzk4vgkel3utc | Def Leppard | refresh (applied) | 8312076 | https://www.ticketliquidator.com/tickets/8312076/Def-Leppard-tickets-Sat-Apr-24-2027-Pinnacle-Bank-Arena | - |
| tm-def-leppard-2027-glendale-1kk8vp8bga1l7cc | Def Leppard | refresh (applied) | 8312078 | https://www.ticketliquidator.com/tickets/8312078/Def-Leppard-tickets-Thu-Apr-29-2027-Desert-Diamond-Arena | - |
| tm-def-leppard-2027-hollywood-vvg1iz_f7e8nik | Def Leppard | refresh (applied) | 8312079 | https://www.ticketliquidator.com/tickets/8312079/Def-Leppard-tickets-Sat-May-1-2027-Hollywood-Bowl | - |
| tm-def-leppard-2027-san-francisco-g5vyz_f5oof-x | Def Leppard | refresh (applied) | 8312080 | https://www.ticketliquidator.com/tickets/8312080/Def-Leppard-tickets-Wed-May-5-2027-Chase-Center | - |
| tm-def-leppard-2027-sacramento-g5vyz_f5hdkto | Def Leppard | refresh (applied) | 8312081 | https://www.ticketliquidator.com/tickets/8312081/Def-Leppard-tickets-Fri-May-7-2027-Golden-1-Center | - |
| tm-def-leppard-2027-seattle-vvg1hz_f1kfpyl | Def Leppard | refresh (applied) | 8312082 | https://www.ticketliquidator.com/tickets/8312082/Def-Leppard-tickets-Sun-May-9-2027-Climate-Pledge-Arena | - |
| tm-def-leppard-2027-vancouver-1aozk4agkddzaes | Def Leppard | refresh (applied) | 8312105 | https://www.ticketliquidator.com/tickets/8312105/Def-Leppard-tickets-Fri-May-14-2027-Rogers-Arena | - |
| tm-def-leppard-2027-edmonton-1k78vpoiga55fiz | Def Leppard | refresh (applied) | 8312106 | https://www.ticketliquidator.com/tickets/8312106/Def-Leppard-tickets-Sun-May-16-2027-Rogers-Place | - |
| tm-def-leppard-2027-san-antonio-g5diz_fqmcwez | Def Leppard | refresh (applied) | 8312084 | https://www.ticketliquidator.com/tickets/8312084/Def-Leppard-tickets-Sat-May-29-2027-Frost-Bank-Center | - |
| tm-def-leppard-2027-oklahoma-city-vvg1yz_fkymbmf | Def Leppard | refresh (applied) | 8312086 | https://www.ticketliquidator.com/tickets/8312086/Def-Leppard-tickets-Thu-Jun-3-2027-Paycom-Center | - |
| tm-def-leppard-2027-milwaukee-vv1a6zk4kgkd_k6yp | Def Leppard | refresh (applied) | 8312087 | https://www.ticketliquidator.com/tickets/8312087/Def-Leppard-tickets-Sat-Jun-5-2027-Fiserv-Forum | - |
| tm-def-leppard-2027-saint-louis-vv1kvovp8tga1iyft | Def Leppard | refresh (applied) | 8312088 | https://www.ticketliquidator.com/tickets/8312088/Def-Leppard-tickets-Mon-Jun-7-2027-Enterprise-Center | - |
| tm-def-leppard-2027-louisville-1kaovpoiga1ispc | Def Leppard | refresh (applied) | 8312089 | https://www.ticketliquidator.com/tickets/8312089/Def-Leppard-tickets-Wed-Jun-9-2027-KFC-Yum-Center | - |
| tm-def-leppard-2027-savannah-vvg1zz_fqp5bwn | Def Leppard | refresh (applied) | 8312090 | https://www.ticketliquidator.com/tickets/8312090/Def-Leppard-tickets-Fri-Jun-11-2027-Enmarket-Arena | - |
| tm-def-leppard-2027-tampa-vvg1vz_fpw01di | Def Leppard | refresh (applied) | 8312091 | https://www.ticketliquidator.com/tickets/8312091/Def-Leppard-tickets-Sun-Jun-13-2027-Benchmark-International-Arena | - |
| tm-def-leppard-2027-atlanta-vvg1zz_fpttjci | Def Leppard | refresh (applied) | 8312092 | https://www.ticketliquidator.com/tickets/8312092/Def-Leppard-tickets-Thu-Jun-17-2027-State-Farm-Arena-GA | - |
| tm-def-leppard-2027-columbus-vv1aazk4kgkdpgu4v | Def Leppard | refresh (applied) | 8312093 | https://www.ticketliquidator.com/tickets/8312093/Def-Leppard-tickets-Sat-Jun-19-2027-Value-City-Arena-at-The-Schottenstein-Center | - |
| tm-def-leppard-2027-new-york-g5diz_fkxvp6l | Def Leppard | refresh (applied) | 8312095 | https://www.ticketliquidator.com/tickets/8312095/Def-Leppard-tickets-Wed-Jun-23-2027-Madison-Square-Garden | - |
| tm-def-leppard-2027-uncasville-g5vvz_fbgzjmo | Def Leppard | refresh (applied) | 8312096 | https://www.ticketliquidator.com/tickets/8312096/Def-Leppard-tickets-Fri-Jun-25-2027-Mohegan-Sun-Arena-CT | - |
| tm-def-leppard-2027-philadelphia-1ayzk4agkeprd7q | Def Leppard | refresh (applied) | 8312097 | https://www.ticketliquidator.com/tickets/8312097/Def-Leppard-tickets-Sun-Jun-27-2027-Xfinity-Mobile-Arena | - |
| tm-def-leppard-2027-charlotte-g5evz_fps2umn | Def Leppard | refresh (applied) | 8312098 | https://www.ticketliquidator.com/tickets/8312098/Def-Leppard-tickets-Wed-Jun-30-2027-Spectrum-Center | - |
| tm-def-leppard-2027-indianapolis-vv1kv8vp8_ga1mpgy | Def Leppard | refresh (applied) | 8312099 | https://www.ticketliquidator.com/tickets/8312099/Def-Leppard-tickets-Fri-Jul-2-2027-Gainbridge-Fieldhouse | - |
| tm-nickelback-2026-durant-vvg1yz_3xvgs07 | Nickelback | refresh (applied) | 8295201 | https://www.ticketliquidator.com/tickets/8295201/Nickelback-tickets-Sat-Dec-19-2026-Choctaw-Casino-Resort-Durant | - |
| tm-nickelback-2027-pittsburgh-1apzk4agkenjp68 | Nickelback | refresh (applied) | 8314930 | https://www.ticketliquidator.com/tickets/8314930/Nickelback-tickets-Sat-Feb-6-2027-PPG-Paints-Arena | - |
| tm-nickelback-2027-allentown-15dzz_frakkqv | Nickelback | refresh (applied) | 8314931 | https://www.ticketliquidator.com/tickets/8314931/Nickelback-tickets-Mon-Feb-8-2027-PPL-Center | - |
| tm-nickelback-2027-grand-rapids-vv1afzk4agkd4fpse | Nickelback | refresh (applied) | 8314932 | https://www.ticketliquidator.com/tickets/8314932/Nickelback-tickets-Wed-Feb-10-2027-Van-Andel-Arena | - |
| tm-nickelback-2027-columbus-vv1aazk4agkduqw0h | Nickelback | refresh (applied) | 8314934 | https://www.ticketliquidator.com/tickets/8314934/Nickelback-tickets-Sat-Feb-13-2027-Value-City-Arena-at-The-Schottenstein-Center | - |
| tm-nickelback-2027-indianapolis-vv1aazk4agkdzn6zd | Nickelback | refresh (applied) | 8314935 | https://www.ticketliquidator.com/tickets/8314935/Nickelback-tickets-Tue-Feb-16-2027-Gainbridge-Fieldhouse | - |
| tm-nickelback-2027-chicago-vv1a7zk4agkexo6el | Nickelback | refresh (applied) | 8314936 | https://www.ticketliquidator.com/tickets/8314936/Nickelback-tickets-Thu-Feb-18-2027-United-Center | - |
| tm-nickelback-2027-saint-louis-vv1akzk4kgkdiwpu8 | Nickelback | refresh (applied) | 8314937 | https://www.ticketliquidator.com/tickets/8314937/Nickelback-tickets-Sat-Feb-20-2027-Enterprise-Center | - |
| tm-nickelback-2027-nashville-g5viz_frya27y | Nickelback | refresh (applied) | 8314938 | https://www.ticketliquidator.com/tickets/8314938/Nickelback-tickets-Sun-Feb-21-2027-Bridgestone-Arena | - |
| tm-nickelback-2027-knoxville-g5viz_f9kxnbt | Nickelback | refresh (applied) | 8314939 | https://www.ticketliquidator.com/tickets/8314939/Nickelback-tickets-Wed-Feb-24-2027-Thompson-Boling-Arena-at-Food-City-Center | - |
| tm-nickelback-2027-hollywood-vvg1vz_fpmhiza | Nickelback | refresh (applied) | 8314940 | https://www.ticketliquidator.com/tickets/8314940/Nickelback-tickets-Fri-Feb-26-2027-Hard-Rock-Live-At-The-Seminole-Hard-Rock-Hotel-Casino-Hollywood | - |
| tm-nickelback-2027-atlanta-vvg1zz_f9i_ugh | Nickelback | refresh (applied) | 8314941 | https://www.ticketliquidator.com/tickets/8314941/Nickelback-tickets-Tue-Mar-2-2027-State-Farm-Arena-GA | - |
| tm-nickelback-2027-raleigh-g5evz_fh5odfi | Nickelback | refresh (applied) | 8314942 | https://www.ticketliquidator.com/tickets/8314942/Nickelback-tickets-Thu-Mar-4-2027-Lenovo-Center | - |
| tm-nickelback-2027-newark-vv1kfz_fj7g7twmf | Nickelback | refresh (applied) | 8314943 | https://www.ticketliquidator.com/tickets/8314943/Nickelback-tickets-Sat-Mar-6-2027-Prudential-Center | - |
| tm-nickelback-2027-washington-16vfz_ffeg7mdpa | Nickelback | refresh (applied) | 8314944 | https://www.ticketliquidator.com/tickets/8314944/Nickelback-tickets-Mon-Mar-8-2027-Capital-One-Arena | - |
| tm-nickelback-2027-boston-vv1avzk4egkdzjayi | Nickelback | refresh (applied) | 8314945 | https://www.ticketliquidator.com/tickets/8314945/Nickelback-tickets-Wed-Mar-10-2027-TD-Garden | - |
| tm-nickelback-2027-montreal-15d7z_fqpa0kk | Nickelback | refresh (applied) | 8314962 | https://www.ticketliquidator.com/tickets/8314962/Nickelback-tickets-Fri-Mar-12-2027-Centre-Bell | - |
| tm-nickelback-2027-hamilton-1a8zk4axofsze2g | Nickelback | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nickelback-2027-toronto-1a8zk47gkdvbcpm | Nickelback | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nickelback-2027-buffalo-k7vgf_fruee-y | Nickelback | refresh (applied) | 8314946 | https://www.ticketliquidator.com/tickets/8314946/Nickelback-tickets-Wed-Mar-24-2027-KeyBank-Center | - |
| tm-nickelback-2027-detroit-vv1afzk46gkdogect | Nickelback | refresh (applied) | 8314947 | https://www.ticketliquidator.com/tickets/8314947/Nickelback-tickets-Fri-Mar-26-2027-Little-Caesars-Arena | - |
| tm-nickelback-2027-milwaukee-vv1a6zk4agkd7raaf | Nickelback | refresh (applied) | 8314948 | https://www.ticketliquidator.com/tickets/8314948/Nickelback-tickets-Sat-Mar-27-2027-Fiserv-Forum | - |
| tm-nickelback-2027-saskatoon-16v7z_ff7g7wwtw | Nickelback | refresh (applied) | 8314965 | https://www.ticketliquidator.com/tickets/8314965/Nickelback-tickets-Fri-Apr-2-2027-SaskTel-Centre | - |
| tm-nickelback-2027-edmonton-1f78vpoopnz72877 | Nickelback | refresh (applied) | 8314966 | https://www.ticketliquidator.com/tickets/8314966/Nickelback-tickets-Sat-Apr-3-2027-Rogers-Place | - |
| tm-nickelback-2027-calgary-1aozk4kgkd_yj0d | Nickelback | refresh (applied) | 8314968 | https://www.ticketliquidator.com/tickets/8314968/Nickelback-tickets-Tue-Apr-6-2027-Scotiabank-Saddledome | - |
| tm-nickelback-2027-vancouver-1aozk4agkdpx1_p | Nickelback | refresh (applied) | 8314969 | https://www.ticketliquidator.com/tickets/8314969/Nickelback-tickets-Fri-Apr-9-2027-Rogers-Arena | - |
| tm-nickelback-2027-seattle-vvg1hz_f5mpsjc | Nickelback | refresh (applied) | 8314951 | https://www.ticketliquidator.com/tickets/8314951/Nickelback-tickets-Sat-Apr-10-2027-Climate-Pledge-Arena | - |
| tm-nickelback-2027-sacramento-g5vyz_f9d-9xg | Nickelback | refresh (applied) | 8314952 | https://www.ticketliquidator.com/tickets/8314952/Nickelback-tickets-Tue-Apr-13-2027-Golden-1-Center | - |
| tm-nickelback-2027-anaheim-vv1aazk4kgkeh-rr7 | Nickelback | refresh (applied) | 8314954 | https://www.ticketliquidator.com/tickets/8314954/Nickelback-tickets-Sun-Apr-18-2027-Honda-Center | - |
| tm-nickelback-2027-phoenix-1a_zk4kgkd7q1b3 | Nickelback | refresh (applied) | 8314956 | https://www.ticketliquidator.com/tickets/8314956/Nickelback-tickets-Tue-Apr-20-2027-Mortgage-Matchup-Center | - |
| tm-nickelback-2027-denver-g5vzz_fpgv_um | Nickelback | refresh (applied) | 8314958 | https://www.ticketliquidator.com/tickets/8314958/Nickelback-tickets-Sat-Apr-24-2027-Ball-Arena | - |
| tm-nickelback-2027-dallas-vvg1yz_f9cwbxt | Nickelback | refresh (applied) | 8314959 | https://www.ticketliquidator.com/tickets/8314959/Nickelback-tickets-Tue-Apr-27-2027-American-Airlines-Center | - |
| tm-nickelback-2027-san-antonio-g5diz_fruim0m | Nickelback | refresh (applied) | 8314961 | https://www.ticketliquidator.com/tickets/8314961/Nickelback-tickets-Sat-May-1-2027-Frost-Bank-Center | - |
| tm-nickelback-2027-leeds-g5vhz_flmspew | Nickelback | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Nickelback; text: Nickelback Nickelback /tickets/8314973/Nickelback-tickets-Sat-May-22-2027-First-Direct-Arena Nickelback Nickelback First Direct Arena 740 CO) |
| tm-nickelback-2027-london-1agzk46gkdjr1bv | Nickelback | refresh (applied) | 8314974 | https://www.ticketliquidator.com/tickets/8314974/Nickelback-tickets-Tue-May-25-2027-O2-Arena-London | - |
| tm-nickelback-2027-birmingham-1kfyvp3_gagcomu | Nickelback | refresh (applied) | 8314975 | https://www.ticketliquidator.com/tickets/8314975/Nickelback-tickets-Fri-May-28-2027-Utilita-Arena-Birmingham | - |
| tm-nickelback-2027-dublin-1abzkfmgkepnjt6 | Nickelback | refresh (applied) | 8314976 | https://www.ticketliquidator.com/tickets/8314976/Nickelback-tickets-Sun-May-30-2027-3Arena-Dublin | - |
| tm-nickelback-2027-glasgow-1auzk46gkexekqz | Nickelback | refresh (applied) | 8314978 | https://www.ticketliquidator.com/tickets/8314978/Nickelback-tickets-Tue-Jun-1-2027-OVO-Hydro | - |
| tm-nickelback-2027-manchester-1amzk46gkdgpim1 | Nickelback | refresh (applied) | 8314791 | https://www.ticketliquidator.com/tickets/8314791/Nickelback-tickets-Wed-Jun-2-2027-Co-Op-Live | - |
| tm-nickelback-2027-forest-brussels-z698xzg2z1kppuzf3 | Nickelback | refresh (applied) | 8314979 | https://www.ticketliquidator.com/tickets/8314979/Nickelback-tickets-Sat-Jun-5-2027-Vorst-Nationaal | - |
| tm-nickelback-2027-amsterdam-z698xzbpz1k-uqgjg | Nickelback | refresh (applied) | 8314980 | https://www.ticketliquidator.com/tickets/8314980/Nickelback-tickets-Mon-Jun-7-2027-Ziggo-Dome | - |
| tm-nickelback-2027-hannover-z698xzc2z16v-v0tgv | Nickelback | refresh (applied) | 8314982 | https://www.ticketliquidator.com/tickets/8314982/Nickelback-tickets-Fri-Jun-11-2027-ZAG-Arena | - |
| tm-nickelback-2027-munich-z698xzc2z1k-kk3-_ | Nickelback | refresh (applied) | 8314985 | https://www.ticketliquidator.com/tickets/8314985/Nickelback-tickets-Sat-Jun-19-2027-Kleine-Olympiahalle-Munich | - |
| tm-nickelback-2027-assago-zg9rmiynyza161 | Nickelback | refresh (applied) | 8314988 | https://www.ticketliquidator.com/tickets/8314988/Nickelback-tickets-Wed-Jun-23-2027-Forum-di-Milano | - |
| tm-nickelback-2027-odz-z698xzqpz1kvw7fvb | Nickelback | refresh (applied) | 8314992 | https://www.ticketliquidator.com/tickets/8314992/Nickelback-tickets-Thu-Jul-1-2027-Atlas-Arena | - |
| tm-jay-wheeler-2026-malaga-z698xz2qz1kf3jk0a | Jay Wheeler | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: provider URL names a different date, city mismatch, venue mismatch; listing: Jay Wheeler; text: Jay Wheeler Jay Wheeler /tickets/8387801/Jay-Wheeler-tickets-Tue-Dec-8-2026-Roig-Arena Jay Wheeler Jay Wheeler Roig Arena 186936 CONCERTS C/) |
| tm-jay-wheeler-2026-valencia-z698xz2qz16v4e4u-v | Jay Wheeler | refresh (applied) | 8387801 | https://www.ticketliquidator.com/tickets/8387801/Jay-Wheeler-tickets-Tue-Dec-8-2026-Roig-Arena | - |
| tm-jay-wheeler-2026-bilbao-z698xz2qz1kvb7mek | Jay Wheeler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jay-wheeler-2026-madrid-z698xz2qz16va4ba8- | Jay Wheeler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jay-wheeler-2026-barcelona-z698xz2qz1k-ngufw | Jay Wheeler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jay-wheeler-2027-miami-vvg1vz_f7_l-6l | Jay Wheeler | refresh (applied) | 8307352 | https://www.ticketliquidator.com/tickets/8307352/Jay-Wheeler-tickets-Thu-Mar-11-2027-Kaseya-Center | - |
| tm-jay-wheeler-2027-atlanta-vvg1zz_f288dbv | Jay Wheeler | refresh (applied) | 8307353 | https://www.ticketliquidator.com/tickets/8307353/Jay-Wheeler-tickets-Fri-Mar-12-2027-Coca-Cola-Roxy | - |
| tm-jay-wheeler-2027-charlotte-g5evz_f75dxcp | Jay Wheeler | refresh (applied) | 8307354 | https://www.ticketliquidator.com/tickets/8307354/Jay-Wheeler-tickets-Sun-Mar-14-2027-Ovens-Auditorium | - |
| tm-jay-wheeler-2027-washington-1a4zk4egkd30m3a | Jay Wheeler | refresh (applied) | 8307355 | https://www.ticketliquidator.com/tickets/8307355/Jay-Wheeler-tickets-Thu-Mar-18-2027-DAR-Constitution-Hall | - |
| tm-jay-wheeler-2027-atlantic-city-vv1aezk4vgkduqubi | Jay Wheeler | refresh (applied) | 8307356 | https://www.ticketliquidator.com/tickets/8307356/Jay-Wheeler-tickets-Fri-Mar-19-2027-Hard-Rock-Live-At-Etess-Arena | - |
| tm-jay-wheeler-2027-mashantucket-g5vvz_fp_melk | Jay Wheeler | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch; listing: Jay Wheeler; text: Jay Wheeler Jay Wheeler /tickets/8307358/Jay-Wheeler-tickets-Sat-Mar-20-2027-Premier-Theater-At-Foxwoods Jay Wheeler Jay Wheeler Premier The) |
| tm-jay-wheeler-2027-brooklyn-1ayzk4vgkebxenn | Jay Wheeler | refresh (applied) | 8307360 | https://www.ticketliquidator.com/tickets/8307360/Jay-Wheeler-tickets-Wed-Mar-24-2027-Barclays-Center | - |
| tm-jay-wheeler-2027-reading-vv17fz_kgkblt_5x | Jay Wheeler | refresh (applied) | 8307362 | https://www.ticketliquidator.com/tickets/8307362/Jay-Wheeler-tickets-Thu-Mar-25-2027-Santander-Arena | - |
| tm-jay-wheeler-2027-boston-vv1avzk4agkejxnem | Jay Wheeler | refresh (applied) | 8309790 | https://www.ticketliquidator.com/tickets/8309790/Jay-Wheeler-tickets-Sat-Mar-27-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-jay-wheeler-2027-rosemont-vv178z_kgkbjdkxl | Jay Wheeler | refresh (applied) | 8307363 | https://www.ticketliquidator.com/tickets/8307363/Jay-Wheeler-tickets-Fri-Apr-2-2027-Rosemont-Theatre | - |
| tm-jay-wheeler-2027-denver-g5vzz_f20_jhu | Jay Wheeler | refresh (applied) | 8307364 | https://www.ticketliquidator.com/tickets/8307364/Jay-Wheeler-tickets-Sun-Apr-4-2027-Fillmore-Auditorium-Colorado | - |
| tm-jay-wheeler-2027-irving-vvg1yz_f8nrws_ | Jay Wheeler | refresh (applied) | 8307366 | https://www.ticketliquidator.com/tickets/8307366/Jay-Wheeler-tickets-Tue-Apr-6-2027-The-Pavilion-at-Toyota-Music-Factory | - |
| tm-jay-wheeler-2027-houston-g5diz_f62ij1f | Jay Wheeler | refresh (applied) | 8307367 | https://www.ticketliquidator.com/tickets/8307367/Jay-Wheeler-tickets-Wed-Apr-7-2027-713-Music-Hall | - |
| tm-jay-wheeler-2027-inglewood-vvg1iz_f8af9cn | Jay Wheeler | refresh (applied) | 8307369 | https://www.ticketliquidator.com/tickets/8307369/Jay-Wheeler-tickets-Sat-Apr-10-2027-YouTube-Theater-at-Hollywood-Park | - |
| tm-jay-wheeler-2027-orlando-1axzk4vgkd6tfj5 | Jay Wheeler | refresh (applied) | 8307371 | https://www.ticketliquidator.com/tickets/8307371/Jay-Wheeler-tickets-Thu-Apr-15-2027-Kia-Center | - |
| tm-mico-2027-barcelona-z698xz2qz1k4j0yoa | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2027-amsterdam-z698xzbpz16vzefpea | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2027-manchester-g5vhz_flmnkjc | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2027-london-g5vhz_fjlqa3s | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2027-dublin-1abzk46gkd9elri | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2027-charlotte-g5evz_fqqay6k | Mico | refresh (applied) | 8315048 | https://www.ticketliquidator.com/tickets/8315048/Mico-tickets-Sat-Feb-20-2027-The-Underground-Charlotte | - |
| tm-mico-2027-charleston-g5evz_fxr2vbf | Mico | refresh (applied) | 8315049 | https://www.ticketliquidator.com/tickets/8315049/Mico-tickets-Sun-Feb-21-2027-Charleston-Music-Hall | - |
| tm-mico-2027-ft-lauderdale-vvg1vz_fqxgdhj | Mico | refresh (applied) | 8315050 | https://www.ticketliquidator.com/tickets/8315050/Mico-tickets-Thu-Feb-25-2027-Revolution-Live | - |
| tm-mico-2027-st-petersburg-vvg1vz_fxbu9sq | Mico | refresh (applied) | 8315051 | https://www.ticketliquidator.com/tickets/8315051/Mico-tickets-Fri-Feb-26-2027-Jannus-Live | - |
| tm-mico-2027-orlando-16efz_fbzg7m_te | Mico | refresh (applied) | 8315052 | https://www.ticketliquidator.com/tickets/8315052/Mico-tickets-Sat-Feb-27-2027-House-Of-Blues-Orlando | - |
| tm-mico-2027-birmingham-1aozk4fgkdswfqm | Mico | refresh (applied) | 8315053 | https://www.ticketliquidator.com/tickets/8315053/Mico-tickets-Mon-Mar-1-2027-Iron-City-Birmingham | - |
| tm-mico-2027-new-orleans-g5viz_f97lnal | Mico | refresh (applied) | 8315055 | https://www.ticketliquidator.com/tickets/8315055/Mico-tickets-Tue-Mar-2-2027-House-Of-Blues-New-Orleans | - |
| tm-mico-2027-indianapolis-vv1aazk4kgkenppel | Mico | refresh (applied) | 8315056 | https://www.ticketliquidator.com/tickets/8315056/Mico-tickets-Tue-Mar-9-2027-The-Deluxe-at-Old-National-Centre | - |
| tm-mico-2027-cincinnati-1apzk47gkdey9ag | Mico | refresh (applied) | 8315057 | https://www.ticketliquidator.com/tickets/8315057/Mico-tickets-Fri-Mar-12-2027-Bogarts | - |
| tm-trans-siberian-orchestra-2026-toronto-1avzz_8gkmdenjm | Trans-Siberian Orchestra | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch, venue mismatch; listing: Trans-Siberian Orchestra; text: Trans-Siberian Orchestra Trans-Siberian Orchestra /tickets/8255135/Trans-Siberian-Orchestra-tickets-Tue-Dec-29-2026-T-Mobile-Center Trans-Si) |
| tm-trans-siberian-orchestra-2026-kansas-city-vv1kvovpkbgacwdwu | Trans-Siberian Orchestra | correct (applied) | 8255134 | https://www.ticketliquidator.com/tickets/8255134/Trans-Siberian-Orchestra-tickets-Tue-Dec-29-2026-T-Mobile-Center | - |
| tm-trans-siberian-orchestra-2026-buffalo-k7vgf_okhdtog | Trans-Siberian Orchestra | correct (applied) | 8255136 | https://www.ticketliquidator.com/tickets/8255136/Trans-Siberian-Orchestra-tickets-Wed-Dec-30-2026-KeyBank-Center | - |
| tm-trans-siberian-orchestra-2026-saint-louis-vv1akzkfbgkdrsdgs | Trans-Siberian Orchestra | correct (applied) | 8255139 | https://www.ticketliquidator.com/tickets/8255139/Trans-Siberian-Orchestra-tickets-Wed-Dec-30-2026-Enterprise-Center | - |
| tm-chelsea-cutler-2027-saint-petersburg-z7r9jz1aae_gk | Chelsea Cutler | refresh (applied) | 8301014 | https://www.ticketliquidator.com/tickets/8301014/Chelsea-Cutler-tickets-Fri-Jan-29-2027-Jannus-Live | - |
| tm-chelsea-cutler-2027-atlanta-z7r9jz1aae_gf | Chelsea Cutler | refresh (applied) | 8301015 | https://www.ticketliquidator.com/tickets/8301015/Chelsea-Cutler-tickets-Sat-Jan-30-2027-The-Eastern-GA | - |
| tm-chelsea-cutler-2027-nashville-z7r9jz1aaefb3 | Chelsea Cutler | refresh (applied) | 8301016 | https://www.ticketliquidator.com/tickets/8301016/Chelsea-Cutler-tickets-Wed-Feb-3-2027-Marathon-Music-Works | - |
| tm-chelsea-cutler-2027-boston-z7r9jz1aaefp9 | Chelsea Cutler | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch; listing: Chelsea Cutler; text: Chelsea Cutler Chelsea Cutler /tickets/8301017/Chelsea-Cutler-tickets-Sat-Feb-13-2027-Roadrunner Chelsea Cutler Chelsea Cutler Roadrunner 13) |
| tm-chelsea-cutler-2027-columbus-z7r9jz1aaef0s | Chelsea Cutler | refresh (applied) | 8301018 | https://www.ticketliquidator.com/tickets/8301018/Chelsea-Cutler-tickets-Sun-Feb-21-2027-Newport-Music-Hall | - |
| tm-chelsea-cutler-2027-denver-z7r9jz1aae_g4 | Chelsea Cutler | refresh (applied) | 8301019 | https://www.ticketliquidator.com/tickets/8301019/Chelsea-Cutler-tickets-Sun-Feb-28-2027-The-Mission-Ballroom | - |
| tm-chelsea-cutler-2027-san-francisco-z7r9jz1aae_gp | Chelsea Cutler | refresh (applied) | 8301020 | https://www.ticketliquidator.com/tickets/8301020/Chelsea-Cutler-tickets-Sat-Mar-6-2027-The-Midway-CA | - |
| tm-chelsea-cutler-2027-salt-lake-city-z7r9jz1aaefp4 | Chelsea Cutler | refresh (applied) | 8301028 | https://www.ticketliquidator.com/tickets/8301028/Chelsea-Cutler-tickets-Tue-Mar-9-2027-Rockwell-At-The-Complex | - |
| tm-chelsea-cutler-2027-seattle-z7r9jz1aae_g9 | Chelsea Cutler | refresh (applied) | 8301029 | https://www.ticketliquidator.com/tickets/8301029/Chelsea-Cutler-tickets-Fri-Mar-12-2027-Showbox-SoDo | - |
| tm-chelsea-cutler-2027-portland-z7r9jz1aae_gb | Chelsea Cutler | refresh (applied) | 8301030 | https://www.ticketliquidator.com/tickets/8301030/Chelsea-Cutler-tickets-Sat-Mar-13-2027-Roseland-Theater | - |
| tm-the-red-clay-strays-2027-jacksonville-z7r9jz1aaef4f | The Red Clay Strays | refresh (applied) | 8301707 | https://www.ticketliquidator.com/tickets/8301707/The-Red-Clay-Strays-tickets-Fri-Feb-26-2027-VyStar-Veterans-Memorial-Arena | - |
| tm-the-red-clay-strays-2027-green-bay-z7r9jz1aaef4y | The Red Clay Strays | refresh (applied) | 8307875 | https://www.ticketliquidator.com/tickets/8307875/The-Red-Clay-Strays-tickets-Thu-Aug-5-2027-Resch-Center | - |
| tm-the-red-clay-strays-2027-fresno-z7r9jz1aaefgo | The Red Clay Strays | refresh (applied) | 8301706 | https://www.ticketliquidator.com/tickets/8301706/The-Red-Clay-Strays-tickets-Fri-Aug-13-2027-Save-Mart-Center | - |
| tm-the-red-clay-strays-2027-englewood-z7r9jz1aaef4s | The Red Clay Strays | refresh (applied) | 8301199 | https://www.ticketliquidator.com/tickets/8301199/The-Red-Clay-Strays-tickets-Sat-Aug-28-2027-Fiddlers-Green-Amphitheatre | - |
| tm-the-red-clay-strays-2027-huntsville-z7r9jz1aaek-6 | The Red Clay Strays | refresh (applied) | 8301038 | https://www.ticketliquidator.com/tickets/8301038/The-Red-Clay-Strays-tickets-Sat-Sep-11-2027-The-Orion-Amphitheater | - |
| tm-the-red-clay-strays-2027-oklahoma-city-z7r9jz1aaefef | The Red Clay Strays | refresh (applied) | 8301039 | https://www.ticketliquidator.com/tickets/8301039/The-Red-Clay-Strays-tickets-Thu-Sep-16-2027-Paycom-Center | - |
| tm-fontaines-d-c-2027-columbus-z7r9jz1aaepk6 | Fontaines D.C. | refresh (applied) | 8307056 | https://www.ticketliquidator.com/tickets/8307056/Fontaines-DC-tickets-Fri-Sep-24-2027-KEMBA-Live | - |
| tm-fontaines-d-c-2027-forest-hills-z7r9jz1aaep7g | Fontaines D.C. | refresh (applied) | 8303817 | https://www.ticketliquidator.com/tickets/8303817/Fontaines-DC-tickets-Tue-Sep-28-2027-Forest-Hills-Stadium | - |
| tm-fontaines-d-c-2027-forest-hills-z7r9jz1aa7v_9 | Fontaines D.C. | refresh (applied) | 8312114 | https://www.ticketliquidator.com/tickets/8312114/Fontaines-DC-tickets-Wed-Sep-29-2027-Forest-Hills-Stadium | - |
| tm-fontaines-d-c-2027-nashville-z7r9jz1aaepkf | Fontaines D.C. | refresh (applied) | 8303824 | https://www.ticketliquidator.com/tickets/8303824/Fontaines-DC-tickets-Tue-Oct-5-2027-The-Pinnacle-At-Nashville-Yards | - |
| tm-fontaines-d-c-2027-morrison-z7r9jz1aaepka | Fontaines D.C. | refresh (applied) | 8303825 | https://www.ticketliquidator.com/tickets/8303825/Fontaines-DC-tickets-Wed-Oct-13-2027-Red-Rocks-Amphitheatre | - |
| tm-staind-2027-spokane-z7r9jz1aae_qs | Staind | refresh (applied) | 8308780 | https://www.ticketliquidator.com/tickets/8308780/Staind-tickets-Fri-Mar-26-2027-Numerica-Veterans-Arena | - |
| tm-staind-2027-billings-z7r9jz1aae_qg | Staind | refresh (applied) | 8308784 | https://www.ticketliquidator.com/tickets/8308784/Staind-tickets-Sat-Apr-3-2027-First-Interstate-Arena | - |
| tm-staind-2027-cleveland-z7r9jz1aae_q- | Staind | refresh (applied) | 8308792 | https://www.ticketliquidator.com/tickets/8308792/Staind-tickets-Fri-Apr-16-2027-Rocket-Arena | - |
| tm-warren-zeiders-2027-kansas-city-z7r9jz1aaeb7w | Warren Zeiders | refresh (applied) | 8307502 | https://www.ticketliquidator.com/tickets/8307502/Warren-Zeiders-tickets-Thu-Apr-1-2027-The-Midland-Theatre-MO | - |
| tm-warren-zeiders-2027-fort-worth-z7r9jz1aaeb7s | Warren Zeiders | refresh (applied) | 8307504 | https://www.ticketliquidator.com/tickets/8307504/Warren-Zeiders-tickets-Fri-Apr-9-2027-Billy-Bobs | - |
| tm-warren-zeiders-2027-helotes-z7r9jz1aaeb7v | Warren Zeiders | refresh (applied) | 8307508 | https://www.ticketliquidator.com/tickets/8307508/Warren-Zeiders-tickets-Sat-Apr-10-2027-John-T-Floore-Country-Store | - |
| tm-warren-zeiders-2027-louisville-z7r9jz1aaeb7g | Warren Zeiders | refresh (applied) | 8307490 | https://www.ticketliquidator.com/tickets/8307490/Warren-Zeiders-tickets-Fri-Apr-16-2027-Old-Foresters-Paristown-Hall | - |
| tm-bruno-mars-2026-ciudad-de-mexico-1afzkokgkesyi9m | Bruno Mars | refresh (applied) | 7798132 | https://www.ticketliquidator.com/tickets/7798132/Bruno-Mars-tickets-Thu-Dec-3-2026-Estadio-GNP-Seguros-Mexico-City | - |
| tm-bruno-mars-2026-ciudad-de-mexico-1afzkokgkehfcxu | Bruno Mars | refresh (applied) | 7798133 | https://www.ticketliquidator.com/tickets/7798133/Bruno-Mars-tickets-Fri-Dec-4-2026-Estadio-GNP-Seguros-Mexico-City | - |
| tm-bruno-mars-2026-ciudad-de-mexico-1afzkokgkehfwxy | Bruno Mars | refresh (applied) | 7798135 | https://www.ticketliquidator.com/tickets/7798135/Bruno-Mars-tickets-Mon-Dec-7-2026-Estadio-GNP-Seguros-Mexico-City | - |
| tm-bruno-mars-2026-ciudad-de-mexico-1afzkokgkehfwxd | Bruno Mars | refresh (applied) | 7798136 | https://www.ticketliquidator.com/tickets/7798136/Bruno-Mars-tickets-Tue-Dec-8-2026-Estadio-GNP-Seguros-Mexico-City | - |
| tm-bruno-mars-2026-ciudad-de-mexico-1afzkokgkehaqnd | Bruno Mars | refresh (applied) | 8271253 | https://www.ticketliquidator.com/tickets/8271253/Bruno-Mars-tickets-Fri-Dec-11-2026-Estadio-GNP-Seguros-Mexico-City | - |
| tm-bruno-mars-2027-auckland-1a0zkfkgkeslw-y | Bruno Mars | refresh (applied) | 8244830 | https://www.ticketliquidator.com/tickets/8244830/Bruno-Mars-tickets-Sat-Mar-13-2027-Eden-Park-New-Zealand | - |
| tm-bruno-mars-2027-auckland-1ae8z_ogkiuunsj | Bruno Mars | refresh (applied) | 8244848 | https://www.ticketliquidator.com/tickets/8244848/Bruno-Mars-tickets-Sun-Mar-14-2027-Eden-Park-New-Zealand | - |
| tm-bruno-mars-2027-auckland-1ae8z_ogksqr0wn | Bruno Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-niall-horan-2027-ciudad-de-mexico-1afzkfegkdnvnrg | Niall Horan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-niall-horan-2027-ciudad-de-mexico-1afzkfegkdpr1hq | Niall Horan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-niall-horan-2027-tlajomulco-de-zuniga-g5dvz_31eksvx | Niall Horan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sombr-2027-mexico-1av8z_agkn6tndi | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sombr-2027-mexico-1av8z_agknaoeux | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sombr-2027-auckland-1ae8z_ogkmlufo4 | Sombr | refresh (applied) | 8264595 | https://www.ticketliquidator.com/tickets/8264595/sombr-tickets-Tue-Apr-27-2027-Spark-Arena | - |
| tm-sombr-2027-fornebu-z698xzb_z16vfe17ut | Sombr | refresh (applied) | 8245506 | https://www.ticketliquidator.com/tickets/8245506/sombr-tickets-Sat-May-8-2027-Unity-Arena | - |
| tm-sombr-2027-helsinki-z698xz8kz1kuwpvu6 | Sombr | refresh (applied) | 8245507 | https://www.ticketliquidator.com/tickets/8245507/sombr-tickets-Tue-May-11-2027-Veikkaus-Arena | - |
| tm-sombr-2027-praha-9-z698xzu0z16v-zgmz9 | Sombr | refresh (applied) | 8245515 | https://www.ticketliquidator.com/tickets/8245515/sombr-tickets-Wed-May-19-2027-O2-Arena-Prague | - |
| tm-sombr-2027-zurich-z698xzu3z16vqgjk0e | Sombr | refresh (applied) | 8245518 | https://www.ticketliquidator.com/tickets/8245518/sombr-tickets-Thu-May-27-2027-Hallenstadion-Zurich | - |
| tm-sombr-2027-vienna-z698xz5rz16vfevjbe | Sombr | none | - | - | no qualifying listing (complete catalog checked) |
| tm-john-summit-2027-zurich-z698xzu3z1kxvu8oj | John Summit | refresh (applied) | 8310405 | https://www.ticketliquidator.com/tickets/8310405/John-Summit-tickets-Sat-Feb-20-2027-Halle-622 | - |
| tm-teddy-swims-2027-fornebu-z698xzb_z1aakf8y | Teddy Swims | refresh (applied) | 8167502 | https://www.ticketliquidator.com/tickets/8167502/Teddy-Swims-tickets-Tue-Mar-2-2027-Unity-Arena | - |
| tm-teddy-swims-2027-praha-9-z698xzu0z1kq9x78k | Teddy Swims | refresh (applied) | 8167524 | https://www.ticketliquidator.com/tickets/8167524/Teddy-Swims-tickets-Sat-Mar-20-2027-O2-Arena-Prague | - |
| tm-five-finger-death-punch-2027-praha-9-z698xzu0z1kq-uavz | Five Finger Death Punch | none | - | - | no qualifying listing (complete catalog checked) |
| tm-five-finger-death-punch-2027-fornebu-z698xzb_z16ezeg-gk | Five Finger Death Punch | refresh (applied) | 8090423 | https://www.ticketliquidator.com/tickets/8090423/Five-Finger-Death-Punch-tickets-Fri-Feb-19-2027-Unity-Arena | - |
| tm-blue-october-2026-little-rock-rz7hnez1afr4pn | Blue October | refresh (applied) | 7827980 | https://www.ticketliquidator.com/tickets/7827980/Blue-October-tickets-Wed-Dec-9-2026-Little-Rock-Hall-AR | - |
| tm-blue-october-2027-ventura-rz7hnez1af0ofn | Blue October | refresh (applied) | 7957209 | https://www.ticketliquidator.com/tickets/7957209/Blue-October-tickets-Fri-Feb-12-2027-Majestic-Ventura-Theatre | - |
| tm-tyla-2027-pretoria-z698xz05z16eza8efw | Tyla | refresh (applied) | 8324825 | https://www.ticketliquidator.com/tickets/8324825/Tyla-tickets-Fri-Jan-8-2027-SunBet-Arena-At-Time-Square-Casino | - |
| tm-tyla-2027-pretoria-z698xz05z1kqkoyov | Tyla | refresh (applied) | 8324827 | https://www.ticketliquidator.com/tickets/8324827/Tyla-tickets-Sat-Jan-9-2027-SunBet-Arena-At-Time-Square-Casino | - |
| tm-nothing-but-thieves-2027-praha-9-z698xzu0z16vba7mjv | Nothing But Thieves | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nothing-but-thieves-2027-san-diego-rz7hnez1afpvcd | Nothing But Thieves | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Nothing But Thieves; text: Nothing But Thieves Nothing But Thieves /tickets/7996256/Nothing-But-Thieves-tickets-Tue-Apr-6-2027-SOMA Nothing But Thieves Nothing But Thi) |
| tm-sabaton-2026-saint-louis-1ae7zbwgkmsi8la | Sabaton | refresh (applied) | 7410013 | https://www.ticketliquidator.com/tickets/7410013/Sabaton-tickets-Fri-Nov-27-2026-The-Factory-Chesterfield | - |
| tm-sabaton-2026-cincinnati-1avbzbwgkn0vsnb | Sabaton | refresh (applied) | 7410017 | https://www.ticketliquidator.com/tickets/7410017/Sabaton-tickets-Sat-Nov-28-2026-The-Andrew-J-Brady-ICON-Music-Center | - |
| tm-sabaton-2026-detroit-vv1afzkgpgkdnrjuw | Sabaton | refresh (applied) | 7410018 | https://www.ticketliquidator.com/tickets/7410018/Sabaton-tickets-Sun-Nov-29-2026-The-Fillmore-Detroit | - |
| tm-sabaton-2026-boston-vv1a8vnaygac9fy1 | Sabaton | refresh (applied) | 7410021 | https://www.ticketliquidator.com/tickets/7410021/Sabaton-tickets-Tue-Dec-1-2026-MGM-Music-Hall-at-Fenway-Park | - |
| tm-sabaton-2026-philadelphia-vv17fzbwgklacdxp | Sabaton | refresh (applied) | 7410020 | https://www.ticketliquidator.com/tickets/7410020/Sabaton-tickets-Wed-Dec-2-2026-The-Met-Presented-by-Highmark | - |
| tm-sabaton-2026-virginia-beach-vv177zbwgklinzle | Sabaton | refresh (applied) | 7410022 | https://www.ticketliquidator.com/tickets/7410022/Sabaton-tickets-Sat-Dec-5-2026-The-Dome-by-Rutter-Mills | - |
| tm-sabaton-2026-national-harbor-1a4zkgtgkdyjn0o | Sabaton | refresh (applied) | 7410023 | https://www.ticketliquidator.com/tickets/7410023/Sabaton-tickets-Sun-Dec-6-2026-The-Theater-at-MGM-National-Harbor | - |
| tm-sabaton-2026-atlanta-vvg1zzbwjnkk6z | Sabaton | refresh (applied) | 7410025 | https://www.ticketliquidator.com/tickets/7410025/Sabaton-tickets-Tue-Dec-8-2026-Coca-Cola-Roxy | - |
| tm-sabaton-2027-praha-9-z698xzu0z1kggp0g_ | Sabaton | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sabaton-2027-helsinki-z698xz8kz16vffuzea | Sabaton | none | - | - | no qualifying listing (complete catalog checked) |
| tm-beartooth-2026-charleston-rz7hnez1af0fgk | Beartooth | refresh (applied) | 7980224 | https://www.ticketliquidator.com/tickets/7980224/Beartooth-tickets-Wed-Dec-2-2026-The-Refinery-SC | - |
| tm-polyphia-2026-praha-7-z698xzu0z16vqdqwjv | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-polyphia-2027-hollywood-vvg10z_glgj36a | Polyphia | refresh (applied) | 8056759 | https://www.ticketliquidator.com/tickets/8056759/Polyphia-tickets-Tue-Feb-9-2027-Hollywood-Palladium | - |
| tm-polyphia-2027-anaheim-vvg10z_gea9xhx | Polyphia | refresh (applied) | 8056760 | https://www.ticketliquidator.com/tickets/8056760/Polyphia-tickets-Thu-Feb-11-2027-House-Of-Blues-Anaheim | - |
| tm-polyphia-2027-san-francisco-g5vyz_gra3gjr | Polyphia | refresh (applied) | 8056761 | https://www.ticketliquidator.com/tickets/8056761/Polyphia-tickets-Sun-Feb-14-2027-The-Masonic-San-Francisco | - |
| tm-polyphia-2027-milwaukee-vvg1jz_gjngwwq | Polyphia | refresh (applied) | 8056853 | https://www.ticketliquidator.com/tickets/8056853/Polyphia-tickets-Wed-Feb-24-2027-Landmark-Credit-Union-Live | - |
| tm-polyphia-2027-chicago-vvg18z_gjsjbx- | Polyphia | refresh (applied) | 8056758 | https://www.ticketliquidator.com/tickets/8056758/Polyphia-tickets-Thu-Feb-25-2027-Byline-Bank-Aragon-Ballroom | - |
| tm-polyphia-2027-detroit-vvg1oz_ge56_sr | Polyphia | refresh (applied) | 8056762 | https://www.ticketliquidator.com/tickets/8056762/Polyphia-tickets-Sat-Feb-27-2027-The-Fillmore-Detroit | - |
| tm-polyphia-2027-toronto-177zv0g6gmyx7u7 | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-polyphia-2027-montreal-17g8v0g6gnmzpef | Polyphia | refresh (applied) | 8056793 | https://www.ticketliquidator.com/tickets/8056793/Polyphia-tickets-Wed-Mar-3-2027-Olympia-Theatre-Montreal | - |
| tm-polyphia-2027-philadelphia-vvg1fz_gn-cuhm | Polyphia | refresh (applied) | 8056765 | https://www.ticketliquidator.com/tickets/8056765/Polyphia-tickets-Fri-Mar-5-2027-The-Fillmore-Philadelphia | - |
| tm-polyphia-2027-brooklyn-k7vgf_gsymxmt | Polyphia | refresh (applied) | 8056771 | https://www.ticketliquidator.com/tickets/8056771/Polyphia-tickets-Sat-Mar-6-2027-Brooklyn-Paramount | - |
| tm-polyphia-2027-boston-vvg17z_ge-9vq3 | Polyphia | refresh (applied) | 8056768 | https://www.ticketliquidator.com/tickets/8056768/Polyphia-tickets-Sun-Mar-7-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-polyphia-2027-washington-17a8v0g6gmr0lc4 | Polyphia | refresh (applied) | 8056764 | https://www.ticketliquidator.com/tickets/8056764/Polyphia-tickets-Tue-Mar-9-2027-Echostage | - |
| tm-polyphia-2027-orlando-17fov0g6gemc12a | Polyphia | refresh (applied) | 8056820 | https://www.ticketliquidator.com/tickets/8056820/Polyphia-tickets-Sat-Mar-13-2027-Hard-Rock-Live-Orlando | - |
| tm-polyphia-2027-atlanta-vvg1zz_gwmeyrd | Polyphia | refresh (applied) | 8056821 | https://www.ticketliquidator.com/tickets/8056821/Polyphia-tickets-Tue-Mar-16-2027-Coca-Cola-Roxy | - |
| tm-polyphia-2027-nashville-g5viz_gnfsyiq | Polyphia | refresh (applied) | 8056822 | https://www.ticketliquidator.com/tickets/8056822/Polyphia-tickets-Thu-Mar-18-2027-The-Truth | - |
| tm-polyphia-2027-dallas-vvg1yz_glmqcu0 | Polyphia | refresh (applied) | 8056763 | https://www.ticketliquidator.com/tickets/8056763/Polyphia-tickets-Sat-Mar-20-2027-South-Side-Ballroom-at-Gilleys | - |
| tm-tobymac-2027-sioux-falls-vv1akzkg_gkd7w414 | TobyMac | refresh (applied) | 7376289 | https://www.ticketliquidator.com/tickets/7376289/TobyMac-tickets-Tue-Mar-16-2027-Denny-Sanford-Premier-Center | - |
| tm-saint-levant-2027-toronto-177zv0g6cemiqt_ | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2027-toronto-177zv0g6cemcutq | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2027-boston-vvg17z_cxqdi4_ | Saint Levant | refresh (applied) | 8144601 | https://www.ticketliquidator.com/tickets/8144601/Saint-Levant-tickets-Sat-Mar-27-2027-Citizens-House-Of-Blues-Boston | - |
| tm-saint-levant-2027-philadelphia-vvg1fz_cxbxmek | Saint Levant | refresh (applied) | 8144618 | https://www.ticketliquidator.com/tickets/8144618/Saint-Levant-tickets-Sun-Mar-28-2027-Theatre-Of-The-Living-Arts | - |
| tm-saint-levant-2027-brooklyn-k7vgf_cl-wdb8 | Saint Levant | refresh (applied) | 8144602 | https://www.ticketliquidator.com/tickets/8144602/Saint-Levant-tickets-Tue-Mar-30-2027-Brooklyn-Paramount | - |
| tm-saint-levant-2027-brooklyn-k7vgf_cl-wsb- | Saint Levant | refresh (applied) | 8144603 | https://www.ticketliquidator.com/tickets/8144603/Saint-Levant-tickets-Wed-Mar-31-2027-Brooklyn-Paramount | - |
| tm-saint-levant-2027-detroit-vvg1oz_cxteu1p | Saint Levant | refresh (applied) | 8133115 | https://www.ticketliquidator.com/tickets/8133115/Saint-Levant-tickets-Tue-Apr-6-2027-The-Fillmore-Detroit | - |
| tm-saint-levant-2027-silver-spring-17a8v0g6cjqrj2z | Saint Levant | refresh (applied) | 8133117 | https://www.ticketliquidator.com/tickets/8133117/Saint-Levant-tickets-Fri-Apr-9-2027-The-Fillmore-Silver-Spring | - |
| tm-saint-levant-2027-charlotte-g5evz_cxoz58q | Saint Levant | refresh (applied) | 8144620 | https://www.ticketliquidator.com/tickets/8144620/Saint-Levant-tickets-Tue-Apr-13-2027-The-Underground-Charlotte | - |
| tm-saint-levant-2027-miami-beach-vvg1vz_clijxyh | Saint Levant | refresh (applied) | 8133114 | https://www.ticketliquidator.com/tickets/8133114/Saint-Levant-tickets-Fri-Apr-16-2027-The-Fillmore-Miami-Beach-At-Jackie-Gleason-Theater | - |
| tm-saint-levant-2027-atlanta-vvg1zz_cjej40m | Saint Levant | refresh (applied) | 8133116 | https://www.ticketliquidator.com/tickets/8133116/Saint-Levant-tickets-Sun-Apr-18-2027-Buckhead-Theatre | - |
| tm-saint-levant-2027-austin-g5diz_cxcz7mc | Saint Levant | refresh (applied) | 8144625 | https://www.ticketliquidator.com/tickets/8144625/Saint-Levant-tickets-Tue-Apr-20-2027-Stubbs-Waller-Creek-Amphitheater | - |
| tm-saint-levant-2027-houston-g5diz_clj5bta | Saint Levant | refresh (applied) | 8144626 | https://www.ticketliquidator.com/tickets/8144626/Saint-Levant-tickets-Wed-Apr-21-2027-Bayou-Music-Center | - |
| tm-saint-levant-2027-dallas-vvg1yz_cxxtz4x | Saint Levant | refresh (applied) | 8130662 | https://www.ticketliquidator.com/tickets/8130662/Saint-Levant-tickets-Thu-Apr-22-2027-South-Side-Ballroom-at-Gilleys | - |
| tm-saint-levant-2027-denver-g5vzz_cl6uyod | Saint Levant | refresh (applied) | 8144627 | https://www.ticketliquidator.com/tickets/8144627/Saint-Levant-tickets-Sun-Apr-25-2027-The-Summit-Music-Hall | - |
| tm-saint-levant-2027-san-diego-rz7hnez1afa7-7 | Saint Levant | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Saint Levant; text: Saint Levant Saint Levant /tickets/8144628/Saint-Levant-tickets-Wed-Apr-28-2027-SOMA Saint Levant Saint Levant SOMA 207147 CONCERTS 3350 Spo) |
| tm-saint-levant-2027-anaheim-vvg10z_cr0rptv | Saint Levant | refresh (applied) | 8144629 | https://www.ticketliquidator.com/tickets/8144629/Saint-Levant-tickets-Thu-Apr-29-2027-House-Of-Blues-Anaheim | - |
| tm-saint-levant-2027-los-angeles-vvg10z_cjir6zj | Saint Levant | refresh (applied) | 8130663 | https://www.ticketliquidator.com/tickets/8130663/Saint-Levant-tickets-Mon-May-3-2027-The-Wiltern | - |
| tm-saint-levant-2027-los-angeles-vvg10z_cjil6zv | Saint Levant | refresh (applied) | 8130664 | https://www.ticketliquidator.com/tickets/8130664/Saint-Levant-tickets-Tue-May-4-2027-The-Wiltern | - |
| tm-saint-levant-2027-san-francisco-g5vyz_cj596wt | Saint Levant | refresh (applied) | 8130665 | https://www.ticketliquidator.com/tickets/8130665/Saint-Levant-tickets-Fri-May-7-2027-The-Masonic-San-Francisco | - |
| tm-the-airborne-toxic-event-2027-charlotte-g5evz_1nj2twb | The Airborne Toxic Event | refresh (applied) | 7977707 | https://www.ticketliquidator.com/tickets/7977707/The-Airborne-Toxic-Event-tickets-Tue-May-18-2027-The-Underground-Charlotte | - |
| tm-the-airborne-toxic-event-2027-washington-17a8v0g61rlmtti | The Airborne Toxic Event | refresh (applied) | 7977704 | https://www.ticketliquidator.com/tickets/7977704/The-Airborne-Toxic-Event-tickets-Thu-May-20-2027-930-Club | - |
| tm-the-airborne-toxic-event-2027-new-york-k7vgf_1hjlw79 | The Airborne Toxic Event | refresh (applied) | 7977701 | https://www.ticketliquidator.com/tickets/7977701/The-Airborne-Toxic-Event-tickets-Fri-May-21-2027-Irving-Plaza | - |
| tm-the-airborne-toxic-event-2027-boston-vvg17z_1qyxhxi | The Airborne Toxic Event | refresh (applied) | 7977954 | https://www.ticketliquidator.com/tickets/7977954/The-Airborne-Toxic-Event-tickets-Sat-May-22-2027-Orpheum-Theatre-Boston | - |
| tm-the-airborne-toxic-event-2027-cleveland-vvg1fz_1qxxiit | The Airborne Toxic Event | refresh (applied) | 7977705 | https://www.ticketliquidator.com/tickets/7977705/The-Airborne-Toxic-Event-tickets-Mon-May-24-2027-House-Of-Blues-Cleveland | - |
| tm-the-airborne-toxic-event-2027-detroit-vv17oz_agkmoc3ug | The Airborne Toxic Event | refresh (applied) | 7977955 | https://www.ticketliquidator.com/tickets/7977955/The-Airborne-Toxic-Event-tickets-Tue-May-25-2027-Saint-Andrews-Hall-Detroit | - |
| tm-the-airborne-toxic-event-2027-minneapolis-vvg1bz_1fhethg | The Airborne Toxic Event | refresh (applied) | 7977709 | https://www.ticketliquidator.com/tickets/7977709/The-Airborne-Toxic-Event-tickets-Thu-May-27-2027-Uptown-Theatre-Minneapolis | - |
| tm-the-airborne-toxic-event-2027-las-vegas-17ayv0g61avjbwz | The Airborne Toxic Event | refresh (applied) | 7977703 | https://www.ticketliquidator.com/tickets/7977703/The-Airborne-Toxic-Event-tickets-Thu-Jun-3-2027-House-Of-Blues-Las-Vegas | - |
| tm-the-airborne-toxic-event-2027-san-diego-vvg1iz_a0ap_1u | The Airborne Toxic Event | refresh (applied) | 7791670 | https://www.ticketliquidator.com/tickets/7791670/The-Airborne-Toxic-Event-tickets-Sat-Jun-5-2027-Humphreys-Concerts-By-The-Bay | - |
| tm-the-airborne-toxic-event-2027-phoenix-17k8v0g61nr_nrj | The Airborne Toxic Event | refresh (applied) | 7977708 | https://www.ticketliquidator.com/tickets/7977708/The-Airborne-Toxic-Event-tickets-Sun-Jun-6-2027-The-Van-Buren | - |
| tm-the-airborne-toxic-event-2027-salt-lake-city-g5vzz_1rps_y3 | The Airborne Toxic Event | refresh (applied) | 7977706 | https://www.ticketliquidator.com/tickets/7977706/The-Airborne-Toxic-Event-tickets-Wed-Jun-9-2027-The-Depot-Salt-Lake-City | - |
| tm-the-airborne-toxic-event-2027-seattle-z7r9jz1a70ybz | The Airborne Toxic Event | refresh (applied) | 7977952 | https://www.ticketliquidator.com/tickets/7977952/The-Airborne-Toxic-Event-tickets-Sun-Jun-13-2027-The-Showbox | - |
| tm-the-airborne-toxic-event-2027-sacramento-g5vyz_1xif7y2 | The Airborne Toxic Event | refresh (applied) | 7978064 | https://www.ticketliquidator.com/tickets/7978064/The-Airborne-Toxic-Event-tickets-Tue-Jun-15-2027-Ace-of-Spades | - |
| tm-the-airborne-toxic-event-2027-san-luis-obispo-z7r9jz1a70w-f | The Airborne Toxic Event | refresh (applied) | 7978076 | https://www.ticketliquidator.com/tickets/7978076/The-Airborne-Toxic-Event-tickets-Wed-Jun-16-2027-Fremont-Theater-CA | - |
| tm-the-airborne-toxic-event-2027-los-angeles-vvg10z_1rtqiih | The Airborne Toxic Event | refresh (applied) | 7977702 | https://www.ticketliquidator.com/tickets/7977702/The-Airborne-Toxic-Event-tickets-Thu-Jun-17-2027-The-Wiltern | - |
| tm-the-airborne-toxic-event-2027-menlo-park-z7r9jz1a70ijm | The Airborne Toxic Event | refresh (applied) | 7977515 | https://www.ticketliquidator.com/tickets/7977515/The-Airborne-Toxic-Event-tickets-Fri-Jun-18-2027-The-Guild-Theatre-Menlo-Park | - |
| tm-the-airborne-toxic-event-2027-menlo-park-z7r9jz1a7pj3f | The Airborne Toxic Event | refresh (applied) | 7978453 | https://www.ticketliquidator.com/tickets/7978453/The-Airborne-Toxic-Event-tickets-Sat-Jun-19-2027-The-Guild-Theatre-Menlo-Park | - |
| tm-andrea-bocelli-2026-abu-dhabi-z698xz52z1k7pedfx | Andrea Bocelli | refresh (applied) | 8090357 | https://www.ticketliquidator.com/tickets/8090357/Andrea-Bocelli-tickets-Wed-Dec-2-2026-Etihad-Arena-Yas-Island | - |
| tm-vnv-nation-2027-limerick-city-1avozbugknqkh_5 | VNV Nation | none | - | - | no qualifying listing (complete catalog checked) |
| tm-vnv-nation-2027-glasgow-16dbzbuq4g7ljkl | VNV Nation | none | - | - | no qualifying listing (complete catalog checked) |
| tm-vnv-nation-2027-nashville-rz7hnez1affnz0 | VNV Nation | refresh (applied) | 8095650 | https://www.ticketliquidator.com/tickets/8095650/VNV-Nation-tickets-Tue-Mar-9-2027-Exit-In | - |
| tm-vnv-nation-2027-ft-lauderdale-vvg1vzbvdf3u-x | VNV Nation | refresh (applied) | 7495737 | https://www.ticketliquidator.com/tickets/7495737/VNV-Nation-tickets-Fri-Mar-12-2027-Culture-Room | - |
| tm-vnv-nation-2027-mesa-z7r9jz1a7qp8u | VNV Nation | refresh (applied) | 7656035 | https://www.ticketliquidator.com/tickets/7656035/VNV-Nation-tickets-Thu-Mar-18-2027-Nile-Theater-AZ | - |
| tm-vnv-nation-2027-san-diego-vvg1izbvnuske3 | VNV Nation | refresh (applied) | 7610204 | https://www.ticketliquidator.com/tickets/7610204/VNV-Nation-tickets-Fri-Mar-19-2027-House-Of-Blues-San-Diego | - |
| tm-vnv-nation-2027-los-angeles-vv170zbvgklj1kgc | VNV Nation | refresh (applied) | 7653520 | https://www.ticketliquidator.com/tickets/7653520/VNV-Nation-tickets-Sat-Mar-20-2027-Belasco-Theater-LA | - |
| tm-vnv-nation-2027-san-francisco-g5vyzbvdfhbds | VNV Nation | refresh (applied) | 7493673 | https://www.ticketliquidator.com/tickets/7493673/VNV-Nation-tickets-Sun-Mar-21-2027-August-Hall | - |
| tm-vnv-nation-2027-seattle-vvg1hzbvl3-6jq | VNV Nation | refresh (applied) | 7496081 | https://www.ticketliquidator.com/tickets/7496081/VNV-Nation-tickets-Wed-Mar-24-2027-The-Neptune-Theatre | - |
| tm-vnv-nation-2027-omaha-z7r9jz1a7q0ef | VNV Nation | refresh (applied) | 7584375 | https://www.ticketliquidator.com/tickets/7584375/VNV-Nation-tickets-Mon-Mar-29-2027-The-Slowdown | - |
| tm-vnv-nation-2027-detroit-vv1afzkuagkexq-mx | VNV Nation | refresh (applied) | 7495777 | https://www.ticketliquidator.com/tickets/7495777/VNV-Nation-tickets-Fri-Apr-2-2027-Saint-Andrews-Hall-Detroit | - |
| tm-vnv-nation-2027-cleveland-vv1kfzbv0wg7mfd6 | VNV Nation | refresh (applied) | 7493671 | https://www.ticketliquidator.com/tickets/7493671/VNV-Nation-tickets-Sat-Apr-3-2027-House-Of-Blues-Cleveland | - |
| tm-vnv-nation-2027-toronto-1avzzbvgkvjgkmw | VNV Nation | none | - | - | no qualifying listing (complete catalog checked) |
| tm-vnv-nation-2027-montreal-1ad7zbvgklrkbrt | VNV Nation | refresh (applied) | 7498713 | https://www.ticketliquidator.com/tickets/7498713/VNV-Nation-tickets-Tue-Apr-6-2027-Theatre-Beanfield | - |
| tm-vnv-nation-2027-boston-vv177zbvgkmc0qfx | VNV Nation | refresh (applied) | 7503826 | https://www.ticketliquidator.com/tickets/7503826/VNV-Nation-tickets-Wed-Apr-7-2027-Paradise-Rock-Club-Presented-by-Citizens | - |
| tm-vnv-nation-2027-brooklyn-k7vgfbvbkdnzs | VNV Nation | refresh (applied) | 7495786 | https://www.ticketliquidator.com/tickets/7495786/VNV-Nation-tickets-Fri-Apr-9-2027-Warsaw | - |
| tm-vnv-nation-2027-baltimore-1avfzbvgklmrqky | VNV Nation | refresh (applied) | 7665363 | https://www.ticketliquidator.com/tickets/7665363/VNV-Nation-tickets-Sat-Apr-10-2027-Baltimore-Soundstage | - |
| tm-vnv-nation-2027-millvale-rz7hnez1afbaps | VNV Nation | refresh (applied) | 7498635 | https://www.ticketliquidator.com/tickets/7498635/VNV-Nation-tickets-Sun-Apr-11-2027-Mr-Smalls-Theatre | - |
| tm-yuridia-2026-zapopan-g5dvz_aia5kvd | Yuridia | refresh (applied) | 8307103 | https://www.ticketliquidator.com/tickets/8307103/Yuridia-tickets-Sat-Dec-5-2026-Coliseo-GNP-Seguros | - |
| tm-fkj-2027-auckland-17azv0g6cklgovf | FKJ | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sylvan-esso-2027-new-orleans-rz7hnez1afqk8n | Sylvan Esso | refresh (applied) | 8043106 | https://www.ticketliquidator.com/tickets/8043106/Sylvan-Esso-tickets-Thu-Mar-11-2027-Tipitinas | - |
| tm-blondshell-2027-san-diego-vvg1iz_1wv8vq3 | Blondshell | refresh (applied) | 7976571 | https://www.ticketliquidator.com/tickets/7976571/Blondshell-tickets-Sun-Feb-28-2027-The-Observatory-North-Park | - |
| tm-blondshell-2027-los-angeles-vvg10z_1drttoa | Blondshell | refresh (applied) | 7976572 | https://www.ticketliquidator.com/tickets/7976572/Blondshell-tickets-Tue-Mar-2-2027-The-Wiltern | - |
| tm-blondshell-2027-san-francisco-g5vyz_1m0mwvc | Blondshell | refresh (applied) | 7976573 | https://www.ticketliquidator.com/tickets/7976573/Blondshell-tickets-Wed-Mar-3-2027-Castro-Theatre | - |
| tm-blondshell-2027-seattle-z7r9jz1a70ere | Blondshell | refresh (applied) | 7976575 | https://www.ticketliquidator.com/tickets/7976575/Blondshell-tickets-Sun-Mar-7-2027-Showbox-SoDo | - |
| tm-blondshell-2027-minneapolis-vvg1bz_1dodkri | Blondshell | refresh (applied) | 7976576 | https://www.ticketliquidator.com/tickets/7976576/Blondshell-tickets-Thu-Mar-11-2027-Varsity-Theater-MN | - |
| tm-blondshell-2027-chicago-z7r9jz1a70ubv | Blondshell | refresh (applied) | 7976577 | https://www.ticketliquidator.com/tickets/7976577/Blondshell-tickets-Fri-Mar-12-2027-Vic-Theatre | - |
| tm-blondshell-2027-philadelphia-z7r9jz1a70gjs | Blondshell | refresh (applied) | 7976580 | https://www.ticketliquidator.com/tickets/7976580/Blondshell-tickets-Sun-Mar-14-2027-Union-Transfer | - |
| tm-blondshell-2027-washington-17a8v0g61wjljxg | Blondshell | refresh (applied) | 7976581 | https://www.ticketliquidator.com/tickets/7976581/Blondshell-tickets-Mon-Mar-15-2027-930-Club | - |
| tm-blondshell-2027-boston-vvg17z_1uqvup8 | Blondshell | refresh (applied) | 7976583 | https://www.ticketliquidator.com/tickets/7976583/Blondshell-tickets-Thu-Mar-18-2027-Citizens-House-Of-Blues-Boston | - |
| tm-blondshell-2027-montreal-17g8v0g61mppmq0 | Blondshell | refresh (applied) | 7976579 | https://www.ticketliquidator.com/tickets/7976579/Blondshell-tickets-Fri-Mar-19-2027-Theatre-Beanfield | - |
| tm-blondshell-2027-toronto-177zv0g61ygdrn9 | Blondshell | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blondshell-2027-brooklyn-z7r9jz1a70gjw | Blondshell | refresh (applied) | 7976582 | https://www.ticketliquidator.com/tickets/7976582/Blondshell-tickets-Mon-Mar-22-2027-Brooklyn-Steel | - |
| tm-the-psychedelic-furs-2027-rancho-mirage-z7r9jz1a7-n8k | The Psychedelic Furs | refresh (applied) | 8383294 | https://www.ticketliquidator.com/tickets/8383294/The-Psychedelic-Furs-tickets-Fri-Mar-19-2027-The-Show-Agua-Caliente-Casino | - |
| tm-the-psychedelic-furs-2027-san-antonio-g5diz_a6js1qk | The Psychedelic Furs | refresh (applied) | 7756931 | https://www.ticketliquidator.com/tickets/7756931/The-Psychedelic-Furs-tickets-Wed-Mar-24-2027-The-Aztec-Theatre | - |
| tm-the-psychedelic-furs-2027-houston-g5diz_a5ghu6h | The Psychedelic Furs | refresh (applied) | 7756930 | https://www.ticketliquidator.com/tickets/7756930/The-Psychedelic-Furs-tickets-Sat-Mar-27-2027-House-Of-Blues-Houston | - |
| tm-the-psychedelic-furs-2027-dallas-vvg1yz_a29lq69 | The Psychedelic Furs | refresh (applied) | 7756928 | https://www.ticketliquidator.com/tickets/7756928/The-Psychedelic-Furs-tickets-Sun-Mar-28-2027-House-Of-Blues-Dallas | - |
| tm-the-psychedelic-furs-2027-new-orleans-g5viz_ad68eh6 | The Psychedelic Furs | refresh (applied) | 7938331 | https://www.ticketliquidator.com/tickets/7938331/The-Psychedelic-Furs-tickets-Sun-Apr-4-2027-The-Fillmore-New-Orleans | - |
| tm-the-psychedelic-furs-2027-orlando-1aefz_agku_10hc | The Psychedelic Furs | refresh (applied) | 7938332 | https://www.ticketliquidator.com/tickets/7938332/The-Psychedelic-Furs-tickets-Sun-Apr-11-2027-Hard-Rock-Live-Orlando | - |
| tm-the-psychedelic-furs-2027-jacksonville-z7r9jz1a703oe | The Psychedelic Furs | refresh (applied) | 7938698 | https://www.ticketliquidator.com/tickets/7938698/The-Psychedelic-Furs-tickets-Wed-Apr-14-2027-Florida-Theatre-Jacksonville | - |
| tm-the-psychedelic-furs-2027-charlotte-g5evz_ausriiu | The Psychedelic Furs | refresh (applied) | 7938330 | https://www.ticketliquidator.com/tickets/7938330/The-Psychedelic-Furs-tickets-Fri-Apr-16-2027-The-Fillmore-Charlotte | - |
| tm-eros-ramazzotti-2027-toronto-1avzzbigklzuxko | Eros Ramazzotti | none | - | - | no qualifying listing (complete catalog checked) |
| tm-eros-ramazzotti-2027-laval-1aszk16gkexqstp | Eros Ramazzotti | refresh (applied) | 7092012 | https://www.ticketliquidator.com/tickets/7092012/Eros-Ramazzotti-tickets-Sun-Sep-26-2027-Place-Bell | - |
| tm-eros-ramazzotti-2027-boston-vv1avzk1fgkd0riv2 | Eros Ramazzotti | refresh (applied) | 7091992 | https://www.ticketliquidator.com/tickets/7091992/Eros-Ramazzotti-tickets-Wed-Sep-29-2027-Wang-Theater-At-The-Boch-Center | - |
| tm-eros-ramazzotti-2027-rosemont-vv1a7zk1egkeidoc0 | Eros Ramazzotti | refresh (applied) | 7091994 | https://www.ticketliquidator.com/tickets/7091994/Eros-Ramazzotti-tickets-Tue-Oct-5-2027-Rosemont-Theatre | - |
| tm-eros-ramazzotti-2027-miami-vvg1vzbicfi7sa | Eros Ramazzotti | refresh (applied) | 7091996 | https://www.ticketliquidator.com/tickets/7091996/Eros-Ramazzotti-tickets-Fri-Oct-8-2027-Kaseya-Center | - |
| tm-eros-ramazzotti-2027-sugar-land-z7r9jz1a74uo8 | Eros Ramazzotti | refresh (applied) | 7103874 | https://www.ticketliquidator.com/tickets/7103874/Eros-Ramazzotti-tickets-Wed-Oct-13-2027-Smart-Financial-Centre | - |
| tm-eros-ramazzotti-2027-inglewood-vvg1izbiyf5ko0 | Eros Ramazzotti | refresh (applied) | 7091997 | https://www.ticketliquidator.com/tickets/7091997/Eros-Ramazzotti-tickets-Sat-Oct-16-2027-YouTube-Theater-at-Hollywood-Park | - |
| tm-the-warning-2027-ciudad-de-mexico-1afzkf4gkenopd9 | The Warning | refresh (applied) | 8280935 | https://www.ticketliquidator.com/tickets/8280935/The-Warning-tickets-Fri-Feb-5-2027-Estadio-GNP-Seguros-Mexico-City | - |
| tm-hilary-duff-2027-ciudad-de-mexico-1afzko6gkdoa5fw | Hilary Duff | refresh (applied) | 7744482 | https://www.ticketliquidator.com/tickets/7744482/Hilary-Duff-tickets-Fri-Feb-12-2027-Palacio-De-Los-Deportes-Mexico-City | - |
| tm-hilary-duff-2027-ciudad-de-mexico-1afzko6gkdomhcz | Hilary Duff | refresh (applied) | 8174253 | https://www.ticketliquidator.com/tickets/8174253/Hilary-Duff-tickets-Sat-Feb-13-2027-Palacio-De-Los-Deportes-Mexico-City | - |
| tm-hilary-duff-2027-zapopan-1av8z_fgknzgqjq | Hilary Duff | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-zurich-z698xzu3z1kg0bbov | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-passenger-2027-praha-1-z698xzu0z16v4-_k4a | Passenger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sienna-spiro-2027-auckland-17azv0g6gnlzs7o | Sienna Spiro | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lizzy-mcalpine-2027-praha-7-z698xzu0z1kufbskd | Lizzy McAlpine | none | - | - | no qualifying listing (complete catalog checked) |
| tm-foy-vance-2027-nashville-rz7hnez1af79qf | Foy Vance | refresh (applied) | 7746922 | https://www.ticketliquidator.com/tickets/7746922/Foy-Vance-tickets-Fri-Apr-9-2027-The-Basement-East-Nashville | - |
| tm-foy-vance-2027-chicago-rz7hnez1af7f-v | Foy Vance | refresh (applied) | 7747255 | https://www.ticketliquidator.com/tickets/7747255/Foy-Vance-tickets-Sat-Apr-17-2027-Thalia-Hall | - |
| tm-foy-vance-2027-washington-rz7hnez1afab_f | Foy Vance | refresh (applied) | 7746902 | https://www.ticketliquidator.com/tickets/7746902/Foy-Vance-tickets-Sat-Apr-24-2027-Howard-Theatre-DC | - |
| tm-foy-vance-2027-new-york-rz7hnez1af7s8v | Foy Vance | refresh (applied) | 7746908 | https://www.ticketliquidator.com/tickets/7746908/Foy-Vance-tickets-Fri-Apr-30-2027-Sony-Hall | - |
| tm-the-lemonheads-2027-miami-rz7hnez1afgkkf | The Lemonheads | refresh (applied) | 8266208 | https://www.ticketliquidator.com/tickets/8266208/The-Lemonheads-tickets-Wed-Feb-17-2027-Las-Rosas | - |
| tm-the-lemonheads-2027-orlando-rz7hnez1afgkf0 | The Lemonheads | refresh (applied) | 8266211 | https://www.ticketliquidator.com/tickets/8266211/The-Lemonheads-tickets-Fri-Feb-19-2027-The-Abbey-Orlando | - |
| tm-the-lemonheads-2027-phoenix-rz7hnez1afgbaf | The Lemonheads | refresh (applied) | 8266218 | https://www.ticketliquidator.com/tickets/8266218/The-Lemonheads-tickets-Sat-Feb-27-2027-The-Crescent-Ballroom-Phoenix | - |
| tm-the-lemonheads-2027-san-juan-capistrano-rz7hnez1a4zzjn | The Lemonheads | refresh (applied) | 8266219 | https://www.ticketliquidator.com/tickets/8266219/The-Lemonheads-tickets-Sun-Feb-28-2027-Coach-House-Capistrano | - |
| tm-the-lemonheads-2027-chicago-rz7hnez1afgof7 | The Lemonheads | refresh (applied) | 8266232 | https://www.ticketliquidator.com/tickets/8266232/The-Lemonheads-tickets-Sat-Mar-20-2027-The-Empty-Bottle | - |
| tm-the-lemonheads-2027-columbus-rz7hnez1afgpp0 | The Lemonheads | refresh (applied) | 8266237 | https://www.ticketliquidator.com/tickets/8266237/The-Lemonheads-tickets-Sat-Mar-27-2027-Rumba-Cafe | - |
| tm-haiden-henderson-2027-praha-5-z698xzu0z16v1ec67a | Haiden Henderson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-haiden-henderson-2027-nashville-rz7hnez1afgiq7 | Haiden Henderson | refresh (applied) | 8284321 | https://www.ticketliquidator.com/tickets/8284321/Haiden-Henderson-tickets-Tue-Apr-13-2027-The-Basement-East-Nashville | - |
| tm-haiden-henderson-2027-san-francisco-rz7hnez1afggu7 | Haiden Henderson | refresh (applied) | 8284339 | https://www.ticketliquidator.com/tickets/8284339/Haiden-Henderson-tickets-Fri-May-14-2027-Brick-Mortar-Music-Hall | - |
| tm-too-many-zooz-2027-colorado-springs-1ae0z_3gkzlv-ok | Too Many Zooz | refresh (applied) | 8284717 | https://www.ticketliquidator.com/tickets/8284717/Too-Many-Zooz-tickets-Wed-Mar-17-2027-Black-Sheep | - |
| tm-too-many-zooz-2027-san-diego-rz7hnez1afgpof | Too Many Zooz | refresh (applied) | 8284725 | https://www.ticketliquidator.com/tickets/8284725/Too-Many-Zooz-tickets-Fri-May-7-2027-Music-Box-San-Diego | - |
| tm-too-many-zooz-2027-san-francisco-rz7hnez1afgsv7 | Too Many Zooz | refresh (applied) | 8284728 | https://www.ticketliquidator.com/tickets/8284728/Too-Many-Zooz-tickets-Sun-May-9-2027-The-Independent | - |
| tm-too-many-zooz-2027-vancouver-rz7hnez1afgyg0 | Too Many Zooz | refresh (applied) | 8284731 | https://www.ticketliquidator.com/tickets/8284731/Too-Many-Zooz-tickets-Sat-May-15-2027-The-Pearl-BC | - |
| tm-amble-2027-vienna-z698xz5rz1kburk7p | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-amble-2027-praha-5-z698xzu0z1kje4u8k | Amble | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-perfect-circle-2026-auckland-1ae8z_kgkr16koz | A Perfect Circle | refresh (applied) | 8173268 | https://www.ticketliquidator.com/tickets/8173268/A-Perfect-Circle-tickets-Sun-Dec-13-2026-Spark-Arena | - |
| tm-greta-van-fleet-2027-praha-9-z698xzu0z1k0yg9c_ | Greta Van Fleet | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-mexico-1av8z_ogku9epc3 | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fontaines-d-c-2027-mexico-1av8z_ogkxugz79 | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hazlett-2027-nashville-z7r9jz1a7p0ay | Hazlett | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch; listing: Hazlett; text: Hazlett Hazlett /tickets/8054866/Hazlett-tickets-Thu-Apr-15-2027-Eastside-Bowl Hazlett Hazlett Eastside Bowl 236774 CONCERTS 1508 Gallatin P) |
| tm-hazlett-2027-charlotte-g5evz_gmhpguu | Hazlett | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Hazlett; text: Hazlett Hazlett /tickets/8054739/Hazlett-tickets-Mon-Apr-19-2027-Neighborhood-Theatre Hazlett Hazlett Neighborhood Theatre 236774 CONCERTS 5) |
| tm-hazlett-2027-charlottesville-vvg17z_gcwfexc | Hazlett | refresh (applied) | 8054740 | https://www.ticketliquidator.com/tickets/8054740/Hazlett-tickets-Tue-Apr-20-2027-Jefferson-Theater-VA | - |
| tm-hazlett-2027-washington-rz7hnez1afukvf | Hazlett | refresh (applied) | 8054742 | https://www.ticketliquidator.com/tickets/8054742/Hazlett-tickets-Fri-Apr-23-2027-Howard-Theatre-DC | - |
| tm-hazlett-2027-pittsburgh-17aov0g6gw-k9-o | Hazlett | refresh (applied) | 8054860 | https://www.ticketliquidator.com/tickets/8054860/Hazlett-tickets-Sun-Apr-25-2027-Spirit-Hall | - |
| tm-hazlett-2027-new-york-k7vgf_gs3k6br | Hazlett | refresh (applied) | 8054733 | https://www.ticketliquidator.com/tickets/8054733/Hazlett-tickets-Tue-Apr-27-2027-Irving-Plaza | - |
| tm-hazlett-2027-portland-vvg17z_grwzm6s | Hazlett | refresh (applied) | 8054735 | https://www.ticketliquidator.com/tickets/8054735/Hazlett-tickets-Fri-Apr-30-2027-State-Theatre-ME | - |
| tm-hazlett-2027-boston-vvg17z_grnbkkr | Hazlett | refresh (applied) | 8054734 | https://www.ticketliquidator.com/tickets/8054734/Hazlett-tickets-Sun-May-2-2027-Paradise-Rock-Club-Presented-by-Citizens | - |
| tm-hazlett-2027-east-cleveland-z7r9jz1a7pe8a | Hazlett | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch; listing: Hazlett; text: Hazlett Hazlett /tickets/8054876/Hazlett-tickets-Sat-May-8-2027-Beachland-Ballroom Hazlett Hazlett Beachland Ballroom 236774 CONCERTS 15711 ) |
| tm-hazlett-2027-toronto-177zv0g6gsbxg-l | Hazlett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hazlett-2027-chicago-vvg18z_glqlopk | Hazlett | refresh (applied) | 8054736 | https://www.ticketliquidator.com/tickets/8054736/Hazlett-tickets-Thu-May-13-2027-House-Of-Blues-Chicago | - |
| tm-hazlett-2027-minneapolis-z7r9jz1a7p0gv | Hazlett | refresh (applied) | 8054867 | https://www.ticketliquidator.com/tickets/8054867/Hazlett-tickets-Fri-May-14-2027-First-Avenue | - |
| tm-hazlett-2027-kansas-city-vvg1bz_c1yj_ec | Hazlett | refresh (applied) | 8054738 | https://www.ticketliquidator.com/tickets/8054738/Hazlett-tickets-Mon-May-17-2027-Madrid-Theatre | - |
| tm-hazlett-2027-seattle-vvg1hz_gmgf1et | Hazlett | refresh (applied) | 8054741 | https://www.ticketliquidator.com/tickets/8054741/Hazlett-tickets-Tue-May-25-2027-The-Neptune-Theatre | - |
| tm-hazlett-2027-vancouver-1778v0g6ctjh581 | Hazlett | refresh (applied) | 8168722 | https://www.ticketliquidator.com/tickets/8168722/Hazlett-tickets-Wed-May-26-2027-Commodore-Ballroom | - |
| tm-hazlett-2027-san-francisco-g5vyz_gmceyww | Hazlett | refresh (applied) | 8054861 | https://www.ticketliquidator.com/tickets/8054861/Hazlett-tickets-Tue-Jun-1-2027-August-Hall | - |
| tm-hazlett-2027-los-angeles-z7r9jz1a7p0oi | Hazlett | refresh (applied) | 8054869 | https://www.ticketliquidator.com/tickets/8054869/Hazlett-tickets-Wed-Jun-2-2027-El-Rey-Theatre-Los-Angeles | - |
| tm-hazlett-2027-san-diego-rz7hnez1afufr7 | Hazlett | refresh (applied) | 8054863 | https://www.ticketliquidator.com/tickets/8054863/Hazlett-tickets-Fri-Jun-4-2027-Music-Box-San-Diego | - |
| tm-hazlett-2027-phoenix-17k8v0g6gijmd6s | Hazlett | refresh (applied) | 8054743 | https://www.ticketliquidator.com/tickets/8054743/Hazlett-tickets-Sat-Jun-5-2027-The-Van-Buren | - |
| tm-hazlett-2027-dallas-z7r9jz1a7pge_ | Hazlett | refresh (applied) | 8054884 | https://www.ticketliquidator.com/tickets/8054884/Hazlett-tickets-Tue-Jun-8-2027-The-Kessler | - |
| tm-dylan-gossett-2026-auckland-17azv0g65cuaddf | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: provider URL names a different date, city mismatch, venue mismatch; listing: Dylan Gossett; text: Dylan Gossett Dylan Gossett /tickets/8370552/Dylan-Gossett-tickets-Sat-Dec-12-2026-Waipara-Winehouse Dylan Gossett Dylan Gossett Waipara Win) |
| tm-dylan-gossett-2026-waipara-17azv0g653pu3v4 | Dylan Gossett | refresh (applied) | 8370552 | https://www.ticketliquidator.com/tickets/8370552/Dylan-Gossett-tickets-Sat-Dec-12-2026-Waipara-Winehouse | - |
| tm-nickelback-2027-zurich-z698xzu3z1kjt1pck | Nickelback | refresh (applied) | 8314986 | https://www.ticketliquidator.com/tickets/8314986/Nickelback-tickets-Sun-Jun-20-2027-Hallenstadion-Zurich | - |
| tm-nickelback-2027-vienna-z698xz5rz16vz489ev | Nickelback | refresh (applied) | 8314989 | https://www.ticketliquidator.com/tickets/8314989/Nickelback-tickets-Fri-Jun-25-2027-Wiener-Stadthalle-Halle-D | - |
| tm-nickelback-2027-praha-9-z698xzu0z1kqvft7s | Nickelback | refresh (applied) | 8314990 | https://www.ticketliquidator.com/tickets/8314990/Nickelback-tickets-Sat-Jun-26-2027-O2-Arena-Prague | - |
| tm-nickelback-2027-helsinki-z698xz8kz16vqs7sfi | Nickelback | refresh (applied) | 8314993 | https://www.ticketliquidator.com/tickets/8314993/Nickelback-tickets-Wed-Jul-7-2027-Veikkaus-Arena | - |
| tm-nickelback-2027-fornebu-z698xzb_z1an7vpy | Nickelback | refresh (applied) | 8314994 | https://www.ticketliquidator.com/tickets/8314994/Nickelback-tickets-Fri-Jul-9-2027-Unity-Arena | - |
| tm-jay-wheeler-2027-estero-vvg1vz9zkibwmk | Jay Wheeler | refresh (applied) | 6151204 | https://www.ticketliquidator.com/tickets/6151204/Jay-Wheeler-tickets-Sun-Mar-7-2027-Hertz-Arena | - |
| tm-jay-wheeler-2027-mexico-16fzkfupgza8kga7 | Jay Wheeler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2027-praha-1-z698xzu0z16vxkonfi | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2027-k-benhavn-v-z698xzc4z16vj9j7ev | Mico | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2027-cleveland-rz7hnez1afut40 | Mico | refresh (applied) | 8315361 | https://www.ticketliquidator.com/tickets/8315361/Mico-tickets-Sat-Mar-13-2027-Globe-Iron | - |
| tm-steve-lacy-2026-seattle-vvg1hz_8pk8e2l | Steve Lacy | refresh (applied) | 8199813 | https://www.ticketliquidator.com/tickets/8199813/Steve-Lacy-tickets-Sat-Nov-28-2026-Wamu-Theater-At-Lumen-Field-Event-Center | - |
| tm-steve-lacy-2026-vancouver-1aozkf7gkepzmxx | Steve Lacy | refresh (applied) | 8199816 | https://www.ticketliquidator.com/tickets/8199816/Steve-Lacy-tickets-Mon-Nov-30-2026-UBC-Doug-Mitchell-Thunderbird-Sports-Centre | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgacnenx | Fuerza Regida | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fuerza-regida-2027-ciudad-de-mexico-1afzk4egkdlzcpt | Fuerza Regida | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fuerza-regida-2027-ciudad-de-mexico-1afzk4egkdowrar | Fuerza Regida | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fuerza-regida-2027-ciudad-de-mexico-1afzk4vgkdxsfp_ | Fuerza Regida | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fuerza-regida-2027-ciudad-de-mexico-1afzk4vgkdn9bgh | Fuerza Regida | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgacn3ld | Fuerza Regida | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgauwxey | Fuerza Regida | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgacnxl1 | Fuerza Regida | refresh (applied) | 8303762 | https://www.ticketliquidator.com/tickets/8303762/Fuerza-Regida-tickets-Fri-Feb-5-2027-Palacio-De-Los-Deportes-Mexico-City | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgacnwlg | Fuerza Regida | refresh (applied) | 8303766 | https://www.ticketliquidator.com/tickets/8303766/Fuerza-Regida-tickets-Sat-Feb-6-2027-Palacio-De-Los-Deportes-Mexico-City | - |
| tm-fuerza-regida-2027-ciudad-de-mexico-1kazvpazgaclelp | Fuerza Regida | refresh (applied) | 8303767 | https://www.ticketliquidator.com/tickets/8303767/Fuerza-Regida-tickets-Sun-Feb-7-2027-Palacio-De-Los-Deportes-Mexico-City | - |
| tm-mei-semones-2027-cambridge-z7r9jz1aaebpz | Mei Semones | refresh (applied) | 8297659 | https://www.ticketliquidator.com/tickets/8297659/Mei-Semones-tickets-Wed-Feb-24-2027-The-Sinclair-Music-Hall | - |
| tm-mei-semones-2027-portland-z7r9jz1aaekpv | Mei Semones | refresh (applied) | 8297680 | https://www.ticketliquidator.com/tickets/8297680/Mei-Semones-tickets-Thu-Feb-25-2027-Space-Gallery | - |
| tm-mei-semones-2027-toronto-rz7hnez1afu780 | Mei Semones | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mei-semones-2027-chicago-z7r9jz1aae3ax | Mei Semones | refresh (applied) | 8297631 | https://www.ticketliquidator.com/tickets/8297631/Mei-Semones-tickets-Tue-Mar-2-2027-Thalia-Hall | - |
| tm-mei-semones-2027-philadelphia-z7r9jz1aaebpd | Mei Semones | refresh (applied) | 8297660 | https://www.ticketliquidator.com/tickets/8297660/Mei-Semones-tickets-Fri-Mar-5-2027-Union-Transfer | - |
| tm-mei-semones-2027-new-york-z7r9jz1aaebpe | Mei Semones | refresh (applied) | 8297661 | https://www.ticketliquidator.com/tickets/8297661/Mei-Semones-tickets-Sat-Mar-6-2027-Webster-Hall | - |
| tm-mei-semones-2027-washington-16vfz_kjpg7wgxq | Mei Semones | refresh (applied) | 8297634 | https://www.ticketliquidator.com/tickets/8297634/Mei-Semones-tickets-Fri-Apr-9-2027-930-Club | - |
| tm-mei-semones-2027-carrboro-z7r9jz1aaefgv | Mei Semones | refresh (applied) | 8297656 | https://www.ticketliquidator.com/tickets/8297656/Mei-Semones-tickets-Sat-Apr-10-2027-Cats-Cradle | - |
| tm-mei-semones-2027-atlanta-z7r9jz1aaeb46 | Mei Semones | refresh (applied) | 8297662 | https://www.ticketliquidator.com/tickets/8297662/Mei-Semones-tickets-Sun-Apr-11-2027-Terminal-West-At-King-Plow-Arts-Center | - |
| tm-mei-semones-2027-houston-g5diz_kenctep | Mei Semones | refresh (applied) | 8297639 | https://www.ticketliquidator.com/tickets/8297639/Mei-Semones-tickets-Fri-Apr-16-2027-White-Oak-Music-Hall-Upstairs | - |
| tm-mei-semones-2027-tucson-z7r9jz1aae9f6 | Mei Semones | refresh (applied) | 8297686 | https://www.ticketliquidator.com/tickets/8297686/Mei-Semones-tickets-Tue-Apr-20-2027-La-Rosa-Tucson | - |
| tm-mei-semones-2027-san-diego-z7r9jz1aae3k4 | Mei Semones | refresh (applied) | 8297641 | https://www.ticketliquidator.com/tickets/8297641/Mei-Semones-tickets-Wed-Apr-21-2027-Music-Box-San-Diego | - |
| tm-mei-semones-2027-san-francisco-g5vyz_kyxockk | Mei Semones | refresh (applied) | 8297647 | https://www.ticketliquidator.com/tickets/8297647/Mei-Semones-tickets-Sat-Apr-24-2027-Castro-Theatre | - |
| tm-mei-semones-2027-vancouver-1178vpcbx94gv5 | Mei Semones | refresh (applied) | 8297654 | https://www.ticketliquidator.com/tickets/8297654/Mei-Semones-tickets-Tue-Apr-27-2027-Commodore-Ballroom | - |
| tm-mei-semones-2027-seattle-vvg1hz_knof3ir | Mei Semones | refresh (applied) | 8297648 | https://www.ticketliquidator.com/tickets/8297648/Mei-Semones-tickets-Wed-Apr-28-2027-The-Neptune-Theatre | - |
| tm-mei-semones-2027-boise-z7r9jz1aaekjo | Mei Semones | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mei-semones-2027-salt-lake-city-z7r9jz1aaefc8 | Mei Semones | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mei-semones-2027-denver-z7r9jz1aae37y | Mei Semones | refresh (applied) | 8297665 | https://www.ticketliquidator.com/tickets/8297665/Mei-Semones-tickets-Sun-May-2-2027-Bluebird-Theater | - |
| tm-mei-semones-2027-lexington-z7r9jz1aaek09 | Mei Semones | refresh (applied) | 8359823 | https://www.ticketliquidator.com/tickets/8359823/Mei-Semones-tickets-Thu-May-6-2027-The-Burl | - |
| tm-mei-semones-2027-columbus-z7r9jz1aaef7k | Mei Semones | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mei-semones-2027-pittsburgh-1avbz_kgkuez9wb | Mei Semones | refresh (applied) | 8297652 | https://www.ticketliquidator.com/tickets/8297652/Mei-Semones-tickets-Sat-May-8-2027-Spirit-Hall | - |
| tm-slipknot-2027-london-1anzkfggkdhuzzd | Slipknot | refresh (applied) | 8294333 | https://www.ticketliquidator.com/tickets/8294333/Slipknot-tickets-Sat-Jul-3-2027-Wembley-Stadium | - |
| tm-slipknot-2027-washington-1a4zkfmgkdgza4s | Slipknot | refresh (applied) | 8293109 | https://www.ticketliquidator.com/tickets/8293109/Slipknot-tickets-Fri-Jul-16-2027-Nationals-Park | - |
| tm-slipknot-2027-queens-g5vvz_kci8xei | Slipknot | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch; listing: Slipknot, Bring Me The Horizon & Acid Bath; text: Slipknot, Bring Me The Horizon & Acid Bath Slipknot, Bring Me The Horizon & Acid Bath /tickets/8293110/Slipknot-tickets-Sun-Jul-18-2027-Citi) |
| tm-slipknot-2027-montreal-1ad7z_3gkln01oc | Slipknot | refresh (applied) | 8293126 | https://www.ticketliquidator.com/tickets/8293126/Slipknot-tickets-Wed-Jul-21-2027-Parc-Jean-Drapeau | - |
| tm-slipknot-2027-toronto-1k7zvpczgauvkjd | Slipknot | none | - | - | no qualifying listing (complete catalog checked) |
| tm-slipknot-2027-chicago-vv167zkfmpfza26gu7 | Slipknot | refresh (applied) | 8293111 | https://www.ticketliquidator.com/tickets/8293111/Slipknot-tickets-Sun-Jul-25-2027-Soldier-Field | - |
| tm-slipknot-2027-hershey-vv1aezkfzgkdcrpxj | Slipknot | refresh (applied) | 8293112 | https://www.ticketliquidator.com/tickets/8293112/Slipknot-tickets-Wed-Jul-28-2027-Hersheypark-Stadium | - |
| tm-slipknot-2027-boston-z7r9jz1aavzbi | Slipknot | refresh (applied) | 8293113 | https://www.ticketliquidator.com/tickets/8293113/Slipknot-tickets-Sat-Jul-31-2027-Fenway-Park | - |
| tm-slipknot-2027-nashville-z7r9jz1aaeazk | Slipknot | refresh (applied) | 8293196 | https://www.ticketliquidator.com/tickets/8293196/Slipknot-tickets-Tue-Aug-3-2027-FirstBank-Stadium | - |
| tm-slipknot-2027-houston-g5diz_kx0z68q | Slipknot | refresh (applied) | 8293114 | https://www.ticketliquidator.com/tickets/8293114/Slipknot-tickets-Fri-Aug-6-2027-Daikin-Park | - |
| tm-slipknot-2027-commerce-city-g5vzz_kofjm9p | Slipknot | refresh (applied) | 8293115 | https://www.ticketliquidator.com/tickets/8293115/Slipknot-tickets-Mon-Aug-9-2027-Dicks-Sporting-Goods-Park | - |
| tm-slipknot-2027-inglewood-vvg1iz_k9by2hw | Slipknot | refresh (applied) | 8293118 | https://www.ticketliquidator.com/tickets/8293118/Slipknot-tickets-Fri-Aug-13-2027-SoFi-Stadium | - |
| tm-slipknot-2027-san-francisco-g5vyz_khsbrlp | Slipknot | refresh (applied) | 8293120 | https://www.ticketliquidator.com/tickets/8293120/Slipknot-tickets-Sun-Aug-15-2027-Golden-Gate-Park | - |
| tm-slipknot-2027-phoenix-1a_zkfggkdfoifq | Slipknot | refresh (applied) | 8293122 | https://www.ticketliquidator.com/tickets/8293122/Slipknot-tickets-Wed-Aug-18-2027-Chase-Field | - |
| tm-noah-kahan-2026-munich-z698xzc2z1k3fveos | Noah Kahan | refresh (applied) | 7877198 | https://www.ticketliquidator.com/tickets/7877198/Noah-Kahan-tickets-Fri-Dec-4-2026-Kleine-Olympiahalle-Munich | - |
| tm-noah-kahan-2027-glasgow-1adbz_8gkufqoce | Noah Kahan | refresh (applied) | 8224897 | https://www.ticketliquidator.com/tickets/8224897/Noah-Kahan-tickets-Tue-Jul-13-2027-National-Stadium-at-Hampden-Park | - |
| tm-noah-kahan-2027-dublin-1abzkffgkeyrrov | Noah Kahan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-noah-kahan-2027-dublin-1abzkfbgkd7h5py | Noah Kahan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-noah-kahan-2027-london-1anzkf3gkd7-b4s | Noah Kahan | refresh (applied) | 8224894 | https://www.ticketliquidator.com/tickets/8224894/Noah-Kahan-tickets-Fri-Jul-23-2027-Wembley-Stadium | - |
| tm-noah-kahan-2027-london-1anzkf4gkexwogg | Noah Kahan | refresh (applied) | 8233856 | https://www.ticketliquidator.com/tickets/8233856/Noah-Kahan-tickets-Sat-Jul-24-2027-Wembley-Stadium | - |
| tm-noah-kahan-2027-london-1anzkf4gkddlzu_ | Noah Kahan | refresh (applied) | 8244107 | https://www.ticketliquidator.com/tickets/8244107/Noah-Kahan-tickets-Sun-Jul-25-2027-Wembley-Stadium | - |
| tm-eagles-2026-las-vegas-1a9zk37gkdxusyv | Eagles | refresh (applied) | 7930157 | https://www.ticketliquidator.com/tickets/7930157/The-Eagles-tickets-Fri-Nov-27-2026-Sphere | - |
| tm-eagles-2026-las-vegas-1a9zk37gkdxzvy5 | Eagles | refresh (applied) | 7930158 | https://www.ticketliquidator.com/tickets/7930158/The-Eagles-tickets-Sat-Nov-28-2026-Sphere | - |
| tm-eagles-2026-las-vegas-1a9zk3dgkdpxlsb | Eagles | refresh (applied) | 8113664 | https://www.ticketliquidator.com/tickets/8113664/The-Eagles-tickets-Fri-Dec-4-2026-Sphere | - |
| tm-eagles-2026-las-vegas-1a9zk3dgkdpxrsr | Eagles | refresh (applied) | 8113665 | https://www.ticketliquidator.com/tickets/8113665/The-Eagles-tickets-Sat-Dec-5-2026-Sphere | - |
| tm-eagles-2026-las-vegas-1a9zk3dgkdpxrso | Eagles | refresh (applied) | 8113666 | https://www.ticketliquidator.com/tickets/8113666/The-Eagles-tickets-Fri-Dec-11-2026-Sphere | - |
| tm-eagles-2026-las-vegas-1a9zk3dgkdbgzr6 | Eagles | refresh (applied) | 8113667 | https://www.ticketliquidator.com/tickets/8113667/The-Eagles-tickets-Sat-Dec-12-2026-Sphere | - |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpxrs0 | Eagles | refresh (applied) | 8180169 | https://www.ticketliquidator.com/tickets/8180169/The-Eagles-tickets-Fri-Jan-15-2027-Sphere | - |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpxtsj | Eagles | refresh (applied) | 8180170 | https://www.ticketliquidator.com/tickets/8180170/The-Eagles-tickets-Sat-Jan-16-2027-Sphere | - |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpxtsi | Eagles | refresh (applied) | 8180171 | https://www.ticketliquidator.com/tickets/8180171/The-Eagles-tickets-Fri-Jan-22-2027-Sphere | - |
| tm-eagles-2027-las-vegas-1a9zk3dgkdpt2sm | Eagles | refresh (applied) | 8180172 | https://www.ticketliquidator.com/tickets/8180172/The-Eagles-tickets-Sat-Jan-23-2027-Sphere | - |
| tm-journey-2026-las-vegas-z7r9jz1a70_7f | Journey | refresh (applied) | 7956855 | https://www.ticketliquidator.com/tickets/7956855/Journey-tickets-Fri-Nov-27-2026-MGM-Grand-Garden-Arena | - |
| tm-journey-2026-san-francisco-g5vyz_aeock9c | Journey | refresh (applied) | 7956787 | https://www.ticketliquidator.com/tickets/7956787/Journey-tickets-Sat-Nov-28-2026-Chase-Center | - |
| tm-john-mayer-2027-las-vegas-11ayvpu8jkxpvc | John Mayer | refresh (applied) | 8294204 | https://www.ticketliquidator.com/tickets/8294204/John-Mayer-tickets-Thu-Apr-8-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7ucku | John Mayer | refresh (applied) | 8294205 | https://www.ticketliquidator.com/tickets/8294205/John-Mayer-tickets-Sat-Apr-10-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7uckz | John Mayer | refresh (applied) | 8294206 | https://www.ticketliquidator.com/tickets/8294206/John-Mayer-tickets-Sun-Apr-11-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7uwkb | John Mayer | refresh (applied) | 8294208 | https://www.ticketliquidator.com/tickets/8294208/John-Mayer-tickets-Thu-Apr-15-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mukw | John Mayer | refresh (applied) | 8294209 | https://www.ticketliquidator.com/tickets/8294209/John-Mayer-tickets-Sat-Apr-17-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mukt | John Mayer | refresh (applied) | 8294211 | https://www.ticketliquidator.com/tickets/8294211/John-Mayer-tickets-Sun-Apr-18-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_fp3g7i6pt | John Mayer | refresh (applied) | 8310915 | https://www.ticketliquidator.com/tickets/8310915/John-Mayer-tickets-Wed-Apr-28-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_fp3g7w9n5 | John Mayer | refresh (applied) | 8310917 | https://www.ticketliquidator.com/tickets/8310917/John-Mayer-tickets-Fri-Apr-30-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_fp3g7dmck | John Mayer | refresh (applied) | 8310918 | https://www.ticketliquidator.com/tickets/8310918/John-Mayer-tickets-Sat-May-1-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mqfv | John Mayer | refresh (applied) | 8310919 | https://www.ticketliquidator.com/tickets/8310919/John-Mayer-tickets-Wed-May-5-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mcfd | John Mayer | refresh (applied) | 8310920 | https://www.ticketliquidator.com/tickets/8310920/John-Mayer-tickets-Fri-May-7-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mwfa | John Mayer | refresh (applied) | 8310921 | https://www.ticketliquidator.com/tickets/8310921/John-Mayer-tickets-Sat-May-8-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7mwf6 | John Mayer | refresh (applied) | 8311171 | https://www.ticketliquidator.com/tickets/8311171/John-Mayer-tickets-Wed-May-12-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zufa | John Mayer | refresh (applied) | 8311172 | https://www.ticketliquidator.com/tickets/8311172/John-Mayer-tickets-Fri-May-14-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zqf5 | John Mayer | refresh (applied) | 8311173 | https://www.ticketliquidator.com/tickets/8311173/John-Mayer-tickets-Sat-May-15-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zqfu | John Mayer | refresh (applied) | 8311174 | https://www.ticketliquidator.com/tickets/8311174/John-Mayer-tickets-Wed-Jun-2-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zcf2 | John Mayer | refresh (applied) | 8311175 | https://www.ticketliquidator.com/tickets/8311175/John-Mayer-tickets-Fri-Jun-4-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zwf4 | John Mayer | refresh (applied) | 8311176 | https://www.ticketliquidator.com/tickets/8311176/John-Mayer-tickets-Sat-Jun-5-2027-Sphere | - |
| tm-backstreet-boys-2026-las-vegas-17ayv0g62tqwir3 | Backstreet Boys | refresh (applied) | 8223803 | https://www.ticketliquidator.com/tickets/8223803/Backstreet-Boys-tickets-Sat-Dec-26-2026-Sphere | - |
| tm-backstreet-boys-2026-las-vegas-17ayv0g62tqtbry | Backstreet Boys | refresh (applied) | 8223802 | https://www.ticketliquidator.com/tickets/8223802/Backstreet-Boys-tickets-Sun-Dec-27-2026-Sphere | - |
| tm-backstreet-boys-2027-las-vegas-17ayv0g62th2fwx | Backstreet Boys | refresh (applied) | 8194445 | https://www.ticketliquidator.com/tickets/8194445/Backstreet-Boys-tickets-Thu-Dec-31-2026-Sphere | - |
| tm-backstreet-boys-2027-las-vegas-17ayv0g62thois9 | Backstreet Boys | refresh (applied) | 8194446 | https://www.ticketliquidator.com/tickets/8194446/Backstreet-Boys-tickets-Fri-Jan-1-2027-Sphere | - |
| tm-backstreet-boys-2027-las-vegas-17ayv0g62th3iss | Backstreet Boys | refresh (applied) | 8194447 | https://www.ticketliquidator.com/tickets/8194447/Backstreet-Boys-tickets-Sat-Jan-2-2027-Sphere | - |
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
| tm-haiden-henderson-2027-west-hollywood-z7r9jz1aaeexf | Haiden Henderson | refresh (applied) | 8284340 | https://www.ticketliquidator.com/tickets/8284340/Haiden-Henderson-tickets-Sat-May-15-2027-Troubadour | - |
| tm-hazlett-2027-glasgow-1auzkfggkeyhp7l | Hazlett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hazlett-2027-manchester-g5vhz_klkyfqd | Hazlett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hazlett-2027-dublin-1abzkfmgkdlb_c6 | Hazlett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hazlett-2027-london-g5dzz_3nl_fgq | Hazlett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nickelback-2027-waurn-ponds-1akzk4fgker3psp | Nickelback | none | - | - | no qualifying listing (complete catalog checked) |
| tm-nickelback-2027-pokolbin-1akzk46gkdiziaq | Nickelback | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-reading-vv17fz_kgks7life | Rod Stewart | refresh (applied) | 8307184 | https://www.ticketliquidator.com/tickets/8307184/Rod-Stewart-tickets-Tue-Mar-2-2027-Santander-Arena | - |
| tm-rod-stewart-2027-niagara-falls-16vzzbmcag7m0q9 | Rod Stewart | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-savannah-vvg1zz_kexgebo | Rod Stewart | refresh (applied) | 8277059 | https://www.ticketliquidator.com/tickets/8277059/Rod-Stewart-tickets-Mon-Mar-8-2027-Enmarket-Arena | - |
| tm-rod-stewart-2027-biloxi-g5viz_kjgqiyx | Rod Stewart | refresh (applied) | 8294731 | https://www.ticketliquidator.com/tickets/8294731/Rod-Stewart-tickets-Wed-Mar-10-2027-Mississippi-Coast-Coliseum | - |
| tm-rod-stewart-2027-hollywood-vvg1vz_3j9ejp4 | Rod Stewart | refresh (applied) | 8266994 | https://www.ticketliquidator.com/tickets/8266994/Rod-Stewart-tickets-Fri-Mar-12-2027-Hard-Rock-Live-At-The-Seminole-Hard-Rock-Hotel-Casino-Hollywood | - |
| tm-rod-stewart-2027-saint-augustine-z7r9jz1aavybs | Rod Stewart | refresh (applied) | 8267706 | https://www.ticketliquidator.com/tickets/8267706/Rod-Stewart-tickets-Tue-Mar-16-2027-St-Augustine-Amphitheatre | - |
| tm-rod-stewart-2027-uncasville-g5vvz_flfx92d | Rod Stewart | refresh (applied) | 8319868 | https://www.ticketliquidator.com/tickets/8319868/Rod-Stewart-tickets-Fri-Mar-19-2027-Mohegan-Sun-Arena-CT | - |
| tm-rod-stewart-2027-dublin-1avoz_kgkw68xnf | Rod Stewart | refresh (applied) | 8307235 | https://www.ticketliquidator.com/tickets/8307235/Rod-Stewart-tickets-Sat-Apr-24-2027-3Arena-Dublin | - |
| tm-rod-stewart-2027-glasgow-1auzkfygkdhvxxd | Rod Stewart | refresh (applied) | 8308633 | https://www.ticketliquidator.com/tickets/8308633/Rod-Stewart-tickets-Sat-May-1-2027-OVO-Hydro | - |
| tm-rod-stewart-2027-birmingham-1kfyvpcfga2dzlv | Rod Stewart | refresh (applied) | 8297144 | https://www.ticketliquidator.com/tickets/8297144/Rod-Stewart-tickets-Tue-May-4-2027-Utilita-Arena-Birmingham | - |
| tm-rod-stewart-2027-manchester-1amzkfugkesbky7 | Rod Stewart | refresh (applied) | 8293090 | https://www.ticketliquidator.com/tickets/8293090/Rod-Stewart-tickets-Thu-May-6-2027-Co-Op-Live | - |
| tm-rod-stewart-2027-manchester-1amzkfzgkdjwz0v | Rod Stewart | refresh (applied) | 8308591 | https://www.ticketliquidator.com/tickets/8308591/Rod-Stewart-tickets-Sat-May-8-2027-Co-Op-Live | - |
| tm-rod-stewart-2027-london-1agzkfzgkdv3zff | Rod Stewart | refresh (applied) | 8294332 | https://www.ticketliquidator.com/tickets/8294332/Rod-Stewart-tickets-Tue-May-11-2027-O2-Arena-London | - |
| tm-rod-stewart-2027-london-1agzkfzgkdvmnjo | Rod Stewart | refresh (applied) | 8308592 | https://www.ticketliquidator.com/tickets/8308592/Rod-Stewart-tickets-Fri-May-14-2027-O2-Arena-London | - |
| tm-rod-stewart-2027-amsterdam-z698xzbpz1kbf3oo4 | Rod Stewart | refresh (applied) | 8299870 | https://www.ticketliquidator.com/tickets/8299870/Rod-Stewart-tickets-Fri-May-28-2027-Ziggo-Dome | - |
| tm-rod-stewart-2027-merksem-antwerpen-z698xzg2z1kq_k_u9 | Rod Stewart | refresh (applied) | 8308634 | https://www.ticketliquidator.com/tickets/8308634/Rod-Stewart-tickets-Sat-May-29-2027-AFAS-Dome | - |
| tm-rod-stewart-2027-berlin-z698xzc2z16vov80ga | Rod Stewart | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-helsinki-z698xz8kz16v7ia-bv | Rod Stewart | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-trondheim-z698xzb_z16vaukozj | Rod Stewart | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-munich-z698xzc2z1kqvo_bs | Rod Stewart | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-praha-9-z698xzu0z16v8ffvx6 | Rod Stewart | refresh (applied) | 8314161 | https://www.ticketliquidator.com/tickets/8314161/Rod-Stewart-tickets-Thu-Jun-24-2027-O2-Arena-Prague | - |
| tm-rod-stewart-2027-krakow-z698xzqpz1kk400qk | Rod Stewart | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-hannover-z698xzc2z1k88ofxe | Rod Stewart | none | - | - | no qualifying listing (complete catalog checked) |
| tm-rod-stewart-2027-morrison-z7r9jz1a7qu14 | Rod Stewart | refresh (applied) | 7548018 | https://www.ticketliquidator.com/tickets/7548018/Rod-Stewart-tickets-Thu-Sep-2-2027-Red-Rocks-Amphitheatre | - |
| tm-rod-stewart-2027-morrison-z7r9jz1a7r6o4 | Rod Stewart | refresh (applied) | 7566556 | https://www.ticketliquidator.com/tickets/7566556/Rod-Stewart-tickets-Fri-Sep-3-2027-Red-Rocks-Amphitheatre | - |
| tm-leon-bridges-2027-south-yarra-1avgz_3gkmvg9lb | Leon Bridges | none | - | - | no qualifying listing (complete catalog checked) |
| tm-leon-bridges-2027-south-yarra-1avgz_3gkrjiqf8 | Leon Bridges | none | - | - | no qualifying listing (complete catalog checked) |
| tm-leon-bridges-2027-las-vegas-1a9zkfsgkex2qfe | Leon Bridges | refresh (applied) | 8313659 | https://www.ticketliquidator.com/tickets/8313659/Leon-Bridges-tickets-Wed-Apr-7-2027-The-Chelsea-The-Cosmopolitan-of-Las-Vegas | - |
| tm-leon-bridges-2027-fort-worth-vvg1yz_f9mdndc | Leon Bridges | refresh (applied) | 8313660 | https://www.ticketliquidator.com/tickets/8313660/Leon-Bridges-tickets-Fri-Apr-23-2027-Ariat-Arena | - |
| tm-leon-bridges-2027-toronto-1a8zk46gkesn6zx | Leon Bridges | none | - | - | no qualifying listing (complete catalog checked) |
| tm-leon-bridges-2027-new-york-g5diz_fqi50fg | Leon Bridges | refresh (applied) | 8313661 | https://www.ticketliquidator.com/tickets/8313661/Leon-Bridges-tickets-Sat-May-1-2027-Madison-Square-Garden | - |
| tm-leon-bridges-2027-charlotte-g5evz_ks2c2jb | Leon Bridges | refresh (applied) | 8313662 | https://www.ticketliquidator.com/tickets/8313662/Leon-Bridges-tickets-Fri-Jul-16-2027-Skyla-Credit-Union-Amphitheatre | - |
| tm-leon-bridges-2027-alpharetta-vvg1zz_k76-tb0 | Leon Bridges | refresh (applied) | 8313663 | https://www.ticketliquidator.com/tickets/8313663/Leon-Bridges-tickets-Sat-Jul-17-2027-Ameris-Bank-Amphitheatre | - |
| tm-leon-bridges-2027-wilmington-g5evz_kw2tkfi | Leon Bridges | refresh (applied) | 8313664 | https://www.ticketliquidator.com/tickets/8313664/Leon-Bridges-tickets-Wed-Jul-21-2027-Live-Oak-Bank-Pavilion-At-Riverfront-Park | - |
| tm-leon-bridges-2027-columbia-1avfz_fqmqezd586 | Leon Bridges | refresh (applied) | 8313665 | https://www.ticketliquidator.com/tickets/8313665/Leon-Bridges-tickets-Fri-Jul-23-2027-Merriweather-Post-Pavilion | - |
| tm-leon-bridges-2027-boston-vv177z_kgkikdrri | Leon Bridges | refresh (applied) | 8313666 | https://www.ticketliquidator.com/tickets/8313666/Leon-Bridges-tickets-Sat-Jul-24-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-leon-bridges-2027-philadelphia-vv17fz_kgkbngqe2 | Leon Bridges | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Leon Bridges & Kokoroko; text: Leon Bridges & Kokoroko Leon Bridges & Kokoroko /tickets/8313667/Leon-Bridges-tickets-Wed-Jul-28-2027-TD-Pavilion-at-The-Mann-Center-For-The) |
| tm-leon-bridges-2027-bend-vvg1hz_ks7yjc4 | Leon Bridges | refresh (applied) | 8313668 | https://www.ticketliquidator.com/tickets/8313668/Leon-Bridges-tickets-Thu-Aug-12-2027-Hayden-Homes-Amphitheater | - |
| tm-leon-bridges-2027-seattle-vvg1hz_fqtqa-a | Leon Bridges | refresh (applied) | 8313669 | https://www.ticketliquidator.com/tickets/8313669/Leon-Bridges-tickets-Fri-Aug-13-2027-Climate-Pledge-Arena | - |
| tm-leon-bridges-2027-edmonton-1aozkfigkdr2_nl | Leon Bridges | refresh (applied) | 8313680 | https://www.ticketliquidator.com/tickets/8313680/Leon-Bridges-tickets-Tue-Aug-17-2027-Northern-Alberta-Jubilee-Auditorium | - |
| tm-leon-bridges-2027-calgary-1aozkfygkeskgd1 | Leon Bridges | refresh (applied) | 8313681 | https://www.ticketliquidator.com/tickets/8313681/Leon-Bridges-tickets-Wed-Aug-18-2027-Grey-Eagle-Resort-Casino | - |
| tm-leon-bridges-2027-calgary-1aozkfygkesvjka | Leon Bridges | refresh (applied) | 8313682 | https://www.ticketliquidator.com/tickets/8313682/Leon-Bridges-tickets-Thu-Aug-19-2027-Grey-Eagle-Resort-Casino | - |
| tm-leon-bridges-2027-bonner-g5vzz_fhjrcg3 | Leon Bridges | refresh (applied) | 8313670 | https://www.ticketliquidator.com/tickets/8313670/Leon-Bridges-tickets-Sat-Aug-21-2027-KettleHouse-Amphitheater | - |
| tm-leon-bridges-2027-waukee-1a-zkfzgkd1bnt9 | Leon Bridges | refresh (applied) | 8313671 | https://www.ticketliquidator.com/tickets/8313671/Leon-Bridges-tickets-Wed-Aug-25-2027-Vibrant-Music-Hall | - |
| tm-leon-bridges-2027-indianapolis-vv17fz_kgkupdufu | Leon Bridges | refresh (applied) | 8313672 | https://www.ticketliquidator.com/tickets/8313672/Leon-Bridges-tickets-Thu-Aug-26-2027-Everwise-Amphitheater-at-White-River-State-Park | - |
| tm-leon-bridges-2027-milwaukee-vv17jz_kgkbyybma | Leon Bridges | refresh (applied) | 8313673 | https://www.ticketliquidator.com/tickets/8313673/Leon-Bridges-tickets-Wed-Sep-15-2027-Landmark-Credit-Union-Live | - |
| tm-leon-bridges-2027-minneapolis-vv1fbz_fb9zezd8da | Leon Bridges | refresh (applied) | 8313674 | https://www.ticketliquidator.com/tickets/8313674/Leon-Bridges-tickets-Fri-Sep-17-2027-The-Armory-Minneapolis | - |
| tm-leon-bridges-2027-rogers-g5viz_kpps1qm | Leon Bridges | refresh (applied) | 8313675 | https://www.ticketliquidator.com/tickets/8313675/Leon-Bridges-tickets-Thu-Sep-23-2027-Walmart-AMP | - |
| tm-leon-bridges-2027-austin-g5diz_flks0j9 | Leon Bridges | refresh (applied) | 8313676 | https://www.ticketliquidator.com/tickets/8313676/Leon-Bridges-tickets-Fri-Sep-24-2027-Moody-Center-ATX | - |
| tm-leon-bridges-2027-houston-g5diz_kb01hxf | Leon Bridges | refresh (applied) | 8313677 | https://www.ticketliquidator.com/tickets/8313677/Leon-Bridges-tickets-Sat-Sep-25-2027-713-Music-Hall | - |
| tm-leon-bridges-2027-phoenix-1a_zk4kgkdlzjqa | Leon Bridges | refresh (applied) | 8313678 | https://www.ticketliquidator.com/tickets/8313678/Leon-Bridges-tickets-Wed-Sep-29-2027-Arizona-Financial-Theatre | - |
| tm-lionel-richie-2027-las-vegas-17ayv0g62k5uqjk | Lionel Richie | refresh (applied) | 8165325 | https://www.ticketliquidator.com/tickets/8165325/Lionel-Richie-tickets-Fri-Jan-8-2027-Encore-Theatre-At-Wynn-Las-Vegas | - |
| tm-lionel-richie-2027-las-vegas-17ayv0g62k5muj2 | Lionel Richie | refresh (applied) | 8165326 | https://www.ticketliquidator.com/tickets/8165326/Lionel-Richie-tickets-Sat-Jan-9-2027-Encore-Theatre-At-Wynn-Las-Vegas | - |
| tm-lionel-richie-2027-thackerville-z7r9jz1aav_-z | Lionel Richie | refresh (applied) | 8237289 | https://www.ticketliquidator.com/tickets/8237289/Lionel-Richie-tickets-Sat-Jan-30-2027-Lucas-Oil-Live-At-WinStar-Casino | - |
| tm-earth-wind-fire-2026-atlantic-city-vv1aezkfagkd-8nc- | Earth, Wind & Fire | refresh (applied) | 8196638 | https://www.ticketliquidator.com/tickets/8196638/Earth-Wind-and-Fire-tickets-Fri-Dec-11-2026-Hard-Rock-Live-At-Etess-Arena | - |
| tm-earth-wind-fire-2026-atlantic-city-vv1aezkfagkd-okcm | Earth, Wind & Fire | refresh (applied) | 8196639 | https://www.ticketliquidator.com/tickets/8196639/Earth-Wind-and-Fire-tickets-Sat-Dec-12-2026-Hard-Rock-Live-At-Etess-Arena | - |
| tm-earth-wind-fire-2027-thackerville-z7r9jz1aazwqd | Earth, Wind & Fire | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Earth, Wind and Fire; text: Earth, Wind and Fire Earth, Wind and Fire /tickets/8178925/Earth-Wind-and-Fire-tickets-Thu-Dec-31-2026-Lucas-Oil-Live-At-WinStar-Casino Eart) |
| tm-earth-wind-fire-2027-west-palm-beach-z7r9jz1aaea-g | Earth, Wind & Fire | refresh (applied) | 8262219 | https://www.ticketliquidator.com/tickets/8262219/Earth-Wind-and-Fire-tickets-Sat-Mar-6-2027-Kravis-Center-Dreyfoos-Concert-Hall | - |
| tm-earth-wind-fire-2027-brandon-g5viz_kuehuto | Earth, Wind & Fire | refresh (applied) | 8307212 | https://www.ticketliquidator.com/tickets/8307212/Earth-Wind-and-Fire-tickets-Sat-Apr-17-2027-Brandon-Amphitheater | - |
| tm-earth-wind-fire-2027-southaven-g5viz_f7otpyl | Earth, Wind & Fire | refresh (applied) | 8307213 | https://www.ticketliquidator.com/tickets/8307213/Earth-Wind-and-Fire-tickets-Tue-Apr-20-2027-BankPlus-Amphitheatre-at-Snowden-Grove | - |
| tm-earth-wind-fire-2027-huntsville-z7r9jz1aaeb18 | Earth, Wind & Fire | refresh (applied) | 8310384 | https://www.ticketliquidator.com/tickets/8310384/Earth-Wind-and-Fire-tickets-Wed-Apr-21-2027-The-Orion-Amphitheater | - |
| tm-earth-wind-fire-2027-atlanta-vvg1zz_33xgiy_ | Earth, Wind & Fire | refresh (applied) | 8307214 | https://www.ticketliquidator.com/tickets/8307214/Earth-Wind-and-Fire-tickets-Fri-Apr-23-2027-Pinnacle-Amphitheater-at-Chastain-Park | - |
| tm-earth-wind-fire-2027-savannah-vvg1zz_3cl5hyq | Earth, Wind & Fire | refresh (applied) | 8307215 | https://www.ticketliquidator.com/tickets/8307215/Earth-Wind-and-Fire-tickets-Sat-Apr-24-2027-Enmarket-Arena | - |
| tm-earth-wind-fire-2027-columbia-g5evz_kl2875x | Earth, Wind & Fire | refresh (applied) | 8307216 | https://www.ticketliquidator.com/tickets/8307216/Earth-Wind-and-Fire-tickets-Tue-Apr-27-2027-Township-Auditorium | - |
| tm-earth-wind-fire-2027-knoxville-g5viz_35urusm | Earth, Wind & Fire | refresh (applied) | 8307217 | https://www.ticketliquidator.com/tickets/8307217/Earth-Wind-and-Fire-tickets-Wed-Apr-28-2027-Tennessee-Theatre | - |
| tm-earth-wind-fire-2027-charlotte-g5evz_kmaoltm | Earth, Wind & Fire | refresh (applied) | 8307218 | https://www.ticketliquidator.com/tickets/8307218/Earth-Wind-and-Fire-tickets-Fri-Apr-30-2027-Skyla-Credit-Union-Amphitheatre | - |
| tm-earth-wind-fire-2027-durham-g5evz_f5p7r9- | Earth, Wind & Fire | refresh (applied) | 8307219 | https://www.ticketliquidator.com/tickets/8307219/Earth-Wind-and-Fire-tickets-Sat-May-1-2027-Durham-Performing-Arts-Center | - |
| tm-santana-2027-las-vegas-1kayvpa0gau5vmo | Santana | refresh (applied) | 8294011 | https://www.ticketliquidator.com/tickets/8294011/Santana-tickets-Wed-Jan-20-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gaugomb | Santana | refresh (applied) | 8294012 | https://www.ticketliquidator.com/tickets/8294012/Santana-tickets-Thu-Jan-21-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gauu-zk | Santana | refresh (applied) | 8294013 | https://www.ticketliquidator.com/tickets/8294013/Santana-tickets-Sat-Jan-23-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gaucsz4 | Santana | refresh (applied) | 8294014 | https://www.ticketliquidator.com/tickets/8294014/Santana-tickets-Sun-Jan-24-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gau8vze | Santana | refresh (applied) | 8294015 | https://www.ticketliquidator.com/tickets/8294015/Santana-tickets-Wed-Jan-27-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gauoozw | Santana | refresh (applied) | 8294016 | https://www.ticketliquidator.com/tickets/8294016/Santana-tickets-Thu-Jan-28-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gau3-y4 | Santana | refresh (applied) | 8294018 | https://www.ticketliquidator.com/tickets/8294018/Santana-tickets-Sat-Jan-30-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gauksyx | Santana | refresh (applied) | 8294019 | https://www.ticketliquidator.com/tickets/8294019/Santana-tickets-Sun-Jan-31-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gau4vyt | Santana | refresh (applied) | 8294020 | https://www.ticketliquidator.com/tickets/8294020/Santana-tickets-Wed-May-12-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gaupoyr | Santana | refresh (applied) | 8294021 | https://www.ticketliquidator.com/tickets/8294021/Santana-tickets-Thu-May-13-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gau9-ys | Santana | refresh (applied) | 8294022 | https://www.ticketliquidator.com/tickets/8294022/Santana-tickets-Sat-May-15-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gaubsyw | Santana | refresh (applied) | 8294023 | https://www.ticketliquidator.com/tickets/8294023/Santana-tickets-Sun-May-16-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gauq-b9 | Santana | refresh (applied) | 8294024 | https://www.ticketliquidator.com/tickets/8294024/Santana-tickets-Wed-May-19-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gaujvbi | Santana | refresh (applied) | 8294025 | https://www.ticketliquidator.com/tickets/8294025/Santana-tickets-Thu-May-20-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gauq-bb | Santana | refresh (applied) | 8294026 | https://www.ticketliquidator.com/tickets/8294026/Santana-tickets-Sat-May-22-2027-House-Of-Blues-Las-Vegas | - |
| tm-santana-2027-las-vegas-1kayvpa0gaursdv | Santana | refresh (applied) | 8294027 | https://www.ticketliquidator.com/tickets/8294027/Santana-tickets-Sun-May-23-2027-House-Of-Blues-Las-Vegas | - |
| tm-simple-minds-2027-auckland-17azv0g6g9-xfc0 | Simple Minds | refresh (applied) | 8173259 | https://www.ticketliquidator.com/tickets/8173259/Simple-Minds-tickets-Thu-Feb-25-2027-Spark-Arena | - |
| tm-simple-minds-2027-wellington-17azv0g6gjon-by | Simple Minds | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-minds-2027-christchurch-17azv0g6gjwt3e9 | Simple Minds | refresh (applied) | 8180239 | https://www.ticketliquidator.com/tickets/8180239/Simple-Minds-tickets-Mon-Mar-1-2027-Wolfbrook-Arena | - |
| tm-simple-minds-2027-assago-zg9rmiynyzdf1v | Simple Minds | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-minds-2027-casalecchio-di-reno-bologna-zg9rmiynyzdfaa | Simple Minds | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-minds-2027-munich-z698xzc2z16vqkpa7j | Simple Minds | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-minds-2027-berlin-z698xzc2z1kbdpf-d | Simple Minds | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-minds-2027-hamburg-z698xzc2z1k0n7tj3 | Simple Minds | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-minds-2027-amsterdam-z698xzbpz16v_t_v7k | Simple Minds | refresh (applied) | 8353390 | https://www.ticketliquidator.com/tickets/8353390/Simple-Minds-tickets-Fri-Apr-30-2027-Ziggo-Dome | - |
| tm-simple-minds-2027-amsterdam-z698xzbpz1k8banaf | Simple Minds | refresh (applied) | 8315154 | https://www.ticketliquidator.com/tickets/8315154/Simple-Minds-tickets-Sat-May-1-2027-Ziggo-Dome | - |
| tm-simple-minds-2027-london-16dfz_313g7wgmr | Simple Minds | refresh (applied) | 8252475 | https://www.ticketliquidator.com/tickets/8252475/Simple-Minds-tickets-Thu-May-6-2027-O2-Arena-London | - |
| tm-simple-minds-2027-manchester-1amzkfxgkdzwjhm | Simple Minds | refresh (applied) | 8247671 | https://www.ticketliquidator.com/tickets/8247671/Simple-Minds-tickets-Fri-May-7-2027-Co-Op-Live | - |
| tm-simple-minds-2027-birmingham-1aegz_31ka4zdg5d | Simple Minds | refresh (applied) | 8378217 | https://www.ticketliquidator.com/tickets/8378217/Simple-Minds-tickets-Sat-May-8-2027-Utilita-Arena-Birmingham | - |
| tm-simple-minds-2027-nottingham-1adfz_31k14zduv5 | Simple Minds | refresh (applied) | 8359735 | https://www.ticketliquidator.com/tickets/8359735/Simple-Minds-tickets-Mon-May-10-2027-Motorpoint-Arena-Nottingham | - |
| tm-simple-minds-2027-leeds-g5vhz_31k8si9 | Simple Minds | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-minds-2027-newcastle-upon-tyne-g5vhz_31k4viz | Simple Minds | refresh (applied) | 8369699 | https://www.ticketliquidator.com/tickets/8369699/Simple-Minds-tickets-Thu-May-13-2027-Utilita-Arena-Newcastle | - |
| tm-simple-minds-2027-glasgow-1auzkfxgkd0xdr8 | Simple Minds | refresh (applied) | 8272591 | https://www.ticketliquidator.com/tickets/8272591/Simple-Minds-tickets-Fri-May-14-2027-OVO-Hydro | - |
| tm-simple-minds-2027-dublin-1kkzvpk_ga2vkuc | Simple Minds | refresh (applied) | 8341561 | https://www.ticketliquidator.com/tickets/8341561/Simple-Minds-tickets-Mon-May-17-2027-3Arena-Dublin | - |
| tm-thirty-seconds-to-mars-2027-madrid-z698xz2qz1kvp4xag | Thirty Seconds to Mars | refresh (applied) | 7877280 | https://www.ticketliquidator.com/tickets/7877280/Thirty-Seconds-To-Mars-tickets-Thu-Apr-8-2027-Movistar-Arena-Madrid | - |
| tm-thirty-seconds-to-mars-2027-valencia-z698xz2qz16vuf8kq4 | Thirty Seconds to Mars | refresh (applied) | 7877281 | https://www.ticketliquidator.com/tickets/7877281/Thirty-Seconds-To-Mars-tickets-Fri-Apr-9-2027-Roig-Arena | - |
| tm-thirty-seconds-to-mars-2027-assago-zg9rmiynyzeadk | Thirty Seconds to Mars | refresh (applied) | 7912640 | https://www.ticketliquidator.com/tickets/7912640/Thirty-Seconds-To-Mars-tickets-Sun-Apr-11-2027-Forum-di-Milano | - |
| tm-thirty-seconds-to-mars-2027-munich-z698xzc2z16vfvofpp | Thirty Seconds to Mars | refresh (applied) | 7877284 | https://www.ticketliquidator.com/tickets/7877284/Thirty-Seconds-To-Mars-tickets-Mon-Apr-12-2027-Kleine-Olympiahalle-Munich | - |
| tm-thirty-seconds-to-mars-2027-vienna-z698xz5rz1k-suw-g | Thirty Seconds to Mars | refresh (applied) | 7877285 | https://www.ticketliquidator.com/tickets/7877285/Thirty-Seconds-To-Mars-tickets-Wed-Apr-14-2027-Wiener-Stadthalle-Halle-D | - |
| tm-thirty-seconds-to-mars-2027-krakow-z698xzqpz1ke8f3ad | Thirty Seconds to Mars | refresh (applied) | 7877286 | https://www.ticketliquidator.com/tickets/7877286/Thirty-Seconds-To-Mars-tickets-Thu-Apr-15-2027-Krakow-Arena | - |
| tm-thirty-seconds-to-mars-2027-hannover-z698xzc2z16vqp_xfz | Thirty Seconds to Mars | refresh (applied) | 7877291 | https://www.ticketliquidator.com/tickets/7877291/Thirty-Seconds-To-Mars-tickets-Tue-Apr-20-2027-ZAG-Arena | - |
| tm-thirty-seconds-to-mars-2027-merksem-antwerpen-z698xzg2z1k-8asf4 | Thirty Seconds to Mars | refresh (applied) | 7877297 | https://www.ticketliquidator.com/tickets/7877297/Thirty-Seconds-To-Mars-tickets-Fri-Apr-23-2027-Lotto-Arena-Antwerp | - |
| tm-thirty-seconds-to-mars-2027-london-1agzk3agkdevn9u | Thirty Seconds to Mars | refresh (applied) | 7877300 | https://www.ticketliquidator.com/tickets/7877300/Thirty-Seconds-To-Mars-tickets-Wed-Apr-28-2027-O2-Arena-London | - |
| tm-thirty-seconds-to-mars-2027-manchester-1amzk3agkeyexfs | Thirty Seconds to Mars | refresh (applied) | 7870156 | https://www.ticketliquidator.com/tickets/7870156/Thirty-Seconds-To-Mars-tickets-Thu-Apr-29-2027-Co-Op-Live | - |
| tm-thirty-seconds-to-mars-2027-dublin-1abzk36gkeuawhf | Thirty Seconds to Mars | refresh (applied) | 7877303 | https://www.ticketliquidator.com/tickets/7877303/Thirty-Seconds-To-Mars-tickets-Sat-May-1-2027-3Arena-Dublin | - |
| tm-hayley-williams-2026-ciudad-de-mexico-g5dvz_1q0q4bc | Hayley Williams | unverify (applied) | 8072644 | https://www.ticketliquidator.com/tickets/8072644/The-Hayley-Williams-Show-tickets-Thu-Nov-26-2026-Auditorio-Nacional-Mexico | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-hayley-williams-2027-ciudad-de-mexico-g5dvz_5u9jpc7 | Hayley Williams | refresh (applied) | 8072651 | https://www.ticketliquidator.com/tickets/8072651/The-Hayley-Williams-Show-tickets-Wed-Jan-13-2027-Auditorio-Nacional-Mexico | - |
| tm-hayley-williams-2027-monterrey-17azv0g65m2hkin | Hayley Williams | refresh (applied) | 8220574 | https://www.ticketliquidator.com/tickets/8220574/Hayley-Williams-tickets-Fri-Jan-15-2027-Auditorio-Banamex | - |
| tm-hayley-williams-2027-zapopan-17azv0g65ulwtlf | Hayley Williams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hayley-williams-2027-forest-brussels-z698xzg2z1kopjxf_ | Hayley Williams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hayley-williams-2027-glasgow-1auzkf-gkd-5zto | Hayley Williams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hayley-williams-2027-cardiff-1adbz_ogkwuumuk | Hayley Williams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blink-182-2027-milano-zg9rmiynyzefk6 | blink-182 | none | - | - | no qualifying listing (complete catalog checked) |
| tm-janet-jackson-2026-sunrise-z7r9jz1aazz43 | Janet Jackson | refresh (applied) | 8225038 | https://www.ticketliquidator.com/tickets/8225038/Janet-Jackson-tickets-Sat-Dec-12-2026-Amerant-Bank-Arena | - |
| tm-gorillaz-2026-zapopan-g5dvz_8mtgfu6 | Gorillaz | none | - | - | no qualifying listing (complete catalog checked) |
| tm-weezer-2027-dublin-17kzv0g62rlynaf | Weezer | none | - | - | no qualifying listing (complete catalog checked) |
| tm-weezer-2027-newcastle-upon-tyne-g5vhz_8kkspwo | Weezer | none | - | - | no qualifying listing (complete catalog checked) |
| tm-weezer-2027-manchester-1amzkf7gkderotz | Weezer | refresh (applied) | 8182169 | https://www.ticketliquidator.com/tickets/8182169/Weezer-tickets-Sat-May-15-2027-Co-Op-Live | - |
| tm-weezer-2027-leeds-g5vhz_8pmm7nv | Weezer | none | - | - | no qualifying listing (complete catalog checked) |
| tm-weezer-2027-glasgow-1auzkf7gkdxjsmu | Weezer | refresh (applied) | 8307719 | https://www.ticketliquidator.com/tickets/8307719/Weezer-tickets-Wed-May-19-2027-OVO-Hydro | - |
| tm-weezer-2027-birmingham-1anzkf7gkdaoymm | Weezer | none | - | - | no qualifying listing (complete catalog checked) |
| tm-weezer-2027-london-g5vhz_83wtacz | Weezer | refresh (applied) | 8195680 | https://www.ticketliquidator.com/tickets/8195680/Weezer-tickets-Sat-May-22-2027-Alexandra-Palace | - |
| tm-weezer-2027-cardiff-1auzkf7gkevbx3b | Weezer | none | - | - | no qualifying listing (complete catalog checked) |
| tm-weezer-2027-oslo-z698xzb_z16vpd8jgb | Weezer | none | - | - | no qualifying listing (complete catalog checked) |
| tm-weezer-2027-helsinki-z698xz8kz1ku3e4ea | Weezer | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mana-2026-ciudad-de-mexico-17azv0g6glh8hre | MANA | refresh (applied) | 8178327 | https://www.ticketliquidator.com/tickets/8178327/Mana-tickets-Wed-Dec-16-2026-Estadio-GNP-Seguros-Mexico-City | - |
| tm-mana-2026-ciudad-de-mexico-17azv0g6gcz4ax4 | MANA | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jonas-brothers-2026-glendale-1av0z_8gkmoa_ep | Jonas Brothers | refresh (applied) | 8214364 | https://www.ticketliquidator.com/tickets/8214364/Jonas-Brothers-tickets-Fri-Nov-27-2026-Desert-Diamond-Arena | - |
| tm-jonas-brothers-2026-las-vegas-z7r9jz1aazwb_ | Jonas Brothers | refresh (applied) | 8214365 | https://www.ticketliquidator.com/tickets/8214365/Jonas-Brothers-tickets-Sat-Nov-28-2026-MGM-Grand-Garden-Arena | - |
| tm-jonas-brothers-2026-san-diego-vvg1iz_8uk3mob | Jonas Brothers | refresh (applied) | 8214367 | https://www.ticketliquidator.com/tickets/8214367/Jonas-Brothers-tickets-Mon-Nov-30-2026-Viejas-Arena-At-Aztec-Bowl | - |
| tm-jonas-brothers-2026-anaheim-vv170z_8gkskkuxl | Jonas Brothers | refresh (applied) | 8214371 | https://www.ticketliquidator.com/tickets/8214371/Jonas-Brothers-tickets-Wed-Dec-2-2026-Honda-Center | - |
| tm-jonas-brothers-2026-seattle-vvg1hz_8uqqunb | Jonas Brothers | refresh (applied) | 8214373 | https://www.ticketliquidator.com/tickets/8214373/Jonas-Brothers-tickets-Sat-Dec-5-2026-Climate-Pledge-Arena | - |
| tm-jonas-brothers-2026-salt-lake-city-z7r9jz1aazwb9 | Jonas Brothers | refresh (applied) | 8214374 | https://www.ticketliquidator.com/tickets/8214374/Jonas-Brothers-tickets-Mon-Dec-7-2026-Delta-Center | - |
| tm-jonas-brothers-2026-denver-g5vzz_8u_uayk | Jonas Brothers | refresh (applied) | 8214376 | https://www.ticketliquidator.com/tickets/8214376/Jonas-Brothers-tickets-Wed-Dec-9-2026-Ball-Arena | - |
| tm-jonas-brothers-2026-lincoln-vv17bz_8gkmchsxu | Jonas Brothers | refresh (applied) | 8214378 | https://www.ticketliquidator.com/tickets/8214378/Jonas-Brothers-tickets-Thu-Dec-10-2026-Pinnacle-Bank-Arena | - |
| tm-jonas-brothers-2026-sioux-falls-vv17bz_8gkdvaovc | Jonas Brothers | refresh (applied) | 8214380 | https://www.ticketliquidator.com/tickets/8214380/Jonas-Brothers-tickets-Sat-Dec-12-2026-Denny-Sanford-Premier-Center | - |
| tm-jonas-brothers-2026-grand-rapids-vv17oz_8gkbyzdvo | Jonas Brothers | refresh (applied) | 8214382 | https://www.ticketliquidator.com/tickets/8214382/Jonas-Brothers-tickets-Tue-Dec-15-2026-Van-Andel-Arena | - |
| tm-jonas-brothers-2026-belmont-park-1adzz_8gku_lwnk | Jonas Brothers | refresh (applied) | 8214384 | https://www.ticketliquidator.com/tickets/8214384/Jonas-Brothers-tickets-Sat-Dec-19-2026-UBS-Arena | - |
| tm-jonas-brothers-2026-newark-vv17fz_8gkzo23wg | Jonas Brothers | refresh (applied) | 8214386 | https://www.ticketliquidator.com/tickets/8214386/Jonas-Brothers-tickets-Mon-Dec-21-2026-Prudential-Center | - |
| tm-jonas-brothers-2026-newark-vv17fz_8gkzo8xsx | Jonas Brothers | refresh (applied) | 8235385 | https://www.ticketliquidator.com/tickets/8235385/Jonas-Brothers-tickets-Tue-Dec-22-2026-Prudential-Center | - |
| tm-brent-faiyaz-2026-chicago-vv1a7zkfwgkda-klv | Brent Faiyaz | refresh (applied) | 8287394 | https://www.ticketliquidator.com/tickets/8287394/Brent-Faiyaz-tickets-Mon-Nov-30-2026-United-Center | - |
| tm-brent-faiyaz-2026-brooklyn-1adzz_3gkxkyvwj | Brent Faiyaz | refresh (applied) | 8287393 | https://www.ticketliquidator.com/tickets/8287393/Brent-Faiyaz-tickets-Thu-Dec-3-2026-Barclays-Center | - |
| tm-brent-faiyaz-2026-los-angeles-z7r9jz1aae7ub | Brent Faiyaz | refresh (applied) | 8287395 | https://www.ticketliquidator.com/tickets/8287395/Brent-Faiyaz-tickets-Fri-Dec-11-2026-Cryptocom-Arena | - |
| tm-zach-bryan-2027-indianapolis-vv17fz_fgkwtxpko | Zach Bryan | refresh (applied) | 8322365 | https://www.ticketliquidator.com/tickets/8322365/Zach-Bryan-tickets-Sat-May-1-2027-Lucas-Oil-Stadium | - |
| tm-zach-bryan-2027-green-bay-vv17jz_fgkshdkie | Zach Bryan | refresh (applied) | 8322366 | https://www.ticketliquidator.com/tickets/8322366/Zach-Bryan-tickets-Tue-May-4-2027-Lambeau-Field | - |
| tm-zach-bryan-2027-east-rutherford-k7vgf_fsxrnwp | Zach Bryan | refresh (applied) | 8322367 | https://www.ticketliquidator.com/tickets/8322367/Zach-Bryan-tickets-Fri-May-14-2027-MetLife-Stadium | - |
| tm-zach-bryan-2027-east-rutherford-k7vgf_fs0cbhd | Zach Bryan | refresh (applied) | 8322368 | https://www.ticketliquidator.com/tickets/8322368/Zach-Bryan-tickets-Sat-May-15-2027-MetLife-Stadium | - |
| tm-zach-bryan-2027-philadelphia-vv17fz_fgksiy1rz | Zach Bryan | refresh (applied) | 8322370 | https://www.ticketliquidator.com/tickets/8322370/Zach-Bryan-tickets-Tue-May-25-2027-Lincoln-Financial-Field | - |
| tm-zach-bryan-2027-atlanta-vvg1zz_fwy55os | Zach Bryan | refresh (applied) | 8322371 | https://www.ticketliquidator.com/tickets/8322371/Zach-Bryan-tickets-Sat-May-29-2027-Mercedes-Benz-Stadium | - |
| tm-zach-bryan-2027-orchard-park-vv17gz_fgksis3fj | Zach Bryan | refresh (applied) | 8322372 | https://www.ticketliquidator.com/tickets/8322372/Zach-Bryan-tickets-Wed-Jun-2-2027-New-Highmark-Stadium | - |
| tm-zach-bryan-2027-las-vegas-1avjz_fgkwbrzg6 | Zach Bryan | refresh (applied) | 8322373 | https://www.ticketliquidator.com/tickets/8322373/Zach-Bryan-tickets-Fri-Jul-16-2027-Allegiant-Stadium | - |
| tm-zach-bryan-2027-inglewood-vvg1iz_frht9v6 | Zach Bryan | refresh (applied) | 8322374 | https://www.ticketliquidator.com/tickets/8322374/Zach-Bryan-tickets-Tue-Jul-20-2027-SoFi-Stadium | - |
| tm-zach-bryan-2027-seattle-vvg1hz_fytloed | Zach Bryan | refresh (applied) | 8322375 | https://www.ticketliquidator.com/tickets/8322375/Zach-Bryan-tickets-Sat-Jul-24-2027-Lumen-Field | - |
| tm-zach-bryan-2027-vancouver-1av7z_fgks885w5 | Zach Bryan | refresh (applied) | 8322377 | https://www.ticketliquidator.com/tickets/8322377/Zach-Bryan-tickets-Wed-Jul-28-2027-BC-Place-Stadium | - |
| tm-zach-bryan-2027-edmonton-1av7z_fgkw2fvlh | Zach Bryan | refresh (applied) | 8322378 | https://www.ticketliquidator.com/tickets/8322378/Zach-Bryan-tickets-Sun-Aug-1-2027-Commonwealth-Stadium-Edmonton | - |
| tm-zach-bryan-2027-boise-g5vzz_fsbnh4h | Zach Bryan | refresh (applied) | 8322376 | https://www.ticketliquidator.com/tickets/8322376/Zach-Bryan-tickets-Fri-Aug-6-2027-Albertsons-Stadium | - |
| tm-five-finger-death-punch-2027-helsinki-z698xz8kz16evk7gay | Five Finger Death Punch | refresh (applied) | 8090422 | https://www.ticketliquidator.com/tickets/8090422/Five-Finger-Death-Punch-tickets-Mon-Feb-22-2027-Veikkaus-Arena | - |
| tm-michelle-branch-2027-toronto-1a8zk4kgkdkp6j5 | Michelle Branch | none | - | - | no qualifying listing (complete catalog checked) |
| tm-michelle-branch-2027-toronto-1a8zk4kgkdkj6jq | Michelle Branch | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sylvan-esso-2027-dublin-1avoz_fgkugispy | Sylvan Esso | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sylvan-esso-2027-manchester-g5vhz_fudi7pq | Sylvan Esso | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sylvan-esso-2027-london-g5dzz_fua9vy_ | Sylvan Esso | none | - | - | no qualifying listing (complete catalog checked) |
| tm-alan-walker-2027-montreal-1aszkfngkely6-x | Alan Walker | refresh (applied) | 8325265 | https://www.ticketliquidator.com/tickets/8325265/Alan-Walker-tickets-Wed-Feb-17-2027-MTelus | - |
| tm-the-lemonheads-2027-roseville-z7r9jz1aavy-u | The Lemonheads | refresh (applied) | 8266222 | https://www.ticketliquidator.com/tickets/8266222/The-Lemonheads-tickets-Fri-Mar-5-2027-Goldfield-Trading-Post-Roseville | - |
| tm-the-lemonheads-2027-portland-z7r9jz1aavv7i | The Lemonheads | refresh (applied) | 8266225 | https://www.ticketliquidator.com/tickets/8266225/The-Lemonheads-tickets-Wed-Mar-10-2027-Hawthorne-Theatre | - |
| tm-haiden-henderson-2027-portland-z7r9jz1aaeekk | Haiden Henderson | correct (applied) | 8284338 | https://www.ticketliquidator.com/tickets/8284338/Haiden-Henderson-tickets-Wed-May-12-2027-Hawthorne-Lounge-at-Hawthorne-Theatre | - |
| tm-fantasia-2027-houston-z7r9jz1aa74o6 | Fantasia | refresh (applied) | 8297853 | https://www.ticketliquidator.com/tickets/8297853/The-Love-of-Soul-Tour-tickets-Fri-Mar-12-2027-Toyota-Center-TX | - |
| tm-greta-van-fleet-2027-glasgow-1auzkfugkd_hipm | Greta Van Fleet | refresh (applied) | 8341908 | https://www.ticketliquidator.com/tickets/8341908/Greta-Van-Fleet-tickets-Wed-Jun-2-2027-OVO-Hydro | - |
| tm-fontaines-d-c-2027-nashville-z7r9jz1aa7vxe | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hazlett-2027-oslo-z698xzb_z16v-jveop | Hazlett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-def-leppard-2027-minneapolis-z7r9jz1aa7eoa | Def Leppard | refresh (applied) | 8312068 | https://www.ticketliquidator.com/tickets/8312068/Def-Leppard-tickets-Sat-Mar-27-2027-Target-Center | - |
| tm-def-leppard-2027-salt-lake-city-z7r9jz1aa7eo3 | Def Leppard | refresh (applied) | 8312070 | https://www.ticketliquidator.com/tickets/8312070/Def-Leppard-tickets-Wed-Mar-31-2027-Delta-Center | - |
| tm-def-leppard-2027-kansas-city-z7r9jz1aa7eof | Def Leppard | refresh (applied) | 8312077 | https://www.ticketliquidator.com/tickets/8312077/Def-Leppard-tickets-Mon-Apr-26-2027-T-Mobile-Center | - |
| tm-def-leppard-2027-spokane-z7r9jz1aa7eoo | Def Leppard | refresh (applied) | 8312083 | https://www.ticketliquidator.com/tickets/8312083/Def-Leppard-tickets-Tue-May-11-2027-Numerica-Veterans-Arena | - |
| tm-def-leppard-2027-houston-z7r9jz1aa7eob | Def Leppard | refresh (applied) | 8312085 | https://www.ticketliquidator.com/tickets/8312085/Def-Leppard-tickets-Tue-Jun-1-2027-Toyota-Center-TX | - |
| tm-def-leppard-2027-cleveland-z7r9jz1aa7eo8 | Def Leppard | refresh (applied) | 8312094 | https://www.ticketliquidator.com/tickets/8312094/Def-Leppard-tickets-Mon-Jun-21-2027-Rocket-Arena | - |
| tm-nickelback-2027-cleveland-z7r9jz1aa774f | Nickelback | refresh (applied) | 8314933 | https://www.ticketliquidator.com/tickets/8314933/Nickelback-tickets-Fri-Feb-12-2027-Rocket-Arena | - |
| tm-nickelback-2027-saint-paul-z7r9jz1aa774k | Nickelback | refresh (applied) | 8314949 | https://www.ticketliquidator.com/tickets/8314949/Nickelback-tickets-Tue-Mar-30-2027-Grand-Casino-Arena | - |
| tm-nickelback-2027-las-vegas-z7r9jz1aa7746 | Nickelback | refresh (applied) | 8314953 | https://www.ticketliquidator.com/tickets/8314953/Nickelback-tickets-Fri-Apr-16-2027-T-Mobile-Arena | - |
| tm-nickelback-2027-salt-lake-city-z7r9jz1aa774a | Nickelback | refresh (applied) | 8314957 | https://www.ticketliquidator.com/tickets/8314957/Nickelback-tickets-Thu-Apr-22-2027-Delta-Center | - |
| tm-nickelback-2027-houston-z7r9jz1aa774o | Nickelback | refresh (applied) | 8314960 | https://www.ticketliquidator.com/tickets/8314960/Nickelback-tickets-Thu-Apr-29-2027-Toyota-Center-TX | - |
| tm-nickelback-2027-london-1agzk46gkddli7z | Nickelback | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mico-2027-jacksonville-z7r9jz1aa7a4e | Mico | refresh (applied) | 8315358 | https://www.ticketliquidator.com/tickets/8315358/Mico-tickets-Tue-Feb-23-2027-FIVE | - |
| tm-mico-2027-lawrence-z7r9jz1aa7a_g | Mico | refresh (applied) | 8315397 | https://www.ticketliquidator.com/tickets/8315397/Mico-tickets-Sat-Mar-6-2027-Granada-Lawrence | - |
| tm-mei-semones-2027-los-angeles-z7r9jz1aa7e-9 | Mei Semones | refresh (applied) | 8297664 | https://www.ticketliquidator.com/tickets/8297664/Mei-Semones-tickets-Fri-Apr-23-2027-The-Fonda-Theatre | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7zwf9 | John Mayer | refresh (applied) | 8319987 | https://www.ticketliquidator.com/tickets/8319987/John-Mayer-tickets-Wed-Jun-9-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7yuf_ | John Mayer | refresh (applied) | 8319986 | https://www.ticketliquidator.com/tickets/8319986/John-Mayer-tickets-Fri-Jun-11-2027-Sphere | - |
| tm-john-mayer-2027-las-vegas-16vjz_komg7yufh | John Mayer | refresh (applied) | 8319985 | https://www.ticketliquidator.com/tickets/8319985/John-Mayer-tickets-Sat-Jun-12-2027-Sphere | - |
| tm-backstreet-boys-2027-toronto-1a8zk4agkeehx1f | Backstreet Boys | none | - | - | no qualifying listing (complete catalog checked) |
| tm-leon-bridges-2027-saint-augustine-z7r9jz1aa7dqk | Leon Bridges | refresh (applied) | 8313683 | https://www.ticketliquidator.com/tickets/8313683/Leon-Bridges-tickets-Sun-Jul-18-2027-St-Augustine-Amphitheatre | - |
| tm-leon-bridges-2027-morrison-z7r9jz1aa7dvk | Leon Bridges | refresh (applied) | 8313527 | https://www.ticketliquidator.com/tickets/8313527/Leon-Bridges-tickets-Tue-Aug-3-2027-Red-Rocks-Amphitheatre | - |
| tm-leon-bridges-2027-vancouver-z7r9jz1aa7dr6 | Leon Bridges | refresh (applied) | 8313686 | https://www.ticketliquidator.com/tickets/8313686/Leon-Bridges-tickets-Sat-Aug-14-2027-Freedom-Mobile-Arch | - |
| tm-leon-bridges-2027-columbus-z7r9jz1aa7dpa | Leon Bridges | refresh (applied) | 8313684 | https://www.ticketliquidator.com/tickets/8313684/Leon-Bridges-tickets-Tue-Sep-14-2027-KEMBA-Live | - |
| tm-leon-bridges-2027-nashville-z7r9jz1aa7dqd | Leon Bridges | refresh (applied) | 8313685 | https://www.ticketliquidator.com/tickets/8313685/Leon-Bridges-tickets-Tue-Sep-21-2027-Ascend-Federal-Credit-Union-Amphitheater | - |
| tm-rod-stewart-2027-dublin-1kkzvpcfga1_k0w | Rod Stewart | refresh (applied) | 8307232 | https://www.ticketliquidator.com/tickets/8307232/Rod-Stewart-tickets-Fri-Apr-23-2027-3Arena-Dublin | - |
| tm-rod-stewart-2027-belfast-1azzkfugkd15ooi | Rod Stewart | refresh (applied) | 8326046 | https://www.ticketliquidator.com/tickets/8326046/Rod-Stewart-tickets-Tue-Apr-27-2027-The-O2-Belfast | - |
| tm-rod-stewart-2027-glasgow-1auzkfmgkehwkob | Rod Stewart | refresh (applied) | 8299954 | https://www.ticketliquidator.com/tickets/8299954/Rod-Stewart-tickets-Thu-Apr-29-2027-OVO-Hydro | - |
| tm-kacey-musgraves-2027-glasgow-1adbz_agkdqknt2 | Kacey Musgraves | refresh (applied) | 7964274 | https://www.ticketliquidator.com/tickets/7964274/Kacey-Musgraves-tickets-Mon-Feb-22-2027-OVO-Hydro | - |
| tm-kacey-musgraves-2027-manchester-g5vhz_gkaityt | Kacey Musgraves | refresh (applied) | 7964277 | https://www.ticketliquidator.com/tickets/7964277/Kacey-Musgraves-tickets-Wed-Feb-24-2027-AO-Arena | - |
| tm-kacey-musgraves-2027-london-1adjz_agkmwrf6s | Kacey Musgraves | refresh (applied) | 7964279 | https://www.ticketliquidator.com/tickets/7964279/Kacey-Musgraves-tickets-Fri-Feb-26-2027-OVO-Arena-Wembley | - |
| tm-chris-stapleton-2026-nashville-g5viz_kleeols | Chris Stapleton | refresh (applied) | 8362337 | https://www.ticketliquidator.com/tickets/8362337/Chris-Stapleton-tickets-Tue-Dec-1-2026-Brooklyn-Bowl-Nashville | - |
| tm-phoebe-bridgers-2026-glasgow-17uov0g6gor33_x | Phoebe Bridgers | refresh (applied) | 8090638 | https://www.ticketliquidator.com/tickets/8090638/Phoebe-Bridgers-tickets-Fri-Nov-27-2026-OVO-Hydro | - |
| tm-phoebe-bridgers-2026-birmingham-17fyv0g6g2_ps5a | Phoebe Bridgers | refresh (applied) | 8090634 | https://www.ticketliquidator.com/tickets/8090634/Phoebe-Bridgers-tickets-Sat-Nov-28-2026-bp-pulse-LIVE | - |
| tm-phoebe-bridgers-2026-london-17u8v0g6gpqo1c- | Phoebe Bridgers | refresh (applied) | 8047973 | https://www.ticketliquidator.com/tickets/8047973/Phoebe-Bridgers-tickets-Tue-Dec-1-2026-O2-Arena-London | - |
| tm-phoebe-bridgers-2026-london-17u8v0g6gnyjt5y | Phoebe Bridgers | refresh (applied) | 8047974 | https://www.ticketliquidator.com/tickets/8047974/Phoebe-Bridgers-tickets-Wed-Dec-2-2026-O2-Arena-London | - |
| tm-bryson-tiller-2026-forest-brussels-z698xzg2z1kq6a0r6 | Bryson Tiller | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryson-tiller-2026-dublin-17kzv0g659_puvu | Bryson Tiller | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryson-tiller-2026-manchester-17uyv0g65whosmd | Bryson Tiller | refresh (applied) | 8090585 | https://www.ticketliquidator.com/tickets/8090585/Bryson-Tiller-tickets-Thu-Dec-3-2026-Co-Op-Live | - |
| tm-bryson-tiller-2026-leeds-g5vhz_5siv57- | Bryson Tiller | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Bryson Tiller; text: Bryson Tiller Bryson Tiller /tickets/8090584/Bryson-Tiller-tickets-Fri-Dec-4-2026-First-Direct-Arena Bryson Tiller Bryson Tiller First Direc) |
| tm-bryson-tiller-2026-cardiff-17uov0g65m7upzx | Bryson Tiller | refresh (applied) | 8090583 | https://www.ticketliquidator.com/tickets/8090583/Bryson-Tiller-tickets-Sat-Dec-5-2026-Cardiff-International-Arena | - |
| tm-bryson-tiller-2026-london-17u8v0g6gkcb7og | Bryson Tiller | refresh (applied) | 8018102 | https://www.ticketliquidator.com/tickets/8018102/Bryson-Tiller-tickets-Mon-Dec-7-2026-O2-Arena-London | - |
| tm-bryson-tiller-2026-birmingham-17fyv0g65u9_ewp | Bryson Tiller | refresh (applied) | 8090582 | https://www.ticketliquidator.com/tickets/8090582/Bryson-Tiller-tickets-Wed-Dec-9-2026-bp-pulse-LIVE | - |
| tm-bryson-tiller-2027-linlithgow-ave-177yv0g65m3hnkk | Bryson Tiller | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryson-tiller-2027-auckland-17azv0g65qclfnt | Bryson Tiller | refresh (applied) | 8173262 | https://www.ticketliquidator.com/tickets/8173262/Bryson-Tiller-tickets-Wed-Jan-27-2027-Spark-Arena | - |
| tm-saint-levant-2027-glasgow-1adbz_fgkb_vncq | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2027-manchester-g5dzz_fbnzksb | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2027-london-1auzk48gkdxoa9q | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-saint-levant-2027-ciudad-de-mexico-g5dvz_o3qzslc | Saint Levant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-lemonheads-2027-seattle-z7r9jz1aa79u7 | The Lemonheads | refresh (applied) | 8266226 | https://www.ticketliquidator.com/tickets/8266226/The-Lemonheads-tickets-Thu-Mar-11-2027-El-Corazon | - |
| tm-haiden-henderson-2027-seattle-z7r9jz1aa79uf | Haiden Henderson | refresh (applied) | 8289676 | https://www.ticketliquidator.com/tickets/8289676/Haiden-Henderson-tickets-Tue-May-11-2027-El-Corazon | - |
| tm-yacht-rock-revue-2027-athens-z7r9jz1aa7oam | Yacht Rock Revue | refresh (applied) | 8310576 | https://www.ticketliquidator.com/tickets/8310576/Yacht-Rock-Revue-tickets-Fri-Feb-26-2027-Georgia-Theatre | - |
| tm-backstreet-boys-2026-las-vegas-17ayv0g62thvzyn | Backstreet Boys | refresh (applied) | 8330023 | https://www.ticketliquidator.com/tickets/8330023/Backstreet-Boys-tickets-Tue-Dec-29-2026-Sphere | - |
| tm-elevation-worship-2027-spokane-z7r9jz1aavwus | Elevation Worship | refresh (applied) | 8272430 | https://www.ticketliquidator.com/tickets/8272430/Elevation-Worship-tickets-Thu-Feb-25-2027-Numerica-Veterans-Arena | - |
| tm-elevation-worship-2027-tacoma-vvg1hz_35ckwg5 | Elevation Worship | refresh (applied) | 8264722 | https://www.ticketliquidator.com/tickets/8264722/Elevation-Worship-tickets-Fri-Feb-26-2027-Tacoma-Dome | - |
| tm-elevation-worship-2027-sacramento-g5vyz_38zvlqx | Elevation Worship | refresh (applied) | 8264723 | https://www.ticketliquidator.com/tickets/8264723/Elevation-Worship-tickets-Mon-Mar-1-2027-Golden-1-Center | - |
| tm-elevation-worship-2027-oakland-g5vyz_3npydie | Elevation Worship | refresh (applied) | 8264724 | https://www.ticketliquidator.com/tickets/8264724/Elevation-Worship-tickets-Tue-Mar-2-2027-Oakland-Arena | - |
| tm-elevation-worship-2027-anaheim-vv16azkfivpza5vug5 | Elevation Worship | refresh (applied) | 8264725 | https://www.ticketliquidator.com/tickets/8264725/Elevation-Worship-tickets-Wed-Mar-3-2027-Honda-Center | - |
| tm-elevation-worship-2027-san-diego-vvg1iz_37k-njg | Elevation Worship | refresh (applied) | 8264726 | https://www.ticketliquidator.com/tickets/8264726/Elevation-Worship-tickets-Fri-Mar-5-2027-Viejas-Arena-At-Aztec-Bowl | - |
| tm-elevation-worship-2027-phoenix-1a_zkf0gkdcjit6 | Elevation Worship | refresh (applied) | 8264727 | https://www.ticketliquidator.com/tickets/8264727/Elevation-Worship-tickets-Sat-Mar-6-2027-Mortgage-Matchup-Center | - |
| tm-elevation-worship-2027-inglewood-vv1aazkfigkdewunn | Elevation Worship | refresh (applied) | 8264728 | https://www.ticketliquidator.com/tickets/8264728/Elevation-Worship-tickets-Sun-Mar-7-2027-The-Kia-Forum | - |
| tm-stevie-wonder-2026-detroit-vv1kezvpa-gaukuph | Stevie Wonder | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stevie-wonder-2026-detroit-vv1koz_3bxg7sqna | Stevie Wonder | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stevie-wonder-2026-inglewood-vv1aazkf0onvvzeug | Stevie Wonder | refresh (applied) | 8252660 | https://www.ticketliquidator.com/tickets/8252660/Stevie-Wonder-tickets-Sat-Dec-19-2026-Intuit-Dome | - |
| tm-lil-wayne-2026-lexington-1avbz_kgkyr04kw | Lil Wayne | refresh (applied) | 7810684 | https://www.ticketliquidator.com/tickets/7810684/Lil-Wayne-tickets-Fri-Dec-4-2026-Rupp-Arena-At-Central-Bank-Center | - |
| tm-lil-wayne-2026-savannah-vvg1zz_3n_vz4w | Lil Wayne | refresh (applied) | 8307423 | https://www.ticketliquidator.com/tickets/8307423/Lil-Wayne-tickets-Sat-Dec-5-2026-Enmarket-Arena | - |
| tm-lil-wayne-2027-reading-vv17fz_kgkwwyiai | Lil Wayne | refresh (applied) | 7810663 | https://www.ticketliquidator.com/tickets/7810663/Lil-Wayne-tickets-Fri-Feb-26-2027-Santander-Arena | - |
| tm-a-boogie-wit-da-hoodie-2026-toronto-168zkfspyzauf8v5 | A Boogie Wit Da Hoodie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-boogie-wit-da-hoodie-2026-orlando-z7r9jz1aaef4e | A Boogie Wit Da Hoodie | refresh (applied) | 8293991 | https://www.ticketliquidator.com/tickets/8293991/A-Boogie-Wit-Da-Hoodie-tickets-Sat-Dec-5-2026-Orlando-Amphitheater-at-Central-Florida-Fairgrounds | - |
| tm-a-boogie-wit-da-hoodie-2026-minneapolis-vv1akzkfygkd_ao6r | A Boogie Wit Da Hoodie | refresh (applied) | 8294956 | https://www.ticketliquidator.com/tickets/8294956/A-Boogie-Wit-Da-Hoodie-tickets-Sat-Dec-12-2026-The-Armory-Minneapolis | - |
| tm-a-boogie-wit-da-hoodie-2026-hartford-z7r9jz1aaea_k | A Boogie Wit Da Hoodie | refresh (applied) | 8293968 | https://www.ticketliquidator.com/tickets/8293968/A-Boogie-Wit-Da-Hoodie-tickets-Sat-Dec-19-2026-PeoplesBank-Arena | - |
| tm-sienna-spiro-2027-austin-g5diz_47ytekn | Sienna Spiro | refresh (applied) | 8332299 | https://www.ticketliquidator.com/tickets/8332299/Sienna-Spiro-tickets-Thu-Aug-5-2027-Moody-Amphitheater | - |
| tm-sienna-spiro-2027-washington-1avfz_fgksa-bdm | Sienna Spiro | refresh (applied) | 8332313 | https://www.ticketliquidator.com/tickets/8332313/Sienna-Spiro-tickets-Thu-Aug-12-2027-The-Anthem-DC | - |
| tm-sienna-spiro-2027-philadelphia-vv17fz_fgkuhzdr4 | Sienna Spiro | refresh (applied) | 8332317 | https://www.ticketliquidator.com/tickets/8332317/Sienna-Spiro-tickets-Sat-Aug-14-2027-The-Met-Presented-by-Highmark | - |
| tm-sienna-spiro-2027-boston-vv177z_fgkd_e0km | Sienna Spiro | refresh (applied) | 8332320 | https://www.ticketliquidator.com/tickets/8332320/Sienna-Spiro-tickets-Sun-Aug-15-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-sienna-spiro-2027-new-york-g5dyz_46da3nv | Sienna Spiro | refresh (applied) | 8332325 | https://www.ticketliquidator.com/tickets/8332325/Sienna-Spiro-tickets-Tue-Aug-17-2027-Radio-City-Music-Hall | - |
| tm-sienna-spiro-2027-detroit-vv1afzk48gkebo40x | Sienna Spiro | refresh (applied) | 8332344 | https://www.ticketliquidator.com/tickets/8332344/Sienna-Spiro-tickets-Mon-Aug-23-2027-Fox-Theatre-Detroit | - |
| tm-sienna-spiro-2027-chicago-vv17jz_fgkxlgu6j | Sienna Spiro | refresh (applied) | 8332347 | https://www.ticketliquidator.com/tickets/8332347/Sienna-Spiro-tickets-Wed-Aug-25-2027-The-Chicago-Theatre | - |
| tm-sienna-spiro-2027-chicago-vv17jz_fgkxlcj6o | Sienna Spiro | refresh (applied) | 8332348 | https://www.ticketliquidator.com/tickets/8332348/Sienna-Spiro-tickets-Thu-Aug-26-2027-The-Chicago-Theatre | - |
| tm-sienna-spiro-2027-minneapolis-vv17bz_fgktexhi7 | Sienna Spiro | refresh (applied) | 8332354 | https://www.ticketliquidator.com/tickets/8332354/Sienna-Spiro-tickets-Sat-Aug-28-2027-The-Armory-Minneapolis | - |
| tm-sienna-spiro-2027-seattle-vvg1hz_4ediyof | Sienna Spiro | refresh (applied) | 8332362 | https://www.ticketliquidator.com/tickets/8332362/Sienna-Spiro-tickets-Thu-Sep-2-2027-Wamu-Theater-At-Lumen-Field-Event-Center | - |
| tm-sienna-spiro-2027-vancouver-1av7z_fgkxqzaez | Sienna Spiro | refresh (applied) | 8332368 | https://www.ticketliquidator.com/tickets/8332368/Sienna-Spiro-tickets-Sat-Sep-4-2027-UBC-Doug-Mitchell-Thunderbird-Sports-Centre | - |
| tm-sienna-spiro-2027-berkeley-g5vyz_fbwbrn7 | Sienna Spiro | refresh (applied) | 8332372 | https://www.ticketliquidator.com/tickets/8332372/Sienna-Spiro-tickets-Tue-Sep-7-2027-Greek-Theatre-UC-Berkeley | - |
| tm-sienna-spiro-2027-mexico-1afzk4ogkeyuq9e | Sienna Spiro | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-interrupters-2027-san-diego-vvg1iz_4zg9ez5 | The Interrupters | refresh (applied) | 8345084 | https://www.ticketliquidator.com/tickets/8345084/The-Interrupters-tickets-Sat-May-1-2027-SOMA | - |
| tm-tommy-emmanuel-2027-grand-junction-g5vzz_fdgnqkn | Tommy Emmanuel | refresh (applied) | 8333067 | https://www.ticketliquidator.com/tickets/8333067/Tommy-Emmanuel-tickets-Wed-Feb-24-2027-The-Avalon-Theatre-CO | - |
| tm-tommy-emmanuel-2027-virginia-beach-vv177z_fgkxnvih0 | Tommy Emmanuel | refresh (applied) | 8333070 | https://www.ticketliquidator.com/tickets/8333070/Tommy-Emmanuel-tickets-Wed-Jun-2-2027-Sandler-Center-For-The-Performing-Arts | - |
| tm-haiden-henderson-2027-minneapolis-z7r9jz1aaeerb | Haiden Henderson | refresh (applied) | 8284334 | https://www.ticketliquidator.com/tickets/8284334/Haiden-Henderson-tickets-Sun-May-2-2027-7th-Street-Entry | - |
| tm-eagles-2027-las-vegas-1a9zk4egkdcmdns | Eagles | refresh (applied) | 8332074 | https://www.ticketliquidator.com/tickets/8332074/The-Eagles-tickets-Fri-Jan-8-2027-Sphere | - |
| tm-eagles-2027-las-vegas-1a9zk4egkdmahp8 | Eagles | refresh (applied) | 8332075 | https://www.ticketliquidator.com/tickets/8332075/The-Eagles-tickets-Sat-Jan-9-2027-Sphere | - |
| tm-sienna-spiro-2027-new-york-g5dyz_46d6wnd | Sienna Spiro | refresh (applied) | 8333456 | https://www.ticketliquidator.com/tickets/8333456/Sienna-Spiro-tickets-Wed-Aug-18-2027-Radio-City-Music-Hall | - |
| tm-yacht-rock-revue-2027-atlanta-z7r9jz1aa7oau | Yacht Rock Revue | refresh (applied) | 8312038 | https://www.ticketliquidator.com/tickets/8312038/Yacht-Rock-Revue-tickets-Sat-Feb-27-2027-The-Eastern-GA | - |
| tm-earth-wind-fire-2027-saint-augustine-z7r9jz1aaeb-p | Earth, Wind & Fire | refresh (applied) | 8310351 | https://www.ticketliquidator.com/tickets/8310351/Earth-Wind-and-Fire-tickets-Wed-Apr-14-2027-St-Augustine-Amphitheatre | - |
| tm-katseye-2026-detroit-vvg1oz_1efshc4 | KATSEYE | refresh (applied) | 7961637 | https://www.ticketliquidator.com/tickets/7961637/Katseye-tickets-Fri-Jan-8-2027-Little-Caesars-Arena | - |
| tm-katseye-2026-chicago-vvg18z_1mip6i3 | KATSEYE | refresh (applied) | 7961638 | https://www.ticketliquidator.com/tickets/7961638/Katseye-tickets-Wed-Jan-6-2027-United-Center | - |
| tm-katseye-2026-minneapolis-vvg1bz_1syoq0j | KATSEYE | refresh (applied) | 7961641 | https://www.ticketliquidator.com/tickets/7961641/Katseye-tickets-Sun-Jan-10-2027-Target-Center | - |
| tm-katseye-2026-ciudad-de-mexico-17azv0g61mujevj | KATSEYE | refresh (applied) | 7983201 | https://www.ticketliquidator.com/tickets/7983201/Katseye-tickets-Fri-Nov-27-2026-Palacio-De-Los-Deportes-Mexico-City | - |
| tm-katseye-2026-ciudad-de-mexico-17azv0g61m2a3xe | KATSEYE | refresh (applied) | 7990930 | https://www.ticketliquidator.com/tickets/7990930/Katseye-tickets-Sat-Nov-28-2026-Palacio-De-Los-Deportes-Mexico-City | - |
| tm-beabadoobee-2026-oslo-z698xzb_z16v38kfe3 | beabadoobee | unverify (applied) | 8094857 | https://www.ticketliquidator.com/tickets/8094857/beabadoobee-tickets-Fri-Nov-27-2026-Oslo-Spektrum | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-beabadoobee-2026-forest-brussels-z698xzg2z16vovadfj | beabadoobee | refresh (applied) | 8094858 | https://www.ticketliquidator.com/tickets/8094858/beabadoobee-tickets-Fri-Dec-4-2026-Vorst-Nationaal | - |
| tm-beabadoobee-2026-berlin-z698xzc2z16vpmfp_a | beabadoobee | refresh (applied) | 8094855 | https://www.ticketliquidator.com/tickets/8094855/beabadoobee-tickets-Sun-Dec-6-2026-Tempodrom | - |
| tm-beabadoobee-2026-dusseldorf-z698xzc2z1k09qy83 | beabadoobee | refresh (applied) | 8094856 | https://www.ticketliquidator.com/tickets/8094856/beabadoobee-tickets-Mon-Dec-7-2026-Mitsubishi-Electric-Halle | - |
| tm-los-tigres-del-norte-2026-baltimore-164zko9e6zackudg | Los Tigres del Norte | refresh (applied) | 7759914 | https://www.ticketliquidator.com/tickets/7759914/Los-Tigres-del-Norte-tickets-Fri-Nov-27-2026-CFG-Bank-Arena | - |
| tm-los-tigres-del-norte-2026-belmont-park-1kgzv0pfgagsn5l | Los Tigres del Norte | refresh (applied) | 7759915 | https://www.ticketliquidator.com/tickets/7759915/Los-Tigres-del-Norte-tickets-Sat-Nov-28-2026-UBS-Arena | - |
| tm-los-tigres-del-norte-2026-nashville-g5viz_an5hweq | Los Tigres del Norte | refresh (applied) | 7759916 | https://www.ticketliquidator.com/tickets/7759916/Los-Tigres-del-Norte-tickets-Fri-Dec-4-2026-Bridgestone-Arena | - |
| tm-los-tigres-del-norte-2026-birmingham-1aozkobgkdkxmhh | Los Tigres del Norte | refresh (applied) | 7759917 | https://www.ticketliquidator.com/tickets/7759917/Los-Tigres-del-Norte-tickets-Sat-Dec-5-2026-Concert-Hall-at-the-BJCC | - |
| tm-los-tigres-del-norte-2027-san-jose-g5vyz_k6cidvv | Los Tigres del Norte | refresh (applied) | 8286352 | https://www.ticketliquidator.com/tickets/8286352/Los-Tigres-del-Norte-tickets-Sat-Feb-20-2027-SAP-Center | - |
| tm-los-tigres-del-norte-2027-temecula-vvg1iz_km0aey4 | Los Tigres del Norte | refresh (applied) | 8309342 | https://www.ticketliquidator.com/tickets/8309342/Los-Tigres-del-Norte-tickets-Sat-Mar-13-2027-Summit-At-Pechanga-Resort-Casino | - |
| tm-zac-brown-band-2027-milwaukee-vv1a6zkf0gkdpf9tr | Zac Brown Band | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Zac Brown Band; text: Zac Brown Band Zac Brown Band /tickets/8252922/Zac-Brown-Band-tickets-Fri-Jun-25-2027-American-Family-Insurance-Amphitheater Zac Brown Band ) |
| tm-sleeping-with-sirens-2027-bristol-17u8v0g6gfkrxfj | Sleeping With Sirens | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sleeping-with-sirens-2027-glasgow-g5dzz_g5isp0f | Sleeping With Sirens | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sleeping-with-sirens-2027-manchester-g5vhz_gfgtq6v | Sleeping With Sirens | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sleeping-with-sirens-2027-birmingham-g5dzz_5wuo0od | Sleeping With Sirens | refresh (applied) | 8127272 | https://www.ticketliquidator.com/tickets/8127272/Sleeping-With-Sirens-tickets-Sat-Mar-6-2027-O2-Academy-Birmingham | - |
| tm-sleeping-with-sirens-2027-london-g5dzz_g5cip1i | Sleeping With Sirens | refresh (applied) | 8050887 | https://www.ticketliquidator.com/tickets/8050887/Sleeping-With-Sirens-tickets-Sun-Mar-7-2027-O2-Academy-Brixton | - |
| tm-sleeping-with-sirens-2027-brisbane-1akzkfygkeprtzf | Sleeping With Sirens | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sleeping-with-sirens-2027-west-melbourne-1avgz_kgkwtduwz | Sleeping With Sirens | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dinosaur-jr-2027-brisbane-1k7yvp4bgacdnzm | Dinosaur Jr. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-zach-bryan-2027-vancouver-1k78vp4fgacgpjm | Zach Bryan | refresh (applied) | 8338720 | https://www.ticketliquidator.com/tickets/8338720/Zach-Bryan-tickets-Tue-Jul-27-2027-BC-Place-Stadium | - |
| tm-zach-bryan-2027-edmonton-16v7z_43bg7l9tm | Zach Bryan | refresh (applied) | 8338683 | https://www.ticketliquidator.com/tickets/8338683/Zach-Bryan-tickets-Sat-Jul-31-2027-Commonwealth-Stadium-Edmonton | - |
| tm-dinosaur-jr-2027-auckland-1a0zk4fgkei-ffe | Dinosaur Jr. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-cece-winans-2026-seattle-vvg1hz_c5fehuk | CeCe Winans | refresh (applied) | 8121702 | https://www.ticketliquidator.com/tickets/8121702/CeCe-Winans-tickets-Thu-Dec-10-2026-Wamu-Theater-At-Lumen-Field-Event-Center | - |
| tm-cece-winans-2026-portland-z7r9jz1a7j6jj | CeCe Winans | refresh (applied) | 8121635 | https://www.ticketliquidator.com/tickets/8121635/CeCe-Winans-tickets-Fri-Dec-11-2026-Arlene-Schnitzer-Concert-Hall | - |
| tm-cece-winans-2026-phoenix-17k8v0g6ch4_jyt | CeCe Winans | refresh (applied) | 8121699 | https://www.ticketliquidator.com/tickets/8121699/CeCe-Winans-tickets-Tue-Dec-15-2026-Arizona-Financial-Theatre | - |
| tm-cece-winans-2026-bakersfield-z7r9jz1a7jfpa | CeCe Winans | refresh (applied) | 8124361 | https://www.ticketliquidator.com/tickets/8124361/CeCe-Winans-tickets-Wed-Dec-16-2026-Dignity-Health-Theater | - |
| tm-cece-winans-2026-los-angeles-z7r9jz1a7jfjs | CeCe Winans | refresh (applied) | 8121811 | https://www.ticketliquidator.com/tickets/8121811/CeCe-Winans-tickets-Thu-Dec-17-2026-Peacock-Theater-Los-Angeles | - |
| tm-cece-winans-2026-sacramento-g5vyz_cr1cmnb | CeCe Winans | refresh (applied) | 8124362 | https://www.ticketliquidator.com/tickets/8124362/CeCe-Winans-tickets-Fri-Dec-18-2026-Sacramento-Memorial-Auditorium | - |
| tm-cece-winans-2027-nashville-z7r9jz1aaebzs | CeCe Winans | refresh (applied) | 7854204 | https://www.ticketliquidator.com/tickets/7854204/CeCe-Winans-tickets-Sun-Mar-21-2027-Grand-Ole-Opry-House | - |
| tm-role-model-2027-berlin-z698xzc2z16vjt07ba | Role Model | none | - | - | no qualifying listing (complete catalog checked) |
| tm-role-model-2027-forest-brussels-z698xzg2z1k8kjzbp | Role Model | refresh (applied) | 8157005 | https://www.ticketliquidator.com/tickets/8157005/Role-Model-tickets-Mon-Feb-15-2027-Vorst-Nationaal | - |
| tm-role-model-2027-dusseldorf-z698xzc2z1ka6aaoi | Role Model | none | - | - | no qualifying listing (complete catalog checked) |
| tm-role-model-2027-dublin-17kzv0g6uvbpba3 | Role Model | none | - | - | no qualifying listing (complete catalog checked) |
| tm-role-model-2027-london-17uyv0g6ueic0m_ | Role Model | refresh (applied) | 8074604 | https://www.ticketliquidator.com/tickets/8074604/Role-Model-tickets-Wed-Feb-24-2027-OVO-Arena-Wembley | - |
| tm-karan-aujla-2026-sacramento-g5vyz_3m-gnbm | Karan Aujla | refresh (applied) | 8267874 | https://www.ticketliquidator.com/tickets/8267874/Karan-Aujla-tickets-Sun-Feb-21-2027-Golden-1-Center | - |
| tm-karan-aujla-2026-los-angeles-g5eyz_3lgqzvb | Karan Aujla | refresh (applied) | 8267866 | https://www.ticketliquidator.com/tickets/8267866/Karan-Aujla-tickets-Fri-Feb-19-2027-Cryptocom-Arena | - |
| tm-karan-aujla-2026-dallas-vvg1yz_3r_e2at | Karan Aujla | refresh (applied) | 8267876 | https://www.ticketliquidator.com/tickets/8267876/Karan-Aujla-tickets-Wed-Feb-3-2027-American-Airlines-Center | - |
| tm-karan-aujla-2026-atlanta-vvg1zz_3myjgwo | Karan Aujla | refresh (applied) | 8267877 | https://www.ticketliquidator.com/tickets/8267877/Karan-Aujla-tickets-Thu-Feb-11-2027-State-Farm-Arena-GA | - |
| tm-karan-aujla-2026-new-york-g5diz_3ivacnr | Karan Aujla | refresh (applied) | 8267865 | https://www.ticketliquidator.com/tickets/8267865/Karan-Aujla-tickets-Mon-Feb-8-2027-Madison-Square-Garden | - |
| tm-karan-aujla-2026-washington-1a4zkftgkdhkud5 | Karan Aujla | refresh (applied) | 8267878 | https://www.ticketliquidator.com/tickets/8267878/Karan-Aujla-tickets-Sat-Feb-6-2027-Capital-One-Arena | - |
| tm-jack-johnson-2027-forest-brussels-z698xzg2z1koeez-t | Jack Johnson | refresh (applied) | 8386729 | https://www.ticketliquidator.com/tickets/8386729/Jack-Johnson-tickets-Sat-Jun-26-2027-Vorst-Nationaal | - |
| tm-jack-johnson-2027-amsterdam-z698xzbpz16v8kg7fn | Jack Johnson | refresh (applied) | 8353391 | https://www.ticketliquidator.com/tickets/8353391/Jack-Johnson-tickets-Sun-Jun-27-2027-Ziggo-Dome | - |
| tm-jack-johnson-2027-st-austell-g5vhz_4eimdn_ | Jack Johnson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jack-johnson-2027-st-austell-g5vhz_4d63ah_ | Jack Johnson | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jack-johnson-2027-london-16dfz_4ebg7va-j | Jack Johnson | refresh (applied) | 8350780 | https://www.ticketliquidator.com/tickets/8350780/Jack-Johnson-tickets-Sun-Jul-4-2027-O2-Arena-London | - |
| tm-phil-wickham-2026-fontana-rz7hnez1afu7r7 | Phil Wickham | refresh (applied) | 8324866 | https://www.ticketliquidator.com/tickets/8324866/Phil-Wickham-tickets-Mon-Nov-30-2026-Water-of-Life-Community-Church | - |
| tm-phil-wickham-2026-fontana-rz7hnez1afu7o0 | Phil Wickham | refresh (applied) | 8324867 | https://www.ticketliquidator.com/tickets/8324867/Phil-Wickham-tickets-Tue-Dec-1-2026-Water-of-Life-Community-Church | - |
| tm-phil-wickham-2026-san-diego-rz7hnez1afu7ov | Phil Wickham | refresh (applied) | 8324868 | https://www.ticketliquidator.com/tickets/8324868/Phil-Wickham-tickets-Thu-Dec-3-2026-Maranatha-Chapel | - |
| tm-phil-wickham-2026-san-diego-rz7hnez1afu7x7 | Phil Wickham | refresh (applied) | 8324869 | https://www.ticketliquidator.com/tickets/8324869/Phil-Wickham-tickets-Fri-Dec-4-2026-Maranatha-Chapel | - |
| tm-phil-wickham-2026-downey-rz7hnez1afu7xf | Phil Wickham | refresh (applied) | 8324870 | https://www.ticketliquidator.com/tickets/8324870/Phil-Wickham-tickets-Sun-Dec-6-2026-Calvary-Chapel-Downey | - |
| tm-gavin-adcock-2026-houston-g5diz_3mqabzl | Gavin Adcock | none | - | - | no qualifying listing (complete catalog checked) |
| tm-gavin-adcock-2026-las-vegas-z7r9jz1a7paas | Gavin Adcock | refresh (applied) | 7927241 | https://www.ticketliquidator.com/tickets/7927241/Gavin-Adcock-tickets-Thu-Dec-10-2026-The-Theater-at-Virgin-Hotels-Las-Vegas | - |
| tm-gavin-adcock-2027-lexington-1apzk4egkdqsq_b | Gavin Adcock | refresh (applied) | 8318410 | https://www.ticketliquidator.com/tickets/8318410/Gavin-Adcock-tickets-Thu-Apr-1-2027-Gatton-Park | - |
| tm-gavin-adcock-2027-saint-louis-1a-zk46gkdfwuei | Gavin Adcock | refresh (applied) | 8318411 | https://www.ticketliquidator.com/tickets/8318411/Gavin-Adcock-tickets-Fri-Apr-2-2027-The-Factory-Chesterfield | - |
| tm-gavin-adcock-2027-saint-louis-1a-zk46gkdfsjen | Gavin Adcock | refresh (applied) | 8318412 | https://www.ticketliquidator.com/tickets/8318412/Gavin-Adcock-tickets-Sat-Apr-3-2027-The-Factory-Chesterfield | - |
| tm-gavin-adcock-2027-university-z7r9jz1a7-y8- | Gavin Adcock | refresh (applied) | 7807220 | https://www.ticketliquidator.com/tickets/7807220/Gavin-Adcock-tickets-Sat-Apr-10-2027-The-Sandy-and-John-Black-Pavilion-at-Ole-Miss | - |
| tm-gavin-adcock-2027-salem-vv1avzk4kgkdddflu | Gavin Adcock | refresh (applied) | 8318413 | https://www.ticketliquidator.com/tickets/8318413/Gavin-Adcock-tickets-Thu-Apr-29-2027-Salem-Civic-Center | - |
| tm-gavin-adcock-2027-saint-augustine-z7r9jz1aa76gg | Gavin Adcock | refresh (applied) | 8319457 | https://www.ticketliquidator.com/tickets/8319457/Gavin-Adcock-tickets-Sat-May-1-2027-St-Augustine-Amphitheatre | - |
| tm-gavin-adcock-2027-oklahoma-city-z7r9jz1aa76gu | Gavin Adcock | refresh (applied) | 8319441 | https://www.ticketliquidator.com/tickets/8319441/Gavin-Adcock-tickets-Fri-May-7-2027-Oklahoma-City-Zoo-Amphitheatre | - |
| tm-gavin-adcock-2027-houston-g5diz_f9nlu8w | Gavin Adcock | refresh (applied) | 8318414 | https://www.ticketliquidator.com/tickets/8318414/Gavin-Adcock-tickets-Sat-May-8-2027-White-Oak-Music-Hall-Lawn | - |
| tm-gavin-adcock-2027-richmond-z7r9jz1aa76gm | Gavin Adcock | refresh (applied) | 8319557 | https://www.ticketliquidator.com/tickets/8319557/Gavin-Adcock-tickets-Thu-May-13-2027-Virginia-Credit-Union-LIVE-at-Richmond-Raceway | - |
| tm-gavin-adcock-2027-atlantic-city-vv17fz_fgkbsdawx | Gavin Adcock | refresh (applied) | 8318415 | https://www.ticketliquidator.com/tickets/8318415/Gavin-Adcock-tickets-Fri-May-14-2027-Hard-Rock-Live-At-Etess-Arena | - |
| tm-gavin-adcock-2027-baltimore-z7r9jz1aa76ue | Gavin Adcock | refresh (applied) | 8319558 | https://www.ticketliquidator.com/tickets/8319558/Gavin-Adcock-tickets-Sat-May-15-2027-Pier-Six-Pavilion | - |
| tm-gavin-adcock-2027-helotes-z7r9jz1aa76gz | Gavin Adcock | refresh (applied) | 8319559 | https://www.ticketliquidator.com/tickets/8319559/Gavin-Adcock-tickets-Thu-May-27-2027-John-T-Floore-Country-Store | - |
| tm-gavin-adcock-2027-helotes-z7r9jz1aa76gy | Gavin Adcock | refresh (applied) | 8319560 | https://www.ticketliquidator.com/tickets/8319560/Gavin-Adcock-tickets-Fri-May-28-2027-John-T-Floore-Country-Store | - |
| tm-zach-bryan-2027-minneapolis-z7r9jz1aa7kad | Zach Bryan | refresh (applied) | 8322379 | https://www.ticketliquidator.com/tickets/8322379/Zach-Bryan-tickets-Wed-Apr-28-2027-US-Bank-Stadium | - |
| tm-zach-bryan-2027-chicago-z7r9jz1aa7pvj | Zach Bryan | refresh (applied) | 8338574 | https://www.ticketliquidator.com/tickets/8338574/Zach-Bryan-tickets-Fri-May-7-2027-Soldier-Field | - |
| tm-zach-bryan-2027-chicago-z7r9jz1aa7ka- | Zach Bryan | refresh (applied) | 8322381 | https://www.ticketliquidator.com/tickets/8322381/Zach-Bryan-tickets-Sat-May-8-2027-Soldier-Field | - |
| tm-zach-bryan-2027-baltimore-z7r9jz1aa7kav | Zach Bryan | refresh (applied) | 8322382 | https://www.ticketliquidator.com/tickets/8322382/Zach-Bryan-tickets-Tue-May-18-2027-MT-Bank-Stadium | - |
| tm-zach-bryan-2027-nashville-z7r9jz1aa7k17 | Zach Bryan | refresh (applied) | 8322383 | https://www.ticketliquidator.com/tickets/8322383/Zach-Bryan-tickets-Sat-May-22-2027-New-Nissan-Stadium | - |
| tm-death-cab-for-cutie-2027-columbus-vv1aazk4fgkd90ltp | Death Cab for Cutie | refresh (applied) | 8338611 | https://www.ticketliquidator.com/tickets/8338611/Death-Cab-for-Cutie-tickets-Mon-Mar-29-2027-Mershon-Auditorium-At-Wexner-Center-For-The-Arts | - |
| tm-death-cab-for-cutie-2027-charlottesville-vv1a8vp46ga2dsp3 | Death Cab for Cutie | refresh (applied) | 8338610 | https://www.ticketliquidator.com/tickets/8338610/Death-Cab-for-Cutie-tickets-Wed-Apr-14-2027-Ting-Pavilion | - |
| tm-tommy-emmanuel-2027-loveland-z7r9jz1aa791k | Tommy Emmanuel | refresh (applied) | 8333068 | https://www.ticketliquidator.com/tickets/8333068/Tommy-Emmanuel-tickets-Thu-Feb-25-2027-Rialto-Theater-CO | - |
| tm-u2-2027-ciudad-de-mexico-1afzk4agkeysi-t | U2 | refresh (applied) | 8329176 | https://www.ticketliquidator.com/tickets/8329176/U2-tickets-Tue-Feb-23-2027-Estadio-GNP-Seguros-Mexico-City | - |
| tm-u2-2027-ciudad-de-mexico-1afzk4agkebeind | U2 | refresh (applied) | 8329177 | https://www.ticketliquidator.com/tickets/8329177/U2-tickets-Fri-Feb-26-2027-Estadio-GNP-Seguros-Mexico-City | - |
| tm-u2-2027-ciudad-de-mexico-1afzk4agkebeina | U2 | refresh (applied) | 8337104 | https://www.ticketliquidator.com/tickets/8337104/U2-tickets-Sun-Feb-28-2027-Estadio-GNP-Seguros-Mexico-City | - |
| tm-u2-2027-ciudad-de-mexico-1afzk4agkebign2 | U2 | refresh (applied) | 8344350 | https://www.ticketliquidator.com/tickets/8344350/U2-tickets-Tue-Mar-2-2027-Estadio-GNP-Seguros-Mexico-City | - |
| tm-dermot-kennedy-2026-wellington-1ae8z_agkmdax8r | Dermot Kennedy | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: provider URL names a different date, city mismatch, venue mismatch; listing: Dermot Kennedy; text: Dermot Kennedy Dermot Kennedy /tickets/8173279/Dermot-Kennedy-tickets-Sat-Nov-28-2026-Spark-Arena Dermot Kennedy Dermot Kennedy Spark Arena ) |
| tm-dermot-kennedy-2026-auckland-1ae8z_agkranxjl | Dermot Kennedy | refresh (applied) | 8173279 | https://www.ticketliquidator.com/tickets/8173279/Dermot-Kennedy-tickets-Sat-Nov-28-2026-Spark-Arena | - |
| tm-dermot-kennedy-2027-tramore-rd-cork-1kkzvpozga5u0fg | Dermot Kennedy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dermot-kennedy-2027-tramore-rd-cork-1kkzvpozga5mff_ | Dermot Kennedy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dermot-kennedy-2027-belfast-1azzk4kgkeju-cx | Dermot Kennedy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-turnpike-troubadours-2026-las-vegas-17ayv0g62soqkki | Turnpike Troubadours | refresh (applied) | 8182281 | https://www.ticketliquidator.com/tickets/8182281/Turnpike-Troubadours-tickets-Fri-Dec-11-2026-Brooklyn-Bowl-Las-Vegas | - |
| tm-sam-fender-2027-newcastle-upon-tyne-1agzk4fgkd88g8t | Sam Fender | refresh (applied) | 8349501 | https://www.ticketliquidator.com/tickets/8349501/Sam-Fender-tickets-Thu-Jun-3-2027-St-James-Park | - |
| tm-sam-fender-2027-newcastle-upon-tyne-1adfz_fgktpp_oj | Sam Fender | refresh (applied) | 8349502 | https://www.ticketliquidator.com/tickets/8349502/Sam-Fender-tickets-Sat-Jun-5-2027-St-James-Park | - |
| tm-sam-fender-2027-cardiff-16gzk4fpszage5ca | Sam Fender | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sam-fender-2027-london-16nzk4f00zauv12c | Sam Fender | refresh (applied) | 8334269 | https://www.ticketliquidator.com/tickets/8334269/Sam-Fender-tickets-Fri-Jun-18-2027-Wembley-Stadium | - |
| tm-sam-fender-2027-london-1anzk4fgkdp88g6 | Sam Fender | refresh (applied) | 8334270 | https://www.ticketliquidator.com/tickets/8334270/Sam-Fender-tickets-Sun-Jun-20-2027-Wembley-Stadium | - |
| tm-sam-fender-2027-dublin-1avoz_fgkxvywdt | Sam Fender | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sam-fender-2027-edinburgh-1auzk4fgkd4qebt | Sam Fender | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sam-fender-2027-manchester-g5dzz_42lyjlw | Sam Fender | refresh (applied) | 8345901 | https://www.ticketliquidator.com/tickets/8345901/Sam-Fender-tickets-Thu-Jul-15-2027-Etihad-Stadium | - |
| tm-sam-fender-2027-manchester-g5dzz_4k4turs | Sam Fender | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bon-jovi-2027-docklands-1aefz_fgkxe60v9 | Bon Jovi | refresh (applied) | 8381239 | https://www.ticketliquidator.com/tickets/8381239/Bon-Jovi-tickets-Thu-Mar-4-2027-Marvel-Stadium | - |
| tm-bon-jovi-2027-east-rutherford-k7vgf_4evgqwy | Bon Jovi | refresh (applied) | 8329063 | https://www.ticketliquidator.com/tickets/8329063/Bon-Jovi-tickets-Thu-Jul-15-2027-MetLife-Stadium | - |
| tm-bon-jovi-2027-chicago-vv178z_fgkh_n5td | Bon Jovi | refresh (applied) | 8329064 | https://www.ticketliquidator.com/tickets/8329064/Bon-Jovi-tickets-Wed-Jul-21-2027-Soldier-Field | - |
| tm-bon-jovi-2027-foxborough-vv1avzk48gke-15d8 | Bon Jovi | refresh (applied) | 8329065 | https://www.ticketliquidator.com/tickets/8329065/Bon-Jovi-tickets-Wed-Jul-28-2027-Gillette-Stadium | - |
| tm-bon-jovi-2027-toronto-1a8zk48je1zze8k | Bon Jovi | none | - | - | no qualifying listing (complete catalog checked) |
| tm-anuel-aa-2027-monterrey-g5dvz_6rcdk4r | Anuel AA | none | - | - | no qualifying listing (complete catalog checked) |
| tm-anuel-aa-2027-zapopan-g5dvz_6raf6md | Anuel AA | none | - | - | no qualifying listing (complete catalog checked) |
| tm-luke-bryan-2026-mescalero-vvg1yz_gw6bfly | Luke Bryan | correct (applied) | 8259472 | https://www.ticketliquidator.com/tickets/8259472/Luke-Bryan-tickets-Sat-Dec-5-2026-Inn-Of-The-Mountain-Gods-Resort-Casino | - |
| tm-luke-bryan-2026-las-vegas-1avjz_agkws6gfv | Luke Bryan | refresh (applied) | 7922101 | https://www.ticketliquidator.com/tickets/7922101/Luke-Bryan-tickets-Fri-Dec-11-2026-Allegiant-Stadium | - |
| tm-billy-strings-2026-new-orleans-g5viz_fhsj6zp | Billy Strings | refresh (applied) | 7843538 | https://www.ticketliquidator.com/tickets/7843538/Billy-Strings-tickets-Fri-Dec-4-2026-Saenger-Theatre-New-Orleans | - |
| tm-billy-strings-2026-new-orleans-g5viz_6n0bmge | Billy Strings | refresh (applied) | 7843524 | https://www.ticketliquidator.com/tickets/7843524/Billy-Strings-tickets-Sat-Dec-5-2026-Smoothie-King-Center | - |
| tm-billy-strings-2026-sugar-land-z7r9jz1a7xvj- | Billy Strings | refresh (applied) | 7843540 | https://www.ticketliquidator.com/tickets/7843540/Billy-Strings-tickets-Wed-Dec-9-2026-Smart-Financial-Centre | - |
| tm-billy-strings-2026-fort-worth-vvg1yz_6mc3yqf | Billy Strings | refresh (applied) | 7843525 | https://www.ticketliquidator.com/tickets/7843525/Billy-Strings-tickets-Fri-Dec-11-2026-Ariat-Arena | - |
| tm-billy-strings-2026-austin-g5diz_ub5bart | Billy Strings | refresh (applied) | 8108535 | https://www.ticketliquidator.com/tickets/8108535/Billy-Strings-tickets-Sat-Dec-12-2026-Moody-Center-ATX | - |
| tm-billy-strings-2027-asheville-g5evz_omwlg3b | Billy Strings | correct (applied) | 8238813 | https://www.ticketliquidator.com/tickets/8238813/Billy-Strings-tickets-Thu-Feb-4-2027-ExploreAshevillecom-Arena-at-Harrahs-Cherokee-Center | - |
| tm-billy-strings-2027-asheville-g5evz_omwlh3- | Billy Strings | refresh (applied) | 8238814 | https://www.ticketliquidator.com/tickets/8238814/Billy-Strings-tickets-Fri-Feb-5-2027-ExploreAshevillecom-Arena-at-Harrahs-Cherokee-Center | - |
| tm-billy-strings-2027-asheville-g5evz_omwig3e | Billy Strings | refresh (applied) | 8238815 | https://www.ticketliquidator.com/tickets/8238815/Billy-Strings-tickets-Sat-Feb-6-2027-ExploreAshevillecom-Arena-at-Harrahs-Cherokee-Center | - |
| tm-billy-strings-2027-asheville-g5evz_omwii3v | Billy Strings | refresh (applied) | 8238816 | https://www.ticketliquidator.com/tickets/8238816/Billy-Strings-tickets-Mon-Feb-8-2027-ExploreAshevillecom-Arena-at-Harrahs-Cherokee-Center | - |
| tm-billy-strings-2027-asheville-g5evz_omwcg3b | Billy Strings | refresh (applied) | 8238817 | https://www.ticketliquidator.com/tickets/8238817/Billy-Strings-tickets-Tue-Feb-9-2027-ExploreAshevillecom-Arena-at-Harrahs-Cherokee-Center | - |
| tm-billy-strings-2027-duluth-vvg1zz_oinx98f | Billy Strings | correct (applied) | 8238819 | https://www.ticketliquidator.com/tickets/8238819/Billy-Strings-tickets-Fri-Feb-12-2027-Gas-South-Arena | - |
| tm-billy-strings-2027-duluth-vvg1zz_ointe8l | Billy Strings | refresh (applied) | 8238820 | https://www.ticketliquidator.com/tickets/8238820/Billy-Strings-tickets-Sat-Feb-13-2027-Gas-South-Arena | - |
| tm-billy-strings-2027-nashville-g5viz_on579po | Billy Strings | correct (applied) | 8238823 | https://www.ticketliquidator.com/tickets/8238823/Billy-Strings-tickets-Fri-Feb-19-2027-Bridgestone-Arena | - |
| tm-billy-strings-2027-nashville-g5viz_on5a9pr | Billy Strings | refresh (applied) | 8238824 | https://www.ticketliquidator.com/tickets/8238824/Billy-Strings-tickets-Sat-Feb-20-2027-Bridgestone-Arena | - |
| tm-thirty-seconds-to-mars-2027-nurnberg-z698xzc2z16vqofzv8 | Thirty Seconds to Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-thirty-seconds-to-mars-2027-casalecchio-di-reno-bologna-zg9rmiynyzffde | Thirty Seconds to Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-thirty-seconds-to-mars-2027-praha-9-z698xzu0z1k788y-z | Thirty Seconds to Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-cristian-castro-2026-san-diego-z7r9jz1a7-80a | Cristian Castro | refresh (applied) | 7746197 | https://www.ticketliquidator.com/tickets/7746197/Cristian-Castro-tickets-Fri-Nov-27-2026-Pechanga-Arena-San-Diego | - |
| tm-cristian-castro-2026-los-angeles-z7r9jz1a7-f4v | Cristian Castro | refresh (applied) | 7743647 | https://www.ticketliquidator.com/tickets/7743647/Cristian-Castro-tickets-Sat-Nov-28-2026-Peacock-Theater-Los-Angeles | - |
| tm-cristian-castro-2027-denver-z7r9jz1a7-boz | Cristian Castro | refresh (applied) | 7757487 | https://www.ticketliquidator.com/tickets/7757487/Cristian-Castro-tickets-Fri-Jan-29-2027-Bellco-Theatre | - |
| tm-cristian-castro-2027-west-valley-city-g5vzz_aklolqq | Cristian Castro | refresh (applied) | 7757476 | https://www.ticketliquidator.com/tickets/7757476/Cristian-Castro-tickets-Sat-Jan-30-2027-Maverik-Center | - |
| tm-cristian-castro-2027-anaheim-vv1aazkofgkeidrym | Cristian Castro | refresh (applied) | 7757473 | https://www.ticketliquidator.com/tickets/7757473/Cristian-Castro-tickets-Fri-Feb-12-2027-Honda-Center | - |
| tm-cristian-castro-2027-palm-desert-vvg1iz_1h-rylv | Cristian Castro | refresh (applied) | 8035175 | https://www.ticketliquidator.com/tickets/8035175/Cristian-Castro-tickets-Sat-Feb-13-2027-Acrisure-Arena | - |
| tm-cristian-castro-2027-hidalgo-g5diz_a2dt_o4 | Cristian Castro | refresh (applied) | 7756937 | https://www.ticketliquidator.com/tickets/7756937/Cristian-Castro-tickets-Sat-Feb-27-2027-Payne-Arena | - |
| tm-cristian-castro-2027-cedar-park-g5diz_ak4-aew | Cristian Castro | refresh (applied) | 7756939 | https://www.ticketliquidator.com/tickets/7756939/Cristian-Castro-tickets-Sun-Feb-28-2027-HEB-Center-at-Cedar-Park | - |
| tm-cristian-castro-2027-orlando-1kfov0fzgac5wgd | Cristian Castro | refresh (applied) | 7756941 | https://www.ticketliquidator.com/tickets/7756941/Cristian-Castro-tickets-Fri-Mar-12-2027-Addition-Financial-Arena | - |
| tm-cristian-castro-2027-miami-vvg1vz_aphhc62 | Cristian Castro | refresh (applied) | 7756942 | https://www.ticketliquidator.com/tickets/7756942/Cristian-Castro-tickets-Sat-Mar-13-2027-James-L-Knight-Center | - |
| tm-boyz-ii-men-2026-waurn-ponds-177yv0g6cqczn9y | Boyz II Men | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch; listing: Boyz II Men; text: Boyz II Men Boyz II Men /tickets/8359739/Boyz-II-Men-tickets-Sat-Nov-28-2026-Mt-Duneed-Estate Boyz II Men Boyz II Men Mt Duneed Estate 1442 ) |
| tm-boyz-ii-men-2026-auckland-17azv0g6c2evn3t | Boyz II Men | refresh (applied) | 8173275 | https://www.ticketliquidator.com/tickets/8173275/Boyz-II-Men-tickets-Tue-Dec-1-2026-Spark-Arena | - |
| tm-boyz-ii-men-2026-pokolbin-177yv0g6cro9xjr | Boyz II Men | none | - | - | no qualifying listing (complete catalog checked) |
| tm-boyz-ii-men-2026-mount-cotton-177yv0g6chtbuni | Boyz II Men | none | - | - | no qualifying listing (complete catalog checked) |
| tm-boyz-ii-men-2026-norman-z7r9jz1aaed_y | Boyz II Men | refresh (applied) | 8234392 | https://www.ticketliquidator.com/tickets/8234392/Boyz-II-Men-tickets-Fri-Dec-18-2026-Showplace-Theatre-At-Riverwind-Casino | - |
| tm-boyz-ii-men-2026-thackerville-z7r9jz1a70-f8 | Boyz II Men | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Boyz II Men; text: Boyz II Men Boyz II Men /tickets/7975581/Boyz-II-Men-tickets-Sat-Dec-19-2026-Lucas-Oil-Live-At-WinStar-Casino Boyz II Men Boyz II Men Lucas ) |
| tm-boyz-ii-men-2027-boston-vv1avzk4egkdp6cdw | Boyz II Men | refresh (applied) | 8318130 | https://www.ticketliquidator.com/tickets/8318130/Boyz-II-Men-tickets-Fri-Feb-5-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-boyz-ii-men-2027-atlantic-city-vv1kfz_fbxg7mvlj | Boyz II Men | refresh (applied) | 8318131 | https://www.ticketliquidator.com/tickets/8318131/Boyz-II-Men-tickets-Sat-Feb-6-2027-Borgata-Event-Center | - |
| tm-boyz-ii-men-2027-national-harbor-1ka8vp3aga5lj2s | Boyz II Men | refresh (applied) | 8318132 | https://www.ticketliquidator.com/tickets/8318132/Boyz-II-Men-tickets-Thu-Feb-11-2027-The-Theater-at-MGM-National-Harbor | - |
| tm-boyz-ii-men-2027-national-harbor-1ka8vp3aga5ij2m | Boyz II Men | refresh (applied) | 8318133 | https://www.ticketliquidator.com/tickets/8318133/Boyz-II-Men-tickets-Fri-Feb-12-2027-The-Theater-at-MGM-National-Harbor | - |
| tm-boyz-ii-men-2027-national-harbor-1ka8vp3aga5cu2t | Boyz II Men | refresh (applied) | 8318134 | https://www.ticketliquidator.com/tickets/8318134/Boyz-II-Men-tickets-Sat-Feb-13-2027-The-Theater-at-MGM-National-Harbor | - |
| tm-boyz-ii-men-2027-las-vegas-1kayvp7mgaglg6h | Boyz II Men | refresh (applied) | 8231600 | https://www.ticketliquidator.com/tickets/8231600/Boyz-II-Men-tickets-Fri-Mar-12-2027-The-Chelsea-The-Cosmopolitan-of-Las-Vegas | - |
| tm-boyz-ii-men-2027-las-vegas-1kayvp7mgag-4fc | Boyz II Men | refresh (applied) | 8231601 | https://www.ticketliquidator.com/tickets/8231601/Boyz-II-Men-tickets-Sat-Mar-13-2027-The-Chelsea-The-Cosmopolitan-of-Las-Vegas | - |
| tm-boyz-ii-men-2027-las-vegas-1kayvp7mgagn4f9 | Boyz II Men | refresh (applied) | 8231602 | https://www.ticketliquidator.com/tickets/8231602/Boyz-II-Men-tickets-Fri-Mar-19-2027-The-Chelsea-The-Cosmopolitan-of-Las-Vegas | - |
| tm-boyz-ii-men-2027-las-vegas-1kayvp7mgag0pfj | Boyz II Men | refresh (applied) | 8231603 | https://www.ticketliquidator.com/tickets/8231603/Boyz-II-Men-tickets-Sat-Mar-20-2027-The-Chelsea-The-Cosmopolitan-of-Las-Vegas | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dw_pus | Barry Manilow | refresh (applied) | 7275346 | https://www.ticketliquidator.com/tickets/7275346/Barry-Manilow-tickets-Thu-Dec-3-2026-International-Westgate-Theater-At-Westgate-Las-Vegas-Resort-Casino | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwqkuv | Barry Manilow | refresh (applied) | 7275347 | https://www.ticketliquidator.com/tickets/7275347/Barry-Manilow-tickets-Fri-Dec-4-2026-International-Westgate-Theater-At-Westgate-Las-Vegas-Resort-Casino | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwqjuu | Barry Manilow | refresh (applied) | 7275348 | https://www.ticketliquidator.com/tickets/7275348/Barry-Manilow-tickets-Sat-Dec-5-2026-International-Westgate-Theater-At-Westgate-Las-Vegas-Resort-Casino | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwhpuz | Barry Manilow | refresh (applied) | 7275350 | https://www.ticketliquidator.com/tickets/7275350/Barry-Manilow-tickets-Thu-Dec-10-2026-International-Westgate-Theater-At-Westgate-Las-Vegas-Resort-Casino | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwhuub | Barry Manilow | refresh (applied) | 7275351 | https://www.ticketliquidator.com/tickets/7275351/Barry-Manilow-tickets-Fri-Dec-11-2026-International-Westgate-Theater-At-Westgate-Las-Vegas-Resort-Casino | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwjjc1 | Barry Manilow | refresh (applied) | 7275352 | https://www.ticketliquidator.com/tickets/7275352/Barry-Manilow-tickets-Sat-Dec-12-2026-International-Westgate-Theater-At-Westgate-Las-Vegas-Resort-Casino | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwqpcc | Barry Manilow | refresh (applied) | 7275353 | https://www.ticketliquidator.com/tickets/7275353/Barry-Manilow-tickets-Thu-Dec-17-2026-International-Westgate-Theater-At-Westgate-Las-Vegas-Resort-Casino | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwrkco | Barry Manilow | refresh (applied) | 7275354 | https://www.ticketliquidator.com/tickets/7275354/Barry-Manilow-tickets-Fri-Dec-18-2026-International-Westgate-Theater-At-Westgate-Las-Vegas-Resort-Casino | - |
| tm-barry-manilow-2026-las-vegas-17ayvxg62dwlkck | Barry Manilow | refresh (applied) | 7275355 | https://www.ticketliquidator.com/tickets/7275355/Barry-Manilow-tickets-Sat-Dec-19-2026-International-Westgate-Theater-At-Westgate-Las-Vegas-Resort-Casino | - |
| tm-barry-manilow-2027-sunrise-z7r9jz1a7ji0e | Barry Manilow | refresh (applied) | 7425008 | https://www.ticketliquidator.com/tickets/7425008/Barry-Manilow-tickets-Fri-Jan-15-2027-Amerant-Bank-Arena | - |
| tm-barry-manilow-2027-estero-vvg1vzbwhe6k-q | Barry Manilow | refresh (applied) | 7425011 | https://www.ticketliquidator.com/tickets/7425011/Barry-Manilow-tickets-Sat-Jan-16-2027-Hertz-Arena | - |
| tm-barry-manilow-2027-estero-vvg1vzbwhe6n-j | Barry Manilow | refresh (applied) | 7425012 | https://www.ticketliquidator.com/tickets/7425012/Barry-Manilow-tickets-Sun-Jan-17-2027-Hertz-Arena | - |
| tm-barry-manilow-2027-tampa-vvg1vzbsept-t8 | Barry Manilow | refresh (applied) | 7425010 | https://www.ticketliquidator.com/tickets/7425010/Barry-Manilow-tickets-Wed-Jan-20-2027-Benchmark-International-Arena | - |
| tm-barry-manilow-2027-orlando-1aefzbwgksczswf | Barry Manilow | refresh (applied) | 7425009 | https://www.ticketliquidator.com/tickets/7425009/Barry-Manilow-tickets-Thu-Jan-21-2027-Kia-Center | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dw5kgq | Barry Manilow | refresh (applied) | 8266249 | https://www.ticketliquidator.com/tickets/8266249/Barry-Manilow-tickets-Thu-Feb-18-2027-International-Westgate-Theater-At-Westgate-Las-Vegas-Resort-Casino | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dw5ugn | Barry Manilow | refresh (applied) | 8266250 | https://www.ticketliquidator.com/tickets/8266250/Barry-Manilow-tickets-Fri-Feb-19-2027-International-Westgate-Theater-At-Westgate-Las-Vegas-Resort-Casino | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dwupgi | Barry Manilow | refresh (applied) | 7275329 | https://www.ticketliquidator.com/tickets/7275329/Barry-Manilow-tickets-Sat-Feb-20-2027-International-Westgate-Theater-At-Westgate-Las-Vegas-Resort-Casino | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dwuugv | Barry Manilow | refresh (applied) | 8266251 | https://www.ticketliquidator.com/tickets/8266251/Barry-Manilow-tickets-Thu-Feb-25-2027-International-Westgate-Theater-At-Westgate-Las-Vegas-Resort-Casino | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dwcjgy | Barry Manilow | refresh (applied) | 8266252 | https://www.ticketliquidator.com/tickets/8266252/Barry-Manilow-tickets-Fri-Feb-26-2027-International-Westgate-Theater-At-Westgate-Las-Vegas-Resort-Casino | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dw2kgd | Barry Manilow | refresh (applied) | 7275332 | https://www.ticketliquidator.com/tickets/7275332/Barry-Manilow-tickets-Sat-Feb-27-2027-International-Westgate-Theater-At-Westgate-Las-Vegas-Resort-Casino | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dw2ugw | Barry Manilow | refresh (applied) | 7275333 | https://www.ticketliquidator.com/tickets/7275333/Barry-Manilow-tickets-Thu-Mar-25-2027-International-Westgate-Theater-At-Westgate-Las-Vegas-Resort-Casino | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dw8pgt | Barry Manilow | refresh (applied) | 8266256 | https://www.ticketliquidator.com/tickets/8266256/Barry-Manilow-tickets-Fri-Mar-26-2027-International-Westgate-Theater-At-Westgate-Las-Vegas-Resort-Casino | - |
| tm-barry-manilow-2027-las-vegas-17ayvxg62dwokuv | Barry Manilow | refresh (applied) | 8266255 | https://www.ticketliquidator.com/tickets/8266255/Barry-Manilow-tickets-Sat-Mar-27-2027-International-Westgate-Theater-At-Westgate-Las-Vegas-Resort-Casino | - |
| tm-barry-manilow-2027-las-vegas-1avjz_3gkroi64s | Barry Manilow | refresh (applied) | 8266257 | https://www.ticketliquidator.com/tickets/8266257/Barry-Manilow-tickets-Thu-Apr-1-2027-International-Westgate-Theater-At-Westgate-Las-Vegas-Resort-Casino | - |
| tm-barry-manilow-2027-las-vegas-1avjz_3gkrocmpa | Barry Manilow | refresh (applied) | 8266259 | https://www.ticketliquidator.com/tickets/8266259/Barry-Manilow-tickets-Fri-Apr-2-2027-International-Westgate-Theater-At-Westgate-Las-Vegas-Resort-Casino | - |
| tm-barry-manilow-2027-las-vegas-1avjz_3gkrorept | Barry Manilow | refresh (applied) | 8266258 | https://www.ticketliquidator.com/tickets/8266258/Barry-Manilow-tickets-Sat-Apr-3-2027-International-Westgate-Theater-At-Westgate-Las-Vegas-Resort-Casino | - |
| tm-koe-wetzel-2026-helotes-z7r9jz1aaebqp | Koe Wetzel | refresh (applied) | 8307857 | https://www.ticketliquidator.com/tickets/8307857/Koe-Wetzel-tickets-Wed-Dec-2-2026-John-T-Floore-Country-Store | - |
| tm-koe-wetzel-2026-corpus-christi-z7r9jz1aaebqk | Koe Wetzel | refresh (applied) | 8307858 | https://www.ticketliquidator.com/tickets/8307858/Koe-Wetzel-tickets-Fri-Dec-4-2026-Concrete-Street-Amphitheater | - |
| tm-koe-wetzel-2026-round-rock-z7r9jz1aaeb-n | Koe Wetzel | refresh (applied) | 8307859 | https://www.ticketliquidator.com/tickets/8307859/Koe-Wetzel-tickets-Sat-Dec-5-2026-Round-Rock-Amp | - |
| tm-koe-wetzel-2026-fort-worth-z7r9jz1aa7evf | Koe Wetzel | refresh (applied) | 8310872 | https://www.ticketliquidator.com/tickets/8310872/Koe-Wetzel-tickets-Wed-Dec-9-2026-Billy-Bobs | - |
| tm-koe-wetzel-2026-fort-worth-z7r9jz1aa7vfe | Koe Wetzel | correct (applied) | 8307148 | https://www.ticketliquidator.com/tickets/8307148/Koe-Wetzel-tickets-Thu-Dec-10-2026-Billy-Bobs | - |
| tm-koe-wetzel-2026-las-vegas-1ayzkfkgkdtup_a | Koe Wetzel | refresh (applied) | 8194341 | https://www.ticketliquidator.com/tickets/8194341/Koe-Wetzel-tickets-Fri-Dec-11-2026-PH-Live-At-Planet-Hollywood | - |
| tm-victoria-monet-2026-washington-1a4zkfigkeu6i0b | Victoria Monet | refresh (applied) | 8258113 | https://www.ticketliquidator.com/tickets/8258113/Victoria-Monet-tickets-Fri-Nov-27-2026-The-Anthem-DC | - |
| tm-victoria-monet-2026-nashville-g5viz_3rdnbd2 | Victoria Monet | refresh (applied) | 8258114 | https://www.ticketliquidator.com/tickets/8258114/Victoria-Monet-tickets-Mon-Nov-30-2026-The-Truth | - |
| tm-victoria-monet-2026-austin-z7r9jz1aavpbs | Victoria Monet | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Victoria Monet; text: Victoria Monet Victoria Monet /tickets/8258115/Victoria-Monet-tickets-Wed-Dec-2-2026-ACL-Live-At-The-Moody-Theater Victoria Monet Victoria M) |
| tm-victoria-monet-2026-phoenix-1fk8vpadufz7ccuc | Victoria Monet | refresh (applied) | 8258116 | https://www.ticketliquidator.com/tickets/8258116/Victoria-Monet-tickets-Sat-Dec-5-2026-Arizona-Financial-Theatre | - |
| tm-victoria-monet-2026-san-diego-vvg1iz_32hzdgh | Victoria Monet | refresh (applied) | 8258117 | https://www.ticketliquidator.com/tickets/8258117/Victoria-Monet-tickets-Sun-Dec-6-2026-Cal-Coast-Credit-Union-Open-Air-Theatre | - |
| tm-victoria-monet-2026-inglewood-vvg1iz_3xv_aba | Victoria Monet | refresh (applied) | 8258118 | https://www.ticketliquidator.com/tickets/8258118/Victoria-Monet-tickets-Tue-Dec-8-2026-YouTube-Theater-at-Hollywood-Park | - |
| tm-victoria-monet-2026-las-vegas-1avjz_38nr4zdcac | Victoria Monet | refresh (applied) | 8258119 | https://www.ticketliquidator.com/tickets/8258119/Victoria-Monet-tickets-Wed-Dec-9-2026-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-victoria-monet-2026-vancouver-1aozkf0gkdm521c | Victoria Monet | refresh (applied) | 8258123 | https://www.ticketliquidator.com/tickets/8258123/Victoria-Monet-tickets-Sat-Dec-12-2026-UBC-Doug-Mitchell-Thunderbird-Sports-Centre | - |
| tm-victoria-monet-2026-seattle-vvg1hz_31fteps | Victoria Monet | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Victoria Monet; text: Victoria Monet Victoria Monet /tickets/8258120/Victoria-Monet-tickets-Mon-Dec-14-2026-Wamu-Theater-At-Lumen-Field-Event-Center Victoria Mone) |
| tm-victoria-monet-2026-sacramento-g5vyz_3xulwgw | Victoria Monet | refresh (applied) | 8258121 | https://www.ticketliquidator.com/tickets/8258121/Victoria-Monet-tickets-Wed-Dec-16-2026-Sacramento-Memorial-Auditorium | - |
| tm-victoria-monet-2026-san-francisco-g5vyz_320sgvq | Victoria Monet | refresh (applied) | 8259524 | https://www.ticketliquidator.com/tickets/8259524/Victoria-Monet-tickets-Thu-Dec-17-2026-Bill-Graham-Civic-Auditorium | - |
| tm-jon-pardi-2026-peoria-vvg1jz_cjyd3ia | Jon Pardi | refresh (applied) | 8149216 | https://www.ticketliquidator.com/tickets/8149216/Jon-Pardi-tickets-Sun-Apr-18-2027-Carver-Arena-At-Peoria-Civic-Center | - |
| tm-jon-pardi-2026-saint-louis-16e7z_obyg7v9-3 | Jon Pardi | refresh (applied) | 8233638 | https://www.ticketliquidator.com/tickets/8233638/Jon-Pardi-tickets-Sat-Dec-19-2026-The-Factory-Chesterfield | - |
| tm-jon-pardi-2027-durant-vvg1yz_ksrbiue | Jon Pardi | refresh (applied) | 8307418 | https://www.ticketliquidator.com/tickets/8307418/Jon-Pardi-tickets-Sat-Mar-20-2027-Choctaw-Casino-Resort-Durant | - |
| tm-jon-pardi-2027-nampa-z7r9jz1aazeqe | Jon Pardi | refresh (applied) | 8149235 | https://www.ticketliquidator.com/tickets/8149235/Jon-Pardi-tickets-Sat-May-8-2027-Arena-At-Ford-Idaho-Center | - |
| tm-jon-pardi-2027-loveland-z7r9jz1aazeb3 | Jon Pardi | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Jon Pardi, Alexandra Kay & Sadie Bass; text: Jon Pardi, Alexandra Kay & Sadie Bass Jon Pardi, Alexandra Kay & Sadie Bass /tickets/8149231/Jon-Pardi-tickets-Thu-May-13-2027-Blue-Federal-) |
| tm-jon-pardi-2027-west-valley-city-g5vzz_2evjpcf | Jon Pardi | refresh (applied) | 8149212 | https://www.ticketliquidator.com/tickets/8149212/Jon-Pardi-tickets-Thu-May-20-2027-Maverik-Center | - |
| tm-brandi-carlile-2026-port-chester-g5vvz_kx-skxh | Brandi Carlile | refresh (applied) | 8293187 | https://www.ticketliquidator.com/tickets/8293187/Brandi-Carlile-tickets-Tue-Dec-15-2026-Capitol-Theatre-Port-Chester | - |
| tm-brandi-carlile-2026-port-chester-g5vvz_kx-vnxl | Brandi Carlile | refresh (applied) | 8293188 | https://www.ticketliquidator.com/tickets/8293188/Brandi-Carlile-tickets-Wed-Dec-16-2026-Capitol-Theatre-Port-Chester | - |
| tm-brandi-carlile-2026-port-chester-g5vvz_kx-gsxn | Brandi Carlile | refresh (applied) | 8293189 | https://www.ticketliquidator.com/tickets/8293189/Brandi-Carlile-tickets-Thu-Dec-17-2026-Capitol-Theatre-Port-Chester | - |
| tm-brandi-carlile-2027-seattle-vvg1hz_44goz5b | Brandi Carlile | refresh (applied) | 8343664 | https://www.ticketliquidator.com/tickets/8343664/Brandi-Carlile-tickets-Tue-Jan-5-2027-Paramount-Theatre-Seattle | - |
| tm-brandi-carlile-2027-seattle-vvg1hz_44gxf5- | Brandi Carlile | refresh (applied) | 8343665 | https://www.ticketliquidator.com/tickets/8343665/Brandi-Carlile-tickets-Wed-Jan-6-2027-Paramount-Theatre-Seattle | - |
| tm-brandi-carlile-2027-seattle-vvg1hz_44gnb5t | Brandi Carlile | refresh (applied) | 8343666 | https://www.ticketliquidator.com/tickets/8343666/Brandi-Carlile-tickets-Sat-Jan-9-2027-Paramount-Theatre-Seattle | - |
| tm-brandi-carlile-2027-seattle-vvg1hz_44g0z5w | Brandi Carlile | refresh (applied) | 8343667 | https://www.ticketliquidator.com/tickets/8343667/Brandi-Carlile-tickets-Sun-Jan-10-2027-Paramount-Theatre-Seattle | - |
| tm-brandi-carlile-2027-dublin-1abzku4gkdpubm4 | Brandi Carlile | refresh (applied) | 8248298 | https://www.ticketliquidator.com/tickets/8248298/Brandi-Carlile-tickets-Sun-Apr-4-2027-3Arena-Dublin | - |
| tm-brandi-carlile-2027-glasgow-16dbz_8p8g7is9u | Brandi Carlile | refresh (applied) | 8381782 | https://www.ticketliquidator.com/tickets/8381782/Brandi-Carlile-tickets-Tue-Apr-6-2027-SEC-Armadillo | - |
| tm-brandi-carlile-2027-glasgow-1auzkfagkeeywvx | Brandi Carlile | none | - | - | no qualifying listing (complete catalog checked) |
| tm-brandi-carlile-2027-manchester-16dbz_8qkg7xvln | Brandi Carlile | none | - | - | no qualifying listing (complete catalog checked) |
| tm-brandi-carlile-2027-manchester-1auzkfkgkd0yvnl | Brandi Carlile | refresh (applied) | 8383029 | https://www.ticketliquidator.com/tickets/8383029/Brandi-Carlile-tickets-Sat-Apr-10-2027-O2-Apollo-Manchester | - |
| tm-brandi-carlile-2027-london-16dbz_8rdg7g-dj | Brandi Carlile | none | - | - | no qualifying listing (complete catalog checked) |
| tm-brandi-carlile-2027-london-16uzkf6-7za5ev8a | Brandi Carlile | refresh (applied) | 8383124 | https://www.ticketliquidator.com/tickets/8383124/Brandi-Carlile-tickets-Wed-Apr-14-2027-Eventim-Apollo | - |
| tm-andrea-bocelli-2027-praha-9-z698xzu0z1k3k74-f | Andrea Bocelli | none | - | - | no qualifying listing (complete catalog checked) |
| tm-blondshell-2027-columbus-z7r9jz1aaeogk | Blondshell | refresh (applied) | 8295790 | https://www.ticketliquidator.com/tickets/8295790/Blondshell-tickets-Thu-May-20-2027-Newport-Music-Hall | - |
| tm-sienna-spiro-2027-morrison-z7r9jz1aa7-1d | Sienna Spiro | refresh (applied) | 8332358 | https://www.ticketliquidator.com/tickets/8332358/Sienna-Spiro-tickets-Mon-Aug-30-2027-Red-Rocks-Amphitheatre | - |
| tm-the-red-clay-strays-2027-bend-vvg1hz_kwvcqcl | The Red Clay Strays | refresh (applied) | 8350368 | https://www.ticketliquidator.com/tickets/8350368/The-Red-Clay-Strays-tickets-Fri-Aug-20-2027-Hayden-Homes-Amphitheater | - |
| tm-mico-2027-columbus-z7r9jz1aa7_pz | Mico | refresh (applied) | 8315360 | https://www.ticketliquidator.com/tickets/8315360/Mico-tickets-Wed-Mar-10-2027-Newport-Music-Hall | - |
| tm-santana-2027-london-1agzk4pgkemmuru | Santana | refresh (applied) | 8350778 | https://www.ticketliquidator.com/tickets/8350778/Santana-tickets-Wed-Jun-30-2027-O2-Arena-London | - |
| tm-santana-2027-krakow-z698xzqpz16va4pvo4 | Santana | none | - | - | no qualifying listing (complete catalog checked) |
| tm-santana-2027-oslo-z698xzb_z16v43vmbv | Santana | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mana-2027-highland-z7r9jz1aa7ngx | MANA | refresh (applied) | 8334766 | https://www.ticketliquidator.com/tickets/8334766/Mana-tickets-Tue-Apr-6-2027-Yaamava-Theater-at-Yaamava-Resort-Casino | - |
| tm-mana-2027-highland-z7r9jz1aa7x_k | MANA | refresh (applied) | 8334767 | https://www.ticketliquidator.com/tickets/8334767/Mana-tickets-Thu-Apr-8-2027-Yaamava-Theater-at-Yaamava-Resort-Casino | - |
| tm-mana-2027-highland-z7r9jz1aa7x_7 | MANA | refresh (applied) | 8334768 | https://www.ticketliquidator.com/tickets/8334768/Mana-tickets-Sun-Apr-11-2027-Yaamava-Theater-at-Yaamava-Resort-Casino | - |
| tm-mana-2027-highland-z7r9jz1aa7x_6 | MANA | refresh (applied) | 8334769 | https://www.ticketliquidator.com/tickets/8334769/Mana-tickets-Wed-Sep-1-2027-Yaamava-Theater-at-Yaamava-Resort-Casino | - |
| tm-mana-2027-highland-z7r9jz1aa7ng- | MANA | refresh (applied) | 8334770 | https://www.ticketliquidator.com/tickets/8334770/Mana-tickets-Thu-Sep-2-2027-Yaamava-Theater-at-Yaamava-Resort-Casino | - |
| tm-mana-2027-highland-z7r9jz1aa7x_a | MANA | refresh (applied) | 8334771 | https://www.ticketliquidator.com/tickets/8334771/Mana-tickets-Mon-Sep-6-2027-Yaamava-Theater-at-Yaamava-Resort-Casino | - |
| tm-turnpike-troubadours-2027-morrison-z7r9jz1aa7_ae | Turnpike Troubadours | refresh (applied) | 8329462 | https://www.ticketliquidator.com/tickets/8329462/Turnpike-Troubadours-tickets-Thu-May-13-2027-Red-Rocks-Amphitheatre | - |
| tm-turnpike-troubadours-2027-morrison-z7r9jz1aa7_av | Turnpike Troubadours | refresh (applied) | 8329463 | https://www.ticketliquidator.com/tickets/8329463/Turnpike-Troubadours-tickets-Fri-May-14-2027-Red-Rocks-Amphitheatre | - |
| tm-interpol-2026-brighton-g5dzzbgwdgxyl | Interpol | unverify (applied) | 7542483 | https://www.ticketliquidator.com/tickets/7542483/Bloc-Party-tickets-Fri-Nov-27-2026-Brighton-Centre | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-interpol-2026-dublin-1abzkuogkdez9hd | Interpol | refresh (applied) | 7540070 | https://www.ticketliquidator.com/tickets/7540070/Bloc-Party-tickets-Mon-Nov-30-2026-3Arena-Dublin | - |
| tm-interpol-2026-san-diego-vvg1iz_4dkyacm | Interpol | refresh (applied) | 8330265 | https://www.ticketliquidator.com/tickets/8330265/Interpol-tickets-Fri-Dec-11-2026-SOMA | - |
| tm-interpol-2027-hidalgo-g5diz_4kwcels | Interpol | refresh (applied) | 8337023 | https://www.ticketliquidator.com/tickets/8337023/Interpol-tickets-Fri-Mar-19-2027-Payne-Arena | - |
| tm-interpol-2027-memphis-g5viz_4agmgrr | Interpol | refresh (applied) | 8337024 | https://www.ticketliquidator.com/tickets/8337024/Interpol-tickets-Mon-Mar-22-2027-Satellite-Music-Hall | - |
| tm-interpol-2027-asheville-g5evz_4oz4dpm | Interpol | refresh (applied) | 8337025 | https://www.ticketliquidator.com/tickets/8337025/Interpol-tickets-Tue-Mar-23-2027-Thomas-Wolfe-Auditorium-at-Harrahs-Cherokee-Center | - |
| tm-interpol-2027-washington-1a4zk4kgkd5cf0g | Interpol | refresh (applied) | 8337026 | https://www.ticketliquidator.com/tickets/8337026/Interpol-tickets-Wed-Mar-24-2027-The-Anthem-DC | - |
| tm-interpol-2027-philadelphia-vv1aezk4fgkevbabi | Interpol | refresh (applied) | 8337027 | https://www.ticketliquidator.com/tickets/8337027/Interpol-tickets-Fri-Mar-26-2027-The-Met-Presented-by-Highmark | - |
| tm-little-big-town-2026-nashville-z7r9jz1a7j8ra | Little Big Town | refresh (applied) | 8130730 | https://www.ticketliquidator.com/tickets/8130730/Little-Big-Town-tickets-Tue-Dec-8-2026-Ryman-Auditorium | - |
| tm-little-big-town-2026-nashville-z7r9jz1a7j8_7 | Little Big Town | refresh (applied) | 8130732 | https://www.ticketliquidator.com/tickets/8130732/Little-Big-Town-tickets-Wed-Dec-9-2026-Ryman-Auditorium | - |
| tm-little-big-town-2026-nashville-z7r9jz1a7j_4x | Little Big Town | refresh (applied) | 8130733 | https://www.ticketliquidator.com/tickets/8130733/Little-Big-Town-tickets-Thu-Dec-10-2026-Ryman-Auditorium | - |
| tm-carin-leon-2027-las-vegas-1avjzbwgkrtxpef | Carin Leon | refresh (applied) | 7496384 | https://www.ticketliquidator.com/tickets/7496384/Carin-Leon-tickets-Wed-Sep-15-2027-Sphere | - |
| tm-carin-leon-2027-las-vegas-1a9zkfpgkdqtn6j | Carin Leon | refresh (applied) | 8258206 | https://www.ticketliquidator.com/tickets/8258206/Carin-Leon-tickets-Thu-Sep-16-2027-Sphere | - |
| tm-carin-leon-2027-las-vegas-1a9zkfpgkdrskjz | Carin Leon | refresh (applied) | 8258208 | https://www.ticketliquidator.com/tickets/8258208/Carin-Leon-tickets-Fri-Sep-17-2027-Sphere | - |
| tm-carin-leon-2027-las-vegas-1a9zkfpgkdrgsj0 | Carin Leon | refresh (applied) | 8258209 | https://www.ticketliquidator.com/tickets/8258209/Carin-Leon-tickets-Sat-Sep-18-2027-Sphere | - |
| tm-phish-2026-new-york-g5diz_kv3gvwh | Phish | correct (applied) | 8311023 | https://www.ticketliquidator.com/tickets/8311023/Phish-tickets-Wed-Dec-30-2026-Madison-Square-Garden | - |
| tm-phish-2027-new-york-g5diz_kv3mvxa | Phish | refresh (applied) | 8311024 | https://www.ticketliquidator.com/tickets/8311024/Phish-tickets-Thu-Dec-31-2026-Madison-Square-Garden | - |
| tm-phish-2027-new-york-g5diz_kv3yvxl | Phish | refresh (applied) | 8311025 | https://www.ticketliquidator.com/tickets/8311025/Phish-tickets-Fri-Jan-1-2027-Madison-Square-Garden | - |
| tm-phish-2027-new-york-g5diz_kv3dvxt | Phish | refresh (applied) | 8311027 | https://www.ticketliquidator.com/tickets/8311027/Phish-tickets-Sat-Jan-2-2027-Madison-Square-Garden | - |
| tm-imagine-dragons-2026-abu-dhabi-z698xz52z16vb3ooc_ | Imagine Dragons | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch, venue mismatch; listing: Candlelight: Coldplay & Imagine Dragons Tribute; text: Candlelight: Coldplay & Imagine Dragons Tribute Candlelight: Coldplay & Imagine Dragons Tribute /tickets/8160125/Candlelight-Coldplay-Imagin) |
| tm-rufus-du-sol-2027-san-francisco-z7r9jz1aae3qg | RUFUS DU SOL | refresh (applied) | 8300560 | https://www.ticketliquidator.com/tickets/8300560/Rufus-Du-Sol-tickets-Sun-Jan-3-2027-Pier-80-San-Francisco | - |
| tm-death-cab-for-cutie-2027-calgary-z7r9jz1aa7k3a | Death Cab for Cutie | refresh (applied) | 8341943 | https://www.ticketliquidator.com/tickets/8341943/Death-Cab-for-Cutie-tickets-Fri-Jul-2-2027-Spruce-Meadows | - |
| tm-sienna-spiro-2027-nashville-z7r9jz1aa7bjy | Sienna Spiro | refresh (applied) | 8332305 | https://www.ticketliquidator.com/tickets/8332305/Sienna-Spiro-tickets-Sun-Aug-8-2027-Grand-Ole-Opry-House | - |
| tm-rod-stewart-2027-atlantic-city-vv1aezk49gkddvprj | Rod Stewart | refresh (applied) | 8343668 | https://www.ticketliquidator.com/tickets/8343668/Rod-Stewart-tickets-Sat-Mar-6-2027-Hard-Rock-Live-At-Etess-Arena | - |
| tm-rod-stewart-2027-lincoln-g5vyz_4ho4bgw | Rod Stewart | refresh (applied) | 8343679 | https://www.ticketliquidator.com/tickets/8343679/Rod-Stewart-tickets-Sat-Aug-14-2027-The-Venue-At-Thunder-Valley-Casino-Resort | - |
| tm-weezer-2027-auckland-1fazvp4sz3z7g15d | Weezer | none | - | - | no qualifying listing (complete catalog checked) |
| tm-illenium-2026-las-vegas-z7r9jz1aavupe | ILLENIUM | refresh (applied) | 8176744 | https://www.ticketliquidator.com/tickets/8176744/Illenium-tickets-Sat-Dec-19-2026-Omnia-Nightclub-Las-Vegas-at-Caesars-Palace | - |
| tm-illenium-2026-san-francisco-g5vyz_kj0ltb6 | ILLENIUM | refresh (applied) | 8294523 | https://www.ticketliquidator.com/tickets/8294523/Illenium-tickets-Wed-Dec-30-2026-Bill-Graham-Civic-Auditorium | - |
| tm-illenium-2027-san-francisco-g5vyz_kjpaqe2 | ILLENIUM | refresh (applied) | 8294522 | https://www.ticketliquidator.com/tickets/8294522/Illenium-tickets-Thu-Dec-31-2026-Bill-Graham-Civic-Auditorium | - |
| tm-illenium-2027-san-francisco-g5vyz_kuqzndv | ILLENIUM | refresh (applied) | 8342892 | https://www.ticketliquidator.com/tickets/8342892/Illenium-tickets-Fri-Jan-1-2027-Bill-Graham-Civic-Auditorium | - |
| tm-lola-young-2027-nashville-z7r9jz1aaebv0 | Lola Young | refresh (applied) | 8307847 | https://www.ticketliquidator.com/tickets/8307847/Lola-Young-tickets-Tue-Apr-6-2027-The-Pinnacle-At-Nashville-Yards | - |
| tm-lola-young-2027-atlanta-vvg1zz_f7qhai6 | Lola Young | refresh (applied) | 8307249 | https://www.ticketliquidator.com/tickets/8307249/Lola-Young-tickets-Wed-Apr-7-2027-Coca-Cola-Roxy | - |
| tm-lola-young-2027-washington-1a4zk4egkeystl8 | Lola Young | refresh (applied) | 8307251 | https://www.ticketliquidator.com/tickets/8307251/Lola-Young-tickets-Fri-Apr-9-2027-The-Anthem-DC | - |
| tm-lola-young-2027-philadelphia-vv17fz_kgkmkg0sm | Lola Young | refresh (applied) | 8307252 | https://www.ticketliquidator.com/tickets/8307252/Lola-Young-tickets-Sat-Apr-10-2027-The-Met-Presented-by-Highmark | - |
| tm-lola-young-2027-new-york-g5dyz_fkt1eua | Lola Young | refresh (applied) | 8307254 | https://www.ticketliquidator.com/tickets/8307254/Lola-Young-tickets-Mon-Apr-12-2027-Radio-City-Music-Hall | - |
| tm-lola-young-2027-boston-z7r9jz1aaebvp | Lola Young | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch; listing: Lola Young; text: Lola Young Lola Young /tickets/8307848/Lola-Young-tickets-Tue-Apr-13-2027-Roadrunner Lola Young Lola Young Roadrunner 222965 CONCERTS 89 Gue) |
| tm-lola-young-2027-toronto-z7r9jz1aaebvx | Lola Young | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lola-young-2027-toronto-z7r9jz1aaebvn | Lola Young | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lola-young-2027-detroit-vv1afzk4vgkdwfh0c | Lola Young | refresh (applied) | 8307255 | https://www.ticketliquidator.com/tickets/8307255/Lola-Young-tickets-Sun-Apr-18-2027-The-Fillmore-Detroit | - |
| tm-lola-young-2027-chicago-vv118z_f13zkq9 | Lola Young | refresh (applied) | 8307256 | https://www.ticketliquidator.com/tickets/8307256/Lola-Young-tickets-Tue-Apr-20-2027-The-Salt-Shed-Indoors-Chicago | - |
| tm-lola-young-2027-chicago-vv1kvzvpoega5wbhb | Lola Young | refresh (applied) | 8318373 | https://www.ticketliquidator.com/tickets/8318373/Lola-Young-tickets-Wed-Apr-21-2027-The-Salt-Shed-Indoors-Chicago | - |
| tm-lola-young-2027-st-paul-z7r9jz1aaebve | Lola Young | refresh (applied) | 8307849 | https://www.ticketliquidator.com/tickets/8307849/Lola-Young-tickets-Fri-Apr-23-2027-The-Palace-Theatre-St-Paul | - |
| tm-lola-young-2027-denver-g5vzz_f11k7mj | Lola Young | refresh (applied) | 8307257 | https://www.ticketliquidator.com/tickets/8307257/Lola-Young-tickets-Sun-Apr-25-2027-Fillmore-Auditorium-Colorado | - |
| tm-lola-young-2027-salt-lake-city-g5vzz_fk8daho | Lola Young | refresh (applied) | 8307259 | https://www.ticketliquidator.com/tickets/8307259/Lola-Young-tickets-Mon-Apr-26-2027-The-Union-Event-Center | - |
| tm-lola-young-2027-seattle-vvg1hz_falrsfg | Lola Young | refresh (applied) | 8307260 | https://www.ticketliquidator.com/tickets/8307260/Lola-Young-tickets-Wed-Apr-28-2027-Wamu-Theater-At-Lumen-Field-Event-Center | - |
| tm-lola-young-2027-vancouver-16ozk4vpyzau66a6 | Lola Young | refresh (applied) | 8307265 | https://www.ticketliquidator.com/tickets/8307265/Lola-Young-tickets-Thu-Apr-29-2027-UBC-Doug-Mitchell-Thunderbird-Sports-Centre | - |
| tm-lola-young-2027-san-francisco-g5vyz_f6gluub | Lola Young | refresh (applied) | 8307261 | https://www.ticketliquidator.com/tickets/8307261/Lola-Young-tickets-Sat-May-1-2027-Bill-Graham-Civic-Auditorium | - |
| tm-lola-young-2027-los-angeles-vv16azk4e0kza8aeaf | Lola Young | refresh (applied) | 8307263 | https://www.ticketliquidator.com/tickets/8307263/Lola-Young-tickets-Tue-May-4-2027-Greek-Theatre-Los-Angeles-CA | - |
| tm-lola-young-2027-dublin-1avoz_ogknk-ukb | Lola Young | none | - | - | no qualifying listing (complete catalog checked) |
| tm-james-blunt-2027-forest-brussels-z698xzg2z16vojf7u8 | James Blunt | refresh (applied) | 8326653 | https://www.ticketliquidator.com/tickets/8326653/James-Blunt-tickets-Fri-Feb-19-2027-Vorst-Nationaal | - |
| tm-james-blunt-2027-praha-9-z698xzu0z1ague3f | James Blunt | none | - | - | no qualifying listing (complete catalog checked) |
| tm-james-blunt-2027-oslo-z698xzb_z16vojuapy | James Blunt | none | - | - | no qualifying listing (complete catalog checked) |
| tm-james-blunt-2027-leeds-g5vhz_8rglm2f | James Blunt | none | - | - | no qualifying listing (complete catalog checked) |
| tm-james-blunt-2027-birmingham-16nzkfo03zag7vec | James Blunt | refresh (applied) | 8356240 | https://www.ticketliquidator.com/tickets/8356240/James-Blunt-tickets-Sat-Mar-27-2027-bp-pulse-LIVE | - |
| tm-james-blunt-2027-newcastle-upon-tyne-g5vhz_8jzh5mu | James Blunt | refresh (applied) | 8373749 | https://www.ticketliquidator.com/tickets/8373749/James-Blunt-tickets-Sun-Mar-28-2027-Utilita-Arena-Newcastle | - |
| tm-james-blunt-2027-dublin-16bzkf7x3zaufauu | James Blunt | none | - | - | no qualifying listing (complete catalog checked) |
| tm-james-blunt-2027-belfast-16doz_oxog7v-fd | James Blunt | refresh (applied) | 8326044 | https://www.ticketliquidator.com/tickets/8326044/James-Blunt-tickets-Wed-Mar-31-2027-The-O2-Belfast | - |
| tm-james-blunt-2027-glasgow-1auzkfkgkdju5kw | James Blunt | refresh (applied) | 8272590 | https://www.ticketliquidator.com/tickets/8272590/James-Blunt-tickets-Fri-Apr-2-2027-OVO-Hydro | - |
| tm-james-blunt-2027-manchester-1amzkfkgkdv2srk | James Blunt | refresh (applied) | 8247670 | https://www.ticketliquidator.com/tickets/8247670/James-Blunt-tickets-Sat-Apr-3-2027-Co-Op-Live | - |
| tm-james-blunt-2027-london-1agzkf6gkdpobqq | James Blunt | refresh (applied) | 8252474 | https://www.ticketliquidator.com/tickets/8252474/James-Blunt-tickets-Sun-Apr-4-2027-O2-Arena-London | - |
| tm-james-blunt-2027-cardiff-16dbz_8pkg7i-jy | James Blunt | none | - | - | no qualifying listing (complete catalog checked) |
| tm-james-blunt-2027-bournemouth-16uzkf6oaza5auua | James Blunt | none | - | - | no qualifying listing (complete catalog checked) |
| tm-james-blunt-2027-brighton-g5dzz_8l-leuz | James Blunt | refresh (applied) | 8369893 | https://www.ticketliquidator.com/tickets/8369893/James-Blunt-tickets-Thu-Apr-8-2027-Brighton-Centre | - |
| tm-bryan-adams-2026-praha-9-z698xzu0z16vu4-e_a | Bryan Adams | refresh (applied) | 7775051 | https://www.ticketliquidator.com/tickets/7775051/Bryan-Adams-tickets-Sun-Dec-13-2026-O2-Arena-Prague | - |
| tm-bryan-adams-2027-brescia-zg9rmiynyzffda | Bryan Adams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryan-adams-2027-padova-zg9rmiynyzffdv | Bryan Adams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryan-adams-2027-auckland-17azv0g6cjvbo_i | Bryan Adams | refresh (applied) | 8173258 | https://www.ticketliquidator.com/tickets/8173258/Bryan-Adams-tickets-Wed-Mar-10-2027-Spark-Arena | - |
| tm-bryan-adams-2027-christchurch-17azv0g6cuuuvxf | Bryan Adams | refresh (applied) | 8180247 | https://www.ticketliquidator.com/tickets/8180247/Bryan-Adams-tickets-Fri-Mar-12-2027-Wolfbrook-Arena | - |
| tm-bryan-adams-2027-wellington-central-1ae8z_fgkxwzsx6 | Bryan Adams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryan-adams-2027-malmo-z698xzq2z1k-ga_fv | Bryan Adams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryan-adams-2027-oslo-z698xzb_z16vq6qw4z | Bryan Adams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryan-adams-2027-helsinki-z698xz8kz1kuaq6jf | Bryan Adams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryan-adams-2027-nurnberg-z698xzc2z16vv6jt_f | Bryan Adams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryan-adams-2027-fulda-z698xzc2z1k86g-_z | Bryan Adams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryan-adams-2027-halle-westfalen-z698xzc2z16voo4puj | Bryan Adams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryan-adams-2027-hemer-z698xzc2z1k_buyvn | Bryan Adams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryan-adams-2027-bonn-z698xzc2z16v89qo0p | Bryan Adams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryan-adams-2027-rosenheim-z698xzc2z16eva4pqp | Bryan Adams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryan-adams-2027-baunatal-z698xzc2z1kxv_kf3 | Bryan Adams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryan-adams-2027-erfurt-z698xzc2z1kczab8v | Bryan Adams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryan-adams-2027-magdeburg-z698xzc2z16vb8r7pg | Bryan Adams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bryan-adams-2027-deggendorf-z698xzc2z1kaap_ay | Bryan Adams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-megadeth-2027-belfast-17czv0g62pvlvd8 | Megadeth | refresh (applied) | 8326042 | https://www.ticketliquidator.com/tickets/8326042/Megadeth-tickets-Tue-Mar-9-2027-The-O2-Belfast | - |
| tm-megadeth-2027-london-17uyv0g62ffnale | Megadeth | refresh (applied) | 8179322 | https://www.ticketliquidator.com/tickets/8179322/Megadeth-tickets-Thu-Mar-11-2027-OVO-Arena-Wembley | - |
| tm-megadeth-2027-nottingham-17u8v0g62r_1dp- | Megadeth | refresh (applied) | 8179324 | https://www.ticketliquidator.com/tickets/8179324/Megadeth-tickets-Fri-Mar-12-2027-Motorpoint-Arena-Nottingham | - |
| tm-megadeth-2027-manchester-17uyv0g62wxq-cs | Megadeth | refresh (applied) | 8179325 | https://www.ticketliquidator.com/tickets/8179325/Megadeth-tickets-Sat-Mar-13-2027-Co-Op-Live | - |
| tm-megadeth-2027-cardiff-17uov0g62hgl_w2 | Megadeth | refresh (applied) | 8179323 | https://www.ticketliquidator.com/tickets/8179323/Megadeth-tickets-Mon-Mar-15-2027-Cardiff-International-Arena | - |
| tm-megadeth-2027-glasgow-17uov0g62mgifrs | Megadeth | none | - | - | no qualifying listing (complete catalog checked) |
| tm-megadeth-2027-birmingham-17fyv0g62qpke7_ | Megadeth | none | - | - | no qualifying listing (complete catalog checked) |
| tm-megadeth-2027-leeds-g5vhz_2hqzflr | Megadeth | none | - | - | no qualifying listing (complete catalog checked) |
| tm-megadeth-2027-forest-brussels-z698xzg2z1k1kjboj | Megadeth | refresh (applied) | 8326654 | https://www.ticketliquidator.com/tickets/8326654/Megadeth-tickets-Tue-Mar-23-2027-Vorst-Nationaal | - |
| tm-megadeth-2027-dusseldorf-z698xzc2z1a-7kfe | Megadeth | none | - | - | no qualifying listing (complete catalog checked) |
| tm-megadeth-2027-oslo-z698xzb_z16vo9vpvy | Megadeth | refresh (applied) | 8326648 | https://www.ticketliquidator.com/tickets/8326648/Megadeth-tickets-Sun-Mar-28-2027-Oslo-Spektrum | - |
| tm-simple-plan-2026-niagara-falls-1a8zk3bgkei8p8q | Simple Plan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-plan-2027-vancouver-16v7z_f1bg7wmex | Simple Plan | refresh (applied) | 8308712 | https://www.ticketliquidator.com/tickets/8308712/Simple-Plan-tickets-Wed-Jan-27-2027-Rogers-Arena | - |
| tm-simple-plan-2027-victoria-z7r9jz1aae__3 | Simple Plan | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch, venue mismatch; listing: Simple Plan; text: Simple Plan Simple Plan /tickets/8308712/Simple-Plan-tickets-Wed-Jan-27-2027-Rogers-Arena Simple Plan Simple Plan Rogers Arena 2443 CONCERTS) |
| tm-simple-plan-2027-edmonton-1av7z_kgkmptc0p | Simple Plan | refresh (applied) | 8308714 | https://www.ticketliquidator.com/tickets/8308714/Simple-Plan-tickets-Fri-Jan-29-2027-Rogers-Place | - |
| tm-simple-plan-2027-calgary-1av7z_kgkd2pi5n | Simple Plan | refresh (applied) | 8308715 | https://www.ticketliquidator.com/tickets/8308715/Simple-Plan-tickets-Sun-Jan-31-2027-Scotiabank-Saddledome | - |
| tm-simple-plan-2027-saskatoon-1av7z_kgkmkzc1- | Simple Plan | refresh (applied) | 8308716 | https://www.ticketliquidator.com/tickets/8308716/Simple-Plan-tickets-Mon-Feb-1-2027-SaskTel-Centre | - |
| tm-simple-plan-2027-winnipeg-16ozk4eozza27k28 | Simple Plan | refresh (applied) | 8308717 | https://www.ticketliquidator.com/tickets/8308717/Simple-Plan-tickets-Tue-Feb-2-2027-Canada-Life-Centre | - |
| tm-simple-plan-2027-toronto-1a8zk4e0eqizeug | Simple Plan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-plan-2027-kitchener-1a8zk4agketqbtj | Simple Plan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-plan-2027-london-1f7zvp8wqzz7ufv6 | Simple Plan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-plan-2027-kingston-1a8zk4vgkdbqsjy | Simple Plan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-plan-2027-kanata-1ad7z_kgkb3adut | Simple Plan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simple-plan-2027-montreal-1ad7z_kgkd-eypy | Simple Plan | refresh (applied) | 8308723 | https://www.ticketliquidator.com/tickets/8308723/Simple-Plan-tickets-Fri-Feb-12-2027-Centre-Bell | - |
| tm-simple-plan-2027-moncton-1aszkfygkdcttvt | Simple Plan | refresh (applied) | 8308724 | https://www.ticketliquidator.com/tickets/8308724/Simple-Plan-tickets-Sun-Feb-14-2027-Avenir-Centre | - |
| tm-simple-plan-2027-sydney-1aszk4agkex2k4f | Simple Plan | refresh (applied) | 8308725 | https://www.ticketliquidator.com/tickets/8308725/Simple-Plan-tickets-Mon-Feb-15-2027-Centre-200 | - |
| tm-simple-plan-2027-halifax-1ad7z_kgkmojy7e | Simple Plan | refresh (applied) | 8308726 | https://www.ticketliquidator.com/tickets/8308726/Simple-Plan-tickets-Tue-Feb-16-2027-Scotiabank-Centre | - |
| tm-simple-plan-2027-sesto-san-giovanni-zg9rmiynyzff6k | Simple Plan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simply-red-2027-amsterdam-z698xzbpz16vajampp | Simply Red | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simply-red-2027-amsterdam-z698xzbpz16vceov_9 | Simply Red | refresh (applied) | 8315155 | https://www.ticketliquidator.com/tickets/8315155/Simply-Red-tickets-Sun-Jun-20-2027-Ziggo-Dome | - |
| tm-simply-red-2027-merksem-antwerpen-z698xzg2z1kbk_apn | Simply Red | refresh (applied) | 8389781 | https://www.ticketliquidator.com/tickets/8389781/Simply-Red-tickets-Tue-Jun-22-2027-AFAS-Dome | - |
| tm-simply-red-2027-nurnberg-z698xzc2z16v0aozkf | Simply Red | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simply-red-2027-fulda-z698xzc2z16vq7paf0 | Simply Red | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simply-red-2027-aurich-z698xzc2z16v4ab8-i | Simply Red | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simply-red-2027-hemer-z698xzc2z16v_nfy_4 | Simply Red | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simply-red-2027-bonn-z698xzc2z1kpoq9-n | Simply Red | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simply-red-2027-halle-westfalen-z698xzc2z1kj7akbg | Simply Red | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simply-red-2027-chester-1agzkfsgkduxpco | Simply Red | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simply-red-2027-halifax-15dfz_3r_jv8z | Simply Red | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simply-red-2027-halifax-1adfz_3gkrvea3u | Simply Red | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simply-red-2027-halifax-1agzkfigkey3exj | Simply Red | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simply-red-2027-london-1adjz_3gkbyuns4 | Simply Red | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simply-red-2027-margate-1agzkfegkemyogi | Simply Red | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simply-red-2027-scarborough-1agzkf0gkdqpn-m | Simply Red | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simply-red-2027-colchester-1adfz_3gkmn5keu | Simply Red | refresh (applied) | 8294111 | https://www.ticketliquidator.com/tickets/8294111/Simply-Red-tickets-Wed-Aug-18-2027-Colchester-Castle-Park | - |
| tm-simply-red-2027-swansea-g5vhz_3rbtf3u | Simply Red | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simply-red-2027-newmarket-1amzkfygkdj2ef1 | Simply Red | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-red-clay-strays-2027-huntsville-z7r9jz1aa7svn | The Red Clay Strays | refresh (applied) | 8346190 | https://www.ticketliquidator.com/tickets/8346190/The-Red-Clay-Strays-tickets-Sun-Sep-12-2027-The-Orion-Amphitheater | - |
| tm-the-neighbourhood-2027-denver-g5vzz_4qmz4qp | The Neighbourhood | refresh (applied) | 8345902 | https://www.ticketliquidator.com/tickets/8345902/The-Neighbourhood-tickets-Tue-Mar-2-2027-Ball-Arena | - |
| tm-the-neighbourhood-2027-saint-louis-vv1kvovppfga13fre | The Neighbourhood | refresh (applied) | 8345903 | https://www.ticketliquidator.com/tickets/8345903/The-Neighbourhood-tickets-Thu-Mar-4-2027-Chaifetz-Arena | - |
| tm-the-neighbourhood-2027-dallas-vvg1yz_4no500h | The Neighbourhood | refresh (applied) | 8345905 | https://www.ticketliquidator.com/tickets/8345905/The-Neighbourhood-tickets-Sun-Mar-7-2027-American-Airlines-Center | - |
| tm-the-neighbourhood-2027-philadelphia-1adzz_4gkl39a_b | The Neighbourhood | refresh (applied) | 8345906 | https://www.ticketliquidator.com/tickets/8345906/The-Neighbourhood-tickets-Fri-Apr-23-2027-Xfinity-Mobile-Arena | - |
| tm-the-neighbourhood-2027-boston-vv1avzk4_gkdekcqu | The Neighbourhood | refresh (applied) | 8345907 | https://www.ticketliquidator.com/tickets/8345907/The-Neighbourhood-tickets-Sat-Apr-24-2027-TD-Garden | - |
| tm-the-neighbourhood-2027-montreal-1ad7z_4gknbo3lq | The Neighbourhood | refresh (applied) | 8345908 | https://www.ticketliquidator.com/tickets/8345908/The-Neighbourhood-tickets-Tue-Apr-27-2027-Centre-Bell | - |
| tm-the-neighbourhood-2027-kanata-16szk49oizau7kga | The Neighbourhood | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-neighbourhood-2027-columbus-vv17fz_4gkmetfbq | The Neighbourhood | refresh (applied) | 8345910 | https://www.ticketliquidator.com/tickets/8345910/The-Neighbourhood-tickets-Fri-Apr-30-2027-Value-City-Arena-at-The-Schottenstein-Center | - |
| tm-the-neighbourhood-2027-pittsburgh-16vbz_4jkg7tdr9 | The Neighbourhood | refresh (applied) | 8345911 | https://www.ticketliquidator.com/tickets/8345911/The-Neighbourhood-tickets-Sat-May-1-2027-PPG-Paints-Arena | - |
| tm-the-neighbourhood-2027-raleigh-g5evz_4l74bcy | The Neighbourhood | refresh (applied) | 8345912 | https://www.ticketliquidator.com/tickets/8345912/The-Neighbourhood-tickets-Tue-May-4-2027-Lenovo-Center | - |
| tm-the-neighbourhood-2027-indianapolis-vv1aazk49gkeyee1s | The Neighbourhood | refresh (applied) | 8345913 | https://www.ticketliquidator.com/tickets/8345913/The-Neighbourhood-tickets-Fri-May-7-2027-Gainbridge-Fieldhouse | - |
| tm-the-neighbourhood-2027-chicago-vv178z_4gknyh4c0 | The Neighbourhood | refresh (applied) | 8345914 | https://www.ticketliquidator.com/tickets/8345914/The-Neighbourhood-tickets-Sat-May-8-2027-United-Center | - |
| tm-the-neighbourhood-2027-winnipeg-1av7z_4gknbr6nb | The Neighbourhood | refresh (applied) | 8345915 | https://www.ticketliquidator.com/tickets/8345915/The-Neighbourhood-tickets-Tue-May-11-2027-Canada-Life-Centre | - |
| tm-the-neighbourhood-2027-calgary-1av7z_4gknld4le | The Neighbourhood | refresh (applied) | 8345916 | https://www.ticketliquidator.com/tickets/8345916/The-Neighbourhood-tickets-Fri-May-14-2027-Scotiabank-Saddledome | - |
| tm-the-neighbourhood-2027-edmonton-1av7z_4gkl6qbrx | The Neighbourhood | refresh (applied) | 8345917 | https://www.ticketliquidator.com/tickets/8345917/The-Neighbourhood-tickets-Sat-May-15-2027-Rogers-Place | - |
| tm-the-neighbourhood-2027-firenze-zg9rmiynyzfavv | The Neighbourhood | none | - | - | no qualifying listing (complete catalog checked) |
| tm-garth-brooks-2026-hamilton-1avzz_4gkrzxgxw | Garth Brooks | none | - | - | no qualifying listing (complete catalog checked) |
| tm-garth-brooks-2026-hamilton-1avzz_4gkre8jcm | Garth Brooks | none | - | - | no qualifying listing (complete catalog checked) |
| tm-interpol-2027-dallas-z7r9jz1aa7sce | Interpol | refresh (applied) | 8338176 | https://www.ticketliquidator.com/tickets/8338176/Interpol-tickets-Sat-Mar-20-2027-The-Bomb-Factory | - |
| tm-bryan-adams-2027-wellington-central-1ae8z_fgktxpjky | Bryan Adams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-foy-vance-2027-ardmore-z7r9jz1aa7_fo | Foy Vance | refresh (applied) | 7748057 | https://www.ticketliquidator.com/tickets/7748057/Foy-Vance-tickets-Fri-Apr-23-2027-The-Ardmore-Music-Hall | - |
| tm-katseye-2027-auckland-1ae8z_4gkre277q | KATSEYE | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dropkick-murphys-2027-albuquerque-z7r9jz1aae80p | Dropkick Murphys | refresh (applied) | 8297965 | https://www.ticketliquidator.com/tickets/8297965/Dropkick-Murphys-tickets-Fri-Feb-5-2027-Revel-Entertainment-Center | - |
| tm-dropkick-murphys-2027-tempe-1kk8vpu_gacx0xn | Dropkick Murphys | refresh (applied) | 8295207 | https://www.ticketliquidator.com/tickets/8295207/Dropkick-Murphys-tickets-Sat-Feb-6-2027-Marquee-Theatre-AZ | - |
| tm-dropkick-murphys-2027-del-mar-rz7hnez1afgypv | Dropkick Murphys | refresh (applied) | 8295209 | https://www.ticketliquidator.com/tickets/8295209/Dropkick-Murphys-tickets-Sun-Feb-7-2027-The-Sound-At-The-Del-Mar-Fairgrounds | - |
| tm-dropkick-murphys-2027-anaheim-vv1aazkfugkdym2qo | Dropkick Murphys | refresh (applied) | 8295210 | https://www.ticketliquidator.com/tickets/8295210/Dropkick-Murphys-tickets-Tue-Feb-9-2027-House-Of-Blues-Anaheim | - |
| tm-dropkick-murphys-2027-sacramento-g5vyz_k9fojar | Dropkick Murphys | refresh (applied) | 8295211 | https://www.ticketliquidator.com/tickets/8295211/Dropkick-Murphys-tickets-Wed-Feb-10-2027-Channel-24 | - |
| tm-dropkick-murphys-2027-vancouver-z7r9jz1aaeopk | Dropkick Murphys | refresh (applied) | 8351215 | https://www.ticketliquidator.com/tickets/8351215/Dropkick-Murphys-tickets-Fri-Feb-12-2027-PNE-Forum | - |
| tm-dropkick-murphys-2027-penticton-z7r9jz1aae8_9 | Dropkick Murphys | refresh (applied) | 8313582 | https://www.ticketliquidator.com/tickets/8313582/Dropkick-Murphys-tickets-Sat-Feb-13-2027-Penticton-Trade-Convention-Centre | - |
| tm-dropkick-murphys-2027-calgary-1k78vpuzga1a49u | Dropkick Murphys | refresh (applied) | 8295218 | https://www.ticketliquidator.com/tickets/8295218/Dropkick-Murphys-tickets-Sun-Feb-14-2027-Grey-Eagle-Resort-Casino | - |
| tm-dropkick-murphys-2027-edmonton-1aozkfygkesdhkn | Dropkick Murphys | refresh (applied) | 8295219 | https://www.ticketliquidator.com/tickets/8295219/Dropkick-Murphys-tickets-Tue-Feb-16-2027-Edmonton-Convention-Centre | - |
| tm-dropkick-murphys-2027-saskatoon-1aozkfmgke0_iup | Dropkick Murphys | refresh (applied) | 8295220 | https://www.ticketliquidator.com/tickets/8295220/Dropkick-Murphys-tickets-Wed-Feb-17-2027-SaskTel-Centre | - |
| tm-dropkick-murphys-2027-winnipeg-1aozkfugkew6n6r | Dropkick Murphys | refresh (applied) | 8295221 | https://www.ticketliquidator.com/tickets/8295221/Dropkick-Murphys-tickets-Thu-Feb-18-2027-Burton-Cummings-Theatre | - |
| tm-dropkick-murphys-2027-winnipeg-1aozkfugkewfq6x | Dropkick Murphys | refresh (applied) | 8295223 | https://www.ticketliquidator.com/tickets/8295223/Dropkick-Murphys-tickets-Fri-Feb-19-2027-Burton-Cummings-Theatre | - |
| tm-dropkick-murphys-2027-green-bay-z7r9jz1aaeopf | Dropkick Murphys | refresh (applied) | 8298937 | https://www.ticketliquidator.com/tickets/8298937/Dropkick-Murphys-tickets-Sun-Feb-21-2027-EPIC-Event-Center-WI | - |
| tm-dropkick-murphys-2027-fort-wayne-z7r9jz1aaeop4 | Dropkick Murphys | refresh (applied) | 8297141 | https://www.ticketliquidator.com/tickets/8297141/Dropkick-Murphys-tickets-Mon-Feb-22-2027-Clyde-Theatre | - |
| tm-dropkick-murphys-2027-grand-rapids-vv1afzkfggketsgvf | Dropkick Murphys | refresh (applied) | 8295212 | https://www.ticketliquidator.com/tickets/8295212/Dropkick-Murphys-tickets-Wed-Feb-24-2027-GLC-Live-at-20-Monroe | - |
| tm-dropkick-murphys-2027-detroit-vv1afzkfggkemn0a8 | Dropkick Murphys | refresh (applied) | 8295213 | https://www.ticketliquidator.com/tickets/8295213/Dropkick-Murphys-tickets-Fri-Feb-26-2027-The-Fillmore-Detroit | - |
| tm-dropkick-murphys-2027-london-1a8zkfugkeybnv7 | Dropkick Murphys | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dropkick-murphys-2027-toronto-1a8zkfygkdujro2 | Dropkick Murphys | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dropkick-murphys-2027-ottawa-16d7z_kj6g7s2ev | Dropkick Murphys | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dropkick-murphys-2027-quebec-1aszkfzbgfozegk | Dropkick Murphys | refresh (applied) | 8295227 | https://www.ticketliquidator.com/tickets/8295227/Dropkick-Murphys-tickets-Wed-Mar-3-2027-Le-Theatre-Capitole | - |
| tm-dropkick-murphys-2027-quebec-1aszkfzbgoozeg5 | Dropkick Murphys | refresh (applied) | 8295228 | https://www.ticketliquidator.com/tickets/8295228/Dropkick-Murphys-tickets-Thu-Mar-4-2027-Le-Theatre-Capitole | - |
| tm-dropkick-murphys-2027-montreal-1aszkfugkdv84mc | Dropkick Murphys | refresh (applied) | 8295230 | https://www.ticketliquidator.com/tickets/8295230/Dropkick-Murphys-tickets-Fri-Mar-5-2027-Olympia-Theatre-Montreal | - |
| tm-dropkick-murphys-2027-brooklyn-k7vgf_kictnjm | Dropkick Murphys | refresh (applied) | 8295214 | https://www.ticketliquidator.com/tickets/8295214/Dropkick-Murphys-tickets-Sun-Mar-7-2027-Brooklyn-Paramount | - |
| tm-dropkick-murphys-2027-wilmington-vv1aezkfmgkexqysz | Dropkick Murphys | refresh (applied) | 8295215 | https://www.ticketliquidator.com/tickets/8295215/Dropkick-Murphys-tickets-Mon-Mar-8-2027-The-Queen-Wilmington | - |
| tm-dropkick-murphys-2027-portland-vv177z_kgksaw-ns | Dropkick Murphys | refresh (applied) | 8295216 | https://www.ticketliquidator.com/tickets/8295216/Dropkick-Murphys-tickets-Thu-Mar-11-2027-State-Theatre-ME | - |
| tm-dropkick-murphys-2027-boston-vv1avzkfsgkdttsc_ | Dropkick Murphys | refresh (applied) | 8319718 | https://www.ticketliquidator.com/tickets/8319718/Dropkick-Murphys-tickets-Fri-Mar-12-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-dropkick-murphys-2027-boston-vv1avzkfsgkdtcsmb | Dropkick Murphys | correct (applied) | 8319720 | https://www.ticketliquidator.com/tickets/8319720/Dropkick-Murphys-tickets-Sat-Mar-13-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-dropkick-murphys-2027-boston-vv1avzkfmgketdy2c | Dropkick Murphys | refresh (applied) | 8319723 | https://www.ticketliquidator.com/tickets/8319723/Dropkick-Murphys-tickets-Sun-Mar-14-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-dropkick-murphys-2027-boston-vv1avzkfygkdomyjz | Dropkick Murphys | refresh (applied) | 8319724 | https://www.ticketliquidator.com/tickets/8319724/Dropkick-Murphys-tickets-Wed-Mar-17-2027-Citizens-House-Of-Blues-Boston | - |
| tm-kaleo-2027-fremantle-1akzkffgkdlimm3 | KALEO | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kaleo-2027-brisbane-1akzkffgkemx7vu | KALEO | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kaleo-2027-auckland-1a0zkfkgkeyf3yh | KALEO | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kaleo-2027-oslo-z698xzb_z1kaejyfv | KALEO | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kaleo-2027-oslo-z698xzb_z16v0wbofv | KALEO | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kaleo-2027-brussels-z698xzg2z16vjkuafp | KALEO | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kaleo-2027-brussels-z698xzg2z16v_0_u-k | KALEO | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kaleo-2027-madrid-z698xz2qz1kuvp4rv | KALEO | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kaleo-2027-barcelona-z698xz2qz1koa3fud | KALEO | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kaleo-2027-milano-zg9rmiynyzdeke | KALEO | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kaleo-2027-warsaw-z698xzqpz1kbba-jk | KALEO | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kaleo-2027-praha-8-z698xzu0z1kauc3vb | KALEO | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kaleo-2027-zurich-z698xzu3z16vqkfsq4 | KALEO | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kaleo-2027-vienna-z698xz5rz16vr81eow | KALEO | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kaleo-2027-berlin-z698xzc2z1ku0c686 | KALEO | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kaleo-2027-amsterdam-z698xzbpz16v8--tpb | KALEO | refresh (applied) | 8098853 | https://www.ticketliquidator.com/tickets/8098853/Kaleo-tickets-Tue-Mar-30-2027-Ziggo-Dome | - |
| tm-kaleo-2027-london-g5dzz_uxmo7c5 | KALEO | refresh (applied) | 8098553 | https://www.ticketliquidator.com/tickets/8098553/Kaleo-tickets-Sat-Apr-3-2027-O2-Academy-Brixton | - |
| tm-kaleo-2027-manchester-17uov0g6ulnuuct | KALEO | refresh (applied) | 8098554 | https://www.ticketliquidator.com/tickets/8098554/Kaleo-tickets-Tue-Apr-6-2027-O2-Apollo-Manchester | - |
| tm-kaleo-2027-glasgow-g5dzz_ujz8jhw | KALEO | refresh (applied) | 8098555 | https://www.ticketliquidator.com/tickets/8098555/Kaleo-tickets-Thu-Apr-8-2027-O2-Academy-Glasgow | - |
| tm-kaleo-2027-birmingham-g5dzz_u5ehmmb | KALEO | refresh (applied) | 8098851 | https://www.ticketliquidator.com/tickets/8098851/Kaleo-tickets-Fri-Apr-9-2027-O2-Academy-Birmingham | - |
| tm-alex-warren-2026-las-vegas-1ayzkftgkdvnpgb | Alex Warren | refresh (applied) | 8264076 | https://www.ticketliquidator.com/tickets/8264076/Alex-Warren-tickets-Wed-Dec-30-2026-The-Colosseum-At-Caesars-Palace | - |
| tm-alex-warren-2027-las-vegas-1ayzkftgkdvipgh | Alex Warren | refresh (applied) | 8264077 | https://www.ticketliquidator.com/tickets/8264077/Alex-Warren-tickets-Thu-Dec-31-2026-The-Colosseum-At-Caesars-Palace | - |
| tm-alex-warren-2027-cardiff-g5vhz_3c3nozb | Alex Warren | none | - | - | no qualifying listing (complete catalog checked) |
| tm-alex-warren-2027-belfast-16doz_3cdg7z8me | Alex Warren | none | - | - | no qualifying listing (complete catalog checked) |
| tm-alex-warren-2027-co-dublin-1abzkf-gkebtuoa | Alex Warren | none | - | - | no qualifying listing (complete catalog checked) |
| tm-alex-warren-2027-glasgow-1auzkf_gkemjhov | Alex Warren | none | - | - | no qualifying listing (complete catalog checked) |
| tm-alex-warren-2027-exeter-g5vhz_3je-wlb | Alex Warren | none | - | - | no qualifying listing (complete catalog checked) |
| tm-alex-warren-2027-woodstock-16djz_4q3g7mfnf | Alex Warren | refresh (applied) | 8345707 | https://www.ticketliquidator.com/tickets/8345707/Alex-Warren-tickets-Sun-Jun-27-2027-Blenheim-Palace | - |
| tm-alex-warren-2027-scarborough-1agzkf0gkdh1nyj | Alex Warren | refresh (applied) | 8295164 | https://www.ticketliquidator.com/tickets/8295164/Alex-Warren-tickets-Wed-Jun-30-2027-Scarborough-Open-Air-Theatre | - |
| tm-alex-warren-2027-manchester-g5dzz_fblbfue | Alex Warren | refresh (applied) | 8345708 | https://www.ticketliquidator.com/tickets/8345708/Alex-Warren-tickets-Fri-Jul-2-2027-Heaton-Park | - |
| tm-alex-warren-2027-london-1amzkfngkdb5am5 | Alex Warren | refresh (applied) | 8294337 | https://www.ticketliquidator.com/tickets/8294337/Alex-Warren-tickets-Sat-Jul-3-2027-Crystal-Palace-Park | - |
| tm-marc-anthony-2027-las-vegas-1avjz_3gkmcrlvv | Marc Anthony | refresh (applied) | 8281218 | https://www.ticketliquidator.com/tickets/8281218/Marc-Anthony-tickets-Fri-Feb-12-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-marc-anthony-2027-las-vegas-1avjz_3gkmcslva | Marc Anthony | refresh (applied) | 8281219 | https://www.ticketliquidator.com/tickets/8281219/Marc-Anthony-tickets-Sat-Feb-13-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-marc-anthony-2027-las-vegas-1avjz_3gkmcslvq | Marc Anthony | refresh (applied) | 8281222 | https://www.ticketliquidator.com/tickets/8281222/Marc-Anthony-tickets-Wed-Feb-17-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-marc-anthony-2027-las-vegas-1avjz_3gkmcglvg | Marc Anthony | refresh (applied) | 8281225 | https://www.ticketliquidator.com/tickets/8281225/Marc-Anthony-tickets-Fri-Feb-19-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-marc-anthony-2027-las-vegas-1avjz_3gkmcmlvw | Marc Anthony | refresh (applied) | 8281226 | https://www.ticketliquidator.com/tickets/8281226/Marc-Anthony-tickets-Sat-Feb-20-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-marc-anthony-2027-las-vegas-1avjz_3gkmcylvt | Marc Anthony | refresh (applied) | 8281233 | https://www.ticketliquidator.com/tickets/8281233/Marc-Anthony-tickets-Fri-Sep-10-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-marc-anthony-2027-las-vegas-1avjz_3gkmcdlga | Marc Anthony | refresh (applied) | 8281234 | https://www.ticketliquidator.com/tickets/8281234/Marc-Anthony-tickets-Sat-Sep-11-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-marc-anthony-2027-las-vegas-1avjz_3gkmcwlg2 | Marc Anthony | refresh (applied) | 8281237 | https://www.ticketliquidator.com/tickets/8281237/Marc-Anthony-tickets-Fri-Sep-17-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-marc-anthony-2027-las-vegas-1avjz_3gkmctlgh | Marc Anthony | refresh (applied) | 8281238 | https://www.ticketliquidator.com/tickets/8281238/Marc-Anthony-tickets-Sat-Sep-18-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-marc-anthony-2027-las-vegas-1avjz_3gkmmv2gl | Marc Anthony | refresh (applied) | 8281239 | https://www.ticketliquidator.com/tickets/8281239/Marc-Anthony-tickets-Sun-Sep-19-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-calvin-harris-2027-las-vegas-z7r9jz1aaeaa4 | Calvin Harris | refresh (applied) | 8309899 | https://www.ticketliquidator.com/tickets/8309899/Calvin-Harris-tickets-Thu-Dec-31-2026-XS-Nightclub-At-Wynn-Las-Vegas | - |
| tm-calvin-harris-2027-perth-1avgz_kjvv7zd8va | Calvin Harris | none | - | - | no qualifying listing (complete catalog checked) |
| tm-calvin-harris-2027-perth-1avgz_3gkxss4fp | Calvin Harris | none | - | - | no qualifying listing (complete catalog checked) |
| tm-calvin-harris-2027-bowen-hills-1avgz_3gkxc-fur | Calvin Harris | none | - | - | no qualifying listing (complete catalog checked) |
| tm-calvin-harris-2027-sydney-1avgz_3gkxct3en | Calvin Harris | none | - | - | no qualifying listing (complete catalog checked) |
| tm-calvin-harris-2027-sydney-1avgz_3gkt8zbnw | Calvin Harris | none | - | - | no qualifying listing (complete catalog checked) |
| tm-calvin-harris-2027-sydney-1akzkfmgkdbb5z5 | Calvin Harris | none | - | - | no qualifying listing (complete catalog checked) |
| tm-calvin-harris-2027-sydney-1akzkfmgkdbrdyf | Calvin Harris | none | - | - | no qualifying listing (complete catalog checked) |
| tm-calvin-harris-2027-sydney-1akzkfugkdxptn8 | Calvin Harris | none | - | - | no qualifying listing (complete catalog checked) |
| tm-calvin-harris-2027-flemington-1apzkfugkdpmniz | Calvin Harris | none | - | - | no qualifying listing (complete catalog checked) |
| tm-calvin-harris-2027-flemington-1aefz_3gkxmmgx4 | Calvin Harris | none | - | - | no qualifying listing (complete catalog checked) |
| tm-calvin-harris-2027-flemington-16efz_kefg7nkeo | Calvin Harris | none | - | - | no qualifying listing (complete catalog checked) |
| tm-calvin-harris-2027-boston-vv117z_47a1fa9 | Calvin Harris | refresh (applied) | 8332831 | https://www.ticketliquidator.com/tickets/8332831/Calvin-Harris-tickets-Wed-Mar-31-2027-TD-Garden | - |
| tm-calvin-harris-2027-boston-vv1a8vp3aga2khl4 | Calvin Harris | refresh (applied) | 8319872 | https://www.ticketliquidator.com/tickets/8319872/Calvin-Harris-tickets-Thu-Apr-1-2027-TD-Garden | - |
| tm-calvin-harris-2027-baltimore-1ka8vp3_ga2r9p0 | Calvin Harris | refresh (applied) | 8319873 | https://www.ticketliquidator.com/tickets/8319873/Calvin-Harris-tickets-Fri-Apr-2-2027-CFG-Bank-Arena | - |
| tm-calvin-harris-2027-boston-vv1a8vp49ga5l0kw | Calvin Harris | refresh (applied) | 8336942 | https://www.ticketliquidator.com/tickets/8336942/Calvin-Harris-tickets-Sun-Apr-4-2027-TD-Garden | - |
| tm-calvin-harris-2027-brooklyn-16yzk4k-yza5e8ka | Calvin Harris | refresh (applied) | 8332603 | https://www.ticketliquidator.com/tickets/8332603/Calvin-Harris-tickets-Tue-Apr-6-2027-Barclays-Center | - |
| tm-calvin-harris-2027-brooklyn-16dzz_4c6g7nsw_ | Calvin Harris | refresh (applied) | 8332913 | https://www.ticketliquidator.com/tickets/8332913/Calvin-Harris-tickets-Wed-Apr-7-2027-Barclays-Center | - |
| tm-calvin-harris-2027-philadelphia-1ayzk4agkew8jvi | Calvin Harris | refresh (applied) | 8319874 | https://www.ticketliquidator.com/tickets/8319874/Calvin-Harris-tickets-Thu-Apr-8-2027-Xfinity-Mobile-Arena | - |
| tm-calvin-harris-2027-brooklyn-1ayzk4fgkeyujwu | Calvin Harris | refresh (applied) | 8319875 | https://www.ticketliquidator.com/tickets/8319875/Calvin-Harris-tickets-Fri-Apr-9-2027-Barclays-Center | - |
| tm-calvin-harris-2027-brooklyn-16yzk4ov9zau1f7g | Calvin Harris | refresh (applied) | 8330028 | https://www.ticketliquidator.com/tickets/8330028/Calvin-Harris-tickets-Sat-Apr-10-2027-Barclays-Center | - |
| tm-calvin-harris-2027-toronto-1a8zk4fgkevlxcb | Calvin Harris | none | - | - | no qualifying listing (complete catalog checked) |
| tm-calvin-harris-2027-montreal-1ad7z_fxfqwzdua5 | Calvin Harris | refresh (applied) | 8319891 | https://www.ticketliquidator.com/tickets/8319891/Calvin-Harris-tickets-Fri-Apr-16-2027-Centre-Bell | - |
| tm-calvin-harris-2027-hamilton-1a8zk4agkd5cdnl | Calvin Harris | none | - | - | no qualifying listing (complete catalog checked) |
| tm-calvin-harris-2027-houston-z7r9jz1aa76pk | Calvin Harris | refresh (applied) | 8319876 | https://www.ticketliquidator.com/tickets/8319876/Calvin-Harris-tickets-Fri-Apr-23-2027-Toyota-Center-TX | - |
| tm-calvin-harris-2027-fort-worth-vvg1yz_flvwxhm | Calvin Harris | refresh (applied) | 8319878 | https://www.ticketliquidator.com/tickets/8319878/Calvin-Harris-tickets-Sat-Apr-24-2027-Ariat-Arena | - |
| tm-calvin-harris-2027-austin-g5diz_fjhnaqg | Calvin Harris | refresh (applied) | 8319880 | https://www.ticketliquidator.com/tickets/8319880/Calvin-Harris-tickets-Sun-Apr-25-2027-Moody-Center-ATX | - |
| tm-calvin-harris-2027-saint-paul-z7r9jz1aa76pf | Calvin Harris | refresh (applied) | 8319881 | https://www.ticketliquidator.com/tickets/8319881/Calvin-Harris-tickets-Thu-Apr-29-2027-Grand-Casino-Arena | - |
| tm-calvin-harris-2027-chicago-vv1a7zk4fgkdzmu0d | Calvin Harris | refresh (applied) | 8319882 | https://www.ticketliquidator.com/tickets/8319882/Calvin-Harris-tickets-Fri-Apr-30-2027-United-Center | - |
| tm-calvin-harris-2027-chicago-vv167zk4319zac1ud5 | Calvin Harris | refresh (applied) | 8333136 | https://www.ticketliquidator.com/tickets/8333136/Calvin-Harris-tickets-Sun-May-2-2027-United-Center | - |
| tm-calvin-harris-2027-salt-lake-city-z7r9jz1aa76p8 | Calvin Harris | refresh (applied) | 8319883 | https://www.ticketliquidator.com/tickets/8319883/Calvin-Harris-tickets-Wed-May-5-2027-Delta-Center | - |
| tm-calvin-harris-2027-oakland-g5vyz_fh6tm8u | Calvin Harris | refresh (applied) | 8319885 | https://www.ticketliquidator.com/tickets/8319885/Calvin-Harris-tickets-Fri-May-7-2027-Oakland-Arena | - |
| tm-calvin-harris-2027-oakland-g5vyz_4drjlsj | Calvin Harris | refresh (applied) | 8333276 | https://www.ticketliquidator.com/tickets/8333276/Calvin-Harris-tickets-Sat-May-8-2027-Oakland-Arena | - |
| tm-calvin-harris-2027-oakland-g5vyz_4cwzdxp | Calvin Harris | refresh (applied) | 8333281 | https://www.ticketliquidator.com/tickets/8333281/Calvin-Harris-tickets-Sun-May-9-2027-Oakland-Arena | - |
| tm-calvin-harris-2027-seattle-vvg1hz_fjlgmb1 | Calvin Harris | refresh (applied) | 8319886 | https://www.ticketliquidator.com/tickets/8319886/Calvin-Harris-tickets-Fri-May-14-2027-Climate-Pledge-Arena | - |
| tm-calvin-harris-2027-seattle-vvg1hz_48c3k9c | Calvin Harris | refresh (applied) | 8336941 | https://www.ticketliquidator.com/tickets/8336941/Calvin-Harris-tickets-Sat-May-15-2027-Climate-Pledge-Arena | - |
| tm-calvin-harris-2027-vancouver-1aozk46gkdf4hov | Calvin Harris | refresh (applied) | 8319893 | https://www.ticketliquidator.com/tickets/8319893/Calvin-Harris-tickets-Sun-May-16-2027-Rogers-Arena | - |
| tm-calvin-harris-2027-vancouver-1k78vpfmgagddrz | Calvin Harris | refresh (applied) | 8336944 | https://www.ticketliquidator.com/tickets/8336944/Calvin-Harris-tickets-Mon-May-17-2027-Rogers-Arena | - |
| tm-calvin-harris-2027-anaheim-vv1aazk44gkdgr8bi | Calvin Harris | refresh (applied) | 8337412 | https://www.ticketliquidator.com/tickets/8337412/Calvin-Harris-tickets-Thu-May-20-2027-Honda-Center | - |
| tm-calvin-harris-2027-san-diego-vvg1iz_fqlbaqn | Calvin Harris | refresh (applied) | 8319887 | https://www.ticketliquidator.com/tickets/8319887/Calvin-Harris-tickets-Fri-May-21-2027-Viejas-Arena-At-Aztec-Bowl | - |
| tm-calvin-harris-2027-san-diego-vvg1iz_4dbvmwb | Calvin Harris | refresh (applied) | 8333282 | https://www.ticketliquidator.com/tickets/8333282/Calvin-Harris-tickets-Sat-May-22-2027-Viejas-Arena-At-Aztec-Bowl | - |
| tm-calvin-harris-2027-san-diego-vvg1iz_45bbb-k | Calvin Harris | refresh (applied) | 8333283 | https://www.ticketliquidator.com/tickets/8333283/Calvin-Harris-tickets-Sun-May-23-2027-Viejas-Arena-At-Aztec-Bowl | - |
| tm-calvin-harris-2027-inglewood-vv1f0z_48vcazd8d1 | Calvin Harris | refresh (applied) | 8336943 | https://www.ticketliquidator.com/tickets/8336943/Calvin-Harris-tickets-Wed-May-26-2027-The-Kia-Forum | - |
| tm-calvin-harris-2027-inglewood-vv1aazk4fgkebghyq | Calvin Harris | refresh (applied) | 8319888 | https://www.ticketliquidator.com/tickets/8319888/Calvin-Harris-tickets-Thu-May-27-2027-The-Kia-Forum | - |
| tm-calvin-harris-2027-inglewood-vv1aazk48gkd68xic | Calvin Harris | refresh (applied) | 8330024 | https://www.ticketliquidator.com/tickets/8330024/Calvin-Harris-tickets-Fri-May-28-2027-The-Kia-Forum | - |
| tm-calvin-harris-2027-inglewood-vv1aazk48gkd6fcij | Calvin Harris | refresh (applied) | 8333280 | https://www.ticketliquidator.com/tickets/8333280/Calvin-Harris-tickets-Sat-May-29-2027-The-Kia-Forum | - |
| tm-calvin-harris-2027-inglewood-vv1aazk48gkd69rc1 | Calvin Harris | refresh (applied) | 8333277 | https://www.ticketliquidator.com/tickets/8333277/Calvin-Harris-tickets-Sun-May-30-2027-The-Kia-Forum | - |
| tm-aespa-2027-manchester-g5vhz_gm82p9j | aespa | refresh (applied) | 7915776 | https://www.ticketliquidator.com/tickets/7915776/Aespa-tickets-Thu-Jan-14-2027-AO-Arena | - |
| tm-aespa-2027-london-1agzk3pgkeok319 | aespa | refresh (applied) | 8178283 | https://www.ticketliquidator.com/tickets/8178283/Aespa-tickets-Sat-Jan-16-2027-O2-Arena-London | - |
| tm-aespa-2027-amsterdam-z698xzbpz16voeqaa6 | aespa | refresh (applied) | 7915781 | https://www.ticketliquidator.com/tickets/7915781/Aespa-tickets-Tue-Jan-19-2027-Ziggo-Dome | - |
| tm-aespa-2027-berlin-z698xzc2z1k_y_voe | aespa | refresh (applied) | 7915779 | https://www.ticketliquidator.com/tickets/7915779/Aespa-tickets-Tue-Jan-26-2027-Uber-Arena | - |
| tm-aespa-2027-milano-zg9rmiynyzekk1 | aespa | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch; listing: Aespa; text: Aespa Aespa /tickets/7915783/Aespa-tickets-Fri-Jan-29-2027-Unipol-Dome Aespa Aespa Unipol Dome 196769 CONCERTS Via Romualdo Bonfadini 148 Ro) |
| tm-aespa-2027-barcelona-z698xz2qz16v0vckob | aespa | refresh (applied) | 7915778 | https://www.ticketliquidator.com/tickets/7915778/Aespa-tickets-Sun-Jan-31-2027-Palau-Sant-Jordi | - |
| tm-cage-the-elephant-2027-krakow-z698xzqpz16vup4eqe | Cage The Elephant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-cage-the-elephant-2027-milano-zg9rmiynyzdfvd | Cage The Elephant | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch; listing: Cage The Elephant; text: Cage The Elephant Cage The Elephant /tickets/8315078/Cage-The-Elephant-tickets-Wed-Feb-17-2027-Fabrique-Milan Cage The Elephant Cage The Ele) |
| tm-cage-the-elephant-2027-cardiff-16dbz_3rfg7rxe8 | Cage The Elephant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-cage-the-elephant-2027-leeds-g5dzz_350zpr- | Cage The Elephant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-cage-the-elephant-2027-glasgow-g5dzz_3kn7sp1 | Cage The Elephant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-cage-the-elephant-2027-birmingham-g5dzz_3k0lkkh | Cage The Elephant | refresh (applied) | 8265885 | https://www.ticketliquidator.com/tickets/8265885/Cage-The-Elephant-tickets-Fri-Feb-26-2027-O2-Academy-Birmingham | - |
| tm-cage-the-elephant-2027-manchester-g5dzz_3374s3o | Cage The Elephant | refresh (applied) | 8254819 | https://www.ticketliquidator.com/tickets/8254819/Cage-The-Elephant-tickets-Sun-Feb-28-2027-O2-Victoria-Warehouse-Manchester | - |
| tm-cage-the-elephant-2027-london-g5vhz_3r6zval | Cage The Elephant | none | - | - | no qualifying listing (complete catalog checked) |
| tm-two-door-cinema-club-2026-auckland-1a0zkoygkd-_sqy | Two Door Cinema Club | none | - | - | no qualifying listing (complete catalog checked) |
| tm-two-door-cinema-club-2027-dublin-17kzv0g6gmgxxtc | Two Door Cinema Club | refresh (applied) | 8127281 | https://www.ticketliquidator.com/tickets/8127281/Two-Door-Cinema-Club-tickets-Sat-Jan-23-2027-3Arena-Dublin | - |
| tm-two-door-cinema-club-2027-belfast-17czv0g659j0-z4 | Two Door Cinema Club | refresh (applied) | 8127280 | https://www.ticketliquidator.com/tickets/8127280/Two-Door-Cinema-Club-tickets-Sun-Jan-24-2027-The-O2-Belfast | - |
| tm-two-door-cinema-club-2027-glasgow-17uov0g6ueealfd | Two Door Cinema Club | refresh (applied) | 8127282 | https://www.ticketliquidator.com/tickets/8127282/Two-Door-Cinema-Club-tickets-Tue-Jan-26-2027-OVO-Hydro | - |
| tm-two-door-cinema-club-2027-manchester-g5vhz_ujflqde | Two Door Cinema Club | refresh (applied) | 8127279 | https://www.ticketliquidator.com/tickets/8127279/Two-Door-Cinema-Club-tickets-Wed-Jan-27-2027-AO-Arena | - |
| tm-two-door-cinema-club-2027-london-17u8v0g6ulnn4yb | Two Door Cinema Club | refresh (applied) | 8104264 | https://www.ticketliquidator.com/tickets/8104264/Two-Door-Cinema-Club-tickets-Thu-Jan-28-2027-O2-Arena-London | - |
| tm-two-door-cinema-club-2027-brussels-z698xzg2z16v4w_s4e | Two Door Cinema Club | none | - | - | no qualifying listing (complete catalog checked) |
| tm-two-door-cinema-club-2027-oslo-z698xzb_z1k8pbuqa | Two Door Cinema Club | none | - | - | no qualifying listing (complete catalog checked) |
| tm-two-door-cinema-club-2027-hamburg-z698xzc2z16v1k_wvn | Two Door Cinema Club | none | - | - | no qualifying listing (complete catalog checked) |
| tm-two-door-cinema-club-2027-milwaukee-vv1a6zk47gkemmn1x | Two Door Cinema Club | refresh (applied) | 8338712 | https://www.ticketliquidator.com/tickets/8338712/Two-Door-Cinema-Club-tickets-Sat-May-8-2027-Landmark-Credit-Union-Live | - |
| tm-two-door-cinema-club-2027-seattle-vvg1hz_4ppr1wj | Two Door Cinema Club | refresh (applied) | 8338713 | https://www.ticketliquidator.com/tickets/8338713/Two-Door-Cinema-Club-tickets-Mon-May-17-2027-Paramount-Theatre-Seattle | - |
| tm-two-door-cinema-club-2027-sacramento-g5vyz_46svaa8 | Two Door Cinema Club | refresh (applied) | 8338714 | https://www.ticketliquidator.com/tickets/8338714/Two-Door-Cinema-Club-tickets-Wed-May-19-2027-Channel-24 | - |
| tm-two-door-cinema-club-2027-oakland-g5vyz_48x4wje | Two Door Cinema Club | refresh (applied) | 8338715 | https://www.ticketliquidator.com/tickets/8338715/Two-Door-Cinema-Club-tickets-Thu-May-20-2027-Fox-Theater-Oakland | - |
| tm-two-door-cinema-club-2027-hollywood-vv16azk4k-kza5aa16 | Two Door Cinema Club | refresh (applied) | 8338716 | https://www.ticketliquidator.com/tickets/8338716/Two-Door-Cinema-Club-tickets-Sat-May-22-2027-Hollywood-Palladium | - |
| tm-two-door-cinema-club-2027-hollywood-vv170z_4gknbp_nx | Two Door Cinema Club | refresh (applied) | 8350435 | https://www.ticketliquidator.com/tickets/8350435/Two-Door-Cinema-Club-tickets-Sun-May-23-2027-Hollywood-Palladium | - |
| tm-two-door-cinema-club-2027-del-mar-rz7hnez1afc70v | Two Door Cinema Club | refresh (applied) | 8338717 | https://www.ticketliquidator.com/tickets/8338717/Two-Door-Cinema-Club-tickets-Mon-May-24-2027-The-Sound-At-The-Del-Mar-Fairgrounds | - |
| tm-two-door-cinema-club-2027-houston-g5diz_42wndml | Two Door Cinema Club | refresh (applied) | 8338718 | https://www.ticketliquidator.com/tickets/8338718/Two-Door-Cinema-Club-tickets-Fri-May-28-2027-White-Oak-Music-Hall-Lawn | - |
| tm-latto-2026-philadelphia-vv17fz_4gkux4p4m | Latto | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Doja Cat & Latto; text: Doja Cat & Latto Doja Cat & Latto /tickets/7457657/Doja-Cat-tickets-Sun-Nov-29-2026-Xfinity-Mobile-Arena Doja Cat & Latto Doja Cat Xfinity M) |
| tm-noah-kahan-2027-birmingham-1aezz_4gkwloexg | Noah Kahan | refresh (applied) | 8347742 | https://www.ticketliquidator.com/tickets/8347742/Noah-Kahan-tickets-Tue-Apr-27-2027-Protective-Stadium | - |
| tm-noah-kahan-2027-tampa-vvg1vz_4rlk1ty | Noah Kahan | refresh (applied) | 8347743 | https://www.ticketliquidator.com/tickets/8347743/Noah-Kahan-tickets-Thu-Apr-29-2027-Raymond-James-Stadium | - |
| tm-noah-kahan-2027-charlotte-g5evz_4r3uqrt | Noah Kahan | refresh (applied) | 8347745 | https://www.ticketliquidator.com/tickets/8347745/Noah-Kahan-tickets-Thu-May-6-2027-Bank-Of-America-Stadium | - |
| tm-noah-kahan-2027-houston-g5diz_4wkxf3f | Noah Kahan | refresh (applied) | 8347747 | https://www.ticketliquidator.com/tickets/8347747/Noah-Kahan-tickets-Wed-May-12-2027-Reliant-Stadium | - |
| tm-noah-kahan-2027-santa-clara-g5vyz_4rfk6c7 | Noah Kahan | refresh (applied) | 8347749 | https://www.ticketliquidator.com/tickets/8347749/Noah-Kahan-tickets-Wed-May-19-2027-Levis-Stadium | - |
| tm-noah-kahan-2027-las-vegas-1avjz_4gkrmeou0 | Noah Kahan | refresh (applied) | 8347750 | https://www.ticketliquidator.com/tickets/8347750/Noah-Kahan-tickets-Fri-May-21-2027-Allegiant-Stadium | - |
| tm-noah-kahan-2027-columbus-vv17fz_4gkshkqmo | Noah Kahan | refresh (applied) | 8347756 | https://www.ticketliquidator.com/tickets/8347756/Noah-Kahan-tickets-Sat-Jun-5-2027-Ohio-Stadium | - |
| tm-noah-kahan-2027-detroit-vv1koz_kr3g7cdve | Noah Kahan | refresh (applied) | 8347757 | https://www.ticketliquidator.com/tickets/8347757/Noah-Kahan-tickets-Thu-Jun-10-2027-Ford-Field | - |
| tm-noah-kahan-2027-orchard-park-vv17gz_4gksqg3zl | Noah Kahan | refresh (applied) | 8347758 | https://www.ticketliquidator.com/tickets/8347758/Noah-Kahan-tickets-Sat-Jun-12-2027-New-Highmark-Stadium | - |
| tm-noah-kahan-2027-montreal-1aszk4pgkdjhrvf | Noah Kahan | refresh (applied) | 8347760 | https://www.ticketliquidator.com/tickets/8347760/Noah-Kahan-tickets-Tue-Jun-15-2027-Parc-Jean-Drapeau | - |
| tm-noah-kahan-2027-east-rutherford-k7vgf_4me3p-- | Noah Kahan | refresh (applied) | 8347759 | https://www.ticketliquidator.com/tickets/8347759/Noah-Kahan-tickets-Fri-Jun-18-2027-MetLife-Stadium | - |
| tm-noah-kahan-2027-berlin-z698xzc2z16vgkoop- | Noah Kahan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-noah-kahan-2027-milano-zg9rmiynyzfa6d | Noah Kahan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-noah-kahan-2027-sevilla-z698xz2qz16v3duzrf | Noah Kahan | none | - | - | no qualifying listing (complete catalog checked) |
| tm-u2-2027-stockholm-z698xzq2z16v-3vzat | U2 | refresh (applied) | 8347795 | https://www.ticketliquidator.com/tickets/8347795/U2-tickets-Mon-Apr-26-2027-Strawberry-Arena | - |
| tm-u2-2027-stockholm-z698xzq2z16v_p7i1a | U2 | refresh (applied) | 8347796 | https://www.ticketliquidator.com/tickets/8347796/U2-tickets-Wed-Apr-28-2027-Strawberry-Arena | - |
| tm-u2-2027-amsterdam-z698xzbpz16v0jupoj | U2 | refresh (applied) | 8347800 | https://www.ticketliquidator.com/tickets/8347800/U2-tickets-Sat-Jun-5-2027-Johan-Cruijff-Arena | - |
| tm-u2-2027-amsterdam-z698xzbpz16v7bpzfv | U2 | refresh (applied) | 8347801 | https://www.ticketliquidator.com/tickets/8347801/U2-tickets-Sun-Jun-6-2027-Johan-Cruijff-Arena | - |
| tm-sam-fender-2027-cardiff-1adfz_4gklat6o4 | Sam Fender | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sam-fender-2027-edinburgh-1adbz_4gkm8ikcj | Sam Fender | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sam-fender-2027-london-1aegz_4gklv3o2e | Sam Fender | refresh (applied) | 8350153 | https://www.ticketliquidator.com/tickets/8350153/Sam-Fender-tickets-Thu-Sep-2-2027-Wembley-Stadium | - |
| tm-nickelback-2027-pokolbin-1avgz_4c70szdc8v | Nickelback | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bullet-for-my-valentine-2027-praha-9-z698xzu0z1kbijs_f | Bullet For My Valentine | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bullet-for-my-valentine-2027-forest-brussels-z698xzg2z1ku8c37e | Bullet For My Valentine | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bullet-for-my-valentine-2027-glasgow-1kuovpuoga5adth | Bullet For My Valentine | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bullet-for-my-valentine-2027-birmingham-1anzkfggkel7zmz | Bullet For My Valentine | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bullet-for-my-valentine-2027-london-16dfz_kqeg7loo3 | Bullet For My Valentine | refresh (applied) | 8297136 | https://www.ticketliquidator.com/tickets/8297136/Bullet-For-My-Valentine-tickets-Fri-Feb-26-2027-O2-Arena-London | - |
| tm-bullet-for-my-valentine-2027-manchester-g5vhz_kd3nkoq | Bullet For My Valentine | refresh (applied) | 8297688 | https://www.ticketliquidator.com/tickets/8297688/Bullet-For-My-Valentine-tickets-Sat-Feb-27-2027-AO-Arena | - |
| tm-jake-bugg-2027-manchester-g5vhz_owbzlwl | Jake Bugg | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jake-bugg-2027-dublin-1kkzvpk9ga1efx9 | Jake Bugg | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jake-bugg-2027-edinburgh-1auzkf-gkd9gf1d | Jake Bugg | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jake-bugg-2027-glasgow-1auzkf-gkeivv0q | Jake Bugg | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jake-bugg-2027-gateshead-11uyvpf_qopzvc | Jake Bugg | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jake-bugg-2027-liverpool-g5vhz_owwx56n | Jake Bugg | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jake-bugg-2027-bristol-1adjz_ogkvkgljy | Jake Bugg | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jake-bugg-2027-nottingham-g5vhz_ohmndtt | Jake Bugg | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jake-bugg-2027-london-g5vhz_olkluto | Jake Bugg | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jake-bugg-2027-london-g5vhz_olvuind | Jake Bugg | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jake-bugg-2027-london-g5vhz_ol9xkmo | Jake Bugg | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jake-bugg-2027-madrid-z698xz2qz1k_y8v-_ | Jake Bugg | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jake-bugg-2027-barcelona-z698xz2qz16vps_0bf | Jake Bugg | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jake-bugg-2027-milano-zg9rmiynyzd6ke | Jake Bugg | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jake-bugg-2027-amsterdam-z698xzbpz1k7936fe | Jake Bugg | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hollywood-undead-2027-praha-9-z698xzu0z16vcf4gue | Hollywood Undead | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hollywood-undead-2027-warsaw-z698xzqpz1kf0av8y | Hollywood Undead | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hollywood-undead-2027-johanneshov-z698xzq2z1kgnffx_ | Hollywood Undead | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hollywood-undead-2027-goteborg-z698xzq2z1k_fbiog | Hollywood Undead | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hollywood-undead-2027-k-benhavn-v-z698xzc4z1k_44ijf | Hollywood Undead | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hollywood-undead-2027-birmingham-g5dzz_k9em7do | Hollywood Undead | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hollywood-undead-2027-london-g5dzz_kxga-ng | Hollywood Undead | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hollywood-undead-2027-manchester-g5vhz_kjdvnwu | Hollywood Undead | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hollywood-undead-2027-glasgow-g5dzz_kpssdt2 | Hollywood Undead | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hollywood-undead-2027-leeds-g5dzz_krmlxyq | Hollywood Undead | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lord-huron-2026-nashville-z7r9jz1aazbfy | Lord Huron | refresh (applied) | 8181767 | https://www.ticketliquidator.com/tickets/8181767/Lord-Huron-tickets-Tue-Dec-1-2026-Ryman-Auditorium | - |
| tm-lord-huron-2026-cincinnati-17aov0g62ysdsyk | Lord Huron | refresh (applied) | 8180365 | https://www.ticketliquidator.com/tickets/8180365/Lord-Huron-tickets-Wed-Dec-2-2026-The-Andrew-J-Brady-ICON-Music-Center | - |
| tm-lord-huron-2026-detroit-z7r9jz1aazpf4 | Lord Huron | refresh (applied) | 8180367 | https://www.ticketliquidator.com/tickets/8180367/Lord-Huron-tickets-Sat-Dec-5-2026-Masonic-Temple-Theatre | - |
| tm-lord-huron-2026-grand-rapids-vvg1oz_2sbbhp3 | Lord Huron | refresh (applied) | 8180368 | https://www.ticketliquidator.com/tickets/8180368/Lord-Huron-tickets-Sun-Dec-6-2026-GLC-Live-at-20-Monroe | - |
| tm-lord-huron-2026-chicago-vvg1jz_2u-es7s | Lord Huron | refresh (applied) | 8180369 | https://www.ticketliquidator.com/tickets/8180369/Lord-Huron-tickets-Tue-Dec-8-2026-The-Chicago-Theatre | - |
| tm-lord-huron-2026-chicago-vvg1jz_2u-jk7l | Lord Huron | refresh (applied) | 8180370 | https://www.ticketliquidator.com/tickets/8180370/Lord-Huron-tickets-Wed-Dec-9-2026-The-Chicago-Theatre | - |
| tm-lord-huron-2026-albany-k7vgf_2d6r7wd | Lord Huron | refresh (applied) | 8180371 | https://www.ticketliquidator.com/tickets/8180371/Lord-Huron-tickets-Fri-Dec-11-2026-Palace-Theatre-Albany | - |
| tm-lord-huron-2026-philadelphia-vvg1fz_2mgblql | Lord Huron | refresh (applied) | 8180372 | https://www.ticketliquidator.com/tickets/8180372/Lord-Huron-tickets-Sat-Dec-12-2026-The-Met-Presented-by-Highmark | - |
| tm-lord-huron-2026-boston-vvg17z_2wsvfp- | Lord Huron | refresh (applied) | 8180373 | https://www.ticketliquidator.com/tickets/8180373/Lord-Huron-tickets-Sun-Dec-13-2026-MGM-Music-Hall-at-Fenway-Park | - |
| tm-lord-huron-2026-montreal-17g8v0g62wrdz3v | Lord Huron | refresh (applied) | 8180374 | https://www.ticketliquidator.com/tickets/8180374/Lord-Huron-tickets-Tue-Dec-15-2026-MTelus | - |
| tm-lord-huron-2026-montreal-17g8v0g62wr7i3a | Lord Huron | refresh (applied) | 8180375 | https://www.ticketliquidator.com/tickets/8180375/Lord-Huron-tickets-Wed-Dec-16-2026-MTelus | - |
| tm-lord-huron-2026-brooklyn-z7r9jz1aazpf3 | Lord Huron | refresh (applied) | 8180376 | https://www.ticketliquidator.com/tickets/8180376/Lord-Huron-tickets-Fri-Dec-18-2026-Kings-Theatre-NY | - |
| tm-lord-huron-2026-brooklyn-z7r9jz1aazbbi | Lord Huron | refresh (applied) | 8180377 | https://www.ticketliquidator.com/tickets/8180377/Lord-Huron-tickets-Sat-Dec-19-2026-Kings-Theatre-NY | - |
| tm-lord-huron-2027-sacramento-g5vyz_2wpd5xx | Lord Huron | refresh (applied) | 8180378 | https://www.ticketliquidator.com/tickets/8180378/Lord-Huron-tickets-Fri-Jan-1-2027-Channel-24 | - |
| tm-lord-huron-2027-las-vegas-z7r9jz1aazbo8 | Lord Huron | refresh (applied) | 8180380 | https://www.ticketliquidator.com/tickets/8180380/Lord-Huron-tickets-Sat-Jan-2-2027-The-Theater-at-Virgin-Hotels-Las-Vegas | - |
| tm-lord-huron-2027-oakland-g5vyz_2mrsp3q | Lord Huron | refresh (applied) | 8180382 | https://www.ticketliquidator.com/tickets/8180382/Lord-Huron-tickets-Sun-Jan-3-2027-Fox-Theater-Oakland | - |
| tm-lord-huron-2027-vancouver-1778v0g62bp9vz3 | Lord Huron | refresh (applied) | 8180385 | https://www.ticketliquidator.com/tickets/8180385/Lord-Huron-tickets-Tue-Jan-5-2027-Orpheum-Theatre-Vancouver | - |
| tm-lord-huron-2027-vancouver-1778v0g62bpn7yz | Lord Huron | refresh (applied) | 8180387 | https://www.ticketliquidator.com/tickets/8180387/Lord-Huron-tickets-Wed-Jan-6-2027-Orpheum-Theatre-Vancouver | - |
| tm-lord-huron-2027-seattle-vvg1hz_2t-gnc5 | Lord Huron | refresh (applied) | 8180388 | https://www.ticketliquidator.com/tickets/8180388/Lord-Huron-tickets-Thu-Jan-7-2027-Paramount-Theatre-Seattle | - |
| tm-lord-huron-2027-seattle-vvg1hz_2t-uscj | Lord Huron | refresh (applied) | 8180389 | https://www.ticketliquidator.com/tickets/8180389/Lord-Huron-tickets-Fri-Jan-8-2027-Paramount-Theatre-Seattle | - |
| tm-lord-huron-2027-los-angeles-vvg10z_2ug7bzu | Lord Huron | refresh (applied) | 8180391 | https://www.ticketliquidator.com/tickets/8180391/Lord-Huron-tickets-Sun-Jan-10-2027-The-Wiltern | - |
| tm-lord-huron-2027-los-angeles-vvg10z_2ugkfzf | Lord Huron | refresh (applied) | 8180392 | https://www.ticketliquidator.com/tickets/8180392/Lord-Huron-tickets-Mon-Jan-11-2027-The-Wiltern | - |
| tm-lord-huron-2027-los-angeles-vvg10z_2d_gilx | Lord Huron | refresh (applied) | 8196845 | https://www.ticketliquidator.com/tickets/8196845/Lord-Huron-tickets-Tue-Jan-12-2027-The-Wiltern | - |
| tm-remi-wolf-2027-washington-1a4zk46gketspla | Remi Wolf | refresh (applied) | 8315064 | https://www.ticketliquidator.com/tickets/8315064/Remi-Wolf-tickets-Tue-Feb-23-2027-The-Anthem-DC | - |
| tm-remi-wolf-2027-philadelphia-vv1aovpotga2njys | Remi Wolf | refresh (applied) | 8315065 | https://www.ticketliquidator.com/tickets/8315065/Remi-Wolf-tickets-Fri-Feb-26-2027-The-Met-Presented-by-Highmark | - |
| tm-remi-wolf-2027-new-york-g5dyz_fqhrymh | Remi Wolf | refresh (applied) | 8315066 | https://www.ticketliquidator.com/tickets/8315066/Remi-Wolf-tickets-Sat-Feb-27-2027-Radio-City-Music-Hall | - |
| tm-remi-wolf-2027-boston-vv1avzk4kgkdrztka | Remi Wolf | refresh (applied) | 8315068 | https://www.ticketliquidator.com/tickets/8315068/Remi-Wolf-tickets-Tue-Mar-2-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-remi-wolf-2027-boston-vv1avzk4kgkdrwrfa | Remi Wolf | refresh (applied) | 8325850 | https://www.ticketliquidator.com/tickets/8325850/Remi-Wolf-tickets-Wed-Mar-3-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-remi-wolf-2027-toronto-1a8zk46gkdlbbff | Remi Wolf | none | - | - | no qualifying listing (complete catalog checked) |
| tm-remi-wolf-2027-toronto-1a8zk46gkdlbzfe | Remi Wolf | none | - | - | no qualifying listing (complete catalog checked) |
| tm-remi-wolf-2027-detroit-z7r9jz1aa7k0m | Remi Wolf | refresh (applied) | 8315229 | https://www.ticketliquidator.com/tickets/8315229/Remi-Wolf-tickets-Sun-Mar-7-2027-Masonic-Temple-Theatre | - |
| tm-remi-wolf-2027-chicago-vv1a7zk4fgkdb7-a0 | Remi Wolf | refresh (applied) | 8315069 | https://www.ticketliquidator.com/tickets/8315069/Remi-Wolf-tickets-Tue-Mar-9-2027-The-Salt-Shed-Indoors-Chicago | - |
| tm-remi-wolf-2027-chicago-vv1a7zk4fgkdbs-1k | Remi Wolf | refresh (applied) | 8326055 | https://www.ticketliquidator.com/tickets/8326055/Remi-Wolf-tickets-Wed-Mar-10-2027-The-Salt-Shed-Indoors-Chicago | - |
| tm-remi-wolf-2027-minneapolis-vv1akzk46gkdn_2lp | Remi Wolf | refresh (applied) | 8315071 | https://www.ticketliquidator.com/tickets/8315071/Remi-Wolf-tickets-Fri-Mar-12-2027-The-Armory-Minneapolis | - |
| tm-remi-wolf-2027-milwaukee-vv1a6zk4kgkei14ha | Remi Wolf | refresh (applied) | 8315072 | https://www.ticketliquidator.com/tickets/8315072/Remi-Wolf-tickets-Sat-Mar-13-2027-Landmark-Credit-Union-Live | - |
| tm-remi-wolf-2027-saint-louis-16-zk46uyzag1a76 | Remi Wolf | refresh (applied) | 8315073 | https://www.ticketliquidator.com/tickets/8315073/Remi-Wolf-tickets-Tue-Mar-16-2027-The-Factory-Chesterfield | - |
| tm-remi-wolf-2027-cincinnati-1kaovpo_gagbfxb | Remi Wolf | refresh (applied) | 8315076 | https://www.ticketliquidator.com/tickets/8315076/Remi-Wolf-tickets-Wed-Mar-17-2027-The-Andrew-J-Brady-ICON-Music-Center | - |
| tm-remi-wolf-2027-nashville-g5viz_fni20_x | Remi Wolf | refresh (applied) | 8315079 | https://www.ticketliquidator.com/tickets/8315079/Remi-Wolf-tickets-Fri-Mar-19-2027-The-Truth | - |
| tm-remi-wolf-2027-atlanta-vvg1zz_fj5-2nn | Remi Wolf | refresh (applied) | 8315080 | https://www.ticketliquidator.com/tickets/8315080/Remi-Wolf-tickets-Sat-Mar-20-2027-Coca-Cola-Roxy | - |
| tm-remi-wolf-2027-austin-g5diz_fncgjpo | Remi Wolf | refresh (applied) | 8315230 | https://www.ticketliquidator.com/tickets/8315230/Remi-Wolf-tickets-Thu-May-6-2027-Moody-Amphitheater | - |
| tm-remi-wolf-2027-houston-g5diz_f9ubux3 | Remi Wolf | refresh (applied) | 8315081 | https://www.ticketliquidator.com/tickets/8315081/Remi-Wolf-tickets-Fri-May-7-2027-713-Music-Hall | - |
| tm-remi-wolf-2027-irving-vvg1yz_frdgzb6 | Remi Wolf | refresh (applied) | 8315082 | https://www.ticketliquidator.com/tickets/8315082/Remi-Wolf-tickets-Sat-May-8-2027-The-Pavilion-at-Toyota-Music-Factory | - |
| tm-remi-wolf-2027-tulsa-z7r9jz1aa7ar_ | Remi Wolf | refresh (applied) | 8315231 | https://www.ticketliquidator.com/tickets/8315231/Remi-Wolf-tickets-Mon-May-10-2027-Cains-Ballroom | - |
| tm-remi-wolf-2027-kansas-city-z7r9jz1aa7kjk | Remi Wolf | refresh (applied) | 8315232 | https://www.ticketliquidator.com/tickets/8315232/Remi-Wolf-tickets-Tue-May-11-2027-The-Midland-Theatre-MO | - |
| tm-remi-wolf-2027-west-des-moines-z7r9jz1aa7aj7 | Remi Wolf | refresh (applied) | 8315233 | https://www.ticketliquidator.com/tickets/8315233/Remi-Wolf-tickets-Wed-May-12-2027-Val-Air-Ballroom | - |
| tm-remi-wolf-2027-morrison-z7r9jz1aa7kap | Remi Wolf | refresh (applied) | 8315032 | https://www.ticketliquidator.com/tickets/8315032/Remi-Wolf-tickets-Sun-May-16-2027-Red-Rocks-Amphitheatre | - |
| tm-remi-wolf-2027-bonner-g5vzz_flaijvz | Remi Wolf | refresh (applied) | 8315083 | https://www.ticketliquidator.com/tickets/8315083/Remi-Wolf-tickets-Wed-May-19-2027-KettleHouse-Amphitheater | - |
| tm-remi-wolf-2027-vancouver-z7r9jz1aa7kaf | Remi Wolf | refresh (applied) | 8315400 | https://www.ticketliquidator.com/tickets/8315400/Remi-Wolf-tickets-Fri-May-21-2027-PNE-Forum | - |
| tm-remi-wolf-2027-seattle-vvg1hz_fqhwypl | Remi Wolf | refresh (applied) | 8315084 | https://www.ticketliquidator.com/tickets/8315084/Remi-Wolf-tickets-Sat-May-22-2027-Wamu-Theater-At-Lumen-Field-Event-Center | - |
| tm-air-supply-2026-auckland-17azv0g65rxws3q | Air Supply | refresh (applied) | 8204003 | https://www.ticketliquidator.com/tickets/8204003/Air-Supply-tickets-Tue-Dec-15-2026-Auckland-Civic-Theatre | - |
| tm-air-supply-2027-fort-pierce-vvg1vz_8hv66ia | Air Supply | refresh (applied) | 8199121 | https://www.ticketliquidator.com/tickets/8199121/Air-Supply-tickets-Thu-Jan-21-2027-Sunrise-Theatre-FL | - |
| tm-air-supply-2027-daytona-beach-z7r9jz1a7pozg | Air Supply | refresh (applied) | 8056799 | https://www.ticketliquidator.com/tickets/8056799/Air-Supply-tickets-Fri-Jan-22-2027-Peabody-Auditorium | - |
| tm-air-supply-2027-sarasota-z7r9jz1a7p_4p | Air Supply | refresh (applied) | 8062550 | https://www.ticketliquidator.com/tickets/8062550/Air-Supply-tickets-Sun-Jan-24-2027-Van-Wezel-Performing-Arts-Hall | - |
| tm-air-supply-2027-hollywood-vvg1vz_3t_jrbe | Air Supply | refresh (applied) | 8293949 | https://www.ticketliquidator.com/tickets/8293949/Air-Supply-tickets-Fri-Jan-29-2027-Hard-Rock-Live-At-The-Seminole-Hard-Rock-Hotel-Casino-Hollywood | - |
| tm-air-supply-2027-immokalee-vvg1vz_2x6gs2d | Air Supply | refresh (applied) | 8184590 | https://www.ticketliquidator.com/tickets/8184590/Air-Supply-tickets-Sat-Jan-30-2027-Seminole-Casino-Center-Immokalee | - |
| tm-air-supply-2027-rockford-17f8v0g62es30d4 | Air Supply | refresh (applied) | 8193701 | https://www.ticketliquidator.com/tickets/8193701/Air-Supply-tickets-Fri-Feb-5-2027-Hard-Rock-Live-Rockford | - |
| tm-air-supply-2027-wisconsin-dells-z7r9jz1a7x_ez | Air Supply | refresh (applied) | 7902369 | https://www.ticketliquidator.com/tickets/7902369/Air-Supply-tickets-Sat-Feb-6-2027-Crystal-Grand-Music-Theatre | - |
| tm-air-supply-2027-waukegan-vvg1jz_ce-oddx | Air Supply | refresh (applied) | 8231497 | https://www.ticketliquidator.com/tickets/8231497/Air-Supply-tickets-Sun-Feb-7-2027-Genesee-Theatre | - |
| tm-air-supply-2027-rancho-mirage-vv1aazkffgkd9xjwx | Air Supply | refresh (applied) | 8238782 | https://www.ticketliquidator.com/tickets/8238782/Air-Supply-tickets-Sat-Feb-13-2027-The-Show-Agua-Caliente-Casino | - |
| tm-air-supply-2027-abbotsford-1k78vp18gau9wma | Air Supply | refresh (applied) | 8274264 | https://www.ticketliquidator.com/tickets/8274264/Air-Supply-tickets-Thu-Feb-18-2027-Rogers-Forum | - |
| tm-air-supply-2027-dawson-creek-z7r9jz1aavmfk | Air Supply | none | - | - | no qualifying listing (complete catalog checked) |
| tm-air-supply-2027-calgary-1aozkf0gkev7qvg | Air Supply | refresh (applied) | 8274111 | https://www.ticketliquidator.com/tickets/8274111/Air-Supply-tickets-Wed-Feb-24-2027-Grey-Eagle-Resort-Casino | - |
| tm-air-supply-2027-moose-jaw-z7r9jz1aavsx4 | Air Supply | refresh (applied) | 8366579 | https://www.ticketliquidator.com/tickets/8366579/Air-Supply-tickets-Fri-Feb-26-2027-Temple-Gardens-Centre | - |
| tm-air-supply-2027-winnipeg-1aozkftgkdfjy5c | Air Supply | refresh (applied) | 8274110 | https://www.ticketliquidator.com/tickets/8274110/Air-Supply-tickets-Sun-Feb-28-2027-Canada-Life-Centre | - |
| tm-air-supply-2027-ottawa-1ad7z_3gksa1dub | Air Supply | none | - | - | no qualifying listing (complete catalog checked) |
| tm-air-supply-2027-rama-1avzz_3gkn3a6sv | Air Supply | none | - | - | no qualifying listing (complete catalog checked) |
| tm-air-supply-2027-toronto-1avzz_3gkws1scj | Air Supply | none | - | - | no qualifying listing (complete catalog checked) |
| tm-air-supply-2027-windsor-1avzz_3gki_rnez | Air Supply | none | - | - | no qualifying listing (complete catalog checked) |
| tm-air-supply-2027-saint-louis-vv1akzkftgkdvwrkv | Air Supply | refresh (applied) | 8311194 | https://www.ticketliquidator.com/tickets/8311194/Air-Supply-tickets-Sun-May-23-2027-River-City-Casino | - |
| tm-foreigner-2027-daytona-beach-z7r9jz1aaedca | Foreigner | refresh (applied) | 8231518 | https://www.ticketliquidator.com/tickets/8231518/Foreigner-tickets-Mon-Feb-15-2027-Peabody-Auditorium | - |
| tm-foreigner-2027-pompano-beach-z7r9jz1aav6fn | Foreigner | refresh (applied) | 8237209 | https://www.ticketliquidator.com/tickets/8237209/Foreigner-tickets-Fri-Feb-19-2027-Pompano-Beach-Amphitheatre | - |
| tm-foreigner-2027-monterrey-1av8zbygkudzz0k | Foreigner | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch, venue mismatch; listing: FJ - A Tribute To Foreigner and Journey; text: FJ - A Tribute To Foreigner and Journey FJ - A Tribute To Foreigner and Journey /tickets/8386703/FJ-A-Tribute-To-Foreigner-and-Journey-ticke) |
| tm-foreigner-2027-zapopan-1afzk3ogkd3htid | Foreigner | none | - | - | no qualifying listing (complete catalog checked) |
| tm-foreigner-2027-ciudad-de-mexico-g5dvz_8xzavz- | Foreigner | none | - | - | no qualifying listing (complete catalog checked) |
| tm-foreigner-2027-las-vegas-1avjz_kgkurynka | Foreigner | refresh (applied) | 8342824 | https://www.ticketliquidator.com/tickets/8342824/Foreigner-tickets-Wed-Mar-10-2027-Venetian-Theatre-At-the-Venetian-Hotel-Las-Vegas | - |
| tm-foreigner-2027-las-vegas-1avjz_kgkursnk8 | Foreigner | refresh (applied) | 8342825 | https://www.ticketliquidator.com/tickets/8342825/Foreigner-tickets-Fri-Mar-12-2027-Venetian-Theatre-At-the-Venetian-Hotel-Las-Vegas | - |
| tm-foreigner-2027-las-vegas-1avjz_kgkurwnkf | Foreigner | refresh (applied) | 8342826 | https://www.ticketliquidator.com/tickets/8342826/Foreigner-tickets-Sat-Mar-13-2027-Venetian-Theatre-At-the-Venetian-Hotel-Las-Vegas | - |
| tm-foreigner-2027-las-vegas-1avjz_kgkursnk_ | Foreigner | refresh (applied) | 8342827 | https://www.ticketliquidator.com/tickets/8342827/Foreigner-tickets-Wed-Mar-17-2027-Venetian-Theatre-At-the-Venetian-Hotel-Las-Vegas | - |
| tm-foreigner-2027-las-vegas-1avjz_kgkurvnkq | Foreigner | refresh (applied) | 8342828 | https://www.ticketliquidator.com/tickets/8342828/Foreigner-tickets-Fri-Mar-19-2027-Venetian-Theatre-At-the-Venetian-Hotel-Las-Vegas | - |
| tm-foreigner-2027-las-vegas-1avjz_kgkurgbki | Foreigner | refresh (applied) | 8342829 | https://www.ticketliquidator.com/tickets/8342829/Foreigner-tickets-Sat-Mar-20-2027-Venetian-Theatre-At-the-Venetian-Hotel-Las-Vegas | - |
| tm-foreigner-2027-dublin-1kkzvpv9gacwy1_ | Foreigner | none | - | - | no qualifying listing (complete catalog checked) |
| tm-foreigner-2027-london-16djz_37gg7hhxi | Foreigner | refresh (applied) | 8324848 | https://www.ticketliquidator.com/tickets/8324848/Foreigner-tickets-Wed-Apr-14-2027-London-Palladium | - |
| tm-foreigner-2027-new-york-g5diz_oohwwkw | Foreigner | refresh (applied) | 8243091 | https://www.ticketliquidator.com/tickets/8243091/Foreigner-tickets-Tue-Apr-27-2027-Beacon-Theatre-NY | - |
| tm-foreigner-2027-montclair-vv1aezkf_gkded4lx | Foreigner | refresh (applied) | 8243092 | https://www.ticketliquidator.com/tickets/8243092/Foreigner-tickets-Wed-Apr-28-2027-Wellmont-Theatre | - |
| tm-foreigner-2027-port-chester-g5vvz_ony3-go | Foreigner | refresh (applied) | 8243093 | https://www.ticketliquidator.com/tickets/8243093/Foreigner-tickets-Fri-Apr-30-2027-Capitol-Theatre-Port-Chester | - |
| tm-foreigner-2027-westbury-k7vgf_ocs3r5v | Foreigner | refresh (applied) | 8243094 | https://www.ticketliquidator.com/tickets/8243094/Foreigner-tickets-Sun-May-2-2027-Westbury-Music-Fair | - |
| tm-foreigner-2027-milwaukee-vv1a6zk4agkd5heh6 | Foreigner | refresh (applied) | 8318453 | https://www.ticketliquidator.com/tickets/8318453/Foreigner-tickets-Fri-Jul-2-2027-BMO-Pavilion | - |
| tm-post-malone-2027-salt-lake-city-z7r9jz1aa7skb | Post Malone | refresh (applied) | 8347901 | https://www.ticketliquidator.com/tickets/8347901/New-Years-Eve-Festival-tickets-Thu-Dec-31-2026-Delta-Center | - |
| tm-death-cab-for-cutie-2027-morrison-z7r9jz1aa7sqe | Death Cab for Cutie | refresh (applied) | 8338609 | https://www.ticketliquidator.com/tickets/8338609/Death-Cab-for-Cutie-tickets-Thu-Jul-8-2027-Red-Rocks-Amphitheatre | - |
| tm-dinosaur-jr-2027-saint-petersburg-z7r9jz1aavk16 | Dinosaur Jr. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-too-many-zooz-2027-oklahoma-city-z7r9jz1aaee-e | Too Many Zooz | refresh (applied) | 8284743 | https://www.ticketliquidator.com/tickets/8284743/Too-Many-Zooz-tickets-Mon-May-3-2027-Beer-City-Music-Hall | - |
| tm-the-neighbourhood-2027-houston-z7r9jz1aa7ypb | The Neighbourhood | refresh (applied) | 8345904 | https://www.ticketliquidator.com/tickets/8345904/The-Neighbourhood-tickets-Sat-Mar-6-2027-Toyota-Center-TX | - |
| tm-interpol-2027-san-antonio-z7r9jz1aa70ja | Interpol | refresh (applied) | 8338175 | https://www.ticketliquidator.com/tickets/8338175/Interpol-tickets-Thu-Mar-18-2027-The-Espee-St-Paul-Square | - |
| tm-interpol-2027-sayreville-z7r9jz1aa70_y | Interpol | refresh (applied) | 8338177 | https://www.ticketliquidator.com/tickets/8338177/Interpol-tickets-Sat-Mar-27-2027-Starland-Ballroom | - |
| tm-two-door-cinema-club-2027-chicago-z7r9jz1aa7p88 | Two Door Cinema Club | refresh (applied) | 8338945 | https://www.ticketliquidator.com/tickets/8338945/Two-Door-Cinema-Club-tickets-Thu-May-6-2027-Riviera-Theatre-IL | - |
| tm-two-door-cinema-club-2027-st-paul-z7r9jz1aa7p8o | Two Door Cinema Club | refresh (applied) | 8338946 | https://www.ticketliquidator.com/tickets/8338946/Two-Door-Cinema-Club-tickets-Sun-May-9-2027-The-Palace-Theatre-St-Paul | - |
| tm-two-door-cinema-club-2027-morrison-z7r9jz1aa7p83 | Two Door Cinema Club | refresh (applied) | 8338675 | https://www.ticketliquidator.com/tickets/8338675/Two-Door-Cinema-Club-tickets-Tue-May-11-2027-Red-Rocks-Amphitheatre | - |
| tm-two-door-cinema-club-2027-austin-z7r9jz1aa7p8f | Two Door Cinema Club | refresh (applied) | 8338948 | https://www.ticketliquidator.com/tickets/8338948/Two-Door-Cinema-Club-tickets-Thu-May-27-2027-United-Heritage-Hall | - |
| tm-two-door-cinema-club-2027-dallas-z7r9jz1aa7p84 | Two Door Cinema Club | refresh (applied) | 8338949 | https://www.ticketliquidator.com/tickets/8338949/Two-Door-Cinema-Club-tickets-Sat-May-29-2027-The-Bomb-Factory | - |
| tm-tash-sultana-2027-dublin-1abzkgkgkdrrzgx | Tash Sultana | refresh (applied) | 8324659 | https://www.ticketliquidator.com/tickets/8324659/Tash-Sultana-tickets-Thu-Mar-11-2027-3Arena-Dublin | - |
| tm-tash-sultana-2027-london-1adjzbsgkmupg8h | Tash Sultana | refresh (applied) | 7771601 | https://www.ticketliquidator.com/tickets/7771601/Tash-Sultana-tickets-Sat-Mar-13-2027-OVO-Arena-Wembley | - |
| tm-tash-sultana-2027-merksem-antwerpen-z698xzg2z1kjpqofb | Tash Sultana | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tash-sultana-2027-amsterdam-z698xzbpz16vawaob0 | Tash Sultana | refresh (applied) | 8315153 | https://www.ticketliquidator.com/tickets/8315153/Tash-Sultana-tickets-Fri-Mar-26-2027-Ziggo-Dome | - |
| tm-tash-sultana-2027-auckland-1a0zkfggkee4ejk | Tash Sultana | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tash-sultana-2027-auckland-1kazvpgigacnerq | Tash Sultana | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tash-sultana-2027-thirroul-1akzkfggkdlsqdl | Tash Sultana | none | - | - | no qualifying listing (complete catalog checked) |
| tm-erasure-2027-cardiff-1auzkfzgkecfur5 | Erasure | none | - | - | no qualifying listing (complete catalog checked) |
| tm-erasure-2027-bournemouth-15dbz_kx7jxjo | Erasure | none | - | - | no qualifying listing (complete catalog checked) |
| tm-erasure-2027-liverpool-1amzkfugkdiq68r | Erasure | none | - | - | no qualifying listing (complete catalog checked) |
| tm-erasure-2027-birmingham-1anzkfzgkdmiv17 | Erasure | none | - | - | no qualifying listing (complete catalog checked) |
| tm-erasure-2027-manchester-g5vhz_k6qxkzy | Erasure | none | - | - | no qualifying listing (complete catalog checked) |
| tm-erasure-2027-dublin-15voz_kqav4z0 | Erasure | none | - | - | no qualifying listing (complete catalog checked) |
| tm-erasure-2027-nottingham-1agzkfmgkd2kzuu | Erasure | none | - | - | no qualifying listing (complete catalog checked) |
| tm-erasure-2027-hull-1auzkfygkey3bob | Erasure | none | - | - | no qualifying listing (complete catalog checked) |
| tm-erasure-2027-leeds-g5vhz_kldd9ue | Erasure | none | - | - | no qualifying listing (complete catalog checked) |
| tm-erasure-2027-glasgow-1auzkfzgkds5h6i | Erasure | none | - | - | no qualifying listing (complete catalog checked) |
| tm-erasure-2027-brighton-g5dzz_kwfhs5r | Erasure | none | - | - | no qualifying listing (complete catalog checked) |
| tm-erasure-2027-london-1agzkfmgkdxoix5 | Erasure | none | - | - | no qualifying listing (complete catalog checked) |
| tm-theory-of-a-deadman-2027-nottingham-g5vhz_1u0tvak | Theory Of A Deadman | none | - | - | no qualifying listing (complete catalog checked) |
| tm-theory-of-a-deadman-2027-glasgow-17uov0g61uju3tk | Theory Of A Deadman | none | - | - | no qualifying listing (complete catalog checked) |
| tm-theory-of-a-deadman-2027-manchester-g5dzz_1mez0ds | Theory Of A Deadman | none | - | - | no qualifying listing (complete catalog checked) |
| tm-theory-of-a-deadman-2027-london-g5dzz_1tbseag | Theory Of A Deadman | none | - | - | no qualifying listing (complete catalog checked) |
| tm-theory-of-a-deadman-2027-amsterdam-z698xzbpz16vffqn4a | Theory Of A Deadman | none | - | - | no qualifying listing (complete catalog checked) |
| tm-theory-of-a-deadman-2027-halifax-z7r9jz1aav0ak | Theory Of A Deadman | refresh (applied) | 8255029 | https://www.ticketliquidator.com/tickets/8255029/Theory-Of-A-Deadman-tickets-Fri-Mar-5-2027-Light-House-Arts-Centre | - |
| tm-theory-of-a-deadman-2027-moncton-16d7z_31_g7xauw | Theory Of A Deadman | refresh (applied) | 8254012 | https://www.ticketliquidator.com/tickets/8254012/Theory-Of-A-Deadman-tickets-Sat-Mar-6-2027-Molson-Canadian-Centre-at-Casino-New-Brunswick | - |
| tm-theory-of-a-deadman-2027-quebec-1aszkf04if8zegk | Theory Of A Deadman | refresh (applied) | 8254013 | https://www.ticketliquidator.com/tickets/8254013/Theory-Of-A-Deadman-tickets-Mon-Mar-8-2027-Le-Theatre-Capitole | - |
| tm-theory-of-a-deadman-2027-montreal-1aszkfxgkerzpy6 | Theory Of A Deadman | refresh (applied) | 8254014 | https://www.ticketliquidator.com/tickets/8254014/Theory-Of-A-Deadman-tickets-Tue-Mar-9-2027-MTelus | - |
| tm-theory-of-a-deadman-2027-ottawa-1aszkfngkedu_z0 | Theory Of A Deadman | none | - | - | no qualifying listing (complete catalog checked) |
| tm-theory-of-a-deadman-2027-rama-1a8zkfngkeitbvf | Theory Of A Deadman | none | - | - | no qualifying listing (complete catalog checked) |
| tm-theory-of-a-deadman-2027-toronto-1a8zkfngked-56c | Theory Of A Deadman | none | - | - | no qualifying listing (complete catalog checked) |
| tm-theory-of-a-deadman-2027-windsor-1avzz_ogktpe4kz | Theory Of A Deadman | none | - | - | no qualifying listing (complete catalog checked) |
| tm-theory-of-a-deadman-2027-thunder-bay-1avzz_ogkrpopru | Theory Of A Deadman | none | - | - | no qualifying listing (complete catalog checked) |
| tm-theory-of-a-deadman-2027-winnipeg-1av7z_ogkxutibu | Theory Of A Deadman | refresh (applied) | 8254020 | https://www.ticketliquidator.com/tickets/8254020/Theory-Of-A-Deadman-tickets-Sat-Mar-20-2027-Burton-Cummings-Theatre | - |
| tm-theory-of-a-deadman-2027-regina-z7r9jz1aavxpg | Theory Of A Deadman | refresh (applied) | 8255473 | https://www.ticketliquidator.com/tickets/8255473/Theory-Of-A-Deadman-tickets-Mon-Mar-22-2027-Conexus-Arts-Centre | - |
| tm-theory-of-a-deadman-2027-enoch-1aozkfngkdgjwil | Theory Of A Deadman | refresh (applied) | 8254021 | https://www.ticketliquidator.com/tickets/8254021/Theory-Of-A-Deadman-tickets-Wed-Mar-24-2027-River-Cree-Casino | - |
| tm-theory-of-a-deadman-2027-calgary-1av7z_ogkn_kbte | Theory Of A Deadman | refresh (applied) | 8254022 | https://www.ticketliquidator.com/tickets/8254022/Theory-Of-A-Deadman-tickets-Thu-Mar-25-2027-Southern-Alberta-Jubilee-Auditorium | - |
| tm-theory-of-a-deadman-2027-dawson-creek-z7r9jz1aavxjp | Theory Of A Deadman | none | - | - | no qualifying listing (complete catalog checked) |
| tm-theory-of-a-deadman-2027-vancouver-1av7z_ogknc7mrb | Theory Of A Deadman | refresh (applied) | 8254023 | https://www.ticketliquidator.com/tickets/8254023/Theory-Of-A-Deadman-tickets-Wed-Mar-31-2027-Queen-Elizabeth-Theatre-Vancouver | - |
| tm-black-stone-cherry-2026-lexington-1avbz_kgklcscxl | Black Stone Cherry | refresh (applied) | 8294989 | https://www.ticketliquidator.com/tickets/8294989/Black-Stone-Cherry-tickets-Fri-Nov-27-2026-Manchester-Music-Hall | - |
| tm-black-stone-cherry-2026-toronto-16tzkfzkozagevde | Black Stone Cherry | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch, venue mismatch; listing: Black Stone Cherry; text: Black Stone Cherry Black Stone Cherry /tickets/8294999/Black-Stone-Cherry-tickets-Sat-Dec-5-2026-Webster-Underground Black Stone Cherry Blac) |
| tm-black-stone-cherry-2026-hartford-z7r9jz1aaea0z | Black Stone Cherry | refresh (applied) | 8294999 | https://www.ticketliquidator.com/tickets/8294999/Black-Stone-Cherry-tickets-Sat-Dec-5-2026-Webster-Underground | - |
| tm-black-stone-cherry-2026-columbus-z7r9jz1aae7be | Black Stone Cherry | refresh (applied) | 8295002 | https://www.ticketliquidator.com/tickets/8295002/Black-Stone-Cherry-tickets-Sat-Dec-12-2026-The-King-of-Clubs-Columbus | - |
| tm-black-stone-cherry-2027-bournemouth-g5dzz_g9ioeuq | Black Stone Cherry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-black-stone-cherry-2027-london-g5dzzbzpu7g4_ | Black Stone Cherry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-black-stone-cherry-2027-london-g5dzzbz9kujcl | Black Stone Cherry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-black-stone-cherry-2027-margate-16dfzbzp7g7r7jo | Black Stone Cherry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-black-stone-cherry-2027-nottingham-g5vhzbzpq5krb | Black Stone Cherry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-black-stone-cherry-2027-manchester-g5vhzbzkgpts1 | Black Stone Cherry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-black-stone-cherry-2027-norwich-g5vhzbzpkx4ut | Black Stone Cherry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-black-stone-cherry-2027-edinburgh-g5dzzbzk-605z | Black Stone Cherry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-black-stone-cherry-2027-aberdeen-1auzkcagkdnsiac | Black Stone Cherry | refresh (applied) | 7779272 | https://www.ticketliquidator.com/tickets/7779272/Black-Stone-Cherry-tickets-Mon-Feb-8-2027-Aberdeen-Music-Hall | - |
| tm-black-stone-cherry-2027-newcastle-upon-tyne-g5dzz_g10kk11 | Black Stone Cherry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-black-stone-cherry-2027-belfast-1kczvno9gacmss6 | Black Stone Cherry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-black-stone-cherry-2027-dublin-1avozbmgkwn1n87 | Black Stone Cherry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-black-stone-cherry-2027-cork-1avozbzgklkguax | Black Stone Cherry | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-avett-brothers-2027-asheville-g5evz_38pztce | The Avett Brothers | refresh (applied) | 8270729 | https://www.ticketliquidator.com/tickets/8270729/The-Avett-Brothers-tickets-Thu-Dec-31-2026-ExploreAshevillecom-Arena-at-Harrahs-Cherokee-Center | - |
| tm-kings-of-leon-2027-auckland-1kazvpfagago3z7 | Kings Of Leon | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kings-of-leon-2027-bowen-hills-1avgz_fgkxy2l3h | Kings Of Leon | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kings-of-leon-2027-flemington-1aefz_fgkxtcmb- | Kings Of Leon | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kings-of-leon-2027-hamburg-z698xzc2z1kjifpz9 | Kings Of Leon | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kings-of-leon-2027-dublin-1avoz_fgktpkxi7 | Kings Of Leon | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kings-of-leon-2027-scarborough-1agzk4fgke0iell | Kings Of Leon | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kings-of-leon-2027-london-1agzk4egkesvn16 | Kings Of Leon | refresh (applied) | 8314670 | https://www.ticketliquidator.com/tickets/8314670/Kings-Of-Leon-tickets-Fri-Jul-2-2027-O2-Arena-London | - |
| tm-kings-of-leon-2027-london-1agzk4egkdt5lpe | Kings Of Leon | refresh (applied) | 8314671 | https://www.ticketliquidator.com/tickets/8314671/Kings-Of-Leon-tickets-Sat-Jul-3-2027-O2-Arena-London | - |
| tm-lady-a-2026-northfield-vvg1fz_gkaw2vw | Lady A | refresh (applied) | 8034628 | https://www.ticketliquidator.com/tickets/8034628/Lady-A-Country-Group-tickets-Thu-Dec-10-2026-Northfield-Park-Racino-Center-Stage | - |
| tm-lady-a-2026-gary-vvg1fz_5la2nke | Lady A | refresh (applied) | 8034630 | https://www.ticketliquidator.com/tickets/8034630/Lady-A-Country-Group-tickets-Fri-Dec-11-2026-Hard-Rock-Live-Northern-Indiana | - |
| tm-lady-a-2026-shipshewana-z7r9jz1a7pkv6 | Lady A | refresh (applied) | 8034030 | https://www.ticketliquidator.com/tickets/8034030/Lady-A-Country-Group-tickets-Sat-Dec-12-2026-Blue-Gate-Performing-Arts-Center | - |
| tm-lady-a-2026-new-york-g5diz_g2zkgbb | Lady A | refresh (applied) | 8034631 | https://www.ticketliquidator.com/tickets/8034631/Lady-A-Country-Group-tickets-Thu-Dec-17-2026-Beacon-Theatre-NY | - |
| tm-lady-a-2026-bensalem-z7r9jz1a7p380 | Lady A | refresh (applied) | 8042192 | https://www.ticketliquidator.com/tickets/8042192/Lady-A-Country-Group-tickets-Fri-Dec-18-2026-Xcite-Center-At-Parx-Casino-and-Racing | - |
| tm-lady-a-2026-greensboro-g5evz_g5lge4i | Lady A | refresh (applied) | 8034632 | https://www.ticketliquidator.com/tickets/8034632/Lady-A-Country-Group-tickets-Sat-Dec-19-2026-Steven-Tanger-Center-for-the-Performing-Arts | - |
| tm-lady-a-2026-nashville-z7r9jz1a7p0p9 | Lady A | correct (applied) | 8034649 | https://www.ticketliquidator.com/tickets/8034649/Lady-A-Country-Group-tickets-Mon-Dec-21-2026-Ryman-Auditorium | - |
| tm-jason-aldean-2027-hollywood-vvg1vz_4r1id24 | Jason Aldean | refresh (applied) | 8341789 | https://www.ticketliquidator.com/tickets/8341789/Jason-Aldean-tickets-Sat-Feb-27-2027-Hard-Rock-Live-At-The-Seminole-Hard-Rock-Hotel-Casino-Hollywood | - |
| tm-mariah-carey-2026-birmingham-1anzkfsgkdvieos | Mariah Carey | unverify (applied) | 8284511 | https://www.ticketliquidator.com/tickets/8284511/Mariah-Carey-tickets-Fri-Nov-27-2026-Utilita-Arena-Birmingham | no qualifying listing (the complete catalog no longer lists the stored link) |
| tm-mariah-carey-2026-london-1agzkfsgkdzymm6 | Mariah Carey | refresh (applied) | 8276937 | https://www.ticketliquidator.com/tickets/8276937/Mariah-Carey-tickets-Mon-Nov-30-2026-O2-Arena-London | - |
| tm-mariah-carey-2026-manchester-1amzkfsgkejdwkf | Mariah Carey | refresh (applied) | 8276812 | https://www.ticketliquidator.com/tickets/8276812/Mariah-Carey-tickets-Wed-Dec-2-2026-Co-Op-Live | - |
| tm-sting-2027-las-vegas-1ayzk4agkecv9ix | Sting | refresh (applied) | 8319776 | https://www.ticketliquidator.com/tickets/8319776/Sting-tickets-Thu-Mar-4-2027-The-Colosseum-At-Caesars-Palace | - |
| tm-sting-2027-las-vegas-1ayzk4agkecemih | Sting | refresh (applied) | 8319777 | https://www.ticketliquidator.com/tickets/8319777/Sting-tickets-Sat-Mar-6-2027-The-Colosseum-At-Caesars-Palace | - |
| tm-sting-2027-las-vegas-1ayzk4agkec79cl | Sting | refresh (applied) | 8319778 | https://www.ticketliquidator.com/tickets/8319778/Sting-tickets-Sun-Mar-7-2027-The-Colosseum-At-Caesars-Palace | - |
| tm-sting-2027-las-vegas-1ayzk4agkecamcg | Sting | refresh (applied) | 8319779 | https://www.ticketliquidator.com/tickets/8319779/Sting-tickets-Wed-Mar-10-2027-The-Colosseum-At-Caesars-Palace | - |
| tm-sting-2027-las-vegas-1ayzk4agkec6msw | Sting | refresh (applied) | 8319780 | https://www.ticketliquidator.com/tickets/8319780/Sting-tickets-Fri-Mar-12-2027-The-Colosseum-At-Caesars-Palace | - |
| tm-sting-2027-gliwice-z698xzqpz1kckp0pa | Sting | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sting-2027-gdansk-sopot-z698xzqpz16vv6c7f6 | Sting | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sting-2027-krakow-z698xzqpz16evtf6jd | Sting | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sting-2027-odz-z698xzqpz1k06xapf | Sting | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sting-2027-magdeburg-z698xzc2z16vzxvefv | Sting | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sting-2027-rastatt-z698xzc2z1ke30sgb | Sting | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sting-2027-hemer-z698xzc2z16vagofpv | Sting | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sting-2027-fulda-z698xzc2z16v1vjxok | Sting | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sting-2027-konstanz-z698xzc2z1kjfov_n | Sting | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sting-2027-klagenfurt-z698xz5rz1kgyvv34 | Sting | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sting-2027-verona-zg9rmiynyzf61a | Sting | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sting-2027-las-vegas-1ayzk4agkeca9wi | Sting | refresh (applied) | 8319784 | https://www.ticketliquidator.com/tickets/8319784/Sting-tickets-Thu-Oct-14-2027-The-Colosseum-At-Caesars-Palace | - |
| tm-sting-2027-las-vegas-1ayzk4agkec1mvn | Sting | refresh (applied) | 8319785 | https://www.ticketliquidator.com/tickets/8319785/Sting-tickets-Sat-Oct-16-2027-The-Colosseum-At-Caesars-Palace | - |
| tm-sting-2027-las-vegas-1ayzk4agkecg6m7 | Sting | refresh (applied) | 8319786 | https://www.ticketliquidator.com/tickets/8319786/Sting-tickets-Sun-Oct-17-2027-The-Colosseum-At-Caesars-Palace | - |
| tm-sting-2027-las-vegas-1ayzk4agkecumyj | Sting | refresh (applied) | 8319788 | https://www.ticketliquidator.com/tickets/8319788/Sting-tickets-Wed-Oct-20-2027-The-Colosseum-At-Caesars-Palace | - |
| tm-sting-2027-las-vegas-1ayzk4agkec2mbz | Sting | refresh (applied) | 8319789 | https://www.ticketliquidator.com/tickets/8319789/Sting-tickets-Fri-Oct-22-2027-The-Colosseum-At-Caesars-Palace | - |
| tm-sting-2027-las-vegas-1ayzk4agkecoebs | Sting | refresh (applied) | 8319790 | https://www.ticketliquidator.com/tickets/8319790/Sting-tickets-Sat-Oct-23-2027-The-Colosseum-At-Caesars-Palace | - |
| tm-queens-of-the-stone-age-2026-adelaide-17a8v0g6cj0fp2t | Queens Of The Stone Age | refresh (applied) | 8370389 | https://www.ticketliquidator.com/tickets/8370389/Queens-of-the-Stone-Age-tickets-Tue-Dec-8-2026-The-Drive-Adelaide | - |
| tm-queens-of-the-stone-age-2026-glenorchy-177yv0g6cla9khl | Queens Of The Stone Age | none | - | - | no qualifying listing (complete catalog checked) |
| tm-queens-of-the-stone-age-2026-auckland-17azv0g6cjw0kgn | Queens Of The Stone Age | refresh (applied) | 8173263 | https://www.ticketliquidator.com/tickets/8173263/Queens-of-the-Stone-Age-tickets-Sun-Dec-20-2026-Spark-Arena | - |
| tm-queens-of-the-stone-age-2027-san-diego-vvg1iz_4c-ppva | Queens Of The Stone Age | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Queens Of The Stone Age & Pixies; text: Queens Of The Stone Age & Pixies Queens Of The Stone Age & Pixies /tickets/8337028/Queens-of-the-Stone-Age-tickets-Sat-May-1-2027-Viejas-Are) |
| tm-queens-of-the-stone-age-2027-inglewood-vv1k0z_48eg7ij9v | Queens Of The Stone Age | refresh (applied) | 8337029 | https://www.ticketliquidator.com/tickets/8337029/Queens-of-the-Stone-Age-tickets-Sun-May-2-2027-The-Kia-Forum | - |
| tm-queens-of-the-stone-age-2027-oakland-g5vyz_4k7itnp | Queens Of The Stone Age | refresh (applied) | 8337030 | https://www.ticketliquidator.com/tickets/8337030/Queens-of-the-Stone-Age-tickets-Tue-May-4-2027-Oakland-Arena | - |
| tm-queens-of-the-stone-age-2027-sacramento-g5vyz_4paibie | Queens Of The Stone Age | refresh (applied) | 8337031 | https://www.ticketliquidator.com/tickets/8337031/Queens-of-the-Stone-Age-tickets-Wed-May-5-2027-Golden-1-Center | - |
| tm-queens-of-the-stone-age-2027-seattle-vvg1hz_43n59ay | Queens Of The Stone Age | refresh (applied) | 8337032 | https://www.ticketliquidator.com/tickets/8337032/Queens-of-the-Stone-Age-tickets-Fri-May-7-2027-Climate-Pledge-Arena | - |
| tm-queens-of-the-stone-age-2027-portland-vvg1hz_42zzik2 | Queens Of The Stone Age | refresh (applied) | 8337034 | https://www.ticketliquidator.com/tickets/8337034/Queens-of-the-Stone-Age-tickets-Sun-May-9-2027-Moda-Center-at-the-Rose-Quarter | - |
| tm-queens-of-the-stone-age-2027-salt-lake-city-z7r9jz1aa7-1z | Queens Of The Stone Age | refresh (applied) | 8337035 | https://www.ticketliquidator.com/tickets/8337035/Queens-of-the-Stone-Age-tickets-Tue-May-11-2027-Delta-Center | - |
| tm-queens-of-the-stone-age-2027-morrison-z7r9jz1aa7nqm | Queens Of The Stone Age | refresh (applied) | 8337048 | https://www.ticketliquidator.com/tickets/8337048/Queens-of-the-Stone-Age-tickets-Wed-May-12-2027-Red-Rocks-Amphitheatre | - |
| tm-queens-of-the-stone-age-2027-saint-paul-z7r9jz1aa7-1v | Queens Of The Stone Age | refresh (applied) | 8342261 | https://www.ticketliquidator.com/tickets/8342261/Queens-of-the-Stone-Age-tickets-Fri-May-14-2027-Grand-Casino-Arena | - |
| tm-queens-of-the-stone-age-2027-milwaukee-vv1a6zk4kgkdc_par | Queens Of The Stone Age | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Queens Of The Stone Age & Pixies; text: Queens Of The Stone Age & Pixies Queens Of The Stone Age & Pixies /tickets/8337036/Queens-of-the-Stone-Age-tickets-Sat-May-15-2027-American-) |
| tm-queens-of-the-stone-age-2027-rosemont-vv1kvzvpfygacy0ah | Queens Of The Stone Age | refresh (applied) | 8337037 | https://www.ticketliquidator.com/tickets/8337037/Queens-of-the-Stone-Age-tickets-Sun-May-16-2027-Allstate-Arena | - |
| tm-queens-of-the-stone-age-2027-indianapolis-vv1aazk4fgkd2j1lw | Queens Of The Stone Age | refresh (applied) | 8337038 | https://www.ticketliquidator.com/tickets/8337038/Queens-of-the-Stone-Age-tickets-Tue-May-18-2027-Gainbridge-Fieldhouse | - |
| tm-queens-of-the-stone-age-2027-columbus-vv1kv8vp4agacm7ii | Queens Of The Stone Age | refresh (applied) | 8337040 | https://www.ticketliquidator.com/tickets/8337040/Queens-of-the-Stone-Age-tickets-Wed-May-19-2027-Nationwide-Arena | - |
| tm-queens-of-the-stone-age-2027-pittsburgh-1apzk44gkedibkp | Queens Of The Stone Age | refresh (applied) | 8337042 | https://www.ticketliquidator.com/tickets/8337042/Queens-of-the-Stone-Age-tickets-Fri-May-21-2027-Petersen-Events-Center | - |
| tm-queens-of-the-stone-age-2027-detroit-vv1kezvp4_gagidyd | Queens Of The Stone Age | refresh (applied) | 8337043 | https://www.ticketliquidator.com/tickets/8337043/Queens-of-the-Stone-Age-tickets-Sat-May-22-2027-Little-Caesars-Arena | - |
| tm-queens-of-the-stone-age-2027-boston-vv1avzk43gkdss-xl | Queens Of The Stone Age | refresh (applied) | 8337046 | https://www.ticketliquidator.com/tickets/8337046/Queens-of-the-Stone-Age-tickets-Mon-May-24-2027-TD-Garden | - |
| tm-cody-johnson-2027-austin-g5diz_43sxhzn | Cody Johnson | refresh (applied) | 8337510 | https://www.ticketliquidator.com/tickets/8337510/Cody-Johnson-tickets-Fri-Feb-19-2027-Moody-Center-ATX | - |
| tm-cody-johnson-2027-austin-g5diz_46xjfxh | Cody Johnson | refresh (applied) | 8329600 | https://www.ticketliquidator.com/tickets/8329600/Cody-Johnson-tickets-Sat-Feb-20-2027-Moody-Center-ATX | - |
| tm-u2-2027-london-1adfz_4qdzvzd55v | U2 | refresh (applied) | 8347802 | https://www.ticketliquidator.com/tickets/8347802/U2-tickets-Fri-Jun-18-2027-Tottenham-Hotspur-New-Stadium | - |
| tm-u2-2027-london-1adfz_4gkszafjm | U2 | refresh (applied) | 8347803 | https://www.ticketliquidator.com/tickets/8347803/U2-tickets-Sat-Jun-19-2027-Tottenham-Hotspur-New-Stadium | - |
| tm-rod-stewart-2027-london-1agzkfzgkdu5qoy | Rod Stewart | refresh (applied) | 8355791 | https://www.ticketliquidator.com/tickets/8355791/Rod-Stewart-tickets-Sat-May-15-2027-O2-Arena-London | - |
| tm-rod-stewart-2027-glasgow-1adbz_4gkmvnhoa | Rod Stewart | none | - | - | no qualifying listing (complete catalog checked) |
| tm-role-model-2027-manchester-g5vhz_u1kkyot | Role Model | none | - | - | no qualifying listing (complete catalog checked) |
| tm-queens-of-the-stone-age-2027-valencia-z698xz2qz16vfzvzrf | Queens Of The Stone Age | none | - | - | no qualifying listing (complete catalog checked) |
| tm-queens-of-the-stone-age-2027-pordenone-zg9rmiynyzfa6e | Queens Of The Stone Age | none | - | - | no qualifying listing (complete catalog checked) |
| tm-shania-twain-2027-scarborough-1agzkfugkdob_wu | Shania Twain | none | - | - | no qualifying listing (complete catalog checked) |
| tm-shania-twain-2027-glasgow-1adbz_fgkuptsoi | Shania Twain | none | - | - | no qualifying listing (complete catalog checked) |
| tm-shania-twain-2027-cardiff-g5vhz_kljqj-d | Shania Twain | none | - | - | no qualifying listing (complete catalog checked) |
| tm-shania-twain-2027-exeter-g5vhz_kjtg0ag | Shania Twain | none | - | - | no qualifying listing (complete catalog checked) |
| tm-shania-twain-2027-dublin-1abzk4pgkenqubp | Shania Twain | none | - | - | no qualifying listing (complete catalog checked) |
| tm-shania-twain-2027-belfast-1adoz_4gksdrodo | Shania Twain | none | - | - | no qualifying listing (complete catalog checked) |
| tm-shania-twain-2027-woodstock-1amzk4agkdk2pnt | Shania Twain | none | - | - | no qualifying listing (complete catalog checked) |
| tm-motionless-in-white-2027-dubendorf-z698xzu3z16ezmoj16 | Motionless in White | none | - | - | no qualifying listing (complete catalog checked) |
| tm-yg-2026-oakland-g5vyz_u2lcdvy | YG | refresh (applied) | 8075219 | https://www.ticketliquidator.com/tickets/8075219/YG-tickets-Sat-Dec-19-2026-Oakland-Arena | - |
| tm-rawayana-2026-orlando-1aefz_kgkuqmj8a | Rawayana | refresh (applied) | 7808658 | https://www.ticketliquidator.com/tickets/7808658/Rawayana-tickets-Thu-Dec-3-2026-Kia-Center | - |
| tm-rawayana-2026-miami-vvg1vz_fh4bcfd | Rawayana | refresh (applied) | 8314977 | https://www.ticketliquidator.com/tickets/8314977/Rawayana-tickets-Fri-Dec-4-2026-Kaseya-Center | - |
| tm-rawayana-2026-miami-vvg1vz_kwnj_rj | Rawayana | refresh (applied) | 7808663 | https://www.ticketliquidator.com/tickets/7808663/Rawayana-tickets-Sat-Dec-5-2026-Kaseya-Center | - |
| tm-rawayana-2026-miami-vvg1vz_6kilnkl | Rawayana | refresh (applied) | 7815294 | https://www.ticketliquidator.com/tickets/7815294/Rawayana-tickets-Sun-Dec-6-2026-Kaseya-Center | - |
| tm-jodeci-2026-thackerville-z7r9jz1aaz3ae | Jodeci | refresh (applied) | 8173209 | https://www.ticketliquidator.com/tickets/8173209/Jodeci-tickets-Fri-Nov-27-2026-Lucas-Oil-Live-At-WinStar-Casino | - |
| tm-jodeci-2026-norman-z7r9jz1aaed_m | Jodeci | refresh (applied) | 8173555 | https://www.ticketliquidator.com/tickets/8173555/Jodeci-tickets-Sat-Nov-28-2026-Showplace-Theatre-At-Riverwind-Casino | - |
| tm-jodeci-2026-houston-g5diz_2lvp-gm | Jodeci | refresh (applied) | 8167852 | https://www.ticketliquidator.com/tickets/8167852/Jodeci-tickets-Sun-Nov-29-2026-Houston-Arena-Theatre | - |
| tm-jodeci-2026-north-little-rock-g5viz_29tplat | Jodeci | refresh (applied) | 8167877 | https://www.ticketliquidator.com/tickets/8167877/Jodeci-tickets-Tue-Dec-1-2026-Simmons-Bank-Arena | - |
| tm-jodeci-2026-new-orleans-z7r9jz1aazk_o | Jodeci | refresh (applied) | 8165309 | https://www.ticketliquidator.com/tickets/8165309/Jodeci-tickets-Wed-Dec-2-2026-Saenger-Theatre-New-Orleans | - |
| tm-jodeci-2026-birmingham-17fzv0g62rrj3c3 | Jodeci | refresh (applied) | 8167878 | https://www.ticketliquidator.com/tickets/8167878/Jodeci-tickets-Thu-Dec-3-2026-Concert-Hall-at-the-BJCC | - |
| tm-jodeci-2026-lake-charles-g5viz_2mnhtb3 | Jodeci | refresh (applied) | 8167887 | https://www.ticketliquidator.com/tickets/8167887/Jodeci-tickets-Sat-Dec-5-2026-Lake-Charles-Event-Center | - |
| tm-jodeci-2026-mobile-g5viz_2rkvisc | Jodeci | refresh (applied) | 8167879 | https://www.ticketliquidator.com/tickets/8167879/Jodeci-tickets-Sun-Dec-6-2026-Saenger-Theatre-Mobile | - |
| tm-jodeci-2026-savannah-vvg1zz_2qcyhff | Jodeci | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Jodeci; text: Jodeci Jodeci /tickets/8167880/Jodeci-tickets-Tue-Dec-8-2026-Johnny-Mercer-Theatre Jodeci Jodeci Johnny Mercer Theatre 4364 CONCERTS 301 W. ) |
| tm-jodeci-2026-nashville-g5viz_2rjh5vs | Jodeci | refresh (applied) | 8167881 | https://www.ticketliquidator.com/tickets/8167881/Jodeci-tickets-Thu-Dec-10-2026-The-Truth | - |
| tm-jodeci-2026-columbia-g5evz_2hnfhnt | Jodeci | refresh (applied) | 8167882 | https://www.ticketliquidator.com/tickets/8167882/Jodeci-tickets-Fri-Dec-11-2026-Township-Auditorium | - |
| tm-jodeci-2026-st-petersburg-vvg1vz_2qbbe54 | Jodeci | refresh (applied) | 8167883 | https://www.ticketliquidator.com/tickets/8167883/Jodeci-tickets-Sun-Dec-13-2026-Mahaffey-Theater-At-The-Duke-Energy-Center-for-the-Arts | - |
| tm-jodeci-2026-jacksonville-z7r9jz1aaz3fu | Jodeci | refresh (applied) | 8173206 | https://www.ticketliquidator.com/tickets/8173206/Jodeci-tickets-Tue-Dec-15-2026-Florida-Theatre-Jacksonville | - |
| tm-jodeci-2026-miami-beach-vvg1vz_29bl5j9 | Jodeci | refresh (applied) | 8167884 | https://www.ticketliquidator.com/tickets/8167884/Jodeci-tickets-Wed-Dec-16-2026-The-Fillmore-Miami-Beach-At-Jackie-Gleason-Theater | - |
| tm-jodeci-2026-charlotte-g5evz_2qspt5m | Jodeci | refresh (applied) | 8167885 | https://www.ticketliquidator.com/tickets/8167885/Jodeci-tickets-Sat-Dec-19-2026-Ovens-Auditorium | - |
| tm-jodeci-2026-charlotte-g5evz_ok-zl2c | Jodeci | refresh (applied) | 8231624 | https://www.ticketliquidator.com/tickets/8231624/Jodeci-tickets-Sun-Dec-20-2026-Ovens-Auditorium | - |
| tm-jodeci-2027-san-francisco-g5vyz_2qprnjg | Jodeci | refresh (applied) | 8167859 | https://www.ticketliquidator.com/tickets/8167859/Jodeci-tickets-Fri-Jan-8-2027-The-Masonic-San-Francisco | - |
| tm-jodeci-2027-inglewood-vvg1iz_2l8dh94 | Jodeci | refresh (applied) | 8167860 | https://www.ticketliquidator.com/tickets/8167860/Jodeci-tickets-Sat-Jan-9-2027-YouTube-Theater-at-Hollywood-Park | - |
| tm-jodeci-2027-el-cajon-vvg1iz_2r2vxq6 | Jodeci | refresh (applied) | 8167863 | https://www.ticketliquidator.com/tickets/8167863/Jodeci-tickets-Sun-Jan-10-2027-The-Magnolia-Performing-Arts-Center | - |
| tm-jodeci-2027-phoenix-17k8v0g62lhiblw | Jodeci | refresh (applied) | 8165300 | https://www.ticketliquidator.com/tickets/8165300/Jodeci-tickets-Fri-Jan-15-2027-Arizona-Financial-Theatre | - |
| tm-jodeci-2027-ontario-vvg10z_2n6tniq | Jodeci | refresh (applied) | 8167861 | https://www.ticketliquidator.com/tickets/8167861/Jodeci-tickets-Sat-Jan-16-2027-Toyota-Arena-Ontario | - |
| tm-mercyme-2027-roanoke-vv1avzk4agkdxzmi2 | MercyMe | refresh (applied) | 8326553 | https://www.ticketliquidator.com/tickets/8326553/MercyMe-tickets-Thu-Mar-11-2027-Berglund-Center-Coliseum | - |
| tm-mercyme-2027-huntington-1avbz_fgkbqrak8 | MercyMe | refresh (applied) | 8326554 | https://www.ticketliquidator.com/tickets/8326554/MercyMe-tickets-Fri-Mar-12-2027-Marshall-Health-Network-Arena | - |
| tm-mercyme-2027-highland-heights-1avbz_fgkwx5pep | MercyMe | refresh (applied) | 8326555 | https://www.ticketliquidator.com/tickets/8326555/MercyMe-tickets-Sun-Mar-14-2027-Truist-Arena | - |
| tm-mercyme-2027-florence-g5evz_fmi8uks | MercyMe | refresh (applied) | 8326559 | https://www.ticketliquidator.com/tickets/8326559/MercyMe-tickets-Thu-Mar-18-2027-Florence-Civic-Center | - |
| tm-mercyme-2027-macon-vvg1zz_fsveixl | MercyMe | refresh (applied) | 8326560 | https://www.ticketliquidator.com/tickets/8326560/MercyMe-tickets-Sat-Mar-20-2027-Atrium-Health-Amphitheater | - |
| tm-mercyme-2027-huntsville-1aezz_fgksvhplo | MercyMe | refresh (applied) | 8326561 | https://www.ticketliquidator.com/tickets/8326561/MercyMe-tickets-Sun-Mar-21-2027-Propst-Arena-At-the-Von-Braun-Center | - |
| tm-mercyme-2027-pensacola-g5viz_fuwn07x | MercyMe | refresh (applied) | 8326562 | https://www.ticketliquidator.com/tickets/8326562/MercyMe-tickets-Wed-Mar-24-2027-Pensacola-Bay-Center | - |
| tm-mercyme-2027-orlando-1kfovp3_ga2o7he | MercyMe | refresh (applied) | 8326563 | https://www.ticketliquidator.com/tickets/8326563/MercyMe-tickets-Thu-Mar-25-2027-Addition-Financial-Arena | - |
| tm-mercyme-2027-tallahassee-17fov0g613pbs0q | MercyMe | refresh (applied) | 7965199 | https://www.ticketliquidator.com/tickets/7965199/MercyMe-tickets-Fri-Mar-26-2027-Donald-L-Tucker-Civic-Center | - |
| tm-mercyme-2027-fayetteville-g5evz_frs44wl | MercyMe | refresh (applied) | 8326565 | https://www.ticketliquidator.com/tickets/8326565/MercyMe-tickets-Thu-Apr-1-2027-Crown-Coliseum-The-Crown-Center | - |
| tm-mercyme-2027-reading-vv17fz_fgks27zye | MercyMe | refresh (applied) | 8326566 | https://www.ticketliquidator.com/tickets/8326566/MercyMe-tickets-Sun-Apr-4-2027-Santander-Arena | - |
| tm-mercyme-2027-portland-vv177z_fgkxgyxqn | MercyMe | refresh (applied) | 8326567 | https://www.ticketliquidator.com/tickets/8326567/MercyMe-tickets-Thu-Apr-8-2027-Cross-Insurance-Arena | - |
| tm-mercyme-2027-trenton-k7vgf_fedotss | MercyMe | refresh (applied) | 8326568 | https://www.ticketliquidator.com/tickets/8326568/MercyMe-tickets-Sat-Apr-10-2027-Cure-Insurance-Arena | - |
| tm-mercyme-2027-grand-prairie-z7r9jz1aa74jn | MercyMe | refresh (applied) | 8330257 | https://www.ticketliquidator.com/tickets/8330257/MercyMe-tickets-Thu-Apr-15-2027-Texas-Trust-CU-Theatre-at-Grand-Prairie | - |
| tm-mercyme-2027-cedar-park-g5diz_fiumntg | MercyMe | refresh (applied) | 8326569 | https://www.ticketliquidator.com/tickets/8326569/MercyMe-tickets-Sat-Apr-17-2027-HEB-Center-at-Cedar-Park | - |
| tm-mercyme-2027-bossier-city-g5viz_fdsgolb | MercyMe | refresh (applied) | 8326570 | https://www.ticketliquidator.com/tickets/8326570/MercyMe-tickets-Sun-Apr-18-2027-Brookshire-Grocery-Arena | - |
| tm-mercyme-2027-tulsa-1aezz_fgkbolkrk | MercyMe | refresh (applied) | 8326571 | https://www.ticketliquidator.com/tickets/8326571/MercyMe-tickets-Thu-Apr-22-2027-BOK-Center | - |
| tm-mercyme-2027-lincoln-vv17bz_fgktuaum7 | MercyMe | refresh (applied) | 8326572 | https://www.ticketliquidator.com/tickets/8326572/MercyMe-tickets-Fri-Apr-23-2027-Pinnacle-Bank-Arena | - |
| tm-mercyme-2027-moline-vv17bz_fgkwrzpms | MercyMe | refresh (applied) | 8326574 | https://www.ticketliquidator.com/tickets/8326574/MercyMe-tickets-Sat-Apr-24-2027-Vibrant-Arena-at-The-MARK | - |
| tm-mercyme-2027-grand-rapids-vv17oz_fgkmddfhb | MercyMe | refresh (applied) | 8326575 | https://www.ticketliquidator.com/tickets/8326575/MercyMe-tickets-Sun-Apr-25-2027-Van-Andel-Arena | - |
| tm-mercyme-2027-milwaukee-vv17jz_fgkboydiq | MercyMe | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Mercyme, Ben Fuller & Peter Burton; text: Mercyme, Ben Fuller & Peter Burton Mercyme, Ben Fuller & Peter Burton /tickets/8326576/MercyMe-tickets-Thu-Apr-29-2027-UWM-Panther-Arena Mer) |
| tm-mercyme-2027-springfield-vv1a6zk4agkeirfgx | MercyMe | refresh (applied) | 8326577 | https://www.ticketliquidator.com/tickets/8326577/MercyMe-tickets-Fri-Apr-30-2027-Bank-of-Springfield-Center | - |
| tm-mercyme-2027-canton-vv17fz_fgkw2un6n | MercyMe | refresh (applied) | 8326585 | https://www.ticketliquidator.com/tickets/8326585/MercyMe-tickets-Sat-May-1-2027-Canton-Memorial-Civic-Center | - |
| tm-mercyme-2027-evansville-vv17fz_fgkwdo5qw | MercyMe | refresh (applied) | 8326579 | https://www.ticketliquidator.com/tickets/8326579/MercyMe-tickets-Sun-May-2-2027-Ford-Center-IN | - |
| tm-gracie-abrams-2027-austin-g5diz_4uo-e6z | Gracie Abrams | refresh (applied) | 8352467 | https://www.ticketliquidator.com/tickets/8352467/Gracie-Abrams-tickets-Sat-Feb-6-2027-Moody-Center-ATX | - |
| tm-blondshell-2027-cleveland-vv1aazk4pgkduzdwy | Blondshell | none | - | - | no qualifying listing (complete catalog checked) |
| tm-death-cab-for-cutie-2027-milwaukee-vv17jz_4gkdidvax | Death Cab for Cutie | refresh (applied) | 8353155 | https://www.ticketliquidator.com/tickets/8353155/Death-Cab-for-Cutie-tickets-Fri-Jun-25-2027-BMO-Pavilion | - |
| tm-chelsea-cutler-2027-austin-z7r9jz1aa7ug0 | Chelsea Cutler | none | - | - | no qualifying listing (complete catalog checked) |
| tm-greta-van-fleet-2027-green-bay-z7r9jz1aae44u | Greta Van Fleet | refresh (applied) | 8303352 | https://www.ticketliquidator.com/tickets/8303352/Greta-Van-Fleet-tickets-Wed-Feb-17-2027-Resch-Center | - |
| tm-greta-van-fleet-2027-cleveland-z7r9jz1aae44m | Greta Van Fleet | refresh (applied) | 8303356 | https://www.ticketliquidator.com/tickets/8303356/Greta-Van-Fleet-tickets-Wed-Mar-3-2027-Rocket-Arena | - |
| tm-greta-van-fleet-2027-salt-lake-city-z7r9jz1aae44z | Greta Van Fleet | refresh (applied) | 8303371 | https://www.ticketliquidator.com/tickets/8303371/Greta-Van-Fleet-tickets-Mon-Mar-29-2027-Delta-Center | - |
| tm-riley-green-2027-cincinnati-1kaovp4ygacu9xm | Riley Green | refresh (applied) | 8353775 | https://www.ticketliquidator.com/tickets/8353775/Riley-Green-tickets-Thu-Jun-24-2027-The-Farmer-Music-Center | - |
| tm-flans-2027-las-vegas-z7r9jz1aaeaov | Flans | refresh (applied) | 8289128 | https://www.ticketliquidator.com/tickets/8289128/Flans-tickets-Thu-Mar-11-2027-The-Theater-at-Virgin-Hotels-Las-Vegas | - |
| tm-los-tigres-del-norte-2027-oklahoma-city-vvg1yz_f5olqqc | Los Tigres del Norte | refresh (applied) | 8353584 | https://www.ticketliquidator.com/tickets/8353584/Los-Tigres-del-Norte-tickets-Fri-Feb-12-2027-Paycom-Center | - |
| tm-los-tigres-del-norte-2027-fort-worth-vvg1yz_4bmn9we | Los Tigres del Norte | refresh (applied) | 8353583 | https://www.ticketliquidator.com/tickets/8353583/Los-Tigres-del-Norte-tickets-Sat-Feb-13-2027-Ariat-Arena | - |
| tm-los-tigres-del-norte-2027-rosemont-vv1a7zk4kgkdecl8m | Los Tigres del Norte | refresh (applied) | 8355708 | https://www.ticketliquidator.com/tickets/8355708/Los-Tigres-del-Norte-tickets-Sat-Mar-20-2027-Allstate-Arena | - |
| tm-los-tigres-del-norte-2027-miami-vvg1vz_fxmchil | Los Tigres del Norte | refresh (applied) | 8353585 | https://www.ticketliquidator.com/tickets/8353585/Los-Tigres-del-Norte-tickets-Fri-Mar-26-2027-James-L-Knight-Center | - |
| tm-los-tigres-del-norte-2027-atlantic-city-vv17fz_4gkmu5cz_ | Los Tigres del Norte | refresh (applied) | 8353586 | https://www.ticketliquidator.com/tickets/8353586/Los-Tigres-del-Norte-tickets-Fri-Apr-16-2027-Hard-Rock-Live-At-Etess-Arena | - |
| tm-los-tigres-del-norte-2027-duluth-vvg1zz_fq51ps_ | Los Tigres del Norte | refresh (applied) | 8353587 | https://www.ticketliquidator.com/tickets/8353587/Los-Tigres-del-Norte-tickets-Fri-Apr-23-2027-Gas-South-Arena | - |
| tm-los-tigres-del-norte-2027-charlotte-g5evz_fqspq1u | Los Tigres del Norte | refresh (applied) | 8353588 | https://www.ticketliquidator.com/tickets/8353588/Los-Tigres-del-Norte-tickets-Sat-Apr-24-2027-Spectrum-Center | - |
| tm-los-tigres-del-norte-2027-seattle-vvg1hz_4zy3kxo | Los Tigres del Norte | refresh (applied) | 8353589 | https://www.ticketliquidator.com/tickets/8353589/Los-Tigres-del-Norte-tickets-Fri-May-21-2027-Wamu-Theater-At-Lumen-Field-Event-Center | - |
| tm-los-tigres-del-norte-2027-portland-vvg1hz_flv5i1r | Los Tigres del Norte | refresh (applied) | 8355710 | https://www.ticketliquidator.com/tickets/8355710/Los-Tigres-del-Norte-tickets-Sat-May-22-2027-Moda-Center-at-the-Rose-Quarter | - |
| tm-zac-brown-band-2027-sparks-1avjz_4gkrmjou6 | Zac Brown Band | refresh (applied) | 8353403 | https://www.ticketliquidator.com/tickets/8353403/Zac-Brown-Band-tickets-Sat-May-1-2027-Nugget-Event-Center-At-Nugget-Casino-Resort | - |
| tm-jack-johnson-2027-las-vegas-1avjz_fgkthyfka | Jack Johnson | refresh (applied) | 8353404 | https://www.ticketliquidator.com/tickets/8353404/Jack-Johnson-tickets-Wed-Jun-2-2027-Encore-Theatre-At-Wynn-Las-Vegas | - |
| tm-jack-johnson-2027-las-vegas-1avjz_fgkthbfkc | Jack Johnson | refresh (applied) | 8353405 | https://www.ticketliquidator.com/tickets/8353405/Jack-Johnson-tickets-Thu-Jun-3-2027-Encore-Theatre-At-Wynn-Las-Vegas | - |
| tm-koe-wetzel-2027-durant-vvg1yz_4wsdj6f | Koe Wetzel | refresh (applied) | 8353314 | https://www.ticketliquidator.com/tickets/8353314/Koe-Wetzel-tickets-Fri-Jan-29-2027-Choctaw-Casino-Resort-Durant | - |
| tm-interpol-2026-london-1amzk4xgkd2vp1g | Interpol | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-interrupters-2027-london-g5vhz_4d3nbns | The Interrupters | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-interrupters-2027-k-benhavn-v-z698xzc4z1k8bb3pe | The Interrupters | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jake-bugg-2027-ayr-1auzk4xgkerybal | Jake Bugg | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jake-bugg-2027-stirling-1auzk4xgkd61qqs | Jake Bugg | none | - | - | no qualifying listing (complete catalog checked) |
| tm-gary-allan-2026-las-vegas-z7r9jz1aavf1f | Gary Allan | refresh (applied) | 8246442 | https://www.ticketliquidator.com/tickets/8246442/Gary-Allan-tickets-Fri-Dec-4-2026-The-Theatre-at-Resorts-World-Las-Vegas | - |
| tm-gary-allan-2026-napa-g5vyz_3dfyx0l | Gary Allan | refresh (applied) | 8268101 | https://www.ticketliquidator.com/tickets/8268101/Gary-Allan-tickets-Sat-Dec-5-2026-Uptown-Theatre-Napa | - |
| tm-gary-allan-2026-bakersfield-z7r9jz1aae3j4 | Gary Allan | refresh (applied) | 8298182 | https://www.ticketliquidator.com/tickets/8298182/Gary-Allan-tickets-Sun-Dec-6-2026-The-Historic-Bakersfield-Fox-Theater | - |
| tm-gary-allan-2027-tysons-17a8v0g65hn_upy | Gary Allan | refresh (applied) | 8181666 | https://www.ticketliquidator.com/tickets/8181666/Gary-Allan-tickets-Thu-Feb-18-2027-Capital-One-Hall | - |
| tm-gary-allan-2027-greensboro-g5evz_89x5mox | Gary Allan | refresh (applied) | 8187734 | https://www.ticketliquidator.com/tickets/8187734/Gary-Allan-tickets-Fri-Feb-19-2027-Steven-Tanger-Center-for-the-Performing-Arts | - |
| tm-gary-allan-2027-spartanburg-g5evz_8fssjkd | Gary Allan | refresh (applied) | 8187724 | https://www.ticketliquidator.com/tickets/8187724/Gary-Allan-tickets-Sat-Feb-20-2027-The-Theater-at-Spartanburg-Memorial-Auditorium | - |
| tm-gary-allan-2027-peoria-vvg1jz_ub8qzyr | Gary Allan | refresh (applied) | 8135902 | https://www.ticketliquidator.com/tickets/8135902/Gary-Allan-tickets-Sat-Mar-13-2027-Prairie-Home-Alliance-Theater-At-Peoria-Civic-Center | - |
| tm-mon-laferte-2026-monterrey-17azv0g6cxrk0bt | Mon Laferte | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mon-laferte-2026-monterrey-17azv0g61m-mqwh | Mon Laferte | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mon-laferte-2027-madrid-z698xz2qz16vquuz7t | Mon Laferte | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mon-laferte-2027-brussels-z698xzg2z1kbx0fgb | Mon Laferte | none | - | - | no qualifying listing (complete catalog checked) |
| tm-meshuggah-2027-toronto-1a8zk4fgkepjpte | Meshuggah | none | - | - | no qualifying listing (complete catalog checked) |
| tm-meshuggah-2027-laval-1aszk4fgkdtnr8- | Meshuggah | refresh (applied) | 8343260 | https://www.ticketliquidator.com/tickets/8343260/Meshuggah-tickets-Sat-Feb-13-2027-Place-Bell | - |
| tm-meshuggah-2027-detroit-z7r9jz1aa7t8- | Meshuggah | refresh (applied) | 8343267 | https://www.ticketliquidator.com/tickets/8343267/Meshuggah-tickets-Tue-Feb-16-2027-Masonic-Temple-Theatre | - |
| tm-meshuggah-2027-chicago-vv1a7zk49gkdpmbhc | Meshuggah | refresh (applied) | 8343229 | https://www.ticketliquidator.com/tickets/8343229/Meshuggah-tickets-Wed-Feb-17-2027-The-Salt-Shed-Indoors-Chicago | - |
| tm-meshuggah-2027-minneapolis-vv1akzk44gkdfvhxa | Meshuggah | refresh (applied) | 8343230 | https://www.ticketliquidator.com/tickets/8343230/Meshuggah-tickets-Fri-Feb-19-2027-The-Armory-Minneapolis | - |
| tm-meshuggah-2027-kansas-city-z7r9jz1aa7t8x | Meshuggah | refresh (applied) | 8343268 | https://www.ticketliquidator.com/tickets/8343268/Meshuggah-tickets-Sat-Feb-20-2027-The-Midland-Theatre-MO | - |
| tm-meshuggah-2027-omaha-1aozk4fgkd-wmvg | Meshuggah | refresh (applied) | 8343233 | https://www.ticketliquidator.com/tickets/8343233/Meshuggah-tickets-Sun-Feb-21-2027-Steelhouse-Omaha | - |
| tm-meshuggah-2027-saint-louis-1a-zk44gkdts0ox | Meshuggah | refresh (applied) | 8343235 | https://www.ticketliquidator.com/tickets/8343235/Meshuggah-tickets-Tue-Feb-23-2027-The-Factory-Chesterfield | - |
| tm-meshuggah-2027-nashville-g5viz_4l7rl-d | Meshuggah | refresh (applied) | 8343237 | https://www.ticketliquidator.com/tickets/8343237/Meshuggah-tickets-Wed-Feb-24-2027-The-Truth | - |
| tm-meshuggah-2027-virginia-beach-vv1a8vp4dga5tbtb | Meshuggah | refresh (applied) | 8343238 | https://www.ticketliquidator.com/tickets/8343238/Meshuggah-tickets-Fri-Feb-26-2027-The-Dome-by-Rutter-Mills | - |
| tm-meshuggah-2027-baltimore-1a4zk4fgkdwfxtt | Meshuggah | refresh (applied) | 8343239 | https://www.ticketliquidator.com/tickets/8343239/Meshuggah-tickets-Sat-Feb-27-2027-The-Paramount-Baltimore | - |
| tm-meshuggah-2027-pittsburgh-1kaovp4oga2k8sn | Meshuggah | refresh (applied) | 8343241 | https://www.ticketliquidator.com/tickets/8343241/Meshuggah-tickets-Sun-Feb-28-2027-Citizens-Live-at-The-Wylie | - |
| tm-meshuggah-2027-philadelphia-vv1aezk44gkd2msbd | Meshuggah | refresh (applied) | 8343242 | https://www.ticketliquidator.com/tickets/8343242/Meshuggah-tickets-Tue-Mar-2-2027-The-Met-Presented-by-Highmark | - |
| tm-meshuggah-2027-brooklyn-k7vgf_4lfqrel | Meshuggah | refresh (applied) | 8343243 | https://www.ticketliquidator.com/tickets/8343243/Meshuggah-tickets-Wed-Mar-3-2027-Brooklyn-Paramount | - |
| tm-meshuggah-2027-boston-vv1a8vp4aga5ukxb | Meshuggah | refresh (applied) | 8343244 | https://www.ticketliquidator.com/tickets/8343244/Meshuggah-tickets-Sat-Mar-6-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-meshuggah-2027-vancouver-z7r9jz1aa7tay | Meshuggah | refresh (applied) | 8343261 | https://www.ticketliquidator.com/tickets/8343261/Meshuggah-tickets-Thu-Apr-15-2027-PNE-Forum | - |
| tm-meshuggah-2027-portland-vvg1hz_4pdt01r | Meshuggah | refresh (applied) | 8343245 | https://www.ticketliquidator.com/tickets/8343245/Meshuggah-tickets-Fri-Apr-16-2027-Moda-Center-at-the-Rose-Quarter | - |
| tm-meshuggah-2027-seattle-vvg1hz_4kkbgac | Meshuggah | refresh (applied) | 8343246 | https://www.ticketliquidator.com/tickets/8343246/Meshuggah-tickets-Sat-Apr-17-2027-Paramount-Theatre-Seattle | - |
| tm-meshuggah-2027-salt-lake-city-g5vzz_4r3jsmh | Meshuggah | refresh (applied) | 8343247 | https://www.ticketliquidator.com/tickets/8343247/Meshuggah-tickets-Mon-Apr-19-2027-The-Union-Event-Center | - |
| tm-meshuggah-2027-morrison-z7r9jz1aa7e-0 | Meshuggah | refresh (applied) | 8343226 | https://www.ticketliquidator.com/tickets/8343226/Meshuggah-tickets-Wed-Apr-21-2027-Red-Rocks-Amphitheatre | - |
| tm-meshuggah-2027-oakland-g5vyz_4hq7g_c | Meshuggah | refresh (applied) | 8343248 | https://www.ticketliquidator.com/tickets/8343248/Meshuggah-tickets-Sat-Apr-24-2027-Fox-Theater-Oakland | - |
| tm-meshuggah-2027-inglewood-vvg1iz_4feeal9 | Meshuggah | refresh (applied) | 8343249 | https://www.ticketliquidator.com/tickets/8343249/Meshuggah-tickets-Sun-Apr-25-2027-YouTube-Theater-at-Hollywood-Park | - |
| tm-meshuggah-2027-phoenix-16_zk4bafza5uakd | Meshuggah | refresh (applied) | 8343250 | https://www.ticketliquidator.com/tickets/8343250/Meshuggah-tickets-Tue-Apr-27-2027-Arizona-Financial-Theatre | - |
| tm-meshuggah-2027-houston-g5diz_48jqg5z | Meshuggah | refresh (applied) | 8343251 | https://www.ticketliquidator.com/tickets/8343251/Meshuggah-tickets-Fri-Apr-30-2027-Bayou-Music-Center | - |
| tm-meshuggah-2027-san-antonio-z7r9jz1aa7e0a | Meshuggah | refresh (applied) | 8343252 | https://www.ticketliquidator.com/tickets/8343252/Meshuggah-tickets-Sat-May-1-2027-Boeing-Center-at-Tech-Port | - |
| tm-meshuggah-2027-oklahoma-city-z7r9jz1aa7izs | Meshuggah | refresh (applied) | 8343253 | https://www.ticketliquidator.com/tickets/8343253/Meshuggah-tickets-Sun-May-2-2027-The-Criterion-Oklahoma-City | - |
| tm-meshuggah-2027-irving-vvg1yz_4faiuks | Meshuggah | refresh (applied) | 8343254 | https://www.ticketliquidator.com/tickets/8343254/Meshuggah-tickets-Tue-May-4-2027-The-Pavilion-at-Toyota-Music-Factory | - |
| tm-meshuggah-2027-new-orleans-g5viz_49c3t4b | Meshuggah | refresh (applied) | 8343255 | https://www.ticketliquidator.com/tickets/8343255/Meshuggah-tickets-Thu-May-6-2027-The-Fillmore-New-Orleans | - |
| tm-meshuggah-2027-atlanta-vvg1zz_4ptwc-- | Meshuggah | refresh (applied) | 8343256 | https://www.ticketliquidator.com/tickets/8343256/Meshuggah-tickets-Fri-May-7-2027-Coca-Cola-Roxy | - |
| tm-meshuggah-2027-fort-lauderdale-z7r9jz1aa7iax | Meshuggah | refresh (applied) | 8343257 | https://www.ticketliquidator.com/tickets/8343257/Meshuggah-tickets-Sun-May-9-2027-FTL-War-Memorial-Auditorium | - |
| tm-meshuggah-2027-greensboro-g5evz_4knt1ei | Meshuggah | refresh (applied) | 8343258 | https://www.ticketliquidator.com/tickets/8343258/Meshuggah-tickets-Tue-May-11-2027-Special-Events-Center-At-Greensboro-Complex | - |
| tm-meshuggah-2027-warsaw-z698xzqpz1kgpab4t | Meshuggah | none | - | - | no qualifying listing (complete catalog checked) |
| tm-meshuggah-2027-dublin-1avoz_4gkwrafdq | Meshuggah | refresh (applied) | 8362357 | https://www.ticketliquidator.com/tickets/8362357/Meshuggah-tickets-Wed-Oct-27-2027-3Arena-Dublin | - |
| tm-meshuggah-2027-manchester-1adfz_4gkvdqmcy | Meshuggah | none | - | - | no qualifying listing (complete catalog checked) |
| tm-meshuggah-2027-london-1adjz_4gkbbdf9c | Meshuggah | none | - | - | no qualifying listing (complete catalog checked) |
| tm-pink-martini-2027-pittsburgh-z7r9jz1aavjpj | Pink Martini | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch; listing: Pink Martini; text: Pink Martini Pink Martini /tickets/8258404/Pink-Martini-tickets-Mon-Mar-8-2027-Carnegie-of-Homestead-Music-Hall Pink Martini Pink Martini Ca) |
| tm-hazlett-2027-salt-lake-city-z7r9jz1aa7ec3 | Hazlett | refresh (applied) | 8054868 | https://www.ticketliquidator.com/tickets/8054868/Hazlett-tickets-Fri-May-21-2027-Rockwell-At-The-Complex | - |
| tm-mico-2027-carrboro-z7r9jz1aa73ap | Mico | refresh (applied) | 8315394 | https://www.ticketliquidator.com/tickets/8315394/Mico-tickets-Fri-Feb-19-2027-Cats-Cradle | - |
| tm-garth-brooks-2026-hamilton-1avzz_4gkr__tfz | Garth Brooks | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-boogie-wit-da-hoodie-2026-new-york-k7vgf_p5e9_go | A Boogie Wit Da Hoodie | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: POWER 105.1 Power Sessions: A Boogie Wit Da Hoodie, Cash Cobain & Malie Donn; text: POWER 105.1 Power Sessions: A Boogie Wit Da Hoodie, Cash Cobain & Malie Donn POWER 105.1 Power Sessions: A Boogie Wit Da Hoodie, Cash Cobain) |
| tm-air-supply-2027-penticton-z7r9jz1aa7o-a | Air Supply | refresh (applied) | 8269067 | https://www.ticketliquidator.com/tickets/8269067/Air-Supply-tickets-Fri-Feb-19-2027-South-Okanagan-Events-Centre | - |
| tm-air-supply-2027-prince-george-z7r9jz1aaek-z | Air Supply | refresh (applied) | 8355435 | https://www.ticketliquidator.com/tickets/8355435/Air-Supply-tickets-Sun-Feb-21-2027-CN-Centre | - |
| tm-pink-martini-2026-portland-z7r9jz1aa7u1a | Pink Martini | refresh (applied) | 8267156 | https://www.ticketliquidator.com/tickets/8267156/Pink-Martini-tickets-Sun-Nov-29-2026-Revolution-Hall-Portland | - |
| tm-sienna-spiro-2027-atlanta-z7r9jz1aa7oab | Sienna Spiro | refresh (applied) | 8332309 | https://www.ticketliquidator.com/tickets/8332309/Sienna-Spiro-tickets-Tue-Aug-10-2027-Fabulous-Fox-Theatre-Atlanta | - |
| tm-mercyme-2027-chattanooga-z7r9jz1aa7_af | MercyMe | refresh (applied) | 8332035 | https://www.ticketliquidator.com/tickets/8332035/MercyMe-tickets-Sat-Mar-13-2027-McKenzie-Arena | - |
| tm-raye-2027-dublin-1abzk4agkdp88vj | RAYE | none | - | - | no qualifying listing (complete catalog checked) |
| tm-death-cab-for-cutie-2027-austin-z7r9jz1aa7sc6 | Death Cab for Cutie | refresh (applied) | 8346802 | https://www.ticketliquidator.com/tickets/8346802/Death-Cab-for-Cutie-tickets-Tue-Mar-23-2027-United-Heritage-Hall | - |
| tm-leon-bridges-2027-mexico-1kazvppagacnsha | Leon Bridges | none | - | - | no qualifying listing (complete catalog checked) |
| tm-earth-wind-fire-2027-pompano-beach-z7r9jz1aaazue | Earth, Wind & Fire | refresh (applied) | 8355694 | https://www.ticketliquidator.com/tickets/8355694/Earth-Wind-and-Fire-tickets-Tue-Apr-13-2027-Pompano-Beach-Amphitheatre | - |
| tm-thirty-seconds-to-mars-2027-tallinn-z698xz8kz16vpf_d-9 | Thirty Seconds to Mars | none | - | - | no qualifying listing (complete catalog checked) |
| tm-los-tigres-del-norte-2027-denver-z7r9jz1aaaz8e | Los Tigres del Norte | refresh (applied) | 8356345 | https://www.ticketliquidator.com/tickets/8356345/Los-Tigres-del-Norte-tickets-Sat-Feb-27-2027-Bellco-Theatre | - |
| tm-los-tigres-del-norte-2027-montreal-z7r9jz1aa7zf8 | Los Tigres del Norte | refresh (applied) | 8357209 | https://www.ticketliquidator.com/tickets/8357209/Los-Tigres-del-Norte-tickets-Thu-Apr-1-2027-Salle-Wilfrid-Pelletier-At-Place-Des-Arts | - |
| tm-los-tigres-del-norte-2027-los-angeles-z7r9jz1aa7mao | Los Tigres del Norte | refresh (applied) | 8353670 | https://www.ticketliquidator.com/tickets/8353670/Los-Tigres-del-Norte-tickets-Sat-Apr-10-2027-Cryptocom-Arena | - |
| tm-los-tigres-del-norte-2027-hartford-z7r9jz1aaaz18 | Los Tigres del Norte | refresh (applied) | 8356363 | https://www.ticketliquidator.com/tickets/8356363/Los-Tigres-del-Norte-tickets-Sat-Apr-17-2027-PeoplesBank-Arena | - |
| tm-u2-2027-london-1adfz_4gkb4kzby | U2 | refresh (applied) | 8357048 | https://www.ticketliquidator.com/tickets/8357048/U2-tickets-Tue-Jun-22-2027-Tottenham-Hotspur-New-Stadium | - |
| tm-koe-wetzel-2027-rohnert-park-z7r9jz1aa7zjf | Koe Wetzel | none | - | - | no qualifying listing (complete catalog checked) |
| tm-michelle-branch-2027-tulsa-z7r9jz1aa7vv3 | Michelle Branch | refresh (applied) | 8224465 | https://www.ticketliquidator.com/tickets/8224465/Michelle-Branch-tickets-Thu-Mar-4-2027-Cains-Ballroom | - |
| tm-garth-brooks-2027-belfast-16doz_p8zg7ggqn | Garth Brooks | none | - | - | no qualifying listing (complete catalog checked) |
| tm-garth-brooks-2027-belfast-16doz_p8zg7uaqj | Garth Brooks | none | - | - | no qualifying listing (complete catalog checked) |
| tm-garth-brooks-2027-co-galway-16bzk403zza86av1 | Garth Brooks | none | - | - | no qualifying listing (complete catalog checked) |
| tm-garth-brooks-2027-co-galway-15voz_pof7p89 | Garth Brooks | none | - | - | no qualifying listing (complete catalog checked) |
| tm-garth-brooks-2027-kilkenny-15voz_pod_pcp | Garth Brooks | none | - | - | no qualifying listing (complete catalog checked) |
| tm-garth-brooks-2027-kilkenny-1abzk408u-kze5v | Garth Brooks | none | - | - | no qualifying listing (complete catalog checked) |
| tm-garth-brooks-2027-limerick-city-1kkzvp_dgaumnjq | Garth Brooks | none | - | - | no qualifying listing (complete catalog checked) |
| tm-garth-brooks-2027-limerick-city-1kkzvp_dgauzdjl | Garth Brooks | none | - | - | no qualifying listing (complete catalog checked) |
| tm-garth-brooks-2027-cork-16voz_pozg7t0-b | Garth Brooks | none | - | - | no qualifying listing (complete catalog checked) |
| tm-garth-brooks-2027-cork-16voz_pozg7nfxm | Garth Brooks | none | - | - | no qualifying listing (complete catalog checked) |
| tm-u2-2027-amsterdam-z698xzbpz1kb9z4vi | U2 | refresh (applied) | 8357120 | https://www.ticketliquidator.com/tickets/8357120/U2-tickets-Wed-Jun-9-2027-Johan-Cruijff-Arena | - |
| tm-mercyme-2027-salisbury-z7r9jz1aa7_aj | MercyMe | refresh (applied) | 8332038 | https://www.ticketliquidator.com/tickets/8332038/MercyMe-tickets-Sat-Apr-3-2027-Wicomico-Civic-Center | - |
| tm-lenny-pearce-2027-auckland-17azv0g6uncrehf | Lenny Pearce | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lenny-pearce-2027-townsville-city-1avgz_ogkn2n3_q | Lenny Pearce | none | - | - | no qualifying listing (complete catalog checked) |
| tm-lenny-pearce-2027-hobart-1k7yvp7_gactwpw | Lenny Pearce | none | - | - | no qualifying listing (complete catalog checked) |
| tm-los-tucanes-de-tijuana-2026-fairfax-17a8v0g61bgdzeq | Los Tucanes de Tijuana | refresh (applied) | 7977722 | https://www.ticketliquidator.com/tickets/7977722/Los-Tucanes-De-Tijuana-tickets-Fri-Nov-27-2026-EagleBank-Arena | - |
| tm-los-tucanes-de-tijuana-2026-elizabeth-k7vgf_1yuvjm8 | Los Tucanes de Tijuana | refresh (applied) | 8109393 | https://www.ticketliquidator.com/tickets/8109393/Los-Tucanes-De-Tijuana-tickets-Sat-Nov-28-2026-Ritz-Theatre-NJ | - |
| tm-los-tucanes-de-tijuana-2026-austin-z7r9jz1aazgav | Los Tucanes de Tijuana | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Los Tucanes de Tijuana; text: Los Tucanes de Tijuana Los Tucanes de Tijuana /tickets/8219669/Los-Tucanes-De-Tijuana-tickets-Thu-Dec-3-2026-ACL-Live-At-The-Moody-Theater L) |
| tm-los-tucanes-de-tijuana-2026-thackerville-z7r9jz1aaz9fb | Los Tucanes de Tijuana | refresh (applied) | 8174820 | https://www.ticketliquidator.com/tickets/8174820/Los-Tucanes-De-Tijuana-tickets-Fri-Dec-4-2026-Lucas-Oil-Live-At-WinStar-Casino | - |
| tm-los-tucanes-de-tijuana-2026-catoosa-z7r9jz1aaef8- | Los Tucanes de Tijuana | refresh (applied) | 8296977 | https://www.ticketliquidator.com/tickets/8296977/Los-Tucanes-De-Tijuana-tickets-Sat-Dec-5-2026-Hard-Rock-Live-Hard-Rock-Hotel-Casino-Tulsa | - |
| tm-los-tucanes-de-tijuana-2027-glendale-17k8v0g62nuo9-m | Los Tucanes de Tijuana | refresh (applied) | 8165995 | https://www.ticketliquidator.com/tickets/8165995/Los-Tucanes-De-Tijuana-tickets-Fri-Feb-12-2027-Desert-Diamond-Arena | - |
| tm-los-tucanes-de-tijuana-2027-inglewood-vvg10z_udzwaf3 | Los Tucanes de Tijuana | refresh (applied) | 8112228 | https://www.ticketliquidator.com/tickets/8112228/Los-Tucanes-De-Tijuana-tickets-Sat-Feb-13-2027-Intuit-Dome | - |
| tm-los-tucanes-de-tijuana-2027-rosemont-vv1a7zkffgkdqp4jc | Los Tucanes de Tijuana | refresh (applied) | 8213428 | https://www.ticketliquidator.com/tickets/8213428/Los-Tucanes-De-Tijuana-tickets-Sat-Feb-20-2027-Rosemont-Theatre | - |
| tm-mat-kearney-2027-kalispell-z7r9jz1aazpfi | Mat Kearney | refresh (applied) | 8065313 | https://www.ticketliquidator.com/tickets/8065313/Mat-Kearney-tickets-Fri-Feb-5-2027-McClaren-Hall-At-Wachholz-College-Center | - |
| tm-mat-kearney-2027-durham-z7r9jz1aa7tga | Mat Kearney | refresh (applied) | 8344161 | https://www.ticketliquidator.com/tickets/8344161/Mat-Kearney-tickets-Fri-Apr-16-2027-Carolina-Theatre-Durham | - |
| tm-mat-kearney-2027-charlotte-g5evz_ftdyo7x | Mat Kearney | refresh (applied) | 8344163 | https://www.ticketliquidator.com/tickets/8344163/Mat-Kearney-tickets-Sun-Apr-18-2027-The-Fillmore-Charlotte | - |
| tm-mat-kearney-2027-washington-1a4zk49gkdhkrsu | Mat Kearney | refresh (applied) | 8344165 | https://www.ticketliquidator.com/tickets/8344165/Mat-Kearney-tickets-Thu-Apr-22-2027-Lincoln-Theatre-DC | - |
| tm-mat-kearney-2027-atlantic-city-vv1aezk48gkd-q-0n | Mat Kearney | refresh (applied) | 8344174 | https://www.ticketliquidator.com/tickets/8344174/Mat-Kearney-tickets-Fri-Apr-23-2027-Borgata-Music-Box | - |
| tm-mat-kearney-2027-portsmouth-z7r9jz1aa7s83 | Mat Kearney | refresh (applied) | 8344257 | https://www.ticketliquidator.com/tickets/8344257/Mat-Kearney-tickets-Mon-Apr-26-2027-The-Historic-Theater-at-The-Music-Hall | - |
| tm-mat-kearney-2027-new-york-vv16dzk44g3zauv5ea | Mat Kearney | refresh (applied) | 8344155 | https://www.ticketliquidator.com/tickets/8344155/Mat-Kearney-tickets-Tue-Apr-27-2027-Town-Hall-Theatre-NY | - |
| tm-mat-kearney-2027-portland-vv177z_fgkbwdmul | Mat Kearney | refresh (applied) | 8344175 | https://www.ticketliquidator.com/tickets/8344175/Mat-Kearney-tickets-Wed-Apr-28-2027-State-Theatre-ME | - |
| tm-mat-kearney-2027-mckees-rocks-1avbz_fgkh6lcsf | Mat Kearney | refresh (applied) | 8344177 | https://www.ticketliquidator.com/tickets/8344177/Mat-Kearney-tickets-Fri-Apr-30-2027-Roxian-Theatre | - |
| tm-mat-kearney-2027-cincinnati-16pzk48jvzacdggk | Mat Kearney | refresh (applied) | 8344179 | https://www.ticketliquidator.com/tickets/8344179/Mat-Kearney-tickets-Sat-May-1-2027-Taft-Theatre | - |
| tm-mat-kearney-2027-austin-z7r9jz1aa7t0p | Mat Kearney | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Mat Kearney; text: Mat Kearney Mat Kearney /tickets/8344157/Mat-Kearney-tickets-Fri-Aug-13-2027-ACL-Live-At-The-Moody-Theater Mat Kearney Mat Kearney ACL Live ) |
| tm-mat-kearney-2027-dallas-z7r9jz1aa7s_b | Mat Kearney | refresh (applied) | 8344158 | https://www.ticketliquidator.com/tickets/8344158/Mat-Kearney-tickets-Sat-Aug-14-2027-Majestic-Theatre-Dallas | - |
| tm-mat-kearney-2027-denver-g5vzz_44x-wom | Mat Kearney | refresh (applied) | 8344239 | https://www.ticketliquidator.com/tickets/8344239/Mat-Kearney-tickets-Tue-Aug-17-2027-Paramount-Theatre-Denver | - |
| tm-mat-kearney-2027-phoenix-1av0z_4gknhdgeg | Mat Kearney | refresh (applied) | 8344241 | https://www.ticketliquidator.com/tickets/8344241/Mat-Kearney-tickets-Thu-Aug-19-2027-The-Van-Buren | - |
| tm-mat-kearney-2027-san-diego-vvg1iz_fdgrqma | Mat Kearney | refresh (applied) | 8344243 | https://www.ticketliquidator.com/tickets/8344243/Mat-Kearney-tickets-Fri-Aug-20-2027-Humphreys-Concerts-By-The-Bay | - |
| tm-mat-kearney-2027-cerritos-vvg1iz_4z4bvmr | Mat Kearney | refresh (applied) | 8344244 | https://www.ticketliquidator.com/tickets/8344244/Mat-Kearney-tickets-Sat-Aug-21-2027-Cerritos-Center | - |
| tm-mat-kearney-2027-sacramento-g5vyz_4l700ei | Mat Kearney | refresh (applied) | 8344245 | https://www.ticketliquidator.com/tickets/8344245/Mat-Kearney-tickets-Tue-Aug-24-2027-Ace-of-Spades | - |
| tm-mat-kearney-2027-spokane-g5vzz_4p1-wsc | Mat Kearney | refresh (applied) | 8344247 | https://www.ticketliquidator.com/tickets/8344247/Mat-Kearney-tickets-Tue-Aug-31-2027-Knitting-Factory-Spokane | - |
| tm-mat-kearney-2027-boise-z7r9jz1aa7yr7 | Mat Kearney | refresh (applied) | 8344260 | https://www.ticketliquidator.com/tickets/8344260/Mat-Kearney-tickets-Wed-Sep-1-2027-Treefort-Music-Hall | - |
| tm-mat-kearney-2027-grand-junction-g5vzz_fmzp1a6 | Mat Kearney | refresh (applied) | 8344249 | https://www.ticketliquidator.com/tickets/8344249/Mat-Kearney-tickets-Fri-Sep-3-2027-The-Avalon-Theatre-CO | - |
| tm-mat-kearney-2027-madison-vv1a6zk48gkehsz0t | Mat Kearney | refresh (applied) | 8344250 | https://www.ticketliquidator.com/tickets/8344250/Mat-Kearney-tickets-Sat-Nov-6-2027-Orpheum-Theatre-Madison | - |
| tm-mat-kearney-2027-shipshewana-z7r9jz1aa7t8k | Mat Kearney | refresh (applied) | 8344159 | https://www.ticketliquidator.com/tickets/8344159/Mat-Kearney-tickets-Mon-Nov-8-2027-Blue-Gate-Performing-Arts-Center | - |
| tm-mat-kearney-2027-cleveland-vv1aazk4fgkdoxqwy | Mat Kearney | refresh (applied) | 8344251 | https://www.ticketliquidator.com/tickets/8344251/Mat-Kearney-tickets-Wed-Nov-10-2027-House-Of-Blues-Cleveland | - |
| tm-mat-kearney-2027-omaha-1aozk4kgkes-kce | Mat Kearney | refresh (applied) | 8344252 | https://www.ticketliquidator.com/tickets/8344252/Mat-Kearney-tickets-Fri-Nov-12-2027-Steelhouse-Omaha | - |
| tm-mat-kearney-2027-saint-louis-vv1kvovp4agag9idz | Mat Kearney | refresh (applied) | 8344253 | https://www.ticketliquidator.com/tickets/8344253/Mat-Kearney-tickets-Sat-Nov-13-2027-The-Pageant | - |
| tm-mat-kearney-2027-atlanta-vvg1zz_4golpzd | Mat Kearney | refresh (applied) | 8344254 | https://www.ticketliquidator.com/tickets/8344254/Mat-Kearney-tickets-Fri-Nov-19-2027-The-Tabernacle-GA | - |
| tm-haiden-henderson-2027-orlando-z7r9jz1aaevq0 | Haiden Henderson | refresh (applied) | 8284552 | https://www.ticketliquidator.com/tickets/8284552/Haiden-Henderson-tickets-Fri-Apr-16-2027-The-Beacham | - |
| tm-u2-2027-barcelona-z698xz2qz16vasca3z | U2 | refresh (applied) | 8357090 | https://www.ticketliquidator.com/tickets/8357090/U2-tickets-Thu-May-13-2027-Estadi-Olimpico-Lluis-Companys | - |
| tm-u2-2027-barcelona-z698xz2qz1kkzqe8t | U2 | refresh (applied) | 8357091 | https://www.ticketliquidator.com/tickets/8357091/U2-tickets-Sat-May-15-2027-Estadi-Olimpico-Lluis-Companys | - |
| tm-u2-2027-sevilla-z698xz2qz1k0efyqs | U2 | refresh (applied) | 8357092 | https://www.ticketliquidator.com/tickets/8357092/U2-tickets-Sat-May-22-2027-Estadio-La-Cartuja | - |
| tm-u2-2027-london-1adfz_4gkbq3_od | U2 | refresh (applied) | 8359327 | https://www.ticketliquidator.com/tickets/8359327/U2-tickets-Fri-Jun-25-2027-Tottenham-Hotspur-New-Stadium | - |
| tm-bon-jovi-2027-toronto-1avzz_4gki76ms5 | Bon Jovi | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bon-jovi-2027-south-bend-vv1kv8vp_zga5o3gv | Bon Jovi | refresh (applied) | 8356991 | https://www.ticketliquidator.com/tickets/8356991/Bon-Jovi-tickets-Sat-Oct-2-2027-Notre-Dame-Stadium | - |
| tm-dom-dolla-2027-miami-z7r9jz1aaavbz | Dom Dolla | refresh (applied) | 8360005 | https://www.ticketliquidator.com/tickets/8360005/Dom-Dolla-tickets-Thu-Dec-31-2026-Factory-Town | - |
| tm-rod-stewart-2027-hamburg-z698xzc2z16vxb1oag | Rod Stewart | none | - | - | no qualifying listing (complete catalog checked) |
| tm-katseye-2027-auckland-1ae8z_4gkwr-wk2 | KATSEYE | none | - | - | no qualifying listing (complete catalog checked) |
| tm-u2-2027-amsterdam-z698xzbpz1k7zpzb4 | U2 | refresh (applied) | 8359472 | https://www.ticketliquidator.com/tickets/8359472/U2-tickets-Fri-Jun-11-2027-Johan-Cruijff-Arena | - |
| tm-garth-brooks-2026-hamilton-1avzz_4gkr8gcov | Garth Brooks | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-interrupters-2027-glasgow-1adbz_4gkd6f167 | The Interrupters | none | - | - | no qualifying listing (complete catalog checked) |
| tm-too-many-zooz-2027-frisco-z7r9jz1aaeep4 | Too Many Zooz | refresh (applied) | 8284739 | https://www.ticketliquidator.com/tickets/8284739/Too-Many-Zooz-tickets-Thu-Mar-18-2027-10-Mile-Music-Hall | - |
| tm-fontaines-d-c-2027-asheville-z7r9jz1aae84b | Fontaines D.C. | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Fontaines D.C.; text: Fontaines D.C. Fontaines D.C. /tickets/8303819/Fontaines-DC-tickets-Thu-Oct-7-2027-Hellbender-by-The-Orange-Peel Fontaines D.C. Fontaines D.) |
| tm-warren-zeiders-2027-charlotte-z7r9jz1aaeb7u | Warren Zeiders | refresh (applied) | 8307501 | https://www.ticketliquidator.com/tickets/8307501/Warren-Zeiders-tickets-Sat-May-1-2027-Coyote-Joes-NC | - |
| tm-gorillaz-2026-ciudad-de-mexico-1av8z_4gkm7aqri | Gorillaz | none | - | - | no qualifying listing (complete catalog checked) |
| tm-zach-top-2027-thackerville-z7r9jz1aaaeap | Zach Top | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Zach Top; text: Zach Top Zach Top /tickets/8356214/Zach-Top-tickets-Sat-Mar-13-2027-Lucas-Oil-Live-At-WinStar-Casino Zach Top Zach Top Lucas Oil Live At Win) |
| tm-u2-2027-stockholm-z698xzq2z16vvejtvk | U2 | refresh (applied) | 8359466 | https://www.ticketliquidator.com/tickets/8359466/U2-tickets-Fri-Apr-30-2027-Strawberry-Arena | - |
| tm-kings-of-leon-2027-bristow-1ka8vp__gaurfu5 | Kings Of Leon | refresh (applied) | 8359338 | https://www.ticketliquidator.com/tickets/8359338/Kings-Of-Leon-tickets-Sat-May-8-2027-Jiffy-Lube-Live | - |
| tm-kings-of-leon-2027-philadelphia-vv1aezk4xgkdfbii2 | Kings Of Leon | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Kings of Leon & Band of Horses; text: Kings of Leon & Band of Horses Kings of Leon & Band of Horses /tickets/8359341/Kings-Of-Leon-tickets-Wed-May-12-2027-TD-Pavilion-at-The-Mann) |
| tm-kings-of-leon-2027-cuyahoga-falls-vv16azk4nouzac7agu | Kings Of Leon | refresh (applied) | 8359343 | https://www.ticketliquidator.com/tickets/8359343/Kings-Of-Leon-tickets-Fri-May-14-2027-Blossom-Music-Center | - |
| tm-kings-of-leon-2027-noblesville-vv1aazk4ngkdiu1bn | Kings Of Leon | refresh (applied) | 8359344 | https://www.ticketliquidator.com/tickets/8359344/Kings-Of-Leon-tickets-Sat-May-15-2027-Ruoff-Music-Center | - |
| tm-kings-of-leon-2027-grand-rapids-vv1afzk4xgkdurf5s | Kings Of Leon | refresh (applied) | 8359345 | https://www.ticketliquidator.com/tickets/8359345/Kings-Of-Leon-tickets-Tue-May-18-2027-Acrisure-Amphitheater | - |
| tm-kings-of-leon-2027-clarkston-vv1afzk4pgkdf_fbn | Kings Of Leon | refresh (applied) | 8359346 | https://www.ticketliquidator.com/tickets/8359346/Kings-Of-Leon-tickets-Sun-May-23-2027-Pine-Knob-Music-Theatre | - |
| tm-kings-of-leon-2027-bridgeport-g5vvz_pclhssb | Kings Of Leon | refresh (applied) | 8359347 | https://www.ticketliquidator.com/tickets/8359347/Kings-Of-Leon-tickets-Tue-May-25-2027-Hartford-HealthCare-Amphitheater | - |
| tm-kings-of-leon-2027-saratoga-springs-k7vgf_p52u5pn | Kings Of Leon | refresh (applied) | 8359348 | https://www.ticketliquidator.com/tickets/8359348/Kings-Of-Leon-tickets-Thu-May-27-2027-Albany-Med-Health-System-at-SPAC | - |
| tm-kings-of-leon-2027-bangor-vv1a8vpbygagbkh_ | Kings Of Leon | refresh (applied) | 8359349 | https://www.ticketliquidator.com/tickets/8359349/Kings-Of-Leon-tickets-Sat-May-29-2027-Maine-Savings-Amphitheater | - |
| tm-kings-of-leon-2027-bethel-k7vgf_pkjzmnn | Kings Of Leon | refresh (applied) | 8359350 | https://www.ticketliquidator.com/tickets/8359350/Kings-Of-Leon-tickets-Sun-May-30-2027-Bethel-Woods-Center-For-The-Arts | - |
| tm-kings-of-leon-2027-toronto-16vzz_poyg7venm | Kings Of Leon | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kings-of-leon-2027-shakopee-16-zk40-tza2vg27 | Kings Of Leon | refresh (applied) | 8359351 | https://www.ticketliquidator.com/tickets/8359351/Kings-Of-Leon-tickets-Sat-Jun-5-2027-Mystic-Lake-Amphitheatre-Shakopee | - |
| tm-kings-of-leon-2027-tinley-park-vv1kvzvpbygacp7l6 | Kings Of Leon | refresh (applied) | 8359352 | https://www.ticketliquidator.com/tickets/8359352/Kings-Of-Leon-tickets-Sun-Jun-6-2027-Credit-Union-1-Amphitheatre | - |
| tm-kings-of-leon-2027-west-valley-city-g5vzz_p2iqpnf | Kings Of Leon | refresh (applied) | 8359353 | https://www.ticketliquidator.com/tickets/8359353/Kings-Of-Leon-tickets-Sat-Sep-11-2027-Utah-First-Credit-Union-Amphitheatre | - |
| tm-kings-of-leon-2027-vancouver-16v7z_ppfg7nnqo | Kings Of Leon | refresh (applied) | 8359372 | https://www.ticketliquidator.com/tickets/8359372/Kings-Of-Leon-tickets-Tue-Sep-14-2027-Rogers-Arena | - |
| tm-kings-of-leon-2027-seattle-vvg1hz_p57x6w0 | Kings Of Leon | refresh (applied) | 8359354 | https://www.ticketliquidator.com/tickets/8359354/Kings-Of-Leon-tickets-Wed-Sep-15-2027-Climate-Pledge-Arena | - |
| tm-kings-of-leon-2027-mountain-view-g5vyz_p1j_6oc | Kings Of Leon | refresh (applied) | 8359355 | https://www.ticketliquidator.com/tickets/8359355/Kings-Of-Leon-tickets-Fri-Sep-17-2027-Shoreline-Amphitheatre-CA | - |
| tm-kings-of-leon-2027-inglewood-vv1aazk4ngkdyvvz_ | Kings Of Leon | refresh (applied) | 8359356 | https://www.ticketliquidator.com/tickets/8359356/Kings-Of-Leon-tickets-Sat-Sep-18-2027-The-Kia-Forum | - |
| tm-kings-of-leon-2027-phoenix-1a_zk4xgkewyfnx | Kings Of Leon | refresh (applied) | 8359358 | https://www.ticketliquidator.com/tickets/8359358/Kings-Of-Leon-tickets-Fri-Sep-24-2027-Talking-Stick-Resort-Amphitheatre | - |
| tm-kings-of-leon-2027-austin-g5diz_pk2f12g | Kings Of Leon | refresh (applied) | 8359359 | https://www.ticketliquidator.com/tickets/8359359/Kings-Of-Leon-tickets-Sun-Sep-26-2027-Moody-Center-ATX | - |
| tm-kings-of-leon-2027-fort-worth-vvg1yz_4lzyuso | Kings Of Leon | refresh (applied) | 8359360 | https://www.ticketliquidator.com/tickets/8359360/Kings-Of-Leon-tickets-Tue-Sep-28-2027-Ariat-Arena | - |
| tm-kings-of-leon-2027-alpharetta-vvg1zz_pch0zpt | Kings Of Leon | refresh (applied) | 8359361 | https://www.ticketliquidator.com/tickets/8359361/Kings-Of-Leon-tickets-Thu-Sep-30-2027-Ameris-Bank-Amphitheatre | - |
| tm-kings-of-leon-2027-orlando-1axzk40gkdkpvf2 | Kings Of Leon | refresh (applied) | 8359362 | https://www.ticketliquidator.com/tickets/8359362/Kings-Of-Leon-tickets-Fri-Oct-1-2027-Kia-Center | - |
| tm-kings-of-leon-2027-raleigh-g5evz_p3nejt5 | Kings Of Leon | refresh (applied) | 8359364 | https://www.ticketliquidator.com/tickets/8359364/Kings-Of-Leon-tickets-Sun-Oct-3-2027-Coastal-Credit-Union-Music-Park-at-Walnut-Creek | - |
| tm-kings-of-leon-2027-charlotte-g5evz_p5ab5ro | Kings Of Leon | refresh (applied) | 8359365 | https://www.ticketliquidator.com/tickets/8359365/Kings-Of-Leon-tickets-Wed-Oct-6-2027-Truliant-Amphitheater | - |
| tm-kings-of-leon-2027-franklin-g5viz_p28lhsa | Kings Of Leon | refresh (applied) | 8359366 | https://www.ticketliquidator.com/tickets/8359366/Kings-Of-Leon-tickets-Fri-Oct-8-2027-FirstBank-Amphitheater | - |
| tm-kings-of-leon-2027-cincinnati-1apzk4ngkdmfbs- | Kings Of Leon | refresh (applied) | 8359367 | https://www.ticketliquidator.com/tickets/8359367/Kings-Of-Leon-tickets-Tue-Oct-12-2027-The-Farmer-Music-Center | - |
| tm-kings-of-leon-2027-mansfield-vv1avzk40gkelbik2 | Kings Of Leon | refresh (applied) | 8359368 | https://www.ticketliquidator.com/tickets/8359368/Kings-Of-Leon-tickets-Thu-Oct-14-2027-Xfinity-Center-MA | - |
| tm-kings-of-leon-2027-new-york-g5diz_4_hy-cs | Kings Of Leon | refresh (applied) | 8359370 | https://www.ticketliquidator.com/tickets/8359370/Kings-Of-Leon-tickets-Fri-Oct-15-2027-Madison-Square-Garden | - |
| tm-mercyme-2027-johnson-city-z7r9jz1aa7mot | MercyMe | refresh (applied) | 8329958 | https://www.ticketliquidator.com/tickets/8329958/MercyMe-tickets-Sun-Apr-11-2027-Freedom-Hall-Civic-Center-TN | - |
| tm-gary-allan-2027-thackerville-z7r9jz1aaaz4v | Gary Allan | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Gary Allan; text: Gary Allan Gary Allan /tickets/8356182/Gary-Allan-tickets-Fri-Feb-12-2027-Lucas-Oil-Live-At-WinStar-Casino Gary Allan Gary Allan Lucas Oil L) |
| tm-meshuggah-2027-new-haven-z7r9jz1aa7t0i | Meshuggah | refresh (applied) | 8343270 | https://www.ticketliquidator.com/tickets/8343270/Meshuggah-tickets-Fri-Mar-5-2027-College-Street-Music-Hall | - |
| tm-breaking-benjamin-2027-cedar-rapids-vv1akzk49gkd1-vah | Breaking Benjamin | refresh (applied) | 8355679 | https://www.ticketliquidator.com/tickets/8355679/Breaking-Benjamin-tickets-Tue-Feb-16-2027-Alliant-Energy-PowerHouse | - |
| tm-breaking-benjamin-2027-kalamazoo-z7r9jz1aa7mr3 | Breaking Benjamin | refresh (applied) | 8355680 | https://www.ticketliquidator.com/tickets/8355680/Breaking-Benjamin-tickets-Thu-Feb-18-2027-Wings-Event-Center | - |
| tm-breaking-benjamin-2027-fort-wayne-vv1aazk4pgkde48xz | Breaking Benjamin | refresh (applied) | 8355681 | https://www.ticketliquidator.com/tickets/8355681/Breaking-Benjamin-tickets-Fri-Feb-19-2027-Allen-County-War-Memorial-Coliseum | - |
| tm-breaking-benjamin-2027-evansville-vv1aazk49gkengkxe | Breaking Benjamin | refresh (applied) | 8355682 | https://www.ticketliquidator.com/tickets/8355682/Breaking-Benjamin-tickets-Sat-Feb-20-2027-Ford-Center-IN | - |
| tm-breaking-benjamin-2027-peoria-vv1kvyvp4yga29pez | Breaking Benjamin | refresh (applied) | 8355683 | https://www.ticketliquidator.com/tickets/8355683/Breaking-Benjamin-tickets-Mon-Feb-22-2027-Carver-Arena-At-Peoria-Civic-Center | - |
| tm-breaking-benjamin-2027-louisville-1kaovp4zgaui0w6 | Breaking Benjamin | refresh (applied) | 8355684 | https://www.ticketliquidator.com/tickets/8355684/Breaking-Benjamin-tickets-Tue-Feb-23-2027-KFC-Yum-Center | - |
| tm-breaking-benjamin-2027-columbus-vv1aazk49gkeujesy | Breaking Benjamin | refresh (applied) | 8355685 | https://www.ticketliquidator.com/tickets/8355685/Breaking-Benjamin-tickets-Thu-Feb-25-2027-Nationwide-Arena | - |
| tm-breaking-benjamin-2027-university-park-vv1aezk4pgkdz5iak | Breaking Benjamin | refresh (applied) | 8355686 | https://www.ticketliquidator.com/tickets/8355686/Breaking-Benjamin-tickets-Fri-Feb-26-2027-Bryce-Jordan-Center | - |
| tm-breaking-benjamin-2027-uncasville-g5vvz_4l6n7hw | Breaking Benjamin | refresh (applied) | 8355687 | https://www.ticketliquidator.com/tickets/8355687/Breaking-Benjamin-tickets-Sun-Feb-28-2027-Mohegan-Sun-Arena-CT | - |
| tm-breaking-benjamin-2027-syracuse-k7vgf_4hgmiu3 | Breaking Benjamin | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Breaking Benjamin, Starset & P.O.D.; text: Breaking Benjamin, Starset & P.O.D. Breaking Benjamin, Starset & P.O.D. /tickets/8355688/Breaking-Benjamin-tickets-Tue-Mar-2-2027-Upstate-Me) |
| tm-breaking-benjamin-2027-albany-k7vgf_4lulxcj | Breaking Benjamin | refresh (applied) | 8355689 | https://www.ticketliquidator.com/tickets/8355689/Breaking-Benjamin-tickets-Wed-Mar-3-2027-MVP-Arena | - |
| tm-breaking-benjamin-2027-hershey-vv1aezk49gkesrlhe | Breaking Benjamin | refresh (applied) | 8355690 | https://www.ticketliquidator.com/tickets/8355690/Breaking-Benjamin-tickets-Fri-Mar-5-2027-Giant-Center | - |
| tm-breaking-benjamin-2027-charleston-1apzk49gkerktjo | Breaking Benjamin | refresh (applied) | 8355691 | https://www.ticketliquidator.com/tickets/8355691/Breaking-Benjamin-tickets-Sat-Mar-6-2027-Charleston-Coliseum-Convention-Center-Charleston | - |
| tm-breaking-benjamin-2027-greenville-g5evz_4bqa6if | Breaking Benjamin | refresh (applied) | 8355678 | https://www.ticketliquidator.com/tickets/8355678/Breaking-Benjamin-tickets-Mon-Mar-8-2027-Bon-Secours-Wellness-Arena | - |
| tm-breaking-benjamin-2027-savannah-vvg1zz_4hoixed | Breaking Benjamin | refresh (applied) | 8355692 | https://www.ticketliquidator.com/tickets/8355692/Breaking-Benjamin-tickets-Tue-Mar-9-2027-Enmarket-Arena | - |
| tm-breaking-benjamin-2027-atlantic-city-vv1aezk49gkdmxvx- | Breaking Benjamin | refresh (applied) | 8355693 | https://www.ticketliquidator.com/tickets/8355693/Breaking-Benjamin-tickets-Fri-Mar-12-2027-Ovation-Hall-at-Ocean-Resort-Casino | - |
| tm-feid-2027-orlando-1axzk4xgkdpcfe6 | FEID | refresh (applied) | 8359374 | https://www.ticketliquidator.com/tickets/8359374/Feid-tickets-Fri-Feb-5-2027-Kia-Center | - |
| tm-feid-2027-tampa-vvg1vz_p2nz_05 | FEID | refresh (applied) | 8359375 | https://www.ticketliquidator.com/tickets/8359375/Feid-tickets-Sat-Feb-6-2027-Benchmark-International-Arena | - |
| tm-feid-2027-miami-vvg1vz_p5_ebxl | FEID | refresh (applied) | 8359376 | https://www.ticketliquidator.com/tickets/8359376/Feid-tickets-Thu-Feb-11-2027-Kaseya-Center | - |
| tm-feid-2027-duluth-vvg1zz_p1ly9za | FEID | refresh (applied) | 8359379 | https://www.ticketliquidator.com/tickets/8359379/Feid-tickets-Thu-Feb-18-2027-Gas-South-Arena | - |
| tm-feid-2027-charlotte-g5evz_p1wkize | FEID | refresh (applied) | 8359380 | https://www.ticketliquidator.com/tickets/8359380/Feid-tickets-Sat-Feb-20-2027-Spectrum-Center | - |
| tm-feid-2027-boston-vv1a8vpbygagvprx | FEID | refresh (applied) | 8359381 | https://www.ticketliquidator.com/tickets/8359381/Feid-tickets-Tue-Feb-23-2027-TD-Garden | - |
| tm-feid-2027-washington-15vfz_ffz04-_ | FEID | refresh (applied) | 8359382 | https://www.ticketliquidator.com/tickets/8359382/Feid-tickets-Thu-Feb-25-2027-Capital-One-Arena | - |
| tm-feid-2027-philadelphia-1ayzk4pgkel60vj | FEID | refresh (applied) | 8359383 | https://www.ticketliquidator.com/tickets/8359383/Feid-tickets-Fri-Feb-26-2027-Xfinity-Mobile-Arena | - |
| tm-feid-2027-brooklyn-16dzz_p3og7m3pl | FEID | refresh (applied) | 8359386 | https://www.ticketliquidator.com/tickets/8359386/Feid-tickets-Wed-Mar-3-2027-Barclays-Center | - |
| tm-feid-2027-toronto-1a8zk4xgkenbgje | FEID | none | - | - | no qualifying listing (complete catalog checked) |
| tm-feid-2027-montreal-1ad7z_4gkd0zh9f | FEID | refresh (applied) | 8359414 | https://www.ticketliquidator.com/tickets/8359414/Feid-tickets-Sat-Mar-13-2027-Centre-Bell | - |
| tm-feid-2027-chicago-vv1a7zk4xgkdhjeow | FEID | refresh (applied) | 8359388 | https://www.ticketliquidator.com/tickets/8359388/Feid-tickets-Thu-Mar-18-2027-United-Center | - |
| tm-feid-2027-dallas-vvg1yz_pkmsn11 | FEID | refresh (applied) | 8359389 | https://www.ticketliquidator.com/tickets/8359389/Feid-tickets-Wed-Mar-24-2027-American-Airlines-Center | - |
| tm-feid-2027-austin-g5diz_pkrkhdd | FEID | refresh (applied) | 8359391 | https://www.ticketliquidator.com/tickets/8359391/Feid-tickets-Fri-Mar-26-2027-Moody-Center-ATX | - |
| tm-feid-2027-denver-g5vzz_pkrlpf6 | FEID | refresh (applied) | 8359392 | https://www.ticketliquidator.com/tickets/8359392/Feid-tickets-Wed-Mar-31-2027-Ball-Arena | - |
| tm-feid-2027-seattle-vvg1hz_pkvb_3- | FEID | refresh (applied) | 8359396 | https://www.ticketliquidator.com/tickets/8359396/Feid-tickets-Sun-Apr-4-2027-Climate-Pledge-Arena | - |
| tm-feid-2027-portland-vvg1hz_pckgfmh | FEID | refresh (applied) | 8359399 | https://www.ticketliquidator.com/tickets/8359399/Feid-tickets-Tue-Apr-6-2027-Moda-Center-at-the-Rose-Quarter | - |
| tm-feid-2027-sacramento-g5vyz_p5pdckj | FEID | refresh (applied) | 8359400 | https://www.ticketliquidator.com/tickets/8359400/Feid-tickets-Thu-Apr-8-2027-Golden-1-Center | - |
| tm-feid-2027-san-francisco-g5vyz_p1g3qkq | FEID | refresh (applied) | 8359401 | https://www.ticketliquidator.com/tickets/8359401/Feid-tickets-Sat-Apr-10-2027-Chase-Center | - |
| tm-feid-2027-san-jose-g5vyz_p5keuz1 | FEID | refresh (applied) | 8359402 | https://www.ticketliquidator.com/tickets/8359402/Feid-tickets-Sun-Apr-11-2027-SAP-Center | - |
| tm-feid-2027-fresno-g5vyz_pcewaox | FEID | refresh (applied) | 8359407 | https://www.ticketliquidator.com/tickets/8359407/Feid-tickets-Tue-Apr-13-2027-Save-Mart-Center | - |
| tm-feid-2027-phoenix-1a_zk4ngkd1yaxd | FEID | refresh (applied) | 8359408 | https://www.ticketliquidator.com/tickets/8359408/Feid-tickets-Thu-Apr-15-2027-Mortgage-Matchup-Center | - |
| tm-feid-2027-san-diego-vvg1iz_p2x3bok | FEID | refresh (applied) | 8359410 | https://www.ticketliquidator.com/tickets/8359410/Feid-tickets-Fri-Apr-23-2027-Pechanga-Arena-San-Diego | - |
| tm-feid-2027-anaheim-vv1aazk4ngkd1rclp | FEID | refresh (applied) | 8359411 | https://www.ticketliquidator.com/tickets/8359411/Feid-tickets-Sun-Apr-25-2027-Honda-Center | - |
| tm-feid-2027-inglewood-vv1aazk4ngkdggctr | FEID | refresh (applied) | 8359412 | https://www.ticketliquidator.com/tickets/8359412/Feid-tickets-Thu-Apr-29-2027-Intuit-Dome | - |
| tm-feid-2027-tlajomulco-de-zuniga-g5dvz_p310vkr | FEID | none | - | - | no qualifying listing (complete catalog checked) |
| tm-feid-2027-ciudad-de-mexico-1av8z_4gkti0z0z | FEID | none | - | - | no qualifying listing (complete catalog checked) |
| tm-raye-2027-bergen-z698xzb_z16vgzpeao | RAYE | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-boogie-wit-da-hoodie-2027-london-1agzk4ngkdo79wi | A Boogie Wit Da Hoodie | refresh (applied) | 8367044 | https://www.ticketliquidator.com/tickets/8367044/A-Boogie-Wit-Da-Hoodie-tickets-Wed-Jan-27-2027-O2-Arena-London | - |
| tm-a-boogie-wit-da-hoodie-2027-manchester-1amzk40gkdjyurt | A Boogie Wit Da Hoodie | refresh (applied) | 8361500 | https://www.ticketliquidator.com/tickets/8361500/A-Boogie-Wit-Da-Hoodie-tickets-Fri-Jan-29-2027-Co-Op-Live | - |
| tm-mariah-carey-2027-exeter-g5vhz_f0acb90 | Mariah Carey | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mariah-carey-2027-cardiff-g5vhz_feidjq8 | Mariah Carey | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mariah-carey-2027-scarborough-1agzk49gkd3hqbt | Mariah Carey | refresh (applied) | 8365855 | https://www.ticketliquidator.com/tickets/8365855/Mariah-Carey-tickets-Sat-Jul-3-2027-Scarborough-Open-Air-Theatre | - |
| tm-fall-out-boy-2027-praha-9-z698xzu0z16eepqfuf | Fall Out Boy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fall-out-boy-2027-assago-zg9rmiynyzf1fa | Fall Out Boy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fall-out-boy-2027-madrid-z698xz2qz1k83o_fe | Fall Out Boy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fall-out-boy-2027-brussels-z698xzg2z16vfjc3ef | Fall Out Boy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fall-out-boy-2027-glasgow-1kuovp_ega1oorm | Fall Out Boy | refresh (applied) | 8362652 | https://www.ticketliquidator.com/tickets/8362652/Fall-Out-Boy-tickets-Sun-May-30-2027-OVO-Hydro | - |
| tm-fall-out-boy-2027-dublin-1abzk4xgkdbhdty | Fall Out Boy | refresh (applied) | 8362653 | https://www.ticketliquidator.com/tickets/8362653/Fall-Out-Boy-tickets-Tue-Jun-1-2027-3Arena-Dublin | - |
| tm-fall-out-boy-2027-manchester-1amzk4pgkdukzs6 | Fall Out Boy | refresh (applied) | 8362654 | https://www.ticketliquidator.com/tickets/8362654/Fall-Out-Boy-tickets-Thu-Jun-3-2027-Co-Op-Live | - |
| tm-fall-out-boy-2027-london-1adfz_4gkxmx9xa | Fall Out Boy | refresh (applied) | 8362655 | https://www.ticketliquidator.com/tickets/8362655/Fall-Out-Boy-tickets-Sat-Jun-5-2027-Tottenham-Hotspur-New-Stadium | - |
| tm-fall-out-boy-2027-amsterdam-z698xzbpz16vv-vwva | Fall Out Boy | refresh (applied) | 8365871 | https://www.ticketliquidator.com/tickets/8365871/Fall-Out-Boy-tickets-Tue-Jun-8-2027-Ziggo-Dome | - |
| tm-fall-out-boy-2027-odz-z698xzqpz16evyz9fj | Fall Out Boy | refresh (applied) | 8365877 | https://www.ticketliquidator.com/tickets/8365877/Fall-Out-Boy-tickets-Sun-Jun-13-2027-Atlas-Arena | - |
| tm-fall-out-boy-2027-arlington-vvg1yz_potb4m0 | Fall Out Boy | refresh (applied) | 8362630 | https://www.ticketliquidator.com/tickets/8362630/Fall-Out-Boy-tickets-Tue-Jul-13-2027-Globe-Life-Field | - |
| tm-fall-out-boy-2027-atlanta-vvg1zz_pkn5gmk | Fall Out Boy | refresh (applied) | 8362632 | https://www.ticketliquidator.com/tickets/8362632/Fall-Out-Boy-tickets-Fri-Jul-16-2027-Truist-Park | - |
| tm-fall-out-boy-2027-washington-1avfz_4gkhvu21c | Fall Out Boy | refresh (applied) | 8362634 | https://www.ticketliquidator.com/tickets/8362634/Fall-Out-Boy-tickets-Sun-Jul-18-2027-Nationals-Park | - |
| tm-fall-out-boy-2027-detroit-vv1afzk4jgkdvw4eb | Fall Out Boy | refresh (applied) | 8362635 | https://www.ticketliquidator.com/tickets/8362635/Fall-Out-Boy-tickets-Tue-Jul-20-2027-Fifth-Third-Park-MI | - |
| tm-fall-out-boy-2027-toronto-1a8zk40gkdutc4w | Fall Out Boy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fall-out-boy-2027-chicago-vv118z_pqp44qd | Fall Out Boy | refresh (applied) | 8362636 | https://www.ticketliquidator.com/tickets/8362636/Fall-Out-Boy-tickets-Sat-Jul-24-2027-Soldier-Field | - |
| tm-fall-out-boy-2027-boston-vv1avzk4ngkenvma1 | Fall Out Boy | refresh (applied) | 8362638 | https://www.ticketliquidator.com/tickets/8362638/Fall-Out-Boy-tickets-Fri-Jul-30-2027-Fenway-Park | - |
| tm-fall-out-boy-2027-queens-g5vvz_pkqtkyp | Fall Out Boy | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch; listing: Fall Out Boy, The Offspring, Good Charlotte & The Story So Far; text: Fall Out Boy, The Offspring, Good Charlotte & The Story So Far Fall Out Boy, The Offspring, Good Charlotte & The Story So Far /tickets/83626) |
| tm-fall-out-boy-2027-atlantic-city-vv1aezk4pgkdw5r4k | Fall Out Boy | refresh (applied) | 8362640 | https://www.ticketliquidator.com/tickets/8362640/Fall-Out-Boy-tickets-Tue-Aug-3-2027-Atlantic-City-Beach | - |
| tm-fall-out-boy-2027-hershey-vv1aezk40gkd_hdkn | Fall Out Boy | refresh (applied) | 8362641 | https://www.ticketliquidator.com/tickets/8362641/Fall-Out-Boy-tickets-Wed-Aug-4-2027-Hersheypark-Stadium | - |
| tm-fall-out-boy-2027-kansas-city-1a-zk40gkd1psok | Fall Out Boy | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch; listing: Fall Out Boy, The Offspring, Good Charlotte & The Story So Far; text: Fall Out Boy, The Offspring, Good Charlotte & The Story So Far Fall Out Boy, The Offspring, Good Charlotte & The Story So Far /tickets/83626) |
| tm-fall-out-boy-2027-commerce-city-g5vzz_p3slsmj | Fall Out Boy | refresh (applied) | 8362643 | https://www.ticketliquidator.com/tickets/8362643/Fall-Out-Boy-tickets-Tue-Aug-10-2027-Dicks-Sporting-Goods-Park | - |
| tm-fall-out-boy-2027-san-francisco-g5vyz_p3s9d3l | Fall Out Boy | refresh (applied) | 8362646 | https://www.ticketliquidator.com/tickets/8362646/Fall-Out-Boy-tickets-Sun-Aug-15-2027-Oracle-Park | - |
| tm-fall-out-boy-2027-san-diego-vvg1iz_pc9ifhq | Fall Out Boy | refresh (applied) | 8362647 | https://www.ticketliquidator.com/tickets/8362647/Fall-Out-Boy-tickets-Tue-Aug-17-2027-Petco-Park | - |
| tm-fall-out-boy-2027-phoenix-1a_zk4xgkdxdu-e | Fall Out Boy | refresh (applied) | 8362648 | https://www.ticketliquidator.com/tickets/8362648/Fall-Out-Boy-tickets-Thu-Aug-19-2027-Chase-Field | - |
| tm-fall-out-boy-2027-los-angeles-vvg1iz_p4zt_kr | Fall Out Boy | refresh (applied) | 8362649 | https://www.ticketliquidator.com/tickets/8362649/Fall-Out-Boy-tickets-Sat-Aug-21-2027-UNIQLO-Field-at-Dodger-Stadium | - |
| tm-fall-out-boy-2027-portland-z7r9jz1aaaa0k | Fall Out Boy | refresh (applied) | 8362651 | https://www.ticketliquidator.com/tickets/8362651/Fall-Out-Boy-tickets-Thu-Aug-26-2027-Providence-Park | - |
| tm-the-dead-south-2027-london-g5dzz_gjibvci | The Dead South | refresh (applied) | 8324861 | https://www.ticketliquidator.com/tickets/8324861/The-Dead-South-tickets-Fri-Mar-5-2027-O2-Academy-Brixton | - |
| tm-the-dead-south-2027-manchester-17u8v0g6gm8i6t0 | The Dead South | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-dead-south-2027-wolverhampton-g5vhz_2b_qppl | The Dead South | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-dead-south-2027-cardiff-17uov0g6gpgz4uf | The Dead South | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-dead-south-2027-dublin-17kzv0g6gpgt8iq | The Dead South | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-dead-south-2027-dublin-17kzv0g6gpgtyir | The Dead South | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-dead-south-2027-silver-spring-1avfz_4gktp2lu0 | The Dead South | refresh (applied) | 8361963 | https://www.ticketliquidator.com/tickets/8361963/The-Dead-South-tickets-Mon-Apr-19-2027-The-Fillmore-Silver-Spring | - |
| tm-the-dead-south-2027-saint-louis-16e7z_pf4g7neqx | The Dead South | refresh (applied) | 8361928 | https://www.ticketliquidator.com/tickets/8361928/The-Dead-South-tickets-Tue-Apr-27-2027-The-Factory-Chesterfield | - |
| tm-the-dead-south-2027-kansas-city-vv1akzk40gkemk2eh | The Dead South | refresh (applied) | 8361930 | https://www.ticketliquidator.com/tickets/8361930/The-Dead-South-tickets-Wed-Apr-28-2027-GrindersKC | - |
| tm-the-dead-south-2027-lexington-1avbz_4gku2y0tx | The Dead South | refresh (applied) | 8352785 | https://www.ticketliquidator.com/tickets/8352785/The-Dead-South-tickets-Fri-Apr-30-2027-The-Rail-KY | - |
| tm-the-dead-south-2027-nashville-g5viz_p3okygx | The Dead South | refresh (applied) | 8361931 | https://www.ticketliquidator.com/tickets/8361931/The-Dead-South-tickets-Sat-May-1-2027-The-Truth | - |
| tm-the-dead-south-2027-vancouver-1k78vpbzgacmkgo | The Dead South | refresh (applied) | 8361932 | https://www.ticketliquidator.com/tickets/8361932/The-Dead-South-tickets-Thu-Sep-23-2027-Malkin-Bowl-Stanley-Park | - |
| tm-the-dead-south-2027-kelowna-z7r9jz1aa7moa | The Dead South | refresh (applied) | 8361934 | https://www.ticketliquidator.com/tickets/8361934/The-Dead-South-tickets-Fri-Sep-24-2027-Prospera-Place | - |
| tm-the-dead-south-2027-calgary-1aozk4xgkd6z6-j | The Dead South | refresh (applied) | 8361936 | https://www.ticketliquidator.com/tickets/8361936/The-Dead-South-tickets-Sat-Sep-25-2027-Grey-Eagle-Resort-Casino | - |
| tm-the-dead-south-2027-edmonton-1aozk4ngkemvpah | The Dead South | refresh (applied) | 8361937 | https://www.ticketliquidator.com/tickets/8361937/The-Dead-South-tickets-Sun-Sep-26-2027-Edmonton-EXPO | - |
| tm-the-dead-south-2027-toronto-1a8zk4pgkexzbc2 | The Dead South | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-dead-south-2027-montreal-1kg8vpbigaujeuh | The Dead South | refresh (applied) | 8361941 | https://www.ticketliquidator.com/tickets/8361941/The-Dead-South-tickets-Fri-Oct-1-2027-MTelus | - |
| tm-the-dead-south-2027-montreal-1kg8vpbigaujwul | The Dead South | refresh (applied) | 8361942 | https://www.ticketliquidator.com/tickets/8361942/The-Dead-South-tickets-Sat-Oct-2-2027-MTelus | - |
| tm-the-dead-south-2027-ottawa-1aszk40gkda6px7 | The Dead South | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-dead-south-2027-thunder-bay-1avzz_4gkumrenk | The Dead South | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-dead-south-2027-winnipeg-16ozk4nosza5dc55 | The Dead South | refresh (applied) | 8361946 | https://www.ticketliquidator.com/tickets/8361946/The-Dead-South-tickets-Thu-Oct-7-2027-Burton-Cummings-Theatre | - |
| tm-alan-walker-2027-atlanta-vvg1zz_3cjp_wx | Alan Walker | refresh (applied) | 8363054 | https://www.ticketliquidator.com/tickets/8363054/Alan-Walker-tickets-Fri-Jan-29-2027-Coca-Cola-Roxy | - |
| tm-alan-walker-2027-st-petersburg-vvg1vz_phftijy | Alan Walker | none | - | - | no qualifying listing (complete catalog checked) |
| tm-alan-walker-2027-orlando-1axzk4vgkeuzkdw | Alan Walker | refresh (applied) | 8363708 | https://www.ticketliquidator.com/tickets/8363708/Alan-Walker-tickets-Thu-Feb-4-2027-House-Of-Blues-Orlando | - |
| tm-dylan-gossett-2027-nottingham-g5vhz_ph339p8 | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dylan-gossett-2027-bournemouth-g5dzz_pjb4swt | Dylan Gossett | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stray-kids-2027-seattle-vvg1hz_pf4iifz | Stray Kids | refresh (applied) | 8361510 | https://www.ticketliquidator.com/tickets/8361510/Stray-Kids-tickets-Sun-May-16-2027-Lumen-Field | - |
| tm-stray-kids-2027-vancouver-1aozk4pgkepqkay | Stray Kids | refresh (applied) | 8361523 | https://www.ticketliquidator.com/tickets/8361523/Stray-Kids-tickets-Wed-May-19-2027-BC-Place-Stadium | - |
| tm-stray-kids-2027-santa-clara-g5vyz_p1srtgv | Stray Kids | refresh (applied) | 8361511 | https://www.ticketliquidator.com/tickets/8361511/Stray-Kids-tickets-Sat-May-22-2027-Levis-Stadium | - |
| tm-stray-kids-2027-san-diego-vvg1iz_plbqdhe | Stray Kids | refresh (applied) | 8361512 | https://www.ticketliquidator.com/tickets/8361512/Stray-Kids-tickets-Tue-May-25-2027-Petco-Park | - |
| tm-stray-kids-2027-inglewood-vvg1iz_4slsivl | Stray Kids | refresh (applied) | 8361513 | https://www.ticketliquidator.com/tickets/8361513/Stray-Kids-tickets-Sat-May-29-2027-SoFi-Stadium | - |
| tm-stray-kids-2027-houston-g5diz_p4wwnf8 | Stray Kids | refresh (applied) | 8361515 | https://www.ticketliquidator.com/tickets/8361515/Stray-Kids-tickets-Sat-Jun-5-2027-Reliant-Stadium | - |
| tm-stray-kids-2027-atlanta-vvg1zz_phzq3g7 | Stray Kids | refresh (applied) | 8361516 | https://www.ticketliquidator.com/tickets/8361516/Stray-Kids-tickets-Tue-Jun-8-2027-Mercedes-Benz-Stadium | - |
| tm-stray-kids-2027-miami-vvg1vz_ppnraxv | Stray Kids | refresh (applied) | 8361517 | https://www.ticketliquidator.com/tickets/8361517/Stray-Kids-tickets-Fri-Jun-11-2027-Hard-Rock-Stadium | - |
| tm-stray-kids-2027-orlando-1axzk40gkdehatj | Stray Kids | refresh (applied) | 8361518 | https://www.ticketliquidator.com/tickets/8361518/Stray-Kids-tickets-Mon-Jun-14-2027-Camping-World-Stadium | - |
| tm-stray-kids-2027-chicago-vv1a7zk4ngkdhgi8m | Stray Kids | refresh (applied) | 8361519 | https://www.ticketliquidator.com/tickets/8361519/Stray-Kids-tickets-Fri-Jun-18-2027-Soldier-Field | - |
| tm-stray-kids-2027-toronto-1avzz_4gkdmari8 | Stray Kids | none | - | - | no qualifying listing (complete catalog checked) |
| tm-stray-kids-2027-east-rutherford-k7vgf_pcnx6a9 | Stray Kids | refresh (applied) | 8361522 | https://www.ticketliquidator.com/tickets/8361522/Stray-Kids-tickets-Tue-Jun-29-2027-MetLife-Stadium | - |
| tm-stray-kids-2027-munich-z698xzc2z1kazaygz | Stray Kids | refresh (applied) | 8361528 | https://www.ticketliquidator.com/tickets/8361528/Stray-Kids-tickets-Sat-Jul-17-2027-Allianz-Arena | - |
| tm-stray-kids-2027-vienna-z698xz5rz16vofpore | Stray Kids | refresh (applied) | 8381436 | https://www.ticketliquidator.com/tickets/8381436/Stray-Kids-tickets-Wed-Jul-21-2027-Ernst-Happel-Stadium | - |
| tm-stray-kids-2027-barcelona-z698xz2qz16vod48ea | Stray Kids | refresh (applied) | 8381437 | https://www.ticketliquidator.com/tickets/8381437/Stray-Kids-tickets-Sat-Jul-24-2027-Estadi-Olimpico-Lluis-Companys | - |
| tm-stray-kids-2027-arnhem-z698xzbpz1k4kc30n | Stray Kids | refresh (applied) | 8381438 | https://www.ticketliquidator.com/tickets/8381438/Stray-Kids-tickets-Tue-Jul-27-2027-Gelredome | - |
| tm-mumford-sons-2027-milwaukee-vv1a6zk40gkdo7krz | Mumford & Sons | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Mumford & Sons; text: Mumford & Sons Mumford & Sons /tickets/8361876/Mumford-Sons-tickets-Fri-Jul-9-2027-American-Family-Insurance-Amphitheater Mumford & Sons Mum) |
| tm-mumford-sons-2027-calgary-1aozk4pgkd1yzsk | Mumford & Sons | refresh (applied) | 8361979 | https://www.ticketliquidator.com/tickets/8361979/Mumford-Sons-tickets-Mon-Jul-12-2027-Scotiabank-Saddledome | - |
| tm-zach-top-2027-george-vvg1hz_p3_wpdn | Zach Top | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch; listing: Zach Top & The Red Clay Strays; text: Zach Top & The Red Clay Strays Zach Top & The Red Clay Strays /tickets/8362409/Zach-Top-tickets-Fri-Jul-2-2027-Gorge-Amphitheatre Zach Top &) |
| tm-karan-aujla-2027-chicago-vv1a7zk40gkewyzkr | Karan Aujla | refresh (applied) | 8362140 | https://www.ticketliquidator.com/tickets/8362140/Karan-Aujla-tickets-Sat-Feb-13-2027-United-Center | - |
| tm-bryan-adams-2027-niagara-falls-16vzz_p36g7nu6g | Bryan Adams | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dropkick-murphys-2027-lexington-1apzk48gkdukuzi | Dropkick Murphys | refresh (applied) | 8363728 | https://www.ticketliquidator.com/tickets/8363728/Dropkick-Murphys-tickets-Tue-Feb-23-2027-The-Rail-KY | - |
| tm-marc-anthony-2027-toronto-1avzz_fgkd8tkbf | Marc Anthony | none | - | - | no qualifying listing (complete catalog checked) |
| tm-marc-anthony-2027-montreal-1aszk4vgkd9di_a | Marc Anthony | refresh (applied) | 8361889 | https://www.ticketliquidator.com/tickets/8361889/Marc-Anthony-tickets-Sun-Apr-4-2027-Centre-Bell | - |
| tm-marc-anthony-2027-brooklyn-1kgzvponga5jat7 | Marc Anthony | refresh (applied) | 8361877 | https://www.ticketliquidator.com/tickets/8361877/Marc-Anthony-tickets-Thu-Apr-8-2027-Barclays-Center | - |
| tm-marc-anthony-2027-reading-vv17fz_fgkxhnllx | Marc Anthony | refresh (applied) | 8361878 | https://www.ticketliquidator.com/tickets/8361878/Marc-Anthony-tickets-Sat-Apr-10-2027-Santander-Arena | - |
| tm-marc-anthony-2027-newark-vv1aezk44gkdq27w- | Marc Anthony | refresh (applied) | 8361879 | https://www.ticketliquidator.com/tickets/8361879/Marc-Anthony-tickets-Thu-Apr-15-2027-Prudential-Center | - |
| tm-marc-anthony-2027-chicago-vv1a7zk48gkervqur | Marc Anthony | refresh (applied) | 8361880 | https://www.ticketliquidator.com/tickets/8361880/Marc-Anthony-tickets-Sat-Apr-17-2027-United-Center | - |
| tm-marc-anthony-2027-charlotte-g5evz_flstq5b | Marc Anthony | refresh (applied) | 8361881 | https://www.ticketliquidator.com/tickets/8361881/Marc-Anthony-tickets-Fri-Apr-23-2027-Spectrum-Center | - |
| tm-marc-anthony-2027-tampa-vvg1vz_fqozpda | Marc Anthony | refresh (applied) | 8361882 | https://www.ticketliquidator.com/tickets/8361882/Marc-Anthony-tickets-Sun-Apr-25-2027-Benchmark-International-Arena | - |
| tm-marc-anthony-2027-san-antonio-g5diz_fdkjtum | Marc Anthony | refresh (applied) | 8361884 | https://www.ticketliquidator.com/tickets/8361884/Marc-Anthony-tickets-Thu-Apr-29-2027-Frost-Bank-Center | - |
| tm-marc-anthony-2027-anaheim-vv170z_fgkmcohlk | Marc Anthony | refresh (applied) | 8361885 | https://www.ticketliquidator.com/tickets/8361885/Marc-Anthony-tickets-Sun-May-9-2027-Honda-Center | - |
| tm-marc-anthony-2027-denver-g5vzz_fdioiid | Marc Anthony | refresh (applied) | 8361886 | https://www.ticketliquidator.com/tickets/8361886/Marc-Anthony-tickets-Thu-May-13-2027-Ball-Arena | - |
| tm-marc-anthony-2027-san-francisco-g5vyz_4uwqlns | Marc Anthony | refresh (applied) | 8361887 | https://www.ticketliquidator.com/tickets/8361887/Marc-Anthony-tickets-Sun-May-16-2027-Chase-Center | - |
| tm-air-supply-2027-wallingford-g5vvz_4snzvtx | Air Supply | refresh (applied) | 8361965 | https://www.ticketliquidator.com/tickets/8361965/Air-Supply-tickets-Sun-Jan-31-2027-Toyota-Oakdale-Theatre | - |
| tm-air-supply-2027-valley-center-vvg1iz_p3nhurb | Air Supply | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Air Supply; text: Air Supply Air Supply /tickets/8363053/Air-Supply-tickets-Fri-Feb-12-2027-Harrahs-Southern-California-Casino-Resort Air Supply Air Supply Ha) |
| tm-the-avett-brothers-2027-orlando-1axzk4egkex8si1 | The Avett Brothers | refresh (applied) | 8367474 | https://www.ticketliquidator.com/tickets/8367474/The-Avett-Brothers-tickets-Fri-Mar-19-2027-House-Of-Blues-Orlando | - |
| tm-the-avett-brothers-2027-orlando-1axzk4egkexosiu | The Avett Brothers | correct (applied) | 8367246 | https://www.ticketliquidator.com/tickets/8367246/The-Avett-Brothers-tickets-Sat-Mar-20-2027-House-Of-Blues-Orlando | - |
| tm-death-cab-for-cutie-2027-harrisburg-vv1aezk4tgkdmrriv | Death Cab for Cutie | refresh (applied) | 8366152 | https://www.ticketliquidator.com/tickets/8366152/Death-Cab-for-Cutie-tickets-Fri-Aug-6-2027-Riverfront-Park-Harrisburg | - |
| tm-sienna-spiro-2027-dublin-1avoz_4gkuvegeh | Sienna Spiro | refresh (applied) | 8365895 | https://www.ticketliquidator.com/tickets/8365895/Sienna-Spiro-tickets-Wed-Jun-16-2027-Fairview-Park | - |
| tm-daughtry-2027-columbus-vv1ffz_pq6pszd2kv | Daughtry | refresh (applied) | 8363950 | https://www.ticketliquidator.com/tickets/8363950/Daughtry-tickets-Wed-Feb-24-2027-Mershon-Auditorium-At-Wexner-Center-For-The-Arts | - |
| tm-noah-kahan-2027-detroit-vv1koz_pjag7zyra | Noah Kahan | refresh (applied) | 8364611 | https://www.ticketliquidator.com/tickets/8364611/Noah-Kahan-tickets-Wed-Jun-9-2027-Ford-Field | - |
| tm-noah-kahan-2027-east-rutherford-k7vgf_pevlzwu | Noah Kahan | refresh (applied) | 8364184 | https://www.ticketliquidator.com/tickets/8364184/Noah-Kahan-tickets-Sat-Jun-19-2027-MetLife-Stadium | - |
| tm-journey-2027-stateline-1kayvp_vgacrke8 | Journey | refresh (applied) | 8365092 | https://www.ticketliquidator.com/tickets/8365092/Journey-tickets-Wed-Apr-21-2027-Tahoe-Blue-Event-Center | - |
| tm-journey-2027-stateline-1kayvp_vgacljep | Journey | refresh (applied) | 8365093 | https://www.ticketliquidator.com/tickets/8365093/Journey-tickets-Fri-Apr-23-2027-Tahoe-Blue-Event-Center | - |
| tm-leon-bridges-2027-honolulu-vvg1iz_4bdasgg | Leon Bridges | refresh (applied) | 8372143 | https://www.ticketliquidator.com/tickets/8372143/Leon-Bridges-tickets-Sat-Feb-20-2027-Neal-S-Blaisdell-Center-Tom-Moffatt-Waikiki-Shell | - |
| tm-los-tigres-del-norte-2027-lincoln-g5vyz_ph5-cbb | Los Tigres del Norte | refresh (applied) | 8365425 | https://www.ticketliquidator.com/tickets/8365425/Los-Tigres-del-Norte-tickets-Fri-Feb-19-2027-The-Venue-At-Thunder-Valley-Casino-Resort | - |
| tm-billy-strings-2027-tampa-vvg1vz_pkwq5nj | Billy Strings | refresh (applied) | 8363802 | https://www.ticketliquidator.com/tickets/8363802/Billy-Strings-tickets-Tue-Apr-6-2027-Benchmark-International-Arena | - |
| tm-billy-strings-2027-north-charleston-g5evz_pjlgein | Billy Strings | correct (applied) | 8363806 | https://www.ticketliquidator.com/tickets/8363806/Billy-Strings-tickets-Fri-Apr-16-2027-North-Charleston-Coliseum | - |
| tm-billy-strings-2027-north-charleston-g5evz_pjcaeyp | Billy Strings | refresh (applied) | 8363808 | https://www.ticketliquidator.com/tickets/8363808/Billy-Strings-tickets-Sat-Apr-17-2027-North-Charleston-Coliseum | - |
| tm-billy-strings-2027-greenville-g5evz_perum8k | Billy Strings | refresh (applied) | 8363810 | https://www.ticketliquidator.com/tickets/8363810/Billy-Strings-tickets-Wed-Apr-21-2027-Bon-Secours-Wellness-Arena | - |
| tm-billy-strings-2027-greensboro-g5evz_pk9bhy8 | Billy Strings | correct (applied) | 8363819 | https://www.ticketliquidator.com/tickets/8363819/Billy-Strings-tickets-Fri-Apr-23-2027-First-Horizon-Coliseum-At-Greensboro-Complex | - |
| tm-billy-strings-2027-greensboro-g5evz_pjyy_fv | Billy Strings | refresh (applied) | 8363820 | https://www.ticketliquidator.com/tickets/8363820/Billy-Strings-tickets-Sat-Apr-24-2027-First-Horizon-Coliseum-At-Greensboro-Complex | - |
| tm-billy-strings-2027-birmingham-1aozk4tgkd5-7_e | Billy Strings | correct (applied) | 8363832 | https://www.ticketliquidator.com/tickets/8363832/Billy-Strings-tickets-Fri-Jun-4-2027-Legacy-Arena-at-The-BJCC | - |
| tm-billy-strings-2027-birmingham-1aozk4tgkd5x7_7 | Billy Strings | refresh (applied) | 8363833 | https://www.ticketliquidator.com/tickets/8363833/Billy-Strings-tickets-Sat-Jun-5-2027-Legacy-Arena-at-The-BJCC | - |
| tm-billy-strings-2027-saint-louis-vv1kvovpq_ga29ugj | Billy Strings | correct (applied) | 8365030 | https://www.ticketliquidator.com/tickets/8365030/Billy-Strings-tickets-Thu-Jun-10-2027-Chaifetz-Arena | - |
| tm-billy-strings-2027-saint-louis-vv1akzk4tgkdq3l2w | Billy Strings | refresh (applied) | 8363847 | https://www.ticketliquidator.com/tickets/8363847/Billy-Strings-tickets-Fri-Jun-11-2027-Chaifetz-Arena | - |
| tm-feid-2027-ciudad-de-mexico-1av8z_4gkti0zp7 | FEID | none | - | - | no qualifying listing (complete catalog checked) |
| tm-fall-out-boy-2027-seattle-vvg1hz_p5fubur | Fall Out Boy | refresh (applied) | 8362650 | https://www.ticketliquidator.com/tickets/8362650/Fall-Out-Boy-tickets-Tue-Aug-24-2027-T-Mobile-Park | - |
| tm-garth-brooks-2026-minneapolis-z7r9jz1aaaagg | Garth Brooks | refresh (applied) | 8359855 | https://www.ticketliquidator.com/tickets/8359855/Garth-Brooks-tickets-Sat-Dec-12-2026-Target-Center | - |
| tm-chris-stassy-2027-west-footscray-1apzk4fgket404h | Chris Stassy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mumford-sons-2027-st-john-s-z7r9jz1aaakg4 | Mumford & Sons | refresh (applied) | 8372803 | https://www.ticketliquidator.com/tickets/8372803/Churchill-Park-Music-Festival-tickets-Sat-Jul-17-2027-Churchill-Park | - |
| tm-garth-brooks-2027-north-little-rock-g5viz_ploilrd | Garth Brooks | refresh (applied) | 8366616 | https://www.ticketliquidator.com/tickets/8366616/Garth-Brooks-tickets-Fri-Feb-5-2027-Simmons-Bank-Arena | - |
| tm-garth-brooks-2027-north-little-rock-g5viz_plkwtt5 | Garth Brooks | refresh (applied) | 8366617 | https://www.ticketliquidator.com/tickets/8366617/Garth-Brooks-tickets-Sat-Feb-6-2027-Simmons-Bank-Arena | - |
| tm-garth-brooks-2027-belfast-1adoz_pgkmhjvms | Garth Brooks | none | - | - | no qualifying listing (complete catalog checked) |
| tm-u2-2027-sevilla-z698xz2qz16vfkj0zb | U2 | refresh (applied) | 8369572 | https://www.ticketliquidator.com/tickets/8369572/U2-tickets-Mon-May-24-2027-Estadio-La-Cartuja | - |
| tm-feid-2027-brooklyn-1ayzk4tgkdul9aj | FEID | refresh (applied) | 8367266 | https://www.ticketliquidator.com/tickets/8367266/Feid-tickets-Thu-Mar-4-2027-Barclays-Center | - |
| tm-the-dead-south-2027-regina-z7r9jz1aaakfg | The Dead South | refresh (applied) | 8361971 | https://www.ticketliquidator.com/tickets/8361971/The-Dead-South-tickets-Sat-Oct-9-2027-Conexus-Arts-Centre | - |
| tm-morgan-wallen-2027-tampa-vvg1vz_p0fzneo | Morgan Wallen | refresh (applied) | 8367161 | https://www.ticketliquidator.com/tickets/8367161/Morgan-Wallen-tickets-Fri-Jun-11-2027-Raymond-James-Stadium | - |
| tm-morgan-wallen-2027-tampa-vvg1vz_pl9zvgh | Morgan Wallen | refresh (applied) | 8367162 | https://www.ticketliquidator.com/tickets/8367162/Morgan-Wallen-tickets-Sat-Jun-12-2027-Raymond-James-Stadium | - |
| tm-morgan-wallen-2027-foxborough-vv177z_4gkthgswc | Morgan Wallen | refresh (applied) | 8367163 | https://www.ticketliquidator.com/tickets/8367163/Morgan-Wallen-tickets-Fri-Jun-25-2027-Gillette-Stadium | - |
| tm-morgan-wallen-2027-foxborough-vv177z_pgki9euav | Morgan Wallen | refresh (applied) | 8367164 | https://www.ticketliquidator.com/tickets/8367164/Morgan-Wallen-tickets-Sat-Jun-26-2027-Gillette-Stadium | - |
| tm-morgan-wallen-2027-orchard-park-vv1fgz_pjac8zdu62 | Morgan Wallen | refresh (applied) | 8367165 | https://www.ticketliquidator.com/tickets/8367165/Morgan-Wallen-tickets-Fri-Jul-23-2027-New-Highmark-Stadium | - |
| tm-morgan-wallen-2027-orchard-park-vv16dzk4txkza2vufv | Morgan Wallen | refresh (applied) | 8367166 | https://www.ticketliquidator.com/tickets/8367166/Morgan-Wallen-tickets-Sat-Jul-24-2027-New-Highmark-Stadium | - |
| tm-morgan-wallen-2027-columbus-vv1aazk4tgkdvhpe8 | Morgan Wallen | refresh (applied) | 8367167 | https://www.ticketliquidator.com/tickets/8367167/Morgan-Wallen-tickets-Fri-Aug-6-2027-Ohio-Stadium | - |
| tm-morgan-wallen-2027-columbus-vv17fz_pgkneyw0- | Morgan Wallen | refresh (applied) | 8367168 | https://www.ticketliquidator.com/tickets/8367168/Morgan-Wallen-tickets-Sat-Aug-7-2027-Ohio-Stadium | - |
| tm-tame-impala-2027-tulsa-1aozk4jgkexpfxk | Tame Impala | refresh (applied) | 8367606 | https://www.ticketliquidator.com/tickets/8367606/Tame-Impala-tickets-Wed-Feb-10-2027-BOK-Center | - |
| tm-tame-impala-2027-tlajomulco-de-zuniga-g5dvz_pmifp7m | Tame Impala | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch; listing: Tame Impala; text: Tame Impala Tame Impala /tickets/8387050/Tame-Impala-tickets-Tue-Feb-23-2027-Arena-VFG Tame Impala Tame Impala Arena VFG 44630 CONCERTS Carr) |
| tm-tame-impala-2027-ciudad-de-mexico-1av8z_pgknd3rue | Tame Impala | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tame-impala-2027-ciudad-de-mexico-1av8z_pgklvjvrt | Tame Impala | none | - | - | no qualifying listing (complete catalog checked) |
| tm-andrea-bocelli-2027-portici-napoli-zg9rmiynyzf176 | Andrea Bocelli | none | - | - | no qualifying listing (complete catalog checked) |
| tm-andrea-bocelli-2027-pollenzo-cuneo-zg9rmiynyzf17f | Andrea Bocelli | none | - | - | no qualifying listing (complete catalog checked) |
| tm-noah-kahan-2027-athens-z7r9jz1aa7wgt | Noah Kahan | refresh (applied) | 8347741 | https://www.ticketliquidator.com/tickets/8347741/Noah-Kahan-tickets-Sat-Apr-24-2027-Sanford-Stadium | - |
| tm-noah-kahan-2027-nashville-z7r9jz1aa7wuk | Noah Kahan | refresh (applied) | 8347744 | https://www.ticketliquidator.com/tickets/8347744/Noah-Kahan-tickets-Tue-May-4-2027-New-Nissan-Stadium | - |
| tm-noah-kahan-2027-norman-z7r9jz1aa7wuw | Noah Kahan | refresh (applied) | 8347746 | https://www.ticketliquidator.com/tickets/8347746/Noah-Kahan-tickets-Sun-May-9-2027-Memorial-Stadium-Oklahoma | - |
| tm-noah-kahan-2027-austin-z7r9jz1aa7wob | Noah Kahan | refresh (applied) | 8347748 | https://www.ticketliquidator.com/tickets/8347748/Noah-Kahan-tickets-Sat-May-15-2027-Darrell-K-Royal-Texas-Memorial-Stadium | - |
| tm-noah-kahan-2027-madison-z7r9jz1aa7w8x | Noah Kahan | refresh (applied) | 8347751 | https://www.ticketliquidator.com/tickets/8347751/Noah-Kahan-tickets-Wed-May-26-2027-Camp-Randall-Stadium | - |
| tm-noah-kahan-2027-boston-z7r9jz1aa7wo7 | Noah Kahan | refresh (applied) | 8347752 | https://www.ticketliquidator.com/tickets/8347752/Noah-Kahan-tickets-Sat-May-29-2027-Fenway-Park | - |
| tm-noah-kahan-2027-boston-z7r9jz1aa7wof | Noah Kahan | refresh (applied) | 8347753 | https://www.ticketliquidator.com/tickets/8347753/Noah-Kahan-tickets-Sun-May-30-2027-Fenway-Park | - |
| tm-noah-kahan-2027-boston-z7r9jz1aa7wo4 | Noah Kahan | refresh (applied) | 8347754 | https://www.ticketliquidator.com/tickets/8347754/Noah-Kahan-tickets-Tue-Jun-1-2027-Fenway-Park | - |
| tm-noah-kahan-2027-boston-z7r9jz1aa7wo9 | Noah Kahan | refresh (applied) | 8347755 | https://www.ticketliquidator.com/tickets/8347755/Noah-Kahan-tickets-Wed-Jun-2-2027-Fenway-Park | - |
| tm-phoebe-bridgers-2027-portland-vvg1hz_pjbo4da | Phoebe Bridgers | refresh (applied) | 8367336 | https://www.ticketliquidator.com/tickets/8367336/Phoebe-Bridgers-tickets-Wed-Feb-17-2027-Moda-Center-at-the-Rose-Quarter | - |
| tm-phoebe-bridgers-2027-spokane-z7r9jz1aaa8z4 | Phoebe Bridgers | refresh (applied) | 8367354 | https://www.ticketliquidator.com/tickets/8367354/Phoebe-Bridgers-tickets-Thu-Feb-18-2027-Numerica-Veterans-Arena | - |
| tm-phoebe-bridgers-2027-edmonton-1aozk4jgkd7ky7- | Phoebe Bridgers | refresh (applied) | 8367349 | https://www.ticketliquidator.com/tickets/8367349/Phoebe-Bridgers-tickets-Sat-Feb-20-2027-Rogers-Place | - |
| tm-phoebe-bridgers-2027-winnipeg-1av7z_pgknuq0xy | Phoebe Bridgers | refresh (applied) | 8367350 | https://www.ticketliquidator.com/tickets/8367350/Phoebe-Bridgers-tickets-Tue-Feb-23-2027-Canada-Life-Centre | - |
| tm-phoebe-bridgers-2027-kansas-city-z7r9jz1aaa8zp | Phoebe Bridgers | refresh (applied) | 8367390 | https://www.ticketliquidator.com/tickets/8367390/Phoebe-Bridgers-tickets-Fri-Feb-26-2027-T-Mobile-Center | - |
| tm-phoebe-bridgers-2027-oklahoma-city-z7r9jz1aaa8z9 | Phoebe Bridgers | refresh (applied) | 8367391 | https://www.ticketliquidator.com/tickets/8367391/Phoebe-Bridgers-tickets-Sun-Feb-28-2027-Paycom-Center | - |
| tm-phoebe-bridgers-2027-lincoln-z7r9jz1aaa8zb | Phoebe Bridgers | refresh (applied) | 8367392 | https://www.ticketliquidator.com/tickets/8367392/Phoebe-Bridgers-tickets-Tue-Mar-2-2027-Pinnacle-Bank-Arena | - |
| tm-phoebe-bridgers-2027-milwaukee-vv1kjz_pjpg7y3tm | Phoebe Bridgers | refresh (applied) | 8367338 | https://www.ticketliquidator.com/tickets/8367338/Phoebe-Bridgers-tickets-Thu-Mar-4-2027-Fiserv-Forum | - |
| tm-phoebe-bridgers-2027-grand-rapids-z7r9jz1aaa8z_ | Phoebe Bridgers | refresh (applied) | 8367393 | https://www.ticketliquidator.com/tickets/8367393/Phoebe-Bridgers-tickets-Sat-Mar-6-2027-Van-Andel-Arena | - |
| tm-phoebe-bridgers-2027-cleveland-z7r9jz1aaa8zo | Phoebe Bridgers | refresh (applied) | 8367394 | https://www.ticketliquidator.com/tickets/8367394/Phoebe-Bridgers-tickets-Sun-Mar-7-2027-Rocket-Arena | - |
| tm-phoebe-bridgers-2027-raleigh-g5evz_pekwioi | Phoebe Bridgers | refresh (applied) | 8367339 | https://www.ticketliquidator.com/tickets/8367339/Phoebe-Bridgers-tickets-Tue-Mar-9-2027-Lenovo-Center | - |
| tm-phoebe-bridgers-2027-baltimore-1a4zk4jgkdbmyfh | Phoebe Bridgers | refresh (applied) | 8367340 | https://www.ticketliquidator.com/tickets/8367340/Phoebe-Bridgers-tickets-Wed-Mar-10-2027-CFG-Bank-Arena | - |
| tm-phoebe-bridgers-2027-pittsburgh-1kaovpqdgaugc_p | Phoebe Bridgers | refresh (applied) | 8367341 | https://www.ticketliquidator.com/tickets/8367341/Phoebe-Bridgers-tickets-Fri-Mar-12-2027-PPG-Paints-Arena | - |
| tm-phoebe-bridgers-2027-newark-vv17fz_pgkrzlrgr | Phoebe Bridgers | refresh (applied) | 8367342 | https://www.ticketliquidator.com/tickets/8367342/Phoebe-Bridgers-tickets-Tue-Mar-16-2027-Prudential-Center | - |
| tm-phoebe-bridgers-2027-university-park-vv1aovp_uga2cx87 | Phoebe Bridgers | refresh (applied) | 8367343 | https://www.ticketliquidator.com/tickets/8367343/Phoebe-Bridgers-tickets-Fri-Mar-19-2027-Bryce-Jordan-Center | - |
| tm-phoebe-bridgers-2027-hamilton-168zk4eqbza5ddga | Phoebe Bridgers | none | - | - | no qualifying listing (complete catalog checked) |
| tm-phoebe-bridgers-2027-montreal-1aszk4jgkd6dpxr | Phoebe Bridgers | refresh (applied) | 8367352 | https://www.ticketliquidator.com/tickets/8367352/Phoebe-Bridgers-tickets-Tue-Mar-23-2027-Centre-Bell | - |
| tm-phoebe-bridgers-2027-kanata-1kg8vp_fga54way | Phoebe Bridgers | none | - | - | no qualifying listing (complete catalog checked) |
| tm-phoebe-bridgers-2027-tampa-vvg1vz_pnorv0s | Phoebe Bridgers | refresh (applied) | 8367345 | https://www.ticketliquidator.com/tickets/8367345/Phoebe-Bridgers-tickets-Thu-Apr-22-2027-Benchmark-International-Arena | - |
| tm-phoebe-bridgers-2027-miami-vvg1vz_phkzg-0 | Phoebe Bridgers | refresh (applied) | 8367346 | https://www.ticketliquidator.com/tickets/8367346/Phoebe-Bridgers-tickets-Sat-Apr-24-2027-Kaseya-Center | - |
| tm-phoebe-bridgers-2027-orlando-1axzk4jgkenbxsj | Phoebe Bridgers | refresh (applied) | 8367347 | https://www.ticketliquidator.com/tickets/8367347/Phoebe-Bridgers-tickets-Tue-Apr-27-2027-Kia-Center | - |
| tm-phoebe-bridgers-2027-san-antonio-g5diz_peugmcn | Phoebe Bridgers | refresh (applied) | 8367348 | https://www.ticketliquidator.com/tickets/8367348/Phoebe-Bridgers-tickets-Tue-May-4-2027-Frost-Bank-Center | - |
| tm-phoebe-bridgers-2027-ciudad-de-mexico-1afzk4egkey1bcx | Phoebe Bridgers | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-boogie-wit-da-hoodie-2027-manchester-1adjz_pgkwcxzvj | A Boogie Wit Da Hoodie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-u2-2027-barcelona-z698xz2qz16ezagpe7 | U2 | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sam-fender-2027-boston-vv1k7z_pbvg7sogy | Sam Fender | refresh (applied) | 8367764 | https://www.ticketliquidator.com/tickets/8367764/Sam-Fender-tickets-Tue-Apr-20-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-sam-fender-2027-new-york-g5dyz_pnxxsdo | Sam Fender | refresh (applied) | 8367765 | https://www.ticketliquidator.com/tickets/8367765/Sam-Fender-tickets-Thu-Apr-22-2027-Radio-City-Music-Hall | - |
| tm-sam-fender-2027-toronto-1avzz_pgkl1qlzt | Sam Fender | none | - | - | no qualifying listing (complete catalog checked) |
| tm-sam-fender-2027-tempe-1av0z_pgkrzfigp | Sam Fender | refresh (applied) | 8367767 | https://www.ticketliquidator.com/tickets/8367767/Sam-Fender-tickets-Sat-May-1-2027-Mullett-Arena | - |
| tm-sam-fender-2027-los-angeles-vv170z_pgklllved | Sam Fender | refresh (applied) | 8367768 | https://www.ticketliquidator.com/tickets/8367768/Sam-Fender-tickets-Mon-May-3-2027-Greek-Theatre-Los-Angeles-CA | - |
| tm-sam-fender-2027-seattle-vvg1hz_pmbc1yg | Sam Fender | refresh (applied) | 8367769 | https://www.ticketliquidator.com/tickets/8367769/Sam-Fender-tickets-Fri-May-7-2027-Wamu-Theater-At-Lumen-Field-Event-Center | - |
| tm-sam-fender-2027-vancouver-16ozk4ekdza2k2ve | Sam Fender | refresh (applied) | 8367771 | https://www.ticketliquidator.com/tickets/8367771/Sam-Fender-tickets-Sun-May-9-2027-Rogers-Arena | - |
| tm-feid-2027-hartford-z7r9jz1aaad3z | FEID | refresh (applied) | 8359385 | https://www.ticketliquidator.com/tickets/8359385/Feid-tickets-Sun-Feb-28-2027-PeoplesBank-Arena | - |
| tm-feid-2027-houston-z7r9jz1aaad3v | FEID | refresh (applied) | 8359390 | https://www.ticketliquidator.com/tickets/8359390/Feid-tickets-Thu-Mar-25-2027-Toyota-Center-TX | - |
| tm-feid-2027-salt-lake-city-z7r9jz1aaad3e | FEID | refresh (applied) | 8359393 | https://www.ticketliquidator.com/tickets/8359393/Feid-tickets-Fri-Apr-2-2027-Delta-Center | - |
| tm-feid-2027-las-vegas-z7r9jz1aaad3d | FEID | refresh (applied) | 8359409 | https://www.ticketliquidator.com/tickets/8359409/Feid-tickets-Sat-Apr-17-2027-MGM-Grand-Garden-Arena | - |
| tm-fall-out-boy-2027-manchester-1adjz_pgkrptysy | Fall Out Boy | refresh (applied) | 8373062 | https://www.ticketliquidator.com/tickets/8373062/Fall-Out-Boy-tickets-Sun-Jun-6-2027-Co-Op-Live | - |
| tm-fall-out-boy-2027-nashville-z7r9jz1aaaa0d | Fall Out Boy | refresh (applied) | 8362637 | https://www.ticketliquidator.com/tickets/8362637/Fall-Out-Boy-tickets-Tue-Jul-27-2027-FirstBank-Stadium | - |
| tm-fall-out-boy-2027-saint-charles-z7r9jz1aaakz9 | Fall Out Boy | refresh (applied) | 8362657 | https://www.ticketliquidator.com/tickets/8362657/Fall-Out-Boy-tickets-Fri-Aug-6-2027-Roaming-Hills | - |
| tm-fall-out-boy-2027-sandy-z7r9jz1aaaa0a | Fall Out Boy | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Fall Out Boy, The Offspring, Good Charlotte & The Story So Far; text: Fall Out Boy, The Offspring, Good Charlotte & The Story So Far Fall Out Boy, The Offspring, Good Charlotte & The Story So Far /tickets/83626) |
| tm-feid-2027-ciudad-de-mexico-1av8z_4gktipbpa | FEID | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kpop-demon-hunters-2027-baltimore-1a4zk40gkdlc1yp | KPop Demon Hunters | correct (applied) | 8369575 | https://www.ticketliquidator.com/tickets/8369575/KPOP-Demon-Hunters-tickets-Sat-Jun-5-2027-CFG-Bank-Arena | - |
| tm-kpop-demon-hunters-2027-newark-vv1aezk4pgkd6oqqp | KPop Demon Hunters | correct (applied) | 8369577 | https://www.ticketliquidator.com/tickets/8369577/KPOP-Demon-Hunters-tickets-Sat-Jun-12-2027-Prudential-Center | - |
| tm-kpop-demon-hunters-2027-columbus-vv1aazk4pgkdbhbjx | KPop Demon Hunters | refresh (applied) | 8369579 | https://www.ticketliquidator.com/tickets/8369579/KPOP-Demon-Hunters-tickets-Wed-Jun-16-2027-Value-City-Arena-at-The-Schottenstein-Center | - |
| tm-kpop-demon-hunters-2027-chicago-vv1k8z_pb3g7s3vy | KPop Demon Hunters | correct (applied) | 8369580 | https://www.ticketliquidator.com/tickets/8369580/KPOP-Demon-Hunters-tickets-Sat-Jun-19-2027-United-Center | - |
| tm-kpop-demon-hunters-2027-indianapolis-vv1aazk40gkes_m63 | KPop Demon Hunters | refresh (applied) | 8369582 | https://www.ticketliquidator.com/tickets/8369582/KPOP-Demon-Hunters-tickets-Wed-Jun-23-2027-Gainbridge-Fieldhouse | - |
| tm-kpop-demon-hunters-2027-hamilton-1avzz_pgknnsz0d | KPop Demon Hunters | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kpop-demon-hunters-2027-belmont-park-1kgzvpbsgagectc | KPop Demon Hunters | refresh (applied) | 8369583 | https://www.ticketliquidator.com/tickets/8369583/KPOP-Demon-Hunters-tickets-Tue-Jun-29-2027-UBS-Arena | - |
| tm-kpop-demon-hunters-2027-belmont-park-1kgzvpbsgag7qt4 | KPop Demon Hunters | refresh (applied) | 8369584 | https://www.ticketliquidator.com/tickets/8369584/KPOP-Demon-Hunters-tickets-Wed-Jun-30-2027-UBS-Arena | - |
| tm-kpop-demon-hunters-2027-pittsburgh-1apzk4pgkedzz2s | KPop Demon Hunters | correct (applied) | 8369626 | https://www.ticketliquidator.com/tickets/8369626/KPOP-Demon-Hunters-tickets-Sat-Jul-3-2027-PPG-Paints-Arena | - |
| tm-kpop-demon-hunters-2027-charlotte-g5evz_p39bkd- | KPop Demon Hunters | refresh (applied) | 8369586 | https://www.ticketliquidator.com/tickets/8369586/KPOP-Demon-Hunters-tickets-Wed-Jul-7-2027-Spectrum-Center | - |
| tm-kpop-demon-hunters-2027-atlanta-vvg1zz_p9cj0zu | KPop Demon Hunters | correct (applied) | 8369587 | https://www.ticketliquidator.com/tickets/8369587/KPOP-Demon-Hunters-tickets-Sat-Jul-10-2027-State-Farm-Arena-GA | - |
| tm-kpop-demon-hunters-2027-orlando-1axzk4jgkdj4ft4 | KPop Demon Hunters | correct (applied) | 8369589 | https://www.ticketliquidator.com/tickets/8369589/KPOP-Demon-Hunters-tickets-Sat-Jul-17-2027-Kia-Center | - |
| tm-kpop-demon-hunters-2027-dallas-vvg1yz_pqm-6ap | KPop Demon Hunters | refresh (applied) | 8369592 | https://www.ticketliquidator.com/tickets/8369592/KPOP-Demon-Hunters-tickets-Tue-Jul-20-2027-American-Airlines-Center | - |
| tm-kpop-demon-hunters-2027-dallas-vvg1yz_pqmd65i | KPop Demon Hunters | refresh (applied) | 8369593 | https://www.ticketliquidator.com/tickets/8369593/KPOP-Demon-Hunters-tickets-Wed-Jul-21-2027-American-Airlines-Center | - |
| tm-kpop-demon-hunters-2027-phoenix-16v0z_pj9g7lsu3 | KPop Demon Hunters | correct (applied) | 8369596 | https://www.ticketliquidator.com/tickets/8369596/KPOP-Demon-Hunters-tickets-Sat-Jul-24-2027-Mortgage-Matchup-Center | - |
| tm-kpop-demon-hunters-2027-tacoma-vvg1hz_p9ckjih | KPop Demon Hunters | correct (applied) | 8369598 | https://www.ticketliquidator.com/tickets/8369598/KPOP-Demon-Hunters-tickets-Sat-Aug-14-2027-Tacoma-Dome | - |
| tm-kpop-demon-hunters-2027-amsterdam-z698xzbpz16v0ozyff | KPop Demon Hunters | refresh (applied) | 8369607 | https://www.ticketliquidator.com/tickets/8369607/KPOP-Demon-Hunters-tickets-Wed-Sep-8-2027-Ziggo-Dome | - |
| tm-kpop-demon-hunters-2027-amsterdam-z698xzbpz1krbj60f | KPop Demon Hunters | refresh (applied) | 8369608 | https://www.ticketliquidator.com/tickets/8369608/KPOP-Demon-Hunters-tickets-Thu-Sep-9-2027-Ziggo-Dome | - |
| tm-kpop-demon-hunters-2027-fornebu-z698xzb_z1k-p0apk | KPop Demon Hunters | correct (applied) | 8369611 | https://www.ticketliquidator.com/tickets/8369611/KPOP-Demon-Hunters-tickets-Sat-Sep-25-2027-Unity-Arena | - |
| tm-kpop-demon-hunters-2027-brussels-z698xzg2z1kup-z3o | KPop Demon Hunters | correct (applied) | 8369614 | https://www.ticketliquidator.com/tickets/8369614/KPOP-Demon-Hunters-tickets-Sat-Oct-2-2027-ING-Arena | - |
| tm-kpop-demon-hunters-2027-dublin-1avoz_pgksg3dqw | KPop Demon Hunters | correct (applied) | 8369617 | https://www.ticketliquidator.com/tickets/8369617/KPOP-Demon-Hunters-tickets-Sat-Oct-9-2027-3Arena-Dublin | - |
| tm-kpop-demon-hunters-2027-glasgow-1adbz_pgkrybqvg | KPop Demon Hunters | refresh (applied) | 8369645 | https://www.ticketliquidator.com/tickets/8369645/KPOP-Demon-Hunters-tickets-Tue-Oct-12-2027-OVO-Hydro | - |
| tm-kpop-demon-hunters-2027-birmingham-1aegz_pgkm7p-do | KPop Demon Hunters | conflict | - | - | ambiguous: missing or conflicting performance start evidence; candidates: 8369619 @ no start time ("KPop Demon Hunters Golden World Tour"), 8369620 @ no start time ("KPop Demon Hunters Golden World Tour") |
| tm-kpop-demon-hunters-2027-london-1adfz_pgkm7wjw0 | KPop Demon Hunters | refresh (applied) | 8369622 | https://www.ticketliquidator.com/tickets/8369622/KPOP-Demon-Hunters-tickets-Fri-Oct-22-2027-O2-Arena-London | - |
| tm-kpop-demon-hunters-2027-london-1adfz_pgkmklpyh | KPop Demon Hunters | correct (applied) | 8369623 | https://www.ticketliquidator.com/tickets/8369623/KPOP-Demon-Hunters-tickets-Sat-Oct-23-2027-O2-Arena-London | - |
| tm-the-rankin-family-2027-edmonton-1k78vpbmga2hetj | The Rankin Family | refresh (applied) | 8370370 | https://www.ticketliquidator.com/tickets/8370370/The-Rankin-Family-tickets-Fri-Mar-12-2027-Northern-Alberta-Jubilee-Auditorium | - |
| tm-the-rankin-family-2027-calgary-1k78vpbmgac53nm | The Rankin Family | refresh (applied) | 8370534 | https://www.ticketliquidator.com/tickets/8370534/The-Rankin-Family-tickets-Sat-Mar-13-2027-Southern-Alberta-Jubilee-Auditorium | - |
| tm-the-rankin-family-2027-winnipeg-1aozk4ngkerkp1s | The Rankin Family | refresh (applied) | 8372058 | https://www.ticketliquidator.com/tickets/8372058/The-Rankin-Family-tickets-Mon-Mar-15-2027-Burton-Cummings-Theatre | - |
| tm-the-rankin-family-2027-thunder-bay-1a8zk40gkd5kq6z | The Rankin Family | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-rankin-family-2027-ottawa-1aszk4ngkdjouzs | The Rankin Family | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-rankin-family-2027-niagara-falls-1a8zk40gkdzuhrm | The Rankin Family | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-rankin-family-2027-montreal-1aszk40gkdkmkar | The Rankin Family | refresh (applied) | 8370341 | https://www.ticketliquidator.com/tickets/8370341/The-Rankin-Family-tickets-Mon-Mar-29-2027-Theatre-Beanfield | - |
| tm-the-rankin-family-2027-moncton-1aszk4pgkeuypli | The Rankin Family | refresh (applied) | 8372070 | https://www.ticketliquidator.com/tickets/8372070/The-Rankin-Family-tickets-Tue-Mar-30-2027-Molson-Canadian-Centre-at-Casino-New-Brunswick | - |
| tm-the-rankin-family-2027-halifax-16szk4poezacdevv | The Rankin Family | refresh (applied) | 8370417 | https://www.ticketliquidator.com/tickets/8370417/The-Rankin-Family-tickets-Thu-Apr-1-2027-Scotiabank-Centre | - |
| tm-the-rankin-family-2027-sydney-1aszk4pgkd5nkwf | The Rankin Family | refresh (applied) | 8372071 | https://www.ticketliquidator.com/tickets/8372071/The-Rankin-Family-tickets-Sat-Apr-3-2027-Centre-200 | - |
| tm-alan-walker-2027-jacksonville-z7r9jz1aaakpn | Alan Walker | refresh (applied) | 8366348 | https://www.ticketliquidator.com/tickets/8366348/Alan-Walker-tickets-Tue-Feb-2-2027-FIVE | - |
| tm-kevin-gates-2026-richmond-z7r9jz1aaao8v | Kevin Gates | refresh (applied) | 8346068 | https://www.ticketliquidator.com/tickets/8346068/JBEG-MLK-Classic-tickets-Sun-Jan-17-2027-Altria-Theater-Richmond | - |
| tm-phoebe-bridgers-2026-forest-brussels-z698xzg2z16vai_vps | Phoebe Bridgers | refresh (applied) | 8090636 | https://www.ticketliquidator.com/tickets/8090636/Phoebe-Bridgers-tickets-Sat-Dec-5-2026-Vorst-Nationaal | - |
| tm-alex-warren-2027-oklahoma-city-vvg1yz_pm_4u36 | Alex Warren | refresh (applied) | 8369843 | https://www.ticketliquidator.com/tickets/8369843/Alex-Warren-tickets-Mon-Apr-5-2027-Paycom-Center | - |
| tm-alex-warren-2027-north-little-rock-g5viz_pi6umuc | Alex Warren | refresh (applied) | 8369845 | https://www.ticketliquidator.com/tickets/8369845/Alex-Warren-tickets-Tue-Apr-6-2027-Simmons-Bank-Arena | - |
| tm-alex-warren-2027-hollywood-vvg1vz_pwf7u4q | Alex Warren | refresh (applied) | 8369846 | https://www.ticketliquidator.com/tickets/8369846/Alex-Warren-tickets-Fri-Apr-9-2027-Hard-Rock-Live-At-The-Seminole-Hard-Rock-Hotel-Casino-Hollywood | - |
| tm-alex-warren-2027-orlando-1aefz_pgkm4kktv | Alex Warren | refresh (applied) | 8369847 | https://www.ticketliquidator.com/tickets/8369847/Alex-Warren-tickets-Sat-Apr-10-2027-Kia-Center | - |
| tm-alex-warren-2027-tampa-vvg1vz_prcolqy | Alex Warren | refresh (applied) | 8369848 | https://www.ticketliquidator.com/tickets/8369848/Alex-Warren-tickets-Mon-Apr-12-2027-Benchmark-International-Arena | - |
| tm-alex-warren-2027-jacksonville-1aefz_pgkwxdf59 | Alex Warren | refresh (applied) | 8369849 | https://www.ticketliquidator.com/tickets/8369849/Alex-Warren-tickets-Tue-Apr-13-2027-VyStar-Veterans-Memorial-Arena | - |
| tm-alex-warren-2027-knoxville-g5viz_pcmddpz | Alex Warren | refresh (applied) | 8369850 | https://www.ticketliquidator.com/tickets/8369850/Alex-Warren-tickets-Thu-Apr-15-2027-Thompson-Boling-Arena-at-Food-City-Center | - |
| tm-alex-warren-2027-louisville-1avbz_pgkm-pfx2 | Alex Warren | refresh (applied) | 8369851 | https://www.ticketliquidator.com/tickets/8369851/Alex-Warren-tickets-Fri-Apr-16-2027-KFC-Yum-Center | - |
| tm-alex-warren-2027-saint-louis-vv17bz_pgkm394lj | Alex Warren | refresh (applied) | 8369852 | https://www.ticketliquidator.com/tickets/8369852/Alex-Warren-tickets-Sun-Apr-18-2027-Enterprise-Center | - |
| tm-alex-warren-2027-sioux-falls-vv17bz_pgknvdnah | Alex Warren | refresh (applied) | 8369854 | https://www.ticketliquidator.com/tickets/8369854/Alex-Warren-tickets-Wed-Apr-21-2027-Denny-Sanford-Premier-Center | - |
| tm-alex-warren-2027-winnipeg-1av7z_pgkwqqal2 | Alex Warren | refresh (applied) | 8369857 | https://www.ticketliquidator.com/tickets/8369857/Alex-Warren-tickets-Fri-Apr-23-2027-Canada-Life-Centre | - |
| tm-alex-warren-2027-grand-rapids-vv17oz_pgkrvt515 | Alex Warren | refresh (applied) | 8369859 | https://www.ticketliquidator.com/tickets/8369859/Alex-Warren-tickets-Mon-Apr-26-2027-Van-Andel-Arena | - |
| tm-alex-warren-2027-columbus-vv17fz_pgkrmanar | Alex Warren | refresh (applied) | 8369861 | https://www.ticketliquidator.com/tickets/8369861/Alex-Warren-tickets-Wed-Apr-28-2027-Nationwide-Arena | - |
| tm-alex-warren-2027-hamilton-1avzz_pgkiu_f3b | Alex Warren | none | - | - | no qualifying listing (complete catalog checked) |
| tm-alex-warren-2027-kanata-1aszk4jgkdqmz4o | Alex Warren | none | - | - | no qualifying listing (complete catalog checked) |
| tm-alex-warren-2027-quebec-1ad7z_pgkmtnafk | Alex Warren | refresh (applied) | 8369867 | https://www.ticketliquidator.com/tickets/8369867/Alex-Warren-tickets-Sun-May-2-2027-Centre-Videotron | - |
| tm-alex-warren-2027-albany-k7vgf_prpg3o4 | Alex Warren | refresh (applied) | 8369868 | https://www.ticketliquidator.com/tickets/8369868/Alex-Warren-tickets-Tue-May-4-2027-MVP-Arena | - |
| tm-alex-warren-2027-belmont-park-1adzz_pgkmwcbz2 | Alex Warren | refresh (applied) | 8369869 | https://www.ticketliquidator.com/tickets/8369869/Alex-Warren-tickets-Wed-May-5-2027-UBS-Arena | - |
| tm-alex-warren-2027-baltimore-1avfz_pgkrfpurm | Alex Warren | refresh (applied) | 8369870 | https://www.ticketliquidator.com/tickets/8369870/Alex-Warren-tickets-Fri-May-7-2027-CFG-Bank-Arena | - |
| tm-alex-warren-2027-uncasville-g5vvz_piu1phv | Alex Warren | refresh (applied) | 8369871 | https://www.ticketliquidator.com/tickets/8369871/Alex-Warren-tickets-Sat-May-8-2027-Mohegan-Sun-Arena-CT | - |
| tm-alex-warren-2027-raleigh-g5evz_pmr-wuh | Alex Warren | refresh (applied) | 8369872 | https://www.ticketliquidator.com/tickets/8369872/Alex-Warren-tickets-Tue-May-11-2027-Coastal-Credit-Union-Music-Park-at-Walnut-Creek | - |
| tm-alex-warren-2027-charleston-g5evz_pwy4cww | Alex Warren | refresh (applied) | 8369873 | https://www.ticketliquidator.com/tickets/8369873/Alex-Warren-tickets-Wed-May-12-2027-Credit-One-Stadium | - |
| tm-alex-warren-2027-noblesville-vv17fz_pgkmuvbx2 | Alex Warren | refresh (applied) | 8369874 | https://www.ticketliquidator.com/tickets/8369874/Alex-Warren-tickets-Fri-May-14-2027-Ruoff-Music-Center | - |
| tm-alex-warren-2027-birmingham-1aezz_pgkmbd7bp | Alex Warren | refresh (applied) | 8369875 | https://www.ticketliquidator.com/tickets/8369875/Alex-Warren-tickets-Sun-May-16-2027-Coca-Cola-Amphitheater-at-the-BJCC | - |
| tm-marc-anthony-2027-glendale-z7r9jz1aaakad | Marc Anthony | refresh (applied) | 8366923 | https://www.ticketliquidator.com/tickets/8366923/Marc-Anthony-tickets-Fri-May-7-2027-Desert-Diamond-Arena | - |
| tm-kings-of-leon-2027-morrison-z7r9jz1aaadok | Kings Of Leon | refresh (applied) | 8359357 | https://www.ticketliquidator.com/tickets/8359357/Kings-Of-Leon-tickets-Mon-Sep-20-2027-Red-Rocks-Amphitheatre | - |
| tm-cody-johnson-2027-albany-k7vgf_4nhl9nn | Cody Johnson | refresh (applied) | 8369880 | https://www.ticketliquidator.com/tickets/8369880/Cody-Johnson-tickets-Sat-Mar-13-2027-MVP-Arena | - |
| tm-cody-johnson-2027-fargo-vv1akzk4fgkejxfzw | Cody Johnson | refresh (applied) | 8369881 | https://www.ticketliquidator.com/tickets/8369881/Cody-Johnson-tickets-Sat-Mar-20-2027-Fargodome | - |
| tm-cody-johnson-2027-charlottesville-vv1avzk4ngkde3rwt | Cody Johnson | refresh (applied) | 8369882 | https://www.ticketliquidator.com/tickets/8369882/Cody-Johnson-tickets-Sat-Apr-3-2027-John-Paul-Jones-Arena | - |
| tm-the-dead-south-2027-cleveland-z7r9jz1aaa67e | The Dead South | refresh (applied) | 8361948 | https://www.ticketliquidator.com/tickets/8361948/The-Dead-South-tickets-Sat-Apr-17-2027-Agora-Theatre | - |
| tm-the-dead-south-2027-pittsburgh-z7r9jz1aaakfy | The Dead South | refresh (applied) | 8361949 | https://www.ticketliquidator.com/tickets/8361949/The-Dead-South-tickets-Sun-Apr-18-2027-Stage-AE | - |
| tm-the-dead-south-2027-new-york-z7r9jz1aaak4a | The Dead South | refresh (applied) | 8361953 | https://www.ticketliquidator.com/tickets/8361953/The-Dead-South-tickets-Thu-Apr-22-2027-Webster-Hall | - |
| tm-the-dead-south-2027-new-haven-z7r9jz1aaa67a | The Dead South | refresh (applied) | 8361964 | https://www.ticketliquidator.com/tickets/8361964/The-Dead-South-tickets-Fri-Apr-23-2027-College-Street-Music-Hall | - |
| tm-the-dead-south-2027-boston-z7r9jz1aaa67f | The Dead South | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch; listing: The Dead South; text: The Dead South The Dead South /tickets/8361954/The-Dead-South-tickets-Sat-Apr-24-2027-Roadrunner The Dead South The Dead South Roadrunner 67) |
| tm-the-dead-south-2027-columbus-z7r9jz1aaa67t | The Dead South | refresh (applied) | 8361957 | https://www.ticketliquidator.com/tickets/8361957/The-Dead-South-tickets-Mon-Apr-26-2027-KEMBA-Live | - |
| tm-the-dead-south-2027-asheville-z7r9jz1aaa6ao | The Dead South | refresh (applied) | 8361967 | https://www.ticketliquidator.com/tickets/8361967/The-Dead-South-tickets-Sun-May-2-2027-Asheville-Yards-Amphitheater | - |
| tm-the-dead-south-2027-atlanta-z7r9jz1aaa6az | The Dead South | refresh (applied) | 8361958 | https://www.ticketliquidator.com/tickets/8361958/The-Dead-South-tickets-Mon-May-3-2027-The-Eastern-GA | - |
| tm-the-dead-south-2027-denver-z7r9jz1aaa6vm | The Dead South | refresh (applied) | 8361961 | https://www.ticketliquidator.com/tickets/8361961/The-Dead-South-tickets-Sat-Jul-17-2027-Levitt-Pavilion-Denver | - |
| tm-cody-jinks-2027-hollywood-vvg1vz_p3xfvoe | Cody Jinks | refresh (applied) | 8363060 | https://www.ticketliquidator.com/tickets/8363060/Cody-Jinks-tickets-Wed-Feb-3-2027-Hard-Rock-Live-At-The-Seminole-Hard-Rock-Hotel-Casino-Hollywood | - |
| tm-cody-jinks-2027-cocoa-z7r9jz1aaakjb | Cody Jinks | refresh (applied) | 8363632 | https://www.ticketliquidator.com/tickets/8363632/Cody-Jinks-tickets-Fri-Feb-5-2027-Riverfront-Park-Cocoa-Village | - |
| tm-cody-jinks-2027-apopka-z7r9jz1aaakjo | Cody Jinks | refresh (applied) | 8363633 | https://www.ticketliquidator.com/tickets/8363633/Cody-Jinks-tickets-Sat-Feb-6-2027-Apopka-Amphitheater | - |
| tm-cody-jinks-2027-macon-vvg1zz_pcm9nti | Cody Jinks | refresh (applied) | 8363061 | https://www.ticketliquidator.com/tickets/8363061/Cody-Jinks-tickets-Sun-Feb-7-2027-Macon-City-Auditorium | - |
| tm-cody-jinks-2027-fort-worth-z7r9jz1aaakr8 | Cody Jinks | refresh (applied) | 8363545 | https://www.ticketliquidator.com/tickets/8363545/Cody-Jinks-tickets-Thu-Apr-1-2027-Billy-Bobs | - |
| tm-cody-jinks-2027-fort-worth-z7r9jz1aaakrz | Cody Jinks | refresh (applied) | 8363308 | https://www.ticketliquidator.com/tickets/8363308/Cody-Jinks-tickets-Fri-Apr-2-2027-Billy-Bobs | - |
| tm-cody-jinks-2027-las-vegas-1a9zk40gkdisrrp | Cody Jinks | refresh (applied) | 8363062 | https://www.ticketliquidator.com/tickets/8363062/Cody-Jinks-tickets-Sun-Apr-25-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-cody-jinks-2027-modesto-g5vyz_4lc0uvr | Cody Jinks | refresh (applied) | 8363063 | https://www.ticketliquidator.com/tickets/8363063/Cody-Jinks-tickets-Fri-Jun-11-2027-The-Fruit-Yard-Amphitheater | - |
| tm-cody-jinks-2027-lake-tahoe-1a9zk4ngkdmvw-8 | Cody Jinks | refresh (applied) | 8363064 | https://www.ticketliquidator.com/tickets/8363064/Cody-Jinks-tickets-Sat-Jun-12-2027-Lake-Tahoe-Amphitheatre-at-Caesars-Republic | - |
| tm-cody-jinks-2027-central-point-vvg1hz_pkp9lkp | Cody Jinks | refresh (applied) | 8363065 | https://www.ticketliquidator.com/tickets/8363065/Cody-Jinks-tickets-Tue-Jun-15-2027-Bi-Mart-Amphitheater | - |
| tm-cody-jinks-2027-eugene-z7r9jz1aaa837 | Cody Jinks | refresh (applied) | 8362827 | https://www.ticketliquidator.com/tickets/8362827/Cody-Jinks-tickets-Thu-Jun-17-2027-Cuthbert-Amphitheater | - |
| tm-cody-jinks-2027-spokane-vvg1hz_pqqx4vc | Cody Jinks | refresh (applied) | 8363066 | https://www.ticketliquidator.com/tickets/8363066/Cody-Jinks-tickets-Fri-Jun-18-2027-Gesa-Pavilion | - |
| tm-cody-jinks-2027-billings-z7r9jz1aaa6e_ | Cody Jinks | refresh (applied) | 8362828 | https://www.ticketliquidator.com/tickets/8362828/Cody-Jinks-tickets-Tue-Jun-22-2027-Downtown-Billings-SkatePark | - |
| tm-melissa-etheridge-2027-vashon-z7r9jz1aaakuy | Melissa Etheridge | refresh (applied) | 8363032 | https://www.ticketliquidator.com/tickets/8363032/Melissa-Etheridge-tickets-Sat-Mar-20-2027-White-Hall-At-Vashon-Center-For-The-Arts | - |
| tm-melissa-etheridge-2027-vashon-z7r9jz1aaakcz | Melissa Etheridge | refresh (applied) | 8363033 | https://www.ticketliquidator.com/tickets/8363033/Melissa-Etheridge-tickets-Sun-Mar-21-2027-White-Hall-At-Vashon-Center-For-The-Arts | - |
| tm-melissa-etheridge-2027-richmond-1aozk4jgkdae_qq | Melissa Etheridge | refresh (applied) | 8362406 | https://www.ticketliquidator.com/tickets/8362406/Melissa-Etheridge-tickets-Tue-Mar-23-2027-River-Rock-Casino-Resort | - |
| tm-melissa-etheridge-2027-calgary-1aozk40gkdyyany | Melissa Etheridge | refresh (applied) | 8362407 | https://www.ticketliquidator.com/tickets/8362407/Melissa-Etheridge-tickets-Thu-Mar-25-2027-Grey-Eagle-Resort-Casino | - |
| tm-melissa-etheridge-2027-enoch-1aozk4pgkdrvn3r | Melissa Etheridge | refresh (applied) | 8362408 | https://www.ticketliquidator.com/tickets/8362408/Melissa-Etheridge-tickets-Fri-Mar-26-2027-River-Cree-Casino | - |
| tm-melissa-etheridge-2027-saskatoon-z7r9jz1aaakcv | Melissa Etheridge | refresh (applied) | 8363034 | https://www.ticketliquidator.com/tickets/8363034/Melissa-Etheridge-tickets-Sat-Mar-27-2027-TCU-Place | - |
| tm-melissa-etheridge-2027-regina-z7r9jz1aaakce | Melissa Etheridge | refresh (applied) | 8363035 | https://www.ticketliquidator.com/tickets/8363035/Melissa-Etheridge-tickets-Mon-Mar-29-2027-Conexus-Arts-Centre | - |
| tm-melissa-etheridge-2027-winnipeg-1aozk4jgkenj9vg | Melissa Etheridge | refresh (applied) | 8362410 | https://www.ticketliquidator.com/tickets/8362410/Melissa-Etheridge-tickets-Tue-Mar-30-2027-Burton-Cummings-Theatre | - |
| tm-melissa-etheridge-2027-des-moines-vv1akzk4ngkd0rml4 | Melissa Etheridge | refresh (applied) | 8362412 | https://www.ticketliquidator.com/tickets/8362412/Melissa-Etheridge-tickets-Thu-Apr-1-2027-Hoyt-Sherman-Place-Theater | - |
| tm-melissa-etheridge-2027-nashville-vv1aazk4xgkdnma5h | Melissa Etheridge | refresh (applied) | 8362417 | https://www.ticketliquidator.com/tickets/8362417/Melissa-Etheridge-tickets-Fri-Apr-2-2027-Brown-County-Music-Center | - |
| tm-melissa-etheridge-2027-madison-vv1a6zk4ngkd9d6lz | Melissa Etheridge | refresh (applied) | 8362420 | https://www.ticketliquidator.com/tickets/8362420/Melissa-Etheridge-tickets-Sat-Apr-3-2027-Orpheum-Theatre-Madison | - |
| tm-melissa-etheridge-2027-milwaukee-z7r9jz1aaakcd | Melissa Etheridge | refresh (applied) | 8364068 | https://www.ticketliquidator.com/tickets/8364068/Melissa-Etheridge-tickets-Mon-Apr-5-2027-Pabst-Theater | - |
| tm-melissa-etheridge-2027-shipshewana-z7r9jz1aaakap | Melissa Etheridge | refresh (applied) | 8369726 | https://www.ticketliquidator.com/tickets/8369726/Melissa-Etheridge-tickets-Tue-Apr-6-2027-Blue-Gate-Performing-Arts-Center | - |
| tm-melissa-etheridge-2027-knoxville-g5viz_p14c6_a | Melissa Etheridge | refresh (applied) | 8362424 | https://www.ticketliquidator.com/tickets/8362424/Melissa-Etheridge-tickets-Wed-Apr-7-2027-Tennessee-Theatre | - |
| tm-melissa-etheridge-2027-danville-vv1avzk4pgkdw6bmt | Melissa Etheridge | refresh (applied) | 8362425 | https://www.ticketliquidator.com/tickets/8362425/Melissa-Etheridge-tickets-Fri-Apr-9-2027-The-Pantheon-at-Caesars-Virginia | - |
| tm-melissa-etheridge-2027-columbus-z7r9jz1aaakc7 | Melissa Etheridge | refresh (applied) | 8363037 | https://www.ticketliquidator.com/tickets/8363037/Melissa-Etheridge-tickets-Sat-Apr-10-2027-Bill-Heard-Theatre-at-RiverCenter-for-the-Performing-Arts | - |
| tm-melissa-etheridge-2027-charleston-g5evz_pcyahcw | Melissa Etheridge | refresh (applied) | 8362426 | https://www.ticketliquidator.com/tickets/8362426/Melissa-Etheridge-tickets-Sun-Apr-11-2027-Charleston-Music-Hall | - |
| tm-melissa-etheridge-2027-charlotte-z7r9jz1aaakzi | Melissa Etheridge | refresh (applied) | 8362427 | https://www.ticketliquidator.com/tickets/8362427/Melissa-Etheridge-tickets-Tue-Apr-13-2027-Belk-Theatre-at-Blumenthal-Performing-Arts-Center | - |
| tm-melissa-etheridge-2027-york-z7r9jz1aaakca | Melissa Etheridge | refresh (applied) | 8363038 | https://www.ticketliquidator.com/tickets/8363038/Melissa-Etheridge-tickets-Thu-Apr-15-2027-Strand-Theatre-at-Appell-Center-for-the-Performing-Arts | - |
| tm-melissa-etheridge-2027-portsmouth-z7r9jz1aaakck | Melissa Etheridge | refresh (applied) | 8363039 | https://www.ticketliquidator.com/tickets/8363039/Melissa-Etheridge-tickets-Fri-Apr-16-2027-Rivers-Casino-Portsmouth-Event-Center | - |
| tm-melissa-etheridge-2027-north-myrtle-beach-z7r9jz1aaakc6 | Melissa Etheridge | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch; listing: Melissa Etheridge; text: Melissa Etheridge Melissa Etheridge /tickets/8363040/Melissa-Etheridge-tickets-Sat-Apr-17-2027-Alabama-Theatre-SC Melissa Etheridge Melissa ) |
| tm-melissa-etheridge-2027-springfield-z7r9jz1aaakfo | Melissa Etheridge | refresh (applied) | 8363041 | https://www.ticketliquidator.com/tickets/8363041/Melissa-Etheridge-tickets-Tue-Apr-20-2027-Gillioz-Theatre | - |
| tm-melissa-etheridge-2027-wichita-vv1kbz_pfvg7sw9z | Melissa Etheridge | refresh (applied) | 8362428 | https://www.ticketliquidator.com/tickets/8362428/Melissa-Etheridge-tickets-Wed-Apr-21-2027-Orpheum-Theatre-Wichita | - |
| tm-melissa-etheridge-2027-chandler-1a_zk4ngkdm2bwk | Melissa Etheridge | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Melissa Etheridge; text: Melissa Etheridge Melissa Etheridge /tickets/8362429/Melissa-Etheridge-tickets-Fri-Apr-23-2027-Gila-River-Hotels-Casinos-Wild-Horse-Pass Mel) |
| tm-melissa-etheridge-2027-tucson-z7r9jz1aaakca | Melissa Etheridge | refresh (applied) | 8363043 | https://www.ticketliquidator.com/tickets/8363043/Melissa-Etheridge-tickets-Sat-Apr-24-2027-Fox-Tucson-Theatre | - |
| tm-two-friends-2026-nashville-g5viz_kmfvexe | Two Friends | refresh (applied) | 7808859 | https://www.ticketliquidator.com/tickets/7808859/Two-Friends-tickets-Sat-Dec-5-2026-The-Truth | - |
| tm-two-friends-2026-seattle-vvg1hz_krkthyp | Two Friends | refresh (applied) | 8332446 | https://www.ticketliquidator.com/tickets/8332446/Two-Friends-tickets-Sat-Dec-12-2026-Wamu-Theater-At-Lumen-Field-Event-Center | - |
| tm-two-friends-2027-tampa-vvg1vz_fhrt2gz | Two Friends | refresh (applied) | 8353529 | https://www.ticketliquidator.com/tickets/8353529/Two-Friends-tickets-Thu-Dec-31-2026-Seminole-Hard-Rock-Tampa-Event-Center | - |
| tm-two-friends-2027-morrison-z7r9jz1aa76-a | Two Friends | refresh (applied) | 8319843 | https://www.ticketliquidator.com/tickets/8319843/Two-Friends-tickets-Fri-Apr-30-2027-Red-Rocks-Amphitheatre | - |
| tm-two-friends-2027-saint-louis-1a-zk4pgkdsvsmy | Two Friends | refresh (applied) | 8363835 | https://www.ticketliquidator.com/tickets/8363835/Two-Friends-tickets-Wed-May-5-2027-The-Factory-Chesterfield | - |
| tm-two-friends-2027-indianapolis-vv1aazk40gkd83bu9 | Two Friends | refresh (applied) | 8363838 | https://www.ticketliquidator.com/tickets/8363838/Two-Friends-tickets-Thu-May-6-2027-Everwise-Amphitheater-at-White-River-State-Park | - |
| tm-two-friends-2027-milwaukee-vv1a6zk4n0kbize5e | Two Friends | refresh (applied) | 8363840 | https://www.ticketliquidator.com/tickets/8363840/Two-Friends-tickets-Fri-May-7-2027-Landmark-Credit-Union-Live | - |
| tm-two-friends-2027-minneapolis-vv1akzk4jgkehfygr | Two Friends | refresh (applied) | 8363843 | https://www.ticketliquidator.com/tickets/8363843/Two-Friends-tickets-Sat-May-8-2027-The-Armory-Minneapolis | - |
| tm-two-friends-2027-chicago-vv1a7zkfwgkdmtcgf | Two Friends | refresh (applied) | 8284663 | https://www.ticketliquidator.com/tickets/8284663/Two-Friends-tickets-Sat-May-15-2027-The-Pavilion-at-Northerly-Island | - |
| tm-two-friends-2027-detroit-z7r9jz1aaa6pk | Two Friends | refresh (applied) | 8366135 | https://www.ticketliquidator.com/tickets/8366135/Two-Friends-tickets-Fri-May-21-2027-Masonic-Temple-Theatre | - |
| tm-two-friends-2027-ottawa-1aszk4xgkdbc6bg | Two Friends | none | - | - | no qualifying listing (complete catalog checked) |
| tm-two-friends-2027-ottawa-1ad7z_pgkgxjwbt | Two Friends | none | - | - | no qualifying listing (complete catalog checked) |
| tm-two-friends-2027-washington-1a4zk4t-ngzze8d | Two Friends | refresh (applied) | 8363846 | https://www.ticketliquidator.com/tickets/8363846/Two-Friends-tickets-Fri-May-28-2027-Echostage | - |
| tm-two-friends-2027-boston-vv1avzk4xgkddw012 | Two Friends | refresh (applied) | 8363848 | https://www.ticketliquidator.com/tickets/8363848/Two-Friends-tickets-Sat-May-29-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-two-friends-2027-philadelphia-vv1aovp_fga1qsqx | Two Friends | refresh (applied) | 8363852 | https://www.ticketliquidator.com/tickets/8363852/Two-Friends-tickets-Fri-Jun-4-2027-Highmark-Skyline-Stage-at-The-Mann-Center-For-The-Performing-Arts | - |
| tm-two-friends-2027-brooklyn-z7r9jz1aaa6pa | Two Friends | refresh (applied) | 8366136 | https://www.ticketliquidator.com/tickets/8366136/Two-Friends-tickets-Sat-Jun-5-2027-Under-The-K-Bridge | - |
| tm-two-friends-2027-columbus-z7r9jz1aaa6ux | Two Friends | refresh (applied) | 8366138 | https://www.ticketliquidator.com/tickets/8366138/Two-Friends-tickets-Wed-Jun-9-2027-KEMBA-Live | - |
| tm-two-friends-2027-pittsburgh-z7r9jz1aaa6p7 | Two Friends | refresh (applied) | 8366143 | https://www.ticketliquidator.com/tickets/8366143/Two-Friends-tickets-Thu-Jun-10-2027-Stage-AE | - |
| tm-two-friends-2027-newport-z7r9jz1aaa8fi | Two Friends | refresh (applied) | 8366148 | https://www.ticketliquidator.com/tickets/8366148/Two-Friends-tickets-Fri-Jun-11-2027-MegaCorp-Pavilion | - |
| tm-two-friends-2027-cleveland-z7r9jz1aaa6c3 | Two Friends | refresh (applied) | 8366149 | https://www.ticketliquidator.com/tickets/8366149/Two-Friends-tickets-Sat-Jun-12-2027-Jacobs-Pavilion | - |
| tm-two-friends-2027-raleigh-g5evz_p5qexa6 | Two Friends | refresh (applied) | 8363854 | https://www.ticketliquidator.com/tickets/8363854/Two-Friends-tickets-Wed-Jun-16-2027-The-Ritz-Raleigh | - |
| tm-two-friends-2027-north-charleston-g5evz_p3scbo8 | Two Friends | refresh (applied) | 8363856 | https://www.ticketliquidator.com/tickets/8363856/Two-Friends-tickets-Thu-Jun-17-2027-Firefly-Distillery | - |
| tm-two-friends-2027-charlotte-g5evz_pnwhvow | Two Friends | refresh (applied) | 8363858 | https://www.ticketliquidator.com/tickets/8363858/Two-Friends-tickets-Fri-Jun-18-2027-Skyla-Credit-Union-Amphitheatre | - |
| tm-two-friends-2027-atlanta-vvg1zz_phfqf4s | Two Friends | refresh (applied) | 8363862 | https://www.ticketliquidator.com/tickets/8363862/Two-Friends-tickets-Sat-Jun-19-2027-Coca-Cola-Roxy | - |
| tm-two-friends-2027-houston-z7r9jz1aaa6pd | Two Friends | refresh (applied) | 8369508 | https://www.ticketliquidator.com/tickets/8369508/Two-Friends-tickets-Thu-Jun-24-2027-Ductwork-Houston | - |
| tm-two-friends-2027-austin-g5diz_pmgcpjv | Two Friends | refresh (applied) | 8363865 | https://www.ticketliquidator.com/tickets/8363865/Two-Friends-tickets-Fri-Jun-25-2027-Moody-Amphitheater | - |
| tm-two-friends-2027-irving-vvg1yz_phht2we | Two Friends | refresh (applied) | 8363866 | https://www.ticketliquidator.com/tickets/8363866/Two-Friends-tickets-Sat-Jun-26-2027-The-Pavilion-at-Toyota-Music-Factory | - |
| tm-two-friends-2027-toronto-1a8zk49gkesrne- | Two Friends | none | - | - | no qualifying listing (complete catalog checked) |
| tm-two-friends-2027-bala-1avzz_4gkztkppc | Two Friends | none | - | - | no qualifying listing (complete catalog checked) |
| tm-foo-fighters-2027-helsinki-z698xz8kz1kp9zozn | Foo Fighters | none | - | - | no qualifying listing (complete catalog checked) |
| tm-foo-fighters-2027-k-benhavn-sv-z698xzc4z16vbe4w_s | Foo Fighters | none | - | - | no qualifying listing (complete catalog checked) |
| tm-foo-fighters-2027-london-1aegz_pgknyaowd | Foo Fighters | refresh (applied) | 8372601 | https://www.ticketliquidator.com/tickets/8372601/Foo-Fighters-tickets-Thu-Sep-9-2027-Wembley-Stadium | - |
| tm-foo-fighters-2027-london-1aegz_pgky5a3fo | Foo Fighters | refresh (applied) | 8372602 | https://www.ticketliquidator.com/tickets/8372602/Foo-Fighters-tickets-Sat-Sep-11-2027-Wembley-Stadium | - |
| tm-foo-fighters-2027-darlington-1adjz_pgknom0ij | Foo Fighters | refresh (applied) | 8372603 | https://www.ticketliquidator.com/tickets/8372603/Foo-Fighters-tickets-Tue-Sep-14-2027-Darlington-Arena | - |
| tm-foo-fighters-2027-edinburgh-1auzkfegkecn0w6 | Foo Fighters | refresh (applied) | 8372604 | https://www.ticketliquidator.com/tickets/8372604/Foo-Fighters-tickets-Thu-Sep-16-2027-Murrayfield-Stadium | - |
| tm-foo-fighters-2027-dublin-1avoz_3gktbqeds | Foo Fighters | none | - | - | no qualifying listing (complete catalog checked) |
| tm-leon-bridges-2027-warsaw-z698xzqpz1kfy4b8p | Leon Bridges | none | - | - | no qualifying listing (complete catalog checked) |
| tm-leon-bridges-2027-forest-brussels-z698xzg2z16vb_jsqs | Leon Bridges | none | - | - | no qualifying listing (complete catalog checked) |
| tm-leon-bridges-2027-manchester-1adbz_pgkmxxe4x | Leon Bridges | none | - | - | no qualifying listing (complete catalog checked) |
| tm-leon-bridges-2027-bristol-1adfz_pgkidfay7 | Leon Bridges | none | - | - | no qualifying listing (complete catalog checked) |
| tm-leon-bridges-2027-london-1adbz_pgkgzqvyv | Leon Bridges | none | - | - | no qualifying listing (complete catalog checked) |
| tm-leon-bridges-2027-london-1adbz_pgkgzqsyx | Leon Bridges | none | - | - | no qualifying listing (complete catalog checked) |
| tm-leon-bridges-2027-birmingham-g5dzz_peyxywx | Leon Bridges | none | - | - | no qualifying listing (complete catalog checked) |
| tm-leon-bridges-2027-glasgow-1adbz_pgkmjk5az | Leon Bridges | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kacey-musgraves-2027-dublin-1avoz_pgkmocyq- | Kacey Musgraves | none | - | - | no qualifying listing (complete catalog checked) |
| tm-kacey-musgraves-2027-belfast-1adoz_pgkwxv3eu | Kacey Musgraves | none | - | - | no qualifying listing (complete catalog checked) |
| tm-knocked-loose-2027-brisbane-1avgz_3gkbtawtj | Knocked Loose | none | - | - | no qualifying listing (complete catalog checked) |
| tm-phoebe-bridgers-2026-merksem-antwerpen-z698xzg2z16vgjvfk8 | Phoebe Bridgers | refresh (applied) | 8389776 | https://www.ticketliquidator.com/tickets/8389776/Phoebe-Bridgers-tickets-Sun-Dec-6-2026-AFAS-Dome | - |
| tm-sleeping-with-sirens-2027-warsaw-z698xzqpz1kkkaoxd | Sleeping With Sirens | none | - | - | no qualifying listing (complete catalog checked) |
| tm-simply-red-2027-dublin-1avoz_pgkcw_dua | Simply Red | none | - | - | no qualifying listing (complete catalog checked) |
| tm-intocable-2026-fort-worth-vvg1yz_7cpuxpt | Intocable | refresh (applied) | 7875908 | https://www.ticketliquidator.com/tickets/7875908/Intocable-tickets-Fri-Nov-27-2026-Ariat-Arena | - |
| tm-intocable-2026-hidalgo-g5diz_fw-zu9f | Intocable | refresh (applied) | 7876470 | https://www.ticketliquidator.com/tickets/7876470/Intocable-tickets-Sat-Nov-28-2026-Payne-Arena | - |
| tm-intocable-2027-chicago-vv178z_pgkrpyrnn | Intocable | refresh (applied) | 8373879 | https://www.ticketliquidator.com/tickets/8373879/Intocable-tickets-Sat-Feb-20-2027-Credit-Union-1-Arena | - |
| tm-intocable-2027-duluth-vvg1zz_pwe5ag0 | Intocable | refresh (applied) | 8373880 | https://www.ticketliquidator.com/tickets/8373880/Intocable-tickets-Sun-Feb-28-2027-Gas-South-Arena | - |
| tm-intocable-2027-fresno-g5vyz_pmjs49u | Intocable | refresh (applied) | 8373881 | https://www.ticketliquidator.com/tickets/8373881/Intocable-tickets-Fri-Mar-5-2027-Save-Mart-Center | - |
| tm-intocable-2027-inglewood-vv170z_pgkrollqf | Intocable | refresh (applied) | 8373882 | https://www.ticketliquidator.com/tickets/8373882/Intocable-tickets-Sat-Mar-6-2027-Intuit-Dome | - |
| tm-intocable-2027-san-jose-g5vyz_pi39fpd | Intocable | refresh (applied) | 8373883 | https://www.ticketliquidator.com/tickets/8373883/Intocable-tickets-Fri-Mar-19-2027-SAP-Center | - |
| tm-intocable-2027-miami-vvg1vz_pmzxge8 | Intocable | refresh (applied) | 8373885 | https://www.ticketliquidator.com/tickets/8373885/Intocable-tickets-Fri-Jun-11-2027-James-L-Knight-Center | - |
| tm-intocable-2027-sacramento-g5vyz_pulkwxh | Intocable | refresh (applied) | 8373887 | https://www.ticketliquidator.com/tickets/8373887/Intocable-tickets-Sat-Aug-28-2027-Golden-1-Center | - |
| tm-jhene-aiko-2027-saint-louis-vv17bz_pgkmdcqlf | Jhene Aiko | refresh (applied) | 8375586 | https://www.ticketliquidator.com/tickets/8375586/Jhene-Aiko-tickets-Wed-Mar-10-2027-Enterprise-Center | - |
| tm-jhene-aiko-2027-minneapolis-vv17bz_pgkm4rom4 | Jhene Aiko | refresh (applied) | 8375589 | https://www.ticketliquidator.com/tickets/8375589/Jhene-Aiko-tickets-Fri-Mar-12-2027-Target-Center | - |
| tm-jhene-aiko-2027-milwaukee-vv17jz_pgkuxx_4x | Jhene Aiko | refresh (applied) | 8375591 | https://www.ticketliquidator.com/tickets/8375591/Jhene-Aiko-tickets-Sat-Mar-13-2027-Fiserv-Forum | - |
| tm-jhene-aiko-2027-kansas-city-vv17bz_pgkmduzpp | Jhene Aiko | refresh (applied) | 8375592 | https://www.ticketliquidator.com/tickets/8375592/Jhene-Aiko-tickets-Mon-Mar-15-2027-T-Mobile-Center | - |
| tm-jhene-aiko-2027-columbus-vv17fz_pgkmwl1_h | Jhene Aiko | refresh (applied) | 8375595 | https://www.ticketliquidator.com/tickets/8375595/Jhene-Aiko-tickets-Thu-Mar-18-2027-Nationwide-Arena | - |
| tm-jhene-aiko-2027-buffalo-k7vgf_pm2cxpu | Jhene Aiko | refresh (applied) | 8375597 | https://www.ticketliquidator.com/tickets/8375597/Jhene-Aiko-tickets-Fri-Mar-19-2027-KeyBank-Center | - |
| tm-jhene-aiko-2027-chicago-vv178z_pgkm4m_1r | Jhene Aiko | refresh (applied) | 8375598 | https://www.ticketliquidator.com/tickets/8375598/Jhene-Aiko-tickets-Sun-Mar-21-2027-United-Center | - |
| tm-jhene-aiko-2027-detroit-vv17oz_pgkwjgvk2 | Jhene Aiko | refresh (applied) | 8375599 | https://www.ticketliquidator.com/tickets/8375599/Jhene-Aiko-tickets-Mon-Mar-22-2027-Little-Caesars-Arena | - |
| tm-jhene-aiko-2027-toronto-1avzz_pgkm8-pwg | Jhene Aiko | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jhene-aiko-2027-brooklyn-1adzz_pgkwqo0e1 | Jhene Aiko | refresh (applied) | 8375601 | https://www.ticketliquidator.com/tickets/8375601/Jhene-Aiko-tickets-Fri-Mar-26-2027-Barclays-Center | - |
| tm-jhene-aiko-2027-boston-vv177z_pgkm0b_wn | Jhene Aiko | refresh (applied) | 8375602 | https://www.ticketliquidator.com/tickets/8375602/Jhene-Aiko-tickets-Sat-Mar-27-2027-TD-Garden | - |
| tm-jhene-aiko-2027-pittsburgh-1avbz_pgkuj2euk | Jhene Aiko | refresh (applied) | 8375603 | https://www.ticketliquidator.com/tickets/8375603/Jhene-Aiko-tickets-Mon-Mar-29-2027-PPG-Paints-Arena | - |
| tm-jhene-aiko-2027-washington-1avfz_pgkirkqcv | Jhene Aiko | refresh (applied) | 8375604 | https://www.ticketliquidator.com/tickets/8375604/Jhene-Aiko-tickets-Thu-Apr-1-2027-Capital-One-Arena | - |
| tm-jhene-aiko-2027-newark-vv17fz_pgksjk0ub | Jhene Aiko | refresh (applied) | 8375606 | https://www.ticketliquidator.com/tickets/8375606/Jhene-Aiko-tickets-Fri-Apr-2-2027-Prudential-Center | - |
| tm-jhene-aiko-2027-philadelphia-1adzz_pgkmceakj | Jhene Aiko | refresh (applied) | 8375607 | https://www.ticketliquidator.com/tickets/8375607/Jhene-Aiko-tickets-Sat-Apr-3-2027-Xfinity-Mobile-Arena | - |
| tm-jhene-aiko-2027-columbia-g5evz_py95t01 | Jhene Aiko | refresh (applied) | 8375608 | https://www.ticketliquidator.com/tickets/8375608/Jhene-Aiko-tickets-Mon-Apr-5-2027-Colonial-Life-Arena | - |
| tm-jhene-aiko-2027-charlotte-g5evz_pdpjkpz | Jhene Aiko | refresh (applied) | 8375609 | https://www.ticketliquidator.com/tickets/8375609/Jhene-Aiko-tickets-Wed-Apr-7-2027-Spectrum-Center | - |
| tm-jhene-aiko-2027-raleigh-g5evz_9engbxl | Jhene Aiko | refresh (applied) | 8375610 | https://www.ticketliquidator.com/tickets/8375610/Jhene-Aiko-tickets-Thu-Apr-8-2027-Lenovo-Center | - |
| tm-jhene-aiko-2027-atlanta-vvg1zz_puzair5 | Jhene Aiko | refresh (applied) | 8375612 | https://www.ticketliquidator.com/tickets/8375612/Jhene-Aiko-tickets-Sat-Apr-10-2027-State-Farm-Arena-GA | - |
| tm-jhene-aiko-2027-orlando-1kfovpjagau4wx9 | Jhene Aiko | refresh (applied) | 8375613 | https://www.ticketliquidator.com/tickets/8375613/Jhene-Aiko-tickets-Mon-Apr-12-2027-Kia-Center | - |
| tm-jhene-aiko-2027-memphis-g5viz_pwsyuuc | Jhene Aiko | refresh (applied) | 8375614 | https://www.ticketliquidator.com/tickets/8375614/Jhene-Aiko-tickets-Fri-Apr-16-2027-FedExForum | - |
| tm-jhene-aiko-2027-new-orleans-g5viz_pu7vuyk | Jhene Aiko | refresh (applied) | 8375615 | https://www.ticketliquidator.com/tickets/8375615/Jhene-Aiko-tickets-Sat-Apr-17-2027-Smoothie-King-Center | - |
| tm-jhene-aiko-2027-fort-worth-vvg1yz_pgce3dm | Jhene Aiko | refresh (applied) | 8375616 | https://www.ticketliquidator.com/tickets/8375616/Jhene-Aiko-tickets-Tue-Apr-20-2027-Ariat-Arena | - |
| tm-jhene-aiko-2027-austin-g5diz_pvhlinm | Jhene Aiko | refresh (applied) | 8375585 | https://www.ticketliquidator.com/tickets/8375585/Jhene-Aiko-tickets-Thu-Apr-22-2027-Moody-Center-ATX | - |
| tm-jhene-aiko-2027-denver-g5vzz_pu930ac | Jhene Aiko | refresh (applied) | 8375617 | https://www.ticketliquidator.com/tickets/8375617/Jhene-Aiko-tickets-Tue-Apr-27-2027-Ball-Arena | - |
| tm-jhene-aiko-2027-phoenix-1av0z_pgkmb6tzk | Jhene Aiko | refresh (applied) | 8375619 | https://www.ticketliquidator.com/tickets/8375619/Jhene-Aiko-tickets-Thu-Apr-29-2027-Mortgage-Matchup-Center | - |
| tm-jhene-aiko-2027-anaheim-vv170z_pgks682ex | Jhene Aiko | refresh (applied) | 8375620 | https://www.ticketliquidator.com/tickets/8375620/Jhene-Aiko-tickets-Sat-May-1-2027-Honda-Center | - |
| tm-jhene-aiko-2027-san-francisco-g5vyz_plmqsld | Jhene Aiko | refresh (applied) | 8375622 | https://www.ticketliquidator.com/tickets/8375622/Jhene-Aiko-tickets-Fri-May-7-2027-Chase-Center | - |
| tm-jhene-aiko-2027-sacramento-g5vyz_psayvgp | Jhene Aiko | refresh (applied) | 8375623 | https://www.ticketliquidator.com/tickets/8375623/Jhene-Aiko-tickets-Sun-May-9-2027-Golden-1-Center | - |
| tm-jhene-aiko-2027-portland-vvg1hz_pr1sldf | Jhene Aiko | refresh (applied) | 8375624 | https://www.ticketliquidator.com/tickets/8375624/Jhene-Aiko-tickets-Wed-May-12-2027-Moda-Center-at-the-Rose-Quarter | - |
| tm-jhene-aiko-2027-seattle-vvg1hz_pm77anw | Jhene Aiko | refresh (applied) | 8375626 | https://www.ticketliquidator.com/tickets/8375626/Jhene-Aiko-tickets-Thu-May-13-2027-Climate-Pledge-Arena | - |
| tm-jhene-aiko-2027-vancouver-1av7z_pgkwqspc7 | Jhene Aiko | refresh (applied) | 8375630 | https://www.ticketliquidator.com/tickets/8375630/Jhene-Aiko-tickets-Sat-May-15-2027-Rogers-Arena | - |
| tm-jhene-aiko-2027-west-valley-city-g5vzz_ps36muq | Jhene Aiko | refresh (applied) | 8375627 | https://www.ticketliquidator.com/tickets/8375627/Jhene-Aiko-tickets-Wed-May-19-2027-Maverik-Center | - |
| tm-jhene-aiko-2027-los-angeles-g5eyz_pusyoov | Jhene Aiko | refresh (applied) | 8375628 | https://www.ticketliquidator.com/tickets/8375628/Jhene-Aiko-tickets-Fri-May-21-2027-Cryptocom-Arena | - |
| tm-morgan-wallen-2027-arlington-z7r9jz1aaa8aa | Morgan Wallen | refresh (applied) | 8367175 | https://www.ticketliquidator.com/tickets/8367175/Morgan-Wallen-tickets-Fri-Aug-13-2027-ATT-Stadium | - |
| tm-morgan-wallen-2027-arlington-z7r9jz1aaa8a8 | Morgan Wallen | refresh (applied) | 8367176 | https://www.ticketliquidator.com/tickets/8367176/Morgan-Wallen-tickets-Sat-Aug-14-2027-ATT-Stadium | - |
| tm-morgan-wallen-2027-nashville-z7r9jz1aaa8ak | Morgan Wallen | refresh (applied) | 8367178 | https://www.ticketliquidator.com/tickets/8367178/Morgan-Wallen-tickets-Fri-Aug-27-2027-New-Nissan-Stadium | - |
| tm-morgan-wallen-2027-nashville-z7r9jz1aaa8a4 | Morgan Wallen | refresh (applied) | 8367179 | https://www.ticketliquidator.com/tickets/8367179/Morgan-Wallen-tickets-Sat-Aug-28-2027-New-Nissan-Stadium | - |
| tm-polyphia-2026-utrecht-z698xzbpz16v1314-i | Polyphia | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-perfect-circle-2027-elizabethtown-1avbz_pgkucnyj0 | A Perfect Circle | refresh (applied) | 8377743 | https://www.ticketliquidator.com/tickets/8377743/A-Perfect-Circle-tickets-Wed-May-19-2027-Steelgrove-Amphitheater | - |
| tm-rod-stewart-2027-lexington-1avbz_pgkw52aaz | Rod Stewart | refresh (applied) | 8373810 | https://www.ticketliquidator.com/tickets/8373810/Rod-Stewart-tickets-Sun-Mar-21-2027-Rupp-Arena-At-Central-Bank-Center | - |
| tm-santana-2027-san-francisco-g5vyz_puhzl3h | Santana | refresh (applied) | 8375829 | https://www.ticketliquidator.com/tickets/8375829/Santana-tickets-Thu-Feb-25-2027-The-Fillmore-San-Francisco | - |
| tm-santana-2027-san-francisco-g5vyz_puqth3t | Santana | refresh (applied) | 8375831 | https://www.ticketliquidator.com/tickets/8375831/Santana-tickets-Sat-Feb-27-2027-The-Fillmore-San-Francisco | - |
| tm-santana-2027-san-francisco-g5vyz_puqx53g | Santana | refresh (applied) | 8375832 | https://www.ticketliquidator.com/tickets/8375832/Santana-tickets-Sun-Feb-28-2027-The-Fillmore-San-Francisco | - |
| tm-santana-2027-bethlehem-vv17fz_pgkmh0npz | Santana | refresh (applied) | 8375849 | https://www.ticketliquidator.com/tickets/8375849/Santana-tickets-Sat-Mar-27-2027-Wind-Creek-Event-Center | - |
| tm-santana-2027-pittsburgh-1avbz_pgkmfvkd9 | Santana | refresh (applied) | 8375850 | https://www.ticketliquidator.com/tickets/8375850/Santana-tickets-Mon-Mar-29-2027-Citizens-Live-at-The-Wylie | - |
| tm-santana-2027-windsor-1avzz_pgkyz-kdw | Santana | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch, venue mismatch; listing: Flamenco Vivo Carlota Santana; text: Flamenco Vivo Carlota Santana Flamenco Vivo Carlota Santana /tickets/8134645/Flamenco-Vivo-Carlota-Santana-tickets-Wed-Mar-31-2027-Community) |
| tm-santana-2027-niagara-falls-1avzz_pgkm2345j | Santana | none | - | - | no qualifying listing (complete catalog checked) |
| tm-santana-2027-boston-vv1avzk4tgkeo56zw | Santana | refresh (applied) | 8375853 | https://www.ticketliquidator.com/tickets/8375853/Santana-tickets-Sat-Apr-3-2027-MGM-Music-Hall-at-Fenway-Park | - |
| tm-santana-2027-uncasville-g5vvz_9dli7ln | Santana | refresh (applied) | 8375858 | https://www.ticketliquidator.com/tickets/8375858/Santana-tickets-Sun-Apr-4-2027-Mohegan-Sun-Arena-CT | - |
| tm-santana-2027-new-york-g5dyz_prxuxs3 | Santana | refresh (applied) | 8375861 | https://www.ticketliquidator.com/tickets/8375861/Santana-tickets-Tue-Apr-6-2027-Radio-City-Music-Hall | - |
| tm-santana-2027-verona-k7vgf_psngfze | Santana | refresh (applied) | 8375862 | https://www.ticketliquidator.com/tickets/8375862/Santana-tickets-Fri-Apr-9-2027-Event-Center-at-Turning-Stone-Resort-Casino | - |
| tm-santana-2027-atlantic-city-vv17fz_pgkwmc5tp | Santana | refresh (applied) | 8375863 | https://www.ticketliquidator.com/tickets/8375863/Santana-tickets-Sat-Apr-10-2027-Hard-Rock-Live-At-Etess-Arena | - |
| tm-phoebe-bridgers-2027-edmonton-1av7z_pgkm691wt | Phoebe Bridgers | refresh (applied) | 8375944 | https://www.ticketliquidator.com/tickets/8375944/Phoebe-Bridgers-tickets-Sun-Feb-21-2027-Rogers-Place | - |
| tm-phoebe-bridgers-2027-newark-vv1kfz_9vyg7cw_y | Phoebe Bridgers | refresh (applied) | 8376281 | https://www.ticketliquidator.com/tickets/8376281/Phoebe-Bridgers-tickets-Wed-Mar-17-2027-Prudential-Center | - |
| tm-tom-jones-2027-york-1agzk4jgkd-uxfr | Tom Jones | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tom-jones-2027-cardiff-g5vhz_4wcs0vc | Tom Jones | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tom-jones-2027-london-g5vhz_4bny4uy | Tom Jones | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tom-jones-2027-liverpool-g5vhz_pqm3anq | Tom Jones | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tom-jones-2027-lincoln-g5vhz_4w3ae65 | Tom Jones | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tom-jones-2027-rugeley-1amzk4tgkejv7jb | Tom Jones | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tom-jones-2027-llangollen-g5vhz_pwfve8t | Tom Jones | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tom-jones-2027-woodstock-1amzk4tgketwvu7 | Tom Jones | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tom-jones-2027-newcastle-g5vhz_pjbj04_ | Tom Jones | none | - | - | no qualifying listing (complete catalog checked) |
| tm-a-boogie-wit-da-hoodie-2027-london-1amzk4ygkd4ogxu | A Boogie Wit Da Hoodie | none | - | - | no qualifying listing (complete catalog checked) |
| tm-interpol-2027-los-angeles-vvg1iz_pmocxuu | Interpol | refresh (applied) | 8374089 | https://www.ticketliquidator.com/tickets/8374089/Interpol-tickets-Fri-May-14-2027-BMO-Stadium | - |
| tm-carin-leon-2027-sparks-1avjz_pgkrt9h7o | Carin Leon | refresh (applied) | 8374914 | https://www.ticketliquidator.com/tickets/8374914/Carin-Leon-tickets-Sat-Apr-24-2027-Nugget-Event-Center-At-Nugget-Casino-Resort | - |
| tm-james-blunt-2027-idstein-z698xzc2z16vuazef3 | James Blunt | none | - | - | no qualifying listing (complete catalog checked) |
| tm-james-blunt-2027-lincoln-g5vhz_on_qxm9 | James Blunt | none | - | - | no qualifying listing (complete catalog checked) |
| tm-james-blunt-2027-thetford-1adjz_pgkw4p4i3 | James Blunt | none | - | - | no qualifying listing (complete catalog checked) |
| tm-james-blunt-2027-scarborough-1ku8vp1_ga1cs0u | James Blunt | none | - | - | no qualifying listing (complete catalog checked) |
| tm-james-blunt-2027-gloucestershire-16mzk4yjeza8ddu2 | James Blunt | none | - | - | no qualifying listing (complete catalog checked) |
| tm-james-blunt-2027-llangollen-g5vhz_3nxrxc- | James Blunt | none | - | - | no qualifying listing (complete catalog checked) |
| tm-james-blunt-2027-margate-1agzkfegkdf5svi | James Blunt | none | - | - | no qualifying listing (complete catalog checked) |
| tm-james-blunt-2027-colchester-1agzk4fgkdt9fe6 | James Blunt | none | - | - | no qualifying listing (complete catalog checked) |
| tm-megadeth-2027-albuquerque-g5vzz_pwxigv1 | Megadeth | refresh (applied) | 8373267 | https://www.ticketliquidator.com/tickets/8373267/Megadeth-tickets-Fri-May-14-2027-First-Financial-Credit-Union-Amphitheater | - |
| tm-megadeth-2027-phoenix-1av0z_pgknttpbb | Megadeth | refresh (applied) | 8373268 | https://www.ticketliquidator.com/tickets/8373268/Megadeth-tickets-Sat-May-15-2027-Talking-Stick-Resort-Amphitheatre | - |
| tm-megadeth-2027-chula-vista-vvg1iz_pjb5pwc | Megadeth | refresh (applied) | 8373269 | https://www.ticketliquidator.com/tickets/8373269/Megadeth-tickets-Tue-May-18-2027-North-Island-Credit-Union-Amphitheatre | - |
| tm-megadeth-2027-inglewood-vv16azk4ev7zauakk1 | Megadeth | refresh (applied) | 8373270 | https://www.ticketliquidator.com/tickets/8373270/Megadeth-tickets-Wed-May-19-2027-The-Kia-Forum | - |
| tm-megadeth-2027-ridgefield-vvg1hz_pj4m0zq | Megadeth | refresh (applied) | 8373271 | https://www.ticketliquidator.com/tickets/8373271/Megadeth-tickets-Fri-May-21-2027-Cascades-Amphitheater-WA | - |
| tm-megadeth-2027-auburn-vvg1hz_ph-ktdl | Megadeth | refresh (applied) | 8373272 | https://www.ticketliquidator.com/tickets/8373272/Megadeth-tickets-Sat-May-22-2027-White-River-Amphitheatre | - |
| tm-megadeth-2027-west-valley-city-g5vzz_pjgpffk | Megadeth | refresh (applied) | 8373273 | https://www.ticketliquidator.com/tickets/8373273/Megadeth-tickets-Mon-May-24-2027-Utah-First-Credit-Union-Amphitheatre | - |
| tm-megadeth-2027-tinley-park-vv1a7zk4tgkdt6btl | Megadeth | refresh (applied) | 8373276 | https://www.ticketliquidator.com/tickets/8373276/Megadeth-tickets-Fri-May-28-2027-Credit-Union-1-Amphitheatre | - |
| tm-megadeth-2027-shakopee-1ae7z_pgkcukysu | Megadeth | refresh (applied) | 8373277 | https://www.ticketliquidator.com/tickets/8373277/Megadeth-tickets-Sat-May-29-2027-Mystic-Lake-Amphitheatre-Shakopee | - |
| tm-megadeth-2027-kansas-city-1ae7z_pgki7igc3 | Megadeth | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch; listing: Megadeth, Anthrax & Kerry King; text: Megadeth, Anthrax & Kerry King Megadeth, Anthrax & Kerry King /tickets/8373278/Megadeth-tickets-Mon-May-31-2027-Morton-Amphitheater Megadeth) |
| tm-megadeth-2027-grand-rapids-vv17oz_pgkmgtnqb | Megadeth | refresh (applied) | 8373279 | https://www.ticketliquidator.com/tickets/8373279/Megadeth-tickets-Wed-Jun-2-2027-Acrisure-Amphitheater | - |
| tm-megadeth-2027-clarkston-vv17oz_pgks8s9m3 | Megadeth | refresh (applied) | 8373280 | https://www.ticketliquidator.com/tickets/8373280/Megadeth-tickets-Fri-Jun-4-2027-Pine-Knob-Music-Theatre | - |
| tm-megadeth-2027-cincinnati-1avbz_pgkn_24l6 | Megadeth | refresh (applied) | 8373281 | https://www.ticketliquidator.com/tickets/8373281/Megadeth-tickets-Sat-Jun-5-2027-Riverbend-Music-Center | - |
| tm-megadeth-2027-burgettstown-1avbz_pgkwkmpmi | Megadeth | refresh (applied) | 8373283 | https://www.ticketliquidator.com/tickets/8373283/Megadeth-tickets-Mon-Jun-7-2027-The-Pavilion-At-Star-Lake | - |
| tm-megadeth-2027-bristow-1avfz_pgknmlaeb | Megadeth | refresh (applied) | 8373284 | https://www.ticketliquidator.com/tickets/8373284/Megadeth-tickets-Tue-Jun-8-2027-Jiffy-Lube-Live | - |
| tm-megadeth-2027-toronto-1avzz_pgksfsdba | Megadeth | none | - | - | no qualifying listing (complete catalog checked) |
| tm-megadeth-2027-mansfield-vv177z_pgkmjh1ou | Megadeth | refresh (applied) | 8373285 | https://www.ticketliquidator.com/tickets/8373285/Megadeth-tickets-Sat-Jun-12-2027-Xfinity-Center-MA | - |
| tm-megadeth-2027-camden-vv17fz_pgkmjnhj7 | Megadeth | refresh (applied) | 8373287 | https://www.ticketliquidator.com/tickets/8373287/Megadeth-tickets-Sun-Jun-13-2027-Freedom-Mortgage-Pavilion | - |
| tm-megadeth-2027-new-york-g5diz_prtfsjt | Megadeth | refresh (applied) | 8373289 | https://www.ticketliquidator.com/tickets/8373289/Megadeth-tickets-Tue-Jun-15-2027-Madison-Square-Garden | - |
| tm-megadeth-2027-charlotte-g5evz_pjm1iz7 | Megadeth | refresh (applied) | 8373290 | https://www.ticketliquidator.com/tickets/8373290/Megadeth-tickets-Thu-Jun-17-2027-Truliant-Amphitheater | - |
| tm-megadeth-2027-alpharetta-vvg1zz_pnf8blb | Megadeth | refresh (applied) | 8373291 | https://www.ticketliquidator.com/tickets/8373291/Megadeth-tickets-Fri-Jun-18-2027-Ameris-Bank-Amphitheatre | - |
| tm-megadeth-2027-the-woodlands-g5diz_penjw6e | Megadeth | refresh (applied) | 8373292 | https://www.ticketliquidator.com/tickets/8373292/Megadeth-tickets-Sun-Jun-20-2027-The-Cynthia-Woods-Mitchell-Pavilion | - |
| tm-megadeth-2027-irving-vvg1yz_psnfnkd | Megadeth | refresh (applied) | 8373293 | https://www.ticketliquidator.com/tickets/8373293/Megadeth-tickets-Tue-Jun-22-2027-The-Pavilion-at-Toyota-Music-Factory | - |
| tm-megadeth-2027-austin-g5diz_pevm_m_ | Megadeth | refresh (applied) | 8373294 | https://www.ticketliquidator.com/tickets/8373294/Megadeth-tickets-Wed-Jun-23-2027-Germania-Insurance-Amphitheater | - |
| tm-megadeth-2027-north-little-rock-g5viz_pnjetpo | Megadeth | refresh (applied) | 8373298 | https://www.ticketliquidator.com/tickets/8373298/Megadeth-tickets-Mon-Sep-6-2027-Simmons-Bank-Arena | - |
| tm-megadeth-2027-biloxi-g5viz_plz_cl1 | Megadeth | refresh (applied) | 8373299 | https://www.ticketliquidator.com/tickets/8373299/Megadeth-tickets-Tue-Sep-7-2027-Mississippi-Coast-Coliseum | - |
| tm-megadeth-2027-nashville-g5viz_pmzogzi | Megadeth | refresh (applied) | 8373301 | https://www.ticketliquidator.com/tickets/8373301/Megadeth-tickets-Thu-Sep-9-2027-Bridgestone-Arena | - |
| tm-megadeth-2027-virginia-beach-vv177z_pgkl4llwn | Megadeth | refresh (applied) | 8373304 | https://www.ticketliquidator.com/tickets/8373304/Megadeth-tickets-Sat-Sep-11-2027-Veterans-United-Home-Loans-Amphitheater | - |
| tm-megadeth-2027-allentown-1adzz_pgkmxuggq | Megadeth | refresh (applied) | 8373305 | https://www.ticketliquidator.com/tickets/8373305/Megadeth-tickets-Sun-Sep-12-2027-PPL-Center | - |
| tm-megadeth-2027-laval-1ad7z_pgkmil4lx | Megadeth | refresh (applied) | 8373324 | https://www.ticketliquidator.com/tickets/8373324/Megadeth-tickets-Tue-Sep-14-2027-Place-Bell | - |
| tm-megadeth-2027-buffalo-k7vgf_pr36-mz | Megadeth | refresh (applied) | 8373306 | https://www.ticketliquidator.com/tickets/8373306/Megadeth-tickets-Thu-Sep-16-2027-KeyBank-Center | - |
| tm-megadeth-2027-toledo-vv1afzk4tgkdzzv33 | Megadeth | refresh (applied) | 8373307 | https://www.ticketliquidator.com/tickets/8373307/Megadeth-tickets-Sat-Sep-18-2027-Huntington-Center | - |
| tm-megadeth-2027-columbus-vv17fz_pgksfzclm | Megadeth | refresh (applied) | 8373312 | https://www.ticketliquidator.com/tickets/8373312/Megadeth-tickets-Sun-Sep-19-2027-Value-City-Arena-at-The-Schottenstein-Center | - |
| tm-megadeth-2027-milwaukee-vv17jz_pgkrcmzyk | Megadeth | refresh (applied) | 8373315 | https://www.ticketliquidator.com/tickets/8373315/Megadeth-tickets-Tue-Sep-21-2027-BMO-Pavilion | - |
| tm-megadeth-2027-fargo-vv1kvovpq_ga53kds | Megadeth | refresh (applied) | 8373316 | https://www.ticketliquidator.com/tickets/8373316/Megadeth-tickets-Wed-Sep-22-2027-Fargodome | - |
| tm-megadeth-2027-lincoln-vv17bz_pgkmwzqwq | Megadeth | refresh (applied) | 8373317 | https://www.ticketliquidator.com/tickets/8373317/Megadeth-tickets-Fri-Sep-24-2027-Pinnacle-Bank-Arena | - |
| tm-megadeth-2027-wichita-vv17bz_pgkr9vwea | Megadeth | refresh (applied) | 8373318 | https://www.ticketliquidator.com/tickets/8373318/Megadeth-tickets-Sat-Sep-25-2027-INTRUST-Bank-Arena | - |
| tm-remi-wolf-2027-washington-1a4zk4agkemriif | Remi Wolf | refresh (applied) | 8376396 | https://www.ticketliquidator.com/tickets/8376396/Remi-Wolf-tickets-Wed-Feb-24-2027-The-Anthem-DC | - |
| tm-remi-wolf-2027-berkeley-g5vyz_pmrwpif | Remi Wolf | refresh (applied) | 8376395 | https://www.ticketliquidator.com/tickets/8376395/Remi-Wolf-tickets-Fri-Apr-30-2027-Greek-Theatre-UC-Berkeley | - |
| tm-remi-wolf-2027-phoenix-1av0z_pgkubtvhv | Remi Wolf | refresh (applied) | 8376394 | https://www.ticketliquidator.com/tickets/8376394/Remi-Wolf-tickets-Mon-May-3-2027-The-Van-Buren | - |
| tm-air-supply-2027-indianapolis-vv17fz_pgkskhuw1 | Air Supply | refresh (applied) | 8373812 | https://www.ticketliquidator.com/tickets/8373812/Air-Supply-tickets-Sat-Apr-3-2027-Murat-Theatre-at-Old-National-Centre | - |
| tm-foreigner-2027-uncasville-g5vvz_pubgaoy | Foreigner | refresh (applied) | 8373802 | https://www.ticketliquidator.com/tickets/8373802/Foreigner-tickets-Sat-May-1-2027-Mohegan-Sun-Arena-CT | - |
| tm-foreigner-2027-bangor-vv177z_pgkzwgr47 | Foreigner | refresh (applied) | 8373799 | https://www.ticketliquidator.com/tickets/8373799/Foreigner-tickets-Fri-Jul-16-2027-Maine-Savings-Amphitheater | - |
| tm-foreigner-2027-gilford-vv177z_pgkichxsp | Foreigner | refresh (applied) | 8373800 | https://www.ticketliquidator.com/tickets/8373800/Foreigner-tickets-Sat-Jul-17-2027-Bank-of-New-Hampshire-Pavilion | - |
| tm-foreigner-2027-bethel-k7vgf_ps6zwby | Foreigner | refresh (applied) | 8373801 | https://www.ticketliquidator.com/tickets/8373801/Foreigner-tickets-Sun-Jul-18-2027-Bethel-Woods-Center-For-The-Arts | - |
| tm-jason-aldean-2027-durant-vvg1yz_4wtfp_q | Jason Aldean | refresh (applied) | 8374590 | https://www.ticketliquidator.com/tickets/8374590/Jason-Aldean-tickets-Sat-Mar-6-2027-Choctaw-Casino-Resort-Durant | - |
| tm-cody-johnson-2027-evansville-vv1aazk4ngkd4mac1 | Cody Johnson | refresh (applied) | 8369884 | https://www.ticketliquidator.com/tickets/8369884/Cody-Johnson-tickets-Sat-May-1-2027-Ford-Center-IN | - |
| tm-cody-johnson-2027-gilford-vv177z_pgksxdnvq | Cody Johnson | refresh (applied) | 8376764 | https://www.ticketliquidator.com/tickets/8376764/Cody-Johnson-tickets-Sat-May-29-2027-Bank-of-New-Hampshire-Pavilion | - |
| tm-mercyme-2027-norfolk-z7r9jz1aaa4os | MercyMe | refresh (applied) | 8332037 | https://www.ticketliquidator.com/tickets/8332037/MercyMe-tickets-Fri-Apr-2-2027-Chartway-Arena-at-Ted-Constant-Convocation-Center | - |
| tm-kpop-demon-hunters-2027-manchester-g5vhz_prka4i0 | KPop Demon Hunters | refresh (applied) | 8369646 | https://www.ticketliquidator.com/tickets/8369646/KPOP-Demon-Hunters-tickets-Tue-Oct-19-2027-AO-Arena | - |
| tm-travis-tritt-2027-nashville-z7r9jz1a7jf0f | Travis Tritt | refresh (applied) | 8117232 | https://www.ticketliquidator.com/tickets/8117232/Travis-Tritt-tickets-Fri-Mar-12-2027-Ryman-Auditorium | - |
| tm-travis-tritt-2027-oxford-z7r9jz1a7jao6 | Travis Tritt | refresh (applied) | 8190801 | https://www.ticketliquidator.com/tickets/8190801/Travis-Tritt-tickets-Fri-Apr-16-2027-Oxford-Performing-Arts-Center | - |
| tm-travis-tritt-2027-macon-vvg1zz_k1bu6z9 | Travis Tritt | refresh (applied) | 7775649 | https://www.ticketliquidator.com/tickets/7775649/Travis-Tritt-tickets-Thu-Apr-22-2027-Macon-City-Auditorium | - |
| tm-travis-tritt-2027-northfield-vv1kfz_pfzg7zdfa | Travis Tritt | refresh (applied) | 8364346 | https://www.ticketliquidator.com/tickets/8364346/Travis-Tritt-tickets-Fri-May-14-2027-Northfield-Park-Racino-Center-Stage | - |
| tm-travis-tritt-2027-waterloo-k7vgf_29lrc4r | Travis Tritt | refresh (applied) | 8364347 | https://www.ticketliquidator.com/tickets/8364347/Travis-Tritt-tickets-Fri-May-21-2027-The-Vine-at-Del-Lago-Resort | - |
| tm-travis-tritt-2027-charles-town-1a4zk4ngkdpzfky | Travis Tritt | refresh (applied) | 8364348 | https://www.ticketliquidator.com/tickets/8364348/Travis-Tritt-tickets-Sat-May-22-2027-Hollywood-Casino-at-Charles-Town-Races | - |
| tm-travis-tritt-2027-durham-g5evz_p2pdn7v | Travis Tritt | refresh (applied) | 8364349 | https://www.ticketliquidator.com/tickets/8364349/Travis-Tritt-tickets-Fri-Jun-18-2027-Durham-Performing-Arts-Center | - |
| tm-travis-tritt-2027-kettering-z7r9jz1aaaaf3 | Travis Tritt | refresh (applied) | 8364340 | https://www.ticketliquidator.com/tickets/8364340/Travis-Tritt-tickets-Sat-Jun-26-2027-Fraze-Pavilion | - |
| tm-travis-tritt-2027-bossier-city-g5viz_p2n3lzw | Travis Tritt | refresh (applied) | 8364350 | https://www.ticketliquidator.com/tickets/8364350/Travis-Tritt-tickets-Fri-Jul-16-2027-Riverdome-At-Horseshoe-Casino | - |
| tm-travis-tritt-2027-bristol-g5viz_4sc3z7i | Travis Tritt | refresh (applied) | 8364351 | https://www.ticketliquidator.com/tickets/8364351/Travis-Tritt-tickets-Fri-Jul-30-2027-Hard-Rock-Hotel-Casino-Bristol | - |
| tm-travis-tritt-2027-new-haven-1kaovpq_ga2h4m9 | Travis Tritt | refresh (applied) | 8364353 | https://www.ticketliquidator.com/tickets/8364353/Travis-Tritt-tickets-Sat-Jul-31-2027-The-Amp-at-Log-Still | - |
| tm-travis-tritt-2027-gary-vv1aazk4tgkewapoq | Travis Tritt | refresh (applied) | 8364355 | https://www.ticketliquidator.com/tickets/8364355/Travis-Tritt-tickets-Sat-Aug-14-2027-Hard-Rock-Live-Northern-Indiana | - |
| tm-travis-tritt-2027-saint-louis-1a-zk4igkdyooqa | Travis Tritt | refresh (applied) | 8364357 | https://www.ticketliquidator.com/tickets/8364357/Travis-Tritt-tickets-Fri-Sep-10-2027-The-Factory-Chesterfield | - |
| tm-travis-tritt-2027-kansas-city-vv1akzk4jgkdb4gal | Travis Tritt | refresh (applied) | 8364359 | https://www.ticketliquidator.com/tickets/8364359/Travis-Tritt-tickets-Sat-Sep-11-2027-Star-Pavilion-at-Ameristar-Casino-and-Hotel-Kansas-City | - |
| tm-travis-tritt-2027-nashville-vv1aazk4jgke0bm2- | Travis Tritt | refresh (applied) | 8364361 | https://www.ticketliquidator.com/tickets/8364361/Travis-Tritt-tickets-Thu-Sep-30-2027-Brown-County-Music-Center | - |
| tm-travis-tritt-2027-mount-pleasant-z7r9jz1aaaark | Travis Tritt | refresh (applied) | 8364862 | https://www.ticketliquidator.com/tickets/8364862/Travis-Tritt-tickets-Fri-Oct-1-2027-Entertainment-Hall-At-Soaring-Eagle-Casino-Resort | - |
| tm-travis-tritt-2027-lake-charles-z7r9jz1aaaajp | Travis Tritt | refresh (applied) | 8366592 | https://www.ticketliquidator.com/tickets/8366592/Travis-Tritt-tickets-Sat-Oct-9-2027-Grand-Event-Center-at-Golden-Nugget-Lake-Charles | - |
| tm-grace-potter-2026-poughkeepsie-k7vgf_4m5us3r | Grace Potter | refresh (applied) | 8350236 | https://www.ticketliquidator.com/tickets/8350236/Grace-Potter-tickets-Thu-Dec-3-2026-The-Bardavon-1869-Opera-House | - |
| tm-grace-potter-2026-easton-z7r9jz1aaae7_ | Grace Potter | none | - | - | no qualifying listing (complete catalog checked) |
| tm-grace-potter-2027-rutland-z7r9jz1aaak__ | Grace Potter | none | - | - | no qualifying listing (complete catalog checked) |
| tm-grace-potter-2027-portland-vv1avzk4jgkebfxbx | Grace Potter | refresh (applied) | 8364352 | https://www.ticketliquidator.com/tickets/8364352/Grace-Potter-tickets-Fri-Jan-15-2027-State-Theatre-ME | - |
| tm-grace-potter-2027-boston-vv1avzk4pgkd0q4bh | Grace Potter | refresh (applied) | 8364354 | https://www.ticketliquidator.com/tickets/8364354/Grace-Potter-tickets-Sat-Jan-16-2027-Citizens-House-Of-Blues-Boston | - |
| tm-grace-potter-2027-new-haven-z7r9jz1aaak_o | Grace Potter | refresh (applied) | 8362099 | https://www.ticketliquidator.com/tickets/8362099/Grace-Potter-tickets-Sun-Jan-17-2027-College-Street-Music-Hall | - |
| tm-grace-potter-2027-mckees-rocks-1apzk4jgkdpsghe | Grace Potter | refresh (applied) | 8364356 | https://www.ticketliquidator.com/tickets/8364356/Grace-Potter-tickets-Wed-Jan-20-2027-Roxian-Theatre | - |
| tm-grace-potter-2027-rochester-k7vgf_peejxna | Grace Potter | refresh (applied) | 8364358 | https://www.ticketliquidator.com/tickets/8364358/Grace-Potter-tickets-Thu-Jan-21-2027-Kodak-Center-Theater | - |
| tm-grace-potter-2027-rome-z7r9jz1aaak_- | Grace Potter | refresh (applied) | 8370363 | https://www.ticketliquidator.com/tickets/8370363/Grace-Potter-tickets-Fri-Jan-22-2027-Capitol-Theatre-At-Capitol-Arts-Complex | - |
| tm-grace-potter-2027-new-york-g5diz_pqp7kdd | Grace Potter | refresh (applied) | 8364360 | https://www.ticketliquidator.com/tickets/8364360/Grace-Potter-tickets-Sat-Jan-23-2027-Beacon-Theatre-NY | - |
| tm-grace-potter-2027-patchogue-z7r9jz1aaak_x | Grace Potter | refresh (applied) | 8365698 | https://www.ticketliquidator.com/tickets/8365698/Grace-Potter-tickets-Sun-Jan-24-2027-Patchogue-Theater-For-The-Performing-Arts | - |
| tm-grace-potter-2027-hershey-vv1aezk4jgkdhztfh | Grace Potter | refresh (applied) | 8364362 | https://www.ticketliquidator.com/tickets/8364362/Grace-Potter-tickets-Wed-Jan-27-2027-Hershey-Theatre | - |
| tm-grace-potter-2027-wilkes-barre-vv1kfz_px4g7sfow | Grace Potter | refresh (applied) | 8364363 | https://www.ticketliquidator.com/tickets/8364363/Grace-Potter-tickets-Thu-Jan-28-2027-Kirby-Center-for-the-Performing-Arts | - |
| tm-grace-potter-2027-bensalem-z7r9jz1aaak_n | Grace Potter | refresh (applied) | 8365891 | https://www.ticketliquidator.com/tickets/8365891/Grace-Potter-tickets-Fri-Jan-29-2027-Xcite-Center-At-Parx-Casino-and-Racing | - |
| tm-grace-potter-2027-washington-1a4zk4jgkey_jxg | Grace Potter | refresh (applied) | 8364364 | https://www.ticketliquidator.com/tickets/8364364/Grace-Potter-tickets-Sat-Jan-30-2027-The-Anthem-DC | - |
| tm-grace-potter-2027-cleveland-z7r9jz1aaak_0 | Grace Potter | refresh (applied) | 8369702 | https://www.ticketliquidator.com/tickets/8369702/Grace-Potter-tickets-Sun-Jan-31-2027-Globe-Iron | - |
| tm-grace-potter-2027-lexington-1apzk4tgkd-mqay | Grace Potter | refresh (applied) | 8364365 | https://www.ticketliquidator.com/tickets/8364365/Grace-Potter-tickets-Wed-Feb-3-2027-The-Rail-KY | - |
| tm-grace-potter-2027-saint-louis-vv1kbz_pq9g7dnzn | Grace Potter | refresh (applied) | 8364367 | https://www.ticketliquidator.com/tickets/8364367/Grace-Potter-tickets-Thu-Feb-4-2027-The-Pageant | - |
| tm-grace-potter-2027-indianapolis-vv1aazk4jgkei1ehm | Grace Potter | refresh (applied) | 8364369 | https://www.ticketliquidator.com/tickets/8364369/Grace-Potter-tickets-Fri-Feb-5-2027-Egyptian-Room-At-Old-National-Centre | - |
| tm-grace-potter-2027-cincinnati-1apzk4igkdfr9ax | Grace Potter | refresh (applied) | 8364371 | https://www.ticketliquidator.com/tickets/8364371/Grace-Potter-tickets-Sat-Feb-6-2027-Taft-Theatre | - |
| tm-grace-potter-2027-grand-rapids-z7r9jz1aaa64j | Grace Potter | refresh (applied) | 8364952 | https://www.ticketliquidator.com/tickets/8364952/Grace-Potter-tickets-Tue-Feb-9-2027-Intersection | - |
| tm-grace-potter-2027-davenport-z7r9jz1aaak_p | Grace Potter | refresh (applied) | 8368923 | https://www.ticketliquidator.com/tickets/8368923/Grace-Potter-tickets-Wed-Feb-10-2027-Capitol-Theatre-Iowa | - |
| tm-grace-potter-2027-milwaukee-z7r9jz1aaak_j | Grace Potter | refresh (applied) | 8369025 | https://www.ticketliquidator.com/tickets/8369025/Grace-Potter-tickets-Thu-Feb-11-2027-Pabst-Theater | - |
| tm-grace-potter-2027-st-paul-z7r9jz1aaak_e | Grace Potter | refresh (applied) | 8366153 | https://www.ticketliquidator.com/tickets/8366153/Grace-Potter-tickets-Fri-Feb-12-2027-The-Palace-Theatre-St-Paul | - |
| tm-grace-potter-2027-des-moines-vv1akzk4jgkd-akup | Grace Potter | refresh (applied) | 8364372 | https://www.ticketliquidator.com/tickets/8364372/Grace-Potter-tickets-Sat-Feb-13-2027-Hoyt-Sherman-Place-Theater | - |
| tm-grace-potter-2027-kansas-city-z7r9jz1aaak_i | Grace Potter | refresh (applied) | 8366185 | https://www.ticketliquidator.com/tickets/8366185/Grace-Potter-tickets-Thu-Feb-25-2027-The-Truman-Kansas-City | - |
| tm-grace-potter-2027-omaha-z7r9jz1aaak_t | Grace Potter | refresh (applied) | 8366368 | https://www.ticketliquidator.com/tickets/8366368/Grace-Potter-tickets-Fri-Feb-26-2027-The-Slowdown | - |
| tm-grace-potter-2027-denver-g5vzz_phlm6bi | Grace Potter | refresh (applied) | 8364374 | https://www.ticketliquidator.com/tickets/8364374/Grace-Potter-tickets-Sat-Feb-27-2027-Fillmore-Auditorium-Colorado | - |
| tm-grace-potter-2027-aspen-z7r9jz1aaak_y | Grace Potter | refresh (applied) | 8370342 | https://www.ticketliquidator.com/tickets/8370342/Grace-Potter-tickets-Mon-Mar-1-2027-Belly-Up-Aspen | - |
| tm-grace-potter-2027-santa-fe-z7r9jz1aaak_s | Grace Potter | refresh (applied) | 8380607 | https://www.ticketliquidator.com/tickets/8380607/Grace-Potter-tickets-Tue-Mar-2-2027-The-Lensic-Performing-Arts-Center | - |
| tm-grace-potter-2027-tucson-1a_zk4jgkdj3ibg | Grace Potter | refresh (applied) | 8364375 | https://www.ticketliquidator.com/tickets/8364375/Grace-Potter-tickets-Thu-Mar-4-2027-Rialto-Theatre-Tucson | - |
| tm-grace-potter-2027-del-mar-rz7hnez1af8to0 | Grace Potter | refresh (applied) | 8364377 | https://www.ticketliquidator.com/tickets/8364377/Grace-Potter-tickets-Fri-Mar-5-2027-The-Sound-At-The-Del-Mar-Fairgrounds | - |
| tm-grace-potter-2027-las-vegas-1a9zk4jgken85tq | Grace Potter | refresh (applied) | 8364379 | https://www.ticketliquidator.com/tickets/8364379/Grace-Potter-tickets-Sat-Mar-6-2027-The-Stage-at-Zouk-at-Resorts-World-Las-Vegas | - |
| tm-grace-potter-2027-phoenix-1a_zk4jgkdkzmdr | Grace Potter | refresh (applied) | 8364381 | https://www.ticketliquidator.com/tickets/8364381/Grace-Potter-tickets-Sun-Mar-7-2027-The-Van-Buren | - |
| tm-grace-potter-2027-claremont-z7r9jz1aaak_w | Grace Potter | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Grace Potter & The Trespassers; text: Grace Potter & The Trespassers Grace Potter & The Trespassers /tickets/8366339/Grace-Potter-tickets-Tue-Mar-9-2027-Bridges-Auditorium Grace ) |
| tm-grace-potter-2027-monterey-z7r9jz1aaa64e | Grace Potter | refresh (applied) | 8365992 | https://www.ticketliquidator.com/tickets/8365992/Grace-Potter-tickets-Wed-Mar-10-2027-Golden-State-Theatre | - |
| tm-grace-potter-2027-san-francisco-g5vyz_php4sdr | Grace Potter | refresh (applied) | 8364383 | https://www.ticketliquidator.com/tickets/8364383/Grace-Potter-tickets-Thu-Mar-11-2027-The-Fillmore-San-Francisco | - |
| tm-grace-potter-2027-napa-g5vyz_ppqswad | Grace Potter | refresh (applied) | 8364386 | https://www.ticketliquidator.com/tickets/8364386/Grace-Potter-tickets-Sat-Mar-13-2027-Uptown-Theatre-Napa | - |
| tm-grace-potter-2027-redding-z7r9jz1aaa64i | Grace Potter | refresh (applied) | 8369472 | https://www.ticketliquidator.com/tickets/8369472/Grace-Potter-tickets-Sun-Mar-14-2027-Cascade-Theatre | - |
| tm-grace-potter-2027-boise-z7r9jz1aaak_s | Grace Potter | refresh (applied) | 8382907 | https://www.ticketliquidator.com/tickets/8382907/Grace-Potter-tickets-Tue-Mar-16-2027-Treefort-Music-Hall | - |
| tm-grace-potter-2027-jackson-z7r9jz1aaak_v | Grace Potter | none | - | - | no qualifying listing (complete catalog checked) |
| tm-grace-potter-2027-salt-lake-city-z7r9jz1aaak_g | Grace Potter | refresh (applied) | 8366186 | https://www.ticketliquidator.com/tickets/8366186/Grace-Potter-tickets-Fri-Mar-19-2027-Rockwell-At-The-Complex | - |
| tm-grace-potter-2027-bozeman-g5vzz_pprxf60 | Grace Potter | refresh (applied) | 8364387 | https://www.ticketliquidator.com/tickets/8364387/Grace-Potter-tickets-Sat-Mar-20-2027-The-Elm-Bozeman | - |
| tm-grace-potter-2027-missoula-g5vzz_pf4jtaa | Grace Potter | refresh (applied) | 8364388 | https://www.ticketliquidator.com/tickets/8364388/Grace-Potter-tickets-Sun-Mar-21-2027-The-Wilma-Theatre-MT | - |
| tm-grace-potter-2027-spokane-g5vzz_penguiq | Grace Potter | refresh (applied) | 8364389 | https://www.ticketliquidator.com/tickets/8364389/Grace-Potter-tickets-Mon-Mar-22-2027-Knitting-Factory-Spokane | - |
| tm-grace-potter-2027-medford-z7r9jz1aaa64t | Grace Potter | refresh (applied) | 8370569 | https://www.ticketliquidator.com/tickets/8370569/Grace-Potter-tickets-Wed-Mar-24-2027-Holly-Theatre-OR | - |
| tm-grace-potter-2027-eugene-z7r9jz1aaa64y | Grace Potter | refresh (applied) | 8365313 | https://www.ticketliquidator.com/tickets/8365313/Grace-Potter-tickets-Thu-Mar-25-2027-McDonald-Theatre | - |
| tm-grace-potter-2027-portland-z7r9jz1aaa64s | Grace Potter | refresh (applied) | 8364773 | https://www.ticketliquidator.com/tickets/8364773/Grace-Potter-tickets-Fri-Mar-26-2027-McMenamins-Crystal-Ballroom | - |
| tm-grace-potter-2027-seattle-z7r9jz1aaak_u | Grace Potter | refresh (applied) | 8366328 | https://www.ticketliquidator.com/tickets/8366328/Grace-Potter-tickets-Sat-Mar-27-2027-The-Showbox | - |
| tm-hannah-harper-2027-bloomington-vv1kvyvp_igaglezi | Hannah Harper | refresh (applied) | 8362329 | https://www.ticketliquidator.com/tickets/8362329/Hannah-Harper-tickets-Fri-Feb-5-2027-Bloomington-Center-For-The-Performing-Arts | - |
| tm-hannah-harper-2027-anderson-vv17fz_pgkcrhw1m | Hannah Harper | refresh (applied) | 8362340 | https://www.ticketliquidator.com/tickets/8362340/Hannah-Harper-tickets-Thu-Mar-4-2027-Paramount-Theatre-Anderson | - |
| tm-hannah-harper-2027-danville-vv1a8vpqoga2gqoh | Hannah Harper | correct (applied) | 8364097 | https://www.ticketliquidator.com/tickets/8364097/Hannah-Harper-tickets-Sat-Mar-6-2027-The-Pantheon-at-Caesars-Virginia | - |
| tm-hannah-harper-2027-philadelphia-g5viz_4q8cis7 | Hannah Harper | refresh (applied) | 8361751 | https://www.ticketliquidator.com/tickets/8361751/Hannah-Harper-tickets-Fri-Apr-2-2027-Ellis-Theater | - |
| tm-hannah-harper-2027-huntsville-1aozk4jgkdjcgyp | Hannah Harper | refresh (applied) | 8362331 | https://www.ticketliquidator.com/tickets/8362331/Hannah-Harper-tickets-Sat-Apr-3-2027-Von-Braun-Center-Mars-Music-Hall | - |
| tm-hannah-harper-2027-greensboro-g5evz_4u2tplb | Hannah Harper | refresh (applied) | 8361752 | https://www.ticketliquidator.com/tickets/8361752/Hannah-Harper-tickets-Fri-Apr-30-2027-Piedmont-Hall | - |
| tm-hannah-harper-2027-charlotte-g5evz_4bybnb7 | Hannah Harper | refresh (applied) | 8361753 | https://www.ticketliquidator.com/tickets/8361753/Hannah-Harper-tickets-Sun-May-2-2027-The-Fillmore-Charlotte | - |
| tm-hannah-harper-2027-jim-thorpe-vv1aezk4jgkdldw-w | Hannah Harper | refresh (applied) | 8361754 | https://www.ticketliquidator.com/tickets/8361754/Hannah-Harper-tickets-Sat-May-8-2027-Penns-Peak | - |
| tm-hannah-harper-2027-valparaiso-vv17jz_fgkiiacxj | Hannah Harper | refresh (applied) | 8362333 | https://www.ticketliquidator.com/tickets/8362333/Hannah-Harper-tickets-Sat-May-15-2027-1st-Source-Bank-Amphitheater-at-Central-Park-Plaza | - |
| tm-hannah-harper-2027-augusta-vvg1zz_pq1iixu | Hannah Harper | refresh (applied) | 8361755 | https://www.ticketliquidator.com/tickets/8361755/Hannah-Harper-tickets-Thu-May-20-2027-Bell-Auditorium | - |
| tm-hannah-harper-2027-effingham-vv1kjz_p3eg7ds0b | Hannah Harper | refresh (applied) | 8362334 | https://www.ticketliquidator.com/tickets/8362334/Hannah-Harper-tickets-Fri-Jul-30-2027-Effingham-Performance-Center | - |
| tm-tame-impala-2027-tulsa-1aezz_pgkmxe71m | Tame Impala | refresh (applied) | 8381732 | https://www.ticketliquidator.com/tickets/8381732/Tame-Impala-tickets-Thu-Feb-11-2027-BOK-Center | - |
| tm-stray-kids-2027-chicago-vv167zk4yjazaue56a | Stray Kids | refresh (applied) | 8381019 | https://www.ticketliquidator.com/tickets/8381019/Stray-Kids-tickets-Sat-Jun-19-2027-Soldier-Field | - |
| tm-stray-kids-2027-munich-z698xzc2z1kb0z0om | Stray Kids | refresh (applied) | 8381435 | https://www.ticketliquidator.com/tickets/8381435/Stray-Kids-tickets-Sun-Jul-18-2027-Allianz-Arena | - |
| tm-stray-kids-2027-arnhem-z698xzbpz16vp04wpo | Stray Kids | refresh (applied) | 8381439 | https://www.ticketliquidator.com/tickets/8381439/Stray-Kids-tickets-Wed-Jul-28-2027-Gelredome | - |
| tm-garth-brooks-2026-minneapolis-z7r9jz1aaaff6 | Garth Brooks | refresh (applied) | 8359854 | https://www.ticketliquidator.com/tickets/8359854/Garth-Brooks-tickets-Fri-Dec-11-2026-Target-Center | - |
| tm-sam-fender-2027-milwaukee-z7r9jz1aaaozy | Sam Fender | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Sam Fender; text: Sam Fender Sam Fender /tickets/8370336/Sam-Fender-tickets-Tue-Apr-27-2027-Eagles-Ballroom Sam Fender Sam Fender Eagles Ballroom 147176 CONCE) |
| tm-sam-fender-2027-morrison-z7r9jz1aaaaoe | Sam Fender | refresh (applied) | 8367766 | https://www.ticketliquidator.com/tickets/8367766/Sam-Fender-tickets-Thu-Apr-29-2027-Red-Rocks-Amphitheatre | - |
| tm-billy-strings-2027-saint-augustine-z7r9jz1aaa6ce | Billy Strings | refresh (applied) | 8365017 | https://www.ticketliquidator.com/tickets/8365017/Billy-Strings-tickets-Thu-Apr-8-2027-St-Augustine-Amphitheatre | - |
| tm-billy-strings-2027-saint-augustine-z7r9jz1aaa6cv | Billy Strings | refresh (applied) | 8365019 | https://www.ticketliquidator.com/tickets/8365019/Billy-Strings-tickets-Fri-Apr-9-2027-St-Augustine-Amphitheatre | - |
| tm-billy-strings-2027-saint-augustine-z7r9jz1aaa40k | Billy Strings | refresh (applied) | 8365020 | https://www.ticketliquidator.com/tickets/8365020/Billy-Strings-tickets-Sat-Apr-10-2027-St-Augustine-Amphitheatre | - |
| tm-billy-strings-2027-saint-augustine-z7r9jz1aaa6cd | Billy Strings | refresh (applied) | 8365021 | https://www.ticketliquidator.com/tickets/8365021/Billy-Strings-tickets-Mon-Apr-12-2027-St-Augustine-Amphitheatre | - |
| tm-billy-strings-2027-saint-augustine-z7r9jz1aaab04 | Billy Strings | refresh (applied) | 8365022 | https://www.ticketliquidator.com/tickets/8365022/Billy-Strings-tickets-Tue-Apr-13-2027-St-Augustine-Amphitheatre | - |
| tm-jon-pardi-2026-nashville-g5viz_p4pjkae | Jon Pardi | none | - | - | no qualifying listing (complete catalog checked) |
| tm-two-door-cinema-club-2027-scarborough-1agzk4pgkd-8j_w | Two Door Cinema Club | none | - | - | no qualifying listing (complete catalog checked) |
| tm-two-door-cinema-club-2027-halifax-1ku8vp3fga2fekm | Two Door Cinema Club | none | - | - | no qualifying listing (complete catalog checked) |
| tm-foreigner-2027-irvine-z7r9jz1aaa6uy | Foreigner | refresh (applied) | 8362541 | https://www.ticketliquidator.com/tickets/8362541/Foreigner-tickets-Sat-Mar-27-2027-Great-Park-Live | - |
| tm-mat-kearney-2027-carmel-z7r9jz1aaa_49 | Mat Kearney | refresh (applied) | 8346477 | https://www.ticketliquidator.com/tickets/8346477/Mat-Kearney-tickets-Sun-Nov-14-2027-The-Payne-Mencias-Palladium-At-Allied-Solutions-Center-For-The-Performing-Arts | - |
| tm-kpop-demon-hunters-2027-newark-vv1aezk4pgkd6hbhj | KPop Demon Hunters | refresh (applied) | 8382021 | https://www.ticketliquidator.com/tickets/8382021/KPOP-Demon-Hunters-tickets-Sun-Jun-13-2027-Prudential-Center | - |
| tm-kpop-demon-hunters-2027-columbus-vv1aazk4pgkdbznja | KPop Demon Hunters | refresh (applied) | 8383620 | https://www.ticketliquidator.com/tickets/8383620/KPop-Demon-Hunters-Golden-World-Tour-tickets-Tue-Jun-15-2027-Value-City-Arena-at-The-Schottenstein-Center | - |
| tm-kpop-demon-hunters-2027-chicago-vv178z_pgkra4jvj | KPop Demon Hunters | refresh (applied) | 8381708 | https://www.ticketliquidator.com/tickets/8381708/KPOP-Demon-Hunters-tickets-Sun-Jun-20-2027-United-Center | - |
| tm-kpop-demon-hunters-2027-ontario-z7r9jz1aaa_zm | KPop Demon Hunters | refresh (applied) | 8369633 | https://www.ticketliquidator.com/tickets/8369633/KPOP-Demon-Hunters-tickets-Wed-Aug-4-2027-Toyota-Arena-Ontario | - |
| tm-two-friends-2027-miami-beach-rz7hnez1a4vo7k | Two Friends | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jhene-aiko-2027-los-angeles-g5eyz_9ditouk | Jhene Aiko | refresh (applied) | 8382025 | https://www.ticketliquidator.com/tickets/8382025/Jhene-Aiko-tickets-Sat-May-22-2027-Cryptocom-Arena | - |
| tm-hannah-harper-2027-richmond-z7r9jz1aaa_qa | Hannah Harper | refresh (applied) | 8362343 | https://www.ticketliquidator.com/tickets/8362343/Hannah-Harper-tickets-Sun-Mar-7-2027-Carpenter-Theatre-At-Dominion-Energy-Center | - |
| tm-morgan-wallen-2027-athens-z7r9jz1aaa8ay | Morgan Wallen | refresh (applied) | 8367172 | https://www.ticketliquidator.com/tickets/8367172/Morgan-Wallen-tickets-Fri-Jul-16-2027-Sanford-Stadium | - |
| tm-morgan-wallen-2027-athens-z7r9jz1aaa8ke | Morgan Wallen | refresh (applied) | 8367174 | https://www.ticketliquidator.com/tickets/8367174/Morgan-Wallen-tickets-Sat-Jul-17-2027-Sanford-Stadium | - |
| tm-santana-2027-highland-z7r9jz1aaa4kf | Santana | refresh (applied) | 8376060 | https://www.ticketliquidator.com/tickets/8376060/Santana-tickets-Tue-Feb-23-2027-Yaamava-Theater-at-Yaamava-Resort-Casino | - |
| tm-santana-2027-hanover-z7r9jz1aaa4k8 | Santana | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Santana; text: Santana Santana /tickets/8376061/Santana-tickets-Fri-Mar-26-2027-The-Hall-at-Maryland-Live Santana Santana The Hall at Maryland Live 905 CON) |
| tm-santana-2027-lancaster-z7r9jz1aaa4ak | Santana | refresh (applied) | 8376062 | https://www.ticketliquidator.com/tickets/8376062/Santana-tickets-Wed-Apr-7-2027-American-Music-Theatre | - |
| tm-stray-kids-2027-arlington-z7r9jz1aaaapu | Stray Kids | refresh (applied) | 8361514 | https://www.ticketliquidator.com/tickets/8361514/Stray-Kids-tickets-Thu-Jun-3-2027-ATT-Stadium | - |
| tm-stray-kids-2027-baltimore-z7r9jz1aaaapm | Stray Kids | refresh (applied) | 8361521 | https://www.ticketliquidator.com/tickets/8361521/Stray-Kids-tickets-Tue-Jun-22-2027-MT-Bank-Stadium | - |
| tm-megadeth-2027-morrison-z7r9jz1aaa3_o | Megadeth | refresh (applied) | 8373274 | https://www.ticketliquidator.com/tickets/8373274/Megadeth-tickets-Wed-May-26-2027-Red-Rocks-Amphitheatre | - |
| tm-megadeth-2027-nampa-z7r9jz1aaa3_- | Megadeth | refresh (applied) | 8373319 | https://www.ticketliquidator.com/tickets/8373319/Megadeth-tickets-Tue-Sep-28-2027-Arena-At-Ford-Idaho-Center | - |
| tm-megadeth-2027-missoula-z7r9jz1aaa3_n | Megadeth | refresh (applied) | 8373321 | https://www.ticketliquidator.com/tickets/8373321/Megadeth-tickets-Wed-Sep-29-2027-Dahlberg-Arena-At-Adams-Event-Center | - |
| tm-megadeth-2027-spokane-z7r9jz1aaa3_0 | Megadeth | refresh (applied) | 8373322 | https://www.ticketliquidator.com/tickets/8373322/Megadeth-tickets-Thu-Sep-30-2027-Numerica-Veterans-Arena | - |
| tm-alex-warren-2027-des-moines-z7r9jz1aaaoat | Alex Warren | refresh (applied) | 8369853 | https://www.ticketliquidator.com/tickets/8369853/Alex-Warren-tickets-Tue-Apr-20-2027-Caseys-Center | - |
| tm-alex-warren-2027-madison-z7r9jz1aaaoaw | Alex Warren | refresh (applied) | 8369858 | https://www.ticketliquidator.com/tickets/8369858/Alex-Warren-tickets-Sun-Apr-25-2027-Kohl-Center | - |
| tm-alex-warren-2027-rho-zg9rmiynyzae7k | Alex Warren | none | - | - | no qualifying listing (complete catalog checked) |
| tm-remi-wolf-2027-phoenix-1av0z_pgkubifhc | Remi Wolf | refresh (applied) | 8383030 | https://www.ticketliquidator.com/tickets/8383030/Remi-Wolf-tickets-Tue-May-4-2027-The-Van-Buren | - |
| tm-foreigner-2027-clearwater-z7r9jz1aaez8o | Foreigner | refresh (applied) | 8286223 | https://www.ticketliquidator.com/tickets/8286223/Foreigner-The-Hits-Unplugged-Tribute-tickets-Tue-Feb-16-2027-Ruth-Eckerd-Hall | - |
| tm-cody-johnson-2027-albany-k7vgf_p30ueon | Cody Johnson | refresh (applied) | 8383249 | https://www.ticketliquidator.com/tickets/8383249/Cody-Johnson-tickets-Fri-Mar-12-2027-MVP-Arena | - |
| tm-cody-johnson-2027-kansas-city-z7r9jz1aaaf8f | Cody Johnson | refresh (applied) | 8369883 | https://www.ticketliquidator.com/tickets/8369883/Cody-Johnson-tickets-Sat-Apr-17-2027-T-Mobile-Center | - |
| tm-mat-kearney-2027-charlottesville-z7r9jz1aaa-pv | Mat Kearney | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mat-kearney-2027-pelham-z7r9jz1aaa_at | Mat Kearney | refresh (applied) | 8344148 | https://www.ticketliquidator.com/tickets/8344148/Mat-Kearney-tickets-Sat-Nov-20-2027-The-Caverns-TN | - |
| tm-kpop-demon-hunters-2027-sunrise-z7r9jz1aaa4-e | KPop Demon Hunters | refresh (applied) | 8369628 | https://www.ticketliquidator.com/tickets/8369628/KPOP-Demon-Hunters-tickets-Wed-Jul-14-2027-Amerant-Bank-Arena | - |
| tm-kpop-demon-hunters-2027-los-angeles-z7r9jz1aaaf4w | KPop Demon Hunters | refresh (applied) | 8369629 | https://www.ticketliquidator.com/tickets/8369629/KPOP-Demon-Hunters-tickets-Fri-Jul-30-2027-Cryptocom-Arena | - |
| tm-kpop-demon-hunters-2027-los-angeles-z7r9jz1aaaf4v | KPop Demon Hunters | correct (applied) | 8369630 | https://www.ticketliquidator.com/tickets/8369630/KPOP-Demon-Hunters-tickets-Sat-Jul-31-2027-Cryptocom-Arena | - |
| tm-kpop-demon-hunters-2027-las-vegas-z7r9jz1aaa_kp | KPop Demon Hunters | correct (applied) | 8369634 | https://www.ticketliquidator.com/tickets/8369634/KPOP-Demon-Hunters-tickets-Sat-Aug-7-2027-T-Mobile-Arena | - |
| tm-kpop-demon-hunters-2027-oakland-z7r9jz1aaa_ff | KPop Demon Hunters | refresh (applied) | 8370359 | https://www.ticketliquidator.com/tickets/8370359/KPOP-Demon-Hunters-tickets-Tue-Aug-10-2027-Oakland-Arena | - |
| tm-kpop-demon-hunters-2027-oakland-z7r9jz1aaa_fa | KPop Demon Hunters | refresh (applied) | 8370360 | https://www.ticketliquidator.com/tickets/8370360/KPOP-Demon-Hunters-tickets-Wed-Aug-11-2027-Oakland-Arena | - |
| tm-intocable-2027-nashville-z7r9jz1aaak0d | Intocable | refresh (applied) | 8381449 | https://www.ticketliquidator.com/tickets/8381449/Intocable-tickets-Sat-Feb-27-2027-The-Pinnacle-At-Nashville-Yards | - |
| tm-intocable-2027-indio-z7r9jz1aaak07 | Intocable | refresh (applied) | 8381645 | https://www.ticketliquidator.com/tickets/8381645/Intocable-tickets-Sat-Mar-20-2027-Fantasy-Springs-Resort-Casino | - |
| tm-jhene-aiko-2027-sunrise-z7r9jz1aaa4az | Jhene Aiko | refresh (applied) | 8379800 | https://www.ticketliquidator.com/tickets/8379800/Jhene-Aiko-tickets-Wed-Apr-14-2027-Amerant-Bank-Arena | - |
| tm-jhene-aiko-2027-houston-z7r9jz1aaa4ay | Jhene Aiko | refresh (applied) | 8376232 | https://www.ticketliquidator.com/tickets/8376232/Jhene-Aiko-tickets-Sat-Apr-24-2027-Toyota-Center-TX | - |
| tm-jhene-aiko-2027-las-vegas-z7r9jz1aaa41z | Jhene Aiko | refresh (applied) | 8381764 | https://www.ticketliquidator.com/tickets/8381764/Jhene-Aiko-tickets-Fri-Apr-30-2027-T-Mobile-Arena | - |
| tm-tori-kelly-2026-manchester-g5vhz_1r4owph | Tori Kelly | refresh (applied) | 8386321 | https://www.ticketliquidator.com/tickets/8386321/Tori-Kelly-tickets-Mon-Dec-7-2026-Albert-Hall-Manchester | - |
| tm-tori-kelly-2026-birmingham-g5dzz_1hposmp | Tori Kelly | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tori-kelly-2026-bristol-g5dzz_1qs13cg | Tori Kelly | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tori-kelly-2026-london-g5dzz_1hlw0l0 | Tori Kelly | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tori-kelly-2027-san-diego-vvg1iz_pmacvcd | Tori Kelly | refresh (applied) | 8374484 | https://www.ticketliquidator.com/tickets/8374484/Tori-Kelly-tickets-Wed-Mar-17-2027-House-Of-Blues-San-Diego | - |
| tm-tori-kelly-2027-anaheim-vv170z_pgkmqbskf | Tori Kelly | refresh (applied) | 8384056 | https://www.ticketliquidator.com/tickets/8384056/Tori-Kelly-tickets-Fri-Mar-19-2027-House-Of-Blues-Anaheim | - |
| tm-tori-kelly-2027-phoenix-1av0z_pgkgtcw3p | Tori Kelly | refresh (applied) | 8374485 | https://www.ticketliquidator.com/tickets/8374485/Tori-Kelly-tickets-Sat-Mar-20-2027-The-Van-Buren | - |
| tm-tori-kelly-2027-tulsa-z7r9jz1aaafav | Tori Kelly | refresh (applied) | 8375003 | https://www.ticketliquidator.com/tickets/8375003/Tori-Kelly-tickets-Mon-Mar-22-2027-Cains-Ballroom | - |
| tm-tori-kelly-2027-austin-z7r9jz1aaafaz | Tori Kelly | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Tori Kelly; text: Tori Kelly Tori Kelly /tickets/8381783/Tori-Kelly-tickets-Wed-Mar-24-2027-ACL-Live-At-The-Moody-Theater Tori Kelly Tori Kelly ACL Live At Th) |
| tm-tori-kelly-2027-houston-g5diz_prlk7d5 | Tori Kelly | refresh (applied) | 8374487 | https://www.ticketliquidator.com/tickets/8374487/Tori-Kelly-tickets-Thu-Mar-25-2027-House-Of-Blues-Houston | - |
| tm-tori-kelly-2027-dallas-vvg1yz_ptdvq44 | Tori Kelly | refresh (applied) | 8374489 | https://www.ticketliquidator.com/tickets/8374489/Tori-Kelly-tickets-Fri-Mar-26-2027-House-Of-Blues-Dallas | - |
| tm-tori-kelly-2027-new-orleans-g5viz_proo-gj | Tori Kelly | refresh (applied) | 8374490 | https://www.ticketliquidator.com/tickets/8374490/Tori-Kelly-tickets-Mon-Mar-29-2027-House-Of-Blues-New-Orleans | - |
| tm-tori-kelly-2027-st-petersburg-vvg1vz_pwiq_m9 | Tori Kelly | refresh (applied) | 8374493 | https://www.ticketliquidator.com/tickets/8374493/Tori-Kelly-tickets-Wed-Mar-31-2027-Jannus-Live | - |
| tm-tori-kelly-2027-orlando-1aefz_pgkmnverq | Tori Kelly | refresh (applied) | 8374495 | https://www.ticketliquidator.com/tickets/8374495/Tori-Kelly-tickets-Thu-Apr-1-2027-Hard-Rock-Live-Orlando | - |
| tm-tori-kelly-2027-ft-lauderdale-vvg1vz_pv-mndp | Tori Kelly | refresh (applied) | 8374496 | https://www.ticketliquidator.com/tickets/8374496/Tori-Kelly-tickets-Sat-Apr-3-2027-Revolution-Live | - |
| tm-tori-kelly-2027-nashville-g5viz_pmv-gvm | Tori Kelly | refresh (applied) | 8375138 | https://www.ticketliquidator.com/tickets/8375138/Tori-Kelly-tickets-Wed-Apr-7-2027-The-Truth | - |
| tm-tori-kelly-2027-charlotte-g5evz_pr3nkrd | Tori Kelly | refresh (applied) | 8374499 | https://www.ticketliquidator.com/tickets/8374499/Tori-Kelly-tickets-Thu-Apr-8-2027-The-Fillmore-Charlotte | - |
| tm-tori-kelly-2027-atlanta-vvg1zz_pr5yym7 | Tori Kelly | refresh (applied) | 8374501 | https://www.ticketliquidator.com/tickets/8374501/Tori-Kelly-tickets-Sat-Apr-10-2027-The-Tabernacle-GA | - |
| tm-tori-kelly-2027-raleigh-g5evz_pmhkhqy | Tori Kelly | refresh (applied) | 8374503 | https://www.ticketliquidator.com/tickets/8374503/Tori-Kelly-tickets-Sun-Apr-11-2027-The-Ritz-Raleigh | - |
| tm-tori-kelly-2027-boston-vv177z_pgkresuwf | Tori Kelly | refresh (applied) | 8374504 | https://www.ticketliquidator.com/tickets/8374504/Tori-Kelly-tickets-Wed-Apr-14-2027-Citizens-House-Of-Blues-Boston | - |
| tm-tori-kelly-2027-silver-spring-1avfz_pgksegqna | Tori Kelly | refresh (applied) | 8374505 | https://www.ticketliquidator.com/tickets/8374505/Tori-Kelly-tickets-Fri-Apr-16-2027-The-Fillmore-Silver-Spring | - |
| tm-tori-kelly-2027-philadelphia-z7r9jz1aaafa- | Tori Kelly | refresh (applied) | 8377710 | https://www.ticketliquidator.com/tickets/8377710/Tori-Kelly-tickets-Sat-Apr-17-2027-Franklin-Music-Hall | - |
| tm-tori-kelly-2027-brooklyn-k7vgf_phude5k | Tori Kelly | refresh (applied) | 8374507 | https://www.ticketliquidator.com/tickets/8374507/Tori-Kelly-tickets-Sun-Apr-18-2027-Brooklyn-Paramount | - |
| tm-tori-kelly-2027-toronto-1avzz_pgkvx9zdy | Tori Kelly | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tori-kelly-2027-detroit-vv17oz_pgkcxk3hy | Tori Kelly | refresh (applied) | 8374510 | https://www.ticketliquidator.com/tickets/8374510/Tori-Kelly-tickets-Fri-Apr-23-2027-The-Fillmore-Detroit | - |
| tm-tori-kelly-2027-louisville-1avbz_pgksxzvfu | Tori Kelly | refresh (applied) | 8374512 | https://www.ticketliquidator.com/tickets/8374512/Tori-Kelly-tickets-Sat-Apr-24-2027-Louisville-Palace | - |
| tm-tori-kelly-2027-indianapolis-vv17fz_pgkswj0w7 | Tori Kelly | refresh (applied) | 8374513 | https://www.ticketliquidator.com/tickets/8374513/Tori-Kelly-tickets-Tue-Apr-27-2027-Egyptian-Room-At-Old-National-Centre | - |
| tm-tori-kelly-2027-milwaukee-z7r9jz1aaa4u3 | Tori Kelly | none | - | - | no qualifying listing (complete catalog checked) |
| tm-tori-kelly-2027-chicago-vv178z_pgkrb2cst | Tori Kelly | refresh (applied) | 8374514 | https://www.ticketliquidator.com/tickets/8374514/Tori-Kelly-tickets-Fri-Apr-30-2027-House-Of-Blues-Chicago | - |
| tm-tori-kelly-2027-minneapolis-z7r9jz1aaa4uk | Tori Kelly | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch, venue mismatch; listing: Tori Kelly; text: Tori Kelly Tori Kelly /tickets/8383128/Tori-Kelly-tickets-Sat-May-1-2027-Fitzgerald-Theater Tori Kelly Tori Kelly Fitzgerald Theater 58408 C) |
| tm-tori-kelly-2027-saint-louis-vv17bz_pgkmbgu0t | Tori Kelly | refresh (applied) | 8374515 | https://www.ticketliquidator.com/tickets/8374515/Tori-Kelly-tickets-Tue-May-4-2027-The-Pageant | - |
| tm-tori-kelly-2027-kansas-city-z7r9jz1aaaffz | Tori Kelly | refresh (applied) | 8378007 | https://www.ticketliquidator.com/tickets/8378007/Tori-Kelly-tickets-Wed-May-5-2027-The-Truman-Kansas-City | - |
| tm-tori-kelly-2027-denver-g5vzz_pmqeaxk | Tori Kelly | refresh (applied) | 8374516 | https://www.ticketliquidator.com/tickets/8374516/Tori-Kelly-tickets-Sat-May-8-2027-The-Summit-Music-Hall | - |
| tm-tori-kelly-2027-salt-lake-city-g5vzz_pw0n4ot | Tori Kelly | refresh (applied) | 8374517 | https://www.ticketliquidator.com/tickets/8374517/Tori-Kelly-tickets-Sun-May-9-2027-The-Depot-Salt-Lake-City | - |
| tm-tori-kelly-2027-vancouver-1av7z_pgkwlyauw | Tori Kelly | refresh (applied) | 8374525 | https://www.ticketliquidator.com/tickets/8374525/Tori-Kelly-tickets-Wed-May-12-2027-Queen-Elizabeth-Theatre-Vancouver | - |
| tm-tori-kelly-2027-seattle-z7r9jz1aaafgn | Tori Kelly | refresh (applied) | 8386776 | https://www.ticketliquidator.com/tickets/8386776/Tori-Kelly-tickets-Thu-May-13-2027-Showbox-SoDo | - |
| tm-tori-kelly-2027-portland-z7r9jz1aaafff | Tori Kelly | refresh (applied) | 8375222 | https://www.ticketliquidator.com/tickets/8375222/Tori-Kelly-tickets-Fri-May-14-2027-McMenamins-Crystal-Ballroom | - |
| tm-tori-kelly-2027-sacramento-g5vyz_puiau1t | Tori Kelly | refresh (applied) | 8374519 | https://www.ticketliquidator.com/tickets/8374519/Tori-Kelly-tickets-Tue-May-18-2027-Channel-24 | - |
| tm-tori-kelly-2027-hollywood-vv170z_pgkwplbll | Tori Kelly | refresh (applied) | 8374521 | https://www.ticketliquidator.com/tickets/8374521/Tori-Kelly-tickets-Thu-May-20-2027-Hollywood-Palladium | - |
| tm-chris-tomlin-2026-birmingham-1kfzvpfyga2ugky | Chris Tomlin | refresh (applied) | 8249187 | https://www.ticketliquidator.com/tickets/8249187/Chris-Tomlin-tickets-Mon-Nov-30-2026-Alabama-Theatre-Birmingham | - |
| tm-chris-tomlin-2026-birmingham-1aezz_ogkloidyk | Chris Tomlin | refresh (applied) | 8238832 | https://www.ticketliquidator.com/tickets/8238832/Chris-Tomlin-tickets-Tue-Dec-1-2026-Alabama-Theatre-Birmingham | - |
| tm-chris-tomlin-2026-daytona-beach-z7r9jz1aav44a | Chris Tomlin | refresh (applied) | 8238946 | https://www.ticketliquidator.com/tickets/8238946/Chris-Tomlin-tickets-Wed-Dec-2-2026-Peabody-Auditorium | - |
| tm-chris-tomlin-2026-north-charleston-g5evz_oontasw | Chris Tomlin | refresh (applied) | 8238834 | https://www.ticketliquidator.com/tickets/8238834/Chris-Tomlin-tickets-Thu-Dec-3-2026-North-Charleston-Performing-Arts-Center | - |
| tm-chris-tomlin-2026-pensacola-g5viz_on0-j6v | Chris Tomlin | refresh (applied) | 8238836 | https://www.ticketliquidator.com/tickets/8238836/Chris-Tomlin-tickets-Fri-Dec-4-2026-Saenger-Theatre-FL | - |
| tm-chris-tomlin-2026-knoxville-g5viz_ojuxkcz | Chris Tomlin | refresh (applied) | 8238838 | https://www.ticketliquidator.com/tickets/8238838/Chris-Tomlin-tickets-Tue-Dec-8-2026-Knoxville-Civic-Auditorium | - |
| tm-chris-tomlin-2026-newport-news-z7r9jz1aavoof | Chris Tomlin | refresh (applied) | 8238947 | https://www.ticketliquidator.com/tickets/8238947/Chris-Tomlin-tickets-Wed-Dec-9-2026-Diamonstein-Concert-Hall-CNU-Ferguson-Center-for-the-Arts | - |
| tm-chris-tomlin-2026-jersey-city-vv1aezkf_gkedtdkm | Chris Tomlin | refresh (applied) | 8238839 | https://www.ticketliquidator.com/tickets/8238839/Chris-Tomlin-tickets-Thu-Dec-10-2026-Loews-Jersey-Theatre | - |
| tm-chris-tomlin-2026-detroit-z7r9jz1aav34i | Chris Tomlin | refresh (applied) | 8238948 | https://www.ticketliquidator.com/tickets/8238948/Chris-Tomlin-tickets-Tue-Dec-15-2026-Fisher-Theatre-MI | - |
| tm-chris-tomlin-2026-indianapolis-vv17fz_ogkmojkil | Chris Tomlin | refresh (applied) | 8238843 | https://www.ticketliquidator.com/tickets/8238843/Chris-Tomlin-tickets-Wed-Dec-16-2026-Murat-Theatre-at-Old-National-Centre | - |
| tm-chris-tomlin-2026-milwaukee-z7r9jz1aav4be | Chris Tomlin | refresh (applied) | 8238949 | https://www.ticketliquidator.com/tickets/8238949/Chris-Tomlin-tickets-Thu-Dec-17-2026-Riverside-Theater-WI | - |
| tm-chris-tomlin-2026-cincinnati-1avbz_ogknrwawm | Chris Tomlin | refresh (applied) | 8238845 | https://www.ticketliquidator.com/tickets/8238845/Chris-Tomlin-tickets-Fri-Dec-18-2026-Taft-Theatre | - |
| tm-chris-tomlin-2027-nashville-g5viz_6t7chyi | Chris Tomlin | refresh (applied) | 7850295 | https://www.ticketliquidator.com/tickets/7850295/Chris-Tomlin-tickets-Fri-Mar-26-2027-Bridgestone-Arena | - |
| tm-rascal-flatts-2026-las-vegas-17c8v0g6c1qpoq5 | Rascal Flatts | refresh (applied) | 8112214 | https://www.ticketliquidator.com/tickets/8112214/Rascal-Flatts-tickets-Sat-Dec-5-2026-The-Colosseum-At-Caesars-Palace | - |
| tm-rascal-flatts-2027-rexburg-z7r9jz1aaa-fg | Rascal Flatts | refresh (applied) | 8381500 | https://www.ticketliquidator.com/tickets/8381500/Rascal-Flatts-tickets-Sat-Mar-20-2027-BYU-Idaho-Center | - |
| tm-raye-2027-london-1amzk4pgkdnol-0 | RAYE | refresh (applied) | 8353468 | https://www.ticketliquidator.com/tickets/8353468/Raye-tickets-Sat-Jul-10-2027-Hyde-Park-London | - |
| tm-raye-2027-london-1amzk49gkeww5xa | RAYE | refresh (applied) | 8386080 | https://www.ticketliquidator.com/tickets/8386080/Raye-tickets-Sun-Jul-11-2027-Hyde-Park-London | - |
| tm-john-summit-2026-miami-beach-rz7hnez1a4vjgn | John Summit | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: John Summit; text: John Summit John Summit /tickets/8386817/John-Summit-tickets-Wed-Dec-2-2026-LIV-At-Fontainebleau John Summit John Summit LIV At Fontaineblea) |
| tm-john-summit-2026-los-angeles-vvg1iz_oam_0zm | John Summit | refresh (applied) | 8386725 | https://www.ticketliquidator.com/tickets/8386725/John-Summit-tickets-Fri-Dec-11-2026-Los-Angeles-Memorial-Coliseum | - |
| tm-pink-martini-2026-santa-rosa-z7r9jz1aaax7p | Pink Martini | refresh (applied) | 7995465 | https://www.ticketliquidator.com/tickets/7995465/Pink-Martini-All-Stars-tickets-Tue-Dec-8-2026-Luther-Burbank-Center-for-the-Arts-Ruth-Finley-Person-Theater | - |
| tm-chris-brown-2026-miami-beach-rz7hnez1a4vjgk | Chris Brown | none | - | - | no qualifying listing (complete catalog checked) |
| tm-garth-brooks-2027-lexington-1faovpqvbjz78a57 | Garth Brooks | refresh (applied) | 8386279 | https://www.ticketliquidator.com/tickets/8386279/Garth-Brooks-tickets-Fri-Feb-12-2027-Rupp-Arena-At-Central-Bank-Center | - |
| tm-garth-brooks-2027-lexington-16pzk4vaxzag8a5f | Garth Brooks | refresh (applied) | 8386280 | https://www.ticketliquidator.com/tickets/8386280/Garth-Brooks-tickets-Sat-Feb-13-2027-Rupp-Arena-At-Central-Bank-Center | - |
| tm-tom-jones-2027-tramore-rd-cork-1abzk4ygkdk8vmb | Tom Jones | none | - | - | no qualifying listing (complete catalog checked) |
| tm-bon-jovi-2027-london-1adjz_fgkuq9ee5 | Bon Jovi | refresh (applied) | 8329073 | https://www.ticketliquidator.com/tickets/8329073/Bon-Jovi-tickets-Thu-Jun-24-2027-Hyde-Park-London | - |
| tm-cody-johnson-2027-charlottesville-vv1avzk4ygkdfzn-t | Cody Johnson | refresh (applied) | 8387868 | https://www.ticketliquidator.com/tickets/8387868/Cody-Johnson-tickets-Fri-Apr-2-2027-John-Paul-Jones-Arena | - |
| tm-cody-johnson-2027-evansville-vv1aazk4ngkdekbkk | Cody Johnson | refresh (applied) | 8387948 | https://www.ticketliquidator.com/tickets/8387948/Cody-Johnson-tickets-Fri-Apr-30-2027-Ford-Center-IN | - |
| tm-hardy-2027-london-g5dzz_9fvtbjx | Hardy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hardy-2027-manchester-g5dzz_96q1kyy | Hardy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hardy-2027-glasgow-1auzk4sgketugdu | Hardy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-hardy-2027-belfast-1adoz_pgkuppsm9 | Hardy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-feid-2027-chicago-vv1kvzvpq9gach3aw | FEID | refresh (applied) | 8386631 | https://www.ticketliquidator.com/tickets/8386631/Feid-tickets-Fri-Mar-19-2027-United-Center | - |
| tm-feid-2027-inglewood-vv1ke8vpq_gac1mpx | FEID | none | - | - | no qualifying listing (complete catalog checked) |
| tm-travis-tritt-2027-jacksonville-z7r9jz1aaaf8p | Travis Tritt | refresh (applied) | 8367257 | https://www.ticketliquidator.com/tickets/8367257/Travis-Tritt-tickets-Wed-Mar-10-2027-Florida-Theatre-Jacksonville | - |
| tm-chris-tomlin-2027-morrison-z7r9jz1aaa9vg | Chris Tomlin | refresh (applied) | 8379101 | https://www.ticketliquidator.com/tickets/8379101/Chris-Tomlin-tickets-Mon-May-24-2027-Red-Rocks-Amphitheatre | - |
| tm-powderfinger-2027-bowen-hills-1k7yvpomga5tx6s | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-bowen-hills-16vgz_f-wg7xsqt | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-bowen-hills-16vgz_f-wg7xsqr | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-bowen-hills-16vgz_f-wg7xsqs | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-bowen-hills-16vgz_f-wg7tvqs | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-bowen-hills-16vgz_f-wg7tvqg | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-westcourt-1ka8vpoygagbsx2 | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-westcourt-1apzk4fgken8vl2 | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-east-perth-1akzk4fgkeyukxi | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-east-perth-16vgz_fpmg7hx1q | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-east-perth-16vgz_fpmg7hx1r | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-sydney-1akzk46gkdqpnzu | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-sydney-1akzk4fgkd_qb_v | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-sydney-1akzk4fgkd_z1h4 | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-sydney-1akzk4fgkdqv1hi | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-sydney-1akzk4fgkdqabj6 | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-sydney-1akzk4fgkdq4qju | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-adelaide-1akzk46gkezazeo | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-adelaide-1akzk46gkdlbdc4 | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-melbourne-1apzk4fgkei00m- | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-melbourne-1apzk4fgkdoeeea | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-melbourne-1apzk4fgkdoeee6 | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-melbourne-1apzk4fgkdoeme2 | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-melbourne-1apzk4fgkdoi9e3 | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-melbourne-1aefz_fgkxvpad9 | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-melbourne-1apzk49gkdahuzu | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-melbourne-1apzk49gkdawczh | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-new-town-1aefz_4gkmua4ux | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-new-town-1aefz_4gkwn0f-6 | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-caversham-1avgz_4gklqcbyy | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-caversham-1avgz_4gkm_nd5y | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-parkes-1avgz_4gkmmigtv | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-parkes-1avgz_4gkrpif0p | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-bowen-hills-1avgz_4gkwmdz73 | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-powderfinger-2027-bowen-hills-1avgz_4gkue2jyq | Powderfinger | none | - | - | no qualifying listing (complete catalog checked) |
| tm-slash-2027-cardiff-g5vhz_kueusb3 | Slash | none | - | - | no qualifying listing (complete catalog checked) |
| tm-slash-2027-scarborough-1adfz_kgkdfwywm | Slash | none | - | - | no qualifying listing (complete catalog checked) |
| tm-slash-2027-dublin-1avoz_kgkslysih | Slash | none | - | - | no qualifying listing (complete catalog checked) |
| tm-slash-2027-belfast-1adoz_kgkuhgo_o | Slash | none | - | - | no qualifying listing (complete catalog checked) |
| tm-slash-2027-halifax-1adfz_kgks-vju1 | Slash | none | - | - | no qualifying listing (complete catalog checked) |
| tm-slash-2027-london-1auzk4v0gjzzeck | Slash | none | - | - | no qualifying listing (complete catalog checked) |
| tm-culture-club-2026-bournemouth-17uov0g659y_xj3 | Culture Club | refresh (applied) | 8090645 | https://www.ticketliquidator.com/tickets/8090645/Boy-George-tickets-Mon-Dec-7-2026-Windsor-Hall-At-Bournemouth-International-Centre | - |
| tm-culture-club-2026-cardiff-17uov0g65qatjh8 | Culture Club | refresh (applied) | 8090642 | https://www.ticketliquidator.com/tickets/8090642/Boy-George-tickets-Tue-Dec-8-2026-Cardiff-International-Arena | - |
| tm-culture-club-2026-manchester-g5vhz_g33v7ia | Culture Club | refresh (applied) | 8090641 | https://www.ticketliquidator.com/tickets/8090641/Boy-George-tickets-Thu-Dec-10-2026-AO-Arena | - |
| tm-culture-club-2026-liverpool-17uyv0g659ybvks | Culture Club | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Culture Club; text: Culture Club Culture Club /tickets/8050099/Culture-Club-tickets-Fri-Dec-11-2026-MS-Bank-Arena Culture Club Culture Club M&S Bank Arena 12952) |
| tm-culture-club-2026-leeds-g5vhz_59ybb3y | Culture Club | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch; listing: Boy George & Culture Club; text: Boy George & Culture Club Boy George & Culture Club /tickets/8090647/Boy-George-tickets-Sat-Dec-12-2026-First-Direct-Arena Boy George & Cult) |
| tm-culture-club-2026-newcastle-upon-tyne-g5vhz_59ybf3i | Culture Club | refresh (applied) | 8090644 | https://www.ticketliquidator.com/tickets/8090644/Boy-George-tickets-Sun-Dec-13-2026-Utilita-Arena-Newcastle | - |
| tm-culture-club-2026-glasgow-17uov0g659z_cry | Culture Club | refresh (applied) | 8090648 | https://www.ticketliquidator.com/tickets/8090648/Boy-George-tickets-Tue-Dec-15-2026-OVO-Hydro | - |
| tm-culture-club-2026-sheffield-17u8v0g659uvycg | Culture Club | refresh (applied) | 8090646 | https://www.ticketliquidator.com/tickets/8090646/Boy-George-tickets-Thu-Dec-17-2026-Utilita-Arena-Sheffield | - |
| tm-culture-club-2026-birmingham-17fyv0g659y9xlw | Culture Club | refresh (applied) | 8090643 | https://www.ticketliquidator.com/tickets/8090643/Boy-George-tickets-Fri-Dec-18-2026-Utilita-Arena-Birmingham | - |
| tm-culture-club-2026-london-17u8v0g659y9_dw | Culture Club | refresh (applied) | 8008391 | https://www.ticketliquidator.com/tickets/8008391/Culture-Club-tickets-Sat-Dec-19-2026-O2-Arena-London | - |
| tm-staind-2027-manchester-g5dzz_92jre09 | Staind | none | - | - | no qualifying listing (complete catalog checked) |
| tm-staind-2027-london-g5dzz_9kck9dk | Staind | none | - | - | no qualifying listing (complete catalog checked) |
| tm-staind-2027-berlin-z698xzc2z1a6oxuf | Staind | none | - | - | no qualifying listing (complete catalog checked) |
| tm-staind-2027-hannover-z698xzc2z1k0-ep0o | Staind | none | - | - | no qualifying listing (complete catalog checked) |
| tm-steve-lacy-2027-london-16dfz_98yg7uf9q | Steve Lacy | add (applied) | 8392541 | https://www.ticketliquidator.com/tickets/8392541/Steve-Lacy-tickets-Mon-Apr-26-2027-O2-Arena-London | - |
| tm-garth-brooks-2027-birmingham-1aozk4mgkenweqi | Garth Brooks | refresh (applied) | 8387775 | https://www.ticketliquidator.com/tickets/8387775/Garth-Brooks-tickets-Fri-Feb-19-2027-Legacy-Arena-at-The-BJCC | - |
| tm-garth-brooks-2027-birmingham-1aozk4mgke0axh7 | Garth Brooks | refresh (applied) | 8387947 | https://www.ticketliquidator.com/tickets/8387947/Garth-Brooks-tickets-Sat-Feb-20-2027-Legacy-Arena-at-The-BJCC | - |
| tm-elevation-worship-2027-portland-vvg1hz_3xxsikj | Elevation Worship | refresh (applied) | 8271495 | https://www.ticketliquidator.com/tickets/8271495/Elevation-Worship-tickets-Sat-Feb-27-2027-Moda-Center-at-the-Rose-Quarter | - |
| tm-tom-jones-2027-london-g5vhz_9c-qabn | Tom Jones | none | - | - | no qualifying listing (complete catalog checked) |
| tm-katseye-2027-edinburgh-1adbz_9rkp3zdc5u | KATSEYE | none | - | - | no qualifying listing (complete catalog checked) |
| tm-u2-2027-miami-vvg1vz_9anpvtf | U2 | refresh (applied) | 8387544 | https://www.ticketliquidator.com/tickets/8387544/U2-tickets-Fri-Aug-13-2027-Hard-Rock-Stadium | - |
| tm-u2-2027-atlanta-vvg1zz_9oen-vc | U2 | refresh (applied) | 8387545 | https://www.ticketliquidator.com/tickets/8387545/U2-tickets-Tue-Aug-17-2027-Mercedes-Benz-Stadium | - |
| tm-u2-2027-east-rutherford-k7vgf_9kczqx4 | U2 | refresh (applied) | 8387548 | https://www.ticketliquidator.com/tickets/8387548/U2-tickets-Thu-Aug-26-2027-MetLife-Stadium | - |
| tm-u2-2027-east-rutherford-k7vgf_9lrnhen | U2 | refresh (applied) | 8387549 | https://www.ticketliquidator.com/tickets/8387549/U2-tickets-Sat-Aug-28-2027-MetLife-Stadium | - |
| tm-u2-2027-chicago-vv1a7zk4vgkdpyr0o | U2 | refresh (applied) | 8387550 | https://www.ticketliquidator.com/tickets/8387550/U2-tickets-Fri-Sep-3-2027-Soldier-Field | - |
| tm-u2-2027-toronto-1a8zk4mgkdfgnhr | U2 | none | - | - | no qualifying listing (complete catalog checked) |
| tm-u2-2027-toronto-1a8zk4mgkdbl1ra | U2 | none | - | - | no qualifying listing (complete catalog checked) |
| tm-u2-2027-foxborough-vv1avzk4wgkew2yy8 | U2 | refresh (applied) | 8387555 | https://www.ticketliquidator.com/tickets/8387555/U2-tickets-Tue-Sep-14-2027-Gillette-Stadium | - |
| tm-u2-2027-inglewood-vvg1iz_92xm4u0 | U2 | refresh (applied) | 8387560 | https://www.ticketliquidator.com/tickets/8387560/U2-tickets-Fri-Oct-1-2027-SoFi-Stadium | - |
| tm-u2-2027-inglewood-vvg1iz_9guf1uh | U2 | refresh (applied) | 8387561 | https://www.ticketliquidator.com/tickets/8387561/U2-tickets-Sat-Oct-2-2027-SoFi-Stadium | - |
| tm-u2-2027-las-vegas-1avjz_9omopzd8fe | U2 | refresh (applied) | 8387562 | https://www.ticketliquidator.com/tickets/8387562/U2-tickets-Sat-Oct-9-2027-Allegiant-Stadium | - |
| tm-u2-2027-santa-clara-g5vyz_9cslwoq | U2 | refresh (applied) | 8387563 | https://www.ticketliquidator.com/tickets/8387563/U2-tickets-Fri-Oct-15-2027-Levis-Stadium | - |
| tm-u2-2027-vancouver-1aozk4vgkdpqxj1 | U2 | refresh (applied) | 8387564 | https://www.ticketliquidator.com/tickets/8387564/U2-tickets-Mon-Oct-18-2027-BC-Place-Stadium | - |
| tm-dermot-kennedy-2027-tampa-vvg1vz_6l1oil8 | Dermot Kennedy | refresh (applied) | 7833437 | https://www.ticketliquidator.com/tickets/7833437/Dermot-Kennedy-tickets-Tue-Aug-24-2027-The-Yuengling-Center | - |
| tm-dermot-kennedy-2027-nashville-z7r9jz1a7-mus | Dermot Kennedy | refresh (applied) | 7833439 | https://www.ticketliquidator.com/tickets/7833439/Dermot-Kennedy-tickets-Thu-Aug-26-2027-Ascend-Federal-Credit-Union-Amphitheater | - |
| tm-dermot-kennedy-2027-atlanta-vvg1zz_6r-fif6 | Dermot Kennedy | refresh (applied) | 7833438 | https://www.ticketliquidator.com/tickets/7833438/Dermot-Kennedy-tickets-Fri-Aug-27-2027-Pinnacle-Amphitheater-at-Chastain-Park | - |
| tm-dermot-kennedy-2027-birmingham-1aozkozgkdjgv_k | Dermot Kennedy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dermot-kennedy-2027-austin-g5diz_6nescpy | Dermot Kennedy | refresh (applied) | 7833440 | https://www.ticketliquidator.com/tickets/7833440/Dermot-Kennedy-tickets-Tue-Aug-31-2027-Moody-Amphitheater | - |
| tm-dermot-kennedy-2027-irving-vvg1yz_6j3sk_v | Dermot Kennedy | refresh (applied) | 7833441 | https://www.ticketliquidator.com/tickets/7833441/Dermot-Kennedy-tickets-Wed-Sep-1-2027-The-Pavilion-at-Toyota-Music-Factory | - |
| tm-dermot-kennedy-2027-bellvue-z7r9jz1a7-mug | Dermot Kennedy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-dermot-kennedy-2027-morrison-z7r9jz1a7-muu | Dermot Kennedy | refresh (applied) | 7833443 | https://www.ticketliquidator.com/tickets/7833443/Dermot-Kennedy-tickets-Sat-Sep-4-2027-Red-Rocks-Amphitheatre | - |
| tm-dermot-kennedy-2027-los-angeles-vv1ke8v0r6gauznui | Dermot Kennedy | refresh (applied) | 7833444 | https://www.ticketliquidator.com/tickets/7833444/Dermot-Kennedy-tickets-Tue-Sep-7-2027-Greek-Theatre-Los-Angeles-CA | - |
| tm-dermot-kennedy-2027-phoenix-1kk8v0r_gac5gqt | Dermot Kennedy | refresh (applied) | 7833445 | https://www.ticketliquidator.com/tickets/7833445/Dermot-Kennedy-tickets-Wed-Sep-8-2027-Arizona-Financial-Theatre | - |
| tm-dermot-kennedy-2027-san-diego-vvg1iz_63vng7e | Dermot Kennedy | refresh (applied) | 7833446 | https://www.ticketliquidator.com/tickets/7833446/Dermot-Kennedy-tickets-Fri-Sep-10-2027-Cal-Coast-Credit-Union-Open-Air-Theatre | - |
| tm-dermot-kennedy-2027-san-francisco-g5vyz_6xupdzq | Dermot Kennedy | refresh (applied) | 7833447 | https://www.ticketliquidator.com/tickets/7833447/Dermot-Kennedy-tickets-Sun-Sep-12-2027-Bill-Graham-Civic-Auditorium | - |
| tm-dermot-kennedy-2027-portland-vvg1hz_61kvuk5 | Dermot Kennedy | refresh (applied) | 7833449 | https://www.ticketliquidator.com/tickets/7833449/Dermot-Kennedy-tickets-Tue-Sep-14-2027-Moda-Center-at-the-Rose-Quarter | - |
| tm-dermot-kennedy-2027-vancouver-1aozkosgkedfaj7 | Dermot Kennedy | refresh (applied) | 7836902 | https://www.ticketliquidator.com/tickets/7836902/Dermot-Kennedy-tickets-Thu-Sep-16-2027-Rogers-Arena | - |
| tm-dermot-kennedy-2027-seattle-vvg1hz_6xvw_39 | Dermot Kennedy | refresh (applied) | 7833448 | https://www.ticketliquidator.com/tickets/7833448/Dermot-Kennedy-tickets-Fri-Sep-17-2027-Paramount-Theatre-Seattle | - |
| tm-rush-2026-atlanta-vvg1zzbgq3ik-i | Rush | refresh (applied) | 7510116 | https://www.ticketliquidator.com/tickets/7510116/Rush-tickets-Fri-Nov-27-2026-State-Farm-Arena-GA | - |
| tm-rush-2026-glendale-1a_zku3gkdjwfxj | Rush | refresh (applied) | 7503533 | https://www.ticketliquidator.com/tickets/7503533/Rush-tickets-Tue-Dec-1-2026-Desert-Diamond-Arena | - |
| tm-rush-2026-glendale-1a_zku3gkdql0tk | Rush | refresh (applied) | 7510407 | https://www.ticketliquidator.com/tickets/7510407/Rush-tickets-Thu-Dec-3-2026-Desert-Diamond-Arena | - |
| tm-rush-2026-san-jose-g5vyzbg9ir1-u | Rush | refresh (applied) | 7510112 | https://www.ticketliquidator.com/tickets/7510112/Rush-tickets-Sun-Dec-6-2026-SAP-Center | - |
| tm-rush-2026-edmonton-1aozkuogkdiu5gt | Rush | refresh (applied) | 7503538 | https://www.ticketliquidator.com/tickets/7503538/Rush-tickets-Thu-Dec-10-2026-Rogers-Place | - |
| tm-rush-2026-edmonton-1aozkuogkdichgs | Rush | refresh (applied) | 7510114 | https://www.ticketliquidator.com/tickets/7510114/Rush-tickets-Sat-Dec-12-2026-Rogers-Place | - |
| tm-rush-2026-vancouver-15v7zbga7vfqk | Rush | refresh (applied) | 7503539 | https://www.ticketliquidator.com/tickets/7503539/Rush-tickets-Tue-Dec-15-2026-Rogers-Arena | - |
| tm-rush-2026-vancouver-1k78vn4_gag8jn9 | Rush | refresh (applied) | 7510406 | https://www.ticketliquidator.com/tickets/7510406/Rush-tickets-Thu-Dec-17-2026-Rogers-Arena | - |
| tm-rush-2027-amsterdam-z698xzbpz1k0w44ux | Rush | refresh (applied) | 7756385 | https://www.ticketliquidator.com/tickets/7756385/Rush-tickets-Tue-Feb-23-2027-Ziggo-Dome | - |
| tm-rush-2027-glasgow-16uzkokjoza2eu1c | Rush | refresh (applied) | 7796479 | https://www.ticketliquidator.com/tickets/7796479/Rush-tickets-Mon-Mar-8-2027-OVO-Hydro | - |
| tm-rush-2027-glasgow-1auzko9gkdz3fsq | Rush | refresh (applied) | 7796480 | https://www.ticketliquidator.com/tickets/7796480/Rush-tickets-Wed-Mar-10-2027-OVO-Hydro | - |
| tm-rush-2027-manchester-1amzko3gkd_h5ef | Rush | refresh (applied) | 7752300 | https://www.ticketliquidator.com/tickets/7752300/Rush-tickets-Fri-Mar-12-2027-Co-Op-Live | - |
| tm-rush-2027-manchester-1amzko9gkdv60uv | Rush | refresh (applied) | 7763826 | https://www.ticketliquidator.com/tickets/7763826/Rush-tickets-Sun-Mar-14-2027-Co-Op-Live | - |
| tm-rush-2027-london-1agzkokgkdbtjvd | Rush | refresh (applied) | 7756291 | https://www.ticketliquidator.com/tickets/7756291/Rush-tickets-Tue-Mar-16-2027-O2-Arena-London | - |
| tm-rush-2027-london-1agzkokgkdwubbc | Rush | refresh (applied) | 7756292 | https://www.ticketliquidator.com/tickets/7756292/Rush-tickets-Thu-Mar-18-2027-O2-Arena-London | - |
| tm-rush-2027-london-1agzkokgkdbmisv | Rush | refresh (applied) | 7785490 | https://www.ticketliquidator.com/tickets/7785490/Rush-tickets-Sun-Mar-21-2027-O2-Arena-London | - |
| tm-rush-2027-fornebu-z698xzb_z16v33febz | Rush | refresh (applied) | 7756388 | https://www.ticketliquidator.com/tickets/7756388/Rush-tickets-Tue-Apr-6-2027-Unity-Arena | - |
| tm-rush-2027-helsinki-z698xz8kz16vu9qkuz | Rush | none | - | - | no qualifying listing (complete catalog checked; closest same-date listing: city mismatch, venue mismatch; listing: August Rush: A New Musical; text: August Rush: A New Musical August Rush: A New Musical /tickets/8347051/August-Rush-A-New-Musical-tickets-Sat-Apr-10-2027-Donald-and-Darlene-) |
| tm-rush-2027-las-vegas-1a9zk4xgkdgo-1b | Rush | refresh (applied) | 8357197 | https://www.ticketliquidator.com/tickets/8357197/Rush-tickets-Fri-May-21-2027-Sphere | - |
| tm-rush-2027-las-vegas-1a9zk4xgkdgo-1h | Rush | refresh (applied) | 8357200 | https://www.ticketliquidator.com/tickets/8357200/Rush-tickets-Sun-May-23-2027-Sphere | - |
| tm-rush-2027-las-vegas-1a9zk4xgkdgos1r | Rush | refresh (applied) | 8357201 | https://www.ticketliquidator.com/tickets/8357201/Rush-tickets-Wed-May-26-2027-Sphere | - |
| tm-rush-2027-las-vegas-1a9zk4xgkdgos10 | Rush | refresh (applied) | 8357202 | https://www.ticketliquidator.com/tickets/8357202/Rush-tickets-Fri-May-28-2027-Sphere | - |
| tm-rush-2027-las-vegas-1a9zk4xgkdg-v1t | Rush | refresh (applied) | 8357203 | https://www.ticketliquidator.com/tickets/8357203/Rush-tickets-Sun-May-30-2027-Sphere | - |
| tm-rush-2027-las-vegas-1a9zk4xgkdg-o1r | Rush | refresh (applied) | 8366487 | https://www.ticketliquidator.com/tickets/8366487/Rush-tickets-Tue-Jun-15-2027-Sphere | - |
| tm-rush-2027-las-vegas-1a9zk4xgkdg-o1g | Rush | refresh (applied) | 8366489 | https://www.ticketliquidator.com/tickets/8366489/Rush-tickets-Thu-Jun-17-2027-Sphere | - |
| tm-rush-2027-las-vegas-1a9zk4xgkdg--5c | Rush | refresh (applied) | 8366424 | https://www.ticketliquidator.com/tickets/8366424/Rush-tickets-Sat-Jun-19-2027-Sphere | - |
| tm-rush-2027-las-vegas-1a9zk4xgkdg-s53 | Rush | refresh (applied) | 8366490 | https://www.ticketliquidator.com/tickets/8366490/Rush-tickets-Thu-Jun-24-2027-Sphere | - |
| tm-rush-2027-las-vegas-1a9zk4xgkdgxv5p | Rush | refresh (applied) | 8366491 | https://www.ticketliquidator.com/tickets/8366491/Rush-tickets-Sat-Jun-26-2027-Sphere | - |
| tm-muse-2026-amsterdam-z698xzbpz1kgae78p | Muse | refresh (applied) | 8090474 | https://www.ticketliquidator.com/tickets/8090474/Muse-tickets-Sun-Nov-29-2026-Ziggo-Dome | - |
| tm-muse-2026-amsterdam-z698xzbpz16v0z-yvb | Muse | refresh (applied) | 8090475 | https://www.ticketliquidator.com/tickets/8090475/Muse-tickets-Mon-Nov-30-2026-Ziggo-Dome | - |
| tm-muse-2026-zurich-z698xzu3z1kaiqded | Muse | refresh (applied) | 8090469 | https://www.ticketliquidator.com/tickets/8090469/Muse-tickets-Mon-Dec-7-2026-Hallenstadion-Zurich | - |
| tm-muse-2026-zurich-z698xzu3z16v7p4eja | Muse | refresh (applied) | 8090470 | https://www.ticketliquidator.com/tickets/8090470/Muse-tickets-Tue-Dec-8-2026-Hallenstadion-Zurich | - |
| tm-muse-2027-madrid-z698xz2qz16vjs7s8n | Muse | refresh (applied) | 8309154 | https://www.ticketliquidator.com/tickets/8309154/Muse-tickets-Tue-Jan-19-2027-Movistar-Arena-Madrid | - |
| tm-muse-2027-madrid-z698xz2qz1kcb1fbk | Muse | refresh (applied) | 8309155 | https://www.ticketliquidator.com/tickets/8309155/Muse-tickets-Wed-Jan-20-2027-Movistar-Arena-Madrid | - |
| tm-muse-2027-valencia-z698xz2qz16vovabug | Muse | refresh (applied) | 8308629 | https://www.ticketliquidator.com/tickets/8308629/Muse-tickets-Sat-Jan-23-2027-Roig-Arena | - |
| tm-muse-2027-valencia-z698xz2qz1k_kr6f0 | Muse | none | - | - | no qualifying listing (complete catalog checked) |
| tm-muse-2027-cardiff-g5vhz_klws9kh | Muse | refresh (applied) | 8365851 | https://www.ticketliquidator.com/tickets/8365851/Muse-tickets-Wed-Jun-23-2027-Blackweir-Fields | - |
| tm-muse-2027-london-1amzk4pgkebnmny | Muse | refresh (applied) | 8361447 | https://www.ticketliquidator.com/tickets/8361447/Muse-tickets-Sat-Jun-26-2027-Hyde-Park-London | - |
| tm-muse-2027-leeds-g5vhz_pplenqg | Muse | refresh (applied) | 8365852 | https://www.ticketliquidator.com/tickets/8365852/Roundhay-Festival-tickets-Sun-Jun-27-2027-Roundhay-Park | - |
| tm-dinosaur-jr-2027-detroit-z7r9jz1aaap_a | Dinosaur Jr. | none | - | - | no qualifying listing (complete catalog checked) |
| tm-warren-zeiders-2027-catoosa-z7r9jz1aa7fa8 | Warren Zeiders | refresh (applied) | 8307506 | https://www.ticketliquidator.com/tickets/8307506/Warren-Zeiders-tickets-Thu-Apr-8-2027-Hard-Rock-Live-Hard-Rock-Hotel-Casino-Tulsa | - |
| tm-phoebe-bridgers-2027-edinburgh-1auzk4zgkdye5yf | Phoebe Bridgers | none | - | - | no qualifying listing (complete catalog checked) |
| tm-illenium-2026-vail-z7r9jz1aaapj3 | ILLENIUM | refresh (applied) | 8306709 | https://www.ticketliquidator.com/tickets/8306709/Illenium-tickets-Fri-Dec-11-2026-Dobson-Ice-Arena | - |
| tm-chris-stassy-2027-manchester-g5vhz_plwciwp | Chris Stassy | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mon-laferte-2027-ciudad-de-mexico-1afzk4sgkdyerbz | Mon Laferte | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mon-laferte-2027-zapopan-g5dvz_pud06_8 | Mon Laferte | none | - | - | no qualifying listing (complete catalog checked) |
| tm-mat-kearney-2027-ventura-z7r9jz1aaakg7 | Mat Kearney | refresh (applied) | 8344151 | https://www.ticketliquidator.com/tickets/8344151/Mat-Kearney-tickets-Mon-Aug-23-2027-Ventura-Music-Hall | - |
| tm-travis-tritt-2027-fort-worth-z7r9jz1aaaoud | Travis Tritt | refresh (applied) | 8364221 | https://www.ticketliquidator.com/tickets/8364221/Travis-Tritt-tickets-Fri-Mar-19-2027-Billy-Bobs | - |
| tm-10cc-2027-llandudno-g5vhz_ctswfup | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-stoke-on-trent-17uyv0g6ctwydoc | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-harrogate-17u8v0g6ctlxq9y | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-scarborough-17u8v0g62dwld0w | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-leicester-g5vhz_chkdnos | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-torquay-17uov0g62e2ner2 | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-truro-g5vhz_2m-aejk | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-salisbury-g5vhz_ctjq9vl | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-basingstoke-g5vhz_cts0tzr | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-watford-17uyv0g6ctns3km | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-bath-17uyv0g62evevt9 | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-croydon-g5vhz_ctdn_nm | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-eastbourne-g5vhz_2epbsoo | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-aylesbury-17u8v0g6ctc0wu5 | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-coventry-g5vhz_ctmqz4m | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-northampton-g5vhz_ctw2ats | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-scunthorpe-17uov0g62e9zs8y | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-derby-17fyv0g6cx5rowg | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-halifax-g5vhz_2exijk0 | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-perth-17uov0g6ctyjann | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-edinburgh-17uov0g6chf_1iz | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-stockton-on-tees-g5vhz_2zfodiq | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-milton-keynes-16mzk4yx7zaue7ed | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-hull-1ku8vpjfgag2ojo | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-tunbridge-wells-1kuyvpjaga5kwmj | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-folkestone-1kuovpjagagra6l | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-dorset-g5vhz_9erpduu | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-hastings-1auzk4ygkeo5pcx | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-carlisle-g5vhz_9e-fkjn | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-ipswich-g5vhz_9exlk-j | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-rotterdam-z698xzbpz1kfevxad | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-10cc-2027-brussels-z698xzg2z1kkfe3o6 | 10cc | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-doobie-brothers-2027-las-vegas-1a9zk49gkdwjh7q | The Doobie Brothers | add (applied) | 8342847 | https://www.ticketliquidator.com/tickets/8342847/The-Doobie-Brothers-tickets-Fri-Feb-26-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-the-doobie-brothers-2027-las-vegas-1a9zk49gkdwlg7i | The Doobie Brothers | add (applied) | 8342848 | https://www.ticketliquidator.com/tickets/8342848/The-Doobie-Brothers-tickets-Sat-Feb-27-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-the-doobie-brothers-2027-las-vegas-1a9zk49gkdw-j7d | The Doobie Brothers | add (applied) | 8342849 | https://www.ticketliquidator.com/tickets/8342849/The-Doobie-Brothers-tickets-Fri-Mar-5-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-the-doobie-brothers-2027-las-vegas-1a9zk49gkdwnjac | The Doobie Brothers | add (applied) | 8342850 | https://www.ticketliquidator.com/tickets/8342850/The-Doobie-Brothers-tickets-Sat-Mar-6-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-the-doobie-brothers-2027-halifax-1aszk4vgkem55xl | The Doobie Brothers | add (applied) | 8386489 | https://www.ticketliquidator.com/tickets/8386489/The-Doobie-Brothers-tickets-Thu-Aug-5-2027-Scotiabank-Centre | - |
| tm-the-doobie-brothers-2027-moncton-1aszk4vgkdperjo | The Doobie Brothers | add (applied) | 8386490 | https://www.ticketliquidator.com/tickets/8386490/The-Doobie-Brothers-tickets-Fri-Aug-6-2027-Avenir-Centre | - |
| tm-the-doobie-brothers-2027-laval-1aszk4wgkdkwh-0 | The Doobie Brothers | add (applied) | 8386491 | https://www.ticketliquidator.com/tickets/8386491/The-Doobie-Brothers-tickets-Mon-Aug-9-2027-Place-Bell | - |
| tm-the-doobie-brothers-2027-kanata-16szk4wjdza2faae | The Doobie Brothers | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-doobie-brothers-2027-st-catharines-1a8zk4sgkdjlu6e | The Doobie Brothers | none | - | - | no qualifying listing (complete catalog checked) |
| tm-the-doobie-brothers-2027-winnipeg-1aozk4sgkd30xaz | The Doobie Brothers | add (applied) | 8386494 | https://www.ticketliquidator.com/tickets/8386494/The-Doobie-Brothers-tickets-Mon-Aug-16-2027-Canada-Life-Centre | - |
| tm-the-doobie-brothers-2027-edmonton-1aozk4sptc3ze8k | The Doobie Brothers | add (applied) | 8386495 | https://www.ticketliquidator.com/tickets/8386495/The-Doobie-Brothers-tickets-Thu-Aug-19-2027-Rogers-Place | - |
| tm-the-doobie-brothers-2027-abbotsford-15v7z_9c9zac3 | The Doobie Brothers | add (applied) | 8386498 | https://www.ticketliquidator.com/tickets/8386498/The-Doobie-Brothers-tickets-Tue-Aug-24-2027-Rogers-Forum | - |
| tm-the-doobie-brothers-2027-las-vegas-1a9zk49gkdwpia9 | The Doobie Brothers | add (applied) | 8342851 | https://www.ticketliquidator.com/tickets/8342851/The-Doobie-Brothers-tickets-Fri-Aug-27-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-the-doobie-brothers-2027-las-vegas-1a9zk49gkdwejan | The Doobie Brothers | add (applied) | 8342852 | https://www.ticketliquidator.com/tickets/8342852/The-Doobie-Brothers-tickets-Sat-Aug-28-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-the-doobie-brothers-2027-las-vegas-1a9zk49gkdwtjas | The Doobie Brothers | add (applied) | 8342853 | https://www.ticketliquidator.com/tickets/8342853/The-Doobie-Brothers-tickets-Wed-Sep-1-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-the-doobie-brothers-2027-las-vegas-1a9zk49gkdwljat | The Doobie Brothers | add (applied) | 8342855 | https://www.ticketliquidator.com/tickets/8342855/The-Doobie-Brothers-tickets-Fri-Sep-3-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-the-doobie-brothers-2027-las-vegas-1a9zk49gkdwcjkg | The Doobie Brothers | add (applied) | 8342856 | https://www.ticketliquidator.com/tickets/8342856/The-Doobie-Brothers-tickets-Sat-Sep-4-2027-BleauLive-Theater-At-Fontainebleau-Las-Vegas | - |
| tm-jorja-smith-2027-amsterdam-z698xzbpz16vp07o1a | Jorja Smith | add (applied) | 8376028 | https://www.ticketliquidator.com/tickets/8376028/Jorja-Smith-tickets-Wed-May-26-2027-Ziggo-Dome | - |
| tm-jorja-smith-2027-brussels-z698xzg2z16v-6xajf | Jorja Smith | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jorja-smith-2027-dusseldorf-z698xzc2z16vc4ra7p | Jorja Smith | none | - | - | no qualifying listing (complete catalog checked) |
| tm-jorja-smith-2027-london-1fu8vp7n0az75fd6 | Jorja Smith | add (applied) | 8235645 | https://www.ticketliquidator.com/tickets/8235645/Jorja-Smith-tickets-Sat-Jul-17-2027-O2-Arena-London | - |
| tm-jorja-smith-2027-brisbane-1avgz_8gknnf3nj | Jorja Smith | none | - | - | no qualifying listing (complete catalog checked) |
| tm-teddy-swims-2027-glasgow-17uov0g62nloztk | Teddy Swims | none | - | - | no qualifying listing (complete catalog checked) |
| tm-steve-lacy-2027-london-1ku8vpqdgagp_zi | Steve Lacy | add (applied) | 8392542 | https://www.ticketliquidator.com/tickets/8392542/Steve-Lacy-tickets-Tue-Apr-27-2027-O2-Arena-London | - |
| tm-backstreet-boys-2027-london-1adfz_9gkndyiiy | Backstreet Boys | add (applied) | 8392537 | https://www.ticketliquidator.com/tickets/8392537/Backstreet-Boys-tickets-Tue-Jun-8-2027-O2-Arena-London | - |
| tm-backstreet-boys-2027-london-1adfz_9gkljcn0r | Backstreet Boys | add (applied) | 8392538 | https://www.ticketliquidator.com/tickets/8392538/Backstreet-Boys-tickets-Wed-Jun-9-2027-O2-Arena-London | - |
| tm-backstreet-boys-2027-london-1adfz_9gkl9inpq | Backstreet Boys | add (applied) | 8392539 | https://www.ticketliquidator.com/tickets/8392539/Backstreet-Boys-tickets-Fri-Jun-11-2027-O2-Arena-London | - |
| tm-backstreet-boys-2027-london-1adfz_9gklquqr2 | Backstreet Boys | add (applied) | 8392540 | https://www.ticketliquidator.com/tickets/8392540/Backstreet-Boys-tickets-Sat-Jun-12-2027-O2-Arena-London | - |
| tm-backstreet-boys-2027-vienna-z698xz5rz1k0efdvi | Backstreet Boys | none | - | - | no qualifying listing (complete catalog checked) |
| tm-backstreet-boys-2027-vienna-z698xz5rz16vos_wa7 | Backstreet Boys | none | - | - | no qualifying listing (complete catalog checked) |
| tm-backstreet-boys-2027-amsterdam-z698xzbpz1ko30moe | Backstreet Boys | none | - | - | no qualifying listing (complete catalog checked) |
| tm-backstreet-boys-2027-zurich-z698xzu3z16v4tp3v6 | Backstreet Boys | none | - | - | no qualifying listing (complete catalog checked) |
| tm-backstreet-boys-2027-hamburg-z698xzc2z16vague4k | Backstreet Boys | none | - | - | no qualifying listing (complete catalog checked) |
| tm-backstreet-boys-2027-munich-z698xzc2z16vgs1fje | Backstreet Boys | none | - | - | no qualifying listing (complete catalog checked) |
| tm-backstreet-boys-2027-munich-z698xzc2z1kgdpop9 | Backstreet Boys | none | - | - | no qualifying listing (complete catalog checked) |
