// 分类: javascript / 06-浏览器API / WebWorker / 01-基础
// 主题: 被 worker.js 通过 importScripts 引入的子脚本
// 要点:
//   - 子脚本运行在 worker 的全局作用域里，可被 worker.js 直接调用

function sayHello() {
    console.log("I am child worker!");
}
