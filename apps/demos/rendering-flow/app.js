/*
  app.js
  defer 脚本 —— 与 HTML 解析并行下载，等 DOM 完全解析后才执行。
  可以安全操作 DOM，多个 defer 脚本按顺序执行。
*/
console.log('[app.js] 已执行（defer，DOM 解析完成后执行）')
console.log('[app.js] document.readyState:', document.readyState) // 应为 "interactive"
