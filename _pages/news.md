---
title:  "News & Presse"
layout: single
permalink: /news
classes: wide

sidebar:
  title: "Presse"
  nav: "presse"
  
---

<div class="fff-jahresfilter">
  <label for="jahresfilter">Jahr:</label>
  <select id="jahresfilter">
    <option value="">Alle Jahre</option>
    {%- assign letztes = "" -%}
    {%- for post in site.posts -%}
      {%- assign j = post.date | date: "%Y" -%}
      {%- if j != letztes %}
    <option value="{{ j }}">{{ j }}</option>
        {%- assign letztes = j -%}
      {%- endif -%}
    {%- endfor %}
  </select>
</div>

{% for post in site.posts %}
  <article class="fff-news" data-jahr="{{ post.date | date: "%Y" }}">
    <h1><a style="color: black" href="{{ post.url }}" >{{ post.title }} </a></h1>
    <time datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date_to_long_string }}</time>
    {{ post.content }}
  </article>
{% endfor %}

<script>
  (function () {
    var wahl = document.getElementById('jahresfilter');
    if (!wahl) return;
    function filtern() {
      var jahr = wahl.value;
      document.querySelectorAll('.fff-news').forEach(function (a) {
        a.hidden = !!jahr && a.getAttribute('data-jahr') !== jahr;
      });
      try {
        var url = new URL(window.location.href);
        if (jahr) url.searchParams.set('jahr', jahr); else url.searchParams.delete('jahr');
        history.replaceState(null, '', url);
      } catch (e) { /* egal */ }
    }
    var start = new URLSearchParams(window.location.search).get('jahr');
    if (start && wahl.querySelector('option[value="' + start + '"]')) wahl.value = start;
    wahl.addEventListener('change', filtern);
    filtern();
  })();
</script>
