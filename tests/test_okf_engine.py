import unittest
import os
import sys
import json
import time

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../src')))
from okf_engine import HDOKFMemoryEngine, compute_fsrs_retrievability
from senku_cli import SenkuCLI
from bmad_enricher import BMadEnricher
from repl_evaluator import REPLEvaluator, MisconceptionDistractorGenerator
from bmad_party_panel import BMadPartyPanel

class TestOKFEngine(unittest.TestCase):
    
    def setUp(self):
        self.test_state_file = os.path.join(os.path.dirname(__file__), "test_okf_state.json")
        self.initial_data = {
            "user_profile": {"zpd_level": 2, "strengths": ["AI"], "weaknesses": ["DSA"]},
            "curriculum": {
                "dsa": {"status": "not_started", "subtopics": {"arrays": {"mastery": 0.0}}}
            },
            "hindsight_mistake_bank": [],
            "session_history": [],
            "checkpoints": {},
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

    def test_rfc6902_list_patch_append(self):
        """Tests that patching '/session_history/-' appends to array without dictionary corruption."""
        patch = [
            {"op": "add", "path": "/session_history/-", "value": {"query": "Two Sum", "status": "completed"}}
        ]
        updated_state = self.engine.apply_patch(patch)
        self.assertIsInstance(updated_state["session_history"], list)
        self.assertEqual(len(updated_state["session_history"]), 1)
        self.assertEqual(updated_state["session_history"][0]["query"], "Two Sum")

    def test_merkle_hash_integrity(self):
        initial_hash = self.engine.compute_merkle_root()
        self.assertTrue(len(initial_hash) > 0)
        
        patch = [{"op": "replace", "path": "/user_profile/zpd_level", "value": 4}]
        self.engine.apply_patch(patch)
        new_hash = self.engine.compute_merkle_root()
        self.assertNotEqual(initial_hash, new_hash)

    def test_state_checkpoints(self):
        root_hash = self.engine.create_checkpoint("cp1")
        self.assertTrue(len(root_hash) > 0)
        self.assertIn("cp1", self.engine.state["checkpoints"])

        patch = [{"op": "replace", "path": "/user_profile/zpd_level", "value": 5}]
        self.engine.apply_patch(patch)
        self.assertEqual(self.engine.state["user_profile"]["zpd_level"], 5)

        restored = self.engine.restore_checkpoint("cp1")
        self.assertTrue(restored)
        self.assertEqual(self.engine.state["user_profile"]["zpd_level"], 2)

    def test_fsrs_retrievability_formula(self):
        r0 = compute_fsrs_retrievability(0, 10.0)
        self.assertEqual(r0, 1.0)

        r10 = compute_fsrs_retrievability(10, 5.0)
        self.assertEqual(r10, 0.8513)

        r_invalid = compute_fsrs_retrievability(5, 0)
        self.assertEqual(r_invalid, 0.0)

    def test_fsrs_memory_updates_with_timestamp(self):
        success = self.engine.update_fsrs_memory("dsa", "arrays", grade=3)
        self.assertTrue(success)

        sub_data = self.engine.state["curriculum"]["dsa"]["subtopics"]["arrays"]
        self.assertIn("fsrs", sub_data)
        fsrs = sub_data["fsrs"]

        self.assertIn("last_reviewed_timestamp", fsrs)
        self.assertGreater(fsrs["last_reviewed_timestamp"], 0)
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

    def test_bmad_enricher(self):
        enricher = BMadEnricher()
        res = enricher.dispatch_enrichment("dsa", "write code for binary search")
        self.assertIn("bmad-code-review", res["dispatched_skills"])

    def test_senku_cli_faith_neutral_opt_out(self):
        cli = SenkuCLI(state_file=self.test_state_file, persona_mode="faith_neutral")
        output = cli.process_turn("Explain dynamic programming")
        self.assertIn("10B% Logical Analysis", output)
        self.assertIn("Engineering Wisdom & Anchor", output)
        self.assertIn("ZPD Micro-Challenge", output)
        self.assertNotIn("Deuteronomy", output)

    def test_party_panel_evaluation_on_input_quality(self):
        panel = BMadPartyPanel()
        res_vague = panel.evaluate_submission("dsa", "hi")
        self.assertEqual(res_vague["recommendation"], "NEEDS REVISION (Incomplete or Failing Submission)")

        evaluator = REPLEvaluator(okf_engine=self.engine)
        good_code = evaluator.PROBLEMS["two_sum"]["starter_code"]
        repl_res = evaluator.eval_code("two_sum", good_code)
        res_good = panel.evaluate_submission("dsa", "Two sum solution using hashing", code_submission=good_code, repl_result=repl_res)
        self.assertIn("HIRE", res_good["recommendation"])

if __name__ == "__main__":
    unittest.main()
