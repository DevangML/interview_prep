---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments:
  - cs-museum/PROJECT-CONTEXT.md
  - cs-museum/corpus/catalog/languages.py
  - cs-museum/corpus/concept_atlas/COMPLETENESS-CONTRACT.md
  - cs-museum/corpus/concept_atlas/generated/coverage.json
  - _bmad-output/planning-artifacts/research/technical-cross-language-concept-atlas-research-2026-09-05.md
workflowType: 'research'
lastStep: 6
research_type: 'technical'
research_topic: 'Bedrock-to-HCI concept inventory sized for 2026 job-relevant languages'
research_goals: 'Produce a defensible count of distinct concepts (shared lattice nodes) from silicon/ISA through OS, language, frameworks, UI/UX and HCI, covering every job-relevant 2026 language as columns/cells rather than duplicated trees; separate concept vs subtopic vs nuance; reject 5,200 unknown cells as the inventory target.'
user_name: 'Devang'
date: '2026-09-05'
web_research_enabled: true
source_verification: true
---

# Research Report: technical

**Date:** 2026-09-05
**Author:** Devang
**Research Type:** technical

---

## Research Overview

This research sizes a **finite shared lattice** of computing problems from silicon through HCI, using 2026 job languages as **columns**, not as duplicated trees. CS2023 exists because unbounded topic lists are unteachable: it freezes a CS Core of **270 instructional hours** across **17 knowledge areas** and ~**162 knowledge units**, then lets programs deepen some areas (sunflower model). The same move applies here: freeze rows that are distinct *problems*, attach 70 languages as evidence cells, and refuse 5,200 unknown cells as a success metric.

**Headline result (synthesis):** freeze **160** concept rows (defensible band **140–180**). Full KA-core extras may grow to **~250**. Copying CS2023’s ~1,300 topics, CSS modules, or HTML elements is rejected. Details, citations, and the implementation strangler live in **Research Synthesis** below.

**Method:** web-verified stack (SO 2025, TIOBE 2026), IETF/gRPC/CloudEvents/OAuth, CS2023 + Tanenbaum + Hennessy/Patterson + Norman/NN/g, plus this repo’s 70-language catalog and completeness contracts.

---

## Technical Research Scope Confirmation

**Research Topic:** Bedrock-to-HCI concept inventory sized for 2026 job-relevant languages
**Research Goals:** Produce a defensible count of distinct concepts (shared lattice nodes) from silicon/ISA through OS, language, frameworks, UI/UX and HCI, covering every job-relevant 2026 language as columns/cells rather than duplicated trees; separate concept vs subtopic vs nuance; reject 5,200 unknown cells as the inventory target.

**Technical Research Scope:**

- Architecture Analysis - design patterns, frameworks, system architecture
- Implementation Approaches - development methodologies, coding patterns
- Technology Stack - languages, frameworks, tools, platforms
- Integration Patterns - APIs, protocols, interoperability
- Performance Considerations - scalability, optimization, patterns

**Research Methodology:**

- Current web data with rigorous source verification
- Multi-source validation for critical technical claims
- Confidence level framework for uncertain information
- Comprehensive technical coverage with architecture-specific insights

**Scope Confirmed:** 2026-09-05

**Customizations locked with this confirmation:**

- Inventory unit is a **transferable problem**, not a language handbook chapter and not a `(language × concept)` cell.
- Job languages in this repo: **70** (`cs-museum/corpus/catalog/languages.py`, `count` = 70).
- 5,200 unknown atlas cells are **out of scope as a success metric**.
- Layer spine for later counting: `layer_silicon` → `layer_hci` (eight stages in `cs-museum/app/src/lib/stages.ts`).

---

## Technology Stack Analysis

### Programming Languages

Job relevance in 2026 is **not** one ranking. Two public instruments disagree on order because they measure different things: **self-reported professional use** versus **search/course/vendor signal**.

_Popular Languages:_ Stack Overflow’s 2025 Developer Survey (49,009 respondents, 29 May–23 June 2025) remains the source of record for this project’s catalog. Statista’s table of that survey lists **JavaScript 66%**, **HTML/CSS 61.9%**, **SQL 58.6%**, **Python 57.9%**, **Bash/Shell 48.7%**, **TypeScript 43.6%**, then Java 29.4%, C# 27.8%, C++ 23.5%, PowerShell 23.2%, C 22.0%, PHP 18.9%, Go 16.4%, Rust 14.8%, Kotlin 10.8%, and Dart 5.9% / Swift 5.4% in the mobile band. Official survey landing: https://survey.stackoverflow.co/2025/ . Language table (secondary, cites SO): https://www.statista.com/statistics/793628/worldwide-developer-survey-most-used-languages/ . The catalog **splits HTML and CSS** because SO reports them as one row; their cells cannot share a heap/thread story (`languages.py` notes).

_Emerging Languages:_ The same SO table already includes Zig (2.1%), Gleam (1.1%), Mojo (0.4%). TIOBE August 2026 (search-index, not jobs) puts **Rust at #10** (1.45%) after entering the top 10 in July 2026; Python remains #1 at 18.53% with a large year-over-year **drop** in TIOBE rating (−7.61 pp). Primary: https://www.tiobe.com/TIOBE-Index/ . Commentary: https://www.techrepublic.com/article/news-tiobe-august-2026-java-nears-c-plus-plus/ .

_Language Evolution:_ Admiration (SO 2025 secondary write-up) still clusters on **Rust, Gleam, Elixir, Zig** — safety and DX, not occupancy of the job-volume top five. Python’s SO adoption rose ~7 pp YoY (official survey narrative), while TIOBE shows Python’s **search** share cooling. Those are compatible: AI/data work can widen *use* while *index* mean-reverts. Source: https://survey.stackoverflow.co/2025/ ; Itequia recap https://itequia.com/stack-overflow-2025-where-is-technological-development-heading .

_Performance Characteristics:_ For the lattice, languages collapse into **runtime kinds** already in the catalog: `general`, `markup`, `stylesheet`, `query`, `shell`, `data`, `hardware`, `bytecode`, `dsl`. HTML, CSS, SQL, GraphQL, Terraform/HCL, YAML are **absent_by_design** on heap/threads. Assembly/CUDA/VHDL/Verilog sit on ISA/HDL nodes, not GC nodes. This is why 70 languages do **not** imply 70 garbage-collection concepts.

_Inventory implication (high confidence):_ columns = 70 job languages; rows must be **shared**. Multiplying by handbook TOC is the failure mode this research is sized to prevent.

_Source:_ https://survey.stackoverflow.co/2025/ ; https://www.statista.com/statistics/793628/worldwide-developer-survey-most-used-languages/ ; https://www.tiobe.com/TIOBE-Index/ ; `cs-museum/corpus/catalog/languages.py`

### Development Frameworks and Libraries

Frameworks are **upper-layer products**. They attach to a small set of shared concepts (component tree, SSR vs CSR, routing, DI, ORM, actor supervision), not one concept ID per brand.

_Major Frameworks:_ Statista’s SO 2025 web-framework table: **Node.js 48.7%**, **React 44.7%**, jQuery 23.4%, **Next.js 20.8%**, Express 19.9%, ASP.NET Core 19.7%, Angular 18.2%, Vue.js 17.6%, FastAPI 14.8%, Spring Boot 14.7%, Flask 14.4%, Django 12.6%. Source: https://www.statista.com/statistics/1124699/worldwide-developer-survey-most-used-frameworks-web/ . Official SO technology section (same survey, charts): https://survey.stackoverflow.co/2025/technology . Secondary recaps disagree slightly on percents (e.g. React 46.9% vs 44.7%) depending on whether they quote all-respondents vs professional slice; treat ±2–3 pp as **medium confidence** unless reading the official chart.

_Micro-frameworks:_ Fastify, Axum, Phoenix, NestJS, Svelte, Astro, Hono appear in the long tail of the same table (Phoenix ~2.4% use but high **admiration** on the official SO page). They share **event loop / actor / HTTP handler** concepts with Express/Phoenix/Axum; they are not new bedrock nodes.

