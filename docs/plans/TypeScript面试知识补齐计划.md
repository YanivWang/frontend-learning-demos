# TypeScript 面试知识补齐计划

> 仓库新增并补齐 `apps/typescript/` 模块，共 **15** 个 demo，完整清单见 [`apps/typescript/README.md`](../../apps/typescript/README.md)。

## 目标

在前端面试中 TypeScript 已是默认项，本仓库原缺 TS 专题。采用「TS 源码展示 + 等价 JS 运行」的零构建方案，覆盖基础语法、进阶类型、工程配置与框架组件类型中的最高频问题。

## 完成清单

- [x] 新建 `apps/typescript/01-基础/01-类型注解与推断.html`
- [x] 新建 `apps/typescript/01-基础/02-interface与type.html`
- [x] 新建 `apps/typescript/01-基础/03-泛型基础.html`
- [x] 新建 `apps/typescript/01-基础/04-函数类型与重载.html`
- [x] 新建 `apps/typescript/01-基础/05-数组元组与字面量.html`
- [x] 新建 `apps/typescript/01-基础/06-class与implements.html`
- [x] 新建 `apps/typescript/01-基础/07-enum与对象枚举.html`
- [x] 新建 `apps/typescript/02-进阶/01-类型收窄.html`
- [x] 新建 `apps/typescript/02-进阶/02-Utility-Types.html`
- [x] 新建 `apps/typescript/02-进阶/03-条件类型与infer.html`
- [x] 新建 `apps/typescript/02-进阶/04-映射类型与模板字面量.html`
- [x] 新建 `apps/typescript/02-进阶/05-never与穷尽检查.html`
- [x] 新建 `apps/typescript/03-工程与框架/01-tsconfig-strict配置.html`
- [x] 新建 `apps/typescript/03-工程与框架/02-类型声明与模块.html`
- [x] 新建 `apps/typescript/03-工程与框架/03-Vue3与React组件类型.html`
- [x] 新建 `apps/typescript/README.md`
- [x] `build-index` / `sync-readmes` / `validate-demos` 纳入 `apps/typescript/`
- [x] 新建 `scripts/validate-typescript-coverage.mjs` 校验 TS 高频主题覆盖度

## 验证方式

- `node scripts/validate-demos.mjs` 通过
- `node scripts/validate-typescript-coverage.mjs` 通过
- 各 demo 内联脚本 `node --check` 无语法错误

## 后续可选

- 引入真实 `.ts` / `tsconfig.json` 小工程，配合 `tsc --noEmit` 展示编译报错
- 增加 React 表单事件、Vue `defineEmits<T>()`、路由 meta 类型等框架专项
- 增加手写简化版 `Partial` / `Pick` / `Omit` / `ReturnType` 的练习页
- 引入 vendored `typescript.js` 做浏览器内实时编译（体积较大，按需）
