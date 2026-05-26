// 分类: javascript / 04-ES6+ / ES6模块
// 主题: 被 index.html 静态导入的子模块
// 要点:
//   - export 命名导出 / 默认导出可同时存在
//   - 顶层代码会在模块首次被加载时执行一次（模块单例）

console.log("我是模块A");

export let nameVar = "我是王成";
export const sayHello = () => {
  console.log("nameVar", nameVar);
};

export let ageVar = 30;
