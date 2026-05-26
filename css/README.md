# CSS

按主题编号的 CSS demo，共 **33** 个 `.html` 文件，兼顾常用效果和 CSS 面试基础。每个 demo 可直接在浏览器打开。

目录按 `00-基础` ~ `05-性能` 编号，外加 `CSS选择器/` 专题。`04-响应式/media-queries/` 下 `step1.html` → `final.html` 演示媒体查询的渐进增强；`04-响应式/libs/` 存放 IE8 及以下 polyfill（见 [`04-响应式/libs/README.md`](04-响应式/libs/README.md)）。

## 目录概览

| 目录 | 知识点 |
|---|---|
| `00-基础/` | 盒模型、`display` 与文档流、常用单位、`calc()`、`clamp()`、CSS 变量 |
| `01-布局/` | Flex、Grid、BFC、清除浮动、定位、层叠上下文、常见布局题、rem 适配、瀑布流、滚动表格（`thead` 固定） |
| `02-动画/` | Loading 四种、`@keyframes`、NProgress、光标闪烁、展开折叠（height / max-height / grid）、序列帧（精灵图） |
| `03-视觉效果/` | 文本省略、图片处理、百分比圆环、3D 按钮、`drop-shadow`、`background-blend-mode`、Tooltip |
| `04-响应式/` | Media Queries（含 step1 → final 演进对比）、rem + @media + vw / vh 综合适配 |
| `05-性能/` | 重排、重绘、合成层、`transform` / `opacity` 动画性能、`will-change`、`contain` |
| `CSS选择器/` | 优先级与各种选择器一览 |

## CSS 面试基础覆盖

| 高频问题 | 当前示例 |
|---|---|
| 选择器、优先级、层叠规则 | `CSS选择器/` |
| 盒模型、`box-sizing`、margin 折叠 | `00-基础/盒模型/` |
| `display`、文档流、隐藏方式区别 | `00-基础/display与文档流/` |
| CSS 单位、`calc()`、`clamp()`、CSS 变量 | `00-基础/单位与函数/` |
| Flex 一维布局 | `01-布局/flex/` |
| Grid 二维布局 | `01-布局/grid/` |
| BFC、清除浮动、阻止 margin 折叠 | `01-布局/BFC与清除浮动/` |
| 定位、包含块、`z-index`、层叠上下文 | `01-布局/定位与层叠上下文/` |
| 居中、两栏、三栏、粘性 footer、等比例盒子 | `01-布局/常见布局题/` |
| 响应式、媒体查询、rem、vw/vh | `01-布局/rem/`、`04-响应式/media-queries/`、`04-响应式/vw-vh/` |
| 动画、过渡、`transform` | `02-动画/` |
| 文本省略、图片适配、基线空隙 | `03-视觉效果/文本与图片处理/` |
| CSS 渲染性能 | `05-性能/渲染性能/` |

## 推荐顺序

`00-基础 → 01-布局 → 02-动画 → 03-视觉效果 → 04-响应式 → 05-性能 → CSS选择器`

## 完整 demo 清单

<!-- DEMO_TABLE_START -->

共 **33** 个 demo（由 `node scripts/sync-readmes.mjs` 根据头注释自动生成，请勿手改表格正文）。

| 文件 | 主题 |
|---|---|
| `00-基础/单位与函数/index.html` | px、em、rem、百分比、vw/vh、calc、clamp、CSS 变量 |
| `00-基础/盒模型/index.html` | 标准盒模型、IE 盒模型、margin 折叠 |
| `00-基础/display与文档流/index.html` | block、inline、inline-block、none、visibility |
| `01-布局/常见布局题/index.html` | 居中、两栏、三栏、粘性 footer、等比例盒子 |
| `01-布局/定位与层叠上下文/index.html` | position、包含块、z-index、层叠上下文 |
| `01-布局/滚动表格/index.html` | 表头固定 + 表体滚动 |
| `01-布局/瀑布流/index.html` | 用 column-count 实现纯 CSS 瀑布流 |
| `01-布局/BFC与清除浮动/index.html` | BFC 的作用和触发方式 |
| `01-布局/flex/index.html` | Flex 一维布局 |
| `01-布局/grid/index.html` | Grid 二维布局系统集合演示 |
| `01-布局/rem/index.html` | rem 实现移动端等比适配 |
| `02-动画/光标闪烁/index.html` | CSS 实现终端式闪烁光标 |
| `02-动画/序列帧/index.html` | 用 background-position + steps() 播放精灵图 |
| `02-动画/展开折叠/index.html` | height / max-height / grid 三种展开折叠方案 |
| `02-动画/keyframes/index.html` | @keyframes 基础旋转动画 |
| `02-动画/loading/load1.html` | 5 条竖条横向并排呼吸 loading |
| `02-动画/loading/load2.html` | 5 条竖条交错弹跳的加载动画 |
| `02-动画/loading/load3.html` | lds-ring 圆环旋转 loading |
| `02-动画/loading/load4.html` | 文字逐字淡出的 loading 动画 |
| `02-动画/nprogress/index.html` | NProgress 顶部进度条第三方库 |
| `03-视觉效果/按钮/3dButton.html` | 渐变 + 下边框 + box-shadow 的 3D 按钮 |
| `03-视觉效果/按钮/button.html` | 拟物 3D 按钮的按下动效 |
| `03-视觉效果/百分比圆环/index.html` | 纯 CSS 百分比圆环 demo 页（多色 / dark / 多尺寸） |
| `03-视觉效果/文本与图片处理/index.html` | 文本省略、vertical-align、object-fit、aspect-ratio |
| `03-视觉效果/background-blend-mode/index.html` | 背景叠加颜色 / 渐变的混合演示 |
| `03-视觉效果/drop-shadow/index.html` | box-shadow vs filter: drop-shadow 对比 |
| `03-视觉效果/tooltip/index.html` | 纯 CSS tooltip（上下左右四方向） |
| `04-响应式/media-queries/final.html` | 响应式布局最终页（step1 基础上叠加 media-queries） |
| `04-响应式/media-queries/step1.html` | 响应式布局基础页（仅加载 style.css，未引入 media-queries.css） |
| `04-响应式/vw-vh/index.html` | rem + @media + vw / vh 综合响应式示例 |
| `05-性能/渲染性能/index.html` | 重排、重绘、合成层与动画性能 |
| `CSS选择器/index.html` | 选择器种类与优先级（specificity） |
| `index.html` | CSS 模块导航入口 |

<!-- DEMO_TABLE_END -->
