# BFSI_DOMAIN.md — TCS BFSI-America, Gen AI / AIML Engineer

**Written 29 Jul 2026 for the interview on Sat 01 Aug 2026.**
Every regulatory claim below carries a source URL. Claims are marked **[VERIFIED]** (read from
the source or a direct report of it) or **[INFERRED]** (my reasoning, not a citation).

---

## 0. THE VERDICT ON THE THESIS — read this first

**Thesis:** *BFSI is the domain where permission-aware retrieval, abstention, auditability and
evaluation matter most.*

**Verdict: VALIDATED, and more strongly than expected.** Two findings from this week's research
move `permrag` from "nice project" to "the exact shape of the problem this BU has":

1. **US regulators have, in the last six months, explicitly turned AI governance into an
   engineering-artifact problem, not a policy-document problem.** The US Treasury's Financial
   Services AI Risk Management Framework (19 Feb 2026) ships **230 control objectives**, and the
   reporting on it is explicit that controls map to "system behaviors, ownership assignments, and
   evidence artifacts expected to withstand audit and supervisory review." **[VERIFIED]**
   That sentence is a job description. Evidence artifacts are built by engineers.

2. **There is currently no model-risk safe harbour for GenAI.** On 17 Apr 2026 the OCC, Fed and
   FDIC issued revised model risk guidance (OCC Bulletin 2026-13 / SR 26-2) which **rescinds OCC
   2011-12** — the long-standing SR 11-7 twin — and says plainly: *"Generative AI and agentic AI
   models are novel and rapidly evolving. As such, they are not within the scope of this
   guidance."* **[VERIFIED]**

**Why point 2 is the single best thing you can say in this interview.** Most candidates will
recite "SR 11-7" as their model-governance answer. That is now nine days short of being out of
date by a quarter. The correct, current reading is the opposite of comforting: because GenAI is
carved *out* of the prescriptive guidance, a bank cannot point at a validated-model checklist and
call itself covered. It falls back on general risk governance, which means **the burden shifts
onto the delivery team to demonstrate its own controls.** Pre-filtered retrieval, a tuned
abstention gate, and a 40-question eval set are exactly that demonstration.

Say it once, precisely, and stop. Do not lecture.

---

## 1. WHAT GENAI ACTUALLY GETS BUILT IN BFSI FOR US CLIENTS

Ordered by how often it shows up in production reporting, not by how interesting it is.

| # | Use case | What it really is under the hood | Why it lands at an IT-services firm |
|---|---|---|---|
| 1 | **Document processing** — loan files, claims, tax returns, prospectuses, KYC packs | OCR/extract → chunk → RAG or structured extraction → human review | Highest volume, clearest ROI, lowest model risk because a human signs the output |
| 2 | **AML / KYC investigation support** | Retrieval over customer + transaction + sanctions data; drafting SAR/investigation narratives | Enormous manual cost; false-positive reduction is the pitch |
| 3 | **Customer-service & contact-centre copilots** | RAG over policy/product docs, agent-assist rather than customer-facing | Fastest to pilot; also the highest hallucination exposure |
| 4 | **Relationship-manager / advisor workspaces** | RAG over client portfolios, research, CRM notes — **hard entitlement boundaries** | This is `permrag`'s exact shape |
| 5 | **Compliance QA & control testing** | Summarise policy, test evidence, draft control narratives | Growing fastest post-FS AI RMF |
| 6 | **Research summarisation** | Long-doc summarisation over analyst research, filings | Well understood, low novelty |
| 7 | **Fraud detection** | Mostly classical ML; GenAI sits on top for narrative + triage | Careful: this is *not* mainly a GenAI problem |
| 8 | **Legacy code modernisation** | COBOL/mainframe → Java, test generation, spec extraction | Huge at TCS specifically; large US banks run enormous COBOL estates |

