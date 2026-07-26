import sys
import time
import io
import traceback
import json
from okf_engine import HDOKFMemoryEngine

class MisconceptionDistractorGenerator:
    """
    Generates subtle misconception trap questions testing common developer pitfalls
    (e.g., off-by-one errors, unhandled empty arrays, incorrect pointer bounds)
    tailored to ZPD difficulty level and recent hindsight mistake bank entries.
    """
    TRAPS = {
        "off-by-one": [
            "⚠️ Misconception Trap: When iterating array indices 0 to n-1, updating right = mid instead of right = mid - 1 in binary search can cause an infinite loop on 2-element arrays. Why does while left < right behave differently from while left <= right?",
            "⚠️ Misconception Trap: When calculating window length (high - low + 1), omitting the '+ 1' off-by-one adjustment under-counts window size by 1. Under what condition does high - low equal the actual number of elements?"
        ],
        "unhandled-empty-array": [
            "⚠️ Misconception Trap: Does checking 'if not nums:' safely guard against nums = [None] or empty matrices [[]]? What exception is raised when accessing nums[0][0] on [[]]?",
            "⚠️ Misconception Trap: When k > len(nums) in sliding window, does your solution return an empty list [] or raise IndexError? How should empty inputs be handled in production?"
        ],
        "incorrect-pointer-bounds": [
            "⚠️ Misconception Trap: In two-pointer array traversal, if left == right, does evaluating nums[left] + nums[right] == target incorrectly pair an element with itself? Why must left < right be strictly enforced?",
            "⚠️ Misconception Trap: When shifting fast and slow pointers in linked list cycle detection, what happens if fast.next is evaluated when fast is already None?"
        ],
        "key-error-missing-lookup": [
            "⚠️ Misconception Trap: In Hash Map lookups (e.g. Two Sum), if you store seen[num] = i BEFORE checking target - num in seen, what index is returned when target = 2 * num?",
            "⚠️ Misconception Trap: Using dict[key] raises KeyError if key is absent. Why is dict.get(key, default) or defaultdict preferred for counting frequencies?"
        ],
        "type-mismatch": [
            "⚠️ Misconception Trap: In Python 3, (low + high) / 2 yields a float. Why does indexing nums[(low + high) / 2] raise TypeError, and why is // integer division required?",
            "⚠️ Misconception Trap: When returning indices vs values, returning [nums[i], nums[j]] instead of [i, j] breaks automated test contracts. How do you verify return type signatures?"
        ],
        "boundary-condition-failure": [
            "⚠️ Misconception Trap: Does your sliding window max algorithm handle arrays with all negative integers (e.g. [-5, -2, -8]) when initializing max trackers to 0 instead of -inf or nums[0]?",
            "⚠️ Misconception Trap: In fixed window rate limiters, if two requests land at the exact microsecond timestamp boundary timestamp - window_seconds, are they expired or retained?"
        ],
        "logic-mismatch": [
            "⚠️ Misconception Trap: Is mutating an input array in-place during iteration safe, or does it shift indices and skip elements during traversal?",
            "⚠️ Misconception Trap: Why does OrderedDict.popitem(last=False) evict the Least Recently Used element in O(1) time, while popping from a standard Python list takes O(N) time?"
        ]
    }

    def generate_trap(self, topic_or_problem="dsa", zpd_level=2, hindsight_mistakes=None):
        """
        Selects or generates a subtle misconception trap question based on topic, ZPD level,
        and recent hindsight mistake bank error patterns.
        """
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

