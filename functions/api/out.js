import { impactMarketplacePublicEnabled } from "../_impact-marketplace-config.js";
import { browserIntentIdFromRequest } from "../_browser-intent.js";
import { describeNavigation, isLikelyBot } from "../_bot-detection.js";
import { insertAnalyticsRow } from "../_analytics-write.js";
import { eventLifecycleHeld } from "../_route-indexability.js";
import {
  classifyDestination,
  classifyDeviceCategory,
  classifyPageType,
  createClickId,
  isAffiliateProvider,
  isAffiliateTrackingHost,
  isValidClickId,
  normalizeAnalyticsPath,
  normalizeCtaLocation
} from "../_funnel.js";

const PLACEHOLDER_URL_PATTERN = /example\.com|placeholder|your-link|replace-me|localhost|127\.0\.0\.1/i;
const EVENTS_JSON_PATH = "/data/events.json";
const ARTISTS_JSON_PATH = "/data/artists.json";
const DEFAULT_IMPACT_API_BASE = "https://api.impact.com";
const IMPACT_PXF_TRACKING_HOSTS = ["pxf.io"];
// Some Impact brands issue tracking links on their own vanity domain instead
// of pxf.io. Each extra host is bound to the one provider whose Impact account
// issued it, so a link pasted into another provider's variable still fails.
const IMPACT_PROVIDER_TRACKING_HOSTS = {
  "stubhub-international": ["sjv.io"],
  ticketnetwork: ["goto.ticketnetwork.com"],
  "ticket-liquidator": ["auhm.net"]
};
// Temporary production proof header for /api/out. Remove after verifying
// plain (non-affiliate) Ticketmaster redirects are live.
const OUT_VERSION_HEADER = "tm-plain-redirects-2026-07-02";

const PROVIDERS = {
  ticketmaster: {
    name: "Ticketmaster",
    allowedDestinationHosts: [
      "ticketmaster.com",
      "ticketmaster.ca",
      "ticketmaster.co.uk",
      "ticketmaster.es",
      "ticketmaster.de",
      "ticketmaster.nl",
      "ticketmaster.se",
      "ticketmaster.pl",
      "ticketmaster.be",
      "ticketmaster.it",
      "ticketmaster.com.au",
      "ticketmaster.ie",
      "ticketmaster.com.mx",
      "ticketmaster.co.nz",
      "ticketmaster.cz",
      "ticketmaster.no",
      "ticketmaster.fi",
      "ticketmaster.ch",
      "ticketmaster.at",
      "ticketmaster.dk",
      "ticketmaster.co.za",
      "ticketmaster.ae",
      "ticketmaster.com.br",
      "ticketmaster.sg",
      "ticketweb.com",
      "ticketweb.ca"
    ],
    trustedAffiliateHosts: []
  },
  seatgeek: {
    name: "SeatGeek",
    allowedDestinationHosts: ["seatgeek.com"],
    trustedAffiliateHosts: []
  },
  "vivid-seats": {
    name: "Vivid Seats",
    allowedDestinationHosts: ["vividseats.com"],
    trustedAffiliateHosts: []
  },
  ticketnetwork: {
    name: "TicketNetwork",
    allowedDestinationHosts: ["ticketnetwork.com"],
    trustedAffiliateHosts: [],
    urlField: "ticketnetwork_url",
    publicEnabledEnv: "TICKETNETWORK_PUBLIC_ENABLED"
  },
  "ticket-liquidator": {
    name: "Ticket Liquidator",
    allowedDestinationHosts: ["ticketliquidator.com"],
    trustedAffiliateHosts: [],
    urlField: "ticketliquidator_url",
    publicEnabledEnv: "TICKETLIQUIDATOR_PUBLIC_ENABLED"
  },
  "stubhub-international": {
    name: "StubHub International",
    allowedDestinationHosts: [
      "stubhub.co.uk", "stubhub.ie", "stubhub.de", "stubhub.fr", "stubhub.es",
      "stubhub.it", "stubhub.pt", "stubhub.pl", "stubhub.se", "stubhub.dk",
      "stubhub.fi", "stubhub.gr", "stubhub.nl", "stubhub.lu", "stubhub.cz",
      "stubhub.be", "stubhub.co.at"
    ],
    trustedAffiliateHosts: [],
    urlField: "stubhub_international_url",
    publicEnabledEnv: "STUBHUB_INTERNATIONAL_PUBLIC_ENABLED"
  }
};

// Search URL shapes confirmed live (each returned the named artist's results):
// TicketNetwork and Ticket Liquidator on 2026-10-25, Vivid Seats and StubHub
// International on 2026-10-26 (StubHub goes to stubhub.ie, owner rule). A
// provider not listed here has no search link until its format is confirmed.
// Keep in sync with SEARCH_CHECK_PROVIDERS in functions/[[path]].js.
const SEARCH_CHECK_URL_BUILDERS = {
  ticketnetwork: (name) => `https://www.ticketnetwork.com/results-general?kwds=${encodeURIComponent(name)}`,
  "ticket-liquidator": (name) => `https://www.ticketliquidator.com/search?q=${encodeURIComponent(name)}`,
  "vivid-seats": (name) => `https://www.vividseats.com/search?searchTerm=${encodeURIComponent(name)}`,
  "stubhub-international": (name) => `https://www.stubhub.ie/find/s/?q=${encodeURIComponent(name)}`
};

function searchCheckLink(artistSlug, provider, artistName) {
  const build = SEARCH_CHECK_URL_BUILDERS[provider];
  const name = clean(artistName, 120);
  if (!build || !name) return null;
  return {
    artistSlug,
    provider,
    linkId: `search-${provider}-${artistSlug}`,
    redirectUrl: build(name),
    verified: true
  };
}

