import re
import sys
import json
from okf_engine import HDOKFMemoryEngine
from bmad_enricher import BMadEnricher

class SenkuCLI:
    """
    Senku Ishigami 10B% Logical Socratic REPL Harness with Jesus Scriptural Encouragement Anchor.
    """
    SENKU_JESUS_SYSTEM_PROMPT = """
You are Senku Ishigami (Dr. STONE) paired with a Jesus Scriptural Encouragement Anchor.

Persona 1 - Senku Ishigami:
- 10B% logical, analytical, scientific, and strictly Socratic.
- Refuses to give direct solution code upfront! Demands first-principles proofs, step-by-step logic, and edge-case reasoning from the user.
- If the user asks for direct code, reprimand them logically: "Get excited! But asking for copy-paste code is 10B% illogical. Prove the logic first!"

Persona 2 - Jesus Anchor:
- Grounded, calm, encouraging, offering wisdom and faith to reduce panic, burnout, and fear of failure.
- Quotes uplifting scriptural wisdom (e.g. Philippians 4:13, Joshua 1:9) when user expresses anxiety or struggles.

Output Formatting (4-Block Markdown Structure):
1. ### 🧪 10B% Logical Analysis (Senku's Socratic Deconstruction)
2. ### 📜 Scriptural Encouragement (Jesus Anchor)
3. ### 🎯 ZPD Micro-Challenge (Targeted Question / Exercise)
4. ### 💾 OKF Memory Sync Payload (RFC 6902 JSON Patch)
"""

    def __init__(self):
        self.okf = HDOKFMemoryEngine()
        self.enricher = BMadEnricher()

    def detect_direct_code_request(self, text):
        """Guardrail checking if user is asking for direct code generation or pasting complete code."""
        keywords = ["write code", "give me code", "give solution", "solve this for me", "python code for", "full implementation"]
        return any(k in text.lower() for k in keywords)

    def adjust_zpd_difficulty(self, current_level, user_success):
        """ZPD 4-tier difficulty adjuster (Level 1: Novice -> Level 4: Master)."""
        if user_success:
            return min(4, current_level + 1)
        else:
            return max(1, current_level - 1)

    def format_4block_output(self, senku_analysis, jesus_wisdom, zpd_challenge, patch_json):
        """Formats response into the 4-Block Markdown output."""
        return f"""
### 🧪 10B% Logical Analysis
{senku_analysis}

### 📜 Scriptural Encouragement
{jesus_wisdom}

### 🎯 ZPD Micro-Challenge
{zpd_challenge}

### 💾 OKF Memory Sync Payload
```json
{json.dumps(patch_json, indent=2)}
```
"""

    def process_turn(self, user_input, focus_topic="dsa"):
        # 1. Hydrate context from OKF
        hydrated_context = self.okf.classify_and_hydrate(focus_topic=focus_topic, token_budget=500)
        zpd_level = hydrated_context.get("user_profile", {}).get("zpd_level", 2)

        # 2. Enrich context via BMad
        enrichment = self.enricher.dispatch_enrichment(topic=focus_topic, user_input=user_input)

        # 3. Check anti-sycophancy guardrail
        if self.detect_direct_code_request(user_input):
            senku_msg = (
                "Get excited! But asking for instant copy-paste code is 10B% illogical! "
                "In science and technical interviews, shortcuts build zero muscle memory. "
                "State your time complexity hypothesis and pseudocode breakdown first!"
            )
            jesus_msg = "'Be strong and courageous. Do not be afraid or terrified, for the LORD your God goes with you.' (Deuteronomy 31:6). Take a deep breath; step-by-step effort yields true mastery."
            zpd_msg = f"[Level {zpd_level} Challenge] What is the brute-force time complexity of this problem, and where is the primary bottleneck?"
            patch = [
                {"op": "replace", "path": "/user_profile/zpd_level", "value": zpd_level},
                {"op": "add", "path": "/session_history/-", "value": {"query": user_input, "guardrail_triggered": True}}
            ]
            
            # Apply patch to OKF
            self.okf.apply_patch(patch)
            return self.format_4block_output(senku_msg, jesus_msg, zpd_msg, patch)

        # Standard Socratic Response
        senku_msg = f"Analyzing '{user_input}' under topic '{focus_topic}'. Let's break this down into first principles. (Enrichment skills active: {', '.join(enrichment['dispatched_skills'])})"
        jesus_msg = "'I can do all things through Christ who strengthens me.' (Philippians 4:13). Keep pushing forward step by step!"
        zpd_msg = f"[Level {zpd_level} Challenge] Explain the invariant condition for your proposed solution before writing any code."
        
        patch = [
            {"op": "replace", "path": f"/curriculum/{focus_topic}/status", "value": "in_progress"},
            {"op": "add", "path": "/session_history/-", "value": {"query": user_input, "topic": focus_topic}}
        ]
        self.okf.apply_patch(patch)

        return self.format_4block_output(senku_msg, jesus_msg, zpd_msg, patch)

if __name__ == "__main__":
    cli = SenkuCLI()
    print("=== Senku Ishigami Socratic REPL Harness Active ===")
    if len(sys.argv) > 1:
        prompt = " ".join(sys.argv[1:])
        print(cli.process_turn(prompt))
    else:
        print(cli.process_turn("Can you write code for binary search?"))
