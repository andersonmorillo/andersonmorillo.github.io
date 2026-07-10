/**
 * Run Hugo via mise so npm scripts use the version pinned in mise.toml,
 * even when Scoop/other PATH entries still point at an older hugo.exe.
 */
const fs = require("fs");
const path = require("path");
const { spawnSync, execSync } = require("child_process");

const LOG_PATH = path.join(__dirname, "..", "debug-afd253.log");
const SESSION_ID = "afd253";
const args = process.argv.slice(2);

// #region agent log
function agentLog(hypothesisId, location, message, data) {
  const entry = {
    sessionId: SESSION_ID,
    runId: process.env.DEBUG_RUN_ID || "path-fix",
    hypothesisId,
    location,
    message,
    data,
    timestamp: Date.now(),
  };
  try {
    fs.appendFileSync(LOG_PATH, JSON.stringify(entry) + "\n");
  } catch (_) {}
  fetch("http://127.0.0.1:7693/ingest/ed387447-0d42-40eb-b31c-4576c1be4cea", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": SESSION_ID,
    },
    body: JSON.stringify(entry),
  }).catch(() => {});
}
// #endregion

function safe(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim();
  } catch (e) {
    return ((e.stdout || "") + (e.stderr || "") + (e.message || "")).trim();
  }
}

const pathHugo = safe("where hugo");
const pathHugoVersion = safe("hugo version");
const miseHugo = safe("mise which hugo");
const miseHugoVersion = safe("mise exec -- hugo version");

// #region agent log
agentLog("H1", "run-hugo.js:path", "PATH hugo vs mise hugo", {
  pathHugo: pathHugo.split(/\r?\n/)[0],
  pathHugoVersion: pathHugoVersion.slice(0, 120),
  miseHugo: miseHugo.split(/\r?\n/)[0],
  miseHugoVersion: miseHugoVersion.slice(0, 120),
  pathIsOld: /v0\.136\./.test(pathHugoVersion),
  miseIsPinned: /v0\.158\.0/.test(miseHugoVersion),
});
// #endregion

const miseCheck = spawnSync("mise", ["--version"], { encoding: "utf8", shell: true });
if (miseCheck.status !== 0) {
  // #region agent log
  agentLog("H2", "run-hugo.js:mise-missing", "mise not available on PATH", {
    status: miseCheck.status,
    err: (miseCheck.stderr || miseCheck.error || "").toString().slice(0, 200),
  });
  // #endregion
  console.error(
    "mise is required to run the pinned Hugo version. Install: scoop install mise && mise install"
  );
  process.exit(1);
}

// #region agent log
agentLog("H3", "run-hugo.js:exec", "launching mise exec -- hugo", {
  args,
  willBypassPathHugo: true,
});
// #endregion

const result = spawnSync("mise", ["exec", "--", "hugo", ...args], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

// #region agent log
agentLog("H4", "run-hugo.js:exit", "hugo exit status", {
  status: result.status,
  error: result.error ? String(result.error.message) : null,
});
// #endregion

process.exit(result.status == null ? 1 : result.status);
