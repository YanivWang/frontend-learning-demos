# 企业 CSS 主线

本文只讨论**原生 CSS 层面的企业生产主线**，不讨论 Sass、Less、Tailwind、CSS Modules、CSS-in-JS 这类预处理、构建或框架方案。

这里的判断来自常见生产组件库的样式体系，例如：

- Vue 生态：Element Plus v2.x、Vant v4.x
- React 生态：Ant Design v5.x
- uni-app 生态：uView Plus v3.x

这些库背后的共同趋势很明确：现代企业 CSS 的核心已经不是“随手写页面样式”，而是围绕**设计系统、组件边界、主题变量、状态样式和可覆盖性**组织样式。

## 一句话结论

目前企业生产项目的原生 CSS 主线是：

```text
CSS 变量 + 语义化 Token + 组件命名空间 class + 状态修饰 class + 低权重可覆盖
```

换句话说，真正值得重点掌握的不是“某个按钮怎么写得好看”，而是：

- 样式值如何抽象成变量
- 变量如何表达主题和设计规范
- 组件 class 如何避免全局污染
- hover、disabled、active、open、error 等状态如何稳定表达
- 用户项目如何安全覆盖组件库默认样式
- 暗黑模式、品牌换肤、局部主题如何在运行时切换

## 主流组件库体现出的 CSS 方向

| 组件库 | CSS 主线 | 典型特征 |
|---|---|---|
| Element Plus v2.x | BEM 命名 + `--el-*` CSS 变量 | 类名结构清晰，主题变量可覆盖，组件内部大量消费 CSS 自定义属性 |
| Vant v4.x | `--van-*` CSS 变量 + 移动端组件 class | 通过 ConfigProvider / CSS 变量做主题定制，强调移动端尺寸、状态和局部覆盖 |
| Ant Design v5.x | Design Token + `--ant-*` CSS 变量能力 | 主题从 Token 出发，强调动态主题、低优先级选择器和可覆盖性 |
| uView Plus v3.x | `--up-*` CSS 变量 + 多端适配 + 运行时主题 | 兼顾 H5、小程序、App、nvue，强调语义变量、暗黑模式和跨端限制 |

这些库的内部实现不同，但落到原生 CSS 的学习重点非常接近：**变量化、语义化、组件化、状态化、低耦合覆盖**。

## 兼容性结论

这份文档考虑的是**现代企业项目的主流兼容基线**，明确**不兼容 IE**，也不为 IE 设计降级方案。

当前仓库 CSS 模块的基线是：

```text
Chrome >= 87
Safari >= 14
Firefox >= 78
Edge >= 88
not IE 11
```

这意味着：

- 不考虑 IE 9 / IE 10 / IE 11
- 不为了 IE 放弃 CSS 变量
- 不为了 IE 回退到 float、条件注释、CSS hack 这类旧路线
- 如果业务明确要求兼容 IE，需要单独写一套“传统 CSS 兼容方案”，不能把它混进本文主线

但要注意：企业 CSS 主线只保留稳定能力，特别新的 CSS 语法不写进本文主线。

| 能力 | 生产定位 | 兼容性判断 |
|---|---|---|
| CSS 变量 `--*` / `var()` | 地基能力 | 现代企业项目可作为硬地板；IE 不支持，因此本文直接排除 IE |
| Flex | 地基能力 | 可以放心作为企业布局主力 |
| Grid | 地基能力 | 现代浏览器可用；极老浏览器或旧 WebView 需要降级布局 |
| `@media` | 地基能力 | 响应式项目必备，兼容性稳定 |
| `rem` / `vw` / `vh` | 地基能力 | 移动端常用，但要关注地址栏、键盘、视口变化问题 |
| `env(safe-area-inset-*)` | 移动端增强 | iOS 安全区常用；非刘海屏或不支持时通常表现为 0 或无效果 |
| `:focus-visible` | 交互增强 | 适合现代可访问性交互；旧环境要确保没有丢失基础 focus 样式 |

所以本文的正确读法是：

```text
企业 CSS 主线：CSS 变量 / Token / 命名空间 / 状态 / 覆盖策略
企业兼容策略：不兼容 IE；稳定能力直接使用，特别新语法移入 禁止使用CSS.md
```

特别新的 CSS 语法不进入本文主线，统一放到 [`禁止使用CSS.md`](./禁止使用CSS.md) 判断是否禁用或只允许渐进增强。

