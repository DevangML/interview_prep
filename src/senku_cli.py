import json
import re
import os
import sys
from okf_engine import HDOKFMemoryEngine
from bmad_enricher import BMadEnricher

class SenkuCLI:
    """
    Socratic Tutoring CLI & Persona Engine.
    Supports persona modes:
    - 'default': Senku 10B% Socratic Science + Scripture Encouragement Anchor
    - 'faith_neutral': Senku 10B% Socratic Science + Inspirational Engineering Wisdom (Opt-Out Mode)
    - 'socratic_pure': Pure First-Principles Analytical Socratic Coach
    - 'enterprise_lead': Senior Engineering Hiring Manager / Technical Reviewer
    """

    WISDOM_QUOTES = {
        "faith_neutral": [
            '"Simplicity is prerequisite for reliability." — Edsger W. Dijkstra',
            '"Premature optimization is the root of all evil." — Donald Knuth',
            '"Talk is cheap. Show me the code." — Linus Torvalds',
            '"Make it work, make it right, make it fast." — Kent Beck'
        ],
        "default": [
            '"Be strong and courageous. Do not fear or be in dread of them, for it is the Lord your God who goes with you." — Deuteronomy 31:6',
            '"I can do all things through him who strengthens me." — Philippians 4:13',
            '"Whatever you do, work at it with all your heart, as working for the Lord." — Colossians 3:23'
        ]
    }

    def __init__(self, state_file=None, persona_mode="default"):
        self.okf = HDOKFMemoryEngine(state_file=state_file) if state_file else HDOKFMemoryEngine()
        self.enricher = BMadEnricher()
        self.persona_mode = persona_mode

    def set_persona_mode(self, mode: str):
        valid = ["default", "faith_neutral", "socratic_pure", "enterprise_lead"]
        if mode in valid:
            self.persona_mode = mode
            return True
        return False

    def detect_direct_code_request(self, text: str) -> bool:
        if not text:
            return False
        keywords = [
            "write code", "give me code", "give solution", "solve this for me", 
            "python code for", "full implementation", "code for"
        ]
        text_lower = text.lower()
        has_keyword = any(kw in text_lower for kw in keywords)
        has_code_regex = bool(re.search(r'\b(write|give|solve|implement)\b.*\b(code|solution)\b', text, re.IGNORECASE))
        return has_keyword or has_code_regex

    def get_wisdom_quote(self) -> str:
        if self.persona_mode == "faith_neutral":
            quotes = self.WISDOM_QUOTES["faith_neutral"]
            idx = int(os.getpid() if hasattr(os, 'getpid') else 0) % len(quotes)
            return quotes[idx]
        elif self.persona_mode == "socratic_pure":
            return '"The unexamined algorithm is not worth executing." — First Principles Directive'
        elif self.persona_mode == "enterprise_lead":
            return '"Architecture is about the important stuff. Whatever that is." — Ralph Johnson'
        else:
            quotes = self.WISDOM_QUOTES["default"]
            idx = int(os.getpid() if hasattr(os, 'getpid') else 0) % len(quotes)
            return quotes[idx]

    def format_4block_output(self, senku_analysis: str, wisdom: str, zpd_challenge: str, patch_json: list) -> str:
        patch_str = json.dumps(patch_json, indent=2)
        wisdom_header = "### 📜 Engineering Wisdom & Anchor" if self.persona_mode == "faith_neutral" else "### 📜 Encouragement Anchor"
        return (
            f"### 🧪 10B% Logical Analysis\n{senku_analysis}\n\n"
            f"{wisdom_header}\n{wisdom}\n\n"
            f"### 🎯 ZPD Micro-Challenge\n{zpd_challenge}\n\n"
            f"### 💾 OKF Memory Sync Payload\n```json\n{patch_str}\n```"
        )

    def process_turn(self, user_input: str, focus_topic: str = "dsa") -> str:
        if not user_input or not user_input.strip():
            user_input = "Explain core fundamentals"
        
        hydrated = self.okf.classify_and_hydrate(focus_topic=focus_topic, token_budget=500)
        profile = hydrated.get("user_profile") or {}
        zpd_level = profile.get("zpd_level", 2)
        
        enrichment = self.enricher.dispatch_enrichment(focus_topic, user_input)
        dispatched_skills = enrichment.get("dispatched_skills", [])
        is_code_request = self.detect_direct_code_request(user_input)
        wisdom = self.get_wisdom_quote()

        # Dynamic Socratic tutoring breakdown based on topic and query
        topic_lower = focus_topic.lower()
        input_lower = user_input.lower()

        if is_code_request:
            senku_analysis = (
                f"Get excited! But asking for copy-paste code for '{user_input}' is 10B% illogical.\n"
                f"[BMad Active: {', '.join(dispatched_skills)}]\n"
                "Before writing code, prove the underlying first-principles algorithm, invariants, and edge case bounds!"
            )
            zpd_challenge = (
                f"**Level {zpd_level} Challenge (Invariants & Traps):** State the invariant condition for "
                f"topic '{focus_topic}' before writing a single line of code. What edge case breaks a naive implementation?"
            )
            patch = [
                {"op": "replace", "path": f"/curriculum/{focus_topic}/status" if f"/curriculum/{focus_topic}" in self.okf.state else "/curriculum/dsa/status", "value": "in_progress"},
                {"op": "add", "path": "/session_history/-", "value": {"query": user_input, "topic": focus_topic, "guardrail_triggered": True, "persona_mode": self.persona_mode}}
            ]
        else:
            if "sql" in topic_lower or "join" in input_lower or "explain" in input_lower:
                senku_analysis = (
                    f"Analyzing SQL & Data query for '{user_input}'. Logic verification operating at 10B% precision.\n"
                    f"[BMad Active: {', '.join(dispatched_skills)}]\n"
                    "Let's trace how the relational engine processes FROM -> WHERE -> GROUP BY -> HAVING -> SELECT."
                )
                zpd_challenge = (
                    f"**Level {zpd_level} Micro-Challenge (SQL Pattern):** Why does an Anti-Join written as `NOT IN` fail "
                    "or return 0 rows if the subquery result contains a single NULL value?"
                )
            elif "flutter" in topic_lower or "widget" in input_lower or "stream" in input_lower:
                senku_analysis = (
                    f"Analyzing Flutter/Dart architecture for '{user_input}'.\n"
                    f"[BMad Active: {', '.join(dispatched_skills)}]\n"
                    "Let's break down the Widget -> Element -> RenderObject tree pipeline and isolate event loops."
                )
                zpd_challenge = (
                    f"**Level {zpd_level} Micro-Challenge (Dart Runtime):** How do Isolates communicate without shared memory, "
                    "and why does heavy JSON parsing freeze UI rendering if run on the main Isolate?"
                )
            elif "frappe" in topic_lower or "python" in input_lower or "decorator" in input_lower:
                senku_analysis = (
                    f"Analyzing Python/Frappe backend mechanics for '{user_input}'.\n"
                    f"[BMad Active: {', '.join(dispatched_skills)}]\n"
                    "Let's examine Python GIL thread safety, decorator wrappers, and ORM query execution."
                )
                zpd_challenge = (
                    f"**Level {zpd_level} Micro-Challenge (Python Internals):** How does Python's GIL impact CPU-bound vs IO-bound tasks, "
                    "and why does `multiprocessing` bypass GIL constraints?"
                )
            elif "system" in topic_lower or "design" in topic_lower or "cache" in input_lower:
                senku_analysis = (
                    f"Analyzing System Design scenario for '{user_input}'.\n"
                    f"[BMad Active: {', '.join(dispatched_skills)}]\n"
                    "Let's map scale bottlenecks, state machine transitions, and PACELC trade-offs."
                )
                zpd_challenge = (
                    f"**Level {zpd_level} Micro-Challenge (System Design):** How do you protect a database against a Cache Stampede (Thundering Herd) "
                    "when a popular cached key expires under 10,000 QPS?"
                )
            else:
                senku_analysis = (
                    f"Analyzing input for topic '{focus_topic}' ('{user_input}'). Logic verification operating at 10B% precision.\n"
                    f"[BMad Active: {', '.join(dispatched_skills)}]\n"
                    "Let's break down the underlying state transitions step-by-step."
                )
                zpd_challenge = (
                    f"**Level {zpd_level} Micro-Challenge (Complexity):** What is the time and space complexity of your proposed approach, "
                    "and what is the primary misconception trap?"
                )

            patch = [
                {"op": "replace", "path": f"/curriculum/{focus_topic}/status" if f"/curriculum/{focus_topic}" in self.okf.state else "/curriculum/dsa/status", "value": "in_progress"},
                {"op": "add", "path": "/session_history/-", "value": {"query": user_input, "topic": focus_topic, "persona_mode": self.persona_mode}}
            ]

        self.okf.apply_patch(patch)
        return self.format_4block_output(senku_analysis, wisdom, zpd_challenge, patch)

if __name__ == "__main__":
    mode = "default"
    prompt = "Explain memory layout of dynamic arrays"
    if len(sys.argv) > 1:
        if sys.argv[1].startswith("--mode="):
            mode = sys.argv[1].split("=")[1]
            prompt = sys.argv[2] if len(sys.argv) > 2 else prompt
        else:
            prompt = sys.argv[1]

    cli = SenkuCLI(persona_mode=mode)
    print(cli.process_turn(prompt))
