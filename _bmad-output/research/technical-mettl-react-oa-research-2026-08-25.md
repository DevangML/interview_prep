# Technical + Domain Research: Mercer | Mettl React OA — Format, Syllabus and Weighting

**Date:** 2026-08-25
**Researcher:** Devang
**Research type:** Technical (assessment format) + Domain (what the bank actually contains)
**Purpose:** Build a rapid-fire question bank that matches the real paper, not a generic React quiz.

---

## Executive Summary

Mettl does not run one React test — it runs a **family** of them, and the vendor publishes the competency list for each. That is the single most useful fact in this research: **the syllabus is not a secret to be inferred from forum posts. It is on the product page.**

Three published blueprints are relevant to an Accenture React lateral at 2–3 YOE:

| Test | Duration | Questions | Difficulty | Experience | Verdict for you |
|---|---|---|---|---|---|
| **React Redux Developer** | **50 min** | **36 MCQs** | Moderate | **2–5 yrs** | **The most likely paper.** Band matches. |
| ReactJS (Online Test) | 60 min | **20 MCQs + 1 coding** | Intermediate | 1–3 yrs | Plausible; adds a coding simulator |
| Front-end Web Developer (Basic) | 60 min | 18 MCQs + 1 coding | Moderate | 0.5–2 yrs | Below your band; HTML/CSS heavy |

**The decisive implication:** the most likely paper is **36 MCQs in 50 minutes — 83 seconds per question — and no coding round at OA stage.** That is a *recall-speed* exam, not a build exam. Preparation that optimises for building beautiful layouts slowly is preparing for the wrong instrument.

**The second decisive implication:** Mettl's own competency list for the 2–5 year test names **Redux as a first-class competency, equal in billing to React itself.** A bank with no Redux questions is not a partial bank; it is missing roughly a third of the paper.

---

## Methodology

Vendor product pages were treated as **primary sources** — Mettl publishes the competency framework for each test in its library, and that framework is what the item bank is built from. Community reports (PrepInsta, Glassdoor, Fishbowl, practice-test aggregators) were used only to corroborate section structure and to establish that Accenture composes Mettl tests with a **cognitive section** ahead of the technical one. Where community claims conflicted with vendor pages, the vendor page won.

**Limitations, stated honestly:**
- Accenture customises. Mettl explicitly supports custom banks and bulk-uploaded items, so the exact paper may blend competencies across the three blueprints.
- Question *counts per competency* are not published — only the competency lists. The weighting below is inferred from the order and granularity of the vendor's own competency breakdown, and is labelled as inference, not fact.
- One community source (Fishbowl, 3-YOE Node profile on Mettl) returned 403 and could not be read; its snippet suggested a 30-question technical section, consistent with the community reports of "around 30 MCQs" for React roles.

---

## Finding 1 — The format is recall under a clock

**36 MCQs / 50 minutes = 83 seconds per question.** At that pace there is no time to reason from first principles about anything you have not already automated. The exam rewards *retrieval*, and specifically:

- **Output-based snippets** ("what does this log?") — the dominant Mettl style for JS competencies.
- **Definition and behaviour recall** ("which lifecycle method…", "what does a reducer must be…").
- **Discrimination questions** — two nearly identical options where one word differs.

The ReactJS variant adds **one coding question on a "Front End Simulator"**, described by the vendor as evaluating "hands-on experience and capability to code in basic JavaScript." Note *basic JavaScript* — the simulator is not a system-design exercise.

---

## Finding 2 — The published syllabus, verbatim

### React Redux Developer Test (2–5 yrs) — three competencies

**ECMAScript**
- Template and Extended Literals
- Arrow Functions
- De-Structuring Assignments
- Modules and Classes in JavaScript ES6

**Redux**
- Pure Functions
- Actions
- Reducers
- Store
- Data flow
- Integrating React with Redux JS

**React**
- State Application
- Props Application
- Lifecycle Application
- Virtual and Actual DOM Application
- Higher Order Components

### ReactJS Online Test (1–3 yrs) — adds the modern surface

**React Tools:** React Router · Redux · **Flux** · **Webpack**
**ReactJS Concepts:** **Server Components** · **Rendering: `createRoot` / `hydrateRoot`** · **Actions** · **New hooks**
**Fundamentals:** components and events · props and state · **Pure components** · **render methods** · JavaScript ES6

### Front-end Basic (0.5–2 yrs) — the HTML/CSS floor

**JavaScript:** arrays · scopes and namespaces · parsing · events and event handlers · functions · object usage and properties
**HTML:** elements · HTML5 elements · semantics · multimedia
**CSS:** text and margins · CSS3 backgrounds · borders · text application

---

## Finding 3 — Three topics are named that most prep banks omit

These are the gaps that separate a bank built from the vendor's syllabus from a bank built from blog posts:

