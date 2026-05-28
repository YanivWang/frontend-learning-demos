# 任务：批量升级 `apps/typescript/` 下所有 TypeScript Demo 页

你是本仓库的前端学习 Demo 维护者。请按**与标杆一致的质量标准**，对 `apps/typescript/` 目录下**全部 `.html` demo 页**（共 18 个，含 `mini-project/index.html`）进行内容修复、补全与增强。

**质量标杆（改造前必须先读结构，改造时对齐写法）：**

| 标杆                         | 路径                                              | 适用场景                                                                              |
| ---------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 基础语法 + 编译期/运行时对照 | `apps/typescript/01-基础/01-类型注解与推断.html`  | TS 静态 `<pre>` + 等价 JS + `assert` 输出、strictNullChecks 对比、SCRIPT 分段中文注释 |
| interface/type + JSDoc 形状  | `apps/typescript/01-基础/02-interface与type.html` | `@typedef` 表达 TS 类型、DOM 渲染验证                                                 |
| 交互 + 可辨识联合            | `apps/typescript/02-进阶/01-类型收窄.html`        | 按钮触发 + `#log`、保留原有交互                                                       |

**规范来源：** 根目录 `CONVENTIONS.md` §4；本文件 §十二 为完整待改清单。

**与 AI 沟通：** 新对话中 `@apps/typescript/prompt.md` `@CONVENTIONS.md` 及上述标杆文件，再粘贴 §十一「开始执行」或 §十「续跑指令」。

---

## 零、每个文件的标准工作流（禁止跳过）

对**每一个** `.html` 文件，严格按顺序执行：

