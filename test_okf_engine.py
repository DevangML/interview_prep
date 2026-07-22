import unittest
import os
import json

from okf_engine import HDOKFMemoryEngine, compute_fsrs_retrievability
from senku_cli import SenkuCLI
from bmad_enricher import BMadEnricher
from repl_evaluator import REPLEvaluator, MisconceptionDistractorGenerator

class TestOKFEngine(unittest.TestCase):
    
    def setUp(self):
        self.test_state_file = "/Users/devang/Desktop/interview_prep/_bmad-output/test_okf_state.json"
        self.initial_data = {
            "user_profile": {"zpd_level": 2, "strengths": ["AI"], "weaknesses": ["DSA"]},
            "curriculum": {
                "dsa": {"status": "not_started", "subtopics": {"arrays": {"mastery": 0.0}}}
            },
            "hindsight_mistake_bank": [],
            "session_history": [],
            "merkle_root": ""
        }
        with open(self.test_state_file, "w", encoding="utf-8") as f:
            json.dump(self.initial_data, f, indent=2)

        self.engine = HDOKFMemoryEngine(state_file=self.test_state_file)

    def tearDown(self):
        if os.path.exists(self.test_state_file):
            os.remove(self.test_state_file)

    def test_schema_loading(self):
        self.assertIn("user_profile", self.engine.state)
        self.assertEqual(self.engine.state["user_profile"]["zpd_level"], 2)
        self.assertIn("hindsight_mistake_bank", self.engine.state)

    def test_classify_and_hydrate_token_budget(self):
        hydrated = self.engine.classify_and_hydrate(focus_topic="dsa", token_budget=500)
        self.assertIn("user_profile", hydrated)
        self.assertIn("topic_state", hydrated)
        tokens = self.engine.estimate_tokens(hydrated)
        self.assertLess(tokens, 500)

    def test_apply_patch_rfc6902(self):
        patch = [
            {"op": "replace", "path": "/user_profile/zpd_level", "value": 3},
            {"op": "add", "path": "/curriculum/dsa/status", "value": "in_progress"}
        ]
        updated_state = self.engine.apply_patch(patch)
        self.assertEqual(updated_state["user_profile"]["zpd_level"], 3)
        self.assertEqual(updated_state["curriculum"]["dsa"]["status"], "in_progress")

    def test_merkle_hash_integrity(self):
        initial_hash = self.engine.compute_merkle_root()
        self.assertTrue(len(initial_hash) > 0)
        
        # Modify state & verify root hash changes deterministically
        patch = [{"op": "replace", "path": "/user_profile/zpd_level", "value": 4}]
        self.engine.apply_patch(patch)
        new_hash = self.engine.compute_merkle_root()
        self.assertNotEqual(initial_hash, new_hash)

    def test_fsrs_retrievability_formula(self):
        # R = (1 + 0.19 * t / S)^(-0.5)
        r0 = compute_fsrs_retrievability(0, 10.0)
        self.assertEqual(r0, 1.0)

        # t=10, S=5 => R = (1 + 0.19 * 2)^(-0.5) = 1.38^(-0.5) = 0.8513
        r10 = compute_fsrs_retrievability(10, 5.0)
        self.assertEqual(r10, 0.8513)

        # Invalid stability
        r_invalid = compute_fsrs_retrievability(5, 0)
        self.assertEqual(r_invalid, 0.0)

    def test_fsrs_memory_updates(self):
        success = self.engine.update_fsrs_memory("dsa", "arrays", grade=3)
        self.assertTrue(success)

        sub_data = self.engine.state["curriculum"]["dsa"]["subtopics"]["arrays"]
        self.assertIn("fsrs", sub_data)
        fsrs = sub_data["fsrs"]

        self.assertGreaterEqual(fsrs["difficulty_d"], 1.0)
        self.assertLessEqual(fsrs["difficulty_d"], 10.0)
        self.assertGreater(fsrs["stability_s"], 0.0)
        self.assertEqual(fsrs["retrievability_r"], 1.0)

    def test_hindsight_mistake_bank_logging(self):
        entry = self.engine.log_hindsight_mistake("two_sum", "off-by-one", {"error": "IndexError"})
        self.assertEqual(entry["problem_id"], "two_sum")
        self.assertEqual(entry["error_pattern"], "off-by-one")

        mistakes = self.engine.get_hindsight_mistakes()
        self.assertEqual(len(mistakes), 1)
        self.assertEqual(mistakes[0]["error_pattern"], "off-by-one")

    def test_misconception_distractor_generator(self):
        gen = MisconceptionDistractorGenerator()
        trap = gen.generate_trap("two_sum", zpd_level=2)
        self.assertIn("Misconception Trap", trap)

    def test_ai_hindsight_logger_on_failed_eval(self):
        evaluator = REPLEvaluator(okf_engine=self.engine)
        bad_code = """def two_sum(nums, target):
    return nums[99]  # Cause IndexError
"""
        res = evaluator.eval_code("two_sum", bad_code)
        self.assertNotEqual(res["status"], "passed")

        mistakes = self.engine.get_hindsight_mistakes()
        self.assertGreater(len(mistakes), 0)
        self.assertEqual(mistakes[-1]["problem_id"], "two_sum")
        self.assertIn(mistakes[-1]["error_pattern"], ["off-by-one", "incorrect-pointer-bounds"])

    def test_bmad_enricher(self):
        enricher = BMadEnricher()
        res = enricher.dispatch_enrichment("dsa", "write code for binary search")
        self.assertIn("bmad-code-review", res["dispatched_skills"])

    def test_senku_cli_guardrail_and_hydration(self):
        cli = SenkuCLI()
        cli.okf = self.engine
        output = cli.process_turn("Can you write code for binary search?")
        
        self.assertIn("10B% Logical Analysis", output)
        self.assertIn("Scriptural Encouragement", output)
        self.assertIn("ZPD Micro-Challenge", output)
        self.assertIn("Misconception Trap", output)
        self.assertIn("OKF Memory Sync Payload", output)
        self.assertIn("illogical", output.lower())

if __name__ == "__main__":
    unittest.main()

