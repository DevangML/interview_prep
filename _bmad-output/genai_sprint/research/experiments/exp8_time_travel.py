from typing import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import InMemorySaver

class S(TypedDict):
    topic: str
    joke: str
def gen_topic(s): return {"topic": "cats"}
def write(s):     return {"joke": f"A joke about {s['topic']}"}
g = StateGraph(S); g.add_node("gen_topic", gen_topic); g.add_node("write", write)
g.add_edge(START,"gen_topic"); g.add_edge("gen_topic","write"); g.add_edge("write",END)
graph = g.compile(checkpointer=InMemorySaver())
cfg = {"configurable": {"thread_id":"1"}}
print("original:", graph.invoke({}, cfg))
hist = list(graph.get_state_history(cfg))
for h in hist: print("  ckpt next=", h.next, "values=", h.values)
before = next(h for h in hist if h.next == ("write",))
fork = graph.update_state(before.config, {"topic":"chickens"})
print("forked:", graph.invoke(None, fork))
print("original thread head still:", graph.get_state(cfg).values)
