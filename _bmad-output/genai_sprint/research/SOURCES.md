# SOURCES — Every URL, Status, Date

**Research conducted:** 27 Jul 2026
**Verification method:** every URL below was submitted to WebFetch. Status reflects the
actual result of that fetch, not an assumption.

**Status legend**
- **VERIFIED** — fetched successfully; I read the content; claims in the other files trace here
- **VERIFIED (redirect)** — original URL 301/307s; the *final* URL fetched successfully. Use the final URL
- **BOT-BLOCKED** — resource exists but returned 403 / an auth wall / a redirect loop. Content
  recovered from the search index only. Treat derived claims as lower-confidence
- **DEAD** — does not resolve
- **NOT FETCHED** — listed for completeness; deliberately not spent budget on

---

## A. TCS-SPECIFIC — PRIMARY CANDIDATE REPORTS

These three carry the entire Tier-1 frequency analysis.

| # | URL | Status | What it gave us |
|---|-----|--------|-----------------|
| A1 | https://www.linkedin.com/posts/shanmuknunna_genai-tcs-interviewexperience-activity-7336343348636545025-1tG7 | **VERIFIED** | **S1.** TCS GenAI Developer/Consultant. Full round structure: phone screen → technical (senior engineer) → managerial (senior manager). Questions: vector DB concepts, RAG architecture + flow, cosine/dot-product/Euclidean, FAISS/Chroma/Weaviate/Pinecone selection, QA chatbot improvement, Python decorators, list comprehension, parallel vs multiprocessing, inheritance/polymorphism, classmethod vs staticmethod, LangChain agents/tools/chains/memory, BLEU/ROUGE/perplexity/F1, fine-tuning vs RAG, hallucination + grounding, leadership/ownership. Outcome not stated |
| A2 | https://www.linkedin.com/posts/galgalepallavi_tcs-interviewexperience-genai-activity-7419624110521090048-Q3sC | **VERIFIED** | **S2.** TCS GenAI/ML, 2-3 YOE — **closest match to Devang's band.** Questions: explain your project, how many projects, temperature in LLMs, top-K vs top-P + use cases, design a RAG system for an employee question, restricted vs unrestricted questions pre-retrieval, handling large chunks, fixed-format output (JSON/CSV), function calling mechanics, how the LLM decides which function to call, validating incorrect/partial responses, evaluating retrieved chunks before generation, Recall@K / Precision@K. Outcome not stated |
| A3 | https://www.glassdoor.com.hk/Interview/Tata-Consultancy-Services-Gen-AI-Engineer-Interview-Questions-EI_IE13461.0,25_KO26,41.htm | **BOT-BLOCKED (403)** | **S3.** Content recovered via search index only. Questions: years of experience in Python and Gen AI, what is LangChain, hands-on project experience, which LangChain community libraries used, which LLM models used, Python project experience, "write code to find the second largest number in a list without built-in functions + provide test cases", tuples and how they differ. Topics listed: RAG, Transformer, Agentic architectures, Python, LLM, Pandas, NumPy |

---

## B. TCS PROCESS / ROUND STRUCTURE

| # | URL | Status | Notes |
|---|-----|--------|-------|
| B1 | https://www.foundit.in/career-advice/here-is-what-you-need-to-know-about-the-tcs-recruitment-process/ | **BOT-BLOCKED (403)** | Content via search index. "TCS usually conducts two to three rounds." TR = core technical skills, may write code, explain algorithms, walk through project work. HR = compensation, notice period, relocation. Experienced process "may include aptitude tests, technical interviews, HR interviews, and document verification" |
| B2 | https://www.glassdoor.com/Community/tata-consultancy-services/i-went-for-an-walk-in-interview-for-tcs-all-rounds-i-have-cleared-including-tr-mr-and-hr-hr-mentioned-ill-get-the-offer-letter-within | **NOT FETCHED** (Glassdoor 403s consistently) | Via search index: walk-in candidate cleared **TR, MR and HR** at the drive; document verification done; offer letter promised within a week; followed by a ~15-min call with 6-7 panelists incl. TR + MR + HR. **Key corroboration that all 3 rounds happen at the walk-in** |
| B3 | https://www.quora.com/What-is-the-next-round-after-document-verification-in-TCS | **NOT FETCHED** | Via search index: HR collects ID proof + photos on site; documents verified in the **iBegin portal ~1 week after** the drive |
| B4 | https://www.naukri.com/campus/career-guidance/tcs-interview-questions-for-freshers | **NOT FETCHED** | Via search index: the 4-round structure (Online Test → TR → MR → HR) is **TCS NQT / fresher**, not lateral. Used to rule out an aptitude test for laterals |
| B5 | https://www.geeksforgeeks.org/blogs/tcs-interview-questions-2/ | **NOT FETCHED** | Via search index: confirms NQT = 4 rounds incl. online test. Same purpose as B4 |
| B6 | https://www.tcs.com/careers/india/tcs-ai-careers | **BOT-BLOCKED (403)** | Official TCS AI careers page. Could not verify. Devang should open this in a browser directly |
| B7 | https://www.linkedin.com/pulse/my-tcs-walk-in-interview-experience-lifedb-share-knowledge-dqd4f | **NOT FETCHED** | Via search index: walk-in requires valid ID proof, copies of educational certificates, updated CV; registration windows e.g. 9:30 AM-12:30 PM |
| B8 | https://www.enggwave.com/tcs-ai-hiring-2026/106826 | **NOT FETCHED** | Via search index: TCS AI hiring drive, skill-based, AI/Data/Cloud/Cybersecurity. AI & ML Engineer salary band ₹8-20 LPA. Context only |
| B9 | https://web.talenttitan.com/candidates/interview-preparation/tcs/gen-ai-specialist | **DEAD (content-empty)** | Page returns only a site header; no substantive content. Do not use |
| B10 | https://www.ambitionbox.com/interviews/tcs-interview-questions/ai-engineer | **DEAD (timeout, 60s)** | Fetch timed out. Could not verify. Devang may open manually |

