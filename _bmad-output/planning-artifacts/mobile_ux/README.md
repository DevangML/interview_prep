# Mobile-First First-Principles UX Design System & Component Rewrite Suite

> **Lead Architect**: Sally (`bmad-agent-ux-designer`)  
> **Target Standard**: Google Labs `DESIGN.md` + BMad `EXPERIENCE.md` + WCAG 2.2 AAA Accessibility  
> **Status**: Production-Ready Architectural Reference  

---

## 🧭 Master Navigation Index

### 1. System Spines & Foundational Standards
* [**`DESIGN.md`**](file:///Users/devang/Desktop/interview_prep/_bmad-output/planning-artifacts/mobile_ux/DESIGN.md)  
  *Visual identity, design tokens, Steven Hoober thumb ergonomics zones, 48×48dp touch targets, critical spring physics constants, z-index elevation hierarchy, and multi-tier haptic vibration patterns.*
* [**`EXPERIENCE.md`**](file:///Users/devang/Desktop/interview_prep/_bmad-output/planning-artifacts/mobile_ux/EXPERIENCE.md)  
  *Behavioral specification, gesture state machines (pan, velocity release, rubber-banding), dynamic viewport physics (`100dvh`, `interactive-widget=resizes-content`), keyboard auto-scrolling with 24px clearance, and accessibility focus management.*

---

### 2. First-Principles Component Rewrites

| # | Desktop Anti-Pattern | Mobile First-Principles Paradigm | Specification Link |
|---|---|---|---|
| 01 | **10-Column Data Table** with horizontal scroll traps | **Swipeable Card Stream** with KPI stacking, swipe-to-act & 70% Bottom Sheet details | [`01_data_tables_to_card_streams.md`](file:///Users/devang/Desktop/interview_prep/_bmad-output/planning-artifacts/mobile_ux/components/01_data_tables_to_card_streams.md) |
| 02 | **Cascading Select Dropdowns** with occluded options | **Searchable Bottom Sheet Drawers** (>5 items), **Segmented Thumb Bars** (≤4 items), & **Haptic Wheel Pickers** | [`02_dropdowns_to_bottom_drawers_pickers.md`](file:///Users/devang/Desktop/interview_prep/_bmad-output/planning-artifacts/mobile_ux/components/02_dropdowns_to_bottom_drawers_pickers.md) |
| 03 | **Centered Modals** with unreachable top-right `✕` | **Multi-Detent Spring Bottom Sheets** (40% Peek / 85% Full) with velocity dismissal & drag handle | [`03_modals_to_spring_bottom_sheets.md`](file:///Users/devang/Desktop/interview_prep/_bmad-output/planning-artifacts/mobile_ux/components/03_modals_to_spring_bottom_sheets.md) |
| 04 | **Monolithic 20-Field Forms** occluded by keyboard | **Single-Concept Paged Steppers** with auto-advance, contextual `inputmode`, & **Sticky Keyboard Accessory Bar** | [`04_multi_step_forms_keyboard_trays.md`](file:///Users/devang/Desktop/interview_prep/_bmad-output/planning-artifacts/mobile_ux/components/04_multi_step_forms_keyboard_trays.md) |
| 05 | **Top-Heavy Desktop Toolbars** | **Floating Thumb Command Bar**, contextual **Speed-Dial FAB**, & gesture-triggered radial action trays | [`05_toolbars_to_thumb_action_bars.md`](file:///Users/devang/Desktop/interview_prep/_bmad-output/planning-artifacts/mobile_ux/components/05_toolbars_to_thumb_action_bars.md) |
| 06 | **Faceted Left Sidebar Filters** | **Sticky Horizontal Chip Carousel** (Top 4 filters) + **"All Filters" Dynamic Bottom Drawer** with live counts | [`06_filters_to_sticky_chips_drawers.md`](file:///Users/devang/Desktop/interview_prep/_bmad-output/planning-artifacts/mobile_ux/components/06_filters_to_sticky_chips_drawers.md) |
| 07 | **Hover-Only Info Tooltips** (stuck touch states) | **Explicit Tap Info Hints** & **Haptic Long-Press (Peek & Pop)** with contextual action cards | [`07_tooltips_to_peek_pop_haptics.md`](file:///Users/devang/Desktop/interview_prep/_bmad-output/planning-artifacts/mobile_ux/components/07_tooltips_to_peek_pop_haptics.md) |
| 08 | **Desktop Floating Rich-Text Editor Bars** | **Keyboard-Pinned Format Accessory Ribbon**, voice dictation triggers, & markdown slash commands | [`08_rich_text_to_accessory_trays.md`](file:///Users/devang/Desktop/interview_prep/_bmad-output/planning-artifacts/mobile_ux/components/08_rich_text_to_accessory_trays.md) |

---

### 3. Standalone Interactive Mobile Simulator & Prototype
* [**`prototype/index.html`**](file:///Users/devang/Desktop/interview_prep/_bmad-output/planning-artifacts/mobile_ux/prototype/index.html)  
  *Zero-dependency, standalone HTML5/CSS3/Vanilla JS mobile simulator modeled as an iPhone 16 Pro with dynamic island, gesture swipeable cards, multi-detent draggable bottom sheets, searchable picker drawers, virtual keyboard simulation, and synthesized Web Audio haptic feedback.*
