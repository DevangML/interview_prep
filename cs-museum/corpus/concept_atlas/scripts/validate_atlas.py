"""Validate atlas structure; keep evidence completeness separate from validity."""
import hashlib
import json
from collections import Counter
from pathlib import Path
from urllib.parse import urlparse
try:
    from jsonschema import Draft202012Validator
except ImportError:
    Draft202012Validator = None

ROOT = Path(__file__).resolve().parents[1]
PRIMARY_HOSTS = {
    'ada-auth.org', 'clojure.org', 'common-lisp.net', 'cppreference.com',
    'dart.dev', 'developer.mozilla.org', 'doc.rust-lang.org',
    'docs.oracle.com', 'docs.python.org', 'docs.scala-lang.org', 'dyalog.com', 'ecma-international.org',
    'elixir-lang.org', 'erlang.org', 'forth-standard.org', 'go.dev',
    'haskell.org', 'hexdocs.pm', 'isocpp.org', 'jsoftware.com', 'kotlinlang.org',
    'learn.microsoft.com', 'llvm.org', 'ocaml.org', 'open-std.org', 'pharo.org',
    'ruby-doc.org', 'scala-lang.org', 'sqlite.org', 'squeak.org', 'swift.org',
    'tc39.es', 'www.adaic.org', 'www.gnu.org', 'www.haskell.org',
    'www.lispworks.com', 'www.php.net', 'www.postgresql.org',
    'www.ruby-lang.org', 'www.scala-lang.org', 'www.swift.org',
    'www.swi-prolog.org', 'www.typescriptlang.org', 'ziglang.org',
}

def load_records(root=ROOT):
    return [(p, json.loads(p.read_text())) for p in sorted(root.glob('clusters/*/*.json'))]

def cycle_exists(edges, relation):
    graph = {}
    for edge in edges:
        if edge['type'] == relation:
            graph.setdefault(edge['from'], []).append(edge['to'])
    active, done = set(), set()
    def visit(node):
        if node in active:
            return True
        if node in done:
            return False
        active.add(node)
        if any(visit(child) for child in graph.get(node, [])):
            return True
        active.remove(node)
        done.add(node)
        return False
    return any(visit(n) for n in graph)

def validate_graph(graph):
    errors = []
    ids = [n['id'] for n in graph['nodes']]
    if len(ids) != len(set(ids)):
        errors.append('duplicate graph node IDs')
    for edge in graph['edges']:
        if edge['from'] not in ids or edge['to'] not in ids:
            errors.append(f'dangling edge {edge}')
        if edge['type'] not in {'contains', 'prerequisite', 'requires', 'enables',
                                'commonly-paired', 'influences', 'analogous-to', 'contrasts-with'}:
            errors.append(f'unknown relation type {edge["type"]}')
        if edge['type'] != 'contains' and not all(edge.get(k) for k in ['conditions','limitation','sources']):
            errors.append(f'missing relation evidence {edge}')
    for relation in ['contains', 'prerequisite']:
        if cycle_exists(graph['edges'], relation):
            errors.append(f'{relation} cycle')
    return errors

def validate_source_archive(root):
    manifest_path = root / 'source-manifest.json'
    if not manifest_path.exists():
        return ['source-manifest.json is missing']
    manifest = json.loads(manifest_path.read_text())
    errors = []
    entries = manifest.get('entries', [])
    if manifest.get('count') != len(entries):
        errors.append('source manifest count mismatch')
    for entry in entries:
        path = root / entry['path']
        if not entry.get('downloaded'):
            errors.append(f'source not downloaded: {entry.get("url")}')
        elif not path.exists():
            errors.append(f'missing source snapshot: {path}')
        elif hashlib.sha256(path.read_bytes()).hexdigest() != entry.get('sha256'):
            errors.append(f'source hash mismatch: {path}')
    return errors

def validate_primary_source_set(records):
    """Canonical asserted cells may only use the declared primary-source set."""
    errors, urls = [], set()
    for _, item in records:
        urls.update(item.get('sources', []))
        urls.update(item.get('origin', {}).get('sources', []))
        for cell in item.get('languageSupport', {}).values():
            if cell.get('status') != 'unknown':
                urls.update(cell.get('sources', []))
    for url in sorted(urls):
        host = urlparse(url).netloc.lower().split(':', 1)[0]
        if host not in PRIMARY_HOSTS:
            errors.append(f'canonical source is outside primary allowlist: {url}')
    return errors, urls

def validate(root=ROOT):
    scope = json.loads((root/'scope.json').read_text())
    schema = json.loads((root/'schemas/concept.schema.json').read_text())
    checker = Draft202012Validator(schema) if Draft202012Validator else None
    records = load_records(root)
    errors, statuses, clusters, ids = [], Counter(), Counter(), []
    primary_errors, primary_urls = validate_primary_source_set(records)
    errors.extend(primary_errors)
    uncertain_origins = []
    unknowns = []
    for path, item in records:
        if checker:
            errors.extend(f'{path.name}: {e.json_path}: {e.message}' for e in checker.iter_errors(item))
        else:
            for req in schema.get('required', []):
                if req not in item:
                    errors.append(f'{path.name}: missing required field {req}')
        ids.append(item.get('id'))
        clusters[item.get('clusterId')] += 1
        origin = str(item.get('origin', {})).lower()
        if any(word in origin for word in ['unverified', 'unsettled', 'uncertain', 'not established', 'contested']):
            uncertain_origins.append(item.get('id'))
        for language, cell in item.get('languageSupport', {}).items():
            statuses[cell.get('status')] += 1
            if cell.get('status') == 'unknown':
                unknowns.append({'conceptId':item.get('id'), 'language':language})
    if len(set(ids)) != len(ids):
        errors.append('duplicate concept IDs')
    for cluster in scope['clusters']:
        if clusters[cluster['id']] != cluster['target']:
            errors.append(f'{cluster["id"]}: expected {cluster["target"]}, got {clusters[cluster["id"]]}')
    if len(records) != scope['targetConcepts']:
        errors.append(f'expected {scope["targetConcepts"]} records, got {len(records)}')
    known_clusters = {c['id'] for c in scope['clusters']}
    errors.extend(f'unknown cluster {c}' for c in clusters if c not in known_clusters)
    graph_path = root/'generated/graph.json'
    if graph_path.exists():
        errors.extend(validate_graph(json.loads(graph_path.read_text())))
    errors.extend(validate_source_archive(root))
    return {'structuralStatus':'pass' if not errors else 'fail', 'errors':errors,
            'conceptCount':len(records), 'clusterCounts':dict(clusters),
            'languageCellCount':sum(statuses.values()), 'statusCounts':dict(statuses),
            'uncertainOriginIds':uncertain_origins, 'unknownCells':unknowns,
            'primarySourceCount': len(primary_urls),
            'primarySourceStatus': 'pass' if not primary_errors else 'fail',
            'sourceArchiveCount': len(json.loads((root/'source-manifest.json').read_text()).get('entries', [])) if (root/'source-manifest.json').exists() else 0,
            'limitations':['Citations are present; their correctness is not proved by this validator.',
                           'Unknown cells are research backlog, not evidence of absence.',
                           'No human learning outcome or spatial performance is certified.']}

if __name__ == '__main__':
    report = validate()
    (ROOT/'generated/coverage.json').write_text(json.dumps(report, indent=2)+'\n')
    print(json.dumps({k:v for k,v in report.items() if k not in ['unknownCells','uncertainOriginIds']}, indent=2))
    raise SystemExit(0 if report['structuralStatus'] == 'pass' else 1)
