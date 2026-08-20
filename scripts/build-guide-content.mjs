#!/usr/bin/env node
// Compile content/guides/*.md into the two artefacts the site actually reads.
//
// WHY A COMPILE STEP
// ------------------
// Cloudflare Pages serves public/ with no build, and a Pages Function cannot
// list a directory, so nothing at runtime can discover Markdown. The generated
// files are the runtime contract; the Markdown is the thing a human edits.
//
// OUTPUTS (both generated — never hand-edit either)
//   public/data/guides-content.json     the prose, sources and JSON-LD the
//                                       router renders. Shape unchanged from
//                                       the hand-maintained file it replaces.
//   functions/_guide-routes.generated.js  GUIDE_ROUTES (published guides only)
//                                       plus the router's standalone
//                                       EVENT_PRICE_GUIDE_FALLBACK literal.
//
// INPUTS
//   content/guides/*.md                 human-authored, editable at /admin
//   data/guide-order.json               human-authored display order, kept out
//                                       of the CMS so an editor cannot reorder
//                                       the homepage by saving a guide
//   data/content-provenance.json        machine-owned: each guide's lastmod and
//                                       its immutable first-publication date
//   data/guide-source-link-checks.json  machine-owned: when each citation's URL
//                                       last resolved (automation only)
//
// WHAT IS DELIBERATELY NOT IN THE MARKDOWN
//   last_modified  — provenance state owns it (scripts/sync-content-provenance.mjs).
//                    Keeping it out means a CMS save never has to be rewritten
//                    by automation, and an editor cannot assert a review that
//                    did not happen.
//   linkCheckedAt  — automation owns it, in the sidecar above. An editor can
//                    neither set it nor clear it.
//
// A draft guide is absent from both outputs, so it has no route, no sitemap
// entry, no llms.txt line and no internal link — the same gate the blog uses.
//
// MODES
//   (default)    validate and rewrite both generated files
//   --check      validate and fail if either committed file is stale (CI guard)
//   --self-test  unit-test the validators and the emitters (no file writes)
//
// This script never reaches the network and never reads or writes event,
// artist, catalog, provider, pricing or affiliate data.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
  ISO_DATE_PATTERN,
  SLUG_PATTERN,
  bodyToSections,
  countWords,
  isCalendarDate,
  isUsableHttpsUrl,
  markdownLinks,
  splitDocument
} from "./lib/content-markdown.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = path.join(root, "content", "guides");
const GUIDES_JSON_PATH = path.join(root, "public", "data", "guides-content.json");
const ROUTES_MODULE_PATH = path.join(root, "functions", "_guide-routes.generated.js");
const PROVENANCE_PATH = path.join(root, "data", "content-provenance.json");
const LINK_CHECKS_PATH = path.join(root, "data", "guide-source-link-checks.json");
const ORDER_PATH = path.join(root, "data", "guide-order.json");
const ROUTE_METADATA_PATH = path.join(root, "functions", "_route-metadata.js");

const GUIDES_JSON_REL = "public/data/guides-content.json";
const ROUTES_MODULE_REL = "functions/_guide-routes.generated.js";

const CHECK_MODE = process.argv.includes("--check");
const SELF_TEST = process.argv.includes("--self-test");

// Search-result display budgets, mirrored from functions/_route-metadata.js so
// an author is told at authoring time rather than by the link audit at the end
// of a CI run.
const TITLE_LENGTH_LIMIT = 60;
const META_DESCRIPTION_LENGTH_LIMIT = 160;
const TITLE_SUFFIX = " | TourTicketCompare";

// scripts/audit-internal-links.mjs fails the build on a guide with fewer than
// two reviewed sources, no FAQPage schema, or under 700 *rendered* words. The
// source checks below are the early warning for the same rules, so an author is
// told by the file they just edited rather than by a crawled route minutes later.
//
// MIN_PUBLISHED_WORDS is deliberately lower than the audit's 700. The audit
// counts every visible word on the page — heading, lead, byline, sources list,
// the artist-browse block — while this counts body prose only, so the two are
// not the same measure. The shortest guide in the corpus has 515 body words and
// passes the rendered audit comfortably. A floor of 450 catches a stub without
// rejecting real guides; the authoritative 700-word gate stays where it is, in
// `npm run validate:internal-links` inside test:mvp.
const MIN_SOURCES = 2;
const MIN_PUBLISHED_WORDS = 450;

// The router keeps a standalone copy of this guide's metadata so the page still
// renders when the GUIDE_ROUTES entry is missing. It is therefore not an
// ordinary guide: it cannot be drafted, renamed, deleted or redirected away
// through the CMS, and the build refuses any of those rather than emitting a
// fallback for a page that no longer exists.
const PROTECTED_SLUGS = new Set(["how-to-compare-event-ticket-prices"]);

// The two guides that carried a hand-authored Article JSON-LD object before this
// pipeline existed. Inert at runtime — functions/[[path]].js emits only @type
// HowTo from authored schema — but carried through verbatim so the migration
// changes no byte of published output. No other guide may acquire one, and
// removing these is a separate, deliberate change rather than a migration
// side-effect.
const LEGACY_ARTICLE_SLUGS = new Set(["how-to-avoid-ticket-scams", "how-to-avoid-overpaying-for-concert-tickets"]);

const ALLOWED_KEYS = new Set([
  "title",
  "h1",
  "description",
  "status",
  "date_published",
  "sources",
  "howto",
  "legacy_article_headline",
  "legacy_article_description"
]);
const REQUIRED_KEYS = ["title", "h1", "description"];
const ALLOWED_STATUS = new Set(["published", "draft"]);
const ALLOWED_SOURCE_KEYS = new Set(["name", "publisher", "url", "last_checked"]);
const ALLOWED_HOWTO_KEYS = new Set(["name", "description", "steps"]);
const ALLOWED_STEP_KEYS = new Set(["name", "text"]);

