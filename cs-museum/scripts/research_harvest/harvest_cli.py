#!/usr/bin/env python3
"""CLI Controller for Batch Research Harvester and Docket Approval Pipeline."""
import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from docket_builder import generate_docket, COVERAGE_PATH
from applier import apply_docket

def print_status():
    if not COVERAGE_PATH.exists():
        print("coverage.json not found.")
        return
    cov = json.loads(COVERAGE_PATH.read_text())
    counts = cov.get("statusCounts", {})
    unknowns = counts.get("unknown", 0)
    total_cells = sum(counts.values())
    batches_remaining = (unknowns + 49) // 50
    print("=== Concept Atlas Research Queue Status ===")
    print(f"Total Language Cells: {total_cells}")
    print(f"Verified (First-Class): {counts.get('first-class', 0)}")
    print(f"Verified (Partial): {counts.get('partial', 0)}")
    print(f"Verified (Absent by Design): {counts.get('absent-by-design', 0)}")
    print(f"Research Backlog (Unknown): {unknowns}")
    print(f"Remaining 50-Item Batches: {batches_remaining}")

def main():
    parser = argparse.ArgumentParser(description="Authoritative Research Harvester & Review Docket Pipeline")
    parser.add_argument("--status", action="store_true", help="Print current research queue status")
    parser.add_argument("--generate", action="store_true", help="Generate the next 50-item review docket")
    parser.add_argument("--batch-num", type=int, default=1, help="Batch number (default: 1)")
    parser.add_argument("--batch-size", type=int, default=50, help="Batch size (default: 50)")
    parser.add_argument("--apply", type=str, help="Apply an approved docket JSON file to the corpus")

    args = parser.parse_args()

    if args.status:
        print_status()
    elif args.generate:
        path = generate_docket(batch_size=args.batch_size, batch_num=args.batch_num)
        print(f"\nDocket generated at {path}.")
        print("Review the proposed mechanisms, why, when to use, and price.")
        print(f"To apply after review, run: python3 {__file__} --apply {path}")
    elif args.apply:
        apply_docket(Path(args.apply))
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
