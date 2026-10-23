#!/usr/bin/env node
// Offline, explicit snapshot, pinned git inputs. No production or API writes.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { REPORT_ID, TTC_RESEARCH_SOURCE, ttcResearchObservations, buildUkConcertActivity, renderUkConcertActivity } from './lib/uk-concert-activity.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const git = (args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
const options = { revision: 'HEAD', output: path.join(root, 'reports/research', REPORT_ID) };
try {
  for (let i = 2; i < process.argv.length; i += 1) {
    const name = process.argv[i];
    if (!['--revision', '--snapshot-at', '--output'].includes(name) || !process.argv[i + 1] || process.argv[i + 1].startsWith('--')) throw new Error('Use --snapshot-at ISO_INSTANT [--revision REF] [--output DIRECTORY]');
    options[name.slice(2)] = process.argv[++i];
  }
  if (!options['snapshot-at']) throw new Error('--snapshot-at is required; never silently date an old corpus as current');
  const revision = git(['rev-parse', '--verify', '--end-of-options', `${options.revision}^{commit}`]).trim();
  const committedAt = Date.parse(git(['show', '-s', '--format=%cI', revision]).trim());
  if (committedAt > Date.parse(options['snapshot-at'])) throw new Error('Input revision was committed after the requested snapshot');
  const files = ['public/data/events.json', 'public/data/artists.json'].map((file) => {
    const content = git(['show', `${revision}:${file}`]);
    return { path: file, sha256: createHash('sha256').update(content).digest('hex'), value: JSON.parse(content) };
  });
  const observations = ttcResearchObservations(files[0].value, files[1].value);
  const report = buildUkConcertActivity(observations, { snapshotAt: options['snapshot-at'], sources: [TTC_RESEARCH_SOURCE] });
  report.inputs = { revision, files: files.map(({ path, sha256 }) => ({ path, sha256 })) };
  const destination = path.resolve(options.output);
  // Research artifacts must never become production content by a CLI option.
  const permittedOutput = (relative) => relative === 'reports' || relative.startsWith(`reports${path.sep}`) ||
    relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative);
  if (!permittedOutput(path.relative(root, destination))) throw new Error('--output must be under reports/ or outside the repository');
  const realRoot = await fs.realpath(root);
  await fs.mkdir(destination, { recursive: true });
  const realDestination = await fs.realpath(destination);
  const realRelative = path.relative(realRoot, realDestination);
  if (!permittedOutput(realRelative)) throw new Error('Output symlink resolves into production repository files');
  // Refuse symlink files too, so an output folder cannot redirect a write.
  for (const filename of ['report.json', 'report.md']) {
    const stat = await fs.lstat(path.join(destination, filename)).catch((e) => { if (e.code !== 'ENOENT') throw e; });
    if (stat?.isSymbolicLink()) throw new Error('Output file must not be a symlink');
  }
  await fs.writeFile(path.join(destination, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  await fs.writeFile(path.join(destination, 'report.md'), renderUkConcertActivity(report));
  console.log(`${report.headline}\nInternal-only report: ${destination}\nPublication blockers: ${report.publication.blockers.join('; ')}`);
} catch (error) {
  // Git's stderr may contain local configuration; print only our own messages.
  console.error(`uk-concert-activity: ${error.status !== undefined ? 'Unable to read the requested local git revision' : error.message}`);
  process.exitCode = 1;
}
