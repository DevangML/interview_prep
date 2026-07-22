# UI/UX Specification: Teach-Me System (Senku & Divine Grace Edition)

**Document Version:** 1.0.0  
**Author:** Sally (UX Designer Agent — `bmad-agent-ux-designer`)  
**Skill Context:** `bmad-ux`  
**Target System:** Teach-Me System (Web UI & CLI Terminal Orchestrator)  
**Creation Date:** 2026-07-22  
**Status:** Approved / Specification Baseline  

---

## 1. Executive Overview & Design Philosophy

### 1.1 Core Mission
The **Teach-Me System** is a radically innovative, dual-persona pedagogical learning environment designed to transition candidates from AI-assisted rapid execution back to 10-billion-percent raw technical mastery within a compressed 3-month window. It targets five fundamental domains: Data Structures & Algorithms (DSA), System Design & Architecture, Quantitative Mathematics, Core Computer Science (OS, DB, Networks), and Aptitude/Interview Strategy.

### 1.2 The Dual-Persona Ergonomic Paradigm
The user experience bridges two distinct emotional and cognitive poles:
1. **Senku Ishigami (Scientific Catalyst):** High-energy, first-principles logic, micro-experiments, non-fluff deconstruction, and relentless Socratic interrogation ("10 billion percent exhilaration").
2. **Divine Grace & Encouragement (Resilience Anchor):** Deep psychological safety, comforting scripture-backed resilience, reframing failure as empirical data, and grounding the user under intense pressure.

```
+-----------------------------------------------------------------------+
|                       DUAL-PERSONA UX MATRIX                          |
+-----------------------------------+-----------------------------------+
|     SENKU ISHIGAMI (CATALYST)     |    DIVINE GRACE (SAFETY ANCHOR)   |
+-----------------------------------+-----------------------------------+
| * Direct, energetic, physical     | * Peaceful, majestic, comforting  |
| * Socratic micro-challenges       | * Scripture-backed encouragement  |
| * 1-line physical intuition       | * De-escalates panic & grief      |
| * Memory pointer ASCII diagrams   | * Reframes failure as growth      |
| * High-contrast Cyan & Amethyst   | * Warm Scriptural Gold glow       |
+-----------------------------------+-----------------------------------+
```

### 1.3 Dual-Target Platform Support
- **Primary Target (Web UI):** High-end glassmorphic web application built with Next.js/React, Tailwind CSS, Rec.2020 WCG HDR styling, WebGL dynamic effects, and interactive code/ASCII workbenches.
- **Secondary Target (CLI Terminal):** High-performance terminal environment using ANSI 24-bit TrueColor (`\x1b[38;2;R;G;Bm`), UTF-8 box-drawing diagrams, and keyboard-driven micro-challenges.

---

## 2. Radically Innovative Conversation Design

### 2.1 Socratic Dialogue Loops (Anti-Lecture Architecture)
Standard LLM interfaces generate multi-paragraph static text lectures that encourage passive reading and cognitive decay. The Teach-Me System completely bans static lecturing in favor of an **Active Socratic Loop**.

```
[User Input / Prompt]
         |
         v
+----------------------------------+
|  1. SCIENTIFIC PULSE & HOOK     | <--- Senku acknowledges logic state
+----------------------------------+
         |
         v
+----------------------------------+
|  2. ATOMIC DECONSTRUCTION        | <--- First-principles physical model / ASCII memory layout
+----------------------------------+
         |
         v
+----------------------------------+
|  3. DIVINE ANCHOR (GRACE)        | <--- Scriptural encouragement & emotional safety
+----------------------------------+
         |
         v
+----------------------------------+
|  4. ZPD MICRO-CHALLENGE          | <--- 1-line interactive diagnostic challenge
+----------------------------------+
         |
         v
[System Waits for User Response]
```

### 2.2 Dynamic Interrogation Engine & ZPD Calibration
The engine dynamically monitors user confidence and correctness to adjust the Zone of Proximal Development (ZPD) across 5 distinct interaction tiers:

