"""Build a reader projection, language matrix and hash manifest from canonical records."""
import csv
import hashlib
import json
from pathlib import Path
from validate_atlas import ROOT, load_records, validate, validate_graph

def write(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, separators=(',', ':'))+'\n')

def build():
    scope = json.loads((ROOT/'scope.json').read_text())
    records = [c for _,c in load_records()]
    generated = ROOT/'generated'
    generated.mkdir(exist_ok=True)
    clusters = scope['clusters']
    graph = {'nodes':[{'id':c['id'],'label':c['id'].replace('-',' ').title(),'kind':'cluster'} for c in clusters], 'edges':[]}
    for c in records:
        graph['nodes'].append({'id':c['id'],'label':c['name'],'kind':'concept'})
        graph['edges'].append({'from':c['clusterId'],'to':c['id'],'type':'contains'})
    relation_file = ROOT/'relations.json'
    if relation_file.exists():
        graph['edges'].extend(json.loads(relation_file.read_text()))
    write(generated/'graph.json', graph)
    report = validate()
    write(generated/'coverage.json', report)
    if report['errors']:
        raise ValueError('\n'.join(report['errors'][:20]))
    chunks, inventory = [], ['# Canonical concept inventory', '', 'Generated from source records; authorship is not verification.', '']
    for cluster in clusters:
        items = [c for c in records if c['clusterId']==cluster['id']]
        filename = cluster['id']+'.json'
        write(generated/filename, items)
        chunks.append({'id':cluster['id'],'path':filename,'sha256':hashlib.sha256((generated/filename).read_bytes()).hexdigest(),'count':len(items)})
        links = []
        for c in items:
            path = next(p for p,item in load_records() if item['id']==c['id'])
            links.append(f'[{c["name"]}](../{path.relative_to(ROOT)})')
        inventory.append(f'## {cluster["id"]} ({len(items)})')
        inventory.append(', '.join(links))
        inventory.append('')
    (generated/'INVENTORY.md').write_text('\n'.join(inventory)+'\n')
    write(generated/'index.json', [{'id':c['id'],'name':c['name'],'clusterId':c['clusterId'],'problem':c['problem']} for c in records])
    with (generated/'language-matrix.csv').open('w',newline='') as out:
        writer=csv.writer(out)
        writer.writerow(['conceptId','conceptName',*scope['languages']])
        for c in records:
            writer.writerow([c['id'],c['name'],*[c['languageSupport'][l]['status'] for l in scope['languages']]])
    write(generated/'manifest.json', {'schemaVersion':scope['schemaVersion'],'version':scope['version'], 'conceptCount':len(records),'chunks':chunks,'graph':'graph.json','coverage':'coverage.json'})
    print(f'Built {len(records)} concepts, {len(graph["edges"])} edges, {sum(report["statusCounts"].values())} language cells')

if __name__ == '__main__':
    build()
