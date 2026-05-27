#!/usr/bin/env node
/**
 * VitePress build 完成后，将 learn/ 复制到 dist，确保部署后 demo 链接可访问。
 */

import { cp } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const DIST = join(ROOT, "docs-site/.vitepress/dist");

async function main() {
  await cp(join(ROOT, "learn"), join(DIST, "learn"), {
    recursive: true,
    force: true,
  });
  console.log("[copy-docs-assets] 已将 learn/ 复制到 dist");
}

main().catch((err) => {
  console.error("[copy-docs-assets] 失败：", err);
  process.exitCode = 1;
});