// Route shapes a guide body may link to, as complete patterns. Guides link to
// each other, to the artist index and to the comparison hub; city and venue
// routes are calendar-dependent and are not linkable from evergreen copy.
const INTERNAL_LINK_SHAPES = [
  { pattern: /^\/guides\/[a-z0-9-]+$/, kind: "guide" },
  { pattern: /^\/artists\/[a-z0-9-]+$/, kind: "artist" },
  { pattern: /^\/blog\/[a-z0-9-]+$/, kind: "blog-post" }
];
const INTERNAL_LINK_EXACT = new Set([
  "/",
  "/artists",
  "/guides",
  "/blog",
  "/compare-concert-ticket-prices",
  "/how-it-works",
  "/currency-converter",
  "/about",
  "/contact",
  "/editorial-policy",
  "/affiliate-disclosure"
]);

// Claims the site is structurally unable to support (SAFE_PUBLISHING_RULES.md →
// Price Display). A blunt substring match on purpose: rephrase rather than work
// around it.
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

/**
 * Sentences already published, reviewed, and found not to make the claim the
 * pattern is looking for.
 *
 * Matching is exact on BOTH the guide slug and the complete sentence. A
 * substring or pattern-level exemption would licence the phrase across the
 * whole site; this licences three specific sentences in two specific files and
 * nothing else. Reword one of them and it stops being exempt, which is the
 * intended behaviour — the review attaches to the words, not to the guide.
 *
 * Adding an entry is a code change and therefore a reviewed one. Do not add a
 * fourth without the same review.
 */
const REVIEWED_CLAIM_EXEMPTIONS = [
  {
    slug: "ticketmaster-vs-seatgeek-vs-vivid-seats",
    sentence:
      "The comparison does not claim equivalent seats, live inventory, final checkout totals, or guaranteed availability.",
    reason: "Disclaimer: the sentence denies the claim the pattern looks for, in the words the pattern matches."
  },
  {
    slug: "ticketnetwork-vs-ticketmaster",
    sentence:
      "A show that is sold out on the primary can still have listings here, and that is the ordinary case rather than a red flag.",
    reason: "Describes the primary market's state on another platform; asserts nothing about this site's inventory data."
  },
  {
    slug: "ticketnetwork-vs-ticketmaster",
    sentence: "**Why does TicketNetwork have tickets when Ticketmaster is sold out?**",
    reason: "An FAQ question about another platform's state, in the visitor's own words. Same claim boundary as the sentence above."
  }
];

/**
 * Split scanned copy into sentences for exemption matching.
 *
 * Line-first, because a Markdown bullet or a bold FAQ question is a sentence
 * whether or not it ends in a full stop, and a whole-block splitter would join
 * a list item to its neighbour and never match an exemption again.
 */
