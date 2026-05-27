# scripts/

仓库工具脚本。

## `build-index.mjs`

扫描仓库内所有 `.html` demo，自动生成根目录 `index.html`（总入口）和 `manifest.json`（结构化数据）。

```bash
node scripts/build-index.mjs
```

**扫描范围**：`learn/javascript/`、`learn/css/`、`learn/vue2/`、`learn/vue3/`、`learn/react/`、`learn/demos/` 下的 `.html`；跳过 `libs/`、`lib/`、根 `index.html`。

**什么时候运行**：

- 新增 demo
- 改名 / 移动 demo
- 删除 demo
- 调整目录结构

详细约定见 [`../CONVENTIONS.md`](../CONVENTIONS.md)。

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
```

**什么时候运行**：新增/改名/删除 demo 后，或与 `build-index.mjs` 一并执行；修改 demo **主题** 头注释后也应运行，以保持 README 与代码一致。

## `gen-readme-tables.mjs`

仅输出某一模块的 Markdown 表格到 stdout（调试用），不写入文件。

```bash
node scripts/gen-readme-tables.mjs javascript
node scripts/gen-readme-tables.mjs react
```

## 推荐工作流

```bash
# 改 demo 后
node scripts/build-index.mjs
node scripts/sync-readmes.mjs
node scripts/validate-demos.mjs
```

## `validate-demos.mjs`

校验头注释完整性、普通 `<script>` 的 `node --check`、运行 `build-index` 并核对 manifest 数量与重复 href。

```bash
node scripts/validate-demos.mjs
```

CI（`.github/workflows/ci.yml`）在 push / PR 时自动执行。
