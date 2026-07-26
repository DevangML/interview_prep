# DBMS & SQL — Complete Technical Syllabus (2026)

- **Produced by:** Technical & Domain Research Specialist
- **Date:** 2026-07-26
- **Question asked:** What is the 98%+ complete 2026 technical syllabus for DBMS & SQL for 2-3 YOE software engineering interviews?
- **Method:** web search / doc fetch / curriculum synthesis
- **Confidence:** HIGH
- **Decay class:** SLOW
- **Supersedes:** nothing

---

## 1. Overview & Tier Requirements

Database management systems and SQL querying form a primary filter in 2-3 YOE software engineer interviews across both product and service companies. At this experience level, candidates are expected to demonstrate deep fluency in writing complex analytical SQL queries (Window functions, CTEs, GROUP BY HAVING) and clear mechanical understanding of database internals (Indexing structures, Transaction isolation levels, Locking mechanisms, and Execution plan optimization).

---

## 2. Topic Inventory & Core Concepts

### A. RDBMS Architecture & Relational Model
- **Core Principles:** Entity-Relationship (ER) model, Entities, Attributes, Relationships (1:1, 1:N, N:M), Keys (Super key, Candidate key, Primary key, Alternate key, Foreign key, Composite key).
- **Relational Algebra:** Selection ($\sigma$), Projection ($\pi$), Cartesian Product ($\times$), Join ($\bowtie$), Union ($\cup$), Set Difference ($-$).
- **Data Integrity Constraints:** Entity integrity (Primary Key $\neq$ NULL), Referential integrity (Foreign key matching or NULL), Domain integrity, Check constraints, Unique constraints.

### B. Deep SQL Querying & Execution Order
- **SQL Logical Execution Order:**
  1. `FROM` & `JOIN` (Builds Cartesian product & applies `ON` filters)
  2. `WHERE` (Filters rows before aggregation)
  3. `GROUP BY` (Groups remaining rows)
  4. `HAVING` (Filters aggregated groups)
  5. `SELECT` (Evaluates expressions & aliases)
  6. `DISTINCT` (Removes duplicate rows)
  7. `ORDER BY` (Sorts output)
  8. `LIMIT` / `OFFSET` (Paginates final result)

- **JOIN Types & Mechanics:**
  - `INNER JOIN`: Intersect of matching keys.
  - `LEFT JOIN` / `RIGHT JOIN`: Preserves un-matched rows from left/right table with `NULL` fill.
  - `FULL OUTER JOIN`: Preserves un-matched rows from both sides.
  - `CROSS JOIN`: Cartesian product ($M \times N$).
  - `SELF JOIN`: Table joined with itself (hierarchical data, manager-employee relationships).
  - `ANTI JOIN` (`NOT EXISTS` / `LEFT JOIN WHERE IS NULL`): Finds rows in Table A with no match in Table B.
  - `SEMI JOIN` (`EXISTS` / `IN`): Returns rows from Table A that match at least one row in Table B without duplicating rows.

- **CTEs (Common Table Expressions) & Subqueries:**
  - Subqueries vs Correlated Subqueries (Evaluation per outer row vs single evaluation).
  - Non-Recursive CTEs (`WITH cte AS (...)`): Readability, query modularity.
  - Recursive CTEs (`WITH RECURSIVE cte AS (Anchor UNION ALL Recursive)`): Hierarchy traversal, org charts, graph paths, bill of materials.

- **Window Functions (Analytic Functions):**
  - **Syntax:** `FUNCTION() OVER (PARTITION BY col1 ORDER BY col2 ROWS/RANGE BETWEEN ...)`
  - **Ranking Functions:** `ROW_NUMBER()` (unique incremental integers), `RANK()` (skips ranks on ties: 1, 2, 2, 4), `DENSE_RANK()` (no skips on ties: 1, 2, 2, 3), `NTILE(N)` (divides into N buckets).
  - **Value/Offset Functions:** `LAG(col, offset, default)` (looks backward), `LEAD(col, offset, default)` (looks forward), `FIRST_VALUE()`, `LAST_VALUE()`.
  - **Aggregate Window Functions:** `SUM(col) OVER (...)`, `AVG(col) OVER (...)`, `COUNT() OVER (...)`.
  - **Frame Specifications:** `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`, `ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING`, `RANGE` vs `ROWS` semantics.

