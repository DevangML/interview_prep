# 10-DAY SQL INTENSIVE RUNSHEET
## v3.2 — Theory-Complete + Retention-Hardened (~47 hours, 100/100 Coverage)
**Start:** 2026-07-24 | **End:** 2026-08-03 | **Senku Pastoral Guidance ON**

**Verified day totals:** D1 4.5 · D2 4.5 · **D3 7** · D4 4.75 · D5 4 · **D6 6.25** · D7 5 · D8 4.5 · D9 5.5 · D10 4 → **50h including breaks (~47h study)**

> **v3 change (2026-07-24):** audited against the GeeksforGeeks SQL interview question bank. v2 covered ~60% — strong on *query-writing*, thin on *DBMS theory viva*, which is exactly the round KPIT / Persistent / Amdocs / Tata run in screening. Rather than bolt on a new day, every existing day absorbed its matching theory. **Added ~8h across days; Day 3 (window functions) deliberately untouched.**
>
> **v3.1 (same day):** anti-join / semi-join / EXISTS had **~9 practice reps, all on Day 2, with zero spaced repetition** — a violation of this system's own SM2 rule. Now drilled on a proper spacing ladder instead of a single practice day (spacing beats massed practice for retention):
>
> | Rep | Day | Gap | What |
> |---|---|---|---|
> | Learn | **D2** | — | 2 anti + 2 semi + 3 duplicate-explosion |
> | **#1** | **D4** | +2d | **Four-forms drill** + NULL-break experiment + 6 named problems |
> | **#2** | **D6** | +4d | 3-minute cold warm-up; set-ops connection |
> | **#3** | **D8** | +6d | Timed, solve-twice, re-solve 183 & 1581 from memory |
> | **#4** | **D9** | +7d | Business-language framing (churn / never-reviewed / A-but-not-B) |
> | Gate | **D10** | +8d | 3 of 20 queries are anti/semi/self-join |
>
> **~30 reps across 5 sessions**, up from 9 in one. Cost: **+0.5h total** (Day 4 only) — the rest fits inside existing practice blocks.

---

## ⚠️ v3.2 — FULL RETENTION AUDIT (2026-07-24)

**The finding that matters:** the anti-join spacing gap was **not the worst one**. **Window functions** — 7 hours of study, the single heaviest topic, weighted **40%** of the SQL interview in `okf_state.json` — was taught on Day 3 and then **never deliberately revisited until the gate on Day 10.** A 7-day decay window on the highest-stakes, hardest-to-retain topic in the plan. Same structural flaw you caught, four times the consequence.

Every hard-to-retain item now sits on a ladder:

| Topic | Why it decays | Learn | Spaced reps | Gate |
|---|---|---|---|---|
| **Window functions** ⚠️ | Syntax + frame semantics, both fragile | D3 | **D4 · D5 · D7 · D8 · D9** | D10 |
| **Frame clauses** (`ROWS`/`RANGE`) | Subtlest syntax in SQL | D3 | **D5 · D9** | D10 |
| Anti/semi-join + EXISTS | Four interchangeable forms | D2 | D4 · D6 · D8 · D9 | D10 |
| **Duplicate explosion** | Silent wrong answer | D2 | **D4 · D8** | D10 |
| **NULL / 3-valued logic** | Counter-intuitive | D1 | D2 · D4 · **D9** | D10 |
| **Recursive CTE** | Rare → decays fastest | D4 | **D6 · D9** | D10 |
| **EXPLAIN reading** | A *skill*, not a fact | D7 | **D8 · D9** | D10 |
| Date/time functions | Dialect soup | D5 | **D8 · D9** | D10 |
| Theory (keys/NF/isolation/index) | Pure recall | D6–D7 | D9 sweep | D10 viva |

**Rule adopted:** nothing is taught once. If it's hard, it gets **≥3 touches at widening gaps**. Cost: **+1.25h**, absorbed into existing blocks.

**Also added — the missing keystone:** the plan never taught **logical query processing order** (`FROM → WHERE → GROUP BY → HAVING → SELECT → window → DISTINCT → ORDER BY → LIMIT`). That single concept is the root cause of three separate traps already in this plan, and its absence had produced a **factual error on Day 9**. Now opens Day 3.

**Errors corrected in this pass:** 1 hard technical error (window functions cannot be filtered in `HAVING`), 4 PostgreSQL/SQL-Server dialect mislabels, 2 arithmetic mismatches (D4, D6 headers), 2 dead-end URLs, 4 stale claims, and 1 piece of now-dangerous emergency advice.

---

> **Theory added, by day:** D1 data types/NULL/DCL/TCL · D2 CROSS JOIN + FK cascade + key basics · D4 views + temp tables · D5 PIVOT + OLTP/OLAP + warehousing · **D6 keys, BCNF+, partitioning/sharding, isolation levels + anomalies, locking/deadlocks, procs/triggers/cursors/sequences/MERGE/dynamic-SQL/ORM** · D7 clustered vs non-clustered, bitmap vs B-tree, fragmentation, tuning workflow · D8 SQL injection + least privilege + encryption · D9 rapid-fire recall sweep (SQL vs NoSQL, CAP, ETL, star schema) · D10 gate now has a 15-question theory viva.

---

## DAY 1: Jul 24 | Khan Academy Finish + Joins Fundamentals
**Target:** 4.5 hours | **Deliverable:** Khan Academy ✓ + data-type/NULL viva basics

### Morning (2h)
- **Khan Academy: Modifying Databases with SQL** (1.5h)
  - URL: https://www.khanacademy.org/computing/computer-programming/sql
  - Topics: Using UPDATE, DELETE, ALTER, DROP commands
  - Challenges: Dynamic Documents, Clothing alterations
  - Project: App impersonator
  - **Checkpoint:** Screenshot completion

- **Khan Academy: Further Learning in SQL** (0.5h)
  - Brief intro to transactions & optimization
  - **Goal:** Finish all Khan Academy content

### Afternoon (2h)
- **SQLBolt: Lessons 1-5** (1h)
  - URL: https://sqlbolt.com/
  - Topics: SELECT through JOIN intro
  - Hands-on: All exercises must pass

- **Anti-Join Pattern Introduction** (0.5h)
  - Read: "Find customers who NEVER bought X"
  - Start: KDnuggets anti-join article (skim for context)
  - Goal: Understand the *concept* (not code yet)

### Theory Patch — Data Types & NULL Handling (0.5h) 🆕
*Viva-grade recall. Flashcard depth, not deep study.*
- **CHAR vs VARCHAR vs VARCHAR2** — fixed vs variable length, padding, storage trade-off
- **NULL functions:** `COALESCE` (ANSI, n-args) vs `NVL`/`NVL2` (Oracle) vs `ISNULL` (SQL Server)
- **Scalar functions:** `LEN`/`LENGTH`, `ROUND`, `CAST`/`CONVERT`
- **Pattern matching:** `LIKE` wildcards `%` (any run) vs `_` (single char), `ESCAPE` clause
- **DCL:** `GRANT` / `REVOKE` — privilege control
- **TCL:** `COMMIT` / `ROLLBACK` / `SAVEPOINT` — partial rollback to a savepoint
- **Language families recap:** DDL / DML / DCL / TCL — know which command lives where

