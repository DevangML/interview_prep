# Domain Research: AI for Climate — Indradhanu PCCOE IGC 2026

**Researcher:** Sachin (BMad Analyst) · **For:** Devang · **Date:** 2026-09-05
**Scope:** Winnable problem spaces, 2026-current enabling tech, and team composition for a 3-stage hackathon (ideation → prototype → physical finale).

---

## 1. Eligibility Reality Check — Nugen (act first, build second)

Nugen Intelligence (Mumbai/SF, ~$1M pre-seed led by Antler) sells **Domain-Aligned AI™**: alignment/steering of models to domain reasoning.

Exposed surface: **chat/completions, embeddings, re-ranking, multi-modal (text+image+doc), domain alignment projects, agentic workflows**; LangChain + LlamaIndex integrations; Python cookbook.

**Two findings that matter:**

1. **The platform is invite-only.** Access is requested at `nugen.in/request-access`. This is a *schedule risk*, not a detail — request access on day 1, before scoping. If access is slow, the whole prize eligibility is at risk.
2. **Every response carries a built-in confidence indicator / drift flag.** This is Nugen's actual differentiator, and it is *exactly* the primitive a cascade-inference architecture needs. Using confidence as the escalation and alert-suppression gate is the highest-signal possible use of their API — it shows you read their thesis instead of treating them as a generic LLM endpoint. Nugen is co-organizing; their people will be in the room.

---

## 2. Enabling Tech — what is newly available in 2026 (the unfair advantages)

| Tech | What changed | Why it fuels a winning case |
|---|---|---|
| **TI MSPM0G5187 + TinyEngine NPU** (Mar 2026) | NPU-equipped MCU at **<$1 @1k units**; Cortex-M0+/M33 | Kills the "AI is expensive" objection. A per-node BOM under ₹500 is a *policy* argument, not just an engineering one |
| **Edge NPU class** | 2–10 TOPS at 2–6 W; MCU-class accelerators at fractions of a watt | Real-time vision/audio inference on solar power is now routine |
| **Perch 2.0** (bioacoustics FM) | 1.5M recordings, **14,500+ species**, multi-taxa (birds, insects, mammals, amphibians); SOTA on BirdSet/BEANS; embeddings transfer even to *underwater* tasks it never trained on | You can build a credible biodiversity sensor by transfer-learning on a few hundred local clips instead of collecting a dataset |
| **On-device SLMs** | Gemma 4 E2B/E4B (Mar 2026) lists **phones and Raspberry Pi as official targets**; Qwen3 0.6/1.7/4B; Phi-4-mini 3.8B; LFM2 350M–2.6B built for CPU; Gemma 3n trained on 140+ languages | Genuine offline reasoning on a ₹4,000 phone. Removes the "no internet = no product" hole |
| **AI4Bharat IndicConformer** | **MIT-licensed** ASR for all 22 scheduled languages; Marathi model `indicconformer_stt_mr_hybrid_ctc_rnnt_large` (120M params, Conformer-Large) | Free, offline, Marathi voice I/O. In Pune, this is a home-ground advantage almost no team will use |
| **AI weather (Aurora / GraphCast / MetNet)** | Aurora beats IFS-HRES on >91% of targets; first AI model to beat *all* operational tropical-cyclone systems at 1–5 day leads (20–25% better than NHC at 2–5 days). MetNet does 0–12h global nowcasting | Hyperlocal forecast as a free input layer — you consume it, you don't rebuild it |
| **Meshtastic / LoRa mesh** | Battle-tested in real events (Florida hurricanes, Asheville, Iberian blackout); self-healing, citizen-deployable | The credible answer to "what happens when the network dies" |
| **India CCTS + Carbon Market Portal** | Compliance obligations live for 7 sectors; portal launched **21 Mar 2026**; ~**$10/tCO₂e** initial benchmark; third-party MRV accreditation built in | A *real revenue mechanism* exists now. Farmers are locked out purely by missing measurement — that gap is the business model |
| **Low-cost methane / gas sensing** | Sub-£30 sensors, 5 V, ML-calibrated in the 2–700 ppm range | Landfill/biogas MRV at hobbyist cost |
| **dMRV stack** | AI sensors + remote sensing + blockchain now named in policy documents as the credibility mechanism | "Credibility" is an explicit market requirement you can sell against |

---

## 3. Market Context — what the buyer actually wants

