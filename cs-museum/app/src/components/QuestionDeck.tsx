import type { CoverageReport } from "../lib/csMuseumCorpus";

type QuestionDeckProps = { coverage: CoverageReport };

export function QuestionDeck({ coverage }: QuestionDeckProps) {
  const questions = [
    ["1", "Do you hold all of CS?", `Bounded yes: ${coverage.conceptCount} published concepts. Universal CS coverage is not claimed.`],
    ["2", "Does it build mental models?", "Designed to: each record links problem, mechanism, trade-offs, transfer rule, counterexample, and an assessment prompt."],
    ["3", "Is the UI glanceable?", "The reader keeps scope metrics, one cluster at a time, search, and one evidence envelope in view to limit overload."],
    ["4", "Is it user friendly?", "The surface uses native controls, keyboard-focusable links, short cards, progressive loading, and explicit empty/error states."],
    ["5", "Does it cover every computer concept?", `${coverage.statusCounts.unknown ?? 0} language cells remain unknown; coverage is a measured release boundary, not the internet.`],
    ["6", "Is the app only a presentation layer?", "Yes by contract: the corpus owns meaning, generated chunks are delivery artifacts, and the adapter owns pure view transformations."],
  ];
  return <section className="question-deck" aria-labelledby="questions-title">
    <div className="panel-heading"><div><span className="eyebrow">Built-in audit questions</span><h2 id="questions-title">Ask the corpus honestly</h2></div><span className="scope-pill">release {coverage.conceptCount}</span></div>
    <div className="question-grid">{questions.map(([number, question, answer]) => <article className="question-card" key={number}><span className="question-number">{number}</span><div><h3>{question}</h3><p>{answer}</p></div></article>)}</div>
  </section>;
}
