# React 18

按学习顺序编号的 React 18 demo。`learn/react/src/` 下共 **53** 个 `.html`（函数组件 **34** + 类组件 **19**）。

**React 19 可运行 demo** 见独立模块 [`../react19/README.md`](../react19/README.md)（`useActionState`、`useOptimistic`、`use()` 等）。

打开任意 `src/class-components/*.html` 或 `src/function-components/*.html` 即可，无需构建。脚本通过 `<script src="../../libs/...">` 引用 React / Babel 运行时。

## 目录分组

| 目录 | 数量 | 说明 |
|---|---:|---|
| `src/function-components/` | 33 | JSX、函数组件、Hooks、Context、性能优化、路由状态等 |
| `src/class-components/` | 19 | class 组件、`setState`、生命周期、Error Boundary 等 |

> **关于 `03-元素与函数组件.html`**：文件名保留历史命名，当前代码侧重 **React 元素**、**JSX 嵌入表达式** 与 **`createRoot` 渲染流程**；函数组件从 `05-函数组件-props.html` 起系统讲解。

## 推荐顺序

### 函数组件 `function-components`

| # | 文件 | 主题 |
|---|---|---|
| 01 | `01-入门-元素与渲染.html` | jsx → React 元素 → `createRoot(...).render(...)` 渲染流程 |
| 02 | `02-JSX-条件渲染短路.html` | JSX 中 `&&` / `\|\|` 短路求值的渲染陷阱 |
| 03 | `03-元素与函数组件.html` | React 元素、JSX 嵌入表达式、`createRoot` 与虚拟 DOM（文件名历史命名，函数组件见 05） |
| 04 | `04-元素不可变-时钟.html` | 元素不可变，更新界面必须重新创建元素 |
| 05 | `05-函数组件-props.html` | 函数组件接收 props、`setInterval` 驱动重渲染 |
| 06 | `06-函数组件-事件处理与参数传递.html` | 事件处理、传参、无 this 绑定 |
| 07 | `07-函数组件-state与props.html` | state / props 综合、父子通信 |
| 08 | `08-useState-异步合并与连续更新.html` | `useState` 异步合并、快照式 vs 函数式连续更新 |
| 09 | `09-状态更新后读取-flushSync与useEffect.html` | 更新后读 state/DOM、`flushSync` 与 `useEffect` |
| 10 | `10-React18-自动批处理对比.html` | React 18 自动批处理、`flushSync` 对比 |
| 11 | `11-useEffect-生命周期对照.html` | `useEffect` 与 class 生命周期对照 |
| 12 | `12-Hooks-useState基础.html` | `useState` 基础、状态快照、函数式更新 |
| 13 | `13-Hooks-useEffect副作用.html` | `useEffect` 副作用、依赖数组、清理函数 |
| 14 | `14-Hooks-useRef与DOM.html` | `useRef` 访问 DOM、保存不触发渲染的可变值 |
| 15 | `15-Hooks-useMemo-useCallback.html` | `useMemo` / `useCallback` 的使用场景与依赖 |
| 16 | `16-Hooks-useReducer.html` | `useReducer`、纯 reducer、action 状态转移 |
| 17 | `17-自定义Hook.html` | 自定义 Hook 抽离可复用状态逻辑 |
| 18 | `18-闭包与依赖数组陷阱.html` | 闭包、状态快照、依赖数组陷阱 |
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
| 30 | `30-函数-defaultProps与displayName.html` | 参数默认值、`defaultProps`、`displayName` |
| 31 | `31-高阶组件HOC与renderProps.html` | HOC、render props 与自定义 Hook 对比 |
| 32 | `32-useLayoutEffect与useEffect对比.html` | `useLayoutEffect` 与 `useEffect` 使用边界 |
| 33 | `33-props派生状态与key重置.html` | props 派生状态、`key` 重置替代 mirror props |

### 类组件 `class-components`

