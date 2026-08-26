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

def update_fsrs_decay_for_curriculum(curriculum_dict, now_ts=None):
    """Recalculates FSRS Retrievability R using real-time elapsed timestamps across subtopics."""
    if now_ts is None:
        now_ts = time.time()
    for topic_key, topic_data in curriculum_dict.items():
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
