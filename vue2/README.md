# Vue 2

Vue 2.7 时代的 demo（`libs/vue.js` 为 **2.7.16**，Vue 2 最终版）。`vue2/src/` 下共 **57** 个 `.html`，每个文件可直接在浏览器打开，无需构建。

## 目录概览

| 目录 | 知识点 |
|---|---|
| `src/响应式原理/` | `Object.defineProperty` 响应式、手写 Observer/Dep/Watcher、`Vue.set` 实战、数组响应式限制、组件基础、timeline |
| `src/基础语法/` | 模板语法、`v-if`/`v-show`、`v-model` 原理、`computed`、`watch`、`nextTick`、`bindClass` / `bindStyle`、事件修饰符、`ref`、`key`、自定义指令 / 过滤器 / `mixin` / 插件 |
| `src/组件/` | `props` / `$emit`、组件通信、插槽 `slot`、动态/异步组件、`keep-alive` 生命周期、自定义组件 `v-model` / `.sync`、`bindComponent`、参数解构 |
| `src/路由与状态/` | `vue-router` 命名 / 嵌套 / 默认子路由 / 编程式 / 重定向 / 守卫 / 懒加载、Vuex `Module` / action |
| `src/原理与性能/` | 虚拟 DOM / diff / `key`、模板编译到 `render`、常见性能优化 |
| `src/源码简读/` | Vue 源码阅读笔记 / 官方源码副本（`vue.js` 为第三方副本，不参与索引扫描） |
| `src/生命周期.html` | 生命周期演示 |

## 推荐顺序

`src/响应式原理` → `src/基础语法` → `src/组件` → `src/路由与状态` → `src/原理与性能`

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
| `基础语法/自定义指令-过滤器-mixin-插件.html` | 自定义指令 / 过滤器 / mixin / 插件 |
| `基础语法/abbr.html` | Vue 指令简写形式（: 与 @） |
| `基础语法/base.html` | Vue 五大基础特性合集 |
| `基础语法/bindClass.html` | v-bind:class 三种写法（对象 / 对象引用 / 数组） |
| `基础语法/bindStyle.html` | :style 三种写法（行内对象 / 对象变量 / 数组） |
| `基础语法/computed.html` | 计算属性 vs 方法（缓存差异） |
| `基础语法/device.html` | 设备信息读取（与 Vue 无强关联，纯 BOM） |
| `基础语法/event.html` | v-on 事件三种形态（直接方法名 / 调用方法 / 表达式） |
| `基础语法/key.html` | key 复用控制 + v-for 遍历数组/对象 |
| `基础语法/Modifiers.html` | 事件修饰符 @event.modifier |
| `基础语法/mouseEvent.html` | mouseenter / leave vs mouseover / out 差异 |
| `基础语法/nextTick.html` | nextTick 与异步 DOM 更新队列 |
| `基础语法/note.html` | Vue CLI 知识点速查（笔记型） |
| `基础语法/review.html` | 综合复习（computed / methods / watch / 局部组件 / 简写） |
| `基础语法/template.html` | Mustache 插值 / v-html / v-bind / v-once |
| `基础语法/testRef.html` | ref 引用 DOM / 子组件实例 |
| `基础语法/v-if-else.html` | v-if / v-else / v-show / <template v-if> |
| `基础语法/v-model原理.html` | v-model 原理 |
| `基础语法/watch.html` | watch 与 computed 的取舍 |
| `路由与状态/路由懒加载.html` | vue-router 路由懒加载 |
| `路由与状态/默认子路由.html` | 嵌套路由与默认子路由（path: ''） |
| `路由与状态/Module.html` | Vuex Module 演示（按模块拆分 store） |
| `路由与状态/namedRouter.html` | 命名路由（router-link :to="{ name: 'xxx' }"） |
| `路由与状态/namedView.html` | 命名视图（同级多个 router-view） |
| `路由与状态/nestedRouter.html` | 嵌套路由 + 默认子路由 + 编程式导航 push / replace |
| `路由与状态/nestedRouterComplex.html` | 嵌套路由 + 命名视图组合（settings 综合页） |
| `路由与状态/programRouter.html` | 编程式导航（push / replace / go / 命名路由） |
| `路由与状态/Promise.html` | Promise 基础（与本目录主题关系不强，仅作前置回顾） |
| `路由与状态/routerParam.html` | 动态路径参数 :id 与 $route.params |
| `路由与状态/routerProp.html` | 路由 props 解耦组件与 $route |
| `路由与状态/routerProtected.html` | vue-router 全套导航守卫 + 受保护路由（meta.requiresAuth） |
| `路由与状态/routerRedirect.html` | vue-router 路由重定向 与 alias 别名 |
| `路由与状态/VueX-action.html` | Vuex actions 详解（载荷 / 异步 / Promise / 嵌套 dispatch） |
| `路由与状态/VueX.html` | Vuex 全家桶（state / mutations / actions / getters / mapState / mapGetters） |
| `生命周期.html` | Vue2 八个生命周期钩子速记 |
| `响应式原理/数组响应式限制.html` | Vue2 数组响应式限制 |
| `响应式原理/组件基础.html` | 实例 vm 与 _data 的关系 |
| `响应式原理/defineProperty.html` | Object.defineProperty 实现访问器属性（Vue2 响应式核心） |
| `响应式原理/index.html` | 手写 Vue2 响应式核心（Observer / Dep / Watcher / Computed） |
| `响应式原理/timeline.html` | 用 Performance 时间线观察大数组对响应式性能的影响 |
| `响应式原理/vue-set实战.html` | Vue.$set 与 Object.assign 实战 |
| `原理与性能/01-虚拟DOM-diff-key.html` | 虚拟 DOM / diff / key |
| `原理与性能/02-模板编译-render.html` | template 编译到 render 函数 |
| `原理与性能/03-性能优化.html` | Vue2 常见性能优化 |
| `源码简读/1.baseknow.html` | Vue2 源码阅读前置知识占位（Symbol） |
| `组件/自定义组件v-model-sync.html` | 自定义组件 v-model 与 .sync |
| `组件/组件通信.html` | Vue2 组件通信方式汇总 |
| `组件/asyncZJ.html` | 同步组件 vs 异步组件（工厂函数形式） |
| `组件/bindComponent.html` | 自定义组件上 v-bind:class 行为 |
| `组件/component.html` | Vue.component 全局组件 + data 与 vm 代理同步 |
| `组件/componentBase.html` | 父子组件通讯（props 下传 + $emit 上抛） |
| `组件/componentDeep.html` | 全局组件 vs 局部组件 + 子组件嵌套使用 |
| `组件/dyComponent.html` | 动态组件 <component :is="..."> |
| `组件/keep-alive生命周期.html` | keep-alive 与 activated / deactivated |
| `组件/paramDestructuring.html` | 解构赋值（数组按位、对象按名） |
| `组件/Prop.html` | props 传值 + 自定义事件 + 动态组件 |
| `组件/slot.html` | 插槽 slot（默认 / 具名 / 作用域） |

<!-- DEMO_TABLE_END -->
