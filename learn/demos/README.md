# 综合 Demo

不属于单一知识点的小项目 / 交互实验。共 **5** 个 `.html`，均已具备与 [`CONVENTIONS.md`](../../CONVENTIONS.md) §4 一致的头注释。

第三方运行时见 [`libs/README.md`](libs/README.md)（Tailwind 浏览器版、Font Awesome 等）。

## 列表

| 文件 | 主题 |
|---|---|
| `drag/01-drag-原生.html` | 原生 HTML5 拖拽 API（drag & drop） |
| `drag/02-drag-HTML5拖放复制.html` | HTML5 拖放复制（带 UI 反馈） |
| `svg/01-SVG-基础.html` | SVG 基础元素（矩形 / 圆形 / 文本） |
| `viewpager/01-viewpager-翻页与缓动.html` | ViewPager 翻页组件 + 多种缓动插值器 |
| `todo/01-todo-本地状态.html` | Todo 本地状态与 localStorage 持久化 |

## 说明

- `drag/02` 通过 `../libs/tailwindcss.js` 引入 Tailwind，无需构建。
- 新增综合 demo 后请运行 `npm run build:index` 更新总入口。
