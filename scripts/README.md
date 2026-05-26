# scripts/

仓库工具脚本。

## `build-index.mjs`

扫描仓库内所有 `.html` demo，自动生成根目录 `index.html`（总入口）和 `manifest.json`（结构化数据）。

```bash
node scripts/build-index.mjs
```

**什么时候运行**：

- 新增 demo
- 改名 / 移动 demo
- 删除 demo
- 调整目录结构

详细约定见 [`../CONVENTIONS.md`](../CONVENTIONS.md)。
