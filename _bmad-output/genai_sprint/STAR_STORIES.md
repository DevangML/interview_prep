# STAR STORIES — TCS Gen AI Engineer, 01 Aug 2026, Pune (Offline)

**Owner:** Devang Manjramkar · **Prepared:** 27 Jul 2026 · **Revised:** 28 Jul 2026 · **Source material:** CV (`_bmad-output/Devang_Manjramkar_CV.txt`), `okf_state.json → verified_breadth` (601 real Jira items, elasticrun-rai, 2 years).

---

## 🔴 REVISION NOTE — 28 Jul 2026 · TENSE AND THE PIP CONTRADICTION

Devang is **no longer employed at ElasticRun** — separated following a PIP. I audited all eight stories. **Good news: the substance of every story survives.** Nothing here needs to be withdrawn. Three things need care:

**1. Tense. Two places imply current employment — fix both.**

| Where | Problem | Fix |
|---|---|---|
| **S2, Situation** | *"Warehouse operators run **our** Field App"* — "our" plus present tense reads as current employment | *"Warehouse operators ran the Field App…"* — see the corrected opener inline in S2 |
| **S2, Result** | *"the app **is** live across multiple enterprise SaaS clients"* | Keep as-is. The app *is* still live; that's true and doesn't imply you're there. |

Everywhere else is already past tense and safe. **General rule: say "at ElasticRun I…", never "we…" or "our…".** The possessive is the tell.

**2. The contradiction to be ready for — throughput vs. a PIP.**

These stories claim 601 shipped items, a framework adopted org-wide, and a methodology the team took up. A sharp interviewer who knows about the separation may ask: *"If all that is true, why were you on a PIP?"* **This is a fair question and it has an honest answer. Do not soften the stories to pre-empt it — they are Jira-verifiable and they are your strongest asset.**

> "Both are true, and they're not actually in tension. The throughput and the delivery are documented — you can verify the ticket volume. The feedback I got wasn't about output; it was about «THE TRUE THING». I read the priority wrong in that stretch, and shipping a lot isn't a defence against shipping the wrong emphasis."

*Then stop. Do not re-litigate the PIP and do not re-argue the stories.* Full ladder in `SEPARATION_NARRATIVE.md` §2.

**⚠️ Consistency check you must run yourself:** whatever you name as «THE TRUE THING» in the separation script **must not be contradicted by a story here**. Example — if the real feedback was *"under-communicated status upward"*, that sits cleanly alongside S7 (you demonstrated rather than announced) and alongside your stated weakness on instrumentation. But if you were to claim the feedback was *"you didn't ship enough"*, S4 and S7 would contradict it. **Pick the true one, then read S4, S5 and S7 once more with it in mind.**

**3. Do not date the stories to the PIP period.** If asked "when was that?", answer honestly if you know; do not volunteer a timeline that invites reconstruction of your last months. If a story genuinely falls in the PIP window and they ask, say so plainly — a manager reference that contradicts a date is far more damaging than the date itself.

**4. S8 is now not your newest AI work.** PermRAG (`project/`) is. Lead with S8 for orchestration depth, then offer PermRAG as the current, inspectable one — see `SEPARATION_NARRATIVE.md` §6.

---

## THE NUMBERS RULE — READ THIS FIRST

Every number below is either (a) evidence-backed from the repo, or (b) marked **«FILL»** because only you know it. **Never speak a «FILL» placeholder aloud.** Either replace it with a real number you can defend under a follow-up question, or drop the number and describe the shape of the impact instead ("it took the team from re-keying every code by hand to scanning almost everything").

**Evidence-backed numbers you may use freely:**
- **601** Jira items shipped over 2 years (all domains)
- **474+** of those in Warehouse Management alone
- **3 product domains**: WMS, SFA, IAM/SecOps
- **4+ apps** touched: Sales, Customer, Field, Courier
- **5 distinct user personas** in the IAM audit/gap dashboard
- **~1 year+** of continuous production life for the Campaigns package, still live in several apps
- **9.3 / 10** CGPA, B.Tech AI & Data Science, VIT Pune
- **2** published papers (IEEE Xplore 2023; EasyChair 2022)