export function toSentences(text) {
  return String(text || "")
    .split("\n")
    .flatMap((line) => line.split(/(?<=[.?!])\s+/))
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

export function isExemptSentence(slug, sentence) {
  return REVIEWED_CLAIM_EXEMPTIONS.some((entry) => entry.slug === slug && entry.sentence === sentence);
}

/**
 * The SERP title for a guide: the authored title plus the site suffix when the
 * pair fits the 60-character budget, and the authored title alone when it does
 * not. Deterministic, so the field an author edits is the words they wrote.
 */
export function seoTitleFor(title) {
  const base = String(title ?? "").trim();
  const suffixed = `${base}${TITLE_SUFFIX}`;
  return suffixed.length <= TITLE_LENGTH_LIMIT ? suffixed : base;
}

// ---------------------------------------------------------------------------
// Parsing
// ---------------------------------------------------------------------------

function asList(value) {
  return Array.isArray(value) ? value : [];
}

function trimmed(value) {
  return String(value ?? "").trim();
}

export function normalizeGuide(file, source) {
  const { frontMatter, body } = splitDocument(source);
  const slug = path.basename(file, ".md");
  const howto = frontMatter.howto && typeof frontMatter.howto === "object" ? frontMatter.howto : null;

  return {
    file: `content/guides/${file}`,
    frontMatter,
    slug,
    path: `/guides/${slug}`,
    title: trimmed(frontMatter.title),
    h1: trimmed(frontMatter.h1),
    description: trimmed(frontMatter.description),
    status: trimmed(frontMatter.status) || "draft",
    datePublished: trimmed(frontMatter.date_published),
    sources: asList(frontMatter.sources)
      .filter((entry) => entry && typeof entry === "object")
      .map((entry) => ({
        raw: entry,
        name: trimmed(entry.name),
        publisher: trimmed(entry.publisher),
        url: trimmed(entry.url),
        lastChecked: trimmed(entry.last_checked)
      })),
    howto: howto
      ? {
          raw: howto,
          name: trimmed(howto.name),
          description: trimmed(howto.description),
          steps: asList(howto.steps)
            .filter((step) => step && typeof step === "object")
            .map((step) => ({ raw: step, name: trimmed(step.name), text: trimmed(step.text) }))
        }
      : null,
    legacyArticleHeadline: trimmed(frontMatter.legacy_article_headline),
    legacyArticleDescription: trimmed(frontMatter.legacy_article_description),
    sections: bodyToSections(body),
    wordCount: countWords(body)
  };
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

export function validateGuide(guide, context) {
  const problems = [];
  const where = guide.file;
  const published = guide.status === "published";
  const ledgerDate = context.ledger[guide.path]?.date_published || "";
  const previouslyPublished = Boolean(ledgerDate);

  for (const key of Object.keys(guide.frontMatter)) {
    if (!ALLOWED_KEYS.has(key)) {
      problems.push(`${where}: unknown front-matter key "${key}" (allowed: ${[...ALLOWED_KEYS].join(", ")})`);
    }
  }
  for (const key of REQUIRED_KEYS) {
    if (!trimmed(guide.frontMatter[key])) problems.push(`${where}: missing required front-matter key "${key}"`);
  }
  if (!SLUG_PATTERN.test(guide.slug)) {
    problems.push(`${where}: filename must be a lowercase hyphenated slug (got "${guide.slug}")`);
  }
  if (!ALLOWED_STATUS.has(guide.status)) {
    problems.push(`${where}: "status" must be one of ${[...ALLOWED_STATUS].join(", ")} (got "${guide.status}")`);
  }

  // --- dates -------------------------------------------------------------
  if (guide.datePublished && !isCalendarDate(guide.datePublished)) {
    problems.push(`${where}: "date_published" must be a real YYYY-MM-DD calendar date (got "${guide.datePublished}")`);
  }
  if (published && !guide.datePublished) {
    problems.push(
      `${where}: a guide cannot be published without "date_published". A never-published draft may omit it; publishing is what fixes it.`
    );
  }
  if (previouslyPublished && guide.datePublished && guide.datePublished !== ledgerDate) {
    problems.push(
      `${where}: "date_published" is immutable once a guide has been published. ` +
        `data/content-provenance.json records ${ledgerDate}; this file says ${guide.datePublished}. ` +
        `Restore the recorded date, or correct the ledger in a reviewed commit if the recorded date is genuinely wrong.`
    );
  }

  // --- withdrawal --------------------------------------------------------
  // A previously published path that stops being served is a live URL going
  // 404. Draft it, rename it or delete it and the build demands an explicit
  // redirect decision, which lives in OLD_GUIDE_REDIRECTS — outside the CMS.
  if (previouslyPublished && !published) {
    const redirect = context.redirects[guide.path];
    if (!redirect) {
      problems.push(
        `${where}: /guides/${guide.slug} has been published before, so setting status: draft would 404 a live URL. ` +
          `Add an OLD_GUIDE_REDIRECTS entry for "${guide.path}" in functions/_route-metadata.js pointing at the guide that replaces it, or republish.`
      );
    } else if (!context.publishedPaths.has(redirect)) {
      problems.push(`${where}: OLD_GUIDE_REDIRECTS sends "${guide.path}" to "${redirect}", which is not a published guide`);
    }
  }

  // --- the protected guide ----------------------------------------------
  if (PROTECTED_SLUGS.has(guide.slug) && !published) {
    problems.push(
      `${where}: /guides/${guide.slug} is referenced by the router's standalone EVENT_PRICE_GUIDE_FALLBACK and must stay published. ` +
        `It cannot be drafted, renamed or deleted through the CMS.`
    );
  }

  // --- search budgets ----------------------------------------------------
  if (guide.h1.length > 70) problems.push(`${where}: "h1" is ${guide.h1.length} characters; keep the on-page H1 under 70`);
  const seoTitle = seoTitleFor(guide.title);
  if (seoTitle.length > TITLE_LENGTH_LIMIT) {
    problems.push(`${where}: search title is ${seoTitle.length} characters (limit ${TITLE_LENGTH_LIMIT}). Shorten "title".`);
  }
  if (guide.description.length > META_DESCRIPTION_LENGTH_LIMIT) {
    problems.push(`${where}: "description" is ${guide.description.length} characters (limit ${META_DESCRIPTION_LENGTH_LIMIT})`);
  }
  if (guide.description && guide.description.length < 50) {
    problems.push(`${where}: "description" is ${guide.description.length} characters; write a full sentence (50+) for the search snippet`);
  }

  // --- body --------------------------------------------------------------
  if (!guide.sections.length) problems.push(`${where}: the guide body is empty`);
  if (!guide.sections.some((section) => section.type === "section")) {
    problems.push(`${where}: the body needs at least one "## " section heading`);
  }
  if (guide.sections.length && guide.sections[0].type !== "intro") {
    problems.push(`${where}: the body must open with a paragraph before the first "## " heading`);
  }
  const sectionTitles = guide.sections.filter((section) => section.title).map((section) => section.title);
  const duplicateTitles = [...new Set(sectionTitles.filter((title, index) => sectionTitles.indexOf(title) !== index))];
  if (duplicateTitles.length) {
    problems.push(`${where}: repeated section heading(s) ${duplicateTitles.map((title) => `"${title}"`).join(", ")}`);
  }

  const bodyText = guide.sections.map((section) => `${section.title || ""}\n${section.content}`).join("\n");
  if (/!\[[^\]]*\]\([^)]*\)/.test(bodyText)) {
    problems.push(`${where}: embedded images are not supported by the renderer — remove the ![...](...) and describe it in prose`);
  }
  if (published) {
    if (guide.wordCount < MIN_PUBLISHED_WORDS) {
      problems.push(
        `${where}: ${guide.wordCount} body words; a published guide needs ${MIN_PUBLISHED_WORDS}+ here, and 700+ rendered words to clear scripts/audit-internal-links.mjs`
      );
    }
    if (!faqEntriesFrom(guide.sections).length) {
      problems.push(
        `${where}: a published guide needs an "## FAQ" section of **bold questions** followed by plain answers — ` +
          `the router derives its FAQPage structured data from it, and the link audit requires that schema`
      );
    }
  }

  // --- links -------------------------------------------------------------
  for (const { href } of markdownLinks(bodyText)) {
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
    if (shape?.kind === "guide") {
      if (!context.allPaths.has(clean)) {
        problems.push(`${where}: internal link "${href}" points at a guide that does not exist`);
      } else if (published && !context.publishedPaths.has(clean)) {
        problems.push(`${where}: internal link "${href}" points at a draft guide — publish it, or drop the link`);
      }
    }
    if (shape?.kind === "artist" && !context.artistSlugs.has(clean.split("/")[2])) {
      problems.push(`${where}: internal link "${href}" points at an unknown artist slug`);
    }
  }

  // --- sources -----------------------------------------------------------
  if (published && guide.sources.length < MIN_SOURCES) {
    problems.push(`${where}: a published guide needs at least ${MIN_SOURCES} reviewed primary sources (has ${guide.sources.length})`);
  }
  const seenSourceUrls = new Set();
  for (const source of guide.sources) {
    for (const key of Object.keys(source.raw)) {
      if (!ALLOWED_SOURCE_KEYS.has(key)) {
        problems.push(
          `${where}: unknown key "${key}" on source "${source.name || "(unnamed)"}" (allowed: ${[...ALLOWED_SOURCE_KEYS].join(", ")}). ` +
            `"linkCheckedAt" is automation-owned and belongs in data/guide-source-link-checks.json, not here.`
        );
      }
    }
    if (!source.name) problems.push(`${where}: every source needs a "name"`);
    if (!source.publisher) problems.push(`${where}: source "${source.name || "(unnamed)"}" needs a "publisher"`);
    if (!isUsableHttpsUrl(source.url)) {
      problems.push(`${where}: source "${source.name || "(unnamed)"}" needs a parseable https URL with a hostname (got "${source.url}")`);
    }
    if (!isCalendarDate(source.lastChecked)) {
      problems.push(`${where}: source "${source.name || "(unnamed)"}" needs a "last_checked" YYYY-MM-DD date (a human read it)`);
    }
    if (source.url && seenSourceUrls.has(source.url)) {
      problems.push(`${where}: source URL "${source.url}" is cited twice`);
    }
    seenSourceUrls.add(source.url);
  }

  // --- structured data ---------------------------------------------------
  if (guide.howto) {
    for (const key of Object.keys(guide.howto.raw)) {
      if (!ALLOWED_HOWTO_KEYS.has(key)) problems.push(`${where}: unknown "howto" key "${key}"`);
    }
    if (!guide.howto.name) problems.push(`${where}: "howto.name" is required when a howto is present`);
    if (!guide.howto.description) problems.push(`${where}: "howto.description" is required when a howto is present`);
    if (guide.howto.steps.length < 2) problems.push(`${where}: a howto needs at least two steps`);
    for (const step of guide.howto.steps) {
      for (const key of Object.keys(step.raw)) {
        if (!ALLOWED_STEP_KEYS.has(key)) problems.push(`${where}: unknown "howto.steps[].${key}"`);
      }
      if (!step.name) problems.push(`${where}: every howto step needs a "name"`);
      if (!step.text) problems.push(`${where}: howto step "${step.name || "(unnamed)"}" needs a "text"`);
    }
    // Schema may not out-run the page: a step has to correspond to something a
    // visitor can actually read.
    if (guide.howto.steps.length > guide.sections.filter((section) => section.type === "section").length) {
      problems.push(`${where}: the howto claims ${guide.howto.steps.length} steps but the body has fewer "## " sections`);
    }
  }
  const hasLegacyHeadline = Boolean(guide.legacyArticleHeadline);
  const hasLegacyDescription = Boolean(guide.legacyArticleDescription);
  if (hasLegacyHeadline !== hasLegacyDescription) {
    problems.push(`${where}: legacy_article_headline and legacy_article_description must be set together or not at all`);
  }
  if (hasLegacyHeadline && !context.legacyArticleSlugs.has(guide.slug)) {
    problems.push(
      `${where}: legacy_article_* carries an Article JSON-LD object that predates this pipeline and is inert at runtime. ` +
        `No new guide may acquire one.`
    );
  }
  if (hasLegacyHeadline && guide.howto) {
    problems.push(`${where}: a guide cannot carry both a howto and a legacy Article object`);
  }

  // --- claims ------------------------------------------------------------
  const scanned = `${guide.title}\n${guide.h1}\n${guide.description}\n${bodyText}`;
  for (const sentence of toSentences(scanned)) {
    for (const [pattern, reason] of BANNED_CLAIM_PATTERNS) {
      const hit = sentence.match(pattern);
      if (!hit) continue;
      if (isExemptSentence(guide.slug, sentence)) continue;
      problems.push(`${where}: "${hit[0]}" reads as ${reason} (SAFE_PUBLISHING_RULES.md) in: ${sentence}`);
    }
  }

  return problems;
}

