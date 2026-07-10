/**
 * Run Hugo via mise so npm scripts use the version pinned in mise.toml,
 * even when Scoop/other PATH entries still point at an older hugo.exe.
 */
const { spawnSync } = require("child_process");

const args = process.argv.slice(2);

const miseCheck = spawnSync("mise", ["--version"], { encoding: "utf8", shell: true });
if (miseCheck.status !== 0) {
  console.error(
    "mise is required to run the pinned Hugo version. Install: scoop install mise && mise install"
  );
  process.exit(1);
}

const result = spawnSync("mise", ["exec", "--", "hugo", ...args], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

process.exit(result.status == null ? 1 : result.status);
