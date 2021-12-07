---
title:  "News & Presse"
layout: single
permalink: /news
classes: wide

<aside class="sidebar__right ">
<nav class="toc">
<header><h4 class="nav__title"><i class="fas fa-heart"></i> Unique Title</h4></header> <ul class="toc__menu"><li><a href="#html-elements">HTML Elements</a></li><li><a href="#body-text">Body text</a><ul><li><a href="#blockquotes">Blockquotes</a></li></ul></li><li><a href="#list-types">List Types</a><ul><li><a href="#ordered-lists">Ordered Lists</a></li><li><a href="#unordered-lists">Unordered Lists</a></li></ul></li><li><a href="#tables">Tables</a></li><li><a href="#code-snippets">Code Snippets</a></li><li><a href="#buttons">Buttons</a></li><li><a href="#notices">Notices</a></li></ul>
</nav>
</aside>

toc: true
toc_label: "News"
toc_icon: "heart"  

sidebar:
  title: "Presse"
  nav: "presse"
  
---

{% for post in site.posts %}
  <article>
    <h1><a style="color: black" href="{{ post.url }}" >{{ post.title }} </a></h1>
    <time datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date_to_long_string }}</time>
    {{ post.content }}
  </article>
{% endfor %} 
