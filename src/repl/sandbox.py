import traceback

SAFE_BUILTINS = {
    "abs": abs, "all": all, "any": any, "bin": bin, "bool": bool,
    "chr": chr, "dict": dict, "enumerate": enumerate, "filter": filter,
    "float": float, "format": format, "frozenset": frozenset, "getattr": getattr,
    "hasattr": hasattr, "hash": hash, "hex": hex, "int": int, "isinstance": isinstance,
    "issubclass": issubclass, "len": len, "list": list, "map": map, "max": max,
    "min": min, "next": next, "oct": oct, "ord": ord, "pow": pow, "print": print,
    "range": range, "repr": repr, "reversed": reversed, "round": round, "set": set,
    "slice": slice, "sorted": sorted, "str": str, "sum": sum, "tuple": tuple, "zip": zip
}

def worker_exec(code_str, problem_dict, result_queue):
    """Worker process running untrusted code in a restricted scope."""
    try:
        global_scope = {
            "__builtins__": SAFE_BUILTINS,
            "deque": __import__("collections").deque,
            "OrderedDict": __import__("collections").OrderedDict,
            "defaultdict": __import__("collections").defaultdict,
            "heapq": __import__("heapq"),
            "math": __import__("math")
        }
        local_scope = {}
        exec(code_str, global_scope, local_scope)

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

        result_queue.put({"status": "completed", "passed_count": passed_count, "total_tests": total_tests, "details": details})
    except Exception as ex:
        result_queue.put({"status": "error", "message": str(ex), "traceback": traceback.format_exc()})
