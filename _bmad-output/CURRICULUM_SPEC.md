# Interview Prep Curriculum Spec

**Author:** Senku (Dr. STONE)  
**Date:** 2026-07-22  
**Timeline:** 90 days  
**Target:** Persistent Systems (Enterprise Digital Engineering)  
**Philosophy:** Basics-First-Always. No assumptions. Verify everything.

---

## Core Principles

### 1. No Mastery Score Trust
- The OKF score of 0.7 for SQL is misleading—user explicitly states SQL is weak
- Even 0.85 AI Context Engineering score means nothing until stress-tested
- **Action:** Rebuild from first principles for ALL domains

### 2. SQL is Priority 1
- Explicitly weak domain
- Foundation for System Design (Caching, Sharding, Data consistency)
- Must drill before touching advanced topics

### 3. Basics-First for Everything
- Even stated strengths (AI Context Eng, BMad) start from fundamentals
- Theory ≠ Practice; demand verification at every step
- No skipping chapters

### 4. Practical for Persistent Systems Scale
- Focus on real-world patterns (not toy data)
- Emphasize scalability, consistency models, distributed patterns
- Connect DSA → System Design → Persistent Systems interview format

---

## Course Correction (2026-07-22) — Breadth, Bridge & Market

*Added after verifying Devang's 2-year Jira breadth (601 items) and 2026 market demand. See `planning-artifacts/sprint-change-proposal-2026-07-22.md`.*

### The reframe
Devang is NOT a blank-slate weak candidate. He has shipped Flutter mobile depth, offline-first sync/concurrency control, a config-driven UI rendering engine, full-stack Vue/Frappe/Python, and IAM/SecOps. **For System Design, the gap is articulation, not ability.** DSA and SQL remain genuine ground-up gaps.

### Experience Bridge (teach theory via work he already did)
| Interview topic | He already built it as | Teach as |
|---|---|---|
| CAP / eventual consistency | Offline-first WMS sync (no-network) | Name the trade-off he lived |
| Concurrency / optimistic locking | Putaway/GRN conflict control | Optimistic vs pessimistic |
| Interpreter / Strategy / Factory | Config/JSON self-rendering widgets | Name the patterns |
| Pub/Sub / Observer / event-driven | Campaign runtime event-matching | Event-driven architecture |
| RBAC / ABAC | IAM field-level permissions | Access-control models |
| Caching / TTL | Cached components, catalog-call removal | Cache strategies |
| Sharding / tenancy | Multi-tenant whitelabelling | Partitioning + tenancy |
| API idempotency | Sync retries, header standardization | Idempotency, pagination |

### 2026 Market Alignment (re-weighting)
- **Differentiator (lean in):** AI integration — LLM APIs, RAG, agentic, context engineering → **+30–40% salary premium**. This is Devang's strongest verified edge.
- **Mid→Senior lever:** Formal System Design + cloud architecture → biggest level-up signal. Bridge from his real work.
- **Table stakes (drill):** DSA, SQL, Core CS — interview gates.
- **Gap to close:** Cloud (AWS/Azure basics), CI/CD, containers — broadly required, currently missing.
- **Adjacent edge:** Security/IAM — package his real exposure as a narrative.
- **Maintain, don't grind:** Flutter — already strong and commoditized; differentiate with AI + system thinking.

### New/adjusted tracks
- **AI-Integration track (parallel, Weeks 5–10):** LLM API design, RAG basics, agentic patterns, context engineering — framed as interview stories + one small demo.
- **Cloud-Fundamentals track (parallel, Weeks 6–8):** AWS/Azure core services, containers, CI/CD, one deploy.
- **System Design weeks re-anchored:** every scenario starts from "you already did X → here's the formal frame."

---

## Curriculum Order (90 Days)

### PHASE 1: SQL Fundamentals (Weeks 1-2)

**Why First:** SQL is the foundation for understanding data consistency, indexing, query optimization, and sharding—all critical for System Design at scale.