/**
 * Withdrawal check for paths that have no file at all any more — a rename or a
 * delete. The per-guide check above cannot see these, because there is nothing
 * left to iterate.
 */
export function validateWithdrawals(context) {
  const problems = [];
  for (const [routePath, entry] of Object.entries(context.ledger)) {
    if (!entry?.date_published) continue;
    if (context.allPaths.has(routePath)) continue;
    const slug = routePath.replace(/^\/guides\//, "");
    if (PROTECTED_SLUGS.has(slug)) {
      problems.push(
        `${routePath} has been removed, but it is referenced by the router's standalone EVENT_PRICE_GUIDE_FALLBACK and cannot be renamed or deleted. Restore content/guides/${slug}.md.`
      );
      continue;
    }
    const redirect = context.redirects[routePath];
    if (!redirect) {
      problems.push(
        `${routePath} was published (data/content-provenance.json records ${entry.date_published}) and its Markdown is gone. ` +
          `A removed or renamed guide needs an explicit redirect decision: add OLD_GUIDE_REDIRECTS["${routePath}"] in functions/_route-metadata.js.`
      );
    } else if (!context.publishedPaths.has(redirect)) {
      problems.push(`OLD_GUIDE_REDIRECTS sends "${routePath}" to "${redirect}", which is not a published guide`);
    }
  }
  for (const routePath of Object.keys(context.redirects)) {
    if (context.publishedPaths.has(routePath)) {
      problems.push(`OLD_GUIDE_REDIRECTS source "${routePath}" collides with a published guide of the same path`);
    }
  }
  return problems;
}

// ---------------------------------------------------------------------------
// Emitters
// ---------------------------------------------------------------------------

/**
 * The FAQ entries the router will derive from the visible body. Mirrors
 * guideFaqEntries() in functions/[[path]].js so the build can require the
 * structured data to exist before the page ships.
 */
export function faqEntriesFrom(sections) {
  const faqSection = asList(sections).find((section) => /^faq\b/i.test(trimmed(section?.title)));
  if (!faqSection) return [];
  const entries = [];
  let current = null;
  for (const block of String(faqSection.content || "").split(/\n{2,}/)) {
    const text = block.trim();
    const question = text.match(/^\*\*(.+?)\*\*$/);
    if (question) {
      current = { question: question[1], answers: [] };
      entries.push(current);
    } else if (current && text) {
      current.answers.push(text);
    }
  }
  return entries.filter((entry) => entry.answers.length);
}

export function schemaFor(guide) {
  if (guide.howto) {
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: guide.howto.name,
      description: guide.howto.description,
      step: guide.howto.steps.map((step) => ({ "@type": "HowToStep", name: step.name, text: step.text }))
    };
  }
  if (guide.legacyArticleHeadline) {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.legacyArticleHeadline,
      description: guide.legacyArticleDescription
    };
  }
  return null;
}

/**
 * One guide's entry in public/data/guides-content.json. Key order is fixed so a
 * rebuild with unchanged content is byte-identical and --check stays a
 * meaningful staleness test.
 */
