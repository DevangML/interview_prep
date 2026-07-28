from typing import TypedDict
from langgraph.graph import StateGraph, START, END

class S(TypedDict):
    findings: list        # NO reducer -- but nodes run SEQUENTIALLY, so no error
def search_web(s):  return {"findings": ["web result"]}
def search_docs(s): return {"findings": ["docs result"]}   # silently clobbers

g = StateGraph(S)
g.add_node("web", search_web); g.add_node("docs", search_docs)
g.add_edge(START,"web"); g.add_edge("web","docs"); g.add_edge("docs",END)
print(g.compile().invoke({"findings": []}))
