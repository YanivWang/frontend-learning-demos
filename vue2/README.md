# Vue 2

Vue 2.7 时代的 demo（`libs/vue.js` 是 2.7.16 版本）。

## 目录

| 目录 | 知识点 |
|---|---|
| `src/响应式原理/` | `Object.defineProperty` 响应式、`Vue.set` 实战、数组响应式限制、组件基础、timeline |
| `src/基础语法/` | 模板语法、`v-if`/`v-show`、`v-model` 原理、`computed`、`watch`、`nextTick`、`bindClass` / `bindStyle`、事件修饰符、`ref`、`key`、自定义指令 / 过滤器 / `mixin` / 插件 |
| `src/组件/` | `props` / `$emit`、组件通信、插槽 `slot`、动态/异步组件、`keep-alive` 生命周期、自定义组件 `v-model` / `.sync`、`bindComponent`、参数解构 |
| `src/路由与状态/` | `vue-router` 命名 / 嵌套 / 默认子路由 / 编程式 / 重定向 / 守卫 / 懒加载、Vuex `Module` / action |
| `src/原理与性能/` | 虚拟 DOM / diff / `key`、模板编译到 `render`、常见性能优化 |
| `src/源码简读/` | Vue 源码阅读笔记 / 官方源码副本 |
| `src/生命周期.html` | 生命周期演示 |

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
