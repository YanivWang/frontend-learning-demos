# 后续优化 Backlog

已完成本轮「体验 + 内容 + 工程化」大优化；以下为可持续迭代项。

## 已完成（本轮）

- [x] 入口页搜索 / 分类筛选（`manifest.json` + `index.html`）
- [x] 全站 demo 页脚导航（上一篇 / 下一篇 / 目录）
- [x] viewport / lang 基线 + 校验
- [x] JS：HTTP 缓存、XSS/CSRF、LRU、Node 事件循环
- [x] CSS：`:is`/`:where`、View Transitions、subgrid
- [x] TS：手写 Utility、表单/emits 类型、mini-project + `tsc`
- [x] Vue3：Router+Pinia 可运行、Vitest 面试点
- [x] React 19 概览、Todo 综合 demo
- [x] pre-commit 模板、serve、Playwright 抽样、主题覆盖校验

## 可选后续

- [x] React 19 独立模块 `learn/react19/`（umd-react 运行时 + `useActionState` 等可运行 demo）
- [ ] Webpack vs Vite 可构建最小对比仓库（子目录）
- [ ] 全量 Playwright（当前为抽样 24 页）
- [ ] 共享 `learn/shared/libs/` 减少 vue2/vue3 重复 vendoring
- [ ] libs 版本与 npm 最新版自动 diff 脚本（网络）
- [ ] `@scope` CSS、Module Federation 等专题