---

## C. GENAI INTERVIEW CANON — HIRE/NO-HIRE AND FREQUENCY

| # | URL | Status | Notes |
|---|-----|--------|-------|
| C1 | https://www.techinterview.org/post/3233476396/what-genai-engineer-interviews-test/ | **VERIFIED** | **The key hire/no-hire source.** 5-round loop; the evaluation round as the differentiator; the RAG Triad; hire signals (rate limits/cost as first-class, pgvector over Pinecone, golden sets before demos, arguing against agents); no-hire signals (silence on evaluation, leading with framework names, over-building) |
| C2 | https://towardsai.com/p/machine-learning/40-generative-ai-interview-questions-that-actually-get-asked-in-2026-with-answers | **VERIFIED (redirect from towardsai.net)** | Full 40-question bank in 10 sections. Explicitly states it does **not** rank by frequency |
| C3 | https://www.datacamp.com/blog/rag-interview-questions | **VERIFIED** | 27 RAG questions tiered basic (10) / intermediate (7) / advanced (10). Explicitly does not identify most-common |
| C4 | https://www.datacamp.com/blog/genai-interview-questions | **VERIFIED** | GenAI questions by tier. Claims discriminative-vs-generative and tokens/embeddings appear most frequently at foundation level |
| C5 | https://myengineeringpath.dev/genai-engineer/interview-questions/ | **VERIFIED** | 8 free questions with answers, tiered beginner→expert. Temperature, sub-2s RAG, ReAct loop, 10M-doc RAG, guardrails, hallucination prevention (5-stage pipeline), agent memory, LLMOps vs MLOps |
| C6 | https://myengineeringpath.dev/genai-engineer/system-design-interview/ | **VERIFIED** | 6-step 40-min system design framework + 3 worked examples (RAG support bot, content moderation at 50M posts/day, code review agent) |
| C7 | https://www.hackerrank.com/writing/demystifying-generative-ai-hiring-evaluating-rag-llm-skills-hackerrank-april-2025-assessments | **VERIFIED** | GenAI assessment skill taxonomy + scoring weights: technical implementation 30%, system design 25%, AI collaboration 20%, domain understanding 15%, problem-solving 10%. **No frequency data** |
| C8 | https://github.com/amitshekhariitbhu/ai-engineering-interview-questions | **VERIFIED** | Free, Apache-2.0, 15 categories. Answers mostly linked out rather than inline |
| C9 | https://ai.plainenglish.io/tcs-gen-ai-interview-questions-2026-real-questions-asked-by-candidates-36ced33dd72d | **BOT-BLOCKED (Medium member wall + redirect loop)** | Attempted 4 URL variants; all redirect-looped or hit the member wall. Partial content via search index: context windows, few-shot + CoT, KV cache, designing for traffic spikes, quantization + distillation, small-OSS vs GPT-4-class cost/quality, trimming prompts + caching embeddings. Its claim that "nearly every TCS lateral interview includes at least one Gen AI round" is repeated across the search index but I could **not** verify it at source — treat as INFERRED |
| C10 | https://adilshamim8.medium.com/every-ai-engineer-interview-question-you-need-to-know-in-2026-from-100-real-interviews-b5b7ae4b961a | **NOT FETCHED** (Medium; C9 established the pattern) | Title claims 100+ real interviews. Potentially valuable; blocked by the same wall |
| C11 | https://www.interviewquery.com/interview-guides/tata-consultancy-services-machine-learning-engineer | **NOT FETCHED** | Via search index: TCS ML role emphasizes NLP + GenAI, MLOps, Docker/Kubernetes deployment |
| C12 | https://levelup.gitconnected.com/chunking-strategies-in-rag-systems-insights-from-80-genai-interviews-8ceb4a17701a | **BOT-BLOCKED (Medium redirect loop)** | Via search index: chunking fails candidates because they treat it as theory not a systems problem; "thoughtful, measurable, iterative" is the signal. **Superseded by C13/S6, which has actual data** |
| C13 | https://www.recruitingfromscratch.com/blog/how-to-hire-a-generative-ai-engineer-at-a-startup-2026 | **NOT FETCHED** | Via search index: hiring-side view — cost at scale, failure modes, hallucination rates, prompt injection, real production failure stories |

