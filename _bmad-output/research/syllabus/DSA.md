# DSA — Complete Pattern Inventory

**Date:** 2026-07-26 · **Target:** ~2-3 YOE, India, KPIT / Persistent / Amdocs tier (non-MAANG) · **Learner profile:** slow, first-principles, needs to derive not memorise
**Total hours to interview-ready:** ~150 h full · ~95 h tier-appropriate cut
**Sources:** see `SOURCES.md`. All resource links below are VERIFIED unless marked.

> Read this first: DSA is not a list of topics, it is a list of **recognitions**. The interview skill is "in 45 seconds, which of ~20 shapes is this?" Everything below is organised around that.

---

## 1. Which pattern list is right for THIS tier — the reconciliation

Three lists dominate. They are not interchangeable. Here is what each actually is and what to do with it.

| List | Size | Composition | Built for | Verdict for this tier |
|---|---|---|---|---|
| **Striver A2Z** (VERIFIED counts) | 474 problems, 18 steps | Step1 Basics 54 · Step2 Sorting 7 · Step3 Arrays 40 · Step4 Binary Search 32 · Step5 Strings 15 · Step6 LinkedList 31 · Step7 Recursion 25 · Step8 Bit 18 · Step9 Stack/Queue 30 · Step10 SlidingWindow+2Ptr 12 · Step11 Heaps 17 · Step12 Greedy 15 · Step13 BinaryTrees 38 · Step14 BST 16 · Step15 Graphs 53 · Step16 DP 55 · Step17 Tries 7 · Step18 Strings-Adv 9 | Indian product+service interviews, teaching from zero | **Use as the CURRICULUM SPINE.** It is the only one of the three that teaches fundamentals before problems (Step 1 = 54 problems of basics). A slow learner needs that ramp. But 474 problems is ~3x too many — take the ordering, not the volume. |
| **NeetCode 150** (counts SEARCH-DERIVED, see SOURCES.md) | 150 problems, 18 categories, ≈28 Easy / 97 Medium / 25 Hard | Arrays&Hashing 9 · TwoPointers 5 · SlidingWindow 6 · Stack 8 · BinarySearch 7 · LinkedList 6 · Trees 15 · Tries 3 · Heap 3 · Backtracking 9 · Graphs 13 · AdvGraphs 6 · 1D-DP 12 · 2D-DP 11 · Greedy 8 · Intervals 6 · Math&Geometry ~8 · BitManip ~7 | FAANG screening | **Use as the PATTERN TAXONOMY + video companion, not the problem set.** Its difficulty mix (65% Medium, 17% Hard) is calibrated for FAANG. At KPIT tier that mix wastes ~40% of study time on Hard problems that will never be asked. |
| **LeetCode Top Interview 150** | 150 problems | Array/String, Two Pointers, Sliding Window, Matrix, Hashmap, Intervals, Stack, Linked List, Binary Tree (General + BFS + BST), Graph (General + BFS), Trie, Backtracking, Divide & Conquer, Kadane, Binary Search, Heap, Bit Manipulation, Math, 1D/Multi-D DP | Broad "top companies" screen | **Use as the CHECKLIST for coverage gaps only.** Its category naming is the closest to how interviewers actually phrase topics. |

### The decision

**Spine = Striver's ordering. Taxonomy = NeetCode's 18 categories. Volume = neither — use the table in §3.**

Why: Striver front-loads *basics* (recursion, sorting, LL manipulation) that both other lists assume you already have. A slow first-principles learner who starts with NeetCode's Arrays & Hashing will hit "Longest Consecutive Sequence" in week one and conclude they are bad at this. That is the single most common failure mode.

### What none of the three lists contain — and this tier requires

**Pattern-printing and number-series problems.** Star pyramids, Floyd's triangle, Pascal's triangle, Armstrong/perfect/palindrome numbers, digit manipulation. These have near-zero presence on LeetCode-style lists because they are not algorithmically interesting — but they are genuinely asked in KPIT / Amdocs / TCS-class L1 coding rounds, and a candidate who has only ground NeetCode will fumble a nested-loop star pattern on a whiteboard. Budget 3 hours. This is the highest-ROI-per-hour block in the entire DSA syllabus for this specific tier.

