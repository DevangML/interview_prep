# SQL MOCK INTERVIEW: 10 Questions
## Practice Before Gate 1 (Use on Day 8-9)
**Format:** Solve cold, time yourself, explain reasoning

---

## EASY (5 Questions) — 15-25 min total

### EASY 1: Basic JOIN + Aggregation
**Table Schema:**
```
orders (id, customer_id, amount, date)
customers (id, name, country)
```

**Question:** "For each country, find the total revenue and count of orders."

**Expected Output:** country | total_revenue | order_count

**Time:** 5 min | **Pattern:** GROUP BY, JOIN

**Answer:**
```sql
SELECT c.country, SUM(o.amount) as total_revenue, COUNT(o.id) as order_count
FROM orders o
JOIN customers c ON o.customer_id = c.id
GROUP BY c.country
ORDER BY total_revenue DESC;
```

**Trap:** Using COUNT(*) instead of COUNT(o.id) (counts NULLs differently)

---

### EASY 2: DISTINCT + Filtering
**Table Schema:**
```
users (id, name, country, age)
```

**Question:** "How many unique countries do we have users from, where users are over 21?"

**Expected Output:** country_count (single number)

**Time:** 3 min | **Pattern:** DISTINCT, WHERE, COUNT

**Answer:**
```sql
SELECT COUNT(DISTINCT country) as country_count
FROM users
WHERE age > 21;
```

**Trap:** COUNT(DISTINCT country) vs DISTINCT then COUNT (order matters)

---

### EASY 3: Self-Join
**Table Schema:**
```
employees (id, name, manager_id, salary)
```

**Question:** "Find all employees who earn more than their manager."

**Expected Output:** employee_name | manager_name | employee_salary | manager_salary

**Time:** 5 min | **Pattern:** SELF-JOIN

**Answer:**
```sql
SELECT e.name as employee_name, m.name as manager_name, e.salary as employee_salary, m.salary as manager_salary
FROM employees e
JOIN employees m ON e.manager_id = m.id
WHERE e.salary > m.salary;
```

**Trap:** Forgetting the join condition ON e.manager_id = m.id

---

### EASY 4: LEFT JOIN + IS NULL (Anti-Join Pattern)
**Table Schema:**
```
customers (id, name)
orders (id, customer_id, amount)
```

**Question:** "Find all customers who have NEVER placed an order."

**Expected Output:** customer_id | name

**Time:** 5 min | **Pattern:** ANTI-JOIN (LEFT JOIN + IS NULL)

**Answer:**
```sql
SELECT c.id, c.name
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;
```

