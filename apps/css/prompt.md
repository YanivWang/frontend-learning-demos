# 任务：批量升级 `apps/css/` 下所有 CSS Demo 页

你是本仓库的前端学习 Demo 维护者。请参照已完成的标杆页面 `apps/css/01-基础/盒模型/index.html`，对 `apps/css/` 目录下**全部 `.html` demo 页**（约 43 个，**排除** `apps/css/index.html` 目录入口页）进行内容修复、补全与增强。

---

## 一、必须遵守的仓库规范

1. 严格遵循根目录 `CONVENTIONS.md` §4（元数据头注释、页面骨架、复习区写作规范）。
2. `<head>` 必须引入（路径按实际层级调整）：
   - `packages/shared/demo-notes.css`
   - `packages/shared/demo-shell.css`
3. 页面骨架顺序固定：

   ```
   body.demo-page
   ├── <!-- NOTES_START --> ~ <!-- NOTES_END -->     复习区
   ├── <!-- PAGE_DOM_START --> ~ <!-- PAGE_DOM_END -->  演示区（CSS demo 必须有）
   ├── <!-- SCRIPT_START --> ~ <!-- SCRIPT_END -->     核心逻辑脚本
   └── <!-- NAV_START --> ~ <!-- NAV_END -->         页脚导航
   ```

4. **最小改动原则**：只改与「内容正确性、演示完整性、学习/面试价值」相关的部分；不重排无关代码、不引入新依赖、不重构整个 demo 的视觉效果。
5. **不要 git commit**，除非我明确要求。
6. 最终回复使用中文。

---

## 二、权威来源要求（硬性）

所有知识点、面试答法、演示行为必须**先查权威来源再写**，禁止凭记忆或口语化说法：

- **首选**：MDN 对应文档
- **次选**：W3C / CSSWG 规范
- **仓库内**：`CONVENTIONS.md`

具体要求：

- 禁止使用无出处的称谓（如「IE 盒模型」），除非正文明确标注为历史背景。
- 参考资料链接必须**直接支撑**正文关键结论，禁止凑弱相关链接。
- 若 NOTES 写了某个机制，PAGE_DOM 必须有对应可观察演示；若无法演示，从 NOTES 删除或改为「了解即可」并说明原因。
- 发现与 MDN 冲突的旧内容，以 MDN 为准修正。

---

## 三、按四个区块逐项改造（每个 demo 都做）

### 1. 顶部元信息注释（`<!DOCTYPE>` 之前）

检查并补齐：

- `分类`：css / 子目录路径
- `主题`：一句话，与 `<h1>` 一致
- `要点`：3～5 条，对应当前 demo **真实代码**能演示的内容
- `面试`：3～5 条，具体问句，禁止泛化模板
- 可选：`难度`、`前置`、`相关`

### 2. NOTES 区

检查并修复：

- `<h1>` 与「主题」一致
- `p.hint`：引导「看本复习区 + 下方演示区」；**禁止**写「见上方复习区」
- **知识点要点**：4～6 条 = 概念 + 行为 + 易错点 + 现代推荐写法
- **面试考点**：3～5 条，格式 `<strong>问句？</strong>` + 2～4 句（先结论 → 原因 → 边界/项目场景）
- **参考资料**：1～5 条 MDN/规范链接

质量标准（对标 `盒模型/index.html`）：

- 概念表述可逐条在 MDN 找到依据
- 不写 NOTES 里提到但 demo 不展示的内容（除非标注为纯概念）

### 3. PAGE_DOM / 示例代码区

检查并补全：

- 保留原有 demo 核心视觉效果与交互，不破坏可用性
- 演示区应覆盖 NOTES 中的**所有关键机制**（不只讲不练）
- 每个子 demo 有清晰 `<h2>` + `p.tip` 说明观察什么
- 给脚本测量/操作的关键元素加 `id` 或稳定选择器
- 必要时增加 `#runtime-output` 区域供脚本输出实测报告

CSS 演示常见陷阱（必须注意）：

- `outline` 标边界不参与 margin 折叠判定；`border` 会——不要误用 `border` 破坏折叠演示
- 父子 margin 折叠 demo 的父容器不能随意加 `border-top/bottom` 或 `padding`，除非就是要演示「阻止折叠」
- `box-sizing`、`flex`、`grid`、`position` 等数值应可心算验证，必要时在文案中写出计算过程

### 4. SCRIPT 区（新增或增强）

每个 CSS demo 都应有 `<!-- SCRIPT_START -->` ~ `<!-- SCRIPT_END -->` 区块：

1. **核心逻辑函数必须写中文注释**，说明：

   - 函数用途
   - 读的是哪个 DOM/CSS 概念
   - 与 MDN 哪个概念对应

2. 脚本职责（按 demo 类型选用，不必全做）：

   - 读取 `offsetWidth` / `clientWidth` / `getComputedStyle` 输出实测值
   - 动态更新演示区说明文字
   - 在 `#runtime-output` 输出结构化测量报告
   - 交互型 demo 保留/增强原有交互逻辑

3. 用 IIFE，避免污染全局
4. **不要**引入 `demo-log.js` 或新 npm 包
5. 页脚 NAV 里的 file:// 目录修正脚本**保留在 NAV 区**，不要挪到 SCRIPT 区

参照 `盒模型/index.html` 脚本风格：

- 工具函数带中文注释（如 `getBorderBoxWidth()`）
- 页面加载后自动执行测量并渲染结果

---

## 四、执行策略（一次改完全部）

1. **先扫描**：列出 `apps/css/**/*.html`（排除 `apps/css/index.html`），按 `01-基础` → `07-现代特性` 顺序处理。

