import type { ConceptRecord, CoverageReport } from "../lib/csMuseumCorpus";
import { toEvidenceEnvelope } from "../lib/csMuseumCorpus";

type EvidencePanelProps = { record: ConceptRecord; coverage: CoverageReport };

export function EvidencePanel({ record, coverage }: EvidencePanelProps) {
  const evidence = toEvidenceEnvelope(record, coverage);
  return (
    <section className="evidence-panel" aria-labelledby="evidence-title">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Evidence envelope</span>
          <h2 id="evidence-title">Can this claim be trusted?</h2>
        </div>
        <div className="authority-badge" title={evidence.authorityRationale}>
          <strong>{evidence.authorityScore}/10</strong>
          <span>authority</span>
        </div>
      </div>
      <div className="evidence-grid">
        <div><span className="field-label">Who said this</span><p>{evidence.whoSaidThis}</p></div>
        <div><span className="field-label">Confidence</span><p>{evidence.confidence}</p></div>
        <div className="full-width"><span className="field-label">Reasoning chain</span>
          <ol className="reasoning-chain">{evidence.reasoningChain.map((step) => <li key={step.label}><b>{step.label}:</b> {step.value}</li>)}</ol>
        </div>
        <div className="full-width"><span className="field-label">Exhaustiveness</span><p>{evidence.exhaustiveness}</p></div>
        <div className="full-width"><span className="field-label">Further research</span>
          <ul className="research-list">{evidence.furtherResearch.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="full-width"><span className="field-label">Supporting sources</span>
          {evidence.sources.length ? <ul className="source-list">{evidence.sources.map((source) => <li key={source}><a href={source} target="_blank" rel="noreferrer">{source}</a></li>)}</ul> : <p className="muted">No source attached.</p>}
        </div>
      </div>
    </section>
  );
}