**A senior-sounding engineer does this:** gives the number, then immediately gives the *mechanism* — "throughput went up because we removed a keystroke path, not because we made the UI prettier." Interviewers at the 4-10 year band test the mechanism, not the metric.

**Delivery rule:** Situation + Task ≈ 20 seconds. Action ≈ 60-70 seconds and must be in first person singular ("I decided", "I traded"). Result ≈ 20 seconds. Total 100-110 seconds. Then stop talking. Silence after a Result is a strong signal; filling it is a weak one.

---

## STORY MAP — which story to fire at which question

| If they ask… | Use |
|---|---|
| "Tell me about a complex technical problem" | **S2 Offline-First Sync** |
| "Tell me about something you designed, not just built" | **S1 Campaigns Framework** |
| "Tell me about handling ambiguity / no clear spec" | **S1**, **S5 IAM Permissions** |
| "Tell me about a production failure you owned" | **S2**, **S4 Scanner Throughput** |
| "Tell me about a disagreement / pushing back" | **S3 Next-Gen Rebuild**, **S7 BMad** |
| "Tell me about cross-team work" | **S6 IAM Lifecycle**, **S7 BMad** |
| "Tell me about negotiating scope / a deadline" | **S3**, **S6** |
| "Tell me about your AI work" | **S7 BMad Spec-Driven**, **S8 Agent Orchestration** |
| "Tell me about influencing without authority" | **S7 BMad** |
| "Where have you been wrong?" | **S2** (the conflict-resolution rethink), **S5** |

---

## S1 — THE CAMPAIGNS FRAMEWORK (config-driven delivery engine)
**Signals: architectural thinking · ambiguity · building for other teams · durability**

**Situation.** In my internship year at ElasticRun, several product teams each wanted in-app promotional campaigns — banners, offers, nudges — inside their own Flutter apps. Every team was about to build its own version. There was no spec for a shared solution; there was just a recurring request that kept arriving in different shapes.

**Task.** I proposed and then owned building the Campaigns package inside `er_core_packages`, our shared Flutter package layer — one delivery engine that every app could consume, instead of four bespoke implementations.

**Action.** I made a deliberate architectural bet: keep the campaign definition entirely in configuration, not in app code. The pipeline I built ingests JSON configuration from the Frappe backend, parses it into typed domain objects so failures surface at the boundary rather than at render time, persists it into local database tables so campaigns survive restarts and poor connectivity, matches active campaigns against in-app events at runtime — screen visits, user actions — and renders through pre-configured self-rendering widgets so the consuming app never writes campaign UI. The hard tradeoff was where to put the intelligence. Putting matching logic in each app would have been faster to ship and easier to debug; I put it in the package and paid for that with a stricter config contract and a typed parsing layer, because the alternative meant every new campaign type became four code changes and four release cycles. The second tradeoff was config expressiveness versus safety — I kept the config schema deliberately narrow at v1 and let real campaign requests widen it, rather than guessing at a general-purpose DSL up front.

**Result.** Marketing and product could ship a new campaign by changing backend configuration with no mobile release. It was adopted across the ER business apps, stayed in production for over a year, and is still running in several of them today. As an intern I built the thing other engineers built on top of.

**If they probe — "what would you change now?"**
> "The config contract was validated at parse time on the client, which means a bad config produced a silent no-show rather than a loud failure. I'd move schema validation to the backend at publish time so a broken campaign can't leave the server. That's the same lesson I now apply to prompt and agent configuration — validate the contract where it's authored, not where it's consumed."

**If they probe — "why not just use a feature-flag service?"**
> "Flags turn things on and off. We needed runtime matching against user behaviour inside the app and rendering without a release. A flag service would have handled the toggle and left the other three problems."

---

## S2 — OFFLINE-FIRST WAREHOUSE SYNC AND TASK BLOCKING
**Signals: production reliability owned · genuine technical tradeoff · real-world constraints**

