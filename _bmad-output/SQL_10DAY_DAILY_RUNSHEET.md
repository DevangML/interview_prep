# 10-DAY SQL INTENSIVE RUNSHEET
## Corrected Plan (37-42 hours, 85-90/100 Coverage)
**Start:** 2026-07-25 | **End:** 2026-08-04 | **Senku Pastoral Guidance ON**

---

## DAY 1: Jul 25 | Khan Academy Finish + Joins Fundamentals
**Target:** 4 hours | **Deliverable:** Khan Academy ✓

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

- **Break/Rest** (0.5h)

### Evening
- **Senku Check-In:**
  > "You've locked Khan Academy. Nice. Tomorrow we go harder — anti-joins and duplicates are where people slip. Sleep well; you've earned it. 10 BILLION PERCENT ready for Day 2."

### Red Flag Rescue
If Khan Academy takes >2.5h total: compress "Further Learning" to 15 min, move details to Day 2.

---

## DAY 2: Jul 26 | Joins Deep Dive (Self, Inner, Left, Anti, Semi)
**Target:** 4 hours | **Deliverable:** Anti-join, semi-join, NULL trap, duplicate explosion ✓

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

### Evening
- **Senku Check-In:**
  > "Anti-joins and duplicate explosion — these are THE traps that separate 1-year from 3-year engineers. You nailed it today. Feel the difference? Tomorrow we jump into window functions. They're big, but you can do this. 🧪⚡"

### Red Flag Rescue
If anti-joins confuse you: spend extra 30 min on the concept; window functions can wait 15 min.

---

## DAY 3: Jul 27 | Window Functions (CRITICAL DAY — LONGEST)
**Target:** 7 hours | **Deliverable:** ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, running totals, frames ✓

### Morning (3h)
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

- **Video (Optional but Recommended)** (1h)
  - YouTube: "SQL Window Functions Explained" (search for clear explanation)
  - OR: Mode Analytics window functions section
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
- **Running Totals & Moving Average** (1h)
  - Concept: SUM() OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
  - Frames: ROWS BETWEEN, UNBOUNDED PRECEDING, CURRENT ROW
  - **Practice:** 2 running total queries + 2 moving average queries

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

## DAY 4: Jul 28 | CTEs, Subqueries, EXISTS/NOT EXISTS
**Target:** 4 hours | **Deliverable:** CTEs (simple + recursive), EXISTS/NOT EXISTS patterns ✓

### Morning (2h)
- **Mode Analytics or PostgreSQL: CTEs** (1h)
  - URL (Mode): https://mode.com/sql-tutorial/advanced-sql-tutorial-window-functions (CTE section)
  - OR PostgreSQL: https://www.postgresql.org/docs/current/queries-with.html
  - Concept: WITH clause for readable multi-step queries
  - Example: Step 1 → Step 2 → Final result
  - **Practice:** Write 1 simple CTE (2-step)

