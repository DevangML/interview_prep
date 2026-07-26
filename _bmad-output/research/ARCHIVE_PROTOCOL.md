# ARCHIVE PROTOCOL — Care Instructions for the Research Archive
**Version 1.0 · Created 2026-07-26 · Owner: Devang · Maintainer: Senku (the system)**

> The archive is the evidence base. The curriculum is downstream of it.
> If a claim in the curriculum cannot be traced back into this folder, the claim is not yet real.

This document is **process, not content**. It does not change when the curriculum changes. It changes only when the *rules for evidence* change.

---

## 0. Why this exists

The system this replaces had a specific, diagnosable failure: **numbers with no provenance**. `okf_state.json` carried retention scores of `0.9933`, `0.9662`, `0.9922` for subjects that had never been studied for a single hour. Mastery scores of `0.85` sat next to `status: "not_started"`. Nobody fabricated them maliciously — they were placeholder scaffolding that was never marked as such, and then got read back as fact and used to plan.

That is the failure mode this protocol prevents. Not dishonesty. **Drift between what is known and what is asserted**, caused by not recording *how* anything came to be known.

The rule that follows from this is short enough to memorize:

> **Every number in the curriculum has a citation, or it is labelled an estimate. There is no third category.**

---

## 1. Archive layout

```
_bmad-output/research/
├── RESEARCH_INDEX.md          ← the front door; every artifact listed
├── ARCHIVE_PROTOCOL.md        ← this file; the care instructions
├── RETENTION_ARCHITECTURE.md  ← the binding learning-science design
├── market/                    ← what interviews actually ask, and how often
│   └── *.md
└── syllabus/                  ← what the full topic inventory IS, per subject
    └── *.md
```

**Directory meanings — do not blur these:**

| Folder | Answers the question | Decays |
|---|---|---|
| `market/` | *"What do they ask, and how often?"* | **Fast** — see §4 |
| `syllabus/` | *"What is the complete list of things to know?"* | **Slow** |
| `RETENTION_ARCHITECTURE.md` | *"How do I learn it so it stays?"* | **Very slow** |

Market data is opinion about a moving target. Syllabus is closer to a fact about a field. Retention science is closer to a fact about human memory. **They rot at different speeds, so they get different re-research triggers.** Filing something in the wrong folder gives it the wrong shelf life — that is the main way this archive can quietly go bad.

---

## 2. How a finding gets added

Every research artifact is a Markdown file with this header. No exceptions, including for one-paragraph findings.

```markdown
# <Title>
- **Produced by:** <agent name or "Devang">
- **Date:** YYYY-MM-DD
- **Question asked:** <the actual question this research was trying to answer>
- **Method:** <web search / doc fetch / interview report / personal experience>
- **Confidence:** HIGH | MEDIUM | LOW  (see §3)
- **Decay class:** FAST | MEDIUM | SLOW  (see §4)
- **Supersedes:** <path, or "nothing">
```

Then the body. Then, mandatory, a **Sources** section listing every URL with its verification status:

```markdown
## Sources
- [VERIFIED 2026-07-26] https://example.com/page — what it supports
- [UNVERIFIED-BY-FETCH] https://leetcode.com/... — 403 to automated fetch, bot-protected
- [DEAD 2026-07-26] https://old.example.com/gone — 404, retained to prevent re-citation
```

**Three rules about adding:**

1. **Append, never overwrite.** If a finding is replaced, the new file names the old one in `Supersedes:`, and the old file gets a banner at the top pointing forward. Nothing is deleted. The history of what we believed and when is itself evidence — it is how we learn whether our research is any good.
2. **Register it in `RESEARCH_INDEX.md` in the same edit.** An artifact that exists but is not indexed is invisible, and invisible evidence gets re-researched from scratch at full cost.
3. **Record the question, not just the answer.** Six weeks from now the answer will be ambiguous without it. "Window functions: 40%" means nothing; "Of 50 sampled SQL screening questions for 2-3 YOE India roles, 20 required a window function" means something and can be checked.

---

## 3. Confidence levels — what they actually mean

These are not vibes. Each has a test.

| Level | Test it must pass | How the curriculum may use it |
|---|---|---|
| **HIGH** | Multiple independent sources agree, **or** it is a primary source (official docs), **or** it is first-hand verified experience | May drive hour allocations directly |
| **MEDIUM** | Single credible source, or several sources that may share an origin | May drive allocation, but the citation must say "single-source" |
| **LOW** | Inference, extrapolation, or a plausible-sounding claim with no traceable origin | **May not drive hour allocations.** May inform ordering or emphasis only, and must be labelled |

**The honesty clause.** LOW is not a failure state and must not be avoided by inflating. A curriculum built on three HIGH facts and an honest LOW is trustworthy. One built on eleven MEDIUMs that are secretly LOW is the system we just replaced. When unsure between two levels, **pick the lower one.**

**Aggregation rule:** a claim assembled from multiple findings inherits the *lowest* confidence of its inputs. Confidence does not average upward.

---

## 4. Staleness — how fast each thing rots

This is the part most archives get wrong. They record a date and never define what the date means.

| Decay class | Applies to | Half-life | Re-research trigger |
|---|---|---|---|
| **FAST** | Interview question frequency, company-specific rounds, hiring-bar chatter, "what's hot in 2026" | **~3 months** | Older than 90 days → mark ⚠️ STALE in the index. Older than 180 days → **must not** drive allocations until refreshed |
| **MEDIUM** | Tooling/framework specifics, framework version behaviour, resource quality, URL liveness | **~9 months** | Older than 9 months → re-verify URLs and version claims before reuse |
| **SLOW** | Core topic inventories (what SQL *is*, what OS *covers*), retention science, first-principles material | **~3 years** | Re-check only on a specific contradiction |