1. **Flux.** Not Redux — *Flux*, the original unidirectional architecture. Named explicitly under React Tools. Almost no 2026 prep material covers it, because nobody uses it; Mettl still asks it because the competency list is stable.
2. **Webpack.** Bundling, loaders, entry/output, code splitting. A build-tool competency inside a React test.
3. **Higher Order Components.** Named in the 2–5 year test as a first-class React skill — the pre-hooks composition pattern, still on the list.

Add to these the **class-lifecycle** vocabulary implied by "Lifecycle Application" — a hooks-only preparation will not answer `componentDidUpdate` / `shouldComponentUpdate` / `getDerivedStateFromProps` questions.

---

## Finding 4 — React 19 is explicitly in scope

The vendor names **Server Components**, **Actions**, **`createRoot` / `hydrateRoot`**, and **"New hook"** — which in React 19 means:

- **`useActionState`** — replaces the `useState` + `onSubmit` + loading triad; returns `[state, formAction, isPending]`. Formerly `useFormState` in canary, moved from `react-dom` to `react`.
- **`useOptimistic`** — renders a temporary optimistic value while an async action is in flight.
- **`useFormStatus`** — read from `react-dom`; lets a nested submit button read the parent form's pending state without prop drilling or context.
- **`use()`** — reads a promise or context during render, and is the one hook that **may be called conditionally**.
- **Server Components / `'use server'`** — components that execute on the server.
- **`ref` as a prop** — `forwardRef` no longer required for function components.

---

## Finding 5 — Accenture wraps the technical section

Community sources consistently describe an Accenture Mettl sitting as **cognitive ability first** (aptitude + logical + verbal, roughly 30 questions in 30 minutes, with diagrammatic/abstract reasoning), **then** the technical section, and a coding round where the role calls for one. This does not change the React syllabus, but it changes the day: the React section is not the first thing you sit down to, and fatigue is part of the instrument.

---

## Recommended blueprint for the practice bank

Inferred weighting for a 36-question paper, derived from the vendor competency lists (labelled inference):

| Competency | Share | Questions in a 36-q paper |
|---|---|---|
| React Core (state · props · lifecycle · vDOM · HOC · keys · reconciliation) | 25% | 9 |
| Redux (pure functions · actions · reducers · store · data flow · react-redux) | 19% | 7 |
| ECMAScript (literals · arrow fns · destructuring · modules · classes) | 17% | 6 |
| React Hooks (rules · useState · useEffect · useMemo/useCallback · useRef · custom) | 14% | 5 |
| JS Logic (equality · coercion · closures · `this` · prototypes) | 8% | 3 |
| React 19 (Server Components · Actions · new hooks · createRoot/hydrateRoot) | 8% | 3 |
| Async & Event Loop (microtasks · promises · async/await) | 5% | 2 |
| React Tools (Router · Flux · Webpack) | 4% | 1–2 |

**Design rules that follow from the format, not from taste:**

1. **Every item must be answerable in ~80 seconds.** If it needs a scratchpad, it is not a Mettl item.
2. **Favour output-based snippets** for ECMAScript, JS Logic and Async — that is the house style.
3. **Distractors must be plausible.** A four-option item where three options are absurd tests nothing; Mettl's discrimination comes from near-miss options.
4. **Cover Flux, Webpack and class lifecycle** even though modern practice has moved on. They are on the published list.
5. **Explanations must state the rule, not the answer** — the bank's job is to install the rule so the next unseen item is answerable.

---

## Sources

- [React Redux Developer Test — Mercer | Mettl](https://mettl.com/test/react-redux-developer-test/) — 50 min · 36 MCQs · 2–5 yrs · ECMAScript, Redux, React competency lists
- [ReactJS Online Test — Mercer | Mettl](https://mettl.com/test/reactjs-assessments-test/) — 60 min · 20 MCQs + 1 coding · React 19, Router, Redux, Flux, Webpack, Server Components, createRoot/hydrateRoot
- [Front End Web Developer Test (Basic) — Mercer | Mettl](https://mettl.com/test/front-end-web-developer-basic/) — 60 min · 18 MCQs + 1 coding · JS/HTML/CSS competencies, Front End Simulator
- [Online Coding Tests — Mercer | Mettl](https://mettl.com/coding-tests/) — custom and bulk-uploaded items, difficulty selection
- [React v19 — React official blog](https://react.dev/blog/2024/12/05/react-19) — Actions, `useActionState`, `useOptimistic`, `useFormStatus`, `use()`, ref as prop
- [Accenture Online Assessment Tests — Practice Aptitude Tests](https://www.practiceaptitudetests.com/top-employer-profiles/accenture-assessments/) — cognitive section structure, diagrammatic reasoning
- [Mettl Placement Papers — PrepInsta](https://prepinsta.com/mettl/) — section structure corroboration
- [Accenture React JS Developer interview questions — Glassdoor](https://www.glassdoor.co.in/Interview/Accenture-React-Js-Developer-Interview-Questions-EI_IE4138.0,9_KO10,28.htm) — round structure corroboration

_Generated using BMAD Technical + Domain Research Workflows_