---

## 2. Prerequisite ordering (do not deviate — this is the dependency graph)

```
Complexity analysis (Big-O)
  └─ Arrays & traversal
      ├─ Hashing ──────────────┐
      ├─ Two pointers          │
      │   └─ Sliding window    │
      ├─ Sorting + comparators │
      │   └─ Intervals         │
      ├─ Binary search (array) │
      │   └─ Binary search on answer
      ├─ Strings ──────────────┤
      └─ Matrix                │
                               │
Stack & Queue ─────────────────┤
  └─ Monotonic stack           │
                               │
Linked List ───────────────────┤
                               │
*** RECURSION (HARD GATE) ***  │
  ├─ Backtracking              │
  ├─ Trees ────────────────────┤
  │   ├─ BST                   │
  │   └─ Tries                 │
  ├─ Graphs (DFS/BFS)          │
  │   ├─ Cycle detect / Topo sort
  │   ├─ Union-Find            │
  │   └─ Dijkstra / MST        │
  └─ Dynamic Programming ──────┘
        (1D → knapsack → strings → grid → advanced)

Heaps ── after sorting, before graphs (needed for Dijkstra)
Greedy ── after sorting
Bit manipulation / Math ── independent, insert anywhere as a light day
Pattern printing ── week 1, as loop practice
```

**The hard gate is recursion.** Do not permit Trees, Graphs, Backtracking or DP until the learner can, unprompted, draw the call stack for a recursive function on paper and state what each frame holds. Slow learners who skip this stall for 3-6 weeks in Trees and misdiagnose it as "I'm bad at trees."

---

## 3. The pattern table — complete inventory

Columns: **P** = problems to competence · **Mix** = Easy/Medium/Hard · **Freq** = frequency at THIS tier · **H** = hours

