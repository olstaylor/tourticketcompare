// Shared Markdown/front-matter primitives for the two content pipelines.
//
// content/blog/*.md and content/guides/*.md are authored the same way — a YAML
// front-matter block, then a Markdown body whose `##`/`###` headings become the
// section list both renderers consume — so both builds must agree, to the
// character, on how a document parses. They previously could not: this parser
// lived inside scripts/build-blog-content.mjs, and a second copy in the guide
// build would have been free to drift from it.
//
// Everything here is pure. No file is read, no network is reached, and nothing
// knows which collection a document belongs to; collection-specific rules
// (which keys are allowed, which links resolve, what may be claimed) stay in
// the build that owns them.

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * A date that exists on the calendar, not merely one shaped like a date.
 *
 * The shape test alone accepts 2026-02-30. JavaScript's Date rolls that over to
 * 2 March, so the rendered byline would read "Mar 2, 2026" while the generated
 * JSON, the BlogPosting schema, the RSS pubDate and the sitemap lastmod all
 * kept 2026-02-30 — the page and its machine-readable metadata disagreeing
 * about when it was published.
 *
 * @param {string} value
 * @returns {boolean}
 */
export function isCalendarDate(value) {
  if (!ISO_DATE_PATTERN.test(String(value ?? ""))) return false;
  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return parsed.getUTCFullYear() === year && parsed.getUTCMonth() === month - 1 && parsed.getUTCDate() === day;
}

/**
 * An https URL with a usable host.
 *
 * A `startsWith("https://")` test accepts "https://" and "https://not a URL",
 * which then fail the renderer's own safeGuideSourceUrl parse — so the build
 * reports success while the deployed post silently drops the source and its
 * schema citation.
 *
 * @param {string} value
 * @returns {boolean}
 */
export function isUsableHttpsUrl(value) {
  try {
    const parsed = new URL(String(value ?? ""));
    return parsed.protocol === "https:" && Boolean(parsed.hostname) && parsed.hostname.includes(".");
  } catch (error) {
    return false;
  }
}

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

// YAML's null spellings. The `updated` field is an optional date the editor may
// clear, and a cleared field must read as absent, not as the literal "null".
const NULL_SCALARS = new Set(["", "null", "Null", "NULL", "~"]);

function indentWidth(line, lineNumber) {
  const leading = line.match(/^\s*/)[0];
  if (leading.includes("\t")) {
    throw new Error(`front-matter line ${lineNumber} is indented with a tab; YAML requires spaces`);
  }
  return leading.length;
}

function isBlank(line) {
  return !line.trim();
}

function nextContentLine(lines, from) {
  for (let i = from; i < lines.length; i += 1) {
    if (!isBlank(lines[i]) && !lines[i].trim().startsWith("#")) return i;
  }
  return -1;
}

/**
 * Absorb the continuation lines of a multi-line plain or quoted scalar.
 *
 * This is the case that matters most in practice. The browser editor serializes
 * with the `yaml` package at its default `lineWidth: 80`, so any value longer
 * than that — which `description` and `summary` always are — is written folded
 * across several more-indented lines:
 *
 *     description: A full sentence that comfortably clears the character floor
 *       for search snippets.
 *
 * YAML folds a single newline to a space, so the parts join with " ".
 */
function foldContinuation(lines, cursor, parentIndent, first) {
  const parts = [first];
  while (cursor.i < lines.length) {
    const line = lines[cursor.i];
    if (isBlank(line)) break;
    const lineIndent = indentWidth(line, cursor.i + 1);
    if (lineIndent <= parentIndent) break;
    const rest = line.slice(lineIndent);
    if (/^-(\s|$)/.test(rest)) break;
    parts.push(rest.trim());
    cursor.i += 1;
  }
  return parts.join(" ");
}

// Literal (`|`) and folded (`>`) block scalars. The editor does not currently
// emit these, but a human writing front matter by hand reasonably might, and
// silently dropping the value would publish a post missing a required field.
function parseBlockScalar(lines, cursor, parentIndent, folded) {
  const collected = [];
  let blockIndent = null;
  while (cursor.i < lines.length) {
    const line = lines[cursor.i];
    if (isBlank(line)) {
      collected.push("");
      cursor.i += 1;
      continue;
    }
    const lineIndent = indentWidth(line, cursor.i + 1);
    if (lineIndent <= parentIndent) break;
    if (blockIndent === null) blockIndent = lineIndent;
    collected.push(line.slice(Math.min(blockIndent, lineIndent)));
    cursor.i += 1;
  }
  while (collected.length && collected.at(-1) === "") collected.pop();
  if (!folded) return collected.join("\n");
  // Folded: newlines inside a paragraph become spaces, a blank line is a break.
  return collected
    .join("\n")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.split("\n").map((part) => part.trim()).join(" ").trim())
    .join("\n\n")
    .trim();
}