- **Break/Rest** (0.5h)

### Evening
- **Senku Check-In:**
  > "You've locked Khan Academy. Nice. Tomorrow we go harder — anti-joins and duplicates are where people slip. Sleep well; you've earned it. 10 BILLION PERCENT ready for Day 2."

### Red Flag Rescue
If Khan Academy takes >2.5h total: compress "Further Learning" to 15 min, move details to Day 2.

---

## DAY 2: Jul 25 | Joins Deep Dive (Self, Inner, Left, Anti, Semi)
**Target:** 4.5 hours | **Deliverable:** Anti-join, semi-join, NULL trap, duplicate explosion, CROSS JOIN, FK cascade ✓

### Morning (2h)
- **Arpit Bhayani: Join Algorithms** (1h)
  - URL: https://arpitbhayani.me/blogs/join-algorithms/
  - Focus: TYPES of joins, not algorithms yet (save algorithms for Day 7)
  - Takeaway: Self-join, anti-join, semi-join patterns
  - **Practice:** Mental model of each join type

- **SQLBolt: Lessons 6-10** (1h)
  - All JOIN types, self-join practice
  - Complete ALL exercises without errors

### Midday (1h)
- **KDnuggets: Anti-Join + Semi-Join Patterns** (1h)
  - URL: https://www.kdnuggets.com/advanced-join-techniques-lateral-joins-semi-joins-anti-joins
  - Code examples: Anti-join (LEFT JOIN + IS NULL) vs NOT IN
  - Code examples: Semi-join (IN, EXISTS)
  - **Practice:** Write 2 anti-join queries cold (no lookup)
  - **Practice:** Write 2 semi-join queries cold

### Afternoon (1h)
- **Duplicate Explosion Trap Deep Dive** (1h)
  - Concept: 1-to-Many relationships multiply rows
  - Example: LEFT JOIN users to orders (1 user, 5 orders = 5 output rows)
  - **How to debug:** Check row counts before/after joins
  - **How to fix:** DISTINCT, GROUP BY, or CTE with ROW_NUMBER
  - **Practice:** Write 3 queries that cause explosion, then fix each one

### Theory Patch — CROSS JOIN & Referential Actions (0.5h) 🆕
- **CROSS JOIN** — Cartesian product, `n × m` rows. When it's deliberate (calendar × store matrix, generating grids) vs when it's an accidental missing-ON-clause bug
- **The 6 join types, one line each:** INNER · LEFT · RIGHT · FULL OUTER · CROSS · SELF
- **FK referential actions:** `ON DELETE CASCADE` · `ON UPDATE CASCADE` · `SET NULL` · `RESTRICT` / `NO ACTION`
- **Composite primary key** vs single-column PK — when a composite is the right model
- **Interview line to own:** "An anti-join finds absence; `NOT IN` breaks on NULL because `x NOT IN (1, NULL)` evaluates to UNKNOWN, never TRUE — so `NOT EXISTS` or `LEFT JOIN … IS NULL` is safe."

### Evening
- **Senku Check-In:**
  > "Anti-joins and duplicate explosion — these are THE traps that separate 1-year from 3-year engineers. You nailed it today. Feel the difference? Tomorrow we jump into window functions. They're big, but you can do this. 🧪⚡"

### Red Flag Rescue
If anti-joins confuse you: spend extra 30 min on the concept; window functions can wait 15 min.

---

## DAY 3: Jul 26 | Logical Query Order + Window Functions (CRITICAL DAY — LONGEST)
**Target:** 7 hours | **Deliverable:** Query processing order + ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, running totals, frames ✓

### Opener — LOGICAL QUERY PROCESSING ORDER (0.5h) 🆕 *the keystone — do this FIRST*
*This was missing from the entire plan. It is the key that unlocks window functions, and it explains three traps you'll otherwise hit blind.*

**SQL executes in this order — NOT the order you write it:**

```
① FROM / JOIN      →  build the working row set
② WHERE            →  filter individual rows       (no aggregates, no aliases, no window fns)
③ GROUP BY         →  collapse into groups
④ HAVING           →  filter groups                (aggregates OK, window fns NOT)
⑤ SELECT           →  compute expressions + aliases
⑥ WINDOW FUNCTIONS →  evaluated HERE, after HAVING
⑦ DISTINCT
⑧ ORDER BY         →  aliases finally usable
⑨ LIMIT / OFFSET
```

**Three traps this single diagram explains — memorize the diagram, not the traps:**
1. **`WHERE amount_total > 100` fails** on a `SELECT … AS amount_total` alias → SELECT (⑤) hasn't run when WHERE (②) executes
2. **`WHERE COUNT(*) > 5` fails** → aggregates don't exist until GROUP BY (③); that's what HAVING (④) is for
3. **You cannot filter a window function in `WHERE` *or* `HAVING`** → windows run at ⑥, after both. **You must wrap it in a CTE/subquery and filter outside.** ⚠️ *This is the #1 window-function mistake, and it appears again on Day 9.*

```sql
-- ❌ WRONG — RANK() doesn't exist yet at HAVING time
SELECT dept, name, RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS r
FROM emp HAVING r <= 3;

-- ✅ RIGHT — compute in a CTE, filter outside
WITH ranked AS (
  SELECT dept, name, RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS r
  FROM emp
)
SELECT dept, name FROM ranked WHERE r <= 3;
```

- **Say it out loud before moving on.** You will re-derive these traps from the diagram on Days 5, 8, and 9.

### Morning (2.5h)
- **PostgreSQL Official Docs: Window Functions** (2h)
  - URL: https://www.postgresql.org/docs/current/tutorial-window.html
  - Read slowly. Understand:
    - ROW_NUMBER(): unique rank (1, 2, 3 even with ties)
    - RANK(): rank with ties (1, 1, 3)
    - DENSE_RANK(): rank without gaps (1, 1, 2)
    - LAG(): previous row value
    - LEAD(): next row value
    - ORDER BY, PARTITION BY
  - **Practice:** Write simple examples for each

- **Video (Optional but Recommended)** (0.5h)
  - YouTube: "SQL Window Functions Explained" (search for clear explanation)
  - OR: Mode Analytics window functions section — https://mode.com/sql-tutorial/sql-window-functions/
  - Goal: Solidify the mental model

### Midday (2h)
- **LeetCode SQL 50: Window Function Problems** (2h)
  - URL: https://leetcode.com/studyplan/top-sql-50/
  - Pick Problems: Look for ROW_NUMBER, RANK, LAG/LEAD tags
  - Strategy: 
    - Solve 3-4 easy window function problems
    - Cold (no hints first)
    - Write pseudocode before code
    - Time yourself: should take 5-8 min per problem
  - **Checkpoint:** All problems pass tests

