# 维护指南：`apps/vue3/` Vue 3 Demo 页

你是本仓库的前端学习 Demo 维护者。`apps/vue3/` 下 **43 个** `.html` demo 已完成首轮四区块对齐升级（2025-05）；后续改动请按**与标杆一致的质量标准**做增量修复、补全与增强。

**质量标杆（改造前必须先读结构，改造时对齐写法）：**

| 标杆                                | 路径                                                                 | 适用场景                                                                               |
| ----------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 基础语法 + In-DOM 模板 + 四区块对齐 | `apps/vue3/src/01-基础语法/01-应用实例与模板语法.html`               | createApp/mount、模板语法、ref 解包、NOTES↔PAGE_DOM↔SCRIPT 一致、SCRIPT 核心中文注释 |
| 响应式 + 交互验证                   | `apps/vue3/src/02-响应式与副作用/02-computed-watch-watchEffect.html` | computed vs watch vs watchEffect 对照、按钮触发、控制台可验证                          |
| 多组件通信                          | `apps/vue3/src/04-组件通信/01-props与emit.html`                      | 子组件 inline / 全局注册、props/emit 可观察                                            |
| 面试/原理页                         | `apps/vue3/src/08-原理与性能面试/01-Proxy响应式原理.html`            | 概念 + 最小可运行对照；无法单页跑通的须标注边界                                        |

**规范来源：** 根目录 `CONVENTIONS.md` §4；本文件 §十二 为完整 demo 清单与待补专题。

**与 AI 沟通：** 新对话中 `@apps/vue3/prompt.md` `@CONVENTIONS.md` 及上述标杆文件，再粘贴 §十一「单页修复」或 §十「增量维护」指令。

---

## 零、每个文件的标准工作流（禁止跳过）

对**每一个** `.html` 文件，严格按顺序执行：

