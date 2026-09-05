# Corpus to UI transformation boundary

`corpus/concept_atlas/` owns the meaning. The browser receives a generated copy of `generated/manifest.json`, `coverage.json`, `index.json`, `graph.json`, and one JSON chunk per cluster. `app/src/lib/csMuseumCorpus.ts` owns the only supported read boundary.

The adapter performs four safe transformations:

1. Resolve a manifest chunk path and fetch it on demand.
2. Index records by stable concept ID for selection and search.
3. Compute evidence-tier authority metadata from the record's cited source hosts.
4. Project the record into an evidence envelope without changing its claims.

It does not rewrite corpus prose, infer that `unknown` means absence, or silently widen the release scope. A future API or R3F view can replace the delivery copy while keeping the same adapter contract.
