# WIZ: 770 vs 930 — Side-by-Side Comparison

## The Fundamental Shift

### 770 (Original)
```
Heavy Thinking
↓
Multiple Perspectives  
↓
Self Verification
↓
Output
```

### 930 (Revised)
```
Classify ← Quick
↓
Retrieve ← Data-driven
↓
Act ← Tool execution
↓
Verify ← External evidence
↓
Learn ← Measured outcome
↓
Output ← Transparent
```

---

## Detailed Comparison

### 1. Reasoning Architecture

| Aspect | 770 | 930 |
|--------|-----|-----|
| **Core metaphor** | "Think like a researcher" | "Act like an engineer" |
| **Primary mechanism** | Chain-of-Thought + Tree-of-Thought | Environment loop + observation |
| **Complexity** | 6-step reasoning sequence | 4-step action loop |
| **Error handling** | Internal consistency checks | External ground truth |
| **Learning source** | Implicit (next session) | Explicit (measured outcomes) |
| **User transparency** | "[WIZ THINKING] Step 1…" | "Queried X, got Y, verified with Z" |

**Why 930 is better**: 
- LLM self-critique is correlated error. External evidence is independent.
- Environment loops let you observe failures and fix them. Reasoning loops hide failures inside black-box thinking.
- Measured learning beats implicit learning. You can see what worked.

---

### 2. Tool Selection

| Aspect | 770 | 930 |
|--------|-----|-----|
| **Strategy** | "Load all 76 skills" | "Semantic match top-3" |
| **Selection method** | Fixed matrix (3 perspectives) | Adaptive (to query type) |
| **Context pollution** | High (76 skills available) | Low (3 skills loaded) |
| **Learning signal** | None (skills never evaluated) | Explicit (success_rate tracked) |
| **Skill metadata** | name + description | name + description + **cost + latency + successRate + domains** |
| **Cold-start problem** | Uniform selection | Semantic embedding + baseline rates |

**Cost of 770**: 
- Context clutter → worse reasoning
- No skill evaluation → can't improve selection
- Same 76 regardless of query → wasteful

**Benefit of 930**:
```
Query: "Debug memory leak in React component"
Search skill embeddings...
Top-3 by relevance:
1. bmad-debugger (0.94 sim, 88% success) ✓
2. bmad-performance (0.87 sim, 79% success)
3. bmad-code-review (0.81 sim, 71% success)

Don't load: bmad-market-researcher, bmad-business-strategy, 70 others
```

---

### 3. Data Architecture

| Aspect | 770 | 930 |
|--------|-----|-----|
| **Layers** | Postgres + Redis + IndexedDB | Postgres + Redis + IndexedDB |
| **Ownership** | Vague ("all three store data") | Clear (single source per domain) |
| **Consistency model** | Undefined | Postgres (durable) → Redis (ephemeral) → IndexedDB (session) |
| **Query safety** | API-level "read-only" check | **DB role (wiz_reader) rejects mutations** |
| **Guarantee** | ❌ Depends on app staying correct | ✅ Impossible to violate (DB rejects) |

**Risk of 770**:
```
if (!query.startsWith('SELECT')) {
  throw 'read-only'; // If app has a bug, this check doesn't run
}
// Attacker could bypass app → mutate data
```

**Security of 930**:
```sql
CREATE ROLE wiz_reader;
GRANT SELECT ON ALL TABLES TO wiz_reader;
REVOKE INSERT, UPDATE, DELETE ON ALL TABLES FROM wiz_reader;

-- Even if app is hacked, database refuses mutations
```

---

### 4. Verification

| Aspect | 770 | 930 |
|--------|-----|-----|
| **Method** | LLM self-critique | External ground truth |
| **Sources** | Fact-check, consistency-check, completeness-check (all from LLM) | Test suite, specs, runtime data, benchmark |
| **Independence** | ❌ Correlated (same model) | ✅ Independent (external evidence) |
| **Confidence basis** | "Model feels confident" | "Evidence confirms/contradicts" |
| **Uncertainty handling** | Score 0-1 | Score 0-1 + evidence list |
| **When LLM checks LLM** | Always | Only if no external evidence |

**Example: "React 19 has automatic batching"**

770:
```
LLM: "I'm 90% confident React 19 has automatic batching"
← Model evaluates its own claim (circular)
```

930:
```
Check spec (RFC #188): ✓ Confirmed
Check release notes: ✓ Confirmed  
Check community: ✓ Confirmed
Evidence: [official sources]
Confidence: 99% (external)

(If all evidence sources failed, then try independent LLM)
```

