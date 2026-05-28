# CSS

按主题编号的 CSS demo，共 **44** 个 `.html` 文件，兼顾常用效果、CSS 面试基础与现代特性。每个 demo 可直接在浏览器打开。

目录按 `01-基础` ~ `07-现代特性` 编号分类。`05-响应式/media-queries/` 下 `01-基础布局.html` → `02-响应式最终页.html` 演示媒体查询的渐进增强。

## 生产参考文档

| 文档 | 说明 |
|------|------|
| [`企业CSS主线.md`](./企业CSS主线.md) | 生产主线白名单（Flex / Grid / 变量 / `@media` / `@supports` 增强等） |
| [`禁止使用CSS.md`](./禁止使用CSS.md) | 禁区清单（绝对禁 / 禁作唯一）及替代写法 |

兼容基线：`Chrome ≥87 / Safari ≥14 / Firefox ≥78 / Edge ≥88 / not ie 11`；硬地板：CSS 变量 `--*` / `var()`。

## 目录概览

| 目录 | 知识点 |
|---|---|
| `01-基础/` | 选择器与优先级、盒模型、`display` 与文档流、继承与层叠、常用单位、`calc()`、`clamp()`、CSS 变量 |
| `02-布局/` | Flex、Grid、BFC、清除浮动、定位、层叠上下文、常见布局题、rem 适配、瀑布流、滚动表格（`thead` 固定） |
| `03-动画/` | Loading 四种、`@keyframes`、`transition` 与 `animation` 对比、NProgress、光标闪烁、展开折叠（height / max-height / grid）、序列帧（精灵图） |
| `04-视觉效果/` | 单行/多行文本省略、图片处理、百分比圆环、3D 按钮、`drop-shadow`、`background-blend-mode`、Tooltip |
| `05-响应式/` | Media Queries（含基础布局 → 响应式最终页演进对比）、rem + @media + vw / vh 综合适配 |
| `06-性能/` | 重排、重绘、合成层、`transform` / `opacity` 动画性能、`will-change`、`contain` |
| `07-现代特性/` | `:has()` 父选择器、`@layer` 层叠管理、Container Queries 容器查询、`content-visibility` |

## CSS 面试基础覆盖

| 高频问题 | 当前示例 |
|---|---|
| 选择器、优先级、层叠规则 | `01-基础/选择器与优先级/` |
| 盒模型、`box-sizing`、margin 折叠 | `01-基础/盒模型/` |
| `display`、文档流、隐藏方式区别 | `01-基础/display与文档流/` |
| CSS 继承、`inherit` / `initial` / `unset` | `01-基础/继承与层叠/` |
| CSS 单位、`calc()`、`clamp()`、CSS 变量 | `01-基础/单位与函数/` |
| Flex 一维布局 | `02-布局/flex/` |
| Grid 二维布局 | `02-布局/grid/` |
| BFC、清除浮动、阻止 margin 折叠 | `02-布局/BFC与清除浮动/` |
| 定位、包含块、`z-index`、层叠上下文 | `02-布局/定位与层叠上下文/` |
| 居中、两栏、三栏、粘性 footer | `02-布局/常见布局题/` |
| 响应式、媒体查询、rem、vw/vh | `02-布局/rem/`、`05-响应式/media-queries/`、`05-响应式/vw-vh/` |
| 动画、过渡、`transform` | `03-动画/`（含 `transition与animation/` 对比） |
| 单行文本省略、多行省略、图片适配、基线空隙 | `04-视觉效果/文本与图片处理/`、`04-视觉效果/多行省略/` |
| CSS 渲染性能 | `06-性能/01-重排重绘/` |
| `:has()` / `@layer` / Container Queries / `content-visibility` | `07-现代特性/` |

## 推荐顺序

`01-基础 → 02-布局 → 03-动画 → 04-视觉效果 → 05-响应式 → 06-性能 → 07-现代特性`

## 完整 demo 清单

<!-- DEMO_TABLE_START -->

共 **44** 个 demo（由 `node scripts/sync-readmes.mjs` 根据头注释自动生成，请勿手改表格正文）。

