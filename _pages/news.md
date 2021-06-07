---
title:  "News & Presse"
layout: single
permalink: /news

sidebar:
  title: "Presse"
  nav: "presse"

toc: true
toc_label: "Unique Title"
toc_icon: "heart"  # corresponding Font Awesome icon name (without fa prefix)
---

{% for post in site.posts %}
  <article>
    <h3><a style="color: black" href="{{ post.url }}" >{{ post.title }} </a></h3>
    <time datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date_to_long_string }}</time>
    {{ post.content }}
  </article>
{% endfor %} 
