import type { AnchoredFinding } from '../../../../lib/anchorFindings';

export function renderFindingTooltip(
  finding: AnchoredFinding,
  idx: number,
  revealed: Map<number, number>
): HTMLElement {
  const dom = document.createElement('div');
  dom.className = 'cm-ai-tooltip';

  const head = document.createElement('div');
  head.className = `cm-ai-head cm-ai-head-${finding.severity}`;
  head.innerHTML = `<strong>${finding.severity.toUpperCase()}</strong> · <em>${finding.concept}</em>`;
  dom.appendChild(head);

  const stack = document.createElement('div');
  stack.className = 'cm-ai-stack';

  const l1 = document.createElement('div');
  l1.className = 'cm-ai-level cm-ai-level-1';
  l1.innerHTML = `<span class="cm-ai-num">1</span><span class="cm-ai-body">Look closely at: <code>${escapeHtml(finding.anchorCode)}</code></span>`;
  stack.appendChild(l1);

  const level = revealed.get(idx) ?? 1;

  if (level >= 2 && finding.hint) {
    const l2 = document.createElement('div');
    l2.className = 'cm-ai-level cm-ai-level-2';
    l2.innerHTML = `<span class="cm-ai-num">2</span><span class="cm-ai-body">${escapeHtml(finding.hint)}</span>`;
    stack.appendChild(l2);
  }

  if (level >= 3 && finding.fix) {
    const l3 = document.createElement('div');
    l3.className = 'cm-ai-level cm-ai-level-3';
    l3.innerHTML = `<span class="cm-ai-num">3</span><span class="cm-ai-body">${escapeHtml(finding.fix)}</span>`;
    stack.appendChild(l3);
  }

  dom.appendChild(stack);

  if (level < 3 && (finding.hint || finding.fix)) {
    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'cm-ai-reveal-btn';
    nextBtn.textContent = level === 1 ? 'Reveal hint (2/3)' : 'Reveal fix direction (3/3)';
    nextBtn.onclick = (e) => {
      e.stopPropagation();
      revealed.set(idx, level + 1);
      const parent = dom.parentElement;
      if (parent) {
        const replacement = renderFindingTooltip(finding, idx, revealed);
        parent.replaceChild(replacement, dom);
      }
    };
    dom.appendChild(nextBtn);
  }

  return dom;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}
