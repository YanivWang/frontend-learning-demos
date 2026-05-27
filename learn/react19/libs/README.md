# react19/libs

React **19** 运行时（开发版 UMD）。官方自 React 19 起不再发布 UMD，此处使用社区维护的 [`umd-react`](https://github.com/lofcz/umd-react) 构建，API 与 npm 版 React 19 对齐。

| 文件 | 版本 | 用途 | 来源 |
|---|---|---|---|
| `react.development.js` | React **19.2.4**（umd-react 19.2.6 包） | 核心库（`useActionState` / `useOptimistic` / `use` 等） | https://unpkg.com/umd-react@19.2.6/dist/react.development.js |
| `react-dom.development.js` | React DOM **19.2.4** | `createRoot`、`useFormStatus` 等 | https://unpkg.com/umd-react@19.2.6/dist/react-dom.development.js |
| `babel.min.js` | @babel/standalone 7.29.7 | 浏览器端 JSX 转译 | 与 `learn/react18/libs/babel.min.js` 相同 |

## 与 React 18 模块的区别

- `learn/react18/` 仍使用官方 React **18.3.1** UMD，覆盖 class 组件与 Hooks 主干。
- `learn/react19/` 专讲 **React 19** 新 API，需本目录运行时方可运行 `useActionState` 等 demo。

## 升级方式

从 [umd-react releases](https://github.com/lofcz/umd-react/releases) 或 `unpkg.com/umd-react` 下载覆盖 `react*.js`；`babel.min.js` 可与 React 18 模块共用同版本。
