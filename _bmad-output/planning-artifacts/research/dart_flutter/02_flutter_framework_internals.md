# Flutter Framework Internals & Rendering Pipeline — Deep Research
### For: Lateral Flutter role, LTIMindtree | Compiled: 2026-09-04

**Current stable Flutter version (verified live, not from memory): 3.47.2**, released 2026-08-27, confirmed against the official release manifest Flutter's own tooling reads (`https://storage.googleapis.com/flutter_infra_release/releases/releases_linux.json`, `current_release.stable` hash matches the 3.47.2 entry). Prior stables in the current line: 3.47.1 (2026-08-19), 3.47.0 (2026-08-12), 3.44.x line before that. [High confidence]

---

## A. The Three Trees

### A.1 What each tree IS

| Tree | Class | What it is | Lifespan |
|---|---|---|---|
| Widget | `Widget` | Immutable **configuration** — a blueprint, not a UI element | Thrown away and rebuilt every `build()` call; cheap to allocate |
| Element | `Element` | The **live instantiation** of a widget at a tree position; glue between config and render tree | **Persists across rebuilds** as long as it can be reconciled — this is the actual "identity" of a UI node |
| RenderObject | `RenderObject` / `RenderBox` | Does the actual **layout, painting, hit-testing** | Persists as long as its owning Element persists |

Widget dartdoc, verbatim: *"A widget is an immutable description of part of a user interface."* Every field on a Widget must be `final`. `createElement()` "inflates this configuration to a concrete instance" — i.e., turns config into a live object. https://api.flutter.dev/flutter/widgets/Widget-class.html

The widget-is-not-the-thing-on-screen point, straight from the architectural overview: the **Element tree is persistent from frame to frame** — this is why Flutter can cache the underlying representation and only rebuild the parts that changed, rather than recreating the whole visual tree every frame. Widgets flow in one direction (parent→new child widgets each build); Elements are what actually get mutated/diffed/reused. https://docs.flutter.dev/resources/architectural-overview

**Why three trees and not two?** Splitting Widget (config) from Element (identity/lifecycle) from RenderObject (geometry/painting) lets Flutter:
- Reuse RenderObjects across rebuilds even though a *new* Widget object is created every build (huge, since RenderObject holds expensive layout/paint state).
- Have `ComponentElement`s (StatelessElement, StatefulElement) that have **no** RenderObject of their own — they just manage composition — versus `RenderObjectElement`s that own exactly one RenderObject. This is literally in the architectural overview's element-tree section: two basic Element kinds, `ComponentElement` (host for other elements) and `RenderObjectElement` (participates in layout/paint). https://docs.flutter.dev/resources/architectural-overview

### A.2 Element lifecycle — verified against `_ElementLifecycle` enum in the actual framework source

Fetched and read directly from `packages/flutter/lib/src/widgets/framework.dart` (stable branch) — **there are 5 states, not the commonly-cited 4**:

```dart
enum _ElementLifecycle {
  initial,   // created but not yet in the tree
  active,    // in the tree via mount() or activate() — "might appear on screen"
  inactive,  // removed via deactivate() — "will not appear on screen"; may be
             // reclaimed by a GlobalKey before the frame ends, else...
  failed,    // hit an unrecoverable error while active/being incorporated;
             // terminal, non-reversible — usually means the widget impl threw
  defunct,   // ...unmount() was called; permanently out of the tree
}
```
Source: `flutter/packages/flutter/lib/src/widgets/framework.dart` (fetched live, stable branch). The `failed` state is a genuinely non-obvious addition most tutorials never mention — it exists specifically so an exception thrown mid-build doesn't leave the tree in an inconsistent, re-incorporable state.

Key methods, quoted from the source:
- **`mount(parent, newSlot)`**: *"Add the newly created element to the tree at a given slot in a given parent... This method transitions the element from the 'initial' lifecycle state to the 'active' lifecycle state."* It sets `_depth = 1 + parent.depth`, registers `GlobalKey`s with the owner, and calls `_updateInheritance()`.
- **`activate()` / `deactivate()`**: move an element between `inactive` and `active`, detaching/reattaching its RenderObject from the render tree.
- **`unmount()`**: finalizes transition to `defunct`. Per the enum doc: *"The state transition occurs in `BuildOwner.finalizeTree` which signals the end of the build phase."* — i.e., inactive elements get one full frame's grace period (for `GlobalKey` reparenting) before being torn down.

### A.3 `Element.updateChild()` and `Widget.canUpdate()` — the exact reconciliation rule

`Widget.canUpdate` dartdoc, verbatim: *"An element that uses a given widget as its configuration can be updated to use another widget as its configuration if, and only if, the two widgets have `runtimeType` and `key` properties that are `operator==`."* https://api.flutter.dev/flutter/widgets/Widget-class.html

This is the single rule interviewers actually want: **same runtimeType + same key ⇒ Element.update() is called (state preserved, RenderObject reused); otherwise the old Element is deactivated and a brand-new one is inflated (state lost).**

`updateChild()` source (verified from `framework.dart`, `Element.updateChild`, line ~3995):
- `newWidget == null` → deactivate the old child, return null (widget was removed from the tree).
- `child != null && child.widget == newWidget` (identical widget instance — this is exactly the `const` fast path) → **no rebuild at all**, just possibly reslot.
- `child != null && Widget.canUpdate(child.widget, newWidget)` → `child.update(newWidget)` is called: **same Element, same RenderObject, only the config swapped.**
- Otherwise → `deactivateChild(child)`, then `inflateWidget()` creates a brand new Element from scratch.

There's a subtlety in the live source worth knowing: a `hasSameSuperclass` guard exists specifically to handle **hot reload** flipping a widget between `StatefulWidget` and `StatelessWidget` — without it the tree could end up with a `StatefulElement` pointing at a `StatelessWidget` and crash with a type error. This kind of defensive code shows the reconciliation logic isn't just "compare two fields," it's hardened against live-coding edge cases too. Source: `framework.dart` lines 4003–4020.

### A.4 `updateChildren()` — the multi-pass keyed-list diff algorithm (from source, not paraphrased)

This is the algorithm behind every `Column`/`Row`/`ListView` children diff. Quoted verbatim from `framework.dart`:

```
// The general approach is to sync the entire new list backwards, as follows:
// 1. Walk the lists from the top, syncing nodes, until you no longer have
//    matching nodes.
// 2. Walk the lists from the bottom, without syncing nodes, until you no
//    longer have matching nodes. We'll sync these nodes at the end. We
//    don't sync them now because we want to sync all the nodes in order
//    from beginning to end.
// At this point we narrowed the old and new lists to the point
// where the nodes no longer match.
// 3. Walk the narrowed part of the old list to get the list of
//    keys and sync null with non-keyed items.
// 4. Walk the narrowed part of the new list forwards:
//     * Sync non-keyed items with null
//     * Sync keyed items with the source if it exists, else with null.
// 5. Walk the bottom of the list again, syncing the nodes.
// 6. Sync null with any items in the list of keys that are still
//    mounted.
```

Concretely, step 3 builds `Map<Key, Element> oldKeyedChildren` from whatever's left in the "middle" after the top/bottom fast-paths are exhausted — **non-keyed leftover children are deactivated immediately** (they can never be matched by position once the list has actually changed shape), while keyed ones go into the map to be looked up by the new list's keys in step 4. Anything left unclaimed in `oldKeyedChildren` after the whole pass is deactivated at the end (step 6). This is exactly why a keyed reorder (e.g. drag-to-reorder a list) reuses Elements/State/RenderObjects for moved items, while an unkeyed reorder of stateful children **reuses positions, not identities** — item 3's widget config lands on item 1's Element, silently carrying over the wrong State. Source: `flutter/packages/flutter/lib/src/widgets/framework.dart`, `updateChildren()`.

