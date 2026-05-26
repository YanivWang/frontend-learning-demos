# Vue 3

Vue 3.5.x 时代的 demo（`libs/vue3.5.js` 是 3.5.13 版本，全局构建）。

目标是覆盖 Vue3 面试常用基础、进阶原理和项目实战常问点。每个 `.html`
都可以直接在浏览器打开，无需构建。

## 推荐顺序

| 顺序 | 目录 | 知识点 |
|---|---|---|
| 01 | `src/01-基础语法/` | `createApp`、模板语法、`v-if` / `v-show`、`v-for` / `key`、事件、表单 `v-model`、`class` / `style`、模板 `ref`、`nextTick` |
| 02 | `src/02-响应式与副作用/` | `ref`、`reactive`、解构丢响应、`computed`、`watch`、`watchEffect`、`toRef`、`toRefs`、`readonly`、浅层响应式、`markRaw`、`effectScope` |
| 03 | `src/03-生命周期与组合式/` | Composition API 生命周期、`composable` 组合式函数、`setup` 与 `<script setup>` |
| 04 | `src/04-组件通信/` | `props`、`emit`、`attrs` 透传、`provide/inject`、组件 `v-model` |
| 05 | `src/05-插槽与组件形态/` | 默认插槽、具名插槽、作用域插槽、动态组件、异步组件 |
| 06 | `src/06-内置组件/` | `KeepAlive`、`Teleport`、`Suspense`、`Transition` |
| 07 | `src/07-路由状态工程化/` | Vue Router 4、Pinia、工程目录组织、组合式逻辑拆分 |
| 08 | `src/08-原理与性能面试/` | Proxy 响应式原理、虚拟 DOM、diff、`key`、调度器、Vue2/Vue3 差异、性能优化 |

## 原始示例

| 文件 | 主题 |
|---|---|
| `src/响应式状态.html` | `ref` / `reactive` / `shallowRef` 基础 |
| `src/生命周期钩子.html` | Composition API 生命周期钩子 |

## 依赖

`libs/vue3.5.js`，版本见 [`libs/README.md`](libs/README.md)。

说明：当前仓库只内置 Vue 核心运行时，未额外引入 `vue-router` 和 `pinia`
运行时文件。因此 Router / Pinia 相关 demo 以面试代码片段和概念说明为主，
避免破坏本仓库“直接打开 HTML、离线可读”的约定。
