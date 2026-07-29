# BFSI_QUESTIONS.md — 14 BFSI-flavoured questions with spoken model answers

**For TCS BFSI-America, Gen AI / AIML Engineer. Sat 01 Aug 2026.**

Every answer below is written as **spoken words**, sized to 20-40 seconds. Say them out loud
Thursday and Friday until the shape is yours — do not memorise them word for word, memorise the
*move* each one makes. Every claim is sourced in `BFSI_DOMAIN.md`.

**Ranked by probability.** Q1-Q5 are the ones to have cold.

---

## Q1. "How would you handle PII in a RAG pipeline for a bank?" — VERY HIGH

> "Four points, and the order matters more than the tooling. At ingestion I'd classify and tag, so
> PII presence becomes filterable metadata — which means the entitlement filter gates on
> sensitivity as well as on department. Before the model boundary I'd redact and tokenise: a hosted
> model provider is a service provider under the GLBA Safeguards Rule, so it's covered by contract
> — no training, no retention — but I wouldn't lean on the contract alone. The strongest control is
> the data you never sent. In the logs I'd redact before persisting rather than after, keeping the
> reversible mapping in a separate vault with its own access control. And on deletion, chunk-level
> lineage back to the source record — because if you can't map a chunk back to a customer, you
> can't honour a deletion request against your index."

**Follow-ups they'll push:**
- *"What if the model provider says they don't train on your data?"* → "Good, that's necessary. It
  isn't sufficient — it doesn't cover a breach at their end, or their subprocessors, and I'd still
  minimise at the boundary. Contract and control, not contract instead of control."
- *"Redaction breaks the answer quality though."* → "It does, and that's a real cost. Tokenisation
  rather than deletion preserves referential structure — the model can still reason about
  'CUSTOMER_A' consistently. Where it genuinely can't work, that's the case for an in-tenancy or
  self-hosted model instead."
- *"Where does the redaction run?"* → "Inside the trust boundary, before egress. If it runs at the
  provider it's already too late."

---

## Q2. "How do you build an audit trail for LLM decisions?" — VERY HIGH

> "FINRA's 2026 oversight report says firms should log prompts and outputs and test for accuracy
> and bias — existing supervision and recordkeeping rules apply the same as for any other
> technology. So per query I'd persist one immutable record: request id; the authenticated
> principal and the entitlements in force *at that moment*, because permissions change and 'who
> could see what in March' is a question you will be asked; the query; the retrieved chunk ids and
> scores; the chunk ids the access filter *excluded*; the prompt and model versions; the abstention
> decision and the score behind it, including when it refused; the answer with its citations; and
> any human override.
>
> The exclusion list is the part people forget. A clean log of what you returned proves nothing
> about entitlement — you can only demonstrate the filter was operating if you recorded what it
> removed."

**Follow-ups:**
- *"How long do you retain it?"* → "Not my call — it's set by the firm's record-retention schedule
  and the applicable rule. My job is to make sure the record is complete and immutable enough to be
  worth retaining."
- *"Doesn't that conflict with PCI and GLBA?"* → **This is the good one — see Q3.**
- *"Isn't that a lot of storage?"* → "It is, and it's cheaper than not having it. I'd tier it —
  hot for a supervision window, cold archive after."

---

## Q3. "FINRA wants prompts logged verbatim. PCI wants card data out of logs. Which wins?" — HIGH

> "Neither wins — you resolve it in the pipeline rather than picking a side. I'd redact before
> persisting, not after, so the log never contains the sensitive value in the first place, and keep
> the reversible mapping in a separate vault with its own access control and its own audit trail.
> The supervision log stays faithful enough to reconstruct what happened and what the system said,
> and the sensitive values sit behind a second door with a much smaller access list.
>
> The thing I'd resist is treating it as a compliance argument to be won. It's a design constraint
> with a clean engineering answer, and if I'd waited for the two policy owners to agree before
> building, I'd have shipped nothing."

**Follow-ups:** *"Who decides what gets redacted?"* → "The classification policy, and I'd want it
as configuration with a test suite, not as regexes scattered through the code." · *"What if
redaction misses something?"* → "Then the vault boundary is the second layer. And I'd measure the
redaction recall on a labelled set — same discipline as any other eval."

