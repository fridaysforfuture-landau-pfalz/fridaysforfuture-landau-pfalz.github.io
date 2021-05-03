---
title:  "Kontakt"
layout: single
permalink: /kontakt
---

Sie können uns gerne über das Kontaktformular eine Email scchreiben und uns ihr Anliegen schildern. 

<style>
  .form-container { max-width: 100%; }
  .form-container input { position: relative; top: 0; left: 0; width: 100%; height: 50px; padding: 0 ; }
  .form-container textarea { position: relative; top: 0; left: 0; width: 100%; height: 200px; padding: 0; }
</style>
<form action="https://formspree.io/f/xgeronze" method="POST" class="form-container">
  <label>Betreff:</label><br />
  <input type="text" name="Betreff" />
  <label>Ihre Nachricht:</label><br />
  <textarea name="Nachricht"></textarea>
  <button type="submit">Absenden</button>
</form>

<p> </p>

<b> Unsere Sozial Media Kanäle:<b>

<!-- Read the Formbutton docs at formspree.io/formbutton/docs. See more examples at codepen.io/formspree -->
<script src="https://formspree.io/js/formbutton-v1.min.js" defer></script>
<script>
  /* paste this line in verbatim */
  window.formbutton=window.formbutton||function(){(formbutton.q=formbutton.q||[]).push(arguments)};

  /* customize formbutton below*/     
  formbutton("create", {
    action: "https://formspree.io/f/xgeronze",
    title: "How can we help?",
    fields: [
      { 
        type: "email", 
        label: "Email:", 
        name: "email",
        required: true,
        placeholder: "your@email.com"
      },
      {
        type: "textarea",
        label: "Message:",
        name: "message",
        placeholder: "What's on your mind?",
      },
      { type: "submit" }      
    ],
    styles: {
      title: {
        backgroundColor: "gray"
      },
      button: {
        backgroundColor: "gray"
      }
    }
  });
</script>
