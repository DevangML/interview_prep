# Offline-first on a warehouse floor: the write already happened

*Notes from building the sync layer for a warehouse operations app used by pickers, receivers and putaway operators. Written from work I did in 2024–25; specifics generalised.*

---

A picker scans a carton. The handheld shows nothing. The network is not slow — it is gone, because they have walked into an aisle where thirty feet of steel racking sits between them and the nearest access point. They are holding the carton. In four seconds they will put it on a pallet whether or not the software has an opinion about it.

That sentence is the whole problem, and it took me longer than it should have to understand why it makes warehouse software different from most offline-first work.

In a typical offline-capable app — a notes app, an email client — the safe fallback when you cannot reach the server is to refuse. Grey out the button, queue the intent, tell the user you will sync later. The user's world has not changed yet; nothing has happened that the software must now catch up to.

On a warehouse floor the ordering is reversed. **The physical event happens first and the software is the record of it.** The carton is on the pallet. The stock has moved. If the app refuses the write, it has not prevented anything — it has only guaranteed that its own record is wrong. You do not get to reject the operation, because the operation is not a request. It is a report.

Everything else about the design follows from that.

## Why queue-and-replay is not enough

The obvious model is a write-ahead log: capture each operation locally, hold it in a durable queue, replay it against the server when connectivity returns. We did that, and it is necessary. It is just not sufficient, and the reason is that warehouse operations are not commutative.

Consider two devices, in the same forty seconds, both offline:

- A putaway operator moves a pallet from staging to bay `A-12`.
- A picker, working from a list generated before that move, picks against the same pallet in staging.

Both operations succeed locally. Both are correct at the moment they are recorded — each operator did exactly what the physical world required. Neither device knows about the other. When the network returns, replay order decides what the system believes, and replay order is an accident of which handheld found an access point first.

This is not an edge case you can defer. On a busy floor, the window in which two people can touch the same stock is not rare, it is the normal condition. And the failure is silent: nothing errors, the numbers are simply wrong, and someone discovers it during a cycle count a week later.

The naive fixes are both bad. Last-write-wins is not a resolution strategy, it is a coin flip with extra steps. Locking is worse — you cannot hold a lock across a network partition on a device that may not reconnect for twenty minutes, and a lock that blocks an operator standing in front of a pallet is a lock that gets worked around with paper.

## What we chose, and what it cost

[[Describe your actual mechanism here — 2–3 paragraphs. What the client sent, what the server did with it, and how a conflict was detected and resolved. Be specific about the data: what identifies an operation, what makes replay safe, and who wins when two operations disagree.]]

The cost we accepted was [[name the tradeoff — e.g. eventual rather than immediate consistency for a defined window; or accepting every write and reconciling server-side, which means the client sometimes shows a state that is later corrected; or requiring operators to resolve certain conflicts by hand]].

I want to be plain about that, because it is the part most write-ups skip. There is no design here that gives you offline autonomy, correctness, and immediate consistency at once. You are choosing which one bends. What made the choice tractable was accepting the asymmetry above: since we could not refuse writes, the question was never *whether* to accept a conflicting operation, only *where* to resolve it and *who* found out.

## What surprised me

[[The most valuable section — write it yourself, in full. Something you got wrong first, or a failure that only appeared on real hardware in a real building. Candidates from your work: an assumption about reconnection behaviour that held in the office and not in a warehouse; a device-clock problem; a sync that worked until the queue got long; a conflict class you had not modelled.]]

The general lesson I took from it: **connectivity is not binary, and testing it as binary is how you ship a bug.** Airplane mode is a clean, instantaneous, symmetric loss of network. A warehouse gives you the opposite — an access point at the edge of range, a socket that is open but delivering nothing, a request that will neither succeed nor fail for ninety seconds. Our earliest failures were all in that middle state, and none of them reproduced on a developer's desk.

## What I would do differently

I would design the conflict taxonomy before the sync mechanism. We built the transport first and discovered the classes of conflict as they arrived, which meant each new class was a patch on a system that had not anticipated it. The better order is to enumerate the ways two operators can disagree — same stock, same location, same document, out-of-order state transitions — and let that catalogue determine what an operation needs to carry. The transport is the easy half.

I would also invest earlier in making sync state legible to the operator. Ours was largely invisible by design, on the theory that a warehouse worker should not have to think about distributed systems. That instinct was right, but it went too far: when something did go wrong, the operator had no way to tell whether their work had been recorded, and their reasonable response was to do it again. A quiet system is good. A silent one produces duplicates.

---

## Notes for Devang — before you post this

**Three slots to fill, marked `[[...]]`.** Two are technical facts only you have; the third — "what surprised me" — is the section that most demonstrates you actually built this. Write it in full, in your own words, even if the rest stays as drafted. If an interviewer probes one paragraph, it will be that one.

**Everything unmarked is domain reasoning, not invention.** The commutativity problem, the picker/putaway collision, the middle-state connectivity failure and the write-already-happened asymmetry are all objectively true of warehouse offline-first systems. You can defend them. But read every line and cut anything that does not match what you built — I wrote from the shape of the problem, not from your code.

**Confidentiality:** no client names, no app or service names, no schema, no client counts, no ElasticRun mention. The dateline says "2024–25" and "specifics generalised". Keep it that way.

**Before posting:** read it aloud once. Then cut the weakest paragraph entirely — there is always one, and the piece is stronger at 1,000 words than 1,300. Post as a private gist per their form, and send me the filled version if you want a line edit.
