#!/usr/bin/env node
// Compile content/blog/*.md into public/data/blog-content.json.
//
// Why a compile step at all: Cloudflare Pages serves public/ as-is with no
// build, and Pages Functions cannot list a directory, so the runtime has no way
// to discover Markdown files. One generated JSON file is the runtime contract;
// the Markdown files are the thing a human edits. Everything downstream — the
// router, sitemap, llms.txt, RSS, and both site audits — reads the generated
// file, so a post is live exactly when it is compiled in.
//
// Modes:
//   (default)     validate content/blog and rewrite public/data/blog-content.json
//   --check       validate and fail if the committed JSON is stale (CI guard)
//   --self-test   unit-test the parser, section splitter, and validators
//
// This script never reaches the network and never touches events, artists,
// catalog, or provider data.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// The generated file is the runtime's input, so the build and the runtime must
// agree on how a tag is labelled. Import it rather than reimplementing it.
import { tagLabel } from "../functions/_blog.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = path.join(root, "content", "blog");
const OUTPUT_PATH = path.join(root, "public", "data", "blog-content.json");
const OUTPUT_REL = "public/data/blog-content.json";

const CHECK_MODE = process.argv.includes("--check");
const SELF_TEST = process.argv.includes("--self-test");

// Search-result display budgets, mirrored from functions/_route-metadata.js.
// Kept as literals so a content author gets the failure here, at authoring
// time, rather than from the internal-link audit at the end of a CI run.
const TITLE_LENGTH_LIMIT = 60;
const META_DESCRIPTION_LENGTH_LIMIT = 160;
const TITLE_SUFFIX = " | TourTicketCompare";

// A post below this many body words is thin for a "read this article" query and
// is published noindex,follow rather than entering the sitemap. The gate lives
// in functions/_blog.js (shared with the router); the constant is repeated here
// only so the build can warn an author before they commit.
const MIN_INDEXABLE_WORDS = 300;

const ALLOWED_KEYS = new Set([
  "title",
  "seo_title",
  "description",
  "summary",
  "date",
  "updated",
  "status",
  "tags",
  "author",
  "related_guides",
  "related_artists",
  "sources"
]);
const REQUIRED_KEYS = ["title", "description", "summary", "date"];
const ALLOWED_STATUS = new Set(["published", "draft"]);
const DEFAULT_AUTHOR = "TourTicketCompare editorial team";

// Route families a post body may link to. Anything else is a typo or a link to
// a page this site does not publish, and both should fail the build rather than
// ship a dead internal link.
const INTERNAL_LINK_PREFIXES = ["/guides/", "/artists/", "/cities/", "/venues/", "/blog/"];
const INTERNAL_LINK_EXACT = new Set([
  "/",
  "/artists",
  "/guides",
  "/blog",
  "/cities",
  "/venues",
  "/compare-concert-ticket-prices",
  "/how-it-works",
  "/currency-converter",
  "/about",
  "/contact",
  "/editorial-policy",
  "/affiliate-disclosure"
]);

// Claims the site is structurally unable to support (SAFE_PUBLISHING_RULES.md →
// Price Display). A blog post is ordinary editorial prose, so it is the easiest
// place for one of these to slip in; the check is a blunt substring match on
// purpose. Rephrase rather than suppress.
const BANNED_CLAIM_PATTERNS = [
  [/\bcheapest\b/i, 'a "cheapest" claim — the site publishes per-provider snapshots, never a ranking'],
  [/\blowest price\b/i, 'a "lowest price" claim — say "lower listed snapshot" and name the provider and time'],
  [/\bbest price guarantee/i, "a price guarantee the site cannot make"],
  [/\bguaranteed (?:availability|tickets|seats)\b/i, "an availability guarantee — inventory is provider-controlled"],
  [/\bsold out\b/i, 'a "sold out" claim — the site has no inventory data'],
  [/\bselling fast\b/i, "manufactured urgency"],
  [/\blast chance\b/i, "manufactured urgency"],
  [/\bwe sell\b/i, "an implication the site sells tickets"]
];

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

// ---------------------------------------------------------------------------
// Front matter
// ---------------------------------------------------------------------------

function stripQuotes(raw) {
  const value = raw.trim();
  if (value.length >= 2 && ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))) {
    return value.slice(1, -1).replace(/\\"/g, '"').replace(/''/g, "'");
  }
  return value;
}