export function toContentEntry(guide, linkChecks) {
  const checked = linkChecks[guide.slug] || {};
  const entry = {
    sections: guide.sections,
    sources: guide.sources.map((source) => {
      const record = { name: source.name, publisher: source.publisher, url: source.url, lastChecked: source.lastChecked };
      if (checked[source.url]) record.linkCheckedAt = checked[source.url];
      return record;
    })
  };
  const schema = schemaFor(guide);
  if (schema) entry.schema = schema;
  return entry;
}

export function toRouteEntry(guide, lastmod) {
  return {
    title: seoTitleFor(guide.title),
    h1: guide.h1,
    description: guide.description,
    fullContent: true,
    datePublished: guide.datePublished,
    lastmod: lastmod || guide.datePublished
  };
}

/**
 * Order published guides for GUIDE_ROUTES.
 *
 * The order is load-bearing public output: the sitemap, llms.txt, the "More
 * guides" block on /guides and the six cards on the homepage all read it in
 * sequence. It is therefore human-owned, in data/guide-order.json, and kept out
 * of the CMS so that saving a guide cannot reorder the homepage. Anything not
 * listed is appended in slug order, which is where a newly created guide lands.
 */
export function orderGuides(guides, order) {
  const bySlug = new Map(guides.map((guide) => [guide.slug, guide]));
  const ordered = [];
  for (const slug of order) {
    const guide = bySlug.get(slug);
    if (guide) {
      ordered.push(guide);
      bySlug.delete(slug);
    }
  }
  return [...ordered, ...[...bySlug.values()].sort((a, b) => a.slug.localeCompare(b.slug))];
}

function serializeJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

/**
 * Emit functions/_guide-routes.generated.js.
 *
 * Formatting is not cosmetic. scripts/sync-content-provenance.mjs fingerprints
 * each route by extracting its entry, dropping the datePublished/lastmod lines
 * and collapsing whitespace, so every property must sit on its own line and the
 * key order must not move — otherwise a guide's published date would appear to
 * change when nothing about its copy did.
 */
export function renderRoutesModule(entries, fallbackPath, fallbackEntry) {
  const renderEntry = (entry, indent) => {
    const pad = " ".repeat(indent);
    return [
      `${pad}title: ${JSON.stringify(entry.title)},`,
      `${pad}h1: ${JSON.stringify(entry.h1)},`,
      `${pad}description: ${JSON.stringify(entry.description)},`,
      `${pad}fullContent: true,`,
      `${pad}datePublished: ${JSON.stringify(entry.datePublished)},`,
      `${pad}lastmod: ${JSON.stringify(entry.lastmod)}`
    ].join("\n");
  };

  const routeBlocks = entries
    .map(([routePath, entry]) => `  ${JSON.stringify(routePath)}: {\n${renderEntry(entry, 4)}\n  }`)
    .join(",\n");

  return `// GENERATED FILE — DO NOT EDIT.
//
// Written by scripts/build-guide-content.mjs from content/guides/*.md, the
// display order in data/guide-order.json, and the machine-owned dates in
// data/content-provenance.json. Edit the Markdown (or /admin) and run
// \`npm run guides:build\`; \`npm run guides:check\` fails a stale commit.
//
// Only PUBLISHED guides appear here. A draft has no entry, and therefore no
// route, no sitemap entry and no llms.txt line — the absence is the gate.
//
// \`lastmod\` is not authored anywhere. scripts/sync-content-provenance.mjs
// fingerprints each guide's compiled copy and advances the date only when that
// fingerprint changes, so a reformat, a dependency bump, a nightly link check
// or the calendar moving can never touch it.

export const GUIDE_ROUTES = {
${routeBlocks}
};

// The router renders this guide from a standalone literal when its GUIDE_ROUTES
// entry is missing, so Googlebot never sees a transient 404 or a page stripped
// of its provenance line. It is a separate binding on purpose: a malformed or
// absent entry above leaves this object intact. (It has never protected against
// the module failing to load — the router imports GUIDE_ROUTES at module scope,
// so that case took every route down before this file existed and still does.)
//
// scripts/route-metadata.test.mjs asserts every field here equals the
// GUIDE_ROUTES entry, and scripts/build-guide-content.mjs refuses to draft,
// rename or delete the guide, so the two cannot drift.
export const EVENT_PRICE_GUIDE_PATH = ${JSON.stringify(fallbackPath)};

export const EVENT_PRICE_GUIDE_FALLBACK = {
${renderEntry(fallbackEntry, 2)}
};
`;
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") return fallback;
    throw error;
  }
}

async function readGuides() {
  let files = [];
  try {
    files = (await fs.readdir(CONTENT_DIR)).filter((file) => file.endsWith(".md")).sort();
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    return { guides: [], problems: [`content directory content/guides does not exist`] };
  }
  const guides = [];
  const problems = [];
  for (const file of files) {
    const source = await fs.readFile(path.join(CONTENT_DIR, file), "utf8");
    try {
      guides.push(normalizeGuide(file, source));
    } catch (error) {
      problems.push(`content/guides/${file}: ${error.message}`);
    }
  }
  return { guides, problems };
}