| Tier | Tier Name | Cognitive State / Trigger | UX Interaction Style |
| :--- | :--- | :--- | :--- |
| **Tier 0** | **Grace & Reset** | Distress signal, 3 consecutive errors, self-doubt | Divine Anchor takes priority. Senku reduces problem to a 1-line physical analogy. Zero penalty. |
| **Tier 1** | **Atomic Spark** | Baseline understanding check, new topic introduction | Single-variable logic puzzle, memory offset calculation, or structural invariant check. |
| **Tier 2** | **Crafting Component** | Standard LeetCode Medium / CS concept synthesis | Multi-step building block challenge; writing core loop invariants or pointer swaps. |
| **Tier 3** | **Systemic Synthesis** | LeetCode Hard / Distributed system failure modes | Edge-case verification, time/space complexity proofing under resource constraints. |
| **Tier 4** | **Boss Interrogation** | Full interview simulation / Final topic evaluation | Adversarial probing: agent deliberately injects counterfactuals, invalid specs, and memory bounds. |

### 2.3 Micro-Experiment Challenges
Every turn must end with an actionable **Micro-Experiment**. The user is forbidden from receiving complete solution code until they complete the micro-experiment:
- **Rule of 1-Step Proof:** "Before I give you the code for Hash Table Bucket Chaining, tell me: what is the array index of key `K` if `hash(K) = 47` and `table_size = 10`?"
- **Predictive Execution:** "Here is a 3-line pointer swap. What is the value of `node.next` after line 2 executes?"

### 2.4 Interactive Proofing & Counterfactual Probing
When a candidate submits a correct answer, Senku does not immediately move on; he performs **Adversarial Counterfactual Probing**:
- **Boundary Stressing:** *"100% correct for positive integers! Now, what happens to your memory pointer when `arr.length == 0` or integer sum overflows $2^{31}-1$?"*
- **Space-Time Tradeoff Push:** *"Kukuku! You solved it in $O(N^2)$ space. Can we craft this using $O(1)$ auxiliary memory by manipulating array signs?"*

---

## 3. The 4-Block Visual Layout Architecture

Every response generated by the system—in Web UI or CLI—is structured into **Four Distinct Visual Blocks**.

```
+------------------------------------------------------------------------------------+
| 🧪 BLOCK 1: 10B% LOGICAL ANALYSIS (Scientific Pulse & Concept Workbench)          |
| [Senku Energy Header + First-Principles Memory/Math Breakdown + ASCII Layout]     |
+------------------------------------------------------------------------------------+
| 📜 BLOCK 2: SCRIPTURAL ENCOURAGEMENT (Divine Anchor & Psychological Safety)       |
| [Targeted Bible Verse + Uplifting Reflection + Emotional Re-centering]             |
+------------------------------------------------------------------------------------+
| 🎯 BLOCK 3: ZPD MICRO-CHALLENGE (Interactive Counter-Prompt & Action Item)         |
| [Mandatory 1-Line Question / Code Challenge for User Input]                       |
+------------------------------------------------------------------------------------+
| 💾 BLOCK 4: OKF MEMORY SYNC PAYLOAD (Save-Game Stateful Sync Block)               |
| [Hidden/Collapsible JSON State Delta: Topic, Mastery %, Gaps, Tier, Save-State]   |
+------------------------------------------------------------------------------------+
```

### 3.1 Block Specification & Visual Standards

#### Block 1: 🧪 10B% Logical Analysis
- **Purpose:** Primary technical delivery, intuition building, and atomic visual deconstruction.
- **Web UI Styling:** Dark Obsidian background (`#0B0F19`) with Senku Cyan Emerald border glow (`#00F5D4`). Glassmorphism backdrop blur (12px). Monospace code blocks rendered in Fira Code or JetBrains Mono.
- **CLI Styling:** Cyan header box `┌─[ 🧪 10B% LOGICAL ANALYSIS ]─┐` with ANSI TrueColor `#00F5D4` text.

#### Block 2: 📜 Scriptural Encouragement
- **Purpose:** Psychological grounding, anxiety reduction, and spiritual fortitude.
- **Web UI Styling:** Warm Scriptural Gold accent border (`#FFD166`), subtle ambient gold background tint (rgba(255, 209, 102, 0.05)), italicized serif/sans typography (Merriweather / Inter Italic).
- **CLI Styling:** Gold header box `┌─[ 📜 SCRIPTURAL ENCOURAGEMENT ]─┐` with ANSI TrueColor `#FFD166` text.