| 文件 | 主题 |
|---|---|
| `01-基础/单位与函数/index.html` | px、em、rem、百分比、vw/vh、calc、clamp、CSS 变量 |
| `01-基础/盒模型/index.html` | 标准盒模型、IE 盒模型、margin 折叠 |
| `01-基础/继承与层叠/index.html` | CSS 继承、inherit / initial / unset / revert |
| `01-基础/选择器与优先级/index.html` | 选择器种类与优先级（specificity） |
| `01-基础/display与文档流/index.html` | block、inline、inline-block、none、visibility |
| `02-布局/常见布局题/index.html` | 居中、两栏、三栏、粘性 footer |
| `02-布局/定位与层叠上下文/index.html` | position、包含块、z-index、层叠上下文 |
| `02-布局/滚动表格/index.html` | 表头固定 + 表体滚动 |
| `02-布局/瀑布流/index.html` | 用 column-count 实现纯 CSS 瀑布流 |
| `02-布局/BFC与清除浮动/index.html` | BFC 与清除浮动 |
| `02-布局/flex/index.html` | Flex 一维布局 |
| `02-布局/grid/index.html` | Grid 二维布局与轨道函数 |
| `02-布局/rem/index.html` | rem 实现移动端等比适配 |
| `03-动画/光标闪烁/index.html` | CSS 实现终端式闪烁光标 |
| `03-动画/序列帧/index.html` | 用 background-position + steps() 播放精灵图 |
| `03-动画/展开折叠/index.html` | height / max-height / grid 三种展开折叠方案 |
| `03-动画/keyframes/index.html` | @keyframes 与 animation 旋转动画 |
| `03-动画/loading/01-竖条呼吸.html` | 5 条竖条横向并排呼吸 loading |
| `03-动画/loading/02-竖条弹跳.html` | 5 条竖条交错弹跳的加载动画 |
| `03-动画/loading/03-圆环旋转.html` | lds-ring 圆环旋转 loading |
| `03-动画/loading/04-文字淡出.html` | 文字逐字淡出的 loading 动画 |
| `03-动画/nprogress/index.html` | NProgress 顶部进度条第三方库 |
| `03-动画/transition与animation/index.html` | transition 与 animation 对比 |
| `04-视觉效果/按钮/02-立体按钮.html` | 拟物 3D 按钮的按下动效 |
| `04-视觉效果/按钮/03-3D按钮.html` | 渐变 + 下边框 + box-shadow 的 3D 按钮 |
| `04-视觉效果/百分比圆环/index.html` | CSS3 transform 百分比圆环组件 |
| `04-视觉效果/多行省略/index.html` | 多行文本省略、line-clamp |
| `04-视觉效果/文本与图片处理/index.html` | 单行文本省略、vertical-align、object-fit |
| `04-视觉效果/background-blend-mode/index.html` | background-blend-mode 与 mix-blend-mode 混合模式 |
| `04-视觉效果/drop-shadow/index.html` | box-shadow vs filter: drop-shadow 对比 |
| `04-视觉效果/tooltip/index.html` | 纯 CSS tooltip（上下左右四方向） |
| `05-响应式/media-queries/01-基础布局.html` | 固定宽度三栏布局的响应式基线 |
| `05-响应式/media-queries/02-响应式最终页.html` | 基于 @media 断点的旧式页面响应式改造 |
| `05-响应式/vw-vh/index.html` | rem、@media 与 vw/vh 的组合响应式布局 |
| `06-性能/01-重排重绘/index.html` | CSS 重排、重绘与合成友好动画 |
| `06-性能/02-合成层/index.html` | 合成层、合成动画与 will-change 使用边界 |
| `07-现代特性/01-has选择器/index.html` | :has() 父选择器与条件样式 |
| `07-现代特性/02-layer层叠管理/index.html` | @layer 级联层与样式优先级管理 |
| `07-现代特性/03-container-queries容器查询/index.html` | container-type 与 @container 组件级响应式 |
| `07-现代特性/04-is-where选择器/index.html` | :is() 与 :where() 及特异性 |
| `07-现代特性/05-view-transitions/index.html` | View Transitions API（CSS 部分） |
| `07-现代特性/06-subgrid/index.html` | CSS Grid subgrid |
| `07-现代特性/07-content-visibility/index.html` | content-visibility 与屏幕外内容跳过渲染 |
| `index.html` | CSS 模块导航入口 |

<!-- DEMO_TABLE_END -->