**Why market data is set at 3 months and not longer:** interview practice tracks hiring conditions, and hiring conditions move in quarters. A frequency table gathered in a hiring freeze will systematically mislead you in a hiring boom, and it will do so *confidently*, because the numbers look identical either way. The date is the only thing that distinguishes them. **Never cite a market finding without its date visible in the citation.**

**Staleness is marked, not deleted.** A stale finding stays in the archive with a ⚠️ marker. It remains useful as a historical baseline — "this is what was true in July, here is what changed" is a better input than a fresh number with no prior.

---

## 5. Re-research triggers

Run a refresh of the relevant folder when **any** of these fire:

1. **Scheduled decay.** A FAST artifact crosses 90 days. Non-negotiable for anything driving hours.
2. **Contradiction from reality.** A real interview asks something the archive says is rare, or ignores something the archive says is guaranteed. **This is the highest-value trigger in the entire protocol** — it is the only one where the world corrects the archive rather than the archive predicting the world. Log the actual questions asked the same day, while memory is fresh.
3. **Target change.** New company, new tier, new role shape. Market findings are target-specific and do not transfer.
4. **A gate fails unexpectedly.** If preparation followed the plan and the gate still failed, suspect the evidence before suspecting the learner. Either the syllabus had a hole or the frequency data was wrong.
5. **A resource dies.** 404s discovered during use trigger a URL sweep of that subject's resource list.

**After every real interview, no matter the outcome, write a debrief into `market/`.** First-hand data is the highest-confidence input available and it is free. It outranks every blog post and aggregator in the archive. Do this within 24 hours; question memory decays faster than anything else documented here.

---

## 6. The citation rule (the binding one)

> **No curriculum claim may exist without a citation into this archive.**

Concretely, in `MASTER_CURRICULUM_2026.md`, `SUBJECT_ALLOCATION_TABLE.md`, and `COMPRESSION_PROTOCOL.md`:

- Every **hour allocation** carries a tag pointing to the archive artifact that justifies it.
- Every **ordering decision** (why X before Y) carries either a prerequisite argument or a citation.
- Every **"this is high frequency"** claim carries a citation with a date.
- Anything failing the above is written as **`[ESTIMATE — unsourced]`**, in plain sight, in the document itself.

**The `[ESTIMATE — unsourced]` tag is a feature.** It is not an admission of sloppiness — it is the mechanism that stops estimates from silently becoming facts. An estimate that is labelled can be upgraded later when evidence arrives; an estimate that is unlabelled becomes indistinguishable from evidence within about two weeks and can then never be found again. That is precisely how `retention_r: 0.9933` came to exist.

**Corollary — the reverse direction also holds:** if the archive is updated and a curriculum number depended on it, that number must be revisited in the same session. Citations are a two-way link, not a decoration.

---

## 7. What must never happen

A short list, stated plainly, because these are the specific ways this archive degrades:

1. **Never write a mastery, retention, or readiness number that was not measured.** If it was not assessed, it is `0` with `evidence_basis: "none — never assessed"`. Zero is honest. A plausible-looking number is not.
2. **Never delete a research artifact.** Supersede it.
3. **Never cite a URL that has not been fetched.** Mark it `UNVERIFIED-BY-FETCH` if it cannot be — bot-protected sites are legitimate resources, they just cannot be programmatically confirmed, and the reader deserves to know which is which.
4. **Never let two documents disagree about the same day.** One calendar. If a plan is superseded, it says so at the top of its own file, not merely by implication elsewhere.
5. **Never quietly raise a confidence level.** Upgrading MEDIUM → HIGH requires a new source, recorded.

---

## 8. Maintenance cadence

| When | Action | Cost |
|---|---|---|
| **Daily** | Nothing. The archive is not a daily chore. | 0 min |
| **Weekly** | During the light day: scan `RESEARCH_INDEX.md` for ⚠️ STALE markers. | 5 min |
| **After any real interview** | Debrief into `market/`. Non-negotiable. | 20 min |
| **Every 90 days** | Refresh FAST artifacts. | 1–2 h |
| **On gate failure** | Audit the relevant syllabus artifact for holes. | 30 min |

Deliberately light. **An archive with an expensive upkeep ritual gets abandoned, and an abandoned archive is worse than none** — it looks authoritative while being wrong. Five minutes a week and a debrief after each interview is the whole commitment.

---

## 9. Reading this archive later

If you are returning to this cold — months from now, or as a different agent — read in this order:

1. **`RESEARCH_INDEX.md`** — what exists, how fresh, how trustworthy.
2. **`RETENTION_ARCHITECTURE.md`** — the learning design everything else obeys.
3. **`market/`** — check dates first. Anything past 90 days, treat as a baseline, not a fact.
4. **`syllabus/`** — the topic inventories; these age slowly and are usually still good.
5. Only then **`../MASTER_CURRICULUM_2026.md`** — which should contain nothing that is not traceable to the above.

If step 5 contains something you cannot trace back to steps 2–4, **that is a bug in the curriculum, not a gap in the archive.** Report it rather than trusting it.

---

*The archive's job is to make the plan auditable by someone who was not there when it was written — including you, in six weeks, when you have forgotten why any of these numbers were chosen.*
