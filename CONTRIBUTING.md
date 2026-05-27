# 贡献指南

感谢为本仓库添加或改进 demo！

## 新增 / 修改 demo 后必跑

```bash
npm run build:index    # 生成 manifest、VitePress 导航，并注入页脚导航
npm run sync:readmes   # 同步各模块 README 清单表
npm run validate       # 全量校验（含 TS tsc、主题覆盖、冒烟）
```

只检查、不写入：

```bash
npm run check:index
node scripts/sync-readmes.mjs --check
```

## 规范

- 阅读 [`CONVENTIONS.md`](CONVENTIONS.md)：命名、头注释、`libs/` 版本注释
- 每个 demo 在 `<!DOCTYPE` 前写 `分类` / `主题` / `要点`
- 不要手改 `manifest.json`、VitePress 自动生成文件与 README 中 `DEMO_TABLE` 区域

## 本地预览

```bash
npm run build:index
npm run docs:dev
# → http://127.0.0.1:5173
```

构建产物预览：

```bash
npm run docs:build
npm run serve
# → http://127.0.0.1:4173/
```

`file://` 也可打开单个 HTML；路由类 demo 推荐 hash 模式或通过文档站静态服务访问。

## 可选 Git Hook

```bash
chmod +x .githooks/pre-commit
git config core.hooksPath .githooks
```

提交前会自动跑 `check:index` 与 `sync-readmes --check`。

## TypeScript mini-project

真实 `.ts` 工程在 `apps/typescript/mini-project/`，校验：

```bash
npm run validate:tsc
```

## 待办 backlog

见 [`docs/plans/BACKLOG.md`](docs/plans/BACKLOG.md)。
