"""Vetted authoritative definitions for Associated Types & Type Families."""
import json
from pathlib import Path

DATA_PATH = Path(__file__).parent / "knowledge_associated.json"
ASSOCIATED_KNOWLEDGE = json.loads(DATA_PATH.read_text()) if DATA_PATH.exists() else {}
