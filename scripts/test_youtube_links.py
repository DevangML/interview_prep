import json
import urllib.request
import urllib.error

data = json.load(open('cs-museum/app/src/lib/canonicalMediaData.json'))

def check_video(vid, label):
    url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={vid}&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'})
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            d = json.loads(resp.read().decode())
            print(f"[OK] {label}: {vid} -> \"{d.get('title')}\" by {d.get('author_name')}")
            return True, d.get('title')
    except urllib.error.HTTPError as e:
        print(f"[FAIL {e.code}] {label}: {vid}")
        return False, str(e.code)
    except Exception as e:
        print(f"[ERROR] {label}: {vid} -> {e}")
        return False, str(e)

print("=== CHECKING STAGES ===")
for k, v in data['stages'].items():
    check_video(v['id'], k)

print("\n=== CHECKING CONCEPTS ===")
for k, v in data['concepts'].items():
    check_video(v['id'], k)
