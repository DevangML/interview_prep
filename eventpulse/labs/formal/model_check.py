"""Bounded model exploration, independent of the real Kafka/SQL implementation.

One logical event may be published repeatedly. Crash erases volatile progress.
This finite model checks effect counts, not software correctness or liveness.
"""
from __future__ import annotations

import argparse
import json
from collections import deque
from dataclasses import dataclass, replace
from pathlib import Path


@dataclass(frozen=True)
class State:
    pending: bool = True
    log_size: int = 0
    committed: int = 0
    position: int = 0
    stage: str = "poll"
    inbox: bool = False
    effects: int = 0


def successors(s: State, deduplicate: bool, max_deliveries: int):
    if s.pending and s.log_size < max_deliveries:
        yield "relay-publish", replace(s, log_size=s.log_size + 1)
    if s.pending and s.log_size:
        yield "relay-mark-published", replace(s, pending=False)
    if s.stage == "poll" and s.position < s.log_size:
        yield "consumer-poll", replace(s, stage="database")
    if s.stage == "database":
        increment = not (deduplicate and s.inbox)
        yield "atomic-database-commit", replace(
            s, inbox=True, effects=s.effects + int(increment), stage="checkpoint"
        )
    if s.stage == "checkpoint":
        yield "commit-next-offset", replace(
            s, committed=s.position + 1, position=s.position + 1, stage="poll"
        )
    if s.stage != "poll" or s.position != s.committed:
        yield "consumer-crash-restart", replace(s, position=s.committed, stage="poll")


def explore(deduplicate: bool, max_steps: int = 12, max_deliveries: int = 3):
    queue = deque([(State(), [])])
    seen = {State()}
    while queue:
        state, trace = queue.popleft()
        if state.effects > 1:
            return {"safe_within_bounds": False, "states": len(seen), "trace": trace,
                    "counterexample_effects": state.effects}
        if len(trace) == max_steps:
            continue
        for action, nxt in successors(state, deduplicate, max_deliveries):
            if nxt not in seen:
                seen.add(nxt)
                queue.append((nxt, trace + [action]))
    return {"safe_within_bounds": True, "states": len(seen), "trace": None}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    result = {"scope": "one logical event; <=3 log deliveries; <=12 transitions",
              "naive": explore(False), "atomic_inbox": explore(True),
              "implementation_verified": False, "liveness_verified": False}
    if result["naive"]["safe_within_bounds"] or not result["atomic_inbox"]["safe_within_bounds"]:
        raise SystemExit("Model expectation failed")
    output = json.dumps(result, indent=2) + "\n"
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(output)
    print(output, end="")


if __name__ == "__main__":
    main()
