# Vue 2

Vue 2.7 时代的 demo（`libs/vue.js` 为 **2.7.16**，Vue 2 最终版）。`learn/vue2/src/` 下共 **57** 个 `.html`，每个文件可直接在浏览器打开，无需构建。

## 推荐顺序

| 顺序 | 目录 | 知识点 |
|---|---|---|
| 01 | `src/01-基础语法/` | 模板语法、`v-if`/`v-show`、`v-model` 原理、`computed`、`watch`、`nextTick`、事件修饰符、`ref`、`key`、自定义指令 / 过滤器 / `mixin` / 插件 |
| 02 | `src/02-响应式原理/` | `Object.defineProperty` 响应式、手写 Observer/Dep/Watcher、`Vue.set` 实战、数组响应式限制、实例与 `_data`、timeline |
| 03 | `src/03-生命周期/` | 八个生命周期钩子速记 |
| 04 | `src/04-组件/` | `props` / `$emit`、组件通信、插槽、动态/异步组件、`keep-alive`、`v-model` / `.sync` |
| 05 | `src/05-路由与状态/` | `vue-router` 与 Vuex 全套 demo |
| 06 | `src/06-原理与性能/` | 虚拟 DOM / diff / `key`、模板编译到 `render`、常见性能优化 |
| 07 | `src/07-源码简读/` | Vue 源码阅读笔记（`01-源码阅读前置-Symbol.html`）；`vue.js` 为第三方副本 |

## Vue2 面试覆盖

已覆盖的常用基础面试点：

- 基础语法：插值、指令、条件渲染、列表渲染、事件、修饰符、`class/style`、`ref`、`v-model`。
- 数据与更新：`data` 代理、`computed` 缓存、`watch` 使用场景、`nextTick`、异步 DOM 更新。
- 响应式原理：`Object.defineProperty`、`Observer / Dep / Watcher`、`Vue.set`、对象新增属性和数组索引/长度限制。
- 组件：注册方式、`props`、`$emit`、插槽、动态组件、异步组件、`keep-alive`、自定义组件 `v-model`、`.sync`。
- 通信：父子通信、`provide/inject`、EventBus、`$attrs/$listeners`。
- 路由与状态：动态路由、命名路由、嵌套路由、重定向、导航守卫、懒加载、Vuex 核心概念。
- 原理与性能：虚拟 DOM、diff、`key`、模板编译、`render` 函数、常见性能优化。

## 依赖

`libs/vue.js` `libs/vue-router.js` `libs/vuex.js` `libs/es6-promise.auto.js` `libs/axios.min.js` `libs/lodash.min.js` `libs/js.cookie.min.js`，版本见 [`libs/README.md`](libs/README.md)。

## 完整 demo 清单

<!-- DEMO_TABLE_START -->

共 **57** 个 demo（由 `node scripts/sync-readmes.mjs` 根据头注释自动生成，请勿手改表格正文）。

