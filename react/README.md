# React 18

按学习顺序编号的 React 18 demo。

打开任意 `src/NN-*.html` 即可，无需构建。脚本通过 `<script src="../libs/...">` 引用 React / Babel 运行时。

## 推荐顺序

| # | 文件 | 主题 |
|---|---|---|
| 01 | `01-入门-元素与渲染.html` | jsx → React 元素 → `createRoot(...).render(...)` 渲染流程 |
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
| 12 | `12-Hooks-useState基础.html` | `useState` 基础、状态快照、函数式更新 |
| 13 | `13-Hooks-useEffect副作用.html` | `useEffect` 副作用、依赖数组、清理函数 |
| 14 | `14-Hooks-useRef与DOM.html` | `useRef` 访问 DOM、保存不触发渲染的可变值 |
| 15 | `15-Hooks-useMemo-useCallback.html` | `useMemo` / `useCallback` 的使用场景与依赖 |
| 16 | `16-Hooks-useReducer.html` | `useReducer`、纯 reducer、action 状态转移 |
| 17 | `17-自定义Hook.html` | 自定义 Hook 抽离可复用状态逻辑 |
| 18 | `18-闭包与依赖数组陷阱.html` | 函数组件闭包、状态快照、依赖数组陷阱 |
| 19 | `19-列表key与diff.html` | 列表 `key`、diff 身份标识、index key 状态错位 |
| 20 | `20-受控与非受控表单.html` | 受控组件、非受控组件、表单提交 |
| 21 | `21-组件通信与children组合.html` | 父子通信、状态提升、`children` 组合 |
| 22 | `22-Context跨层传递.html` | `Context` 跨层传递、Provider value、适用边界 |
| 23 | `23-Reactmemo性能优化.html` | `React.memo`、浅比较、不可变更新 |
| 24 | `24-合成事件机制.html` | SyntheticEvent、事件委托、阻止默认行为与冒泡 |
| 25 | `25-虚拟DOM-Fiber-批处理.html` | 虚拟 DOM、Fiber、React 18 自动批处理 |
| 26 | `26-Fragment-Portal-StrictMode.html` | `Fragment`、`Portal`、`StrictMode` 常见用途 |
| 27 | `27-forwardRef与useImperativeHandle.html` | `forwardRef`、`useImperativeHandle` 暴露命令式 API |
| 28 | `28-lazy-Suspense代码分割.html` | `React.lazy`、`Suspense`、代码分割 |
| 29 | `29-Router与状态管理面试点.html` | Router 与状态管理的基础面试边界 |
| 30 | `30-错误边界与常见优化清单.html` | Error Boundary、错误兜底、性能优化清单 |

## 面试覆盖范围

当前 `react/src` 已覆盖 React 基础面试中的常见主干：

- 基础渲染：JSX、React 元素、`createRoot`、元素不可变、条件渲染
- 组件基础：函数组件、class 组件、`props`、`state`、生命周期
- 状态更新：`setState` 异步合并、函数式更新、React 18 自动批处理
- Hooks：`useState`、`useEffect`、`useRef`、`useMemo`、`useCallback`、`useReducer`、自定义 Hook
- 高频陷阱：闭包与依赖数组、列表 `key`、index key、受控/非受控表单
- 组件通信：父子通信、状态提升、`children` 组合、`Context`
- 性能优化：`React.memo`、不可变更新、缓存计算与函数引用
- React 原理：虚拟 DOM、diff、Fiber、合成事件、错误边界
- 工程常问：Router、状态管理选择、`lazy` / `Suspense`、`Portal`、`StrictMode`、`forwardRef`

## 依赖

- `libs/react.development.js`、`libs/react-dom.development.js`、`libs/babel.min.js`
- 版本信息见 [`libs/README.md`](libs/README.md)