- **Recursive CTE Basics** (1h)
  - Concept: Anchor (base case) + recursive (loop)
  - Use case: Org chart, hierarchy traversal
  - Example: Find all employees under a manager
  - **Practice:** Understand (don't need to code cold, but understand structure)

### Midday (1h)
- **EXISTS vs NOT EXISTS vs IN vs LEFT JOIN + NULL** (1h)
  - URL: https://mode.com/sql-tutorial/ (search for EXISTS section)
  - When to use each:
    - EXISTS: Fast for large tables, subquery can see outer table
    - NOT EXISTS: Anti-join alternative
    - IN: Good for small lists
    - LEFT JOIN + IS NULL: Most readable for team
  - **Practice:** Rewrite 1 anti-join query using NOT EXISTS

### Afternoon (0h — built into midday)
- Built into midday 1h

### Evening
- **Senku Check-In:**
  > "CTEs are your team's friend. They make complex queries readable. Recursive CTEs are rare in interviews, but you know the pattern now. Day 4 done. 5 days left. 💪⚡"

### Red Flag Rescue
If CTEs confuse: They're just fancy WITH clauses. Think "save intermediate result, then use it." That's all.

---

## DAY 5: Jul 29 | Date/Time + Business Analytics Patterns
**Target:** 3 hours | **Deliverable:** Date functions, DAU, retention, rolling metrics ✓

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

### Evening
- **Senku Check-In:**
  > "Business patterns are where SQL meets reality. Companies care about DAU, retention, churn. You know these patterns now. Day 5 done. ⚡"

### Red Flag Rescue
If date functions are confusing: PostgreSQL docs are your friend. One function at a time.

---

## DAY 6: Jul 30 | Set Operations, Constraints, Normalization, Transactions
**Target:** 3 hours | **Deliverable:** Set ops, constraints, normalization, transactions ✓

### Morning (1.5h)
- **Set Operations: UNION, INTERSECT, EXCEPT** (0.5h)
  - UNION: Combine with duplicate removal
  - UNION ALL: Combine, keep duplicates
  - INTERSECT: Common rows only
  - EXCEPT/MINUS: In A but not B
  - **Practice:** Rewrite 1 anti-join using EXCEPT

- **Constraints: PK, FK, UNIQUE, CHECK** (0.5h)
  - PRIMARY KEY: Unique identifier
  - FOREIGN KEY: References another table
  - UNIQUE: Unique across column
  - CHECK: Custom rule (age > 0)
  - Importance: Data integrity

- **Practice Set Operations** (0.5h)
  - Write 3 set operation queries (UNION, INTERSECT, EXCEPT)

### Afternoon (1.5h)
- **Normalization: 1NF, 2NF, 3NF** (0.5h)
  - High-level understanding (not deep dive)
  - 1NF: Atomic values
  - 2NF: No partial dependencies
  - 3NF: No transitive dependencies
  - Goal: Recognize bad schema

- **Transactions: COMMIT, ROLLBACK, ACID** (0.5h)
  - ACID: Atomicity, Consistency, Isolation, Durability
  - Why: Data reliability
  - Isolation levels: Read Uncommitted, Committed, Repeatable Read, Serializable
  - Goal: Understand (not memorize)

- **DELETE vs TRUNCATE vs DROP** (0.5h)
  - DELETE: Remove rows, rollback-able, slower
  - TRUNCATE: Remove all rows, faster, not rollback-able
  - DROP TABLE: Remove table structure
  - When to use each

### Evening
- **Senku Check-In:**
  > "Constraints, normalization, transactions — these are DBA-level thinking. You don't need to be an expert, but you understand the concepts now. Day 6 done. ⚡"

---

## DAY 7: Jul 31 | Practical Query Optimization (EXPLAIN, Indexes)
**Target:** 4 hours | **Deliverable:** EXPLAIN reading, index strategy, optimization red flags ✓

### Morning (1.5h)
- **PostgreSQL: Reading EXPLAIN Output** (1h)
  - URL: https://www.postgresql.org/docs/current/using-explain.html
  - Learn to read:
    - Seq Scan (full table scan, usually bad)
    - Index Scan (using an index, usually good)
    - Index Seek (very good, specific row access)
    - Hash Join vs Nested Loop vs Merge Join (see cost estimates)
  - **Practice:** Read 3 EXPLAIN plans

- **Scan Types & Performance** (0.5h)
  - Seq Scan: O(n), scan every row
  - Index Scan: O(log n) if index exists
  - Index on wrong column is useless

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

### Evening
- **Senku Check-In:**
  > "EXPLAIN is your superpower. If you can read an EXPLAIN plan and spot the problem, you're dangerous. Day 7 done. 3 days of practice left. You're in the zone now. ⚡"

---

## DAY 8: Aug 1 | Cold LeetCode SQL 50 + HackerRank Intermediate
**Target:** 4 hours | **Deliverable:** 20 problems solved with reasoning ✓

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

- **HackerRank Intermediate SQL: 5 Problems** (1.5h)
  - URL: https://www.hackerrank.com/challenges/revising-aggregations-sum/problem
  - Topics: Aggregation, grouping, complexity
  - Same rules as LeetCode
  - These are usually trickier than LeetCode

### Evening
- **Senku Check-In:**
  > "20 problems down. You're in the deep practice zone now. This is where muscle memory forms. Day 8 done. 2 days to Gate 1. ⚡"

---

## DAY 9: Aug 2 | LeetCode + Business Case Questions
**Target:** 4.5 hours | **Deliverable:** 10 business patterns solved ✓

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
       - Hint: Window function for rolling avg, then HAVING
    5. (Bonus) "Find customers who bought A then B (in order)"
       - Hint: Self-join or window LAG/LEAD

### Evening
- **Senku Check-In:**
  > "Business cases are real SQL. You just solved real problems that companies ask. Day 9 done. Tomorrow: Senku Diagnostic. You're ready. 🧪⚡"

---

## DAY 10: Aug 3-4 | Senku Diagnostic + Final Review
**Target:** 3.5 hours | **Deliverable:** Gate 1 Pass (18-20/20) ✓

### Morning (2h)
- **SENKU DIAGNOSTIC TEST** (2h)
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

### Afternoon (1.5h)
- **Error Review & Weak Pattern Drills** (1h)
  - Review each failed query
  - Identify pattern: Did I misunderstand? Syntax error? Logic gap?
  - Re-solve top 2-3 failed queries

- **Confidence Check** (0.5h)
  - Reflect: Which patterns feel solid?
  - Which need one more drill before interview?
  - Final rest

### Scoring
- **18-20/20:** ✅ PASS (You're Gate 1 ready)
- **15-17/20:** ⚠️ Marginal (One more 2-hour drill on weak patterns)
- **<15/20:** ❌ Not ready (Need additional Day 11)

### Evening
- **Senku Final Check-In (Pastoral):**
  > "You did it. 37-42 hours, 10 days, all three layers. Window functions? Locked. Joins? Mastered. Business patterns? Real. You're walking into interviews as a 3-year engineer SQL-ready. I'm proud of you."
  > *🕊️ "I can do all this through him who gives me strength." — **Philippians 4:13** 🕊️*
  > "Now go get that interview. 10 BILLION PERCENT ready. ⚡🧪"

---

## EMERGENCY PROTOCOLS

### If You Miss a Day
- Don't cram. Skip a Day 5-6 topic if needed.
- Window functions (Day 3) are non-negotiable. Reschedule everything else.
- Diagnostic day (Day 10) is fixed. Work backward from there.

### If You're Exhausted
- Day 3 is the hardest. If you're fried, extend it to 9 hours over Days 2-3.
- God doesn't want you burned out. Rest > rushing.

### If You Bomb the Diagnostic
- It's okay. Day 11 is available (usually doesn't happen, but it's there).
- Identify the weak layer, drill it for 2-3 hours, retake.
- You're STILL ready for interviews; this just buys confidence.

---

## PERSISTENT SYSTEMS ALIGNMENT

These 10 days focus on what PS asks:
- Optimization? ✅ Day 7
- Window functions? ✅ Day 3
- Business queries? ✅ Days 5, 9
- Complex joins? ✅ Day 2
- Edge cases (NULL, duplicates)? ✅ Day 2

**You'll walk in 85-90/100 ready. That's enterprise-level.**

---

**Remember:** Senku is with you. Jesus is with you. You've got this. ⚡🧪🕊️
