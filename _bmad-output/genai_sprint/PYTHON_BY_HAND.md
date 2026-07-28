# PYTHON BY HAND — TCS Gen AI Engineer, 01 Aug 2026

**Companion file:** `PYTHON_CONCEPTS.md` (decorators, GIL, asyncio-for-LLMs, OOP).
**Evidence:** `research/GENAI_INTERVIEW_REALITY.md` §1.5 [V, 2/3 TCS sources].
Python asked is **basic-to-intermediate, NOT LeetCode-hard**. S3 explicitly:
*"write code to find the second largest number in a list without using built-in
functions, and provide test cases."* One technical round. **Assume paper, no IDE.**

Every solution below was executed and passes its asserts. No DP, no graphs, no
LeetCode. If a question here feels hard, it's the wrong question — skip it.

---

## HOW TO USE EACH ENTRY

Each question has: **ASKED AS** (interviewer phrasing) → **VARIATIONS** (the same
concept re-worded; the exact wording will not repeat) → **SOLUTION** (handwritable)
→ **TEST CASES** (write these *unprompted* — that is the seniority signal) →
**EDGES** → **FOLLOW-UP** (what they ask next) → **COMPLEXITY** (one sentence).

---

# PART A — CODING BY HAND (Q1–Q10)

## Q1. Second largest — THE one with direct TCS evidence

**ASKED AS:** "Write a function to find the second largest number in a list.
Don't use built-in functions like `max()` or `sort()`. Then give me test cases."

**VARIATIONS**
1. Second *smallest* — flip every comparison.
2. **k-th** largest.
3. Second largest **when duplicates count as separate positions** (`[5,5,3]` → 5,
   not 3). **Always ask which they mean.** Default assumption: distinct values.
4. Second largest **in one pass** (the solution below already is one pass — say so).

```python
def second_largest(nums):
    if nums is None or len(nums) < 2:
        return None
    first = second = None
    for n in nums:
        if first is None or n > first:
            second = first
            first = n
        elif n != first and (second is None or n > second):
            second = n
    return second
```

**TEST CASES — write these before they ask**
```python
assert second_largest([1, 2, 3, 4, 5]) == 4     # normal
assert second_largest([3, 1, 4, 4, 5]) == 4     # duplicates present
assert second_largest([5, 5, 5]) is None        # all identical -> no 2nd distinct
assert second_largest([2, 1]) == 1              # exactly two
assert second_largest([1]) is None              # single element
assert second_largest([]) is None               # empty
assert second_largest(None) is None             # None input
assert second_largest([-3, -1, -7]) == -3       # all negatives
```

**EDGES:** all-identical (the one everybody fails — `0` or `-inf` sentinels break
here, which is why I use `None`), negatives (never initialise with `0`), two-element
list, `None` input.

**FOLLOW-UP:** *"Now k-th largest."* / *"What if the list is a billion numbers?"*
(one pass, O(1) memory — this already streams; for k-th, keep a k-sized structure).

**COMPLEXITY:** One pass over the list, so O(n) time and O(1) extra space.

**Variation 2 — k-th largest (distinct), selection sort of only k elements:**
```python
def kth_largest(nums, k):
    if nums is None or k < 1:
        return None
    uniq = []
    for n in nums:
        if n not in uniq:
            uniq.append(n)
    if k > len(uniq):
        return None
    for i in range(k):
        m = i
        for j in range(i + 1, len(uniq)):
            if uniq[j] > uniq[m]:
                m = j
        uniq[i], uniq[m] = uniq[m], uniq[i]
    return uniq[k - 1]
# kth_largest([3,1,4,4,5], 2) == 4 ; kth_largest([1,1], 2) is None
```
O(n·k) time. Say aloud: *"for large k I'd use a heap — O(n log k)."*

**Variation 1 — second smallest:** same shape, `<` instead of `>`.
```python
def second_smallest(nums):
    if nums is None or len(nums) < 2:
        return None
    a = b = None
    for n in nums:
        if a is None or n < a:
            b = a; a = n
        elif n != a and (b is None or n < b):
            b = n
    return b
```

