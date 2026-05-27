# React 19

专讲 **React 19** 新语法与高频面试点的 demo 模块。`learn/react19/src/` 下共 **11** 个 `.html`（基础语法 **6** + 面试题 **5**）。

使用 **React 19** 运行时（`libs/` 内 `umd-react` 构建），与 `learn/react18/`（React 18.3.1）分开，避免 API 混用。

## 目录分组

| 目录 | 数量 | 说明 |
|---|---:|---|
| `src/01-基础语法/` | 6 | `createRoot`、Actions、`useActionState`、`useOptimistic`、`use()`、ref 作为 prop |
| `src/02-面试题/` | 5 | 19 vs 18、表单 Action、`useFormStatus`、并发/RSC 面试边界 |

## 推荐顺序

### 基础语法 `01-基础语法`

| # | 文件 | 主题 |
|---|---|---|
| 01 | `01-入门-createRoot与元素.html` | React 19 元素、`createRoot`、与 18 相同的渲染入口 |
| 02 | `02-JSX表达式与自动批处理.html` | JSX 嵌入表达式、React 19 批处理行为复习 |
| 03 | `03-Actions与useActionState.html` | 表单 `action`、`useActionState` 管理提交与 pending |
| 04 | `04-useOptimistic乐观更新.html` | `useOptimistic` 在异步完成前展示乐观 UI |
| 05 | `05-use读取Promise与Context.html` | `use()` 读取 Promise / Context，配合 `Suspense` |
| 06 | `06-ref作为prop传递.html` | ref 可直接作为 prop，逐步替代 `forwardRef` |

### 面试题 `02-面试题`

| # | 文件 | 主题 |
|---|---|---|
| 01 | `01-React19相对18变化速记.html` | 19 相对 18 的 API 与工程变化面试速记 |
| 02 | `02-表单Action与useFormStatus.html` | `formAction`、`useFormStatus` 与按钮 pending 状态 |
| 03 | `03-并发渲染与Transitions面试.html` | `useTransition`、`startTransition` 与 Actions 关系 |
| 04 | `04-错误边界与状态边界.html` | Error Boundary、Action 错误、状态提交边界 |
| 05 | `05-RSC与Server-Components边界.html` | RSC / Server Actions 面试边界（概念 + 对照表） |

## 与 React 18 模块的关系

- 先学 `learn/react18/src/function-components/` 的 Hooks 与渲染基础，再学本模块。
- `learn/react18/.../34-React19新特性概览.html` 为 **React 18 运行时** 下的概览；可运行 demo 以本目录为准。

## 依赖

- `libs/react.development.js`、`libs/react-dom.development.js`、`libs/babel.min.js`
- 版本见 [`libs/README.md`](libs/README.md)

## 完整 demo 清单

<!-- DEMO_TABLE_START -->

共 **11** 个 demo（由 `node scripts/sync-readmes.mjs` 根据头注释自动生成，请勿手改表格正文）。

| 文件 | 主题 |
|---|---|
| `01-基础语法/01-入门-createRoot与元素.html` | React 19 元素与 createRoot 渲染 |
| `01-基础语法/02-JSX表达式与自动批处理.html` | JSX 表达式与 React 19 自动批处理 |
| `01-基础语法/03-Actions与useActionState.html` | Actions 与 useActionState |
| `01-基础语法/04-useOptimistic乐观更新.html` | useOptimistic 乐观更新 |
| `01-基础语法/05-use读取Promise与Context.html` | use() 读取 Promise 与 Context |
| `01-基础语法/06-ref作为prop传递.html` | ref 作为 prop 传递（React 19） |
| `02-面试题/01-React19相对18变化速记.html` | React 19 相对 18 变化速记 |
| `02-面试题/02-表单Action与useFormStatus.html` | 表单 Action 与 useFormStatus |
| `02-面试题/03-并发渲染与Transitions面试.html` | 并发渲染与 Transitions 面试 |
| `02-面试题/04-错误边界与状态边界.html` | 错误边界与 Action 状态边界 |
| `02-面试题/05-RSC与Server-Components边界.html` | RSC 与 Server Components 面试边界 |

<!-- DEMO_TABLE_END -->
