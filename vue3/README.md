# Vue 3

Vue 3.5.x 时代的 demo（`libs/vue.global.js` 为 **3.5.34**，全局构建）。`vue3/src/` 下共 **37** 个 `.html`，目标是覆盖 Vue3 面试常用基础、进阶原理和项目实战常问点。每个文件都可以直接在浏览器打开，无需构建。

## 推荐顺序

| 顺序 | 目录 | 知识点 |
|---|---|---|
| 01 | `src/01-基础语法/` | `createApp`、模板语法、`v-if` / `v-show`、`v-for` / `key`、事件、表单 `v-model`、`class` / `style`、模板 `ref`、`nextTick`、**`useTemplateRef`（3.5+）** |
| 02 | `src/02-响应式与副作用/` | `ref`、`reactive`、解构丢响应、`computed`、`watch`、`watchEffect`、`toRef`、`toRefs`、`readonly`、浅层响应式、`markRaw`、`effectScope`、**`onWatcherCleanup`（3.5+）** |
| 03 | `src/03-生命周期与组合式/` | Composition API 生命周期、`composable` 组合式函数、`setup` 与 `<script setup>` |
| 04 | `src/04-组件通信/` | `props`、`emit`、`attrs` 透传、`provide/inject`、组件 `v-model`、**`defineModel`（3.4+）**、**props 解构保持响应式（3.5+）** |
| 05 | `src/05-插槽与组件形态/` | 默认插槽、具名插槽、作用域插槽、动态组件、异步组件 |
| 06 | `src/06-内置组件/` | `KeepAlive`、`Teleport`、`Suspense`、`Transition` |
| 07 | `src/07-路由状态工程化/` | Vue Router 4、Pinia、工程目录组织、组合式逻辑拆分 |
| 08 | `src/08-原理与性能面试/` | Proxy 响应式原理、虚拟 DOM、diff、`key`、调度器、Vue2/Vue3 差异、性能优化 |

## 根目录补充示例

| 文件 | 主题 |
|---|---|
| `src/响应式状态.html` | `ref` / `reactive` / `shallowRef` 对比 demo（含嵌套与 shallow 替换） |
| `src/生命周期钩子.html` | Composition API 全部生命周期 + KeepAlive 激活/失活 |

## 依赖

`libs/` 目录内置 Vue 3 全家桶运行时，版本见 [`libs/README.md`](libs/README.md)。

| 文件 | 版本 |
|---|---|
| `vue.global.js` | 3.5.34 |
| `vue-router.global.js` | 4.6.4 |
| `pinia.iife.js` | 3.0.4 |
| `axios.min.js` | 1.16.1 |
| `lodash.min.js` | 4.18.1 |
| `js.cookie.min.js` | 3.0.7 |

说明：Router / Pinia 相关 demo 目前仍以面试代码片段和概念说明为主；如需可运行示例，可按需引入 `vue-router.global.js`、`pinia.iife.js` 等库文件。

## 完整 demo 清单

<!-- DEMO_TABLE_START -->

共 **37** 个 demo（由 `node scripts/sync-readmes.mjs` 根据头注释自动生成，请勿手改表格正文）。

| 文件 | 主题 |
|---|---|
| `01-基础语法/01-应用实例与模板语法.html` | createApp / mount / 模板语法 |
| `01-基础语法/02-条件列表与key.html` | v-if / v-show / v-for / key |
| `01-基础语法/03-事件与表单v-model.html` | 事件绑定 / 表单 v-model |
| `01-基础语法/04-class与style绑定.html` | class / style 绑定 |
| `01-基础语法/05-模板ref与nextTick.html` | 模板 ref / nextTick |
| `01-基础语法/06-useTemplateRef模板ref.html` | useTemplateRef（Vue 3.5+） |
| `02-响应式与副作用/01-ref-reactive与解构.html` | ref / reactive / 解构丢响应 |
| `02-响应式与副作用/02-computed-watch-watchEffect.html` | computed / watch / watchEffect |
| `02-响应式与副作用/03-toRef-toRefs.html` | toRef / toRefs |
| `02-响应式与副作用/04-readonly-shallow-markRaw.html` | readonly / shallowReactive / markRaw |
| `02-响应式与副作用/05-effectScope与副作用清理.html` | effectScope / 副作用清理 |
| `02-响应式与副作用/06-onWatcherCleanup与watch清理.html` | onWatcherCleanup（Vue 3.5+） |
| `03-生命周期与组合式/01-生命周期钩子.html` | Composition API 生命周期钩子 |
| `03-生命周期与组合式/02-composable复用.html` | composable 组合式函数 |
| `03-生命周期与组合式/03-setup与script-setup.html` | setup / script setup |
| `04-组件通信/01-props与emit.html` | props / emit |
| `04-组件通信/02-attrs与透传.html` | attrs / 属性透传 |
| `04-组件通信/03-provide-inject.html` | provide / inject |
| `04-组件通信/04-组件v-model.html` | 组件 v-model |
| `04-组件通信/05-defineModel组件v-model.html` | defineModel（Vue 3.4+） |
| `04-组件通信/06-props解构保持响应式.html` | props 解构保持响应式（Vue 3.5+） |
| `05-插槽与组件形态/01-默认具名作用域插槽.html` | 默认插槽 / 具名插槽 / 作用域插槽 |
| `05-插槽与组件形态/02-动态组件与异步组件.html` | 动态组件 / 异步组件 |
| `06-内置组件/01-KeepAlive.html` | KeepAlive |
| `06-内置组件/02-Teleport.html` | Teleport |
| `06-内置组件/03-Suspense.html` | Suspense |
| `06-内置组件/04-Transition.html` | Transition |
| `07-路由状态工程化/01-Vue-Router-4核心面试点.html` | Vue Router 4 核心面试点 |
| `07-路由状态工程化/02-Pinia核心面试点.html` | Pinia 核心面试点 |
| `07-路由状态工程化/03-工程化与组合式组织.html` | 工程化与组合式组织 |
| `08-原理与性能面试/01-Proxy响应式原理.html` | Proxy 响应式原理 |
| `08-原理与性能面试/02-虚拟DOM-diff-key.html` | 虚拟 DOM / diff / key |
| `08-原理与性能面试/03-调度器与nextTick.html` | 调度器 / nextTick |
| `08-原理与性能面试/04-Vue2与Vue3差异.html` | Vue2 与 Vue3 差异 |
| `08-原理与性能面试/05-性能优化.html` | Vue3 性能优化 |
| `生命周期钩子.html` | Composition API 中的全部生命周期钩子 |
| `响应式状态.html` | ref / shallowRef / reactive 三种响应式 API 对比 |

<!-- DEMO_TABLE_END -->
