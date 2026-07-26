import os
import json

class BMadEnricher:
    """
    BMad Skill Enrichment Hook Bridge.
    Maps interview topics and scenarios to available workspace BMad skills
    and loads active skill prompts from .agents/skills/SKILL.md.
    """
    def __init__(self, skills_dir=None):
        if skills_dir is None:
            skills_dir = os.getenv("BMAD_SKILLS_DIR", os.path.join(os.getcwd(), ".agents", "skills"))
        self.skills_dir = skills_dir

    def get_available_skills(self):
        if not os.path.exists(self.skills_dir):
            return []
        return [d for d in os.listdir(self.skills_dir) if os.path.isdir(os.path.join(self.skills_dir, d))]

    def load_skill_prompt(self, skill_name):
        """Loads prompt instructions from installed SKILL.md if available."""
        skill_path = os.path.join(self.skills_dir, skill_name, "SKILL.md")
        if os.path.exists(skill_path):
            try:
                with open(skill_path, "r", encoding="utf-8") as f:
                    content = f.read()
                    # Return first 300 characters as prompt summary
                    lines = [line for line in content.splitlines() if not line.startswith("---")]
                    return "\n".join(lines[:10]).strip()
            except Exception:
                pass
        return f"Active guidance from BMad skill '{skill_name}'."

    def dispatch_enrichment(self, topic, user_input=""):
        """
        Dispatches context enrichment based on topic and user query,
        loading actual skill guidance.
        """
        topic_str = topic or ""
        input_str = user_input or ""
        topic_lower = topic_str.lower()
        input_lower = input_str.lower()

        recommended_skills = []

        if "code" in topic_lower or "dsa" in topic_lower or "algorithm" in input_lower:
            recommended_skills.append("bmad-code-review")
            recommended_skills.append("bmad-review-edge-case-hunter")

        if "system design" in topic_lower or "architecture" in input_lower or "party" in input_lower:
            recommended_skills.append("bmad-party-mode")

        if "hr" in topic_lower or "behavioral" in topic_lower:
            recommended_skills.append("bmad-cis-storytelling")

        if not recommended_skills:
            recommended_skills = ["bmad-code-review", "bmad-party-mode"]

        loaded_guidance = []
        for s in recommended_skills:
            loaded_guidance.append(f"[{s}]: {self.load_skill_prompt(s)}")

        enrichment_context = {
            "topic": topic,
            "dispatched_skills": recommended_skills,
            "skill_guidance": loaded_guidance,
            "enrichment_prompt": f"[BMad Enrichment Active: {', '.join(recommended_skills)}] " + " | ".join(loaded_guidance)
        }

        return enrichment_context
