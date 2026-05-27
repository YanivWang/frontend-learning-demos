# packages/shared

跨 `apps/*` 模块复用的浏览器运行时资源，避免在 `vue2/libs`、`vue3/libs` 等处重复 vendoring 同一份第三方库。

当前内容：

- [`libs/`](libs/README.md) — `axios`、`lodash`、`js-cookie` 等通用库（`<script src>` 直引，无构建）
