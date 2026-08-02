# Innovation Strategy: Devang Manjramkar — Career Positioning as a Product

**Date:** 2026-08-02
**Strategist:** Devang
**Strategic Focus:** Route into Forward-Deployed / AI-native ("spec-driven") engineering roles at 2 YOE — Pune or fully remote — while structurally avoiding DSA-grind and aptitude-gate hiring funnels.

---

## 🎯 Strategic Context

### Current Situation

**The asset position (be honest about what is actually real):**

| Asset | Evidence | Strength |
|---|---|---|
| Spec-driven development | BMad system, `system-genesis-kit` (13M, 1097 files), PermRAG spec + eval harness | **Genuine differentiator.** Very few 2-YOE engineers can produce a machine-readable spec that another agent executes. |
| Applied GenAI depth | 31-hr TCS BFSI-America GenAI sprint completed and interviewed 01 Aug 2026 — RAG, chunking, vector DB selection, cosine vs dot, LangChain/LangGraph, temperature, hallucination control, production failure modes | **Fresh, spoken-rehearsed, interview-loaded.** This is a perishable asset — it decays in ~6 weeks unless spent. |
| Permission-aware RAG (PermRAG) | Corpus, chunking, embeddings, ACL pre-filter index — committed, working | **The single best artifact you own.** It is enterprise-shaped: ACLs are exactly the problem FDE work at B2B AI companies is about. |
| Production shipping | ElasticRun, full-year internship → Associate Engineer, shipped to prod | Credible but junior-band. |
| Tenure | Just under 3 years total; **2 years full-time post-graduation** | **The binding constraint.** Never round up. |

**The liability position:**

- **DSA / competitive-programming rounds** — weak, and by your own assessment (readiness gauge 18/100 as of 2026-07-24) not closable in the timeframe that matters.
- **Aptitude / online-assessment gates** — weak and low-ROI to train.
- **Experience-band mismatch** — most roles wearing the titles you want ("Forward Deployed Engineer", "Applied AI Engineer") are advertised at 4–10 YOE.
- **Employment status** — resigned voluntarily from ElasticRun, 30-day notice, HR aligned. No gap if you land inside the notice window; a gap opens after.

**The market observation from yesterday's scrape (2026-08-02):** across ~250 postings, exactly **three** carried a true "Forward Deployed Engineer" title in India — Echos (Gurugram), Kyndryl (Mumbai), and one FDE-shaped role remote (Simbian AI, Technical Implementation Engineer). **The title you want barely exists in the Indian market yet.** That is either a fatal problem or the entire opportunity, and Step 4 will decide which.

---

### Strategic Challenge

> **You are optimising for a job title that India has not finished importing, using a search substrate that does not work the way you assumed, against a hiring funnel designed to filter on the exact two axes where you are weakest.**

Three sub-problems, in dependency order:

1. **Retrieval problem** — you cannot find the roles, because the tool you're using is not searching what you think it's searching (see the spec below).
2. **Positioning problem** — at 2 YOE, "Forward Deployed Engineer" reads as over-reach; you need a title-adjacent entry point that hires on the same skills without the same band.
3. **Funnel problem** — DSA and aptitude gates are not obstacles to overcome, they are a **segment to deselect**. The strategy must make them irrelevant rather than survivable.

---

## 🔬 RADICAL SPEC — How Wellfound Search Actually Works (and why yesterday failed)

**Status: empirically derived 2026-08-02. Three findings, two of them load-bearing.**

### Finding 1 — The "Wellfound scraper" is not scraping Wellfound. It is scraping Google Jobs.

Evidence, from the 252 rows returned yesterday:

- **Every single URL** carries `?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic` — the canonical Google Jobs referral tag.
- **A majority of results are not Wellfound at all.** Returned hosts included `shine.com`, `hirist.tech`, `foundit.in`, `jooble.org`, `kitjob.in`, `instahyre.com`, `glassdoor.co.in`, `builtin.com`, `apna.co`, `careers.amd.com`, `search.jobs.barclays`, `globalfoundries.wd1.myworkdayjobs.com`, `mysmartpros.com`.
- Wellfound-native rows are a **minority slice** of the result set.

**Implication:** `orgupdate/wellfound-jobs-scraper` is a Google-Jobs aggregator with a Wellfound-flavoured name. This is why the three FDE titles it found were on `shine.com` and `softojobs.com` — not on Wellfound.

### Finding 2 — Wellfound itself is hard-walled against programmatic access.

Direct verification, today:

- `curl` to `wellfound.com/jobs`, `/remote`, `/role/l/software-engineer/pune`, `/role/r/software-engineer` → **403 on every path**, regardless of User-Agent.
- Headless browser load → redirected to a **"Access is temporarily restricted"** interstitial citing *"Automated (bot) activity on your network"* and *"Use of developer or inspection tools."*

**Implication:** there is no reliable automated path to Wellfound's own taxonomy from this machine. Wellfound's role/location facets must be driven **by hand, in your logged-in browser.**

### Finding 3 — The actor's parameters are not Wellfound facets, so they behave like a search box, not a filter.

Observed behaviour:

