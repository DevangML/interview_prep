import sys
import time
import io
import traceback
import json
import multiprocessing
from okf_engine import HDOKFMemoryEngine

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

def _worker_exec(code_str, problem_dict, result_queue):
    """Worker process running untrusted code in a restricted scope."""
    try:
        # Restricted safe builtins
        safe_builtins = {
            "abs": abs, "all": all, "any": any, "bin": bin, "bool": bool,
            "chr": chr, "dict": dict, "enumerate": enumerate, "filter": filter,
            "float": float, "format": format, "frozenset": frozenset, "getattr": getattr,
            "hasattr": hasattr, "hash": hash, "hex": hex, "int": int, "isinstance": isinstance,
            "issubclass": issubclass, "len": len, "list": list, "map": map, "max": max,
            "min": min, "next": next, "oct": oct, "ord": ord, "pow": pow, "print": print,
            "range": range, "repr": repr, "reversed": reversed, "round": round, "set": set,
            "slice": slice, "sorted": sorted, "str": str, "sum": sum, "tuple": tuple, "zip": zip
        }
        
        global_scope = {
            "__builtins__": safe_builtins,
            "deque": __import__("collections").deque,
            "OrderedDict": __import__("collections").OrderedDict,
            "defaultdict": __import__("collections").defaultdict,
            "heapq": __import__("heapq"),
            "math": __import__("math")
        }
        local_scope = {}
        exec(code_str, global_scope, local_scope)
        
        # Now run tests inside worker
        passed_count = 0
        details = []
        
        if problem_dict.get("is_class"):
            class_name = problem_dict["class_name"]
            if class_name not in local_scope:
                result_queue.put({"status": "error", "message": f"Class '{class_name}' was not defined."})
                return
            cls = local_scope[class_name]
            for test_idx, op_suite in enumerate(problem_dict["operations"], 1):
                ops = op_suite["ops"]
                expected_outcomes = op_suite["expected"]
                obj = None
                suite_passed = True
                sub_details = []
                for (op_name, *op_args), expected in zip(ops, expected_outcomes):
                    if op_name == "init":
                        obj = cls(*op_args)
                        actual = None
                    else:
                        actual = getattr(obj, op_name)(*op_args)
                    passed = (actual == expected)
                    if not passed:
                        suite_passed = False
                    sub_details.append({"op": op_name, "expected": expected, "actual": actual, "passed": passed})
                if suite_passed:
                    passed_count += 1
                details.append({"test_num": test_idx, "passed": suite_passed, "sub_ops": sub_details})
            total_tests = len(problem_dict["operations"])
        else:
            entry_point = problem_dict["entry_point"]
            if entry_point not in local_scope:
                result_queue.put({"status": "error", "message": f"Function '{entry_point}' was not defined."})
                return
            target_fn = local_scope[entry_point]
            test_cases = problem_dict["test_cases"]
            total_tests = len(test_cases)
            for idx, tc in enumerate(test_cases, 1):
                inp = tc["input"]
                expected = tc["expected"]
                actual = target_fn(*inp)
                passed = (actual == expected)
                if passed:
                    passed_count += 1
                details.append({"test_num": idx, "input": str(inp), "expected": str(expected), "actual": str(actual), "passed": passed})

        result_queue.put({
            "status": "completed",
            "passed_count": passed_count,
            "total_tests": total_tests,
            "details": details
        })
    except Exception as ex:
        result_queue.put({
            "status": "error",
            "message": str(ex),
            "traceback": traceback.format_exc()
        })

