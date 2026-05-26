# React 18

按学习顺序编号的 React 18 demo。

打开任意 `src/NN-*.html` 即可，无需构建。脚本通过 `<script src="../libs/...">` 引用 React / Babel 运行时。

## 推荐顺序

| # | 文件 | 主题 |
|---|---|---|
| 01 | `01-入门-元素与渲染.html` | jsx → React 元素 → `ReactDOM.render` 渲染流程 |
| 02 | `02-JSX-条件渲染短路.html` | JSX 中 `&&` / `\|\|` 短路求值的渲染陷阱（0/""/null/undefined）|
| 03 | `03-元素与函数组件.html` | `React.createElement` 与 JSX 对应、函数式组件 `createRoot` |
| 04 | `04-元素不可变-时钟.html` | 元素不可变，更新界面必须重新创建元素 |
| 05 | `05-函数组件-props.html` | 函数组件接收 props、`setInterval` 驱动重渲染 |
| 06 | `06-class-必须super.html` | 类组件必须调用 `super()`，必须有 `render` 方法 |
| 07 | `07-class-state与props.html` | 类组件 state / props 基本用法、事件处理与父子通信 |
| 08 | `08-setState-异步合并.html` | `setState` 异步，10 次 `+1` 仍然只 +1（合并） |
| 09 | `09-setState-函数式更新.html` | `setState(prev => ...)` 函数式更新解决合并问题 |
| 10 | `10-Clock-setState-批处理对比.html` | 同一回调内多次 `setState` 对比对象式 vs 函数式 |
| 11 | `11-class-完整生命周期与API.html` | 完整生命周期钩子、`forceUpdate`、`defaultProps`、refs |

## 依赖

- `libs/react18.js`、`libs/react-dom18.js`、`libs/babel.js`
- 版本信息见 [`libs/README.md`](libs/README.md)
