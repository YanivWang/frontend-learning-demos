# Demo 学习内容权威化审核计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
> 人工维护者可忽略上一行工具要求；下面的内容才是 demo 审核的共同约束。

**Goal:** 把全库 demo 从“形式上有注释”升级为“可用于复习、面试准备和找工作的可靠学习材料”。

**Architecture:** 脚本只负责定位问题、检查结构和运行校验；学习内容必须人工审核，并和权威资料、可运行示例互相印证。每个 demo 都要做到头注释、复习区、示例代码、参考资料、运行验证五者一致。

**Tech Stack:** 静态 HTML demo、VitePress 文档、Node.js 维护脚本、Playwright smoke check、MDN Web Docs、JavaScript.info、Vue 2 / Vue 3 官方文档、React 官方文档、TypeScript Handbook。

---

## 质量标准

- [ ] 每个 demo 的头注释必须写当前 demo 的真实知识点，不使用“核心概念是什么 / 实际项目里怎么用 / 相近 API 如何选型”这类模板化句子。
- [ ] `NOTES_START` / `NOTES_END` 里的「知识点要点」必须覆盖概念、运行机制、常见坑、现代推荐写法，以及和相近 API / 写法的区别。
- [ ] 「面试考点」必须是可回答的真实问题，答法采用“先结论，再原因，再边界或项目场景”的结构。
- [ ] 示例代码必须能证明当前知识点；如果代码和讲解不匹配，优先改示例，而不是硬写讲解。
- [ ] 每个 demo 必须有可见的「参考资料」小节：窄 API 至少 1 个官方/规范来源，综合主题 2-5 个可靠来源；禁止为了凑数量添加弱相关链接。
- [ ] 低频、废弃或有安全风险的 API 必须明确标注现状、风险和现代替代方案。
- [ ] 脚本可以报告缺项、批量迁移结构、同步索引；不得把脚本生成的知识点、面试答法、参考资料当作最终内容。

## 禁止自动生成最终正文

- [ ] `scripts/report-demo-notes.mjs`、`npm run validate:demos`、`npm run check:index` 这类脚本只用于发现问题和验证结构。
- [ ] `npm run transform:all-demos`、`npm run enhance:demo-notes`、`npm run refresh-header-interview` 等批量脚本只能作为迁移或排查工具；它们产出的学习正文必须逐页人工重写或核对后才能视为完成。
- [ ] 每次修改一个 demo，都要先读当前示例代码，再写讲解；不能先套模板再让代码迁就模板。
- [ ] 如果权威资料没有明确支持某个结论，不写成确定事实；改写成“实践中通常……”或“常见项目取舍是……”，并说明来源层级。

## 权威来源

优先使用以下来源核对事实：

- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [Vue 2 官方文档](https://v2.vuejs.org/)
- [Vue 3 官方文档](https://vuejs.org/)
- [React 官方文档](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- WHATWG / W3C / CSSWG 等规范资料

使用原则：

- [ ] 官方文档与规范优先；博客只能作为辅助理解，不能作为唯一依据。
- [ ] 如果资料之间表述不同，以当前版本官方文档为准，并在文字里说明版本边界。
- [ ] 如果某个点是实践经验而非规范事实，明确写成“实践中通常……”或“常见项目取舍是……”。
- [ ] JavaScript / DOM / CSS 优先查 MDN；涉及标准行为、解析算法、安全模型、兼容性时，再补 WHATWG、ECMA-262、CSSWG 或浏览器兼容表。
- [ ] React 18 函数组件与 Hooks 优先查 `react.dev`；React class、旧生命周期、legacy context 等维护场景可补 `legacy.reactjs.org`，并写出现代替代方案。
- [ ] React 19 内容必须标明与 React 18 的边界，例如 Actions、`useActionState`、`useOptimistic`、`use()`、ref as prop 是否属于 React 19 主题。
- [ ] Vue 2 内容优先查 `v2.vuejs.org`，并在涉及新项目选型时说明 Vue 2 已进入维护/历史版本语境；Vue 3 内容优先查 `vuejs.org` 当前文档。
- [ ] TypeScript 内容优先查 TypeScript Handbook；如果涉及某个版本新增能力，先确认当前仓库使用的 TypeScript 版本或在正文里标注版本前提。

## 已完成样板

样板文件：

- `apps/demos/todo/01-todo-本地状态.html`

样板要求：

- [x] 头注释从模板化问题改为真实面试问题。
- [x] 复习区补充状态唯一来源、不可变更新、事件委托、安全文本渲染、与框架状态模型的关系。
- [x] 示例代码从 `innerHTML` 拼接改为 DOM API + `textContent`，避免用户输入被当 HTML 解析。
- [x] 参考资料加入 MDN 事件冒泡、MDN `addEventListener`、MDN `innerHTML`、React 数组状态更新。
- [x] `scripts/report-demo-notes.mjs` 能报告模板化问句和缺少「参考资料」的问题。

## 当前基线与进度口径

- [ ] 当前基线：`node scripts/report-demo-notes.mjs` 显示全库 `1/357` 达标，已达标页为 Todo 样板，其余 356 个 demo 仍需人工审核。
- [ ] 全库范围以 `manifest.json` 为准；新增或删除 demo 后，先同步索引，再重新记录报告总数。
- [ ] 每完成一个批次，在本文件追加或更新批次进度：已审核数量、仍失败数量、失败类型、人工抽查页面。
- [ ] 一个 demo 只有同时满足“头注释、学习区、示例代码、参考资料、运行验证”五项，才算达标。

## 分批推进

### 第一批：综合 demos + JavaScript 基础高频

- [ ] 审核 `apps/demos/` 剩余 demo：拖拽、分步表单、hash-router、viewpager、virtual-list。
- [ ] 审核 `apps/javascript/01-基础/`：变量、函数、数组、字符串、类型转换、正则、JSON、Date、parseInt、Symbol、Unicode、严格模式、URI 编码、`eval`。
- [ ] 审核 `apps/javascript/02-函数与作用域/`：作用域链、闭包、this、柯里化。
- [ ] 审核 `apps/javascript/03-对象与原型/`：对象创建、属性描述符、原型链、继承、class 与原型关系。

### 第二批：JavaScript 进阶 + 高频手写题

- [ ] 审核 `apps/javascript/04-ES6+/`：let/const、解构、模块、Promise、async/await、迭代器、生成器、Map/Set、Proxy 相关前置。
- [ ] 审核 `apps/javascript/05-元编程/`：Proxy、Reflect、Symbol、属性拦截、元编程边界。
- [ ] 审核 `apps/javascript/06-浏览器API/`：DOM、事件、存储、网络、History、URL、Observer、Web Worker 等浏览器能力。
- [ ] 审核 `apps/javascript/07-进阶/`：事件循环、内存、性能、错误处理、模块化、异步控制等进阶主题。
- [ ] 审核 `apps/javascript/08-面试题/` 高频手写题：call/apply、bind、new、instanceof、Promise、EventEmitter、LRU、防抖节流。
- [ ] 审核 `apps/javascript/09-Canvas/`：Canvas 2D 绘制、坐标、像素、动画与性能。

### 第三批：React 18 / React 19

- [ ] React 18 函数组件：createRoot、JSX、props、state、Hooks、effects、ref、memo、key、Context、表单、Suspense。
- [ ] React 18 class 组件：constructor/super、state/props、setState、生命周期、Context、错误边界。
- [ ] React 19：Actions、`useActionState`、`useOptimistic`、`use()`、ref as prop、Transitions、RSC 边界。
- [ ] React 18 与 React 19 不能混写成同一个“当前推荐写法”；需要在正文写清版本边界、适用场景和迁移注意点。
- [ ] 所有 React 内容优先对齐 `react.dev` 当前文档；过时 API 或 class 维护场景必须补充 legacy 文档和现代替代方式。

### 第四批：Vue 2 / Vue 3

- [ ] Vue 2 基础语法、组件、路由、Vuex、生命周期。
- [ ] Vue 2 响应式原理重点核对：`Object.defineProperty`、数组限制、`Vue.set`、data 代理、Watcher / Dep。
- [ ] Vue 3 基础语法、组合式 API、生命周期、组件通信、内置组件。
- [ ] Vue 3 响应式重点核对：`ref`、`reactive`、`toRef`、`toRefs`、`watch`、`computed`、`effectScope`、`nextTick`。
- [ ] Vue 2 与 Vue 3 的响应式、生命周期、组件通信不要互相套用；每页都要明确当前 demo 的框架版本。

### 第五批：TypeScript + CSS

- [ ] TypeScript 基础：类型推断、interface vs type、泛型、函数重载、元组、class、enum。
- [ ] TypeScript 进阶：类型收窄、Utility Types、条件类型、`infer`、映射类型、模板字面量、`never` 穷尽检查。
- [ ] TypeScript 工程与框架、`mini-project`：重点核对 tsconfig、模块解析、声明文件、框架类型推导、构建边界。
- [ ] CSS 基础、布局、动画、视觉效果、响应式、性能、现代特性。
- [ ] CSS 内容优先核对 MDN CSS、CSSWG 规范和浏览器兼容性说明。

## 每个 demo 的执行步骤

- [ ] 阅读当前 HTML：头注释、复习区、运行示例、导航和相关链接。
- [ ] 判断 demo 的真实主题，确认示例是否真的在演示这个主题。
- [ ] 查阅 1-5 个权威来源：窄 API 至少 1 个官方/规范来源，综合主题 2-5 个来源；记录资料支撑的关键断言。
- [ ] 改写头注释「要点」和「面试」。
- [ ] 改写「知识点要点」和「面试考点」。
- [ ] 补齐或改写「参考资料」小节；每个链接都要能支撑正文中的具体知识点，不放泛泛首页。
- [ ] 如示例不匹配，改示例代码；如涉及用户输入、异步、网络、存储、安全等场景，补充风险、失败路径和边界。
- [ ] 运行该 demo 所在模块的局部检查。
- [ ] 更新生成索引时优先使用下列精确脚本，避免无关 HTML churn：

```bash
node scripts/build-index.mjs
node scripts/gen-vitepress-sidebar.mjs
node scripts/sync-docs-index.mjs
node scripts/gen-demo-search-index.mjs
npm run check:index
```

- [ ] 只有在确认需要重新注入 demo 导航时才运行 `npm run build:index`；运行后必须检查 diff，收回与当前批次无关的 HTML 缩进或导航变动。

## 校验命令

结构与索引：

```bash
npm run validate:demos
npm run check:index
node scripts/report-demo-notes.mjs
```

全量校验：

```bash
npm test
npm run validate
```

浏览器抽查：

```bash
npm run validate:smoke
```

对于有用户输入、DOM 渲染或交互的 demo，至少抽查一次真实页面行为。比如 Todo 样板需要确认输入 `<img src=x onerror=alert(1)>` 时页面显示纯文本，而不是创建 `<img>` 节点。

不同类型 demo 的最低抽查口径：

- 表单类：空输入、非法输入、成功提交、错误提示是否清楚。
- 路由类：初次打开、刷新、前进后退、未知路由 fallback。
- 拖拽/手势类：鼠标拖动、边界位置、拖动结束状态。
- 异步类：成功、失败、重复点击、竞态或取消场景。
- 框架类：页面能渲染，控制台没有红色错误；状态更新、key、生命周期或 effect 行为与讲解一致。
- 安全相关：用户输入必须验证是否被当纯文本处理，避免把演示代码变成错误示范。

## 验收标准

- [ ] 当前批次的 `node scripts/report-demo-notes.mjs` 不再报告模板化问句或缺少参考资料；全库最终目标是当前 manifest 范围全部达标。
- [ ] 已审核 demo 的头注释、复习区、示例代码、参考资料、运行验证五者一致。
- [ ] 已审核 demo 不能留下未人工核对的脚本生成正文；如果使用脚本辅助迁移，必须逐页检查并改写。
- [ ] `npm run validate:demos` 通过。
- [ ] `npm run check:index` 通过。
- [ ] `npm test` 通过。
- [ ] `npm run validate` 通过。
- [ ] 每个模块至少抽查 2-3 个页面，确认内容可以直接用于复习和面试回答。
- [ ] `npm run validate` 如果因为 `npx` 或依赖下载触发网络问题，需要说明原因并在允许联网后重跑；不能把网络失败解释为代码通过。

## 批次进度记录

- 2026-05-27：完成 `apps/css/03-动画/keyframes/index.html` 与 `apps/css/03-动画/loading/01-竖条呼吸.html` 至 `04-文字淡出.html` 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `148/357` 提升到 `153/357`，下一处失败为 `apps/css/03-动画/nprogress/index.html`。
- 2026-05-27：完成 `apps/css/03-动画/nprogress/index.html`、`光标闪烁/index.html`、`展开折叠/index.html`、`序列帧/index.html` 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `153/357` 提升到 `157/357`，下一处失败为 `apps/css/04-视觉效果/background-blend-mode/index.html`。
- 2026-05-27：完成 `apps/css/04-视觉效果/background-blend-mode/index.html`、`drop-shadow/index.html`、`tooltip/index.html`、`按钮/02-立体按钮.html`、`按钮/03-3D按钮.html` 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `157/357` 提升到 `162/357`，下一处失败为 `apps/css/04-视觉效果/文本与图片处理/index.html`。
- 2026-05-27：完成 `apps/css/04-视觉效果/文本与图片处理/index.html`、`百分比圆环/index.html` 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `162/357` 提升到 `164/357`，下一处失败为 `apps/css/05-响应式/media-queries/01-基础布局.html`。
- 2026-05-27：完成 `apps/css/05-响应式/media-queries/01-基础布局.html`、`02-响应式最终页.html`、`apps/css/05-响应式/vw-vh/index.html` 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `164/357` 提升到 `167/357`，下一处失败为 `apps/css/06-性能/01-重排重绘/index.html`。
- 2026-05-27：完成 `apps/css/06-性能/01-重排重绘/index.html`、`02-合成层/index.html`、`03-content-visibility/index.html` 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `167/357` 提升到 `170/357`，下一处失败为 `apps/css/07-现代特性/01-has选择器/index.html`。
- 2026-05-27：完成 `apps/css/07-现代特性/01-has选择器/index.html`、`02-layer层叠管理/index.html`、`03-container-queries容器查询/index.html` 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `170/357` 提升到 `173/357`，下一处失败为 `apps/css/07-现代特性/04-is-where选择器/index.html`。
- 2026-05-27：完成 `apps/css/07-现代特性/04-is-where选择器/index.html`、`05-view-transitions/index.html`、`06-subgrid/index.html` 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `173/357` 提升到 `176/357`，下一处失败为 `apps/css/index.html`。
- 2026-05-27：完成 `apps/css/index.html` 的权威化审核，并补齐现代特性 04-06 的入口链接；`node scripts/report-demo-notes.mjs` 从 `176/357` 提升到 `177/357`，下一处失败为 `apps/vue2/src/01-基础语法/01-模板语法-base.html`。
- 2026-05-27：完成 `apps/vue2/src/01-基础语法/01-模板语法-base.html`、`02-模板插值与指令.html`、`03-v-if-v-show.html` 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `177/357` 提升到 `180/357`，下一处失败为 `apps/vue2/src/01-基础语法/04-bindClass.html`。
- 2026-05-27：完成 `apps/vue2/src/01-基础语法/04-bindClass.html`、`05-bindStyle.html`、`06-computed.html` 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `180/357` 提升到 `183/357`，下一处失败为 `apps/vue2/src/01-基础语法/07-watch.html`。
- 2026-05-27：完成 `apps/vue2/src/01-基础语法/07-watch.html` 至 `16-自定义指令-过滤器-mixin-插件.html` 共 10 个 demo 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `183/357` 提升到 `193/357`，下一处失败为 `apps/vue2/src/01-基础语法/17-综合复习.html`。
- 2026-05-27：完成 `apps/vue2/src/01-基础语法/17-综合复习.html` 至 `apps/vue2/src/03-生命周期/01-八个钩子速记.html` 共 10 个 demo 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `193/357` 提升到 `203/357`，下一处失败为 `apps/vue2/src/04-组件/01-全局与局部组件.html`。
- 2026-05-27：完成 `apps/vue2/src/04-组件/01-全局与局部组件.html` 至 `10-bindComponent-class.html` 共 10 个 demo 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `203/357` 提升到 `213/357`，下一处失败为 `apps/vue2/src/04-组件/11-组件通信汇总.html`。
- 2026-05-27：完成 `apps/vue2/src/04-组件/11-组件通信汇总.html` 至 `apps/vue2/src/05-路由与状态/08-路由重定向与alias.html` 共 10 个 demo 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `213/357` 提升到 `223/357`，下一处失败为 `apps/vue2/src/05-路由与状态/09-路由props解耦.html`。
- 2026-05-27：完成 `apps/vue2/src/05-路由与状态/09-路由props解耦.html` 至 `apps/vue2/src/06-原理与性能/03-性能优化.html` 共 10 个 demo 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `223/357` 提升到 `233/357`，下一处失败为 `apps/vue2/src/07-源码简读/01-源码阅读前置-Symbol.html`。
- 2026-05-27：完成 `apps/vue2/src/07-源码简读/01-源码阅读前置-Symbol.html` 至 `apps/vue3/src/02-响应式与副作用/03-toRef-toRefs.html` 共 10 个 demo 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `233/357` 提升到 `243/357`，下一处失败为 `apps/vue3/src/02-响应式与副作用/04-readonly-shallow-markRaw.html`。
- 2026-05-27：完成 `apps/vue3/src/02-响应式与副作用/04-readonly-shallow-markRaw.html` 至 `apps/vue3/src/04-组件通信/02-attrs与透传.html` 共 10 个 demo 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `243/357` 提升到 `253/357`，下一处失败为 `apps/vue3/src/04-组件通信/03-provide-inject.html`。
- 2026-05-27：完成 `apps/vue3/src/04-组件通信/03-provide-inject.html` 至 `apps/vue3/src/06-内置组件/04-Transition.html` 共 10 个 demo 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `253/357` 提升到 `263/357`，下一处失败为 `apps/vue3/src/07-路由状态工程化/01-Vue-Router-4核心面试点.html`。
- 2026-05-27：完成 `apps/vue3/src/07-路由状态工程化/01-Vue-Router-4核心面试点.html` 至 `07-Vitest单元测试面试点.html` 共 7 个 demo 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `263/357` 提升到 `270/357`，下一处失败为 `apps/vue3/src/08-原理与性能面试/01-Proxy响应式原理.html`。
- 2026-05-27：完成 `apps/vue3/src/08-原理与性能面试/01-Proxy响应式原理.html` 至 `05-性能优化.html` 共 5 个 demo 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `270/357` 提升到 `275/357`，下一处失败为 `apps/react18/src/class-components/01-class-必须super.html`。
- 2026-05-27：完成 `apps/react18/src/class-components/01-class-必须super.html` 至 `05-Clock-setState-批处理对比.html` 共 5 个 demo 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `275/357` 提升到 `280/357`，下一处失败为 `apps/react18/src/class-components/06-class-完整生命周期与API.html`。
- 2026-05-28：完成 `apps/react18/src/class-components/06-class-完整生命周期与API.html` 至 `10-class-Context上下文.html` 共 5 个 demo 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `280/357` 提升到 `285/357`，下一处失败为 `apps/react18/src/class-components/11-class-受控与非受控表单.html`。
- 2026-05-28：完成 `apps/react18/src/class-components/11-class-受控与非受控表单.html` 至 `apps/react18/src/function-components/01-入门-元素与渲染.html` 共 10 个 demo 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `285/357` 提升到 `295/357`，下一处失败为 `apps/react18/src/function-components/02-JSX-条件渲染短路.html`。
- 2026-05-28：完成 `apps/react18/src/function-components/02-JSX-条件渲染短路.html` 至 `11-useEffect-生命周期对照.html` 共 10 个 demo 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `295/357` 提升到 `305/357`，下一处失败为 `apps/react18/src/function-components/12-Hooks-useState基础.html`。
- 2026-05-28：完成 `apps/react18/src/function-components/12-Hooks-useState基础.html` 至 `21-组件通信与children组合.html` 共 10 个 demo 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `305/357` 提升到 `315/357`，下一处失败为 `apps/react18/src/function-components/22-Context跨层传递.html`。
- 2026-05-28：完成 `apps/react18/src/function-components/22-Context跨层传递.html` 至 `31-高阶组件HOC与renderProps.html` 共 10 个 demo 的权威化审核；`node scripts/report-demo-notes.mjs` 从 `315/357` 提升到 `325/357`，下一处失败为 `apps/react18/src/function-components/32-useLayoutEffect与useEffect对比.html`。
