# 任务：批量升级 `apps/react19/` 下全部 React 19 Demo 页

你是本仓库的前端学习 Demo 维护者。请参照已完成的标杆页面
`apps/react19/src/01-基础语法/01-入门-createRoot与元素.html`，
对 `apps/react19/` 目录下**全部 11 个 `.html` demo 页**（含 `src/` 各子目录，不含 `libs/`）
进行内容审核、修复、补全与增强。

---

## 一、必须遵守的仓库规范

1. 严格遵循根目录 `CONVENTIONS.md` §4（元数据头注释、页面骨架、复习区写作规范）。
2. `<head>` 必须引入（路径按文件实际层级调整）：
   - `../../libs/react.development.js`
   - `../../libs/react-dom.development.js`
   - `../../libs/babel.min.js`（若 demo 使用 JSX）
   - `../../../../packages/shared/demo-notes.css`
   - `../../../../packages/shared/demo-shell.css`
3. React 19 demo 页面骨架顺序：

   ```
   body.demo-page
   ├── <!-- NOTES_START --> ~ <!-- NOTES_END -->       复习区（必须有）
   ├── <!-- PAGE_DOM_START --> ~ <!-- PAGE_DOM_END -->  #root 挂载区 / 交互 UI
   ├── <!-- SCRIPT_START --> ~ <!-- SCRIPT_END -->     核心逻辑（type="text/babel"）
   └── <!-- NAV_START --> ~ <!-- NAV_END -->           页脚导航 + file:// 目录修正脚本
   ```

4. **最小改动原则**：只改与「内容正确性、演示完整性、学习/面试价值、SCRIPT 核心注释」相关的部分；不重排无关代码、不引入新 npm 依赖、不改变 demo 核心教学主题。
5. **不要 git commit**，除非我明确要求。
6. 最终回复使用中文；按子目录分批汇报进度（见文末「执行方式」）。

---

## 二、权威来源要求（硬性）

所有知识点、面试答法、演示行为必须**先查权威来源再写**，禁止凭记忆或博客口径：