Sources on production adoption and the leading use cases:
- https://www.fluid.ai/blog/generative-ai-in-banking (production use-case mix, 2026) **[VERIFIED as reported]**
- https://regtechanalyst.com/ai-set-to-transform-aml-and-kyc-in-2026/ **[VERIFIED as reported]**

**The two that matter for your story: #1, #4 and #5.** They are retrieval problems with
entitlement boundaries and an audit requirement. That is literally your project.

**[INFERRED]** For a 3-YOE engineer joining a BFSI-America delivery team, the realistic staffing
is #1, #3 or #5 — a RAG pipeline over a bank's document estate, on the client's cloud tenant,
with a human in the loop. Not model training. Not research.

---

## 2. THE REGULATORY-TO-ARCHITECTURE TRANSLATION

**This section is the differentiator.** The rule is: never state a regulation without stating the
line of code, the schema column, or the pipeline stage it forces. Compliance-speak is worthless in
a technical round; the translation is what reads as an engineer who has shipped into a bank.

### 2.1 Model risk — SR 26-2 / OCC Bulletin 2026-13 (April 2026)

- **Source:** https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-13.html **[VERIFIED]**
- **Also:** https://www.federalreserve.gov/supervisionreg/srletters/SR2602.pdf (SR 26-2 PDF)
- **What it did:** replaced OCC 2011-12, OCC 1997-24, OCC 2021-19 and the MRM Handbook booklet.
  Primarily applies to banks **over $30bn in assets**. **[VERIFIED]**
- **The GenAI carve-out:** *"Generative AI and agentic AI models are novel and rapidly evolving.
  As such, they are not within the scope of this guidance."* Agencies signalled a separate RFI on
  AI to come. **[VERIFIED]**
- **The durable principle that survives:** three lines of defence — developer, **independent**
  validation, internal audit. This did not go away.

**Forces you to build:**
- A **model inventory record** per deployed pipeline: model id, version, provider, prompt version,
  retriever config, index snapshot id, owner, date.
- **Independent validation must be possible without you.** That means the eval set, the runner and
  the config are artifacts in the repo, reproducible by a second team. Your `ablate` command is
  precisely this shape.
- **Change control on prompts.** A prompt is a model input that changes behaviour; it is versioned
  and diffable or you cannot answer "what changed between March and April?"

### 2.2 Sector control objectives — Treasury / CRI Financial Services AI RMF (19 Feb 2026)

- **Source:** https://cyberriskinstitute.org/artificial-intelligence-risk-management/ **[VERIFIED]**
- **Analysis:** https://www.lowenstein.com/news-insights/publications/client-alerts/financial-services-ai-risk-management-framework-operationalizing-the-230-control-objectives-before-the-market-wakes-up-data-privacy
- **What it is:** industry-led, built with 100+ financial institutions, structurally aligned to
  NIST AI RMF, expanded to **230 control objectives** across governance, data, model development,
  validation, monitoring, third-party risk and consumer protection. Adoption is **staged** — Stage
  4 ("Embedded") implements all 230. **[VERIFIED]**
- **TCS has published on it**, which is a strong signal it is live in their BFSI conversations:
  https://www.tcs.com/insights/blogs/us-treasury-financial-services-ai-risk-management-framework

**Forces you to build:** evidence artifacts. Not a memo — a queryable record that a control was
operating. In practice: structured logs, an eval report with a date and a commit hash, an access
review export, a lineage record for every document in the index.

### 2.3 The NIST spine — AI RMF 1.0 + Generative AI Profile (NIST AI 600-1)

- **Source:** https://www.nist.gov/itl/ai-risk-management-framework **[VERIFIED]**
- GenAI Profile released **26 Jul 2024**; organises suggested actions around Governance, Content
  Provenance, Pre-deployment Testing and Incident Disclosure, mapped to GOVERN / MAP / MEASURE /
  MANAGE. Names **confabulation** (hallucination) as a distinct GenAI risk. **[VERIFIED]**