_Evolution Trends:_ Next.js climbing toward Express occupancy is a **deployment/rendering** shift (SSR, RSC), not a new programming-language concept. FastAPI’s rise is the same **async HTTP + OpenAPI types** problem Python already had under Flask, with different defaults.

_Ecosystem Maturity:_ React + Node + a Python API + Spring/.NET remain the 2026 job surface. Flutter/Dart, SwiftUI, Jetpack Compose belong as **SPD (specialized platform)** leaves, not as duplicates of “virtual DOM.”

_Inventory implication:_ frameworks add **tens** of shared UI/runtime concepts (component model, reconciliation, effects, SSR hydration, DI, request lifecycle), not hundreds of language-specific trees. CS2023 already isolates this as **Specialized Platform Development (SPD)** plus **HCI** and **GIT**, not as FPL.

_Source:_ https://www.statista.com/statistics/1124699/worldwide-developer-survey-most-used-frameworks-web/ ; https://survey.stackoverflow.co/2025/technology

### Database and Storage Technologies

_Relational Databases:_ PostgreSQL leads SO 2025 professional use in secondary reports at **~55.6–58.2%** (all vs professional slice). MySQL ~40%, SQLite ~37%, Microsoft SQL Server ~30–31%. Primary survey: https://survey.stackoverflow.co/2025/technology . i-Programmer excerpt of official commentary: https://www.i-programmer.info/news/99-professional/18213-what-does-stack-overflows-survey-tell-us.html .

_NoSQL Databases:_ MongoDB ~24% in secondary tables; still a document-model column, not a second SQL concept. GraphQL in the language catalog is a **query language** over a host runtime (`absent_by_design` for heap).

_In-Memory Databases:_ Redis is the 2025 story: ~28–31% use, +8 pp called out by SO commentary; 43% among respondents who manage **AI agent memory**. Sources: i-Programmer above; https://survey.stackoverflow.co/2025/ai .

_Data Warehousing:_ Not a SO top-line in the excerpts used here. For the lattice, warehousing collapses to **storage engine, execution plan, isolation, replication** already in CS2023 **Data Management (DM)** (13 knowledge units on the CS2023 mockup table).

_Inventory implication:_ SQL / T-SQL / PL/SQL are **three columns**, one **query + engine** concept family. Redis adds **in-memory data structure / cache / pub-sub** nodes, not a new language.

_Source:_ https://survey.stackoverflow.co/2025/technology ; https://www.i-programmer.info/news/99-professional/18213-what-does-stack-overflows-survey-tell-us.html ; https://survey.stackoverflow.co/2025/ai

### Development Tools and Platforms

_IDE and Editors:_ Visual Studio Code **75.9%** in SO 2025; Visual Studio ~29%; IntelliJ IDEA ~27.1%; Vim ~24.3%. Wikipedia citing SO: https://en.wikipedia.org/wiki/Visual_Studio_Code . Official: https://survey.stackoverflow.co/2025/technology . AI-native editors (Cursor, Claude Code) appear in the same survey as **want-to-use** competitors, not replacements.

_Version Control:_ Git is assumed universal; not re-surveyed here. Concept: **distributed snapshot DAG**, one node.

_Build Systems:_ Language-specific (Cargo, Gradle, npm, CMake, LLVM) are **compilation-linkage** cells under a shared **IR / linking / ABI** concept. LLVM is already named on `layer_compilation` in the app.

_Testing Frameworks:_ Out of this step’s primary sources; treat as **SE knowledge area** later, not as language concepts.

_Source:_ https://survey.stackoverflow.co/2025/technology ; https://en.wikipedia.org/wiki/Visual_Studio_Code

### Cloud Infrastructure and Deployment

_Major Cloud Providers:_ SO 2025 press: among cloud/infra technologies, **Docker 71%** (+17 pp YoY, largest jump; SO notes some **sector consolidation** so treat the jump as **medium confidence** for true adoption vs survey redesign), **npm 57%**, **AWS 43%**. Source: https://stackoverflow.co/company/press/archive/stack-overflow-2025-developer-survey/ . Official cloud charts: https://survey.stackoverflow.co/2025/technology .

_Container Technologies:_ Docker near-universal in that slice; Kubernetes remains the orchestration standard across AKS/EKS/GKE (industry, not a single SO percent in the snippets retrieved). Terraform/HCL and YAML are catalog **DSL columns** with honest `absent_by_design` for heap/threads.

_Serverless Platforms:_ Not quantified in the snippets used; conceptually **FaaS = event-driven runtime + cold start**, already an FPL/event-driven + cloud ops overlap — do not mint a concept per vendor (Lambda vs Cloud Functions).

_CDN and Edge Computing:_ Next.js / Cloudflare / Deno sit on **edge execution** as a deployment nuance of the same JS runtime concepts.

_Source:_ https://stackoverflow.co/company/press/archive/stack-overflow-2025-developer-survey/ ; https://survey.stackoverflow.co/2025/technology

### Technology Adoption Trends

