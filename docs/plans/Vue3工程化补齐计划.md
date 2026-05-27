# Vue3 工程化补齐计划

> 仓库 `apps/vue3/src/` 共 **39** 个 demo，完整清单见 [`apps/vue3/README.md`](../../apps/vue3/README.md)。

## 目标

补齐 Vue3 面试中「只会写组件、不懂工程化」的空白：Vite 目录结构、与 Webpack 对比、script setup 编译宏。

## 完成清单

- [x] 根目录遗留 `响应式状态.html` → `02-响应式与副作用/07-ref-reactive-shallowRef对比.html`
- [x] 根目录遗留 `生命周期钩子.html` → `03-生命周期与组合式/04-全量钩子与KeepAlive.html`
- [x] 新建 `07-路由状态工程化/04-Vite工程化面试点.html`
- [x] 新建 `07-路由状态工程化/05-script-setup编译宏.html`
- [x] 更新 `apps/vue3/README.md`，移除「根目录补充示例」

## 验证方式

- `node scripts/validate-demos.mjs` 通过
- 新 demo 在浏览器中打开无控制台报错

## 后续可选

- 可运行的 Vue Router 4 + Pinia 最小示例（当前 libs 已内置）
- Vitest 单元测试面试边界
- Vue 3.5+ Props 解构、`useTemplateRef` 与现有 demo 串联复习
