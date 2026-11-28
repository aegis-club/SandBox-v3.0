// Integrity checks on the changes in one pull request.
// CI runs this on every pull request. It looks only at what the pull request
// changes, compared with the base branch, and fails on anything risky.
//
// Local use: node scripts/pr-integrity.mjs [base-ref]   (default: origin/main)

import { execFileSync } from "node:child_process";
import { appendFileSync, existsSync, readFileSync, statSync } from "node:fs";

const git = (...args) => execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }).trim();

const base = process.argv[2] ?? (process.env.GITHUB_BASE_REF ? `origin/${process.env.GITHUB_BASE_REF}` : "origin/main");
const range = `${base}...HEAD`;
const event = process.env.GITHUB_EVENT_PATH && existsSync(process.env.GITHUB_EVENT_PATH)
  ? JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"))
  : {};
const pr = event.pull_request ?? null;
const labels = new Set((pr?.labels ?? []).map((l) => l.name));

const changed = git("diff", "--name-status", "--no-renames", range)
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const [status, ...rest] = line.split("\t");
    return { status, path: rest.join("\t") };
  });
const present = changed.filter((c) => c.status !== "D");
const paths = changed.map((c) => c.path);

const failures = [];
const warnings = [];
const fail = (rule, detail) => failures.push({ rule, detail });
const warn = (rule, detail) => warnings.push({ rule, detail });

// Added lines per file, with their line numbers in the new file.
function addedLines(path) {
  const diff = git("diff", "--unified=0", "--no-color", range, "--", path);
  const out = [];
  let line = 0;
  for (const row of diff.split("\n")) {
    const hunk = row.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
    if (hunk) {
      line = Number(hunk[1]);
      continue;
    }
    if (row.startsWith("+") && !row.startsWith("+++")) {
      out.push({ line, text: row.slice(1) });
      line++;
    }
  }
  return out;
}

const textFile = (p) => /\.(ts|tsx|js|mjs|cjs|json|css|html|md|yml|yaml|txt|svg|py|env|example)$/i.test(p) || /(^|\/)\.[^/]+$/.test(p);

