# Mobile Component Spec 08: Rich Text Editors → Keyboard Accessory Trays & Slash Commands

**Author:** Senior Component Interaction Designer  
**Leadership:** Sally (BMad Design System)  
**Status:** Approved Specification  
**Target:** iOS Safari / Android Chrome / React Native / Flutter  

---

## 1. First-Principles Breakdown: Why Desktop Rich Text Editors Fail on Mobile

Desktop WYSIWYG editors (like TinyMCE, Quill, or desktop Notion) use multi-row top toolbars (40+ formatting buttons) or floating selection hover menus (bubble menus). Porting these to mobile results in total usability failure:

1. **Floating Selection Menus Jump Behind Keyboards:**
   When a user selects text on mobile, native OS selection handles (`Copy / Paste / Look Up`) collide with custom web floating menus, or the floating menu is rendered off-screen beneath the software keyboard.
2. **Tiny Color & Font Pickers (<24px Buttons):**
   Sub-menus for font sizes, text color grids, and table insertion require fine cursor clicks. On touchscreens, users repeatedly miss targets or open unintended dropdowns.
3. **Cursor Positioning Latency & Scroll Traps:**
   Large rich text viewports inside mobile web containers trigger iOS Safari viewport bouncing, losing the active text caret whenever formatting buttons are tapped.

### The Mobile Transformation
Relocate all formatting controls to a **Keyboard-Pinned Accessory Formatting Ribbon**, integrate **Voice Dictation Triggers**, and support **Quick Markdown Slash Commands (`/`)** for hands-on-keyboard content generation.

---

## 2. Anatomical Structure & ASCII Layout

```
+-------------------------------------------------------------+ [Top Bar: Document Title]
| [ < Documents ]            "Q3 Product Spec"        [ Done ]| 48px Header
+-------------------------------------------------------------+
|                                                             |
|                       [ EDITOR CANVAS ]                     |
| # Mobile Redesign Notes                                     | 16pt Body Font
| Tap anywhere to type... | [Caret]                           | Line Height: 1.5
|                                                             |
| /heading                                                    | Slash Command Menu
| +---------------------------------------------------------+ | [Inline Slash Popup]
| | [ H1 ] Heading 1               (Large Section Title)    | | 48px Row Targets
| | [ H2 ] Heading 2               (Medium Section Title)   | | Active Selection:
| | [ •• ] Bulleted List           (Quick bullet point)     | | Grey Highlight
| +---------------------------------------------------------+ |
+-------------------------------------------------------------+
| [KEYBOARD PINNED FORMATTING RIBBON - Horizontal Scroll]     | 48px Height
| [ B ] [ I ] [ U ] [ S ] | [ H1 ] [ H2 ] | [ 🔗 Link ] [ 📷 ]| 44px Icon Buttons
+-------------------------------------------------------------+
| [ SOFTWARE KEYBOARD (iOS / Android)                       ] |
| [ q ] [ w ] [ e ] [ r ] [ t ] [ y ] [ u ] [ i ] [ o ] [ p ] |
| [ a ] [ s ] [ d ] [ f ] [ g ] [ h ] [ j ] [ k ] [ l ]       |
| [ ⇧ ] [ z ] [ x ] [ c ] [ v ] [ b ] [ n ] [ m ] [ ⌫ ]       |
| [ 123 ] [ 🌐 ] [ 🎙️ Dictation ] [       space       ] [ Return ]
+-------------------------------------------------------------+
```

---

## 3. Interaction & Gesture State Machine

```
              +----------------------+
              | EDITOR FOCUSED       |
              +----------+-----------+
                         |
       +-----------------+-----------------+
       |                                   |
User Selects Text                   User Types "/"
       |                                   |
       v                                   v
+-----------------------+          +-----------------------+
| ACTIVATE FORMAT BAR   |          | OPEN SLASH COMMANDS   |
| Reflect Bold/Italic   |          | Inline micro-picker   |
| states in pinned bar  |          | Auto-filter as typed  |
+-----------+-----------+          +-----------+-----------+
            |                                  |
     Tap Format Button                  Select Block Type
            |                                  |
            v                                  v
+-----------------------+          +-----------------------+
| APPLY MUTATION        |          | CONVERT BLOCK         |
| Keep Focus & Caret    |          | Replace "/" string    |
| Haptic: SelectionTick |          | Haptic: MediumImpact  |
+-----------------------+          +-----------------------+
```

### Motion & Physics Parameters
- **Accessory Ribbon Panning:** Horizontal overflow with `overscroll-behavior-x: contain; -webkit-overflow-scrolling: touch;`.
- **Slash Menu Snap Animation:** `{ mass: 0.7, stiffness: 420, damping: 26 }`.
- **Haptic Tuning:**
  - Formatting toggle: `UIImpactFeedbackGenerator(style: .selection)`.
  - Slash command execution: `UIImpactFeedbackGenerator(style: .medium)`.

---

## 4. Viewport & Keyboard Physics

```
+------------------------------------+
| Viewport Caret Maintenance         |
|                                    |
| 1. Formatting Ribbon fixed to:     |
|    bottom: 0 (relative to          |
|    visualViewport)                 |
|                                    |
| 2. Prevent Focus Loss:             |
|    Formatting buttons use          |
|    onMouseDown={(e) =>             |
|      e.preventDefault()}           |
|    to keep input caret active!     |
|                                    |
| 3. Caret Auto-Scroll:              |
|    Keep active line > 48px above   |
|    formatting ribbon.              |
+------------------------------------+
```

- **Critical Focus Lock:** All buttons inside the keyboard accessory ribbon attach `onMouseDown={(e) => e.preventDefault()}` / `onTouchStart` event locks to prevent the web browser from blurring the text editor when applying bold, italics, or headings.

---

## 5. Comprehensive Edge Cases & WCAG 2.2 Semantics

| Scenario | Behavior Specification |
| :--- | :--- |
| **Virtual Keyboard Dismissal** | When keyboard blurs, formatting ribbon smoothly docks to bottom of document viewport or hides to maximize reading space. |
| **Image & Media Uploads** | Direct integration with mobile camera & photo library sheet via `<input type="file" accept="image/*" capture="environment">`. Progress bar rendered in ribbon. |
| **Accessibility (WCAG 2.2)** | Formatting ribbon exposed as `role="toolbar" aria-label="Text formatting"`. Toggle buttons use `aria-pressed="true/false"`. |
| **Touch Boundaries** | Every format button in the accessory ribbon adheres strictly to `>= 44x44px` touch hit dimensions with 4px gap separation. |
