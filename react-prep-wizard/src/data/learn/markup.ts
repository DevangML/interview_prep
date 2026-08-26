import type { LearnTopic } from './types';

/** HTML semantics, forms, and the accessibility contract they carry. */
export const markupTopics: LearnTopic[] = [
  {
    id: 'html-semantics',
    area: 'HTML',
    group: 'Structure',
    title: 'Semantic elements and document outline',
    status: 'missing',
    minutes: 6,
    summary:
      'Semantic HTML is not stylistic preference. Each element carries an implicit ARIA role, keyboard behaviour and screen-reader affordance that a `div` does not — which is why "just use a div" quietly breaks accessibility.',
    body: [
      'Landmarks give assistive technology a way to jump around: `<header>`, `<nav>`, `<main>` (exactly one per page), `<aside>`, `<footer>`, `<section>` (needs an accessible name to be a landmark), `<article>` (independently distributable content). A screen-reader user navigates by landmark the way you navigate by scrolling.',
      'Headings `<h1>`–`<h6>` form the document outline, and users of assistive technology navigate by them more than by any other mechanism. Do not skip levels for visual size — that is what CSS is for. One `<h1>` per page is the safe convention.',
      'Interactive elements come with behaviour you would otherwise have to rebuild by hand: `<button>` is focusable, activates on Enter *and* Space, and announces as a button. A `<div onClick>` has none of that — no focus, no keyboard, no role. Rebuilding it correctly takes `tabindex="0"`, a `role`, and key handlers for both Enter and Space, and people almost always forget Space.',
      '`<a>` versus `<button>`: an anchor **navigates** and belongs in the browser history; a button **acts**. If it changes the URL, use an anchor. If it opens a modal, use a button. Right-click, middle-click and "open in new tab" only work correctly on real anchors with a real `href`.',
      'Lists (`<ul>`, `<ol>`, `<dl>`) are announced with their item count, which is genuinely useful information a stack of divs cannot convey. Tables need `<caption>`, `<th scope>` and `<thead>`/`<tbody>` to be navigable; a table used for layout is actively hostile to screen readers.',
    ],
    keyPoints: [
      'Every semantic element carries a free implicit ARIA role — that is the whole argument.',
      '`<button>` fires on Enter *and* Space. Hand-rolled div buttons usually forget Space.',
      'Anchors navigate; buttons act.',
      'Exactly one `<main>`; do not skip heading levels for visual reasons.',
    ],
    interview:
      '"Why use semantic HTML?" is a screening question — a vague answer about SEO marks you as inexperienced. Name the implicit role, the keyboard behaviour, and the landmark navigation. Then mention that it reduces the amount of ARIA you have to write, which leads neatly into the first rule of ARIA.',
    resources: [
      { label: 'MDN — HTML elements reference', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element', kind: 'docs' },
      { label: 'HTML spec — sections and outlines', url: 'https://html.spec.whatwg.org/multipage/sections.html', kind: 'spec' },
      { label: 'web.dev — Semantic HTML for accessibility', url: 'https://web.dev/learn/accessibility/structure', kind: 'article' },
    ],
  },
  {
    id: 'html-forms',
    area: 'HTML',
    group: 'Forms',
    title: 'Forms, labels, validation and submission',
    status: 'partial',
    minutes: 7,
    summary:
      'Forms are the most-asked machine-coding topic and the most commonly broken piece of accessibility. The platform gives you validation, labelling and submission behaviour for free, and most hand-rolled React forms throw all three away.',
    body: [
      'Every input needs an accessible name, and the robust way is a real `<label for="id">` — clicking the label focuses the control, which is a usability win as well as a screen-reader requirement. `aria-label` works but is invisible to sighted users, and placeholder text is **not** a label: it disappears the moment typing starts.',
      'The `type` attribute changes the mobile keyboard, the validation rules and sometimes the widget: `email`, `tel`, `url`, `number`, `search`, `date`. Attribute-based constraints — `required`, `min`, `max`, `minlength`, `pattern`, `step` — are enforced by the browser for free and expose `:invalid`, `:valid` and `:user-invalid` for styling. `:user-invalid` is the good one: it only matches after the user has actually interacted, so a pristine form is not painted red.',
      'Submission has behaviour people rebuild unnecessarily: a `<button type="submit">` inside a form submits on Enter from any text input. That is why a button with no `type` inside a form is a classic bug — the default **is** `submit`, so a "Cancel" button silently submits. Always type your buttons.',
      'In React, an input is **controlled** when its `value` comes from state and changes only through `onChange`; **uncontrolled** when the DOM owns the value and you read it with a ref or from `FormData` on submit. Controlled gives you validation-as-you-type and derived UI; uncontrolled is less code and fewer renders. React 19 pushes toward form actions, where a `<form action={fn}>` receives `FormData` directly.',
    ],
    keyPoints: [
      'A placeholder is not a label.',
      'A `<button>` inside a form defaults to `type="submit"`. Always set it explicitly.',
      '`:user-invalid` beats `:invalid` for styling, because it waits for interaction.',
      'Controlled = React state is the source of truth; uncontrolled = the DOM is.',
    ],
    interview:
      'The machine-coding staple is "build a form with validation". Points are won by using a real `<form>` with `onSubmit` (so Enter works), labelling every input, disabling the submit button while pending, and showing errors that are associated with their field via `aria-describedby`.',
    code: `<form onSubmit={handleSubmit} noValidate>
  <label htmlFor="email">Email</label>
  <input
    id="email" name="email" type="email" required
    aria-describedby={error ? 'email-error' : undefined}
    aria-invalid={!!error}
  />
  {error && <p id="email-error" role="alert">{error}</p>}
  <button type="submit" disabled={pending}>
    {pending ? 'Sending…' : 'Send'}
  </button>
</form>`,
    resources: [
      { label: 'MDN — Client-side form validation', url: 'https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation', kind: 'docs' },
      { label: 'React — <form> and form actions', url: 'https://react.dev/reference/react-dom/components/form', kind: 'docs' },
      { label: 'MDN — FormData', url: 'https://developer.mozilla.org/en-US/docs/Web/API/FormData', kind: 'docs' },
    ],
  },
  {
    id: 'a11y-core',
    area: 'Accessibility',
    group: 'Foundations',
    title: 'ARIA, keyboard navigation and focus management',
    status: 'missing',
    minutes: 8,
    summary:
      'Accessibility is a scored dimension in senior front-end interviews and completely absent from most candidates\' preparation. The rules are few, specific, and easy to state.',
    body: [
      '**The first rule of ARIA is not to use ARIA.** If a native element with the required semantics exists, use it. `role="button"` on a div is strictly worse than a `<button>`, because you must then reimplement focus, Enter, Space, and the disabled state by hand. ARIA adds semantics; it never adds behaviour.',
      'The three ARIA families: **roles** say what a thing is (`role="dialog"`), **properties** describe it (`aria-label`, `aria-describedby`, `aria-haspopup`), and **states** say what it is doing right now (`aria-expanded`, `aria-checked`, `aria-disabled`, `aria-busy`). States must be kept in sync with reality — a stale `aria-expanded` is worse than none.',
      'Keyboard support is the part that gets tested by simply unplugging the mouse. Everything interactive must be reachable by Tab in a sensible order, must show a visible focus ring (never `outline: none` without a replacement), and composite widgets have expected key behaviour: arrows move within a menu or tab list, Escape closes, Enter/Space activate. `tabindex="0"` puts an element in the natural order; `tabindex="-1"` makes it focusable only programmatically; positive values break the order and should be avoided.',
      '**Focus management** is what separates a working modal from a broken one: on open, move focus into the dialog; trap Tab inside while it is open; on close, return focus to the element that opened it. Without the last step the user is dumped at the top of the document. The `<dialog>` element and `showModal()` now do most of this natively.',
      'Live regions announce changes that happen away from focus: `aria-live="polite"` waits for a pause, `assertive` interrupts. A result count that updates as you filter should be polite; an error that blocks submission may be assertive. `role="alert"` is an assertive live region with one attribute.',
    ],
    keyPoints: [
      'First rule of ARIA: do not use ARIA. Use the native element.',
      'ARIA changes semantics, never behaviour — you still write the key handlers.',
      'Modal contract: focus in, trap, and return focus on close.',
      'Never remove a focus indicator without providing a better one.',
    ],
    interview:
      '"Make this accessible" applied to a custom dropdown or modal is a standard senior exercise. Say the contract out loud as you build: role, accessible name, keyboard model, focus management, live announcements. Naming the contract scores even when time runs out before you finish.',
    pitfalls: [
      '`outline: none` in a reset with no replacement — an instant fail on a keyboard pass.',
      'Putting `aria-label` on a `<div>` and expecting it to be announced. Without a role, it usually is not.',
    ],
    resources: [
      { label: 'W3C — ARIA Authoring Practices (APG)', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/', kind: 'spec', note: 'The keyboard model for every widget you will be asked to build.' },
      { label: 'MDN — ARIA basics', url: 'https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics', kind: 'docs' },
      { label: 'web.dev — Learn Accessibility', url: 'https://web.dev/learn/accessibility', kind: 'article', note: 'A full free course; the focus-management module is the one to read.' },
    ],
  },
];
