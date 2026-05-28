# 任务：批量升级 `apps/vue2/` 下全部 Vue 2 Demo 页

你是本仓库的前端学习 Demo 维护者。请参照已完成的标杆页面
`apps/vue2/src/01-基础语法/01-模板语法-base.html`，
对 `apps/vue2/` 目录下**全部 `.html` demo 页**（含各子目录，不含 `libs/`）
进行内容审核、修复、补全与增强。

---

## 一、必须遵守的仓库规范

1. 严格遵循根目录 `CONVENTIONS.md` §4（元数据头注释、页面骨架、复习区写作规范）。
2. `<head>` 必须引入（路径按文件实际层级调整）：
   - `../../libs/vue.js`（或相对路径等价的 vue.js）
   - `../../../../packages/shared/demo-notes.css`
   - `../../../../packages/shared/demo-shell.css`
3. Vue 2 demo 页面骨架顺序：

   ```
   body.demo-page
   ├── <!-- NOTES_START --> ~ <!-- NOTES_END -->       复习区（必须有）
   ├── <!-- PAGE_DOM_START --> ~ <!-- PAGE_DOM_END -->  挂载区 / 交互 UI
   ├── <!-- SCRIPT_START --> ~ <!-- SCRIPT_END -->     new Vue / 组件 / 路由等
   └── <!-- NAV_START --> ~ <!-- NAV_END -->           页脚导航 + file:// 目录修正脚本
   ```

4. **最小改动原则**：只改与「内容正确性、演示可感知性、学习/面试价值、SCRIPT 核心注释」相关的部分；不重排无关代码、不引入新 npm 依赖、不改变 demo 核心教学主题。
5. **不要 git commit**，除非我明确要求。
6. 最终回复使用中文；按目录分批汇报进度（见文末「执行方式」）。

---

## 二、权威来源要求（硬性）

所有知识点、面试答法、演示行为必须**先查权威来源再写**，禁止凭记忆或博客口径：

