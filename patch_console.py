import yaml
import sys

path = "_bmad-output/teach_me/subjects/console.yaml"
with open(path, "r") as f:
    data = yaml.safe_load(f)

data["display_name"] = "The 1K+ Exhaustion Engine — Plugin Architecture"
data["authorship"]["the_coach_may"] = [
    "state the exact rows from the 1175-point syllabus to cover next",
    "interrogate an attempt against its cases, one at a time",
    "diagnose a bug he shows by asking what he expected versus what happened",
    "write and run the coverage tooling in scripts/coverage/"
]
data["authorship"]["the_coach_must_never"].append("attempt to teach or explain the concept (Scrimba AI handles this)")
data["authorship"]["the_coach_must_never"].append("skip a syllabus row because 'it doesn't fit the React app' (put it in a package)")

data["loop"]["beats"] = ["SYLLABUS", "BUILD", "BREAK", "DEFEND", "CLOSE"]
data["loop"]["overrides_skeleton"] = "The coach NO LONGER teaches or curates courses. Scrimba AI explains everything. The coach's ONLY job is routing (issuing the exact syllabus rows to exhaust) and tracking (enforcing the coverage matrix)."

data["loop"]["SYLLABUS"] = {
    "what": "Issue the exact batch of rows from the 1k+ point CSV to conquer. No courses, no playlists.",
    "coach_output": "The raw row IDs and their target concepts.",
    "receipt": {
        "required": True,
        "when": "before building",
        "shape": "I am exhausting rows X, Y, Z today.",
        "why": "Commitment to the exact scope."
    }
}
if "PLAYLIST" in data["loop"]:
    del data["loop"]["PLAYLIST"]
if "DERIVE" in data["loop"]:
    del data["loop"]["DERIVE"]

data["architectural_mandate"] = "The product is a Plugin Engine / Monorepo. If a concept (e.g. vanilla DOM manipulation, archaic CSS, niche Web API) does not fit naturally into a modern React dashboard, it gets built as a standalone package, plugin, or utility script inside the repo, which the React app can then mount or import. NO EXCUSES. Every one of the 1175 rows gets code."

with open(path, "w") as f:
    yaml.dump(data, f, sort_keys=False)
