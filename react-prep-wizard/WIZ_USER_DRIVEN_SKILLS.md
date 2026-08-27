# WIZ: User-Driven Skill Selection (Not Auto-Injection)

## The Philosophy

**Old approach**: "WIZ automatically selects top-3 skills using semantic matching"
- Problem: Still opaque (why those 3?)
- Problem: User has no control
- Problem: Possible skill conflicts

**New approach**: "User explicitly chooses which skills to activate"
- ✅ Total transparency (user knows exactly which tools are loaded)
- ✅ Full control (no auto-injection)
- ✅ Zero context pollution (only selected skills in context)
- ✅ Discoverable (browse all 76 skills easily)
- ✅ Learnable (see success rates, try combinations)

---

## How It Works

### 1. **Skill Registry** (`skill-registry.ts`)

All 76 BMad skills catalogued with metadata:

```typescript
interface SkillMetadata {
  id: string;
  name: string;
  description: string;
  category: 'research' | 'design' | 'analysis' | 'teaching' | 'strategy' | 'testing';
  inputFields: string[];
  outputFormat: string;
  estimatedLatency: number; // ms
  cost: 'free' | 'low' | 'medium' | 'expensive';
  tags: string[];
  successRate?: number; // 0.0-1.0 from eval history
  version: string;
}
```

### 2. **Skill Categories**

Organized for easy discovery:

```
📚 Research (5 skills)
  - Web Search & Synthesis
  - Academic Literature Review
  - Market & Competitive Analysis
  - Technical Deep Dive
  - [1 more]

🔍 Review & Analysis (6 skills)
  - Code Quality Review
  - Performance Analysis
  - Security & Compliance Audit
  - System Architecture Review
  - Test Architecture Review
  - [1 more]

🏗️ Design (3 skills)
  - System Architecture Design
  - Database Schema Design
  - API Design & Contract

📖 Teaching (3 skills)
  - Socratic Concept Breakdown
  - Learn by Example
  - Compare & Contrast Analysis

🎯 Strategy (3 skills)
  - Interview Preparation
  - Career Pivot Strategy
  - Technical Leadership

🧪 Testing (1 skill)
  - Test Architecture Review

[76 total - all browsable/searchable]
```

### 3. **User Selection UI** (`SkillSelector.tsx`)

A sidebar panel where users can:

**View skills by:**
- ✅ Category (Research, Design, Analysis, etc.)
- ✅ Search (by name, description, tag)
- ✅ Success rate (most effective first)
- ✅ Cost (free/cheap/expensive)
- ✅ Latency (fastest first)

**Interact with skills:**
- ✅ Click to select (chip appears in active list)
- ✅ Click to deselect (removed from active list)
- ✅ Expand for details (inputs, outputs, prerequisites)
- ✅ Permanently disable (if never using)
- ✅ View success rate (% of time it helped)

**Display modes:**
- Grid view (quick scan, visual)
- List view (detailed metadata, efficient)

### 4. **No Default Skills**

Starting state:

```
WIZ: "Select some skills in the sidebar to get started, or ask away 
and I'll tell you what skills would help."

Selected skills: 0
Available skills: 76
Context pollution: 0%
```

User has total control:
- ✅ Want just web search? Select it.
- ✅ Want web search + code review? Select both.
- ✅ Want all 76? You can.
- ✅ Want zero? That's fine too—I'll reason from knowledge base.

### 5. **Only Selected Skills Loaded**

When user asks a question, `WizContext` includes:

```typescript
// Only skills the user explicitly selected
availableSkills: ['research-web-search', 'review-code-quality'],

// NOT all 76 skills
// Context stays clean, reasoning stays focused
```

### 6. **Skill Combinations**

Users discover what works:

**Session 1**: Select code-review skill
```
"Review this function"
→ Code quality feedback
→ Success rate: ✓ (skill helped)
```

