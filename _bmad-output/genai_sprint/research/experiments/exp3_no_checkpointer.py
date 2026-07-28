from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langchain_core.messages import HumanMessage, AIMessage

class S(TypedDict):
    messages: Annotated[list, add_messages]

def echo(s):
    return {"messages": [AIMessage(f"I have seen {len(s['messages'])} msgs")]}

g = StateGraph(S); g.add_node("echo", echo)
g.add_edge(START,"echo"); g.add_edge("echo",END)
graph = g.compile()                      # NO checkpointer
cfg = {"configurable": {"thread_id": "t1"}}
print("turn1:", graph.invoke({"messages":[HumanMessage("hi")]}, cfg)["messages"][-1].content)
print("turn2:", graph.invoke({"messages":[HumanMessage("again")]}, cfg)["messages"][-1].content)