| Param | Documented as | Actually behaves as |
|---|---|---|
| `locationName` | "**REQUIRED** city or region" | **Soft hint, frequently ignored.** `locationName: "Pune"` returned Bengaluru, Mumbai, and "Anywhere". `"Pune, Maharashtra"` worked far better. |
| `countryName` | "**REQUIRED** country" | Weak geo-scope on the underlying Google query. |
| `includeKeyword` | "Comma-separated keywords" | **OR-expanded free text**, not an AND filter. `"forward deployed engineer, AI engineer, solutions engineer"` matched anything with *engineer*. |
| `description` field | Job description | **Empty on ~95% of rows.** You cannot filter on YOE, tech stack, or interview process from the returned data. |
| — | — | **No seniority/YOE facet exists at all.** |

**Why yesterday's Pune search returned Bengaluru:** three vague OR'd keywords + a soft location hint = a broad query. The narrower run (`"Pune, Maharashtra"` + `"software engineer, AI, python"`) returned 217 rows with genuine Pune density. **Specificity in `locationName` is the highest-leverage knob.**

### The corrected retrieval doctrine

**Rule 1 — Use full "City, State" in `locationName`.** `"Pune, Maharashtra"` ≫ `"Pune"`. For remote, `"Anywhere"` appears as the location value in results, so query `"Remote"` and post-filter on `location == "Anywhere"`.

**Rule 2 — Query one intent per run.** Because `includeKeyword` OR-expands, mixing "forward deployed engineer" with "AI engineer" destroys the former. Run FDE terms alone.

**Rule 3 — Search the *work*, not the *title*.** India has not adopted the FDE title. It has adopted its synonyms. The productive query vocabulary:
`solutions engineer` · `implementation engineer` · `applied AI engineer` · `technical customer architect` · `customer engineer` · `deployment engineer` · `solutions architect (AI)` · `founding engineer` · `technical implementation`

**Rule 4 — Post-filter locally with `jq`, never in the query.** Pull wide (`pagesToFetch: 3`, generic keyword), save the dataset, filter on `location`, `job_title`, and `company_name` offline. Costs one Apify run instead of six. **Relevant now: the Apify token has hit its monthly hard limit.**

**Rule 5 — Treat the scraper as a *lead generator*, not a *filter*.** It cannot tell you YOE, stack, or interview process. Those require opening the posting. Budget for that.

**Rule 6 — Wellfound-native search is a manual, logged-in activity.** Its actual value over Google Jobs is the facets the scraper cannot reach: company stage, funding, team size, "actively hiring", and direct-to-founder application. Those facets are precisely what selects *against* DSA-gate companies. **The bot wall means this is hand work — and it is the highest-quality hand work available to you.**

### The deselection filter (the funnel problem, made operational)

Interview process is not in any dataset. It is, however, **strongly predicted by company shape** — and company shape *is* observable:

| Signal | DSA / aptitude risk | Examples from yesterday's pull |
|---|---|---|
| Seed / Series A, <50 people, founder-led hiring | **Low** — hires on portfolio + work-sample | Simbian AI, Pulsora, Postbridgetech, Celeix, genieX |
| "Founding engineer" in title | **Very low** — conversation + build | Postbridgetech, Referralworldcareers |
| Global enterprise, campus-scale pipeline | **Very high** — aptitude + DSA near-certain | Barclays, Siemens, Autodesk, Teradata, GlobalFoundries, IQVIA, Wolters Kluwer, Addepar, LogicMonitor |
| Indian IT services / staffing-mediated | **High** — aptitude gates standard | TCS, Fulcrum, Talent Pro, AB INFOTECH, Spes Manning |
| US/EU startup hiring remote into India | **Low** — async take-home is the norm | Simbian AI, Pulsora |

**This is the strategy in one line: the companies that skip DSA are the same companies that hire on demonstrated artifacts — and demonstrated artifacts are the only thing you have an unfair advantage in.**

---

## ✅ CONSTRAINTS — ANSWERED 2026-08-02

| Question | Answer | Strategic consequence |
|---|---|---|
| TCS outcome | **DEAD — rejected on experience gap** | The band is now empirically confirmed as the binding constraint, not a theory. No floor offer exists. Every remaining play must *neutralise* the band rather than argue with it. |
| Notice | **30 days remaining** | Hard clock. Applications must go out in parallel batches, not sequentially. |
| Comp floor | **₹13 LPA and above** | Kills Techfnatic (₹7–9L), Celeix (₹12–14L is marginal), EveoAI, The Ninja Studio. Keeps Simbian (₹16–30L), EazyML (₹20–50L), SquareYards (₹15–20L), Postbridgetech (₹12–18L, negotiate up). |
| US-timezone remote | **Acceptable** | ⭐ **This is the unlock.** It roughly triples the FDE-shaped set, and US/EU startups hiring remote into India almost never run DSA or aptitude gates — they run async take-homes, which is your strongest surface. |

**The TCS rejection is the most useful datapoint you have.** It proves the failure mode: enterprise funnels reject you on a field they can read off a form (years) before they ever see the field you'd win on (artifacts). Every company that hires by reading a form is now formally out of scope. That's not a consolation — it's a targeting spec.