---

### 5. Memory

| Aspect | 770 | 930 |
|--------|-----|-----|
| **Model** | "Context synthesis" | Typed: profile + episodic + semantic + procedural |
| **Provenance** | "Learned somehow" | Explicit: direct-observation / inferred / learned |
| **Confidence** | Implicit | Explicit: 0.0-1.0 per memory |
| **Validity** | "Stays forever" | Temporal: createdAt + expiresAt + lastAccessed |
| **Learning** | "Gets better over time" | Measured: retrievalUtility + falsePositiveCount |
| **Contradictions** | Ignored | Tracked: conflicting memories → flag |
| **Inheritance** | New system | **Ports from ACE project** |

**770 memory gap**:
```
User: "I learned React in 3 months"
WIZ stores... what exactly?
- User profile: {skill: 'react', time: 3_months}
- How confident? Unknown.
- When will this expire? Unknown.
- Does this contradict earlier info? Unknown.
```

**930 memory clarity**:
```
Memory {
  id: 'mem-user-react-skill',
  type: 'episodic',
  content: 'User learned React in 3 months',
  source: 'direct-observation',
  confidence: 0.95,
  expiresAt: 1735689600, // 6 months from now
  retrievalUtility: 0.87, // helps predict learning speed
  falsePositiveCount: 0,
  domains: ['learning', 'react'],
}
```

---

### 6. Transparency

| Aspect | 770 | 930 |
|--------|-----|-----|
| **What's shown** | Internal reasoning steps | What actually happened |
| **User sees** | "[WIZ THINKING] Step 1: Parse intent…" | "Searched 2 sources, invoked 3 tools, verified with data" |
| **Value to user** | ❌ Nice-looking but not actionable | ✅ Can understand decisions, spot gaps |
| **Can user verify?** | "Model's internal thoughts" (no) | "Here's the evidence" (yes) |
| **Helps debugging?** | "Is thinking OK?" (subjective) | "What failed?" (objective) |

**770 trace (not useful)**:
```
[WIZ THINKING]
Step 1: Parse intent — "Understand React Fiber architecture"
Step 2: Context synthesis — Domains: React internals, V8, scheduling
Step 3: Multi-path analysis
  Path 1: Conceptual (React Fiber scheduling model)
  Path 2: Implementation (reconciliation algorithm)
  Path 3: Performance (fiber recycling, batching)
Step 4: Verification (checked against React docs)
Step 5: Synthesis (combined insights)
Step 6: Uncertainty (confidence 0.85)
[/WIZ THINKING]
```
→ User: "OK but why?"

**930 trace (transparent)**:
```
WIZ ACTIVITY TRACE
Request classification: CONCEPTUAL (95% confidence)

Skills selected (semantic match):
1. bmad-react-expert (0.93 sim, 91% success)
2. bmad-performance (0.84 sim, 76% success)

Tools used:
✓ Web: "React Fiber RFC"
  Result: 3 official sources (150ms)
✓ Database: "What are common Fiber misconceptions?"
  Result: 12 patterns in our assessment data (2ms)
✓ Skill: bmad-react-expert
  Input: {sources, patterns, query}
  Reasoning: 1500 tokens (800ms)

Verification:
✓ Claim "Fiber enables concurrent features"
  Evidence: RFC #0069 + React 18 release notes (confirmed, 99%)
✓ Claim "Fiber can pause reconciliation"
  Evidence: React docs + YouTube talk by Sophie (confirmed, 95%)
⚠ Claim "Fiber improves React DevTools"
  Evidence: tangential, soft dependency (medium, 60%)

Final confidence: 82% (high)
Evidence for: official sources, React team talks
Evidence against: none
Gaps: no benchmarks showing real-world improvement

Next step: "Show real-world React Fiber case study"
```
→ User: "Clear. I can verify these sources myself."

---

### 7. Security

| Aspect | 770 | 930 |
|--------|-----|-----|
| **MCP Registration** | Dynamic + tokens | Allowlist + vault + approval |
| **Token storage** | App has access | Vault only, app gets reference |
| **DB read-only** | API check | DB role enforcement |
| **Injection vectors** | Web → parse → SQL (potential) | Strong separation: untrusted data ≠ instructions |
| **Credential scope** | All or nothing | Fine-grained: path + rate limit + approval |
| **Audit trail** | None | Full: who added server, when, what was accessed |
| **Revocation** | None | Instant: disable MCP server, credentials revoked |

