# Runnable experiments

    python3 -m venv lgvenv
    source lgvenv/bin/activate      # fish: source lgvenv/bin/activate.fish
    pip install langgraph
    python exp1_parallel_no_reducer.py

No API key needed - no LLM is called in any script.
Verified on langgraph 1.2.9 / langchain-core 1.5.1.
Explanations + expected output: ../BREAKABLE_EXPERIMENTS.md