**PCMC is the named buyer and it is unusually sophisticated:**
- India's **first city with a dedicated Sustainability Cell**, structured around six pillars incl. Environment Conservation, **Disaster Resilience**, and Sustainable Finance.
- Was the **5th city globally to publish a climate budget (2025-26)** — but **dropped it from the 2026-27 plan**. Read this carefully: climate ambition is intact, dedicated climate money is not. **Projects that save an existing line item (water loss, fuel, health costs) beat projects that need new climate money.**
- Active: Graded Response Action Plan for air quality, ban on waste burning, Pavana/Indrayani river rejuvenation ($23.6M municipal bond), AVEVA-based central ops targeting up to 22% energy reduction and reduced **water losses**.
- Pune Municipal Corporation already runs AI-driven sorting at waste facilities — **waste CV is not novel to this buyer.**

**Sector pressure points:**
- **Water:** Indian urban non-revenue water runs ~30–40%; the 2026 playbook is acoustic pipeline IoT + satellite + volumetric pricing to push it under 10%. Western India groundwater has fallen past 35 m.
- **Heat:** 250+ cities/districts across 23 states have Heat Action Plans, and the consensus critique is an **implementation gap** — policy exists, last-mile devices don't. India's mean humidity rose 67.1% (2015–19) → 71.2% (2020–24), pushing wet-bulb risk up. Cities run 3–7 °C hotter than surroundings, worst at night.
- **Waste:** 1.5–4M informal waste workers; EPR mandates 60% e-waste recycling by 2027; Kabadiwalla Connect / ReCircle / Bintix already digitising the chain. Crowded.
- **Carbon:** farmers structurally excluded because "metrics for measuring, verifying and valuing" don't exist at smallholder scale.

---

## 4. Recommended Topics (ranked)

### 🥇 #1 — Wet-Bulb Heat Guardian for outdoor & informal workers
**Domain:** Disaster Resilience & Public Health

The deadliest Indian climate risk with the widest policy-to-device gap. HAPs are mandated in 250+ cities; there is no cheap personal device enforcing them. Wet-bulb 35 °C kills a healthy resting adult in hours, and humidity is trending the wrong way.

- **Build:** ₹400-class badge/wristband — temp + humidity + (optional) heart rate → on-device wet-bulb + personal heat-strain index → haptic "stop and drink" alert; LoRa/BLE to a supervisor node; ward-level risk map from roof material + building type; Marathi voice via IndicConformer; Nugen for the supervisor-side advisory and confidence-gated escalation.
- **Why it wins:** vulnerable user ✓, hardware ✓, offline ✓, measurable (heat-illness incidents avoided, work-hours preserved) ✓, PCMC Disaster Resilience pillar ✓.
- **Stage-3 demo:** heat gun + a damp cloth on the sensor → live wet-bulb climbs → alert fires on stage in <10 s. Physical, visceral, impossible to fake.
- **Risk:** medical-claim framing. Stay on *occupational safety*, never diagnosis.

### 🥈 #2 — Acoustic Non-Revenue Water Sentinel
**Domain:** AgriTech & Water Resilience

30–40% of treated water is lost in Indian cities. Treating water costs energy costs carbon — the climate link is arithmetic, not hand-waving. PCMC already reports water-loss reduction as a KPI, so this maps to an existing budget line rather than a deleted climate budget.

- **Build:** piezo/contact mic clamped on the main → MFCC features → TinyML leak classifier on a <$1 NPU MCU → LoRa mesh backhaul → Nugen ranks/triages work orders and writes the crew instruction; localisation by cross-correlation between two nodes.
- **Why it wins:** unbeatable ROI story (litres saved → rupees → kWh → kgCO₂), true edge inference, sub-₹1,000 node.
- **Stage-3 demo:** a transparent pipe rig with a pinhole valve — open it, the node flags a leak and the map pins the segment.
- **Risk:** noisy demo hall. Bench-test in crowd noise early; hysteresis and confidence gating are the answer (and are your ML contribution).

### 🥉 #3 — Bioacoustic Biodiversity Sentinel (with credit-grade MRV)
**Domain:** Biodiversity & Climate Awareness

The least-attacked domain, and this panel has *already* awarded an audio-AI project (Ever Watch). Perch 2.0 makes it newly tractable: transfer-learn from 14,500 species instead of building a dataset.

- **Build:** solar recorder → Perch 2.0 embeddings → lightweight local classifier for Indrayani/Pavana riparian species → species-richness index over time as an ecosystem-health indicator → Nugen turns the index into an auditable report and a Marathi awareness feed. Ties directly into PCMC's river rejuvenation programme.
- **Stage-3 demo:** play a call in the hall, node IDs it live; show a month of riparian trend data.
- **Risk:** "so what?" — kill it by attaching the index to the river-rejuvenation bond as *outcome verification*, i.e. biodiversity credit MRV.

