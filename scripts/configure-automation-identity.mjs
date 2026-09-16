#!/usr/bin/env node
import assert from 'node:assert/strict';
import { appendFileSync, readFileSync, readdirSync } from 'node:fs';
import { parse } from 'yaml';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

// Missing configuration is an error after opt-in, never a silent fallback to
// the credential that recreates approval-required pull_request runs.
export function validateIdentity(env) {
  const flag = env.AUTOMATION_APP_ENABLED || '';
  if (!['', 'false', 'true'].includes(flag)) throw new Error('AUTOMATION_APP_ENABLED must be true, false, or empty');
  if (flag !== 'true') return false;
  if (!env.AUTOMATION_APP_CLIENT_ID || !env.AUTOMATION_APP_PRIVATE_KEY) {
    throw new Error('Enabled automation App requires its client ID and private key');
  }
  if (env.GITHUB_SERVER_URL !== 'https://github.com' || env.GITHUB_REPOSITORY !== 'olstaylor/tourticketcompare') {
    throw new Error('Automation App is restricted to olstaylor/tourticketcompare on github.com');
  }
  if (!['schedule', 'workflow_dispatch', 'push'].includes(env.GITHUB_EVENT_NAME)) {
    throw new Error('Automation App may only run in the existing trusted publishing triggers');
  }
  return true;
}

export function configureIdentity(env, { git, mask, output }) {
  const enabled = validateIdentity(env);
  const token = enabled ? env.AUTOMATION_APP_TOKEN : env.EXISTING_GITHUB_TOKEN;
  if (!token || /[\r\n]/.test(token)) throw new Error('Publishing token is missing or malformed');
  mask(token);
  if (enabled) {
    const auth = `AUTHORIZATION: basic ${Buffer.from(`x-access-token:${token}`).toString('base64')}`;
    mask(auth);
    // Replace checkout's local GITHUB_TOKEN header so branch updates and PR
    // creation use the same App. No credential enters the remote URL or tree.
    git(['config', '--local', '--replace-all', 'http.https://github.com/.extraheader', auth]);
  }
  output(token);
  return enabled ? 'app' : 'github-token';
}

function selfTest() {
  const base = { AUTOMATION_APP_ENABLED: 'true', AUTOMATION_APP_CLIENT_ID: 'test-client', AUTOMATION_APP_PRIVATE_KEY: 'test-key', AUTOMATION_APP_TOKEN: 'test-app', EXISTING_GITHUB_TOKEN: 'test-existing', GITHUB_SERVER_URL: 'https://github.com', GITHUB_REPOSITORY: 'olstaylor/tourticketcompare', GITHUB_EVENT_NAME: 'schedule' };
  const calls = [];
  const deps = { git: args => calls.push(['git', args]), mask: value => calls.push(['mask', value]), output: value => calls.push(['output', value]) };
  assert.equal(configureIdentity(base, deps), 'app');
  assert.equal(calls.at(-1)[1], 'test-app');
  const header = calls.find(c => c[0] === 'git')[1].at(-1);
  assert.equal(Buffer.from(header.split(' ').at(-1), 'base64').toString(), 'x-access-token:test-app');
  assert(calls.findIndex(c => c[0] === 'mask' && c[1] === header) < calls.findIndex(c => c[0] === 'git'));
  calls.length = 0;
  assert.equal(configureIdentity({ ...base, AUTOMATION_APP_ENABLED: '' }, deps), 'github-token');
  assert(!calls.some(c => c[0] === 'git'));
  assert.equal(calls.at(-1)[1], 'test-existing');
  for (const change of [
    { AUTOMATION_APP_ENABLED: 'treu' }, { AUTOMATION_APP_CLIENT_ID: '' },
    { AUTOMATION_APP_PRIVATE_KEY: '' }, { AUTOMATION_APP_TOKEN: '' },
    { AUTOMATION_APP_TOKEN: 'bad\noutput=true' }, { GITHUB_REPOSITORY: 'other/repo' },
    { GITHUB_SERVER_URL: 'https://example.test' }, { GITHUB_EVENT_NAME: 'pull_request' },
    { GITHUB_EVENT_NAME: 'pull_request_target' },
  ]) {
    calls.length = 0;
    assert.throws(() => configureIdentity({ ...base, ...change }, deps));
    assert.equal(calls.length, 0, 'invalid configuration must not mutate Git or emit a token');
  }
  calls.length = 0;
  assert.throws(() => configureIdentity(base, { ...deps, git: () => { throw new Error('git failed'); } }));
  assert(!calls.some(c => c[0] === 'output'), 'failed Git setup must stop API publication too');
  // Integration guard: every PR-producing step must consume the selected
  // credential and its Git pushes must occur after setup under the same gate.
  let publishers = 0;
  for (const file of readdirSync('.github/workflows').filter(f => f.endsWith('.yml'))) {
    const workflow = parse(readFileSync(`.github/workflows/${file}`, 'utf8'));
    for (const job of Object.values(workflow.jobs || {})) {
      const steps = job.steps || [];
      for (const [index, step] of steps.entries()) {
        if (!/node scripts\/(open-automation-pr|sync-tm-events-write-pr|run-work-queue-repair)\.mjs/.test(step.run || '')) continue;
        if (/run-work-queue-repair\.mjs --self-test/.test(step.run || '')) continue;
        publishers++;
        const identity = steps[index - 1];
        assert.equal(identity?.uses, './.github/actions/automation-identity', file);
        assert.equal(identity.if, step.if, `${file}: preserve the publisher gate`);
        assert.equal(step.env.GITHUB_TOKEN, '${{ steps.publishing-identity.outputs.token }}', file);
        assert(job['timeout-minutes'] < 60, `${file}: job must fit token lifetime`);
        assert(!steps.slice(0, index - 1).some(s => /git push/.test(s.run || '')), `${file}: push precedes identity`);
      }
    }
  }
  assert.equal(publishers, 10, 'all ten publishing jobs must use the identity helper');
  const action = parse(readFileSync('.github/actions/automation-identity/action.yml', 'utf8'));
  const mint = action.runs.steps.find(s => s.id === 'app');
  assert.equal(mint.with.repositories, '${{ github.event.repository.name }}');
  assert.equal(mint.with['skip-token-revoke'], undefined);
  assert.equal(mint.with['permission-administration'], undefined);
  assert.equal(mint.with['permission-workflows'], undefined);
  console.log('Automation identity self-test passed');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.includes('--self-test')) selfTest();
  else if (process.argv.includes('--preflight')) validateIdentity(process.env);
  else {
    if (!process.env.GITHUB_OUTPUT) throw new Error('GITHUB_OUTPUT is required');
    const identity = configureIdentity(process.env, {
      git: args => execFileSync('git', args, { stdio: ['ignore', 'ignore', 'pipe'] }),
      mask: value => console.log(`::add-mask::${value}`),
      output: token => appendFileSync(process.env.GITHUB_OUTPUT, `token=${token}\n`),
    });
    console.log(`Publishing identity: ${identity}`);
  }
}
