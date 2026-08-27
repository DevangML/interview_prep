# WIZ: Adaptive General Intelligence Architecture

## Overview

**WIZ** is an AGI-class reasoning engine built into the React Prep Wizard that combines:

- **Advanced constitutional AI** with chain-of-thought reasoning
- **Multi-perspective analysis** with uncertainty quantification
- **Full data access** (PostgreSQL read-only, IndexedDB, Redis)
- **Real-time web capabilities** via MCP + dynamic server registration
- **76+ BMad specialized skills** for domain-specific reasoning
- **Self-verification loops** and real-time learning

## Architecture

### Three-Layer Design

```
┌─────────────────────────────────────────────────────────┐
│ UI Layer: WIZ Agent Window (Separate Panel)            │
│ - Message history with tool invocations                 │
│ - Thinking trace transparency                           │
│ - System health indicators                              │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│ API Layer: Express Backend Routes                       │
│ - /api/wiz/think (main reasoning)                       │
│ - /api/wiz/query (data layer)                           │
│ - /api/wiz/mcp/* (MCP management)                       │
│ - /api/wiz/skills/invoke (skill execution)              │
│ - /api/wiz/health (system status)                       │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│ Service Layer: WIZ Backend Service                      │
│ - Tool orchestration                                    │
│ - MCP server management                                 │
│ - Skill invocation                                      │
│ - Data query execution                                  │
│ - System health monitoring                              │
└────────────────┬────────────────────────────────────────┘
                 │
     ┌───────────┴──────────┬──────────────┬──────────┐
     │                      │              │          │
┌────▼─────┐    ┌──────────▼──┐  ┌───────▼────┐  ┌──▼────────┐
│PostgreSQL│    │  Redis/Cache │  │   Web MCP  │  │ BMad Skills│
│(Read-Only)   │              │  │ (+Dynamic) │  │ (76 total) │
└──────────┘    └──────────────┘  └────────────┘  └───────────┘
```

### Core Components

#### 1. **WIZ System Prompt** (`wiz-agi-system.ts`)

Implements advanced prompting techniques:

- **Hierarchical Reasoning**: Parse intent → Context synthesis → Multi-path analysis → Verification → Synthesis → Uncertainty quantification
- **Adaptive Tool Orchestration**: Chooses best tool for each query type
- **Self-Verification Loop**: Fact-checks, consistency checks, completeness checks
- **Multi-Perspective Analysis**: Technical, business, user, security, sustainability
- **Context-Aware Synthesis**: Maintains conversation context and user model
- **Real-Time Learning**: Updates based on verification results

#### 2. **Backend Service** (`wiz-backend-service.ts`)

Manages all external data/tool access:

```typescript
class WizBackendService {
  // Data access
  queryData(query, params, context): DataQueryResult
  
  // MCP management
  listMcpServers(): McpServerConfig[]
  addMcpServer(id, name, endpoint, auth): boolean
  callMcpServer(serverId, method, params): any
  
  // Skill invocation
  invokeSkill(invocation): SkillResult
  
  // Universal search
  universalSearch(query, context): { dataResults, webResults, skillMatches }
  
  // System monitoring
  getSystemHealth(): { status, services, capabilities }
}
```

#### 3. **UI Component** (`WizAgentWindow.tsx`)

Separate window from current AI mentor:

- **Dedicated panel** on right side (600px wide)
- **Message history** with markdown formatting
- **Tool invocation display** (data queries, MCP calls, skills)
- **Thinking trace transparency** (shows reasoning process)
- **System health indicator** (real-time service status)
- **Separate conversation** (no mixing with mentor)

#### 4. **Backend API** (`wiz-api.ts`)

Express endpoints:

```
POST /api/wiz/think          - Main reasoning engine
POST /api/wiz/query          - Data layer queries
POST /api/wiz/mcp/register   - Register new MCP server
POST /api/wiz/skills/invoke  - Execute BMad skill
GET  /api/wiz/health         - System status
```

## Advanced Prompting Techniques

### 1. Chain-of-Thought (CoT)

WIZ thinks step-by-step for complex queries:

```
[WIZ THINKING]
Step 1: Parse Intent — What is the user really asking?
Step 2: Context Synthesis — What domains are relevant?
Step 3: Multi-Path Analysis — Generate 3+ reasoning paths
Step 4: Verification — Check each path for soundness
Step 5: Synthesis — Combine best insights
Step 6: Uncertainty — State confidence and gaps
[/WIZ THINKING]
```

### 2. Tree-of-Thought (ToT)

Multiple reasoning paths explored simultaneously:

- Path 1: Technical implementation approach
- Path 2: Business/strategic approach
- Path 3: User experience approach
- Convergence: Best synthesis of all paths

### 3. Self-Verification Loop

After generating response:

1. **Fact-Check** against data layer
2. **Consistency-Check** for contradictions
3. **Completeness-Check** against original query
4. **Confidence-Calibration** based on verification
5. **Uncertainty-Surfacing** explicit gaps

### 4. Prompt Injection Resistance

- Sanitize all external inputs
- Treat user queries as data
- Verify MCP responses
- Log suspicious patterns

### 5. Token Efficiency

- High-signal reasoning over verbosity
- Structured formats (bullets, tables)
- Context compression
- Recursive summarization

### 6. Reasoning Transparency

- Expose thinking in `[WIZ THINKING]` blocks
- Show tool calls and results
- Explain confidence with rationale
- Admit uncertainty explicitly

## Data Access Architecture

### Read-Only Guarantees

