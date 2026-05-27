# CSS 面试知识补齐计划

> 仓库 `css/` 在补齐现代特性后共 **36** 个 demo，完整清单见 [`css/README.md`](css/README.md)。

## 目标

在原有布局 / 动画 / 响应式 / 性能基础上，补齐 CSS 面试中 increasingly 常见的新特性：**:has()**、**@layer**、**Container Queries**。

## 完成清单

- [x] 新建 `css/07-现代特性/01-has选择器/`
- [x] 新建 `css/07-现代特性/02-layer层叠管理/`
- [x] 新建 `css/07-现代特性/03-container-queries容器查询/`
- [x] 更新 `css/README.md` 目录表与推荐顺序

## 验证方式

- `node scripts/validate-demos.mjs` 通过
- 浏览器打开三个新 demo 目视确认交互

## 后续可选

- `:is()` / `:where()` 与特异性
- `@scope`、视图过渡 View Transitions API（CSS 部分）
- 子网格 subgrid、`:has()` 与表单 UX 组合题
