import json
import hashlib
import os
import math
import time

def compute_fsrs_retrievability(t_days, stability):
    """
    Computes FSRS 3D Retrievability decay score R = (1 + 0.19 * t / S)^(-0.5).
    t_days: Days elapsed since last review.
    stability: Memory stability factor S > 0 in days.
    """
    if float(stability) <= 0:
        return 0.0
    t = float(t_days)
    s = float(stability)
    retrievability = (1.0 + 0.19 * (t / s)) ** -0.5
    return round(retrievability, 4)

def compute_sm2_decay(t_days, stability):
    """Backward-compatible decay helper delegating to FSRS retrievability."""
    return compute_fsrs_retrievability(t_days, stability)

class HDOKFMemoryEngine:
    """
    Hierarchical Deterministic Open Knowledge Format (HD-OKF) Memory Engine.
    Manages structured prep state, hydration within token limits (<500 tokens),
    RFC 6902 JSON patch updates, FSRS 3D Memory parameters (Difficulty D, Stability S, Retrievability R),
    hindsight mistake bank logging, state checkpointing, and SHA-256 Merkle root validation.
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
                if "hindsight_mistake_bank" not in state:
                    state["hindsight_mistake_bank"] = []
                if "checkpoints" not in state:
                    state["checkpoints"] = {}
                self._update_all_fsrs_decay(state)
                state["merkle_root"] = self.compute_merkle_root(state)
                return state
        default_state = {
            "user_profile": {
                "candidate_name": "Candidate",
                "target_role_family": "Full-Stack / Software Engineer",
                "target_timeline_months": 3,
                "current_status": "active_prep",
                "target_locations": ["Pune", "Fully Remote", "Bengaluru", "Hyderabad"],
                "target_companies": [
                    "Nvidia Pune", "Druva", "PubMatic", "Mindtickle", 
                    "BNY Mellon", "Amdocs", "Mastercard", "Persistent Systems"
                ],
                "notice_period": "30_days_relieving",
                "target_difficulty_tier": "Practical Product Engineering (LeetCode Easy-Medium + System Design + AI Context Engineering)",
                "strengths": ["AI context engineering", "BMad method", "Frontend / Full-Stack"],
                "weaknesses": ["DSA", "Math/Numericals", "Core CS subjects", "System Design", "HR/Selling"],
                "zpd_level": 2
            },
            "curriculum": {},
            "hindsight_mistake_bank": [],
            "session_history": [],
            "checkpoints": {},
            "merkle_root": ""
        }
        default_state["merkle_root"] = self.compute_merkle_root(default_state)
        return default_state

    def save_state(self):
        dir_name = os.path.dirname(self.state_file)
        if dir_name:
            os.makedirs(dir_name, exist_ok=True)
        if "hindsight_mistake_bank" not in self.state:
            self.state["hindsight_mistake_bank"] = []
        if "checkpoints" not in self.state:
            self.state["checkpoints"] = {}
        self._update_all_fsrs_decay(self.state)
        self.state["merkle_root"] = self.compute_merkle_root(self.state)
        with open(self.state_file, "w", encoding="utf-8") as f:
            json.dump(self.state, f, indent=2)

    def _update_all_fsrs_decay(self, state_dict):
        """Recalculates FSRS Retrievability R using real-time elapsed timestamps across all subtopics."""
        now_ts = time.time()
        curriculum = state_dict.get("curriculum", {})
        for topic_key, topic_data in curriculum.items():
            subtopics = topic_data.get("subtopics", {})
            for sub_key, sub_data in subtopics.items():
                fsrs = sub_data.get("fsrs", {})
                if fsrs:
                    last_ts = fsrs.get("last_reviewed_timestamp")
                    if last_ts:
                        t = max(0.0, round((now_ts - float(last_ts)) / 86400.0, 2))
                        fsrs["last_reviewed_days"] = t
                    else:
                        t = float(fsrs.get("last_reviewed_days", 0))
                    s = float(fsrs.get("stability_s", 7.0))
                    fsrs["retrievability_r"] = compute_fsrs_retrievability(t, s)
                
                sm2 = sub_data.get("sm2", {})
                if sm2:
                    last_ts = sm2.get("last_reviewed_timestamp") or (fsrs.get("last_reviewed_timestamp") if fsrs else None)
                    if last_ts:
                        t = max(0.0, round((now_ts - float(last_ts)) / 86400.0, 2))
                        sm2["last_reviewed_days"] = t
                    else:
                        t = float(sm2.get("last_reviewed_days", 0))
                    s = float(sm2.get("stability_s", 7.0))
                    sm2["retention_r"] = compute_fsrs_retrievability(t, s)

    def _update_all_sm2_decay(self, state_dict):
        """Backward-compatible alias for _update_all_fsrs_decay."""
        self._update_all_fsrs_decay(state_dict)

    def compute_fsrs_retrievability(self, t_days, stability):
        return compute_fsrs_retrievability(t_days, stability)

    def compute_sm2_decay(self, t_days, stability):
        return compute_fsrs_retrievability(t_days, stability)

    def get_decayed_topics(self, threshold=0.70):
        """Extracts subtopics where retrievability R falls below threshold."""
        self._update_all_fsrs_decay(self.state)
        decayed = []
        curriculum = self.state.get("curriculum", {})
        for topic_key, topic_data in curriculum.items():
            subtopics = topic_data.get("subtopics", {})
            for sub_key, sub_data in subtopics.items():
                fsrs = sub_data.get("fsrs", {})
                sm2 = sub_data.get("sm2", {})
                r = fsrs.get("retrievability_r") if fsrs else sm2.get("retention_r", 1.0)
                if r < threshold:
                    decayed.append({
                        "topic": topic_key,
                        "subtopic": sub_key,
                        "retention_r": r,
                        "retrievability_r": r,
                        "difficulty_d": fsrs.get("difficulty_d", 5.0) if fsrs else 5.0,
                        "stability_s": fsrs.get("stability_s") if fsrs else sm2.get("stability_s", 7.0),
                        "last_reviewed_days": fsrs.get("last_reviewed_days") if fsrs else sm2.get("last_reviewed_days", 0),
                        "status": sub_data.get("status", "pending"),
                        "mastery": sub_data.get("mastery", 0.0)
                    })
        decayed.sort(key=lambda x: x["retention_r"])
        return decayed

    def update_fsrs_memory(self, topic, subtopic, grade):
        """Updates FSRS 3D Memory Parameters storing timestamp for real-time decay."""
        curriculum = self.state.get("curriculum", {})
        if topic not in curriculum or subtopic not in curriculum[topic].get("subtopics", {}):
            return False

        now_ts = time.time()
        sub_data = curriculum[topic]["subtopics"][subtopic]
        fsrs = sub_data.setdefault("fsrs", {
            "difficulty_d": 5.0,
            "stability_s": 7.0,
            "retrievability_r": 1.0,
            "last_reviewed_days": 0,
            "last_reviewed_timestamp": now_ts,
            "interval": 1,
            "repetitions": 0,
            "grade": 3
        })

        raw_g = int(grade)
        g = max(1, min(4, raw_g))

        d_old = float(fsrs.get("difficulty_d", 5.0))
        s_old = float(fsrs.get("stability_s", 7.0))
        reps = int(fsrs.get("repetitions", 0))

        d_new = round(max(1.0, min(10.0, d_old - 0.7 * (g - 3))), 2)

        if g == 1:
            s_new = max(0.1, round(s_old * 0.4, 2))
            reps = 0
            interval = 1
        else:
            inc = 0.1 * (11.0 - d_new) * (s_old ** -0.2) * (g - 1)
            s_new = round(s_old * (1.0 + inc), 2)
            s_new = max(0.1, s_new)
            reps += 1
            interval = max(1, int(round(s_new)))

        fsrs["difficulty_d"] = d_new
        fsrs["stability_s"] = s_new
        fsrs["last_reviewed_days"] = 0
        fsrs["last_reviewed_timestamp"] = now_ts
        fsrs["retrievability_r"] = compute_fsrs_retrievability(0, s_new)
        fsrs["interval"] = interval
        fsrs["repetitions"] = reps
        fsrs["grade"] = g

        sm2 = sub_data.setdefault("sm2", {})
        sm2["last_reviewed_days"] = 0
        sm2["last_reviewed_timestamp"] = now_ts
        sm2["stability_s"] = s_new
        sm2["retention_r"] = fsrs["retrievability_r"]
        sm2["interval"] = interval
        sm2["repetitions"] = reps

        if g >= 4:
            sub_data["status"] = "completed"
            sub_data["mastery"] = min(1.0, round(sub_data.get("mastery", 0.5) + 0.2, 2))
        elif g >= 3:
            sub_data["status"] = "in_progress"
            sub_data["mastery"] = min(1.0, round(sub_data.get("mastery", 0.5) + 0.1, 2))

        self.save_state()
        return True

    def update_sm2_review(self, topic, subtopic, quality_rating):
        return self.update_fsrs_memory(topic, subtopic, quality_rating)

    def log_hindsight_mistake(self, problem_id, error_pattern, details=None):
        if "hindsight_mistake_bank" not in self.state:
            self.state["hindsight_mistake_bank"] = []

        entry = {
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "problem_id": problem_id,
            "error_pattern": error_pattern,
            "details": details or {}
        }
        self.state["hindsight_mistake_bank"].append(entry)
        self.save_state()
        return entry

    def get_hindsight_mistakes(self, limit=10):
        bank = self.state.get("hindsight_mistake_bank", [])
        return bank[-limit:]

    def get_filtered_target_roles(self, locations=None, company_type=None):
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
        serialized = json.dumps(data)
        return len(serialized) // 4

    def classify_and_hydrate(self, focus_topic="dsa", token_budget=500):
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
        Correctly handles list operations when appending to array paths such as '/session_history/-'.
        """
        for patch in patches:
            op = patch.get("op")
            raw_path = patch.get("path", "").strip("/")
            if not raw_path:
                continue
            path = raw_path.split("/")
            value = patch.get("value")

            target = self.state
            for key in path[:-1]:
                if isinstance(target, dict):
                    if key not in target:
                        target[key] = {}
                    target = target[key]
                elif isinstance(target, list):
                    idx = int(key) if key.isdigit() else 0
                    if 0 <= idx < len(target):
                        target = target[idx]
                    else:
                        target = {}

            last_key = path[-1]
            if isinstance(target, list):
                if op == "add":
                    if last_key == "-":
                        target.append(value)
                    elif last_key.isdigit():
                        target.insert(int(last_key), value)
                elif op == "replace" and last_key.isdigit():
                    idx = int(last_key)
                    if 0 <= idx < len(target):
                        target[idx] = value
                elif op == "remove" and last_key.isdigit():
                    idx = int(last_key)
                    if 0 <= idx < len(target):
                        target.pop(idx)
            elif isinstance(target, dict):
                if op in ("add", "replace"):
                    target[last_key] = value
                elif op == "remove":
                    target.pop(last_key, None)

        self.save_state()
        return self.state

    def create_checkpoint(self, name):
        """Creates a named state checkpoint with SHA-256 Merkle root hash."""
        checkpoints = self.state.setdefault("checkpoints", {})
        cp_state = json.loads(json.dumps(self.state))
        cp_state.pop("checkpoints", None)
        cp_info = {
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "merkle_root": self.compute_merkle_root(cp_state),
            "data": cp_state
        }
        checkpoints[name] = cp_info
        self.save_state()
        return cp_info["merkle_root"]

    def restore_checkpoint(self, name):
        """Restores state from a named checkpoint."""
        checkpoints = self.state.get("checkpoints", {})
        if name not in checkpoints:
            return False
        cp_data = json.loads(json.dumps(checkpoints[name]["data"]))
        cp_data["checkpoints"] = checkpoints
        self.state = cp_data
        self.save_state()
        return True

    def compute_adaptive_rag_status(self, daily_log_path=None):
        """Computes self-healing RAG status (GREEN, AMBER, RED) based on daily logs and decay."""
        if daily_log_path is None:
            daily_log_path = os.getenv("DAILY_LOG_FILE", os.path.join(os.getcwd(), "_bmad-output", "DAILY_LOG.md"))
        
        hours_logged = 0.0
        planned_hours = 4.5
        if os.path.exists(daily_log_path):
            with open(daily_log_path, "r", encoding="utf-8") as f:
                content = f.read()
                import re
                matches = re.findall(r'(\d+(?:\.\d+)?)\s*hours?', content, re.IGNORECASE)
                if matches:
                    hours_logged = sum(float(m) for m in matches)

        decayed = self.get_decayed_topics(threshold=0.70)
        if len(decayed) > 5 or hours_logged < planned_hours * 0.5:
            rag = "RED"
        elif len(decayed) > 2 or hours_logged < planned_hours * 0.8:
            rag = "AMBER"
        else:
            rag = "GREEN"

        return {
            "rag_status": rag,
            "hours_logged": hours_logged,
            "decayed_count": len(decayed),
            "decayed_topics": [d["subtopic"] for d in decayed]
        }

    def compute_merkle_root(self, data=None):
        if data is None:
            data = self.state

        clean_data = {k: v for k, v in data.items() if k not in ("merkle_root", "checkpoints")}
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