const VERIFIED_TICKET_LINKS = {
  "beyonce:ticketmaster": {
    artistSlug: "beyonce",
    provider: "ticketmaster",
    linkId: "tm-artist-beyonce",
    redirectUrl: "https://www.ticketmaster.com/beyonce-tickets/artist/894191",
    verified: true
  },
  "harry-styles:ticketmaster": {
    artistSlug: "harry-styles",
    provider: "ticketmaster",
    linkId: "tm-artist-harry-styles",
    redirectUrl: "https://www.ticketmaster.com/harry-styles-tickets/artist/2366444",
    verified: true
  },
  "bts:ticketmaster": {
    artistSlug: "bts",
    provider: "ticketmaster",
    linkId: "tm-artist-bts",
    redirectUrl: "https://www.ticketmaster.com/bts-tickets/artist/2110227",
    verified: true
  },
  "ariana-grande:ticketmaster": {
    artistSlug: "ariana-grande",
    provider: "ticketmaster",
    linkId: "tm-artist-ariana-grande",
    redirectUrl: "https://www.ticketmaster.com/ariana-grande-tickets/artist/1688071",
    verified: true
  },
  "bad-bunny:ticketmaster": {
    artistSlug: "bad-bunny",
    provider: "ticketmaster",
    linkId: "tm-artist-bad-bunny",
    redirectUrl: "https://www.ticketmaster.com/bad-bunny-tickets/artist/2317395",
    verified: true
  },
  "morgan-wallen:ticketmaster": {
    artistSlug: "morgan-wallen",
    provider: "ticketmaster",
    linkId: "tm-artist-morgan-wallen",
    redirectUrl: "https://www.ticketmaster.com/morgan-wallen-tickets/artist/2288122",
    verified: true
  },
  "jay-z:ticketmaster": {
    artistSlug: "jay-z",
    provider: "ticketmaster",
    linkId: "tm-artist-jay-z",
    redirectUrl: "https://www.ticketmaster.com/jayz-tickets/artist/781009",
    verified: true
  },
  "olivia-rodrigo:ticketmaster": {
    artistSlug: "olivia-rodrigo",
    provider: "ticketmaster",
    linkId: "tm-artist-olivia-rodrigo",
    redirectUrl: "https://www.ticketmaster.com/artist/2836194",
    verified: true
  },
  "bruno-mars:ticketmaster": {
    artistSlug: "bruno-mars",
    provider: "ticketmaster",
    linkId: "tm-artist-bruno-mars",
    redirectUrl: "https://www.ticketmaster.com/bruno-mars-tickets/artist/1466801",
    verified: true
  },
  "shakira:ticketmaster": {
    artistSlug: "shakira",
    provider: "ticketmaster",
    linkId: "tm-artist-shakira",
    redirectUrl: "https://www.ticketmaster.com/shakira-tickets/artist/779049",
    verified: true
  },
  "raye:ticketmaster": {
    artistSlug: "raye",
    provider: "ticketmaster",
    linkId: "tm-artist-raye",
    redirectUrl: "https://www.ticketmaster.com/raye-tickets/artist/2065089",
    verified: true
  },
  "charli-xcx:ticketmaster": {
    artistSlug: "charli-xcx",
    provider: "ticketmaster",
    linkId: "tm-artist-charli-xcx",
    redirectUrl: "https://www.ticketmaster.com/charli-xcx-tickets/artist/1638380",
    verified: true
  },
  "tate-mcrae:ticketmaster": {
    artistSlug: "tate-mcrae",
    provider: "ticketmaster",
    linkId: "tm-artist-tate-mcrae",
    redirectUrl: "https://www.ticketmaster.com/tate-mcrae-tickets/artist/2720246",
    verified: true
  },
  "ed-sheeran:ticketmaster": {
    artistSlug: "ed-sheeran",
    provider: "ticketmaster",
    linkId: "tm-artist-ed-sheeran",
    redirectUrl: "https://www.ticketmaster.com/ed-sheeran-tickets/artist/1560779",
    verified: true
  },
  "summer-walker:ticketmaster": {
    artistSlug: "summer-walker",
    provider: "ticketmaster",
    linkId: "tm-artist-summer-walker",
    redirectUrl: "https://www.ticketmaster.com/summer-walker-tickets/artist/2537562",
    verified: true
  },
  "rosalia:ticketmaster": {
    artistSlug: "rosalia",
    provider: "ticketmaster",
    linkId: "tm-artist-rosalia",
    redirectUrl: "https://www.ticketmaster.com/rosalia-tickets/artist/2453211",
    verified: true
  },
  // Artist-level SeatGeek performer pages. URLs captured 2026-07-02 from the
  // SeatGeek /2/performers/{id} API record for each artist's human-verified
  // performer id in data/provider-identities.json (never constructed from
  // names). Redirects are Impact-wrapped at click time.
  "beyonce:seatgeek": {
    artistSlug: "beyonce",
    provider: "seatgeek",
    linkId: "sg-artist-beyonce",
    redirectUrl: "https://seatgeek.com/beyonce-tickets",
    verified: true
  },
  "harry-styles:seatgeek": {
    artistSlug: "harry-styles",
    provider: "seatgeek",
    linkId: "sg-artist-harry-styles",
    redirectUrl: "https://seatgeek.com/harry-styles-tickets",
    verified: true
  },
  "bts:seatgeek": {
    artistSlug: "bts",
    provider: "seatgeek",
    linkId: "sg-artist-bts",
    redirectUrl: "https://seatgeek.com/bts-tickets",
    verified: true
  },
  "ariana-grande:seatgeek": {
    artistSlug: "ariana-grande",
    provider: "seatgeek",
    linkId: "sg-artist-ariana-grande",
    redirectUrl: "https://seatgeek.com/ariana-grande-tickets",
    verified: true
  },
  "bad-bunny:seatgeek": {
    artistSlug: "bad-bunny",
    provider: "seatgeek",
    linkId: "sg-artist-bad-bunny",
    redirectUrl: "https://seatgeek.com/bad-bunny-tickets",
    verified: true
  },
  "morgan-wallen:seatgeek": {
    artistSlug: "morgan-wallen",
    provider: "seatgeek",
    linkId: "sg-artist-morgan-wallen",
    redirectUrl: "https://seatgeek.com/morgan-wallen-tickets",
    verified: true
  },
  "jay-z:seatgeek": {
    artistSlug: "jay-z",
    provider: "seatgeek",
    linkId: "sg-artist-jay-z",
    redirectUrl: "https://seatgeek.com/jay-z-tickets",
    verified: true
  },
  "olivia-rodrigo:seatgeek": {
    artistSlug: "olivia-rodrigo",
    provider: "seatgeek",
    linkId: "sg-artist-olivia-rodrigo",
    redirectUrl: "https://seatgeek.com/olivia-rodrigo-tickets",
    verified: true
  },
  "bruno-mars:seatgeek": {
    artistSlug: "bruno-mars",
    provider: "seatgeek",
    linkId: "sg-artist-bruno-mars",
    redirectUrl: "https://seatgeek.com/bruno-mars-tickets",
    verified: true
  },
  "ed-sheeran:seatgeek": {
    artistSlug: "ed-sheeran",
    provider: "seatgeek",
    linkId: "sg-artist-ed-sheeran",
    redirectUrl: "https://seatgeek.com/ed-sheeran-tickets",
    verified: true
  },
  "shakira:seatgeek": {
    artistSlug: "shakira",
    provider: "seatgeek",
    linkId: "sg-artist-shakira",
    redirectUrl: "https://seatgeek.com/shakira-tickets",
    verified: true
  },
  "raye:seatgeek": {
    artistSlug: "raye",
    provider: "seatgeek",
    linkId: "sg-artist-raye",
    redirectUrl: "https://seatgeek.com/raye-tickets",
    verified: true
  },
  "charli-xcx:seatgeek": {
    artistSlug: "charli-xcx",
    provider: "seatgeek",
    linkId: "sg-artist-charli-xcx",
    redirectUrl: "https://seatgeek.com/charli-xcx-tickets",
    verified: true
  },
  "tate-mcrae:seatgeek": {
    artistSlug: "tate-mcrae",
    provider: "seatgeek",
    linkId: "sg-artist-tate-mcrae",
    redirectUrl: "https://seatgeek.com/tate-mcrae-tickets",
    verified: true
  },
  "summer-walker:seatgeek": {
    artistSlug: "summer-walker",
    provider: "seatgeek",
    linkId: "sg-artist-summer-walker",
    redirectUrl: "https://seatgeek.com/summer-walker-tickets",
    verified: true
  },
  "rosalia:seatgeek": {
    artistSlug: "rosalia",
    provider: "seatgeek",
    linkId: "sg-artist-rosalia",
    redirectUrl: "https://seatgeek.com/rosalia-tickets",
    verified: true
  },
  "post-malone:ticketmaster": {
    artistSlug: "post-malone",
    provider: "ticketmaster",
    linkId: "tm-artist-post-malone",
    redirectUrl: "https://www.ticketmaster.com/post-malone-tickets/artist/2119390",
    verified: true
  },
  "post-malone:seatgeek": {
    artistSlug: "post-malone",
    provider: "seatgeek",
    linkId: "sg-artist-post-malone",
    redirectUrl: "https://seatgeek.com/post-malone-tickets",
    verified: true
  },
  "zach-bryan:ticketmaster": {
    artistSlug: "zach-bryan",
    provider: "ticketmaster",
    linkId: "tm-artist-zach-bryan",
    redirectUrl: "https://www.ticketmaster.com/zach-bryan-tickets/artist/2811359",
    verified: true
  },
  "zach-bryan:seatgeek": {
    artistSlug: "zach-bryan",
    provider: "seatgeek",
    linkId: "sg-artist-zach-bryan",
    redirectUrl: "https://seatgeek.com/zach-bryan-tickets",
    verified: true
  },
  "jelly-roll:ticketmaster": {
    artistSlug: "jelly-roll",
    provider: "ticketmaster",
    linkId: "tm-artist-jelly-roll",
    redirectUrl: "https://www.ticketmaster.com/jelly-roll-tickets/artist/2131374",
    verified: true
  },
  "jelly-roll:seatgeek": {
    artistSlug: "jelly-roll",
    provider: "seatgeek",
    linkId: "sg-artist-jelly-roll",
    redirectUrl: "https://seatgeek.com/jelly-roll-tickets",
    verified: true
  },
  "tame-impala:ticketmaster": {
    artistSlug: "tame-impala",
    provider: "ticketmaster",
    linkId: "tm-artist-tame-impala",
    redirectUrl: "https://www.ticketmaster.com/tame-impala-tickets/artist/1446562",
    verified: true
  },
  "tame-impala:seatgeek": {
    artistSlug: "tame-impala",
    provider: "seatgeek",
    linkId: "sg-artist-tame-impala",
    redirectUrl: "https://seatgeek.com/tame-impala-tickets",
    verified: true
  },
  "gracie-abrams:ticketmaster": {
    artistSlug: "gracie-abrams",
    provider: "ticketmaster",
    linkId: "tm-artist-gracie-abrams",
    redirectUrl: "https://www.ticketmaster.com/gracie-abrams-tickets/artist/2763148",
    verified: true
  },
  "gracie-abrams:seatgeek": {
    artistSlug: "gracie-abrams",
    provider: "seatgeek",
    linkId: "sg-artist-gracie-abrams",
    redirectUrl: "https://seatgeek.com/gracie-abrams-tickets",
    verified: true
  },
  "niall-horan:ticketmaster": {
    artistSlug: "niall-horan",
    provider: "ticketmaster",
    linkId: "tm-artist-niall-horan",
    redirectUrl: "https://www.ticketmaster.com/niall-horan-tickets/artist/2297125",
    verified: true
  },
  "niall-horan:seatgeek": {
    artistSlug: "niall-horan",
    provider: "seatgeek",
    linkId: "sg-artist-niall-horan",
    redirectUrl: "https://seatgeek.com/niall-horan-tickets",
    verified: true
  },
  "doja-cat:ticketmaster": {
    artistSlug: "doja-cat",
    provider: "ticketmaster",
    linkId: "tm-artist-doja-cat",
    redirectUrl: "https://www.ticketmaster.com/doja-cat-tickets/artist/2062205",
    verified: true
  },
  "doja-cat:seatgeek": {
    artistSlug: "doja-cat",
    provider: "seatgeek",
    linkId: "sg-artist-doja-cat",
    redirectUrl: "https://seatgeek.com/doja-cat-tickets",
    verified: true
  },
  "sombr:ticketmaster": {
    artistSlug: "sombr",
    provider: "ticketmaster",
    linkId: "tm-artist-sombr",
    redirectUrl: "https://www.ticketmaster.com/sombr-tickets/artist/3144534",
    verified: true
  },
  "sombr:seatgeek": {
    artistSlug: "sombr",
    provider: "seatgeek",
    linkId: "sg-artist-sombr",
    redirectUrl: "https://seatgeek.com/sombr-tickets",
    verified: true
  },
  "latto:ticketmaster": {
    artistSlug: "latto",
    provider: "ticketmaster",
    linkId: "tm-artist-latto",
    redirectUrl: "https://www.ticketmaster.com/latto-tickets/artist/2842518",
    verified: true
  },
  "latto:seatgeek": {
    artistSlug: "latto",
    provider: "seatgeek",
    linkId: "sg-artist-latto",
    redirectUrl: "https://seatgeek.com/latto-tickets",
    verified: true
  },
  "john-summit:ticketmaster": {
    artistSlug: "john-summit",
    provider: "ticketmaster",
    linkId: "tm-artist-john-summit",
    redirectUrl: "https://www.ticketmaster.com/john-summit-tickets/artist/2730221",
    verified: true
  },
  "john-summit:seatgeek": {
    artistSlug: "john-summit",
    provider: "seatgeek",
    linkId: "sg-artist-john-summit",
    redirectUrl: "https://seatgeek.com/john-summit-tickets",
    verified: true
  },
  "karol-g:ticketmaster": {
    artistSlug: "karol-g",
    provider: "ticketmaster",
    linkId: "tm-artist-karol-g",
    redirectUrl: "https://www.ticketmaster.com/karol-g-tickets/artist/2412593",
    verified: true
  },
  "karol-g:seatgeek": {
    artistSlug: "karol-g",
    provider: "seatgeek",
    linkId: "sg-artist-karol-g",
    redirectUrl: "https://seatgeek.com/karol-g-tickets",
    verified: true
  },
  "foo-fighters:ticketmaster": {
    artistSlug: "foo-fighters",
    provider: "ticketmaster",
    linkId: "tm-artist-foo-fighters",
    redirectUrl: "https://www.ticketmaster.com/foo-fighters-tickets/artist/776005",
    verified: true
  },
  "foo-fighters:seatgeek": {
    artistSlug: "foo-fighters",
    provider: "seatgeek",
    linkId: "sg-artist-foo-fighters",
    redirectUrl: "https://seatgeek.com/foo-fighters-tickets",
    verified: true
  },
  "metallica:ticketmaster": {
    artistSlug: "metallica",
    provider: "ticketmaster",
    linkId: "tm-artist-metallica",
    redirectUrl: "https://www.ticketmaster.com/metallica-tickets/artist/735647",
    verified: true
  },
  "metallica:seatgeek": {
    artistSlug: "metallica",
    provider: "seatgeek",
    linkId: "sg-artist-metallica",
    redirectUrl: "https://seatgeek.com/metallica-tickets",
    verified: true
  },
  "my-chemical-romance:ticketmaster": {
    artistSlug: "my-chemical-romance",
    provider: "ticketmaster",
    linkId: "tm-artist-my-chemical-romance",
    redirectUrl: "https://www.ticketmaster.com/my-chemical-romance-tickets/artist/859324",
    verified: true
  },
  "my-chemical-romance:seatgeek": {
    artistSlug: "my-chemical-romance",
    provider: "seatgeek",
    linkId: "sg-artist-my-chemical-romance",
    redirectUrl: "https://seatgeek.com/my-chemical-romance-tickets",
    verified: true
  },
  "teddy-swims:ticketmaster": {
    artistSlug: "teddy-swims",
    provider: "ticketmaster",
    linkId: "tm-artist-teddy-swims",
    redirectUrl: "https://www.ticketmaster.com/teddy-swims-tickets/artist/2712573",
    verified: true
  },
  "teddy-swims:seatgeek": {
    artistSlug: "teddy-swims",
    provider: "seatgeek",
    linkId: "sg-artist-teddy-swims",
    redirectUrl: "https://seatgeek.com/teddy-swims-tickets",
    verified: true
  },
  "five-finger-death-punch:ticketmaster": {
    artistSlug: "five-finger-death-punch",
    provider: "ticketmaster",
    linkId: "tm-artist-five-finger-death-punch",
    redirectUrl: "https://www.ticketmaster.com/five-finger-death-punch-tickets/artist/1170515",
    verified: true
  },
  "five-finger-death-punch:seatgeek": {
    artistSlug: "five-finger-death-punch",
    provider: "seatgeek",
    linkId: "sg-artist-five-finger-death-punch",
    redirectUrl: "https://seatgeek.com/five-finger-death-punch-tickets",
    verified: true
  },
  "don-omar:ticketmaster": {
    artistSlug: "don-omar",
    provider: "ticketmaster",
    linkId: "tm-artist-don-omar",
    redirectUrl: "https://www.ticketmaster.com/don-omar-tickets/artist/1031846",
    verified: true
  },
  "don-omar:seatgeek": {
    artistSlug: "don-omar",
    provider: "seatgeek",
    linkId: "sg-artist-don-omar",
    redirectUrl: "https://seatgeek.com/don-omar-tickets",
    verified: true
  },
  "luke-combs:ticketmaster": {
    artistSlug: "luke-combs",
    provider: "ticketmaster",
    linkId: "tm-artist-luke-combs",
    redirectUrl: "https://www.ticketmaster.com/luke-combs-tickets/artist/2150342",
    verified: true
  },
  "luke-combs:seatgeek": {
    artistSlug: "luke-combs",
    provider: "seatgeek",
    linkId: "sg-artist-luke-combs",
    redirectUrl: "https://seatgeek.com/luke-combs-tickets",
    verified: true
  },
  "blue-october:ticketmaster": {
    artistSlug: "blue-october",
    provider: "ticketmaster",
    linkId: "tm-artist-blue-october",
    redirectUrl: "https://www.ticketmaster.com/blue-october-tickets/artist/712450",
    verified: true
  },
  "blue-october:seatgeek": {
    artistSlug: "blue-october",
    provider: "seatgeek",
    linkId: "sg-artist-blue-october",
    redirectUrl: "https://seatgeek.com/blue-october-tickets",
    verified: true
  },
  "pentatonix:ticketmaster": {
    artistSlug: "pentatonix",
    provider: "ticketmaster",
    linkId: "tm-artist-pentatonix",
    redirectUrl: "https://www.ticketmaster.com/pentatonix-tickets/artist/1747243",
    verified: true
  },
  "pentatonix:seatgeek": {
    artistSlug: "pentatonix",
    provider: "seatgeek",
    linkId: "sg-artist-pentatonix",
    redirectUrl: "https://seatgeek.com/pentatonix-tickets",
    verified: true
  },
  "tyla:ticketmaster": {
    artistSlug: "tyla",
    provider: "ticketmaster",
    linkId: "tm-artist-tyla",
    redirectUrl: "https://www.ticketmaster.com/tyla-tickets/artist/798720",
    verified: true
  },
  "tyla:seatgeek": {
    artistSlug: "tyla",
    provider: "seatgeek",
    linkId: "sg-artist-tyla",
    redirectUrl: "https://seatgeek.com/tyla-tickets",
    verified: true
  },
  "nothing-but-thieves:ticketmaster": {
    artistSlug: "nothing-but-thieves",
    provider: "ticketmaster",
    linkId: "tm-artist-nothing-but-thieves",
    redirectUrl: "https://www.ticketmaster.com/nothing-but-thieves-tickets/artist/1939994",
    verified: true
  },
  "nothing-but-thieves:seatgeek": {
    artistSlug: "nothing-but-thieves",
    provider: "seatgeek",
    linkId: "sg-artist-nothing-but-thieves",
    redirectUrl: "https://seatgeek.com/nothing-but-thieves-tickets",
    verified: true
  },
  "trivium:ticketmaster": {
    artistSlug: "trivium",
    provider: "ticketmaster",
    linkId: "tm-artist-trivium",
    redirectUrl: "https://www.ticketmaster.com/trivium-tickets/artist/962593",
    verified: true
  },
  "trivium:seatgeek": {
    artistSlug: "trivium",
    provider: "seatgeek",
    linkId: "sg-artist-trivium",
    redirectUrl: "https://seatgeek.com/trivium-tickets",
    verified: true
  },
  "sabaton:ticketmaster": {
    artistSlug: "sabaton",
    provider: "ticketmaster",
    linkId: "tm-artist-sabaton",
    redirectUrl: "https://www.ticketmaster.com/sabaton-tickets/artist/1432007",
    verified: true
  },
  "sabaton:seatgeek": {
    artistSlug: "sabaton",
    provider: "seatgeek",
    linkId: "sg-artist-sabaton",
    redirectUrl: "https://seatgeek.com/sabaton-tickets",
    verified: true
  },
  "in-flames:ticketmaster": {
    artistSlug: "in-flames",
    provider: "ticketmaster",
    linkId: "tm-artist-in-flames",
    redirectUrl: "https://www.ticketmaster.com/in-flames-tickets/artist/781515",
    verified: true
  },
  "in-flames:seatgeek": {
    artistSlug: "in-flames",
    provider: "seatgeek",
    linkId: "sg-artist-in-flames",
    redirectUrl: "https://seatgeek.com/in-flames-tickets",
    verified: true
  },
  "beartooth:ticketmaster": {
    artistSlug: "beartooth",
    provider: "ticketmaster",
    linkId: "tm-artist-beartooth",
    redirectUrl: "https://www.ticketmaster.com/beartooth-tickets/artist/1836474",
    verified: true
  },
  "beartooth:seatgeek": {
    artistSlug: "beartooth",
    provider: "seatgeek",
    linkId: "sg-artist-beartooth",
    redirectUrl: "https://seatgeek.com/beartooth-tickets",
    verified: true
  },
  "the-weeknd:ticketmaster": {
    artistSlug: "the-weeknd",
    provider: "ticketmaster",
    linkId: "tm-artist-the-weeknd",
    redirectUrl: "https://www.ticketmaster.com/the-weeknd-tickets/artist/1697014",
    verified: true
  },
  "the-weeknd:seatgeek": {
    artistSlug: "the-weeknd",
    provider: "seatgeek",
    linkId: "sg-artist-the-weeknd",
    redirectUrl: "https://seatgeek.com/the-weeknd-tickets",
    verified: true
  },
  "polyphia:ticketmaster": {
    artistSlug: "polyphia",
    provider: "ticketmaster",
    linkId: "tm-artist-polyphia",
    redirectUrl: "https://www.ticketmaster.com/polyphia-tickets/artist/2026502",
    verified: true
  },
  "polyphia:seatgeek": {
    artistSlug: "polyphia",
    provider: "seatgeek",
    linkId: "sg-artist-polyphia",
    redirectUrl: "https://seatgeek.com/polyphia-tickets",
    verified: true
  },
  "stella-lefty:ticketmaster": {
    artistSlug: "stella-lefty",
    provider: "ticketmaster",
    linkId: "tm-artist-stella-lefty",
    redirectUrl: "https://www.ticketmaster.com/stella-lefty-tickets/artist/3512399",
    verified: true
  },
  "stella-lefty:seatgeek": {
    artistSlug: "stella-lefty",
    provider: "seatgeek",
    linkId: "sg-artist-stella-lefty",
    redirectUrl: "https://seatgeek.com/stella-lefty-tickets",
    verified: true
  },
  "tobymac:ticketmaster": {
    artistSlug: "tobymac",
    provider: "ticketmaster",
    linkId: "tm-artist-tobymac",
    redirectUrl: "https://www.ticketmaster.com/tobymac-tickets/artist/867069",
    verified: true
  },
  "tobymac:seatgeek": {
    artistSlug: "tobymac",
    provider: "seatgeek",
    linkId: "sg-artist-tobymac",
    redirectUrl: "https://seatgeek.com/tobymac-tickets",
    verified: true
  },
  "saint-levant:ticketmaster": {
    artistSlug: "saint-levant",
    provider: "ticketmaster",
    linkId: "tm-artist-saint-levant",
    redirectUrl: "https://www.ticketmaster.com/saint-levant-tickets/artist/2984782",
    verified: true
  },
  "saint-levant:seatgeek": {
    artistSlug: "saint-levant",
    provider: "seatgeek",
    linkId: "sg-artist-saint-levant",
    redirectUrl: "https://seatgeek.com/saint-levant-tickets",
    verified: true
  },
  "the-airborne-toxic-event:ticketmaster": {
    artistSlug: "the-airborne-toxic-event",
    provider: "ticketmaster",
    linkId: "tm-artist-the-airborne-toxic-event",
    redirectUrl: "https://www.ticketmaster.com/the-airborne-toxic-event-tickets/artist/1228209",
    verified: true
  },
  "the-airborne-toxic-event:seatgeek": {
    artistSlug: "the-airborne-toxic-event",
    provider: "seatgeek",
    linkId: "sg-artist-the-airborne-toxic-event",
    redirectUrl: "https://seatgeek.com/the-airborne-toxic-event-tickets",
    verified: true
  },
  "andrea-bocelli:ticketmaster": {
    artistSlug: "andrea-bocelli",
    provider: "ticketmaster",
    linkId: "tm-artist-andrea-bocelli",
    redirectUrl: "https://www.ticketmaster.com/andrea-bocelli-tickets/artist/773296",
    verified: true
  },
  "andrea-bocelli:seatgeek": {
    artistSlug: "andrea-bocelli",
    provider: "seatgeek",
    linkId: "sg-artist-andrea-bocelli",
    redirectUrl: "https://seatgeek.com/andrea-bocelli-tickets",
    verified: true
  },
  "morat:ticketmaster": {
    artistSlug: "morat",
    provider: "ticketmaster",
    linkId: "tm-artist-morat",
    redirectUrl: "https://www.ticketmaster.com/morat-tickets/artist/2261438",
    verified: true
  },
  "morat:seatgeek": {
    artistSlug: "morat",
    provider: "seatgeek",
    linkId: "sg-artist-morat",
    redirectUrl: "https://seatgeek.com/morat-tickets",
    verified: true
  },
  "missio:ticketmaster": {
    artistSlug: "missio",
    provider: "ticketmaster",
    linkId: "tm-artist-missio",
    redirectUrl: "https://www.ticketmaster.com/missio-tickets/artist/2266598",
    verified: true
  },
  "missio:seatgeek": {
    artistSlug: "missio",
    provider: "seatgeek",
    linkId: "sg-artist-missio",
    redirectUrl: "https://seatgeek.com/missio-tickets",
    verified: true
  },
  "vnv-nation:ticketmaster": {
    artistSlug: "vnv-nation",
    provider: "ticketmaster",
    linkId: "tm-artist-vnv-nation",
    redirectUrl: "https://www.ticketmaster.com/vnv-nation-tickets/artist/715374",
    verified: true
  },
  "vnv-nation:seatgeek": {
    artistSlug: "vnv-nation",
    provider: "seatgeek",
    linkId: "sg-artist-vnv-nation",
    redirectUrl: "https://seatgeek.com/vnv-nation-tickets",
    verified: true
  },
  "michelle-branch:ticketmaster": {
    artistSlug: "michelle-branch",
    provider: "ticketmaster",
    linkId: "tm-artist-michelle-branch",
    redirectUrl: "https://www.ticketmaster.com/michelle-branch-tickets/artist/807228",
    verified: true
  },
  "michelle-branch:seatgeek": {
    artistSlug: "michelle-branch",
    provider: "seatgeek",
    linkId: "sg-artist-michelle-branch",
    redirectUrl: "https://seatgeek.com/michelle-branch-tickets",
    verified: true
  },
  "yuridia:ticketmaster": {
    artistSlug: "yuridia",
    provider: "ticketmaster",
    linkId: "tm-artist-yuridia",
    redirectUrl: "https://www.ticketmaster.com/yuridia-tickets/artist/1169217",
    verified: true
  },
  "yuridia:seatgeek": {
    artistSlug: "yuridia",
    provider: "seatgeek",
    linkId: "sg-artist-yuridia",
    redirectUrl: "https://seatgeek.com/yuridia-tickets",
    verified: true
  },
  "fkj:ticketmaster": {
    artistSlug: "fkj",
    provider: "ticketmaster",
    linkId: "tm-artist-fkj",
    redirectUrl: "https://www.ticketmaster.com/fkj-tickets/artist/2110704",
    verified: true
  },
  "fkj:seatgeek": {
    artistSlug: "fkj",
    provider: "seatgeek",
    linkId: "sg-artist-fkj",
    redirectUrl: "https://seatgeek.com/fkj-tickets",
    verified: true
  },
  "sylvan-esso:ticketmaster": {
    artistSlug: "sylvan-esso",
    provider: "ticketmaster",
    linkId: "tm-artist-sylvan-esso",
    redirectUrl: "https://www.ticketmaster.com/sylvan-esso-tickets/artist/1878194",
    verified: true
  },
  "sylvan-esso:seatgeek": {
    artistSlug: "sylvan-esso",
    provider: "seatgeek",
    linkId: "sg-artist-sylvan-esso",
    redirectUrl: "https://seatgeek.com/sylvan-esso-tickets",
    verified: true
  },
  "blondshell:ticketmaster": {
    artistSlug: "blondshell",
    provider: "ticketmaster",
    linkId: "tm-artist-blondshell",
    redirectUrl: "https://www.ticketmaster.com/blondshell-tickets/artist/2942885",
    verified: true
  },
  "blondshell:seatgeek": {
    artistSlug: "blondshell",
    provider: "seatgeek",
    linkId: "sg-artist-blondshell",
    redirectUrl: "https://seatgeek.com/blondshell-tickets",
    verified: true
  },
  "pink-martini:ticketmaster": {
    artistSlug: "pink-martini",
    provider: "ticketmaster",
    linkId: "tm-artist-pink-martini",
    redirectUrl: "https://www.ticketmaster.com/pink-martini-tickets/artist/798389",
    verified: true
  },
  "pink-martini:seatgeek": {
    artistSlug: "pink-martini",
    provider: "seatgeek",
    linkId: "sg-artist-pink-martini",
    redirectUrl: "https://seatgeek.com/pink-martini-tickets",
    verified: true
  },
  "oasis:ticketmaster": {
    artistSlug: "oasis",
    provider: "ticketmaster",
    linkId: "tm-artist-oasis",
    redirectUrl: "https://www.ticketmaster.com/oasis-tickets/artist/766720",
    verified: true
  },
  "oasis:seatgeek": {
    artistSlug: "oasis",
    provider: "seatgeek",
    linkId: "sg-artist-oasis",
    redirectUrl: "https://seatgeek.com/oasis-tickets",
    verified: true
  },
  "hans-zimmer:ticketmaster": {
    artistSlug: "hans-zimmer",
    provider: "ticketmaster",
    linkId: "tm-artist-hans-zimmer",
    redirectUrl: "https://www.ticketmaster.com/hans-zimmer-tickets/artist/1508961",
    verified: true
  },
  "hans-zimmer:seatgeek": {
    artistSlug: "hans-zimmer",
    provider: "seatgeek",
    linkId: "sg-artist-hans-zimmer",
    redirectUrl: "https://seatgeek.com/hans-zimmer-tickets",
    verified: true
  },
  "trans-siberian-orchestra:ticketmaster": {
    artistSlug: "trans-siberian-orchestra",
    provider: "ticketmaster",
    linkId: "tm-artist-trans-siberian-orchestra",
    redirectUrl: "https://www.ticketmaster.com/transsiberian-orchestra-tickets/artist/780815",
    verified: true
  },
  "trans-siberian-orchestra:seatgeek": {
    artistSlug: "trans-siberian-orchestra",
    provider: "seatgeek",
    linkId: "sg-artist-trans-siberian-orchestra",
    redirectUrl: "https://seatgeek.com/trans-siberian-orchestra-tickets",
    verified: true
  },
  "kenny-chesney:ticketmaster": {
    artistSlug: "kenny-chesney",
    provider: "ticketmaster",
    linkId: "tm-artist-kenny-chesney",
    redirectUrl: "https://www.ticketmaster.com/kenny-chesney-tickets/artist/767989",
    verified: true
  },
  "kenny-chesney:seatgeek": {
    artistSlug: "kenny-chesney",
    provider: "seatgeek",
    linkId: "sg-artist-kenny-chesney",
    redirectUrl: "https://seatgeek.com/kenny-chesney-tickets",
    verified: true
  },
  "death-cab-for-cutie:ticketmaster": {
    artistSlug: "death-cab-for-cutie",
    provider: "ticketmaster",
    linkId: "tm-artist-death-cab-for-cutie",
    redirectUrl: "https://www.ticketmaster.com/death-cab-for-cutie-tickets/artist/718349",
    verified: true
  },
  "death-cab-for-cutie:seatgeek": {
    artistSlug: "death-cab-for-cutie",
    provider: "seatgeek",
    linkId: "sg-artist-death-cab-for-cutie",
    redirectUrl: "https://seatgeek.com/death-cab-for-cutie-tickets",
    verified: true
  },
  "alan-walker:ticketmaster": {
    artistSlug: "alan-walker",
    provider: "ticketmaster",
    linkId: "tm-artist-alan-walker",
    redirectUrl: "https://www.ticketmaster.com/alan-walker-tickets/artist/2216743",
    verified: true
  },
  "alan-walker:seatgeek": {
    artistSlug: "alan-walker",
    provider: "seatgeek",
    linkId: "sg-artist-alan-walker",
    redirectUrl: "https://seatgeek.com/alan-walker-tickets",
    verified: true
  },
  "the-psychedelic-furs:ticketmaster": {
    artistSlug: "the-psychedelic-furs",
    provider: "ticketmaster",
    linkId: "tm-artist-the-psychedelic-furs",
    redirectUrl: "https://www.ticketmaster.com/the-psychedelic-furs-tickets/artist/877232",
    verified: true
  },
  "the-psychedelic-furs:seatgeek": {
    artistSlug: "the-psychedelic-furs",
    provider: "seatgeek",
    linkId: "sg-artist-the-psychedelic-furs",
    redirectUrl: "https://seatgeek.com/the-psychedelic-furs-tickets",
    verified: true
  },
  "eros-ramazzotti:ticketmaster": {
    artistSlug: "eros-ramazzotti",
    provider: "ticketmaster",
    linkId: "tm-artist-eros-ramazzotti",
    redirectUrl: "https://www.ticketmaster.com/eros-ramazzotti-tickets/artist/741794",
    verified: true
  },
  "eros-ramazzotti:seatgeek": {
    artistSlug: "eros-ramazzotti",
    provider: "seatgeek",
    linkId: "sg-artist-eros-ramazzotti",
    redirectUrl: "https://seatgeek.com/eros-ramazzotti-tickets",
    verified: true
  },
  "atmosphere:ticketmaster": {
    artistSlug: "atmosphere",
    provider: "ticketmaster",
    linkId: "tm-artist-atmosphere",
    redirectUrl: "https://www.ticketmaster.com/atmosphere-tickets/artist/717322",
    verified: true
  },
  "atmosphere:seatgeek": {
    artistSlug: "atmosphere",
    provider: "seatgeek",
    linkId: "sg-artist-atmosphere",
    redirectUrl: "https://seatgeek.com/atmosphere-tickets",
    verified: true
  },
  "the-warning:ticketmaster": {
    artistSlug: "the-warning",
    provider: "ticketmaster",
    linkId: "tm-artist-the-warning",
    redirectUrl: "https://www.ticketmaster.com/the-warning-tickets/artist/2156114",
    verified: true
  },
  "the-warning:seatgeek": {
    artistSlug: "the-warning",
    provider: "seatgeek",
    linkId: "sg-artist-the-warning",
    redirectUrl: "https://seatgeek.com/the-warning-tickets",
    verified: true
  },
  "hilary-duff:ticketmaster": {
    artistSlug: "hilary-duff",
    provider: "ticketmaster",
    linkId: "tm-artist-hilary-duff",
    redirectUrl: "https://www.ticketmaster.com/hilary-duff-tickets/artist/882305",
    verified: true
  },
  "hilary-duff:seatgeek": {
    artistSlug: "hilary-duff",
    provider: "seatgeek",
    linkId: "sg-artist-hilary-duff",
    redirectUrl: "https://seatgeek.com/hilary-duff-tickets",
    verified: true
  },
  "josiah-queen:ticketmaster": {
    artistSlug: "josiah-queen",
    provider: "ticketmaster",
    linkId: "tm-artist-josiah-queen",
    redirectUrl: "https://www.ticketmaster.com/josiah-queen-tickets/artist/3111481",
    verified: true
  },
  "josiah-queen:seatgeek": {
    artistSlug: "josiah-queen",
    provider: "seatgeek",
    linkId: "sg-artist-josiah-queen",
    redirectUrl: "https://seatgeek.com/josiah-queen-tickets",
    verified: true
  },
  "ha-ash:ticketmaster": {
    artistSlug: "ha-ash",
    provider: "ticketmaster",
    linkId: "tm-artist-ha-ash",
    redirectUrl: "https://www.ticketmaster.com/haash-tickets/artist/1639503",
    verified: true
  },
  "ha-ash:seatgeek": {
    artistSlug: "ha-ash",
    provider: "seatgeek",
    linkId: "sg-artist-ha-ash",
    redirectUrl: "https://seatgeek.com/ha-ash-tickets",
    verified: true
  },
  "lukas-graham:ticketmaster": {
    artistSlug: "lukas-graham",
    provider: "ticketmaster",
    linkId: "tm-artist-lukas-graham",
    redirectUrl: "https://www.ticketmaster.com/lukas-graham-tickets/artist/1667113",
    verified: true
  },
  "lukas-graham:seatgeek": {
    artistSlug: "lukas-graham",
    provider: "seatgeek",
    linkId: "sg-artist-lukas-graham",
    redirectUrl: "https://seatgeek.com/lukas-graham-tickets",
    verified: true
  },
  "passenger:ticketmaster": {
    artistSlug: "passenger",
    provider: "ticketmaster",
    linkId: "tm-artist-passenger",
    redirectUrl: "https://www.ticketmaster.com/passenger-tickets/artist/1231376",
    verified: true
  },
  "passenger:seatgeek": {
    artistSlug: "passenger",
    provider: "seatgeek",
    linkId: "sg-artist-passenger",
    redirectUrl: "https://seatgeek.com/passenger-tickets",
    verified: true
  },
  "sienna-spiro:ticketmaster": {
    artistSlug: "sienna-spiro",
    provider: "ticketmaster",
    linkId: "tm-artist-sienna-spiro",
    redirectUrl: "https://www.ticketmaster.com/sienna-spiro-tickets/artist/3376314",
    verified: true
  },
  "sienna-spiro:seatgeek": {
    artistSlug: "sienna-spiro",
    provider: "seatgeek",
    linkId: "sg-artist-sienna-spiro",
    redirectUrl: "https://seatgeek.com/sienna-spiro-tickets",
    verified: true
  },
  "malcolm-todd:ticketmaster": {
    artistSlug: "malcolm-todd",
    provider: "ticketmaster",
    linkId: "tm-artist-malcolm-todd",
    redirectUrl: "https://www.ticketmaster.com/malcolm-todd-tickets/artist/3112165",
    verified: true
  },
  "malcolm-todd:seatgeek": {
    artistSlug: "malcolm-todd",
    provider: "seatgeek",
    linkId: "sg-artist-malcolm-todd",
    redirectUrl: "https://seatgeek.com/malcolm-todd-tickets",
    verified: true
  },
  "lizzy-mcalpine:ticketmaster": {
    artistSlug: "lizzy-mcalpine",
    provider: "ticketmaster",
    linkId: "tm-artist-lizzy-mcalpine",
    redirectUrl: "https://www.ticketmaster.com/lizzy-mcalpine-tickets/artist/2782189",
    verified: true
  },
  "lizzy-mcalpine:seatgeek": {
    artistSlug: "lizzy-mcalpine",
    provider: "seatgeek",
    linkId: "sg-artist-lizzy-mcalpine",
    redirectUrl: "https://seatgeek.com/lizzy-mcalpine-tickets",
    verified: true
  },
  "the-interrupters:ticketmaster": {
    artistSlug: "the-interrupters",
    provider: "ticketmaster",
    linkId: "tm-artist-the-interrupters",
    redirectUrl: "https://www.ticketmaster.com/the-interrupters-tickets/artist/1860963",
    verified: true
  },
  "the-interrupters:seatgeek": {
    artistSlug: "the-interrupters",
    provider: "seatgeek",
    linkId: "sg-artist-the-interrupters",
    redirectUrl: "https://seatgeek.com/the-interrupters-tickets",
    verified: true
  },
  "dinosaur-jr:ticketmaster": {
    artistSlug: "dinosaur-jr",
    provider: "ticketmaster",
    linkId: "tm-artist-dinosaur-jr",
    redirectUrl: "https://www.ticketmaster.com/dinosaur-jr-tickets/artist/966351",
    verified: true
  },
  "dinosaur-jr:seatgeek": {
    artistSlug: "dinosaur-jr",
    provider: "seatgeek",
    linkId: "sg-artist-dinosaur-jr",
    redirectUrl: "https://seatgeek.com/dinosaur-jr-tickets",
    verified: true
  },
  "needtobreathe:ticketmaster": {
    artistSlug: "needtobreathe",
    provider: "ticketmaster",
    linkId: "tm-artist-needtobreathe",
    redirectUrl: "https://www.ticketmaster.com/needtobreathe-tickets/artist/1032338",
    verified: true
  },
  "needtobreathe:seatgeek": {
    artistSlug: "needtobreathe",
    provider: "seatgeek",
    linkId: "sg-artist-needtobreathe",
    redirectUrl: "https://seatgeek.com/needtobreathe-tickets",
    verified: true
  },
  "foy-vance:ticketmaster": {
    artistSlug: "foy-vance",
    provider: "ticketmaster",
    linkId: "tm-artist-foy-vance",
    redirectUrl: "https://www.ticketmaster.com/foy-vance-tickets/artist/35430",
    verified: true
  },
  "foy-vance:seatgeek": {
    artistSlug: "foy-vance",
    provider: "seatgeek",
    linkId: "sg-artist-foy-vance",
    redirectUrl: "https://seatgeek.com/foy-vance-tickets",
    verified: true
  },
  "the-lemonheads:ticketmaster": {
    artistSlug: "the-lemonheads",
    provider: "ticketmaster",
    linkId: "tm-artist-the-lemonheads",
    redirectUrl: "https://www.ticketmaster.com/the-lemonheads-tickets/artist/2147279",
    verified: true
  },
  "the-lemonheads:seatgeek": {
    artistSlug: "the-lemonheads",
    provider: "seatgeek",
    linkId: "sg-artist-the-lemonheads",
    redirectUrl: "https://seatgeek.com/the-lemonheads-tickets",
    verified: true
  },
  "tommy-emmanuel:ticketmaster": {
    artistSlug: "tommy-emmanuel",
    provider: "ticketmaster",
    linkId: "tm-artist-tommy-emmanuel",
    redirectUrl: "https://www.ticketmaster.com/tommy-emmanuel-tickets/artist/736952",
    verified: true
  },
  "tommy-emmanuel:seatgeek": {
    artistSlug: "tommy-emmanuel",
    provider: "seatgeek",
    linkId: "sg-artist-tommy-emmanuel",
    redirectUrl: "https://seatgeek.com/tommy-emmanuel-tickets",
    verified: true
  },
  "haiden-henderson:ticketmaster": {
    artistSlug: "haiden-henderson",
    provider: "ticketmaster",
    linkId: "tm-artist-haiden-henderson",
    redirectUrl: "https://www.ticketmaster.com/haiden-henderson-tickets/artist/3166056",
    verified: true
  },
  "haiden-henderson:seatgeek": {
    artistSlug: "haiden-henderson",
    provider: "seatgeek",
    linkId: "sg-artist-haiden-henderson",
    redirectUrl: "https://seatgeek.com/haiden-henderson-tickets",
    verified: true
  },
  "dylan-scott:ticketmaster": {
    artistSlug: "dylan-scott",
    provider: "ticketmaster",
    linkId: "tm-artist-dylan-scott",
    redirectUrl: "https://www.ticketmaster.com/dylan-scott-tickets/artist/2108264",
    verified: true
  },
  "dylan-scott:seatgeek": {
    artistSlug: "dylan-scott",
    provider: "seatgeek",
    linkId: "sg-artist-dylan-scott",
    redirectUrl: "https://seatgeek.com/dylan-scott-tickets",
    verified: true
  },
  "valley:ticketmaster": {
    artistSlug: "valley",
    provider: "ticketmaster",
    linkId: "tm-artist-valley",
    redirectUrl: "https://www.ticketmaster.com/valley-tickets/artist/2325710",
    verified: true
  },
  "valley:seatgeek": {
    artistSlug: "valley",
    provider: "seatgeek",
    linkId: "sg-artist-valley",
    redirectUrl: "https://seatgeek.com/valley-tickets",
    verified: true
  },
  "yacht-rock-revue:ticketmaster": {
    artistSlug: "yacht-rock-revue",
    provider: "ticketmaster",
    linkId: "tm-artist-yacht-rock-revue",
    redirectUrl: "https://www.ticketmaster.com/yacht-rock-revue-tickets/artist/1489501",
    verified: true
  },
  "yacht-rock-revue:seatgeek": {
    artistSlug: "yacht-rock-revue",
    provider: "seatgeek",
    linkId: "sg-artist-yacht-rock-revue",
    redirectUrl: "https://seatgeek.com/yacht-rock-revue-tickets",
    verified: true
  },
  "too-many-zooz:ticketmaster": {
    artistSlug: "too-many-zooz",
    provider: "ticketmaster",
    linkId: "tm-artist-too-many-zooz",
    redirectUrl: "https://www.ticketmaster.com/too-many-zooz-tickets/artist/2030532",
    verified: true
  },
  "too-many-zooz:seatgeek": {
    artistSlug: "too-many-zooz",
    provider: "seatgeek",
    linkId: "sg-artist-too-many-zooz",
    redirectUrl: "https://seatgeek.com/too-many-zooz-tickets",
    verified: true
  },
  "amble:ticketmaster": {
    artistSlug: "amble",
    provider: "ticketmaster",
    linkId: "tm-artist-amble",
    redirectUrl: "https://www.ticketmaster.com/amble-tickets/artist/3052592",
    verified: true
  },
  "amble:seatgeek": {
    artistSlug: "amble",
    provider: "seatgeek",
    linkId: "sg-artist-amble",
    redirectUrl: "https://seatgeek.com/amble-tickets",
    verified: true
  },
  "fantasia:ticketmaster": {
    artistSlug: "fantasia",
    provider: "ticketmaster",
    linkId: "tm-artist-fantasia",
    redirectUrl: "https://www.ticketmaster.com/fantasia-tickets/artist/1438797",
    verified: true
  },
  "fantasia:seatgeek": {
    artistSlug: "fantasia",
    provider: "seatgeek",
    linkId: "sg-artist-fantasia",
    redirectUrl: "https://seatgeek.com/fantasia-tickets",
    verified: true
  },
  "a-perfect-circle:ticketmaster": {
    artistSlug: "a-perfect-circle",
    provider: "ticketmaster",
    linkId: "tm-artist-a-perfect-circle",
    redirectUrl: "https://www.ticketmaster.com/a-perfect-circle-tickets/artist/707500",
    verified: true
  },
  "a-perfect-circle:seatgeek": {
    artistSlug: "a-perfect-circle",
    provider: "seatgeek",
    linkId: "sg-artist-a-perfect-circle",
    redirectUrl: "https://seatgeek.com/a-perfect-circle-tickets",
    verified: true
  },
  "chelsea-cutler:ticketmaster": {
    artistSlug: "chelsea-cutler",
    provider: "ticketmaster",
    linkId: "tm-artist-chelsea-cutler",
    redirectUrl: "https://www.ticketmaster.com/chelsea-cutler-tickets/artist/2437092",
    verified: true
  },
  "chelsea-cutler:seatgeek": {
    artistSlug: "chelsea-cutler",
    provider: "seatgeek",
    linkId: "sg-artist-chelsea-cutler",
    redirectUrl: "https://seatgeek.com/chelsea-cutler-tickets",
    verified: true
  },
  "the-red-clay-strays:ticketmaster": {
    artistSlug: "the-red-clay-strays",
    provider: "ticketmaster",
    linkId: "tm-artist-the-red-clay-strays",
    redirectUrl: "https://www.ticketmaster.com/the-red-clay-strays-tickets/artist/2663076",
    verified: true
  },
  "the-red-clay-strays:seatgeek": {
    artistSlug: "the-red-clay-strays",
    provider: "seatgeek",
    linkId: "sg-artist-the-red-clay-strays",
    redirectUrl: "https://seatgeek.com/the-red-clay-strays-tickets",
    verified: true
  },
  "daughtry:ticketmaster": {
    artistSlug: "daughtry",
    provider: "ticketmaster",
    linkId: "tm-artist-daughtry",
    redirectUrl: "https://www.ticketmaster.com/daughtry-tickets/artist/1097212",
    verified: true
  },
  "daughtry:seatgeek": {
    artistSlug: "daughtry",
    provider: "seatgeek",
    linkId: "sg-artist-daughtry",
    redirectUrl: "https://seatgeek.com/daughtry-tickets",
    verified: true
  },
  "greta-van-fleet:ticketmaster": {
    artistSlug: "greta-van-fleet",
    provider: "ticketmaster",
    linkId: "tm-artist-greta-van-fleet",
    redirectUrl: "https://www.ticketmaster.com/greta-van-fleet-tickets/artist/1971779",
    verified: true
  },
  "greta-van-fleet:seatgeek": {
    artistSlug: "greta-van-fleet",
    provider: "seatgeek",
    linkId: "sg-artist-greta-van-fleet",
    redirectUrl: "https://seatgeek.com/greta-van-fleet-tickets",
    verified: true
  },
  "fontaines-d-c:ticketmaster": {
    artistSlug: "fontaines-d-c",
    provider: "ticketmaster",
    linkId: "tm-artist-fontaines-d-c",
    redirectUrl: "https://www.ticketmaster.com/fontaines-dc-tickets/artist/2557986",
    verified: true
  },
  "fontaines-d-c:seatgeek": {
    artistSlug: "fontaines-d-c",
    provider: "seatgeek",
    linkId: "sg-artist-fontaines-d-c",
    redirectUrl: "https://seatgeek.com/fontaines-d-c-tickets",
    verified: true
  },
  "riley-green:ticketmaster": {
    artistSlug: "riley-green",
    provider: "ticketmaster",
    linkId: "tm-artist-riley-green",
    redirectUrl: "https://www.ticketmaster.com/riley-green-tickets/artist/2011722",
    verified: true
  },
  "riley-green:seatgeek": {
    artistSlug: "riley-green",
    provider: "seatgeek",
    linkId: "sg-artist-riley-green",
    redirectUrl: "https://seatgeek.com/riley-green-tickets",
    verified: true
  },
  "hazlett:ticketmaster": {
    artistSlug: "hazlett",
    provider: "ticketmaster",
    linkId: "tm-artist-hazlett",
    redirectUrl: "https://www.ticketmaster.com/hazlett-tickets/artist/2625420",
    verified: true
  },
  "hazlett:seatgeek": {
    artistSlug: "hazlett",
    provider: "seatgeek",
    linkId: "sg-artist-hazlett",
    redirectUrl: "https://seatgeek.com/hazlett-tickets",
    verified: true
  },
  "carly-rae-jepsen:ticketmaster": {
    artistSlug: "carly-rae-jepsen",
    provider: "ticketmaster",
    linkId: "tm-artist-carly-rae-jepsen",
    redirectUrl: "https://www.ticketmaster.com/carly-rae-jepsen-tickets/artist/1393390",
    verified: true
  },
  "carly-rae-jepsen:seatgeek": {
    artistSlug: "carly-rae-jepsen",
    provider: "seatgeek",
    linkId: "sg-artist-carly-rae-jepsen",
    redirectUrl: "https://seatgeek.com/carly-rae-jepsen-tickets",
    verified: true
  },
  "the-neighbourhood:ticketmaster": {
    artistSlug: "the-neighbourhood",
    provider: "ticketmaster",
    linkId: "tm-artist-the-neighbourhood",
    redirectUrl: "https://www.ticketmaster.com/the-neighbourhood-tickets/artist/2164718",
    verified: true
  },
  "the-neighbourhood:seatgeek": {
    artistSlug: "the-neighbourhood",
    provider: "seatgeek",
    linkId: "sg-artist-the-neighbourhood",
    redirectUrl: "https://seatgeek.com/the-neighbourhood-tickets",
    verified: true
  },
  "staind:ticketmaster": {
    artistSlug: "staind",
    provider: "ticketmaster",
    linkId: "tm-artist-staind",
    redirectUrl: "https://www.ticketmaster.com/staind-tickets/artist/717721",
    verified: true
  },
  "staind:seatgeek": {
    artistSlug: "staind",
    provider: "seatgeek",
    linkId: "sg-artist-staind",
    redirectUrl: "https://seatgeek.com/staind-tickets",
    verified: true
  },
  "dylan-gossett:ticketmaster": {
    artistSlug: "dylan-gossett",
    provider: "ticketmaster",
    linkId: "tm-artist-dylan-gossett",
    redirectUrl: "https://www.ticketmaster.com/dylan-gossett-tickets/artist/3086445",
    verified: true
  },
  "dylan-gossett:seatgeek": {
    artistSlug: "dylan-gossett",
    provider: "seatgeek",
    linkId: "sg-artist-dylan-gossett",
    redirectUrl: "https://seatgeek.com/dylan-gossett-tickets",
    verified: true
  },
  "flans:ticketmaster": {
    artistSlug: "flans",
    provider: "ticketmaster",
    linkId: "tm-artist-flans",
    redirectUrl: "https://www.ticketmaster.com/flans-tickets/artist/2046401",
    verified: true
  },
  "flans:seatgeek": {
    artistSlug: "flans",
    provider: "seatgeek",
    linkId: "sg-artist-flans",
    redirectUrl: "https://seatgeek.com/flans-tickets",
    verified: true
  },
  "warren-zeiders:ticketmaster": {
    artistSlug: "warren-zeiders",
    provider: "ticketmaster",
    linkId: "tm-artist-warren-zeiders",
    redirectUrl: "https://www.ticketmaster.com/warren-zeiders-tickets/artist/2869566",
    verified: true
  },
  "warren-zeiders:seatgeek": {
    artistSlug: "warren-zeiders",
    provider: "seatgeek",
    linkId: "sg-artist-warren-zeiders",
    redirectUrl: "https://seatgeek.com/warren-zeiders-tickets",
    verified: true
  },
  "dancing-with-the-stars:ticketmaster": {
    artistSlug: "dancing-with-the-stars",
    provider: "ticketmaster",
    linkId: "tm-artist-dancing-with-the-stars",
    redirectUrl: "https://www.ticketmaster.com/dancing-with-the-stars-tickets/artist/1086116",
    verified: true
  },
  "dancing-with-the-stars:seatgeek": {
    artistSlug: "dancing-with-the-stars",
    provider: "seatgeek",
    linkId: "sg-artist-dancing-with-the-stars",
    redirectUrl: "https://seatgeek.com/dancing-with-the-stars-1-tickets",
    verified: true
  },
  "def-leppard:ticketmaster": {
    artistSlug: "def-leppard",
    provider: "ticketmaster",
    linkId: "tm-artist-def-leppard",
    redirectUrl: "https://www.ticketmaster.com/def-leppard-tickets/artist/734898",
    verified: true
  },
  "def-leppard:seatgeek": {
    artistSlug: "def-leppard",
    provider: "seatgeek",
    linkId: "sg-artist-def-leppard",
    redirectUrl: "https://seatgeek.com/def-leppard-tickets",
    verified: true
  },
  "nickelback:ticketmaster": {
    artistSlug: "nickelback",
    provider: "ticketmaster",
    linkId: "tm-artist-nickelback",
    redirectUrl: "https://www.ticketmaster.com/nickelback-tickets/artist/710632",
    verified: true
  },
  "nickelback:seatgeek": {
    artistSlug: "nickelback",
    provider: "seatgeek",
    linkId: "sg-artist-nickelback",
    redirectUrl: "https://seatgeek.com/nickelback-tickets",
    verified: true
  },
  "jay-wheeler:ticketmaster": {
    artistSlug: "jay-wheeler",
    provider: "ticketmaster",
    linkId: "tm-artist-jay-wheeler",
    redirectUrl: "https://www.ticketmaster.com/jay-wheeler-tickets/artist/2795427",
    verified: true
  },
  "jay-wheeler:seatgeek": {
    artistSlug: "jay-wheeler",
    provider: "seatgeek",
    linkId: "sg-artist-jay-wheeler",
    redirectUrl: "https://seatgeek.com/jay-wheeler-tickets",
    verified: true
  },
  "mico:ticketmaster": {
    artistSlug: "mico",
    provider: "ticketmaster",
    linkId: "tm-artist-mico",
    redirectUrl: "https://www.ticketmaster.com/mico-tickets/artist/3000734",
    verified: true
  },
  "mico:seatgeek": {
    artistSlug: "mico",
    provider: "seatgeek",
    linkId: "sg-artist-mico",
    redirectUrl: "https://seatgeek.com/mico-tickets",
    verified: true
  },
  "rod-wave:ticketmaster": {
    artistSlug: "rod-wave",
    provider: "ticketmaster",
    linkId: "tm-artist-rod-wave",
    redirectUrl: "https://www.ticketmaster.com/rod-wave-tickets/artist/2663489",
    verified: true
  },
  "rod-wave:seatgeek": {
    artistSlug: "rod-wave",
    provider: "seatgeek",
    linkId: "sg-artist-rod-wave",
    redirectUrl: "https://seatgeek.com/rod-wave-tickets",
    verified: true
  },
  "uicideboy:ticketmaster": {
    artistSlug: "uicideboy",
    provider: "ticketmaster",
    linkId: "tm-artist-uicideboy",
    redirectUrl: "https://www.ticketmaster.com/uicideboy-tickets/artist/2194218",
    verified: true
  },
  "uicideboy:seatgeek": {
    artistSlug: "uicideboy",
    provider: "seatgeek",
    linkId: "sg-artist-uicideboy",
    redirectUrl: "https://seatgeek.com/uicideboy-tickets",
    verified: true
  },
  "steve-lacy:ticketmaster": {
    artistSlug: "steve-lacy",
    provider: "ticketmaster",
    linkId: "tm-artist-steve-lacy",
    redirectUrl: "https://www.ticketmaster.com/steve-lacy-tickets/artist/2330907",
    verified: true
  },
  "steve-lacy:seatgeek": {
    artistSlug: "steve-lacy",
    provider: "seatgeek",
    linkId: "sg-artist-steve-lacy",
    redirectUrl: "https://seatgeek.com/steve-lacy-tickets",
    verified: true
  },
  "the-smashing-pumpkins:ticketmaster": {
    artistSlug: "the-smashing-pumpkins",
    provider: "ticketmaster",
    linkId: "tm-artist-the-smashing-pumpkins",
    redirectUrl: "https://www.ticketmaster.com/the-smashing-pumpkins-tickets/artist/736143",
    verified: true
  },
  "the-smashing-pumpkins:seatgeek": {
    artistSlug: "the-smashing-pumpkins",
    provider: "seatgeek",
    linkId: "sg-artist-the-smashing-pumpkins",
    redirectUrl: "https://seatgeek.com/the-smashing-pumpkins-tickets",
    verified: true
  },
  "fuerza-regida:ticketmaster": {
    artistSlug: "fuerza-regida",
    provider: "ticketmaster",
    linkId: "tm-artist-fuerza-regida",
    redirectUrl: "https://www.ticketmaster.com/fuerza-regida-tickets/artist/2499958",
    verified: true
  },
  "fuerza-regida:seatgeek": {
    artistSlug: "fuerza-regida",
    provider: "seatgeek",
    linkId: "sg-artist-fuerza-regida",
    redirectUrl: "https://seatgeek.com/fuerza-regida-tickets",
    verified: true
  },
  "mei-semones:ticketmaster": {
    artistSlug: "mei-semones",
    provider: "ticketmaster",
    linkId: "tm-artist-mei-semones",
    redirectUrl: "https://www.ticketmaster.com/mei-semones-tickets/artist/2964416",
    verified: true
  },
  "mei-semones:seatgeek": {
    artistSlug: "mei-semones",
    provider: "seatgeek",
    linkId: "sg-artist-mei-semones",
    redirectUrl: "https://seatgeek.com/mei-semones-tickets",
    verified: true
  },
  "slipknot:ticketmaster": {
    artistSlug: "slipknot",
    provider: "ticketmaster",
    linkId: "tm-artist-slipknot",
    redirectUrl: "https://www.ticketmaster.com/slipknot-tickets/artist/763913",
    verified: true
  },
  "slipknot:seatgeek": {
    artistSlug: "slipknot",
    provider: "seatgeek",
    linkId: "sg-artist-slipknot",
    redirectUrl: "https://seatgeek.com/slipknot-tickets",
    verified: true
  },
  "noah-kahan:ticketmaster": {
    artistSlug: "noah-kahan",
    provider: "ticketmaster",
    linkId: "tm-artist-noah-kahan",
    redirectUrl: "https://www.ticketmaster.com/noah-kahan-tickets/artist/2385568",
    verified: true
  },
  "noah-kahan:seatgeek": {
    artistSlug: "noah-kahan",
    provider: "seatgeek",
    linkId: "sg-artist-noah-kahan",
    redirectUrl: "https://seatgeek.com/noah-kahan-tickets",
    verified: true
  },
  "eagles:ticketmaster": {
    artistSlug: "eagles",
    provider: "ticketmaster",
    linkId: "tm-artist-eagles",
    redirectUrl: "https://www.ticketmaster.com/eagles-tickets/artist/734977",
    verified: true
  },
  "eagles:seatgeek": {
    artistSlug: "eagles",
    provider: "seatgeek",
    linkId: "sg-artist-eagles",
    redirectUrl: "https://seatgeek.com/eagles-tickets",
    verified: true
  },
  "journey:ticketmaster": {
    artistSlug: "journey",
    provider: "ticketmaster",
    linkId: "tm-artist-journey",
    redirectUrl: "https://www.ticketmaster.com/journey-tickets/artist/735415",
    verified: true
  },
  "journey:seatgeek": {
    artistSlug: "journey",
    provider: "seatgeek",
    linkId: "sg-artist-journey",
    redirectUrl: "https://seatgeek.com/journey-tickets",
    verified: true
  },
  "john-mayer:ticketmaster": {
    artistSlug: "john-mayer",
    provider: "ticketmaster",
    linkId: "tm-artist-john-mayer",
    redirectUrl: "https://www.ticketmaster.com/john-mayer-tickets/artist/770494",
    verified: true
  },
  "john-mayer:seatgeek": {
    artistSlug: "john-mayer",
    provider: "seatgeek",
    linkId: "sg-artist-john-mayer",
    redirectUrl: "https://seatgeek.com/john-mayer-tickets",
    verified: true
  },
  "backstreet-boys:ticketmaster": {
    artistSlug: "backstreet-boys",
    provider: "ticketmaster",
    linkId: "tm-artist-backstreet-boys",
    redirectUrl: "https://www.ticketmaster.com/backstreet-boys-tickets/artist/781254",
    verified: true
  },
  "backstreet-boys:seatgeek": {
    artistSlug: "backstreet-boys",
    provider: "seatgeek",
    linkId: "sg-artist-backstreet-boys",
    redirectUrl: "https://seatgeek.com/backstreet-boys-tickets",
    verified: true
  },
  "twenty-one-pilots:ticketmaster": {
    artistSlug: "twenty-one-pilots",
    provider: "ticketmaster",
    linkId: "tm-artist-twenty-one-pilots",
    redirectUrl: "https://www.ticketmaster.com/twenty-one-pilots-tickets/artist/1495843",
    verified: true
  },
  "twenty-one-pilots:seatgeek": {
    artistSlug: "twenty-one-pilots",
    provider: "seatgeek",
    linkId: "sg-artist-twenty-one-pilots",
    redirectUrl: "https://seatgeek.com/twenty-one-pilots-tickets",
    verified: true
  },
  "rod-stewart:ticketmaster": {
    artistSlug: "rod-stewart",
    provider: "ticketmaster",
    linkId: "tm-artist-rod-stewart",
    redirectUrl: "https://www.ticketmaster.com/rod-stewart-tickets/artist/736200",
    verified: true
  },
  "rod-stewart:seatgeek": {
    artistSlug: "rod-stewart",
    provider: "seatgeek",
    linkId: "sg-artist-rod-stewart",
    redirectUrl: "https://seatgeek.com/rod-stewart-tickets",
    verified: true
  },
  "guns-n-roses:ticketmaster": {
    artistSlug: "guns-n-roses",
    provider: "ticketmaster",
    linkId: "tm-artist-guns-n-roses",
    redirectUrl: "https://www.ticketmaster.com/guns-n-roses-tickets/artist/735218",
    verified: true
  },
  "guns-n-roses:seatgeek": {
    artistSlug: "guns-n-roses",
    provider: "seatgeek",
    linkId: "sg-artist-guns-n-roses",
    redirectUrl: "https://seatgeek.com/guns-n-roses-tickets",
    verified: true
  },
  "bring-me-the-horizon:ticketmaster": {
    artistSlug: "bring-me-the-horizon",
    provider: "ticketmaster",
    linkId: "tm-artist-bring-me-the-horizon",
    redirectUrl: "https://www.ticketmaster.com/bring-me-the-horizon-tickets/artist/1153598",
    verified: true
  },
  "bring-me-the-horizon:seatgeek": {
    artistSlug: "bring-me-the-horizon",
    provider: "seatgeek",
    linkId: "sg-artist-bring-me-the-horizon",
    redirectUrl: "https://seatgeek.com/bring-me-the-horizon-tickets",
    verified: true
  },
  "leon-bridges:ticketmaster": {
    artistSlug: "leon-bridges",
    provider: "ticketmaster",
    linkId: "tm-artist-leon-bridges",
    redirectUrl: "https://www.ticketmaster.com/leon-bridges-tickets/artist/2075742",
    verified: true
  },
  "leon-bridges:seatgeek": {
    artistSlug: "leon-bridges",
    provider: "seatgeek",
    linkId: "sg-artist-leon-bridges",
    redirectUrl: "https://seatgeek.com/leon-bridges-tickets",
    verified: true
  },
  "lionel-richie:ticketmaster": {
    artistSlug: "lionel-richie",
    provider: "ticketmaster",
    linkId: "tm-artist-lionel-richie",
    redirectUrl: "https://www.ticketmaster.com/lionel-richie-tickets/artist/735972",
    verified: true
  },
  "lionel-richie:seatgeek": {
    artistSlug: "lionel-richie",
    provider: "seatgeek",
    linkId: "sg-artist-lionel-richie",
    redirectUrl: "https://seatgeek.com/lionel-richie-tickets",
    verified: true
  },
  "earth-wind-fire:ticketmaster": {
    artistSlug: "earth-wind-fire",
    provider: "ticketmaster",
    linkId: "tm-artist-earth-wind-fire",
    redirectUrl: "https://www.ticketmaster.com/earth-wind-fire-tickets/artist/734980",
    verified: true
  },
  "earth-wind-fire:seatgeek": {
    artistSlug: "earth-wind-fire",
    provider: "seatgeek",
    linkId: "sg-artist-earth-wind-fire",
    redirectUrl: "https://seatgeek.com/earth-wind-fire-tickets",
    verified: true
  },
  "santana:ticketmaster": {
    artistSlug: "santana",
    provider: "ticketmaster",
    linkId: "tm-artist-santana",
    redirectUrl: "https://www.ticketmaster.com/santana-tickets/artist/741473",
    verified: true
  },
  "santana:seatgeek": {
    artistSlug: "santana",
    provider: "seatgeek",
    linkId: "sg-artist-santana",
    redirectUrl: "https://seatgeek.com/santana-tickets",
    verified: true
  },
  "simple-minds:ticketmaster": {
    artistSlug: "simple-minds",
    provider: "ticketmaster",
    linkId: "tm-artist-simple-minds",
    redirectUrl: "https://www.ticketmaster.com/simple-minds-tickets/artist/736120",
    verified: true
  },
  "simple-minds:seatgeek": {
    artistSlug: "simple-minds",
    provider: "seatgeek",
    linkId: "sg-artist-simple-minds",
    redirectUrl: "https://seatgeek.com/simple-minds-tickets",
    verified: true
  },
  "thirty-seconds-to-mars:ticketmaster": {
    artistSlug: "thirty-seconds-to-mars",
    provider: "ticketmaster",
    linkId: "tm-artist-thirty-seconds-to-mars",
    redirectUrl: "https://www.ticketmaster.com/thirty-seconds-to-mars-tickets/artist/833240",
    verified: true
  },
  "thirty-seconds-to-mars:seatgeek": {
    artistSlug: "thirty-seconds-to-mars",
    provider: "seatgeek",
    linkId: "sg-artist-thirty-seconds-to-mars",
    redirectUrl: "https://seatgeek.com/thirty-seconds-to-mars-tickets",
    verified: true
  },
  "stray-kids:ticketmaster": {
    artistSlug: "stray-kids",
    provider: "ticketmaster",
    linkId: "tm-artist-stray-kids",
    redirectUrl: "https://www.ticketmaster.com/stray-kids-tickets/artist/2593788",
    verified: true
  },
  "stray-kids:seatgeek": {
    artistSlug: "stray-kids",
    provider: "seatgeek",
    linkId: "sg-artist-stray-kids",
    redirectUrl: "https://seatgeek.com/stray-kids-tickets",
    verified: true
  },
  "kylie-minogue:ticketmaster": {
    artistSlug: "kylie-minogue",
    provider: "ticketmaster",
    linkId: "tm-artist-kylie-minogue",
    redirectUrl: "https://www.ticketmaster.com/kylie-minogue-tickets/artist/1055633",
    verified: true
  },
  "kylie-minogue:seatgeek": {
    artistSlug: "kylie-minogue",
    provider: "seatgeek",
    linkId: "sg-artist-kylie-minogue",
    redirectUrl: "https://seatgeek.com/kylie-minogue-tickets",
    verified: true
  },
  "lewis-capaldi:ticketmaster": {
    artistSlug: "lewis-capaldi",
    provider: "ticketmaster",
    linkId: "tm-artist-lewis-capaldi",
    redirectUrl: "https://www.ticketmaster.com/lewis-capaldi-tickets/artist/2409990",
    verified: true
  },
  "lewis-capaldi:seatgeek": {
    artistSlug: "lewis-capaldi",
    provider: "seatgeek",
    linkId: "sg-artist-lewis-capaldi",
    redirectUrl: "https://seatgeek.com/lewis-capaldi-tickets",
    verified: true
  },
  "mumford-sons:ticketmaster": {
    artistSlug: "mumford-sons",
    provider: "ticketmaster",
    linkId: "tm-artist-mumford-sons",
    redirectUrl: "https://www.ticketmaster.com/mumford-sons-tickets/artist/1388154",
    verified: true
  },
  "mumford-sons:seatgeek": {
    artistSlug: "mumford-sons",
    provider: "seatgeek",
    linkId: "sg-artist-mumford-sons",
    redirectUrl: "https://seatgeek.com/mumford-sons-tickets",
    verified: true
  },
  "hayley-williams:ticketmaster": {
    artistSlug: "hayley-williams",
    provider: "ticketmaster",
    linkId: "tm-artist-hayley-williams",
    redirectUrl: "https://www.ticketmaster.com/hayley-williams-tickets/artist/2733627",
    verified: true
  },
  "hayley-williams:seatgeek": {
    artistSlug: "hayley-williams",
    provider: "seatgeek",
    linkId: "sg-artist-hayley-williams",
    redirectUrl: "https://seatgeek.com/hayley-williams-tickets",
    verified: true
  },
  "blink-182:ticketmaster": {
    artistSlug: "blink-182",
    provider: "ticketmaster",
    linkId: "tm-artist-blink-182",
    redirectUrl: "https://www.ticketmaster.com/blink182-tickets/artist/790708",
    verified: true
  },
  "blink-182:seatgeek": {
    artistSlug: "blink-182",
    provider: "seatgeek",
    linkId: "sg-artist-blink-182",
    redirectUrl: "https://seatgeek.com/blink-182-tickets",
    verified: true
  },
  "janet-jackson:ticketmaster": {
    artistSlug: "janet-jackson",
    provider: "ticketmaster",
    linkId: "tm-artist-janet-jackson",
    redirectUrl: "https://www.ticketmaster.com/janet-jackson-tickets/artist/735353",
    verified: true
  },
  "janet-jackson:seatgeek": {
    artistSlug: "janet-jackson",
    provider: "seatgeek",
    linkId: "sg-artist-janet-jackson",
    redirectUrl: "https://seatgeek.com/janet-jackson-tickets",
    verified: true
  },
  "gorillaz:ticketmaster": {
    artistSlug: "gorillaz",
    provider: "ticketmaster",
    linkId: "tm-artist-gorillaz",
    redirectUrl: "https://www.ticketmaster.com/gorillaz-tickets/artist/807314",
    verified: true
  },
  "gorillaz:seatgeek": {
    artistSlug: "gorillaz",
    provider: "seatgeek",
    linkId: "sg-artist-gorillaz",
    redirectUrl: "https://seatgeek.com/gorillaz-tickets",
    verified: true
  },
  "weezer:ticketmaster": {
    artistSlug: "weezer",
    provider: "ticketmaster",
    linkId: "tm-artist-weezer",
    redirectUrl: "https://www.ticketmaster.com/weezer-tickets/artist/766591",
    verified: true
  },
  "weezer:seatgeek": {
    artistSlug: "weezer",
    provider: "seatgeek",
    linkId: "sg-artist-weezer",
    redirectUrl: "https://seatgeek.com/weezer-tickets",
    verified: true
  },
  "ella-langley:ticketmaster": {
    artistSlug: "ella-langley",
    provider: "ticketmaster",
    linkId: "tm-artist-ella-langley",
    redirectUrl: "https://www.ticketmaster.com/ella-langley-tickets/artist/2514177",
    verified: true
  },
  "ella-langley:seatgeek": {
    artistSlug: "ella-langley",
    provider: "seatgeek",
    linkId: "sg-artist-ella-langley",
    redirectUrl: "https://seatgeek.com/ella-langley-tickets",
    verified: true
  },
  "aerosmith:ticketmaster": {
    artistSlug: "aerosmith",
    provider: "ticketmaster",
    linkId: "tm-artist-aerosmith",
    redirectUrl: "https://www.ticketmaster.com/aerosmith-tickets/artist/734396",
    verified: true
  },
  "aerosmith:seatgeek": {
    artistSlug: "aerosmith",
    provider: "seatgeek",
    linkId: "sg-artist-aerosmith",
    redirectUrl: "https://seatgeek.com/aerosmith-tickets",
    verified: true
  },
  "mana:ticketmaster": {
    artistSlug: "mana",
    provider: "ticketmaster",
    linkId: "tm-artist-mana",
    redirectUrl: "https://www.ticketmaster.com/mana-tickets/artist/759223",
    verified: true
  },
  "mana:seatgeek": {
    artistSlug: "mana",
    provider: "seatgeek",
    linkId: "sg-artist-mana",
    redirectUrl: "https://seatgeek.com/mana-tickets",
    verified: true
  },
  "jonas-brothers:ticketmaster": {
    artistSlug: "jonas-brothers",
    provider: "ticketmaster",
    linkId: "tm-artist-jonas-brothers",
    redirectUrl: "https://www.ticketmaster.com/jonas-brothers-tickets/artist/1052712",
    verified: true
  },
  "jonas-brothers:seatgeek": {
    artistSlug: "jonas-brothers",
    provider: "seatgeek",
    linkId: "sg-artist-jonas-brothers",
    redirectUrl: "https://seatgeek.com/jonas-brothers-tickets",
    verified: true
  },
  "brent-faiyaz:ticketmaster": {
    artistSlug: "brent-faiyaz",
    provider: "ticketmaster",
    linkId: "tm-artist-brent-faiyaz",
    redirectUrl: "https://www.ticketmaster.com/brent-faiyaz-tickets/artist/2429666",
    verified: true
  },
  "brent-faiyaz:seatgeek": {
    artistSlug: "brent-faiyaz",
    provider: "seatgeek",
    linkId: "sg-artist-brent-faiyaz",
    redirectUrl: "https://seatgeek.com/brent-faiyaz-tickets",
    verified: true
  },
  "ye:ticketmaster": {
    artistSlug: "ye",
    provider: "ticketmaster",
    linkId: "tm-artist-ye",
    redirectUrl: "https://www.ticketmaster.com/ye-tickets/artist/885590",
    verified: true
  },
  "ye:seatgeek": {
    artistSlug: "ye",
    provider: "seatgeek",
    linkId: "sg-artist-ye",
    redirectUrl: "https://seatgeek.com/ye-tickets",
    verified: true
  },
  "chris-brown:ticketmaster": {
    artistSlug: "chris-brown",
    provider: "ticketmaster",
    linkId: "tm-artist-chris-brown",
    redirectUrl: "https://www.ticketmaster.com/chris-brown-tickets/artist/1013849",
    verified: true
  },
  "chris-brown:seatgeek": {
    artistSlug: "chris-brown",
    provider: "seatgeek",
    linkId: "sg-artist-chris-brown",
    redirectUrl: "https://seatgeek.com/chris-brown-tickets",
    verified: true
  },
  "kevin-gates:ticketmaster": {
    artistSlug: "kevin-gates",
    provider: "ticketmaster",
    linkId: "tm-artist-kevin-gates",
    redirectUrl: "https://www.ticketmaster.com/kevin-gates-tickets/artist/1739199",
    verified: true
  },
  "kevin-gates:seatgeek": {
    artistSlug: "kevin-gates",
    provider: "seatgeek",
    linkId: "sg-artist-kevin-gates",
    redirectUrl: "https://seatgeek.com/kevin-gates-tickets",
    verified: true
  },
  "brand-new:ticketmaster": {
    artistSlug: "brand-new",
    provider: "ticketmaster",
    linkId: "tm-artist-brand-new",
    redirectUrl: "https://www.ticketmaster.com/brand-new-tickets/artist/821088",
    verified: true
  },
  "brand-new:seatgeek": {
    artistSlug: "brand-new",
    provider: "seatgeek",
    linkId: "sg-artist-brand-new",
    redirectUrl: "https://seatgeek.com/brand-new-tickets",
    verified: true
  },
  "kacey-musgraves:ticketmaster": {
    artistSlug: "kacey-musgraves",
    provider: "ticketmaster",
    linkId: "tm-artist-kacey-musgraves",
    redirectUrl: "https://www.ticketmaster.com/kacey-musgraves-tickets/artist/1668663",
    verified: true
  },
  "kacey-musgraves:seatgeek": {
    artistSlug: "kacey-musgraves",
    provider: "seatgeek",
    linkId: "sg-artist-kacey-musgraves",
    redirectUrl: "https://seatgeek.com/kacey-musgraves-tickets",
    verified: true
  },
  "knocked-loose:ticketmaster": {
    artistSlug: "knocked-loose",
    provider: "ticketmaster",
    linkId: "tm-artist-knocked-loose",
    redirectUrl: "https://www.ticketmaster.com/knocked-loose-tickets/artist/2082357",
    verified: true
  },
  "knocked-loose:seatgeek": {
    artistSlug: "knocked-loose",
    provider: "seatgeek",
    linkId: "sg-artist-knocked-loose",
    redirectUrl: "https://seatgeek.com/knocked-loose-tickets",
    verified: true
  },
  "chris-stapleton:ticketmaster": {
    artistSlug: "chris-stapleton",
    provider: "ticketmaster",
    linkId: "tm-artist-chris-stapleton",
    redirectUrl: "https://www.ticketmaster.com/chris-stapleton-tickets/artist/1828177",
    verified: true
  },
  "chris-stapleton:seatgeek": {
    artistSlug: "chris-stapleton",
    provider: "seatgeek",
    linkId: "sg-artist-chris-stapleton",
    redirectUrl: "https://seatgeek.com/chris-stapleton-tickets",
    verified: true
  },
  "chevelle:ticketmaster": {
    artistSlug: "chevelle",
    provider: "ticketmaster",
    linkId: "tm-artist-chevelle",
    redirectUrl: "https://www.ticketmaster.com/chevelle-tickets/artist/715308",
    verified: true
  },
  "chevelle:seatgeek": {
    artistSlug: "chevelle",
    provider: "seatgeek",
    linkId: "sg-artist-chevelle",
    redirectUrl: "https://seatgeek.com/chevelle-tickets",
    verified: true
  },
  "phoebe-bridgers:ticketmaster": {
    artistSlug: "phoebe-bridgers",
    provider: "ticketmaster",
    linkId: "tm-artist-phoebe-bridgers",
    redirectUrl: "https://www.ticketmaster.com/phoebe-bridgers-tickets/artist/2133305",
    verified: true
  },
  "phoebe-bridgers:seatgeek": {
    artistSlug: "phoebe-bridgers",
    provider: "seatgeek",
    linkId: "sg-artist-phoebe-bridgers",
    redirectUrl: "https://seatgeek.com/phoebe-bridgers-tickets",
    verified: true
  },
  "bryson-tiller:ticketmaster": {
    artistSlug: "bryson-tiller",
    provider: "ticketmaster",
    linkId: "tm-artist-bryson-tiller",
    redirectUrl: "https://www.ticketmaster.com/bryson-tiller-tickets/artist/2171167",
    verified: true
  },
  "bryson-tiller:seatgeek": {
    artistSlug: "bryson-tiller",
    provider: "seatgeek",
    linkId: "sg-artist-bryson-tiller",
    redirectUrl: "https://seatgeek.com/bryson-tiller-tickets",
    verified: true
  },
  "arcangel:ticketmaster": {
    artistSlug: "arcangel",
    provider: "ticketmaster",
    linkId: "tm-artist-arcangel",
    redirectUrl: "https://www.ticketmaster.com/arcangel-tickets/artist/1854185",
    verified: true
  },
  "arcangel:seatgeek": {
    artistSlug: "arcangel",
    provider: "seatgeek",
    linkId: "sg-artist-arcangel",
    redirectUrl: "https://seatgeek.com/arcangel-tickets",
    verified: true
  },
  "garth-brooks:ticketmaster": {
    artistSlug: "garth-brooks",
    provider: "ticketmaster",
    linkId: "tm-artist-garth-brooks",
    redirectUrl: "https://www.ticketmaster.com/garth-brooks-tickets/artist/732705",
    verified: true
  },
  "garth-brooks:seatgeek": {
    artistSlug: "garth-brooks",
    provider: "seatgeek",
    linkId: "sg-artist-garth-brooks",
    redirectUrl: "https://seatgeek.com/garth-brooks-tickets",
    verified: true
  },
  "elevation-worship:ticketmaster": {
    artistSlug: "elevation-worship",
    provider: "ticketmaster",
    linkId: "tm-artist-elevation-worship",
    redirectUrl: "https://www.ticketmaster.com/elevation-worship-tickets/artist/2248014",
    verified: true
  },
  "elevation-worship:seatgeek": {
    artistSlug: "elevation-worship",
    provider: "seatgeek",
    linkId: "sg-artist-elevation-worship",
    redirectUrl: "https://seatgeek.com/elevation-worship-tickets",
    verified: true
  },
  "stevie-wonder:ticketmaster": {
    artistSlug: "stevie-wonder",
    provider: "ticketmaster",
    linkId: "tm-artist-stevie-wonder",
    redirectUrl: "https://www.ticketmaster.com/stevie-wonder-tickets/artist/772848",
    verified: true
  },
  "stevie-wonder:seatgeek": {
    artistSlug: "stevie-wonder",
    provider: "seatgeek",
    linkId: "sg-artist-stevie-wonder",
    redirectUrl: "https://seatgeek.com/stevie-wonder-tickets",
    verified: true
  },
  "lil-wayne:ticketmaster": {
    artistSlug: "lil-wayne",
    provider: "ticketmaster",
    linkId: "tm-artist-lil-wayne",
    redirectUrl: "https://www.ticketmaster.com/lil-wayne-tickets/artist/712214",
    verified: true
  },
  "lil-wayne:seatgeek": {
    artistSlug: "lil-wayne",
    provider: "seatgeek",
    linkId: "sg-artist-lil-wayne",
    redirectUrl: "https://seatgeek.com/lil-wayne-tickets",
    verified: true
  },
  "tom-jones:ticketmaster": {
    artistSlug: "tom-jones",
    provider: "ticketmaster",
    linkId: "tm-artist-tom-jones",
    redirectUrl: "https://www.ticketmaster.com/tom-jones-tickets/artist/741236",
    verified: true
  },
  "tom-jones:seatgeek": {
    artistSlug: "tom-jones",
    provider: "seatgeek",
    linkId: "sg-artist-tom-jones",
    redirectUrl: "https://seatgeek.com/tom-jones-tickets",
    verified: true
  },
  "a-boogie-wit-da-hoodie:ticketmaster": {
    artistSlug: "a-boogie-wit-da-hoodie",
    provider: "ticketmaster",
    linkId: "tm-artist-a-boogie-wit-da-hoodie",
    redirectUrl: "https://www.ticketmaster.com/a-boogie-wit-da-hoodie-tickets/artist/2282847",
    verified: true
  },
  "a-boogie-wit-da-hoodie:seatgeek": {
    artistSlug: "a-boogie-wit-da-hoodie",
    provider: "seatgeek",
    linkId: "sg-artist-a-boogie-wit-da-hoodie",
    redirectUrl: "https://seatgeek.com/a-boogie-wit-da-hoodie-tickets",
    verified: true
  },
  "zach-top:ticketmaster": {
    artistSlug: "zach-top",
    provider: "ticketmaster",
    linkId: "tm-artist-zach-top",
    redirectUrl: "https://www.ticketmaster.com/zach-top-tickets/artist/3031977",
    verified: true
  },
  "zach-top:seatgeek": {
    artistSlug: "zach-top",
    provider: "seatgeek",
    linkId: "sg-artist-zach-top",
    redirectUrl: "https://seatgeek.com/zach-top-tickets",
    verified: true
  },
  "katseye:ticketmaster": {
    artistSlug: "katseye",
    provider: "ticketmaster",
    linkId: "tm-artist-katseye",
    redirectUrl: "https://www.ticketmaster.com/katseye-tickets/artist/3259344",
    verified: true
  },
  "katseye:seatgeek": {
    artistSlug: "katseye",
    provider: "seatgeek",
    linkId: "sg-artist-katseye",
    redirectUrl: "https://seatgeek.com/katseye-tickets",
    verified: true
  },
  "ricky-martin:ticketmaster": {
    artistSlug: "ricky-martin",
    provider: "ticketmaster",
    linkId: "tm-artist-ricky-martin",
    redirectUrl: "https://www.ticketmaster.com/ricky-martin-tickets/artist/755069",
    verified: true
  },
  "ricky-martin:seatgeek": {
    artistSlug: "ricky-martin",
    provider: "seatgeek",
    linkId: "sg-artist-ricky-martin",
    redirectUrl: "https://seatgeek.com/ricky-martin-tickets",
    verified: true
  },
  "ty-myers:ticketmaster": {
    artistSlug: "ty-myers",
    provider: "ticketmaster",
    linkId: "tm-artist-ty-myers",
    redirectUrl: "https://www.ticketmaster.com/ty-myers-tickets/artist/3109182",
    verified: true
  },
  "ty-myers:seatgeek": {
    artistSlug: "ty-myers",
    provider: "seatgeek",
    linkId: "sg-artist-ty-myers",
    redirectUrl: "https://seatgeek.com/ty-myers-tickets",
    verified: true
  },
  "dan-shay:ticketmaster": {
    artistSlug: "dan-shay",
    provider: "ticketmaster",
    linkId: "tm-artist-dan-shay",
    redirectUrl: "https://www.ticketmaster.com/dan-shay-tickets/artist/1955592",
    verified: true
  },
  "dan-shay:seatgeek": {
    artistSlug: "dan-shay",
    provider: "seatgeek",
    linkId: "sg-artist-dan-shay",
    redirectUrl: "https://seatgeek.com/dan-shay-tickets",
    verified: true
  },
  "beabadoobee:ticketmaster": {
    artistSlug: "beabadoobee",
    provider: "ticketmaster",
    linkId: "tm-artist-beabadoobee",
    redirectUrl: "https://www.ticketmaster.com/beabadoobee-tickets/artist/2618990",
    verified: true
  },
  "beabadoobee:seatgeek": {
    artistSlug: "beabadoobee",
    provider: "seatgeek",
    linkId: "sg-artist-beabadoobee",
    redirectUrl: "https://seatgeek.com/beabadoobee-tickets",
    verified: true
  },
  "dave-matthews-band:ticketmaster": {
    artistSlug: "dave-matthews-band",
    provider: "ticketmaster",
    linkId: "tm-artist-dave-matthews-band",
    redirectUrl: "https://www.ticketmaster.com/dave-matthews-band-tickets/artist/746531",
    verified: true
  },
  "dave-matthews-band:seatgeek": {
    artistSlug: "dave-matthews-band",
    provider: "seatgeek",
    linkId: "sg-artist-dave-matthews-band",
    redirectUrl: "https://seatgeek.com/dave-matthews-band-tickets",
    verified: true
  },
  "los-tigres-del-norte:ticketmaster": {
    artistSlug: "los-tigres-del-norte",
    provider: "ticketmaster",
    linkId: "tm-artist-los-tigres-del-norte",
    redirectUrl: "https://www.ticketmaster.com/los-tigres-del-norte-tickets/artist/755233",
    verified: true
  },
  "los-tigres-del-norte:seatgeek": {
    artistSlug: "los-tigres-del-norte",
    provider: "seatgeek",
    linkId: "sg-artist-los-tigres-del-norte",
    redirectUrl: "https://seatgeek.com/los-tigres-del-norte-tickets",
    verified: true
  },
  "the-chicks:ticketmaster": {
    artistSlug: "the-chicks",
    provider: "ticketmaster",
    linkId: "tm-artist-the-chicks",
    redirectUrl: "https://www.ticketmaster.com/the-chicks-tickets/artist/758656",
    verified: true
  },
  "the-chicks:seatgeek": {
    artistSlug: "the-chicks",
    provider: "seatgeek",
    linkId: "sg-artist-the-chicks",
    redirectUrl: "https://seatgeek.com/the-chicks-tickets",
    verified: true
  },
  "young-miko:ticketmaster": {
    artistSlug: "young-miko",
    provider: "ticketmaster",
    linkId: "tm-artist-young-miko",
    redirectUrl: "https://www.ticketmaster.com/young-miko-tickets/artist/3048303",
    verified: true
  },
  "young-miko:seatgeek": {
    artistSlug: "young-miko",
    provider: "seatgeek",
    linkId: "sg-artist-young-miko",
    redirectUrl: "https://seatgeek.com/young-miko-tickets",
    verified: true
  },
  "zac-brown-band:ticketmaster": {
    artistSlug: "zac-brown-band",
    provider: "ticketmaster",
    linkId: "tm-artist-zac-brown-band",
    redirectUrl: "https://www.ticketmaster.com/zac-brown-band-tickets/artist/1016048",
    verified: true
  },
  "zac-brown-band:seatgeek": {
    artistSlug: "zac-brown-band",
    provider: "seatgeek",
    linkId: "sg-artist-zac-brown-band",
    redirectUrl: "https://seatgeek.com/zac-brown-band-tickets",
    verified: true
  },
  "sleeping-with-sirens:ticketmaster": {
    artistSlug: "sleeping-with-sirens",
    provider: "ticketmaster",
    linkId: "tm-artist-sleeping-with-sirens",
    redirectUrl: "https://www.ticketmaster.com/sleeping-with-sirens-tickets/artist/1404292",
    verified: true
  },
  "sleeping-with-sirens:seatgeek": {
    artistSlug: "sleeping-with-sirens",
    provider: "seatgeek",
    linkId: "sg-artist-sleeping-with-sirens",
    redirectUrl: "https://seatgeek.com/sleeping-with-sirens-tickets",
    verified: true
  },
  "chayanne:ticketmaster": {
    artistSlug: "chayanne",
    provider: "ticketmaster",
    linkId: "tm-artist-chayanne",
    redirectUrl: "https://www.ticketmaster.com/chayanne-tickets/artist/754853",
    verified: true
  },
  "chayanne:seatgeek": {
    artistSlug: "chayanne",
    provider: "seatgeek",
    linkId: "sg-artist-chayanne",
    redirectUrl: "https://seatgeek.com/chayanne-tickets",
    verified: true
  },
  "cece-winans:ticketmaster": {
    artistSlug: "cece-winans",
    provider: "ticketmaster",
    linkId: "tm-artist-cece-winans",
    redirectUrl: "https://www.ticketmaster.com/cece-winans-tickets/artist/777488",
    verified: true
  },
  "cece-winans:seatgeek": {
    artistSlug: "cece-winans",
    provider: "seatgeek",
    linkId: "sg-artist-cece-winans",
    redirectUrl: "https://seatgeek.com/cece-winans-tickets",
    verified: true
  },
  "role-model:ticketmaster": {
    artistSlug: "role-model",
    provider: "ticketmaster",
    linkId: "tm-artist-role-model",
    redirectUrl: "https://www.ticketmaster.com/role-model-tickets/artist/2629945",
    verified: true
  },
  "role-model:seatgeek": {
    artistSlug: "role-model",
    provider: "seatgeek",
    linkId: "sg-artist-role-model",
    redirectUrl: "https://seatgeek.com/role-model-tickets",
    verified: true
  },
  "karan-aujla:ticketmaster": {
    artistSlug: "karan-aujla",
    provider: "ticketmaster",
    linkId: "tm-artist-karan-aujla",
    redirectUrl: "https://www.ticketmaster.com/karan-aujla-tickets/artist/2731661",
    verified: true
  },
  "karan-aujla:seatgeek": {
    artistSlug: "karan-aujla",
    provider: "seatgeek",
    linkId: "sg-artist-karan-aujla",
    redirectUrl: "https://seatgeek.com/karan-aujla-tickets",
    verified: true
  },
  "jack-johnson:ticketmaster": {
    artistSlug: "jack-johnson",
    provider: "ticketmaster",
    linkId: "tm-artist-jack-johnson",
    redirectUrl: "https://www.ticketmaster.com/jack-johnson-tickets/artist/754036",
    verified: true
  },
  "jack-johnson:seatgeek": {
    artistSlug: "jack-johnson",
    provider: "seatgeek",
    linkId: "sg-artist-jack-johnson",
    redirectUrl: "https://seatgeek.com/jack-johnson-tickets",
    verified: true
  },
  "phil-wickham:ticketmaster": {
    artistSlug: "phil-wickham",
    provider: "ticketmaster",
    linkId: "tm-artist-phil-wickham",
    redirectUrl: "https://www.ticketmaster.com/phil-wickham-tickets/artist/1482838",
    verified: true
  },
  "phil-wickham:seatgeek": {
    artistSlug: "phil-wickham",
    provider: "seatgeek",
    linkId: "sg-artist-phil-wickham",
    redirectUrl: "https://seatgeek.com/phil-wickham-tickets",
    verified: true
  },
  "gavin-adcock:ticketmaster": {
    artistSlug: "gavin-adcock",
    provider: "ticketmaster",
    linkId: "tm-artist-gavin-adcock",
    redirectUrl: "https://www.ticketmaster.com/gavin-adcock-tickets/artist/3095044",
    verified: true
  },
  "gavin-adcock:seatgeek": {
    artistSlug: "gavin-adcock",
    provider: "seatgeek",
    linkId: "sg-artist-gavin-adcock",
    redirectUrl: "https://seatgeek.com/gavin-adcock-tickets",
    verified: true
  },
  "u2:ticketmaster": {
    artistSlug: "u2",
    provider: "ticketmaster",
    linkId: "tm-artist-u2",
    redirectUrl: "https://www.ticketmaster.com/u2-tickets/artist/736365",
    verified: true
  },
  "u2:seatgeek": {
    artistSlug: "u2",
    provider: "seatgeek",
    linkId: "sg-artist-u2",
    redirectUrl: "https://seatgeek.com/u2-tickets",
    verified: true
  },
  "beck:ticketmaster": {
    artistSlug: "beck",
    provider: "ticketmaster",
    linkId: "tm-artist-beck",
    redirectUrl: "https://www.ticketmaster.com/beck-tickets/artist/765320",
    verified: true
  },
  "beck:seatgeek": {
    artistSlug: "beck",
    provider: "seatgeek",
    linkId: "sg-artist-beck",
    redirectUrl: "https://seatgeek.com/beck-tickets",
    verified: true
  },
  "dermot-kennedy:ticketmaster": {
    artistSlug: "dermot-kennedy",
    provider: "ticketmaster",
    linkId: "tm-artist-dermot-kennedy",
    redirectUrl: "https://www.ticketmaster.com/dermot-kennedy-tickets/artist/2089473",
    verified: true
  },
  "dermot-kennedy:seatgeek": {
    artistSlug: "dermot-kennedy",
    provider: "seatgeek",
    linkId: "sg-artist-dermot-kennedy",
    redirectUrl: "https://seatgeek.com/dermot-kennedy-tickets",
    verified: true
  },
  "turnpike-troubadours:ticketmaster": {
    artistSlug: "turnpike-troubadours",
    provider: "ticketmaster",
    linkId: "tm-artist-turnpike-troubadours",
    redirectUrl: "https://www.ticketmaster.com/turnpike-troubadours-tickets/artist/1551842",
    verified: true
  },
  "turnpike-troubadours:seatgeek": {
    artistSlug: "turnpike-troubadours",
    provider: "seatgeek",
    linkId: "sg-artist-turnpike-troubadours",
    redirectUrl: "https://seatgeek.com/turnpike-troubadours-tickets",
    verified: true
  },
  "sam-fender:ticketmaster": {
    artistSlug: "sam-fender",
    provider: "ticketmaster",
    linkId: "tm-artist-sam-fender",
    redirectUrl: "https://www.ticketmaster.com/sam-fender-tickets/artist/2417706",
    verified: true
  },
  "sam-fender:seatgeek": {
    artistSlug: "sam-fender",
    provider: "seatgeek",
    linkId: "sg-artist-sam-fender",
    redirectUrl: "https://seatgeek.com/sam-fender-tickets",
    verified: true
  },
  "bon-jovi:ticketmaster": {
    artistSlug: "bon-jovi",
    provider: "ticketmaster",
    linkId: "tm-artist-bon-jovi",
    redirectUrl: "https://www.ticketmaster.com/bon-jovi-tickets/artist/734608",
    verified: true
  },
  "bon-jovi:seatgeek": {
    artistSlug: "bon-jovi",
    provider: "seatgeek",
    linkId: "sg-artist-bon-jovi",
    redirectUrl: "https://seatgeek.com/bon-jovi-tickets",
    verified: true
  },
  "logic:ticketmaster": {
    artistSlug: "logic",
    provider: "ticketmaster",
    linkId: "tm-artist-logic",
    redirectUrl: "https://www.ticketmaster.com/logic-tickets/artist/1604590",
    verified: true
  },
  "logic:seatgeek": {
    artistSlug: "logic",
    provider: "seatgeek",
    linkId: "sg-artist-logic",
    redirectUrl: "https://seatgeek.com/logic-1-tickets",
    verified: true
  },
  "anuel-aa:ticketmaster": {
    artistSlug: "anuel-aa",
    provider: "ticketmaster",
    linkId: "tm-artist-anuel-aa",
    redirectUrl: "https://www.ticketmaster.com/anuel-aa-tickets/artist/2553245",
    verified: true
  },
  "anuel-aa:seatgeek": {
    artistSlug: "anuel-aa",
    provider: "seatgeek",
    linkId: "sg-artist-anuel-aa",
    redirectUrl: "https://seatgeek.com/anuel-aa-tickets",
    verified: true
  },
  "luke-bryan:ticketmaster": {
    artistSlug: "luke-bryan",
    provider: "ticketmaster",
    linkId: "tm-artist-luke-bryan",
    redirectUrl: "https://www.ticketmaster.com/luke-bryan-tickets/artist/1044173",
    verified: true
  },
  "luke-bryan:seatgeek": {
    artistSlug: "luke-bryan",
    provider: "seatgeek",
    linkId: "sg-artist-luke-bryan",
    redirectUrl: "https://seatgeek.com/luke-bryan-tickets",
    verified: true
  },
  "billy-strings:ticketmaster": {
    artistSlug: "billy-strings",
    provider: "ticketmaster",
    linkId: "tm-artist-billy-strings",
    redirectUrl: "https://www.ticketmaster.com/billy-strings-tickets/artist/2253625",
    verified: true
  },
  "billy-strings:seatgeek": {
    artistSlug: "billy-strings",
    provider: "seatgeek",
    linkId: "sg-artist-billy-strings",
    redirectUrl: "https://seatgeek.com/billy-strings-tickets",
    verified: true
  },
  "cristian-castro:ticketmaster": {
    artistSlug: "cristian-castro",
    provider: "ticketmaster",
    linkId: "tm-artist-cristian-castro",
    redirectUrl: "https://www.ticketmaster.com/cristian-castro-tickets/artist/844826",
    verified: true
  },
  "cristian-castro:seatgeek": {
    artistSlug: "cristian-castro",
    provider: "seatgeek",
    linkId: "sg-artist-cristian-castro",
    redirectUrl: "https://seatgeek.com/cristian-castro-tickets",
    verified: true
  },
  "treaty-oak-revival:ticketmaster": {
    artistSlug: "treaty-oak-revival",
    provider: "ticketmaster",
    linkId: "tm-artist-treaty-oak-revival",
    redirectUrl: "https://www.ticketmaster.com/treaty-oak-revival-tickets/artist/2951358",
    verified: true
  },
  "treaty-oak-revival:seatgeek": {
    artistSlug: "treaty-oak-revival",
    provider: "seatgeek",
    linkId: "sg-artist-treaty-oak-revival",
    redirectUrl: "https://seatgeek.com/treaty-oak-revival-tickets",
    verified: true
  },
  "boyz-ii-men:ticketmaster": {
    artistSlug: "boyz-ii-men",
    provider: "ticketmaster",
    linkId: "tm-artist-boyz-ii-men",
    redirectUrl: "https://www.ticketmaster.com/boyz-ii-men-tickets/artist/734632",
    verified: true
  },
  "boyz-ii-men:seatgeek": {
    artistSlug: "boyz-ii-men",
    provider: "seatgeek",
    linkId: "sg-artist-boyz-ii-men",
    redirectUrl: "https://seatgeek.com/boyz-ii-men-tickets",
    verified: true
  },
  "barry-manilow:ticketmaster": {
    artistSlug: "barry-manilow",
    provider: "ticketmaster",
    linkId: "tm-artist-barry-manilow",
    redirectUrl: "https://www.ticketmaster.com/barry-manilow-tickets/artist/735585",
    verified: true
  },
  "barry-manilow:seatgeek": {
    artistSlug: "barry-manilow",
    provider: "seatgeek",
    linkId: "sg-artist-barry-manilow",
    redirectUrl: "https://seatgeek.com/barry-manilow-tickets",
    verified: true
  },
  "koe-wetzel:ticketmaster": {
    artistSlug: "koe-wetzel",
    provider: "ticketmaster",
    linkId: "tm-artist-koe-wetzel",
    redirectUrl: "https://www.ticketmaster.com/koe-wetzel-tickets/artist/2453935",
    verified: true
  },
  "koe-wetzel:seatgeek": {
    artistSlug: "koe-wetzel",
    provider: "seatgeek",
    linkId: "sg-artist-koe-wetzel",
    redirectUrl: "https://seatgeek.com/koe-wetzel-tickets",
    verified: true
  },
  "victoria-monet:ticketmaster": {
    artistSlug: "victoria-monet",
    provider: "ticketmaster",
    linkId: "tm-artist-victoria-monet",
    redirectUrl: "https://www.ticketmaster.com/victoria-monet-tickets/artist/2247197",
    verified: true
  },
  "victoria-monet:seatgeek": {
    artistSlug: "victoria-monet",
    provider: "seatgeek",
    linkId: "sg-artist-victoria-monet",
    redirectUrl: "https://seatgeek.com/victoria-monet-tickets",
    verified: true
  },
  "jon-pardi:ticketmaster": {
    artistSlug: "jon-pardi",
    provider: "ticketmaster",
    linkId: "tm-artist-jon-pardi",
    redirectUrl: "https://www.ticketmaster.com/jon-pardi-tickets/artist/1541267",
    verified: true
  },
  "jon-pardi:seatgeek": {
    artistSlug: "jon-pardi",
    provider: "seatgeek",
    linkId: "sg-artist-jon-pardi",
    redirectUrl: "https://seatgeek.com/jon-pardi-tickets",
    verified: true
  },
  "brandi-carlile:ticketmaster": {
    artistSlug: "brandi-carlile",
    provider: "ticketmaster",
    linkId: "tm-artist-brandi-carlile",
    redirectUrl: "https://www.ticketmaster.com/brandi-carlile-tickets/artist/974048",
    verified: true
  },
  "brandi-carlile:seatgeek": {
    artistSlug: "brandi-carlile",
    provider: "seatgeek",
    linkId: "sg-artist-brandi-carlile",
    redirectUrl: "https://seatgeek.com/brandi-carlile-tickets",
    verified: true
  },
  "keith-urban:ticketmaster": {
    artistSlug: "keith-urban",
    provider: "ticketmaster",
    linkId: "tm-artist-keith-urban",
    redirectUrl: "https://www.ticketmaster.com/keith-urban-tickets/artist/821096",
    verified: true
  },
  "keith-urban:seatgeek": {
    artistSlug: "keith-urban",
    provider: "seatgeek",
    linkId: "sg-artist-keith-urban",
    redirectUrl: "https://seatgeek.com/keith-urban-tickets",
    verified: true
  },
  "interpol:ticketmaster": {
    artistSlug: "interpol",
    provider: "ticketmaster",
    linkId: "tm-artist-interpol",
    redirectUrl: "https://www.ticketmaster.com/interpol-tickets/artist/836507",
    verified: true
  },
  "interpol:seatgeek": {
    artistSlug: "interpol",
    provider: "seatgeek",
    linkId: "sg-artist-interpol",
    redirectUrl: "https://seatgeek.com/interpol-tickets",
    verified: true
  },
  "little-big-town:ticketmaster": {
    artistSlug: "little-big-town",
    provider: "ticketmaster",
    linkId: "tm-artist-little-big-town",
    redirectUrl: "https://www.ticketmaster.com/little-big-town-tickets/artist/960074",
    verified: true
  },
  "little-big-town:seatgeek": {
    artistSlug: "little-big-town",
    provider: "seatgeek",
    linkId: "sg-artist-little-big-town",
    redirectUrl: "https://seatgeek.com/little-big-town-tickets",
    verified: true
  },
  "shaboozey:ticketmaster": {
    artistSlug: "shaboozey",
    provider: "ticketmaster",
    linkId: "tm-artist-shaboozey",
    redirectUrl: "https://www.ticketmaster.com/shaboozey-tickets/artist/2194370",
    verified: true
  },
  "shaboozey:seatgeek": {
    artistSlug: "shaboozey",
    provider: "seatgeek",
    linkId: "sg-artist-shaboozey",
    redirectUrl: "https://seatgeek.com/shaboozey-tickets",
    verified: true
  },
  "carin-leon:ticketmaster": {
    artistSlug: "carin-leon",
    provider: "ticketmaster",
    linkId: "tm-artist-carin-leon",
    redirectUrl: "https://www.ticketmaster.com/carin-leon-tickets/artist/2826519",
    verified: true
  },
  "carin-leon:seatgeek": {
    artistSlug: "carin-leon",
    provider: "seatgeek",
    linkId: "sg-artist-carin-leon",
    redirectUrl: "https://seatgeek.com/carin-leon-tickets",
    verified: true
  },
  "phish:ticketmaster": {
    artistSlug: "phish",
    provider: "ticketmaster",
    linkId: "tm-artist-phish",
    redirectUrl: "https://www.ticketmaster.com/phish-tickets/artist/748766",
    verified: true
  },
  "phish:seatgeek": {
    artistSlug: "phish",
    provider: "seatgeek",
    linkId: "sg-artist-phish",
    redirectUrl: "https://seatgeek.com/phish-tickets",
    verified: true
  },
  "imagine-dragons:ticketmaster": {
    artistSlug: "imagine-dragons",
    provider: "ticketmaster",
    linkId: "tm-artist-imagine-dragons",
    redirectUrl: "https://www.ticketmaster.com/imagine-dragons-tickets/artist/1435919",
    verified: true
  },
  "imagine-dragons:seatgeek": {
    artistSlug: "imagine-dragons",
    provider: "seatgeek",
    linkId: "sg-artist-imagine-dragons",
    redirectUrl: "https://seatgeek.com/imagine-dragons-tickets",
    verified: true
  },
  "rufus-du-sol:ticketmaster": {
    artistSlug: "rufus-du-sol",
    provider: "ticketmaster",
    linkId: "tm-artist-rufus-du-sol",
    redirectUrl: "https://www.ticketmaster.com/rufus-du-sol-tickets/artist/1957114",
    verified: true
  },
  "rufus-du-sol:seatgeek": {
    artistSlug: "rufus-du-sol",
    provider: "seatgeek",
    linkId: "sg-artist-rufus-du-sol",
    redirectUrl: "https://seatgeek.com/rufus-du-sol-tickets",
    verified: true
  },
  "usher:ticketmaster": {
    artistSlug: "usher",
    provider: "ticketmaster",
    linkId: "tm-artist-usher",
    redirectUrl: "https://www.ticketmaster.com/usher-tickets/artist/766722",
    verified: true
  },
  "usher:seatgeek": {
    artistSlug: "usher",
    provider: "seatgeek",
    linkId: "sg-artist-usher",
    redirectUrl: "https://seatgeek.com/usher-tickets",
    verified: true
  },
  "illenium:ticketmaster": {
    artistSlug: "illenium",
    provider: "ticketmaster",
    linkId: "tm-artist-illenium",
    redirectUrl: "https://www.ticketmaster.com/illenium-tickets/artist/2035639",
    verified: true
  },
  "illenium:seatgeek": {
    artistSlug: "illenium",
    provider: "seatgeek",
    linkId: "sg-artist-illenium",
    redirectUrl: "https://seatgeek.com/illenium-tickets",
    verified: true
  },
  "lola-young:ticketmaster": {
    artistSlug: "lola-young",
    provider: "ticketmaster",
    linkId: "tm-artist-lola-young",
    redirectUrl: "https://www.ticketmaster.com/lola-young-tickets/artist/2813510",
    verified: true
  },
  "lola-young:seatgeek": {
    artistSlug: "lola-young",
    provider: "seatgeek",
    linkId: "sg-artist-lola-young",
    redirectUrl: "https://seatgeek.com/lola-young-tickets",
    verified: true
  },
  "james-blunt:ticketmaster": {
    artistSlug: "james-blunt",
    provider: "ticketmaster",
    linkId: "tm-artist-james-blunt",
    redirectUrl: "https://www.ticketmaster.com/james-blunt-tickets/artist/980710",
    verified: true
  },
  "james-blunt:seatgeek": {
    artistSlug: "james-blunt",
    provider: "seatgeek",
    linkId: "sg-artist-james-blunt",
    redirectUrl: "https://seatgeek.com/james-blunt-tickets",
    verified: true
  },
  "bryan-adams:ticketmaster": {
    artistSlug: "bryan-adams",
    provider: "ticketmaster",
    linkId: "tm-artist-bryan-adams",
    redirectUrl: "https://www.ticketmaster.com/bryan-adams-tickets/artist/734390",
    verified: true
  },
  "bryan-adams:seatgeek": {
    artistSlug: "bryan-adams",
    provider: "seatgeek",
    linkId: "sg-artist-bryan-adams",
    redirectUrl: "https://seatgeek.com/bryan-adams-tickets",
    verified: true
  },
  "megadeth:ticketmaster": {
    artistSlug: "megadeth",
    provider: "ticketmaster",
    linkId: "tm-artist-megadeth",
    redirectUrl: "https://www.ticketmaster.com/megadeth-tickets/artist/735627",
    verified: true
  },
  "megadeth:seatgeek": {
    artistSlug: "megadeth",
    provider: "seatgeek",
    linkId: "sg-artist-megadeth",
    redirectUrl: "https://seatgeek.com/megadeth-tickets",
    verified: true
  },
  "simple-plan:ticketmaster": {
    artistSlug: "simple-plan",
    provider: "ticketmaster",
    linkId: "tm-artist-simple-plan",
    redirectUrl: "https://www.ticketmaster.com/simple-plan-tickets/artist/840419",
    verified: true
  },
  "simple-plan:seatgeek": {
    artistSlug: "simple-plan",
    provider: "seatgeek",
    linkId: "sg-artist-simple-plan",
    redirectUrl: "https://seatgeek.com/simple-plan-tickets",
    verified: true
  },
  "simply-red:ticketmaster": {
    artistSlug: "simply-red",
    provider: "ticketmaster",
    linkId: "tm-artist-simply-red",
    redirectUrl: "https://www.ticketmaster.com/simply-red-tickets/artist/736121",
    verified: true
  },
  "simply-red:seatgeek": {
    artistSlug: "simply-red",
    provider: "seatgeek",
    linkId: "sg-artist-simply-red",
    redirectUrl: "https://seatgeek.com/simply-red-tickets",
    verified: true
  },
  "dropkick-murphys:ticketmaster": {
    artistSlug: "dropkick-murphys",
    provider: "ticketmaster",
    linkId: "tm-artist-dropkick-murphys",
    redirectUrl: "https://www.ticketmaster.com/dropkick-murphys-tickets/artist/798903",
    verified: true
  },
  "dropkick-murphys:seatgeek": {
    artistSlug: "dropkick-murphys",
    provider: "seatgeek",
    linkId: "sg-artist-dropkick-murphys",
    redirectUrl: "https://seatgeek.com/dropkick-murphys-tickets",
    verified: true
  },
  "kaleo:ticketmaster": {
    artistSlug: "kaleo",
    provider: "ticketmaster",
    linkId: "tm-artist-kaleo",
    redirectUrl: "https://www.ticketmaster.com/kaleo-tickets/artist/2091102",
    verified: true
  },
  "kaleo:seatgeek": {
    artistSlug: "kaleo",
    provider: "seatgeek",
    linkId: "sg-artist-kaleo",
    redirectUrl: "https://seatgeek.com/kaleo-tickets",
    verified: true
  },
  "alex-warren:ticketmaster": {
    artistSlug: "alex-warren",
    provider: "ticketmaster",
    linkId: "tm-artist-alex-warren",
    redirectUrl: "https://www.ticketmaster.com/alex-warren-tickets/artist/2965178",
    verified: true
  },
  "alex-warren:seatgeek": {
    artistSlug: "alex-warren",
    provider: "seatgeek",
    linkId: "sg-artist-alex-warren",
    redirectUrl: "https://seatgeek.com/alex-warren-tickets",
    verified: true
  },
  "marc-anthony:ticketmaster": {
    artistSlug: "marc-anthony",
    provider: "ticketmaster",
    linkId: "tm-artist-marc-anthony",
    redirectUrl: "https://www.ticketmaster.com/marc-anthony-tickets/artist/759949",
    verified: true
  },
  "marc-anthony:seatgeek": {
    artistSlug: "marc-anthony",
    provider: "seatgeek",
    linkId: "sg-artist-marc-anthony",
    redirectUrl: "https://seatgeek.com/marc-anthony-tickets",
    verified: true
  },
  "calvin-harris:ticketmaster": {
    artistSlug: "calvin-harris",
    provider: "ticketmaster",
    linkId: "tm-artist-calvin-harris",
    redirectUrl: "https://www.ticketmaster.com/calvin-harris-tickets/artist/1149552",
    verified: true
  },
  "calvin-harris:seatgeek": {
    artistSlug: "calvin-harris",
    provider: "seatgeek",
    linkId: "sg-artist-calvin-harris",
    redirectUrl: "https://seatgeek.com/calvin-harris-tickets",
    verified: true
  },
  "aespa:ticketmaster": {
    artistSlug: "aespa",
    provider: "ticketmaster",
    linkId: "tm-artist-aespa",
    redirectUrl: "https://www.ticketmaster.com/aespa-tickets/artist/2887549",
    verified: true
  },
  "aespa:seatgeek": {
    artistSlug: "aespa",
    provider: "seatgeek",
    linkId: "sg-artist-aespa",
    redirectUrl: "https://seatgeek.com/aespa-tickets",
    verified: true
  },
  "cage-the-elephant:ticketmaster": {
    artistSlug: "cage-the-elephant",
    provider: "ticketmaster",
    linkId: "tm-artist-cage-the-elephant",
    redirectUrl: "https://www.ticketmaster.com/cage-the-elephant-tickets/artist/1105603",
    verified: true
  },
  "cage-the-elephant:seatgeek": {
    artistSlug: "cage-the-elephant",
    provider: "seatgeek",
    linkId: "sg-artist-cage-the-elephant",
    redirectUrl: "https://seatgeek.com/cage-the-elephant-tickets",
    verified: true
  },
  "two-door-cinema-club:ticketmaster": {
    artistSlug: "two-door-cinema-club",
    provider: "ticketmaster",
    linkId: "tm-artist-two-door-cinema-club",
    redirectUrl: "https://www.ticketmaster.com/two-door-cinema-club-tickets/artist/1407642",
    verified: true
  },
  "two-door-cinema-club:seatgeek": {
    artistSlug: "two-door-cinema-club",
    provider: "seatgeek",
    linkId: "sg-artist-two-door-cinema-club",
    redirectUrl: "https://seatgeek.com/two-door-cinema-club-tickets",
    verified: true
  },
  "bullet-for-my-valentine:ticketmaster": {
    artistSlug: "bullet-for-my-valentine",
    provider: "ticketmaster",
    linkId: "tm-artist-bullet-for-my-valentine",
    redirectUrl: "https://www.ticketmaster.com/bullet-for-my-valentine-tickets/artist/1009824",
    verified: true
  },
  "bullet-for-my-valentine:seatgeek": {
    artistSlug: "bullet-for-my-valentine",
    provider: "seatgeek",
    linkId: "sg-artist-bullet-for-my-valentine",
    redirectUrl: "https://seatgeek.com/bullet-for-my-valentine-tickets",
    verified: true
  },
  "jake-bugg:ticketmaster": {
    artistSlug: "jake-bugg",
    provider: "ticketmaster",
    linkId: "tm-artist-jake-bugg",
    redirectUrl: "https://www.ticketmaster.com/jake-bugg-tickets/artist/1597196",
    verified: true
  },
  "jake-bugg:seatgeek": {
    artistSlug: "jake-bugg",
    provider: "seatgeek",
    linkId: "sg-artist-jake-bugg",
    redirectUrl: "https://seatgeek.com/jake-bugg-tickets",
    verified: true
  },
  "hollywood-undead:ticketmaster": {
    artistSlug: "hollywood-undead",
    provider: "ticketmaster",
    linkId: "tm-artist-hollywood-undead",
    redirectUrl: "https://www.ticketmaster.com/hollywood-undead-tickets/artist/1244694",
    verified: true
  },
  "hollywood-undead:seatgeek": {
    artistSlug: "hollywood-undead",
    provider: "seatgeek",
    linkId: "sg-artist-hollywood-undead",
    redirectUrl: "https://seatgeek.com/hollywood-undead-tickets",
    verified: true
  },
  "goo-goo-dolls:ticketmaster": {
    artistSlug: "goo-goo-dolls",
    provider: "ticketmaster",
    linkId: "tm-artist-goo-goo-dolls",
    redirectUrl: "https://www.ticketmaster.com/goo-goo-dolls-tickets/artist/735190",
    verified: true
  },
  "goo-goo-dolls:seatgeek": {
    artistSlug: "goo-goo-dolls",
    provider: "seatgeek",
    linkId: "sg-artist-goo-goo-dolls",
    redirectUrl: "https://seatgeek.com/goo-goo-dolls-tickets",
    verified: true
  },
  "lord-huron:ticketmaster": {
    artistSlug: "lord-huron",
    provider: "ticketmaster",
    linkId: "tm-artist-lord-huron",
    redirectUrl: "https://www.ticketmaster.com/lord-huron-tickets/artist/1486841",
    verified: true
  },
  "lord-huron:seatgeek": {
    artistSlug: "lord-huron",
    provider: "seatgeek",
    linkId: "sg-artist-lord-huron",
    redirectUrl: "https://seatgeek.com/lord-huron-tickets",
    verified: true
  },
  "remi-wolf:ticketmaster": {
    artistSlug: "remi-wolf",
    provider: "ticketmaster",
    linkId: "tm-artist-remi-wolf",
    redirectUrl: "https://www.ticketmaster.com/remi-wolf-tickets/artist/2689199",
    verified: true
  },
  "remi-wolf:seatgeek": {
    artistSlug: "remi-wolf",
    provider: "seatgeek",
    linkId: "sg-artist-remi-wolf",
    redirectUrl: "https://seatgeek.com/remi-wolf-tickets",
    verified: true
  },
  "air-supply:ticketmaster": {
    artistSlug: "air-supply",
    provider: "ticketmaster",
    linkId: "tm-artist-air-supply",
    redirectUrl: "https://www.ticketmaster.com/air-supply-tickets/artist/734403",
    verified: true
  },
  "air-supply:seatgeek": {
    artistSlug: "air-supply",
    provider: "seatgeek",
    linkId: "sg-artist-air-supply",
    redirectUrl: "https://seatgeek.com/air-supply-tickets",
    verified: true
  },
  "foreigner:ticketmaster": {
    artistSlug: "foreigner",
    provider: "ticketmaster",
    linkId: "tm-artist-foreigner",
    redirectUrl: "https://www.ticketmaster.com/foreigner-tickets/artist/735109",
    verified: true
  },
  "foreigner:seatgeek": {
    artistSlug: "foreigner",
    provider: "seatgeek",
    linkId: "sg-artist-foreigner",
    redirectUrl: "https://seatgeek.com/foreigner-tickets",
    verified: true
  }
};