---

## Q4. "How do you explain an AI-driven decision to a regulator?" — HIGH

> "It depends entirely on whether the AI made the decision or supported it, and I'd push hard to
> keep it supporting. The CFPB's position in Circular 2022-03 is that noncompliance with ECOA
> can't be excused because the technology is too complex or opaque — you still owe the applicant
> the specific principal reasons for an adverse action. So 'the model said so' isn't an
> explanation, it's a violation.
>
> The architecture that follows is: keep the LLM in a retrieval-and-drafting role where every claim
> carries a citation to a source document, keep the actual decision on a deterministic, inspectable
> path — rules or an attributable model — and keep a named human accountable. Then the explanation
> is the evidence trail, not a post-hoc story about the model."

**Follow-ups:** *"What if the bank wants the LLM to make the call?"* → "Then it's in scope as a
decisioning model and needs independent validation and a defensible reason-generation path. I'd
say so early rather than at UAT." · *"Is a SHAP value an explanation?"* → "For a tabular model it's
a start. It's a technical attribution, not necessarily a *principal reason* in Reg B terms — those
aren't the same standard, and 2023-03 is explicit that you can't fall back on the sample-form
checklist if it isn't the real reason."

---

## Q5. "Why can't you just fine-tune on the bank's customer data?" — HIGH

> "Three reasons, and the third is the one that actually stops you. First, contract and law — that
> data came in under a privacy notice with a stated purpose, and training a model is usually not
> that purpose; under GLBA the model provider is a service provider you have to bound by contract.
> Second, once it's in the weights you can't get it out, which breaks deletion rights and makes an
> extraction attack a permanent exposure rather than a temporary one.
>
> Third, and this is the practical one: fine-tuning bakes the data in *without the entitlements*. A
> model trained on the whole corpus will happily answer from a document the person asking was never
> cleared to see, and you have no filter to put in front of it. Retrieval keeps the permission check
> at query time, where it belongs. That's the argument for RAG over fine-tuning in this domain, and
> it's not about cost."

**Follow-ups:** *"When would you fine-tune?"* → "On format, tone and task structure — using
synthetic or fully de-identified data. Teach it *how* to answer, never *what* the customer's
balance is." · *"What about RAG leaking too?"* → "It can, and that's exactly what I measured — 55%
of queries leaked with no access control. The difference is that with retrieval there's a place to
put the fix. With fine-tuning there isn't."

---

## Q6. "Walk me through model governance for a GenAI system in a US bank." — MEDIUM-HIGH

> "I'd start by flagging something that changed in April. The Fed, OCC and FDIC issued revised
> model risk guidance — OCC Bulletin 2026-13 and SR 26-2 — which rescinds the old OCC 2011-12, the
> SR 11-7 line. And it says explicitly that generative and agentic AI are *not* within scope,
> because they're novel and rapidly evolving.
>
> That sounds like relief and it's the opposite. There's no checklist to point at and call yourself
> covered, so you fall back on general risk governance — which means the burden is on the delivery
> team to demonstrate its own controls. The Treasury's Financial Services AI RMF from February goes
> the other way and gives you 230 control objectives, staged by adoption maturity. Practically I'd
> build: a model inventory with versions, prompt change control, an eval suite a second team can
> run without me, and monitoring for drift — and I'd keep the three-lines-of-defence shape, because
> that principle didn't go anywhere."

**Follow-ups:** *"So is GenAI unregulated?"* → "No — it's un-*specified*. Everything general still
applies: supervision, consumer protection, privacy, third-party risk. Less prescription, not less
obligation." · *"What's independent validation for a RAG system?"* → "A second team reruns the eval
against a held-out set they built, on the same commit, and gets the same numbers. If they need me
in the room, it isn't independent."

---

## Q7. "Two users ask the same question. Should they get the same answer?" — MEDIUM-HIGH

**This is your project, handed to you. Do not rush it.**

