# PCCOE IGC: Student Guide to the Four Project Ideas

Each idea needs a different kind of team. The best choice is the project for which your team can quickly get the right skills and trustworthy test data.

PCCOE accepts teams of 2–5. The published scoring is 30% for the idea, 30% for the prototype and 40% for the finale. Your idea presentation must also show real use of Nugen aligned-model inference if you want to remain eligible for prizes. Check the [FAQ](https://www.pccoeigc.com/faqs), [timeline](https://www.pccoeigc.com/timeline) and [prize terms](https://www.pccoeigc.com/prizes).

## A practical team structure

For a five-member team, these are useful responsibilities:

- **Product and domain lead:** understands the problem, speaks with users, defines success, prepares the pitch and explains limitations.
- **Hardware and data-collection engineer:** selects sensors, builds circuits, handles calibration, power, enclosure and field reliability.
- **ML and data engineer:** prepares data, integrates models, and measures false positives, false negatives and uncertainty.
- **Backend and frontend engineer:** builds APIs, dashboards, storage, maps, offline sync and the demo flow.
- **Validation and Nugen lead:** prepares the domain knowledge, uses Nugen for a specific task, records model evidence and tests failure cases.

With two people, combine product with validation and hardware with software. Do not try to build every advanced feature at once.

## 1. Worksite Heat Guardian

### What you are building

A shared station measures the heat conditions at a worksite. Small badges then send workers a configured worksite advisory, vibrate, and record whether the worker acknowledged it.

The supervisor dashboard shows:

- the current reading and whether the sensors are working;
- the selected work/rest policy;
- workload and clothing assumptions;
- acknowledged and missed alerts;
- offline and stale-data states.

Present this as a **worksite heat-advisory system**, not as a medical device.

### Team responsibilities

**Embedded and measurement member**

- Build the environmental station.
- Measure the relevant dry-bulb, globe and natural-wet-bulb-related values.
- Compare the readings with a reference instrument.
- Measure sensor error and how long the reading takes to settle.

**Firmware and wireless member**

- Build badge vibration and acknowledgement.
- Use BLE or a simple LoRa star.
- Add offline queues, retries and battery monitoring.

**Dashboard member**

- Build the supervisor screen.
- Show alerts, assumptions and sensor quality.
- Store the acknowledgement history.

**Safety and domain member**

- Study heat-work policies and acclimatization.
- Speak with a contractor or facility supervisor.
- Define what the supervisor is actually allowed to do.

**Nugen member**

- Use Nugen to explain a policy result that has already been calculated.
- Stop it from inventing thresholds or giving medical advice.
- Show a real aligned-model call in the demo.

### Skills needed

- Embedded systems: medium.
- Sensor calibration and environmental measurement: high.
- Occupational heat-safety knowledge: high.
- ML: low to medium for the first version.
- Full-stack development: medium.
- Wireless and power design: medium.

The hardest part is measuring heat correctly. The dashboard is the easier part.

### How third-year students can learn it

- Read OSHA heat-stress measurement guidance and the public scope of ISO 7243.
- Borrow or rent a reference WBGT instrument if possible.
- Build a stationary station before designing a wearable.
- Select workload categories manually before attempting accelerometer-based metabolic estimation.
- Use reviewed Marathi audio recordings instead of trying to build speech synthesis.
- Compare readings in shade, sun and different airflow conditions.

### Demo idea

Show stable station readings beside the reference instrument. Play a clearly labelled recorded heat trace that crosses the configured policy. Let two badges vibrate, have one worker acknowledge it, leave the other unanswered, and show supervisor escalation. Then disconnect the internet and repeat the alert flow.

### Main risks

- A painted ping-pong ball is not automatically a calibrated globe thermometer.
- Humidity is not a direct replacement for natural-wet-bulb temperature.
- An accelerometer measures movement, not exact metabolic heat.
- A heat gun and damp cloth can create a misleading sensor artifact.
- You cannot claim dehydration, diagnosis or an exact safe endurance time.

### Who should choose it?

Choose Heat Guardian if you can access a reference instrument, a worksite supervisor and someone interested in measurement and safety. It has strong human appeal, but the measurement work is harder than the original idea suggested.

## 2. Acoustic Water Sentinel

### What you are building

Clamp-on sensors listen to a defined pipe system and classify conditions as:

- normal;
- leak-like;
- uncertain;
- sensor-invalid.

Independent flow measurement confirms how much water is escaping. The technician receives a verification task; the system does not automatically order excavation.

### Team responsibilities

**Analog and hardware member**

- Attach piezo sensors consistently.
- Design amplification, biasing and filtering.
- Test pipe materials, clamps and sensor positions.
- Build the pump-and-leak rig.

**DSP and ML member**

- Sample the audio correctly.
- Calculate spectral features or persistent band power.
- Build a simple baseline rule before adding ML.
- Split data by complete recording session.
- Measure false alarms and detection delay.

**Backend and map member**

- Store sensor locations and event history.
- Display leak-like events and verification status.
- Calculate measured litres per minute and label any extrapolation clearly.

**Water-domain member**

- Learn about minimum night flow, pressure and legitimate consumption.
- Contact campus, housing-society or industrial maintenance staff.
- Document how leaks are currently found and repaired.

**Nugen member**

- Turn measured observations into a grounded work order.
- Prevent Nugen from inventing flow, location or savings.
- Compare its output with a fixed work-order template.

### Skills needed

- Signal processing and DSP: high.
- Analog electronics: medium to high.
- Embedded systems: medium to high.
- Water-utility knowledge: medium.
- ML: medium.
- Full-stack development: medium.

This is the most technically demanding project, but it has the clearest physical experiment.

### How third-year students can learn it

- Build a transparent recirculating pipe rig.
- Start with a piezo contact sensor instead of an expensive accelerometer.
- Record normal flow, pump vibration, valve operation and controlled leaks.
- Add a timed collection vessel or flow meter.
- Learn FFTs, spectrograms, filtering, persistence detection and session-level evaluation.
- Use local WiFi first. Add LoRa only after detection works.
- Test sensor reattachment and different pressures.

### Demo idea

Allow a judge to open either a normal outlet or a controlled leak. Show the classification, detection delay, independently collected water volume, a clearly labelled litres-per-day extrapolation, return to baseline after closing the leak, and offline operation.

### Main risks

- Acoustic confidence does not equal litres lost.
- Minimum night flow requires metered inflow, legitimate demand and pressure context.
- The pump may dominate the recording.
- Plastic and metal pipes behave differently.
- High-end sensors can break the budget.
- A noisy auditorium is not the same as real field interference.

### Who should choose it?

Choose Water Sentinel if one member can handle DSP and the team can build the rig immediately. It is the default first choice because judges can trigger the event themselves and inspect the measurement.

## 3. Riverbank Acoustic Observatory

### What you are building

Scheduled recorders collect local environmental audio. AI suggests detections for a small list of target birds. An expert reviews the clips.

The system reports:

- acoustically detected target species;
- valid recording effort;
- noise and missing-data states;
- soundscape indices;
- reviewer corrections.

Present this as **auditable biodiversity observation**, not proof that a river-restoration programme succeeded.

### Team responsibilities

**Audio and ML member**

- Integrate Perch or BirdNET-style embeddings.
- Train a small local classifier.
- Handle overlapping calls and unknown sounds.
- Evaluate by recording, site and date.

**Ecology member**

- Select the target species.
- Review false positives and ambiguous calls.
- Decide suitable sampling times.
- Explain what an audio detection can and cannot establish.

**Recorder and power member**

- Build weather-protected recorder nodes.
- Handle microphones, storage, clocks, batteries and solar.
- Measure storage growth and power consumption.

**Dashboard member**

- Display spectrograms, clips, detections and recording effort.
- Separate “not detected,” “not recorded” and “rejected for noise.”

**Nugen member**

- Draft reports only from reviewed observations.
- Preserve species names, evidence links and uncertainty.
- Never let the model infer absence or restoration causality.

### Skills needed

- Audio ML: high.
- Ecology and biodiversity: high.
- Embedded recording and power: medium.
- Data engineering: medium.
- Full-stack development: medium.
- Fieldwork and licensing: medium to high.

The ecology expert is essential. Without one, the project becomes a bird-sound demo.

### How third-year students can learn it

- Start with 5–10 locally confirmed species.
- Use a laptop for inference instead of assuming Perch will run fully on a Pi Zero.
- Collect local recordings with permission.
- Learn spectrograms, precision, recall, class imbalance and recording-level data splits.
- Study NDSI, ACI and Shannon diversity, including their limitations.
- Keep a record of source, licence, site, date and model version.
- Ask an ecologist to review positive, negative and ambiguous predictions.

### Demo idea

Show a real recorder, an unseen local clip containing overlapping calls, and a traffic/rain/noise clip. Link model suggestions to the audio evidence, let an expert correct one, show the report update, and demonstrate recording while disconnected.

### Main risks

- Perch 2 is from 2025, and Pi Zero deployment is unproven.
- NDSI is not a direct measure of human encroachment.
- Acoustic richness is not population abundance.
- A trend is not proof of restoration impact.
- Phone playback proves that the pipeline runs, not field accuracy.
- Dataset and recording licences may restrict use.

### Who should choose it?

Choose this only if you already have an ecologist, safe field access and local recordings. It is a good specialist project, but the market and evidence story are weaker than the original proposal suggested.

## 4. Smallholder Practice Evidence Desk

### What you are building

An offline Android app helps an FPO field agent collect complete evidence for one defined practice, such as agroforestry establishment and survival.

It records:

- plot boundary and location quality;
- land permission and rights evidence;
- planting or practice events;
- repeated observations;
- media hashes and version history;
- missing evidence;
- reviewer decisions;
- interrupted and resumed synchronization.

The output is a review-ready evidence package, not an automatic carbon credit.

### Team responsibilities

**Android and offline member**

- Build local storage and resumable synchronization.
- Prevent duplicate uploads after interruptions.
- Support Marathi input and low-connectivity work.

**Security and integrity member**

- Implement event IDs, hashes, manifests and version history.
- Test tampered media, duplicate submissions and altered metadata.
- Handle conflicts explicitly instead of using unsafe last-write-wins logic.

**GIS member**

- Store plot polygons and GPS accuracy.
- Flag borderline or implausible locations.
- Display satellite data only as context.

**Carbon-methodology member**

- Select one practice.
- Read the applicable methodology.
- Define mandatory evidence and reviewer rules.
- Explain what the app cannot verify.

**Nugen and full-stack member**

- Extract field notes into structured fields.
- Identify missing checklist items.
- Draft reviewer explanations with source references.
- Keep carbon approval manual.

### Skills needed

- Android and offline-first development: high.
- Data integrity and security: medium to high.
- GIS and remote sensing: medium.
- Carbon methodology: high.
- ML: low to medium.
- Hardware: almost none.

This is the best option for a software team that has access to an FPO or project developer.

### How third-year students can learn it

- Build the offline form before adding AI.
- Learn SQLite or equivalent local storage, queues, idempotent sync and conflict handling.
- Use a simple cryptographic hash chain and a trusted sync commitment.
- Read the relevant BEE afforestation/reforestation methodology.
- Treat NDVI as vegetation context only.
- Test clean, incomplete, duplicated and tampered submissions.
- Ask a reviewer to accept, reject and request corrections on sample records.

### Demo idea

Give a judge the phone and ask them to capture evidence offline, interrupt synchronization, retry without duplicates, alter a file, omit a mandatory record, submit the same batch or photo twice, reconnect, and inspect the review result.

### Main risks

- GPS does not prove ownership or physical truth.
- Hashes show later alteration relative to a commitment; they do not prove that the original image was truthful.
- NDVI cannot prove biochar application or stable carbon.
- CCTS availability does not guarantee credit eligibility.
- Qwen3-1.7B is text-only.
- A staged real-world scene may evade digital checks.

### Who should choose it?

Choose this if your strongest skills are Android, backend, security and workflow design, and you can access an FPO, carbon project developer or reviewer. Do not make the entire business case depend on an unverified carbon price.

## Quick comparison

| Topic | Hardest skill | Best ground truth | Demo strength | Best team |
|---|---|---|---|---|
| Heat | Measurement and safety | Reference instrument and supervisor policy | High | Embedded plus public-health team |
| Water | DSP and analog sensing | Controlled leak and flow measurement | Highest | Hardware/DSP team |
| Biodiversity | Ecology and local audio ML | Expert-labelled local recordings | Medium | Ecology plus ML team |
| Practice evidence | Methodology and reviewer workflow | Real FPO/project review process | High | Software/security team |

## Smallest sensible starting point

- Heat: one station, two badges and one policy.
- Water: one pipe material, one leak and one flow meter.
- Biodiversity: five species, one recorder and one reviewer.
- Practice evidence: one practice, one field agent and one reviewer.

Do not begin with city maps, mesh networks, many species, multiple farming practices, medical predictions, credit trading or autonomous approvals. Those features make the presentation larger without proving the central idea.

The most important first step is to obtain one trustworthy ground-truth artifact: a paired heat measurement, a measured leak, expert-labelled local audio, or a real evidence checklist. If your team cannot obtain that artifact, reduce the claim or choose another topic.