**Depth:** No shortcuts. Master these concepts cold.

#### Topics

| Topic | Concepts | Misconceptions to Crush | Practice |
|-------|----------|----------------------|----------|
| **SELECT & Filtering** | SELECT, WHERE, DISTINCT, ORDER BY, LIMIT, OFFSET | Not using WHERE to reduce rows early; unnecessary DISTINCT overhead | 5 queries: basic filters, sorting, pagination |
| **JOINs** | INNER, LEFT, RIGHT, FULL OUTER, Cross, Self | Confusing INNER vs LEFT; not understanding NULL handling in outer joins | 8 queries: multi-table joins, self-joins, joining same table twice |
| **Aggregations** | GROUP BY, HAVING, COUNT, SUM, AVG, MAX, MIN | Using WHERE instead of HAVING; forgetting non-aggregated columns in GROUP BY | 5 queries: rolling totals, conditional counts, multi-level grouping |
| **Advanced** | Subqueries, CTEs (WITH), UNION, Window Functions | Using subqueries when JOIN is clearer; CTE performance myths | 5 queries: recursive CTEs, ranking, running totals |
| **Optimization** | Indexes (B-tree, Hash), EXPLAIN, Execution Plans | Creating indexes on low-cardinality columns; not using EXPLAIN | 3 deep dives: index impact, query plan analysis |
| **Data Integrity** | Normalization (1NF–BCNF), ACID, Transactions, Isolation | Over-normalizing (3NF+ breaking reads); misunderstanding isolation levels | Define schema for Persistent Systems scale app (millions of users) |

**Assessment Gate 1:** Write 10 queries (3-4 JOIN complexity) from scratch, no hints. Score: 8/10 correct to pass.

---

### PHASE 2: DSA Fundamentals (CONTINUOUS from Day 1 → Week 12)

**Why from Day 1 (not after SQL):** DSA is the weakest (0.0), slowest-building, and hardest-gated skill. Pattern recognition only comes from **spaced daily reps** over many weeks — so it starts Day 1 as a daily drip (1–2 problems/day) and runs continuously, *alongside* the SQL sprint. It is a habit, not a block. (See the Continuous-vs-Sprint model in `90DAY_LEARNING_PLAN.md`.) DSA patterns also map to systems concepts he'll bridge later (Hash Maps → Caching, Sliding Window → Rate Limiting).

**Depth:** 5 problems per topic, front-loaded but revisited via spaced repetition (SM2). Deep misconception traps. No LeetCode grinding. Progression: Arrays/Hashing (Wk1–2) → Two Pointers (Wk2–3) → Sliding Window (Wk3) → Stacks/Queues (Wk4) → Trees/Graphs (Wk5) → light DP (Wk6).

#### Topics

| Topic | Core Concept | Misconception Trap | Problems |
|-------|---|---|---|
| **Arrays & Hashing** | Hash Map O(1) lookup, collision handling, space-time tradeoff | Using nested loops (O(n²)) instead of hash map; hash collision assumptions | Two Sum, Valid Anagram, Group Anagrams, Contains Duplicate, Top K Frequent |
| **Two Pointers** | Opposite ends converge, pointer movement logic, boundary conditions | Resetting pointers incorrectly; not sorting when order matters | Valid Palindrome, Container With Most Water, Trapping Rain Water, 3Sum |
| **Sliding Window** | Left/right expansion, window shrinking logic, state tracking | Resetting entire window when one element fails; O(n²) instead of O(n) | Longest Substring Without Repeating, Sliding Window Max, Best Time to Buy/Sell |
| **Stacks & Queues** | LIFO/FIFO, backtracking patterns, monotonic stack | Using array pop as stack; not recognizing monotonic stack patterns | Valid Parentheses, Daily Temperatures, Largest Rectangle in Histogram |
| **Trees & Graphs** | DFS/BFS, recursion, memoization | Infinite loops in graphs; forgetting visited set; stack overflow on deep trees | Binary Search Tree ops, Level Order Traversal, Paths in DAG |