## 1. CSS 变量是企业主题系统的地基

现代组件库最常见的样式入口是 CSS Custom Properties，也就是 `--xxx` 变量。

典型写法：

```css
:root {
  --el-color-primary: #409eff;
  --van-primary-color: #1989fa;
  --ant-color-primary: #1677ff;
  --up-primary: #2979ff;
}
```

组件内部不会到处写死颜色，而是消费变量：

```css
.button--primary {
  color: var(--button-primary-text-color);
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}
```

这样做的核心价值是：

- **统一**：一处变量控制全局视觉规范
- **可换肤**：品牌色、暗黑模式、节日主题可以成组切换
- **可局部覆盖**：某个页面、弹窗、业务模块可以有自己的主题
- **运行时可变**：不重新构建也能通过 JS 或 class 切换变量
- **组件解耦**：组件只关心变量含义，不关心具体色值

生产项目中，变量通常不应该只叫 `--blue`、`--red`，而应该逐步转向语义名。

不推荐：

```css
:root {
  --blue: #1677ff;
  --gray-3: #d9d9d9;
}
```

更推荐：

```css
:root {
  --color-primary: #1677ff;
  --color-text-primary: #1f2937;
  --color-text-secondary: #6b7280;
  --color-border: #d9d9d9;
  --color-bg-page: #f5f7fa;
  --color-bg-container: #ffffff;
}
```

原因很简单：企业项目关心的是“这个值在业务 UI 里扮演什么角色”，而不是“这个值看起来是什么颜色”。

## 2. Design Token 是变量的上层组织方式

CSS 变量是技术形式，Design Token 是组织方式。

一个企业项目常见的 Token 会按这些维度拆：

```text
颜色：主色、成功、警告、危险、信息、文本、边框、背景
字号：标题、正文、辅助说明、数字
间距：页面、区块、表单项、按钮内边距
圆角：小圆角、普通圆角、大圆角、胶囊
阴影：浮层、卡片、弹窗、下拉菜单
层级：遮罩、弹窗、通知、吸顶
动效：持续时间、缓动函数
```

对应到 CSS 可以这样写：

```css
:root {
  --color-primary: #1677ff;
  --color-success: #16a34a;
  --color-warning: #f59e0b;
  --color-danger: #dc2626;

  --color-text-primary: #111827;
  --color-text-secondary: #4b5563;
  --color-text-placeholder: #9ca3af;

  --color-border: #d1d5db;
  --color-bg-page: #f3f4f6;
  --color-bg-container: #ffffff;

  --font-size-body: 14px;
  --font-size-title: 16px;

  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;

  --shadow-popup: 0 8px 24px rgb(15 23 42 / 12%);
  --duration-fast: 120ms;
  --duration-base: 200ms;
}
```

组件再消费这些语义变量：

```css
.app-card {
  color: var(--color-text-primary);
  background: var(--color-bg-container);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-popup);
}
```

这就是现代企业 CSS 和普通页面 CSS 最大的区别之一：**普通页面写样式结果，企业项目写样式规则和设计约束**。

## 3. 组件命名空间是避免污染的基础

组件库一定会给 class 加命名空间。

常见形式：

```css
.el-button {}
.van-button {}
.ant-btn {}
.up-button {}
```

业务项目也应该有自己的命名空间，例如：

```css
.app-page {}
.app-card {}
.app-toolbar {}
.app-form {}
.admin-table {}
.shop-product-card {}
```

命名空间的目的不是“名字好看”，而是避免这些问题：

- `.button` 影响了全站所有按钮
- `.title` 和组件库内部类名冲突
- 页面 A 的 `.card` 改坏页面 B
- 覆盖组件库样式时选择器越写越长
- 后期没人敢删 CSS

不推荐：

```css
.box {}
.title {}
.item {}
.left {}
.right {}
```

更推荐：

```css
.order-filter {}
.order-filter__field {}
.order-filter__actions {}

.product-card {}
.product-card__cover {}
.product-card__title {}
.product-card__price {}
```

这类写法和 BEM 思想接近。Element Plus 的类名体系就明显带有 BEM 风格。

## 4. 修饰符 class 表达类型和状态

企业组件库通常不会为每种状态重新发明一个组件，而是通过修饰符 class 控制样式。

典型形式：