> "No — and building as if the answer were yes is the most common enterprise RAG failure. A
> relationship manager and a compliance officer should get different answers to the same question,
> because they're entitled to different documents.
>
> I actually measured the three ways to build this. With no access control, 55% of queries returned
> content the user wasn't cleared to read. Filtering after the vector search leaks nothing but
> starves 55% of legitimate queries — the top-k gets consumed by chunks the user can't see, they're
> stripped out, and someone entitled to ask gets nothing back. Filtering before the search gives
> you neither failure. The cost is that your vector store has to support metadata filtering inside
> the search, so that becomes a database selection criterion rather than an afterthought."

**Follow-ups:** *"How do you keep entitlements fresh?"* → "Permissions change constantly, so ACL
metadata lives in a filterable metadata layer and is never baked into the vector — otherwise a
team move triggers a re-embed. I built joiner/mover/leaver automation in a previous role, so that
constraint came from experience rather than theory." · *"What about caching?"* → **See Q8.**

---

## Q8. "You add a semantic cache for latency. What's the risk?" — MEDIUM

> "A cache that's keyed on the query and ignores the principal is an access-control bypass. User A
> asks something, the answer is cached, User B asks the same thing and gets a cached answer built
> from documents they were never entitled to see — and it looks like a performance win, so nobody
> investigates it. Every control you put in the retrieval path is silently gone.
>
> So the cache key has to include the entitlement set, not just the query. Which means the cache
> hit rate drops, and that's the honest trade — you're buying correctness with latency. And the
> cache has to invalidate on permission change, not just on document change."

**Why this one matters:** it's the failure mode nobody volunteers, and it's your seniority signal.
**Follow-up:** *"Doesn't that kill the cache's value?"* → "It reduces it. You still get real hits
within an entitlement group, which in a bank is usually a large team. Cache per group, not per
user, and not globally."

---

## Q9. "Where do you put a human in the loop, and where don't you?" — MEDIUM

> "I'd map it to the cost of being wrong and the reversibility. Anything that produces a customer
> obligation, a credit or suitability decision, or a regulatory filing gets a human who is
> *accountable*, not a human who clicks approve — meaning they see the citations and the confidence,
> and the interface makes rejecting easy. Internal drafting, summarisation and search assistance
> can run without one, provided the output is clearly marked as generated and carries citations.
>
> The thing I'd instrument is the override rate. If humans approve 99.8% of what the system
> proposes, you don't have a human in the loop, you have a rubber stamp with a headcount cost —
> and I'd rather know that from telemetry than find out in an audit."

**Follow-ups:** *"What's a good override rate?"* → "I don't have a benchmark and I wouldn't invent
one. What I'd watch is whether it's *moving* — a rate collapsing toward zero over time means
attention decayed, not that the model improved." · *"Maker-checker?"* → "Same pattern. I built
approval workflows for privileged actions in an IAM system; this is that, with a model proposing."

---

## Q10. "How would you evaluate a RAG system so a validator trusts it?" — MEDIUM

> "The test isn't whether the numbers are good, it's whether someone else can reproduce them
> without me. So: a versioned eval set checked into the repo with the code, a single command that
> runs it, and a report stamped with the commit hash and the index snapshot id.
>
> On mine I built forty questions — 28 answerable and 12 that should be refused — and I measure
> retrieval quality, abstention accuracy, and the access-control failure modes separately, because
> they fail differently. Recall@5 is 1.0, precision@5 0.714, abstention accuracy 0.975. And I'd run
> it on a schedule rather than once at go-live, so you have evidence the control was operating over
> a period, not just that it passed on launch day. That's the difference between validation and
> monitoring, and an auditor wants both."

**Follow-ups:** *"Who writes the eval questions?"* → "SMEs, not engineers. If I write the questions
I'm testing my own assumptions." · *"How do you know 40 is enough?"* → "It isn't, for production.
It's enough to distinguish three architectures, which is what I built it for. I'd want stratified
coverage per document class and per persona before I'd sign anything."

---

## Q11. "Data residency — you're in Pune, the data's in the US. How do you work?" — MEDIUM

> "I'd assume from the start that I never touch production data offshore, and build against
> synthetic or masked fixtures inside whatever tenancy the client approves. That's not a
> constraint I'd need to be told twice.
>
> What it changes is where the effort goes. If the fixtures are the only thing I can see, the
> quality of the synthetic corpus and the eval set becomes first-class work rather than an
> afterthought — it has to be a genuine proxy for the real distribution or my numbers are
> decoration. My own project is entirely synthetic for the same reason, so I've already had to
> think about whether the corpus was representative."

