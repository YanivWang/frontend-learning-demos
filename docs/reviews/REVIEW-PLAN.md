# 全量审查与仓库演进（已完成）

**当前规模**：**323** 个可索引 demo（`javascript` 120 · `css` 36 · `vue2` 57 · `vue3` 39 · `react` 52 · `typescript` 15 · `demos` 4）。

---

## 阶段 A：全量审查修复并补注释（已完成）

- [x] `learn/javascript/` **120** · `learn/css/` **36** · `learn/vue2/` **57** · `learn/vue3/` **39** · `learn/react18/` **52** · `learn/typescript/` **15** · `learn/demos/` **4**
- [x] 每个 demo 统一头注释（`分类` / `主题` / `要点`）
- [x] 运行时 bug、过时 API、注释与代码不一致已修复

## 阶段 B：规范统一 · 自动化 · 内容补齐（已完成）

- [x] **React**：删除 `src/03-元素与函数组件.html` 重复路径，仅保留 `function-components/03`
- [x] **Vue2**：全目录 `NN-` 编号重命名（含 `asyncZJ` → `07-异步组件`、`testRef` → `13-ref引用` 等）；`生命周期.html` → `生命周期/01-八个钩子速记.html`；响应式原理 / 路由与状态 / 组件 / 源码简读 全部对齐
- [x] **Vue3**：根目录遗留文件迁入编号目录；新增 Vite / script setup 宏 demo
- [x] **CSS**：新增 `07-现代特性/`（`:has`、`@layer`、Container Queries）
- [x] **TypeScript**：新建 `learn/typescript/` 模块，并补齐基础 / 进阶 / 工程与框架高频主题（15 个 demo）
- [x] **CI**：`.github/workflows/ci.yml` + `scripts/validate-demos.mjs`（头注释、内联脚本语法、manifest 数量与重复 href）

## 维护命令

```bash
node scripts/build-index.mjs
node scripts/sync-readmes.mjs
node scripts/validate-demos.mjs
node scripts/validate-typescript-coverage.mjs
node scripts/validate-browser-smoke.mjs
```

约定见 [`../../CONVENTIONS.md`](../../CONVENTIONS.md)。补齐计划见 [`../plans/`](../plans/)。

## 保留的教学设计（非 bug）

- **反面教材**：`02-JSX-条件渲染短路` 的 `length && JSX` 渲染 `0`；abbr 中 `:bind:title` 错误示例
- **资源完整性**：rem / media-queries 已改为纯 CSS 离线演示，`validate-browser-smoke.mjs` 会检查本地资源引用
