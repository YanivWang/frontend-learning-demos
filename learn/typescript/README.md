# TypeScript

TypeScript 面试与语法复习 demo，共 **4** 个 `.html`。本模块在浏览器中直接打开，**运行时仍为 JavaScript**；TypeScript 源码以 `<pre>` 展示，可运行部分用等价 JS + JSDoc 演示类型意图（真实项目用 `tsc` / Vite 编译 `.ts`）。

## 目录概览

| 目录 | 知识点 |
|---|---|
| `01-基础/` | 类型注解与推断、`interface` vs `type`、泛型函数与 `extends` 约束 |
| `02-进阶/` | 类型收窄、可辨识联合（discriminated union） |

## 推荐顺序

`01-基础/01 → 02 → 03` → `02-进阶/01`

更细的补齐记录见 [`../../docs/plans/TypeScript面试知识补齐计划.md`](../../docs/plans/TypeScript面试知识补齐计划.md)。

## 完整 demo 清单

<!-- DEMO_TABLE_START -->

共 **4** 个 demo（由 `node scripts/sync-readmes.mjs` 根据头注释自动生成，请勿手改表格正文）。

| 文件 | 主题 |
|---|---|
| `01-基础/01-类型注解与推断.html` | 类型注解、推断与基本类型 |
| `01-基础/02-interface与type.html` | interface 与 type 别名 |
| `01-基础/03-泛型基础.html` | 泛型函数与约束 |
| `02-进阶/01-类型收窄.html` | 类型收窄与 discriminated union |

<!-- DEMO_TABLE_END -->
