# WIZ Quick Start Guide

## What Is WIZ?

A separate, powerful AGI agent that complements the existing React Prep Mentor. While the mentor specializes in teaching, WIZ is a general-purpose reasoning engine with:

- Full access to all backend data (read-only)
- Real-time web access via MCP
- 76 BMad specialized skills
- Advanced reasoning techniques
- Complete transparency into thinking process

## Opening WIZ

(Coming soon: Add button to main UI)

```typescript
// Manual for now:
import WizAgentWindow from './components/wiz/WizAgentWindow';

<WizAgentWindow
  userId={user.id}
  isOpen={showWiz}
  onClose={() => setShowWiz(false)}
/>
```

## Key Differences: Mentor vs WIZ

| Feature | Mentor (Current) | WIZ (New) |
|---------|------------------|----------|
| **Window** | Center chat | Right panel (600px) |
| **Role** | Teaching specialist | General reasoning |
| **Context** | Quiz/challenge focused | Open-ended exploration |
| **Tools** | Limited (BMad skills) | Full access (data + web + 76 skills) |
| **Transparency** | Hidden reasoning | Explicit thinking traces |
| **Data Access** | None | Read-only full access |
| **Confidence** | Implied | Explicit (0-1.0 scores) |

## Usage Patterns

### Pattern 1: Research Question
```
You: "What are the latest advances in React 19?"

[WIZ starts thinking]
- Searches web for latest announcements
- Queries local knowledge graph
- Invokes BMad-researcher skill
- Synthesizes findings
- Verifies claims

WIZ: "Based on RFC #188 (90% confident):
React 19 introduced Actions, Automatic Batching,
and enhanced error handling.

Latest (web, 2 hours old):
- Canary build #20240827 ships Cache API
- New hook: useTransitionWithPriority

Uncertain: Final API stability for...
"
```

### Pattern 2: Architecture Decision
```
You: "How should I optimize a high-QPS rate limiter?"

[WIZ analyzes from multiple angles]
- Technical: Token bucket vs sliding window
- Business: Cost vs latency tradeoff
- User: P99 impact
- Security: Token leakage risk

WIZ: "Technical Perspective (85% confident):
Hybrid approach:
1. Local token bucket (in-process cache)
2. Redis sliding window (distributed state)
3. Lua script for atomic operations

Why: Combines sub-millisecond latency with
distributed consistency guarantees.

Business: Higher operational cost (+$2k/mo)
but handles 10x QPS vs single-node approach.

See verification: [shows data queries, Web search]
"
```

### Pattern 3: Current Events
```
You: "What's the latest on AI safety regulations?"

[WIZ uses web MCP for real-time data]
- Searches news (Perplexity MCP)
- Fetches official docs
- Looks up expert analysis
- Cross-references our knowledge base

WIZ: "EU AI Act (Verified, published June 2024):
- Scope: High-risk AI systems
- Compliance: By Dec 2024
- Key: Transparency requirements

Latest (2 hours ago):
- White House executive order on biosecurity
- UK AI Framework update

Confidence: 95% (official sources)
Gaps: Implementation details still being defined
"
```

## Features

### Thinking Traces
Click the chevron ▼ to expand reasoning:

```
🧠 WIZ Reasoning Trace
→ Intent: Understand distributed systems trends
→ Domain: Systems architecture, distributed consensus
→ Reasoning: Query web for latest papers, synthesize...
→ Confidence: 73% (web sources, some papers paywalled)
```

### Tool Invocations
See what tools WIZ called:

```
💾 Data Query: PostgreSQL
  └ SELECT * FROM concepts WHERE category = 'CRDT'
  └ ✓ Returned 24 rows (2ms)

🌐 Web MCP: Web Search
  └ "CRDT research 2024"
  └ ✓ Found 342 results (150ms)

⚡ Skill: bmad-researcher
  └ Synthesize findings into research summary
  └ ✓ Complete (1200ms)
```

### System Health
Green indicator = All services running
Yellow = Some degradation
Red = Services down

