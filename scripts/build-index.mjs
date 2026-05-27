#!/usr/bin/env node
/**
 * 扫描仓库内所有 .html demo 文件，生成 manifest.json（demo 元数据 / 路径 / 分组）。
 * VitePress 侧边栏与 demo 页脚导航均依赖此文件。
 *
 * 运行：
 *   node scripts/build-index.mjs
 *
 * 约定见 CONVENTIONS.md：
 *   - 学习分类目录：learn/javascript / learn/css / learn/vue2 / learn/vue3 / learn/react / learn/react19 / learn/demos
 *   - libs / lib 子目录视为第三方/工具，不扫描
 */

import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import { join, relative, sep, posix } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const args = new Set(process.argv.slice(2));
const isCheckMode = args.has("--check");

for (const arg of args) {
  if (arg !== "--check") {
    console.error("用法: node scripts/build-index.mjs [--check]");
    process.exit(1);
  }
}

const SECTIONS = [
  { dir: "learn/javascript", title: "JavaScript" },
  { dir: "learn/css", title: "CSS" },
  { dir: "learn/vue2", title: "Vue 2" },
  { dir: "learn/vue3", title: "Vue 3" },
  { dir: "learn/react", title: "React 18" },
  { dir: "learn/react19", title: "React 19" },
  { dir: "learn/demos", title: "综合 Demo" },
  { dir: "learn/typescript", title: "TypeScript" },
];

const SKIP_DIRS = new Set(["libs", "lib", "node_modules", ".git", "scripts"]);

function toHref(absPath) {
  const rel = relative(ROOT, absPath).split(sep).join(posix.sep);
  return rel.split("/").map(encodeURIComponent).join("/");
}

function fileToTitle(filename) {
  let name = filename.replace(/\.html$/i, "");
  name = name.replace(/^\d{2}-/, "");
  return name;
}

function sortFiles(a, b) {
  const numA = a.match(/^(\d+)/);
  const numB = b.match(/^(\d+)/);
  if (numA && numB) return Number(numA[1]) - Number(numB[1]);
  if (numA) return -1;
  if (numB) return 1;
  return a.localeCompare(b, "zh-Hans-CN");
}

async function parseDemoMeta(absPath) {
  const content = await readFile(absPath, "utf8");
  const comment = content.match(/<!--\s*([\s\S]*?)\s*-->/);
  const block = comment?.[1] || "";
  const theme = (block.match(/主题:\s*(.+)/) || [])[1]?.trim() || "";
  const category = (block.match(/分类:\s*(.+)/) || [])[1]?.trim() || "";
  const bullets = [...block.matchAll(/^\s*-\s*(.+)$/gm)].map((m) => m[1].trim());
  return { theme, category, keywords: bullets.join(" ") };
}

async function collect(dirAbs, results) {
  const entries = await readdir(dirAbs, { withFileTypes: true });
  const htmls = [];
  for (const ent of entries) {
    const abs = join(dirAbs, ent.name);
    if (ent.isDirectory()) {
      if (SKIP_DIRS.has(ent.name)) continue;
      await collect(abs, results);
    } else if (ent.isFile() && ent.name.toLowerCase().endsWith(".html")) {
      htmls.push(ent.name);
    }
  }
  if (htmls.length) {
    htmls.sort(sortFiles);
    results.set(dirAbs, htmls);
  }
}

function relDirDisplay(dirAbs) {
  return relative(ROOT, dirAbs).split(sep).join("/");
}

async function buildManifest() {
  const manifest = {
    schemaVersion: 1,
    generatedBy: "scripts/build-index.mjs",
    sections: [],
  };

  for (const sec of SECTIONS) {
    const sectionAbs = join(ROOT, sec.dir);
    let exists = true;
    try {
      await stat(sectionAbs);
    } catch {
      exists = false;
    }
    if (!exists) continue;

    const dirToFiles = new Map();
    await collect(sectionAbs, dirToFiles);

    const groupsSorted = [...dirToFiles.entries()].sort((a, b) =>
      relDirDisplay(a[0]).localeCompare(relDirDisplay(b[0]), "zh-Hans-CN")
    );
    if (!groupsSorted.length) continue;

    const sectionManifest = { dir: sec.dir, title: sec.title, groups: [] };

    for (const [dirAbs, files] of groupsSorted) {
      const groupRel = relDirDisplay(dirAbs);
      const items = await Promise.all(
        files.map(async (f) => {
          const abs = join(dirAbs, f);
          const meta = await parseDemoMeta(abs);
          return {
            title: fileToTitle(f),
            href: toHref(abs),
            theme: meta.theme,
            category: meta.category,
            searchText: [fileToTitle(f), meta.theme, meta.category, meta.keywords].join(" "),
          };
        })
      );
      sectionManifest.groups.push({ path: groupRel, items });
    }

    manifest.sections.push(sectionManifest);
  }

  return manifest;
}

async function main() {
  const manifest = await buildManifest();
  const manifestJson = JSON.stringify(manifest, null, 2) + "\n";
  const totalFiles = manifest.sections.reduce(
    (s, sec) => s + sec.groups.reduce((g, gr) => g + gr.items.length, 0),
    0
  );

  if (isCheckMode) {
    const currentManifest = await readFile(join(ROOT, "manifest.json"), "utf8");
    if (currentManifest !== manifestJson) {
      console.error(
        "[build-index] 失败：manifest.json 与脚本输出不一致，请运行 node scripts/build-index.mjs"
      );
      process.exitCode = 1;
      return;
    }
    console.log(
      `[build-index] 通过：manifest.json 已同步，共 ${manifest.sections.length} 个分类、${totalFiles} 个 demo`
    );
    return;
  }

  await writeFile(join(ROOT, "manifest.json"), manifestJson, "utf8");
  console.log(
    `[build-index] 已生成 manifest.json，共扫描 ${manifest.sections.length} 个分类、${totalFiles} 个 demo`
  );
}

main().catch((err) => {
  console.error("[build-index] 失败：", err);
  process.exitCode = 1;
});
