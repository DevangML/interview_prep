from typing import TypedDict
from langgraph.graph import StateGraph, START

class S(TypedDict):
    n: int
def tick(s): return {"n": s["n"] + 1}
g = StateGraph(S); g.add_node("tick", tick)
g.add_edge(START, "tick"); g.add_edge("tick", "tick")   # cycle, no exit condition
print(g.compile().invoke({"n": 0}))
