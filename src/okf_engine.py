import json
import os
import time
from okf.fsrs import compute_fsrs_retrievability, compute_sm2_decay, update_fsrs_decay_for_curriculum
from okf.merkle import compute_merkle_root
from okf.patch import apply_rfc6902_patch
from okf.constants import DEFAULT_USER_PROFILE

class HDOKFMemoryEngine:
    """
    Hierarchical Deterministic Open Knowledge Format (HD-OKF) Memory Engine.
    Manages structured prep state, hydration within token limits (<500 tokens),
    RFC 6902 JSON patch updates, FSRS 3D Memory parameters, and SHA-256 Merkle root validation.
    """
    def __init__(self, state_file=None):
        if state_file is None:
            state_file = os.getenv("OKF_STATE_FILE", os.path.join(os.getcwd(), "_bmad-output", "okf_state.json"))
        self.state_file = state_file
        self.state = self.load_state()

    def load_state(self):
        if os.path.exists(self.state_file):
            with open(self.state_file, "r", encoding="utf-8") as f:
                state = json.load(f)
                state.setdefault("hindsight_mistake_bank", [])
                state.setdefault("checkpoints", {})
                update_fsrs_decay_for_curriculum(state.get("curriculum", {}))
                state["merkle_root"] = compute_merkle_root(state)
                return state
        default_state = {
            "user_profile": dict(DEFAULT_USER_PROFILE),
            "curriculum": {}, "hindsight_mistake_bank": [],
            "session_history": [], "checkpoints": {}, "merkle_root": ""
        }
        default_state["merkle_root"] = compute_merkle_root(default_state)
        return default_state

    def save_state(self):
        dir_name = os.path.dirname(self.state_file)
        if dir_name:
            os.makedirs(dir_name, exist_ok=True)
        self.state.setdefault("hindsight_mistake_bank", [])
        self.state.setdefault("checkpoints", {})
        update_fsrs_decay_for_curriculum(self.state.get("curriculum", {}))
        self.state["merkle_root"] = compute_merkle_root(self.state)
        with open(self.state_file, "w", encoding="utf-8") as f:
            json.dump(self.state, f, indent=2)

    def _update_all_fsrs_decay(self, state_dict):
        update_fsrs_decay_for_curriculum(state_dict.get("curriculum", {}))

    def _update_all_sm2_decay(self, state_dict):
        update_fsrs_decay_for_curriculum(state_dict.get("curriculum", {}))

    def compute_fsrs_retrievability(self, t_days, stability):
        return compute_fsrs_retrievability(t_days, stability)

    def compute_sm2_decay(self, t_days, stability):
        return compute_sm2_decay(t_days, stability)

    def get_decayed_topics(self, threshold=0.70):
        update_fsrs_decay_for_curriculum(self.state.get("curriculum", {}))
        decayed = []
        curriculum = self.state.get("curriculum", {})
        for topic_key, topic_data in curriculum.items():
            for sub_key, sub_data in topic_data.get("subtopics", {}).items():
                fsrs = sub_data.get("fsrs", {})
                sm2 = sub_data.get("sm2", {})
                r = fsrs.get("retrievability_r") if fsrs else sm2.get("retention_r", 1.0)
                if r < threshold:
                    decayed.append({
                        "topic": topic_key, "subtopic": sub_key, "retention_r": r, "retrievability_r": r,
                        "difficulty_d": fsrs.get("difficulty_d", 5.0) if fsrs else 5.0,
                        "stability_s": fsrs.get("stability_s") if fsrs else sm2.get("stability_s", 7.0),
                        "last_reviewed_days": fsrs.get("last_reviewed_days") if fsrs else sm2.get("last_reviewed_days", 0),
                        "status": sub_data.get("status", "pending"), "mastery": sub_data.get("mastery", 0.0)
                    })
        decayed.sort(key=lambda x: x["retention_r"])
        return decayed

    def update_fsrs_memory(self, topic, subtopic, grade):
        curriculum = self.state.get("curriculum", {})
        if topic not in curriculum or subtopic not in curriculum[topic].get("subtopics", {}):
            return False

        now_ts = time.time()
        sub_data = curriculum[topic]["subtopics"][subtopic]
        fsrs = sub_data.setdefault("fsrs", {
            "difficulty_d": 5.0, "stability_s": 7.0, "retrievability_r": 1.0,
            "last_reviewed_days": 0, "last_reviewed_timestamp": now_ts,
            "interval": 1, "repetitions": 0, "grade": 3
        })

        g = max(1, min(4, int(grade)))
        d_old, s_old, reps = float(fsrs.get("difficulty_d", 5.0)), float(fsrs.get("stability_s", 7.0)), int(fsrs.get("repetitions", 0))
        d_new = round(max(1.0, min(10.0, d_old - 0.7 * (g - 3))), 2)

        if g == 1:
            s_new, reps, interval = max(0.1, round(s_old * 0.4, 2)), 0, 1
        else:
            inc = 0.1 * (11.0 - d_new) * (s_old ** -0.2) * (g - 1)
            s_new = max(0.1, round(s_old * (1.0 + inc), 2))
            reps += 1
            interval = max(1, int(round(s_new)))

        fsrs.update({"difficulty_d": d_new, "stability_s": s_new, "last_reviewed_days": 0,
                     "last_reviewed_timestamp": now_ts, "retrievability_r": compute_fsrs_retrievability(0, s_new),
                     "interval": interval, "repetitions": reps, "grade": g})

        sub_data.setdefault("sm2", {}).update({
            "last_reviewed_days": 0, "last_reviewed_timestamp": now_ts, "stability_s": s_new,
            "retention_r": fsrs["retrievability_r"], "interval": interval, "repetitions": reps
        })

        if g >= 4:
            sub_data["status"], sub_data["mastery"] = "completed", min(1.0, round(sub_data.get("mastery", 0.5) + 0.2, 2))
        elif g >= 3:
            sub_data["status"], sub_data["mastery"] = "in_progress", min(1.0, round(sub_data.get("mastery", 0.5) + 0.1, 2))

        self.save_state()
        return True

    def update_sm2_review(self, topic, subtopic, quality_rating):
        return self.update_fsrs_memory(topic, subtopic, quality_rating)

    def log_hindsight_mistake(self, problem_id, error_pattern, details=None):
        self.state.setdefault("hindsight_mistake_bank", [])
        entry = {"timestamp": time.strftime("%Y-%m-%d %H:%M:%S"), "problem_id": problem_id, "error_pattern": error_pattern, "details": details or {}}
        self.state["hindsight_mistake_bank"].append(entry)
        self.save_state()
        return entry

    def get_hindsight_mistakes(self, limit=10):
        return self.state.get("hindsight_mistake_bank", [])[-limit:]

    def get_filtered_target_roles(self, locations=None, company_type=None):
        profile = self.state.get("user_profile", {})
        locs = profile.get("target_locations", ["Pune", "Fully Remote"])
        return {
            "target_locations": [l for l in locs if l in locations] if locations else locs,
            "target_companies": profile.get("target_companies", []),
            "notice_period": profile.get("notice_period", "30_days_relieving"),
            "difficulty_tier": profile.get("target_difficulty_tier", "Practical Product Engineering"),
            "zpd_level": profile.get("zpd_level", 2)
        }

    def estimate_tokens(self, data):
        return len(json.dumps(data)) // 4

    def classify_and_hydrate(self, focus_topic="dsa", token_budget=500):
        update_fsrs_decay_for_curriculum(self.state.get("curriculum", {}))
        curriculum = self.state.get("curriculum", {})
        hydrated = {
            "user_profile": self.state.get("user_profile", {}),
            "topic_state": {focus_topic: curriculum[focus_topic]} if focus_topic in curriculum else {k: v.get("status") for k, v in curriculum.items()}
        }
        if self.estimate_tokens(hydrated) > token_budget:
            hydrated["topic_state"] = {focus_topic: curriculum.get(focus_topic, {}).get("subtopics", {})}
        return hydrated

    def apply_patch(self, patches):
        apply_rfc6902_patch(self.state, patches)
        self.save_state()
        return self.state

    def create_checkpoint(self, name):
        cp_state = json.loads(json.dumps(self.state))
        cp_state.pop("checkpoints", None)
        cp_info = {"timestamp": time.strftime("%Y-%m-%d %H:%M:%S"), "merkle_root": compute_merkle_root(cp_state), "data": cp_state}
        self.state.setdefault("checkpoints", {})[name] = cp_info
        self.save_state()
        return cp_info["merkle_root"]

    def restore_checkpoint(self, name):
        checkpoints = self.state.get("checkpoints", {})
        if name not in checkpoints: return False
        cp_data = json.loads(json.dumps(checkpoints[name]["data"]))
        cp_data["checkpoints"] = checkpoints
        self.state = cp_data
        self.save_state()
        return True

    def compute_adaptive_rag_status(self, daily_log_path=None):
        if daily_log_path is None:
            daily_log_path = os.getenv("DAILY_LOG_FILE", os.path.join(os.getcwd(), "_bmad-output", "DAILY_LOG.md"))
        hours = 0.0
        if os.path.exists(daily_log_path):
            with open(daily_log_path, "r", encoding="utf-8") as f:
                import re
                matches = re.findall(r'(\d+(?:\.\d+)?)\s*hours?', f.read(), re.IGNORECASE)
                if matches: hours = sum(float(m) for m in matches)
        decayed = self.get_decayed_topics(threshold=0.70)
        rag = "RED" if (len(decayed) > 5 or hours < 2.25) else ("AMBER" if (len(decayed) > 2 or hours < 3.6) else "GREEN")
        return {"rag_status": rag, "hours_logged": hours, "decayed_count": len(decayed), "decayed_topics": [d["subtopic"] for d in decayed]}

    def compute_merkle_root(self, data=None):
        return compute_merkle_root(data if data is not None else self.state)
