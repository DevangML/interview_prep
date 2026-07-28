from typing import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.types import interrupt, Command
from langgraph.checkpoint.memory import InMemorySaver

CALLS = []
class S(TypedDict):
    x: str
def node(s):
    CALLS.append("SIDE EFFECT (e.g. charge card / send email)")
    print("  -> side effect fired. total times:", len(CALLS))
    ans = interrupt("approve?")
    return {"x": ans}

g = StateGraph(S); g.add_node("node", node)
g.add_edge(START,"node"); g.add_edge("node",END)
graph = g.compile(checkpointer=InMemorySaver())
cfg = {"configurable": {"thread_id": "1"}}
print("run 1:"); graph.invoke({"x":""}, cfg)
print("resume:"); print(graph.invoke(Command(resume="yes"), cfg))
print("TOTAL side effects for ONE logical approval:", len(CALLS))