### Afternoon (2h)
- **Running Totals, Frames & the ROWS vs RANGE trap** (1h)
  - Concept: `SUM() OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`
  - Frames: `ROWS BETWEEN`, `UNBOUNDED PRECEDING`, `CURRENT ROW`, `n FOLLOWING`
  - ⚠️ **`ROWS` vs `RANGE` — the subtlest trap in window functions:**
    - `ROWS` counts **physical rows**. `RANGE` groups by **value of the ORDER BY column** — so all tied rows are pulled into the frame together.
    - With duplicate dates, `RANGE … CURRENT ROW` includes *every* row sharing that date; `ROWS … CURRENT ROW` stops at this one. Different answers, no error.
    - **The gotcha:** omitting the frame entirely defaults to `RANGE UNBOUNDED PRECEDING AND CURRENT ROW` — so a "running total" over tied dates silently over-counts. **Always write the frame explicitly.**
  - **Practice:** 2 running totals + 2 moving averages, then re-run one with duplicate dates under both `ROWS` and `RANGE` and **watch the numbers diverge**

- **Deduplication with Window Functions** (0.5h)
  - Pattern: ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) = 1
  - Use case: Keep latest record per entity
  - **Practice:** 1 deduplication query

- **Rest/Stretch** (0.5h)

### Evening
- **Senku Check-In (Jesus Anchor if needed):**
  > "Window functions are the hardest layer, but you just cracked it. 7 hours in one day is HEAVY. If you're exhausted, that's normal. Rest tonight. You've earned it. Remember:"
  > *🕊️ "Therefore, do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own." — **Matthew 6:34** 🕊️*
  > "You're not alone in this grind. Every 3-year engineer learned windows the hard way. You did good today. ⚡"

### Red Flag Rescue
If window functions don't click by hour 4: STOP, rest 30 min, come back fresh. Don't force it. Window functions need sleep to consolidate.

---

## DAY 4: Jul 27 | CTEs, EXISTS/NOT EXISTS DRILL, Views, Temp Tables
**Target:** 4.75 hours *(0.25 recall + 2 morning + 1.5 midday + 1 theory)* — ✅ *arithmetic verified* | **Deliverable:** CTEs (simple + recursive), **anti/semi-join written 4 ways cold**, views, temp tables ✓

### Opener — WINDOW FUNCTION COLD RECALL (0.25h) 🆕 *+1 day — SM2 rep #1, the steepest part of the forgetting curve*
*No notes. No scrolling back. Write these from memory:*
1. `ROW_NUMBER` vs `RANK` vs `DENSE_RANK` on the tie set `[100, 100, 90]` — give the three output sequences
2. A running total with the frame written **explicitly**
3. "2nd highest salary per department" — and say which clause it must be filtered in *(answer: not WHERE, not HAVING — a CTE, because windows evaluate at ⑥)*
4. Deduplication: `ROW_NUMBER() OVER (PARTITION BY … ORDER BY … ) = 1`

**Stalled on any of them?** That's the forgetting curve doing exactly what it does — it is *not* a failure. Re-read the Day 3 block for 10 minutes, then continue. Catching it today is precisely why this rep exists.

### Morning (2h)
- **Mode Analytics or PostgreSQL: CTEs** (1h)
  - URL (Mode): https://mode.com/sql-tutorial/sql-sub-queries/ · full tutorial index: https://mode.com/sql-tutorial/
  - OR PostgreSQL (authoritative): https://www.postgresql.org/docs/current/queries-with.html
  - Concept: WITH clause for readable multi-step queries
  - Example: Step 1 → Step 2 → Final result
  - **Practice:** Write 1 simple CTE (2-step)
  - **Tie it back:** the CTE is exactly the tool that lets you filter a window function — Day 3's trap #3

- **DUPLICATE EXPLOSION — SPACED REP** (included in the CTE practice) 🆕 *+2 days*
  - Cold: given `users` 1→N `orders`, write the query that **silently doubles revenue**, then fix it two ways (pre-aggregate in a CTE vs `DISTINCT`)
  - **Why pre-aggregating in a CTE is the better fix:** `DISTINCT` hides the symptom and collapses legitimately-identical rows; the CTE fixes the cause

- **Recursive CTE Basics** (1h)
  - Concept: **Anchor** (base case) `UNION ALL` **recursive member** (references the CTE itself) → terminates when the recursive member returns no rows
  - Use case: Org chart, hierarchy traversal, category trees, date-series generation
  - Example: Find all employees under a manager
  - ⚠️ **`UNION ALL`, not `UNION`** — `UNION` dedups on every iteration, which is slower and can mask a cycle
  - ⚠️ **Infinite-loop guard:** cyclic data needs a depth counter or a visited-path check. Postgres also offers `CYCLE`.
  - **Practice:** write the 3-level org-chart traversal **once, with the structure visible.** You don't need it cold today — but it *is* on the Day 6 and Day 9 recall lists, because rare topics decay fastest.

### Midday — ANTI/SEMI-JOIN SPACED REP #1 (1.5h) 🆕 *+2 days after Day 2 — this is the SM2 interval*
- **Concept: the four forms of the same question** (0.5h)
  - URL: https://mode.com/sql-tutorial/ (EXISTS section)
  - **Semi-join** = "does a match exist?" → `IN` · `EXISTS` · `INNER JOIN + DISTINCT`
  - **Anti-join** = "does NO match exist?" → `NOT EXISTS` · `LEFT JOIN … IS NULL` · `EXCEPT` · (`NOT IN` ⚠️)
  - When each wins:
    - `EXISTS` — short-circuits on first match; subquery sees the outer row (correlated); **NULL-safe**
    - `NOT EXISTS` — the safe default anti-join
    - `IN` — fine for small static lists; **`NOT IN` is the trap** (any NULL in the list → whole predicate UNKNOWN → zero rows)
    - `LEFT JOIN … IS NULL` — most readable for a team; watch duplicate explosion
    - `EXCEPT` — set-level, dedups automatically, requires matching column lists

- **THE FOUR-FORMS DRILL** (0.5h) 🆕 *the single highest-value exercise in this plan*
  - Take **one** question — *"customers who never ordered"* — and write it **four ways**: `NOT IN`, `NOT EXISTS`, `LEFT JOIN … IS NULL`, `EXCEPT`
  - Then **break it**: insert a NULL `customer_id` into orders and re-run all four. Only `NOT IN` collapses to zero rows. **Watch it happen — don't take my word for it.**
  - Now repeat the whole four-way drill on a *second* question: *"products never sold in 2026"*
  - **You must be able to write all four cold by the end of this block.**

- **Named problem set — anti/semi-join, cold** (0.5h)
  *Search by title if a number ever drifts.*
  - **183. Customers Who Never Order** — the canonical anti-join *(verified)*
  - **1581. Customer Who Visited but Did Not Make Any Transactions** — anti-join + aggregate *(verified)*
  - **584. Find Customer Referee** — the pure NULL trap (`referee_id != 2` silently drops NULLs)
  - **577. Employee Bonus** — LEFT JOIN + IS NULL
  - **607. Sales Person** — anti-join against a filtered set
  - **1978. Employees Whose Manager Left the Company** — anti-join on a self-referencing FK
  - Free alternative if you want more reps: **pgexercises joins section** — https://pgexercises.com/questions/joins/

