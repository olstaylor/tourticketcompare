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

// Shared with scripts/build-guide-content.mjs — see scripts/lib/content-markdown.mjs.
import {
  ISO_DATE_PATTERN,
  SLUG_PATTERN,
  bodyToSections,
  countWords,
  isCalendarDate,
  isUsableHttpsUrl,
  markdownLinks,
  parseFrontMatter,
  splitDocument
} from "./lib/content-markdown.mjs";

export { bodyToSections, countWords, isCalendarDate, isUsableHttpsUrl, parseFrontMatter, splitDocument };

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

// Route shapes a post body may link to, as complete patterns rather than
// prefixes. A prefix test accepts /artists/harry-styles/bogus and
// /blog/<real-slug>/extra, neither of which the router serves — which defeats
// the point of resolving links at build time. Segment counts are exact.
//
// /artists/<artist>/tickets/<city> is deliberately absent: it is a real route,
// but a calendar-dependent one that 301s or 404s as dates pass, so a post must
// not hard-link to it. Link the artist page instead.
const INTERNAL_LINK_SHAPES = [
  { pattern: /^\/guides\/[a-z0-9-]+$/, kind: "guide" },
  { pattern: /^\/artists\/[a-z0-9-]+$/, kind: "artist" },
  { pattern: /^\/blog\/tags\/[a-z0-9-]+$/, kind: "blog-tag" },
  { pattern: /^\/blog\/[a-z0-9-]+$/, kind: "blog-post" },
  // Shape-checked only: city and venue pages move with the calendar, so
  // resolving them would fail the build on ordinary event expiry.
  { pattern: /^\/cities\/[a-z0-9-]+$/, kind: "location" },
  { pattern: /^\/venues\/[a-z0-9-]+$/, kind: "location" }
];
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

