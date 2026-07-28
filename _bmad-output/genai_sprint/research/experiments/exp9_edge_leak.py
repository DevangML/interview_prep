import operator
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
class S(TypedDict):
    log: Annotated[list, operator.add]
def a(s): return {"log":["a"]}
def cheap(s): return {"log":["CHEAP path ran"]}
def expensive(s): return {"log":["EXPENSIVE path ran ($$$)"]}
def route(s): return "cheap"                       # router says: only cheap
g = StateGraph(S)
g.add_node("a",a); g.add_node("cheap",cheap); g.add_node("expensive",expensive)
g.add_edge(START,"a")
g.add_edge("a","expensive")                        # leftover normal edge
g.add_conditional_edges("a", route, ["cheap","expensive"])
g.add_edge("cheap",END); g.add_edge("expensive",END)
print(g.compile().invoke({"log":[]}))
