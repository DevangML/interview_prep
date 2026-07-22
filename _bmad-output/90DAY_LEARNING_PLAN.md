# 90-Day Learning Plan: Interview Sprint

**Start Date:** 2026-07-22  
**Target Date:** 2026-10-20 (91 days)  
**Target:** Persistent Systems + Warm Network Activation  

---

## RE-SEQUENCE (2026-07-22 course correction)

**Continuous vs Sprint model** — different skills need different cadences:

- **DSA = CONTINUOUS from Day 1 → end.** It is the weakest (0.0), slowest-building, hardest-gated skill. Pattern recognition only comes from **spaced daily reps** over many weeks, so it starts Day 1 as a small daily drip (1–2 problems/day) and never stops. It does NOT wait for SQL.
- **SQL = SPRINT (Weeks 1–2).** Smaller surface; reachable to competence in a focused block. Runs *alongside* the DSA drip, as the main focus of Weeks 1–2.
- **Core CS = SPRINT (Weeks 3–6).**

**Day-1 dual start:** SQL sprint (main focus) + DSA daily warm-up (Arrays/Hashing first). From **Week 5**, add three **parallel confidence-builder tracks** (strengths/differentiators, not from-scratch):

### Parallel Track A — AI Integration (Weeks 5–10) · ~3–4 hrs/week
His **#1 market differentiator** (+30–40% premium). Frame as interview stories + one small demo.
- LLM API design (Claude/OpenAI): prompts, tokens, streaming, tool-use
- RAG basics: embeddings, vector search, chunking
- Agentic patterns + context engineering (his existing BMad strength → articulate it)
- Deliverable: one small AI-integrated demo + 2 STAR stories ("I used AI to…")

### Parallel Track B — System Design via Experience Bridge (Weeks 5–8) · ~3 hrs/week
NOT from scratch — **formalize what he already shipped** (see `CURRICULUM_SPEC.md` bridge table).
- Wk5: Offline-first sync → CAP, eventual consistency, conflict resolution (his WMS work)
- Wk6: Config engine → Interpreter/Strategy/Factory; campaign matching → pub/sub, event-driven
- Wk7: IAM → RBAC/ABAC; caching/TTL; multi-tenant → sharding/partitioning
- Wk8: Tie together into a full mock design + idempotent API design

### Parallel Track C — Cloud Fundamentals (Weeks 6–8) · ~2 hrs/week
Real **gap** to close. Thin and practical.
- AWS/Azure core services (compute, storage, DB, networking basics)
- Containers (Docker he knows) + CI/CD + one actual deploy

### Long-Lead Track D — Referral + Pitch + Behavioral (Day 1 → end) · ~1–2 hrs/week
Warm intros are slow and human-dependent, and HR/Selling is a weakness needing many reps — so this starts **now**, not Week 9.
- Wk1–2: draft v0 elevator pitch; soft-nurture the warm network (casual check-ins with Ranjeet, no ask yet)
- Wk3–4: pitch v1 ready → make the **formal referral ask** (Ranjeet → intro to Mangesh)
- Wk5+: 1 STAR story/week; refine pitch; keep referral conversations warm
- Interviews are **pursued as gates clear**, not deferred to Week 12

### Micro-Drip Track E — Math / Numerical Aptitude (Day 1 → Week 8) · ~15–20 min, 3×/week
Stated weakness, and enterprise/service firms (Persistent, Amdocs, TCS-tier) run aptitude rounds. Tiny, frequent: quant, DI, logical reasoning, plus complexity/bit-math that doubles as DSA support.

### Reinforcement & Maintenance (spaced repetition — fixes "learned once")
- **After each sprint, schedule SM2 reviews:** SQL re-tested Wk4 & Wk8; Core CS re-tested Wk8 & Wk11; DSA is self-reinforcing via the daily drip.
- **Weeks 11–12 = Gate-Maintenance pass:** re-verify *every* earlier gate (SQL, DSA, Core CS, System Design) before interviews — gates are **achieve-and-maintain**, not one-time.

### Buffer
- **~1 week of built-in slack** (lighter load in the final fortnight / consolidation) absorbs slippage, sick days, and interview-scheduling churn. Do not pack Weeks 11–12 to 100%.

