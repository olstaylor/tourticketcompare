// Shared crawler detection for first-party analytics writes.
//
// `/api/out` and `/api/analytics` both record demand signals that feed product
// decisions. Automated traffic dominates those counts: in July 2026 roughly
// half of all `outbound_click` rows carried a self-identifying crawler user
// agent (GPTBot, MJ12bot, ClaudeBot, SemrushBot, DotBot and friends), which
// made the affiliate-click volume look far healthier than it was.
//
// Scope and limits, deliberately narrow to protect the metric that matters:
// this matches only crawlers that *identify themselves* in the user-agent
// string. Headless automation presenting a stock browser UA is not caught here
// and never can be from the UA alone. That trade is intentional — a false
// positive would silently discard a real affiliate click, so the token list
// below contains only substrings no genuine browser UA contains.
const BOT_TOKENS = [
  "bot",
  "crawler",
  "crawling",
  "spider",
  "slurp",
  "archiver",
  "scraper",
  "wget",
  "curl",
  "python-requests",
  "python-urllib",
  "httpclient",
  "http_request",
  "okhttp",
  "java/",
  "go-http-client",
  "libwww-perl",
  "phantomjs",
  "headlesschrome",
  "lighthouse",
  "pingdom",
  "uptimerobot",
  "monitoring",
  "feedfetcher",
  "preview"
];

export function isLikelyBot(userAgent) {
  const ua = String(userAgent || "").toLowerCase().trim();
  // A missing user agent is not evidence either way; real browsers always send
  // one, but so do most crawlers. Treat it as unknown rather than as a bot so
  // the filter cannot quietly eat traffic it has not actually identified.
  if (!ua) return false;
  return BOT_TOKENS.some((token) => ua.includes(token));
}

// Navigation evidence for a request to /api/out, recorded on the redirect
// receipt so reports and Cloudflare rules can tell a click on one of our pages
// from a direct hit on the redirect URL.
//
// In October 2026 about 95% of redirects came from a crawler rotating stock
// browser user agents and residential IPs, which isLikelyBot cannot see. Those
// requests arrived with no Referer and never loaded a page. A real click on a
// TTC page carries `Sec-Fetch-Site: same-origin` (every current browser) and a
// same-origin Referer (the site's referrer policy), so a request with neither
// is flagged `direct`. This is evidence only: nothing here changes the
// redirect, and a flagged click is still recorded.
export function describeNavigation(request, canonicalHost = "tourticketcompare.com") {
  const headers = request?.headers;
  const header = (name) => String(headers?.get?.(name) || "").trim().toLowerCase().slice(0, 32);
  const fetchSite = header("sec-fetch-site") || null;
  let referer = "none";
  const rawReferer = headers?.get?.("referer");
  if (rawReferer) {
    try {
      const host = new URL(rawReferer).hostname.toLowerCase();
      referer = host === canonicalHost || host.endsWith(`.${canonicalHost}`) ? "same_origin" : "other";
    } catch (error) {
      referer = "other";
    }
  }
  return {
    fetchSite,
    fetchMode: header("sec-fetch-mode") || null,
    fetchUser: header("sec-fetch-user") === "?1",
    referer,
    direct: fetchSite !== "same-origin" && referer !== "same_origin"
  };
}
