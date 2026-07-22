import json
import hashlib
import os
import math

def compute_sm2_decay(t_days, stability):
    """
    Computes Ebbinghaus retention decay score R = e^(-t / S).
    t_days: Days elapsed since last review.
    stability: Stability factor S in days.
    """
    if float(stability) <= 0:
        return 0.0
    decay = math.exp(-float(t_days) / float(stability))
    return round(decay, 4)

class HDOKFMemoryEngine:
    """
    Hierarchical Deterministic Open Knowledge Format (HD-OKF) Memory Engine.
    Manages structured prep state, hydration within token limits (<500 tokens),
    RFC 6902 JSON patch updates, SM-2 retention decay (Ebbinghaus curve),
    and SHA-256 Merkle root validation.
    """
    def __init__(self, state_file="/Users/devang/Desktop/interview_prep/_bmad-output/okf_state.json"):
        self.state_file = state_file
        self.state = self.load_state()

    def load_state(self):
        if os.path.exists(self.state_file):
            with open(self.state_file, "r", encoding="utf-8") as f:
                state = json.load(f)
                self._update_all_sm2_decay(state)
                state["merkle_root"] = self.compute_merkle_root(state)
                return state
        default_state = {
            "user_profile": {
                "target_timeline_months": 3,
                "current_status": "active_prep",
                "target_locations": ["Pune", "Fully Remote"],
                "target_companies": [
                    "Nvidia Pune", "Druva", "PubMatic", "Mindtickle", 
                    "BNY Mellon", "Amdocs", "Mastercard"
                ],
                "notice_period": "30_days_relieving",
                "target_difficulty_tier": "Practical Product Engineering (LeetCode Easy-Medium + System Design + AI Context Engineering)",
                "strengths": ["AI context engineering", "BMad method", "Frontend (Flutter, HTML/CSS)"],
                "weaknesses": ["DSA", "Math/Numericals", "Core CS subjects", "System Design", "HR/Selling"],
                "zpd_level": 2
            },
            "curriculum": {},
            "session_history": [],
            "merkle_root": ""
        }
        default_state["merkle_root"] = self.compute_merkle_root(default_state)
        return default_state

    def save_state(self):
        os.makedirs(os.path.dirname(self.state_file), exist_ok=True)
        self._update_all_sm2_decay(self.state)
        self.state["merkle_root"] = self.compute_merkle_root(self.state)
        with open(self.state_file, "w", encoding="utf-8") as f:
            json.dump(self.state, f, indent=2)

    def _update_all_sm2_decay(self, state_dict):
        """Recalculates R = e^(-t/S) across all subtopics in state."""
        curriculum = state_dict.get("curriculum", {})
        for topic_key, topic_data in curriculum.items():
            subtopics = topic_data.get("subtopics", {})
            for sub_key, sub_data in subtopics.items():
                sm2 = sub_data.get("sm2", {})
                if sm2:
                    t = sm2.get("last_reviewed_days", 0)
                    s = sm2.get("stability_s", 7.0)
                    sm2["retention_r"] = compute_sm2_decay(t, s)

    def compute_sm2_decay(self, t_days, stability):
        """Instance helper wrapper for compute_sm2_decay."""
        return compute_sm2_decay(t_days, stability)

    def get_decayed_topics(self, threshold=0.70):
        """
        Extracts subtopics where memory retention score R = e^(-t/S) falls below threshold (default 0.70).
        These represent topics requiring automated daily drills.
        """
        self._update_all_sm2_decay(self.state)
        decayed = []
        curriculum = self.state.get("curriculum", {})
        for topic_key, topic_data in curriculum.items():
            subtopics = topic_data.get("subtopics", {})
            for sub_key, sub_data in subtopics.items():
                sm2 = sub_data.get("sm2", {})
                r = sm2.get("retention_r", 1.0)
                if r < threshold:
                    decayed.append({
                        "topic": topic_key,
                        "subtopic": sub_key,
                        "retention_r": r,
                        "stability_s": sm2.get("stability_s", 7.0),
                        "last_reviewed_days": sm2.get("last_reviewed_days", 0),
                        "status": sub_data.get("status", "pending"),
                        "mastery": sub_data.get("mastery", 0.0)
                    })
        # Sort by lowest retention first
        decayed.sort(key=lambda x: x["retention_r"])
        return decayed

    def update_sm2_review(self, topic, subtopic, quality_rating):
        """
        Applies SuperMemo SM-2 algorithm update given review rating q (0 to 5).
        Updates EF, intervals, stability, last_reviewed_days, and retention R.
        """
        curriculum = self.state.get("curriculum", {})
        if topic not in curriculum or subtopic not in curriculum[topic].get("subtopics", {}):
            return False

        sm2 = curriculum[topic]["subtopics"][subtopic].setdefault("sm2", {
            "last_reviewed_days": 0,
            "stability_s": 7.0,
            "retention_r": 1.0,
            "ease_factor": 2.5,
            "interval": 1,
            "repetitions": 0
        })

        q = max(0, min(5, int(quality_rating)))
        ef = sm2.get("ease_factor", 2.5)
        new_ef = ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
        new_ef = max(1.3, round(new_ef, 2))

        reps = sm2.get("repetitions", 0)
        interval = sm2.get("interval", 1)

        if q >= 3:
            if reps == 0:
                interval = 1
            elif reps == 1:
                interval = 6
            else:
                interval = max(1, int(round(interval * new_ef)))
            reps += 1
        else:
            reps = 0
            interval = 1

        sm2["ease_factor"] = new_ef
        sm2["repetitions"] = reps
        sm2["interval"] = interval
        sm2["stability_s"] = float(interval)
        sm2["last_reviewed_days"] = 0
        sm2["retention_r"] = compute_sm2_decay(0, sm2["stability_s"])

        # Update subtopic status & mastery
        sub_data = curriculum[topic]["subtopics"][subtopic]
        if q >= 4:
            sub_data["status"] = "completed"
            sub_data["mastery"] = min(1.0, round(sub_data.get("mastery", 0.5) + 0.2, 2))
        elif q >= 3:
            sub_data["status"] = "in_progress"
            sub_data["mastery"] = min(1.0, round(sub_data.get("mastery", 0.5) + 0.1, 2))

        self.save_state()
        return True

    def get_filtered_target_roles(self, locations=None, company_type=None):
        """
        Returns candidate target profile filtered by target locations and notice period constraints.
        """
        user_profile = self.state.get("user_profile", {})
        target_locs = user_profile.get("target_locations", ["Pune", "Fully Remote"])
        companies = user_profile.get("target_companies", [])
        notice = user_profile.get("notice_period", "30_days_relieving")
        tier = user_profile.get("target_difficulty_tier", "Practical Product Engineering")

        if locations:
            filtered_locs = [l for l in target_locs if l in locations]
        else:
            filtered_locs = target_locs

        return {
            "target_locations": filtered_locs,
            "target_companies": companies,
            "notice_period": notice,
            "difficulty_tier": tier,
            "zpd_level": user_profile.get("zpd_level", 2)
        }

    def estimate_tokens(self, data):
        """Estimates token count (~4 characters per token)."""
        serialized = json.dumps(data)
        return len(serialized) // 4

    def classify_and_hydrate(self, focus_topic="dsa", token_budget=500):
        """
        Extracts relevant sub-tree for target topic while keeping payload < token_budget.
        """
        self._update_all_sm2_decay(self.state)
        hydrated = {
            "user_profile": self.state.get("user_profile", {}),
            "topic_state": {}
        }
        
        curriculum = self.state.get("curriculum", {})
        if focus_topic in curriculum:
            hydrated["topic_state"][focus_topic] = curriculum[focus_topic]
        else:
            hydrated["topic_state"] = {k: v.get("status") for k, v in curriculum.items()}

        tokens = self.estimate_tokens(hydrated)
        if tokens > token_budget:
            hydrated["topic_state"] = {focus_topic: curriculum.get(focus_topic, {}).get("subtopics", {})}

        return hydrated

    def apply_patch(self, patches):
        """
        Applies RFC 6902 JSON patch operations (add, replace, remove).
        """
        for patch in patches:
            op = patch.get("op")
            path = patch.get("path", "").strip("/").split("/")
            value = patch.get("value")

            if not path or path == [""]:
                continue

            target = self.state
            for key in path[:-1]:
                if key not in target or not isinstance(target[key], dict):
                    target[key] = {}
                target = target[key]

            last_key = path[-1]
            if op == "add" or op == "replace":
                target[last_key] = value
            elif op == "remove":
                if last_key in target:
                    del target[last_key]

        self.save_state()
        return self.state

    def compute_merkle_root(self, data=None):
        """
        Computes SHA256 Merkle root hash of state keys (excluding merkle_root itself).
        """
        if data is None:
            data = self.state

        clean_data = {k: v for k, v in data.items() if k != "merkle_root"}
        leaf_hashes = []
        for key in sorted(clean_data.keys()):
            val_bytes = json.dumps(clean_data[key], sort_keys=True).encode("utf-8")
            leaf_hashes.append(hashlib.sha256(val_bytes).hexdigest())

        if not leaf_hashes:
            return hashlib.sha256(b"empty").hexdigest()

        current_layer = leaf_hashes
        while len(current_layer) > 1:
            next_layer = []
            for i in range(0, len(current_layer), 2):
                if i + 1 < len(current_layer):
                    combined = (current_layer[i] + current_layer[i+1]).encode("utf-8")
                else:
                    combined = (current_layer[i] + current_layer[i]).encode("utf-8")
                next_layer.append(hashlib.sha256(combined).hexdigest())
            current_layer = next_layer

        return current_layer[0]

    def compact_checkpoints(self):
        """
        Compacts session history to keep state size optimized.
        """
        if "session_history" in self.state and len(self.state["session_history"]) > 10:
            self.state["session_history"] = self.state["session_history"][-10:]
            self.save_state()

if __name__ == "__main__":
    engine = HDOKFMemoryEngine()
    print("Loaded OKF Memory Engine successfully.")
    print("Merkle Root:", engine.state["merkle_root"])
    print("Target Roles Filter:", engine.get_filtered_target_roles())
    decayed = engine.get_decayed_topics(0.70)
    print(f"Decayed Topics (R < 0.70) [{len(decayed)} total]:")
    for d in decayed:
        print(f" - [{d['topic']}/{d['subtopic']}] R={d['retention_r']} (Last reviewed {d['last_reviewed_days']} days ago, S={d['stability_s']} days)")
