import json
import math
import random
from pathlib import Path
import hashlib

random.seed(42)

SCRIPT_DIR = Path(__file__).parent.resolve()
OUT_DIR = SCRIPT_DIR.parent / "app" / "public" / "data"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# ---------------------------------------------------------
# PART 1: THE DENSE BEDROCK TOWER
# ---------------------------------------------------------
LAYER_STYLES = {
    "human": {"shape": "Sphere", "color": "#fb7185"},
    "swe": {"shape": "RoundedBox", "color": "#34d399"},
    "system_design": {"shape": "Octahedron", "color": "#818cf8"},
    "programming": {"shape": "Capsule", "color": "#c084fc"},
    "data": {"shape": "Cylinder", "color": "#fbbf24"},
    "os": {"shape": "Box", "color": "#94a3b8"},
    "networking": {"shape": "Torus", "color": "#38bdf8"},
    "comp_core": {"shape": "Icosahedron", "color": "#f472b6"},
    "theory": {"shape": "Dodecahedron", "color": "#a78bfa"},
    "math": {"shape": "Tetrahedron", "color": "#fcd34d"},
    "systems_foundation": {"shape": "Octahedron", "color": "#2dd4bf"},
    "architecture": {"shape": "Box", "color": "#cbd5e1"},
    "logic": {"shape": "Tetrahedron", "color": "#fdba74"},
    "electronics": {"shape": "Cylinder", "color": "#fca5a5"}
}

LAYERS = [
    {"id": "human", "name": "HUMAN / SOCIETAL / BUSINESS", "y": 140, "nodes": ["User & domain problems", "Product / requirements", "UX / HCI", "Ethics / law / privacy", "Economics / business logic"]},
    {"id": "swe", "name": "SOFTWARE ENGINEERING", "y": 120, "nodes": ["Requirements & specification", "Design & architecture", "Modularity / abstraction / interfaces", "APIs", "Testing / verification", "Observability / monitoring"]},
    {"id": "system_design", "name": "SYSTEM / SOFTWARE DESIGN", "y": 100, "nodes": ["Architecture", "System design", "Concurrency / parallelism", "Distributed systems", "Scalability / availability", "Fault tolerance / consistency", "Caching / queues / messaging", "Storage architecture"]},
    {"id": "programming", "name": "PROGRAMMING", "y": 80, "x_offset": -20, "nodes": ["Programming languages", "Syntax", "Semantics", "Type systems", "Memory models", "OOP", "Functional", "Runtimes"]},
    {"id": "data", "name": "DATA & INFORMATION", "y": 80, "x_offset": 0, "nodes": ["Databases", "Relational model", "SQL", "Transactions", "Indexing", "Query processing", "Distributed data"]},
    {"id": "os", "name": "COMPUTER SYSTEMS", "y": 80, "x_offset": 20, "nodes": ["Operating systems", "Processes", "Threads", "Scheduling", "Synchronization", "Virtual memory", "File systems", "I/O", "Protection"]},
    {"id": "networking", "name": "NETWORKING", "y": 60, "nodes": ["Network models / layering", "Ethernet / Wi-Fi", "IP / routing", "TCP / UDP", "DNS / HTTP / TLS", "Sockets", "Congestion / flow control", "Network security"]},
    {"id": "comp_core", "name": "COMPUTATIONAL CORE", "y": 40, "nodes": ["Computational thinking", "Abstraction", "Data structures", "Hash tables", "Trees / heaps / tries", "Graphs", "Algorithms", "Dynamic programming", "Complexity analysis"]},
    {"id": "theory", "name": "THEORETICAL CS", "y": 20, "x_offset": -15, "nodes": ["Discrete mathematics", "Computability", "Complexity theory", "Automata theory", "Formal languages", "Cryptography", "Randomness"]},
    {"id": "math", "name": "MATHEMATICAL FOUNDATIONS", "y": 20, "x_offset": 15, "nodes": ["Logic", "Sets / functions / relations", "Combinatorics", "Graph theory", "Probability", "Statistics", "Linear algebra"]},
    {"id": "systems_foundation", "name": "SYSTEMS FOUNDATIONS / TRANSLATION", "y": 0, "nodes": ["Compilers & interpreters", "Lexical analysis", "Parsing", "Code generation", "Runtime systems", "Linkers / loaders", "Virtual machines", "OS interfaces"]},
    {"id": "architecture", "name": "COMPUTER ARCHITECTURE", "y": -20, "nodes": ["ISA / machine instructions", "CPU organization", "Registers", "Pipelines", "Branch prediction", "Caches / memory hierarchy", "Main memory", "I/O / buses", "Interrupts / DMA"]},
    {"id": "logic", "name": "DIGITAL LOGIC", "y": -40, "nodes": ["Boolean algebra", "Logic gates", "Combinational circuits", "Sequential circuits", "Flip-flops", "Counters", "Adders / ALUs", "Finite-state machines", "Memory circuits"]},
    {"id": "electronics", "name": "ELECTRONICS / PHYSICAL COMPUTING (BEDROCK)", "y": -60, "nodes": ["Electricity / voltage / current", "Semiconductor physics", "Silicon", "Transistors", "Diodes", "Integrated circuits", "Fabrication / VLSI"]}
]

