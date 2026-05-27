#!/usr/bin/env node
/**
 * 为 JavaScript 01-基础 与 08-面试题/手写 demo 补齐：
 *   - <h1>（来自头注释「主题」）
 *   - 可见输出区 #demo-output
 *   - packages/shared/demo-log.js 引用
 *
 * 运行：node scripts/enhance-js-console-demos.mjs
 */

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const DEMO_LOG = join(ROOT, "packages/shared/demo-log.js");
const TARGET_DIRS = [join("apps", "javascript")];

function toPosix(p) {
  return p.split(sep).join("/");
}

function relDemoLog(fromAbs) {
  let rel = relative(dirname(fromAbs), DEMO_LOG);
  rel = toPosix(rel);
  if (!rel.startsWith(".")) rel = `./${rel}`;
  return rel.split("/").map(encodeURIComponent).join("/");
}

function parseTheme(content) {
  const m = content.match(/<!--\s*([\s\S]*?)\s*-->/);
  return (m?.[1].match(/主题:\s*(.+)/) || [])[1]?.trim() || "Demo";
}

function hasVisibleOutput(content) {
  return (
    /id\s*=\s*["']demo-output["']/i.test(content) ||
    /id\s*=\s*["']log["']/i.test(content) ||
    /class\s*=\s*["'][^"']*\bdemo-output\b/i.test(content) ||
    /id\s*=\s*["']out["']/i.test(content)
  );
}

function hasDemoLogScript(content) {
  return /demo-log\.js/i.test(content);
}

function hasH1(content) {
  return /<h1[\s>]/i.test(content);
}

function injectShell(content, fromAbs, theme) {
  let next = content;
  const insertBlock = [];

  if (!hasH1(next)) {
    insertBlock.push(`  <h1>${theme}</h1>`);
    insertBlock.push(
      `  <p class="hint">下方为 <code>console.log</code> 同步输出；也可打开 DevTools Console 查看。</p>`
    );
  }

  if (!hasVisibleOutput(next)) {
    insertBlock.push(
      `  <pre id="demo-output" class="demo-output" aria-live="polite"></pre>`
    );
  }

  if (insertBlock.length) {
    next = next.replace(/<body([^>]*)>/i, (m, attrs) => {
      return `<body${attrs}>\n${insertBlock.join("\n")}`;
    });
  }

  if (!hasDemoLogScript(next)) {
    const src = relDemoLog(fromAbs);
    const tag = `  <script src="${src}"></script>`;
    const scriptMatch = next.match(/<script(?![^>]*\bsrc\s*=)/i);
    if (scriptMatch) {
      next = next.replace(scriptMatch[0], `${tag}\n${scriptMatch[0]}`);
    } else if (/<\/body>/i.test(next)) {
      next = next.replace(/<\/body>/i, `${tag}\n</body>`);
    }
  }

  if (!/<style[^>]*>[\s\S]*\.hint/i.test(next) && next.includes('class="hint"')) {
    next = next.replace(
      /<\/head>/i,
      `  <style>.hint { color: #666; font-size: 0.9rem; margin: 0.5rem 0 1rem; }</style>\n</head>`
    );
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
    const needs =
      !hasH1(before) || !hasVisibleOutput(before) || !hasDemoLogScript(before);
    if (!needs) continue;
    const after = injectShell(before, abs, theme);
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
