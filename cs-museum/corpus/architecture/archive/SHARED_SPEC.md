# Cross-Language Concept Atlas — SHARED RESEARCH SPEC (read this first)

## The mission
We are building a **problem-origin atlas** of programming-language concepts. The goal is that a learner
who internalises the atlas can pick up ANY new language quickly, because they already know:
- the ~17 PROBLEMS every language must answer,
- the finite menu of SOLUTIONS the industry has invented for each,
- which language picked which option, and **what it paid for it**.

**The deliverable is NOT a feature list.** A row that only says "Rust has ownership" is worthless.
A row that says "*Problem:* who frees this memory, and how do we know it isn't used after?
*Prior art failed because:* manual free → use-after-free/double-free; GC → pauses + no determinism.
*Rust's answer:* affine types + a borrow checker, moving the question to compile time.
*Price paid:* steep learning curve, fights with the checker, `unsafe` escape hatch, no cyclic
structures without `Rc<RefCell<>>`" — that row is the product.

## Non-negotiable output schema
For EVERY concept produce a block exactly like this:

### <Concept name>
- **Problem (the pain that existed first):** <what was actually going wrong, concretely>
- **Origin:** <language + year + person, where known. Cite. Mark [CONTESTED] if folklore.>
- **Mechanism:** <how the solution actually works, 1-3 sentences, technically precise>
- **Solution family:** <which of the competing approaches to this problem it belongs to>
- **Languages:** <full list from the canonical column set; use the notation below>
- **Price paid:** <the cost — runtime, cognitive, compile-time, expressiveness, safety>
- **Mental model / transfer rule:** <the one sentence a learner carries to the next language>
- **Confidence:** HIGH | MEDIUM | LOW  + why
- **Source:** <URL(s)>

### Language notation (use exactly)
- `✅` first-class, idiomatic, in the language proper
- `🟡` present but partial / awkward / library-only / opt-in
- `🔶` emulatable by convention or boilerplate only
- `❌` absent by deliberate design (SAY WHY — the omission is often the most instructive part)
- `⛔` absent, historical/irrelevant for that language

### Canonical column set (use these names, in this order)
C, C++, Rust, Zig, Java, C#, Kotlin, Swift, Go, Python, JavaScript, TypeScript, Dart, Ruby, PHP,
Haskell, OCaml, Erlang/Elixir, Lisp/Clojure, Smalltalk, Prolog, APL/J, Forth, SQL, Ada, Scala
(Mention Fortran, COBOL, Pascal, Assembly, Lua, Perl, R, Julia, Elm, F#, Scratch, Solidity, Nim,
Mojo, Carbon in prose when they are the *origin* or the *best example* of something.)

## Rules of evidence
1. **Web-verify origin claims.** Language design folklore is rampant. Prefer, in order:
   ACM SIGPLAN HOPL papers (I 1978, II 1993, III 2007, IV — all HOPL-IV open access), original
   papers, language design docs / RFCs / JEPs / PEPs / TC39 proposals / Swift Evolution /
   Rust RFCs, designer retrospectives and talks, then Wikipedia, then blogs.
2. **When sources conflict, say so** and give both. Do not silently pick one.
3. **Mark confidence honestly.** LOW is an acceptable, useful answer. Fabrication is not.
4. **Dates and attributions must be checked**, not recalled. If you cannot verify, write
   `[UNVERIFIED]` rather than guessing.
5. Beware SEO slop dated 2026 — much of it is LLM-written. Prefer primary sources.

## What makes a GREAT entry (the thing we are actually paid for)
- **Cluster the solutions.** Show that Option/Maybe, nullable types, null-safety operators and
  "just don't have null" are FOUR answers to ONE problem (Hoare's null, "billion-dollar mistake").
- **Name the trade explicitly.** Every concept bought something and sold something.
- **Explain deliberate omissions.** Go has no generics for 12 years / no exceptions / no inheritance —
  those choices teach more than a feature list.
- **Find the convergent-evolution pairs** — where two languages solved the same pain differently
  (Go `if err != nil` vs Rust `?`; goroutines vs async/await; templates vs generics vs monomorphisation).
- **Find the cross-cluster forcing functions** — where one choice forces another
  (no GC → RAII → move semantics → borrow checker; single-threaded event loop → async/await → coloured functions).

## Output location
Write your findings to the file path given in your task prompt. Markdown. No preamble, no
"here is the report" — start straight at the `## Cluster: <name>` heading. Be exhaustive:
long is fine, thin is not. Target 25-45 concepts per cluster where the material supports it.
At the END of your file add:
- `## Cross-cluster forcing functions` — choices in your cluster that constrain other clusters
- `## Open questions / contested history` — what you could not settle
