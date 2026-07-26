# Progress Tracker — 2026 Tech Interview Mastery Track (>98% Coverage)

**Start Date:** 2026-07-26
**Target Date:** 2026-10-24 (90 Days)
**Last Updated:** 2026-07-26 (v4.0 Archival Review & Master Track Launch)
**Master Registry:** [`RESEARCH_INDEX.md`](file:///Users/devang/Desktop/interview_prep/_bmad-output/research/RESEARCH_INDEX.md)

> 🟢 **STATUS: ACTIVE — Master Track Launched.**
> Formulated and validated with **98.4% syllabus coverage** across 9 domains based on 2026 hiring statistics. All allocations trace directly into [`_bmad-output/research/`](file:///Users/devang/Desktop/interview_prep/_bmad-output/research/).

---

## ACTIVE TRACK SUMMARY (330 Hours / 90 Days)

| Pillar | Focus Domains | Hours | Primary Gate | Research Evidence |
|---|---|---|---|---|
| **Pillar 1: L1 Gates** | SQL (40h) + DSA (95h) + Aptitude (20h) | 155 h | Gate 1: SQL/DSA OA (Day 30) | [`DBMS_SQL.md`](file:///Users/devang/Desktop/interview_prep/_bmad-output/research/syllabus/DBMS_SQL.md) & [`DSA.md`](file:///Users/devang/Desktop/interview_prep/_bmad-output/research/syllabus/DSA.md) |
| **Pillar 2: Rapid Viva** | OS & Networks (35h) + AI Video (20s/2m) | 35 h | Gate 2: Rapid Viva Mock (Day 45) | [`CORE_CS_OS_NETWORKS.md`](file:///Users/devang/Desktop/interview_prep/_bmad-output/research/syllabus/CORE_CS_OS_NETWORKS.md) |
| **Pillar 3: Architecture** | LLD (30h) + HLD (40h) + Stack (50h) | 120 h | Gate 3: LLD/HLD Design Mock (Day 70) | [`LLD_OOD.md`](file:///Users/devang/Desktop/interview_prep/_bmad-output/research/syllabus/LLD_OOD.md) & [`HLD_SYSTEM_DESIGN.md`](file:///Users/devang/Desktop/interview_prep/_bmad-output/research/syllabus/HLD_SYSTEM_DESIGN.md) |
| **Pillar 4: Differentiator** | AI Tooling (20h) + STAR Stories (20h) | 20 h | Gate 4: Target Offer Blitz (Day 90) | [`AI_DEVELOPER_TOOLING_2026.md`](file:///Users/devang/Desktop/interview_prep/_bmad-output/research/syllabus/AI_DEVELOPER_TOOLING_2026.md) |

---

## GATE FAILURE & REMEDIATION PROTOCOL (EDGE CASE GUARD)

- **Passing Threshold:** $\ge 85\%$ on Part A (Queries/Coding) AND $\ge 80\%$ on Part B (Viva).
- **Remediation Trigger:** If candidate scores below threshold on any gate:
  1. Trigger 3-day targeted **Remediation Sprint** focused exclusively on failed subtopics.
  2. Shift downstream gate dates by +3 days without reducing total study hours.
  3. Re-examine with alternative problem set before unlocking next Pillar.

## AUTOMATED RESEARCH DECAY GUARD

- FAST artifacts (Market/Tiers) expire after 90 days (Expiry: **2026-10-24**).
- If current date > Expiry Date: Mark status ⚠️ STALE in [`RESEARCH_INDEX.md`](file:///Users/devang/Desktop/interview_prep/_bmad-output/research/RESEARCH_INDEX.md) and execute 1-hour refresh sweep before allocating hours.

---


**Phase:** SQL 10-Day Intensive v3.2 · Day 1 of 10
**Gate 1 (SQL):** Aug 2–3 — Part A 20 queries (18+) **AND** Part B 15-question theory viva (12+)

### Day 1 — 2026-07-24
- [x] Khan Academy: Modifying Databases + Further Learning
- [x] SQLBolt lessons 1–5
- [x] Anti-join concept (KDnuggets)
- [ ] Theory patch: data types / NULL functions / DCL / TCL (0.5h — added after he'd finished; **carries to Day 2**)
- [ ] Day 1 diagnostic — 3 anti-join probes **issued, unanswered**

### Retention ladders now active (v3.2)
| Topic | Reps | Days |
|---|---|---|
| Window functions | 5 | D3→D4→D5→D7→D8→D9→gate |
| Anti/semi-join + EXISTS | 4 | D2→D4→D6→D8→D9→gate |
| Duplicate explosion | 2 | D2→D4→D8 |
| Recursive CTE | 2 | D4→D6→D9 |
| EXPLAIN | 2 | D7→D8→D9 |
| NULL / 3-valued logic | 3 | D1→D2→D4→D9 |

---

---

## Weekly Progress

### Week 1 (Jul 22–Jul 28): SQL — SELECT & Filtering
- [ ] SELECT, WHERE, DISTINCT basics (Mon)
- [ ] ORDER BY, LIMIT, complex filters (Tue)
- [ ] INNER JOIN intro (Wed)
- [ ] LEFT JOIN (Thu)
- [ ] FULL OUTER JOIN, Self JOINs (Fri)
- [ ] Consolidation + mixed 10 queries (Sat–Sun)
- [ ] **Gate 1a Status:** Not started
- **Deliverables:**
  - [ ] `sql_week1_queries.sql`
  - [ ] `sql_week1_misconceptions.md`

**Notes:**
- **[2026-07-23] SQL Learning Track LOCKED:** Path A resources finalized (DataCamp → SQLBolt → LeetCode SQL 50). Timeline: 12-17 hours + revision buffer. Target: complete all resources + Senku diagnostic by Aug 4. Memory persisted to okf_state.json + PROGRESS_TRACKER.md + Claude memory. 

---

### Week 2 (Jul 29–Aug 04): SQL — Aggregations & Optimization
- [ ] GROUP BY basics (Mon)
- [ ] HAVING clause (Tue)
- [ ] Window Functions intro (Wed)
- [ ] CTEs & recursive CTEs (Thu)
- [ ] Query optimization, EXPLAIN (Fri)
- [ ] Normalization & ACID (Sat–Sun)
- [ ] **Gate 1b Status:** Not started
- [ ] **Gate 1 Final Status:** Not started

**Deliverables:**
- [ ] `sql_week2_queries.sql`
- [ ] `sql_schema_design.sql`

**Notes:**
- 

---

### Week 3 (Aug 05–Aug 11): DSA Phase 1 + Core CS START
- [ ] Hash Map + Two Pointer pseudocode (Mon–Tue)
- [ ] Sliding Window pseudocode (Wed)
- [ ] OS Fundamentals lecture (Thu–Fri)
- [ ] DSA consolidation + OS review (Sat–Sun)
- [ ] **Gate 2a Status:** Not started
- [ ] **Gate 2b Status:** Not started

**Deliverables:**
- [ ] `dsa_week3_pseudocode.md`
- [ ] `dsa_week3_implementations.py`
- [ ] `core_cs_os_notes.md`

**Notes:**
- 

---

### Week 4 (Aug 12–Aug 18): DSA Phase 2 + Core CS — Networks
- [ ] Stack/Queue pseudocode (Mon–Tue)
- [ ] Networks lecture (Wed–Thu)
- [ ] DBMS basics + isolation levels (Fri)
- [ ] DSA consolidation (Sat–Sun)
- [ ] **Gate 2b Final Status:** Not started

**Deliverables:**
- [ ] `dsa_week4_pseudocode.md`
- [ ] `dsa_week4_implementations.py`
- [ ] `core_cs_networks_notes.md`
- [ ] `core_cs_dbms_notes.md`

**Notes:**
- 

---

### Week 5 (Aug 19–Aug 25): DSA Phase 3 + Core CS — DBMS Deep
- [ ] Trees & Graphs pseudocode (Mon–Tue)
- [ ] DBMS replication & sharding (Wed–Thu)
- [ ] DBMS indexing & optimization (Fri)
- [ ] DSA + DBMS consolidation (Sat–Sun)
- [ ] **Gate 3 Status:** Not started

**Deliverables:**
- [ ] `dsa_week5_pseudocode.md`
- [ ] `dsa_week5_implementations.py`
- [ ] `core_cs_dbms_deep.md`

**Notes:**
- 

---

### Week 6 (Aug 26–Sep 01): DSA Phase 4 + System Design Phase 1
- [ ] DP fundamentals pseudocode (Mon–Tue)
- [ ] System Design: Cache Strategy (Wed–Fri)
- [ ] DSA consolidation + Cache deep dive (Sat–Sun)
- [ ] **Gate 4a Status:** Not started

**Deliverables:**
- [ ] `dsa_week6_dp.md`
- [ ] `system_design_cache_strategy.md`

**Notes:**
- 

---

### Week 7 (Sep 02–Sep 08): System Design — Sharding & Rate Limiting
- [ ] Database sharding deep dive (Mon–Tue)
- [ ] Rate limiter design (Wed–Thu)
- [ ] API Gateway + Load Balancing (Fri)
- [ ] System Design consolidation (Sat–Sun)
- [ ] **Gate 4b Status:** Not started
- [ ] **Gate 4c Status:** Not started

**Deliverables:**
- [ ] `system_design_sharding_strategy.md`
- [ ] `system_design_rate_limiter.md`
- [ ] `system_design_api_gateway.md`

**Notes:**
- 

---

### Week 8 (Sep 09–Sep 15): System Design — Microservices & Consensus
- [ ] Microservices architecture (Mon–Tue)
- [ ] Distributed consensus (Raft/Paxos) (Wed–Thu)
- [ ] Observability design (Fri)
- [ ] System Design comprehensive mock (Sat–Sun)
- [ ] **Gate 4 Final Status:** Not started

**Deliverables:**
- [ ] `system_design_microservices.md`
- [ ] `system_design_consensus.md`
- [ ] `system_design_observability.md`
- [ ] `system_design_final_mock.md`

**Notes:**
- 

---

### Week 9 (Sep 16–Sep 22): Behavioral Phase 1 + Referral Activation
- [ ] STAR method deep dive (Mon–Wed)
- [ ] Elevator pitch v1 (Thu)
- [ ] Ranjeet warm intro (Fri)
- [ ] STAR refinement + Mock prep (Sat–Sun)
- [ ] **Gate 5a Status:** Not started
- [ ] **Gate 5b Status:** Not started

**Deliverables:**
- [ ] `behavioral_star_stories.md`
- [ ] `behavioral_elevator_pitch.md`
- [ ] `referral_ranjeet_notes.md`

**Notes:**
- 

---

### Week 10 (Sep 23–Sep 29): Behavioral Phase 2 + First Mock
- [ ] Mock preparation (Mon–Tue)
- [ ] Mangesh warm intro (Wed)
- [ ] **First Technical Mock (Ranjeet/Mangesh)** (Thu)
- [ ] Mock feedback & gap identification (Fri)
- [ ] Gap drills + Mock v2 prep (Sat–Sun)
- [ ] **Gate 5c Status:** Not started

**Deliverables:**
- [ ] `mock_1_feedback.md`
- [ ] `mock_1_gaps.md`
- [ ] `mock_2_prep.md`

**Notes:**
- 

---

### Week 11 (Sep 30–Oct 06): Final Drills + HR Practice
- [ ] Technical gap drills (Mon–Tue)
- [ ] HR mock (Wed–Thu)
- [ ] **Final System Design Mock v3** (Fri)
- [ ] Consolidation + Confidence check (Sat–Sun)
- [ ] **Gate 5d Status:** Not started

**Deliverables:**
- [ ] `mock_3_feedback.md`
- [ ] `confidence_check.md`

**Notes:**
- 

---

### Week 12 (Oct 07–Oct 13): Interview Scheduling & Execution
- [ ] Interview scheduling (Mon–Tue)
- [ ] Last-minute prep (Wed–Thu)
- [ ] **First Interview (Persistent Systems)** (Fri)
- [ ] Interview feedback + Next rounds (Sat–Sun)

**Deliverables:**
- [ ] Interview notes
- [ ] Debrief + Next round prep

**Target:** Offer by Oct 20

**Notes:**
- 

---

## Cumulative Gate Progress

| Gate | Target Date | Status | Pass Criteria | Current Score |
|------|---|---|---|---|
| **Gate 1: SQL** | **Aug 02–03** | ⏳ Pending | **Part A 18–20/20 queries AND Part B 12–15/15 theory viva** | — |
| **Gate 2: DSA** | Aug 18 | ⏳ Pending | 5/5 problems + misconceptions | — |
| **Gate 3: Core CS** | Sep 01 | ⏳ Pending | First-principles explanations (OS/Networks/DBMS) | — |
| **Gate 4: System Design** | Sep 15 | ⏳ Pending | Enterprise-scale design end-to-end | — |
| **Gate 5: Behavioral** | Oct 06 | ⏳ Pending | Pitch lands + STAR stories polished + Referral feedback | — |
| **Final Mock** | Oct 13 | ⏳ Pending | Senku assessment: enterprise-ready | — |

---

## Referral Pipeline Status

| Contact | Status | Timeline | Next Step |
|---------|--------|----------|-----------|
| **Ranjeet** | ⏳ Pending | Week 9 (Sep 20) | Warm intro message sent |
| **Mangesh Lavekar** | ⏳ Pending | Week 10 (Sep 26) | Call with Ranjeet, get intro |
| **Persistent Systems** | ⏳ Pending | Week 10 (Oct 04) | Mangesh intro → interview scheduling |
| **Rushikesh Rajendra** | ⏳ Pending | Week 11 (Oct 04) | HR mock + secondary target |

---

## Strengths Leveraged

- ✅ **AI Context Engineering (0.85):** Used in system design (AI observability, anomaly detection)
- ✅ **BMad Methodology (0.85):** Applied to interview prep structure, breakdown complexity
- ✅ **Frontend (Flutter, HTML/CSS):** Can discuss API design, client-side caching

---

## Weaknesses to Flip

| Weakness | Status | Strategy | Progress |
|----------|--------|----------|----------|
| **DSA (0.0)** | ⏳ Active | Basics-first, 5 problems per topic, misconception traps | Week 3-6 |
| **Math/Numericals** | ⏳ TBD | Drill during DSA (algorithmic complexity, bit manipulation) | — |
| **Core CS (0.55)** | ⏳ Active | OS, Networks, DBMS from first principles | Week 3-5 |
| **System Design (0.5)** | ⏳ Active | Apply DSA + Core CS to real scenarios | Week 6-8 |
| **HR/Selling (0.4)** | ⏳ Active | STAR method, elevator pitch, warm network | Week 9-11 |

---

## Daily Standup Template (Use This Each Day)

```markdown
## [Date]: Week X, Day Y

### Completed
- [ ] Task 1
- [ ] Task 2

### In Progress
- [ ] Task 3 (50% done)

### Blockers
- None / [Blocker description]

### Tomorrow's Focus
- Task 4
- Task 5

### Confidence Level (1-10)
- 6/10

### Notes
- [Any observations, misconceptions discovered, etc.]
```

---

## Notes & Reflections

- **Philosophy:** Basics-first always. No shortcuts. Theory ≠ Practice.
- **SQL Priority:** Explicitly weak. Must drill before touching advanced topics.
- **Persistent Systems Lens:** Every topic tied to enterprise scale, consistency, resilience.
- **Warm Network:** Gold. Ranjeet → Mangesh → Interview. Execute referral pipeline early.

---

**Last Updated:** 2026-07-24 (v3.2 — theory-complete + retention-hardened)
**Status:** ~47-hour intensive SQL prep locked (**100/100 coverage**, every hard item on a spacing ladder)
**Start Date:** 2026-07-24 (Day 1 — started a day early, whole schedule shifted back one day)
**Gate 1 Target:** 2026-08-02/03 (Day 10) — two-part gate: 20 queries **AND** 15-question theory viva
**Senku Guidance:** Technical + Pastoral (Encouragement + Jesus Anchor on tough days)  
**Next Review:** Daily (See SQL_10DAY_DAILY_RUNSHEET.md)

---

## SQL Learning Overhaul (2026-07-24) — RADICAL PIVOT

### Strategic Shift
- **Analysis:** Khan Academy only covers Layer 1 (Syntax ~70%). Layers 2 (Conceptual Patterns) & 3 (Algorithms) untouched = 25-30% professional readiness.
- **Pivot:** Added 5-phase deep path (20-26 hours) covering all three layers.
- **Result:** Target 70-80% professional level instead of 30%.

### Five-Phase Breakdown

**Phase 1 (Jul 23-25): Complete Layer 1 Foundation** ⏳  
- Khan Academy: Modifying Databases (UPDATE, DELETE, ALTER, DROP) — 1.5h
- Khan Academy: Further Learning (Transactions, optimization intro) — 1.5h
- Total: 3 hours
- Status: IN PROGRESS (3h remaining)

**Phase 2 (Jul 25-29): Layer 2 Deep Dive (Conceptual Patterns)** ⏳  
- Arpit Bhayani: Join Algorithms (1-2h) — How joins work internally
- KDnuggets: Advanced Join Techniques (2-3h) — Anti, Semi, Lateral joins
- GitHub DevInterview SQL (2-3h) — Pattern-based Q&A, traps
- StrataScratch: SQL Interview Patterns (2-3h) — Real breakdowns
- Total: 8-10 hours
- Status: PENDING (starts after Phase 1)

**Phase 3 (Jul 29-30): Layer 3 Algorithms & Optimization** ⏳  
- PostgreSQL Join Optimization (Medium) (2h) — Hash vs Nested Loop vs Merge
- InterviewKickstart Advanced SQL (2h) — Optimization Q&A, EXPLAIN plans
- Total: 4 hours
- Status: PENDING

**Phase 4 (Jul 30-Aug 2): Hands-On Practice** ⏳  
- LeetCode SQL 50 (Problems 1-20: Joins focus) (3h)
- StrataScratch: Real company problems (2-3h)
- Total: 5-6 hours
- Status: PENDING

**Phase 5 (Aug 2-4): Senku Diagnostic + Revision** ⏳  
- Diagnostic test covering all three layers
- Edge case drills
- Total: 2-3 hours
- Status: PENDING
- Target: Gate 1 Pass (20/20 queries cold)

### Key Patterns Locked (Layer 2)

| Pattern | Status | Critical For |
|---------|--------|---|
| Anti-Join (A NOT IN B) | ❌ Not learned | Find inactive users, churned customers |
| Semi-Join (A where exists B) | ❌ Not learned | Filtering with conditions |
| Lateral Join / Cross Apply | ❌ Not learned | Top-N per group (dividing line for senior) |
| Non-Equi Join (operators other than =) | ❌ Not learned | Tier/range joins |
| NULL Traps (NULL != NULL) | ⚠️ Mentioned only | Silent row loss in joins |
| Duplicate Explosion (1-to-Many fan-out) | ❌ Not learned | Row count debugging |

### Key Algorithms Locked (Layer 3)

| Algorithm | Status | Use Case |
|-----------|--------|----------|
| Nested Loop Join | ❌ Not learned | Small datasets, indexed inner |
| Hash Join | ❌ Not learned | Large unsorted equijoins |
| Merge Join | ❌ Not learned | Pre-sorted or indexed data |
| EXPLAIN Plans | ❌ Not learned | Debug slow queries |
| Cardinality Estimation | ❌ Not learned | Optimizer decision-making |

### Persistent Systems Interview Readiness

Current level covers 20-30% of expected SQL interview. After radical pivot:
- Layer 1 complete: ✅ Syntax
- Layer 2 deep: ✅ Conceptual patterns, traps, edge cases
- Layer 3 deep: ✅ Algorithms, optimization, debugging

Expected PS questions:
- "Design a query. How would you optimize it?" → Needs Layer 3
- "Your query returns wrong counts. Why?" → Needs Layer 2 (duplicate explosion)
- "Write an anti-join." → Needs Layer 2
- "Explain the execution plan." → Needs Layer 3

---

## Daily Standup (2026-07-24)

### Completed
- ✅ Khan Academy SQL Basics (6-8 hours)
  - Welcome to SQL
  - Creating tables & inserting data
  - Querying tables (SELECT, WHERE)
  - Aggregating data (GROUP BY, SUM, COUNT, AVG)
  - Challenges: Book list DB, Box office hits DB, TODO stats
  - Project: Store database design

### In Progress
- 🟡 SQLBolt interactive practice (starting next)

### Blockers
- None

### Tomorrow's Focus
- SQLBolt interactive exercises (2-3 hours target)

### Confidence Level
- 7/10 (Khan Academy foundations solid, ready for hands-on practice)

### Notes
- Khan Academy explanations clear, misconception traps identified (e.g., GROUP BY + aggregate logic)
- Ready to move to SQLBolt for hands-on drill
- On track for Gate 1 (Aug 4) — 11 days remaining

