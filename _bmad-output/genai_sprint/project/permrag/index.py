"""Index build and load.

Storage choice, and why it is defensible rather than lazy:

The corpus is ~16 documents / ~100 chunks. Under roughly 50k vectors, a FLAT
(brute-force) index is exact and fast enough -- a single 100x384 matrix multiply
is microseconds. ANN (HNSW/IVF) trades recall for latency, and at this size there
is no latency to buy. Reaching for a vector database here would be premature
optimisation, and worse, it would make my recall numbers approximate for no
reason. I know exactly what the ceiling is because search is exact.

What I would change at scale is written down in PROJECT_TALK_TRACK.md, and the
migration is cheap on purpose: chunks + metadata + vectors are persisted as the
source of truth, so any index is a DERIVED, DISPOSABLE artefact. Moving to
pgvector is a re-index, not a data migration.

The index also carries a BM25 sparse index (rank_bm25) over the same chunk order,
so dense[i] and sparse[i] refer to the same chunk. That shared ordering is what
makes the ACL mask a single boolean array applied to both.
"""

from __future__ import annotations

import json
import time
from dataclasses import dataclass
from pathlib import Path

import numpy as np

from .chunking import Chunk, chunk_document
from .config import CLASSIFICATION_LEVELS, Config
from .embedding import get_embedder


def _tokenize_for_bm25(text: str) -> list[str]:
    return [t for t in "".join(c.lower() if c.isalnum() else " " for c in text).split() if t]


@dataclass
class Index:
    chunks: list[dict]
    vectors: np.ndarray            # (n, dim) float32, L2-normalised
    class_levels: np.ndarray       # (n,) int8 -- chunk classification as an int
    role_sets: list[frozenset]     # (n,) allowed roles per chunk
    manifest: dict
    _bm25 = None

    @property
    def n(self) -> int:
        return len(self.chunks)

    @property
    def bm25(self):
        if self._bm25 is None:
            from rank_bm25 import BM25Okapi

            self._bm25 = BM25Okapi([_tokenize_for_bm25(c["text"]) for c in self.chunks])
        return self._bm25

    def acl_mask(self, principal) -> np.ndarray:
        """Boolean array: True where this principal is allowed to see the chunk.

        This is the pre-filter predicate. It is computed over metadata only --
        no vectors touched -- and is O(n) with tiny constants.
        """
        clearance = principal.clearance_level
        roles = principal.roles
        lattice_ok = self.class_levels <= clearance
        role_ok = np.fromiter(
            (bool(roles & rs) for rs in self.role_sets), dtype=bool, count=self.n
        )
        return lattice_ok & role_ok


def build_index(cfg: Config, corpus_dir: Path | None = None) -> tuple[Index, dict]:
    from .config import CORPUS_DIR

    corpus_dir = Path(corpus_dir or CORPUS_DIR)
    embedder = get_embedder(cfg)

    t0 = time.perf_counter()
    all_chunks: list[Chunk] = []
    files = sorted(Path(corpus_dir).glob("*.md"))
    if not files:
        raise FileNotFoundError(
            f"no documents in {corpus_dir}; run `python scripts/make_corpus.py` first"
        )
    for path in files:
        all_chunks.extend(
            chunk_document(
                path.read_text(encoding="utf-8"),
                count_tokens=embedder.count_tokens,
                chunk_tokens=cfg.chunk_tokens,
                overlap_tokens=cfg.chunk_overlap_tokens,
                max_model_tokens=min(cfg.max_model_tokens, embedder.max_seq_length),
                strategy=cfg.chunk_strategy,
            )
        )
    t_chunk = time.perf_counter() - t0

    t0 = time.perf_counter()
    vectors = embedder.encode_documents([c.text for c in all_chunks])
    t_embed = time.perf_counter() - t0

    tok_counts = [c.n_tokens for c in all_chunks]
    manifest = {
        "embed_model": cfg.embed_model,
        "dim": int(vectors.shape[1]),
        "n_docs": len(files),
        "n_chunks": len(all_chunks),
        "chunk_strategy": cfg.chunk_strategy,
        "chunk_tokens": cfg.chunk_tokens,
        "chunk_overlap_tokens": cfg.chunk_overlap_tokens,
        "normalize": cfg.normalize,
        "tokens_min": int(min(tok_counts)),
        "tokens_max": int(max(tok_counts)),
        "tokens_mean": round(float(np.mean(tok_counts)), 1),
        "tokens_p50": int(np.percentile(tok_counts, 50)),
        "chunk_seconds": round(t_chunk, 3),
        "embed_seconds": round(t_embed, 3),
        "chunks_per_second": round(len(all_chunks) / max(t_embed, 1e-9), 1),
        "vector_bytes": int(vectors.nbytes),
    }

    index = Index(
        chunks=[c.to_dict() for c in all_chunks],
        vectors=vectors,
        class_levels=np.array(
            [CLASSIFICATION_LEVELS[c.classification] for c in all_chunks], dtype=np.int8
        ),
        role_sets=[frozenset(c.allowed_roles) for c in all_chunks],
        manifest=manifest,
    )
    return index, manifest


def save_index(index: Index, index_dir: Path) -> None:
    index_dir.mkdir(parents=True, exist_ok=True)
    np.save(index_dir / "vectors.npy", index.vectors)
    (index_dir / "chunks.json").write_text(
        json.dumps(index.chunks, indent=1), encoding="utf-8"
    )
    (index_dir / "manifest.json").write_text(
        json.dumps(index.manifest, indent=2), encoding="utf-8"
    )


def load_index(cfg: Config, index_dir: Path | None = None) -> Index:
    from .config import INDEX_DIR

    index_dir = Path(index_dir or INDEX_DIR)
    manifest = json.loads((index_dir / "manifest.json").read_text(encoding="utf-8"))
    # The failure this guard prevents is the nastiest one in RAG: swap the
    # embedding model, keep the old index, and retrieval silently returns noise.
    if manifest["embed_model"] != cfg.embed_model:
        raise RuntimeError(
            f"index was built with {manifest['embed_model']!r} but config asks for "
            f"{cfg.embed_model!r}. Query and document vectors would be in different "
            f"spaces. Re-embed the whole corpus: `python -m permrag.cli build`."
        )
    chunks = json.loads((index_dir / "chunks.json").read_text(encoding="utf-8"))
    vectors = np.load(index_dir / "vectors.npy")
    return Index(
        chunks=chunks,
        vectors=vectors,
        class_levels=np.array(
            [CLASSIFICATION_LEVELS[c["classification"]] for c in chunks], dtype=np.int8
        ),
        role_sets=[frozenset(c["allowed_roles"]) for c in chunks],
        manifest=manifest,
    )
