import unittest
import os
import json

from okf_engine import HDOKFMemoryEngine
from senku_cli import SenkuCLI
from bmad_enricher import BMadEnricher

class TestOKFEngine(unittest.TestCase):
    
    def setUp(self):
        self.test_state_file = "/Users/devang/Desktop/interview_prep/_bmad-output/test_okf_state.json"
        self.initial_data = {
            "user_profile": {"zpd_level": 2, "strengths": ["AI"], "weaknesses": ["DSA"]},
            "curriculum": {
                "dsa": {"status": "not_started", "subtopics": {"arrays": {"mastery": 0.0}}}
            },
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

    def test_bmad_enricher(self):
        enricher = BMadEnricher()
        res = enricher.dispatch_enrichment("dsa", "write code for binary search")
        self.assertIn("bmad-code-review", res["dispatched_skills"])

    def test_senku_cli_guardrail_and_hydration(self):
        cli = SenkuCLI()
        # Override state file to test file
        cli.okf = self.engine
        output = cli.process_turn("Can you write code for binary search?")
        
        self.assertIn("10B% Logical Analysis", output)
        self.assertIn("Scriptural Encouragement", output)
        self.assertIn("ZPD Micro-Challenge", output)
        self.assertIn("OKF Memory Sync Payload", output)
        self.assertIn("illogical", output.lower())

if __name__ == "__main__":
    unittest.main()