function withOutVersionHeader(response) {
  response.headers.set("X-TTC-Out-Version", OUT_VERSION_HEADER);
  return response;
}

function json(payload, status = 200) {
  return withOutVersionHeader(new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  }));
}

function redirectResponse(destination, status = 302) {
  return new Response(null, {
    status,
    headers: {
      Location: destination,
      "X-TTC-Out-Version": OUT_VERSION_HEADER
    }
  });
}

function clean(value, max = 255) {
  return String(value || "").trim().slice(0, max);
}

function slugify(value) {
  return clean(value, 120)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function providerKey(value) {
  const key = slugify(value);
  if (key === "vividseats") return "vivid-seats";
  if (key === "ticketliquidator") return "ticket-liquidator";
  if (key === "stubhubinternational") return "stubhub-international";
  return key;
}

function getDemandDb(env) {
  const candidate = env?.DEMAND_DB;
  return candidate && typeof candidate.prepare === "function" ? candidate : null;
}

function isPlaceholderUrl(value) {
  return PLACEHOLDER_URL_PATTERN.test(String(value || ""));
}

function safeUrl(value) {
  const raw = clean(value, 2048);
  if (!raw || isPlaceholderUrl(raw)) return null;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    if (isUnsafeHost(parsed.hostname)) return null;
    return parsed;
  } catch (error) {
    return null;
  }
}

