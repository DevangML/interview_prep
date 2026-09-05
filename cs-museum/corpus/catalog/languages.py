# -*- coding: utf-8 -*-
"""2026 job-relevant language catalog.

Source of record for ids. SO 2025 professional-use % where reported
(https://survey.stackoverflow.co/2025/ — HTML/CSS reported together at 61.9;
we split them so HTML and CSS can have different cells). Extra rows are
languages that still appear on 2026 job boards but were absent or merged
in that SO table.
"""
from __future__ import annotations

# id, label, family, runtimeKind, so2025_pct|None, aliases, cluster defaults key
# runtimeKind: general | markup | stylesheet | query | shell | data | hardware | bytecode | dsl

WEB = "web"
SYS = "systems"
JVM = "jvm"
MS = "dotnet"
MOB = "mobile"
DATA = "data"
FN = "functional"
SCRIPT = "scripting"
GAME = "game"
HW = "hardware"
ENT = "enterprise"
CLOUD = "cloud"
FORMAL = "formal"

GP = {
    "paradigms": "unverified",
    "types": "unverified",
    "memory": "unverified",
    "concurrency": "unverified",
}
NO_RUNTIME = {
    "paradigms": "unverified",
    "types": "absent_by_design",
    "memory": "absent_by_design",
    "concurrency": "absent_by_design",
}
QUERY = {
    "paradigms": "unverified",
    "types": "unverified",
    "memory": "absent_by_design",
    "concurrency": "absent_by_design",
}
SHELL = {
    "paradigms": "unverified",
    "types": "unverified",
    "memory": "unverified",
    "concurrency": "unverified",
}
HWK = {
    "paradigms": "unverified",
    "types": "unverified",
    "memory": "absent_by_design",
    "concurrency": "absent_by_design",
}


def L(id, label, family, kind, pct, aliases, defaults, note=None, docs=None, absent=None):
    return {
        "id": id,
        "label": label,
        "family": family,
        "runtimeKind": kind,
        "so2025_pct": pct,
        "jobRelevant": True,
        "jobNote": note,
        "aliases": aliases,
        "clusterDefault": defaults,
        "absentReason": absent,
        "docs": docs,
    }


