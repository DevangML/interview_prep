"""Resolves truncated cluster concept stems into canonical Computer Science concepts."""

CANONICAL_CONCEPTS = {
    'abstraction-over-types.ad': {
        'name': 'Ad-hoc Polymorphism (Overloading & Typeclasses)',
        'problem': 'How can a polymorphic function or operator exhibit distinct implementations depending on argument types without unsafe casting or combinatorial explosion?',
        'family': 'reusing behavior across representations'
    },
    'abstraction-over-types.associated': {
        'name': 'Associated Types & Type Families',
        'problem': 'How can an interface/trait bind an output or dependent type to prevent multiple conflicting implementations and combinatorial type parameter explosion?',
        'family': 'reusing behavior across representations'
    },
    'abstraction-over-types.bounded': {
        'name': 'Bounded Quantification & Subtyping Bounds',
        'problem': 'How can generic type parameters be restricted to types satisfying specific interface contracts or subtyping bounds?',
        'family': 'reusing behavior across representations'
    },
    'abstraction-over-types.coherence': {
        'name': 'Typeclass Coherence & Orphan Rules',
        'problem': 'How does the compiler ensure there is at most one unambiguous implementation of a trait/typeclass for any given type?',
        'family': 'reusing behavior across representations'
    },
    'abstraction-over-types.constraints': {
        'name': 'Type Constraints & Concepts',
        'problem': 'How can template or generic parameter requirements be formally constrained with clear compile-time error diagnostics?',
        'family': 'reusing behavior across representations'
    },
    'abstraction-over-types.dependent': {
        'name': 'Dependent Types (Value-Indexed Types)',
        'problem': 'How can types depend on runtime values to verify precise program invariants at compile time?',
        'family': 'reusing behavior across representations'
    },
    'abstraction-over-types.erasure': {
        'name': 'Type Erasure vs. Reification',
        'problem': 'Should type parameters exist at runtime or be erased by the compiler to minimize memory overhead?',
        'family': 'reusing behavior across representations'
    },
    'abstraction-over-types.existential': {
        'name': 'Existential Types & Object Encodings',
        'problem': 'How can heterogeneous types be packaged behind a uniform interface while hiding their concrete representation?',
        'family': 'reusing behavior across representations'
    },
    'abstraction-over-types.generic': {
        'name': 'Parametric Polymorphism (Generics)',
        'problem': 'How can algorithms and data structures be written identically across any type without code duplication or unsafe casting?',
        'family': 'reusing behavior across representations'
    },
    'abstraction-over-types.generics': {
        'name': 'Generic Specialization & Code Monomorphization',
        'problem': 'How does the compiler trade off binary size against execution speed when generating specialized generic code?',
        'family': 'reusing behavior across representations'
    },
    'abstraction-over-types.higher': {
        'name': 'Higher-Kinded Types (Type Constructors)',
        'problem': 'How can abstractions abstract over type constructors (like Functors and Monads) rather than concrete types?',
        'family': 'reusing behavior across representations'
    },
    'abstraction-over-types.hoc': {
        'name': 'Ad-hoc Dispatch & Specialization',
        'problem': 'How does the runtime or compiler select between specialized and general implementations of a function?',
        'family': 'reusing behavior across representations'
    },
    'abstraction-over-types.indices': {
        'name': 'Generalized Algebraic Data Types (GADTs)',
        'problem': 'How can constructor return types refine type arguments to enable type-safe evaluators and state machines?',
        'family': 'reusing behavior across representations'
    },
    'abstraction-over-types.inference': {
        'name': 'Type Inference (Hindley-Milner & Local)',
        'problem': 'How can static type safety be enforced without requiring verbose type annotations on every variable?',
        'family': 'reusing behavior across representations'
    },
    'abstraction-over-types.kinded': {
        'name': 'Kind Systems & Type-Level Operators',
        'problem': 'How does the type checker classify types themselves to ensure valid type application?',
        'family': 'reusing behavior across representations'
    }
}

def resolve_concept(concept_id: str, default_name: str = '', default_problem: str = '') -> dict:
    """Resolves a concept ID into its canonical CS definition and design tension."""
    if concept_id in CANONICAL_CONCEPTS:
        return CANONICAL_CONCEPTS[concept_id]
    
    stem = concept_id.split('.', 1)[1] if '.' in concept_id else concept_id
    fallback_name = default_name or stem.replace('-', ' ').title()
    fallback_problem = default_problem or f'How does a language handle the concrete design pressure represented by {fallback_name.lower()}?'
    
    return {
        'name': fallback_name,
        'problem': fallback_problem,
        'family': 'language semantics and execution constraints'
    }
