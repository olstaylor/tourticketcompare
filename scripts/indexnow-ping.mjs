// IndexNow ping (https://www.indexnow.org) — notifies Bing/Yandex-class
// engines (which also feed ChatGPT search and Copilot) that the site's URLs
// are ready to crawl, instead of waiting for a scheduled sitemap recrawl.
//
// Reads the live sitemap, verifies the public key file is actually being
// served (IndexNow rejects pings whose key file is missing), then submits the
// full URL list in one POST. Safe to re-run: IndexNow treats repeat
// submissions as no-ops. Run after a deploy that adds or meaningfully changes
// indexable pages.
//
// Usage:
//   npm run indexnow:ping             # verify key + submit sitemap URLs
//   npm run indexnow:ping -- --dry-run  # show what would be submitted

const HOST = "tourticketcompare.com";
const ORIGIN = `https://${HOST}`;
const KEY = "9ffca7bd48067983c70d2ce6601728d3";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const DRY_RUN = process.argv.includes("--dry-run");

async function fetchText(url) {
  const response = await fetch(url, { headers: { "User-Agent": "tourticketcompare-indexnow-ping" } });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.text();
}

let keyLive = false;
try {
  keyLive = (await fetchText(KEY_LOCATION)).trim() === KEY;
} catch (error) {
  keyLive = false;
}
if (!keyLive) {
  const message = `key file not live at ${KEY_LOCATION} — deploy public/${KEY}.txt before pinging (IndexNow rejects unverifiable submissions)`;
  if (!DRY_RUN) {
    console.error(message);
    process.exit(1);
  }
  console.warn(`warning: ${message}`);
}

const sitemapXml = await fetchText(`${ORIGIN}/sitemap.xml`);
const urlList = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => match[1].trim())
  .filter((url) => url.startsWith(ORIGIN));

if (!urlList.length) {
  console.error("no URLs extracted from sitemap.xml — refusing to ping");
  process.exit(1);
}

if (keyLive) console.log(`key file verified at ${KEY_LOCATION}`);
console.log(`${urlList.length} URLs from sitemap.xml`);

if (DRY_RUN) {
  console.log(urlList.join("\n"));
  console.log("dry run — nothing submitted");
  process.exit(0);
}

const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList })
});

// IndexNow returns 200 (accepted) or 202 (accepted, key validation pending).
if (response.status === 200 || response.status === 202) {
  console.log(`submitted ${urlList.length} URLs — IndexNow responded ${response.status}`);
} else {
  console.error(`IndexNow responded ${response.status}: ${(await response.text()).slice(0, 300)}`);
  process.exit(1);
}
