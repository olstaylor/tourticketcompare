// Auto-publish kill switch and ledger labels for the two scripts that carry
// every auto-merge (open-automation-pr.mjs, sync-tm-events-write-pr.mjs).
// Semantics: docs/OPERATIONS.md → "Auto-publish kill switch and ledger".
// Variables are read live, so a flip stops a run in flight; an unreadable
// switch holds the merge (fail closed) and is reported as a fault.
//
//   node scripts/lib/autopublish-guard.mjs --self-test

export const LEDGER_LABEL = "autopublish";
export const HELD_LABEL = "autopublish:held";
export const GLOBAL_SWITCH = "AUTOPUBLISH_ENABLED";
export const CLASS_SWITCHES = { autopromote: "AUTOPROMOTE_ENABLED", stage4: "STAGE4_ENABLED" };

const norm = (value) => (value == null ? "" : String(value).trim().toLowerCase());

/**
 * Pure decision. `publishClass` is empty for the existing sanctioned lanes.
 * @returns {{ allowed: boolean, reason: string }}
 */
export function decideAutopublish({ globalValue, classFlagValue, publishClass = "" }) {
  if (norm(globalValue) === "false") return { allowed: false, reason: `${GLOBAL_SWITCH} is "false"` };
  const cls = norm(publishClass);
  if (!cls) return { allowed: true, reason: `${GLOBAL_SWITCH} is not "false"` };
  const flag = CLASS_SWITCHES[cls];
  if (!flag) return { allowed: false, reason: `unknown publish class "${publishClass}"` };
  if (norm(classFlagValue) !== "true") return { allowed: false, reason: `${flag} is not "true"` };
  return { allowed: true, reason: `${flag} is "true"` };
}

/** Live read of one repository variable. 404 means unset; anything else throws. */
export async function readRepoVariable({ repo, name, token = process.env.GITHUB_TOKEN, fetchImpl = fetch }) {
  const res = await fetchImpl(`https://api.github.com/repos/${repo}/actions/variables/${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`read ${name}: HTTP ${res.status}`);
  const body = await res.json();
  return body?.value ?? null;
}

/**
 * Read the switch live and decide. Never throws: an unreadable switch comes
 * back as `{ allowed: false, fault: true }` so the caller holds the merge.
 * @returns {Promise<{ allowed: boolean, reason: string, fault?: boolean }>}
 */
export async function checkAutopublish({ repo, publishClass = process.env.AUTOPUBLISH_CLASS || "", token, fetchImpl }) {
  try {
    const globalValue = await readRepoVariable({ repo, name: GLOBAL_SWITCH, token, fetchImpl });
    const flag = CLASS_SWITCHES[norm(publishClass)];
    const classFlagValue = flag ? await readRepoVariable({ repo, name: flag, token, fetchImpl }) : null;
    return decideAutopublish({ globalValue, classFlagValue, publishClass });
  } catch (err) {
    return {
      allowed: false,
      fault: true,
      reason: `kill switch unreadable (${err.message}); the automation App needs Variables: read`,
    };
  }
}

/** Comment body for a held merge. */
export function heldComment(result) {
  return result.fault
    ? `Auto-merge held, fail-closed: ${result.reason}. This PR needs a human to merge it.`
    : `Auto-merge held by the kill switch: ${result.reason}. This PR needs a human to merge it, or re-run the lane once the switch is back on.`;
}

async function selfTest() {
  const failures = [];
  const check = (cond, msg) => { if (!cond) failures.push(msg); };
  const d = (g, c, p) => decideAutopublish({ globalValue: g, classFlagValue: c, publishClass: p }).allowed;

  check(d(null, null, "") === true, "unset global keeps existing lanes running");
  check(d("true", null, "") === true, "global true allows existing lanes");
  check(d(" FALSE ", null, "") === false, "global false (any case/space) holds existing lanes");
  check(d("off", null, "") === true, "only the literal false stops existing lanes");
  check(d(null, null, "autopromote") === false, "autopromote is off by default");
  check(d(null, "true", "autopromote") === true, "autopromote runs only when its flag is true");
  check(d("false", "true", "autopromote") === false, "global false overrides a class flag");
  check(d(null, "yes", "stage4") === false, "stage4 needs the literal true");
  check(d(null, "true", "mystery") === false, "an unknown class is held");

  const stub = (map) => async (url) => {
    const name = url.split("/").pop();
    const hit = map[name];
    if (hit === undefined) return { status: 404, ok: false, json: async () => ({}) };
    if (typeof hit === "number") return { status: hit, ok: false, json: async () => ({}) };
    return { status: 200, ok: true, json: async () => ({ name, value: hit }) };
  };
  const run = (map, publishClass = "") => checkAutopublish({ repo: "o/r", publishClass, token: "t", fetchImpl: stub(map) });

  check((await run({})).allowed === true, "404 on the global is unset, so existing lanes run");
  check((await run({ AUTOPUBLISH_ENABLED: "false" })).allowed === false, "a live false holds");
  const forbidden = await run({ AUTOPUBLISH_ENABLED: 403 });
  check(forbidden.allowed === false && forbidden.fault === true, "403 fails closed as a fault");
  check((await run({}, "autopromote")).allowed === false, "an unset class flag holds its class");
  check((await run({ AUTOPROMOTE_ENABLED: "true" }, "autopromote")).allowed === true, "a live class flag allows its class");
  const classFault = await run({ STAGE4_ENABLED: 500 }, "stage4");
  check(classFault.allowed === false && classFault.fault === true, "a failed class-flag read fails closed");
  check(heldComment(forbidden).includes("fail-closed"), "fault comment says fail-closed");

  if (failures.length) {
    for (const f of failures) console.error(`  FAIL ${f}`);
    console.error(`[autopublish-guard] self-test: ${failures.length} failure(s)`);
    return 1;
  }
  console.log("[autopublish-guard] self-test: all assertions passed");
  return 0;
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href && process.argv.includes("--self-test")) {
  process.exit(await selfTest());
}