| # | Pattern | P | Mix | Freq | Verdict | H |
|---|---|---|---|---|---|---|
| 0 | Big-O / space-time analysis, amortised cost | — | — | **HIGH** | Asked verbally on every problem | 4 |
| 1 | Pattern printing & number series (nested loops) | 8 | 8/0/0 | **HIGH at this tier only** | NON-NEGOTIABLE — KPIT/Amdocs L1 | 3 |
| 2 | Array traversal, in-place ops, prefix sum, Kadane | 12 | 6/6/0 | **HIGH** | NON-NEGOTIABLE | 10 |
| 3 | Hashing — freq map, set, map-of-index | 12 | 6/6/0 | **HIGHEST** | NON-NEGOTIABLE | 9 |
| 4 | Two pointers (opposite ends, sorted) | 10 | 4/6/0 | **HIGH** | NON-NEGOTIABLE | 7 |
| 5 | Fast & slow pointers (cycle, middle) | 6 | 3/3/0 | **HIGH** | NON-NEGOTIABLE | 4 |
| 6 | Sliding window — fixed size | 6 | 4/2/0 | **HIGH** | NON-NEGOTIABLE | 5 |
| 7 | Sliding window — variable size | 8 | 2/6/0 | **HIGH** | Required | 7 |
| 8 | Sorting (know merge/quick by hand) + custom comparators | 8 | 4/4/0 | **HIGH** | NON-NEGOTIABLE — "implement merge sort" is a real question here | 6 |
| 9 | Binary search on a sorted array (+ variants: first/last occurrence, rotated) | 8 | 4/4/0 | **HIGH** | NON-NEGOTIABLE | 6 |
| 10 | Binary search on the answer space | 6 | 0/5/1 | MED | Persistent yes, KPIT rarely | 6 |
| 11 | Intervals — merge, insert, overlap, meeting rooms | 6 | 1/5/0 | **HIGH** | Required | 5 |
| 12 | Strings — palindrome, anagram, reverse words, parsing, tokenising | 12 | 7/5/0 | **HIGHEST** | NON-NEGOTIABLE — service cos love string manipulation | 8 |
| 13 | Matrix — spiral, rotate 90°, transpose, search-2D, row/col ops | 8 | 4/4/0 | **HIGH** | NON-NEGOTIABLE at this tier | 5 |
| 14 | Stack — valid parens, expression eval, infix↔postfix↔prefix | 8 | 4/4/0 | **HIGH** | Required (infix/postfix is a viva favourite) | 6 |
| 15 | Monotonic stack — next greater/smaller, histogram | 6 | 0/5/1 | MED | Learn NGE; histogram optional | 6 |
| 16 | Queue / Deque — implement queue-with-stacks, sliding window max, LRU | 5 | 0/4/1 | MED | LRU doubles as an LLD answer | 5 |
| 17 | Linked List — reverse, merge, remove-Nth, palindrome, intersection, DLL | 12 | 5/7/0 | **HIGH** | NON-NEGOTIABLE | 9 |
| 18 | **Recursion fundamentals** — subsequences, tail vs non-tail, call-stack tracing | 10 | 6/4/0 | **HIGH** | NON-NEGOTIABLE (gate) | 10 |
| 19 | Backtracking — subsets, permutations, combination sum, N-Queens, rat-in-maze, sudoku | 10 | 0/8/2 | MED-HIGH | Subsets/permutations required; N-Queens explain-only | 10 |
| 20 | Binary tree traversals — pre/in/post recursive AND iterative, level-order | 10 | 6/4/0 | **HIGH** | NON-NEGOTIABLE | 8 |
| 21 | Tree properties — height, diameter, balanced, mirror, identical, views (L/R/top/bottom), LCA, path sum | 12 | 4/8/0 | **HIGH** | Required | 9 |
| 22 | BST — search/insert/delete, validate, kth smallest, inorder successor, BST↔sorted array | 10 | 4/6/0 | **HIGH** | Required | 7 |
| 23 | Heap / Priority Queue — build heap, heapify, top-K, k-largest, merge k lists, median stream | 8 | 2/5/1 | MED | Top-K is the only must; know heapify by hand | 6 |
| 24 | Graph representation (adj list vs matrix) + BFS + DFS + connected components | 10 | 3/7/0 | MED-HIGH | Required | 9 |
| 25 | Cycle detection — directed (colour/rec-stack) vs undirected (parent) | 4 | 0/4/0 | MED | Required for Persistent | 4 |
| 26 | Topological sort (Kahn + DFS) | 4 | 0/4/0 | MED | Required for Persistent | 4 |
| 27 | Union-Find / DSU (+ path compression, union by rank) | 4 | 0/3/1 | LOW-MED | Nice-to-have | 4 |
| 28 | Dijkstra / shortest path (+ Bellman-Ford name-level) | 3 | 0/2/1 | LOW | Explain, don't grind | 3 |
| 29 | MST — Prim, Kruskal | 2 | 0/1/1 | LOW | **SKIPPABLE** — theory answer suffices | 1.5 |
| 30 | Greedy — activity selection, fractional knapsack, job sequencing, min platforms | 8 | 3/5/0 | MED-HIGH | Required | 6 |
| 31 | DP 1D — fib memo→tab→space-optimised, climbing stairs, house robber, min-cost-climb | 8 | 4/4/0 | **MED-HIGH** | The only truly required DP block | 9 |
| 32 | DP 0/1 knapsack family — subset sum, equal partition, target sum, coin change | 6 | 0/6/0 | MED | Required at Persistent | 7 |
| 33 | DP strings — LCS, edit distance, longest palindromic subsequence | 6 | 0/5/1 | MED | LCS + edit distance only | 7 |
| 34 | DP grid — unique paths, min path sum, obstacle grid | 4 | 2/2/0 | MED | Required | 4 |
| 35 | DP advanced — LIS, MCM, partition DP, palindrome partitioning | 5 | 0/2/3 | LOW | **SKIPPABLE at this tier** — describe only | 5 |
| 36 | Bit manipulation — set/clear/toggle, count set bits, XOR tricks, power of 2, single number | 8 | 5/3/0 | MED-HIGH | Cheap, high ROI, viva-friendly | 5 |
| 37 | Tries — insert/search/prefix | 4 | 0/3/1 | LOW | **SKIPPABLE** (know the shape for autocomplete LLD) | 3 |
| 38 | Math / number theory — sieve, GCD/LCM, modular arithmetic, digit ops, base conversion | 8 | 6/2/0 | MED-HIGH | Amdocs aptitude↔coding overlap | 5 |

