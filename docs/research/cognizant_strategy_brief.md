# Strategy Brief: Cognizant Returnship Alignment
**Target Role:** Cognizant Returnship - Python+Kafka+Java /SQL (Pune, India)
**Role ID:** 00068039437

---

## 1. The Role vs. The Reality (Gap Analysis)

### What the Role Demands (The Inference)
This is a **Backend Data-Streaming & Integration Role**. Cognizant needs engineers who can build and maintain high-throughput enterprise pipelines. 
*   **The Core Stack:** Java (Spring Boot) + Python + Apache Kafka + Advanced SQL.
*   **The Hidden Requirement:** They are looking for *distributed systems* thinking. It's not just "Can you write Java?" It's "Do you know what happens when a Kafka broker dies while a Spring Boot app is sending data to a Python worker?"

### What Your Resume Shows (The Reality)
*   **Strengths:** You are a proven builder. You have shipped production SaaS (React/Next.js, Vue). You have built offline-first concurrency on mobile (Flutter). You have backend experience with Frappe/Python and Node.js.
*   **The Danger Gap:** You lack explicit, enterprise-scale **Java (Spring Boot)** and **Apache Kafka** on your resume. 
*   **The Interview Risk:** If an interviewer looks at your resume, they will immediately test your depth on Java memory models (HashMap, GC) and Kafka mechanics (Offsets, DLQs) to ensure you aren't just a frontend engineer trying to bluff a backend role.

---

## 2. The Narrative Pivot

You cannot walk into the interview and say, *"I am a React/Flutter developer learning Kafka."*

Instead, you use your **ElasticRun WMS (Warehouse Management) and IAM experience** as the anchor, and present yourself as a **Full-Stack Engineer transitioning to Data Pipelines**:
> *"At ElasticRun, I dealt with high-volume, concurrent edge data (barcode scanners, OCR, offline-sync). To scale telemetry and anomaly detection for systems like that, I transitioned into distributed backend pipelines. I recently engineered **EventPulse**, a decoupled architecture using Java Spring Boot for high-throughput ingestion, Apache Kafka for partitioned streaming, and Python for CPU-bound anomaly detection, backed by PostgreSQL."*

---

## 3. The "EventPulse" Execution Plan (14 Days)

To survive the 25 ultra-deep technical questions they will ask, you will build **EventPulse**—a single, unified project that forces you to use every technology exactly how it is used in production.

### Phase 1: Infrastructure & Data Layer (Days 1-3)
*   **Action:** Spin up Postgres and Kafka (KRaft mode) via Docker. Design the `telemetry_events` schema.
*   **Interview Skill Acquired:** Advanced SQL. You will write Window Functions (`DENSE_RANK`, `LAG`) and create B-Tree indexes, proving you know how to optimize relational queries (`EXPLAIN ANALYZE`).

### Phase 2: High-Throughput Ingestion (Days 4-6)
*   **Action:** Build a Java 17 Spring Boot REST API that receives JSON payloads, validates them, and produces messages to a Kafka topic (`telemetry-raw`).
*   **Interview Skill Acquired:** Core Java & Spring Boot. You will master `@Transactional` outbox patterns, dependency injection, and understand how the JVM handles object creation and Garbage Collection under load.

### Phase 3: The Distributed Worker (Days 7-9)
*   **Action:** Build a Python consumer script that listens to Kafka, processes batches using generators, and writes clean data to PostgreSQL. Bad data goes to a Dead Letter Queue (DLQ).
*   **Interview Skill Acquired:** Python Concurrency & Kafka Mechanics. You will learn manual offset commits (Exactly-Once Semantics), how the GIL affects processing, and how Kafka Consumer Groups rebalance.

### Phase 4: Failure Injection & Mock Viva (Days 10-14)
*   **Action:** We break the system. We kill a Kafka broker. We send poison-pill JSON. We simulate network latency.
*   **Interview Skill Acquired:** Architectural defense. When the interviewer asks, *"How do you handle a crashed consumer?"*, you will answer from actual experience, not a textbook.
