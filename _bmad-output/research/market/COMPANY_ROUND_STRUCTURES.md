# Company Round Structures — Non-MAANG India, 2026

- **Produced by:** market-researcher (subagent)
- **Date:** 2026-07-26
- **Question asked:** For each target company, what is the round-by-round pipeline, how long is each round, what format, what is the filter at that stage, and where do candidates observably fail?
- **Method:** Direct fetch of interview-experience write-ups where the host allowed it; search-result snippets where fetch was blocked (Glassdoor, LeetCode, AmbitionBox all return 403/timeout to automated fetch)
- **Confidence:** MEDIUM — campus pipelines are HIGH-confidence and well documented; lateral 2-3 YOE pipelines are MEDIUM-to-LOW and marked per row
- **Decay class:** FAST (re-research by **2026-10-24**)
- **Supersedes:** nothing
- **Sampling window:** accounts dated 2021-08 → 2026-02

**Reading key:** `[V]` = VERIFIED, page fetched directly. `[S]` = source is a search-result snippet, page fetch blocked. `[I]` = INFERRED from pattern across companies, no direct source.

---

## KPIT Technologies

**Named target · referral path exists · HIGHEST FIT RISK — read §Fit note.**

### Campus / early-career pipeline (Nov 2025) `[V]`
Source: [GfG, KPIT Interview Experience 2025 (On-Campus), dated 2025-11-11](https://www.geeksforgeeks.org/kpit-interview-experience-2025-on-campus-associate-engineer/)

| # | Round | Duration | Format | Content | Filter |
|---|---|---|---|---|---|
| 1a | Technical MCQ | 30 min | AON platform | 20 MCQs, branch-specific subjects | — |
| 1b | Written English | 25 min | AON | Essay, 198-242 words. Actual topic: hygiene/cleanliness during pandemics | — |
| 1c | Coding | 40 min | AON | 2 problems, easy→moderate. **Java and Python only** | — |
| 1d | Gamified aptitude | 27 min (3 × 9 min) | AON | Deductive reasoning, graph/chart problems, motion challenges | **Combined cut: 145 selected from 700-800 (~81% eliminated)** |
| 2 | **AI-conducted video interview** | ~45 min | Asynchronous, no human | 13 questions shown one at a time. **20 seconds to think, 2 minutes to record** | Result next day |

**The 13 AI-round questions, verbatim** `[V]`:
1. Introduce yourself and mention your area of expertise
2. Explain BFS and DFS graph traversal algorithms
3. What do you know about stack and queue? Give an example in C++
4. What is an operating system, and what are its main functions?
5. Describe your project (role, responsibilities, contributions, key learnings)
6. Define polymorphism and its types in C++
7. Explain inheritance and its types in C++
8. Coding problem: find the first index of the smallest element in an array
9. Describe your approach to solving the above
10. What is overfitting, and how can it be prevented?
11. Share your best travel experience
12. How do you approach teamwork vs. working independently?
13. What method do you follow during your meeting commitments?

### Earlier documented pipeline (2024) `[V]`
Source: [GfG, KPIT Technologies Interview Experience, updated 2024-04-08](https://www.geeksforgeeks.org/kpit-technologies-interview-experience/)
1. **OA (ION platform)** — aptitude (numerical/verbal/logical) + reasoning + coding + a game
2. **Technical** — self-intro, C++ fundamentals, **resume-based questions**, "very easy" coding
3. **HR** — "Tell me about yourself and your family background" · "Explain your objective" · "Tell me about your project and whose idea was this project" · group vs individual work preference · **"Why KPIT?"** · **"How much sure you are that you will accept the offer if selected?"** · salary and location

### Experienced / lateral pipeline `[S]`
Reported as **2 technical rounds → HR** ([Glassdoor Sr SWE](https://www.glassdoor.com/Interview/KPIT-Technologies-Senior-Software-Engineer-Interview-Questions-EI_IE28977.0,17_KO18,42.htm) — 403 to fetch, snippet only). Content reported: **C++ (C++11/14), AUTOSAR concepts, embedded fundamentals, pointers, data structures, communication protocols**; coding prompts described as practical — endian conversion, method overloading, linked lists, array basics. Python "good to have." Overall Glassdoor difficulty 2.89/5, 63.1% positive, avg 15 days. Also: L1 technical → L2 technical → HR structure per [GfG KPIT recruitment process](https://www.geeksforgeeks.org/kpit-technologies-recruitment-process/); domain MCQs cover OS, DBMS, OOP, CN.

> ### ⚠️ Fit note — act on this before using the referral
> KPIT's engineering centre of gravity is **automotive embedded** (ECU software, Powertrain, AUTOSAR, ADAS, EV) ([Technoscripts KPIT embedded guide 2026](https://technoscripts.in/kpit-embedded-jobs-guide) `[S]`). A Flutter/Frappe/Vue profile does not map onto an AUTOSAR panel. **The referral must be aimed at a KPIT digital / application-engineering / mobility-apps requisition specifically.** Ask the referrer which practice the opening sits in *before* the resume goes in. Confidence: **HIGH** that the risk is real; **MEDIUM** on whether non-embedded openings are plentiful.

**Where people fail:** the OA (81% cut, and half that clock is aptitude/English, not code); then the AI round, which punishes slow verbal recall regardless of knowledge.

---

## Persistent Systems

**Named target. Best-documented technical depth of any company in the sample.**

### Experienced-hire pipeline `[V]`
Source: [GfG, Persistent Systems Interview Experience For Software Developer, updated 2024-04-30](https://www.geeksforgeeks.org/interview-experiences/persistent-systems-interview-experience-for-software-developer/)

| # | Round | Duration | Content | Filter |
|---|---|---|---|---|
| 1 | Telephonic screening | 30 min | Resume/experience, education, languages, areas of interest, salary expectations, availability | Alignment to an open client/internal project |
| 2 | Technical 1 | 60 min | OOP, data structures, algorithms, **live coding**, projects. Example prompts: reverse a string, factorial | Foundational breadth |
| 3 | Technical 2 | 45 min | **Scenario-based**, advanced language topics (multithreading, concurrency), resume technologies | Depth + judgement |
| 4 | HR | 30 min | Work style, cultural fit, salary, career goals, Persistent's culture | Fit/negotiation |

Corroborating structure for lateral hires: TA screening → junior/mid developers testing foundations → **senior architects or managers on system design, project architecture, situational problem-solving**; rounds are sequential and each is an elimination step ([Dataford Persistent SWE guide 2026](https://dataford.io/interview-guides/persistent-systems/software-engineer) `[S]`).

### Campus pipeline (2024) — with conversion numbers `[V]`
Source: [GfG, Persistent SE On-Campus 2024, updated 2024-02-26](https://www.geeksforgeeks.org/persistent-systems-interview-experience-for-software-engineer-on-campus-2024/)
1. **Aptitude (AMCAT)** — quantitative, logical, technical
2. **Advanced coding (AMCAT)** — 2 medium problems (one string, one array/math)
3. **Technical L1, 40-45 min** → **30-35 candidates in, 8-9 out (~73% cut — the sharpest interview-stage filter in the whole sample)**. Content: BE project explanation; DBMS indexing; RDBMS differences; SQL joins and subqueries; inheritance and polymorphism; string reversal; searching a string in a list; API troubleshooting, status codes, testing, latency; git merge conflicts; testing types; steps to host a web application; threads, deadlock, multithreading; Linux user permissions and process management
4. **Technical L2** → 8-9 in, 5 out. Content: a lotus-flower growth puzzle; **find the majority element with frequency ≥ n/2**; sorting-algorithm complexities; **find the missing number in a 1-100 array with 99 elements**
5. **HR** → 5 in, 5 selected

### Other documented variants
- 2021 on-campus `[V]` ([GfG](https://www.geeksforgeeks.org/interview-experiences/persistent-systems-interview-experience-for-software-engineer-on-campus/)): OA = CS objective (20m) + English (15m) + logical (15m) + 2 coding (45m). Technical L1 included **multiple SQL queries**, C/C++ output prediction with switch-fallthrough, pattern printing, substring removal, **linker and loader**, **what happens when a browser resolves DNS**, middle of a linked list. Round 3 was an **AMCAT psychometric MCQ** (70-100 Qs in 15-30 min).
- OA content generally `[S]` ([GfG Persistent recruitment process](https://www.geeksforgeeks.org/interview-experiences/persistent-systems-recruitment-process/)): 50 questions / 60 min covering **DB concepts (joins, ER diagrams, SQL queries), networking (TCP/IP, routers, OSI model), OS (threads, paging), OOP**, plus aptitude and English. Second-highest-salary SQL query and aggregate functions explicitly reported.
- April 2025 lateral `[S]` (Glassdoor snippet): **L1 on Go concurrency and Go basics; L2 on prior-project contributions, concurrency and interfaces, Docker, Kubernetes, AWS.** Evidence that the lateral bar shifts toward runtime/infra, not algorithms.

**Where people fail:** technical L1 breadth. Fourteen distinct topics in 45 minutes; the cut is gaps, not depth.

---

## Amdocs

**Named target. The most SQL-heavy pipeline in the sample.**

### Software Developer (Java) — 3 rounds `[V]`
Source: [GfG, Amdocs Interview Experience for Software Developer (Java)](https://www.geeksforgeeks.org/interview-experiences/amdocs-interview-experience-for-software-developer-java/)

| # | Round | Duration | Content |
|---|---|---|---|
| 1 | Online assessment | 120 min | **SQL, Java, Linux commands**, 1 programming question: *merge two unsorted arrays in sorted order* |
| 2 | Technical | 60 min, **2 interviewers — one for Java, one for SQL** | **Java:** `final` and `static`; overriding vs overloading; OOP; types of Set. Coding: 2nd largest element in an array; **override `equals()` and `hashCode()`**. **SQL:** scenario-based; **joining 3 tables with inner join**; **self-join** |
| 3 | HR | — | Introduction, reason for switch, why Amdocs. Offer after ~1 week + salary negotiation |

Timeline: OA → +2 days → technical → +1 day → HR.

### On-campus variant `[V]`
Source: [GfG, Amdocs SE (On-Campus)](https://www.geeksforgeeks.org/interview-experiences/amdocs-interview-experience-for-software-engineer-on-campus/)
1. **Online test, 2 hrs, 5 sections** — aptitude (15Q/20m); technical (18Q/20m); 3 coding problems (60m); 10Q/10m; C++/Java technical MCQ (8Q/10m)
2. **Psychometric test, 15 min** — 50 MCQs on behaviour/confidence, **non-eliminating but compulsory**. 54 of ~250 progressed
3. **Technical** — first n primes (sieve), then OOP, cloud computing, ML basics. 21 progressed
4. **HR, 15 min** — intro, family background, why Amdocs

Other reported OA composition `[S]`: 5 sections including quantitative, verbal reasoning, **PL/SQL and Unix objectives**, coding/SQL ([Amdocs interview guides](https://www.interviewquery.com/interview-guides/amdocs-software-engineer)). Also reported `[S]`: R1 covering OS commands, testing, OOP/Java, projects, DB queries; R2 with **table-join queries, DSA, pattern printing, linked lists**.

**Where people fail:** the SQL half of the technical round — a dedicated SQL interviewer means SQL is a standalone pass/fail axis, not a bonus. Multi-table joins and self-joins are the recurring shape.

---

## TCS Digital

**Named target. Highest-band TCS track; managerial round is unusually conceptual.**

Source: [GfG, TCS Digital Interview Questions, updated 2024-09-25](https://www.geeksforgeeks.org/interview-experiences/tcs-digital-interview-questions/) `[V]`

Three rounds run back-to-back in roughly **75 minutes total** (some accounts report technical alone at 60-90 min, and technical + managerial often merged into one face-to-face sitting `[S]`).

| # | Round | Content |
|---|---|---|
| 1 | **Technical** | ~40 documented questions. **OOP:** four pillars; overloading vs overriding; `final`; JDK/JRE/JVM; why no multiple inheritance in Java; why no pointers; static variables/methods; can `main` be overloaded; error types and exception hierarchy; exception handling and `finally`. **DBMS/SQL:** ACID properties; transactions; DROP vs TRUNCATE vs DELETE; normalization; **HAVING vs WHERE**; find the 3rd-highest salary; primary/foreign key syntax. **DSA:** linked lists, loop detection and removal, dynamic programming. **Core:** call by value vs reference; swapping variables with and without a third; what happens when you enter a website URL. **Emerging tech:** blockchain, Bitcoin, AI/ML/deep learning, big data analytics, R. Plus project descriptions. |
| 2 | **Managerial** | Only 4 documented questions, all conceptual-systems: *How does Facebook manage its data?* · *How does Google rank search results?* · *How do you distinguish advertised vs organic results?* · *How is big data stored and managed organizationally?* |
| 3 | **HR** | Casual + **puzzles**: the 5L/3L jar problem (measure 4 litres) · three bulbs, three switches, one visit |

**Where people fail:** breadth of the technical bank. Forty topics is a memory-retrieval problem, and the managerial round rewards structured explanation of familiar systems rather than novel design.

---

## LTIMindtree

**Named target. The clearest documented evidence of the rapid-fire viva format.**

Source: [GfG, LTIMindtree Interview Experience for Software Engineer (Sep 2022)](https://www.geeksforgeeks.org/interview-experiences/ltimindtree-interview-experience-for-software-engineer-2/) `[V]`

| # | Round | Duration | Content | Filter |
|---|---|---|---|---|
| 1 | Aptitude and reasoning | — | MCQ, easy→medium | **"Quite a lot of candidates were eliminated after this round"** |
| 2 | Communication | — | English grammar, reading, listening | **Non-eliminating**, mandatory, not counted in average |
| 3 | Coding | — | 2 problems, 10 test cases each: 1 string (easier), 1 **dynamic programming** | **Determines Level 0 / 1 / 2 assignment** |
| 4 | Technical | **20-25 min** | **"18-20 rapid-fire questions"** — data structures, algorithms, C++, SQL, OOP. Named items: linear vs binary search; stack vs queue; types of polymorphism; SQL clauses | Breadth under time pressure |
| 5 | HR | ~20 min | Background, education choices, projects, family, certifications, **location flexibility** | Fit/logistics |

Other reported OA composition `[S]`: numerical aptitude, logical reasoning, English (synonyms/antonyms/comprehension), technical MCQs on **networking, DBMS, OS, DSA**, and **pseudocode mostly on bitwise operations** ([GfG LTIM fresher](https://www.geeksforgeeks.org/interview-experiences/ltimindtree-interview-experience-for-fresher/)). Frequently reported interview questions `[S]`: types of JOINs; DELETE vs TRUNCATE; second-highest salary; four pillars of OOP; abstraction vs encapsulation; polymorphism in Python. Glassdoor: 72% positive, difficulty 2.88/5, avg 29 days ([Glassdoor](https://www.glassdoor.co.in/Interview/LTIMindtree-Interview-Questions-E8441464.htm) `[S]`).

**Where people fail:** aptitude first; then the 70-seconds-per-question viva. Note the level-mapping mechanic — a weak coding round costs band and salary rather than the offer.

---

## Capgemini

**Named target.**

### Campus pipeline (Exceller SE, 2026 batch) `[V]`
Source: [GfG, Capgemini Interview Experience for Software Engineer 2026 On-Campus, updated 2025-10-10](https://www.geeksforgeeks.org/interview-experiences/capgemini-interview-experience-for-software-engineer-2026-on-campus/)

| # | Round | Format | Content | Filter |
|---|---|---|---|---|
| 1 | Communication | Online, from home | MCQs: grammar, business-communication writing, fill-in-the-blanks. Spoken: read-and-repeat, hear-and-repeat, speak on a topic, conversation. Described as "really easy" | Screening |
| 2a | Technical | On-campus, CoCubes | **40 questions**: pseudocode + scenario-based IT fundamentals — **databases, computer networks, cloud computing** | **Explicitly the elimination round** |
| 2b | Coding | CoCubes | 2 questions | **Performance determines role level** |
| 2c | Cognitive ability | CoCubes | Puzzle games + behaviour-based questions | — |
| 3 | Interview | Offline | Technical + behavioural: projects, **impact of AI**, resume details, personal challenges, career goals | Final |

Also reported `[S]`: technical section = 25 DSA/programming MCQs + 15 on cloud, OS, networking.

### Experienced / lateral pipeline `[S]`
Reported as **HR screening (background, experience, notice period, salary) → Technical (core skills, project experience, problem solving, real-time domain scenarios, previous responsibilities) → Manager → HR (communication, career goals, location/shift willingness, cultural fit)**; ~2 weeks end to end ([Quora, Glassdoor 2026 aggregates](https://www.glassdoor.co.in/Interview/Capgemini-Interview-Questions-E3803.htm)). Some accounts collapse this to 3 rounds: Technical → Manager → HR.

**Where people fail:** the 40-question IT-fundamentals section — it is the named elimination gate and it is *theory*, not code.

---

## Zensar

**Named target. Thinnest evidence base of the named set — treat as LOW confidence.**

- Glassdoor: **71.1% positive, difficulty 2.8/5, average process 9 days** — the fastest pipeline among named targets ([Glassdoor](https://www.glassdoor.co.in/Interview/Zensar-Technologies-Interview-Questions-E255019.htm) `[S]`)
- **2025-2026 experienced hire:** a single technical round on **.NET fundamentals and cloud-computing basics** `[S]`
- Campus shape `[S]`: OA with DSA coding, ~1.5 hrs → technical (language fundamentals; reported item: *why Java doesn't support multiple inheritance*) → HR, mostly resume-based
- Reported structure elsewhere `[S]`: technical test → virtual technical → final technical → HR

**Assessment:** Zensar appears to run a **short, stack-specific** pipeline — they interview to the requisition's tech stack rather than to a generic CS bar. **INFERRED**, single-source-ish. For a Flutter requisition, expect Flutter/Dart depth rather than DSA.

---

## Same-tier substitutes (use when named targets are thin)

### Infosys — Specialist / Power Programmer `[S]`
**The exception that proves the DSA rule.** OA: 180 min, 4 questions (Easy/Medium/Hard/Complex), 12 test cases each; HackWithInfy (2025-07-12) ran 3 questions — 2 medium, 1 hard — on **DP, graphs, greedy**. Reported interview items: sliding-window (LeetCode hard), **topological sort**, doubly linked lists; plus normalization, SQL queries, **deadlocks**, OS scheduling, ACID. "At least 1 coding question must be solved completely in front of the interviewer." Avg 45 days to hire. Sources: [LeetCode SP 2025](https://leetcode.com/discuss/post/7302950/) (403 to fetch), [Medium SP 2025](https://medium.com/@giga_dummy/infosys-sp-role-interview-experience-2025-by-dev-sharma-210bcfa7dfef), [Glassdoor Power Programmer](https://www.glassdoor.com/Interview/Infosys-Power-Programmer-Interview-Questions-EI_IE7927.0,7_KO8,24.htm). **If Devang wants a genuinely DSA-heavy target, this is it — and it is a different preparation programme from everything else on this page.**

### Infosys — Flutter Developer (Dec 2025) `[V]`
Source: [Medium, Dec 2025](https://medium.com/@flutter-interview/infosys-flutter-developer-interview-experience-83ee7b84a05d)
1. **HR screening call** — intro, experience check, notice period, expected salary
2. **Online technical (Flutter + DSA)** — widget lifecycle, state-management basics, Flutter performance optimization, one DSA problem involving macros and recursion
3. **Face-to-face** — technical panel discussion, then HR
Reported elsewhere as: virtual technical (DSA + Flutter) → in-person managerial on **Agile/JIRA/SDLC** → HR salary discussion. ~2 weeks.

### Accenture — Flutter Developer, Bangalore (Jan 2026) `[V]`
Source: [Medium, 2026-01-13](https://medium.com/@flutter-interview/accenture-flutter-developer-interview-experience-cfbf402fa99a)
**One round, 43 min** (scheduled 30), 2 interviewers with 1 asking, remote, no cameras. Content: how you approach state in Flutter and when you prefer different methods; when and why to use **mixins**; Stateful vs Stateless with real-world reasoning; how **Streams** work and when they're right; what **Futures** are and common pitfalls; scenario-based **async/await** flow. **"DSA questions were very limited."** Outcome: no offer.

### Deloitte — Flutter Developer (Jan 2026) `[V]`
Source: [Medium, 2026-01-28](https://medium.com/@flutter-interview/my-flutter-interview-experience-at-deloitte-dd0bc95be426)
1. **Core Flutter & Dart** — StatelessWidget vs StatefulWidget; widget lifecycle methods; how Flutter renders UI internally; `var`/`final`/`const`; Future vs Stream; null safety
2. **Coding + architecture** — live coding with state management; optimizing a list to prevent unnecessary rebuilds; **where API calls belong**; BLoC vs Provider vs Riverpod
3. **Project, behaviour, real-world scenarios** — end-to-end feature ownership; production debugging; performance optimization; deadlines and requirements; cross-team collaboration

**This 3-round shape is the best available template for what a Flutter role at a service company looks like end-to-end.**

### Nagarro `[V/S]`
Source: [GfG Nagarro SWE](https://www.geeksforgeeks.org/interview-experiences/nagarro-interview-experience-for-software-developer/)
1. **OA** — 3 coding questions + 25 aptitude MCQs (Java, SQL, logical reasoning), basic→moderate
2. **Technical, ~20 min** — self-intro, main project with roles and responsibilities, OOP questions, coding (e.g. merge two sorted arrays); also OS, algorithms, DS, C, Java, SQL, networking; program-output questions on OOP
3. **Resume-specific depth** — a candidate with NLP on the resume was asked stemming vs lemmatization, Word2Vec/TF vectorization, LSTM architecture
4. HR

### Publicis Sapient — Associate / Senior Associate Technology L1 `[S]`
Reported as **3 internal rounds + 3 client rounds**, some ~2 hrs each; other 2025 accounts report a lighter **1-hr virtual technical + 30-min techno-managerial**. Content: Java programs (find duplicate characters), interfaces, XPath scenarios, **Git commands, CI/CD**, array problems, OOP, exception handling. L1 rated 2.9/5 difficulty, 86% positive, avg 5 days ([Glassdoor](https://www.glassdoor.com/Interview/Publicis-Sapient-Senior-Associate-Technology-L1-Interview-Questions-EI_IE1646026.0,16_KO17,47.htm)).

### Tata Elxsi / Quest Global `[S]`
**Tata Elxsi:** HR screening → Technical 1 (coding, aptitude, resume/experience) → Technical 2 (deeper concepts, scenarios, domain) → Managerial (technical + teamwork + project management). Reported content: contribution to past projects, depth on projects, 4G/5G call procedures, **design an architecture from a problem statement**, write a data structure for a problem statement, Java+AWS, Java 8 lambdas/streams, DB design and SQL, DevOps cycles.
**Quest Global:** Technical 1 (basics) → Technical 2 (scenario-based) + managerial on project knowledge → HR (salary, role).

### Wipro / Tech Mahindra / Cognizant / Mphasis `[S]`
- **Wipro lateral:** one or two technical rounds on the core stack **plus system design** — scalable REST APIs, load balancing, Redis caching, microservices with cross-questioning on service discovery, circuit breakers, fault tolerance. Core topics: C/C++/Java OOP, networking, DBMS, OS.
- **Tech Mahindra:** technical round is mostly **OOP, OS and resume topics plus 1-2 easy DSA questions**.
- **Cognizant lateral:** internal rounds, then **client interviews before project allocation** — described as discussion-based, easy-to-medium technical. GenC (fresher) rounds run on SuperSet with **two interviewers**, one in person and one online, video recorded.
- **Mphasis:** technical → **managerial** → HR.

---

## Cross-company pattern summary

| Pattern | Companies exhibiting it | Confidence |
|---|---|---|
| Aptitude/English/psychometric before any technical human contact | KPIT, LTIMindtree, Capgemini, Persistent, Amdocs, Nagarro | **HIGH** `[V]` |
| Coding performance maps to **role level/band**, not just pass/fail | LTIMindtree (L0/L1/L2), Capgemini (Exceller band) | **HIGH** `[V]` |
| A rapid-fire breadth viva as the main interview filter | LTIMindtree, TCS Digital, Persistent L1, KPIT AI round | **HIGH** `[V]` |
| A dedicated managerial/client round separate from technical | TCS Digital, Capgemini, Tata Elxsi, Quest Global, Mphasis, Cognizant, Publicis Sapient | **MEDIUM** (mixed `[V]`/`[S]`) |
| HR round is logistics + negotiation, not a technical cut | KPIT, Amdocs, LTIMindtree, Capgemini, Persistent | **HIGH** `[V]` |
| System design appears only for lateral hires, and stays domain-lite | Wipro, Persistent L2, Tata Elxsi | **MEDIUM** `[S]` |
| **No take-home assignment observed anywhere in the sample** | — | **MEDIUM** (absence of evidence, n=14) |

---

## Sources
See **[`SOURCES.md`](./SOURCES.md)** for the full annotated list with access dates and VERIFIED/UNVERIFIED/DEAD flags.
