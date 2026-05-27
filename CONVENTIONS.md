# 项目约定（CONVENTIONS）

本仓库是「前端语法 / 框架学习 Demo 库」，每个 `.html` 都可以直接在浏览器打开。本文规定目录与命名规范，保持仓库长期清爽。

当前仓库共 **346** 个可索引 demo（`javascript` 124 · `css` 39 · `vue2` 57 · `vue3` 41 · `react18` 53 · `react19` 11 · `typescript` 18 · `demos` 3），统计以 `node scripts/validate-demos.mjs` 输出为准。

## 1. 顶层目录

| 目录 | 用途 | 说明 |
|---|---|---|
| `apps/javascript/` | 纯 JavaScript 知识点 demo | 按 `01-` ~ `09-` 编号分类 |
| `apps/css/` | CSS 布局 / 动画 / 视觉 / 响应式 / 性能 / 现代特性 | 按 `01-` ~ `07-` 编号分类 |
| `apps/vue2/` `apps/vue3/` | Vue 框架 demo | 内含 `libs/`（框架运行时）与 `src/`（demo）；通用库见 `packages/shared/libs/` |
| `packages/` | 工作区子包与共用资源 | `shared/libs/` 放 axios、lodash、js-cookie 等；其余子包可自带 `package.json` |
| `apps/react18/` | React 18 demo | 内含 `libs/` 与 `src/`（`function-components` + `class-components`） |
| `apps/react19/` | React 19 新特性与面试 demo | 内含 React 19 运行时（`umd-react`）与 `src/`（`01-基础语法` + `02-面试题`） |
| `apps/typescript/` | TypeScript 面试基础 / 进阶 / 工程与框架 demo | 按 `01-基础` / `02-进阶` / `03-工程与框架` 编号 |
| `apps/demos/` | 综合性 / 交互小项目 | `drag`、`viewpager` 等 |
| `scripts/` | 仓库工具脚本 | `build-index.mjs`、`sync-readmes.mjs`、`validate-demos.mjs` 等 |

## 2. 目录命名规则

- **一级分类目录**：保留中文短语，加 `NN-` 编号前缀（`01-基础`、`03-动画`；CSS 从 `01-基础` 起）。
- **二级专题子目录**：纯中文（`正则/`、`闭包/`、`异步/`）；编号可省略。
- **每个分类目录都应有一份 `README.md`** 作为目录索引；`apps/javascript` / `apps/css` / `apps/vue2` / `apps/vue3` / `apps/react18` / `apps/react19` / `apps/typescript` 的 README 内含由 `sync-readmes.mjs` 维护的完整 demo 清单表。

## 3. 文件命名规则

文件名采用「**编号 + 中文主题**」或「**编号 + 英文 API 名**」二选一，但**同一目录内必须风格统一**。

- ✅ `01-变量.html` `02-箭头函数.html` `05-Promise-并发.html`
- ❌ `test1.html` `var1.html` `class2_state_plus.html`（无意义编号 / 下划线 / 拼音首字母）

详细规则：

1. **编号前缀** `NN-`（两位数字 + 连字符）表示阅读顺序，可选但推荐
2. **主题部分** 优先用中文；如果是 API/概念专名（`Promise`、`setState`、`HOC`）保留英文原名
3. **多段之间用连字符 `-` 连接**，不用 `_`（下划线）、不用驼峰命名
4. **不使用拼音首字母**（`FZ` `ZJ`）；要么写全中文，要么写英文全称
5. **同主题多个 demo** 用「主题-子点」格式：`Promise-基础.html` `Promise-并发.html` `Promise-串行.html`，而不是 `test1.html` `test2.html`

## 4. 元数据头注释（推荐，当前 323 个 demo 均已具备）

每个 demo 在 `<!DOCTYPE html>` 之前加入注释，方便检索与生成 README 清单：

```html
<!--
  分类: javascript / 04-ES6+
  主题: Promise 并发与串行
  要点:
    - Promise.all 并发执行，时长 = max(任务时长)
    - Promise.resolve().then(f1).then(f2) 串行执行
    - then 回调若传 Promise，须返回函数或链式调用，避免把 Promise 对象当返回值
-->
<!DOCTYPE html>
```

- **`分类`**：顶层模块 + 子路径，如 `react / function-components`、`vue3 / 02-响应式与副作用`
- **`主题`**：一句话概括，会同步到对应 `README.md` 的 demo 清单表
- **`要点`**：3～5 条 bullet，写面试常问点或易错点；反面教材 demo 在要点中标注「易错点 / 反面教材」

## 5. libs 目录

每个框架 / 第三方运行时统一放在所属目录下的 `libs/`：

- `apps/react18/libs/`、`apps/vue2/libs/`、`apps/vue3/libs/`、`packages/shared/libs/`、`apps/css/05-响应式/libs/`
- **跨模块通用库**（axios、lodash、js-cookie 等）统一放在 `packages/shared/libs/`，demo 用相对路径 `../../../../packages/shared/libs/<file>` 引用（相对 `apps/vue2|vue3/src/<分类>/`）
- demo 内嵌的小库放在 demo 同级的 `lib/`（注意是单数）
- **每个第三方文件**首行必须有注释，写明：**名称 + 版本号 + 官方下载地址 + 下载日期**
- 自己写的工具脚本不要放在 `libs/`，统一放在 `src/utils/` 或 demo 同级目录

## 6. 入口 / 索引

- **VitePress 文档站**（`docs/`）是唯一入口，侧边栏与 Demo 索引由 `manifest.json` 驱动
- `manifest.json` **由 `scripts/build-index.mjs` 自动生成**，不要手动编辑
- 想新增 demo：直接放到对应目录，运行：
  ```bash
  npm run build:index
  npm run sync:readmes
  npm run validate
  ```
- 各模块 `README.md` 的学习顺序、面试覆盖范围可手写维护；`<!-- DEMO_TABLE_START -->` … `<!-- DEMO_TABLE_END -->` 之间的表格由脚本生成，**勿手改表格正文**

## 7. Git 提交

- 单一目的提交：一次只做一件事（删除冗余 / 改名 / 加 demo）
- 提交信息前缀：`feat:` 新功能 demo、`refactor:` 重构 / 改名、`docs:` 文档、`chore:` 工程文件
