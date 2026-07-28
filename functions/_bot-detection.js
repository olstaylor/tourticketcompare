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