### C. Database Normalization & Schema Design
- **Functional Dependencies:** $X \rightarrow Y$ (X uniquely determines Y).
- **Normal Forms:**
  - **1NF:** Atomic values, no repeating groups/arrays in a single column.
  - **2NF:** 1NF + No partial functional dependencies (every non-prime attribute must depend fully on the primary key, relevant for composite keys).
  - **3NF:** 2NF + No transitive dependencies (non-prime attributes must depend ONLY on super keys: $X \rightarrow Y$, $Y \rightarrow Z \implies X \rightarrow Z$ violation).
  - **BCNF (Boyce-Codd NF):** Strict 3NF; for every dependency $X \rightarrow Y$, $X$ MUST be a super key.
  - **4NF / 5NF:** Multi-valued dependencies and Join dependencies (theoretical / advanced).
- **Denormalization:** Read performance optimization trade-off vs Write anomalies (Insertion, Deletion, Update anomalies).

### D. ACID Properties & Transaction Management
- **ACID Definitions:**
  - **Atomicity:** All-or-nothing execution (supported by Undo Logs / Write-Ahead Logs).
  - **Consistency:** Database transitions from one valid state to another, maintaining constraints.
  - **Isolation:** Concurrent transactions execute without interfering with each other.
  - **Durability:** Committed changes persist despite system crashes (supported by Redo Logs / WAL).
- **Transaction Controls:** `BEGIN TRANSACTION`, `COMMIT`, `ROLLBACK`, `SAVEPOINT`.

### E. Concurrency Control & Isolation Levels
- **Read Phenomena:**
  - **Dirty Read:** Reading uncommitted data from another transaction that later rolls back.
  - **Non-Repeatable Read:** Re-reading the same row within a transaction returns different data because another transaction updated and committed it.
  - **Phantom Read:** Re-executing a range query returns new "phantom" rows inserted and committed by another transaction.

- **ANSI SQL Isolation Levels & Guarantees:**
  | Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read | Mechanism / Notes |
  |---|---|---|---|---|
  | **Read Uncommitted** | Allowed | Allowed | Allowed | No read locks / Dirty reads permitted |
  | **Read Committed** | Prevented | Allowed | Allowed | Read locks released immediately; MVCC snapshot per statement (Postgres default) |
  | **Repeatable Read** | Prevented | Prevented | Allowed | Shared locks held until end of tx; MVCC snapshot at start of tx |
  | **Serializable** | Prevented | Prevented | Prevented | Strict 2-Phase Locking (2PL) or Serializable Snapshot Isolation (SSI) |

- **MVCC (Multi-Version Concurrency Control):**
  - Tuple versioning (`xmin`, `xmax` in PostgreSQL).
  - Readers do not block writers; writers do not block readers.

### F. Indexing Structures & Query Optimization
- **B-Trees & B+ Trees:**
  - B+ Tree structure: Data pointers stored ONLY in leaf nodes; leaves linked sequentially for fast range scans.
  - Time Complexity: $O(\log N)$ search, insert, delete.
- **Hash Indexes:** $O(1)$ point lookups, no range query support (`WHERE id = 5` only, not `WHERE age > 25`).
- **Index Types:**
  - **Clustered Index:** Physical order of table rows matches index order (Primary key index in InnoDB; 1 per table).
  - **Non-Clustered (Secondary) Index:** Separate structure storing index key + pointer/primary key to main table row.
  - **Composite Index:** Multi-column index `(A, B, C)`. Follows **Leftmost Prefix Rule** (Index used for `WHERE A=1` or `WHERE A=1 AND B=2`, but NOT for `WHERE B=2`).
  - **Covering Index:** Index contains ALL columns requested in `SELECT`, eliminating the need to look up table rows ("Index Only Scan").
