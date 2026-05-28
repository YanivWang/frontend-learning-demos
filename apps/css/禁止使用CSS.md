# 兼容性太差 / 不能写进项目主线的 CSS

> 与 [`企业CSS主线.md`](./企业CSS主线.md) 配对。本文不是说这些语法永远不能学，而是说它们**不能写进企业 CSS 主线**：绝对禁用项不要写；“禁作唯一”项不能承担核心布局、颜色、交互或主题逻辑，只能在有降级方案时作为渐进增强。

基线：`Chrome >= 87 / Firefox >= 78 / Safari >= 14 / Edge >= 88 / not IE 11`。本文明确不兼容 IE，但也不把特别新的 CSS 语法直接提升为主线。

## 判定标准

```text
不能 polyfill
或关掉后布局 / 颜色 / 交互就挂
或只有少数新浏览器支持
或团队成员难以稳定维护
= 不能作为企业 CSS 主线
```

## 绝对禁用

| 类别   | 语法 / 写法                                             | 限制   | 原因                                   | 改用什么                     |
| ------ | ------------------------------------------------------- | ------ | -------------------------------------- | ---------------------------- |
| IE     | `filter: progid:...`、`behavior: url(...)`              | 绝对禁 | 仅 Trident，现代 Vue / React 栈已弃 IE | 标准 `filter` / 组件方案     |
| IE     | `* html`、`_width`、`width: 1px\9` 等 hack              | 绝对禁 | 污染层叠，不可维护                     | 正常选择器 + Flex/Grid       |
| 旧语法 | `display: -webkit-box`、`-webkit-box-orient` 作唯一布局 | 绝对禁 | 2009 草案，语义和行为都过旧            | Flex / Grid                  |
| 私有   | 只写 `::-webkit-scrollbar` 当跨浏览器产品规范           | 绝对禁 | Firefox 等不可控                       | 接受系统滚动条或做非关键增强 |
| 废弃   | `@document`、`-moz-binding`                             | 绝对禁 | 非标准 / 已移除                        | 不使用                       |
| 前缀   | 源码只写 `-webkit-gradient` 等，不写标准属性            | 绝对禁 | 手搓前缀当标准，不可维护               | 标准语法 + 构建工具补前缀    |
| 构建   | 交付 CSS 留 `$var`、`@mixin` 未编译                     | 绝对禁 | 浏览器不识别                           | 编译为标准 CSS               |

## 特别新的 CSS：禁作唯一

这些是从 [`企业CSS主线.md`](./企业CSS主线.md) 中移出的内容。它们可以学习、可以做 demo、可以在 `@supports` 或明确 fallback 下渐进增强，但**不要作为企业项目默认主线**。