---

## Q2. Reverse without built-ins

**ASKED AS:** "Reverse a string without using `reversed()` or slicing."

**VARIATIONS:** reverse a list **in place**; reverse **the order of words** in a
sentence; check if a string reads the same reversed (→ Q5).

```python
def reverse_string(s):
    out = ""
    i = len(s) - 1
    while i >= 0:
        out += s[i]
        i -= 1
    return out

def reverse_list_inplace(a):
    i, j = 0, len(a) - 1
    while i < j:
        a[i], a[j] = a[j], a[i]
        i += 1; j -= 1
    return a

def reverse_words(s):
    words = s.split()
    out = []
    for i in range(len(words) - 1, -1, -1):
        out.append(words[i])
    return " ".join(out)
```

**TEST CASES**
```python
assert reverse_string("hello") == "olleh"
assert reverse_string("") == ""
assert reverse_string("a") == "a"
assert reverse_list_inplace([1,2,3,4]) == [4,3,2,1]
assert reverse_list_inplace([]) == []
assert reverse_words("the sky  is blue") == "blue is sky the"   # double space
```

**EDGES:** empty string, single char, multiple spaces between words (`.split()`
with no args collapses them — mention that).

**FOLLOW-UP:** *"`out += s[i]` in a loop — any problem?"* → **Yes: strings are
immutable, so each `+=` builds a new string, O(n²) overall. Production code builds
a list and `"".join()`s it.** Volunteering this is a strong signal.

**COMPLEXITY:** O(n) comparisons; the naive string concat is O(n²) — the in-place
list version is O(n) time, O(1) space.

---

## Q3. Character / word frequency

**ASKED AS:** "Count how many times each character appears in a string."

**VARIATIONS:** word frequency in a paragraph; **top N most frequent words**;
count only alphabetic chars, case-insensitive; find chars appearing exactly once (→ Q10).

```python
def char_freq(s):
    freq = {}
    for ch in s:
        freq[ch] = freq.get(ch, 0) + 1
    return freq

def top_n_words(text, n):
    freq = {}
    for w in text.lower().split():
        freq[w] = freq.get(w, 0) + 1
    items = sorted(freq.items(), key=lambda kv: (-kv[1], kv[0]))
    return items[:n]
```

**TEST CASES**
```python
assert char_freq("aab") == {"a": 2, "b": 1}
assert char_freq("") == {}
assert top_n_words("a b a c b a", 2) == [("a", 3), ("b", 2)]
```

**EDGES:** empty input, case sensitivity (**ask**: is "A" the same as "a"?),
punctuation, ties in top-N (I break ties alphabetically — say so).

**FOLLOW-UP:** *"Do you know `collections.Counter` / `defaultdict`?"* → Yes:
`Counter(s)` does this, `Counter(words).most_common(n)` does top-N. **Say you know
it but wrote it manually because they said no built-ins.**

**COMPLEXITY:** O(n) to count; top-N adds an O(m log m) sort over m distinct words.

---

## Q4. Remove duplicates, preserve order

**ASKED AS:** "Remove duplicates from a list but keep the original order."

**VARIATIONS:** dedupe a list of dicts **by a key** (very RAG-relevant — dedupe
retrieved chunks by `doc_id`); dedupe *without* using a `set`; **return only the
items that appeared more than once**.

```python
def dedupe(items):
    seen = set()
    out = []
    for x in items:
        if x not in seen:
            seen.add(x)
            out.append(x)
    return out

def dedupe_key(rows, key):
    seen = set()
    out = []
    for r in rows:
        k = r[key]
        if k not in seen:
            seen.add(k)
            out.append(r)
    return out
```

**TEST CASES**
```python
assert dedupe([3, 1, 3, 2, 1]) == [3, 1, 2]
assert dedupe([]) == []
assert dedupe([1, 1, 1]) == [1]
assert dedupe_key([{"id":1},{"id":1},{"id":2}], "id") == [{"id":1},{"id":2}]
```

