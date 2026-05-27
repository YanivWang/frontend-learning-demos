# packages

根目录下的**跨 demo 共用资源**目录。

| 子目录 | 用途 |
|---|---|
| `shared/demo-log.js` | 将 `console.log` 同步到页面 `#demo-output`（JavaScript 基础 demo 使用） |
| `shared/libs/` | 浏览器可直接引用的通用 vendored 库（axios、lodash、js-cookie） |

与 `apps/` 的分工：

| 目录 | 用途 |
|---|---|
| `apps/` | 浏览器可直接打开的 HTML demo（主学习内容） |
| `packages/shared/` | 共用运行时脚本 + 第三方库 |

VitePress 开发/预览服务器与 `docs:build` 产物均会托管 `/packages/shared/` 路径。

若将来需要 npm workspaces 子包，可在 `packages/<name>/` 下自建 `package.json`，并在根 `package.json` 的 `workspaces` 字段登记。
