# Mobile UX Experience Specification (EXPERIENCE.md)

## 1. Ergonomic Foundation & System Principles

The application is architected around mobile touch physics, immediate tactile acknowledgment, and predictable navigation hierarchies.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       MOBILE EXPERIENCE PRINCIPLES                      │
├──────────────────────────┬──────────────────────────────────────────────┤
│ 1. Direct Manipulation   │ UI objects track finger position 1:1 with    │
│                          │ zero perceived latency (<16ms response).     │
│ 2. Predictive Dismissal  │ Gesture intent combines distance & velocity; │
│                          │ animations settle via critically damped      │
│                          │ spring physics.                              │
│ 3. Keyboard Resilience   │ Viewports never obscure active focus;        │
│                          │ layout dynamically accommodates input frames.│
└──────────────────────────┴──────────────────────────────────────────────┘
```

---

## 2. Information Architecture & Navigation

### 2.1 Navigation Model Topography
Navigation is structured with a flat primary hub (3 to 5 persistent tabs) paired with modal and drill-down navigation stacks.

```
                     ┌───────────────────────────┐
                     │   Persistent Bottom Nav   │
                     │  [Tab1] [Tab2] [Tab3] ... │
                     └─────────────┬─────────────┘
                                   │ Push Stack (Drill-Down)
                                   ▼
        ┌─────────────────────────────────────────────────────┐
        │ Child View (Level N+1)                              │
        │ - Left-to-Right Edge Swipe back to parent           │
        │ - Sticky Bottom Action Dock / Accessory Bar         │
        └──────────────────────────┬──────────────────────────┘
                                   │ Present Modal / Sheet
                                   ▼
        ┌─────────────────────────────────────────────────────┐
        │ Bottom Sheet / Modal Overlay                        │
        │ - Drag handle with 3 snap points (25%, 50%, 90% dvh)│
        │ - Downward flick velocity > 800px/s dismisses sheet │
        └─────────────────────────────────────────────────────┘
```

### 2.2 Navigation Primitives & Behaviors

| Pattern | Viewport Placement | Dismissal Gesture | State Preservation |
| :--- | :--- | :--- | :--- |
| **Bottom Navigation** | Fixed Base (0–64px + `env(safe-area-inset-bottom)`) | N/A (Root Level) | Retains scroll position and tab sub-stack |
| **Drill-down Push/Pop** | Fullscreen Canvas | LTR Edge Swipe (`0–24px` left margin) | Restores exact scroll coordinate on Pop |
| **Modal Bottom Sheet** | Bottom Docked (`25%` / `50%` / `90% dvh`) | Downward Pan / Pull Down past threshold | State reset on dismiss; auto-saved draft |
| **Contextual Toast** | Floating Dock (`16px` above bottom bar) | Swipe Left/Right to dismiss or 4s timeout | Transient non-blocking feedback |

---

## 3. Voice, Tone & Microcopy Standard

Mobile screen real estate requires compressed, highly scannable microcopy with unambiguous imperative verbs.

```
+------------------------------------+------------------------------------+
|  INCORRECT (Verbose / Ambiguous)   |     CORRECT (Action-Oriented)      |
+------------------------------------+------------------------------------+
| "Are you sure you want to proceed  | "Delete Interview Session?"        |
| with deleting this item?"          |                                    |
| [Cancel] [OK]                      | [Keep Session] [Delete Session]    |
+------------------------------------+------------------------------------+
| "An unexpected server error        | "Connection lost. Tap to retry."   |
| occurred while syncing."           |                                    |
|                                    | [Retry Sync]                       |
+------------------------------------+------------------------------------+
```

### 3.1 Feedback Verbs & Latency Expectations
- **Immediate State (0ms - 50ms)**: Visual press state + Haptic `selection` / `impactLight`.
- **Short Async (50ms - 300ms)**: Inline spinner replaces icon inside CTA button (button width locked).
- **Long Async (> 300ms)**: Skeleton loader replaces content containers with 1.5s pulse shimmer.

---

## 4. Interaction Primitives & Kinematics

```
+───────────────────+──────────────────────+───────────────────+──────────────────────────+
| Primitive         | Touch Geometry       | Activation Time   | Tactile / Visual Output  |
+───────────────────+──────────────────────+───────────────────+──────────────────────────+
| **Tap**           | Single point release | < 250ms duration  | Haptic `selection`,      |
|                   | within < 10px delta  |                   | Scale(0.97) ripple       |
| **Double-Tap**    | 2 taps within 24px   | < 300ms interval  | Zoom toggle / Quick save |
| **Long-Press**    | Continuous contact   | >= 500ms hold     | Haptic `impactHeavy`,    |
|                   | within < 8px delta   |                   | Context sheet pop-over   |
| **Drag / Pan**    | Translation vector   | Immediate on drag | 1:1 positional tracking  |
|                   | (X or Y axis)        | > 10px delta      | Rubber-band at bounds    |
| **Velocity Swipe**| Fast fling vector    | Release velocity  | Momentum glide or snap   |
|                   | (> 800 px/s)         | > 800 px/s        | to next discrete step    |
| **Pinch-to-Zoom** | Two-finger anchor    | Continuous        | Clamped between 1x - 3.5x|
+───────────────────+──────────────────────+───────────────────+──────────────────────────+
```

---

## 5. Gesture State Machine: Drag & Elastic Dismiss

Below is the state transition model for bottom sheets, swipeable cards, and dismissible modals.

```
                        [ IDLE ]
                           │
                           │ TouchDown (PointerDown event)
                           ▼
                    [ TOUCH_DOWN ] (Visual scale: 0.98, timer start)
                           │
                           │ PointerMove (deltaY > 10px)
                           ▼
                      [ DRAGGING ] <───────────────────────────┐
                      │  (1:1 Finger tracking)                 │
                      │                                        │ PointerMove
                      ├── Past Max Bound?                      │ within bounds
                      │   │                                    │
                      │   ▼                                    │
                      │ [ ELASTIC_RESISTANCE ] ────────────────┘
                      │   (Delta scaled by factor 0.35)
                      │
                      │ PointerUp / Release
                      ▼
             [ VELOCITY_DISTANCE_CHECK ]
             ├── Displaced > 120px OR Velocity > 800px/s ──► [ DISMISS_SPRING ]
             │                                                 (Damping: 22, Stiff: 320)
             └── Below Thresholds ─────────────────────────► [ REVERT_SPRING ]
                                                               (Damping: 30, Stiff: 400)
