# Concept and subtopic granularity contract

## Decision

“All concepts and every fine-grained subtopic” is not a finite, source-defined set. A single feature may split into syntax, typing, runtime, memory, tooling, version, interoperability and pedagogy, and new variants continue to appear. The current release therefore closes a finite, auditable denominator of 200 stable concept IDs rather than claiming an unbounded universe.

## Required decomposition

Every promoted concept may expose these child dimensions as separate records or linked facets:

1. Problem and historical trigger;
2. semantic rule and formal model;
3. syntax and desugaring;
4. static enforcement and diagnostics;
5. runtime representation and cost;
6. interaction with memory, effects, concurrency, modules and errors;
7. FFI/serialization/deployment boundary;
8. version and implementation differences;
9. failure/counterexample;
10. worked trace, transfer task and delayed assessment.

The dimensions are a completeness checklist for a record, not a promise that every concept needs ten separate nodes. A facet becomes a stable node when it has a distinct problem or guarantee and independent evidence.

## Coverage states

The generated validator separates authored records from source-reviewed cells, expert review and assessment readiness. It also preserves deferred records outside the release. This prevents node count, page count or graph depth from masquerading as fine-grained coverage.

## Promotion gate

Before promoting a new subtopic, check for an existing concept ID, assign a relation type and version scope, attach diamond-source evidence, add a counterexample and update the inventory. If the item is only an implementation detail of an existing mechanism, retain it as a facet rather than inflating the denominator. This rule makes future expansion additive and reviewable.