2. **逐个文件**：

   - 读取当前 html
   - 查阅对应 MDN 页面
   - 对照四区块做 gap 分析
   - 直接修改文件
   - 自检：NOTES ↔ PAGE_DOM ↔ SCRIPT 三者一致

3. **批量完成后**：

   - 运行 `npm run validate`（若存在）检查结构
   - 抽样用本地 HTTP 服务打开 3～5 个改过的页面验证脚本输出

4. **最终交付汇总表**（Markdown）：

   | 文件路径 | 主要修复 | 新增演示 | 新增脚本能力 | 参考 MDN 链接 |
   | -------- | -------- | -------- | ------------ | ------------- |

   并单独列出：

   - 未改动的文件及原因
   - 需要人工二次确认的文件（如依赖外部资源、动画时序难自动验证）

---

## 五、各分类侧重点

| 目录           | 侧重点                                                   |
| -------------- | -------------------------------------------------------- |
| `01-基础/`     | 概念准确、计算可验证、面试答法完整                       |
| `02-布局/`     | 每种布局技巧有可视对比；margin 折叠、BFC、层叠等演示正确 |
| `03-动画/`     | 说清 transition vs animation；脚本可输出 computed 状态   |
| `04-视觉效果/` | 效果步骤与 CSS 属性一一对应                              |
| `05-响应式/`   | 断点行为可观察；脚本可输出 matchMedia / 视口信息         |
| `06-性能/`     | 重排/重绘/合成层表述对齐 MDN Performance 文档            |
| `07-现代特性/` | 标注浏览器支持边界；优先链 MDN + 规范                    |

---

## 六、禁止事项

- 不要批量跑 `transform:all-demos` / `format:all-demos` 覆盖人工核对过的正文
- 不要给所有 demo 套同一套模板化面试答案
- 不要删除已有可工作的演示效果
- 不要修改 `packages/shared/` 除非 demo 确实无法引用现有样式
- 不要一次 PR 式大重构；逐文件精准 diff

---

## 七、标杆参考

改造质量对标：`apps/css/01-基础/盒模型/index.html`

重点学习其：

- MDN 对齐的 NOTES 写法
- 三种 margin 折叠 + box-sizing 的 PAGE_DOM 覆盖度
- 带中文注释的测量脚本 + `#runtime-output` 实测输出
- `outline` vs `border` 在折叠 demo 中的正确用法

---

## 八、待改文件清单（共 43 个）

### 01-基础（5）

- `apps/css/01-基础/盒模型/index.html`（已完成，跳过或仅做一致性检查）
- `apps/css/01-基础/单位与函数/index.html`
- `apps/css/01-基础/选择器与优先级/index.html`
- `apps/css/01-基础/display与文档流/index.html`
- `apps/css/01-基础/继承与层叠/index.html`

### 02-布局（9）

- `apps/css/02-布局/flex/index.html`
- `apps/css/02-布局/grid/index.html`
- `apps/css/02-布局/BFC与清除浮动/index.html`
- `apps/css/02-布局/定位与层叠上下文/index.html`
- `apps/css/02-布局/常见布局题/index.html`
- `apps/css/02-布局/瀑布流/index.html`
- `apps/css/02-布局/滚动表格/index.html`
- `apps/css/02-布局/rem/index.html`

### 03-动画（11）

- `apps/css/03-动画/transition与animation/index.html`
- `apps/css/03-动画/keyframes/index.html`
- `apps/css/03-动画/展开折叠/index.html`
- `apps/css/03-动画/序列帧/index.html`
- `apps/css/03-动画/nprogress/index.html`
- `apps/css/03-动画/光标闪烁/index.html`
- `apps/css/03-动画/loading/01-竖条呼吸.html`
- `apps/css/03-动画/loading/02-竖条弹跳.html`
- `apps/css/03-动画/loading/03-圆环旋转.html`
- `apps/css/03-动画/loading/04-文字淡出.html`

### 04-视觉效果（9）

- `apps/css/04-视觉效果/tooltip/index.html`
- `apps/css/04-视觉效果/多行省略/index.html`
- `apps/css/04-视觉效果/drop-shadow/index.html`
- `apps/css/04-视觉效果/文本与图片处理/index.html`
- `apps/css/04-视觉效果/background-blend-mode/index.html`
- `apps/css/04-视觉效果/百分比圆环/index.html`
- `apps/css/04-视觉效果/按钮/02-立体按钮.html`
- `apps/css/04-视觉效果/按钮/03-3D按钮.html`

### 05-响应式（3）

- `apps/css/05-响应式/media-queries/01-基础布局.html`
- `apps/css/05-响应式/media-queries/02-响应式最终页.html`
- `apps/css/05-响应式/vw-vh/index.html`

### 06-性能（2）

- `apps/css/06-性能/01-重排重绘/index.html`
- `apps/css/06-性能/02-合成层/index.html`

### 07-现代特性（7）

- `apps/css/07-现代特性/01-has选择器/index.html`
- `apps/css/07-现代特性/02-layer层叠管理/index.html`
- `apps/css/07-现代特性/03-container-queries容器查询/index.html`
- `apps/css/07-现代特性/04-is-where选择器/index.html`
- `apps/css/07-现代特性/05-view-transitions/index.html`
- `apps/css/07-现代特性/06-subgrid/index.html`
- `apps/css/07-现代特性/07-content-visibility/index.html`

---

## 九、续跑指令（对话中断时使用）

若一次对话未处理完，在新对话中粘贴：

```
@apps/css/prompt.md

继续处理，从 `[上次停下的文件路径]` 开始，沿用同一标准，直到 apps/css/ 全部完成。
最后给出汇总表。
```

---

## 十、开始执行

先处理 `01-基础/`（跳过已完成的盒模型），按目录顺序逐个修改，全部完成后给出汇总表。
