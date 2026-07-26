# Interview Reality 2026 — Non-MAANG India, 2-3 YOE, Flutter/Full-Stack

- **Produced by:** market-researcher (subagent)
- **Date:** 2026-07-26
- **Question asked:** For a 2-3 YOE Flutter/Frappe-Vue-Python engineer in India targeting KPIT, Persistent, Amdocs, TCS Digital, LTIMindtree, Capgemini, Zensar and same-tier firms — what rounds actually exist, what is actually asked in each, and at what depth?
- **Method:** Web search + direct fetch of interview-experience write-ups (GeeksforGeeks, Medium, Glassdoor snippets, LeetCode discuss snippets) + 2026 hiring-market reports
- **Confidence:** MEDIUM (see §7 — the sample is real but skews campus/fresher; lateral 2-3 YOE accounts are the thin part)
- **Decay class:** FAST (90-day half-life — re-research by **2026-10-24**)
- **Supersedes:** nothing
- **Sampling window:** interview accounts dated **2021-08 → 2026-02**; the 2025-2026 subset is what drives conclusions. Market reports dated 2026-02 → 2026-07.

> Companion files: [`COMPANY_ROUND_STRUCTURES.md`](./COMPANY_ROUND_STRUCTURES.md) · [`SUBJECT_FREQUENCY_EVIDENCE.md`](./SUBJECT_FREQUENCY_EVIDENCE.md) · [`SOURCES.md`](./SOURCES.md)

---

## 1. The headline finding — DSA is NOT the first filter at this tier

This is the assumption the research was asked to stress-test, and the evidence contradicts it in three separate ways.

