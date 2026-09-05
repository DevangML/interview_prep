#!/usr/bin/env python3
"""Seed verified/absent cells for HTML, CSS, JS, TS, Dart on the 18 authored concepts."""
from __future__ import annotations
import json
from pathlib import Path

CELLS = Path(__file__).resolve().parent / "cells"

C = {
    "fp": "prog_paradigms_functional_fp",
    "oop": "prog_paradigms_object-oriented_oop",
    "decl": "prog_paradigms_declarative",
    "actor": "prog_paradigms_actor_model",
    "stat": "prog_types_static_vs_dynamic",
    "strong": "prog_types_strong_vs_weak",
    "hm": "prog_types_hindley-milner_inference",
    "dep": "prog_types_dependent_types",
    "gen": "prog_types_generics___polymorphism",
    "malloc": "prog_memory_manual_malloc_free",
    "gc": "prog_memory_garbage_collection_gc",
    "trace": "prog_memory_tracing_gc___mark-sweep",
    "rc": "prog_memory_reference_counting",
    "own": "prog_memory_ownership___borrowing_raii",
    "thr": "prog_concurrency_threads___mutexes",
    "coro": "prog_concurrency_coroutines_async_await",
    "csp": "prog_concurrency_channels___csp",
    "loop": "prog_concurrency_event_loop_node_v8",
}

def V(mechanism, why, useWhen, price, source, authority=8, extra=None):
    d = {
        "coverage": "verified",
        "mechanism": mechanism,
        "why": why,
        "useWhen": useWhen,
        "price": price,
        "source": source,
        "authority": authority,
        "confidence": "HIGH",
        "syntaxExample": None,
        "empowered_by": [],
        "dependsOn": [],
        "traceDown": [],
        "absentReason": None,
    }
    if extra:
        d.update(extra)
    return d

def A(reason, source="Language design / runtime docs"):
    return {
        "coverage": "absent_by_design",
        "mechanism": "",
        "why": "",
        "useWhen": "",
        "price": "",
        "source": source,
        "authority": 8,
        "confidence": "HIGH",
        "absentReason": reason,
        "empowered_by": [],
        "dependsOn": [],
        "traceDown": [],
        "syntaxExample": None,
    }

HTML_ABSENT = A(
    "HTML is a vocabulary of elements and a parsing algorithm (WHATWG). It does not allocate a programmer-visible heap, schedule threads, or type-check expressions.",
    "https://html.spec.whatwg.org/",
)
CSS_ABSENT = A(
    "CSS is a constraint/style language. Layout, painting, and animations run in the browser engine; authors do not malloc, spawn threads, or inhabit a type lattice.",
    "https://www.w3.org/TR/css-snapshot/",
)

