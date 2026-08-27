import { srcdoc, mountFrame, settle } from './graders/domFrame';

export interface CheckResult {
  label: string;
  expected: string;
  actual: string;
  ok: boolean;
}

export interface GradeResult {
  pass: boolean;
  checks: CheckResult[];
  error?: string;
  gradedAt: number;
}

export interface GradeInput {
  baseCSS: string;
  referenceCSS: string;
  referenceJs: string;
  attemptCSS: string;
  attemptJs: string;
  props: string[];
  widths?: number[];
}

const ALWAYS_COMPARED = [
  'display', 'position', 'color', 'background-color', 'background-image',
  'opacity', 'z-index', 'visibility', 'overflow-x', 'overflow-y',
  // NOTE: outline-* is deliberately absent. It is user-agent focus-ring styling
  // rather than anything the learner authors, so comparing it by default let a
  // focus ring fail a drill about flexbox. A drill that actually teaches focus
  // still gets it compared, via its own `use` list through testableProps().
  'box-shadow', 'border-top-width', 'border-top-style', 'border-top-color',
  'border-radius', 'font-size', 'font-weight', 'line-height',
  'text-overflow', 'white-space', 'transform', 'flex-direction', 'flex-wrap',
  'grid-template-columns', 'grid-template-rows', 'grid-template-areas',
  'align-items', 'justify-content', 'gap', 'box-sizing',
];

const DEFAULT_WIDTHS = [1100, 700, 380];
const TOLERANCE = 1;

