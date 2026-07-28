# PermRAG: Permission-Aware Retrieval

This is a local, offline-capable RAG system that applies the access-control filter *before* the vector search.

## Run It In 60 Seconds

The environment requires no API keys and runs entirely locally. 
The virtual environment is assumed to be `../.venv/` relative to the project root.

```bash
cd project/

# 1. Generate the synthetic corpus (16 docs, 5 departments)
../.venv/bin/python -m scripts.make_corpus

# 2. Build the index (chunk, embed, persist)
../.venv/bin/python -m permrag.cli build

# 3. See the difference ACL makes
../.venv/bin/python -m permrag.cli demo

# 4. Ask a question as a specific principal
../.venv/bin/python -m permrag.cli ask "How many accounts were compromised?" --as priya --acl pre

# 5. Run the evaluation harness (40 golden questions)
../.venv/bin/python -m permrag.cli eval

# 6. Run ablations (e.g., chunk size, ACL modes)
../.venv/bin/python -m permrag.cli ablate
```

## Three Key Architectural Decisions & Costs

1. **Pre-Filtering the Candidate Set**
   - **Decision:** Apply the boolean ACL mask (clearance + roles) before the ANN similarity search, rather than post-filtering retrieved results.
   - **Cost:** Requires the vector database to support metadata filtering *inside* the search traversal (or partitioning the index), which restricts vector DB choices. Post-filtering is easier to implement but starves top-k results.

2. **Structure-Aware Chunking**
   - **Decision:** Split documents on markdown headings (`##`) rather than naive fixed-window lengths, capping chunks at ~200 tokens.
   - **Cost:** Requires writing a custom chunker instead of using a standard `RecursiveCharacterTextSplitter`. The benefit is that classification metadata aligns perfectly with headings, preventing a chunk from straddling a public and restricted section (which would force over-denial or a data leak).

3. **Abstention Gate**
   - **Decision:** Implement a strict similarity threshold (tuned to 0.60) before generation, forcing the system to reply "I don't have authorised information" if the top retrieved chunk is too weak.
   - **Cost:** Increases the false-refusal rate (over-abstention). At a 0.60 threshold, 1 answerable question is refused in the golden set. We trade answer completeness for a near-zero hallucination rate.

## Architecture

```text
              ┌──────────────┐
   documents ─┤  chunking    │  structure-aware, ~200 tok, 30 overlap
              └──────┬───────┘
                     ▼
              ┌──────────────┐
              │  embedding   │  local sentence-transformers
              └──────┬───────┘
                     ▼
              ┌──────────────────────────────┐
              │  vector index + ACL metadata │  each chunk tagged with dept
              └──────┬───────────────────────┘
                     │
   user + principal ─┤
                     ▼
        ╔════════════════════════╗
        ║  ★ ACL FILTER (PRE)    ║  ◄── filter applied before search
        ║  restrict candidate set║
        ╚══════════┬═════════════╝
                   ▼
              ┌──────────────┐
              │ hybrid search│  dense + BM25, fused with RRF
              └──────┬───────┘
                     ▼
              ┌──────────────┐
              │  top-k = 5   │
              └──────┬───────┘
                     ▼
        ╔════════════════════════╗
        ║  ABSTENTION GATE 0.60  ║  ◄── hallucination guardrail
        ╚══════════┬═════════════╝
                   ├─ below → "I don't have grounds to answer that"
                   ▼
              ┌──────────────┐
              │  generation  │
              └──────────────┘
```
