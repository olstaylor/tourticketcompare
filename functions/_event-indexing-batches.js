// @ts-check
// Staged event-page indexing batches beyond the frozen pilot (owner decision
// 2026-10-09). Each batch is a frozen list of stable event keys, added by a
// reviewed PR from scripts/select-event-indexing-batch.mjs and recorded with
// its selection facts in data/event-indexing-batches.json (npm run
// test:event-indexability pins the two together). Same contract as the pilot:
// a key is necessary, not sufficient — the event must still pass
// eventIndexabilityDecision on every request, and a member that drops out is
// never replaced, so each batch stays a measurable cohort.

/** @type {ReadonlyArray<{ id: string, selectedOn: string, keys: readonly string[] }>} */
export const EVENT_INDEXING_BATCHES = Object.freeze([
  Object.freeze({
    id: "batch-1",
    selectedOn: "2026-10-09",
    keys: Object.freeze([
      "08b694909d67aa4d", // Ed Sheeran · Raymond James Stadium, Tampa · 2026-11-07
      "4569500474b371da", // Death Cab for Cutie · Tennessee Theatre, Knoxville · 2027-03-12
      "b26b17829bca0235", // Death Cab for Cutie · 713 Music Hall, Houston · 2027-03-22
      "3fa2eb3f5590c8b6", // Riley Green · Climate Pledge Arena, Seattle · 2027-04-02
      "540ce0dc42c98e12", // Death Cab for Cutie · MTELUS, Montreal · 2027-04-05
      "e524c995c3153e3f", // Josiah Queen · BOK Center, Tulsa · 2027-04-08
      "3c96aeee0d13b692", // Josiah Queen · Gainbridge Fieldhouse, Indianapolis · 2027-04-10
      "707c0859ffd005d7", // Death Cab for Cutie · Radio City Music Hall, New York · 2027-04-13
      "e1f77cefe1234f53", // Josiah Queen · Spectrum Center, Charlotte · 2027-04-17
      "91f607d2a96e3a27", // Carly Rae Jepsen · Kia Forum, Inglewood · 2027-04-22
      "d00f211aa9ace6a9", // Josiah Queen · Honda Center, Anaheim · 2027-04-29
      "cf8456a37474e324", // Hilary Duff · Kia Center, Orlando · 2027-10-02
      "b93bd2fd1aabc199", // Hilary Duff · Lenovo Center, Raleigh · 2027-10-04
      "2f827aa54aa9e741", // Hilary Duff · CFG Bank Arena, Baltimore · 2027-10-06
      "bd1fa240c3d1c994", // Hilary Duff · Mohegan Sun Arena, Uncasville · 2027-10-08
      "a8cf6e6dbfe9778e", // Hilary Duff · Schottenstein Center, Columbus · 2027-10-15
      "d2d1d916c5c90106", // Hilary Duff · PPG Paints Arena, Pittsburgh · 2027-10-16
      "525ee1b5b99ade01", // Too Many Zooz · Brooklyn Bowl, Brooklyn · 2026-10-30
      "65715095fda83951", // Teddy Swims · Dickies Arena, Fort Worth · 2026-10-30
      "0831d5ddc9497342", // John Summit · Capital One Arena, Washington · 2026-10-31
      "e09332dfe58ef18e", // Teddy Swims · Ball Arena, Denver · 2026-11-01
      "d77247a22649c242", // Doja Cat · Moody Center ATX, Austin · 2026-11-03
      "1bfa05665fa78ce8", // Sombr · United Center, Chicago · 2026-11-04
      "c4b4dd6de88b9565", // Doja Cat · American Airlines Center, Dallas · 2026-11-04
      "fc8d6aa2b4dd7664", // Teddy Swims · Climate Pledge Arena, Seattle · 2026-11-05
      "7cbf480a0b656b97", // Teddy Swims · Rogers Arena, Vancouver · 2026-11-06
      "d37308d7949424ed", // John Summit · Moody Center ATX, Austin · 2026-11-06
      "ea4684aad58befe1", // Doja Cat · Frost Bank Center, San Antonio · 2026-11-06
      "233e68de57623282", // Amble · Brooklyn Paramount, Brooklyn · 2026-11-07
      "5da9e4a9f2c8ffd1", // Pentatonix · Rogers Arena, Vancouver · 2026-11-07
      "b282449bfac4dc21", // Sombr · Little Caesars Arena, Detroit · 2026-11-07
      "23a272056e1cae7e", // Teddy Swims · Moda Center, Portland · 2026-11-08
      "38209230af2ef502", // Don Omar · Mortgage Matchup Center, Phoenix · 2026-11-08
      "2f064fa7a04e73bd", // Teddy Swims · Chase Center, San Francisco · 2026-11-10
      "c6cd1cfc2db11daf", // Sombr · Capital One Arena, Washington · 2026-11-10
      "5dd04e792c5d4762", // Beartooth · MGM Music Hall at Fenway, Boston · 2026-11-11
      "94d2e7f6c790dd2d", // Doja Cat · Kaseya Center, Miami · 2026-11-11
      "2769800aba8121ba", // Doja Cat · Benchmark International Arena, Tampa · 2026-11-13
      "eaad96b637feada6", // Blue October · Citizens House of Blues Boston, Boston · 2026-11-13
      "fd9ca203e8c2a02b", // Tyla · Bill Graham Civic Auditorium, San Francisco · 2026-11-13
      "25958bcd7f82976e", // Pentatonix · Fiserv Forum, Milwaukee · 2026-11-14
      "6a574f212e59e38d", // Doja Cat · Kia Center, Orlando · 2026-11-14
      "7b2d8b8b5254cc35", // Sombr · KeyBank Center, Buffalo · 2026-11-14
      "d436f74367ce2514", // John Summit · Spectrum Center, Charlotte · 2026-11-14
      "603c4dab04271131", // John Summit · State Farm Arena, Atlanta · 2026-11-15
      "908b4cd98c6ef6a5", // Pentatonix · KFC Yum! Center, Louisville · 2026-11-16
      "8ffe54e357901000", // Tyla · WAMU Theater, Seattle · 2026-11-17
      "d2e1b35818141eb8", // Blue October · The Fillmore Charlotte, Charlotte · 2026-11-17
      "5f2c1b052097d296", // Sombr · TD Garden, Boston · 2026-11-18
      "6eb45eea2c60e090", // Pentatonix · KeyBank Center, Buffalo · 2026-11-18
      "4f46760fb2f03863", // Sombr · Xfinity Mobile Arena, Philadelphia · 2026-11-19
      "8d6f775f3f8ded8e", // Beartooth · Aragon Ballroom, Chicago · 2026-11-20
      "6691835ffdc7d9a4", // Blue October · Hard Rock Live Orlando, Orlando · 2026-11-21
      "e79a8a115b8f8fbc", // Pentatonix · PPG Paints Arena, Pittsburgh · 2026-11-21
      "6c7c961598bcdd42", // Tyla · Aragon Ballroom, Chicago · 2026-11-22
      "f409392c15497fd8", // Tyla · MGM Music Hall at Fenway, Boston · 2026-11-25
      "aca8516c49e22378", // Pentatonix · MVP Arena, Albany · 2026-11-29
      "ff34c38b1a532581", // Tyla · The Anthem, Washington · 2026-12-02
      "b6e84c1dd07c23bf", // Trivium · YouTube Theater, Inglewood · 2026-12-04
      "a4de392af025f655", // Tyla · Yuengling Center, Tampa · 2026-12-05
      "365edef8fddd8749", // Beartooth · South Side Ballroom, Dallas · 2026-12-10
      "989d4c4a3baecc75", // Trans-Siberian Orchestra · Lenovo Center, Raleigh · 2026-12-10
      "f30a20acec62a0fb", // Andrea Bocelli · TD Garden, Boston · 2026-12-10
      "533e214ea383bc1b", // Andrea Bocelli · KeyBank Center, Buffalo · 2026-12-11
      "e2156d0642e29aa4", // Sabaton · Hard Rock Live Orlando, Orlando · 2026-12-11
      "601f640ef000db3e", // Pink Martini · Brooklyn Paramount, Brooklyn · 2026-12-13
      "81bc6f1addaca083", // Andrea Bocelli · PPG Paints Arena, Pittsburgh · 2026-12-21
      "c8642c2ee356a97e", // Andrea Bocelli · Xfinity Mobile Arena, Philadelphia · 2026-12-22
      "649d8d5fcf061ea2", // Five Finger Death Punch · AO Arena, Manchester · 2027-01-16
      "ebe2f3e2003d6895", // Five Finger Death Punch · OVO Hydro, Glasgow · 2027-01-17
      "f6073ea9b4f39023", // Alan Walker · The Pavilion at Toyota Music Factory, Irving · 2027-01-22
      "2d135cb7c90a1ab1", // Alan Walker · 713 Music Hall, Houston · 2027-01-23
      "c75e7e698edefba0", // Andrea Bocelli · Spectrum Center, Charlotte · 2027-01-29
      "23e133ddc8cf8414", // Andrea Bocelli · CFG Bank Arena, Baltimore · 2027-01-31
      "f4a492626d0142eb", // Nothing But Thieves · Motorpoint Arena Nottingham, Nottingham · 2027-02-04
      "fc91cfcfb2bdc951", // Fantasia · Capital One Arena, Washington · 2027-02-05
      "0cd3f7fbccbe3c0b", // TobyMac · Kia Center, Orlando · 2027-02-06
      "7b66b47c0137b52a", // Alan Walker · The Anthem, Washington · 2027-02-06
      "df880c960b352105", // Dylan Scott · MGM Music Hall at Fenway, Boston · 2027-02-06
      "658d2c69c48ce272", // TobyMac · Hertz Arena, Estero · 2027-02-07
      "e6fbb49fe406081c", // Don Omar · Climate Pledge Arena, Seattle · 2027-02-07
      "c6de59921d69d344", // Nothing But Thieves · OVO Hydro, Glasgow · 2027-02-10
      "63323d5862b1097e", // Alan Walker · MGM Music Hall at Fenway, Boston · 2027-02-10
      "0dde446ca742d8ee", // The Lemonheads · Brooklyn Bowl, Brooklyn · 2027-02-11
      "91c5b0ef57190008", // Don Omar · Save Mart Center, Fresno · 2027-02-11
      "b33209b9180958c2", // Nothing But Thieves · Co-op Live, Manchester · 2027-02-12
      "2d00a21e3d0b13bd", // Nothing But Thieves · bp pulse LIVE, Birmingham · 2027-02-13
      "f0c7480b5896f4c9", // Chelsea Cutler · Brooklyn Paramount, Brooklyn · 2027-02-12
      "2213e03cd054c81c", // Blue October · Brooklyn Bowl Las Vegas, Las Vegas · 2027-02-13
      "774e3fc8328112e7", // Yuridia · Arizona Financial Theatre, Phoenix · 2027-02-13
      "1561d2a6580f231f", // Alan Walker · MTELUS, Montreal · 2027-02-16
      "de8b8fe8deb707e8", // Charli xcx · Co-op Live, Manchester · 2027-02-17
      "8e7dd0bcdecb9341", // Yuridia · PH Live at Planet Hollywood, Las Vegas · 2027-02-18
      "8cd24460bd6cb726", // Fantasia · Smoothie King Center, New Orleans · 2027-02-19
      "b360993a4633feca", // Dylan Gossett · O2 Academy Birmingham, Birmingham · 2027-02-21
      "09d0121bc67f3bc1", // Hans Zimmer · Prudential Center, Newark · 2027-02-21
      "f64909bc1f63baca", // Hans Zimmer · Xfinity Mobile Arena, Philadelphia · 2027-02-23
      "035a459021a027f2", // Hans Zimmer · TD Garden, Boston · 2027-02-24
      "9c059f175774d612", // Yuridia · Save Mart Center, Fresno · 2027-02-25
      "3a2d25b2ae736176", // Malcolm Todd · O2 Academy Birmingham, Birmingham · 2027-02-27
      "4a00d7ec1ce4ef73", // Alan Walker · Aragon Ballroom, Chicago · 2027-02-26
      "90372d304fbc5705", // Morat · Intuit Dome, Inglewood · 2027-02-26
      "d8a04d38c800422f", // John Summit · The O2, London · 2027-02-27
      "f3a1007cc7dedacf", // Don Omar · Allstate Arena, Rosemont · 2027-02-26
      "21b29996e8661529", // Morat · Don Haskins Center, El Paso · 2027-02-28
      "5a3c00d591c7376d", // Hans Zimmer · Little Caesars Arena, Detroit · 2027-03-03
      "086aa2ddd125b6a1", // NEEDTOBREATHE · Brooklyn Paramount, Brooklyn · 2027-03-04
      "21b5ac0cdf9a2dc5", // NEEDTOBREATHE · MGM Music Hall at Fenway, Boston · 2027-03-05
      "313932756a30d9bd", // Hans Zimmer · United Center, Chicago · 2027-03-05
      "5ee5cfbbbd5eb84b", // Fantasia · Toyota Arena, Ontario · 2027-03-05
      "f0923d9be5f28cb8", // Lukas Graham · The Ritz Ybor, Tampa · 2027-03-05
      "336e4d2a81a49c06", // NEEDTOBREATHE · The Anthem, Washington · 2027-03-06
      "acfe4295e8341f5e", // Don Omar · Dickies Arena, Fort Worth · 2027-03-06
      "4095e729e4475bee", // Don Omar · Moody Center ATX, Austin · 2027-03-07
      "54db900498a28085", // Lukas Graham · The Fillmore Charlotte, Charlotte · 2027-03-07
      "773ef15f806385fb", // Morat · Agganis Arena, Boston · 2027-03-07
      "ab9152f62a166737", // Lukas Graham · The Fillmore Silver Spring, Silver Spring · 2027-03-09
      "d6d272b5a44a04c2", // Hans Zimmer · Spectrum Center, Charlotte · 2027-03-09
      "47beaf74639403e0", // TobyMac · Moody Center ATX, Austin · 2027-03-11
      "996c22f42a9fd41a", // Yuridia · Dos Equis Pavilion, Dallas · 2027-03-12
      "62fca89189af45bb", // Fantasia · Dickies Arena, Fort Worth · 2027-03-13
      "09ba8dc0575448c7", // Morat · Payne Arena, Hidalgo · 2027-03-14
      "7bf79ea5594ae6b5", // Yuridia · Don Haskins Center, El Paso · 2027-03-14
      "926d0aa7ba00b0cc", // Morat · Kia Center, Orlando · 2027-03-18
      "101b3acaed1c8690", // NEEDTOBREATHE · 713 Music Hall, Houston · 2027-03-20
      "1a11d809d66aa5a6", // Morat · Kaseya Center, Miami · 2027-03-20
      "f69eac6147540e06", // Niall Horan · United Center, Chicago · 2027-03-23
      "8b219e108a9bb887", // Fantasia · State Farm Arena, Atlanta · 2027-03-26
      "777fff4603b676c8", // The Warning · O2 Academy Glasgow, Glasgow · 2027-03-30
      "ff2dba1b3e0f699f", // Nothing But Thieves · Queen Elizabeth Theatre, Vancouver · 2027-03-30
      "65e090ba38c9e767", // Nothing But Thieves · Paramount Theatre, Seattle · 2027-03-31
      "3e7e3c5e559c3dc4", // Trivium · Co-op Live, Manchester · 2027-04-02
      "7b7ba92798662d2f", // Saint Levant · Brooklyn Paramount, Brooklyn · 2027-04-01
      "7c192b94aa7ea365", // Lukas Graham · Citizens House of Blues Boston, Boston · 2027-04-02
      "2d9384f1db5d6e48", // Niall Horan · Barclays Center, Brooklyn · 2027-04-04
      "875f53575034c51a", // The Interrupters · Brooklyn Paramount, Brooklyn · 2027-04-04
      "6b876264c497efb1", // Sabaton · OVO Hydro, Glasgow · 2027-04-09
      "d95ce00a1ffa9033", // Sabaton · bp pulse LIVE, Birmingham · 2027-04-10
      "808a65d614898ec4", // Lukas Graham · House of Blues Chicago, Chicago · 2027-04-11
      "826b1e49baa1a2a9", // Niall Horan · TD Garden, Boston · 2027-04-12
      "ea3f7d84294f814e", // Carly Rae Jepsen · Northern Alberta Jubilee Auditorium, Edmonton · 2027-04-15
      "3656b69d1d292a8a", // Niall Horan · Kia Center, Orlando · 2027-04-17
      "7d1fd83a69f11e22", // Fantasia · Hard Rock Live, Hollywood · 2027-04-17
      "146009f4d6cae77f", // Carly Rae Jepsen · Orpheum Theatre, Vancouver · 2027-04-18
      "a60a5035cbcd0b51", // The Warning · The Van Buren, Phoenix · 2027-04-18
      "63048da3c52b8624", // Carly Rae Jepsen · Bill Graham Civic Auditorium, San Francisco · 2027-04-21
      "2ce201cd92b13332", // Carly Rae Jepsen · Petco Park, San Diego · 2027-04-23
      "8e7b0b0ffd4edae8", // Ha*Ash · Rosemont Theatre, Rosemont · 2027-04-23
      "960f296d45723923", // The Warning · Moore Theatre, Seattle · 2027-04-23
      "a6ad48424a699482", // Luke Combs · Lincoln Financial Field, Philadelphia · 2027-04-24
      "d1debcf6b51a8dbc", // Ha*Ash · Paramount Theatre, Denver · 2027-04-25
      "ef8888c305fb7085", // A Perfect Circle · MGM Music Hall at Fenway, Boston · 2027-04-27
      "78d04f9fec3784b5", // Niall Horan · State Farm Arena, Atlanta · 2027-04-28
      "b709900c034ac18f", // Ha*Ash · Paramount Theatre, Seattle · 2027-04-28
      "8958f355896e841f", // Niall Horan · Smoothie King Center, New Orleans · 2027-04-29
      "1c2f7fdac8c133e7", // Carly Rae Jepsen · The Cosmopolitan of Las Vegas, Las Vegas · 2027-04-30
      "1bf2b22f139896b6", // Luke Combs · Gillette Stadium, Foxborough · 2027-05-01
      "6d6fb4cbff429894", // Josiah Queen · Desert Diamond Arena, Glendale · 2027-05-01
      "ac71953e6d3cbb78", // Lizzy McAlpine · 713 Music Hall, Houston · 2027-05-01
      "2ccb12e0453e77a9", // The Warning · The Fillmore Detroit, Detroit · 2027-05-06
      "82937514cb2ca59b", // Riley Green · Dickies Arena, Fort Worth · 2027-05-06
      "a56591f2c528dca7", // Ha*Ash · San Jose Civic, San Jose · 2027-05-06
      "701cd59aac620813", // Metallica · BC Place, Vancouver · 2027-05-08
      "bbf787a26682909c", // Luke Combs · Acrisure Stadium, Pittsburgh · 2027-05-08
      "15bf0efc233e3a56", // Ha*Ash · El Paso County Coliseum, El Paso · 2027-05-12
      "4e304a90212ab285", // Metallica · Snapdragon Stadium, San Diego · 2027-05-13
      "d8ae253679cce6ae", // Ha*Ash · The Pavilion at Toyota Music Factory, Irving · 2027-05-14
      "540818180e626f67", // Metallica · Sun Bowl Stadium, El Paso · 2027-05-18
      "5751e9912b49c5fd", // The Warning · Brooklyn Paramount, Brooklyn · 2027-05-18
      "64f17088b7d2fd28", // Metallica · Alamodome, San Antonio · 2027-05-22
      "4c550fa6eded76e1", // Kenny Chesney · Acrisure Stadium, Pittsburgh · 2027-05-29
      "caace7ec62c8da7b", // Metallica · Arrowhead Stadium, Kansas City · 2027-05-29
      "36bd0aa43b48ad27", // FKJ · MTELUS, Montreal · 2027-05-31
      "614a2a13e863f692", // Greta Van Fleet · Co-op Live, Manchester · 2027-06-01
      "d7559d898703ed56", // FKJ · MGM Music Hall at Fenway, Boston · 2027-06-01
      "d2d47da220a0f7e7", // FKJ · Brooklyn Paramount, Brooklyn · 2027-06-04
      "9cb42048272133f4", // Luke Combs · BC Place, Vancouver · 2027-06-05
      "c09c3e12be36d079", // Metallica · Lucas Oil Stadium, Indianapolis · 2027-06-05
      "db3b6f4a9a3ebf6a", // A Perfect Circle · Hollywood Bowl, Hollywood · 2027-06-06
      "4dd0f3246e2ae51a", // FKJ · The Anthem, Washington · 2027-06-07
      "4243146d97d17dd9", // Kenny Chesney · Lincoln Financial Field, Philadelphia · 2027-06-12
      "f1aa052e0f7df711", // FKJ · Bayou Music Center, Houston · 2027-06-11
      "e8631be7b727c48f", // FKJ · South Side Ballroom, Dallas · 2027-06-14
      "3e484e58c2c92ce5", // Lizzy McAlpine · Bridgestone Arena, Nashville · 2027-06-16
      "0fbe06192facef79", // Lizzy McAlpine · Xfinity Mobile Arena, Philadelphia · 2027-06-18
      "4b87ab71755f6aab", // Luke Combs · Empower Field At Mile High, Denver · 2027-06-19
      "85a4a868f711ddaa", // Lizzy McAlpine · Madison Square Garden, New York · 2027-06-24
      "9662d74fa2e78e1e", // Kenny Chesney · Soldier Field, Chicago · 2027-06-26
      "d7a3edcfa24a9b82", // Luke Combs · Petco Park, San Diego · 2027-06-26
      "85ee00a1e6e54394", // Lizzy McAlpine · United Center, Chicago · 2027-06-29
      "01addbf2d736e241", // Lizzy McAlpine · Moody Center ATX, Austin · 2027-07-02
      "fadf70eff5c0bc70", // Riley Green · Xfinity Center, Mansfield · 2027-07-24
      "7f0532f8cf703676", // Kenny Chesney · Mercedes-Benz Stadium, Atlanta · 2027-07-31
      "dcde602c1274afd3", // Passenger · O2 Apollo Manchester, Manchester · 2027-09-15
      "320e099683129b10", // Passenger · O2 Academy Birmingham, Birmingham · 2027-09-24
      "52cf15a27d45891b", // Dylan Gossett · Citizens Live at The Wylie, Pittsburgh · 2026-10-30
      "6daff6a36d02b4c4", // Missio · The Cambridge Room at House of Blues Cleveland, Cleveland · 2027-01-17
      "d446ba63f06d6bcf", // The Red Clay Strays · CHI Health Center Omaha, Omaha · 2027-01-31
      "36d587090d80cf03", // Flans · Linda Ronstadt Music Hall, Tucson · 2027-02-13
      "e4e7d646ac56288e", // Flans · Cobb Energy Performing Arts Centre, Atlanta · 2027-02-25
      "7371535a7c57d5f9", // Flans · Ovens Auditorium, Charlotte · 2027-02-26
      "2b264be3dfba25be", // Flans · Martin Marietta Center for the Performing Arts, Raleigh · 2027-02-27
      "57bed67f9460afc9", // Staind · SNHU Arena, Manchester · 2027-03-04
      "cc49ffe1851c630d", // Flans · Paramount Theatre, Denver · 2027-03-04
      "69c0593c30db8131", // Staind · CFG Bank Arena, Baltimore · 2027-03-06
      "900435be09756589", // TobyMac · Freeman Coliseum, San Antonio · 2027-03-12
      "a357cfa3fc0b7518", // Flans · San Diego Civic Theatre, San Diego · 2027-03-12
      "a77733c6d27358a0", // Sylvan Esso · Iron City, Birmingham · 2027-03-12
      "cb266c7dea865086", // Staind · Benchmark International Arena, Tampa · 2027-03-12
      "e33fad35a3928647", // Michelle Branch · House of Blues Anaheim, Anaheim · 2027-03-12
      "08413179ec1d74af", // NEEDTOBREATHE · Township Auditorium, Columbia · 2027-03-13
      "39dfad43c5a6c55f", // Dinosaur Jr. · Citizens House of Blues Boston, Boston · 2027-03-13
      "3a48af23105ce3ac", // Valley · The Underground, Charlotte · 2027-03-13
      "52df565acc7937ea", // Michelle Branch · The Wiltern, Los Angeles · 2027-03-13
      "74e263daa2e700ed", // Sylvan Esso · Brooklyn Bowl Nashville, Nashville · 2027-03-13
      "bc61757eb9e0246d", // Staind · iTHINK Financial Amphitheatre, West Palm Beach · 2027-03-13
      "2e766f5decfdc5e2", // NEEDTOBREATHE · Hard Rock Live Orlando, Orlando · 2027-03-14
      "8052f9c8e307a8b0", // Blue October · Hard Rock Live Rockford, Rockford · 2027-03-14
      "abbd6bb190ca0c32", // Staind · Legacy Arena at the BJCC, Birmingham · 2027-03-16
      "b20edb372302a341", // Valley · Brooklyn Bowl Philadelphia, Philadelphia · 2027-03-16
      "b8c193a628d12061", // TobyMac · Fargodome, Fargo · 2027-03-17
      "696bde6b7834f472", // Yuridia · Sames Auto Arena, Laredo · 2027-03-18
      "7641d06e1e4d3e17", // Staind · Paycom Center, Oklahoma City · 2027-03-18
      "c534a6d9cb5ff70b", // Pink Martini · Théâtre Capitole, Quebec · 2027-03-18
      "d8ce6be281fdc52f", // Death Cab for Cutie · The Fillmore Miami Beach at Jackie Gleason Theater, Miami Beach · 2027-03-18
      "83a3f4583a6b06fb", // TobyMac · BMO Center, Rockford · 2027-03-19
      "bad0bd2cd8d08b28", // Too Many Zooz · Summit Music Hall, Denver · 2027-03-19
      "da3b58956bc73254", // The Lemonheads · Majestic Theatre, Madison · 2027-03-19
      "291637be92952a3c", // Michelle Branch · State Theatre, Portland · 2027-03-23
      "f63ada42511a9951", // The Interrupters · House of Blues Houston, Houston · 2027-03-24
      "1f2e0795a6b5bb8f", // Pink Martini · Hobby Center, Houston · 2027-03-25
      "c2a82e9ee70c3836", // Warren Zeiders · House of Blues Orlando, Orlando · 2027-03-25
      "181504f058513deb", // Warren Zeiders · Hard Rock Live, Hollywood · 2027-03-26
      "d58acd2ae2395f78", // Michelle Branch · The Fillmore Silver Spring, Silver Spring · 2027-03-26
      "886e8bf8120dbe9a", // The Interrupters · House of Blues Orlando, Orlando · 2027-03-28
      "4c0e9899770691d1", // Warren Zeiders · Vibrant Music Hall, Waukee · 2027-04-02
      "947a935589f7b61d", // The Interrupters · The Fillmore Silver Spring, Silver Spring · 2027-04-02
      "e857fd092aa8c1b2", // Haiden Henderson · Constellation Room, Santa Ana · 2027-04-05
      "19c79beca452d7c6", // The Interrupters · Citizens House of Blues Boston, Boston · 2027-04-07
      "b9d532f17ec13716", // Saint Levant · The Fillmore Detroit, Detroit · 2027-04-07
      "eb6a8d28e2850ef5", // Foy Vance · Iron City, Birmingham · 2027-04-07
      "7637fc93a7f765ef", // Lukas Graham · Old National Centre, Indianapolis · 2027-04-08
      "89c55a15c2f0fd5e", // Haiden Henderson · The Bronze Peacock at House of Blues Houston, Houston · 2027-04-09
      "9b2992664336edd8", // Saint Levant · The Fillmore Silver Spring, Silver Spring · 2027-04-10
      "a6dcac3fd88bb53c", // Foy Vance · Bijou Theatre, Knoxville · 2027-04-10
      "41b5d8112a233bda", // Dylan Gossett · GLC Live at 20 Monroe, Grand Rapids · 2027-04-11
      "f285eebccf8b6747", // The Interrupters · House of Blues Cleveland, Cleveland · 2027-04-13
      "55559c58fc582769", // Warren Zeiders · GLC Live at 20 Monroe, Grand Rapids · 2027-04-15
      "445edaf10e4b0573", // Haiden Henderson · The Underground, Charlotte · 2027-04-18
      "00fba31d20445c65" // Haiden Henderson · The Atlantis, Washington · 2027-04-20
    ])
  })
]);
