# JavaScript

按学习顺序编号的纯 JS 知识点 demo，共 **120** 个 `.html` 文件。每个文件都可以直接在浏览器打开，无需构建。

每个 demo 在 `<!DOCTYPE html>` 前有统一头注释（`分类` / `主题` / `要点`），详见 [`../../CONVENTIONS.md`](../../CONVENTIONS.md) §4。

## 目录概览

| 目录 | 数量 | 知识点 |
|---|---:|---|
| `01-基础/` | 26 | 变量（含 null/undefined）、函数、箭头函数、`arguments`、IIFE、严格模式、JSON、Symbol、`typeof` / 类型检测、类型转换、运算符（`\|\|` `&&` `??`）、`eval` / Global、字符串方法、数组方法（迭代、查找、是否改变原数组、去重、扁平化）、Unicode（码点互转、字符等价性 NFC）、Date、parseInt、`encodeURI` / `encodeURIComponent`、escape、正则（含全特性、去标点） |
| `02-函数与作用域/` | 8 | 作用域链、柯里化、闭包（基础、内存泄漏与修复）、this 指向（动态绑定、call/apply/bind、new 构造、对象方法脱离） |
| `03-对象与原型/` | 7 | 原型、原型链、创建对象（含 delete）、访问器、构造函数、原型属性 vs 实例属性（`hasOwnProperty` / `in`） |
| `04-ES6+/` | 26 | 解构、rest/spread、模板字符串、可选链、空值合并、Class（声明、表达式、extends、抽象基类、私有构造函数、静态初始化块）、ES6 模块、CommonJS vs ESM、集合（Map / Set / WeakMap / WeakSet）、异步（Promise、generator、async/await） |
| `05-元编程/` | 4 | `defineProperty`（含访问器属性）、`Proxy`（含缺点） |
| `06-浏览器API/` | 25 | BOM（hash / history）、DOM 操作、DOM 事件流（捕获 / 冒泡 / 委托）、Observer（Intersection / Mutation）、事件循环、fetch / CORS 跨域、浏览器渲染与性能、Notification、剪贴板、Service Worker、Web Worker（基础 / 命名分发）、存储方案对比、localforage 存储（容量、文件存储）、`requestAnimationFrame`、拖曳手柄、Tooltips |
| `07-进阶/` | 8 | 垃圾回收、内存泄漏（含 timeline 实验）、深拷贝、手写 Promise.all、UMD 插件模式、资源预加载（ResLoader） |
| `08-面试题/` | 14 | 作用域经典题（var1~6 / function 同名提升）、手写 call/apply/bind/new/instanceof/Promise/EventEmitter、防抖节流、加权随机 |
| `09-Canvas/` | 2 | 2D 基础绘图、动画（烟花 + `requestAnimationFrame`） |

## 推荐顺序

`01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → 09`

- `08-面试题/作用域` 可以在学完 `02` 后作复盘。
- `08-面试题/手写` 建议分阶段刷：学完 this 后看 call/apply/bind，学完对象与原型后看 new/instanceof，学完 Promise 后看手写 Promise。

更细的补齐记录见 [`../../docs/plans/JS面试知识补齐计划.md`](../../docs/plans/JS面试知识补齐计划.md)。

## 完整 demo 清单

<!-- DEMO_TABLE_START -->

共 **124** 个 demo（由 `node scripts/sync-readmes.mjs` 根据头注释自动生成，请勿手改表格正文）。