**Situation.** ✅ *Revised opener 28 Jul 2026 — say:* **"Warehouse operators ran the Field App inside physical warehouses — steel racking, cold rooms, dead zones."** *(Original wording, superseded, used "our… run", which implies you are still there.)*

Warehouse operators run our Field App inside physical warehouses — steel racking, cold rooms, dead zones. Network drops mid-operation constantly. And these aren't cosmetic screens: GRN receiving, putaway, picking, stock transfer notes. If the app loses a scanned pick or double-applies it, inventory is wrong and the client's stock ledger is wrong.

**Task.** I worked on the offline-first layer of the Next-Gen Field App — specifically how we handled concurrency and sync states — and I owned documenting the offline design approach for the rest of the team.

**Action.** The core decision was what "offline" is allowed to mean per operation. I treated it as a per-transaction question. Operations that only append queue locally and reconcile on reconnect. But operations that mutate shared server state — where two operators could touch the same bin — cannot be resolved by last-write-wins, because whoever syncs later silently overwrites real physical work. Instead of trying to merge conflicts after the fact, I helped design a pessimistic **Task Blocking** system based on backend business rules that locked the bin. On the frontend, I designed exactly how that block behaved, how it looked, and where the touchpoints lay so the operator wasn't left staring at a frozen screen. The tradeoff I argued for: strict task blocking means an operator occasionally sees a hard error saying "Bin locked," which is friction on the floor. I took that friction, because the alternative is invisible failure — inventory drift you find at audit, weeks later. I also wrote the design up, because an offline model that only lives in one engineer's head becomes wrong the moment someone else adds a screen.

**Result.** The offline path and blocking rules hold across the full warehouse lifecycle — GRN, putaway, PSR, picking, STN, returns — and the app is live across multiple enterprise SaaS clients. The written design is what new features get checked against, so the model degrades slower than it otherwise would.

**If they probe — "how did task blocking work concretely?"**
> "On the frontend, all API calls went through a custom wrapper that queued them as local background jobs. When the device reconnected, those jobs synced to the backend. The backend evaluated business rules to lock the physical bin. If a late-arriving offline sync came in for a bin that was already blocked, the backend used timestamping to detect the stale state and silently discarded the operation. My job on the frontend was ensuring that when that discard happened, the UI cleanly interrupted the operator, explained the lock, and provided a safe exit path, rather than just crashing."

**If they probe — "what broke?"**
> "Early on I under-weighted idempotency on retry. A queued operation that got replayed after an ambiguous network failure could apply twice. The fix was client-generated operation IDs so the server can recognise a replay. That was the moment I stopped thinking about offline as 'store and forward' and started thinking about it as 'exactly-once over an unreliable channel'."

---

## S3 — THE NEXT-GEN REBUILD AND ICON-BASED INTERNATIONALISATION
**Signals: product judgment · competitor research · challenging a default · scope**

**Situation.** We rebuilt the warehouse Field App ground-up — "Next-Gen" — migrating from a Material 2 to a Material 3 design system and reworking the operator experience. The users are warehouse floor staff, often with high turnover, often multilingual, often reading the screen one-handed while holding a scanner.

**Task.** I contributed to the operator-experience direction, not just the implementation, and I ran competitor analysis to ground it in something other than our own taste.

**Action.** The default plan for a multilingual workforce is text localisation — translate every string into every language. I argued against it for this product. Translation gives you a maintenance burden per language, a QA matrix per language, and layout breakage in long languages, and it still fails the operator who is functionally low-literate in *every* language on the list. From the competitor analysis I pushed instead for icon-based internationalisation — carrying meaning in glyphs and consistent spatial position, with text as support rather than as the payload — plus a deliberately zero-knowledge UX where a new operator can complete a task without training, and multi-tenant whitelabelling so each enterprise client's branding sits on the same operator flows. The tradeoff I had to defend was that icons are ambiguous where words are precise, so this only works if the icon set is small, consistent, and reinforced by position. I scoped it that way rather than icon-ifying everything.

