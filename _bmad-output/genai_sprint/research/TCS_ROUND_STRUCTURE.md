# TCS ROUND STRUCTURE — The Offline / Walk-In Day

**Event:** TCS Pune, offline, 01 Aug 2026. Gen AI Engineer. Band 4-10 YOE.
**Research date:** 27 Jul 2026. URLs in `SOURCES.md`.

Markers: **[V]** verified from a fetched source. **[I]** inferred/synthesized.
**[UNKNOWN]** = I could not verify; treat as risk to plan around.

---

## 1. THE HEADLINE: THREE INTERVIEW ROUNDS, USUALLY SAME DAY

**[V]** TCS lateral/experienced hiring runs **TR → MR → HR**:

| # | Round | Who runs it | Focus |
|---|-------|-------------|-------|
| 1 | **TR** — Technical Round | Senior engineer / tech panel | Core skills, code, project deep-dive |
| 2 | **MR** — Managerial Round | Senior manager / delivery manager | Project ownership, decisions, trade-offs, scenario handling |
| 3 | **HR** — HR Round | HR | CTC, notice period, relocation, availability |

**[V]** foundit (TCS recruitment process): "TCS usually conducts two to three rounds,
depending on the hiring track and role." The TR focuses on core technical skills — "you might
be asked to write code, explain algorithms, or walk through your project work." The HR round
covers "compensation, notice period, and willingness to relocate."

**[V]** Glassdoor forum post from a candidate who did a **TCS walk-in**: cleared "TR, MR and
HR" in the drive, then document verification, then an offer within a week. Confirms all three
happen at the walk-in itself.

**[V]** S1 (LinkedIn, TCS GenAI Developer — virtual, not walk-in) confirms the same shape with
a phone screen in front: **Phone screen → Technical (senior engineer) → Managerial (senior
manager)**. For a walk-in, the phone screen collapses into on-site shortlisting.

### What this means for 01 Aug
Devang should plan for **a full day**, not a one-hour slot. Realistic shape:

```
Arrive / register / CV screening   →  wait (can be 1-3 hrs)
TR    (~30-60 min)                 →  wait for result
MR    (~20-45 min)                 →  wait
HR    (~10-20 min)
Document verification / photo
```

**[I]** Waiting is the dominant experience of a TCS walk-in. Candidates routinely report
multi-hour gaps between rounds. He should bring a one-page revision sheet — the gaps are
usable prep time, and that is a real tactical edge.

---

## 2. IS THERE AN APTITUDE OR CODING TEST?

**[V] For lateral / experienced walk-ins: generally NO separate aptitude test.**
The 4-round structure (Online Test → TR → MR → HR) is the **TCS NQT fresher** track, not the
lateral track. GeeksforGeeks/Naukri describe the online-test round as part of NQT recruitment
for freshers.

**[V]** foundit describes the *experienced* selection process as "aptitude tests, technical
interviews, HR interviews, and document verification" — with aptitude listed as a *may*, not
a *will*.

**[V] Coding happens INSIDE the TR, not as a separate test.** Evidence:
- S3 (Glassdoor, TCS Gen AI Engineer): asked to "write code to find the second largest number
  in a list without using built-in functions, and provide test cases"
- S1: Python questions on decorators, list comprehensions, threading vs multiprocessing, OOP
- foundit: in the TR "you might be asked to write code"

**Practical read:** expect to write code **on paper or a whiteboard**, or to talk through it
verbally. It will be Python fundamentals level, not algorithmic. **[I]** Offline drives
frequently have no machine available — practice writing Python by hand at least once.

**[UNKNOWN]** Whether this specific Pune drive includes a pre-interview written/online
assessment. Not verifiable from public sources. **Plan for it anyway** — arriving prepared
for a 30-minute written screen costs nothing; being surprised by one is expensive.

---

## 3. THE DAY — WHAT TO BRING

**[V]** From TCS walk-in notifications and candidate reports:

**Documents (bring physical copies — offline drives are paper-driven):**
- [ ] **Updated CV — 4-6 printed hard copies.** Non-negotiable. Panels keep one each.
- [ ] **Photo ID proof** (Aadhaar / PAN / Passport) — original + photocopies
- [ ] **Educational certificates** — degree, marksheets (originals + copies)
- [ ] **Experience letters** from all prior employers
- [ ] **Latest 3 months payslips** + latest Form 16 / offer letter (for CTC discussion)
- [ ] **Passport-size photographs** — 2-4
- [ ] **Relieving letter** from any past employer, if applicable

**[V]** HR collects ID proof and takes photos on-site; document verification is then completed
in the **iBegin portal roughly one week after** the drive. So the on-site step is collection,
not final verification.

**Practical:**
- [ ] Printed one-page revision sheet (for the waiting gaps)
- [ ] Water + food. Drives run past lunch and the queue does not.
- [ ] Pen + small notebook — for whiteboard/paper coding and for taking down the panel's name
- [ ] Phone charger / power bank
- [ ] **[V]** Business/formal attire. Search results did not give an explicit TCS dress code
  **[UNKNOWN]**, but formals are the default expectation at Indian service-firm drives, and
  under-dressing is a needless risk.