| 文件 | 主题 |
|---|---|
| `01-基础/变量.html` | 变量声明、提升、null vs undefined、constructor |
| `01-基础/变量进阶.html` | var / let / const 变量提升与暂时性死区 |
| `01-基础/函数.html` | 函数声明的最小可运行示例 |
| `01-基础/函数进阶.html` | 函数声明、函数表达式、Function 构造器、严格模式 this |
| `01-基础/箭头函数.html` | 箭头函数与普通函数差异 |
| `01-基础/类型转换.html` | 类型转换、相等比较与浮点精度 |
| `01-基础/数组方法.html` | 数组方法、是否改变原数组与常见手写 |
| `01-基础/严格模式.html` | 严格模式 use strict |
| `01-基础/运算符.html` | 逻辑运算符 \|\| && ?? 与短路求值 |
| `01-基础/正则/01-正则-URL路径匹配.html` | 用正则匹配 URL 中的语言段与路径段 |
| `01-基础/正则/02-正则-URL与图片格式.html` | 用正则识别 URL 与图片格式 |
| `01-基础/正则/03-正则-全特性.html` | 正则表达式全特性速查 |
| `01-基础/正则/04-正则-去标点.html` | 正则去除多语言标点 |
| `01-基础/字符串方法.html` | 字符串方法大全（截取 / 拼接 / 替换 / 编码） |
| `01-基础/arguments.html` | arguments 类数组对象与剩余参数 |
| `01-基础/Date.html` | Date 常用工具：月初/月末、格式化、时间差 |
| `01-基础/encode-URI编码.html` | URI 编码 API（encodeURI / encodeURIComponent / decode） |
| `01-基础/escape.html` | 字符串中反斜杠转义与 JSON 序列化 |
| `01-基础/eval与Global.html` | eval 与全局对象 window |
| `01-基础/IIFE.html` | IIFE 立即执行函数表达式 |
| `01-基础/JSON.html` | JSON.stringify 进阶用法 |
| `01-基础/parseInt.html` | parseInt 全面用法与经典坑 |
| `01-基础/symbol.html` | Symbol 原始类型与典型用法 |
| `01-基础/typeof.html` | 类型检测三板斧 - typeof / instanceof / toString |
| `01-基础/unicode-字符等价性.html` | Unicode 字符等价性（NFC / NFD） |
| `01-基础/unicode.html` | Unicode 码点与字符串互转 |
| `02-函数与作用域/01-作用域链.html` | 作用域链与变量查找 |
| `02-函数与作用域/02-柯里化.html` | 函数柯里化基础 |
| `02-函数与作用域/闭包/01-闭包-作用域链与变量提升.html` | 闭包的作用域链与变量提升 |
| `02-函数与作用域/闭包/02-闭包-内存泄漏与修复.html` | 闭包导致的内存泄漏与修复手段 |
| `02-函数与作用域/this指向/01-this-动态绑定.html` | this 的动态绑定 |
| `02-函数与作用域/this指向/02-this-call-apply-bind.html` | 显式绑定 this：call / apply / bind |
| `02-函数与作用域/this指向/03-this-new构造函数.html` | new 调用构造函数时 this 的行为 |
| `02-函数与作用域/this指向/04-this-对象方法与脱离.html` | 方法被「赋值出去」后 this 的脱离 |
| `03-对象与原型/创建对象.html` | 创建对象的多种方式 |
| `03-对象与原型/访问器.html` | 访问器属性 get/set |
| `03-对象与原型/构造函数.html` | 构造函数最基本用法 |
| `03-对象与原型/函数也是对象.html` | 函数也是对象 |
| `03-对象与原型/原型.html` | 原型对象（prototype）与共享属性 |
| `03-对象与原型/原型链.html` | 原型链与组合继承 |
| `03-对象与原型/原型属性vs实例属性.html` | 原型属性 vs 实例属性、hasOwnProperty 与 in |
| `04-ES6+/集合/Map.html` | Map 键值对集合 |
| `04-ES6+/集合/Set.html` | Set 值的集合 |
| `04-ES6+/集合/WeakMap.html` | WeakMap 弱引用映射 |
| `04-ES6+/集合/WeakSet.html` | WeakSet 弱引用集合 |
| `04-ES6+/解构展开与模板字符串.html` | 解构、rest/spread、模板字符串、可选链与空值合并 |
| `04-ES6+/模块化/CommonJS-vs-ESM.html` | CommonJS 与 ES Module 对比 |
| `04-ES6+/异步/generator与async/01-generator-基础yield与next.html` | generator 基础：yield 与 next |
| `04-ES6+/异步/generator与async/02-async-await-串行流程.html` | async/await 串行流程最小演示 |
| `04-ES6+/异步/generator与async/03-async-是generator语法糖.html` | async 是 generator + 自动执行器的语法糖 |
| `04-ES6+/异步/generator与async/04-async-错误重试机制.html` | async 错误重试机制 |
| `04-ES6+/异步/generator与async/05-async-await-表达式与异常.html` | await 表达式与异常处理 |
| `04-ES6+/异步/generator与async/06-async-声明形式与异常综合.html` | async 函数的多种声明形式与异常综合 |
| `04-ES6+/异步/Promise/01-Promise-all并发与then串行.html` | Promise.all 并发 与 then 串行 |
| `04-ES6+/异步/Promise/02-Promise-与事件循环.html` | Promise + async/await 与事件循环（宏任务/微任务） |
| `04-ES6+/异步/Promise/03-Promise-包装图片预加载.html` | 用 Promise 把图片预加载封装成同步风格 |
| `04-ES6+/异步/Promise/04-Promise-执行函数与状态机.html` | Promise 的执行函数（executor）与状态机 |
| `04-ES6+/异步/Promise/05-Promise-串行三种写法.html` | 三种 Promise 串行写法对比 |
| `04-ES6+/class详解/抽象基类.html` | 用 new.target 实现抽象基类 |
| `04-ES6+/class详解/类与原型.html` | 类的字段、方法与原型对象关系 |
| `04-ES6+/class详解/私有构造函数.html` | 用静态私有标志位模拟「私有构造函数」 |
| `04-ES6+/class详解/class静态初始化块.html` | 静态初始化块 static { ... } |
| `04-ES6+/class详解/class静态初始化块extends.html` | 静态初始化块在继承场景的特性 |
| `04-ES6+/class详解/class类表达式.html` | class 表达式（匿名/具名） |
| `04-ES6+/class详解/class类声明.html` | class 声明的关键特性 |
| `04-ES6+/class详解/extends.html` | extends 继承与 super 调用 |
| `04-ES6+/ES6模块/index.html` | ES Module import/export 静态导入与动态导入 |
| `05-元编程/代理的缺点.html` | Proxy 的局限性 |
| `05-元编程/defineProperty.html` | Object.defineProperty 数据属性 |
| `05-元编程/defineProperty访问器属性.html` | defineProperty 访问器属性 get/set |
| `05-元编程/proxy.html` | Proxy 代理与基本拦截器 |
| `06-浏览器API/存储/00-存储方案对比.html` | Cookie、sessionStorage、localStorage、IndexedDB 对比 |
| `06-浏览器API/存储/01-localforage-基础API.html` | localforage 基础 API |
| `06-浏览器API/存储/02-获取已用容量.html` | 通过 iterate 统计已用容量 |
| `06-浏览器API/存储/03-获取剩余容量.html` | 用 localforage.iterate 估算剩余容量 |
| `06-浏览器API/存储/04-封装-获取存储容量.html` | 封装获取存储容量（已用 / 剩余） |
| `06-浏览器API/存储/05-测试最大容量.html` | 测试 localforage 最大可写容量 |
| `06-浏览器API/存储/06-存储文件-FileReader.html` | FileReader 读取文件并存入 localforage |
| `06-浏览器API/剪贴板.html` | 文本复制到剪贴板的新旧两种方案 |
| `06-浏览器API/浏览器渲染与性能.html` | 浏览器渲染流程、重排、重绘与性能优化 |
| `06-浏览器API/事件模型/01-事件循环.html` | 事件循环综合（同步 + Promise + async/await + setTimeout） |
| `06-浏览器API/事件模型/02-dom事件-冒泡捕获委托.html` | DOM 事件流：捕获、目标、冒泡与事件委托 |
| `06-浏览器API/事件模型/03-Node与浏览器事件循环对比.html` | Node.js 与浏览器事件循环对比 |
| `06-浏览器API/拖曳手柄/01-贴边侧栏拖拽.html` | 拖拽调整侧栏宽度（Vue3 + requestAnimationFrame 版） |
| `06-浏览器API/拖曳手柄/02-悬浮侧栏拖拽.html` | 悬浮侧栏拖拽 V2（带圆角与外边距） |
| `06-浏览器API/BOM/hash.html` | hash 路由的基本演示 |
| `06-浏览器API/BOM/history.html` | history pushState / replaceState 与 popstate |
| `06-浏览器API/DOM操作.html` | DOM 基础操作（选择 / 属性 / 数据集 / 类） |
| `06-浏览器API/fetch与跨域.html` | fetch 基础、错误处理与 CORS 跨域 |
| `06-浏览器API/HTTP缓存.html` | HTTP 强缓存与协商缓存 |
| `06-浏览器API/IntersectionObserver.html` | IntersectionObserver 实现图片懒加载 |
| `06-浏览器API/MutationObserver.html` | MutationObserver 监听 DOM 变化 |
| `06-浏览器API/Notification.html` | Notification 桌面通知 |
| `06-浏览器API/requestAnimation.html` | requestAnimationFrame 与递归调用对比 |
| `06-浏览器API/ServiceWorker.html` | Service Worker 基础注册 |
| `06-浏览器API/toolTips/index.html` | Vue3 实现可交互的 Tooltip |
| `06-浏览器API/WebWorker/01-基础/01-Worker-基础与子脚本.html` | Worker 基础与子脚本 |
| `06-浏览器API/WebWorker/02-命名与消息分发/01-Worker-命名与消息分发.html` | 给 Worker 命名 + 用消息体分发不同任务 |
| `07-进阶/安全/XSS与CSRF.html` | XSS 与 CSRF 防护 |
| `07-进阶/垃圾回收.html` | 垃圾回收、可达性、标记清除与分代回收 |
| `07-进阶/内存泄漏/index.html` | 全局大对象引用导致的内存占用 |
| `07-进阶/内存泄漏/leakSuccess.html` | 通过手动置 null 释放闭包引用 |
| `07-进阶/内存泄漏/timeline.html` | 用 Performance 面板观察 DOM 节点 + 内存增长 |
| `07-进阶/深拷贝.html` | 浅拷贝 vs 深拷贝 |
| `07-进阶/手写Promise/promiseAll.html` | 手写 Promise.all |
| `07-进阶/资源预加载/index.html` | 用 new Image / new Audio 触发浏览器预加载 |
| `07-进阶/UMD插件模式/index.html` | UMD（Universal Module Definition）演示 |
| `08-面试题/防抖节流.html` | 防抖（debounce）与节流（throttle） |
| `08-面试题/加权随机.html` | 加权随机（按概率抽奖） |
| `08-面试题/手写/01-call-apply.html` | 手写 call / apply |
| `08-面试题/手写/02-bind.html` | 手写 bind |
| `08-面试题/手写/03-new.html` | 手写 new |
| `08-面试题/手写/04-instanceof.html` | 手写 instanceof |
| `08-面试题/手写/05-Promise.html` | 面试简化版 Promise |
| `08-面试题/手写/06-EventEmitter.html` | 手写 EventEmitter |
| `08-面试题/手写/07-LRU缓存.html` | 手写 LRU 缓存 |
| `08-面试题/作用域/01-this指向与作用域链.html` | 经典题 - this 指向与作用域链 |
| `08-面试题/作用域/02-嵌套作用域-返回值.html` | 嵌套函数 - 返回内层函数执行结果 |
| `08-面试题/作用域/03-嵌套作用域-返回函数.html` | 嵌套函数 - 返回内层函数引用 |
| `08-面试题/作用域/04-var重复声明.html` | var 重复声明：后值覆盖前值 |
| `08-面试题/作用域/05-let-for循环闭包.html` | let + for 循环的块作用域闭包 |
| `08-面试题/作用域/06-var与function同名提升.html` | var 与 function 同名提升 |
| `09-Canvas/动画/firework.html` | Canvas 烟花动画 |
| `09-Canvas/基础/index.html` | Canvas 2D 基础绘图 |

<!-- DEMO_TABLE_END -->
