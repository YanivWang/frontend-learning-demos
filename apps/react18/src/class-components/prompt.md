# 任务：批量升级 `apps/react18/src/class-components/` 下全部 React Demo 页

你是本仓库的前端学习 Demo 维护者。请参照已完成的标杆页面
`apps/react18/src/class-components/01-class-必须super.html`，
对 `apps/react18/src/class-components/` 目录下**全部 19 个 `.html` demo 页**
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
- **class 组件 API**：[react.dev/reference/react/Component](https://react.dev/reference/react/Component)
- **ES class / super**：[MDN — super](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super)
- **Legacy 对照**（仅维护旧 class 代码时）：[legacy.reactjs.org — React.Component](https://legacy.reactjs.org/docs/react-component.html)
- **仓库内**：`CONVENTIONS.md`、标杆 `01-class-必须super.html`、同主题 sibling demo

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

| 字段   | 要求                                                                |
| ------ | ------------------------------------------------------------------- |
| `分类` | `react18 / class 组件` 或更细子主题（如 lifecycle、setState、性能） |
| `主题` | 一句话，与 `<h1>` 一致                                              |
| `要点` | 3～6 条，**必须对应当前 SCRIPT 能演示的内容**                       |
| `面试` | 3～6 条，具体问句，禁止泛化模板（如「有什么应用场景？」）           |
| `相关` | 同目录上下游 demo，与页脚 NAV 一致                                  |
| 可选   | `难度`、`前置`                                                      |

**质量检查**：随机抽一条 `要点`，在 SCRIPT / PAGE_DOM 里能找到对应代码；找不到则删改要点或补代码/注释。

### 2. NOTES 区

检查并修复：

- `<h1>` 与「主题」一致
- `p.hint` 引导语：
  - **有 #root 交互 demo**：`请打开 DevTools Console 查看…；下方 #root 为 React 挂载/交互演示区。`
  - **禁止**写「在浏览器中操作下方交互演示；复习要点与面试答法见上方区块」（复习区本来就在上方，且很多页面实际无交互）
  - **禁止**写「见上方复习区」
- **知识点要点**：4～6 条 = 概念 + 行为 + 易错点 + 现代 React 推荐写法（函数组件/Hooks 作为 class 的替代说明）
- **面试考点**：3～6 条，格式 `<strong>问句？</strong>` + 2～4 句（**先结论 → 原因 → 边界/项目场景**）
- 头注释 `面试:` 的**每一条**必须在 NOTES 面试区有对应 Q&A（条数一致）
- **参考资料**：2～6 条 react.dev 链接；涉及 ES class 规则时加 MDN

**class 组件常见需修正的表述**（以 react.dev 为准）：

| 易错说法                                      | 正确说法                                                                      |
| --------------------------------------------- | ----------------------------------------------------------------------------- |
| 初始化 state 才需要 constructor               | **不初始化 state 且不绑定方法**时可省略；类字段 `state = {}` 和箭头函数可替代 |
| super() 与 super(props) 无差别                | constructor 内须先 `super(props)`，否则 `this.props` 可能为 `undefined`       |
| setState 是同步赋值                           | `setState` 进入更新队列；当前 render 中读 `this.state` 仍是快照               |
| 连续对象式 setState 会累加                    | 同批次多次对象式更新基于同一旧快照，计数器应函数式更新                        |
| setState 可以 await                           | class 的 `setState` 不是 Promise；用第二参数 callback 或 lifecycle            |
| componentDidMount = useEffect 完全等价        | 时机与依赖模型不同；class 三件套 mount/update/unmount 需成对维护              |
| UNSAFE\_ 生命周期仍推荐新项目使用             | 仅维护旧代码；新代码用 componentDidMount/Update 或 Hooks                      |
| render 里可以放副作用                         | render 必须是 props/state/context 的纯函数                                    |
| onClick={this.fn()} 与 onClick={this.fn} 一样 | 前者 render 时立即执行，后者点击时执行                                        |
| PureComponent 一定更快                        | 浅比较有成本；只在 props/state 浅变且重渲染昂贵时使用                         |
| getDerivedStateFromProps 用来同步所有 props   | 只用于 props 变化时需要从 props 派生 state 的少数场景                         |
| forceUpdate 是常规更新手段                    | 优先 setState/props；forceUpdate 跳过 shouldComponentUpdate，少用于业务       |
| ReactDOM.render 仍推荐                        | React 18 客户端入口用 `createRoot` + `root.render`                            |
| class 组件是新项目首选                        | react.dev 推荐新代码用函数组件 + Hooks；class 用于维护旧代码与理解生命周期    |

### 3. PAGE_DOM / 示例代码区

按 demo **类型**处理：

| 类型                | 判断                                  | PAGE_DOM 要求                                   |
| ------------------- | ------------------------------------- | ----------------------------------------------- |
| **A. 纯挂载**       | 仅 `#root`，交互在 React 内           | 保留 `<div id="root"></div>`                    |
| **B. React 内交互** | 按钮、表单在组件内                    | `#root` 即可；hint 引导看页面 + Console         |
| **C. 对比演示**     | setState 批处理、PureComponent 对比等 | 保留原有 UI 结构；必要时补 label / 分区标题     |
| **D. 概念/面试向**  | HOC、错误边界、优化清单等             | 保留现有结构；无法 runnable 的部分在 NOTES 标注 |

补全规则：

- 脚本依赖的元素 id 保持稳定
- **不破坏**已有可工作的演示效果
- `#root` 必须在 `<script type="text/babel">` 之前出现在 DOM 中

### 4. SCRIPT 区（核心改造，对标 `01-class-必须super.html`）

每个 demo 的 `<!-- SCRIPT_START -->` ~ `<!-- SCRIPT_END -->` 必须：

#### 4.1 结构与注释

1. 用 `// ====== N. 主题 ======` 分段，**每段对应 NOTES 一个要点**
2. **核心逻辑必须写中文注释**，说明：
   - 这段演示什么 class 组件机制
   - 预期输出/页面行为是什么
   - 对应 react.dev 哪个 API / 概念
3. 关键行尾可加 `// 预期: ...`
4. 适合 Console 验证的 demo 补 `console.log`，输出带语义前缀（如 `"constructor this.props:"`、`"setState 后 this.state:"`）

#### 4.2 演示完整性（gap 分析后补全）

NOTES / 面试里提到但脚本缺失的常见项，**按主题补**：

| 主题                                  | 必须能在 SCRIPT 验证                                                                      |
| ------------------------------------- | ----------------------------------------------------------------------------------------- |
| super / constructor                   | `super(props)`、`console.log(this.props)`、state 初始化、bind；注释反例缺 super/缺 render |
| state / props                         | 只读 props、setState 触发渲染、子调父回调                                                 |
| setState 合并                         | 对象式连续 +1 只加 1；函数式累加；Console 打印快照                                        |
| 生命周期                              | 各阶段 `console.log` 调用顺序；mount 建副作用、unmount 清理                               |
| 事件绑定                              | bind / 箭头函数 / JSX 内联对比；`fn()` vs `fn` 反例注释                                   |
| refs                                  | `createRef` + `componentDidMount` 读 DOM                                                  |
| PureComponent / shouldComponentUpdate | 渲染次数对比 Console 或 UI 计数                                                           |
| Context / 错误边界 / HOC              | 保留可运行最小示例；复杂处注释说明                                                        |

- 会抛错的演示 → 保留为注释并注明错误类型
- 反面教材 → 注释块说明「取消注释可观察…」，区分不同错误机制
- 相邻 demo 分工明确（如 `03-setState-异步合并` vs `04-setState-函数式更新`），避免重复整段 SCRIPT

#### 4.3 React 工程约束

- 客户端入口统一 **`ReactDOM.createRoot` + `root.render`**，除非 demo 主题就是对比旧 API
- 保留 `type="text/babel"` 与现有 libs 引用，不改为 Vite/Webpack
- 页脚 NAV 里 file:// 目录修正脚本**保留在 NAV 区**，不要挪到 SCRIPT 区
- 不要引入 `demo-log.js` 或新 npm 包
- 不要删除 demo 依赖的 `../../libs/` 引用

#### 4.4 标杆参照（`01-class-必须super.html`）

重点学习：

- 元信息 `要点` / `面试` 与 SCRIPT 分段一一对应
- NOTES 面试区覆盖头注释全部 `面试:` 条目
- `// ====== 0.` 注释示意现代替代写法 + `// ====== N.` 可运行主逻辑 + 反面教材注释块
- constructor 内 `super(props)` → state → bind → 纯函数 render 的完整链路
- hint 准确描述 Console + 页面交互，不写虚假「交互演示」

---

## 四、执行策略（一次改完 19 个文件）

### 步骤

1. **扫描清单**：按本文 §十 文件清单，从 `01` → `19` 顺序处理。
2. **逐个文件**：
   - 读取当前 html
   - **先查 react.dev** 对应 Component API / Learn 页
   - 做四区块 gap 分析（列出：错误表述 / 缺失演示 / NOTES↔SCRIPT 不一致 / 缺注释）
   - 直接修改文件
   - 自检：**头注释 ↔ NOTES ↔ SCRIPT 三者一致**
3. **同主题去重**：
   - `03-setState-异步合并` vs `04-setState-函数式更新`：前者演示对象式陷阱，后者演示函数式正确累加
   - `02-class-state与props` vs `13-class-事件绑定三种方式`：前者侧重数据流，后者侧重 this 绑定写法
   - `06-class-完整生命周期与API` vs `09-class-getDerivedStateFromProps`：生命周期总览 vs 特定 API 深入
4. **批量完成后**：
   - 运行 `npm run validate`
   - 汇总表列出每个文件的改动

### 交付汇总表（Markdown）

| 文件路径 | 主要修复 | 新增/增强演示 | 参考 react.dev |
| -------- | -------- | ------------- | -------------- |

另附：

- **已完成标杆（跳过或仅一致性检查）**：`01-class-必须super.html`
- **未改动文件及原因**
- **需人工浏览器验证的文件**

---

## 五、各文件侧重点（按编号）

| 编号 | 文件                                              | 侧重点                                                                  |
| ---- | ------------------------------------------------- | ----------------------------------------------------------------------- |
| 01   | 必须super                                         | **已完成标杆**：super(props)、constructor 职责、render 纯函数、反面教材 |
| 02   | state与props                                      | props 只读、state/setState、子调父回调、constructor 初始化              |
| 03   | setState-异步合并                                 | 对象式连续 setState 快照、批处理、Console 证明只 +1                     |
| 04   | setState-函数式更新                               | 函数式 updater 累加、与 03 对比                                         |
| 05   | Clock-setState-批处理对比                         | 批处理行为对比、createRoot                                              |
| 06   | 完整生命周期与API                                 | 挂载/更新/卸载顺序、副作用放置、forceUpdate 边界                        |
| 07   | refs与DOM                                         | createRef、componentDidMount 读 DOM                                     |
| 08   | PureComponent性能优化                             | 浅比较、减少不必要 render                                               |
| 09   | getDerivedStateFromProps与getSnapshotBeforeUpdate | 静态方法、派生 state、DOM 快照                                          |
| 10   | Context上下文                                     | Provider/Consumer 或 legacy contextType                                 |
| 11   | 受控与非受控表单                                  | 受控 input、ref 读非受控值                                              |
| 12   | setState第二参数回调                              | callback 在 commit 后执行                                               |
| 13   | 事件绑定三种方式                                  | bind / 箭头函数 / JSX 内联；fn() vs fn                                  |
| 14   | 列表key与diff                                     | key 稳定、重排行为                                                      |
| 15   | 组件通信与children                                | props 回调、children、组合                                              |
| 16   | 合成事件机制                                      | 事件委托、nativeEvent、persist（Legacy 语境说明）                       |
| 17   | defaultProps与静态属性                            | defaultProps、displayName、static 方法                                  |
| 18   | 高阶组件HOC                                       | 包装组件、props 代理                                                    |
| 19   | 错误边界与常见优化清单                            | componentDidCatch、getDerivedStateFromError                             |

---

## 六、禁止事项

- 不要给所有 demo 套同一套模板化面试答案
- 不要删除已有可工作的演示效果
- 不要修改 `manifest.json`（由脚本生成）
- 不要修改 `packages/shared/`、`apps/react18/libs/` 除非 demo 确实无法引用现有资源
- 不要一次性大重构整个目录结构
- 不要在 NOTES 写「详见上方」或虚假的「交互演示」引导
- 不要把 function-components 目录混进本次任务
- 不要把已废弃 API 写成推荐写法（UNSAFE\_ lifecycle、ReactDOM.render 等）

---

## 七、单文件改造自检清单（改完必过）

- [ ] 头注释 `要点` / `面试` 与 `<h1>`、SCRIPT 分段一致
- [ ] 头注释每条 `面试:` 在 NOTES 面试区有对应 Q&A
- [ ] 每条知识点要点能在 SCRIPT 或 PAGE_DOM 找到依据
- [ ] 面试答法可在 react.dev 找到对应表述
- [ ] SCRIPT 有 `// ====== N. 主题 ======` 分段 + 核心中文注释
- [ ] 易错概念表述与标杆 demo 一致（不引入新的错误说法）
- [ ] `p.hint` 引导准确（Console + #root + 实际存在的交互）
- [ ] 参考资料链接有效且与正文强相关
- [ ] NAV 上一篇/下一篇链接未被破坏
- [ ] 相邻 demo 无大段重复 SCRIPT

---

## 八、标杆与续跑

**标杆参考**：`apps/react18/src/class-components/01-class-必须super.html`

**续跑指令**（对话中断时在新对话粘贴）：

```
@apps/react18/src/class-components/prompt.md
@CONVENTIONS.md
@apps/react18/src/class-components/01-class-必须super.html

继续处理 apps/react18/src/class-components/，从 `[上次停下的文件路径]` 开始，
沿用同一标准，直到全部 19 个文件完成。
最后给出汇总表并运行 npm run validate。
```

---

## 九、待改文件清单（共 19 个）

- `01-class-必须super.html`（**已完成**，跳过或仅做一致性检查）
- `02-class-state与props.html`
- `03-setState-异步合并.html`
- `04-setState-函数式更新.html`
- `05-Clock-setState-批处理对比.html`
- `06-class-完整生命周期与API.html`
- `07-class-refs与DOM.html`
- `08-class-PureComponent性能优化.html`
- `09-class-getDerivedStateFromProps与getSnapshotBeforeUpdate.html`
- `10-class-Context上下文.html`
- `11-class-受控与非受控表单.html`
- `12-class-setState第二参数回调.html`
- `13-class-事件绑定三种方式.html`
- `14-class-列表key与diff.html`
- `15-class-组件通信与children.html`
- `16-class-合成事件机制.html`
- `17-class-defaultProps与静态属性.html`
- `18-class-高阶组件HOC.html`
- `19-错误边界与常见优化清单.html`

---

## 十、开始执行

1. **跳过**已完成的 `01-class-必须super.html`（或仅做一致性检查）
2. 从 `02-class-state与props.html` 开始，按编号顺序逐个修改
3. **不要**只分析不写文件；每轮建议处理 5～8 个文件（class demo 通常比 hooks demo 代码更长）
4. 未完成则用 §八 续跑指令
5. 全部完成后运行 `npm run validate` 并给出汇总表