### A.5 Keys — when required, and the classic bugs

- **`ValueKey<T>`**: identity = a value (e.g. an id). Use when children map 1:1 to stable domain values.
- **`ObjectKey`**: identity = object identity (`==`) of an arbitrary object, for objects without a natural value key.
- **`UniqueKey`**: identity = itself, always different — forces a fresh Element every time it's used as a widget's key (e.g. to force full state reset).
- **`GlobalKey`**: identity **unique across the whole app**, not just among siblings — enables cross-subtree lookups and reparenting.

**When a key is required**: any time a parent has a **list of children of the same type that can be reordered, inserted in the middle, or removed from the middle**, and those children carry state (either `State` or `RenderObject`-level state like `AnimationController`, scroll position, `TextEditingController`, `Draggable` state). Without a key, `updateChildren`'s positional top/middle/bottom matching means Flutter matches purely on **runtimeType + position**, so reordering `[TileA(key: none), TileB(key: none)]` to `[TileB, TileA]` doesn't move any Elements at all — it keeps the same two Elements in the same two slots and just feeds them each other's new widget config. If `TileA`/`TileB` are `StatefulWidget`s, their **State objects don't move with the visual content** — this is the single most common "why did my list item's state get mixed up when I reordered/filtered/deleted" interview trap.

**GlobalKey cost**, quoted from dartdoc: *"Reparenting an Element using a global key is relatively expensive, as this operation will trigger a call to `State.deactivate` on the associated State and all of its descendants; then force all widgets that depend on an InheritedWidget to rebuild."* And the critical footgun: *"[Global keys] should not be re-created on every build ... [doing so] will throw away the state of the subtree associated with the old key and create a new fresh subtree for the new key."* i.e., a `GlobalKey()` constructed inline inside `build()` defeats its own purpose. https://api.flutter.dev/flutter/widgets/GlobalKey-class.html

GlobalKey's superpower is exactly the reparenting behavior: because the Element (and its State/RenderObject) is tracked by the `BuildOwner`'s global key registry rather than by tree position, moving a `GlobalKey`-keyed widget to a completely different parent **in the same frame** it was removed from its old parent reuses the same Element/State — this is how things like `Draggable`/drag targets across route boundaries can preserve identity.

### A.6 StatefulWidget / State lifecycle — full sequence, verified against dartdoc

1. `createState()` — framework calls `StatefulWidget.createState()`.
2. `initState()` — one-time init that may depend on `BuildContext` or `widget`. **You cannot call `dependOnInheritedWidgetOfExactType` reliably here** for values that may change later — see below.
3. `didChangeDependencies()` — called immediately after `initState`, and again **any time an `InheritedWidget` this State depends on (via `dependOnInheritedWidgetOfExactType`) notifies of a change** (`updateShouldNotify` returned true).
4. `build()` — called "any number of times."
5. `didUpdateWidget(oldWidget)` — called when **the parent rebuilds and supplies a new widget instance with the same runtimeType+key** (i.e., `Element.update()` fired instead of a fresh inflate). Compare `oldWidget` against `widget` to react to config changes (e.g. restart an animation whose duration changed).
6. `deactivate()` — element removed from tree (may come back this frame via GlobalKey).
7. `dispose()` — element permanently removed; final cleanup (cancel timers, dispose controllers).

**The precise trigger distinction** (this is the exact interview question): `didChangeDependencies` fires because of **InheritedWidget notification propagation** — something *above* you in the tree that you subscribed to changed, and your own widget config may not have changed at all. `didUpdateWidget` fires because **your own parent rebuilt and handed you a new (but reconcilable) widget instance** — your config changed, independent of any InheritedWidget. A `Theme` color change triggers `didChangeDependencies` on every `Theme.of(context)`-dependent descendant; a parent passing a new `duration:` prop to your widget triggers `didUpdateWidget`. https://api.flutter.dev/flutter/widgets/State-class.html

### A.7 `setState` — what it actually does, and why

Straight from the source doc comment (`framework.dart`, `State.setState`) — a genuinely interesting design-history note: *"The original version of this API was a method called `markNeedsBuild`... However, early user testing... revealed that people would call `markNeedsBuild()` much more often than necessary... Naturally, this led to performance issues... In practice, the `setState` method's implementation is trivial: it calls the provided callback synchronously, then calls `Element.markNeedsBuild`."*

So mechanically: `setState(fn)` = call `fn()` synchronously (mutate your fields) → call `markNeedsBuild()` on the associated `StatefulElement` → that Element is added to the `BuildOwner`'s dirty list → it gets rebuilt on the next `buildScope` pass.

**Why it rebuilds the whole subtree from that element down**: `setState` only marks *that Element* dirty. When it rebuilds, its `build()` method runs and returns a **new widget subtree**; `updateChild`/`updateChildren` then walks down from there, and every descendant Element gets `canUpdate`-checked against its corresponding new widget — Elements whose widgets are `==` (i.e. `const` or otherwise unchanged instances) are skipped almost for free, but everything else re-executes build. So it's not that setState *forces* a full subtree rebuild — it forces a full subtree **diff walk**, and the const/`canUpdate` short-circuit is what keeps that walk cheap.

**Why calling it after dispose throws**: The `State`'s `_debugLifecycleState` is `defunct` post-`dispose()`; the assert throws `FlutterError('setState() called after dispose(): $this')` with the explanation: *"This error happens if you call setState() on a State object for a widget that no longer appears in the widget tree... This error can occur when code calls setState() from a timer, from an animation callback, or after an asynchronous operation... completes after the widget has been removed from the tree."* Source: `framework.dart`, `State.setState`.

---

## B. Build/Layout/Paint Machinery

### B.1 BuildOwner, dirty elements, `buildScope`, depth sorting

`BuildOwner.scheduleBuildFor(element)`: *"Adds an element to the dirty elements list so that it will be rebuilt when WidgetsBinding.drawFrame calls buildScope."* https://api.flutter.dev/flutter/widgets/BuildOwner-class.html

`buildScope(context, [callback])`: *"Establishes a scope for updating the widget tree, and calls the given callback, if any. Then, builds all the elements that were marked as dirty using scheduleBuildFor, **in depth order**."*

Verified straight from source (`framework.dart`, `Element._sort`): dirty elements are sorted by `a.depth - b.depth` — shallower elements (closer to root) sort first. This is **why rebuilds are top-down**: if you sort by depth and rebuild shallow-first, a parent's rebuild happens before its children's, so (a) if the parent's rebuild removes/replaces a child, that child is never wastefully rebuilt at all, and (b) any *new* dirty elements introduced by the parent's rebuild (i.e., its previously non-existent children just got mounted and marked dirty) get correctly appended and re-sorted — the framework tracks `_dirtyElementsNeedsResorting` for exactly this case, per the live `BuildScope` class source.

