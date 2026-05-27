# vue2/libs

Vue 2 全家桶运行时（框架专用；通用库见 [`../../../packages/shared/libs/README.md`](../../../packages/shared/libs/README.md)）。

| 文件 | 版本 | 用途 | 官方地址 |
|---|---|---|---|
| `vue.js` | **2.7.16** | Vue 2 核心库（Vue 2 最终版） | https://unpkg.com/vue@2.7.16/dist/vue.js |
| `vue-router.js` | **3.6.5** | 路由 | https://unpkg.com/vue-router@3.6.5/dist/vue-router.js |
| `vuex.js` | **3.6.2** | 状态管理 | https://unpkg.com/vuex@3.6.2/dist/vuex.js |
| `es6-promise.auto.js` | **4.2.8** | IE 等老浏览器的 Promise polyfill | https://unpkg.com/es6-promise@4.2.8/dist/es6-promise.auto.js |

## 共用库

`axios`、`lodash`、`js-cookie` 在 `packages/shared/libs/`，demo 使用 `../../../../packages/shared/libs/<file>` 引用。

## 升级方式

直接下载新版本覆盖即可，文件名保持不变；如果改名记得同步更新 `vue2/src/*.html` 里的 `<script src>` 引用。
