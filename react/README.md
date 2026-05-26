# React 18

按学习顺序编号的 React 18 demo。

打开任意 `src/class-components/*.html` 或 `src/function-components/*.html` 即可，无需构建。脚本通过 `<script src="../../libs/...">` 引用 React / Babel 运行时。

## 目录分组

- `src/class-components/`: class 组件、`setState`、生命周期、Error Boundary 等示例。
- `src/function-components/`: JSX、函数组件、Hooks、Context、性能优化、路由状态等其它示例。

## 推荐顺序

### 函数组件 `function-components`

| # | 文件 | 主题 |
|---|---|---|
| 01 | `01-入门-元素与渲染.html` | jsx → React 元素 → `createRoot(...).render(...)` 渲染流程 |
| 02 | `02-JSX-条件渲染短路.html` | JSX 中 `&&` / `\|\|` 短路求值的渲染陷阱 |
| 03 | `03-元素与函数组件.html` | `React.createElement` 与 JSX 对应、函数式组件 |
| 04 | `04-元素不可变-时钟.html` | 元素不可变，更新界面必须重新创建元素 |
| 05 | `05-函数组件-props.html` | 函数组件接收 props、`setInterval` 驱动重渲染 |
| 06 | `06-函数组件-事件处理与参数传递.html` | 事件处理、传参、无 this 绑定 |
| 07 | `07-函数组件-state与props.html` | state / props 综合、父子通信 |
| 08 | `08-useState-异步合并与连续更新.html` | `useState` 异步合并、对象式 vs 函数式连续更新 |
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

当前 `react/src` 已覆盖 React 基础面试中的常见主干：

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
