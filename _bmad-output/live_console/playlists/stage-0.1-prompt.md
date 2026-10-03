# Scrimba Playlist Prompt — Stage 0.1, The Empty Room

Paste into Scrimba's AI assistant. Coverage is the requirement: every one of the 35 concepts must
map to at least one lesson. Length is not a constraint — 20, 30 lessons is fine.

For later stages, only two sections change: **WHAT I AM BUILDING** and the numbered concept blocks.

---

```text
You are Scrimba's assistant. Search the Scrimba catalogue and build me a playlist.

PLAYLIST NAME
Live Console — Stage 0.1: The Empty Room

WHAT I AM BUILDING
A hand-written static HTML page: the document shell and full <head> for a log-console
product, committed to a fresh git repository. No CSS layout, no JavaScript, no
framework and no build tool at this stage — those come in later stages.

WHAT I NEED FROM YOU
Find the Scrimba lessons that teach each of the 35 concepts below, and add them to the
playlist in a sensible watching order.

THE REQUIREMENT — read this before you start pruning
Coverage is the whole point. Every numbered concept must be taught by at least one
lesson in the playlist. Do not shorten the playlist for my convenience, do not skip a
concept because it looks basic, and do not assume I already know something. If it takes
30 lessons to cover all 35 concepts, add 30 lessons. A playlist that is pleasant and
incomplete is useless to me; a long one that covers everything is exactly what I want.

BLOCK A — How the web works
  1. Client / server model
  2. HTTP request/response cycle: headers, body, method, status line
  3. Critical rendering path: HTML→DOM, CSS→CSSOM, render tree, layout, paint, composite
  4. Parser blocking: <script> vs async vs defer, and where script tags belong
  5. Web standards bodies: W3C, WHATWG, TC39
  6. Progressive enhancement vs graceful degradation

BLOCK B — The document
  7.  <!DOCTYPE html> and quirks mode
  8.  Document skeleton: html / head / body
  9.  Tags, elements, attributes, void elements
  10. Nesting rules and valid document structure
  11. HTML comments
  12. Block vs inline vs inline-block elements
  13. Global attributes: id, class, title, hidden, tabindex
  14. data-* attributes and the dataset property
  15. The lang attribute
  16. Character entities and escaping (&amp; &lt; &nbsp;)
  17. HTML validation
  18. The dir attribute and directional text
  19. MIME / content types
  20. Browser error recovery: how invalid nesting and duplicate IDs produce a DOM you
      did not write

BLOCK C — The head
  21. <title>
  22. <meta charset="utf-8">
  23. <meta name="viewport">
  24. <meta name="description">
  25. Open Graph and Twitter card tags
  26. <link rel>: stylesheet, preload, preconnect, dns-prefetch, prefetch
  27. Favicons and touch icons
  28. Web app manifest
  29. Canonical URLs
  30. robots meta and sitemap.xml
  31. Structured data / JSON-LD

BLOCK D — Git and the command line
  32. init, clone, add, commit, status, log, diff
  33. The three areas: working tree, staging area, repository
  34. Branching: branch, switch / checkout
  35. .gitignore and .gitattributes

RULES
1. Every concept gets a lesson. Before you answer, check all 35 off. Anything you cannot
   find, list explicitly under NOT IN THE CATALOGUE — say so plainly rather than leaving
   it silently unmapped, and point me at the closest Scrimba lesson anyway so I have a
   starting point.
2. Use real lesson titles from the catalogue. Never invent one.
3. If one lesson covers several concepts, say which numbers it covers, so I can see the
   coverage add up.
4. If a concept is taught in more than one course, pick the version that teaches it most
   directly and completely, and mention the alternative.
5. Prefer courses that teach the concept properly over a lesson that only mentions it in
   passing. Depth beats brevity here.
6. Do not add whole CSS-layout, JavaScript, framework or deployment modules — those are
   later stages. A lesson that teaches one of my 35 concepts and happens to touch CSS or
   JS along the way is fine and should be included.
7. Order the playlist so it can be watched top to bottom: how the web works, then the
   document, then the head, then git.

OUTPUT
First: the ordered playlist as a table — # | Course | Lesson title | Minutes | Concepts
it covers (by number).
Then: a coverage checklist, concepts 1 to 35, each marked COVERED (with the lesson
number) or NOT IN THE CATALOGUE.
Then: total runtime, and one line on which concept has the thinnest coverage so I know
where to expect a gap.

If you can create the playlist in my account directly, do it and give me the link. If
not, give me the list in the order to add them.
```
