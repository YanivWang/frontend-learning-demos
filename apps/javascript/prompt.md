# 任务：批量升级 `apps/javascript/` 下所有 JavaScript Demo 页

你是本仓库的前端学习 Demo 维护者。请按**与标杆一致的质量标准**，对 `apps/javascript/` 目录下**全部 `.html` demo 页**（共 129 个）进行内容修复、补全与增强。

**质量标杆（改造前必须先读结构，改造时对齐写法）：**

| 标杆 | 路径 | 适用场景 |
|------|------|----------|
| 基础语法 + 副作用清理 | `apps/javascript/01-基础/变量.html` | TDZ、try/catch、const 绑定、global 污染清理 |
| 纯 Console + 面试陷阱可验证 | `apps/javascript/01-基础/数组方法.html` | NOTES↔SCRIPT 一一对应、分段注释、MDN 精确用语、gap 补全 |

**规范来源：** 根目录 `CONVENTIONS.md` §4；本文件 §十二 为完整待改清单。

**与 AI 沟通：** 新对话中 `@apps/javascript/prompt.md` `@CONVENTIONS.md` 及上述两个标杆文件，再粘贴 §十一「开始执行」或 §十「续跑指令」。

---

## 零、每个文件的标准工作流（禁止跳过）

对**每一个** `.html` 文件，严格按顺序执行：

