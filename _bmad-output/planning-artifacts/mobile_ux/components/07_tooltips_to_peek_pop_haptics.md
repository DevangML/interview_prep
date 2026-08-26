# Mobile Component Spec 07: Tooltips → Tap Info Targets & Peek-and-Pop Haptics

**Author:** Senior Component Interaction Designer  
**Leadership:** Sally (BMad Design System)  
**Status:** Approved Specification  
**Target:** iOS Safari / Android Chrome / React Native / Flutter  

---

## 1. First-Principles Breakdown: Why Desktop Hover Tooltips Fail on Mobile

Desktop tooltips rely on mouse cursor hover (`mouseenter` / `mouseleave`), zero-click progressive disclosure, and negligible screen space footprint. On touch-first mobile platforms:

1. **Hover Does Not Exist on Touch Devices:**
   Emulated `:hover` on mobile fires on the first tap and remains permanently "stuck" until another area of the screen is tapped, causing ghost UI states and visual clutter.
2. **Accidental Navigation & Blocked Gestures:**
   If a tooltip is attached to an actionable link or icon button, tapping triggers both the tooltip and the link navigation simultaneously, or traps the user in a state where they cannot click the actual link.
3. **Occlusion by User Finger:**
   Small tooltip popovers appearing immediately above or below the tapped point are completely covered by the user's fingertip (10–14mm wide).

### The Mobile Transformation
Eliminate all hover-based tooltips in favor of two explicit touch paradigms:
- **Explanatory Metadata:** **Explicit Tap Info Targets (`ⓘ`)** that open non-blocking contextual callout bubbles or micro bottom sheets.
- **Rich Content Previews:** **Haptic Long-Press (Peek & Pop)** with a focused floating action tray and blurred backdrop.

---

## 2. Anatomical Structure & ASCII Layout

```
A) EXPLICIT TAP INFO TARGET (Inline Micro-Popover)
+-------------------------------------------------------------+
| Estimated Annual APR: 5.24%   [ ⓘ Info Target - 44px Box ]  |
|                               +---------------------------+ |
|                               | [x]                       | | Popover Bubble
|                               | APR includes base interest| | 12pt High Contrast
|                               | rate plus regulatory fees.| | Pointing Arrow: 8px
|                               +---------------------------+ | Auto-dismiss on tap
+-------------------------------------------------------------+

B) LONG-PRESS PEEK & POP (Preview Modal + Quick Actions)
+-------------------------------------------------------------+ [Blurred Backdrop: 16px]
|                                                             |
|         +-----------------------------------------+         | [Elevated Preview Card]
|         | Order #9042 - Detailed Summary          |         | Scale: 1.02
|         | Items: 3x Mechanical Keyboard Switches   |         | Elevation: 24px Shadow
|         | Status: Out for Delivery (Arriving 3 PM)|         |
|         +-----------------------------------------+         |
|                                                             |
|         +-----------------------------------------+         | [Floating Action Tray]
|         | [ 🚚 Track Driver ]   [ 💬 Contact Support ] |     | 48px Touch Targets
|         | [ 📄 Download Invoice ]                |         |
|         +-----------------------------------------+         |
|                                                             |
+-------------------------------------------------------------+
```

---

## 3. Interaction & Gesture State Machine

```
              +----------------------+
              | IDLE (TOUCH WAITING) |
              +----------+-----------+
                         |
                 touchstart (x0, y0)
                         |
                         v
              +----------------------+
              | TIMER (350ms Hold)   |
              +----------+-----------+
                         |
       +-----------------+-----------------+
       |                                   |
touchmove > 8px (Cancel)             Timer Expires (350ms)
       |                                   |
       v                                   v
+---------------+                  +----------------------+
| PASS TO SCROLL|                  | PEEK STATE ENGAGED   |
+---------------+                  | Haptic: MediumImpact |
                                   | Scale target to 1.02 |
                                   +----------+-----------+
                                              |
                                     User Releases Finger
                                              |
                                              v
                                   +----------------------+
                                   | POP ACTION TRAY      |
                                   | Haptic: LightImpact  |
                                   | Focus first action   |
                                   +----------------------+
```

### Motion & Physics Parameters
- **Long-Press Threshold:** `350ms` holding time with max allowable touch drift `8px`.
- **Card Pop Spring Physics:** `{ mass: 0.9, stiffness: 380, damping: 24 }`.
- **Backdrop Blur Transition:** `backdrop-filter: blur(16px)` animated over `180ms ease-out`.
- **Haptic Sequence:**
  - `350ms` mark: `UIImpactFeedbackGenerator(style: .medium)` (signals preview lock).
  - Pop tray display: `UIImpactFeedbackGenerator(style: .light)`.

---

## 4. Viewport & Keyboard Physics

```
+------------------------------------+
| Viewport Boundary Placement        |
|                                    |
| 1. Dynamic Popover Orientation:    |
|    - If targetY > viewportHeight/2 |
|      -> Popover flips ABOVE target |
|    - Else                          |
|      -> Popover flips BELOW target |
|                                    |
| 2. Safe Edge Clamping:             |
|    min(left, screenWidth - 16px)   |
|    max(left, 16px)                 |
+------------------------------------+
```

- Popovers dynamically calculate clearance against `visualViewport` boundaries to prevent being clipped by screen edges or dynamic browser address bars.

---

## 5. Comprehensive Edge Cases & WCAG 2.2 Semantics

| Scenario | Behavior Specification |
| :--- | :--- |
| **Accidental Trigger During Scroll** | If finger moves $>8\text{px}$ during the 350ms hold window, the long-press timer is immediately cancelled and native vertical scroll takes precedence. |
| **Dismissal Ergonomics** | Tapping anywhere outside the Peek & Pop modal or pressing the device back button dismisses the overlay with zero animation lag. |
| **Accessibility (WCAG 2.2)** | Long-press interactions MUST have a visible equivalent (e.g. an explicit `•••` action button). Info targets use `role="tooltip"` or `role="dialog"` with `aria-expanded`. |
| **Screen Reader Announcement** | Tap info button triggers: `aria-live="polite"` reading the explanation text immediately upon activation. |