**Result.** The rebuild shipped with the M3 design system and the reworked operator model, live across multiple enterprise SaaS clients, and the app carries features across the whole warehouse lifecycle. The direction was adopted because it was argued from user constraints and competitor evidence rather than preference.

**If they probe — "how did you validate the icons work?"**
> "Consistency of position was the real lever — the same action lives in the same place on every screen, so the operator learns location before they learn the glyph. Where a glyph genuinely couldn't carry meaning alone, I kept text. I'd rather be inconsistent on purpose than dogmatic."

---

## S4 — SCANNING THROUGHPUT AND DEVICE INTEGRATION
**Signals: measuring the right thing · hardware constraints · owning the boring path**

**Situation.** Warehouse throughput is bounded by how fast an operator can get a code from a physical carton into the system. Manual entry is slow and error-prone, and an error here is a wrong SKU on a real pallet.

**Task.** I built the device-integration layer for high-throughput scanning in the Field App.

**Action.** I integrated multiple capture paths rather than one: keyboard-wedge and handheld hardware scanners for the operators who have them, camera-based barcode and QR scanning for the ones who don't, and OCR-based capture for the labels that are damaged or non-standard and would otherwise force manual typing. The detail I'm most attached to is ambient-light-based torch switching — reading the light sensor and driving the torch automatically, because in a cold room or a low aisle the operator's hands are full and asking them to tap a torch button is asking them to put something down. The engineering tradeoff was battery and sensor noise against convenience: naive light-triggered torch flickers at threshold boundaries, so it needed hysteresis rather than a raw threshold.

**Result.** Manual data entry on the floor dropped substantially — scanning became the default path and typing became the exception. Across the WMS work I shipped **474+ Jira items**, and this integration layer is what several of the lifecycle features depend on.

**If they probe — "how did you know it helped?"**
> "The honest answer is the strongest signal was behavioural, not a dashboard number — operators stopped falling back to manual entry, and the support requests about unreadable labels changed shape. If I were doing it again I'd instrument capture-path selection from day one so I could quote you the ratio instead of describing it."

*(This is a genuinely good answer. It shows you know the difference between a measured claim and an observed one — which is exactly the discrimination a 4-10 year band is supposed to buy.)*

---

## S5 — IAM ROLE-BASED ACCESS AND FIELD-LEVEL PERMISSIONS
**Signals: security-sensitive correctness · 5 personas · ambiguity in requirements**

**Situation.** On the Core Platform team I moved to Identity & Access Management / SecOps — a Vue.js single-page audit and gap-management dashboard on Frappe/ERPNext. Five distinct user personas touch the same records at different points in a multi-step workflow. On an IAM system, "who can edit what, when" is not a UI concern, it's the product.

**Task.** I designed the role-based access and field-level permission layer, enforcing per-workflow-state edit rules across the audit and gap processes, integrated with the Frappe workflow engine.

**Action.** The requirement arrived as ambiguity, not spec — five personas, a workflow, and an assumption that "the right people can edit the right things." I made that explicit before writing code by building the permission matrix as an artifact: persona × workflow state × field, so the gaps became visible questions I could take back to stakeholders instead of assumptions I quietly encoded. Then the key architectural decision: enforce at the field level tied to workflow state, not just at the document or role level. Document-level roles are easier and are what most Frappe implementations do, but they force you into either over-granting — someone can edit a field they shouldn't during a state they shouldn't — or a proliferation of near-duplicate roles that nobody can audit six months later. I took the harder model because on a security system the cost of over-granting is unbounded and the cost of extra design work is a week.

**Result.** Five personas operate on shared records through role-scoped work queues with per-state edit rules enforced by the platform rather than by convention, integrated with the Frappe workflow engine. The permission matrix became the reviewable document — when someone asks "can a reviewer edit this after submission", the answer is a lookup, not an archaeology exercise.

**If they probe — "how do you test that?"**
> "The matrix is the test spec. Every cell is an assertion. That's also the only honest way to review it — you can't eyeball permission correctness from code."

---