/**
 * Parse the constrained YAML subset this project's front matter uses: scalars,
 * flow lists (`tags: [a, b]`), block lists of scalars, and block lists of
 * one-level objects (the `sources` shape). Deliberately not a general YAML
 * parser — an unsupported construct raises rather than being silently dropped,
 * because a silently dropped field would publish a post missing its metadata.
 *
 * @param {string} text Raw front matter body (without the --- fences).
 * @returns {Record<string, unknown>}
 */
export function parseFrontMatter(text) {
  const result = {};
  const lines = String(text || "").split("\n");
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim() || line.trim().startsWith("#")) {
      index += 1;
      continue;
    }
    if (/^\s/.test(line)) throw new Error(`unexpected indentation at front-matter line ${index + 1}: "${line}"`);

    const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!match) throw new Error(`cannot parse front-matter line ${index + 1}: "${line}"`);
    const [, key, rawValue] = match;
    const value = rawValue.trim();
    index += 1;

    if (value.startsWith("[") && value.endsWith("]")) {
      const inner = value.slice(1, -1).trim();
      result[key] = inner ? inner.split(",").map((entry) => stripQuotes(entry)).filter(Boolean) : [];
      continue;
    }
    if (value) {
      result[key] = stripQuotes(value);
      continue;
    }

    // Empty scalar: either a block list follows, or the key is genuinely blank.
    const items = [];
    while (index < lines.length && /^\s*-\s/.test(lines[index])) {
      const itemIndent = lines[index].match(/^(\s*)-/)[1].length;
      const first = lines[index].replace(/^\s*-\s*/, "");
      index += 1;

      const objectEntry = first.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
      if (objectEntry) {
        const object = { [objectEntry[1]]: stripQuotes(objectEntry[2]) };
        while (index < lines.length && /^\s+[A-Za-z0-9_]+:/.test(lines[index])) {
          const childIndent = lines[index].match(/^(\s*)/)[1].length;
          if (childIndent <= itemIndent) break;
          const child = lines[index].trim().match(/^([A-Za-z0-9_]+):\s*(.*)$/);
          if (!child) throw new Error(`cannot parse nested front-matter line ${index + 1}: "${lines[index]}"`);
          object[child[1]] = stripQuotes(child[2]);
          index += 1;
        }
        items.push(object);
        continue;
      }
      items.push(stripQuotes(first));
    }
    result[key] = items;
  }

  return result;
}

/**
 * Split a Markdown file into its front matter and body.
 *
 * @param {string} source
 * @returns {{frontMatter: Record<string, unknown>, body: string}}
 */
export function splitDocument(source) {
  const text = String(source || "").replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error("missing YAML front matter (the file must start with a --- fence)");
  return { frontMatter: parseFrontMatter(match[1]), body: match[2].trim() };
}

// ---------------------------------------------------------------------------
// Body → sections
// ---------------------------------------------------------------------------

/**
 * Convert a Markdown body into the section list the renderer consumes. The
 * shape intentionally matches public/data/guides-content.json so blog posts and
 * guides render through the same code path: prose before the first heading
 * becomes an `intro`, `##` opens a `section`, `###` opens a `subsection`.
 *
 * @param {string} body
 * @returns {Array<{type: string, title?: string, content: string}>}
 */