```

### 5.1 State Transition Matrix

| Current State | Event Trigger | Next State | Animation & Physics | Haptic Event |
| :--- | :--- | :--- | :--- | :--- |
| `IDLE` | `touchstart` | `TOUCH_DOWN` | `transform: scale(0.98)` | `selection` (10ms) |
| `TOUCH_DOWN` | `touchmove` ($\Delta > 10px$) | `DRAGGING` | Direct CSS transform `translateY(y)` | None |
| `DRAGGING` | `y > max_y` | `ELASTIC_RESISTANCE` | $y_{eff} = y_{max} + (y - y_{max}) \times 0.35$ | `edge_bounce_tick` |
| `DRAGGING` | `touchend` ($v > 800 \text{px/s}$) | `DISMISS_SPRING` | Spring settle to $+100\text{dvh}$ | `impact_medium` |
| `DRAGGING` | `touchend` ($y > 120\text{px}$) | `DISMISS_SPRING` | Spring settle to $+100\text{dvh}$ | `impact_medium` |
| `DRAGGING` | `touchend` (below threshold) | `REVERT_SPRING` | Spring settle to origin `y = 0` | None |

---

## 6. Dynamic Viewport & Virtual Keyboard Strategy

Mobile virtual keyboards occlude up to 50% of the viewport height and fire asynchronous resize events.

```
       WITHOUT DYNAMIC MANAGEMENT                WITH VIRTUAL KEYBOARD ENGINE
     ┌────────────────────────────┐             ┌────────────────────────────┐
     │ Top Navigation             │             │ Top Navigation             │
     │ Content Area               │             │ Content Area               │
     ├────────────────────────────┤             ├────────────────────────────┤
     │ [INPUT FIELD (OCCLUDED)]   │             │ [Active Input Field]       │
     │ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │             │ ── 24px Clearance Buffer ──│
     │ ▒▒▒ VIRTUAL KEYBOARD ▒▒▒▒▒ │             ├────────────────────────────┤
     │ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │             │ [Sticky Accessory Bar]     │
     │ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │             ├────────────────────────────┤
     └────────────────────────────┘             │ ▒▒▒ VIRTUAL KEYBOARD ▒▒▒▒▒ │
                                                └────────────────────────────┘
```

### 6.1 Viewport Meta & Configuration
```html
<!-- HTML Viewport Configuration for Full Keyboard Resizing -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, interactive-widget=resizes-content">
```

### 6.2 Auto-Scroll & Keyboard Clearance Protocol
1. **Focus Listener**: When an `input`, `textarea`, or contenteditable element triggers `focusin`, capture target element bounding client rect.
2. **Visual Viewport Resize Handler**: Listen to `window.visualViewport.addEventListener('resize', ...)`:
   - Compute `keyboardHeight = window.innerHeight - visualViewport.height`.
   - Reposition sticky accessory bar to `bottom: ${keyboardHeight}px`.
3. **24px Scroll Clearance**:
   ```javascript
   const inputRect = activeElement.getBoundingClientRect();
   const visibleBottom = window.visualViewport.height - ACCESSORY_BAR_HEIGHT - 24;
   if (inputRect.bottom > visibleBottom) {
     const scrollOffset = inputRect.bottom - visibleBottom;
     window.scrollBy({ top: scrollOffset, behavior: 'smooth' });
   }
   ```

---

## 7. Accessibility Floor (WCAG 2.2 AAA & Platform APCA)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           ACCESSIBILITY STANDARDS                        │
├──────────────────────────────┬───────────────────────────────────────────┤
│ Contrast (Normal Text < 24px) │ 7:1 Minimum (WCAG 2.2 AAA Compliant)      │
│ Contrast (Large Text >= 24px)│ 4.5:1 Minimum                             │
│ Minimum Touch Target Size    │ 48x48dp (Android) / 44x44pt (iOS)         │
│ Screen Reader Hierarchy      │ Linear DOM flow matching visual z-order   │
│ Text Resizing Tolerance      │ 200% dynamic type scale with zero clipping│
└──────────────────────────────┴───────────────────────────────────────────┘
```

### 7.1 Screen Reader Focus Order
- Bottom Sheets trap focus inside modal container when open (`aria-modal="true"`, `role="dialog"`).
- Background canvas is tagged with `aria-hidden="true"` during active modal/sheet states.
- Floating accessory bars announce context updates via `aria-live="polite"`.