def safe_id(name):
    return name.lower().replace(" ", "_").replace("/", "_").replace("&", "_").replace("(", "").replace(")", "")

nodes = []
edges = []
nodes_by_layer = {}

for layer_idx, layer in enumerate(LAYERS):
    layer_y = layer["y"]
    x_off = layer.get("x_offset", 0)
    style = LAYER_STYLES[layer["id"]]
    
    nodes.append({
        "id": f"LAYER_{layer['id']}",
        "label": layer["name"],
        "isLayer": True,
        "layerId": layer["id"],
        "position": [x_off, layer_y, -5],
        "shape": "LayerText",
        "color": style["color"],
    })
    
    layer_nodes = []
    radius = 12.0
    num_concepts = len(layer["nodes"])
    for i, concept in enumerate(layer["nodes"]):
        cid = f"{layer['id']}_{safe_id(concept)}"
        layer_nodes.append(cid)
        angle = math.pi - (i / max(1, num_concepts - 1)) * math.pi
        x = x_off + (radius * math.cos(angle))
        z = 5 + (radius * math.sin(angle))
        y = layer_y + random.uniform(-1.0, 1.0)
        
        nodes.append({
            "id": cid,
            "label": concept,
            "isLayer": False,
            "layerId": layer["id"],
            "position": [round(x, 3), round(y, 3), round(z, 3)],
            "shape": style["shape"],
            "color": style["color"],
            "details": {
                "definition": f"The core construct of {concept}.",
                "motivation": "Engineered to bypass physical bottlenecks.",
                "origin": "Rooted in historical computation limits.",
                "first_principles": "Bound by deterministic logic and physics.",
                "empowers": f"Enables higher-level abstractions."
            }
        })
    nodes_by_layer[layer_idx] = layer_nodes

# Generate dense top-down dependencies (Every node MUST depend on something below it)
# We deterministically hash the node id to pick 1-2 targets from the layer below it.
edge_count = 0
for layer_idx in range(len(LAYERS) - 1): # Exclude electronics (base layer)
    current_nodes = nodes_by_layer[layer_idx]
    target_nodes = nodes_by_layer[layer_idx + 1]
    
    for source in current_nodes:
        # Deterministic random seed per node so edges are stable
        random.seed(int(hashlib.md5(source.encode()).hexdigest(), 16))
        num_deps = random.choices([1, 2], weights=[0.7, 0.3])[0]
        targets = random.sample(target_nodes, min(num_deps, len(target_nodes)))
        
        for t in targets:
            edges.append({
                "id": f"dense_{edge_count}",
                "source": source,
                "target": t,
                "type": "dependency",
                "label": "Consumes abstraction",
                "color": "#d946ef",
                "details": [
                    f"{source.split('_')[1].capitalize()} delegates low-level execution to {t.split('_')[1].capitalize()}.",
                    "Requires this strictly for mathematical or physical bounds.",
                    "Provides stability by offloading domain complexity downward."
                ]
            })
            edge_count += 1

# Manual Deep Overrides for some beautiful cross-layer long jumps
long_jumps = [
    ("swe_apis", "networking_dns__http__tls", "Transports via HTTP/TLS"),
    ("programming_memory_models", "os_virtual_memory", "Requires address isolation"),
    ("data_databases", "comp_core_trees__heaps__tries", "Implemented via B-Trees"),
    ("system_design_distributed_systems", "networking_tcp__udp", "Assumes reliable stream"),
    ("programming_type_systems", "theory_logic", "Curry-Howard Correspondence"),
]

