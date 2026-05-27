# 贡献指南

完整说明见仓库 [`CONTRIBUTING.md`](https://github.com/jsAppSpace/js-css-vue-react-learn/blob/main/CONTRIBUTING.md)。

## 新增 demo 流程

1. 在对应 `learn/` 子目录创建 `.html`，写好头注释（分类 / 主题 / 要点）
2. 运行维护命令：

```bash
npm run build:index
npm run sync:readmes
npm run validate
```

3. 提交前确认 CI 会通过（`npm test` + `npm run validate`）

## 文档站

VitePress 仅作**文档壳**，demo 本体仍在 `learn/`：

```bash
npm run docs:dev      # 本地预览
npm run docs:build    # 构建静态站点
```

侧边栏与 [Demo 索引](/demos/) 由 `manifest.json` 自动生成，无需手动维护。

## Git Hook（可选）

仓库提供 `.githooks/pre-commit` 模板，可在提交前自动跑校验。详见 CONTRIBUTING.md。
