## Cluster: identity-equality

Status: authored, primary-source anchored; language-matrix and historical research remain explicitly incomplete. These are worked reasoning examples, not reported executed experiments.

Each JSON record is the canonical lesson: problem, mechanism, alternatives, cost, concrete trace, counterexample and transfer assessment. Unknown cells make no support or absence claim. Grouped-family claims identify the member actually evidenced. Version scopes are documentation snapshots checked 2026-09-05, not certification of every release.

| Concept | Problem and transfer task |
|---|---|
| [Reference identity](reference-identity.json) | A graph algorithm must distinguish two different nodes that happen to contain equal data. Transfer: A cycle detector keys visited nodes by a value-equality record. What goes wrong for distinct equal-valued nodes? |
| [Structural equality](structural-equality.json) | Independent values representing the same data should compare equal without sharing an allocation. Transfer: A record adds a memoized rendering cache. Should a derived equality automatically include it? |
| [Equality equivalence laws](equivalence-laws.json) | A set's deduplication behavior becomes incoherent when equal is not reflexive, symmetric and transitive. Transfer: If close(a,b) means distance below1, test a=0,b=0.75,c=1.5 as a set equality. |
| [Equality and hash consistency](hash-contract.json) | A hash table can fail to find an equal key when the equality and hash policies disagree. Transfer: You make email comparison case-insensitive. What must change in the hash function? |
| [Mutable hash keys](mutable-keys.json) | A key changes after insertion and no longer hashes or compares as it did when assigned a bucket. Transfer: A user changes displayName while stored in a map keyed by user object. Determine whether this is safe. |
| [Total ordering](total-order.json) | A sorted index needs consistent ordering between every pair and agreement between ordering and equality. Transfer: Design ordering for events with equal timestamps and distinct IDs. |
| [Floating-point exceptional equality](floating-equality.json) | Scientific values include NaN and signed zero, so ordinary equal and total sortable order answer different questions. Transfer: A telemetry index must sort all samples including NaNs reproducibly. Which comparison should its key wrapper define? |
| [Coercive equality](coercive-equality.json) | Inputs arriving as strings and numbers invite convenient comparisons but can silently change types during comparison. Transfer: A permission value arrives as '0'. Would truthiness and loose equality provide the same validation policy? |
| [Same-value collection equality](same-value.json) | A map must decide whether NaN and signed zero identify one key or several. Transfer: Port a Set-based deduplicator to a language whose floats lack lawful Eq. How will you handle NaN and zero? |
| [Unknown and NULL comparison](null-equality.json) | A missing database value cannot safely be treated as an ordinary known value in every predicate. Transfer: A change detector compares nullable old/new fields. How do you avoid missing transitions involving NULL? |
| [Interning and canonical representatives](interning.json) | Repeated equal strings waste storage or repeated comparison effort, but arbitrary object identity is not value equality. Transfer: A parser compares identifier strings frequently. How can interning help without making correctness depend on accidental pooling? |
| [Unicode canonical equivalence](unicode-equivalence.json) | Visually matching text can use different code-point sequences and fail a direct string comparison. Transfer: Two user names look identical but compare unequal. Design a comparison policy without collapsing every visual confusable. |
| [Stable entity identity](entity-identity.json) | A database row moves or is replaced, yet clients need a durable identifier for the same business entity. Transfer: A sync protocol stores ctid as the remote item identifier. What fails after updates and what should replace it? |
| [Custom comparison protocols](custom-comparison-protocol.json) | A domain type needs ordering without implementing each relational operator independently and inconsistently. Transfer: A rank class gets total_ordering but mixed-type comparisons fail. Where should the correction be made? |

## Cross-cluster forcing functions
All relationships are conditional. Mutation permissions constrain equality and caching; representation choices constrain FFI; surface syntax can hide sequencing. These are constraints or teaching analogies, not universal necessity chains. Consult each record's counterexample before drawing a dependency edge.

## Open questions / contested history
First inventor/year is unresolved unless separately established. A specification proves semantics in its stated scope, not historical priority. Unknown canonical-language cells remain a research backlog; the populated denominator must not be reported as verified coverage.

## Workflow evidence
Ruflo hooks_route completed. Learn: inspected shared specification and own-claims review, then primary sources. Stored and recalled learnings/atlas-mutability-equality-linkage-syntax-2026-09-05 before authoring. Applied here and in this folder's concept records.
