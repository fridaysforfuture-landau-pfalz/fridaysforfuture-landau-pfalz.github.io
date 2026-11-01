# Website Klimastreik Landau

## Ressourcen

* Jekyll Dokumentation https://jekyllrb.com/docs/
* Minimal-Mistakes Theme Dokumentation https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/
* Markdown Kurzreferenz https://www.markdownguide.org/cheat-sheet
## Häufige Änderungen

### Plenumstermin ändern
In `_data/plenum.yml` Wochentag, Uhrzeit, Ort und Adresse anpassen. Der Termin erscheint dann automatisch auf der Startseite und auf „Mitmachen“.

### Aktion in die Seitenleiste „Bisherige Aktionen“ (Warum streiken wir?)
Im Kopf des News-Beitrags (zwischen den beiden `---`) ergänzen:

```yaml
aktion: true
aktion_titel: "Klimastreik 11.04."   # freiwillig, kürzerer Name für die Seitenleiste
```

Der Beitrag erscheint dann automatisch unter seinem Jahr. Aktionen ohne eigenen Beitrag stehen in `_data/aktionen.yml`.

### Knöpfe
Ein Knopf im Vereinsgrün mit runden Ecken:

```html
<a class="fff-btn" href="/mitmachen">Mitmachen</a>
```

Mehrere Knöpfe (am PC zwei pro Reihe, am Handy untereinander):

```html
<div class="fff-buttons">
  <a class="fff-btn" href="/news">News</a>
  <a class="fff-btn" href="/kontakt">Kontakt</a>
</div>
```

Ein Knopf über die ganze Breite: `class="fff-btn fff-btn--breit"`.

### Farben und eigene Gestaltung
Alles steht in `assets/css/main.scss`. Das Dunkelgrün (`$fff-gruen: #1b7340`) steht ganz oben, Links und Knöpfe nutzen es.

### Kalender
Die Seite „Kalender“ (`_pages/termine.md`) zeigt die öffentlichen Termine aus dem AktionsDeck Landau. Das Skript dafür ist `assets/js/aktionsdeck-termine.js`.
Mit `data-gruppe="kurzname"` am `<div data-aktionsdeck-termine>` lassen sich nur die Termine einer Gruppe zeigen.