// The front-matter parser, the body -> sections splitter, and the shared
// scalar validators now live in scripts/lib/content-markdown.mjs so this build
// and the guide build cannot disagree about how a document parses. They are
// re-exported below, so this module's public surface is unchanged.

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
  if (!isCalendarDate(post.datePublished)) {
    problems.push(`${where}: "date" must be a real YYYY-MM-DD calendar date (got "${post.datePublished}")`);
  }
  if (post.dateModified && !isCalendarDate(post.dateModified)) {
    problems.push(`${where}: "updated" must be a real YYYY-MM-DD calendar date (got "${post.dateModified}")`);
  }
  if (post.dateModified && isCalendarDate(post.datePublished) && post.dateModified < post.datePublished) {
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
  // The CMS list widget happily accepts the same value twice. A repeated tag
  // would count the one post twice toward the two-post tag-indexability gate
  // and render its card twice on the tag page.
  for (const [field, values] of [
    ["tags", post.tags],
    ["related_guides", post.relatedGuides],
    ["related_artists", post.relatedArtists]
  ]) {
    const duplicates = [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
    if (duplicates.length) problems.push(`${where}: "${field}" repeats ${duplicates.map((value) => `"${value}"`).join(", ")}`);
  }

  for (const slug of post.relatedGuides) {
    if (!context.guidePaths.has(`/guides/${slug}`)) problems.push(`${where}: related_guides "${slug}" is not a published guide`);
  }
  for (const slug of post.relatedArtists) {
    if (!context.artistSlugs.has(slug)) problems.push(`${where}: related_artists "${slug}" is not in public/data/artists.json`);
  }

  for (const source of post.sources) {
    if (!source.label) problems.push(`${where}: every "sources" entry needs a "label"`);
    if (!isUsableHttpsUrl(source.url)) {
      problems.push(`${where}: source "${source.label || "(unlabelled)"}" needs a parseable https URL with a hostname (got "${source.url}")`);
    }
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
    // "&" is rejected on every link, internal or external. The renderer
    // HTML-escapes body text before matching links, so an "&" has already
    // become "&amp;" by the time the link pattern runs — it would either fail
    // to match or be escaped twice in the href.
    if (href.includes("&")) {
      problems.push(`${where}: link "${href}" contains "&"; use a URL without one`);
      continue;
    }
    if (href.startsWith("https://")) {
      if (!isUsableHttpsUrl(href)) problems.push(`${where}: external link "${href}" is not a parseable https URL`);
      continue;
    }
    if (!href.startsWith("/")) {
      problems.push(`${where}: link "${href}" must be an absolute site path (starting "/") or an https URL`);
      continue;
    }

    const clean = href.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
    const shape = INTERNAL_LINK_SHAPES.find((candidate) => candidate.pattern.test(clean));
    if (!shape && !INTERNAL_LINK_EXACT.has(clean)) {
      problems.push(`${where}: internal link "${href}" does not match a route this site serves`);
      continue;
    }

    if (shape?.kind === "guide" && !context.guidePaths.has(clean)) {
      problems.push(`${where}: internal link "${href}" points at a guide that does not exist`);
    }
    if (shape?.kind === "artist" && !context.artistSlugs.has(clean.split("/")[2])) {
      problems.push(`${where}: internal link "${href}" points at an unknown artist slug`);
    }
    if (shape?.kind === "blog-tag" && !context.tags.has(clean.split("/")[3])) {
      problems.push(`${where}: internal link "${href}" points at a tag no published post carries`);
    }
    if (shape?.kind === "blog-post") {
      const slug = clean.split("/")[2];
      if (!context.slugs.has(slug)) {
        problems.push(`${where}: internal link "${href}" points at a blog post that does not exist`);
      } else if (post.status === "published" && !context.publishedSlugs.has(slug)) {
        // A draft has no route, so a published post linking to one ships a 404.
        problems.push(`${where}: internal link "${href}" points at a draft post — publish it, or drop the link`);
      }
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
  const publishedPosts = posts.filter((post) => post.status === "published");
  const context = {
    ...(await loadContext()),
    slugs: new Set(posts.map((post) => post.slug)),
    publishedSlugs: new Set(publishedPosts.map((post) => post.slug)),
    // Only tags a published post carries have a route to link to.
    tags: new Set(publishedPosts.flatMap((post) => post.tags))
  };

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

  // Regression: the browser editor serializes with the `yaml` package at its
  // default lineWidth of 80, so every `description` and `summary` it writes is
  // folded across lines. An earlier parser threw on the continuation line,
  // which would have failed the build on the first post authored through
  // /admin. This is exactly the byte layout that editor produces.
  const cmsAuthored = parseFrontMatter(
    [
      "title: Why ticket fees appear so late in checkout",
      "description: A full sentence description that comfortably clears the fifty",
      "  character floor for search snippets.",
      "summary: One or two sentences shown on the blog index card and used as the page",
      "  lead paragraph at the top.",
      "date: 2026-08-14",
      "status: published",
      "tags:",
      "  - ticket-prices",
      "sources:",
      "  - label: Provider fee schedule",
      "    url: https://example.com/fees"
    ].join("\n")
  );
  assert(
    cmsAuthored.description === "A full sentence description that comfortably clears the fifty character floor for search snippets.",
    "a folded plain scalar rejoins into one line"
  );
  assert(
    cmsAuthored.summary === "One or two sentences shown on the blog index card and used as the page lead paragraph at the top.",
    "a second folded scalar does not bleed into the next key"
  );
  assert(cmsAuthored.date === "2026-08-14" && cmsAuthored.status === "published", "keys after a folded scalar still parse");
  assert(cmsAuthored.tags.length === 1 && cmsAuthored.tags[0] === "ticket-prices", "a sequence after a folded scalar parses");
  assert(cmsAuthored.sources[0].url === "https://example.com/fees", "an object sequence after a folded scalar parses");

  const foldedInList = parseFrontMatter(
    ["sources:", "  - label: A label long enough that the serializer wraps it onto", "      a second line", "    url: https://example.com/x"].join("\n")
  );
  assert(
    foldedInList.sources[0].label === "A label long enough that the serializer wraps it onto a second line",
    "a folded value inside a sequence item rejoins"
  );
  assert(foldedInList.sources[0].url === "https://example.com/x", "a sibling key after a folded value inside a sequence item parses");

  const blockScalars = parseFrontMatter(["a: >-", "  folded over", "  two lines", "b: |-", "  literal", "  lines"].join("\n"));
  assert(blockScalars.a === "folded over two lines", "a folded block scalar joins with spaces");
  assert(blockScalars.b === "literal\nlines", "a literal block scalar keeps its newlines");

  const flushSequence = parseFrontMatter("tags:\n- one\n- two\nstatus: published");
  assert(flushSequence.tags.length === 2 && flushSequence.status === "published", "a sequence at the key's own indent parses");

  // A cleared optional date must read as absent, not as the string "null".
  const cleared = parseFrontMatter("updated: null\nother: ~");
  assert(cleared.updated === "" && cleared.other === "", "YAML null spellings read as empty");

  let threw = false;
  try {
    parseFrontMatter("  stray: value");
  } catch (error) {
    threw = true;
  }
  assert(threw, "unsupported indentation raises rather than silently dropping a field");

  threw = false;
  try {
    parseFrontMatter("title: ok\n\tstray: value");
  } catch (error) {
    threw = true;
  }
  assert(threw, "tab indentation raises with a clear message");

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

  const context = {
    guidePaths: new Set(["/guides/known"]),
    artistSlugs: new Set(["known-artist"]),
    slugs: new Set(["a-post", "a-draft"]),
    publishedSlugs: new Set(["a-post"]),
    tags: new Set(["known-tag"])
  };
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
  assert(offSite.some((problem) => /does not match a route this site serves/.test(problem)), "a link outside the published routes fails validation");

  const longTitle = validatePost({ ...base, seoTitle: `${"x".repeat(60)}${TITLE_SUFFIX}` }, context);
  assert(longTitle.some((problem) => /search title/.test(problem)), "an over-budget search title fails validation");

  const withImage = validatePost({ ...base, sections: [{ type: "section", title: "H", content: "![alt](/assets/blog/x.png)" }] }, context);
  assert(withImage.some((problem) => /images are not supported/.test(problem)), "an embedded image fails validation");

  const draftLink = validatePost({ ...base, sections: [{ type: "section", title: "H", content: "See [it](/blog/a-draft)." }] }, context);
  assert(draftLink.some((problem) => /draft post/.test(problem)), "a published post linking to a draft fails validation");

  const okDraftLink = validatePost(
    { ...base, status: "draft", sections: [{ type: "section", title: "H", content: "See [it](/blog/a-draft)." }] },
    context
  );
  assert(!okDraftLink.some((problem) => /draft post/.test(problem)), "a draft may link to another draft");

  const badTag = validatePost({ ...base, sections: [{ type: "section", title: "H", content: "See [it](/blog/tags/nope)." }] }, context);
  assert(badTag.some((problem) => /tag no published post carries/.test(problem)), "a link to an unused tag fails validation");

  const goodTag = validatePost({ ...base, sections: [{ type: "section", title: "H", content: "See [it](/blog/tags/known-tag)." }] }, context);
  assert(goodTag.length === 0, "a link to a real tag validates clean");

  // A date that is shaped right but does not exist. JavaScript rolls 2026-02-30
  // over to 2 March, so the visible byline and the stored metadata would
  // disagree about the publication date.
  assert(!isCalendarDate("2026-02-30"), "30 February is not a calendar date");
  assert(!isCalendarDate("2026-13-01") && !isCalendarDate("2026-00-10"), "impossible months are rejected");
  assert(isCalendarDate("2026-02-28") && isCalendarDate("2028-02-29"), "real dates including a leap day are accepted");
  const impossibleDate = validatePost({ ...base, datePublished: "2026-02-30" }, context);
  assert(impossibleDate.some((problem) => /real YYYY-MM-DD calendar date/.test(problem)), "an impossible date fails validation");

  // Prefix matching accepted paths with extra segments that the router 404s.
  for (const dead of ["/artists/known-artist/bogus", "/blog/a-post/extra", "/cities/london/extra", "/guides/known/deeper"]) {
    const result = validatePost({ ...base, sections: [{ type: "section", title: "H", content: `See [it](${dead}).` }] }, context);
    assert(result.some((problem) => /does not match a route this site serves/.test(problem)), `"${dead}" fails validation`);
  }
  const okShapes = validatePost(
    { ...base, sections: [{ type: "section", title: "H", content: "A [g](/guides/known), [a](/artists/known-artist), [c](/cities/london) and [t](/about)." }] },
    context
  );
  assert(okShapes.length === 0, "well-shaped internal links of every allowed family validate clean");

  // The validator strips a query/fragment before resolving, so the renderer has
  // to accept them or the link ships as raw Markdown.
  const withFragment = validatePost({ ...base, sections: [{ type: "section", title: "H", content: "See [it](/about#corrections)." }] }, context);
  assert(withFragment.length === 0, "a fragment on an allowed route validates clean");
  const withAmpersand = validatePost({ ...base, sections: [{ type: "section", title: "H", content: "See [it](/about?a=1&b=2)." }] }, context);
  assert(withAmpersand.some((problem) => /contains "&"/.test(problem)), "an ampersand in a link fails validation");

  assert(!isUsableHttpsUrl("https://") && !isUsableHttpsUrl("https://not a URL"), "a hostless https string is not a usable URL");
  assert(!isUsableHttpsUrl("http://example.com"), "plain http is not a usable source URL");
  assert(isUsableHttpsUrl("https://example.com/a"), "a real https URL is usable");
  const badSource = validatePost({ ...base, sources: [{ label: "L", url: "https://" }] }, context);
  assert(badSource.some((problem) => /parseable https URL with a hostname/.test(problem)), "an unparseable source URL fails validation");

  const repeatedTag = validatePost({ ...base, tags: ["fees", "fees"] }, context);
  assert(repeatedTag.some((problem) => /"tags" repeats/.test(problem)), "a repeated tag fails validation");

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

// Only act when invoked as a command. Without this guard, importing the module
// for one of its exported helpers (a test, a future tool) would silently run a
// full build and rewrite public/data/blog-content.json as a side effect.
const invokedDirectly =
  Boolean(process.argv[1]) && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (SELF_TEST) {
  selfTest();
} else if (invokedDirectly) {
  await run();
}
