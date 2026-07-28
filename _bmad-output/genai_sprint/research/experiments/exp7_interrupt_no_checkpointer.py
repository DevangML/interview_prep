from typing import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.types import interrupt, Command
class S(TypedDict):
    x: str
def ask(s): return {"x": interrupt("approve?")}
g = StateGraph(S); g.add_node("ask", ask); g.add_edge(START,"ask"); g.add_edge("ask",END)
graph = g.compile()   # no checkpointer
graph.invoke({"x":""})
print(graph.invoke(Command(resume="yes"), {"configurable":{"thread_id":"1"}}))
