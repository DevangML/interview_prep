# Concept Atlas source spine

These are the primary or standards-oriented references used to shape the corrected contracts. A link in this spine does not mean every record has been independently reviewed; claim-level sources remain attached to records and unknown cells stay unknown.

| Area | Source | Use |
|---|---|---|
| Ownership and FFI | [Rust Book ownership](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html), [Rustonomicon FFI](https://doc.rust-lang.org/nomicon/ffi.html) | Ownership, resource boundaries and ABI-specific unwinding |
| Linkage | [Rust Reference linkage](https://doc.rust-lang.org/reference/linkage.html) | Dynamic/static artifact distinction and ABI correction |
| Type erasure | [Oracle Java type erasure](https://docs.oracle.com/javase/tutorial/java/generics/erasure.html) | Erased type parameters versus runtime class metadata |
| Effects | [OCaml effects tutorial](https://github.com/ocaml-multicore/ocaml-effects-tutorial) | Effect handlers and enforcement boundary |
| HTTP | [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html), [RFC 9111](https://www.rfc-editor.org/rfc/rfc9111.html) | Idempotency, cache semantics and release delivery |
| Distributed transactions | [AWS saga guidance](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/saga-orchestration.html) | Compensation, idempotency, isolation and observability |
| Backpressure | [Reactive Streams](https://www.reactive-streams.org/) | Demand signaling and bounded asynchronous queues |
| Graph UI performance | [React Flow performance](https://reactflow.dev/learn/advanced-use/performance) | Selective rendering and collapsed trees; no universal node ceiling |
| Spatial rendering | [R3F pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls), [R3F scaling](https://r3f.docs.pmnd.rs/advanced/scaling-performance) | Render-loop and device-budget considerations |
| Accessibility | [WAI-ARIA tree pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/), [WCAG reduced motion](https://www.w3.org/WAI/WCAG21/Techniques/css/C39.html) | Keyboard interaction, dynamic tree semantics and motion fallback |
| Learning evaluation | [Karpicke and Blunt](https://doi.org/10.1126/science.1199327) | Rationale for retrieval and delayed-transfer measures |