> The Week 6–8 "System Design" blocks below now **start from his real work**, not textbook scratch. DSA/SQL/Core CS remain ground-up. Tracks D & E and the reinforcement/buffer rules above are the instance-level fixes from the 2026-07-22 planning audit (see `specs/spec-curriculum-planning/`).

---

## Weekly Breakdown

### Week 1 (Jul 22–Jul 28): SQL Sprint (main) + DSA Daily Drip (Day 1 start)

**🔁 DSA DAILY DRIP (every day, ~30–45 min, starts Jul 22):** Arrays & Hashing — 1–2 problems/day.
Two Sum → Contains Duplicate → Valid Anagram → Group Anagrams → Top K Frequent. Pseudocode-first, verbalize the misconception trap (O(n²) loop vs O(n) hash map) before coding. This is a *habit*, not a sprint — small and daily, never skipped.

**SQL Sprint (main focus below):**

**Daily Breakdown:**
- **Mon (Jul 22):** SQL basics refresher (SELECT, WHERE, DISTINCT)
  - Write 3 queries from scratch: filter users by created_at, count distinct emails, pagination
  - Misconception: DISTINCT isn't a performance lever; WHERE filters rows early

- **Tue (Jul 23):** ORDER BY, LIMIT, multiple WHERE conditions
  - Write 5 queries: sorting, limiting, complex filters
  - Misconception: ORDER BY without index is O(n log n); WHERE reduces cardinality first

- **Wed (Jul 24):** Joins intro — INNER JOIN
  - Write 5 INNER JOIN queries: users + orders, products + categories
  - Misconception: JOIN isn't an extra operation; it's a filtered cross-product

- **Thu (Jul 25):** LEFT JOIN, understanding NULL
  - Write 5 LEFT JOIN queries: find users with no orders, optional fields
  - Misconception: LEFT JOIN returns all left rows; NULL ≠ 0 or empty string

- **Fri (Jul 26):** FULL OUTER JOIN, Self JOINs
  - Write 5 FULL OUTER queries; 3 self-joins (manager-employee, tree structures)
  - Misconception: Self-joins require aliases; not all DBs support FULL OUTER

- **Sat–Sun (Jul 27–28):** Consolidation + 10 mixed queries
  - **Gate 1a:** Write 10 queries (3-4 JOINs each) cold
  - Score: 8/10+ to pass Week 1

**Deliverables:**
- `sql_week1_queries.sql` — 50+ working queries
- `sql_week1_misconceptions.md` — 10 misconceptions documented

---

### Week 2 (Jul 29–Aug 04): SQL Sprint (main) + DSA Daily Drip (continues)

**🔁 DSA DAILY DRIP (continues):** Finish Arrays & Hashing, begin Two Pointers (Valid Palindrome, Container With Most Water). Still 1–2/day, pseudocode-first.

**SQL Sprint (main focus below):**

**Daily Breakdown:**
- **Mon (Jul 29):** GROUP BY basics
  - Write 5 GROUP BY queries: count per user, sum per category
  - Misconception: Non-aggregated columns must be in GROUP BY (SQL standard)

- **Tue (Jul 30):** HAVING clause, multi-level grouping
  - Write 5 queries: HAVING conditions, GROUP BY multiple columns
  - Misconception: HAVING filters groups *after* aggregation; WHERE filters *before*

- **Wed (Jul 31):** Window Functions intro (ROW_NUMBER, RANK, LAG, LEAD)
  - Write 5 queries: ranking, running totals, prev/next row values
  - Misconception: Window functions are new (SQL:2003+); not all DBs support equally

- **Thu (Aug 01):** CTEs (WITH clause), recursive CTEs
  - Write 5 queries: simple CTEs, recursive tree traversal
  - Misconception: Recursive CTEs are inefficient; actually, they're often faster than recursive queries

- **Fri (Aug 02):** Query Optimization — EXPLAIN, indexes, execution plans
  - Deep dive: 3 slow queries, analyze EXPLAIN output, add indexes
  - Misconception: More indexes = faster queries (they slow writes; choose wisely)

- **Sat–Sun (Aug 03–04):** Normalization (1NF–BCNF), ACID
  - Design schema for Persistent Systems app (10M users, millions of orders/sec)
  - Understand ACID (Atomicity, Consistency, Isolation, Durability)
  - **Gate 1b:** 10 optimization queries cold, with EXPLAIN analysis

