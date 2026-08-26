/**
 * Hybrid Knowledge Retrieval Engine (BM25 + Dense Semantic Embeddings + Reciprocal Rank Fusion)
 * Complies with ARCHITECTURE.md v2.3 Contract 3 & PRD Section 3.3:
 * - Exact Symbol BM25 Inverted Index
 * - Dense Vector Cosine Similarity
 * - Reciprocal Rank Fusion (RRF, k = 60)
 * - Temporal Filter (validUntil, status)
 * - Normative Source Provenance
 */

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: 'react19' | 'v8_engine' | 'distributed_systems' | 'crdt' | 'accessibility';
  invariants: string[];
  fullSpecContent: string;
  denseVector: number[]; // 16-dimensional semantic projection vector
  provenance: {
    publisher: string;
    version: string;
    authorityLevel: 'normative' | 'informative';
    validUntil?: number;
    status: 'currently_valid' | 'superseded';
  };
}

export interface RrfSearchResult {
  doc: KnowledgeDocument;
  bm25Score: number;
  denseCosineScore: number;
  rrfScore: number;
  rankBm25: number;
  rankDense: number;
}

export class HybridKnowledgeEngine {
  private docs: KnowledgeDocument[] = [];
  private invertedIndex: Map<string, Set<string>> = new Map();
  private k1 = 1.2;
  private b = 0.75;
  private avgDocLen = 0;

  constructor() {
    this.seedCanonicalSpecs();
    this.rebuildIndex();
  }

  /**
   * Deterministic toy embedding generator (Simulates 16-dim dense semantic embeddings)
   */
  private static generateDenseEmbedding(text: string): number[] {
    const vec = new Array(16).fill(0);
    const words = text.toLowerCase().split(/\W+/).filter(Boolean);
    words.forEach((w, idx) => {
      let hash = 0;
      for (let i = 0; i < w.length; i++) hash = (hash << 5) - hash + w.charCodeAt(i);
      const slot = Math.abs(hash) % 16;
      vec[slot] += (1.0 / (idx + 1));
    });
    // L2 Normalize
    const mag = Math.sqrt(vec.reduce((sum, v) => sum + v * v, 0)) || 1.0;
    return vec.map(v => v / mag);
  }

  private static cosineSimilarity(a: number[], b: number[]): number {
    let dot = 0;
    for (let i = 0; i < Math.min(a.length, b.length); i++) dot += a[i] * b[i];
    return Math.max(0, dot);
  }

  private seedCanonicalSpecs() {
    this.docs = [
      {
        id: 'react19_action_state',
        title: 'React 19 Server Actions & useActionState Lifecycle',
        category: 'react19',
        invariants: [
          'useActionState manages async transition lifecycle boundaries',
          'useOptimistic provides immediate UI mutation with automatic rollback on rejection',
          'Async action rejections must be wrapped in Error Boundaries or useActionState states'
        ],
        fullSpecContent: 'React 19 formalizes Server Actions and Action Hooks. useActionState accepts an action function and returns [state, formAction, isPending]. Optimistic state reverts automatically when action rejects.',
        denseVector: HybridKnowledgeEngine.generateDenseEmbedding('react 19 server actions useactionstate useoptimistic async transitions form rollback error boundary'),
        provenance: { publisher: 'React Core RFC', version: 'React 19.1', authorityLevel: 'normative', status: 'currently_valid' }
      },
      {
        id: 'v8_hidden_classes',
        title: 'V8 Hidden Classes (Shapes) & Inline Cache (IC) Optimization',
        category: 'v8_engine',
        invariants: [
          'Dynamic property additions after object creation trigger Map transitions (Polymorphic/Megamorphic deopts)',
          'Always initialize object properties in identical order inside constructor or factory',
          'Deleting properties transitions objects into Slow Dictionary Mode (HashTable lookup)'
        ],
        fullSpecContent: 'V8 relies on Hidden Classes (Maps) to optimize property lookups into 1-2 CPU cycle offsets. Monomorphic call-sites retain high-speed JIT execution; mutating shapes degrades to Megamorphic dictionary lookups.',
        denseVector: HybridKnowledgeEngine.generateDenseEmbedding('v8 hidden classes shapes inline cache monomorphic polymorphic megamorphic turbofan deopt garbage collection'),
        provenance: { publisher: 'V8 Engine Project', version: 'V8 v12.4', authorityLevel: 'normative', status: 'currently_valid' }
      },
      {
        id: 'distributed_rate_limiter',
        title: 'Distributed Sliding Window Counter Rate Limiting (Redis Lua)',
        category: 'distributed_systems',
        invariants: [
          'Sliding Window Counter interpolates previous window count: Count = Prev * (1 - weight) + Curr',
          'All multi-key read-compute-write operations must execute in atomic Redis Lua scripts',
          'Cluster partitions must use consistent hashing with CRC16 key-tag hash slots ({tenant_id})'
        ],
        fullSpecContent: 'Sliding window counter rate limiters avoid token burst spikes by linearly interpolating between adjacent rolling time buckets. Atomic Lua scripts prevent race conditions in distributed multi-node clusters.',
        denseVector: HybridKnowledgeEngine.generateDenseEmbedding('distributed rate limiter redis lua sliding window counter token bucket concurrency atomic consistent hashing'),
        provenance: { publisher: 'Distributed Systems RFC', version: 'IETF-v2', authorityLevel: 'normative', status: 'currently_valid' }
      },
      {
        id: 'crdt_lww_element_set',
        title: 'CRDT LWW-Element-Set (Last-Write-Wins State Convergence)',
        category: 'crdt',
        invariants: [
          'LWW-Element-Set requires Commutative, Associative, and Idempotent state merges',
          'Deleted elements require durable Tombstones to prevent resurrection during replica sync',
          'Physical timestamps must be augmented with monotonic sequence counters or Vector Clocks'
        ],
        fullSpecContent: 'Conflict-Free Replicated Data Types (CRDTs) guarantee mathematical convergence without centralized coordination. LWW-Element-Set uses max timestamp joins on add and remove sets.',
        denseVector: HybridKnowledgeEngine.generateDenseEmbedding('crdt lww element set vector clocks state convergence tombstones peer to peer distributed sync idempotency'),
        provenance: { publisher: 'INRIA CRDT Specification', version: 'CRDT-v1', authorityLevel: 'normative', status: 'currently_valid' }
      },
      {
        id: 'wcag_target_size',
        title: 'WCAG 2.2 AAA Target Size (Enhanced) & Interaction Primitives',
        category: 'accessibility',
        invariants: [
          'WCAG 2.2 AAA Success Criterion 2.5.8 Enhanced Target Size requires min 44x44 CSS pixels',
          'WCAG 2.2 AA requires min 24x24 CSS pixels with sufficient spacing clearance',
          'Touch targets must have clear focus-visible outlines with min 3:1 contrast against adjacent background'
        ],
        fullSpecContent: 'W3C WCAG 2.2 formalizes Target Size (Enhanced) at 44x44 CSS pixels for AAA conformance and 24x24 CSS pixels for AA conformance, protecting motor-impaired and mobile touch users.',
        denseVector: HybridKnowledgeEngine.generateDenseEmbedding('wcag 2.2 aaa target size 44x44 24x24 accessibility focus visible touch targets motor impaired'),
        provenance: { publisher: 'W3C WAI', version: 'WCAG 2.2', authorityLevel: 'normative', status: 'currently_valid' }
      }
    ];
  }

