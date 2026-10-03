"""Finite curriculum assembly and evidence ledger; no automatic mastery claims."""
from __future__ import annotations

import argparse
import csv
import io
import json
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
FACETS = ("explain", "implement", "diagnose", "transfer", "recall")
REQUIRED = {"id", "area", "tier", "topic", "subtopics", "techniques", "prerequisites",
            "project_module", "exercise", "interview_questions", "answer_criteria",
            "failure_trap", "source_urls", "estimated_hours", "evidence_status"}


def catalog():
    rows = []
    for name in ("languages", "systems", "extensions"):
        rows.extend(json.loads((HERE / f"{name}.json").read_text()))
    return rows


def validate(rows):
    by_id = {}
    for row in rows:
        if not REQUIRED <= row.keys():
            raise ValueError(f"{row.get('id')}: missing fields {REQUIRED - row.keys()}")
        if row["id"] in by_id:
            raise ValueError(f"Duplicate ID: {row['id']}")
        if row["tier"] not in {"core", "depth", "extension"}:
            raise ValueError(f"Invalid tier: {row['id']}")
        if row["evidence_status"] != "unassessed":
            raise ValueError("Catalog cannot assert learner mastery")
        for key in ("subtopics", "techniques", "interview_questions", "answer_criteria", "source_urls"):
            if not row[key] or any(not isinstance(x, str) or not x.strip() for x in row[key]):
                raise ValueError(f"{row['id']}: empty {key}")
        if not row["exercise"].strip() or not row["failure_trap"].strip():
            raise ValueError(f"{row['id']}: no exercise/trap")
        if not isinstance(row["estimated_hours"], (int, float)) or row["estimated_hours"] <= 0:
            raise ValueError(f"{row['id']}: invalid planning hours")
        by_id[row["id"]] = row
    ordered, visiting, done = [], set(), set()

    def visit(key):
        if key in visiting:
            raise ValueError(f"Dependency cycle at {key}")
        if key in done:
            return
        if key not in by_id:
            raise ValueError(f"Unknown prerequisite: {key}")
        visiting.add(key)
        for parent in by_id[key]["prerequisites"]:
            visit(parent)
        visiting.remove(key)
        done.add(key)
        ordered.append(key)

    for key in by_id:
        visit(key)
    return by_id, ordered


def empty_entry():
    return {"status": "unassessed", "facets": {k: None for k in FACETS}, "history": []}


def read_state(rows):
    file = HERE / "state.json"
    if file.exists():
        state = json.loads(file.read_text())
    else:
        state = {"version": 1, "role_id": "00068039437",
                 "hours_per_day": {"min": 4, "max": 6}, "deadline": None,
                 "policy": "reference artifacts never close learner competencies",
                 "competencies": {}}
    for row in rows:
        state["competencies"].setdefault(row["id"], empty_entry())
    return state


def qualifies(entry):
    return all(entry["facets"][f] is not None
               and entry["facets"][f]["score"] == 3
               and entry["facets"][f]["assessor"] == "coach"
               and entry["facets"][f]["evidence"] for f in FACETS)


def write_json(path, data):
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")


