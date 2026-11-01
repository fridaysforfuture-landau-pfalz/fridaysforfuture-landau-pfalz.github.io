// Einwilligung für externe Medien (YouTube).
// - Ohne Entscheidung: Auf Seiten mit Videos erscheint unten ein Hinweis-Banner.
// - "Videos erlauben": Alle Videos laden sofort, auch auf allen weiteren Seiten.
// - "Nur bei Klick": Videos laden erst, wenn man auf "Video abspielen" klickt.
// Die Entscheidung wird nur im Browser gespeichert (localStorage). Ändern auf /datenschutz.
(function () {
  'use strict';
  var SCHLUESSEL = 'fff-externe-medien';

  function lies() {
    try { return window.localStorage.getItem(SCHLUESSEL); } catch (e) { return null; }
  }
  function schreibe(wert) {
    try {
      if (wert) window.localStorage.setItem(SCHLUESSEL, wert);
      else window.localStorage.removeItem(SCHLUESSEL);
    } catch (e) { /* egal */ }
  }

  function ladeVideo(box, autoplay) {
    var id = box.getAttribute('data-youtube');
    if (!/^[A-Za-z0-9_-]{6,20}$/.test(id) || box.classList.contains('fff-video--aktiv')) return;
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + id + (autoplay ? '?autoplay=1' : '');
    f.title = 'YouTube-Video';
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    f.allowFullscreen = true;
    f.setAttribute('frameborder', '0');
    box.textContent = '';
    box.classList.add('fff-video--aktiv');
    box.appendChild(f);
  }

  function alleVideos() {
    return Array.prototype.slice.call(document.querySelectorAll('.fff-video[data-youtube]'));
  }

  function erlauben() {
    schreibe('ja');
    alleVideos().forEach(function (b) { ladeVideo(b, false); });
    bannerWeg();
    zeigeEinstellung();
  }

  function nurBeiKlick() {
    schreibe('nein');
    bannerWeg();
    zeigeEinstellung();
  }

  function bannerWeg() {
    var b = document.getElementById('fff-einwilligung');
    if (b) b.parentNode.removeChild(b);
  }

  function knopf(text, klasse, fn) {
    var k = document.createElement('button');
    k.type = 'button';
    k.className = klasse;
    k.textContent = text;
    k.addEventListener('click', fn);
    return k;
  }

  function zeigeBanner() {
    if (document.getElementById('fff-einwilligung')) return;
    var b = document.createElement('div');
    b.id = 'fff-einwilligung';
    b.className = 'fff-einwilligung';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Externe Inhalte');
    var t = document.createElement('p');
    t.innerHTML = 'Auf dieser Seite gibt es Videos von <b>YouTube</b>. Wenn du sie erlaubst, werden sie direkt geladen. ' +
      'Dabei werden Daten (z.&nbsp;B. deine IP-Adresse) an YouTube/Google übertragen und YouTube kann Cookies setzen. ' +
      'Mehr in unserer <a href="/datenschutz">Datenschutzerklärung</a>.';
    var k = document.createElement('div');
    k.className = 'fff-einwilligung__knoepfe';
    k.appendChild(knopf('Videos erlauben', 'fff-btn', erlauben));
    k.appendChild(knopf('Nur bei Klick laden', 'fff-btn fff-btn--hell', nurBeiKlick));
    b.appendChild(t);
    b.appendChild(k);
    document.body.appendChild(b);
  }

  // Einstellung auf der Datenschutz-Seite
  function zeigeEinstellung() {
    var ziel = document.querySelector('[data-einwilligung-einstellung]');
    if (!ziel) return;
    ziel.textContent = '';
    var stand = lies();
    var p = document.createElement('p');
    p.innerHTML = 'Dein aktueller Stand: <b>' +
      (stand === 'ja' ? 'YouTube-Videos werden direkt geladen.' : stand === 'nein' ? 'YouTube-Videos laden erst nach einem Klick.' : 'Noch keine Entscheidung getroffen.') + '</b>';
    ziel.appendChild(p);
    if (stand !== 'ja') ziel.appendChild(knopf('Videos immer direkt laden', 'fff-btn', function () { schreibe('ja'); zeigeEinstellung(); }));
    if (stand !== 'nein') ziel.appendChild(knopf('Videos nur bei Klick laden (Einwilligung widerrufen)', 'fff-btn fff-btn--hell', function () { schreibe('nein'); zeigeEinstellung(); }));
  }

  function start() {
    var videos = alleVideos();
    var stand = lies();
    videos.forEach(function (box) {
      var k = box.querySelector('.fff-video__laden');
      if (k) k.addEventListener('click', function () { ladeVideo(box, true); });
      var immer = box.querySelector('.fff-video__immer');
      if (immer) immer.addEventListener('click', function (e) { e.preventDefault(); erlauben(); });
    });
    if (stand === 'ja') videos.forEach(function (b) { ladeVideo(b, false); });
    else if (stand === null && videos.length) zeigeBanner();
    zeigeEinstellung();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
