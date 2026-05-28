/**
 * demo-log.js — 将 console.log 同步渲染到页面 #demo-output / .demo-output
 * 供 apps/javascript 等纯脚本 demo 使用，避免 file:// 打开时只有空白页。
 */
(function demoLog() {
  const out = document.getElementById('demo-output') || document.querySelector('.demo-output');
  if (!out) return;

  function formatArg(arg) {
    if (arg === null) return 'null';
    if (arg === undefined) return 'undefined';
    if (typeof arg === 'object') {
      try {
        return JSON.stringify(arg, null, 2);
      } catch {
        return String(arg);
      }
    }
    return String(arg);
  }

  function appendLine(text) {
    out.textContent += (out.textContent ? '\n' : '') + text;
  }

  const origLog = console.log.bind(console);
  console.log = function (...args) {
    origLog(...args);
    appendLine(args.map(formatArg).join(' '));
  };
})();
