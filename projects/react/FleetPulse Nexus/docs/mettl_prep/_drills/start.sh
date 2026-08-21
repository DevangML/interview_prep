#!/usr/bin/env bash
# One command to start the whole workbench.
cd "$(dirname "$0")" || exit 1
pkill -f "_drills/server.py" 2>/dev/null; sleep 1
echo "React Workbench → http://localhost:8777"
python3 server.py
