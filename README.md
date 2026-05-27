# frontend-learning-demos

前端语法与框架复习 Demo 库。**VitePress 文档站为唯一入口**；每个 HTML demo 仍可直接打开。

## Demo 规模（由 `npm run validate` / manifest 统计）

| 分类 | 路径 | demo 数量 | 说明文档 |
|---|---|---:|---|
| JavaScript | `learn/javascript/` | 124 | [`learn/javascript/README.md`](learn/javascript/README.md) |
| CSS | `learn/css/` | 39 | [`learn/css/README.md`](learn/css/README.md) |
| Vue 2 | `learn/vue2/src/` | 57 | [`learn/vue2/README.md`](learn/vue2/README.md) |
| Vue 3 | `learn/vue3/src/` | 41 | [`learn/vue3/README.md`](learn/vue3/README.md) |
| React 18 | `learn/react/src/` | 53 | [`learn/react/README.md`](learn/react/README.md) |
| TypeScript | `learn/typescript/` | 18 | [`learn/typescript/README.md`](learn/typescript/README.md) |
| 综合 Demo | `learn/demos/` | 5 | [`learn/demos/README.md`](learn/demos/README.md) |
| **合计** | — | **337** | 统一头注释 + 页脚导航 + VitePress 搜索（见 [`CONVENTIONS.md`](CONVENTIONS.md)） |

## 快速开始

```bash
npm install
npm run build:index
npm run docs:dev
# → http://127.0.0.1:5173
```

构建并预览静态站点：

```bash
npm run docs:build
npm run serve
# → http://127.0.0.1:4173/
```

`manifest.json` 与 VitePress 导航由 [`scripts/build-index.mjs`](scripts/build-index.mjs) 链式生成，**请勿手改**。

## 目录结构

```text
.
├── manifest.json            # demo 结构化清单（自动生成）
├── docs-site/               # VitePress 文档站（唯一入口）
├── README.md                # 本文件
├── CONVENTIONS.md           # 目录与命名约定（每次想动结构前先读它）
├── docs/
│   ├── plans/               # 面试知识点 / 工程化补齐计划
│   └── reviews/             # 全量审查与演进记录
├── package.json             # npm 维护命令（playwright 为可选 devDependency）
├── CONTRIBUTING.md          # 贡献与必跑命令
├── .githooks/pre-commit     # 可选 Git Hook 模板
├── .github/workflows/ci.yml # CI：test + validate
├── .gitignore .editorconfig
│
├── learn/                   # 学习 demo 主目录
│   ├── javascript/          # 纯 JavaScript（详见 learn/javascript/README.md）
│   ├── css/                 # CSS（含 07-现代特性）
│   ├── vue2/                # Vue 2.7.16
│   ├── vue3/                # Vue 3.5.34
│   ├── react/               # React 18.3.1（function-components + class-components）
│   ├── typescript/          # TypeScript 面试基础 / 进阶 / 工程与框架
│   └── demos/               # 综合 Demo（drag / svg / viewpager）
│
└── scripts/
    ├── build-index.mjs      # 扫描生成 manifest.json
    ├── sync-readmes.mjs     # 同步各模块 README 的 demo 清单表
    ├── validate-demos.mjs   # 头注释 / 脚本语法 / manifest 一致性校验
    ├── validate-browser-smoke.mjs
    ├── validate-typescript-coverage.mjs
    └── gen-readme-tables.mjs
```

## 推荐学习顺序

### JavaScript

`01-基础 → 02-函数与作用域 → 03-对象与原型 → 04-ES6+ → 05-元编程 → 06-浏览器API → 07-进阶 → 08-面试题 → 09-Canvas`

### TypeScript

`01-基础 → 02-进阶 → 03-工程与框架`（建议在 JavaScript `04-ES6+` 之后）

### 框架

1. **Vue 2** → `src/响应式原理` → `src/基础语法` → `src/生命周期` → `src/组件` → `src/路由与状态` → `src/原理与性能`
2. **Vue 3** → `src/01-基础语法` → … → `src/07-路由状态工程化`（含 Vite / script setup 宏）→ `src/08-原理与性能面试`
3. **React** → `src/function-components/` 按编号；类组件见 `class-components/`

### CSS

`01-基础 → 02-布局 → 03-动画 → 04-视觉效果 → 05-响应式 → 06-性能 → 07-现代特性`

## 工作流

新增 / 改名 / 删除 demo 后，**必须运行**：

```bash
npm run build:index
npm run sync:readmes
npm run validate      # 本地校验（CI 同样会跑）
```

只检查生成文件是否同步、不写入文件：

```bash
npm run check:index
node scripts/sync-readmes.mjs --check
```

完整规范见 [`CONVENTIONS.md`](CONVENTIONS.md)。

## 仓库约定

- **文件命名**：`NN-中文/英文API名.html`，连字符 `-` 连接，**不**用下划线 / 拼音首字母 / 无意义编号
- **目录命名**：中文短语，一级目录加 `NN-` 编号
- **`libs/`**：第三方运行时，每个目录里有 `README.md` 标注版本与官方地址
- **不要手改 `manifest.json` 与 VitePress 自动生成文件**：它们是脚本输出
- **demo 头注释**：每个 `.html` 在 `<!DOCTYPE` 前应有 `分类` / `主题` / `要点` 块

如果你打算批量改名或新增分类，先读 [`CONVENTIONS.md`](CONVENTIONS.md)。