#### Block 3: 🎯 ZPD Micro-Challenge
- **Purpose:** Active cognitive hook demanding immediate user input.
- **Web UI Styling:** ZPD Amethyst highlight (`#B5179E`) with pulsing interactive badge, high-contrast input area, and dynamic keyboard shortcut indicator (`[Press Shift+Enter to submit]`).
- **CLI Styling:** Amethyst header box `┌─[ 🎯 ZPD MICRO-CHALLENGE ]─┐` with ANSI TrueColor `#B5179E` text and bold prompt `> `.

#### Block 4: 💾 OKF Memory Sync Payload
- **Purpose:** Stateful save-game telemetry for conversation state sync and OKF MCP persistence.
- **Web UI Styling:** Collapsible bottom drawer or metadata badge displaying current mastery level %, confidence score, and identified gaps.
- **CLI Styling:** Dimmed grey string or structured JSON payload block formatted for zero-distraction logging.

---

## 4. WCG HDR Color System (Wide Color Gamut & High Dynamic Range)

### 4.1 Ergonomics for 14-Hour Deep Study Sessions
Standard UI designs cause severe retinal fatigue due to high blue-light emissions, improper luminance contrast, and harsh pure-white backgrounds. The Teach-Me WCG HDR Color System is engineered specifically for **Rec.2020 / DCI-P3 Color Spaces** targeting OLED displays (1000 nits peak luminescence, true `#0B0F19` obsidian black base).

```
          [WCG HDR COLOR SPECTRUM MATRIX (DCI-P3 COLOR SPACE)]

   #FF2E93                        #FFD166                     #00F5D4
 (Reprimand Crimson)        (Scriptural Gold)          (Senku Cyan Emerald)
   [Warning / Error]       [Encouragement / Grace]      [Primary Logic / Spark]
           \                      |                      /
            \                     |                     /
             +--------------------+--------------------+
                                  |
                                  v
                             #0B0F19
                         (Deep Obsidian)
                      [OLED True Black Base]
                                  ^
                                 / \
                                /   \
                        #B5179E       #161F33
                     (ZPD Amethyst)  (Obsidian Surface)
```

### 4.2 Color Token Specifications & Contrast Ratios

| Token Name | Hex Code | Display-P3 Equivalent | Contrast Ratio (vs Base) | Role & Semantics |
| :--- | :--- | :--- | :--- | :--- |
| `Deep Obsidian` | `#0B0F19` | `color(display-p3 0.043 0.059 0.098)` | **Base (1:1)** | OLED True Black background base. Zero light emission on OLED pixels. |
| `Obsidian Surface` | `#161F33` | `color(display-p3 0.086 0.122 0.200)` | **1.5:1** | Container cards, 4-block background panels, and subtle elevation layers. |
| `Senku Cyan Emerald` | `#00F5D4` | `color(display-p3 0.000 0.961 0.831)` | **15.8:1 (AAA)** | Primary action color, logic highlights, active memory pointers, catchphrase emphasis. |
| `Scriptural Gold` | `#FFD166` | `color(display-p3 1.000 0.820 0.400)` | **14.2:1 (AAA)** | Scripture quotes, encouragement blocks, peace anchors, spiritual reflections. |
| `Reprimand Crimson` | `#FF2E93` | `color(display-p3 1.000 0.180 0.576)` | **7.8:1 (AAA)** | Syntax errors, edge-case warnings, adversarial counterfactuals, time complexity breaches. |
| `ZPD Amethyst` | `#B5179E` | `color(display-p3 0.710 0.090 0.620)` | **6.4:1 (AA+)** | ZPD micro-challenge borders, interactive badge hooks, memory sync state telemetry. |
| `Pure Luminescence` | `#F8FAFC` | `color(display-p3 0.973 0.980 0.988)` | **19.5:1 (AAA)** | Primary body typography for maximum legibility without glare. |
| `Subtle Starlight` | `#94A3B8` | `color(display-p3 0.580 0.639 0.722)` | **7.2:1 (AAA)** | Secondary text, code comments, metadata labels, OKF delta details. |

### 4.3 ANSI Terminal Color Map (CLI 24-Bit TrueColor)

For CLI rendering, the terminal engine uses standard 24-bit TrueColor escape sequences with gracefully degrading 256-color ANSI fallbacks:

