"""Parsing and chunking.

Two decisions worth defending in an interview:

1. STRUCTURE-AWARE, THEN RECURSIVE. These are markdown documents with `##`
   headings, so the first split is on headings -- a heading section is a real
   semantic unit written by a human. Only if a section is still too big do I fall
   back to recursive character splitting on paragraph -> line -> sentence -> word.
   Fixed-size character splitting is what cuts a table in half.

2. TOKEN-COUNTED WITH THE EMBEDDING MODEL'S OWN TOKENIZER, not with len() and
   not with a different model's tokenizer. The constraint that actually matters
   is "does this chunk fit inside arctic-embed-xs's 512-token window", because
   past it the model TRUNCATES SILENTLY. There is no exception, no warning; you
   just never retrieve the tail of the document. So `chunk()` asserts the ceiling.

The heading is prepended to every chunk it produced. That is a one-line, zero-cost
approximation of Anthropic's contextual retrieval: the chunk carries a little of
the context it was cut out of.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Callable

SEPARATORS = ["\n\n", "\n", ". ", " "]


@dataclass
class Chunk:
    chunk_id: str
    doc_id: str
    title: str
    department: str
    classification: str
    allowed_roles: list[str]
    heading: str
    text: str
    n_tokens: int

    def to_dict(self) -> dict:
        return self.__dict__.copy()


def parse_front_matter(raw: str) -> tuple[dict, str]:
    """Split `---\\nkey: value\\n---\\nbody` into (metadata, body)."""
    if not raw.startswith("---"):
        raise ValueError("document is missing front matter")
    _, fm, body = raw.split("---", 2)
    meta: dict = {}
    for line in fm.strip().splitlines():
        if not line.strip():
            continue
        key, _, value = line.partition(":")
        meta[key.strip()] = value.strip()
    meta["allowed_roles"] = [r.strip() for r in meta["allowed_roles"].split(",")]
    return meta, body.strip()


def split_sections(body: str) -> list[tuple[str, str]]:
    """Split a markdown body into (heading, section_text) pairs."""
    sections: list[tuple[str, str]] = []
    heading = ""
    buf: list[str] = []
    for line in body.splitlines():
        if line.startswith("## "):
            if buf:
                sections.append((heading, "\n".join(buf).strip()))
                buf = []
            heading = line[3:].strip()
        elif line.startswith("# "):
            heading = heading or line[2:].strip()
        else:
            buf.append(line)
    if buf:
        sections.append((heading, "\n".join(buf).strip()))
    return [(h, t) for h, t in sections if t]


def _recursive_split(
    text: str,
    max_tokens: int,
    count: Callable[[str], int],
    seps: list[str] | None = None,
) -> list[str]:
    """Split text so every piece is <= max_tokens, trying separators in order."""
    seps = SEPARATORS if seps is None else seps
    if count(text) <= max_tokens:
        return [text]
    if not seps:
        # No separators left: hard-cut on words. Should be rare.
        words = text.split()
        out, cur = [], []
        for w in words:
            cur.append(w)
            if count(" ".join(cur)) > max_tokens:
                cur.pop()
                out.append(" ".join(cur))
                cur = [w]
        if cur:
            out.append(" ".join(cur))
        return out

    sep, rest = seps[0], seps[1:]
    parts = text.split(sep)
    merged: list[str] = []
    cur = ""
    for part in parts:
        candidate = part if not cur else cur + sep + part
        if count(candidate) <= max_tokens:
            cur = candidate
        else:
            if cur:
                merged.append(cur)
            cur = part
    if cur:
        merged.append(cur)

    out: list[str] = []
    for piece in merged:
        if count(piece) > max_tokens:
            out.extend(_recursive_split(piece, max_tokens, count, rest))
        else:
            out.append(piece)
    return out


def _apply_overlap(
    pieces: list[str], overlap_tokens: int, count: Callable[[str], int]
) -> list[str]:
    """Prepend the tail of the previous piece to each piece.

    Overlap exists so a fact that straddles a boundary appears WHOLE in at least
    one chunk. The cost is index bloat and duplicate hits, which is why we dedupe
    by doc at assembly time.
    """
    if overlap_tokens <= 0 or len(pieces) < 2:
        return pieces
    out = [pieces[0]]
    for prev, cur in zip(pieces, pieces[1:]):
        words = prev.split()
        tail: list[str] = []
        for w in reversed(words):
            tail.insert(0, w)
            if count(" ".join(tail)) >= overlap_tokens:
                break
        out.append(" ".join(tail) + " " + cur)
    return out


def _fixed_windows(
    body: str, chunk_tokens: int, overlap_tokens: int, count: Callable[[str], int]
) -> list[tuple[str, str]]:
    """The CONTROL CONDITION: naive fixed-size windows over the whole document.

    No headings, no paragraph boundaries, no structure. This is what "just use a
    character splitter" gets you, and it exists here only so the difference shows
    up in a table rather than in an assertion.
    """
    words = body.split()
    out, cur = [], []
    stride = max(1, chunk_tokens - overlap_tokens)
    pieces: list[str] = []
    for w in words:
        cur.append(w)
        if count(" ".join(cur)) >= chunk_tokens:
            pieces.append(" ".join(cur))
            keep = int(len(cur) * overlap_tokens / max(chunk_tokens, 1))
            cur = cur[len(cur) - keep:] if keep else []
    if cur:
        pieces.append(" ".join(cur))
    _ = stride, out
    return [("", p) for p in pieces]


def chunk_document(
    raw: str,
    count_tokens: Callable[[str], int],
    chunk_tokens: int = 200,
    overlap_tokens: int = 30,
    max_model_tokens: int = 512,
    strategy: str = "structure",
) -> list[Chunk]:
    meta, body = parse_front_matter(raw)
    chunks: list[Chunk] = []
    sections = (
        split_sections(body)
        if strategy == "structure"
        else _fixed_windows(body, chunk_tokens, overlap_tokens, count_tokens)
    )
    for heading, section in sections:
        # Budget for the heading prefix we are about to prepend.
        prefix = f"{meta['title']} > {heading}\n" if heading else f"{meta['title']}\n"
        budget = chunk_tokens - count_tokens(prefix)
        pieces = _recursive_split(section, max(budget, 32), count_tokens)
        pieces = _apply_overlap(pieces, overlap_tokens, count_tokens)
        for i, piece in enumerate(pieces):
            text = prefix + piece
            n = count_tokens(text)
            # Fail loudly rather than let the embedder truncate in silence.
            assert n <= max_model_tokens, (
                f"chunk {meta['doc_id']}#{len(chunks)} is {n} tokens, over the "
                f"model limit of {max_model_tokens}; it would be silently truncated"
            )
            chunks.append(
                Chunk(
                    chunk_id=f"{meta['doc_id']}::{len(chunks):03d}",
                    doc_id=meta["doc_id"],
                    title=meta["title"],
                    department=meta["department"],
                    classification=meta["classification"],
                    allowed_roles=list(meta["allowed_roles"]),
                    heading=heading,
                    text=text,
                    n_tokens=n,
                )
            )
    return chunks
