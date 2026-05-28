# 项目约定（CONVENTIONS）

本仓库是「前端语法 / 框架学习 Demo 库」，每个 `.html` 都可以直接在浏览器打开。本文规定目录与命名规范，保持仓库长期清爽。

当前仓库 demo 总数与各分类数量以 `npm run validate` 输出及 `manifest.json` 为准（**勿手改数字**）。

## 1. 顶层目录

| 目录 | 用途 | 说明 |
|---|---|---|
| `apps/javascript/` | 纯 JavaScript 知识点 demo | 按 `01-` ~ `09-` 编号分类 |
| `apps/css/` | CSS 布局 / 动画 / 视觉 / 响应式 / 性能 / 现代特性 | 按 `01-` ~ `07-` 编号分类 |
| `apps/vue2/` `apps/vue3/` | Vue 框架 demo | 内含 `libs/`（框架运行时）与 `src/`（demo）；通用库见 `packages/shared/libs/` |
| `apps/react18/` | React 18 demo | 内含 `libs/` 与 `src/`（`function-components` + `class-components`） |
| `apps/react19/` | React 19 新特性与面试 demo | 内含 React 19 运行时与 `src/` |
| `apps/typescript/` | TypeScript 面试基础 / 进阶 / 工程与框架 demo | 按 `01-基础` / `02-进阶` / `03-工程与框架` 编号 |
| `apps/demos/` | 综合性 / 交互小项目 | `drag`、`viewpager`、`todo`、`virtual-list` 等 |
| `apps/index.html` | file:// 与本地静态服务的总入口 | VitePress 仍为推荐入口 |
| `packages/shared/` | 跨 demo 共用脚本与 vendored 库 | `demo-log.js`、`libs/`（axios、lodash 等） |
| `scripts/` | 仓库工具脚本 | `build-index.mjs`、`sync-readmes.mjs`、`validate-demos.mjs` 等 |

## 2. 目录命名规则

- **一级分类目录**：保留中文短语，加 `NN-` 编号前缀（`01-基础`、`03-动画`；CSS 从 `01-基础` 起）。
- **二级专题子目录**：纯中文（`正则/`、`闭包/`、`异步/`）；编号可省略。
- **每个分类目录都应有一份 `README.md`** 作为目录索引；`apps/javascript` / `apps/css` / `apps/vue2` / `apps/vue3` / `apps/react18` / `apps/react19` / `apps/typescript` / `apps/demos` 的 README 内含由 `sync-readmes.mjs` 维护的完整 demo 清单表。

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

## 4. 元数据头注释（必填）

每个 demo 在 `<!DOCTYPE html>` 之前加入注释，方便检索与生成 README 清单：

```html
<!--
  分类: javascript / 04-ES6+
  主题: Promise 并发与串行
  难度: 进阶
  前置: Promise-基础
  相关: Promise-串行
  要点:
    - Promise.all 并发执行，时长 = max(任务时长)
    - Promise.resolve().then(f1).then(f2) 串行执行
  面试:
    - Promise.all 与 allSettled、race 的区别？
    - then 链与 async/await 如何等价？
-->
<!DOCTYPE html>
```

- **`分类`**：顶层模块 + 子路径
- **`主题`**：一句话概括，会同步到 README 清单表
- **`要点`**：3～5 条 bullet（概念 + 行为 + 常见坑）
- **`面试`**（全库 demo 必填）：3～5 条 bullet，供 manifest 搜索
- **`难度`**（可选）：`入门` | `进阶` | `面试`
- **`前置`**（可选）：建议先学的 demo 名或知识点
- **`相关`**（可选）：逗号分隔的相关 demo 标题，会注入页脚链接

### 4.1 页面骨架（全库 demo，对标 `01-基础/字符串方法.html`）

