"""Generation, behind a swappable interface.

Design decision worth stating out loud in an interview: the LLM is a COMPONENT,
not the system. It sits behind one function signature, and there are three
implementations:

  extractive : deterministic, no model, no network. Selects the sentences from
               the retrieved context that best match the query and cites them.
               This is the DEFAULT because it makes retrieval evaluation
               independent of generation quality -- if faithfulness is 1.0 by
               construction, then every wrong answer is a retrieval bug, which is
               exactly the decomposition I want while tuning the retriever.
  ollama     : any local model served by ollama, if it happens to be running.
  hf         : a small local instruct model via transformers.

None of them require a paid API key. Swapping is a config value.

The prompt is deliberately boring and contains the three lines that matter:
answer ONLY from context, CITE the source, and you are ALLOWED to say you don't
know. The third one is the anti-hallucination lever most people forget -- a model
with no permission to abstain will fabricate, because its objective rewards
plausibility and it has no "I don't know" state to fall into.
"""

from __future__ import annotations

import re
from dataclasses import dataclass

import numpy as np

SYSTEM_PROMPT = """You are an internal knowledge assistant.

Rules, in priority order:
1. Answer ONLY from the CONTEXT below. Do not use outside knowledge.
2. Cite the source of every claim using its [doc_id > section] tag.
3. If the CONTEXT does not contain the answer, say exactly:
   "I don't have authorised information on that."
   Do not guess. An abstention is a correct answer.
4. Be concise. Three sentences unless the question needs more.
"""

ABSTAIN = "I don't have authorised information on that."


@dataclass
class Answer:
    text: str
    citations: list[str]
    backend: str
    abstained: bool
    prompt_chars: int = 0


def build_context(hits, max_chunks: int) -> str:
    """Assemble the context block.

    Order matters: strongest chunk FIRST. Models attend worse to the middle of a
    long context ("lost in the middle", Liu et al. 2023), so the best evidence
    goes where attention is strongest, not wherever the retriever happened to
    emit it.
    """
    parts = []
    for h in hits[:max_chunks]:
        parts.append(f"{h.citation()}\n{h.text}")
    return "\n\n---\n\n".join(parts)


def _split_sentences(text: str) -> list[str]:
    return [s.strip() for s in re.split(r"(?<=[.!?])\s+", text) if len(s.strip()) > 20]


def generate_extractive(query: str, hits, cfg, embedder=None) -> Answer:
    if not hits:
        return Answer(ABSTAIN, [], "extractive", True)
    from .embedding import get_embedder

    embedder = embedder or get_embedder(cfg)
    sentences, owners = [], []
    for h in hits[: cfg.max_context_chunks]:
        for s in _split_sentences(h.text):
            sentences.append(s)
            owners.append(h)
    if not sentences:
        return Answer(ABSTAIN, [], "extractive", True)

    qvec = embedder.encode_query(query)
    svecs = embedder.encode_documents(sentences)
    scores = svecs @ qvec
    order = np.argsort(-scores)[:3]
    order = sorted(order.tolist())  # keep document order in the output

    lines, cites = [], []
    for i in order:
        cite = owners[i].citation()
        lines.append(f"{sentences[i]} {cite}")
        if cite not in cites:
            cites.append(cite)
    return Answer("\n".join(lines), cites, "extractive", False)


def generate_ollama(query: str, hits, cfg) -> Answer:
    import json
    import urllib.request

    context = build_context(hits, cfg.max_context_chunks)
    prompt = f"{SYSTEM_PROMPT}\n\nCONTEXT:\n{context}\n\nQUESTION: {query}\n\nANSWER:"
    body = json.dumps(
        {
            "model": cfg.ollama_model,
            "prompt": prompt,
            "stream": False,
            # temperature 0: this is a grounded-QA task, not a creative one.
            "options": {"temperature": 0.0},
        }
    ).encode()
    req = urllib.request.Request(
        "http://localhost:11434/api/generate", data=body,
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        text = json.loads(resp.read())["response"].strip()
    cites = re.findall(r"\[[^\]]+\]", text)
    return Answer(text, cites, "ollama", ABSTAIN.lower() in text.lower(), len(prompt))


_HF = {}


def generate_hf(query: str, hits, cfg) -> Answer:
    from transformers import AutoModelForCausalLM, AutoTokenizer

    if cfg.hf_model not in _HF:
        tok = AutoTokenizer.from_pretrained(cfg.hf_model)
        model = AutoModelForCausalLM.from_pretrained(cfg.hf_model)
        _HF[cfg.hf_model] = (tok, model)
    tok, model = _HF[cfg.hf_model]

    context = build_context(hits, cfg.max_context_chunks)
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": f"CONTEXT:\n{context}\n\nQUESTION: {query}"},
    ]
    prompt = tok.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    ids = tok(prompt, return_tensors="pt")
    out = model.generate(**ids, max_new_tokens=200, do_sample=False)
    text = tok.decode(out[0][ids["input_ids"].shape[1]:], skip_special_tokens=True).strip()
    cites = re.findall(r"\[[^\]]+\]", text)
    return Answer(text, cites, "hf", ABSTAIN.lower() in text.lower(), len(prompt))


def generate(query: str, hits, cfg, embedder=None) -> Answer:
    if not hits:
        return Answer(ABSTAIN, [], cfg.generator, True)
    if cfg.generator == "ollama":
        try:
            return generate_ollama(query, hits, cfg)
        except Exception as exc:  # noqa: BLE001 - deliberate: degrade, don't crash
            print(f"[warn] ollama unavailable ({exc.__class__.__name__}); "
                  f"falling back to extractive")
            return generate_extractive(query, hits, cfg, embedder)
    if cfg.generator == "hf":
        return generate_hf(query, hits, cfg)
    return generate_extractive(query, hits, cfg, embedder)
