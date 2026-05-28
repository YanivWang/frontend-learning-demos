# 学习路线

按下面顺序阅读 demo，由浅入深。侧边栏已按目录编号排列；下方链接可直接打开对应 demo。

## JavaScript

`01-基础 → 02-函数与作用域 → 03-对象与原型 → 04-ES6+ → 05-元编程 → 06-浏览器API → 07-进阶 → 08-面试题 → 09-Canvas`

| 阶段       | 入口 demo                                                                                                                                                                                           |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 入门       | [变量](/apps/javascript/01-%E5%9F%BA%E7%A1%80/%E5%8F%98%E9%87%8F.html) · [严格模式](/apps/javascript/01-%E5%9F%BA%E7%A1%80/%E4%B8%A5%E6%A0%BC%E6%A8%A1%E5%BC%8F.html)                               |
| 浏览器 API | [HTTP 缓存](/apps/javascript/06-%E6%B5%8F%E8%A7%88%E5%99%A8API/HTTP%E7%BC%93%E5%AD%98.html) · [WebSocket](/apps/javascript/06-%E6%B5%8F%E8%A7%88%E5%99%A8API/WebSocket.html)                        |
| 手写题     | [call/apply](/apps/javascript/08-%E9%9D%A2%E8%AF%95%E9%A2%98/%E6%89%8B%E5%86%99/01-call-apply.html) · [Promise](/apps/javascript/08-%E9%9D%A2%E8%AF%95%E9%A2%98/%E6%89%8B%E5%86%99/05-Promise.html) |

## TypeScript

`01-基础 → 02-进阶 → 03-工程与框架`（建议在 JavaScript `04-ES6+` 之后）

| 入口 | [类型注解与推断](/apps/typescript/01-%E5%9F%BA%E7%A1%80/01-%E7%B1%BB%E5%9E%8B%E6%B3%A8%E8%A7%A3%E4%B8%8E%E6%8E%A8%E6%96%AD.html) · [mini-project](/apps/typescript/mini-project/index.html) |

## 框架

### Vue 2

[模板语法](/apps/vue2/src/01-%E5%9F%BA%E7%A1%80%E8%AF%AD%E6%B3%95/01-%E6%A8%A1%E6%9D%BF%E8%AF%AD%E6%B3%95-base.html) → [响应式原理](/apps/vue2/src/02-%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86/01-%E6%89%8B%E5%86%99Observer-Dep-Watcher.html) → [路由](/apps/vue2/src/05-%E8%B7%AF%E7%94%B1%E4%B8%8E%E7%8A%B6%E6%80%81/01-%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0.html)

### Vue 3

[应用实例](/apps/vue3/src/01-%E5%9F%BA%E7%A1%80%E8%AF%AD%E6%B3%95/01-%E5%BA%94%E7%94%A8%E5%AE%9E%E4%BE%8B%E4%B8%8E%E6%A8%A1%E6%9D%BF%E8%AF%AD%E6%B3%95.html) → [Router+Pinia](/apps/vue3/src/07-%E8%B7%AF%E7%94%B1%E7%8A%B6%E6%80%81%E5%B7%A5%E7%A8%8B%E5%8C%96/06-Router%E4%B8%8EPinia%E5%8F%AF%E8%BF%90%E8%A1%8C%E7%A4%BA%E4%BE%8B.html)

### React 18

[入门渲染](/apps/react18/src/function-components/01-%E5%85%A5%E9%97%A8-%E5%85%83%E7%B4%A0%E4%B8%8E%E6%B8%B2%E6%9F%93.html) → [useState](/apps/react18/src/function-components/12-Hooks-useState%E5%9F%BA%E7%A1%80.html) · [类组件](/apps/react18/src/class-components/01-class-%E5%BF%85%E9%A1%BBsuper.html)

### React 19

[createRoot](/apps/react19/src/01-%E5%9F%BA%E7%A1%80%E8%AF%AD%E6%B3%95/01-%E5%85%A5%E9%97%A8-createRoot%E4%B8%8E%E5%85%83%E7%B4%A0.html) → [Actions](/apps/react19/src/01-%E5%9F%BA%E7%A1%80%E8%AF%AD%E6%B3%95/03-Actions%E4%B8%8EuseActionState.html)（建议在 React 18 Hooks 之后）

## CSS

[选择器](/apps/css/01-%E5%9F%BA%E7%A1%80/%E9%80%89%E6%8B%99%E5%99%A8%E4%B8%8E%E4%BC%98%E5%85%88%E7%BA%A7/index.html) → [Flex](/apps/css/02-%E5%B8%83%E5%B1%80/flex/index.html) → [重排重绘](/apps/css/06-%E6%80%A7%E8%83%BD/01-%E9%87%8D%E6%8E%92%E9%87%8D%E7%BB%98/index.html) → [:has()](/apps/css/07-%E7%8E%B0%E4%BB%A3%E7%89%B9%E6%80%A7/01-has%E9%80%89%E6%8B%A9%E5%99%A8/index.html)

## 综合 Demo

| 项目      | 链接                                                                                            |
| --------- | ----------------------------------------------------------------------------------------------- |
| 拖拽      | [原生 drag](/apps/demos/drag/01-drag-%E5%8E%9F%E7%94%9F.html)                                   |
| Todo      | [本地状态](/apps/demos/todo/01-todo-%E6%9C%AC%E5%9C%B0%E7%8A%B6%E6%80%81.html)                  |
| 虚拟列表  | [固定行高](/apps/demos/virtual-list/01-virtual-list-%E5%9B%BA%E5%AE%9A%E9%AB%98%E5%BA%A6.html)  |
| 分步表单  | [form-wizard](/apps/demos/form-wizard/01-form-wizard-%E5%88%86%E6%AD%A5%E8%A1%A8%E5%8D%95.html) |
| Hash 路由 | [简易 SPA](/apps/demos/hash-router/01-hash-router-%E7%AE%80%E6%98%93%E8%B7%AF%E7%94%B1.html)    |
