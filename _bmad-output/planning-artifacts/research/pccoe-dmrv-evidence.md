# Smallholder dMRV: technical and market evidence review

Research date: 8 September 2026. Scope: audit the supplied concept, refine an achievable hackathon project, and distinguish evidence collection from carbon certification. No field interviews, device benchmarks, verifier acceptance, or commercial quotations were performed. Budgets and test thresholds below are planning assumptions.

## Verdict

Keep the problem, substantially narrow the promise. Rename it **Smallholder Practice Evidence Desk: offline field records and assisted audit preparation for one FPO**. It can be a strong software entry; the event's physical finale is not evidence that hardware is mandatory. Its strongest demonstration is an adversarial evidence review with transparent failure states. The weak point is proving that an FPO/project developer actually needs this workflow and would pay for it—not absence of electronics.

Recommended default: an **agroforestry establishment and survival evidence workflow**, with a methodology eligibility screen for eligible afforestation/reforestation projects. Do not call every agroforestry activity CCTS eligible. If the team has an actual biochar producer partner with batch records, a **biochar batch-to-field custody tool** is a stronger alternative, mapped to a named voluntary standard rather than claiming CCTS compatibility.

## Claims that need correction

| Original claim | Evidence-led revision |
|---|---|
| Seven compliance sectors are live | Substantially supported as notified targets: Ministry of Power reports seven energy-intensive sectors and 490 obligated entities as of January 2026. This does not imply all credit trading/issuance workflows are complete, or that farmer offsets satisfy those obligations. [Ministry annual report](https://powermin.gov.in/sites/default/files/uploads/MOP_Annual_Report_Eng_2025_26.pdf). |
| Portal opened 21 March 2026 | Supported by contemporaneous government broadcaster coverage dated 21 March, describing inauguration of the portal that day. BEE's own post confirms a March launch. [Akashvani](https://newsonair.gov.in/union-power-minister-manohar-lal-inaugurates-prakriti-2026-carbon-markets-conference-in-new-delhi/), [BEE announcement](https://www.linkedin.com/posts/beeindiadigital_capacity-building-workshop-on-indian-carbon-activity-7488141285107826688-AFij). |
| Benchmark around $10/tCO2e | Remove as current benchmark. The identifiable source is a November 2024 expectation about an initial compliance price, not an observed farmer offset transaction or guaranteed realizable price. [S&P Global's original reporting](https://www.spglobal.com/commodity-insights/en/news-research/latest-news/energy-transition/110124-industry-sees-initial-carbon-credits-priced-around-10mtco2e-in-india). |
| Farmers excluded for one reason: no metrics | False as an absolute. Existing standards and farmer projects exist. Barriers also include aggregation, land/carbon rights, additionality, monitoring, risk, buyer access, contract fairness, and timing. Treat each as a customer-discovery hypothesis, not measured market fact. |
| Biochar or agroforestry evidence in CCTS-compatible format | BEE's accessed approved list includes non-wetland ARR BM FR05.002, rice AG04.002, and manure methane AG04.001; biochar is absent from that list. A broad agriculture sector listing does not approve every agricultural practice. No portal submission schema was verified; export an explicitly custom evidence package with a methodology crosswalk. [BEE methodologies](https://beeindia.gov.in/view_content.php?lang=1&lid=571). |
| Qwen3 1.7B validates photos offline | Incorrect model modality. Qwen3-1.7B is a text-generation causal LM; choose an actual vision model or lightweight trained classifier. [Official model card](https://huggingface.co/Qwen/Qwen3-1.7B). |
| Gemma 4 E2B is a phone vision option | Supported as a candidate: Google lists image support and edge deployment options. That is not evidence of adequate performance on the team's handset or this task. Measure RAM, latency, thermal throttling, download size and failure cases. [Google announcement](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/), [model card](https://ai.google.dev/gemma/docs/core/model_card_4). |
| NDVI corroborates staged biochar | Unsupported. NDVI represents green vegetation; it does not identify biochar mass, stable carbon fraction, or application authenticity. Rain, irrigation, fertilizer and crops also change greenness. Use cloud-masked Sentinel-2 only as contextual vegetation/change evidence. [Copernicus applications](https://sentiwiki.copernicus.eu/web/s2-applications). |
| Nugen confidence auto-approves carbon | Remove. Nugen advertises confidence indicators, not accredited carbon verification or application-specific calibrated fraud detection. Use grounded extraction and a review queue; humans retain consequential approval. [Nugen](https://nugen.in/), [API introduction](https://docs.nugen.in/introduction). |
| BOM ₹0 | Incremental custom hardware can be zero with existing phones. Hosting, training, field visits, data collection, support, sampling, verification and labor are not zero. |

The governing distinction is between industrial compliance and the offset pathway for non-obligated entities, whose projects must satisfy eligibility procedures. Portal availability is not a credit guarantee. [BEE framework](https://www.beeindia.gov.in/show_content.php?lang=1&level=1&lid=294&ls_id=189).

## Choose a practice before designing the app

**ARR/agroforestry evidence track.** BM FR05.002 covers afforestation/reforestation outside wetlands, with restrictions including soil disturbance in specified baseline conditions. It calls for baseline and additionality analysis, carbon stock estimation, leakage accounting and monitoring; a photograph of a planted tree is insufficient. The MVP can capture plot boundaries, permission/rights records, baseline land use, planting dates, species/stock records, tagged sample trees, survival observations, measurements and reviewer decisions. Keep carbon output unavailable until required inputs and methodology conditions are satisfied. Tree survival over weeks is a project implementation metric, not measured multi-year carbon removal. [Official methodology, version 1.0](https://beeindia.gov.in/sites/default/files/BM_FR05.002_Afforestation_and_reforestation_of_lands_except_wetlands.pdf).

**Biochar alternative.** Verra VM0044 v1.2 is globally applicable and active since June 2025; it includes investment analysis for additionality. The relevant workflow extends from waste feedstock through production to eligible end use, not merely farmer photographs. Track unique batches, dry mass, producer records, lab documentation, transport, splits/merges, custody and application. A judge can physically scan a bag and attempt to claim it twice. This is compelling only when real producer evidence is available; otherwise label the batch synthetic. [Current methodology](https://verra.org/methodologies/vm0044-biochar-utilization-in-soil-and-non-soil-applications-v1-2/).

Production emissions and material properties remain essential to biochar accounting. A camera cannot measure stable carbon content or replace testing. An educational calculator may show dry mass × organic carbon fraction × durable fraction × 44/12 minus applicable emissions, but it must identify the chosen method, inputs and omissions and must never display the result as issued credits. Biochar and soil-carbon claims can double count the same carbon if combined carelessly. [Verra monitoring and accounting FAQ](https://verra.org/methodologies-main/biochar-methodology-faqs/). The current v1.2 methodology controls if an older FAQ conflicts on additionality.

## Fraud resistance: what each control actually establishes

| Control | Helps with | Does not establish | Refined implementation |
|---|---|---|---|
| Fresh capture challenge and nonce | Simple reuse of an earlier submission | Physical truth, unstaged scene, trusted offline wall-clock time | Bind nonce to user/plot/event/media; use pre-issued one-time offline challenges and label their time uncertainty. |
| GPS inside polygon | Location plausibility | Ownership, plot consent, absence of spoofing | Store horizontal accuracy, boundary margin and anomaly flags; route borderline points to review instead of declaring fraud. |
| Hash chain | Detecting changes relative to a trusted commitment | Truth of the original image; prevention of rewriting an unanchored local chain | Sign/anchor manifests at sync, retain versions, server receipts and reviewer history. |
| EXIF | Auxiliary metadata | Trusted time/location | Preserve it but never treat it as authoritative. |
| Device attestation | Recognized app/device signals | That the photographed practice happened | Server-validate available verdicts at synchronization; do not claim fresh online attestation while disconnected. |
| Cross-farmer audits | Some errors and collusion | Comprehensive fraud elimination | Define random plus risk-based samples, audit independence, follow-up and appeal. |
| NDVI | Vegetation trajectory context | Biochar application, individual sapling survival, additionality, ownership or precise carbon | Cloud quality and date labels; missing observations remain unknown. |

Android describes Play Integrity as an app/device/request integrity signal, including request binding and replay resistance. This scope is narrower than real-world carbon verification. [Android documentation](https://developer.android.com/google/play/integrity/overview).

Offline capture should use an append-only event log with UUIDs and idempotent uploads. Conflicting land boundaries, mass allocations or reviewer decisions require explicit review; a generic conflict-free merge is unsafe for these semantics. Encrypt sensitive data, separate consent from carbon-rights contracts, restrict location access and support correction/appeal. These are engineering requirements for this proposed design, not a claim of audited compliance.

## Market and differentiation

The initial paying customer is more plausibly an FPO project team, implementation NGO, biochar producer or carbon project developer. Farmers are users and beneficiaries; a carbon buyer is not automatically the app buyer. Find out who currently assembles evidence, how long it takes, which verifier rejects it, and who controls the purchasing budget.

| Existing option | Primary-source evidence | Consequence |
|---|---|---|
| Varaha | Advertises smallholder projects including industrial biochar in Maharashtra's cotton belt, ARR and regenerative agriculture. [Varaha](https://www.varaha.earth/). | A locally relevant competitor/possible partner already spans farming and MRV. Do not pitch Maharashtra biochar digitization as untouched territory. |
| Boomitra | Describes farmer mobile workflows and digital MRV combining satellite imagery, samples and models; its India project page names VM0042 and independent verification. [India project](https://landing.boomitra.com/boomitra-carbon-farming-in-india), [science](https://boomitra.com/science-and-tech/). | The assertion that smallholders have no defined measurement route is untenable. Vendor outcome figures are not independently re-audited here. |
| Carbonfuture MRV+ | Offers end-to-end tracking and third-party certification support for durable carbon removal. [Product](https://www.carbonfuture.com/products), [FAQ](https://www.carbonfuture.com/faq). | Hashes, custody and audit packages are established product features. Differentiation must be usability, integration or evidenced cost reduction. |
| Existing forms/spreadsheets + messaging | Baseline to investigate directly with the partner, not verified as its current workflow. | If a simple structured form solves the pain, an LLM is not the product's value. |

Defensible niche: Marathi-assisted offline collection on a shared field agent phone, auditable evidence gaps, low-bandwidth sync, reproducible reviewer exports and explicit uncertainty. Validate through five farmer/field-agent sessions plus two developer/verifier interviews. Proposed success measure: lower evidence-preparation time and fewer missing fields without increasing unsupported approvals. These are targets for discovery, not achieved results.

Farmer economics must be stated as a waterfall: verified volume × realized price × farmer share, less farmer-incurred practice costs, fees and risk. Illustrative arithmetic only: 20 ha × 2 tCO2e/ha/year × ₹1,000/t = ₹40,000 gross/year before every deduction; none of those quantities is a forecast. At such scale, verification/aggregation arrangements matter more than free software. Measure willingness to pay per project or plot, not presumed income from a carbon market headline.

## Achievable MVP and test plan

Build one practice, one field agent workflow, one reviewer, 5–10 consented test plots initially. The proposed 20 plots is an expansion milestone, not prerequisite for a screen demo. Modules: local capture store; plot and rights record; evidence checklist with versions; object storage; duplicate detection; review decisions with reasons; CSV/JSON/media manifest export. Exclude credit trading, payment promises, auto-verification, all-practice quantification and unverified portal integration.

Use Nugen aligned-model inference for grounded extraction of field notes and identification of missing evidence, with source references and structured output. Keep deterministic checks authoritative for missing required fields and double allocation. Show model/version, actual API use, latency and trace on the demo/PPT. If offline, queue AI review and visibly show pending status. No confidence threshold can restore evidence that was never captured.

Adversarial test cases: replay the same media; submit a duplicate crop; alter EXIF; spoof or lose GPS; move outside/border of a plot; photograph a screen; submit another person's legitimate plot; delete/edit a record; reuse a biochar batch; interrupt and repeat sync; enter conflicting mass; omit a lab report; reject poor image quality; test Marathi names/numbers; induce cloud gaps; disconnect Nugen. A staged scene must remain potentially undetectable and explicitly require audit rather than claiming perfect rejection.

Pre-register a small held-out evaluation such as 30 clean and 30 manipulated submissions from different plots/devices, with exact counts and a confusion matrix, false rejection rate, review rate and latency. Do not interpret this small test as fraud certification. Compare the AI-assisted queue against a deterministic checklist baseline. Suggested engineering acceptance: no lost events in 50 interrupted/retried syncs; all byte-tampered bundles fail verification against anchored manifests; all deliberately missing mandatory fields enter review; no automated carbon approvals. Each is a test target, not a result.

Prototype planning allowance with existing phone/laptop: ₹0–2,000 hosting/storage, ₹500–2,000 labels/printing/data, ₹2,000–8,000 local field travel and onboarding; approximately ₹2,500–12,000 before labor, purchased phones, lab analysis or professional verification. Nugen credits/pricing must be confirmed through the event. This is an estimate rather than a sourced quotation. Biochar testing/producer records can dominate the real pilot cost and require partner-specific quotations.

For Stage 1, present problem evidence, a single practice and buyer, methodology boundaries, threat model and Nugen slide. For the November prototype, demonstrate offline-to-online evidence capture and tests with a real partner. For the January finale, show longitudinal implementation evidence and a reviewer-accepted export if obtained. Never fabricate a month of observations or disguise synthetic records.

## Refined pitch

“Smallholder Practice Evidence Desk helps an FPO collect complete, tamper-evident field records offline and prepare them for human review. We start with agroforestry establishment and survival tracking, flag missing evidence in Marathi, and preserve an auditable record of every decision. We measure time saved and evidence quality; carbon eligibility and credit issuance remain with the applicable methodology and accredited process.”

Proceed if there is a named field partner and a reviewer willing to evaluate the export. Without that access, this is technically buildable but commercially unvalidated. Do not rank it last merely because it is software, and do not attach it to unrelated heat, leak or biodiversity projects as a universal route to carbon revenue.

## Ruflo evidence

Route: `mcp__ruflo__hooks_route` recommended codex, confidence 0.7, keyword fallback. Store: `learnings/pccoe-dmrv-20260908`, success with 384-dimensional embedding. Recall: `mcp__ruflo__memory_search`, same key returned at similarity 0.713. Applied: corrections and narrow MVP in this file. No application source code changed; ARGUS code-change checks were not applicable to this research note.