function parseFlowList(value) {
  const inner = value.slice(1, -1).trim();
  return inner ? inner.split(",").map((entry) => stripQuotes(entry)).filter(Boolean) : [];
}

function parseValue(lines, cursor, parentIndent, inline) {
  const blockScalar = inline.match(/^([|>])[-+]?\d*$/);
  if (blockScalar) return parseBlockScalar(lines, cursor, parentIndent, blockScalar[1] === ">");

  if (inline) {
    if (inline.startsWith("[") && inline.endsWith("]")) return parseFlowList(inline);
    const folded = foldContinuation(lines, cursor, parentIndent, inline);
    const scalar = stripQuotes(folded);
    return NULL_SCALARS.has(scalar) ? "" : scalar;
  }

  // Nothing on the key's own line: a nested sequence or mapping may follow.
  const next = nextContentLine(lines, cursor.i);
  if (next === -1) return "";
  const nextIndent = indentWidth(lines[next], next + 1);
  if (nextIndent < parentIndent) return "";
  const rest = lines[next].slice(nextIndent);
  // A block sequence may sit at the key's own indent, which is legal YAML and
  // what a hand-written file often looks like.
  if (/^-(\s|$)/.test(rest)) return parseSequence(lines, cursor, nextIndent);
  if (nextIndent > parentIndent) return parseMapping(lines, cursor, nextIndent);
  return "";
}

function parseSequence(lines, cursor, indent) {
  const items = [];
  while (cursor.i < lines.length) {
    const line = lines[cursor.i];
    if (isBlank(line)) {
      cursor.i += 1;
      continue;
    }
    const lineIndent = indentWidth(line, cursor.i + 1);
    if (lineIndent < indent) break;
    const rest = line.slice(lineIndent);
    if (lineIndent > indent || !/^-(\s|$)/.test(rest)) break;

    const itemBody = rest.replace(/^-\s*/, "");
    const keyColumn = lineIndent + (rest.length - itemBody.length);
    cursor.i += 1;

    const objectEntry = itemBody.match(/^([A-Za-z0-9_]+):(?:\s+(.*))?$/);
    if (objectEntry) {
      // An object item: its first key sets the column that its sibling keys
      // share, so the rest of the mapping parses at that indent.
      const object = {};
      object[objectEntry[1]] = parseValue(lines, cursor, keyColumn, (objectEntry[2] ?? "").trim());
      Object.assign(object, parseMapping(lines, cursor, keyColumn));
      items.push(object);
      continue;
    }

    const scalar = stripQuotes(foldContinuation(lines, cursor, indent, itemBody));
    if (scalar) items.push(scalar);
  }
  return items;
}

function parseMapping(lines, cursor, indent) {
  const result = {};
  while (cursor.i < lines.length) {
    const line = lines[cursor.i];
    if (isBlank(line) || line.trim().startsWith("#")) {
      cursor.i += 1;
      continue;
    }
    const lineIndent = indentWidth(line, cursor.i + 1);
    if (lineIndent < indent) break;
    if (lineIndent > indent) {
      throw new Error(`unexpected indentation at front-matter line ${cursor.i + 1}: "${line}"`);
    }
    const match = line.slice(indent).match(/^([A-Za-z0-9_]+):(?:\s+(.*))?\s*$/);
    if (!match) break;
    cursor.i += 1;
    result[match[1]] = parseValue(lines, cursor, indent, (match[2] ?? "").trim());
  }
  return result;
}

/**
 * Parse the constrained YAML subset this project's front matter uses: scalars
 * (including values folded across lines and `|`/`>` block scalars), flow lists
 * (`tags: [a, b]`), block lists of scalars, and block lists of one-level
 * objects (the `sources` shape).
 *
 * Deliberately not a general YAML parser, but it must accept everything the
 * browser editor writes: that is the primary authoring path, and a construct
 * this cannot read would fail the build with a parse error rather than
 * publishing. An unsupported construct raises rather than being silently
 * dropped, because a dropped field would publish a post missing its metadata.
 *
 * @param {string} text Raw front matter body (without the --- fences).
 * @returns {Record<string, unknown>}
 */
export function parseFrontMatter(text) {
  const lines = String(text || "").split("\n");
  const cursor = { i: 0 };
  const result = parseMapping(lines, cursor, 0);
  const remaining = nextContentLine(lines, cursor.i);
  if (remaining !== -1) {
    throw new Error(`cannot parse front-matter line ${remaining + 1}: "${lines[remaining]}"`);
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

export function markdownLinks(text) {
  return [...String(text || "").matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((match) => ({ label: match[1], href: match[2].trim() }));
}