class REPLEvaluator:
    """
    Real-time Python REPL test runner evaluating candidate code submissions
    against sandboxed test cases for multi-domain technical interviews,
    integrated with AI Hindsight Logger into HD-OKF Memory Engine.
    """
    def __init__(self, okf_engine=None):
        self.okf = okf_engine

    def _get_okf(self):
        if self.okf is None:
            self.okf = HDOKFMemoryEngine()
        return self.okf

    def classify_and_log_hindsight(self, problem_id: str, result_dict: dict, code_str: str):
        if result_dict.get("status") == "passed":
            return None
        msg = result_dict.get("message", "")
        tb = result_dict.get("traceback", "")
        combined = (tb + " " + msg).lower()
        if "indexerror" in combined:
            pattern = "off-by-one"
        elif "keyerror" in combined:
            pattern = "key-error-missing-lookup"
        elif "typeerror" in combined:
            pattern = "type-mismatch"
        else:
            pattern = "logic-mismatch"

        log_details = {"status": result_dict.get("status"), "message": msg}
        okf = self._get_okf()
        return okf.log_hindsight_mistake(problem_id, pattern, log_details)

    PROBLEMS = {
        "two_sum": {
            "title": "Two Sum (DSA Pattern)",
            "difficulty": "Easy-Medium",
            "description": "Return indices of the two numbers such that they add up to target.",
            "starter_code": "def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []\n",
            "test_cases": [
                {"input": ([2, 7, 11, 15], 9), "expected": [0, 1]},
                {"input": ([3, 2, 4], 6), "expected": [1, 2]},
                {"input": ([3, 3], 6), "expected": [0, 1]}
            ],
            "entry_point": "two_sum"
        },
        "sql_query_eval": {
            "title": "SQL Anti-Join Logic Simulator",
            "difficulty": "Medium",
            "description": "Simulate SQL Anti-Join filtering users who have no orders.",
            "starter_code": "def anti_join_users(users, orders):\n    ordered_user_ids = {o['user_id'] for o in orders if o.get('user_id') is not None}\n    return [u['id'] for u in users if u['id'] not in ordered_user_ids]\n",
            "test_cases": [
                {"input": ([{"id": 1}, {"id": 2}, {"id": 3}], [{"user_id": 1}]), "expected": [2, 3]},
                {"input": ([{"id": 10}], [{"user_id": 10}]), "expected": []}
            ],
            "entry_point": "anti_join_users"
        },
        "python_decorator_eval": {
            "title": "Python Timing Decorator",
            "difficulty": "Easy-Medium",
            "description": "Implement a function decorator that appends execution status to a metadata dictionary.",
            "starter_code": "def track_execution(fn, *args):\n    res = fn(*args)\n    return {'result': res, 'executed': True}\n",
            "test_cases": [
                {"input": (lambda x: x * 2, 5), "expected": {'result': 10, 'executed': True}}
            ],
            "entry_point": "track_execution"
        },
        "lru_cache": {
            "title": "LRU Cache (Capacity & Eviction)",
            "difficulty": "Medium",
            "description": "Design an LRU cache with get and put operations.",
            "starter_code": "from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.capacity = capacity\n        self.cache = OrderedDict()\n    def get(self, key: int) -> int:\n        if key not in self.cache: return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache: self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.capacity:\n            self.cache.popitem(last=False)\n",
            "is_class": True,
            "class_name": "LRUCache",
            "operations": [
                {"ops": [("init", 2), ("put", 1, 1), ("put", 2, 2), ("get", 1), ("put", 3, 3), ("get", 2)],
                 "expected": [None, None, None, 1, None, -1]}
            ]
        },
        "rate_limiter": {
            "title": "Fixed Window Rate Limiter",
            "difficulty": "Medium",
            "description": "Implement RateLimiter(max_requests, window_seconds).",
            "starter_code": "from collections import defaultdict\n\nclass RateLimiter:\n    def __init__(self, max_requests: int, window_seconds: int):\n        self.max_requests = max_requests\n        self.window_seconds = window_seconds\n        self.user_requests = defaultdict(list)\n    def allow_request(self, user_id: str, timestamp: int) -> bool:\n        window_start = timestamp - self.window_seconds\n        self.user_requests[user_id] = [t for t in self.user_requests[user_id] if t > window_start]\n        if len(self.user_requests[user_id]) < self.max_requests:\n            self.user_requests[user_id].append(timestamp)\n            return True\n        return False\n",
            "is_class": True,
            "class_name": "RateLimiter",
            "operations": [
                {"ops": [("init", 2, 10), ("allow_request", "u1", 1), ("allow_request", "u1", 2), ("allow_request", "u1", 3)],
                 "expected": [None, True, True, False]}
            ]
        }
    }

    def eval_code(self, problem_id: str, code_str: str, timeout_seconds: float = 2.0) -> dict:
        """
        Executes code_str in a sandboxed multiprocessing worker with strict timeout protection.
        """
        if problem_id not in self.PROBLEMS:
            err_res = {"status": "error", "message": f"Problem '{problem_id}' not found."}
            self.classify_and_log_hindsight(problem_id, err_res, code_str)
            return err_res

        prob = self.PROBLEMS[problem_id]
        start_time = time.perf_counter()
        
        ctx = multiprocessing.get_context("spawn")
        q = ctx.Queue()
        p = ctx.Process(target=_worker_exec, args=(code_str, prob, q))
        
        try:
            p.start()
            p.join(timeout=timeout_seconds)
            
            if p.is_alive():
                p.terminate()
                p.join()
                err_res = {
                    "status": "error",
                    "problem_id": problem_id,
                    "problem_title": prob["title"],
                    "execution_time_ms": round(timeout_seconds * 1000, 2),
                    "tests_passed": 0,
                    "total_tests": len(prob.get("test_cases", prob.get("operations", []))),
                    "message": f"Execution Timed Out (> {timeout_seconds}s limit). Check for infinite loops.",
                    "details": []
                }
                self.classify_and_log_hindsight(problem_id, err_res, code_str)
                return err_res

            if q.empty():
                err_res = {
                    "status": "error",
                    "problem_id": problem_id,
                    "message": "Worker process exited unexpectedly.",
                    "details": []
                }
                self.classify_and_log_hindsight(problem_id, err_res, code_str)
                return err_res

            res_data = q.get()
            exec_time = round((time.perf_counter() - start_time) * 1000, 2)

            if res_data.get("status") == "error":
                err_res = {
                    "status": "error",
                    "problem_id": problem_id,
                    "problem_title": prob["title"],
                    "execution_time_ms": exec_time,
                    "tests_passed": 0,
                    "total_tests": len(prob.get("test_cases", prob.get("operations", []))),
                    "message": res_data.get("message"),
                    "traceback": res_data.get("traceback", ""),
                    "details": []
                }
                self.classify_and_log_hindsight(problem_id, err_res, code_str)
                return err_res

            passed_count = res_data.get("passed_count", 0)
            total_tests = res_data.get("total_tests", 1)
            details = res_data.get("details", [])

            overall_status = "passed" if passed_count == total_tests else "failed"
            feedback = f"10B% Optimal! {passed_count}/{total_tests} test cases passed in {exec_time}ms." if overall_status == "passed" else f"Failed {total_tests - passed_count}/{total_tests} test cases."

            final_res = {
                "status": overall_status,
                "problem_id": problem_id,
                "problem_title": prob["title"],
                "difficulty": prob.get("difficulty", "Medium"),
                "tests_passed": passed_count,
                "total_tests": total_tests,
                "execution_time_ms": exec_time,
                "feedback": feedback,
                "details": details
            }

            if overall_status != "passed":
                self.classify_and_log_hindsight(problem_id, final_res, code_str)

            return final_res
        except Exception as e:
            err_res = {"status": "error", "message": str(e)}
            self.classify_and_log_hindsight(problem_id, err_res, code_str)
            return err_res
