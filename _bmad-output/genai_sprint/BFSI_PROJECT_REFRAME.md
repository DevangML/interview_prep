# BFSI_PROJECT_REFRAME.md — permrag, retold for a bank

**This is the highest-value file in the sprint. If you read one thing Friday night, read this.**

Nothing here changes what you built or what you measured. It changes **which door you walk in
through**. The old talk track opens with a technique ("I applied the ACL filter before the vector
search"). For a BFSI-America panel, that is the second sentence, not the first. The first sentence
is a bank scene.

The provenance rule from `PROJECT_TALK_TRACK.md` still governs everything: **this is a personal
project you built recently, and the IAM system underneath it is real shipped production work.**
Keep them distinct. That separation is *more* important in BFSI, not less — this is an industry
where overclaiming is the disqualifying sin.

---

## 1. THE 90-SECOND VERSION, BFSI CUT

Say this. It is written to be spoken, and it runs about 90 seconds at a calm pace.

> "Let me set it up with a scene rather than an architecture, because the problem is
> organisational before it's technical.
>
> Picture a bank. A relationship manager and a compliance officer both type the same question into
> the same internal assistant. The *correct* system behaviour is that they get different answers —
> because they're entitled to see different documents. The relationship manager shouldn't see the
> compliance file on their own client, and the compliance officer shouldn't be blocked from it.
> Same question, same system, two different correct answers. Almost every RAG tutorial assumes one
> flat corpus and one user, and enterprises are never that.
>
> So I built a small system called PermRAG to find out what actually breaks. I implemented three
> designs and measured all three against a forty-question evaluation set.
>
> With no access control at all, fifty-five percent of queries returned content the user wasn't
> cleared to read. In a bank that's not a bug you fix next sprint — that's a notifiable incident.
>
> The obvious fix is to retrieve first and filter afterwards. That leaks nothing, but I measured
> that it starves fifty-five percent of legitimate queries: your top-k gets consumed by chunks the
> user can't see, they get stripped out, and someone who was fully entitled to ask gets an empty
> answer. So the naive fix is secure and useless.
>
> Filtering *before* the search gives you neither failure — zero leakage, zero starvation, because
> top-k is drawn from the authorised set to begin with. And there's a real cost to that, which is
> that your vector store now has to support metadata filtering inside the search itself. That
> becomes a selection criterion for the vector database rather than an implementation detail.
>
> I went at this problem because I've shipped it before in a different shape — I built the IAM
> layer at ElasticRun, role-based access with field-level permissions across five personas,
> approval workflows, default-deny. This is that same permission model applied to retrieval instead
> of to a UI.
>
> There's also an abstention gate, so it refuses when it doesn't have grounds to answer, and I
> tuned that threshold to 0.975 accuracy on the eval set. Small corpus — sixteen documents — but
> everything is measured, and I can show you the table."

**Then stop.** Let them pull. The table is the hook.

### The one-line version, for when they say "quickly, what did you build?"

> "A retrieval system where two people asking the same question correctly get different answers,
> because the entitlement filter runs before the vector search rather than after it — and I
> measured what breaks in the other two designs."

---

## 2. WHICH NUMBERS TO LEAD WITH FOR THIS AUDIENCE

You have eight memorised numbers. **For BFSI the ranking changes.** Lead with risk numbers, not
quality numbers.

| Rank | Number | Why it lands with a BFSI panel |
|---|---|---|
| **1** | **55% leakage with no ACL** | This is a GLBA / information-barrier incident expressed as a percentage. It is the number that makes a compliance-minded listener sit up. |
| **2** | **55% starvation with post-filtering** | This is the *insight*. Anyone can say "add access control." Only someone who measured knows the safe-looking fix silently destroys the product. This is your seniority moment. |
| **3** | **0 and 0 with pre-filtering** | The payoff. Zero leakage, zero starvation. |
| **4** | **0.975 abstention accuracy at threshold 0.60** | Reframe as *risk appetite*, not accuracy — see §3. |
| **5** | **1 failing case out of 40, and I know why** | Volunteered failure is the single strongest credibility signal in a regulated-industry interview. Never skip it. |
| 6 | 0.71 → 0.21 precision collapse on naive 320-token chunks | Bring out only if they probe chunking. Un-bluffable. |
| 7 | 0.714 → 0.443 precision when MMR was on, so it's off | Bring out only if they ask about reranking. |
| 8 | 16 docs / 80 chunks / 5 departments | Always state unprompted when you quote any of the above. Honest scale protects every other number. |

**The demotion that matters:** precision@5, recall@5 and MRR drop down the list. They are quality
metrics and this audience buys *control* metrics. Have them ready, don't lead with them.

**The rounding rule is absolute here.** Never round up, never invent a ninth number, and if asked
something you didn't measure say "I didn't measure that" immediately. In an industry where the
whole job is provability, the phrase "I didn't measure that" *raises* your credibility.

---

## 3. THE ABSTENTION GATE AS REGULATORY RISK APPETITE

**This is the single biggest reframe available to you, and it costs nothing to make.**

In the generic version, the abstention threshold is a tuning parameter that got to 0.975. In the
BFSI version it is **a risk-appetite dial owned by the business, that you exposed as configuration
rather than burying in code.** That is a governance argument, and it is the kind of sentence that
makes an interviewer decide you have worked near a control function.

Say it like this:

> "The abstention gate is a hallucination guardrail with a tunable cost, and I'd argue the
> threshold isn't a technical decision at all — it's a risk-appetite decision that belongs to the
> business. My table shows the trade-off explicitly. At 0.60 I get 0.975 accuracy: it correctly
> refuses eleven of the twelve unanswerable questions and still answers all twenty-eight it should.
> If I push it to 0.65 it refuses all twelve correctly, but it starts over-refusing three
> answerable ones. At 0.70 it refuses half the answerable set.
>
> So the shape of the curve is: below the knee you get confident wrong answers, above it you get
> unhelpful refusals. For an internal productivity tool I'd sit at the knee. For anything
> customer-facing at a bank, or anything touching a credit or suitability decision, I'd
> deliberately move above the knee and accept the over-refusal — because a confident wrong answer
> to a customer is a misrepresentation the institution owns, and a refusal is just a handoff to a
> human.
>
> The engineering point is that I made that a configured threshold with a measured curve behind it,
> rather than a constant somebody has to guess at. Whoever owns the risk can move it, and they can
> see exactly what they're buying."

**The supporting fact, if you want one and only if you're sure of it:** in *Moffatt v. Air Canada*
the airline argued the chatbot was a separate legal entity and lost — the tribunal held it made no
difference whether the information came from a static page or a chatbot. That is the legal shape
of "a confident wrong answer is a representation by the institution."
(https://www.mccarthy.ca/en/insights/blogs/techlex/moffatt-v-air-canada-misrepresentation-ai-chatbot)

**Deliver that in one sentence maximum.** You are an engineer making an engineering point, not a
person reciting case law at a panel. One reference lands; two sounds rehearsed.

**And keep the honest caveat attached:** the abstention gate scores on retrieval confidence, which
is a proxy. Your one failing case out of forty is exactly where the proxy breaks — chunks that were
topically close enough to clear the threshold but didn't contain the answer. **Similarity is not
sufficiency.** Volunteer that. The fix — a second-stage groundedness check, a cross-encoder or an
LLM-as-judge pass asking "does this context actually contain the answer" — is a named next step,
and in BFSI framing it is also the *control* you'd add before anything went customer-facing.

---

## 4. HOW YOUR IAM BACKGROUND READS AS DIRECT, NOT ADJACENT

**The mistake to avoid:** describing IAM as "warehouse software permissions" and hoping they see
the parallel. They won't do that work for you. **Do the translation out loud.**

The bridge sentence:

> "Access control is the same problem in a warehouse and in a bank — the difference is only what
> it costs when you get it wrong. I've already built the hard version of the model: role-based
> access with field-level permissions across five personas, approval workflows, and default-deny.
> What changes in financial services isn't the mechanism, it's the consequence and the evidence
> requirement — you now have to *prove* the control was operating, not just that it exists."

Then, if they push, the mapping — **four things you shipped, and what each is called in a bank:**

| What you built at ElasticRun | What it is called in BFSI |
|---|---|
| RBAC across 5 personas | Entitlements / role model — the same design conversation as segregating research from trading, or RM from compliance |
| **Field-level permissions** | Column-level and record-level data controls. This is the strong one — most people build role-level and stop. Field-level is what GLBA customer-information minimisation actually needs. |
| **Default-deny** | The single most-recognised control principle in financial services security. Say the words "default-deny" — they are load-bearing. |
| Approval workflows | Maker-checker, segregation of duties, human-in-the-loop for privileged actions — the exact pattern used for high-stakes AI decisions |
| Lifecycle automation (joiner/mover/leaver) | Access recertification and periodic access review — a named, audited SOX/GLBA control |

**The line that turns adjacent into direct:**

> "The reason I could build the permission-aware retrieval layer in a few days is that I wasn't
> learning the permission model — I'd already shipped it. I was only learning where to put it in a
> retrieval pipeline. And the answer turned out to be counter-intuitive: before the search, not
> after."

**The lifecycle point is underrated — use it if entitlements come up.** Permissions change:
people move teams, clients get restricted, an information barrier goes up mid-deal. So ACL
metadata has to be **updatable without re-embedding.** That means permissions live in a filterable
metadata layer and are **never baked into the vector**. You know this because you built
joiner/mover/leaver automation, not because you read it. That is a genuinely senior architectural
constraint and it comes straight out of your production experience.

---

## 5. HOW YOU'D EXTEND IT: AUDIT TRAILS AND PII

This is the "what would you do next" answer, and for BFSI it should be *this*, not "scale it to
10 million documents." Scale is the generic answer; controls are the BFSI answer. Have both, lead
with this one.

### 5.1 The audit trail

Ground it in the regulator's own words, once:

> "FINRA's 2026 oversight report has a dedicated generative-AI section, and one of the plainest
> things it says is that firms should log prompts and outputs and test for accuracy and bias — the
> existing supervision and recordkeeping rules apply just as they would to any other technology.
> So the audit trail isn't a nice-to-have I'd add if there was time. It's the deliverable."
> (https://www.finra.org/sites/default/files/2025-12/2026-annual-regulatory-oversight-report.pdf)

**The record you'd write, per query.** Say it as a list of fields — concrete beats abstract:

> "For every single query I'd persist one immutable record: a request id; the authenticated
> principal and the entitlements that were in force *at that moment*, because permissions change
> and 'who could see what in March' is a question you will be asked; the raw query; the exact
> chunk ids that were retrieved and their scores; the chunk ids that the ACL filter *excluded*,
> which is the bit people forget and it's the only way to prove the control actually fired; the
> prompt version and the model version; the abstention decision and the score it was made on,
> including when it refused; the generated answer with its citations; and any human override
> downstream.
>
> Append-only, with retention set by the record-retention schedule rather than by me. And the
> reason I'd log the *exclusions* as well as the inclusions is that a clean log of what was
> returned proves nothing about entitlement — you can only demonstrate the filter was operating
> if you recorded what it removed."

**That exclusion point is your best original line in this section.** It is a real insight, it is
short, and almost nobody says it.

**The extension that's already half-built:** you have the ablation harness. So —

> "Re-running the eval on a schedule and storing the report against a commit hash turns my
> `ablate` command into a continuous control-testing artifact. That's the difference between
> 'we validated it once at go-live' and evidence that the control was operating over a period,
> which is what an auditor actually wants."

### 5.2 PII

Four stages, and the ordering is the whole answer:

> "I'd handle PII at four points, and the order matters more than the tooling.
>
> **At ingestion**, classify and tag — so PII presence becomes filterable metadata, which means the
> entitlement layer I already built can gate on sensitivity as well as on department. That's a
> small change to my existing filter, not a new subsystem.
>
> **Before the model boundary**, redact and tokenise. If I'm calling a hosted model, that provider
> is a service provider under the GLBA Safeguards Rule, so it's covered by contract — no training,
> no retention, named tenancy — but I wouldn't rely on the contract alone. I'd minimise what
> crosses the boundary in the first place, because the strongest control is the data you never sent.
>
> **In the log** — and this is the tension I'd flag rather than pretend away. FINRA wants the
> prompt and output logged verbatim. PCI and GLBA want cardholder data and customer information
> out of the logs. Those pull in opposite directions. My resolution is to redact *before*
> persisting, not after, and to keep the reversible mapping in a separate vault with its own
> access control and its own audit trail — so the log is faithful enough to supervise and the
> sensitive values are behind a second door.
>
> **On deletion**, chunk-level lineage back to the source record. If you can't map a chunk back to
> a customer, you can't honour a deletion request against your index — and that's an obligation you
> want to have designed for on day one, not discovered on day four hundred."

**Naming the FINRA-versus-PCI tension and resolving it is the strongest 20 seconds in this file.**
It shows you can hold two conflicting requirements at once, which is most of what regulated-industry
engineering actually is. If you only remember one extension answer, remember that one.

### 5.3 The residency / delivery-model answer, if it comes up

> "One thing I'd assume rather than ask: on a US financial-services engagement I'd expect to be
> building against synthetic or masked fixtures and never touching production data from offshore.
> Which is fine — my eval set is synthetic anyway. It does mean the eval corpus has to be good
> enough to be a real proxy, and that becomes a first-class piece of work rather than an
> afterthought."

**[INFERRED — this is a reasonable reading of standard delivery models, not a cited fact. Say it
as an expectation, not as a claim about TCS's practice.]**

---

## 6. THE THREE SENTENCES TO HAVE LOADED

If the room is rushed, or you get one shot, these three are the whole file:

1. **"Same question, two people, two different correct answers — that's the problem, and it's an
   entitlement problem before it's a retrieval problem."**
2. **"Post-filtering is secure and useless; pre-filtering is secure and useful — and I have the
   measured table for both."**
3. **"You can't prove the access filter was operating by logging what you returned. You have to
   log what you excluded."**

---

## 7. WHAT NOT TO DO

- **Don't lead with LangGraph, embeddings or RRF.** Lead with the bank scene. The stack is the
  answer to a follow-up, not the opening.
- **Don't claim BFSI domain experience.** You have none. You have a permission model that
  transfers and a working knowledge of the regulatory shape. Claim exactly that.
- **Don't recite SR 11-7 as your model-governance answer** — see `BFSI_DOMAIN.md` §0, it was
  superseded in April 2026 and GenAI is explicitly carved out of the replacement. Getting this
  right is a genuine edge; getting it wrong is worse than not raising it.
- **Don't name a bank as a TCS client.** You cannot source it in the room.
- **Don't inflate the corpus.** Sixteen documents. Say the number before they ask for it.
- **Don't stack more than one regulatory citation per answer.** One is expertise. Three is a
  candidate who read a blog on Thursday.
