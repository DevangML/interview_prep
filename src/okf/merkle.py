import json
import hashlib

def compute_merkle_root(data):
    """
    Computes deterministic SHA-256 Merkle root across all state keys.
    """
    if not isinstance(data, dict):
        return hashlib.sha256(b"empty").hexdigest()

    clean_data = {k: v for k, v in data.items() if k not in ("merkle_root", "checkpoints")}
    leaf_hashes = []
    for key in sorted(clean_data.keys()):
        val_bytes = json.dumps(clean_data[key], sort_keys=True).encode("utf-8")
        leaf_hashes.append(hashlib.sha256(val_bytes).hexdigest())

    if not leaf_hashes:
        return hashlib.sha256(b"empty").hexdigest()

    current_layer = leaf_hashes
    while len(current_layer) > 1:
        next_layer = []
        for i in range(0, len(current_layer), 2):
            if i + 1 < len(current_layer):
                combined = (current_layer[i] + current_layer[i+1]).encode("utf-8")
            else:
                combined = (current_layer[i] + current_layer[i]).encode("utf-8")
            next_layer.append(hashlib.sha256(combined).hexdigest())
        current_layer = next_layer

    return current_layer[0]