```sql
-- Allowed
SELECT * FROM interview_data WHERE user_id = $1;
SELECT COUNT(*) FROM skill_results;

-- Denied (enforced at API level)
INSERT INTO users VALUES (...);    -- Error
UPDATE candidates SET score = 100; -- Error
DELETE FROM progress;               -- Error
DROP TABLE assessments;             -- Error
```

### Data Sources

| Source | Access | Latency | Use Case |
|--------|--------|---------|----------|
| PostgreSQL | Read-only | ~2ms | Structured data, analytics |
| IndexedDB | Read/Write local | ~0ms | Session cache, offline |
| Redis | Read (via MCP) | ~1ms | Hot cache, real-time |
| Web MCP | HTTP | ~150ms | Current events, live data |

## MCP Server Management

### Built-in MCPs

1. **Web MCP** — Real-time web access (search, fetch, crawl)
2. **PostgreSQL MCP** — Database queries (read-only)
3. **Redis MCP** — Cache layer queries
4. **IndexedDB MCP** — Client-side storage

### Dynamic Registration

```typescript
// Add custom MCP server on-the-fly
const success = await wizBackend.addMcpServer(
  'custom-api',
  'My Custom API',
  'https://api.example.com/mcp',
  { type: 'bearer', token: 'secret' }
);
```

### MCP Chaining

```typescript
// Pipeline: Web MCP → Parse → PostgreSQL Query → Skill
const webData = await mcpCall('web', 'search', { q: 'latest trends' });
const parsed = parseWebData(webData);
const dbQuery = await mcpCall('postgres', 'query', { parsed });
const analyzed = await invokeSkill('bmad-analyst', { dbQuery });
```

## BMad Skills Integration

### Accessing All 76 Skills

Skills copied to `/src/skills/bmad-skills/`:

- **Teaching**: Socratic breakdown, tutoring, conceptual decomposition
- **Design**: Architecture review, system design, pattern identification
- **Research**: Technical research, literature review, specification analysis
- **Analysis**: Code review, performance analysis, security audit
- **Strategy**: Competitive analysis, market research, innovation
- **Testing**: Test architecture, coverage analysis, QA strategy
- **And 70+ more...**

### Skill Invocation

```typescript
const result = await wizBackend.invokeSkill({
  skillId: 'bmad-architect',
  skillName: 'System Architecture Analyzer',
  parameters: {
    systemDescription: 'Rate limiter for high-QPS endpoints',
    targetQps: 100000,
    latencyBudget: 10 // ms
  },
  timeout: 30000
});
```

## Capability Hierarchy

### Level 1: Direct Answer
- Straightforward queries within knowledge base
- No tool invocation needed
- Confidence > 80%

### Level 2: Tool Orchestration
- Requires data queries + web access
- Single-tool or simple chains
- Confidence 60-80%

### Level 3: Multi-Perspective Analysis
- Complex reasoning across domains
- Multiple tools + skills
- Confidence 40-60%

### Level 4: Deep Synthesis
- Cross-domain knowledge synthesis
- Real-time learning + verification
- Confidence adjusts dynamically

## Quality Standards

| Dimension | Standard | Implementation |
|-----------|----------|-----------------|
| **Accuracy** | Verify against multiple sources | Self-verification loop |
| **Completeness** | Address all query aspects | Structured requirement checklist |
| **Clarity** | Explain simply | Plain language + examples |
| **Actionability** | Enable next steps | Always suggest follow-ups |
| **Humility** | Admit uncertainty | Explicit confidence ranges |
| **Efficiency** | Respect time | Token-optimized reasoning |

## Usage Examples

### Example 1: Research Query

```
User: "What are the latest distributed consensus algorithms?"

[WIZ THINKING]
Intent: Stay current on consensus algorithms
Domain: Distributed systems, consensus protocols
Paths: Academic (CRDT), Industry (Raft variants), Emerging (novel approaches)
Confidence: 65% (requires web access)
[/WIZ THINKING]

Tools Used:
1. Web MCP → Search latest research papers
2. PostgreSQL → Query knowledge graph
3. BMad-research skill → Synthesize findings
```

### Example 2: Architecture Decision

```
User: "How should I optimize this high-QPS rate limiter?"

[WIZ THINKING]
Intent: Performance optimization advice
Domain: System design, concurrency, caching
Paths: Database → Caching → Algorithmic → Distributed
Confidence: 82% (knowledge-based)
[/WIZ THINKING]

Tools Used:
1. Data Query → Look up similar architectures
2. BMad-architect → Full systems analysis
3. BMad-performance → Optimization patterns
```

## Integration Checklist

- [x] Separate UI window from current mentor
- [x] Backend service for tool orchestration
- [x] API endpoints for reasoning
- [x] MCP server management
- [x] BMad skills copied to project
- [x] Data access layer (read-only)
- [x] System health monitoring
- [ ] Claude API integration (for actual LLM reasoning)
- [ ] Database connection pooling
- [ ] Caching strategy refinement
- [ ] Real-time MCP pipeline optimization

## Next Steps

1. **Integrate Claude API** — Replace mock responses with actual LLM
2. **Connect to real database** — PostgreSQL backend + connection pooling
3. **MCP server registry** — Persistent storage of registered MCPs
4. **Skill marketplace** — Browse and install new BMad skills
5. **Learning analytics** — Track what works, what doesn't
6. **Uncertainty modeling** — Bayesian updating based on verification
7. **Tool selection learning** — Improve tool choice over time
8. **Performance profiling** — Optimize latency, token usage, cost

---

**WIZ is not just another chatbot.** It's a versatile reasoning engine that combines deep thinking, tool orchestration, and real-time learning into an AGI-class assistant.
