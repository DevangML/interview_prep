# Mobile Component Spec 01: Data Tables → Card Streams

**Author:** Senior Component Interaction Designer  
**Leadership:** Sally (BMad Design System)  
**Status:** Approved Specification  
**Target:** iOS Safari / Android Chrome / React Native / Flutter  

---

## 1. First-Principles Breakdown: Why Desktop Tables Fail on Mobile

Desktop data tables rely on broad horizontal viewports (1200px+), high mouse pointer precision (~1px cursor), and simultaneous multi-column visual scanning. Transposing this paradigm naively to mobile via horizontal scrolling (`overflow-x: auto`) or multi-column compression fails across physical, cognitive, and ergonomic dimensions:

1. **Thumb Reach & Horizontal Scroll Traps (Fitts's Law):**
   Horizontal scrolling nested inside a vertically scrolling page hijacks vertical gesture momentum. Users attempting to scroll down trigger accidental horizontal pans, trapping touch focus inside an arbitrary column boundary.
2. **Finger Occlusion & Tiny Touch Targets:**
   A standard table row is 32–40px tall with actionable icons (edit, delete) clustered within 16–24px boxes. A human thumb pad averages 10–14mm (44–58px), causing high error rates and visual occlusion of adjacent row metadata.
3. **Cognitive Overload & Broken Visual Anchors:**
   When scrolling horizontally, the row identifier (e.g., ID or Name) scrolls out of view unless pinned with `position: sticky`. Even with pinned columns, cognitive comparison across 6+ columns exceeds mobile working memory without desktop hover-highlight guides.

### The Mobile Transformation
Convert tabular rows into **Card Streams** with **Hierarchical KPI Stacking**, **Bi-directional Swipe Gestures** for secondary actions, and **Tap-to-Peek 70% Detent Bottom Sheets** for full record inspection.

---

## 2. Anatomical Structure & ASCII Layout

```
+-------------------------------------------------------------+ [Top Safe Area: env(safe-area-inset-top)]
| [Sticky Header / Filter Chips]     [Search] [Batch Select]  | 48px Touch Target
+-------------------------------------------------------------+
|                                                             |
| +---------------------------------------------------------+ |
| | [Card Stream Item - Default State]                      | |
| | +------------------------------------+ +--------------+ | |
| | | Primary Title (Bold 16pt / 20px)   | | Status Badge | | |
| | | Subtitle / Secondary Meta (13pt)   | | [ Active ]   | | |
| | +------------------------------------+ +--------------+ | |
| | ------------------------------------------------------- | | Divider: 1px subtle
| | [KPI Metric A]       [KPI Metric B]      [KPI Metric C] | | Stacking Grid: 3 cols
| | Value ($12,450)      Value (94.2%)       Value (4h ago) | | Bold 14pt / Sub 11pt
| +---------------------------------------------------------+ | Min Height: 88px
|                                                             |
| +---------------------------------------------------------+ |
| | [Card Stream Item - Active Left Swipe: Star / Archive]  | |
| | [★ Star (Gold)] [📦 Archive (Blue)] | Visible Card Area | | Swipe Offset: >72px
| | <--- Swipe Left Gesture             |                   | | Action Width: 72px ea
| +---------------------------------------------------------+ |
|                                                             |
| +---------------------------------------------------------+ |
| | [Card Stream Item - Active Right Swipe: Destructive]    | |
| | Visible Card Area | [🗑️ Delete (Red) - 80px Target]    | | Swipe Right: >80px
| |                   | ---> Trigger Threshold              | | Full swipe: Confirm
| +---------------------------------------------------------+ |
|                                                             |
+-------------------------------------------------------------+
| [Sticky Batch Action Bar - Appears on Multi-Select Mode]    | 56px + env(safe-area-bottom)
| [  Select All (12)  ]      [  Archive All  ]   [  Delete  ] |
+-------------------------------------------------------------+
```

---

## 3. Interaction & Gesture State Machine

```
      +--------------+
      |     IDLE     |
      +-------+------+
              |
      touchstart (x0, y0)
              |
              v
     +--------+--------+      |dx| > |dy| & |dx| > 10px
     | GESTURE PENDING | ----------------------------------> +---------------------+
     +--------+--------+                                     | HORIZONTAL PANNING  |
              |                                              +----------+----------+
              | |dy| > |dx|                                             |
              v                                                touchmove (dx)
     +-----------------+                                                v
     | VERTICAL SCROLL | (Pass to native scroll)             +----------+----------+
     +-----------------+                                     | Check dx Threshold: |
                                                             | dx > +72px: Star/Arc|
                                                             | dx < -80px: Delete  |
                                                             +----------+----------+
                                                                        |
                                                               touchend (velocity vx)
                                                                        |
                                               +------------------------+------------------------+
                                               |                                                 |
                                     vx > 0.5 or dx > threshold                    vx <= 0.5 & dx < threshold
                                               v                                                 v
                                    +----------------------+                           +-------------------+
                                    | SNAP OPEN / EXECUTE  |                           | SPRING SNAP BACK  |
                                    | Haptic: MediumImpact |                           | Stiffness: 300    |
                                    +----------------------+                           | Damping: 28       |
                                                                                       +-------------------+
```

### Motion & Physics Parameters
- **Spring Config:** `{ mass: 1.0, stiffness: 320, damping: 26 }` (smooth snap without ringing overshoot).
- **Rubber-Banding Resistance:** `offset = dx * (1 / (1 + (dx / maxDistance) * 0.55))`.
- **Haptic Triggers:**
  - **Threshold Crossed:** `UIImpactFeedbackGenerator(style: .medium)` / Android `HapticFeedbackConstants.CONTEXT_CLICK`.
  - **Full Swipe Trigger Reached:** `UIImpactFeedbackGenerator(style: .heavy)` / `HapticFeedbackConstants.CONFIRM`.

---

## 4. Viewport & Keyboard Physics

```
+------------------------------------+
| Dynamic Viewport (100dvh)          |
| +--------------------------------+ |
| | Top Filter Bar                 | |
| | Card Stream List               | |
| | +----------------------------+ | |
| | | Focused Item: Tap Card     | | | ---> Expands 70% Detent Sheet
| | +----------------------------+ | |
| +--------------------------------+ |
| [Keyboard Opens (300px)]           |
| +--------------------------------+ |
| | Sheet shifts to 90dvh          | | Auto-scroll focused input into view
| | Keyboard Accessory Bar pinned  | | Sticky to window.visualViewport
| +--------------------------------+ |
+------------------------------------+
```

- **Dynamic Viewport Unit:** Container uses `height: 100dvh` to eliminate mobile Safari bar jump artifacts.
- **Detent Hierarchy:**
  - Default Tap on Card: Opens **70% Detent Peek Sheet** (`min(70dvh, 560px)`).
  - Search / Form Focus inside Peek Sheet: Automatically expands to **92% Detent** to prevent keyboard occlusion.

---

## 5. Comprehensive Edge Cases & WCAG 2.2 Semantics

| Scenario | Behavior Specification |
| :--- | :--- |
| **Extreme Text Truncation** | Primary Title: 2 lines max with `-webkit-line-clamp: 2`, secondary text: 1 line with `text-overflow: ellipsis`. Tap expands bottom sheet to reveal full strings without clipping. |
| **High Latency / Offline** | Optimistic UI update on swipe-action. If mutation fails after 4s timeout, card slides back with red shake animation (`translateX(-8px) -> translateX(8px)`) and sticky Toast with `Undo`. |
| **Accessibility (WCAG 2.2)** | Touch targets strictly `>= 48x48px`. Swipe actions must have accessibility action alternatives in VoiceOver / TalkBack rotor (`accessibilityCustomActions`). |
| **Screen Reader Semantics** | Card container role: `role="article"` with `aria-label="Order 4092, Total $12,450, Status Active. Double tap to view details, swipe up/down for actions"`. |
