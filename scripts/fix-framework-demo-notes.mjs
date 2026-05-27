#!/usr/bin/env node
/**
 * 将误注入 #app / #root 内的 .demo-notes 移到容器外，并补齐静态 h1 + hint。
 */

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { parseDemoMetaFromContent } from "./lib/parse-demo-meta.mjs";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const TARGETS = [
  join("apps", "vue2"),
  join("apps", "vue3"),
  join("apps", "react18"),
  join("apps", "react19"),
];
const SKIP_DIRS = new Set(["libs", "lib"]);
const HINT = '  <p class="hint">在浏览器中操作下方交互演示；复习要点与面试答法见上方区块。</p>';

async function walk(dir, list) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name)) await walk(p, list);
    } else if (e.name.endsWith(".html")) list.push(p);
  }
}

function fixHeaderIndent(content) {
  const m = content.match(/<!--\s*([\s\S]*?)\s*-->/);
  if (!m) return content;
  const fixed = m[1]
    .split("\n")
    .map((line) => {
      if (/^(分类|主题|难度|前置|相关|要点|面试):/.test(line.trim())) {
        return line.trimStart().startsWith("  ") ? line : `  ${line.trimStart()}`;
      }
      if (/^\s*-\s/.test(line)) return line.startsWith("    ") ? line : `    ${line.trimStart()}`;
      return line;
    })
    .join("\n");
  return content.replace(m[0], `<!--\n${fixed}\n-->`);
}

function fixFile(content) {
  const sectionRe =
    /<section[^>]*class\s*=\s*["'][^"']*\bdemo-notes\b[\s\S]*?<\/section>/i;
  const section = content.match(sectionRe);
  if (!section) return { content, changed: false };

  let next = content.replace(sectionRe, "");
  const notes = section[0];
  const mountRe = /(<body[^>]*>)\s*(<div[^>]+id\s*=\s*["'](?:app|root)["'])/i;
  const meta = parseDemoMetaFromContent(content);
  const theme = meta.theme || "Demo";

  if (mountRe.test(next)) {
    let prefix = "";
    const beforeMount = next.split(/<div[^>]+id\s*=\s*["'](?:app|root)["']/i)[0];
    if (!/<h1[^>]*>[^<{]+<\/h1>/i.test(beforeMount)) {
      prefix = `  <h1>${theme}</h1>\n${HINT}\n`;
    }
    if (!beforeMount.includes("demo-notes")) {
      next = next.replace(mountRe, `$1\n${prefix}${notes}\n  $2`);
    }
  }

  next = fixHeaderIndent(next);
  return { content: next, changed: next !== content };
}

async function main() {
  const files = [];
  for (const t of TARGETS) {
    const abs = join(ROOT, t);
    try {
      await stat(abs);
      await walk(abs, files);
    } catch {
      /* */
    }
  }
  let n = 0;
  for (const abs of files) {
    const rel = relative(ROOT, abs);
    const before = await readFile(abs, "utf8");
    const { content, changed } = fixFile(before);
    if (changed) {
      await writeFile(abs, content, "utf8");
      n++;
      console.log("[fix-framework]", rel);
    }
  }
  console.log(`[fix-framework] 完成，调整 ${n} 个文件`);
}

main();
