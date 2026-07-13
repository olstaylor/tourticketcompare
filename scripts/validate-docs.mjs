import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SKIP_DIRS = new Set([".git", "node_modules", ".wrangler", "reports"]);
const REQUIRED_DOCS = [
  "AGENTS.md",
  "README.md",
  "CLAUDE.md",
  "PROJECT_STATUS.md",
  "BACKLOG.md",
  "CONTRIBUTING.md",
  "SAFE_PUBLISHING_RULES.md",
  "docs/ARCHITECTURE.md",
  "docs/DEPLOYMENT.md",
  "docs/CONTENT_RULES.md",
  "docs/PROVIDER_DATA_POLICY.md",
  "docs/ADDING_ARTISTS.md",
  "docs/SAFE_NEXT_ARTIST_WORKFLOW.md",
  "docs/ADDING_PROVIDERS.md",
  "docs/PROVIDER_SYNC.md",
  "docs/SEATGEEK_DISCOVERY.md",
  "docs/DOCS_MAINTENANCE.md",
  "migrations/README.md",
];
const RETIRED_PATHS = ["HANDOVER.md", "docs/archive"];

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith(".") && entry.name !== ".github") continue;
    if (entry.isDirectory() && SKIP_DIRS.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else files.push(absolute);
  }
  return files;
}

function repoPath(absolute) {
  return path.relative(ROOT, absolute).split(path.sep).join("/");
}

const errors = [];

for (const required of REQUIRED_DOCS) {
  if (!fs.existsSync(path.join(ROOT, required))) errors.push(`missing canonical document: ${required}`);
}

for (const retired of RETIRED_PATHS) {
  if (fs.existsSync(path.join(ROOT, retired))) errors.push(`retired documentation path must not exist: ${retired}`);
}

const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
const npmScripts = new Set(Object.keys(packageJson.scripts || {}));
const markdownFiles = walk(ROOT).filter((file) => file.endsWith(".md"));

for (const file of markdownFiles) {
  const source = fs.readFileSync(file, "utf8");
  const relativeFile = repoPath(file);

  for (const match of source.matchAll(/npm run\s+([A-Za-z0-9:_-]+)/g)) {
    const command = match[1];
    if (!npmScripts.has(command)) errors.push(`${relativeFile}: unknown npm script '${command}'`);
  }

  for (const match of source.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    let target = match[1].trim();
    if (target.startsWith("<") && target.includes(">")) target = target.slice(1, target.indexOf(">"));
    else target = target.split(/\s+["']/)[0];

    if (!target || target.startsWith("#") || /^(?:https?:|mailto:|data:)/i.test(target)) continue;
    target = target.split("#", 1)[0].split("?", 1)[0];
    if (!target) continue;

    try {
      target = decodeURIComponent(target);
    } catch {
      errors.push(`${relativeFile}: invalid encoded link '${match[1]}'`);
      continue;
    }

    const resolved = path.resolve(path.dirname(file), target);
    if (resolved !== ROOT && !resolved.startsWith(`${ROOT}${path.sep}`)) {
      errors.push(`${relativeFile}: link escapes repository '${match[1]}'`);
    } else if (!fs.existsSync(resolved)) {
      errors.push(`${relativeFile}: broken relative link '${match[1]}'`);
    }
  }
}

if (errors.length) {
  console.error(`Documentation validation failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Documentation validation passed (${markdownFiles.length} Markdown files checked).`);
