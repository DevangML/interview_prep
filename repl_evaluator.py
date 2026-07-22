import sys
import time
import io
import traceback
import json

class REPLEvaluator:
    """
    Real-time Python REPL test runner evaluating candidate code submissions
    against hidden test cases for Pune & Remote product engineering interviews.
    """
    
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
        """
        if problem_id not in self.PROBLEMS:
            return {"status": "error", "message": f"Problem '{problem_id}' not found."}

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
            return {
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

        details = []
        passed_count = 0

        if prob.get("is_class"):
            class_name = prob["class_name"]
            if class_name not in local_scope:
                return {
                    "status": "error",
                    "problem_id": problem_id,
                    "problem_title": prob["title"],
                    "execution_time_ms": 0.0,
                    "message": f"Class '{class_name}' was not defined in submission.",
                    "details": []
                }
            
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
                return {
                    "status": "error",
                    "problem_id": problem_id,
                    "problem_title": prob["title"],
                    "execution_time_ms": 0.0,
                    "message": f"Function '{entry_point}' was not defined in submission.",
                    "details": []
                }
            
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

        # Generate constructive feedback
        if overall_status == "passed":
            feedback = f"10 Billion Percent Optimal! All {passed_count}/{total_tests} hidden test cases passed in {exec_time}ms. Code meets Pune product engineering standards."
        else:
            feedback = f"Code failed {total_tests - passed_count}/{total_tests} test cases. Review edge cases, boundary conditions, and return types."

        return {
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

if __name__ == "__main__":
    evaluator = REPLEvaluator()
    print("=== REPL Evaluator Self-Test ===")
    for pid in evaluator.PROBLEMS:
        starter = evaluator.PROBLEMS[pid]["starter_code"]
        res = evaluator.eval_code(pid, starter)
        print(f"[{pid.upper()}] Status: {res['status']} | Passed: {res['tests_passed']}/{res['total_tests']} in {res['execution_time_ms']}ms")
        print(f"  Feedback: {res['feedback']}")