## S6 — IAM LIFECYCLE AUTOMATION AND EXTERNAL TICKETING INTEGRATION
**Signals: cross-team dependency · bulk/destructive operations · change governance**

**Situation.** User lifecycle in the IAM platform was partly manual — enabling and disabling application-level access, and the change-request trail that has to exist around it for audit. The change trail lives in an external incident-ticketing system owned by a different team.

**Task.** I shipped the IAM lifecycle automation: application-level user enable/disable, bulk user actions, and change-request / change-tracker validation flows, integrated with that external system.

**Action.** Two things mattered more than the feature itself. First, bulk operations on access control are destructive by nature — a bulk disable that runs against the wrong selection locks real people out of production systems. So I built the flow around validation-before-execution against the change tracker: an action doesn't run because someone clicked it, it runs because there's a valid, matching change request behind it. That is deliberately slower than a raw bulk button and I argued for the friction. Second, integrating with a system another team owns means my correctness depends on their contract. I treated their API as untrusted input at the boundary and designed for the case where the ticketing system is unavailable or returns something unexpected — the automation degrades to blocked rather than to permitted. Default-deny is the only safe failure mode in access management. I also contributed to a SecOps monitoring dashboard surfacing asset, access, and change-tracking reports across production and non-production environments, so the trail is visible rather than merely recorded.

**Result.** User enable/disable and bulk actions became governed automation with an auditable change trail rather than manual work plus a hope, on a security-sensitive system where the cost of an ungoverned action is a real incident.

**If they probe — "what if the integration is down and someone urgently needs access?"**
> "Then it's an explicit human override with a named approver and a logged reason — not an automatic fallback. The whole point is that the exception is visible."

---

## S7 — ⭐ AI STORY 1: SPEC-DRIVEN AI-ASSISTED DELIVERY, ADOPTED BY THE TEAM
**Signals: AI engineering judgment · influence without authority · quality measured, not asserted**

**Situation.** By 2025 every engineer around me was using AI coding assistants, and the failure mode was consistent and predictable: fast plausible code, weak alignment to what was actually being asked for, and defects that surfaced after release rather than in review. The industry answer at the time was "prompt better." That doesn't scale, because the problem isn't the prompt — it's that the requirement was never written down precisely enough for either a human or a model to be checked against.

**Task.** I adopted the BMad spec-driven development methodology for my own work first, then made the case for it across the team.

**Action.** I inverted the default workflow. Instead of prompting an assistant with an intent and reviewing whatever came back, the spec comes first — a precise, human-authored contract for what the change must do — and the AI-assisted work is then generated *against* that spec and reviewed *against* that spec. That does three things that matter to me as an engineer. It makes the requirement reviewable before any code exists, which is where review is cheapest. It gives you a stable artifact to evaluate output against, so "is this right" becomes a check instead of an opinion. And it keeps the human in the decision seat — the model accelerates execution, it doesn't own intent. I paired it with strong unit-test coverage and pattern-based review, because a spec without an executable check is still just prose. I promoted it by demonstration rather than by mandate: I ran my own delivery this way, and when the defect and rework pattern visibly differed, other people asked how.

**Result.** The methodology was adopted and promoted within the team. The delivery effect was reduced post-release defects and more predictable delivery, because errors moved from post-release to pre-code. Personally, this is the reason I can claim **601 shipped items across three domains in two years** — the throughput isn't heroics, it's a workflow where the expensive mistakes get caught before they're written.

**If they probe — "so what's your actual role, is the AI doing the work?"**
> "The model does execution. I do intent, decomposition, constraints, and acceptance. That distinction is the whole job. An engineer who can't specify precisely gets faster garbage, and I've watched that happen. The skill that scales is writing a contract tight enough that correctness is checkable — that's true for a junior engineer, an offshore team, and an LLM alike."

**If they probe — "where does this break?"**
> "It's overhead on genuinely trivial changes, and I don't apply it there. It also fails when the spec is written by someone who doesn't understand the system, because then you've formalised a wrong requirement and made it harder to challenge. Spec-first raises the cost of being wrong about intent — which is a feature when intent is knowable and a tax when you're genuinely exploring."

