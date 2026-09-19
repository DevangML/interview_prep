---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments: []
workflowType: 'research'
lastStep: 6
research_type: 'technical'
research_topic: 'PCCOE IGC four climate hackathon ideas'
research_goals: 'Audit every supplied proposal, correct claims, refine scope, and rank event fit'
user_name: 'Devang'
date: '2026-09-08'
web_research_enabled: true
source_verification: true
---

# Research Report: technical

**Date:** 2026-09-08
**Author:** Devang
**Research Type:** technical

---

## Research Overview

Scope: all four supplied ideas, Pune/PCMC entry market, official PCCOE IGC event, scientific validity, architecture, meaningful AI, competitors, users and buyers, prototype economics, evaluation design and refined pitches. User supplied the event URL during research. Team skills, budget and field access remain unspecified.

This is a desk-research assessment, not evidence of built hardware, field trials, interviews, regulatory approval or customer commitments. Proposed targets and costs are explicitly estimates. Current findings follow; final synthesis will distinguish verified facts from recommendations.

---

## Scope and execution basis

Both BMAD customizations resolved successfully; no prepend/append steps, no matching project-context.md files. English config applied. The supplied request authorizes the complete four-topic review and corrections; routine step confirmations are consolidated into that scope. Technical skill step 2 authorizes parallel specialist research.

## Verified event constraints

