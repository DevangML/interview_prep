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
  'outline-color', 'outline-style', 'outline-width', 'outline-offset',
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

      focusFirst(refDoc);
      focusFirst(attDoc);

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

      const pairs = Math.min(refEls.length, attEls.length);
      for (let i = 0; i < pairs; i++) {
        const r = refEls[i];
        const a = attEls[i];
        const name = `${tag}${describe(r, i)}`;
        const refCls = (r.getAttribute('class') || '').trim();
        const attCls = (a.getAttribute('class') || '').trim();

        if (r.tagName !== a.tagName || refCls !== attCls) {
          checks.push({
            label: `${name} — tag and class`,
            expected: `${r.tagName.toLowerCase()}${refCls ? '.' + refCls : ''}`,
            actual: `${a.tagName.toLowerCase()}${attCls ? '.' + attCls : ''}`,
            ok: false,
          });
          continue;
        }

        const rr = r.getBoundingClientRect();
        const ar = a.getBoundingClientRect();
        for (const dim of ['width', 'height', 'x', 'y'] as const) {
          if (Math.abs(rr[dim] - ar[dim]) > TOLERANCE) {
            checks.push({
              label: `${name} — ${dim}`,
              expected: `${Math.round(rr[dim])}px`,
              actual: `${Math.round(ar[dim])}px`,
              ok: false,
            });
          }
        }

        const rcs = refDoc.defaultView!.getComputedStyle(r);
        const acs = attDoc.defaultView!.getComputedStyle(a);
        for (const p of props) {
          const key = camel(p) as keyof CSSStyleDeclaration;
          const ev = String(rcs[key] ?? '');
          const av = String(acs[key] ?? '');
          if (ev !== av) checks.push({ label: `${name} — ${p}`, expected: ev, actual: av, ok: false });
        }
        for (const v of vars) {
          const ev = rcs.getPropertyValue(v).trim();
          const av = acs.getPropertyValue(v).trim();
          if (ev !== av) checks.push({ label: `${name} — ${v}`, expected: ev || '(unset)', actual: av || '(unset)', ok: false });
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
