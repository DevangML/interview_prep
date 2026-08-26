# Mobile Component Spec 03: Modals → Spring-Physics Bottom Sheets

**Author:** Senior Component Interaction Designer  
**Leadership:** Sally (BMad Design System)  
**Status:** Approved Specification  
**Target:** iOS Safari / Android Chrome / React Native / Flutter  

---

## 1. First-Principles Breakdown: Why Desktop Modals Fail on Mobile

Desktop dialogs are designed for centered presentation on large displays with keyboard access (`Esc` to dismiss) and a mouse to target top-right "X" buttons. When ported to mobile:

1. **Unreachable Dismiss Controls (Top-Right "X"):**
   The top-right corner is the single hardest zone to reach with one hand on modern 6.1"–6.9" mobile devices (the "Dead Zone"). Forcing users to reach the top-right causes grip slippage.
2. **Keyboard Occlusion & Viewport Clipping:**
   Centered dialogs get chopped when the mobile virtual keyboard rises. Input fields inside the modal become hidden beneath the keyboard, leaving the user unable to see what they are typing.
3. **Trapped Scroll & Page Bounce Conflicts:**
   Modal backdrop scroll-locking (`overflow: hidden` on `body`) notoriously breaks on iOS Safari, causing background page bouncing or double-scroll collision where scrolling the modal content unexpectedly scrolls the background page.

### The Mobile Transformation
Replace centered modals with **Spring-Physics Bottom Sheets** featuring **Multi-Detent Snapping** (40% peek, 85% full), **Rubber-Band Resistance**, **Drag Handles**, and **Velocity-Based Fling Dismissal**.

---

## 2. Anatomical Structure & ASCII Layout

```
+-------------------------------------------------------------+ [Status Bar: 44px]
|                                                             |
| +---------------------------------------------------------+ | [Background Dim: Scrim]
| |               [ Optional Backdrop Blur: 12px ]          | | `rgba(0,0,0,0.5)`
| |                                                         | |
| | +-----------------------------------------------------+ | | [Sheet Container]
| | |                  === [Drag Pill] ===                | | | 36px x 5px (Grey-400)
| | |                                                     | | |
| | | [Header: Title (18pt Semibold)]       [Close/Done]  | | | 48px Touch Target
| | | --------------------------------------------------- | | | 1px Border Subdued
| | | [Content Area - Scrollable when expanded]           | | |
| | |                                                     | | |
| | |   Detent State 1: 40dvh (Peek / Preview)            | | |
| | |   Detent State 2: 85dvh (Full / Interactive)        | | |
| | |                                                     | | |
| | | --------------------------------------------------- | | |
| | | [Sticky Bottom Action Buttons (if form/action)]     | | | 52px Primary Button
| | | [     Confirm / Save     ] [   Cancel   ]           | | | + env(safe-area-bottom)
| | +-----------------------------------------------------+ | |
| +---------------------------------------------------------+ |
+-------------------------------------------------------------+
```

---

## 3. Interaction & Gesture State Machine

```
               +-------------------+
               |      CLOSED       |
               +---------+---------+
                         |
                 Trigger Tap Event
                         |
                         v
               +-------------------+
               |  PEEK (40% Detent)|
               +---------+---------+
                         |
       +-----------------+-----------------+
       |                                   |
   Pan Down (dy > 0)                   Pan Up (dy < 0)
       |                                   |
       v                                   v
+--------------+                   +---------------+
| DRAG CLOSING |                   | DRAG EXPAND   |
+-------+------+                   +-------+-------+
        |                                  |
   touchend (vy)                      touchend (vy)
        |                                  |
+-------+--------------------+     +-------+--------------------+
| vy > 0.8 m/s: DISMISS      |     | vy < -0.8 m/s: EXPAND 85%  |
| vy < 0.8 & dy < 80px: PEEK |     | dy > 120px: SNAP TO 85%    |
+----------------------------+     +----------------------------+
```

### Motion & Physics Parameters
- **Detent Snap Formula:**
  $$E_{\text{snap}} = \arg\min_{d \in \{0, 0.4, 0.85\}} |y_{\text{current}} - (d \cdot H) + \tau \cdot v_y|$$
  where $\tau = 0.15\text{s}$ (velocity lookahead projection).
- **Spring Configuration:**
  - Standard Detent Snap: `{ stiffness: 350, damping: 30, mass: 1.0 }`
  - Rubber-Band Overshoot: `{ stiffness: 450, damping: 25, mass: 0.8 }`
- **Rubber-Banding at 85% Cap:**
  $$y_{\text{display}} = y_{\text{cap}} - (y_{\text{cap}} - y_{\text{drag}})^{0.75}$$
- **Haptics:**
  - Haptic tick (`UIImpactFeedbackGenerator.light`) when snapping into any detent anchor.

---

## 4. Viewport & Keyboard Physics

```
+------------------------------------+
| Bottom Sheet with Keyboard Open    |
| +--------------------------------+ |
| | Modal Header                   | |
| | Input Field (Focused)          | |
| +--------------------------------+ |
| [Keyboard (Height: K)]             |
|                                    |
| Physics Rule:                      |
| 1. Detent locks at 100% visual     |
|    height minus safe top (48px).   |
| 2. Bottom Sheet transform:         |
|    translateY(0) relative to       |
|    Visual Viewport bottom.         |
+------------------------------------+
```

- When an `<input>` or `<textarea>` inside the bottom sheet receives focus, the sheet automatically transitions to **Expanded Detent (85–92dvh)** and disables downward gesture dismissal while the keyboard is open.
- Background `touchmove` is strictly cancelled (`e.preventDefault()`) on backdrop scrim to prevent scroll bleed-through.

---

## 5. Comprehensive Edge Cases & WCAG 2.2 Semantics

| Scenario | Behavior Specification |
| :--- | :--- |
| **Nested Scroll vs Sheet Pan** | When content is scrolled to `scrollTop > 0`, pan down scrolls the internal content. When `scrollTop === 0`, downward pan engages the bottom sheet drag gesture. |
| **Rapid Fling Dismissal** | Downward fling velocity $v_y > 1.2\text{ m/s}$ dismisses immediately without intermediate detent catch. |
| **Accessibility (WCAG 2.2)** | Sheet root: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="sheet-title"`. Focus trap active inside modal. Explicit `Dismiss` button provided in header for non-gesture users. |
| **VoiceOver Announcement** | Announce on open: `"Dialog opened: [Title]. Swipe down with two fingers to dismiss or use the Close button."` |
