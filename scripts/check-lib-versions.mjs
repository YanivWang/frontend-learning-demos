#!/usr/bin/env node
/**
 * 检查 libs/ 下 vendored 文件首行注释是否包含版本号。
 * 运行：node scripts/check-lib-versions.mjs
 */

import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const LIB_ROOTS = [
  "apps/react18/libs",
  "apps/react19/libs",
  "apps/vue2/libs",
  "apps/vue3/libs",
  "packages/shared/libs",
];
const SKIP = new Set(["README.md"]);
const errors = [];

async function walk(dirAbs) {
  const entries = await readdir(dirAbs, { withFileTypes: true });
  for (const ent of entries) {
    const abs = join(dirAbs, ent.name);
    if (ent.isDirectory()) {
      await walk(abs);
    } else if (ent.isFile() && !SKIP.has(ent.name)) {
      const head = (await readFile(abs, "utf8")).slice(0, 500);
      if (
        !/\*\*\s*[\d.]+\s*\*\*|版本|@\d+\.\d+|vendored/i.test(head) &&
        !head.startsWith("/*!")
      ) {
        errors.push(`${abs.replace(ROOT + "/", "")}: 首段缺少版本注释（见 CONVENTIONS.md §5）`);
      }
    }
  }
}

async function main() {
  for (const rel of LIB_ROOTS) {
    const abs = join(ROOT, rel);
    try {
      await stat(abs);
      await walk(abs);
    } catch {
      /* optional */
    }
  }

  if (errors.length) {
    console.error(`[check-lib-versions] 失败 ${errors.length} 项：\n`);
    errors.forEach((e) => console.error("  •", e));
    process.exitCode = 1;
    return;
  }
  console.log("[check-lib-versions] 通过：libs 版本注释检查完成");
}

main().catch((err) => {
  console.error("[check-lib-versions] 异常：", err);
  process.exitCode = 1;
});
