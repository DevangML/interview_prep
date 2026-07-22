# Sprint Change Proposal — Teach-Me Flow Course Correction

**Date:** 2026-07-22
**Trigger:** New verified understanding of Devang's breadth of work (from Jira analysis) + 2026 market-demand data
**Mode:** Batch
**Author:** Correct-Course (adapted — this project has curriculum artifacts, not PRD/epics)

---

## Section 1 — Issue Summary

The teach-me curriculum (built Session 1) treated Devang as a blank-slate candidate weak across the board. Two new inputs invalidate that framing:

1. **Verified breadth (Jira, 601 items over 2 years):** Devang has real, shipped depth in Flutter mobile, offline-first architecture with sync/concurrency control, a config/JSON-driven UI rendering engine (campaigns framework), device integration, full-stack Vue/Frappe/Python, and IAM/SecOps (RBAC, workflow engines). He *practices* many system-design and CS concepts daily — he just can't frame them in interview/theory vocabulary.
2. **2026 market demand:** AI-integrated engineers command a 30–40% premium; System Design + cloud architecture is the top mid→senior lever; Flutter-alone is commoditized; cloud (AWS/Azure/GCP) is a hard gap.

**Net:** The real gap is **articulation, not ability** (for System Design), plus genuine ground-up gaps (DSA, SQL, Core CS theory, cloud), plus a market-differentiation opportunity (AI + system thinking) that the old plan under-weighted.

---

## Section 2 — Impact Analysis

| Artifact | Impact | Change |
|---|---|---|
| `okf_state.json` | Strengths were unverified/generic; System Design mis-tagged as pure weakness | Add `verified_breadth`, `experience_bridge`, `market_demand_2026`; reframe System Design as "latent strength / vocabulary gap" |
| `CURRICULUM_SPEC.md` | No leverage of existing work; no market alignment | Add "Experience Bridge" + "2026 Market Alignment" sections; add cloud + AI-integration tracks |
| `90DAY_LEARNING_PLAN.md` | System Design treated as from-scratch; no AI/cloud emphasis | Reframe System Design weeks to bridge from his real work; add AI-integration & cloud fundamentals |
| `SKILL.md` (teach-me) | Pedagogy curates/tests generically | Add "Experience Bridge" pedagogy rule: anchor new theory to work he's shipped |

---

## Section 3 — Recommended Approach

**Direct Adjustment** (no rollback). Keep the Curate → Learn → Test → Save loop and the basics-first/no-assumptions spine. Layer in three corrections:

1. **Experience Bridge** — teach weak theory by connecting it to what he already built (fastest path, best retention).
2. **Strength Sharpening** — turn practiced-but-unarticulated skills into interview-ready narratives (System Design, AI context engineering).
3. **Market Alignment** — weight the plan toward 2026's paying skills: AI integration (his edge), formal System Design, and cloud (his gap).

---

## Section 4 — Experience Bridge (the heart of the correction)

Map each "weak" interview topic to work Devang has already shipped, so learning is recognition, not memorization:

| Interview topic (was "weak") | Devang already did this | Bridge to teach |
|---|---|---|
| **CAP theorem, eventual consistency** | Offline-first WMS sync under no-network | "You lived AP in offline mode; here's the formal name + trade-offs" |
| **Concurrency control, locking, optimistic concurrency** | Concurrency/conflict control in Putaway/GRN | Formalize optimistic vs pessimistic, version vectors |
| **Design patterns (Interpreter/Strategy/Factory)** | Config/JSON-driven self-rendering widget engine | Name the patterns he intuitively built |
| **Pub/Sub, Observer, event-driven** | Campaign event-matching at runtime (visit/action triggers) | Formalize event-driven architecture |
| **Access control models (RBAC/ABAC)** | IAM field-level permissions + workflow-state edit rules | Map to standard RBAC/ABAC theory |
| **Caching, TTL, invalidation** | Cached reusable components; catalog calls removal | Formalize cache strategies |
| **Sharding / partitioning** | Multi-tenant whitelabelling, per-client data | Bridge to tenancy + sharding |
| **API design / idempotency** | REST calls, header standardization, sync retries | Formalize idempotency, pagination, versioning |

DSA and SQL remain **genuine ground-up** (interviews hard-gate on them) — no bridge shortcut, but framed with his data-heavy domain examples.

---

## Section 5 — 2026 Market Alignment (re-weighting)

| Priority | Skill | Why (2026 signal) | Devang status |
|---|---|---|---|
| **Differentiator** | AI integration (LLM APIs, RAG, agentic, context engineering) | +30–40% salary premium | STRONG — lean in hard |
| **Mid→Senior lever** | Formal System Design | Biggest level-up signal | Latent strength — needs vocabulary |
| **Table stakes** | DSA, SQL, Core CS | Interview gates | Weak — ground-up drill |
| **Gap to close** | Cloud (AWS/Azure basics), CI/CD, containers | Broadly required 2026 | Missing — add fundamentals |
| **Adjacent edge** | Security / IAM | Cybersecurity demand up | Has real exposure — package as narrative |
| **Don't over-invest** | Flutter depth | Already strong + commoditized | Maintain, don't grind |

---

## Section 6 — Implementation Handoff

Apply now: update `okf_state.json`, `CURRICULUM_SPEC.md`, and the teach-me `SKILL.md`. The 90-day plan's System Design weeks re-anchor to the Experience Bridge; add a thin AI-integration + cloud-fundamentals track running parallel from Week 5.

**Success criteria unchanged** but add: (1) can articulate 3 of his real projects in formal System-Design terms; (2) can pitch AI-integration experience as a differentiator; (3) cloud fundamentals gate (deploy + basic architecture) by Week 8.
