#!/usr/bin/env node
// Scaffold a new guide in content/guides/ with valid front matter already
// filled in, so writing one never starts with remembering which keys exist.
//
//   npm run guides:new -- "How to check a resale listing"
//   npm run guides:new -- "Some title" --slug custom-slug --h1 "How do I check a listing?"
//
// The scaffold is a DRAFT with no date_published: a guide has no route, no
// sitemap entry and no llms.txt line until it is published, and the publication
// date is fixed at that moment and never moves afterwards. Fill in the body,
// add two sources and an FAQ section, set status: published with the date, then
// run `npm run guides:build`.

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
  console.error('Usage: npm run guides:new -- "Guide title" [--slug my-slug] [--h1 "Page heading"]');
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
const h1 = flag("h1") || title;
const file = path.join(root, "content", "guides", `${slug}.md`);

// Field order matches public/admin/config.yml, so the first save from the
// browser editor produces no reordering diff.
const scaffold = `---
title: ${JSON.stringify(title)}
h1: ${JSON.stringify(h1)}
description: One full sentence between 50 and 160 characters, written for the search result snippet.
status: draft
sources:
  - name: Title of the source page
    publisher: Who publishes it
    url: https://example.org/replace-me
    last_checked: ${new Date().toISOString().slice(0, 10)}
  - name: A second source
    publisher: Who publishes it
    url: https://example.org/replace-me-too
    last_checked: ${new Date().toISOString().slice(0, 10)}
---

An opening paragraph, before the first heading. It becomes the intro block on
the page.

## First section

What a reader should check, and why.

## FAQ

**A question a reader would actually type?**

The answer, in plain prose. The router turns this section into the page's
FAQPage structured data, so a published guide needs it.
`;

try {
  await fs.access(file);
  console.error(`content/guides/${slug}.md already exists.`);
  process.exit(1);
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

await fs.mkdir(path.dirname(file), { recursive: true });
await fs.writeFile(file, scaffold, "utf8");

console.log(`Created content/guides/${slug}.md (draft — no route until you publish it).`);
console.log("Next: write the guide, replace the placeholder sources, then set");
console.log(`  status: published`);
console.log(`  date_published: ${new Date().toISOString().slice(0, 10)}`);
console.log("and run `npm run guides:build`.");