function isUnsafeHost(hostname) {
  const host = String(hostname || "").toLowerCase();
  if (!host) return true;
  if (host === "localhost" || host.endsWith(".localhost")) return true;
  if (/^127\./.test(host) || host === "0.0.0.0" || host === "::1" || host === "[::1]") return true;
  if (/^10\./.test(host) || /^192\.168\./.test(host)) return true;
  const private172 = host.match(/^172\.(\d+)\./);
  if (private172) {
    const second = Number(private172[1]);
    if (second >= 16 && second <= 31) return true;
  }
  return false;
}

function hostnameAllowed(hostname, allowedHosts) {
  const host = String(hostname || "").toLowerCase();
  return allowedHosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
}

function validateRequestedDestination(provider, value) {
  if (!value) return { ok: true };
  const parsed = safeUrl(value);
  if (!parsed) return { ok: false, status: "invalid_destination" };
  if (!hostnameAllowed(parsed.hostname, provider.allowedDestinationHosts)) {
    return { ok: false, status: "destination_not_allowlisted" };
  }
  return { ok: true, destinationHost: parsed.hostname.toLowerCase() };
}

function validateConfiguredRedirect(provider, value) {
  const parsed = safeUrl(value);
  if (!parsed) return null;
  const hosts = provider.allowedDestinationHosts.concat(provider.trustedAffiliateHosts);
  return hostnameAllowed(parsed.hostname, hosts) ? parsed : null;
}

