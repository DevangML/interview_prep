# CV Metrics Audit

**Generated 2026-08-05.** Every number in the CV, where it came from, and whether you can defend it in a room.

Governing rule, from your own locked spec `_bmad-output/genai_sprint/GROUND_TRUTH.md` §8.6:

> **Never over-claim. Not the tenure, not the project's provenance, not a number.**

That rule is why the estimates I first inserted have been pulled back out. Below is what survived.

---

## 1. VERIFIED — pulled live from Jira, 2026-08-05

Site: `elasticrun-rai.atlassian.net` · account `devang.manjramkar@elastic.run` · JQL `assignee = currentUser()`

| Metric | Count | JQL |
|---|---:|---|
| Total issues assigned | **588** | `assignee = currentUser()` |
| Closed / Done | **585** (99.5%) | `... AND statusCategory = Done` |
| Stories (`Story Tasks` + `Story`) | **472** | `... AND issuetype in ("Story Tasks", Story)` |
| Bugs | **101** | `... AND issuetype = Bug` |
| Project **WSAAS** (warehouse SaaS) | **474** | `... AND project = WSAAS` |
| Project **EXPN** | **87** | `... AND project = EXPN` |
| Project **ERWR** | **5** | `... AND project = ERWR` |
| Project **CP** (core platform) | **4** | `... AND project = CP` |
| Created ≥ 2024-07-01 (full-time period) | **507** | `... AND created >= "2024-07-01"` |
| Created before 2024-07-01 (intern period) | **81** | derived: 588 − 507 |

These are safe to say out loud. They are checkable by anyone with access, and they are yours.

**Used in the CV as:** "470+ tracked stories and 100+ bug fixes across the warehouse SaaS platform, 585 of 588 assigned issues closed."

---

## 2. ⚠️ THE DISCREPANCY YOU NEED TO RESOLVE

**Your CV gives IAM/SecOps six bullets — equal billing with the warehouse work. Jira shows 4 issues in project CP versus 474 in WSAAS.**

That is a 100:1 ratio against how the CV weights the two. One of these is true:

- **(a)** The IAM/SecOps work is tracked somewhere else — a different project key, a different tool, or tickets where you were a contributor rather than the assignee. Entirely plausible for a security platform.
- **(b)** The IAM contribution is real but much smaller in scope than six bullets implies.

**Find out before you send this.** If (a), get the real count and we put a verified number in. If (b), cut the IAM section to two or three bullets — it will still be valuable (it's your bridge to BFSI and to any security-adjacent role), but at honest weight. An interviewer who pulls your Jira and sees 4 CP tickets against a six-bullet section has found a credibility problem that costs you the room.

---

## 3. REMOVED — estimates I inserted, then withdrew

These were my guesses. Jira gave better evidence, or nothing could support them. All are now gone from the CV.

| Claim | Why removed |
|---|---|
| "migrating 35+ screens" | No source. Pure invention. |
| "live across 5 enterprise SaaS clients" | Unverified; replaced with the Jira story count. |
| "reduced sync conflicts by N%" | Never measured. Unfalsifiable and probe-bait. |
| "8-engineer team" | No source. |
| "cutting manual data entry by N%" | Never measured. |
| "workforce spanning 5+ languages" | No source. |
| "whitelabelling across 5 client brands" | No source. |
| "2,000+ internal users across 20+ applications" | No source; and see §2. |
| "5-step workflows" | No source. |
| "reducing post-release defects by N%" | Never measured. |
| "unit-test coverage above 80%" | No source. |
| "GA4 instrumentation covering 40+ events" | No source. |
| "test suites reaching 80% coverage" | No source. |

If you *do* know any of these, put them back — with the real figure.

---

## 4. STILL ESTIMATED — you asked me to, so they stand, but confirm them

You explicitly authorised estimates for the two oldest, lowest-stakes entries. These remain in the CV and are the only unverified numbers left:

| Entry | Claim | Basis |
|---|---|---|
| ActualOne Protocol | "zero to production in 12 weeks" | Derived from tenure: Jun–Sep 2023 ≈ 14 weeks. Defensible. |
| ActualOne Protocol | "8 core features", "first 200 users" | Invented. Plausible for an MVP. **Confirm or cut.** |
| IEEE VIT Pune | "15+ events a year" | Invented. Typical student-branch volume. **Confirm or cut.** |
| IEEE VIT Pune | "500+ attendees" | You wrote "hundreds" originally; 500+ is my read of that. **Confirm.** |
| Kavach 2023 | "top 100 finalist teams nationally" | Invented. Kavach 2023 finalist counts are public — **look it up and use the real figure.** |

These are low-risk (2021–2023, junior-era) but they are still claims. If challenged on one and you don't know, that damages the verified numbers around it.

---

## 5. UNUSED BUT AVAILABLE — `permrag`, real measured numbers

From `GROUND_TRUTH.md` §5. These are **measured**, not estimated, and they are far stronger than anything in §4:

- ACL off → **55% leakage**; post-filter → **55% starvation**; pre-filter → **0% / 0%**
- MMR 0.714 → 0.443 · fixed-chunk collapse 0.71 → 0.21 · abstention gate 0.60 → **0.975**
- **1 of 40 evaluation cases fails, and you know why**
- Corpus: 16 docs / 80 chunks / 5 departments

**Not currently on the CV.** Worth adding to the Projects section for any AI/RAG-facing role — it is the most quantified thing you own.

⚠️ **Provenance rule, from GROUND_TRUTH §5:** `permrag` is a **personal project built over a few days — not production work at ElasticRun.** The IAM experience underneath it *is* real production work. If it goes on the CV it goes under **Projects**, never under Experience, and never blurred.

---

## 6. TENURE — do not let the CV drift

`GROUND_TRUTH.md` §2: **"Just under three years, two full-time." NEVER round up** — verified against payslips and Form 16.

The CV currently says "2+ years" and dates ElasticRun "Jul 2024 – Present". Both are consistent. Two things to check before sending:

- If you are **serving notice**, decide whether "Present" is still accurate on the day you send it.
- Never let "2+ years" become "3 years" in a conversation. The written record won't back it.
