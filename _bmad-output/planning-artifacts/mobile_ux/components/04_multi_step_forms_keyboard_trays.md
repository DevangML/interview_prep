# Mobile Component Spec 04: Multi-Step Forms → Paged Flows & Keyboard Accessory Trays

**Author:** Senior Component Interaction Designer  
**Leadership:** Sally (BMad Design System)  
**Status:** Approved Specification  
**Target:** iOS Safari / Android Chrome / React Native / Flutter  

---

## 1. First-Principles Breakdown: Why Desktop Forms Fail on Mobile

Desktop forms typically present 10–25 fields simultaneously in a 2-column or 3-column grid. On desktop, users scan the entire form with their eyes, tab through inputs using physical keys, and submit via a button at the bottom. On mobile devices:

1. **Scroll Disorientation & Spatial Blindness:**
   When a long form is rendered on a 5.5"–6.7" screen, the virtual keyboard consumes 40–55% of the vertical viewport. Users lose context of where they are in the sequence, which fields failed validation, and how many steps remain.
2. **Keyboard Mismatch & Input Fatigue:**
   Generic `<input type="text">` fields force the user to repeatedly switch keyboards for phone numbers, dates, currencies, and emails. Each extra keystroke increases checkout/onboarding drop-off by up to 8%.
3. **Occluded CTAs (Bottom Submit Button Trapped):**
   Fixed bottom submit buttons get obscured or shifted unpredictably when the software keyboard opens and closes.

### The Mobile Transformation
Deconstruct complex forms into **Progressive Single-Concept Paged Steps**, use **Contextual `inputmode`**, provide a **Sticky Keyboard Accessory Action Bar (`interactiveWidget=resizes-content`)**, and support **Zero-Tap Auto-Advance** on validated inputs.

---

## 2. Anatomical Structure & ASCII Layout

```
+-------------------------------------------------------------+ [Top Safe Area: env(top)]
| [ < Back ]             Step 2 of 4                 [Cancel] | 48px Header Target
| [======================== 50% ============================] | 4px Progress Bar
+-------------------------------------------------------------+
|                                                             |
|   Step Title: "What is your phone number?" (22pt Bold)     | Visual Anchor
|   Subtitle: "We'll send a 6-digit confirmation code."       | 14pt Muted
|                                                             |
|   +-----------------------------------------------------+   |
|   | 🇺🇸 +1  |  (555) 019-2834                [x] Clear   |   | 56px Input Box
|   +-----------------------------------------------------+   | `inputmode="tel"`
|   Helper / Error state: "Valid US mobile number"            | 12pt Green/Red
|                                                             |
+-------------------------------------------------------------+
| [KEYBOARD ACCESSORY ACTION TRAY - Pinned directly above KB] | 48px Height
| [ < Prev ] [ Next > ]                       [ Continue -> ] |
+-------------------------------------------------------------+
| [ SOFTWARE KEYBOARD AREA (280px - 320px)                  ] |
| [ 1 ] [ 2 ] [ 3 ]                                           | Tel / Numeric Pad
| [ 4 ] [ 5 ] [ 6 ]                                           |
| [ 7 ] [ 8 ] [ 9 ]                                           |
| [ * ] [ 0 ] [ # ]                                           |
+-------------------------------------------------------------+
```

---

## 3. Interaction & Gesture State Machine

```
              +--------------------+
              | STEP INITIALIZED   |
              +---------+----------+
                        |
            Autofocus Active Input
                        |
                        v
              +--------------------+
              | KEYBOARD PRESENTED | ---> Accessory Tray pinned to visualViewport
              +---------+----------+
                        |
                User Enters Data
                        |
                        v
              +--------------------+
              | LIVE VALIDATION    |
              +---------+----------+
                        |
      +-----------------+-----------------+
      |                                   |
Validation Fails                   Validation Passes
      |                                   |
      v                                   v
+---------------+                  +--------------------+
| Error Shake   |                  | ENABLE 'CONTINUE'  |
| Haptic: Error |                  | Haptic: Selection  |
+---------------+                  +---------+----------+
                                             |
                                  Auto-Advance (e.g. 6-digit OTP)
                                  or Tap 'Continue' / 'Done'
                                             |
                                             v
                                   +--------------------+
                                   | SLIDE TO NEXT STEP |
                                   | Spring: dx = -100% |
                                   +--------------------+
```

### Contextual Keyboard Matrix
| Input Type | HTML5 Specification | Virtual Keyboard Layout |
| :--- | :--- | :--- |
| **Phone Number** | `type="tel" inputmode="tel" autocomplete="tel"` | Large 10-key numeric keypad |
| **Currency Amount** | `type="text" inputmode="decimal"` | Numbers + single decimal separator |
| **Verification Code (OTP)** | `type="text" inputmode="numeric" autocomplete="one-time-code"` | Numeric keypad + SMS autofill bar |
| **Email Address** | `type="email" inputmode="email" autocomplete="email"` | Standard keyboard + `@` and `.com` |
| **Search / Filter** | `type="search" inputmode="search" enterkeyhint="search"` | Keyboard with `Search` action key |

---

## 4. Viewport & Keyboard Physics

```
+------------------------------------+
| Dynamic Viewport Keyboard Layout   |
|                                    |
| Viewport: window.visualViewport    |
| Height: visualViewport.height      |
| OffsetTop: visualViewport.offsetTop|
|                                    |
| Accessory Tray CSS:                |
| position: fixed;                   |
| bottom: 0;                         |
| transform: translateY(0);          |
| +--------------------------------+ |
| | [ < Prev ] [ Next > ] [ Done ] | | 48px Accessory Bar
| +--------------------------------+ |
| [ VIRTUAL KEYBOARD OCCLUSION ]     |
+------------------------------------+
```

- **Viewport Meta:** `<meta name="viewport" content="width=device-width, initial-scale=1, interactive-widget=resizes-content">`.
- **Auto-Scroll Behavior:** Whenever a field receives focus, the parent container calls:
  `inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });`
  ensuring a minimum 24px clearance above the keyboard accessory bar.

---

## 5. Comprehensive Edge Cases & WCAG 2.2 Semantics

| Scenario | Behavior Specification |
| :--- | :--- |
| **Auto-Advance Safety** | Auto-advance on OTP (6 digits) occurs only when all digits are valid. A visible `Back` button allows returning to the previous step with full state preservation. |
| **Form Data Persistence** | Auto-save draft in `sessionStorage` on every keystroke. If page reloads or user receives a phone call, form state is restored seamlessly. |
| **Accessibility (WCAG 2.2)** | Step indicators use `aria-current="step"`. Errors use `aria-describedby="error-id"` and `aria-live="polite"`. |
| **Tap Targets** | All form controls, dropdowns, and accessory tray buttons satisfy `>= 48x48px` clickable boundary. |
