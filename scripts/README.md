# scripts/

仓库工具脚本。

## `build-index.mjs`

扫描仓库内所有 `.html` demo，自动生成 `manifest.json`（结构化数据），并链式更新 VitePress 导航。

```bash
node scripts/build-index.mjs
node scripts/build-index.mjs --check
```

**扫描范围**：`learn/javascript/`、`learn/css/`、`learn/vue2/`、`learn/vue3/`、`learn/react/`、`learn/demos/`、`learn/typescript/` 下的 `.html`；跳过 `libs/`、`lib/`。

**什么时候运行**：

- 新增 demo
- 改名 / 移动 demo
- 删除 demo
- 调整目录结构

详细约定见 [`../CONVENTIONS.md`](../CONVENTIONS.md)。

`--check` 只比较当前 `manifest.json` 是否与脚本输出一致，不写文件，适合 CI。

## `sync-readmes.mjs`

读取各 demo 头注释中的 **主题** 行，更新以下 README 中 `<!-- DEMO_TABLE_START -->` … `<!-- DEMO_TABLE_END -->` 之间的完整 demo 清单表：

- `learn/javascript/README.md`
- `learn/css/README.md`
- `learn/vue2/README.md`
- `learn/vue3/README.md`
- `learn/react/README.md`
- `learn/typescript/README.md`

```bash
node scripts/sync-readmes.mjs
node scripts/sync-readmes.mjs --check
```

**什么时候运行**：新增/改名/删除 demo 后，或与 `build-index.mjs` 一并执行；修改 demo **主题** 头注释后也应运行，以保持 README 与代码一致。

`--check` 只检查各模块 README 的表格是否同步，不写文件。

## `gen-readme-tables.mjs`

仅输出某一模块的 Markdown 表格到 stdout（调试用），不写入文件。

```bash
node scripts/gen-readme-tables.mjs javascript
node scripts/gen-readme-tables.mjs react
```

## `inject-demo-nav.mjs`

为所有 demo 注入 `viewport` / `lang="zh-CN"` 与页脚导航（目录 → VitePress 首页 / 上一篇 / 下一篇）。由 `npm run build:index` 链式调用。

## `validate-topic-coverage.mjs`

校验 JS/CSS/Vue/React/TS 扩展主题 demo 及 `learn/typescript/mini-project/` 是否存在。

## `validate-browser-playwright.mjs`

抽样打开 demo（需 `npm run serve` + 已安装 `playwright`），检查无 pageerror。

## `check-lib-versions.mjs`

检查 `libs/` vendored 文件版本注释（警告，不阻断 CI）。

## 推荐工作流

```bash
# 改 demo 后
npm run build:index
npm run sync:readmes
npm run validate
```

## `validate-demos.mjs`

校验头注释完整性、普通 `<script>` 的 `node --check`，并通过 `build-index --check` 核对 manifest 数量与重复 href。校验过程不写入生成文件。

```bash
node scripts/validate-demos.mjs
```

CI（`.github/workflows/ci.yml`）在 push / PR 时自动执行。

## `validate-typescript-coverage.mjs`

校验 `learn/typescript/` 是否覆盖 TypeScript 基础语法、进阶类型、工程配置与框架组件类型中的高频主题。

```bash
node scripts/validate-typescript-coverage.mjs
```

## `validate-browser-smoke.mjs`

从 `manifest.json` 出发做静态浏览器冒烟检查：确认每个 demo 文件存在，HTML 里本地 `script` / `link` / `img` / 媒体资源存在，CSS `url(...)` 指向的本地资源也存在。

```bash
node scripts/validate-browser-smoke.mjs
```

## `scripts/tests/*.test.mjs`

维护脚本的 Node 内置测试，重点防止校验命令把工作区弄脏。

```bash
npm test
```
