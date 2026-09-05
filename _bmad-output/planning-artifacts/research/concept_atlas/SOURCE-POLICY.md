# Source-quality and local-possession policy

## Source hierarchy

For a technical mechanism, prefer a normative language specification, standard, official reference manual or primary implementation documentation. For historical origins, prefer a peer-reviewed original paper, ACM SIGPLAN HOPL paper, design archive or designer-authored retrospective. For security, protocol and accessibility behavior, prefer the standards body or responsible maintainer. Surveys and vendor material may describe adoption or benchmarks but cannot establish semantics alone. Blogs and online gurus are leads, not diamond evidence.

## Claim-level requirements

Every asserted mechanism, deliberate omission, origin, version behavior and performance number records its own URL, locator/section when available, access date, confidence and dispute note. One source can support one claim and fail to support an adjacent claim. “Official” does not mean “historically first,” and a downloaded snapshot does not mean independently reviewed.

## Local archive

`source-manifest.json` records every unique URL currently cited by release records, its local path, byte count and SHA-256. The download script archived 40/40 URLs. `validate_atlas.py` checks that each manifest file exists and its hash matches. Re-run the downloader when sources change; retain old manifests for reproducibility. No source is silently replaced in place without a new hash and release version.

## What remains open

The current release has 5,168 unknown language cells and 200 low-confidence historical-origin defaults. These are not failures of the archive; they are unreviewed claims. Promote them only after an expert reads the source and records the relevant locator. Do not claim “all data verified” until the ledger has zero unknown asserted-support cells and every published claim has a review record.

