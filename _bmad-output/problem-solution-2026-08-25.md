# Problem Solving Session: CSS Sandbox JSX Template Rendering Failure

**Date:** 2026-08-25
**Problem Solver:** Devang
**Problem Category:** Technical / UI Engine Bug

---

## 🎯 PROBLEM DEFINITION

### Initial Problem Statement
In the React Prep Wizard CSS 2D Layouts workbench (e.g. `flex-wrap — one line becomes many`), the live preview renders literal raw JSX expression text `{[1,2,3,4,5,6].map(n =>   chip {n}  )}` instead of rendering 6 individual chip elements.

### Refined Problem Statement
The `jsxToHtml` conversion function in `src/data/masteryStream.ts` only performed basic string substitution (`className` -> `class`), failing to evaluate JavaScript/JSX expressions such as `.map()`, array generators, or interpolation when ingesting drill markup into static HTML `baseHtml`. Consequently, the sandbox iframe received raw un-evaluated JSX text nodes rather than DOM element hierarchies, breaking live preview rendering and computed style verification for dynamic CSS drills.

### Problem Context
- **System:** `react-prep-wizard` Mastery Stream (CSS 2D Layouts track).
- **Trigger Scenario:** Navigating to drills containing JSX array mappings (e.g. `FLEX-04`, `FLEX-05`, `GRID-01..12`, `RAMP`, `TAGS`).
- **Observed Behavior:** The preview container displayed raw uncompiled code strings instead of DOM cards.
- **Impact:** Candidates could not visually evaluate layout wrapping, gaps, or alignments in CSS drills, undermining the core "Code Crucible" learning loop.

### Success Criteria
1. **Full DOM Expansion:** All JSX markup containing `.map()` expressions in `css100.ts` and `ladder.ts` expands to valid, semantic HTML elements inside `baseHtml`.
2. **Deterministic Pre-rendering:** `jsxToHtml` expands `.map(n => ...)` cleanly across all 108+ drill markups without runtime overhead in the iframe.
3. **Verified Preview & Specs:** The live preview renders actual distinct `.chip` or `.cell` DOM nodes, enabling CSS flex/grid layout rules and automated computed style validation to pass.

---

## 🔍 DIAGNOSIS AND ROOT CAUSE ANALYSIS

### Problem Boundaries (Is/Is Not)
- **Where DOES it occur:** Any CSS drill whose `markup` property was authored in JSX using `.map()` loops (`css100.ts` items 712, 806, etc.).
- **Where DOESN'T it occur:** Static markup with explicitly written HTML tags (e.g. `BOX-01`, `FLEX-01..03`).
- **What IS the problem:** Uncompiled JSX expression syntax inside the static HTML sandbox document.
- **What ISN'T it:** A CSS rendering engine or layout engine bug.

### Root Cause Analysis (Five Whys)
1. **Why did the preview show raw JSX text?** Because the HTML sandbox was injected with string containing `{[1,2,3,4,5,6].map(...)}`.
2. **Why was that string in the HTML sandbox?** Because `baseHtml` was assigned the output of `jsxToHtml(item.markup)`.
3. **Why didn't `jsxToHtml` convert the `.map()`?** Because it only had a regex for `className -> class` and stripped comments/fragments.
4. **Why was the drill markup written in JSX with `.map()`?** Because the source curriculum ported drills from React/JSX component templates.
5. **Root Cause:** Ingestion pipeline lacked an AST/regex expression macro expander for array `.map` templates.

---

## 💡 SOLUTION GENERATION & EVALUATION

### Selected Solution: AOT Regex Template Macro Expander in `jsxToHtml`
- In `src/data/masteryStream.ts`, parse `{\s*(\[[^\]]+\])\.map\((\w+)\s*=>\s*([\s\S]*?)\)\s*}`.
- Parse the array literal (JSON array of strings/numbers).
- Iterate and interpolate item variables (`{n}`, `{t}`, `{"sw s" + n}`) into duplicated, clean HTML element nodes.
- Strip JSX React `key={...}` attributes.
- Convert `className` to `class`.

---

## 🚀 IMPLEMENTATION & VERIFICATION

### Code Applied (`src/data/masteryStream.ts`):
```typescript
function jsxToHtml(markup: string): string {
  if (!markup) return '';

  let html = markup
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/^\s*<>\s*|\s*<\/>\s*$/g, '')
    .trim();

  const mapRegex = /\{\s*(\[[^\]]+\])\.map\s*\(\s*(\w+)\s*=>\s*([\s\S]*?)\s*\)\s*\}/g;

  html = html.replace(mapRegex, (match, arrayStr, varName, template) => {
    try {
      const arr = JSON.parse(arrayStr.replace(/'/g, '"'));
      return arr.map((item: string | number) => {
        let itemHtml = template.trim();
        itemHtml = itemHtml.replace(/\s*key=\{[^}]+\}/g, '');
        itemHtml = itemHtml.replace(/className=\{\s*"([^"]*)"\s*\+\s*\w+\s*\}/g, (_m: string, prefix: string) => {
          return `class="${prefix}${item}"`;
        });
        itemHtml = itemHtml.replace(/className=/g, 'class=');
        itemHtml = itemHtml.replace(new RegExp(`\\{\\s*${varName}\\s*\\}`, 'g'), String(item));
        return itemHtml;
      }).join('\n      ');
    } catch {
      return match;
    }
  });

  html = html.replace(/className=/g, 'class=');
  return html;
}
```

### Verification:
1. **Automated Markup Sweep:** 108 markups scanned; **0 unexpanded maps remaining**.
2. **Build Verification:** `npx tsc --noEmit && npm run build` passed with **0 errors**.
3. **Live Output Example:**
   - **Input:** `<div className="row">{[1,2,3,4,5,6].map(n => <span className="chip" key={n}>chip {n}</span>)}</div>`
   - **Output:**
     ```html
     <div class="row">
       <span class="chip">chip 1</span>
       <span class="chip">chip 2</span>
       <span class="chip">chip 3</span>
       <span class="chip">chip 4</span>
       <span class="chip">chip 5</span>
       <span class="chip">chip 6</span>
     </div>
     ```

---
_Generated using BMAD Creative Intelligence Suite - Problem Solving Workflow_