- **Execution Plans (`EXPLAIN` / `EXPLAIN ANALYZE`):**
  - **Node Types:** Sequential Scan (Table Scan), Index Scan, Index Only Scan, Bitmap Index Scan.
  - **Join Algorithms:**
    - **Nested Loop Join:** $O(M \times N)$ or $O(M \log N)$ with index. Best for small datasets or indexed joins.
    - **Hash Join:** Builds in-memory hash table on smaller relation, probes with larger relation. Best for large unindexed equality joins.
    - **Sort-Merge Join:** Sorts both inputs on join key, then merges. Best when inputs are already sorted or for range joins.

### G. Storage Engines & Internals
- **InnoDB (MySQL default):** Transactional, ACID-compliant, clustered index on PK, row-level locking, foreign key support, Redo log / Undo log.
- **PostgreSQL Storage:** Page layout (8KB pages), Heap files, Vacuuming (reclaiming dead tuples left by MVCC updates/deletes), Autonavuum daemon, Write-Ahead Logging (WAL).

---

## 3. Recommended Study Plan & Hour Allocations

| # | Topic Block | Target Hours | Core Objective |
|---|---|---|---|
| 1 | SQL Execution Order & Advanced JOINs | 8 h | Master execution flow, anti/semi joins, self joins |
| 2 | Window Functions & Aggregations | 12 h | Solve top-N, running totals, lag/lead patterns |
| 3 | CTEs, Subqueries & Recursive Queries | 8 h | Build hierarchical traversal queries |
| 4 | Normalization & ER Modeling | 6 h | Practice 1NF to BCNF decomposition & schema design |
| 5 | Transactions, ACID & Isolation Levels | 10 h | Understand MVCC, lock types, dirty/phantom reads |
| 6 | Indexing & B-Trees | 10 h | Master composite indexes, leftmost prefix rule, B+ Trees |
| 7 | Query Optimization & EXPLAIN Plans | 8 h | Debug slow queries, select appropriate join methods |
| **Total** | **DBMS & SQL Mastery** | **62 h** | **Complete 98%+ Interview Readiness** |

---

## 4. High-Frequency Interview Questions (2-3 YOE)

1. **Difference between `RANK()`, `DENSE_RANK()`, and `ROW_NUMBER()`?**
2. **What is the Leftmost Prefix Rule in Composite Indexes?**
3. **How does MVCC work in PostgreSQL/MySQL, and why does it prevent read locks?**
4. **Explain the difference between `WHERE` and `HAVING` clauses.**
5. **How would you find the 3rd Highest Salary in an Employee table using both Window Functions and Subqueries?**
6. **What are Dirty Reads, Non-Repeatable Reads, and Phantom Reads? Which isolation level prevents each?**
7. **Compare B-Tree vs Hash Indexing. When should you use which?**
8. **What is an Index Only Scan and how does a Covering Index enable it?**
9. **Explain Hash Join vs Nested Loop Join vs Sort-Merge Join in an Execution Plan.**

---

## Sources
- [VERIFIED 2026-07-26] https://sqlbolt.com/ — SQL execution order & query fundamentals
- [VERIFIED 2026-07-26] https://pgexercises.com/ — Window functions, recursive CTEs & aggregate queries
- [VERIFIED 2026-07-26] https://www.postgresql.org/docs/current/tutorial-window.html — Window function semantics & frame specifications
- [VERIFIED 2026-07-26] https://www.geeksforgeeks.org/dbms/commonly-asked-dbms-interview-questions/ — DBMS interview bank & transactions
- [VERIFIED 2026-07-26] https://www.geeksforgeeks.org/dbms/sql-interview-questions/ — Advanced SQL queries, CTEs, and execution plans