| 类别   | 语法 / 写法                                                          | 限制     | 原因                                              | 改用什么                                       |
| ------ | -------------------------------------------------------------------- | -------- | ------------------------------------------------- | ---------------------------------------------- |
| 组织   | 原生 CSS Nesting，例如 `& .child`                                    | 禁作唯一 | 语法较新，团队和浏览器基线都要确认                | 平铺 class / BEM；需要嵌套时用构建期 Sass/Less |
| 选择器 | `:has()`                                                             | 禁作唯一 | 不支持时整个选择器块失效，不能当唯一状态来源      | class 绑定，如 `.is-invalid`、`.is-open`       |
| 选择器 | `:is()` / `:where()` 作唯一方案                                      | 禁作唯一 | 较新；`:where()` 降特异性不能当全站优先级唯一方案 | 简化选择器、BEM、短 class                      |
| 选择器 | `@scope`                                                             | 禁作唯一 | 极新，团队认知和支持面不足                        | 组件 scoped / BEM / CSS Modules                |
| 层叠   | `@layer`                                                             | 禁作唯一 | 不支持时层叠顺序会完全变化                        | BEM、命名空间、明确引入顺序                    |
| 布局   | `container-type` / `@container`                                      | 禁作唯一 | 很适合组件级响应式，但不应替代基础响应式方案      | Flex/Grid + `@media`                           |
| 布局   | `subgrid`                                                            | 禁作唯一 | 支持面和团队熟悉度仍需确认                        | 显式 Grid 轨道 / 嵌套 Grid                     |
| 浮层   | CSS Anchor Positioning：`anchor-name`、`position-anchor`、`anchor()` | 禁作唯一 | 适合 tooltip/popover，但仍偏新                    | 绝对定位 + JS 浮层库                           |
| 颜色   | `color-mix()` 作唯一混色                                             | 禁作唯一 | 支持面和设计一致性要确认                          | 预置变量 / 设计 Token / 构建期算色             |
| 颜色   | `light-dark()` 作唯一暗色方案                                        | 禁作唯一 | 较新，企业主题通常还需要手动切换                  | `[data-theme="dark"]` + CSS 变量               |
| 颜色   | Relative Color Syntax，例如 `hsl(from ...)`                          | 禁作唯一 | 极新，维护成本高                                  | 预置 Token / `rgb()` / `hsl()` / `#hex`        |
| 颜色   | `oklch()` / `lab()` / `lch()` 作主色交付                             | 禁作唯一 | 跨端显示和团队工具链要确认                        | `#hex` / `rgb()` / `hsl()` + CSS 变量          |
| 尺寸   | `aspect-ratio` 作唯一等比方案                                        | 禁作唯一 | Safari 14 基线下不稳                              | padding 百分比 / 固定宽高兜底                  |
| 尺寸   | `dvh` / `svh` / `lvh` 作唯一全屏高度                                 | 禁作唯一 | 移动端视口行为复杂，旧环境不一致                  | `100vh` + JS 或固定布局兜底                    |
| 排版   | `text-wrap: balance` / `pretty`                                      | 禁作唯一 | 新，且属于锦上添花                                | `max-width` / 手动换行                         |
| 表单   | `field-sizing: content`                                              | 禁作唯一 | 新，表单场景更依赖组件行为                        | `min-height` + JS / 组件库                     |
| 过渡   | `@starting-style`                                                    | 禁作唯一 | 新，不能承担核心进出场逻辑                        | `@keyframes` + class 切换                      |
| 过渡   | `transition-behavior: allow-discrete`                                | 禁作唯一 | 新，离散属性过渡不适合当核心依赖                  | Transition 组件 / class 切换                   |
| 过渡   | View Transitions：`view-transition-name` 等                          | 禁作唯一 | 跨浏览器和复杂页面状态仍需谨慎                    | 普通 CSS transition / 框架 Transition          |
| 动画   | Scroll-driven Animations：`animation-timeline`、`scroll()`、`view()` | 禁作唯一 | 很新，跨浏览器与移动端表现要验证                  | IntersectionObserver + class                   |
| 动画   | `@property` 驱动自定义属性动画                                       | 禁作唯一 | 支持和调试成本都更高                              | 动 `transform` / `opacity`                     |
| 性能   | `content-visibility: auto` 作布局前提                                | 禁作唯一 | 性能增强不能影响核心可见内容                      | 只作增强；主线不依赖                           |
| 查询   | Style Queries                                                        | 禁作唯一 | 更偏前沿，不能作为企业主线                        | class / data 属性 / 组件状态                   |
| 组织   | 运行时 `@import` 组织大主题                                          | 禁作唯一 | 阻塞渲染，加载顺序难控                            | 构建打包 / 合并 link                           |

## 正确使用方式

特别新的 CSS 如果确实要用，必须满足两点：

```text
1. 不支持时页面仍然可用
2. 有清晰 fallback 或只影响锦上添花的效果
```

推荐：

```css
.form-field.is-invalid .input {
  border-color: var(--color-danger);
}

@supports selector(:has(*)) {
  .form-field:has([aria-invalid='true']) .input {
    border-color: var(--color-danger);
  }
}
```

推荐：

```css
.button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

@supports (color: color-mix(in srgb, red, white)) {
  .button:focus-visible {
    outline-color: color-mix(in srgb, var(--color-primary), transparent 65%);
  }
}
```

不推荐：

```css
.form-field:has(input:invalid) .input {
  border-color: var(--color-danger);
}
```

不推荐原因：如果浏览器不支持 `:has()`，错误态样式直接消失。

## 生产主线

稳定企业 CSS 主线应该回到这些能力：

```text
CSS 变量
Design Token
Flex / Grid
@media
短 class / BEM / 命名空间
hover / active / focus-visible / disabled
data-* / aria-* 状态
主题变量切换
transform / opacity 动画
```

一句话：**特别新的 CSS 可以学，但不要让它承担企业项目的主线责任。**

## Demo 映射

| 禁区项                                                                              | demo 路径                                                                 |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `:has()`、`@layer`、`@container`、`:is()` / `:where()`、View Transitions、`subgrid` | `07-现代特性/`                                                            |
| `content-visibility`                                                                | `07-现代特性/07-content-visibility/`                                      |
| 其余禁区项                                                                          | 暂无专用 demo，见 [`企业CSS主线.md`](./企业CSS主线.md) 的稳定主线替代写法 |
