# Bioacoustic Biodiversity Sentinel: evidence audit and refined proposal

Research date: 8 September 2026. Scope: technical feasibility, ecological validity, local market rationale, and hackathon readiness. This is desk research; no field results, component benchmarks, customer interviews or eligibility confirmation are claimed. Recommendations, budgets and acceptance targets below are proposed engineering decisions, not measured achievements.

## Verdict

Keep this idea only after substantial reframing: **Riverbank Acoustic Observatory — auditable bird-call observations and soundscape change for local restoration teams.** It is a credible conservation-monitoring prototype, but the original proposal overstates novelty, deployability and ecological inference. It cannot honestly claim to verify that a ₹200-crore river programme worked from bird calls and a few weeks of indices. Its best competitive advantage would be a locally validated, inexpensive, reproducible monitoring workflow with expert review, not use of Perch alone.

Conditional hackathon recommendation: a good specialist choice if the team already has an ecologist, safe river access and enough lead time for field recordings. A weaker choice if the finale is imminent and evidence consists of playing Xeno-Canto recordings through a phone. Event scoring and any mandatory embedded-inference requirement must be checked separately.

## Claim corrections

| Original claim | Finding and correction |
|---|---|
| Perch 2.0 is a 2026 unlock | The original Perch 2 paper was submitted 6 August **2025**. Its large multi-taxa training scale is real; date it correctly. [Original paper](https://arxiv.org/abs/2508.04665). |
| 1.5M recordings, 14,500+ species; transfers underwater | Supported in broad terms. The underwater-transfer paper specifies 14,597 species and finds good few-shot transfer on studied tasks. It says almost no marine-mammal training audio, not literally no underwater exposure of any kind. That result does not validate Pune river-health estimation. [Underwater study](https://arxiv.org/abs/2512.03219). |
| Pi Zero 2 W runs Perch 2 embeddings | Unbenchmarked and risky as supplied. Google specifies approximately 12M embedding parameters plus a 91M classification head; outputs are 1,536 dimensions. A full FP32 model implies about 412MB of parameter storage alone by arithmetic, before runtime, activations and OS. Zero 2 W has 512MB RAM. An embedding-only export is much smaller and might be feasible with optimization, but needs an actual supported export and memory/latency/power measurement. Do not assert categorical impossibility or out-of-box feasibility. [Model card](https://www.kaggle.com/models/google/bird-vocalization-classifier/tensorFlow2/perch_v2), [Pi specifications](https://www.raspberrypi.com/products/raspberry-pi-zero-2-w/). |
| PCMC committed $23.6M in bonds to Pavana and Indrayani | Misassigned. PCMC's own 2025–26 budget says its July 2023 ₹200-crore municipal bond proceeds fund the **Mula River Project**. Bond proceeds are financing, not proof of spent funds, ecological outcomes, or an available monitoring procurement budget. Use rupees and the correct project. [PCMC budget](https://www.pcmcindia.gov.in/pdf/eng_budget2526.pdf). |
| A 2025 green bond proves river opportunity | A separate ₹200-crore 2025 green issuance was reported for Harit Setu and Telco Road sustainable mobility. Do not combine the two issues. [Contemporaneous reporting](https://timesofindia.indiatimes.com/city/pune/pcmcs-200-crore-green-municipal-bonds-listed-on-bse-cm-and-deputies-attend-ceremony-in-mumbai/amp_articleshow/121760939.cms). |
| Nobody can prove rejuvenation works | Unsupported absolute claim. An evidence gap must be established with programme officials and existing monitoring documents. PMRDA reports an Indrayani combined DPR of ₹1,797 crore submitted for approval; this is not a spend total or contract for this product. [PMRDA project page](https://www.pmrda.gov.in/en/indrayani/). |
| NDSI directly measures human encroachment | Incorrect: it is a spectral-energy proxy based on frequency-band assumptions. Traffic, voices, river flow, rain, insects and low-frequency birds can violate the assumptions. A passing vehicle changes soundscape exposure without changing land encroachment. [Methods guidance](https://besjournals.onlinelibrary.wiley.com/doi/10.1111/2041-210X.14194). |
| Richness + Shannon + ACI = ecosystem health | Unsupported without local ecological validation. Acoustic activity differs from abundance, detectability and ecological condition. Show separate observation indicators with uncertainty; omit a universal health score. A meta-analysis finds moderate but variable associations, not direct equivalence. [Evidence synthesis](https://pmc.ncbi.nlm.nih.gov/articles/PMC9804652/). |
| Baseline + trend = MRV | A descriptive trend is monitoring. Attributing change to restoration needs a counterfactual, comparable sampling and confounder adjustment. Financial or carbon verification requires its own accepted method and authority. |
| Solar continuous listening, later dawn/dusk duty cycle | Internally inconsistent. Pick a fixed scheduled protocol and state its blind spots. Dawn/dusk sampling favours some bird taxa and misses other temporal communities. |

## Refined build

**Pitch:** “We give river-restoration teams a repeatable, auditable record of which target birds were acoustically detected, when survey effort was comparable, and when a site needs expert inspection.”

MVP: one or two recorders, 5–10 locally confirmed target birds, a fixed recording schedule, retained reference audio, laptop inference, an expert-review queue and a Marathi public summary based only on approved observations. Expand to 15–25 species only after enough independent local positives exist.

Recommended architecture:

1. Pi Zero 2 W or a dedicated low-power recorder captures mono audio to SD using a documented gain, mic orientation and mounting height. Add weather shielding with an acoustic vent, wind protection, clock checks, battery reporting and safe shutdown. INMP441 is an air microphone: no fish or underwater monitoring claim. Declare the audible taxa and frequency range the deployed chain actually supports.
2. Capture fixed-duration scheduled windows regardless of acoustic activity. A possible pilot schedule is one minute every five minutes during matched dawn/dusk blocks. This is a proposed starting protocol, subject to ecologist input. Keep scheduled reference windows even if an activity detector reduces extra recording or inference. Otherwise silent/noisy-window filtering changes the denominator and biases indices. A speech VAD is not a bird-call detector.
3. Batch-copy over WiFi or retrieve SD. Run Perch embeddings and a small multi-label linear head on an existing laptop; retain unknown/uncertain outputs. Birds overlap, so forced single-class classification is inappropriate. Offline recording is not the same as offline species inference on the node.
4. Benchmark pretrained outputs or a simple linear head before using an MLP. Use current [Perch-Hoplite inference tooling](https://github.com/google-research/perch-hoplite); the older research repository explicitly redirects practical inference there. Cache model files before the finale. An embedding-only edge port is a stretch goal requiring proof on the exact hardware.
5. Store recording ID, checksum, device/site, timestamp, schedule, gain, valid duration, model version, thresholds, detection spans and reviewer status. The dashboard must distinguish “not detected,” “missing recording,” and “rejected for noise.” Protect precise locations of sensitive species and avoid publishing incidental human speech.
6. Any Nugen layer receives approved structured measurements and cited methods to draft a report. It cannot establish species truth, ecology causality or verification authority through a confidence score. Use deterministic reports as the offline fallback.

## What to calculate

- **Detected target richness:** number of accepted target species in equal-effort windows. Label it “acoustically detected target-species richness,” not total biodiversity.
- **Detection rate:** positive scheduled windows / valid scheduled windows per species, with effort displayed. This is neither individual count nor population abundance.
- **NDSI:** `(B-A)/(B+A)`, with explicitly configured bands and invalid handling when total energy is near zero. The suggested 1–2kHz and 2–8kHz bands are a literature convention, not guaranteed sound-source separation. Library defaults differ: scikit-maad documents 0–1kHz and 1–10kHz defaults, so set and version parameters explicitly. [Library documentation](https://scikit-maad.github.io/generated/maad.features.soundscape_index.html).
- **ACI:** exploratory acoustic amplitude-variation index; lock preprocessing and time/frequency resolution. Annotate rain, wind, machinery and clipping. Do not label its rise as health improvement automatically.
- **Shannon:** if computed from species detection proportions, call it “diversity of detected call activity.” Explain that repeated calls by one individual and species-specific vocal activity affect it. Do not quietly represent it as abundance-based community diversity.

## Dataset and validation plan

Use locally reviewed recordings for the final test, not only geographically distant clean foreground clips. “A few hundred clips” is an annotation starting budget, not an accuracy guarantee. Save contributor, recording ID, URL, date, location, taxonomic name, license and transformations in a manifest. The Xeno-Canto terms page failed to load during this audit, so blanket commercial permission is **not verified**. Inspect each actual recording's license before use; keep own field recordings as the clearest provenance path. BirdCLEF+ 2025's dataset explicitly uses CC BY-NC-SA 4.0, illustrating why a downloadable dataset is not automatically commercially unrestricted. [Dataset page](https://www.kaggle.com/competitions/birdclef-2025/data).

Split train/validation/test by original recording, recordist and site/date wherever feasible. Never let overlapping chunks of one recording enter different splits. Preserve a genuinely held-out local site or day block. Include negatives containing traffic, speech, dogs, rain, insects, music and non-target birds; test overlapping calls. Have an ecologist label a blind sample, including ambiguous windows and negative clips. Do not only review model positives.

Report per-species precision/recall, macro metrics, false alerts per recording hour, valid recorded hours and confidence intervals. Tune thresholds on validation only. A proposed pilot gate is ≥90% precision for the accepted target list, with recall and uncertainty separately reported; this is a team acceptance target, not a scientific standard or a claim of achieved performance. Rare classes with inadequate held-out support remain experimental even if aggregate precision is high.

For ecological interpretation, use repeated site-level sampling, comparable time-of-day and season, calibrated equipment and independent point-count or other expert observations. Include reference/control sites where possible. A before–after/control–impact design can support an intervention question, but two nodes and several days cannot establish programme-wide effects. Log weather, river flow, construction and sensor changes. Adjacent audio windows are not independent ecological replicates. Proposed larger validation: several independent sites over appropriate seasonal periods, with ecologist-designed replication and separate water-quality/habitat indicators where restoration effectiveness is the question.

## Power, storage and cost realism

Illustrative arithmetic: 32kHz, mono, 16-bit PCM is 64kB/s, roughly 230MB/hour or 5.5GB/day continuously. A 1/5 sampling duty cycle across four daily hours records 0.8h/day, about 184MB/day; metadata, filesystem overhead and backups are extra. Match actual sampling rate to the chosen model/frontend.

A 10,000mAh pack quoted at 3.7V stores about 37Wh nominal. At 80% usable conversion it provides about 30Wh; at a hypothetical 1W average load that is around 30 hours, not indefinite operation. These are examples, not measured Pi power. Linux sleep between recordings does not guarantee MCU-like power savings: benchmark or use a load switch/RTC with safe shutdown. Size solar against measured daily Wh and shaded/monsoon conditions.

| Recorder cost item | Planning range, INR |
|---|---:|
| Zero 2 W board | 1,600–2,400 |
| Mic, wiring, adapter | 250–600 |
| SD storage | 350–600 |
| Weather enclosure, acoustic vent, mount | 500–1,000 |
| Battery and regulated supply | 800–1,500 |
| Solar, charge/load control, connectors | 900–1,800 |
| Total solar recorder | **4,400–7,900** |

All lines except the board anchor are engineering allowances, not supplier quotations. An opened [Indian seller listing](https://robocraze.com/products/raspberry-pi-zero-2-w-with-headers) displayed ₹2,377 including GST and sold-out status, so availability needs checking. The original ₹3,300–3,800 is more plausible for a reduced bench recorder than a robust solar field unit. Two solar nodes plus 20% spares allowance imply approximately ₹10,600–19,000, excluding the existing laptop, cellular hardware/data, travel, ecological review and labour. Start with USB power if the schedule is short; do not add solar purely for the pitch.

## Market and novelty

This is an established category. [AudioMoth](https://www.openacousticdevices.info/about) is a low-cost open-source acoustic recorder. [BirdNET-Analyzer](https://birdnet.cornell.edu/analyzer/) already supports batch analysis, custom classifiers and expert review workflows. Its [repository license statement](https://github.com/birdnet-team/BirdNET-Analyzer/blob/main/README.md?plain=1) separates MIT code from CC BY-NC-SA model weights. [RFCx/Arbimon](https://rfcx.org/ecoacoustics) provides acoustic acquisition, species identification and ecological comparison. [NatureMetrics](https://naturemetrics.com/products/bioacoustics) markets passive monitoring with AI plus human verification and integrates eDNA. Therefore “highest novelty” is not established.

Potential differentiation: a demonstrably lower total cost for a small Indian restoration site, Marathi reporting, local validated species models, reproducible survey effort, explicit uncertainty and human review. Test the improvement against free tools plus manual surveys. Hardware alone is unlikely to be the durable advantage; validated local data and a trusted monitoring service are more plausible.

Customer hypotheses: an environmental consultant, NGO/CSR restoration operator or campus biodiversity programme may be an easier pilot owner than municipal procurement. PCMC is a relevant stakeholder, not a validated buyer. Ask prospective users which decision the report changes, what surveys they already commission, which evidence they trust, who signs off, and whether they would fund a pilot. Price as recorder deployment plus analyst-reviewed monitoring service only after measuring maintenance and review cost. No defensible local TAM, willingness-to-pay or booked revenue is established by the bond figure.

## Demonstration and go/no-go

Demo: show a real recorder, an unseen held-out clip with overlapping calls, evidence-linked species suggestions, a traffic/rain clip that is rejected or flagged, then disconnect connectivity and show continued local recording. Demonstrate expert correction propagating into a report with the model/reviewer versions retained. A phone playback proves the pipeline runs, not field identification accuracy. Historical charts must be actual dated data; simulated histories must be clearly labelled.

Go if an ecologist can review a narrow target list, site access is arranged, the held-out evaluation is credible, and the team can explain why the resulting observation changes an actual monitoring decision. No-go for a restoration-outcome pitch without baseline/control data; no-go for claimed full Perch inference on Zero 2 without a working measured binary; no-go for a “month of field data” slide if no month was collected. If prerequisites are missing, reduce to a campus acoustic-observation pilot rather than fabricate river MRV.

## Ruflo evidence

Route: `mcp__ruflo__hooks_route` returned codex specialization, keyword routing, confidence 0.7. Learn: primary model card, original papers, official PCMC budget, hardware specifications and competitor documentation. Store: namespace `knowledge`, key `pccoe-bioacoustic-audit-20260908`, success true. Recall: `memory_search` returned that key, similarity 0.44556, before this report was written. Applied: this file's model feasibility, bond correction, index limits and refined architecture.