**Session 2**: Select code-review + performance skill
```
"Optimize this algorithm"
→ Code review + performance analysis
→ Success rate: ✓✓ (both skills helped)
→ User learns this combo works well
```

**Session 3**: Select all 76 skills
```
User notices output is noisy/confused
→ Learns that fewer focused skills work better
→ Next time: selects just 2-3
```

---

## UI Components

### WizAgentWindow (Updated)

```
┌─ Header: "WIZ AGI • 3 skills active" ────────────┐
│                                                   │
│ ┌─ Messages Panel ─────────────────┐ ┌─ Skills ─┐
│ │ Welcome message                  │ │ Selector │
│ │ User: "Review my code"           │ │ Sidebar  │
│ │ WIZ: [response using 3 skills]   │ │ (can     │
│ │ Tool invocations shown           │ │ toggle)  │
│ │ Activity trace visible           │ │          │
│ │                                  │ │ - Search │
│ │ Input textarea                   │ │ - Filter │
│ │ Send button                      │ │ - Browse │
│ └──────────────────────────────────┘ │ - Select │
│                                       └──────────┘
└───────────────────────────────────────────────────┘
```

### SkillSelector Sidebar Features

```
Skills Library
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Search bar: "Find skills..."]

Categories: [All] [Research] [Design] [Analysis] ...

Active Skills (Chips):
├─ Code Quality Review ✓
├─ Performance Analysis ✓
└─ Security Audit ✓

Available Skills (Grid/List):
├─ Web Search & Synthesis
│  Description: Search and synthesize findings
│  Cost: 💛 Medium  Latency: 2000ms  Success: 89%
│  Tags: [web] [current] [realtime]
│  [+ Add]  [Expand for details]
│
├─ Academic Literature Review
│  ...
│
└─ [Browse more with auto-search/filter]
```

---

## File Structure

```
react-prep-wizard/
├── src/
│   ├── lib/ai/
│   │   └── skill-registry.ts          ← All 76 skills metadata
│   └── components/wiz/
│       ├── WizAgentWindow-Updated.tsx ← Main window with skill sidebar
│       ├── SkillSelector.tsx          ← Skill browser/selector UI
│       ├── WizMessage.tsx             ← Message display
│       ├── WizThinkingTrace.tsx       ← Reasoning trace
│       └── WizToolInvocation.tsx      ← Tool call display
│
└── backend/routes/wiz-api.ts          ← Only loads selected skills
```

---

## Implementation Notes

### Context Efficiency

**Before** (auto-selection):
```
System Prompt (2000 tokens)
All 76 skills descriptions (15000 tokens)
User query (100 tokens)
Knowledge base (3000 tokens)
─────────────────────
Total: 20100 tokens used per request
```

**After** (user-selected):
```
System Prompt (2000 tokens)
3 selected skills descriptions (200 tokens)
User query (100 tokens)
Knowledge base (3000 tokens)
─────────────────────
Total: 5300 tokens used per request
4x more efficient!
```

### Skill Discovery Flow

```
User opens WIZ
↓
"What can you do?"
↓
User clicks Zap icon (skill sidebar)
↓
Sees all 76 skills organized by category
↓
Reads descriptions + success rates
↓
Selects relevant skills (e.g., "Web Search" + "Code Review")
↓
Asks question
↓
WIZ uses only those 2 skills
↓
User learns what works, refines selection next time
```

### Success Rate Learning

Each skill tracks:
- Times invoked
- Times helpful (user feedback)
- Times misleading
- Effectiveness score: helpful / (helpful + misleading)

```
bmad-code-review: 87% success (156 uses)
bmad-performance: 79% success (89 uses)
bmad-market-analysis: 71% success (42 uses)
```

UI sorts by success rate → user naturally gravitates to better skills

---

## Research + Web Search + Review Skills

### Included in Registry

**Research Skills:**
1. `research-web-search` — Real-time web findings + synthesis
2. `research-literature-review` — Academic papers + specs
3. `research-market-analysis` — Competitive landscape
4. `research-technical-deep-dive` — Architecture + implementation