| # | 文件 | 主题 |
|---|---|---|
| 01 | `01-class-必须super.html` | 类组件必须调用 `super()`，必须有 `render` 方法 |
| 02 | `02-class-state与props.html` | 类组件 state / props 基本用法、事件处理与父子通信 |
| 03 | `03-setState-异步合并.html` | `setState` 异步，10 次 `+1` 仍然只 +1（合并） |
| 04 | `04-setState-函数式更新.html` | `setState(prev => ...)` 函数式更新解决合并问题 |
| 05 | `05-Clock-setState-批处理对比.html` | 同一回调内多次 `setState` 对比对象式 vs 函数式 |
| 06 | `06-class-完整生命周期与API.html` | 完整生命周期钩子、`forceUpdate`、`defaultProps` |
| 07 | `07-class-refs与DOM.html` | `createRef`、回调 ref、访问 DOM 与子组件实例 |
| 08 | `08-class-PureComponent性能优化.html` | `PureComponent`、`shouldComponentUpdate` 浅比较 |
| 09 | `09-class-getDerivedStateFromProps与getSnapshotBeforeUpdate.html` | 派生 state、DOM 更新前快照 |
| 10 | `10-class-Context上下文.html` | `contextType`、`Context.Consumer` |
| 11 | `11-class-受控与非受控表单.html` | class 组件中的受控/非受控表单 |
| 12 | `12-class-setState第二参数回调.html` | `setState` 回调、state 读取时机 |
| 13 | `13-class-事件绑定三种方式.html` | bind、JSX 箭头、类字段箭头 |
| 14 | `14-class-列表key与diff.html` | 列表 `key`、index key 状态错位 |
| 15 | `15-class-组件通信与children.html` | props 回调、状态提升、`children` 组合 |
| 16 | `16-class-合成事件机制.html` | SyntheticEvent、阻止默认与冒泡 |
| 17 | `17-class-defaultProps与静态属性.html` | `defaultProps`、`static`、`displayName` |
| 18 | `18-class-高阶组件HOC.html` | 高阶组件模式、逻辑复用 |
| 19 | `19-错误边界与常见优化清单.html` | Error Boundary、错误兜底、性能优化清单 |

## 面试覆盖范围

当前 `learn/react/src` 已覆盖 React 基础面试中的常见主干：

- 基础渲染：JSX、React 元素、`createRoot`、元素不可变、条件渲染
- 组件基础：函数组件、class 组件、`props`、`state`、生命周期、refs、PureComponent、HOC
- 状态更新：`setState` 异步合并、函数式更新、React 18 自动批处理
- Hooks：`useState`、`useEffect`、`useLayoutEffect`、`useRef`、`useMemo`、`useCallback`、`useReducer`、自定义 Hook
- 函数组件专题：事件处理、批处理、`flushSync`、生命周期对照、`defaultProps`、HOC、props 派生与 key 重置
- 高频陷阱：闭包与依赖数组、列表 `key`、index key、受控/非受控表单
- 组件通信：父子通信、状态提升、`children` 组合、`Context`
- 性能优化：`React.memo`、不可变更新、缓存计算与函数引用
- React 原理：虚拟 DOM、diff、Fiber、合成事件、错误边界
- 工程常问：Router、状态管理选择、`lazy` / `Suspense`、`Portal`、`StrictMode`、`forwardRef`

## 依赖

- `libs/react.development.js`、`libs/react-dom.development.js`、`libs/babel.min.js`
- 版本信息见 [`libs/README.md`](libs/README.md)

## 完整 demo 清单

<!-- DEMO_TABLE_START -->

共 **53** 个 demo（由 `node scripts/sync-readmes.mjs` 根据头注释自动生成，请勿手改表格正文）。