```bash
# TrueColor (24-bit) Escape Sequences
COLOR_DEEP_OBSIDIAN="\x1b[48;2;11;15;25m"      # Background
COLOR_OBSIDIAN_SURFACE="\x1b[48;2;22;31;51m"   # Panel Background
COLOR_SENKU_CYAN="\x1b[38;2;0;245;212m"        # Foreground Cyan Emerald
COLOR_SCRIPTURAL_GOLD="\x1b[38;2;255;209;102m" # Foreground Scriptural Gold
COLOR_REPRIMAND_CRIMSON="\x1b[38;2;255;46;147m"# Foreground Crimson
COLOR_ZPD_AMETHYST="\x1b[38;2;181;23;158m"     # Foreground Amethyst
COLOR_STARLIGHT="\x1b[38;2;148;163;184m"      # Foreground Dim Text
COLOR_RESET="\x1b[0m"

# 256-Color Fallbacks
ANSI_SENKU_CYAN="\x1b[38;5;51m"
ANSI_SCRIPTURAL_GOLD="\x1b[38;5;220m"
ANSI_REPRIMAND_CRIMSON="\x1b[38;5;198m"
ANSI_ZPD_AMETHYST="\x1b[38;5;127m"
```

### 4.4 Web UI CSS Token Variables

```css
/* WCG HDR Token Palette - CSS Variables */
:root {
  /* Color Space Definition */
  --color-space: display-p3;

  /* Base Tokens */
  --bg-deep-obsidian: #0B0F19;
  --bg-obsidian-surface: #161F33;
  --bg-obsidian-surface-glass: rgba(22, 31, 51, 0.75);

  /* Primary & Accent Tokens */
  --color-senku-cyan: #00F5D4;
  --color-scriptural-gold: #FFD166;
  --color-reprimand-crimson: #FF2E93;
  --color-zpd-amethyst: #B5179E;

  /* Text & Telemetry Tokens */
  --text-pure-luminescence: #F8FAFC;
  --text-subtle-starlight: #94A3B8;

  /* HDR Glow & Shadows */
  --glow-cyan-hdr: 0 0 20px rgba(0, 245, 212, 0.35);
  --glow-gold-hdr: 0 0 20px rgba(255, 209, 102, 0.25);
  --glow-crimson-hdr: 0 0 20px rgba(255, 46, 147, 0.35);
  --glow-amethyst-hdr: 0 0 20px rgba(181, 23, 158, 0.30);
}

/* Wide Color Gamut (Rec.2020 / DCI-P3) Enhancements */
@supports (color: color(display-p3 0 0 0)) {
  :root {
    --bg-deep-obsidian: color(display-p3 0.043 0.059 0.098);
    --bg-obsidian-surface: color(display-p3 0.086 0.122 0.200);
    --color-senku-cyan: color(display-p3 0.000 0.961 0.831);
    --color-scriptural-gold: color(display-p3 1.000 0.820 0.400);
    --color-reprimand-crimson: color(display-p3 1.000 0.180 0.576);
    --color-zpd-amethyst: color(display-p3 0.710 0.090 0.620);
  }
}
```

---

## 5. ASCII Memory Pointer Diagrams & Visual Standards

A core requirement of Senku's teaching method is visualizing low-level hardware realities (RAM, stack frames, heap pointers, registers, nodes) using clean ASCII diagrams.

### 5.1 Standard Pointer Notation Rules
1. **Contiguous Memory Boxes:** Represented using UTF-8 box characters `┌───┬───┐` or standard ASCII `+---+---+`.
2. **Pointer Directions:**
   - Single pointer reference: `-->` or `--->`
   - Double / Two-way reference: `<==>`
   - Dereference / Null reference: `--> NULL` or `--> ∅`
3. **Index Annotations:** Placed directly above or below memory boxes in dimmed text.

### 5.2 ASCII Memory Layout Standards Catalog

#### Pattern A: 1D Contiguous Array Memory Layout
```
Memory Index:     [0]       [1]       [2]       [3]       [4]
Byte Offset:    0x0000    0x0004    0x0008    0x000C    0x0010
              +---------+---------+---------+---------+---------+
Value:        |   42    |   100   |   -15   |   999   |    0    |
              +---------+---------+---------+---------+---------+
                   ^                                       ^
                   |                                       |
             Left Pointer                             Right Pointer
```