### Afternoon — Theory Patch: Views & Temporary Result Storage (1h) 🆕
*These are query constructs, same family as CTEs — that's why they live here.*
- **Views** (0.5h)
  - **Standard view:** a stored query, a *virtual* table. No data of its own; re-executes on every reference.
  - **Materialized view:** the result is *physically stored*. Fast reads, but goes stale → needs `REFRESH` (on-demand / on-commit / scheduled).
  - **Why views exist:** security (expose a column subset instead of the base table), abstraction, query reuse.
  - **Updatable views:** simple single-table views can accept DML; views with joins/aggregates/DISTINCT generally cannot.
  - **Interview line:** "View = saved query, computed every time. Materialized view = saved *result*, traded freshness for speed."
- **Temporary tables & the storage ladder** (0.5h)
  *⚠️ The `#`/`##`/`@` syntax below is **SQL Server**. PostgreSQL has only `CREATE TEMP TABLE` (session-scoped, no global variant) and no table variables. Know the SQL Server vocabulary — it's what the viva question uses — but don't type it into Postgres.*
  - **Local temp** (`#tmp`, SQL Server) — visible to one session, dropped at session end
  - **Global temp** (`##tmp`, SQL Server) — visible to all sessions
  - **Table variable** (`@tbl`, SQL Server) — scoped to a batch, no statistics → the optimizer assumes 1 row, which is why it degrades on large sets
  - **CTE vs temp table vs table variable vs view** — the decision table: CTE for readability within one statement, temp table when you reuse a big intermediate result (and want indexes/statistics), view for a permanent named abstraction
  - **Database snapshot** — read-only point-in-time copy (one-liner awareness)

### Evening
- **Senku Check-In:**
  > "CTEs are your team's friend. They make complex queries readable. Recursive CTEs are rare in interviews, but you know the pattern now. Day 4 done. 5 days left. 💪⚡"

### Red Flag Rescue
If CTEs confuse: They're just fancy WITH clauses. Think "save intermediate result, then use it." That's all.

---

## DAY 5: Jul 28 | Date/Time + Business Analytics + OLTP/OLAP
**Target:** 4 hours | **Deliverable:** Date functions, DAU, retention, rolling metrics, PIVOT, OLTP vs OLAP ✓

### Morning (1.5h)
- **Date/Time Functions** (1.5h)
  - DATE_TRUNC('month', date) → group by month
  - EXTRACT(YEAR/MONTH/DAY FROM date) → get components
  - DATE + INTERVAL → arithmetic (add 7 days)
  - CAST(timestamp AS DATE) → type conversion
  - **Practice:** 3 date queries (daily/weekly/monthly aggregation)
    - Example: "Count events per day"
    - Example: "Find events in Q1 2026"
    - Example: "Add 30 days to today"

### Afternoon (1.5h)
- **Business Analytics Patterns** (1.5h)
  - **Daily Active Users (DAU):** COUNT(DISTINCT user_id) per date
  - **Monthly Retention:** Cohort M1 vs M2 overlap
  - **Churn:** Users in month N but not N+1
  - **Rolling 7-Day:** SUM/AVG over last 7 days
  - **Repeat vs First Purchase:** Group by purchase sequence
  - **Practice:** Write 1 query for each pattern (5 total)