**Forces you to build:** *Content provenance* is the one to name out loud — every generated answer
carries citations back to source chunks with ids. *Pre-deployment testing* is your eval set.
*MEASURE* is why "I measured it" beats "I designed it well."

### 2.4 Fair lending / explainability — ECOA, Reg B, CFPB Circulars 2022-03 and 2023-03

- **Source:** https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/ **[VERIFIED]**
- **Circular PDF:** https://files.consumerfinance.gov/f/documents/cfpb_2022-03_circular_2022-05.pdf
- **2023-03 in the Federal Register:** https://www.federalregister.gov/documents/2024/04/17/2024-08003/consumer-financial-protection-circular-2023-03-adverse-action-notification-requirements-and-proper
- **The holding:** noncompliance with ECOA/Reg B **cannot be excused** because the technology is
  too complex or opaque to understand. Creditors must still give the *specific, principal* reasons
  for an adverse action. 2023-03 adds that you may not fall back on the sample-form checklist if
  those reasons are not the actual principal reasons. **[VERIFIED]**

**Forces you to build:** if an LLM touches a credit decision path, the *reason* must be derivable
from a deterministic, inspectable artifact — a feature attribution, a rules trace, or retrieved
evidence with citations. **"The model said so" is a compliance failure by name.** This is the
single strongest argument for keeping the LLM in a *retrieval-and-drafting* role with a human
decision-maker, and for RAG-with-citations over free generation.

### 2.5 Supervision, recordkeeping — FINRA 2026 Annual Regulatory Oversight Report (Dec 2025)

- **Source:** https://www.finra.org/sites/default/files/2025-12/2026-annual-regulatory-oversight-report.pdf **[VERIFIED]**
- New dedicated GenAI section covering governance, recordkeeping and autonomous agents. FINRA's
  position: *"FINRA's rules… and the securities laws more generally, continue to apply when firms
  use GenAI or similar technologies… just as they apply when firms use any other technology."*
  Firms should **test for accuracy and bias, and log prompts and outputs.** Rule 3110 supervision
  applies. **[VERIFIED]**

**Forces you to build:** **log the prompt and the output.** Verbatim, immutable, retained, tied to
a user identity and a timestamp. This is a regulator saying, in plain words, "build an audit
trail." It is the most directly actionable sentence in this entire document.

### 2.6 Data protection — GLBA Safeguards Rule; PCI-DSS; SOX; state privacy

- **GLBA Safeguards:** a *service provider* is anyone who receives, maintains, processes or is
  permitted access to customer information; the institution must oversee them and **require
  safeguards by contract.** **[VERIFIED]**
  https://mitratech.com/resource-hub/blog/tprm-glba/
  **Forces you to build:** an LLM API vendor is a service provider. Hence: no-training/no-retention
  contractual terms, a named tenancy, and — the engineering consequence — **PII redaction before
  the boundary**, plus least-privilege access to the corpus (your ACL layer).
- **PCI-DSS:** **[INFERRED, well-established]** cardholder data must not enter a prompt or a log.
  Practically: a redaction stage on both ingress and on the log sink, and PAN patterns in the
  denylist. Logging the prompt verbatim (2.5) and PCI scope collide — resolve by redacting before
  persisting, not after.
- **SOX:** **[INFERRED]** if GenAI output feeds financial reporting, it is in ICFR scope: change
  control, segregation of duties, and evidence that the control operated. Same artifacts as 2.2.
- **State privacy (CCPA/CPRA):** **[INFERRED]** drives deletion and purpose-limitation
  requirements — which is why chunk-level lineage back to a source record matters: you cannot
  honour a deletion request against an index you cannot map back to a customer.
- **Data residency:** **[INFERRED]** US financial data commonly must remain in US regions under
  contract. The engineering consequence for you personally, offshore in Pune: you may build the
  pipeline but never see production data — you work against synthetic or masked fixtures. **Say
  this. It shows you understand the delivery model, not just the tech.**

