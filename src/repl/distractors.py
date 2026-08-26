class MisconceptionDistractorGenerator:
    """
    Generates subtle misconception trap questions testing common developer pitfalls
    tailored to ZPD difficulty level and recent hindsight mistake bank entries.
    """
    TRAPS = {
        "off-by-one": [
            "⚠️ Misconception Trap: When iterating array indices 0 to n-1, updating right = mid instead of right = mid - 1 in binary search can cause an infinite loop on 2-element arrays.",
            "⚠️ Misconception Trap: When calculating window length (high - low + 1), omitting the '+ 1' off-by-one adjustment under-counts window size by 1."
        ],
        "unhandled-empty-array": [
            "⚠️ Misconception Trap: Does checking 'if not nums:' safely guard against nums = [None] or empty matrices [[]]?",
            "⚠️ Misconception Trap: When k > len(nums) in sliding window, does your solution return an empty list [] or raise IndexError?"
        ],
        "incorrect-pointer-bounds": [
            "⚠️ Misconception Trap: In two-pointer array traversal, if left == right, does evaluating nums[left] + nums[right] == target incorrectly pair an element with itself?",
            "⚠️ Misconception Trap: When shifting fast and slow pointers in linked list cycle detection, what happens if fast.next is evaluated when fast is already None?"
        ],
        "key-error-missing-lookup": [
            "⚠️ Misconception Trap: In Hash Map lookups (e.g. Two Sum), if you store seen[num] = i BEFORE checking target - num in seen, what index is returned when target = 2 * num?",
            "⚠️ Misconception Trap: Using dict[key] raises KeyError if key is absent. Why is dict.get(key, default) or defaultdict preferred for counting frequencies?"
        ],
        "type-mismatch": [
            "⚠️ Misconception Trap: In Python 3, (low + high) / 2 yields a float. Why does indexing nums[(low + high) / 2] raise TypeError?",
            "⚠️ Misconception Trap: When returning indices vs values, returning [nums[i], nums[j]] instead of [i, j] breaks automated test contracts."
        ],
        "boundary-condition-failure": [
            "⚠️ Misconception Trap: Does your sliding window max algorithm handle arrays with all negative integers when initializing max trackers to 0 instead of -inf?",
            "⚠️ Misconception Trap: In fixed window rate limiters, if two requests land at the exact microsecond timestamp boundary timestamp - window_seconds, are they expired or retained?"
        ],
        "logic-mismatch": [
            "⚠️ Misconception Trap: Is mutating an input array in-place during iteration safe, or does it shift indices and skip elements during traversal?",
            "⚠️ Misconception Trap: Why does OrderedDict.popitem(last=False) evict the Least Recently Used element in O(1) time, while popping from a standard Python list takes O(N) time?"
        ]
    }

    def generate_trap(self, topic_or_problem="dsa", zpd_level=2, hindsight_mistakes=None):
        if hindsight_mistakes:
            recent_pattern = hindsight_mistakes[-1].get("error_pattern")
            if recent_pattern in self.TRAPS and self.TRAPS[recent_pattern]:
                return self.TRAPS[recent_pattern][0]

        topic_lower = str(topic_or_problem).lower()
        if "sum" in topic_lower or "two_sum" in topic_lower:
            return self.TRAPS["key-error-missing-lookup"][0]
        elif "parentheses" in topic_lower or "stack" in topic_lower:
            return self.TRAPS["unhandled-empty-array"][0]
        elif "sliding" in topic_lower or "window" in topic_lower:
            return self.TRAPS["off-by-one"][1]
        elif "lru" in topic_lower or "cache" in topic_lower:
            return self.TRAPS["logic-mismatch"][1]
        elif "rate" in topic_lower or "limiter" in topic_lower:
            return self.TRAPS["boundary-condition-failure"][1]
        elif "pointer" in topic_lower:
            return self.TRAPS["incorrect-pointer-bounds"][0]

        all_traps = self.TRAPS["off-by-one"] + self.TRAPS["unhandled-empty-array"]
        idx = (zpd_level - 1) % len(all_traps)
        return all_traps[idx]