---

## D. TIER-S RESOURCES

| # | URL | Status | Verified content |
|---|-----|--------|------------------|
| D1 | https://www.anthropic.com/engineering/building-effective-agents | **VERIFIED** | 5 workflow patterns + agent loop. 8-10 min read |
| D2 | https://hamel.dev/blog/posts/evals/ | **VERIFIED** | 3-level eval hierarchy + the flywheel. 12-15 min read |
| D3 | https://docs.langchain.com/oss/python/langgraph/graph-api | **VERIFIED** | StateGraph, nodes, normal/conditional edges, reducers (default replace, `operator.add`, `add_messages`), Command, START/END, node caching, checkpointing |
| D4 | https://docs.langchain.com/oss/python/langgraph/quickstart | **VERIFIED** | Builds a calculator agent, Graph API + Functional API. No stated duration |
| D5 | https://github.com/langchain-ai/rag-from-scratch | **VERIFIED** | 9k stars, 2.1k forks, 5 notebooks (1-4, 5-9, 10-11, 12-14, 15-18), YouTube playlist companion. **No Colab links** — must run locally or upload to Colab manually |
| D6 | https://www.anthropic.com/news/contextual-retrieval | **VERIFIED** | 35% / 49% (+BM25) / 67% (+reranking) retrieval-failure reduction. Cookbook linked |
| D7 | https://www.trychroma.com/research/evaluating-chunking | **VERIFIED (redirect from research.trychroma.com)** | Up to 9% recall spread; LLMSemanticChunker best recall (91.9 ± 26.5); ClusterSemanticChunker@200 best IoU (8.0 ± 6.0); OpenAI 800/400 default among the worst; RecursiveCharacterTextSplitter@200 no-overlap = solid default |
| D8 | https://github.com/brandonstarxel/chunking_evaluation | **NOT FETCHED** (confirmed via D7) | Full released codebase for D7 |
| D9 | https://lilianweng.github.io/posts/2023-06-23-agent/ | **VERIFIED** | Planning / Memory / Tool Use. **31 min** stated read. Names LSH, ANNOY, HNSW, FAISS, ScaNN |
| D10 | https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf | **VERIFIED** (7MB PDF; opened pages 1-6 directly) | 34 pages. What is an agent p4 · When to build p5 · Design foundations p7 · **Guardrails p24** · Conclusion p32 |
| D11 | https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/ | **VERIFIED** | Faithfulness, Context Precision, Context Recall, Response Relevancy. LLM-judged |

---

## E. TIER-A / TIER-B RESOURCES

| # | URL | Status | Verified content |
|---|-----|--------|------------------|
| E1 | https://huyenchip.com/2025/01/07/agents.html | **VERIFIED** | 3 tool categories, 4 control flows, explicit agent failure-mode list. 15-20 min |
| E2 | https://docs.pinecone.io/guides/search/hybrid-search | **VERIFIED** | `combined = alpha*dense + (1-alpha)*sparse`; alpha 1.0/0.5/0.25 semantics; 0.75 dense-leaning default |
| E3 | https://github.com/anthropics/anthropic-cookbook | **VERIFIED** | 50.4k stars. RAG, tool use, sub-agents, automated evals, JSON mode, prompt caching, agent patterns |
| E4 | https://eugeneyan.com/writing/llm-patterns/ | **VERIFIED** | 7 patterns. **66 min stated** — skim only |
| E5 | https://www.promptingguide.ai/ | **VERIFIED, free** | Zero-shot, few-shot, CoT, agents, prompt injection, prompt hub. Paid academy exists but the guide is free |
| E6 | https://github.com/anthropics/prompt-eng-interactive-tutorial | **VERIFIED** | 9 chapters + appendix. Interactive playground, not notebooks. Google Sheets version available. Uses Claude 3 Haiku |
| E7 | https://jalammar.github.io/illustrated-transformer/ | **VERIFIED** | Self-attention, multi-head, positional encoding. ~20-30 min full, 10-15 min skim |
| E8 | https://www.youtube.com/watch?v=7xTGNNLPyMI | **VERIFIED via** https://x.com/karpathy/status/1887211193099825254 | Karpathy, "Deep Dive into LLMs like ChatGPT", **3h31m**, Feb 2025. Excluded from the sprint on time grounds |
| E9 | https://www.deeplearning.ai/courses/langchain | **NOT FETCHED** | Via search index: ~1 hour, free, Harrison Chase + Andrew Ng. Models, prompts, parsers, memory, chains, QA, agents. Fallback only |
| E10 | https://www.deeplearning.ai/courses/ai-agents-in-langgraph | **NOT FETCHED** | Via search index: build an agent from scratch then rebuild in LangGraph. Harrison Chase + Rotem Weiss. Fallback only |
| E11 | https://learn.deeplearning.ai/ | **NOT FETCHED** | Platform root for E9/E10 |

