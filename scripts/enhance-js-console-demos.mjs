#!/usr/bin/env node
/**
 * 为 JavaScript console demo 补齐：
 *   - <h1>（来自头注释「主题」）
 *   - DevTools hint
 *   - SCRIPT 区块标记（由 format:all-demos 统一格式化）
 *
 * 运行：node scripts/enhance-js-console-demos.mjs
 */

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const TARGET_DIRS = [join("apps", "javascript")];

function parseTheme(content) {
  const m = content.match(/<!--\s*([\s\S]*?)\s*-->/);
  return (m?.[1].match(/主题:\s*(.+)/) || [])[1]?.trim() || "Demo";
}

function hasH1(content) {
  return /<h1[\s>]/i.test(content);
}

function injectShell(content, theme) {
  let next = content;
  const insertBlock = [];

  if (!hasH1(next)) {
    insertBlock.push(`  <h1>${theme}</h1>`);
    insertBlock.push(
      `  <p class="hint">请打开 DevTools Console 查看输出。</p>`
    );
  }

  if (insertBlock.length) {
    next = next.replace(/<body([^>]*)>/i, (m, attrs) => {
      return `<body${attrs}>\n${insertBlock.join("\n")}`;
    });
  }

  return next;
}

async function walk(dirAbs, files) {
  const entries = await readdir(dirAbs, { withFileTypes: true });
  for (const ent of entries) {
    const abs = join(dirAbs, ent.name);
    if (ent.isDirectory()) await walk(abs, files);
    else if (ent.isFile() && ent.name.toLowerCase().endsWith(".html")) files.push(abs);
  }
}

async function main() {
  const files = [];
  for (const rel of TARGET_DIRS) {
    const abs = join(ROOT, rel);
    try {
      await stat(abs);
      await walk(abs, files);
    } catch {
      /* skip */
    }
  }

  let updated = 0;
  for (const abs of files) {
    const before = await readFile(abs, "utf8");
    const theme = parseTheme(before);
    const needs = !hasH1(before);
    if (!needs) continue;
    const after = injectShell(before, theme);
    if (after !== before) {
      await writeFile(abs, after, "utf8");
      updated++;
      console.log("[enhance-js-console-demos]", relative(ROOT, abs));
    }
  }
  console.log(`[enhance-js-console-demos] 完成，更新 ${updated} 个文件`);
}

main().catch((err) => {
  console.error("[enhance-js-console-demos] 失败：", err);
  process.exitCode = 1;
});
