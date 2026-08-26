# Mobile Component Spec 06: Filters → Sticky Chips & Filter Bottom Drawers

**Author:** Senior Component Interaction Designer  
**Leadership:** Sally (BMad Design System)  
**Status:** Approved Specification  
**Target:** iOS Safari / Android Chrome / React Native / Flutter  

---

## 1. First-Principles Breakdown: Why Desktop Sidebar Filters Fail on Mobile

Desktop e-commerce and SaaS platforms rely on left-hand sidebar filter panels (280px–350px wide) with 20+ open accordion filters, checkboxes, and dual-range sliders. Porting this to mobile via collapsibles or hidden hamburger menus fails:

1. **Wasted Screen Real Estate:**
   A desktop sidebar takes 30% of horizontal space. On a 390px mobile viewport, rendering side-by-side facets leaves zero room for actual search results.
2. **Hidden Friction Behind Navigation Menus:**
   Hiding all filters inside a multi-level hamburger menu creates high interaction friction (3+ taps to toggle a single brand or price range).
3. **No Visual State Feedback:**
   Users lose track of what filters are currently applied when options are buried deep inside collapsed sub-menus.

### The Mobile Transformation
Combine a **Sticky Horizontal Filter Chip Carousel** for the top 4 most frequently toggled filters with an **"All Filters" Multi-Detent Bottom Drawer** featuring **Live Result Counter Updates** and a **Sticky Apply CTA**.

---

## 2. Anatomical Structure & ASCII Layout

```
+-------------------------------------------------------------+
| [Search Bar: "Search items..."]                    [Sort ⇅] | 48px Header
+-------------------------------------------------------------+
| [STICKY HORIZONTAL FILTER CHIP CAROUSEL] (Scroll-X)         | 44px Height
| [ + All (3) ] | [ ⚡ In Stock ] | [ Under $50 ] | [ ★ 4.0+ ]| 36px Chip Height
+-------------------------------------------------------------+
|                                                             |
|                       [ PRODUCT FEED ]                      |
|                  (2-Column Grid / Card Stream)              |
|                                                             |
+-------------------------------------------------------------+

[ALL FILTERS BOTTOM SHEET DRAWER - Expands on "All (3)" Tap]
+-------------------------------------------------------------+
|                      --- [Drag Handle] ---                  |
| Filter & Refine                          [ Reset All ]      | 48px Header
| ----------------------------------------------------------- |
| Price Range                                                 |
| [  $10  ] <==========[●]------------------[●]==> [  $250  ] | 44px Slider Target
| ----------------------------------------------------------- |
| Category (Multi-select)                                     |
| [✓ Audio]  [✓ Electronics]  [ ] Wearables  [ ] Smart Home   | Segmented Pills
| ----------------------------------------------------------- |
| Delivery Speed                                              |
| (•) Same Day Delivery     ( ) Tomorrow     ( ) Free 3-Day   | 48px Radio Rows
| ----------------------------------------------------------- |
| [STICKY BOTTOM APPLY BAR]                                   | 60px CTA
| [         Show 48 Results  •  Apply Filters         ]       | (Live Count updates)
+-------------------------------------------------------------+
```

---

## 3. Interaction & Gesture State Machine

```
                  +--------------------+
                  | DEFAULT FEED STATE |
                  +---------+----------+
                            |
           +----------------+----------------+
           |                                 |
   Tap Quick Chip                     Tap 'All Filters'
           |                                 |
           v                                 v
   +---------------+                 +--------------------+
   | TOGGLE CHIP   |                 | OPEN FILTER DRAWER |
   | Instant query |                 | 85% Detent Spring  |
   | Haptic: Light |                 +---------+----------+
   +---------------+                           |
                                      User Adjusts Filter
                                               |
                                               v
                                     +--------------------+
                                     | DEBOUNCED API PING | (300ms debounce)
                                     | Update CTA Label:  |
                                     | "Show 48 Results"  |
                                     +---------+----------+
                                               |
                                        Tap Apply CTA
                                               |
                                               v
                                     +--------------------+
                                     | CLOSE DRAWER       |
                                     | Haptic: Success    |
                                     | Update Sticky Chips|
                                     +--------------------+
```

### Chip Carousel & Slider Physics
- **Chip Scroll Physics:** Momentum scrolling with CSS `scroll-padding-inline: 16px; scroll-snap-type: x mandatory;`.
- **Dual Range Slider:** Minimum hit-area radius for slider thumbs is `44px` (using transparent pseudo-elements `::after`).
- **Haptics:**
  - Chip Toggle: `UIImpactFeedbackGenerator(style: .light)`
  - Range Slider Detent: `UIImpactFeedbackGenerator(style: .selection)` on major increments ($25, $50).

---

## 4. Viewport & Keyboard Physics

```
+------------------------------------+
| Viewport Dynamics for Filter Sheet |
|                                    |
| 1. Sticky Chip Carousel pins to top|
|    position: sticky; top: 0;       |
|    z-index: 20;                    |
|                                    |
| 2. Bottom Drawer CTA pinned to     |
|    bottom: env(safe-area-bottom);  |
|                                    |
| 3. If Price input focused, Sheet   |
|    shifts up to avoid keyboard     |
+------------------------------------+
```

- Filter drawer content has `padding-bottom: calc(64px + env(safe-area-inset-bottom))` to ensure the last filter option is never covered by the sticky Apply button.

---

## 5. Comprehensive Edge Cases & WCAG 2.2 Semantics

| Scenario | Behavior Specification |
| :--- | :--- |
| **0 Results Edge Case** | If filter combination yields 0 results, CTA disables gracefully: `"No matching items (0)"` and suggests `"Reset to default"`. |
| **High Density Chips** | Horizontal fade gradient (`mask-image: linear-gradient(...)`) on right edge to visually afford horizontal scrollability. |
| **Accessibility (WCAG 2.2)** | Quick chips use `role="switch"` or `role="checkbox"` with `aria-checked="true/false"`. Live counter CTA uses `aria-live="polite"` to announce match counts to screen readers. |
| **Touch Boundaries** | Every filter pill, checkbox row, and slider handle satisfies `>= 48x48px` touch target standard. |
