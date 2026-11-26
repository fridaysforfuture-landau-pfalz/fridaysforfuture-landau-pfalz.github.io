// Dunkelmodus: Knopf oben rechts in der grünen Leiste schaltet zwischen hell und dunkel um.
// Die Wahl wird im Browser gespeichert (localStorage "fff-modus"). Standard ist hell.
(function () {
  var html = document.documentElement;
  var knopf = document.querySelector('.fff-modus-knopf');
  if (!knopf) return;

  // Der Knopf trägt die Klasse search__toggle (damit das Theme Platz für ihn lässt).
  // Die Suche des Themes hängt sich daran (sobald die Seite bereit ist);
  // direkt danach entfernen wir diesen Klick-Handler wieder.
  if (window.jQuery) {
    window.jQuery(function () {
      window.jQuery(knopf).off('click');
    });
  }

  function istDunkel() {
    return html.getAttribute('data-modus') === 'dunkel';
  }

  function beschriften() {
    var text = istDunkel() ? 'Hellen Modus einschalten' : 'Dunkelmodus einschalten';
    knopf.setAttribute('aria-label', text);
    knopf.setAttribute('title', text);
    knopf.setAttribute('aria-pressed', istDunkel() ? 'true' : 'false');
  }

  knopf.addEventListener('click', function () {
    if (istDunkel()) {
      html.removeAttribute('data-modus');
    } else {
      html.setAttribute('data-modus', 'dunkel');
    }
    try {
      localStorage.setItem('fff-modus', istDunkel() ? 'dunkel' : 'hell');
    } catch (e) {}
    beschriften();
  });

  beschriften();
})();
