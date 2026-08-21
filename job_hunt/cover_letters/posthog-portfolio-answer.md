# PostHog — "Have you built anything with LLMs, agents, MCPs, or context pipelines?"

**Devang Manjramkar** · Draft answer for the Context Engineer application

---

Yes — one production system at work, and one I built for myself that got out of hand in a useful way.

## The production one: a contract a machine could author against

At ElasticRun I built the Campaigns package, a config-driven ad-campaign framework used across our Flutter apps. It ingests JSON configuration from a Frappe backend, compiles it into typed domain objects and local tables, matches campaigns against runtime events, and renders through self-rendering widgets. It shipped across the app ecosystem and is still in production years later.

**Goal:** stop shipping a release every time marketing wanted a different banner.

**What I actually built,** which I only understood later: a structured contract where the spec *is* the executable. Nobody writes campaign code — they author config, and the config is the program. That's context engineering. I didn't have the vocabulary for it until I started working with agents and recognised the same shape.

**What I learned:** the hard part was never the renderer. It was designing a config schema that a non-engineer could author *correctly*, where the failure modes were legible. Exactly the problem an agent-facing interface has, with a slower feedback loop.

## The one that got out of hand: a self-healing prep system

I'm 2 years in, interviewing upward, and I decided not to study from a static plan. So I built a control loop:

```
SENSE ──► COMPARE ──► DIAGNOSE ──► ADAPT ──► (next day)
 daily     plan vs      why the      re-plan
 log       actual       drift?
   ▲                                        │
   └──── 30-day boundary → ROLLOVER ◄───────┘
```

A six-field nightly log is the sense organ. An agent reads it, compares against plan, diagnoses drift, and re-sequences tomorrow. At a 30-day boundary it banks what's mastered, carries what's shaky, and recalibrates against my *actual* velocity rather than my intended one. Spaced repetition, interleaving, and a leech rule (fail an item 3× → change the resource, don't grind) are encoded as invariants the planner has to satisfy.

Around it I built:

- **A portable "genesis kit"** — a forge that interviews a new user and generates their entire personalised system from templates, then **deletes the templates**, so what remains is a clean one-of-one system with no scaffolding. Nothing about the user is hardcoded; the interview is the only source of truth.
- **Custom MCP servers**, plus integration and debugging of others, wired into a job-sourcing pipeline that runs two disjoint sourcing tools in parallel and reconciles their rankings.
- **Skill-assembly and context-delivery pipelines** — assembling the right instructions for the right agent at the right moment, which I gather is roughly what you call the context mill.

### What worked

**Configuration over assumption.** The rule that nothing about the user is known until asked. Every time I violated it and hardcoded a default, the system produced something confidently wrong.

**Making the agent orchestrate rather than monologue.** Delegating real construction to named subagents that message each other beat one long prompt, decisively — mostly because failures became localised and legible instead of diffuse.

**Deleting the scaffolding.** Counter-intuitive, and the single biggest quality win. Leftover templates poison later context: the agent reads them and can't tell instruction from artefact.

### What failed

**My first 30-day plan was strategically smart and interview-mechanically useless.** I ran a gap analysis against an external, resume-anchored plan and found five real misses — an entire missing interview track for my primary stack, absent coverage of technologies literally on my CV, and a system-design scope calibrated for companies I wasn't applying to. My system optimised the thing it could measure and quietly dropped the thing that mattered. I merged the two plans rather than defending mine.

**I let background agents run on a timer.** Interval workers each spawning a headless session, burning tokens continuously for sweeps nobody read. I now treat autonomous agent cadence as a budget question first.

**I over-trusted agent reports.** Subagents returned confident summaries that didn't survive checking. I stopped taking them at face value and started verifying the artefact, not the report.

### What surprised me

**Most agent failures are context-delivery failures, not capability failures.**

The sharpest example happened while I was building the job pipeline. Two MCP servers appeared completely dead — the tools simply weren't there. I assumed a broken server, a bad Docker image, a crashed process. All wrong. Both servers were perfectly healthy: I probed them over stdio and they returned their full toolsets on demand. The actual cause was a single empty approval array in a config file. The capability existed, was running, and was invisible to the agent that needed it.

That reframed the whole discipline for me. I'd been thinking about context engineering as *writing better instructions*. It's closer to plumbing: the model is rarely the bottleneck, and "the AI can't do this" is usually "the AI can't see this." The second surprise followed from the first — the fix wasn't a smarter prompt, it was a five-line probe script that made the system's actual state observable. Most of my best context work since has been building that kind of instrument rather than writing more words.

---

## Notes for Devang — read before submitting

**Honesty guardrails — do not blur these:**

- **BMad and bmad-loop are third-party frameworks.** You adopted, configured, integrated, and promoted them; you did not author them. The draft above never claims otherwise — keep it that way. The genesis kit's contribution is *assembly and personalisation*, and that's a real contribution, worth more than an inflated one you'd get caught on.
- **The MCP debugging story is literally what happened this week.** That's why it's the best material here — you can answer any follow-up because you lived it.
- The Campaigns package "still in production" claim — confirm it's still true before sending.
- Check ElasticRun is fine with the Campaigns architecture being described publicly.

**Why it's shaped this way:**

- They asked four questions (goal / worked / failed / surprised) and most applicants will answer one and a half. Answering all four, with the failures specific enough to be embarrassing, is the differentiator.
- The failure section is the strongest part. "My own system optimised what it could measure and dropped what mattered" is a real engineering lesson, not a humblebrag.
- The closing insight — context engineering as plumbing and observability, not prose — is the thesis of the role. Ending there is deliberate.

**Attach:** the genesis kit, the MCP servers, and the adaptive-system spec. They asked for a portfolio with goals, outcomes and learnings — the artefacts alone won't satisfy that, the write-up is the point.
