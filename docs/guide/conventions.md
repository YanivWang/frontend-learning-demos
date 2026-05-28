# 命名约定

完整规范见仓库根目录 [`CONVENTIONS.md`](https://github.com/jsAppSpace/js-css-vue-react-apps/blob/main/CONVENTIONS.md)。下面是核心摘要。

## 目录结构

| 目录                      | 用途                         |
| ------------------------- | ---------------------------- |
| `apps/javascript/`        | 纯 JavaScript，01–09 编号    |
| `apps/css/`               | CSS 布局 / 动画 / 响应式等   |
| `apps/vue2/` `apps/vue3/` | Vue demo（`libs/` + `src/`） |
| `apps/react18/`           | React 18 demo                |
| `apps/react19/`           | React 19 新特性与面试 demo   |
| `apps/typescript/`        | TypeScript                   |
| `apps/demos/`             | 综合小项目                   |
| `docs/`                   | VitePress 文档站（唯一入口） |

## 文件命名

- 格式：`NN-中文或API名.html`，连字符 `-` 连接
- ✅ `01-变量.html` `05-Promise-并发.html` `03-3D按钮.html`
- ❌ `test1.html` `3dButton.html` `class2_state.html`

## Demo 头注释

每个 demo 在 `<!DOCTYPE html>` 前应有：

```html
<!--
  分类: javascript / 01-基础
  主题: 严格模式 use strict
  难度: 入门
  前置: 变量
  相关: 函数进阶
  要点:
    - 必须在脚本/函数体第一行
    - ...
-->
```

可选字段 `难度` / `前置` / `相关` 会进入 manifest 搜索文本；`相关` 会注入页脚「相关阅读」链接。

## 页面骨架（JavaScript 01-基础 / 08-手写）

- `<h1>` 与头注释「主题」一致
- 可见输出区：`<pre id="demo-output" class="demo-output">`
- 引用 `packages/shared/demo-log.js` 同步 `console.log` 到页面

## 不要手改

- `manifest.json`
- `docs/.vitepress/sidebar.generated.mts`
- `docs/demos/index.md`（顶部有 AUTO-GENERATED 标记）
- `docs/index.md` / `docs/demos/search-index.md`（由脚本同步）

改 demo 后运行 `npm run build:index` 即可。
