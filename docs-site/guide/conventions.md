# 命名约定

完整规范见仓库根目录 [`CONVENTIONS.md`](https://github.com/jsAppSpace/js-css-vue-react-apps/blob/main/CONVENTIONS.md)。下面是核心摘要。

## 目录结构

| 目录 | 用途 |
| --- | --- |
| `apps/javascript/` | 纯 JavaScript，01–09 编号 |
| `apps/css/` | CSS 布局 / 动画 / 响应式等 |
| `apps/vue2/` `apps/vue3/` | Vue demo（`libs/` + `src/`） |
| `apps/react18/` | React 18 demo |
| `apps/typescript/` | TypeScript |
| `apps/demos/` | 综合小项目 |
| `docs-site/` | VitePress 文档站（唯一入口） |

## 文件命名

- 格式：`NN-中文或API名.html`，连字符 `-` 连接
- ✅ `01-变量.html` `05-Promise-并发.html`
- ❌ `test1.html` `var1.html` `class2_state.html`

## Demo 头注释

每个 demo 在 `<!DOCTYPE html>` 前应有：

```html
<!--
  分类: javascript / 01-基础
  主题: 严格模式 use strict
  要点:
    - 必须在脚本/函数体第一行
    - ...
-->
```

这些元数据会同步到 manifest、README 清单与 VitePress 导航。

## 不要手改

- `manifest.json`
- `docs-site/.vitepress/sidebar.generated.mts`
- `docs-site/demos/index.md`（顶部有 AUTO-GENERATED 标记）

改 demo 后运行 `npm run build:index` 即可。
