# 🔒 GROUND TRUTH — LOCKED SPEC

**Locked: Wed 29 Jul 2026, 12:15 IST.** This file outranks every other file in this folder.
Only the actual TCS invite email outranks this. Where anything else conflicts, **this wins.**

---

## 1. THE INTERVIEW — CONFIRMED FROM THE INVITE ✅

| Field | Value |
|---|---|
| **Business Unit** | **BFSI-America — Gen AI \ AIML Engineer** |
| **Date** | **Sat 01 Aug 2026** |
| **Reporting time** | **09:30 AM** |
| **Mode** | **Face to Face** |
| **Venue** | **SP2 — TCS, Sahyadri Park 2**, Plot No. 5, MIDC SEZ, Rajiv Gandhi Infotech Park, **Hinjawadi Phase-III, Pune 411057** |
| **EP Number** | **EP2026RA7423620** |
| **Recruiter** | Raja Rajeshwari — **7305548644** (Covenant Consultants) |
| **On-site contact** | *"Will update shortly"* — ⚠️ chase Friday |
| **Stated must-carry** | Government photo ID + passport-size photo *(minimum — carry everything)* |
| **Rounds** | ⚠️ **ONE technical round**, then managerial, then HR. Same day. |

**Departure: leave by 07:45. Target arrival 08:45.** Hinjewadi traffic is the only variable that can cost the day.

---

## 2. THE CANDIDATE — LOCKED ✅

| Field | Status |
|---|---|
| **Name** | Devang Gajanan Manjramkar · Pune · EMP05161 (ElasticRun) |
| **Experience** | **"Just under three years, two full-time."** ⚠️ **NEVER round up** — verified against payslips and Form 16 |
| **Employment** | ✅ **Currently employed at ElasticRun**, serving notice. No gap. |
| **Separation** | ✅ **RESIGNED — voluntary.** Record will read *"Resigned."* |
| **PIP** | ⚠️ **None formally initiated.** He resigned first. **Likely no artefact in the HR record.** |
| **Notice** | ✅ **30 days, HR already aligned on release** |
| **Hike letter** | ❌ Does not exist — no increment given |
| **Documents** | ✅ **Complete.** CV ×6 · appointment letter · payslips (unlocked) · Form 16 · **ITR filed** · CTC recon · annual salary details · taxsheet · Aadhaar · PAN · passport · photos · 10th/12th · degree + certificate · consolidated marksheet · EPFO service history |
| **Outstanding** | Employment/experience letter from Namrata · **print EP number + invite email ×2** |

**The separation answer, complete:** > **"I resigned."** Then the notice period. Nothing further. It matches the record exactly.

⛔ **`SEPARATION_NARRATIVE.md` — DO NOT STUDY.** Written for a PIP that never formally happened. Rehearsing it risks volunteering context that exists nowhere in his record.

---

## 3. THE ROLE — BFSI-AMERICA ⭐

**Banking · Financial Services · Insurance. American clients. Regulated industry.**

**Why this is the strongest possible draw for him:**

| His asset | Why BFSI makes it land |
|---|---|
| **`permrag` — pre-retrieval ACL filtering** | In a bank, two people asking the same question **must** get different answers. Not a design choice — a compliance requirement. |
| **Abstention gate, tuned to 0.975** | A hallucination in BFSI is a **regulatory incident**, not a bad UX moment |
| **Evaluation harness** | *"Prove it's right before the client sees it"* is the literal BFSI bar |
| **IAM: RBAC, field-level permissions, 5 personas, default-deny, approval workflows** | **This is banking software.** Not an adjacent bridge — domain experience. |

**Verdict: his project is the most on-target artefact he could have built for this BU.** Everything now gets reframed through it.

---

## 4. THE PLAN — REMAINING

| When | Hours | Focus |
|---|---:|---|
| **Wed 29** (from 11:30) | ~9 | LangChain (3/3) · RAG drawn (3/3) · `permrag` walkthrough · Python by hand (2/3) · evals · **Spoken Mock #1** |
| **Thu 30** (wake 08:00) | ~11 | **BFSI domain + project reframe** · vector DBs · LangGraph *(90 min cap)* · system design w/ PII & audit · STAR stories · **Spoken Mock #2** · **build the Revision Card** |
| **Fri 31** | ~6 | **TAPER — zero new material.** Recall · pitch · light mock · logistics · **stop by 15:30, sleep 22:00** |
| **Sat 01** | 0.7 | Revision card + pitch. **Leave 07:45.** |

