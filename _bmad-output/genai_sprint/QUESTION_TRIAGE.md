# ✂️ QUESTION TRIAGE — what will actually be asked

**The correction:** several prepared questions assume a compliance officer or a model-risk validator in the room. **They won't be.** A TCS lateral GenAI technical round is run by a **delivery engineer or team lead** — someone who builds, and who is deciding whether you can be put on their project.

They ask what they know and what they'd need from you on day one. They do not quiz candidates on CFPB circulars.

---

## 🔑 THE REFRAME THAT MATTERS MOST

**The BFSI material is COLOUR, not a question bank.**

You will almost certainly not be *asked* about GLBA or FINRA logging. What earns the domain credit is **mentioning one constraint naturally while describing your own work** — *"in a bank you'd have to redact before that leaves your boundary, because the model vendor is a service provider"* — dropped into an answer about something else.

**One regulatory reference, used precisely, in a technical answer.** That reads like someone who has worked near this. Three reads like someone who skimmed a blog on Thursday.

---

## ✅ TIER 1 — PREPARE PROPERLY (likely asked)

| Q | Why it's real |
|---|---|
| **Q14 — "Your project is 16 documents. Why should I care?"** | **Most likely of all.** Any small project invites it. It's a composure test, not a technical one. |
| **Q5 — "Why not just fine-tune on the bank's customer data?"** | Classic, asked everywhere, and your entitlements answer is genuinely strong |
| **Q7 — "Two users ask the same question — same answer?"** | **This IS your project.** They'll lead you here; be ready to walk straight in. |
| **Q1 — "How would you handle PII in a RAG pipeline?"** | An engineer plausibly asks this — it's an implementation question, not a legal one |

**Four questions. Drill these.**

---

## 🟡 TIER 2 — KNOW IT, DON'T DRILL IT

| Q | Note |
|---|---|
| **Q8 — semantic cache risk** | ⭐ **You should VOLUNTEER this, not wait for it.** Drop it into the scaling answer — a cache that ignores the principal is an ACL bypass. Best unprompted line you have. |
| **Q2 — audit trail for LLM decisions** | Plausible from an engineer. Your *"log what you excluded, not what you returned"* line lands here. |
| **Q13 — prompt injection** | Occasionally asked. One clear answer is enough. |

---

## ⛔ TIER 3 — CUT. Do not prepare these as questions.

| Q | Why it's unlikely |
|---|---|
| **Q3 — FINRA verbatim logs vs PCI redaction** | Too specific. A dev lead won't construct a regulatory conflict to test you. *(Keep the insight — it's a great 20 seconds **if you raise it yourself** while discussing logging.)* |
| **Q4 — explaining a decision to a regulator** | Compliance domain, not engineering |
| **Q6 — model governance / SR 26-2** | A model-risk validator's question. **But keep the SR 11-7-is-rescinded fact** — if governance comes up at all, one sentence there is worth more than a prepared essay. |
| **Q10 — evaluation a validator would trust** | Same audience problem. Your normal evals answer covers it. |
| **Q11 — data residency** | More likely from HR or the manager, and it's a yes/no: *"Yes, I'd work against synthetic fixtures offshore, and I'd expect that."* |
| **Q12 — which use case would you pick** | Managerial round at most |
| **Q9 — human-in-the-loop placement** | Possible in MR, unlikely in TR |

---

## 📉 THE SAME LENS, APPLIED ELSEWHERE

| Material | Reality |
|---|---|
| **`RAPID_FIRE_LANGCHAIN_LANGGRAPH.md`** — 399 lines | **LangGraph is 0/3 in candidate reports.** Read the LangChain half properly; **skim the LangGraph half once.** Know state, nodes, edges, and why you'd choose it. Reducers and time-travel debugging are over-preparation. |
| **System design — 10M documents** | Likely lighter than prepared: *"how would this scale?"* rather than a full design exercise. Have the four-point answer; don't rehearse a whiteboard session. |
| **Advanced RAG variants** (Self-RAG, GraphRAG, HyDE) | Know the *names* and one line each. Nobody at this level gets quizzed on them. |
| **`MOCK_INTERVIEW_QUESTIONS.md`** — 26 questions | Fine as a mock. Not all 26 will appear — it's a superset by design. |

---

## 🎯 WHAT THE 45 MINUTES PROBABLY LOOKS LIKE

1. Tell me about yourself *(certain)*
2. **Walk me through your project** *(certain — and it eats 10-15 minutes if you let it)*
3. How does RAG work end to end *(certain — be ready to draw)*
4. Chunking / embeddings / vector DB choices *(likely)*
5. Fine-tune vs RAG vs prompting *(likely)*
6. LangChain — what have you used, how does it fit *(likely)*
7. A Python question, possibly on paper *(likely)*
8. How do you know it works / hallucination handling *(likely)*
9. One BFSI-flavoured follow-up *(moderate)*
10. Any questions for us *(certain)*

**Your project is the centre of gravity.** Most of the round routes through it — which is why the talk track is the highest-value thing you own.
