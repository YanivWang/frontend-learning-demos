# 任务：批量升级 `apps/react18/src/function-components/` 下全部 React Demo 页

你是本仓库的前端学习 Demo 维护者。请参照已完成的标杆页面
`apps/react18/src/function-components/01-入门-元素与渲染.html`，
对 `apps/react18/src/function-components/` 目录下**全部 35 个 `.html` demo 页**
进行内容修复、补全与增强。

---

## 一、必须遵守的仓库规范

1. 严格遵循根目录 `CONVENTIONS.md` §4（元数据头注释、页面骨架、复习区写作规范）。
2. `<head>` 必须引入（路径按实际层级调整）：
   - `../../libs/react.development.js`
   - `../../libs/react-dom.development.js`
   - `../../libs/babel.min.js`（若 demo 使用 JSX）
   - `../../../../packages/shared/demo-notes.css`
   - `../../../../packages/shared/demo-shell.css`
3. React demo 页面骨架顺序：

   ```
   body.demo-page
   ├── <!-- NOTES_START --> ~ <!-- NOTES_END -->       复习区（必须有）
   ├── <!-- PAGE_DOM_START --> ~ <!-- PAGE_DOM_END -->  #root 挂载区 / 交互 UI（按类型）
   ├── <!-- SCRIPT_START --> ~ <!-- SCRIPT_END -->     核心逻辑（type="text/babel"）
   └── <!-- NAV_START --> ~ <!-- NAV_END -->           页脚导航 + file:// 目录修正脚本
   ```

4. **最小改动原则**：只改与「内容正确性、演示完整性、学习/面试价值、注释可读性」相关的部分；不重排无关代码、不引入新 npm 依赖、不改变 demo 核心教学意图。
5. **不要 git commit**，除非我明确要求。
6. 最终回复使用中文。

---

## 二、权威来源要求（硬性）

所有知识点、面试答法、演示行为必须**先查权威来源再写**，禁止凭记忆或口语化说法：

