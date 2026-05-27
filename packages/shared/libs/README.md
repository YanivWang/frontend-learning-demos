# packages/shared/libs

跨模块共用的第三方运行时（浏览器 `<script src>` 直引，无构建）。

| 文件 | 版本 | 用途 | 官方地址 |
|---|---|---|---|
| `axios.min.js` | **1.16.1** | HTTP 客户端 | https://unpkg.com/axios@1.16.1/dist/axios.min.js |
| `lodash.min.js` | **4.18.1** | 工具库 | https://unpkg.com/lodash@4.18.1/lodash.min.js |
| `js.cookie.min.js` | **3.0.7** | Cookie 读写 | https://unpkg.com/js-cookie@3.0.7/dist/js.cookie.min.js |

## 引用方式

从 `apps/vue2/src/<分类>/` 或 `apps/vue3/src/<分类>/` 下的 demo：

```html
<script src="../../../../packages/shared/libs/axios.min.js"></script>
```

框架专用运行时仍放在各模块自己的 `libs/`（如 `vue.js`、`vue.global.js`）。

## 升级方式

直接下载新版本覆盖即可，文件名保持不变；同步更新本 README 与各模块 README 中的版本说明，并检查引用该库的 demo 是否仍兼容。
