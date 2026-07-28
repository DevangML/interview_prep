import operator
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END

class State(TypedDict):
    result: Annotated[list, operator.add]   # reducer added

def a(s): return {"result": ["A"]}
def b(s): return {"result": ["B"]}

g = StateGraph(State)
g.add_node("a", a); g.add_node("b", b)
g.add_edge(START,"a"); g.add_edge(START,"b"); g.add_edge("a",END); g.add_edge("b",END)
print(g.compile().invoke({"result": []}))
