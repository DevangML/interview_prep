# Technical Research: Cognizant Returnship (Python + Kafka + Java + SQL)
**Role ID:** 00068039437 · **Location:** Pune, India (Hybrid) · **Target Date:** October 2026

---

## 1. Role Anatomy & Interview Architecture

Cognizant’s Returnship (and associated lateral track) tests **Data Pipeline & Backend Integration Engineering**:
- **Core Stack:** Python + Apache Kafka + Java (Spring Boot) + Relational SQL.
- **Good-to-Have / System Context:** Microservices architecture, Spark, Cloud deployment (AWS/Azure), Docker.

### The 4-Stage Interview Process:
1. **Assessment / Technical Screening (Mettl / HackerRank):**
   - Core SQL query optimization (Window functions, CTEs, self-joins, indexing).
   - Core Java & Python coding constructs (Collections, HashMaps, concurrency, OOP vs functional paradigms).
2. **Technical Round 1 (Deep Dive - Systems & Languages):**
   - **Java / Spring Boot:** HashMap internal collision resolution, garbage collection, RESTful API contract design, Spring bean lifecycle, `@Transactional` boundaries.
   - **Python:** Data manipulation (generators, decorators, GIL, async processing).
   - **SQL Performance:** Explain plans, clustered vs non-clustered indexes, normalization vs denormalization for OLTP vs OLAP.
3. **Technical Round 2 (Event-Driven Streaming & Architecture):**
   - **Kafka Deep Dive:** Topic partitions, consumer group rebalancing, offset commit strategies (at-least-once vs exactly-once), broker replication, handling lag, dead-letter queues (DLQ).
   - **Integration / Microservices:** How Python and Java services communicate via Kafka topics, idempotency, transaction outbox pattern.
4. **Managerial / Program Fit Round:**
   - Deep architectural walkthrough of your end-to-end project.
   - Justification of technology choices (e.g., "Why Kafka over RabbitMQ?", "Why Java for the API and Python for processing?").

---

## 2. The Unified Capstone Project: "EventPulse — Distributed Telemetry & Anomaly Pipeline"

To hit **100% of the required and good-to-have skills** in **one clean, lightweight project** that you can build without feeling overwhelmed:

### The Architecture:
```
[External Sources]
       │
       ▼
[1. Java Spring Boot Ingestion Service] (Java 17 / 21)
       │  - REST endpoint /auth
       │  - Validates payload
       │  - Produces event to Kafka topic: `telemetry-raw`
       ▼
[2. Apache Kafka Cluster] (Docker Compose / KRaft mode)
       │  - Topic: `telemetry-raw` (Partitioned)
       │  - Topic: `telemetry-alerts` (DLQ / Filtered)
       ▼
[3. Python Stream Worker / Anomaly Detector] (Python 3.11+)
       │  - Kafka Consumer Group
       │  - Batch aggregation & anomaly scoring algorithm
       │  - Writes processed records to PostgreSQL
       ▼
[4. PostgreSQL Database] (Relational SQL Layer)
       │  - Schema with indexed time-series logs & alerts
       │  - Complex SQL queries: 95th percentile latency, window functions
       ▼
[5. Java / Python Reporting API & Scrimba UI View]
```

---

## 3. How It Maps to Interview Topics

| Skill Requirement | Where It Lives in "EventPulse" | Exact Interview Questions Defended |
|---|---|---|
| **Java** | `IngestionService`: Spring Boot REST controller, Producer configuration. | HashMap internals, multi-threading in Spring, exception handling, DTO validation. |
| **Kafka** | Event backbone connecting Java & Python services. | Partitions, Consumer offsets, Consumer Group rebalance, backpressure, message serialization (JSON/Avro). |
| **Python** | `AnomalyWorker`: Python consumer service with data processing. | Python generators, memory management, multiprocessing vs asyncio, dictionary hashing. |
| **SQL** | PostgreSQL relational schema (`events`, `alerts`, `nodes`). | Window functions (`ROW_NUMBER()`, `RANK()`), Index types (B-Tree), query optimization with `EXPLAIN ANALYZE`. |
| **Microservices / Cloud** | Docker Compose multi-container setup. | Service discovery, container networking, graceful shutdown, health checks. |

---

## 4. 14-Day "Brain-Off" Execution Plan

- **Phase 1 (Days 1–3):** Docker Compose environment (PostgreSQL + Kafka KRaft) + SQL Schema design.
- **Phase 2 (Days 4–6):** Java Spring Boot Producer service.
- **Phase 3 (Days 7–9):** Python Consumer & Anomaly Detector.
- **Phase 4 (Days 10–12):** SQL performance queries & Kafka failure injection (testing lag & retries).
- **Phase 5 (Days 13–14):** Spoken interview walkthrough & STAR story preparation.