_Migration Patterns:_ Job-volume languages (JS/TS, Python, SQL, Java, C#) are stable. Search-index (TIOBE) still over-weights C/C++/Java relative to SO’s web-heavy sample. **Do not** drop HTML/CSS/SQL because TIOBE ranks them differently.

_Emerging Technologies:_ Rust’s TIOBE top-10 (July–August 2026) plus SO admiration; AI-tooling (84% using or planning; 51% of professionals daily — official survey) changes **how** concepts are learned, not which ISA/GC/type nodes exist. Sources: https://survey.stackoverflow.co/2025/ ; https://www.tiobe.com/TIOBE-Index/ .

_Legacy Technology:_ MATLAB exits TIOBE top 20 (August 2026) while remaining in the SO long tail (3.9%) and in this catalog for jobs. COBOL/ABAP/Apex/VBA stay as **columns** with thin but real job notes.

_Community Trends:_ Documentation remains the #1 learning surface (secondary: 68% rely on docs — Tech Elevator citing SO). That supports **evidence-led cells**, not generated essays.

### External lattices that already bound concept cardinality

These are **not** the freeze number (later steps). They are the published upper/lower bounds this stack maps onto.

| Published lattice | Grain | Count | Role vs this inventory |
| --- | --- | --- | --- |
| CS2023 knowledge areas | Area | **17** | Layer clusters (AR, OS, FPL, HCI, SPD, …). Source: https://csed.acm.org/knowledge-areas/ ; intro PDF https://csed.acm.org/wp-content/uploads/2024/04/1.3-Introduction-to-Knowledge-Model.pdf |
| CS2023 knowledge units | Unit | **~161–162** | Closest analog to “concept families.” Mockup table totals **162** KUs. https://csed.acm.org/mockup-cs2023/ |
| CS2023 topics | Topic | **~1,300** (422 CS Core / 538 KA Core / 340 Non-core) | Includes math, ethics, SE process — **too wide** if copied wholesale. Independent extraction: https://arxiv.org/html/2606.19469v1 |
| CS2023 FPL | Units | **22** KUs, **21 CS Core + 19 KA Core hours** | Language-problem spine (OOP, FP, types, translation, runtime, …). Same mockup table. |
| CS2023 HCI | Units | **6** KUs, **8 + 16 hours** | Upper bound for interaction concepts at curriculum grain. |
| CS2023 AR / OS | Units | **11 / 14** | Bedrock + kernel families. |
| HOPL III paradigms | Classes | **5** (OO, functional, scripting, reactive, parallel) | Too coarse; HOPL is history of languages, not an inventory. https://en.wikipedia.org/wiki/History_of_Programming_Languages_(conference) |
| WHATWG HTML | Spec chapters | ~10 major sections | Markup is **one language column** + a handful of document/DOM concepts, not one concept per element. https://html.spec.whatwg.org/multipage/introduction.html (§1.9) |
| CSS Snapshot 2024 | Modular specs | Many modules; **official CSS is a profile of modules, not CSS Level 4** | Layout/cascade/containment are concepts; each CSS module is not a lattice node. https://www.w3.org/TR/2025/NOTE-css-2024-20250225/ |
| Nielsen 10 heuristics | Heuristics | **10** | HCI evaluation rules; 2020 refinement still cited in 2025. https://www.nngroup.com/articles/ten-usability-heuristics/ (canonical; secondary recaps agree on the ten names) |
| This app (today) | Authored leaves | **18** | Far below FPL-alone. |
| Frozen atlas | IDs | **200** | Mix of real problems and scaffold tokens — not a validated count. |

**Confidence:** CS2023 KA/KU/hour table **high** (ACM/IEEE-CS/AAAI). SO percents **high** for order-of-magnitude, **medium** for exact professional vs all-respondent. TIOBE **high** as a search index, **low** as a job-language census. CSS module count **not** used as concept count (would explode the lattice).

**Quality assessment / gaps for later steps:** exact CS2023 topic list per KU not copied into this file; CSS “official definition” module list not enumerated; Flutter/SwiftUI/Compose need SPD mapping in architecture step; no single 2026 “all job languages” survey besides this repo’s SO+job-board union.

---

## Integration Patterns Analysis

Integration is how **columns meet**. A protocol or ABI is one lattice node; each language’s stub generator is a **cell**. This repo already treats FFI as a falsification test: what survives a language boundary is a real concept (`cs-museum/corpus/architecture/COMPREHENSIVE-ARCHITECTURE-REVIEW.md`). `empowers` remains prose, never an edge (`build_authored.py`).

### API Design Patterns

_RESTful APIs:_ HTTP resource + method + status is **one** shared contract (RFC 9110 semantics, independent of HTTP/1.1 vs HTTP/2 vs HTTP/3). REST-as-style (Fielding) is a *use of* those semantics, not 70 language APIs. Caching lives in RFC 9111; Express vs Spring vs FastAPI are cells. Source: https://www.rfc-editor.org/info/rfc9110/

_GraphQL APIs:_ GraphQL is already a **catalog column** (`graphql`, query language, `absent_by_design` for heap). 2026 practice still pairs it with REST: REST wins CDN/`GET` cache; GraphQL wins nested selection and schema evolution. WunderGraph’s 2026 fact-check: N+1 exists on both sides at different layers; persisted queries can restore HTTP caching. Sources: https://graphql.org/learn/ (spec/learn); https://wundergraph.com/blog/fact-checking-graphql-vs-rest ; https://vercel.com/i/graphql-vs-rest

_RPC and gRPC:_ Official gRPC language list is **one RPC + IDL + streaming** concept with many stubs: C#/.NET, C++, Dart, Go, Java, Kotlin, Node, Objective-C, PHP, Python, Ruby, Rust, Swift. That set overlaps this catalog heavily; missing catalog langs use the **same** protobuf/gRPC *problem* via unofficial bindings or do not expose RPC at all. Source: https://grpc.io/docs/languages/ ; https://grpc.io/docs/

_Webhook Patterns:_ HTTP callbacks are RFC 9110 + at-least-once delivery + idempotency — CS2023 NC/PDC overlap, not a new language tree. CloudEvents is the envelope that makes webhooks interoperable (below).

_Inventory implication:_ ~4 API-shape nodes (resource/HTTP, schema-query, typed-RPC, callback), not one per framework.

_Source:_ https://www.rfc-editor.org/info/rfc9110/ ; https://grpc.io/docs/languages/ ; https://wundergraph.com/blog/fact-checking-graphql-vs-rest

### Communication Protocols

_HTTP/HTTPS Protocols:_ STD 97 / RFC 9110 is the semantics node; RFC 9112/9113/9114 are **transport versions** (subtopics), not three concepts × 70 languages. TLS is a security node shared by every `https` client. Source: https://www.rfc-editor.org/info/rfc9110/

_WebSocket Protocols:_ RFC 6455 is one bidirectional-stream concept; browser JS vs Go `gorilla` vs Java Jetty are cells. (Not re-fetched this step; treat as **high** confidence for existence, **medium** for 2026 occupancy vs SSE/WebTransport.)

_Message Queue Protocols:_ AMQP 1.0 (OASIS / ISO/IEC 19464), MQTT, Kafka records are **transports**. CloudEvents bindings map the **same** event metadata onto Kafka headers vs AMQP application-properties vs MQTT v5 user properties. Sources: https://github.com/cloudevents/spec/blob/main/cloudevents/bindings/kafka-protocol-binding.md ; https://github.com/cloudevents/spec/blob/main/cloudevents/bindings/amqp-protocol-binding.md

_grpc and Protocol Buffers:_ Protobuf is the default gRPC payload; gRPC is content-type extensible (FlatBuffers/Thrift exist at uneven maturity). Source: https://github.com/grpc/grpc.io/blob/main/content/en/docs/what-is-grpc/faq.md

_Source:_ https://www.rfc-editor.org/info/rfc9110/ ; https://github.com/cloudevents/spec

### Data Formats and Standards

_JSON and XML:_ JSON is Internet Standard 90 (RFC 8259). It is the default HTTP/CloudEvents structured mode. XML remains SOAP/enterprise (ABAP, Apex, SOAP cells), not a second “data” language. Source: https://www.rfc-editor.org/info/rfc8259 (JSON); HTTP JSON media types ride on RFC 9110.

_Protobuf and MessagePack:_ Binary IDL vs schema-less binary — two serialization **concepts**; language codegen is cells.

_CSV and Flat Files:_ Bulk interchange / DM analytics; one node.

_Custom Data Formats:_ WIT (Component Model IDL) and `.proto` are **IDLs**. YAML/HCL in the catalog are DSL columns that *serialize config*, not application heaps.

_Source:_ RFC 8259; https://component-model.bytecodealliance.org/design/component-model-concepts.html

### System Interoperability Approaches

_Point-to-Point Integration:_ **C ABI / calling convention** is the bedrock interop node. System V AMD64 ABI (register args, ELF) is what C, C++, Rust `extern "C"`, Go cgo, and most Unix FFIs actually share. Source (processor supplement): https://refspecs.linuxfoundation.org/elf/x86_64-abi-0.98.pdf ; overview: https://osdev.wiki/wiki/System_V_ABI

_API Gateway Patterns:_ BFF / gateway aggregation is the operational answer to REST N+1 (WunderGraph). One **edge composition** concept; Kong/APIM/AWS API Gateway are products.

_Service Mesh:_ Sidecar mTLS + L7 routing — NC/SEC overlay, not FPL. Kubernetes still the job-default orchestrator (stack step).

_Enterprise Service Bus:_ Legacy SOAP/ESB still appears in ABAP/Java shops; conceptually **hub-and-spoke message broker**, same family as Kafka/AMQP, different era.

_WASM Component Model:_ Language-agnostic **Canonical ABI + WIT worlds** so guests do not share linear memory. WASI 0.2 (2024-01-25) couples WASI to the component model; WASI 0.3 adds `async func` / `stream` / `future` in WIT. **Not in browsers yet** (Wikipedia, retrieved 2026). Confidence: **high** that this is the intended *rich* FFI successor; **medium** that 2026 job postings still more often say “cgo/JNI/NAPI” than “WIT.” Sources: https://component-model.bytecodealliance.org/design/component-model-concepts.html ; https://en.wikipedia.org/wiki/WebAssembly

_Source:_ https://refspecs.linuxfoundation.org/elf/x86_64-abi-0.98.pdf ; https://component-model.bytecodealliance.org/design/component-model-concepts.html

### Microservices Integration Patterns

_API Gateway Pattern:_ External HTTP/gRPC facade; same node as above.

_Service Discovery:_ DNS / kube-service / Consul — **naming + liveness**, CS2023 NC.

_Circuit Breaker Pattern:_ Fail-fast to a degraded dependency. Azure Well-Architected lists Circuit Breaker beside Retry; implementation (Polly, resilience4j, `gobreaker`) is a cell. Sources: https://learn.microsoft.com/en-us/azure/well-architected/mission-critical/mission-critical-application-design ; circuit-breaker pattern family on Learn.

_Saga Pattern:_ Distributed *consistency without 2PC*: local transactions + **compensating** transactions; orchestration vs choreography. Microsoft Learn: https://learn.microsoft.com/en-us/azure/architecture/patterns/saga . This is **not** ACID rollback (already noted in prior atlas research). One concept; C# Durable Functions vs Kafka choreography are cells.

_Source:_ https://learn.microsoft.com/en-us/azure/architecture/patterns/saga ; https://learn.microsoft.com/en-us/azure/well-architected/mission-critical/mission-critical-application-design

### Event-Driven Integration

_Publish-Subscribe Patterns:_ Topic + consumer group vs queue — two delivery shapes.

_Event Sourcing:_ Append-only facts vs current snapshot; optional, not required by pub/sub.

_Message Broker Patterns:_ Kafka (log), RabbitMQ (AMQP), MQTT (IoT) are **brokers**; CloudEvents is the **portable event**. Cross-protocol at-least-once is the realistic guarantee (CloudEvents Router thesis). Sources: CloudEvents Kafka/AMQP bindings (above); https://github.com/cloudevents/spec

_CQRS Patterns:_ Separate write model from read model; often paired with events. One node; not a language.

_Source:_ https://github.com/cloudevents/spec ; https://learn.microsoft.com/en-us/azure/architecture/patterns/saga (events as saga triggers)

### Integration Security Patterns

_OAuth 2.0 and JWT:_ Shared **delegation** node. RFC 9700 (Jan 2025, BCP) is current OAuth 2.0 security practice; OAuth 2.1 is still *incorporating* that BCP. PKCE, exact redirect URIs, deprecation of implicit/ROPC. Audience-injection on `private_key_jwt` is a **2025–2026** spec tightening (issuer as sole `aud`). Language SDKs are cells. Sources: https://www.ietf.org/rfc/rfc9700.html ; https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rfc7523bis

_API Key Management:_ Weaker cousin of OAuth; one ops concept.

_Mutual TLS:_ Service identity; mesh and RFC 8705 (OAuth mTLS) share the **certificate-bound identity** idea.

_Data Encryption:_ TLS in transit (HTTPS) vs application-level encryption; SEC knowledge area, not 70 crypto APIs as concepts.

_Source:_ https://www.ietf.org/rfc/rfc9700.html

### Cross-integration map onto the lattice

| Shared problem (candidate **concept**) | What is *not* a concept | Layer |
| --- | --- | --- |
| Calling convention / C ABI | `extern "C"` syntax per language | silicon/ISA + compilation |
| Syscall / kernel ABI | libc vs Go runtime wrappers | kernel |
| Canonical ABI + WIT world | `wit-bindgen` for Rust vs C | compilation + runtime |
| HTTP semantics (method, status, cache) | FastAPI vs Express | runtime + HCI (errors) |
| Schema-query API (GraphQL) | Apollo vs Hasura | query column + runtime |
| Typed RPC + IDL (gRPC/protobuf) | each official stub | runtime |
| Serialization (JSON / protobuf / …) | serde vs Jackson | data modelling |
| At-least-once event + idempotency | Kafka vs Rabbit vs MQTT | concurrency / PDC |
| Compensation saga (not 2PC) | Durable Functions vs Camunda | paradigms / SE |
| Circuit breaker / retry / timeout | Polly vs resilience4j | error-signalling |
| Delegated auth (OAuth/OIDC) | Passport vs Spring Security | SEC + HCI (consent) |

**Count implication (this step only):** on the order of **~15–25 integration/interop nodes** spanning FFI → HTTP → events → auth, plus CS2023 NC/PDC/SEC units already counted in the stack table. Not 70 × (REST + GraphQL + gRPC).

**Confidence:** RFCs, gRPC language list, CloudEvents bindings, Azure saga page, RFC 9700 — **high**. WebSocket occupancy vs HTTP/3 / WebTransport — **medium** (not surveyed here). Component Model job prevalence vs C ABI — **medium**.

**Gaps:** JNI / CLR P/Invoke / Node-API as named FFI *subtopics* of the C ABI node; OpenAPI as REST’s *schema* twin to GraphQL/protobuf.

---

## Architectural Patterns and Design

This step is the **shape of the inventory**, not a second copy of REST vs GraphQL. Two architectures must not be confused:

1. **Computing continuum** (what we count): Tanenbaum-style virtual machines stacked from gates to HCI.
2. **Application architecture** (how a 2026 product is built): ports/adapters, scale units, CAP/PACELC. Those become *a few* lattice nodes under paradigms / data / PDC, not a competing tree.

The repo already forbids unbounded split: “All concepts and every fine-grained subtopic is not a finite, source-defined set” (`cs-museum/corpus/concept_atlas/GRANULARITY-COVERAGE.md`). A facet (syntax, diagnostics, version) stays inside a record unless it has a **distinct problem and independent evidence**.

### System Architecture Patterns

_Layered machine (count this):_ Tanenbaum/Austin, *Structured Computer Organization* 6e: digital logic → microarchitecture → ISA → OS machine → assembly. CS2023 AR explicitly lists “Functional hardware and software multi-layer architecture” under digital logic and tells students to stop treating hardware as a black box. Sources: Tanenbaum TOC (logic, microarch, ISA, OS, assembly); https://csed.acm.org/wp-content/uploads/2023/09/AR-Version-Gamma.pdf

_This app’s eight stages_ (`stages.ts`) are that stack plus language/HCI: silicon, ISA, kernel, compilation, runtime, types, paradigms, HCI. They are **rooms**, not concepts.

_Application topology (do not multiply):_ monolith vs microservices vs serverless vs event-driven are **deployment shapes** of the same services. Azure mission-critical design uses **scale units / stamps** for horizontal growth — one scalability concept, not one per cloud. Source: https://learn.microsoft.com/en-us/azure/well-architected/mission-critical/mission-critical-application-design

_Heterogeneous compute:_ CS2023 AR-H (SIMD/MIMD, GPGPU, TPU) is why CUDA is a **column** hanging on a shared “accelerator execution” node, not a parallel language atlas.

_Source:_ https://csed.acm.org/wp-content/uploads/2023/09/AR-Version-Gamma.pdf ; Tanenbaum structured organization (layered VM thesis)

### Design Principles and Best Practices

_Ports and adapters:_ Cockburn (2005; book update 2025): application core has **no compile-time dependency** on UI or DB; ports are conversations; adapters are technologies. Clean/Onion add extra rings; Ports & Adapters is **two layers** (inside/outside). That is **one** “hexagonal boundary” concept plus module/FFI nodes already counted — not Spring vs Nest vs FastAPI architectures. Source: https://alistair.cockburn.us/hexagonal-architecture

_SOLID / DDD:_ CS2023 SE + FPL-OOP. Entities/aggregates are **data-modelling** concepts; SOLID is SE process/design — include only where it is a transferable *problem* (e.g. dependency inversion ≡ ports).

_Granularity rule (local):_ ten child dimensions of a concept are a **checklist**, not ×10 nodes (`GRANULARITY-COVERAGE.md`).

_Source:_ https://alistair.cockburn.us/hexagonal-architecture ; `cs-museum/corpus/concept_atlas/GRANULARITY-COVERAGE.md`

### Scalability and Performance Patterns

_Memory hierarchy (bedrock):_ Hennessy & Patterson: locality (temporal/spatial) → multilevel cache; 3 Cs of misses (compulsory, capacity, conflict). **L1 vs L2 vs L3 are parameters of one hierarchy concept**, not three concepts. CS2023 AR Memory Hierarchy is **6 CS Core hours** — the heaviest AR unit. Sources: *Computer Architecture: A Quantitative Approach* ch. 2 (via standard course notes https://cse.msu.edu/~cse820/lectures/CAQA5e_ch2.pdf ); AR Gamma hour table.

_Distributed trade-offs:_ CAP as stated by Brewer (PODC 2000) and proved by Gilbert/Lynch (SIGACT 2002): at most two of C, A, P for shared-data. Abadi PACELC (IEEE Computer 2012): if Partition then A vs C; **else** Latency vs Consistency. Raft vs Paxos are **cells** of one consensus node (Raft is the teachable algorithm; etcd/Consul use it). Sources: https://people.eecs.berkeley.edu/~brewer/PODC2000.pdf ; https://doi.org/10.1145/564585.564601 ; https://doi.org/10.1109/mc.2012.33

_Horizontal vs vertical:_ scale-unit architecture (Azure) vs bigger box — two scaling strategies, one cluster.

_Source:_ Brewer PODC 2000; Abadi 2012 PACELC; Azure scale units (URL above)

### Integration and Communication Patterns

Covered in step 3. Architecturally they **sit on** kernel (syscall), compilation (ABI/WIT), runtime (HTTP/RPC), concurrency (events), SEC (OAuth). Do not add a ninth stage named “microservices.”

_Source:_ prior section; RFC 9110; gRPC; CloudEvents

### Security Architecture Patterns

CS2023 SEC is **7 knowledge units / 6+35 hours**. For this inventory: identity (OAuth/mTLS), isolation (process/VM/WASM sandbox), memory safety (types layer). Zero-trust as a **deployment policy** is a subtopic of identity + network, not 70 language chapters.

_Source:_ https://csed.acm.org/knowledge-areas/ (SEC); RFC 9700 (step 3)

### Data Architecture Patterns

Relational vs document vs log-structured vs in-memory are **storage engine** concepts (DM). CQRS/event sourcing already listed. SQL/T-SQL/PL/SQL remain **columns**. Isolation levels (READ COMMITTED vs SERIALIZABLE) are subtopics of **transactions**, one node.

_Source:_ CS2023 DM (13 KUs) https://csed.acm.org/mockup-cs2023/ ; PostgreSQL occupancy from step 2

### Deployment and Operations Architecture

Containers/orchestration/IaC (Docker, Kubernetes, Terraform/YAML columns) are **ops adapters** on process isolation + declarative config. WASM/WASI is an alternative **guest ABI**, not a replacement layer for Linux in 2026 jobs (medium confidence).

_Source:_ SO Docker 71% / AWS 43% (step 2 press release); Component Model (step 3)

### HCI architecture (upper bound of the spine)

Norman: **gulf of execution** vs **gulf of evaluation**; seven stages of action. NN/g still treats the two gulfs as current (article on the two UX gulfs). Abowd & Beale (1991): UI as translator between task language and core language (four mappings). Nielsen’s **10 heuristics** (step 2) are evaluation criteria, not 10 extra implementation concepts if gulfs + visibility/status already exist. CS2023 HCI: **6 knowledge units**, 8 CS Core + 16 KA Core hours. Sources: https://www.nngroup.com/articles/two-ux-gulfs-evaluation-execution/ ; https://csed.acm.org/human-computer-interaction/

Compiler diagnostics and syntax (app cluster `syntactic-ergonomics`) are the **developer-facing** gulf — same HCI nodes, HCI-for-programmers cells.

### Proposed lattice architecture (freeze candidate structure)

| Tier | What it is | Proposed grain | Working family count |
| --- | --- | --- | --- |
| A. Layers | 8 stages (already shipped) | rooms | **8** (not concepts) |
| B. Clusters | 17 language clusters in `capabilities.ts` + AR/OS/NC/DM/SEC/SPD/HCI as extra clusters | folders | **17 + ~8 = ~25** |
| C. Core concepts | Distinct transferable problems; CS Core–aligned | **rows** | **~140–180** |
| D. Full KA-core | Add elective-but-job-real leaves (quantum intro, PIM, FAPI, WebTransport) | optional rows | **~220–280** |
| E. Rejected | CS2023’s ~1,300 topics; CSS modules; HTML elements; 70× handbook | not rows | — |
| F. Cells | 70 languages × C | evidence | **~10k–20k cells if fully filled** — **not the inventory metric** |

**Worked split for C (~160 midpoint):**

| Stage | Families (order of magnitude) | Rationale |
| --- | --- | --- |
| Silicon | 8–12 | combinational/sequential, CMOS/energy, HDL as *column* on synthesis |
| ISA / microarch | 12–18 | ISA, pipeline, hazards, prediction, SIMD, interrupt |
| Kernel | 12–18 | process, thread, VM/TLB, syscall, FS, scheduler |
| Compilation | 10–14 | AST/IR, linking, ABI, monomorphization, debug |
| Runtime | 14–20 | stack, GC vs arena, JIT, event loop, FFI, HTTP/RPC |
| Types | 12–16 | static/dynamic, inference, ownership, effects, variance |
| Paradigms + data + concurrency | 20–28 | OOP/FP/logic/actors/CSP, transactions, CAP/PACELC, saga |
| HCI + SPD (web/mobile) | 16–22 | gulfs, layout/cascade, a11y, component tree, SSR |
| Integration overlay | (folded into runtime/kernel/SEC) | counted in those rows, not extra 25 |

**18 authored leaves today** cover a slice of types/memory/concurrency/paradigms only. **200 atlas IDs** are the wrong denominator (scaffold + 26 old columns). **`STACK-COVERAGE.md`** already says naming a layer ≠ covering it.

**ADR-style decisions for the freeze (architecture):**

1. Rows = problems; columns = 70 languages; cells = evidence.
2. Subtopic becomes a row iff distinct failure mode (isolates vs OS threads; GraphQL vs HTTP resources).
3. Nuance (G1 vs ZGC; HTTP/2 vs HTTP/3) stays in the cell or a `version` facet.
4. `empowered_by` edges only; never `empowers`.
5. Quantum / proof assistants (Lean, Coq) get **few** rows (formal methods cluster), not a second CS degree.

**Confidence:** layered machine + CS2023 KU hours **high**. Exact 160 vs 180 is **medium** until implementation step lists IDs. CAP popularization often wrongly says “pick two of three always”; Gilbert/Lynch + PACELC are the precise nodes.

**Gaps:** OS Gamma KU-by-KU list not copied; SPD web vs mobile concept split; whether `layer_contracts` absorbs ownership that CS2023 puts in FPL-Types vs AR-Memory.

---

## Implementation Approaches and Technology Adoption

Implementation here means **how to stand up the ~160-row lattice** without a big-bang rewrite of the 200-ID / 5,168-unknown atlas, and without asking an LLM to emit verified mechanisms.

### Technology Adoption Strategies

_Strangler fig, not rip-and-replace:_ Fowler’s strangler fig (documented on Azure Architecture Center) incrementally replaces a legacy system behind a façade while the old system keeps running. Data-platform variants keep **reconciliation** as a first-class step: new semantics and old outputs coexist until equivalence is proven. That maps 1:1 onto this repo: the React reader already stranglers the frozen atlas (it reads `programming_tower`, not 5,200 cells). Next: freeze a new `scope` of concept IDs; promote clusters one bounded context at a time (e.g. memory, then concurrency); leave scaffold IDs quarantined until retired. Sources: https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig ; https://www.dataversity.net/articles/the-data-centric-revolution-the-strangler-fig-pattern/

_Gradual vs big bang:_ Dataversity: most big-bang modernizations fail. **Do not** generate 160×70 verified cells in one session. Adopt **core freeze first** (ID list + 8 stages), then fill **priority columns**.

_Vendor evaluation:_ Language “vendors” are specs (TC39, WHATWG, ISO C++, Go spec). Prefer official specs over blogs (`COMPLETENESS-CONTRACT.md`). Docket snapshots (`compile_docket.py`) are **candidates**, not coverage.

_Source:_ https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig ; `cs-museum/corpus/concept_atlas/COMPLETENESS-CONTRACT.md`

### Development Workflows and Tooling

_Existing contract:_ `corpus/schema/extension.contract.json` + `extend.py validate` + `build_authored.py` + `test_relations.py`. AI may scaffold `unverified` / `absent_by_design`; **verified** requires mechanism/why/useWhen/price/source.

_DORA 2025:_ AI is an **amplifier**. Throughput can rise; **instability still rises** unless tests, version control, and fast feedback exist. Google Cloud announce: https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report ; report landing: https://research.google/pubs/dora-2025-state-of-ai-assisted-software-development-report/ . Implication: use AI to **retrieve quotes into docket → human promote**, not to stamp `coverage: verified`.

_Trunk / small batches:_ one concept ID or one language cell PR, not a 200-file dump. Matches DORA “increase in change volume without control systems → instability.”

_Source:_ DORA 2025 URLs above; `cs-museum/corpus/schema/extension.contract.json`

### Testing and Quality Assurance

_Schema on every PR:_ JSON Schema / contract checks catch missing fields; they do **not** prove a mechanism is true (schema vs behavioral contract distinction). Gate: `extend.py validate`, `test_relations.py` (70 columns per authored concept), forbid `verified` without source URL.

_Promotion tests:_ hashed snapshot exists in `source-manifest` / ingest; quote substring matches; `authority` recorded. A downloaded page ≠ a true claim (`COMPLETENESS-CONTRACT.md`).

_App tests:_ reader must not synthesize missing toolboxes as if verified (`languageDeepSpecs` risk noted in prior review). E2E: one concept × two languages × absent_by_design HTML.

_Source:_ schema-vs-snapshot CI guidance https://dev.tools/blog/schema-vs-snapshot-testing-for-apis-what-actually-works-in-ci/ ; local contracts

### Deployment and Operations Practices

The museum is a **static Vite app**. SRE four golden signals still apply to the *site*: latency, traffic, errors, saturation. Source: https://sre.google/sre-book/monitoring-distributed-systems/

For a knowledge product, add **content SLIs** (not in the SRE book, derived):

| Signal | Site | Corpus |
| --- | --- | --- |
| Latency | LCP / INP on concept page | time-to-first-verified-cell in a PR |
| Traffic | pageviews per stage | which clusters are opened |
| Errors | 404, JSON parse, empty mechanism shown as fact | `verified` without source (should be a **build fail**) |
| Saturation | bundle size / JSON payload | unknown-cell % treated as work queue, not as coverage |

Static hosting: CDN cache of `programming_tower.json`; content-hash so deploys actually change the atlas.

_Source:_ https://sre.google/sre-book/monitoring-distributed-systems/

### Team Organization and Skills

Not 70 language experts in parallel. **One curator** owns the ID freeze. **Evidence compiler** (human + AI retrieve) fills cells. Domain specialists (one systems, one web/HCI, one data) review their clusters. DORA: platforms and automated tests absorb AI velocity; here the “platform” is `extend.py` + docket + schema.

Skill: read a spec TOC and name a **problem**, not a keyword. SQL remains a weak personal skill in the interview-prep curriculum — SQL/T-SQL/PL/SQL cells should not be the first verified batch if the curator cannot check them.

### Cost Optimization and Resource Management

| Cost | What to buy | What not to buy |
| --- | --- | --- |
| Tokens | retrieve + quote from snapshots | 5,200 Mad-Libs mechanisms |
| Human hours | freeze ~160 IDs; verify 10 langs × core clusters | 70 langs × every row on day one |
| Storage | 104 hashed sources already exist | re-crawling the web for occupancy |

Priority columns (from SO occupancy, step 2): JavaScript, HTML, CSS, SQL, Python, TypeScript, Java, C#, C++, Go, Rust, then Dart/Swift/Kotlin. Remaining 50 langs stay `unverified` / `absent_by_design` without shame.

Rough cell math if core = 160 and priority = 12: **1,920** cells in the first evidence wave — still not the inventory metric; the metric is **160 rows locked**.

### Risk Assessment and Mitigation

| Risk | Mitigation |
| --- | --- |
| Keyword docket false positives (`async`, `lock`) | quote + concept ID match; human gate |
| Scaffold 200 IDs leaking into the reader | quarantine; new ID namespace `prog_` / `sys_` / `hci_` |
| AI instability (DORA) | `verified` blocked in CI without source |
| Dual matrices (atlas vs tower) | one reader source of truth; ledger is archive |
| Endless coexistence with 5,168 unknowns | retirement date for unknown cells: hide, don’t fill |
| Counting cells as “done” | KPI = frozen row count + % verified in **priority** slice |

---

## Technical Research Recommendations

### Implementation Roadmap

1. **Week 0 — Freeze denominator:** publish `inventory-core.json` with ~160 concept IDs, cluster, stage, distinct-problem sentence, CS2023 KU crosswalk. No prose essays.
2. **Week 1–2 — Strangle:** map 18 authored concepts onto those IDs; add missing **core** IDs as stubs (`unverified` records, not fake mechanisms).
3. **Week 3–6 — Evidence compiler:** for each ID, pull docket quotes for JS/Python/Rust/Go; promote or mark absent.
4. **Bedrock/HCI waves:** AR memory-hierarchy + Norman gulfs as their own ID batches (do not analogize from GC records).
5. **Retire** one-word atlas scaffolds from any UI path.

### Technology Stack Recommendations

Keep Vite + authored JSON + Python compile. Add CI schema. Do not introduce a graph DB until the ID list is stable (strangler: semantics first, store later). Spec URLs already on catalog langs.

### Skill Development Requirements

Curator: CS2023 FPL + AR hour tables. Compiler: citation hygiene. Reviewers: one language family each. Interview-prep SQL gap ⇒ delay deep SQL engine cells.

### Success Metrics and KPIs

- **Primary:** frozen concept row count in [140, 180] with a written problem per ID.
- **Secondary:** verified cells / (rows × 12 priority langs), target rising; **never** “5,200 filled.”
- **Quality:** 0 `verified` without `source`; `test_relations` green.
- **Delivery (DORA-shaped):** small PRs; change-fail = promoted-then-retracted cells.
- **UX:** concept page never presents `unknown` as a mechanism.

---

<!-- Synthesis generated; [C] Complete Research to mark stepsCompleted [1–6] -->

---

# A Finite Continuum, Not 5,200 Cells: Comprehensive Bedrock-to-HCI Concept Inventory Technical Research

## Executive Summary

Computer science is already finite at the curriculum layer. ACM/IEEE-CS/AAAI CS2023 does not attempt “every subtopic of every language.” It freezes **17 knowledge areas**, about **162 knowledge units**, and a **270-hour CS Core**, then uses a sunflower model so programs go deep in some areas and shallow in others. Source: https://csed.acm.org/wp-content/uploads/2024/04/1.3-Introduction-to-Knowledge-Model.pdf . A museum that tried to enumerate Dart’s handbook × 70 job languages would be the opposite of that discipline.

For **2026 job-relevant languages** (this repo: **70** columns, SO 2025 professional use plus job-board extras), the inventory unit is a **shared problem**. HTML and CSS share an SO row at 61.9% but cannot share a heap story. GraphQL is a query column, not a second JavaScript. React is a cell on “component tree,” not a concept ID. Five thousand unknown atlas cells were a **matrix fill**, not a concept census.

**Recommended freeze: 160 concept rows** (band **140–180**). Optional KA-core expansion: **~220–280**. Reject ~1,300 CS2023 topics as rows, reject CSS-module and HTML-element explosion, reject 200 scaffold atlas IDs as the denominator.

**Key Technical Findings:**

- Columns = 70 languages; rows = transferable problems; cells = evidence (`verified` / `unverified` / `absent_by_design`).
- Interop is ~15–25 nodes (C ABI, WIT, HTTP/RFC 9110, gRPC, CloudEvents, OAuth/RFC 9700), not per-framework APIs.
- Architecture is Tanenbaum layers + eight app stages; L1/L2/L3 and HTTP/2 vs /3 are facets.
- Implementation is strangler fig + DORA 2025 (AI amplifies instability without tests): freeze IDs first, promote docket quotes, never LLM-stamp `verified`.

**Technical Recommendations:**

1. Publish `inventory-core.json` with **160** IDs, each a one-sentence distinct problem + stage + CS2023 KU.
2. Keep the React reader on authored tower; quarantine one-word atlas scaffolds.
3. First evidence wave: **12 priority languages × 160 rows** (~1,920 cells) as a queue, KPI = rows locked.
4. CI: `verified` without `source` fails the build (`extension.contract.json`).
5. Do not use 5,168 unknowns or 5,200 cells as a completion number.

## Table of Contents

1. Technical Research Introduction and Methodology
2. Technical Landscape and Architecture Analysis
3. Implementation Approaches and Best Practices
4. Technology Stack Evolution and Current Trends
5. Integration and Interoperability Patterns
6. Performance and Scalability Analysis
7. Security and Compliance Considerations
8. Strategic Technical Recommendations
9. Implementation Roadmap and Risk Assessment
10. Future Technical Outlook and Innovation Opportunities
11. Technical Research Methodology and Source Verification
12. Technical Appendices and Reference Materials

## 1. Technical Research Introduction and Methodology

### Technical Research Significance

If every nuance of every 2026 language were a node, the set would be open: new dialects, GC tunables, and CSS modules never stop. CS2023’s authors faced the same infinity and answered with a **minimum core** small enough for small programs (270 CS Core hours) plus KA-core depth by choice. Source: https://csed.acm.org/wp-content/uploads/2024/04/1.3-Introduction-to-Knowledge-Model.pdf ; https://doi.org/10.1145/3664191

_Technical Importance:_ A concept atlas that cannot say how many *rows* it has cannot claim completeness. Completeness is always relative to a frozen denominator (`COMPLETENESS-CONTRACT.md`).

_Business Impact:_ Job prep and the museum succeed if a learner can transfer “garbage collection” from Java to Go and mark HTML `absent_by_design` — not if 5,200 cells are filled with unknown.

_Source:_ CS2023 knowledge-model PDF; `cs-museum/corpus/concept_atlas/COMPLETENESS-CONTRACT.md`

### Technical Research Methodology

- **Technical Scope:** Bedrock (logic, ISA, OS) through language FPL, frameworks as cells, HCI/UX as the top stage; 70 job languages as columns.
- **Data Sources:** SO 2025, TIOBE Aug 2026, CS2023, IETF RFCs, gRPC, CloudEvents, Azure patterns, Norman/NN/g, Hennessy/Patterson, Tanenbaum, repo contracts.
- **Analysis Framework:** Concept vs subtopic vs nuance; row vs column vs cell; CS Core analog vs KA-core extras.
- **Time Period:** Sources 2022–2026 (HTTP 9110, CS2023, SO 2025, TIOBE 2026, DORA 2025, RFC 9700).
- **Technical Depth:** Cardinality and architecture of the lattice, not a full ID dump (that is Week 0 implementation).

### Technical Research Goals and Objectives

**Original Technical Goals:** Produce a defensible count of distinct concepts from silicon through HCI for 2026 job languages as columns; separate concept / subtopic / nuance; reject 5,200 unknown cells as the target.

**Achieved Technical Objectives:**

- **Count:** 160 recommended (140–180 band), 70 columns, cells not the metric.
- **Split rule:** distinct failure mode ⇒ new row; version/tune ⇒ facet/cell.
- **Rejection:** 5,200 cells, 200 scaffold IDs, 1,300-topic copy.

## 2. Technical Landscape and Architecture Analysis

### Current Technical Architecture Patterns

_Dominant Patterns:_ Layered virtual machines (Tanenbaum: logic → microarch → ISA → OS → assembly) aligned to eight UI stages. CS2023 AR names “functional hardware and software multi-layer architecture.” Application hexagonal architecture is **one** ports/adapters node, not the continuum. Sources: AR Gamma https://csed.acm.org/wp-content/uploads/2023/09/AR-Version-Gamma.pdf ; https://alistair.cockburn.us/hexagonal-architecture

_Architectural Evolution:_ Frozen atlas 14×200×26 was a different product. Authored reader is 18×70. This research unifies them as **~25 clusters × ~160 rows × 70 columns**.

_Architectural Trade-offs:_ Fewer rows ⇒ transferable teaching; more rows ⇒ handbook. 160 is CS-core-shaped, not Wikipedia.

### System Design Principles and Best Practices

_Design Principles:_ Rows = problems; `empowered_by` only; `empowers` prose; GRANULARITY checklist is not ×10 nodes.

_Best Practice Patterns:_ Strangler fig around the 200-ID corpus. Source: https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig

_Architectural Quality Attributes:_ Honesty (`absent_by_design`) over occupancy theater.

## 3. Implementation Approaches and Best Practices

### Current Implementation Methodologies

_Development Approaches:_ `extend.py` + schema; docket retrieve → human promote. DORA 2025: AI increases throughput and **instability** without automated tests. Sources: https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report ; `extension.contract.json`

_Code Organization Patterns:_ `corpus/authored/cells/<lang>/<concept>.json` one pair per file.

_Quality Assurance Practices:_ Schema on PR; `verified` requires mechanism/why/useWhen/price/source.

_Deployment Strategies:_ Static Vite; content-hash JSON.

### Implementation Framework and Tooling

Keep Python compile + Vite. No graph DB until IDs freeze. Spec URLs already on catalog languages.

## 4. Technology Stack Evolution and Current Trends

### Current Technology Stack Landscape

_Programming Languages:_ SO 2025: JS 66%, HTML/CSS 61.9%, SQL 58.6%, Python 57.9%, TS 43.6%, … Rust 14.8%, Dart 5.9%. TIOBE Aug 2026: Python/C/C++/Java lead; Rust #10. Sources: https://survey.stackoverflow.co/2025/ ; https://www.statista.com/statistics/793628/worldwide-developer-survey-most-used-languages/ ; https://www.tiobe.com/TIOBE-Index/

_Frameworks and Libraries:_ Node 48.7%, React 44.7%, Next 20.8% — cells on component/SSR/HTTP. https://www.statista.com/statistics/1124699/worldwide-developer-survey-most-used-frameworks-web/

_Database and Storage:_ Postgres lead; Redis growth. https://survey.stackoverflow.co/2025/technology

_API and Communication:_ HTTP 9110, GraphQL column, gRPC stubs across official langs. https://www.rfc-editor.org/info/rfc9110 ; https://grpc.io/docs/languages/

### Technology Adoption Patterns

_Adoption Trends:_ Python up on SO; TIOBE Python rating down. Compatible.

_Migration Patterns:_ MATLAB TIOBE drop; still a catalog job column.

_Emerging Technologies:_ WASM Component Model / WASI 0.2–0.3; not in browsers yet. https://component-model.bytecodealliance.org/design/component-model-concepts.html

## 5. Integration and Interoperability Patterns

### Current Integration Approaches

_API Design Patterns:_ Resource+HTTP vs schema-query vs typed RPC vs webhooks — four shapes.

_Service Integration:_ Gateway/BFF, saga compensation (not 2PC). https://learn.microsoft.com/en-us/azure/architecture/patterns/saga

_Data Integration:_ JSON RFC 8259; protobuf; CloudEvents over Kafka/AMQP/MQTT.

### Interoperability Standards and Protocols

_Standards Compliance:_ System V AMD64 ABI for Unix FFI; WIT Canonical ABI as rich successor.

_Protocol Selection:_ HTTP semantics one node; 9112/9113/9114 are versions.

_Integration Challenges:_ Keyword docket false positives; FFI evaporates language fiction (repo architecture review).

## 6. Performance and Scalability Analysis

### Performance Characteristics and Optimization

_Performance Benchmarks:_ Memory hierarchy locality; 3 Cs of cache misses — one concept family. Hennessy/Patterson; AR Memory Hierarchy 6 CS Core hours.

_Optimization Strategies:_ Do not mint L1/L2/L3 as three concepts.

_Monitoring and Measurement:_ SRE golden signals for the site; content SLI = no unknown-as-fact. https://sre.google/sre-book/monitoring-distributed-systems/

### Scalability Patterns and Approaches

_Scalability Patterns:_ CAP (Brewer PODC 2000; Gilbert/Lynch 2002) + PACELC (Abadi 2012). https://people.eecs.berkeley.edu/~brewer/PODC2000.pdf ; https://doi.org/10.1109/mc.2012.33

_Capacity Planning:_ 160 rows × 12 langs first.

_Elasticity:_ Azure scale units — one node.

## 7. Security and Compliance Considerations

### Security Best Practices and Frameworks

_Security Frameworks:_ CS2023 SEC; OAuth RFC 9700 (2025 BCP). https://www.ietf.org/rfc/rfc9700.html

_Threat Landscape:_ Audience injection on `private_key_jwt` (2025 disclosures) is a **facet** of OAuth, not 70 auth concepts.

_Secure Development Practices:_ Memory safety as types-layer rows; WASM sandbox as isolation cell.

### Compliance and Regulatory Considerations

_Industry Standards:_ Specs as diamond sources; hashed snapshots prove possession not truth.

_Regulatory Compliance:_ Out of scope for concept count (SEP exists in CS2023; do not copy all SEP topics into the museum unless they are transferable *computing* problems).

_Audit and Governance:_ Evidence ledger; never dress `unknown` as content.

## 8. Strategic Technical Recommendations

### Technical Strategy and Decision Framework

_Architecture Recommendations:_ 8 stages, ~25 clusters, **160 rows**, 70 columns.

_Technology Selection:_ Authored JSON + docket; freeze IDs before store changes.

_Implementation Strategy:_ Strangler; priority languages; CI honesty.

### Competitive Technical Advantage

_Technology Differentiation:_ Evidence compiler, not generated wiki (IS/Virat thread).

_Innovation Opportunities:_ WIT worlds as the teaching FFI of the late 2020s; keep C ABI as the job-present node.

_Strategic Technology Investments:_ Human promotion hours, not token volume.

## 9. Implementation Roadmap and Risk Assessment

### Technical Implementation Framework

_Implementation Phases:_ Week 0 ID freeze → map 18 authored → evidence waves (memory, concurrency, HTTP, HCI) → retire scaffolds. Detail in Implementation section above.

_Technology Migration Strategy:_ Façade = Concept Atlas reader; legacy = 200-ID generated corpus.

_Resource Planning:_ One curator + evidence compiler + 3 cluster reviewers.

### Technical Risk Management

_Technical Risks:_ Dual matrices; synthesized deep-specs; docket keywords.

_Implementation Risks:_ DORA instability from AI dumps.

_Business Impact Risks:_ Claiming 5k “complete” destroys trust.

## 10. Future Technical Outlook and Innovation Opportunities

### Emerging Technology Trends

_Near-term (1–2y):_ WASI async/WIT; HTTP QUERY drafts; OAuth 2.1 incorporating RFC 9700.

_Medium-term (3–5y):_ Component Model in more hosts; still not a reason to drop Linux/C ABI from the lattice.

_Long-term:_ Quantum AR KU stays **few** rows (toolbox), not a second inventory.

### Innovation and Research Opportunities

_Research Opportunities:_ Empirical transfer tests (same problem, two languages).

_Emerging Technology Adoption:_ Mojo/Zig as columns when job-real; not extra GC concepts.

_Innovation Framework:_ Promotion gate in GRANULARITY-COVERAGE.md.

## 11. Technical Research Methodology and Source Verification

### Comprehensive Technical Source Documentation

_Primary Technical Sources:_ CS2023 (csed.acm.org, doi:10.1145/3664191); SO 2025; TIOBE; RFC 9110, 8259, 9700; gRPC; CloudEvents spec; Azure strangler/saga; Cockburn hexagonal; Brewer/PACELC; NN/g gulfs; AR Gamma PDF; Component Model book.

_Secondary Technical Sources:_ Statista SO tables; TechRepublic TIOBE; WunderGraph GraphQL fact-check; DORA 2025 blog.

_Technical Web Search Queries:_ SO 2025 languages/frameworks/DBs/cloud; CS2023 KA/KU/FPL/AR; HOPL; WHATWG/CSS Snapshot 2024; Nielsen heuristics; TIOBE 2026; gRPC languages; WASM WIT; CloudEvents; OAuth RFC 9700; System V ABI; hexagonal; CAP/PACELC; Norman gulfs; Hennessy memory hierarchy; strangler fig; DORA 2025; JSON Schema CI; SRE golden signals.

### Technical Research Quality Assurance

_Technical Source Verification:_ Occupancy percents dual-sourced where professional vs all-respondent disagree (±2–3 pp medium).

_Technical Confidence Levels:_ **High** — 160 as order of magnitude vs 18, 200, 1300, 5200. **Medium** — exact 160 vs 148 vs 172 until IDs are listed. **Low** — TIOBE as job census.

_Technical Limitations:_ No exhaustive ID list in this document (implementation Week 0). OS/HCI KU topic lines not fully copied. CS2023 MSF/AL/AI mostly excluded by design (not language-continuum).

_Methodology Transparency:_ Steps 1–5 retained above; synthesis does not delete them.

## 12. Technical Appendices and Reference Materials

### Detailed Technical Data Tables

#### Grain comparison (do not confuse)

| Grain | Count | Role |
| --- | ---: | --- |
| App stages | 8 | Rooms |
| Language clusters in app | 17 | Folders |
| Proposed clusters incl. AR/OS/HCI | ~25 | Folders |
| **Recommended concept rows** | **160** | **Inventory** |
| Band | 140–180 | Uncertainty |
| Full KA-core extras | ~220–280 | Optional |
| Authored leaves today | 18 | Too thin |
| Frozen atlas IDs | 200 | Invalid mix |
| CS2023 KAs | 17 | Layer analog |
| CS2023 KUs | ~162 | Family analog |
| CS2023 topics | ~1,300 | Too wide |
| Job languages (columns) | 70 | Not rows |
| Unknown atlas cells | ~5,168 | Not inventory |

#### Concept vs subtopic vs nuance

| Term | Test | Example |
| --- | --- | --- |
| **Concept (row)** | Distinct problem and failure mode; transferable | Garbage collection; virtual memory; gulf of execution |
| **Subtopic** | Same problem, named variant that changes the guarantee | Tracing vs refcount; isolates vs OS threads |
| **Nuance (cell/facet)** | Implementation, version, flag, brand | G1 vs ZGC; HTTP/2 vs HTTP/3; React vs Vue |

Subtopics become rows only with independent evidence and a counterexample (`GRANULARITY-COVERAGE.md`).

#### Stage band used to reach 160

| Stage | Family band | Mid |
| --- | ---: | ---: |
| Silicon | 8–12 | 10 |
| ISA / microarch | 12–18 | 15 |
| Kernel | 12–18 | 15 |
| Compilation | 10–14 | 12 |
| Runtime (incl. HTTP/RPC/FFI) | 14–22 | 18 |
| Types | 12–16 | 14 |
| Paradigms, data, concurrency, CAP/saga | 20–28 | 24 |
| HCI + SPD (layout, a11y, components) | 16–22 | 19 |
| **Sum of mids** | | **127** |
| + integration/SEC not folded + job-real KA-core (actors vs threads already split, ownership, WIT, OAuth) | | **+33** |
| **Recommended freeze** | | **160** |

127 is the tight CS-core spine. **+33** are job-real splits already justified in steps 3–4 (isolates, GraphQL vs REST, WIT vs C ABI, OAuth, saga vs 2PC, circuit breaker, component/SSR, cascade/layout). That is the **160**. Expanding to 250 would add CS2023 KA-core electives (quantum intro, PIM, FAPI, WebTransport) without changing the column set.

### Technical Resources and References

_Technical Standards:_ RFC 9110, RFC 8259, RFC 9700; WHATWG HTML; CSS Snapshot 2024; ECMA-262; gRPC; CloudEvents.

_Open Source Projects:_ This museum’s `extend.py`, `compile_docket.py`; Wasmtime/WIT.

_Research Papers and Publications:_ CS2023; Gilbert/Lynch CAP; Abadi PACELC; Hennessy/Patterson; Tanenbaum SCO.

_Technical Communities:_ ACM CS education; Bytecode Alliance; IETF HTTP/OAuth WGs.

---

## Technical Research Conclusion

### Summary of Key Technical Findings

The number of **concepts required** is **160** (use **140–180** if you must quote a range). Languages required as columns: **70**. Cells are evidence, optional to fill, never the goal. 5,200 unknown cells are the wrong quantity.

### Strategic Technical Impact Assessment

Replacing “fill the matrix” with “freeze 160 problems” makes the atlas completable, auditable, and honest for HTML/SQL/YAML. It matches how CS2023 kept a core small enough to finish.

### Next Steps Technical Recommendations

1. User **[C] Complete Research** to mark this workflow done (on_complete is empty).
2. Write `inventory-core.json` with 160 problem sentences.
3. Strangle 200-ID scaffolds out of the reader.

---

**Technical Research Completion Date:** 2026-09-05 (synthesis written; mark complete with [C])
**Research Period:** 2026-09-05 comprehensive technical analysis
**Source Verification:** Claims cited in sections 1–12 and steps 2–5
**Technical Confidence Level:** High on order of magnitude; medium on the integer 160 until IDs exist

_This document is the authoritative technical reference for the bedrock-to-HCI concept inventory sized to 2026 job languages._




