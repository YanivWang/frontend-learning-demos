#!/usr/bin/env node
/**
 * 从各 demo 的 HTML 头注释（分类 / 主题）生成 README 用的 Markdown 表格片段。
 * 运行：node scripts/gen-readme-tables.mjs [javascript|css|vue2|vue3|react18|react19|typescript]
 */

import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const SKIP = new Set(["libs", "lib", "node_modules", ".git"]);

const CONFIG = {
  javascript: { scan: join("learn", "javascript"), label: "learn/javascript" },
  css: { scan: join("learn", "css"), label: "learn/css" },
  vue2: { scan: join("learn", "vue2", "src"), label: "learn/vue2/src" },
  vue3: { scan: join("learn", "vue3", "src"), label: "learn/vue3/src" },
  react18: { scan: join("learn", "react18", "src"), label: "learn/react18/src" },
  react19: { scan: join("learn", "react19", "src"), label: "learn/react19/src" },
  typescript: { scan: join("learn", "typescript"), label: "learn/typescript" },
};

function parseHeader(content) {
  const m = content.match(/<!--\s*([\s\S]*?)\s*-->/);
  if (!m) return { theme: "—" };
  const theme = (m[1].match(/主题:\s*(.+)/) || [])[1]?.trim() || "—";
  return { theme: theme.replace(/\|/g, "\\|") };
}

async function collect(dirAbs, rows) {
  const entries = await readdir(dirAbs, { withFileTypes: true });
  for (const ent of entries) {
    const abs = join(dirAbs, ent.name);
    if (ent.isDirectory()) {
      if (SKIP.has(ent.name)) continue;
      await collect(abs, rows);
    } else if (ent.isFile() && ent.name.toLowerCase().endsWith(".html")) {
      const content = await readFile(abs, "utf8");
      const { theme } = parseHeader(content);
      const rel = relative(join(ROOT, CONFIG[process.argv[2] || "javascript"].scan), abs)
        .split("\\")
        .join("/");
      rows.push({ rel, theme });
    }
  }
}

async function main() {
  const key = process.argv[2];
  if (!key || !CONFIG[key]) {
    console.error("用法: node scripts/gen-readme-tables.mjs <javascript|css|vue2|vue3|react18|react19|typescript>");
    process.exit(1);
  }
  const { scan } = CONFIG[key];
  const rows = [];
  await collect(join(ROOT, scan), rows);
  rows.sort((a, b) => a.rel.localeCompare(b.rel, "zh-Hans-CN"));
  console.log(`<!-- ${rows.length} demos -->\n`);
  console.log("| 文件 | 主题 |");
  console.log("|---|---|");
  for (const r of rows) {
    console.log(`| \`${r.rel}\` | ${r.theme} |`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
