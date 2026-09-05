import json
import math
import random
from pathlib import Path

random.seed(42)

SCRIPT_DIR = Path(__file__).parent.resolve()
OUT_DIR = SCRIPT_DIR.parent / "app" / "public" / "data"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Material You / Expressive 3D Styling Config per layer
LAYER_STYLES = {
    "human": {"shape": "Sphere", "color": "#fb7185", "theme": "rose"},        # Soft, human, organic
    "swe": {"shape": "RoundedBox", "color": "#34d399", "theme": "emerald"},    # Structured, engineered
    "system_design": {"shape": "Octahedron", "color": "#818cf8", "theme": "indigo"}, # Multi-faceted, architectural
    "programming": {"shape": "Capsule", "color": "#c084fc", "theme": "purple"},# Modular, encapsulated
    "data": {"shape": "Cylinder", "color": "#fbbf24", "theme": "amber"},       # Classic DB storage shape
    "os": {"shape": "Box", "color": "#94a3b8", "theme": "slate"},              # Foundational blocks
    "networking": {"shape": "Torus", "color": "#38bdf8", "theme": "sky"},      # Rings, connections
    "comp_core": {"shape": "Icosahedron", "color": "#f472b6", "theme": "pink"},# Complex, algorithmic
    "theory": {"shape": "Dodecahedron", "color": "#a78bfa", "theme": "violet"},# Abstract, theoretical
    "math": {"shape": "Tetrahedron", "color": "#fcd34d", "theme": "yellow"},   # Sharp, fundamental logic
    "systems_foundation": {"shape": "Octahedron", "color": "#2dd4bf", "theme": "teal"}, # Translation layers
    "architecture": {"shape": "Box", "color": "#cbd5e1", "theme": "slate"},    # Hardware
    "logic": {"shape": "Tetrahedron", "color": "#fdba74", "theme": "orange"},  # Gates
    "electronics": {"shape": "Cylinder", "color": "#fca5a5", "theme": "red"}   # Raw power, bedrock
}

LAYERS = [
    {
        "id": "human",
        "name": "HUMAN / SOCIETAL / BUSINESS",
        "y": 140,
        "nodes": ["User & domain problems", "Product / requirements", "UX / HCI", "Ethics / law / privacy", "Economics / business logic"]
    },
    {
        "id": "swe",
        "name": "SOFTWARE ENGINEERING",
        "y": 120,
        "nodes": ["Requirements & specification", "Design & architecture", "Modularity / abstraction / interfaces", "APIs", "Testing / verification", "Observability / monitoring"]
    },
    {
        "id": "system_design",
        "name": "SYSTEM / SOFTWARE DESIGN",
        "y": 100,
        "nodes": ["Architecture", "System design", "Concurrency / parallelism", "Distributed systems", "Scalability / availability", "Fault tolerance / consistency", "Caching / queues / messaging", "Storage architecture"]
    },
    {
        "id": "programming",
        "name": "PROGRAMMING",
        "y": 80,
        "x_offset": -20,
        "nodes": ["Programming languages", "Syntax", "Semantics", "Type systems", "Memory models", "OOP", "Functional", "Runtimes"]
    },
    {
        "id": "data",
        "name": "DATA & INFORMATION",
        "y": 80,
        "x_offset": 0,
        "nodes": ["Databases", "Relational model", "SQL", "Transactions", "Indexing", "Query processing", "Distributed data"]
    },
    {
        "id": "os",
        "name": "COMPUTER SYSTEMS",
        "y": 80,
        "x_offset": 20,
        "nodes": ["Operating systems", "Processes", "Threads", "Scheduling", "Synchronization", "Virtual memory", "File systems", "I/O", "Protection"]
    },
    {
        "id": "networking",
        "name": "NETWORKING",
        "y": 60,
        "nodes": ["Network models / layering", "Ethernet / Wi-Fi", "IP / routing", "TCP / UDP", "DNS / HTTP / TLS", "Sockets", "Congestion / flow control", "Network security"]
    },
    {
        "id": "comp_core",
        "name": "COMPUTATIONAL CORE",
        "y": 40,
        "nodes": ["Computational thinking", "Abstraction", "Data structures", "Hash tables", "Trees / heaps / tries", "Graphs", "Algorithms", "Dynamic programming", "Complexity analysis"]
    },
    {
        "id": "theory",
        "name": "THEORETICAL CS",
        "y": 20,
        "x_offset": -15,
        "nodes": ["Discrete mathematics", "Computability", "Complexity theory", "Automata theory", "Formal languages", "Cryptography", "Randomness"]
    },
    {
        "id": "math",
        "name": "MATHEMATICAL FOUNDATIONS",
        "y": 20,
        "x_offset": 15,
        "nodes": ["Logic", "Sets / functions / relations", "Combinatorics", "Graph theory", "Probability", "Statistics", "Linear algebra"]
    },
    {
        "id": "systems_foundation",
        "name": "SYSTEMS FOUNDATIONS / TRANSLATION",
        "y": 0,
        "nodes": ["Compilers & interpreters", "Lexical analysis", "Parsing", "Code generation", "Runtime systems", "Linkers / loaders", "Virtual machines", "OS interfaces"]
    },
    {
        "id": "architecture",
        "name": "COMPUTER ARCHITECTURE",
        "y": -20,
        "nodes": ["ISA / machine instructions", "CPU organization", "Registers", "Pipelines", "Branch prediction", "Caches / memory hierarchy", "Main memory", "I/O / buses", "Interrupts / DMA"]
    },
    {
        "id": "logic",
        "name": "DIGITAL LOGIC",
        "y": -40,
        "nodes": ["Boolean algebra", "Logic gates", "Combinational circuits", "Sequential circuits", "Flip-flops", "Counters", "Adders / ALUs", "Finite-state machines", "Memory circuits"]
    },
    {
        "id": "electronics",
        "name": "ELECTRONICS / PHYSICAL COMPUTING (BEDROCK)",
        "y": -60,
        "nodes": ["Electricity / voltage / current", "Semiconductor physics", "Silicon", "Transistors", "Diodes", "Integrated circuits", "Fabrication / VLSI"]
    }
]

