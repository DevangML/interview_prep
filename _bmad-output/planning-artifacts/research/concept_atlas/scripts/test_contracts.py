"""Small negative tests for the semantic publication contracts."""
import json
from pathlib import Path
from validate_atlas import ROOT, validate_graph

def check(condition, message):
    if not condition:
        raise AssertionError(message)

def main():
    graph = json.loads((ROOT / "generated/graph.json").read_text())
    check(not validate_graph(graph), "generated graph should be valid")
    ids = [node["id"] for node in graph["nodes"]]
    bad_target = dict(graph)
    bad_target["edges"] = list(graph["edges"]) + [{"from": ids[0], "to": "missing", "type": "contains"}]
    check(any("dangling edge" in e for e in validate_graph(bad_target)), "unknown targets must fail")
    cycle = {"nodes": [{"id": "a"}, {"id": "b"}], "edges": [
        {"from": "a", "to": "b", "type": "prerequisite", "conditions": "always", "limitation": "none", "sources": ["https://example.com/a"]},
        {"from": "b", "to": "a", "type": "prerequisite", "conditions": "always", "limitation": "none", "sources": ["https://example.com/b"]},
    ]}
    check(any("prerequisite cycle" in e for e in validate_graph(cycle)), "prerequisite cycles must fail")
    valid_cycle = {"nodes": [{"id": "a"}, {"id": "b"}], "edges": [
        {"from": "a", "to": "b", "type": "analogous-to", "conditions": "same problem", "limitation": "not equivalent", "sources": ["https://example.com/a"]},
        {"from": "b", "to": "a", "type": "analogous-to", "conditions": "same problem", "limitation": "not equivalent", "sources": ["https://example.com/b"]},
    ]}
    check(not validate_graph(valid_cycle), "analogy cycles are allowed")
    print("contract negative tests passed")

if __name__ == "__main__":
    main()