**Totals:** ~300 problems if everything · **~175 problems for the tier-appropriate cut** (drop rows 10, 15 partial, 27-29, 35, 37 and trim the Hard column everywhere).

### Is DP needed at KPIT tier?

**Partially — and the honest answer matters.** Evidence: the VERIFIED GfG DP bank splits 8 Easy / 24 Medium / 11 Hard, and the *Medium* band is where service-company DP lives — coin change, 0/1 knapsack, LCS, edit distance, unique paths. Expect **at most one Medium DP question**, and often zero. Rows 31-34 = learn properly. Row 35 (LIS / MCM / partition DP) = FAANG noise here; be able to say "that's an O(n²) interval DP, I'd memoise over (i,j)" and move on. Do not spend three weeks on it.

---

## 4. Misconception traps — the understanding-vs-memorisation separator

Each trap below has a **breakable experiment**: a concrete input where the memorised version visibly produces the wrong answer. Run the experiment. Watching your own code fail is what makes it stick.

### T1 — Sliding window: "shrink with `if`" vs "shrink with `while`"
**Trap:** Learners write `if (windowInvalid) left++;` because it works on their first test case.
**Break it:** Longest substring without repeating characters on `"abba"`. With `if`, when the second `a` arrives, `left` advances only one step and the window still contains a duplicate → answer 3 instead of 2.
**Understanding:** the window may need to shrink *many* steps per right-step. Amortised O(n) comes from left never moving backwards, not from moving once.

### T2 — Two pointers requires SORTED input
**Trap:** Applying the two-pointer sum technique to an unsorted array.
**Break it:** Two-sum on `[3, 2, 4]`, target 6. Opposite-end pointers give 3+4=7 → move right → 3+2=5 → no answer. Correct answer is (2,4).
**Understanding:** two pointers is a *monotonicity* argument. No sorted order → no monotonicity → the technique is invalid. Unsorted two-sum is a hashing problem, not a two-pointer problem.

