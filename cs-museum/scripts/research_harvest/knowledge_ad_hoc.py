"""Vetted authoritative definitions for Ad-hoc Polymorphism (Overloading & Typeclasses)."""
import json
from pathlib import Path

DATA_PATH = Path(__file__).parent / "knowledge_ad_hoc.json"
AD_HOC_KNOWLEDGE = json.loads(DATA_PATH.read_text()) if DATA_PATH.exists() else {}
