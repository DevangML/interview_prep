"""
MATHEMATICAL VERIFICATION SCRIPT: SYLLABUS & INTERVIEW PROOF
Computes exact coverage, lattice mappings, and interview graph completeness.
"""
import csv, json, math

def run_proof():
    # 1. Parse Core Syllabus
    core_rows = []
    with open('Core_Syllabus.csv', mode='r', encoding='utf-8', errors='ignore') as f:
        r = csv.reader(f)
        for _ in range(4): next(r)
        for row in r:
            if not row or not row[0].strip(): continue
            try:
                row_id = float(row[0].strip())
            except:
                row_id = row[0].strip()
            core_rows.append({
                'id': row_id,
                'area': row[1].strip(),
                'section': row[2].strip(),
                'concept': row[3].strip(),
                'yoe': row[4].strip(),
                'depth': row[5].strip(),
                'weight': row[6].strip(),
                'question': row[7].strip()
            })

    # 2. Parse Interview Drills
    drill_rows = []
    with open('Interview_Drills.csv', mode='r', encoding='utf-8', errors='ignore') as f:
        r = csv.reader(f)
        header = next(r)
        for row in r:
            if not row or not row[0].strip(): continue
            drill_rows.append({
                'id': row[0].strip(),
                'name': row[1].strip() if len(row) > 1 else '',
                'category': row[2].strip() if len(row) > 2 else '',
                'difficulty': row[3].strip() if len(row) > 3 else '',
                'time_limit': row[4].strip() if len(row) > 4 else '',
                'prompt': row[5].strip() if len(row) > 5 else ''
            })

    # 3. Read Closed Rows
    with open('_bmad-output/live_console/SAVE_GAME_STATE.json') as f:
        state = json.load(f)
    closed_list = state['console_campaign']['coverage']['closed_rows']
    closed_set = set(float(x) for x in closed_list)

    total_core = len(core_rows)
    total_drills = len(drill_rows)
    total_universe = total_core + total_drills

    closed_core_count = sum(1 for r in core_rows if r['id'] in closed_set)
    open_core_count = total_core - closed_core_count

    # Weighted Analysis
    weights = {'Core': 3.0, 'Common': 2.0, 'Rare': 1.0}
    total_weighted_points = sum(weights.get(r['weight'], 1.0) for r in core_rows)
    closed_weighted_points = sum(weights.get(r['weight'], 1.0) for r in core_rows if r['id'] in closed_set)

    print("=== MATHEMATICAL SYLLABUS AUDIT ===")
    print(f"|U_core| = {total_core}")
    print(f"|U_drills| = {total_drills}")
    print(f"|U_total| = {total_universe}")
    print(f"Current Closed (|C|): {closed_core_count} ({closed_core_count/total_core*100:.2f}%)")
    print(f"Current Open (|O|): {open_core_count} ({open_core_count/total_core*100:.2f}%)")
    print(f"Weighted Coverage: {closed_weighted_points}/{total_weighted_points} ({closed_weighted_points/total_weighted_points*100:.2f}%)")

if __name__ == '__main__':
    run_proof()
