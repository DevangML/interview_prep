# Source-quality audit

Release: `2026-09-05.1`

This audit separates source quality from source possession. A local hash proves
that a snapshot is present; it does not prove that a claim follows from it.

## Canonical atlas records

The 200 canonical records cite 40 unique source URLs across 10 maintained domains, all maintained specifications,
official reference manuals or primary project documentation:

| Source family | Domains |
|---|---|
| Language/runtime specifications | `tc39.es`, `doc.rust-lang.org`, `docs.python.org`, `go.dev`, `ocaml.org`, `llvm.org` |
| Standard-library and platform references | `docs.oracle.com`, `www.postgresql.org`, `www.swift.org`, `clojure.org` |

The 32 non-`unknown` language cells point to those sources. They have source
URLs and a declared mechanism, but they remain `first-class` or `partial`
claims until a reviewer records the relevant section and version boundary.

## Background research

The local archive contains 104 URLs because the architecture and research
notes also contain background material. Those notes include surveys, vendor
guidance, blogs, forums and encyclopedic pages. They are retained for
provenance and discovery, but they are not diamond evidence for a canonical
mechanism or historical-origin claim. The release source policy requires a
normative specification, standard, official maintainer reference, peer-reviewed
paper or designer-authored history for promotion.

## Current verification result

* Schema, required fields, cluster counts, language columns, graph endpoints,
  acyclicity rules, primary-source allowlist and source hashes pass automated
  validation (`primarySourceStatus=pass`, `primarySourceCount=40`).
* Semantic claim review is not complete: 5,168 language cells are explicitly
  `unknown`, and all 200 historical-origin fields are low-confidence defaults.
* No record is marked expert-reviewed or assessment-ready by automation.

The truthful status is therefore **source-quality compliant for the asserted
canonical cells, source-archived for the 104 cited URLs, and not fully
claim-verified**. Promotion to a full evidence yes requires claim-level
locators, version scope, expert review and a transfer assessment for each
published record.
