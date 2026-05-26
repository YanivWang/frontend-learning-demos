// 加 ; 防止压缩/合并时的语句边界问题
// UMD：同一份代码同时兼容 AMD、CommonJS、浏览器全局
;(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD：异步模块
    define(factory);
  } else if (typeof exports === "object") {
    // CommonJS / Node
    module.exports = factory();
  } else {
    // 浏览器全局变量
    root.Record = factory();
  }
})(this, function () {
  const Record = {};

  // ① 默认配置 —— 暴露在 settings 上方便外部读取
  const Settings = (Record.settings = {
    min: 1,
    max: 100,
    speed: 5,
  });

  // ② 用户可定制配置
  Record.configure = function (options) {
    for (const key in options) {
      const value = options[key];
      if (value !== undefined && options.hasOwnProperty(key)) {
        Settings[key] = value;
      }
    }
    // 返回 this 支持链式调用
    return this;
  };

  // ③ 公开方法
  Record.start = function () {
    console.log("record start...");
    return this;
  };

  Record.stop = function () {
    console.log("record stop, max =", max(5, 7));
    return this;
  };

  // ④ 私有方法 —— 闭包内不暴露
  function max(a, b) {
    return a > b ? a : b;
  }

  return Record;
});