1. **读取**当前文件全文，判断 demo 类型（见 §三 类型表）。
2. **查权威来源**（必须先查再写，禁止凭记忆）：
   - **首选** [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)（Everyday Types、Narrowing、Generics、Modules 等对应章节）
   - **次选** [TSConfig Reference](https://www.typescriptlang.org/tsconfig/)、[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html)（如 unknown、const type parameters）
   - **运行时行为**（仅当演示「TS 能拦、JS 仍会执行」时）： [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
   - **同主题 sibling demo** 作分工参考（如 `01-类型注解与推断.html` vs `02-interface与type.html`）
3. **Gap 分析**（动手改之前明确）：
   - 与 TypeScript 官方文档冲突的错误/过时表述
   - NOTES / 头注释 `要点` / `面试` 写了但 PAGE_DOM / SCRIPT **没有**的演示
   - PAGE_DOM 的 TS 示例与 SCRIPT 的 JS 等价代码**不对齐**
   - SCRIPT 有但 NOTES **没解释**的核心机制
   - 面试题无法在页面内验证的
   - 布局引导语错误（如写「左侧」实际是上下布局）
4. **直接修改文件**（不要只写分析报告不改文件）。
5. **单文件自检**（改完必过，见 §八）。

---

## 一、必须遵守的仓库规范

1. 严格遵循根目录 `CONVENTIONS.md` §4（元数据头注释、页面骨架、复习区写作规范）。
2. `<head>` 必须引入（路径按实际层级调整）：
   - `packages/shared/demo-notes.css`
   - `packages/shared/demo-shell.css`
3. TypeScript demo 页面骨架顺序：

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

所有知识点、面试答法、演示行为必须**先查 TypeScript 官方文档再写**，禁止凭记忆或口语化说法：

- **类型系统、语法、配置**： [typescriptlang.org](https://www.typescriptlang.org/docs/) Handbook / TSConfig / Release Notes
- **JavaScript 运行时语义**（`+` 拼接、null/undefined、`typeof` 等）：MDN，且仅用于解释「编译后擦除类型」的对照
- **仓库内**：`CONVENTIONS.md`、同主题 sibling demo

具体要求：

- 禁止使用无出处的称谓或过时说法；与 Handbook 冲突时以官方文档为准修正。
- 参考资料链接必须**直接支撑**正文关键结论（Handbook 章节、TSConfig 项、Release Notes），禁止凑弱相关链接。
- **铁律：NOTES / 头注释 `要点` / `面试` 里写的机制，必须在 SCRIPT 或 PAGE_DOM 中能验证。**
  - 编译期错误（如参数类型不匹配）→ PAGE_DOM 的 TS `<pre>` 用注释标 `❌ 编译错误`；SCRIPT 用等价 JS **实际跑通**错误路径并 `assert` 说明「TS 可拦、JS 仍会执行」。
  - 类型收窄、联合、泛型、Utility Types → SCRIPT 必须有对应分段与断言/输出。
  - 无法在本页运行（需真实 `tsc`、完整 Vue/React 工程、node_modules）→ NOTES 标明「需 IDE/tsc 或完整工程验证」并说明原因，**禁止写虚假结论**。
- 批量脚本 `transform:all-demos` / `format:all-demos` **禁止**用来覆盖你已人工核对过的正文。

**常见必须修正的表述**（以 TypeScript Handbook 为准）：

- TypeScript 类型在编译后**擦除**，不改变 JS 运行时（The Basics — Erased Types）
- `string` / `number` / `boolean` 是**常用**原始类型；`bigint` / `symbol` 是 **Less Common Primitives**，不宜与前三者并列称「最常见」
- `strictNullChecks` **默认关闭**；开启后 `null` / `undefined` 不能随意赋给普通类型，须联合类型 + 判空
- `any` 会关闭后续检查；`unknown` 是 type-safe 的 any，使用前必须收窄（TS 3.0 Release Notes）
- 局部变量优先推断；函数参数、公共 API 边界宜显式注解（Everyday Types）
- `interface` 声明对象形状、支持声明合并；`type` 是类型别名，可表达联合/交叉/条件类型（Handbook — Interfaces / Type Aliases）
- `enum` 会生成运行时 JS，与 `as const` 对象枚举语义不同（Handbook — Enums）
- `tsc --noEmit` 只做类型检查；类型检查与 emit 可分离（The Basics — tsc）
- JSDoc（`@type` / `@typedef` / `@param`）在纯 HTML 内联 script 中**不会**被浏览器强制执行，须注明依赖 `tsc` / IDE / `checkJs`

---

## 三、按四个区块逐项改造（每个 demo 都做）

### 1. 顶部元信息注释（`<!DOCTYPE>` 之前）

检查并补齐：

| 字段   | 要求                                                     |
| ------ | -------------------------------------------------------- |
| `分类` | `typescript / 子目录路径`                                |
| `主题` | 一句话，与 `<h1>` 一致                                   |
| `要点` | 3～5 条，**必须对应当前 PAGE_DOM / SCRIPT 能演示的内容** |
| `面试` | 3～5 条，具体问句，禁止泛化模板                          |
| `相关` | 同目录或上下游 demo，与页脚 NAV 一致                     |
| 可选   | `难度`、`前置`                                           |

**质量检查**：随机抽 1 条 `要点` 和 1 条 `面试`，在 SCRIPT / PAGE_DOM 里定位；找不到则删改要点或补代码。

### 2. NOTES 区

检查并修复：

- `<h1>` 与「主题」一致
- `p.hint` 引导语：
  - **有 PAGE_DOM + `#log` / 可视化输出**：`在浏览器中打开本页，结合下方演示区观察效果；要点与面试答法见上方复习区。`
  - **纯配置展示 / 需 IDE**：说明看复习区 + 下方示例，并注明哪些须 `tsc`/IDE 验证
  - **禁止**写「见上方复习区」当复习区在 hint 上方时（应写「见本复习区」或「见上方复习区」仅当 hint 在演示区下方——本仓库 NOTES 在上方，hint 内写「见上方复习区」可接受，但**禁止**写错误的方位如「左侧源码」）
- **知识点要点**：4～6 条 = 概念 + 编译期行为 + 运行时边界 + 易错点
- **面试考点**：3～5 条，格式 `<strong>问句？</strong>` + 2～4 句（**先结论 → 原因 → 边界/项目场景**）
- **参考资料**：1～5 条 **typescriptlang.org** 官方链接；涉及配置时含 TSConfig 项

### 3. PAGE_DOM / 示例代码区

按 demo **类型**处理，不要强行统一：

| 类型                      | 判断                         | PAGE_DOM 要求                                                                                            |
| ------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------- |
| **A. TS 静态 + JS 断言**  | 上方 `<pre>` TS，下方 `#log` | TS 块用 `// —— 小节 ——` 分段；编译错误写注释 `// ❌ 编译错误`；引导语写「**上方** TS，**下方** JS 输出」 |
| **B. TS 静态 + DOM 交互** | 按钮、表单、手写题           | 保留 TS `<pre>` + 交互 UI；说明点击后观察什么                                                            |
| **C. 配置/工程**          | tsconfig、模块声明           | 展示 JSON/声明片段 + `#out` 或说明文字；标注须 CLI 验证的项                                              |
| **D. 框架类型**           | Vue3/React props、emits      | 保留 TS 类型片段 + 最小可运行示例；无法单页跑通的标注边界                                                |
| **E. 手写练习**           | Utility Types 练习           | 保留输入/输出区；SCRIPT 可输出到 `#log` 或 `#out`                                                        |
| **F. mini-project**       | `mini-project/index.html`    | 按子页面实际结构，仍须四区块对齐                                                                         |

补全规则：

- TS `<pre>` 与 SCRIPT 变量/函数**一一对应**（名称、逻辑、分段主题一致）
- 每个子 demo 有清晰说明（`<p>` / `p.tip` / 分段注释）观察什么
- 脚本依赖的元素加稳定 `id`（如 `#log`、`#out`、`#app`）
- **不破坏**已有可工作的演示效果

### 4. SCRIPT 区（核心改造）

每个 demo 的 `<!-- SCRIPT_START -->` ~ `<!-- SCRIPT_END -->` 必须：

#### 4.1 结构与注释（对标 `01-类型注解与推断.html`）

```js
// ============ 1. 小节主题（与 NOTES 要点 / TS pre 分段对应） ============
// 机制说明（中文）：TS 侧意图、运行时实际行为、与 Handbook 哪个概念对应
let x = ...; // TS 侧：SomeType
```

1. 用 `// ============ N. 主题 ============` 分段，**段号与 NOTES 要点 / PAGE_DOM TS 分段 / 面试题对应**
2. **核心逻辑必须写中文注释**，说明：TS 编译期意图、运行时 JS 行为、预期 assert 结果
3. 使用 JSDoc（`@type`、`@typedef`、`@param`）时注释说明：**浏览器不执行类型检查，依赖 tsc/IDE**
4. 行尾或 assert 消息可加 `（TS 可… / JS 仍会…）` 对照

#### 4.2 演示完整性（gap 分析后补全）

NOTES / 面试里提到但脚本缺失的，**按主题补**（不要套模板）：

- **编译期 vs 运行时**：至少 1 处「TS 注释标编译错误 + JS assert 跑通错误语义」（如 `add("1", 2)`）
- **strict / null / undefined**：若 NOTES 提到 strictNullChecks，SCRIPT 须体现 null vs undefined 运行时差异或联合类型注释
- **类型收窄**：`typeof` / `in` / `instanceof` / 用户守卫函数，assert 分支结果
- **可辨识联合 + never 穷尽**：switch 各分支 + 可选 default 的 never 说明（进阶页）
- **泛型 / 条件类型 / infer**：用 JS 模拟等价数据结构 + assert，或注释说明仅 tsc 可验证的部分
- **enum vs const 对象**：若 NOTES 对比，SCRIPT 须展示运行时差异（enum 有反向映射等）
- 会抛错的演示 → `try/catch` 并 `assert` 或写入 `#log`，不要中断整页

#### 4.3 输出方式（择一，与现有页面一致）

- **`assert` + `#log`**（推荐，对标 `01-类型注解与推断.html`）：

  ```js
  const lines = [];
  const assert = (cond, msg) => lines.push((cond ? '✓ ' : '✗ ') + msg);
  // ... assert(...)
  document.getElementById('log').textContent = lines.join('\n');
  ```

- **`console.log`**：纯 console demo 可用，hint 引导 DevTools
- **DOM 写入**：`#app`、`#out` 等，保留原有模式

改完后在 Node 或浏览器验证：**所有 assert 条件为 true**（可抽核心逻辑用 `node -e` 快速验）。

#### 4.4 工程约束

- **不要**引入新 npm 包；不要要求本页运行 `tsc`（除非 demo 主题就是 tsconfig CLI）
- 浏览器不能直接跑 `.ts`：用 **JS + JSDoc** 或 **注释对照** 表达 TS 意图
- 页脚 NAV 里 file:// 目录修正脚本**保留在 NAV 区**
- 不要删除 demo 依赖的 `libs/`、`packages/shared/` 引用
- Vue/React 类型 demo：保持最小示例，不搭建完整工程

---

## 四、执行策略（一次改完全部）

### 步骤

1. **扫描清单**：按本文 §十二，或 `find apps/typescript -name '*.html' | sort`，从 `01-基础` → `03-工程与框架` → `mini-project` 顺序处理。
2. **逐个文件**：遵循 §零 工作流；自检 **NOTES ↔ PAGE_DOM（TS） ↔ SCRIPT（JS）三者一致**。
3. **同主题去重**：相邻 demo 分工明确——基础页讲概念 + 可运行对照，进阶页讲边界 + 面试题；避免两篇重复同一段 assert。
4. **本任务默认一次改完**：共 18 个文件；若上下文不足，每轮至少 **6～8 个**文件，未完成用 §十 续跑。
5. **全部完成后**：
   - 运行 `npm run validate`
   - 抽样打开 4～6 个改过的页面，确认 `#log` / `#out` 无 ✗、Console 无报错

### 交付汇总表（全部完成后必须给出）

| 文件路径 | 主要修复 | 新增/增强演示 | 参考官方文档 |
| -------- | -------- | ------------- | ------------ |

另附：

- **已改数 / 剩余数**
- **已完成标杆（跳过或仅一致性检查）**：`01-类型注解与推断.html`
- **未改动文件及原因**
- **需人工 IDE/tsc 验证的文件**

---

## 五、各分类侧重点

| 目录             | 侧重点                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------- |
| `01-基础/`       | 注解/推断、interface vs type、泛型、函数重载、元组/字面量、class、enum；编译期 vs 运行时对照 |
| `02-进阶/`       | 收窄、Utility Types、条件类型/infer、映射/模板字面量、never 穷尽；可辨识联合 + switch        |
| `03-工程与框架/` | tsconfig strict 各项、声明文件/模块、Vue/React 组件类型；标注 Bundler vs NodeNext            |
| `mini-project/`  | 综合串联；保持可打开，NOTES↔SCRIPT 一致                                                     |

---

## 六、禁止事项

- 不要给所有 demo 套同一套模板化面试答案
- 不要删除已有可工作的演示效果
- 不要修改 `manifest.json`（由脚本生成）
- 不要修改 `packages/shared/` 除非 demo 确实无法引用现有资源
- 不要一次性大重构整个目录结构
- 不要声称浏览器内联 script 会执行 TypeScript 类型检查
- 不要「只评估不改文件」
- 不要把 `bigint`/`symbol` 写成与 `string`/`number`/`boolean` 同级别的「最常见基本类型」（除非 PAGE_DOM 有完整示例且 NOTES 注明较少见）

---

## 七、单文件改造自检清单（改完必过）

- [ ] 头注释 `要点` / `面试` 与 `<h1>`、PAGE_DOM TS 分段、SCRIPT 分段一致
- [ ] 每条知识点要点能在 SCRIPT 或 PAGE_DOM 找到依据
- [ ] 每条面试考点能在 SCRIPT / PAGE_DOM 验证，或已标注需 IDE/tsc 验证
- [ ] 面试答法与 TypeScript Handbook / TSConfig 一致，无口语化/过时说法
- [ ] PAGE_DOM TS 示例与 SCRIPT JS 逻辑对齐（变量名、分段主题）
- [ ] SCRIPT 有 `// ============ N.` 分段 + 核心中文注释
- [ ] 涉及类型擦除/编译错误的 demo 有「TS 注释错误 + JS 实际运行」对照
- [ ] 所有 `assert` 为 ✓（或已说明预期 ✗ 的演示）
- [ ] `p.hint` 与 demo 类型匹配；无「左侧源码」等错误方位
- [ ] 参考资料为 typescriptlang.org 且与正文强相关
- [ ] NAV 链接与同目录 demo 衔接合理

---

## 八、标杆参考（改造前必读）

### `apps/typescript/01-基础/01-类型注解与推断.html`（**已完成**）

- 头注释 `要点` / `面试` 与 TS pre / SCRIPT 分段一一对应
- PAGE_DOM：TS 静态示例分段（注解/推断、strictNullChecks、bigint/symbol、any/unknown、函数类型）
- strictNullChecks **默认 off vs 开启 on** 在 NOTES 与 TS 注释中均有说明
- SCRIPT：`// ============ N.` + 中文注释 + JSDoc 说明 + 13 条 assert
- 编译期 vs 运行时：`add("1", 2)` TS 注释报错、JS assert 拼接为 `"12"`
- 参考资料：Handbook + TS 3.0 unknown + TSConfig strictNullChecks

### 其他页面对齐要点

- `02-interface与type.html`：`@typedef` + 交叉/联合；DOM 渲染验证
- `01-类型收窄.html`：按钮 + discriminated union；保留交互
- `01-tsconfig-strict配置.html`：配置项与 NOTES 逐条对应；CLI 项标注边界

---

## 九、快速启动（复制到新对话）

```
@apps/typescript/prompt.md
@CONVENTIONS.md
@apps/typescript/01-基础/01-类型注解与推断.html

按 prompt.md 批量升级 apps/typescript/ 下全部 demo（共 18 个 html）。
跳过已完成的 01-类型注解与推断.html，其余 17 个一次改完。
遵循 §零 工作流：先查 TypeScript 官方文档，直接改文件，不要只分析。
每个文件：四区块对齐、TS pre 与 SCRIPT 分段一致、SCRIPT 核心中文注释、面试题可验证。
完成后运行 npm run validate，给 §四 汇总表。不要 git commit。
```

---

## 十、续跑指令（对话中断时使用）

```
@apps/typescript/prompt.md
@CONVENTIONS.md
@apps/typescript/01-基础/01-类型注解与推断.html

继续批量升级 apps/typescript/，从 `[上次最后一个文件路径]` 的下一个文件开始。
标准不变：TypeScript 官方文档权威、§零 工作流、四区块对齐、TS↔JS 对照、SCRIPT 分段+中文注释。
本批再处理剩余全部文件，直接改文件，完成后给汇总表并注明剩余数量。不要 git commit。
```

---

## 十一、开始执行

1. 从 `01-基础/02-interface与type.html` 开始（**跳过**已完成的 `01-类型注解与推断.html`）
2. 按 §十二 清单顺序逐个修改，**不要**只分析不写文件
3. **默认目标：一次对话改完剩余 17 个文件**；上下文不够则至少完成 6～8 个，再用 §十 续跑
4. 全部完成后运行 `npm run validate` 并给出 §四 汇总表

---

## 十二、待改文件清单（共 18 个）

### 01-基础（7）

- `apps/typescript/01-基础/01-类型注解与推断.html`（**已完成**，跳过或仅做一致性检查）
- `apps/typescript/01-基础/02-interface与type.html`
- `apps/typescript/01-基础/03-泛型基础.html`
- `apps/typescript/01-基础/04-函数类型与重载.html`
- `apps/typescript/01-基础/05-数组元组与字面量.html`
- `apps/typescript/01-基础/06-class与implements.html`
- `apps/typescript/01-基础/07-enum与对象枚举.html`

### 02-进阶（6）

- `apps/typescript/02-进阶/01-类型收窄.html`
- `apps/typescript/02-进阶/02-Utility-Types.html`
- `apps/typescript/02-进阶/03-条件类型与infer.html`
- `apps/typescript/02-进阶/04-映射类型与模板字面量.html`
- `apps/typescript/02-进阶/05-never与穷尽检查.html`
- `apps/typescript/02-进阶/06-手写Utility-Types练习.html`

### 03-工程与框架（4）

- `apps/typescript/03-工程与框架/01-tsconfig-strict配置.html`
- `apps/typescript/03-工程与框架/02-类型声明与模块.html`
- `apps/typescript/03-工程与框架/03-Vue3与React组件类型.html`
- `apps/typescript/03-工程与框架/04-React表单与Vue-emits类型.html`

### mini-project（1）

- `apps/typescript/mini-project/index.html`
