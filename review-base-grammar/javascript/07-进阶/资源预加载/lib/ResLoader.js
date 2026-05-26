// 同时支持图片 / 音频预加载，回调式 API
;(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(factory);
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    root.ResLoader = factory(root);
  }
})(this, function () {
  function isFunc(f) {
    return typeof f === "function";
  }

  // 构造器
  function ResLoader(config) {
    this.option = {
      resourceType: "image",  // 资源类型（暂时通过文件后缀自动判断）
      baseUrl: "./",          // 相对 url 的基准路径
      resources: [],          // 资源列表
      onStart: null,          // (total) => void
      onProgress: null,       // (currentIndex, total) => void
      onComplete: null,       // (total) => void
    };

    if (!config) {
      console.warn("ResLoader: config 不能为空");
      return;
    }
    for (const key in config) this.option[key] = config[key];

    this.status = 0;        // 0 未启动 / 1 加载中 / 2 完成
    this.total = this.option.resources.length || 0;
    this.currentIndex = 0;
  }

  ResLoader.prototype.start = function () {
    this.status = 1;
    const _this = this;
    const baseUrl = this.option.baseUrl;
    const isAbs = (u) => u.indexOf("http://") === 0 || u.indexOf("https://") === 0;
    const audioRE = /\.mp3(\?|$)/i;

    for (let i = 0; i < this.option.resources.length; i++) {
      const r = this.option.resources[i];
      const url = isAbs(r) ? r : baseUrl + r;

      if (audioRE.test(url)) {
        const audio = new Audio();
        audio.addEventListener("canplaythrough", () => _this.loaded(), { once: true });
        audio.src = url;
      } else {
        const image = new Image();
        image.onload = image.onerror = () => _this.loaded();
        image.src = url;
      }
    }
    if (isFunc(this.option.onStart)) this.option.onStart(this.total);
  };

  ResLoader.prototype.loaded = function () {
    this.currentIndex++;
    if (isFunc(this.option.onProgress)) {
      this.option.onProgress(this.currentIndex, this.total);
    }
    if (this.currentIndex === this.total) {
      this.status = 2;
      if (isFunc(this.option.onComplete)) this.option.onComplete(this.total);
    }
  };

  return ResLoader;
});