for src, tgt, lbl in long_jumps:
    edges.append({
        "id": f"dense_long_{edge_count}",
        "source": src,
        "target": tgt,
        "type": "dependency",
        "label": lbl,
        "color": "#f43f5e", # Rose / Red for long jumps
        "details": ["A direct, deep architectural dependency crossing multiple layers.", "Essential for full vertical integration."]
    })
    edge_count += 1

with open(OUT_DIR / "tower.json", "w") as f:
    json.dump({"version": "6.0.0", "nodes": nodes, "edges": edges}, f, indent=2)

# ---------------------------------------------------------
# PART 2: THE PROGRAMMING DEEP DIVE TOWER
# ---------------------------------------------------------
PROG_LAYERS = [
    {"id": "paradigms", "name": "PARADIGMS & SEMANTICS", "y": 60, "nodes": ["Functional (FP)", "Object-Oriented (OOP)", "Declarative", "Actor Model"]},
    {"id": "types", "name": "TYPE SYSTEMS", "y": 30, "nodes": ["Static vs Dynamic", "Strong vs Weak", "Hindley-Milner Inference", "Dependent Types", "Generics / Polymorphism"]},
    {"id": "memory", "name": "MEMORY MANAGEMENT", "y": 0, "nodes": ["Manual (malloc/free)", "Garbage Collection (GC)", "Tracing GC / Mark-Sweep", "Reference Counting", "Ownership & Borrowing (RAII)"]},
    {"id": "concurrency", "name": "CONCURRENCY & ASYNC", "y": -30, "nodes": ["Threads & Mutexes", "Coroutines (async/await)", "Channels / CSP", "Event Loop (Node/V8)"]}
]

prog_nodes = []
prog_edges = []
prog_nodes_by_layer = {}

for layer_idx, layer in enumerate(PROG_LAYERS):
    layer_y = layer["y"]
    prog_nodes.append({
        "id": f"LAYER_{layer['id']}",
        "label": layer["name"],
        "isLayer": True,
        "layerId": layer["id"],
        "position": [0, layer_y, -5],
        "shape": "LayerText",
        "color": "#c084fc",
    })
    
    layer_nodes = []
    radius = 10.0
    num_concepts = len(layer["nodes"])
    for i, concept in enumerate(layer["nodes"]):
        cid = f"prog_{layer['id']}_{safe_id(concept)}"
        layer_nodes.append(cid)
        angle = math.pi - (i / max(1, num_concepts - 1)) * math.pi
        x = (radius * math.cos(angle))
        z = 5 + (radius * math.sin(angle))
        y = layer_y + random.uniform(-1.0, 1.0)
        
        prog_nodes.append({
            "id": cid,
            "label": concept,
            "isLayer": False,
            "layerId": layer["id"],
            "position": [round(x, 3), round(y, 3), round(z, 3)],
            "shape": "Capsule",
            "color": "#c084fc",
            "details": {
                "definition": f"Deep dive on {concept}.",
                "motivation": "Languages adopt this to solve specific domain problems (e.g. Memory safety, Scalability).",
                "origin": "Language specification and compiler design.",
                "first_principles": "Syntax and Semantics theory.",
                "empowers": f"Examples: Rust, Java, Haskell, C++ implement variants of this."
            }
        })
    prog_nodes_by_layer[layer_idx] = layer_nodes

# Link them sequentially for the deep dive
edge_count = 0
for layer_idx in range(len(PROG_LAYERS) - 1):
    current_nodes = prog_nodes_by_layer[layer_idx]
    target_nodes = prog_nodes_by_layer[layer_idx + 1]
    
    for source in current_nodes:
        random.seed(int(hashlib.md5(source.encode()).hexdigest(), 16))
        targets = random.sample(target_nodes, 1)
        for t in targets:
            prog_edges.append({
                "id": f"prog_dense_{edge_count}",
                "source": source,
                "target": t,
                "type": "dependency",
                "label": "Language runtime reliance",
                "color": "#f472b6",
                "details": [
                    f"In implementations like Rust or JVM, {source.split('_')[-1]} relies heavily on {t.split('_')[-1]}.",
                    "The language specification dictates this behavior at compile time."
                ]
            })
            edge_count += 1

with open(OUT_DIR / "programming_tower.json", "w") as f:
    json.dump({"version": "1.0.0", "nodes": prog_nodes, "edges": prog_edges}, f, indent=2)

print(f"✅ Both Towers Compiled.")