def assemble(rows, ordered):
    write_json(HERE / "competencies.json", {"version": 1, "scope": "published finite role curriculum",
               "universal_interview_coverage": False, "topological_order": ordered, "competencies": rows})
    state = read_state(rows)
    write_json(HERE / "state.json", state)
    output = io.StringIO(newline="")
    fields = ["ID", "Area", "Tier", "Topic", "Subtopics", "Techniques", "Prerequisites",
              "Project module", "Exercise", "Interview questions", "Pass criteria", "Failure trap",
              "Source URLs", "Planning hours", "Learner status"]
    writer = csv.writer(output)
    writer.writerow(fields)
    for r in rows:
        writer.writerow([r["id"], r["area"], r["tier"], r["topic"], " | ".join(r["subtopics"]),
            " | ".join(r["techniques"]), " | ".join(r["prerequisites"]), r["project_module"],
            r["exercise"], " | ".join(r["interview_questions"]), " | ".join(r["answer_criteria"]),
            r["failure_trap"], " | ".join(r["source_urls"]), r["estimated_hours"],
            state["competencies"][r["id"]]["status"]])
    (HERE / "SYLLABUS.csv").write_text(output.getvalue())
    modules = {}
    for row in rows:
        modules.setdefault(row["project_module"], []).append(row)
    lines = ["# Project and lab exercise map", "",
             "Every listed topic has a specified practice opportunity. These assignments are not completion evidence.", ""]
    for module, group in modules.items():
        lines += [f"## {module}", ""]
        for r in group:
            lines += [f"### {r['id']}: {r['topic']} ({r['tier']})", "",
                      r["exercise"], "", "Mechanisms: " + "; ".join(r["subtopics"]), "",
                      "Techniques: " + "; ".join(r["techniques"]), "",
                      "Break case: " + r["failure_trap"], "",
                      "Prerequisites: " + (", ".join(r["prerequisites"]) or "none"), ""]
    (HERE / "PROJECT_LABS.md").write_text("\n".join(lines) + "\n")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("assemble")
    sub.add_parser("validate")
    sub.add_parser("status")
    nxt = sub.add_parser("next")
    nxt.add_argument("--tier", choices=("core", "depth", "extension"), default="core")
    show = sub.add_parser("show")
    show.add_argument("id")
    show.add_argument("--answers", action="store_true")
    rec = sub.add_parser("record")
    rec.add_argument("id")
    rec.add_argument("--facet", choices=FACETS, required=True)
    rec.add_argument("--score", type=int, choices=range(4), required=True)
    rec.add_argument("--assessor", choices=("self", "coach"), required=True)
    rec.add_argument("--evidence", type=Path, required=True)
    rec.add_argument("--note", required=True)
    args = parser.parse_args()
    rows = catalog()
    by_id, ordered = validate(rows)
    state = read_state(rows)
    if args.command == "assemble":
        assemble(rows, ordered)
    elif args.command == "record":
        if args.id not in by_id:
            parser.error("Unknown competency")
        if not args.evidence.is_file():
            parser.error("Evidence must be an existing file; a path alone proves no correctness")
        item = {"score": args.score, "assessor": args.assessor,
                "evidence": str(args.evidence.resolve()), "note": args.note,
                "at": datetime.now(timezone.utc).isoformat()}
        entry = state["competencies"][args.id]
        entry["facets"][args.facet] = item
        entry["history"].append({"facet": args.facet, **item})
        entry["status"] = "assessed_ready" if qualifies(entry) else "in_progress"
        write_json(HERE / "state.json", state)
        assemble(rows, ordered)
        print(entry["status"])
        return
    elif args.command == "show":
        if args.id not in by_id:
            parser.error("Unknown competency")
        row = dict(by_id[args.id])
        if not args.answers:
            row.pop("answer_criteria")
        print(json.dumps(row, indent=2, ensure_ascii=False))
        return
    elif args.command == "next":
        for key in ordered:
            row = by_id[key]
            if row["tier"] != args.tier or qualifies(state["competencies"][key]):
                continue
            if all(qualifies(state["competencies"][p]) for p in row["prerequisites"]):
                print(f"{key}: {row['topic']}\n{row['exercise']}\nPlanning estimate: {row['estimated_hours']}h; gate controls advancement.")
                return
        print("No unlocked topic in this tier; inspect prerequisite tiers and evidence.")
        return
    print(json.dumps({"topics": len(rows), "tiers": dict(Counter(r['tier'] for r in rows)),
        "subtopics": sum(len(r['subtopics']) for r in rows),
        "techniques": sum(len(r['techniques']) for r in rows),
        "interview_probes": sum(len(r['interview_questions']) for r in rows),
        "learner_assessed_ready": sum(qualifies(e) for e in state['competencies'].values()),
        "structural_validation": "pass", "universal_mastery_claim": False}, indent=2))


if __name__ == "__main__":
    main()