| 文件 | 主题 |
|---|---|
| `01-基础语法/01-模板语法-base.html` | Vue 五大基础特性合集 |
| `01-基础语法/02-模板插值与指令.html` | Mustache 插值 / v-html / v-bind / v-once |
| `01-基础语法/03-v-if-v-show.html` | v-if / v-else / v-show / <template v-if> |
| `01-基础语法/04-bindClass.html` | v-bind:class 三种写法（对象 / 对象引用 / 数组） |
| `01-基础语法/05-bindStyle.html` | :style 三种写法（行内对象 / 对象变量 / 数组） |
| `01-基础语法/06-computed.html` | 计算属性 vs 方法（缓存差异） |
| `01-基础语法/07-watch.html` | watch 与 computed 的取舍 |
| `01-基础语法/08-nextTick.html` | nextTick 与异步 DOM 更新队列 |
| `01-基础语法/09-事件修饰符.html` | 事件修饰符 @event.modifier |
| `01-基础语法/10-v-on事件.html` | v-on 事件三种形态（直接方法名 / 调用方法 / 表达式） |
| `01-基础语法/11-mouseenter与mouseover.html` | mouseenter / leave vs mouseover / out 差异 |
| `01-基础语法/12-key与v-for.html` | key 复用控制 + v-for 遍历数组/对象 |
| `01-基础语法/13-ref引用.html` | ref 引用 DOM / 子组件实例 |
| `01-基础语法/14-v-model原理.html` | v-model 原理 |
| `01-基础语法/15-指令简写.html` | Vue 指令简写形式（: 与 @） |
| `01-基础语法/16-自定义指令-过滤器-mixin-插件.html` | 自定义指令 / 过滤器 / mixin / 插件 |
| `01-基础语法/17-综合复习.html` | 综合复习（computed / methods / watch / 局部组件 / 简写） |
| `01-基础语法/18-VueCLI笔记.html` | Vue CLI 知识点速查（笔记型） |
| `01-基础语法/19-设备信息BOM.html` | 设备信息读取（与 Vue 无强关联，纯 BOM） |
| `02-响应式原理/01-手写Observer-Dep-Watcher.html` | 手写 Vue2 响应式核心（Observer / Dep / Watcher / Computed） |
| `02-响应式原理/02-defineProperty访问器.html` | Object.defineProperty 实现访问器属性（Vue2 响应式核心） |
| `02-响应式原理/03-Vue-set实战.html` | Vue.$set 与 Object.assign 实战 |
| `02-响应式原理/04-数组响应式限制.html` | Vue2 数组响应式限制 |
| `02-响应式原理/05-实例与_data.html` | 实例 vm 与 _data 的关系 |
| `02-响应式原理/06-响应式性能timeline.html` | 用 Performance 时间线观察大数组对响应式性能的影响 |
| `03-生命周期/01-八个钩子速记.html` | Vue2 八个生命周期钩子速记 |
| `04-组件/01-全局与局部组件.html` | Vue.component 全局组件 + data 与 vm 代理同步 |
| `04-组件/02-父子通信-props与emit.html` | 父子组件通讯（props 下传 + $emit 上抛） |
| `04-组件/03-组件嵌套与局部注册.html` | 全局组件 vs 局部组件 + 子组件嵌套使用 |
| `04-组件/04-props与动态组件.html` | props 传值 + 自定义事件 + 动态组件 |
| `04-组件/05-插槽slot.html` | 插槽 slot（默认 / 具名 / 作用域） |
| `04-组件/06-动态组件is.html` | 动态组件 <component :is="..."> |
| `04-组件/07-异步组件.html` | 同步组件 vs 异步组件（工厂函数形式） |
| `04-组件/08-keep-alive生命周期.html` | keep-alive 与 activated / deactivated |
| `04-组件/09-自定义v-model与sync.html` | 自定义组件 v-model 与 .sync |
| `04-组件/10-bindComponent-class.html` | 自定义组件上 v-bind:class 行为 |
| `04-组件/11-组件通信汇总.html` | Vue2 组件通信方式汇总 |
| `04-组件/12-参数解构.html` | 解构赋值（数组按位、对象按名） |
| `05-路由与状态/01-动态路由参数.html` | 动态路径参数 :id 与 $route.params |
| `05-路由与状态/02-命名路由.html` | 命名路由（router-link :to="{ name: 'xxx' }"） |
| `05-路由与状态/03-嵌套路由.html` | 嵌套路由 + 默认子路由 + 编程式导航 push / replace |
| `05-路由与状态/04-嵌套路由复杂-命名视图.html` | 嵌套路由 + 命名视图组合（settings 综合页） |
| `05-路由与状态/05-命名视图.html` | 命名视图（同级多个 router-view） |
| `05-路由与状态/06-默认子路由.html` | 嵌套路由与默认子路由（path: ''） |
| `05-路由与状态/07-编程式导航.html` | 编程式导航（push / replace / go / 命名路由） |
| `05-路由与状态/08-路由重定向与alias.html` | vue-router 路由重定向 与 alias 别名 |
| `05-路由与状态/09-路由props解耦.html` | 路由 props 解耦组件与 $route |
| `05-路由与状态/10-导航守卫.html` | vue-router 全套导航守卫 + 受保护路由（meta.requiresAuth） |
| `05-路由与状态/11-路由懒加载.html` | vue-router 路由懒加载 |
| `05-路由与状态/12-Vuex核心.html` | Vuex 全家桶（state / mutations / actions / getters / mapState / mapGetters） |
| `05-路由与状态/13-Vuex-actions.html` | Vuex actions 详解（载荷 / 异步 / Promise / 嵌套 dispatch） |
| `05-路由与状态/14-Vuex-Module.html` | Vuex Module 演示（按模块拆分 store） |
| `05-路由与状态/15-Promise前置回顾.html` | Promise 基础（与本目录主题关系不强，仅作前置回顾） |
| `06-原理与性能/01-虚拟DOM-diff-key.html` | 虚拟 DOM / diff / key |
| `06-原理与性能/02-模板编译-render.html` | template 编译到 render 函数 |
| `06-原理与性能/03-性能优化.html` | Vue2 常见性能优化 |
| `07-源码简读/01-源码阅读前置-Symbol.html` | Vue2 源码阅读前置知识占位（Symbol） |

<!-- DEMO_TABLE_END -->
