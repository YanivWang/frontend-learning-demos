// 分类: javascript / 06-浏览器API / WebWorker / 01-基础
// 主题: 主线程加载的子 worker 脚本
// 要点:
//   - importScripts 在 worker 内部加载其他子脚本，作用域是 self
//   - self 指向 worker 自己的全局对象（不是 window）
//   - 与主线程仅通过 postMessage / onmessage 通讯

importScripts('childWorker.js');

console.log('worker 线程被创建...');

// WebWorker 有自己的全局对象，不是主线程的 window，而是 worker 专用的「全局对象」
// self 代表子线程本身，也就是子线程的全局对象 / 全局作用域
self.addEventListener(
  'message',
  function (e) {
    // 子线程中调用通过 importScripts 引入的子脚本
    sayHello();

    // 循环 1e7 次累加，演示 worker 计算（数值过大会阻塞过久）
    let sum = 0;
    for (let i = 0; i < 1e7; i++) {
      sum = sum + i;
    }
    console.log('work sum: ' + sum);

    self.postMessage('you said: ' + sum);

    let cmd = e.data;
    switch (cmd) {
      case '1':
        self.postMessage('worker start!');
        break;
      case '2':
        self.postMessage('worker stop!');
        // 线程内部关闭自身
        self.close();
        break;
      default:
        self.postMessage('unknown cmd!');
        break;
    }
  },
  false,
);