```html
<body class="demo-page">
  <!-- NOTES_START -->
  <section class="demo-block demo-block--notes" aria-label="复习与面试要点">
    <h1><!-- 与「主题」一致 --></h1>
    <p class="hint"><!-- 引导语 --></p>
    <div class="demo-notes">
      <h2>知识点要点</h2>
      <ul><!-- 4～6 条展开说明 --></ul>
      <h2>面试考点</h2>
      <ul><!-- 问句标题 + 标准答法 --></ul>
      <h2>参考资料</h2>
      <ul><!-- 1～5 条权威资料链接；窄 API 至少 1 条官方/规范来源，综合主题 2～5 条 --></ul>
    </div>
  </section>
  <!-- NOTES_END -->

  <!-- SCRIPT_START -->
  <script>/* demo 逻辑 */</script>
  <!-- SCRIPT_END -->

  <!-- NAV_START -->
  <footer class="demo-block demo-block--nav" aria-label="Demo 导航">
    <h2 class="demo-block__label">页面导航</h2>
    <nav class="demo-nav" aria-label="相关链接"><!-- 目录 / 相关 / 上一篇 / 下一篇 --></nav>
  </footer>
  <!-- NAV_END -->
</body>
```

- `<head>` 须引入 `demo-notes.css` 与 `demo-shell.css`
- 运行 `npm run migrate:demo-shell` 可批量迁移为上述骨架
- 运行 `npm run transform:all-demos` 可批量补齐头注释 `面试:`、`.demo-notes` 正文（不覆盖已有正文）
- 运行 `npm run format:all-demos` 可批量对齐缩进并移除 demo-log / RUN 区块
- 批量脚本只用于迁移结构、定位缺项和辅助格式化；不得把脚本生成的要点、面试答法、参考资料当作最终学习内容。最终正文必须人工核对当前 demo 代码和权威资料后改写。
- 纯 console demo（如 `字符串方法.html`）省略 RUN 区块，hint 引导打开 DevTools

- **JavaScript（含 console）**：须有复习区 `<h1>`；使用 SCRIPT 区块 + DevTools hint，不引入 demo-log.js
- **CSS / 可视化 demo**：须有复习区；演示区保留原有样式与交互
- **Vue / React**：在 `#app` / `#root` 之前放复习区；`text/babel` 脚本用 SCRIPT 区块包裹

### 4.2 复习区块写作规范（全库）

| 区块 | 条数 | 写法 |
|---|---|---|
| 头注释 `要点:` | 3～5 条 | 精炼 bullet，写入 manifest 搜索关键词；必须对应当前 demo 的真实主题 |
| 头注释 `面试:` | 3～5 条 | 精炼问句或考点短语；禁止使用泛化模板问句 |
| 正文「知识点要点」 | 4～6 条 | 概念 + 行为 + 易错点 + 现代推荐写法；可比头注释多 1～2 句 |
| 正文「面试考点」 | 3～5 条 | `<strong>问句？</strong>` + 2～4 句标准答法；先结论，再原因，再边界或项目场景 |
| 正文「参考资料」 | 1～5 条 | 窄 API 至少 1 条官方/规范来源；综合主题 2～5 条；链接必须支撑正文关键结论，禁止凑弱相关链接 |
| 低频 API demo | 面试可写「了解即可」 | 说明现代替代方案，避免硬凑 |

**分工**：头注释供检索速览；正文供打开 HTML 直接复习；下方 `<script>` / `<h2>` 演示区负责「跑起来看结果」。

## 5. libs 目录

每个框架 / 第三方运行时统一放在所属目录下的 `libs/`：

- `apps/react18/libs/`、`apps/vue2/libs/`、`apps/vue3/libs/`、`packages/shared/libs/`
- **跨模块通用库**（axios、lodash、js-cookie 等）统一放在 `packages/shared/libs/`，demo 用相对路径 `../../../../packages/shared/libs/<file>` 引用（相对 `apps/vue2|vue3/src/<分类>/`）
- demo 内嵌的小库放在 demo 同级的 `lib/`（注意是单数）
- **每个第三方文件**首行必须有注释，写明：**名称 + 版本号 + 官方下载地址 + 下载日期**
- 自己写的工具脚本放在 `packages/shared/`（如 `demo-log.js`）或 demo 同级 `lib/`

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
