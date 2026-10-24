import os
from pathlib import Path
import re

import requests
import yaml

try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper

CUR_DIR = os.path.dirname(os.path.realpath(__file__))
CONTENT_FILES = f"{CUR_DIR}/../content"

BROWSERLESS_FUNCTION = """export default async function ({ page, context }) {
  if (context.cookies.length) { await page.setCookie(...context.cookies); }
  await page.goto(context.url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForFunction((t) => !document.title.includes(t), { timeout: 60000 }, context.waitTitle);
  await page.waitForSelector("body", { timeout: 10000 });
  return { data: { html: await page.content(), cookies: await page.cookies() }, type: "application/json" };
}"""

browserless_cookies = []

METADATA_REGEX = "(?:---\\n?)(.*)(?:\\n?)---"
IMAGE_SRC_REGEX = "src=\"(.*)\""

def fetch_with_browser(url: str, wait_title: str = "not a bot"):
    # If we run into a site using something like Anubis, we should be able to solve it
    # since we're using a real browser but we want to wait for the title to appear
    # so we know that the puzzle is solved. We also keep cookies so future requests
    # don't need to incur the same wait for solving.
    global browserless_cookies
    api_url = os.environ["BROWSERLESS_URL"].rstrip("/")
    r = requests.post(
        f"{api_url}/function",
        params={"stealth": "true", "timeout": 100000},
        headers={"Authorization": f"Bearer {os.environ['BROWSERLESS_TOKEN']}"},
        json={
            "code": BROWSERLESS_FUNCTION,
            "context": {"url": url, "cookies": browserless_cookies, "waitTitle": wait_title},
        },
        timeout=120,
    )
    r.raise_for_status()
    data = r.json()["data"]
    browserless_cookies = data["cookies"]
    return data["html"]

def walk_content_folder(path: str, ext: str):
    matches = set()
    for dir, _, files in os.walk(path):
        for file in files:
            if Path(file).suffix == ext:
                file_path = str(Path(dir, file).resolve())
                matches.add(file_path)
    return list(matches)

def extract_header(content: str):
    meta_indexes = [i for i, x in enumerate(content.split('\n')) if x == '---']
    meta_start = meta_indexes[0] + 1
    meta_end = meta_indexes[1]
    text_header = '\n'.join(content.split('\n')[meta_start:meta_end])
    return yaml.load(text_header, Loader=Loader)

def get_image_path(post_path, image_name):
    return str(Path(post_path).parent / image_name)

def get_image_name(image_params):
    # TODO: Will break if src isn't first in the list of params
    return re.match('src="(.*)"', image_params)[1]