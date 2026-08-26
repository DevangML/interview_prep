/**
 * Turning a model's words into editor coordinates.
 *
 * The naive design asks the LLM for a line number. It is the wrong question: a
 * 1.5B model counts lines badly, and a squiggle on the wrong line costs more
 * trust than no squiggle at all — after the first mistake you stop believing
 * the correct ones too.
 *
 * So the model is never asked where. It is asked to **quote** — to copy the
 * exact substring of the student's own code it is talking about. Quoting is
 * something language models are reliably good at, because it is copying rather
 * than counting. The document then locates the quote itself, deterministically.
 *
 *   the model supplies semantics · the document supplies coordinates
 *
 * Four strategies, tried in order, each weaker and each honest about it. If all
 * four fail the finding stays unanchored and is shown in the panel only. A
 * finding we cannot place is never guessed onto a line.
 */

export type AnchorStrategy = 'exact' | 'normalized' | 'tokens' | 'unanchored';

export interface RawFinding {
  /** Verbatim slice of the student's code the model is referring to. */
  anchorCode: string;
  severity: 'bug' | 'smell' | 'missing';
  /** The underlying concept — no code, no answer. */
  concept: string;
  /** Targeted clue naming the identifier or state involved. */
  hint: string;
  /** Structural direction toward a fix, still not the code. */
  fix: string;
}

export interface AnchoredFinding extends RawFinding {
  from: number;
  to: number;
  /** 1-based, for display. */
  line: number;
  endLine: number;
  strategy: AnchorStrategy;
}

/** Collapse runs of whitespace so indentation and line breaks stop mattering. */
function normalize(text: string): { text: string; map: number[] } {
  const out: string[] = [];
  const map: number[] = [];
  let lastWasSpace = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (/\s/.test(ch)) {
      if (lastWasSpace) continue;
      out.push(' ');
      map.push(i);
      lastWasSpace = true;
    } else {
      out.push(ch);
      map.push(i);
      lastWasSpace = false;
    }
  }
  return { text: out.join(''), map };
}

/** Identifiers, numbers and operators — enough to find a statement that was re-indented. */
function tokenize(text: string): { tok: string; at: number }[] {
  const out: { tok: string; at: number }[] = [];
  for (const m of text.matchAll(/[A-Za-z_$][\w$]*|\d+(?:\.\d+)?|[^\s\w]/g)) {
    if (m.index !== undefined) out.push({ tok: m[0], at: m.index });
  }
  return out;
}

function lineAt(doc: string, offset: number): number {
  let line = 1;
  for (let i = 0; i < offset && i < doc.length; i++) if (doc[i] === '\n') line++;
  return line;
}

function locate(doc: string, quote: string): { from: number; to: number; strategy: AnchorStrategy } | null {
  const needle = quote.trim();
  if (!needle) return null;

  // 1. The model quoted verbatim. The common case, and the only exact one.
  const exact = doc.indexOf(needle);
  if (exact !== -1) return { from: exact, to: exact + needle.length, strategy: 'exact' };

  // 2. It quoted the statement but reflowed the whitespace.
  const nd = normalize(doc);
  const nq = normalize(needle);
  const hit = nd.text.indexOf(nq.text);
  if (hit !== -1) {
    const from = nd.map[hit];
    const endIdx = Math.min(hit + nq.text.length - 1, nd.map.length - 1);
    return { from, to: nd.map[endIdx] + 1, strategy: 'normalized' };
  }

  // 3. It paraphrased spacing or punctuation but the identifier sequence holds.
  const docTokens = tokenize(doc);
  const qTokens = tokenize(needle).map((t) => t.tok);
  if (qTokens.length >= 2) {
    for (let i = 0; i + qTokens.length <= docTokens.length; i++) {
      let ok = true;
      for (let j = 0; j < qTokens.length; j++) {
        if (docTokens[i + j].tok !== qTokens[j]) { ok = false; break; }
      }
      if (ok) {
        const from = docTokens[i].at;
        const last = docTokens[i + qTokens.length - 1];
        return { from, to: last.at + last.tok.length, strategy: 'tokens' };
      }
    }
  }

  // 4. Give up loudly rather than quietly pointing somewhere plausible.
  return null;
}

export function anchorFindings(doc: string, findings: RawFinding[]): {
  anchored: AnchoredFinding[];
  unanchored: RawFinding[];
} {
  const anchored: AnchoredFinding[] = [];
  const unanchored: RawFinding[] = [];

  for (const f of findings) {
    const hit = locate(doc, f.anchorCode || '');
    if (!hit) { unanchored.push(f); continue; }
    anchored.push({
      ...f,
      from: hit.from,
      to: hit.to,
      line: lineAt(doc, hit.from),
      endLine: lineAt(doc, hit.to),
      strategy: hit.strategy,
    });
  }

  // Earlier in the file first: you fix code top-down.
  anchored.sort((a, b) => a.from - b.from);
  return { anchored, unanchored };
}
