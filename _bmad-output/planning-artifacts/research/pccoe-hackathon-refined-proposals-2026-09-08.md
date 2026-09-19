# PCCOE IGC: four corrected hackathon proposals and selection recommendation

**Prepared for Devang · 8 September 2026 · Event confirmed by the user: [PCCOE IGC](https://www.pccoeigc.com/)**

## Decision first

**These are worthwhile problem areas, but none of the original descriptions should be submitted unchanged.** All four fit the published climate topics. The original comparison overstates novelty, understates measurement and field-validation work, confuses monitoring with verified outcomes, and assumes hardware is favoured without a published rule supporting that assumption.

My conditional recommendation is **Water Sentinel**, narrowed to acoustic leak triage with independently measured water loss, if you can secure a pipe rig and someone comfortable with audio signal processing immediately. **Heat Guardian** is the alternative with a shared validated worksite station and inexpensive alert badges. For a software-focused team with an FPO/project partner, **Practice Evidence Desk can outrank both**. Choose biodiversity when you have ecological expertise and field-recording access; otherwise its strongest claims are difficult to substantiate.

The deciding resource is access to trustworthy ground truth: a known leak, a reference instrument, expert-labelled recordings, or a reviewer-accepted evidence workflow. A working dashboard is secondary.

## Reading guide

- [Technical research](technical-pccoe-hackathon-four-ideas-research-2026-09-08.md): architecture, integration, AI evaluation, failure handling and delivery gates.
- [Market research](market-pccoe-hackathon-four-ideas-research-2026-09-08.md): competitors, users versus buyers, adoption, economics and validation plans.
- Detailed corrections and primary sources: [heat and water](pccoe-heat-water-evidence.md), [bioacoustics](pccoe-bioacoustic-evidence.md), [dMRV](pccoe-dmrv-evidence.md).

These are desk-research findings and proposed designs. No prototype, customer interview, supplier order, field trial, submission or regulatory approval was performed. Costs are planning allowances, not quotes. Team skills, budget, current progress and partner access were not supplied, so selection remains conditional. No probability of winning is claimed.

## 1. What this hackathon actually asks for

The [official timeline](https://www.pccoeigc.com/timeline) lists idea submission through **10 September 2026**, prototype video through **15 November 2026**, and a **24-hour physical finale in January 2027**. Assessment weights are **30% idea, 30% prototype, 40% finale**. The stated judging concerns are innovation, feasibility, clarity and climate alignment; detailed finalist instructions are still a later-stage dependency. As of this review, the idea deadline is two calendar days away.

The [FAQ](https://www.pccoeigc.com/faqs) allows teams of 2–5 and does not prescribe a fixed PPT format. The [registration form](https://www.pccoeigc.com/registration2026) requests the PPT as PDF, maximum 5MB, and combined participant ID cards as another PDF, maximum 5MB; NOC is required for later rounds. Prepare these documents without confusing the PPT source file with the PDF upload.

The [prize terms](https://www.pccoeigc.com/prizes) require a slide showing Nugen API use and actual **inference through Nugen aligned models for prize eligibility**. An arbitrary chatbot call or a Nugen logo is not equivalent to demonstrated aligned-model inference. The page was verified in the rendered browser because the search reader returned an empty app shell.

No hardware requirement was found in the reviewed official pages. A physical finale describes attendance and demonstration format. Do not mark a software proposal ineligible or weaker solely for lacking custom electronics. Likewise, do not infer an undisclosed hardware judging preference from past photos.

| Idea | Best matching official topic | Climate mechanism to state |
|---|---|---|
| Heat Guardian | Disaster Resilience, Public Health & Community Well-being | Adaptation: deliver actionable worksite heat advisories and confirm receipt |
| Water Sentinel | AgriTech and Water Resilience | Water resilience; potential energy reduction only when a repair changes operations |
| Riverbank Acoustic Observatory | Biodiversity, Ecosystem Conservation & Climate Awareness | Ecological monitoring supporting adaptation/restoration decisions; no automatic carbon claim |
| Practice Evidence Desk | AgriTech and Water Resilience; carbon-monitoring topic if appropriate | Improve evidence collection for a specified climate practice; quantified mitigation remains method-dependent |

Domain mapping follows the [published topics](https://www.pccoeigc.com/topics). The registration dropdown may use shorter labels; match the live form when submitting.

## 2. Heat Guardian — refine the instrument before the intelligence

**Recommended title:** Worksite Heat Guardian: validated exposure sensing and offline worker alerts.

**Corrected pitch:** “A shared worksite station measures environmental heat exposure and sends policy-based advisories to low-cost badges. Supervisors see the measurement quality, workload assumptions and whether each worker acknowledged the message, including when internet access fails.”

The problem is locally credible: PCMC already has a [Heat Action Plan](https://www.pcmcindia.gov.in/marathi/pdf/Heat-Action-Plan.pdf). This establishes a relevant local context, not proof that every worksite lacks protection or that PCMC will buy the system. Delete the unsupported national count and the assertion that almost no plans reach workers.

**Critical corrections.** Conventional WBGT requires natural wet-bulb, globe and dry-bulb measurements; temperature/RH plus a painted ball is not automatically equivalent. Waterless estimates require validated methods. A small globe needs characterization; an accelerometer cannot uniquely infer metabolic heat. ISO 7243 is a screening framework, not a guarantee of a person's exact safe endurance or hydration needs. Use a named, versioned worksite policy and expose its assumptions. [OSHA measurement guidance](https://www.osha.gov/otm/section-3-health-hazards/chapter-4), [ISO scope](https://www.iso.org/standard/67188.html).

**MVP:** one validated or explicitly experimental station, two vibration/acknowledgement badges, a local supervisor screen and reviewed Marathi audio messages. Select task and clothing/acclimatization assumptions manually first. Remove heart-rate sensing, city satellite mapping, mesh, autonomous hydration prescriptions and a physiological “20-minute strain forecast.” Environmental forecasting can be a later, separately evaluated feature.

**Meaningful AI and Nugen use:** align on approved worksite procedures and examples of complete/incomplete incident records. Generate a cited supervisor briefing explaining the current measured state, unresolved assumptions and an already-determined response. Evaluate whether it preserves numbers, units and restrictions. A model must never overrule the deterministic policy, clear somebody to work, or invent a threshold. Forecasting is worthwhile only if it beats persistence on held-out days.

**Demonstration:** show live stable measurements beside a reference, then play a clearly labelled previously collected threshold-crossing trace through the real alert system. Badges vibrate; one acknowledges, one escalates; Marathi audio plays; internet is disconnected. Show live physical response separately with realistic settling time. The proposed heat-gun plus damp-cloth trick does not establish measurement validity and risks presenting a sensor artifact as WBGT.

**Proof judges can inspect:** paired sensor errors across conditions, decision boundary tests, stale-sensor state, delivery latency excluding sensor settling, missed-acknowledgement handling, and comprehension/comfort feedback. These demonstrate engineering quality without making medical outcome claims.

**First customer hypothesis:** contractor EHS/safety manager or facility operator with authority to change work patterns. Workers are users; public agencies are later stakeholders. Existing Kestrel and Kenzen offerings mean the differentiation is an affordable shared-station workflow with transparent assumptions and local-language delivery, not invention of heat monitoring. [Competitor and cost evidence](pccoe-heat-water-evidence.md).

**Planning budget:** approximately ₹5,000–12,000 for one experimental station, two simple badges and reused phone/laptop infrastructure. Reference instrument rental/purchase, specialist calibration and labour are extra. The original roughly ₹1,000 is more plausible for a simple alert badge than a validated personal heat instrument.

**Verdict:** strong after this correction; misleading as originally specified. Choose it if reference sensing and a supervisor who can act are accessible. Its hard part is metrology and worksite practice, so it is not automatically easier than water.

## 3. Water Sentinel — strongest controlled demo, conditional on signal quality

**Recommended title:** Water Sentinel: acoustic leak triage with measured-loss verification.

**Corrected pitch:** “Low-cost clamp-on nodes flag persistent leak-like pipe activity and provide a technician with evidence. Independent flow measurements quantify loss and confirm recovery after repair, keeping detection, measurement and savings transparent.”

**Critical corrections.** NRW includes more than physical leaks. A contact microphone cannot compute minimum night flow; that needs inflow metering, legitimate-demand estimates and pressure context. Audio confidence cannot become litres/day. Pipe localization needs sensor separation, synchronized recordings and propagation assumptions, not just delay times velocity. Start with attribution to a sensor location; distinguish that from proven pipe-segment inference. [World Bank leakage specification](https://ppp.worldbank.org/sites/default/files/2024-09/water%20-%20performance%20based%20leakage%20reduction%20and%20management%20services%20Bid%20doc%20sanitized.pdf), [propagation research](https://www.mdpi.com/2624-599X/5/2/29).

**MVP:** two piezo nodes on one low-pressure rig or accessible campus segment, one pipe material, a pump, controlled leak outlet, ordinary outlet and timed collection vessel. Begin with repeatable clamping and a spectral-persistence baseline. Add a classifier only after independent sessions show an advantage. Use local WiFi or a simple LoRa star; add outdoor power and waterproofing after signal quality is proven.

The ESP32-S3 ADC acquisition path needs explicit design; do not write “I2S ADC” as if an external audio converter is already present. The ADXL1002 option does not fit the cheap piezo BOM. An NPU chip's price does not include a radio, board, analog front end or enclosure. Detailed corrections and source links are in the [hardware audit](pccoe-heat-water-evidence.md).

**Meaningful AI and Nugen use:** the edge classifier separates leak-like events from tested normal states. Nugen's aligned model turns measured event records and maintenance procedures into a grounded inspection work order, flags missing evidence and explains the triage choice. Deterministic arithmetic handles volume, energy and carbon scenarios; a human authorizes field work. Compare AI triage to a template/checklist baseline.

**Demonstration:** a judge opens the normal outlet and the leak outlet in randomized order. Show classification, uncertainty and detection delay. Collect actual leak water for a timed period, calculate a measured rate and label any daily extrapolation. Close the leak and verify return to baseline. Include pump vibration or sensor reattachment as a harder negative than hall chatter alone. A failure should show uncertain, not magically succeed through a prerecorded inference.

**Climate evidence:** show water recovered first. Energy savings require a site-specific link between water recovery and changed pumping/treatment. If the saved water instead meets unmet demand while pumping stays constant, claim better water availability, not measured electricity savings. The draft's 0.3–0.6kWh/m³ and 0.7kgCO2/kWh may be labelled sensitivity assumptions; they are not local measured coefficients or creditable reductions.

**First customer hypothesis:** campus facilities, housing-society or industrial-estate maintenance. HWM already sells acoustic loggers and correlation systems, so “acoustics + ML” is not novel by itself. Test whether the inexpensive system reduces false technician visits and shortens confirmed repair time. A municipal water department is a potential buyer, not a secured pilot. [HWM PermaNet](https://www.hwmglobal.com/products/permanet-tm-gps/).

**Planning budget:** approximately ₹7,000–16,000 for a two-node rig with plumbing, basic measurement aids and reused laptop. Rough piezo-node allowance ₹1,750–4,000, configuration-dependent. Solar, higher-end sensors, field installation and engineering labour are excluded.

**Verdict:** first choice for a team with practical DSP and rig access. Kill or simplify the classifier if the first independent recordings cannot distinguish a leak from ordinary flow. Do not wait until the finale to discover that the pump dominates every recording.

## 4. Biodiversity Sentinel — sell auditable observations

**Recommended title:** Riverbank Acoustic Observatory: reviewed biodiversity observations for restoration teams.

**Corrected pitch:** “Scheduled recorders and AI-assisted review produce a reproducible record of target bird detections and soundscape changes. Every result links to an audio clip, sampling effort and reviewer decision, helping a local monitoring team decide where to investigate.”

**Critical corrections.** Perch 2 dates to 2025. Its multi-taxa transfer potential does not validate this particular deployment. Full-model inference on a 512MB Pi Zero 2 W is an unproven high-risk assumption; an embedding-only export needs benchmarking. A simple reliable arrangement is a recorder at the site and an existing laptop for inference. [Perch paper](https://arxiv.org/abs/2508.04665), [model card](https://www.kaggle.com/models/google/bird-vocalization-classifier/tensorFlow2/perch_v2).

The bond claim is assigned to the wrong rivers: PCMC's [2025–26 budget](https://www.pcmcindia.gov.in/pdf/eng_budget2526.pdf) associates the 2023 ₹200-crore issue with the **Mula River Project**. Financing does not establish an available procurement budget or absence of existing monitoring. Delete “nobody can prove whether it is working.”

NDSI is a frequency-band energy index, not a direct measure of encroachment. ACI and call-based diversity do not independently establish ecosystem health. Rain, traffic, insects, recorder settings, season and species vocal activity confound interpretation. Monitoring a trend is not attribution of improvement to a restoration project. [Acoustic-index evidence synthesis](https://pmc.ncbi.nlm.nih.gov/articles/PMC9804652/).

**MVP:** one or two scheduled recorders, 5–10 locally confirmed target birds, retained audio, laptop inference, multi-label detections, an expert-review queue and effort-normalized plots. Preserve scheduled windows so silence and missing recordings are distinguishable. Remove a universal ecosystem-health score, a carbon-credit claim and automatic proof of river-programme success. Expand the species list only when independent local examples support it.

**Meaningful AI and Nugen use:** Perch embeddings plus a small local head propose detections. Nugen's aligned model drafts a report from reviewed observations, identifies missing survey effort and explains limits using a controlled ecological reporting guide. It must not invent a species, turn non-detection into absence, or claim causality. Human review and sampling design are part of the product.

**Demonstration:** use an unseen local clip with overlapping species and a noise-only clip; let the reviewer correct a suggestion and show the report update. Show the recorder continuing without connectivity. Phone playback proves the pipeline executes, not real-world accuracy. A month-long chart requires a real month of data or an explicit simulation label.

**First customer hypothesis:** ecology consultant, restoration NGO/CSR implementer or campus biodiversity programme. AudioMoth, BirdNET, Arbimon and NatureMetrics are existing alternatives; local-language reporting alone does not establish a moat. The differentiator must be reproducible local evidence at a demonstrably useful total cost. [Competitor and licensing analysis](pccoe-bioacoustic-evidence.md).

**Planning budget:** solar recorder roughly ₹4,400–7,900; two nodes plus spares roughly ₹10,600–19,000, excluding laptop, ecological review and fieldwork. USB-powered recorders are an acceptable initial scope.

**Verdict:** a good specialist entry, but weaker than its original “highest novelty” label suggests. Choose it with ecological review and accessible sites; otherwise narrow to a campus observation pilot. It cannot establish river restoration impact in the hackathon's field window by adding more dashboard indices.

## 5. Smallholder dMRV — evidence quality before carbon revenue

**Recommended title:** Smallholder Practice Evidence Desk: offline records and assisted audit preparation.

**Corrected pitch:** “An FPO field agent collects complete, tamper-evident agroforestry establishment and survival records offline. Reviewers see missing evidence, uncertain locations, duplicates and every correction. The project measures preparation time and evidence quality; eligibility and credits remain with the applicable methodology and verification process.”

**Critical corrections.** The framework and portal claims have factual support, but do not create automatic farmer credit eligibility. Industrial compliance and project offsets are different pathways. The original $10 figure is an earlier expectation, not a verified farmer sale price. The BEE list reviewed includes an eligible afforestation/reforestation methodology; it does not make every agroforestry project eligible and does not list biochar. No CCTS portal import schema was verified. Export a custom evidence bundle with an explicit methodology crosswalk. [BEE methodologies](https://beeindia.gov.in/view_content.php?lang=1&lid=571).

GPS is a location plausibility signal, not land rights; EXIF can be changed; a hash proves integrity against a trusted prior commitment, not physical truth. A staged real scene can defeat photo challenges. NDVI cannot verify biochar mass or stable carbon. Qwen3-1.7B is text-only; Gemma 4 E2B is a vision-capable candidate but still needs benchmarking on the actual phone. [Qwen card](https://huggingface.co/Qwen/Qwen3-1.7B), [Gemma card](https://ai.google.dev/gemma/docs/core/model_card_4).

**MVP:** one field agent, one human reviewer, one practice and initially 5–10 consenting plots. Record permissions, baseline evidence, planting events and repeated survival observations. Use offline event IDs, resumable uploads, anchored manifests and reviewable conflicts. Keep any carbon output unavailable if method requirements are missing. Remove trading, auto-approval, revenue guarantees, all-practice measurement and “portal-compatible” branding.

If a real biochar producer can provide batch, mass, lab and custody evidence, use a separate **batch-to-field evidence** variant under a named methodology such as [Verra VM0044 v1.2](https://verra.org/methodologies/vm0044-biochar-utilization-in-soil-and-non-soil-applications-v1-2/). Do not burn biomass or manufacture char on stage; demonstrate custody with a labelled sample and test duplicate allocation.

**Meaningful AI and Nugen use:** aligned inference extracts structured facts from field notes, maps evidence to a checklist and drafts a reviewer explanation with source IDs. Deterministic rules find missing fields and duplicate allocation; the reviewer makes substantive decisions. Offline capture remains available while cloud-assisted review explicitly waits. No model confidence threshold approves carbon issuance.

**Demonstration:** capture offline, interrupt synchronization, retry without duplicates, alter a previously anchored bundle, omit a required record and show the resulting review state. Include a valid submission the system must not falsely reject. Explain a staged-scene attack the software cannot resolve without an independent visit; honesty here strengthens the threat model.

**First customer hypothesis:** FPO project team or project developer, not an isolated farmer buying a subscription. Varaha, Boomitra and Carbonfuture invalidate claims that smallholders have no defined routes or that custody/dMRV is new. Test evidence-preparation time, reviewer acceptance and actual willingness to pay. [Market and method audit](pccoe-dmrv-evidence.md).

**Planning budget:** approximately ₹2,500–12,000 for basic hosting, labels/data and local field support with existing phones/laptop. Custom hardware may cost zero; verification, lab work, travel, support and labour do not.

**Verdict:** strong for software teams with a field/reviewer partner. Its risk is evidence acceptance and economics, not lack of hardware. Do not attach it to the other three projects as a universal mechanism to turn observations into saleable carbon.

## 6. Revised comparison and selection gates

These are editorial judgments about the corrected scopes, not organizer scores or measured win probabilities.

| Factor | Heat | Water | Biodiversity | Practice evidence |
|---|---|---|---|---|
| Event/topic fit | Strong | Strong | Strong | Strong with explicit climate-practice boundary |
| Core scientific risk | WBGT accuracy and inappropriate personalization | Signal generalization and inferred volume | Detection bias and ecological overinterpretation | Method eligibility and evidence-to-credit leap |
| Best ground truth | Reference instrument + policy cases | Controlled leak + independent metering | Expert-labelled local recordings | Human review + method checklist |
| Meaningful primary AI | Optional forecast/activity assistance, carefully bounded | Audio discrimination | Acoustic classification | Note extraction/evidence-gap assistance |
| Immediate demo clarity | High after honest settling/replay design | Highest with working rig | Medium; improve with unseen negatives | High with adversarial review |
| Existing competition | Established | Established | Established | Established |
| Easiest pilot route to test | Worksite/facility | Campus/facility plumbing | Campus/NGO/ecology team | FPO/project developer |
| Main prerequisite | Measurement reference and action owner | Rig and DSP | Ecologist and field data | Field partner and reviewer |
| Default recommendation | Alternative to water if prerequisite met | First if prerequisite met | Specialist choice | First for software team with partner |

**First 48-hour decision gates:** water—capture repeatable leak and normal-flow recordings; heat—secure reference access and implement one defensible policy; biodiversity—get a local target list and independently labelled examples; practice evidence—obtain a real checklist and sample reviewer workflow. If the chosen gate is unavailable, reduce the claim or switch. Do not purchase four stacks or combine four products.

## 6A. Doability for third-year students

These ratings assume a typical third-year engineering team can learn unfamiliar tools during the prototype period, has access to ordinary laptops and phones, and can obtain basic components. They describe a credible hackathon prototype, not a production deployment or scientific publication.

| Topic | Third-year doability | What students can realistically build | What needs outside help | Recommended student scope |
|---|---|---|---|---|
| Heat Guardian | **Medium** | ESP32 badges, vibration/acknowledgement, dashboard, deterministic advisory policy and a clearly experimental station | Reference WBGT instrument, occupational-safety review and worksite access | Shared station + two badges; no medical or ISO-conformity claim |
| Water Sentinel | **Medium-low** | Pipe rig, piezo acquisition, FFT/band-power baseline, leak/normal classifier and measured collection | Analog/DSP mentoring, plumbing rig, flow/pressure reference and field utility access | One pipe material, one controlled leak, independent timed volume |
| Biodiversity Observatory | **Medium-low** | Scheduled recorder, laptop inference, spectrogram dashboard, narrow local species list and reviewer queue | Ecologist, local recordings, safe site access and licence review | Five to ten target species; observations only, no restoration proof |
| Practice Evidence Desk | **High** for software students | Offline Android forms, resumable sync, hashes, reviewer queue, GIS context and grounded Nugen assistance | FPO/project developer, carbon-methodology reviewer and possibly lab partner | One practice, 5–10 test plots, no automatic credit issuance |

### What “doable” means here

For a third-year team, “doable” means that the core workflow can be implemented, tested on declared examples and demonstrated honestly within the PCCOE prototype stage. It does not mean the system is calibrated for safety-critical deployment, accepted by a carbon standard, or validated across an entire city or ecosystem.

### Suggested learning effort

- **Heat:** 2–3 students can learn ESP32/BLE and dashboard work quickly; reserve extra time for sensor comparison, policy interpretation and enclosure testing. A safety or instrumentation mentor is strongly recommended.
- **Water:** expect the steepest learning curve. Learn sampling, filtering, FFTs, spectrograms and event-level evaluation before trying neural networks. If no one can read an analog signal or build the rig, switch topics.
- **Biodiversity:** the software is learnable, but ecology is not safely replaceable by tutorials. Find the ecologist first, then build around the species list and sampling protocol.
- **Practice evidence:** the fastest route for ordinary web/mobile students. Learn offline storage, idempotent sync, cryptographic hashes, GIS basics and structured LLM evaluation. Domain review is still mandatory.

### Third-year team go/no-go test

Within the first week after choosing a topic, the team should produce one ground-truth artifact: a paired heat measurement, a recorded leak and measured volume, an expert-labelled local audio set, or a real evidence checklist. If that artifact cannot be obtained, the team should narrow the claim or select another topic before spending time on UI polish.

## 7. Nugen integration that is useful and meets the published requirement

Make the aligned-model role concrete in every proposal. Use an approved domain corpus, representative tasks, a held-out evaluation set and real model-inference records. The [API documentation](https://docs.nugen.in/api-reference/inference/generate-chat-completions) describes aligned model IDs and an optional confidence score on a 0–100 scale; this is not proof that its number equals your task's probability of correctness. Its absence must be handled explicitly.

A practical evidence chain is: measured/reviewed input → deterministic checks → aligned-model draft with source IDs → output validation → human review where appropriate. Record the model ID, evidence versions, actual request/result, latency and missing-data behavior. Never log API secrets into a pitch deck. Test corrupted or incomplete inputs and model unavailability. Replaying a saved result should be visibly labelled replay, not live inference.

Suggested alignment tasks: explain a heat-policy event without changing thresholds; produce an inspection work order without inventing litres; summarize accepted bird observations without inventing ecology; map field notes to missing method evidence without approving credits. Use separate cases for alignment and evaluation. Measure unsupported factual statements, omitted restrictions, correct abstention, numeric fidelity and user task time against a deterministic template.

“Tiny model everywhere → uncertain cases to cloud → mesh cache” is not a universal architecture. Biodiversity inference may be on a laptop; dMRV may need no tiny model; radios are not inherently meshes. Cache only when evidence and policy versions match, and never reuse a stale safety clearance.

## 8. Submission and build sequence

**Before September 10:** select one proposal and its ground-truth gate; prepare a concise idea deck with a real problem source, the user/buyer, current alternative, corrected solution boundary, architecture, meaningful AI, Nugen aligned-model slide, demo plan, estimated BOM and validation milestones. A 10–12-slide deck is a recommendation, not a published slide limit. Export PDF below 5MB. Do not state unbuilt capabilities in the present tense.

**Prototype period to November 15:** first establish the deterministic/data baseline and a working end-to-end slice. Spend the next period collecting independent sessions, building the Nugen alignment/evaluation and testing failure cases. Use the final period for field feedback, repeated demo rehearsals and a concise prototype video. Show what is live, tested, replayed or still planned.

**After prototype through January:** strengthen field evidence and repeatability. Freeze model versions and dependencies for the finale, prepare spare sensors/cables, pre-cache models and datasets, and maintain a local operational fallback. Follow the final-round instructions when issued; do not assume unrestricted prebuilt work, internet reliability, power provision or permission for water/heat equipment.

**Winning-quality evidence package to aim for:** one named pilot partner if obtained, a working narrow demo, baseline comparison, held-out failures as well as successes, source-linked claims, actual cost receipts, a grounded Nugen contribution and a plausible first customer. More features cannot substitute for these.

## 9. Research provenance and limits

Both requested BMAD skills were used. Official event pages, standards/regulator pages, original research, model cards, hardware documentation and competitor pages were checked. Vendor capability statements establish prior art, not independently validated effectiveness. No reliable local market shares, willingness-to-pay study or supplier-complete budget was established; the market report gives testable hypotheses instead of invented TAM/CAGR figures.

Ruflo route completed using `hooks_route` (keyword fallback). Learned findings were stored and recalled from `knowledge/pccoe-igc-2026-rules-20260908`, `learnings/pccoe-four-ideas-claim-boundaries-20260908`, and `skills/pccoe-bmad-dual-research-20260908`. Exact retrieval was used when semantic search missed the learnings key. Applied file: this report; specialist evidence files record their own route/store/recall. No application code or repo structure was changed; ARGUS code validation was not applicable to the research artifacts.