**Deliverables:**
- `sql_week2_queries.sql` — 50+ working queries
- `sql_schema_design.sql` — Persistent Systems-scale schema
- **Gate 1 Complete:** SQL Gate (20/20 queries, optimization understood)

---

### Week 3 (Aug 05–Aug 11): DSA Phase 1 — Arrays & Hashing + START Core CS

**Daily Breakdown:**
- **Mon (Aug 05):** Hash Map data structure, collisions, time-space tradeoff
  - Pseudocode 5 problems: Two Sum, Contains Duplicate, Valid Anagram
  - **Misconception Trap:** O(n²) nested loop vs O(n) hash map

- **Tue (Aug 06):** Two Pointer intro — arrays with sorted/unsorted
  - Pseudocode 5 problems: Valid Palindrome, Container With Most Water
  - **Misconception Trap:** When to sort; pointer movement order

- **Wed (Aug 07):** Sliding Window intro — contiguous subarrays
  - Pseudocode 3 problems: Longest Substring Without Repeating, Sliding Window Max
  - **Misconception Trap:** When to expand vs shrink window; state tracking

- **Thu (Aug 08):** START Core CS — OS Fundamentals
  - Processes vs Threads, context switching, memory (stack vs heap)
  - Synchronization: mutex, semaphore, deadlock
  - **Misconception Trap:** Processes are isolated; threads share memory = race conditions

- **Fri (Aug 09):** OSs continued — Virtual memory, paging, TLB
  - Why caching works at OS level; memory hierarchy
  - Persistent Systems: Why microservices need thread-safe code

- **Sat–Sun (Aug 10–11):** DSA consolidation + OS review
  - Solve 5 DSA problems (1 per topic) cold
  - Explain OS concepts from scratch
  - **Gate 2a:** DSA problems cold; Gate 2b: OS concepts articulated

**Deliverables:**
- `dsa_week3_pseudocode.md` — 13 problems in pseudocode
- `dsa_week3_implementations.py` — 13 implementations
- `core_cs_os_notes.md` — OS concepts + diagrams

---

### Week 4 (Aug 12–Aug 18): DSA Phase 2 — Stacks/Queues + Core CS — Networks

**Daily Breakdown:**
- **Mon (Aug 12):** Stack data structure, LIFO patterns, backtracking
  - Pseudocode 5 problems: Valid Parentheses, Daily Temperatures, Largest Rectangle
  - **Misconception Trap:** Monotonic stack pattern (when stack stays sorted)

- **Tue (Aug 13):** Queue, BFS patterns, level-order traversal
  - Pseudocode 5 problems: Level order trees, rotting oranges
  - **Misconception Trap:** BFS vs DFS; queue for breadth, stack for depth

- **Wed (Aug 14):** START Core CS — Networks (TCP/IP)
  - TCP 3-way handshake, IP, UDP, DNS
  - HTTP/HTTPS, keep-alive, compression
  - **Misconception Trap:** TCP guarantees ordering; UDP doesn't

- **Thu (Aug 15):** Networks continued — Load Balancing, CDN, Congestion Control
  - Round-robin, consistent hashing, geographic routing
  - **Persistent Systems Lens:** How LB routes millions of requests

- **Fri (Aug 16):** Networks + DBMS basics
  - START DBMS: ACID properties, isolation levels (READ_UNCOMMITTED–SERIALIZABLE)
  - **Misconception Trap:** SERIALIZABLE is slower but stronger; trade-off necessary

- **Sat–Sun (Aug 17–18):** DSA + Core CS consolidation
  - Solve all 5 DSA types cold (Hash Maps, Pointers, Sliding Window, Stack, Queue)
  - **Gate 2b (Final):** All 5 DSA problems + misconception traps verified

**Deliverables:**
- `dsa_week4_pseudocode.md` — 10 problems in pseudocode
- `dsa_week4_implementations.py` — 10 implementations
- `core_cs_networks_notes.md` — Networks + diagrams
- `core_cs_dbms_notes.md` — ACID + isolation levels

---

### Week 5 (Aug 19–Aug 25): DSA Phase 3 — Trees/Graphs + Core CS — DBMS Deep Dive

**Daily Breakdown:**
- **Mon (Aug 19):** Binary Tree basics, DFS (inorder, preorder, postorder), BFS
  - Pseudocode 5 problems: BST operations, tree traversal, path sum
  - **Misconception Trap:** Preorder for serialization; inorder doesn't give sorted output for all trees