- **首选**：[react.dev](https://react.dev)（Reference / Learn / Blog）
- **JSX 转译**：[Babel Transform React JSX](https://babeljs.io/docs/babel-plugin-transform-react-jsx)
- **仓库内**：`CONVENTIONS.md`、标杆 `01-入门-元素与渲染.html`、同主题 sibling demo

具体要求：

- 禁止使用无出处的称谓或过时说法；与 react.dev 冲突时以 react.dev 为准修正。
- 参考资料链接必须**直接支撑**正文关键结论，优先 react.dev 官方页，禁止凑弱相关链接。
- **NOTES 写了的机制，SCRIPT 或 PAGE_DOM 必须能验证**（Console 输出、UI 交互、注释中的反面教材均可）。
- 若 demo 依赖 Router / 外部 CDN / 需用户手势等无法在本环境验证，在 NOTES 标注「需人工在浏览器验证」并说明原因。
- 批量脚本 `transform:all-demos` / `format:all-demos` **禁止**用来覆盖你已人工核对过的正文。

---

## 三、按四个区块逐项改造（每个 demo 都做）

### 1. 顶部元信息注释（`<!DOCTYPE>` 之前）

检查并补齐：

| 字段 | 要求 |
|------|------|
| `分类` | `react18 / function-components` 或更细子主题（如 hooks、性能） |
| `主题` | 一句话，与 `<h1>` 一致 |
| `要点` | 3～6 条，**必须对应当前 SCRIPT 能演示的内容** |
| `面试` | 3～6 条，具体问句，禁止泛化模板（如「有什么应用场景？」） |
| `相关` | 同目录上下游 demo，与页脚 NAV 一致 |
| 可选 | `难度`、`前置` |

**质量检查**：随机抽一条 `要点`，在 SCRIPT / PAGE_DOM 里能找到对应代码；找不到则删改要点或补代码/注释。

### 2. NOTES 区

检查并修复：

- `<h1>` 与「主题」一致
- `p.hint` 引导语：
  - **有 #root 交互 demo**：`请打开 DevTools Console 查看…；下方 #root 为 React 挂载/交互演示区。`
  - **禁止**写「见上方复习区」（复习区在演示区上方，表述应准确）
- **知识点要点**：4～6 条 = 概念 + 行为 + 易错点 + React 18 推荐写法
- **面试考点**：3～6 条，格式 `<strong>问句？</strong>` + 2～4 句（**先结论 → 原因 → 边界/项目场景**）
- **参考资料**：2～6 条 react.dev 链接；涉及 JSX 转译时加 Babel 文档

**React 常见需修正的表述**（以 react.dev 为准）：

| 易错说法 | 正确说法 |
|---------|---------|
| JSX 一定转译为 `React.createElement` | classic runtime → `createElement`；现代工程 automatic → `react/jsx-runtime` 的 `jsx()`；本仓库 demo 用浏览器 Babel 走 classic |
| `createRoot` 一调用就全面开启并发 | `createRoot` 是 React 18 新根 API 前提；并发需 `startTransition` 等 **opt-in** |
| `ReactDOM.render` 仍推荐 | React 18 已废弃，会以 React 17 模式运行 |
| 小写 `<ele1 />` 会 ReferenceError | 等价 `createElement('ele1')`，渲染未知 HTML 标签，**不报错** |
| `{ele1}` 未定义与小写标签是一回事 | 花括号表达式求值时才 `ReferenceError` |
| `root.render(App)` 与 `root.render(<App />)` 一样 | 前者传函数引用会报 *Functions are not valid as a React child* |
| setState / useState 后立刻读到新值 | 当前 render 是快照；新值在下一次 render |
| 连续 `setCount(count+1)` 会加 3 | 同一次事件中读同一快照，通常只 +1；应函数式更新 |
| useEffect 等于 componentDidMount | 依赖数组决定运行时机；空数组才是 mount 后一次 |
| useMemo / useCallback 一定提升性能 | 有开销；仅在昂贵计算或稳定引用必要时使用 |
| Fiber / 虚拟 DOM 口语化瞎编 | 以 react.dev 批处理、协调、element 描述为准，不臆造内部实现细节 |

### 3. PAGE_DOM / 示例代码区

按 demo **类型**处理：

| 类型 | 判断 | PAGE_DOM 要求 |
|------|------|---------------|
| **A. 纯挂载** | 仅 `#root`，交互在 React 内 | 保留 `<div id="root"></div>`；复杂 demo 可在 root 外加说明性静态 HTML |
| **B. React 内交互** | 按钮、表单在组件内 | `#root` 即可；hint 引导看页面 + Console |
| **C. 对比演示** | 批处理、memo 对比等 | 保留原有 UI 结构；必要时补 label / 分区标题 |
| **D. 概念/面试向** | Router、Fiber 等偏讲解 | 保留现有结构；无法 runnable 的部分在 NOTES 标注 |

补全规则：

- 脚本依赖的元素 id 保持稳定
- **不破坏**已有可工作的演示效果
- `#root` 必须在 `<script type="text/babel">` 之前出现在 DOM 中

### 4. SCRIPT 区（核心改造，对标 `01-入门-元素与渲染.html`）

每个 demo 的 `<!-- SCRIPT_START -->` ~ `<!-- SCRIPT_END -->` 必须：

#### 4.1 结构与注释

1. 用 `// ====== N. 主题 ======` 分段，**每段对应 NOTES 一个要点**
2. **核心逻辑必须写中文注释**，说明：
   - 这段演示什么 React 机制
   - 预期输出/页面行为是什么
   - 对应 react.dev 哪个概念
3. 关键行尾可加 `// 预期: ...`
4. 适合 Console 验证的 demo 补 `console.log`，输出带语义前缀（如 `"App props:"`）

#### 4.2 演示完整性（gap 分析后补全）

NOTES / 面试里提到但脚本缺失的常见项，**按主题补**：

- 会抛错的演示 → 保留为注释并注明错误类型；或 `try/catch` + `console.log`
- 状态快照 / 批处理 / 闭包陷阱 → 用 `console.log` 证明「读到的仍是旧值」
- 反面教材 → 注释块说明「取消注释可观察…」，区分不同错误机制
- Hook 规则 / 依赖数组 → 注释说明为何某依赖不能省略

#### 4.3 React 工程约束

- 客户端入口统一 **`ReactDOM.createRoot` + `root.render`**，除非 demo 主题就是对比旧 API
- 保留 `type="text/babel"` 与现有 libs 引用，不改为 Vite/Webpack
- 页脚 NAV 里 file:// 目录修正脚本**保留在 NAV 区**，不要挪到 SCRIPT 区
- 不要引入 `demo-log.js` 或新 npm 包
- 不要删除 demo 依赖的 `../../libs/` 引用

#### 4.4 标杆参照（`01-入门-元素与渲染.html`）

重点学习：

- 元信息 `要点` / `面试` 与 SCRIPT 分段一一对应
- NOTES 面试区覆盖头注释全部 `面试:` 条目（条数一致）
- `// ====== N. 主题 ======` + 中文机制注释 + 预期输出
- 易混淆概念（如标签 vs 表达式、element vs DOM）在 NOTES 与 SCRIPT 表述一致
- 参考资料链到 react.dev 具体页面

---

## 四、执行策略（一次改完 35 个文件）

### 步骤

1. **扫描清单**：按本文 §十 文件清单，从 `01` → `34` 顺序处理。
2. **逐个文件**：
   - 读取当前 html
   - **先查 react.dev** 对应 API / Learn 页
   - 做四区块 gap 分析（列出：错误表述 / 缺失演示 / NOTES↔SCRIPT 不一致 / 缺注释）
   - 直接修改文件
   - 自检：**头注释 ↔ NOTES ↔ SCRIPT 三者一致**
3. **同主题去重**：相邻 demo 分工明确（如 `08-useState-异步合并` vs `12-Hooks-useState基础`），避免重复整段 SCRIPT。
4. **批量完成后**：
   - 运行 `npm run validate`
   - 汇总表列出每个文件的改动

### 交付汇总表（Markdown）

| 文件路径 | 主要修复 | 新增/增强演示 | 参考 react.dev |
|---------|---------|--------------|----------------|

另附：

- **已完成标杆（跳过或仅一致性检查）**：`01-入门-元素与渲染.html`
- **未改动文件及原因**
- **需人工浏览器验证的文件**

---

## 五、各文件侧重点（按编号）

| 编号范围 | 侧重点 |
|---------|--------|
| 01～04 | JSX、element、createRoot、组件、不可变更新 |
| 05～07 | props、事件、state 基础 |
| 08～10 | 状态快照、flushSync、React 18 自动批处理 |
| 11～18 | useEffect、useRef、useMemo/useCallback、useReducer、自定义 Hook、闭包与依赖数组 |
| 19～21 | key/diff、受控表单、children 组合 |
| 22～24 | Context、memo、合成事件 |
| 25～28 | 协调/批处理概念、Fragment/Portal/StrictMode、forwardRef、lazy/Suspense |
| 29～35 | Router/状态管理面试、defaultProps/displayName、HOC/renderProps、useLayoutEffect、派生状态、React 19 概览、并发 opt-in |

---

## 六、禁止事项

- 不要给所有 demo 套同一套模板化面试答案
- 不要删除已有可工作的演示效果
- 不要修改 `manifest.json`（由脚本生成）
- 不要修改 `packages/shared/`、`apps/react18/libs/` 除非 demo 确实无法引用现有资源
- 不要一次性大重构整个目录结构
- 不要在 NOTES 写「详见上方」类错误引导
- 不要把 class-components 目录混进本次任务

---

## 七、单文件改造自检清单（改完必过）

- [ ] 头注释 `要点` / `面试` 与 `<h1>`、SCRIPT 分段一致
- [ ] 头注释每条 `面试:` 在 NOTES 面试区有对应 Q&A
- [ ] 每条知识点要点能在 SCRIPT 或 PAGE_DOM 找到依据
- [ ] 面试答法可在 react.dev 找到对应表述
- [ ] SCRIPT 有 `// ====== N. 主题 ======` 分段 + 核心中文注释
- [ ] 易错概念表述与标杆 demo 一致（不引入新的错误说法）
- [ ] `p.hint` 引导准确（Console + #root）
- [ ] 参考资料链接有效且与正文强相关
- [ ] NAV 上一篇/下一篇链接未被破坏

---

## 八、标杆与续跑

**标杆参考**：`apps/react18/src/function-components/01-入门-元素与渲染.html`

**续跑指令**（对话中断时在新对话粘贴）：

```
@apps/react18/src/function-components/prompt.md
@CONVENTIONS.md
@apps/react18/src/function-components/01-入门-元素与渲染.html

继续处理 apps/react18/src/function-components/，从 `[上次停下的文件路径]` 开始，
沿用同一标准，直到全部 34 个文件完成。
最后给出汇总表并运行 npm run validate。
```

---

## 九、待改文件清单（共 35 个）

- `01-入门-元素与渲染.html`（**已完成**，跳过或仅做一致性检查）
- `02-JSX-条件渲染短路.html`
- `03-元素与函数组件.html`
- `04-元素不可变-时钟.html`
- `05-函数组件-props.html`
- `06-函数组件-事件处理与参数传递.html`
- `07-函数组件-state与props.html`
- `08-useState-异步合并与连续更新.html`
- `09-状态更新后读取-flushSync与useEffect.html`
- `10-React18-自动批处理对比.html`
- `11-useEffect-生命周期对照.html`
- `12-Hooks-useState基础.html`
- `13-Hooks-useEffect副作用.html`
- `14-Hooks-useRef与DOM.html`
- `15-Hooks-useMemo-useCallback.html`
- `16-Hooks-useReducer.html`
- `17-自定义Hook.html`
- `18-闭包与依赖数组陷阱.html`
- `19-列表key与diff.html`
- `20-受控与非受控表单.html`
- `21-组件通信与children组合.html`
- `22-Context跨层传递.html`
- `23-Reactmemo性能优化.html`
- `24-合成事件机制.html`
- `25-虚拟DOM-Fiber-批处理.html`
- `26-Fragment-Portal-StrictMode.html`
- `27-forwardRef与useImperativeHandle.html`
- `28-lazy-Suspense代码分割.html`
- `29-Router与状态管理面试点.html`
- `30-函数-defaultProps与displayName.html`
- `31-高阶组件HOC与renderProps.html`
- `32-useLayoutEffect与useEffect对比.html`
- `33-props派生状态与key重置.html`
- `34-React19新特性概览.html`
- `35-useTransition与useDeferredValue.html`

---

## 十、开始执行

1. **跳过**已完成的 `01-入门-元素与渲染.html`
2. 从 `02-JSX-条件渲染短路.html` 开始，按编号顺序逐个修改
3. **不要**只分析不写文件；每轮建议处理 8～12 个文件
4. 未完成则用 §八 续跑指令
5. 全部完成后运行 `npm run validate` 并给出汇总表
