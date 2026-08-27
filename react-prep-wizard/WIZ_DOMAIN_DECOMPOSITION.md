# WIZ: Domain Decomposition Architecture (No Better Model Needed)

## The Insight

**Don't ask the model to think harder. Break the problem into isolated domain tasks and execute them in parallel.**

```
❌ OLD (Single Model Thinking Hard)
User Query → [Model struggles with everything] → Answer
Cost: Full reasoning + hallucination risk

✅ NEW (Parallel Domain Experts)
User Query
  ├─ Domain 1 (isolated)  → Skill/Tool/Data [parallel]
  ├─ Domain 2 (isolated)  → Skill/Tool/Data [parallel]
  ├─ Domain 3 (isolated)  → Skill/Tool/Data [parallel]
  └─ Synthesis (focused)  → Combine results
Cost: Each domain is narrow + faster + fewer errors
```

---

## Architecture

### Step 1: Query Decomposition (Classify + Plan)

```typescript
interface TaskDecomposition {
  mainQuery: string;
  domains: Domain[];
  executionModel: 'parallel' | 'sequential' | 'hierarchical';
  synthesisStrategy: string;
}

interface Domain {
  id: string;
  name: string; // 'research', 'architecture', 'security', etc.
  subTask: string; // The isolated question for this domain
  requiredSkills: string[];
  requiredTools: string[];
  dataNeeded: string[];
  expectedOutput: string;
  timeout: number;
}
```

### Step 2: Parallel Execution (No Model Reasoning)

```typescript
// Example: "How should I design a rate limiter for 100k QPS?"

const domains = [
  {
    id: 'arch',
    name: 'Architecture',
    subTask: 'What are proven patterns for rate limiters?',
    requiredSkills: ['design-system-architecture'],
    requiredTools: ['data-query', 'web-search'],
    dataNeeded: ['existing-architectures', 'benchmark-data'],
    expectedOutput: 'Architecture pattern + tradeoffs',
    timeout: 3000
  },
  {
    id: 'perf',
    name: 'Performance',
    subTask: 'What latency/throughput can each pattern achieve?',
    requiredSkills: ['review-performance'],
    requiredTools: ['benchmark-data', 'math'],
    dataNeeded: ['benchmark-results'],
    expectedOutput: 'Performance metrics for each pattern',
    timeout: 2000
  },
  {
    id: 'security',
    name: 'Security',
    subTask: 'What are security implications of each pattern?',
    requiredSkills: ['review-security'],
    requiredTools: ['threat-model', 'data-query'],
    dataNeeded: ['attack-vectors'],
    expectedOutput: 'Security analysis for each pattern',
    timeout: 2500
  },
  {
    id: 'impl',
    name: 'Implementation',
    subTask: 'How hard is each pattern to implement?',
    requiredSkills: ['review-code-quality'],
    requiredTools: ['code-examples', 'data-query'],
    dataNeeded: ['reference-implementations'],
    expectedOutput: 'Implementation complexity + gotchas',
    timeout: 2000
  }
];

// Execute all domains in parallel
const results = await Promise.all(
  domains.map(domain => executeDomainTask(domain))
);
// Total time: ~3s (not 3+2+2.5+2 = 9.5s)
```

### Step 3: Synthesis (Lightweight Model Use)

```typescript
// Only now use the model—for synthesis, not reasoning

const synthesisPrompt = `
You have domain expert findings:

Architecture: ${results.arch.output}
Performance: ${results.perf.output}
Security: ${results.security.output}
Implementation: ${results.impl.output}

Synthesize into a recommendation:
1. Which pattern should I use?
2. Why (one sentence)?
3. Key tradeoffs

Keep it concise. Use the findings above—don't reason from scratch.
`;

const answer = await model.generate(synthesisPrompt);
// This is lightweight synthesis, not heavy reasoning
// Model just combines findings
```

---

## Why This Works Better Than "Better Model"

