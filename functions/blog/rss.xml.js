import { canonicalOrigin } from "../_route-metadata.js";
import { derivePosts, postIndexable, blogLastmod } from "../_blog.js";

// RSS 2.0 feed for /blog. Reads the same generated document and the same
// derivation as the router and the sitemap, so the feed cannot advertise a post
// the site would not serve: drafts are already gone by the time derivePosts
// returns, and thin (noindex) posts are excluded for the same reason they stay
// out of the sitemap.
//
// Item bodies are the authored summary, not the full post. A feed reader gets
// enough to decide, and the canonical copy stays on the site.

const MAX_ITEMS = 50;

function escapeXml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// RFC 822 date from a YYYY-MM-DD publication date. Posts carry a date, not a
// timestamp, so midnight UTC is the honest reading of "published that day".
function rfc822(isoDate) {
  const parsed = new Date(`${String(isoDate || "").trim()}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) ? parsed.toUTCString() : "";
}

async function loadBlogContent(env) {
  try {
    const response = await env?.ASSETS?.fetch(new Request("https://assets.local/data/blog-content.json"));
    if (!response?.ok) return { posts: [] };
    return await response.json();
  } catch (error) {
    return { posts: [] };
  }
}

export async function onRequestGet({ request, env }) {
  const requestUrl = new URL(request.url);
  const origin = canonicalOrigin(`${requestUrl.protocol}//${requestUrl.host}`);
  const posts = derivePosts(await loadBlogContent(env)).filter(postIndexable).slice(0, MAX_ITEMS);
  const lastBuild = rfc822(blogLastmod(posts));

  const items = posts
    .map((post) =>
      [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(`${origin}${post.path}`)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(`${origin}${post.path}`)}</guid>`,
        `      <description>${escapeXml(post.summary)}</description>`,
        rfc822(post.datePublished) ? `      <pubDate>${escapeXml(rfc822(post.datePublished))}</pubDate>` : "",
        ...post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`),
        "    </item>"
      ]
        .filter(Boolean)
        .join("\n")
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TourTicketCompare blog</title>
    <link>${escapeXml(`${origin}/blog`)}</link>
    <atom:link href="${escapeXml(`${origin}/blog/rss.xml`)}" rel="self" type="application/rss+xml" />
    <description>Notes from an independent ticket research site: how links get verified, what a price snapshot means, and what we publish or withhold.</description>
    <language>en</language>${lastBuild ? `\n    <lastBuildDate>${escapeXml(lastBuild)}</lastBuildDate>` : ""}
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=UTF-8",
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "noindex"
    }
  });
}
