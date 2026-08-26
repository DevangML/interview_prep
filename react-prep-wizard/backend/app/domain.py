"""Campaign scoring rules, ported verbatim from the original server.py so the
migration cannot change anyone's XP or rank."""
import datetime as dt


def now() -> str:
    return dt.datetime.now().isoformat(timespec="seconds")


def find_challenge(state: dict, cid: str):
    for quest in state["active_campaign"]["quests"]:
        for challenge in quest.get("challenges", []):
            if challenge["id"] == cid:
                return quest, challenge
    return None, None


def recount(state: dict) -> dict:
    campaign = state["active_campaign"]
    progression = campaign["progression"]

    done_challenges = [
        c for q in campaign["quests"] for c in q.get("challenges", []) if c.get("done")
    ]
    done_defenses = [
        d
        for q in campaign["quests"]
        for d in q.get("A3_defend", {}).get("defenses", [])
        if d.get("done")
    ]
    progression["challenges_cleared"] = len(done_challenges)
    progression["defenses_done"] = len(done_defenses)

    xp = 0
    for quest in campaign["quests"]:
        challenges = quest.get("challenges", [])
        defenses = quest.get("A3_defend", {}).get("defenses", [])
        units = len(challenges) + len(defenses)
        if units:
            hit = sum(1 for c in challenges if c.get("done")) + sum(
                1 for d in defenses if d.get("done")
            )
            xp += round(quest["xp"] * hit / units)
    progression["xp"] = xp

    for tier in sorted(progression["rank_ladder"], key=lambda r: r["at_xp"]):
        if xp >= tier["at_xp"]:
            progression["rank"] = tier["rank"]

    next_quest = next(
        (q["id"] for q in campaign["quests"] if q["status"] != "CLEARED"), None
    )
    if next_quest:
        progression["current_quest"] = next_quest

    return progression
