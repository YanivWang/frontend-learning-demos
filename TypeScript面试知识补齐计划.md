# TypeScript 面试知识补齐计划

> 仓库新增顶层 `typescript/` 模块，共 **4** 个 demo，完整清单见 [`typescript/README.md`](typescript/README.md)。

## 目标

在前端面试中 TypeScript 已是默认项，本仓库原缺 TS 专题。采用「TS 源码展示 + 等价 JS 运行」的零构建方案，覆盖最高频基础题。

## 完成清单

- [x] 新建 `typescript/01-基础/01-类型注解与推断.html`
- [x] 新建 `typescript/01-基础/02-interface与type.html`
- [x] 新建 `typescript/01-基础/03-泛型基础.html`
- [x] 新建 `typescript/02-进阶/01-类型收窄.html`
- [x] 新建 `typescript/README.md`
- [x] `build-index` / `sync-readmes` / `validate-demos` 纳入 `typescript/`

## 验证方式

- `node scripts/validate-demos.mjs` 通过
- 各 demo 内联脚本 `node --check` 无语法错误

## 后续可选

- Utility Types：`Partial` / `Pick` / `Omit` / `Record`
- 条件类型与 `infer`
- 与 Vue3 `defineProps<T>()` / React `FC<Props>` 结合的 mini 示例
- 引入 vendored `typescript.js` 做浏览器内实时编译（体积较大，按需）