async function loadEventsFromAssets(env) {
  const assets = env?.ASSETS;
  if (!assets || typeof assets.fetch !== "function") return null;

  try {
    const response = await assets.fetch(new Request(`https://assets.local${EVENTS_JSON_PATH}`));
    if (!response.ok) return null;
    const data = await response.json();
    return Array.isArray(data) ? data : null;
  } catch (error) {
    return null;
  }
}

// A demoted artist (a `demoted` object on its artists.json record, written by
// scripts/demote-artist.mjs) gets no outbound redirect of any kind — artist
// level or event level — even while its VERIFIED_TICKET_LINKS entries remain.
// Fails closed: if the record set cannot be read, no redirect is issued.
async function artistRedirectState(env, artistSlug) {
  const assets = env?.ASSETS;
  let artists = null;
  if (assets && typeof assets.fetch === "function") {
    try {
      const response = await assets.fetch(new Request(`https://assets.local${ARTISTS_JSON_PATH}`));
      const data = response.ok ? await response.json() : null;
      artists = Array.isArray(data) ? data : null;
    } catch (error) {
      artists = null;
    }
  }
  if (!artists) return { ok: false, status: "artist_state_unavailable", httpStatus: 503 };
  const record = artists.find((candidate) => slugify(candidate?.slug) === slugify(artistSlug));
  if (record?.demoted && typeof record.demoted === "object") return { ok: false, status: "artist_demoted", httpStatus: 410 };
  return { ok: true, artistName: clean(record?.name, 120) };
}