---

## 🎯 CORRECTED SEARCH — Actual Wellfound FDE Roles (via DuckDuckGo, 2026-08-02)

**Method that worked:** DuckDuckGo `site:wellfound.com` queries. This bypasses both the Wellfound bot wall (DDG has the pages indexed) and the Apify quota. It surfaced **more true FDE roles in two queries than the Apify scraper found in 250 rows.**

**Spec Finding 4 (new) — the Wellfound URL taxonomy is confirmed real.** DDG returned live facet pages:
- `wellfound.com/role/l/<role-slug>/<location-slug>` → e.g. `/role/l/ai-engineer/india`, `/role/l/artificial-intelligence-engineer/india`
- `wellfound.com/role/r/<role-slug>` → remote variant, e.g. `/role/r/ai-engineer`
- `wellfound.com/jobs/<id>-<title-slug>` → individual postings

These are the canonical browse URLs. **Open them by hand in a logged-in browser** — that is the only reliable path to Wellfound's stage/funding/team-size facets.

### True Forward Deployed Engineer roles — Wellfound-native

| Role | Company | Location | Read |
|---|---|---|---|
| [Forward Deployed Engineer](https://wellfound.com/jobs/4484493-forward-deployed-engineer) | **opexlabs.ai** | Delhi • **Remote** | ⭐ **Top pick.** "Founding Opex Labs team" — FDE at the intersection of software engineering, AI, enterprise integration, customer success. Founding + remote + AI integration = your exact shape, and founding teams hire on build evidence. |
| [Forward Deployed Engineer (AI)](https://wellfound.com/jobs/4287199-forward-deployed-engineer-ai) | **Memorang** | Chennai • **Remote** | ⭐ "Whiteboard sketches to production systems" with frontier AI in education. This is spec-driven development described in their own words. |
| [Forward Deployed Engineer](https://wellfound.com/jobs/4361915-forward-deployed-engineer) | **TechUp Labs** | Surat • **Remote** | "Hands-on and execution-driven… quickly understand business workflows and deploy scalable solutions." No stated seniority wall. |
| [Forward Deployed Engineer](https://wellfound.com/jobs/4520994-forward-deployed-engineer) | **Uservox** | Delhi • Mumbai | Voice AI → enterprise integrations (telephony, CRM, internal APIs). Not Pune/remote, but small enough to ask. |
| [Forward Deployed Engineer](https://wellfound.com/jobs/3681053-forward-deployed-engineer) | **HackerRank** | **Remote** | Customer-facing pilots and demos. ⚠️ Irony noted — it is HackerRank; assume a coding round. Lower priority given your constraint. |
| Forward Deployed Engineer APAC | **Runpod** | Remote/APAC | Python (Django/Flask/PyTorch) + JS. GPU-cloud infra company. Via Wellfound; find the live posting. |
| [Forward Deployed Engineer — Agents](https://in.linkedin.com/jobs/view/forward-deployed-engineer-agents-remote-at-level-ai-4447410207) | **Level AI** | Remote India | Exactly your work — AI virtual agents, CX automation, business requirements → production agent deployments. ⛔ **5–7 YOE stated.** Out of band. Listed so you know the ceiling shape. |
| [Forward Deployed Engineer](https://builtin.com/job/forward-deployed-engineer/7497493) | **Mem0** | Remote India | Memory layer for AI agents. Adjacent to PermRAG almost line for line. |

### Applied-AI roles that are FDE work under another name

| Role | Company | Location | Read |
|---|---|---|---|
| [Applied AI Engineer](https://wellfound.com/jobs/4265928-applied-ai-engineer) | **HackerRank** | **Remote** | ⭐⭐ Read this JD closely: *"structured evaluation pipelines for AI systems with metrics and regression detection… You diagnose before you build."* **That is PermRAG's eval harness, described by someone else.** Strongest artifact-to-JD match in the entire search. |
| [Applied AI Engineer](https://wellfound.com/jobs/3026401-applied-ai-engineer) | **Lamatic.ai** | India • Miami • US | GenAI platform startup, US-remote-friendly. |
| [Applied AI Engineer — India](https://wellfound.com/jobs/4121677-applied-ai-engineer-india) | **Pulsora** | Hyderabad • **Remote** | Confirmed remote-India-specific. |
| [Technical Implementation Engineer — SOC](https://wellfound.com/jobs/4062057-technical-implementation-engineer) | **Simbian AI** | **Remote** | ₹16–30L — clears your floor. FDE work for AI security agents. |
| [AI Engineer](https://wellfound.com/jobs/3828017-ai-engineer) | **timepay.ai** | Mumbai • **Remote** | Enterprise collections/engagement AI. |

**Volume context for Step 2:** LinkedIn shows 835 FDE listings in India, Naukri 454, Glassdoor 305. The role is not rare in India — **it was rare in the Apify/Google-Jobs slice.** That was a retrieval artifact, not a market fact. This materially changes the TAM and is the first thing Step 2 must re-size.

---

## 🔄 STRATEGIC PIVOT — Stop Hunting the Title, Hunt the Skill

**Trigger:** the FDE list above is real but *contested*. Founding-team FDE at a funded AI startup is one of the most desirable titles in the market. Applicant pools are deep, and many applicants have 4–8 YOE. At 2 YOE with a hard 30-day clock, that is a low-probability queue.

### The competition insight

> **Competition tracks brand desirability, not job difficulty.** The work at opexlabs and the work at a Pune mid-tier product company are similar. The applicant counts differ by an order of magnitude.

Search evidence, 2026-08-02:

- **1,283 GenAI job vacancies in Pune** (Naukri) · **11,000+ GenAI/LangChain/RAG listings** India-wide
- Multiple Pune postings explicitly banded at **2 YOE** and **2–5 YOE** — not 4–10
- The candidate pool at that band is **thin**: engineers with genuine production RAG, chunking-strategy, vector-DB-selection, and eval-harness knowledge are mostly at 4+ YOE and are chasing brand-name AI startups, *not* Pune delivery roles

**You are unusually strong in exactly the segment nobody desirable is competing in.** Your 31-hour TCS BFSI GenAI sprint is a 1:1 content match for these JDs — RAG, chunking, vector DB choice, cosine vs dot, LangChain/LangGraph, temperature, hallucination control, production failure modes. That material is already spoken-rehearsed. **Zero new study required.**

### The lowest-competition targets found

| Target | Why it is easier | Band |
|---|---|---|
| **[Dimakh Consultants, Pune](https://www.dimakhconsultants.com/careers/artificial-intelligence-jobs-in-pune-india/)** — AI Engineer (Generative AI & RAG) | ⭐⭐ **Best effort-to-fit ratio found.** JD reads: *"2 years of experience in Python and LLM integration… production-grade RAG systems, managing vector databases, optimizing AI performance."* That is your sprint syllabus, at your exact band, in your city. Small consultancy → direct application, no ATS years-filter. | **2 YOE — exact** |
| **[GenAI Engineer, Pune — 8+ open positions](https://www.linkedin.com/posts/saurabh-shahane_hiring-genaiengineer-generativeai-activity-7470014488235204608-QHFI)** | Eight seats at 2–5 YOE. Volume hiring at your band means the bar is throughput, not brilliance. | **2–5 YOE** |
| **[Senior Associate — GenAI Engineer, Pune](https://www.linkedin.com/posts/gauri-naik-453656213_hiring-senior-associate-genai-engineer-activity-7434925355334938624-HLHH)** | "2+ years", Python backend + GenAI. WFO Pune. | **2+ YOE** |
| **[Forward Deployed AI Engineer — India Remote (Lumnary)](https://www.linkedin.com/posts/lumnary-hire_hiring-aiengineer-agenticai-activity-7449679592937893888-0nVk)** | The title you want, posted as a **LinkedIn hiring post rather than a listing** — far fewer applicants than a Wellfound posting. | Unstated — ask |
| **[agentic-engineering-jobs.com/jobs/india](https://agentic-engineering-jobs.com/jobs/india)** | Niche board, 65+ agentic-AI roles. Niche boards have a fraction of the traffic of Wellfound/LinkedIn. | Mixed |

⛔ **Skip:** Apptware (4–6 YOE), Persistent GenAI Lead (5–8 YOE), HCLTech (enterprise funnel = the TCS failure mode again).

### The channel insight — this is the real edge

**LinkedIn hiring *posts* beat job *listings*.** A listing routes you into an ATS where a form field reads "2 years" and rejects you before a human sees the artifacts — **precisely how TCS killed you.** A hiring post routes you into a DM with the person doing the hiring, where the first thing they see is PermRAG.

For a candidate whose strength is artifacts and whose weakness is a number on a form, **every channel that bypasses the form is worth more than a better-matched listing.** Rank channels accordingly:

1. DM the poster on a LinkedIn hiring post
2. Small consultancy / agency careers page → direct email
3. Niche job board → usually a direct email application
4. Wellfound apply-to-founder
5. ⛔ Enterprise ATS — last resort, and expect the TCS outcome

### Honest caveat on money

Pune GenAI roles at the 2-YOE band typically land **₹8–16 LPA**. Your ₹13L floor sits in the **upper half** of that range. It is achievable but not automatic — expect to negotiate, and expect PermRAG plus the BFSI sprint to be the reason you clear it rather than your tenure. The US-remote roles pay better; the Pune roles are easier to close. **That is the actual trade you are making, and it is worth running both tracks in parallel given the 30-day clock.**

---

---

## 📊 MARKET ANALYSIS

*Frameworks applied: Five Forces · Competitive Positioning Map · Market Timing Assessment*

### Market Landscape

The market you are selling into is **"companies that need someone to make LLMs work in production."** It has split into four segments that behave nothing alike:

| Segment | Volume | Band demanded | Hiring mechanism | Your odds |
|---|---|---|---|---|
| **Brand-name AI startups** (opexlabs, Mem0, Memorang, Level AI) | Low | 4–8 YOE | Deep applicant pools, referral-weighted | **Low** |
| **US/EU startups hiring remote into India** (Pulsora, Lamatic, Simbian) | Medium | 3–6 YOE, flexible | Async take-home, artifact-led | **Medium — best comp** |
| **Pune/India GenAI delivery** (Dimakh, the 8-seat posting, mid-tier product cos) | **1,283 in Pune alone** | **2–5 YOE** | Direct email, DM, small-panel practical | **High — best close rate** |
| **Enterprise / IT services** (TCS, HCL, Persistent, Barclays) | High | 4–10 YOE | ATS + aptitude + form-field filters | **Near zero — empirically disproven** |

### Competitive Dynamics — Five Forces on your own labour market

- **Rivalry (candidates):** Brutal in segment 1, thin in segment 3. Thousands of engineers can say "I used ChatGPT's API." Very few at 2 YOE can discuss chunk-size tradeoffs, cosine vs dot product, ACL-aware retrieval, and eval-harness regression detection. **Rivalry is a function of which queue you stand in, and you have been standing in the wrong one.**
- **Buyer power (employers):** Very high in enterprise (they have a form and 400 applicants). Sharply lower at a 20-person consultancy that needs a RAG system shipped and cannot find anyone who has built one.
- **Substitutes:** ⚠️ **The real threat.** Employers can substitute you with (a) a 5-YOE backend engineer who "picked up LangChain," (b) a managed vendor, or (c) an agent stack. Your defence is the part that does not commoditise: **permission-aware retrieval and evaluation** — the unglamorous, correctness-critical layer.
- **New entrants:** Severe and worsening. Every bootcamp is shipping "GenAI engineers." **Your GenAI knowledge is depreciating faster than your spec-driven capability.** Spend it now.
- **Supplier power (your inputs):** You control your artifacts outright. No gatekeeper.

### Market Opportunities

1. **The 2-YOE GenAI band in Pune is under-supplied.** Employers post at 2–5 YOE because they cannot afford or attract 5+. Applicants at 2 YOE mostly lack production RAG depth. You sit precisely in that notch.
2. **Hiring posts as a channel.** A DM to the hiring manager arrives before an ATS field can reject you.
3. **ACL-aware RAG is a hot, under-served problem.** Every enterprise deploying RAG hits "what if the model retrieves a document this user shouldn't see." **You built that.** Almost nobody at any band has.

### Critical Insights

> **Insight 1 — Your rejection was a channel failure, not a capability failure.** TCS rejected a form field. Any strategy that routes through a form field reproduces the result.

> **Insight 2 — Two assets, opposite decay curves.** GenAI knowledge depreciates fast (commoditising). Spec-driven capability appreciates (still rare, increasingly valuable as agents proliferate). **Monetise GenAI now; compound spec-driven as the long game.**

> **Insight 3 — Market timing is *good* and closing.** GenAI hiring is at peak volume with a supply gap at junior bands. That gap closes as bootcamp cohorts land. The window is open now.

---

## 💼 BUSINESS MODEL ANALYSIS

*Frameworks applied: Value Proposition Canvas · Business Model Canvas*

### Current Business Model

You have been running: **"Accumulate credentials and preparation, apply through standard channels, convert via interview performance."**

- **Customer segment:** Employers hiring engineers, undifferentiated
- **Value prop:** "Competent engineer who has studied hard"
- **Channel:** Job listings and consultancy-mediated pipelines
- **Key activity:** Studying and rehearsing
- **Revenue:** Salary, single stream
- **Cost:** Time, and a running notice-period clock

**This model just failed a live test.** It routes you into the one channel structurally biased against you.

### Value Proposition Assessment

**Employer jobs-to-be-done (what they're actually hiring for):**
- "Make our LLM feature work in production without embarrassing us"
- "Deal with the customer so my engineers don't have to"
- "Ship something demonstrable this quarter"

**Their pains:** LLM demos that die in prod · hallucinations on regulated data · nobody who can talk to customers *and* code · no way to tell if the system got better or worse.

**Your gain-creators, matched:**

| Their pain | Your artifact |
|---|---|
| RAG leaks documents across permission boundaries | **PermRAG ACL pre-filter index** |
| No way to measure if changes helped | **PermRAG evaluation harness** |
| Requirements → working system is slow and lossy | **BMad / spec-driven pipeline, genesis kit** |
| Regulated-domain GenAI (BFSI) | **31-hr BFSI-America sprint, rehearsed** |

**The honest gap:** none of this is legible from a CV. It is legible from a repo, a demo, or ten minutes of conversation. **Your value proposition is undeliverable through the channel you were using.** That single sentence is the whole diagnosis.

### Revenue and Cost Structure

- **Revenue:** salary only. Floor ₹13L. Pune band ₹8–16L; US-remote higher.
- **Cost:** 30-day notice is a **depreciating asset** — "currently employed, resigned voluntarily, serving notice" is a materially stronger position than "between roles," and it expires.
- **Hidden cost:** every application into an enterprise ATS is time spent on a channel with a demonstrated zero.

### Business Model Weaknesses

1. **Single-channel dependency** on the channel that filters you out
2. **Illegible assets** — best work invisible in the format employers screen on
3. **Title-anchoring** — optimising for "Forward Deployed Engineer" instead of the work
4. **Perishable inventory** — BFSI sprint decays in weeks; notice-period status decays on a fixed date
5. **No inbound** — 100% outbound, zero compounding

---

## ⚡ DISRUPTION OPPORTUNITIES

*Frameworks applied: Disruptive Innovation Theory · Jobs to be Done · Blue Ocean Strategy*

### Disruption Vectors

**Disruptive Innovation, applied to yourself:** disruptors win by serving *overlooked customers* with something *good enough* on the dimension that matters, while being worse on the dimension incumbents compete on.

- **Incumbents (4–8 YOE engineers)** compete on tenure and system-design breadth. You lose there. Permanently, this year.
- **Overlooked customers:** Pune consultancies and mid-tier product companies that need production RAG, cannot attract senior AI talent, and will trade tenure for demonstrable capability.
- **Your "good enough":** you cannot architect their whole platform. You *can* ship a permission-aware RAG system with an eval harness — which is the thing they actually need and cannot hire for.

### Unmet Customer Jobs

1. **"Prove our AI works"** — evaluation is the single most-neglected part of GenAI delivery. Nearly every team ships on vibes. You have a harness.
2. **"Don't leak data through the model"** — acute in BFSI/healthcare/enterprise. PermRAG is exactly this.
3. **"Translate the customer's mess into a spec an engineer or agent can execute"** — the actual FDE job, and your genuine differentiator.

### Technology Enablers

- **Agent-executable specs are becoming the unit of engineering work.** As coding agents absorb implementation, the scarce skill shifts to *writing the specification*. You have been practising the skill the market is rotating toward.
- **Enterprise RAG has hit its governance wall** — permissions, audit, evaluation. Capability demos are over; correctness is the frontier.
- **Remote async hiring is normalised**, which structurally favours take-homes over whiteboards. Every take-home is a round where DSA cannot hurt you.

### Strategic White Space

> **"The 2-YOE engineer who owns correctness, not capability."**

Nobody occupies this. Junior candidates demo capability ("I built a chatbot"). Senior candidates own architecture. **Almost no one at any band shows up saying: here is how I prove the system is right, and here is how I stop it leaking.** It is unglamorous, which is precisely why it is uncontested — and it maps 1:1 onto what you already built.

**Blue Ocean grid:**
- **Eliminate:** DSA prep · aptitude prep · enterprise ATS applications · title-chasing
- **Reduce:** breadth study · credential accumulation
- **Raise:** artifact legibility · direct-to-human channels · BFSI domain framing
- **Create:** a public, inspectable body of work on permission-aware retrieval and evaluation

---

## 🚀 INNOVATION OPPORTUNITIES

*Frameworks applied: Three Horizons · Value Chain Analysis · Partnership Strategy*

### Innovation Initiatives

1. **PermRAG as the demo, not the side project.** A hosted demo + 2-minute walkthrough video showing a document leaking without the ACL filter and blocked with it. Visceral, and instantly legible to a hiring manager.
2. **The eval harness as the differentiator.** A one-page writeup of your regression-detection approach — this is the HackerRank Applied AI JD's stated requirement, in your words.
3. **A one-page "spec-driven delivery" artifact.** Requirements → machine-readable spec → agent-executed implementation, with the genesis kit as proof it generalises.
4. **BFSI GenAI positioning.** You have regulated-domain framing rehearsed. Pune is thick with BFSI delivery. Lead with it.
5. **The DM template.** One reusable, artifact-led opener for LinkedIn hiring posts. This is the highest-leverage single asset in the plan.
6. **The niche-board sweep.** agentic-engineering-jobs.com and similar — low traffic, direct application.
7. **Reactivate the referral pipeline** (Ranjeet → Mangesh → Rushikesh). Referrals bypass the form field by definition.
8. **Contract-to-hire as a wedge.** Short paid engagements convert on delivered work, not tenure. A live conversion is worth more than any interview.

### Business Model Innovation

**From:** credential accumulation → apply → interview
**To:** **artifact-led direct outreach → conversation → work sample → offer**

- **Channel inversion:** DM/email first, ATS never
- **Proof inversion:** show the system, don't describe the CV
- **Segment inversion:** target companies that can't hire seniors, not companies everyone wants
- **Sequence inversion:** monetise the depreciating asset (GenAI) now; compound the appreciating one (spec-driven) continuously

### Value Chain Opportunities

The hiring value chain runs: *sourcing → screening → interview → offer*. **Screening is where you die.** Every viable move disintermediates screening:

- Referral → skips it
- DM to hiring manager → skips it
- Small consultancy direct email → there is no screening layer
- Public artifact that attracts inbound → inverts it entirely

### Partnership and Ecosystem Plays

- **Referral network** — Ranjeet/Mangesh/Rushikesh; explicitly ask for intros, not opinions
- **Recruiters who specialise in GenAI** — they are measured on placements and will fight the band objection for you
- **Ex-ElasticRun colleagues** — warmest available intro path
- **n8n/LangChain/agentic communities** — where the low-competition contract work is posted

---

## 🎲 STRATEGIC OPTIONS

### Option A: Pune GenAI Beachhead

Target the 1,283-vacancy Pune GenAI market at the 2–5 YOE band. Lead with the BFSI sprint and PermRAG. Apply exclusively through direct email and DM. Close fast, inside the notice window.

**Pros:** Highest close probability · zero new study · spends the perishable BFSI asset at peak value · no relocation · no DSA/aptitude · closes before the employment gap opens.

**Cons:** Comp lands ₹13–16L, near your floor not above it · lower title prestige · some employers are services-shaped, risking a repeat of the delivery-treadmill dynamic · does not build toward FDE.

### Option B: US-Remote Applied AI

Target US/EU startups hiring remote into India. Async take-homes and artifact-led screening. Applied AI Engineer / Technical Implementation / FDE titles.

**Pros:** Materially better comp (Simbian ₹16–30L; USD roles higher) · take-home format is your strongest surface · the real FDE title lives here · genuinely global work.

**Cons:** Longer cycles that likely outrun your 30 days → **an employment gap opens** · timezone cost · deeper applicant pools · more rejection volume.

### Option C: Artifact-Led Inbound

Make PermRAG and the eval harness public and legible — hosted demo, writeup, video. Let the work generate inbound and convert conversations rather than applications.

**Pros:** Compounds · attacks the root cause (illegibility) rather than symptoms · inverts screening entirely · asset persists across every future search · the only option that improves your position for the *next* search too.

**Cons:** **Slowest to produce income** · no guaranteed conversion · effort that could go to applications · you must ship the demo, and unshipped it is worth nothing.

---

## 🏆 RECOMMENDED STRATEGY

### Strategic Direction

**Run A and B in parallel, with C as the shared ammunition. Beachhead is A.**

This is not hedging — the three options share one input. The PermRAG demo, the eval-harness writeup, and the DM template are *the same artifacts* whether they go to a Pune consultancy or a US startup. **C is not a third path; it is the payload both other paths carry.** Build it once, fire it twice.

**Why A is the beachhead:** you have a 30-day clock and no floor offer. "Currently employed, resigned voluntarily, serving notice" is a materially stronger negotiating position than "between roles," and it expires on a known date. A closes fastest, requires no new study, and spends your most perishable asset at peak value.

**Why B runs concurrently, not after:** B pays better and holds the title you want. Its cycles are long, so starting it late means starting it *never*. It costs almost nothing to run alongside A because the artifacts are shared.

**What makes me confident:** the market data is unambiguous — 1,283 Pune GenAI vacancies, multiple explicitly at your band, and a candidate pool that is thin on production RAG depth. Your sprint content is a literal match. Requires zero new study, which was your binding constraint.

**What scares me:** you must *ship* the PermRAG demo. Right now it is a repo, and a repo is not a demo. If C does not get built, A and B both degrade back into "2-YOE candidate asserting competence" — and you already know how that resolves.

### Key Hypotheses to Validate

| # | Hypothesis | Kill signal |
|---|---|---|
| H1 | Direct DM/email to hiring managers converts materially better than ATS | 20+ DMs, <10% reply → channel theory is wrong; reconsider recruiters |
| H2 | Pune employers at 2–5 YOE will trade tenure for demonstrated RAG capability | 5+ first-conversations all die on years → the band is harder than modelled |
| H3 | PermRAG is legible to a hiring manager in under 5 minutes | Interviewers don't engage with the demo → it's built for engineers, not buyers; rebuild the framing |
| H4 | ₹13L+ is achievable at the Pune 2-YOE band | Every offer lands sub-₹13L → choose: lower floor, or commit fully to B and accept the gap |
| H5 | The BFSI sprint transfers beyond TCS | BFSI framing lands flat → drop it, lead on permission-aware retrieval alone |

### Critical Success Factors

- **PermRAG must become a demo, not a repo.** Non-negotiable. Everything else depends on it.
- **Volume through the right channel.** Parallel batches, not sequential applications. The clock is the enemy.
- **The band answer, pre-scripted.** It will be asked every single time. Never round up, never get defensive, always pivot to artifacts within one sentence.
- **Ruthless channel discipline.** Zero enterprise ATS applications. That channel has a demonstrated zero.
- **Referral activation.** Ask for intros explicitly — not advice, not opinions. Intros.

---

## 📋 EXECUTION ROADMAP

### Phase 1 — Immediate Impact

**Objective:** be in live conversations while still employed.

| Initiative | Deliverable | Gate |
|---|---|---|
| Ship the PermRAG demo | Hosted or video walkthrough: leak → blocked, with the ACL filter toggled | ⛔ **Blocks everything else** |
| Eval-harness one-pager | Regression detection in plain language | Attach to every outreach |
| DM template | Reusable artifact-led opener, ≤5 lines | Ready before outreach starts |
| Dimakh Consultants | Direct application — closest band+skill match found | Response or silence |
| Pune hiring-post DMs | Both LinkedIn postings + recruiters | Reply rate ≥ H1 threshold |
| Referral activation | Explicit intro requests, Ranjeet → Mangesh → Rushikesh | ≥1 warm intro |
| Track B seeded | HackerRank Applied AI, Simbian, Pulsora, Lamatic, opexlabs | Applications in flight |

**Decision gate:** live conversations in Track A? If zero, H1 or H2 is wrong — diagnose before adding volume.

### Phase 2 — Foundation Building

**Objective:** convert conversations into offers; protect the floor.

- Run technical conversations on **your** ground: RAG design, chunking tradeoffs, ACL-aware retrieval, evaluation. Steer there early and deliberately.
- Complete take-homes with **production-grade evaluation included** — that is the move that separates you from the 5-YOE generalist who "picked up LangChain."
- Publish the PermRAG writeup for inbound (Option C compounding).
- Widen to niche boards and agentic-AI communities.
- Open contract-to-hire conversations as a hedge against the notice deadline.

**Decision gate:** ≥1 offer at or above ₹13L? If not, H4 is dead — choose consciously between lowering the floor and accepting a gap for Track B.

### Phase 3 — Scale & Optimization

**Objective:** convert position into trajectory.

- Negotiate using competing conversations, not tenure arguments.
- Choose on **learning slope**, not title: does this role move you toward owning specs and customer-facing delivery, or toward ticket execution?
- Continue publishing — the artifact body is what makes the *next* search easier, and the next search will come.
- Re-approach Track B companies once employed. "Currently building X at Y" reopens doors that "2 YOE, between roles" closed.

---

## 📈 SUCCESS METRICS

### Leading Indicators

- **DM/email reply rate** — the single best early signal; validates or kills H1 outright
- **Reply → first-conversation conversion**
- **Take-home / work-sample invitations** — every one is a round where DSA cannot hurt you
- **Demo engagement:** do interviewers ask follow-up questions about PermRAG? Engagement means it is legible; polite acknowledgement means it is not
- **Band-objection frequency:** how often "2 years" is raised, and whether the scripted answer closes it

### Lagging Indicators

- Offers in hand · offer comp vs the ₹13L floor · **days between notice end and start date** (target ≤ 0) · role quality: spec/customer-facing ownership vs ticket execution

### Decision Gates

| Gate | Criterion | If failed |
|---|---|---|
| G1 | PermRAG demo shipped | **Stop applying. Build it.** Everything downstream depends on it. |
| G2 | ≥10% DM reply rate | H1 dead → pivot to recruiters and referrals |
| G3 | ≥1 live Track-A conversation | Band is harder than modelled → widen to contract-to-hire |
| G4 | ≥1 offer ≥ ₹13L | Explicit choice: lower the floor, or accept a gap to hold out for Track B |

---

## ⚠️ RISKS AND MITIGATION

### Key Risks

1. **The demo never ships.** ⭐ **Highest-probability failure mode.** You are strong at systems and strategy, and this plan is more strategy — which is the comfortable move. Without the demo the whole strategy collapses into unsupported assertion.
2. **Notice expires with nothing signed** → gap opens, negotiating position weakens, and the band objection compounds with an availability objection.
3. **Comp floor unmet.** Pune 2-YOE band centres below ₹13L. Real risk.
4. **The band objection is simply fatal at some companies** regardless of channel. TCS was not necessarily an outlier.
5. **GenAI knowledge depreciates** — the BFSI sprint is at peak value now and loses value weekly.
6. **Strategy-as-procrastination.** You have an unusually sophisticated planning system. It can absorb unlimited effort and produce zero applications.
7. **Tooling fragility** — Apify quota exhausted, Wellfound bot-walled, DuckDuckGo rate-limits. Do not let search infrastructure become the bottleneck; the target list is already sufficient to act on.

### Mitigation Strategies

| Risk | Mitigation |
|---|---|
| Demo never ships | **Gate G1 is hard.** No applications go out until the demo exists. Ship something rough and hosted over something polished and local. |
| Notice expires | Run A and B in parallel from the start. Open contract-to-hire early — a live paid engagement beats an interview. |
| Comp floor | Decide the real walk-away number *before* an offer arrives, not during. Use Track B conversations as negotiating leverage in Track A. |
| Band objection | Pre-scripted answer, never rounded up, pivoting to artifacts within one sentence. Never let the band and any other concern be answered in the same breath. |
| GenAI depreciation | **Spend it now.** Prioritise Track A specifically because it monetises the perishable asset. |
| Strategy-as-procrastination | This document is complete. **No further strategy artifacts until G1 clears.** |
| Tooling fragility | Target list is sufficient. Stop searching, start sending. |

**Backup plan:** if no offer clears ₹13L before notice expires, take the best available Pune GenAI role at ₹11–13L *while continuing to publish*. Employed-and-building beats unemployed-and-holding-out — it preserves the "currently building X" framing that reopens Track B, and it stops the clock that weakens every other position.

---

## THE ONE-LINE STRATEGY

> **Ship the PermRAG demo. Send it directly to humans at Pune GenAI companies hiring at 2–5 YOE, and to US-remote startups in parallel. Never touch an ATS again.**

---

_Generated using BMAD Creative Intelligence Suite — Innovation Strategy Workflow · Complete (Steps 1–9)_
