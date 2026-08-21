#!/usr/bin/env python3
"""Drills server: static files + a real progress API that writes to the save state.

    python3 server.py           ->  http://localhost:8777

Writes:
  _bmad-output/react_crucible/SAVE_GAME_STATE.json   (challenge/defense/resource flags, xp)
  _bmad-output/react_crucible/ACTIVITY_LOG.jsonl     (every tab open, edit, hint, run, pass)
"""
import json, os, datetime, threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", "..", "..", "..", ".."))
STATE = os.path.join(ROOT, "_bmad-output", "react_crucible", "SAVE_GAME_STATE.json")
LOG   = os.path.join(ROOT, "_bmad-output", "react_crucible", "ACTIVITY_LOG.jsonl")
LOCK  = threading.Lock()

def now(): return datetime.datetime.now().isoformat(timespec="seconds")

def load_state():
    with open(STATE) as f: return json.load(f)

def save_state(d):
    tmp = STATE + ".tmp"
    with open(tmp, "w") as f: json.dump(d, f, indent=2, ensure_ascii=False)
    os.replace(tmp, STATE)

def append_log(ev):
    ev["at"] = now()
    with open(LOG, "a") as f: f.write(json.dumps(ev, ensure_ascii=False) + "\n")

def find_challenge(d, cid):
    for q in d["active_campaign"]["quests"]:
        for c in q.get("challenges", []):
            if c["id"] == cid: return q, c
    return None, None

def recount(d):
    c = d["active_campaign"]; p = c["progression"]
    done_ch = [x for q in c["quests"] for x in q.get("challenges", []) if x.get("done")]
    done_df = [x for q in c["quests"] for x in q.get("A3_defend", {}).get("defenses", []) if x.get("done")]
    p["challenges_cleared"] = len(done_ch)
    p["defenses_done"] = len(done_df)
    xp = 0
    for q in c["quests"]:
        ch = q.get("challenges", []); df = q.get("A3_defend", {}).get("defenses", [])
        units = len(ch) + len(df)
        if units:
            hit = sum(1 for x in ch if x.get("done")) + sum(1 for x in df if x.get("done"))
            xp += round(q["xp"] * hit / units)
    p["xp"] = xp
    for tier in sorted(p["rank_ladder"], key=lambda r: r["at_xp"]):
        if xp >= tier["at_xp"]: p["rank"] = tier["rank"]
    nxt = next((q["id"] for q in c["quests"] if q["status"] != "CLEARED"), None)
    if nxt: p["current_quest"] = nxt
    return p

class H(SimpleHTTPRequestHandler):
    def __init__(self, *a, **k): super().__init__(*a, directory=HERE, **k)
    def log_message(self, *a): pass

    def _json(self, obj, code=200):
        b = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(b)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers(); self.wfile.write(b)

    def do_GET(self):
        if self.path.startswith("/api/state"):
            with LOCK: return self._json(load_state())
        if self.path.startswith("/api/activity"):
            try: n = int(self.path.split("n=")[1].split("&")[0])
            except Exception: n = 12
            try:
                with open(LOG) as f: lines = f.readlines()[-n:]
                return self._json([json.loads(x) for x in lines if x.strip()][::-1])
            except Exception: return self._json([])
        return super().do_GET()

    def do_POST(self):
        n = int(self.headers.get("Content-Length", 0))
        try: body = json.loads(self.rfile.read(n) or b"{}")
        except Exception: return self._json({"error": "bad json"}, 400)

        if self.path.startswith("/api/activity"):
            append_log(body); return self._json({"ok": True})

        if self.path.startswith("/api/challenge"):
            cid, done = body.get("id"), bool(body.get("done"))
            with LOCK:
                d = load_state(); q, c = find_challenge(d, cid)
                if not c: return self._json({"error": "unknown challenge " + str(cid)}, 404)
                was = c.get("done", False)
                c["done"] = done
                if done: c["completed_at"] = now()
                if body.get("code"): c["last_code"] = body["code"][:8000]
                if body.get("checks") is not None: c["last_checks"] = body["checks"]
                if body.get("hints_used") is not None: c["hints_used"] = body["hints_used"]
                p = recount(d)
                if done and all(x.get("done") for x in q.get("challenges", [])) and q["status"] != "CLEARED":
                    q["status"] = "CHALLENGES_DONE"
                save_state(d)
            append_log({"ev": "challenge", "id": cid, "done": done, "was": was,
                        "quest": q["id"], "hints": body.get("hints_used"),
                        "checks": body.get("checks")})
            return self._json({"ok": True, "progression": p, "quest": q["id"], "quest_status": q["status"]})

        if self.path.startswith("/api/lesson"):
            with LOCK:
                d = load_state()
                lp = d["active_campaign"].setdefault("ladder_progress", {})
                lp[str(body.get("key"))] = {"done": bool(body.get("done")), "at": now(),
                                            "stage": body.get("stage"), "title": body.get("title")}
                d["active_campaign"]["progression"]["ladder_lessons_done"] = sum(1 for v in lp.values() if v["done"])
                save_state(d)
            append_log({"ev": "lesson", **body}); return self._json({"ok": True})

        return self._json({"error": "unknown endpoint"}, 404)

if __name__ == "__main__":
    for p in (STATE, os.path.dirname(LOG)):
        if not os.path.exists(p if p.endswith(".json") else p):
            print("MISSING:", p)
    open(LOG, "a").close()
    print("drills  → http://localhost:8777")
    print("state   →", STATE)
    print("log     →", LOG)
    ThreadingHTTPServer(("127.0.0.1", 8777), H).serve_forever()
