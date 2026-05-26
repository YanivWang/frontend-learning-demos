#!/usr/bin/env node
/**
 * 扫描仓库内所有 .html demo 文件，生成：
 *   - index.html        总入口（按目录分组的导航页）
 *   - manifest.json     demo 元数据（路径 / 标题 / 分组）
 *
 * 运行：
 *   node scripts/build-index.mjs
 *
 * 约定见 CONVENTIONS.md：
 *   - 顶层分类目录：javascript / css / vue2 / vue3 / react / demos
 *   - libs / lib 子目录视为第三方/工具，不扫描
 *   - 根目录 index.html 是输出目标，不参与扫描
 */

import { readdir, stat, writeFile } from "node:fs/promises";
import { join, relative, sep, posix } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");

// 仓库子目录扫描配置（顺序即在导航页中的展示顺序）
const SECTIONS = [
  { dir: "javascript", title: "JavaScript", desc: "纯 JS 知识点 demo（按 01–09 编号分类）" },
  { dir: "css",        title: "CSS",         desc: "布局 / 动画 / 视觉效果 / 响应式" },
  { dir: "vue2",       title: "Vue 2",       desc: "响应式原理、基础语法、组件、路由与状态" },
  { dir: "vue3",       title: "Vue 3",       desc: "响应式状态、生命周期钩子" },
  { dir: "react",      title: "React 18",    desc: "JSX、元素、函数组件、类组件、生命周期" },
  { dir: "demos",      title: "综合 Demo",    desc: "拖拽 / SVG / ViewPager 等小项目" },
];

// 这些子目录不参与扫描（视为运行时 / 工具库 / VCS / 依赖目录）
// 注意：这里只匹配「子目录名」，对顶层分类目录（含 css/）无影响。
const SKIP_DIRS = new Set(["libs", "lib", "node_modules", ".git", "scripts"]);

/**
 * 把绝对路径转成 URL 路径（用 / 拼接，对每段做 encodeURIComponent）。
 * 主要是为了让中文文件名在浏览器里能被正确请求。
 */
function toHref(absPath) {
  const rel = relative(ROOT, absPath).split(sep).join(posix.sep);
  return rel.split("/").map(encodeURIComponent).join("/");
}

/**
 * 从文件名生成展示用的标题：
 *   "01-Promise-all并发与then串行.html" -> "Promise-all并发与then串行"
 *   "变量进阶.html"                     -> "变量进阶"
 */
function fileToTitle(filename) {
  let name = filename.replace(/\.html$/i, "");
  // 去掉 "01-" / "02-" 这种纯数字编号前缀（保留 vue2-* 这种语义前缀）
  name = name.replace(/^\d{2}-/, "");
  return name;
}

/**
 * 排序：先按文件名里的数字编号升序，没有编号的排到后面、按中文/拉丁字典序。
 */
function sortFiles(a, b) {
  const numA = a.match(/^(\d+)/);
  const numB = b.match(/^(\d+)/);
  if (numA && numB) return Number(numA[1]) - Number(numB[1]);
  if (numA) return -1;
  if (numB) return 1;
  return a.localeCompare(b, "zh-Hans-CN");
}

/**
 * 递归收集目录下所有 .html 文件，返回 { 相对目录路径: [文件名…] }。
 */
async function collect(dirAbs, results) {
  const entries = await readdir(dirAbs, { withFileTypes: true });
  const htmls = [];
  for (const ent of entries) {
    const abs = join(dirAbs, ent.name);
    if (ent.isDirectory()) {
      if (SKIP_DIRS.has(ent.name)) continue;
      await collect(abs, results);
    } else if (ent.isFile() && ent.name.toLowerCase().endsWith(".html")) {
      // 极端情况：仓库根的 index.html 不应被自己扫到（main 里只从 SECTIONS 子目录开始扫，正常不会触发）
      if (relative(ROOT, abs) === "index.html") continue;
      htmls.push(ent.name);
    }
  }
  if (htmls.length) {
    htmls.sort(sortFiles);
    results.set(dirAbs, htmls);
  }
}

/**
 * 把绝对目录路径转成相对仓库根的显示路径（"javascript/04-ES6+/异步/Promise"）。
 */
