# Tremor Project Strategy & L2 Architecture Active State

## Core Goal & Rules
- **Target**: Direct L2 Interview at LTIMindtree / LTTS.
- **Workflow**: User codes to build physical muscle memory; AI guides, reviews, and teaches deep under-the-hood engine/Dart VM concepts for every file.
- **Mandate**: `~/Desktop/tremor/.agents/TREMOR_LEARNING_CONTRACT.md` and `~/Desktop/tremor/.agents/TREMOR_STRATEGY_AND_MODIFIERS.md` are binding.

## Dart 3 Class Modifiers In-Code Demonstration Plan
1. `abstract interface class`: `lib/features/earthquakes/domain/repositories/earthquake_repository.dart` (Contract)
2. `abstract class`: `lib/core/error/failures.dart` (Shared failure base template)
3. `final class`: `lib/core/security/secure_vault.dart` (Closed token storage)
4. `base class`: `lib/core/network/base_api_client.dart` (Enforced base logic)
5. `sealed class`: `lib/features/earthquakes/presentation/bloc/earthquake_state.dart` (Exhaustive BLoC states)

## Current Status
- Finished: `lib/features/earthquakes/domain/entities/earthquake_entity.dart`
- Next Immediate Files:
  1. `lib/features/earthquakes/domain/repositories/earthquake_repository.dart`
  2. `lib/core/error/failures.dart`
  3. `lib/core/security/secure_vault.dart`
  4. `lib/core/network/base_api_client.dart`
  5. `lib/features/earthquakes/presentation/bloc/earthquake_state.dart`

## Dart 3.13 & Explicit Result Type
- Dart 3.13 Primary Constructor syntax: `abstract class Failure(final String message, [final int? code]);`
- Repository contract explicitly returns: `Future<Result<List<EarthquakeEntity>, Failure>>`
- Sealed `Result<S, F>` in `lib/core/result/result.dart` replaces `dartz`/`fpdart` with modern pattern matching.

---
## Formal Research Document Generated
- Full research catalog created at: `~/Desktop/tremor/docs/latest_syntax.md`
- Covers:
  1. Dart 3.13 Primary Constructors & Declaring Parameters
  2. Concise In-Body Constructors (`const new`)
  3. Exhaustive Class Modifier Matrix (`abstract`, `interface`, `base`, `final`, `sealed`)
  4. Native `Result<S, F>` Pattern Matching vs legacy `dartz`/`Either`
  5. Flutter 3.47 Impeller pre-compilation & standalone design package decoupling (`material_ui`)

---

## MANDATORY REPOSITORY RULE (LOCKED)
Before suggesting or writing ANY Flutter or Dart code:
1. **Consult `docs/latest_syntax.md`** to ensure the syntax matches the cutting-edge standard (Dart 3.13 / Flutter 3.47+).
2. **Explain the Root Cause & Cross-Layer Rationale**:
   - Why the language/framework authors built this syntax.
   - What runtime, memory, or architectural defect it solves.
   - How it models the flow across the layers (Data $\leftrightarrow$ Domain $\leftrightarrow$ Application $\leftrightarrow$ Presentation).

---

## STRICT CUTTING-EDGE SYNTAX RULE (LOCKED)
- Defaulting to pre-Dart-3.13 syntax is forbidden.
- Header primary constructors with terminating semicolons must be used for all simple classes, failures, results, and models.
- Before suggesting any syntax, actively verify against the latest Dart/Flutter specs so that no newer or more concise language feature is missed.

---

## SERENA-FIRST CODE INTELLIGENCE MANDATE (LOCKED)
- Raw grep scans across the codebase are banned when semantic symbol lookup is possible.
- Always prefer Serena semantic tools (`find_symbol`, `get_symbols_overview`, `find_declaration`, `find_implementations`) to minimize token consumption and maximize AST precision.
- Use Serena's project memories for architecture and syntax lookups.
