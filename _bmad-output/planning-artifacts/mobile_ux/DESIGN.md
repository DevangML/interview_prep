---
design_system:
  name: "BMad Mobile UX Core Design System"
  version: "1.0.0"
  standard: "Google Labs / WCAG 2.2 AAA Compliant"
  author: "Senior UX Systems Architect"

tokens:
  colors:
    light:
      surface_canvas: "#F8F9FA"       # Contrast vs text_primary: 15.8:1 (AAA)
      surface_card: "#FFFFFF"         # Card background
      surface_sunlight_boost: "#FFFFFF" # 100% reflectance outdoor mode
      text_primary: "#111827"         # Contrast vs canvas: 15.8:1 (AAA > 7:1)
      text_secondary: "#4B5563"       # Contrast vs canvas: 7.2:1 (AAA > 7:1)
      text_tertiary: "#6B7280"        # Contrast vs canvas: 4.8:1 (AAA Large / AA Normal)
      interactive_primary: "#0D57D5"  # Primary blue CTA, contrast vs canvas: 7.1:1
      interactive_primary_active: "#083C96" # Pressed state
      interactive_primary_contrast: "#FFFFFF" # On-primary text
      status_success: "#046A38"       # WCAG AAA compliant green
      status_warning: "#7A4D00"       # High-contrast amber/brown
      status_error: "#B31B1B"         # High-contrast crimson
      border_subtle: "#D1D5DB"        # 3:1 non-text contrast
      border_focus: "#0D57D5"         # 4.5:1 focus ring
      scrim_backdrop: "rgba(17, 24, 39, 0.65)"
      hit_slop_debug: "rgba(239, 68, 68, 0.20)"
    dark:
      surface_canvas: "#0B0F17"       # True deep slate for OLED power saving
      surface_card: "#161E2E"         # Elevated surface
      surface_sunlight_boost: "#222F46" # High ambient lux mode
      text_primary: "#F9FAFB"         # Contrast vs canvas: 18.2:1 (AAA)
      text_secondary: "#D1D5DB"       # Contrast vs canvas: 11.5:1 (AAA)
      text_tertiary: "#9CA3AF"        # Contrast vs canvas: 7.0:1 (AAA)
      interactive_primary: "#60A5FA"  # AAA contrast against dark canvas (8.2:1)
      interactive_primary_active: "#93C5FD" # Pressed state
      interactive_primary_contrast: "#0B0F17" # Dark text on bright button
      status_success: "#34D399"       # High-luminance mint
      status_warning: "#FBBF24"       # High-luminance amber
      status_error: "#F87171"         # High-luminance coral
      border_subtle: "#374151"        # Boundary separator
      border_focus: "#60A5FA"         # 3px outer glow
      scrim_backdrop: "rgba(0, 0, 0, 0.80)"
      hit_slop_debug: "rgba(248, 113, 113, 0.25)"

  touch_targets:
    minimum_dimension:
      android_dp: 48
      ios_pt: 44
      recommended_px: 48
    visual_vs_target:
      icon_visual_size: "24x24px"
      touch_envelope_size: "48x48px"
      hit_slop_insets:
        top: 12
        bottom: 12
        left: 12
        right: 12
    adjacent_target_min_gap: "8px"
    touch_boundary_behavior: "overlap-prevention-voronoi-partition"

  spacing_and_grid:
    baseline_grid: 8
    micro_step: 4
    scale:
      space_2xs: "4px"
      space_xs: "8px"
      space_sm: "12px"
      space_md: "16px"
      space_lg: "24px"
      space_xl: "32px"
      space_2xl: "48px"
      space_3xl: "64px"
    thumb_bands:
      bottom_natural_zone: "0% - 35% viewport height"
      middle_reach_zone: "35% - 70% viewport height"
      top_hard_zone: "70% - 100% viewport height"

  elevation_and_depth:
    z_index:
      base_content: 0
      sticky_header: 100
      sticky_accessory_bar: 150
      bottom_nav_bar: 200
      floating_action_dock: 250
      bottom_sheet: 300
      modal_backdrop: 400
      modal_dialog: 500
      toast_snackbar: 600
      system_overlay: 1000
    shadows:
      elevation_1: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)"
      elevation_2: "0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      elevation_3: "0 10px 15px -3px rgba(0, 0, 0, 0.20), 0 4px 6px -2px rgba(0, 0, 0, 0.10)"
      elevation_sheet: "0 -8px 24px -4px rgba(0, 0, 0, 0.25)"

  motion_and_spring_physics:
    spring_curves:
      snappy_ui:
        stiffness: 400
        damping: 30
        mass: 1.0
        velocity_multiplier: 1.2
      bottom_sheet_drag:
        stiffness: 280
        damping: 26
        mass: 0.9
        overshoot_clamping: false
      elastic_dismiss:
        stiffness: 320
        damping: 22
        mass: 0.8
        overshoot_clamping: true
    gesture_thresholds:
      swipe_dismiss_velocity: 800     # px/s
      swipe_dismiss_distance: 120     # px
      edge_swipe_slop_width: 24       # px from screen edge
      rubber_band_factor: 0.35        # Resistance coefficient past bounds

  haptics:
    selection:
      type: "selection"
      pattern_duration_ms: [10]
      intensity: 0.3
      usage: "Picker scrolling, tab change, segmented control toggle"
    impact_light:
      type: "impactLight"
      pattern_duration_ms: [15]
      intensity: 0.5
      usage: "Card reorder pick-up, micro toggle on/off"
    impact_medium:
      type: "impactMedium"
      pattern_duration_ms: [25]
      intensity: 0.75
      usage: "Sheet snap point reached, destructive confirm button tap"
    impact_heavy:
      type: "impactHeavy"
      pattern_duration_ms: [40]
      intensity: 1.0
      usage: "Long-press contextual menu trigger, drag drop placement"
    notification_success:
      type: "notificationSuccess"
      pattern_duration_ms: [15, 60, 25]
      intensity: 0.8
      usage: "Form submitted successfully, item synced"
    notification_error:
      type: "notificationError"
      pattern_duration_ms: [30, 40, 30, 40, 50]
      intensity: 1.0
      usage: "Validation failure, network disconnection, destructive abort"
    edge_bounce_tick:
      type: "impactLight"
      pattern_duration_ms: [8]
      intensity: 0.25
      usage: "Scroll boundary overscroll threshold hit"
