"""Principals (users) and the authorisation predicate.

The permission model is two-dimensional, deliberately:

    visible(chunk, principal) ==
        principal.clearance_level >= chunk.classification_level      # lattice
        AND  principal.roles INTERSECT chunk.allowed_roles != {}     # role gate

One dimension alone is not enough, and this is the thing I actually learned
shipping IAM: a role-only model forces you to either over-grant or invent a
near-duplicate role for every exception, and a clearance-only model lets a
cleared user read a department they have nothing to do with.

Both dimensions are stored ON THE CHUNK at ingest time, so the check is a cheap
boolean over metadata that is already in memory next to the vectors.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Iterable

from .config import CLASSIFICATION_LEVELS


@dataclass(frozen=True)
class Principal:
    user_id: str
    name: str
    title: str
    roles: frozenset[str]
    clearance: str  # one of CLASSIFICATION_LEVELS

    @property
    def clearance_level(self) -> int:
        return CLASSIFICATION_LEVELS[self.clearance]

    def can_read(self, classification: str, allowed_roles: Iterable[str]) -> bool:
        if self.clearance_level < CLASSIFICATION_LEVELS[classification]:
            return False
        return bool(self.roles & set(allowed_roles))

    def describe(self) -> str:
        return f"{self.name} ({self.title}) roles={sorted(self.roles)} clearance={self.clearance}"


def _p(user_id, name, title, roles, clearance) -> Principal:
    return Principal(user_id, name, title, frozenset(roles), clearance)


# Five personas -- the same shape as the five personas in the IAM audit dashboard.
PRINCIPALS: dict[str, Principal] = {
    p.user_id: p
    for p in [
        _p("priya", "Priya Deshmukh", "HR Manager", ["hr", "employee"], "restricted"),
        _p("rahul", "Rahul Kulkarni", "Backend Engineer", ["engineer", "employee"], "confidential"),
        _p("neha", "Neha Iyer", "Finance Analyst", ["finance", "employee"], "confidential"),
        _p("arjun", "Arjun Rao", "SecOps Lead", ["security", "employee"], "restricted"),
        _p("sam", "Sam Fernandes", "Contractor (new joiner)", ["employee"], "internal"),
    ]
}

DEFAULT_PRINCIPAL = "sam"


def get_principal(user_id: str) -> Principal:
    if user_id not in PRINCIPALS:
        raise KeyError(
            f"unknown principal {user_id!r}; known: {sorted(PRINCIPALS)}"
        )
    return PRINCIPALS[user_id]
