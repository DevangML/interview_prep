# Agent Constitution

**Status:** binding · **Owner:** Devang · **Established:** 2026-08-25

These are not preferences. They are the standing rules every agent working in this
repository follows, and they outrank convenience, speed, and any agent's own taste.

A rule that cannot be checked is a wish. Each article below therefore states the
rule, how to verify it, and what to do when it collides with something else.

---

## Article I — Files stay under 200 lines

**Rule.** No source file exceeds **200 lines**. This includes data modules,
components, hooks and tests.

**Why.** File length is the cheapest available proxy for how many reasons a file
has to change. A 400-line module is almost always two modules that have not been
separated yet, and it is the point at which reading stops being free.

**How to verify.**
```bash
find src -name '*.ts' -o -name '*.tsx' | xargs wc -l | sort -rn | head
```
Anything over 200 is a violation, not a judgement call.

**When it collides.** Split by *responsibility*, never by line count. Cutting a
file at line 200 to satisfy the counter produces two files that must be read
together, which is worse than one long one. If a responsibility genuinely cannot
be split below 200 lines, say so explicitly and explain why rather than
quietly exceeding it.

**Known exception.** Third-party or generated data already in the repository
(`src/data/css100.ts`, `ladder.ts`) predates this rule. Do not rewrite them to
comply; do not add to them either.

---

## Article II — Maximum reusability

**Rule.** Before writing a function, component or hook, look for the one that
already exists. Before writing the second copy of anything, extract the first.

**Why.** Duplication is not a style problem; it is a correctness problem. Two
copies of the same rule drift, and then the application holds two different
beliefs about the same thing.

**How to verify.** Grep for the concept before implementing it. If the same
literal, regex, threshold or shape appears in two files, it belongs in one.

**Precedent in this repo.** `difficultyOf` lived in both the brief and the facet
chip and was already drifting; it now lives in `lib/difficulty.ts`. `useLibrary`
serves every list surface. Follow those examples rather than adding a third
list implementation.

---

## Article III — Reliability and consistency

**Rule.** A feature is finished when it has been **observed working**, not when
it compiles. State plainly what was verified and what was not.

**Why.** This repository has already shipped a grader whose "solution" was the
unsolved file, a linter that called `box-sizing` a typo, and a tooltip button
that silently did nothing. Every one of them typechecked and built.

**How to verify.**
- `npx tsc --noEmit` and the build must be clean — necessary, never sufficient.
- Exercise the change in the running app and report what was seen.
- If it cannot be observed (auth wall, missing model, external service), **say
  so** and name what remains unproven. Never describe unverified work as done.

**Consistency.** Same problem, same shape. Lists use `useLibrary`. Verdicts use
the grader. Persistence goes through one module, not ad-hoc `localStorage`
calls scattered through components.

---

## Article IV — Do not reinvent the wheel

**Rule.** If a maintained package solves the problem, install it. Hand-rolled
implementations of solved problems are a permanent tax.

**Why.** Every hand-maintained list of an open-ended set drifts out of date. The
CSS linter kept its own 68-property allowlist and therefore called `box-sizing`
unknown; the fix was to ask the browser, which is never out of date. Emmet was
hand-implemented before the official CodeMirror 6 plugin replaced it.

**How to verify.** Before writing a parser, matcher, date utility, virtualiser,
schema validator or editor extension: search npm and the platform first. Prefer,
in order — **the platform** (`CSS.supports`, `structuredClone`, `Intl`,
`AbortController`) → **an official package** → **a maintained community
package** → **your own code**.

**When it collides.** A dependency you would need to fight is worse than fifty
lines you control. Reject a package when it is unmaintained, an order of
magnitude larger than the need, or requires more configuration than
implementation — and say which reason applies.

---

## Article V — SOLID, applied to front-end work

**Rule.** The five principles, translated to components, hooks and modules.

- **Single responsibility.** A component either fetches, or arranges layout, or
  renders a leaf — not all three. A hook does one job. If the name needs "and",
  it is two things.
- **Open/closed.** Extend through props, `children`, slots and composition —
  not by adding a fourteenth boolean flag to an existing component.
- **Liskov substitution.** A component that accepts a shape must work for every
  value of that shape. If it silently requires one particular variant, the type
  is lying.
- **Interface segregation.** Do not force a caller to supply props it does not
  need. Many small, focused props beat one large configuration object.
- **Dependency inversion.** Depend on abstractions. Pass data and callbacks in;
  do not reach up into a global store from a leaf. `useLibrary` takes a config
  object rather than importing the drill set directly — that is the pattern.

**How to verify.** Read the component's props list aloud. If it describes more
than one job, it is more than one component.

---

## Article VI — Additive by default

**Rule.** Do not delete content, data or capability to make a change simpler.
Repairs add; they do not remove. When a capability must be replaced, keep the
old data readable and say what changed.

**Why.** A consolidation in this repository silently orphaned four data modules
and turned 178 solutions into copies of the problem. Nothing was deleted from
disk, and it was still a loss.

**How to verify.** After a structural change, count. If the number of units,
questions or drills went **down**, that is a regression until proven otherwise.

---

## Article VII — Report honestly

**Rule.** Say what was done, what was verified, what was skipped, and what is
still wrong. Never round a partial result up to a complete one.

If a rule here was broken deliberately, name the article and the reason in the
same message. An acknowledged exception is a decision; an unacknowledged one is
a defect.

---

_Referenced from `.agents/AGENTS.md`. Amendments belong in this file, dated._
