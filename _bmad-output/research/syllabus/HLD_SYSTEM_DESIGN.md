# High-Level System Design (HLD) — Technical Syllabus (2026)

- **Produced by:** Technical & Domain Research Specialist
- **Date:** 2026-07-26
- **Question asked:** What is the 98%+ complete 2026 High-Level System Design (HLD) syllabus for 2-3 YOE backend and full-stack software engineers?
- **Method:** web search / doc fetch / curriculum synthesis
- **Confidence:** HIGH
- **Decay class:** SLOW
- **Supersedes:** nothing

---

## 1. Overview & Tier Requirements

High-Level System Design (HLD) evaluates an engineer's ability to architect distributed, scalable, fault-tolerant software systems. For 2-3 YOE candidates, expectations center on back-of-the-envelope quantitative estimation, choosing appropriate storage engines and caches, designing decoupling messaging layers, and explaining trade-offs using CAP/PACELC frameworks.

---

## 2. Topic Inventory & Core Building Blocks

### A. Scalability, Performance & Quantitative Estimation
- **Scaling Strategies:**
  - **Vertical Scaling (Scale-Up):** Adding CPU/RAM to a single machine. Hard hardware limit, single point of failure (SPOF).
  - **Horizontal Scaling (Scale-Out):** Adding more machines to a cluster. Requires stateless application tiers.
- **Stateful vs Stateless Tier:**
  - **Stateless:** Session data stored in external cache/DB (Redis). Any instance can handle any incoming request.
  - **Stateful:** Sticky sessions or local state. Harder to scale horizontally.
- **Latency vs Throughput:** Latency = time taken to complete a single operation (ms); Throughput = operations per second (QPS / RPS).
- **Availability SLAs:**
  - 99.9% ("Three Nines") = 8.76 hours downtime/year.
  - 99.99% ("Four Nines") = 52.6 minutes downtime/year.
  - 99.999% ("Five Nines") = 5.26 minutes downtime/year.
- **Back-of-the-Envelope Calculations:**
  - **QPS Estimation:** $1\text{ Million DAU} \times 10\text{ requests/day} = 10\text{ Million req/day} \approx 115\text{ QPS average}$ ($\text{Peak QPS} = 2 \times \text{Avg} \approx 230\text{ QPS}$).
  - **Storage Estimation:** $10\text{ Million posts/day} \times 1\text{ KB/post} = 10\text{ GB/day} = 3.65\text{ TB/year}$.
  - **RAM Estimation for Caching:** 20% of daily active data cached $\implies 10\text{ GB} \times 0.20 = 2\text{ GB RAM}$.

### B. Load Balancing & Traffic Routing
- **Layer 4 vs Layer 7 Load Balancing:**
  - **L4 (Transport):** Routes traffic based on IP address and TCP/UDP port (HAProxy, AWS NLB). Fast, high packet throughput, no content inspection.
  - **L7 (Application):** Routes traffic based on HTTP headers, URI paths, cookies (NGINX, AWS ALB). Enables path-based routing (`/api/v1/users`), SSL termination, sticky sessions.
- **Load Balancing Algorithms:** Round Robin, Weighted Round Robin, Least Connections, IP Hash.
- **Consistent Hashing:**
  - Solves key re-mapping issue when adding/removing cache nodes ($O(K/N)$ key movements instead of $O(K)$).
  - Uses a **Hash Ring** ($0$ to $2^{32}-1$).
  - **Virtual Nodes:** Assigns multiple virtual positions to a single physical server to ensure uniform key distribution and prevent hot-spotting.

### C. Caching Architecture & Redis
- **In-Memory Engines:** Redis (Single-threaded event loop, rich data structures: Strings, Hashes, Lists, Sets, Sorted Sets, Bitmaps, HyperLogLogs) vs Memcached (Multi-threaded, simple key-value).
- **Persistence Mechanisms (Redis):** RDB (Point-in-time snapshots) vs AOF (Append-only log of write commands) vs Hybrid.
- **Cache Read/Write Strategies:**
  - **Cache-Aside (Lazy Loading):** Application queries Cache; if Miss, queries DB and populates Cache.
  - **Write-Through:** Application writes to Cache; Cache synchronously updates DB.
  - **Write-Behind (Write-Back):** Application writes to Cache; Cache asynchronously flushes writes to DB in batches (high throughput, risk of data loss on crash).
  - **Read-Through:** Application reads only from Cache; Cache fetches from DB on miss transparently.
