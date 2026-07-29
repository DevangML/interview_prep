# 🗣 RECITE CORPUS — every spoken answer, one file

**This is the single source for anything Devang says out loud.** Indexed by the question that triggers it. When he asks for "the answer to X", it comes from here verbatim.

**Voice rules (his register — preserve these):**
- Says **"honestly"** and **"I'd rather be straight about that"** — plain, slightly blunt, no corporate padding
- Concrete before abstract: a number, a project, a moment — then the point
- Admits the unflattering thing rather than routing around it
- **Short.** 30-45 seconds. Stops without filling silence
- **Never uses:** passionate · leverage · journey · ecosystem · cutting-edge · synergy · "always wanted to work at TCS"

---

## INDEX

| # | Trigger | Length |
|---|---|---|
| A1 | "Tell me about yourself" | 90s |
| A2 | "You have under 3 years, JD says 4-10" | 60s |
| A3 | "Why do you want to join TCS?" | 35s |
| A4 | "Why this BU / why BFSI?" ⭐ | 45s |
| A5 | "What excites you?" | 40s |
| A6 | "Why are you leaving?" | 15s |
| A7 | "What's your notice period?" | 15s |
| A8 | "Explain your project" ⭐ | 90s |
| A9 | "Salary expectations?" | 30s |
| A10 | "Location flexibility?" | 15s |
| A11 | "Any gaps in employment?" | 10s |
| A12 | "Do you have questions for us?" | — |

---

## A1 — "TELL ME ABOUT YOURSELF" · 90s
*Full text in `RECITE_THIS.md` §1. Four beats:*
who/how long/where → **the AI angle** → the full-stack foundation → why this role.
**Pause after "six hundred tracked items."** Land on *"a systems problem more than a model problem."*

---

## A2 — THE EXPERIENCE BAND · 60s
*Full text in `RECITE_THIS.md` §2.* Density → altitude → **"production GenAI is younger as a discipline than the band you've asked for."**
Close: *"I'm not asking you to lower the bar. I'm asking you to apply it to what I've actually built."*

---

## A3 — "WHY TCS?" · 35s

> "Honestly, the pull was the business unit before the company.
>
> I've been at ElasticRun three years — genuinely good place to learn, I shipped across three different product domains there. But the clients are Indian retail and distribution, and the problems have a ceiling on them. Nobody's going to ask me to prove a system is correct to a regulator.
>
> What TCS has that I can't get where I am is the client base. If I want to build GenAI systems where being wrong actually costs something, I need to be near clients where being wrong actually costs something.
>
> I'd rather say that plainly than tell you I've always dreamed of working here."

---

## A4 — "WHY BFSI?" ⭐ · 45s

> "This one's almost a coincidence in my favour.
>
> Before I knew the BU was BFSI, I'd already built a permission-aware RAG system — retrieval where the access-control filter is applied before the vector search, so a user can only ever retrieve what they're cleared to see.
>
> I built it because I'd spent a stretch on IAM at ElasticRun — RBAC, field-level permissions across five personas, default-deny approval workflows. So when I started reading properly about RAG, the first thing I noticed was that none of the tutorials handle permissions at all. Every example assumes one flat corpus and one user. That bothered me enough that I built the version that doesn't.
>
> Then I saw BFSI-America on the invite. And that's the domain where that problem isn't optional — a relationship manager and a compliance officer asking the same question should get different answers. In most industries that's a nice-to-have. In banking it's the requirement."

---

## A5 — "WHAT EXCITES YOU?" · 40s

> "The gap between a demo that works and a system you'd actually defend.
>
> When I built that retrieval system I could have stopped fairly early — it was returning good answers within a day. What I actually spent most of the time on was evaluation: forty questions, twelve of which the system is supposed to refuse, and measuring whether it refused the right ones.
>
> Then I ran ablations to find which of my design choices were actually load-bearing. Two of them weren't. I had MMR turned on because everyone turns MMR on — and when I measured it, it cut precision almost in half. So I turned it off.
>
> That's the part I find genuinely interesting. Not getting something to work — finding out which parts of it were doing nothing. In a regulated domain that stops being a preference and becomes the job."

---

## A6 — "WHY ARE YOU LEAVING?" · 15s

> "I resigned. I've moved decisively toward AI engineering over the last year and I want that to be the work rather than the side of the work."

**Complete answer. Say nothing further.** Record reads *"Resigned."* Never mention performance, PIP, or circumstances.

---

## A7 — "NOTICE PERIOD?" · 15s

> "Thirty days, and my HR is already aligned on releasing me at that — so I can move quickly against your project date."

---

## A8 — "EXPLAIN YOUR PROJECT" ⭐ · 90s
*Full text in `project/PROJECT_TALK_TRACK.md` §1. BFSI reframe in `BFSI_PROJECT_REFRAME.md`.*

**Open with provenance — always:** *"This is something I built myself over the last few days."*
**Land the line:** *"Post-filtering is secure and useless. Pre-filtering is secure and useful."*
**Volunteer the failure:** *1 of 40 — similarity isn't sufficiency.*

---

## A9 — "SALARY EXPECTATIONS?" · 30s
*Full treatment in `TCS_MANAGERIAL_HR.md`.* Anchor on shipped GenAI systems + three-domain breadth, not a market table. Flexible on structure. **Never raise this before the HR round.**

---

## A10 — "LOCATION?" · 15s

> "Pune's home so that's my preference, but I'm open — if the role sits elsewhere, I'll go where it is."

**Yes-with-preference.** Never "Pune only" — it's a known rejection trigger.

---

## A11 — "ANY GAPS?" · 10s

> "No gaps — I'm with ElasticRun currently, serving notice."

True. Safe. Move on.

---

## A12 — HIS QUESTIONS FOR THEM
*In `TCS_MANAGERIAL_HR.md`.* Ask about the work: what the team is actually building, how they evaluate GenAI systems in a regulated setting, what the first six months look like. **Never ask about hours or leave.**

---

## 📅 WHERE THIS GETS PRACTISED

**A3/A4/A5 get WORSE with over-rehearsal.** Three light touches, spaced — thought-through, not memorised.

| When | What |
|---|---|
| **Wed 22:30** (consolidation slot) | A3, A4, A5 — once each, aloud. First pass. |
| **Thu, STAR block** | A3-A5 again + the three follow-ups. Second pass. |
| **Fri taper** | A3-A5 once, plus A1/A2/A6/A7. Final pass. |
| **Sat 06:00** | A1 and A8 only. Nothing else. |

**A1, A2 and A8 are different** — those are structural and *do* reward repetition. Drill them properly.