1. **读取**当前文件全文，判断 demo 类型（见 §三 类型表）。
2. **查权威来源**（必须先查再写，禁止凭记忆）：
   - **首选** [Vue 3 官方 Guide](https://vuejs.org/guide/introduction.html)（Essentials / Components / Reusability / Built-ins 等对应章节）
   - **次选** [Vue 3 官方 API Reference](https://vuejs.org/api/)（Application / Composition API / Built-in Directives / Built-in Components）
   - **安全/最佳实践**：[Security](https://vuejs.org/guide/best-practices/security.html)、[Performance](https://vuejs.org/guide/best-practices/performance.html)
   - **版本特性**：Pinia / Vue Router 4 / Vitest 等须查对应官方文档；标注最低 Vue 版本（如 `defineModel` 3.4+、`useTemplateRef` 3.5+）
   - **同主题 sibling demo** 作分工参考（如 `01-应用实例与模板语法.html` vs `02-条件列表与key.html`）
3. **四区块 Gap 分析**（动手改之前明确，见 §三）：
   - 与 Vue 官方文档冲突的错误/过时表述
   - 头注释 `要点` / `面试` / NOTES 写了但 PAGE_DOM / SCRIPT **没有**的演示
   - PAGE_DOM 交互与 SCRIPT 逻辑**不对齐**
   - SCRIPT 有但 NOTES **没解释**的核心机制
   - 面试题无法在页面内（DOM / Console）验证的
   - 布局引导语错误（方位、区块名称与 CONVENTIONS 不一致）
4. **直接修改文件**（不要只写分析报告不改文件）。
5. **单文件自检**（改完必过，见 §八）。

---

## 一、必须遵守的仓库规范

1. 严格遵循根目录 `CONVENTIONS.md` §4（元数据头注释、页面骨架、复习区写作规范）。
2. `<head>` 必须引入（路径按实际层级调整）：
   - `packages/shared/demo-notes.css`
   - `packages/shared/demo-shell.css`
3. Vue3 demo 页面骨架顺序：

   ```
   body.demo-page
   ├── <!-- NOTES_START --> ~ <!-- NOTES_END -->       复习区（必须有）
   ├── <!-- PAGE_DOM_START --> ~ <!-- PAGE_DOM_END -->  #app 演示区（必须有）
   ├── <!-- SCRIPT_START --> ~ <!-- SCRIPT_END -->     createApp / 组件逻辑（必须有）
   └── <!-- NAV_START --> ~ <!-- NAV_END -->           页脚导航 + file:// 目录修正脚本
   ```

4. **技术栈约束**：本目录 demo 默认 **CDN 全局构建**（`apps/vue3/libs/vue.global.js`），Composition API + `setup()`；不要擅自改成 Vite 工程或引入新 npm 依赖。
5. **最小改动原则**：只改与「内容正确性、演示完整性、学习/面试价值」相关的部分；不重排无关代码、不重构 demo 核心逻辑。
6. **不要 git commit**，除非我明确要求。
7. 最终回复使用中文。

---

## 二、权威来源要求（硬性）

所有知识点、面试答法、演示行为必须**先查 Vue 官方文档再写**，禁止凭记忆或口语化说法：

- **应用/模板/响应式/组件**： [vuejs.org/guide](https://vuejs.org/guide/introduction.html)
- **API 签名与边界**： [vuejs.org/api](https://vuejs.org/api/)
- **Router / Pinia / Vitest**：各自官方站点，并在 NOTES 标注「本页为概念/面试梳理，完整能力需工程化项目验证」
- **仓库内**：`CONVENTIONS.md`、同主题 sibling demo

具体要求：

- 禁止使用无出处的称谓或过时说法；与官方文档冲突时以官方为准修正。
- 参考资料链接必须**直接支撑**正文关键结论，禁止凑弱相关链接。
- **铁律：NOTES / 头注释 `要点` / `面试` 里写的机制，必须在 SCRIPT 或 PAGE_DOM 中能验证。**
  - 行为型结论（如 computed 缓存、watch 触发时机）→ 须有按钮/日志/ DOM 变化可观察。
  - 无法在本页运行（需完整 Vite 工程、真实 Router 历史模式、Vitest CI）→ NOTES 标明边界，**禁止写虚假结论**。
- 批量脚本 `transform:all-demos` / `format:all-demos` **禁止**用来覆盖你已人工核对过的正文。

**常见必须修正的表述**（以 Vue 3 官方文档为准）：

| 错误/过时说法                              | 正确说法（官方依据）                                                                                                                                                            |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 同一 app 实例再次 `mount()` 会先卸载再挂载 | **每个 app 实例 `mount()` 只能调用一次**；重复调用会警告；`unmount()` 后须重新 `createApp()`（[app.mount()](https://vuejs.org/api/application.html#app-mount)）                 |
| ref 在 JS 里也不用 `.value`                | 自动解包**仅**发生在模板等特定场景；`setup()` 中读写 ref 须 `.value`（[ref()](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#ref)）                            |
| `reactive()` 可包装任意类型                | `reactive()` **仅适用于对象类型**；基本类型用 `ref()`（[reactive() Limitations](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive)）      |
| 解构 `reactive` / props 仍保持响应式       | 解构基本类型会**丢失**响应式连接；须 `toRefs` / 保持对象引用（[Limitations](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive)）          |
| 模板里随便调方法没问题                     | 模板绑定中的方法**每次更新都会调用**，且**不应有副作用**；可缓存用 `computed`（[Calling Functions](https://vuejs.org/guide/essentials/template-syntax.html#calling-functions)） |
| `v-html` 渲染用户内容是安全的              | `v-html` 绕过默认转义，未消毒内容可导致 XSS；仅用于可信内容（[Security](https://vuejs.org/guide/best-practices/security.html)）                                                 |
| Vue3 完全移除 Options API                  | Options API **仍支持**；本仓库 demo 以 Composition API 为主，NOTES 勿写「Vue3 只有 setup」                                                                                      |
| `v-if` 与 `v-for` 可同时用在同一元素       | **不推荐**同元素并用；`v-if` 优先级更高（[Template Syntax](https://vuejs.org/guide/essentials/template-syntax.html)）                                                           |
| `key` 随便写 index 永远没问题              | 列表增删/排序/输入态场景应用稳定 id；index 作 key 有复用/状态错乱风险（[List Rendering](https://vuejs.org/guide/essentials/list.html)）                                         |

---

## 三、按四个区块逐项改造（每个 demo 都做）

### 1. 顶部元信息注释（`<!DOCTYPE>` 之前）

检查并补齐：

| 字段   | 要求                                                     |
| ------ | -------------------------------------------------------- |
| `分类` | `vue3 / src/子目录名`（如 `vue3 / 01-基础语法`）         |
| `主题` | 一句话，与 `<h1>` 一致                                   |
| `要点` | 3～7 条，**必须对应当前 PAGE_DOM / SCRIPT 能演示的内容** |
| `面试` | 3～5 条，具体问句，禁止泛化模板                          |
| `相关` | 同章上下游 demo，与页脚 NAV 一致                         |
| 可选   | `难度`、`前置`、最低 Vue 版本                            |

**质量检查**：随机抽 1 条 `要点` 和 1 条 `面试`，在 SCRIPT / PAGE_DOM 里定位；找不到则删改要点或补代码/交互。

### 2. NOTES 区

检查并修复：

- `<h1>` 与「主题」一致
- `p.hint` 引导语：`在浏览器中操作下方交互演示；复习要点与面试答法见本复习区。`（NOTES 在上方时写「本复习区」）
- **知识点要点**：4～8 条 = 概念 + 运行时行为 + 易错点 + 与 sibling demo 的分工
- **面试考点**：3～5 条，格式 `<strong>问句？</strong>` + 2～4 句（**先结论 → 原因 → 边界/项目场景**）
- **参考资料**：1～5 条 **vuejs.org** 官方链接；涉及 Router/Pinia/Vitest 时可加对应官方链接并标注本页验证范围
- 头注释 `要点` / `面试` 与正文**不矛盾**；正文可比头注释多 1～2 句展开

### 3. PAGE_DOM / 示例代码区（`#app` 内）

按 demo **类型**处理，不要强行统一：

| 类型                      | 判断                                   | PAGE_DOM 要求                                                               |
| ------------------------- | -------------------------------------- | --------------------------------------------------------------------------- |
| **A. 单应用 In-DOM 模板** | 一个 `#app`，模板写在容器内            | 分段 `<h2>` + `p.hint-inline` 说明观察什么；按钮触发可验证行为              |
| **B. 多组件**             | props/emit/slots/动态组件              | 子组件可 inline 模板字符串或 `app.component` 注册；交互须能观察父子通信     |
| **C. 内置组件**           | KeepAlive/Teleport/Suspense/Transition | 保留最小 UI；说明切换/挂载点/异步边界                                       |
| **D. 面试/原理**          | 08 章、部分 07 章                      | 概念区 + 可运行对照（Proxy/调度/nextTick）；纯口述须标注「需结合源码/工程」 |
| **E. 工程化梳理**         | Vite/Pinia/Router/Vitest 面试点        | 以代码片段 + 说明为主；可运行示例页（如 06-Router与Pinia）保持可打开        |

补全规则：

- 每个演示子模块有 **`<h2>` 标题 + 说明 +（可选）按钮**
- `p.hint-inline` 写清：点哪个按钮、Console/DOM 会出现什么
- 演示「反模式」时（如模板方法故意副作用）须 **明确标注「仅演示，生产勿用」**
- **不破坏**已有可工作的演示效果
- In-DOM 模板页须在 hint 中点明 **In-DOM 模板** 模式（根组件无 `template` 时用容器 innerHTML）

### 4. SCRIPT 区（核心改造）

每个 demo 的 `<!-- SCRIPT_START -->` ~ `<!-- SCRIPT_END -->` 必须：

#### 4.1 结构与注释（对标 `01-应用实例与模板语法.html`）

```js
// CDN 全局构建：const { createApp, ref, ... } = Vue

// createApp 创建应用实例；In-DOM 模板 / 多组件注册 等机制说明
const app = createApp({
  setup() {
    // --- 响应式状态 ---
    // ref / reactive 用途说明（中文）

    // --- 演示辅助状态 ---（若有）

    // 核心方法：触发什么、验证什么官方行为
    function demoAction() { ... }

    onMounted(() => { console.log('[mounted] ...') })

    return { /* 暴露给模板 */ }
  },
})

// mount 须在 app.use / app.component / app.config 之后；每实例只能 mount 一次
const rootInstance = app.mount('#app')
```

1. 用 `// --- 小节 ---` 或 `// ============ N. 主题 ============` 分段，**与 NOTES 要点 / PAGE_DOM `<h2>` / 面试题对应**
2. **核心逻辑必须写中文注释**：说明机制、对应官方哪条规则、本页要验证什么
3. `createApp` / `mount` / `setup` / `return` / 生命周期 / 通信 API 等关键行须有注释
4. 故意演示反模式（副作用、错误 key）须在注释中标明

#### 4.2 演示完整性（gap 分析后补全）

NOTES / 面试里提到但脚本缺失的，**按主题补**（不要套模板）：

- **createApp / mount**：`onMounted` 日志；必要时 `console.log` mount 返回的根组件实例
- **ref 解包**：模板 vs `setup` 中 `.value` 对照；事件里 ref 赋值
- **computed vs method vs watch**：计数/日志证明缓存与触发差异
- **props / emit / v-model**：父子状态可观察变化
- **provide / inject**：跨层访问可验证
- **生命周期**：挂载/更新/卸载顺序日志（子组件 v-if 切换）
- **KeepAlive / Teleport / Suspense**：切换后 DOM/缓存行为可观察
- **nextTick**：DOM 更新前后对比
- **原理页**：最小 Proxy/调度模拟 + 注释链到官方「Reactivity in Depth」

#### 4.3 输出与验证

- **DOM 变化** + **`console.log` 前缀标签**（如 `[setup]` `[method]` `[watch]`）便于对照
- 改完后在浏览器打开该页：**Console 无报错**、按钮交互符合 NOTES 描述
- 多组件页确认子组件注册名与模板标签一致

#### 4.4 工程约束

- 使用 `apps/vue3/libs/vue.global.js`，勿改版本除非用户要求
- 页脚 NAV 里 `file://` 目录修正脚本**保留在 NAV 区**
- Router/Pinia **可运行示例**页保持相对路径与现有 libs 一致
- 不要删除 demo 依赖的 `packages/shared/` 引用

---

## 四、增量维护策略

### 步骤

1. **定位文件**：按 §十二 清单，或 `find apps/vue3 -name '*.html' | sort`。
2. **遵循 §零 工作流**：先查官方文档，再改文件；自检 **头注释 ↔ NOTES ↔ PAGE_DOM ↔ SCRIPT 四者一致**。
3. **同主题去重**：相邻 demo 分工明确——基础页讲语法 + 可运行交互，进阶页讲边界 + 面试题。
4. **改完后**：运行 `npm run validate`；抽样打开改过的页面，确认 Console 无报错、交互符合 NOTES。
5. **新增 demo**：添加 `.html` 后运行 `npm run build:index` 与 `node scripts/sync-readmes.mjs`。

### 需人工工程化环境验证的文件

- `07-路由状态工程化/04-Vite工程化面试点.html` — 真实 Vite 配置与 HMR
- `07-路由状态工程化/07-Vitest单元测试面试点.html` — Vitest CI 与 Vue Test Utils
- `07-路由状态工程化/06-Router与Pinia可运行示例.html`、`08-路由懒加载可运行示例.html` — history 模式部署 fallback

### 待补专题（可选增量）

- 自定义指令、渲染函数 / `h()`、`TransitionGroup` 独立页
- Router 嵌套路由 / 命名视图可运行示例
- TypeScript + Vue SFC 与 `apps/typescript/` 串联说明

---

## 五、各分类侧重点

| 目录                   | 侧重点                                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `01-基础语法/`         | createApp/mount/In-DOM 模板、插值/指令、v-if/v-for/key、事件/v-model、class/style、模板 ref/nextTick、useTemplateRef                  |
| `02-响应式与副作用/`   | ref/reactive/解构、computed/watch/watchEffect、toRef/toRefs、readonly/shallow/markRaw、effectScope、onWatcherCleanup、shallowRef 对比 |
| `03-生命周期与组合式/` | 生命周期顺序、composable 复用、setup vs script setup、KeepAlive 钩子                                                                  |
| `04-组件通信/`         | props/emit、attrs 透传、provide/inject、组件 v-model、defineModel、props 解构响应式                                                   |
| `05-插槽与组件形态/`   | 默认/具名/作用域插槽、动态组件、异步组件                                                                                              |
| `06-内置组件/`         | KeepAlive、Teleport、Suspense、Transition                                                                                             |
| `07-路由状态工程化/`   | Router 4、Pinia、Vite、script setup 宏、Router+Pinia 可运行、路由懒加载、Vitest 面试边界                                              |
| `08-原理与性能面试/`   | Proxy 响应式、虚拟 DOM/diff/key、调度器、nextTick、Vue2 vs Vue3、性能优化、综合复习                                                   |

---

## 六、禁止事项

- 不要给所有 demo 套同一套模板化面试答案
- 不要删除已有可工作的演示效果
- 不要修改 `manifest.json`（由脚本生成）
- 不要修改 `packages/shared/`、`apps/vue3/libs/` 除非 demo 确实无法引用现有资源
- 不要一次性大重构整个目录结构
- 不要擅自引入 Vite/webpack/npm 依赖到单页 demo
- 不要「只评估不改文件」
- 不要把 Vue2 专属 API（如 `$on`/`$off` 实例事件）写成 Vue3 推荐写法
- 不要写「同一 app 实例可多次 mount 会先卸载再挂载」

---

## 七、单文件改造自检清单（改完必过）

- [ ] 头注释 `要点` / `面试` 与 `<h1>`、PAGE_DOM 分段、SCRIPT 分段一致
- [ ] 每条知识点要点能在 SCRIPT 或 PAGE_DOM 找到依据
- [ ] 每条面试考点能在 SCRIPT / PAGE_DOM / Console 验证，或已标注需工程化环境验证
- [ ] 面试答法与 Vue 3 官方 Guide/API 一致，无口语化/过时说法
- [ ] PAGE_DOM 交互与 SCRIPT 逻辑对齐（变量名、方法名、触发结果）
- [ ] SCRIPT 有分段 + **核心中文注释**（createApp/setup/响应式/通信/生命周期等）
- [ ] mount/createApp/ref/reactive/computed/watch 等易错点与官方一致
- [ ] 故意反模式演示已标注「仅演示」
- [ ] `p.hint` / `p.hint-inline` 引导语正确
- [ ] 参考资料为 vuejs.org（及必要的 Router/Pinia/Vitest 官方）且与正文强相关
- [ ] NAV 链接与同章 demo 衔接合理；file:// 目录脚本保留

---

## 八、标杆参考（改造前必读）

### `apps/vue3/src/01-基础语法/01-应用实例与模板语法.html`（标杆）

- 头注释 `要点` / `面试` 与 PAGE_DOM / SCRIPT 一一对应
- NOTES：mount 只能一次、In-DOM 模板、表达式沙箱、`{{ }}` 转义 vs `v-html`、模板方法副作用边界
- PAGE_DOM：四段 `<h2>` 演示 + `hint-inline` 说明观察点
- SCRIPT：`app` 与 `mount()` 分离、分段中文注释、`onMounted` + 根组件实例日志
- 参考资料：Application / Template Syntax / Reactivity / API createApp / Security

### 其他页面对齐要点

- `02-条件列表与key.html`：v-if/v-show/v-for/key 可交互验证
- `02-computed-watch-watchEffect.html`：缓存 vs 触发时机对照
- `01-props与emit.html`：父子通信 + 控制台/DOM 可观察
- `08-*` 原理页：概念准确 + 最小可运行对照或明确边界

---

## 九、快速启动（复制到新对话）

```
@apps/vue3/prompt.md
@CONVENTIONS.md
@apps/vue3/src/01-基础语法/01-应用实例与模板语法.html

按 prompt.md 维护 apps/vue3/ 下指定 demo（或 §十二 待补专题）。
遵循 §零 工作流：先查 Vue 3 官方文档，直接改文件，不要只分析。
每个文件：四区块对齐、NOTES↔PAGE_DOM↔SCRIPT 一致、SCRIPT 核心中文注释、面试题可验证。
改完后运行 npm run validate。不要 git commit。
```

---

## 十、增量维护（指定单页或多页）

```
@apps/vue3/prompt.md
@CONVENTIONS.md
@apps/vue3/src/[目标文件路径].html

修复 apps/vue3/src/[目标文件路径].html：
遵循 §零 工作流与 §七 自检清单；先查 Vue 3 官方文档，直接改文件。
若新增 demo，改完后 npm run build:index && npm run validate。不要 git commit。
```

---

## 十一、单页修复（最常见）

1. 读取目标文件全文，按 §三 做四区块 Gap 分析
2. 查 Vue 官方文档后再改 NOTES / PAGE_DOM / SCRIPT
3. 改完过 §七 自检清单，运行 `npm run validate`

---

## 十二、Demo 清单（共 43 个，均已首轮对齐）

### 01-基础语法（6）

- `apps/vue3/src/01-基础语法/01-应用实例与模板语法.html`（标杆）
- `apps/vue3/src/01-基础语法/02-条件列表与key.html` ✓
- `apps/vue3/src/01-基础语法/03-事件与表单v-model.html` ✓
- `apps/vue3/src/01-基础语法/04-class与style绑定.html` ✓
- `apps/vue3/src/01-基础语法/05-模板ref与nextTick.html` ✓
- `apps/vue3/src/01-基础语法/06-useTemplateRef模板ref.html` ✓

### 02-响应式与副作用（7）— 均已对齐 ✓

### 03-生命周期与组合式（4）— 均已对齐 ✓

### 04-组件通信（6）— 均已对齐 ✓

### 05-插槽与组件形态（2）— 均已对齐 ✓

### 06-内置组件（4）— 均已对齐 ✓

### 07-路由状态工程化（8）

- `apps/vue3/src/07-路由状态工程化/01-Vue-Router-4核心面试点.html` ✓
- `apps/vue3/src/07-路由状态工程化/02-Pinia核心面试点.html` ✓
- `apps/vue3/src/07-路由状态工程化/03-工程化与组合式组织.html` ✓
- `apps/vue3/src/07-路由状态工程化/04-Vite工程化面试点.html` ✓
- `apps/vue3/src/07-路由状态工程化/05-script-setup编译宏.html` ✓
- `apps/vue3/src/07-路由状态工程化/06-Router与Pinia可运行示例.html` ✓
- `apps/vue3/src/07-路由状态工程化/07-Vitest单元测试面试点.html` ✓
- `apps/vue3/src/07-路由状态工程化/08-路由懒加载可运行示例.html` ✓

### 08-原理与性能面试（6）

- `apps/vue3/src/08-原理与性能面试/01-Proxy响应式原理.html` ✓
- `apps/vue3/src/08-原理与性能面试/02-虚拟DOM-diff-key.html` ✓
- `apps/vue3/src/08-原理与性能面试/03-调度器与nextTick.html` ✓
- `apps/vue3/src/08-原理与性能面试/04-Vue2与Vue3差异.html` ✓
- `apps/vue3/src/08-原理与性能面试/05-性能优化.html` ✓
- `apps/vue3/src/08-原理与性能面试/06-综合复习.html` ✓