- **Eviction Policies:** LRU, LFU, FIFO, Random, TTL-based.
- **Cache Failures & Protection:**
  - **Cache Stampede (Thundering Herd):** Concurrent requests miss cache simultaneously and overwhelm DB. *Fix:* Distributed Mutex lock or probabilistic early expiration.
  - **Cache Penetration:** Requests for non-existent keys bypass cache repeatedly. *Fix:* Cache empty/null values or use **Bloom Filters**.
  - **Cache Avalanche:** Massive number of keys expire simultaneously. *Fix:* Add random jitter to TTLs.

### D. Database Scaling & Storage Architecture
- **SQL vs NoSQL Trade-offs:** Relational (ACID, schema-enforced, complex joins) vs Key-Value (Redis, DynamoDB), Document (MongoDB), Columnar (Cassandra, HBase), Graph (Neo4j).
- **Database Sharding (Horizontal Partitioning):**
  - **Strategies:** Range-based (by date/alphabet), Hash-based (`hash(user_id) % N`), Directory-based.
  - **Challenges:** Cross-shard joins are expensive, re-sharding overhead, distributed transactions.
- **Replication Architecture:**
  - **Master-Slave:** 1 Write Master, N Read Replicas. Improves read throughput.
  - **Replication Lag:** Asynchronous replication causes stale reads on replicas. *Fix:* Read-your-own-writes consistency (route user's own reads to Master for X seconds after write).

### E. CAP Theorem & PACELC Theorem
- **CAP Theorem:** In a distributed network partition (**P**), a system can guarantee either **Consistency (C)** (every read receives the most recent write or an error) OR **Availability (A)** (every request receives a non-error response, without guarantee that it contains the most recent write), but NOT both.
- **PACELC Theorem:**
  - If there is a **P**artition: trade-off between **A**vailability and **C**onsistency.
  - **E**lse (normal operation): trade-off between **L**atency and **C**onsistency.
  - *Examples:* MongoDB = PA/EC; DynamoDB = PA/EL.

### F. Message Queues & Event-Driven Architecture
- **Apache Kafka Architecture:**
  - **Topics & Partitions:** Topics divided into ordered, immutable append-only log Partitions distributed across Brokers.
  - **Offsets:** Sequential ID assigned to each message in a partition. Consumer groups track committed offsets.
  - **Producer Guarantees:** `acks=0` (no wait), `acks=1` (leader acknowledged), `acks=all` / `-1` (leader + all ISRs acknowledged).
  - **Semantics:** At-most-once, At-least-once (requires idempotent consumers), Exactly-once.
- **RabbitMQ vs Kafka:** AMQP Push broker (smart broker, dumb consumer, message deleted upon ACK) vs Distributed Commit Log Pull system (dumb broker, smart consumer, message retained for TTL).

### G. Microservices & API Gateways
- **Saga Pattern for Distributed Transactions:**
  - **Choreography:** Services publish events; other services listen and execute local transactions (Decentralized, event-driven).
  - **Orchestration:** Central Orchestrator coordinates transaction steps and triggers **Compensating Transactions** on failure.
- **API Gateway Responsibilities:** Dynamic Routing, Authentication (JWT/OAuth2), Rate Limiting, SSL Termination, Request Aggregation.
- **Resilience Patterns:**
  - **Circuit Breaker:** States: **Closed** (normal), **Open** (failing, fast-fail requests immediately), **Half-Open** (test probe requests to check backend recovery).
  - **Bulkhead:** Isolates resource pools (e.g., separate thread pools per downstream service).

---

## 3. Recommended Study Plan & Hour Allocations

| # | Topic Block | Target Hours | Core Objective |
|---|---|---|---|
| 1 | Quantitative Estimation & Scalability Basics | 6 h | Practice QPS, RAM, Storage & Bandwidth math |
| 2 | Load Balancing & Consistent Hashing | 8 h | Implement Consistent Hash ring & L4/L7 routing |
| 3 | Caching Strategies & Redis Internals | 10 h | Solve Cache Stampede, Penetration & Write-Back |
| 4 | Database Sharding, Replication & CAP/PACELC | 10 h | Master sharding keys, master-slave & PACELC |
| 5 | Message Queues & Kafka Deep Dive | 10 h | Design event streaming with Kafka & idempotency |
| 6 | Microservices, Saga Pattern & API Gateways | 10 h | Design Saga orchestration & Circuit Breaker |
| 7 | End-to-End System Design Practice | 12 h | Practice URL Shortener, Notification System, Rate Limiter |
| **Total** | **HLD System Design** | **66 h** | **Complete 98%+ Interview Readiness** |

---

## Sources
- [VERIFIED 2026-07-26] https://github.com/donnemartin/system-design-primer — Complete HLD reference manual
- [VERIFIED 2026-07-26] https://www.geeksforgeeks.org/system-design/top-low-level-system-designlld-interview-questions-2024/ — System design interview patterns
