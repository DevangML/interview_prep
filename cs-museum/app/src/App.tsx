import { useEffect, useMemo, useState } from "react";
import { EvidencePanel } from "./components/EvidencePanel";
import { MetricCard } from "./components/MetricCard";
import { QuestionDeck } from "./components/QuestionDeck";
import { ConceptRecord, CorpusManifest, CoverageReport, loadCluster, loadCoverage, loadManifest } from "./lib/csMuseumCorpus";

type LoadState = "idle" | "loading" | "ready" | "error";

export default function App() {
  const [manifest, setManifest] = useState<CorpusManifest>();
  const [coverage, setCoverage] = useState<CoverageReport>();
  const [records, setRecords] = useState<Record<string, ConceptRecord[]>>({});
  const [clusterId, setClusterId] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [query, setQuery] = useState("");
  const [state, setState] = useState<LoadState>("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    loadManifest()
      .then((loadedManifest) => Promise.all([loadedManifest, loadCoverage(loadedManifest)]))
      .then(([loadedManifest, loadedCoverage]) => {
        setManifest(loadedManifest);
        setCoverage(loadedCoverage);
        setClusterId(loadedManifest.chunks[0]?.id ?? "");
        setState("ready");
      })
      .catch((reason: unknown) => {
        setError(reason instanceof Error ? reason.message : "The corpus could not be loaded.");
        setState("error");
      });
  }, []);

  useEffect(() => {
    if (!manifest || !clusterId || records[clusterId]) return;
    setState("loading");
    loadCluster(manifest, clusterId)
      .then((loaded) => { setRecords((current) => ({ ...current, [clusterId]: loaded })); setSelectedId(loaded[0]?.id ?? ""); setState("ready"); })
      .catch((reason: unknown) => { setError(reason instanceof Error ? reason.message : "The cluster could not be loaded."); setState("error"); });
  }, [clusterId, manifest, records]);

  const visibleRecords = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return (records[clusterId] ?? []).filter((record) => !normalized || `${record.name} ${record.problem} ${record.mechanism}`.toLowerCase().includes(normalized));
  }, [clusterId, query, records]);
  const selected = (records[clusterId] ?? []).find((record) => record.id === selectedId) ?? visibleRecords[0];

  if (state === "error") return <main className="shell"><header className="masthead"><span className="mark">CS</span><div><span className="eyebrow">CS Museum</span><h1>Evidence atlas unavailable</h1></div></header><div className="error-box" role="alert"><b>{error}</b><p>Run the corpus sync command from the project root, then reload this page.</p></div></main>;
  if (!manifest || !coverage) return <main className="shell loading-screen"><span className="mark">CS</span><p>Loading the published corpus…</p></main>;

  return <main className="shell">
    <header className="masthead"><div className="brand-line"><span className="mark">CS</span><div><span className="eyebrow">CS Museum · evidence atlas</span><h1>See the idea, its source, and its limits.</h1></div></div><span className="version">release {manifest.version}</span></header>
    <section className="intro"><p>This reader keeps the corpus as the data layer. It reshapes records for the screen, then shows the evidence boundary beside every claim.</p><a href="/cs-museum/COMPLETENESS-CONTRACT.md">Read the completeness contract ↗</a></section>
    <section className="metrics" aria-label="Corpus release metrics">
      <MetricCard label="Concepts" value={coverage.conceptCount} detail={`${Object.keys(coverage.clusterCounts).length} clusters`} />
      <MetricCard label="Language cells" value={coverage.languageCellCount} detail={`${coverage.statusCounts["first-class"] ?? 0} first-class · ${coverage.statusCounts.partial ?? 0} partial`} />
      <MetricCard label="Unknown" value={coverage.statusCounts.unknown ?? 0} detail="unknown means unverified" />
      <MetricCard label="Sources" value={coverage.sourceArchiveCount ?? 104} detail={`${coverage.primarySourceCount ?? 40} canonical primary/official`} />
    </section>
    <QuestionDeck coverage={coverage} />
    <section className="atlas-layout" aria-label="Concept atlas reader">
      <aside className="cluster-panel"><div className="panel-heading"><div><span className="eyebrow">Browse by pressure</span><h2>Clusters</h2></div><span className="scope-pill">{manifest.chunks.length}</span></div><label className="search-label" htmlFor="concept-search">Find a concept</label><input id="concept-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="memory, equality, dispatch…" />
        <div className="cluster-list">{manifest.chunks.map((chunk) => <button className={chunk.id === clusterId ? "cluster-button active" : "cluster-button"} key={chunk.id} onClick={() => { setClusterId(chunk.id); setQuery(""); }}><span>{chunk.id.replaceAll("-", " ")}</span><small>{chunk.count}</small></button>)}</div>
      </aside>
      <section className="concept-panel"><div className="panel-heading"><div><span className="eyebrow">{clusterId.replaceAll("-", " ") || "Concepts"}</span><h2>{visibleRecords.length} visible concepts</h2></div><span className="scope-pill">on demand</span></div><div className="concept-list">{visibleRecords.map((record) => <button className={record.id === selected?.id ? "concept-button active" : "concept-button"} key={record.id} onClick={() => setSelectedId(record.id)}><b>{record.name}</b><span>{record.problem}</span></button>)}</div>{selected && <article className="record"><span className="eyebrow">{selected.id}</span><h2>{selected.name}</h2><p className="lead">{selected.mechanism}</p><div className="record-columns"><div><span className="field-label">Example</span><p>{selected.examples[0] ?? "No example recorded."}</p></div><div><span className="field-label">Counterexample</span><p>{selected.counterexamples[0] ?? "No counterexample recorded."}</p></div></div><EvidencePanel record={selected} coverage={coverage} /></article>}</section>
    </section>
    <footer><span>Corpus: immutable JSON release · UI: pure adapter + presentation</span><a href="/cs-museum/PROJECT-CONTEXT.md">AI project context ↗</a></footer>
  </main>;
}