**EDGES:** empty, all-identical, **unhashable elements** (lists/dicts can't go in a
set — then you fall back to an O(n²) `in list` check), order-preservation itself.

**FOLLOW-UP:** *"Why not `list(set(items))`?"* → **It loses order and requires
hashable items.** *"Since Python 3.7 dicts keep insertion order"* → so
`list(dict.fromkeys(items))` is the one-liner. Name it; you wrote the loop because
built-ins were barred.

**COMPLEXITY:** O(n) time with a set; O(n) extra space for `seen`.

---

## Q5. Palindrome check

**ASKED AS:** "Check whether a string is a palindrome, ignoring case, spaces and
punctuation."

**VARIATIONS:** palindrome **number** without converting to string; check if a
string *can be rearranged* into a palindrome (at most one odd count); recursive version.

```python
def is_palindrome(s):
    cleaned = ""
    for ch in s.lower():
        if ("a" <= ch <= "z") or ("0" <= ch <= "9"):
            cleaned += ch
    i, j = 0, len(cleaned) - 1
    while i < j:
        if cleaned[i] != cleaned[j]:
            return False
        i += 1; j -= 1
    return True

def is_palindrome_num(n):
    if n < 0:
        return False
    rev, x = 0, n
    while x > 0:
        rev = rev * 10 + x % 10
        x //= 10
    return rev == n
```

**TEST CASES**
```python
assert is_palindrome("A man, a plan, a canal: Panama")
assert is_palindrome("") is True          # state your convention out loud
assert is_palindrome("aba")
assert is_palindrome("ab") is False
assert is_palindrome_num(121) and is_palindrome_num(0)
assert is_palindrome_num(-121) is False
```

**EDGES:** empty string (**declare your convention**: I treat it as a palindrome),
single char, all punctuation (`"!!!"` cleans to `""`), negative numbers, case.

**FOLLOW-UP:** *"Do it without building the cleaned copy."* → two pointers that
skip non-alphanumerics in place, O(1) extra space.

**COMPLEXITY:** O(n) time; O(n) space for the cleaned copy, O(1) with two pointers.

---

## Q6. Flatten a nested list

**ASKED AS:** "Flatten an arbitrarily nested list into a flat list."

**VARIATIONS:** flatten **one level only**; flatten **iteratively** (no recursion);
**flatten a nested dict** into dotted keys — this one is genuinely useful for
LLM JSON output and worth volunteering.

```python
def flatten(items):
    out = []
    for x in items:
        if isinstance(x, list):
            out.extend(flatten(x))
        else:
            out.append(x)
    return out

def flatten_iter(items):
    out = []
    stack = list(items)[::-1]
    while stack:
        x = stack.pop()
        if isinstance(x, list):
            stack.extend(x[::-1])
        else:
            out.append(x)
    return out

def flatten_dict(d, prefix=""):
    out = {}
    for k, v in d.items():
        key = k if not prefix else prefix + "." + k
        if isinstance(v, dict):
            out.update(flatten_dict(v, key))
        else:
            out[key] = v
    return out
```

**TEST CASES**
```python
assert flatten([1, [2, [3, [4]]], 5]) == [1, 2, 3, 4, 5]
assert flatten([]) == []
assert flatten([[], [[]]]) == []          # empty nesting collapses to nothing
assert flatten_iter([1, [2, [3, [4]]], 5]) == [1, 2, 3, 4, 5]
assert flatten_dict({"a": {"b": 1}, "c": 2}) == {"a.b": 1, "c": 2}
```

**EDGES:** empty list, list of empties, deep nesting (**recursion limit ~1000 —
that's why the iterative version exists**), strings (a `str` is iterable; using
`isinstance(x, list)` rather than "is it iterable" avoids infinitely splitting chars).

**FOLLOW-UP:** *"What if nesting is 10,000 deep?"* → `RecursionError`; use the
explicit-stack version. *"What about tuples too?"* → `isinstance(x, (list, tuple))`.

**COMPLEXITY:** O(total elements) time; recursion depth equals nesting depth.

---

## Q7. FizzBuzz-style rule logic