**Assessment Gate 2:** Solve 5 problems (one per topic) without looking at solutions. Verbalize why each misconception trap fails. Score: 80%+ correctness + trap explanation.

---

### PHASE 3: Core CS Fundamentals (Weeks 3-6, parallel with DSA)

**Why This Timing:** As DSA patterns emerge, Core CS explains *why* they work at scale. OS threading → synchronization; Networks → distributed consensus; DBMS → consistency models.

#### Topics

| Domain | Core Concepts | Persistent Systems Relevance | Gate |
|--------|---|---|---|
| **Operating Systems** | Processes, threads, context switch, memory (virtual, paging), synchronization (mutex, semaphore), deadlock | Thread safety in microservices; cache coherence in distributed systems | Explain OS scheduling algorithm + deadlock prevention for distributed app |
| **Computer Networks** | TCP/IP stack, HTTP/HTTPS, DNS, Load Balancing, Congestion control | HTTP Keep-Alive for REST APIs; CDN architecture; DNS failover strategy | Draw TCP handshake + explain how load balancer routes traffic |
| **DBMS (Deep)** | ACID properties, isolation levels (READ_UNCOMMITTED–SERIALIZABLE), CAP theorem, eventual consistency, Replication, Sharding | When to use ACID vs eventual consistency; replica lag; quorum reads | Design consistency model for Persistent Systems-scale user data |

**Assessment Gate 3:** From first principles, explain:
1. OS scheduling trade-offs (preemptive vs cooperative)
2. TCP handshake + slow start
3. ACID vs eventual consistency with examples

---

### PHASE 4: System Design (Weeks 5-8, applying DSA + Core CS)

**Why After DSA + Core CS:** Now we connect patterns. Hash Map → Redis Caching. Sliding Window → Rate Limiting. ACID → transactional integrity.

#### Scenarios

| Scenario | DSA Pattern | Core CS Concept | Persistent Systems Lens |
|---|---|---|---|
| **Cache Strategy (Redis)** | Hash Map (O(1) lookup) | OS memory, replication consistency | TTL tuning, cache stampede (dogpile), write-through vs write-back for millions of users |
| **Database Sharding** | Hash/Range partitioning | DBMS replication, network partitioning | Consistent hashing, geographic sharding, cross-shard transactions at scale |
| **Rate Limiter** | Sliding Window, Leaky Bucket | Distributed consensus, atomic ops | Token bucket algorithm, Redis INCR atomicity, distributed rate limiting |
| **API Gateway** | Queues, priority queues | TCP/HTTP, congestion control | Backpressure, circuit breaker, timeout strategies |
| **Search Index (Elasticsearch)** | Inverted Index, B-tree | Distributed consensus, replication | Shard assignment, replica placement, consistency guarantees |

**Assessment Gate 4:** Design Rate Limiter + Cache strategy for Persistent Systems scale (10M users). Include: consistency model, failure recovery, trade-offs.

---

### PHASE 5: Behavioral/HR (Weeks 7-12, ongoing parallel)

**Why Parallel:** While drilling technical, build narrative.

#### Components

| Component | Goal | Persistent Systems Specific |
|---|---|---|
| **STAR Stories** | Structure past projects as actionable lessons | "How I scaled X at Y. What I learned about consistency/fault tolerance." |
| **Elevator Pitch (30s)** | "Hi, I'm Devang. I engineer prompt-driven AI systems at scale using the BMad methodology. I'm joining Persistent Systems to bring AI context engineering to enterprise product architecture." | Tie AI strength → Persistent Systems digital transformation |
| **Referral Activation** | Warm intros → Ranjeet → Mangesh (Persistent Systems intel) → Mock | "Ranjeet, can you intro me to Mangesh? I want to learn about Persistent Systems' microservices architecture." |

