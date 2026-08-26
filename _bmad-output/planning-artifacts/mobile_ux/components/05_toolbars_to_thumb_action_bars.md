# Mobile Component Spec 05: Toolbars → Thumb Action Bars & Contextual FABs

**Author:** Senior Component Interaction Designer  
**Leadership:** Sally (BMad Design System)  
**Status:** Approved Specification  
**Target:** iOS Safari / Android Chrome / React Native / Flutter  

---

## 1. First-Principles Breakdown: Why Desktop Top Toolbars Fail on Mobile

Desktop applications pin primary tools, actions, and menus along the top header bar (e.g. `File, Edit, View, Insert, Format`). On mobile devices:

1. **The Ergonomic "Dead Zone":**
   According to Steven Hoober’s mobile touch research, over 75% of users operate phones with a single thumb. On devices taller than 140mm (all modern smartphones), the top 25% of the screen is an extreme reach zone requiring grip adjustment.
2. **Icon Overcrowding & Cognitive Noise:**
   Compressing 8–12 desktop action icons into a 375px–430px top bar results in tiny icons (<20px) spaced <8px apart. This leads to accidental clicks on destructive or unintended tools.
3. **Loss of Primary Focus:**
   Reaching to the top of the device forces the user's hand to physically cross the central viewport, blocking the very content they are trying to manipulate.

### The Mobile Transformation
Relocate all primary command structures to the **Natural Thumb Zone (Bottom 33% of Screen)** using a **Floating Bottom Thumb Action Bar** and a **Contextual Floating Action Button (FAB) with Speed-Dial Expansion**.

---

## 2. Anatomical Structure & ASCII Layout

```
+-------------------------------------------------------------+ [Top Bar: 44px - Info Only]
| [App Logo / Title]                              [User Avatar]| Pure Status / Read-Only
+-------------------------------------------------------------+
|                                                             |
|                     [ VIEWPORT CONTENT ]                    |
|                 (Unobstructed Reading Area)                 |
|                                                             |
|                                                             |
|                                                             |
|                                   +-----------------------+ | [Speed Dial Menu]
|                                   | (3) 📷 Scan Document  | | (Expands upward on FAB tap)
|                                   | (2) 📁 Import File    | | 44px Pill + Label
|                                   | (1) ✍️ New Note        | |
|                                   +-----------------------+ |
+-------------------------------------------------------------+
| [FLOATING BOTTOM THUMB ACTION BAR]                          | 56px Height
| +---------------------------------------------------------+ | Floats 16px above bottom
| | [ 🏠 Home ]  [ 🔍 Search ]  [ ★ Star ]      [ ( + ) FAB ] | | FAB: 56x56px Hero Target
| +---------------------------------------------------------+ | 16px Blur Frosted Glass
| [Bottom Safe Area: env(safe-area-inset-bottom)]             |
+-------------------------------------------------------------+
```

---

## 3. Interaction & Gesture State Machine

```
              +----------------------+
              | IDLE (BAR DOCKED)    |
              +----------+-----------+
                         |
       +-----------------+-----------------+
       |                                   |
Scroll Down (dy > 12px)            Scroll Up (dy < -8px)
       |                                   |
       v                                   v
+-----------------------+          +-----------------------+
| AUTO-COLLAPSE BAR     |          | EXPAND / REVEAL BAR   |
| translateY(+100%)     |          | translateY(0)         |
| Duration: 200ms       |          | Spring: Snappy        |
+-----------------------+          +-----------------------+
                         |
                  Tap FAB Button
                         |
                         v
              +----------------------+
              | SPEED DIAL EXPANDED  |
              | Backdrop Dim 40%     |
              | FAB Rotates 45 deg (X)|
              | Haptic: MediumImpact |
              +----------+-----------+
                         |
       +-----------------+-----------------+
       |                                   |
Tap Backdrop / Scrim                Tap Speed Dial Action
       |                                   |
       v                                   v
+-----------------------+          +-----------------------+
| COLLAPSE SPEED DIAL   |          | EXECUTE ACTION        |
| FAB Rotates Back to + |          | Haptic: HeavyImpact   |
| Haptic: LightImpact   |          | Dismiss Speed Dial    |
+-----------------------+          +-----------------------+
```

### Motion & Physics Parameters
- **FAB Morphing:** `transform: rotate(45deg)` with spring `{ mass: 0.8, stiffness: 400, damping: 22 }`.
- **Staggered Speed-Dial Reveal:**
  - Item 1: Delay `0ms`, Spring `{ stiffness: 350, damping: 25 }`
  - Item 2: Delay `40ms`, Spring `{ stiffness: 350, damping: 25 }`
  - Item 3: Delay `80ms`, Spring `{ stiffness: 350, damping: 25 }`
- **Haptic Tuning:**
  - FAB Tap: `UIImpactFeedbackGenerator(style: .medium)`.
  - Sub-item Selection: `UIImpactFeedbackGenerator(style: .rigid)`.

---

## 4. Viewport & Keyboard Physics

```
+------------------------------------+
| Viewport Scroll & Keyboard Rules   |
|                                    |
| 1. Keyboard Opens:                 |
|    - Speed dial automatically      |
|      collapses.                    |
|    - Bottom Action Bar slides down |
|      (hidden) to prioritize input. |
|                                    |
| 2. Scrolling Content:              |
|    - Scroll down -> Hide Bar       |
|    - Scroll up -> Show Bar         |
+------------------------------------+
```

- When the software keyboard is invoked, the FAB and Floating Action Bar smoothly animate to `translateY(120%)` with a `150ms` ease-in curve, allowing full keyboard clearance without visual clipping.
- On keyboard blur/dismiss, the bar returns to `translateY(0)` with a spring transition.

---

## 5. Comprehensive Edge Cases & WCAG 2.2 Semantics

| Scenario | Behavior Specification |
| :--- | :--- |
| **Scroll-to-Dismiss Conflict** | If user scrolls rapidly to the absolute bottom of the page (`scrollTop + clientHeight >= scrollHeight - 20px`), the Action Bar forcefully re-appears so the user never gets stranded without actions. |
| **Dynamic Notch / Home Indicator** | Container strictly applies `padding-bottom: max(16px, env(safe-area-inset-bottom))`. |
| **Accessibility (WCAG 2.2)** | FAB button has `aria-expanded="false"` (toggles to `"true"`), `aria-haspopup="menu"`, and `role="button"`. Speed dial items use `role="menuitem"`. |
| **Minimum Tap Targets** | All toolbar icon buttons have an active tap hit-box of at least `48x48px` even if visual icon is `24x24px`. |
