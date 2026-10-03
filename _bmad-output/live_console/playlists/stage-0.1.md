# Playlist Brief — Stage 0.1, The Empty Room

**35 rows.** Build this playlist in Scrimba using the prompt in
[`stage-0.1-prompt.md`](stage-0.1-prompt.md), watch it off-chat, then file the receipt below before
you write a line. Course names come from `Course_Map.csv` (catalogue reviewed 20 Sep 2026) — lesson
titles inside a course may differ. Find the concept, not the title.

**Coverage is the requirement, not brevity.** Every one of the 35 concepts gets a lesson. If that
takes 20 or 30 videos, it takes 20 or 30 videos — a short playlist that leaves a Core-weight row
untaught is how a row reaches the interview unclosed.

---

## Block A — How the web actually works · rows 1, 4, 7, 8, 9, 10
**Scrimba:** *Frontend Path → Web dev basics* — the opening modules on how a browser gets a page.
**Master.dev alternate:** *Complete Intro to Web Development v3* — stronger here; it walks the
request and the render explicitly.
**Backstop:** MDN → "Populating the page: how browsers work" (the critical rendering path) and the
`<script>` reference for `async` / `defer`.

Honest note: **the critical rendering path and parser blocking are usually not in an intro course.**
If neither course covers them, take them from MDN and do not pad the playlist looking for them.

**Watch for:** where the browser stops to fetch something, and what it cannot do while it waits.

## Block B — The document · rows 12-22, 97, 98, 104
**Scrimba:** *Learn HTML and CSS* — the first section: doctype, the skeleton, tags and attributes,
nesting, block vs inline, global attributes, `data-*`.
**Master.dev alternate:** *Complete Intro to Web Development v3*, the HTML chapters.
**Backstop:** MDN → "Quirks Mode and Standards Mode", and the global attributes index for
`tabindex`, `hidden`, `lang`, `dir`.

**Watch for:** which elements are void, and what the browser does when you nest something illegally.

## Block C — The head · rows 75-85
**Scrimba:** *Learn HTML and CSS* — the metadata lessons (title, charset, viewport, description).
**Master.dev alternate:** *Complete Intro to Web Development v3*.
**Backstop:** MDN → `<link rel>` for `preload`, `preconnect`, `dns-prefetch`, `prefetch` (row 80),
and web.dev for Open Graph and canonical URLs.

Honest note: **resource hints are a performance topic and are rarely taught in an intro course.**
Row 80 is a Core-weight row — take it from MDN now, and it gets re-derived in Sprint 6 with numbers.

**Watch for:** which head tags change what the browser *does*, versus which only change what other
machines read.

## Block D — Git and the command line · rows 626, 627, 629, 641
**Scrimba:** *Command Line Basics*, then *Learn Git and GitHub*.
**Master.dev alternate:** *Everything You'll Need to Know About Git* — deeper than you need today;
take only the first third.
**Backstop:** `git help <cmd>` — genuinely the best reference for this.

**Watch for:** the three areas (working tree, index, repository) and which command moves a file
between which two. Everything else in Git is built on that one picture.

---

## Sequencing — what belongs to a later stage

This is about *when*, not about trimming. Nothing here is skipped; it is scheduled.

- CSS properties and layout — stages 0.3 and 0.4. Learning them now means learning them twice.
- JavaScript — Sprint 1. None ships before then.
- Deployment and hosting — stage 0.6.
- "Build your portfolio site" project modules — you already have the product this campaign builds.

A lesson that teaches one of this stage's concepts and touches CSS or JS on the way is fine. Keep
it. The rule is no whole off-stage modules, not no incidental contact.

## The receipt — file this before you write any code

Three lines. Not a summary, a commitment:

```
CLAIMED:   <the one thing the lessons asserted that you did not already believe>
PREDICT:   <what you expect to get wrong or break when you build index.html>
QUESTION:  <the one thing that stayed fuzzy>
```

The prediction is the point. You commit to an expectation, then the code disagrees with you — that
miss is the lesson, and it is the one you will still have in an interview.

## Traps this stage sets

Three. Named so you know they are coming, unexplained so you still have to walk into them:

1. The missing doctype.
2. Why a `<span>` refuses a width.
3. The DOM you did not write.

For each one you write the **broken version first** and run it. Reading that quirks mode changes
the box model teaches nothing; watching your own layout change when you delete one line is
permanent.

## Then build

`.gitignore` → `.gitattributes` → `index.html` → the four explainers. `.gitignore` goes in the
first commit, before anything installs anything.

Say **"stage done"** when the page validates and you are ready to be interrogated.