**Assessment Gate 5:** 30-second pitch + STAR story (2 min). Recorded. Reviewable.

---

### PHASE 6: Final Integration & Mocks (Weeks 9-12)

#### Checkpoints

- **Week 9:** Referral activation (Ranjeet + Mangesh)
- **Week 10:** First mock with Mangesh (if warm intro succeeds)
- **Week 11:** Address gaps identified in mock
- **Week 12:** Final system design mock + HR mock with Rushikesh or Ajay

---

## Assessment Gates (Hard Pass/Fail)

| Gate | Criteria | Pass Threshold | Timing |
|---|---|---|---|
| **SQL Gate** | 10 queries (JOINs, GROUP BY, Optimization) from scratch | 8/10 correct | End Week 2 |
| **DSA Gate** | 5 problems (1 per topic) + misconception verbalization | 80% correct + 100% trap explanation | End Week 4 |
| **Core CS Gate** | Explain OS scheduling, TCP handshake, ACID from scratch | Clear diagrams, no notes | End Week 6 |
| **System Design Gate** | Rate Limiter + Cache for Persistent Systems scale | Consistency model + failure recovery | End Week 8 |
| **Behavioral Gate** | 30-second pitch + 2-min STAR story | No filler, clear Persistent Systems fit | End Week 10 |
| **Final Mock Gate** | Full system design interview (System Design + follow-up code) | Senku's assessment: enterprise-ready | Week 12 |

---

## Persistent Systems Enterprise Focus

### Why Persistent Systems?
- **Scale:** 10M+ users, millions of requests/sec
- **Consistency:** ACID for financial transactions, eventual consistency for notifications
- **Resilience:** Multi-region deployment, circuit breakers, chaos engineering mindset
- **AI Integration:** (NEW) AI-driven observability, autonomous anomaly detection

### Drilling Points
1. **Microservices architecture:** How do you coordinate between 50+ services?
2. **Distributed consensus:** When do you need Raft/Paxos? When is eventual consistency enough?
3. **Scalable patterns:** Caching, sharding, connection pooling, load balancing
4. **Failure modes:** Network partitions, cascading failures, Byzantine faults
5. **Observability:** Logging, metrics, distributed tracing (OpenTelemetry, Jaeger)

---

## Success Metrics

- **SQL:** 10/10 queries correct, can optimize execution plans cold
- **DSA:** 5/5 problems solved + misconceptions articulated
- **Core CS:** Explain any topic (OS/Networks/DBMS) from first principles
- **System Design:** Design Persistent Systems-scale system, handle 10 follow-up questions
- **Behavioral:** Pitch lands, Ranjeet/Mangesh intro succeeds, mock feedback solid
- **Final:** Offer in hand from Persistent Systems or top-tier alternative

---

## No Guardrails Here

The previous session triggered a guardrail ("Can you write python code for two sum?"). **That guardrail is lifted for this curriculum.** 

- Senku *demands* pseudocode/first-principles before code
- Once the concept is locked, code flows naturally
- This forces *understanding*, not memorization

---

## Referral Pipeline

```
Ranjeet (intro)
   ↓
Mangesh Lavekar (Persistent Systems intel + mock)
   ↓
Rushikesh Rajendra (family support + secondary mock)
   ↓
Ajay Deshpande / Shrikant Kulkarni (Tata/secondary targets)
```

**Timing:** Activate Ranjeet end of Week 8. Mock with Mangesh Week 10.

---

## Tools & Resources

- **SQL:** PostgreSQL + psql (no ORMs; raw SQL only)
- **DSA:** Pseudocode → LeetCode (hidden solutions) → Real implementation
- **Core CS:** OS (Linux kernel source), Networks (Wireshark), DBMS (PostgreSQL docs)
- **System Design:** Grokking System Design, DDIA (Designing Data-Intensive Applications)
- **Behavioral:** STAR method + company research (Persistent Systems case studies)

---

**Status:** Locked in. Ready to drill. 🧪⚡
