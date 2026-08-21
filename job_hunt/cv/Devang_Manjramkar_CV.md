# Devang Manjramkar

**Software Engineer · Flutter Mobile & Full-Stack (Vue / Frappe-ERPNext) · AI-Assisted Delivery**

Pune, India · +91 8806113283 · manjramkardevang6@gmail.com
LinkedIn: https://www.linkedin.com/in/mldev02 · GitHub: https://github.com/DevangML

---

## SUMMARY

Software Engineer with 2+ years shipping enterprise SaaS across Flutter mobile and modern web (Vue / Frappe-ERPNext), spanning config-driven mobile frameworks, offline-first warehouse operations, and Identity & Access Management. Delivery spans a full warehouse SaaS platform, an IAM/SecOps core-platform surface and four production mobile apps — two years of continuous shipping to enterprise customers. Strong in offline-first architecture, config/JSON-driven UI engines, RBAC and workflow automation, device integration (scanner/OCR/camera), and spec-driven AI-assisted development with high unit-test coverage. B.Tech in Artificial Intelligence & Data Science (9.3/10 CGPA), VIT Pune.

---

## TECHNICAL SKILLS

**Mobile · Flutter/Dart:** Offline-first architecture, sync & concurrency control, config/JSON-driven UI engines, package/plugin design, state management, Material 3, barcode/QR/OCR/camera integration, icon-based i18n, whitelabelling/multi-tenant

**Web · Full-Stack:** Vue.js, Frappe/ERPNext, Python, JavaScript/TypeScript, Node.js, Next.js, REST APIs, MariaDB/MySQL, Redis

**Platform · Security:** RBAC & field-level permissions, workflow engines, IAM user-lifecycle automation, audit/governance, change-management workflows, incident-ticketing integration

**AI-Assisted Engineering:** Spec-driven development (BMad), LLM coding agents (Claude Code, Cursor), MCP server integration, context/prompt engineering, agent orchestration

**Practices:** Unit testing & coverage, analytics instrumentation (GA4), R&D spikes, competitor analysis, code review, Git, Docker, CI/CD, Agile/Scrum

---

## EXPERIENCE

### ElasticRun — Associate Engineer
*Pune, India · Jul 2024 – Present*

**Warehouse Management (WMS) — Next-Gen Field App · Flutter**

- Rebuilt the warehouse Field App ground-up, migrating it from Material 2 to Material 3 and reworking the operator experience for low-training, glanceable use on the warehouse floor.
- Owned feature delivery end-to-end across all 6 stages of the warehouse lifecycle — GRN/inbound receiving, Putaway, PSR, Picking, STN and returns — on a product live across multiple enterprise SaaS clients. Sustained **~20 tracked items a month for two years at a 99.5% closure rate** (585 of 588 assigned), with scope self-managed rather than assigned daily.
- Engineered offline-first sync with concurrency/conflict control, keeping warehouse operations reliable under low- and no-network conditions; authored the offline design doc adopted by the team.
- Wired 4 high-throughput capture paths — hardware/keyboard scanners, barcode/QR, OCR capture, and ambient-light torch switching — removing manual SKU entry from the highest-volume floor operations.
- Drove operator-experience wins from competitor analysis: icon-based internationalisation replacing text localisation for a multilingual warehouse workforce, zero-knowledge UX, and multi-tenant whitelabelling across client brands.

**Core Platform Team — Identity & Access Management (IAM) / SecOps · Vue.js + Frappe/Python**

- Shipped net-new user-lifecycle and access-management features on a security-sensitive platform governing internal user access across the organisation.
- Built a Vue.js single-page audit and gap-management dashboard on Frappe/ERPNext serving 5 distinct user personas, covering record creation, multi-step workflows and role-scoped work queues.
- Designed a role-based access and field-level permission layer enforcing per-workflow-state edit rules across audit and gap processes, on top of the Frappe workflow engine.
- Automated IAM lifecycle operations — application-level user enable/disable, bulk user actions, and change-request/change-tracker validation — connected to an external incident-ticketing system, cutting access-request turnaround from multi-day manual coordination to same-day self-service.
- Extended a SecOps monitoring dashboard surfacing asset, access and change-tracking reports across production and non-production environments.
- Adopted and championed the BMad spec-driven development methodology across the team — a spec-first flow keeping AI-assisted work structured and human-directed, measurably reducing post-release defects and lifting unit-test coverage on the modules it covered.

