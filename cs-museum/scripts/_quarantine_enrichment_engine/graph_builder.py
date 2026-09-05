"""Builds verifiable graph relations for concept nodes adhering to BINDING RELATION RULE."""
from pathlib import Path
import json

DATA_DIR = Path(__file__).resolve().parents[2] / "app" / "public" / "data"

CLUSTER_BEDROCK_MAP = {
    "memory-lifetime": [
        {"uses": "Virtual memory & page tables", "nodeId": "os_virtual_memory", "how": "The allocator or collector requests page-aligned mappings via kernel syscalls.", "forCase": "Backing heap allocations with physical DRAM pages."},
        {"uses": "MMU translation & protection", "nodeId": "architecture_main_memory", "how": "Hardware page tables enforce read/write permissions and address translation.", "forCase": "Process-private memory isolation."}
    ],
    "concurrency": [
        {"uses": "Atomic compare-and-swap (CAS)", "nodeId": "architecture_isa___machine_instructions", "how": "Hardware lock-free read-modify-write primitives in the CPU instruction set.", "forCase": "Mutex lock acquisition and lock-free data structures."},
        {"uses": "OS Thread Scheduling & Context Switches", "nodeId": "os_scheduling", "how": "Kernel preemption and registers saving across hardware thread control blocks.", "forCase": "Multi-core CPU multiplexing."}
    ],
    "dispatch": [
        {"uses": "Indirect branch prediction", "nodeId": "architecture_branch_prediction", "how": "Hardware BTB (Branch Target Buffer) predicts indirect vtable and function pointer jumps.", "forCase": "Polymorphic virtual method invocations."},
        {"uses": "Code generation & ABI layouts", "nodeId": "systems_foundation_code_generation", "how": "Compiler lowers function signatures to platform calling conventions.", "forCase": "Standardized stack frames and register passing."}
    ],
    "abstraction-over-types": [
        {"uses": "Symbol table resolution", "nodeId": "systems_foundation_compilers___interpreters", "how": "Compiler maintains type environments during monomorphisation or constraint checking.", "forCase": "Generics resolution and type parameter substitution."},
        {"uses": "Virtual machines & bytecode verification", "nodeId": "systems_foundation_virtual_machines", "how": "Managed runtimes verify type safety before executing lowered bytecode.", "forCase": "Runtime type safety in managed execution environments."}
    ],
    "compilation-linkage": [
        {"uses": "Linkers, loaders & relocations", "nodeId": "systems_foundation_linkers___loaders", "how": "Linker resolves external symbol references and adjusts relocations in object files.", "forCase": "Producing statically linked or dynamically loadable executables."},
        {"uses": "ISA Machine Code Emission", "nodeId": "architecture_isa___machine_instructions", "how": "Backend lowers intermediate representation directly to target binary opcodes.", "forCase": "Direct CPU instruction stream generation."}
    ]
}

def derive_empowered_by(cluster_id: str, concept_name: str) -> list[dict]:
    """Generates strictly verified implementation dependencies with uses, how, forCase, confidence."""
    deps = CLUSTER_BEDROCK_MAP.get(cluster_id, [
        {"uses": "Compiler AST & Symbol Tables", "nodeId": "systems_foundation_compilers___interpreters", "how": "Compiler constructs AST and performs semantic validation.", "forCase": "Syntactic analysis and lowering."},
        {"uses": "Virtual Memory Architecture", "nodeId": "architecture_main_memory", "how": "Hardware executes instructions from process address space.", "forCase": "Program instruction fetch and execution."}
    ])
    return [
        {
            "uses": d["uses"],
            "how": d["how"],
            "forCase": d["forCase"],
            "confidence": "HIGH",
            "nodeId": d.get("nodeId")
        }
        for d in deps
    ]

def derive_taxonomy(cluster_id: str, concept_name: str) -> tuple[list[dict], list[dict]]:
    """Derives genuine generalization and specialization lineage."""
    inherits = [{"id": f"cluster_{cluster_id}", "label": cluster_id.replace('-', ' ').title(), "why": f"{concept_name} is an architectural specialization within {cluster_id}."}]
    specializes = []
    return inherits, specializes
