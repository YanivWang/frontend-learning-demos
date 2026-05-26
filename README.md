# js-css-vue-react-learn

前端语法与框架复习 Demo 库。**每个 HTML 直接在浏览器打开，无需构建**。

## 快速开始

```bash
# 用浏览器或 Live Server 打开入口
open index.html
```

`index.html` 是总入口，由脚本 [`scripts/build-index.mjs`](scripts/build-index.mjs) 自动扫描生成。

## 目录结构

```text
.
├── index.html               # 总入口（自动生成，请勿手改）
├── manifest.json            # demo 结构化清单（自动生成）
├── README.md                # 本文件
├── CONVENTIONS.md           # 目录与命名约定（每次想动结构前先读它）
├── .gitignore .editorconfig
│
├── javascript/              # 纯 JavaScript（详见 javascript/README.md）
│   ├── 01-基础/
│   ├── 02-函数与作用域/
│   ├── 03-对象与原型/
│   ├── 04-ES6+/
│   ├── 05-元编程/
│   ├── 06-浏览器API/
│   ├── 07-进阶/
│   ├── 08-面试题/
│   └── 09-Canvas/
│
├── css/                     # CSS（详见 css/README.md）
│   ├── 01-布局/
│   ├── 02-动画/
│   ├── 03-视觉效果/
│   ├── 04-响应式/
│   └── CSS选择器/
│
├── vue2/                    # Vue 2.7.16，详见 vue2/README.md
│   ├── libs/                # 第三方运行时（libs/README.md 标注版本）
│   └── src/
│
├── vue3/                    # Vue 3.5.13，详见 vue3/README.md
│   ├── libs/
│   └── src/
│
├── react/                   # React 18，详见 react/README.md
│   ├── libs/                # react18 / react-dom18 / @babel/standalone
│   └── src/                 # 30 个 demo，分为 class-components / function-components
│
├── demos/                   # 综合 Demo（drag / svg / viewpager）
│
└── scripts/
    └── build-index.mjs      # 扫描生成 index.html / manifest.json
```

## 推荐学习顺序

### JavaScript

`01-基础 → 02-函数与作用域 → 03-对象与原型 → 04-ES6+ → 05-元编程 → 06-浏览器API → 07-进阶 → 08-面试题 → 09-Canvas`

详细知识点见 [`javascript/README.md`](javascript/README.md)。

### 框架

1. **Vue 2** → `src/响应式原理` → `src/基础语法` → `src/组件` → `src/路由与状态`
2. **Vue 3** → `src/01-基础语法` → `src/02-响应式与副作用` → `src/03-生命周期与组合式` → `src/04-组件通信` → `src/05-插槽与组件形态` → `src/06-内置组件` → `src/07-路由状态工程化` → `src/08-原理与性能面试`
3. **React** → `src/function-components/01-入门-元素与渲染.html` 起按编号读，30 个 demo 覆盖从 JSX 到完整生命周期

### CSS

`01-布局 → 02-动画 → 03-视觉效果 → 04-响应式 → CSS选择器`

## 工作流

新增 / 改名 / 删除 demo 后，**必须运行**：

```bash
node scripts/build-index.mjs
```

会重新生成根目录的 `index.html` 和 `manifest.json`。完整规范见 [`CONVENTIONS.md`](CONVENTIONS.md)。

## 仓库约定

- **文件命名**：`NN-中文/英文API名.html`，连字符 `-` 连接，**不**用下划线 / 拼音首字母 / 无意义编号
- **目录命名**：中文短语，一级目录加 `NN-` 编号
- **`libs/`**：第三方运行时，每个目录里有 `README.md` 标注版本与官方地址
- **`lib/`**（单数）：demo 同级的小工具脚本
- **不要手改 `index.html`**：它是脚本输出

如果你打算批量改名或新增分类，先读 [`CONVENTIONS.md`](CONVENTIONS.md)。
