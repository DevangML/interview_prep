# Relation semantics (binding on all authored content and the graph builder)

| Field | Direction | Edge-bearing? | Rule |
|---|---|---|---|
| `empowered_by` | downward — what this USES | **YES — the primary edge source** | Must name a real implementation dependency, HOW it is used, and FOR WHICH SPECIFIC CASE. Verifiable against the implementation. |
| `inheritsFrom` | upward — what this IS-A-KIND-OF | YES, taxonomy edges only | Genuine generalization lineage only. Not "uses". |
| `specializesInto` | downward — narrower kinds of this | YES, taxonomy edges only | Inverse of inheritsFrom. |
| `empowers` | upward — what MIGHT be built on this | **NO — never build an edge from it** | Presumption. "GC empowers closures" is false as a dependency: Rust has closures with no GC. Prose only. |

The build script MUST refuse to emit edges from `empowers`. Enforced by `test_relations.py`.

## Directly researched tower content

`bedrock_tower.json` is the canonical copy of the manually researched tower; its delivery copy is `app/public/data/tower.json`. Keep these copies identical when editing directly. The application no longer invokes the placeholder-generating `compile_ontology.py` through `predev` or `prebuild`. Running that generator manually still replaces the delivery data and must not be used to publish this authored content.

An entry's `details.verification` records its checked scope, date and sources by claim field. `verified` applies only to that stated scope; it does not imply exhaustive historical or implementation coverage. `partial` retains unresolved evidence gaps. `lectures` holds learning resources and does not substitute for corroborating factual evidence. These metadata fields are stored in the data; the current reader does not yet render all of them.
