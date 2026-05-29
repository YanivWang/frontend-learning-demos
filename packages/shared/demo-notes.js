(function () {
  document.querySelectorAll('.demo-notes h2').forEach(function (heading) {
    if (heading.textContent.trim() !== '参考资料') return;

    var list = heading.nextElementSibling;
    while (list && list.tagName !== 'UL') {
      list = list.nextElementSibling;
    }
    if (!list) return;

    list.querySelectorAll('a[href]').forEach(function (link) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });
  });
})();
