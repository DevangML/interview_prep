from typing import TypedDict
from langgraph.graph import StateGraph, START, END

class State(TypedDict):
    result: str          # NO reducer

def branch_a(s): return {"result": "A"}
def branch_b(s): return {"result": "B"}

g = StateGraph(State)
g.add_node("a", branch_a); g.add_node("b", branch_b)
g.add_edge(START, "a"); g.add_edge(START, "b")   # both run in the SAME super-step
g.add_edge("a", END);   g.add_edge("b", END)
graph = g.compile()
print(graph.invoke({"result": ""}))
