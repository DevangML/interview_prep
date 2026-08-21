# ElevenLabs — FDE (Software Engineer)

## "What's the most impactful thing you've built? What was your specific contribution?"

---

### Submit this (219 words)

The Campaigns package — a config-driven ad-campaign delivery framework for our Flutter apps. Before it, changing a campaign meant a code change and an app release, so marketing moved at the speed of the store review queue.

I built it during my internship, end to end. It ingests JSON configuration from the Frappe backend, compiles it into typed domain objects and local database tables, matches active campaigns against runtime in-app events — screen visits, user actions — and renders them through pre-configured self-rendering widgets. My specific contribution was the whole package: the config schema, the compile step, the event-matching logic, the widget layer, and the integration path other teams used to adopt it.

The impact isn't the code, it's what the code removed. Campaign changes stopped being engineering work at all. It was adopted across our mobile app ecosystem and is still in production two years later, long after I moved to other teams — which is the part I'm actually proud of. Nobody has had to call me about it.

What I'd do differently: I designed the schema for the campaign types we knew about, so each genuinely new type needed a small extension. I'd invest earlier in making the schema itself extensible. The failure mode of a config-driven system is that the config quietly grows a dialect.

---

## Notes for Devang

**Why this one over the warehouse app.** The Field App is bigger, but you *contributed to* a team rebuild — and this question explicitly asks for your **specific contribution**. Campaigns is the one where the honest answer is "all of it". Don't pick the more impressive-sounding project and then have to hedge on ownership; that's the exact trap the second half of the question is set to catch.

**It also reinforces your "why now" answer** rather than repeating it. There you used Campaigns in one line to make the integration-seam point; here it gets the depth. Same story, consistent, told at two resolutions.

**The last paragraph is deliberate.** Volunteering a real design limitation signals seniority far more than another achievement would, and it's genuinely true of every config-driven system. It also pre-empts the obvious follow-up. Do not cut it to save words.

**Verify before sending:** that it's still in production, and which apps specifically adopted it. I wrote "across our mobile app ecosystem" rather than naming Sales/Customer/Field/Courier, because your CV wording ("still in production in several of them") is softer than a named list. If you can confirm the exact apps, naming them is stronger.

**If asked to go deeper in interview,** the richest thread is the config schema — how you decided what belonged in config versus code. That's the same judgement an FDE makes when deciding what a customer can configure themselves versus what needs engineering.