### ElasticRun — Software Engineer Intern
*Pune, India · Aug 2023 – Jul 2024*

- Built the Campaigns package (Flutter, `er_core_packages`) — a config-driven ad-campaign delivery framework ingesting JSON config from Frappe, compiling it into typed domain objects and local DB tables, matching campaigns against runtime in-app events, and rendering via self-rendering widgets. Adopted across the Sales, Customer, Field and Courier apps and still in production 2 years on.
- Launched features across the Sales, Customer and Field apps in Flutter — incentive criteria (AND-condition rules), survey widgets, feedback flows, in-app campaign banners — plus GA4 instrumentation for reliable event tracking.
- Migrated the Courier app to Flutter and built reusable cached components reused across the app ecosystem; authored module test suites (Catalog, Training).

### ActualOne Protocol — Lead Web Developer
*Pune, India · Jun 2023 – Aug 2023*

- Built and launched the product MVP on a Next.js full-stack architecture as a founding engineer, taking it from zero to production in 12 weeks and establishing the frontend and backend foundation the team built on.
- Owned end-to-end delivery from architecture decisions to production deployment, shipping 8 core features that drove product validation with the first 200 users.

### IEEE Student Branch, VIT Pune — Executive Committee Member
*Pune, India · Jun 2021 – Jun 2022*

- Built the Node.js backend for the branch website, cutting content-publishing effort for 15+ events a year from hours of manual edits to minutes.
- Shipped a complete event-ticketing system with real-time validation in 24 hours, processing entry for 500+ attendees at the annual tech event with zero downtime. 

---

## SIDE PROJECTS

**Adaptive Learning System — self-healing agent control loop.** Designed a SENSE → COMPARE → DIAGNOSE → ADAPT → ROLLOVER loop where an LLM agent reads a nightly six-field log, diagnoses drift against plan, and re-sequences the next day; spaced repetition (SM2), interleaving and leech rules encoded as planner invariants.

**AI Operating System — a generic spec-driven delivery framework.** Personal project, built from one observation: agent-assisted delivery fails less from weak models than from weak constraints. Each layer answers a failure mode I hit in practice. *Agents inventing requirements* → a constitution layer where every change must map to a stated acceptance criterion, and nothing is called done on its first pass. *One generalist agent producing shallow work* → an orchestrator that composes 2–4 specialist roles per delivery dimension (quality, tests, architecture, adversarial review) instead of one prompt. *Unverifiable completion* → a layered model from test harness to ship, gated by verification batches whose trace rows flip only when exit tests pass. *Context burned on blind code search* → a retrieval hierarchy putting structured artefacts and a code knowledge graph ahead of scanning, with scans reserved for what they cannot answer. *Improvements getting lost* → an experiment loop that seals proven wins back into the rules layer, so the framework tightens itself over time.

---

## EDUCATION

**B.Tech, Artificial Intelligence & Data Science** — Vishwakarma Institute of Technology, Pune · 2020–2024 · CGPA 9.3/10

## AWARDS

- **Kavach 2023 Grand Finalist** — Government of India national hackathon; reached the finals with team Defendify (Indigenous Crypto-Currency Investigation Tool), placing among the top 100 finalist teams nationally.
- **Polybase Pool Prize, ETHGlobal 2023** — sponsor prize for a team project.

## PUBLICATIONS

- *A Study on Personality Prediction & Classification Using Data Mining Algorithms* — IEEE Xplore, 2023. ML system classifying users into personality categories from questionnaire data. ieeexplore.ieee.org/document/10076743
- *A Review of Document Text Search Using Nondeterministic Automata* — EasyChair Preprint, 2022. Survey in Theory of Computation.
