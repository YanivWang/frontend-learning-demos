#!/usr/bin/env node
/** 将头注释「面试:」中非问句条目替换为标准问句（保留 01-基础 手写内容） */

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { parseDemoMetaFromContent } from "./lib/parse-demo-meta.mjs";
import { deriveInterviewBullets } from "./lib/demo-notes-helpers.mjs";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const SKIP = new Set(["libs", "lib"]);
const DONE = "apps/javascript/01-基础/";

async function walk(dir, list) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      if (!SKIP.has(e.name)) await walk(p, list);
    } else if (e.name.endsWith(".html")) list.push(p);
  }
}

function needsRefresh(bullets) {
  if (!bullets.length) return true;
  const qLike = bullets.filter((b) => /[？?]$/.test(b.trim()) || /^(什么是|如何|怎么|为什么|区别|手写)/.test(b));
  return qLike.length < 3;
}

function replaceInterviewBlock(content, bullets) {
  const lines = bullets.map((b) => `    - ${b.replace(/[？?]$/, "").trim()}`).join("\n");
  return content.replace(
    /(面试:\s*\n)([\s\S]*?)(?=\n\s*(?:难度|前置|相关|分类|主题):|\n-->)/,
    `$1${lines}\n`
  );
}

async function main() {
  const files = [];
  await walk(join(ROOT, "apps"), files);
  let n = 0;
  for (const abs of files) {
    const rel = relative(ROOT, abs).split(sep).join("/");
    if (rel.startsWith(DONE) || rel === "apps/index.html") continue;
    const content = await readFile(abs, "utf8");
    const meta = parseDemoMetaFromContent(content);
    if (!content.includes("面试:") || !needsRefresh(meta.interviewPoints)) continue;
    const bullets = deriveInterviewBullets(meta.points, meta.theme, []);
    const next = replaceInterviewBlock(content, bullets);
    if (next !== content) {
      await writeFile(abs, next, "utf8");
      n++;
    }
  }
  console.log(`[refresh-header-interview] 更新 ${n} 个文件`);
}

main();
