#!/usr/bin/env python3
"""Drills server: static files + a real progress API that writes to the save state (now with SQLite auth)."""
import json, os, datetime, threading, sqlite3, hashlib, secrets
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, ".."))
DB_PATH = os.path.join(ROOT, "_bmad-output", "react_crucible", "app.db")
TEMPLATE_STATE = os.path.join(ROOT, "_bmad-output", "react_crucible", "SAVE_GAME_STATE.json")
LOCK  = threading.Lock()

def now(): return datetime.datetime.now().isoformat(timespec="seconds")

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def get_db():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with LOCK:
        conn = get_db()
        conn.executescript("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE,
                password_hash TEXT
            );
            CREATE TABLE IF NOT EXISTS sessions (
                token TEXT PRIMARY KEY,
                user_id INTEGER
            );
            CREATE TABLE IF NOT EXISTS user_state (
                user_id INTEGER PRIMARY KEY,
                state_json TEXT
            );
            CREATE TABLE IF NOT EXISTS user_activity (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                event_json TEXT,
                created_at TEXT
            );
        """)
        conn.commit()

def load_state(user_id):
    conn = get_db()
    row = conn.execute("SELECT state_json FROM user_state WHERE user_id = ?", (user_id,)).fetchone()
    if row:
        return json.loads(row["state_json"])
    # If no state, load from template
    with open(TEMPLATE_STATE) as f:
        default_state = json.load(f)
    save_state(user_id, default_state)
    return default_state

def save_state(user_id, d):
    conn = get_db()
    conn.execute("INSERT OR REPLACE INTO user_state (user_id, state_json) VALUES (?, ?)", (user_id, json.dumps(d, ensure_ascii=False)))
    conn.commit()

def append_log(user_id, ev):
    ev["at"] = now()
    conn = get_db()
    conn.execute("INSERT INTO user_activity (user_id, event_json, created_at) VALUES (?, ?, ?)", 
                 (user_id, json.dumps(ev, ensure_ascii=False), now()))
    conn.commit()

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

    def end_headers(self):
        p = self.path.split("?")[0]
        if p.startswith("/vendor/"):
            self.send_header("Cache-Control", "public, max-age=86400")
        else:
            self.send_header("Cache-Control", "no-store, must-revalidate")
            self.send_header("Pragma", "no-cache")
        super().end_headers()

    def _json(self, obj, code=200):
        b = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(b)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers(); self.wfile.write(b)

    def get_user_id(self):
        auth_header = self.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "): return None
        token = auth_header.split(" ")[1]
        conn = get_db()
        row = conn.execute("SELECT user_id FROM sessions WHERE token = ?", (token,)).fetchone()
        return row["user_id"] if row else None

    def do_GET(self):
        if self.path.startswith("/api/auth/me"):
            uid = self.get_user_id()
            if not uid: return self._json({"error": "unauthorized"}, 401)
            conn = get_db()
            row = conn.execute("SELECT email FROM users WHERE id = ?", (uid,)).fetchone()
            return self._json({"id": uid, "email": row["email"]})

        if self.path.startswith("/api/state"):
            uid = self.get_user_id()
            if not uid: return self._json({"error": "unauthorized"}, 401)
            with LOCK: return self._json(load_state(uid))

        if self.path.startswith("/api/activity"):
            uid = self.get_user_id()
            if not uid: return self._json({"error": "unauthorized"}, 401)
            try: n = int(self.path.split("n=")[1].split("&")[0])
            except Exception: n = 12
            conn = get_db()
            rows = conn.execute("SELECT event_json FROM user_activity WHERE user_id = ? ORDER BY id DESC LIMIT ?", (uid, n)).fetchall()
            return self._json([json.loads(r["event_json"]) for r in rows])

        return super().do_GET()

    def do_POST(self):
        n = int(self.headers.get("Content-Length", 0))
        try: body = json.loads(self.rfile.read(n) or b"{}")
        except Exception: return self._json({"error": "bad json"}, 400)

        # Auth Endpoints
        if self.path.startswith("/api/auth/register"):
            email, password = body.get("email"), body.get("password")
            if not email or not password: return self._json({"error": "email and password required"}, 400)
            conn = get_db()
            try:
                cur = conn.execute("INSERT INTO users (email, password_hash) VALUES (?, ?)", (email, hash_password(password)))
                conn.commit()
                uid = cur.lastrowid
                token = secrets.token_hex(32)
                conn.execute("INSERT INTO sessions (token, user_id) VALUES (?, ?)", (token, uid))
                conn.commit()
                return self._json({"token": token, "user": {"id": uid, "email": email}})
            except sqlite3.IntegrityError:
                return self._json({"error": "email already exists"}, 400)

        if self.path.startswith("/api/auth/login"):
            email, password = body.get("email"), body.get("password")
            conn = get_db()
            row = conn.execute("SELECT id, password_hash FROM users WHERE email = ?", (email,)).fetchone()
            if row and row["password_hash"] == hash_password(password):
                token = secrets.token_hex(32)
                conn.execute("INSERT INTO sessions (token, user_id) VALUES (?, ?)", (token, row["id"]))
                conn.commit()
                return self._json({"token": token, "user": {"id": row["id"], "email": email}})
            return self._json({"error": "invalid credentials"}, 401)

        # Authenticated Endpoints
        uid = self.get_user_id()
        if not uid: return self._json({"error": "unauthorized"}, 401)

        if self.path.startswith("/api/activity"):
            append_log(uid, body); return self._json({"ok": True})

        if self.path.startswith("/api/challenge"):
            cid, done = body.get("id"), bool(body.get("done"))
            with LOCK:
                d = load_state(uid); q, c = find_challenge(d, cid)
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
                save_state(uid, d)
            append_log(uid, {"ev": "challenge", "id": cid, "done": done, "was": was,
                        "quest": q["id"], "hints": body.get("hints_used"),
                        "checks": body.get("checks")})
            return self._json({"ok": True, "progression": p, "quest": q["id"], "quest_status": q["status"]})

        if self.path.startswith("/api/lesson"):
            with LOCK:
                d = load_state(uid)
                lp = d["active_campaign"].setdefault("ladder_progress", {})
                lp[str(body.get("key"))] = {"done": bool(body.get("done")), "at": now(),
                                            "stage": body.get("stage"), "title": body.get("title")}
                d["active_campaign"]["progression"]["ladder_lessons_done"] = sum(1 for v in lp.values() if v["done"])
                save_state(uid, d)
            append_log(uid, {"ev": "lesson", **body}); return self._json({"ok": True})

        return self._json({"error": "unknown endpoint"}, 404)

if __name__ == "__main__":
    if not os.path.exists(TEMPLATE_STATE):
        print("MISSING TEMPLATE_STATE:", TEMPLATE_STATE)
    init_db()
    print("drills  → http://localhost:8777")
    print("db      →", DB_PATH)
    ThreadingHTTPServer(("127.0.0.1", 8777), H).serve_forever()
