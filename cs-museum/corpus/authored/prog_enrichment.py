# -*- coding: utf-8 -*-
"""Hand-authored content for programming_tower.json.
Relation semantics: see schema_note.md. Edges come from empowered_by / inheritsFrom ONLY."""

L = lambda lang, mech, why, when, price: {"lang":lang,"mechanism":mech,"why":why,"useWhen":when,"price":price}
# uses / how / forCase / confidence -- must be checkable against a real implementation
E = lambda uses, how, for_case, conf="HIGH": {"uses":uses,"how":how,"forCase":for_case,"confidence":conf}

PROG = {
"prog_memory_manual_malloc_free": {
 "definition":"You call malloc to reserve bytes and free to release them. The compiler tracks nothing; correctness is entirely a property of your discipline.",
 "does":"Reserves a byte range on the heap and hands back its address. Nothing records who owns it, how long it lives, or whether anyone still points at it.",
 "outcome":"Total control over layout and timing, and personal liability for four bug classes: use-after-free, double-free, buffer overflow, and leaks.",
 "motivation":"Programs need memory whose size or lifetime isn't known at compile time. The stack can't do it — it dies at scope exit. Something had to hand out long-lived storage.",
 "origin":"C, early 1970s (Ritchie, Bell Labs). malloc/free formalised in ANSI C (1989). Predates every automatic scheme here — all of them are answers to its failure modes.",
 "first_principles":"RAM is a flat addressable array. 'Allocation' is pure bookkeeping — a free-list the allocator keeps in ordinary memory. Nothing in the hardware knows an object exists or has died.",
 "empowered_by":[
  E("mmap / brk syscalls","The allocator requests large page-aligned regions from the kernel and then sub-allocates within them; glibc malloc uses brk for the main arena and mmap for allocations above MMAP_THRESHOLD (128 KB by default).","Obtaining backing pages at all — malloc cannot create memory, only parcel out what the kernel maps."),
  E("A free-list / bin data structure","glibc keeps size-segregated bins (fast, small, large, unsorted) of previously freed chunks; each chunk carries an 8/16-byte header holding its size and flags.","Making free() O(1) in the common case and letting a later malloc reuse the block without a syscall."),
  E("MMU virtual-to-physical translation","The returned pointer is a virtual address; the MMU walks page tables to reach physical DRAM, and pages may not be resident until first touch.","Giving every process a private flat address space, which is why two processes can both hold address 0x600000 without colliding."),
  E("Pointer arithmetic in the ISA","free(p) locates the chunk header by subtracting a fixed offset from p — a plain integer subtraction on the address.","Recovering allocation metadata from a bare pointer, since free() is given no size argument.")],
 "empowers":"Prose only, not a dependency claim: automatic schemes are historically motivated by its failure modes, and most of them call into malloc-class primitives — but none of them is *entailed* by it.",
 "inheritsFrom":[{"id":"os_virtual_memory","label":"Virtual memory","why":"heap allocation is a specialisation of process-private mapped address space"}],
 "specializesInto":[{"id":"prog_memory_reference_counting","label":"Reference counting","why":"a kind of manual management where the free call is derived from a count"},
                    {"id":"prog_memory_ownership___borrowing_raii","label":"Ownership & borrowing","why":"a kind of manual management where the free point is fixed at compile time"}],
 "byLanguage":[
  L("C","malloc/calloc/realloc/free from libc.","Ritchie's design gives the programmer the machine with no interposed model.","Kernels, embedded, allocators themselves — anywhere you must own placement and timing.","Every memory-safety CVE class. Nothing checks you."),
  L("C++","new/delete exist but idiomatic C++ forbids raw use; RAII and unique_ptr/shared_ptr wrap them.","Stroustrup wanted C's control with destructors that make cleanup automatic and exception-safe.","Legacy interop, custom allocators, placement new.","Two dialects in one language; raw new/delete in modern code is a smell."),
  L("Rust","Raw allocation reachable only via `unsafe` or `std::alloc`.","Safe Rust must never expose a manual free — the borrow checker's guarantee depends on owning the free point.","Implementing collections, FFI, custom allocators.","`unsafe` is a hole in every guarantee the language advertises."),
  L("Zig","Explicit allocator passed as a parameter to anything that allocates.","Zig's position: hidden allocation is the real problem, so make it a visible argument.","Embedded, games, anywhere allocation strategy is a design decision.","Verbosity — the allocator threads through every signature."),
  L("Go / Java / Python","Not exposed. Allocation happens; freeing is the runtime's job.","Deliberate removal — these languages traded control for the elimination of a bug class.","Never, by design.","You lose deterministic destruction and placement control.")],
 "traceDown":["free-list bookkeeping inside the allocator","brk/mmap syscall to the kernel","page table entry, MMU translation","DRAM row/column activation","charge stored on a capacitor in a memory cell"]},

"prog_memory_garbage_collection_gc": {
 "definition":"The runtime periodically determines which objects are still reachable from live roots and reclaims everything else. You never call free.",
 "does":"Traces references from a root set (stack, globals, registers) through the object graph, marks what it finds, and reclaims the rest.",
 "outcome":"Whole bug classes disappear — no use-after-free, no double-free. In exchange you surrender control of *when* memory is released, and accept pause times.",
 "motivation":"Manual free is provably error-prone at scale. If reachability can be computed, the machine can decide the free point better than a human tracking it across a large codebase.",
 "origin":"McCarthy, LISP, 1959 — invented because list structure made manual freeing intractable. The oldest automatic-memory idea in computing.",
 "first_principles":"'Garbage' is not a physical property. An object is dead when no path of references reaches it — a graph-reachability question, decidable by traversal, which is why it can be automated at all.",
 "empowered_by":[
  E("Graph reachability traversal","The mark phase performs a DFS/BFS from the root set across the object reference graph, setting a per-object mark bit on every node reached.","Deciding liveness — reachability is the operational definition of 'not garbage', so the traversal *is* the liveness test."),
  E("Precise root enumeration (stack maps)","The compiler emits, per safepoint, a map saying which stack slots and registers currently hold pointers; the collector reads it to find roots without guessing.","Starting the traversal correctly. A missed root frees a live object; conservative scanning avoids the map but then cannot move objects."),
  E("Safepoints / thread suspension","The compiler inserts polls at loop back-edges and call sites where a thread can be halted in a known-good state.","Getting a coherent heap snapshot — the collector cannot read a stack mid-instruction with pointers in flight."),
  E("An underlying page allocator","The collector obtains its heap from mmap and manages it internally; it does not eliminate the allocator, it monopolises it.","Owning a contiguous region so it can bump-allocate and compute object addresses cheaply."),
  E("Write barriers","Compiler-inserted code on pointer stores that records cross-generational or mid-mark mutations into a remembered set.","Generational and concurrent collection specifically — without them a mutator could hide a live object from an in-progress mark.","HIGH")],
 "empowers":"Prose only: it removes a class of manual bookkeeping. It does NOT entail closures, cycles or dynamic typing — Rust has closures and cyclic structures with no collector.",
 "inheritsFrom":[{"id":"programming_memory_models","label":"Memory models","why":"a kind of automatic storage-reclamation policy"}],
 "specializesInto":[{"id":"prog_memory_tracing_gc___mark-sweep","label":"Tracing GC / mark-sweep","why":"the dominant concrete algorithm family"}],
 "byLanguage":[
  L("Java","Generational region-based collectors: G1 (default since JDK 9), ZGC and Shenandoah for low pause.","Decades of server workloads pushed the JVM to make pause time tunable and sub-millisecond.","Long-running servers where throughput and predictable latency both matter.","Memory headroom (often 2-5x live set); GC tuning is a specialist skill."),
  L("Go","Concurrent tri-colour mark-sweep, non-generational, tuned hard for low pause.","Go targets network servers; the team optimised latency over throughput deliberately.","Services where p99 latency matters more than allocation throughput.","No compaction, so fragmentation; lower throughput than generational designs."),
  L("Python","Reference counting primarily, with a cycle-detecting collector as backup.","Refcounting gives prompt destruction, which CPython's C-extension ecosystem depends on.","Scripting, data work, anywhere prompt cleanup is convenient.","Refcount traffic on every assignment; the GIL historically made counts cheap by avoiding atomics."),
  L("JavaScript","Generational mark-sweep in V8, with a copying scavenger for the young generation.","Web pages allocate enormously and briefly — the generational hypothesis fits almost perfectly.","Everything in the browser and Node.","Pause spikes on major GC; no control over timing."),
  L("C / C++ / Rust / Zig","Absent, deliberately.","A collector needs a runtime that can stop threads and read stack maps — incompatible with predictable latency and freestanding targets.","Never in these languages.","You take back the free() problem in exchange.")],
 "traceDown":["root scanning: stack maps, registers, globals","object header / mark bits","write barriers emitted by the compiler","cache-line traffic during the mark phase","DRAM bandwidth"]},

"prog_memory_tracing_gc___mark-sweep": {
 "definition":"The concrete algorithm behind most collectors: mark everything reachable from the roots, then sweep (or compact) whatever wasn't marked.",
 "does":"Two phases. Mark walks the reference graph setting a bit per live object. Sweep walks the heap linearly, reclaiming unmarked cells.",
 "outcome":"Collects cycles that reference counting cannot, at the cost of touching a large fraction of the heap and needing a pause — or heavy machinery to avoid one.",
 "motivation":"Reference counting cannot reclaim cycles — two objects pointing at each other keep each other alive forever. Tracing asks the global question instead of the local one, so cycles fall out naturally.",
 "origin":"McCarthy, 1959, alongside LISP. The generational refinement came from Lieberman & Hewitt (1983) and Ungar (1984), on the observation that most objects die young.",
 "first_principles":"Liveness is reachability. Once you accept that, the algorithm is forced: start at roots, traverse, and everything untouched is by definition unreachable.",
 "empowered_by":[
  E("A mark bit or mark word","One or more bits, either in the object header or in a side bitmap, record whether the object was reached this cycle.","The sweep phase, which reads exactly this bit to decide reclaim versus keep; a side bitmap is preferred when sweeping should not touch object memory and dirty caches."),
  E("An explicit mark stack","Because a recursive DFS would overflow the machine stack on deep heaps, the traversal keeps its worklist on an explicit heap-allocated stack, with overflow handling.","Traversing arbitrarily deep object graphs without unbounded native recursion."),
  E("The tri-colour invariant plus write barriers","Objects are conceptually white/grey/black; a barrier on pointer stores prevents a black object from being made to point at a white one without re-greying something.","Concurrent marking specifically — it is what makes it safe for application threads to mutate the graph while the mark is in flight."),
  E("Linear heap scan over object headers","Sweep walks the heap address-order, reading each object's size field to find the next one, coalescing free runs into the allocator's free-list.","Reclamation — and it is why parseable object headers are mandatory in a sweeping collector."),
  E("Copying / forwarding pointers (compacting variants)","A survivor is copied to a new region and its old header overwritten with a forwarding address that later pointer fixups follow.","Compaction and generational promotion, which eliminate fragmentation and enable cheap bump allocation.")],
 "empowers":"Prose only: it is the mechanism generational, concurrent and compacting collectors are built from — but describing those as 'empowered' is a design lineage claim, not a dependency of this node.",
 "inheritsFrom":[{"id":"prog_memory_garbage_collection_gc","label":"Garbage collection","why":"a specific algorithm within the automatic-reclamation family"}],
 "specializesInto":[],
 "byLanguage":[
  L("Java (G1)","Heap split into equal-size regions; collects regions with the most garbage first.","'Garbage first' targets a pause-time goal rather than maximum throughput.","Default for most server workloads since JDK 9.","Complexity; many tuning knobs."),
  L("Java (ZGC / Shenandoah)","Concurrent compaction using coloured pointers and load barriers.","Sub-millisecond pauses regardless of heap size, for latency-critical services.","Very large heaps with strict latency budgets.","Barrier overhead on reads; higher CPU cost."),
  L("Go","Concurrent tri-colour with Dijkstra-style write barriers, no compaction.","Simplicity and low pause; Go accepts fragmentation to avoid moving objects.","Go services generally.","Fragmentation; cannot bump-allocate as cheaply as a compactor."),
  L("V8","Copying scavenger (semi-space) for young objects, mark-compact for old.","Most JS objects die almost immediately; copying the few survivors beats sweeping the many dead.","All JavaScript.","Copying costs double the young-generation space."),
  L("Python","Generational three-tier cycle detector supplementing refcounting.","Only cycles need tracing — refcounts already handle the acyclic majority.","CPython.","Pauses on collection; the gc module is sometimes disabled for latency.")],
 "traceDown":["mark bit in header or side bitmap","explicit mark stack in the collector heap","write-barrier instructions at every pointer store","pointer-chasing cache misses","memory bus saturation"]},

"prog_memory_reference_counting": {
 "definition":"Every object carries a count of how many references point at it. The count reaching zero is the free signal.",
 "does":"Increments on copy, decrements on destruction or reassignment, frees immediately at zero — a purely local decision requiring no global scan.",
 "outcome":"Prompt, deterministic destruction and no pauses — but cycles leak forever, and every reference copy costs a write, an atomic one under threads.",
 "motivation":"Tracing must stop the world and scan the heap. If you only want to know whether *this* object is dead, that is answerable locally by counting who points at it.",
 "origin":"Collins, 1960 — one year after McCarthy's tracing GC. The two automatic strategies have coexisted and competed ever since.",
 "first_principles":"Counting incoming edges is local information. That locality is exactly why it is prompt and pause-free, and exactly why it cannot see a cycle: within a cycle every count is legitimately nonzero.",
 "empowered_by":[
  E("A counter field in the object header","CPython places ob_refcnt as the first word of every PyObject; Swift keeps refcount bits in the object header word alongside other flags.","Storing the count at a fixed offset so retain/release is a load-add-store at a known displacement, with no lookup."),
  E("Atomic read-modify-write instructions","Under threads the increment must be atomic — lock xadd on x86, LDXR/STXR on ARM — or two threads can lose an update and free a live object.","Thread-safe sharing specifically. Swift's ARC and C++ shared_ptr pay this; CPython historically avoided it because the GIL serialised all counting."),
  E("Compiler insertion of retain/release (ARC)","Swift's compiler emits retain/release at ownership transfer points and then removes provably redundant pairs during optimisation.","Making counting automatic rather than manual — pre-2011 Objective-C required writing them by hand, which was a major bug source."),
  E("Weak reference side tables","A separate table maps object addresses to weak-reference registrations so weak refs can be zeroed at deallocation without inflating every object header.","Breaking cycles — the only available fix, since the algorithm itself provably cannot reclaim them.")],
 "empowers":"Prose only: it makes deterministic destruction available. It does not entail RAII — C++ RAII with unique_ptr uses no counting at all.",
 "inheritsFrom":[{"id":"prog_memory_garbage_collection_gc","label":"Automatic memory management","why":"a kind of automatic reclamation, using local counts rather than global reachability"}],
 "specializesInto":[],
 "byLanguage":[
  L("Swift","ARC — compiler-inserted retain/release; cycles broken manually with `weak`/`unowned`.","Apple needed Objective-C's deterministic destruction with no pause, on battery-powered devices.","All Swift/iOS code.","Cycles are the programmer's problem; retain/release traffic; atomics cost under concurrency."),
  L("Python","ob_refcnt in every PyObject, plus a cycle detector.","Prompt cleanup lets `with` blocks and C extensions release resources predictably.","All CPython.","A refcount write on nearly every assignment; free-threading (PEP 703) must make these atomic."),
  L("C++","shared_ptr (atomic count), weak_ptr to break cycles, unique_ptr where sharing isn't needed.","Opt-in: pay for counting only where ownership is genuinely shared.","Shared ownership with unclear lifetime.","Atomic increments are expensive; shared_ptr is often reached for when unique_ptr would do."),
  L("Rust","Rc (non-atomic) and Arc (atomic); Weak to break cycles.","An explicit, visibly-named escape hatch for graphs the borrow checker cannot express.","Cyclic or shared-ownership data structures.","Runtime cost the rest of Rust avoids; Rc<RefCell<T>> moves borrow checks to runtime."),
  L("Objective-C","Manual retain/release, then ARC from 2011.","Same pressure as Swift; ARC automated a convention developers already followed by hand.","Legacy Apple code.","Pre-ARC the discipline was a major bug source.")],
 "traceDown":["counter field in the object header","atomic fetch-add / fetch-sub instruction","cache-line contention when threads share an object","MESI cache-coherence traffic"]},

"prog_memory_ownership___borrowing_raii": {
 "definition":"Each value has exactly one owner; the compiler frees it when the owner leaves scope. References are 'borrows' whose lifetimes the compiler proves cannot outlive the owner.",
 "does":"Moves the free decision from runtime to compile time by restricting aliasing: many shared readers XOR one exclusive writer, never both.",
 "outcome":"Memory safety and data-race freedom with no collector and no refcount — the guarantee is fully erased before the program runs. Paid for in a genuinely steep learning curve.",
 "motivation":"Both automatic strategies cost runtime: tracing pauses, counting adds traffic. If lifetimes were provable statically, safety could be free at runtime.",
 "origin":"RAII from Stroustrup's C++ (early 1980s, named for constructor/destructor pairing). Rust generalised it to affine types plus a borrow checker, stable at 1.0 in 2015 — and the zero-runtime position only became coherent after Rust removed its green-thread runtime (RFC 230).",
 "first_principles":"A dangling pointer is an alias that outlived its referent. Forbid that one relationship statically and the entire class becomes unrepresentable, with no runtime check.",
 "empowered_by":[
  E("Static dataflow analysis over a control-flow graph","The borrow checker (NLL, and the Polonius reformulation) computes, per program point, which loans are live — it is a fixpoint dataflow problem over the MIR CFG.","Deciding whether a borrow outlives its owner, at compile time, without running anything."),
  E("Affine type discipline","Each value may be used at most once as an owner: a move invalidates the source binding, which the type checker tracks per-binding.","Guaranteeing a single free point, which is what makes double-free unrepresentable rather than merely unlikely."),
  E("Compiler-generated drop glue","For each type the compiler emits a destructor routine and inserts calls at every scope exit, including unwind paths, in reverse declaration order.","Actually performing the deallocation — ownership decides *when*, drop glue is *what runs*."),
  E("The same underlying allocator","Box/Vec/String call the global allocator (malloc by default) and free through it; ownership changes who decides, not the mechanism.","Obtaining and returning heap memory — ownership is a compile-time discipline layered over ordinary allocation."),
  E("Datalog-style constraint solving (Polonius)","The next-generation borrow checker expresses loan liveness as Datalog rules and solves them, replacing the hand-written NLL dataflow.","Handling borrow patterns NLL rejects conservatively — a live example of logic programming inside a systems compiler.","MEDIUM")],
 "empowers":"Prose only: it makes 'fearless concurrency' expressible. Send/Sync are a *further* design choice built on aliasing rules, not an automatic consequence.",
 "inheritsFrom":[{"id":"prog_memory_manual_malloc_free","label":"Manual allocation","why":"a kind of manual management in which the compiler, not the programmer, writes the free"},
                 {"id":"prog_types_static_vs_dynamic","label":"Static typing","why":"ownership and lifetimes are carried as static type information"}],
 "specializesInto":[],
 "byLanguage":[
  L("Rust","Affine types + borrow checker + lifetime elision. Move by default; Copy opt-in.","The only route to memory safety without a runtime, which the no-GC choice made mandatory.","Systems work needing safety and predictable performance; anything under memory-safety policy pressure.","Steep curve; fighting the checker; cycles need Rc<RefCell<>>; `unsafe` is the escape hatch."),
  L("C++","RAII by convention — constructors acquire, destructors release. Move semantics since C++11.","Stroustrup wanted deterministic cleanup that survives exceptions.","All modern C++.","No checker enforces it — use-after-move and dangling references still compile."),
  L("Swift","Value semantics with copy-on-write; `borrowing`/`consuming` parameter modifiers in recent versions.","Moving toward Rust-like control while keeping ARC as the default.","Performance-critical Swift.","Two overlapping models — ARC and ownership — to hold at once."),
  L("Zig","No ownership system; explicit allocators plus `defer`/`errdefer`.","Zig's bet: make allocation visible rather than prove lifetimes.","Where you want C control with better ergonomics.","No compile-time safety guarantee at all."),
  L("Go / Java / Python","Absent — the collector owns lifetime.","Their design premise is that you should not think about this.","Never.","No deterministic destruction; `defer`/try-with-resources patch only the resource case.")],
 "traceDown":["MIR control-flow graph and loan liveness sets","move semantics and drop glue emitted by the compiler","stack frame layout and destructor ordering","zero runtime representation — fully erased","the same malloc/free underneath"]},

"prog_concurrency_threads___mutexes": {
 "definition":"Multiple OS-scheduled execution contexts share one address space, coordinating access to shared data with locks.",
 "does":"The kernel schedules each thread onto a core. A mutex serialises a critical section so only one thread mutates shared state at a time.",
 "outcome":"True parallelism across cores and direct shared-memory speed — bought with deadlock, races, and reasoning that does not compose.",
 "motivation":"As machines gained cores, programs needed several flows of control sharing data without paying process-creation and IPC costs.",
 "origin":"Dijkstra introduced semaphores and named the mutual-exclusion problem in 1965; POSIX threads standardised the interface in 1995.",
 "first_principles":"A core executes one instruction stream. Parallelism needs more streams; shared memory means two streams can touch one address, and without ordering the hardware guarantees nothing about who sees what.",
 "empowered_by":[
  E("Atomic compare-and-swap / test-and-set","A mutex's fast path is a single atomic CAS on a lock word; only on contention does it fall through to a syscall.","Making the uncontended lock cheap — this is why an uncontended mutex costs tens of nanoseconds rather than a syscall."),
  E("The futex syscall (Linux)","On contention the thread registers on a wait queue keyed by the lock's address and blocks in the kernel; unlock wakes one waiter.","Blocking without spinning — the kernel is only involved when there is actual contention, which is the whole design of a modern mutex."),
  E("Kernel scheduler and thread control blocks","Each thread has a kernel TCB, its own stack (~1 MB default on Linux) and register set; the scheduler picks runnable threads per core.","Getting genuine parallelism — user-space schemes cannot place work on a second core without kernel threads underneath."),
  E("The cache coherence protocol (MESI/MOESI)","Hardware keeps per-core caches consistent by invalidating or transferring cache lines between cores on write.","Making shared memory work at all across cores — and it is why false sharing on one cache line destroys scaling."),
  E("Memory barriers and the language memory model","Acquire/release fences constrain compiler and CPU reordering; the Java Memory Model (JSR-133) and C++11 model specify exactly which reorderings are legal.","Making lock acquisition actually publish prior writes — without barriers a correct-looking lock does not synchronise anything.")],
 "empowers":"Prose only: higher-level models are typically implemented on top of threads, but none is entailed by them — an event loop needs only one thread.",
 "inheritsFrom":[{"id":"os_threads","label":"OS threads","why":"a language-level view of the kernel scheduling object"}],
 "specializesInto":[{"id":"prog_concurrency_channels___csp","label":"Channels / CSP","why":"a discipline layered on threads that replaces shared memory with handoff"}],
 "byLanguage":[
  L("Java","Platform threads 1:1 with OS threads; `synchronized`, java.util.concurrent; virtual threads since Java 21 (Loom).","Loom explicitly targeted function colouring — virtual threads look like threads, so no code changes colour.","Servers with many blocking calls; Loom makes thread-per-request viable again.","~1 MB stack per platform thread; the JMM is subtle."),
  L("C / C++","pthreads, std::thread, std::mutex, atomics with the C++11 memory model.","Direct access to the machine's actual concurrency model.","Systems work, thread pools, lock-free structures.","Data races are undefined behaviour; every classic concurrency bug is available."),
  L("Rust","std::thread plus Send/Sync marker traits enforced by the compiler.","Ownership already restricts aliasing, so extending it across threads turns data races into compile errors.","Any Rust concurrency.","Send/Sync bounds propagate through signatures and can be hard to satisfy."),
  L("Python","threading exists but the GIL blocks CPU parallelism. PEP 703 (accepted 24 Oct 2023): free-threading experimental in 3.13, officially supported in 3.14 under PEP 779.","The GIL made refcounting cheap and C extensions simple; removing it is a decade-long migration.","I/O-bound work today; CPU-bound only on free-threaded builds.","5-10% single-threaded overhead on free-threaded builds; default builds still ship the GIL."),
  L("Go","OS threads exist but are hidden — goroutines multiplex onto them; sync.Mutex available.","Go's position: threads are the wrong granularity to expose.","Rarely direct; channels are idiomatic.","The hidden scheduler makes some latency behaviour opaque.")],
 "traceDown":["kernel thread control block and run queue","futex wait queue keyed by lock address","atomic CAS instruction (lock cmpxchg / LDXR-STXR)","MESI cache-coherence traffic","store buffers and memory ordering in silicon"]},

"prog_concurrency_coroutines_async_await": {
 "definition":"Functions that can suspend and resume. The compiler rewrites them into state machines so one thread can interleave thousands of in-flight operations.",
 "does":"At each await point the function's live state is saved into a heap object and control returns to a scheduler; when the awaited result arrives, execution resumes from that point.",
 "outcome":"Enormous I/O concurrency on very few threads — bought with function colouring: async and sync become two incompatible universes.",
 "motivation":"OS threads cost megabytes of stack and slow context switches. Serving 10,000 concurrent connections with a thread each does not work — but most of those connections are merely waiting.",
 "origin":"Coroutines described by Conway in 1963. Modern async/await entered the mainstream via C# 5.0 (2012) and spread to Python, JavaScript, Rust, Dart, Kotlin and Swift.",
 "first_principles":"A blocked thread wastes a scheduling slot. If a function's resume point and live variables are captured explicitly, the machine can run something else meanwhile — the state machine is what a stack frame becomes when you refuse to keep the stack.",
 "empowered_by":[
  E("A compiler CPS / state-machine transform","The function body is split at await points into a switch over a state field; live-across-await locals are lifted into a generated struct. Rust builds an anonymous generator type; Kotlin does a CPS transform passing a Continuation.","Suspension itself — this transform is the entire mechanism, which is also why only specially-marked functions can suspend, i.e. why colouring exists."),
  E("Heap allocation for the state object","Because the frame must outlive the call that created it, the state machine lives on the heap (Rust pins it; C# boxes the builder when it actually suspends).","Letting a suspended call survive after its caller returns to the scheduler — a stack frame cannot do this by construction."),
  E("Readiness-based I/O (epoll / kqueue / IOCP / io_uring)","The runtime registers file descriptors and waits on one syscall for many of them, then resumes exactly the tasks whose I/O is ready.","Knowing when to resume — without a readiness interface the scheduler would have to poll each operation individually."),
  E("A scheduler and ready queue","Woken tasks are pushed to a run queue and executed on a small thread pool, often with work stealing (Tokio, .NET).","Deciding which resumable task runs next, and on which real thread."),
  E("OS threads underneath","Every async runtime ultimately runs its loop on one or more kernel threads.","Executing anything at all — async multiplexes work onto threads, it does not replace them.")],
 "empowers":"Prose only: structured concurrency and high-concurrency servers are commonly built on it, but Go reaches the same outcome with no async keyword at all.",
 "inheritsFrom":[{"id":"prog_concurrency_threads___mutexes","label":"Threads","why":"a scheduling discipline layered on a small number of real threads"}],
 "specializesInto":[{"id":"prog_concurrency_event_loop_node_v8","label":"Event loop","why":"the single-threaded specialisation of the scheduler"}],
 "byLanguage":[
  L("Rust","async fn returns a Future; poll-based, no built-in runtime — Tokio or async-std supplies one.","Rust removed its green-thread runtime (RFC 230) to stay runtime-free, which made stackless async the only option.","Network services, high-concurrency I/O.","Colouring; Pin and lifetime complexity; the runtime is a dependency choice that splits the ecosystem."),
  L("C#","async/await since C# 5.0 (2012) — the design every later language borrowed.","Microsoft needed responsive UIs without blocking the message pump.","I/O-bound work throughout .NET.","Colouring; async-over-sync deadlocks; `.Result` is a footgun."),
  L("JavaScript","async/await over Promises, single-threaded on the event loop.","The runtime was already single-threaded and callback-based; async/await is sugar over the Promise chain.","Everything I/O in Node and the browser.","Colouring; no CPU parallelism without Workers."),
  L("Python","async/await with asyncio since 3.5 (2015).","Same C10K pressure; the GIL made threads unattractive for I/O concurrency anyway.","I/O-bound servers, scrapers, network tools.","Colouring; sync libraries do not work under asyncio."),
  L("Kotlin","suspend functions via CPS transformation; structured concurrency with scopes.","Android needed cheap concurrency with lifecycle-aware cancellation.","Android, Ktor servers.","Colouring is hidden but present; scope and cancellation semantics take learning."),
  L("Go","Absent by deliberate choice — goroutines are stackful and hide the split entirely.","Go accepted a heavier runtime specifically to avoid colouring functions.","Never; you call the blocking function.","The heavy runtime makes cgo slow and Go poor for shared libraries.")],
 "traceDown":["compiler-generated state machine struct","heap-allocated future/task object","scheduler ready queue and work stealing","epoll / kqueue / io_uring readiness notification","NIC interrupt and DMA"]},

"prog_concurrency_channels___csp": {
 "definition":"Independent processes communicate by passing values through typed channels rather than by touching shared memory.",
 "does":"A send blocks until a receiver is ready (unbuffered) or space exists (buffered); `select` waits on several channels at once, making coordination first-class.",
 "outcome":"Ownership of data transfers with the message, so classes of race disappear by construction — provided you actually stop sharing memory, which Go does not enforce.",
 "motivation":"Locks do not compose: two individually correct locked components can deadlock when combined. Communication makes the transfer of responsibility explicit and visible.",
 "origin":"Hoare's Communicating Sequential Processes, CACM 1978. Implemented in occam in the 1980s; brought mainstream by Go in 2009, whose designers worked in that tradition.",
 "first_principles":"A race requires two parties touching one location. If the only interaction is a handoff, there is exactly one owner at every instant, and the race is unrepresentable rather than merely avoided.",
 "empowered_by":[
  E("A mutex plus wait queues inside the channel","Go's hchan holds a ring buffer, a sendq and a recvq of parked goroutines, guarded by an internal lock.","Implementing blocking send/receive — the lock-free appearance at the language level is built directly on a lock underneath."),
  E("Runtime park/unpark of the executing task","A blocked send calls into the scheduler to deschedule the goroutine and hand its slot to another, then re-queues it when a receiver arrives.","Making blocking cheap — parking a goroutine costs far less than blocking an OS thread."),
  E("Direct sender-to-receiver value copy","When a receiver is already waiting, Go copies the value straight from the sender's stack into the receiver's, skipping the buffer entirely.","Eliminating a copy in the common rendezvous case — a concrete reason unbuffered channels are fast, not merely a synchronisation nicety."),
  E("Pseudo-random poll ordering in select","`select` evaluates its ready cases in a randomised order.","Preventing systematic starvation of later cases — a deliberate fairness mechanism, not an implementation accident.")],
 "empowers":"Prose only: pipelines and worker pools are conventional uses, not dependencies.",
 "inheritsFrom":[{"id":"prog_concurrency_threads___mutexes","label":"Threads & synchronization","why":"a communication discipline built from mutexes and wait queues"}],
 "specializesInto":[],
 "byLanguage":[
  L("Go","chan T, goroutines, `select`; 'share memory by communicating'.","Pike and Thompson brought CSP from Bell Labs; Go was designed around it from day one.","Pipelines, worker pools, coordination and cancellation.","Nothing prevents sharing memory anyway; unbuffered channels deadlock easily; nil-channel semantics surprise people."),
  L("Rust","std::sync::mpsc, crossbeam, tokio::sync::mpsc.","Channels compose naturally with ownership — sending moves the value, so the sender provably cannot touch it after.","Passing work between tasks or threads.","Library rather than language feature; no `select` in std."),
  L("Clojure","core.async with go blocks — CSP implemented by macro transformation.","Hickey brought CSP to the JVM and JavaScript without runtime support.","Coordinating async work in Clojure/ClojureScript.","The macro transform limits where go blocks may appear."),
  L("Kotlin","Channels and Flow in kotlinx.coroutines.","Built on suspend functions; a natural fit for structured concurrency.","Streaming data between coroutines.","Hot vs cold flow semantics are a common confusion."),
  L("Erlang/Elixir","No channels — messages go to a process mailbox addressed by PID.","Erlang chose actors instead: identity-addressed, which survives distribution across machines.","Never; you send to a process.","Mailboxes are unbounded by default — an overload hazard.")],
 "traceDown":["hchan struct: ring buffer, sendq, recvq","goroutine park/unpark in the runtime scheduler","internal mutex guarding the channel","futex syscall on contention","atomic instructions and cache coherence"]},

"prog_concurrency_event_loop_node_v8": {
 "definition":"A single thread runs a loop: take the next ready callback, run it to completion, repeat. All I/O is non-blocking and completes by queueing a callback.",
 "does":"Polls the OS readiness interface, drains the microtask queue after every task, and executes callbacks one at a time with no preemption.",
 "outcome":"No locks, no data races, no shared-memory bugs — because only one thread ever touches your data. And no CPU parallelism: one long computation freezes everything.",
 "motivation":"A browser must stay responsive while waiting on the network, with a single-threaded DOM. Threads plus a mutable DOM would have been a disaster, so the concurrency went into I/O rather than execution.",
 "origin":"The reactor pattern predates it, but the browser's JS engine made it the default for a generation; Node.js (Dahl, 2009) carried it to the server via libuv.",
 "first_principles":"Concurrency and parallelism are different. Interleaving *waiting* needs one thread; only interleaving *computing* needs several. The event loop exploits the fact that most server work is waiting.",
 "empowered_by":[
  E("libuv's phase-ordered loop","Each turn runs fixed phases — timers, pending callbacks, poll, check (setImmediate), close — in a defined order.","Giving deterministic callback ordering; it is the concrete reason setTimeout(...,0) and setImmediate can fire in different orders."),
  E("The microtask queue, drained between macrotasks","After each macrotask the engine empties the microtask queue completely, including all resolved Promise continuations.","Promise semantics specifically — this is why an await resumes before the next timer, and why an infinite microtask chain starves the loop."),
  E("epoll / kqueue / IOCP","One syscall reports readiness for thousands of descriptors at once.","Waiting on many sockets with a single thread — the O(1) readiness interface is what makes the whole model scale."),
  E("A blocking thread pool for non-pollable work","libuv keeps a worker pool (4 threads by default, UV_THREADPOOL_SIZE) for filesystem calls, DNS and crypto, which have no portable readiness interface.","Preventing file I/O from blocking the loop — a concrete admission that the single-threaded model is not sufficient on its own."),
  E("Run-to-completion callback execution","A callback is never preempted; the loop cannot advance until it returns.","Removing the need for locks entirely — and equally, it is exactly why one long synchronous function freezes the process.")],
 "empowers":"Prose only: Promises and async/await are layered on it in JS, but async/await does not require an event loop — Rust and C# run it on multi-threaded pools.",
 "inheritsFrom":[{"id":"prog_concurrency_coroutines_async_await","label":"Coroutine scheduling","why":"the single-threaded, run-to-completion specialisation of a task scheduler"}],
 "specializesInto":[],
 "byLanguage":[
  L("JavaScript (Node/V8)","libuv loop with distinct phases; microtask queue drained after each macrotask.","The browser model carried to the server — one concept for both.","I/O-heavy servers, all browser code.","One long synchronous function blocks everything; CPU work needs Worker threads."),
  L("Dart","Single isolate with an event queue plus a higher-priority microtask queue.","Flutter's UI thread must never block a frame; isolates give parallelism without shared memory.","All Flutter UI code.","Cross-isolate communication requires copying messages."),
  L("Python","asyncio's loop, pluggable — uvloop is a faster libuv-based drop-in.","Retrofitted onto a threaded language, so both models coexist awkwardly.","asyncio servers.","Mixing blocking calls into the loop silently destroys concurrency."),
  L("Rust","No built-in loop; Tokio or async-std provides one, typically multi-threaded work-stealing.","Rust refuses to bundle a runtime, so the loop is a library choice.","Async Rust services.","Runtime fragmentation across the ecosystem."),
  L("Go / Java","No event loop exposed — the scheduler multiplexes lightweight threads instead.","These languages hide readiness-based I/O behind blocking-looking calls.","Never.","You lose the simplicity of single-threaded reasoning.")],
 "traceDown":["libuv phase order per loop turn","microtask queue drain point","epoll_wait / kqueue / IOCP syscall","NIC interrupt, DMA into ring buffers","electrical signalling on the wire"]},
}
