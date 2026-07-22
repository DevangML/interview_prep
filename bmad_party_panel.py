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
            "focus": "Scientific method, 10 Billion Percent logical analysis, Socratic micro-challenges, scriptural encouragement.",
            "style": "Exhilarating, logical, encouraging, provides structured step-by-step guidance."
        }
    }

    def evaluate_submission(self, topic: str, user_input: str, code_submission: str = None, repl_result: dict = None) -> dict:
        """
        Conducts a multi-agent panel review turn analyzing user_input and code_submission.
        """
        topic_lower = topic.lower()
        code = code_submission or ""

        # 1. Tech Lead Evaluation
        if repl_result and repl_result.get("status") == "passed":
            tl_score = 9
            tl_feedback = (
                f"Code passed all {repl_result.get('total_tests')} test cases in {repl_result.get('execution_time_ms')}ms. "
                "Structure is clean. However, check edge cases like empty inputs, integer overflow limits, and memory allocation overhead under high throughput."
            )
            tl_question = "How would you refactor this to minimize memory allocations if this function is called 50,000 times per second?"
        elif repl_result and repl_result.get("status") == "failed":
            tl_score = 4
            tl_feedback = (
                f"Code failed tests ({repl_result.get('tests_passed')}/{repl_result.get('total_tests')} passed). "
                "Logical flaws present in boundary conditions. Fix your conditional branches before moving to optimization."
            )
            tl_question = "Walk me through the exact line where your logic fails on the failing test case."
        else:
            tl_score = 7
            tl_feedback = (
                "Good conceptual understanding of product engineering principles. Make sure your Python implementation handles null/empty checks explicitly."
            )
            tl_question = "What is the worst-case space complexity of your approach?"

        # 2. Systems Architect Evaluation
        if "design" in topic_lower or "cache" in topic_lower or "limit" in topic_lower or "shard" in topic_lower:
            sa_score = 8
            sa_feedback = (
                "Solid system boundaries. But in a Pune cloud environment, how does this hold up under network partitions (CAP theorem)? "
                "If Redis drops a connection, does your system fail-safe or block thread execution?"
            )
            sa_question = "What is your fallback mechanism if the distributed cache experiences a 500ms latency spike?"
        else:
            sa_score = 7
            sa_feedback = (
                "The algorithm is self-contained. Now consider scaling: if input data is sharded across 16 DB nodes in Pune region, "
                "how do you aggregate results efficiently without triggering cross-shard fanout spikes?"
            )
            sa_question = "How would you handle rate limiting or API throttling for this endpoint?"

        # 3. Senku Ishigami Evaluation
        senku_rating = "10 Billion Percent"
        senku_feedback = (
            "Exhilarating! The logical framework is sound. Every engineering obstacle is just a puzzle waiting for the scientific method. "
            "'Whatever you do, work at it with all your heart, as working for the Lord' (Colossians 3:23)."
        )
        senku_zpd_challenge = (
            f"Micro-Challenge (ZPD Level 2): State the exact invariant for {topic.upper()} in one sentence. "
            "Then optimize the memory footprint by 20%!"
        )

        overall_score = round((tl_score + sa_score + 9) / 3, 1)
        if overall_score >= 8.5:
            recommendation = "STRONG HIRE (Nvidia Pune / Remote Product Engineering Standard)"
        elif overall_score >= 7.0:
            recommendation = "HIRE (Target 30-Day Notice Relieving Candidate)"
        else:
            recommendation = "NEEDS REVISION (Daily SM-2 Drill Recommended)"

        return {
            "topic": topic,
            "overall_score": overall_score,
            "recommendation": recommendation,
            "panel_reviews": {
                "tech_lead": {
                    "persona": self.PERSONAS["tech_lead"]["name"],
                    "title": self.PERSONAS["tech_lead"]["title"],
                    "score": tl_score,
                    "feedback": tl_feedback,
                    "followup_question": tl_question
                },
                "systems_architect": {
                    "persona": self.PERSONAS["systems_architect"]["name"],
                    "title": self.PERSONAS["systems_architect"]["title"],
                    "score": sa_score,
                    "feedback": sa_feedback,
                    "followup_question": sa_question
                },
                "senku": {
                    "persona": self.PERSONAS["senku"]["name"],
                    "title": self.PERSONAS["senku"]["title"],
                    "rating": senku_rating,
                    "feedback": senku_feedback,
                    "zpd_challenge": senku_zpd_challenge
                }
            }
        }

    def format_transcript(self, review_res: dict) -> str:
        """Formats the panel review dict into a clean readable transcript."""
        pr = review_res["panel_reviews"]
        lines = [
            f"=== 🏛️ BMAD MULTI-AGENT MOCK INTERVIEW PANEL TRANSCRIPT ===",
            f"Topic: {review_res['topic'].upper()}",
            f"Overall Consensus Score: {review_res['overall_score']}/10",
            f"Recommendation: {review_res['recommendation']}",
            "-" * 60,
            f"👨‍💻 [{pr['tech_lead']['persona']} - {pr['tech_lead']['title']}]",
            f"  Score: {pr['tech_lead']['score']}/10",
            f"  Feedback: {pr['tech_lead']['feedback']}",
            f"  Follow-up Question: {pr['tech_lead']['followup_question']}",
            "",
            f"🏗️ [{pr['systems_architect']['persona']} - {pr['systems_architect']['title']}]",
            f"  Score: {pr['systems_architect']['score']}/10",
            f"  Feedback: {pr['systems_architect']['feedback']}",
            f"  Follow-up Question: {pr['systems_architect']['followup_question']}",
            "",
            f"🧪 [{pr['senku']['persona']} - {pr['senku']['title']}]",
            f"  Rating: {pr['senku']['rating']}",
            f"  Encouragement: {pr['senku']['feedback']}",
            f"  ZPD Micro-Challenge: {pr['senku']['zpd_challenge']}",
            "=" * 60
        ]
        return "\n".join(lines)

if __name__ == "__main__":
    panel = BMadPartyPanel()
    sample_review = panel.evaluate_submission(
        topic="dsa_two_sum",
        user_input="I used a hash map to achieve O(N) time and O(N) space complexity.",
        code_submission="def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen:\n            return [seen[target - n], i]\n        seen[n] = i\n    return []",
        repl_result={"status": "passed", "tests_passed": 5, "total_tests": 5, "execution_time_ms": 0.09}
    )
    print(panel.format_transcript(sample_review))
