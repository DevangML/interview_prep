import operator
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
from langgraph.types import Send

class Overall(TypedDict):
    subjects: list
    jokes: Annotated[list, operator.add]
class JokeState(TypedDict):
    subject: str

def gen(s: JokeState): return {"jokes": [f"joke about {s['subject']}"]}
def fan_out(s: Overall): return [Send("gen", {"subject": x}) for x in s["subjects"]]

g = StateGraph(Overall); g.add_node("gen", gen)
g.add_conditional_edges(START, fan_out, ["gen"]); g.add_edge("gen", END)
print(g.compile().invoke({"subjects":["cats","dogs","cars"], "jokes":[]}))