---

## F. EXCLUDED — LOGGED SO THEY ARE NOT RE-RESEARCHED

| URL | Reason |
|-----|--------|
| https://www.udemy.com/course/langchain-interview-questions-with-explanations/ | Paid; unverifiable; not completable in 4 days |
| https://rpabotsworld.com/langgraph-interview-questions/ | "250 LangGraph Interview Questions" — volume-farmed SEO |
| https://www.interviewbit.com/generative-ai-interview-questions-and-answers/ | SEO listicle |
| https://www.credosystemz.com/top-50-generative-ai-interview-questions-and-answers-2026/ | SEO listicle |
| https://www.novelvista.com/blogs/ai-and-ml/generative-ai-interview-questions | SEO listicle |
| https://amquesteducation.com/blog/top-generative-ai-interview-questions-and-answers/ | SEO listicle |
| https://generativeaimasters.in/generative-ai-interview-questions/ | SEO listicle |
| https://www.stackoverflowtips.com/posts/top-50-genai-llm-interview-questions-answers-2025 | Low-signal aggregator |
| https://www.lockedinai.com/blog/ai-engineer-interview-questions | Product-marketing content |
| https://careery.pro/blog/ai-careers/ai-engineer-interview-questions | SEO listicle |
| https://www.mockexperts.com/blog/2026-ai-engineer-interview-roadmap-rag-llms | SEO listicle |
| https://kodekloud.com/blog/ai-interview-questions/ | SEO listicle |
| Coursera / Packt LangChain-LangGraph specializations | Multi-week format |
| Scribd mirrors of the OpenAI agents PDF | Use the official CDN URL (D10) |
| Medium reposts of LangChain docs (Ketan Patel, Souvik Majumder, Adil Shamim RAG-20) | Reposts of primary docs; go to the docs |
| https://www.slideshare.net/tag/vector-database | Low signal |
| https://www.scribd.com/document/37942084/tcs | Low signal, undated |

---

## G. VERIFICATION SUMMARY

| Status | Count |
|--------|-------|
| VERIFIED (incl. redirects) | **26** |
| BOT-BLOCKED (content via search index only) | **6** |
| DEAD / unusable | **2** (B9 content-empty, B10 timeout) |
| NOT FETCHED (logged, deliberately unspent) | **13** |
| EXCLUDED (SEO/paid/wrong-format) | **17** |

**Every URL in `RESOURCES_TIER_S.md` Tier S and Tier A is VERIFIED.** No Tier-S resource
depends on a blocked or dead link.

---

## H. CONFIDENCE CAVEATS — READ BEFORE ACTING

1. **The Tier-1 frequency ranking rests on n=3 TCS sources**, two of which (A1, A2) are
   single-candidate LinkedIn posts. The *overlap* between them is what makes the ranking
   credible — three independent sources converging on RAG + LangChain + vector DBs +
   project-walkthrough is real signal. But n=3 is n=3. Treat Tier 1 as "near-certain,"
   not "certain."

2. **A1 and A2 were virtual/scheduled interviews, not the Pune walk-in.** The *content*
   should transfer; the *logistics* may not. The round structure (TR/MR/HR) is corroborated
   separately by B1 and B2.

3. **No source confirms whether this specific Pune drive includes a written/online screen.**
   `TCS_ROUND_STRUCTURE.md` §2 advises preparing for one regardless. Devang's own invite
   email is the authoritative source and supersedes everything in these files.

4. **LangGraph depth is the largest unknown.** The JD names it; none of the three candidate
   reports covers it. This is why `RESOURCES_TIER_S.md` allocates 90 minutes of hands-on to
   S3 despite thin frequency evidence — it is a hedge against the biggest gap, not a
   response to observed frequency.

5. **Anything marked [I] in the other files is my synthesis, not a sourced claim** — this
   includes the entire 2-3 → 4-10 YOE bridging analysis in `GENAI_INTERVIEW_REALITY.md` §5.
   It is reasoned from how Indian service-firm lateral hiring works, not from a document
   stating TCS policy. It is advice, not evidence.
