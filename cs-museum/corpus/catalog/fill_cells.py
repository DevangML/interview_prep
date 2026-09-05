# -*- coding: utf-8 -*-
"""Render catalog cells from facts. coverage=partial unless absent_by_design."""
from __future__ import annotations
from fill_facts import FACTS
from evidence_gate import record_for

CONCEPT = {
    "prog_paradigms_functional_fp": "fp",
    "prog_paradigms_object-oriented_oop": "oop",
    "prog_paradigms_declarative": "decl",
    "prog_paradigms_actor_model": "actor",
    "prog_types_static_vs_dynamic": "static",
    "prog_types_strong_vs_weak": "strong",
    "prog_types_hindley-milner_inference": "hm",
    "prog_types_dependent_types": "dep",
    "prog_types_generics___polymorphism": "gen",
    "prog_memory_manual_malloc_free": "malloc",
    "prog_memory_garbage_collection_gc": "gc",
    "prog_memory_tracing_gc___mark-sweep": "trace",
    "prog_memory_reference_counting": "rc",
    "prog_memory_ownership___borrowing_raii": "own",
    "prog_concurrency_threads___mutexes": "thr",
    "prog_concurrency_coroutines_async_await": "coro",
    "prog_concurrency_channels___csp": "csp",
    "prog_concurrency_event_loop_node_v8": "loop",
}


def _src(lang: dict, facts: dict | None) -> str:
    return (facts or {}).get("docs") or lang.get("docs") or "Vendor / language documentation"


def _absent(lang: dict, reason: str, source: str) -> dict:
    return {
        "langId": lang["id"],
        "lang": lang["label"],
        "coverage": "absent_by_design",
        "mechanism": "",
        "why": "",
        "useWhen": "",
        "price": "",
        "source": source,
        "authority": 7,
        "confidence": "HIGH",
        "absentReason": reason,
        "empowered_by": [],
        "dependsOn": [],
        "traceDown": [],
        "syntaxExample": None,
    }


def _urls(rec: dict) -> list[str]:
    out = []
    for s in rec.get("sources") or []:
        if isinstance(s, str):
            out.append(s)
        elif isinstance(s, dict) and s.get("url"):
            out.append(s["url"])
    return out


def _apply_evidence(lang: dict, key: str, cell: dict) -> dict:
    rec = record_for(lang["id"], key)
    if not rec:
        return cell
    src = " | ".join(_urls(rec))
    n = lang["label"]
    if rec.get("on") is False:
        return _absent(lang, rec.get("reason") or cell.get("absentReason") or f"{n}: not in language.", src)
    frag = rec.get("fragment")
    mechanism = f"{n}: {frag}" if frag else cell.get("mechanism")
    out = _partial(
        lang,
        mechanism,
        rec.get("why") or cell.get("why"),
        rec.get("useWhen") or cell.get("useWhen"),
        rec.get("price") or cell.get("price"),
        src,
    )
    out["coverage"] = "verified"
    out["authority"] = 8
    out["confidence"] = "HIGH"
    return out


def _partial(lang, mechanism, why, useWhen, price, source) -> dict:
    return {
        "langId": lang["id"],
        "lang": lang["label"],
        "coverage": "partial",
        "mechanism": mechanism,
        "why": why,
        "useWhen": useWhen,
        "price": price,
        "source": source,
        "authority": 6,
        "confidence": "MEDIUM",
        "syntaxExample": None,
        "empowered_by": [],
        "dependsOn": [],
        "traceDown": [],
        "absentReason": None,
    }


def _kind_absent(lang: dict, cluster: str) -> str | None:
    cov = lang["clusterDefault"].get(cluster, "unverified")
    if cov == "absent_by_design":
        return lang.get("absentReason") or f"{lang['label']} has no programmer-visible {cluster} model."
    return None


