# js-base-grammar

前端语法与框架复习 Demo 库。每个 HTML 可直接在浏览器打开，无需构建。

## 目录结构

```text
.
├── index.html          # 总入口（链接到各 Demo）
├── javascript/         # 纯 JavaScript（按学习顺序编号）
│   ├── 01-基础/
│   ├── 02-函数与作用域/
│   ├── 03-对象与原型/
│   ├── 04-ES6+/
│   │   └── 异步/       # Promise、generator、async
│   ├── 05-元编程/
│   ├── 06-浏览器API/
│   ├── 07-进阶/
│   ├── 08-面试题/
│   └── 09-Canvas/      # Canvas 2D 绘图
├── css/                # CSS 练习（布局 / 动画 / 视觉效果 / 响应式）
│   ├── 01-布局/
│   ├── 02-动画/
│   ├── 03-视觉效果/
│   └── 04-响应式/
├── vue2/               # Vue 2（libs/ + src/）
├── vue3/               # Vue 3（libs/ + src/）
├── react/              # React 18（libs/ + src/，需 Babel 编译 JSX）
└── demos/              # 交互/UI 小实验
    ├── drag/
    ├── svg/
    └── viewpager/
```

## 推荐学习顺序

### JavaScript

1. **01-基础** — 变量（含 null/undefined）、函数、箭头函数、`arguments`、IIFE、严格模式、JSON、Symbol、typeof / 类型检测、运算符（`||`/`&&`/`??`）、`eval`/Global、字符串方法（含原始值 vs 包装对象、sort 打乱、replace 正则）、Unicode、Date、parseInt、encode/escape、正则（含全特性、去标点）
2. **02-函数与作用域** — 作用域链、闭包、柯里化、this 指向
3. **03-对象与原型** — 原型、原型链（组合继承）、创建对象（含 delete 删除属性）、访问器、构造函数、原型属性 vs 实例属性（hasOwnProperty / in）
4. **04-ES6+** — Class、模块、Map/Set/WeakMap/WeakSet、Promise/async/generator
5. **05-元编程** — `defineProperty`、`Proxy`
6. **06-浏览器API** — BOM、Observer、事件循环、DOM 操作、Notification、剪贴板、Service Worker、Web Worker、localforage、拖曳、Tooltips
7. **07-进阶** — 内存泄漏、深拷贝、手写 Promise、UMD 插件模式、资源预加载（ResLoader）
8. **08-面试题** — 作用域经典题（var1-6）、防抖/节流、加权随机
9. **09-Canvas** — 2D 基础绘图、动画（烟花 + requestAnimationFrame）

### 框架

1. **vue2** → `src/响应式原理/` → `src/基础语法/` → `src/组件/` → `src/路由与状态/`
2. **vue3** → `src/`（响应式状态、生命周期）
3. **react** → `src/`（从 `开始.html`、`jsx.html` 入门；脚本引用 `../libs/`）

### CSS

1. **01-布局** — Grid、rem 适配、瀑布流、滚动表格（thead 固定）
2. **02-动画** — Loading、@keyframes、NProgress、光标闪烁、展开折叠、序列帧（精灵图）
3. **03-视觉效果** — 百分比圆环、3D 按钮、阴影、混合模式、Tooltip
4. **04-响应式** — Media Queries、vw/vh
5. **CSS 选择器** — 优先级与各种选择器一览

### 交互 Demo

- **demos/drag** — 原生拖拽列表
- **demos/svg** — SVG 基础
- **demos/viewpager** — ViewPager 翻页（含多种缓动插值器）

## 使用方式

- 用浏览器或 Live Server 打开 `index.html` 或任意 `.html`  
- Vue Demo：引用 `../libs/vue2.js`；路由/Vuex 需 `vue-router.js`、`vuex.js`  
- React Demo：需加载 `react18.js`、`react-dom18.js`、`babel.js`，`<script type="text/babel">` 内写 JSX  

## 约定

- `libs/`：框架运行时，不修改
- `src/`：学习用 Demo
- `javascript/` 子目录按 `01`–`09` 编号，便于按序复习
- 所有依赖统一改为本地 `libs/` 引用（`watch.html` 等少数 Demo 仍依赖 axios CDN）
- 维护原则：以后新增内容直接在本目录下添加，保持目录树清晰