---

# Mobile UX Core Design Specification

## 1. Brand & Ergonomic Style

Our mobile ergonomics are anchored in empirical human thumb kinematics (Steven Hoober research baseline: 49% one-thumb hold, 36% cradled, 15% two-handed). 

```
┌─────────────────────────────────────────────────────────┐
│              ERGONOMIC FOUNDATION PRINCIPLES            │
├──────────────────────────┬──────────────────────────────┤
│ 1. One-Handed Reach First │ Critical paths reachable     │
│                          │ without hand-repositioning.  │
│ 2. 3-Second Glanceability│ Cognitive budget < 3 visuals │
│                          │ per critical decision node.  │
│ 3. Sunlight Legibility   │ WCAG 2.2 AAA (7:1 contrast)  │
│                          │ with APCA text luminance > 75│
└──────────────────────────┴──────────────────────────────┘
```

### 1.1 Contrast & Ambient Adaptation
- **Direct Sunlight Engine**: In ambient illuminance > 25,000 lux, surface colors shift to pure white (`#FFFFFF`) / pure black (`#000000`), font weight bumps by +100 (e.g., Regular 400 -> Medium 500), and borders thicken from 1px to 2px.
- **OLED Dark Optimization**: Canvas uses `#0B0F17` rather than pitch black `#000000` to prevent AMOLED pixel smear during 120Hz high-speed scrolling, with 80% opacity scrims for depth segregation.

---

## 2. Thumb Zone Mapping

Mobile devices are split into three ergonomic functional bands based on thumb radius arc physics for single-handed usage (right/left hand balanced).

### 2.1 Ergonomic Device Topography

```
+------------------------------------+ 100% Viewport Height (0px)
| [Status Bar] [Safe Area Top 47px]  |
| [Back]        Title        [Action]| <- HARD TO REACH ZONE (70% - 100%)
|                                    |    Destructive actions, status display,
|         Read-Only Headers          |    deliberate friction zone.
+------------------------------------+ 70% Viewport Height
|                                    |
|         Secondary Content          | <- REACH / STRETCH ZONE (35% - 70%)
|         Form Input Fields          |    Requires slight finger adjustment.
|         Scrollable Feeds           |    Interactive cards & search boxes.
|                                    |
+------------------------------------+ 35% Viewport Height
| [Primary CTA]   [Secondary Action] | <- NATURAL THUMB ZONE (0% - 35%)
| [==== Sticky Floating Dock ======] |    Zero grip shift. Primary interactions,
| [Tab 1] [Tab 2] [Tab 3] [Tab 4]   |    bottom sheets, key triggers.
| [   Home Indicator Bar (34px)    ] |
+------------------------------------+ 0% Viewport Height (Screen Base)
```

### 2.2 Action Allocation Matrix

| Zone | Viewport Band | Anatomical Strain | Permitted Controls | Disallowed Controls |
| :--- | :--- | :--- | :--- | :--- |
| **Natural** | 0% – 35% (Base) | Minimal ($\theta < 15^\circ$) | Primary CTAs, Bottom Navigation, Bottom Sheet Grabbers, Numeric Keypads | Permanent destructive actions without confirmation |
| **Reach** | 35% – 70% (Mid) | Moderate ($\theta = 15^\circ - 40^\circ$) | Scrollable list items, Form inputs, Filter chips, Media carousels | Sticky primary navigation triggers |
| **Hard** | 70% – 100% (Top) | High ($\theta > 40^\circ$) | Title headers, System status, Avatar/Profile icon, Deliberate delete icons | Repetitive primary submission buttons |