### Wildcard — Smallholder dMRV wrapper
Not a standalone build; the **business model** to bolt onto #1–#3. CCTS is live, the portal opened in March 2026, ~$10/tCO₂e, and smallholders are excluded solely by missing measurement. Any of the above that emits an auditable, timestamped, geo-tagged measurement stream can claim a revenue path — which is precisely the pre-incubation story IIC scores.

### Avoid
Leaf-disease CNN · waste-segregation CV (PMC already runs AI sorting; startups own this) · climate awareness chatbot · flood dashboard with no actuator.

---

## 5. Architecture Spine (applies to all three)

```
sensor → DSP features → tiny quantized model on-device (100% of traffic)
   │                          │
   │                    confident? → local alert, no network
   ▼
uncertain / escalating → Nugen call (confidence-scored) → cached + shared over mesh
```

Buys simultaneously: genuine offline operation, demonstrable Nugen inference (eligibility), a quantified inference-cost/carbon reduction, and the reframe nobody else will make — **an AI-for-climate project that accounts for the carbon cost of its own AI.**

Add: hard physical thresholds gating the neural output (never ship a pure-neural safety alert), alert hysteresis/debounce (alert fatigue is the real field failure), and human-in-the-loop confirmations as training labels (the data flywheel = the pre-incubation narrative).

---

## 6. Team Recruitment — 4 slots, with proof required

Devang holds the 5th seat: architecture, AI orchestration, spec ownership, cascade design.

### Slot 1 — Embedded / Hardware Engineer
**Must bring:** hands-on MCU + sensor work (ESP32/STM32/RPi), soldering, multimeter debugging, power budgeting, component sourcing from local suppliers under time pressure.
**Owns:** the BOM, enclosure, and **the Stage-3 demo rig working on the day**.
**Proof to demand:** show me a board you personally built that still powers on. Not a Tinkercad screenshot.
**Disqualifier:** has only ever simulated circuits.

### Slot 2 — Edge ML / Signal Processing Engineer
**Must bring:** trained *and quantized* a model (TFLite Micro / ONNX / INT8), DSP fluency (spectrograms, MFCC, filtering), transfer learning from a foundation model (Perch/wav2vec-class), and — critically — an understanding that **false positives are the product-killer**, not accuracy.
**Owns:** the on-device model, the feature pipeline, the confidence thresholds.
**Proof to demand:** a notebook with a confusion matrix they can defend, including why they chose that operating point.
**Disqualifier:** can only call `model.fit()` on a clean Kaggle CSV.

### Slot 3 — Full-Stack / Integration & Nugen Owner
**Must bring:** API integration, offline-first sync and conflict handling, a dashboard/mobile client, and deployment that survives a bad venue Wi-Fi.
**Owns:** Nugen access (requests it on day 1), the cascade escalation layer, the sync queue, the demo network fallback.
**Proof to demand:** a URL to something they deployed with a real backend and real users.
**Disqualifier:** front-end only, no backend, no deployment history.

### Slot 4 — Domain / Impact & Pitch Lead
**Must bring:** actual field access — a farmer, a PCMC or Srushti contact, a construction/worksite supervisor, a waste-worker cooperative — plus the willingness to run 5 real user interviews before a line of code, and the ability to deliver the final pitch with unit economics.
**Owns:** the problem validation, the SDG mapping, BOM-vs-value maths, the letter of interest, the 5-minute story.
**Proof to demand:** name the person they can get you in front of this week.
**Disqualifier:** "I'll make the slides." Slides are not a contribution.

### Cross-cutting non-negotiables
- Available for **all three stages** — a Stage-1 ideator who vanishes before the prototype is worse than an empty seat.
- **One named owner for demo rehearsal**, distinct from the person who built the demo.
- Everyone writes or wires something. A four-person team with a passenger is a three-person team carrying weight.
- Complementary, not identical: four web developers is the most common and most fatal composition.

---

## Sources

