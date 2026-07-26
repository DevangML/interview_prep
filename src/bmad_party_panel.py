import json
import os
import sys

class BMadPartyPanel:
    """
    Multi-Agent Mock Interview Panel Simulator featuring 3 distinct personas:
    1. Strict Tech Lead (Rohan Deshmukh - Nvidia Pune Lead)
    2. Skeptical Systems Architect (Vikram Singhania - Ex-Druva/PubMatic Architect)
    3. Senku Ishigami (10 Billion Percent Science Officer & ZPD Mentor)
    """

    PERSONAS = {
        "tech_lead": {
            "name": "Rohan Deshmukh",
            "title": "Strict Tech Lead (Nvidia Pune / Practical Engineering)",
            "focus": "Algorithm correctness, space/time complexity, edge cases, OOP/SOLID principles, code elegance.",
            "style": "Direct, demanding, uncompromising on edge cases and clean code standards."
        },
        "systems_architect": {
            "name": "Vikram Singhania",
            "title": "Skeptical Systems Architect (Ex-Druva / PubMatic)",
            "focus": "High availability, distributed caching, DB sharding, concurrency limits, resilience, system boundaries.",
            "style": "Skeptical, inquisitive, challenges naive scale assumptions and single-point-of-failures."
        },
        "senku": {
            "name": "Senku Ishigami",
            "title": "10 Billion Percent Science Officer & ZPD Mentor",
            "focus": "Scientific method, 10 Billion Percent logical analysis, Socratic micro-challenges, encouragement.",
            "style": "Exhilarating, logical, encouraging, provides structured step-by-step guidance."
        }
    }

    def evaluate_submission(self, topic: str, user_input: str, code_submission: str = None, repl_result: dict = None) -> dict:
        """
        Conducts a multi-agent panel review turn analyzing actual user_input and code_submission quality.
        """
        topic_lower = (topic or "").lower()
        inp_str = (user_input or "").strip()
        code_str = (code_submission or "").strip()

        # Input Quality Analysis
        is_short_input = len(inp_str) < 15
        is_generic_input = inp_str.lower() in ["hi", "hello", "test", "explain", "code", "solution", "write code"]

        # 1. Tech Lead Evaluation
        if repl_result and repl_result.get("status") == "passed":
            tl_score = 9
            tl_feedback = (
                f"Code passed all {repl_result.get('total_tests')} test cases in {repl_result.get('execution_time_ms')}ms. "
                "Structure is clean. However, check edge cases like empty inputs, integer overflow limits, and memory allocation overhead."
            )
            tl_question = "How would you refactor this to minimize memory allocations if called 50,000 times per second?"
        elif repl_result and repl_result.get("status") == "failed":
            tl_score = 4
            tl_feedback = (
                f"Code failed tests ({repl_result.get('tests_passed')}/{repl_result.get('total_tests')} passed). "
                "Logical flaws present in boundary conditions. Fix conditional branches before optimizing."
            )
            tl_question = "Walk me through the exact line where logic fails on the failing test case."
        elif code_str:
            tl_score = 6
            tl_feedback = "Code submitted without automated REPL verification. Ensure syntax and type annotations are verified."
            tl_question = "What is the worst-case space complexity of your implementation?"
        elif is_short_input or is_generic_input:
            tl_score = 3
            tl_feedback = "Submission lacks technical detail and depth. Vague or 1-word responses are automatic failures in tech rounds."
            tl_question = f"Can you provide a concrete 3-sentence technical breakdown for {topic}?"
        else:
            tl_score = 7
            tl_feedback = "Good conceptual understanding. Make sure your implementation handles null/empty checks explicitly."
            tl_question = "How do you handle error states and boundary conditions in production?"

        # 2. Systems Architect Evaluation
        if "design" in topic_lower or "cache" in topic_lower or "limit" in topic_lower or "shard" in topic_lower:
            sa_score = 8 if not (is_short_input or is_generic_input) else 4
            sa_feedback = (
                "Solid system boundaries. But how does this hold up under network partitions (CAP theorem)? "
                "If Redis drops a connection, does your system fail-safe or block thread execution?"
            )
            sa_question = "What is your fallback mechanism if the distributed cache experiences a 500ms latency spike?"
        else:
            sa_score = 7 if not (is_short_input or is_generic_input) else 4
            sa_feedback = (
                "Consider scaling: if input data is sharded across 16 DB nodes, "
                "how do you aggregate results efficiently without triggering cross-shard fanout spikes?"
            )
            sa_question = "How would you handle rate limiting or API throttling for this endpoint?"

        # 3. Senku Ishigami Evaluation
        if is_short_input or is_generic_input or (repl_result and repl_result.get("status") == "failed"):
            senku_score = 4
            senku_rating = "Needs Science Iteration"
            senku_feedback = "Illogical! You must prove first-principles logic before moving forward."
        else:
            senku_score = 9
            senku_rating = "10 Billion Percent"
            senku_feedback = "Exhilarating! The logical framework is sound."

        senku_zpd_challenge = (
            f"Micro-Challenge (ZPD Level 2): State the exact invariant for {topic.upper()} in one sentence."
        )

        overall_score = round((tl_score + sa_score + senku_score) / 3, 1)

        if is_short_input or is_generic_input or (repl_result and repl_result.get("status") == "failed"):
            recommendation = "NEEDS REVISION (Incomplete or Failing Submission)"
        elif overall_score >= 8.5:
            recommendation = "STRONG HIRE (Target Product Engineering Standard)"
        elif overall_score >= 7.0:
            recommendation = "HIRE (Target Enterprise Standard)"
        else:
            recommendation = "NEEDS REVISION (Daily Practice Recommended)"

        return {
            "topic": topic,
            "overall_score": overall_score,
            "recommendation": recommendation,
            "panel_evaluations": {
                "tech_lead": {
                    "persona": self.PERSONAS["tech_lead"]["name"],
                    "score": tl_score,
                    "feedback": tl_feedback,
                    "probe_question": tl_question
                },
                "systems_architect": {
                    "persona": self.PERSONAS["systems_architect"]["name"],
                    "score": sa_score,
                    "feedback": sa_feedback,
                    "probe_question": sa_question
                },
                "senku": {
                    "persona": self.PERSONAS["senku"]["name"],
                    "rating": senku_rating,
                    "feedback": senku_feedback,
                    "zpd_challenge": senku_zpd_challenge
                }
            }
        }

if __name__ == "__main__":
    panel = BMadPartyPanel()
    res = panel.evaluate_submission("dsa", "hi")
    print("=== Panel Evaluation Test (Generic Input) ===")
    print(f"Score: {res['overall_score']} | Rec: {res['recommendation']}")
