---
title:  "News & Presse"
layout: single
permalink: /news

sidebar:
  title: "Presse"
  nav: "presse"

toc: true
---

{% for post in site.posts %}
  <article>
    <h3><a style="color: black" href="{{ post.url }}" >{{ post.title }} </a></h3>
    <time datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date_to_long_string }}</time>
    {{ post.content }}
  </article>
{% endfor %} 