| Aspect | Single Model Hard Thinking | Domain Decomposition |
|--------|---------------------------|---------------------|
| **Reasoning scope** | Everything at once (hard) | Each domain narrow (easy) |
| **Execution** | Sequential thinking | Parallel domain experts |
| **Error source** | Hallucination in reasoning | Wrong tool selection (recoverable) |
| **Speed** | 10-15s (slow CoT) | 3-5s (parallel) |
| **Model cost** | High (complex reasoning) | Low (lightweight synthesis) |
| **Accuracy** | Prone to mistakes | Each domain is verifiable |
| **Scalability** | Hard (more thinking = harder) | Easy (add more domains) |

---

## Implementation Pattern

### Pattern 1: Research Question
```
Query: "What's new in React 19?"

Decompose:
├─ Domain: Web Research
│  └─ Task: "Search for latest React 19 features"
│  └─ Tool: web-search
│  └─ Output: [links, summaries]
│
├─ Domain: Technical Depth
│  └─ Task: "Deep dive into 3 key features"
│  └─ Skill: technical-deep-dive
│  └─ Tool: web-search + code-examples
│  └─ Output: [detailed analysis]
│
└─ Synthesis
   └─ Model: "Combine findings into coherent summary"
   └─ Output: Final answer

Execution: Domains in parallel, then synthesis
```

### Pattern 2: Architecture Decision
```
Query: "Design a rate limiter for 100k QPS"

Decompose:
├─ Architecture domain → patterns + tradeoffs
├─ Performance domain → latency/throughput analysis
├─ Security domain → threat analysis
├─ Implementation domain → complexity assessment
├─ Cost domain → infrastructure costs
└─ Synthesis → recommendation

Execution: All 5 domains in parallel (3s total)
```

### Pattern 3: Code Review
```
Query: "Review this function"

Decompose:
├─ Quality domain → style + patterns
├─ Performance domain → complexity analysis
├─ Security domain → vulnerability scan
├─ Testability domain → coverage assessment
└─ Synthesis → summary + prioritized improvements

Execution: 4 domains parallel (2s total)
```

---

## Key Techniques

### 1. **Skill-as-Domain-Expert**
Each skill is a narrow domain expert. Instead of asking the model, invoke the skill.

```typescript
// Don't ask model: "Is this code performant?"
// Instead invoke skill:
const perfAnalysis = await invokeSkill('review-performance', {
  code: userCode,
  constraints: { maxLatency: 10 },
  expectedThroughput: 100000
});
```

### 2. **Tool-Chain-Per-Domain**
Each domain knows exactly what tools/data it needs.

```typescript
// Security domain knows its tools
const securityAnalysis = await executeDomain({
  name: 'security',
  tools: ['threat-model', 'cve-database', 'attack-patterns'],
  dataNeeded: ['code', 'architecture', 'dependencies']
});

// Performance domain knows its tools
const perfAnalysis = await executeDomain({
  name: 'performance',
  tools: ['benchmark-data', 'complexity-analyzer', 'profiler'],
  dataNeeded: ['code', 'constraints']
});
```

### 3. **Evidence-Per-Domain**
Each domain collects its own evidence (no model reasoning needed).

```typescript
const securityDomain = {
  findings: [
    { claim: 'SQL injection risk', evidence: 'User input not parameterized', severity: 'high' },
    { claim: 'CORS misconfigured', evidence: 'Allow * in headers', severity: 'medium' }
  ],
  confidence: 0.95, // Based on evidence, not model guess
  sources: ['static-analysis', 'cve-database', 'code-review']
};
```

### 4. **Parallel Async Execution**
Don't wait for domain 1 before starting domain 2.

```typescript
// All domains execute simultaneously
const [arch, perf, security, impl] = await Promise.all([
  executeDomain(architectureDomain),
  executeDomain(performanceDomain),
  executeDomain(securityDomain),
  executeDomain(implementationDomain)
]);
// Total time: max(arch, perf, security, impl) ≈ 3-5s
// NOT: arch + perf + security + impl ≈ 10-12s
```

### 5. **Lightweight Synthesis**
Only use the model for final synthesis (combining findings, not reasoning).

```typescript
const synthesis = `
Based on domain expert findings:

Architecture: ${arch.recommendation} (${arch.confidence}% confident)
Performance: ${perf.bottlenecks} (${perf.confidence}% confident)
Security: ${security.risks} (${security.confidence}% confident)
Implementation: ${impl.complexity} (${impl.confidence}% confident)

