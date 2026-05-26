# 项目约定（CONVENTIONS）

本仓库是「前端语法 / 框架学习 Demo 库」，每个 `.html` 都可以直接在浏览器打开。本文规定目录与命名规范，保持仓库长期清爽。

## 1. 顶层目录

| 目录 | 用途 | 说明 |
|---|---|---|
| `javascript/` | 纯 JavaScript 知识点 demo | 按 `01-` ~ `09-` 编号分类 |
| `css/` | CSS 布局 / 动画 / 视觉 / 响应式 | 按 `01-` ~ `04-` 编号分类 |
| `vue2/` `vue3/` | Vue 框架 demo | 内含 `libs/`（运行时）与 `src/`（demo） |
| `react/` | React 18 demo | 内含 `libs/`（运行时）与 `src/`（demo） |
| `demos/` | 综合性 / 交互小项目 | `drag`、`svg`、`viewpager` 等 |
| `scripts/` | 仓库工具脚本 | 如 `build-index.mjs` 生成总入口 |

## 2. 目录命名规则

- **一级分类目录**：保留中文短语，加 `NN-` 编号前缀（`01-基础`、`02-动画`）。
- **二级专题子目录**：纯中文（`正则/`、`闭包/`、`异步/`）；编号可省略。
- **每个分类目录都应有一份 `README.md`** 作为目录索引（由脚本生成或手写）。

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

## 4. 元数据头注释（可选但推荐）

新增 demo 时，可在 `<!DOCTYPE html>` 之前加入注释，方便日后检索：

```html
<!--
  分类: javascript / 04-ES6+
  主题: Promise 并发与串行
  要点:
    - Promise.all 并发执行，时长 = max(任务时长)
    - Promise.resolve().then(f1).then(f2) 串行执行
-->
<!DOCTYPE html>
```

## 5. libs 目录

每个框架 / 第三方运行时统一放在所属目录下的 `libs/`：

- `react/libs/`、`vue2/libs/`、`vue3/libs/`
- demo 内嵌的小库放在 demo 同级的 `lib/`（注意是单数）
- **每个第三方文件**首行必须有注释，写明：**名称 + 版本号 + 官方下载地址 + 下载日期**
- 自己写的工具脚本不要放在 `libs/`，统一放在 `src/utils/` 或 demo 同级目录

## 6. 入口 / 索引

- 根目录 `index.html` 是总入口，**由 `scripts/build-index.mjs` 自动生成**，不要手动编辑
- 想新增 demo：直接放到对应目录，运行 `node scripts/build-index.mjs` 重新生成 `index.html`
- `README.md` 是仓库说明与学习顺序，可以手动维护

## 7. Git 提交

- 单一目的提交：一次只做一件事（删除冗余 / 改名 / 加 demo）
- 提交信息前缀：`feat:` 新功能 demo、`refactor:` 重构 / 改名、`docs:` 文档、`chore:` 工程文件
