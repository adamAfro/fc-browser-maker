# Wordlsummary

**Functionalities**:

- [x] selecting any node of a website to do stuff on it
    - right now it just counts words 
- [x] showing word summary
- [x] highlighting summarised text after clicking summary
- [x] open ~~google translate~~ deepl in popup
    - google's translator doesn't like being in a popup - it is a whole 1 px wide 
- [ ] send a message to translator
- [ ] adapt script for chat GPT and custom prompt like: „create flashcards”

---

I had some issues...

Why not show something in:

- browser popup - disappears after clicking on the page ❌
- browser sidepanel - is not supported by some browsers ❌
- window popup - another window?! ❌
- I've got left with using browser DOM, which seems the most straightforward 
    but also not quite clean, buuut yeah that what is left ✅


Why create menu in popup and not on the website if table is already there

- firefox doesn't let opening popups without user interaction and you cannot
    as I understand send interaction from content script to bg, so you need HTML
    in popup