function relDirDisplay(dirAbs) {
  return relative(ROOT, dirAbs).split(sep).join("/");
}

async function main() {
  const manifest = { generatedAt: new Date().toISOString(), sections: [] };
  const sectionsHtml = [];

  for (const sec of SECTIONS) {
    const sectionAbs = join(ROOT, sec.dir);
    let exists = true;
    try { await stat(sectionAbs); } catch { exists = false; }
    if (!exists) continue;

    const dirToFiles = new Map();
    await collect(sectionAbs, dirToFiles);

    const groupsSorted = [...dirToFiles.entries()].sort((a, b) =>
      relDirDisplay(a[0]).localeCompare(relDirDisplay(b[0]), "zh-Hans-CN")
    );

    if (!groupsSorted.length) continue;

    const sectionManifest = { dir: sec.dir, title: sec.title, groups: [] };
    const groupBlocks = [];

    for (const [dirAbs, files] of groupsSorted) {
      const groupRel = relDirDisplay(dirAbs);
      const items = files.map((f) => ({
        title: fileToTitle(f),
        href: toHref(join(dirAbs, f)),
      }));
      sectionManifest.groups.push({ path: groupRel, items });

      // HTML 渲染
      const list = items
        .map((it) => `        <li><a href="${it.href}">${escapeHtml(it.title)}</a></li>`)
        .join("\n");
      groupBlocks.push(
        `    <h3>${escapeHtml(groupRel)}</h3>\n    <ul>\n${list}\n    </ul>`
      );
    }

    manifest.sections.push(sectionManifest);
    sectionsHtml.push(
      `  <section>\n    <h2>${escapeHtml(sec.title)}</h2>\n    <p class="hint">${escapeHtml(sec.desc)}</p>\n${groupBlocks.join("\n")}\n  </section>`
    );
  }

  const html = renderIndex(sectionsHtml.join("\n\n"), manifest);
  await writeFile(join(ROOT, "index.html"), html, "utf8");
  await writeFile(
    join(ROOT, "manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n",
    "utf8"
  );

  const totalFiles = manifest.sections.reduce(
    (s, sec) => s + sec.groups.reduce((g, gr) => g + gr.items.length, 0),
    0
  );
  console.log(
    `[build-index] 已生成 index.html / manifest.json，共扫描 ${manifest.sections.length} 个分类、${totalFiles} 个 demo`
  );
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderIndex(sectionsHtml, manifest) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>js-css-vue-react-learn · 入口</title>
  <style>
    :root { font-family: system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif; line-height: 1.55; color: #1a1a1a; }
    body { max-width: 60rem; margin: 2rem auto 4rem; padding: 0 1.25rem; }
    h1 { font-size: 1.6rem; margin: 0 0 0.25rem; }
    h2 { font-size: 1.15rem; margin: 2rem 0 0.25rem; padding-bottom: 0.3rem; border-bottom: 1px solid #e3e3e3; }
    h3 { font-size: 0.9rem; color: #555; margin: 1.1rem 0 0.35rem; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
    ul { margin: 0.25rem 0 0.75rem; padding-left: 1.25rem; }
    li { margin: 0.1rem 0; }
    a { color: #0969da; text-decoration: none; }
    a:hover { text-decoration: underline; }
    a:visited { color: #6f42c1; }
    .hint { color: #666; font-size: 0.875rem; margin: 0 0 0.5rem; }
    .meta { color: #888; font-size: 0.8rem; margin-top: 0.25rem; }
    .meta code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
  </style>
</head>
<body>
  <h1>js-css-vue-react-learn</h1>
  <p class="hint">前端语法与框架复习 Demo · 打开任意链接即可学习 · <a href="README.md">README</a> · <a href="CONVENTIONS.md">命名约定</a></p>
  <p class="meta">本页由 <code>scripts/build-index.mjs</code> 自动生成于 ${escapeHtml(manifest.generatedAt)}。不要手动编辑。</p>

${sectionsHtml}

</body>
</html>
`;
}

main().catch((err) => {
  console.error("[build-index] 失败：", err);
  process.exitCode = 1;
});