// 1. Files that must never be committed.
const FORBIDDEN = [
  { re: /(^|\/)\.env(\.|$)(?!example$)/, why: "environment file with secrets" },
  { re: /\.(pem|key|p12|pfx|keystore|jks)$/i, why: "private key or certificate" },
  { re: /(^|\/)(node_modules|dist|\.vercel|playwright-report|test-results)\//, why: "generated or local-only folder" },
  { re: /(^|\/)id_(rsa|ed25519)(\.pub)?$/, why: "SSH key" },
];
for (const { path } of present) {
  for (const f of FORBIDDEN) if (f.re.test(path)) fail("forbidden-file", `${path}: ${f.why}`);
}

// 2. Large files.
const MAX_BYTES = 1024 * 1024;
for (const { path } of present) {
  if (existsSync(path) && statSync(path).size > MAX_BYTES) {
    fail("large-file", `${path} is ${(statSync(path).size / 1024 / 1024).toFixed(1)} MB. The limit is 1 MB.`);
  }
}

// 3. Secrets in added lines.
const SECRETS = [
  { re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/, why: "private key" },
  { re: /\bAKIA[0-9A-Z]{16}\b/, why: "AWS access key" },
  { re: /\bgh[pousr]_[A-Za-z0-9]{36,}\b/, why: "GitHub token" },
  { re: /\bgithub_pat_[A-Za-z0-9_]{50,}\b/, why: "GitHub token" },
  { re: /\bAIza[0-9A-Za-z_-]{35}\b/, why: "Google API key" },
  { re: /\bsk_(live|test)_[0-9A-Za-z]{20,}\b/, why: "Stripe secret key" },
  { re: /\bxox[abpors]-[0-9A-Za-z-]{10,}\b/, why: "Slack token" },
  { re: /\beyJ[A-Za-z0-9_-]{20,}\.eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\b/, why: "JWT, such as a Supabase service key" },
  { re: /(api[_-]?key|secret|password|token)\s*[:=]\s*["'][^"'\s]{16,}["']/i, why: "hard-coded credential" },
];
for (const { path } of present) {
  if (!textFile(path) || path === "package-lock.json") continue;
  for (const { line, text } of addedLines(path)) {
    for (const s of SECRETS) if (s.re.test(text)) fail("secret", `${path}:${line}: looks like a ${s.why}`);
  }
}

// 4. Leftovers that should not ship.
for (const { path } of present) {
  if (!/\.(ts|tsx|js|mjs)$/.test(path)) continue;
  const inTests = path.startsWith("tests/");
  const inScripts = path.startsWith("scripts/");
  for (const { line, text } of addedLines(path)) {
    if (/\b(test|it|describe)\.only\s*\(/.test(text)) fail("focused-test", `${path}:${line}: .only() skips every other test`);
    if (/\b(test|it|describe)\.skip\s*\(/.test(text)) warn("skipped-test", `${path}:${line}: a skipped test`);
    if (/^\s*debugger\s*;?\s*$/.test(text)) fail("debugger", `${path}:${line}: debugger statement`);
    if (!inTests && !inScripts && /\bconsole\.(log|debug)\s*\(/.test(text)) fail("console-log", `${path}:${line}: console.log in site code`);
  }
}

// 5. Code changes need test changes.
const codeChanged = paths.some((p) => /^src\/.*\.(ts|tsx)$/.test(p) && !p.startsWith("src/lab/"));
const testsChanged = paths.some((p) => p.startsWith("tests/"));
if (codeChanged && !testsChanged) {
  if (labels.has("tests-not-needed")) warn("tests", "Site code changed without test changes. The tests-not-needed label allows it.");
  else fail("tests", "Site code in src/ changed, but nothing in tests/ changed. Add or update a test, or ask an owner to add the tests-not-needed label.");
}

// 6. Dependencies.
const pkgChanged = paths.includes("package.json");
const lockChanged = paths.includes("package-lock.json");
if (pkgChanged) {
  const before = JSON.parse(git("show", `${base}:package.json`));
  const after = JSON.parse(readFileSync("package.json", "utf8"));
  const deps = (p) => ({ ...(p.dependencies ?? {}), ...(p.devDependencies ?? {}) });
  const [b, a] = [deps(before), deps(after)];
  const depsChanged = JSON.stringify(b) !== JSON.stringify(a);
  if (depsChanged && !lockChanged) fail("lockfile", "package.json dependencies changed, but package-lock.json did not. Run npm install and commit the lockfile.");
  for (const name of Object.keys(a)) if (!(name in b)) warn("new-dependency", `New dependency: ${name}@${a[name]}`);
  const sb = JSON.stringify(before.scripts ?? {});
  const sa = JSON.stringify(after.scripts ?? {});
  if (sb !== sa) warn("scripts", "npm scripts changed. Reviewers: check what now runs in CI and on Vercel.");
}
if (lockChanged && !pkgChanged) warn("lockfile", "package-lock.json changed without package.json. Check that this was intended.");

// 7. Files that control CI, review, and deploys.
const SENSITIVE = [/^\.github\//, /^vercel\.json$/, /^playwright\.config\.ts$/, /^vitest\.config\.ts$/, /^scripts\/(pr-integrity|check-budget)\.mjs$/, /^tsconfig.*\.json$/, /^vite\.config\.ts$/];
for (const p of paths) if (SENSITIVE.some((re) => re.test(p))) warn("sensitive-file", `${p} controls CI, review, or deploys.`);

// 8. Removed tests.
for (const c of changed) if (c.status === "D" && c.path.startsWith("tests/")) warn("deleted-test", `${c.path} was deleted.`);
const removedAssertions = changed
  .filter((c) => c.path.startsWith("tests/") && c.status !== "D")
  .reduce((n, c) => n + git("diff", "--unified=0", range, "--", c.path).split("\n").filter((l) => /^-(?!--).*\b(expect|test|it)\(/.test(l)).length, 0);
if (removedAssertions > 0) warn("removed-assertions", `${removedAssertions} lines with expect(), test(), or it() were removed from tests.`);

// 9. Pull request description.
if (pr) {
  const body = (pr.body ?? "").replace(/<!--[\s\S]*?-->/g, "").trim();
  if (body.length < 30) fail("description", "The pull request needs a description of what changed and how it was checked.");
}

// Report.
const summary = [
  `## Pull request integrity`,
  ``,
  `Compared ${range}: ${changed.length} file(s) changed.`,
  ``,
  failures.length ? `### Failures (${failures.length})` : `### No failures`,
  ...failures.map((f) => `- **${f.rule}**: ${f.detail}`),
  ``,
  warnings.length ? `### For reviewers (${warnings.length})` : `### Nothing for reviewers to double-check`,
  ...warnings.map((w) => `- **${w.rule}**: ${w.detail}`),
].join("\n");
console.log(summary);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + "\n");
for (const f of failures) console.log(`::error title=Integrity: ${f.rule}::${f.detail}`);
for (const w of warnings) console.log(`::warning title=Integrity: ${w.rule}::${w.detail}`);
process.exit(failures.length ? 1 : 0);
