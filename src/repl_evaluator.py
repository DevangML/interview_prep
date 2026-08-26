import time
import multiprocessing
from okf_engine import HDOKFMemoryEngine
from repl.distractors import MisconceptionDistractorGenerator
from repl.sandbox import worker_exec

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
        return self._get_okf().log_hindsight_mistake(problem_id, pattern, log_details)

    PROBLEMS = {
        "two_sum": {
            "title": "Two Sum (DSA Pattern)", "difficulty": "Easy-Medium",
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
            "title": "SQL Anti-Join Logic Simulator", "difficulty": "Medium",
            "description": "Simulate SQL Anti-Join filtering users who have no orders.",
            "starter_code": "def anti_join_users(users, orders):\n    ordered_user_ids = {o['user_id'] for o in orders if o.get('user_id') is not None}\n    return [u['id'] for u in users if u['id'] not in ordered_user_ids]\n",
            "test_cases": [
                {"input": ([{"id": 1}, {"id": 2}, {"id": 3}], [{"user_id": 1}]), "expected": [2, 3]},
                {"input": ([{"id": 10}], [{"user_id": 10}]), "expected": []}
            ],
            "entry_point": "anti_join_users"
        },
        "python_decorator_eval": {
            "title": "Python Timing Decorator", "difficulty": "Easy-Medium",
            "description": "Implement a function decorator that appends execution status to a metadata dictionary.",
            "starter_code": "def track_execution(fn, *args):\n    res = fn(*args)\n    return {'result': res, 'executed': True}\n",
            "test_cases": [{"input": (lambda x: x * 2, 5), "expected": {'result': 10, 'executed': True}}],
            "entry_point": "track_execution"
        },
        "lru_cache": {
            "title": "LRU Cache (Capacity & Eviction)", "difficulty": "Medium",
            "description": "Design an LRU cache with get and put operations.",
            "starter_code": "from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.capacity = capacity\n        self.cache = OrderedDict()\n    def get(self, key: int) -> int:\n        if key not in self.cache: return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache: self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.capacity:\n            self.cache.popitem(last=False)\n",
            "is_class": True, "class_name": "LRUCache",
            "operations": [
                {"ops": [("init", 2), ("put", 1, 1), ("put", 2, 2), ("get", 1), ("put", 3, 3), ("get", 2)],
                 "expected": [None, None, None, 1, None, -1]}
            ]
        },
        "rate_limiter": {
            "title": "Fixed Window Rate Limiter", "difficulty": "Medium",
            "description": "Implement RateLimiter(max_requests, window_seconds).",
            "starter_code": "from collections import defaultdict\n\nclass RateLimiter:\n    def __init__(self, max_requests: int, window_seconds: int):\n        self.max_requests = max_requests\n        self.window_seconds = window_seconds\n        self.user_requests = defaultdict(list)\n    def allow_request(self, user_id: str, timestamp: int) -> bool:\n        window_start = timestamp - self.window_seconds\n        self.user_requests[user_id] = [t for t in self.user_requests[user_id] if t > window_start]\n        if len(self.user_requests[user_id]) < self.max_requests:\n            self.user_requests[user_id].append(timestamp)\n            return True\n        return False\n",
            "is_class": True, "class_name": "RateLimiter",
            "operations": [
                {"ops": [("init", 2, 10), ("allow_request", "u1", 1), ("allow_request", "u1", 2), ("allow_request", "u1", 3)],
                 "expected": [None, True, True, False]}
            ]
        }
    }

    def eval_code(self, problem_id: str, code_str: str, timeout_seconds: float = 2.0) -> dict:
        if problem_id not in self.PROBLEMS:
            err_res = {"status": "error", "message": f"Problem '{problem_id}' not found."}
            self.classify_and_log_hindsight(problem_id, err_res, code_str)
            return err_res

        prob = self.PROBLEMS[problem_id]
        start_time = time.perf_counter()
        ctx = multiprocessing.get_context("spawn")
        q = ctx.Queue()
        p = ctx.Process(target=worker_exec, args=(code_str, prob, q))

        try:
            p.start()
            p.join(timeout=timeout_seconds)
            if p.is_alive():
                p.terminate()
                p.join()
                err_res = {
                    "status": "error", "problem_id": problem_id, "problem_title": prob["title"],
                    "execution_time_ms": round(timeout_seconds * 1000, 2), "tests_passed": 0,
                    "total_tests": len(prob.get("test_cases", prob.get("operations", []))),
                    "message": f"Execution Timed Out (> {timeout_seconds}s limit). Check for infinite loops.",
                    "details": []
                }
                self.classify_and_log_hindsight(problem_id, err_res, code_str)
                return err_res

            if q.empty():
                err_res = {"status": "error", "problem_id": problem_id, "message": "Worker process exited unexpectedly.", "details": []}
                self.classify_and_log_hindsight(problem_id, err_res, code_str)
                return err_res

            res_data = q.get()
            exec_time = round((time.perf_counter() - start_time) * 1000, 2)
            if res_data.get("status") == "error":
                err_res = {
                    "status": "error", "problem_id": problem_id, "problem_title": prob["title"],
                    "execution_time_ms": exec_time, "tests_passed": 0,
                    "total_tests": len(prob.get("test_cases", prob.get("operations", []))),
                    "message": res_data.get("message"), "traceback": res_data.get("traceback", ""), "details": []
                }
                self.classify_and_log_hindsight(problem_id, err_res, code_str)
                return err_res

            passed = res_data.get("passed_count", 0)
            total = res_data.get("total_tests", 1)
            status = "passed" if passed == total else "failed"
            final_res = {
                "status": status, "problem_id": problem_id, "problem_title": prob["title"],
                "difficulty": prob.get("difficulty", "Medium"), "tests_passed": passed,
                "total_tests": total, "execution_time_ms": exec_time,
                "feedback": f"10B% Optimal! {passed}/{total} test cases passed in {exec_time}ms." if status == "passed" else f"Failed {total - passed}/{total} test cases.",
                "details": res_data.get("details", [])
            }
            if status != "passed":
                self.classify_and_log_hindsight(problem_id, final_res, code_str)
            return final_res
        except Exception as e:
            err_res = {"status": "error", "message": str(e)}
            self.classify_and_log_hindsight(problem_id, err_res, code_str)
            return err_res