```css
.button {}
.button--primary {}
.button--danger {}
.button--large {}
.button--disabled {}
.button--loading {}
```

组件结构可以保持稳定：

```html
<button class="button button--primary">保存</button>
<button class="button button--danger button--disabled">删除</button>
```

对应 CSS：

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 32px;
  padding: 0 14px;
  color: var(--button-text-color);
  background: var(--button-bg);
  border: 1px solid var(--button-border-color);
  border-radius: var(--radius-md);
  transition:
    background-color var(--duration-fast),
    border-color var(--duration-fast),
    color var(--duration-fast);
}

.button--primary {
  --button-text-color: #fff;
  --button-bg: var(--color-primary);
  --button-border-color: var(--color-primary);
}

.button--danger {
  --button-text-color: #fff;
  --button-bg: var(--color-danger);
  --button-border-color: var(--color-danger);
}

.button--disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
```

注意这里有一个很关键的企业写法：**修饰符不一定直接写很多属性，也可以只改组件变量**。

这种写法更容易维护，因为基础组件只定义一次，类型和状态只覆盖变量。

## 5. 状态选择器要面向真实交互

企业项目里常见的状态不只是 `:hover`，还包括键盘焦点、禁用、展开、选中、校验失败、加载中等。

常用选择器包括：

```css
:hover
:active
:focus-visible
:disabled
[disabled]
[aria-disabled="true"]
[aria-expanded="true"]
[aria-selected="true"]
[data-state="open"]
[data-invalid="true"]
```

示例：

```css
.select-trigger:hover {
  border-color: var(--color-primary);
}

.select-trigger:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.select-trigger[aria-expanded="true"] {
  border-color: var(--color-primary);
}

.form-field[data-invalid="true"] .input {
  border-color: var(--color-danger);
}
```

这类写法比到处追加 `.active`、`.error` 更稳定，因为它能和组件语义、可访问性状态保持一致。

尤其是下面这些状态，企业项目一定要会：

- `:focus-visible`：键盘访问时显示焦点，不干扰鼠标点击体验
- `[aria-expanded="true"]`：下拉、菜单、折叠面板打开态
- `[aria-selected="true"]`：Tab、菜单、选项选中态
- `[aria-disabled="true"]`：非原生按钮或复杂组件的禁用态
- `[data-state="open"]`：组件库常见的内部状态标记

## 6. 低权重和可覆盖性是组件库 CSS 的生命线

企业项目不是写完就结束。组件库的 CSS 必须允许业务方覆盖。

所以现代组件库会刻意控制选择器权重。

不推荐组件库内部这样写：

```css
body .app .page .dialog .button.button-primary:hover span {
  color: red;
}
```

这种选择器权重太高，业务方很难覆盖，最后只能写更长选择器或者 `!important`。

更推荐：

```css
.button {
  color: var(--button-text-color);
}

.button--primary {
  --button-text-color: #fff;
}
```

这里的重点不是使用新选择器，而是让默认样式保持短选择器、低复杂度、低耦合，方便业务项目用变量或业务 class 覆盖。

业务项目里也应该有这个意识：

- 默认样式权重要低
- 状态样式权重要可预测
- 变量覆盖优先于强行覆盖属性
- 少用 ID 选择器
- 少写过深后代选择器
- 尽量不用 `!important`

## 7. 局部主题覆盖比全局覆盖更安全

CSS 变量的一个强大能力是可以在局部作用域覆盖。

全局主题：

```css
:root {
  --color-primary: #1677ff;
}
```

局部主题：

```css
.marketing-page {
  --color-primary: #7c3aed;
  --color-bg-page: #faf5ff;
}

.admin-page {
  --color-primary: #0f766e;
  --color-bg-page: #f8fafc;
}
```

组件内部仍然只写：

```css
.button--primary {
  background: var(--color-primary);
}
```

最终不同页面会自动呈现不同主题。

这就是为什么 Element Plus、Vant、Ant Design、uView Plus 都很重视 CSS 变量：变量天然支持继承和局部覆盖，适合企业复杂业务。

## 8. 暗黑模式本质是变量切换

现代企业项目做暗黑模式，主线不是复制一套完整 CSS，而是切换变量。

推荐结构：

```css
:root {
  --color-text-primary: #111827;
  --color-text-secondary: #4b5563;
  --color-bg-page: #f3f4f6;
  --color-bg-container: #ffffff;
  --color-border: #d1d5db;
}