---

## 3. WHY HALLUCINATION AND ACCESS CONTROL ARE EXISTENTIAL HERE

Three arguments, in ascending order of force.

**1. Liability for the output is the firm's, and this is settled.** In *Moffatt v. Air Canada*
(BC Civil Resolution Tribunal, Feb 2024) Air Canada argued its chatbot was a "separate legal
entity" and lost. Tribunal member Christopher Rivers: it makes no difference whether information
comes from a static page or a chatbot. **[VERIFIED]**
https://www.mccarthy.ca/en/insights/blogs/techlex/moffatt-v-air-canada-misrepresentation-ai-chatbot
Small award ($812.02), enormous principle: **a hallucinated answer is a representation by the
institution.** For a bank, the equivalent is a misstated rate, fee, or eligibility — which is not
a $812 problem, it is a UDAAP problem across every customer who got the same answer.

**2. NIST named it.** Confabulation is a first-class GenAI risk category in AI 600-1, which is the
spine of the Treasury framework. It is not a quality nit; it is an enumerated risk with expected
controls. **[VERIFIED]**

**3. Access control failure is worse than hallucination, and quieter.** A hallucination is wrong
and often visibly wrong. A leak returns *correct* content to the *wrong* person — nothing looks
broken, and it can run for months. In BFSI the specific forms are: information barriers between
research and trading, MNPI containment, client-confidentiality between relationship managers, and
GLBA customer-information access. **[INFERRED, but this is the standard framing.]**

**"Prove it's right before the client sees it" — what that actually means for a US bank:**
every generated answer must carry (a) citations to retrieved source chunks the user was entitled
to see, (b) a logged prompt and output, (c) a confidence or groundedness decision that is
recorded, including the decision *not* to answer, and (d) a named human who is accountable for the
output when the stakes are high. If you cannot reconstruct, six months later, why the system said
what it said to whom, you have not built a bank system. You have built a demo.

---

## 4. TCS BFSI SPECIFICALLY

- **BFSI is TCS's largest vertical.** **[INFERRED — well established, don't quote a number you
  haven't checked.]** "BFSI-America" = North American banking, financial services and insurance
  clients, delivered largely from India with an onshore front.
- **TCS AI WisdomNext™** — announced as an industry-first **GenAI aggregation platform**: compares
  GenAI models and tools across cloud services in one unified interface, with **ready-to-deploy
  business solution blueprints with built-in guardrails**, positioned to adopt at scale, lower cost
  and **within regulatory frameworks**. **[VERIFIED]**
  https://www.tcs.com/what-we-do/services/artificial-intelligence/solution/enterprise-generative-ai-adoption-wisdomnext
  https://www.tcs.com/who-we-are/newsroom/press-release/tcs-launches-wisdomnext-an-industry-first-genai-aggregation-platform
  **Read the design intent:** model-agnostic abstraction layer + guardrails + reusable blueprints.
  If asked "what would you want to work on", *"a reusable, model-agnostic retrieval blueprint with
  the guardrails already in it"* is WisdomNext's own thesis in your words.
- **TCS AI Spectrum for BFSI** — composite-AI positioning for the vertical. **[VERIFIED as
  published]** https://www.tcs.com/what-we-do/industries/banking/solution/tcs-ai-spectrum-for-bfsi
- **TCS GenAI for BFSI** landing page:
  https://www.tcs.com/what-we-do/industries/banking/genai-insurance-banking-financial-services
- **Analyst position:** Leader in NelsonHall's 2025 NEAT for GenAI and Process Automation in
  Banking, among 16 vendors assessed. **[VERIFIED as reported by TCS]**
  https://www.tcs.com/who-we-are/newsroom/analyst-reports/tcs-a-leader-gen-ai-process-automation-banking