SEED = {
    "html": {
        C["decl"]: V(
            "Authors declare a tree of elements and attributes. The browser's HTML parser (tokenizer → tree builder → DOM) is the execution. There is no user-level evaluation order beyond parse/reparse and script-blocking rules.",
            "The web needed a durable, round-trippable document format that non-programmers could write and that browsers could recover from when markup was sloppy.",
            "Document structure, forms, accessibility trees, and anything that must round-trip as a web page.",
            "No computation. Behaviour lives in JS, CSS, and the engine. Invalid markup is repaired, which hides errors.",
            "https://html.spec.whatwg.org/#parsing",
            10,
        ),
        C["oop"]: A("The DOM object model is a JavaScript/host API over the HTML tree, not a feature of HTML the language."),
        C["fp"]: HTML_ABSENT,
        C["actor"]: HTML_ABSENT,
        C["stat"]: HTML_ABSENT,
        C["strong"]: HTML_ABSENT,
        C["hm"]: HTML_ABSENT,
        C["dep"]: HTML_ABSENT,
        C["gen"]: HTML_ABSENT,
        C["malloc"]: HTML_ABSENT,
        C["gc"]: HTML_ABSENT,
        C["trace"]: HTML_ABSENT,
        C["rc"]: HTML_ABSENT,
        C["own"]: HTML_ABSENT,
        C["thr"]: HTML_ABSENT,
        C["coro"]: HTML_ABSENT,
        C["csp"]: HTML_ABSENT,
        C["loop"]: A("HTML can block/parser-defer scripts, but the event loop is specified for HTML's JS environment, not for HTML as a language. See HTML spec 'event loop'. The cell for that mechanism belongs to JavaScript."),
    },
    "css": {
        C["decl"]: V(
            "Rulesets map selectors to declarations. Cascade, specificity, inheritance, and then used-value computation produce layout. Recent CSS (grid, alignment, anchor, style queries) is constraint solving, not assignment.",
            "Presentation had to be restyled without rewriting documents. Cascading lets user, author, and UA sheets coexist.",
            "Layout, theme, responsive design, and any visual constraint that should not be a JS layout loop.",
            "Specificity wars; no general computation; debugging computed style is a specialized skill; some layout is still engine-magic.",
            "https://www.w3.org/TR/css-cascade-5/",
            10,
        ),
        C["fp"]: CSS_ABSENT,
        C["oop"]: CSS_ABSENT,
        C["actor"]: CSS_ABSENT,
        C["stat"]: CSS_ABSENT,
        C["strong"]: CSS_ABSENT,
        C["hm"]: CSS_ABSENT,
        C["dep"]: CSS_ABSENT,
        C["gen"]: CSS_ABSENT,
        C["malloc"]: CSS_ABSENT,
        C["gc"]: CSS_ABSENT,
        C["trace"]: CSS_ABSENT,
        C["rc"]: CSS_ABSENT,
        C["own"]: CSS_ABSENT,
        C["thr"]: CSS_ABSENT,
        C["coro"]: CSS_ABSENT,
        C["csp"]: CSS_ABSENT,
        C["loop"]: A("CSS animations/transitions are time-driven by the engine. There is no CSS event loop or await."),
    },
    "javascript": {
        C["stat"]: V(
            "Dynamically typed values (tagged in the VM). TypeScript is a separate layer. JS itself checks almost nothing at compile time; failures are TypeError/runtime.",
            "The browser required a language that could ship in source and survive sloppy pages.",
            "UI, glue, serverless, and anything that must run where only a JS engine exists.",
            "Entire classes of bugs move to production; 'undefined is not a function' is the tax.",
            "https://tc39.es/ecma262/",
            10,
        ),
        C["loop"]: V(
            "A single-threaded event loop: call stack, then microtasks (promises), then rendering, then macrotasks (timers, I/O). Web Workers are separate event loops, not shared-memory threads by default.",
            "The UI thread cannot block; I/O had to be multiplexed without pthreads in the page.",
            "All browser JS and Node unless you opt into worker_threads.",
            "One blocked turn freezes the page; CPU parallelism requires workers and structured clone or SharedArrayBuffer.",
            "https://html.spec.whatwg.org/#event-loop",
            10,
        ),
        C["gc"]: V(
            "Engine-owned tracing GC (V8: scavenger + mark-compact; similar story in JSC/SpiderMonkey). Authors never free.",
            "Web pages allocate huge short-lived graphs; a generational collector matches that mortality.",
            "All ordinary JS. WASM/linear memory is a different story.",
            "Pause and heap size are not under app control; no deterministic destruction.",
            "https://v8.dev/blog",
        ),
        C["malloc"]: A("Safe JS has no malloc/free. WASM linear memory is a different language sitting beside JS."),
        C["own"]: A("No affine types or borrow checker. GC owns lifetime. `using` is resource RAII, not memory ownership."),
        C["rc"]: A("Engines trace; they do not expose ARC."),
        C["thr"]: A("The language is single-threaded per isolate. Workers do not share the JS heap."),
        C["csp"]: A("No built-in channels. postMessage is structured-clone handoff between isolates."),
        C["actor"]: A("Workers are isolate-like, not OTP actors. No supervision trees in the language."),
        C["hm"]: A("No Hindley–Milner. TypeScript is a different language."),
        C["dep"]: A("No dependent types."),
        C["fp"]: V(
            "Functions are values; closures over mutable environments. No purity. Prototypes and `this` sit beside the FP subset.",
            "Scheme-in-the-browser was the original pitch; the Java-shaped `this` arrived for HTML event handlers.",
            "Callbacks, array pipelines, React function components.",
            "Mutation and `this`-binding make 'just functions' a dialect, not the language.",
            "https://tc39.es/ecma262/#sec-ecmascript-function-objects",
            10,
        ),
        C["oop"]: V(
            "Prototypal delegation plus `class` syntactic sugar over the same object model. `this` is call-site bound unless arrow functions.",
            "JS had to look like Java for browser vendors and authors in the 90s, without actually being Java.",
            "UI widgets, Node services, anything using `class`.",
            "`this` bugs; mixing prototypes and classes; no access control at runtime.",
            "https://tc39.es/ecma262/#sec-objects",
            10,
        ),
        C["decl"]: V(
            "JSX is not JS — it is a compile-to-calls dialect. Vanilla JS is imperative DOM mutation unless a framework diffs a tree.",
            "The DOM API was imperative; frameworks bolted declaration on top.",
            "React/etc. jobs — which is most frontend JS in 2026.",
            "The language does not enforce purity of render; you can mutate during render and suffer.",
            "https://facebook.github.io/jsx/",
        ),
        C["gen"]: A("JS has no generics. Those live in TypeScript and are erased."),
        C["strong"]: V(
            "Weak-to-medium: implicit coercions (`==`, `+[]`). `===` and strict mode reduce the damage; they do not remove ToPrimitive.",
            "Loose equality was a 1995 convenience that cannot be removed without breaking the web.",
            "Always, and you should pretend `==` does not exist.",
            "A legendary bug farm; linters exist because the language will not save you.",
            "https://tc39.es/ecma262/#sec-equality-operators",
            10,
        ),
        C["trace"]: V(
            "Young-generation scavenging plus old-generation mark-compact in V8; other engines rhyme. Authors do not choose the algorithm.",
            "See GC cell.",
            "All ordinary JS heaps.",
            "You profile, you do not pick G1 vs ZGC.",
            "https://v8.dev/blog",
        ),
    },
    "typescript": {
        C["stat"]: V(
            "A structural, gradual type system erased before runtime. `strict` is opt-in. The emitted JS has no residual types unless you emit runtime helpers by hand.",
            "JS jobs needed static checking without abandoning the JS runtime or npm.",
            "Any JS codebase that can afford a compile step — which in 2026 is most product TS jobs.",
            "Types are a lie the compiler told you; `as` and `any` punch holes; runtime is still JS.",
            "https://www.typescriptlang.org/docs/handbook/2/basic-types.html",
            8,
        ),
        C["strong"]: V(
            "Mostly strong at compile time (no implicit `number+[]` if strict). Weakness is the escape hatches and the fact values are JS.",
            "Compatibility with JS's runtime coercions had to remain, so the checker is a filter, not a new VM.",
            "Application TS with `strict: true`.",
            "Strictness is a tsconfig social contract, not a language law.",
            "https://www.typescriptlang.org/tsconfig/#strict",
        ),
        C["gen"]: V(
            "Generic types, conditional types, mapped types, `infer`. All erased. This is where TS is deeper than Java generics — and where compile times go to die.",
            "JS APIs are extremely higher-order; a Java-style generic system could not type lodash/React.",
            "Typed libraries, React components, API SDKs.",
            "Turing-complete types; unreadable error messages; nothing executes.",
            "https://www.typescriptlang.org/docs/handbook/2/generics.html",
        ),
        C["hm"]: A("TS does not implement Hindley–Milner. Inference is local/contextual and incomplete by design; you annotate boundaries."),
        C["dep"]: A("No dependent types. Template-literal types and `satisfies` are not Π-types."),
        C["malloc"]: A("TS adds no allocator. Memory is the JS engine's."),
        C["own"]: A("No borrow checker. `readonly` is a type-level hint, erased, not enforced against mutation through aliases."),
        C["gc"]: V(
            "Same collector as the JS runtime you emit to (usually V8 in Node/Chrome). TS does not pick a GC.",
            "TS is a type layer over JS, not a new runtime.",
            "Always, when targeting JS.",
            "You cannot express GC policy in the type system.",
            "https://www.typescriptlang.org/docs/handbook/2/basic-types.html",
        ),
        C["loop"]: V(
            "Same event loop as JS. `Promise`/`async` types are static; scheduling is still the host.",
            "Types should describe JS, not replace it.",
            "All TS-on-JS hosts.",
            "Typed `async` still deadlocks the UI thread if you compute too long.",
            "https://html.spec.whatwg.org/#event-loop",
        ),
        C["fp"]: V(
            "Functions are values; closures close over JS environments. No purity, no HKT. FP style is a library convention (fp-ts) sitting on an imperative VM.",
            "JS already had first-class functions; TS typed them.",
            "Callbacks, React function components, array pipelines.",
            "No effect system; mutation is always available.",
            "https://www.typescriptlang.org/docs/handbook/2/functions.html",
        ),
        C["oop"]: V(
            "`class`, `interface`, structural typing. Nominal-ish branding is a convention (`unique symbol`). Prototypal JS is still what runs.",
            "Java-shaped teams needed classes; JS had prototypes; TS bridged them.",
            "Angular/Nest-style codebases, domain models.",
            "Structural typing surprises (`Circle` assignable to `Ellipse`); runtime still prototype soup.",
            "https://www.typescriptlang.org/docs/handbook/2/classes.html",
        ),
        C["decl"]: V(
            "JSX/TSX is a typed embedding of a UI tree, compiled to function calls. Types check props; they do not make the UI declarative at runtime.",
            "React jobs in 2026 are typed component trees.",
            "React/Solid/Vue SFC-style UIs authored in TS.",
            "The 'declaration' is still a program that runs every render.",
            "https://www.typescriptlang.org/docs/handbook/jsx.html",
        ),
        C["actor"]: A("No actor runtime in the language. Workers are message-passing but shared-nothing clones, not Erlang processes."),
        C["trace"]: V(
            "Whatever tracing collector the JS engine uses. TS has no say.",
            "Erase-to-JS.",
            "Always on JS targets.",
            "Cannot tune generations from TS.",
            "https://v8.dev/blog",
        ),
        C["rc"]: A("JS engines are tracing collectors, not Swift-style ARC. Do not confuse `WeakRef` with refcounting."),
        C["thr"]: A("No shared-memory threads in language-level TS. `worker_threads` / Workers are isolated VMs. SharedArrayBuffer is an opt-in memory, not a typed threading model."),
        C["coro"]: V(
            "Same `async`/`await` as JS, with Promise types. `using`/explicit resource management is a recent completion, not a thread.",
            "Colour the same as JS so `.d.ts` files match reality.",
            "I/O in Node and the browser.",
            "Still one event loop per isolate.",
            "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html",
        ),
        C["csp"]: A("No built-in channels. Libraries (rxjs, worker postMessage) can mimic handoff."),
    },
    "dart": {
        C["stat"]: V(
            "Sound static typing with inference, NNBD (null safety) since Dart 2.12. Runtime is still a VM or compiled JS/Wasm; types are checked in sound mode.",
            "Flutter needed a single language that was fast to iterate (VM) and AOT-compilable for mobile, with fewer null crashes than JS.",
            "All Flutter and Dart-server jobs in 2026.",
            "Two compilation pipelines (VM vs AOT vs JS) mean some libraries are not portable; the type system does not erase as aggressively as TS.",
            "https://dart.dev/guides/language/type-system",
            8,
        ),
        C["strong"]: V(
            "Sound null safety and a relatively strong static checker. Implicit downcasts were removed. Runtime type tests remain (`is`, `as`).",
            "The migration to NNBD was explicitly a bet against JS-style null bugs in UI trees.",
            "Flutter widgets and business logic.",
            "Generic variance and JS-interop still leak unsoundness at boundaries.",
            "https://dart.dev/null-safety",
        ),
        C["gen"]: V(
            "Reified generics on the VM (`List<int>` is distinct at runtime). On JS backends some reification is lost. Variance is declaration-site for classes.",
            "Flutter's `Widget` tree is generic all the way down; erasure like Java would hurt.",
            "Collections, widgets, `Future<T>`.",
            "JS compilation weakens guarantees; you must know your backend.",
            "https://dart.dev/guides/language/language-tour#generics",
        ),
        C["hm"]: A("Dart inference is local/flow-based, not Hindley–Milner. You still annotate public APIs."),
        C["dep"]: A("No dependent types."),
        C["fp"]: V(
            "First-class functions, closures, collection-`map`. Not a lazy/pure language. `typedef` function types. Records and pattern matching (Dart 3) made algebraic-style data practical.",
            "UI trees are easier if functions and data are values, without requiring Haskell.",
            "Callbacks, `copyWith`, collection pipelines.",
            "Mutation is normal; there is no effect system.",
            "https://dart.dev/language/functions",
        ),
        C["oop"]: V(
            "Class-based, single inheritance, mixins, interfaces (every class is an interface), extension methods, and now class modifiers (`sealed`, `final`, `base`, `interface`).",
            "Flutter's `Widget`/`State` model is OOP. Mixins replaced multiple inheritance without C++ pain.",
            "Every Flutter app.",
            "Deep widget trees; mixin order; `BuildContext` lifetime is a discipline, not a type.",
            "https://dart.dev/language/classes",
        ),
        C["decl"]: V(
            "Flutter's `build()` returns a widget tree — an immediate-mode declaration of UI that the framework diffs. Dart itself is imperative; the declarative layer is the framework.",
            "React-like UI without JS, on mobile AOT.",
            "Flutter screens.",
            "Rebuild storms; `const` constructors are a performance social contract.",
            "https://docs.flutter.dev/ui",
        ),
        C["actor"]: V(
            "Isolates: shared-nothing heaps, message passing via ports. `Isolate.run` / `compute` for one-shot background work. Not Erlang: no preemptive process tree or OTP supervisors in the language.",
            "Flutter UI isolate must stay free; heavy work needs another heap because there is no shared-memory thread model.",
            "JSON parse, image codecs, any CPU work that would jank frames.",
            "No shared objects; copying costs; isolate startup is not free; debugging cross-isolate is harder.",
            "https://dart.dev/language/isolates",
            8,
        ),
        C["malloc"]: A("No malloc in safe Dart. Allocation is `new`/literals; the GC owns the heap. FFI can call native allocators, which is not Dart's memory model."),
        C["gc"]: V(
            "Generational GC in the Dart VM; Flutter mobile uses this. Dart compiled to JS uses the browser GC. No user `free`.",
            "UI frames cannot afford Swift-style retain traffic on every widget rebuild, and cannot afford C's free.",
            "All normal Dart/Flutter heaps.",
            "Jank if you allocate every frame; no deterministic destructors (finalizers exist but are not RAII).",
            "https://dart.dev/guides/language/memory-management",
        ),
        C["trace"]: V(
            "VM tracing/generational collection. Not refcounting.",
            "Same as Dart GC.",
            "Dart VM / Flutter.",
            "You profile frames, you do not tune G1-style regions.",
            "https://dart.dev/guides/language/memory-management",
        ),
        C["rc"]: A("Dart VM is tracing GC, not ARC. Do not map Flutter to Swift here."),
        C["own"]: A("No borrow checker. Object identity and mutability are runtime facts. `final` is single-assignment, not unique ownership."),
        C["thr"]: A("No shared-memory threads. Isolates are the unit. `dart:ffi` + native threads is an escape hatch, not the Dart model."),
        C["coro"]: V(
            "`Future`/`async`/`await` on the isolate event loop. `Stream` for push sequences. Completely coloured like JS, running on one isolate unless you spawn another.",
            "Flutter I/O and animation tickers needed non-blocking composition without OS threads.",
            "Network, file, most plugin calls.",
            "A sync loop in `build` or a forgotten `await` still janks; isolates are the only CPU off-ramp.",
            "https://dart.dev/language/async",
        ),
        C["csp"]: V(
            "`Stream`/`StreamController` are in-isolate queues, not CSP channels across processes. Cross-isolate, `SendPort`/`ReceivePort` are untyped message pipes.",
            "Need a queue abstraction without importing Erlang.",
            "Event buses inside an isolate; worker isolates for handoff.",
            "No select-over-channels in the language; backpressure is library-level.",
            "https://dart.dev/libraries/async/using-streams",
        ),
        C["loop"]: V(
            "Each isolate has an event loop (microtasks vs event queue), analogous to JS, driven by the embedder (Flutter engine / Dart VM).",
            "UI and I/O on one isolate.",
            "All Flutter apps; Dart CLI.",
            "The UI isolate is sacred — block it and you drop frames.",
            "https://dart.dev/articles/archive/event-loop",
        ),
    },
}


def main():
    n = 0
    for lang, concepts in SEED.items():
        d = CELLS / lang
        d.mkdir(parents=True, exist_ok=True)
        for concept_id, cell in concepts.items():
            payload = {"langId": lang, **cell}
            path = d / f"{concept_id}.json"
            path.write_text(json.dumps(payload, indent=2) + "\n")
            n += 1
    print(f"wrote {n} cells under {CELLS}")


if __name__ == "__main__":
    main()
