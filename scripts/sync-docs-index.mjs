#!/usr/bin/env node
/**
 * 根据 manifest.json 同步 docs/index.md 中的 demo 数量与分类概览数字。
 * 由 npm run build:index 链式调用。
 *
 * 运行：node scripts/sync-docs-index.mjs [--check]
 */

import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const INDEX_PATH = join(ROOT, "docs/index.md");
const isCheckMode = process.argv.includes("--check");

function countSection(manifest, title) {
  const sec = manifest.sections.find((s) => s.title === title);
  if (!sec) return 0;
  return sec.groups.reduce((n, g) => n + g.items.length, 0);
}

function renderIndex(manifest) {
  const total = manifest.sections.reduce(
    (sum, sec) => sum + sec.groups.reduce((n, g) => n + g.items.length, 0),
    0
  );
  const js = countSection(manifest, "JavaScript");
  const css = countSection(manifest, "CSS");
  const vue2 = countSection(manifest, "Vue 2");
  const vue3 = countSection(manifest, "Vue 3");
  const react18 = countSection(manifest, "React 18");
  const react19 = countSection(manifest, "React 19");
  const ts = countSection(manifest, "TypeScript");
  const demos = countSection(manifest, "综合 Demo");

  return `---
layout: home

hero:
  name: frontend-learning-demos
  text: 前端语法与框架复习
  tagline: ${total} 个可独立打开的 HTML Demo · 即开即学
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 浏览 Demo
      link: /demos/

features:
  - title: 可运行 Demo
    details: 每个 HTML 直接在浏览器打开。JavaScript、CSS、Vue 2/3、React 18/19、TypeScript 全覆盖。
  - title: 统一元数据
    details: demo 头注释驱动 manifest、README 清单与 VitePress 导航，改一处、处处同步。
  - title: 单一入口
    details: VitePress 提供搜索、侧边栏与 Demo 索引；demo 本体仍在 apps/ 目录。

---

## 分类概览

| 分类 | 路径 | demo 数 | 说明 |
| --- | --- | ---: | --- |
| JavaScript | \`apps/javascript/\` | ${js} | 纯 JS，按 01–09 编号 |
| CSS | \`apps/css/\` | ${css} | 布局、动画、响应式、现代特性 |
| Vue 2 / Vue 3 | \`apps/vue2/\` \`apps/vue3/\` | ${vue2} / ${vue3} | 框架语法与原理 |
| React 18 / React 19 | \`apps/react18/\` \`apps/react19/\` | ${react18} / ${react19} | 函数组件 + 类组件 / 19 新特性 |
| TypeScript | \`apps/typescript/\` | ${ts} | 基础、进阶、工程化 |
| 综合 Demo | \`apps/demos/\` | ${demos} | 拖拽、ViewPager、Todo 等 |

左侧 **Demo 分类** 侧边栏由 \`manifest.json\` 自动生成，新增 demo 后运行 \`npm run build:index\` 即可更新。

完整可搜索摘要见 [Demo 搜索索引](/demos/search-index)。
`;
}

async function main() {
  const manifest = JSON.parse(await readFile(join(ROOT, "manifest.json"), "utf8"));
  const next = renderIndex(manifest);
  const current = await readFile(INDEX_PATH, "utf8");

  if (isCheckMode) {
    if (current !== next) {
      console.error("[sync-docs-index] 失败：docs/index.md 与 manifest 不一致，请运行 node scripts/sync-docs-index.mjs");
      process.exitCode = 1;
      return;
    }
    console.log("[sync-docs-index] 通过：docs/index.md 已同步");
    return;
  }

  await writeFile(INDEX_PATH, next, "utf8");
  console.log("[sync-docs-index] 已更新 docs/index.md");
}

main().catch((err) => {
  console.error("[sync-docs-index] 异常：", err);
  process.exitCode = 1;
});