- **TCS published its own read of the Treasury FS AI RMF**:
  https://www.tcs.com/insights/blogs/us-treasury-financial-services-ai-risk-management-framework
  **[VERIFIED]** — worth skimming Friday. Speaking their own framing back to them is free credibility.
- **Named clients:** do **not** name banks in the room. Public reporting describes pilots across
  customer servicing, lending, payments, trade finance and fraud management without attribution.
  Naming a client you cannot source is a self-inflicted wound. **[INFERRED — judgement call.]**

**What a BFSI-America delivery team does day to day [INFERRED, from delivery-model norms]:**
overlapping US hours (expect a late-shift question — answer yes without flinching); working inside
the client's cloud tenant and their approved model list, not your own; strict change control;
synthetic or masked data in lower environments; a lot of time on evaluation, guardrails and
integration rather than novel modelling; and a compliance/risk stakeholder who has veto power over
your design. **Expect the "can you work US shift" question and have an unhesitating yes.**

---

## 5. WHAT A BFSI GENAI INTERVIEWER PROBES THAT A GENERIC ONE DOES NOT

| Generic GenAI interviewer asks | BFSI interviewer asks instead |
|---|---|
| "How do you improve retrieval accuracy?" | "How do you prove retrieval accuracy to a validator who doesn't trust you?" |
| "How do you handle hallucination?" | "What does the system do when it doesn't know, and who is accountable when it's wrong?" |
| "Which vector DB?" | "Does it filter on metadata *inside* the ANN search? Because entitlements aren't optional." |
| "Would you fine-tune?" | "Whose data would you fine-tune on, and what did the contract say?" |
| "How do you evaluate?" | "Can a second team reproduce your eval without you in the room?" |
| "How fast is it?" | "What's in the log, how long is it retained, and is there PII in it?" |
| "Can it be autonomous?" | "Where is the human, and what is the reject rate?" |

**The pattern:** a generic interviewer tests capability. A BFSI interviewer tests **provability**.
Every answer should end in an artifact — a number, a log, a table, a test — not an adjective.

---

## SOURCES

- https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-13.html
- https://www.federalreserve.gov/supervisionreg/srletters/SR2602.pdf
- https://cyberriskinstitute.org/artificial-intelligence-risk-management/
- https://www.lowenstein.com/news-insights/publications/client-alerts/financial-services-ai-risk-management-framework-operationalizing-the-230-control-objectives-before-the-market-wakes-up-data-privacy
- https://www.nist.gov/itl/ai-risk-management-framework
- https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/
- https://files.consumerfinance.gov/f/documents/cfpb_2022-03_circular_2022-05.pdf
- https://www.federalregister.gov/documents/2024/04/17/2024-08003/consumer-financial-protection-circular-2023-03-adverse-action-notification-requirements-and-proper
- https://www.finra.org/sites/default/files/2025-12/2026-annual-regulatory-oversight-report.pdf
- https://www.mccarthy.ca/en/insights/blogs/techlex/moffatt-v-air-canada-misrepresentation-ai-chatbot
- https://mitratech.com/resource-hub/blog/tprm-glba/
- https://www.tcs.com/what-we-do/services/artificial-intelligence/solution/enterprise-generative-ai-adoption-wisdomnext
- https://www.tcs.com/who-we-are/newsroom/press-release/tcs-launches-wisdomnext-an-industry-first-genai-aggregation-platform
- https://www.tcs.com/what-we-do/industries/banking/solution/tcs-ai-spectrum-for-bfsi
- https://www.tcs.com/insights/blogs/us-treasury-financial-services-ai-risk-management-framework
- https://www.tcs.com/who-we-are/newsroom/analyst-reports/tcs-a-leader-gen-ai-process-automation-banking
- https://www.fluid.ai/blog/generative-ai-in-banking
- https://regtechanalyst.com/ai-set-to-transform-aml-and-kyc-in-2026/
