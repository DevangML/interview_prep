# Raw Unbiased Session Guide

## Overview

The **Raw Unbiased Session** is a new agent skill that provides **direct, unfiltered access to the model** with zero specialization, context bias, or reasoning constraints.

## What Changed

### 1. **Agent Controller Updates** (`src/lib/ai/agentController.ts`)

- Added `raw_unbiased` as an orchestration pattern
- Added `raw` as a specialist type
- Created `raw_unbiased` as a specialist mode
- Granted unrestricted tool permissions (`['*']`) to raw mode
- Updated `authorizeToolExecution()` to allow any tool in raw mode
- Added automatic routing: queries containing keywords like "raw session", "unbiased", "no bias", "raw model", "direct access", etc. automatically route to raw mode

### 2. **Slash Skill Registration** (`src/hooks/useAgentChat.ts`)

- Added `/raw` slash skill (🔓 icon) in the Developer category
- Labeled as "Raw Unbiased Session" with description: "No specialization, no context filtering — direct model + MCPs + web access"
- Handler activated on `/raw` command providing a clear activation message

## How to Activate

### Method 1: Slash Command
Type `/raw` in the chat to activate raw unbiased mode.

### Method 2: Natural Language Keywords
Simply mention any of these in a message:
- "raw session"
- "unbiased"
- "no bias"
- "raw model"
- "direct access"
- "one on one"
- "bypass"
- "clear context"
- "fresh start"
- "zero bias"
- "unrestricted"

The system will automatically route your query to raw_unbiased mode.

## What You Get

When activated, raw unbiased mode provides:

✅ **No Specialization**
- No tutor, architect, or judge personas
- No system prompts constraining the response
- Direct model reasoning

✅ **Unrestricted Tool Access**
- All MCPs available (`['*']` permission)
- No tool authorization gates
- Full capabilities enabled

✅ **Web Retrieval Always On**
- Real-time information access
- Up-to-date specifications and docs
- Current research and articles

✅ **1-on-1 Format**
- No handoffs to other specialists
- No orchestration patterns
- No artificial reasoning constraints
- Pure conversational model + tools

✅ **High Token Budget**
- 8192 tokens available (full exploration budget)
- Unlimited tool calls (practical only)
- No artificial stopping conditions

## Architecture

### Tool Authorization
Raw mode bypasses the AGENT_TOOL_PERMISSIONS system by using a wildcard:

```typescript
raw_unbiased: ['*'], // Unrestricted access to all tools, MCPs, and web retrieval
```

The `authorizeToolExecution()` method checks for `'*'` and allows any tool:

```typescript
if (allowed.includes('*')) {
  return true;
}
```

### Orchestration Pattern
Raw mode uses `raw_unbiased` as its orchestration pattern (distinct from sequential_handoff, evaluator_optimizer, etc.), signaling to the chat engine to use direct model output without multi-agent routing.

### Routing Rules
The `AgentControllerEngine.plan()` method checks for raw-mode keywords **first** (ZERO priority) before any other intent analysis, ensuring raw mode is always available.

## Example Session

```
User: /raw

System: 🔓 **Raw Unbiased Session Activated**

Mode: No specialization, no context bias, no reasoning filters.

Available:
- ✅ Full model capability (reasoning, deep thought)
- ✅ Unrestricted MCP tool access
- ✅ Web retrieval enabled
- ✅ Direct model without routing/specialization

Ground Rules:
- No persona-based system prompts
- No context filtering
- No orchestration routing
- Pure model + tools

You're now in 1-on-1 direct mode. What's on your mind?

User: What's the latest on AI safety research?

System: [Raw model response with web access, no specialization bias]
```

## When to Use

Use raw unbiased mode when you want:

1. **Direct model access** without specialization routing
2. **Unfiltered thinking** without persona constraints
3. **All available tools** including MCPs and web
4. **1-on-1 conversations** without handoffs
5. **Fast answers** without orchestration overhead
6. **Research** requiring current web data
7. **Exploration** without predetermined paths

## Technical Implementation Files

Modified:
- `src/lib/ai/agentController.ts` — Agent routing and permissions
- `src/hooks/useAgentChat.ts` — Slash skill registration

No breaking changes to existing skills or workflows. Raw mode is additive and coexists with all existing specialized modes.

## Next Steps

1. **Activate** via `/raw` or natural language keywords
2. **Chat** directly with the model + MCPs + web
3. **Tools** are automatically available for execution
4. **No context switching** — stay in raw mode as long as you want

---

**Mode**: `raw_unbiased` | **Specialist**: `raw` | **Authorization**: `['*']` | **Pattern**: `raw_unbiased`
