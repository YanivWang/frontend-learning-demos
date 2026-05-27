# Demo 学习内容权威化审核计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
> 人工维护者可忽略上一行工具要求；下面的内容才是 demo 审核的共同约束。

**Goal:** 把全库 demo 从“形式上有注释”升级为“可用于复习、面试准备和找工作的可靠学习材料”。

**Architecture:** 脚本只负责定位问题、检查结构和运行校验；学习内容必须人工审核，并和权威资料、可运行示例互相印证。每个 demo 都要做到头注释、复习区、示例代码三者一致。

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

## 分批推进

### 第一批：综合 demos + JavaScript 高频基础

- [ ] 审核 `apps/demos/` 剩余 demo：拖拽、分步表单、hash-router、viewpager、virtual-list。
- [ ] 审核 `apps/javascript/01-基础/`：变量、函数、数组、字符串、类型转换、正则、JSON、Date、parseInt、Symbol、Unicode。
- [ ] 审核 `apps/javascript/02-函数与作用域/`：作用域链、闭包、this、柯里化。
- [ ] 审核 `apps/javascript/08-面试题/` 高频手写题：call/apply、bind、new、instanceof、Promise、EventEmitter、LRU、防抖节流。

### 第二批：React 18 / React 19

- [ ] React 18 函数组件：createRoot、JSX、props、state、Hooks、effects、ref、memo、key、Context、表单、Suspense。
- [ ] React 18 class 组件：constructor/super、state/props、setState、生命周期、Context、错误边界。
- [ ] React 19：Actions、`useActionState`、`useOptimistic`、`use()`、ref as prop、Transitions、RSC 边界。
- [ ] 所有 React 内容优先对齐 `react.dev` 当前文档；过时 API 必须标注维护场景和替代方式。

### 第三批：Vue 2 / Vue 3

- [ ] Vue 2 基础语法、组件、路由、Vuex、生命周期。
- [ ] Vue 2 响应式原理重点核对：`Object.defineProperty`、数组限制、`Vue.set`、data 代理、Watcher / Dep。
- [ ] Vue 3 基础语法、组合式 API、生命周期、组件通信、内置组件。
- [ ] Vue 3 响应式重点核对：`ref`、`reactive`、`toRef`、`toRefs`、`watch`、`computed`、`effectScope`、`nextTick`。

### 第四批：TypeScript + CSS

- [ ] TypeScript 基础：类型推断、interface vs type、泛型、函数重载、元组、class、enum。
- [ ] TypeScript 进阶：类型收窄、Utility Types、条件类型、`infer`、映射类型、模板字面量、`never` 穷尽检查。
- [ ] CSS 基础、布局、动画、视觉效果、响应式、性能、现代特性。
- [ ] CSS 内容优先核对 MDN CSS、CSSWG 规范和浏览器兼容性说明。

## 每个 demo 的执行步骤

- [ ] 阅读当前 HTML：头注释、复习区、运行示例、导航和相关链接。
- [ ] 判断 demo 的真实主题，确认示例是否真的在演示这个主题。
- [ ] 查阅 2-5 个权威来源，记录到「参考资料」小节。
- [ ] 改写头注释「要点」和「面试」。
- [ ] 改写「知识点要点」和「面试考点」。
- [ ] 如示例不匹配，改示例代码；如涉及用户输入、异步、网络、存储、安全等场景，补充风险和边界。
- [ ] 运行该 demo 所在模块的局部检查。
- [ ] 更新生成索引：优先运行不会造成无关 HTML churn 的脚本；确需运行 `npm run build:index` 时，检查 diff 并收回无关导航缩进改动。

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

## 验收标准

- [ ] `node scripts/report-demo-notes.mjs` 对已审核批次不再报告模板化问句或缺少参考资料。
- [ ] 已审核 demo 的头注释、复习区、示例代码、参考资料四者一致。
- [ ] `npm run validate:demos` 通过。
- [ ] `npm run check:index` 通过。
- [ ] `npm test` 通过。
- [ ] `npm run validate` 通过。
- [ ] 每个模块至少抽查 2-3 个页面，确认内容可以直接用于复习和面试回答。