nodes = []
edges = []

def safe_id(name):
    return name.lower().replace(" ", "_").replace("/", "_").replace("&", "_").replace("(", "").replace(")", "")

for layer_idx, layer in enumerate(LAYERS):
    layer_y = layer["y"]
    x_off = layer.get("x_offset", 0)
    
    style = LAYER_STYLES[layer["id"]]
    
    layer_node_id = f"LAYER_{layer['id']}"
    nodes.append({
        "id": layer_node_id,
        "label": layer["name"],
        "isLayer": True,
        "layerId": layer["id"],
        "position": [x_off, layer_y, -5],
        "shape": "LayerText", # Special handling in React
        "color": style["color"],
        "theme": style["theme"],
        "details": None
    })
    
    radius = 12.0
    num_concepts = len(layer["nodes"])
    for i, concept in enumerate(layer["nodes"]):
        concept_id = f"{layer['id']}_{safe_id(concept)}"
        
        angle = math.pi - (i / max(1, num_concepts - 1)) * math.pi
        x = x_off + (radius * math.cos(angle))
        z = 5 + (radius * math.sin(angle))
        y = layer_y + random.uniform(-1.0, 1.0)
        
        nodes.append({
            "id": concept_id,
            "label": concept,
            "isLayer": False,
            "layerId": layer["id"],
            "position": [round(x, 3), round(y, 3), round(z, 3)],
            "shape": style["shape"],
            "color": style["color"],
            "theme": style["theme"],
            "details": {
                "definition": f"The core construct of {concept}.",
                "motivation": "Engineered to bypass physical bottlenecks.",
                "origin": "Rooted in historical computation limits.",
                "first_principles": "Bound by deterministic logic and physics.",
                "empowers": f"Enables higher-level abstractions."
            }
        })

# Top-Down Dependency Edges
deep_dependencies = [
    {
        "source": "programming_memory_models",
        "target": "os_virtual_memory",
        "label": "Requires address isolation",
        "color": "#c084fc",
        "details": ["Runtimes assume a flat, contiguous memory space.", "Delegates physical memory fragmentation and swapping to the OS via Paging.", "Requires CPU traps for page faults to dynamically allocate physical RAM."]
    },
    {
        "source": "os_virtual_memory",
        "target": "architecture_caches__memory_hierarchy",
        "label": "Relies on TLB",
        "color": "#94a3b8",
        "details": ["OS virtual memory manager is software, too slow to translate addresses on every instruction.", "Relies entirely on the hardware Translation Lookaside Buffer (TLB).", "If the MMU doesn't support the page structures, VM is impossible."]
    },
    {
        "source": "system_design_distributed_systems",
        "target": "networking_tcp__udp",
        "label": "Assumes reliable stream",
        "color": "#818cf8",
        "details": ["Distributed consensus algorithms (Raft/Paxos) assume messages arrive.", "Relies on TCP for connection-oriented, guaranteed in-order delivery.", "TCP hides the underlying packet loss of the raw IP layer."]
    },
    {
        "source": "data_databases",
        "target": "comp_core_trees__heaps__tries",
        "label": "Implemented via B-Trees",
        "color": "#fbbf24",
        "details": ["Relational DBs cannot scan raw disk sectors efficiently.", "Rely exclusively on B-Tree and B+Tree data structures for O(log n) lookups.", "The tree node size is mathematically calibrated to match the hardware disk block size."]
    },
    {
        "source": "swe_apis",
        "target": "networking_dns__http__tls",
        "label": "Transports via HTTP/TLS",
        "color": "#34d399",
        "details": ["Software engineering abstracts remote calls as APIs (REST/GraphQL).", "These rely entirely on HTTP for uniform semantics (GET/POST).", "Relies on TLS for asymmetric cryptographic handshakes to secure the payload."]
    }
]

for i, dep in enumerate(deep_dependencies):
    edges.append({
        "id": f"dep_{i}",
        "source": dep["source"],
        "target": dep["target"],
        "type": "dependency",
        "label": dep["label"],
        "color": dep["color"],
        "details": dep["details"]
    })

for layer_idx in range(len(LAYERS) - 1):
    edges.append({
        "id": f"spine_{layer_idx}",
        "source": f"LAYER_{LAYERS[layer_idx]['id']}",
        "target": f"LAYER_{LAYERS[layer_idx+1]['id']}",
        "type": "structural"
    })

tower_data = {
    "version": "5.0.0",
    "nodes": nodes,
    "edges": edges
}

with open(OUT_DIR / "tower.json", "w") as f:
    json.dump(tower_data, f, indent=2)

print(f"✅ Material You 3D Expressive Data Generated.")