[data-theme="dark"] {
  --color-text-primary: #f9fafb;
  --color-text-secondary: #d1d5db;
  --color-bg-page: #0f172a;
  --color-bg-container: #111827;
  --color-border: #374151;
}
```

组件不用关心当前是亮色还是暗色：

```css
.panel {
  color: var(--color-text-primary);
  background: var(--color-bg-container);
  border: 1px solid var(--color-border);
}
```

也可以结合系统主题：

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-text-primary: #f9fafb;
    --color-bg-page: #0f172a;
    --color-bg-container: #111827;
  }
}
```

但生产项目通常还会提供手动切换，所以更常见的是 `data-theme="dark"`、`.theme-dark` 或组件库的 ConfigProvider。

## 9. 移动端和跨端项目还要关注单位与安全区

Vant 和 uView Plus 这类移动端/跨端组件库，会让 CSS 主线多出几个重点：

- `rem`
- `vw` / `vh`
- `rpx`
- `env(safe-area-inset-bottom)`
- 1px 边框
- 滚动容器
- 触摸反馈
- fixed 元素和键盘弹起问题

常见写法：

```css
.page-footer {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  padding-bottom: env(safe-area-inset-bottom);
  background: var(--color-bg-container);
}
```

移动端组件里的按钮、输入框、弹窗、底部操作栏，很容易遇到安全区问题。企业项目不能只看桌面浏览器效果。

## 10. 组件库覆盖样式的推荐顺序

当业务项目需要改组件库样式时，优先级建议是：

```text
优先覆盖 CSS 变量
-> 使用组件库提供的主题配置
-> 添加业务 class 做局部覆盖
-> 写低权重、短选择器覆盖
-> 最后才考虑 !important
```

推荐：

```css
.order-page {
  --el-color-primary: #0f766e;
  --van-primary-color: #0f766e;
}
```

也可以给某个业务区域局部换色：

```css
.danger-zone {
  --button-bg: var(--color-danger);
  --button-border-color: var(--color-danger);
}
```

不推荐：

```css
.order-page .el-button.el-button--primary span {
  color: #fff !important;
}
```

这类写法短期能生效，长期会制造维护成本。

## 11. 企业 CSS 学习优先级

如果目标是看懂和写好现代企业项目里的原生 CSS，建议按这个顺序补齐：

```text
1. 盒模型、文档流、继承、层叠
2. 选择器、优先级、伪类、伪元素
3. Flex
4. Grid
5. position、z-index、层叠上下文
6. CSS 变量、var()、变量继承、局部覆盖
7. Design Token 命名方式
8. BEM / 组件 class 命名
9. hover、active、focus-visible、disabled
10. data-* / aria-* 状态选择器
11. @media、clamp()、min()、max()
12. 暗黑模式和主题切换
13. 移动端 rem、vw、rpx、安全区
14. transition、transform、opacity 动画
15. 重排、重绘、合成层、will-change
```

其中最能代表现代企业 CSS 的是这几项：

```text
CSS 变量
Design Token
组件命名空间
状态选择器
暗黑模式变量切换
```

## 12. 本仓库 01-06 demo 允许的稳定语法清单

为了让 `01-基础` 到 `06-性能` 的 demo 有明确边界，本仓库把下列稳定语法视为主线范围。未出现在本清单、也未在上文解释的 CSS 新语法，不应放进 01-06；如果属于 [`禁止使用CSS.md`](./禁止使用CSS.md) 的禁区项，只能放到 `07-现代特性/`。

```text
基础盒模型：box-sizing / width / height / margin / padding / border / overflow
显示与文档流：display: block / inline / inline-block / none / flex / grid / flow-root
选择器：class / id / 属性选择器 / 伪类 / 伪元素 / 后代与子代选择器
布局：Flex / Grid / float / clear / position / z-index / sticky
Grid 轨道：fr / repeat() / minmax() / auto-fit / auto-fill
BFC 与多列：flow-root / overflow / column-count / column-gap / break-inside
响应式：@media / rem / vw / vh / calc() / clamp() / min() / max() / env(safe-area-inset-*)
文本与图片：white-space / text-overflow / vertical-align / object-fit
视觉效果：border-radius / box-shadow / filter / drop-shadow() / background-blend-mode
渐变：linear-gradient() / radial-gradient() / conic-gradient()
动画：transition / animation / @keyframes / transform / opacity / steps()
性能：will-change / contain: layout paint
```