```
● Healthy (4/4 services)
  • PostgreSQL: 2ms latency
  • Redis: 1ms latency
  • Web MCP: 145ms latency
  • IndexedDB: 0ms latency
```

## Common Queries

### "Ask WIZ to..."

**Research**: "What's new in React 19 APIs?"
→ WIZ searches web + knowledge base + skills

**Design**: "How would you architect a real-time collaboration system?"
→ WIZ calls bmad-architect + multi-perspective analysis

**Debug**: "Why might this code have a memory leak?"
→ WIZ queries patterns + calls bmad-debugger

**Strategy**: "How should I prepare for a staff-level interview?"
→ WIZ uses bmad-interview-strategy + personalized data

**Learning**: "Explain React Fiber with examples"
→ WIZ calls bmad-tutor (but with full data access unlike mentor)

## Advanced: Adding MCP Servers

If you want WIZ to use a custom API:

```
(UI coming soon, manual for now)

const added = await wizBackend.addMcpServer(
  'my-api',
  'My Custom Research API',
  'https://api.example.com/mcp',
  { type: 'bearer', token: process.env.API_TOKEN }
);
```

## Tips & Tricks

### Tip 1: Ask for Uncertainty
```
You: "What are you NOT confident about here?"

WIZ: "Confidence breakdown:
✓ High (90%+): React 19 Actions basics
~ Medium (60-70%): Performance implications
✗ Low (40%): Timeline for adoption
? Unknown: Browser support details"
```

### Tip 2: Request Alternatives
```
You: "What are other ways to solve this?"

WIZ: "Path 1: Distributed consensus (strong consistency)
Path 2: Event sourcing (eventual consistency)
Path 3: Conflict-free replicated types (hybrid)

Trade-offs: [detailed comparison]"
```

### Tip 3: Verify Claims
```
You: "How do you know that?"

WIZ: "Sources for 'React 19 has automatic batching':
1. RFC #188 (official React RFC)
2. React 19 release notes (published)
3. Dan Abramov tweet (May 2024)

Confidence: 95%"
```

### Tip 4: Check Data Access
```
You: "Can you search our interview prep database?"

WIZ: ✓ Yes, I have read-only access to:
  • Interview prep progress
  • Skill assessments
  • Practice results
  • Learning patterns

Never: passwords, credentials, or sensitive auth data"
```

## Integration Next Steps

1. **Add launch button** to main UI
   ```
   <button onClick={() => setWizOpen(!wizOpen)}>
     🧠 Open WIZ AGI
   </button>
   ```

2. **Connect Claude API** to replace mock responses
   ```
   // In backend/routes/wiz-api.ts
   const response = await anthropic.messages.create({
     model: 'claude-opus-5',
     system: WIZ_AGI_SYSTEM_PROMPT,
     messages: [...]
   });
   ```

3. **Set up database connection**
   ```
   const db = new Pool({
     connectionString: process.env.DATABASE_URL
   });
   ```

4. **Configure MCP servers**
   - Register required web APIs
   - Set API tokens in environment
   - Test connectivity

## Troubleshooting

### "WIZ is thinking..." (slow)
- Check system health indicator
- Verify web MCP not rate-limited
- Database queries taking too long?

### "Tool call failed"
- Click to expand tool invocation
- See error message
- WIZ will try fallback if available

### "Low confidence response"
- This is honest! WIZ admits uncertainty
- Ask for verification or alternatives
- Request web search for latest data

## What WIZ Can't Do

❌ Write code and apply directly (unlike mentor)
❌ Access real-time video/audio
❌ Modify data (read-only access only)
❌ Access credentials or secrets
❌ Browse outside whitelisted APIs

## Philosophy

**WIZ is transparent by default.**

- Shows reasoning steps
- Admits uncertainty
- Lists data sources
- Explains confidence
- Suggests alternatives
- Requests clarification

This is not a limitation—it's a feature. Opaque AI systems are hard to trust. WIZ earns trust by explaining everything.

---

**Ready to explore?** Open WIZ and ask anything. It has access to all your data, the web, and 76 specialized reasoning skills.

The future of assistant intelligence isn't better hiding—it's radical transparency.
