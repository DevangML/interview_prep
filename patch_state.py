import json

path = "_bmad-output/live_console/SAVE_GAME_STATE.json"
with open(path, "r") as f:
    data = json.load(f)

protocol = data["console_campaign"]["coach_protocol"]
protocol["loop"] = ["SYLLABUS", "BUILD", "BREAK", "DEFEND", "CLOSE"]
protocol["batching_exception"] = "The SYLLABUS beat issues a batch of rows to exhaust. Scrimba AI handles all teaching. Coach only tracks and enforces."
if "playlist_issued" == data["console_campaign"]["progression"]["stage_status"]:
    data["console_campaign"]["progression"]["stage_status"] = "syllabus_issued"

with open(path, "w") as f:
    json.dump(data, f, indent=2)
