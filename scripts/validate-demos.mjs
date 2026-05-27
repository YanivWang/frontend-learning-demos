#!/usr/bin/env node
/**
 * 校验仓库 demo 规范：
 *   - 每个 .html 在 <!DOCTYPE 前有头注释，含 分类 / 主题 / 要点
 *   - 无重复 href（同路径不应出现两次）
 *   - 可选：抽取普通 <script> 做 node --check
 *
 * 运行：node scripts/validate-demos.mjs
 * CI 与本地改 demo 后均应通过。
 */

import { readdir, readFile, stat, writeFile, mkdtemp, rm } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync, spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { parseDemoMetaFromContent } from "./lib/parse-demo-meta.mjs";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");

const SECTIONS = [
  join("apps", "javascript"),
  join("apps", "css"),
  join("apps", "vue2"),
  join("apps", "vue3"),
  join("apps", "react18"),
  join("apps", "react19"),
  join("apps", "demos"),
  join("apps", "typescript"),
];
const SKIP_DIRS = new Set(["libs", "lib", "node_modules", ".git", "scripts"]);

const errors = [];

async function collectHtml(dirAbs, list) {
  const entries = await readdir(dirAbs, { withFileTypes: true });
  for (const ent of entries) {
    const abs = join(dirAbs, ent.name);
    if (ent.isDirectory()) {
      if (SKIP_DIRS.has(ent.name)) continue;
      await collectHtml(abs, list);
    } else if (ent.isFile() && ent.name.toLowerCase().endsWith(".html")) {
      const rel = relative(ROOT, abs);
      if (rel === "index.html") continue;
      list.push(abs);
    }
  }
}

function validateHeader(content, fileRel) {
  const beforeDoctype = content.split(/<!DOCTYPE/i)[0];
  const comment = beforeDoctype.match(/<!--\s*([\s\S]*?)\s*-->/);
  if (!comment) {
    errors.push(`${fileRel}: 缺少 <!DOCTYPE 前的头注释块`);
    return;
  }
  const block = comment[1];
  for (const key of ["分类", "主题", "要点"]) {
    if (!block.includes(`${key}:`)) {
      errors.push(`${fileRel}: 头注释缺少「${key}:」`);
    }
  }
}

function validateFilename(name, fileRel) {
  if (name === "index.html") return;
  if (/[_]/.test(name)) {
    errors.push(`${fileRel}: 文件名含下划线，应使用连字符（见 CONVENTIONS.md §3）`);
  }
  if (/^[a-z]{1,3}\d+\.html$/i.test(name)) {
    errors.push(`${fileRel}: 文件名像无意义编号（如 test1.html）`);
  }
}

const DEMO_NOTES_SECTIONS = [
  /^apps\/javascript\//,
  /^apps\/css\//,
  /^apps\/vue2\//,
  /^apps\/vue3\//,
  /^apps\/react18\//,
  /^apps\/react19\//,
  /^apps\/demos\//,
  /^apps\/typescript\//,
];