- **唯一首选（Vue 2 主题）**：[Vue 2 官方文档](https://v2.vuejs.org/v2/guide/)
- **按主题查对应章节**（示例）：
  - 模板 / 指令 → [Template Syntax](https://v2.vuejs.org/v2/guide/syntax.html)
  - 实例 / data → [The Vue Instance](https://v2.vuejs.org/v2/guide/instance.html)
  - 条件渲染 → [Conditional Rendering](https://v2.vuejs.org/v2/guide/conditional.html)
  - 列表 → [List Rendering](https://v2.vuejs.org/v2/guide/list.html)
  - 事件 → [Event Handling](https://v2.vuejs.org/v2/guide/events.html)
  - 表单 → [Form Input Bindings](https://v2.vuejs.org/v2/guide/forms.html)
  - 计算 / 侦听 → [Computed Properties and Watchers](https://v2.vuejs.org/v2/guide/computed.html)
  - 组件 → [Components Basics](https://v2.vuejs.org/v2/guide/components.html) 及 Components In-Depth
  - 响应式原理 → [Reactivity in Depth](https://v2.vuejs.org/v2/guide/reactivity.html)
  - 路由 → [Vue Router 3.x 文档](https://v3.router.vuejs.org/)（与 Vue 2 配套）
  - Vuex → [Vuex 3.x 文档](https://v3.vuex.vuejs.org/)
- **ES / DOM 边界**（仅当 demo 涉及）：[MDN Web Docs](https://developer.mozilla.org/)
- **仓库内**：`CONVENTIONS.md`、标杆 `01-模板语法-base.html`、`docs/demos/authoritative-review-plan.md`

具体要求：

- 与 `v2.vuejs.org` 冲突时，**以 Vue 2 官方文档为准**修正 NOTES / 头注释 / SCRIPT 注释。
- 参考资料链接必须**直接支撑**正文关键结论；每条链接对应 NOTES 中至少一个明确结论。
- **禁止**为凑数量添加弱相关链接；综合主题 2～6 条，窄 API 至少 1 条官方链接。
- **NOTES 写了的机制，PAGE_DOM 或 SCRIPT 必须能验证**（按钮交互、Console、DevTools 观察 DOM 变化、SCRIPT 反面注释均可）。
- 若页面依赖外链 CDN、需手动开服务器、或无法在本环境运行，在 `p.hint` 标注「需人工在浏览器验证」并说明原因。
- `npm run transform:all-demos` / `npm run enhance:demo-notes` / `npm run refresh-header-interview` **禁止**用来覆盖你已人工核对过的学习正文。

---

## 三、按四个区块逐项改造（每个 demo 都做）

### 1. 顶部元信息注释（`<!DOCTYPE>` 之前）

检查并补齐：

| 字段 | 要求 |
|------|------|
| `分类` | `vue2 / 子目录名`（如 `01-基础语法`、`04-组件`） |
| `主题` | 一句话，与 NOTES 的 `<h1>` 一致 |
| `要点` | 3～6 条，**必须对应当前 SCRIPT / PAGE_DOM 能演示或注释说明的内容** |
| `面试` | 3～6 条，**具体问句**；禁止模板化（如「核心概念是什么」「实际项目里怎么用」） |
| `相关` | 可选；同子目录上下游 demo，与页脚 NAV 链接一致 |
| 可选 | `难度`、`前置` |

**质量检查**：随机抽一条 `要点`，在 SCRIPT / PAGE_DOM 里能找到对应代码或交互；找不到则删改要点或补演示。

### 2. NOTES 区

检查并修复：

- `<h1>` 与「主题」一致
- `p.hint`：**必须写清本页如何操作**（点哪个按钮、看 Console、看 Elements、悬停哪个元素等）
  - **禁止**空泛的「在浏览器中操作下方交互演示；复习要点与面试答法见上方区块」
  - **禁止**「见上方复习区」（复习区本来就在上方）
- **知识点要点**：4～7 条 = 概念 + 官方行为 + 常见坑 + 与相近 API 的区别
- **面试考点**：3～6 条，格式：
  - `<strong>具体问句？</strong>` + 2～4 句：**先结论 → 原因（引用官方机制）→ 项目边界**
- 头注释 `面试:` 的**每一条**必须在 NOTES「面试考点」有对应 Q&A（条数一致、问法一致）
- **参考资料**：2～6 条，**优先 `https://v2.vuejs.org/...`**；Router/Vuex 用对应 3.x 官方文档

### 3. PAGE_DOM / 示例代码区

检查并增强：

- 演示区必须能**亲手验证**当前页核心知识点（按钮切换、输入、列表增删改、路由跳转等）
- 静态展示不足以讲清的机制（如 `v-if` vs `v-show`、`key`、批处理、nextTick），**补最小交互**：
  - 条件渲染：提供切换 `seen` / `flag` 的按钮
  - 列表 + key：数据用稳定 `id`，提供「反转 / 删除 / 插入」之一
  - 事件：确保 `v-on` / `@` 可触发且视图变化可见
  - `v-model`：输入框与展示字段联动
- `v-for` 使用 **string/number 的唯一 key**（优先 `item.id`，与官方 List 示例一致）
- `button` 建议加 `type="button"`，避免表单误提交
- 保持原有 `id` / `el` 选择器约定，不随意改名导致 SCRIPT 断裂
- 若本页主题是 Vue Router / Vuex / 异步组件，PAGE_DOM 结构按该主题最小可运行即可

### 4. SCRIPT 区

检查并增强：

- **实例创建顺序**建议与 PAGE_DOM 自上而下一致（可读性）
- **核心逻辑必须加块注释**（标杆格式）：

  ```javascript
  // ---------------------------------------------------------------------------
  // app_x / 组件名：本块教学主题（一句话）
  // 官方：对应机制的一句话（勿写口语化谣言）
  // ---------------------------------------------------------------------------
  ```

- 删除或修正不准确注释，例如：
  - 「字符串模板」→ 实为 **in-DOM 模板** 或 `template` 选项
  - 「显示与隐藏」描述 `v-if` → 应写 **条件渲染（创建/销毁 DOM）**；显隐用 `v-show`
  - 「单根」混淆 → 写清 **每个实例一个 `el` 容器** vs **组件模板单根**（若涉及组件）
  - 「同步更新」类表述 → 按官方写 **异步队列 / `$nextTick`**
- `methods` 中 `this` 指向当前 Vue 实例；**禁止**在需要实例 `this` 的回调里误用箭头函数定义 `methods` 成员（若 demo 专门讲 this 绑定则保留对比）
- 不删除有教学意义的「错误写法注释块」；若保留，NOTES 须标明是反面教材

---

## 四、Vue 2 常见需修正的表述（以 v2.vuejs.org 为准）

| 易错说法 | 正确说法 |
|---------|---------|
| Mustache 可用于 HTML 属性 | 属性必须用 `v-bind` / `:` |
| `v-if` 只是隐藏元素 | `v-if` 为假时不渲染/销毁节点；`v-show` 才只切 `display` |
| `v-model` 等于完整表单方案 | 仅是 value + 事件的语法糖；校验/提交是应用层 |
| `v-for` 可不写 key | 官方建议提供唯一 string/number `key` |
| 索引 key 永远不能用 | 官方强调稳定身份；索引在**会重排且有状态**的列表中风险高，优先业务 id |
| 同节点 `v-if` + `v-for` 随意混用 | `v-for` 优先级更高；官方不推荐，宜 computed 过滤后再 `v-for` |
| 整页只能一个 `#app` | 可多实例教学；生产常见单根 + 组件树 |
| 改 `data` 后 DOM 立刻同步 | 更新走异步队列；要 DOM 后状态用 `$nextTick` |
| `Vue.set` 可随意给根级加属性 | 根级新属性需初始化在 `data` 中；`Vue.set` 用于对象新属性或数组索引 |
| 所有数组改动都响应式 | 直接改索引/length 不触发更新；用 `Vue.set` / `splice` 等 |
| `filters` 仍是 Vue 3 推荐 | Vue 2 有 filters；Vue 3 已移除——若提新项目须说明版本 |
| Vue 2 与 Vue 3 选项 API 完全相同 | 涉及 Composition API、Fragment、Proxy 响应式时须标注 Vue 3 边界 |

---

## 五、与标杆页对齐的检查清单（每个文件改完后自检）

- [ ] 头注释 `要点` / `面试` 与 NOTES、SCRIPT 一致，无模板化问句
- [ ] `p.hint` 能指导用户具体操作本页演示
- [ ] 面试题可在 NOTES 找到「结论 + 原因 + 场景」答法
- [ ] 参考资料链接有效且为官方（Vue 2 / Router 3 / Vuex 3 / MDN）
- [ ] PAGE_DOM 能验证 NOTES 中的核心机制
- [ ] SCRIPT 核心块有 `// ---` 分隔注释，无过时谣言注释
- [ ] NAV 链接未破坏；`file://` 下目录链接修正脚本保留
- [ ] 未引入无关重构；教学意图未改变

---

## 六、执行方式（一次改完全目录）

请按子目录**分批**处理，每批完成后简短汇报（不必逐文件长篇）：

| 批次 | 路径 |
|------|------|
| 1 | `apps/vue2/src/01-基础语法/` |
| 2 | `apps/vue2/src/02-响应式原理/` |
| 3 | `apps/vue2/src/03-生命周期/` |
| 4 | `apps/vue2/src/04-组件/` |
| 5 | `apps/vue2/src/05-路由与状态/` |
| 6 | `apps/vue2/src/06-原理与性能/` |
| 7 | `apps/vue2/src/07-源码简读/` |

**每批流程**：

1. `Glob` 列出该批所有 `.html`
2. 逐文件：先读 PAGE_DOM + SCRIPT，再对照 `v2.vuejs.org` 改四区块
3. 标杆对照：`01-模板语法-base.html`（基础语法）；同主题可参考已审核 sibling（如 `03-v-if-v-show.html`）
4. 跑校验（若环境允许）：
   - `node scripts/report-demo-notes.mjs`（关注该目录是否仍报模板化/缺参考资料）
   - `node scripts/validate-demos.mjs`（结构 / 头注释 / 面试条数）
5. 汇报格式：
   - 已改文件列表
   - 每文件 1 行「改了什么」（交互补全 / NOTES 纠错 / SCRIPT 注释）
   - 未改文件及原因（已是标杆、纯外链无法验证等）
   - 需我人工浏览器点验的页面

**禁止**：用批量脚本生成最终 NOTES 正文后声称「已完成」。

---

## 七、开始执行

从 **批次 1：`apps/vue2/src/01-基础语法/`** 开始。

`01-模板语法-base.html` 已是标杆，仍须快速过一遍检查清单；其余文件按上述标准全部改造。

全部 7 个批次完成前不要停止；若上下文不够，在每批结束时说明「下一批从 xxx 继续」。

---

## 八、给用户的快速启动句（复制到新对话）

```
@apps/vue2/src/prompt.md
@apps/vue2/src/01-基础语法/01-模板语法-base.html

请严格按 prompt.md 执行：从批次 1 开始改造 apps/vue2 下全部 demo，不要 git commit。
```