1. **读取**当前文件全文，判断 demo 类型（纯 console / DOM 交互 / 浏览器 API / Canvas / 手写面试）。
2. **查权威来源**（必须先查再写，禁止凭记忆）：
   - 首选 [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
   - 次选 ECMAScript 规范（经 MDN 规范链接）
   - 同主题 sibling demo 作分工参考（如 `变量.html` vs `变量进阶.html`）
3. **Gap 分析**（动手改之前明确）：
   - 与 MDN 冲突的错误/过时表述
   - NOTES / 头注释 `要点` / `面试` 写了但 SCRIPT / PAGE_DOM **没有**的演示
   - SCRIPT 有但 NOTES **没解释**的核心机制
   - 面试题无法在页面内验证的
4. **直接修改文件**（不要只写分析报告不改文件）。
5. **单文件自检**（改完必过，见 §八）。

---

## 一、必须遵守的仓库规范

1. 严格遵循根目录 `CONVENTIONS.md` §4（元数据头注释、页面骨架、复习区写作规范）。
2. `<head>` 必须引入（路径按实际层级调整）：
   - `packages/shared/demo-notes.css`
   - `packages/shared/demo-shell.css`
3. JavaScript demo 页面骨架顺序：

   ```
   body.demo-page
   ├── <!-- NOTES_START --> ~ <!-- NOTES_END -->       复习区（必须有）
   ├── <!-- PAGE_DOM_START --> ~ <!-- PAGE_DOM_END -->  演示区（按类型，见 §三）
   ├── <!-- SCRIPT_START --> ~ <!-- SCRIPT_END -->     核心逻辑（必须有）
   └── <!-- NAV_START --> ~ <!-- NAV_END -->           页脚导航
   ```

4. **最小改动原则**：只改与「内容正确性、演示完整性、学习/面试价值」相关的部分；不重排无关代码、不引入新 npm 依赖、不重构 demo 核心逻辑。
5. **不要 git commit**，除非我明确要求。
6. 最终回复使用中文。

---

## 二、权威来源要求（硬性）

所有知识点、面试答法、演示行为必须**先查权威来源再写**，禁止凭记忆或口语化说法：

- **首选**：[MDN JavaScript 文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- **次选**：ECMAScript 规范（通过 MDN 规范链接跳转）
- **仓库内**：`CONVENTIONS.md`、同主题 sibling demo

具体要求：

- 禁止使用无出处的称谓或过时说法；与 MDN 冲突时以 MDN 为准修正。
- 参考资料链接必须**直接支撑**正文关键结论，禁止凑弱相关链接。
- **铁律：NOTES / 头注释 `要点` / `面试` 里写的机制，必须在 SCRIPT 或 PAGE_DOM 中能验证。**
  - 面试陷阱（如 `map(parseInt)`、`includes` vs `indexOf(NaN)`）→ SCRIPT 必须有 `console.log` 或 PAGE_DOM 可观察输出。
  - 头注释列出的 API / 行为（如 push/pop、toSorted）→ SCRIPT 必须有对应分段。
  - 无法在本页运行（需 HTTPS、用户手势、真实网络、Service Worker 等）→ NOTES 标明「需人工在浏览器验证」并说明原因，**禁止写虚假结论**。
- 批量脚本 `transform:all-demos` / `format:all-demos` **禁止**用来覆盖你已人工核对过的正文。

**常见必须修正的表述**（以 MDN 为准）：

- `var` 不只「函数作用域」，脚本顶层是全局作用域
- 类型说「7 primitive + Object」，不说「引用类型 1 种」
- `const` 是 binding 不可重新赋值，对象属性仍可改
- `undefined` 不只「未赋值」，还包括缺省返回、不存在属性等
- `typeof null === 'object'` 是历史遗留，不是「null 是对象」
- TDZ 内 `typeof` 也会 ReferenceError
- primitive 的 `.constructor` 经自动装箱，不宜做类型检测
- `sort()` 无 compareFn：元素转字符串后按 **UTF-16 码元** 比较（不说模糊的「Unicode 排序」）
- `includes` 用 **SameValueZero**；`indexOf` 用 **严格相等 `===`**，找不到 NaN
- `Set` 去重用 SameValueZero；`filter+indexOf` 因 indexOf 找不到 NaN，含 NaN 时结果不可靠

---

## 三、按四个区块逐项改造（每个 demo 都做）

### 1. 顶部元信息注释（`<!DOCTYPE>` 之前）

检查并补齐：

| 字段 | 要求 |
|------|------|
| `分类` | `javascript / 子目录路径` |
| `主题` | 一句话，与 `<h1>` 一致 |
| `要点` | 3～5 条，**必须对应当前 SCRIPT / PAGE_DOM 能演示的内容** |
| `面试` | 3～5 条，具体问句，禁止泛化模板（如「有什么应用场景？」） |
| `相关` | 同目录或上下游 demo，与页脚 NAV 一致 |
| 可选 | `难度`、`前置` |

**质量检查**：随机抽 1 条 `要点` 和 1 条 `面试`，在 SCRIPT / PAGE_DOM 里定位；找不到则删改要点或补代码。

### 2. NOTES 区

检查并修复：

- `<h1>` 与「主题」一致
- `p.hint` 引导语：
  - **纯 console demo**：`请打开 DevTools Console 查看输出。`
  - **有 PAGE_DOM 的 demo**：引导「看本复习区 + 下方演示区」；**禁止**写「见上方复习区」
- **知识点要点**：4～6 条 = 概念 + 行为 + 易错点 + 现代推荐写法
- **面试考点**：3～5 条，格式 `<strong>问句？</strong>` + 2～4 句（**先结论 → 原因 → 边界/项目场景**）
- **参考资料**：1～5 条 MDN 链接；窄 API 至少 1 条官方页

### 3. PAGE_DOM / 示例代码区

按 demo **类型**处理，不要强行统一：

| 类型 | 判断 | PAGE_DOM 要求 |
|------|------|---------------|
| **A. 纯 console** | 仅 `console.log`、无可见 UI | **可省略** PAGE_DOM；hint 引导 DevTools（对标 `数组方法.html`） |
| **B. DOM 交互** | 按钮、表单、手写题 UI | **必须有** PAGE_DOM；保留原有交互 |
| **C. 浏览器 API** | fetch、Observer、拖拽等 | **必须有** PAGE_DOM + 可操作 UI |
| **D. Canvas** | canvas 绑图 | 保留 canvas 区；必要时补说明 |
| **E. 面试手写** | `08-面试题/手写` | 保留输入/输出区；SCRIPT 可输出到 `#runtime-output` |

补全规则：

- 每个子 demo 有清晰 `<h2>` + `p.tip`（或 `.hint`）说明观察什么
- 脚本依赖的元素加稳定 `id` 或 `data-*`
- 必要时增加 `#runtime-output` 供非 console 输出
- **不破坏**已有可工作的演示效果

### 4. SCRIPT 区（核心改造）

每个 demo 的 `<!-- SCRIPT_START -->` ~ `<!-- SCRIPT_END -->` 必须：

#### 4.1 结构与注释（对标 `数组方法.html`）

```js
// ============ 1. 小节主题（与 NOTES 要点对应） ============
// 机制说明（中文）：演示什么、对应 MDN 哪个概念
console.log("标签:", 表达式); // 预期: ...
```

1. 用 `// ============ N. 主题 ============` 分段，**段号与 NOTES 要点 / 面试题对应**
2. **核心逻辑必须写中文注释**，说明：演示什么机制、预期输出/行为、与 MDN 的对应关系
3. 行尾可加简短 `// 预期: ...` 注释

#### 4.2 演示完整性（gap 分析后补全）

NOTES / 面试里提到但脚本缺失的，**按主题补**（不要套模板）：

- 会抛错的演示 → `try/catch` 捕获并 `console.log(err.name, err.message)`，不要中断整页
- 污染 `globalThis` / `window` 的演示 → 演示后 `delete window.xxx` 清理
- 异步演示 → 用 `.then()` / `.catch()` 或 `async IIFE`，输出清晰
- 不可运行的危险代码 → 保留为注释并注明预期错误类型
- 现代不可变 API（`toSorted` / `toReversed` 等）→ 与原数组对比打印，证明未变异

#### 4.3 工程约束

- **不要**引入 `demo-log.js` 或新 npm 包
- 优先 plain `<script>`；已有 `type="module"` / `text/babel` 的保留原模式
- 页脚 NAV 里 file:// 目录修正脚本**保留在 NAV 区**，不要挪到 SCRIPT 区
- 需要 IIFE 时用 IIFE，避免不必要的全局污染
- 不要删除 demo 依赖的 `lib/`、`packages/shared/libs/` 引用

#### 4.4 标杆参照摘要

**`变量.html`：** 元信息与 SCRIPT 分段对应；TDZ / 隐式全局 try/catch + cleanup；const 绑定 vs 对象属性可变；var vs let 与 `window`。

**`数组方法.html`：** 纯 console 全分段注释；map vs forEach 返回值对比；`map(parseInt)` 可运行验证；push/pop 与 toSorted 对比；NaN 去重边界有输出。

---

## 四、执行策略（一次改完全部）

### 步骤

1. **扫描清单**：按本文 §十二，或 `find apps/javascript -name '*.html' | sort`，从 `01-基础` → `09-Canvas` 顺序处理。
2. **逐个文件**：遵循 §零 工作流；自检 **NOTES ↔ PAGE_DOM ↔ SCRIPT 三者一致**。
3. **同主题去重**：相邻 demo 分工明确——基础页讲概念 + 可运行验证，进阶页讲边界 + 经典题；避免两篇写同一段 SCRIPT。
4. **分批节奏**：每轮处理 **15～25 个文件**；未完成用 §十 续跑。
5. **批量完成后**：
   - 运行 `npm run validate`
   - 抽样打开 5～8 个改过的页面（含 1 纯 console、1 DOM、1 异步、1 浏览器 API）验证 Console 无报错

### 交付汇总表（每轮结束必须给出）

| 文件路径 | 主要修复 | 新增/增强演示 | 参考 MDN |
|---------|---------|--------------|---------|

另附：

- **本批已改数 / 剩余数**
- **已完成标杆（跳过或仅一致性检查）**：`变量.html`、`数组方法.html`
- **未改动文件及原因**
- **需人工浏览器验证的文件**（网络、权限、Service Worker、Notification 等）

---

## 五、各分类侧重点

| 目录 | 侧重点 |
|------|--------|
| `01-基础/` | 语法准确、console 可验证、与 sibling demo 分工 |
| `02-函数与作用域/` | 作用域链、this、闭包、柯里化；闭包题注明内存泄漏边界 |
| `03-对象与原型/` | 原型链、`[[Prototype]]` 表述对齐 MDN；constructor / new 语义准确 |
| `04-ES6+/` | class、Promise、generator、模块；异步顺序与事件循环表述准确 |
| `05-元编程/` | Proxy / defineProperty 行为与 trap 默认值；说明性能与可读性代价 |
| `06-浏览器API/` | PAGE_DOM 必完整；标注权限 / HTTPS / file:// 限制 |
| `07-进阶/` | 安全、GC、深拷贝、UMD 等标注工程场景与局限 |
| `08-面试题/` | 手写实现可读；输出与 NOTES 标准答法一致 |
| `09-Canvas/` | 保留动画效果；NOTES 讲 API 用法而非只描述视觉效果 |

---

## 六、禁止事项

- 不要给所有 demo 套同一套模板化面试答案
- 不要删除已有可工作的演示效果
- 不要修改 `manifest.json`（由脚本生成）
- 不要修改 `packages/shared/` 除非 demo 确实无法引用现有资源
- 不要一次性大重构整个目录结构
- 不要在 NOTES 写「详见上方」类错误引导
- 不要「只评估不改文件」

---

## 七、单文件改造自检清单（改完必过）

- [ ] 头注释 `要点` / `面试` 与 `<h1>`、SCRIPT 分段一致
- [ ] 每条知识点要点能在 SCRIPT 或 PAGE_DOM 找到依据
- [ ] 每条面试考点能在 SCRIPT / PAGE_DOM 验证，或已标注需人工验证
- [ ] 面试答法与 MDN 一致，无口语化/过时说法
- [ ] SCRIPT 有 `// ============ N.` 分段 + 核心中文注释
- [ ] 会抛错的代码已 try/catch 或注释并标明错误类型
- [ ] 无多余 global 污染（或已 cleanup）
- [ ] `p.hint` 与 demo 类型匹配（console vs 可视化）
- [ ] 参考资料链接有效且与正文强相关
- [ ] NAV 链接与同目录 demo 衔接合理

---

## 八、标杆参考（改造前必读）

### `apps/javascript/01-基础/变量.html`

- MDN 对齐的 NOTES（含常见易错表述修正）
- 头注释 `要点` / `面试` 与 SCRIPT 分段一一对应
- TDZ / 隐式全局用 try/catch，global 污染演示后 cleanup
- const 绑定 vs 对象属性可变的 runnable 验证
- 顶层 var vs let 与 `window` / `globalThis` 对比

### `apps/javascript/01-基础/数组方法.html`

- 纯 console：NOTES 每条要点在 SCRIPT 有段号对应
- `map` vs `forEach` 返回值、`map(parseInt)` 陷阱均有 `console.log`
- 变异方法（push/pop/sort）与不可变 API（toSorted）对比演示
- `includes` / `indexOf` 对 NaN 的差异；Set vs filter+indexOf 去重边界
- 参考资料与正文结论一一对应

---

## 九、快速启动（复制到新对话）

```
@apps/javascript/prompt.md
@CONVENTIONS.md
@apps/javascript/01-基础/变量.html
@apps/javascript/01-基础/数组方法.html

按 prompt.md 批量升级 apps/javascript/ 下全部 demo。
从 01-基础/ 开始，跳过已完成的 变量.html、数组方法.html。
本批先处理 20 个文件：遵循 §零 工作流，直接改文件，不要只分析。
完成后给汇总表（§四 格式）并注明剩余数量。不要 git commit。
```

---

## 十、续跑指令（对话中断时使用）

```
@apps/javascript/prompt.md
@CONVENTIONS.md
@apps/javascript/01-基础/变量.html
@apps/javascript/01-基础/数组方法.html

继续批量升级 apps/javascript/，从 `[上次最后一个文件路径]` 的下一个文件开始。
标准不变：MDN 权威、§零 工作流、四区块对齐、SCRIPT 分段+中文注释、面试题必须可验证。
本批再处理 20 个文件，直接改文件，完成后给汇总表并注明剩余数量。不要 git commit。
```

---

## 十一、开始执行

1. 从 `01-基础/` 开始（**跳过**已完成的 `变量.html`、`数组方法.html`）
2. 按 §十二 清单顺序逐个修改，**不要**只分析不写文件
3. 每轮处理 **15～25 个**文件；未完成则用 §十 续跑
4. 全部完成后运行 `npm run validate` 并给出 §四 汇总表

**若用户未指定范围，默认：先处理第一批 20 个文件。**

---

## 十二、待改文件清单（共 129 个）

### 01-基础（26）

- `apps/javascript/01-基础/变量.html`（**已完成**，跳过或仅做一致性检查）
- `apps/javascript/01-基础/数组方法.html`（**已完成**，跳过或仅做一致性检查）
- `apps/javascript/01-基础/变量进阶.html`
- `apps/javascript/01-基础/typeof.html`
- `apps/javascript/01-基础/函数.html`
- `apps/javascript/01-基础/函数进阶.html`
- `apps/javascript/01-基础/箭头函数.html`
- `apps/javascript/01-基础/arguments.html`
- `apps/javascript/01-基础/IIFE.html`
- `apps/javascript/01-基础/严格模式.html`
- `apps/javascript/01-基础/运算符.html`
- `apps/javascript/01-基础/类型转换.html`
- `apps/javascript/01-基础/字符串方法.html`
- `apps/javascript/01-基础/JSON.html`
- `apps/javascript/01-基础/Date.html`
- `apps/javascript/01-基础/parseInt.html`
- `apps/javascript/01-基础/symbol.html`
- `apps/javascript/01-基础/unicode.html`
- `apps/javascript/01-基础/unicode-字符等价性.html`
- `apps/javascript/01-基础/encode-URI编码.html`
- `apps/javascript/01-基础/escape.html`
- `apps/javascript/01-基础/eval与Global.html`
- `apps/javascript/01-基础/正则/01-正则-URL路径匹配.html`
- `apps/javascript/01-基础/正则/02-正则-URL与图片格式.html`
- `apps/javascript/01-基础/正则/03-正则-全特性.html`
- `apps/javascript/01-基础/正则/04-正则-去标点.html`

### 02-函数与作用域（8）

- `apps/javascript/02-函数与作用域/01-作用域链.html`
- `apps/javascript/02-函数与作用域/02-柯里化.html`
- `apps/javascript/02-函数与作用域/this指向/01-this-动态绑定.html`
- `apps/javascript/02-函数与作用域/this指向/02-this-call-apply-bind.html`
- `apps/javascript/02-函数与作用域/this指向/03-this-new构造函数.html`
- `apps/javascript/02-函数与作用域/this指向/04-this-对象方法与脱离.html`
- `apps/javascript/02-函数与作用域/闭包/01-闭包-作用域链与变量提升.html`
- `apps/javascript/02-函数与作用域/闭包/02-闭包-内存泄漏与修复.html`

### 03-对象与原型（7）

- `apps/javascript/03-对象与原型/创建对象.html`
- `apps/javascript/03-对象与原型/构造函数.html`
- `apps/javascript/03-对象与原型/原型.html`
- `apps/javascript/03-对象与原型/原型链.html`
- `apps/javascript/03-对象与原型/原型属性vs实例属性.html`
- `apps/javascript/03-对象与原型/访问器.html`
- `apps/javascript/03-对象与原型/函数也是对象.html`

### 04-ES6+（26）

- `apps/javascript/04-ES6+/解构展开与模板字符串.html`
- `apps/javascript/04-ES6+/模块化/CommonJS-vs-ESM.html`
- `apps/javascript/04-ES6+/ES6模块/index.html`
- `apps/javascript/04-ES6+/集合/Set.html`
- `apps/javascript/04-ES6+/集合/Map.html`
- `apps/javascript/04-ES6+/集合/WeakSet.html`
- `apps/javascript/04-ES6+/集合/WeakMap.html`
- `apps/javascript/04-ES6+/class详解/class类声明.html`
- `apps/javascript/04-ES6+/class详解/class类表达式.html`
- `apps/javascript/04-ES6+/class详解/extends.html`
- `apps/javascript/04-ES6+/class详解/类与原型.html`
- `apps/javascript/04-ES6+/class详解/抽象基类.html`
- `apps/javascript/04-ES6+/class详解/私有构造函数.html`
- `apps/javascript/04-ES6+/class详解/class静态初始化块.html`
- `apps/javascript/04-ES6+/class详解/class静态初始化块extends.html`
- `apps/javascript/04-ES6+/异步/Promise/01-Promise-all并发与then串行.html`
- `apps/javascript/04-ES6+/异步/Promise/02-Promise-与事件循环.html`
- `apps/javascript/04-ES6+/异步/Promise/03-Promise-包装图片预加载.html`
- `apps/javascript/04-ES6+/异步/Promise/04-Promise-执行函数与状态机.html`
- `apps/javascript/04-ES6+/异步/Promise/05-Promise-串行三种写法.html`
- `apps/javascript/04-ES6+/异步/generator与async/01-generator-基础yield与next.html`
- `apps/javascript/04-ES6+/异步/generator与async/02-async-await-串行流程.html`
- `apps/javascript/04-ES6+/异步/generator与async/03-async-是generator语法糖.html`
- `apps/javascript/04-ES6+/异步/generator与async/04-async-错误重试机制.html`
- `apps/javascript/04-ES6+/异步/generator与async/05-async-await-表达式与异常.html`
- `apps/javascript/04-ES6+/异步/generator与async/06-async-声明形式与异常综合.html`

### 05-元编程（4）

- `apps/javascript/05-元编程/defineProperty.html`
- `apps/javascript/05-元编程/defineProperty访问器属性.html`
- `apps/javascript/05-元编程/proxy.html`
- `apps/javascript/05-元编程/代理的缺点.html`

### 06-浏览器API（31）

- `apps/javascript/06-浏览器API/DOM操作.html`
- `apps/javascript/06-浏览器API/fetch与跨域.html`
- `apps/javascript/06-浏览器API/HTTP缓存.html`
- `apps/javascript/06-浏览器API/ImportMaps.html`
- `apps/javascript/06-浏览器API/IntersectionObserver.html`
- `apps/javascript/06-浏览器API/MutationObserver.html`
- `apps/javascript/06-浏览器API/Notification.html`
- `apps/javascript/06-浏览器API/Performance-API.html`
- `apps/javascript/06-浏览器API/requestAnimation.html`
- `apps/javascript/06-浏览器API/ServiceWorker.html`
- `apps/javascript/06-浏览器API/WebComponents.html`
- `apps/javascript/06-浏览器API/WebSocket.html`
- `apps/javascript/06-浏览器API/剪贴板.html`
- `apps/javascript/06-浏览器API/浏览器渲染与性能.html`
- `apps/javascript/06-浏览器API/BOM/hash.html`
- `apps/javascript/06-浏览器API/BOM/history.html`
- `apps/javascript/06-浏览器API/事件模型/01-事件循环.html`
- `apps/javascript/06-浏览器API/事件模型/02-dom事件-冒泡捕获委托.html`
- `apps/javascript/06-浏览器API/事件模型/03-Node与浏览器事件循环对比.html`
- `apps/javascript/06-浏览器API/WebWorker/01-基础/01-Worker-基础与子脚本.html`
- `apps/javascript/06-浏览器API/WebWorker/02-命名与消息分发/01-Worker-命名与消息分发.html`
- `apps/javascript/06-浏览器API/存储/00-存储方案对比.html`
- `apps/javascript/06-浏览器API/存储/01-localforage-基础API.html`
- `apps/javascript/06-浏览器API/存储/02-获取已用容量.html`
- `apps/javascript/06-浏览器API/存储/03-获取剩余容量.html`
- `apps/javascript/06-浏览器API/存储/04-封装-获取存储容量.html`
- `apps/javascript/06-浏览器API/存储/05-测试最大容量.html`
- `apps/javascript/06-浏览器API/存储/06-存储文件-FileReader.html`
- `apps/javascript/06-浏览器API/拖曳手柄/01-贴边侧栏拖拽.html`
- `apps/javascript/06-浏览器API/拖曳手柄/02-悬浮侧栏拖拽.html`
- `apps/javascript/06-浏览器API/toolTips/index.html`

### 07-进阶（10）

- `apps/javascript/07-进阶/深拷贝.html`
- `apps/javascript/07-进阶/垃圾回收.html`
- `apps/javascript/07-进阶/无障碍-a11y.html`
- `apps/javascript/07-进阶/安全/XSS与CSRF.html`
- `apps/javascript/07-进阶/手写Promise/promiseAll.html`
- `apps/javascript/07-进阶/内存泄漏/index.html`
- `apps/javascript/07-进阶/内存泄漏/leakSuccess.html`
- `apps/javascript/07-进阶/内存泄漏/timeline.html`
- `apps/javascript/07-进阶/资源预加载/index.html`
- `apps/javascript/07-进阶/UMD插件模式/index.html`

### 08-面试题（15）

- `apps/javascript/08-面试题/防抖节流.html`
- `apps/javascript/08-面试题/加权随机.html`
- `apps/javascript/08-面试题/作用域/01-this指向与作用域链.html`
- `apps/javascript/08-面试题/作用域/02-嵌套作用域-返回值.html`
- `apps/javascript/08-面试题/作用域/03-嵌套作用域-返回函数.html`
- `apps/javascript/08-面试题/作用域/04-var重复声明.html`
- `apps/javascript/08-面试题/作用域/05-let-for循环闭包.html`
- `apps/javascript/08-面试题/作用域/06-var与function同名提升.html`
- `apps/javascript/08-面试题/手写/01-call-apply.html`
- `apps/javascript/08-面试题/手写/02-bind.html`
- `apps/javascript/08-面试题/手写/03-new.html`
- `apps/javascript/08-面试题/手写/04-instanceof.html`
- `apps/javascript/08-面试题/手写/05-Promise.html`
- `apps/javascript/08-面试题/手写/06-EventEmitter.html`
- `apps/javascript/08-面试题/手写/07-LRU缓存.html`

### 09-Canvas（2）

- `apps/javascript/09-Canvas/基础/index.html`
- `apps/javascript/09-Canvas/动画/firework.html`