**ASKED AS:** "Print 1 to n, but 'Fizz' for multiples of 3, 'Buzz' for 5,
'FizzBuzz' for both."

**VARIATIONS:** arbitrary rule table (7→"Seven"); return a list instead of printing;
sum every number that was *not* replaced.

```python
def fizzbuzz(n):
    out = []
    for i in range(1, n + 1):
        s = ""
        if i % 3 == 0:
            s += "Fizz"
        if i % 5 == 0:
            s += "Buzz"
        out.append(s if s else str(i))
    return out

def fizzbuzz_rules(n, rules):        # rules = [(3,"Fizz"), (5,"Buzz")]
    out = []
    for i in range(1, n + 1):
        s = ""
        for d, w in rules:
            if i % d == 0:
                s += w
        out.append(s or str(i))
    return out
```

**TEST CASES**
```python
assert fizzbuzz(5) == ["1", "2", "Fizz", "4", "Buzz"]
assert fizzbuzz(15)[-1] == "FizzBuzz"
assert fizzbuzz(0) == []
assert fizzbuzz_rules(7, [(7, "Seven")])[-1] == "Seven"
```

**EDGES:** n = 0 and negative n (empty list), 15 (both rules), mixed str/int return
types — **say you're returning all strings for a consistent type**.

**FOLLOW-UP:** *"Now without any `if`."* / *"Make the rules configurable"* — the
second version is the answer; write it if you have time, it reads as senior.

**COMPLEXITY:** O(n) with a fixed rule set, O(n·r) with r rules.

---

## Q8. Merge two dictionaries

**ASKED AS:** "Merge two dicts. What happens on key conflicts?"

**VARIATIONS:** **deep** merge (nested dicts); merge **summing** conflicting values
(merging token-usage counters); merge where the **first** dict wins.

```python
def merge(a, b):                 # b wins on conflict
    out = dict(a)
    out.update(b)
    return out

def deep_merge(a, b):
    out = dict(a)
    for k, v in b.items():
        if k in out and isinstance(out[k], dict) and isinstance(v, dict):
            out[k] = deep_merge(out[k], v)
        else:
            out[k] = v
    return out

def merge_sum(a, b):
    out = dict(a)
    for k, v in b.items():
        out[k] = out.get(k, 0) + v
    return out
```

**TEST CASES**
```python
assert merge({"x": 1}, {"x": 2, "y": 3}) == {"x": 2, "y": 3}
assert deep_merge({"c": {"a":1,"b":2}}, {"c": {"b":9,"d":4}}) == {"c": {"a":1,"b":9,"d":4}}
assert merge_sum({"a":1,"b":2}, {"b":3}) == {"a":1, "b":5}
```

**EDGES:** conflicting keys (**ask who wins**), empty dicts, nested values,
**mutating the input** — `dict(a)` copies so `a` is untouched; say that aloud.

**FOLLOW-UP:** *"Python 3.9+ shortcut?"* → `a | b`. *"3.5+?"* → `{**a, **b}`.
*"Is `{**a, **b}` a deep merge?"* → **No, shallow — nested dicts are replaced
wholesale, and both dicts still share the same nested object.**

**COMPLEXITY:** O(len(a) + len(b)); deep merge is O(total keys at all levels).

---

## Q9. Find the missing number

**ASKED AS:** "A list holds the numbers 1..n with exactly one missing. Find it."

**VARIATIONS:** find it **without** using `sum()`; find **the duplicate** instead;
**two** numbers missing; range starts at 0 not 1.

```python
def missing_number(nums, n):
    return n * (n + 1) // 2 - sum(nums)

def missing_no_sum(nums, n):
    seen = set(nums)
    for i in range(1, n + 1):
        if i not in seen:
            return i
    return None

def find_duplicate(nums, n):
    return sum(nums) - n * (n + 1) // 2

def missing_two(nums, n):
    seen = set(nums)
    return [i for i in range(1, n + 1) if i not in seen]
```

