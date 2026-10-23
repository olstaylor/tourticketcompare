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
  }),
  Object.freeze({
    id: "batch-2",
    selectedOn: "2026-10-16",
    keys: Object.freeze([
      "8b944234ad89eb86", // Steve Lacy · Moody Amphitheater, Austin · 2026-11-07
      "a3fc9ad9fe7e7da4", // The Neighbourhood · State Farm Arena, Atlanta · 2026-11-10
      "cd97dd8781189285", // The Neighbourhood · Kia Center, Orlando · 2026-11-11
      "0cee0adca23b729a", // The Neighbourhood · Kaseya Center, Miami · 2026-11-12
      "11186636a7c5a076", // Eagles · Sphere, Las Vegas · 2026-11-13
      "2d899fdccd749722", // Steve Lacy · The Cosmopolitan of Las Vegas, Las Vegas · 2026-11-13
      "acc12dc61294a304", // Eagles · Sphere, Las Vegas · 2026-11-14
      "4c8538069402375e", // The Neighbourhood · T-Mobile Center, Kansas City · 2026-11-16
      "82faa1d7b0449b82", // The Neighbourhood · United Center, Chicago · 2026-11-18
      "0d395f79e57c1755", // Steve Lacy · Petco Park, San Diego · 2026-11-19
      "dcb5e21f24563186", // The Neighbourhood · Little Caesars Arena, Detroit · 2026-11-19
      "7e3a65300c6c7ecf", // Eagles · Sphere, Las Vegas · 2026-11-27
      "dc3c2117bd27d3ae", // Eagles · Sphere, Las Vegas · 2026-11-28
      "4a69a59c6029e000", // Eagles · Sphere, Las Vegas · 2026-12-04
      "e5daa79cb813081e", // Eagles · Sphere, Las Vegas · 2026-12-05
      "820106a45fdb01c9", // Trans-Siberian Orchestra · Moody Center ATX, Austin · 2026-12-09
      "c28a3f0a5814d66d", // The Red Clay Strays · Allstate Arena, Rosemont · 2027-01-28
      "f5cd72b728d67939", // Don Omar · Benchmark International Arena, Tampa · 2027-03-10
      "449cd851c815c91e", // Hans Zimmer · Kia Center, Orlando · 2027-03-11
      "49907c7b51c7a7b7", // Jay Wheeler · Kaseya Center, Miami · 2027-03-11
      "8596aff27807a681", // Don Omar · Kaseya Center, Miami · 2027-03-12
      "7756fc278b14fa96", // Hans Zimmer · Kaseya Center, Miami · 2027-03-13
      "65c017f873c7de1c", // Hans Zimmer · Benchmark International Arena, Tampa · 2027-03-14
      "663ba717b844f478", // Don Omar · Kia Center, Orlando · 2027-03-14
      "2670dc8c89504fcd", // Hans Zimmer · State Farm Arena, Atlanta · 2027-03-16
      "1c7c6e15893ca45a", // Hans Zimmer · Bridgestone Arena, Nashville · 2027-03-17
      "f0dc9217279d1aad", // Hans Zimmer · Dickies Arena, Fort Worth · 2027-03-22
      "e2ee0e1562a25fa2", // Jay Wheeler · Barclays Center, Brooklyn · 2027-03-24
      "4d93b46021ea7262", // Jay Wheeler · MGM Music Hall at Fenway, Boston · 2027-03-27
      "9664de9128c0e675", // Morat · MTELUS, Montreal · 2027-03-27
      "defbb3fe17bd7e16", // Morat · Barclays Center, Brooklyn · 2027-04-01
      "96544b543d5981e2", // Nothing But Thieves · Fox Theater - Oakland, Oakland · 2027-04-03
      "4fb78014cd270fb8", // Jay Wheeler · 713 Music Hall, Houston · 2027-04-07
      "85fd567f4b783123", // John Mayer · Sphere, Las Vegas · 2027-04-08
      "5d48070d9a9c79df", // John Mayer · Sphere, Las Vegas · 2027-04-10
      "5d480c0d9a9c825e", // John Mayer · Sphere, Las Vegas · 2027-04-11
      "2ecb7b870d402a60", // Nothing But Thieves · The Fillmore Detroit, Detroit · 2027-04-13
      "db28f3697078391d", // Jay Wheeler · Kia Center, Orlando · 2027-04-15
      "f4b3300d5f320842", // John Mayer · Sphere, Las Vegas · 2027-04-15
      "b0fcee42df4c4e87", // John Mayer · Sphere, Las Vegas · 2027-04-17
      "e91b3b0d5630aa0d", // Nothing But Thieves · Brooklyn Paramount, Brooklyn · 2027-04-17
      "b0fcef42df4c503a", // John Mayer · Sphere, Las Vegas · 2027-04-18
      "31ecc5ad20433cf6", // Nickelback · American Airlines Center, Dallas · 2027-04-27
      "b3c83eab99a644c0", // Warren Zeiders · Coca-Cola Roxy, Atlanta · 2027-04-30
      "10e180f350bd8b5b", // Nickelback · Frost Bank Center, San Antonio · 2027-05-01
      "44159da7773cfa73", // Fantasia · Spectrum Center, Charlotte · 2027-05-07
      "ae726466b4964070", // Carly Rae Jepsen · Moody Amphitheater, Austin · 2027-05-07
      "c5432887bb667231", // Carly Rae Jepsen · 713 Music Hall, Houston · 2027-05-08
      "935cecaf7ef78df0", // Carly Rae Jepsen · Coca-Cola Roxy, Atlanta · 2027-05-11
      "b2a3cd5f6e21c895", // Carly Rae Jepsen · Skyla Credit Union Amphitheatre, Charlotte · 2027-05-12
      "3b72d3b969e3bd5b", // Carly Rae Jepsen · The Anthem, Washington · 2027-05-14
      "612f211dcebbbb10", // Niall Horan · Moody Center ATX, Austin · 2027-05-14
      "fe830ad06c139748", // Fantasia · United Center, Chicago · 2027-05-14
      "b34e4db1f540616c", // Carly Rae Jepsen · Madison Square Garden, New York · 2027-05-15
      "e85d41891ce936ce", // Ha*Ash · Payne Arena, Hidalgo · 2027-05-15
      "e8ba66ffbe2c0e02", // Fantasia · Little Caesars Arena, Detroit · 2027-05-15
      "f961b640841dd1f0", // Niall Horan · Ball Arena, Denver · 2027-05-16
      "5e66f9fd76545add", // Niall Horan · Mortgage Matchup Center, Phoenix · 2027-05-20
      "73989cca9ef42586", // Niall Horan · Kia Forum, Inglewood · 2027-05-22
      "a9551b028523ddc3", // Fantasia · Prudential Center, Newark · 2027-05-22
      "cdcd6491ee924778", // The Warning · MGM Music Hall at Fenway, Boston · 2027-05-23
      "c43b322e73cb4bf8", // Niall Horan · Chase Center, San Francisco · 2027-05-25
      "f09dff03ebc336c0", // Niall Horan · Climate Pledge Arena, Seattle · 2027-05-27
      "e52b770ba0dc3983", // A Perfect Circle · Climate Pledge Arena, Seattle · 2027-05-30
      "9dfe995962542e19", // Metallica · Highmark Stadium, Orchard Park · 2027-06-08
      "1ae80fb89c6946ec", // Def Leppard · Benchmark International Arena, Tampa · 2027-06-13
      "fc8f696f55391cab", // Metallica · Huntington Bank Field, Cleveland · 2027-06-15
      "abc16e8488d99f60", // Metallica · Rice-Eccles Stadium, Salt Lake City · 2027-06-19
      "24dfd58d005ac6fe", // Def Leppard · Madison Square Garden, New York · 2027-06-23
      "2fb27ae755354a5a", // Def Leppard · Xfinity Mobile Arena, Philadelphia · 2027-06-27
      "9a6c8e5b51d983f1", // Lizzy McAlpine · Kia Forum, Inglewood · 2027-07-10
      "6283d605a95acca9", // Lizzy McAlpine · Chase Center, San Francisco · 2027-07-13
      "144a0716aef2f7ac", // Slipknot · Nationals Park, Washington · 2027-07-16
      "874fba4b89d5d29f", // Lizzy McAlpine · Climate Pledge Arena, Seattle · 2027-07-17
      "0ced2e01032782a3", // Slipknot · Parc Jean Drapeau, Montreal · 2027-07-21
      "ef2134f4921cf7a1", // Leon Bridges · MGM Music Hall at Fenway, Boston · 2027-07-24
      "68579f0c107ad351", // Slipknot · Soldier Field, Chicago · 2027-07-25
      "3c6db998afbe5c76", // Slipknot · Hersheypark Stadium, Hershey · 2027-07-28
      "810fc812dc6c0d09", // Slipknot · Daikin Park, Houston · 2027-08-06
      "bdcc00da9e2f0381", // Slipknot · SoFi Stadium, Inglewood · 2027-08-13
      "f3f9e7e1ec038a26", // The Red Clay Strays · Moody Center ATX, Austin · 2027-09-19
      "b1fb645029817a3c", // Hilary Duff · Dickies Arena, Fort Worth · 2027-11-06
      "293a5c91aefbbfea", // Hilary Duff · BOK Center, Tulsa · 2027-11-08
      "f4b79e3b378e8f71", // Hilary Duff · Fiserv Forum, Milwaukee · 2027-11-12
      "2fbe118ad8eab874", // Hilary Duff · T-Mobile Center, Kansas City · 2027-11-15
      "81f48bd0eb941505", // Hilary Duff · Ball Arena, Denver · 2027-11-17
      "e0e6301f67e0b529", // Santana · House of Blues Las Vegas, Las Vegas · 2026-11-07
      "4f4f9089bae6833e", // Santana · House of Blues Las Vegas, Las Vegas · 2026-11-08
      "2bec5a664e855041", // Journey · TD Garden, Boston · 2026-11-10
      "55588f611954952b", // Santana · House of Blues Las Vegas, Las Vegas · 2026-11-11
      "e244deb3e1ddc0dc", // Teddy Swims · Golden 1 Center, Sacramento · 2026-11-11
      "fd76f2ee707cbee8", // Santana · House of Blues Las Vegas, Las Vegas · 2026-11-12
      "f1d4c8fa0584f1b3", // The Red Clay Strays · State Farm Arena, Atlanta · 2026-11-13
      "63415225490d72fb", // Santana · House of Blues Las Vegas, Las Vegas · 2026-11-14
      "c183dcb307714a0d", // Santana · House of Blues Las Vegas, Las Vegas · 2026-11-15
      "b139a84c5047f328", // Teddy Swims · Mortgage Matchup Center, Phoenix · 2026-11-16
      "c190ddc63ea213c5", // Doja Cat · State Farm Arena, Atlanta · 2026-11-17
      "01cff57a67ef54fa", // Doja Cat · Spectrum Center, Charlotte · 2026-11-18
      "cb51e6b795e2b48e", // Teddy Swims · Kia Forum, Inglewood · 2026-11-18
      "daa41a679d528524", // Journey · American Airlines Center, Dallas · 2026-11-20
      "4362583ee1eecf75", // Doja Cat · Capital One Arena, Washington · 2026-11-21
      "c8db60183f2735a0", // Steve Lacy · Hollywood Bowl, Hollywood · 2026-11-21
      "b12ef4507d517042", // Doja Cat · TD Garden, Boston · 2026-11-23
      "6a7d23871c6ceabe", // Journey · Honda Center, Anaheim · 2026-11-24
      "0dd779f80a0b618a", // Journey · Chase Center, San Francisco · 2026-11-28
      "6fa550c3a61010fe", // Steve Lacy · WAMU Theater, Seattle · 2026-11-28
      "abb5a95f07493a0f", // Doja Cat · Xfinity Mobile Arena, Philadelphia · 2026-11-29
      "8e8613e2b116ec23", // Doja Cat · Madison Square Garden, New York · 2026-12-01
      "98837de85029b66c", // Pentatonix · CFG Bank Arena, Baltimore · 2026-12-03
      "8b07e3d4f2a5e491", // Tyla · Coca-Cola Roxy, Atlanta · 2026-12-06
      "198fc03c2ffa495d", // Tyla · The Pavilion at Toyota Music Factory, Irving · 2026-12-09
      "ac69af09056e5fb2", // Pentatonix · Bridgestone Arena, Nashville · 2026-12-09
      "3c83e359003d6dad", // Pentatonix · State Farm Arena, Atlanta · 2026-12-10
      "be000ae549804cfc", // Tyla · 713 Music Hall, Houston · 2026-12-10
      "f7e71cafa392b322", // Polyphia · O2 Academy Birmingham, Birmingham · 2026-12-11
      "cd042178d96d360c", // Tyla · Moody Center ATX, Austin · 2026-12-11
      "851db34ee9701e86", // Tyla · Arizona Financial Theatre, Phoenix · 2026-12-14
      "0b072e30f1a7b736", // Polyphia · O2 Academy Brixton, London · 2026-12-16
      "0d289969c5622e25", // Pentatonix · Moody Center ATX, Austin · 2026-12-15
      "e8625725141c7b6f", // Pentatonix · Dickies Arena, Fort Worth · 2026-12-16
      "0f4a9a752b57adfa", // Pentatonix · Desert Diamond Arena, Glendale · 2026-12-19
      "6edf3b9efca58794", // Hilary Duff · Scotiabank Saddledome, Calgary · 2027-01-26
      "ea75dd4ebc5346d6", // Andrea Bocelli · State Farm Arena, Atlanta · 2027-02-02
      "f704c96ad0b3a66e", // Andrea Bocelli · Moody Center ATX, Austin · 2027-02-04
      "126ed605c6e1d931", // Andrea Bocelli · American Airlines Center, Dallas · 2027-02-05
      "4a0588e257907c10", // Greta Van Fleet · Benchmark International Arena, Tampa · 2027-02-05
      "52eb4cf23d542684", // Greta Van Fleet · VyStar Veterans Memorial Arena, Jacksonville · 2027-02-06
      "9f6f4bb319de4440", // Greta Van Fleet · State Farm Arena, Atlanta · 2027-02-09
      "16998e15edb8d1d7", // Andrea Bocelli · Kia Center, Orlando · 2027-02-10
      "c2ebedf9e34526de", // Greta Van Fleet · Bridgestone Arena, Nashville · 2027-02-10
      "fba8c7f0eec26f34", // Greta Van Fleet · Allstate Arena, Rosemont · 2027-02-12
      "7c5b4e8ad1bb58d1", // Greta Van Fleet · Target Center, Minneapolis · 2027-02-15
      "228b4063f19550a7", // Dylan Gossett · O2 Academy Brixton, London · 2027-02-18
      "a0dc0d2c1d58b452", // Nickelback · Bridgestone Arena, Nashville · 2027-02-21
      "804776a67fff20eb", // Nickelback · State Farm Arena, Atlanta · 2027-03-02
      "f2a4e0dec3dbfad0", // Don Omar · Prudential Center, Newark · 2027-03-03
      "2aaeb0c1bb5de4df", // Nickelback · Lenovo Center, Raleigh · 2027-03-04
      "203fcf53201801b8", // Polyphia · Brooklyn Paramount, Brooklyn · 2027-03-06
      "16970af54716ea71", // Nickelback · Capital One Arena, Washington · 2027-03-08
      "cf5b14087dee5232", // Rod Stewart · Hard Rock Live, Hollywood · 2027-03-12
      "2dc8bcc1166add82", // Def Leppard · Prudential Center, Newark · 2027-03-13
      "a857542504b6c768", // Def Leppard · TD Garden, Boston · 2027-03-17
      "272a29d068a2e3d2", // Def Leppard · Capital One Arena, Washington · 2027-03-21
      "9e1b0cc783b4e657", // The Warning · OVO Arena Wembley, London · 2027-04-02
      "3d26bc6df3a07797", // Nothing But Thieves · Hollywood Palladium, Hollywood · 2027-04-04
      "dde2e4d660a4f117", // Teddy Swims · OVO Hydro, Glasgow · 2027-04-13
      "c7a905298228e134", // Earth, Wind & Fire · Brandon Amphitheater, Brandon · 2027-04-17
      "89906c3f75cb03d2", // Nothing But Thieves · Citizens House of Blues Boston, Boston · 2027-04-19
      "be0eafe7bc044da2", // Nothing But Thieves · MTELUS, Montreal · 2027-04-20
      "d3236fc4a08b7c48" // Earth, Wind & Fire · Township Auditorium, Columbia · 2027-04-27
    ])
  }),
  Object.freeze({
    id: "batch-3",
    selectedOn: "2026-10-23",
    keys: Object.freeze([
      "c3857bc6677e20b6", // Zach Bryan · Albertsons Stadium, Boise · 2027-08-06
      "40cd3dd76d5c4831", // Doja Cat · CFG Bank Arena, Baltimore · 2026-11-20
      "46794bee2d471694", // John Mayer · Sphere, Las Vegas · 2027-04-30
      "953ae01fca528991", // Kacey Musgraves · OVO Arena Wembley, London · 2027-02-26
      "82335aa5cc938301", // Nickelback · Hard Rock Live, Hollywood · 2027-02-26
      "e5dab49cb8131e35", // Eagles · Sphere, Las Vegas · 2026-12-11
      "870b50e4a128c14f", // Def Leppard · Centre Bell, Montreal · 2027-03-05
      "836168f5a578d5e4", // Stevie Wonder · Madison Square Garden, New York · 2026-11-19
      "e7cbd26277842bda", // Nickelback · Centre Bell, Montreal · 2027-03-12
      "5d13c3e4602c28d3", // Nickelback · Fiserv Forum, Milwaukee · 2027-03-27
      "8df0ca0f1e67c2fa", // Eagles · Sphere, Las Vegas · 2026-12-12
      "4980bc8f3fd7d9aa", // The Neighbourhood · The Truth, Nashville · 2026-11-14
      "1a82d740faa91097", // Nickelback · Rogers Place, Edmonton · 2027-04-03
      "9599635232cf15ac", // Nickelback · Rogers Arena, Vancouver · 2027-04-09
      "7178f3121f39d554", // Nickelback · Food City Center, Knoxville · 2027-02-24
      "f370da3087a7627d", // Fontaines D.C. · Bill Graham Civic Auditorium, San Francisco · 2027-05-12
      "49551ab118b0c009", // Def Leppard · Golden 1 Center, Sacramento · 2027-05-07
      "008216f3ee0f37b6", // Staind · CHI Health Center Omaha, Omaha · 2027-04-09
      "9482d2351a8bc6e2", // Staind · Van Andel Arena, Grand Rapids · 2027-04-13
      "9599be0efce90705", // Zach Bryan · Lambeau Field, Green Bay · 2027-05-04
      "92ff681e61449667", // Daughtry · Majestic Theatre Dallas, Dallas · 2026-11-14
      "f08b7c295de43b13", // Steve Lacy · Arizona Financial Theatre, Phoenix · 2026-11-17
      "f12b141c179723d8", // Zach Bryan · Highmark Stadium, Orchard Park · 2027-06-02
      "9e8c704e333d18df", // Zach Bryan · Lucas Oil Stadium, Indianapolis · 2027-05-01
      "ed664fd20c40f958", // Zach Bryan · Mercedes-Benz Stadium, Atlanta · 2027-05-29
      "37a6c675d90c212a", // Stevie Wonder · Capital One Arena, Washington · 2026-11-23
      "2ac7ecff59c042d8", // Stevie Wonder · Intuit Dome, Inglewood · 2026-12-19
      "8501f7a4bc0482a7", // Steve Lacy · UBC - Doug Mitchell Thunderbird Sports Centre, Vancouver · 2026-11-30
      "503c44c7be60c5f6", // Fontaines D.C. · Utilita Arena Birmingham, Birmingham · 2026-11-25
      "aa107ab8cb415d7a", // Polyphia · O2 Academy Leeds, Leeds · 2026-12-15
      "4e289b67a66817e9", // Tyla · UBC - Doug Mitchell Thunderbird Sports Centre, Vancouver · 2026-11-15
      "51f3187d2fb162d5", // Tyla · Fontainebleau Las Vegas, Las Vegas · 2026-12-19
      "7303a043e2cefb6c", // Journey · Bon Secours Wellness Arena, Greenville · 2026-11-14
      "683adfa533b22b3a", // The Neighbourhood · Bill Graham Civic Auditorium, San Francisco · 2026-12-02
      "e0921b169547105b", // Eagles · Sphere, Las Vegas · 2027-01-15
      "13375b16b196a81b", // Eagles · Sphere, Las Vegas · 2027-01-16
      "13375c16b196a9ce", // Eagles · Sphere, Las Vegas · 2027-01-22
      "36f77e36b4d70c08", // Eagles · Sphere, Las Vegas · 2027-01-23
      "e52a2c2020482fcd", // John Summit · Schottenstein Center, Columbus · 2026-11-13
      "6b4398551935ecf3", // Def Leppard · Regions Arena, Mobile · 2027-04-20
      "988bfb1b2dd754f1", // Def Leppard · Mohegan Sun Arena, Uncasville · 2027-06-25
      "1f5c16e60692320b", // Stevie Wonder · United Center, Chicago · 2026-11-21
      "344ad8c715ad1f78", // Bryson Tiller · bp pulse LIVE, Birmingham · 2026-12-09
      "9bcc518f63227d9c", // Bryson Tiller · The O2, London · 2026-12-07
      "40dff5bc3292c7b9", // KATSEYE · Climate Pledge Arena, Seattle · 2026-11-17
      "d158f96e32c1053f", // KATSEYE · Oakland Arena, Oakland · 2026-11-19
      "cc67cccb6d7aa239", // Rod Stewart · The O2 Belfast, Belfast · 2027-04-27
      "9306150cc90efae4", // Amble · House of Blues New Orleans, New Orleans · 2026-11-16
      "5bb1af38a92d4041", // Amble · The Echo Lounge & Music Hall, Dallas · 2026-11-18
      "33ce1a496320f221", // Saint Levant · Eventim Apollo, London · 2027-01-21
      "816cc9382c03e599", // Daughtry · Saracen Casino Resort, Pine Bluff · 2027-01-23
      "014520c91e4999f0", // The Red Clay Strays · Mohegan Sun Arena, Uncasville · 2027-03-18
      "4803537dbc17fd4c", // Fontaines D.C. · Channel 24, Sacramento · 2027-05-11
      "e46d1449873deb0c", // Trans-Siberian Orchestra · Mid-America Center, Council Bluffs · 2026-11-19
      "f662b3112e25e303", // Trans-Siberian Orchestra · Bridgestone Arena, Nashville · 2026-12-02
      "d236336c87baa951", // Blue October · The Fillmore Philadelphia, Philadelphia · 2026-11-15
      "a025ceab64e05a13", // Foy Vance · Neptune Theatre, Seattle · 2026-11-13
      "fb0a2f8dc7494eff", // Def Leppard · PPL Center, Allentown · 2027-03-02
      "707711098ebab5af", // Def Leppard · Simmons Bank Arena, North Little Rock · 2027-04-16
      "b70384494a4ff0a5", // Earth, Wind & Fire · Tennessee Theatre, Knoxville · 2027-04-28
      "71902401baad330e", // Andrea Bocelli · The O2, London · 2027-10-01
      "78d7c6ece103aa38", // Bryson Tiller · Co-op Live, Manchester · 2026-12-03
      "c4e145e51d4a034c", // Bryson Tiller · Utilita Arena Cardiff, Cardiff · 2026-12-05
      "69b759367433ca3f", // Lizzy McAlpine · Clowes Memorial Hall, Indianapolis · 2027-05-09
      "53475e0b80737fd0", // KATSEYE · Mortgage Matchup Center, Phoenix · 2026-11-24
      "50492dadeb972a7f", // Riley Green · Brandon Amphitheater, Brandon · 2027-06-03
      "00ef7fd27d16a4ad", // Trivium · Paramount Theatre, Seattle · 2026-12-09
      "ac8ad98da6845a38", // Trivium · OVO Hydro, Glasgow · 2027-03-31
      "5e267d40c859c8a4", // Trivium · Utilita Arena Cardiff, Cardiff · 2027-04-04
      "396d44fc04f3d20b", // Santana · House of Blues Las Vegas, Las Vegas · 2027-01-20
      "ec59229dadfc468d", // Santana · House of Blues Las Vegas, Las Vegas · 2027-01-21
      "253c0412a9893681", // Santana · House of Blues Las Vegas, Las Vegas · 2027-01-23
      "44d896c0a3c61af4", // Santana · House of Blues Las Vegas, Las Vegas · 2027-01-24
      "61ca095ab7bfeb23", // Santana · House of Blues Las Vegas, Las Vegas · 2027-01-27
      "4b09fddf730202b5", // Santana · House of Blues Las Vegas, Las Vegas · 2027-01-28
      "b0320dc1b46ab649", // Jonas Brothers · Pinnacle Bank Arena, Lincoln · 2026-12-10
      "d3618fb2b330826a", // Jonas Brothers · Denny Sanford PREMIER Center, Sioux Falls · 2026-12-12
      "ac9aa32bd7387d29", // Jonas Brothers · Van Andel Arena, Grand Rapids · 2026-12-15
      "d8f03785da021c7a", // Journey · Ball Arena, Denver · 2026-11-22
      "1bb73a2dea1027f0", // Michelle Branch · Manchester Music Hall, Lexington · 2026-11-13
      "43b6bd60ccd87970", // John Mayer · Sphere, Las Vegas · 2027-05-01
      "9f76aa42d550730e", // John Mayer · Sphere, Las Vegas · 2027-05-08
      "5265a8b5190f4f4f", // Leon Bridges · The Cosmopolitan of Las Vegas, Las Vegas · 2027-04-07
      "93c45cc37bec6755", // The Neighbourhood · Mortgage Matchup Center, Phoenix · 2026-11-30
      "d5aff735ddbf0ef2", // A Perfect Circle · Fox Theatre Detroit, Detroit · 2027-04-25
      "98e6fdadb243470d", // Rod Stewart · Enmarket Arena, Savannah · 2027-03-08
      "1e5cf83f5641b133", // Rod Stewart · Mohegan Sun Arena, Uncasville · 2027-03-19
      "1a7853a015bfb1c6", // Jay Wheeler · Coca-Cola Roxy, Atlanta · 2027-03-12
      "9662108fdbfb0d41", // Death Cab for Cutie · State Theatre, Portland · 2027-04-11
      "80f7c70d35c962b6", // Pink Martini · Hackensack Meridian Health Theatre at the Count Basie Center, Red Bank · 2026-12-16
      "e6f55d6c8a73d53d", // Weezer · OVO Hydro, Glasgow · 2027-05-19
      "3a1557e5ab90b597", // Pentatonix · Van Andel Arena, Grand Rapids · 2026-11-15
      "70d5c0555f17dd23", // Fantasia · VyStar Veterans Memorial Arena, Jacksonville · 2027-04-16
      "82ee3e5997eb4b5c", // Fantasia · Mortgage Matchup Center, Phoenix · 2027-04-23
      "d1982a436178f4b9", // Kenny Chesney · Highmark Stadium, Orchard Park · 2027-06-19
      "67a6d960c302431e", // Kenny Chesney · American Family Field, Milwaukee · 2027-07-10
      "6eb16ac379e841b2", // Kenny Chesney · Ford Field, Detroit · 2027-08-14
      "f701929f5bf76bb8", // Brand New · Arizona Financial Theatre, Phoenix · 2026-11-14
      "fb489b5a4b61d5b8", // Slipknot · Wembley Stadium, London · 2027-07-03
      "9b59f0969cdcccd6", // Slipknot · Golden Gate Park, San Francisco · 2027-08-15
      "deeadf332fb88f7e", // Brent Faiyaz · United Center, Chicago · 2026-11-30
      "a8a4ba2b69ffff0b", // Brent Faiyaz · Barclays Center, Brooklyn · 2026-12-03
      "5626e348be8d0425", // Don Omar · Ball Arena, Denver · 2027-02-03
      "b1358170cbceecdd", // Don Omar · CFG Bank Arena, Baltimore · 2027-03-04
      "af2fafbca2bfae3c", // Don Omar · Centre Bell, Montreal · 2027-02-21
      "d8dee3627324b95a", // Malcolm Todd · O2 Apollo Manchester, Manchester · 2027-02-28
      "547e2298b876c4f7", // Stella Lefty · The Fillmore Detroit, Detroit · 2027-01-09
      "0995fc58607aaab9", // Stella Lefty · MTELUS, Montreal · 2027-01-15
      "e20a927e875655a7", // Stella Lefty · The Fillmore Charlotte, Charlotte · 2027-01-25
      "c420623d20718299", // Stella Lefty · The Union, Salt Lake City · 2027-02-12
      "dc6465b1b02695c6", // Stella Lefty · Aragon Ballroom, Chicago · 2027-02-20
      "ef1ad436d9b7d27c", // Saint Levant · Paramount Theatre, Seattle · 2027-05-10
      "c2fe046b1cdf53da", // Saint Levant · Aragon Ballroom, Chicago · 2027-04-03
      "78602c78f5b7e12d", // Sombr · Bellahouston Park, Glasgow · 2027-06-19
      "519a1caf0fe405d7", // Sombr · Ormeau Park, Belfast · 2027-06-17
      "45f3e9d8f679c189", // Hans Zimmer · Ball Arena, Denver · 2027-03-25
      "e88b99c5d83a3603", // Hans Zimmer · Mortgage Matchup Center, Phoenix · 2027-03-30
      "57f51cec4c28536f", // Hans Zimmer · Honda Center, Anaheim · 2027-04-02
      "d46f8a992ebf9f0d", // Hans Zimmer · Chase Center, San Francisco · 2027-04-04
      "68740cb6af45a85a", // Hans Zimmer · Golden 1 Center, Sacramento · 2027-04-05
      "94ba720766f540a6", // Hans Zimmer · Climate Pledge Arena, Seattle · 2027-04-09
      "65bce5efe3fc89ee", // Daughtry · Hard Rock Live Orlando, Orlando · 2027-01-27
      "36b66a2462b1f777", // Daughtry · Bayou Music Center, Houston · 2027-01-31
      "5a82fe01cf8f5679", // Daughtry · Selena Auditorium, Corpus Christi · 2027-02-02
      "9ea883e832eacc1f", // Daughtry · Hershey Theatre, Hershey · 2027-02-26
      "1404e6912258bd2c", // Dinosaur Jr. · Brooklyn Bowl Nashville, Nashville · 2027-02-26
      "88b722bd476f65aa", // Dinosaur Jr. · The Fillmore Silver Spring, Silver Spring · 2027-02-16
      "500dab3520220d98", // Niall Horan · Dickies Arena, Fort Worth · 2027-05-02
      "24d24e6be22776e1", // Niall Horan · Nationwide Arena, Columbus · 2027-03-20
      "fef69bf5d705f58e", // Niall Horan · Gainbridge Fieldhouse, Indianapolis · 2027-03-26
      "6a25409b7eaeda3b", // Niall Horan · Centre Bell, Montreal · 2027-04-02
      "88d15cd4a1254e69", // Niall Horan · CFG Bank Arena, Baltimore · 2027-04-08
      "2c6eb49526c958b4", // Niall Horan · Lenovo Center, Raleigh · 2027-04-15
      "ecb64345eb98d825", // The Red Clay Strays · Lenovo Center, Raleigh · 2027-01-22
      "f192d9a81a89acc8", // The Red Clay Strays · Colonial Life Arena, Columbia · 2027-01-23
      "b0d72b90df5380fd", // The Red Clay Strays · Gainbridge Fieldhouse, Indianapolis · 2027-02-05
      "ca839fbe69750613", // The Red Clay Strays · Hertz Arena, Estero · 2027-02-25
      "8297388a620ba037", // The Red Clay Strays · SaskTel Centre, Saskatoon · 2027-03-11
      "c50b42ca40660f3b", // Fontaines D.C. · Fox Theatre Detroit, Detroit · 2027-04-27
      "294a3c83768ea40b", // Fontaines D.C. · WAMU Theater, Seattle · 2027-05-08
      "4925698ad384ba85", // Fontaines D.C. · Kia Forum, Inglewood · 2027-10-15
      "21d6818424f8fb5a", // Trans-Siberian Orchestra · Mohegan Arena at Casey Plaza, Wilkes Barre · 2026-11-24
      "37a1b596fe1a0324", // Trans-Siberian Orchestra · Charleston Coliseum, Charleston · 2026-12-03
      "6117792517782a13", // Trans-Siberian Orchestra · Save Mart Center, Fresno · 2026-12-03
      "f7221b28b7097ea8", // Trans-Siberian Orchestra · PPL Center, Allentown · 2026-12-09
      "acc3ef09397f84f8", // Blue October · Jefferson Theatre, Beaumont · 2026-12-10
      "bfc4393f445b094f", // Blue October · Payne Arena, Hidalgo · 2026-12-13
      "37832f8a26e25513", // Blue October · Selena Auditorium, Corpus Christi · 2026-12-17
      "8082ffe06346d387", // Blue October · Rialto Theatre-Tucson, Tucson · 2027-02-03
      "52ec20a2e4edc959" // Blue October · Knitting Factory - Spokane, Spokane · 2027-02-24
    ])
  })
]);
