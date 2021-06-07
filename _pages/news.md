---
title:  "News & Presse"
layout: single
permalink: /news

sidebar:
  title: "Presse"
  nav: "presse"

toc: true
toc_label: "Unique Title"
toc_icon: "cog"  
---

{% for post in site.posts %}
  <article>
    <h1><a style="color: black" href="{{ post.url }}" >{{ post.title }} </a></h1>
    <time datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date_to_long_string }}</time>
    {{ post.content }}
  </article>
{% endfor %} 
