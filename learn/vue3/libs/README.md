# vue3/libs

Vue 3 核心运行时与常见生态预置库（全局构建版本，浏览器直接 `<script src>` 即可使用）。

| 文件 | 版本 | 用途 | 官方地址 |
|---|---|---|---|
| `vue.global.js` | **3.5.34** | Vue 3 核心库（global build） | https://unpkg.com/vue@3.5.34/dist/vue.global.js |
| `vue-router.global.js` | **4.6.4** | 路由（Vue Router 4） | https://unpkg.com/vue-router@4.6.4/dist/vue-router.global.js |
| `pinia.iife.js` | **3.0.4** | 状态管理 | https://unpkg.com/pinia@3.0.4/dist/pinia.iife.js |
| `axios.min.js` | **1.16.1** | HTTP 客户端 | https://unpkg.com/axios@1.16.1/dist/axios.min.js |
| `lodash.min.js` | **4.18.1** | 工具库 | https://unpkg.com/lodash@4.18.1/lodash.min.js |
| `js.cookie.min.js` | **3.0.7** | Cookie 读写 | https://unpkg.com/js-cookie@3.0.7/dist/js.cookie.min.js |

## 说明

当前 `learn/vue3/src/` 的可运行 demo 只实际引用 `vue.global.js`。Vue Router / Pinia / Axios / Lodash / js-cookie 作为预置库先保留，后续如把相关页面改成可运行示例，再接入对应 `<script src>`。

## 升级方式

直接下载新版本覆盖即可，文件名保持不变；如果改名记得同步更新 `vue3/src/*.html` 里的 `<script src>` 引用。
