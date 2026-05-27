# TypeScript

TypeScript 面试与语法复习 demo，共 **15** 个 `.html`。本模块在浏览器中直接打开，**运行时仍为 JavaScript**；TypeScript 源码以 `<pre>` 展示，可运行部分用等价 JS + JSDoc 演示类型意图（真实项目用 `tsc` / Vite 编译 `.ts`）。

## 目录概览

| 目录 | 知识点 |
|---|---|
| `01-基础/` | 类型注解与推断、`interface` vs `type`、泛型、函数重载、元组、字面量、class、enum |
| `02-进阶/` | 类型收窄、可辨识联合、Utility Types、条件类型、`infer`、映射类型、`never` 穷尽检查 |
| `03-工程与框架/` | `tsconfig` 严格模式、`.d.ts` / `declare module`、Vue3 / React 组件类型 |

## 推荐顺序

`01-基础/01 → 02 → 03 → 04 → 05 → 06 → 07` → `02-进阶/01 → 02 → 03 → 04 → 05` → `03-工程与框架/01 → 02 → 03`

更细的补齐记录见 [`../../docs/plans/TypeScript面试知识补齐计划.md`](../../docs/plans/TypeScript面试知识补齐计划.md)。

## 完整 demo 清单

<!-- DEMO_TABLE_START -->

共 **18** 个 demo（由 `node scripts/sync-readmes.mjs` 根据头注释自动生成，请勿手改表格正文）。

| 文件 | 主题 |
|---|---|
| `01-基础/01-类型注解与推断.html` | 类型注解、推断与基本类型 |
| `01-基础/02-interface与type.html` | interface 与 type 别名 |
| `01-基础/03-泛型基础.html` | 泛型函数与约束 |
| `01-基础/04-函数类型与重载.html` | 函数类型、可选参数、剩余参数与函数重载 |
| `01-基础/05-数组元组与字面量.html` | 数组、元组、readonly、字面量类型、as const 与 satisfies |
| `01-基础/06-class与implements.html` | class、implements、abstract 与访问修饰符 |
| `01-基础/07-enum与对象枚举.html` | enum、const enum 与对象枚举 |
| `02-进阶/01-类型收窄.html` | 类型收窄与 discriminated union |
| `02-进阶/02-Utility-Types.html` | Utility Types：Partial、Pick、Omit、Record、Readonly、Required |
| `02-进阶/03-条件类型与infer.html` | 条件类型、infer、ReturnType 与 Awaited |
| `02-进阶/04-映射类型与模板字面量.html` | 映射类型、索引访问与模板字面量类型 |
| `02-进阶/05-never与穷尽检查.html` | never、穷尽检查与 assertNever |
| `02-进阶/06-手写Utility-Types练习.html` | 手写 Utility Types 练习 |
| `03-工程与框架/01-tsconfig-strict配置.html` | tsconfig、strict、noImplicitAny 与常用工程配置 |
| `03-工程与框架/02-类型声明与模块.html` | .d.ts、declare module 与第三方库类型声明 |
| `03-工程与框架/03-Vue3与React组件类型.html` | Vue3 与 React 中的组件 Props 类型 |
| `03-工程与框架/04-React表单与Vue-emits类型.html` | React 表单事件与 Vue defineEmits 类型 |
| `mini-project/index.html` | TypeScript mini-project 与 tsc --noEmit |

<!-- DEMO_TABLE_END -->