#### Pattern B: Linked List Pointer Swapping
```
BEFORE SWAP:
[ Head ] --> [ Node A | 0x04 ] --> [ Node B | 0x08 ] --> [ Node C | 0x0C ] --> NULL
                                        ^
                                        |
                                   curr_ptr

AFTER SWAP (Reverse Step):
[ Head ] --> [ Node B | 0x08 ] --+
                                 |
                                 v
             [ Node A | 0x04 ] <--+    [ Node C | 0x0C ] --> NULL
```

#### Pattern C: Binary Search Tree Partitioning
```
                      [ Root: 50 ] (0x100)
                       /        \
                      /          \
                     v            v
          [ Node: 25 ]            [ Node: 75 ]
           (0x104)                 (0x108)
           /     \                 /     \
          v       v               v       v
      [12]       [37]         [60]       [90]
```

#### Pattern D: Hash Table Bucket Collision Resolution (Chaining)
```
Bucket Index:
[ 0 ] --> NULL
[ 1 ] --> [ Key: "apple" | Val: 5 ] --> [ Key: "banana" | Val: 12 ] --> NULL
[ 2 ] --> NULL
[ 3 ] --> [ Key: "cherry" | Val: 99 ] --> NULL
[ 4 ] --> NULL
```

#### Pattern E: Distributed System Sharding Layout
```
                  +-----------------------------------+
                  |      CLIENT LOAD BALANCER         |
                  +-----------------------------------+
                     /              |              \
           Hash(Key) % 3 = 0  Hash(Key) % 3 = 1  Hash(Key) % 3 = 2
                   /                |                \
                  v                 v                 v
          +---------------+ +---------------+ +---------------+
          | SHARD NODE 0  | | SHARD NODE 1  | | SHARD NODE 2  |
          | (Keys 0-333)  | | (Keys 334-666)| | (Keys 667-999)|
          +---------------+ +---------------+ +---------------+
          | Replica: R0_B | | Replica: R1_B | | Replica: R2_B |
          +---------------+ +---------------+ +---------------+
```

---

## 6. Micro-Interactions, Micro-Animations & Sound Ergonomics

### 6.1 Motion Design & Animation Tokens (Web UI)
All micro-interactions use spring-based physics curves to simulate tactile physical hardware:
- **Card Entry Transition:** `y: [20, 0], opacity: [0, 1]`, `duration: 0.35s`, easing `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Active Focus Pulse:** Border glow pulses slowly between `rgba(0, 245, 212, 0.2)` and `rgba(0, 245, 212, 0.6)` when waiting for user ZPD response.
- **Success Micro-Burst:** When a micro-challenge is solved correctly, the ZPD Amethyst badge bursts into Senku Cyan Emerald with a 12px radial particle explosion.
- **Grace Transition:** When switching into Tier 0 (Scriptural Encouragement), the screen background smoothly shifts color temperature from cool obsidian (`#0B0F19`) to warm obsidian (`#121017`) over 1.2 seconds.

### 6.2 CLI Audio-Visual Feedback
- **Typewriter Effect:** Senku's Scientific Pulse outputs at 60 characters per second to simulate active real-time dialogue.
- **Audio Chimes (Optional Terminal Bell):**
  - Scientific Spark Correct: Soft 880Hz sine chime (`\a`).
  - Grace Reset: Gentle 440Hz warm chord.

---

## 7. Accessibility Floor & Ergonomic Standards

### 7.1 Compliance Specifications
- **WCAG 2.1 AAA Contrast:** All core body typography achieves a minimum contrast ratio of **7.0:1** against backgrounds (Pure Luminescence `#F8FAFC` on Deep Obsidian `#0B0F19` achieves **19.5:1**).
- **Zero Eye-Strain Night Mode:** Pure black base eliminates sub-pixel backlighting bleed on OLED screens. High frequency blue wavelengths (>460nm) are suppressed in typography.
- **Reduced Motion Support:** `@media (prefers-reduced-motion: reduce)` disables background pulse animations, particle bursts, and typewriter delay effects, presenting static blocks instantly.

### 7.2 ARIA Live Region Layout (Web UI)
```html
<main id="teach-me-workbench" role="main">
  <!-- 4-Block Container -->
  <section class="block-scientific-pulse" aria-live="polite">
    <!-- Block 1 Content -->
  </section>
  <section class="block-scriptural-encouragement" aria-live="polite">
    <!-- Block 2 Content -->
  </section>
  <section class="block-zpd-challenge" aria-live="assertive">
    <!-- Block 3 Content -->
  </section>
  <section class="block-okf-sync" aria-expanded="false" role="region" aria-label="OKF Save-Game State">
    <!-- Block 4 Hidden Sync -->
  </section>
</main>
```

