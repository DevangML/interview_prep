"""End-to-end smoke test against a real database (sqlite for CI speed,
identical code paths on Postgres). Run: python tests_smoke.py"""
import os, tempfile, subprocess, sys, json

tmp = tempfile.mkdtemp()
os.environ["DATABASE_URL"] = f"sqlite+pysqlite:///{tmp}/smoke.db"
os.environ["STATIC_DIR"] = "./nonexistent"

from app.db import Base, engine
from app import models  # noqa: F401
Base.metadata.create_all(engine)



from fastapi.testclient import TestClient
from app.main import app

c = TestClient(app)

assert c.get("/api/health").json()["ok"] is True

r = c.post("/api/auth/register", json={"email": "A@Example.com", "password": "hunter2hunter2"})
assert r.status_code == 200, r.text
tok = r.json()["token"]
h = {"Authorization": f"Bearer {tok}"}

assert c.get("/api/state").status_code == 401, "unauthenticated read must be rejected"
assert c.get("/api/auth/me", headers=h).json()["email"] == "a@example.com"

# duplicate registration
assert c.post("/api/auth/register", json={"email": "a@example.com", "password": "hunter2hunter2"}).status_code == 400
# wrong password
assert c.post("/api/auth/login", json={"email": "a@example.com", "password": "wrongwrongwrong"}).status_code == 401
# right password
assert c.post("/api/auth/login", json={"email": "a@example.com", "password": "hunter2hunter2"}).status_code == 200

state = c.get("/api/state", headers=h).json()
cid = next(c["id"] for q in state["active_campaign"]["quests"]
           for c in q.get("challenges", []) if not c.get("done"))
before = state["active_campaign"]["progression"]["xp"]

r = c.post("/api/challenge", headers=h, json={"id": cid, "done": True, "checks": 3, "hints_used": 1})
assert r.status_code == 200, r.text
after = r.json()["progression"]["xp"]
assert after > before, f"xp did not advance: {before} -> {after}"

# persisted, not just echoed
assert c.get("/api/state", headers=h).json()["active_campaign"]["progression"]["xp"] == after

assert c.post("/api/challenge", headers=h, json={"id": "nope", "done": True}).status_code == 404

c.post("/api/lesson", headers=h, json={"key": "s1:l1", "done": True, "stage": "1", "title": "t"})
acts = c.get("/api/activity?n=50", headers=h).json()
assert any(a["ev"] == "lesson" for a in acts) and any(a["ev"] == "challenge" for a in acts)

exp = c.get("/api/export", headers=h).json()
assert exp["state"]["active_campaign"]["progression"]["xp"] == after
assert len(exp["activity"]) >= 2

# legacy unsalted sha256 hash must still authenticate, then be upgraded
import hashlib
from sqlalchemy import select
from app.db import SessionLocal
from app.models import User
db = SessionLocal()
db.add(User(email="legacy@example.com", password_hash=hashlib.sha256(b"oldpassword1").hexdigest()))
db.commit()
assert c.post("/api/auth/login", json={"email": "legacy@example.com", "password": "oldpassword1"}).status_code == 200
db.expire_all()
u = db.scalar(select(User).where(User.email == "legacy@example.com"))
assert u.password_hash.startswith("pbkdf2_sha256$"), "legacy hash was not upgraded on login"

# tokens are not stored in the clear
from app.models import SessionToken
assert db.get(SessionToken, tok) is None
db.close()

# Test full state sync endpoints
sync_res = c.get("/api/sync/full-state", headers=h)
assert sync_res.status_code == 200, sync_res.text
full_state = sync_res.json()
assert "mastery" in full_state and "learn" in full_state

# Test bulk merge
merge_res = c.post(
    "/api/sync/bulk-merge",
    headers=h,
    json={
        "mastery": {
            "solved_units": {"unit_test_1": True},
            "code_snapshots": {"unit_test_1": "const a = 1;"},
        },
        "learn": {
            "completed_topics": {"topic_test_1": True},
        },
        "playground": {
            "jsx": "<h1>Hello</h1>",
        },
    },
)
assert merge_res.status_code == 200, merge_res.text
merged = merge_res.json()["state"]
assert merged["mastery"]["solved_units"]["unit_test_1"] is True
assert merged["learn"]["completed_topics"]["topic_test_1"] is True
assert merged["playground"]["jsx"] == "<h1>Hello</h1>"

# Test granular mastery solve
solve_res = c.post(
    "/api/mastery/solve",
    headers=h,
    json={
        "unit_id": "unit_test_2",
        "done": True,
        "code": "const b = 2;",
        "schedule_review": {"reps": 1, "intervalDays": 1},
    },
)
assert solve_res.status_code == 200, solve_res.text

# Test learn toggle
learn_res = c.post(
    "/api/learn/toggle",
    headers=h,
    json={"topic_id": "topic_test_2", "done": True},
)
assert learn_res.status_code == 200, learn_res.text

# Test rapidfire record
rf_res = c.post(
    "/api/rapidfire/record",
    headers=h,
    json={"score": 8, "total": 10, "exam_mode": True},
)
assert rf_res.status_code == 200, rf_res.text
assert rf_res.json()["high_score"] >= 8

# Verify full state retrieved after granular updates
updated_state = c.get("/api/sync/full-state", headers=h).json()
assert updated_state["mastery"]["solved_units"]["unit_test_2"] is True
assert updated_state["learn"]["completed_topics"]["topic_test_2"] is True
assert updated_state["rapid_fire"]["high_score"] >= 8

print("smoke: all assertions passed")

