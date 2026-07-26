import json
import re
from okf_engine import HDOKFMemoryEngine
from bmad_enricher import BMadEnricher

class SenkuCLI:
    SENKU_JESUS_SYSTEM_PROMPT = (
        "You are Senku Ishigami (Dr. STONE) paired with a Jesus Scriptural Encouragement Anchor.\n"
        "Persona 1 - Senku Ishigami: 10B% logical, analytical, scientific, and strictly Socratic. "
        "Refuses to give direct solution code upfront!\n"
        "Persona 2 - Jesus Anchor: Grounded, calm, encouraging, offering wisdom and faith."
    )

    def __init__(self, state_file=None):
        self.okf = HDOKFMemoryEngine(state_file=state_file) if state_file else HDOKFMemoryEngine()
        self.enricher = BMadEnricher()

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

    def adjust_zpd_difficulty(self, current_level: int, user_success: bool) -> int:
        lvl = current_level if isinstance(current_level, int) else 2
        if user_success:
            return min(4, lvl + 1)
        return max(1, lvl - 1)

    def format_4block_output(self, senku_analysis: str, jesus_wisdom: str, zpd_challenge: str, patch_json: list) -> str:
        patch_str = json.dumps(patch_json, indent=2)
        return (
            f"### 🧪 10B% Logical Analysis\n{senku_analysis}\n\n"
            f"### 📜 Scriptural Encouragement\n{jesus_wisdom}\n\n"
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
        is_code_request = self.detect_direct_code_request(user_input)

        if is_code_request:
            senku_analysis = (
                "Get excited! But asking for copy-paste code is 10B% illogical. "
                "Prove the underlying first-principles algorithm and pointer bounds first!"
            )
            jesus_wisdom = (
                '"Be strong and courageous. Do not fear or be in dread of them, '
                'for it is the Lord your God who goes with you." — Deuteronomy 31:6'
            )
            zpd_challenge = (
                f"**Level {zpd_level} Challenge (Misconception Trap):** State the invariant condition for two-pointer search "
                "before writing a single line of code."
            )
            patch = [
                {"op": "replace", "path": "/curriculum/dsa/status", "value": "in_progress"},
                {"op": "add", "path": "/session_history/-", "value": {"query": user_input, "topic": focus_topic, "guardrail_triggered": True}}
            ]
        else:
            senku_analysis = (
                f"Analyzing input for topic '{focus_topic}'. Logic verification is operating at 10B% precision. "
                "Let's break down the underlying state machine step-by-step."
            )
            jesus_wisdom = (
                '"I can do all things through him who strengthens me." — Philippians 4:13'
            )
            zpd_challenge = (
                f"**Level {zpd_level} Micro-Challenge (Misconception Trap):** What is the amortized time complexity "
                "when resizing a dynamic array, and why?"
            )
            patch = [
                {"op": "replace", "path": "/curriculum/dsa/status", "value": "in_progress"},
                {"op": "add", "path": "/session_history/-", "value": {"query": user_input, "topic": focus_topic}}
            ]

        self.okf.apply_patch(patch)
        return self.format_4block_output(senku_analysis, jesus_wisdom, zpd_challenge, patch)

if __name__ == "__main__":
    import sys
    cli = SenkuCLI()
    prompt = sys.argv[1] if len(sys.argv) > 1 else "Explain memory layout of dynamic arrays"
    print(cli.process_turn(prompt))