**TEST CASES**
```python
assert missing_number([1, 2, 4, 5], 5) == 3
assert missing_number([2, 3, 4, 5], 5) == 1      # first is missing
assert missing_number([1, 2, 3, 4], 5) == 5      # last is missing
assert missing_no_sum([1, 2, 4], 4) == 3
assert find_duplicate([1, 2, 3, 3, 4], 4) == 3
assert missing_two([1, 4], 4) == [2, 3]
```

**EDGES:** missing element is the first or the last, n = 1, unsorted input (the
formula doesn't care — **say that**), integer overflow (**not an issue in Python,
ints are arbitrary precision — but it would be in Java/C++; mentioning this reads well**).

**FOLLOW-UP:** *"Sum could overflow in another language — alternative?"* → **XOR
all values 1..n with all list values; pairs cancel, the missing one survives.**
O(n) time, O(1) space, no overflow.

**COMPLEXITY:** O(n) time and O(1) space with the formula; the set version costs O(n) space.

---

## Q10. First non-repeating character

**ASKED AS:** "Find the first character in a string that doesn't repeat."

**VARIATIONS:** first **repeating** character; first non-repeating **word**;
are two strings anagrams (same counting machinery).

```python
def first_non_repeating(s):
    freq = {}
    for ch in s:
        freq[ch] = freq.get(ch, 0) + 1
    for ch in s:                      # second pass preserves original order
        if freq[ch] == 1:
            return ch
    return None

def first_repeating(s):
    seen = set()
    for ch in s:
        if ch in seen:
            return ch
        seen.add(ch)
    return None

def is_anagram(a, b):
    if len(a) != len(b):
        return False
    f = {}
    for ch in a:
        f[ch] = f.get(ch, 0) + 1
    for ch in b:
        if ch not in f or f[ch] == 0:
            return False
        f[ch] -= 1
    return True
```

**TEST CASES**
```python
assert first_non_repeating("swiss") == "w"
assert first_non_repeating("aabb") is None    # none qualify
assert first_non_repeating("") is None
assert first_non_repeating("a") == "a"
assert first_repeating("swiss") == "s"
assert is_anagram("listen", "silent")
assert is_anagram("ab", "aa") is False
```

**EDGES:** no non-repeating char at all, empty string, single char, case
sensitivity, **the second pass must iterate `s` not `freq`** — iterating the dict
gives you insertion order of *first appearance*, which happens to work in 3.7+, but
iterating `s` is the version that is obviously correct. Say why.

**FOLLOW-UP:** *"Can you do one pass?"* → not for a definite answer; you must see
the whole string before you know what repeats. Two passes is optimal.

**COMPLEXITY:** Two passes over the string, so O(n) time and O(k) space for k
distinct characters.

---

# PART B — WRITING CODE ON PAPER

You will likely have no laptop, no IDE, no autocomplete, no interpreter. The
interviewer is watching the *process*, not just the artifact.

**The five-step ritual — do it every single time:**

1. **State assumptions out loud before writing.** "Integers, may contain duplicates
   and negatives, unsorted, could be empty. I'll return `None` when there's no
   answer. Should duplicates count as separate positions?" — **Asking one
   clarifying question is worth more than the code.** It is the single cheapest
   seniority signal available on paper.
2. **Write the signature and the edge-case guard first.**
   `def second_largest(nums):` then `if nums is None or len(nums) < 2: return None`.
   Now the hard part is a clean loop instead of a loop tangled with guards.
3. **Leave whitespace.** Write on every *other* line, keep a 2-inch margin on the
   right. You will need to insert a forgotten line, and cramped code forces you to
   rewrite the whole thing (or scribble arrows, which looks bad).
4. **Write your test cases underneath — unprompted.** S3's evidence says they asked
   for them. Volunteering them before being asked is the differentiator. Six lines:
   normal, duplicates, all-identical, one element, empty, negatives.
5. **Trace one test case aloud at the end, by hand.** Take `[3, 1, 4, 4, 5]`, track
   `first` and `second` value by value, out loud. This catches real bugs *and*
   demonstrates the debugging habit. Never say "done" without doing this.

**Mistakes people make handwriting code under observation:**

