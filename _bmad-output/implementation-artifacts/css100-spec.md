---
title: CSS 100 — acceptance spec
baseline_commit: d13543c
context: []
---

# Intent

A LeetCode-style set of **100** CSS questions to practise "very deeply, using every
property of it possible", for the Accenture / Mercer Mettl React OA and technical rounds.

# Hard constraints (stated by the user, verbatim intent)

C1. **React + CSS only. No reactivity.** No useState/useEffect/handlers in any question.
C2. **Boilerplate already present.** The component and the linked CSS files must already
    exist; the learner is "only asked to do something" — never to scaffold.
C3. **Nothing left to the learner's picking.** Every challenge must specify *what has to be
    used for what* — the problem, the tools expected, and the way to use them, explained
    in brief, with hints.
C4. **A diagram of the expected output** must be shown in the question, for visualisation.

# Required topic coverage (all 17 must be present and non-trivial)

A1.  Box models — ALL of it
A2.  Flexbox COMPLETE — basis, auto margins, flex shorthand, advanced + basics,
     explicitly "many challenges here"
A3.  Grid proper — ALL properties
A4.  repeat + minmax + auto-fit / auto-fill, responsive WITHOUT media queries
A5.  Container queries — a few examples
A6.  place-items
A7.  grid-template-areas
A8.  Positioning — ALL
A9.  inset
A10. Units — practise where each is useful in some or other way
A11. Media queries — basic AND advanced
A12. :focus-visible
A13. Tokens
A14. color-mix
A15. stack, cluster, between, sidebar (responsive), switcher — taught AND challenged
A16. Exceptions
A17. Anti-patterns to avoid

# Acceptance questions

Q1. Is each of A1–A17 actually covered, and is "ALL properties" honest for A1/A3/A8?
Q2. Does any question fail C1–C4?
Q3. Can any question be "solved" without the learner doing the thing it teaches
    (e.g. the linked stylesheet already supplies the answer, or the preview's own
    reset masks the failure state)?
Q4. Does the stated solution actually produce the drawn diagram?
