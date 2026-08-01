#!/usr/bin/env node
// Scaffold a new post in content/blog/ with valid front matter already filled
// in, so writing a post never starts with remembering which keys exist.
//
//   npm run blog:new -- "Why ticket fees appear so late"
//   npm run blog:new -- "Some title" --slug custom-slug --tags how-we-work,ticket-prices
//
// Writes the file and stops. Nothing is published until you fill in the body,
// run `npm run blog:build`, and commit — a post below the length threshold is
// published noindex, and the build refuses anything that breaks the rules.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);

function flag(name) {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? "" : String(args[index + 1] || "").trim();
}

const title = args.filter((arg, index) => !arg.startsWith("--") && !args[index - 1]?.startsWith("--")).join(" ").trim();
if (!title) {
  console.error('Usage: npm run blog:new -- "Post title" [--slug my-slug] [--tags a,b] [--date YYYY-MM-DD]');
  process.exit(1);
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const slug = slugify(flag("slug") || title);
const date = flag("date") || new Date().toISOString().slice(0, 10);
const tags = flag("tags")
  .split(",")
  .map((tag) => slugify(tag))
  .filter(Boolean);

const target = path.join(root, "content", "blog", `${slug}.md`);
try {
  await fs.access(target);
  console.error(`content/blog/${slug}.md already exists — pick a different --slug or edit that file.`);
  process.exit(1);
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

// `status: draft` by default: a draft has no route at all, so a half-finished
// post cannot go live by accident when the build runs.
const template = `---
title: ${title}
seo_title: ${title.length > 40 ? "TODO shorter title, 40 characters max" : title}
description: TODO one full sentence, 50-160 characters, written for the search result snippet.
summary: TODO one or two sentences shown on the blog index and used as the page lead.
date: ${date}
status: draft
${tags.length ? `tags:\n${tags.map((tag) => `  - ${tag}`).join("\n")}\n` : "tags:\n  - how-we-work\n"}---

TODO opening paragraph. Everything before the first "## " heading becomes the intro.

## First section

TODO. Use "## " for sections and "### " for subsections. Links must be site paths
(/guides/..., /artists/..., /blog/...) or https URLs — the build resolves every
internal link and fails on a dead one.

## Second section

TODO. Aim for 300+ words: shorter posts publish noindex,follow.
`;

await fs.mkdir(path.dirname(target), { recursive: true });
await fs.writeFile(target, template);

console.log(`Created content/blog/${slug}.md (status: draft).`);
console.log("Next: write the post, set status: published, then run `npm run blog:build` and commit.");