Recommend: [synthesize above, don't reason from scratch]
`;

const answer = await model.generate(synthesis);
// Model just combines—doesn't think hard
// This is fast + accurate
```

---

## Comparison to Alternatives

### vs. Better Model (e.g., Claude)
```
Cost: $0 (use current model)
Speed: 3-5s (parallel domains)
Accuracy: Higher (evidence-based)
Dependency: Current model fine (no new API)
```

### vs. CoT (Chain-of-Thought)
```
CoT: Ask model to think step-by-step
Problem: Thinking is sequential, error-prone

Domain Decomposition: Break into domains, parallelize
Benefit: Faster, more accurate, fewer hallucinations
```

### vs. Tree-of-Thought (Multiple Paths)
```
ToT: Explore multiple reasoning paths
Problem: Still model reasoning, expensive in tokens

Domain Decomposition: Each domain is a small task
Benefit: Tasks are narrow, tools handle it, model only synthesizes
```

---

## Implementation Steps

### Phase 1: Decomposition Engine (1 week)
- [ ] Build `QueryDecomposer` class
- [ ] Define domain taxonomy (research, architecture, performance, security, implementation)
- [ ] Create decomposition rules
- [ ] Build domain registry

### Phase 2: Parallel Executor (1 week)
- [ ] Build `DomainExecutor` class
- [ ] Implement Promise.all orchestration
- [ ] Add timeout/retry logic
- [ ] Implement evidence collection

### Phase 3: Synthesis (1 week)
- [ ] Build lightweight synthesis prompt
- [ ] Implement result combination
- [ ] Add confidence scoring
- [ ] Build activity trace

### Phase 4: Integration with WIZ (1 week)
- [ ] Wire into WIZ backend
- [ ] Replace reasoning loops with domain decomposition
- [ ] Test end-to-end
- [ ] Measure performance

---

## Expected Outcomes

### Speed
- **Before**: 10-15s (model thinking hard)
- **After**: 3-5s (parallel domains)
- **Gain**: 2-3x faster

### Accuracy
- **Before**: Model reasoning (prone to hallucinations)
- **After**: Domain experts + tools (evidence-based)
- **Gain**: ~20-30% fewer errors

### Cost
- **Before**: Expensive model, heavy reasoning
- **After**: Current model, lightweight synthesis
- **Gain**: Free (no new API)

### Parallelism
- **Before**: Sequential thinking (1 thread)
- **After**: N domains in parallel
- **Gain**: Near-linear speedup

---

## Example: Full Flow

```
User: "How should I optimize this database query for production?"

Step 1: Decompose
domains = [
  { name: 'performance', task: 'Analyze query latency' },
  { name: 'scalability', task: 'Can it handle 100k QPS?' },
  { name: 'implementation', task: 'How hard to optimize?' },
  { name: 'tradeoffs', task: 'What do we sacrifice?' }
]

Step 2: Execute in Parallel (0.5s each, 0.5s total)
[
  { domain: 'performance', result: 'Current: 50ms, bottleneck: N+1' },
  { domain: 'scalability', result: 'Scales to 10k QPS, breaks at 100k' },
  { domain: 'implementation', result: 'Add index: 1h, cache: 2h' },
  { domain: 'tradeoffs', result: 'Cache adds memory use, stale reads' }
]

Step 3: Synthesize (Model combines findings)
Prompt: "Here are 4 domain analyses... recommend an optimization approach"
Output: "Add index first (1h, 80% speedup), then cache if needed"

Total time: 0.5s (not 20s of model thinking)
```

---

## Why This Is Better Than Looking for a Better Model

1. **No dependency**: Works with current model
2. **No GPU needed**: Parallel execution is orchestration, not ML
3. **Faster**: 3-5s vs 10-15s
4. **More accurate**: Evidence-based vs reasoning-based
5. **Free**: No new API, no cost
6. **Scalable**: Add more domains easily
7. **Debuggable**: See what each domain found
8. **Verifiable**: Evidence is external (tests, specs, data)

---

## The Philosophy

**Don't make the model think harder. Make it think about less.**

Each domain handles a narrow task with specific tools. The model only synthesizes at the end. This is faster, cheaper, more accurate, and scales better than asking the model to reason deeply about everything.

This is what separation of concerns looks like in AI systems.
