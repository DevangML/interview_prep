# CS Museum

CS Museum is a portable, evidence-led concept atlas and React reader. The corpus is shipped inside this folder so the UI can be rebuilt from a known data release.

Start here:

1. Read [`PROJECT-CONTEXT.md`](PROJECT-CONTEXT.md).
2. Read [`corpus/concept_atlas/COMPLETENESS-CONTRACT.md`](corpus/concept_atlas/COMPLETENESS-CONTRACT.md) and [`corpus/concept_atlas/SOURCE-QUALITY-AUDIT.md`](corpus/concept_atlas/SOURCE-QUALITY-AUDIT.md).
3. Sync browser assets: `python3 scripts/sync_corpus_to_app.py`.
4. Run the app: `cd app && npm install && npm run dev`.

From the project root, `npm test`, `npm run lint`, and `npm run build` run the standalone app checks. `app/node_modules/` and `app/dist/` are local build outputs and are ignored.

The release is deliberately honest: 200 concepts, 14 clusters, 26 language/family columns, 5,200 language cells, 104 archived source snapshots, and 40 canonical primary/official URLs. Unknown and partial cells remain visible so the reader can answer what is present, how it is supported, and what is left to research.