export function bodyToSections(body) {
  const sections = [];
  let current = { type: "intro", lines: [] };

  for (const line of String(body || "").split("\n")) {
    const heading = line.match(/^(#{2,3})\s+(.*)$/);
    if (heading) {
      sections.push(current);
      current = { type: heading[1].length === 2 ? "section" : "subsection", title: heading[2].trim(), lines: [] };
      continue;
    }
    if (/^#\s/.test(line)) {
      throw new Error("a level-1 heading (#) is not allowed in the body — the post title is the page H1");
    }
    current.lines.push(line);
  }
  sections.push(current);

  return sections
    .map((section) => ({ ...section, content: section.lines.join("\n").replace(/\n{3,}/g, "\n\n").trim() }))
    .filter((section) => section.content || section.title)
    .map((section) => (section.type === "intro" ? { type: "intro", content: section.content } : { type: section.type, title: section.title, content: section.content }));
}

export function countWords(text) {
  return String(text || "")
    .replace(/`[^`]*`/g, " ")
    .replace(/[#*_>|-]/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .split(/\s+/)
    .filter(Boolean).length;
}

function markdownLinks(text) {
  return [...String(text || "").matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((match) => ({ label: match[1], href: match[2].trim() }));
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validatePost(post, context) {
  const problems = [];
  const where = post.file;

  for (const key of Object.keys(post.frontMatter)) {
    if (!ALLOWED_KEYS.has(key)) problems.push(`${where}: unknown front-matter key "${key}" (allowed: ${[...ALLOWED_KEYS].join(", ")})`);
  }
  for (const key of REQUIRED_KEYS) {
    if (!String(post.frontMatter[key] || "").trim()) problems.push(`${where}: missing required front-matter key "${key}"`);
  }

  if (!SLUG_PATTERN.test(post.slug)) {
    problems.push(`${where}: filename must be a lowercase hyphenated slug (got "${post.slug}")`);
  }
  if (!ISO_DATE_PATTERN.test(post.datePublished)) {
    problems.push(`${where}: "date" must be YYYY-MM-DD (got "${post.datePublished}")`);
  }
  if (post.dateModified && !ISO_DATE_PATTERN.test(post.dateModified)) {
    problems.push(`${where}: "updated" must be YYYY-MM-DD (got "${post.dateModified}")`);
  }
  if (post.dateModified && ISO_DATE_PATTERN.test(post.datePublished) && post.dateModified < post.datePublished) {
    problems.push(`${where}: "updated" (${post.dateModified}) is before "date" (${post.datePublished})`);
  }
  if (!ALLOWED_STATUS.has(post.status)) {
    problems.push(`${where}: "status" must be one of ${[...ALLOWED_STATUS].join(", ")} (got "${post.status}")`);
  }

  if (post.title.length > 70) problems.push(`${where}: "title" is ${post.title.length} characters; keep the on-page H1 under 70`);
  if (post.seoTitle.length > TITLE_LENGTH_LIMIT) {
    problems.push(
      `${where}: search title is ${post.seoTitle.length} characters including "${TITLE_SUFFIX.trim()}" (limit ${TITLE_LENGTH_LIMIT}). Add a shorter "seo_title".`
    );
  }
  if (post.description.length > META_DESCRIPTION_LENGTH_LIMIT) {
    problems.push(`${where}: "description" is ${post.description.length} characters (limit ${META_DESCRIPTION_LENGTH_LIMIT})`);
  }
  if (post.description.length < 50) {
    problems.push(`${where}: "description" is ${post.description.length} characters; write a full sentence (50+) for the search snippet`);
  }

  if (!post.sections.length) problems.push(`${where}: the post body is empty`);
  if (!post.sections.some((section) => section.type === "section")) {
    problems.push(`${where}: the body needs at least one "## " section heading`);
  }

  for (const tag of post.tags) {
    if (!SLUG_PATTERN.test(tag)) problems.push(`${where}: tag "${tag}" must be a lowercase hyphenated slug`);
  }

  for (const slug of post.relatedGuides) {
    if (!context.guidePaths.has(`/guides/${slug}`)) problems.push(`${where}: related_guides "${slug}" is not a published guide`);
  }
  for (const slug of post.relatedArtists) {
    if (!context.artistSlugs.has(slug)) problems.push(`${where}: related_artists "${slug}" is not in public/data/artists.json`);
  }

  for (const source of post.sources) {
    if (!source.label) problems.push(`${where}: every "sources" entry needs a "label"`);
    if (!/^https:\/\//.test(source.url || "")) problems.push(`${where}: source "${source.label || "(unlabelled)"}" must have an https URL`);
  }

  const bodyText = post.sections.map((section) => `${section.title || ""}\n${section.content}`).join("\n");
  const scanned = `${post.title}\n${post.description}\n${post.summary}\n${bodyText}`;
  for (const [pattern, reason] of BANNED_CLAIM_PATTERNS) {
    const hit = scanned.match(pattern);
    if (hit) problems.push(`${where}: "${hit[0]}" reads as ${reason} (SAFE_PUBLISHING_RULES.md)`);
  }

  // The site's Markdown renderer has no image path, so an embedded image would
  // render as literal text. Fail loudly rather than publish that.
  if (/!\[[^\]]*\]\([^)]*\)/.test(bodyText)) {
    problems.push(`${where}: embedded images are not supported by the renderer — remove the ![...](...) and describe it in prose`);
  }

  for (const { href } of markdownLinks(bodyText)) {
    if (href.startsWith("https://")) {
      if (href.includes("&")) problems.push(`${where}: external link ${href} contains "&"; use a URL without a query string`);
      continue;
    }
    if (!href.startsWith("/")) {
      problems.push(`${where}: link "${href}" must be an absolute site path (starting "/") or an https URL`);
      continue;
    }
    const clean = href.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
    const known = INTERNAL_LINK_EXACT.has(clean) || INTERNAL_LINK_PREFIXES.some((prefix) => clean.startsWith(prefix));
    if (!known) {
      problems.push(`${where}: internal link "${href}" does not point at a published route family`);
      continue;
    }
    if (clean.startsWith("/guides/") && !context.guidePaths.has(clean)) {
      problems.push(`${where}: internal link "${href}" points at a guide that does not exist`);
    }
    if (clean.startsWith("/artists/")) {
      const slug = clean.split("/")[2];
      if (slug && !context.artistSlugs.has(slug)) problems.push(`${where}: internal link "${href}" points at an unknown artist slug`);
    }
    if (clean.startsWith("/blog/") && !clean.startsWith("/blog/tags/") && !context.slugs.has(clean.split("/")[2])) {
      problems.push(`${where}: internal link "${href}" points at a blog post that does not exist`);
    }
  }

  return problems;
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

function toList(value) {
  if (Array.isArray(value)) return value.map((entry) => String(entry ?? "").trim()).filter(Boolean);
  const single = String(value ?? "").trim();
  return single ? [single] : [];
}

function normalizePost(file, source) {
  const { frontMatter, body } = splitDocument(source);
  const slug = path.basename(file, ".md");
  const title = String(frontMatter.title ?? "").trim();
  const seoTitleBase = String(frontMatter.seo_title ?? "").trim() || title;
  const sections = bodyToSections(body);

  return {
    file: `content/blog/${file}`,
    frontMatter,
    slug,
    path: `/blog/${slug}`,
    title,
    seoTitle: `${seoTitleBase}${TITLE_SUFFIX}`,
    description: String(frontMatter.description ?? "").trim(),
    summary: String(frontMatter.summary ?? "").trim(),
    datePublished: String(frontMatter.date ?? "").trim(),
    dateModified: String(frontMatter.updated ?? "").trim(),
    status: String(frontMatter.status ?? "published").trim() || "published",
    author: String(frontMatter.author ?? "").trim() || DEFAULT_AUTHOR,
    tags: toList(frontMatter.tags),
    relatedGuides: toList(frontMatter.related_guides).map((slug) => slug.replace(/^\/guides\//, "")),
    relatedArtists: toList(frontMatter.related_artists).map((slug) => slug.replace(/^\/artists\//, "")),
    sources: (Array.isArray(frontMatter.sources) ? frontMatter.sources : [])
      .filter((entry) => entry && typeof entry === "object")
      .map((entry) => ({ label: String(entry.label ?? "").trim(), url: String(entry.url ?? "").trim() })),
    sections,
    wordCount: countWords(body)
  };
}

/**
 * Serialize a post into the runtime record. Key order is fixed so a rebuild
 * with unchanged content produces a byte-identical file and --check stays a
 * meaningful staleness test.
 */
function toRuntimeRecord(post) {
  const record = {
    slug: post.slug,
    path: post.path,
    title: post.title,
    seoTitle: post.seoTitle,
    description: post.description,
    summary: post.summary,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    status: post.status,
    author: post.author,
    tags: [...post.tags].sort(),
    relatedGuides: post.relatedGuides,
    relatedArtists: post.relatedArtists,
    wordCount: post.wordCount,
    sections: post.sections
  };
  if (post.sources.length) record.sources = post.sources;
  return record;
}

export function buildDocument(posts) {
  const published = posts.filter((post) => post.status === "published");
  const tagCounts = new Map();
  for (const post of published) {
    for (const tag of post.tags) tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
  }

  return {
    generator: "scripts/build-blog-content.mjs",
    source: "content/blog",
    posts: posts
      .slice()
      .sort((a, b) => (a.datePublished === b.datePublished ? a.slug.localeCompare(b.slug) : b.datePublished.localeCompare(a.datePublished)))
      .map(toRuntimeRecord),
    tags: [...tagCounts.entries()]
      .sort((a, b) => (b[1] === a[1] ? a[0].localeCompare(b[0]) : b[1] - a[1]))
      .map(([slug, count]) => ({ slug, label: tagLabel(slug), postCount: count }))
  };
}

function serialize(document) {
  return `${JSON.stringify(document, null, 2)}\n`;
}

async function loadContext() {
  const metadata = await import(pathToFileURL(path.join(root, "functions/_route-metadata.js")));
  const artists = JSON.parse(await fs.readFile(path.join(root, "public/data/artists.json"), "utf8"));
  return {
    guidePaths: new Set(Object.keys(metadata.GUIDE_ROUTES)),
    artistSlugs: new Set(artists.map((artist) => String(artist?.slug || "").trim()).filter(Boolean))
  };
}

async function readPosts() {
  let files = [];
  try {
    files = (await fs.readdir(CONTENT_DIR)).filter((file) => file.endsWith(".md")).sort();
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    return { posts: [], problems: [`content directory ${path.relative(root, CONTENT_DIR)} does not exist`] };
  }

  const posts = [];
  const problems = [];
  for (const file of files) {
    const source = await fs.readFile(path.join(CONTENT_DIR, file), "utf8");
    try {
      posts.push(normalizePost(file, source));
    } catch (error) {
      problems.push(`content/blog/${file}: ${error.message}`);
    }
  }
  return { posts, problems };
}

async function run() {
  const { posts, problems } = await readPosts();
  const context = { ...(await loadContext()), slugs: new Set(posts.map((post) => post.slug)) };

  for (const post of posts) problems.push(...validatePost(post, context));

  if (problems.length) {
    console.error(`blog content validation failed (${problems.length} problem${problems.length === 1 ? "" : "s"}):`);
    for (const problem of problems) console.error(`- ${problem}`);
    process.exit(1);
  }

  const document = buildDocument(posts);
  const serialized = serialize(document);

  const published = document.posts.filter((post) => post.status === "published");
  const thin = published.filter((post) => post.wordCount < MIN_INDEXABLE_WORDS);
  const drafts = document.posts.length - published.length;

  if (CHECK_MODE) {
    let current = "";
    try {
      current = await fs.readFile(OUTPUT_PATH, "utf8");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    if (current !== serialized) {
      console.error(`STALE: ${OUTPUT_REL} does not match content/blog. Run "npm run blog:build" and commit the result.`);
      process.exit(1);
    }
    console.log(`blog content check passed: ${published.length} published post(s), ${drafts} draft(s), ${document.tags.length} tag(s).`);
    return;
  }

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, serialized);
  console.log(`Wrote ${OUTPUT_REL}: ${published.length} published post(s), ${drafts} draft(s), ${document.tags.length} tag(s).`);
  for (const post of thin) {
    console.log(`  note: /blog/${post.slug} has ${post.wordCount} words (<${MIN_INDEXABLE_WORDS}) and will publish noindex,follow.`);
  }
}

// ---------------------------------------------------------------------------
// Self-test
// ---------------------------------------------------------------------------

function assert(condition, message) {
  if (!condition) {
    console.error(`SELF-TEST FAIL: ${message}`);
    process.exitCode = 1;
    return;
  }
  console.log(`ok: ${message}`);
}

function selfTest() {
  const parsed = parseFrontMatter(
    [
      'title: "How fees stack up"',
      "date: 2026-08-01",
      "tags:",
      "  - ticket-fees",
      "  - resale",
      "related_guides: [concert-ticket-fees-explained]",
      "sources:",
      "  - label: CMA guidance",
      "    url: https://example.org/guidance",
      "status: published"
    ].join("\n")
  );
  assert(parsed.title === "How fees stack up", "quoted scalars are unquoted");
  assert(Array.isArray(parsed.tags) && parsed.tags.length === 2 && parsed.tags[0] === "ticket-fees", "block lists parse");
  assert(parsed.related_guides.length === 1 && parsed.related_guides[0] === "concert-ticket-fees-explained", "flow lists parse");
  assert(parsed.sources.length === 1 && parsed.sources[0].url === "https://example.org/guidance", "object lists parse");

  let threw = false;
  try {
    parseFrontMatter("title: ok\n  stray: value");
  } catch (error) {
    threw = true;
  }
  assert(threw, "unsupported indentation raises rather than silently dropping a field");

  threw = false;
  try {
    splitDocument("no front matter here");
  } catch (error) {
    threw = true;
  }
  assert(threw, "a file without front matter raises");

  const sections = bodyToSections("Lead paragraph.\n\n## First\n\nBody.\n\n### Nested\n\nMore.");
  assert(sections.length === 3, "body splits into intro + section + subsection");
  assert(sections[0].type === "intro" && sections[0].content === "Lead paragraph.", "prose before the first heading becomes the intro");
  assert(sections[1].type === "section" && sections[1].title === "First", "## opens a section");
  assert(sections[2].type === "subsection" && sections[2].title === "Nested", "### opens a subsection");

  threw = false;
  try {
    bodyToSections("# Title in body");
  } catch (error) {
    threw = true;
  }
  assert(threw, "a level-1 heading in the body raises");

  const context = { guidePaths: new Set(["/guides/known"]), artistSlugs: new Set(["known-artist"]), slugs: new Set(["a-post"]) };
  const base = {
    file: "content/blog/a-post.md",
    frontMatter: { title: "t", description: "d", summary: "s", date: "2026-08-01" },
    slug: "a-post",
    path: "/blog/a-post",
    title: "A sufficiently descriptive post title",
    seoTitle: `A sufficiently descriptive post title${TITLE_SUFFIX}`,
    description: "A full sentence description that comfortably clears the fifty character floor for snippets.",
    summary: "Summary.",
    datePublished: "2026-08-01",
    dateModified: "",
    status: "published",
    author: DEFAULT_AUTHOR,
    tags: [],
    relatedGuides: [],
    relatedArtists: [],
    sources: [],
    sections: [{ type: "section", title: "Heading", content: "Body text." }],
    wordCount: 400
  };
  assert(validatePost(base, context).length === 0, "a well-formed post validates clean");

  const banned = validatePost({ ...base, sections: [{ type: "section", title: "H", content: "We find the cheapest tickets." }] }, context);
  assert(banned.some((problem) => /cheapest/.test(problem)), "a banned price claim fails validation");

  const deadLink = validatePost({ ...base, sections: [{ type: "section", title: "H", content: "See [this](/guides/missing)." }] }, context);
  assert(deadLink.some((problem) => /does not exist/.test(problem)), "a link to a missing guide fails validation");

  const offSite = validatePost({ ...base, sections: [{ type: "section", title: "H", content: "See [this](/nope/path)." }] }, context);
  assert(offSite.some((problem) => /published route family/.test(problem)), "a link outside the published route families fails validation");

  const longTitle = validatePost({ ...base, seoTitle: `${"x".repeat(60)}${TITLE_SUFFIX}` }, context);
  assert(longTitle.some((problem) => /search title/.test(problem)), "an over-budget search title fails validation");

  const withImage = validatePost({ ...base, sections: [{ type: "section", title: "H", content: "![alt](/assets/blog/x.png)" }] }, context);
  assert(withImage.some((problem) => /images are not supported/.test(problem)), "an embedded image fails validation");

  const document = buildDocument([
    { ...base, slug: "older", path: "/blog/older", datePublished: "2026-07-01", tags: ["fees"] },
    { ...base, slug: "newer", path: "/blog/newer", datePublished: "2026-08-01", tags: ["fees", "resale"] },
    { ...base, slug: "hidden", path: "/blog/hidden", datePublished: "2026-08-02", status: "draft", tags: ["fees"] }
  ]);
  assert(document.posts[0].slug === "hidden" && document.posts[1].slug === "newer", "posts sort newest first");
  assert(document.tags.find((tag) => tag.slug === "fees").postCount === 2, "draft posts do not count toward tag totals");
  assert(serialize(document) === serialize(buildDocument(JSON.parse(JSON.stringify([
    { ...base, slug: "older", path: "/blog/older", datePublished: "2026-07-01", tags: ["fees"] },
    { ...base, slug: "newer", path: "/blog/newer", datePublished: "2026-08-01", tags: ["fees", "resale"] },
    { ...base, slug: "hidden", path: "/blog/hidden", datePublished: "2026-08-02", status: "draft", tags: ["fees"] }
  ])))), "serialization is deterministic");

  if (!process.exitCode) console.log("build-blog-content self-test passed.");
}

if (SELF_TEST) {
  selfTest();
} else {
  await run();
}