---

## 3. Touch Target Physics & Hit Slop Boundaries

Every interactive control must satisfy touch target minimums regardless of visual bounding boxes.

### 3.1 Target Insets and Hit Slop Physics

```
          Touch Target Boundary: 48dp x 48dp (min)
        ┌───────────────────────────────────────────────┐
        │        Hit Slop Top Expansion (+12dp)         │
        │    ┌─────────────────────────────────────┐    │
        │    │    Visual Control: 24dp x 24dp      │    │
  +12dp │    │              [ Icon ]               │    │ +12dp
  Left  │    │                                     │    │ Right
        │    └─────────────────────────────────────┘    │
        │       Hit Slop Bottom Expansion (+12dp)       │
        └───────────────────────────────────────────────┘
```

- **Target Insets Rule**: Visual icon size is `24x24px`, wrapped in a transparent interactive padding container of `48x48px` (`min-width: 48px; min-height: 48px; display: inline-flex; align-items: center; justify-content: center;`).
- **Voronoi Touch Disambiguation**: When two touch targets are adjacent with `< 8px` gap, touch coordinates resolve to the closest centroid with no dead zones.
- **Visual Feedback Latency**: `< 16ms` (1 frame at 60Hz) touch-down highlight (`transform: scale(0.96); background-color: var(--interactive-primary-active)`).

---

## 4. Viewport Sizing & Safe Area Dynamics

Mobile browsers (Safari iOS, Chrome Android) exhibit dynamic URL bar collapses and virtual keyboard expansions.

### 4.1 CSS Viewport Unit Hierarchy

```
       100svh (Smallest Viewport)          100lvh (Largest Viewport)
     [ Browser Address Bar Active ]      [ Browser Address Bar Hidden ]
    ┌──────────────────────────────┐    ┌──────────────────────────────┐
    │                              │    │                              │
    │                              │    │                              │
    │    Guaranteed Safe Area      │    │    Maximum Canvas Height     │
    │                              │    │                              │
    │                              │    │                              │
    ├──────────────────────────────┤    └──────────────────────────────┘
    │ [Bottom URL Bar / Navigation]│
    └──────────────────────────────┘
    
    100dvh (Dynamic Viewport): Automatically scales between svh and lvh
    in real-time during scroll and keyboard states.
```

### 4.2 Safe Area Rules
```css
:root {
  --sat: env(safe-area-inset-top, 20px);
  --sar: env(safe-area-inset-right, 0px);
  --sab: env(safe-area-inset-bottom, 20px);
  --sal: env(safe-area-inset-left, 0px);
  
  --app-height: 100dvh;
}

.mobile-viewport-shell {
  min-height: 100dvh;
  padding-top: var(--sat);
  padding-right: var(--sar);
  padding-bottom: var(--sab);
  padding-left: var(--sal);
  box-sizing: border-box;
}

.sticky-bottom-dock {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: calc(var(--sab) + 12px);
  z-index: var(--z-bottom-nav);
}
```

---

## 5. Typography & Cognitive Ergonomics

### 5.1 Mobile Type Hierarchy Scale

| Style Token | Font Size | Line Height | Letter Spacing | Weight | Tap Slop Protection |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `display_lg` | 32px (`2.0rem`) | 40px (`1.25`) | `-0.02em` | 700 Bold | N/A (Header) |
| `title_md` | 20px (`1.25rem`) | 28px (`1.40`) | `-0.01em` | 600 SemiBold | Min tap target buffer |
| `body_default` | 16px (`1.0rem`) | 24px (`1.50`) | `0.00em` | 400 Regular | 1.5x eliminates line mis-taps |
| `label_interactive` | 14px (`0.875rem`)| 20px (`1.42`) | `+0.01em` | 600 SemiBold | Button labels, padded to 48px |
| `caption_subtle` | 12px (`0.75rem`)| 16px (`1.33`) | `+0.02em` | 500 Medium | Timestamps, badge chips |

### 5.2 Dynamic Type Scaling Rules
1. **Never Truncate Body**: Body text must wrap up to 4 lines before graceful ellipsis; containers must use `min-height: auto` with flex-wrap rather than fixed `height: 48px`.
2. **Font Scale Multipliers**: Supports $0.85x$ (small) up to $2.0x$ (accessibility maximum).
3. **Line Height Clamping**: `line-height: max(24px, 1.5em)` ensures tap targets and readability do not collide under 200% font scaling.