**🚫 DO NOT STUDY:** DSA · LeetCode · aptitude · puzzles · OS/CN/DBMS · transformer internals · GANs · model training · `SEPARATION_NARRATIVE.md`

**✂️ IF A DAY COLLAPSES — cut in order:** LangGraph past 90 min → vector-DB depth → generic system design → rapid-fire.
**NEVER CUT:** project talk track · RAG drawn · the pitch · one full spoken mock.

---

## 5. THE PROJECT — `permrag`, MEASURED

| ACL mode | leakage | starvation |
|---|---:|---:|
| **off** | **55%** | 0% |
| **post-filter** | 0% | **55%** |
| **pre-filter** ✅ | **0%** | **0%** |

**The line:** *"Post-filtering is secure and useless. Pre-filtering is secure and useful."*

**The 8 numbers:** 55% leak · 55% starve · 0/0 pre-filter · MMR 0.714→0.443 (measured, so it's off) · fixed-chunk collapse 0.71→0.21 · abstention 0.60 → 0.975 · **1 of 40 fails and he knows why** · 16 docs / 80 chunks / 5 departments

⚠️ **PROVENANCE RULE — never blur this.** It is a personal project built in the last few days. **Not production work at ElasticRun.** The IAM experience underneath it *is* real production work. Keep them distinct and both stay strong.

---

## 6. FILE PRECEDENCE

1. **The TCS invite email**
2. **This file**
3. `BFSI_DOMAIN.md` · `BFSI_QUESTIONS.md` · `BFSI_PROJECT_REFRAME.md` *(in progress)*
4. `HOUR_BY_HOUR.md` — the schedule
5. **`RECITE_CORPUS.md`** — ⭐ **every spoken answer, indexed A1-A12.** Single source for anything said out loud. `RECITE_THIS.md` and `WHY_TCS_ANSWERS.md` hold the long-form versions.
6. `project/DEMO_NUMBERS.md` · `project/PROJECT_TALK_TRACK.md`
7. `PYTHON_BY_HAND.md` · `PYTHON_CONCEPTS.md`
8. `MOCK_INTERVIEW_QUESTIONS.md` · rapid-fire banks · `research/*`
9. `TCS_MANAGERIAL_HR.md` — scripts corrected; its Revision 1/2 headers are stale
10. `DOCUMENTS_AND_ETIQUETTE.md` — **Track A is live**
11. ⛔ `SEPARATION_NARRATIVE.md` · ⛔ `TEACH_ME_31HR_CURRICULUM.md` — superseded
12. ⛔ `MERGED_30DAY_PLAN.md` · `SQL_10DAY_DAILY_RUNSHEET.md` — suspended until after Aug 1

---

## 7. OPEN ITEMS

| # | Item | By |
|---|---|---|
| 1 | **BFSI research + project reframe** — agent running | Thu AM |
| 2 | **Employment/experience letter** from Namrata | Thu |
| 3 | **On-site contact person** — chase Raja Rajeshwari | Fri |
| 4 | **Print:** EP number, invite email ×2, revision card, CV ×6 | Thu/Fri |
| 5 | **Route recce** — Hinjewadi Phase III, departure 07:45 | Fri |

---

## 8. THE SIX THINGS THAT WIN SATURDAY

1. **The pitch** — asked 3/3, opens every round, fully controlled
2. **The project, reframed for a bank** — with real measured numbers
3. **RAG drawn, not recited** — 3/3
4. **Volunteer six test cases** before being asked on any coding question
5. **"I didn't measure that"** — say it freely. It protects everything you *did* measure.
6. **Never over-claim.** Not the tenure, not the project's provenance, not a number.

*Correction history: separated-post-PIP → 3-month notice → **resigned, 30-day notice, no formal PIP.** Generic GenAI → **BFSI-America.** Venue unknown → **Hinjewadi Phase III, confirmed.***
