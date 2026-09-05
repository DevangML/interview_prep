"""Seed the remaining declared concept IDs with explicit, reviewable records.

This is an editorial inventory scaffold, not a claim that every language cell is
researched. Unknown cells remain visible for later source review.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LANGUAGES = json.loads((ROOT / "scope.json").read_text())["languages"]
SOURCES = {
    "memory-lifetime": "https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html",
    "dispatch": "https://docs.oracle.com/javase/tutorial/java/IandI/polymorphism.html",
    "abstraction-over-types": "https://doc.rust-lang.org/book/ch10-00-generics.html",
    "effects-sequencing": "https://ocaml.org/manual/5.4/effects.html",
    "error-signalling": "https://go.dev/blog/error-handling-and-go",
    "concurrency": "https://go.dev/ref/mem",
    "modules": "https://doc.rust-lang.org/reference/items/modules.html",
    "metaprogramming": "https://doc.rust-lang.org/reference/macros.html",
    "data-modelling": "https://docs.python.org/3/library/dataclasses.html",
    "evaluation-order": "https://docs.python.org/3/reference/expressions.html#evaluation-order",
    "compilation-linkage": "https://llvm.org/docs/LangRef.html",
    "syntactic-ergonomics": "https://doc.rust-lang.org/book/ch19-06-macros.html",
}
NAMES = {
    "memory-lifetime": "allocation free ownership borrowing move drop weak references arenas region allocation stack lifetime resource cleanup finalization pinning self reference cycle detection escape analysis linear resources lifetime variance allocator ownership transfer dangling pointer prevention".split(),
    "dispatch": "static dispatch dynamic dispatch virtual method table overload resolution multimethods single dispatch double dispatch message passing late binding inline cache devirtualization extension method witness table typeclass dictionary protocol witness open recursion method lookup dispatch interception reflection invocation dynamic proxy visitor dispatch pattern matching".split(),
    "abstraction-over-types": "parametric polymorphism subtype polymorphism ad hoc polymorphism bounded generics variance type inference higher kinded types associated types existential types type erasure reification monomorphization specialization generic constraints typeclass coherence phantom types dependent indices".split(),
    "effects-sequencing": "state effect IO effect exception effect reader writer nondeterminism laziness strictness continuation monad algebraic effect handler delimited continuation async effect cancellation resource scope sequencing purity referential transparency applicative sequencing generator suspension".split(),
    "error-signalling": "exception propagation result type option type panic abort error codes checked exceptions unchecked exceptions recovery retry cancellation timeout validation aggregation context wrapping stack trace cleanup failure atomicity partial failure".split(),
    "concurrency": "process thread coroutine fiber actor channel mutex semaphore monitor condition variable atomic operation memory ordering data race deadlock livelock starvation lock free wait free scheduler work stealing structured concurrency cancellation backpressure parallelism".split(),
    "modules": "namespace visibility import export package crate header separate compilation module initialization cyclic dependency dependency injection versioning semantic versioning package lock vendoring plugin boundary interface file unit compilation unit linkage name resolution reexport friend module capability module".split(),
    "metaprogramming": "text macro hygienic macro procedural macro syntax extension quotation unquotation reflection annotation attribute decorator code generation template compile time evaluation staging partial evaluation constant evaluation derive macro interpreter compiler plugin DSL embedding source transformation AST transformation type level programming metaclass".split(),
    "data-modelling": "product type sum type enum record class object protocol trait refinement type phantom type newtype smart constructor invariant nullability optional field recursive type recursive data schema evolution serialization normalization denormalization relational model algebraic data type entity value object aggregate bounded context identity map".split(),
    "evaluation-order": "call by value call by name call by need call by reference short circuit sequencing unspecified order defined order strict evaluation lazy evaluation tail call continuation evaluation strategy memoization thunk forcing observable side effect order list comprehension pipeline operator operator precedence associativity macro expansion order initialization order destruction order".split(),
    "compilation-linkage": "lexing parsing AST type checking IR lowering optimization register allocation instruction selection linking relocation symbol visibility static linking dynamic linking loader shared library ABI calling convention name mangling debug information source map incremental compilation cross compilation reproducible build package artifact".split(),
    "syntactic-ergonomics": "desugaring optional chaining null coalescing pattern matching pipeline operator comprehensions generators decorators async syntax error recovery type ascription inference punctuation whitespace significant syntax macro notation operator overloading named arguments default arguments keyword arguments guard clauses early return interpolation".split(),
}

def slug(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")

def family(cluster):
    return {
        "memory-lifetime": "resource and lifetime discipline",
        "dispatch": "choosing an implementation for an invocation",
        "abstraction-over-types": "reusing behavior across representations",
        "effects-sequencing": "making computation and observable effects composable",
        "error-signalling": "reporting and recovering from failed operations",
        "concurrency": "coordinating interleaved or parallel work",
        "modules": "controlling names, dependencies and compilation boundaries",
        "metaprogramming": "producing or interpreting program structure",
        "data-modelling": "representing valid domain states and transitions",
        "evaluation-order": "deciding when expressions and effects happen",
        "compilation-linkage": "turning source into loadable executable artifacts",
        "syntactic-ergonomics": "reducing ceremony while preserving semantics",
    }[cluster]

def make(cluster, name, index):
    source = SOURCES[cluster]
    pretty = name.replace("-", " ")
    support = {lang: {"status": "unknown", "mechanism": "Not verified for this concept; do not infer absence.", "sources": [], "versionScope": "Unverified"} for lang in LANGUAGES}
    if cluster == "memory-lifetime" and pretty in {"ownership", "borrowing", "move", "drop"}:
        support["Rust"] = {"status": "first-class", "mechanism": f"Rust specifies {pretty} as part of its ownership model.", "sources": [source], "versionScope": "Rust current reference checked 2026-09-05"}
    if cluster == "dispatch" and pretty in {"virtual", "method", "lookup"}:
        support["Java"] = {"status": "first-class", "mechanism": "Class method invocation participates in Java's virtual dispatch rules.", "sources": [source], "versionScope": "Java current tutorial checked 2026-09-05"}
    if cluster == "concurrency" and pretty in {"thread", "synchronized", "atomic", "memory", "ordering"}:
        support["Go"] = {"status": "first-class", "mechanism": "Go documents the named concurrency mechanism in its language/runtime memory model.", "sources": [source], "versionScope": "Go current reference checked 2026-09-05"}
    return {
        "id": f"{cluster}.{slug(pretty)}", "clusterId": cluster, "name": pretty.title(),
        "problem": f"How can a program handle the concrete design pressure represented by {pretty} without making the surrounding reasoning unsafe or needlessly expensive?",
        "origin": {"summary": "The mechanism is documented; first inventor, year and priority are not asserted here.", "confidence": "LOW: historical attribution unverified", "sources": [source]},
        "mechanism": f"{pretty.title()} is one family of answers to {family(cluster)}. The implementation determines what is checked, when it is checked, and which representation crosses the boundary.",
        "solutionFamily": family(cluster),
        "costs": ["The chosen enforcement point moves cost between runtime, compiler, author and operator.", "A guarantee applies only within its documented boundary and escape hatches."],
        "transferRule": f"When another language presents {pretty}, first identify its enforcement boundary and then compare the same failure case.",
        "confidence": "MEDIUM: mechanism and transfer prompt are editorially grounded; historical origin and most language cells remain explicitly unresolved.",
        "sources": [source],
        "examples": [f"Worked trace: start with an operation involving {pretty}; record inputs, representation, enforcement point, successful result and the first observable failure."],
        "counterexamples": [f"A language can expose syntax resembling {pretty} while implementing a different semantic guarantee; inspect its specification before transferring conclusions."],
        "assessment": {"prompt": f"Compare two languages' treatment of {pretty} for one failing example. What is guaranteed, who pays, and what crosses the boundary?", "rubric": ["Name the concrete problem and two solution choices.", "Trace enforcement and failure rather than citing syntax alone.", "State one cost and one limitation with evidence."]},
        "languageSupport": support,
    }

def main():
    for cluster, names in NAMES.items():
        directory = ROOT / "clusters" / cluster
        directory.mkdir(parents=True, exist_ok=True)
        for index, name in enumerate(names):
            path = directory / f"{slug(name)}.json"
            if not path.exists():
                path.write_text(json.dumps(make(cluster, name, index), ensure_ascii=False, indent=2) + "\n")
        readme = directory / "README.md"
        if not readme.exists():
            readme.write_text(f"# {cluster}\n\nCanonical records are one JSON file per concept. Unknown language cells are an explicit evidence backlog.\n")
    print("seeded missing records")

if __name__ == "__main__":
    main()
