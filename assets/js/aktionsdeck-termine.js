// Öffentliche Termine aus dem AktionsDeck Landau (https://fridaysforfuture-landau.de/aktionsdeck-landau/#/termine)
// Holt die Termine ohne Login über dieselbe Schnittstelle wie die App und zeigt sie im Monatsraster,
// darunter die Termine des Monats als Kacheln (antippen für Details).
// Verwendung: <div class="fff-kalender" data-aktionsdeck-termine></div> und dieses Skript einbinden.
// Freiwillig: data-gruppe="fff" zeigt nur die Termine einer Gruppe (Kurzname aus dem AktionsDeck).
(function () {
  'use strict';

  var API_URL = 'https://script.google.com/macros/s/AKfycbxdAQc32go_QZNAFxeEL89isDW49KTncxkUrEEXUKyDReCZKxChj7B5aPa9wyhy--uf9Q/exec';
  var STANDARD_FARBE = '#368469';
  var MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  var TAGE = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

  function txt(v) { return v === undefined || v === null ? '' : String(v).trim(); }

  function el(tag, klasse, text) {
    var e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (text) e.textContent = text;
    return e;
  }

  function farbeVon(f) {
    var t = txt(f);
    return /^#[0-9a-fA-F]{6}$/.test(t) ? t : STANDARD_FARBE;
  }

  // Weiße oder dunkle Schrift, je nachdem was auf der Farbe besser lesbar ist (wie im AktionsDeck)
  function schriftfarbe(hex) {
    var h = farbeVon(hex);
    function kanal(i) {
      var c = parseInt(h.slice(1 + i * 2, 3 + i * 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }
    var l = 0.2126 * kanal(0) + 0.7152 * kanal(1) + 0.0722 * kanal(2);
    return 1.05 / (l + 0.05) >= (l + 0.05) / 0.0625 ? '#ffffff' : '#1a1e20';
  }

  function sichereUrl(u) {
    var t = txt(u);
    return /^https?:\/\/\S+$/i.test(t) ? t : '';
  }

  function isoDatum(s) {
    var m = txt(s).match(/^(\d{4})-(\d{2})-(\d{2})/);
    return m ? m[1] + '-' + m[2] + '-' + m[3] : '';
  }

  function heuteIso() {
    var d = new Date();
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }

  function tagText(iso) {
    var p = iso.split('-').map(Number);
    var d = new Date(p[0], p[1] - 1, p[2]);
    return TAGE[d.getDay()] + ', ' + ('0' + p[2]).slice(-2) + '.' + ('0' + p[1]).slice(-2) + '.' + p[0];
  }

  function datumsText(t) {
    return t.von === t.bis ? tagText(t.von) : tagText(t.von) + ' – ' + tagText(t.bis);
  }

  function zeitText(t) {
    if (t.zeitVon && t.zeitBis) return t.zeitVon + ' – ' + t.zeitBis + ' Uhr';
    if (t.zeitVon) return 'ab ' + t.zeitVon + ' Uhr';
    return '';
  }

  function bereinige(roh) {
    var heute = heuteIso();
    var liste = [];
    (Array.isArray(roh) ? roh : []).forEach(function (v) {
      var von = isoDatum(v.datum);
      if (!von) return;
      var bis = isoDatum(v.datum_ende);
      if (!bis || bis < von) bis = von;
      if (bis < heute) return;
      liste.push({
        titel: txt(v.titel),
        von: von,
        bis: bis,
        zeitVon: txt(v.zeit_von),
        zeitBis: txt(v.zeit_bis),
        ort: txt(v.ort),
        beschreibung: txt(v.beschreibung),
        veranstalter: txt(v.veranstalter) || txt(v.gruppe_name),
        url: sichereUrl(v.link),
        kurz: txt(v.kurzname).toLowerCase(),
        farbe: farbeVon(v.farbe)
      });
    });
    liste.sort(function (a, b) {
      if (a.von !== b.von) return a.von < b.von ? -1 : 1;
      if (a.zeitVon !== b.zeitVon) return a.zeitVon < b.zeitVon ? -1 : 1;
      return a.titel.localeCompare(b.titel, 'de');
    });
    return liste;
  }

  function kachel(t) {
    var li = el('li');
    var box = el('details');
    box.style.background = t.farbe;
    box.style.color = schriftfarbe(t.farbe);

    var kopf = el('summary');
    kopf.appendChild(el('span', 'fff-termin-datum', datumsText(t)));
    kopf.appendChild(el('strong', null, t.titel || 'Termin'));
    var info = [zeitText(t), t.ort].filter(Boolean).join(' · ');
    if (info) kopf.appendChild(el('span', 'fff-termin-info', info));
    if (t.veranstalter) kopf.appendChild(el('span', 'fff-termin-info', 'Veranstalter: ' + t.veranstalter));
    box.appendChild(kopf);

    var mehr = el('div', 'fff-termin-text');
    if (t.beschreibung) mehr.appendChild(el('p', null, t.beschreibung));
    if (t.url) {
      var a = el('a', null, 'Mehr Infos →');
      a.href = t.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      mehr.appendChild(el('p')).appendChild(a);
    }
    if (!mehr.childNodes.length) mehr.appendChild(el('p', null, 'Keine weiteren Infos.'));
    box.appendChild(mehr);
    li.appendChild(box);
    return li;
  }

  function isoVon(j, m, t) {
    return j + '-' + ('0' + (m + 1)).slice(-2) + '-' + ('0' + t).slice(-2);
  }

  // Monatsraster (Montag bis Sonntag) mit den Terminen, darunter die Termine des Monats als Kacheln
  function zeichne(ziel, alle) {
    var heute = heuteIso();
    var start = { j: Number(heute.slice(0, 4)), m: Number(heute.slice(5, 7)) - 1 };
    var stand = { j: start.j, m: start.m };

    ziel.textContent = '';
    var kopf = el('div', 'fff-kal-kopf');
    var zurueck = el('button', null, '‹');
    zurueck.type = 'button';
    zurueck.setAttribute('aria-label', 'Vorheriger Monat');
    var titel = el('h2');
    titel.setAttribute('aria-live', 'polite');
    var weiter = el('button', null, '›');
    weiter.type = 'button';
    weiter.setAttribute('aria-label', 'Nächster Monat');
    kopf.appendChild(zurueck);
    kopf.appendChild(titel);
    kopf.appendChild(weiter);
    var raster = el('div', 'fff-kal-raster');
    var hinweis = el('p', 'fff-kal-leer');
    var liste = el('ul');
    var kasten = el('div', 'fff-termine');
    kasten.appendChild(liste);
    ziel.appendChild(kopf);
    ziel.appendChild(raster);
    ziel.appendChild(hinweis);
    ziel.appendChild(kasten);

    function monat() {
      var erster = isoVon(stand.j, stand.m, 1);
      var tage = new Date(stand.j, stand.m + 1, 0).getDate();
      var letzter = isoVon(stand.j, stand.m, tage);
      var imMonat = alle.filter(function (t) { return t.von <= letzter && t.bis >= erster; });

      titel.textContent = MONATE[stand.m] + ' ' + stand.j;
      zurueck.disabled = stand.j === start.j && stand.m === start.m;
      zurueck.style.visibility = zurueck.disabled ? 'hidden' : '';

      // Raster
      raster.textContent = '';
      ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].forEach(function (w) {
        raster.appendChild(el('div', 'fff-kal-wt', w));
      });
      var versatz = (new Date(stand.j, stand.m, 1).getDay() + 6) % 7;
      var zellen = Math.ceil((versatz + tage) / 7) * 7;
      for (var i = 0; i < zellen; i++) {
        var d = new Date(stand.j, stand.m, 1 - versatz + i);
        var iso = isoVon(d.getFullYear(), d.getMonth(), d.getDate());
        var zelle = el('div', 'fff-kal-tag');
        if (d.getMonth() !== stand.m) zelle.classList.add('fff-kal-fremd');
        if (iso === heute) zelle.classList.add('fff-kal-heute');
        zelle.appendChild(el('span', 'fff-kal-nr', String(d.getDate())));
        if (d.getMonth() === stand.m) {
          imMonat.forEach(function (t, nr) {
            if (t.von > iso || t.bis < iso) return;
            var chip = el('button', 'fff-kal-termin', (t.zeitVon && t.von === iso ? t.zeitVon + ' ' : '') + t.titel);
            chip.type = 'button';
            chip.title = t.titel;
            chip.style.background = t.farbe;
            chip.style.color = schriftfarbe(t.farbe);
            chip.addEventListener('click', function () {
              var det = liste.querySelectorAll('details')[nr];
              if (!det) return;
              det.open = true;
              det.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
            zelle.appendChild(chip);
          });
        }
        raster.appendChild(zelle);
      }

      // Liste darunter
      liste.textContent = '';
      imMonat.forEach(function (t) { liste.appendChild(kachel(t)); });
      if (!alle.length) {
        hinweis.textContent = 'Zurzeit sind keine öffentlichen Termine eingetragen.';
        hinweis.hidden = false;
      } else if (!imMonat.length) {
        hinweis.textContent = 'In diesem Monat sind keine Termine eingetragen.';
        hinweis.hidden = false;
      } else {
        hinweis.hidden = true;
      }
    }

    zurueck.addEventListener('click', function () {
      stand.m -= 1;
      if (stand.m < 0) { stand.m = 11; stand.j -= 1; }
      monat();
    });
    weiter.addEventListener('click', function () {
      stand.m += 1;
      if (stand.m > 11) { stand.m = 0; stand.j += 1; }
      monat();
    });
    monat();
  }

  function laden(ziel) {
    var gruppe = txt(ziel.getAttribute('data-gruppe')).toLowerCase();
    ziel.textContent = '';
    ziel.appendChild(el('p', 'fff-termine-status', 'Lade Termine …'));
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ aktion: 'termine' })
    })
      .then(function (r) { return r.json(); })
      .then(function (json) {
        if (!json || !json.ok) throw new Error((json && json.error) || 'Unbekannter Fehler');
        var liste = bereinige(json.data);
        if (gruppe) liste = liste.filter(function (t) { return t.kurz === gruppe; });
        zeichne(ziel, liste);
      })
      .catch(function () {
        ziel.textContent = '';
        var p = el('p', 'fff-termine-status', 'Die Termine konnten gerade nicht geladen werden. ');
        var a = el('a', null, 'Zum Kalender im AktionsDeck');
        a.href = 'https://fridaysforfuture-landau.de/aktionsdeck-landau/#/termine';
        p.appendChild(a);
        ziel.appendChild(p);
      });
  }

  function start() {
    document.querySelectorAll('[data-aktionsdeck-termine]').forEach(laden);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
