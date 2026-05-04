import hashlib
import json
import os
import random
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import requests

PUBLIC_DIR = Path("public")
ZONE = os.environ["BUNNY_STORAGE_ZONE"]
STORAGE_PASSWORD = os.environ["BUNNY_STORAGE_PASSWORD"]
API_KEY = os.environ["BUNNY_API_KEY"]
STORAGE_HOST = os.environ.get("BUNNY_STORAGE_ENDPOINT", "storage.bunnycdn.com")
SITE_HOST = os.environ["BUNNY_PULL_ZONE_HOST"].rstrip("/")

WORKERS = 16
PURGE_WORKERS = 4
PURGE_MAX_ATTEMPTS = 5

storage_base = f"https://{STORAGE_HOST}/{ZONE}"
storage_headers = {"AccessKey": STORAGE_PASSWORD}
purge_headers = {"AccessKey": API_KEY}


def hash_file(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def build_local_manifest():
    manifest = {}
    for path in PUBLIC_DIR.rglob("*"):
        if not path.is_file():
            continue
        rel_path = path.relative_to(PUBLIC_DIR).as_posix()
        manifest[rel_path] = hash_file(path)
    return manifest


def fetch_remote_manifest():
    r = requests.get(f"{storage_base}/.deployment.json", headers=storage_headers, timeout=30)
    if r.status_code == 404:
        return {}
    r.raise_for_status()
    return r.json()


def upload(rel_path):
    body = (PUBLIC_DIR / rel_path).read_bytes()
    r = requests.put(f"{storage_base}/{rel_path}", headers=storage_headers, data=body, timeout=120)
    r.raise_for_status()


def delete(rel_path):
    r = requests.delete(f"{storage_base}/{rel_path}", headers=storage_headers, timeout=30)
    if r.status_code != 404:
        r.raise_for_status()


def put_manifest(manifest):
    body = json.dumps(manifest, sort_keys=True, indent=2).encode()
    r = requests.put(f"{storage_base}/.deployment.json", headers=storage_headers, data=body, timeout=60)
    r.raise_for_status()


def purge(url):
    for attempt in range(PURGE_MAX_ATTEMPTS):
        r = requests.post(
            "https://api.bunny.net/purge",
            headers=purge_headers,
            params={"url": url, "async": "false"},
            timeout=60,
        )
        if r.status_code != 429:
            r.raise_for_status()
            return
        if attempt == PURGE_MAX_ATTEMPTS - 1:
            r.raise_for_status()
        retry_after = r.headers.get("Retry-After")
        if retry_after:
            try:
                delay = float(retry_after)
            except ValueError:
                delay = 2 ** attempt
        else:
            delay = 2 ** attempt
        time.sleep(delay + random.uniform(0, 0.5))


def urls_for(rel_path):
    urls = [f"https://{SITE_HOST}/{rel_path}"]
    if rel_path == "index.html" or rel_path.endswith("/index.html"):
        bare = rel_path.removesuffix("index.html")
        urls.append(f"https://{SITE_HOST}/{bare}")
    return urls


def parallel(fn, items, workers=WORKERS):
    if not items:
        return
    with ThreadPoolExecutor(max_workers=workers) as pool:
        # Consuming the iterator is what actually surfaces exceptions.
        for _ in pool.map(fn, items):
            pass


def diff_manifests(new, old):
    to_add = []
    to_change = []
    for path, new_hash in new.items():
        if path not in old:
            to_add.append(path)
        elif new_hash != old[path]:
            to_change.append(path)

    to_delete = []
    for path in old:
        if path not in new:
            to_delete.append(path)

    to_add.sort()
    to_change.sort()
    to_delete.sort()
    return to_add, to_change, to_delete


def collect_purge_urls(paths):
    urls = []
    for path in paths:
        urls.extend(urls_for(path))
    return urls


def main():
    print(f"~ Hashing {PUBLIC_DIR}")
    new = build_local_manifest()
    print(f"  {len(new)} files")

    print("~ Fetching remote manifest")
    old = fetch_remote_manifest()
    cold_start = not old
    print(f"  {len(old)} files{' (cold start)' if cold_start else ''}")

    to_add, to_change, to_delete = diff_manifests(new, old)
    print(f"~ Plan: add {len(to_add)}, change {len(to_change)}, delete {len(to_delete)}")

    parallel(upload, to_add + to_change)
    parallel(delete, to_delete)

    print("~ Writing manifest")
    put_manifest(new)

    if cold_start:
        print("~ Cold start: purging entire zone")
        purge(f"https://{SITE_HOST}/*")
    else:
        purge_urls = collect_purge_urls(to_change + to_delete)
        print(f"~ Purging {len(purge_urls)} URL(s)")
        parallel(purge, purge_urls, workers=PURGE_WORKERS)

    print("~ Done")


if __name__ == "__main__":
    main()
