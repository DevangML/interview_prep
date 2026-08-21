# ElevenLabs — FDE (Software Engineer)

## "How did you know it worked? What did success actually look like?"

*(follow-up on the Campaigns package)*

---

### Submit this (226 words)

Honestly, proxy signals rather than one clean number — and I'd separate what I measured from what I didn't.

The first real signal was integration without me. When another app team pulled the package in and shipped a campaign without asking me a question, that told me the config schema and the integration path were legible on their own. A framework nobody can adopt unaided has failed regardless of how well it runs.

The second was the coupling breaking. Success was defined up front as a campaign change reaching users without an app release — and the day that happened it was binary and obvious. No code change, no store review, campaign live.

Third, the apps were instrumented with GA4, so campaign impressions and the in-app events campaigns matched against were observable rather than assumed. When something didn't fire we could tell whether the config was wrong or the event match was, instead of guessing.

The lagging indicator is the slowest and the most convincing: it's still in production two years on, across multiple apps, and it never generated a stream of support questions back to me.

What I didn't measure: whether campaigns actually converted better. That was the marketing team's number and I never tied my work to it. I'd do that differently now — a delivery framework should be able to prove that what it delivered worked, not just that it shipped.

---

## Notes for Devang

**The last paragraph is the whole answer.** Your own `GROUND_TRUTH.md` §8.5 says it: *"'I didn't measure that' — say it freely. It protects everything you did measure."* Most candidates answer a "how did you know it worked" question by retrofitting a number they never tracked. Naming the gap yourself makes the four signals above it credible. Do not cut it.

**The structure is deliberate: leading → lagging.** Adoption-without-help, then the release coupling breaking, then instrumentation, then two years of survival. That's how an engineer who thinks about measurement actually talks, and it reads very differently from "it was successful because it was widely used."

**"Integration without me" is the strongest line for this specific role.** An FDE's output is judged by whether the customer can run it after you leave. You have a real, unglamorous instance of that — use it.

**Verify before sending:** that the GA4 instrumentation genuinely covered campaign events. Your CV lists GA4 work in the same period and the same apps, but as a separate item from the Campaigns package. If the link is looser than I've written it, soften to "the apps were instrumented with GA4 around the same time, so campaign events were observable." Don't assert a tighter connection than existed.

**Also confirm** the "never generated support questions" claim — it's the kind of detail an interviewer will happily test with "really, none?". If there were some, say "very few" and you lose nothing.