---

## S8 — ⭐ AI STORY 2: BUILDING A MULTI-AGENT ORCHESTRATION SYSTEM END TO END
**Signals: hands-on GenAI engineering · orchestration · retrieval · evaluation · context engineering**

**Be honest about the framing:** this is a system you built for yourself, not client work. Say so plainly — "this one's my own, built outside work." Interviewers respect that far more than a vague implication it was a company project, and it demonstrates exactly the hands-on GenAI depth the role asks for.

**Situation.** I wanted a system that could take a large, messy body of evidence about my own work and turn it into structured, decision-grade output — and I wanted to build it properly rather than by chatting with a model. So I built a multi-agent orchestration system as a real engineering project.

**Task.** Design and build the whole thing: agent topology, task decomposition, persistent memory, retrieval, and evaluation gates.

**Action.** Four engineering decisions, each with a tradeoff.
1. **Topology.** I run a hierarchical-plus-mesh arrangement — a coordinating agent that decomposes work, specialised agents that own a domain, and direct agent-to-agent messaging for handoffs rather than everything routing through the coordinator. Pure hierarchy bottlenecks on the coordinator and burns context re-summarising; pure mesh drifts because nobody owns the goal. The hybrid trades some determinism for throughput.
2. **Context engineering.** The binding constraint in a multi-agent system isn't model quality, it's context budget. Each agent gets a scoped brief and its own retrieval path instead of the full history, because a shared growing transcript degrades every agent in it. Spawning an agent is expensive precisely because it starts cold — so the design question is what minimum context makes it competent.
3. **Memory and retrieval.** Persistent memory outside the conversation, with vector search over it, so state survives sessions and agents retrieve rather than remember. The tradeoff is retrieval precision versus recall — over-retrieving is as harmful as under-retrieving because it crowds the context window with plausible-but-irrelevant material.
4. **Evaluation.** Gates with explicit pass thresholds rather than vibes, and a record of what failed, so the system can be tuned against evidence.
   I also used it on a real corpus — I ran an analysis over **601 Jira items** spanning two years of my own delivery history to extract what I'd actually demonstrated versus what I merely believed about myself. The output of that analysis is the evidence base I'm speaking from in this interview.

**Result.** A working system with a durable memory layer, retrieval, a coordinated agent pipeline, and evaluation gates — and a concrete, non-trivial analysis produced by it. More importantly it gave me the failure modes first-hand: context dilution, agents confidently drifting from the goal, retrieval that returns relevant-looking noise, and cost blowing up from redundant cold starts. Those are the problems that actually decide whether an enterprise GenAI system works, and I've hit all of them with my own hands rather than read about them.

**If they probe — "what was the hardest failure?"**
> "Silent drift. An agent produces something well-formed and confident that has quietly stopped answering the original question, and because it reads well, nothing flags it. The fix wasn't a better prompt — it was making the goal an explicit artifact that output gets checked against, which is the same principle as spec-driven development. That's the single most transferable thing I've learned: in both human and agent systems, the failure is almost never capability, it's an unstated contract."

**If they probe — "how would you apply this at TCS?"**
> "Enterprise GenAI at scale is mostly this problem, not the model problem — grounding output in the client's actual data, keeping agents inside guardrails, and being able to evaluate whether the thing is right before a client sees it. I'd expect to spend far more time on retrieval quality, evaluation, and guardrails than on model selection."

---

## THREE LINES TO HAVE READY IN YOUR MOUTH

Use them verbatim; they close loops fast.

1. **On depth vs. tenure:** "Two years, three product domains, 601 shipped items — I've had unusually high reps per month, and I'd rather be tested on that than on the date on my joining letter."
2. **On AI:** "I don't treat the model as the system. The model is one component inside a system that has a contract, retrieval, guardrails, and an evaluation gate — the engineering is the rest of it."
3. **On mistakes:** "The version of me from a year ago would have shipped that faster and been wrong in a way nobody would have noticed for three weeks."
