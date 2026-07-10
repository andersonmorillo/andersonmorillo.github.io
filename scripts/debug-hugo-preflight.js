/**
 * Debug instrumentation: diagnose Hugo server startup failure.
 * Session: afd253
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const LOG_PATH = path.join(__dirname, "..", "debug-afd253.log");
const SESSION_ID = "afd253";

// #region agent log
function agentLog(hypothesisId, location, message, data) {
  const entry = {
    sessionId: SESSION_ID,
    runId: process.env.DEBUG_RUN_ID || "pre-fix",
    hypothesisId,
    location,
    message,
    data,
    timestamp: Date.now(),
  };
  fs.appendFileSync(LOG_PATH, JSON.stringify(entry) + "\n");
  fetch("http://127.0.0.1:7693/ingest/ed387447-0d42-40eb-b31c-4576c1be4cea", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": SESSION_ID,
    },
    body: JSON.stringify(entry),
  }).catch(() => {});
  console.log(`[debug ${hypothesisId}] ${message}`, JSON.stringify(data));
}
// #endregion

function safeExec(cmd) {
  try {
    return { ok: true, out: execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim() };
  } catch (e) {
    return {
      ok: false,
      out: ((e.stdout || "") + (e.stderr || "") + (e.message || "")).trim(),
      code: e.status,
    };
  }
}

const root = path.join(__dirname, "..");
const netlify = fs.readFileSync(path.join(root, "netlify.toml"), "utf8");
const pinned = (netlify.match(/HUGO_VERSION\s*=\s*"([^"]+)"/) || [])[1] || null;
const hugoToml = fs.readFileSync(path.join(root, "hugo.toml"), "utf8");
const permalinkMatch = hugoToml.match(/"pages"\s*=\s*"([^"]+)"/);
const permalink = permalinkMatch ? permalinkMatch[1] : null;
const moduleToml = fs.readFileSync(path.join(root, "config", "_default", "module.toml"), "utf8");
const minMatch = moduleToml.match(/min\s*=\s*"([^"]+)"/);
const maxMatch = moduleToml.match(/max\s*=\s*"([^"]+)"/);

const hugoVer = safeExec("hugo version");
const versionStr = hugoVer.out || "";
const installedMatch = versionStr.match(/hugo v([\d.]+)/i);
const installed = installedMatch ? installedMatch[1] : null;
const isExtended = /extended/i.test(versionStr);

// #region agent log
agentLog("H1", "debug-hugo-preflight.js:version", "Hugo version vs pin", {
  installed,
  pinned,
  isExtended,
  raw: versionStr.slice(0, 200),
  versionMismatch: installed !== pinned,
});

agentLog("H2", "debug-hugo-preflight.js:permalink", "Permalink token in hugo.toml", {
  permalink,
  usesSlugOrContentBasename: /slugorcontentbasename/i.test(permalink || ""),
  tokenRequiresHugo: ">=0.144.0",
  installedSupportsToken: installed
    ? installed.split(".").map(Number).reduce((a, b, i) => (i === 0 ? [a, b] : [...(Array.isArray(a) ? a : [a]), b]), []) &&
      (() => {
        const [maj, min] = installed.split(".").map(Number);
        return maj > 0 || min >= 144;
      })()
    : false,
});

agentLog("H3", "debug-hugo-preflight.js:module", "Module hugoVersion range", {
  min: minMatch ? minMatch[1] : null,
  max: maxMatch ? maxMatch[1] : null,
  installedOutsideRange:
    installed && minMatch
      ? installed.localeCompare(minMatch[1], undefined, { numeric: true }) < 0 ||
        (maxMatch && installed.localeCompare(maxMatch[1], undefined, { numeric: true }) > 0)
      : null,
});
// #endregion

const portCheck = safeExec(
  process.platform === "win32"
    ? 'powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort 1313 -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty OwningProcess"'
    : "lsof -ti:1313 || true"
);

// #region agent log
agentLog("H4", "debug-hugo-preflight.js:port", "Port 1313 occupancy", {
  occupied: Boolean(portCheck.out && portCheck.out.trim()),
  detail: (portCheck.out || "").slice(0, 100),
});
// #endregion

const serverProbe = safeExec("hugo config");

// #region agent log
agentLog("H5", "debug-hugo-preflight.js:hugo-config", "hugo config probe (loads permalinks)", {
  ok: serverProbe.ok,
  errorSnippet: serverProbe.ok ? null : serverProbe.out.slice(0, 500),
  permalinkError: /permalink attribute not recognised|slugorcontentbasename/i.test(serverProbe.out || ""),
});
// #endregion

console.log("\nWrote diagnostics to", LOG_PATH);
if (installed !== pinned) {
  console.log(
    `\nPREFLIGHT FAIL: installed Hugo ${installed} !== pinned ${pinned}. Install: mise use hugo-extended@${pinned}`
  );
}
