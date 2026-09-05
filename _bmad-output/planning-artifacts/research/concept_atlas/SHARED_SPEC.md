# Concept Atlas editorial contract — revision 2

The canonical scope is **200 explicit concepts in 14 clusters**, with the26 language/family comparison columns in [scope.json](scope.json). This reconciles the earlier14/17 and per-cluster25–45 estimates. Counts are planning allocation, not evidence of mastery. See [generated inventory](generated/INVENTORY.md) for the actual denominator and stable IDs.

## Required concept record

Each record must include id, clusterId, name, problem, origin, mechanism, solutionFamily, languageSupport, costs, transferRule, confidence and sources. Additional required learning payloads: concrete examples/traces, counterexamples and an assessment prompt with rubric. JSON records in clusters/ are canonical; reader, inventory and matrix are generated projections. Origin distinguishes documented adoption from unsettled first invention. Do not attribute a person or year without evidence.

## Language comparison

All26 keys must occur. Each cell records status, mechanism, source URLs and versionScope. Unknown is a legitimate research state and excluded from substantiated support totals. Absence-by-design needs a design source; inability to find a feature is insufficient. Grouped labels qualify exact family members; a Clojure observation does not establish all Lisps. Same syntax is not proof of same semantics. Library support and encodings remain distinct from first-class support.

## Evidence

Use specifications, original papers, RFC/JEP/PEP/design records and official implementation documentation. Cite claim-specific pages or sections where possible. Sources establish the particular mechanism, not every adjacent statement. Confidence must distinguish mechanism evidence from historical-origin uncertainty. Preserve disputed claims as explicit open research; do not infer that public availability means editorial review is complete. Record source verification dates and access limitations.

## Relationships

Use typed edges: requires (under stated assumptions), enables, commonly-paired, influences, analogous-to, contrasts-with, prerequisite and contains. Only contains/prerequisite subgraphs require acyclicity. Every semantic edge needs conditions, counterexample/limit and source references. Analogy is not equivalence. No GC does not force borrowing; Rust chose ownership/borrowing to meet particular requirements. Serialization can be hand-written. Runtime/FFI boundaries change enforcement, not whether a semantic obligation is real.

## Acceptance

A complete record has a concrete problem, competing mechanisms, enforceable guarantee, cost, boundary counterexample, worked trace and transfer task. Record authorship, structural validation, source-supported cells and learner evidence separately. A successful JSON parse or node count must not be described as historical verification or demonstrated learning.

## Publication

Run scripts/build_atlas.py to validate source and generate the manifest, typed graph, inventory and matrix. Use scripts/validate_atlas.py for structural/evidence accounting and scripts/test_contracts.py for negative contract cases. Original specification is retained in the architecture archive.
