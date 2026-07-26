# SOURCES — Syllabus Research Provenance Ledger

**Compiled:** 2026-07-26
**Compiled by:** topic-inventory research agent
**Purpose:** Every URL cited anywhere in `_bmad-output/research/syllabus/` appears here with a verification flag. No link enters a syllabus file unless it appears in this ledger.

## Verification legend

| Flag | Meaning |
|---|---|
| **VERIFIED** | Fetched on the date shown; page returned real content matching its claim. Safe to cite. |
| **UNVERIFIED** | URL is live (server responded) but content could not be machine-extracted (JS-rendered SPA, or bot-blocked with 403). Human should confirm in a browser before relying on it. |
| **DEAD** | Returned 404 or redirects off-host. Must NOT be cited. Listed so nobody re-adds it. |
| **SEARCH-DERIVED** | Fact came from a search-engine summary of the page rather than a direct fetch. Treat the *numbers* as approximate until a human confirms. |

---

## VERIFIED (fetched 2026-07-26, content confirmed)

### DSA
| URL | What it gave us |
|---|---|
| https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/ | Striver A2Z: 18 steps + exact per-step problem counts (474 total) |
| https://www.geeksforgeeks.org/dsa/top-50-array-coding-problems-for-interviews/ | Array bank: 18 Easy / 20 Medium / 10 Hard + 22 theory questions |
| https://www.geeksforgeeks.org/dsa/top-50-dynamic-programming-coding-problems-for-interviews/ | DP bank: 8 Easy / 24 Medium / 11 Hard |
| https://blog.algomaster.io/p/15-leetcode-patterns | Canonical 15-pattern taxonomy with "when to use" per pattern |
| https://github.com/ashishps1/awesome-leetcode-resources | Cross-check pattern list (two pointers, sliding window, prefix sum, fast/slow, top-K, Kadane, in-place LL reversal, monotonic stack, overlapping intervals) + 20-DP-patterns and bit/heap/string pattern collections |

### SQL / DBMS
| URL | What it gave us |
|---|---|
| https://sqlbolt.com/ | 20-lesson interactive syntax ladder; Lesson 12 = order of execution |
| https://pgexercises.com/ | 7 exercise categories: Basic, Joins/Subqueries, Modifying, Aggregates, Date, String, Recursive |
| https://www.hackerrank.com/domains/sql | 6 subdomains: Basic Select, Advanced Select, Aggregation, Basic Join, Advanced Join, Alternative Queries |
| https://www.postgresql.org/docs/current/tutorial-window.html | Window function semantics: OVER, PARTITION BY, frame behaviour, where window fns are forbidden |
| https://www.geeksforgeeks.org/dbms/commonly-asked-dbms-interview-questions/ | 58-question DBMS bank, 3 tiers (beginner 1-25, intermediate 26-50, advanced 51-58) |
| https://www.geeksforgeeks.org/dbms/sql-interview-questions/ | 88-question SQL bank across 6 topic areas incl. window functions, CTEs, isolation levels, PIVOT, OLTP vs OLAP |
| https://www.interviewbit.com/dbms-interview-questions/ | Independent DBMS bank; adds intension vs extension, 2-tier vs 3-tier, data warehousing, materialized-view trade-offs, top-N-per-group |

### Operating Systems
| URL | What it gave us |
|---|---|
| https://www.geeksforgeeks.org/operating-systems/last-minute-notes-operating-systems/ | Full OS revision spine: basics, process mgmt, memory mgmt, I/O mgmt, advanced |
| https://www.interviewbit.com/operating-system-interview-questions/ | 70 questions in 3 tiers (22 basic / 25 intermediate / 23 advanced) + 10 MCQs |
| https://www.geeksforgeeks.org/interview-prep/os-cn-dbms-interview-questions/ | Compact cross-subject bank; OS = Q1-22 (the true high-frequency core) |

### Computer Networks
| URL | What it gave us |
|---|---|
| https://www.geeksforgeeks.org/top-50-computer-networking-interview-questions-and-answers/ | 13 topic clusters incl. congestion control variants, ARQ protocols, routing, CIDR/VLSM, STP/VLAN |
| https://www.interviewbit.com/networking-interview-questions/ | 3-tier bank + 8 MCQs; adds proxy fwd/reverse, well-known ports, TTL |
| https://www.geeksforgeeks.org/interview-prep/os-cn-dbms-interview-questions/ | CN = Q41-60 (the true high-frequency core) |

### OOP / LLD
| URL | What it gave us |
|---|---|
| https://www.geeksforgeeks.org/interview-prep/oops-interview-questions/ | 30-question OOP core bank |
| https://www.interviewbit.com/oops-interview-questions/ | 3-tier OOP bank; advanced tier adds Python MRO, C++ virtual destructors, diamond problem, SOLID, assoc/agg/composition, inheritance-vs-composition |
| https://www.geeksforgeeks.org/system-design/top-low-level-system-designlld-interview-questions-2024/ | 50-question LLD bank — the definitive evidence for which design patterns are actually asked |