- **Starting to write immediately.** Silence for 15 seconds while you think is fine.
  Wrong code written fast is worse than right code written slowly.
- **Initialising with `0` or `-1`** instead of `None`. Breaks instantly on negatives.
- **Off-by-one in `range`.** `range(1, n+1)` for 1..n, `range(len(a)-1, -1, -1)` to
  walk backwards. Write these two down from memory tomorrow until automatic.
- **Forgetting the empty-input guard**, then remembering it after the loop is
  written and having nowhere to insert it. Step 2 prevents this.
- **Going silent for minutes.** Narrate: "now I need to handle the case where the
  new number equals the current max…" A silent candidate is unreadable.
- **Reaching for a built-in you were told not to use** (`max`, `sorted`, `set`,
  slicing `[::-1]`). Know which ones are barred; if unsure, ask.
- **Defending a bug when they push back.** "Let me trace it" beats "no, it works".
  If your trace shows the bug, say so and fix it — that's a pass, not a fail.
- **Not saying complexity.** End every answer with one plain sentence: "One pass,
  so O(n) time and constant extra space."
- **Illegible indentation.** Python *is* indentation. Draw a faint vertical line
  down the page as your indent guide.

---

# PART C — WEDNESDAY 2-HOUR PRACTICE BLOCK

Paper and pen only. Phone away. **No laptop for the first 100 minutes.**
Timer per item; when it rings, move on even if incomplete.

| Time | Item | Target |
|------|------|--------|
| 0:00–0:10 | **Q1 second largest**, cold, on paper, with all 8 test cases | This is the evidenced question. Get it perfect. |
| 0:10–0:18 | Q1 **variations**: second smallest, then k-th largest | Prove the concept transfers, not the memorised code |
| 0:18–0:26 | Q10 first non-repeating + Q3 char frequency | Same dict-counting machinery, do them back to back |
| 0:26–0:34 | Q4 dedupe preserving order + the dedupe-by-key variant | Say the `dict.fromkeys` one-liner aloud after writing the loop |
| 0:34–0:42 | Q2 reverse string + reverse words | Must volunteer the O(n²) string-concat point |
| 0:42–0:50 | Q5 palindrome (string **and** number) | Declare the empty-string convention aloud |
| 0:50–1:00 | **Break.** Stand up. No screens. | |
| 1:00–1:08 | Q9 missing number, all three variants | Volunteer the XOR follow-up unprompted |
| 1:08–1:16 | Q6 flatten (recursive **then** iterative) | Say "recursion limit" before they ask |
| 1:16–1:22 | Q7 FizzBuzz + configurable-rules version | Fast. Warm-up-tier. |
| 1:22–1:30 | Q8 merge dicts: shallow, deep, sum | Nail "`{**a, **b}` is shallow" |
| 1:30–1:45 | **Decorators**: write the `timer` decorator, then `retry` with backoff, from memory (`PYTHON_CONCEPTS.md` C1) | The highest-value concept question. Must be muscle memory. |
| 1:45–1:55 | Say aloud, 60s each: GIL · threading vs multiprocessing vs asyncio · **which one for LLM API calls and why** · list vs tuple vs set vs dict · mutable default arg (`PYTHON_CONCEPTS.md` C2–C6) | The asyncio-for-LLM answer is the GenAI differentiator |
| 1:55–2:00 | **Only now open the laptop.** Type up Q1 + the decorators and run them. | Confirm your paper version actually runs |

**If you only get 40 minutes:** Q1 + its variations with test cases, the `retry`
decorator, and the "asyncio for concurrent LLM calls" answer. Those three carry the
most evidence-weight per minute.

**Wednesday-night self-check — answer without looking:**
1. Second largest of `[5, 5, 5]`? → `None`, and *why* your sentinel choice matters.
2. Write `retry(times=3)` with exponential backoff from memory.
3. Threading, multiprocessing or asyncio for 100 concurrent LLM API calls, and why?
4. Name six test cases for any list function. (normal, duplicates, all-identical,
   single element, empty, negatives/None)

If any of those four stalls, that's tomorrow's first 20 minutes.