**`BuildScope`** (also confirmed live in source — a class most tutorials don't even mention) is a relatively recent addition that lets independent build "scopes" exist so that, e.g., a nested `Overlay`/`LocalHistoryEntry` or an internal rebuild triggered inside a layout callback doesn't get tangled with the outer frame's dirty-element bookkeeping. It owns its own `_dirtyElements` list and `scheduleRebuild` callback.

### B.2 BuildContext IS the Element

Verbatim, from source: *"[BuildContext] objects are actually [Element] objects. The [BuildContext] interface is used to discourage direct manipulation of [Element] objects."* https://api.flutter.dev/flutter/widgets/Widget-class.html (via framework.dart docs)

Implication: every `Theme.of(context)`, `MediaQuery.of(context)`, `Navigator.of(context)` call is literally a method invoked **on the Element itself** (through the narrower `BuildContext` interface) — this is exactly why those lookups can walk `_inheritedElements` (below) without any separate registry, and why a `context` captured before `dispose()` and used after is unsafe (the Element is defunct).

### B.3 InheritedWidget lookup — the actual O(1) mechanism (from source, not folklore)

This is one of the most commonly *mis-explained* pieces of Flutter internals — most blog posts vaguely say "Flutter caches it" without saying how. Read straight from `framework.dart`:

```dart
PersistentHashMap<Type, InheritedElement>? _inheritedElements;
```

Every `Element` carries a `PersistentHashMap<Type, InheritedElement>` — a **persistent (structurally-shared, immutable) hash map keyed by `Type`**. On `mount()`/`activate()`, `_updateInheritance()` runs:

```dart
void _updateInheritance() {
  _inheritedElements = _parent?._inheritedElements;   // most elements: just copy the pointer
}
```

`InheritedElement` overrides this:
```dart
void _updateInheritance() {
  final incomingWidgets = _parent?._inheritedElements ?? PersistentHashMap.empty();
  _inheritedElements = incomingWidgets.put(widget.runtimeType, this);  // adds itself
}
```

So as the tree is built top-down, each Element just **inherits its parent's map reference** (O(1), no copy) unless it *is* an `InheritedElement`, in which case it produces a new persistent map with itself added under its own `runtimeType`. `dependOnInheritedWidgetOfExactType<T>()` is then literally `_inheritedElements?[T]` — a **single hash-map lookup by Type, not a walk up the tree**. This is the real answer to "why is `of(context)` not O(depth)": it's O(1) amortized because the map is shared/persistent, not because Flutter does anything clever at call time — the cost of building the map was already paid, incrementally, at mount time by every InheritedWidget ancestor. Source: `flutter/packages/flutter/lib/src/widgets/framework.dart`, `_inheritedElements`, `InheritedElement._updateInheritance`, `Element.dependOnInheritedWidgetOfExactType`.

Dependency tracking is separate: calling `dependOnInheritedWidgetOfExactType` also calls `dependOnInheritedElement(ancestor)`, which adds `this` to the *element's own* `_dependencies` set **and** registers `this` in the `InheritedElement`'s own `_dependents` map (`Map<Element, Object?>`). When the InheritedWidget updates and `updateShouldNotify(oldWidget)` returns true, the `InheritedElement` walks its `_dependents` and calls `markNeedsBuild()` on each — this is the actual notify-fan-out, and it's O(number of dependents), not O(tree size).

`updateShouldNotify`, canonical usage from dartdoc: `bool updateShouldNotify(FrogColor oldWidget) => color != oldWidget.color;` — this method decides whether the *fact that the widget instance changed* should also mean *dependents must rebuild*; you can have a new InheritedWidget instance with equal semantic value and choose not to notify. https://api.flutter.dev/flutter/widgets/InheritedWidget-class.html

- **`InheritedModel<T>`**: adds "aspect"-based selective notification — dependents register interest in a specific `aspect` value, and `updateShouldNotifyDependent` decides per-dependent whether *that aspect* changed, so unrelated dependents skip rebuilding even though the model updated. Useful for something like a big shared form model where only one field's watchers should rebuild.
- **`InheritedNotifier<T extends Listenable>`**: wraps a `ChangeNotifier`/`ValueNotifier` and automatically notifies dependents whenever the notifier fires (or its identity changes) — avoids hand-rolling `updateShouldNotify` for the common "wrap a ChangeNotifier" pattern.

**"Context above the provider" error**: dartdoc is explicit — *"the `context` used must be a descendant of the InheritedWidget"* — because the lookup walks `_inheritedElements`, which is only populated with ancestors **at or above** the context's position; a context obtained from a widget that is a *sibling* of, or *above*, the `Provider`/`InheritedWidget` was never in that widget's `_inheritedElements` map (it inherited its own parent's map, before the InheritedWidget existed), so the lookup returns `null` (or throws for the non-nullable `of`). This is why `Provider.of<T>(context)` called in the same `build()` method that creates the `Provider` fails — that `context` belongs to the Element *above* the Provider, not below it. Classic fix: wrap the consumer in a `Builder` so it gets a context from *inside* the subtree.

### B.4 PipelineOwner — flush phases

Four sequential phases, quoted from dartdoc (https://api.flutter.dev/flutter/rendering/PipelineOwner-class.html):

1. **`flushLayout`** — *"updates any render objects that need to compute their layout. During this phase, the size and position of each render object is calculated."*
2. **`flushCompositingBits`** — *"updates any render objects that have dirty compositing bits. During this phase, each render object learns whether any of its children require compositing."* — this determines how visual effects like clipping are implemented at paint time (does this subtree need its own Layer, or can it just paint into the parent's).
3. **`flushPaint`** — *"visits any render objects that need to paint. During this phase, render objects get a chance to record painting commands into `PictureLayer` and construct other composited `Layer`."*
4. **`flushSemantics`** — *"will compile the semantics for the render objects. This semantic information is used by assistive technology."*

Two dirty lists drive this: `nodesNeedingLayout` (RenderObjects that are **relayout boundaries** needing layout — see B.5) and `nodesNeedingPaint`.

### B.5 The constraints model — verified from live `rendering/box.dart` and `rendering/object.dart` source

**The rule** (flutter.dev's own words): *"Constraints go down. Sizes go up. Parent sets position."* https://docs.flutter.dev/ui/layout/constraints

**BoxConstraints** terminology, from dartdoc:
- **Tight**: min == max on an axis — child's size on that axis is fixed, no choice.
- **Loose**: min == 0 on an axis — child can be anywhere from 0 up to max.
- **Bounded**: max is finite.
- **Unbounded**: max is infinite (`double.infinity`).
- ("Expanding": both min and max are infinite — an even more extreme case.)

**`performLayout()`** (RenderBox dartdoc): *"The `performLayout` function is where render boxes decide, if they are not `sizedByParent`, what `size` they should be, and also where they decide where their children should be."* After layout, the parent sets each child's position via `BoxParentData.offset` — **the child never knows or decides its own position**, only its size.

**`sizedByParent` / `performResize()`**: if a RenderBox's size depends *only* on incoming constraints (not on children's content), it overrides `sizedByParent => true` and computes size in `performResize()` (or, in modern Flutter, `computeDryLayout`) using nothing but constraints — this is an optimization: the object's size can be known without laying out children at all, which matters for relayout-boundary computation below.

**`parentUsesSize`**: when a parent calls `child.layout(constraints, parentUsesSize: true)`, it's declaring "I will read `child.size` after this call and my own layout depends on it." This has a direct consequence for relayout boundaries.

**Relayout boundaries** — read directly from `rendering/object.dart` source comment on `_isRelayoutBoundary`:
> *"A relayout boundary is a RenderObject whose parent does not rely on the child RenderObject's size in its own layout algorithm. In other words, if a RenderObject's `performLayout` implementation does not ask the child for its size at all, **the child** is a relayout boundary... Relayout boundaries enable an important layout optimization: the parent not depending on the size of a child means the child changing size does not affect the layout of the parent. When a relayout boundary is marked as needing layout, its parent does not have to be marked as dirty."*

This is the real mechanism behind "layout is cheap, most of the time": `markNeedsLayout()` on a RenderObject either (a) stops at that object if it's a relayout boundary (only it, not its ancestors, gets re-laid-out), or (b) propagates up via `markParentNeedsLayout()` if the parent actually reads this child's size (`parentUsesSize: true` was used, or a tight/`sizedByParent` boundary doesn't apply). A RenderObject is automatically a relayout boundary when: it has tight constraints from its parent, `sizedByParent` is true, or the parent didn't request `parentUsesSize`.

**Why unbounded constraints cause the classic errors**: fetched from `docs.flutter.dev/ui/layout/constraints` directly: putting `Container(width: double.infinity)` inside an `UnconstrainedBox` throws `BoxConstraints forces an infinite width` — *"Flutter can't render infinite sizes, so it throws an error."* The far more common real-world version of this trap: **`ListView` (or any scrollable/`Column` that wants to size itself to its children) placed inside a `Column`**, because `Column` itself hands its children *unbounded* height (a `Column`'s own height, absent other constraints, is determined by summing children — it doesn't impose a max) — a `ListView`'s underlying `Viewport`/`Sliver` machinery needs a *bounded* main-axis extent to know how much to lay out and paint, so it throws `RenderBox was not laid out` / *"Vertical viewport was given unbounded height."* The three fixes, in order of correctness: wrap the `ListView` in `Expanded` (bounded, and correct viewport recycling); use `shrinkWrap: true` (works, but **silently disables the lazy/virtualized behavior — every item is built and measured up front**, so it "fixes" the error while quietly reintroducing the exact performance problem `ListView.builder` exists to prevent, on long lists); or give it a fixed `SizedBox` height.

### B.6 Intrinsic sizes — from live source, exact complexity claim

Quoted verbatim, `rendering/box.dart`, `getMinIntrinsicWidth` (and identically for the other three: `getMaxIntrinsicWidth`, `getMinIntrinsicHeight`, `getMaxIntrinsicHeight`):
> *"This function should only be called on one's children. Calling this function couples the child with the parent so that when the child's layout changes, the parent is notified (via `markNeedsLayout`). **Calling this function is expensive as it can result in O(N^2) behavior.**"*

Why O(N²): computing an intrinsic width/height for a node in general requires querying every descendant's intrinsic dimensions, and if a *parent* also asks *its* parent's intrinsic dimensions (which asks the child again), each layer of nesting queries the whole subtree below it again — for a tree of depth/width N doing this at every level, work compounds quadratically. This is why intrinsics are documented as a deliberately narrow escape hatch ("if this algorithm depends on the intrinsic dimensions of a child...") rather than the default layout path — prefer `LayoutBuilder`, or restructure so a parent doesn't need to know a child's "natural" size before laying it out. `IntrinsicWidth`/`IntrinsicHeight` widgets exist and are convenient, but the docs' warning is exactly why performance guides tell you to avoid them in hot paths (long lists, frequently-rebuilt trees).

### B.7 The Sliver protocol

Slivers exist because the box protocol (`BoxConstraints` in, `Size` out) has **no concept of scroll position** — a box doesn't know "I am partially scrolled off the top." Slivers solve this with a parallel protocol:

- **`SliverConstraints`** (input, analogous to `BoxConstraints`): carries `scrollOffset` and `remainingPaintExtent` among other fields — i.e., "here's how far you've already been scrolled past, and here's how much room is left in the viewport."
- **`SliverGeometry`** (output, analogous to `Size`): reports `paintExtent` (how much of this sliver is actually visible/painted) and `layoutExtent` (how much space it consumes for the *next* sliver's positioning) — a 100px-tall sliver reports `paintExtent = 100` at `scrollOffset = 0`, `paintExtent = 25` at `scrollOffset = 75`, and `paintExtent = 0` once fully scrolled past. https://api.flutter.dev/flutter/rendering/RenderSliver-class.html

**`CustomScrollView`** is the composition mechanism: a `RenderViewport` holds a list of sliver children (`SliverAppBar`, `SliverList`, `SliverGrid`, `SliverToBoxAdapter` to drop a normal box widget into a sliver list, etc.) and lays each one out in sequence, each consuming and reporting how it "covers" the remaining scroll-space — literally, per the source: *"A RenderViewport has a list of child slivers. Each sliver ... is laid out in turn, covering the viewport in the process."*

### B.8 Painting — layers, RepaintBoundary, compositing

`paint(PaintingContext context, Offset offset)` on a RenderObject records drawing commands. `PaintingContext` wraps a `Canvas` and is also responsible for **starting new Layers** when needed (e.g. `context.pushClipRect()`, `context.pushOpacity()`, `context.pushTransform()` each potentially push a new composited layer rather than just drawing into the current picture).

**The Layer tree**: *"the render tree generates a tree of composited layers that are uploaded into the engine and displayed by the compositor."* Layer types: `PictureLayer` (raw vector drawing commands, a `ui.Picture`), `ContainerLayer` (can hold child layers — the composition backbone), `OffsetLayer` (positions a subtree), plus `TextureLayer`/`PlatformViewLayer` for external content (native views, video textures). *"Most layers can have their properties mutated, and layers can be moved to different parents"* — this mutability is what lets a layer be **retained across frames** and just repositioned/repainted-into rather than rebuilt, which is the entire performance point of the layer tree existing as a separate structure from the render tree. https://api.flutter.dev/flutter/rendering/Layer-class.html

**`isRepaintBoundary` / `RepaintBoundary`**: default `false`; when `true`, the RenderObject gets its **own persistent `OffsetLayer`**, decoupling it from its parent's repaints. Dartdoc: *"The framework invokes `RenderObject.updateCompositedLayer` to create an OffsetLayer"*; if you flip this flag at runtime you must call `markNeedsCompositingBitsUpdate()`. The propagation rule for repaint requests: *"the nearest ancestor RenderObject with `isRepaintBoundary`... is requested to repaint"* and *that* ancestor's paint pass *"causes all of its descendant RenderObjects to repaint in the same layer."* https://api.flutter.dev/flutter/rendering/RenderObject/isRepaintBoundary.html — i.e., **repainting is not per-object, it's per-repaint-boundary-subtree**; a RepaintBoundary is what turns "one animating pixel forces a full-screen repaint" into "only this subtree's PictureLayer gets re-recorded."

**When a new layer is created**: when `isRepaintBoundary` is true on an object, or when a paint operation needs isolation (opacity blending, a clip, a transform that the engine wants to composite separately, a `saveLayer`). Compositing bits (`flushCompositingBits`, B.4) is the pass that decides, top-down, whether *any* descendant in a subtree needs its own layer, which in turn tells an ancestor render object whether it must set up a `ContainerLayer` to hold that descendant's layer rather than drawing everything into one shared `PictureLayer`.

**`CustomPainter.shouldRepaint`**: dartdoc — called *"whenever a new instance of the custom painter delegate class is provided ... or any time that a new CustomPaint object is created with a new instance."* Compare relevant fields between old/new delegate; return `false` to skip repainting if nothing that affects the picture changed. https://api.flutter.dev/flutter/rendering/CustomPainter-class.html

**`saveLayer` cost**: explicit dartdoc warning — *"Creating new layers is relatively expensive, however, and should be done sparingly to avoid introducing jank."* Also worth knowing: a `CustomPainter`'s canvas "may be the same as that used by other widgets," so blend-mode assumptions can leak across unrelated widgets sharing a picture — another reason gratuitous `saveLayer`/`Opacity` usage is expensive and sometimes semantically surprising.

---

## C. The Frame Pipeline and the Engine

### C.1 End-to-end frame, verified against `SchedulerBinding`/`SchedulerPhase` dartdoc

**`SchedulerPhase` enum** (exact values and descriptions, quoted from dartdoc, https://api.flutter.dev/flutter/scheduler/SchedulerPhase.html):

| Phase | What's legal / happening |
|---|---|
| `idle` | *"No frame is being processed."* Tasks and microtasks may run. |
| `transientCallbacks` | *"The transient callbacks (scheduled by `SchedulerBinding.scheduleFrameCallback`) are currently executing. Typically, these callbacks handle updating objects to new animation states."* |
| `midFrameMicrotasks` | *"Microtasks scheduled during the processing of transient callbacks are currently executing."* — e.g. a Future that resolved during a Ticker callback. |
| `persistentCallbacks` | *"The persistent callbacks (scheduled by `SchedulerBinding.addPersistentFrameCallback`) are currently executing. Typically, this is the build/layout/paint pipeline."* |
| `postFrameCallbacks` | *"The post-frame callbacks (scheduled by `SchedulerBinding.addPostFrameCallback`) are currently executing. Typically, these callbacks handle cleanup and scheduling of work for the next frame."* |

**Frame sequence, from `handleBeginFrame` dartdoc**: *"This function calls all the transient frame callbacks registered by `scheduleFrameCallback`. It then returns, any scheduled microtasks are run..., and `handleDrawFrame` is called to continue the frame."* So the exact order is:

```
vsync signal
  → SchedulerBinding.handleBeginFrame()
      → phase = transientCallbacks
      → run all Ticker/AnimationController callbacks (advance animation values)
      → phase = midFrameMicrotasks
      → drain microtasks queued by those callbacks
  → SchedulerBinding.handleDrawFrame()
      → phase = persistentCallbacks
      → WidgetsBinding.drawFrame(): BuildOwner.buildScope() [build]
                                   → PipelineOwner.flushLayout()
                                   → PipelineOwner.flushCompositingBits()
                                   → PipelineOwner.flushPaint()
                                   → (RenderView.compositeFrame → SceneBuilder → Scene)
                                   → PipelineOwner.flushSemantics() [if enabled]
      → phase = postFrameCallbacks
      → cleanup / schedule next frame's work if needed
  → phase = idle
→ Scene handed to the engine → raster thread
```
(Persistent-callback ordering per the architectural overview & PipelineOwner docs, cross-checked; `addPostFrameCallback` ordering per `SchedulerPhase` dartdoc.) https://api.flutter.dev/flutter/scheduler/SchedulerBinding/handleBeginFrame.html, https://api.flutter.dev/flutter/scheduler/SchedulerPhase.html

**What's legal in each phase, practically**: calling `setState` during `persistentCallbacks` (i.e., inside your own `build()`) on *the same element* is an error ("setState called during build"); scheduling a *new* frame from inside a post-frame callback is fine and is exactly the documented use for `addPostFrameCallback` (e.g., scroll-to-position logic that needs layout to have already happened once).

### C.2 UI thread vs raster thread vs platform thread vs IO thread

Straight from `docs.flutter.dev/perf/ui-performance` (fetched live):

| Thread | Runs | Notes |
|---|---|---|
| **UI thread** | All Dart code — your app code **and** the Flutter framework itself (build/layout/paint object graph management, produces the **layer tree**) | If this is slow, "the Dart code is too expensive" |
| **Raster thread** (labeled "GPU" in the old performance overlay) | Engine C++ code that walks the layer tree and talks to the GPU via Skia/Impeller | Despite the name, it runs on the **CPU**, issuing GPU commands; if slow, "the scene is too complicated to render quickly" |
| **Platform thread** | Native platform code, plugin callbacks, the OS's own main/UI thread (UIKit main thread on iOS, Android's main thread) | Not shown in the classic performance overlay |
| **IO thread** | Expensive I/O that would otherwise block UI/raster — **image decoding and GPU texture upload** is the flagship example: bytes are decoded off the UI thread on the IO thread, then handed to the GPU, and the resulting texture handle is passed back | Not shown in the classic performance overlay |

Diagnosing jank: *"If a red bar appears in the UI graph, the Dart code is too expensive. If a red vertical bar appears in the GPU [raster] graph, the scene is too complicated to render quickly."* — check UI thread first if both are red; if only raster is red, look for `saveLayer`/opacity/clip/shadow overuse. https://docs.flutter.dev/perf/ui-performance

**The Great Thread Merge — a genuinely recent, high-signal architectural change** [High confidence, directly verified against `docs.flutter.dev` breaking-changes page]:
- iOS & Android: UI and platform threads **merged by default starting Flutter 3.29**.
- macOS & Windows: merged by default starting **Flutter 3.35** (landed earlier, in `3.33.0-0.0.pre`).
- The stated rationale, verbatim: *"The split-thread design prevented Flutter apps and plugins from using Dart FFI to interoperate with native APIs that require execution on the platform thread. By merging the threads, developers can more easily call native APIs without thread synchronization complexities."*
- Migration guidance, verbatim: *"Merged threads should not affect your app."*
- The ability to opt back out of merged threads is slated for future removal (tracked in flutter/flutter#150525).

https://docs.flutter.dev/release/breaking-changes/macos-windows-merged-threads — this is worth naming explicitly in an interview: a candidate who only knows "UI thread and raster thread, and platform thread is separate" is reciting a **pre-3.29 mental model**; the current architecture runs Dart on the platform thread directly on mobile.

### C.3 Ticker, TickerProvider, AnimationController, vsync

`AnimationController` needs a `TickerProvider` (the `vsync:` constructor argument), which it uses to create a `Ticker` that steps the animation forward on every frame. Verbatim: *"An AnimationController needs a TickerProvider, which is configured using the `vsync` argument on the constructor. The constructor uses the TickerProvider to create a Ticker, which the AnimationController uses to step through the animation it controls."* https://api.flutter.dev/flutter/animation/AnimationController-class.html

**Why `vsync` prevents offscreen animation burn**: when the `TickerProvider` is a `State` using `SingleTickerProviderStateMixin`/`TickerProviderStateMixin`, and that State's subtree becomes invisible under a `TickerMode` (e.g. an off-screen tab in a `TabBarView`, or a route below the current one), *"its updates will be silenced ... time will still elapse, and methods like forward and stop can still be called and will change the value, but the controller will not generate new values on its own."* — the Ticker literally stops requesting new animation frames from the engine for that subtree, so an animation running on a screen you've navigated away from doesn't keep consuming CPU/battery producing frames nobody sees.

- **`SingleTickerProviderStateMixin`**: for a State managing exactly one `AnimationController` — cheaper, asserts if you try to create a second ticker.
- **`TickerProviderStateMixin`**: for multiple concurrent `AnimationController`s in the same State.

**Implicit vs explicit animations**: implicit (`AnimatedContainer`, `AnimatedOpacity`, `AnimatedPadding`, etc.) manage their own internal `AnimationController` — you just change the target value and it tweens automatically; explicit (raw `AnimationController` + `Tween` + `AnimatedBuilder`/`AnimatedWidget`) gives you direct control (start/stop/reverse/curve/status listeners) at the cost of managing lifecycle yourself (create in `initState`, dispose in `dispose`).

**`AnimatedBuilder` vs `AnimatedWidget`**: `AnimatedWidget` is a base class you subclass, overriding `build()` to read `listenable.value`; it rebuilds *that whole widget* on every tick. `AnimatedBuilder` is a composition helper that takes a `builder` callback plus an optional `child` — the `child` subtree, if it doesn't depend on the animation, is built **once** and passed through unchanged on every tick (it's not part of the rebuilt closure), which is the standard trick for animating one small part of an expensive subtree without rebuilding the rest.

**Hero**: cross-route shared-element transitions. On `Navigator.push`/`pop`, matching `Hero` widgets (matched by `tag`) on the old and new route are lifted into the Navigator's `Overlay` and animated between their two positions/sizes during the route transition; both original heroes are hidden while the flight is in progress. https://api.flutter.dev/flutter/widgets/Hero-class.html

### C.4 Skia vs Impeller — current status (verified live, do not answer this from memory)

| Platform | Renderer as of Flutter 3.47 | Notes |
|---|---|---|
| iOS | **Impeller only** | No Skia fallback exists anymore on iOS. |
| Android | **Impeller default** (API 29+, Vulkan-capable) | Falls back to legacy OpenGL/Skia path on older API levels or devices without Vulkan. |
| macOS | **Impeller default** since 3.47 | |
| Linux | **Impeller default** since 3.47 | |
| Windows | **Impeller default** since 3.47 | |
| Web | **Skia** (via CanvasKit/WASM) | Impeller has not shipped for web as of this writing; may come later. |

Source: https://docs.flutter.dev/perf/impeller (fetched live, 2026-09-04).

**The problem Impeller was built to solve — shader compilation jank**: with Skia, the first time the GPU driver encountered a *new combination* of visual effects (a specific blur + blend mode + shadow, say) it had to **compile a shader for that combination at that moment**, which can take 100–200ms — an order of magnitude past a 16ms (60fps) or 8ms (120fps) frame budget, causing a visible stutter the very first time an animation/effect appears (classically: the first frame of a page transition, or the first time a particular button's ripple shows up). Impeller's fix is architectural, not incremental: it **precompiles a small, fixed set of shaders at Flutter engine build time** rather than composing/compiling new shader programs from Dart-level Skia calls at runtime. Verbatim: *"Impeller precompiles a smaller, simpler set of shaders at engine-build time so they don't compile at runtime."* (flutter/flutter#77412, cited from docs.flutter.dev/perf/impeller). This is genuinely one of Flutter's most significant architecture changes in its history and is very likely to come up as "what's new/different in modern Flutter" — a candidate should be able to say *why* it's an engine/build-time change and not just "Impeller is faster."

**Current opt-out status** [Medium confidence — actively in flux]: `flutter run --no-enable-impeller` and the platform-manifest equivalents (`io.flutter.embedding.android.EnableImpeller`, Info.plist keys) still exist as of 3.47 but emit a deprecation warning (`shell.cc: "Impeller opt-out deprecated"`) — multiple GitHub issues from late 2025/early 2026 confirm the warning is live and the opt-out is planned for removal in "a future release," but as of the current stable it has **not yet** been removed. Don't state a specific removal version in an interview without checking again close to that date.

### C.5 Embedder architecture, dart:ui, engine boundary

Flutter's architecture, per the official architectural overview (fetched live, https://docs.flutter.dev/resources/architectural-overview):

- **Embedder (platform) layer**: platform-specific glue code (Java/Kotlin+C++ on Android, Swift/ObjC++ on iOS, C++ on Windows/Linux/macOS) that provides the app entrypoint, initializes the engine, obtains the UI/raster threads from the OS, sets up a rendering surface/texture for Flutter to draw into, and forwards input events, lifecycle events, and window/size changes into the engine.
- **Engine layer (C++)**: the core runtime — rasterizes composited scenes (via Skia/Impeller), does text layout, low-level file/network I/O, and hosts the **Dart runtime** (VM + AOT/JIT compiler toolchain). It exposes its capabilities to Dart code through **`dart:ui`**, a thin Dart-side wrapping of the C++ primitives (`Canvas`, `Picture`, `Scene`, `SceneBuilder`, `Window`/`PlatformDispatcher`, `FlutterView`) — this is *the* boundary between "Dart framework code" and "native engine code."
- **Framework layer (Dart)**: built in layers on top of `dart:ui` — `foundation`/`painting`/`gestures`/`animation` at the base, `rendering` (the RenderObject tree) above that, `widgets` (the reactive composition model — Widget/Element) above that, and `Material`/`Cupertino` design-system widgets on top.

This layering is exactly why "Flutter doesn't use native widgets" — Material/Cupertino widgets are painted entirely by Flutter's own rendering layer through `dart:ui`/Skia-Impeller, not by wrapping platform `UIView`/`View` controls; that's the source of both Flutter's cross-platform pixel consistency and the fact that platform look-and-feel updates (new iOS control styling, say) don't arrive "for free" — Flutter has to reimplement them.

### C.6 Semantics tree — the fourth tree

The `Semantics` widget *"annotates the widget tree with a description of the meaning of the widgets"* — this information is compiled into a tree of `SemanticsNode`s (via `RenderObject.describeSemanticsConfiguration` and the `flushSemantics` pipeline phase, B.4) that assistive technology (screen readers), and increasingly integration-test/automation tooling, consume instead of walking the render tree. https://api.flutter.dev/flutter/widgets/Semantics-class.html

Why it's a genuinely separate tree rather than metadata bolted onto RenderObjects: the semantics tree can have a **different shape** than the render tree — a `Semantics` node can merge several RenderObjects into one semantic node (`container: false` merges with ancestor), or a decorative subtree can be excluded entirely (`ExcludeSemantics`) while still rendering pixels normally. This decoupling is exactly why you must sometimes hand-annotate semantics (`Semantics(label: ..., button: true, ...)`) — the render tree's structure (how many boxes/clips/transforms exist) is an implementation detail that often doesn't map 1:1 onto what a screen-reader user should hear as "one button."

---

## D. Performance Consequences

### D.1 Why `const` constructors matter — the actual mechanical chain

1. A `const SomeWidget(...)` expression is **canonicalized** by the Dart compiler: every syntactically-identical `const` construction in your source (with identical constant arguments) becomes **the exact same object instance** at compile time — not just equal, but `identical()`.
2. On rebuild, `updateChild` first checks `child.widget == newWidget` — for a `const` widget being handed the same canonical instance again, this is trivially true (identity ⇒ equality), and per the source: *"We don't insert a timeline event here, because otherwise it's confusing that widgets that 'don't update' (because they didn't change) get 'charged' on the timeline"* — i.e., the framework recognizes this as a **zero-cost path**, distinct even from the (already cheap) `canUpdate` reconciliation.
3. Because the widget instance didn't change, the corresponding Element is **not rebuilt at all** — `build()` is never called on it, and the entire subtree under that const widget is skipped by the reconciliation walk (there's nothing new to diff its children against).

This is the real chain: **canonicalization → object identity check in `updateChild` → subtree rebuild entirely skipped**, not merely "made cheaper." Framework guidance is explicit: *"It is massively more efficient for a widget to be re-used than for a new (but identically-configured) widget to be created ... Use `const` widgets where possible. (This is equivalent to caching a widget and re-using it.)"* and *"if the created widget is `const`, Flutter would short-circuit most of the rebuild work."* https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html

### D.2 `ListView` vs `ListView.builder`, `cacheExtent`, `itemExtent`

- **`ListView(children: [...])`**: materializes **every** child widget (and their Elements/RenderObjects) up front, regardless of visibility. Fine for short, known-bounded lists.
- **`ListView.builder(itemBuilder: ...)`**: *"appropriate for list views with a large (or infinite) number of children because the builder is called only for those children that are actually visible"* (plus a small buffer, `cacheExtent`) — this is **lazy, virtualized construction**: off-screen items simply don't have Elements/RenderObjects yet. https://api.flutter.dev/flutter/widgets/ListView/ListView.builder.html
- **`itemExtent`**: telling the list "every item is exactly N pixels along the main axis" lets the `Sliver`/`Viewport` machinery **jump directly to an arbitrary scroll offset's items via arithmetic**, instead of laying out every item from the top to discover offsets — a major win for `jumpTo`/fast-scroll and for avoiding unnecessary layout of items you're scrolling past quickly.
- **`cacheExtent`** (note: being superseded by `scrollCacheExtent` in newer stable, deprecated after `3.41.0-0.0.pre` per current dartdoc): controls how many extra pixels beyond the visible viewport are pre-built/laid out, trading a bit of extra up-front work for smoother fast-scrolling (fewer visible pop-in/jank moments as new items enter frame).
- **The `itemBuilder` contract you must honor**: *"The itemBuilder should always create the widget instances when called. Avoid using a builder that returns a previously-constructed widget"* — returning a cached widget instance from a builder breaks the framework's assumptions about per-call construction and can cause state/lifecycle bugs.

### D.3 Rebuild vs. relayout vs. repaint — three independent, separately-triggerable costs

These are genuinely three different dirty-marking mechanisms and it's a strong interview signal to separate them cleanly:

| Trigger | Marks | Pipeline phase affected | Cheapest to avoid via |
|---|---|---|---|
| `setState` / InheritedWidget notify | `Element.markNeedsBuild()` | `buildScope` (Dart-side widget diff) | `const`, splitting widgets so only leaves rebuild, `select`-style scoped listening |
| A RenderObject's geometry inputs change (new constraints, or its own size-affecting fields change) | `RenderObject.markNeedsLayout()` | `flushLayout` | relayout boundaries (B.5), avoiding `parentUsesSize` where unnecessary, fixed `itemExtent` |
| A RenderObject's visual output changes without its geometry changing (e.g. color) | `RenderObject.markNeedsPaint()` | `flushPaint` | `RepaintBoundary` around the frequently-changing part, `shouldRepaint` in `CustomPainter` |

A rebuild does **not** necessarily cause a relayout (if the new widget produces an `==`-equal RenderObject configuration, `update()` on the RenderObjectElement can leave the RenderObject's dirty flags untouched), and a relayout does not necessarily cause a full repaint beyond the affected boundary, and vice versa — a color-only change can skip build and layout entirely and only call `markNeedsPaint()`. Interviewers listen for whether a candidate conflates "my widget rebuilt" with "the screen redrew everything," which is the single most common practitioner misconception this section corrects.

### D.4 Common jank causes (synthesizing B/C findings)

- **Expensive `build()` methods** — heavy computation, object allocation, or synchronous work inside `build()` runs on the UI thread every time that Element is dirty; move it to `initState`/memoize/`didChangeDependencies` instead.
- **`saveLayer`/`Opacity` overuse** — each is a potential new composited layer (B.8); `Opacity` in particular is documented as expensive because it forces an intermediate buffer for whole-subtree alpha blending — prefer `AnimatedOpacity`/`FadeTransition` only where truly needed, or better, animate a pre-composited asset.
- **Unbounded `ListView`s / non-lazy lists** (`shrinkWrap: true` on long lists, or plain `ListView(children:)` with thousands of items) — defeats virtualization (D.2), builds everything up front.
- **Large images decoded/rendered at full resolution** — decode cost lands on the IO thread (C.2) but a huge bitmap still costs GPU memory/upload bandwidth on the raster thread; use `cacheWidth`/`cacheHeight` or pre-resized assets.
- **Shader compilation jank** — first-appearance stutter for a novel visual-effect combination under Skia; largely solved by Impeller's AOT shader compilation (C.4), but still a live concern in `--no-enable-impeller` configurations or on the web (Skia/CanvasKit).
- **Synchronous I/O on the UI thread** — any blocking disk/network call inside build/layout/paint-triggering code stalls the whole frame pipeline; push to `compute()`/an isolate, or the IO thread's natural async paths (image providers already do this correctly).

### D.5 `RepaintBoundary` misuse

Because a `RepaintBoundary` gives its subtree a **permanent, separate compositor layer**, overusing it (wrapping every small widget "just in case") has a real cost: more layers means more GPU memory for their backing surfaces, more compositing work assembling them into the final scene, and — per the dartdoc note about the engine "choosing to pay a one-time cost of rasterizing and caching pixel values" — that caching benefit only pays off when the subtree is **actually static relative to its surroundings**; slapping `RepaintBoundary` on something that repaints just as often as its parent adds layer overhead with zero savings. The correct use is targeted: isolate the one subtree that changes frequently *while everything around it does not* (or vice versa) — e.g., around a spinning loading indicator inside an otherwise-static card, not around the whole card.

---

## E. Interview-Shaped Output

For each area: what a 3-YOE candidate actually gets asked, the trap, and the one-line correct kernel.

**A1. "What's the difference between Widget, Element, RenderObject?"**
Trap: reciting the definitions without saying *why three exist*. Kernel: *Widget is throwaway config; Element is the thing that persists and gets diffed; RenderObject is the thing that actually measures/paints — splitting them lets Flutter reuse expensive RenderObjects across cheap widget rebuilds.* [High confidence]

**A3. "How does Flutter decide whether to update or replace a widget?"**
Trap: saying "it compares the widgets" without naming the two exact fields. Kernel: *`runtimeType` and `key` both equal ⇒ update in place; either differs ⇒ deactivate old, inflate new.* [High confidence]

**A4. "Why do I need keys in a list?"**
Trap: "keys are for performance" (vague) or "keys are always required" (wrong — only for stateful/reorderable children). Kernel: *Without a key, reconciliation matches by position+type, so a reorder silently swaps state between Elements instead of moving it — keys make identity explicit.* [High confidence]

**A5. GlobalKey**
Trap: not knowing it's expensive, or constructing one inline in `build()`. Kernel: *GlobalKey enables cross-tree reparenting with state preservation, at the cost of a `deactivate` + full InheritedWidget-dependent rebuild on every reparent — and must be stored outside `build()` or it defeats itself.* [High confidence]

**A6. "didUpdateWidget vs didChangeDependencies — when does each fire?"**
Trap: candidates conflate them as "something changed." Kernel: *didUpdateWidget = your own parent gave you a new widget instance (your config changed); didChangeDependencies = an InheritedWidget you subscribed to changed (something above you changed).* [High confidence]

**A7. "What does setState actually do?"**
Trap: "it repaints the screen" (too vague/wrong layer). Kernel: *It runs your callback synchronously, then calls markNeedsBuild — that queues the Element for the next buildScope pass; nothing is drawn synchronously.* [High confidence]

**B3. "Why is Theme.of(context) fast?"**
Trap: "Flutter caches it somewhere" (no mechanism). Kernel: *Every Element carries a persistent hash map (Type → InheritedElement) inherited from its parent in O(1); lookup is one hash-map read, not a tree walk — the cost was paid incrementally as the tree was built.* [High confidence, source-verified]

**B5. "Why did I get an unbounded-height error?"**
Trap: reflexively slapping `shrinkWrap: true` on everything. Kernel: *A Column gives unbounded height to children; a ListView needs bounded height to know its viewport extent — fix with Expanded/Flexible/SizedBox, not shrinkWrap (which defeats virtualization).* [High confidence]

**B6. "Why avoid IntrinsicWidth/getMinIntrinsicWidth?"**
Trap: not knowing there's a cost at all. Kernel: *Intrinsic queries can cascade into O(N²) work across nested levels — it's documented in the framework source itself, not just a style guideline.* [High confidence, source-verified]

**C1. "What's the frame pipeline?"**
Trap: skipping straight to "build, layout, paint" and omitting the vsync/animation phase entirely. Kernel: *vsync → transient callbacks (animations tick) → persistent callbacks (build→layout→paint→composite) → post-frame callbacks → scene handed to raster thread.* [High confidence, source-verified via SchedulerPhase]

**C2. "UI thread vs raster thread — how do you tell which is janking?"**
Trap: not knowing threads were merged on mobile since 3.29, or forgetting the IO thread exists. Kernel: *UI-thread-red = your Dart is too slow; raster-thread-red = your scene is too complex (too many layers/saveLayers); and since Flutter 3.29 (mobile)/3.35 (desktop), UI and platform threads are the same thread.* [High confidence for the merge fact; this is the highest-leverage "shows you're current" answer available]

**C4. "Skia or Impeller?"**
Trap: giving a stale 2023-era answer ("Impeller is experimental/opt-in"). Kernel: *As of the current stable, Impeller is the default (mandatory on iOS) across mobile and desktop; Skia/CanvasKit remains only on web. Impeller fixed shader-compilation jank by precompiling a fixed shader set at engine build time instead of compiling on first use at runtime.* [High confidence, verified live against docs.flutter.dev/perf/impeller]

**D1. "Why does `const` matter?"**
Trap: "it's just good practice / micro-optimization." Kernel: *const widgets are canonicalized to identical instances, so `updateChild`'s identity check (`child.widget == newWidget`) short-circuits the entire rebuild+diff for that subtree — it's not a micro-optimization, it's a full skip.* [High confidence, source-verified]

**D3. "Does a rebuild always cause a repaint?"**
Trap: yes/no without nuance. Kernel: *No — rebuild (markNeedsBuild), relayout (markNeedsLayout) and repaint (markNeedsPaint) are three independently-triggered dirty flags; a rebuild whose output is `==` to the prior RenderObject config can skip layout and paint entirely.* [High confidence]

---

## Sources

- Flutter releases manifest (authoritative, machine-readable, used by the `flutter` tool itself): https://storage.googleapis.com/flutter_infra_release/releases/releases_linux.json
- Flutter release notes index: https://docs.flutter.dev/release/release-notes
- Flutter framework source, `framework.dart` (Widget/Element/BuildOwner/BuildScope/InheritedElement — fetched and read directly, stable branch): https://raw.githubusercontent.com/flutter/flutter/stable/packages/flutter/lib/src/widgets/framework.dart
- Flutter rendering source, `box.dart` (BoxConstraints, intrinsic sizing O(N²) warning, sizedByParent): https://raw.githubusercontent.com/flutter/flutter/stable/packages/flutter/lib/src/rendering/box.dart
- Flutter rendering source, `object.dart` (RenderObject, relayout boundaries, markNeedsLayout): https://raw.githubusercontent.com/flutter/flutter/stable/packages/flutter/lib/src/rendering/object.dart
- `Widget` class dartdoc: https://api.flutter.dev/flutter/widgets/Widget-class.html
- `Element` class dartdoc: https://api.flutter.dev/flutter/widgets/Element-class.html
- `InheritedWidget` class dartdoc: https://api.flutter.dev/flutter/widgets/InheritedWidget-class.html
- `InheritedModel` class dartdoc: https://api.flutter.dev/flutter/widgets/InheritedModel-class.html
- `InheritedNotifier` class dartdoc: https://api.flutter.dev/flutter/widgets/InheritedNotifier-class.html
- `BuildOwner` class dartdoc: https://api.flutter.dev/flutter/widgets/BuildOwner-class.html
- `State` class dartdoc: https://api.flutter.dev/flutter/widgets/State-class.html
- `StatefulWidget` class dartdoc (performance considerations, const guidance): https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html
- `GlobalKey` class dartdoc: https://api.flutter.dev/flutter/widgets/GlobalKey-class.html
- `RenderBox` class dartdoc: https://api.flutter.dev/flutter/rendering/RenderBox-class.html
- `PipelineOwner` class dartdoc: https://api.flutter.dev/flutter/rendering/PipelineOwner-class.html
- `RenderSliver` class dartdoc: https://api.flutter.dev/flutter/rendering/RenderSliver-class.html
- `RepaintBoundary` class dartdoc: https://api.flutter.dev/flutter/widgets/RepaintBoundary-class.html
- `RenderObject.isRepaintBoundary` dartdoc: https://api.flutter.dev/flutter/rendering/RenderObject/isRepaintBoundary.html
- `Layer` class dartdoc: https://api.flutter.dev/flutter/rendering/Layer-class.html
- `CustomPainter` class dartdoc: https://api.flutter.dev/flutter/rendering/CustomPainter-class.html
- `SchedulerPhase` enum dartdoc: https://api.flutter.dev/flutter/scheduler/SchedulerPhase.html
- `SchedulerBinding.handleBeginFrame` dartdoc: https://api.flutter.dev/flutter/scheduler/SchedulerBinding/handleBeginFrame.html
- `AnimationController` class dartdoc: https://api.flutter.dev/flutter/animation/AnimationController-class.html
- `Hero` class dartdoc: https://api.flutter.dev/flutter/widgets/Hero-class.html
- `Semantics` class dartdoc: https://api.flutter.dev/flutter/widgets/Semantics-class.html
- `ListView.builder` dartdoc: https://api.flutter.dev/flutter/widgets/ListView/ListView.builder.html
- Flutter architectural overview: https://docs.flutter.dev/resources/architectural-overview
- Flutter UI performance / threading model: https://docs.flutter.dev/perf/ui-performance
- Impeller rendering engine (current status): https://docs.flutter.dev/perf/impeller
- Merged threads breaking change (macOS/Windows, 3.35): https://docs.flutter.dev/release/breaking-changes/macos-windows-merged-threads
- Layout constraints ("constraints go down, sizes go up"): https://docs.flutter.dev/ui/layout/constraints
- Thread-merge tracking issue: https://github.com/flutter/flutter/issues/150525
- Impeller opt-out deprecation warning discussion (status as of 2026): https://github.com/flutter/flutter/issues/180347, https://github.com/flutter/flutter/issues/181441
- Shader compilation jank tracking issue (Impeller motivation): https://github.com/flutter/flutter/issues/77412