### System Design
| URL | What it gave us |
|---|---|
| https://github.com/donnemartin/system-design-primer | HLD breadth: perf-vs-scalability, latency-vs-throughput, availability-vs-consistency, DNS/CDN/LB/reverse-proxy, app layer, RDBMS+NoSQL scaling, caching, async, comms protocols, security, OOD section |

### Flutter / Dart
| URL | What it gave us |
|---|---|
| https://dart.dev/language | Dart language section map (variables → classes → mixins → interfaces/abstract → async → exceptions) |
| https://dart.dev/language/concurrency | Event loop, Futures, async-await, Streams, isolates (own memory + own event loop, message passing, `Isolate.run` vs `Isolate.spawn`) |
| https://docs.flutter.dev/get-started/fundamentals/state-management | Official learning pathway; ephemeral vs app state, ChangeNotifier, ListenableBuilder |
| https://docs.flutter.dev/perf/best-practices | Performance: build() cost, StringBuffer, saveLayer, opacity/clipping, lazy lists, intrinsics, 16ms budget, the `operator ==` O(N²) trap |
| https://docs.flutter.dev/testing/overview | Unit/Widget/Integration + confidence-vs-cost trade-off matrix |
| https://www.hirist.tech/blog/top-30-flutter-interview-questions-and-answers/ | India-shaped Flutter bank segmented by YOE (fresher / 2yr / 3yr / 5+yr) plus Bloc and GetX sections |

### Frappe / Vue / Python
| URL | What it gave us |
|---|---|
| https://docs.frappe.io/framework | Frappe self-description: full-stack Python+JS, MariaDB, **metadata as data**, built-in admin, role permissions, auto REST API |
| https://vuejs.org/guide/essentials/reactivity-fundamentals.html | `ref()` vs `reactive()`, `.value`, deep reactivity, `nextTick()`, and the documented reactivity limitations (destructuring loses reactivity, `reactive()` can't hold primitives) |
| https://www.geeksforgeeks.org/python/python-interview-questions/ | 68-question Python bank in 3 tiers (fundamentals 1-29, intermediate 30-51, advanced 52-68) |

---

## UNVERIFIED (live but not machine-readable — confirm in a browser)

| URL | Why | Impact |
|---|---|---|
| https://neetcode.io/practice | Fetch returned only the page `<title>`; the list is client-side rendered. | The NeetCode 150 category counts used in `DSA.md` are SEARCH-DERIVED, not fetched. |
| https://neetcode.io/roadmap | Same JS-rendering problem. | Roadmap topology cited from general knowledge + search only. |
| https://leetcode.com/studyplan/top-sql-50/ | HTTP **403** to automated fetch (bot protection). Page is real in a browser. | Section list in `SQL_DBMS.md` is not fetch-confirmed. |
| https://leetcode.com/studyplan/top-interview-150/ | Same 403 class of block. | Topic split cited from search summary only. |

## SEARCH-DERIVED (numbers approximate until human-confirmed)

| Claim | Source of claim |
|---|---|
| NeetCode 150 = 18 categories, **28 Easy / 97 Medium / 25 Hard** | Search summary of neetcode.io + community mirrors (github.com/KaranChadha10/Neetcode-150, crackr.dev/neetcode150). Not directly fetched. |
| NeetCode per-category counts (Arrays&Hashing 9, Two Pointers 5, Sliding Window 6, Stack 8, Binary Search 7, Linked List 6, Trees 15, Tries 3, Heap 3, Backtracking 9, Graphs 13, Advanced Graphs 6, 1-D DP 12, 2-D DP 11, Greedy 8, Intervals 6, Math&Geometry ~8, Bit Manip ~7) | Same. Math&Geometry and Bit Manipulation counts were not returned and are estimated. |
| Indian service-co HR norms: notice period 30-day strongly preferred; HR round is effectively a CTC-discussion round; fresher band stuck ~₹3-3.6 LPA; 3-5 YOE specialist band ~₹10-28 LPA | Search summary across Glassdoor/Fishbowl/entri.app/peoplematters community and press reporting. **Directional, not authoritative.** Verify against current Levels.fyi / AmbitionBox before quoting a number in a negotiation. |
| Flutter 2026 interview emphasis (lifecycle chain, keys reconciliation, isolates vs async, Provider/Riverpod/Bloc comparison) | Search summary corroborated by the VERIFIED hirist.tech bank. |

---

## DEAD — do not re-add

| URL | Failure |
|---|---|
| https://www.geeksforgeeks.org/computer-networks/computer-network-interview-questions/ | **HTTP 404** |
| https://www.geeksforgeeks.org/system-design/low-level-design-lld-interview-preparation-guide/ | **HTTP 404** |
| https://mode.com/sql-tutorial/sql-window-functions/ | **301 redirect off-host** to thoughtspot.com. The Mode SQL tutorial no longer exists at its historic URL. Use the PostgreSQL window tutorial instead. |

---

## Re-verification policy

These links rot. Re-run the fetch check on every URL in this file:
- before the start of each 30-day learning cycle, and
- any time a syllabus file is edited.

Update the date stamp at the top of the affected syllabus file when you do. A link that fails twice in a row gets demoted to DEAD and a replacement must be found and fetched before the topic cluster is taught.
