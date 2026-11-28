// Fails the build when the shipped files grow past their budgets.
// Run after `vite build`. Sizes are gzip, which is what phones download.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const DIST = "dist";
const BUDGETS = [
  { label: "All JavaScript", match: /\.js$/, maxKb: 230 },
  { label: "All CSS", match: /\.css$/, maxKb: 25 },
  { label: "Largest single JavaScript file", match: /\.js$/, maxKb: 120, single: true },
  { label: "Venue map data", match: /venue-map.*\.js$/, maxKb: 60 },
];
const REQUIRED = ["index.html", "logo-lab.html", "favicon.svg", "og.png"];

const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else files.push(p);
  }
})(DIST);

let failed = false;
for (const r of REQUIRED) {
  if (!files.some((f) => f.endsWith(r))) {
    console.error(`MISSING  ${r} is not in ${DIST}/`);
    failed = true;
  }
}

const gz = (f) => gzipSync(readFileSync(f)).length / 1024;
for (const b of BUDGETS) {
  const hits = files.filter((f) => b.match.test(f));
  const size = b.single ? Math.max(0, ...hits.map(gz)) : hits.reduce((a, f) => a + gz(f), 0);
  const ok = size <= b.maxKb;
  if (!ok) failed = true;
  console.log(`${ok ? "OK      " : "TOO BIG "} ${b.label}: ${size.toFixed(1)} KB of ${b.maxKb} KB`);
}

if (failed) {
  console.error("\nBudget check failed. Shrink the files above, or raise the budget on purpose.");
  process.exit(1);
}