class REPLEvaluator:
    """
    Real-time Python REPL test runner evaluating candidate code submissions
    against hidden test cases for Pune & Remote product engineering interviews,
    integrated with AI Hindsight Logger into HD-OKF Memory Engine.
    """
    
    def __init__(self, okf_engine=None):
        self.okf = okf_engine

    def _get_okf(self):
        if self.okf is None:
            self.okf = HDOKFMemoryEngine()
        return self.okf

    def classify_and_log_hindsight(self, problem_id: str, result_dict: dict, code_str: str):
        """
        AI Hindsight Logger: Classifies failed test execution into candidate error patterns
        and logs them to hindsight_mistake_bank in okf_state.json.
        """
        if result_dict.get("status") == "passed":
            return None

        status = result_dict.get("status")
        msg = result_dict.get("message", "")
        tb = result_dict.get("traceback", "")
        details = result_dict.get("details", [])

        # Categorize error pattern
        combined_err = (tb + " " + msg).lower()
        for d in details:
            if d.get("error"):
                combined_err += " " + str(d.get("error")).lower()

        if "indexerror" in combined_err or "out of range" in combined_err:
            if "pointer" in code_str.lower() or "left" in code_str.lower() or "right" in code_str.lower():
                pattern = "incorrect-pointer-bounds"
            else:
                pattern = "off-by-one"
        elif "keyerror" in combined_err:
            pattern = "key-error-missing-lookup"
        elif "typeerror" in combined_err:
            pattern = "type-mismatch"
        else:
            # Inspect details for specific failure characteristics
            pattern = "logic-mismatch"
            for d in details:
                inp_str = str(d.get("input", ""))
                if inp_str == "[]" or inp_str == "('')" or "()" in inp_str or inp_str == "([1], 1)":
                    pattern = "unhandled-empty-array"
                    break
                elif d.get("error"):
                    pattern = "boundary-condition-failure"
                    break

        log_details = {
            "status": status,
            "message": msg,
            "failed_tests": [d for d in details if not d.get("passed", False)]
        }
        okf = self._get_okf()
        return okf.log_hindsight_mistake(problem_id, pattern, log_details)

    PROBLEMS = {
        "two_sum": {
            "title": "Two Sum (Pune Product Engineering Standard)",
            "difficulty": "LeetCode Easy-Medium",
            "description": "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target. Space: O(N), Time: O(N).",
            "starter_code": """def two_sum(nums, target):
    # Write your solution here
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []
""",
            "test_cases": [
                {"input": ([2, 7, 11, 15], 9), "expected": [0, 1]},
                {"input": ([3, 2, 4], 6), "expected": [1, 2]},
                {"input": ([3, 3], 6), "expected": [0, 1]},
                {"input": ([-1, -0.5, 0.5, 2], 0), "expected": [1, 2]},
                {"input": ([10, 20, 30, 40, 50], 90), "expected": [3, 4]}
            ],
            "entry_point": "two_sum"
        },
        "valid_parentheses": {
            "title": "Valid Parentheses & Brackets",
            "difficulty": "LeetCode Easy",
            "description": "Given a string `s` containing '(', ')', '{', '}', '[' and ']', determine if input string is valid. Stack-based O(N) solution required.",
            "starter_code": """def is_valid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
    return not stack
""",
            "test_cases": [
                {"input": ("()",), "expected": True},
                {"input": ("()[]{}",), "expected": True},
                {"input": ("(]",), "expected": False},
                {"input": ("([{}])",), "expected": True},
                {"input": ("(((",), "expected": False}
            ],
            "entry_point": "is_valid"
        },
        "lru_cache": {
            "title": "LRU Cache (Capacity & Eviction)",
            "difficulty": "LeetCode Medium (OOP / System Design)",
            "description": "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with `get(key)` and `put(key, value)` in O(1) average time complexity.",
            "starter_code": """from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)
""",
            "is_class": True,
            "class_name": "LRUCache",
            "operations": [
                {"ops": [("init", 2), ("put", 1, 1), ("put", 2, 2), ("get", 1), ("put", 3, 3), ("get", 2), ("put", 4, 4), ("get", 1), ("get", 3), ("get", 4)],
                 "expected": [None, None, None, 1, None, -1, None, -1, 3, 4]}
            ]
        },
        "sliding_window_max": {
            "title": "Sliding Window Maximum",
            "difficulty": "LeetCode Medium",
            "description": "Given an array `nums` and a sliding window size `k`, return max element in each window. Deque O(N) time required.",
            "starter_code": """from collections import deque

def max_sliding_window(nums, k):
    q = deque()
    res = []
    for i, n in enumerate(nums):
        while q and nums[q[-1]] < n:
            q.pop()
        q.append(i)
        if q[0] == i - k:
            q.popleft()
        if i >= k - 1:
            res.append(nums[q[0]])
    return res
""",
            "test_cases": [
                {"input": ([1, 3, -1, -3, 5, 3, 6, 7], 3), "expected": [3, 3, 5, 5, 6, 7]},
                {"input": ([1], 1), "expected": [1]},
                {"input": ([9, 11], 2), "expected": [11]},
                {"input": ([4, -2], 2), "expected": [4]}
            ],
            "entry_point": "max_sliding_window"
        },
        "rate_limiter": {
            "title": "Fixed Window Rate Limiter (API Design)",
            "difficulty": "System Design / Practical Engineering",
            "description": "Implement `RateLimiter(max_requests, window_seconds)` with method `allow_request(user_id, timestamp)`. Returns `True` if permitted, `False` if rate limit exceeded.",
            "starter_code": """from collections import defaultdict

class RateLimiter:
    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.user_requests = defaultdict(list)

    def allow_request(self, user_id: str, timestamp: int) -> bool:
        window_start = timestamp - self.window_seconds
        # Clean expired timestamps
        self.user_requests[user_id] = [t for t in self.user_requests[user_id] if t > window_start]
        if len(self.user_requests[user_id]) < self.max_requests:
            self.user_requests[user_id].append(timestamp)
            return True
        return False
""",
            "is_class": True,
            "class_name": "RateLimiter",
            "operations": [
                {"ops": [("init", 3, 10), ("allow_request", "user1", 1), ("allow_request", "user1", 2), ("allow_request", "user1", 3), ("allow_request", "user1", 4), ("allow_request", "user1", 12)],
                 "expected": [None, True, True, True, False, True]}
            ]
        }
    }

    def eval_code(self, problem_id: str, code_str: str) -> dict:
        """
        Executes code_str in an isolated environment against test cases for problem_id.
        Logs failed test cases via AI Hindsight Logger into okf_state.json.
        """
        if problem_id not in self.PROBLEMS:
            err_res = {"status": "error", "message": f"Problem '{problem_id}' not found."}
            self.classify_and_log_hindsight(problem_id, err_res, code_str)
            return err_res

        prob = self.PROBLEMS[problem_id]
        global_scope = {
            "__builtins__": __builtins__,
            "time": time,
            "json": json,
            "deque": __import__("collections").deque,
            "OrderedDict": __import__("collections").OrderedDict,
            "defaultdict": __import__("collections").defaultdict,
            "typing": __import__("typing"),
            "math": __import__("math"),
            "heapq": __import__("heapq")
        }
        local_scope = {}

        start_time = time.perf_counter()
        try:
            exec(code_str, global_scope, local_scope)
        except Exception as e:
            err_msg = traceback.format_exc()
            err_res = {
                "status": "error",
                "problem_id": problem_id,
                "problem_title": prob["title"],
                "execution_time_ms": round((time.perf_counter() - start_time) * 1000, 2),
                "tests_passed": 0,
                "total_tests": len(prob.get("test_cases", prob.get("operations", []))),
                "message": f"Syntax or Execution Error during code compilation: {str(e)}",
                "traceback": err_msg,
                "details": []
            }
            self.classify_and_log_hindsight(problem_id, err_res, code_str)
            return err_res

        details = []
        passed_count = 0

        if prob.get("is_class"):
            class_name = prob["class_name"]
            if class_name not in local_scope:
                err_res = {
                    "status": "error",
                    "problem_id": problem_id,
                    "problem_title": prob["title"],
                    "execution_time_ms": 0.0,
                    "message": f"Class '{class_name}' was not defined in submission.",
                    "details": []
                }
                self.classify_and_log_hindsight(problem_id, err_res, code_str)
                return err_res

            cls = local_scope[class_name]
            for test_idx, op_suite in enumerate(prob["operations"], 1):
                ops = op_suite["ops"]
                expected_outcomes = op_suite["expected"]
                obj = None
                suite_passed = True
                sub_details = []

                for (op_name, *op_args), expected in zip(ops, expected_outcomes):
                    try:
                        if op_name == "init":
                            obj = cls(*op_args)
                            actual = None
                        else:
                            method = getattr(obj, op_name)
                            actual = method(*op_args)

                        passed = (actual == expected)
                        if not passed:
                            suite_passed = False
                        sub_details.append({
                            "op": op_name, "args": op_args, "expected": expected, "actual": actual, "passed": passed
                        })
                    except Exception as ex:
                        suite_passed = False
                        sub_details.append({
                            "op": op_name, "args": op_args, "expected": expected, "error": str(ex), "passed": False
                        })

                if suite_passed:
                    passed_count += 1
                details.append({
                    "test_num": test_idx,
                    "passed": suite_passed,
                    "sub_ops": sub_details
                })
            total_tests = len(prob["operations"])
        else:
            entry_point = prob["entry_point"]
            if entry_point not in local_scope:
                err_res = {
                    "status": "error",
                    "problem_id": problem_id,
                    "problem_title": prob["title"],
                    "execution_time_ms": 0.0,
                    "message": f"Function '{entry_point}' was not defined in submission.",
                    "details": []
                }
                self.classify_and_log_hindsight(problem_id, err_res, code_str)
                return err_res

            target_fn = local_scope[entry_point]
            test_cases = prob["test_cases"]
            total_tests = len(test_cases)

            for idx, tc in enumerate(test_cases, 1):
                inp = tc["input"]
                expected = tc["expected"]
                try:
                    actual = target_fn(*inp)
                    passed = (actual == expected)
                    if passed:
                        passed_count += 1
                    details.append({
                        "test_num": idx,
                        "input": str(inp),
                        "expected": str(expected),
                        "actual": str(actual),
                        "passed": passed
                    })
                except Exception as ex:
                    details.append({
                        "test_num": idx,
                        "input": str(inp),
                        "expected": str(expected),
                        "actual": None,
                        "passed": False,
                        "error": str(ex)
                    })

        exec_time = round((time.perf_counter() - start_time) * 1000, 2)
        overall_status = "passed" if passed_count == total_tests else "failed"

        if overall_status == "passed":
            feedback = f"10 Billion Percent Optimal! All {passed_count}/{total_tests} hidden test cases passed in {exec_time}ms. Code meets Pune product engineering standards."
        else:
            feedback = f"Code failed {total_tests - passed_count}/{total_tests} test cases. Review edge cases, boundary conditions, and return types."

        res = {
            "status": overall_status,
            "problem_id": problem_id,
            "problem_title": prob["title"],
            "difficulty": prob["difficulty"],
            "tests_passed": passed_count,
            "total_tests": total_tests,
            "execution_time_ms": exec_time,
            "feedback": feedback,
            "details": details
        }

        if overall_status != "passed":
            self.classify_and_log_hindsight(problem_id, res, code_str)

        return res

if __name__ == "__main__":
    evaluator = REPLEvaluator()
    print("=== REPL Evaluator Self-Test ===")
    for pid in evaluator.PROBLEMS:
        starter = evaluator.PROBLEMS[pid]["starter_code"]
        res = evaluator.eval_code(pid, starter)
        print(f"[{pid.upper()}] Status: {res['status']} | Passed: {res['tests_passed']}/{res['total_tests']} in {res['execution_time_ms']}ms")
        print(f"  Feedback: {res['feedback']}")

