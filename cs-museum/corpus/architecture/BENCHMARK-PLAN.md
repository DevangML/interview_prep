# Concept Atlas benchmark plan

Status: planned; no spatial or device performance result is claimed.

## Workload

Benchmark a named release on a mid-tier mobile device, a laptop, and a low-end fallback device. Use the same 150 active concept nodes, 300 semantic edges, 40 projected labels, one cluster expansion, search, selection, camera movement and guide-disabled browsing. Record browser/version, OS, CPU/GPU, memory, display resolution, device-pixel ratio, network profile and whether the run is cold or warm.

## Measures

- p50/p95 frame time and dropped frames during expansion and camera movement;
- long tasks over50ms and interaction-to-content latency;
- time to first usable reader and time to first cluster content;
- heap/texture growth after ten expand-collapse cycles;
- chunk transfer, parse and layout time;
- sustained ten-minute run with reduced effects and thermal observations;
- WebGL failure and semantic-reader fallback success.

At60Hz, one frame interval is about16.7ms. A target is a gate to investigate, not evidence that a library has a universal capacity. Test both the spatial adapter and the accessible reader. Honor reduced motion and disable expensive effects before hiding content. Use immutable fixture data so runs are reproducible.

## Acceptance

The spatial adapter is eligible for wider rollout only when the named workload meets the agreed p95 frame and interaction budgets on the target device set, does not grow memory across repeated navigation, and passes keyboard/screen-reader checks. Otherwise ship the reader and reduce visual scope. Results belong in a dated benchmark report linked from the manifest.