**770 security theater**:
```typescript
// Looks safe but isn't
{
  serverName: 'user-provided',
  endpoint: 'user-provided',
  token: 'user-provided' // LLM can see this!
}
```

**930 security-first**:
```typescript
// Actually safe
{
  credentialRef: 'vault://secrets/api-token-prod',
  allowedDomains: ['api.example.com'],
  allowedPaths: ['/mcp/search'],
  rateLimit: 100,
  requiredApproval: true,
  approvalExpiry: timestamp
}
```

---

### 8. Evaluation

| Aspect | 770 | 930 |
|--------|-----|-----|
| **Metrics** | None ("should improve") | Factual accuracy, architectural soundness, tool selection, transparency |
| **Baseline** | None (no comparison) | Claude API alone |
| **Measurement** | Subjective | Objective (evidence-based) |
| **Improvement tracking** | Unknown | Continuous per-skill feedback |
| **Failing cases** | Hidden | Logged + analyzed |
| **Iteration** | Manual guess | Data-driven |

**770 evaluation gap**:
```
"WIZ should improve performance"
→ Compared to what? How much better? Is it real?
```

**930 evaluation framework**:
```
Test Case: "What is React 19's main feature?"
Expected: "Actions" or "Automatic Batching"
Evidence: React release notes + RFC
Baseline (Claude alone): 82% correct
WIZ with tools: 96% correct
WIZ with skills: 97% correct
Improvement: +15 percentage points

Track per-skill:
- bmad-react-expert: 97% accuracy (helps!)
- bmad-performance: 89% accuracy (marginal)
- bmad-code-review: 73% accuracy (sometimes wrong)

→ Keep react-expert, reduce code-review usage
```

---

## Scorecard Reconciliation

### 770 Scores (Original)

| Area | Score | Why |
|------|-------|-----|
| Concept | 900 | Strong idea |
| Architecture | 850 | Simple layers |
| **Tool orchestration** | 820 | But 76 skills is clutter |
| **Skill architecture** | 820 | But no selection strategy |
| **Memory** | 650 | Underspecified |
| **Security** | 620 | API theater, no vault |
| **Verification** | 720 | Self-critique only |
| **Evaluation** | 500 | None |
| **Production** | 520 | Incomplete |
| **Overall** | 770 | Promising platform |

### 930 Scores (Revised)

| Area | Score | Delta | Why |
|------|-------|-------|-----|
| Concept | 920 | +20 | Clearer framing |
| Architecture | 900 | +50 | Environment loop |
| Tool orchestration | 900 | +80 | Semantic selection |
| Skill architecture | 920 | +100 | Top-3 + evaluated |
| Memory | 890 | +240 | Ports ACE model |
| Security | 900 | +280 | DB-level enforcement |
| Verification | 910 | +190 | External evidence |
| Evaluation | 910 | +410 | Full framework |
| Production | 850 | +330 | Clear roadmap |
| **Overall** | 930 | +160 | Frontier-grade |

---

## Why 930 Scores Higher (Despite Same Core Components)

You didn't add:
- ❌ More AI tricks
- ❌ Larger model
- ❌ More skills
- ❌ More features

You fixed:
- ✅ **Thinking → Action** (more effective)
- ✅ **Correlated → Independent** verification (more reliable)
- ✅ **Vague → Typed** memory (more learnable)
- ✅ **API → DB** enforcement (actually secure)
- ✅ **Decorative → Measured** confidence (more trustworthy)
- ✅ **Undefined → Explicit** transparency (more actionable)

---

## Implementation Priority

**Must have (770 → 930)**:
1. Environment loop architecture (not reasoning loop)
2. Semantic skill selection (load 3, not 76)
3. External verification (not self-critique)
4. DB-level security (not API checks)
5. Evaluation framework (measure what works)
6. Activity traces (replace fake CoT)

**Should have (930 → 950)**:
7. Memory inheritance (use ACE model)
8. Skill evaluation dashboard
9. Continuous improvement loop
10. Advanced filtering (by cost, domain, latency)

**Nice to have (950 → 970)**:
11. Spec-driven skill generation
12. Automatic prompt optimization
13. Cross-environment generalization
14. Federated reasoning

---

## Conclusion

**770 was over-engineered thinking.**
**930 is well-engineered acting.**

The same three-layer architecture + BMad skills, but redesigned to actually ground reasoning in the real world instead of asking the model to think harder.

That's worth ~160 points.
