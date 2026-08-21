# Technical Writing Sample — outline to write from

**Target:** Sticker Mule application. Private gist, ~900–1,300 words.
**You write it. I edit it.** They are assessing your prose, not mine.

---

## Recommended topic

**"Offline-first on a warehouse floor: what conflict resolution actually costs"**

Why this one:

- You lived it and authored the internal design doc, so every sentence is defensible under questioning.
- The constraint is *concrete and unusual* — most engineers have never built for a network that disappears mid-transaction.
- It strips clean of employer specifics: no client names, no schema, no internal service names, no numbers you can't publish.
- It shows the thing writing samples are meant to show: a real tradeoff, taken deliberately, with the cost named.

---

## Structure

**1. The constraint (short, concrete).** A warehouse operator scans an item. The network is gone — not slow, gone. The operation must still complete, because the physical goods are moving whether or not the software agrees. Open here, not with a definition of offline-first.

**2. The naive model and why it fails.** Queue writes, replay on reconnect. Say plainly where it breaks: two devices act on the same stock in the same window, both succeed locally, and replay order decides truth. Give one concrete scenario.

**3. The decision.** What you actually chose for concurrency/conflict control, and — more importantly — *what you gave up*. Every offline system trades away something: immediate consistency, or operator autonomy, or write acceptance. Name yours.

**4. The part that surprised you.** The most valuable paragraph in the piece. Something you got wrong first, or a failure mode that only appeared on real hardware in a real building.

**5. What I'd do differently.** One paragraph. Not self-flagellation — a design opinion you now hold that you didn't before.

---

## Rules while writing

- **Concrete over abstract.** "A picker and a putaway operator touch the same pallet in the same 40 seconds" beats "concurrent access scenarios".
- **Name the cost of every decision.** Writing that only lists wins reads as marketing.
- **No employer specifics.** No client names, no internal service or app names, no revenue or client-count figures, no schema. Describe the *shape* of the problem.
- **Short sentences when the idea is hard.** Length and complexity should not peak together.
- **Cut every sentence that only says the previous sentence again.** This is the single highest-yield edit.
- **Do not use an LLM to draft it.** Use one to critique it after. If the prose is not yours, the first async written exchange after hiring exposes it — and at a writing-first company that exchange happens on day one.

---

## Alternative topics (in order)

1. **Icon-based internationalisation** — replacing text localisation for a workforce that can't read the interface language. More memorable and more human than the sync piece; less systems depth. Strong if you want to stand out rather than demonstrate distributed-systems reasoning.
2. **A post-mortem on invisible capability** — the MCP debugging case: two servers that were healthy, running, and returning full tool lists on direct probe, but invisible to the agent because of one empty approval array. Thesis: most agent failures are context-delivery failures, not capability failures. Short, sharp, and it doubles as portfolio material for AI-native roles.
3. **The config-schema question** — deciding what belongs in configuration versus code, from building the Campaigns package. Good, but closer to the ground you already cover in your application answers.

---

## Practical

- **Private gist**, as their form suggests. Markdown renders there; use headings and code blocks if you include any.
- Include a one-line framing note at the top: what this is and when the work happened.
- Proofread once out loud. It catches what re-reading does not.
- Send me the draft and I will edit it — line edits, cuts, and the places where the reasoning skips a step.
