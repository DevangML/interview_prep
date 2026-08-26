def apply_rfc6902_patch(state, patches):
    """
    Applies RFC 6902 JSON patch operations (add, replace, remove).
    Handles list operations when appending to array paths such as '/session_history/-'.
    """
    for patch in patches:
        op = patch.get("op")
        raw_path = patch.get("path", "").strip("/")
        if not raw_path:
            continue
        path = raw_path.split("/")
        value = patch.get("value")

        target = state
        for key in path[:-1]:
            if isinstance(target, dict):
                if key not in target:
                    target[key] = {}
                target = target[key]
            elif isinstance(target, list):
                idx = int(key) if key.isdigit() else 0
                if 0 <= idx < len(target):
                    target = target[idx]
                else:
                    target = {}

        last_key = path[-1]
        if isinstance(target, list):
            if op == "add":
                if last_key == "-":
                    target.append(value)
                elif last_key.isdigit():
                    target.insert(int(last_key), value)
            elif op == "replace" and last_key.isdigit():
                idx = int(last_key)
                if 0 <= idx < len(target):
                    target[idx] = value
            elif op == "remove" and last_key.isdigit():
                idx = int(last_key)
                if 0 <= idx < len(target):
                    target.pop(idx)
        elif isinstance(target, dict):
            if op in ("add", "replace"):
                target[last_key] = value
            elif op == "remove":
                target.pop(last_key, None)

    return state