**Follow-up:** *"What if you need to debug a production issue?"* → "Then it goes to someone with
onshore access, and I make sure the logs are rich enough that they rarely have to — good
observability is partly a data-residency control."

---

## Q12. "What GenAI use case would you pick for a US bank, and why that one?" — MEDIUM

> "Document processing in lending or KYC, and I'd pick it precisely because it's unglamorous. The
> volume is enormous, the manual cost is real, the output goes to a trained human who reviews it
> anyway, and the model isn't making the decision — so your model-risk exposure is bounded and
> you can actually ship it this year.
>
> What I'd avoid as a first project is anything customer-facing and unattended. That's where the
> hallucination exposure is highest and where a wrong answer becomes a representation the
> institution owns. Earn the trust on the internal use case, build the evaluation and audit
> muscle there, and then go outward."

**Follow-up:** *"Isn't that low value?"* → "It's high value and low novelty, which is the good
quadrant when the alternative is a pilot that never passes risk review."

---

## Q13. "How do you stop prompt injection in a bank's RAG system?" — MEDIUM-LOW

> "I'd start by saying I don't think you fully stop it — you contain the blast radius. Retrieved
> document content is data, not instructions, and it should be delimited and labelled as untrusted
> in the prompt. But the real control is downstream: the model shouldn't have any capability that
> matters. If it can only read from an already-entitlement-filtered set and write text, an
> injection gets you bad text, which a human reads. If it can call tools that move money or change
> entitlements, an injection gets you an incident.
>
> So the answer is least privilege on the model's tools, the same as least privilege on a user —
> and the entitlement filter running before retrieval means an injected instruction still can't
> reach a document the user wasn't cleared for."

**Follow-up:** *"Agentic systems then?"* → "Every tool the agent gets is a new permission grant,
and I'd review it the way I'd review a role definition. FINRA's 2026 report has a section on
autonomous agents for a reason."

---

## Q14. "Your project is 16 documents. Why should I care?" — LIKELY, AND IT'S A TEST

**Do not get defensive. This is a composure test.**

> "You shouldn't care about the scale — you should care about the comparison. Sixteen documents is
> a toy corpus and I say so before anyone asks. What sixteen documents *is* big enough for is to
> put three architectures side by side under the same eval and see which failure mode each one has.
> That's the result: no access control leaks 55% of queries, post-filtering starves 55%,
> pre-filtering does neither. That relationship doesn't come from corpus size, it comes from where
> you put the filter relative to the search.
>
> What sixteen documents genuinely can't tell me is how it behaves at 10 million — the index
> structure changes, the filter gets expensive, ingestion becomes a pipeline. I know which things
> I've shown and which I've only reasoned about, and I'd rather be clear about that line than
> blur it."

**Follow-up:** *"So what breaks at 10 million?"* → Go to `PROJECT_TALK_TRACK.md` §5 — index,
ACL filter cost, ingestion, latency budget, and the semantic-cache ACL bypass.

---

## THE UNIVERSAL ESCAPE HATCH

> "I didn't measure that. What I did measure was ___, and here's what that showed."

In a domain whose entire job is provability, naming the edge of your knowledge **raises** your
credibility. Use it without hesitation and without apology. A candidate who improvises gets probed
until they break.

---

## THE ONE-PER-ANSWER RULE

**Maximum one regulatory citation per answer.** One reads as expertise. Three reads as a candidate
who skimmed a compliance blog on Thursday. Your five strongest, one each:

| Citation | Use it for |
|---|---|
| **FINRA 2026 report** — log prompts and outputs | Audit trail (Q2) |
| **CFPB Circular 2022-03** — complexity is no excuse | Explainability (Q4) |
| **OCC 2026-13 / SR 26-2** — GenAI carved out of scope | Model governance (Q6) |
| **GLBA Safeguards** — vendor is a service provider | PII / fine-tuning (Q1, Q5) |
| **Treasury FS AI RMF** — 230 control objectives, Feb 2026 | Governance breadth (Q6, Q10) |

Full URLs in `BFSI_DOMAIN.md` §SOURCES.