function camel(prop: string) {
  return prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

function testableProps(props: string[]): string[] {
  const named = props
    .map((p) => p.split(':')[0].trim())
    .filter((p) => /^[a-z-]+$/.test(p) && CSS.supports(p, 'initial'));
  return Array.from(new Set([...named, ...ALWAYS_COMPARED]));
}

function customProps(...sheets: string[]): string[] {
  const names = new Set<string>();
  for (const sheet of sheets) {
    for (const m of sheet.matchAll(/(--[\w-]+)\s*:/g)) names.add(m[1]);
  }
  return Array.from(names).slice(0, 40);
}

function focusFirst(doc: Document) {
  const el = doc.querySelector<HTMLElement>('a[href],button,input,select,textarea,[tabindex]');
  try { el?.focus(); } catch { /* detached */ }
}

interface ElementSnapshot {
  name: string;
  tag: string;
  cls: string;
  rect: Record<'width' | 'height' | 'x' | 'y', number>;
  styles: Record<string, string>;
  vars: Record<string, string>;
}

/** Read one document's full measurable state, while it holds focus. */
function snapshot(doc: Document, els: Element[], props: string[], vars: string[]): ElementSnapshot[] {
  const view = doc.defaultView!;
  return els.map((el, i) => {
    const cs = view.getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const styles: Record<string, string> = {};
    for (const p of props) styles[p] = String(cs[camel(p) as keyof CSSStyleDeclaration] ?? '');
    const varVals: Record<string, string> = {};
    for (const v of vars) varVals[v] = cs.getPropertyValue(v).trim();
    return {
      name: describe(el, i),
      tag: el.tagName,
      cls: (el.getAttribute('class') || '').trim(),
      rect: { width: r.width, height: r.height, x: r.x, y: r.y },
      styles,
      vars: varVals,
    };
  });
}

function describe(el: Element, i: number) {
  const cls = el.className && typeof el.className === 'string' ? `.${el.className.trim().split(/\s+/).join('.')}` : '';
  return `${el.tagName.toLowerCase()}${cls}[${i}]`;
}

function elements(doc: Document): Element[] {
  const root = doc.getElementById('root');
  return root ? Array.from(root.querySelectorAll('*')) : [];
}

export async function grade(input: GradeInput): Promise<GradeResult> {
  const widths = input.widths?.length ? input.widths : DEFAULT_WIDTHS;
  const props = testableProps(input.props);
  const vars = customProps(input.referenceCSS, input.baseCSS);
  const checks: CheckResult[] = [];
  let countChecked = false;

  for (const width of widths) {
    const tag = widths.length > 1 ? `@${width}px ` : '';
    let refFrame: HTMLIFrameElement | null = null;
    let attFrame: HTMLIFrameElement | null = null;
    try {
      [refFrame, attFrame] = await Promise.all([
        mountFrame(srcdoc(input.baseCSS, input.referenceCSS, input.referenceJs), width),
        mountFrame(srcdoc(input.baseCSS, input.attemptCSS, input.attemptJs), width),
      ]);
      const [refDoc, attDoc] = await Promise.all([settle(refFrame), settle(attFrame)]);

      const refErr = (refFrame.contentWindow as unknown as { __err?: string }).__err;
      const attErr = (attFrame.contentWindow as unknown as { __err?: string }).__err;
      if (refErr) return { pass: false, checks, error: `reference failed to render: ${refErr}`, gradedAt: Date.now() };
      if (attErr) return { pass: false, checks, error: `your component threw: ${attErr}`, gradedAt: Date.now() };

      const refEls = elements(refDoc);
      const attEls = elements(attDoc);

      if (refEls.length === 0) {
        return { pass: false, checks, error: 'reference rendered nothing — drill data incomplete', gradedAt: Date.now() };
      }

      if (!countChecked) {
        checks.push({
          label: 'structure — element count',
          expected: String(refEls.length),
          actual: String(attEls.length),
          ok: refEls.length === attEls.length,
        });
        countChecked = true;
      }

      /**
       * Focus is a singleton: the browser gives it to one element in one document
       * at a time. Focusing both frames up front therefore left the SECOND one
       * focused and silently stole it back from the first, so every
       * focus-sensitive property differed purely because of call order and the
       * learner was blamed for a focus ring they never wrote.
       *
       * Reading is what has to be symmetric, not the focus call. Focus each
       * frame immediately before measuring it, so both are measured in the same
       * state. (In an unfocused window neither matches :focus-visible — still
       * symmetric, which is why this bug is invisible to automation.)
       */
      focusFirst(refDoc);
      const refSnap = snapshot(refDoc, refEls, props, vars);
      focusFirst(attDoc);
      const attSnap = snapshot(attDoc, attEls, props, vars);

      const pairs = Math.min(refSnap.length, attSnap.length);
      for (let i = 0; i < pairs; i++) {
        const r = refSnap[i];
        const a = attSnap[i];
        const name = `${tag}${r.name}`;

        if (r.tag !== a.tag || r.cls !== a.cls) {
          checks.push({
            label: `${name} — tag and class`,
            expected: `${r.tag.toLowerCase()}${r.cls ? '.' + r.cls : ''}`,
            actual: `${a.tag.toLowerCase()}${a.cls ? '.' + a.cls : ''}`,
            ok: false,
          });
          continue;
        }

        for (const dim of ['width', 'height', 'x', 'y'] as const) {
          if (Math.abs(r.rect[dim] - a.rect[dim]) > TOLERANCE) {
            checks.push({
              label: `${name} — ${dim}`,
              expected: `${Math.round(r.rect[dim])}px`,
              actual: `${Math.round(a.rect[dim])}px`,
              ok: false,
            });
          }
        }

        for (const p of props) {
          if (r.styles[p] !== a.styles[p]) {
            checks.push({ label: `${name} — ${p}`, expected: r.styles[p], actual: a.styles[p], ok: false });
          }
        }
        for (const v of vars) {
          if (r.vars[v] !== a.vars[v]) {
            checks.push({ label: `${name} — ${v}`, expected: r.vars[v] || '(unset)', actual: a.vars[v] || '(unset)', ok: false });
          }
        }
      }
    } catch (e) {
      return { pass: false, checks, error: e instanceof Error ? e.message : String(e), gradedAt: Date.now() };
    } finally {
      refFrame?.remove();
      attFrame?.remove();
    }
  }

  if (checks.length === 1 && checks[0].ok) {
    checks.push({
      label: `geometry and computed styles at ${widths.join(', ')}px`,
      expected: 'match reference',
      actual: 'match',
      ok: true,
    });
  }

  return { pass: checks.every((c) => c.ok), checks, gradedAt: Date.now() };
}
