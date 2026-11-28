// Validates content/portfolio.ts before every build: unique slugs, and every referenced file exists.
// Run:  npm run check   (also runs automatically before `npm run build`)
import { existsSync } from "node:fs";
import { join } from "node:path";
import { portfolio, showreel } from "../content/portfolio.ts";

const errors: string[] = [];
const seen = new Set<string>();
const local = (p: string) => !p.startsWith("http");
const exists = (p: string) => existsSync(join(process.cwd(), "public", p));

for (const item of portfolio) {
  if (seen.has(item.slug)) errors.push(`Duplicate slug "${item.slug}"`);
  seen.add(item.slug);
  for (const key of ["poster", "previewSrc", "fullSrc", "beforeSrc"] as const) {
    const p = item[key];
    if (p && local(p) && !exists(p)) errors.push(`${item.slug}: ${key} file not found → public${p}`);
  }
  if (!item.services.length) errors.push(`${item.slug}: needs at least one service`);
}
for (const key of ["poster", "previewSrc", "fullSrc"] as const) {
  if (local(showreel[key]) && !exists(showreel[key])) errors.push(`showreel: ${key} file not found → public${showreel[key]}`);
}

if (errors.length) {
  console.error(`\nContent check failed (${errors.length}):\n - ` + errors.join("\n - ") + "\n");
  process.exit(1);
}
console.log(`Content check passed: ${portfolio.length} portfolio items, all files present.`);