# Stack Overflow 2025 professional use, HTML/CSS split, then still-hired extras.
LANGUAGES = [
    L("javascript", "JavaScript", WEB, "general", 66.0, ["JavaScript", "JS", "ECMAScript", "Node.js", "V8"], GP, docs="https://tc39.es/ecma262/"),
    L("html", "HTML", WEB, "markup", 61.9, ["HTML", "HTML5", "HTML/CSS"], NO_RUNTIME,
      note="SO 2025 reports HTML/CSS as one row (61.9%). Split so markup cells are not CSS cells.",
      docs="https://html.spec.whatwg.org/",
      absent="HTML is a document vocabulary. Heap, threads, and type checkers live in the browser and in JavaScript, not in HTML."),
    L("css", "CSS", WEB, "stylesheet", 61.9, ["CSS", "CSS3", "SCSS", "Sass", "Less", "HTML/CSS"], NO_RUNTIME,
      note="SO 2025 reports HTML/CSS as one row (61.9%).",
      docs="https://www.w3.org/TR/css-snapshot/",
      absent="CSS declares style and layout. It has no programmer-visible heap or thread API; those belong to the engine and to JS."),
    L("sql", "SQL", DATA, "query", 58.6, ["SQL", "PostgreSQL", "MySQL", "SQLite"], QUERY,
      docs="https://www.iso.org/standard/76583.html",
      absent="SQL has no process heap or OS threads of its own; engines implement storage and execution."),
    L("python", "Python", SCRIPT, "general", 57.9, ["Python", "CPython", "PyPy"], GP, docs="https://docs.python.org/3/"),
    L("bash", "Bash / POSIX shell", SCRIPT, "shell", 48.7, ["Bash", "Bash/Shell", "Shell", "zsh", "sh"], SHELL, docs="https://www.gnu.org/software/bash/manual/"),
    L("typescript", "TypeScript", WEB, "general", 43.6, ["TypeScript", "TS"], GP, docs="https://www.typescriptlang.org/docs/"),
    L("java", "Java", JVM, "general", 29.4, ["Java", "JVM", "Java (G1)", "Java (ZGC / Shenandoah)"], GP, docs="https://docs.oracle.com/en/java/"),
    L("csharp", "C#", MS, "general", 27.8, ["C#", "CSharp", "C Sharp", ".NET"], GP, docs="https://learn.microsoft.com/dotnet/csharp/"),
    L("cpp", "C++", SYS, "general", 23.5, ["C++", "Cpp", "C / C++"], GP, docs="https://isocpp.org/"),
    L("powershell", "PowerShell", SCRIPT, "shell", 23.2, ["PowerShell", "pwsh"], SHELL, docs="https://learn.microsoft.com/powershell/"),
    L("c", "C", SYS, "general", 22.0, ["C"], GP, docs="https://www.open-std.org/jtc1/sc22/wg14/"),
    L("php", "PHP", WEB, "general", 18.9, ["PHP"], GP, docs="https://www.php.net/docs.php"),
    L("go", "Go", SYS, "general", 16.4, ["Go", "Golang"], GP, docs="https://go.dev/doc/"),
    L("rust", "Rust", SYS, "general", 14.8, ["Rust"], GP, docs="https://doc.rust-lang.org/"),
    L("kotlin", "Kotlin", JVM, "general", 10.8, ["Kotlin"], GP, docs="https://kotlinlang.org/docs/home.html"),
    L("lua", "Lua", SCRIPT, "general", 9.2, ["Lua"], GP, docs="https://www.lua.org/manual/"),
    L("assembly", "Assembly", SYS, "hardware", 7.1, ["Assembly", "ASM", "x86", "ARM asm"], HWK,
      absent="Assembly is the ISA. Language-level GC, actors, and HM inference are not properties of asm."),
    L("ruby", "Ruby", SCRIPT, "general", 6.4, ["Ruby"], GP, docs="https://www.ruby-lang.org/en/documentation/"),
    L("dart", "Dart", MOB, "general", 5.9, ["Dart", "Flutter"], GP, docs="https://dart.dev/guides"),
    L("swift", "Swift", MOB, "general", 5.4, ["Swift"], GP, docs="https://www.swift.org/documentation/"),
    L("r", "R", DATA, "general", 4.9, ["R"], GP, docs="https://cran.r-project.org/manuals.html"),
    L("groovy", "Groovy", JVM, "general", 4.8, ["Groovy"], GP, docs="https://groovy-lang.org/documentation.html"),
    L("vbnet", "Visual Basic (.NET)", MS, "general", 4.4, ["Visual Basic (.Net)", "VB.NET", "Visual Basic"], GP),
    L("vba", "VBA", ENT, "general", 4.2, ["VBA", "Visual Basic for Applications"], GP,
      note="Excel/Office automation still hired in 2026."),
    L("matlab", "MATLAB", DATA, "general", 3.9, ["MATLAB"], GP),
    L("perl", "Perl", SCRIPT, "general", 3.8, ["Perl"], GP),
    L("gdscript", "GDScript", GAME, "general", 3.3, ["GDScript"], GP),
    L("elixir", "Elixir", FN, "general", 2.7, ["Elixir", "Erlang/Elixir"], GP, docs="https://hexdocs.pm/elixir/"),
    L("scala", "Scala", JVM, "general", 2.6, ["Scala", "Akka (Scala/Java)"], GP),
    L("delphi", "Delphi", ENT, "general", 2.5, ["Delphi", "Object Pascal"], GP),
    L("lisp", "Lisp", FN, "general", 2.4, ["Lisp", "Common Lisp", "Scheme", "Racket"], GP),
    L("micropython", "MicroPython", HW, "general", 2.3, ["MicroPython"], GP),
    L("zig", "Zig", SYS, "general", 2.1, ["Zig"], GP, docs="https://ziglang.org/documentation/"),
    L("erlang", "Erlang", FN, "general", 1.5, ["Erlang", "Erlang/Elixir"], GP),
    L("fortran", "Fortran", DATA, "general", 1.4, ["Fortran"], GP),
    L("ada", "Ada", SYS, "general", 1.4, ["Ada"], GP),
    L("fsharp", "F#", MS, "general", 1.3, ["F#", "FSharp"], GP),
    L("ocaml", "OCaml", FN, "general", 1.2, ["OCaml"], GP),
    L("gleam", "Gleam", FN, "general", 1.1, ["Gleam"], GP),
    L("prolog", "Prolog", FN, "general", 1.1, ["Prolog"], GP),
    L("cobol", "COBOL", ENT, "general", 1.0, ["COBOL"], GP, note="Mainframe jobs remain listed in 2026."),
    L("mojo", "Mojo", DATA, "general", 0.4, ["Mojo"], GP),
    # Still hired in 2026; not a separate SO 2025 professional-use row (or folded into another).
    L("objectivec", "Objective-C", MOB, "general", None, ["Objective-C", "ObjC", "Objective C"], GP,
      note="Legacy iOS/macOS codebases still hire."),
    L("haskell", "Haskell", FN, "general", None, ["Haskell"], GP, note="Finance, compilers, research engineering jobs."),
    L("clojure", "Clojure", JVM, "general", None, ["Clojure"], GP),
    L("julia", "Julia", DATA, "general", None, ["Julia"], GP),
    L("nim", "Nim", SYS, "general", None, ["Nim"], GP),
    L("solidity", "Solidity", CLOUD, "general", None, ["Solidity"], GP, note="Smart-contract engineering jobs."),
    L("terraform", "Terraform (HCL)", CLOUD, "dsl", None, ["Terraform", "HCL", "Terraform / Kubernetes"], QUERY,
      note="Platform/SRE jobs.",
      absent="HCL declares infrastructure. It has no application heap or thread model."),
    L("apex", "Apex", ENT, "general", None, ["Apex"], GP, note="Salesforce engineering jobs."),
    L("abap", "ABAP", ENT, "general", None, ["ABAP"], GP, note="SAP engineering jobs."),
    L("tsql", "T-SQL", DATA, "query", None, ["T-SQL", "T-Sql", "Transact-SQL"], QUERY,
      note="SQL Server jobs.",
      absent="T-SQL runs inside the database engine; it is not a process-level memory/concurrency language."),
    L("plsql", "PL/SQL", DATA, "query", None, ["PL/SQL", "PLSQL"], QUERY,
      note="Oracle jobs.",
      absent="PL/SQL runs inside Oracle; heap and scheduling belong to the RDBMS."),
    L("graphql", "GraphQL", WEB, "query", None, ["GraphQL"], QUERY,
      note="API jobs.",
      absent="GraphQL is a query language over a schema; execution is in the host language."),
    L("cuda", "CUDA C++", HW, "hardware", None, ["CUDA", "CUDA C++"], HWK, note="GPU/HPC jobs."),
    L("vhdl", "VHDL", HW, "hardware", None, ["VHDL"], HWK, note="FPGA/ASIC jobs."),
    L("verilog", "Verilog / SystemVerilog", HW, "hardware", None, ["Verilog", "SystemVerilog"], HWK, note="FPGA/ASIC jobs."),
    L("sas", "SAS", DATA, "general", None, ["SAS"], GP, note="Biostats/analytics jobs."),
    L("crystal", "Crystal", SYS, "general", None, ["Crystal"], GP),
    L("elm", "Elm", WEB, "general", None, ["Elm"], GP),
    L("smalltalk", "Smalltalk", FN, "general", None, ["Smalltalk"], GP),
    L("tcl", "Tcl", SCRIPT, "general", None, ["Tcl", "Tcl/Tk"], GP),
    L("d", "D", SYS, "general", None, ["D", "Dlang"], GP),
    L("hack", "Hack", WEB, "general", None, ["Hack"], GP, note="Meta/HHVM production jobs."),
    L("lean", "Lean", FORMAL, "general", None, ["Lean", "Lean 4"], GP, note="Proof-engineering jobs."),
    L("coq", "Coq", FORMAL, "general", None, ["Coq", "Rocq"], GP),
    L("agda", "Agda", FORMAL, "general", None, ["Agda"], GP),
    L("idris", "Idris", FORMAL, "general", None, ["Idris"], GP),
    L("yaml", "YAML", CLOUD, "dsl", None, ["YAML", "Kubernetes YAML"], QUERY,
      note="DevOps jobs.",
      absent="YAML is a data format. Control flow, memory, and threads belong to the tool that reads it."),
]


def catalog_document():
    return {
        "version": "2026.1",
        "source": "Stack Overflow Developer Survey 2025 professional-use languages, HTML/CSS split, plus 2026 job-board languages not listed as their own SO row.",
        "languages": LANGUAGES,
        "count": len(LANGUAGES),
    }