function eventUrlContainsTicketmasterId(redirect, eventId) {
  const expected = clean(eventId, 255).toLowerCase();
  if (!expected) return true;

  const pathSegments = redirect.pathname
    .split("/")
    .map((segment) => decodeURIComponent(segment).toLowerCase());
  if (pathSegments.includes(expected)) return true;

  return redirect.toString().toLowerCase().includes(encodeURIComponent(expected).toLowerCase());
}

// Explicit event-link publishability. verification_status is retained as
// provenance metadata, but it is no longer a human-review gate. A stored
// destination may resolve when it passes the strict provider host/event-id
// validation below. Events without a destination fall back to the legacy
// human-verified provider flag. Keep in sync with eventLinkPublishable in
// functions/[[path]].js and public/app.js.
function eventLinkPublishable(event) {
  const destination = clean(event?.ticketmaster_url || event?.source_url, 2048);
  if (destination) return true;
  return event?.provider_links?.ticketmaster?.verified === true;
}

// Per-provider event publishability. Impact marketplace lanes require their
// own verified provenance; SeatGeek/Vivid retain their existing event-link
// fallback. Ticketmaster relies on its stored destination and the redirect
// validator. Keep in sync with providerEventPublishable in
// functions/[[path]].js and public/app.js.
function providerEventPublishable(event, provider) {
  // A cancelled or postponed show (stored Ticketmaster status) redirects
  // nowhere, so a hand-built showId URL cannot bypass the hold the page applies.
  if (eventLifecycleHeld(event)) return false;
  if (["ticketnetwork", "ticket-liquidator", "stubhub-international"].includes(provider)) {
    return event?.provider_links?.[provider]?.verified === true;
  }
  if (provider !== "ticketmaster" && event?.provider_links?.[provider]?.verified === true) return true;
  return eventLinkPublishable(event);
}

function validateTicketmasterEventUrl(event, providerConfig) {
  const candidates = [event?.ticketmaster_url, event?.source_url];
  const eventId = clean(event?.ticketmaster_event_id, 255);

  for (const candidate of candidates) {
    const redirect = validateConfiguredRedirect(providerConfig, candidate);
    if (!redirect) continue;
    if (!eventUrlContainsTicketmasterId(redirect, eventId)) continue;
    return redirect;
  }

  return null;
}

// SeatGeek event URLs must be pre-approved in event data. The SeatGeek API is
// intentionally not used in /api/out, so click-time redirects never run broad
// SeatGeek search or auto-publish candidate matches. Event-level SeatGeek
// destinations must be direct HTTPS SeatGeek URLs; no affiliate or HTTP
// fallback is accepted before Impact tracking is applied.
function validateSeatGeekEventUrl(seatGeekUrl, providerConfig) {
  const redirect = validateConfiguredRedirect(providerConfig, seatGeekUrl);
  if (!redirect || redirect.protocol !== "https:") return null;
  const host = redirect.hostname.toLowerCase();
  if (host !== "seatgeek.com" && host !== "www.seatgeek.com") return null;
  const path = decodeURIComponent(redirect.pathname || "/").replace(/\/+$/, "");
  if (!path || path === "/") return null;
  if (/^\/(search|venues?|performers?|artists?|concert-tickets|tickets)(?:\/|$)/i.test(path)) return null;
  if (!/\/(concert|sports|theater|theatre)\/\d+$/i.test(path)) return null;
  return redirect;
}

// Vivid Seats event URLs follow the same policy: pre-approved in event data,
// direct HTTPS vividseats.com production-page URLs only. The shape is
// conservative — /…/production/<id> — and rejects search/venue/performer/
// category pages and bare "…-tickets" root paths. Adjust only alongside the
// first owner-verified vividseats_url data (a too-strict validator fails safe).
function validateVividSeatsEventUrl(vividSeatsUrl, providerConfig) {
  const redirect = validateConfiguredRedirect(providerConfig, vividSeatsUrl);
  if (!redirect || redirect.protocol !== "https:") return null;
  const host = redirect.hostname.toLowerCase();
  if (host !== "vividseats.com" && host !== "www.vividseats.com") return null;
  const path = decodeURIComponent(redirect.pathname || "/").replace(/\/+$/, "");
  if (!path || path === "/") return null;
  if (/^\/(search|venues?|performers?|artists?|category|concerts?|sports?|theater|theatre)(?:\/|$)/i.test(path)) return null;
  if (!/\/production\/\d+$/i.test(path)) return null;
  return redirect;
}