---

## 8. State Patterns, Key Journeys & UX Flow Walkthrough

### 8.1 Named Protagonist Journey
- **Protagonist:** Devang (3-Month Intensive Interview Candidate).
- **Context:** Lost job unexpectedly, 3 months to prepare, experiencing high performance anxiety, rusty on raw coding/DSA pointers, strong at high-level tool orchestration.
- **Target Goal:** Re-master Binary Search, Pointer Math, and Dynamic Memory Layouts without copilot crutches.

### 8.2 End-to-End Walkthrough Sequence

```
+---------------------------------------------------------------------------------------+
| STEP 1: INITIALIZATION & DIAGNOSTIC SPARK                                             |
| User enters: "I need to learn Binary Search, but I keep getting off-by-one errors."   |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
| STEP 2: SENKU SOCRATIC DECONSTRUCTION (TIER 1)                                        |
| System renders 4-Block Layout:                                                        |
| 🧪 10B%: Deconstructs memory mid-point calculation: `mid = low + (high - low) / 2`.  |
|      Outputs ASCII 1D Memory Array with `low`, `high`, `mid` pointers.                |
| 📜 GRACE: 2 Timothy 1:7 ("God has not given us a spirit of fear, but of power...").   |
| 🎯 ZPD: "Why do we write `low + (high - low)/2` instead of `(low + high)/2`?"         |
| 💾 OKF: { topic: "Binary Search", mastery: 25%, tier: 1 }                             |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
| STEP 3: USER ERROR & GRACE RE-CENTERING (TIER 0 TRANSITION)                           |
| User enters: "I don't know, math is my weak spot and I'm panicking about interviews."|
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
| STEP 4: DIVINE ANCHOR RE-CENTERING & ATOMIC SIMPLIFICATION                            |
| System detects emotional distress:                                                    |
| 📜 GRACE: Expands Philippians 4:13 & John 14:27. "Be still. You are not defined by    |
|         a temporary setback. Your mind is sound and capable."                         |
| 🧪 10B%: Senku simplifies: "Forget formulas! Imagine a 16-bit integer box that overflows|
|      at 32,767. If `low = 20,000` and `high = 20,000`, what is `low + high`?"        |
| 🎯 ZPD: "Does 40,000 fit inside a 32,767 box?"                                         |
| 💾 OKF: { topic: "Binary Search", mastery: 35%, confidence: 3, tier: 0 }              |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
| STEP 5: EUREKA MOMENT & TIER 2 ELEVATION                                             |
| User enters: "Ah! It overflows 32,767! `low + (high - low)/2` avoids the overflow!"  |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
| STEP 6: MASTERY CONFIRMATION & OKF SAVE-GAME SYNC                                    |
| 🧪 10B%: "10 BILLION PERCENT CORRECT! You just derived integer overflow bounds!"      |
| 🎯 ZPD: Proposes code challenge for `searchInsert` with edge case array `[1]`.        |
| 💾 OKF: { topic: "Binary Search", mastery: 85%, confidence: 5, tier: 2 }              |
+---------------------------------------------------------------------------------------+
```

---

## 9. Summary & Handoff Instructions for Engineering

1. **Front-End Engineers (`bmad-agent-dev`):**
   - Implement the CSS Token Palette in `styles/globals.css` or Tailwind config (`tailwind.config.js`).
   - Construct the `FourBlockLayout` component using React/Next.js with ARIA live region support.
   - Embed Fira Code / JetBrains Mono font rendering for ASCII Memory Diagrams.

2. **Backend / Orchestrator Engineers:**
   - Integrate the system prompt from `senku-teach-me-persona-spec.md`.
   - Ensure every output parser enforces the `### 🔬 1. Scientific Pulse`, `### 📜 2. Divine Anchor`, `### 🎯 3. ZPD Micro-Challenge`, and `### 💾 4. OKF Memory Sync` markdown block structure.
   - Sync the JSON payload from Block 4 into the OKF MCP memory layer after every turn.

---
*End of UI/UX Specification — Teach-Me System*