**Trap:** Using INNER JOIN (won't show customers with no orders)
**Trap:** Using WHERE o.customer_id IS NULL (wrong column, less reliable)

---

### EASY 5: ORDER BY + LIMIT (Top-N)
**Table Schema:**
```
products (id, name, price, stock)
```

**Question:** "Get the top 5 most expensive products."

**Expected Output:** name | price

**Time:** 3 min | **Pattern:** ORDER BY DESC, LIMIT

**Answer:**
```sql
SELECT name, price
FROM products
ORDER BY price DESC
LIMIT 5;
```

**Trap:** Forgetting DESC (ascending by default)

---

---

## MEDIUM (3 Questions) — 45-60 min total

### MEDIUM 1: Window Functions (ROW_NUMBER for Top-N Per Group)
**Table Schema:**
```
sales (id, region, product, revenue, date)
```

**Question:** "For each region, find the top 3 products by revenue."

**Expected Output:** region | product | revenue | rank

**Time:** 15 min | **Pattern:** Window function (ROW_NUMBER, PARTITION BY), CTE

**Answer:**
```sql
WITH ranked_sales AS (
  SELECT region, product, revenue,
    ROW_NUMBER() OVER (PARTITION BY region ORDER BY revenue DESC) as rn
  FROM sales
)
SELECT region, product, revenue, rn
FROM ranked_sales
WHERE rn <= 3;
```

**Trap:** Forgetting PARTITION BY (ranks across all regions, not per region)
**Trap:** Using RANK() instead of ROW_NUMBER() (ties cause problems)
**Trap:** Not wrapping in CTE (can't filter on window function directly)

---

### MEDIUM 2: Date/Time + Aggregation (Monthly Retention)
**Table Schema:**
```
events (user_id, event_type, date)
```

**Question:** "Calculate monthly retention: for each month, what % of users from the previous month were active again?"

**Expected Output:** month | users_month_1 | users_both_months | retention_rate

**Time:** 20 min | **Pattern:** CTE, DATE_TRUNC, JOINs, window functions

**Answer:**
```sql
WITH monthly_active_users AS (
  SELECT DISTINCT DATE_TRUNC('month', date) as month, user_id
  FROM events
  WHERE event_type = 'login'
)
SELECT 
  m1.month,
  COUNT(DISTINCT m1.user_id) as users_month_1,
  COUNT(DISTINCT m2.user_id) as users_both_months,
  ROUND(COUNT(DISTINCT m2.user_id)::numeric / COUNT(DISTINCT m1.user_id) * 100, 2) as retention_rate
FROM monthly_active_users m1
LEFT JOIN monthly_active_users m2 
  ON m2.user_id = m1.user_id 
  AND m2.month = m1.month + INTERVAL '1 month'
GROUP BY m1.month
ORDER BY m1.month;
```

**Trap:** Not using DISTINCT (duplicate events per user per month)
**Trap:** Wrong date arithmetic (m1.month + 1 doesn't work with TIMESTAMP, need INTERVAL)
**Trap:** Using INNER JOIN instead of LEFT JOIN (loses users who didn't return)
**Trap:** Duplicate explosion (missing GROUP BY on user_id)

---

### MEDIUM 3: Window Function (Running Total) + Filtering
**Table Schema:**
```
daily_sales (date, amount)
```

**Question:** "For each day, calculate the running total of sales. Only show days where the running total exceeded $10,000 for the first time."

**Expected Output:** date | amount | running_total

**Time:** 15 min | **Pattern:** Window function (SUM OVER), filtering, CTE

**Answer:**
```sql
WITH running_totals AS (
  SELECT date, amount,
    SUM(amount) OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as running_total
  FROM daily_sales
)
SELECT date, amount, running_total
FROM running_totals
WHERE running_total >= 10000
  AND (running_total - amount) < 10000;
```

**Trap:** Wrong ROWS BETWEEN (default is different behavior)
**Trap:** Only filtering WHERE running_total > 10000 (shows all days after threshold; need the "first time" condition)
**Trap:** Using SUM(amount) OVER (ORDER BY date) without ROWS BETWEEN (default window changes meaning)

---

---

## HARD (2 Questions) — 30-40 min total

### HARD 1: Complex Join + Window Functions (Business Case)
**Table Schema:**
```
users (id, name, signup_date)
purchases (id, user_id, amount, date)
```

**Question:** "For each user, find: (a) their first purchase date, (b) their total spending, (c) their most recent purchase, (d) a 30-day rolling average of spending. Show only users with >2 purchases."

**Expected Output:** user_id | name | first_purchase | total_spending | most_recent_purchase | rolling_30d_avg

**Time:** 20 min | **Pattern:** Window functions, CTEs, multiple aggregations

**Answer:**
```sql
WITH user_purchases AS (
  SELECT 
    u.id, u.name, p.amount, p.date,
    MIN(p.date) OVER (PARTITION BY u.id) as first_purchase,
    MAX(p.date) OVER (PARTITION BY u.id) as most_recent_purchase,
    SUM(p.amount) OVER (PARTITION BY u.id) as total_spending,
    AVG(p.amount) OVER (PARTITION BY u.id ORDER BY p.date ROWS BETWEEN 30 PRECEDING AND CURRENT ROW) as rolling_30d_avg,
    COUNT(*) OVER (PARTITION BY u.id) as purchase_count
  FROM users u
  JOIN purchases p ON u.id = p.user_id
)
SELECT DISTINCT id, name, first_purchase, total_spending, most_recent_purchase, rolling_30d_avg
FROM user_purchases
WHERE purchase_count > 2
ORDER BY id;
```

**Trap:** ROWS BETWEEN 30 PRECEDING (assumes 30 rows, not 30 days — need date-based window)
**Trap:** Duplicate rows (multiple purchases per user means DISTINCT needed, or GROUP BY carefully)
**Trap:** Wrong window partitioning (need per-user calculations, not global)

---

### HARD 2: Multi-Layer (Anomaly Detection)
**Table Schema:**
```
order_metrics (date, region, daily_orders, daily_revenue)
```

**Question:** "Detect anomalies: for each region, find days where daily revenue is >2 standard deviations above the 30-day rolling average."

**Expected Output:** date | region | daily_revenue | rolling_avg | std_dev | anomaly_score

**Time:** 20 min | **Pattern:** Window functions, statistical logic, CTEs

**Answer:**
```sql
WITH rolling_stats AS (
  SELECT 
    date, region, daily_revenue,
    AVG(daily_revenue) OVER (PARTITION BY region ORDER BY date ROWS BETWEEN 30 PRECEDING AND CURRENT ROW) as rolling_avg,
    STDDEV_POP(daily_revenue) OVER (PARTITION BY region ORDER BY date ROWS BETWEEN 30 PRECEDING AND CURRENT ROW) as rolling_stddev
  FROM order_metrics
)
SELECT 
  date, region, daily_revenue, rolling_avg, rolling_stddev,
  ROUND((daily_revenue - rolling_avg) / NULLIF(rolling_stddev, 0), 2) as anomaly_score
FROM rolling_stats
WHERE (daily_revenue - rolling_avg) > 2 * rolling_stddev
  AND rolling_stddev IS NOT NULL
ORDER BY date, region;
```

**Trap:** STDDEV_POP vs STDDEV_SAMP (population vs sample; for anomaly detection, use SAMP)
**Trap:** Division by zero (NULLIF(rolling_stddev, 0))
**Trap:** NULL values in rolling window (affects calculations)
**Trap:** Wrong window frame (need same frame for both AVG and STDDEV)

---

---

## SCORING GUIDE

| Questions Solved | Score | Verdict |
|---|---|---|
| 8-10 | 80-100 | ✅ PASS (Gate 1 ready) |
| 6-7 | 60-79 | ⚠️ Marginal (drill weak patterns) |
| 4-5 | 40-59 | ❌ Not ready (more practice) |
| <4 | <40 | ❌ Major gaps (Day 11 recommended) |

---

## STUDY STRATEGY

**Day 8:** Solve EASY 1-5 (should take <25 min total)
**Day 8:** Solve MEDIUM 1-3 (should take <60 min total)

**Day 9:** Solve HARD 1-2 (should take <40 min total)

**If you score 8-10:** You're ready for Senku Diagnostic
**If you score 6-7:** Drill MEDIUM patterns for 1 hour, then Senku Diagnostic
**If you score <6:** Extend Day 9 into a Day 10, drill medium/hard patterns, reschedule Diagnostic to Day 11

---

**Remember:** Cold, no hints, pseudocode first. This is practice for the real thing. ⚡
