# JavaScript

按学习顺序编号的纯 JS 知识点 demo。每个 `.html` 都可以直接在浏览器打开。

## 目录

| 目录 | 知识点 |
|---|---|
| `01-基础/` | 变量（含 null/undefined）、函数、箭头函数、`arguments`、IIFE、严格模式、JSON、Symbol、`typeof` / 类型检测、类型转换、运算符（`\|\|` `&&` `??`）、`eval` / Global、字符串方法、数组方法（迭代、查找、是否改变原数组、去重、扁平化）、Unicode（码点互转、字符等价性 NFC）、Date、parseInt、`encodeURI` / `encodeURIComponent`、escape、正则（含全特性、去标点） |
| `02-函数与作用域/` | 作用域链、柯里化、闭包（基础、内存泄漏与修复）、this 指向（动态绑定、call/apply/bind、new 构造、对象方法脱离） |
| `03-对象与原型/` | 原型、原型链、创建对象（含 delete）、访问器、构造函数、原型属性 vs 实例属性（`hasOwnProperty` / `in`）|
| `04-ES6+/` | 解构、rest/spread、模板字符串、可选链、空值合并、Class（声明、表达式、extends、抽象基类、私有构造函数、静态初始化块）、ES6 模块、CommonJS vs ESM、集合（Map / Set / WeakMap / WeakSet）、异步（Promise、generator、async/await） |
| `05-元编程/` | `defineProperty`（含访问器属性）、`Proxy`（含缺点） |
| `06-浏览器API/` | BOM（hash / history）、DOM 操作、DOM 事件流（捕获 / 冒泡 / 委托）、Observer（Intersection / Mutation）、事件循环、fetch / CORS 跨域、浏览器渲染与性能、Notification、剪贴板、Service Worker、Web Worker（基础 / 命名分发）、存储方案对比、localforage 存储（容量、文件存储）、`requestAnimationFrame`、拖曳手柄、Tooltips |
| `07-进阶/` | 垃圾回收、内存泄漏（含 timeline 实验）、深拷贝、手写 Promise.all、UMD 插件模式、资源预加载（ResLoader）|
| `08-面试题/` | 作用域经典题（var1~6 / function 同名提升）、手写 call/apply/bind/new/instanceof/Promise/EventEmitter、防抖节流、加权随机 |
| `09-Canvas/` | 2D 基础绘图、动画（烟花 + `requestAnimationFrame`） |

## 推荐顺序

`01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → 09`

`08-面试题/作用域` 可以作为学完 02 后的复盘材料。

`08-面试题/手写` 建议分阶段刷：学完 this 后看 call/apply/bind，学完对象与原型后看 new/instanceof，学完 Promise 后看手写 Promise。
