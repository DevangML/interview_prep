"""Central configuration.

Everything tunable lives here so an ablation is a config change, not a code
change. This is the same instinct as the config-driven campaign engine: behaviour
is data, not code.
"""

from __future__ import annotations

from dataclasses import dataclass, asdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CORPUS_DIR = ROOT / "corpus"
INDEX_DIR = ROOT / "index"
DATA_DIR = ROOT / "data"

# Classification lattice. A principal may read a chunk only if their clearance
# level is >= the chunk's classification level.
CLASSIFICATION_LEVELS = {
    "public": 0,
    "internal": 1,
    "confidential": 2,
    "restricted": 3,
}


@dataclass
class Config:
    # --- embedding ---
    # snowflake-arctic-embed-xs: 384 dims, 512 max tokens, 22M params, runs on CPU.
    # It is an ASYMMETRIC retrieval model: queries get a prefix, documents do not.
    embed_model: str = "Snowflake/snowflake-arctic-embed-xs"
    query_prefix: str = "Represent this sentence for searching relevant passages: "
    doc_prefix: str = ""
    normalize: bool = True  # L2-normalise -> cosine == dot product

    # --- chunking ---
    # "structure" = split on markdown headings first, recursive fallback.
    # "fixed"     = naive fixed-size token windows, ignoring structure. Kept so
    #               the difference is a measured row in `ablate strategy`, not a
    #               claim. It is the control condition, not a real option.
    chunk_strategy: str = "structure"
    chunk_tokens: int = 200
    chunk_overlap_tokens: int = 30  # 15%
    # Hard ceiling: the embedding model silently truncates past this. We assert.
    max_model_tokens: int = 512

    # --- retrieval ---
    top_k: int = 5
    candidate_k: int = 20          # first-stage recall pool
    rrf_k: int = 60                # reciprocal rank fusion constant
    # Hybrid stays ON: it bought nothing measurable on THIS corpus (clean prose,
    # no identifiers) but it is what rescues identifier queries -- `cli probe 429`
    # shows dense ranking the wrong document first and BM25 ranking it right.
    use_hybrid: bool = True
    # MMR is OFF BY DEFAULT because I measured it: it cost 27 points of
    # precision@5 (0.714 -> 0.443) and bought zero recall, because this corpus
    # has almost no near-duplicates. Turn it on for versioned or boilerplate
    # corpora where it earns its keep. See `ablate mix`.
    use_mmr: bool = False
    mmr_lambda: float = 0.6
    # Below this cosine score the system abstains rather than answering.
    # 0.60 was CHOSEN BY MEASUREMENT, not guessed: see `ablate threshold`.
    # The should-answer and should-abstain score distributions overlap
    # (answer-min 0.506, abstain-max 0.616), so no threshold is error-free.
    # 0.60 maximises abstention accuracy at 0.95 on the golden set.
    abstain_threshold: float = 0.60

    # --- access control ---
    # "pre"  = filter the candidate set BEFORE similarity search (correct)
    # "post" = search everything, filter the results afterwards (leaky + starving)
    # "off"  = no filtering at all (the control condition, for the eval table)
    acl_mode: str = "pre"

    # --- generation ---
    generator: str = "extractive"  # extractive | ollama | hf
    ollama_model: str = "llama3.2:1b"
    hf_model: str = "Qwen/Qwen2.5-0.5B-Instruct"
    max_context_chunks: int = 5

    def to_dict(self) -> dict:
        return asdict(self)


DEFAULT = Config()
