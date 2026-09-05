#!/usr/bin/env python3
"""Verified promotion requires two https URLs on distinct publishers."""
from __future__ import annotations
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "catalog"))
from evidence_gate import dual_sourced, publisher, two_publishers  # noqa: E402


def test_publishers_split_orgs():
    assert publisher("https://docs.python.org/3/library/gc.html") == "python.org"
    assert publisher("https://doc.pypy.org/en/latest/gc_info.html") == "pypy.org"
    assert publisher("https://github.com/python/cpython") == "github:python"
    assert two_publishers(
        [
            "https://docs.python.org/3/library/gc.html",
            "https://doc.pypy.org/en/latest/gc_info.html",
        ]
    )
    assert not two_publishers(
        [
            "https://docs.python.org/3/library/gc.html",
            "https://docs.python.org/3/reference/",
        ]
    )
    assert not two_publishers(["https://v8.dev/blog", "http://example.com/x"])
    assert not dual_sourced("no-such-lang", "gc")


if __name__ == "__main__":
    test_publishers_split_orgs()
    print("PASS evidence gate")
