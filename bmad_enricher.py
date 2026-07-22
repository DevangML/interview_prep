import os
import json

class BMadEnricher:
    """
    BMad Skill Enrichment Hook Bridge.
    Maps interview topics and scenarios to available workspace BMad skills.
    """
    def __init__(self, skills_dir="/Users/devang/Desktop/interview_prep/.agents/skills"):
        self.skills_dir = skills_dir

    def get_available_skills(self):
        if not os.path.exists(self.skills_dir):
            return []
        return [d for d in os.listdir(self.skills_dir) if os.path.isdir(os.path.join(self.skills_dir, d))]

    def dispatch_enrichment(self, topic, user_input=""):
        """
        Dispatches context enrichment based on topic and user query.
        Primary mapped skills:
        - bmad-code-review
        - bmad-review-edge-case-hunter
        - bmad-party-mode
        """
        topic_lower = topic.lower()
        input_lower = user_input.lower()

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

        enrichment_context = {
            "topic": topic,
            "dispatched_skills": recommended_skills,
            "enrichment_prompt": f"[BMad Enrichment Active: {', '.join(recommended_skills)}] Applying multi-perspective analysis and edge-case detection to topic '{topic}'."
        }

        return enrichment_context