export async function buildGuideOutputs({ write = true } = {}) {
  const { guides, problems } = await readGuides();
  const [provenance, linkChecksDoc, order, metadata, artists] = await Promise.all([
    readJson(PROVENANCE_PATH, { routes: {}, guide_publication: {} }),
    readJson(LINK_CHECKS_PATH, { guides: {} }),
    readJson(ORDER_PATH, { order: [] }),
    import(pathToFileURL(ROUTE_METADATA_PATH)),
    readJson(path.join(root, "public", "data", "artists.json"), [])
  ]);

  const publishedGuides = guides.filter((guide) => guide.status === "published");
  const context = {
    ledger: provenance.guide_publication && typeof provenance.guide_publication === "object" ? provenance.guide_publication : {},
    redirects: metadata.OLD_GUIDE_REDIRECTS || {},
    allPaths: new Set(guides.map((guide) => guide.path)),
    publishedPaths: new Set(publishedGuides.map((guide) => guide.path)),
    artistSlugs: new Set(asList(artists).map((artist) => trimmed(artist?.slug)).filter(Boolean)),
    legacyArticleSlugs: LEGACY_ARTICLE_SLUGS
  };

  for (const guide of guides) problems.push(...validateGuide(guide, context));
  problems.push(...validateWithdrawals(context));

  const listedOrder = asList(order.order).map((slug) => trimmed(slug));
  for (const slug of listedOrder) {
    if (!context.allPaths.has(`/guides/${slug}`)) {
      problems.push(`data/guide-order.json lists "${slug}", which has no content/guides/${slug}.md`);
    }
  }

  if (problems.length) {
    return { problems, guides, published: publishedGuides };
  }

  const linkChecks = linkChecksDoc.guides && typeof linkChecksDoc.guides === "object" ? linkChecksDoc.guides : {};
  const ordered = orderGuides(publishedGuides, listedOrder);

  const contentDocument = {};
  const routeEntries = [];
  for (const guide of ordered) {
    contentDocument[guide.path] = toContentEntry(guide, linkChecks);
    const lastmod = provenance.routes?.[guide.path]?.content_updated_at || guide.datePublished;
    routeEntries.push([guide.path, toRouteEntry(guide, lastmod)]);
  }

  const fallbackSlug = [...PROTECTED_SLUGS][0];
  const fallbackPath = `/guides/${fallbackSlug}`;
  const fallbackEntry = routeEntries.find(([routePath]) => routePath === fallbackPath)?.[1];
  if (!fallbackEntry) {
    return { problems: [`${fallbackPath} must be published — the router's standalone fallback is generated from it`], guides, published: publishedGuides };
  }

  const outputs = [
    [GUIDES_JSON_PATH, GUIDES_JSON_REL, serializeJson(contentDocument)],
    [ROUTES_MODULE_PATH, ROUTES_MODULE_REL, renderRoutesModule(routeEntries, fallbackPath, fallbackEntry)]
  ];

  const stale = [];
  for (const [absolute, relative, serialized] of outputs) {
    let current = "";
    try {
      current = await fs.readFile(absolute, "utf8");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    if (current !== serialized) stale.push(relative);
    if (write && current !== serialized) {
      await fs.mkdir(path.dirname(absolute), { recursive: true });
      await fs.writeFile(absolute, serialized, "utf8");
    }
  }

  return { problems: [], guides, published: publishedGuides, ordered, stale };
}

async function run() {
  const result = await buildGuideOutputs({ write: !CHECK_MODE });
  if (result.problems.length) {
    console.error(`guide content validation failed (${result.problems.length} problem${result.problems.length === 1 ? "" : "s"}):`);
    for (const problem of result.problems) console.error(`- ${problem}`);
    process.exit(1);
  }

  const drafts = result.guides.length - result.published.length;
  if (CHECK_MODE) {
    if (result.stale.length) {
      console.error(`STALE: ${result.stale.join(" and ")} do(es) not match content/guides. Run "npm run guides:build" and commit the result.`);
      process.exit(1);
    }
    console.log(`guide content check passed: ${result.published.length} published guide(s), ${drafts} draft(s).`);
    return;
  }
  console.log(
    `Wrote ${GUIDES_JSON_REL} and ${ROUTES_MODULE_REL}: ${result.published.length} published guide(s), ${drafts} draft(s).`
  );
}

// ---------------------------------------------------------------------------
// Self-test
// ---------------------------------------------------------------------------

let passed = 0;
function assert(condition, message) {
  if (!condition) {
    console.error(`SELF-TEST FAIL: ${message}`);
    process.exitCode = 1;
    return;
  }
  passed += 1;
}

function baseGuide(overrides = {}) {
  const sections = overrides.sections || [
    { type: "intro", content: "An opening paragraph that sets up the guide." },
    { type: "section", title: "First", content: "Body copy." },
    { type: "section", title: "Second", content: "More body copy." },
    { type: "section", title: "FAQ", content: "**A question?**\n\nAn answer." }
  ];
  return {
    file: "content/guides/example.md",
    frontMatter: { title: "T", h1: "H", description: "D" },
    slug: "example",
    path: "/guides/example",
    title: "Example guide",
    h1: "Example guide heading",
    description: "A description that is comfortably long enough to clear the fifty character floor for snippets.",
    status: "published",
    datePublished: "2026-06-01",
    sources: [
      { raw: {}, name: "One", publisher: "Pub", url: "https://example.org/a", lastChecked: "2026-06-01" },
      { raw: {}, name: "Two", publisher: "Pub", url: "https://example.org/b", lastChecked: "2026-06-01" }
    ],
    howto: null,
    legacyArticleHeadline: "",
    legacyArticleDescription: "",
    sections,
    wordCount: 900,
    ...overrides
  };
}

function baseContext(overrides = {}) {
  return {
    ledger: {},
    redirects: {},
    allPaths: new Set(["/guides/example"]),
    publishedPaths: new Set(["/guides/example"]),
    artistSlugs: new Set(["harry-styles"]),
    legacyArticleSlugs: new Set(["how-to-avoid-ticket-scams"]),
    ...overrides
  };
}

function selfTest() {
  // --- title rule --------------------------------------------------------
  assert(seoTitleFor("How to Compare Event Ticket Prices") === "How to Compare Event Ticket Prices | TourTicketCompare", "a short title takes the site suffix");
  assert(seoTitleFor("SeatGeek vs Ticketmaster: Which Is Cheaper or Better?") === "SeatGeek vs Ticketmaster: Which Is Cheaper or Better?", "a title that would overflow keeps the suffix off");

  // --- draft / publication / ledger --------------------------------------
  const newDraft = validateGuide(baseGuide({ status: "draft", datePublished: "" }), baseContext({ publishedPaths: new Set() }));
  assert(newDraft.length === 0, "a never-published draft may omit date_published");

  const publishedNoDate = validateGuide(baseGuide({ datePublished: "" }), baseContext());
  assert(publishedNoDate.some((problem) => /cannot be published without "date_published"/.test(problem)), "publishing without a date fails");

  const firstPublication = validateGuide(baseGuide(), baseContext());
  assert(firstPublication.length === 0, "a first publication with a date and no ledger entry validates clean");

  const movedDate = validateGuide(
    baseGuide({ datePublished: "2026-08-01" }),
    baseContext({ ledger: { "/guides/example": { date_published: "2026-06-01" } } })
  );
  assert(movedDate.some((problem) => /immutable once a guide has been published/.test(problem)), "changing a recorded date_published fails");

  const unchangedDate = validateGuide(baseGuide(), baseContext({ ledger: { "/guides/example": { date_published: "2026-06-01" } } }));
  assert(unchangedDate.length === 0, "a republish with the recorded date validates clean");

  // --- withdrawal --------------------------------------------------------
  const draftedWithoutRedirect = validateGuide(
    baseGuide({ status: "draft" }),
    baseContext({ ledger: { "/guides/example": { date_published: "2026-06-01" } }, publishedPaths: new Set() })
  );
  assert(
    draftedWithoutRedirect.some((problem) => /would 404 a live URL/.test(problem)),
    "published -> draft without a redirect fails"
  );

  const draftedWithRedirect = validateGuide(
    baseGuide({ status: "draft" }),
    baseContext({
      ledger: { "/guides/example": { date_published: "2026-06-01" } },
      redirects: { "/guides/example": "/guides/replacement" },
      publishedPaths: new Set(["/guides/replacement"])
    })
  );
  assert(draftedWithRedirect.length === 0, "published -> draft with a valid redirect validates clean");

  const draftedToDeadRedirect = validateGuide(
    baseGuide({ status: "draft" }),
    baseContext({
      ledger: { "/guides/example": { date_published: "2026-06-01" } },
      redirects: { "/guides/example": "/guides/missing" },
      publishedPaths: new Set()
    })
  );
  assert(draftedToDeadRedirect.some((problem) => /not a published guide/.test(problem)), "a redirect to a non-published guide fails");

  const renamedAway = validateWithdrawals(
    baseContext({
      ledger: { "/guides/old-name": { date_published: "2026-06-01" } },
      allPaths: new Set(["/guides/new-name"]),
      publishedPaths: new Set(["/guides/new-name"])
    })
  );
  assert(renamedAway.some((problem) => /needs an explicit redirect decision/.test(problem)), "a rename or delete without a redirect fails");

  const renamedWithRedirect = validateWithdrawals(
    baseContext({
      ledger: { "/guides/old-name": { date_published: "2026-06-01" } },
      redirects: { "/guides/old-name": "/guides/new-name" },
      allPaths: new Set(["/guides/new-name"]),
      publishedPaths: new Set(["/guides/new-name"])
    })
  );
  assert(renamedWithRedirect.length === 0, "a redirect-backed rename validates clean");

  const collidingRedirect = validateWithdrawals(
    baseContext({ redirects: { "/guides/example": "/guides/other" }, publishedPaths: new Set(["/guides/example"]) })
  );
  assert(collidingRedirect.some((problem) => /collides with a published guide/.test(problem)), "a redirect source that is also a live guide fails");

  // --- the protected guide ----------------------------------------------
  const protectedDrafted = validateGuide(
    baseGuide({ slug: "how-to-compare-event-ticket-prices", path: "/guides/how-to-compare-event-ticket-prices", status: "draft" }),
    baseContext({ publishedPaths: new Set() })
  );
  assert(protectedDrafted.some((problem) => /must stay published/.test(problem)), "the event-price guide cannot be drafted");

  const protectedRemoved = validateWithdrawals(
    baseContext({
      ledger: { "/guides/how-to-compare-event-ticket-prices": { date_published: "2026-07-14" } },
      allPaths: new Set(),
      publishedPaths: new Set()
    })
  );
  assert(protectedRemoved.some((problem) => /cannot be renamed or deleted/.test(problem)), "the event-price guide cannot be renamed or deleted");

  // --- claim exemptions --------------------------------------------------
  const exemptSentence = "A show that is sold out on the primary can still have listings here, and that is the ordinary case rather than a red flag.";
  const exempt = validateGuide(
    baseGuide({
      slug: "ticketnetwork-vs-ticketmaster",
      path: "/guides/ticketnetwork-vs-ticketmaster",
      sections: [
        { type: "intro", content: exemptSentence },
        { type: "section", title: "A", content: "Body." },
        { type: "section", title: "FAQ", content: "**Q?**\n\nA." }
      ]
    }),
    baseContext({ allPaths: new Set(["/guides/ticketnetwork-vs-ticketmaster"]), publishedPaths: new Set(["/guides/ticketnetwork-vs-ticketmaster"]) })
  );
  assert(exempt.length === 0, "the reviewed sentence is exempt in the guide it was reviewed in");

  const wrongGuide = validateGuide(
    baseGuide({
      sections: [
        { type: "intro", content: exemptSentence },
        { type: "section", title: "A", content: "Body." },
        { type: "section", title: "FAQ", content: "**Q?**\n\nA." }
      ]
    }),
    baseContext()
  );
  assert(wrongGuide.some((problem) => /sold out/.test(problem)), "the same sentence in a different guide is not exempt");

  const reworded = validateGuide(
    baseGuide({
      slug: "ticketnetwork-vs-ticketmaster",
      path: "/guides/ticketnetwork-vs-ticketmaster",
      sections: [
        { type: "intro", content: "A show that is sold out on the primary can still have listings here." },
        { type: "section", title: "A", content: "Body." },
        { type: "section", title: "FAQ", content: "**Q?**\n\nA." }
      ]
    }),
    baseContext({ allPaths: new Set(["/guides/ticketnetwork-vs-ticketmaster"]), publishedPaths: new Set(["/guides/ticketnetwork-vs-ticketmaster"]) })
  );
  assert(reworded.some((problem) => /sold out/.test(problem)), "a reworded version of an exempt sentence is not exempt");

  const newClaim = validateGuide(
    baseGuide({
      slug: "ticketnetwork-vs-ticketmaster",
      path: "/guides/ticketnetwork-vs-ticketmaster",
      sections: [
        { type: "intro", content: "These tickets are sold out everywhere else." },
        { type: "section", title: "A", content: "Body." },
        { type: "section", title: "FAQ", content: "**Q?**\n\nA." }
      ]
    }),
    baseContext({ allPaths: new Set(["/guides/ticketnetwork-vs-ticketmaster"]), publishedPaths: new Set(["/guides/ticketnetwork-vs-ticketmaster"]) })
  );
  assert(newClaim.some((problem) => /sold out/.test(problem)), "a new sold-out claim in an exempted guide still fails");

  const cheapest = validateGuide(baseGuide({ description: "The cheapest way to buy tickets for any show you want to see this year." }), baseContext());
  assert(cheapest.some((problem) => /cheapest/.test(problem)), "a cheapest claim in the description fails");

  // --- other validators --------------------------------------------------
  const unknownKey = validateGuide(baseGuide({ frontMatter: { title: "T", h1: "H", description: "D", last_modified: "2026-01-01" } }), baseContext());
  assert(unknownKey.some((problem) => /unknown front-matter key "last_modified"/.test(problem)), "last_modified is not an accepted front-matter key");

  const stampedSource = validateGuide(
    baseGuide({
      sources: [
        { raw: { linkCheckedAt: "2026-08-19" }, name: "One", publisher: "P", url: "https://example.org/a", lastChecked: "2026-06-01" },
        { raw: {}, name: "Two", publisher: "P", url: "https://example.org/b", lastChecked: "2026-06-01" }
      ]
    }),
    baseContext()
  );
  assert(stampedSource.some((problem) => /automation-owned/.test(problem)), "a hand-written linkCheckedAt is rejected");

  const oneSource = validateGuide(baseGuide({ sources: [baseGuide().sources[0]] }), baseContext());
  assert(oneSource.some((problem) => /at least 2 reviewed primary sources/.test(problem)), "a published guide needs two sources");

  const noFaq = validateGuide(
    baseGuide({ sections: [{ type: "intro", content: "Intro." }, { type: "section", title: "A", content: "Body." }] }),
    baseContext()
  );
  assert(noFaq.some((problem) => /FAQ/.test(problem)), "a published guide without an FAQ section fails");

  const thin = validateGuide(baseGuide({ wordCount: 120 }), baseContext());
  assert(thin.some((problem) => /body words/.test(problem)), "a thin published guide fails");

  const draftGuideLink = validateGuide(
    baseGuide({ sections: [{ type: "intro", content: "See [that](/guides/hidden)." }, { type: "section", title: "A", content: "B." }, { type: "section", title: "FAQ", content: "**Q?**\n\nA." }] }),
    baseContext({ allPaths: new Set(["/guides/example", "/guides/hidden"]) })
  );
  assert(draftGuideLink.some((problem) => /points at a draft guide/.test(problem)), "a published guide may not link to a draft");

  const badDate = validateGuide(baseGuide({ datePublished: "2026-02-30" }), baseContext());
  assert(badDate.some((problem) => /real YYYY-MM-DD calendar date/.test(problem)), "a non-calendar date fails");

  const badHowto = validateGuide(baseGuide({ howto: { raw: { name: "N", description: "D", steps: [] }, name: "N", description: "D", steps: [{ raw: {}, name: "S", text: "T" }] } }), baseContext());
  assert(badHowto.some((problem) => /at least two steps/.test(problem)), "a one-step howto fails");

  const newLegacy = validateGuide(baseGuide({ legacyArticleHeadline: "H", legacyArticleDescription: "D" }), baseContext());
  assert(newLegacy.some((problem) => /No new guide may acquire one/.test(problem)), "a new guide cannot acquire a legacy Article object");

  const images = validateGuide(
    baseGuide({ sections: [{ type: "intro", content: "![alt](/x.png)" }, { type: "section", title: "A", content: "B." }, { type: "section", title: "FAQ", content: "**Q?**\n\nA." }] }),
    baseContext()
  );
  assert(images.some((problem) => /embedded images/.test(problem)), "an embedded image fails");

  // --- emitters ----------------------------------------------------------
  const howtoGuide = baseGuide({
    howto: {
      raw: {},
      name: "How to X",
      description: "Do X.",
      steps: [
        { raw: {}, name: "One", text: "First." },
        { raw: {}, name: "Two", text: "Second." }
      ]
    }
  });
  const schema = schemaFor(howtoGuide);
  assert(schema["@type"] === "HowTo" && schema.step.length === 2 && schema.step[0]["@type"] === "HowToStep", "howto fields become HowTo JSON-LD");
  assert(schemaFor(baseGuide({ legacyArticleHeadline: "H", legacyArticleDescription: "D" }))["@type"] === "Article", "legacy fields become the original Article JSON-LD");
  assert(schemaFor(baseGuide()) === null, "a guide with neither carries no authored schema");

  const entry = toContentEntry(baseGuide(), { example: { "https://example.org/a": "2026-08-19" } });
  assert(Object.keys(entry).join(",") === "sections,sources", "a schema-free entry emits sections and sources only");
  assert(entry.sources[0].linkCheckedAt === "2026-08-19" && !("linkCheckedAt" in entry.sources[1]), "the sidecar stamps only the citation it checked");
  assert(Object.keys(entry.sources[0]).join(",") === "name,publisher,url,lastChecked,linkCheckedAt", "source key order is fixed");

  const ordered = orderGuides(
    [{ slug: "c" }, { slug: "a" }, { slug: "b" }],
    ["b", "a"]
  ).map((guide) => guide.slug);
  assert(ordered.join(",") === "b,a,c", "listed guides keep their order and the rest append in slug order");

  const module = renderRoutesModule(
    [["/guides/example", toRouteEntry(baseGuide(), "2026-07-01")]],
    "/guides/example",
    toRouteEntry(baseGuide(), "2026-07-01")
  );
  assert(/^ {2}"\/guides\/example": \{$/m.test(module), "route entries are emitted at the two-space indent the provenance parser expects");
  assert(module.includes("export const EVENT_PRICE_GUIDE_FALLBACK = {"), "the fallback is a separate top-level binding");
  assert(module.split("\n").filter((line) => /^\s+(title|h1|description|fullContent|datePublished|lastmod):/.test(line)).length === 12, "every property sits on its own line");

  if (!process.exitCode) console.log(`build-guide-content self-test passed (${passed} assertions).`);
}

const invokedDirectly =
  Boolean(process.argv[1]) && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

// Only act when invoked as a command. Without the invokedDirectly guard on the
// self-test too, importing buildGuideOutputs from a script that was itself run
// with --self-test (scripts/sync-content-provenance.mjs is one) would run this
// module's assertions as an import side-effect and could set a failing exit
// code for the wrong script.
if (SELF_TEST && invokedDirectly) {
  selfTest();
} else if (invokedDirectly) {
  await run();
}