## 13. 常见反模式

### 反模式一：到处写死颜色

不推荐：

```css
.card-title {
  color: #333;
}
```

推荐：

```css
.card-title {
  color: var(--color-text-primary);
}
```

### 反模式二：全局 class 太通用

不推荐：

```css
.title {}
.content {}
.button {}
```

推荐：

```css
.order-card__title {}
.order-card__content {}
.order-card__button {}
```

### 反模式三：选择器过深

不推荐：

```css
.page .section .card .header .title span {
  color: var(--color-primary);
}
```

推荐：

```css
.card-title {
  color: var(--color-primary);
}
```

### 反模式四：用 `!important` 解决所有覆盖问题

不推荐：

```css
.my-button {
  color: red !important;
}
```

推荐：

```css
.my-button {
  --button-text-color: red;
}
```

或者在明确业务作用域下覆盖：

```css
.profile-page .button {
  color: red;
}
```

### 反模式五：暗黑模式复制整套组件 CSS

不推荐：

```css
.card {
  color: #111;
  background: #fff;
}

.dark .card {
  color: #fff;
  background: #111;
}
```

推荐：

```css
:root {
  --card-text-color: #111;
  --card-bg: #fff;
}

[data-theme="dark"] {
  --card-text-color: #fff;
  --card-bg: #111;
}

.card {
  color: var(--card-text-color);
  background: var(--card-bg);
}
```

## 14. 一个接近组件库风格的按钮示例

下面这个示例体现了企业组件库常见 CSS 思路：基础类负责结构，变量负责主题，修饰符负责类型，状态选择器负责交互。

```css
:root {
  --color-primary: #1677ff;
  --color-danger: #dc2626;
  --color-text-disabled: #9ca3af;
  --color-bg-disabled: #f3f4f6;
  --radius-md: 6px;
  --duration-fast: 120ms;
}

.ui-button {
  --button-text-color: #1f2937;
  --button-bg: #fff;
  --button-border-color: #d1d5db;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 72px;
  height: 32px;
  padding: 0 14px;
  color: var(--button-text-color);
  font: inherit;
  background: var(--button-bg);
  border: 1px solid var(--button-border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    color var(--duration-fast),
    background-color var(--duration-fast),
    border-color var(--duration-fast),
    box-shadow var(--duration-fast);
}

.ui-button--primary {
  --button-text-color: #fff;
  --button-bg: var(--color-primary);
  --button-border-color: var(--color-primary);
}

.ui-button--danger {
  --button-text-color: #fff;
  --button-bg: var(--color-danger);
  --button-border-color: var(--color-danger);
}

.ui-button:hover {
  filter: brightness(1.04);
}

.ui-button:active {
  filter: brightness(0.96);
}

.ui-button:focus-visible {
  outline: 2px solid var(--button-border-color);
  outline-offset: 2px;
}

.ui-button:disabled,
.ui-button[aria-disabled="true"] {
  --button-text-color: var(--color-text-disabled);
  --button-bg: var(--color-bg-disabled);
  --button-border-color: var(--color-bg-disabled);

  cursor: not-allowed;
  filter: none;
}
```

这个例子并不是为了让你复制一个按钮，而是为了说明组件库 CSS 的组织方式：

- 基础 class：`.ui-button`
- 类型 class：`.ui-button--primary`
- 状态选择器：`:hover`、`:active`、`:focus-visible`、`:disabled`
- 变量入口：`--button-*`
- 全局 Token：`--color-*`、`--radius-*`、`--duration-*`

## 15. 最终判断

如果只看原生 CSS，企业项目真正常用、长期稳定、值得深入掌握的主线是：

```text
布局：Flex / Grid / position / z-index / stacking context
响应式：@media / clamp() / 移动端安全区
主题：CSS 变量 / Design Token / 暗黑模式
组件：命名空间 class / BEM / 修饰符 class
状态：伪类 / data-* / aria-*
覆盖：低权重选择器 / 短选择器 / 变量覆盖
性能：transform / opacity / will-change
```

Element Plus、Vant、Ant Design、uView Plus 这些库给出的共同信号是：

> 企业 CSS 的主线不是“写更多 CSS”，而是“让 CSS 有边界、有变量、有状态、有主题、有可覆盖性”。
