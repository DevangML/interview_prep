# Relation semantics (binding on all authored content and the graph builder)

| Field | Direction | Edge-bearing? | Rule |
|---|---|---|---|
| `empowered_by` | downward — what this USES | **YES — the primary edge source** | Must name a real implementation dependency, HOW it is used, and FOR WHICH SPECIFIC CASE. Verifiable against the implementation. |
| `inheritsFrom` | upward — what this IS-A-KIND-OF | YES, taxonomy edges only | Genuine generalization lineage only. Not "uses". |
| `specializesInto` | downward — narrower kinds of this | YES, taxonomy edges only | Inverse of inheritsFrom. |
| `empowers` | upward — what MIGHT be built on this | **NO — never build an edge from it** | Presumption. "GC empowers closures" is false as a dependency: Rust has closures with no GC. Prose only. |

The build script MUST refuse to emit edges from `empowers`. Enforced by `test_relations.py`.