| 文件 | 主题 |
|---|---|
| `class-components/01-class-必须super.html` | class 组件 constructor 必须调用 super() |
| `class-components/02-class-state与props.html` | class 组件的 state 与 props 区别 + 事件 this 绑定 |
| `class-components/03-setState-异步合并.html` | setState 异步合并（同步触发多次只会更新一次） |
| `class-components/04-setState-函数式更新.html` | setState 函数式更新（解决合并陷阱） |
| `class-components/05-Clock-setState-批处理对比.html` | Clock 演示 setState 批处理（对象式 vs 函数式） |
| `class-components/06-class-完整生命周期与API.html` | class 组件完整生命周期与常用 API 大杂烩 |
| `class-components/07-class-refs与DOM.html` | class 组件 refs 访问 DOM 与实例 |
| `class-components/08-class-PureComponent性能优化.html` | PureComponent 与 shouldComponentUpdate 浅比较 |
| `class-components/09-class-getDerivedStateFromProps与getSnapshotBeforeUpdate.html` | getDerivedStateFromProps 与 getSnapshotBeforeUpdate |
| `class-components/10-class-Context上下文.html` | class 组件消费 Context |
| `class-components/11-class-受控与非受控表单.html` | class 组件中的受控与非受控表单 |
| `class-components/12-class-setState第二参数回调.html` | setState 第二参数回调与 state 读取时机 |
| `class-components/13-class-事件绑定三种方式.html` | class 组件事件 this 绑定的三种方式 |
| `class-components/14-class-列表key与diff.html` | class 组件列表 key 与 diff |
| `class-components/15-class-组件通信与children.html` | class 组件通信、状态提升与 children 组合 |
| `class-components/16-class-合成事件机制.html` | class 组件中的 React 合成事件 |
| `class-components/17-class-defaultProps与静态属性.html` | defaultProps、静态属性与 displayName |
| `class-components/18-class-高阶组件HOC.html` | 高阶组件 HOC（Higher-Order Component） |
| `class-components/19-错误边界与常见优化清单.html` | Error Boundary 与常见优化清单 |
| `function-components/01-入门-元素与渲染.html` | React 元素与渲染（React 18 createRoot） |
| `function-components/02-JSX-条件渲染短路.html` | 条件渲染中的「短路求值」陷阱 |
| `function-components/03-元素与函数组件.html` | React 元素、JSX 嵌入表达式与 createRoot 渲染流程 |
| `function-components/04-元素不可变-时钟.html` | React 元素的「不可变」特性 |
| `function-components/05-函数组件-props.html` | 函数组件 + props 传值（计数器示例） |
| `function-components/06-函数组件-事件处理与参数传递.html` | 函数组件事件处理与参数传递 |
| `function-components/07-函数组件-state与props.html` | 函数组件 state 与 props 综合 |
| `function-components/08-useState-异步合并与连续更新.html` | useState 异步合并与连续更新 |
| `function-components/09-状态更新后读取-flushSync与useEffect.html` | 状态更新后读取 DOM — flushSync 与 useEffect |
| `function-components/10-React18-自动批处理对比.html` | React 18 自动批处理对比 |
| `function-components/11-useEffect-生命周期对照.html` | useEffect 与 class 生命周期对照 |
| `function-components/12-Hooks-useState基础.html` | useState 基础与函数式更新 |
| `function-components/13-Hooks-useEffect副作用.html` | useEffect 副作用、依赖数组与清理函数 |
| `function-components/14-Hooks-useRef与DOM.html` | useRef 保存 DOM 与可变值 |
| `function-components/15-Hooks-useMemo-useCallback.html` | useMemo 与 useCallback |
| `function-components/16-Hooks-useReducer.html` | useReducer 管理复杂状态 |
| `function-components/17-自定义Hook.html` | 自定义 Hook 抽离复用逻辑 |
| `function-components/18-闭包与依赖数组陷阱.html` | 闭包与依赖数组陷阱 |
| `function-components/19-列表key与diff.html` | 列表 key 与 diff |
| `function-components/20-受控与非受控表单.html` | 受控组件与非受控组件 |
| `function-components/21-组件通信与children组合.html` | props 回调、状态提升与 children 组合 |
| `function-components/22-Context跨层传递.html` | Context 跨层传递 |
| `function-components/23-Reactmemo性能优化.html` | React.memo 与不可变更新 |
| `function-components/24-合成事件机制.html` | React 合成事件机制 |
| `function-components/25-虚拟DOM-Fiber-批处理.html` | 虚拟 DOM、Fiber 与 React 18 自动批处理 |
| `function-components/26-Fragment-Portal-StrictMode.html` | Fragment、Portal 与 StrictMode |
| `function-components/27-forwardRef与useImperativeHandle.html` | forwardRef 与 useImperativeHandle |
| `function-components/28-lazy-Suspense代码分割.html` | React.lazy 与 Suspense |
| `function-components/29-Router与状态管理面试点.html` | Router 与状态管理常见面试点 |
| `function-components/30-函数-defaultProps与displayName.html` | defaultProps、参数默认值与 displayName |
| `function-components/31-高阶组件HOC与renderProps.html` | 高阶组件 HOC 与 render props |
| `function-components/32-useLayoutEffect与useEffect对比.html` | useLayoutEffect 与 useEffect 对比 |
| `function-components/33-props派生状态与key重置.html` | props 派生状态与 key 重置 |
| `function-components/34-React19新特性概览.html` | React 19 新特性概览 |

<!-- DEMO_TABLE_END -->
