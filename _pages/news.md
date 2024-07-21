---
title:  "News & Presse"
layout: single
permalink: /news
classes: wide

sidebar:
  title: "Presse"
  nav: "presse"
  
--- 
<h2> Klimafestival </h2>
<img src="https://github.com/fridaysforfuture-landau-pfalz/fridaysforfuture-landau-pfalz.github.io/blob/main/assets/Aktionen/2024.08.24%20Klimafestival/Klimafestival%20Logo%20Wei%C3%9Fschatten.png?raw=true" alt="Logo Klimafestival" style="float:right;" hspace=20 vspace=20 height="30%" width="30%">

Am <b> 24.08.2024 </b> findet das erste Landauer Klimafestival statt. Eine Veranstaltung für die ganze Familie - jung wie alt. Von <b> 14:00 bis 23:00 Uhr </b> erwarten euch im Goethepark viele Info-, Aktions- und Mitmach-Stände, einiges an Bühnenprogramm, Poetry Slams und Live-Acts. Das übergeordnete Thema des Klimafestivals ist natürlich Nachhaltigkeit. Dabei geht es aber in erster Linie darum, die Begeisterung für Neues zu wecken. <a href="https://fridaysforfuture-landau.de/klimafestival" target="_blank"> mehr lesen </a> <br> 


{% for post in site.posts %}
  <article>
    <h1><a style="color: black" href="{{ post.url }}" >{{ post.title }} </a></h1>
    <time datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date_to_long_string }}</time>
    {{ post.content }}
  </article>
{% endfor %} 
