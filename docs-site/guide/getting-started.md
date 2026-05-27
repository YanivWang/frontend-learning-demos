# 快速开始

本仓库是**前端语法与框架复习 Demo 库**。VitePress 文档站是唯一入口；每个 demo `.html` 仍可直接在浏览器打开。

## 本地预览文档站

```bash
npm install
npm run build:index    # 同步 manifest、侧边栏与 demo 页脚导航
npm run docs:dev       # → http://127.0.0.1:5173
```

提供侧边栏导航、全文搜索、学习路线与 Demo 索引。

## 预览构建产物

```bash
npm run docs:build
npm run docs:preview   # 或 npm run serve
```

`serve` 会托管 `docs-site/.vitepress/dist/`（需先 `docs:build`），适合验证 Router / ES Module 等 demo。

## 直接打开单个 demo

开发单个文件时，可在 IDE 中用 Live Server 打开 `learn/**/*.html`。页脚「目录」会链回 VitePress 首页（`/`）。

## 维护命令

新增 / 改名 / 删除 demo 后：

```bash
npm run build:index
npm run sync:readmes
npm run validate
```

`build:index` 会链式更新：

- `manifest.json`
- demo 页脚导航
- VitePress sidebar 与 Demo 索引页

## 构建与部署

```bash
npm run docs:build
# 产物：docs-site/.vitepress/dist/（含 learn/ demo）
```

GitHub Pages 子路径部署：

```bash
VITEPRESS_BASE=/js-css-vue-react-learn/ npm run build:index
VITEPRESS_BASE=/js-css-vue-react-learn/ npm run docs:build
```

部署前请用相同的 `VITEPRESS_BASE` 运行 `build:index`，确保 demo 页脚「目录」链接正确。
