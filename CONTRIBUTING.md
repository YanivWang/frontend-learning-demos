# 贡献指南

感谢为本仓库添加或改进 demo！

## 新增 / 修改 demo 后必跑

```bash
npm run build:index    # 生成 index.html、manifest，并注入页脚导航
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
- 不要手改 `index.html` 与 README 中 `DEMO_TABLE` 区域

## 本地预览

```bash
npm run serve
# 打开 http://127.0.0.1:4173/index.html
```

`file://` 也可打开单个 HTML；路由类 demo 推荐 hash 模式或通过静态服务访问。

## 可选 Git Hook

```bash
chmod +x .githooks/pre-commit
git config core.hooksPath .githooks
```

提交前会自动跑 `check:index` 与 `sync-readmes --check`。

## TypeScript mini-project

真实 `.ts` 工程在 `learn/typescript/mini-project/`，校验：

```bash
npm run validate:tsc
```

## 待办 backlog

见 [`docs/plans/BACKLOG.md`](docs/plans/BACKLOG.md)。