- [Nugen API docs](https://docs.nugen.in/introduction) · [Nugen cookbook](https://github.com/nugen-in/nugen-cookbook) · [Nugen pre-seed](https://www.businesswire.com/news/home/20250825983189/en/Nugen-Raises-Pre-Seed-to-Pioneer-Reliable-AI-for-Businesses)
- [TI edge-AI MCU launch](https://www.ti.com/about-ti/newsroom/news-releases/2026/2026-03-10-ti-expands-microcontroller-portfolio-and-software-ecosystem-to-enable-edge-ai-in-every-device.html) · [TI TinyEngine NPU](https://www.elektormagazine.com/news/ti-edge-ai-mcus) · [Embedded AI hardware 2026](https://promwad.com/news/embedded-ai-hardware-platforms-2026)
- [Perch 2.0](https://arxiv.org/pdf/2508.04665) · [Foundation models for bioacoustics](https://arxiv.org/abs/2508.01277) · [DeepMind bioacoustics](https://deepmind.google/blog/how-ai-is-helping-advance-the-science-of-bioacoustics-to-save-endangered-species/)
- [Best open-source SLMs 2026](https://www.bentoml.com/blog/the-best-open-source-small-language-models) · [Edge AI state 2026](https://derekmolloy.ie/from-tinyml-to-tiny-language-models-the-state-of-edge-ai-in-2026/)
- [IndicConformer](https://ai4bharat.iitm.ac.in/areas/model/ASR/IndicConformer/) · [Marathi ASR model](https://aikosh.indiaai.gov.in/home/models/details/ai4bharat_indicconformer_stt_mr_hybrid_ctc_rnnt_large_marathi_automatic_speech_recognition_model.html) · [Open-source voice AI India](https://caller.digital/blog/open-source-voice-ai-india-sarvam-ai4bharat-bhasini-2026)
- [Aurora](https://arxiv.org/html/2405.13063v2) · [GraphCast](https://deepmind.google/blog/graphcast-ai-model-for-faster-and-more-accurate-global-weather-forecasting/) · [WeatherNext research](https://developers.google.com/weathernext/guides/research)
- [Meshtastic resilience](https://www.wave-access.com/public_en/blog/when-the-grid-goes-dark-meshtastic-for-resilient-networks/) · [Off-grid comms](https://www.seeedstudio.com/blog/2025/10/14/off-grid-communication-lora-meshtastic/)
- [AI acoustic leak detection](https://www.sciencedirect.com/science/article/pii/S2590123022002274) · [Data-driven water pipeline management 2026](https://www.spml.co.in/media/blogs/data-driven-water-pipeline-management) · [Water security & governance](https://hheuristics.substack.com/p/water-security-solutions-through)
- [India HAPs implementation gap](https://www.downtoearth.org.in/climate-change/indias-heat-plans-are-growing-but-the-real-test-lies-beyond-policy-experts) · [Urban heat action plans & vulnerable groups](https://aidmi.org/blog/urban-heat-action-plans-progress-gaps-and-priorities-for-protecting-vulnerable-groups-of-india/) · [Wet-bulb explainer](https://www.ptcnews.tv/nation/india-heatwave-2026-humidity-danger-wet-bulb-temperature-explained-4423765) · [Carnegie: India heatwave](https://carnegieendowment.org/emissary/2026/06/india-heatwave-electricty-climate)
- [PCMC Sustainability Cell](https://www.circularblogs.com/blog/how-pcmc-became-indias-first-city-with-a-dedicated-sustainability-cell) · [PCMC transformation](https://thepalladiumgroup.com/news/Transforming-Pimpri-Chinchwad-Six-Years-of-Urban-Innovation-with-Palladium) · [PCMC ops with AVEVA](https://www.aveva.com/en/perspectives/success-stories/pcmc/) · [PCMC drops climate budget](https://m.dailyhunt.in/news/india/english/pune+times+mirror-epaper-puntimmr/pcmc+drops+climate+budget+from+plan-newsid-n705039091) · [Green City Action Plan](https://www.pcmcindia.gov.in/marathi/pdf/Green-City-Action-Plan.pdf)
- [CCTS 2026 guide](https://www.indiancarbonmarket.com/ccts-2026-complete-guide-india) · [CCTS compliance in force](https://icapcarbonaction.com/en/news/compliance-obligations-under-indias-carbon-credit-trading-scheme-enter-force-seven-sectors) · [Farmers central to carbon projects](https://www.downtoearth.org.in/agriculture/indian-farmers-must-be-central-to-carbon-projects)
- [AI for e-waste (ORF)](https://www.orfonline.org/expert-speak/circular-and-progressive-using-ai-to-manage-e-waste) · [Waste-picker digital solution](https://aiforgood.itu.int/indian-firms-digital-solution-for-urban-waste-pickers/)
- [Low-cost methane sensor calibration](https://amt.copernicus.org/articles/17/2103/2024/) · [Methane detection cost comparison](https://energy-solutions.co/articles/sub/methane-leak-detection-satellite-drone-iot-cost-comparison)
