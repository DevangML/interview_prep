## Cluster: mutability-aliasing

Status: authored, primary-source anchored; language-matrix and historical research remain explicitly incomplete. These are worked reasoning examples, not reported executed experiments.

Each JSON record is the canonical lesson: problem, mechanism, alternatives, cost, concrete trace, counterexample and transfer assessment. Unknown cells make no support or absence claim. Grouped-family claims identify the member actually evidenced. Version scopes are documentation snapshots checked 2026-09-05, not certification of every release.

| Concept | Problem and transfer task |
|---|---|
| [Binding immutability](binding-immutability.json) | A configuration name must not accidentally point at a replacement object midway through a computation. Transfer: A new language offers final bindings. Can a final list safely be shared without synchronization? |
| [Read-only views](read-only-view.json) | An API should let consumers inspect a registry without granting them its mutation methods. Transfer: A cache returns a read-only mapping; a caller requires repeatable reads across two operations. What additional mechanism is needed? |
| [Shallow object freezing](shallow-freeze.json) | Plugin code must not replace top-level configuration properties, but freezing an arbitrary cyclic object graph is a larger policy decision. Transfer: Design a configuration handoff with nested arrays. Is root freezing enough to prevent consumers altering future reads? |
| [Shared aliases](aliasing.json) | Two names referring to one mutable object let a distant update change a local assumption. Transfer: An unfamiliar language copies handles on assignment. Trace a field write and then handle replacement through the second handle. |
| [Exclusive mutable borrowing](exclusive-borrow.json) | An update must not coexist with another active access path that could observe invalid intermediate state. Transfer: Two routines need to update disjoint halves of a buffer. Must you clone it to satisfy exclusivity? |
| [Interior mutability](interior-mutability.json) | A shared handle needs to update controlled internal state without exposing arbitrary mutable access to the whole object. Transfer: A memoizing object exposes only shared methods. Explain how it could mutate safely and which evidence is still needed. |
| [Dynamic borrow checking](dynamic-borrow-checking.json) | A graph's access order is valid at runtime but cannot be expressed conveniently as static borrows. Transfer: An event callback reenters code while a mutable guard is held. Predict behavior and propose a safer lifetime. |
| [Copy on write](copy-on-write.json) | Most consumers read data, so eagerly copying every borrowed value wastes work, but one consumer may need an independent update. Transfer: An image editor keeps ten previews and changes one. Explain when copy cost is paid and what to measure. |
| [Persistent data structures](persistent-structures.json) | Undo and concurrent readers need old versions to remain usable after an update. Transfer: Choose between persistent vectors and a copied array for frequent snapshots with sparse updates. |
| [Shallow and deep copy](shallow-deep-copy.json) | A top-level duplicate can still share mutable children and fail to isolate a draft from its original. Transfer: A document contains the same node twice and a cycle. What must a correct deep copier preserve? |
| [Value semantics](value-semantics.json) | Changing one local value should not unexpectedly mutate another independently assigned value. Transfer: A struct-based order includes a mutable reference-based address. Does copying the order isolate address edits? |
| [Mutex-guarded mutation](mutex-guarded-mutation.json) | Several threads must update one compound invariant without interleaving its intermediate steps. Transfer: A transfer updates two accounts. How do you avoid both inconsistent totals and opposite-order deadlock? |
| [Atomic updates](atomic-update.json) | Concurrent read-modify-write of one counter can lose increments even when reads and writes individually complete. Transfer: A flag announces that a buffer is ready. Why is an atomic flag alone insufficient without an ordering protocol? |
| [Transient collection builders](transient-builders.json) | Repeated persistent updates during a private construction phase can pay avoidable allocation costs. Transfer: A batch importer builds a large immutable index. Explain where a transient may help and where it must stop escaping. |

## Cross-cluster forcing functions
All relationships are conditional. Mutation permissions constrain equality and caching; representation choices constrain FFI; surface syntax can hide sequencing. These are constraints or teaching analogies, not universal necessity chains. Consult each record's counterexample before drawing a dependency edge.

## Open questions / contested history
First inventor/year is unresolved unless separately established. A specification proves semantics in its stated scope, not historical priority. Unknown canonical-language cells remain a research backlog; the populated denominator must not be reported as verified coverage.

## Workflow evidence
Ruflo hooks_route completed. Learn: inspected shared specification and own-claims review, then primary sources. Stored and recalled learnings/atlas-mutability-equality-linkage-syntax-2026-09-05 before authoring. Applied here and in this folder's concept records.
