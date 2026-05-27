# packages

根目录下的 **npm 工作区子包**与**跨 demo 共用资源**目录。

| 子目录 | 用途 |
|---|---|
| `shared/` | 浏览器可直接引用的通用 vendored 库（`libs/`：axios、lodash、js-cookie） |
| *(未来)* | 可构建子项目、共享配置、CLI 等，各子目录自带 `package.json` |

与 `apps/` 的分工：

| 目录 | 用途 |
|---|---|
| `apps/` | 浏览器可直接打开的 HTML demo（主学习内容） |
| `packages/` | 共用运行时 + 需要独立 `package.json` 的工程化子包 |

新增可构建子包时：

1. 在 `packages/<name>/` 下自建 `package.json` 与 README；
2. 子包名用小写连字符（如 `demo-tools`）；
3. 若需被根仓库引用，在根 `package.json` 的 `workspaces` 中登记（启用后再跑 `npm install`）。
