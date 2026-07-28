"""Embedding: a thin wrapper over sentence-transformers, running fully local.

Three things this file exists to make explicit:

1. ASYMMETRY. arctic-embed is trained so that a QUERY gets an instruction prefix
   and a DOCUMENT does not. A short question and a long answer passage do not
   look alike in embedding space; the prefix is the cheap fix for that. This is
   the same problem HyDE solves expensively.

2. NORMALISATION. We L2-normalise every vector at encode time. Once vectors are
   unit length, cosine similarity IS the dot product, so search is a single
   matrix multiply. It also means cosine and dot product rank identically -- the
   distinction only matters on unnormalised vectors, where dot product rewards
   longer vectors.

3. THE MODEL IS PART OF THE INDEX. The model name is written into the index
   manifest. Query vectors and document vectors must come from the SAME model or
   they live in different spaces and retrieval returns noise -- with no error.
   `load_index` asserts the match.
"""

from __future__ import annotations

import functools
import os

import numpy as np

# Keep it deterministic and offline-friendly on a laptop.
os.environ.setdefault("TOKENIZERS_PARALLELISM", "false")


class Embedder:
    def __init__(
        self,
        model_name: str,
        query_prefix: str = "",
        doc_prefix: str = "",
        normalize: bool = True,
    ):
        from sentence_transformers import SentenceTransformer

        self.model_name = model_name
        self.query_prefix = query_prefix
        self.doc_prefix = doc_prefix
        self.normalize = normalize
        self.model = SentenceTransformer(model_name)
        self.max_seq_length = int(self.model.max_seq_length)

    @property
    def dim(self) -> int:
        return int(self.model.get_sentence_embedding_dimension())

    @functools.lru_cache(maxsize=4096)
    def count_tokens(self, text: str) -> int:
        """Token count using the EMBEDDING MODEL'S OWN tokenizer.

        Not tiktoken, not len(text)//4. The number that matters is this model's.
        """
        return len(self.model.tokenizer.encode(text, add_special_tokens=True))

    def encode_documents(self, texts: list[str], batch_size: int = 32) -> np.ndarray:
        payload = [self.doc_prefix + t for t in texts]
        return self.model.encode(
            payload,
            batch_size=batch_size,
            normalize_embeddings=self.normalize,
            convert_to_numpy=True,
            show_progress_bar=False,
        ).astype(np.float32)

    def encode_query(self, query: str) -> np.ndarray:
        vec = self.model.encode(
            [self.query_prefix + query],
            normalize_embeddings=self.normalize,
            convert_to_numpy=True,
            show_progress_bar=False,
        ).astype(np.float32)
        return vec[0]


_CACHE: dict[tuple, Embedder] = {}


def get_embedder(cfg) -> Embedder:
    """Process-level cache so the CLI does not reload the model per query."""
    key = (cfg.embed_model, cfg.query_prefix, cfg.doc_prefix, cfg.normalize)
    if key not in _CACHE:
        _CACHE[key] = Embedder(
            cfg.embed_model, cfg.query_prefix, cfg.doc_prefix, cfg.normalize
        )
    return _CACHE[key]
