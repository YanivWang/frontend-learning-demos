# 全量审查修复并补注释（已完成）

**总览**：已对仓库 **304** 个可索引 demo（`javascript` 120 · `css` 33 · `vue2` 57 · `vue3` 37 · `react` 53 · `demos` 4）完成审查与修复。运行时 bug、过时 API、错误注释已处理；每个 demo 具备统一头注释（`分类` / `主题` / `要点`）。

## 任务清单

- [x] **阶段 1**：`javascript/` **120** 个 `.html`
- [x] **阶段 2**：`css/` **33** 个 `.html`
- [x] **阶段 3**：`vue2/src/` **57** 个 `.html`
- [x] **阶段 4**：`vue3/src/` **37** 个 `.html`
- [x] **阶段 5**：`react/src/` **53** 个 `.html`
- [x] **阶段 6**：`demos/` **4** 个 `.html`
- [x] **文档**：根与各模块 `README.md`、`CONVENTIONS.md`、`sync-readmes` 清单表
- [x] **收尾**：`build-index` / `sync-readmes` 已执行；关键路径扫描无遗留 bug 模式

## 修复摘要

| 模块 | 类型 | 代表修复 |
|---|---|---|
| JavaScript | bug | 箭头函数禁止 `new`；函数进阶严格模式 `this`；正则 `(?:course\|unit)`；闭包 `let inner` + `#myBtn`；class `super`/私有字段；Promise 串行 `.then(() => fn())`；generator `Symbol.iterator`；WeakMap 按钮节点；worker `1e7`；存储 `await iterate`；手写 `Promise.all` 计数器 |
| CSS | 注释/样式 | vw-vh 头注释说明 rem+vw 并用；media-queries 断点注释 480；button `:active` 阴影；grid3/4 区分 repeat vs areas；load2 `@keyframes`；load4 淡出颜色 |
| Vue2 | bug | abbr `:title` 对比；device `innerWidth`；bindClass `hasError`；defineProperty 闭包 `_name`；timeline `@click`；VueX `count`/getters；Module 真 modules；routerProtected Login+守卫 |
| Vue3 | bug | 响应式状态解构 API；生命周期 `onUnmounted` 拼写 |
| React | bug/API | 去除未定义 `ele1`；`{fun()}`；class state/props/onClick；setState 展示 10；`componentWillUnmount`；全量 `createRoot`；`UNSAFE_` 废弃钩子；03 历史命名注释 |
| demos | 逻辑 | drag `currentTarget`；拖放复制 `preventDefault` + clone |

## 保留的教学设计（非 bug）

- **反面教材**：`02-JSX-条件渲染短路` 的 `length && JSX` 渲染 `0`；abbr 中 `:bind:title` 错误示例；timeline 中故意保留的 `onclick` 报错按钮。
- **历史路径**：`react/src/03-元素与函数组件.html` 与 `function-components/03` 同内容，README 已说明。
- **缺失外链资源**：rem / media-queries 图片依赖在头注释中说明，未重新下载。

## 维护命令

新增或修改 demo 后执行：

```bash
node scripts/build-index.mjs
node scripts/sync-readmes.mjs
```

约定见 [`CONVENTIONS.md`](CONVENTIONS.md)。