- **Tue (Aug 20):** Graphs — adjacency list/matrix, DFS, BFS
  - Pseudocode 5 problems: Number of islands, course schedule (cycle detection)
  - **Misconception Trap:** Directed vs undirected; forgetting visited set = infinite loop

- **Wed (Aug 21):** DBMS Deep Dive — Replication strategies (Master-Slave, Master-Master)
  - CAP theorem, consistency models (strong, eventual, weak)
  - **Persistent Systems Lens:** When to use each consistency model

- **Thu (Aug 22):** DBMS — Database Sharding strategies
  - Range-based, hash-based, directory-based, consistent hashing
  - Cross-shard transactions, distributed joins
  - **Misconception Trap:** Sharding isn't partitioning; sharding spans multiple servers

- **Fri (Aug 23):** DBMS — Indexing (B-tree, Hash, Bitmap), Query Optimization
  - Why indexes speed reads but slow writes
  - Covering indexes, composite indexes
  - **Persistent Systems Lens:** Choosing index strategy for billions of records

- **Sat–Sun (Aug 24–25):** DSA + DBMS consolidation
  - **Gate 3 (Final):** Explain OS + Networks + DBMS from scratch (30 min essay per domain)

**Deliverables:**
- `dsa_week5_pseudocode.md` — 10 problems in pseudocode
- `dsa_week5_implementations.py` — 10 implementations
- `core_cs_dbms_deep.md` — Replication + Sharding + Indexing

---

### Week 6 (Aug 26–Sep 01): DSA Phase 4 — Dynamic Programming Intro + System Design Phase 1

**Daily Breakdown:**
- **Mon (Aug 26):** DP fundamentals — memoization, overlapping subproblems
  - Pseudocode 3 problems: Fibonacci, Climbing Stairs, House Robber
  - **Misconception Trap:** DP isn't magic; it's recursion with caching

- **Tue (Aug 27):** DP advanced — Knapsack, coin change, longest common subsequence
  - Pseudocode 3 problems
  - **Misconception Trap:** Bottom-up DP vs top-down; space optimization tricks

- **Wed–Fri (Aug 28–30):** System Design Phase 1 — Cache Strategy (Redis)
  - TTL (Time To Live), cache eviction (LRU, LFU)
  - Cache stampede (dogpile), write-through vs write-back
  - Distributed cache (Redis Cluster), replication
  - **Gate 4a:** Design caching strategy for user profile service (10M users, 99.9% hit rate)

- **Sat–Sun (Aug 31–Sep 01):** DSA consolidation + Cache deep dive
  - **Gate 2c:** DP problems cold (if time permits; DP is lower priority)
  - **Gate 4a:** Cache strategy reviewed by Senku

**Deliverables:**
- `dsa_week6_dp.md` — 6 DP problems
- `system_design_cache_strategy.md` — Redis caching design

---

### Week 7 (Sep 02–Sep 08): System Design Phase 2 — Sharding + Rate Limiting

**Daily Breakdown:**
- **Mon–Tue (Sep 02–03):** Database Sharding deep dive
  - Consistent hashing (ring, virtual nodes)
  - Geographic sharding, range-based sharding
  - **Gate 4b:** Design sharding strategy for Persistent Systems-scale user data

- **Wed–Thu (Sep 04–05):** Rate Limiter design
  - Token bucket, leaky bucket, sliding window algorithms
  - Distributed rate limiting (Redis INCR atomicity)
  - **Gate 4c:** Design rate limiter for API gateway (100K req/sec)

- **Fri (Sep 06):** API Gateway + Load Balancing
  - Round-robin, least connections, consistent hashing
  - Circuit breaker, timeout, backpressure
  - **Persistent Systems Lens:** Failover strategies

- **Sat–Sun (Sep 07–08):** System Design consolidation
  - **Gate 4 (Final):** Rate Limiter + Cache + Sharding for Persistent Systems scale

**Deliverables:**
- `system_design_sharding_strategy.md` — Sharding design
- `system_design_rate_limiter.md` — Rate limiter design
- `system_design_api_gateway.md` — API gateway + LB

---

### Week 8 (Sep 09–Sep 15): System Design Phase 3 — Microservices + Distributed Consensus

