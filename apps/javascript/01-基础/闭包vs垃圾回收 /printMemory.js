window.printMemory = function () {
  console.log('================打印内存使用情况================');
  console.log(
    'jsHeapSizeLimit:',
    (performance.memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2) + 'MB',
  );
  console.log(
    'totalJSHeapSize:',
    (performance.memory.totalJSHeapSize / 1024 / 1024).toFixed(2) + 'MB',
  );
  console.log(
    'usedJSHeapSize(已用):',
    (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2) + 'MB',
  );
};
