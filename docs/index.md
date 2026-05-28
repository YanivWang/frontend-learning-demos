---
layout: home

hero:
  name: frontend-learning-demos
  text: 前端语法与框架复习
  tagline: 360 个可独立打开的 HTML Demo · 即开即学
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 浏览 Demo
      link: /demos/

features:
  - title: 可运行 Demo
    details: 每个 HTML 直接在浏览器打开。JavaScript、CSS、Vue 2/3、React 18/19、TypeScript 全覆盖。
  - title: 统一元数据
    details: demo 头注释驱动 manifest、README 清单与 VitePress 导航，改一处、处处同步。
  - title: 单一入口
    details: VitePress 提供搜索、侧边栏与 Demo 索引；demo 本体仍在 apps/ 目录。

---

## 分类概览

| 分类 | 路径 | demo 数 | 说明 |
| --- | --- | ---: | --- |
| JavaScript | `apps/javascript/` | 129 | 纯 JS，按 01–09 编号 |
| CSS | `apps/css/` | 44 | 布局、动画、响应式、现代特性 |
| Vue 2 / Vue 3 | `apps/vue2/` `apps/vue3/` | 57 / 41 | 框架语法与原理 |
| React 18 / React 19 | `apps/react18/` `apps/react19/` | 53 / 11 | 函数组件 + 类组件 / 19 新特性 |
| TypeScript | `apps/typescript/` | 18 | 基础、进阶、工程化 |
| 综合 Demo | `apps/demos/` | 7 | 拖拽、ViewPager、Todo 等 |

左侧 **Demo 分类** 侧边栏由 `manifest.json` 自动生成，新增 demo 后运行 `npm run build:index` 即可更新。

完整可搜索摘要见 [Demo 搜索索引](/demos/search-index)。