function validateDemoNotes(content, fileRel) {
  if (!DEMO_NOTES_SECTIONS.some((re) => re.test(fileRel))) return;
  const meta = parseDemoMetaFromContent(content);
  if (!content.includes("面试:")) {
    errors.push(`${fileRel}: demo 头注释缺少「面试:」（见 CONVENTIONS.md §4.2）`);
  } else if (meta.interviewPoints.length < 3) {
    errors.push(`${fileRel}: demo「面试:」至少 3 条 bullet`);
  }
  if (!/<section[^>]*class\s*=\s*["'][^"']*\bdemo-notes\b/i.test(content)) {
    errors.push(`${fileRel}: 缺少 section.demo-notes（运行 npm run transform:all-demos）`);
    return;
  }
  if (!/知识点要点/.test(content)) {
    errors.push(`${fileRel}: demo-notes 缺少 h2「知识点要点」`);
  }
  if (!/面试考点/.test(content)) {
    errors.push(`${fileRel}: demo-notes 缺少 h2「面试考点」`);
  }
  if (/待补充答法|<!-- 待补充 -->/.test(content)) {
    errors.push(`${fileRel}: demo-notes 含未完成的占位内容`);
  }
}

function validateVisibleLearningSurface(content, fileRel) {
  if (!/^apps\/javascript\//.test(fileRel)) return;
  if (!/<h1[\s>]/i.test(content)) {
    errors.push(`${fileRel}: JavaScript demo 须有 <h1>（运行 npm run enhance:js-demos）`);
  }
  if (!/console\.(log|info|warn|error|dir)\s*\(/i.test(content)) return;
  const hasOutput =
    /id\s*=\s*["']demo-output["']/i.test(content) ||
    /id\s*=\s*["']log["']/i.test(content) ||
    /class\s*=\s*["'][^"']*\bdemo-output\b/i.test(content) ||
    /id\s*=\s*["']out["']/i.test(content);
  if (!hasOutput) {
    errors.push(`${fileRel}: 含 console 输出的 JavaScript demo 须有可见输出区（#demo-output）`);
  }
}

function validatePageMeta(content, fileRel) {
  if (!/<html[^>]*\blang\s*=\s*["']zh-CN["']/i.test(content)) {
    errors.push(`${fileRel}: 缺少 lang="zh-CN"（运行 node scripts/inject-demo-nav.mjs 可自动补齐）`);
  }
  if (!/<meta[^>]*name\s*=\s*["']viewport["']/i.test(content)) {
    errors.push(`${fileRel}: 缺少 viewport meta（运行 node scripts/inject-demo-nav.mjs 可自动补齐）`);
  }
  if (!content.includes("<!-- DEMO_NAV_START -->")) {
    errors.push(`${fileRel}: 缺少页脚导航（运行 node scripts/inject-demo-nav.mjs）`);
  }
}

function stripHtmlComments(html) {
  return html.replace(/<!--[\s\S]*?-->/g, "");
}

function extractPlainScripts(html) {
  const withoutComments = stripHtmlComments(html);
  const scripts = [];
  const re = /<script(?![^>]*\btype\s*=)(?![^>]*\bsrc\s*=)([^>]*)>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(withoutComments)) !== null) {
    const body = m[2].trim();
    if (body) scripts.push(body);
  }
  return scripts;
}

async function checkScripts(html, fileRel) {
  const scripts = extractPlainScripts(html);
  if (!scripts.length) return;
  const dir = await mkdtemp(join(tmpdir(), "validate-demos-"));
  try {
    for (let i = 0; i < scripts.length; i++) {
      const file = join(dir, `snippet-${i}.js`);
      await writeFile(file, scripts[i], "utf8");
      try {
        execFileSync(process.execPath, ["--check", file], { stdio: "pipe" });
      } catch (e) {
        const msg = e.stderr?.toString().trim().split("\n")[0] || e.message;
        errors.push(`${fileRel}: 内联 <script> #${i + 1} 语法错误 — ${msg}`);
      }
    }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

async function main() {
  const files = [];
  for (const sec of SECTIONS) {
    const abs = join(ROOT, sec);
    try {
      await stat(abs);
      await collectHtml(abs, files);
    } catch {
      /* section optional */
    }
  }

  for (const abs of files) {
    const rel = relative(ROOT, abs).split(sep).join("/");
    const content = await readFile(abs, "utf8");
    validateHeader(content, rel);
    validateFilename(abs.split(sep).pop(), rel);
    validatePageMeta(content, rel);
    validateDemoNotes(content, rel);
    validateVisibleLearningSurface(content, rel);
    await checkScripts(content, rel);
  }

  // build-index 只检查，不写入，避免校验过程污染工作区。
  const build = spawnSync(process.execPath, [join(ROOT, "scripts/build-index.mjs"), "--check"], {
    cwd: ROOT,
    encoding: "utf8",
  });
  if (build.status !== 0) {
    errors.push(`build-index.mjs 失败:\n${build.stderr || build.stdout}`);
  }

  const manifest = JSON.parse(await readFile(join(ROOT, "manifest.json"), "utf8"));
  const indexed = manifest.sections.reduce(
    (s, sec) => s + sec.groups.reduce((g, gr) => g + gr.items.length, 0),
    0
  );
  if (indexed !== files.length) {
    errors.push(`manifest 索引 ${indexed} 个 demo，磁盘扫描 ${files.length} 个 — 数量不一致`);
  }

  const hrefs = new Set();
  for (const sec of manifest.sections) {
    for (const gr of sec.groups) {
      for (const it of gr.items) {
        if (hrefs.has(it.href)) {
          errors.push(`manifest 重复 href: ${it.href}`);
        }
        hrefs.add(it.href);
      }
    }
  }

  if (errors.length) {
    console.error(`[validate-demos] 失败，共 ${errors.length} 项：\n`);
    errors.forEach((e) => console.error("  •", e));
    process.exitCode = 1;
    return;
  }

  console.log(`[validate-demos] 通过：${files.length} 个 demo，头注释 / 脚本语法 / manifest 一致`);
}

main().catch((err) => {
  console.error("[validate-demos] 异常：", err);
  process.exitCode = 1;
});