// Impact Catalogs integrations use provider-specific host
// allowlists plus stored verified provenance. Their storefront path shapes can
// vary by market, so reject only bare/generic pages here; the sync script is
// responsible for exact artist/date/city/venue matching before the URL is
// written to event data.
function validateImpactMarketplaceEventUrl(value, providerConfig) {
  const redirect = validateConfiguredRedirect(providerConfig, value);
  if (!redirect || redirect.protocol !== "https:") return null;
  const path = decodeURIComponent(redirect.pathname || "/").replace(/\/+$/, "");
  if (!path || path === "/") return null;
  if (/^\/(search|home|about|help|support|faq|contact|terms|privacy)(?:\/|$)/i.test(path)) return null;
  return redirect;
}

// Funnel dimensions taken from the reviewed event record that the redirect has
// already resolved and validated. They are read from `events.json`, never from
// the request, so a click can never assert an event date, city or venue that
// the catalogue does not hold. The date is stored as the calendar day only —
// enough to segment near-term versus distant shows without turning the row into
// a precise behavioural timestamp of the visitor.
function eventFacts(event) {
  const iso = clean(event?.datetime_iso, 40);
  const eventDate = /^\d{4}-\d{2}-\d{2}/.test(iso) ? iso.slice(0, 10) : null;
  return {
    eventId: clean(event?.id, 120) || null,
    eventDate,
    eventCity: clean(event?.city, 120) || null,
    eventVenue: clean(event?.venue, 160) || null
  };
}

async function resolveShowLink(env, showId, provider) {
  const events = await loadEventsFromAssets(env);
  if (!events) return { ok: false, legitimate: false, status: "event_data_unavailable", httpStatus: 503 };

  const event = events.find((candidate) => clean(candidate?.id, 255) === showId);
  if (!event) return { ok: false, legitimate: false, status: "show_not_found" };
  if (!providerEventPublishable(event, provider)) return { ok: false, legitimate: true, status: "event_link_not_publishable" };
  const artistState = await artistRedirectState(env, event.artist_slug);
  if (!artistState.ok) return { ok: false, legitimate: artistState.status === "artist_demoted", status: artistState.status, httpStatus: artistState.httpStatus };

  if (provider === "ticketmaster") {
    const providerConfig = PROVIDERS.ticketmaster;
    const redirect = validateTicketmasterEventUrl(event, providerConfig);
    if (!redirect) return { ok: false, legitimate: true, status: "event_ticket_url_unavailable" };

    return {
      ok: true,
      link: {
        artistSlug: slugify(event.artist_slug),
        provider: "ticketmaster",
        linkId: clean(event.id, 255),
        showId: clean(event.id, 255),
        redirectUrl: redirect.toString(),
        verified: true,
        ...eventFacts(event)
      },
      redirect
    };
  }

  if (provider === "seatgeek") {
    const providerConfig = PROVIDERS.seatgeek;
    const seatGeekUrl = clean(event?.seatgeek_url, 2048);
    const redirect = validateSeatGeekEventUrl(seatGeekUrl, providerConfig);
    if (!redirect) return { ok: false, legitimate: true, status: "event_ticket_url_unavailable" };

    return {
      ok: true,
      link: {
        artistSlug: slugify(event.artist_slug),
        provider: "seatgeek",
        linkId: clean(event.id, 255),
        showId: clean(event.id, 255),
        redirectUrl: redirect.toString(),
        verified: true,
        ...eventFacts(event)
      },
      redirect
    };
  }

  if (provider === "vivid-seats") {
    const providerConfig = PROVIDERS["vivid-seats"];
    const vividSeatsUrl = clean(event?.vividseats_url, 2048);
    const redirect = validateVividSeatsEventUrl(vividSeatsUrl, providerConfig);
    if (!redirect) return { ok: false, legitimate: true, status: "event_ticket_url_unavailable" };

    return {
      ok: true,
      link: {
        artistSlug: slugify(event.artist_slug),
        provider: "vivid-seats",
        linkId: clean(event.id, 255),
        showId: clean(event.id, 255),
        redirectUrl: redirect.toString(),
        verified: true,
        ...eventFacts(event)
      },
      redirect
    };
  }

  const impactMarketplaceConfig = PROVIDERS[provider];
  if (impactMarketplaceConfig?.urlField) {
    const storedUrl = clean(event?.[impactMarketplaceConfig.urlField], 2048);
    const redirect = validateImpactMarketplaceEventUrl(storedUrl, impactMarketplaceConfig);
    if (!redirect) return { ok: false, legitimate: true, status: "event_ticket_url_unavailable" };
    return {
      ok: true,
      link: {
        artistSlug: slugify(event.artist_slug),
        provider,
        linkId: clean(event.id, 255),
        showId: clean(event.id, 255),
        redirectUrl: redirect.toString(),
        verified: true,
        ...eventFacts(event)
      },
      redirect
    };
  }

  return { ok: false, legitimate: true, status: "provider_not_configured" };
}


const BASE_TRACKING_URL_ENV_VARS = {
  seatgeek: "IMPACT_SEATGEEK_BASE_TRACKING_URL",
  "vivid-seats": "IMPACT_VIVIDSEATS_BASE_TRACKING_URL",
  ticketnetwork: "IMPACT_TICKETNETWORK_BASE_TRACKING_URL",
  "ticket-liquidator": "IMPACT_TICKETLIQUIDATOR_BASE_TRACKING_URL",
  "stubhub-international": "IMPACT_STUBHUB_INTERNATIONAL_BASE_TRACKING_URL"
};

const IMPACT_PROVIDER_ENV_PREFIXES = {
  ticketnetwork: "IMPACT_TICKETNETWORK",
  "ticket-liquidator": "IMPACT_TICKETLIQUIDATOR",
  "stubhub-international": "IMPACT_STUBHUB_INTERNATIONAL"
};

const IMPACT_PROVIDER_DEFAULT_PROGRAM_IDS = {
  ticketnetwork: "2322",
  "ticket-liquidator": "2085",
  "stubhub-international": "24092"
};

function baseTrackingUrlFor(env = {}, provider) {
  const envVar = BASE_TRACKING_URL_ENV_VARS[providerKey(provider)];
  return envVar ? clean(env?.[envVar], 2048) : "";
}

function hasBaseTrackingUrl(env = {}, provider) {
  return Boolean(baseTrackingUrlFor(env, provider));
}

function validateImpactPxfBaseTrackingUrl(value, provider) {
  const raw = clean(value, 2048);
  if (!raw || isPlaceholderUrl(raw)) {
    return { ok: false, status: "impact_base_tracking_url_invalid" };
  }

  let parsed;
  try {
    parsed = new URL(raw);
  } catch (error) {
    return { ok: false, status: "impact_base_tracking_url_invalid" };
  }

  if (parsed.protocol !== "https:" || isUnsafeHost(parsed.hostname)) {
    return { ok: false, status: "impact_base_tracking_url_unsafe" };
  }

  const allowedHosts = [...IMPACT_PXF_TRACKING_HOSTS, ...(IMPACT_PROVIDER_TRACKING_HOSTS[providerKey(provider)] || [])];
  if (!hostnameAllowed(parsed.hostname, allowedHosts)) {
    return { ok: false, status: "impact_base_tracking_url_host_not_allowed" };
  }

  return { ok: true, url: parsed };
}

// Optional SubId passthrough for affiliate reconciliation, **default off**.
//
// Impact tracking links can carry a publisher-supplied SubId that comes back on
// the click and action rows in Impact's reporting, which is what turns "we
// recorded 40 SeatGeek clicks" into "these 40 rows are the same 40 rows Impact
// shows". Enabling it changes a live affiliate URL, so it stays behind an
// explicit flag and the parameter name is configurable — the owner confirms the
// expected name with Impact, sets it, and verifies one click end to end before
// relying on it. See docs/COMMERCIAL_FUNNEL.md.
//
// Applies only to the pxf.io base-tracking path. The Impact API TrackingLinks
// path builds its link server-side from Type/DeepLink and is not covered.
function outboundClickIdParam(env = {}) {
  if (String(env?.OUT_CLICK_ID_SUBID_ENABLED || "").trim().toLowerCase() !== "true") return "";
  const configured = clean(env?.OUT_CLICK_ID_SUBID_PARAM, 40) || "subId1";
  return /^[A-Za-z][A-Za-z0-9_]{0,39}$/.test(configured) ? configured : "";
}

// Wraps a pre-validated provider destination with the provider's configured
// pxf.io base tracking URL. `validateDestination` re-validates the destination
// with the caller's context (event-shape validator on the showId path;
// validateConfiguredRedirect for hand-verified artist-level entries).
function buildBaseTrackingRedirect(env, provider, destination, validateDestination, clickId = "") {
  const configuredBase = baseTrackingUrlFor(env, provider);
  if (!configuredBase) return { ok: false, status: "impact_base_tracking_url_missing" };

  const base = validateImpactPxfBaseTrackingUrl(configuredBase, provider);
  if (!base.ok) return base;

  const destinationUrl = validateDestination(destination);
  if (!destinationUrl) {
    return { ok: false, status: "event_ticket_url_unavailable" };
  }

  const outbound = new URL(base.url.toString());
  outbound.searchParams.set("u", destinationUrl.toString());
  const clickIdParam = outboundClickIdParam(env);
  const reconciliationIdPropagated = Boolean(clickIdParam && isValidClickId(clickId));
  if (reconciliationIdPropagated) outbound.searchParams.set(clickIdParam, clickId);
  return { ok: true, trackingUrl: outbound.toString(), reconciliationIdPropagated };
}

function impactConfig(env = {}, provider = "ticketmaster") {
  const normalizedProvider = providerKey(provider || "ticketmaster");
  const apiBase = clean(env?.IMPACT_API_BASE_URL || DEFAULT_IMPACT_API_BASE, 2048).replace(/\/+$/, "");

  if (normalizedProvider === "seatgeek") {
    // The SeatGeek publisher account is the sole approved Impact credential
    // set for every active affiliate provider. Never fall back to the retired
    // Ticketmaster IMPACT_* pair.
    const accountSid = clean(env?.IMPACT_SEATGEEK_ACCOUNT_SID, 255);
    const authToken = clean(env?.IMPACT_SEATGEEK_AUTH_TOKEN, 255);
    const campaignId = clean(env?.IMPACT_SEATGEEK_CAMPAIGN_ID, 120);
    const legacyProgramId = clean(env?.IMPACT_SEATGEEK_PROGRAM_ID, 120);
    const programId = campaignId || legacyProgramId;
    return {
      accountSid,
      authToken,
      programId,
      campaignId,
      legacyProgramId,
      programIdSource: campaignId ? "IMPACT_SEATGEEK_CAMPAIGN_ID" : legacyProgramId ? "IMPACT_SEATGEEK_PROGRAM_ID" : "",
      apiBase,
      provider: normalizedProvider,
      hasCredentials: Boolean(accountSid && authToken),
      hasProgramId: Boolean(programId),
      hasCampaignId: Boolean(campaignId),
      configured: Boolean(accountSid && authToken && programId)
    };
  }

  if (normalizedProvider === "vivid-seats") {
    // Vivid Seats uses the same approved SeatGeek publisher credentials.
    const accountSid = clean(env?.IMPACT_SEATGEEK_ACCOUNT_SID, 255);
    const authToken = clean(env?.IMPACT_SEATGEEK_AUTH_TOKEN, 255);
    const campaignId = clean(env?.IMPACT_VIVIDSEATS_CAMPAIGN_ID, 120);
    const legacyProgramId = clean(env?.IMPACT_VIVIDSEATS_PROGRAM_ID, 120);
    const programId = campaignId || legacyProgramId;
    return {
      accountSid,
      authToken,
      programId,
      campaignId,
      legacyProgramId,
      programIdSource: campaignId ? "IMPACT_VIVIDSEATS_CAMPAIGN_ID" : legacyProgramId ? "IMPACT_VIVIDSEATS_PROGRAM_ID" : "",
      apiBase,
      provider: normalizedProvider,
      hasCredentials: Boolean(accountSid && authToken),
      hasProgramId: Boolean(programId),
      hasCampaignId: Boolean(campaignId),
      configured: Boolean(accountSid && authToken && programId)
    };
  }

  const envPrefix = IMPACT_PROVIDER_ENV_PREFIXES[normalizedProvider];
  if (envPrefix) {
    const accountSid = clean(env?.IMPACT_SEATGEEK_ACCOUNT_SID, 255);
    const authToken = clean(env?.IMPACT_SEATGEEK_AUTH_TOKEN, 255);
    const configuredCampaignId = clean(env?.[`${envPrefix}_CAMPAIGN_ID`], 120);
    const legacyProgramId = clean(env?.[`${envPrefix}_PROGRAM_ID`], 120);
    const defaultProgramId = clean(IMPACT_PROVIDER_DEFAULT_PROGRAM_IDS[normalizedProvider], 120);
    const campaignId = configuredCampaignId || defaultProgramId;
    const programId = configuredCampaignId || legacyProgramId || defaultProgramId;
    return {
      accountSid, authToken, programId, campaignId, legacyProgramId,
      programIdSource: configuredCampaignId
        ? `${envPrefix}_CAMPAIGN_ID`
        : legacyProgramId
          ? `${envPrefix}_PROGRAM_ID`
          : "impact_catalog_campaign",
      apiBase, provider: normalizedProvider,
      hasCredentials: Boolean(accountSid && authToken),
      hasProgramId: Boolean(programId),
      hasCampaignId: Boolean(campaignId),
      configured: Boolean(accountSid && authToken && programId)
    };
  }

  // Ticketmaster has no Impact program (the site was removed from the
  // Ticketmaster affiliate programme). Ticketmaster redirects are plain,
  // unmonetized links and never call the Impact API.
  return {
    accountSid: "",
    authToken: "",
    programId: "",
    campaignId: "",
    legacyProgramId: "",
    programIdSource: "",
    apiBase,
    provider: normalizedProvider,
    hasCredentials: false,
    hasProgramId: false,
    hasCampaignId: false,
    configured: false
  };
}

function impactEndpointDiagnostics(config, deepLink) {
  const parsedDeepLink = safeUrl(deepLink);
  return {
    endpointPathShape: "/Mediapartners/{AccountSID}/Programs/{ProgramId}/TrackingLinks",
    endpointResource: "Programs",
    identifierType: "ProgramId",
    identifierConfiguredAs: config.programIdSource || "",
    requestMethod: "POST",
    parameterLocation: "query_string",
    requestFields: ["Type", "DeepLink"],
    trackingLinkType: "Regular",
    deepLinkHost: parsedDeepLink ? parsedDeepLink.hostname.toLowerCase() : "",
    deepLinkEncoding: "URLSearchParams"
  };
}

function safeImpactDiagnosticConfig(config) {
  return {
    provider: config.provider || "",
    hasCredentials: Boolean(config.hasCredentials),
    hasProgramId: Boolean(config.hasProgramId),
    hasCampaignId: Boolean(config.hasCampaignId),
    programIdSource: config.programIdSource || "",
    configured: Boolean(config.configured)
  };
}

const IMPACT_WRAPPED_PROVIDERS = new Set([
  "seatgeek", "vivid-seats", "ticketnetwork", "ticket-liquidator", "stubhub-international"
]);

function impactRequestStatus(statusCode, provider = "ticketmaster") {
  if (Number(statusCode) === 404 && IMPACT_WRAPPED_PROVIDERS.has(providerKey(provider))) {
    return "impact_tracking_endpoint_not_found";
  }
  if (Number(statusCode) === 403 && IMPACT_WRAPPED_PROVIDERS.has(providerKey(provider))) {
    return "impact_program_not_accessible";
  }
  return "impact_request_failed";
}

function safeImpactMessageFromPayload(payload, secrets = []) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return "";
  const raw = clean(payload.Message || payload.message || payload.Error || payload.error || payload.Status || payload.status, 180);
  if (!raw || !/^[\w\s.,:;!?()\-/]+$/.test(raw)) return "";
  const lower = raw.toLowerCase();
  if (secrets.some((secret) => secret && lower.includes(String(secret).toLowerCase()))) return "";
  return raw;
}

async function safeImpactResponseDiagnostics(response, config, deepLink) {
  const diagnostics = {};
  let payload = null;
  try {
    const contentType = clean(response.headers.get("content-type"), 120).toLowerCase();
    if (contentType.includes("application/json")) {
      payload = await response.clone().json();
    }
  } catch (error) {
    payload = null;
  }

  const fieldNames = safeFieldNames(payload);
  if (fieldNames.length > 0) diagnostics.impactResponseFieldNames = fieldNames;
  const safeMessage = safeImpactMessageFromPayload(payload, [
    config.accountSid,
    config.authToken,
    config.programId,
    deepLink
  ]);
  if (safeMessage) diagnostics.impactResponseMessage = safeMessage;
  return diagnostics;
}

function buildImpactTrackingEndpoint(config, deepLink) {
  const verifiedDeepLink = safeUrl(deepLink);
  const apiBase = safeUrl(config.apiBase);
  if (!verifiedDeepLink || !apiBase) return null;

  const params = new URLSearchParams({
    Type: "Regular",
    DeepLink: verifiedDeepLink.toString()
  });
  return `${apiBase.toString().replace(/\/+$/, "")}/Mediapartners/${encodeURIComponent(
    config.accountSid
  )}/Programs/${encodeURIComponent(config.programId)}/TrackingLinks?${params.toString()}`;
}

function buildImpactCampaignEndpoint(config) {
  const apiBase = safeUrl(config.apiBase);
  if (!apiBase || !config.accountSid || !config.programId) return null;
  return `${apiBase.toString().replace(/\/+$/, "")}/Mediapartners/${encodeURIComponent(
    config.accountSid
  )}/Campaigns/${encodeURIComponent(config.programId)}`;
}

function impactProgramStatus(statusCode) {
  if (Number(statusCode) === 404) return "impact_program_not_found";
  if (Number(statusCode) === 403) return "impact_program_not_accessible";
  return "impact_program_lookup_failed";
}

async function inspectImpactProgram(env, provider = "seatgeek") {
  const config = impactConfig(env, provider);
  if (!config.hasCredentials) {
    return { ok: false, status: "impact_missing_credentials", config: safeImpactDiagnosticConfig(config) };
  }
  if (!config.hasProgramId) {
    return { ok: false, status: "impact_missing_program_id", config: safeImpactDiagnosticConfig(config) };
  }

  const endpoint = buildImpactCampaignEndpoint(config);
  if (!endpoint) {
    return { ok: false, status: "impact_tracking_url_failed_safety_check", config: safeImpactDiagnosticConfig(config) };
  }

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: basicAuthHeader(config.accountSid, config.authToken)
      }
    });
    if (!response.ok) {
      return {
        ok: false,
        status: impactProgramStatus(response.status),
        impactStatusCode: response.status,
        config: safeImpactDiagnosticConfig(config)
      };
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch (error) {
      return {
        ok: false,
        status: "impact_response_parse_failed",
        impactStatusCode: response.status,
        config: safeImpactDiagnosticConfig(config)
      };
    }
    const domains = payload?.DeeplinkDomains?.DeeplinkDomain || payload?.DeeplinkDomains || [];
    const domainList = Array.isArray(domains) ? domains : [domains].filter(Boolean);
    return {
      ok: true,
      status: "impact_program_found",
      impactStatusCode: response.status,
      config: safeImpactDiagnosticConfig(config),
      program: {
        campaignIdPresent: Boolean(payload?.CampaignId),
        contractStatus: clean(payload?.ContractStatus, 60),
        allowsDeeplinking: String(payload?.AllowsDeeplinking || "").toLowerCase() === "true",
        trackingLinkPresent: Boolean(clean(payload?.TrackingLink, 2048)),
        deeplinkDomainsIncludeDestinationHost: domainList.some((domain) =>
          hostnameAllowed(String(domain).toLowerCase(), PROVIDERS[providerKey(provider)]?.allowedDestinationHosts || [])
        )
      },
      impactResponseFieldNames: safeFieldNames(payload)
    };
  } catch (error) {
    return { ok: false, status: "impact_program_lookup_failed", config: safeImpactDiagnosticConfig(config) };
  }
}

function basicAuthHeader(accountSid, authToken) {
  const raw = `${accountSid}:${authToken}`;
  const encoded = typeof btoa === "function"
    ? btoa(raw)
    : Buffer.from(raw, "utf8").toString("base64");
  return `Basic ${encoded}`;
}

function validateImpactTrackingUrl(value, provider = "") {
  const parsed = safeUrl(value);
  const providerConfig = PROVIDERS[providerKey(provider)];
  const isReviewedTrackingHost = isAffiliateTrackingHost(parsed?.hostname);
  const isReviewedProviderHost = Boolean(
    parsed && providerConfig && hostnameAllowed(parsed.hostname, providerConfig.allowedDestinationHosts)
  );
  // Impact can return a branded provider-domain tracking URL. It is accepted
  // only for the provider whose verified deep link was submitted.
  if (!parsed || (!isReviewedTrackingHost && !isReviewedProviderHost)) return null;
  return parsed;
}

function safeFieldNames(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return [];
  return Object.keys(payload)
    .filter((key) => /^[A-Za-z0-9_-]{1,64}$/.test(key))
    .slice(0, 20);
}

function extractImpactTrackingUrl(payload) {
  if (!payload || typeof payload !== "object") return "";
  return clean(
    payload.TrackingURL ||
    payload.TrackingUrl ||
    payload.trackingUrl ||
    payload.tracking_url,
    2048
  );
}

async function createImpactTrackingUrlResult(env, deepLink, provider = "ticketmaster") {
  const normalizedProvider = providerKey(provider || "ticketmaster");
  const config = impactConfig(env, normalizedProvider);
  const endpointDiagnostics = impactEndpointDiagnostics(config, deepLink);
  if (!config.hasCredentials) {
    return {
      ok: false,
      status: "impact_missing_credentials",
      hasProgramId: config.hasProgramId,
      hasCampaignId: config.hasCampaignId,
      impactConfigPresent: false,
      endpointDiagnostics
    };
  }
  if (!config.hasProgramId) {
    return {
      ok: false,
      status: "impact_missing_program_id",
      hasProgramId: false,
      hasCampaignId: config.hasCampaignId,
      impactConfigPresent: false,
      endpointDiagnostics
    };
  }

  const endpoint = buildImpactTrackingEndpoint(config, deepLink);
  if (!endpoint) {
    return {
      ok: false,
      status: "impact_tracking_url_failed_safety_check",
      hasProgramId: config.hasProgramId,
      hasCampaignId: config.hasCampaignId,
      impactConfigPresent: config.configured,
      endpointDiagnostics
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: basicAuthHeader(config.accountSid, config.authToken)
      }
    });
    if (!response.ok) {
      return {
        ok: false,
        status: impactRequestStatus(response.status, normalizedProvider),
        hasProgramId: config.hasProgramId,
        hasCampaignId: config.hasCampaignId,
        impactConfigPresent: config.configured,
        impactStatusCode: response.status,
        endpointDiagnostics,
        ...(await safeImpactResponseDiagnostics(response, config, deepLink))
      };
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch (error) {
      return {
        ok: false,
        status: "impact_response_parse_failed",
        hasProgramId: config.hasProgramId,
        hasCampaignId: config.hasCampaignId,
        impactConfigPresent: config.configured,
        impactStatusCode: response.status,
        endpointDiagnostics
      };
    }
    const impactResponseFieldNames = safeFieldNames(payload);
    const rawTrackingUrl = extractImpactTrackingUrl(payload);
    if (!rawTrackingUrl) {
      return {
        ok: false,
        status: "impact_response_missing_tracking_url",
        hasProgramId: config.hasProgramId,
        hasCampaignId: config.hasCampaignId,
        impactConfigPresent: config.configured,
        impactStatusCode: response.status,
        impactResponseFieldNames,
        endpointDiagnostics
      };
    }
    const trackingUrl = validateImpactTrackingUrl(rawTrackingUrl, normalizedProvider);
    if (!trackingUrl) {
      return {
        ok: false,
        status: "impact_tracking_url_failed_safety_check",
        hasProgramId: config.hasProgramId,
        hasCampaignId: config.hasCampaignId,
        impactConfigPresent: config.configured,
        impactStatusCode: response.status,
        impactResponseFieldNames,
        endpointDiagnostics
      };
    }
    return {
      ok: true,
      trackingUrl: trackingUrl.toString(),
      reconciliationIdPropagated: false,
      endpointDiagnostics,
      impactStatusCode: response.status
    };
  } catch (error) {
    return {
      ok: false,
      status: "impact_request_failed",
      hasProgramId: config.hasProgramId,
      hasCampaignId: config.hasCampaignId,
      impactConfigPresent: config.configured,
      endpointDiagnostics
    };
  }
}

