export type CorpusChunkRef = { id: string; path: string; count: number; sha256: string };

export type CorpusManifest = {
  schemaVersion: number;
  version: string;
  conceptCount: number;
  chunks: CorpusChunkRef[];
  graph: string;
  coverage: string;
};

export type LanguageCell = {
  status: string;
  mechanism: string;
  sources: string[];
  versionScope: string;
};

export type ConceptRecord = {
  id: string;
  clusterId: string;
  name: string;
  problem: string;
  origin: { summary: string; confidence: string; sources: string[] };
  mechanism: string;
  solutionFamily: string;
  costs: string[];
  transferRule: string;
  confidence: string;
  sources: string[];
  examples: string[];
  counterexamples: string[];
  assessment: { prompt: string; rubric: string[] };
  languageSupport: Record<string, LanguageCell>;
};

export type CoverageReport = {
  structuralStatus: string;
  conceptCount: number;
  clusterCounts: Record<string, number>;
  languageCellCount: number;
  statusCounts: Record<string, number>;
  unknownCells: Array<{ conceptId: string; language: string }>;
  primarySourceCount?: number;
  primarySourceStatus?: string;
  sourceArchiveCount?: number;
};

export type EvidenceEnvelope = {
  whoSaidThis: string;
  sources: string[];
  authorityScore: number;
  authorityRationale: string;
  confidence: string;
  reasoningChain: Array<{ label: string; value: string }>;
  exhaustiveness: string;
  furtherResearch: string[];
};

const DATA_ROOT = "/cs-museum";

export async function loadManifest(): Promise<CorpusManifest> {
  return fetch(`${DATA_ROOT}/manifest.json`).then(readJson<CorpusManifest>);
}

export async function loadCoverage(manifest: CorpusManifest): Promise<CoverageReport> {
  return fetch(`${DATA_ROOT}/${manifest.coverage}`).then(readJson<CoverageReport>);
}

export async function loadCluster(manifest: CorpusManifest, clusterId: string): Promise<ConceptRecord[]> {
  const chunk = manifest.chunks.find((candidate) => candidate.id === clusterId);
  if (!chunk) throw new Error(`Unknown corpus cluster: ${clusterId}`);
  return fetch(`${DATA_ROOT}/${chunk.path}`).then(readJson<ConceptRecord[]>);
}

export function authorityFor(record: ConceptRecord): Pick<EvidenceEnvelope, "authorityScore" | "authorityRationale"> {
  const host = record.sources[0] ? new URL(record.sources[0]).hostname : "";
  if (host === "tc39.es" || host.endsWith(".ietf.org")) {
    return { authorityScore: 10, authorityRationale: "Normative specification or standard; provisional until human review." };
  }
  const officialHosts = ["rust-lang.org", "python.org", "go.dev", "openjdk.org", "oracle.com", "microsoft.com", "llvm.org", "postgresql.org", "swift.org", "ocaml.org", "clojure.org"];
  if (officialHosts.some((candidate) => host === candidate || host.endsWith(`.${candidate}`))) {
    return { authorityScore: 8, authorityRationale: "Maintained official language, runtime, or project documentation; provisional until human review." };
  }
  return record.sources.length
    ? { authorityScore: 5, authorityRationale: "Cited source is present but its authority tier is not on the canonical allowlist." }
    : { authorityScore: 0, authorityRationale: "No supporting source is attached to this record." };
}

export function toEvidenceEnvelope(record: ConceptRecord, coverage: CoverageReport): EvidenceEnvelope {
  const authority = authorityFor(record);
  const unknown = Object.values(record.languageSupport).filter((cell) => cell.status === "unknown").length;
  const furtherResearch = [`${unknown} of ${Object.keys(record.languageSupport).length} language cells are unverified.`];
  if (!record.origin.sources.length || record.origin.confidence.toLowerCase().includes("unverified")) {
    furtherResearch.push("Historical attribution or origin remains unresolved.");
  }
  furtherResearch.push(`The release leaves ${coverage.statusCounts.unknown ?? 0} unknown language cells across ${coverage.conceptCount} concepts.`);
  return {
    whoSaidThis: record.origin.summary,
    sources: record.sources,
    ...authority,
    confidence: record.confidence,
    reasoningChain: [
      { label: "Problem", value: record.problem },
      { label: "Mechanism", value: record.mechanism },
      { label: "Solution family", value: record.solutionFamily },
      { label: "Trade-offs", value: record.costs.join(" ") },
      { label: "Transfer rule", value: record.transferRule },
    ],
    exhaustiveness: `Exhaustive only within the ${coverage.conceptCount}-concept, ${Object.keys(coverage.clusterCounts).length}-cluster release; it is not a claim about all computer science.`,
    furtherResearch,
  };
}

function readJson<T>(response: Response): Promise<T> {
  if (!response.ok) throw new Error(`Corpus request failed (${response.status})`);
  return response.json() as Promise<T>;
}
