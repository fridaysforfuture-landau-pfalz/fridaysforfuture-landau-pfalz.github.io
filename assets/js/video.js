// Zwei-Klick-Videos: Das YouTube-Video wird erst nach einem Klick geladen (youtube-nocookie.com).
(function () {
  'use strict';
  function start() {
    document.querySelectorAll('.fff-video[data-youtube]').forEach(function (box) {
      var knopf = box.querySelector('.fff-video__laden');
      if (!knopf) return;
      knopf.addEventListener('click', function () {
        var id = box.getAttribute('data-youtube');
        if (!/^[A-Za-z0-9_-]{6,20}$/.test(id)) return;
        var f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1';
        f.title = 'YouTube-Video';
        f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        f.allowFullscreen = true;
        f.setAttribute('frameborder', '0');
        box.textContent = '';
        box.classList.add('fff-video--aktiv');
        box.appendChild(f);
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