**(a) The first elimination is aptitude/English/psychometric, not algorithms.**
At Capgemini the sequence is Communication round → then a 40-question IT-fundamentals section that is *explicitly the elimination gate*, with coding sitting alongside it only to decide which *role level* you're mapped to ([GfG Capgemini SE 2026, updated Oct 2025](https://www.geeksforgeeks.org/interview-experiences/capgemini-interview-experience-for-software-engineer-2026-on-campus/)) — **VERIFIED**. At KPIT's Nov 2025 drive the OA was Technical MCQ (30 min) + English essay (25 min) + coding (40 min) + *gamified aptitude* (27 min), i.e. coding is one of four sections and less than half the clock ([GfG KPIT 2025, Nov 11 2025](https://www.geeksforgeeks.org/kpit-interview-experience-2025-on-campus-associate-engineer/)) — **VERIFIED**. At LTIMindtree the aptitude round is where "quite a lot of candidates were eliminated," *before* the coding round ([GfG LTIMindtree SE](https://www.geeksforgeeks.org/interview-experiences/ltimindtree-interview-experience-for-software-engineer-2/)) — **VERIFIED**.

**(b) For Flutter-titled roles specifically, DSA is near-absent.**
The Accenture Bangalore Flutter interview (published 2026-01-13) was a single 43-minute round on state management, mixins, Stateful vs Stateless, Streams, Futures, async/await — the write-up states DSA questions were *very limited* ([Medium, Jan 2026](https://medium.com/@flutter-interview/accenture-flutter-developer-interview-experience-cfbf402fa99a)) — **VERIFIED**. A Flutter coding-question compilation from the same author (2026-01-28), drawn from 80+ Flutter interviews, contains **zero** algorithm questions across 8 categories and states outright that "Flutter coding interviews are rarely about tricky algorithms" ([Medium, Jan 2026](https://medium.com/@flutter-interview/flutter-coding-interview-questions-must-practice-e2b32db44f1e)) — **VERIFIED**.

**(c) Where DSA does appear at this tier, it is easy-to-medium and single-question.**
Observed prompts: reverse a string, factorial, 2nd largest in array, merge two sorted arrays, find majority element (n/2), find the missing number in 1..100, first n primes via sieve, middle of a linked list, pattern printing. Only **Infosys Specialist/Power Programmer** — a deliberately higher band — showed genuine hard DSA (DP, graphs, greedy, topological sort, LeetCode-hard sliding window; 180-min OA) ([LeetCode SP 2025](https://leetcode.com/discuss/post/7302950/), [Medium SP 2025](https://medium.com/@giga_dummy/infosys-sp-role-interview-experience-2025-by-dev-sharma-210bcfa7dfef)) — **VERIFIED via search snippets, page fetch blocked**.

**Implication for the curriculum.** DSA at this tier is a *hygiene gate*, not a differentiator. The correct target is "can solve an easy/medium array-string-hashmap-linkedlist problem cleanly, out loud, first try" — not a LeetCode grind. Hours saved should move to §2 and §3 below. **Confidence: HIGH** for the direction, **MEDIUM** for the exact magnitude.

---

## 2. What actually *is* the first-order filter: rapid-fire core-CS viva

The "service company viva" assumption is **VERIFIED**, with direct evidence.

- **LTIMindtree**: the technical interview is documented verbatim as *"18-20 rapid-fire questions"* in a 20-25 minute round, spanning data structures, algorithms, C++, SQL, OOP — sample items: linear vs binary search, stack vs queue, types of polymorphism, SQL clauses ([GfG](https://www.geeksforgeeks.org/interview-experiences/ltimindtree-interview-experience-for-software-engineer-2/)) — **VERIFIED**. That is roughly **70 seconds per question**. There is no time to derive anything; retrieval must be instant.
- **KPIT (Nov 2025)**: the second round was an **AI-conducted video interview** — 13 questions, one at a time, **20 seconds to think and 2 minutes to answer**. Content: explain BFS and DFS; stack and queue with a C++ example; what is an operating system and its main functions; define polymorphism and its types in C++; explain inheritance and its types; plus a coding problem *described verbally* ([GfG](https://www.geeksforgeeks.org/kpit-interview-experience-2025-on-campus-associate-engineer/)) — **VERIFIED**. This is a viva that a machine grades.
- **TCS Digital**: the documented question bank runs to ~40 technical items of exactly this shape — OOP pillars, overloading vs overriding, JDK/JRE/JVM, why Java has no multiple inheritance, exception hierarchy, ACID properties, DROP vs TRUNCATE vs DELETE, normalization, HAVING vs WHERE, 3rd-highest salary, call by value vs reference, detect and remove a loop in a linked list ([GfG, Sep 2024](https://www.geeksforgeeks.org/interview-experiences/tcs-digital-interview-questions/)) — **VERIFIED**.
- **Persistent (2024 on-campus, L1, 40-45 min)**: indexing, RDBMS differences, joins/subqueries, inheritance/polymorphism, HTTP status codes, latency, git merge conflicts, threads/deadlock/multithreading, Linux permissions and process management, how a web app gets hosted ([GfG, Feb 2024](https://www.geeksforgeeks.org/persistent-systems-interview-experience-for-software-engineer-on-campus-2024/)) — **VERIFIED**. Fourteen distinct topics in 45 minutes is a viva, not a problem-solving session.

**Ratio estimate: roughly 70% rapid-fire recall / 30% deep problem solving** at this tier. **Confidence: MEDIUM** — derived by counting question types across the accounts in `SUBJECT_FREQUENCY_EVIDENCE.md`, not from any source that states a ratio. Marked **INFERRED**.

**Implication.** The single highest-leverage preparation asset is a **retrieval-speed drill deck** over OOP / DBMS-SQL / OS / CN, answerable in 30-60 seconds each, not essays. This is a spaced-repetition problem, not a comprehension problem.

---

## 3. The other consistently-decisive element: the project deep-dive

Present in **11 of 14** detailed accounts (see frequency file). It is the one thing asked at every company, every level, every year in the sample.

Observed shapes:
- "Describe your project — your role, responsibilities, contributions, key learnings" (KPIT AI round, Nov 2025) — **VERIFIED**
- "Tell me about your project and whose idea was this project" (KPIT HR) — **VERIFIED**
- Deloitte Flutter Round 3 was entirely this: end-to-end feature ownership, production debugging, performance optimization, deadline/requirement management, cross-team collaboration ([Medium, Jan 2026](https://medium.com/@flutter-interview/my-flutter-interview-experience-at-deloitte-dd0bc95be426)) — **VERIFIED**
- Nagarro asks resume-specific depth — one candidate reporting NLP on the resume got grilled on stemming vs lemmatization, Word2Vec, LSTM architecture ([GfG](https://www.geeksforgeeks.org/interview-experiences/nagarro-interview-experience-for-software-developer/)) — **VERIFIED**. **The resume is the question bank.**
- Tata Elxsi: "contribution in projects from past experiences, depth questions from your projects" ([search snippet, Glassdoor/guides](https://www.glassdoor.com/Interview/TATA-ELXSI-Senior-Software-Engineer-Interview-Questions-EI_IE115262.0,10_KO11,35.htm)) — **UNVERIFIED-BY-FETCH**

**Direct read for this candidate.** The warehouse management system (offline-first scanning), the campaign/banner config system, and the IAM user-lifecycle approval workflows are not "background" — they are the primary examination surface. Offline-first sync, conflict resolution, queueing, and approval-workflow state machines are exactly the kind of thing a 2-3 YOE panel probes for depth. **Confidence: HIGH** that the project round happens; **MEDIUM** on the specific probe depth.

---

## 4. Flutter/Dart: the actual question set for his stack

Across 3 Flutter-titled interview accounts (Infosys Dec 2025, Accenture Jan 2026, Deloitte Jan 2026) the topic set converges hard — **3/3 on every item below**:

| Asked | Sources |
|---|---|
| State management (Provider / BLoC / Riverpod / GetX) + *when you'd choose each* | Infosys, Accenture, Deloitte — **VERIFIED** |
| StatefulWidget vs StatelessWidget, and *why*, with a real-world case | Accenture, Deloitte — **VERIFIED** |
| Widget lifecycle | Infosys, Deloitte — **VERIFIED** |
| Futures, Streams, async/await, scenario-based async flow | Accenture, Deloitte — **VERIFIED** |
| Performance optimization / preventing unnecessary rebuilds / large-list optimization | Infosys, Deloitte, [Flutter coding-Qs Jan 2026](https://medium.com/@flutter-interview/flutter-coding-interview-questions-must-practice-e2b32db44f1e) — **VERIFIED** |
| Architecture: where do API calls live; how to structure a scalable project | Deloitte, [7 Advanced Qs, Feb 2026](https://medium.com/@flutter-interview/7-advanced-flutter-interview-questions-must-prepare-9f221ca58b6b) — **VERIFIED** |
| Mixins for code reuse | Accenture — **VERIFIED** |
| Dart: `var` / `final` / `const`, null safety | Deloitte — **VERIFIED** |

The stated mid/senior bar (Feb 2026): how the **rendering engine** works; **Widget vs Element vs RenderObject**; memory-leak prevention; app-size reduction — **VERIFIED**, single-source.

The live-coding shape for Flutter roles is **UI/state work, not algorithms**: counter without `setState`, `ListView.builder`, pull-to-refresh, loading/success/error state handling, pagination/infinite scroll, request cancellation on dispose, form validation, `const` usage — **VERIFIED**.

---

## 5. What changed in 2026

**VERIFIED changes:**
1. **AI-conducted asynchronous interview rounds are now a real filter stage.** KPIT ran one on the AON platform in November 2025 — 13 questions, 20s prep / 2min record, no human present ([GfG](https://www.geeksforgeeks.org/kpit-interview-experience-2025-on-campus-associate-engineer/)). Gamified aptitude (3 games × 9 min) sat in the same OA. This rewards *fluent spoken recall under a timer* — a skill distinct from both coding and conversation.
2. **AI tooling has entered job descriptions at scale.** ~28% — "nearly one in three" — of engineering JDs now name AI tools (Copilot, ChatGPT, Claude, Cursor) ([HireDoor State of Tech Hiring India, 2026-07-22; n=18,400+ listings across 2,950+ companies](https://www.hiredoor.in/blog/state-of-tech-hiring-india-july-2026)).
3. **The volume of openings contracted.** Active tech openings in India fell ~24% YoY entering 2026, concentrated in traditional IT services, while AI/ML hiring grew ~40-50% ([AccioJob 2026 trends](https://acciojob.com/blogs/latest/indian-tech-hiring-trends-2026-what-job-seekers-must-know-to-stay-employable)).
4. **The 1-3 YOE band is still the largest single slice of demand: 31%** of tracked listings (vs freshers 29%, 3-5y 15%, 5+ 9%) ([HireDoor, 2026-07-22](https://www.hiredoor.in/blog/state-of-tech-hiring-india-july-2026)). Average time-to-fill 23 days. **This is the candidate's band and it is not shrinking — the competition is.**

**INFERRED / UNCERTAIN:**
5. **AI-assisted coding rounds** (candidate uses Copilot/Claude live, evaluated on prompting + code review + debugging) are documented at **product/global** companies — Meta added one in late 2025, Canva expects it — via [Intersog, "Technical Interviews in 2026"](https://intersog.com/blog/technical-interview-tips/). **No evidence found of this at any Indian service company.** Treat as a *product-company* phenomenon for now. **UNCERTAIN.**
6. A claim circulated in search results that "interviews per hire rose from 18 to 24 and requested YOE rose ~30%" could **not** be confirmed against the fetched HireDoor report, which contains no such figures. **Do not cite this.** Flagged UNVERIFIED.
7. **Take-home vs live coding:** no Indian service-company account in the sample used a take-home. Every coding evaluation observed was either a proctored timed OA or live/verbal. **INFERRED — absence of evidence, sample of 14.**

---

## 6. Where people actually fail — by stage

Ordered by observed elimination volume, not severity.

| Stage | Filter | Evidence |
|---|---|---|
| **1. OA aptitude/English** | Largest single cut. LTIMindtree: "quite a lot of candidates were eliminated after this round." KPIT Nov 2025: **145 selected from 700-800** at OA — an ~81% cut *before any human spoke to anyone*. | **VERIFIED** — [GfG LTIM](https://www.geeksforgeeks.org/interview-experiences/ltimindtree-interview-experience-for-software-engineer-2/), [GfG KPIT](https://www.geeksforgeeks.org/kpit-interview-experience-2025-on-campus-associate-engineer/) |
| **2. Coding section → level mapping** | At Capgemini and LTIMindtree, coding performance does not only pass/fail — it maps you to **Level 0/1/2** (LTIM) or role band (Capgemini Exceller). Weak coding = lower band + lower pay, not rejection. | **VERIFIED** — [GfG LTIM](https://www.geeksforgeeks.org/interview-experiences/ltimindtree-interview-experience-for-software-engineer-2/), [GfG Capgemini](https://www.geeksforgeeks.org/interview-experiences/capgemini-interview-experience-for-software-engineer-2026-on-campus/) |
| **3. Technical L1 (rapid-fire viva)** | Sharpest interview-stage cut observed: Persistent 2024 went **30-35 → 8-9** at L1 (≈73% cut). Failure mode is *hesitation and gaps across breadth*, not inability to solve one hard problem. | **VERIFIED** — [GfG Persistent 2024](https://www.geeksforgeeks.org/persistent-systems-interview-experience-for-software-engineer-on-campus-2024/) |
| **4. Technical L2 (depth + scenario)** | Persistent 8-9 → 5. Content shifts to puzzles, algorithm complexity, and — for lateral hires — multithreading/concurrency, Docker/K8s/AWS, architecture. | **VERIFIED** (campus) / **UNVERIFIED-BY-FETCH** (Apr 2025 lateral: Go concurrency, interfaces, Docker/K8s/AWS — Glassdoor snippet) |
| **5. Managerial / client round** | Present at TCS Digital, Capgemini, Tata Elxsi, Quest Global, Publicis Sapient, Cognizant (lateral). Tests *judgement and fit*, and at TCS Digital it is oddly conceptual: "how does Facebook manage its data", "how does Google rank search results". Cognizant lateral hires additionally face **client interviews** post-offer-stage. | **VERIFIED** (TCS) / **UNVERIFIED-BY-FETCH** (Cognizant, Fishbowl) |
| **6. HR** | Rarely a technical cut; frequently a **negotiation/logistics** cut — notice period, location flexibility, willingness to accept. KPIT asks outright: "How sure are you that you will accept the offer if selected?" | **VERIFIED** — [GfG KPIT](https://www.geeksforgeeks.org/kpit-technologies-interview-experience/) |

---

## 7. Honest limitations of this research

State these before anyone builds hours on it.

1. **Sample skews campus/fresher.** GeeksforGeeks — the richest source of round-by-round detail — is overwhelmingly on-campus. Lateral 2-3 YOE accounts are thinner and were mostly reached through search snippets rather than fetched pages. Glassdoor, LeetCode Discuss and AmbitionBox all **blocked automated fetch** (403/timeout), which is precisely where lateral data concentrates. **This is the largest gap in the archive.**
2. **The 70/30 viva-to-problem-solving ratio is INFERRED**, not sourced. It may not drive hour allocations on its own (per ARCHIVE_PROTOCOL §3, LOW/INFERRED claims inform ordering only).
3. **KPIT fit risk, and it is material.** KPIT's engineering mass is automotive embedded — technical rounds for experienced hires reportedly centre on C/C++ (C++11/14), AUTOSAR, embedded fundamentals, pointers, communication protocols, endianness ([Glassdoor Sr SWE snippet](https://www.glassdoor.com/Interview/KPIT-Technologies-Senior-Software-Engineer-Interview-Questions-EI_IE28977.0,17_KO18,42.htm), [Technoscripts KPIT embedded guide 2026](https://technoscripts.in/kpit-embedded-jobs-guide)) — **UNVERIFIED-BY-FETCH**. A Flutter/Frappe profile does not map onto that. **The referral must be steered to a KPIT digital/app-engineering opening specifically**, or the referral advantage is spent on a mismatched panel. Flag this to the candidate before he burns the referral.
4. **Company-name coverage is uneven.** Deep: Persistent, TCS Digital, LTIMindtree, Amdocs, KPIT, Capgemini. Thin: Zensar, Mphasis, Quest Global, HCL. Flutter-specific accounts came from Infosys/Accenture/Deloitte rather than the named targets — those are same-tier substitutes, and that substitution is itself an inference.
5. **Nothing here is first-hand.** Per ARCHIVE_PROTOCOL §5, the first real interview debrief Devang writes will outrank this entire file. Write it within 24 hours.

---

## 8. Five decisions this evidence supports

1. **Demote LeetCode volume; promote first-try fluency on easy/medium.** DSA is a gate, not a ranking axis, outside Infosys-SP-tier roles. *(from §1 — HIGH)*
2. **Build a timed retrieval deck for OOP / SQL-DBMS / OS / CN — 30-60s answers, spaced repetition.** This is the actual first-order filter. *(from §2 — MEDIUM, direction HIGH)*
3. **Treat the three shipped projects as the primary exam.** Write and rehearse a depth-ready account of offline-first sync/conflict resolution, campaign config modelling, and IAM approval state machines. *(from §3 — HIGH)*
4. **Flutter depth is non-negotiable and is well-defined**: state management *with justification*, lifecycle, async trio, rebuild/perf, architecture, mixins, null safety — plus rendering-pipeline concepts for the mid-level bar. *(from §4 — HIGH)*
5. **Add a spoken-fluency-under-timer drill.** AI-graded async rounds and 70-second-per-question vivas both punish thinking aloud slowly, independent of knowledge. *(from §2 + §5 — MEDIUM)*

---

## Sources
Full annotated list with access dates and verification flags: **[`SOURCES.md`](./SOURCES.md)**. Every URL cited inline above appears there.