- **首选**：[react.dev](https://react.dev)（Reference / Learn / Blog）
- **React 19 专项**：
  - [React 19 发布公告](https://react.dev/blog/2024/12/05/react-19)
  - [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- **按主题查对应章节**（示例）：
  - 元素 / createRoot → [createElement](https://react.dev/reference/react/createElement)、[createRoot](https://react.dev/reference/react-dom/client/createRoot)、[Render and Commit](https://react.dev/learn/render-and-commit)
  - JSX → [Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)、[JavaScript in JSX](https://react.dev/learn/javascript-in-jsx-with-curly-braces)
  - 批处理 → [Queueing State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)、[flushSync](https://react.dev/reference/react-dom/flushSync)
  - Actions → [useActionState](https://react.dev/reference/react/useActionState)、[useFormStatus](https://react.dev/reference/react-dom/hooks/useFormStatus)
  - useOptimistic → [useOptimistic](https://react.dev/reference/react/useOptimistic)
  - use() → [use](https://react.dev/reference/react/use)
  - ref as prop → Upgrade Guide / React 19 Blog
  - Transitions → [useTransition](https://react.dev/reference/react/useTransition)、[useDeferredValue](https://react.dev/reference/react/useDeferredValue)
  - Error Boundary / RSC → react.dev 对应 Learn / Blog，**不臆造 RSC 运行时细节**
- **JSX 转译**：[Babel Transform React JSX](https://babeljs.io/docs/babel-plugin-transform-react-jsx)
- **仓库内**：`CONVENTIONS.md`、标杆 `01-入门-createRoot与元素.html`、同目录 sibling demo

具体要求：

- 与 react.dev 冲突时，**以 react.dev 为准**修正 NOTES / 头注释 / SCRIPT 注释。
- 参考资料链接必须**直接支撑**正文关键结论；每条链接对应 NOTES 中至少一个明确结论。
- **禁止**为凑数量添加弱相关链接；综合主题 2～6 条，窄 API 至少 1 条官方链接。
- **NOTES 写了的机制，PAGE_DOM 或 SCRIPT 必须能验证**（按钮交互、Console、UI 变化、SCRIPT 反面注释均可）。
- 若页面依赖 ESM CDN、需手动开服务器、或无法在本环境运行，在 `p.hint` 标注「需人工在浏览器验证」并说明原因。
- `npm run transform:all-demos` / `npm run format:all-demos` **禁止**用来覆盖你已人工核对过的学习正文。

---

## 三、按四个区块逐项改造（每个 demo 都做）

### 1. 顶部元信息注释（`<!DOCTYPE>` 之前）

检查并补齐：

| 字段   | 要求                                                                          |
| ------ | ----------------------------------------------------------------------------- |
| `分类` | `react19 / 子目录名`（如 `01-基础语法`、`02-面试题`）                         |
| `主题` | 一句话，与 NOTES 的 `<h1>` 一致                                               |
| `要点` | 3～6 条，**必须对应当前 SCRIPT / PAGE_DOM 能演示或注释说明的内容**            |
| `面试` | 3～6 条，**具体问句**；禁止模板化（如「核心概念是什么」「实际项目里怎么用」） |
| `相关` | 可选；同子目录上下游 demo，与页脚 NAV 链接一致                                |
| 可选   | `难度`、`前置`                                                                |

**质量检查**：随机抽一条 `要点`，在 SCRIPT / PAGE_DOM 里能找到对应代码或交互；找不到则删改要点或补演示。

### 2. NOTES 区

检查并修复：

- `<h1>` 与「主题」一致
- `p.hint`：**必须写清本页如何操作**
  - 有 `#root` 交互 demo：`请打开 DevTools Console 查看…；下方 #root 为 React 挂载/交互演示区。`
  - 纯表格/速记页：说明看页面哪一块、是否需要 Console
  - **禁止**空泛的「在浏览器中操作下方交互演示；复习要点与面试答法见上方区块」
  - **禁止**「见上方复习区」（复习区本来就在上方）
- **知识点要点**：4～7 条 = 概念 + 官方行为 + React 19 边界 + 常见坑
- **面试考点**：3～6 条，格式：
  - `<strong>具体问句？</strong>` + 2～4 句：**先结论 → 原因（引用官方机制）→ 项目边界**
- 头注释 `面试:` 的**每一条**必须在 NOTES「面试考点」有对应 Q&A（条数一致、问法一致）
- **参考资料**：2～6 条 react.dev 链接；React 19 新 API 加 Upgrade Guide / Blog；涉及 JSX 转译时加 Babel 文档

**React 19 常见需修正的表述**（以 react.dev 为准）：

| 易错说法                                          | 正确说法                                                                                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| JSX 一定转译为 `React.createElement`              | classic runtime → `createElement`；React 19 真实项目要求 automatic → `react/jsx-runtime` 的 `jsx()`；本仓库 demo 用浏览器 Babel 走 classic |
| state 变化后要从根再 `root.render`                | 启动时 `createRoot` + `root.render` 一次；后续靠 `setState` / `useState` 触发组件 **re-render** 返回新 JSX                                 |
| `ReactDOM.render` 仍可用                          | React 18 已废弃；**React 19 已移除**，必须 `createRoot`                                                                                    |
| `ReactDOM.hydrate` 仍可用                         | **React 19 已移除**，SSR 用 `hydrateRoot`                                                                                                  |
| React 19 仍提供官方 UMD                           | 官方已移除 UMD；真实项目用构建工具或 ESM CDN（如 esm.sh）；本仓库用本地运行时文件教学                                                      |
| `createRoot` 一调用就全面开启并发                 | `createRoot` 是新根 API 前提；并发/低优先级更新需 `startTransition`、`useDeferredValue` 等 **opt-in**                                      |
| `use()` 可以替代所有数据请求                      | 读取 Promise 需 `Suspense` + Error Boundary；事件触发请求、订阅、副作用仍常用事件处理或 `useEffect`                                        |
| ref as prop 后 `forwardRef` 立刻废弃              | React 19 允许 ref 作为 prop；**React 18 消费者仍依赖 `forwardRef`**，组件库需看最低支持版本                                                |
| Actions = 任意 async 函数                         | Actions 是表单 `action` / transition 内标准化异步更新流程；配合 `useActionState`、`useFormStatus`                                          |
| `useOptimistic` 会持久化乐观结果                  | 提交完成前临时 UI；失败或完成后需与真实 state 对齐                                                                                         |
| 小写 `<ele1 />` 会 ReferenceError                 | 等价 `createElement('ele1')`，渲染未知 HTML 标签，**不报错**                                                                               |
| `{ele1}` 未定义与小写标签是一回事                 | 花括号表达式求值时才 `ReferenceError`                                                                                                      |
| `root.render(App)` 与 `root.render(<App />)` 一样 | 前者传函数引用会报 _Functions are not valid as a React child_                                                                              |
| RSC 在纯 script 标签 demo 里可直接演示            | RSC 通常通过 Next.js 等框架落地；本仓库 UMD demo 只讲**概念边界**，不假装 runnable                                                         |

### 3. PAGE_DOM / 示例代码区

按 demo **类型**处理：

| 类型                | 判断                        | PAGE_DOM 要求                                         |
| ------------------- | --------------------------- | ----------------------------------------------------- |
| **A. 纯挂载**       | 仅 `#root`，交互在 React 内 | 保留 `<div id="root"></div>`                          |
| **B. React 内交互** | 按钮、表单在组件内          | `#root` 即可；hint 引导看页面 + Console               |
| **C. 对比/表格**    | 速记、面试对照表            | 保留表格/静态结构；复杂逻辑放 SCRIPT                  |
| **D. 概念边界**     | RSC、Server Components      | 保留讲解结构；NOTES 标明「概念向，非完整 RSC 运行时」 |

补全规则：

- 脚本依赖的元素 id 保持稳定
- **不破坏**已有可工作的演示效果
- `#root` 必须在 `<script type="text/babel">` 之前出现在 DOM 中
- `button` 建议加 `type="button"`

### 4. SCRIPT 区（核心改造，对标 `01-入门-createRoot与元素.html`）

每个 demo 的 `<!-- SCRIPT_START -->` ~ `<!-- SCRIPT_END -->` 必须：

#### 4.1 结构与注释

1. 用 `// ====== N. 主题 ======` 分段，**每段对应 NOTES 一个要点**
2. **核心逻辑必须写中文注释**，说明：
   - 这段演示什么 React 19 机制
   - 预期输出/页面行为是什么
   - 对应 react.dev 哪个概念
3. 关键行尾可加 `// 预期: ...`
4. 适合 Console 验证的 demo 补 `console.log`，输出带语义前缀

#### 4.2 演示完整性（gap 分析后补全）

NOTES / 面试里提到但脚本缺失的常见项，**按主题补**：

- 会抛错的演示 → 保留为注释并注明错误类型
- 批处理 / 闭包旧值 / pending → 用 `console.log` 或 render 计数证明
- 反面教材 → 注释块「取消注释可观察…」
- React 19 新 API → 最小可运行示例，不省略关键 prop（如 form `action`）
- Hook / API 边界 → 注释说明与 React 18 的差异

#### 4.3 React 19 工程约束

- 客户端入口统一 **`ReactDOM.createRoot` + `root.render`**，除非 demo 主题是对比旧 API（须注明 React 19 已移除）
- 保留 `type="text/babel"` 与现有 `../../libs/` 引用，不改为 Vite/Webpack
- 页脚 NAV 里 file:// 目录修正脚本**保留在 NAV 区**
- 不要引入 `demo-log.js` 或新 npm 包
- 不要修改 `apps/react19/libs/` 除非 demo 确实无法引用现有资源

#### 4.4 标杆参照（`01-入门-createRoot与元素.html`）

重点学习：

- 元信息 `要点` / `面试` 与 SCRIPT 分段一一对应
- NOTES 面试区覆盖头注释全部 `面试:` 条目
- `// ====== N. 主题 ======` + 中文机制注释 + 预期输出
- classic vs automatic JSX runtime 的边界说明
- state 更新 vs `root.render` 的准确表述
- 参考资料链到 react.dev 具体页面

---

## 四、执行策略（一次改完 11 个文件）

### 步骤

1. **扫描清单**：按本文 §九 文件清单顺序处理。
2. **逐个文件**：
   - 读取当前 html
   - **先查 react.dev** 对应 API / Learn / Upgrade Guide
   - 做四区块 gap 分析（错误表述 / 缺失演示 / NOTES↔SCRIPT 不一致 / 缺注释）
   - 直接修改文件
   - 自检：**头注释 ↔ NOTES ↔ SCRIPT 三者一致**
3. **同主题去重**：`01-基础语法` 与 `02-面试题` 分工明确，面试页偏答法汇总，基础语法页偏 runnable 演示。
4. **批量完成后**：
   - 运行 `npm run validate`（若可用）
   - 汇总表列出每个文件的改动

### 交付汇总表（Markdown）

| 文件路径 | 主要修复 | 新增/增强演示 | 参考 react.dev |
| -------- | -------- | ------------- | -------------- |

另附：

- **已完成标杆（跳过或仅一致性检查）**：`src/01-基础语法/01-入门-createRoot与元素.html`
- **未改动文件及原因**
- **需人工浏览器验证的文件**

---

## 五、各文件侧重点

| 文件                                           | 侧重点                                                           |
| ---------------------------------------------- | ---------------------------------------------------------------- |
| `01-入门-createRoot与元素.html`                | **标杆**，跳过或仅做一致性检查                                   |
| `02-JSX表达式与自动批处理.html`                | JSX 表达式、&& 短路 0、自动批处理、flushSync 边界                |
| `03-Actions与useActionState.html`              | form action、useActionState pending/result、与手写 useState 对比 |
| `04-useOptimistic乐观更新.html`                | 乐观 UI、提交失败回滚、与真实 state 对齐                         |
| `05-use读取Promise与Context.html`              | use(Promise/Context)、Suspense、Error Boundary 边界              |
| `06-ref作为prop传递.html`                      | ref as prop、与 forwardRef 的 React 18 兼容                      |
| `02-面试题/01-React19相对18变化速记.html`      | 变化对照表、升级检查清单                                         |
| `02-面试题/02-表单Action与useFormStatus.html`  | useFormStatus、父子表单提交状态                                  |
| `02-面试题/03-并发渲染与Transitions面试.html`  | useTransition、useDeferredValue、opt-in 并发                     |
| `02-面试题/04-错误边界与状态边界.html`         | Error Boundary、Suspense 与 use() 失败边界                       |
| `02-面试题/05-RSC与Server-Components边界.html` | RSC 概念、框架落地、本仓库 demo 边界                             |

---

## 六、禁止事项

- 不要给所有 demo 套同一套模板化面试答案
- 不要删除已有可工作的演示效果
- 不要修改 `manifest.json`（由脚本生成）
- 不要修改 `packages/shared/`、`apps/react19/libs/` 除非 demo 确实无法引用
- 不要一次性大重构整个目录结构
- 不要在 NOTES 写「详见上方」类错误引导
- 不要把 `apps/react18/` 的内容原样复制而不改 React 19 边界（render 移除、UMD、ref as prop 等）
- 不要在纯 UMD demo 里假装完整演示 RSC 运行时

---

## 七、单文件改造自检清单（改完必过）

- [ ] 头注释 `要点` / `面试` 与 `<h1>`、SCRIPT 分段一致
- [ ] 头注释每条 `面试:` 在 NOTES 面试区有对应 Q&A
- [ ] 每条知识点要点能在 SCRIPT 或 PAGE_DOM 找到依据
- [ ] 面试答法可在 react.dev 找到对应表述
- [ ] SCRIPT 有 `// ====== N. 主题 ======` 分段 + 核心中文注释
- [ ] 无「state 变化后再 root.render」类误导表述
- [ ] React 19 破坏性变化（render/hydrate/UMD 移除）表述准确
- [ ] `p.hint` 引导准确（Console + #root + 具体操作）
- [ ] 参考资料链接有效且与正文强相关
- [ ] NAV 上一篇/下一篇链接未被破坏

---

## 八、标杆与续跑

**标杆参考**：`apps/react19/src/01-基础语法/01-入门-createRoot与元素.html`

**续跑指令**（对话中断时在新对话粘贴）：

```
@apps/react19/prompt.md
@CONVENTIONS.md
@apps/react19/src/01-基础语法/01-入门-createRoot与元素.html

继续处理 apps/react19/，从 `[上次停下的文件路径]` 开始，
沿用同一标准，直到全部 11 个文件完成。
最后给出汇总表并运行 npm run validate。
```

---

## 九、待改文件清单（共 11 个）

- `src/01-基础语法/01-入门-createRoot与元素.html`（**已完成**，跳过或仅做一致性检查）
- `src/01-基础语法/02-JSX表达式与自动批处理.html`
- `src/01-基础语法/03-Actions与useActionState.html`
- `src/01-基础语法/04-useOptimistic乐观更新.html`
- `src/01-基础语法/05-use读取Promise与Context.html`
- `src/01-基础语法/06-ref作为prop传递.html`
- `src/02-面试题/01-React19相对18变化速记.html`
- `src/02-面试题/02-表单Action与useFormStatus.html`
- `src/02-面试题/03-并发渲染与Transitions面试.html`
- `src/02-面试题/04-错误边界与状态边界.html`
- `src/02-面试题/05-RSC与Server-Components边界.html`

---

## 十、开始执行

1. **跳过**已完成的 `01-入门-createRoot与元素.html`（或仅做一致性检查）
2. 从 `02-JSX表达式与自动批处理.html` 开始，按 §九 顺序逐个修改
3. **不要**只分析不写文件；本目录仅 11 个文件，建议一轮全部完成
4. 未完成则用 §八 续跑指令
5. 全部完成后运行 `npm run validate` 并给出汇总表

**一次性启动指令**（新对话粘贴）：

```
@apps/react19/prompt.md
@CONVENTIONS.md
@apps/react19/src/01-基础语法/01-入门-createRoot与元素.html

按 prompt.md 执行 §十，从 02 开始改完 apps/react19 下全部 demo。
```