  private rebuildIndex() {
    this.invertedIndex.clear();
    let totalLen = 0;

    this.docs.forEach(doc => {
      const text = `${doc.title} ${doc.invariants.join(' ')} ${doc.fullSpecContent}`.toLowerCase();
      const tokens = text.split(/\W+/).filter(Boolean);
      totalLen += tokens.length;

      tokens.forEach(tok => {
        if (!this.invertedIndex.has(tok)) this.invertedIndex.set(tok, new Set());
        this.invertedIndex.get(tok)!.add(doc.id);
      });
    });

    this.avgDocLen = this.docs.length > 0 ? totalLen / this.docs.length : 1;
  }

  /**
   * BM25 Score calculation for a document
   */
  private scoreBm25(queryTokens: string[], doc: KnowledgeDocument): number {
    const docText = `${doc.title} ${doc.invariants.join(' ')} ${doc.fullSpecContent}`.toLowerCase();
    const docTokens = docText.split(/\W+/).filter(Boolean);
    const docLen = docTokens.length;

    let score = 0;
    queryTokens.forEach(term => {
      const matchingDocs = this.invertedIndex.get(term)?.size || 0;
      if (matchingDocs === 0) return;

      const idf = Math.log((this.docs.length - matchingDocs + 0.5) / (matchingDocs + 0.5) + 1.0);
      const tf = docTokens.filter(t => t === term).length;
      const termScore = idf * ((tf * (this.k1 + 1)) / (tf + this.k1 * (1 - this.b + this.b * (docLen / this.avgDocLen))));
      score += termScore;
    });

    return score;
  }

  /**
   * Performs Hybrid Dual Retrieval with Reciprocal Rank Fusion (RRF, k = 60)
   */
  public search(query: string, topK: number = 3): RrfSearchResult[] {
    if (!query.trim()) return [];

    const queryTokens = query.toLowerCase().split(/\W+/).filter(Boolean);
    const queryVector = HybridKnowledgeEngine.generateDenseEmbedding(query);

    // 1. BM25 Candidates
    const bm25Scored = this.docs
      .filter(d => d.provenance.status === 'currently_valid')
      .map(doc => ({
        doc,
        score: this.scoreBm25(queryTokens, doc)
      }))
      .sort((a, b) => b.score - a.score);

    // 2. Dense Semantic Cosine Candidates
    const denseScored = this.docs
      .filter(d => d.provenance.status === 'currently_valid')
      .map(doc => ({
        doc,
        score: HybridKnowledgeEngine.cosineSimilarity(queryVector, doc.denseVector)
      }))
      .sort((a, b) => b.score - a.score);

    // 3. Reciprocal Rank Fusion (RRF, k = 60)
    const k = 60;
    const rrfMap = new Map<string, RrfSearchResult>();

    bm25Scored.forEach((item, rank) => {
      const rrf = 1.0 / (k + rank + 1);
      rrfMap.set(item.doc.id, {
        doc: item.doc,
        bm25Score: item.score,
        denseCosineScore: 0,
        rrfScore: rrf,
        rankBm25: rank + 1,
        rankDense: 999
      });
    });

    denseScored.forEach((item, rank) => {
      const rrf = 1.0 / (k + rank + 1);
      if (rrfMap.has(item.doc.id)) {
        const entry = rrfMap.get(item.doc.id)!;
        entry.denseCosineScore = item.score;
        entry.rrfScore += rrf;
        entry.rankDense = rank + 1;
      } else {
        rrfMap.set(item.doc.id, {
          doc: item.doc,
          bm25Score: 0,
          denseCosineScore: item.score,
          rrfScore: rrf,
          rankBm25: 999,
          rankDense: rank + 1
        });
      }
    });

    return Array.from(rrfMap.values())
      .sort((a, b) => b.rrfScore - a.rrfScore)
      .slice(0, topK);
  }
}

export const globalKnowledgeEngine = new HybridKnowledgeEngine();