**Review Skills:**
1. `review-code-quality` — Code patterns + maintainability
2. `review-performance` — Bottlenecks + optimization
3. `review-security` — Vulnerabilities + risk assessment
4. `review-architecture` — System design + scalability
5. `review-testability` — Coverage + edge cases

**Design Skills:**
1. `design-system-architecture` — Systems from scratch
2. `design-database-schema` — Normalized schemas
3. `design-api` — REST/GraphQL contracts

**Teaching Skills:**
1. `teach-concept-breakdown` — Socratic method
2. `teach-by-example` — Progressive examples
3. `teach-compare-contrast` — Similarities + tradeoffs

**Strategy Skills:**
1. `strategy-interview-prep` — Gap analysis + mock questions
2. `strategy-career-pivot` — Transition planning
3. `strategy-technical-leadership` — Leadership at scale

**[60+ more BMad skills]**

---

## Zero-Context Principle

WIZ starts **completely silent**:

```
WIZ: "I'm ready. What's on your mind?"

Available:
- 76 BMad skills (you choose which)
- Full PostgreSQL data access
- Web MCP (real-time)
- 4 built-in MCPs

Select skills in the sidebar or ask away!
```

**Not**:

```
WIZ: "I'm loaded with:
- Chain-of-Thought reasoning
- Tree-of-Thought analysis
- Multi-perspective frameworks
- 76 active skills
- [massive context overhead]"
```

---

## User Control Examples

### Example 1: Interview Prep

User selects:
```
✓ strategy-interview-prep
✓ research-web-search
✓ teach-concept-breakdown
```

Asks: "How do I prepare for a staff-level React interview?"

WIZ uses:
1. Interview prep skill → gap analysis
2. Web search → latest React trends
3. Teaching skill → explain concepts clearly

Result: Personalized, focused, efficient.

---

### Example 2: System Design

User selects:
```
✓ design-system-architecture
✓ review-architecture
✓ research-technical-deep-dive
```

Asks: "Design a rate limiter for 100k QPS"

WIZ uses:
1. Design skill → architecture patterns
2. Review skill → verify soundness
3. Research skill → latest best practices

Result: Production-grade design.

---

### Example 3: Debugging

User selects:
```
✓ analysis-debugging
✓ review-code-quality
```

Asks: "Why is this memory leak happening?"

WIZ uses:
1. Debugging skill → root cause analysis
2. Code review skill → pattern suggestions

Result: Clear explanation + fix.

---

## Advantages Over Auto-Selection

| Aspect | Auto-Semantic | User-Driven |
|--------|---------------|------------|
| **Transparency** | "Why these 3?" | "I chose these" |
| **Control** | None | Full |
| **Learning** | Hidden | Visible (success rates) |
| **Efficiency** | Medium (3+ always) | High (1-3 selected) |
| **Discovery** | Algorithmic | Intentional |
| **Debugging** | "Which skill failed?" | Clear (only selected) |
| **Combination** | Fixed | User experimenting |

---

## Future: Smart Suggestions

Once we have usage data:

```
"Based on your past questions, here are suggested skills:"
├─ code-review (87% helpful for you)
├─ performance-analysis (79% helpful for you)
└─ web-search (72% helpful for you)

[Use these] [Browse all] [Customize]
```

But initial state: **User leads, not algorithm.**

---

## Summary

**WIZ with user-driven skills**:
- ✅ Zero context injection (only what you select)
- ✅ Total transparency (see exactly what's active)
- ✅ Full control (swap skills anytime)
- ✅ Discoverable (browse all 76 easily)
- ✅ Learnable (success rates guide choices)
- ✅ Efficient (1-3 focused skills > 76 loaded)
- ✅ No surprises (nothing auto-magical)

**The philosophy**: You're the pilot. WIZ is the plane. Pick which engines you want running.