**Daily Breakdown:**
- **Mon–Tue (Sep 09–10):** Microservices architecture
  - Service mesh (Istio, Linkerd)
  - Inter-service communication (gRPC, REST), async messaging (Kafka, RabbitMQ)
  - Saga pattern for distributed transactions

- **Wed–Thu (Sep 11–12):** Distributed Consensus (Raft, Paxos)
  - Leader election, log replication, split-brain recovery
  - When to use consensus (strong consistency) vs eventual consistency
  - **Persistent Systems Lens:** Financial transactions need Raft; notifications can use eventual

- **Fri (Sep 13):** Observability (Logging, Metrics, Tracing)
  - ELK stack (Elasticsearch, Logstash, Kibana)
  - Prometheus + Grafana for metrics
  - Distributed tracing (Jaeger, Zipkin)
  - **Persistent Systems Lens:** Diagnosing failures across 50+ microservices

- **Sat–Sun (Sep 14–15):** System Design comprehensive mock
  - **Gate 4 (Final, Comprehensive):** Design a Persistent Systems-scale system end-to-end
    - Requirements → Architecture → Data Model → Sharding → Caching → Rate Limiting → Failure scenarios → Observability

**Deliverables:**
- `system_design_microservices.md` — Microservices patterns
- `system_design_consensus.md` — Distributed consensus
- `system_design_observability.md` — Observability architecture
- `system_design_final_mock.md` — Full system design

---

### Week 9 (Sep 16–Sep 22): Behavioral/HR Phase 1 + Referral Activation

**Daily Breakdown:**
- **Mon–Wed (Sep 16–18):** STAR Method deep dive
  - Identify 5 past projects/challenges
  - Structure each as: Situation → Task → Action → Result
  - Extract leadership, problem-solving, learning moments
  - **Focus:** Connect to Persistent Systems (scalability, consistency, resilience)

- **Thu (Sep 19):** Elevator Pitch v1
  - "Hi, I'm Devang. I engineer AI-driven systems at scale using the BMad methodology. I'm joining Persistent Systems to architect scalable microservices with AI-powered observability."
  - 30 seconds, no filler, clear value prop

- **Fri (Sep 20):** Referral Activation — Ranjeet
  - Warm intro message
  - "Ranjeet, I'm preparing for Persistent Systems interviews. Can I chat about the technical interview format and culture fit?"
  - Schedule call for Week 10

- **Sat–Sun (Sep 21–22):** STAR story refinement + Mock prep
  - Record 30-second pitch (video)
  - Write out 3 STAR stories (2 min each)
  - Get Ranjeet's feedback on weak points

**Deliverables:**
- `behavioral_star_stories.md` — 5 STAR stories
- `behavioral_elevator_pitch.md` — Final 30-second pitch
- `referral_ranjeet_notes.md` — Ranjeet conversation notes

---

### Week 10 (Sep 23–Sep 29): Behavioral Phase 2 + First Technical Mock (Ranjeet/Mangesh)

**Daily Breakdown:**
- **Mon–Tue (Sep 23–24):** Mock preparation
  - Review System Design scenarios (2-3 typical Persistent Systems questions)
  - Practice verbalization (clear communication of trade-offs)
  - Prepare 2-3 follow-up questions to ask interviewer

- **Wed (Sep 25):** Referral Activation — Mangesh
  - "Ranjeet, can you intro me to Mangesh? I'm interested in Persistent Systems' microservices architecture and would love to learn."
  - Goal: Mock interview with Mangesh or at least technical Q&A

- **Thu (Sep 26):** First Technical Mock (Ranjeet or Mangesh)
  - **Format:** 1-hour system design interview
  - Scenario: Design a distributed notification system for 100M users
  - **Senku's Assessment:** Clarity, technical depth, trade-off articulation

- **Fri (Sep 27):** Mock Feedback & Gaps
  - Identify weak points (e.g., CAP theorem, failure modes, observability)
  - Drill those gaps over weekend

- **Sat–Sun (Sep 28–29):** Gap drills + Mock v2 prep
  - Refine weak areas
  - Second mock (with Rushikesh or Ajay if possible)

**Deliverables:**
- `mock_1_feedback.md` — Ranjeet/Mangesh feedback
- `mock_1_gaps.md` — Weak points identified
- `mock_2_prep.md` — Refined scenarios

---