async function readBody(request) {
  if (request.method !== "POST") return {};
  try {
    return await request.json();
  } catch (error) {
    return {};
  }
}

// Anonymous visitor key, computed exactly as functions/api/analytics.js does so
// an outbound click can be joined to the page views of the same visit. The IP
// address and user agent are hashed together and discarded — no complete IP is
// stored, and the digest is not reversible to one.
async function hashRequestKey(request) {
  try {
    const ip = clean(request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for"), 120);
    const ua = clean(request.headers.get("user-agent"), 255);
    const bytes = new TextEncoder().encode(`${ip}|${ua}`);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  } catch (error) {
    return null;
  }
}

// Browser-controlled signals for a top-level user navigation. They qualify only
// the analytics receipt: valid redirects must keep working for every compatible
// request, including headerless browsers and link checkers. Sec-Fetch-* headers
// cannot be set by page scripts, so they exclude the automated direct /api/out
// hits without pretending to prove that a person clicked the CTA.
//
// `Sec-Fetch-User: ?1` alone is not enough: iOS Safari omits it when a CTA
// opens in a new tab, and after fetch_user_v1 shipped no iPhone receipt was
// recorded while redirects kept working. A same-origin navigation (the CTA's
// own `Sec-Fetch-Site`/`Sec-Fetch-Mode`) qualifies as well; a direct hit
// arrives as `none` or with no Sec-Fetch headers at all.
function hasUserNavigationSignal(request) {
  if (request?.method !== "GET") return false;
  const headers = request.headers;
  if (headers.get("sec-fetch-user") === "?1") return true;
  return headers.get("sec-fetch-site") === "same-origin" && headers.get("sec-fetch-mode") === "navigate";
}

// Keep this marker in metadata rather than adding a D1 column: it makes the
// post-deployment measurement population explicit without a schema migration.
// Funnel reports must select it so old, unqualified rows are never blended
// into this population during a rolling date window. v1 rows required
// Sec-Fetch-User; v2 also accepts a same-origin navigation (see above).
const RECEIPT_QUALIFICATION = "user_navigation_v2";

// The authoritative qualified outbound-click record. Every monetized and
// unmonetized CTA on the site navigates through here, so this row — not the
// client beacon — is what the commercial funnel counts. `provider_click` is
// the client's statement of intent; `outbound_click` is the server's record
// that a qualified redirect was actually issued. See docs/COMMERCIAL_FUNNEL.md.
async function trackClick({ request, env, link, sourcePath, destinationHost, ctaLocation, clickId, impactTracked = false, impactReconciliationEligible = false, outcome = "redirected", status = null }) {
  const db = getDemandDb(env);
  if (!db || !hasUserNavigationSignal(request)) return;
  // Self-identifying crawlers follow every affiliate link on the page, which
  // inflated outbound_click far above real demand. Skip the analytics write for
  // them; the redirect itself is untouched and still resolves normally.
  if (isLikelyBot(request.headers.get("user-agent"))) return;
  const now = new Date().toISOString();
  const path = normalizeAnalyticsPath(sourcePath);
  const pageType = classifyPageType(path);
  const normalizedCtaLocation = normalizeCtaLocation(ctaLocation);
  const destinationCategory = destinationHost
    ? (impactTracked ? "affiliate_network" : classifyDestination(destinationHost))
    : "unknown";
  // Affiliate status is read from where the redirect actually went, not from the
  // provider's lane. The Impact API tracking path is not host-restricted, so a
  // response resolving to a direct provider URL would otherwise be counted in
  // the affiliate share while `destination_category` correctly said
  // provider_direct. A blocked click has no destination, so it falls back to the
  // lane the visitor was trying to use. Redirect behaviour is unchanged — this
  // only decides what the row records.
  const isAffiliate = destinationCategory === "unknown"
    ? (isAffiliateProvider(link.provider) ? 1 : 0)
    : (destinationCategory === "affiliate_network" ? 1 : 0);
  const userAgent = clean(request.headers.get("user-agent"), 255) || null;
  const metadata = JSON.stringify({
    browserIntentId: browserIntentIdFromRequest(request) || undefined,
    provider: link.provider,
    artistSlug: link.artistSlug,
    showId: link.showId || null,
    sourcePath: path,
    destinationHost,
    linkId: link.linkId,
    pageType,
    ctaLocation: normalizedCtaLocation || undefined,
    guideSlug: link.guideSlug || undefined,
    position: link.position || undefined,
    outcome,
    status: status || undefined,
    receiptQualification: RECEIPT_QUALIFICATION,
    navigation: describeNavigation(request)
  });

  await insertAnalyticsRow(db, {
    created_at: now,
    event_name: outcome === "redirected" ? "outbound_click" : "outbound_blocked",
    source_path: path,
    artist_slug: link.artistSlug || null,
    email: null,
    request_key: await hashRequestKey(request),
    // Not an acquisition source: under the site's same-origin referrer policy
    // the Referer on this hop is one of our own pages, and that page is already
    // recorded as source_path.
    referrer: null,
    user_agent: userAgent,
    metadata_json: metadata,
    provider: link.provider || null,
    tour_slug: null,
    destination_host: destinationHost || null,
    link_id: link.linkId || null,
    page_type: pageType,
    landing_path: null,
    event_id: link.eventId || link.showId || null,
    event_date: link.eventDate || null,
    event_city: link.eventCity || null,
    event_venue: link.eventVenue || null,
    cta_location: normalizedCtaLocation,
    destination_category: destinationCategory,
    is_affiliate: isAffiliate,
    device_category: classifyDeviceCategory(userAgent),
    acquisition_source: null,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    click_id: clickId || null,
    impact_reconciliation_eligible: impactReconciliationEligible ? 1 : 0
  });
}

// Server receipt for a legitimate request entering the outbound funnel. This
// is distinct from `outbound_click`, which means a 3xx was actually issued.
// The same opaque click ID joins this row to exactly one terminal outcome.
async function trackOutboundAttempt({ request, env, link, sourcePath, ctaLocation, clickId }) {
  const db = getDemandDb(env);
  if (!db || !hasUserNavigationSignal(request) || isLikelyBot(request.headers.get("user-agent"))) return;
  const path = normalizeAnalyticsPath(sourcePath);
  const pageType = classifyPageType(path);
  const userAgent = clean(request.headers.get("user-agent"), 255) || null;
  await insertAnalyticsRow(db, {
    created_at: new Date().toISOString(),
    event_name: "outbound_attempt",
    source_path: path,
    artist_slug: link.artistSlug || null,
    email: null,
    request_key: await hashRequestKey(request),
    referrer: null,
    user_agent: userAgent,
    metadata_json: JSON.stringify({
      provider: link.provider,
      showId: link.showId || null,
      linkId: link.linkId || null,
      pageType,
      ctaLocation: normalizeCtaLocation(ctaLocation) || undefined,
      guideSlug: link.guideSlug || undefined,
      position: link.position || undefined,
      outcome: "attempted",
      receiptQualification: RECEIPT_QUALIFICATION,
      navigation: describeNavigation(request)
    }),
    provider: link.provider || null,
    tour_slug: null,
    destination_host: null,
    link_id: link.linkId || null,
    page_type: pageType,
    landing_path: null,
    event_id: link.eventId || link.showId || null,
    event_date: link.eventDate || null,
    event_city: link.eventCity || null,
    event_venue: link.eventVenue || null,
    cta_location: normalizeCtaLocation(ctaLocation),
    destination_category: "unknown",
    is_affiliate: isAffiliateProvider(link.provider) ? 1 : 0,
    device_category: classifyDeviceCategory(userAgent),
    acquisition_source: null,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    click_id: clickId || null,
    impact_reconciliation_eligible: 0
  });
}

// A CTA the visitor clicked that did not produce a redirect — an Impact
// tracking failure, a provider switched off, or a destination that no longer
// validates. Without this the funnel silently loses the click and the lane
// looks merely unpopular rather than broken. Deliberately limited to provider
// and configuration failures: malformed or probing requests are not demand
// signal and are not recorded.
const TRACKED_BLOCK_STATUSES = new Set([
  "provider_not_configured",
  "configured_redirect_rejected",
  "event_ticket_url_unavailable",
  "event_link_not_publishable",
  "event_data_unavailable",
  "impact_missing_credentials",
  "impact_missing_program_id",
  "impact_request_failed",
  "impact_response_parse_failed",
  "impact_response_missing_tracking_url",
  "impact_tracking_url_unsafe",
  "impact_tracking_url_failed_safety_check",
  "impact_tracking_endpoint_not_found",
  "impact_program_not_accessible",
  "impact_base_tracking_url_missing",
  "impact_base_tracking_url_invalid",
  "impact_base_tracking_url_unsafe",
  "impact_base_tracking_url_host_not_allowed"
]);

async function trackBlockedClick({ request, env, link, sourcePath, ctaLocation, clickId = null, status }) {
  if (!TRACKED_BLOCK_STATUSES.has(String(status || ""))) return;
  await trackClick({
    request,
    env,
    link,
    sourcePath,
    destinationHost: null,
    ctaLocation,
    clickId,
    outcome: "blocked",
    status
  });
}


function impactFailureStatus(status) {
  if (status === "impact_tracking_url_failed_safety_check") return "impact_tracking_url_unsafe";
  return status || "impact_request_failed";
}

function impactFailurePayload(provider, resolved, result, config) {
  const payload = {
    ok: false,
    status: impactFailureStatus(result.status),
    provider,
    hasDestination: true,
    destinationHost: resolved.redirect.hostname.toLowerCase(),
    impactConfigPresent: Boolean(config.configured),
    hasProgramId: Boolean(result.hasProgramId ?? config.hasProgramId),
    hasCampaignId: Boolean(result.hasCampaignId ?? config.hasCampaignId),
    programIdSource: config.programIdSource || "",
    outVersion: OUT_VERSION_HEADER
  };

  if (Number.isInteger(result.impactStatusCode)) {
    payload.impactStatusCode = result.impactStatusCode;
  }
  if (Array.isArray(result.impactResponseFieldNames)) {
    payload.impactResponseFieldNames = result.impactResponseFieldNames;
  }
  if (result.impactResponseMessage) {
    payload.impactResponseMessage = result.impactResponseMessage;
  }
  if (result.endpointDiagnostics) {
    payload.impactEndpoint = result.endpointDiagnostics;
  }

  return payload;
}

async function handleOut(request, env, mode) {
  const url = new URL(request.url);
  const body = await readBody(request);
  const showId = clean(body.showId || url.searchParams.get("showId"), 255);
  const artistSlug = slugify(body.artistSlug || url.searchParams.get("artistSlug"));
  const provider = providerKey(body.provider || url.searchParams.get("provider") || "ticketmaster");
  // The page the click came from. An explicit parameter wins; the Referer is
  // the fallback and is reduced to a path (the site's same-origin referrer
  // policy means this header is one of our own pages and is never sent to a
  // third party). Recorded as a path only — no origin, no query string.
  const sourcePath = normalizeAnalyticsPath(
    body.sourcePath || url.searchParams.get("sourcePath") || request.headers.get("referer") || "/"
  );
  // Which CTA component was clicked. `surface` is the existing artist-level
  // parameter name; both are validated against the fixed CTA_LOCATIONS list, so
  // an arbitrary query value is discarded rather than stored.
  const ctaLocation = normalizeCtaLocation(
    body.ctaLocation || url.searchParams.get("ctaLocation") || url.searchParams.get("surface")
  );
  const rawGuideSlug = clean(body.guideSlug || url.searchParams.get("guideSlug"), 120);
  const requestedPosition = Number(body.position || url.searchParams.get("position"));
  const guideSlug =
    ctaLocation === "guide_provider_pair" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(rawGuideSlug)
      ? rawGuideSlug
      : null;
  const position =
    ctaLocation === "guide_provider_pair" && Number.isInteger(requestedPosition) && requestedPosition >= 1 && requestedPosition <= 8
      ? requestedPosition
      : null;
  const requestedDestination = clean(body.destinationUrl || body.deepLink || url.searchParams.get("destinationUrl") || url.searchParams.get("deepLink"), 2048);
  const clickId = createClickId();

  const providerConfig = PROVIDERS[provider];
  if (!providerConfig) return json({ ok: false, status: "unknown_provider" }, 400);
  if (!showId && !artistSlug) return json({ ok: false, status: "missing_artist_slug" }, 400);

  if (showId) {
    // showId mode is intentionally controlled: resolve the stored event URL
    // first, then wrap it with Impact for affiliate providers (SeatGeek).
    // Ticketmaster event redirects are plain, unmonetized links. Do not use
    // user deep links or provider discovery/search fallbacks for an event click.
    const resolved = await resolveShowLink(env, showId, provider);
    if (!resolved.ok) {
      if (resolved.legitimate) {
        const link = { provider, artistSlug: artistSlug || null, linkId: showId, showId, guideSlug, position };
        await trackOutboundAttempt({ request, env, link, sourcePath, ctaLocation, clickId });
        await trackBlockedClick({ request, env, link, sourcePath, ctaLocation, clickId, status: resolved.status });
      }
      return json({ ok: false, status: resolved.status }, resolved.httpStatus || 400);
    }
    resolved.link.guideSlug = guideSlug;
    resolved.link.position = position;

    await trackOutboundAttempt({ request, env, link: resolved.link, sourcePath, ctaLocation, clickId });
    if (providerConfig.publicEnabledEnv && !impactMarketplacePublicEnabled(env, provider)) {
      await trackBlockedClick({
        request,
        env,
        link: resolved.link,
        sourcePath,
        ctaLocation,
        clickId,
        status: "provider_not_configured"
      });
      return json({ ok: false, status: "provider_not_configured" }, 400);
    }

    if (IMPACT_WRAPPED_PROVIDERS.has(provider)) {
      // SeatGeek / Vivid Seats showId redirects are event URL-first. The
      // destination was read from the stored event field and validated as a
      // direct HTTPS provider URL by resolveShowLink before any Impact call.
      // There is intentionally no provider API search or broad fallback in
      // this path, and no raw-URL fallback: an Impact failure returns a
      // diagnostic JSON, never an untracked redirect.
      const destination = resolved.redirect.toString();
      const providerImpactConfig = impactConfig(env, provider);
      const validateEventDestination = provider === "seatgeek"
        ? (value) => validateSeatGeekEventUrl(value, PROVIDERS.seatgeek)
        : provider === "vivid-seats"
          ? (value) => validateVividSeatsEventUrl(value, PROVIDERS["vivid-seats"])
          : (value) => validateImpactMarketplaceEventUrl(value, providerConfig);
      let impactTrackingResult = null;

      if (hasBaseTrackingUrl(env, provider)) {
        impactTrackingResult = buildBaseTrackingRedirect(env, provider, destination, validateEventDestination, clickId);
      } else {
        impactTrackingResult = await createImpactTrackingUrlResult(env, destination, provider);
      }

      if (!impactTrackingResult.ok) {
        await trackBlockedClick({ request, env, link: resolved.link, sourcePath, ctaLocation, clickId, status: impactTrackingResult.status });
        return json(impactFailurePayload(provider, resolved, impactTrackingResult, providerImpactConfig), 400);
      }

      const outbound = safeUrl(impactTrackingResult.trackingUrl);
      if (!outbound) {
        await trackBlockedClick({ request, env, link: resolved.link, sourcePath, ctaLocation, clickId, status: "impact_tracking_url_failed_safety_check" });
        return json(impactFailurePayload(provider, resolved, {
          ok: false,
          status: "impact_tracking_url_failed_safety_check",
          hasProgramId: providerImpactConfig.hasProgramId,
          impactConfigPresent: providerImpactConfig.configured
        }, providerImpactConfig), 400);
      }

      await trackClick({
        request,
        env,
        link: resolved.link,
        sourcePath,
        destinationHost: outbound.hostname.toLowerCase(),
        ctaLocation,
        clickId,
        impactTracked: true,
        impactReconciliationEligible: impactTrackingResult.reconciliationIdPropagated === true
      });

      if (mode === "redirect") {
        return redirectResponse(outbound.toString(), 302);
      }

      return json({
        ok: true,
        status: "redirect_ready",
        redirectUrl: outbound.toString(),
        provider,
        artistSlug: resolved.link.artistSlug,
        showId: resolved.link.showId
      });
    }

    // Ticketmaster: plain redirect to the verified event URL, no Impact call.
    const outbound = resolved.redirect;

    await trackClick({
      request,
      env,
      link: resolved.link,
      sourcePath,
      destinationHost: outbound.hostname.toLowerCase(),
      ctaLocation,
      clickId
    });

    if (mode === "redirect") {
      return redirectResponse(outbound.toString(), 302);
    }

    return json({
      ok: true,
      status: "redirect_ready",
      redirectUrl: outbound.toString(),
      provider,
      artistSlug: resolved.link.artistSlug,
      showId: resolved.link.showId
    });
  }

  if (!artistSlug) return json({ ok: false, status: "missing_artist_slug" }, 400);

  const destinationCheck = validateRequestedDestination(providerConfig, requestedDestination);
  if (!destinationCheck.ok) {
    return json({ ok: false, status: destinationCheck.status }, 400);
  }

  const artistState = await artistRedirectState(env, artistSlug);
  if (!artistState.ok) return json({ ok: false, status: artistState.status }, artistState.httpStatus);

  // "Check prices" search link (owner-approved 2026-10-25): a search for the
  // artist's name on a resale site with no verified artist page. The
  // destination is built here from artists.json, never taken from the request,
  // and only for providers in SEARCH_CHECK_URL_BUILDERS.
  const searchRequested = clean(body.linkType || url.searchParams.get("linkType"), 20) === "search";
  const link = searchRequested
    ? searchCheckLink(artistSlug, provider, artistState.artistName)
    : VERIFIED_TICKET_LINKS[`${artistSlug}:${provider}`];
  if (!link || !link.verified) {
    return json({ ok: false, status: "provider_not_configured" }, 400);
  }

  const redirect = validateConfiguredRedirect(providerConfig, link.redirectUrl);
  if (!redirect) {
    return json({ ok: false, status: "configured_redirect_rejected" }, 400);
  }

  await trackOutboundAttempt({ request, env, link, sourcePath, ctaLocation, clickId });
  if (providerConfig.publicEnabledEnv && !impactMarketplacePublicEnabled(env, provider)) {
    await trackBlockedClick({ request, env, link, sourcePath, ctaLocation, clickId, status: "provider_not_configured" });
    return json({ ok: false, status: "provider_not_configured" }, 400);
  }

  let outbound = redirect;
  let impactReconciliationEligible = false;
  if (IMPACT_WRAPPED_PROVIDERS.has(provider)) {
    // Artist-level SeatGeek / Vivid Seats clicks are Impact-wrapped exactly
    // like the event path; failures return diagnostic JSON, never an
    // untracked redirect. Ticketmaster artist links stay plain, unmonetized
    // redirects. The destination re-validation uses the artist-level rule
    // (validateConfiguredRedirect) because the redirectUrl is a hand-verified
    // performer-page constant, not an event URL.
    const providerImpactConfig = impactConfig(env, provider);
    if (!providerImpactConfig.configured && !hasBaseTrackingUrl(env, provider)) {
      await trackBlockedClick({ request, env, link, sourcePath, ctaLocation, clickId, status: "provider_not_configured" });
      return json({ ok: false, status: "provider_not_configured" }, 400);
    }
    const validateArtistDestination = (value) => validateConfiguredRedirect(providerConfig, value);
    const impactTrackingResult = hasBaseTrackingUrl(env, provider)
      ? buildBaseTrackingRedirect(env, provider, redirect.toString(), validateArtistDestination, clickId)
      : await createImpactTrackingUrlResult(env, redirect.toString(), provider);
    if (!impactTrackingResult.ok) {
      await trackBlockedClick({ request, env, link, sourcePath, ctaLocation, clickId, status: impactTrackingResult.status });
      return json(impactFailurePayload(provider, { redirect }, impactTrackingResult, providerImpactConfig), 400);
    }
    impactReconciliationEligible = impactTrackingResult.reconciliationIdPropagated === true;
    outbound = safeUrl(impactTrackingResult.trackingUrl);
    if (!outbound) {
      await trackBlockedClick({ request, env, link, sourcePath, ctaLocation, clickId, status: "impact_tracking_url_failed_safety_check" });
      return json(impactFailurePayload(provider, { redirect }, {
        ok: false,
        status: "impact_tracking_url_failed_safety_check",
        hasProgramId: providerImpactConfig.hasProgramId,
        impactConfigPresent: providerImpactConfig.configured
      }, providerImpactConfig), 400);
    }
  }

  await trackClick({
    request,
    env,
    link,
    sourcePath,
    destinationHost: outbound.hostname.toLowerCase(),
    ctaLocation,
    clickId,
    impactTracked: IMPACT_WRAPPED_PROVIDERS.has(provider),
    impactReconciliationEligible
  });

  if (mode === "redirect") {
    return redirectResponse(outbound.toString(), 302);
  }

  return json({
    ok: true,
    status: "redirect_ready",
    redirectUrl: outbound.toString(),
    provider,
    artistSlug
  });
}

export {
  buildBaseTrackingRedirect,
  outboundClickIdParam,
  createImpactTrackingUrlResult,
  impactConfig,
  impactEndpointDiagnostics,
  inspectImpactProgram,
  safeImpactDiagnosticConfig,
  PROVIDERS,
  VERIFIED_TICKET_LINKS
};

export async function onRequestGet({ request, env }) {
  return handleOut(request, env, "redirect");
}

export async function onRequestPost({ request, env }) {
  return handleOut(request, env, "json");
}