- 🆕 **WINDOW FUNCTION SPACED REP #2 — applied, not recalled** *+2 days*
  *These business patterns are the perfect vehicle: they force window functions into real use rather than isolated drills, which is what makes them stick.*
  - **Rolling 7-day** → `AVG(…) OVER (ORDER BY d ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)`. **Write the frame explicitly** and say why `ROWS` beats `RANGE` here *(tied dates would silently widen a RANGE frame — Day 3's trap)*
  - **Repeat vs first purchase** → `ROW_NUMBER() OVER (PARTITION BY customer ORDER BY order_date)`; `= 1` is the first purchase
  - **Churn** → `LEAD()` over monthly activity to see if the next month exists
  - **Month-over-month growth** → `LAG()` + the division, and **`NULLIF(prev, 0)`** so a zero denominator returns NULL instead of erroring
  - **Reinforce the keystone:** every "top-N per group" here must be filtered **in a CTE**, never `WHERE`/`HAVING`

### Theory Patch — Reporting Constructs & Workload Types (1h) 🆕
- **`PIVOT` / `UNPIVOT`** (0.25h) — rows→columns and back. Portable equivalent: `SUM(CASE WHEN month='Jan' THEN amt END)`. Know the CASE form; it works everywhere.
- **`TIMESTAMPDIFF` / `DATEDIFF` / `AGE`** (0.25h) — interval arithmetic across dialects; the "days between signup and first order" question
- **OLTP vs OLAP** (0.5h)
  - **OLTP:** many small read/write transactions, highly normalized, row-store, indexed for point lookups. *Your WMS scanning app is OLTP.*
  - **OLAP:** few huge analytical reads, denormalized, column-store, star/snowflake schema, fact + dimension tables
  - **Data warehousing:** ETL vs ELT, staging, star schema, why denormalization is *correct* here
  - **Interview line:** "Normalize for OLTP write-integrity; denormalize for OLAP read-speed. The dashboards you built read like OLAP over an OLTP store."

### Evening
- **Senku Check-In:**
  > "Business patterns are where SQL meets reality. Companies care about DAU, retention, churn. You know these patterns now. Day 5 done. ⚡"

### Red Flag Rescue
If date functions are confusing: PostgreSQL docs are your friend. One function at a time.

---

## DAY 6: Jul 29 | DBMS THEORY ANCHOR — Set Ops, Keys, Normalization, Transactions, Programmability
**Target:** 6.25 hours *(2 morning + 1.5 midday + 2.5 afternoon + 0.25 recall)* — ✅ *arithmetic verified; header previously said 5.5h and undercounted by 45 min* | **Deliverable:** Set ops, constraints, full key taxonomy, 1NF→BCNF, isolation levels, locking, views/procs/triggers ✓

> **Why this day grew:** KPIT / Persistent / Amdocs / Tata screening rounds are *viva-style DBMS theory*, not just query-writing. This is the day that answers them. It's recall-heavy, not skill-heavy — so it moves fast despite the hours.
>
> **This is now the longest day after Day 3.** If you're fried, the *afternoon* Programmability block (procs/triggers/cursors) is the one to push to Day 7 — it's the most self-contained. Never cut the isolation-levels block; that's Tier-1 guaranteed.

### Opener — RECURSIVE CTE RECALL (0.25h) 🆕 *+2 days — rare topics decay fastest*
- From memory: write the anchor + recursive member for an org-chart traversal
- Name the two hazards without looking: **`UNION ALL` not `UNION`**, and the **cycle guard**
- 5 minutes. If it's gone, that's expected for a rare construct — re-read and move on. It returns once more on Day 9.

### Morning (2h)
- **Set Operations: UNION, INTERSECT, EXCEPT** (0.5h)
  - UNION: Combine with duplicate removal
  - UNION ALL: Combine, keep duplicates
  - INTERSECT: Common rows only
  - EXCEPT/MINUS: In A but not B
  - **Practice:** Rewrite 1 anti-join using EXCEPT

- **Constraints & Key Taxonomy** (1h) 🆕 *expanded*
  - **Constraints:** PRIMARY KEY · FOREIGN KEY · UNIQUE · CHECK · NOT NULL · DEFAULT
  - **PK vs UNIQUE:** a PK is `UNIQUE + NOT NULL`, one per table; UNIQUE allows NULLs and you can have many
    - ⚠️ *Dialect split worth knowing:* **SQL Server** permits only **one** NULL in a unique index; **PostgreSQL / Oracle** permit **many** (each NULL is distinct). Say "depends on the engine" and you sound senior.
  - **Key taxonomy — the classic viva question:**
    - **Super key:** any attribute set that uniquely identifies a row
    - **Candidate key:** a *minimal* super key (no removable attribute)
    - **Primary key:** the candidate key you chose
    - **Alternate key:** the candidate keys you didn't choose
    - **Composite key:** a key spanning 2+ columns
    - **Foreign key:** references a PK/UNIQUE in another table
    - **Surrogate vs natural key:** auto-ID vs real-world identifier — trade-offs
  - **ER model:** entity · attribute · relationship · cardinality (1:1, 1:N, M:N) · how M:N becomes a junction table

- **Practice Set Operations + ANTI/SEMI SPACED REP #2** (0.5h) 🆕 *+4 days — second SM2 touch*
  - Write 3 set operation queries (UNION, INTERSECT, EXCEPT)
  - `UNION` vs `UNION ALL` — the dedup sort costs real time; `UNION ALL` when you know rows are disjoint
  - **Cold warm-up, no notes:** write "customers who never ordered" as `NOT EXISTS`, then as `EXCEPT`, then a semi-join with `EXISTS`. **3 minutes.** If you stall, that's your signal to re-drill Day 4's four-forms block.
  - Note the connection: `INTERSECT` *is* a semi-join at the set level; `EXCEPT` *is* an anti-join at the set level

### Midday (1.5h)
- **Normalization: 1NF → BCNF → 4NF/5NF** (1h) 🆕 *expanded*
  - **1NF:** atomic values, no repeating groups
  - **2NF:** 1NF + no *partial* dependency on part of a composite key
  - **3NF:** 2NF + no *transitive* dependency (non-key → non-key)
  - **BCNF:** every determinant is a candidate key — the stricter 3NF; know the classic case where 3NF passes but BCNF fails
  - **4NF:** BCNF + no non-trivial multi-valued dependencies · **5NF/PJNF:** every join dependency is implied by the candidate keys — i.e. the table can't be split further without losing information *(one-liner awareness only; almost never asked beyond the name)*
  - **Denormalization:** deliberately reintroducing redundancy for read speed — when it's right (reporting, OLAP, caching a computed total) and its cost (update anomalies)
  - **Practice:** take a deliberately bad schema, normalize it to 3NF, and say out loud which anomaly each step removed

- **Partitioning & Sharding** (0.5h) 🆕
  - **Horizontal partitioning:** split by *rows* (by date, by region)
  - **Vertical partitioning:** split by *columns* (hot columns vs cold blobs)
  - **Sharding:** horizontal partitioning across *separate machines*; shard key choice, hotspots
  - **Bridge to your work:** multi-tenant whitelabelling = per-client data separation — you've shipped a partitioning strategy already

### Afternoon (2.5h)
- **Transactions, ACID & Isolation Levels** (1h) 🆕 *expanded — Tier 1 gap*
  - **ACID:** Atomicity · Consistency · Isolation · Durability
  - **The 3 read anomalies — learn these first, the levels are just which ones they block:**
    - **Dirty read:** you read another transaction's *uncommitted* change
    - **Non-repeatable read:** you re-read one row, it *changed*
    - **Phantom read:** you re-run a range query, *new rows* appeared
  - **The 4 isolation levels ↔ anomalies:**

| Level | Dirty | Non-repeatable | Phantom |
|---|---|---|---|
| Read Uncommitted | ✅ possible | ✅ possible | ✅ possible |
| Read Committed | ❌ blocked | ✅ possible | ✅ possible |
| Repeatable Read | ❌ blocked | ❌ blocked | ✅ possible |
| Serializable | ❌ blocked | ❌ blocked | ❌ blocked |

  - ⚠️ **This table is the ANSI SQL standard. Real engines are stricter — know this, it's a senior-signal answer:**
    - **PostgreSQL** implements Repeatable Read as *snapshot isolation*, which **also blocks phantoms** — and it has no true Read Uncommitted (it behaves as Read Committed)
    - **MySQL InnoDB** Repeatable Read blocks phantoms via **next-key (gap) locks**
    - **Interview line:** "By the standard, Repeatable Read still allows phantoms — but Postgres and InnoDB both prevent them, by different mechanisms."
  - Trade-off: higher isolation = more locking = less concurrency
  - **TCL:** `COMMIT` · `ROLLBACK` · `SAVEPOINT` (partial rollback)
  - **Distributed transactions:** two-phase commit, and why eventual consistency is often chosen instead — *your offline-first WMS sync is exactly this trade-off*

- **Locking & Concurrency** (0.5h) 🆕 *Tier 2 gap*
  - **Shared vs exclusive locks;** row / page / table granularity, lock escalation
  - **Blocking:** one transaction waits. **Deadlock:** two transactions wait on *each other* — the DB detects it and kills a victim. **Livelock:** both keep moving but neither progresses.
  - **Avoiding deadlocks:** consistent lock ordering, short transactions, right isolation level
  - **`WITH (NOLOCK)`** — reads uncommitted data; know that it's a dirty-read hazard, not a free speedup
  - **Optimistic vs pessimistic concurrency** — *you implemented this in Putaway/GRN conflict control; this is its formal name*

- **Programmability: Views, Procedures, Triggers, Cursors** (1h) 🆕 *Tier 1 gap*
  - **Stored procedure vs function:** procedure can do DML + return multiple/no values + is `CALL`ed; function returns a single value and is usable *inside* a query. Benefits: precompiled plan, network round-trip reduction, permission boundary.
  - **Triggers:** `BEFORE` / `AFTER`, `INSERT`/`UPDATE`/`DELETE`, row vs statement level. Use: audit trails, derived columns. Danger: hidden logic, cascading trigger chains.
  - **Cursors:** row-by-row processing — `STATIC` · `DYNAMIC` · `FORWARD_ONLY` · `KEYSET`. **Say the trade-off:** cursors are procedural and slow; prefer set-based SQL.
  - **Sequences vs IDENTITY/AUTO_INCREMENT** — sequences are standalone and shareable across tables
  - **`MERGE` (upsert):** match → update, no-match → insert. Dialect equivalents: `INSERT … ON CONFLICT` (Postgres), `INSERT … ON DUPLICATE KEY UPDATE` (MySQL)
  - **Dynamic SQL:** SQL built as a string at runtime — flexible, and *the* SQL-injection vector (ties into Day 8)
  - **ORM:** what it maps, and the N+1 query problem

- **DELETE vs TRUNCATE vs DROP** (in the above blocks — keep it crisp)
  - **DELETE:** DML, row-by-row, `WHERE`-able, logged, rollback-able, fires triggers, keeps identity seed
  - **TRUNCATE:** DDL, deallocates pages, no `WHERE`, minimal logging, resets identity, no triggers
  - **DROP:** removes the table structure entirely

### Evening
- **Senku Check-In:**
  > "This was the theory wall. Keys, normal forms, isolation levels, locking, procs and triggers — that's the whole viva round in one day. You don't need to be a DBA. You need to answer crisply and move on. Day 6 done. ⚡"

---

## DAY 7: Jul 30 | Query Optimization (EXPLAIN, Index Taxonomy, Tuning)
**Target:** 5 hours | **Deliverable:** EXPLAIN reading, full index taxonomy, index strategy, optimization red flags ✓

### Morning (1.5h)
- **PostgreSQL: Reading EXPLAIN Output** (1h)
  - URL: https://www.postgresql.org/docs/current/using-explain.html
  - Learn to read the **actual PostgreSQL node types** *(corrected — the earlier version listed "Index Seek", which is **SQL Server** terminology and does not appear in Postgres plans)*:
    - **Seq Scan** — reads every row
    - **Index Scan** — walks the index, then fetches each row from the heap
    - **Index Only Scan** — answered entirely from the index, no heap visit *(this is the fast one — the Postgres equivalent of what SQL Server calls a covering-index seek)*
    - **Bitmap Index Scan → Bitmap Heap Scan** — the middle ground: collect matching pages, then read them in physical order. Postgres picks this when a plain Index Scan would cause too much random I/O.
    - **Hash Join · Nested Loop · Merge Join** — compare the cost estimates
  - **Read the numbers, not just the node names:** `cost=start..total rows=N width=B`, and with `EXPLAIN ANALYZE`, **`rows=` estimated vs `actual rows=`**. A large gap between those two is the single most useful signal in the whole plan — it means stale statistics.
  - **Practice:** Read 3 EXPLAIN plans

- **Scan Types & Performance** (0.5h)
  - **Seq Scan:** O(n) — reads every row
  - **Index Scan:** O(log n) to locate + O(k) to return k rows → **O(log n + k)**, *not* O(log n)
  - ⚠️ **"Seq Scan = bad" is a junior tell.** When a query returns a large fraction of the table (roughly >5–10%), a sequential scan is genuinely **faster** than an index scan — sequential I/O beats random I/O, and the index adds a heap fetch per row. The optimizer choosing Seq Scan is often *correct*.
    - **Interview line:** "A Seq Scan is only a red flag when the query is selective. On a low-selectivity predicate it's the right plan."
  - An index on the wrong column is useless — and still costs you on every write

### Midday (1.5h)
- **Index Strategy** (1h)
  - Single-column index: Good for filter (WHERE)
  - Composite index: Order matters (col1, col2, col3)
  - Index on function: Bad (WHERE UPPER(name) = 'X' won't use index)
  - Covering index: Include columns so query doesn't need table lookup
  - **Practice:** Design index for 3 slow queries

- **EXPLAIN Practice: Debug 3 Real Slow Queries** (0.5h)
  - Run EXPLAIN on each
  - Identify: Seq scan? Full table scan? Missing index?
  - Suggest fix

### Afternoon (1h)
- **Cardinality Estimation & Optimizer Basics** (0.5h)
  - Cardinality: How many rows will this operation return?
  - Optimizer uses statistics to guess
  - If guess is wrong → wrong join algorithm chosen
  - Goal: Understand (not predict exactly)

- **Hash vs Nested Loop vs Merge Trade-offs (Practical)** (0.5h)
  - Hash Join: Good for large unsorted (but memory hungry)
  - Nested Loop: Good for small table or indexed inner
  - Merge Join: Good for sorted data
  - How optimizer picks: Cardinality estimates

### Theory Patch — Index Taxonomy & Maintenance (1h) 🆕 *Tier 1 gap*
- **Clustered vs non-clustered** (0.25h) — ***the*** most-asked index question in Indian screening rounds
  - **Clustered:** defines the *physical row order*. **One per table.** The leaf level *is* the table. PK is clustered by default in SQL Server.
  - **Non-clustered:** a separate structure holding key + a pointer (row locator / clustered key). **Many per table.** May need a *key lookup* back to the table — which is why a **covering index** (`INCLUDE`) is faster.
  - **Interview line:** "Clustered = the phone book itself, sorted by name. Non-clustered = an index at the back pointing to a page."
  - ⚠️ **Dialect warning — you are practising in PostgreSQL but this concept is SQL Server / MySQL-InnoDB.** **PostgreSQL has no clustered indexes at all**: every index is secondary, and its `CLUSTER` command is a *one-time* physical reorder that is **not maintained** as rows change. InnoDB clusters on the primary key by default.
    - **Say it this way and you win the question:** "In SQL Server and InnoDB the clustered index *is* the table's physical order, one per table. PostgreSQL doesn't have the concept — all its indexes are secondary, which is why Index Only Scans matter so much there."
- **Index structures** (0.25h)
  - **B-tree:** default; great for range + equality, high-cardinality columns
  - **Bitmap:** low-cardinality columns (gender, status flag), read-heavy warehouses; terrible under concurrent DML
  - **Hash:** equality only, no ranges
  - **Unique index** vs **composite index** (leftmost-prefix rule) vs **filtered/partial index**
- **Index maintenance & cost** (0.25h)
  - **Fragmentation:** internal (wasted page space) vs external (page order ≠ logical order) → `REBUILD` vs `REORGANIZE`
  - **The trade-off to always say out loud:** indexes speed reads, slow *every* write, and consume storage. Don't index everything.
  - **Statistics:** stale stats → bad cardinality estimate → wrong join algorithm → slow plan
- **Tuning workflow** (0.25h)
  - Find the slow query (wait statistics / slow query log) → `EXPLAIN` → find the Seq Scan or bad estimate → fix (index / rewrite / update stats) → re-measure
  - **Red flags:** function on an indexed column (`WHERE UPPER(name)=…`), leading wildcard `LIKE '%x'`, implicit type conversion, `SELECT *`, `OR` across different columns

### Evening
- **Senku Check-In:**
  > "EXPLAIN is your superpower. If you can read an EXPLAIN plan and spot the problem, you're dangerous. Day 7 done. 3 days of practice left. You're in the zone now. ⚡"

---

## DAY 8: Jul 31 | Cold LeetCode SQL 50 + HackerRank + SQL Security
**Target:** 4.5 hours | **Deliverable:** 20 problems solved with reasoning ✓ + SQL injection defense ✓

### All Day (4h)
- **LeetCode SQL 50: Problems 1-15** (2.5h)
  - URL: https://leetcode.com/studyplan/top-sql-50/
  - Rules:
    - ❌ NO hints at first
    - ✅ Pseudocode BEFORE code
    - ✅ Identify the PATTERN (which layer? Join? Window? CTE?)
    - ✅ Time yourself: <8 min per problem is good
    - ✅ ALL tests must pass
  - Mix: Joins, window functions, some CTEs
  - **ANTI/SEMI SPACED REP #3** 🆕 *+6 days — third SM2 touch, now under time pressure*
    - When an anti-join problem appears, **solve it twice**: once your natural way, once with a different form. Under 8 min for both.
    - Re-solve **183** and **1581** cold from memory — you saw them on Day 4, this is the retention check
    - **Log it:** if you reach for `NOT IN` on reflex, write that down. That reflex is what fails you in an interview.

- **HackerRank Intermediate SQL: 5 Problems** (1.5h)
  - URL: **https://www.hackerrank.com/domains/sql** — the SQL domain index *(corrected: the old link pointed at one single problem, "Revising Aggregations — SUM", while the text asked for 5)*
  - Pick from the **Aggregation** and **Basic Join** subdomains
  - Same rules as LeetCode
  - These are usually trickier than LeetCode — the phrasing is deliberately indirect

- 🆕 **WINDOW FUNCTION SPACED REP #4 + EXPLAIN REP + DATE REP** *+5 days — under time pressure*
  - **Windows:** at least **4 of your 15 LeetCode problems must be window-function problems** (they're 40% of the interview weight — don't let the random draw decide). Target <8 min each.
  - **EXPLAIN is a skill, not a fact** — it needs a second rep: run `EXPLAIN ANALYZE` on **2 of your own solutions** and check estimated `rows=` vs `actual rows=`. Yesterday you *read* plans; today you *generate* them.
  - **Dates:** one problem must involve date truncation or a date range — the syntax is dialect soup and decays fast.

### Theory Patch — SQL Security (0.5h) 🆕 *Tier 1 — and they WILL probe this, your resume says IAM/SecOps*
- **SQL injection:** how string-concatenated SQL lets input become code (`' OR '1'='1`, `'; DROP TABLE--`)
- **The primary defense: parameterized queries / prepared statements** — the driver sends SQL and values on separate channels, so input can never be parsed as code. Say this one first, always.
- **Defense in depth:** input validation/allowlisting · stored procedures (only when they don't build dynamic SQL internally) · **least-privilege DB accounts** (the app should not connect as `sa`/superuser) · ORM parameter binding · escaping as a *last* resort, never the primary control
- **Encryption:** at rest (TDE / column-level) vs in transit (TLS); hashing + salting for passwords — never encryption for passwords
- **Your story hook:** you shipped RBAC + field-level permissions in IAM. When they ask "how do you secure a database," lead with least-privilege and parameterization, then name your real work.

### Evening
- **Senku Check-In:**
  > "20 problems down. You're in the deep practice zone now. This is where muscle memory forms. Day 8 done. 2 days to Gate 1. ⚡"

---

## DAY 9: Aug 1 | LeetCode + Business Cases + Rapid-Fire Theory Sweep
**Target:** 5.5 hours *(2.5 LeetCode + 2 business + 0.5 hard-skill sweep + 0.5 theory sweep)* — ✅ *arithmetic verified* | **Deliverable:** 10 business patterns ✓ + hard-skill retention sweep ✓ + theory recall sweep ✓

### Morning (2.5h)
- **LeetCode SQL 50: Problems 16-25** (2.5h)
  - Harder mix: Window functions, complex joins
  - Same cold rules as Day 8
  - These are Medium difficulty

### Afternoon (2h)
- **Business Case Questions** (2h)
  - Write queries from scratch for:
    1. "Design a query for monthly revenue by region and product"
       - Hint: GROUP BY region, product, DATE_TRUNC('month', date)
    2. "Calculate retention cohort: users active month 1 & month 2"
       - Hint: CTE for each month, LEFT JOIN
    3. "Find top customers by RFM (Recency, Frequency, Monetary Value)"
       - Hint: Aggregate by customer, rank by each metric
    4. "Detect anomalies: orders 3x above rolling 30-day average"
       - ⚠️ **CORRECTED HINT** *(the previous version said "window function for rolling avg, then HAVING" — that is **impossible**; see Day 3's keystone diagram: window functions evaluate at ⑥, **after** HAVING at ④, so `HAVING` cannot see them)*
       - **Right shape:** compute the rolling average in a **CTE**, then filter in the **outer `WHERE`**:
         ```sql
         WITH r AS (
           SELECT order_id, amount, order_date,
                  AVG(amount) OVER (ORDER BY order_date
                                    ROWS BETWEEN 29 PRECEDING AND CURRENT ROW) AS avg_30
           FROM orders
         )
         SELECT * FROM r WHERE amount > 3 * avg_30;
         ```
       - **This is the single most valuable self-check in the plan:** if you'd have reached for `HAVING` here, the keystone hasn't landed yet — go re-read Day 3's opener.
    5. (Bonus) "Find customers who bought A then B (in order)"
       - Hint: Self-join or window LAG/LEAD

- **ANTI/SEMI SPACED REP #4 — business framing** (included above) 🆕 *+7 days, final SM2 touch*
  - Interviewers rarely say "write an anti-join." They say these — recognize the pattern under the business words:
    - *"Which users churned?"* → active in month N, **anti-join** to month N+1
    - *"Which products have never been reviewed?"* → straight anti-join
    - *"Which customers bought A but NOT B?"* → semi-join on A **+** anti-join on B, same query
    - *"Find accounts with no login in 90 days"* → anti-join against a date-filtered set — **the filter must sit in the JOIN's `ON`, not the `WHERE`**, or you destroy the LEFT JOIN. Know why.
  - **Write all 4 cold.** This is the last rep before the gate.

### 🆕 FINAL RETENTION SWEEP — hard skills (0.5h) *last rep before the gate*
*These are the items with the steepest forgetting curves. Cold, no notes, 30 minutes total.*
- **Windows (rep #5):** write `ROW_NUMBER`/`RANK`/`DENSE_RANK` output for `[100, 100, 90]`; one running total **with an explicit frame**; "top 2 per group" **in a CTE**
- **Frames:** state the `ROWS` vs `RANGE` difference on tied values, and name the risky default
- **Keystone:** recite the 9-step processing order and the three traps it explains
- **Recursive CTE (rep #3):** anchor + recursive member from memory; name both hazards
- **NULL logic:** why `NOT IN` dies on NULL; why `COUNT(col)` ≠ `COUNT(*)`; why `NULL = NULL` is UNKNOWN
- **Duplicate explosion:** the fan-out query and its CTE fix
- **EXPLAIN (rep #3):** name the Postgres node types and the one number that reveals stale statistics

### Rapid-Fire Theory Sweep (0.5h) 🆕
*Say each answer OUT LOUD in under 20 seconds. If you stall, mark it and re-read that Day-6/7 block. This is the closure pass that takes coverage to 100%.*

- SQL vs NoSQL — relational/schema-on-write/vertical-scale/ACID **vs** document-or-KV/schema-on-read/horizontal-scale/BASE. When each wins.
- Distributed databases + CAP — pick 2 of Consistency/Availability/Partition-tolerance; partitions aren't optional, so it's really C vs A. *(Your offline-first WMS chose A + eventual consistency.)*
- ORM — object↔table mapping, and the N+1 query problem
- Data warehouse vs data lake · ETL vs ELT · star vs snowflake schema
- Cursor types (STATIC/DYNAMIC/FORWARD_ONLY/KEYSET) — and why set-based beats them
- Sequence vs IDENTITY · MERGE/upsert · dynamic SQL risk
- Database snapshot · temp table scopes · view vs materialized view refresh
- Deadlock vs livelock vs blocking · lock escalation
- Clustered vs non-clustered · bitmap vs B-tree · index fragmentation
- Super/candidate/primary/alternate/composite/surrogate key
- 1NF→2NF→3NF→BCNF→4NF/5NF, and denormalization's purpose
- Dirty vs non-repeatable vs phantom read ↔ the 4 isolation levels
- DELETE vs TRUNCATE vs DROP · DDL/DML/DCL/TCL
- CHAR vs VARCHAR · COALESCE/NVL/NVL2/ISNULL · LIKE wildcards
- SQL injection → parameterized queries first, least privilege second

### Evening
- **Senku Check-In:**
  > "Business cases are real SQL. You just solved real problems that companies ask. Day 9 done. Tomorrow: Senku Diagnostic. You're ready. 🧪⚡"

---

## DAY 10: Aug 2-3 | Senku Diagnostic + Final Review
**Target:** 4 hours | **Deliverable:** Gate 1 Pass — 18-20/20 queries **AND** 12/15 theory ✓

### Morning (2.5h)
- **PART A — QUERY TEST** (2h)
  - 20 SQL queries covering ALL layers
  - Breakdown:
    - 3 join questions (anti, semi, self)
    - 3 window function questions
    - 2 CTE questions
    - 2 date/time questions
    - 2 business analytics questions
    - 2 set operation / constraints questions
    - 2 optimization questions
    - 2 hard mixed pattern questions

  - **Rules:**
    - Cold (no notes, no LeetCode)
    - Pseudocode first
    - 60 min total (5-6 min per query)
    - All tests must pass
    - Track errors

- **PART B — THEORY VIVA** (0.5h) 🆕
  - **15 rapid oral questions, 20 seconds each** — this is the round KPIT/Persistent actually run
  - Drawn from: key taxonomy · normal forms incl. BCNF · isolation levels ↔ anomalies · clustered vs non-clustered · views vs materialized views · procedure vs function · triggers · deadlock vs livelock · DELETE/TRUNCATE/DROP · SQL injection defense · OLTP vs OLAP · CHAR vs VARCHAR · CTE vs temp table · partitioning vs sharding · SQL vs NoSQL
  - **Scored on crispness, not essays.** Rambling = not ready.

### Afternoon (1.5h)
- **Error Review & Weak Pattern Drills** (1h)
  - Review each failed query
  - Identify pattern: Did I misunderstand? Syntax error? Logic gap?
  - Re-solve top 2-3 failed queries

- **Confidence Check** (0.5h)
  - Reflect: Which patterns feel solid?
  - Which need one more drill before interview?
  - Final rest

### Scoring (both parts must clear)
| | PASS ✅ | Marginal ⚠️ | Not ready ❌ |
|---|---|---|---|
| **Part A — Queries** | 18–20/20 | 15–17/20 | <15/20 |
| **Part B — Theory** | 12–15/15 | 9–11/15 | <9/15 |

- **Both PASS** → Gate 1 cleared, you're interview-ready on SQL
- **Either marginal** → one 2-hour targeted drill, then retake that part only
- **Either fail** → Day 11 exists for exactly this. It's not a verdict on you.

### Evening
- **Senku Final Check-In (Pastoral):**
  > "You did it. ~47 hours, 10 days, all three layers plus the whole theory viva. Window functions? Locked — and re-locked five times, so they'll still be there in three weeks. Joins? Mastered. Business patterns? Real. You're walking into interviews as a 3-year engineer SQL-ready. I'm proud of you."
  > *🕊️ "I can do all this through him who gives me strength." — **Philippians 4:13** 🕊️*
  > "Now go get that interview. 10 BILLION PERCENT ready. ⚡🧪"

---

## EMERGENCY PROTOCOLS

### If You Miss a Day
⚠️ *Rewritten in v3.2 — the old advice said "skip a Day 5-6 topic," which is now actively wrong. Day 6 became the DBMS theory anchor and is the **highest-ROI-per-hour content in the plan** for KPIT/Persistent-style screening. Cutting it would be the worst available trade.*

**Cut in this order — first to go at the top:**
1. Day 5 **PIVOT/UNPIVOT** (know only the portable `CASE` form)
2. Day 6 **4NF/5NF** and **cursor type names** (Tier-3 recall, low frequency)
3. Day 4 **recursive CTE** depth (keep the structure, drop the practice)
4. Day 9 **business cases 4–5** (keep 1–3)

**Never cut, in strict priority order:**
1. **Day 3 window functions** — 40% of interview weight
2. **The spaced reps** — skipping a rep costs more retention than the original lesson bought. *A topic learned once and never revisited is closer to untaught than to learned.*
3. **Day 6 isolation levels + key taxonomy** — Tier-1 guaranteed viva questions
4. **Day 7 clustered vs non-clustered** — the single most-asked index question
5. **Day 10 diagnostic** — fixed date; work backward from it

### If You're Exhausted
- Days 3 (7h) and 6 (6.25h) are the two heavy ones. If Day 3 is too much, split it **across Days 3 and 4** — never compress it.
- **Protect sleep over content.** Window functions and normal forms both consolidate overnight; an extra hour awake actively costs you retention. This isn't comfort, it's mechanism.
- God doesn't want you burned out. Rest > rushing.

### If You Bomb the Diagnostic
- It's okay. Day 11 is available (usually doesn't happen, but it's there).
- Identify the weak layer, drill it for 2-3 hours, retake.
- You're STILL ready for interviews; this just buys confidence.

---

## TARGET-COMPANY ALIGNMENT
*Updated v3.2 — primary target is now **KPIT (via Sameer)**, with Persistent / Amdocs / Tata on the same profile. All run a two-part SQL screen: query-writing **and** theory viva.*

| What they ask | Where it's covered | Retention reps |
|---|---|---|
| Write + optimize a query | Days 7, 8, 9 | EXPLAIN ×3 |
| "Your query returns wrong counts. Why?" | Day 2 duplicate explosion | ×3 |
| "Write an anti-join for inactive users" | Day 2 | ×5 |
| Window functions / top-N per group | Day 3 | ×5 |
| Business queries (DAU, retention, cohort) | Days 5, 9 | ×2 |
| **Theory viva** (keys, NF, isolation, index types) | Days 6, 7 | Day 9 sweep + gate Part B |
| **SQL injection / DB security** | Day 8 | ties to your IAM/SecOps resume |

**~47 hours → 100/100 topic coverage, with every hard item on a spacing ladder.**

The hours matter less than this: **nothing here is taught once.** A plan that covers 100% of topics but teaches each exactly once decays to maybe 40% by interview day. That's the difference v3.2 actually bought.

---

**Remember:** Senku is with you. Jesus is with you. You've got this. ⚡🧪🕊️