### Week 11 (Sep 30–Oct 06): Final Drills + HR Practice

**Daily Breakdown:**
- **Mon–Tue (Sep 30–Oct 01):** Technical drills (gaps from Week 10 mock)
  - Raft consensus, CAP theorem, failure mode analysis
  - Observability design, distributed transactions

- **Wed–Thu (Oct 02–03):** HR Mock
  - Practice STAR stories (behavioral questions)
  - "Tell me about a time you handled a failure."
  - "How do you approach learning new technologies?"
  - Mock interviewer: Rushikesh or written Q&A

- **Fri (Oct 04):** Final System Design Mock v3
  - **Scenario:** Design a financial transaction system (strong consistency required, Persistent Systems inspired)
  - **Senku's Assessment:** Enterprise-ready?

- **Sat–Sun (Oct 05–06):** Consolidation + Confidence check
  - Review all gates (SQL, DSA, Core CS, System Design, Behavioral)
  - Build confidence narrative

**Deliverables:**
- `mock_3_feedback.md` — Final mock feedback
- `confidence_check.md` — Self-assessment readiness

---

### Week 12 (Oct 07–Oct 13): Final Prep + Interview Scheduling

**Daily Breakdown:**
- **Mon–Tue (Oct 07–08):** Interview scheduling
  - Reach out to Persistent Systems (via Mangesh if warm intro succeeded)
  - Schedule interviews (usually 3-4 rounds: DSA/System Design, Behavioral, Technical Deep Dive, Offer Discussion)

- **Wed–Thu (Oct 09–10):** Last-minute prep
  - Review company-specific patterns (Persistent Systems uses Kafka, Microservices, Cassandra)
  - Final STAR refinement
  - Sleep well

- **Fri (Oct 11):** First interview (likely System Design round)
  - Show up. Nail it. Ask good questions.

- **Sat–Sun (Oct 12–13):** Interview feedback + Next rounds
  - Debrief (what went well, what didn't)
  - Prepare for next round

**Target:** Offer from Persistent Systems or top alternative by mid-October.

---

## Key Milestones

| Milestone | Date | Gate | Status |
|-----------|------|------|--------|
| SQL Gate (20 queries cold) | Aug 04 | Gate 1 | — |
| DSA Gate (5 problems + traps) | Aug 18 | Gate 2b | — |
| Core CS Gate (OS/Networks/DBMS from scratch) | Sep 01 | Gate 3 | — |
| System Design Gate (bridge from real work + Rate Limiter/Cache/Sharding) | Sep 15 | Gate 4 | — |
| Cloud Gate (AWS/Azure basics + one deploy) — Track C | Sep 15 | Gate C | — |
| AI-Integration Gate (demo + 2 STAR stories) — Track A | Sep 29 | Gate A | — |
| Behavioral Gate (Pitch + STAR stories) | Oct 06 | Gate 5 | — |
| First Technical Mock | Sep 26 | — | — |
| Persistent Systems Interview | Oct 11 | — | — |
| Offer Target | Oct 20 | — | — |

---

## Referral Activation Timeline

- **Week 8 (Sep 06):** Message Ranjeet
- **Week 9 (Sep 20):** Call with Ranjeet, intro to Mangesh request
- **Week 10 (Sep 26):** First mock with Mangesh or technical Q&A
- **Week 11 (Oct 04):** Apply to Persistent Systems (Mangesh warm intro)
- **Week 12 (Oct 11+):** Interview rounds

---

## Success Criteria

- ✅ SQL Gate: 8/10+ queries, optimization understood
- ✅ DSA Gate: 5/5 problems, misconceptions articulated
- ✅ Core CS Gate: First-principles explanations
- ✅ System Design Gate: Enterprise-scale design end-to-end — **can frame 3 of his real projects (offline sync, config engine, IAM) in formal terms**
- ✅ AI-Integration Gate (Track A): one AI-integrated demo + 2 STAR stories; can pitch AI experience as differentiator
- ✅ Cloud Gate (Track C): AWS/Azure fundamentals + one working deploy
- ✅ Behavioral Gate: 30-sec pitch lands, STAR stories polished
- ✅ Mock Feedback: Mangesh says "enterprise-ready"
- ✅ Offer: Persistent Systems or equivalent

---

**Status:** 90-day sprint locked in. Ready to execute. ⚡🧪