PCCOE publishes a September 10, 2026 idea deadline, November 15 prototype video deadline and January 2027 physical finale. Stage weights are 30% idea, 30% prototype, 40% finale. See [official timeline](https://www.pccoeigc.com/timeline). Teams are 2–5; no fixed PPT format is prescribed in the [FAQ](https://www.pccoeigc.com/faqs). The [registration form](https://www.pccoeigc.com/registration2026) requires a PPT exported as PDF and combined participant IDs, each at most 5MB; NOC is for subsequent rounds.

The [prize terms](https://www.pccoeigc.com/prizes), checked in the rendered official page, require a Nugen-use slide and actual inference through Nugen aligned models for any prize. None of the reviewed pages establishes a hardware requirement. All four concepts fit [listed topics](https://www.pccoeigc.com/topics). These are current published requirements, not a guarantee that later finalist instructions will be identical.

## Executive technical synthesis

The main engineering problem is the chain from sensor/evidence to justified action. Each original proposal skips a link: estimated temperature becomes personal safety; acoustic class becomes flow; calling activity becomes ecosystem health; tamper evidence becomes carbon verification. Repairing those links produces smaller and stronger prototypes.

Recommended topology is a local operational core plus asynchronous cloud assistance. Use one existing laptop/phone as gateway where possible. Do not require a mesh, Kubernetes, multiple services, a foundation model on every device or a custom PCB to demonstrate the hypothesis. These are design recommendations for the proposed scale, not comparative performance benchmarks.

### Contents

1. Measurement and inference contracts
2. Technology choices and alternatives
3. Integration and storage
4. Meaningful AI and aligned-model evaluation
5. Performance, power and budget
6. Security and domain boundaries
7. Implementation and validation gates
8. Evidence appendices and limitations

## 1. Measurement and inference contracts

| Product output | Minimum evidence needed | What must remain unavailable without it |
|---|---|---|
| WBGT-based advisory | Validated environmental measurement, named policy/version, workload and clothing/acclimatization assumptions, timestamp and quality | Individual dehydration, medical diagnosis, exact safe work duration |
| Leak-like event | Sensor attachment, signal-quality checks, tested detection procedure and declared pipe/pressure envelope | Universal leak location and volume |
| Water loss or recovery | Independent metering/timed volume, uncertainty, baseline and operating context | Realized energy savings or certified carbon reductions |
| Target-species detection | Audio evidence, appropriate model, local labels, threshold and review status | Species absence, individual counts or total biodiversity |
| Restoration effect | Comparable repeated surveys and credible counterfactual with ecological design | Causal programme outcome from a short acoustic trend |
| Farmer practice record | Identified plot, rights/consent evidence, dated events, method-specific records and integrity history | Carbon eligibility/issuance from GPS/photos/hashes alone |

The input-validity state must be distinct from the inference label. “Sensor unavailable” cannot become “safe,” “no leak,” “no birds,” or “verified.” This is a proposed invariant for every implementation.

WBGT formulas and the natural-wet-bulb distinction are documented by [OSHA](https://www.osha.gov/otm/section-3-health-hazards/chapter-4). [ISO 7243](https://www.iso.org/standard/67188.html) gives the screening scope; the public abstract does not supply all implementation details. For water, the [World Bank specification](https://ppp.worldbank.org/sites/default/files/2024-09/water%20-%20performance%20based%20leakage%20reduction%20and%20management%20services%20Bid%20doc%20sanitized.pdf) treats flow, legitimate demand and pressure as separate evidence. Original claims are itemized in the appendices.

## 2. Technology choices and alternatives

| Area | Recommended first implementation | Alternative/stretches | Decision criterion |
|---|---|---|---|
| Heat sensing | Shared validated reference/station with simple ESP32 badges | Characterized small-globe or validated waterless estimator | Paired accuracy and settling results, not apparent precision on screen |
| Heat workload | Supervisor-selected category | Accelerometer classifier | Does it improve the decision on unseen people/tasks without unsafe down-classification? |
| Water acquisition | Piezo + bias/preamp/filter + supported ADC path | External I2S audio ADC; high-bandwidth accelerometer | Signal-to-noise, clipping, repeatable mounting and budget |
| Water classifier | Spectral persistence baseline then small supervised model | Tiny CNN/GBM or dedicated NPU | Held-out event-level advantage and embedded memory/runtime fit |
| Bio recorder | Scheduled SD recording, laptop batch inference | Embedding-only export on stronger edge hardware | Exact supported export, RAM and sustained runtime |
| Bio classifier | Pretrained suggestions or embeddings plus linear multi-label head | MLP after sufficient data | Per-species precision/recall on local held-out recordings |
| Field app | Structured forms, append-only events, reviewer queue | On-phone vision if independently useful | Failed capture/review reduction on actual phones |
| Marathi alerts | Reviewed prerecorded audio | TTS for dynamic output; ASR for optional input | Comprehension, offline reliability and device budget |
| Nugen | Aligned model for grounded workflow assistance | Model alignment refinement after baseline | Actual inference, task evaluation and refusal of unsupported conclusions |

[IndicConformer](https://github.com/AI4Bharat/IndicConformerASR) is ASR, so it does not synthesize worker messages. “Available offline” at the model level does not establish microcontroller or phone deployment performance. [Qwen3-1.7B](https://huggingface.co/Qwen/Qwen3-1.7B) is text-only; [Gemma 4](https://ai.google.dev/gemma/docs/core/model_card_4) has relevant multimodal variants, whose phone performance remains untested here.

[Landsat surface temperature](https://www.usgs.gov/landsat-missions/landsat-surface-temperature) measures the land surface. It is contextual information, not a substitution for shaded worksite WBGT. Sentinel imagery also needs dates, quality/cloud masks and spatial-resolution limits; vegetation greenness alone cannot prove biochar or sapling survival. Remove remote sensing from an MVP unless it changes a specific decision.

For water audio, 8kHz 16-bit mono sampling is 16kB/s; 30 seconds is 480kB, and continuous recording is roughly 1.38GB/day. These are arithmetic examples, not achieved device throughput. Save short diagnostic clips locally and send events/features. At 4kHz sampling a 2kHz band edge leaves no practical anti-alias margin. Inspect pipe-specific spectra before choosing features copied from speech recognition.

## 3. Integration, interoperability and data architecture

**Proposed architecture:** sensor/capture → local quality checks → deterministic rule or small model → durable local event queue → gateway/backend → asynchronous Nugen review → validated draft/report. Local alerts and capture do not wait on the cloud. Cloud-dependent features visibly show pending status while disconnected.

Choose BLE, local WiFi or a LoRa star according to one deployment need. SX1262 supplies a radio, not a complete mesh protocol. [LoRaWAN uses a star-of-stars topology](https://lora-alliance.org/about-lorawan-old/). A custom mesh requires routing, retries, clock handling and airtime design; it is an avoidable initial risk. Do not stream raw audio over the low-rate link. Before field deployment, check the chosen radio's permitted regional configuration rather than assuming an imported module is configured for India.

One small backend with relational metadata and file/object storage is enough for the proposed scale. Local SQLite or equivalent durable phone storage, CSV/JSON exports and a simple authenticated upload endpoint are reasonable design choices. Separate measurements, model suggestions and reviewer decisions into linked records. Keep raw source data immutable where required and allow corrected versions with attribution. A cryptographic hash is valuable only when compared with a trusted saved commitment.

Suggested common event fields: unique event ID, site/device ID, captured time and time uncertainty, sequence number, source/checksum, units, sensor-quality flags, model/policy version, result, uncertainty, reviewer state and upload receipt. Product-specific fields include reference calibration for heat, pressure/mounting for water, survey effort for birds, and method/plot/batch identity for farming.

Use idempotent upload by event ID, retry with bounded backoff, durable acknowledgement and explicit conflict handling. Last-write-wins is inappropriate for plot rights, reviewer decisions or material allocations. Exports must disclose the custom schema; do not label them CCTS-portal compatible without an actual validated contract.

## 4. AI value, calibration and Nugen integration

The edge model and the Nugen model solve different tasks. Domain alignment is not physical sensor calibration. A stronger language model cannot repair a missing natural-wet-bulb measurement, unlabeled recording or absent lab report.

The [Nugen chat API](https://docs.nugen.in/api-reference/inference/generate-chat-completions) documents aligned-model IDs, model-dependent multimodality and optional confidence scores. Do not assume every model supports images or that the confidence field is always present. The documented domain-drift signal does not establish calibrated error probabilities for heat, leaks, birds or fraud. General calibration research demonstrates why confidence needs empirical checking; it does not test Nugen itself. [Guo et al.](https://proceedings.mlr.press/v70/guo17a.html).

**Proposed aligned-model workflow:** curate authorized domain guidance and representative cases; separate alignment examples from evaluation cases; obtain the completed aligned model ID; run actual inference; check structured output; compare with the baseline. Preserve an observable model/version trace for the event requirement. This research did not create an account, upload data or run inference.

| Proposal | Useful aligned-model task | Hard output restriction | Baseline |
|---|---|---|---|
| Heat | Explain a policy event and missing assumptions | Cannot invent thresholds, diagnose, clear work or prescribe personalized hydration | Reviewed message template |
| Water | Prepare inspection record from observations and procedures | Cannot invent flow, location or dispatch authorization | Rule-based work-order template |
| Birds | Draft reviewed observation report | Cannot add species or infer programme success | Fixed report template |
| Farming | Extract field notes and identify missing checklist evidence | Cannot approve credits or resolve ownership by language inference | Structured form/checklist |

Evaluation cases must include correct inputs, missing units/data, contradictory records, irrelevant text and instructions embedded in a source note. Treat source documents as data. Measure numeric fidelity, required-field recall, unsupported-claim rate, valid references, useful abstention, user time and total latency. Proposed hackathon target: zero unauthorized high-consequence assertions in the finite test set; passing a small set is not a reliability guarantee.

Low confidence should route to review. High confidence must not bypass mandatory measurement or evidence checks. Missing confidence is an explicit state. Do not invent a universal 0.8 or 90 cutoff; choose review thresholds using labelled validation cases and report what the test covers.

## 5. Performance, power and cost

All prototypes need measured end-to-end latency, device RAM/flash, storage growth and energy use. Report percentiles where sample size supports them, test duration and failure counts. INT8 conversion must be followed by accuracy evaluation and operator/runtime compatibility checks; smaller weights alone do not prove sustained inference performance.

Heat sensor settling is distinct from message-delivery latency. Water listening duty cycle in the original plan is about 12.9% over a day after adding the continuous two-hour block. A Pi that is idle still draws power; a scheduled recorder is not automatically a sleeping microcontroller. The bioacoustic appendix calculates nominal battery Wh and audio storage to illustrate these limits.

| Corrected prototype | Estimated cash allowance | Major exclusions |
|---|---:|---|
| Shared heat station + two badges | ₹5k–12k | Reference instrument/calibration, labour |
| Two-node water rig | ₹7k–16k | Outdoor ruggedization, solar, premium sensors, labour |
| Two solar bird recorders + spares | ₹10.6k–19k | Laptop, ecologist, travel/cellular service, labour |
| Practice evidence app with existing devices | ₹2.5k–12k | Purchased phones, labs, accredited verification, labour |

Ranges are planning estimates from the appendices, with configuration differences. They are not procurement quotes or directly equivalent product costs. Reduce scope before reducing measurement integrity. Borrowing instruments can improve evidence more than buying extra badges.

If the pitch includes the AI system's own footprint, measure device/gateway energy, document the workload and disclose unknown provider energy. The [Software Carbon Intensity specification](https://sci.greensoftware.foundation/) distinguishes operational and embodied components per functional unit. API-call counts alone do not quantify carbon; low-energy design is not proof of net climate benefit. Report measured Wh and estimated/unknown emissions separately instead of claiming carbon neutrality.

## 6. Security and domain constraints

Limit worker surveillance and sensitive plot/species-location exposure. Separate consent to collect evidence from land/carbon rights. Apply access controls, secret handling, retention rules and correction history appropriate to the pilot. These are proposed design controls, not a compliance attestation.

For field photos, [Android Play Integrity](https://developer.android.com/google/play/integrity/overview) supplies device/app/request integrity signals, not proof of the photographed practice. Offline data must disclose time uncertainty and defer server-dependent checks. For acoustic recording, avoid unnecessary retention/publication of intelligible speech or sensitive species locations. For heat, prevent a supervisor's unsupported “safe” override from appearing as a sensor result.

Read the exact model, dataset and recording licenses. MIT code does not imply unrestricted model weights or source media. BirdNET and BirdCLEF restrictions and the unverified Xeno-Canto blanket permission are recorded in the bioacoustic appendix. Model capabilities, vendor claims and legal-method availability are not interchangeable forms of assurance.

## 7. Implementation and validation gates

**Build order:** establish ground truth → deterministic baseline → one complete local workflow → optional AI → actual aligned-model inference → held-out evaluation → field usability → repeatable demonstration. Each stage should leave an inspectable artifact. This is a recommended sequence, not work already performed.

| Topic | Proposed go/no-go test | Stop or downgrade if |
|---|---|---|
| Heat | Paired stationary measurements; decision boundaries; two badges; stale-data fault | No reference for the measurement claim or no action owner |
| Water | Distinguish normal/leak states across independent re-mounted sessions; volume ground truth | Model learns pump state or cannot improve on a basic rule |
| Birds | Local held-out labels including negatives and overlaps; equal-effort recording | No ecology review or only clean phone-playback results |
| Farming | Reviewer checklist, valid and manipulated submissions, interrupted sync | No real workflow or only unverifiable staged evidence |

Suggested engineering gates in specialist appendices include heat MAE ≤1°C within the tested envelope; water event recall ≥90% at declared rates with ≤1 false alarm/hour over several held-out hours; bird accepted-detection precision ≥90% with per-species recall; and no lost events in 50 interrupted/retried field-app syncs. These are illustrative team targets, not standards, measured results, field-performance guarantees or enough by themselves to establish safety.

Split by independent day/person/recordist/site/physical session as appropriate. Never place adjacent windows of one recording in both training and test. Report denominators, class prevalence, unknown rate, failures and uncertainty. A one-minute stage demo tests presentation flow; it does not replace held-out evaluation.

For the final 24 hours, reserve substantial time for integration, dependency checks, model/API evidence, failure rehearsal and presentation. Scope changes should remove stretches first: mesh, city layer, extra taxa, multiple farming practices, solar and custom NPU migration. Follow the organizer's eventual rules on existing work and permitted equipment.

## 8. Evidence appendices, confidence and completion

Detailed per-topic claim audits form the evidence appendices: [heat/water](pccoe-heat-water-evidence.md), [bioacoustic](pccoe-bioacoustic-evidence.md), [dMRV](pccoe-dmrv-evidence.md). The [refined proposals](pccoe-hackathon-refined-proposals-2026-09-08.md) convert them into submission-ready scopes and the [market report](market-pccoe-hackathon-four-ideas-research-2026-09-08.md) covers customer hypotheses.

Confidence is high in distinctions backed by official specifications (ASR versus TTS, model modalities, event Nugen requirement); conditional in hardware deployment and cost estimates; unestablished for actual model accuracy, pilot effectiveness, buyer commitments and return on investment. Public ISO abstracts cannot replace the complete standard. Supplier availability and future event instructions may change. Primary records and original studies take precedence over search summaries.

Research coverage completed: all four supplied topics, technology stacks, architecture, integration, implementation, validation plans and technical synthesis. Prototype verification remains future work. No application source changed, so application tests and ARGUS code-diff validation were not claimed.

Ruflo route/store/recall evidence is recorded in the refined report and topic appendices; recalled measurement boundaries were applied to this file. Both workflow customizations had empty terminal instructions.
