# Mobile Component Spec 02: Dropdowns → Bottom Drawers & Segmented Pickers

**Author:** Senior Component Interaction Designer  
**Leadership:** Sally (BMad Design System)  
**Status:** Approved Specification  
**Target:** iOS Safari / Android Chrome / React Native / Flutter  

---

## 1. First-Principles Breakdown: Why Desktop Dropdowns Fail on Mobile

Desktop `<select>` dropdowns and custom overlay menus rely on hover intent, downward visual space, and precise mouse clicks. On mobile touchscreens, naive dropdowns fail severely:

1. **Finger & Thumb Occlusion:**
   When tapping a downward-expanding dropdown located in the lower half of the screen, the user's hand obscures the newly expanded list options, forcing awkward wrist repositioning.
2. **Tiny Target Density (<32px Row Height):**
   Dense dropdown menus cause adjacent option mis-taps. Touch error rates increase exponentially when option heights drop below 44px.
3. **Keyboard & Viewport Conflict:**
   Dropdowns with inline text search trigger the software keyboard, immediately pushing the dropdown menu off-screen or cutting the scrollable list height to under 80px.

### The Mobile Transformation
Categorize selection mechanisms by cardinality and continuity:
- **<= 4 Discrete Options:** **Segmented Thumb Bar** (0-tap instant toggle in primary thumb zone).
- **> 5 Categorical Options:** **Searchable Bottom Sheet Drawer** with instant fuzzy search and live filtering.
- **Continuous / Ordered Data (Dates, Time, Numbers):** **Wheel / Drum Picker** with inertia scroll and haptic ticks.

---

## 2. Anatomical Structure & ASCII Layout

```
A) SEGMENTED THUMB BAR (<= 4 Items)
+-------------------------------------------------------------+
| [   Daily   ] | [ ★ Weekly ★ ] | [  Monthly  ] | [  Annual  ] | 48px Height
+-------------------------------------------------------------+
  * Active pill uses spring translation with 2px shadow elevation

B) SEARCHABLE BOTTOM SHEET DRAWER (> 5 Items)
+-------------------------------------------------------------+ [Backdrop Scrim: rgba(0,0,0,0.45)]
|                                                             |
| +---------------------------------------------------------+ | [Drawer Top: 16px radius]
| |                     --- [Drag Handle] ---               | | 36px x 4px Pill
| | Select Country / Region                     [ Done ]     | | 48px Header
| | +-----------------------------------------------------+ | |
| | | 🔍 Search 240+ countries...             [x] Clear   | | | 44px Search Input
| | +-----------------------------------------------------+ | | `inputmode="search"`
| | ------------------------------------------------------- | |
| | [✓] United States                             (+1)      | | 52px Row Height
| | [ ] United Kingdom                            (+44)     | | 48px Touch Target
| | [ ] Germany                                   (+49)     | | Ripple / Highlight
| | [ ] France                                    (+33)     | | Active State
| | [ ] Japan                                     (+81)     | |
| +---------------------------------------------------------+ |
| [Keyboard Visual Viewport Area / Safe Area env(bottom)]    |
+-------------------------------------------------------------+

C) CONTINUOUS WHEEL / DRUM PICKER (Dates / Numbers)
+-------------------------------------------------------------+
| [ Cancel ]              Select Date               [ Done ]  | 44px Bar
| ----------------------------------------------------------- |
|       August                 25                  2026       | 30% Opacity (y - 40px)
| >==== SEPTEMBER =======|==== 26 ==== |========== 2026 ==== <| Selection Lens: 44px
|       October                27                  2026       | 30% Opacity (y + 40px)
| ----------------------------------------------------------- |
| [SafeAreaInsetBottom: 34px]                                 |
+-------------------------------------------------------------+
```

---

## 3. Interaction & Gesture State Machine

```
   [User Taps Trigger]
           |
   Cardinality Check:
    ├── <=4 items: Instant Segmented Switch (Haptic: SelectionChanged)
    ├── Continuous: Snap Drum Wheel into view (Haptic: LightTick per item)
    └── >5 items: Open Bottom Sheet Drawer
           |
           v
   +-----------------------+
   | BOTTOM SHEET OPEN     | <--- Focus search input (interactiveWidget=resizes-content)
   +-----------+-----------+
               |
        User Types Query
               |
               v
   +-----------------------+
   | FUZZY FILTER ENGINE   | <--- Sub-16ms filter cycle (WebWorker / useMemo)
   | Highlight Match Text  |
   +-----------+-----------+
               |
        User Selects Item
               |
               v
   +-----------------------+
   | HAPTIC CONFIRMATION   | ---> Haptic: SuccessNotification
   | Auto-dismiss Sheet    | ---> Spring Exit (Duration: 220ms)
   +-----------------------+
```

### Wheel Physics & Haptic Tuning
- **Wheel Inertia Decay:** $v(t) = v_0 \cdot e^{-\gamma t}$ ($\gamma = 4.8$).
- **Rotational Snap:** Snaps to nearest integer offset $(y \pmod{44} = 0)$.
- **Haptic Tick on Wheel Pass:** Emits `selectionChanged` haptic event every $44\text{px}$ scroll delta:
  ```typescript
  if (Math.floor(currentScrollY / 44) !== lastIndex) {
    Haptics.selection();
    lastIndex = Math.floor(currentScrollY / 44);
  }
  ```

---

## 4. Viewport & Keyboard Physics

```
+------------------------------------+
| Viewport Resizing Dynamics         |
| 1. Drawer pinned to bottom: 0      |
| 2. Search autofocus triggers KB    |
| 3. CSS: interactive-widget=        |
|         resizes-content            |
| 4. Max Sheet Height =              |
|    calc(visualViewport.height - 24)|
| 5. Scrim absorbs tap to dismiss    |
+------------------------------------+
```

- When the search bar receives focus, the sheet shifts from **60dvh** to **visualViewport 100% minus status bar**.
- `window.visualViewport.addEventListener('resize', updateSheetHeight)` ensures zero keyboard overlap on iOS Safari.

---

## 5. Comprehensive Edge Cases & WCAG 2.2 Semantics

| Scenario | Behavior Specification |
| :--- | :--- |
| **Empty Search Results** | Display friendly empty illustration + `"No results for '{query}'"` + `Clear search` button with `48px` tap target. |
| **High Latency Async Load** | Skeleton placeholder rows (3 animated shimmer lines); disable list interaction until loaded; show error banner with `Retry` if fetch exceeds 5s. |
| **Accessibility (WCAG 2.2)** | Full list exposed as `role="listbox"`, items as `role="option"`, selected state indicated via `aria-selected="true"`. Segmented bar uses `role="tablist"` and `role="tab"`. |
| **Focus Restoration** | Upon drawer dismissal, programmatic focus returns precisely to the trigger element (`triggerRef.current.focus()`). |
