# review-base-grammar

前端语法与框架复习 Demo 库。每个 HTML 可直接在浏览器打开，无需构建。

## 目录结构

```text
review-base-grammar/
├── index.html          # 总入口（链接到各 Demo）
├── javascript/         # 纯 JavaScript（按学习顺序编号）
│   ├── 01-基础/
│   ├── 02-函数与作用域/
│   ├── 03-对象与原型/
│   ├── 04-ES6+/
│   ├── 05-元编程/
│   ├── 06-浏览器API/
│   └── 07-进阶/
├── vue2/               # Vue 2（libs/ + src/）
├── vue3/               # Vue 3（libs/ + src/）
├── react/              # React 18（libs/ + src/，需 Babel 编译 JSX）
└── demos/              # 交互/UI 小实验
    ├── drag/
    └── svg/
```

## 推荐学习顺序

### JavaScript

1. **01-基础** — 变量、函数、箭头函数、JSON、Symbol  
2. **02-函数与作用域** — 作用域链、闭包  
3. **03-对象与原型** — 原型、原型链、创建对象、访问器  
4. **04-ES6+** — Class、模块、Map/Set/WeakMap/WeakSet  
5. **05-元编程** — `defineProperty`、`Proxy`  
6. **06-浏览器API** — BOM、Observer、拖曳、Tooltips  
7. **07-进阶** — 内存泄漏排查  

### 框架

1. **vue2** → `src/响应式原理/`（手写 Observer + defineProperty）  
2. **vue3** → `src/`（响应式状态、生命周期）  
3. **react** → `src/`（从 `开始.html`、`jsx.html` 入门；脚本引用 `../libs/`）

### 交互 Demo

- **demos/drag** — 原生拖拽列表  
- **demos/svg** — SVG 基础  

## 使用方式

- 用浏览器或 Live Server 打开 `index.html` 或任意 `.html`  
- Vue Demo：引用 `../libs/vue2.js` 或 `vue3.5.js`  
- React Demo：需加载 `react18.js`、`react-dom18.js`、`babel.js`，`<script type="text/babel">` 内写 JSX  

## 约定

- `libs/`：框架运行时，不修改  
- `src/`：学习用 Demo  
- `javascript/` 子目录按 `01`–`07` 编号，便于按序复习  