### T3 — Binary search overflow and the `mid` formula
**Trap:** `mid = (low + high) / 2`.
**Break it:** In a 32-bit signed language with `low = 2_000_000_000`, `high = 2_100_000_000`, the sum overflows to negative and `mid` lands outside the array. (In Dart/Python it silently won't overflow — which is *worse*, because the candidate never learns the idiom and gets caught in a Java/C++ interview.)
**Understanding:** `mid = low + (high - low) ~/ 2`. Also: the loop-condition choice (`low <= high` vs `low < high`) and the update (`high = mid` vs `high = mid - 1`) must be chosen *together* or you get an infinite loop. Trace `[5]` searching for 5 with each combination.

### T4 — Recursion: the return value vs the side effect
**Trap:** Writing a recursive function that mutates a shared list AND returns a value, then being unable to explain which one carries the answer.
**Break it:** Subsets of `[1,2,3]` where the result list is appended without copying — `result.add(current)`. Print the result: you get 8 entries that are all the *same* (empty, or full) list, because you stored 8 references to one mutable object.
**Understanding:** backtracking stores *snapshots*. `result.add(List.from(current))`. This single bug costs slow learners days.

### T5 — Backtracking: forgetting to undo
**Trap:** `current.add(x); recurse();` with no `current.removeLast()`.
**Break it:** Permutations of `[1,2]` → the `current` list grows monotonically and you get garbage.
**Understanding:** the "back" in backtracking is the state restoration. Every mutation before a recursive call needs an inverse after it.

### T6 — Linked list: losing the head
**Trap:** Reversing a list by reassigning `head` before saving `head.next`.
**Break it:** Reverse `1→2→3`. Without `next = curr.next` saved first, after `curr.next = prev` you have no route to node 2. Output: `1` only.
**Understanding:** three pointers, in the order save→rewire→advance. Draw it with three fingers on paper before writing code.

### T7 — Trees: "level order needs a queue, not recursion depth"
**Trap:** Trying to do level-order with recursion and no level bookkeeping, producing a flat list with no level boundaries.
**Break it:** Any tree where two nodes at different depths must be separated. Ask for "right side view" — a flat DFS gives the wrong node.
**Understanding:** BFS = queue + *snapshot the queue size at the start of each level*. That size-snapshot is the whole trick.

### T8 — BST: "validate by checking node vs its children"
**Trap:** `node.left.val < node.val && node.right.val > node.val`, recursed.
**Break it:**
```
      10
     /  \
    5    15
        /  \
       6    20
```
Every local parent-child check passes, but 6 is in the right subtree of 10 and is less than 10 → not a BST. Local checking says valid. It is not.
**Understanding:** BST validity is a *range* property (min, max) propagated down, or equivalently "inorder traversal is strictly increasing."

### T9 — DP: memoisation without the right state
**Trap:** Memoising on `i` alone in 0/1 knapsack.
**Break it:** Items `[(w=1,v=1),(w=3,v=4),(w=4,v=5)]`, capacity 4. Caching by index only returns a stale answer because the same index is reachable with different remaining capacities.
**Understanding:** the memo key must be exactly the set of parameters that vary and affect the result. If you can't name the state, you can't write the DP. Always write the recurrence in words first: *"f(i, cap) = best value using items i..n with cap remaining."*

### T10 — Graphs: `visited` marked at pop time instead of push time
**Trap:** In BFS, marking a node visited when you dequeue it.
**Break it:** A graph where node D is adjacent to both B and C, and both are in the queue. D gets enqueued twice → processed twice → wrong level assigned in shortest-path BFS, and on a dense graph the queue blows up.
**Understanding:** mark visited at *enqueue* time in BFS. (DFS differs — that's the point of the distinction.)

### T11 — Cycle detection: undirected vs directed are different algorithms
**Trap:** Using the same `visited` check for both.
**Break it:** Undirected edge `A—B`. DFS from A visits B; B sees A already visited and reports a cycle. False positive — you came from A.
**Understanding:** undirected needs a *parent* exclusion; directed needs a *recursion-stack* (grey/black) marker, because a visited node that is no longer on the stack is not a cycle.

### T12 — Hashing: mutable keys
**Trap:** Using a list/array as a hash key and then mutating it.
**Break it:** In Dart/Python, put a list in a map, mutate it, then look it up — the lookup misses because the hash changed.
**Understanding:** hash keys must be immutable, and `==`/`hashCode` must agree. This is the same contract as the OOP `equals`/`hashCode` question (see `OOP.md`) — one insight, two subjects.

### T13 — Kadane's: the all-negative array
**Trap:** Initialising `maxSoFar = 0`.
**Break it:** `[-3, -1, -2]` → returns 0, which is not a valid subarray sum. Correct answer is -1.
**Understanding:** initialise to the first element, not zero, unless empty subarrays are explicitly allowed. Always ask the interviewer "can the subarray be empty?"

### T14 — Sorting stability
**Trap:** Assuming any sort preserves the order of equal keys.
**Break it:** Sort employees by department only; quicksort scrambles the within-department name order that a previous sort established. Multi-key sorting via two passes silently breaks.
**Understanding:** merge sort is stable, quicksort and heapsort are not. Either use a stable sort or a compound comparator.

### T15 — "O(n log n) is always better than O(n²)"
**Trap:** Reciting complexity without constants.
**Break it:** Insertion sort beats merge sort on n=20 and on nearly-sorted input. This is why real library sorts (Timsort, introsort) switch to insertion sort under a threshold.
**Understanding:** Big-O describes growth, not speed. Interviewers at this tier love the follow-up "so is quicksort always faster?"

---

## 5. Mastery tests — what proves each block is actually known

| Block | Mastery test (no hints, no IDE autocomplete, spoken aloud while coding) |
|---|---|
| Complexity | Given code you have never seen, state time AND space complexity and justify each in one sentence. Correctly explain why appending to a dynamic array is amortised O(1). |
| Pattern printing | Produce a right-aligned star pyramid of height n **on the first attempt**, on paper. |
| Arrays / prefix / Kadane | Solve max-subarray including the all-negative case; then answer "make it return the indices too" without restarting. |
| Hashing | Solve two-sum and group-anagrams; then answer "what if the array doesn't fit in memory?" coherently. |
| Two pointers | State *why* the input must be sorted before you write a line. |
| Sliding window | Write the variable-size template from memory and name the three decision points (expand, shrink condition, record answer). |
| Sorting | Implement merge sort on paper, then state which of merge/quick/heap is stable and why it matters. |
| Binary search | Write it bug-free with the correct `mid` idiom, then adapt it to first-occurrence without rewriting from scratch. |
| Intervals | Solve merge-intervals and explain why sorting by start (not end) is correct here, but activity-selection sorts by end. |
| Strings | Reverse the words in a sentence in-place, and explain your language's string immutability cost. |
| Matrix | Rotate 90° in place; explain the transpose+reverse decomposition. |
| Stack | Convert infix to postfix on paper with correct precedence and associativity. |
| Linked list | Reverse a list on paper with three named pointers; then do it recursively and state the space difference. |
| **Recursion** | **Draw the full call stack for `fib(4)` and count the calls. State the recurrence, base case, and why it's exponential.** (This is the gate. If this fails, stop and repeat.) |
| Backtracking | Generate all subsets and correctly explain the copy-vs-reference bug (T4) before being told about it. |
| Trees | Do inorder traversal **iteratively** with an explicit stack; then produce the right-side view. |
| BST | Correctly reject the T8 counterexample tree and explain the range-propagation fix. |
| Heap | Explain heapify's O(n) build vs n×O(log n) insertion. Solve top-K and justify heap-of-size-k over full sort. |
| Graphs | Implement BFS and DFS from an adjacency list from memory; state where `visited` is marked and why. |
| Topo sort | Produce a valid ordering by hand via Kahn's; explain what a cycle does to the algorithm. |
| Greedy | Prove (informally) why activity-selection-by-earliest-end is optimal; then give a case where greedy fails and DP is needed. |
| DP | Take one problem from recursion → memoisation → tabulation → space-optimised, narrating the state at each step. |
| Bit manipulation | Count set bits three ways; explain `n & (n-1)`. |
| Math | Write the sieve; state its complexity and why it's not O(n log n). |

**Global gate (from project CLAUDE.md):** solve 5 problems without looking at solutions AND verbalise the misconception trap for each.

---

## 6. Resources — one best link per cluster

| Cluster | Resource | Status |
|---|---|---|
| **Curriculum spine + ordering** | https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/ | VERIFIED |
| **Pattern taxonomy + when-to-use** | https://blog.algomaster.io/p/15-leetcode-patterns | VERIFIED |
| **Array problem bank (18E/20M/10H + 22 theory Qs)** | https://www.geeksforgeeks.org/dsa/top-50-array-coding-problems-for-interviews/ | VERIFIED |
| **DP problem bank (8E/24M/11H)** | https://www.geeksforgeeks.org/dsa/top-50-dynamic-programming-coding-problems-for-interviews/ | VERIFIED |
| **Cross-check pattern collections (DP-20, bit, heap, string)** | https://github.com/ashishps1/awesome-leetcode-resources | VERIFIED |
| Video walkthroughs by pattern | https://neetcode.io/practice | **UNVERIFIED** (JS-rendered; URL live but content not machine-confirmed) |

---

## 7. Hour budget summary

| Block | Full | Tier cut |
|---|---|---|
| Foundations (complexity, patterns, arrays, hashing, 2ptr, window, sorting, bsearch, strings, matrix) | 63 | 55 |
| Linear structures (stack, mono-stack, queue, linked list) | 26 | 20 |
| Recursion + backtracking | 20 | 15 |
| Trees + BST + heap | 30 | 24 |
| Graphs (all) | 25 | 9 |
| Greedy | 6 | 4 |
| DP (all) | 32 | 13 |
| Bit / math / tries / intervals | 18 | 13 |
| **Total** | **~150 h** | **~95 h** |

At a slow learner's realistic 3 h/weekday + 6 h/weekend (~27 h/week), the tier cut is ~4 weeks of DSA-only time — which in a mixed curriculum means ~8-10 calendar weeks. Plan accordingly; do not promise 30 days for full DSA.