def _raw_cell(lang: dict, concept_id: str, cluster: str) -> dict:
    src = _src(lang, FACTS.get(lang["id"]))
    kind_miss = _kind_absent(lang, cluster)
    if kind_miss:
        return _absent(lang, f"{kind_miss} Concept {concept_id} is not a {lang['label']} language feature.", src)
    facts = FACTS.get(lang["id"])
    if not facts:
        return _absent(
            lang,
            f"{lang['label']} is in the job catalog but this runtime kind has no fill profile; treat as not-in-language for {concept_id}.",
            src,
        )
    n = lang["label"]
    key = CONCEPT.get(concept_id)
    if key == "fp":
        if facts["fp"]:
            return _partial(lang, f"{n}: first-class functions/closures exist ({facts.get('fp')}). Not a purity guarantee.", "Jobs use callbacks and pipelines in this language.", "When composition beats a loop and the runtime allows it.", "Mutation is usually still available; this is a dialect, not Haskell.", src)
        return _absent(lang, f"{n} is not a functional language in the job-relevant core. Higher-order style is not the model.", src)
    if key == "oop":
        if facts["oop"]:
            return _partial(lang, f"{n}: objects/classes (or prototypes) are a primary modelling tool.", "Industry codebases in this family are class-shaped.", "Domain models, UI widgets, frameworks that expect classes.", "Inheritance and identity bugs; not every problem is an object.", src)
        return _absent(lang, f"{n} is not class-OOP as the primary job model.", src)
    if key == "decl":
        if facts["decl"]:
            return _partial(lang, f"{n}: a declarative core (queries, proofs, UI, or dataflow) is how authors state intent.", "The host evaluates; authors describe.", "When the problem is a specification, not a step list.", "Debugging the engine is harder than debugging a loop.", src)
        return _absent(lang, f"{n} is primarily imperative; declaration is a library/framework, not the language.", src)
    if key == "actor":
        if facts["actor"]:
            return _partial(lang, f"{n}: isolated processes/actors with mailboxes are the concurrency unit ({facts.get('thr')}).", "Shared-memory threads were the wrong isolation story here.", "When crash isolation and message passing beat locks.", "Copying/serialising messages; no shared objects.", src)
        return _absent(lang, f"{n} has no actor/OTP-style runtime in the language. Libraries do not count as the language.", src)
    if key == "static":
        return _partial(lang, f"{n} typing: {facts['static']}.", "Catching errors before or during running is a product bet.", "Match the checker to the job (strict vs scripts).", "Gradual/dynamic holes remain at FFI and tests.", src)
    if key == "strong":
        return _partial(lang, f"{n} strength: {facts['strong']}.", "Coercions and UB are where bugs hide.", "Prefer the strict equality/mode this language offers.", "Weak boundaries (FFI, variants, `id`) still exist.", src)
    if key == "hm":
        if facts["hm"]:
            return _partial(lang, f"{n} infers types in the Hindley–Milner family ({facts['gen']}).", "You annotate less at let-bindings.", "Pure functional cores and compilers.", "The job still hits language extensions that are not vanilla HM.", src)
        return _absent(lang, f"{n} does not implement Hindley–Milner. Inference, if any, is local or gradual.", src)
    if key == "dep":
        if facts["dep"]:
            return _partial(lang, f"{n} is a dependently typed language: types can mention values.", "Proofs and correct-by-construction APIs.", "Proof engineering, not CRUD apps.", "Type-checking cost; not a general app runtime.", src)
        return _absent(lang, f"{n} has no dependent types (Π/Σ). GADTs or refinements, if present, are not this concept.", src)
    if key == "gen":
        if facts["gen"] not in ("none", 0, None):
            return _partial(lang, f"{n} polymorphism: {facts['gen']}.", "Reuse algorithms across representations.", "Collections and public APIs.", "Erasure, monomorphisation bloat, or missing reification — know which.", src)
        return _absent(lang, f"{n} has no generics in the language core used on 2026 jobs.", src)
    if key == "malloc":
        if facts["malloc"]:
            return _partial(lang, f"{n} exposes explicit allocation/free (or equivalent) as the default heap story.", "Systems code needs predictable lifetime.", "When you own the bytes.", "Use-after-free and leaks; sanitizers exist because the language will not save you.", src)
        return _absent(lang, f"{n} does not give authors malloc/free as the language memory model. {facts['gc']}.", src)
    if key == "gc":
        if facts["gc"] and facts["gc"] != "no language GC" and facts["gc"] != "no GC":
            return _partial(lang, f"{n} heap: {facts['gc']}. Authors do not free ordinary objects.", "Throughput and safety beat explicit free for this runtime.", "Application heaps in this language.", "Pauses, jitter, or governor limits; no deterministic destructor unless documented elsewhere.", src)
        return _absent(lang, f"{n} has no tracing/refcounting GC as the language heap. {facts['gc']}.", src)
    if key == "trace":
        tr = facts.get("trace")
        if tr and tr not in (0, "0", False):
            return _partial(lang, f"{n} tracing/marking: {tr}. Distinct from Swift-style ARC if RC is also listed.", "Short-lived object graphs.", "The default heap, unless you opted into ARC/ownership.", "You profile; you rarely pick G1 vs ZGC from source.", src)
        return _absent(lang, f"{n} is not a tracing-GC language as the primary story.", src)
    if key == "rc":
        if facts["rc"]:
            return _partial(lang, f"{n} uses reference counting (possibly plus a cycle pass): {facts['gc']}.", "Deterministic-enough destruction without a tracing pause.", "When `deinit`/destructors matter.", "Cycles, retain traffic, or a cycle collector as the asterisk.", src)
        return _absent(lang, f"{n} is not ARC/refcount as the heap. {facts['gc']}.", src)
    if key == "own":
        if facts["own"]:
            return _partial(lang, f"{n} encodes ownership/borrowing (or affine moves) in the type system or by convention that the compiler checks.", "Alias-freedom without a GC.", "Systems and FFI boundaries.", "Fighting the checker; interior mutability escape hatches.", src)
        return _absent(lang, f"{n} has no borrow checker. `final`/const is not unique ownership.", src)
    if key == "thr":
        if facts["thr"] and "no" not in str(facts["thr"]).lower()[:8]:
            return _partial(lang, f"{n} threads/mutex story: {facts['thr']}.", "Multi-core exists; this is how this language exposes it.", "Shared-memory CPU work when the model allows it.", "GIL, data races, or 'threads are clones' — read the fragment.", src)
        return _absent(lang, f"{n} has no shared-memory thread+mutex API as the language model ({facts['thr']}).", src)
    if key == "coro":
        if facts["coro"]:
            return _partial(lang, f"{n} async/coroutines: {facts.get('loop') or facts['thr']}. Coloured functions unless noted.", "I/O without a thread per request.", "Network and UI idle work.", "Blocking the event loop or isolate still stalls the world.", src)
        return _absent(lang, f"{n} has no language-level async/await/coroutines in the job-relevant core.", src)
    if key == "csp":
        if facts["csp"]:
            return _partial(lang, f"{n} channels/CSP-style queues are in the language or core library, not a random npm package.", "Handoff without shared mutable.", "Pipelines and select-like waits.", "Unbuffered vs buffered; cancellation is the hard part.", src)
        return _absent(lang, f"{n} has no CSP channels in the language. Queues in libraries do not count.", src)
    if key == "loop":
        loop = facts.get("loop")
        if loop and loop not in (0, "0", False):
            return _partial(lang, f"{n} event loop: {loop}. Not the Node.js loop unless this is a JS host.", "UI and I/O multiplexing.", "When work is callback/timer shaped.", "One blocked turn freezes that loop.", src)
        return _absent(lang, f"{n} has no event-loop-as-language-runtime in the sense of HTML/Node. Threads or a batch runtime instead.", src)
    return _absent(lang, f"{n}: no renderer for {concept_id}.", src)


def filled_catalog_cell(lang: dict, concept_id: str, cluster: str) -> dict:
    cell = _raw_cell(lang, concept_id, cluster)
    key = CONCEPT.get(concept_id)
    if not key:
        return cell
    return _apply_evidence(lang, key, cell)