**[V]** Typical walk-in registration window is morning, e.g. **9:30 AM - 12:30 PM**, though it
varies per drive. **Devang must re-read his own invite email for the exact venue, gate, time
window, and any pre-registration/EP number requirement — that overrides everything here.**

---

## 4. ROUND-BY-ROUND PLAYBOOK

### Round 1 — TR (Technical)
**[V] from S1, S2, S3.** Runs 30-60 min, conducted by a senior engineer.

Observed opening: **"Tell me about yourself"** (S1) or **"Explain your project"** (S2).

Observed content mix for a GenAI role:
- ~40% GenAI concepts: RAG flow, vector DBs, similarity metrics, chunking, embeddings,
  temperature/top-k/top-p, function calling, structured output
- ~30% project deep-dive: what did you build, why those choices, what broke
- ~30% Python/OOP: decorators, comprehensions, threading vs multiprocessing, inheritance,
  polymorphism, classmethod vs staticmethod, tuples vs lists, a small coding problem with
  test cases

**Tactics:**
- Open with a 60-90 second pitch, not a chronological CV recital
- When asked to design RAG, **ask clarifying questions first** (corpus size? latency budget?
  who are the users? are documents permissioned?). The clarifying question is itself a
  seniority signal and it also buys thinking time.
- Volunteer evaluation unprompted. Nobody asks; saying it anyway is the strongest single move.
- If he doesn't know something: "I haven't used that in production. My understanding is X —
  is that the direction you mean?" Never bluff. Bluffing is detected in about 30 seconds
  and it poisons the rest of the round.

### Round 2 — MR (Managerial)
**[V] from S1:** run by a senior manager. Content observed:
- Detailed project walkthroughs
- LangChain applications (agents, tools, chains, memory) — **so technical questions do
  continue into MR; do not mentally switch off**
- LLM evaluation metrics (BLEU, ROUGE, perplexity, F1)
- Fine-tuning vs RAG decision criteria
- Real-world GenAI challenges: hallucination, context limits, grounding
- **Leadership, ownership, and problem-solving approach**

**[I] This is where the 4-10 YOE band gets probed.** Not "do you know LangGraph" but "have
you owned something end to end, and what did you do when it broke." Devang's offline-first
warehouse system and IAM workflows are exactly the ammunition for this round — he should
have 3 STAR stories loaded:
1. A thing he shipped end-to-end and who used it
2. A thing that broke in production and how he diagnosed + fixed it
3. A technical decision he made with a trade-off he can defend both sides of

**[I]** Common MR scenario questions at TCS: handling a client escalation, disagreeing with a
teammate, a missed deadline, working with an unclear requirement. Have one answer each.

### Round 3 — HR
**[V]:** covers CTC, notice period, willingness to relocate, availability.

Prepare exact numbers before walking in:
- Current CTC (fixed + variable, precisely)
- Expected CTC — a *range* with a justified floor
- Notice period + whether it can be bought out
- Location flexibility (the role is Pune — confirm he is comfortable, and say so plainly)
- Earliest joining date

**[I]** HR at a walk-in is rarely an elimination round for a candidate who cleared TR+MR — it
is a logistics and fit conversation. The main way to lose here is an unjustifiable CTC
expectation or evident inflexibility on location.

---

## 5. AFTER THE DAY

**[V]** Post-drive sequence, from a walk-in candidate report:
1. Cleared TR + MR + HR at the drive
2. Document verification collected on-site, then processed via **iBegin portal ~1 week later**
3. HR indicated offer letter within about a week
4. A further **short (~15 min) multi-panel call** can follow, with TR + MR interviewers and HR
   on the same chain — treat as a confirmation/fitment call, not a new technical round

**[I]** So: no offer on the day is normal and is not a rejection signal. The pipeline runs a
week or more.

---

## 6. RISK REGISTER — WHAT I COULD NOT VERIFY

| # | Unknown | Mitigation |
|---|---------|------------|
| 1 | Whether this Pune drive has a written/online screen before TR | Assume yes; being over-prepared costs one hour |
| 2 | Exact number of rounds for *this* drive (could be 2 if they compress) | Prepare all 3 |
| 3 | Whether Devang's specific req is walk-in vs scheduled-slot | **He must re-read the invite email** — venue, time, EP/reference number, pre-registration link |
| 4 | Explicit dress code | Wear formals |
| 5 | Whether coding is on a laptop or on paper | Practice writing Python by hand once |
| 6 | Whether the panel is GenAI-specialist or generalist | **[I]** At service firms the TR panel is often a generalist with a GenAI checklist — which *favours* Devang, since breadth + clear explanation beats research depth |

**The single most important action item in this file:** re-read the actual TCS invite email
for venue, gate, reporting time, and required documents. It supersedes every inference here.
